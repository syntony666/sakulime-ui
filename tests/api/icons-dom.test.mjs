import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Window } from 'happy-dom';

const window = new Window();
globalThis.document = window.document;
globalThis.MutationObserver = window.MutationObserver;
globalThis.HTMLElement = window.HTMLElement;
globalThis.SVGElement = window.SVGElement;

const { registerPack, registerResolver, resolve, resolveIcons } =
  await import('../../packages/core/dist/index.min.js');

const flush = () => new Promise(r => setTimeout(r, 0));
const BOX = { icons: { box: { body: '<path/>' }, other: { body: '<g/>' } } };

test('placeholders fill once a pack registers', async () => {
  document.body.innerHTML = '<i sl-icon="d:box" id="d1"></i><i sl-icon="late:x" id="d2"></i>';
  await registerPack('d', BOX);
  const d1 = document.getElementById('d1');
  assert.match(d1.innerHTML, /<svg sl-icon="" viewBox="0 0 24 24" aria-hidden="true"><path><\/path><\/svg>/);
  assert.equal(d1.getAttribute('data-sl-resolved'), 'd:box');
  assert.equal(document.getElementById('d2').innerHTML, '');
});

test('a second pack reaches placeholders that were waiting', async () => {
  await registerPack('late', { icons: { x: { body: '<x/>' } } });
  assert.match(document.getElementById('d2').innerHTML, /<svg sl-icon/);
  assert.equal(document.getElementById('d2').getAttribute('data-sl-resolved'), 'late:x');
});

test('nodes added later fill through the observer', async () => {
  const host = document.createElement('div');
  host.innerHTML = '<span><i sl-icon="d:box"></i></span>';
  document.body.appendChild(host);
  await flush();
  assert.match(host.querySelector('i').innerHTML, /<svg sl-icon/);
});

test('attribute changes re-fill a resolved icon', async () => {
  const i = document.createElement('i');
  i.setAttribute('sl-icon', 'd:box');
  document.body.appendChild(i);
  await flush();
  assert.match(i.innerHTML, /<path><\/path>/);
  i.setAttribute('sl-icon', 'd:other');
  await flush();
  assert.match(i.innerHTML, /<g><\/g>/);
  assert.equal(i.getAttribute('data-sl-resolved'), 'd:other');
});

test('an empty sl-icon attr is tagged without markup', () => {
  const host = document.createElement('div');
  host.innerHTML = '<i sl-icon></i>';
  resolveIcons(host);
  const i = host.firstElementChild;
  assert.equal(i.innerHTML, '');
  assert.ok(i.hasAttribute('data-sl-resolved'));
});

test('svg elements keep their own content', () => {
  const host = document.createElement('div');
  host.innerHTML = '<svg sl-icon="d:box"><title>kept</title></svg>';
  resolveIcons(host);
  const svg = host.firstElementChild;
  assert.match(svg.innerHTML, /<title>kept<\/title>/);
  assert.ok(!svg.hasAttribute('data-sl-resolved'));
});

test('resolveIcons scopes to the given root', () => {
  const a = document.createElement('div');
  const b = document.createElement('div');
  a.innerHTML = '<i sl-icon="d:box"></i>';
  b.innerHTML = '<i sl-icon="d:box"></i>';
  resolveIcons(a);
  assert.match(a.firstElementChild.innerHTML, /<svg sl-icon/);
  assert.equal(b.firstElementChild.innerHTML, '');
});

test('attribute mutations on resolvers registered after install are not observed', async () => {
  const seen = [];
  const i = document.createElement('i');
  document.body.appendChild(i);
  await flush();
  registerResolver('sl-late', el => seen.push(el));
  i.setAttribute('sl-late', 'x');
  await flush();
  assert.equal(seen.length, 0);
  resolve(document);
  assert.deepEqual(seen, [i]);
});
