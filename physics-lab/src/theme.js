'use strict';
/* =====================================================================
   Book theme: stages look like the textbook figures (white page, dark ink)
   Light "ink" colours used on dark stages are remapped automatically.
   ===================================================================== */
const THEME = { book: true };
try { const v = localStorage.getItem('lab-book'); if (v !== null) THEME.book = v === '1'; } catch (e) { }
const BookInk = (() => {
  const cache = new Map();
  const parse = s => {
    s = s.trim().toLowerCase(); let m;
    if (s[0] === '#') { if (s.length === 4) s = '#' + s[1] + s[1] + s[2] + s[2] + s[3] + s[3]; if (s.length !== 7) return null; const n = parseInt(s.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255, 1]; }
    if ((m = s.match(/^rgba?\(([^)]+)\)$/))) { const p = m[1].split(',').map(x => parseFloat(x)); if (p.length < 3 || p.some(isNaN)) return null; return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; }
    if (s === 'white') return [255, 255, 255, 1];
    return null;
  };
  const rgb2hsl = (r, g, b) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0, s = 0; const l = (mx + mn) / 2; if (mx !== mn) { const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h /= 6; } return [h, s, l]; };
  const hsl2rgb = (h, s, l) => { if (!s) return [l, l, l].map(v => Math.round(v * 255)); const q = l < .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q; const f = t => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; }; return [f(h + 1 / 3), f(h), f(h - 1 / 3)].map(v => Math.round(v * 255)); };
  function map(s) {
    if (typeof s !== 'string') return s;
    if (s === '#fff' || s === '#ffffff') return s;
    if (cache.has(s)) return cache.get(s);
    const c = parse(s); let out = s;
    if (c) {
      const [h, sa, l] = rgb2hsl(c[0], c[1], c[2]); const a = c[3];
      if (l > .6) { const L = sa < .15 ? .2 : clamp(1.02 - l, .24, .42); const r = hsl2rgb(h, Math.min(1, sa * 1.1), L); out = `rgba(${r[0]},${r[1]},${r[2]},${Math.min(1, a < 1 ? a * 1.5 + .05 : 1)})`; }
      else if (l < .2 && a < .95) out = `rgba(255,255,255,${Math.min(.92, a + .2)})`;
    }
    cache.set(s, out); return out;
  }
  return { map };
})();
(() => {
  const P = CanvasRenderingContext2D.prototype;
  ['fillStyle', 'strokeStyle', 'shadowColor'].forEach(k => {
    const d = Object.getOwnPropertyDescriptor(P, k); if (!d) return;
    Object.defineProperty(P, k, { get() { return d.get.call(this); }, set(v) { const cv = this.canvas; d.set.call(this, (cv && cv.__book && !cv.__raw) ? BookInk.map(v) : v); }, configurable: true });
  });
  const addStop = CanvasGradient.prototype.addColorStop; void addStop;
})();
function setRaw(ctx, on) { if (ctx.canvas) ctx.canvas.__raw = on; }
