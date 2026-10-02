'use strict';
/* ================= Core utilities ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const TAU = Math.PI * 2;
const PHY = { h: 6.63e-34, c: 3e8, e: 1.6e-19, me: 9.11e-31, e0: 8.85e-12, mu0: 4 * Math.PI * 1e-7, k: 9e9, kB: 1.38e-23, sigma: 5.67e-8, u: 931, mp: 1.007825, mn: 1.008665, R: 1.097e7 };

function el(tag, attrs = {}, html) {
  const e = document.createElement(tag);
  for (const k in attrs) {
    if (k === 'class') e.className = attrs[k];
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]);
    else if (k === 'style') e.style.cssText = attrs[k];
    else e.setAttribute(k, attrs[k]);
  }
  if (html !== undefined) e.innerHTML = html;
  return e;
}

const SI = [[1e12, 'T'], [1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p'], [1e-15, 'f']];
function fmtSI(v, unit = '', d = 3) {
  if (v === undefined || v === null || isNaN(v)) return '—';
  if (!isFinite(v)) return (v > 0 ? '∞ ' : '-∞ ') + unit;
  const a = Math.abs(v);
  if (a === 0) return '0 ' + unit; if (a < 1e-15 || a >= 1e15) return fmt(v, 3) + ' ' + unit;
  for (const [m, p] of SI) if (a >= m * 0.9995) { return trimNum(v / m, d) + ' ' + p + unit; }
  return v.toExponential(2) + ' ' + unit;
}
function trimNum(x, d = 3) {
  const a = Math.abs(x);
  let s = a >= 100 ? x.toFixed(Math.max(0, d - 3)) : a >= 10 ? x.toFixed(Math.max(0, d - 2)) : x.toFixed(Math.max(0, d - 1));
  return s;
}
function fmt(v, d = 3, unit = '') {
  if (v === undefined || isNaN(v)) return '—';
  if (!isFinite(v)) return '∞';
  const a = Math.abs(v);
  let s;
  if (a !== 0 && (a < 1e-3 || a >= 1e5)) {
    const e = Math.floor(Math.log10(a)); const m = v / Math.pow(10, e);
    s = m.toFixed(2) + '×10' + sup(e);
  } else s = (+v.toFixed(d)).toString();
  return unit ? s + ' ' + unit : s;
}
function sup(n) { const m = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' }; return String(n).split('').map(c => m[c] || c).join(''); }
const deg = r => r * 180 / Math.PI, rad = d => d * Math.PI / 180;

/* wavelength (nm) -> css color */
function wlColor(nm, a = 1) {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else if (nm <= 780) { r = 1; }
  let f = 1;
  if (nm < 380 || nm > 780) f = 0.25; else if (nm < 420) f = .3 + .7 * (nm - 380) / 40; else if (nm > 700) f = .3 + .7 * (780 - nm) / 80;
  if (nm < 380) { r = .55; g = .3; b = 1; }
  if (nm > 780) { r = .7; g = 0; b = 0; }
  const c = v => Math.round(255 * Math.pow(v * f, .8));
  return `rgba(${c(r)},${c(g)},${c(b)},${a})`;
}
function wlRGB(nm) { const m = wlColor(nm).match(/[\d.]+/g).map(Number); return m.slice(0, 3); }

/* HiDPI canvas */
function fitCanvas(cv) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const r = cv.getBoundingClientRect();
  const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  const ctx = cv.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.direction = 'ltr';
  return { ctx, w, h };
}

