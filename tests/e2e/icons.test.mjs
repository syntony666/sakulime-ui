import assert from 'node:assert/strict';
import { test } from 'node:test';
import { runSpec } from './browser.mjs';

test('the icon api behaves in a real browser', async t => {
  const cases = await runSpec('/tests/e2e/pages/icons.html');
  assert.ok(cases.length > 0, 'spec page produced no cases');
  for (const c of cases) {
    await t.test(c.name, () => assert.ok(c.pass, c.note || 'browser assertion failed'));
  }
});
