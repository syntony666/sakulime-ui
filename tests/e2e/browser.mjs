import { execFile } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { findChromium } from '../lib/chromium.mjs';

const execFileP = promisify(execFile);
const root = fileURLToPath(new URL('../../', import.meta.url));

const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
};

const serve = () => {
  const server = createServer((req, res) => {
    const file = join(root, new URL(req.url, 'http://localhost').pathname);
    if (!existsSync(file) || !file.startsWith(root)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, {
      'Content-Type': `${types[extname(file)] || 'application/octet-stream'}; charset=utf-8`,
    });
    res.end(readFileSync(file));
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
};

const unescape = s =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

export async function runSpec(path, { timeout = 60_000, budget = 8000 } = {}) {
  const server = await serve();
  try {
    const { stdout } = await execFileP(findChromium(), [
      '--headless', '--disable-gpu', '--no-sandbox',
      `--user-data-dir=${join(tmpdir(), `sl-e2e-${process.pid}`)}`,
      `--virtual-time-budget=${budget}`, '--dump-dom',
      `http://127.0.0.1:${server.address().port}${path}`,
    ], { timeout, maxBuffer: 8 * 1024 * 1024 });
    const results = stdout.match(/<pre id="e2e-results"[^>]*>([\s\S]*?)<\/pre>/);
    if (!results) {
      throw new Error(`spec page produced no results:\n${stdout.slice(-2000)}`);
    }
    return JSON.parse(unescape(results[1]));
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
}
