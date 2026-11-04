import assert from 'node:assert/strict';
import { execFile, execFileSync } from 'node:child_process';
import {
  accessSync, constants, existsSync, globSync, mkdirSync, mkdtempSync,
  readFileSync, readdirSync, rmSync, statSync, symlinkSync, writeFileSync,
} from 'node:fs';
import { createServer } from 'node:http';
import { homedir, tmpdir } from 'node:os';
import { extname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const root = fileURLToPath(new URL('../', import.meta.url));
const cli = join(root, 'node_modules/vitepress/bin/vitepress.js');
const workflow = readFileSync(join(root, '.github/workflows/test.yml'), 'utf8');
const execFileP = promisify(execFile);

function findChromium({
  override = process.env.SL_CHROMIUM,
  localBrowser = join(homedir(), '.local/bin/chromium'),
  cacheRoot = '/tmp/chromium',
} = {}) {
  const candidates = override
    ? [override]
    : [localBrowser, ...globSync(join(cacheRoot, '**/chrome-headless-shell'))];
  for (const candidate of candidates) {
    try {
      if (!statSync(candidate).isFile()) continue;
      accessSync(candidate, constants.X_OK);
      return candidate;
    } catch {
      continue;
    }
  }
  assert.fail(
    `no executable Chromium found (tried: ${candidates.join(', ') || 'none'}); set SL_CHROMIUM or run the test pipeline`,
  );
}

async function render404(output, browserOptions) {
  const chromium = findChromium(browserOptions);
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
  const server = createServer((req, res) => {
    const path = new URL(req.url, 'http://localhost').pathname;
    const file = join(output, path);
    if ((path !== '/404.html' && !path.startsWith('/assets/')) || !existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(path === '/404.html' ? 404 : 200, {
      'Content-Type': `${types[extname(file)] || 'application/octet-stream'}; charset=utf-8`,
    });
    res.end(readFileSync(file));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const { stdout } = await execFileP(chromium, [
      '--headless', '--disable-gpu', '--no-sandbox',
      `--user-data-dir=${join(output, '.chromium')}`,
      '--virtual-time-budget=5000', '--dump-dom',
      `http://127.0.0.1:${server.address().port}/404.html`,
    ], { timeout: 60_000, maxBuffer: 8 * 1024 * 1024 });
    assert.match(stdout, /class="sl-theme-current"/, 'the 404 page must hydrate the custom theme');
    return stdout;
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
}

test('Test enables the preview build flag and runs docs artifact regressions', () => {
  assert.match(workflow, /\n {4}env:\n {6}VITE_DOC_PREVIEW: "true"/);
  assert.match(workflow, /node --test tests\/release-workflow\.test\.mjs tests\/docs-preview\.test\.mjs/);
});

const chromiumCacheFixture = root => {
  const cacheRoot = join(root, 'cache');
  const shellDir = join(
    cacheRoot, 'chrome-headless-shell', 'linux-1', 'chrome-headless-shell-linux64',
  );
  mkdirSync(shellDir, { recursive: true });
  const exe = join(shellDir, 'chrome-headless-shell');
  writeFileSync(exe, '#!/bin/sh\n', { mode: 0o755 });
  return { cacheRoot, exe };
};

test('findChromium resolves the nested executable, not the cache directory', t => {
  const tmp = mkdtempSync(join(tmpdir(), 'sl-chromium-'));
  t.after(() => rmSync(tmp, { recursive: true, force: true }));
  const { cacheRoot, exe } = chromiumCacheFixture(tmp);
  assert.equal(
    findChromium({ override: '', localBrowser: join(tmp, 'missing'), cacheRoot }),
    exe,
  );
});

test('findChromium prefers an explicit SL_CHROMIUM override', t => {
  const tmp = mkdtempSync(join(tmpdir(), 'sl-chromium-'));
  t.after(() => rmSync(tmp, { recursive: true, force: true }));
  const exe = join(tmp, 'custom-chromium');
  writeFileSync(exe, '', { mode: 0o755 });
  assert.equal(
    findChromium({ override: exe, localBrowser: join(tmp, 'missing'), cacheRoot: join(tmp, 'cache') }),
    exe,
  );
});

test('findChromium rejects an unusable override instead of falling back', t => {
  const tmp = mkdtempSync(join(tmpdir(), 'sl-chromium-'));
  t.after(() => rmSync(tmp, { recursive: true, force: true }));
  const { cacheRoot } = chromiumCacheFixture(tmp);
  const fallback = join(tmp, 'fallback-chromium');
  writeFileSync(fallback, '', { mode: 0o755 });
  assert.throws(
    () => findChromium({ override: join(tmp, 'missing'), localBrowser: fallback, cacheRoot }),
    /SL_CHROMIUM/,
  );
});

test('findChromium skips non-executable candidates and fails with an actionable error', t => {
  const tmp = mkdtempSync(join(tmpdir(), 'sl-chromium-'));
  t.after(() => rmSync(tmp, { recursive: true, force: true }));
  const noexec = join(tmp, 'chrome-headless-shell');
  writeFileSync(noexec, '', { mode: 0o644 });
  assert.throws(
    () => findChromium({ override: '', localBrowser: noexec, cacheRoot: join(tmp, 'empty-cache') }),
    /SL_CHROMIUM/,
  );
});

for (const preview of [true, false]) {
  test(`${preview ? 'preview' : 'production'} docs have the correct announcement visibility`, async t => {
    const output = mkdtempSync(join(tmpdir(), 'sl-docs-preview-'));
    t.after(() => rmSync(output, { recursive: true, force: true }));
    const browser = findChromium();
    execFileSync(process.execPath, [cli, 'build', 'doc', '--outDir', output], {
      cwd: root,
      env: { ...process.env, VITE_DOC_PREVIEW: String(preview) },
      encoding: 'utf8',
      timeout: 120_000,
      maxBuffer: 8 * 1024 * 1024,
    });
    const cacheRoot = join(output, 'browser-cache');
    const shellDir = join(
      cacheRoot, 'chrome-headless-shell', 'linux-1', 'chrome-headless-shell-linux64',
    );
    mkdirSync(shellDir, { recursive: true });
    symlinkSync(browser, join(shellDir, 'chrome-headless-shell'));
    const browserOptions = { override: '', localBrowser: join(output, 'missing-chromium'), cacheRoot };
    const pages = readdirSync(output, { recursive: true })
      .filter(path => path.endsWith('.html') && path !== '404.html');
    assert.ok(pages.length > 0, 'the build must generate HTML pages');
    for (const page of pages) {
      const html = readFileSync(join(output, page), 'utf8');
      assert.equal(html.includes('class="sl-preview-banner"'), preview, page);
      assert.equal(html.includes('此為預覽版本，僅供測試與審閱。'), preview, page);
    }
    const notFound = await render404(output, browserOptions);
    assert.equal(notFound.includes('class="sl-preview-banner"'), preview, 'hydrated 404 page');
    assert.equal(notFound.includes('此為預覽版本，僅供測試與審閱。'), preview, 'hydrated 404 page');
  });
}
