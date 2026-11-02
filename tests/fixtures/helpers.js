/* shared assertion harness for the fixture pages — loaded before each
   fixture's own script, which defines main() and nothing else */
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
const neq = (name, got, bad) => rec(name, got, 'not ' + bad, got !== bad);
const has = (name, got, sub) => rec(name, got, '~' + sub, String(got).includes(sub));
const match = (name, got, re) => rec(name, got, String(re), re.test(got));
const probe = $('probe');
const varPx = name => { probe.style.height = `var(${name},0px)`; return probe.getBoundingClientRect().height; };
const TRANS = 'rgba(0, 0, 0, 0)';
/* collect @property registrations from the loaded sheets — plumbing
   slots are registered element-scoped, theme hooks stay inheriting */
const propRules = () => {
  const out = {};
  const walk = rules => {
    for (const r of rules) {
      if (r.name && typeof r.inherits === 'boolean') out[r.name] = r;
      if (r.cssRules) walk(r.cssRules);
    }
  };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch (e) {} }
  return out;
};
const tracks = el => cs(el, 'grid-template-columns').split(' ').filter(s => s.endsWith('px')).length;
/* walk the loaded sheets (through @layer/@media) — returns the media
   text of the nearest enclosing @media for the first rule matching
   sel, or 'top-level'/'missing' */
const mediaOf = sel => {
  let found = null;
  /* CSSStyleRule.cssRules exists (nesting) and is truthy even when
     empty — match the selector first, then keep walking group rules */
  const walk = rules => {
    for (const r of rules) {
      if (found) return;
      if (r.selectorText && r.selectorText.includes(sel)) found = r;
      if (!found && r.cssRules) walk(r.cssRules);
    }
  };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch (e) {} }
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
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch (e) {} }
  return val;
};
/* last declaration of prop on the rule whose selectorText equals
   sel and lives inside a @media block whose condition is media */
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
  for (const s of document.styleSheets) { try { walk(s.cssRules, false); } catch (e) {} }
  return val;
};
/* every @media condition in the loaded sheets — for presence checks
   (print, reduced-motion) that don't need a specific rule */
const mediaList = () => {
  const out = [];
  const walk = rules => {
    for (const r of rules) {
      if (r.type === CSSRule.MEDIA_RULE) out.push(r.media.mediaText);
      if (r.cssRules) walk(r.cssRules);
    }
  };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch (e) {} }
  return out;
};
/* fixed-position anchors resolve against the layout viewport, which
   excludes the scrollbar — documentElement.client* matches it */
const vw = () => document.documentElement.clientWidth;
const vh = () => document.documentElement.clientHeight;

/* token canary — if the theme sheet failed to load every varPx() is
   0 and near() would pass vacuously on both sides; prove the scale
   is real before any near() runs */
function canary() {
  for (const t of [
    '--sl-xs', '--sl-sm', '--sl-md', '--sl-lg',
    '--sl-2xl', '--sl-3xl', '--sl-4xl', '--sl-5xl',
    '--sl-container-sm', '--sl-container-md', '--sl-container-lg',
    '--sl-radius-pill',
  ]) {
    const v = varPx(t);
    rec(`token ${t} resolves`, v + 'px', '>0px', v > 0);
  }
}

function go() {
  R.length = 0;
  canary();
  try { main(); } catch (e) { R.push({ name: 'fixture threw', got: String(e && e.stack || e), want: 'no throw', ok: false }); }
  $('results').textContent = JSON.stringify(R);
  document.documentElement.setAttribute('data-done', '');
  labelize();
}
/* post-assertion pass: floating id chips at each element's rect so
   --screenshot output reads as a labeled contact sheet. Absolute
   positioning keeps layout — and every assertion — untouched. */
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
   so a plain timer drives the run; both paths converge on go(). */
setTimeout(go, 0);
requestAnimationFrame(() => setTimeout(go, 0));
