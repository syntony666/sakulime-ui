import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { accessSync, constants, globSync, statSync } from 'node:fs';
import { join } from 'node:path';

const onPath = name => {
  try {
    return execFileSync('which', [name], {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return '';
  }
};

export function findChromium({
  override = process.env.SL_CHROMIUM,
  pathCandidates = [onPath('chromium'), onPath('chrome-headless-shell')],
  cacheRoot = '/tmp/chromium',
} = {}) {
  const candidates = override
    ? [override]
    : [
        ...pathCandidates.filter(Boolean),
        ...globSync(join(cacheRoot, '**/chrome-headless-shell')),
      ];
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
    `no executable Chromium found (tried: ${candidates.join(', ') || 'none'}); ` +
      'set SL_CHROMIUM or run the test pipeline',
  );
}
