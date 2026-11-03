/* eslint-disable no-unused-vars -- helpers are called by each fixture
   page's inline script, not from this file */
/* global main */
const R = [];
const $ = id => document.getElementById(id);
/* missing ids record a failing assertion instead of throwing — one
   typo'd id must not kill every later assertion in the fixture */
const cs = (el, p) => {
  const n = $(el);
  return n ? getComputedStyle(n).getPropertyValue(p) : `(missing #${el})`;
};
const px = v => parseFloat(v);
const NARECT = { top: NaN, bottom: NaN, left: NaN, right: NaN, width: NaN, height: NaN, x: NaN, y: NaN };
const rect = id => { const n = $(id); return n ? n.getBoundingClientRect() : NARECT; };
const rec = (name, got, want, ok) => R.push({ name, got: String(got), want: String(want), ok });
const eq = (name, got, want) => rec(name, got, want, got === want);
const near = (name, got, want, tol = 1.5) => rec(name, got, want + '±' + tol, Math.abs(px(got) - px(want)) <= tol);
const neq = (name, got, bad) => rec(name, got, 'not ' + bad, got !== bad && !String(got).startsWith('(missing'));
const has = (name, got, sub) => rec(name, got, '~' + sub, String(got).includes(sub));
const match = (name, got, re) => rec(name, got, String(re), re.test(got));
const probe = $('probe');
const varPx = name => { probe.style.height = `var(${name},0px)`; return probe.getBoundingClientRect().height; };
const TRANS = 'rgba(0, 0, 0, 0)';
const propRules = () => {
  const out = {};
  const walk = rules => {
    for (const r of rules) {
      if (r.name && typeof r.inherits === 'boolean') out[r.name] = r;
      if (r.cssRules) walk(r.cssRules);
    }
  };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch { /* opaque sheet — file:// origin may hide cssRules */ } }
  return out;
};
const tracks = el => cs(el, 'grid-template-columns').split(' ').filter(s => s.endsWith('px')).length;
const mediaOf = sel => {
  let found = null;
  const walk = rules => {
    for (const r of rules) {
      if (found) return;
      if (r.selectorText && r.selectorText.includes(sel)) found = r;
      if (!found && r.cssRules) walk(r.cssRules);
    }
  };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch { /* opaque sheet — file:// origin may hide cssRules */ } }
  if (!found) return 'missing';
  let p = found.parentRule;
  while (p && p.type !== CSSRule.MEDIA_RULE) p = p.parentRule;
  return p ? p.media.mediaText : 'top-level';
};
/* last declaration value of prop on the rule whose selectorText
   equals sel — for asserting declarations env() can't prove in
   computed style (it resolves to 0 in headless) */
const declOf = (sel, prop) => {
  let val = null;
  const walk = rules => {
    for (const r of rules) {
      if (r.selectorText === sel && r.style) {
        const v = r.style.getPropertyValue(prop);
        if (v) val = v;
      }
      if (r.cssRules) walk(r.cssRules);
    }
  };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch { /* opaque sheet — file:// origin may hide cssRules */ } }
  return val;
};
/* count of style rules whose selectorText contains frag — for
   presence assertions on rules (hover, :has) that computed style
   can't reach without input simulation */
const ruleCount = frag => {
  let n = 0;
  const walk = rules => {
    for (const r of rules) {
      if (r.selectorText && r.selectorText.includes(frag)) n++;
      if (r.cssRules) walk(r.cssRules);
    }
  };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch { /* opaque sheet */ } }
  return n;
};
const mediaDecl = (sel, prop, media) => {
  let val = null;
  const walk = (rules, inside) => {
    for (const r of rules) {
      const hit = inside ||
        (r.type === CSSRule.MEDIA_RULE && r.media.mediaText === media);
      if (hit && r.selectorText === sel && r.style) {
        const v = r.style.getPropertyValue(prop);
        if (v) val = v;
      }
      if (r.cssRules) walk(r.cssRules, hit);
    }
  };
  for (const s of document.styleSheets) { try { walk(s.cssRules, false); } catch { /* opaque sheet — file:// origin may hide cssRules */ } }
  return val;
};
const mediaList = () => {
  const out = [];
  const walk = rules => {
    for (const r of rules) {
      if (r.type === CSSRule.MEDIA_RULE) out.push(r.media.mediaText);
      if (r.cssRules) walk(r.cssRules);
    }
  };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch { /* opaque sheet — file:// origin may hide cssRules */ } }
  return out;
};
const vw = () => document.documentElement.clientWidth;
const vh = () => document.documentElement.clientHeight;

function canary() {
  for (const t of [
    '--sl-xs', '--sl-sm', '--sl-md', '--sl-lg', '--sl-xl',
    '--sl-2xl', '--sl-3xl', '--sl-4xl', '--sl-5xl',
    '--sl-container-sm', '--sl-container-md', '--sl-container-lg',
    '--sl-radius-pill',
  ]) {
    const v = varPx(t);
    rec(`token ${t} resolves`, v + 'px', '>0px', v > 0);
  }
  probe.style.color = 'var(--sl-primary)';
  const pc = getComputedStyle(probe).color;
  rec('theme --sl-primary resolves', pc, 'non-default color', pc !== '' && pc !== 'rgb(0, 0, 0)' && !pc.startsWith('(missing'));
}

function go() {
  R.length = 0;
  canary();
  try { main(); } catch (e) { R.push({ name: 'fixture threw', got: String(e && e.stack || e), want: 'no throw', ok: false }); }
  $('results').textContent = JSON.stringify(R);
  document.documentElement.setAttribute('data-done', '');
  labelize();
}
function labelize() {
  document.querySelectorAll('.tl').forEach(n => n.remove());
  if (!document.getElementById('tl-style')) {
    const st = document.createElement('style');
    st.id = 'tl-style';
    st.textContent = '.tl{position:absolute;z-index:2147483647;font:600 10px/1.5 ui-monospace,monospace;color:#fff;background:rgba(15,15,20,.62);padding:0 4px;border-radius:3px;pointer-events:none;white-space:nowrap}';
    document.head.append(st);
  }
  for (const el of document.querySelectorAll('[id]')) {
    if (el.id === 'results' || el.id === 'probe' || el.id === 'tl-style') continue;
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) continue;
    const tag = document.createElement('i');
    tag.className = 'tl';
    tag.textContent = el.id;
    tag.style.left = Math.max(0, r.left + scrollX) + 'px';
    tag.style.top = Math.max(0, r.top + scrollY) + 'px';
    document.body.append(tag);
  }
  $('results').style.display = 'none';
  document.documentElement.setAttribute('data-h', Math.ceil(document.documentElement.scrollHeight));
}
/* rAF is flaky under --virtual-time-budget (no frames without rendering),
   so a plain timer drives the run; both paths converge on go().
   module scripts (bundle-execution assertions) must finish before
   go() — DOMContentLoaded waits for them, a bare timer does not */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(go, 0), { once: true });
}
setTimeout(go, 0);
requestAnimationFrame(() => setTimeout(go, 0));
