import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export function mockBin(dir, name, source) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, name), source, { mode: 0o755 });
}

export const readCalls = path =>
  existsSync(path) ? readFileSync(path, 'utf8').trim().split('\n').map(JSON.parse) : [];
