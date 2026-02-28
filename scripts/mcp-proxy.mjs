#!/usr/bin/env node
/**
 * Multiplexing MCP Proxy for Playwright browser isolation.
 *
 * Presents as a single MCP server (stdio) to Claude Code.
 * Spawns separate Playwright MCP child processes per `context_id`.
 * Each child gets its own headless browser — no contention.
 *
 * Usage in .mcp.json:
 *   { "mcpServers": { "playwright-multi": { "command": "node", "args": ["scripts/mcp-proxy.mjs"] } } }
 *
 * Agents include context_id in tool calls:
 *   browser_navigate({ url: "...", context_id: "shard1" })
 */

import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';

// ── Configuration ──────────────────────────────────────────────

const CHILD_CMD = 'npx';
const CHILD_ARGS = ['@playwright/mcp@latest', '--headless', '--isolated'];
const MAX_CHILDREN = 12;
const INIT_TIMEOUT_MS = 30_000;
const TOOL_TIMEOUT_MS = 120_000;

// ── Child process management ───────────────────────────────────

/** @type {Map<string, ChildSession>} */
const children = new Map();

/** @type {object[]|null} cached tool list from first child */
let cachedTools = null;

class ChildSession {
  constructor(contextId) {
    this.contextId = contextId;
    this.nextId = 1;
    /** @type {Map<number, {resolve, reject, timer}>} */
    this.pending = new Map();
    this.initialized = false;
    this.buffer = '';
    this.proc = null;
  }

  async start() {
    // On Windows, npx must be spawned via shell. Use cmd.exe explicitly.
    const isWin = process.platform === 'win32';
    this.proc = spawn(isWin ? 'cmd.exe' : CHILD_CMD,
      isWin ? ['/c', CHILD_CMD, ...CHILD_ARGS] : CHILD_ARGS, {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env },
    });

    this.proc.on('error', (err) => {
      log(`[${this.contextId}] Process error: ${err.message}`);
      this._rejectAll(err);
    });

    this.proc.on('exit', (code) => {
      log(`[${this.contextId}] Process exited with code ${code}`);
      this._rejectAll(new Error(`Child exited: ${code}`));
      children.delete(this.contextId);
    });

    // Read newline-delimited JSON-RPC from child stdout
    this.proc.stdout.on('data', (chunk) => {
      this.buffer += chunk.toString();
      let nlIdx;
      while ((nlIdx = this.buffer.indexOf('\n')) !== -1) {
        const line = this.buffer.slice(0, nlIdx).trim();
        this.buffer = this.buffer.slice(nlIdx + 1);
        if (line) this._onMessage(line);
      }
    });

    this.proc.stderr.on('data', (chunk) => {
      // Log child stderr but don't crash
      const text = chunk.toString().trim();
      if (text) log(`[${this.contextId}] stderr: ${text}`);
    });