/* ---------- icons (inline svg) ---------- */
const ICON = {
  flask: '<path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9V3"/><path d="M7 15h10"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  sigma: '<path d="M18 4H6l6 8-6 8h12"/>',
  play: '<path d="M7 4l13 8-13 8z"/>',
  pause: '<path d="M7 4h4v16H7zM13 4h4v16h-4z"/>',
  reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  back: '<path d="M9 18l6-6-6-6"/>',
  moon: '<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>',
  fit: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  rotate: '<path d="M20 12a8 8 0 1 1-2.3-5.7L20 8"/><path d="M20 3v5h-5"/>',
  rec: '<circle cx="12" cy="12" r="7"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="M7 15l4-5 3 3 5-7"/>',
  dl: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
  wave: '<path d="M2 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  save: '<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v5h8"/><path d="M8 21v-7h8v7"/>',
  copy: '<path d="M8 8h12v12H8z"/><path d="M4 16V4h12"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  sidebar: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M15 4v16"/>',
  sidebarL: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
  share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
  print: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17v.5"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  chevD: '<path d="M6 9l6 6 6-6"/>', chevU: '<path d="M6 15l6-6 6 6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  flag: '<path d="M5 21V4h11l-2 4 2 4H5"/>',
  file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
  atom: '<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>'
};
const ico = (n, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24">${ICON[n] || ''}</svg>`;

/* ---------- Formula helpers ---------- */
const FR = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;

/* ================= Plot ================= */
const Plot = {
  colors: ['#1f5eff', '#e11d48', '#0e9f6e', '#d97706', '#7c3aed', '#0891b2'],
  draw(cv, series, o = {}) {
    const { ctx, w, h } = fitCanvas(cv);
    const dark = document.documentElement.getAttribute('data-theme') === 'dark' || (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    const ink = dark ? '#a9b6d3' : '#44526e', grid = dark ? 'rgba(255,255,255,.08)' : 'rgba(15,27,51,.08)';
    ctx.clearRect(0, 0, w, h);
    const L = 46, R = 10, T = 12, B = 30;
    let xs = [], ys = [];
    series.forEach(s => s.pts.forEach(p => { if (isFinite(p[0]) && isFinite(p[1])) { xs.push(p[0]); ys.push(p[1]); } }));
    let x0 = o.xmin ?? (xs.length ? Math.min(...xs) : 0), x1 = o.xmax ?? (xs.length ? Math.max(...xs) : 1);
    let y0 = o.ymin ?? (ys.length ? Math.min(...ys) : 0), y1 = o.ymax ?? (ys.length ? Math.max(...ys) : 1);
    if (o.y0zero && y0 > 0) y0 = 0; if (o.x0zero && x0 > 0) x0 = 0;
    if (x1 - x0 < 1e-12) { x1 += 1; x0 -= o.x0zero ? 0 : 1; }
    if (y1 - y0 < 1e-15) { y1 += Math.abs(y1) * .1 + 1e-9; y0 -= Math.abs(y0) * .1 + 1e-9; }
    if (!o.ymax && !o.tight) y1 += (y1 - y0) * .08; if (o.ymin === undefined && !o.y0zero && !o.tight) y0 -= (y1 - y0) * .05;
    const X = x => L + (x - x0) / (x1 - x0) * (w - L - R), Y = y => h - B - (y - y0) / (y1 - y0) * (h - T - B);
    ctx.font = '10px ui-monospace,monospace'; ctx.fillStyle = ink; ctx.strokeStyle = grid; ctx.lineWidth = 1;
    const nice = (a, b, n) => { const span = b - a, step0 = span / n, mag = Math.pow(10, Math.floor(Math.log10(step0))); const st = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= step0); const out = []; for (let v = Math.ceil(a / st) * st; v <= b + st * 1e-6; v += st) out.push(v); return out; };
    const tf = v => { const a = Math.abs(v); if (a === 0) return '0'; if (a >= 1e4 || a < 1e-2) return v.toExponential(0); return +v.toPrecision(3) + ''; };
    if (o.mm) { ctx.save(); ctx.strokeStyle = dark ? 'rgba(244,114,182,.10)' : 'rgba(225,29,72,.09)'; const gx = (w - L - R) / 50, gy = (h - T - B) / 30; ctx.beginPath(); for (let i = 0; i <= 50; i++) { ctx.moveTo(L + i * gx, T); ctx.lineTo(L + i * gx, h - B); } for (let j = 0; j <= 30; j++) { ctx.moveTo(L, T + j * gy); ctx.lineTo(w - R, T + j * gy); } ctx.stroke(); ctx.strokeStyle = dark ? 'rgba(244,114,182,.22)' : 'rgba(225,29,72,.2)'; ctx.beginPath(); for (let i = 0; i <= 50; i += 5) { ctx.moveTo(L + i * gx, T); ctx.lineTo(L + i * gx, h - B); } for (let j = 0; j <= 30; j += 5) { ctx.moveTo(L, T + j * gy); ctx.lineTo(w - R, T + j * gy); } ctx.stroke(); ctx.restore(); ctx.strokeStyle = grid; }
    ctx.textAlign = 'center';
    nice(x0, x1, Math.max(2, Math.floor((w - L) / 60))).forEach(v => { const px = X(v); ctx.beginPath(); ctx.moveTo(px, T); ctx.lineTo(px, h - B); ctx.stroke(); ctx.fillText(tf(v), px, h - B + 12); });
    ctx.textAlign = 'right';
    nice(y0, y1, Math.max(2, Math.floor((h - T - B) / 30))).forEach(v => { const py = Y(v); ctx.beginPath(); ctx.moveTo(L, py); ctx.lineTo(w - R, py); ctx.stroke(); ctx.fillText(tf(v), L - 4, py + 3); });
    ctx.strokeStyle = ink; ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, h - B); ctx.lineTo(w - R, h - B); ctx.stroke();
    if (y0 < 0 && y1 > 0) { ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(L, Y(0)); ctx.lineTo(w - R, Y(0)); ctx.stroke(); ctx.setLineDash([]); }
    ctx.font = 'bold 11px Tajawal,sans-serif'; ctx.textAlign = 'center';
    if (o.xl) ctx.fillText(o.xl, (L + w - R) / 2, h - 3);
    if (o.yl) { ctx.save(); ctx.translate(11, (T + h - B) / 2); ctx.rotate(-Math.PI / 2); ctx.fillText(o.yl, 0, 0); ctx.restore(); }
    ctx.save(); ctx.beginPath(); ctx.rect(L, T - 2, w - L - R, h - T - B + 4); ctx.clip();
    series.forEach((s, i) => {
      const col = s.color || Plot.colors[i % 6];
      ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = s.width || 2;
      if (s.dash) ctx.setLineDash(s.dash);
      if (s.type === 'pts') { s.pts.forEach(p => { ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 3.5, 0, TAU); ctx.fill(); }); }
      else if (s.type === 'bars') { s.pts.forEach(p => { ctx.fillRect(X(p[0]) - 1.5, Y(p[1]), 3, Y(Math.max(y0, 0)) - Y(p[1])); }); }
      else { ctx.beginPath(); let st = false; s.pts.forEach(p => { if (!isFinite(p[1])) { st = false; return; } const px = X(p[0]), py = Y(p[1]); st ? ctx.lineTo(px, py) : ctx.moveTo(px, py); st = true; }); ctx.stroke(); }
      ctx.setLineDash([]);
    });
    if (o.marks) o.marks.forEach(m => { ctx.strokeStyle = m.color || '#d97706'; ctx.setLineDash([4, 3]); ctx.beginPath(); if (m.x !== undefined) { ctx.moveTo(X(m.x), T); ctx.lineTo(X(m.x), h - B); } else { ctx.moveTo(L, Y(m.y)); ctx.lineTo(w - R, Y(m.y)); } ctx.stroke(); ctx.setLineDash([]); if (m.label) { ctx.fillStyle = m.color || '#d97706'; ctx.font = 'bold 10px Tajawal,sans-serif'; ctx.textAlign = 'left'; ctx.fillText(m.label, m.x !== undefined ? X(m.x) + 3 : L + 4, m.x !== undefined ? T + 10 : Y(m.y) - 3); } });
    ctx.restore();
    if (series.some(s => s.name)) {
      ctx.font = 'bold 11px Tajawal,sans-serif'; ctx.textAlign = 'right'; let yy = T + 12;
      series.filter(s => s.name).forEach((s, i) => { const col = s.color || Plot.colors[series.indexOf(s) % 6]; ctx.fillStyle = col; ctx.fillRect(w - R - 12, yy - 8, 10, 3); ctx.fillText(s.name, w - R - 16, yy - 3); yy += 14; });
    }
    return { X, Y };
  }
};

