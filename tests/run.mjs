#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { findChromium } from './lib/chromium.mjs';

const execFileP = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const shots = process.argv.includes('--shots');
const DIST = [
  'packages/theme/dist/sakulime.min.css',
  'packages/theme/dist/terra.min.css',
  'packages/theme/dist/umbra.min.css',
  'packages/theme/dist/derived.css',
  'packages/core/dist/index.min.css',
  'packages/core/dist/index.min.js',
  'packages/layout/dist/index.min.css',
  'dist/sakulime.min.css',
  'dist/sakulime.min.js',
];
const FIXTURES = [
  { name: 'core', size: '1280,1000' },
  { name: 'layout', size: '1280,1000' },
  { name: 'responsive', size: '600,800' },
];

const missing = DIST.filter(f => !existsSync(join(root, f)));
if (missing.length) {
  console.error(`missing dist bundles:\n  ${missing.join('\n  ')}`);
  console.error('run npm run build first');
  process.exit(2);
}
let CHROMIUM;
try {
  CHROMIUM = findChromium();
} catch (e) {
  console.error(e.message);
  process.exit(2);
}
try {
  await execFileP(CHROMIUM, ['--version'], { timeout: 10_000 });
} catch (e) {
  console.error(`chromium at ${CHROMIUM} exists but won't run — ${e.message}`);
  process.exit(2);
}

function launch(args) {
  return execFileP(
    CHROMIUM,
    ['--headless', '--disable-gpu', '--no-sandbox',
      '--allow-file-access-from-files', ...args],
    { maxBuffer: 64 * 1024 * 1024, timeout: 60_000 },
  );
}

const unescapeHtml = s =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');

if (shots) mkdirSync(join(root, 'tests/shots'), { recursive: true });

let n = 0;
let passed = 0;
let failed = 0;
let fixtures = 0;
for (const { name, size } of FIXTURES) {
  const url = `file://${join(root, 'tests/fixtures', `${name}.html`)}`;
  let dom;
  try {
    ({ stdout: dom } = await launch([
      '--virtual-time-budget=3000',
      `--window-size=${size}`,
      '--dump-dom',
      url,
    ]));
  } catch (e) {
    console.log(`# ${name}: chromium failed — ${e.message}`);
    failed++;
    continue;
  }
  const m = dom.match(/<pre id="results"[^>]*>([\s\S]*?)<\/pre>/);
  if (!m) {
    console.log(`# ${name}: no <pre id="results"> in dumped DOM — fixture did not finish`);
    failed++;
    continue;
  }
  let results;
  try {
    results = JSON.parse(unescapeHtml(m[1]));
  } catch (e) {
    console.log(`# ${name}: results JSON unparseable — ${e.message}`);
    failed++;
    continue;
  }
  fixtures++;
  console.log(`# ${name} (${size})`);
  for (const r of results) {
    n++;
    if (r.ok) {
      passed++;
      console.log(`ok ${n} - ${r.name}`);
    } else {
      failed++;
      console.log(`not ok ${n} - ${r.name} (got ${r.got} want ${r.want})`);
    }
  }
  if (shots) {
    try {
      const hm = dom.match(/data-h="(\d+)"/);
      const shotSize = hm
        ? size.replace(/,\d+$/, ',' + Math.min(+hm[1] + 16, 16384))
        : size;
      await launch([
        '--virtual-time-budget=3000',
        '--hide-scrollbars',
        `--window-size=${shotSize}`,
        `--screenshot=${join(root, 'tests/shots', `${name}.png`)}`,
        url,
      ]);
      console.log(`# ${name}: shot → tests/shots/${name}.png`);
    } catch (e) {
      console.log(`# ${name}: screenshot failed — ${e.message}`);
    }
  }
}

console.log(
  `# ${n} assertions: ${passed} passed, ${n - passed} failed` +
    (fixtures < FIXTURES.length ? `; ${FIXTURES.length - fixtures} fixture(s) gave no results` : ''),
);
if (fixtures < FIXTURES.length || failed || n === 0) process.exit(1);