    // Initialize the MCP session
    await this._initialize();
  }

  async _initialize() {
    const result = await this.send('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: `proxy-${this.contextId}`, version: '1.0.0' },
    });

    // Send initialized notification
    this._write({
      jsonrpc: '2.0',
      method: 'notifications/initialized',
    });

    this.initialized = true;
    log(`[${this.contextId}] Initialized. Server: ${result?.serverInfo?.name}`);
    return result;
  }

  send(method, params = {}, timeoutMs = TOOL_TIMEOUT_MS) {
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Timeout on ${method} (${timeoutMs}ms)`));
      }, timeoutMs);

      this.pending.set(id, { resolve, reject, timer });

      this._write({ jsonrpc: '2.0', id, method, params });
    });
  }

  _write(obj) {
    if (this.proc?.stdin?.writable) {
      this.proc.stdin.write(JSON.stringify(obj) + '\n');
    }
  }

  _onMessage(line) {
    let msg;
    try {
      msg = JSON.parse(line);
    } catch {
      return; // Ignore non-JSON lines
    }

    // Handle JSON-RPC responses (have id)
    if (msg.id != null && this.pending.has(msg.id)) {
      const { resolve, reject, timer } = this.pending.get(msg.id);
      clearTimeout(timer);
      this.pending.delete(msg.id);
      if (msg.error) {
        reject(new Error(msg.error.message || JSON.stringify(msg.error)));
      } else {
        resolve(msg.result);
      }
    }
    // Notifications from child are ignored (could be logged)
  }

  _rejectAll(err) {
    for (const [id, { reject, timer }] of this.pending) {
      clearTimeout(timer);
      reject(err);
    }
    this.pending.clear();
  }

  destroy() {
    this._rejectAll(new Error('Session destroyed'));
    if (this.proc) {
      this.proc.kill('SIGTERM');
      this.proc = null;
    }
  }
}

async function getOrCreateChild(contextId) {
  if (children.has(contextId)) return children.get(contextId);

  if (children.size >= MAX_CHILDREN) {
    throw new Error(`Max children (${MAX_CHILDREN}) reached. Cannot create context: ${contextId}`);
  }

  const session = new ChildSession(contextId);
  children.set(contextId, session);

  try {
    await session.start();
  } catch (err) {
    children.delete(contextId);
    throw err;
  }

  return session;
}

// ── Tool list management ───────────────────────────────────────

async function getToolList() {
  if (cachedTools) return cachedTools;

  // Get tools from a temporary child, then destroy it to free a MAX_CHILDREN slot
  const tempChild = await getOrCreateChild('_tool_list_');
  const result = await tempChild.send('tools/list', {});
  tempChild.destroy();
  children.delete('_tool_list_');

  // Add context_id parameter to each tool
  cachedTools = (result.tools || []).map((tool) => ({
    ...tool,
    inputSchema: {
      ...tool.inputSchema,
      properties: {
        ...tool.inputSchema?.properties,
        context_id: {
          type: 'string',
          description:
            'Session identifier for browser isolation. Each unique context_id gets its own browser instance. Default: "default".',
        },
      },
    },
  }));

  return cachedTools;
}

// ── Main MCP server (stdio) ───────────────────────────────────

function log(msg) {
  process.stderr.write(`[mcp-proxy] ${msg}\n`);
}

function respond(id, result) {
  const msg = { jsonrpc: '2.0', id, result };
  process.stdout.write(JSON.stringify(msg) + '\n');
}

function respondError(id, code, message) {
  const msg = { jsonrpc: '2.0', id, error: { code, message } };
  process.stdout.write(JSON.stringify(msg) + '\n');
}

async function handleRequest(msg) {
  const { id, method, params } = msg;

  try {
    switch (method) {
      case 'initialize': {
        respond(id, {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'playwright-multi-proxy', version: '1.0.0' },
        });
        break;
      }

      case 'notifications/initialized': {
        // No response needed for notifications
        break;
      }

      case 'tools/list': {
        const tools = await getToolList();
        respond(id, { tools });
        break;
      }

      case 'tools/call': {
        const toolName = params?.name;
        const args = { ...(params?.arguments || {}) };

        // Extract and remove context_id
        const contextId = args.context_id || 'default';
        delete args.context_id;

        // browser_close destroys the child process to free the slot
        if (toolName === 'browser_close') {
          if (children.has(contextId)) {
            children.get(contextId).destroy();
            children.delete(contextId);
            log(`[${contextId}] Context destroyed via browser_close`);
            respond(id, { content: [{ type: 'text', text: `Context "${contextId}" closed and destroyed.` }] });
          } else {
            respond(id, { content: [{ type: 'text', text: `Context "${contextId}" not found (already closed).` }] });
          }
          break;
        }

        const child = await getOrCreateChild(contextId);
        const result = await child.send('tools/call', {
          name: toolName,
          arguments: args,
        });
        respond(id, result);
        break;
      }

      case 'resources/list': {
        respond(id, { resources: [] });
        break;
      }

      case 'prompts/list': {
        respond(id, { prompts: [] });
        break;
      }

      default: {
        if (id != null) {
          respondError(id, -32601, `Method not found: ${method}`);
        }
      }
    }
  } catch (err) {
    log(`Error handling ${method}: ${err.message}`);
    if (id != null) {
      respondError(id, -32000, err.message);
    }
  }
}

// ── Entry point ────────────────────────────────────────────────

log('Starting proxy...');

const rl = createInterface({ input: process.stdin, terminal: false });

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  try {
    const msg = JSON.parse(trimmed);
    handleRequest(msg);
  } catch (err) {
    log(`Parse error: ${err.message}`);
  }
});

rl.on('close', () => {
  log('stdin closed. Shutting down...');
  for (const [id, child] of children) {
    child.destroy();
  }
  process.exit(0);
});

process.on('SIGINT', () => {
  log('SIGINT received. Shutting down...');
  for (const [id, child] of children) {
    child.destroy();
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('SIGTERM received. Shutting down...');
  for (const [id, child] of children) {
    child.destroy();
  }
  process.exit(0);
});