/* ---------- drawing helpers for stages ---------- */
const G = {
  arrow(ctx, x1, y1, x2, y2, col = '#fff', w = 2, hs = 8) {
    const a = Math.atan2(y2 - y1, x2 - x1);
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * hs * .6, y2 - Math.sin(a) * hs * .6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - hs * Math.cos(a - .4), y2 - hs * Math.sin(a - .4)); ctx.lineTo(x2 - hs * Math.cos(a + .4), y2 - hs * Math.sin(a + .4)); ctx.closePath(); ctx.fill();
  },
  text(ctx, s, x, y, o = {}) {
    if (o.raw && ctx.canvas && !ctx.canvas.__raw) { ctx.canvas.__raw = true; try { return G.text(ctx, s, x, y, o); } finally { ctx.canvas.__raw = false; } }
    s = String(s); const ar = /[\u0600-\u06FF]/.test(s); ctx.direction = ar ? 'rtl' : 'ltr'; if (ar && /[A-Za-z0-9]/.test(s) && s.indexOf('\u2066') < 0) s = s.replace(/[(A-Za-z0-9][A-Za-z0-9 .=×÷+\-−\/²³√()·,:≈%°]*[A-Za-z0-9)²³%°]|[0-9]/g, m => '\u2066' + m + '\u2069');
    ctx.font = `${o.w || 700} ${o.s || 13}px ${o.mono ? 'ui-monospace,monospace' : 'Tajawal,sans-serif'}`;
    ctx.fillStyle = o.c || '#dbe6ff'; ctx.textAlign = o.a || 'center'; ctx.textBaseline = o.b || 'middle';
    if (o.bg) { const m = ctx.measureText(s); const pw = m.width + 10, ph = (o.s || 13) + 8; let bx = o.a === 'left' ? x - 5 : o.a === 'right' ? x - pw + 5 : x - pw / 2; ctx.fillStyle = o.bg; rr(ctx, bx, y - ph / 2, pw, ph, 6); ctx.fill(); ctx.fillStyle = o.c || '#dbe6ff'; }
    ctx.fillText(s, x, y); ctx.textBaseline = 'alphabetic';
  },
  bg(ctx, w, h, grid = true) {
    if (ctx.canvas && ctx.canvas.__book) { ctx.canvas.__raw = true; ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h); if (grid) { ctx.strokeStyle = 'rgba(31,94,255,.07)'; ctx.lineWidth = 1; ctx.beginPath(); for (let x = 0; x < w; x += 24) { ctx.moveTo(x, 0); ctx.lineTo(x, h); } for (let y = 0; y < h; y += 24) { ctx.moveTo(0, y); ctx.lineTo(w, y); } ctx.stroke(); } ctx.canvas.__raw = false; return; }
    const g = ctx.createRadialGradient(w * .5, h * .35, 10, w * .5, h * .5, Math.max(w, h) * .8);
    g.addColorStop(0, '#16223b'); g.addColorStop(1, '#0a1120');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    if (grid) { ctx.strokeStyle = 'rgba(120,150,210,.06)'; ctx.lineWidth = 1; ctx.beginPath(); for (let x = 0; x < w; x += 24) { ctx.moveTo(x, 0); ctx.lineTo(x, h); } for (let y = 0; y < h; y += 24) { ctx.moveTo(0, y); ctx.lineTo(w, y); } ctx.stroke(); }
  },
  meter(ctx, x, y, r, val, max, label, unit, o = {}) {
    const rw = ctx.canvas.__raw; ctx.canvas.__raw = true; try { this._meter(ctx, x, y, r, val, max, label, unit, o); } finally { ctx.canvas.__raw = rw; }
  },
  _meter(ctx, x, y, r, val, max, label, unit, o = {}) {
    ctx.save();
    const g = ctx.createLinearGradient(x, y - r, x, y + r); g.addColorStop(0, '#2b3a55'); g.addColorStop(1, '#141d30');
    ctx.fillStyle = g; rr(ctx, x - r * 1.25, y - r, r * 2.5, r * 1.9, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#f6f1e3'; rr(ctx, x - r * 1.08, y - r * .85, r * 2.16, r * 1.25, 7); ctx.fill();
    const cx = x, cy = y + r * .3, R = r * .95;
    const a0 = o.center ? -Math.PI * .8 : -Math.PI * .8, a1 = -Math.PI * .2;
    ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) { const a = a0 + (a1 - a0) * i / 10; const l = i % 5 === 0 ? 8 : 4; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.lineTo(cx + Math.cos(a) * (R - l), cy + Math.sin(a) * (R - l)); ctx.stroke(); }
    let f = o.center ? clamp(.5 + val / (2 * max), 0, 1) : clamp(val / max, 0, 1.05);
    const a = a0 + (a1 - a0) * f;
    ctx.strokeStyle = '#c1121f'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * (R - 2), cy + Math.sin(a) * (R - 2)); ctx.stroke();
    ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, TAU); ctx.fill();
    ctx.fillStyle = '#1b2a4a'; ctx.font = `900 ${Math.round(r * .42)}px Tajawal,sans-serif`; ctx.textAlign = 'center'; ctx.fillText(label, cx, cy - R * .32);
    if (unit !== undefined) { ctx.fillStyle = '#9fe870'; ctx.font = `700 ${Math.max(10, Math.round(r * .34))}px ui-monospace,monospace`; ctx.fillText(unit, x, y + r * .8); }
    ctx.restore();
  },
  glow(ctx, x, y, r, col, a = 1) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); },
  magnet(ctx, x, y, w, h, flip = false, horiz = true) {
    ctx.save(); ctx.translate(x, y); if (!horiz) ctx.rotate(Math.PI / 2);
    const cN = '#d62839', cS = '#1d4ed8';
    ctx.fillStyle = flip ? cS : cN; rr(ctx, -w / 2, -h / 2, w / 2, h, 4); ctx.fill();
    ctx.fillStyle = flip ? cN : cS; rr(ctx, 0, -h / 2, w / 2, h, 4); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = `900 ${Math.round(h * .55)}px Tajawal,sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.save(); ctx.translate(-w / 4, 0); if (!horiz) ctx.rotate(-Math.PI / 2); ctx.fillText(flip ? 'S' : 'N', 0, 1); ctx.restore();
    ctx.save(); ctx.translate(w / 4, 0); if (!horiz) ctx.rotate(-Math.PI / 2); ctx.fillText(flip ? 'N' : 'S', 0, 1); ctx.restore();
    ctx.restore(); ctx.textBaseline = 'alphabetic';
  },
  coil(ctx, x, y, w, h, turns, col = '#c87533', core = false) {
    if (core) { ctx.fillStyle = '#6b7280'; ctx.fillRect(x - w / 2 - 6, y - h * .28, w + 12, h * .56); }
    ctx.lineWidth = 3; ctx.strokeStyle = col;
    for (let i = 0; i < turns; i++) {
      const xx = x - w / 2 + (i + .5) * w / turns;
      ctx.beginPath(); ctx.ellipse(xx, y, w / turns * .45, h / 2, 0, -Math.PI / 2, Math.PI / 2, true); ctx.stroke();
    }
    ctx.strokeStyle = shade(col, 30); ctx.lineWidth = 3;
    for (let i = 0; i < turns; i++) { const xx = x - w / 2 + (i + .5) * w / turns; ctx.beginPath(); ctx.ellipse(xx, y, w / turns * .45, h / 2, 0, -Math.PI / 2, Math.PI / 2, false); ctx.stroke(); }
  },
  wire(ctx, pts, col = '#e2e8f0', w = 2.5) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); },
  dotsAlong(ctx, pts, phase, col = '#ffd166', sp = 16) {
    let segs = [], tot = 0; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(l); tot += l; }
    ctx.fillStyle = col; let off = ((phase % sp) + sp) % sp;
    for (let d = off; d < tot; d += sp) { let r = d, i = 0; while (i < segs.length && r > segs[i]) { r -= segs[i]; i++; } if (i >= segs.length) break; const t = r / segs[i]; const x = lerp(pts[i][0], pts[i + 1][0], t), y = lerp(pts[i][1], pts[i + 1][1], t); ctx.beginPath(); ctx.arc(x, y, 2.4, 0, TAU); ctx.fill(); }
  }
};
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function shade(hex, p) { let n = parseInt(hex.slice(1), 16); let r = (n >> 16) + p, g = ((n >> 8) & 255) + p, b = (n & 255) + p; r = clamp(r, 0, 255); g = clamp(g, 0, 255); b = clamp(b, 0, 255); return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); }
function gauss() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); }
