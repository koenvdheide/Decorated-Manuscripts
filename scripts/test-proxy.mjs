/**
 * Test the MCP proxy by simulating two concurrent clients.
 * Sends JSON-RPC messages via the proxy's stdin/stdout.
 */

import { spawn } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROXY_PATH = resolve(__dirname, 'mcp-proxy.mjs');

let nextId = 1;
const pending = new Map();
let buffer = '';

function createProxy() {
  const proc = spawn('node', [PROXY_PATH], {
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: resolve(__dirname, '..'),
  });

  proc.stderr.on('data', (chunk) => {
    process.stderr.write(`  proxy-log: ${chunk}`);
  });

  proc.stdout.on('data', (chunk) => {
    buffer += chunk.toString();
    let nlIdx;
    while ((nlIdx = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, nlIdx).trim();
      buffer = buffer.slice(nlIdx + 1);
      if (line) {
        try {
          const msg = JSON.parse(line);
          if (msg.id != null && pending.has(msg.id)) {
            const { resolve, timer } = pending.get(msg.id);
            clearTimeout(timer);
            pending.delete(msg.id);
            resolve(msg);
          }
        } catch {}
      }
    }
  });

  return proc;
}

function send(proc, method, params = {}, timeoutMs = 60_000) {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timeout on ${method}`));
    }, timeoutMs);

    pending.set(id, { resolve, timer });
    proc.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
  });
}

async function main() {
  console.log('=== MCP Proxy Isolation Test ===\n');

  const proc = createProxy();

  try {
    // 1. Initialize
    console.log('1. Initializing proxy...');
    const initResp = await send(proc, 'initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'test-runner', version: '1.0.0' },
    });
    console.log(`   Server: ${initResp.result?.serverInfo?.name} v${initResp.result?.serverInfo?.version}`);

    // Send initialized notification
    proc.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');

    // 2. List tools
    console.log('\n2. Listing tools...');
    const toolsResp = await send(proc, 'tools/list', {});
    const tools = toolsResp.result?.tools || [];
    console.log(`   Found ${tools.length} tools`);

    const hasContextId = tools[0]?.inputSchema?.properties?.context_id;
    console.log(`   context_id parameter injected: ${hasContextId ? 'YES' : 'NO'}`);

    if (!hasContextId) {
      console.log('\n*** FAIL: context_id not found in tool schemas ***');
      proc.kill();
      process.exit(1);
    }

    // 3. Navigate context A to example.com
    console.log('\n3. Navigating context_id="A" to example.com...');
    const navA = await send(proc, 'tools/call', {
      name: 'browser_navigate',
      arguments: { url: 'https://example.com', context_id: 'A' },
    });
    const navAText = navA.result?.content?.[0]?.text || '';
    console.log(`   Result contains "example.com": ${navAText.includes('example.com')}`);

    // 4. Navigate context B to a different site
    console.log('\n4. Navigating context_id="B" to wikipedia.org...');
    const navB = await send(proc, 'tools/call', {
      name: 'browser_navigate',
      arguments: { url: 'https://en.wikipedia.org/wiki/Main_Page', context_id: 'B' },
    });
    const navBText = navB.result?.content?.[0]?.text || '';
    console.log(`   Result contains "wikipedia": ${navBText.includes('wikipedia') || navBText.includes('Wikipedia')}`);

    // 5. Snapshot context A
    console.log('\n5. Taking snapshot of context A...');
    const snapA = await send(proc, 'tools/call', {
      name: 'browser_snapshot',
      arguments: { context_id: 'A' },
    });
    const snapAText = snapA.result?.content?.map((c) => c.text).join('') || '';
    const aHasExample = snapAText.includes('Example Domain');
    const aHasWiki = snapAText.includes('Wikipedia') || snapAText.includes('wikipedia');
    console.log(`   Context A sees "Example Domain": ${aHasExample}`);
    console.log(`   Context A sees "Wikipedia": ${aHasWiki}`);

    // 6. Snapshot context B
    console.log('\n6. Taking snapshot of context B...');
    const snapB = await send(proc, 'tools/call', {
      name: 'browser_snapshot',
      arguments: { context_id: 'B' },
    });
    const snapBText = snapB.result?.content?.map((c) => c.text).join('') || '';
    const bHasExample = snapBText.includes('Example Domain');
    const bHasWiki = snapBText.includes('Wikipedia') || snapBText.includes('wikipedia');
    console.log(`   Context B sees "Example Domain": ${bHasExample}`);
    console.log(`   Context B sees "Wikipedia": ${bHasWiki}`);

    // 7. Verdict
    console.log('\n=== RESULTS ===');
    const isolated = aHasExample && !aHasWiki && bHasWiki && !bHasExample;
    if (isolated) {
      console.log('PASS: Browser contexts are fully isolated.');
      console.log('  Context A: only example.com');
      console.log('  Context B: only wikipedia.org');
    } else {
      console.log('FAIL: Contexts are NOT isolated.');
      console.log(`  A: Example=${aHasExample}, Wiki=${aHasWiki}`);
      console.log(`  B: Example=${bHasExample}, Wiki=${bHasWiki}`);
      // Print first 200 chars of each for debugging
      console.log(`\n  A snapshot preview: ${snapAText.substring(0, 200)}`);
      console.log(`\n  B snapshot preview: ${snapBText.substring(0, 200)}`);
    }

    proc.kill('SIGTERM');
    process.exit(isolated ? 0 : 1);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    proc.kill('SIGTERM');
    process.exit(1);
  }
}

main();
