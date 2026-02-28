/**
 * Test whether the Playwright MCP HTTP server provides per-connection isolation.
 *
 * Creates two SSE connections, sends browser_navigate to each with different URLs,
 * then takes screenshots to verify they see different pages.
 */

import { EventSource } from 'eventsource';

const SERVER_URL = 'http://localhost:8000';

class MCPSSEClient {
  constructor(name) {
    this.name = name;
    this.sessionId = null;
    this.messageId = 1;
    this.pendingRequests = new Map();
    this.initialized = false;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`${this.name}: SSE connection timeout`)), 10000);

      this.es = new EventSource(`${SERVER_URL}/sse`);

      this.es.addEventListener('endpoint', (event) => {
        // Extract sessionId from the endpoint URL
        const url = new URL(event.data, SERVER_URL);
        this.sessionId = url.searchParams.get('sessionId');
        this.postUrl = `${SERVER_URL}${event.data}`;
        console.log(`${this.name}: Connected with sessionId=${this.sessionId}`);
        clearTimeout(timeout);
        resolve();
      });

      this.es.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.id && this.pendingRequests.has(data.id)) {
            this.pendingRequests.get(data.id)(data);
            this.pendingRequests.delete(data.id);
          }
        } catch (e) {
          // Ignore parse errors for non-JSON messages
        }
      });

      this.es.onerror = (err) => {
        if (!this.sessionId) {
          clearTimeout(timeout);
          reject(new Error(`${this.name}: SSE connection error`));
        }
      };
    });
  }

  async sendRequest(method, params = {}) {
    const id = this.messageId++;
    const request = {
      jsonrpc: '2.0',
      id,
      method,
      params
    };

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(id);
        reject(new Error(`${this.name}: Request timeout for ${method}`));
      }, 30000);

      this.pendingRequests.set(id, (response) => {
        clearTimeout(timeout);
        if (response.error) {
          reject(new Error(`${this.name}: ${response.error.message}`));
        } else {
          resolve(response.result);
        }
      });

      fetch(this.postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      }).catch(reject);
    });
  }

  async initialize() {
    const result = await this.sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: this.name, version: '1.0.0' }
    });
    this.initialized = true;
    console.log(`${this.name}: Initialized. Server: ${result.serverInfo?.name} v${result.serverInfo?.version}`);

    // Send initialized notification (no response expected)
    fetch(this.postUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'notifications/initialized'
      })
    });

    return result;
  }

  async callTool(name, args = {}) {
    const result = await this.sendRequest('tools/call', { name, arguments: args });
    return result;
  }

  close() {
    if (this.es) this.es.close();
  }
}

async function main() {
  console.log('=== Playwright MCP HTTP Isolation Test ===\n');

  // Create two clients
  const clientA = new MCPSSEClient('ClientA');
  const clientB = new MCPSSEClient('ClientB');

  try {
    // Connect both
    console.log('Connecting two SSE clients...');
    await Promise.all([clientA.connect(), clientB.connect()]);

    // Check session IDs
    console.log(`\nSession IDs:`);
    console.log(`  ClientA: ${clientA.sessionId}`);
    console.log(`  ClientB: ${clientB.sessionId}`);
    console.log(`  Same session? ${clientA.sessionId === clientB.sessionId ? 'YES (FAIL)' : 'NO (PASS)'}`);

    if (clientA.sessionId === clientB.sessionId) {
      console.log('\n*** FAIL: Both clients share the same session. No isolation. ***');
      process.exit(1);
    }

    // Initialize both
    console.log('\nInitializing both clients...');
    await Promise.all([clientA.initialize(), clientB.initialize()]);

    // Navigate to different URLs
    console.log('\nNavigating ClientA to example.com...');
    const navA = await clientA.callTool('browser_navigate', { url: 'https://example.com' });
    console.log(`ClientA navigate result: ${navA.content?.[0]?.text?.substring(0, 100)}...`);

    console.log('\nNavigating ClientB to httpbin.org/html...');
    const navB = await clientB.callTool('browser_navigate', { url: 'https://httpbin.org/html' });
    console.log(`ClientB navigate result: ${navB.content?.[0]?.text?.substring(0, 100)}...`);

    // Take snapshots to verify isolation
    console.log('\nTaking snapshot of ClientA...');
    const snapA = await clientA.callTool('browser_snapshot', {});
    const snapAText = snapA.content?.map(c => c.text).join('') || '';
    const hasExampleA = snapAText.includes('Example Domain');
    const hasHttpbinA = snapAText.includes('Herman Melville');
    console.log(`ClientA sees Example Domain: ${hasExampleA}`);
    console.log(`ClientA sees Moby Dick text: ${hasHttpbinA}`);

    console.log('\nTaking snapshot of ClientB...');
    const snapB = await clientB.callTool('browser_snapshot', {});
    const snapBText = snapB.content?.map(c => c.text).join('') || '';
    const hasExampleB = snapBText.includes('Example Domain');
    const hasHttpbinB = snapBText.includes('Herman Melville');
    console.log(`ClientB sees Example Domain: ${hasExampleB}`);
    console.log(`ClientB sees Moby Dick text: ${hasHttpbinB}`);

    // Verdict
    console.log('\n=== ISOLATION TEST RESULTS ===');
    const isolated = hasExampleA && !hasHttpbinA && hasHttpbinB && !hasExampleB;
    if (isolated) {
      console.log('PASS: Each client has its own isolated browser context.');
      console.log('ClientA only sees example.com, ClientB only sees httpbin.org/html.');
    } else {
      console.log('FAIL: Browsers are NOT isolated.');
      console.log(`ClientA: Example=${hasExampleA}, Moby=${hasHttpbinA}`);
      console.log(`ClientB: Example=${hasExampleB}, Moby=${hasHttpbinB}`);
    }

    process.exit(isolated ? 0 : 1);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  } finally {
    clientA.close();
    clientB.close();
  }
}

main();
