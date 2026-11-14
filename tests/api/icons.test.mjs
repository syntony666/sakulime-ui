import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  icon, iconNames, installResolver, packNames, registerPack,
  registerResolver, resolve,
} from '../../packages/core/dist/index.min.js';

const pack = { icons: { box: { body: '<path d="M0 0h1v1z"/>' } }, width: 32, height: 32 };

test('icon() renders an svg string using the pack dimensions', async () => {
  await registerPack('t', pack);
  assert.equal(
    icon('t:box'),
    '<svg sl-icon viewBox="0 0 32 32" aria-hidden="true"><path d="M0 0h1v1z"/></svg>',
  );
});

test('icon() lets entry dimensions override pack and defaults', async () => {
  await registerPack('u', {
    icons: {
      wide: { body: '<rect/>', width: 48, height: 12, left: -4, top: 2 },
      plain: { body: '<circle/>' },
    },
  });
  assert.equal(
    icon('u:wide'),
    '<svg sl-icon viewBox="-4 2 48 12" aria-hidden="true"><rect/></svg>',
  );
  assert.equal(
    icon('u:plain'),
    '<svg sl-icon viewBox="0 0 24 24" aria-hidden="true"><circle/></svg>',
  );
});

test('icon() accepts dash syntax as pack-name', () => {
  assert.equal(icon('t-box'), icon('t:box'));
});

test('icon() splits at the first colon before any dash', async () => {
  await registerPack('v', { icons: { 'b-c': { body: '<g/>' } } });
  assert.equal(icon('v:b-c'), '<svg sl-icon viewBox="0 0 24 24" aria-hidden="true"><g/></svg>');
});

test('icon() rejects unparseable names with a warning', t => {
  const warn = t.mock.method(console, 'warn', () => {});
  assert.equal(icon('nosplit'), '');
  assert.match(String(warn.mock.calls[0].arguments[0]), /bad name "nosplit"/);
});

test('icon() warns about unknown icons and unregistered packs differently', t => {
  const warn = t.mock.method(console, 'warn', () => {});
  assert.equal(icon('t:missing'), '');
  assert.match(String(warn.mock.calls[0].arguments[0]), /unknown icon "t:missing"$/);
  assert.equal(icon('zz:x'), '');
  assert.match(String(warn.mock.calls[1].arguments[0]), /pack "zz" not registered/);
});

test('icon() warns only once per name', t => {
  const warn = t.mock.method(console, 'warn', () => {});
  icon('alsonosplit');
  icon('alsonosplit');
  icon('alsonosplit');
  assert.equal(warn.mock.calls.length, 1);
});

test('packNames() and iconNames() report registered packs', async () => {
  await registerPack('w', { icons: { a: { body: '<a/>' }, b: { body: '<b/>' } } });
  assert.ok(packNames().includes('w'));
  assert.deepEqual(iconNames('w').sort(), ['a', 'b']);
  assert.deepEqual(iconNames('no-such-pack'), []);
});

test('registerPack() fetches iconify data when given a URL', async t => {
  const fetched = { icons: { remote: { body: '<r/>' } } };
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => ({ json: async () => fetched }));
  await registerPack('net', 'https://icons.invalid/pack.json');
  assert.equal(fetchMock.mock.calls.length, 1);
  assert.equal(fetchMock.mock.calls[0].arguments[0], 'https://icons.invalid/pack.json');
  assert.equal(icon('net:remote'), '<svg sl-icon viewBox="0 0 24 24" aria-hidden="true"><r/></svg>');
});

test('registerResolver() + resolve() fans out over a root', () => {
  const seen = [];
  registerResolver('sl-test-attr', el => seen.push(el));
  const elements = [{ tag: 'a' }, { tag: 'b' }];
  resolve({ querySelectorAll: sel => (sel === '[sl-test-attr]' ? elements : []) });
  assert.deepEqual(seen, elements);
});

test('installResolver() is a no-op outside a DOM', () => {
  assert.equal(typeof document, 'undefined');
  assert.doesNotThrow(() => installResolver());
});
