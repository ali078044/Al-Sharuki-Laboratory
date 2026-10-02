'use strict';
/* ====================== الأول المتوسط — الفصل الخامس: أثر الحرارة في المواد (ص 73–88) ====================== */

/* ---------- local drawing helpers for chapter 15 (prefix C5) ---------- */
const C5 = {
  T0: 25,
  /* hot-metal tint: returns rgba string for an overlay, '' when cold */
  tint(T, a0 = 0) { const k = clamp((T - 120) / 480, 0, 1); if (k <= 0) return ''; return `rgba(${255},${Math.round(120 - 70 * k)},${Math.round(40 - 30 * k)},${(a0 + .55 * k).toFixed(3)})`; },
  glow(ctx, x, y, r, T) { if (T < 300) return; const a = clamp((T - 300) / 400, 0, .6); const g = ctx.createRadialGradient(x, y, r * .6, x, y, r * 1.9); g.addColorStop(0, `rgba(255,120,40,${a})`); g.addColorStop(1, 'rgba(255,120,40,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.9, 0, TAU); ctx.fill(); },
  /* metal sphere with heat tint */
  metalBall(ctx, x, y, r, T, col = '#9ca3af') { K.ball(ctx, x, y, r, col); const t = C5.tint(T); if (t) { ctx.fillStyle = t; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); } ctx.strokeStyle = 'rgba(15,23,42,.45)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); },
  /* rod ending in a wooden handle */
  handle(ctx, x1, y1, x2, y2, o = {}) {
    const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1), hl = o.hl || Math.min(90, L * .5);
    ctx.save(); ctx.translate(x1, y1); ctx.rotate(a); ctx.lineCap = 'round';
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = o.rw || 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(L - hl, 0); ctx.stroke(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -1.5); ctx.lineTo(L - hl, -1.5); ctx.stroke();
    const g = ctx.createLinearGradient(0, -9, 0, 9); g.addColorStop(0, '#78350f'); g.addColorStop(.35, '#b45309'); g.addColorStop(1, '#451a03'); ctx.fillStyle = g; rr(ctx, L - hl, -9, hl, 18, 8); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(L - hl + 6, -6, hl - 14, 3); ctx.restore(); ctx.lineCap = 'butt';
  },
  /* lens with a lattice of particles (solid), temperature T */
  lattice(ctx, cx, cy, R, T, t, o = {}) {
    const n = o.n || 5, col = o.col || '#64748b', k = (T - 25);
    const s = R * 1.5 / n * (1 + clamp(k, -30, 700) * (o.gap ?? .00075)), amp = 1 + Math.max(0, T + 273) / 298 * 1.2 + clamp(k, 0, 700) / 55;
    K.lens(ctx, cx, cy, R, () => {
      ctx.fillStyle = o.bg || '#f8fafc'; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      const pts = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const ph = i * 2.3 + j * 3.7; pts.push([cx + (i - (n - 1) / 2) * s + Math.sin(t * 19 + ph) * amp * .5, cy + (j - (n - 1) / 2) * s + Math.cos(t * 23 + ph * 1.3) * amp * .5]); }
      ctx.strokeStyle = 'rgba(100,116,139,.45)'; ctx.lineWidth = 1.2; ctx.beginPath();
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const p = pts[i * n + j]; if (i < n - 1) { const q = pts[(i + 1) * n + j]; ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); } if (j < n - 1) { const q = pts[i * n + j + 1]; ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); } }
      ctx.stroke();
      const hc = C5.tint(T); pts.forEach(p => { K.ball(ctx, p[0], p[1], s * .3, col); if (hc) { ctx.fillStyle = hc; ctx.beginPath(); ctx.arc(p[0], p[1], s * .3, 0, TAU); ctx.fill(); } });
    });
    if (o.label) G.text(ctx, o.label, cx, cy - R - 14, { s: 12, w: 900, c: '#fff', bg: o.lbg || '#0f766e' });
  },
  /* lab stand: base on bench at yb, rod up to yt at x */
  stand(ctx, x, yb, yt, o = {}) {
    ctx.fillStyle = '#334155'; rr(ctx, x - (o.bw || 46), yb - 10, (o.bw || 46) * 2, 12, 5); ctx.fill();
    const g = ctx.createLinearGradient(x - 4, 0, x + 4, 0); g.addColorStop(0, '#94a3b8'); g.addColorStop(.5, '#f1f5f9'); g.addColorStop(1, '#64748b'); ctx.fillStyle = g; ctx.fillRect(x - 4, yt, 8, yb - yt - 8);
  },
  clamp(ctx, x, y) { ctx.fillStyle = '#475569'; rr(ctx, x - 9, y - 9, 18, 18, 4); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(x, y, 4, 0, TAU); ctx.fill(); },
  /* wavy heat arrow */
  heatArrow(ctx, x1, y1, x2, y2, t, col = '#f97316') {
    const L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1); if (L < 8) return;
    ctx.save(); ctx.translate(x1, y1); ctx.rotate(a); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath();
    for (let s = 0; s <= L - 10; s += 2) { const yy = Math.sin(s / 7 - t * 9) * 4; s ? ctx.lineTo(s, yy) : ctx.moveTo(s, yy); } ctx.stroke();
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(L, 0); ctx.lineTo(L - 11, -6); ctx.lineTo(L - 11, 6); ctx.closePath(); ctx.fill(); ctx.restore(); ctx.lineCap = 'butt';
  },
  /* steam wisps rising from (x,y) across width wd */
  steam(ctx, x, y, wd, t, amt = 1, col = '255,255,255') {
    if (amt <= .02) return; const n = Math.round(3 + 5 * amt);
    for (let i = 0; i < n; i++) { const ph = (t * .45 + i / n) % 1, xx = x + (((i * 37) % 11) / 10 - .5) * wd + Math.sin(ph * 7 + i) * 8, yy = y - ph * 90 * (.6 + amt * .6), r = 7 + ph * 16;
      ctx.fillStyle = `rgba(${col},${(.55 * (1 - ph) * Math.min(1, amt)).toFixed(3)})`; ctx.beginPath(); ctx.arc(xx, yy, r, 0, TAU); ctx.fill(); }
  },
  /* round-bottom flask: bulb centre (cx, cy), radius R, neck width nw, neck top y ny; fill level as y (liquid below ly); returns path function */
  flaskPath(ctx, cx, cy, R, nw, ny) { const a = Math.asin(nw / 2 / R); ctx.beginPath(); ctx.moveTo(cx - nw / 2, ny); ctx.lineTo(cx - nw / 2, cy - R * Math.cos(a)); ctx.arc(cx, cy, R, -Math.PI / 2 - a, -Math.PI / 2 + a, true); ctx.lineTo(cx + nw / 2, ny); },
  flask(ctx, cx, cy, R, nw, ny, o = {}) {
    const a = Math.asin(nw / 2 / R);
    if (o.liq) { ctx.save(); C5.flaskPath(ctx, cx, cy, R, nw, ny); ctx.closePath(); ctx.clip(); ctx.fillStyle = o.liq; ctx.fillRect(cx - R - 2, o.ly, 2 * R + 4, cy + R - o.ly + 4); ctx.restore(); }
    if (o.fill) { ctx.save(); C5.flaskPath(ctx, cx, cy, R, nw, ny); ctx.closePath(); ctx.fillStyle = o.fill; ctx.fill(); ctx.restore(); }
    C5.flaskPath(ctx, cx, cy, R, nw, ny); ctx.strokeStyle = o.st || '#64748b'; ctx.lineWidth = 2.6; ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R * .78, Math.PI * 1.1, Math.PI * 1.35); ctx.stroke();
    void a;
  },
  /* simple on-canvas graph card */
  graph(ctx, x, y, w, h, o) {
    ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, x, y, w, h, 12); ctx.fill(); ctx.strokeStyle = o.bd || '#0f766e'; ctx.lineWidth = 2; ctx.stroke();
    const L = x + 40, R = x + w - 12, T = y + (o.title ? 42 : 26), B = y + h - 26; const X = v => L + (v - o.x0) / (o.x1 - o.x0) * (R - L), Y = v => B - (v - o.y0) / (o.y1 - o.y0) * (B - T);
    if (o.title) G.text(ctx, o.title, x + w / 2, y + 13, { s: 12, w: 900, c: '#0f172a' });
    ctx.strokeStyle = 'rgba(15,23,42,.1)'; ctx.lineWidth = 1; (o.yt || []).forEach(v => { ctx.beginPath(); ctx.moveTo(L, Y(v)); ctx.lineTo(R, Y(v)); ctx.stroke(); G.text(ctx, String(v), L - 5, Y(v), { s: 10, c: '#475569', a: 'right', mono: 1 }); });
    (o.xt || []).forEach(v => G.text(ctx, String(v), X(v), B + 9, { s: 10, c: '#475569', mono: 1 }));
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(L, T - 4); ctx.lineTo(L, B); ctx.lineTo(R + 4, B); ctx.stroke();
    if (o.xl) G.text(ctx, o.xl, (L + R) / 2, B + 20, { s: 10.5, w: 800, c: '#334155' }); if (o.yl) G.text(ctx, o.yl, L + 4, T - 10, { s: 10, w: 800, c: '#334155', a: 'left' });
    ctx.save(); ctx.beginPath(); ctx.rect(L, T - 6, R - L + 2, B - T + 7); ctx.clip();
    (o.series || []).forEach(s => { if (!s.pts.length) return; ctx.strokeStyle = s.col; ctx.lineWidth = s.w || 2.6; if (s.dash) ctx.setLineDash(s.dash); ctx.beginPath(); s.pts.forEach((p, i) => i ? ctx.lineTo(X(p[0]), Y(p[1])) : ctx.moveTo(X(p[0]), Y(p[1]))); ctx.stroke(); ctx.setLineDash([]); if (s.dot) { const p = s.pts[s.pts.length - 1]; ctx.fillStyle = s.col; ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 5, 0, TAU); ctx.fill(); } });
    ctx.restore();
    return { X, Y, L, R, T, B };
  },
  /* vertical thermometer slider (air temperature etc.) — returns geometry for drags */
  tSlider(ctx, x, y0, y1, T, t0, t1, o = {}) {
    const k = clamp((T - t0) / (t1 - t0), 0, 1), yT = y1 - 16 - (y1 - y0 - 30) * k;
    ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, x - 26, y0 - 34, 70, y1 - y0 + 58, 14); ctx.fill(); ctx.strokeStyle = o.bd || '#0284c7'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#f8fafc'; rr(ctx, x - 8, y0, 16, y1 - y0, 8); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.4; ctx.stroke();
    const c = T < 4 ? '#2563eb' : '#ef4444'; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y1, 12, 0, TAU); ctx.fill(); ctx.fillRect(x - 3.5, yT, 7, y1 - yT);
    const st = o.step || 10; for (let v = Math.ceil(t0 / st) * st; v <= t1; v += st) { const yy = y1 - 16 - (y1 - y0 - 30) * (v - t0) / (t1 - t0); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 8, yy); ctx.lineTo(x + 13, yy); ctx.stroke(); G.text(ctx, String(v), x + 15, yy, { s: 9.5, c: '#334155', a: 'left', mono: 1 }); }
    ctx.fillStyle = '#fff'; ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, yT, 9, 0, TAU); ctx.fill(); ctx.stroke();
    G.text(ctx, Math.round(T) + ' °C', x + 9, y0 - 20, { s: 13, w: 900, c: '#0f172a', mono: 1 });
    if (o.label) G.text(ctx, o.label, x + 9, y1 + 30, { s: 11, w: 800, c: '#fff', bg: o.bd || '#0284c7' });
    return { x, y: yT };
  },
  tSliderDrag(S, key, x, y0, y1, t0, t1, o = {}) {
    const k = clamp((S.p[key] - t0) / (t1 - t0), 0, 1), yT = y1 - 16 - (y1 - y0 - 30) * k;
    return { id: o.id || 'therm_' + key, x, y: yT, r: 20, axis: 'y', tip: o.tip || 'اسحب لتغيير درجة الحرارة', idle: o.idle, hint: o.hint,
      drag: (S, d) => { const yy = clamp(d.oy + d.y - d.sy, y0 + 14, y1 - 16); setParam(S, key, t0 + (y1 - 16 - yy) / (y1 - y0 - 30) * (t1 - t0)); },
      wheel: (S, s) => setParam(S, key, S.p[key] + s * (o.step || 1)) };
  },
  sun(ctx, x, y, r, t) { ctx.save(); ctx.translate(x, y); ctx.rotate(t * .3); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 12; i++) { const a = i * TAU / 12; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * 1.25, Math.sin(a) * r * 1.25); ctx.lineTo(Math.cos(a) * r * 1.6, Math.sin(a) * r * 1.6); ctx.stroke(); } ctx.restore(); const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 2, x, y, r); g.addColorStop(0, '#fef9c3'); g.addColorStop(1, '#facc15'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.lineCap = 'butt'; },
  cloud(ctx, x, y, s, col = '#fff') { ctx.fillStyle = col; [[0, 0, 1], [-.9, .25, .7], [.9, .25, .75], [-.35, -.4, .7], [.4, -.35, .6]].forEach(([a, b, r]) => { ctx.beginPath(); ctx.arc(x + a * s, y + b * s, r * s, 0, TAU); ctx.fill(); }); },
  snow(ctx, w, h, t, n = 40, amt = 1) { ctx.fillStyle = 'rgba(255,255,255,.95)'; for (let i = 0; i < n * amt; i++) { const x = ((i * 97.3) % w + Math.sin(t + i) * 12 + w) % w, y = ((i * 53.1) + t * (30 + i % 5 * 8)) % h; ctx.beginPath(); ctx.arc(x, y, 2 + i % 3, 0, TAU); ctx.fill(); } },
  /* checklist of discoveries (top-left) */
  tasks(ctx, x, y, list, o = {}) {
    const W = o.w || 250, H = 30 + list.length * 22; ctx.fillStyle = 'rgba(255,255,255,.93)'; rr(ctx, x, y, W, H, 12); ctx.fill(); ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2; ctx.stroke();
    G.text(ctx, o.title || 'مهامي في النشاط', x + W - 12, y + 14, { s: 12, w: 900, c: '#065f46', a: 'right' });
    list.forEach((it, i) => { const yy = y + 36 + i * 22; ctx.fillStyle = it[1] ? '#10b981' : '#fff'; ctx.strokeStyle = it[1] ? '#10b981' : '#94a3b8'; ctx.lineWidth = 2; rr(ctx, x + W - 28, yy - 8, 16, 16, 4); ctx.fill(); ctx.stroke(); if (it[1]) G.text(ctx, '✓', x + W - 20, yy, { s: 12, w: 900, c: '#fff' }); G.text(ctx, it[0], x + W - 36, yy, { s: 11.5, w: it[1] ? 800 : 600, c: it[1] ? '#065f46' : '#334155', a: 'right' }); });
  },
  /* water density (kg/m³) as a function of °C (0..100) */
  rhoW(T) { return 1000 * (1 - (T + 288.9414) / (508929.2 * (T + 68.12963)) * (T - 3.9863) ** 2); },
  /* rounded panel */
  card(ctx, x, y, w, h, bd = '#0f766e', bg = 'rgba(255,255,255,.93)') { ctx.fillStyle = bg; rr(ctx, x, y, w, h, 12); ctx.fill(); ctx.strokeStyle = bd; ctx.lineWidth = 2; ctx.stroke(); },
  /* segmented on-canvas mode tabs; returns drag objects via tabsDrag */
  tabs(ctx, S, key, x, y, opts, o = {}) {
    const bw = o.bw || 104, bh = 28; opts.forEach((op, i) => { const bx = x - (i + 1) * (bw + 6); const on = S.p[key] === op[0]; ctx.fillStyle = on ? (o.c || '#0f766e') : 'rgba(255,255,255,.92)'; rr(ctx, bx, y, bw, bh, 14); ctx.fill(); ctx.strokeStyle = o.c || '#0f766e'; ctx.lineWidth = 1.6; ctx.stroke(); G.text(ctx, op[1], bx + bw / 2, y + bh / 2 + 1, { s: 12, w: 800, c: on ? '#fff' : '#0f172a' }); });
  },
  tabsDrag(S, key, x, y, opts, o = {}) { const bw = o.bw || 104; return opts.map((op, i) => ({ id: 'tab_' + key + '_' + op[0], x: x - (i + 1) * (bw + 6) + bw / 2, y: y + 14, w: bw, h: 28, hint: false, tip: 'اختر: ' + op[1], click: S => { if (S.p[key] !== op[0]) setParam(S, key, op[0]); } })); }
};

/* =====================================================================
   1) نشاط استهلالي: الكرة والحلقة (ص 74)
   ===================================================================== */
(function () {
  const ALPHA = { iron: 12e-6, copper: 17e-6, alu: 23e-6 }, NAME = { iron: 'حديد', copper: 'نحاس', alu: 'ألمنيوم' }, COL = { iron: '#94a3b8', copper: '#f59e5b', alu: '#cbd5e1' };
  const D0 = 25, GAP = .002, EX = 40; // ball Ø 25 mm at 25 °C; hole 0.2 % larger; drawing exaggerates expansion ×40
  const geo = S => { const w = S.W, h = S.H, by = h * .8, u = Math.min(w, h); const R0 = clamp(u * .07, 30, 56); const pw = S.fireOn ? S.p.pw : 0; const fy = by - 44; const fH = 26 + 38 * pw;
    const bx = S.brx * w; return { w, h, by, R0, bx, fy, fH, hx: bx, hy: fy - fH * .75, ballX: S.bxf * w, ballY: S.byf * h, ringX: S.rxf * w, ringY: S.ryf * h, cupX: w * .86, cupY: by }; };
  const rel = (S, T) => ALPHA[S.p.mat] * (T - C5.T0);
  const dBall = S => D0 * (1 + rel(S, S.Tb)), dHole = S => D0 * (1 + GAP) * (1 + rel(S, S.Tr));
  const rBall = (S, g) => g.R0 * (1 + EX * (dBall(S) / D0 - 1)), rHole = (S, g) => g.R0 * (1 + EX * (dHole(S) / D0 - 1));
  const fits = S => dBall(S) < dHole(S);
  /* ---- scenes: ball & ring, cube & square hole, rod & gauge gap, jar lid ---- */
  const SCN = { ring: ['الكرة', 'الحلقة'], square: ['المكعب', 'الفتحة المربعة'], rod: ['الساق', 'المقياس'], jar: ['الزجاج', 'الغطاء'] };
  const BLK = { ring: 'الكرة الساخنة لا تمر! 🔥\nلقد تمددت وأصبحت أكبر من الحلقة', square: 'المكعب الساخن لا يدخل! 🔥\nتمدد فأصبح ضلعه أكبر من الفتحة', rod: 'الساق الساخنة لا تدخل! 🔥\nازداد طولها فأصبحت أطول من الفجوة', jar: 'الغطاء عالق! 🔒\nسخّن الغطاء المعدني ليتمدد ثم حاول' };
  const TSK = { ring: ['أدخل الكرة الباردة في الحلقة', 'سخّن الكرة وحاول إدخالها', 'سخّن الحلقة وأدخل الكرة'], square: ['أدخل المكعب البارد في الفتحة', 'سخّن المكعب وحاول إدخاله', 'سخّن الصفيحة وأدخل المكعب'], rod: ['أدخل الساق الباردة في الفجوة', 'سخّن الساق وحاول إدخالها', 'سخّن المقياس وأدخل الساق'], jar: ['حاول فتح الغطاء وهو بارد', 'قرّب الغطاء من اللهب ليسخن', 'افتح الغطاء بعد تسخينه'] };
  const contactW = (S, g) => { const sc = S.p.scene || 'ring', rb = rBall(S, g); return sc === 'rod' ? g.R0 * .45 + g.R0 * .28 : sc === 'square' ? rb * 1.05 + g.R0 * .1 : rb * .9; };
  const A_GL = 9e-6, DJ = 60, EXJ = 160;
  const jarGap = S => DJ * (ALPHA[S.p.mat] * (S.Tr - C5.T0) - A_GL * (S.Tb - C5.T0)) - .02; // mm (tight fit at room temperature)
  const jarLoose = S => jarGap(S) > .015;
  const jarGeo = (S, g) => { const nw = g.R0 * .8, gp = Math.max(0, jarGap(S)) / DJ * EXJ * nw * 2, lw = nw + 5 + gp, lh = g.R0 * .55, neckBot = g.ringY + lh * .25, neckTop = neckBot - g.R0 * .55 - lh * .5, bw = g.R0 * 1.9, bh = g.R0 * 2.1, bodyTop = neckTop - bh + 6; return { nw, gapPx: gp, lw, lh, neckBot, neckTop, bw, bh, bodyTop, bodyCy: bodyTop + bh / 2 }; };
  const ring = (ctx, g, S, rh, ringW, thick, col, half) => { ctx.save(); ctx.lineWidth = thick; ctx.strokeStyle = col; ctx.beginPath(); ctx.ellipse(g.ringX, g.ringY, ringW + thick / 2, rh + thick / 2, 0, half ? -Math.PI / 2 : Math.PI / 2, half ? Math.PI / 2 : Math.PI * 1.5); ctx.stroke();
    const tn = C5.tint(S.Tr); if (tn) { ctx.strokeStyle = tn; ctx.stroke(); } ctx.lineWidth = 1.2; ctx.strokeStyle = 'rgba(15,23,42,.5)'; ctx.beginPath(); ctx.ellipse(g.ringX, g.ringY, ringW + thick, rh + thick, 0, half ? -Math.PI / 2 : Math.PI / 2, half ? Math.PI / 2 : Math.PI * 1.5); ctx.stroke(); ctx.beginPath(); ctx.ellipse(g.ringX, g.ringY, ringW, rh, 0, half ? -Math.PI / 2 : Math.PI / 2, half ? Math.PI / 2 : Math.PI * 1.5); ctx.stroke(); ctx.restore(); };
  // plate with a square hole, seen slightly from the side (like the ring): half=1 → back bar, 0 → front bar + top/bottom
  const sqFrame = (ctx, g, S, rh, ringW, thick, col, half) => { const x = g.ringX, y = g.ringY, sk = rh * .25, tn = C5.tint(S.Tr);
    const quad = (pts) => { ctx.beginPath(); pts.forEach(([a, b], i) => i ? ctx.lineTo(a, b) : ctx.moveTo(a, b)); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); if (tn) { ctx.fillStyle = tn; ctx.fill(); } ctx.strokeStyle = 'rgba(15,23,42,.55)'; ctx.lineWidth = 1.2; ctx.stroke(); };
    const T = thick * 1.3;
    if (half) quad([[x + ringW, y - rh - sk], [x + ringW + T * .5, y - rh - sk - T], [x + ringW + T * .5, y + rh - sk + T], [x + ringW, y + rh - sk]]);
    else { quad([[x - ringW, y - rh + sk], [x + ringW, y - rh - sk], [x + ringW + T * .5, y - rh - sk - T], [x - ringW - T * .5, y - rh + sk - T]]); quad([[x - ringW, y + rh + sk], [x + ringW, y + rh - sk], [x + ringW + T * .5, y + rh - sk + T], [x - ringW - T * .5, y + rh + sk + T]]); quad([[x - ringW, y - rh + sk], [x - ringW - T * .5, y - rh + sk - T], [x - ringW - T * .5, y + rh + sk + T], [x - ringW, y + rh + sk]]); } };
  // gauge: two jaws with a gap (2·rh) between them, mounted on a back plate
  const gauge = (ctx, g, S, rh, thick, col) => { const x = g.ringX, y = g.ringY, jw = g.R0 * .9, T = thick * 1.6, tn = C5.tint(S.Tr);
    ctx.fillStyle = 'rgba(203,213,225,.55)'; rr(ctx, x - jw * .55, y - rh - T, jw * 1.1, 2 * rh + 2 * T, 4); ctx.fill(); ctx.strokeStyle = 'rgba(71,85,105,.5)'; ctx.lineWidth = 1; ctx.stroke();
    [[y - rh - T, T], [y + rh, T]].forEach(([yy, hh]) => { ctx.fillStyle = col; rr(ctx, x - jw, yy, 2 * jw, hh, 4); ctx.fill(); if (tn) { ctx.fillStyle = tn; ctx.fill(); } ctx.strokeStyle = 'rgba(15,23,42,.55)'; ctx.lineWidth = 1.2; ctx.stroke(); });
    ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(x + jw + 8, y - rh); ctx.lineTo(x + jw + 8, y + rh); ctx.stroke(); ctx.setLineDash([]); G.arrow(ctx, x + jw + 8, y, x + jw + 8, y - rh + 1, '#7c3aed', 1.5, 6); G.arrow(ctx, x + jw + 8, y, x + jw + 8, y + rh - 1, '#7c3aed', 1.5, 6); };
  const block = (ctx, x, y, r, T, col) => { const d = r * .35, tn = C5.tint(T); const face = (pts, c) => { ctx.beginPath(); pts.forEach(([a, b], i) => i ? ctx.lineTo(a, b) : ctx.moveTo(a, b)); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); if (tn) { ctx.fillStyle = tn; ctx.fill(); } ctx.strokeStyle = 'rgba(15,23,42,.5)'; ctx.lineWidth = 1.2; ctx.stroke(); };
    face([[x - r, y - r], [x - r + d, y - r - d], [x + r + d, y - r - d], [x + r, y - r]], shade(col, 25)); face([[x + r, y - r], [x + r + d, y - r - d], [x + r + d, y + r - d], [x + r, y + r]], shade(col, -25)); face([[x - r, y - r], [x + r, y - r], [x + r, y + r], [x - r, y + r]], col); };
  const rod = (ctx, x, y, hl, rw, T, col) => { const gr = ctx.createLinearGradient(x - rw, 0, x + rw, 0); gr.addColorStop(0, shade(col, -30)); gr.addColorStop(.45, shade(col, 35)); gr.addColorStop(1, shade(col, -40)); ctx.fillStyle = gr; rr(ctx, x - rw, y - hl, 2 * rw, 2 * hl, rw * .6); ctx.fill(); const tn = C5.tint(T); if (tn) { ctx.fillStyle = tn; ctx.fill(); } ctx.strokeStyle = 'rgba(15,23,42,.5)'; ctx.lineWidth = 1.2; ctx.stroke(); };
  X7({ id: 'g7_ball_ring', ch: 15, sec: 'نشاط استهلالي', page: 74, kind: 'نشاط', title: 'نشاط استهلالي: الكرة والحلقة (تمدد الأجسام بالحرارة)',
    desc: 'كرة معدنية تمر بصعوبة من حلقة معدنية. نسخّن الكرة فلا تمر، ثم نسخّن الحلقة فتمر من جديد — لأن المعادن تتمدد بالحرارة.',
    tags: 'تمدد حرارة كرة حلقة جزيئات طاقة حركية',
    tools: ['حلقة معدنية مثبتة بماسك ذي مقبض', 'كرة معدنية مثبتة بماسك ذي مقبض', 'مادة عازلة للحرارة (لوح خشبي)', 'مصدر حراري (مصباح بنزن)', 'إناء فيه ماء بارد'],
    steps: ['اسحب الكرة (من مقبضها) وأدخلها في تجويف الحلقة الباردة. ماذا تلاحظ؟', 'اسحب الكرة إلى اللهب وانتظر حتى تسخن (راقب درجة حرارتها)، ثم حاول إدخالها في الحلقة مرة أخرى.', 'لاحظ: الكرة الساخنة لا تدخل في الحلقة الباردة! فعّل «الجزيئات» لترى السبب.', 'برّد الكرة في الماء، ثم اسحب الحلقة إلى اللهب لتسخن، وأدخل الكرة فيها.', 'فسّر ما حدث للكرة المعدنية عند تسخينها.'],
    concl: ['الكرة بعد تسخينها لا تدخل في تجويف الحلقة الباردة، بسبب تمددها بالحرارة فأصبح حجمها أكبر مما هي عليه وهي باردة.', 'تتمدد معظم المواد بارتفاع درجة حرارتها نتيجة ازدياد الطاقة الحركية لجزيئاتها فتزداد المسافات بينها، وتتقلص بالتبريد.', 'عند تسخين الحلقة تتمدد ويتسع تجويفها فتمر الكرة.'],
    laws: ['g7_expand', 'g7_heat'],
    fact: ['تُترك مسافات بين القطع الكونكريتية عند تبليط الطرقات والجسور لتتمدد فيها صيفاً (ص 73).', 'لفتح قنينة زجاجية ذات غطاء معدني عالق نضعها تحت الماء الحار: يتمدد الغطاء فيرتخي.', 'يُركَّب إطار العجلة الحديدي وهو ساخن، فإذا برد تقلص وأمسك بالعجلة بقوة.'],
    controls: [
      BT('', [{ t: '🔥 إشعال / إطفاء المصدر', on: S => { S.fireOn = !S.fireOn; } }, { t: '💧 تبريد الكرة والحلقة', on: S => { S.Tb = S.Tr = C5.T0; S.splash = S.t; } }]),
      R('pw', 'شدة اللهب', .3, 1, .9, .1, ''),
      SEL('mat', 'مادة الكرة والحلقة', [['iron', 'حديد'], ['copper', 'نحاس'], ['alu', 'ألمنيوم']], 'iron'),
      TG('parts', 'الجزيئات (عدسة مكبّرة)', true, null, 'atom'), TG('heat', 'أسهم انتقال الحرارة', true, null, 'heat'),
      TG('labels', 'درجات الحرارة والأقطار', true, null, 'labels'), TG('glow', 'توهج المعدن الساخن', true, null, 'light'), TG('tasks', 'قائمة المهام', true, null, 'eye'),
      SEL('scene', 'الشكل', [['ring', 'كرة وحلقة'], ['square', 'مكعب وفتحة'], ['rod', 'ساق ومقياس'], ['jar', 'غطاء قنينة']], 'ring', (v, S) => { S.Tb = S.Tr = C5.T0; S.lidOff = false; S.a1 = S.a2 = S.a3 = false; S.bxf = .38; S.byf = .46; S.rxf = .68; S.ryf = v === 'jar' ? .6 : .46; S.rxf = v === 'jar' ? .6 : .68; })],
    setup(S) { S.Tb = C5.T0; S.Tr = C5.T0; S.fireOn = true; S.bxf = .38; S.byf = .46; S.rxf = .68; S.ryf = .46; S.brx = .52; S.a1 = S.a2 = S.a3 = false; S.blockT = -9; S.passT = -9; S.splash = -9; S.side = -1; S.lidOff = false; S.twistT = -9; if (S.p.scene === 'jar') { S.ryf = .6; S.rxf = .6; } },
    update(S, dt) {
      const g = geo(S); const pw = S.fireOn ? S.p.pw : 0, jar = S.p.scene === 'jar';
      const heat = (x, y, r, T) => { const d = Math.hypot(x - g.hx, y - g.hy); const inF = pw > 0 && d < r + 22 && y < g.fy; return inF ? T + pw * 115 * dt * clamp(1 - (T - 25) / 620, 0, 1) : T - (T - C5.T0) * .02 * dt; };
      if (!jar) S.Tb = heat(g.ballX, g.ballY, rBall(S, g), S.Tb); S.Tr = heat(g.ringX, g.ringY, rHole(S, g) * 1.1, S.Tr);
      if (jar) { S.Tb += (S.Tr - S.Tb) * .12 * dt; S.Tr = Math.min(S.Tr, 260); if (S.Tr > 80) S.a2 = true; } // glass warms slowly (poor conductor)
      const inCup = (x, y) => Math.abs(x - g.cupX) < 50 && y > g.cupY - 110 && y < g.cupY; if (!jar && inCup(g.ballX, g.ballY)) { if (S.Tb > 40) S.splash = S.t; S.Tb += (C5.T0 - S.Tb) * Math.min(1, 3 * dt); } if (inCup(g.ringX, g.ringY)) { if (S.Tr > 40) S.splash = S.t; S.Tr += (C5.T0 - S.Tr) * Math.min(1, 3 * dt); if (jar) S.Tb += (C5.T0 - S.Tb) * Math.min(1, 1.5 * dt); }
    },
    draw(ctx, w, h, S) {
      const p = S.p, g = geo(S), sc = p.scene || 'ring', NM = SCN[sc]; K.bg(ctx, w, h, { benchY: g.by });
      K.raw(ctx, () => {
        // insulating board + burner (bigger, clear flame)
        K.box(ctx, g.bx - 70, g.by + 2, 140, 10, 26, 'wood'); K.burner(ctx, g.bx, g.fy - 8, S.fireOn ? p.pw : 0, S.t);
        K.tag(ctx, S.fireOn ? 'مصدر حراري (اسحبه / انقره للإطفاء)' : 'المصدر مطفأ — انقره لإشعاله', g.bx, g.by + 30, { s: 11, bg: 'rgba(120,53,15,.85)' });
        K.beaker(ctx, g.cupX, g.cupY, 96, 110, .62, { liq: '#38bdf8' }); K.tag(ctx, 'ماء بارد للتبريد', g.cupX, g.cupY + 22, { s: 11, bg: '#0369a1' });
        if (S.t - S.splash < 1.2) C5.steam(ctx, g.cupX, g.cupY - 80, 60, S.t, 1.2 - (S.t - S.splash), '203,213,225');
        const rb = rBall(S, g), rh = rHole(S, g), ringW = rh * .42, thick = g.R0 * .22, col = COL[p.mat];
        const metal = (T) => { const tn = C5.tint(T); return tn; };
        let topY = g.ringY - rh - thick;
        if (sc === 'jar') {
          const J = jarGeo(S, g); topY = J.bodyTop;
          if (p.glow) C5.glow(ctx, g.ringX, g.ringY, J.lw, S.Tr);
          // tongs handle
          C5.handle(ctx, g.ringX + J.bw / 2 - 4, J.bodyCy, g.ringX + J.bw / 2 + g.R0 * 2.6, J.bodyCy + g.R0 * .9, { hl: 70 });
          // inverted glass jar (body above, neck down, lid at the bottom)
          ctx.fillStyle = 'rgba(186,230,253,.55)'; ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; rr(ctx, g.ringX - J.bw / 2, J.bodyTop, J.bw, J.bh, 16); ctx.fill(); ctx.stroke();
          ctx.fillStyle = 'rgba(234,179,8,.75)'; rr(ctx, g.ringX - J.bw / 2 + 6, J.bodyTop + J.bh * .5, J.bw - 12, J.bh * .5 - 6, 10); ctx.fill(); G.text(ctx, 'مربّى', g.ringX, J.bodyTop + J.bh * .75, { s: 12, w: 900, c: '#713f12' });
          ctx.fillStyle = 'rgba(186,230,253,.8)'; ctx.fillRect(g.ringX - J.nw, J.neckTop, 2 * J.nw, J.neckBot - J.neckTop); ctx.strokeRect(g.ringX - J.nw, J.neckTop, 2 * J.nw, J.neckBot - J.neckTop);
          ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 1.2; for (let k = 1; k < 4; k++) { const yy = J.neckTop + (J.neckBot - J.neckTop) * k / 4; ctx.beginPath(); ctx.moveTo(g.ringX - J.nw, yy - 3); ctx.lineTo(g.ringX + J.nw, yy + 3); ctx.stroke(); }
          // metal lid (skirt around the neck) — drawn off the jar when opened
          const lx = S.lidOff ? g.ringX - g.R0 * 2.4 : g.ringX, ly = S.lidOff ? g.by - J.lh / 2 - 2 : g.ringY + Math.sin((S.t - S.twistT) * 50) * (S.t - S.twistT < .35 ? 2 : 0);
          const lg = ctx.createLinearGradient(lx - J.lw, 0, lx + J.lw, 0); lg.addColorStop(0, '#64748b'); lg.addColorStop(.5, '#e2e8f0'); lg.addColorStop(1, '#475569'); ctx.fillStyle = lg; rr(ctx, lx - J.lw, ly - J.lh / 2, 2 * J.lw, J.lh, 5); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.stroke();
          const tn = metal(S.Tr); if (tn) { ctx.fillStyle = tn; rr(ctx, lx - J.lw, ly - J.lh / 2, 2 * J.lw, J.lh, 5); ctx.fill(); }
          ctx.strokeStyle = 'rgba(15,23,42,.35)'; for (let k = -4; k <= 4; k++) { ctx.beginPath(); ctx.moveTo(lx + k * J.lw / 5, ly - J.lh / 2 + 3); ctx.lineTo(lx + k * J.lw / 5, ly + J.lh / 2 - 3); ctx.stroke(); }
          if (!S.lidOff) { // the gap between lid skirt and glass neck (exaggerated)
            const gp = J.gapPx; if (gp > .5) { ctx.fillStyle = '#fef3c7'; ctx.fillRect(g.ringX - J.nw - gp, J.neckBot - 2, gp, J.lh * .7); ctx.fillRect(g.ringX + J.nw, J.neckBot - 2, gp, J.lh * .7); }
            ctx.strokeStyle = gp > .5 ? '#16a34a' : '#dc2626'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(g.ringX - J.nw - Math.max(gp, 0), J.neckBot - 4); ctx.lineTo(g.ringX - J.nw - Math.max(gp, 0), J.neckBot + J.lh * .6); ctx.moveTo(g.ringX + J.nw + Math.max(gp, 0), J.neckBot - 4); ctx.lineTo(g.ringX + J.nw + Math.max(gp, 0), J.neckBot + J.lh * .6); ctx.stroke();
            if (p.labels) K.tag(ctx, jarLoose(S) ? 'فجوة: الغطاء ارتخى ✓ (مكبّرة)' : 'الغطاء مشدود على الزجاج 🔒', g.ringX - J.lw - 86, ly + 26, { s: 11, bg: jarLoose(S) ? '#15803d' : '#b91c1c' }); }
          if (p.heat && S.fireOn) { const d = Math.hypot(g.ringX - g.hx, g.ringY - g.hy); if (d < J.lw * 1.1 + 22 && g.ringY < g.fy) for (let k = -1; k <= 1; k++) C5.heatArrow(ctx, g.hx + k * 12, g.hy + 6, g.ringX + k * J.lw * .5, ly + J.lh / 2, S.t + k); }
          if (p.labels) { K.tag(ctx, `الغطاء ${Math.round(S.Tr)} °C`, lx + J.lw + 62, ly + 4, { s: 12.5, bg: S.Tr > 60 ? '#dc2626' : '#0f766e' }); K.tag(ctx, `الزجاج ${Math.round(S.Tb)} °C`, g.ringX, J.bodyTop - 16, { s: 12.5, bg: S.Tb > 60 ? '#dc2626' : '#0369a1' }); }
        } else {
          const cw = contactW(S, g);
          if (p.glow) { C5.glow(ctx, g.ringX, g.ringY, rh, S.Tr); C5.glow(ctx, g.ballX, g.ballY, rb, S.Tb); }
          C5.handle(ctx, g.ringX + ringW * .5, g.ringY + rh + thick * .8, g.ringX + g.R0 * 1.6, g.ringY + rh + g.R0 * 2.6, { hl: 70 });
          // holder: back part
          if (sc === 'ring') { ring(ctx, g, S, rh, ringW, thick, col, 1); }
          else if (sc === 'square') { sqFrame(ctx, g, S, rh, ringW, thick, col, 1); }
          else { gauge(ctx, g, S, rh, thick, col); }
          // object (ball / block / rod) with its handle
          const ox = sc === 'rod' ? g.ballX - g.R0 * .28 : g.ballX - rb * .9;
          C5.handle(ctx, ox, g.ballY + rb * .2 * (sc === 'rod' ? 0 : 1), g.ballX - rb - g.R0 * 2.3, g.ballY + g.R0 * 1.4, { hl: 70 });
          if (sc === 'ring') C5.metalBall(ctx, g.ballX, g.ballY, rb, S.Tb, col);
          else if (sc === 'square') block(ctx, g.ballX, g.ballY, rb, S.Tb, col);
          else rod(ctx, g.ballX, g.ballY, rb, g.R0 * .28, S.Tb, col);
          if (sc === 'ring') ring(ctx, g, S, rh, ringW, thick, col, 0); else if (sc === 'square') sqFrame(ctx, g, S, rh, ringW, thick, col, 0);
          // heat arrows from flame
          if (p.heat && S.fireOn) { [[g.ballX, g.ballY, rb], [g.ringX, g.ringY, rh]].forEach(([x, y, r]) => { const d = Math.hypot(x - g.hx, y - g.hy); if (d < r + 22 && y < g.fy) for (let k = -1; k <= 1; k++) C5.heatArrow(ctx, g.hx + k * 12, g.hy + 6, x + k * r * .45, y + r * .55, S.t + k); }); }
          if (p.labels) {
            K.tag(ctx, `${NM[0]} ${Math.round(S.Tb)} °C`, g.ballX, g.ballY - rb - 18, { s: 12.5, bg: S.Tb > 60 ? '#dc2626' : '#0f766e' });
            K.tag(ctx, `${NM[1]} ${Math.round(S.Tr)} °C`, g.ringX, g.ringY - rh - thick - 18, { s: 12.5, bg: S.Tr > 60 ? '#dc2626' : '#0f766e' });
            if (sc === 'rod') { G.text(ctx, 'طول الساق ' + dBall(S).toFixed(3) + ' mm', g.ballX, g.ballY + rb + 16, { s: 11, w: 800, c: '#334155', mono: 0 }); G.text(ctx, 'الفجوة ' + dHole(S).toFixed(3) + ' mm', g.ringX + g.R0 * .9, g.ringY, { s: 11, w: 800, c: '#334155', a: 'left' }); }
          }
        }
        // bubbles
        const bY = topY - 34;
        if (S.t - S.blockT < 1.6) K.bubble(ctx, BLK[sc], g.ringX, bY, { s: 13, bg: '#fef2f2', bd: '#dc2626', c: '#7f1d1d' });
        else if (S.t - S.passT < 1.6) K.bubble(ctx, sc === 'jar' ? 'انفتح الغطاء! 🎉\nتمدد الغطاء المعدني أكثر من الزجاج' : S.lastPassHot ? `مرّ! ${NM[1]} الساخن${sc === 'ring' ? 'ة' : ''} تمدد واتسع ✓ 🎉` : `مرّ ${NM[0]} البارد ✓`, g.ringX, bY, { s: 13, bg: '#f0fdf4', bd: '#16a34a', c: '#14532d' });
        // particles lenses
        if (p.parts) { const R = clamp(w * .07, 42, 58), ly = 30 + R, lx = w * .66; C5.lattice(ctx, lx - R * 1.35, ly, R, S.Tb, S.t, { col: sc === 'jar' ? '#7dd3fc' : COL[p.mat], label: 'جزيئات ' + NM[0] }); C5.lattice(ctx, lx + R * 1.35, ly, R, S.Tr, S.t, { col: COL[p.mat], label: 'جزيئات ' + NM[1] });
          G.text(ctx, 'كلما سخن المعدن: تهتز جزيئاته أسرع وتتباعد', lx, ly + R + 20, { s: 12, w: 800, c: '#9a3412' }); }
        if (p.labels) G.text(ctx, '(التمدد مكبَّر في الرسم ليسهل رؤيته)', w * .5, g.by + 52, { s: 11, w: 700, c: '#fff' });
        if (p.tasks) C5.tasks(ctx, 80, 14, TSK[sc].map((t, i) => [t, S['a' + (i + 1)]]), { w: 256 });
        K.party(ctx, S);
      });
    },
    drags(S) {
      const g = geo(S), sc = S.p.scene || 'ring';
      const passEvt = (S, g) => { S.passT = S.t; S.lastPassHot = S.Tr > 100 && S.Tb <= S.Tr + 5 && dBall(S) > D0 * (1 + GAP); if (!S.a1 && S.Tb < 60) { S.a1 = true; } if (S.Tr > 100 && S.a2 && !S.a3) { S.a3 = true; K.cheer(S, g.ringX, g.ringY); } if (window.Sound) Sound.click(); };
      const blockEvt = (S, g) => { if (S.t - S.blockT > .4) { S.blockT = S.t; if (S.Tb > 100) S.a2 = true; if (window.Sound) Sound.beep && Sound.beep(220, .08, 'square', .03); } };
      const moveBall = (S, nx, ny) => {
        const g = geo(S), rb = rBall(S, g), rh = rHole(S, g), thick = g.R0 * .22, side = Math.sign(g.ballX - g.ringX) || -1, cw = contactW(S, g);
        nx = clamp(nx, 90, g.w - 20); ny = clamp(ny, 30, g.by - rb);
        const vert = Math.abs(ny - g.ringY) < rh + thick + rb * .8;
        const overl = Math.abs(nx - g.ringX) < cw, crossing = Math.sign(nx - g.ringX) !== side;
        if ((overl || crossing) && vert) {
          if (fits(S) && Math.abs(ny - g.ringY) < rh - rb + 14) { ny = g.ringY + clamp(ny - g.ringY, -(rh - rb), rh - rb); }
          else { nx = g.ringX + side * (cw + 2); if (Math.abs(ny - g.ringY) < rh) blockEvt(S, g); }
        }
        const nside = Math.sign(nx - g.ringX) || side;
        if (nside !== side && Math.abs(ny - g.ringY) < rh) passEvt(S, g);
        S.bxf = nx / g.w; S.byf = ny / g.h;
      };
      // the ring/holder moves on its own: it never carries the ball; it is blocked by the ball if the ball does not fit
      const moveRing = (S, nx, ny) => {
        const g = geo(S), rb = rBall(S, g), rh = rHole(S, g), thick = g.R0 * .22, side = Math.sign(g.ballX - g.ringX) || -1, cw = contactW(S, g);
        nx = clamp(nx, 90, g.w - 30); ny = clamp(ny, 40, g.by - 40);
        if (sc !== 'jar') {
          const dy = g.ballY - ny, vert = Math.abs(dy) < rh + thick + rb * .8;
          const overl = Math.abs(g.ballX - nx) < cw, crossing = (Math.sign(g.ballX - nx) || side) !== side;
          if ((overl || crossing) && vert) {
            if (fits(S) && Math.abs(dy) < rh - rb + 14) { ny = g.ballY - clamp(dy, -(rh - rb), rh - rb); }
            else { nx = g.ballX - side * (cw + 2); if (Math.abs(dy) < rh) blockEvt(S, g); }
          }
          const nside = Math.sign(g.ballX - nx) || side; if (nside !== side && Math.abs(g.ballY - ny) < rh) passEvt(S, g);
        }
        S.rxf = nx / g.w; S.ryf = ny / g.h;
      };
      const rb = rBall(S, g), rh = rHole(S, g), L = [];
      if (sc !== 'jar') {
        L.push({ id: 'ball', x: g.ballX - rb - g.R0 * 1.9, y: g.ballY + g.R0 * 1.2, w: 90, h: 34, axis: 'xy', tip: 'اسحب ' + SCN[sc][0] + ' من مقبضه: إلى ' + SCN[sc][1] + ' أو إلى اللهب أو إلى الماء', idle: 'اسحب ' + SCN[sc][0] + ' ✋',
          drag: (S, d) => { const g = geo(S); const dx = d.x - d.sx, dy = d.y - d.sy; const tx = d.ox + dx + rBall(S, g) + g.R0 * 1.9, ty = d.oy + dy - g.R0 * 1.2; const x0 = g.ballX, y0 = g.ballY; for (let k = 1; k <= 6; k++) moveBall(S, x0 + (tx - x0) * k / 6, y0 + (ty - y0) * k / 6); } });
        L.push({ id: 'ballbody', x: g.ballX, y: g.ballY, r: sc === 'rod' ? g.R0 * .5 : rb, axis: 'xy', hint: false, tip: 'اسحب ' + SCN[sc][0], drag: (S, d) => { const g = geo(S); const tx = d.ox + d.x - d.sx, ty = d.oy + d.y - d.sy; const x0 = g.ballX, y0 = g.ballY; for (let k = 1; k <= 6; k++) moveBall(S, x0 + (tx - x0) * k / 6, y0 + (ty - y0) * k / 6); } });
        L.push({ id: 'ring', x: g.ringX + g.R0 * 1.3, y: g.ringY + rh + g.R0 * 2.2, w: 80, h: 34, axis: 'xy', hint: false, tip: 'اسحب ' + SCN[sc][1] + ' من مقبضه (إلى اللهب لتسخينه) — يتحرك وحده',
          drag: (S, d) => { const g = geo(S); const tx = d.ox + d.x - d.sx - g.R0 * 1.3, ty = d.oy + d.y - d.sy - rHole(S, g) - g.R0 * 2.2; const x0 = g.ringX, y0 = g.ringY; for (let k = 1; k <= 6; k++) moveRing(S, x0 + (tx - x0) * k / 6, y0 + (ty - y0) * k / 6); } });
      } else {
        const J = jarGeo(S, g);
        L.push({ id: 'ring', x: g.ringX, y: J.bodyCy, w: J.bw + 10, h: J.bh, axis: 'xy', tip: 'اسحب القنينة لتقرّب غطاءها من اللهب أو من الماء البارد', idle: 'قرّب الغطاء من اللهب ✋',
          drag: (S, d) => { const g = geo(S), J = jarGeo(S, g); moveRing(S, d.ox + d.x - d.sx, d.oy + d.y - d.sy + (g.ringY - J.bodyCy)); } });
        L.push({ id: 'lid', x: S.lidOff ? g.ringX - g.R0 * 2.4 : g.ringX, y: S.lidOff ? g.by - J.lh / 2 : g.ringY, w: 2 * J.lw + 8, h: J.lh + 10, hint: false, tip: S.lidOff ? 'انقر لإعادة الغطاء (بعد تبريده)' : 'انقر لتحاول فتح الغطاء (تدويره)',
          click: S => { if (S.lidOff) { S.lidOff = false; return; } S.twistT = S.t; if (jarLoose(S)) { S.lidOff = true; S.passT = S.t; if (S.Tr > 60 && !S.a3) { S.a3 = true; K.cheer(S, g.ringX, g.ringY); } } else { S.blockT = S.t; if (S.Tr < 45) S.a1 = true; if (window.Sound) Sound.beep && Sound.beep(220, .08, 'square', .03); } } });
      }
      L.push({ id: 'burner', x: g.bx, y: g.fy + 12, w: 48, h: 60, axis: 'x', tip: 'اسحب المصدر الحراري، أو انقره لإشعاله/إطفائه', hint: false,
        drag: (S, d) => { const g = geo(S); S.brx = clamp((d.ox + d.x - d.sx) / g.w, .2, .75); }, click: S => { S.fireOn = !S.fireOn; } });
      return L;
    },
    readings(S) { const sc = S.p.scene || 'ring', NM = SCN[sc]; if (sc === 'jar') return [rd('درجة حرارة الغطاء', Math.round(S.Tr) + ' °C'), rd('درجة حرارة الزجاج', Math.round(S.Tb) + ' °C'), rd('الفجوة بين الغطاء والعنق', Math.max(0, jarGap(S)).toFixed(3) + ' mm'), rd('هل ينفتح الغطاء؟', jarLoose(S) ? 'نعم ✓ — تمدد الغطاء أكثر من الزجاج' : 'لا ✗ — الغطاء مشدود', 1)];
      return [rd('درجة حرارة ' + NM[0], Math.round(S.Tb) + ' °C'), rd('درجة حرارة ' + NM[1], Math.round(S.Tr) + ' °C'), rd(sc === 'rod' ? 'طول الساق' : sc === 'square' ? 'ضلع المكعب' : 'قطر الكرة', dBall(S).toFixed(3) + ' mm'), rd(sc === 'rod' ? 'طول فجوة المقياس' : sc === 'square' ? 'ضلع الفتحة' : 'قطر تجويف الحلقة', dHole(S).toFixed(3) + ' mm'), rd('هل يمر؟', fits(S) ? 'نعم ✓ — أصغر من الفتحة' : 'لا ✗ — أكبر من الفتحة', 1)]; },
    explain(S) { const sc = S.p.scene || 'ring', NM = SCN[sc];
      if (sc === 'jar') return jarLoose(S) ? `سخن الغطاء المعدني (${Math.round(S.Tr)} °C) فتمدد <b>أكثر</b> من عنق الزجاج (الزجاج يسخن ببطء ومعامل تمدده أصغر) فظهرت فجوة صغيرة و<b>ارتخى الغطاء</b>: انقره لتفتحه.` : `الغطاء المعدني مشدود على عنق القنينة. قرّب الغطاء من اللهب (أو ضعه تحت الماء الحار) ليتمدد، فيتسع ويرتخي.`;
      if (!fits(S)) return `${NM[0]} ساخن (${Math.round(S.Tb)} °C): اكتسبت جزيئاته طاقة حركية فاهتزت أسرع و<b>تباعدت</b>، فتمدد وأصبح بُعده <b>${dBall(S).toFixed(3)} mm</b> أكبر من ${NM[1]} <b>${dHole(S).toFixed(3)} mm</b>. سخّن ${NM[1]} أو برّد ${NM[0]}!`;
      if (S.Tr > 100) return `${NM[1]} ساخن: تمدد و<b>اتسعت فتحته</b>، فيمر ${NM[0]} بسهولة.`; return `${NM[0]} البارد أصغر قليلاً من فتحة ${NM[1]}، لذلك <b>يمر</b>. سخّنه في اللهب وجرّب مرة أخرى. (يمكنك تحريك كلٍّ منهما وحده من مقبضه)`; },
    quiz: [
      { q: 'ما سبب تمدد المواد بارتفاع درجة حرارتها؟', o: ['تزداد كتلة جزيئاتها', 'تزداد الطاقة الحركية لجزيئاتها فتتباعد', 'يزداد عدد جزيئاتها'], a: 1, why: 'الحرارة تزيد الطاقة الحركية للجزيئات فتزداد المسافات بينها (ص 75).' },
      { q: 'لماذا نجد صعوبة في فتح بعض الأبواب الحديدية في فصل الصيف؟', o: ['لأن الحديد يتقلص صيفاً', 'لأن الحديد يتمدد بالحرارة', 'لأن كتلة الباب تزداد'], a: 1, why: 'يتمدد الباب الحديدي بارتفاع درجة الحرارة فيحتك بإطاره (ص 88).' },
      { q: 'لفتح قنينة زجاجية ذات غطاء معدني نضعها تحت الماء الحار، لأن:', o: ['الغطاء المعدني يتمدد أكثر من الزجاج فيرتخي', 'الزجاج يذوب', 'الماء الحار يقلص الغطاء'], a: 0, why: 'المعدن يتمدد بالحرارة أكثر من الزجاج فيتسع الغطاء (تفكير ناقد ص 88).' }
    ]
  });
})();

/* =====================================================================
   2) نشاط: التمدد الطولي — السلك النحاسي، أسلاك الكهرباء، السكك، الطرق (ص 73، 75–76)
   ===================================================================== */
(function () {
  const N = 48, A_CU = 17e-6, A_AL = 23e-6, A_ST = 12e-6, SPAN = 1000; // mm
  const MODES = [['lab', 'السلك النحاسي'], ['lines', 'أسلاك الكهرباء'], ['rail', 'سكة الحديد'], ['road', 'الطرق والجسور']];
  const geo = S => { const w = S.W, h = S.H, by = h * .8; const xL = Math.max(110, w * .16), xR = w * .86, wy = by - 128; return { w, h, by, xL, xR, wy, bx: xL + (xR - xL) * S.bxf, fy: by - 44 }; };
  const dLen = S => { let s = 0; for (let i = 0; i < N; i++) s += A_CU * (SPAN / N) * (S.Tw[i] - C5.T0); return s; }; // mm
  const sagMM = S => Math.sqrt(3 * SPAN * Math.max(0, dLen(S)) / 8 + 4);
  const lineSag = T => { const s = 100, L0 = s + 8 * 1.2 ** 2 / (3 * s); const L = L0 * (1 + A_AL * (T + 10)); return Math.sqrt(3 * s * (L - s) / 8); }; // m
  const railGap = T => 6 - A_ST * 12000 * (T - 20); // mm (installed at 20 °C with 6 mm gap)
  X7({ id: 'g7_wire', ch: 15, sec: 'الدرس 1', page: 76, kind: 'نشاط', title: 'نشاط: التمدد الطولي (السلك النحاسي وتطبيقاته)',
    desc: 'سلك نحاسي رفيع مشدود بين حاملين: نحرك المصدر الحراري على طوله فيرتخي ويتدلى، ونبعده فيعود مشدوداً. ثم نرى أسلاك الكهرباء صيفاً وشتاءً، وفواصل السكك والطرق.',
    tags: 'تمدد طولي سلك نحاس أسلاك الكهرباء سكة حديد فواصل طرق',
    tools: ['سلك نحاسي رفيع', 'حاملان', 'مصدر حراري'],
    steps: ['السلك النحاسي مثبت من طرفيه وهو مشدود على حاملين.', 'اسحب المصدر الحراري وضعه أسفل السلك.', 'حرّك المصدر الحراري يميناً ويساراً على طول السلك. ماذا تلاحظ؟ (راقب مقدار التدلي)', 'أبعد المصدر الحراري (أو انقره لإطفائه) وانتظر قليلاً. ماذا تلاحظ؟', 'اختر «أسلاك الكهرباء» واسحب المحرار بين الشتاء والصيف.', 'اختر «سكة الحديد» ثم «الطرق»: أزل الفواصل وارفع درجة الحرارة، ثم سيّر القطار!'],
    concl: ['يزداد طول السلك عند تسخينه فيرتخي ويتدلى، ويقل طوله عند تبريده فيعود مشدوداً.', 'التمدد الطولي: الزيادة الحاصلة في طول الجسم الصلب إذا ارتفعت درجة حرارته.', 'يزداد التمدد الطولي بزيادة الطول الأصلي وبارتفاع درجة الحرارة، ويعتمد على نوع المادة.', 'لذلك تتدلى أسلاك الكهرباء صيفاً وتُترك فواصل بين قضبان السكك وقطع الكونكريت في الطرق والجسور.'],
    laws: ['g7_expand'],
    fact: ['لو ثُبّتت قضبان السكة من جهتيها بلا فواصل لتقوّست صيفاً وانحرف القطار عن مساره (ص 76).', 'سلك نحاسي طوله 1 m يزداد طوله نحو 1.7 mm فقط إذا سُخّن 100 °C — لكن هذا يكفي ليجعله يتدلى بوضوح!', 'تُترك مسافات بين القطع الكونكريتية عند تبليط الطرقات والجسور (ص 73).'],
    controls: [
      SEL('mode', 'المشهد', MODES, 'lab', (v, S) => { S.derail = 0; S.trainX = -1; }),
      R('pw', 'شدة اللهب', .3, 1, 1, .1, ''),
      R('Tair', 'درجة حرارة الجو', -10, 50, 20, 1, '°C'),
      SEL('gaps', 'فواصل التمدد', [['yes', 'مع فواصل'], ['no', 'بدون فواصل']], 'yes', (v, S) => { S.derail = 0; }),
      TG('parts', 'جزيئات السلك (عدسة)', true, null, 'atom'), TG('heat', 'ألوان الحرارة على السلك', true, null, 'heat'),
      TG('labels', 'القيم والقياسات', true, null, 'labels'), TG('ghost', 'شكل السلك وهو بارد', true, null, 'eye')],
    setup(S) { S.Tw = new Array(N).fill(C5.T0); S.bxf = .5; S.fireOn = true; S.trainX = -1; S.derail = 0; S.maxSag = 0; S.cheered = false; },
    update(S, dt) {
      const g = geo(S), p = S.p;
      if (p.mode === 'lab') {
        const pw = S.fireOn ? p.pw : 0, T = S.Tw, nT = T.slice();
        for (let i = 1; i < N - 1; i++) { const x = g.xL + (g.xR - g.xL) * (i + .5) / N; const q = pw * Math.exp(-(((x - g.bx) / 22) ** 2)); nT[i] = T[i] + dt * (q * 260 * clamp(1 - (T[i] - 25) / 560, 0, 1) + 14 * (T[i - 1] + T[i + 1] - 2 * T[i]) - .35 * (T[i] - C5.T0)); }
        nT[0] = nT[N - 1] = C5.T0; S.Tw = nT; S.sag = sagMM(S); S.maxSag = Math.max(S.maxSag, S.sag); if (!S.cheered && S.sag > 14 && S.maxSag > 14) { S.cheered = true; K.cheer(S, (g.xL + g.xR) / 2, g.wy); }
      }
      if (p.mode === 'rail' && S.trainX >= 0 && !S.derail) { S.trainX += dt * .22; const buck = p.gaps === 'no' && p.Tair > 25; if (buck && S.trainX > .42) { S.derail = 1; if (window.Sound) Sound.beep && Sound.beep(160, .3, 'sawtooth', .04); } if (S.trainX > 1.25) S.trainX = -1; }
    },
    draw(ctx, w, h, S) {
      const p = S.p, g = geo(S), m = p.mode;
      const sky = m === 'lab' ? {} : p.Tair < 8 ? { top: '#cbd5e1', bottom: '#e2e8f0' } : p.Tair > 32 ? { top: '#bae6fd', bottom: '#fef3c7' } : { top: '#bfdbfe', bottom: '#eff6ff' };
      K.bg(ctx, w, h, Object.assign({ benchY: m === 'lab' ? g.by : h, tiles: m === 'lab', bench: m === 'lab' }, sky));
      K.raw(ctx, () => {
        C5.tabs(ctx, S, 'mode', w - 14, 12, MODES, { bw: 112 });
        if (m === 'lab') this.drawLab(ctx, S, g); else { if (p.Tair > 32) C5.sun(ctx, w * .5, h * .14, 26, S.t); if (p.Tair < 8) C5.snow(ctx, w, h * .86, S.t, 50, clamp((8 - p.Tair) / 12, .3, 1));
          if (m === 'lines') this.drawLines(ctx, S, w, h); if (m === 'rail') this.drawRail(ctx, S, w, h); if (m === 'road') this.drawRoad(ctx, S, w, h);
          C5.tSlider(ctx, 104, h * .2, h * .62, p.Tair, -10, 50, { label: p.Tair < 8 ? '❄ شتاء' : p.Tair > 32 ? '☀ صيف' : 'ربيع', step: 10 }); }
        K.party(ctx, S);
      });
    },
    drawLab(ctx, S, g) {
      const p = S.p, sagPx = S.sag * (g.xR - g.xL) / SPAN * 2.5;
      C5.stand(ctx, g.xL, g.by, g.wy - 40); C5.stand(ctx, g.xR, g.by, g.wy - 40); C5.clamp(ctx, g.xL, g.wy); C5.clamp(ctx, g.xR, g.wy);
      if (p.ghost && sagPx > 3) { ctx.strokeStyle = 'rgba(71,85,105,.5)'; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.xL, g.wy); ctx.lineTo(g.xR, g.wy); ctx.stroke(); ctx.setLineDash([]); }
      const Y = x => { const s = (x - g.xL) / (g.xR - g.xL); return g.wy + (sagPx + .8) * 4 * s * (1 - s); };
      for (let i = 0; i < N; i++) { const x1 = g.xL + (g.xR - g.xL) * i / N, x2 = g.xL + (g.xR - g.xL) * (i + 1) / N; const T = S.Tw[i];
        ctx.lineCap = 'round'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x1, Y(x1)); ctx.lineTo(x2, Y(x2)); ctx.stroke();
        if (p.heat) { const tn = C5.tint(120 + (T - 25) * 2.4); if (tn) { ctx.strokeStyle = tn; ctx.lineWidth = 5; ctx.stroke(); } } }
      ctx.lineCap = 'butt';
      K.box(ctx, g.bx - 55, g.by + 2, 110, 8, 20, 'wood');
      K.burner(ctx, g.bx, g.fy - 4, S.fireOn ? p.pw : 0, S.t);
      if (p.labels) {
        const mx = (g.xL + g.xR) / 2; ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; if (sagPx > 4) G.arrow(ctx, mx + 40, g.wy, mx + 40, Y(mx), '#7c3aed', 2, 8);
        K.tag(ctx, `التدلي ≈ ${S.sag.toFixed(0)} mm`, mx + 110, g.wy + sagPx / 2 + 4, { s: 12.5, bg: '#7c3aed' });
        const Tm = Math.max(...S.Tw); K.tag(ctx, `أسخن نقطة ${Math.round(Tm)} °C`, g.bx, g.fy + 70, { s: 11.5, bg: Tm > 60 ? '#dc2626' : '#0f766e' });
        C5.card(ctx, 80, 52, 250, 64, '#b45309'); G.text(ctx, `زيادة طول السلك ΔL = ${dLen(S).toFixed(2)} mm`, 205, 72, { s: 13, w: 900, c: '#92400e' }); G.text(ctx, 'سلك نحاسي طوله 1 m — التدلي مكبَّر في الرسم', 205, 97, { s: 11, c: '#475569' });
      }
      if (p.parts) { const R = 50, lx = Math.min(Math.max(g.bx, 170), g.w - 120), ly = g.wy - 150; const i = clamp(Math.round((g.bx - g.xL) / (g.xR - g.xL) * N - .5), 0, N - 1);
        ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(lx, ly + R); ctx.lineTo(g.bx, Y(g.bx) - 4); ctx.stroke(); ctx.setLineDash([]);
        C5.lattice(ctx, lx, ly, R, S.Tw[i], S.t, { n: 4, col: '#f59e5b', label: 'جزيئات السلك فوق اللهب' }); }
    },
    drawLines(ctx, S, w, h) {
      const T = S.p.Tair, sag = lineSag(T), gy = h * .86, top = h * .3, poles = [w * .24, w * .6, w * .94], sp = (h * .16) * sag / 2.6;
      poles.forEach(x => { ctx.fillStyle = '#78716c'; ctx.fillRect(x - 6, top - 20, 12, gy - top + 20); ctx.fillStyle = '#57534e'; ctx.fillRect(x - 46, top - 8, 92, 8); [-38, 0, 38].forEach(dx => { ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(x + dx, top - 12, 5, 0, TAU); ctx.fill(); }); });
      for (let k = 0; k < 2; k++) { const a = poles[k], b = poles[k + 1]; [-38, 0, 38].forEach((dx, j) => { ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const s = i / 40, x = a + dx + (b - a) * s, y = top - 12 + j * 3 + sp * 4 * s * (1 - s); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }); }
      const bx = poles[0] + (poles[1] - poles[0]) * .5; [0, 22].forEach((d, i) => { const x = bx + d, y = top - 12 + sp - 7; ctx.fillStyle = i ? '#1d4ed8' : '#f97316'; ctx.beginPath(); ctx.ellipse(x, y, 8, 6, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(x + 6, y - 5, 4, 0, TAU); ctx.fill(); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.moveTo(x + 10, y - 5); ctx.lineTo(x + 14, y - 4); ctx.lineTo(x + 10, y - 3); ctx.fill(); });
      ctx.fillStyle = '#65a30d'; ctx.fillRect(0, gy, w, h - gy); ctx.fillStyle = '#4d7c0f'; for (let x = 0; x < w; x += 11) ctx.fillRect(x, gy + (x * 13) % 60, 2, 6);
      if (S.p.labels) { const mx = (poles[1] + poles[2]) / 2; G.arrow(ctx, mx, top - 12, mx, top - 12 + sp, '#7c3aed', 2, 8); K.tag(ctx, `التدلي = ${sag.toFixed(2)} m`, mx + 70, top + sp / 2, { s: 13, bg: '#7c3aed' }); K.tag(ctx, `المسافة بين العمودين 100 m — طول السلك ${(100 + 8 * sag * sag / 300).toFixed(3)} m`, w * .6, gy + 26, { s: 12, bg: 'rgba(30,41,59,.85)' });
        K.bubble(ctx, T > 32 ? 'صيفاً: تمدد السلك فتدلّى ☀' : T < 8 ? 'شتاءً: تقلّص السلك فأصبح مشدوداً ❄' : 'اسحب المحرار لتغيير الفصل', w * .55, h * .2, { s: 13 }); }
    },
    railGeo(S, w, h) { const x0 = 150, x1 = w - 30, n = 3, L = (x1 - x0) / n, cy = h * .5; return { x0, x1, n, L, cy }; },
    drawRail(ctx, S, w, h) {
      const p = S.p, T = p.Tair, R = this.railGeo(S, w, h), gapMM = railGap(T), noGap = p.gaps === 'no', A = noGap && T > 25 ? 3.4 * Math.sqrt(T - 25) : 0;
      const off = x => { const a = R.x0 + R.L * .9, b = R.x0 + R.L * 2.1; return x > a && x < b ? A * Math.sin(Math.PI * (x - a) / (b - a)) ** 2 * (1 + .3 * Math.sin((x - a) / 18)) : 0; };
      ctx.fillStyle = '#84cc16'; ctx.fillRect(0, R.cy - 110, w, h - R.cy + 110); ctx.fillStyle = '#a8a29e'; ctx.fillRect(0, R.cy - 60, w, 120); ctx.fillStyle = 'rgba(0,0,0,.08)'; for (let x = 0; x < w; x += 9) ctx.fillRect(x + (x * 7) % 5, R.cy - 60 + (x * 13) % 110, 3, 3);
      for (let x = R.x0 - 60; x < w; x += 26) { ctx.fillStyle = '#92400e'; ctx.fillRect(x - 6, R.cy - 48 + off(x), 14, 96); }
      [-30, 30].forEach(dy => { for (let k = 0; k < R.n; k++) { const a = R.x0 + k * R.L, b = a + R.L; const gp = noGap ? 0 : gapMM * 1.3; const xa = k === 0 ? R.x0 - 80 : a + gp / 2, xb = k === R.n - 1 ? R.x1 + 60 : b - gp / 2;
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 9; ctx.beginPath(); for (let x = xa; x <= xb; x += 4) { const y = R.cy + dy + off(x); x === xa ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3; ctx.stroke(); } });
      // train (top view)
      if (S.trainX >= 0) { const tx = R.x0 - 120 + (R.x1 - R.x0 + 200) * S.trainX; ctx.save(); ctx.translate(tx, R.cy + off(tx)); if (S.derail) ctx.rotate(-.35); ['#dc2626', '#2563eb', '#2563eb'].forEach((c, i) => { ctx.fillStyle = c; rr(ctx, -i * 74 - 66, -26, 66, 52, 10); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(-i * 74 - 58, -16, 50, 6); }); ctx.restore(); if (S.derail) K.bubble(ctx, 'خطر! تقوّس القضيب فانحرف القطار عن مساره ⚠', tx, R.cy - 70, { s: 13, bg: '#fef2f2', bd: '#dc2626', c: '#7f1d1d' }); }
      // magnifier on a joint
      if (p.labels) { const jx = R.x0 + R.L * 2, jy = R.cy - 30; const lx = jx + 10, ly = R.cy + 150; ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(jx, jy + 36); ctx.lineTo(lx, ly - 52); ctx.stroke(); ctx.setLineDash([]);
        K.lens(ctx, lx, ly, 52, () => { ctx.fillStyle = '#d6d3d1'; ctx.fillRect(lx - 52, ly - 52, 104, 104); const gp = noGap ? 0 : Math.max(0, gapMM) * 4; ctx.fillStyle = '#64748b'; ctx.fillRect(lx - 60, ly - 12, 60 - gp / 2, 24); ctx.fillRect(lx + gp / 2, ly - 12, 60, 24); ctx.fillStyle = '#e2e8f0'; ctx.fillRect(lx - 60, ly - 12, 60 - gp / 2, 5); ctx.fillRect(lx + gp / 2, ly - 12, 60, 5); });
        K.tag(ctx, noGap ? 'بدون فاصل (قضيب واحد طويل)' : `عرض الفاصل = ${Math.max(0, gapMM).toFixed(1)} mm`, lx, ly + 70, { s: 12.5, bg: noGap ? '#dc2626' : '#0f766e' });
        K.tag(ctx, `طول كل قضيب 12 m — يزداد ${(A_ST * 12000 * (T - 20)).toFixed(1)} mm عن طوله عند 20 °C`, w * .4, R.cy + 84, { s: 12, bg: 'rgba(30,41,59,.85)' }); }
      if (A > 6 && !S.derail) K.bubble(ctx, 'القضبان المثبتة بلا فواصل تقوّست! 🔥', R.x0 + R.L * 1.5, R.cy - 50, { s: 13, bg: '#fff7ed', bd: '#ea580c', c: '#7c2d12' });
      this.btns(ctx, S, w, h);
    },
    btnGeo(S, w, h) { const y = h * .86 + 22; return [{ id: 'gapbtn', x: w * .44, y, w: 170, t: S.p.gaps === 'yes' ? '✂ إزالة الفواصل' : '➕ إضافة الفواصل' }].concat(S.p.mode === 'rail' ? [{ id: 'train', x: w * .72, y, w: 150, t: S.trainX >= 0 ? '⟲ أعد القطار' : '🚂 سيّر القطار' }] : []); },
    btns(ctx, S, w, h) { this.btnGeo(S, w, h).forEach(b => { ctx.fillStyle = '#fff'; rr(ctx, b.x - b.w / 2, b.y - 16, b.w, 32, 16); ctx.fill(); ctx.strokeStyle = '#0f766e'; ctx.lineWidth = 2; ctx.stroke(); G.text(ctx, b.t, b.x, b.y + 1, { s: 13, w: 800, c: '#0f172a' }); }); },
    drawRoad(ctx, S, w, h) {
      const p = S.p, T = p.Tair, noGap = p.gaps === 'no', x0 = 150, x1 = w - 30, n = 4, L = (x1 - x0) / n, ry = h * .6, th = 34;
      ctx.fillStyle = '#a16207'; ctx.fillRect(0, ry + th, w, h - ry - th); ctx.fillStyle = '#ca8a04'; for (let x = 0; x < w; x += 7) ctx.fillRect(x, ry + th + (x * 17) % 90, 3, 3);
      const exp = (T - 20) * .09, lift = noGap && T > 28 ? (T - 28) * 1.6 : 0;
      for (let k = 0; k < n; k++) { const a = x0 + k * L, b = a + L; const gp = noGap ? 0 : Math.max(1, 9 - exp * 2); const xa = a + gp / 2 - (noGap ? 0 : 0), xb = b - gp / 2;
        const j1 = k === 2 ? lift : 0, j0 = k === 1 ? lift : 0; // lift the shared edge of slabs 1|2
        ctx.fillStyle = '#d6d3d1'; ctx.beginPath(); ctx.moveTo(xa, ry - (k === 2 ? lift : 0)); ctx.lineTo(xb, ry - (k === 1 ? lift : 0)); ctx.lineTo(xb, ry + th - (k === 1 ? lift : 0)); ctx.lineTo(xa, ry + th - (k === 2 ? lift : 0)); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#78716c'; ctx.lineWidth = 1.5; ctx.stroke(); void j0; void j1;
        if (!noGap && k < n - 1) { ctx.fillStyle = '#111827'; const tb = clamp((T - 20) / 30, -1, 1) * 5; ctx.beginPath(); ctx.moveTo(b - gp / 2, ry); ctx.quadraticCurveTo(b, ry - tb, b + gp / 2, ry); ctx.lineTo(b + gp / 2, ry + th); ctx.lineTo(b - gp / 2, ry + th); ctx.fill(); } }
      if (lift > 8) { ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 1.5; const cx = x0 + L * 2; ctx.beginPath(); ctx.moveTo(cx - 3, ry - lift); ctx.lineTo(cx + 5, ry - lift + 12); ctx.lineTo(cx - 2, ry - lift + 20); ctx.lineTo(cx + 4, ry - lift + 30); ctx.stroke(); K.bubble(ctx, 'بلا فواصل: تمددت القطع ودفعت بعضها فتشقق الطريق وارتفع! ⚠', cx, ry - lift - 10, { s: 13, bg: '#fef2f2', bd: '#dc2626', c: '#7f1d1d' }); }
      if (p.labels) { K.tag(ctx, noGap ? 'قطع كونكريتية متلاصقة (بدون فواصل)' : 'فواصل بين القطع الكونكريتية مملوءة بالقير', w * .58, ry + th + 30, { s: 12.5, bg: noGap ? '#dc2626' : '#0f766e' }); if (!noGap) K.bubble(ctx, T > 32 ? 'صيفاً: تمددت القطع وضغطت القير في الفواصل' : T < 8 ? 'شتاءً: تقلّصت القطع واتسعت الفواصل' : 'الفواصل تسمح للقطع بالتمدد', w * .58, ry - 20, { s: 13 }); }
      this.btns(ctx, S, w, h);
    },
    drags(S) {
      const w = S.W, h = S.H, p = S.p, g = geo(S); const L = C5.tabsDrag(S, 'mode', w - 14, 12, MODES, { bw: 112 });
      if (p.mode === 'lab') L.push({ id: 'burner', x: g.bx, y: g.fy + 12, w: 50, h: 64, axis: 'x', tip: 'اسحب المصدر الحراري على طول السلك — أو انقره لإطفائه/إشعاله', idle: 'حرّك المصدر الحراري تحت السلك ✋',
        drag: (S, d) => { const g = geo(S); S.bxf = clamp((d.ox + d.x - d.sx - g.xL) / (g.xR - g.xL), -.25, 1.1); }, click: S => { S.fireOn = !S.fireOn; } });
      else { L.push(C5.tSliderDrag(S, 'Tair', 104, h * .2, h * .62, -10, 50, { tip: 'اسحب المحرار: شتاء ↔ صيف', idle: 'اسحب المحرار لتغيير درجة الحرارة ✋' }));
        if (p.mode !== 'lines') this.btnGeo(S, w, h).forEach(b => L.push({ id: b.id, x: b.x, y: b.y, w: b.w, h: 32, hint: false, tip: b.t, click: S => { if (b.id === 'gapbtn') setParam(S, 'gaps', S.p.gaps === 'yes' ? 'no' : 'yes'); else { S.trainX = S.trainX >= 0 ? -1 : 0; S.derail = 0; } } })); }
      return L;
    },
    readings(S) { const p = S.p; if (p.mode === 'lab') return [rd('أسخن نقطة في السلك', Math.round(Math.max(...S.Tw)) + ' °C'), rd('الزيادة في الطول ΔL', dLen(S).toFixed(2) + ' mm'), rd('مقدار التدلي', (S.sag || 0).toFixed(0) + ' mm'), rd('حالة السلك', (S.sag || 0) > 8 ? 'مرتخٍ (متدلٍّ)' : 'مشدود', 1)];
      if (p.mode === 'lines') return [rd('درجة حرارة الجو', p.Tair + ' °C'), rd('تدلي السلك', lineSag(p.Tair).toFixed(2) + ' m'), rd('الفصل', p.Tair > 32 ? 'صيف — متدلٍّ' : p.Tair < 8 ? 'شتاء — مشدود' : 'معتدل', 1)];
      if (p.mode === 'rail') return [rd('درجة حرارة الجو', p.Tair + ' °C'), rd('عرض الفاصل', p.gaps === 'no' ? 'لا يوجد' : Math.max(0, railGap(p.Tair)).toFixed(1) + ' mm'), rd('حالة القضبان', p.gaps === 'no' && p.Tair > 25 ? 'متقوسة ملتوية ⚠' : 'سليمة ✓', 1)];
      return [rd('درجة حرارة الجو', p.Tair + ' °C'), rd('الطريق', p.gaps === 'no' && p.Tair > 28 ? 'تشقق وارتفع ⚠' : 'سليم ✓', 1)]; },
    explain(S) { const p = S.p; if (p.mode === 'lab') return (S.sag || 0) > 8 ? `سخن السلك فاكتسبت جزيئاته طاقة حركية و<b>تباعدت</b>، فازداد طوله ${dLen(S).toFixed(2)} mm. وبما أن طرفيه مثبتان فإنه <b>يتدلى</b>. أبعد اللهب لترى كيف يعود مشدوداً.` : 'السلك النحاسي بارد ومشدود بين الحاملين. ضع المصدر الحراري تحته وحركه يميناً ويساراً.';
      if (p.mode === 'lines') return 'أسلاك الكهرباء <b>تتمدد صيفاً</b> فيزداد طولها وتبدو متدلية، و<b>تتقلص شتاءً</b> فتبدو مشدودة. لذلك تُركَّب مرتخية قليلاً حتى لا تنقطع في البرد.';
      if (p.mode === 'rail') return 'تتمدد قضبان السكة صيفاً وتتقلص شتاءً. لو ثُبتت من جهتيها بلا فواصل <b>لتقوّست</b> وانحرف القطار، لذلك تُترك بين كل قضيبين <b>مسافة مناسبة</b> للتمدد.';
      return 'تُترك <b>فواصل</b> بين القطع الكونكريتية في الطرق والجسور لتتمدد فيها صيفاً دون أن تتشقق.'; },
    quiz: [
      { q: 'ما سبب تدلي أسلاك الكهرباء في فصل الصيف؟', o: ['يزداد وزنها صيفاً', 'تتمدد بالحرارة فيزداد طولها', 'تتقلص بالحرارة'], a: 1, why: 'ارتفاع درجة الحرارة يزيد طول الأسلاك (تمدد طولي) فتتدلى (ص 75).' },
      { q: 'التمدد الطولي للأجسام الصلبة هو:', o: ['الزيادة في مساحة سطح الجسم', 'الزيادة في كتلة الجسم', 'الزيادة الحاصلة في طول الجسم الصلب إذا ارتفعت درجة حرارته'], a: 2, why: 'تعريف الكتاب ص 76.' },
      { q: 'لماذا تُترك فواصل بين قضبان سكك الحديد؟', o: ['لتسمح للقضبان بالتمدد صيفاً فلا تتقوس', 'لتصريف مياه الأمطار', 'لتقليل الكلفة'], a: 0, why: 'بدون فواصل تتقوس القضبان وينحرف القطار عن مساره (ص 76).' }
    ]
  });
})();

/* =====================================================================
   3) نوع المادة: الرصاص والنحاس، الشريط المزدوج، التمدد الطولي والسطحي والحجمي (ص 76–77)
   ===================================================================== */
(function () {
  const A_PB = 29e-6, A_CU = 17e-6, A_FE = 12e-6, L0 = 500; // mm
  /* big, clearly visible animated bunsen flame: nozzle top at (x, y), scale s, power 0..1 */
  if (!C5.bigBurner) C5.bigBurner = (ctx, x, y, s, power, t) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); K.burner(ctx, 0, 0, 0, t);
    K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(-7, 8, 14, 6); ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(0, 11, 2.5, 0, TAU); ctx.fill();
      if (power > .02) { const f = 1 + .09 * Math.sin(t * 21) + .06 * Math.sin(t * 34 + 1), H = (30 + 52 * power) * f, W = 11 + 4 * power, sw = Math.sin(t * 9) * 2.5;
        const halo = ctx.createRadialGradient(0, -H * .45, 2, 0, -H * .45, H * .85); halo.addColorStop(0, 'rgba(251,146,60,.35)'); halo.addColorStop(1, 'rgba(251,146,60,0)'); ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(0, -H * .45, H * .85, 0, TAU); ctx.fill();
        const og = ctx.createLinearGradient(0, 0, 0, -H); og.addColorStop(0, 'rgba(59,130,246,.95)'); og.addColorStop(.25, 'rgba(250,204,21,.95)'); og.addColorStop(.7, 'rgba(249,115,22,.9)'); og.addColorStop(1, 'rgba(239,68,68,.15)');
        ctx.fillStyle = og; ctx.beginPath(); ctx.moveTo(-W * .8, 0); ctx.bezierCurveTo(-W * 1.5, -H * .35, -W * .5 + sw, -H * .7, sw * 1.6, -H); ctx.bezierCurveTo(W * .5 + sw, -H * .7, W * 1.5, -H * .35, W * .8, 0); ctx.closePath(); ctx.fill();
        const ig = ctx.createLinearGradient(0, 0, 0, -H * .45); ig.addColorStop(0, 'rgba(37,99,235,.95)'); ig.addColorStop(1, 'rgba(147,197,253,.6)'); ctx.fillStyle = ig; ctx.beginPath(); ctx.moveTo(-W * .45, 0); ctx.quadraticCurveTo(-W * .5, -H * .25, sw * .6, -H * .45); ctx.quadraticCurveTo(W * .5, -H * .25, W * .45, 0); ctx.closePath(); ctx.fill(); } });
    ctx.restore(); return (30 + 52 * power) * s;
  };
  const MODES = [['wires', 'رصاص ونحاس'], ['strip', 'الشريط المزدوج'], ['dims', 'طولي·سطحي·حجمي']];
  const heatT = (S, on, dt, pw, Tmax = 330) => { S.T += on ? pw * 70 * dt * clamp(1 - (S.T - 25) / (Tmax - 25), 0, 1) : -(S.T - C5.T0) * .09 * dt; };
  const geo = S => { const w = S.W, h = S.H, by = h * .82; return { w, h, by, fy: by - 44, bx: S.bxf * w }; };
  const stripGeo = (S, g) => { const x0 = Math.max(130, g.w * .17), y0 = g.h * .4, L = g.w * .5; return { x0, y0, L, cy: y0 + S.cgap }; };
  const kappa = (S, L) => { const dA = (S.p.top === 'lead' ? 1 : -1) * (A_PB - A_CU); return 3 * dA * (S.T - C5.T0) / 2 / 1 * (150 / L); }; // 1/px (strip 150 mm long drawn L px, thickness 1 mm)
  const stripPts = (S, s, n = 40) => { const k = kappa(S, s.L); const P = []; for (let i = 0; i <= n; i++) { const u = s.L * i / n; const x = Math.abs(k) < 1e-7 ? s.x0 + u : s.x0 + Math.sin(k * u) / k, y = Math.abs(k) < 1e-7 ? s.y0 : s.y0 + (1 - Math.cos(k * u)) / k; P.push([x, y, Math.atan2(Math.sin(k * u), Math.cos(k * u))]); } return P; };
  const touching = S => { const g = geo(S), s = stripGeo(S, g), P = stripPts(S, s), t = P[P.length - 1]; return S.p.mode === 'strip' && t[1] + 8 >= s.cy && Math.abs(t[0] - (s.x0 + s.L - 10)) < 24; };
  X7({ id: 'g7_bimetal', ch: 15, sec: 'الدرس 1', page: 77, kind: 'نشاط', title: 'نوع المادة: الرصاص والنحاس، والشريط المزدوج، وأنواع التمدد',
    desc: 'سلكان متساويان في الطول من الرصاص والنحاس يُسخَّنان معاً: أيهما يتمدد أكثر؟ شريط من الفلزين ينحني عند تسخينه (جرس إنذار الحريق)، ونرى التمدد الطولي والسطحي والحجمي.',
    tags: 'نوع المادة رصاص نحاس شريط مزدوج انحناء إنذار تمدد سطحي حجمي',
    tools: ['سلك رصاص وسلك نحاس لهما الطول والقطر نفسيهما', 'شريط مزدوج (رصاص + نحاس)', 'مصدر حراري', 'قضيب وصفيحة ومكعب من الحديد', 'مسخّن كهربائي'],
    steps: ['في «رصاص ونحاس»: أدر مقبض المصدر الحراري لتسخين السلكين معاً، وراقب المؤشرين: أيهما يتحرك أكثر؟', 'فعّل «الجزيئات» وقارن تباعد جزيئات الرصاص والنحاس.', 'اختر «الشريط المزدوج» واسحب المصدر الحراري تحته. في أي اتجاه ينحني؟ ولماذا؟', 'اسحب نقطة التماس قريباً من الشريط وسخّنه: يرن جرس الإنذار! ثم أبعد اللهب.', 'اقلب الشريط (النحاس في الأعلى) وسخّنه مرة أخرى.', 'اختر «طولي·سطحي·حجمي» وأدر مقبض المسخّن: لاحظ القضيب والصفيحة والمكعب.'],
    concl: ['الأجسام لا تتمدد بالمقدار نفسه: عند تسخين سلكين متساويين من الرصاص والنحاس تكون الزيادة في سلك الرصاص أكبر.', 'إذا ثُبّت فلزان معاً بشكل شريط فإن تمدد أحدهما أكبر من الآخر فينحني الشريط، ويكون الفلز الأكثر تمدداً في الجهة الخارجية للانحناء.', 'الزيادة في الطول: تمدد طولي، والزيادة في مساحة السطح (ببعدين): تمدد سطحي، والزيادة في الحجم (بثلاثة أبعاد): تمدد حجمي.'],
    laws: ['g7_expand'],
    fact: ['يُستعمل الشريط المزدوج في منظّم الحرارة (الثرموستات) في المكواة والمدفأة، وفي أجراس إنذار الحريق.', 'عند تسخين مكعب صلب تزداد أطوال أضلاعه جميعها بالنسبة نفسها (ص 77).'],
    controls: [
      SEL('mode', 'المشهد', MODES, 'wires', (v, S) => { S.T = C5.T0; S.bxf = .12; }),
      R('pw', 'شدة المصدر الحراري', 0, 1, 0, .05, '', null, v => Math.round(v * 100) + '%'),
      SEL('top', 'الطبقة العليا في الشريط', [['lead', 'الرصاص'], ['cu', 'النحاس']], 'lead'),
      BT('', [{ t: '❄ تبريد (إطفاء المصدر)', on: S => { setParam(S, 'pw', 0); S.bxf = .12; } }]),
      TG('parts', 'الجزيئات (عدسة مكبّرة)', true, null, 'atom'), TG('labels', 'القيم والأسماء', true, null, 'labels'),
      TG('ghost', 'الشكل الأصلي وهو بارد', true, null, 'eye'), TG('alarm', 'دائرة جرس الإنذار', true, null, 'current'), TG('arrows', 'أسهم اتجاهات التمدد', true, null, 'vector')],
    setup(S) { S.T = C5.T0; S.bxf = .12; S.cgap = 70; S.ring = 0; S.rang = 0; S.cheered = false; },
    update(S, dt) {
      const p = S.p, g = geo(S);
      if (p.mode === 'strip') { const s = stripGeo(S, g); const under = g.bx > s.x0 + 20 && g.bx < s.x0 + s.L + 10; heatT(S, under, dt, 1, 360); const tc = touching(S); if (tc && !S.ring) { S.ring = 1; if (!S.cheered) { S.cheered = true; K.cheer(S, s.x0 + s.L, s.cy); } } if (!tc) S.ring = 0; if (S.ring && window.Sound && Math.floor(S.t * 6) % 2 === 0 && Math.floor((S.t - dt) * 6) % 2 === 1) Sound.beep && Sound.beep(1200, .06, 'square', .03); }
      else { const Tt = 25 + 330 * p.pw; S.T += (Tt - S.T) * Math.min(1, dt * .6); }
    },
    draw(ctx, w, h, S) {
      const p = S.p, g = geo(S); K.bg(ctx, w, h, { benchY: g.by });
      K.raw(ctx, () => { C5.tabs(ctx, S, 'mode', w - 14, 12, MODES, { bw: 128 }); this['d_' + p.mode](ctx, S, g); K.party(ctx, S); });
    },
    wiresGeo(g) { const x0 = Math.max(130, g.w * .16), L = g.w * .56, y1 = g.h * .42, y2 = g.h * .42 + 30; return { x0, L, y1, y2, knx: x0 + L * .5 + 100, kny: g.by - 26 }; },
    d_wires(ctx, S, g) {
      const p = S.p, W = this.wiresGeo(g), dT = S.T - C5.T0, dPb = A_PB * L0 * dT, dCu = A_CU * L0 * dT, EXg = 8;
      // long burner (trough)
      ctx.fillStyle = '#475569'; rr(ctx, W.x0 + 20, g.by - 30, W.L - 40, 22, 6); ctx.fill(); ctx.fillStyle = '#334155'; ctx.fillRect(W.x0 + 30, g.by - 10, 10, 10); ctx.fillRect(W.x0 + W.L - 40, g.by - 10, 10, 10);
      if (p.pw > .02) for (let x = W.x0 + 40; x < W.x0 + W.L - 30; x += 26) { const f = 1 + .12 * Math.sin(S.t * 20 + x); const H = (20 + (W.y2 - g.by + 50) * -1 * p.pw * .0 + 70 * p.pw) * f; const gr = ctx.createLinearGradient(0, g.by - 30 - H, 0, g.by - 30); gr.addColorStop(0, 'rgba(249,115,22,0)'); gr.addColorStop(.5, 'rgba(249,115,22,.8)'); gr.addColorStop(1, 'rgba(59,130,246,.9)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x - 8, g.by - 30); ctx.quadraticCurveTo(x - 10, g.by - 30 - H * .5, x, g.by - 30 - H); ctx.quadraticCurveTo(x + 10, g.by - 30 - H * .5, x + 8, g.by - 30); ctx.fill(); }
      // knob
      ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(W.knx, W.kny, 20, 0, TAU); ctx.fill(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 4; ctx.beginPath(); const ka = -Math.PI * 1.25 + p.pw * Math.PI * 1.5; ctx.moveTo(W.knx, W.kny); ctx.lineTo(W.knx + Math.cos(ka) * 17, W.kny + Math.sin(ka) * 17); ctx.stroke(); G.text(ctx, 'المقبض ' + Math.round(p.pw * 100) + '%', W.knx + 62, W.kny, { s: 11.5, w: 800, c: '#fff', bg: '#b45309' });
      // clamp block
      ctx.fillStyle = '#334155'; rr(ctx, W.x0 - 36, W.y1 - 30, 36, W.y2 - W.y1 + 60, 6); ctx.fill(); C5.stand(ctx, W.x0 - 18, g.by, W.y2 + 30, { bw: 30 });
      // wires + dials
      [[W.y1, dPb, '#6b7280', 'الرصاص', -1], [W.y2, dCu, '#d97706', 'النحاس', 1]].forEach(([y, dL, col, nm, dir]) => {
        const xe = W.x0 + W.L + dL * EXg; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(W.x0, y); ctx.lineTo(xe, y); ctx.stroke(); const tn = C5.tint(120 + dT * 1.3); if (tn) { ctx.strokeStyle = tn; ctx.lineWidth = 7; ctx.stroke(); } ctx.lineCap = 'butt';
        if (p.ghost && dL > .05) { ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(W.x0 + W.L, y - 10); ctx.lineTo(W.x0 + W.L, y + 10); ctx.stroke(); }
        // dial with needle (roller r = 3 mm)
        const dx = W.x0 + W.L + 60, dy = y + dir * 6, R = 64, th = dL / 3; ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.beginPath(); ctx.arc(dx, dy, R + 8, dir < 0 ? Math.PI : 0, dir < 0 ? TAU : Math.PI); ctx.closePath(); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke();
        for (let mm = 0; mm <= 4; mm += .5) { const a = Math.PI + mm / 3 * (dir < 0 ? 1 : -1); const r1 = mm % 1 ? R - 6 : R - 11; ctx.strokeStyle = '#334155'; ctx.lineWidth = mm % 1 ? 1 : 2; ctx.beginPath(); ctx.moveTo(dx + Math.cos(a) * r1, dy + Math.sin(a) * r1); ctx.lineTo(dx + Math.cos(a) * R, dy + Math.sin(a) * R); ctx.stroke(); if (!(mm % 1)) G.text(ctx, String(mm), dx + Math.cos(a) * (R - 20), dy + Math.sin(a) * (R - 20), { s: 10, c: '#334155', mono: 1 }); }
        const a = Math.PI + th * (dir < 0 ? 1 : -1); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(dx, dy); ctx.lineTo(dx + Math.cos(a) * (R - 4), dy + Math.sin(a) * (R - 4)); ctx.stroke(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(dx, dy, 6, 0, TAU); ctx.fill();
        if (p.labels) { K.tag(ctx, `${nm}: ΔL = ${dL.toFixed(2)} mm`, dx + 10, dy + dir * (R + 24), { s: 12.5, bg: col === '#d97706' ? '#b45309' : '#374151' }); G.text(ctx, 'سلك ' + nm + ' (50 cm)', W.x0 + 70, y + dir * 16, { s: 11.5, w: 800, c: col === '#d97706' ? '#92400e' : '#374151' }); }
      });
      if (p.labels) { K.tag(ctx, `درجة حرارة السلكين ${Math.round(S.T)} °C`, W.x0 + W.L * .45, W.y1 - 44, { s: 13, bg: S.T > 60 ? '#dc2626' : '#0f766e' }); G.text(ctx, 'الطرف الأيمن حرّ يدير المؤشر — القراءة بالمليمتر', W.x0 + W.L * .45, W.y2 + 44, { s: 11, c: '#475569' }); }
      if (p.parts) this.lenses(ctx, S, g);
      if (dPb - dCu > .6) K.bubble(ctx, 'سلك الرصاص تمدد أكثر من سلك النحاس!', W.x0 + W.L * .45, W.y1 - 70, { s: 13 });
    },
    lenses(ctx, S, g) { const R = 46, y = 60 + R * .2 + 20, x = Math.max(160, g.w * .22); C5.lattice(ctx, x, y + 10, R, S.T, S.t, { n: 4, col: '#6b7280', gap: .0016, label: 'جزيئات الرصاص', lbg: '#374151' }); C5.lattice(ctx, x + R * 2.6, y + 10, R, S.T, S.t, { n: 4, col: '#f59e5b', gap: .0009, label: 'جزيئات النحاس', lbg: '#b45309' }); },
    d_strip(ctx, S, g) {
      const p = S.p, s = stripGeo(S, g), P = stripPts(S, s), tip = P[P.length - 1], ring = touching(S);
      C5.stand(ctx, s.x0 - 22, g.by, s.y0 - 40, { bw: 34 }); ctx.fillStyle = '#334155'; rr(ctx, s.x0 - 40, s.y0 - 22, 42, 44, 6); ctx.fill();
      if (p.ghost && Math.abs(tip[1] - s.y0) > 3) { ctx.strokeStyle = 'rgba(15,23,42,.45)'; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.5; ctx.strokeRect(s.x0, s.y0 - 8, s.L, 16); ctx.setLineDash([]); }
      const layer = (off, col) => { ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((q, i) => { const x = q[0] - Math.sin(q[2]) * off, y = q[1] + Math.cos(q[2]) * off; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); ctx.lineCap = 'butt'; };
      const topC = p.top === 'lead' ? '#6b7280' : '#d97706', botC = p.top === 'lead' ? '#d97706' : '#6b7280'; layer(-4, topC); layer(4, botC);
      const tn = C5.tint(120 + (S.T - 25) * 1.2); if (tn) { ctx.globalAlpha = .6; layer(-4, tn); layer(4, tn); ctx.globalAlpha = 1; }
      if (p.labels) { G.text(ctx, p.top === 'lead' ? 'رصاص' : 'نحاس', s.x0 + 60, P[6][1] - 22, { s: 12, w: 900, c: '#fff', bg: topC }); G.text(ctx, p.top === 'lead' ? 'نحاس' : 'رصاص', s.x0 + 60, P[6][1] + 24, { s: 12, w: 900, c: '#fff', bg: botC }); }
      if (p.arrows && S.T > 50) { const k = clamp((S.T - 25) / 300, 0, 1); K.force(ctx, tip[0] + 8, tip[1] - (p.top === 'lead' ? 10 : -10), 30 + 40 * k, 0, 'يتمدد أكثر', topC === '#6b7280' ? '#374151' : '#b45309', 3); }
      // contact screw + alarm circuit
      const cx = s.x0 + s.L - 10, cy = s.cy;
      ctx.fillStyle = '#94a3b8'; ctx.fillRect(cx - 4, cy, 8, 30); ctx.fillStyle = ring ? '#22c55e' : '#475569'; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, TAU); ctx.fill(); ctx.fillStyle = '#334155'; rr(ctx, cx - 20, cy + 30, 40, 12, 4); ctx.fill();
      if (p.labels) G.text(ctx, 'نقطة التماس (اسحبها)', cx, cy + 58, { s: 11, w: 800, c: '#fff', bg: '#475569' });
      if (p.alarm) { const bx = g.w - 90, byy = g.h * .22, batX = s.x0 + 60, batY = g.by - 60;
        ctx.strokeStyle = ring ? '#16a34a' : '#64748b'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(s.x0 - 20, s.y0 + 22); ctx.lineTo(s.x0 - 20, batY); ctx.lineTo(batX - 26, batY); ctx.moveTo(batX + 26, batY); ctx.lineTo(bx, batY); ctx.lineTo(bx, byy + 30); ctx.moveTo(bx - 20, byy + 20); ctx.lineTo(bx - 60, byy + 20); ctx.lineTo(bx - 60, cy + 36); ctx.lineTo(cx + 20, cy + 36); ctx.stroke();
        ctx.fillStyle = '#1e293b'; rr(ctx, batX - 26, batY - 14, 52, 28, 5); ctx.fill(); ctx.fillStyle = '#facc15'; ctx.fillRect(batX + 10, batY - 14, 16, 28); G.text(ctx, 'بطارية', batX, batY + 26, { s: 11, w: 800, c: '#334155' });
        const sh = ring ? Math.sin(S.t * 60) * 3 : 0; ctx.save(); ctx.translate(bx + sh, byy); ctx.fillStyle = ring ? '#facc15' : '#eab308'; ctx.beginPath(); ctx.moveTo(-26, 22); ctx.quadraticCurveTo(-24, -18, 0, -20); ctx.quadraticCurveTo(24, -18, 26, 22); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#a16207'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.arc(0, 26, 6, 0, TAU); ctx.fill(); ctx.restore();
        if (ring) { ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3; [18, 30].forEach(r => { ctx.beginPath(); ctx.arc(bx, byy, r + 14, -.5, .5); ctx.stroke(); ctx.beginPath(); ctx.arc(bx, byy, r + 14, Math.PI - .5, Math.PI + .5); ctx.stroke(); }); K.bubble(ctx, 'ترن! ترن! 🔔 إنذار حريق', bx - 30, byy - 30, { s: 14, bg: '#fef2f2', bd: '#dc2626', c: '#7f1d1d' }); }
        else if (p.labels) G.text(ctx, 'جرس إنذار الحريق', bx - 10, byy - 36, { s: 12, w: 800, c: '#334155' }); }
      { const ny = s.y0 + 150, jt = ny + 63; K.box(ctx, g.bx - 46, g.by, 92, g.by - jt, 22, 'wood'); const fh = C5.bigBurner(ctx, g.bx, ny, 1.5, 1, S.t); if (p.labels) G.text(ctx, 'اللهب (اسحبه ↔)', g.bx, jt + 20, { s: 11.5, w: 800, c: '#fff', bg: '#c2410c' }); void fh; }
      if (p.labels) K.tag(ctx, `درجة حرارة الشريط ${Math.round(S.T)} °C`, s.x0 + s.L * .5, s.y0 - 40, { s: 13, bg: S.T > 60 ? '#dc2626' : '#0f766e' });
      if (p.parts) this.lenses(ctx, S, g);
    },
    dimsGeo(g) { const ty = g.by - 150, x0 = 64 + 30, x1 = g.w - 24, cw = (x1 - x0) / 3; return { ty, x0, x1, cw, cols: [x0 + cw * .5, x0 + cw * 1.5, x0 + cw * 2.5], kx: x1 - 40, ky: g.by - 26, pl: { x: (x0 + x1) / 2, y: ty, w: x1 - x0 } }; },
    d_dims(ctx, S, g) {
      const p = S.p, D = this.dimsGeo(g), EXV = 60, f = 1 + A_FE * (S.T - C5.T0) * EXV, base = D.ty, hot = clamp((S.T - 25) / 330, 0, 1);
      // three big burners under a metal tray (the source of heat), gas pipe + valve knob
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(D.cols[0], g.by - 8); ctx.lineTo(D.kx, g.by - 8); ctx.stroke();
      D.cols.forEach(cx => C5.bigBurner(ctx, cx, g.by - 63, 1.5, p.pw, S.t + cx));
      ctx.fillStyle = '#64748b'; [D.x0 + 10, D.x1 - 16].forEach(x => ctx.fillRect(x, base + 10, 6, g.by - base - 10));
      const tg = ctx.createLinearGradient(0, base, 0, base + 12); tg.addColorStop(0, '#cbd5e1'); tg.addColorStop(1, '#64748b'); ctx.fillStyle = tg; rr(ctx, D.x0, base, D.x1 - D.x0, 12, 4); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.stroke();
      if (hot > .02) { ctx.fillStyle = `rgba(239,68,68,${.15 + .55 * hot})`; rr(ctx, D.x0 + 4, base + 1, D.x1 - D.x0 - 8, 5, 3); ctx.fill(); }
      ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(D.kx, D.ky, 16, 0, TAU); ctx.fill(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 4; const ka = -Math.PI * 1.25 + p.pw * Math.PI * 1.5; ctx.beginPath(); ctx.moveTo(D.kx, D.ky); ctx.lineTo(D.kx + Math.cos(ka) * 14, D.ky + Math.sin(ka) * 14); ctx.stroke();
      if (p.labels) G.text(ctx, 'صمام الغاز ' + Math.round(p.pw * 100) + '%', D.kx - 4, D.ky + 30, { s: 11, w: 800, c: '#fff', bg: '#b45309' });
      // objects: anchored at the front-bottom-left corner, so every ΔL grows to the right / back / up
      const u = clamp(D.cw / 250, .6, 1.1), dash = (x, yb, W, H, Dd) => { const dx = Dd * .6, dy = Dd * .45; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.setLineDash([7, 4]); ctx.beginPath(); ctx.rect(x, yb - H, W, H); ctx.moveTo(x, yb - H); ctx.lineTo(x + dx, yb - H - dy); ctx.lineTo(x + W + dx, yb - H - dy); ctx.lineTo(x + W, yb - H); ctx.moveTo(x + W + dx, yb - H - dy); ctx.lineTo(x + W + dx, yb - dy); ctx.lineTo(x + W, yb); ctx.stroke(); ctx.setLineDash([]); };
      const tint = (x, yb, W, H, Dd) => { const tn = C5.tint(120 + (S.T - 25) * 1.1); if (!tn) return; const dx = Dd * .6, dy = Dd * .45; ctx.fillStyle = tn; ctx.globalAlpha = .7; ctx.beginPath(); ctx.moveTo(x, yb); ctx.lineTo(x + W, yb); ctx.lineTo(x + W + dx, yb - dy); ctx.lineTo(x + W + dx, yb - H - dy); ctx.lineTo(x + dx, yb - H - dy); ctx.lineTo(x, yb - H); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; };
      const Q = [], dl = (...A) => Q.push(A), dl0 = (x1, y1, ux, uy, extra, col, lab) => { if (!p.arrows) return; const L = extra + 26; K.force(ctx, x1, y1, ux * L, uy * L, null, col, 3.5); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1 - uy * 7, y1 + ux * 7); ctx.lineTo(x1 + uy * 7, y1 - ux * 7); ctx.stroke(); if (p.labels) G.text(ctx, lab, x1 + ux * (L + 26) - (uy === 0 ? 18 : 0), y1 + uy * (L + 16) - (uy === 0 ? 20 : 0), { s: 13, w: 900, c: '#fff', bg: col }); };
      const RC = '#dc2626', DC = '#7c3aed', HC = '#0369a1';
      // 1) rod — linear
      { const W0 = 175 * u, H0 = 18 * u, D0 = 18 * u, x = D.cols[0] - W0 * .62, W = W0 * f; K.box(ctx, x, base, W, H0, D0, 'iron'); tint(x, base, W, H0, D0); if (p.ghost) dash(x, base, W0, H0, D0);
        dl(x + W0 + D0 * .3, base - H0 / 2 - D0 * .22, 1, 0, W - W0, RC, 'ΔL'); }
      // 2) plate — area (length and width grow)
      { const W0 = 130 * u, H0 = 9 * u, D0 = 120 * u, x = D.cols[1] - W0 * .8, W = W0 * f, Dd = D0 * f; K.box(ctx, x, base, W, H0, Dd, 'iron'); tint(x, base, W, H0, Dd); if (p.ghost) dash(x, base, W0, H0, D0);
        dl(x + W0 + D0 * .3, base - H0 - D0 * .225, 1, 0, W - W0, RC, 'ΔL الطول'); const k = Math.hypot(.6, .45); dl(x + W0 * .4 + D0 * .6, base - H0 - D0 * .45, .6 / k, -.45 / k, (Dd - D0) * k, DC, 'ΔL العرض'); }
      // 3) cube — volume (all three grow)
      { const W0 = 112 * u, x = D.cols[2] - W0 * .95, W = W0 * f; K.box(ctx, x, base, W, W, W, 'iron'); tint(x, base, W, W, W); if (p.ghost) dash(x, base, W0, W0, W0);
        dl(x + W0 + W0 * .3, base - W0 * .5 - W0 * .22, 1, 0, W - W0, RC, 'ΔL الطول'); const k = Math.hypot(.6, .45); dl(x + W0 * .3 + W0 * .6, base - W0 - W0 * .45, .6 / k, -.45 / k, (W - W0) * k, DC, 'ΔL العرض'); dl(x + W0 * .35, base - W0, 0, -1, W - W0, HC, 'ΔL الارتفاع'); }
      Q.forEach(A => dl0(...A));
      if (p.labels) { const ty = g.h * .2; [['تمدد طولي', 'بُعد واحد: يزداد الطول', `L: 10.000 → ${(10 * (1 + A_FE * (S.T - 25))).toFixed(3)} cm`], ['تمدد سطحي', 'بُعدان: الطول والعرض', `A: 100.00 → ${(100 * (1 + A_FE * (S.T - 25)) ** 2).toFixed(2)} cm²`], ['تمدد حجمي', 'ثلاثة أبعاد: الطول والعرض والارتفاع', `V: 1000.0 → ${(1000 * (1 + A_FE * (S.T - 25)) ** 3).toFixed(1)} cm³`]].forEach((r, i) => {
        const x = D.cols[i], cwid = Math.min(D.cw - 8, 220); C5.card(ctx, x - cwid / 2, ty - 26, cwid, 78, ['#0369a1', '#7c3aed', '#b45309'][i]); G.text(ctx, r[0], x, ty - 8, { s: 15, w: 900, c: ['#0369a1', '#7c3aed', '#b45309'][i] }); G.text(ctx, r[1], x, ty + 14, { s: 11, c: '#334155' }); G.text(ctx, r[2], x, ty + 36, { s: 11, c: '#0f172a', mono: 1, w: 800 }); });
        K.tag(ctx, `مكبّر للتوضيح (×${EXV}) — درجة الحرارة ${Math.round(S.T)} °C`, (D.x0 + D.x1) / 2, g.h * .2 + 76, { s: 12.5, bg: S.T > 60 ? '#dc2626' : '#0f766e' });
        if (p.ghost) G.text(ctx, '- - - الشكل الأصلي (بارد)', D.x0 + 80, base + 26, { s: 11, w: 800, c: '#fff', bg: 'rgba(15,23,42,.75)' }); }
    },
    drags(S) {
      const p = S.p, g = geo(S), L = C5.tabsDrag(S, 'mode', g.w - 14, 12, MODES, { bw: 128 });
      const knob = (x, y, r) => ({ id: 'knob', x, y, r, cx: x, cy: y, tip: 'أدر المقبض لزيادة التسخين (أو استعمل عجلة الفأرة)', idle: 'أدر المقبض لتسخين ✋', drag: (S, d) => setParam(S, 'pw', S.p.pw + (d.dang || 0) / (Math.PI * 1.5) - (d.dy || 0) / 160), wheel: (S, s) => setParam(S, 'pw', S.p.pw + s * .05) });
      if (p.mode === 'wires') { const W = this.wiresGeo(g); L.push(knob(W.knx, W.kny, 24)); }
      if (p.mode === 'dims') { const D = this.dimsGeo(g); L.push(knob(D.kx, D.ky, 22)); }
      if (p.mode === 'strip') { const s = stripGeo(S, g);
        L.push({ id: 'burner', x: g.bx, y: s.y0 + 150 + 30, w: 60, h: 80, axis: 'x', tip: 'اسحب المصدر الحراري تحت الشريط', idle: 'اسحب اللهب تحت الشريط ✋', drag: (S, d) => { S.bxf = clamp((d.ox + d.x - d.sx) / g.w, .1, .92); } });
        L.push({ id: 'contact', x: s.x0 + s.L - 10, y: s.cy, r: 16, axis: 'y', hint: false, tip: 'اسحب نقطة التماس لأعلى أو لأسفل', drag: (S, d) => { S.cgap = clamp(d.oy + d.y - d.sy - s.y0, 18, 170); } });
        L.push({ id: 'flip', x: s.x0 - 19, y: s.y0, r: 24, hint: false, tip: 'انقر لقلب الشريط', click: S => setParam(S, 'top', S.p.top === 'lead' ? 'cu' : 'lead') }); }
      return L;
    },
    readings(S) { const p = S.p, dT = S.T - C5.T0; if (p.mode === 'wires') return [rd('درجة حرارة السلكين', Math.round(S.T) + ' °C'), rd('زيادة طول الرصاص', (A_PB * L0 * dT).toFixed(2) + ' mm'), rd('زيادة طول النحاس', (A_CU * L0 * dT).toFixed(2) + ' mm'), rd('الأكثر تمدداً', dT > 5 ? 'الرصاص' : '—', 1)];
      if (p.mode === 'strip') { const g = geo(S), s = stripGeo(S, g), P = stripPts(S, s); return [rd('درجة حرارة الشريط', Math.round(S.T) + ' °C'), rd('انحراف طرف الشريط', ((P[P.length - 1][1] - s.y0) / s.L * 150).toFixed(0) + ' mm'), rd('الجرس', touching(S) ? 'يرن 🔔' : 'صامت', 1)]; }
      const k = 1 + A_FE * dT; return [rd('درجة الحرارة', Math.round(S.T) + ' °C'), rd('طول القضيب', (10 * k).toFixed(3) + ' cm'), rd('مساحة الصفيحة', (100 * k * k).toFixed(2) + ' cm²'), rd('حجم المكعب', (1000 * k ** 3).toFixed(1) + ' cm³')]; },
    explain(S) { const p = S.p; if (p.mode === 'wires') return S.T > 40 ? 'السلكان لهما الطول نفسه وسُخّنا بالدرجة نفسها، لكن <b>الرصاص تمدد أكثر من النحاس</b>. إذن التمدد الطولي يعتمد على <b>نوع المادة</b>.' : 'أدر مقبض المصدر الحراري لتسخين سلكي الرصاص والنحاس معاً.';
      if (p.mode === 'strip') return S.T > 40 ? `الرصاص يتمدد أكثر من النحاس، وبما أنهما ملتصقان فإن الشريط <b>ينحني</b> ويكون ${p.top === 'lead' ? 'الرصاص' : 'الرصاص'} في <b>الجهة الخارجية</b> للانحناء.` : 'الشريط المزدوج مستقيم وهو بارد. اسحب اللهب تحته.';
      return 'عند التسخين يتمدد الجسم في أبعاده الثلاثة: <b>الطولي</b> زيادة في الطول، <b>السطحي</b> زيادة في المساحة، <b>الحجمي</b> زيادة في الحجم.'; },
    quiz: [
      { q: 'لا يعتمد مقدار التمدد الطولي للجسم الصلب على:', o: ['نوع المادة', 'كتلة الجسم', 'درجة حرارته'], a: 1, why: 'يعتمد على الطول الأصلي ودرجة الحرارة ونوع المادة (مراجعة الفصل ص 88).' },
      { q: 'سلكان متساويان في الطول والقطر من النحاس والرصاص سُخّنا بالدرجة نفسها. أيهما يزداد طوله أكثر؟', o: ['النحاس', 'الرصاص', 'يتساويان'], a: 1, why: 'الزيادة في سلك الرصاص أكبر من سلك النحاس (ص 77).' },
      { q: 'ماذا تسمى الزيادة الحاصلة في مساحة سطح الجسم الصلب بارتفاع درجة حرارته؟', o: ['التمدد الطولي', 'التمدد الحجمي', 'التمدد السطحي'], a: 2, why: 'سطوح الأجسام الصلبة تتمدد ببعدين: تمدد سطحي (ص 77).' }
    ]
  });
})();

/* =====================================================================
   4) تمدد السوائل وشذوذ الماء (ص 77–78)
   ===================================================================== */
(function () {
  const MODES = [['flask', 'الدورق والأنبوبة'], ['oil', 'الزيت والماء'], ['anom', 'شذوذ الماء (البحيرة)']];
  const V0 = 250, A_G = 2.7e-5, B_OIL = 7e-4, NL = 12;
  const geo = S => { const w = S.W, h = S.H, by = h * .86; const cold = { x: Math.max(200, w * .3), yb: by, w: 190, h: 130, T: C5.T0 }, hot = { x: w * .7, yb: by - 86, w: 190, h: 130, T: S.p.Th };
    const fx = S.fxf * w; const near = [cold, hot].find(b => Math.abs(fx - b.x) < 70); return { w, h, by, cold, hot, fx, near }; };
  const dVl = (S, k, T) => (S.p.mode === 'oil' && k === 1) ? V0 * B_OIL * (T - C5.T0) : V0 * (C5.rhoW(C5.T0) / C5.rhoW(T) - 1);
  const level = (S, k) => 5 + (dVl(S, k, S.Tl[k]) - V0 * A_G * (S.Tg[k] - C5.T0)) / (S.p.mode === 'oil' ? .4 : .2);
  const colOf = (S, k) => (S.p.mode === 'oil' && k === 1) ? '#eab308' : '#3b82f6';
  const lakeG = S => { const w = S.W, h = S.H; const x0 = 172, x1 = w - 20, top = h * .36, bot = h * .9; return { x0, x1, top, bot, lh: (bot - top) / NL }; };
  X7({ id: 'g7_liquid_exp', ch: 15, sec: 'الدرس 1', page: 78, kind: 'نشاط', title: 'تمدد السوائل وشذوذ الماء',
    desc: 'دورق مملوء بالماء فيه أنبوبة رفيعة نضعه في ماء ساخن: ينخفض مستوى الماء أولاً ثم يرتفع. الزيت يتمدد أكثر من الماء. والماء يشذ بين 0 °C و 4 °C فتبقى الأسماك حية تحت الجليد.',
    tags: 'تمدد السوائل دورق أنبوبة زيت ماء شذوذ الماء 4 درجات بحيرة جليد كثافة',
    tools: ['دورق زجاجي', 'أنبوبة رفيعة مدرّجة وسدادة', 'حوض ماء بارد وحوض ماء ساخن', 'مصدر حراري', 'زيت وماء ملوّن', 'محرار'],
    steps: ['املأ الدورق بالماء حتى فوهته (جاهز)، واسحب «الحلقة المطاطية» على الأنبوبة لتعلّم مستوى الماء.', 'اسحب الدورق من حوض الماء البارد إلى حوض الماء الساخن. راقب المستوى في الأنبوبة: ماذا يحدث أولاً؟ وماذا يحدث بعد ذلك؟', 'أرجع الدورق إلى الماء البارد ولاحظ المستوى.', 'اختر «الزيت والماء» وضع الدورقين معاً في الماء الساخن: أيهما يتمدد أكثر؟', 'اختر «شذوذ الماء» واسحب محرار الجو إلى ما تحت الصفر (شتاء). راقب درجات حرارة طبقات البحيرة.', 'اسحب مجسّ المحرار إلى قاع البحيرة: كم درجة حرارة الماء حول الأسماك؟'],
    concl: ['في بداية التسخين ينخفض مستوى الماء في الأنبوبة بسبب تمدد الدورق أولاً، ثم يرتفع لأن الماء يسخن ويتمدد.', 'يزداد حجم السائل بارتفاع درجة حرارته (تمدد حجمي) ويختلف مقدار التمدد باختلاف نوع السائل: الزيت أكثر تمدداً من الماء.', 'يشذ الماء بين 0 °C و 4 °C: عند انخفاض درجة حرارته عن 4 °C يتمدد وتقل كثافته بدلاً من أن يتقلص.', 'لذلك تتجمد سطوح البحيرات بينما يبقى الماء تحتها سائلاً بدرجة 4 °C فتحافظ على حياة الكائنات الحية.'],
    laws: ['g7_expand'],
    fact: ['عند وضع المحرار في سائل ساخن ينخفض قليلاً في البداية ثم يرتفع — لأن زجاجه يسخن ويتمدد أولاً (ص 78).', 'أكبر كثافة للماء عند 4 °C (نحو 1000 kg/m³)، وكثافة الجليد 917 kg/m³ فقط، لذلك يطفو الجليد.', 'قنينة ماء زجاجية مملوءة تماماً قد تنكسر في المجمّدة، لأن الماء يتمدد عند تجمّده!'],
    controls: [
      SEL('mode', 'المشهد', MODES, 'flask', (v, S) => { S.Tg = [C5.T0, C5.T0]; S.Tl = [C5.T0, C5.T0]; S.fxf = .3; S.hL = []; S.hO = []; }),
      R('Th', 'درجة حرارة الماء الساخن', 40, 90, 70, 5, '°C'),
      R('Tair', 'درجة حرارة الجو (البحيرة)', -15, 20, 15, 1, '°C'),
      BT('', [{ t: '⟲ إعادة البحيرة إلى الخريف (15 °C)', on: S => { S.lake = new Array(NL).fill(15); S.ice = 0; setParam(S, 'Tair', 15); } }]),
      TG('parts', 'الجزيئات (عدسة مكبّرة)', true, null, 'atom'), TG('labels', 'القيم ودرجات الحرارة', true, null, 'labels'),
      TG('conv', 'حركة الماء الأكثف إلى الأسفل', true, null, 'velocity'), TG('graph', 'منحني الكثافة ودرجة الحرارة', true, null, 'graph')],
    setup(S) { S.Tg = [C5.T0, C5.T0]; S.Tl = [C5.T0, C5.T0]; S.fxf = .3; S.fy = 0; S.mark = 5; S.lake = new Array(NL).fill(15); S.ice = 0; S.sink = new Array(NL).fill(-9); S.probe = .55; S.hL = []; S.hO = []; S.cheered = false; S.minL = 5; },
    update(S, dt) {
      const p = S.p;
      if (p.mode !== 'anom') { const g = geo(S); const Tb = g.near ? g.near.T : C5.T0; const tgt = g.near ? 1 : 0; S.fy += (tgt - S.fy) * Math.min(1, dt * 5);
        for (let k = 0; k < 2; k++) { const eff = S.fy > .8 ? Tb : C5.T0 + (Tb - C5.T0) * 0; S.Tg[k] += (eff - S.Tg[k]) * Math.min(1, dt / .8); S.Tl[k] += (S.Tg[k] - S.Tl[k]) * Math.min(1, dt / 5); }
        hist(S, 'hL', +level(S, 0).toFixed(3), 600); if (p.mode === 'oil') hist(S, 'hO', +level(S, 1).toFixed(3), 600);
        const L0 = level(S, 0); S.minL = Math.min(S.minL, L0); if (!S.cheered && L0 > 12 && S.minL < 4.95) { S.cheered = true; K.cheer(S, g.fx, g.h * .3); } return; }
      // lake
      const T = S.lake, a = p.Tair, n = Math.max(1, Math.round(dt / .02)), d = dt / n;
      for (let s = 0; s < n; s++) {
        if (S.ice <= .001) { T[0] += (a - T[0]) * .8 * d; if (T[0] < 0) { S.ice += -T[0] * .012; T[0] = 0; } }
        else { if (a < 0) { S.ice += (-a) / (1 + S.ice * 18) * .006 * d * 60 / 60; T[0] += (0 - T[0]) * 2 * d; } else { S.ice = Math.max(0, S.ice - a * .004 * d); T[0] += (.1 - T[0]) * d; } }
        S.ice = clamp(S.ice, 0, .28);
        const nT = T.slice(); for (let i = 1; i < NL - 1; i++) nT[i] += .25 * (T[i - 1] + T[i + 1] - 2 * T[i]) * d; nT[NL - 1] += .25 * (T[NL - 2] - T[NL - 1]) * d; nT[0] += .25 * (T[1] - T[0]) * d; for (let i = 0; i < NL; i++) T[i] = nT[i];
        for (let i = 0; i < NL - 1; i++) if (C5.rhoW(Math.max(0, T[i])) > C5.rhoW(Math.max(0, T[i + 1])) + 1e-4) { const m = (T[i] + T[i + 1]) / 2; if (Math.abs(T[i] - T[i + 1]) > .08) S.sink[i] = S.t; T[i] = T[i + 1] = m; }
      }
      hist(S, 'hL', +T[0].toFixed(2), 600); hist(S, 'hO', +T[NL - 1].toFixed(2), 600);
      if (!S.cheered && S.ice > .03 && Math.abs(T[NL - 1] - 4) < .4) { S.cheered = true; K.cheer(S, S.W * .6, S.H * .5); }
    },
    draw(ctx, w, h, S) {
      const p = S.p; const anom = p.mode === 'anom';
      K.bg(ctx, w, h, anom ? { benchY: h, bench: false, tiles: false, top: p.Tair < 0 ? '#cbd5e1' : '#bae6fd', bottom: p.Tair < 0 ? '#f1f5f9' : '#e0f2fe' } : { benchY: h * .86 });
      K.raw(ctx, () => { if (anom) this.drawLake(ctx, S, w, h); else this.drawFlask(ctx, S, w, h); C5.tabs(ctx, S, 'mode', w - 14, 12, MODES, { bw: 140 }); K.party(ctx, S); });
    },
    unit(ctx, S, k, cx, cy, R, tubeH) {
      const lvl = level(S, k), perCm = tubeH / 32, nw = R * .34, ny = cy - R - R * .55, col = colOf(S, k);
      C5.flask(ctx, cx, cy, R, nw, ny, { fill: col === '#eab308' ? 'rgba(234,179,8,.55)' : 'rgba(59,130,246,.45)' });
      ctx.fillStyle = '#374151'; rr(ctx, cx - nw / 2 - 4, ny - 16, nw + 8, 18, 4); ctx.fill();
      const tx = cx, ttop = ny - 16 - tubeH; ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fillRect(tx - 5, ttop, 10, tubeH + 20); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.4; ctx.strokeRect(tx - 5, ttop, 10, tubeH + 20);
      const lv = clamp(lvl, 0, 32), ly = ny - 16 - lv * perCm; ctx.fillStyle = col; ctx.fillRect(tx - 3.5, ly, 7, ny - ly + 4);
      for (let c = 0; c <= 30; c += 2) { const yy = ny - 16 - c * perCm; ctx.strokeStyle = '#334155'; ctx.lineWidth = c % 10 ? .8 : 1.6; ctx.beginPath(); ctx.moveTo(tx + 5, yy); ctx.lineTo(tx + (c % 10 ? 10 : 15), yy); ctx.stroke(); if (!(c % 10)) G.text(ctx, String(c), tx + 25, yy, { s: 10, c: '#334155', mono: 1 }); }
      if (lvl > 32) { const ph = (S.t * 1.5) % 1; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(tx + 8 + ph * 10, ttop + ph * ph * 140, 3.5, 0, TAU); ctx.fill(); G.text(ctx, 'فاض الماء!', tx, ttop - 14, { s: 12, w: 900, c: '#dc2626' }); }
      return { tx, ly, ny, perCm, ttop, lvl };
    },
    drawFlask(ctx, S, w, h) {
      const p = S.p, g = geo(S), oil = p.mode === 'oil';
      // baths
      const bath = (b, lab, hot) => { if (hot) { ctx.strokeStyle = '#475569'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(b.x - 70, b.yb); ctx.lineTo(b.x - 86, g.by); ctx.moveTo(b.x + 70, b.yb); ctx.lineTo(b.x + 86, g.by); ctx.stroke(); ctx.fillStyle = '#475569'; ctx.fillRect(b.x - 80, b.yb, 160, 6); K.burner(ctx, b.x, g.by - 44, .8, S.t); }
        K.beaker(ctx, b.x, b.yb, b.w, b.h, .72, { liq: hot ? '#fb923c' : '#60a5fa', liqA: .45 }); if (hot) C5.steam(ctx, b.x, b.yb - b.h * .72, b.w * .7, S.t, .5, '255,255,255');
        K.tag(ctx, lab, hot ? b.x + b.w / 2 + 48 : b.x, hot ? b.yb - b.h * .4 : b.yb - 16, { s: 12, bg: hot ? '#ea580c' : '#0369a1' }); };
      bath(g.cold, `ماء بارد ${C5.T0} °C`, 0); bath(g.hot, `ماء ساخن ${p.Th} °C`, 1);
      // flask(s) held by a clamp bar
      const R = oil ? 46 : 58, b = g.near || null; const yIn = b ? b.yb - b.h * .72 + R * .1 + (1 - 0) * R * .7 : 0; const yUp = Math.min(g.cold.yb, g.hot.yb) - g.hot.h - R - 40;
      const cy = b ? lerp(yUp, yIn, S.fy) : yUp; const tubeH = h * .3; const xs = oil ? [g.fx - 60, g.fx + 60] : [g.fx];
      const ny0 = cy - R - R * .55, hy = ny0 + 8, hx = xs[0] - R * .34 - 90; ctx.strokeStyle = '#475569'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hx + 40, hy); ctx.lineTo(xs[xs.length - 1], hy); ctx.stroke(); ctx.lineCap = 'butt';
      C5.handle(ctx, hx + 44, hy, hx - 20, hy - 34, { hl: 58 }); G.text(ctx, 'اسحبني', hx - 4, hy - 56, { s: 11, w: 900, c: '#fff', bg: '#b45309' });
      const U = xs.map((x, k) => { const u = this.unit(ctx, S, k, x, cy, R, tubeH); ctx.fillStyle = '#334155'; rr(ctx, x - R * .17 - 6, hy - 7, R * .34 + 12, 14, 4); ctx.fill(); return u; });
      // rubber marker (flask mode)
      const u0 = U[0], my = u0.ny - 16 - S.mark * u0.perCm; ctx.fillStyle = '#dc2626'; rr(ctx, u0.tx - 11, my - 4, 22, 8, 3); ctx.fill(); if (p.labels) G.text(ctx, 'علامة', u0.tx - 32, my, { s: 10.5, w: 800, c: '#dc2626' });
      if (p.labels) { U.forEach((u, k) => { K.tag(ctx, `${oil ? (k ? 'زيت' : 'ماء') : 'المستوى'}: ${u.lvl.toFixed(1)} cm`, xs[k] + (oil ? (k ? 70 : -70) : 90), u.ly, { s: 12, bg: colOf(S, k) === '#eab308' ? '#a16207' : '#1d4ed8' }); });
        C5.card(ctx, 80, 56, 250, 70, '#0369a1'); G.text(ctx, `حرارة الزجاج: ${Math.round(S.Tg[0])} °C`, 205, 76, { s: 12.5, w: 800, c: '#334155' }); G.text(ctx, `حرارة ${oil ? 'السائلين' : 'الماء'}: ${Math.round(S.Tl[0])} °C`, 205, 102, { s: 12.5, w: 800, c: '#1d4ed8' }); }
      const dip = level(S, 0) < S.mark - .15 && S.Tg[0] - S.Tl[0] > 3;
      if (dip) K.bubble(ctx, 'انخفض المستوى أولاً! الزجاج سخن وتمدد قبل الماء', u0.tx + 10, u0.ly - 10, { s: 13 });
      else if (level(S, 0) > S.mark + 3) K.bubble(ctx, oil ? 'الزيت ارتفع أكثر من الماء — الزيت أكثر تمدداً' : 'ارتفع الماء: الماء سخن وتمدد', u0.tx + 10, Math.min(u0.ly, U[U.length - 1].ly) - 10, { s: 13 });
      if (p.parts) { const Rr = 44, lx = w - 90, ly = h * .3; K.lens(ctx, lx, ly, Rr, () => { ctx.fillStyle = '#eff6ff'; ctx.fillRect(lx - Rr, ly - Rr, 2 * Rr, 2 * Rr); const T = S.Tl[0], sp = 1 + (T - 25) / 120; for (let i = 0; i < 14; i++) { const a = i * 2.39996, r = Math.sqrt(i + .5) / Math.sqrt(14) * Rr * .8 * sp; K.ball(ctx, lx + Math.cos(a + S.t * (.5 + T / 60) * (i % 2 ? 1 : -1)) * r, ly + Math.sin(a + S.t * (.6 + T / 60)) * r, 6, '#3b82f6'); } }); G.text(ctx, 'جزيئات الماء', lx, ly - Rr - 12, { s: 11.5, w: 900, c: '#fff', bg: '#1d4ed8' }); }
    },
    drawLake(ctx, S, w, h) {
      const p = S.p, L = lakeG(S), T = S.lake;
      if (p.Tair < 0) C5.snow(ctx, w, L.top, S.t, 40, clamp(-p.Tair / 10, .3, 1)); else if (p.Tair > 12) C5.sun(ctx, w * .5, h * .13, 22, S.t);
      ctx.fillStyle = p.Tair < 0 ? '#f8fafc' : '#86efac'; ctx.fillRect(0, L.top - 16, w, 18); ctx.fillStyle = '#92400e'; ctx.fillRect(0, L.bot, w, h - L.bot);
      const tc = t => { const k = clamp(t / 16, 0, 1); return `rgb(${Math.round(30 + 60 * k)},${Math.round(120 + 70 * k)},${Math.round(230 - 60 * k)})`; };
      for (let i = 0; i < NL; i++) { ctx.fillStyle = Math.abs(T[i] - 4) < .35 ? '#1e3a8a' : tc(T[i]); ctx.fillRect(L.x0, L.top + i * L.lh, L.x1 - L.x0, L.lh + 1); }
      ctx.fillStyle = 'rgba(255,255,255,.08)'; for (let i = 0; i < NL; i += 2) ctx.fillRect(L.x0, L.top + i * L.lh, L.x1 - L.x0, L.lh);
      // ice
      if (S.ice > .001) { const ih = S.ice / .28 * L.lh * 2 + 4; const gi = ctx.createLinearGradient(0, L.top - 6, 0, L.top + ih); gi.addColorStop(0, '#ffffff'); gi.addColorStop(1, '#bae6fd'); ctx.fillStyle = gi; ctx.fillRect(L.x0 - 6, L.top - 6, L.x1 - L.x0 + 12, ih + 6); ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.5; ctx.strokeRect(L.x0 - 6, L.top - 6, L.x1 - L.x0 + 12, ih + 6); G.text(ctx, 'جليد (يطفو لأن كثافته أقل)', (L.x0 + L.x1) / 2 - 60, L.top + ih / 2 - 2, { s: 12, w: 900, c: '#0c4a6e' }); }
      // plants + fish
      for (let x = L.x0 + 20; x < L.x1; x += 70) { ctx.strokeStyle = '#15803d'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, L.bot); ctx.quadraticCurveTo(x + Math.sin(S.t + x) * 8, L.bot - 30, x + 4, L.bot - 50); ctx.stroke(); }
      [[.3, .82, '#f97316'], [.6, .9, '#facc15'], [.8, .78, '#ef4444']].forEach(([fx, fy, c], i) => { const x = L.x0 + 30 + (L.x1 - L.x0 - 60) * ((((fx + S.t * .03 * (i % 2 ? 1 : -1)) % 1) + 1) % 1), y = L.top + (L.bot - L.top) * fy + Math.sin(S.t * 2 + i) * 4, dir = i % 2 ? 1 : -1; ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1); ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(0, 0, 16, 8, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(-26, -8); ctx.lineTo(-26, 8); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(8, -2, 2, 0, TAU); ctx.fill(); ctx.restore(); });
      // convection arrows
      if (p.conv) for (let i = 0; i < NL - 1; i++) if (S.t - S.sink[i] < .25) { const x = L.x0 + 60 + (i * 97) % (L.x1 - L.x0 - 140); K.force(ctx, x, L.top + i * L.lh + 4, 0, L.lh * 1.6, null, '#e0f2fe', 4); }
      if (p.conv && T.some((t, i) => S.t - S.sink[i] < .25)) G.text(ctx, '⬇ الماء الأكثف يهبط إلى القاع', (L.x0 + L.x1) / 2 + 80, L.top + 20, { s: 12, w: 900, c: '#fff', bg: 'rgba(30,58,138,.85)' });
      // labels per layer
      if (p.labels) for (let i = 0; i < NL; i += 1) if (!(S.ice > .001 && (i + .5) * L.lh < S.ice / .28 * L.lh * 2 + 4)) G.text(ctx, T[i].toFixed(1) + '°', L.x1 - 8, L.top + (i + .5) * L.lh, { s: 10.5, w: 800, c: '#fff', a: 'right', mono: 1 });
      // probe thermometer
      const py = L.top + (L.bot - L.top) * S.probe, pxx = L.x0 + (L.x1 - L.x0) * .45, i = clamp(Math.floor((py - L.top) / L.lh), 0, NL - 1), Tp = S.ice > .001 && py < L.top + S.ice / .28 * L.lh * 2 + 4 ? Math.min(0, p.Tair / 2) : T[i];
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(pxx, L.top - 60); ctx.lineTo(pxx, py); ctx.stroke(); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(pxx, py, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      K.tag(ctx, `المحرار: ${Tp.toFixed(1)} °C`, pxx + 2, L.top - 76, { s: 13, bg: '#dc2626' });
      if (T[NL - 1] > 3.6 && T[NL - 1] < 4.4 && S.ice > .001) K.bubble(ctx, 'نحن بخير هنا في 4 °C 🐟', L.x0 + (L.x1 - L.x0) * .72, L.bot - 70, { s: 13 });
      // density graph
      if (p.graph) { const pts = []; for (let t = 0; t <= 14; t += .25) pts.push([t, C5.rhoW(t)]); const G2 = C5.graph(ctx, w - 280, 52, 262, 150, { x0: 0, x1: 14, y0: 999.2, y1: 1000.05, xt: [0, 2, 4, 6, 8, 10, 12, 14], yt: [999.4, 999.6, 999.8, 1000], xl: 'درجة الحرارة (°C)', yl: 'الكثافة kg/m³', title: 'كثافة الماء أكبر ما يمكن عند 4 °C', series: [{ pts, col: '#1d4ed8' }] });
        ctx.strokeStyle = '#dc2626'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(G2.X(4), G2.T); ctx.lineTo(G2.X(4), G2.B); ctx.stroke(); ctx.setLineDash([]); const tp = clamp(Tp, 0, 14); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(G2.X(tp), G2.Y(C5.rhoW(tp)), 5, 0, TAU); ctx.fill(); }
      C5.tSlider(ctx, 104, h * .2, h * .66, p.Tair, -15, 20, { label: 'حرارة الجو', step: 5, bd: p.Tair < 0 ? '#2563eb' : '#0284c7' });
    },
    drags(S) {
      const p = S.p, w = S.W, h = S.H; const L = C5.tabsDrag(S, 'mode', w - 14, 12, MODES, { bw: 140 });
      if (p.mode === 'anom') { const G2 = lakeG(S); L.push(C5.tSliderDrag(S, 'Tair', 104, h * .2, h * .66, -15, 20, { tip: 'اسحب لتغيير درجة حرارة الجو', idle: 'اسحب المحرار إلى الشتاء ❄ ✋' }));
        L.push({ id: 'probe', x: G2.x0 + (G2.x1 - G2.x0) * .45, y: G2.top + (G2.bot - G2.top) * S.probe, r: 16, axis: 'y', hint: false, tip: 'اسحب المجسّ إلى أي عمق', drag: (S, d) => { const G3 = lakeG(S); S.probe = clamp((d.oy + d.y - d.sy - G3.top) / (G3.bot - G3.top), .02, .97); } }); return L; }
      const g = geo(S), R = p.mode === 'oil' ? 46 : 58, b = g.near; const yIn = b ? b.yb - b.h * .72 + R * .1 + R * .7 : 0; const yUp = Math.min(g.cold.yb, g.hot.yb) - g.hot.h - R - 40; const cy = b ? lerp(yUp, yIn, S.fy) : yUp; const tubeH = h * .3; const hx = (p.mode === 'oil' ? g.fx - 60 : g.fx) - R * .34 - 90, hy = cy - R - R * .55 + 8;
      L.push({ id: 'flask', x: hx - 4, y: hy - 26, w: 70, h: 40, axis: 'x', tip: 'اسحب الدورق بين الماء البارد والماء الساخن', idle: 'اسحب الدورق إلى الماء الساخن ✋', drag: (S, d) => { S.fxf = clamp((d.ox + 4 + R * .34 + 90 + (S.p.mode === 'oil' ? 60 : 0) + d.x - d.sx) / S.W, .15, .9); }, up: S => { const g = geo(S); [g.cold, g.hot].forEach(b => { if (Math.abs(g.fx - b.x) < 110) S.fxf = b.x / S.W; }); } });
      const ny = cy - R - R * .55, perCm = tubeH / 32, my = ny - 16 - S.mark * perCm; const tx = p.mode === 'oil' ? g.fx - 60 : g.fx;
      L.push({ id: 'marker', x: tx, y: my, w: 26, h: 14, axis: 'y', hint: false, tip: 'اسحب العلامة المطاطية إلى مستوى الماء', drag: (S, d) => { S.mark = clamp((ny - 16 - (d.oy + d.y - d.sy)) / perCm, 0, 32); } });
      return L;
    },
    live: { title: 'منحني تغيّر المستوى / درجات حرارة البحيرة', data: S => S.p.mode === 'anom' ? { series: [{ pts: S.hL || [], color: '#0ea5e9', name: 'سطح البحيرة °C' }, { pts: S.hO || [], color: '#1e3a8a', name: 'قاع البحيرة °C' }], opts: { xl: 't (s)', y0zero: false } } : { series: [{ pts: S.hL || [], color: '#2563eb', name: 'مستوى الماء cm' }].concat(S.p.mode === 'oil' ? [{ pts: S.hO || [], color: '#ca8a04', name: 'مستوى الزيت cm' }] : []), opts: { xl: 't (s)', y0zero: false } } },
    readings(S) { const p = S.p; if (p.mode === 'anom') return [rd('درجة حرارة الجو', p.Tair + ' °C'), rd('سطح البحيرة', S.lake[0].toFixed(1) + ' °C'), rd('قاع البحيرة', S.lake[NL - 1].toFixed(1) + ' °C'), rd('سُمك الجليد', (S.ice * 100).toFixed(0) + ' cm')];
      const r = [rd('حرارة الزجاج', Math.round(S.Tg[0]) + ' °C'), rd('حرارة السائل', Math.round(S.Tl[0]) + ' °C'), rd('مستوى الماء في الأنبوبة', level(S, 0).toFixed(2) + ' cm')]; if (p.mode === 'oil') r.push(rd('مستوى الزيت في الأنبوبة', level(S, 1).toFixed(2) + ' cm')); return r; },
    explain(S) { const p = S.p; if (p.mode === 'anom') { if (S.ice > .001) return 'تجمّد سطح البحيرة، لكن الماء تحت الجليد بقي <b>سائلاً</b>، وفي القاع درجة حرارته قريبة من <b>4 °C</b> لأن الماء عند 4 °C هو الأكثف فيبقى في الأسفل. هذا هو <b>شذوذ الماء</b>.'; if (p.Tair < 4) return 'يبرد سطح البحيرة ويصبح أكثف فيهبط إلى الأسفل، حتى يصبح الماء كله قريباً من 4 °C. بعدها يبقى الماء الأبرد (أقل من 4 °C) في الأعلى لأنه أقل كثافة.'; return 'اسحب محرار الجو إلى ما تحت الصفر لترى كيف تتجمد البحيرة من الأعلى.'; }
      const L0 = level(S, 0); if (S.Tg[0] - S.Tl[0] > 3 && L0 < 5) return 'الزجاج يسخن أولاً <b>فيتمدد الدورق</b> ويتسع، لذلك <b>ينخفض</b> مستوى الماء في الأنبوبة قليلاً.'; if (L0 > 6) return `سخن ${p.mode === 'oil' ? 'السائلان' : 'الماء'} و<b>تمدد</b> فارتفع المستوى في الأنبوبة. ${p.mode === 'oil' ? 'لاحظ أن <b>الزيت أكثر تمدداً من الماء</b>.' : ''}`; return 'الدورق في الماء البارد. اسحبه إلى الحوض الساخن وراقب مستوى الماء في الأنبوبة.'; },
    quiz: [
      { q: 'ما الذي يحصل لحجم السائل عند زيادة درجة حرارته؟', o: ['يقل', 'يزداد', 'لا يتغير'], a: 1, why: 'يتمدد السائل تمدداً حجمياً لازدياد الطاقة الحركية لجزيئاته (ص 77).' },
      { q: 'عند وضع المحرار في سائل ساخن ينخفض قليلاً في البداية ثم يرتفع. السبب:', o: ['زجاج المحرار يسخن ويتمدد أولاً', 'السائل يتقلص أولاً', 'الزئبق يتجمد'], a: 0, why: 'مثل الدورق: يتمدد الزجاج أولاً ثم يسخن السائل ويتمدد (ص 78).' },
      { q: 'عند تبريد الماء من 4 °C إلى 0 °C فإنه:', o: ['يتقلص كباقي السوائل', 'لا يتغير حجمه', 'يتمدد وتقل كثافته'], a: 2, why: 'هذا هو شذوذ الماء، ولهذا تبقى الأحياء المائية حية تحت الجليد (ص 78).' }
    ]
  });
})();

/* =====================================================================
   5) تمدد الغازات: البالون على الدورق، المنطاد، البالون تحت أشعة الشمس (ص 75، 78–79)
   ===================================================================== */
(function () {
  const MODES = [['flask', 'البالون والدورق'], ['hot', 'المنطاد'], ['sun', 'بالون تحت الشمس']];
  const VF = 500; // cm³
  const NP = 46;
  const geo = S => { const w = S.W, h = S.H, by = h * .84; const hotB = { x: Math.max(210, w * .3), T: 70, name: 'ماء ساخن 70 °C', col: '#fb923c' }, iceB = { x: w * .72, T: 0, name: 'ماء مثلج 0 °C', col: '#7dd3fc' };
    const fx = S.fxf * w; const near = [hotB, iceB].find(b => Math.abs(fx - b.x) < 60); return { w, h, by, hotB, iceB, fx, near }; };
  const Vb = S => VF * (S.Ta + 273) / 298 - VF; // balloon extra volume (cm³)
  const sunX = S => S.W * .64;
  const balVol = S => S.bl0 * (S.Tsun + 273) / 298; // L
  X7({ id: 'g7_gas_exp', ch: 15, sec: 'الدرس 1', page: 78, kind: 'نشاط', title: 'تمدد الغازات: البالون والدورق والمنطاد',
    desc: 'نضع بالوناً على فوهة دورق فارغ (فيه هواء): إذا سخّنا الدورق انتفخ البالون، وإذا برّدناه انكمش. المنطاد يرتفع عندما يسخن الهواء داخله، والبالون المنفوخ قد ينفجر تحت أشعة الشمس.',
    tags: 'تمدد الغازات هواء بالون دورق منطاد جزيئات انفجار البالون شمس',
    tools: ['دورق زجاجي فارغ', 'بالون', 'حوض ماء ساخن', 'حوض ماء مثلج'],
    steps: ['ضع البالون على فوهة الدورق (جاهز). اسحب الدورق إلى حوض الماء الساخن: ماذا يحدث للبالون؟', 'اسحب الدورق إلى حوض الماء المثلج: ماذا يحدث؟', 'انقر الدورق لتمسكه بيديك الدافئتين، وراقب البالون.', 'فعّل «جزيئات الهواء»: كيف تتغير حركتها؟', 'اختر «المنطاد» واضغط زر الشعلة لتسخين الهواء داخله: متى يرتفع؟', 'اختر «بالون تحت الشمس» واسحب البالون من الظل إلى الشمس. لماذا ينفجر؟'],
    concl: ['تتمدد الغازات بالتسخين وتتقلص بالتبريد.', 'تمدد الغازات أكبر بكثير من تمدد السوائل والصلبة لأن القوى بين جزيئات الغاز ضعيفة جداً.', 'عند التسخين تتحرك جزيئات الغاز أسرع وتتباعد فيزداد حجم الغاز.', 'يرتفع المنطاد عندما يسخن الهواء داخله فيتمدد وتقل كثافته. وتنفجر البالونات المملوءة بالغاز تحت أشعة الشمس لأن الغاز يتمدد.'],
    laws: ['g7_expand', 'g7_heat'],
    fact: ['ان تمدد المواد في الحالة الغازية أكثر بكثير من تمددها في الحالة السائلة والصلبة عند نفس درجة الحرارة (حقيقة علمية ص 77).', 'جميع الغازات لها معامل التمدد الحجمي نفسه عند ثبوت الضغط، بخلاف المواد الصلبة والسائلة (ص 78).', 'لهذا لا تُترك إطارات السيارات منفوخة بشدة في الصيف.'],
    controls: [
      SEL('mode', 'المشهد', MODES, 'flask', (v, S) => { S.Ta = C5.T0; S.fxf = .5; S.hands = false; }),
      BT('', [{ t: '🎈 بالون جديد', on: S => { S.pop = 0; S.Tsun = C5.T0; S.bl0 = 2; S.bxf = .22; } }, { t: '🔥 تشغيل / إيقاف شعلة المنطاد', on: S => { S.fire = !S.fire; } }]),
      TG('parts', 'جزيئات الهواء', true, null, 'atom'), TG('labels', 'القيم والأسماء', true, null, 'labels'), TG('arrows', 'أسهم القوى والحرارة', true, null, 'force'),
      TG('trails', 'سرعة الجزيئات وتباعدها (حار/بارد)', true, null, 'velocity')],
    setup(S) { S.Ta = C5.T0; S.fxf = .5; S.hands = false; S.fire = false; S.Ti = C5.T0; S.alt = 0; S.vy = 0; S.pop = 0; S.Tsun = C5.T0; S.bl0 = 2; S.bxf = .22; S.popT = -9; S.cheered = false;
      S.gp = Array.from({ length: NP }, (_, i) => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, a: Math.random() * TAU })); },
    update(S, dt) {
      const p = S.p;
      if (p.mode === 'flask') { const g = geo(S); const Te = S.hands ? 36 : g.near ? g.near.T : C5.T0; S.Ta += (Te - S.Ta) * Math.min(1, dt / 2.2); if (!S.cheered && Vb(S) > 55) { S.cheered = true; K.cheer(S, g.fx, g.h * .3); } }
      if (p.mode === 'hot') { S.Ti += (S.fire ? 14 : 0) * dt * clamp(1 - (S.Ti - 25) / 110, 0, 1) - (S.Ti - C5.T0) * .03 * dt; const lift = 2800 * 1.2 * (1 - 298 / (S.Ti + 273)), m = 560; const a = (lift - m) / (m + 1500) * 9.8 - S.vy * .35; S.vy += a * dt; S.alt += S.vy * dt * 3; if (S.alt <= 0) { S.alt = 0; S.vy = Math.max(0, S.vy); } if (S.alt > 400) { S.alt = 400; S.vy = Math.min(0, S.vy); } if (!S.cheered && S.alt > 40) { S.cheered = true; K.cheer(S, S.W * .5, S.H * .3); } }
      if (p.mode === 'sun' && !S.pop) { const inSun = S.bxf * S.W > sunX(S) - 60; S.Tsun += ((inSun ? 72 : C5.T0) - S.Tsun) * Math.min(1, dt / 4); if (balVol(S) > 2.24) { S.pop = 1; S.popT = S.t; if (window.Sound) Sound.noise && Sound.noise(.25, .5); } }
      const T = p.mode === 'flask' ? S.Ta : p.mode === 'hot' ? S.Ti : S.Tsun, v = p.trails !== false ? clamp(.75 * Math.exp((T - 25) / 26), .12, 3.2) : .25 + Math.sqrt((T + 273) / 298) * .9 * (1 + (T - 25) / 60); S.gv = v; S.gT = T;
      S.gp.forEach(q => { q.a += (Math.random() - .5) * .6; q.x += Math.cos(q.a) * v * dt; q.y += Math.sin(q.a) * v * dt; if (q.x < -1 || q.x > 1) { q.a = Math.PI - q.a; q.x = clamp(q.x, -1, 1); } if (q.y < -1 || q.y > 1) { q.a = -q.a; q.y = clamp(q.y, -1, 1); } });
    },
    draw(ctx, w, h, S) {
      const p = S.p; const m = p.mode;
      K.bg(ctx, w, h, m === 'flask' ? { benchY: h * .84 } : m === 'hot' ? { benchY: h, bench: false, tiles: false, top: '#7dd3fc', bottom: '#e0f2fe' } : { benchY: h * .84, tiles: false, top: '#fef3c7', bottom: '#fffbeb' });
      K.raw(ctx, () => { this['d_' + m](ctx, S, w, h); C5.tabs(ctx, S, 'mode', w - 14, 12, MODES, { bw: 128 }); K.party(ctx, S); });
    },
    /* particles inside an ellipse region */
    gas(ctx, S, cx, cy, rx, ry, n, col = '#0ea5e9', r = 4, keep = false) {
      const fx = S.p.trails !== false, T = S.gT ?? 25, sp = fx ? clamp(.66 + .34 * T / 25, .66, 1) : 1, v = S.gv || 1, c = !fx || keep ? col : T < 12 ? '#2563eb' : T < 35 ? '#0ea5e9' : T < 55 ? '#f97316' : '#ef4444', tl = clamp(v * 9, 2, 26);
      for (let i = 0; i < n; i++) { const q = S.gp[i % NP]; const x = cx + q.x * rx * sp * Math.sqrt(1 - Math.min(.9, q.y * q.y) * .3), y = cy + q.y * ry * sp;
        if (fx) { const gx = x - Math.cos(q.a) * tl, gy = y - Math.sin(q.a) * tl, gr = ctx.createLinearGradient(gx, gy, x, y); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(1, keep ? 'rgba(255,255,255,.85)' : c); ctx.strokeStyle = gr; ctx.lineWidth = r * 1.1; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(x, y); ctx.stroke(); ctx.lineCap = 'butt'; }
        K.ball(ctx, x, y, r, c); } },
    /* legend: hot = faster & more spread, cold = slower & closer */
    gasKey(ctx, S, x, y) { if (S.p.trails === false || !S.p.parts) return; const T = S.gT ?? 25, v = S.gv || 1, lvl = v > 1.6 ? 'سريعة جداً 🔥' : v > .95 ? 'سريعة' : v > .55 ? 'متوسطة' : 'بطيئة ❄'; C5.card(ctx, x, y, 240, 62, T > 35 ? '#ef4444' : T < 15 ? '#2563eb' : '#0ea5e9');
      G.text(ctx, 'سرعة الجزيئات: ' + lvl, x + 120, y + 18, { s: 12.5, w: 900, c: T > 35 ? '#b91c1c' : T < 15 ? '#1d4ed8' : '#0369a1' });
      ctx.fillStyle = '#e2e8f0'; rr(ctx, x + 20, y + 34, 200, 9, 4); ctx.fill(); const k = clamp(v / 3.2, 0, 1); const bg = ctx.createLinearGradient(x + 20, 0, x + 220, 0); bg.addColorStop(0, '#2563eb'); bg.addColorStop(.5, '#0ea5e9'); bg.addColorStop(1, '#ef4444'); ctx.fillStyle = bg; rr(ctx, x + 220 - 200 * k, y + 34, 200 * k, 9, 4); ctx.fill();
      G.text(ctx, 'ساخن: أسرع ومتباعدة · بارد: أبطأ ومتقاربة', x + 120, y + 54, { s: 10.5, w: 700, c: '#475569' }); },
    d_flask(ctx, S, w, h) {
      const p = S.p, g = geo(S);
      const basin = (b) => { K.beaker(ctx, b.x, g.by, 170, 110, .7, { liq: b.col, liqA: .5 }); if (b.T > 50) C5.steam(ctx, b.x, g.by - 80, 110, S.t, .6); if (b.T < 5) { for (let i = 0; i < 5; i++) { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.2; rr(ctx, b.x - 70 + i * 28, g.by - 78 + (i % 2) * 8, 22, 18, 4); ctx.fill(); ctx.stroke(); } } K.tag(ctx, b.name, b.x, g.by + 18, { s: 12, bg: b.T > 50 ? '#ea580c' : '#0369a1' }); };
      basin(g.hotB); basin(g.iceB);
      const R = 62, near = g.near, cy = near ? g.by - 72 : g.by - R - 2 - (S.dragF ? 50 : 0), cx = g.fx, nw = 30, ny = cy - R - 50;
      C5.flask(ctx, cx, cy, R, nw, ny, { fill: `rgba(${S.Ta > 30 ? '254,215,170' : S.Ta < 15 ? '186,230,253' : '241,245,249'},.45)` });
      if (!near && !S.hands && !S.dragF) { ctx.fillStyle = 'rgba(148,163,184,.4)'; ctx.beginPath(); ctx.ellipse(cx, g.by, R * .6, 5, 0, 0, TAU); ctx.fill(); }
      // balloon
      const v = Vb(S); const col = '#ef4444';
      if (v > 2) { const rp = 12 + 11 * Math.cbrt(v); const by = ny - 10 - rp; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(cx - nw / 2 - 2, ny + 6); ctx.quadraticCurveTo(cx - 10, ny - 8, cx - rp * .5, by + rp * .75); ctx.arc(cx, by, rp, Math.PI * .75, Math.PI * .25); ctx.quadraticCurveTo(cx + 10, ny - 8, cx + nw / 2 + 2, ny + 6); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.ellipse(cx - rp * .35, by - rp * .35, rp * .18, rp * .3, -.5, 0, TAU); ctx.fill(); S._bal = { cx, by, rp }; }
      else if (v > -6) { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(cx - nw / 2 - 2, ny + 6); ctx.quadraticCurveTo(cx - 20, ny - 30, cx + 18, ny - 34); ctx.quadraticCurveTo(cx + 36, ny - 30, cx + 24, ny - 18); ctx.quadraticCurveTo(cx + 12, ny - 8, cx + nw / 2 + 2, ny + 6); ctx.closePath(); ctx.fill(); S._bal = { cx, by: ny - 20, rp: 14 }; }
      else { const d = clamp(-v * 1.1, 0, 50); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(cx - nw / 2 + 1, ny); ctx.quadraticCurveTo(cx, ny + d * 1.4, cx + nw / 2 - 1, ny); ctx.closePath(); ctx.fill(); ctx.fillRect(cx - nw / 2 - 2, ny - 2, nw + 4, 8); S._bal = { cx, by: ny, rp: 10 }; }
      if (p.parts) { this.gas(ctx, S, cx, cy, R * .82, R * .8, Math.round(30 - clamp(v / 6, 0, 8)), '#0ea5e9', 4); if (v > 20) this.gas(ctx, S, cx, S._bal.by, S._bal.rp * .7, S._bal.rp * .7, Math.round(clamp(v / 8, 2, 14)), '#0ea5e9', 4); }
      if (p.labels) this.gasKey(ctx, S, 80, 134); else this.gasKey(ctx, S, 80, 56);
      if (S.hands) { ['#fcd9b6', '#f5c9a0'].forEach((c, i) => { const sx = i ? 1 : -1; ctx.fillStyle = c; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx + sx * (R * .78), cy + 8, 26, 44, sx * .25, 0, TAU); ctx.fill(); ctx.stroke(); }); K.tag(ctx, 'يداك دافئتان 36 °C', cx, cy + R + 22, { s: 12, bg: '#b45309' }); }
      if (p.arrows && near) { for (let k = -1; k <= 1; k++) { if (near.T > 30) C5.heatArrow(ctx, cx + k * 40, g.by - 8, cx + k * 22, cy + R * .3, S.t + k, '#f97316'); else C5.heatArrow(ctx, cx + k * 22, cy + R * .3, cx + k * 48, g.by - 8, S.t + k, '#0284c7'); } }
      if (p.labels) { C5.card(ctx, 80, 56, 240, 70, '#0369a1'); G.text(ctx, `حرارة الهواء في الدورق: ${Math.round(S.Ta)} °C`, 200, 76, { s: 12.5, w: 800, c: '#334155' }); G.text(ctx, `حجم الهواء: ${Math.round(VF + v)} cm³`, 200, 102, { s: 13, w: 900, c: '#1d4ed8' });
        K.bubble(ctx, v > 25 ? 'سخن الهواء فتمدد وانتفخ البالون 🎈' : v < -10 ? 'برد الهواء فتقلص وسُحب البالون إلى الداخل!' : 'اسحب الدورق إلى أحد الحوضين ✋', cx + 20, S._bal.by - S._bal.rp - 12, { s: 13 }); }
    },
    d_hot(ctx, S, w, h) {
      const p = S.p, gy = h * .9 + S.alt * 1.6, cx = w * .5, top = h * .5 - Math.min(S.alt, 120) * 1.8;
      [[.18, .2], [.8, .15], [.45, .35]].forEach(([x, y], i) => C5.cloud(ctx, ((x * w + i * 50 + S.t * 6) % (w + 100)) - 50, y * h + S.alt * .6 % h, 26, 'rgba(255,255,255,.9)'));
      if (gy < h + 40) { ctx.fillStyle = '#65a30d'; ctx.fillRect(0, gy, w, h - gy + 50); ctx.fillStyle = '#4d7c0f'; for (let x = 0; x < w; x += 13) ctx.fillRect(x, gy + (x * 7) % 20, 2, 7); [.15, .82, .9].forEach(x => { ctx.fillStyle = '#78350f'; ctx.fillRect(x * w - 4, gy - 40, 8, 40); ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.arc(x * w, gy - 50, 24, 0, TAU); ctx.fill(); }); }
      const R = Math.min(w, h) * .2, ey = top - R * .2, basketY = ey + R * 1.45;
      const hot = clamp((S.Ti - 25) / 90, 0, 1);
      const gE = ctx.createRadialGradient(cx - R * .3, ey - R * .3, 10, cx, ey, R * 1.2); gE.addColorStop(0, `rgb(${255},${Math.round(220 - 90 * hot)},${Math.round(120 - 80 * hot)})`); gE.addColorStop(1, `rgb(${Math.round(234 - 20 * hot)},${Math.round(88 - 40 * hot)},${Math.round(12)})`);
      ctx.fillStyle = gE; ctx.beginPath(); ctx.moveTo(cx - R * .35, ey + R * 1.05); ctx.bezierCurveTo(cx - R * 1.25, ey + R * .4, cx - R * 1.1, ey - R * 1.05, cx, ey - R * 1.05); ctx.bezierCurveTo(cx + R * 1.1, ey - R * 1.05, cx + R * 1.25, ey + R * .4, cx + R * .35, ey + R * 1.05); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 3; [-.55, 0, .55].forEach(k => { ctx.beginPath(); ctx.moveTo(cx + k * R * .6, ey + R * 1.02); ctx.quadraticCurveTo(cx + k * R * 1.4, ey - R * .2, cx + k * R * .2, ey - R * 1.03); ctx.stroke(); });
      if (p.parts) { ctx.save(); ctx.beginPath(); ctx.ellipse(cx, ey - R * .05, R * .9, R * .95, 0, 0, TAU); ctx.clip(); this.gas(ctx, S, cx, ey, R * .8, R * .8, Math.round(34 - 16 * hot), '#fff7ed', 4.5, true); ctx.restore(); for (let i = 0; i < 16; i++) { const q = S.gp[(i * 3) % NP]; const x = (q.x * .5 + .5) * w, y = (q.y * .5 + .5) * h * .8; if (Math.hypot(x - cx, y - ey) > R * 1.3) K.ball(ctx, x, y, 4.5, '#0284c7'); } }
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2; [[-.35, -.18], [.35, .18]].forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(cx + a * R, ey + R * 1.05); ctx.lineTo(cx + b * R, basketY); ctx.stroke(); });
      if (S.fire) { K.burner(ctx, cx, ey + R * 1.3, 1, S.t); } ctx.fillStyle = '#a16207'; rr(ctx, cx - R * .24, basketY, R * .48, R * .32, 6); ctx.fill(); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2; ctx.stroke();
      // fire button
      const bx = w - 120, byy = h * .78; ctx.fillStyle = S.fire ? '#ea580c' : '#fff'; rr(ctx, bx - 70, byy - 22, 140, 44, 22); ctx.fill(); ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 2.5; ctx.stroke(); G.text(ctx, S.fire ? '🔥 الشعلة تعمل' : '🔥 شغّل الشعلة', bx, byy + 1, { s: 14, w: 900, c: S.fire ? '#fff' : '#9a3412' });
      if (p.arrows) { const lift = 2800 * 1.2 * (1 - 298 / (S.Ti + 273)); K.force(ctx, cx - R * 1.3, ey, 0, -clamp(lift / 8, 0, 110), 'قوة الرفع', '#16a34a', 4); K.force(ctx, cx + R * 1.3, ey, 0, 560 / 8, 'الوزن', '#dc2626', 4); }
      this.gasKey(ctx, S, 80, p.labels ? 158 : 56);
      if (p.labels) { C5.card(ctx, 80, 56, 270, 94, '#ea580c'); G.text(ctx, `حرارة الهواء داخل المنطاد: ${Math.round(S.Ti)} °C`, 215, 76, { s: 12.5, w: 800, c: '#9a3412' }); G.text(ctx, `كثافته: ${(1.2 * 298 / (S.Ti + 273)).toFixed(2)} kg/m³ (الخارج 1.20)`, 215, 100, { s: 12, w: 700, c: '#334155' }); G.text(ctx, `الارتفاع: ${Math.round(S.alt)} m`, 215, 126, { s: 14, w: 900, c: '#0f172a' });
        if (S.alt < 1 && S.Ti > 40) K.bubble(ctx, 'الهواء يسخن ويتمدد... استمر!', cx + R, ey - R, { s: 13 }); else if (S.alt > 5) K.bubble(ctx, 'الهواء الساخن أقل كثافة فيرتفع المنطاد! 🎈', cx + R * .6, ey - R, { s: 13 }); }
    },
    d_sun(ctx, S, w, h) {
      const p = S.p, gy = h * .84, sx = sunX(S);
      ctx.fillStyle = 'rgba(253,224,71,.28)'; ctx.beginPath(); ctx.moveTo(w * .86, 60); ctx.lineTo(sx - 70, gy); ctx.lineTo(w, gy); ctx.lineTo(w, 60); ctx.closePath(); ctx.fill(); C5.sun(ctx, w * .86, h * .15, 30, S.t);
      // umbrella shade
      const ux = w * .26; ctx.fillStyle = 'rgba(15,23,42,.12)'; ctx.beginPath(); ctx.ellipse(ux, gy + 6, 130, 12, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#475569'; ctx.fillRect(ux - 3, h * .3, 6, gy - h * .3); ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.moveTo(ux - 140, h * .36); ctx.quadraticCurveTo(ux, h * .2, ux + 140, h * .36); ctx.closePath(); ctx.fill(); K.tag(ctx, 'ظل', ux, gy + 22, { s: 12, bg: '#334155' }); K.tag(ctx, 'أشعة الشمس', sx + 90, gy + 22, { s: 12, bg: '#ca8a04' });
      const bx = S.bxf * w, V = balVol(S), rp = 38 * Math.cbrt(V / 2) * 1.25, by = gy - 150;
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(bx, by + rp); ctx.quadraticCurveTo(bx + 10, by + rp + 60, bx, gy - 10); ctx.stroke(); ctx.fillStyle = '#334155'; rr(ctx, bx - 10, gy - 12, 20, 12, 3); ctx.fill();
      if (!S.pop) { ctx.fillStyle = '#a855f7'; ctx.beginPath(); ctx.ellipse(bx, by, rp * .92, rp, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(bx - 5, by + rp + 6); ctx.lineTo(bx, by + rp - 2); ctx.lineTo(bx + 5, by + rp + 6); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.ellipse(bx - rp * .35, by - rp * .4, rp * .15, rp * .28, -.5, 0, TAU); ctx.fill();
        if (p.parts) { ctx.save(); ctx.beginPath(); ctx.ellipse(bx, by, rp * .85, rp * .9, 0, 0, TAU); ctx.clip(); this.gas(ctx, S, bx, by, rp * .75, rp * .8, 18, '#fff', 3.5); ctx.restore(); }
        this.gasKey(ctx, S, 80, p.labels ? 134 : 56);
        if (p.arrows && S.Tsun > 30) for (let k = 0; k < 8; k++) { const a = k * TAU / 8; K.force(ctx, bx + Math.cos(a) * rp * .5, by + Math.sin(a) * rp * .5, Math.cos(a) * 20 * clamp((S.Tsun - 25) / 35, 0, 1), Math.sin(a) * 20 * clamp((S.Tsun - 25) / 35, 0, 1), null, '#dc2626', 2.5); } }
      else { const k = clamp((S.t - S.popT) * 3, 0, 1); for (let i = 0; i < 10; i++) { const a = i * TAU / 10 + .3; ctx.fillStyle = '#a855f7'; ctx.save(); ctx.translate(bx + Math.cos(a) * (20 + 80 * k), by + Math.sin(a) * (20 + 80 * k) + k * k * 60); ctx.rotate(a + k * 4); ctx.fillRect(-8, -4, 16, 8); ctx.restore(); } if (S.t - S.popT < 1.2) G.text(ctx, 'بوم! 💥', bx, by, { s: 28, w: 900, c: '#dc2626' }); K.bubble(ctx, 'انفجر البالون! سخن الغاز داخله فتمدد أكثر مما يتحمله المطاط', bx, by - 40, { s: 13, bg: '#fef2f2', bd: '#dc2626', c: '#7f1d1d' }); }
      // pump button
      const pbx = 150, pby = h * .6; ctx.fillStyle = '#fff'; rr(ctx, pbx - 60, pby - 18, 120, 36, 18); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.stroke(); G.text(ctx, S.pop ? '🎈 بالون جديد' : '💨 انفخ أكثر', pbx, pby + 1, { s: 13, w: 900, c: '#6d28d9' });
      if (p.labels) { C5.card(ctx, 80, 56, 250, 70, '#7c3aed'); G.text(ctx, `حرارة الغاز في البالون: ${Math.round(S.Tsun)} °C`, 205, 76, { s: 12.5, w: 800, c: '#334155' }); G.text(ctx, S.pop ? 'انفجر!' : `حجم البالون: ${V.toFixed(2)} L (يتحمل 2.24 L)`, 205, 102, { s: 12.5, w: 900, c: '#6d28d9' }); }
    },
    drags(S) {
      const p = S.p, w = S.W, h = S.H, L = C5.tabsDrag(S, 'mode', w - 14, 12, MODES, { bw: 128 });
      if (p.mode === 'flask') { const g = geo(S), cy = g.near ? g.by - 72 : g.by - 64;
        L.push({ id: 'flask', x: g.fx, y: cy, r: 60, axis: 'x', tip: 'اسحب الدورق إلى الحوض — أو انقره لتمسكه بيديك', idle: 'اسحب الدورق إلى الماء الساخن ✋',
          down: S => { S.dragF = true; }, drag: (S, d) => { S.hands = false; S.fxf = clamp((d.ox + d.x - d.sx) / S.W, .12, .92); }, up: S => { S.dragF = false; const g = geo(S); [g.hotB, g.iceB].forEach(b => { if (Math.abs(g.fx - b.x) < 100) S.fxf = b.x / S.W; }); }, click: S => { S.hands = !S.hands; if (S.hands) { const g = geo(S); if (g.near) S.fxf = .5; } } }); }
      if (p.mode === 'hot') L.push({ id: 'fire', x: w - 120, y: h * .78, w: 140, h: 44, idle: 'شغّل الشعلة ✋', tip: 'انقر لتشغيل/إيقاف الشعلة', click: S => { S.fire = !S.fire; } });
      if (p.mode === 'sun') { L.push({ id: 'balloon', x: S.bxf * w, y: h * .84 - 150, r: 50, axis: 'x', idle: 'اسحب البالون إلى الشمس ✋', tip: 'اسحب البالون بين الظل والشمس', drag: (S, d) => { if (!S.pop) S.bxf = clamp((d.ox + d.x - d.sx) / S.W, .14, .9); } });
        L.push({ id: 'pump', x: 150, y: h * .6, w: 120, h: 36, hint: false, tip: 'انفخ البالون أكثر', click: S => { if (S.pop) { S.pop = 0; S.Tsun = C5.T0; S.bl0 = 2; S.bxf = .22; } else { S.bl0 = Math.min(2.2, S.bl0 + .05); if (balVol(S) > 2.24) { S.pop = 1; S.popT = S.t; } } } }); }
      return L;
    },
    readings(S) { const p = S.p; if (p.mode === 'flask') return [rd('درجة حرارة الهواء', Math.round(S.Ta) + ' °C'), rd('حجم الهواء', Math.round(VF + Vb(S)) + ' cm³'), rd('البالون', Vb(S) > 5 ? 'منتفخ' : Vb(S) < -5 ? 'مسحوب إلى الداخل' : 'مرتخٍ', 1)];
      if (p.mode === 'hot') return [rd('حرارة الهواء داخل المنطاد', Math.round(S.Ti) + ' °C'), rd('كثافة الهواء داخله', (1.2 * 298 / (S.Ti + 273)).toFixed(2) + ' kg/m³'), rd('الارتفاع', Math.round(S.alt) + ' m')];
      return [rd('حرارة الغاز', Math.round(S.Tsun) + ' °C'), rd('حجم البالون', S.pop ? 'انفجر' : balVol(S).toFixed(2) + ' L')]; },
    explain(S) { const p = S.p; if (p.mode === 'flask') { const v = Vb(S); return v > 5 ? 'سخن الهواء في الدورق فتحركت جزيئاته <b>أسرع وتباعدت</b> فازداد حجمه ودخل جزء منه في البالون فانتفخ.' : v < -5 ? 'برد الهواء فتباطأت جزيئاته وتقاربت فقلّ حجمه <b>(تقلص)</b>، فدفع الهواء الخارجي البالون إلى داخل الدورق.' : 'الدورق فيه هواء بدرجة حرارة الغرفة والبالون مرتخٍ. اسحبه إلى حوض الماء الساخن.'; }
      if (p.mode === 'hot') return S.alt > 1 ? 'الهواء الساخن داخل المنطاد تمدد و<b>قلّت كثافته</b> عن الهواء البارد حوله، فأصبحت قوة الرفع أكبر من الوزن فارتفع.' : 'شغّل الشعلة لتسخين الهواء داخل المنطاد.';
      return S.pop ? 'انفجر البالون لأن الغاز داخله <b>تمدد</b> بحرارة الشمس فازداد حجمه أكثر مما يتحمله المطاط.' : 'اسحب البالون من الظل إلى أشعة الشمس وراقب حجمه.'; },
    quiz: [
      { q: 'لماذا تنفجر البالونات المملوءة بالغاز إذا تُركت تحت أشعة الشمس؟', o: ['لأن الغاز يتقلص', 'لأن الغاز يتمدد بالحرارة فيزداد حجمه', 'لأن المطاط يثقل'], a: 1, why: 'الغازات تتمدد كثيراً بالحرارة (مراجعة الدرس ص 79).' },
      { q: 'في ضوء حركة الجسيمات، لماذا يتمدد الغاز أكثر من السائل والصلب عند التسخين؟', o: ['لأن القوى بين جزيئات الغاز ضعيفة جداً', 'لأن جزيئات الغاز أثقل', 'لأن الغاز لا يسخن'], a: 0, why: 'ضآلة القوى الجزيئية بين جزيئات الغاز (حقيقة علمية ص 77).' },
      { q: 'يرتفع المنطاد إلى الأعلى عندما:', o: ['يبرد الهواء داخله', 'تزداد كتلته', 'يسخن الهواء داخله فيتمدد وتقل كثافته'], a: 2, why: 'الهواء الساخن أقل كثافة من الهواء البارد المحيط (ص 75).' }
    ]
  });
})();

/* =====================================================================
   6) الانصهار والانجماد والغليان — الحرارة الكامنة (ص 80–82)
   ===================================================================== */
(function () {
  const C_ICE = 2100, C_W = 4186, LF = 334000, LV = 2260000, ACC = 30, PMAX = 420;
  const geo = S => { const w = S.W, h = S.H, by = h * .86; const bx = w * .42, bw = Math.min(200, w * .24), bh = Math.min(230, h * .3); return { w, h, by, bx, bw, bh, byb: by - 40, kx: bx + 120, ky: by - 18 }; };
  const EPS = 1e-7, C_ST = 2010;
  const phase = S => { const ms = S.ms, ml = S.ml, mv = S.mv || 0; if (ms + ml + mv < .002) return 'none'; if (ms > EPS && ml > EPS) return S.P >= 0 ? 'melt' : 'freeze'; if (ms > EPS) return 'solid'; if (ml > EPS) { if (S.T >= 99.95 && S.P > 0) return 'boil'; if (S.T >= 99.95 && mv > EPS) return 'condense'; return 'liquid'; } return 'gas'; };
  const PH = { none: 'تبخر الماء كله!', solid: 'صلب (جليد)', melt: 'انصهار عند 0 °C', freeze: 'انجماد عند 0 °C', liquid: 'سائل (ماء)', boil: 'غليان عند 100 °C', condense: 'تكاثف البخار عند 100 °C', gas: 'غاز (بخار ماء)' };
  X7({ id: 'g7_melting', ch: 15, sec: 'الدرس 2', page: 81, kind: 'نشاط', title: 'الانصهار والانجماد والغليان (الحرارة الكامنة)',
    desc: 'نسخّن قطعاً من الجليد في كأس ونقيس درجة حرارتها باستمرار ونرسم المنحني: تبقى 0 °C طوال الانصهار، ثم ترتفع، ثم تثبت عند 100 °C طوال الغليان. وبالتبريد يحدث العكس (الانجماد).',
    tags: 'انصهار انجماد غليان حرارة كامنة درجة الانصهار ماص للحرارة باعث للحرارة منحني',
    tools: ['قدح زجاجي', 'مكعبات جليد (200 g) من المجمّدة', 'محرار', 'مسخّن كهربائي / مبرّد', 'ساعة توقيت'],
    steps: ['أدر مقبض المسخّن نحو «تسخين» 🔥. راقب المحرار والمنحني.', 'لاحظ: أثناء انصهار الجليد تبقى درجة الحرارة ثابتة عند 0 °C رغم استمرار التسخين!', 'اضغط «تسجيل» كل دقيقة تقريباً لتسجيل درجة الحرارة في الجدول.', 'استمر حتى يغلي الماء: درجة الحرارة تثبت عند 100 °C.', 'أدر المقبض نحو «تبريد» ❄ قبل أن يتبخر الماء كله، ولاحظ الانجماد عند 0 °C.', 'فعّل «الجزيئات» لترى ترتيب الجزيئات في كل حالة. جرّب إضافة مكعب جليد إلى الماء.'],
    concl: ['درجة الانصهار: درجة الحرارة الثابتة التي تتحول عندها المادة من الحالة الصلبة إلى السائلة، وهي للجليد 0 °C تحت الضغط الجوي الاعتيادي.', 'الانصهار تغير ماص للحرارة: الحرارة التي تمتصها المادة أثناء الانصهار تبقى كامنة فيها ولا ترفع درجة حرارتها (الحرارة الكامنة للانصهار).', 'الانجماد عكس الانصهار ويحدث عند درجة الانصهار نفسها، وهو تغير باعث للحرارة.', 'الغليان يحدث عند درجة حرارة ثابتة (100 °C للماء تحت الضغط الاعتيادي) حتى يتحول السائل كله إلى بخار.'],
    laws: ['g7_states', 'g7_kelvin'],
    fact: ['درجة انصهار ملح الطعام تبلغ نحو 800 °C بينما الجليد 0 °C — لكل مادة صلبة نقية درجة انصهار خاصة بها (ص 81).', 'الضغط الكبير لحافة حذاء المتزلج يصهر الجليد تحته، ثم يعود الماء إلى التجمد بعد زوال الضغط (ص 82).', 'لصهر 1 kg من الجليد عند 0 °C نحتاج نحو 334000 J من الحرارة — دون أن ترتفع درجة حرارته!'],
    controls: [
      R('knob', 'المسخّن (−) تبريد / (+) تسخين', -1, 1, 0, .05, '', null, v => (v > 0 ? 'تسخين ' : v < 0 ? 'تبريد ' : '') + Math.round(Math.abs(v) * 100) + '%'),
      BT('', [{ t: '🧊 أضف مكعب جليد (25 g)', on: S => { S.addIce = (S.addIce || 0) + .025; } }, { t: '⟲ ابدأ من جديد (جليد −20 °C)', on: S => { S.ms = .2; S.ml = 0; S.mv = 0; S.layer = false; S.drops = []; S.T = -20; S.tm = 0; S.hT = []; setParam(S, 'knob', 0); } }]),
      TG('parts', 'الجزيئات (عدسة مكبّرة)', true, null, 'atom'), TG('heat', 'أسهم الحرارة (ماص / باعث)', true, null, 'heat'),
      TG('graph', 'منحني درجة الحرارة — الزمن', true, null, 'graph'), TG('labels', 'حالة المادة والقيم', true, null, 'labels'),
      TG('cover', 'غطاء زجاجي يجمع البخار (ليتكاثف)', true, null, 'eye'), TG('cycle', 'مخطط تحولات الحالة', true, null, 'swap')],
    setup(S) { S.ms = .2; S.ml = 0; S.mv = 0; S.T = -20; S.tm = 0; S.hT = []; S.P = 0; S.addIce = 0; S.lastH = -1; S.cheered = false; S.sawMelt = false; S.layer = false; S.parts = Array.from({ length: 25 }, (_, i) => ({ x: Math.random(), y: Math.random(), a: Math.random() * TAU })); S.vp = Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random(), a: Math.random() * TAU })); S.drops = []; },
    update(S, dt) {
      const P = S.p.knob * PMAX; S.P = P; const ds = dt * ACC; S.tm += ds; const cover = S.p.cover !== false; S.mv = S.mv || 0;
      if (S.addIce > 0) { const m = S.addIce; S.addIce = 0; if (S.ml > 0 && S.T > 0) { S.T -= m * C_ICE * 20 / (S.ml * C_W); } else if (S.ms > 0 && S.ml === 0) { S.T = (S.T * S.ms + (-20) * m) / (S.ms + m); } if (S.ms < EPS) S.layer = false; S.ms += m; if (S.T < 0 && S.ml > EPS) S.T = 0; }
      let Q = (P - (S.T - C5.T0) * .6) * ds;
      if (S.ms + S.ml + S.mv < .002) { S.ms = S.ml = S.mv = 0; return; }
      for (let it = 0; it < 5 && Math.abs(Q) > 1e-6; it++) {
        if (S.ms > EPS && S.ml > EPS) { // ice + water at 0 °C: heat melts, cooling freezes; T stays 0
          if (S.T > 0) { const q = S.ml * C_W * S.T, r = Math.min(q, 2500 * ds); const dm = Math.min(S.ms, r / LF); S.ms -= dm; S.ml += dm; S.T -= dm * LF / (S.ml * C_W); if (S.T < 1e-3) S.T = 0; }
          if (Q > 0) { const dm = Math.min(S.ms, Q / LF); S.ms -= dm; S.ml += dm; Q -= dm * LF; } else { const dm = Math.min(S.ml, -Q / LF); S.ml -= dm; S.ms += dm; Q += dm * LF; }
          if (S.T <= 0) S.T = 0; if (S.ms <= EPS) { S.ms = 0; S.layer = false; } if (S.ml <= EPS) S.ml = 0; continue; }
        if (S.ms > EPS) { S.T += Q / (S.ms * C_ICE); Q = 0; if (S.T > 0) { Q = S.T * S.ms * C_ICE; S.T = 0; S.ml = 2 * EPS; S.ms -= EPS; } if (S.T < -25) S.T = -25; continue; }
        if (S.ml > EPS) {
          if (S.T >= 99.999 && Q > 0) { const dm = Math.min(S.ml, Q / LV); S.ml -= dm; if (cover) S.mv += dm; Q -= dm * LV; if (S.ml <= EPS) S.ml = 0; continue; } // boiling: water → steam
          if (S.T >= 99.99 && Q < 0 && S.mv > EPS) { const dm = Math.min(S.mv, -Q / LV); S.mv -= dm; S.ml += dm; Q += dm * LV; if (S.mv <= EPS) S.mv = 0; S.T = 100; continue; } // condensation: steam → water
          S.T += Q / (S.ml * C_W); Q = 0; if (S.T > 100) { Q = (S.T - 100) * S.ml * C_W; S.T = 100; } else if (S.T < 0) { Q = S.T * S.ml * C_W; S.T = 0; S.ms = 2 * EPS; S.ml -= EPS; S.layer = true; } continue; }
        if (S.mv > EPS) { S.T += Q / (S.mv * C_ST); Q = 0; if (S.T < 100) { Q = (S.T - 100) * S.mv * C_ST; S.T = 100; S.ml = 2 * EPS; S.mv -= EPS; } if (S.T > 110) S.T = 110; continue; }
      }
      if (S.tm - S.lastH > 6) { S.lastH = S.tm; (S.hT = S.hT || []).push([+(S.tm / 60).toFixed(3), +S.T.toFixed(2)]); if (S.hT.length > 900) S.hT.shift(); }
      const ph = phase(S); if (ph === 'melt') S.sawMelt = true; if (!S.cheered && S.sawMelt && ph === 'boil') { S.cheered = true; K.cheer(S, S.W * .42, S.H * .4); }
      // particle motion: solid ≈ vibrate, liquid slow, gas fast
      const tot = S.ms + S.ml + S.mv || 1, nS = Math.round(25 * S.ms / tot), nV = Math.round(25 * S.mv / tot);
      S.parts.forEach((q, i) => { const st = i < nS ? 0 : i >= 25 - nV ? 2 : 1, sp = [0, .45, 1.8][st] * (ph === 'boil' && st === 1 ? 1.5 : 1); q.a += (Math.random() - .5) * 1.2; q.x += Math.cos(q.a) * sp * dt; q.y += Math.sin(q.a) * sp * dt; if (q.x < 0 || q.x > 1) { q.a = Math.PI - q.a; q.x = clamp(q.x, 0, 1); } if (q.y < 0 || q.y > 1) { q.a = -q.a; q.y = clamp(q.y, 0, 1); } });
      S.vp.forEach(q => { q.a += (Math.random() - .5) * 1.5; q.x += Math.cos(q.a) * .5 * dt; q.y += Math.sin(q.a) * .5 * dt; if (q.x < 0 || q.x > 1) { q.a = Math.PI - q.a; q.x = clamp(q.x, 0, 1); } if (q.y < 0 || q.y > 1) { q.a = -q.a; q.y = clamp(q.y, 0, 1); } });
      if (ph === 'condense' || (S.mv > EPS && S.P < 0)) { if (Math.random() < dt * 6) S.drops.push({ u: Math.random(), y: 0, v: 0 }); }
      S.drops.forEach(d => { d.v += 260 * dt; d.y += d.v * dt; }); S.drops = S.drops.filter(d => d.y < 400);
    },
    draw(ctx, w, h, S) {
      const p = S.p, g = geo(S), ph = phase(S), cover = p.cover !== false; K.bg(ctx, w, h, { benchY: g.by });
      K.raw(ctx, () => {
        // hot/cold plate
        const k = p.knob; ctx.fillStyle = '#cbd5e1'; rr(ctx, g.bx - 150, g.byb, 300, 40, 10); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = k > 0 ? `rgba(239,68,68,${.2 + .7 * k})` : k < 0 ? `rgba(56,189,248,${.2 - .7 * k})` : '#94a3b8'; rr(ctx, g.bx - g.bw / 2 - 10, g.byb - 6, g.bw + 20, 8, 4); ctx.fill();
        ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(g.kx, g.ky, 18, 0, TAU); ctx.fill(); const ka = -Math.PI / 2 + k * Math.PI * .75; ctx.strokeStyle = '#facc15'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.kx, g.ky); ctx.lineTo(g.kx + Math.cos(ka) * 15, g.ky + Math.sin(ka) * 15); ctx.stroke();
        G.text(ctx, '❄', g.kx - 30, g.ky - 14, { s: 13, c: '#0284c7' }); G.text(ctx, '🔥', g.kx + 30, g.ky - 14, { s: 13 }); G.text(ctx, k > 0 ? 'تسخين ' + Math.round(k * 100) + '%' : k < 0 ? 'تبريد ' + Math.round(-k * 100) + '%' : 'مطفأ', g.bx - 60, g.ky, { s: 12.5, w: 900, c: k > 0 ? '#b91c1c' : k < 0 ? '#0369a1' : '#334155' });
        // beaker content: water, ice (cubes or a frozen layer), bubbles, steam
        const cap = .4, yb0 = g.byb - 8, lvl = S.ml / cap, wTop = yb0 - g.bh * lvl, bxL = g.bx - g.bw / 2, bxR = g.bx + g.bw / 2, rimY = yb0 - g.bh;
        K.beaker(ctx, g.bx, yb0, g.bw, g.bh, lvl, { liq: '#60a5fa', liqA: .45 });
        if (S.layer && S.ms > EPS) { const th = Math.max(3, g.bh * S.ms * 1.09 / cap), y1 = wTop, y0 = y1 - th; const ig = ctx.createLinearGradient(0, y0, 0, y1); ig.addColorStop(0, 'rgba(240,249,255,.97)'); ig.addColorStop(1, 'rgba(186,230,253,.95)'); ctx.fillStyle = ig; ctx.fillRect(bxL + 3, y0, g.bw - 6, th); ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.5; ctx.strokeRect(bxL + 3, y0, g.bw - 6, th);
          ctx.strokeStyle = 'rgba(14,116,144,.45)'; ctx.lineWidth = 1; for (let i = 0; i < 6; i++) { const x = bxL + 12 + i * (g.bw - 24) / 5; ctx.beginPath(); ctx.moveTo(x, y0 + 2); ctx.lineTo(x + 8, y0 + th * .5); ctx.lineTo(x - 4, y1 - 2); ctx.stroke(); }
          if (p.labels && th > 14) G.text(ctx, 'جليد', g.bx - 30, y0 + th / 2, { s: 12, w: 900, c: '#0369a1' }); }
        if (ph === 'boil' || (S.T > 70 && S.ml > EPS)) { const n = ph === 'boil' ? 30 : Math.round((S.T - 70) / 3); for (let i = 0; i < n; i++) { const ph2 = (S.t * (ph === 'boil' ? .9 : .4) + i * .137) % 1, x = bxL + 12 + ((i * 53) % (g.bw - 24)), y = ph === 'boil' ? yb0 - 4 - ph2 * (yb0 - 4 - wTop) : yb0 - 4 - ph2 * 10; ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(x, y, 2 + ph2 * (ph === 'boil' ? 6 : 1.5), 0, TAU); ctx.fill(); ctx.stroke(); } }
        if (!S.layer) { const n = S.ms > 1e-4 ? Math.max(1, Math.ceil(S.ms / .2 * 6)) : 0, cs = n ? 44 * Math.cbrt(S.ms / n / (.2 / 6)) : 0;
          for (let i = 0; i < n; i++) { const col = i % 3, row = Math.floor(i / 3); const floatY = S.ml > .01 ? wTop + cs * .15 : yb0; const x = bxL + 10 + col * Math.max(4, g.bw - 62 - cs) / 2 + Math.sin(S.t + i) * (S.ml > .01 ? 2 : 0), y = floatY - row * cs * .8 + (S.ml > .01 ? row * cs * 1.2 : 0); ctx.fillStyle = 'rgba(240,249,255,.92)'; ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.6; rr(ctx, x, y - cs, cs, cs, cs * .18); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fillRect(x + cs * .15, y - cs * .85, cs * .25, cs * .12); } }
        // glass cover (dome) that keeps the steam, so it can condense back
        const dh = 64, dTop = rimY - dh;
        if (cover) {
          const sTop = S.layer && S.ms > EPS ? wTop - g.bh * S.ms * 1.09 / cap : wTop, vk = clamp(S.mv / .08, 0, 1);
          if (S.mv > EPS) { ctx.fillStyle = `rgba(226,232,240,${.15 + .45 * vk})`; ctx.beginPath(); ctx.moveTo(bxL + 3, sTop); ctx.lineTo(bxL + 3, rimY); ctx.lineTo(bxL - 6, rimY); ctx.lineTo(bxL - 6, dTop + 26); ctx.quadraticCurveTo(g.bx, dTop - 26, bxR + 6, dTop + 26); ctx.lineTo(bxR + 6, rimY); ctx.lineTo(bxR - 3, rimY); ctx.lineTo(bxR - 3, sTop); ctx.closePath(); ctx.fill();
            const nv = Math.round(4 + 36 * vk), vy0 = dTop + 18, vy1 = sTop - 6; for (let i = 0; i < nv; i++) { const q = S.vp[i]; const x = bxL + 6 + q.x * (g.bw - 12), y = vy0 + q.y * Math.max(10, vy1 - vy0); ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.strokeStyle = 'rgba(100,116,139,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, 3.2, 0, TAU); ctx.fill(); ctx.stroke(); }
            if (p.labels) G.text(ctx, `بخار ${Math.round(S.mv * 1000)} g`, g.bx - g.bw * .25, dTop + 30, { s: 12, w: 900, c: '#fff', bg: 'rgba(71,85,105,.85)' }); }
          ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.2; ctx.fillStyle = 'rgba(224,242,254,.18)'; ctx.beginPath(); ctx.moveTo(bxL - 6, rimY + 4); ctx.lineTo(bxL - 6, dTop + 26); ctx.quadraticCurveTo(g.bx, dTop - 26, bxR + 6, dTop + 26); ctx.lineTo(bxR + 6, rimY + 4); ctx.fill(); ctx.stroke();
          ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bxL + 2, rimY - 4); ctx.lineTo(bxL + 2, dTop + 30); ctx.stroke();
          if (S.drops.length) { ctx.fillStyle = '#3b82f6'; S.drops.forEach(d => { const x = bxL + 8 + d.u * (g.bw - 16), y0 = dTop + 14 + Math.abs(d.u - .5) * 40, y = y0 + d.y; if (y < wTop) { ctx.beginPath(); ctx.moveTo(x, y - 5); ctx.quadraticCurveTo(x + 4, y + 2, x, y + 3); ctx.quadraticCurveTo(x - 4, y + 2, x, y - 5); ctx.fill(); } }); for (let i = 0; i < 10; i++) { const x = bxL + 10 + i * (g.bw - 20) / 9; ctx.beginPath(); ctx.arc(x, dTop + 14 + Math.abs(i / 9 - .5) * 40, 2.6, 0, TAU); ctx.fill(); } }
          if (p.labels) G.text(ctx, 'غطاء زجاجي', bxL - 40, dTop + 34, { s: 11, w: 800, c: '#475569' });
        } else if (ph === 'boil' || S.T > 85) C5.steam(ctx, g.bx, wTop - 6, g.bw * .7, S.t, ph === 'boil' ? 1 : .3);
        K.thermo(ctx, g.bx + g.bw / 2 - 26, g.byb - 26, g.bh + 50, S.T, -20, 110, { step: 20, show: false }); G.text(ctx, S.T.toFixed(1) + ' °C', g.bx + g.bw / 2 + 34, g.byb - 26 - g.bh - 64, { s: 13, w: 900, c: '#0f172a', mono: 1 });
        // heat arrows
        if (p.heat && Math.abs(k) > .02) { for (let j = -1; j <= 1; j++) { if (k > 0) C5.heatArrow(ctx, g.bx + j * 50, g.byb + 26, g.bx + j * 50, g.byb - 30, S.t + j, '#f97316'); else C5.heatArrow(ctx, g.bx + j * 50, g.byb - 30, g.bx + j * 50, g.byb + 26, S.t + j, '#0284c7'); }
          if (ph === 'melt' || ph === 'boil') K.tag(ctx, 'ماص للحرارة — الحرارة تُخزَّن (كامنة) ولا ترفع درجة الحرارة', g.bx, g.byb + 58, { s: 12, bg: '#ea580c' }); if (ph === 'freeze' || ph === 'condense') K.tag(ctx, 'باعث للحرارة — تُفقد الحرارة الكامنة ودرجة الحرارة ثابتة', g.bx, g.byb + 58, { s: 12, bg: '#0369a1' }); }
        if (p.labels) { const c = { solid: '#0284c7', melt: '#7c3aed', freeze: '#7c3aed', liquid: '#2563eb', boil: '#dc2626', condense: '#0f766e', gas: '#475569', none: '#475569' }[ph]; K.tag(ctx, PH[ph], g.bx - 20, dTop - 48, { s: 16, bg: c }); G.text(ctx, `الزمن: ${(S.tm / 60).toFixed(1)} min`, bxL - 60, rimY + 20, { s: 12.5, w: 800, c: '#334155' }); G.text(ctx, `جليد ${Math.round(S.ms * 1000)} g — ماء ${Math.round(S.ml * 1000)} g — بخار ${Math.round(S.mv * 1000)} g`, g.bx - 20, dTop - 20, { s: 11.5, w: 700, c: '#334155' }); }
        // ice tray (click to add)
        const tx = 120, ty = g.by - 20; ctx.fillStyle = '#e0f2fe'; rr(ctx, tx - 44, ty - 30, 88, 30, 6); ctx.fill(); ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 2; ctx.stroke(); for (let i = 0; i < 3; i++) { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#7dd3fc'; rr(ctx, tx - 38 + i * 26, ty - 44, 22, 20, 4); ctx.fill(); ctx.stroke(); } G.text(ctx, 'انقر لإضافة مكعب', tx, ty + 16, { s: 11, w: 800, c: '#fff', bg: '#0369a1' });
        // particle lens + state cycle
        const LR = g.w < 700 ? 48 : 64, GW = clamp(g.w * .37, 190, 302), GH = clamp(g.h * .25, 150, 196);
        if (p.parts) this.lens(ctx, S, 94 + LR, 60 + LR + 6, LR, ph);
        if (p.cycle !== false) { const cx0 = p.parts ? 94 + 2 * LR + 18 : 80; this.cycle(ctx, S, cx0, 52, Math.min(300, (p.graph ? g.w - GW - 16 - 14 : g.w - 14) - cx0), ph); }
        if (p.graph) { const pts = S.hT || []; const x1 = Math.max(10, pts.length ? pts[pts.length - 1][0] * 1.1 : 10); C5.graph(ctx, g.w - GW - 16, 56, GW, GH, { x0: 0, x1, y0: -25, y1: 115, yt: [-20, 0, 20, 40, 60, 80, 100], xt: [0, Math.round(x1 / 2), Math.round(x1)], xl: 'الزمن (min)', yl: '°C', title: 'منحني التسخين والتبريد', series: [{ pts, col: '#dc2626', dot: 1 }] }); }
        K.party(ctx, S);
      });
    },
    /* state-change cycle: ice ⇄ water ⇄ steam (RTL: ice on the right) */
    cycle(ctx, S, x, y, wd, ph) { if (wd < 170) return; const bw = Math.min(70, wd * .25), ys = y + 54, bh = 32;
      const xs = [x + wd - bw / 2, x + wd / 2, x + bw / 2], nm = ['جليد', 'ماء', 'بخار'], cl = ['#0284c7', '#2563eb', '#64748b'];
      const on = { solid: [0], melt: [0, 1], freeze: [0, 1], liquid: [1], boil: [1, 2], condense: [1, 2], gas: [2], none: [] }[ph];
      C5.card(ctx, x - 6, y - 4, wd + 12, 122, '#0f766e'); G.text(ctx, 'تحولات حالة الماء', x + wd / 2, y + 10, { s: 11.5, w: 900, c: '#0f766e' });
      xs.forEach((cx, i) => { const a = on.includes(i); ctx.fillStyle = a ? cl[i] : '#f1f5f9'; rr(ctx, cx - bw / 2, ys - bh / 2, bw, bh, 10); ctx.fill(); ctx.strokeStyle = cl[i]; ctx.lineWidth = 2; ctx.stroke(); G.text(ctx, nm[i], cx, ys + 1, { s: 14, w: 900, c: a ? '#fff' : cl[i] }); });
      const arr = (i, top, lab, act, col) => { const x1 = top ? xs[i] - bw / 2 - 3 : xs[i + 1] + bw / 2 + 3, x2 = top ? xs[i + 1] + bw / 2 + 3 : xs[i] - bw / 2 - 3, yy = top ? ys - 9 : ys + 9; ctx.globalAlpha = act ? 1 : .55; G.arrow(ctx, x1, yy, x2, yy, act ? col : (top ? '#f87171' : '#7dd3fc'), act ? 3.4 : 2, 8); ctx.globalAlpha = 1; G.text(ctx, lab, (xs[i] + xs[i + 1]) / 2, top ? ys - 25 : ys + 26, { s: 10.5, w: 900, c: act ? '#fff' : (top ? '#b91c1c' : '#0369a1'), bg: act ? col : null }); };
      arr(0, 1, 'انصهار 0°C', ph === 'melt', '#ea580c'); arr(1, 1, 'غليان 100°C', ph === 'boil', '#dc2626'); arr(1, 0, 'تكاثف', ph === 'condense', '#0369a1'); arr(0, 0, 'انجماد', ph === 'freeze', '#0369a1');
      G.text(ctx, 'الأسهم العليا: تسخين 🔥 · السفلى: تبريد ❄', x + wd / 2, y + 106, { s: 10, w: 700, c: '#475569' }); },
    lens(ctx, S, cx, cy, R, ph) {
      const tot = S.ms + S.ml + S.mv || 1, nS = Math.round(25 * S.ms / tot), nV = Math.round(25 * S.mv / tot), nL = 25 - nS - nV, sp = R * .26;
      const sRows = Math.ceil(nS / 5), lRows = Math.ceil(nL / 6), yS0 = cy + R * .62, yLb = yS0 - sRows * sp - 2, yLt = yLb - Math.max(1, lRows) * sp * 1.15;
      K.lens(ctx, cx, cy, R, () => { ctx.fillStyle = nV > 12 ? '#fff7ed' : '#f0f9ff'; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
        if (nL) { ctx.fillStyle = 'rgba(96,165,250,.18)'; ctx.fillRect(cx - R, yLt - sp * .4, 2 * R, yLb - yLt + sp * .4 + (sRows ? 0 : R)); }
        if (nS) { ctx.strokeStyle = 'rgba(14,116,144,.35)'; ctx.lineWidth = 1; }
        S.parts.forEach((q, i) => { let x, y, col;
          if (i < nS) { const j = i; x = cx - sp * 2 + (j % 5) * sp + Math.sin(S.t * 20 + i) * (S.T < -5 ? .6 : 1.4); y = yS0 - Math.floor(j / 5) * sp + Math.cos(S.t * 23 + i * 2) * (S.T < -5 ? .6 : 1.4); col = '#7dd3fc'; }
          else if (i < nS + nL) { x = cx - R * .78 + q.x * R * 1.56; y = yLt + q.y * (yLb - yLt); col = '#3b82f6'; }
          else { x = cx - R * .8 + q.x * R * 1.6; y = cy - R * .85 + q.y * (nL + nS ? (yLt - (cy - R * .85) - 6) : R * 1.6); col = '#94a3b8'; }
          K.ball(ctx, x, y, R * .09, col); }); });
      const lab = { solid: 'صلب: مرتبة تهتز مكانها', melt: 'انصهار: تنفصل عن الشبكة', freeze: 'انجماد: تترتب في شبكة', liquid: 'سائل: متقاربة تنزلق', boil: 'غليان: تنطلق بخاراً', condense: 'تكاثف: البخار يتقارب', gas: 'غاز: متباعدة وسريعة', none: '—' }[ph];
      G.text(ctx, lab, cx, cy + R + 18, { s: 11.5, w: 800, c: '#fff', bg: '#0f766e' });
    },
    drags(S) { const g = geo(S); return [
      { id: 'knob', x: g.kx, y: g.ky, r: 24, cx: g.kx, cy: g.ky, tip: 'أدر المقبض: يميناً للتسخين، يساراً للتبريد (أو استعمل عجلة الفأرة)', idle: 'أدر المقبض نحو 🔥 ✋', drag: (S, d) => setParam(S, 'knob', S.p.knob + d.dang / (Math.PI * .75)), wheel: (S, s) => setParam(S, 'knob', S.p.knob + s * .05) },
      { id: 'icetray', x: 120, y: g.by - 36, w: 90, h: 44, hint: false, tip: 'انقر لإضافة مكعب جليد (25 g بدرجة −20 °C)', click: S => { S.addIce = (S.addIce || 0) + .025; } }]; },
    live: { title: 'درجة الحرارة — الزمن', data: S => ({ series: [{ pts: S.hT || [], color: '#dc2626', name: 'T (°C)' }], opts: { xl: 't (min)', y0zero: false, ymin: -25, ymax: 110 } }) },
    record(S) { return { t: +(S.tm / 60).toFixed(1), T: +S.T.toFixed(1), st: PH[phase(S)] }; },
    cols: [['t', 'الزمن (min)'], ['T', 'درجة الحرارة (°C)'], ['st', 'الحالة']],
    graph: { x: 't', y: 'T', xl: 'الزمن (min)', yl: 'درجة الحرارة (°C)', y0zero: false },
    readings(S) { return [rd('درجة الحرارة', S.T.toFixed(1) + ' °C'), rd('الزمن', (S.tm / 60).toFixed(1) + ' min'), rd('كتلة الجليد', Math.round(S.ms * 1000) + ' g'), rd('كتلة الماء', Math.round(S.ml * 1000) + ' g'), rd('كتلة البخار', Math.round((S.mv || 0) * 1000) + ' g'), rd('الحالة', PH[phase(S)], 1)]; },
    explain(S) { const ph = phase(S); return { condense: 'البخار يلامس الغطاء البارد فـ<b>يتكاثف</b> قطرات ماء تعود إلى الكأس، ودرجة الحرارة <b>ثابتة عند 100 °C</b> حتى يتكاثف البخار كله. التكاثف <b>باعث للحرارة</b> (عكس الغليان).', gas: 'تحول الماء كله إلى <b>بخار</b> (غاز): جزيئاته متباعدة وسريعة. برّده ليتكاثف من جديد.', solid: 'الجليد يكتسب حرارة فتهتز جزيئاته أسرع وترتفع درجة حرارته حتى 0 °C.', melt: 'الجليد <b>ينصهر</b>: الحرارة المكتسبة تُستهلك في فك ترابط الجزيئات، لذلك تبقى درجة الحرارة <b>ثابتة عند 0 °C</b> (الحرارة الكامنة للانصهار). الانصهار <b>ماص للحرارة</b>.', freeze: 'الماء <b>يتجمد</b> عند 0 °C ويفقد حرارته الكامنة، فتبقى درجة الحرارة ثابتة حتى يتجمد كله. الانجماد <b>باعث للحرارة</b>.', liquid: 'الماء السائل يكتسب (أو يفقد) حرارة فتتغير درجة حرارته.', boil: 'الماء <b>يغلي</b>: فقاعات بخار تتكون في السائل كله، ودرجة الحرارة <b>ثابتة عند 100 °C</b> حتى يتحول الماء كله إلى بخار (الحرارة الكامنة للتبخر).', none: 'تبخر الماء كله. اضغط «ابدأ من جديد».' }[ph]; },
    quiz: [
      { q: 'ماذا يحصل لدرجة حرارة مكعب الثلج عند انصهاره؟', o: ['ترتفع باستمرار', 'تبقى ثابتة عند 0 °C', 'تنخفض'], a: 1, why: 'الحرارة المكتسبة تبقى كامنة ولا ترفع درجة الحرارة أثناء الانصهار (ص 81).' },
      { q: 'لماذا يعد الانصهار تغيراً ماصاً للحرارة؟', o: ['لأن المادة تمتص طاقة حرارية خلال تغير حالتها', 'لأن المادة تفقد حرارة', 'لأن درجة حرارتها تنخفض'], a: 0, why: 'تعريف الكتاب ص 81.' },
      { q: 'في أيّ الحالتين يفقد الماء حرارة: التبخر أم الانجماد؟', o: ['التبخر', 'كلاهما', 'الانجماد'], a: 2, why: 'الانجماد تغير باعث للحرارة، والتبخر ماص للحرارة (مراجعة الدرس ص 85).' }
    ]
  });
})();

/* =====================================================================
   7) نشاط: التبخر والغليان، والعوامل المؤثرة في كمية التبخر (ص 82–84)
   ===================================================================== */
(function () {
  const LIQ = {
    water: { name: 'ماء', Tb: 100, LR: 4880, col: '#38bdf8', mol: '#2563eb' },
    alc: { name: 'كحول', Tb: 78, LR: 4640, col: '#c084fc', mol: '#9333ea' },
    acet: { name: 'أسيتون', Tb: 56, LR: 3700, col: '#f472b6', mol: '#db2777' },
    oil: { name: 'زيت الطعام', Tb: 300, LR: 9000, col: '#facc15', mol: '#a16207' }
  };
  const CE = .0221, M0 = 50; // g/(h·cm²·kPa) ; start mass (g)
  const MODES = [['race', '🏁 سباق التبخر'], ['boil', '🔥 التبخر والغليان']];
  const FACS = [['type', '🧪 نوع السائل'], ['area', '↔ اتساع السطح'], ['wind', '🌬 الرياح'], ['temp', '☀ الحرارة'], ['humid', '💧 الرطوبة'], ['press', '⏲ الضغط']];
  const FACS_S = [['type', '🧪 السائل'], ['area', '↔ السطح'], ['wind', '🌬 الرياح'], ['temp', '☀ الحرارة'], ['humid', '💧 الرطوبة'], ['press', '⏲ الضغط']];
  const FNAME = { type: 'نوع السائل', area: 'اتساع سطح السائل', wind: 'سرعة الرياح', temp: 'درجة الحرارة', humid: 'كمية بخار الماء في الهواء (الرطوبة)', press: 'الضغط' };
  const psat = (L, T) => 101.3 * Math.exp(L.LR * (1 / (L.Tb + 273) - 1 / (T + 273)));
  const geo = S => { const w = S.W, h = S.H, by = h * .8, x0 = 70, span = w - x0; return { w, h, by, x0, xs: [x0 + span * .3, x0 + span * .7], yb: by - 56, pxcm: clamp(h * .06, 24, 44), k: clamp(w * .024, 12, 20) }; };
  const jarDown = S => S.p.fac === 'humid' && S.jar > .97;
  const cond = (S, i) => {
    const p = S.p, f = p.fac, c = { liq: 'water', A: 40, wind: 0, T: 25, RH: p.hum / 100, P: 1 };
    if (i === 1) { if (f === 'type') c.liq = p.liqB; if (f === 'area') c.A = p.area; if (f === 'wind') c.wind = p.wind; if (f === 'temp') c.T = p.tB; if (f === 'humid' && jarDown(S)) c.RH = S.RHj; if (f === 'press') c.P = p.pres; }
    return c;
  };
  const rate = c => { const L = LIQ[c.liq]; const e = c.liq === 'water' ? c.RH * psat(LIQ.water, 25) : 0; return CE * c.A * Math.max(0, psat(L, c.T) - e) * (1 + .8 * c.wind) / c.P; }; // g/h
  const condTxt = (S, i) => { const c = cond(S, i), f = S.p.fac; return { type: `${LIQ[c.liq].name} (يغلي عند ${LIQ[c.liq].Tb === 300 ? '≈ 300' : LIQ[c.liq].Tb} °C)`, area: `مساحة السطح ${Math.round(c.A)} cm²`, wind: c.wind > 0 ? `مروحة: سرعة ${c.wind}` : 'هواء ساكن', temp: `${Math.round(c.T)} °C`, humid: i && jarDown(S) ? 'مغطى بناقوس (هواء رطب)' : `هواء الغرفة (رطوبة ${S.p.hum}%)`, press: `الضغط ${c.P.toFixed(2)} atm` }[f]; };
  /* conical (Erlenmeyer) flask path */
  const erlen = (ctx, cx, yb, bw, h, nw) => { const nh = h * .3; ctx.beginPath(); ctx.moveTo(cx - nw / 2 - 5, yb - h); ctx.lineTo(cx - nw / 2, yb - h + 5); ctx.lineTo(cx - nw / 2, yb - h + nh); ctx.lineTo(cx - bw / 2, yb - 8); ctx.quadraticCurveTo(cx - bw / 2, yb, cx - bw / 2 + 8, yb); ctx.lineTo(cx + bw / 2 - 8, yb); ctx.quadraticCurveTo(cx + bw / 2, yb, cx + bw / 2, yb - 8); ctx.lineTo(cx + nw / 2, yb - h + nh); ctx.lineTo(cx + nw / 2, yb - h + 5); ctx.lineTo(cx + nw / 2 + 5, yb - h); };
  const fan = (ctx, x, y, r, ang, on, base) => {
    ctx.fillStyle = '#334155'; rr(ctx, x - 26, base - 10, 52, 10, 5); ctx.fill(); ctx.fillRect(x - 4, y + r - 2, 8, base - y - r - 6);
    ctx.fillStyle = on ? '#0ea5e9' : '#94a3b8'; ctx.save(); ctx.translate(x, y); ctx.scale(.45, 1);
    for (let k = 0; k < 3; k++) { const a = ang + k * TAU / 3; ctx.beginPath(); ctx.ellipse(Math.cos(a) * r * .5, Math.sin(a) * r * .5, r * .5, r * .2, a, 0, TAU); ctx.fill(); }
    ctx.restore(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x, y, r * .45, r, 0, 0, TAU); ctx.stroke();
    ctx.lineWidth = .8; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(x - r * .45 * Math.sqrt(1 - (k / 3) ** 2), y + k * r / 3); ctx.lineTo(x + r * .45 * Math.sqrt(1 - (k / 3) ** 2), y + k * r / 3); ctx.stroke(); }
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(x, y, 6, 0, TAU); ctx.fill();
  };
  const bellJar = (ctx, x, yb, w, h, fog = 0) => {
    ctx.beginPath(); ctx.moveTo(x - w / 2, yb); ctx.lineTo(x - w / 2, yb - h + w * .35); ctx.quadraticCurveTo(x - w / 2, yb - h, x, yb - h); ctx.quadraticCurveTo(x + w / 2, yb - h, x + w / 2, yb - h + w * .35); ctx.lineTo(x + w / 2, yb);
    ctx.fillStyle = `rgba(224,242,254,${.25 + fog * .25})`; ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.4; ctx.stroke();
    ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(x, yb - h - 7, 8, 0, TAU); ctx.fill(); // knob
    ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - w / 2 + 9, yb - 12); ctx.lineTo(x - w / 2 + 9, yb - h + w * .38); ctx.stroke();
  };
  const cont = (S, g, i) => { const c = cond(S, i), bw = g.k * Math.sqrt(c.A) + 6, depth = M0 / c.A * g.pxcm, bh = Math.max(100, depth + 40); return { c, bw, bh, x: g.xs[i], yb: g.yb, lev: S.m[i] / c.A * g.pxcm }; };
  const syr = (S, g) => { const J = cont(S, g, 1); const jx = J.x, jw = J.bw + 50, jh = J.bh + 60, top = J.yb - jh, b0 = top - 14, Lp = 20 + 60 / S.p.pres, head = b0 - Lp; return { jx, jw, jh, top, b0, b1: b0 - 150, head, hy: head - 40, gx: jx + jw / 2 + 36, gy: top + 34 }; };
  const FKEY = { type: 'liqB', area: 'area', wind: 'wind', temp: 'tB', humid: 'hum', press: 'pres' };
  /* show only the panel controls that belong to the current scene */
  const panelVis = S => { if (S.t - (S._pv ?? -1) < .3 && S._pvk === S.p.mode + S.p.fac) return; S._pv = S.t; S._pvk = S.p.mode + S.p.fac; const show = S.p.mode === 'race' ? ['mode', 'fac', 'spd', FKEY[S.p.fac]] : ['mode', 'liqF', 'knob'];
    (S.E?.controls || []).forEach((c, i) => { if (!c.k || c.type === 'toggle') return; const n = document.querySelector(`#ctls .ctl[data-i="${i}"]`); if (n) n.style.display = show.includes(c.k) ? '' : 'none'; }); };
  const refill = S => { S.m = [M0, M0]; S.hr = 0; S.win = -1; S.esc = [[], []]; S.RHj = S.p.hum / 100; };

  X7({ id: 'g7_evaporation', ch: 15, sec: 'الدرس 2', page: 82, kind: 'نشاط', title: 'نشاط: التبخر والغليان والعوامل المؤثرة في التبخر',
    desc: 'إناءان متماثلان فيهما الكمية نفسها من الماء والكحول نتركهما معرضين للجو: أيهما يتبخر أسرع؟ ثم نغيّر عاملاً واحداً في كل سباق: اتساع السطح، الرياح، الحرارة، الرطوبة، الضغط. ونقارن التبخر (من السطح في جميع درجات الحرارة) بالغليان (فقاعات في السائل كله عند درجة الغليان).',
    tags: 'تبخر غليان كحول ماء عوامل التبخر اتساع السطح رياح مروحة رطوبة ضغط درجة الغليان فقاعات',
    tools: ['إناءان متماثلان', 'ماء', 'كحول', 'ميزانان رقميان', 'مروحة', 'ناقوس زجاجي', 'مصدر حراري ودورق مخروطي', 'محرار'],
    steps: ['في «سباق التبخر» اختر «نوع السائل»: الإناء الأول فيه 50 g ماء والإناء الآخر فيه الكمية نفسها من الكحول.',
      'اترك الإناءين معرضين للجو (شغّل الزمن ويمكنك تسريعه). راقب الميزانين: أيهما يتبخر أسرع؟ ولماذا؟',
      'انقر على قناني السوائل فوق الإناء الثاني لتجرّب الأسيتون أو زيت الطعام.',
      'اختر عاملاً آخر، وغيّره بيدك في الإناء الثاني فقط: اسحب حافة الإناء (اتساع السطح)، انقر المروحة (الرياح)، اسحب المحرار (الحرارة)، أنزل الناقوس (الرطوبة)، ادفع المكبس (الضغط).',
      'سجّل نتيجة كل سباق في الجدول (كمية التبخر خلال الزمن نفسه).',
      'انتقل إلى «التبخر والغليان»: أدر مقبض المسخّن وراقب: متى يتبخر السائل من سطحه فقط؟ ومتى تظهر الفقاعات في السائل كله؟'],
    concl: ['التبخر: تحول المادة من حالتها السائلة إلى حالتها الغازية عند اكتسابها الحرارة.',
      'الكحول أسرع تبخراً من الماء؛ فكلما كانت درجة غليان السائل واطئة كان تبخره أسرع.',
      'تزداد سرعة التبخر باتساع سطح السائل، وبزيادة سرعة الرياح، وبارتفاع درجة الحرارة، وتقل بازدياد الضغط وبزيادة بخار الماء في الهواء (الرطوبة).',
      'التبخر يحدث باستمرار من سطح السائل في جميع درجات الحرارة، أما الغليان فهو تبخر أجزاء السائل كله بفقاعات بخارية ويحدث عند درجة حرارة معينة (درجة الغليان) تثبت حتى يتحول السائل كله إلى بخار.'],
    laws: ['g7_states'],
    fact: ['تعمل مبرّدة الهواء بمرور الهواء على نشارة الخشب المبللة، فيمتص الماء الحرارة اللازمة لتبخره فيبرد الهواء ويصل إلينا بارداً (ص 83).',
      'تجف الملابس بسرعة عندما تتعرض لرياح قوية، ويتأخر جفافها في اليوم الرطب (ص 83–84).',
      'تجف الشوارع المرشوشة بالماء صيفاً أسرع مما تجف في الشتاء (ص 83).'],
    controls: [
      SEL('mode', 'النشاط', MODES, 'race'),
      SEL('fac', 'العامل المؤثر في التبخر', FACS, 'type', (v, S) => { if (v === 'humid') S.jar = 1; refill(S); }),
      R('spd', 'تسريع الزمن (دقيقة لكل ثانية)', 5, 60, 20, 5, 'min/s'),
      SEL('liqB', 'سائل الإناء الثاني', [['alc', 'كحول'], ['acet', 'أسيتون'], ['oil', 'زيت'], ['water', 'ماء']], 'alc', (v, S) => refill(S)),
      R('area', 'مساحة سطح الإناء الثاني', 10, 150, 120, 5, 'cm²'),
      R('wind', 'سرعة المروحة', 0, 3, 2, 1, ''),
      R('tB', 'درجة حرارة الإناء الثاني', 10, 60, 45, 1, '°C'),
      R('hum', 'رطوبة هواء الغرفة', 10, 95, 50, 5, '%'),
      R('pres', 'الضغط على الإناء الثاني', .5, 2, .5, .05, 'atm'),
      SEL('liqF', 'سائل الدورق (الغليان)', [['water', 'ماء (100 °C)'], ['alc', 'كحول (78 °C)']], 'water', (v, S) => { S.Tf = 25; S.vf = 1; S.bub = []; }),
      R('knob', 'المسخّن', 0, 1, 0, .05, '', null, v => Math.round(v * 100) + '%'),
      BT('', [{ t: '↻ املأ الإناءين من جديد', on: S => { refill(S); S.Tf = 25; S.vf = 1; S.bub = []; } }]),
      TG('mol', 'الجزيئات تغادر السطح', true, null, 'atom'), TG('windfx', 'أسهم الرياح والبخار', true, null, 'velocity'),
      TG('bars', 'مخطط كمية التبخر', true, null, 'graph'), TG('labels', 'القيم والأسماء', true, null, 'labels')],
    setup(S) { S.jar = 0; refill(S); S.Tf = 25; S.vf = 1; S.bub = []; S.arr = []; S.fanA = 0; S.boilSeen = false; S.cheerB = false; S.escF = []; },
    update(S, dt) {
      const p = S.p;
      if (p.mode === 'race') {
        const hrs = dt * p.spd / 60; const g = geo(S);
        if (S.m[0] > 0 || S.m[1] > 0) S.hr += hrs;
        for (let i = 0; i < 2; i++) {
          const c = cond(S, i), r = rate(c), dm = Math.min(S.m[i], r * hrs); S.m[i] -= dm;
          if (i === 1 && p.fac === 'humid') { if (jarDown(S)) S.RHj = Math.min(1, S.RHj + dm * .9); else S.RHj += (p.hum / 100 - S.RHj) * Math.min(1, dt * 2); }
          // escaping molecules (gross rate: under the jar they come back)
          const gross = jarDown(S) && i === 1 ? rate({ ...c, RH: p.hum / 100 }) : r;
          const K2 = cont(S, g, i), sy = K2.yb - 6 - K2.lev;
          if (S.m[i] > .05 && Math.random() < dt * clamp(gross * 1.1 * Math.sqrt(p.spd / 20), 0, 28)) S.esc[i].push({ x: K2.x + (Math.random() - .5) * (K2.bw - 14), y: sy, vy: -40 - Math.random() * 30, vx: 0, l: 2.2 });
          S.esc[i].forEach(q => { q.x += (q.vx - c.wind * 38 + Math.sin(q.l * 6) * 6) * dt; q.y += q.vy * dt; q.l -= dt;
            if (i === 1 && jarDown(S)) { const top = K2.yb - K2.bh - 50; if (q.y < top + 10 && q.vy < 0) q.vy = 35 + Math.random() * 20; if (q.vy > 0 && q.y > sy) q.l = 0; if (Math.abs(q.x - K2.x) > (K2.bw + 40) / 2 - 6) q.vx = -Math.sign(q.x - K2.x) * 30; } });
          S.esc[i] = S.esc[i].filter(q => q.l > 0 && q.x > 60);
        }
        if (S.win < 0) { const lost = S.m.map(m => M0 - m); const mx = Math.max(...lost); if (mx >= 20) { const d = lost[1] - lost[0]; S.win = Math.abs(d) < mx * .12 ? 2 : d > 0 ? 1 : 0; S.winT = S.t; if (S.win < 2) K.cheer(S, g.xs[S.win], g.yb - 160); } }
        S.fanA += (p.fac === 'wind' ? p.wind : 0) * 14 * dt;
      } else {
        const L = LIQ[p.liqF]; const loss = .035 * (S.Tf - 25);
        if (S.vf > .01) { S.Tf += (p.knob * 7 - loss) * dt; if (S.Tf >= L.Tb) { const ex = (S.Tf - L.Tb); S.Tf = L.Tb; S.vf = Math.max(0, S.vf - ex * .006 - p.knob * .004 * dt); } }
        else { S.Tf += (-loss) * dt; }
        const boiling = S.Tf >= L.Tb - .01 && p.knob > .04 && S.vf > .01; S.boiling = boiling; if (boiling) S.boilSeen = true;
        const g = geo(S), F = this.flaskGeo(S, g);
        if (boiling) { const n = dt * 34 * p.knob; for (let k = 0; k < n + (Math.random() < n % 1 ? 1 : 0); k++) { const yy = F.yb - 10 - Math.random() * (F.yb - F.ly) * .5; S.bub.push({ x: F.cx + (Math.random() - .5) * F.wAt(yy) * .8, y: yy, r: 1.5 + Math.random() * 2, vy: 50 + Math.random() * 50 }); } }
        else if (S.Tf > L.Tb - 14 && p.knob > .04 && Math.random() < dt * 8) S.bub.push({ x: F.cx + (Math.random() - .5) * F.bw * .7, y: F.yb - 8, r: 1.2, vy: 18, small: 1 });
        S.bub.forEach(b => { b.y -= b.vy * dt; b.r += (b.small ? -.25 : 5) * dt; }); S.bub = S.bub.filter(b => b.y > F.ly + 2 && b.r > .4 && b.r < 14);
        const ps = psat(L, S.Tf); if (S.vf > .01 && Math.random() < dt * (1 + 11 * Math.min(1, ps / 101.3))) S.escF.push({ x: F.cx + (Math.random() - .5) * F.wAt(F.ly) * .8, y: F.ly - 2, vy: -45 - Math.random() * 40, l: 2 });
        S.escF.forEach(q => { q.y += q.vy * dt; q.x += Math.sin(q.l * 5) * 10 * dt; q.l -= dt; }); S.escF = S.escF.filter(q => q.l > 0);
        if (S.boilSeen && !S.cheerB && S.boiling) { S.cheerB = true; K.cheer(S, F.cx, F.ly - 60); }
      }
    },
    flaskGeo(S, g) { const cx = g.x0 + (g.w - g.x0) * .64, yb = g.by - 34, h = clamp(g.h * .42, 190, 300), bw = h * .78, nw = bw * .3, nh = h * .3; const fullY = yb - (h - nh) * .62, ly = yb - (yb - fullY) * S.vf; const wAt = y => { const k = clamp((yb - y) / (h - nh), 0, 1); return bw - (bw - nw) * k; }; return { cx, yb, h, bw, nw, ly, wAt, kx: cx + bw / 2 + 36, ky: g.by - 16 }; },
    draw(ctx, w, h, S) {
      const p = S.p, g = geo(S); K.bg(ctx, w, h, { benchY: g.by }); panelVis(S);
      K.raw(ctx, () => {
        C5.tabs(ctx, S, 'mode', w - 14, 12, MODES, { bw: 138 });
        if (p.mode === 'race') this.drawRace(ctx, S, g); else this.drawBoil(ctx, S, g);
        K.party(ctx, S);
      });
    },
    drawRace(ctx, S, g) {
      const p = S.p, w = g.w, fb = clamp((w - 96) / 6 - 6, 64, 104);
      C5.tabs(ctx, S, 'fac', w - 14, 48, fb < 98 ? FACS_S : FACS, { bw: fb, c: '#7c3aed' });
      G.text(ctx, `سباق عادل: الإناءان متماثلان تماماً إلا في «${FNAME[p.fac]}»`, (g.x0 + w) / 2, 96, { s: 12.5, w: 800, c: '#4c1d95', bg: 'rgba(237,233,254,.95)' });
      // clock
      const hh = Math.floor(S.hr), mm = Math.floor((S.hr - hh) * 60);
      C5.card(ctx, g.x0 + 6, 116, 150, 44, '#0369a1'); G.text(ctx, `⏱ ${hh} h ${String(mm).padStart(2, '0')} min`, g.x0 + 81, 132, { s: 15, w: 900, c: '#0c4a6e', mono: 1 }); G.text(ctx, `(×${p.spd} دقيقة كل ثانية)`, g.x0 + 81, 150, { s: 10, w: 700, c: '#475569' });
      // factor-specific apparatus behind dishes
      const Kd = [cont(S, g, 0), cont(S, g, 1)];
      if (p.fac === 'temp') { const r = 14 + (p.tB - 10) * .35; C5.sun(ctx, Kd[1].x - 10, 200, r, S.t); G.text(ctx, 'في الظل 25 °C', Kd[0].x, Kd[0].yb - Kd[0].bh - 40, { s: 12, w: 800, c: '#475569' }); }
      for (let i = 0; i < 2; i++) {
        const D = Kd[i], L = LIQ[D.c.liq];
        K.balance(ctx, D.x, D.yb, M0 - (M0 - S.m[i]), { w: Math.max(170, D.bw + 24), label: 'ميزان رقمي' });
        K.beaker(ctx, D.x, D.yb, D.bw, D.bh, S.m[i] > .01 ? D.lev / D.bh : 0, { liq: L.col, liqA: .55 });
        if (p.mol && S.m[i] > .05) { const sy = D.yb - 4 - D.lev; ctx.save(); ctx.beginPath(); ctx.rect(D.x - D.bw / 2 + 3, sy, D.bw - 6, D.lev); ctx.clip(); const n = Math.min(40, Math.round(D.bw * D.lev / 260) + 3); for (let k = 0; k < n; k++) { const xx = D.x - D.bw / 2 + 8 + ((k * 37.7) % (D.bw - 16)), yy = sy + 5 + ((k * 13.3) % Math.max(4, D.lev - 8)); ctx.fillStyle = L.mol; ctx.globalAlpha = .55; ctx.beginPath(); ctx.arc(xx + Math.sin(S.t * 9 + k) * 2, yy + Math.cos(S.t * 11 + k) * 1.5, 2.6, 0, TAU); ctx.fill(); } ctx.globalAlpha = 1; ctx.restore(); }
        if (p.mol) S.esc[i].forEach(q => { ctx.globalAlpha = clamp(q.l, 0, 1); K.ball(ctx, q.x, q.y, 3.6, L.mol); ctx.globalAlpha = 1; });
        if (p.labels) { K.tag(ctx, i ? 'الإناء الثاني' : 'الإناء الأول', D.x, g.by + 16, { s: 12, bg: i ? '#7c3aed' : '#0369a1' }); G.text(ctx, condTxt(S, i), D.x, g.by + 38, { s: 12, w: 800, c: '#fff', bg: 'rgba(30,41,59,.75)' });
          G.text(ctx, `${L.name}: ${S.m[i].toFixed(1)} g`, D.x, D.yb - D.bh - 14, { s: 12.5, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.85)' }); }
        if (S.m[i] <= .01) G.text(ctx, 'تبخر كله! ✓', D.x, D.yb - 20, { s: 13, w: 900, c: '#fff', bg: '#16a34a' });
      }
      const D1 = Kd[1];
      if (p.fac === 'type') { const opts = [['alc', 'كحول'], ['acet', 'أسيتون'], ['oil', 'زيت'], ['water', 'ماء']]; const top = D1.yb - D1.bh - 64; opts.forEach(([k, nm], j) => { const bx = D1.x + (j - 1.5) * 50; const on = p.liqB === k; ctx.fillStyle = LIQ[k].col; ctx.globalAlpha = on ? 1 : .6; rr(ctx, bx - 12, top - 26, 24, 30, 5); ctx.fill(); ctx.fillRect(bx - 5, top - 34, 10, 9); ctx.globalAlpha = 1; ctx.strokeStyle = on ? '#4c1d95' : '#64748b'; ctx.lineWidth = on ? 3 : 1.4; rr(ctx, bx - 12, top - 26, 24, 30, 5); ctx.stroke(); G.text(ctx, nm, bx, top + 14, { s: 10.5, w: on ? 900 : 700, c: on ? '#4c1d95' : '#334155' }); });
        }
      if (p.fac === 'area') { const hx = D1.x + D1.bw / 2 + 4, hy = D1.yb - D1.bh / 2; ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(hx, hy, 9, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); G.text(ctx, '↔', hx, hy, { s: 11, w: 900, c: '#fff' });
        if (p.labels) { ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(D1.x - D1.bw / 2 + 2, D1.yb - D1.lev - 8); ctx.lineTo(D1.x + D1.bw / 2 - 2, D1.yb - D1.lev - 8); ctx.stroke(); ctx.setLineDash([]); } }
      if (p.fac === 'wind') { const fx = Math.min(w - 44, D1.x + D1.bw / 2 + 70), fy = D1.yb - D1.bh - 10; fan(ctx, fx, fy, 34, S.fanA, p.wind > 0, g.by); G.text(ctx, p.wind ? `سرعة ${p.wind}` : 'مطفأة', fx, fy - 48, { s: 11, w: 900, c: '#fff', bg: p.wind ? '#0284c7' : '#64748b' });
        if (p.windfx && p.wind > 0) { ctx.strokeStyle = 'rgba(14,165,233,.7)'; ctx.lineWidth = 2.5; for (let k = 0; k < 3 + p.wind * 2; k++) { const yy = fy - 24 + (k * 17) % 60, ph = ((S.t * (60 + 40 * p.wind) + k * 53) % 180); const x1 = fx - 40 - ph; ctx.beginPath(); ctx.moveTo(x1, yy); ctx.lineTo(x1 - 26 - p.wind * 8, yy); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x1 - 30 - p.wind * 8, yy); ctx.lineTo(x1 - 22 - p.wind * 8, yy - 4); ctx.moveTo(x1 - 30 - p.wind * 8, yy); ctx.lineTo(x1 - 22 - p.wind * 8, yy + 4); ctx.stroke(); } } }
      if (p.fac === 'temp') { const tx = Math.min(w - 50, D1.x + D1.bw / 2 + 62); C5.tSlider(ctx, tx, D1.yb - 190, D1.yb - 20, p.tB, 10, 60, { step: 10, label: 'حرارة الإناء', bd: '#ea580c' }); }
      if (p.fac === 'humid') { const jy = D1.yb - (1 - S.jar) * 150; bellJar(ctx, D1.x, jy, D1.bw + 40, D1.bh + 50, jarDown(S) ? S.RHj : 0);
        if (jarDown(S) && S.RHj > .8) { ctx.fillStyle = 'rgba(56,189,248,.7)'; for (let k = 0; k < 16 * (S.RHj - .8) / .2; k++) { const a = (k * 2.39) % 1; ctx.beginPath(); ctx.arc(D1.x - (D1.bw + 40) / 2 + 12 + a * (D1.bw + 16), jy - D1.bh - 30 + ((k * 31) % (D1.bh + 10)), 2.2, 0, TAU); ctx.fill(); } }
        if (p.labels) G.text(ctx, jarDown(S) ? `رطوبة الهواء تحت الناقوس: ${Math.round(S.RHj * 100)}%` : 'اسحب الناقوس إلى الأسفل ليغطي الإناء', D1.x, jy - D1.bh - 76, { s: 11.5, w: 800, c: '#fff', bg: '#0369a1' });
        this.hygro(ctx, g.x0 + 81, 206, p.hum); }
      if (p.fac === 'press') { const Y = syr(S, g); bellJar(ctx, Y.jx, D1.yb, Y.jw, Y.jh); ctx.fillStyle = '#475569'; rr(ctx, Y.jx - Y.jw / 2 - 8, D1.yb - 3, Y.jw + 16, 8, 3); ctx.fill();
        // syringe (piston) on top of the sealed jar
        ctx.fillStyle = 'rgba(224,242,254,.75)'; rr(ctx, Y.jx - 20, Y.b1, 40, Y.b0 - Y.b1, 6); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#64748b'; ctx.fillRect(Y.jx - 5, Y.b0, 10, Y.top - Y.b0 - 6);
        if (p.mol) { const nA = Math.round(7 * p.pres); for (let k = 0; k < nA; k++) K.ball(ctx, Y.jx - 12 + (k % 3) * 12, Y.head + 8 + ((k * 13 + S.t * 40 * (k % 2 ? 1 : -1)) % Math.max(8, Y.b0 - Y.head - 14) + 60) % Math.max(8, Y.b0 - Y.head - 14), 2.6, '#64748b'); }
        ctx.fillStyle = '#334155'; ctx.fillRect(Y.jx - 18, Y.head - 5, 36, 10); ctx.fillRect(Y.jx - 3, Y.hy, 6, Y.head - Y.hy); ctx.fillStyle = '#7c3aed'; rr(ctx, Y.jx - 26, Y.hy - 12, 52, 14, 6); ctx.fill();
        // gauge
        const gx = Y.gx, gy = Y.gy; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(Y.jx + Y.jw / 2 - 2, gy); ctx.lineTo(gx - 22, gy); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(gx, gy, 24, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.stroke(); const a = Math.PI * .8 + (p.pres - .5) / 1.5 * Math.PI * 1.4; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(a) * 18, gy + Math.sin(a) * 18); ctx.stroke();
        G.text(ctx, p.pres.toFixed(2) + ' atm', gx, gy + 36, { s: 12, w: 900, c: '#fff', bg: '#334155', mono: 1 });
        if (p.labels) G.text(ctx, 'ادفع المكبس لأسفل ← يزداد الضغط', Y.jx, Y.hy - 26, { s: 11, w: 800, c: '#4c1d95', bg: 'rgba(255,255,255,.85)' }); }
      // bars
      if (p.bars) { const bx = g.x0 + 6, by = p.fac === 'humid' ? 250 : 170, bw = 150; C5.card(ctx, bx, by, bw, 92, '#16a34a'); G.text(ctx, 'كمية التبخر (g)', bx + bw / 2, by + 13, { s: 11.5, w: 900, c: '#14532d' });
        for (let i = 0; i < 2; i++) { const v = M0 - S.m[i], yy = by + 32 + i * 28; ctx.fillStyle = '#e2e8f0'; rr(ctx, bx + 36, yy - 8, bw - 46, 16, 5); ctx.fill(); ctx.fillStyle = i ? '#7c3aed' : '#0369a1'; rr(ctx, bx + 36, yy - 8, Math.max(2, (bw - 46) * v / M0), 16, 5); ctx.fill(); G.text(ctx, i ? 'الثاني' : 'الأول', bx + 18, yy, { s: 10, w: 800, c: '#334155' }); G.text(ctx, v.toFixed(1), bx + 40 + Math.max(2, (bw - 46) * v / M0) - (v > 30 ? 34 : -4), yy, { s: 10.5, w: 900, c: v > 30 ? '#fff' : '#0f172a', a: 'left', mono: 1 }); }
        G.text(ctx, `السرعة: ${rate(cond(S, 0)).toFixed(1)} و ${rate(cond(S, 1)).toFixed(1)} g/h`, bx + bw / 2, by + 82, { s: 10, w: 800, c: '#334155' }); }
      // result bubble
      if (S.win >= 0 && S.t - S.winT < 6) { const msg = S.win === 2 ? 'تعادل! الإناءان يتبخران بالسرعة نفسها\n(لم تغيّر العامل؟)' : this.winMsg(S); const x = S.win === 2 ? (g.xs[0] + g.xs[1]) / 2 : g.xs[S.win]; K.bubble(ctx, msg, x, Kd[S.win === 2 ? 0 : S.win].yb - Kd[S.win === 2 ? 0 : S.win].bh - 34, { s: 12.5, bg: '#f0fdf4', bd: '#16a34a', c: '#14532d' }); }
    },
    winMsg(S) { const p = S.p, i = S.win, a = i === 1; return { type: `${LIQ[a ? p.liqB : 'water'].name} أسرع تبخراً! 🏆\nدرجة غليانه أوطأ`, area: 'السطح الأوسع يتبخر أسرع! 🏆', wind: 'الرياح تزيد سرعة التبخر! 🏆', temp: 'الإناء الأسخن يتبخر أسرع! 🏆', humid: 'الهواء الجاف يزيد التبخر،\nوالهواء الرطب يقلله! 🏆', press: 'الضغط الأقل ← تبخر أسرع! 🏆' }[p.fac]; },
    hygro(ctx, x, y, hum) { C5.card(ctx, x - 75, y - 30, 150, 64, '#0284c7'); G.text(ctx, 'رطوبة هواء الغرفة', x, y - 16, { s: 11, w: 900, c: '#0c4a6e' }); ctx.fillStyle = '#e0f2fe'; rr(ctx, x - 60, y - 2, 120, 12, 6); ctx.fill(); ctx.fillStyle = '#0284c7'; rr(ctx, x - 60, y - 2, 120 * hum / 100, 12, 6); ctx.fill(); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x - 60 + 120 * hum / 100, y + 4, 8, 0, TAU); ctx.fill(); ctx.stroke(); G.text(ctx, hum + ' %', x, y + 23, { s: 11.5, w: 900, c: '#0f172a', mono: 1 }); },
    drawBoil(ctx, S, g) {
      const p = S.p, L = LIQ[p.liqF], F = this.flaskGeo(S, g);
      // hot plate (like the book figure)
      const on = p.knob > .02; ctx.fillStyle = '#334155'; rr(ctx, F.cx - F.bw / 2 - 20, F.yb, F.bw + 40, 34, 8); ctx.fill(); ctx.fillStyle = '#1e293b'; rr(ctx, F.cx - F.bw / 2 - 10, F.yb - 4, F.bw + 20, 7, 3); ctx.fill();
      if (on) { ctx.strokeStyle = `rgba(239,68,68,${.35 + .6 * p.knob})`; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(F.cx, F.yb + 1, F.bw * (.18 + k * .12), 3 + k, 0, 0, TAU); ctx.stroke(); } }
      ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(F.kx, F.ky, 18, 0, TAU); ctx.fill(); const ka = -Math.PI * .75 + p.knob * Math.PI * 1.5; ctx.strokeStyle = '#facc15'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(F.kx, F.ky); ctx.lineTo(F.kx + Math.cos(ka - Math.PI / 2) * 15, F.ky + Math.sin(ka - Math.PI / 2) * 15); ctx.stroke();
      G.text(ctx, 'المسخّن ' + Math.round(p.knob * 100) + '%', F.kx, F.ky + 30, { s: 11, w: 900, c: '#fff', bg: on ? '#dc2626' : '#475569' });
      // liquid
      ctx.save(); erlen(ctx, F.cx, F.yb, F.bw, F.h, F.nw); ctx.closePath(); ctx.clip(); if (S.vf > .005) { ctx.fillStyle = L.col; ctx.globalAlpha = .5; ctx.fillRect(F.cx - F.bw, F.ly, F.bw * 2, F.yb - F.ly); ctx.globalAlpha = 1; }
      S.bub.forEach(b => { ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, TAU); ctx.fill(); ctx.stroke(); });
      if (p.windfx && S.boiling) S.bub.forEach((b, k) => { if (k % 4 === 0 && b.r > 4) G.arrow(ctx, b.x, b.y, b.x, b.y - 16, '#f97316', 2.5, 7); });
      ctx.restore();
      erlen(ctx, F.cx, F.yb, F.bw, F.h, F.nw); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.6; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(F.cx - F.bw * .36, F.yb - 14); ctx.lineTo(F.cx - F.nw * .7, F.yb - F.h * .62); ctx.stroke();
      if (S.vf > .005) { ctx.strokeStyle = shade(L.col, -30); ctx.lineWidth = 2; const hw = F.wAt(F.ly) / 2 - 2; ctx.beginPath(); ctx.moveTo(F.cx - hw, F.ly); ctx.lineTo(F.cx + hw, F.ly); ctx.stroke(); }
      // surface arrows (evaporation from the surface) + escaping molecules
      const ps = psat(L, S.Tf), nA = S.vf > .01 ? Math.round(1 + 6 * clamp(ps / 101.3, 0, 1)) : 0;
      if (p.windfx) for (let k = 0; k < nA; k++) { const ph = (S.t * .8 + k / nA) % 1, hw = F.wAt(F.ly) / 2 - 12, x = F.cx + (nA === 1 ? 0 : -hw + 2 * hw * k / (nA - 1)); ctx.globalAlpha = 1 - ph; G.arrow(ctx, x, F.ly - 4 - ph * 30, x, F.ly - 30 - ph * 30, '#f97316', 3, 9); ctx.globalAlpha = 1; }
      if (p.mol) S.escF.forEach(q => { ctx.globalAlpha = clamp(q.l, 0, 1); K.ball(ctx, q.x, q.y, 3.4, L.mol); ctx.globalAlpha = 1; });
      if (S.boiling) C5.steam(ctx, F.cx, F.yb - F.h - 4, F.nw, S.t, .9, '203,213,225');
      K.thermo(ctx, F.cx + F.nw * .18, F.yb - 22, F.h + 10, S.Tf, 0, 120, { step: 20, show: false }); G.text(ctx, S.Tf.toFixed(1) + ' °C', F.cx + F.nw * .18, F.yb - 22 - F.h - 22, { s: 13, w: 900, c: '#0f172a', mono: 1 });
      // state banner
      const st = S.vf <= .01 ? ['تبخر السائل كله!', '#475569'] : S.boiling ? [`غليان عند ${L.Tb} °C — فقاعات في السائل كله`, '#dc2626'] : [`تبخر من السطح فقط (${Math.round(S.Tf)} °C)`, '#ea580c'];
      if (p.labels) K.tag(ctx, st[0], F.cx, F.yb - F.h - 90, { s: 14, bg: st[1] });
      // comparison cards
      const cx = g.x0 + 8, cw = clamp(F.cx - F.bw / 2 - cx - 40, 150, 230), rows = [
        ['تبخر', '#ea580c', ['من سطح السائل فقط', 'في جميع درجات الحرارة', 'بطيء وهادئ'], true],
        ['غليان', '#dc2626', ['من السائل كله (فقاعات)', 'عند درجة الغليان فقط', 'سريع، ودرجة الحرارة ثابتة'], S.boiling]];
      rows.forEach((r, i) => { const y = 64 + i * 118; C5.card(ctx, cx, y, cw, 106, r[1], r[3] ? 'rgba(255,247,237,.97)' : 'rgba(255,255,255,.8)'); G.text(ctx, r[0] + (r[3] ? ' ✓ يحدث الآن' : ''), cx + cw - 12, y + 16, { s: 14, w: 900, c: r[1], a: 'right' }); r[2].forEach((t, j) => G.text(ctx, '• ' + t, cx + cw - 12, y + 42 + j * 21, { s: 11.5, w: 700, c: '#334155', a: 'right' })); });
      C5.card(ctx, cx, 300, cw, 58, '#16a34a'); G.text(ctx, 'يتشابهان: كلاهما تحوّل', cx + cw - 12, 318, { s: 11.5, w: 800, c: '#14532d', a: 'right' }); G.text(ctx, 'من سائل إلى غاز ويمتص حرارة', cx + cw - 12, 340, { s: 11.5, w: 800, c: '#14532d', a: 'right' });
      if (S.vf <= .01) G.text(ctx, 'اضغط «املأ من جديد»', F.cx, F.yb - 40, { s: 12, w: 900, c: '#fff', bg: '#475569' });
    },
    drags(S) {
      const p = S.p, g = geo(S), L = C5.tabsDrag(S, 'mode', g.w - 14, 12, MODES, { bw: 138 });
      if (p.mode === 'boil') { const F = this.flaskGeo(S, g); L.push({ id: 'knob', x: F.kx, y: F.ky, r: 24, cx: F.kx, cy: F.ky, tip: 'أدر مقبض المسخّن (أو استعمل عجلة الفأرة)', idle: 'أدر المقبض لتسخين الدورق ✋', drag: (S, d) => setParam(S, 'knob', S.p.knob + d.dang / (Math.PI * 1.5)), wheel: (S, s) => setParam(S, 'knob', S.p.knob + s * .05), click: S => setParam(S, 'knob', S.p.knob > .05 ? 0 : .8) }); return L; }
      const fb = clamp((g.w - 96) / 6 - 6, 64, 104); L.push(...C5.tabsDrag(S, 'fac', g.w - 14, 48, FACS, { bw: fb }));
      const D1 = cont(S, g, 1);
      if (p.fac === 'type') { const top = D1.yb - D1.bh - 64; [['alc'], ['acet'], ['oil'], ['water']].forEach(([k], j) => L.push({ id: 'bottle_' + k, x: D1.x + (j - 1.5) * 50, y: top - 12, w: 34, h: 44, hint: j === 1 ? undefined : false, idle: j === 1 ? 'انقر قنينة لتغيير السائل ✋' : undefined, tip: 'املأ الإناء الثاني بهذا السائل', click: S => { if (S.p.liqB !== k) setParam(S, 'liqB', k); else refill(S); } })); }
      if (p.fac === 'area') L.push({ id: 'rim', x: D1.x + D1.bw / 2 + 4, y: D1.yb - D1.bh / 2, r: 16, axis: 'x', tip: 'اسحب حافة الإناء لتوسيع سطح السائل أو تضييقه', idle: 'اسحب لتغيير اتساع السطح ✋',
        drag: (S, d) => { const g = geo(S); const half = clamp(d.ox + d.x - d.sx - 4 - g.xs[1], 20, 150); const A = ((half * 2 - 6) / g.k) ** 2; const old = S.p.area; setParam(S, 'area', A); void old; }, up: S => refill(S) });
      if (p.fac === 'wind') { const fx = Math.min(g.w - 44, D1.x + D1.bw / 2 + 70), fy = D1.yb - D1.bh - 10; L.push({ id: 'fan', x: fx, y: fy + 20, w: 60, h: 110, tip: 'انقر لتغيير سرعة المروحة (0 → 3)', idle: 'انقر المروحة ✋', click: S => setParam(S, 'wind', (S.p.wind + 1) % 4), wheel: (S, s) => setParam(S, 'wind', S.p.wind + s) }); }
      if (p.fac === 'temp') { const tx = Math.min(g.w - 50, D1.x + D1.bw / 2 + 62); L.push(C5.tSliderDrag(S, 'tB', tx, D1.yb - 190, D1.yb - 20, 10, 60, { tip: 'اسحب لتغيير درجة حرارة الإناء الثاني', idle: 'اسحب المحرار لأعلى ✋' })); }
      if (p.fac === 'humid') { const jy = D1.yb - (1 - S.jar) * 150; L.push({ id: 'jar', x: D1.x, y: jy - D1.bh - 50, r: 22, axis: 'y', tip: 'اسحب الناقوس لأعلى أو لأسفل', idle: 'اسحب الناقوس ✋', drag: (S, d) => { const g2 = geo(S), D = cont(S, g2, 1); const top0 = D.yb - D.bh - 50; S.jar = clamp(1 - (top0 - (d.oy + d.y - d.sy)) / 150, 0, 1); if (S.jar > .9) S.jar = 1; } });
        L.push({ id: 'hygro', x: g.x0 + 81, y: 210, w: 140, h: 40, axis: 'x', hint: false, tip: 'اسحب لتغيير رطوبة هواء الغرفة', drag: (S, d) => setParam(S, 'hum', (d.ox + d.x - d.sx - (g.x0 + 21)) / 120 * 100), wheel: (S, s) => setParam(S, 'hum', S.p.hum + 5 * s) }); }
      if (p.fac === 'press') { const Y = syr(S, g); L.push({ id: 'piston', x: Y.jx, y: Y.hy - 5, w: 60, h: 26, axis: 'y', tip: 'ادفع المكبس لأسفل لزيادة الضغط، واسحبه لأعلى لتقليله', idle: 'ادفع المكبس لأسفل ✋', drag: (S, d) => { const yy = d.oy + d.y - d.sy + 5 + 40; setParam(S, 'pres', 60 / clamp(Y.b0 - yy - 20, 30, 120)); }, wheel: (S, s) => setParam(S, 'pres', S.p.pres + .05 * s) }); }
      return L;
    },
    readings(S) {
      const p = S.p;
      if (p.mode === 'boil') { const L = LIQ[p.liqF]; return [rd('السائل', L.name + ` (يغلي عند ${L.Tb} °C)`), rd('درجة الحرارة', S.Tf.toFixed(1) + ' °C'), rd('ما يحدث', S.boiling ? 'غليان (فقاعات في السائل كله)' : 'تبخر من السطح فقط', 1), rd('السائل المتبقي', Math.round(S.vf * 100) + ' %')]; }
      const r0 = rate(cond(S, 0)), r1 = rate(cond(S, 1));
      return [rd('الزمن', `${Math.floor(S.hr)} h ${Math.floor((S.hr % 1) * 60)} min`), rd('الإناء الأول', condTxt(S, 0)), rd('الإناء الثاني', condTxt(S, 1)), rd('كتلة الأول', S.m[0].toFixed(1) + ' g'), rd('كتلة الثاني', S.m[1].toFixed(1) + ' g'), rd('سرعة التبخر (الأول / الثاني)', `${r0.toFixed(2)} / ${r1.toFixed(2)} g/h`, 1)];
    },
    record(S) { const p = S.p; if (p.mode !== 'race') { Runner.toast('التسجيل في «سباق التبخر»', 'info'); return null; } if (S.hr < .2) { Runner.toast('شغّل الزمن قليلاً أولاً', 'info'); return null; } return { f: FNAME[p.fac], a: condTxt(S, 0), b: condTxt(S, 1), t: +S.hr.toFixed(1), ea: +(M0 - S.m[0]).toFixed(1), eb: +(M0 - S.m[1]).toFixed(1) }; },
    cols: [['f', 'العامل'], ['a', 'الإناء الأول'], ['b', 'الإناء الثاني'], ['t', 'الزمن (h)'], ['ea', 'تبخر من الأول (g)'], ['eb', 'تبخر من الثاني (g)']],
    explain(S) {
      const p = S.p;
      if (p.mode === 'boil') { const L = LIQ[p.liqF]; if (S.vf <= .01) return 'تبخر السائل كله. املأ الدورق من جديد.'; if (S.boiling) return `<b>غليان</b>: تتكون فقاعات بخارية في <b>السائل كله</b> ترتفع إلى السطح وتنفجر. درجة الحرارة <b>ثابتة عند ${L.Tb} °C</b> (درجة الغليان) رغم استمرار التسخين حتى يتحول السائل كله إلى بخار.`; return `السائل عند <b>${Math.round(S.Tf)} °C</b>: يحدث <b>تبخر</b> من <b>السطح فقط</b>؛ الجزيئات السريعة قرب السطح تفلت إلى الهواء. التبخر يحدث في جميع درجات الحرارة ويزداد كلما سخن السائل.`; }
      const r0 = rate(cond(S, 0)), r1 = rate(cond(S, 1)), fast = r1 > r0 * 1.1 ? 'الإناء الثاني' : r0 > r1 * 1.1 ? 'الإناء الأول' : null;
      const why = { type: 'كلما كانت درجة غليان السائل واطئة كان تبخره أسرع (الكحول يغلي عند 78 °C والماء عند 100 °C).', area: 'كلما اتسع سطح السائل المعرض للهواء كان التبخر أسرع، لأن الجزيئات تغادر من السطح.', wind: 'تيارات الهواء تبعد البخار عن سطح السائل فيزداد التبخر — لذلك تجف الملابس بسرعة في الرياح.', temp: 'ارتفاع درجة الحرارة يزيد سرعة الجزيئات فيفلت عدد أكبر منها من السطح.', humid: 'إذا كثر بخار الماء في الهواء (رطوبة عالية) يقل التبخر، وتحت الناقوس يتشبع الهواء فيتوقف التبخر تقريباً.', press: 'بازدياد الضغط تقل سرعة التبخر، وبنقصانه تزداد.' }[p.fac];
      return `سرعة التبخر: الأول <b>${r0.toFixed(2)} g/h</b>، الثاني <b>${r1.toFixed(2)} g/h</b>. ${fast ? `<b>${fast}</b> يتبخر أسرع. ` : 'السرعتان متساويتان تقريباً. '}${why}`;
    },
    quiz: [
      { q: 'إناءان متماثلان فيهما الكمية نفسها من الماء والكحول تُركا في الجو. أيهما يتبخر أسرع؟', o: ['الماء', 'الكحول', 'يتبخران بالسرعة نفسها'], a: 1, why: 'الكحول أسرع تبخراً لأن درجة غليانه أوطأ من الماء (ص 82–83).' },
      { q: 'لماذا يتأخر جفاف الملابس المبللة في يوم رطب؟', o: ['لأن بخار الماء في الهواء كثير فيقل التبخر', 'لأن درجة الحرارة عالية', 'لأن الرياح قوية'], a: 0, why: 'يكون التبخر سريعاً عندما يقل بخار الماء في الهواء، وبزيادته تزداد الرطوبة فيقل التبخر (ص 84).' },
      { q: 'الماء يتبخر بدرجة:', o: ['الصفر السيليزي فقط', 'أعلى من الصفر السيليزي فقط', 'في جميع درجات الحرارة'], a: 2, why: 'التبخر يحدث باستمرار على سطح السائل في جميع درجات الحرارة (ص 83، مراجعة الفصل ص 88).' }
    ]
  });
})();

/* =====================================================================
   8) التكاثف والتسامي (ص 84–85)
   ===================================================================== */
(function () {
  const MODES = [['plate', '🍲 الوعاء البارد'], ['bottle', '🧃 قنينة الثلاجة'], ['breath', '🌬 النَّفَس شتاءً'], ['subl', '✨ التسامي']];
  const SUB = { naph: { name: 'كرات النفثالين', short: 'النفثالين', k: .03, col: '#f8fafc', smell: 1 }, camph: { name: 'الكافور', short: 'الكافور', k: .034, col: '#fefce8', smell: 1 }, dry: { name: 'الثلج الجاف', short: 'الثلج الجاف', k: .05, col: '#e0f2fe', smell: 0 } };
  const base = S => { const w = S.W, h = S.H; return { w, h, by: h * .8, x0: 70 }; };
  const gP = S => { const g = base(S); const bx = g.x0 + (g.w - g.x0) * .5, bw = 130, bh = 120, bb = g.by - 112; return { ...g, bx, bw, bh, bb, surf: bb - bh * .6, top: bb - bh, pw: 170, px: S.px * g.w, py: S.py * g.h }; };
  const gB = S => { const g = base(S); const fw = clamp((g.w - g.x0) * .26, 130, 180), fh = clamp(g.h * .52, 260, 360), fx = g.x0 + 46, fy = g.by - fh; const shelfY = fy + fh - 14; return { ...g, fx, fy, fw, fh, shelfY, rbx: g.x0 + (g.w - g.x0) * .82, cbx: S.bIn ? fx + fw / 2 : S.cbx * g.w, cby: S.bIn ? shelfY : S.cby * g.h }; };
  const gS = S => { const g = base(S); const cx = g.x0 + (g.w - g.x0) * .44; return { ...g, cx, x1: cx - 110, x2: cx + 110, py: g.by - 36, kx: cx + 190, ky: g.by - 18, nx: g.w - 70, ny: g.by - 230 }; };
  const dew = (T, rh) => { const gm = Math.log(rh / 100) + 17.625 * T / (243.04 + T); return 243.04 * gm / (17.625 - gm); };
  const panelVis = S => { const key = S.p.mode; if (S.t - (S._pv ?? -1) < .3 && S._pvk === key) return; S._pv = S.t; S._pvk = key; const show = ['mode'].concat({ plate: [], bottle: ['rh'], breath: ['air'], subl: ['sub', 'warm'] }[key]);
    (S.E?.controls || []).forEach((c, i) => { if (!c.k || c.type === 'toggle') return; const n = document.querySelector(`#ctls .ctl[data-i="${i}"]`); if (n) n.style.display = show.includes(c.k) ? '' : 'none'; }); };
  const reset = S => { S.px = .8; S.py = .3; S.Tp = 2; S.ice = 1; S.Tw = 70; S.fire = true; S.drops = []; S.fall = []; S.vm = []; S.col = 0; S.hitP = false;
    S.door = false; S.bIn = true; S.cbx = 0; S.cby = 0; S.Tb = 5; S.bd = []; S.air = []; S.wipeT = -9; S.sawDrops = false;
    S.puffs = []; S.lastBreath = -9;
    S.iceM = 1; S.pud = 0; S.sm = 1; S.fog = []; S.smellT = -9; S.waves = []; S.cheered = false; };
  /* glass bottle with water: x centre, yb bottom */
  const bottle = (ctx, x, yb, T, drops, t) => {
    const bw = 50, bh = 118; ctx.fillStyle = 'rgba(186,230,253,.55)'; rr(ctx, x - bw / 2, yb - bh, bw, bh, 12); ctx.fill();
    ctx.fillStyle = 'rgba(56,189,248,.55)'; rr(ctx, x - bw / 2 + 3, yb - bh * .78, bw - 6, bh * .78 - 3, 9); ctx.fill();
    if (T < 12) { ctx.fillStyle = `rgba(255,255,255,${clamp((12 - T) / 14, 0, .45)})`; rr(ctx, x - bw / 2, yb - bh, bw, bh, 12); ctx.fill(); }
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; rr(ctx, x - bw / 2, yb - bh, bw, bh, 12); ctx.stroke();
    ctx.fillStyle = 'rgba(186,230,253,.7)'; ctx.beginPath(); ctx.moveTo(x - bw / 2 + 8, yb - bh + 2); ctx.quadraticCurveTo(x - 10, yb - bh - 22, x - 9, yb - bh - 34); ctx.lineTo(x + 9, yb - bh - 34); ctx.quadraticCurveTo(x + 10, yb - bh - 22, x + bw / 2 - 8, yb - bh + 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#2563eb'; rr(ctx, x - 11, yb - bh - 46, 22, 13, 3); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(x - bw / 2 + 6, yb - bh + 10, 5, bh - 26);
    (drops || []).forEach(d => { const dx = x + d.u * (bw / 2 - 5), dy = yb - bh + 6 + d.v * (bh - 12); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.strokeStyle = 'rgba(14,116,144,.75)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(dx, dy, d.r * .85, d.r, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(dx - d.r * .3, dy - d.r * .35, d.r * .25, 0, TAU); ctx.fill(); });
    void t;
  };
  /* state-change map: solid, liquid, gas with the five processes */
  const stateMap = (ctx, x, y, act) => {
    const W = 236, H = 150; C5.card(ctx, x, y, W, H, '#7c3aed');
    G.text(ctx, 'تحولات حالة المادة', x + W / 2, y + 13, { s: 11.5, w: 900, c: '#4c1d95' });
    const P = { g: [x + W / 2, y + 44], s: [x + W - 40, y + H - 26], l: [x + 40, y + H - 26] };
    const arr = (a, b, lab, key, off, lx, ly) => { const on = act.includes(key), c = on ? { mel: '#ea580c', eva: '#dc2626', con: '#0284c7', fre: '#2563eb', sub: '#9333ea' }[key] : '#cbd5e1'; const [x1, y1] = P[a], [x2, y2] = P[b]; const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L * off, ny = dx / L * off;
      G.arrow(ctx, x1 + dx * .2 + nx, y1 + dy * .2 + ny, x1 + dx * .8 + nx, y1 + dy * .8 + ny, c, on ? 3.2 : 2, 8); G.text(ctx, lab, lx, ly, { s: on ? 11 : 9.5, w: on ? 900 : 700, c: on ? c : '#94a3b8' }); };
    arr('s', 'l', 'انصهار', 'mel', 6, x + W / 2, y + H - 42); arr('l', 's', 'انجماد', 'fre', 6, x + W / 2, y + H - 10);
    arr('l', 'g', 'تبخر', 'eva', 7, x + 38, y + 66); arr('g', 'l', 'تكاثف', 'con', 7, x + 96, y + 86);
    arr('s', 'g', 'تسامي', 'sub', -7, x + W - 34, y + 66);
    [['g', 'غاز', '#dc2626'], ['l', 'سائل', '#0284c7'], ['s', 'صلب', '#475569']].forEach(([k, n, c]) => G.text(ctx, n, P[k][0], P[k][1], { s: 11.5, w: 900, c: '#fff', bg: c }));
  };

  X7({ id: 'g7_condensation', ch: 15, sec: 'الدرس 2', page: 84, kind: 'نشاط', title: 'التكاثف والتسامي',
    desc: 'نضع وعاءً بارداً في طريق بخار الماء المغلي فتتكون عليه قطرات ماء (تكاثف). وتتكون قطرات على قنينة الماء البارد الخارجة من الثلاجة، ويظهر بخار من الفم في الشتاء. وبعض المواد الصلبة كالنفثالين والكافور والثلج الجاف تتحول إلى غاز مباشرة (تسامي).',
    tags: 'تكاثف تسامي بخار قطرات ندى قنينة ثلاجة شتاء زفير نفثالين كافور ثلج جاف',
    tools: ['إناء فيه ماء يغلي ومصدر حراري', 'صحن معدني بارد (عليه ثلج)', 'قنينة ماء من الثلاجة', 'كرات النفثالين، الكافور، الثلج الجاف', 'محرار'],
    steps: ['في «وعاء بارد فوق البخار»: اسحب الصحن البارد وضعه في طريق بخار الماء المغلي. ماذا تلاحظ على سطحه السفلي؟',
      'فعّل «جزيئات البخار» و«أسهم الحرارة»: جزيئات البخار تلامس السطح البارد فتفقد حرارتها وتتجمع قطرات.',
      'اترك الصحن مدة طويلة: لماذا يسخن؟ أضف ثلجاً إليه من جديد.',
      'في «قنينة من الثلاجة»: انقر باب الثلاجة، واسحب القنينة الباردة إلى الطاولة بجانب قنينة بدرجة حرارة الغرفة. غيّر رطوبة الهواء. انقر القنينة لمسحها.',
      'في «النَّفَس في الشتاء»: اسحب المحرار لتغيير درجة حرارة الجو وانقر الولد ليتنفس. متى يظهر البخار من فمه؟',
      'في «التسامي»: اختر مادة من الرف وقارنها بمكعب الجليد: هل تمر بحالة السيولة؟'],
    concl: ['التكاثف: تحول المادة من حالتها الغازية إلى حالتها السائلة، وهو عكس عملية التبخر.',
      'عند ملامسة جزيئات البخار للسطح البارد تفقد كمية الحرارة التي اكتسبتها وتتجمع وتتكاثف؛ لذلك التكاثف يبعث حرارة (يسخن الصحن، وتدفئ الغيوم الجو عند تكاثفها مطراً).',
      'تتكون قطرات الماء على السطح الخارجي لقنينة الماء البارد، وقطرات الندى على الأشجار والسيارات صباحاً، بسبب تكاثف بخار الماء الموجود في الهواء.',
      'التسامي: تحول المادة من الحالة الصلبة إلى الحالة الغازية دون المرور بحالة السيولة، مثل النفثالين والكافور والمسك والعنبر والمعطرات والثلج الجاف.'],
    laws: ['g7_states'],
    fact: ['الغيوم بخار ماء في أعالي الجو، وعند تكاثفها وتحولها إلى مطر تجعل الجو أكثر دفئاً (ص 84).', 'الثلج الجاف هو ثنائي أوكسيد الكربون الصلب، يتسامى عند نحو −78 °C فيكوّن ضباباً أبيض كثيفاً.', 'نشمّ رائحة المعطرات الصلبة في الحمامات والسيارات لأنها تتسامى (ص 85).'],
    controls: [
      SEL('mode', 'المشهد', MODES, 'plate'),
      R('rh', 'رطوبة هواء الغرفة', 20, 95, 60, 5, '%'),
      R('air', 'درجة حرارة الجو', -10, 40, 2, 1, '°C'),
      SEL('sub', 'المادة المتسامية', [['naph', 'نفثالين'], ['camph', 'كافور'], ['dry', 'ثلج جاف']], 'naph', (v, S) => { S.sm = 1; S.iceM = 1; S.pud = 0; S.fog = []; S.waves = []; }),
      R('warm', 'درجة حرارة الصفيحة', 15, 60, 25, 1, '°C'),
      BT('', [{ t: '🧊 أضف ثلجاً إلى الصحن', on: S => { S.ice = 1; S.Tp = 2; } }, { t: '↻ ابدأ من جديد', on: S => reset(S) }]),
      TG('mol', 'جزيئات البخار', true, null, 'atom'), TG('heat', 'أسهم الحرارة', true, null, 'heat'),
      TG('map', 'خريطة تحولات الحالة', true, null, 'schematic'), TG('labels', 'القيم والأسماء', true, null, 'labels')],
    setup(S) { reset(S); },
    update(S, dt) {
      const p = S.p, m = p.mode;
      if (m === 'plate') {
        const g = gP(S);
        S.Tw = S.fire ? Math.min(100, S.Tw + 9 * dt) : Math.max(25, S.Tw - 1.5 * dt);
        const steam = S.fire && S.Tw >= 100 ? 1 : clamp((S.Tw - 50) / 50, 0, 1) * .25;
        const ov = clamp(1 - Math.abs(g.px - g.bx) / (g.pw / 2 + 30), 0, 1), dist = g.top - g.py, near = dist > 0 && dist < 360 ? 1 - dist / 380 : 0;
        const cr = steam * ov * near * clamp((95 - S.Tp) / 90, 0, 1); S.cr = cr;
        if (cr > .08 && !S.hitP) S.hitP = true;
        if (S.ice > 0) { S.ice = Math.max(0, S.ice - cr * .035 * dt); S.Tp = 2 + (1 - S.ice) * 2; } else S.Tp += (cr * 9 - (S.Tp - 25) * .02) * dt;
        if (Math.random() < cr * 14 * dt && S.drops.length < 70) S.drops.push({ dx: (Math.random() - .5) * (g.pw - 20), r: 1 });
        S.drops.forEach(d => { d.r += cr * (1 + Math.random()) * dt * 1.2; if (d.r > 6.2) { d.dead = 1; S.fall.push({ x: g.px + d.dx, y: g.py + 5, vy: 0 }); S.col++; if (S.col === 6 && !S.cheered) { S.cheered = true; K.cheer(S, g.px, g.py - 30); } } }); S.drops = S.drops.filter(d => !d.dead);
        S.fall.forEach(f => { f.vy += 900 * dt; f.y += f.vy * dt; if (Math.abs(f.x - g.bx) < g.bw / 2 && f.y > g.surf && f.y < g.bb) f.dead = 1; if (f.y > g.by) f.dead = 1; }); S.fall = S.fall.filter(f => !f.dead);
        if (Math.random() < steam * 16 * dt) S.vm.push({ x: g.bx + (Math.random() - .5) * (g.bw - 20), y: g.surf, vx: (Math.random() - .5) * 40, vy: -100 - Math.random() * 60, l: 3.2 });
        S.vm.forEach(q => { q.x += (q.vx + Math.sin(q.l * 7) * 30) * dt; q.y += q.vy * dt; q.l -= dt; if (Math.abs(q.x - g.px) < g.pw / 2 && q.y < g.py + 5 && q.y > g.py - 14 && S.Tp < 90) q.l = 0; }); S.vm = S.vm.filter(q => q.l > 0);
      } else if (m === 'bottle') {
        const g = gB(S), Td = dew(25, p.rh);
        if (S.bIn) { S.Tb += (5 - S.Tb) * Math.min(1, dt / 3); } else S.Tb += (25 - S.Tb) * Math.min(1, dt / 30);
        const d = Td - S.Tb, out = !S.bIn;
        if (out && d > 0) { if (Math.random() < d * 1.6 * dt && S.bd.length < 90) S.bd.push({ u: Math.random() * 2 - 1, v: .12 + Math.random() * .85, r: .8 }); S.bd.forEach(q => { q.r += d * .045 * dt * (1 + Math.random()); if (q.r > 4.2) { q.v += dt * .5; } }); S.sawDrops = S.sawDrops || S.bd.length > 20; if (S.bd.length > 20 && !S.cheered) { S.cheered = true; K.cheer(S, g.cbx, g.cby - 150); } }
        else if (out) S.bd.forEach(q => { q.r -= .08 * dt; });
        S.bd = S.bd.filter(q => q.r > .3 && q.v < 1.02);
        const nA = Math.round(8 + p.rh * .3); while (S.air.length < nA) S.air.push({ x: g.fx + g.fw + 20 + Math.random() * (g.w - g.fx - g.fw - 40), y: g.fy + Math.random() * (g.by - g.fy - 10), a: Math.random() * TAU }); S.air.length = Math.min(S.air.length, nA);
        S.air.forEach(q => { q.a += (Math.random() - .5) * 2; q.x += Math.cos(q.a) * 60 * dt; q.y += Math.sin(q.a) * 60 * dt; if (q.x < g.fx + g.fw + 10 || q.x > g.w - 10) q.a = Math.PI - q.a; if (q.y < g.fy || q.y > g.by - 6) q.a = -q.a; q.x = clamp(q.x, g.fx + g.fw + 10, g.w - 10); q.y = clamp(q.y, g.fy, g.by - 6);
          if (out && d > 0 && Math.abs(q.x - g.cbx) < 32 && q.y > g.cby - 150 && q.y < g.cby) { q.x = g.w - 20; q.flash = .4; } });
      } else if (m === 'breath') {
        if (S.t - S.lastBreath > 3.2) this.breathe(S);
        S.puffs.forEach(q => { q.x += q.vx * dt; q.vx *= (1 - .8 * dt); q.y -= 6 * dt; q.r += 20 * dt; q.l -= dt; }); S.puffs = S.puffs.filter(q => q.l > 0);
      } else {
        const sb = SUB[p.sub], f = 1 + (p.warm - 25) / 25;
        if (S.iceM > 0) { const dm = Math.min(S.iceM, (.036 * f) * dt); S.iceM -= dm; S.pud += dm; } S.pud = Math.max(0, S.pud - .003 * f * dt);
        if (S.sm > 0) { S.sm = Math.max(0, S.sm - sb.k * (p.sub === 'dry' ? 1 : f) * dt); }
        const g = gS(S);
        if (S.sm > 0 && p.sub === 'dry' && Math.random() < dt * 14) S.fog.push({ x: g.x2 + (Math.random() - .5) * 60, y: g.py - 26, vx: (Math.random() - .5) * 70, vy: -8, r: 10 + Math.random() * 10, l: 3 });
        S.fog.forEach(q => { q.x += q.vx * dt; q.y += q.vy * dt; if (q.y < g.py + 18) q.vy += 30 * dt; else { q.vy = 0; q.y = g.py + 18; } q.r += 7 * dt; q.l -= dt; }); S.fog = S.fog.filter(q => q.l > 0);
        if (S.sm > 0 && sb.smell && Math.random() < dt * .9) S.waves.push({ d: 0 });
        S.waves.forEach(q => { q.d += 110 * dt; }); const reach = g.nx - 40 - g.x2; if (S.waves.some(q => q.d > reach && !q.hit)) { S.waves.forEach(q => { if (q.d > reach) q.hit = 1; }); S.smellT = S.t; } S.waves = S.waves.filter(q => q.d < reach + 30);
        if (S.sm <= 0 && !S.cheered) { S.cheered = true; K.cheer(S, g.x2, g.py - 80); }
      }
    },
    breathe(S) { S.lastBreath = S.t; const g = base(S), kx = g.x0 + (g.w - g.x0) * .28, ky = g.by - 150; for (let k = 0; k < 14; k++) S.puffs.push({ x: kx + 30, y: ky + 42 + (Math.random() - .5) * 6, vx: 90 + Math.random() * 70 + k * 6, r: 6 + Math.random() * 4, l: 2.6 + Math.random() * .8, s: Math.random() }); },
    draw(ctx, w, h, S) {
      const p = S.p, m = p.mode; panelVis(S);
      if (m === 'breath') { const T = p.air, cold = clamp((15 - T) / 25, 0, 1); K.bg(ctx, w, h, { benchY: h * .8, bench: false, tiles: false, top: T > 25 ? '#fde68a' : cold > .5 ? '#cbd5e1' : '#bae6fd', bottom: T > 25 ? '#fef9c3' : '#f1f5f9' }); }
      else K.bg(ctx, w, h, { benchY: h * .8 });
      K.raw(ctx, () => {
        if (m === 'plate') this.drawPlate(ctx, S); else if (m === 'bottle') this.drawBottle(ctx, S); else if (m === 'breath') this.drawBreath(ctx, S); else this.drawSubl(ctx, S);
        C5.tabs(ctx, S, 'mode', w - 14, 12, MODES, { bw: clamp((w - 90) / 4 - 6, 96, 132) });
        if (p.map) stateMap(ctx, 76, 52, m === 'subl' ? ['sub', 'mel'] : ['con']);
        K.party(ctx, S);
      });
    },
    drawPlate(ctx, S) {
      const p = S.p, g = gP(S);
      // burner + tripod + beaker of boiling water
      K.burner(ctx, g.bx, g.by - 44, S.fire ? 1 : 0, S.t);
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.bx - 80, g.by - 2); ctx.lineTo(g.bx - 62, g.bb + 4); ctx.moveTo(g.bx + 80, g.by - 2); ctx.lineTo(g.bx + 62, g.bb + 4); ctx.stroke(); ctx.fillStyle = '#64748b'; ctx.fillRect(g.bx - 78, g.bb, 156, 6);
      K.beaker(ctx, g.bx, g.bb, g.bw, g.bh, .6, { liq: '#38bdf8', liqA: .5 });
      if (S.Tw >= 100 && S.fire) for (let k = 0; k < 14; k++) { const ph = (S.t * .9 + k * .137) % 1, x = g.bx - g.bw / 2 + 12 + ((k * 37) % (g.bw - 24)), y = g.bb - 6 - ph * (g.bb - 6 - g.surf); ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(x, y, 2 + ph * 4, 0, TAU); ctx.stroke(); }
      const steamA = S.fire && S.Tw >= 100 ? 1 : .2; C5.steam(ctx, g.bx, g.top - 6, g.bw * .6, S.t, steamA * 1.6, '148,163,184');
      if (p.mol) S.vm.forEach(q => K.ball(ctx, q.x, q.y, 3.2, '#2563eb'));
      // falling drops
      S.fall.forEach(f => { ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.moveTo(f.x, f.y - 7); ctx.quadraticCurveTo(f.x + 5, f.y + 1, f.x, f.y + 4); ctx.quadraticCurveTo(f.x - 5, f.y + 1, f.x, f.y - 7); ctx.fill(); });
      // cold plate with ice
      const x0 = g.px - g.pw / 2, pt = g.py - 14; const mg = ctx.createLinearGradient(0, pt, 0, g.py); mg.addColorStop(0, '#f1f5f9'); mg.addColorStop(1, '#94a3b8'); ctx.fillStyle = mg; rr(ctx, x0, pt, g.pw, 14, 6); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.stroke();
      if (S.Tp > 40) { ctx.fillStyle = `rgba(239,68,68,${clamp((S.Tp - 40) / 120, 0, .45)})`; rr(ctx, x0, pt, g.pw, 14, 6); ctx.fill(); }
      const nI = Math.ceil(S.ice * 4); for (let k = 0; k < nI; k++) { const cs = 24 * (k === nI - 1 ? clamp(S.ice * 4 - k, .4, 1) : 1); ctx.fillStyle = 'rgba(240,249,255,.95)'; ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.6; rr(ctx, g.px - 58 + k * 30, pt - cs, cs, cs, 5); ctx.fill(); ctx.stroke(); }
      S.drops.forEach(d => { const x = g.px + d.dx; ctx.fillStyle = 'rgba(224,242,254,.95)'; ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.ellipse(x, g.py + d.r * .6, d.r * .9, d.r, 0, 0, TAU); ctx.fill(); ctx.stroke(); });
      if (p.heat && S.cr > .05) for (let k = -1; k <= 1; k++) C5.heatArrow(ctx, g.px + k * 45, g.py + 60, g.px + k * 45, g.py + 10, S.t + k, '#f97316');
      if (p.labels) {
        K.tag(ctx, `الصحن البارد ${Math.round(S.Tp)} °C`, g.px, pt - 50, { s: 12.5, bg: S.Tp > 40 ? '#dc2626' : '#0369a1' });
        if (S.cr > .05 && p.heat) G.text(ctx, 'البخار يفقد حرارته للصحن فيتكاثف', g.px, g.py + 80, { s: 11.5, w: 800, c: '#9a3412', bg: 'rgba(255,255,255,.85)' });
        K.tag(ctx, S.fire ? (S.Tw >= 100 ? 'ماء يغلي 100 °C' : `ماء ${Math.round(S.Tw)} °C`) : 'المصدر مطفأ (انقره)', g.bx, g.by + 22, { s: 11.5, bg: '#b45309' });
        C5.card(ctx, g.w - 190, g.by - 96, 176, 60, '#0284c7'); G.text(ctx, 'قطرات تكاثفت وسقطت', g.w - 102, g.by - 80, { s: 11, w: 800, c: '#0c4a6e' }); G.text(ctx, String(S.col), g.w - 102, g.by - 56, { s: 20, w: 900, c: '#0284c7', mono: 1 });
        if (S.ice <= 0 && S.Tp > 70) G.text(ctx, 'سخن الصحن فقلّ التكاثف — أضف ثلجاً!', g.px, pt - 78, { s: 12, w: 900, c: '#fff', bg: '#dc2626' });
      }
    },
    drawBottle(ctx, S) {
      const p = S.p, g = gB(S), Td = dew(25, p.rh);
      // fridge
      const { fx, fy, fw, fh } = g; ctx.fillStyle = '#f8fafc'; rr(ctx, fx, fy, fw, fh, 12); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.stroke();
      if (S.door) { ctx.fillStyle = '#dbeafe'; rr(ctx, fx + 8, fy + 8, fw - 16, fh - 16, 8); ctx.fill(); ctx.fillStyle = '#bfdbfe'; ctx.fillRect(fx + 8, fy + 8, fw - 16, fh * .28); G.text(ctx, 'المجمّد −18 °C', fx + fw / 2, fy + 24, { s: 10.5, w: 800, c: '#1e3a8a' }); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(fx + 8, g.shelfY); ctx.lineTo(fx + fw - 8, g.shelfY); ctx.stroke(); G.text(ctx, '5 °C', fx + 26, g.shelfY - 14, { s: 11, w: 900, c: '#1e40af' });
        ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx - 36, fy + 14); ctx.lineTo(fx - 36, fy + fh - 10); ctx.lineTo(fx, fy + fh); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.stroke(); }
      else { ctx.strokeStyle = '#94a3b8'; ctx.beginPath(); ctx.moveTo(fx, fy + fh * .32); ctx.lineTo(fx + fw, fy + fh * .32); ctx.stroke(); ctx.fillStyle = '#64748b'; rr(ctx, fx + fw - 22, fy + fh * .42, 8, 60, 4); ctx.fill(); rr(ctx, fx + fw - 22, fy + fh * .12, 8, 36, 4); ctx.fill(); G.text(ctx, 'الثلاجة', fx + fw / 2, fy + fh * .7, { s: 13, w: 900, c: '#475569' }); }
      // bottles
      bottle(ctx, g.rbx, g.by, 25, [], S.t);
      if (!S.bIn || S.door) bottle(ctx, g.cbx, g.cby, S.Tb, S.bd, S.t);
      if (S.t - S.wipeT < .6) { ctx.fillStyle = '#fca5a5'; rr(ctx, g.cbx - 34, g.cby - 60 - (S.t - S.wipeT) * 80, 68, 26, 6); ctx.fill(); G.text(ctx, 'مسح', g.cbx, g.cby - 47 - (S.t - S.wipeT) * 80, { s: 11, w: 900, c: '#7f1d1d' }); }
      if (p.mol) S.air.forEach(q => { K.ball(ctx, q.x, q.y, 3, '#60a5fa'); });
      if (p.heat && !S.bIn && Td > S.Tb) for (let k = -1; k <= 1; k += 2) C5.heatArrow(ctx, g.cbx + k * 80, g.cby - 70, g.cbx + k * 32, g.cby - 70, S.t, '#f97316');
      if (p.labels) {
        K.tag(ctx, 'بدرجة حرارة الغرفة 25 °C', g.rbx, g.by + 18, { s: 11.5, bg: '#475569' }); G.text(ctx, 'جافة', g.rbx, g.by - 180, { s: 12, w: 900, c: '#475569' });
        if (!S.bIn || S.door) { K.tag(ctx, `القنينة الباردة ${Math.round(S.Tb)} °C`, g.cbx, g.cby - 182, { s: 12, bg: S.Tb < Td ? '#0369a1' : '#475569' }); if (!S.bIn) K.tag(ctx, S.Tb < Td ? (S.bd.length ? 'قطرات ماء تتكوّن عليها! 💧' : 'ستتكوّن قطرات…') : (S.bd.length ? 'القطرات تتبخر' : 'لا قطرات — سطحها لم يعد بارداً كفاية'), g.cbx, g.by + 18, { s: 11.5, bg: S.Tb < Td ? '#0284c7' : '#64748b' }); }
        if (!S.door && S.bIn) G.text(ctx, 'انقر الباب لفتح الثلاجة', fx + fw / 2, fy + fh * .82, { s: 11, w: 800, c: '#fff', bg: '#0369a1' });
      }
      // hygrometer
      const hx = g.w - 100, hy = 110; C5.card(ctx, hx - 80, hy - 30, 160, 66, '#0284c7'); G.text(ctx, 'رطوبة هواء الغرفة', hx, hy - 16, { s: 11, w: 900, c: '#0c4a6e' }); ctx.fillStyle = '#e0f2fe'; rr(ctx, hx - 62, hy - 2, 124, 12, 6); ctx.fill(); ctx.fillStyle = '#0284c7'; rr(ctx, hx - 62, hy - 2, 124 * p.rh / 100, 12, 6); ctx.fill(); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(hx - 62 + 124 * p.rh / 100, hy + 4, 8, 0, TAU); ctx.fill(); ctx.stroke(); G.text(ctx, p.rh + ' %  (هواء 25 °C)', hx, hy + 24, { s: 11, w: 900, c: '#0f172a' });
    },
    drawBreath(ctx, S) {
      const p = S.p, g = base(S), T = p.air, vis = clamp((12 - T) / 12, 0, 1);
      // ground
      const gy = g.by; ctx.fillStyle = T <= 0 ? '#f8fafc' : T > 25 ? '#bef264' : '#86efac'; ctx.fillRect(0, gy, g.w, g.h - gy); ctx.fillStyle = 'rgba(0,0,0,.06)'; ctx.fillRect(0, gy, g.w, 4);
      if (T > 25) C5.sun(ctx, g.w * .55, 120, 30, S.t); else { C5.cloud(ctx, g.w * .45, 110, 28, T < 5 ? '#e2e8f0' : '#fff'); C5.cloud(ctx, g.w * .72, 150, 20, '#fff'); }
      // tree
      const tx = g.w * .7; ctx.fillStyle = '#92400e'; ctx.fillRect(tx - 8, gy - 120, 16, 120); ctx.fillStyle = T <= 0 ? '#e2e8f0' : '#22c55e'; [[0, -150, 50], [-36, -120, 36], [36, -122, 38]].forEach(([a, b, r]) => { ctx.beginPath(); ctx.arc(tx + a, gy + b, r, 0, TAU); ctx.fill(); });
      if (T <= 0) C5.snow(ctx, g.w, gy, S.t, 45);
      // kid (scarf + hat when cold)
      const kx = g.x0 + (g.w - g.x0) * .28, ky = g.by - 150, s = 1.7; K.mascot(ctx, kx, ky, s, 'wow');
      if (T < 12) { ctx.fillStyle = '#dc2626'; rr(ctx, kx - 22 * s, ky + 34 * s, 44 * s, 8 * s, 4); ctx.fill(); ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(kx, ky + 8 * s, 21 * s, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(kx, ky - 15 * s, 5 * s, 0, TAU); ctx.fill(); }
      ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(kx - 20, ky + 60 * s); ctx.lineTo(kx - 26, g.by); ctx.moveTo(kx + 20, ky + 60 * s); ctx.lineTo(kx + 26, g.by); ctx.stroke();
      // breath puffs
      S.puffs.forEach(q => { const a = clamp(q.l / 2.4, 0, 1); if (vis > 0) { ctx.fillStyle = `rgba(255,255,255,${(.88 * vis * a).toFixed(3)})`; ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, TAU); ctx.fill(); ctx.strokeStyle = `rgba(148,163,184,${(.35 * vis * a).toFixed(3)})`; ctx.lineWidth = 1; ctx.stroke(); }
        if (p.mol) { const n = 3; for (let k = 0; k < n; k++) { const an = q.s * 9 + k * 2.1 + S.t * (vis > .3 ? .5 : 3), rr2 = vis > .3 ? 3 + k : q.r * .8; ctx.globalAlpha = a; K.ball(ctx, q.x + Math.cos(an) * rr2, q.y + Math.sin(an) * rr2, 2.6, '#2563eb'); ctx.globalAlpha = 1; } } });
      if (p.heat && S.puffs.length && T < 30) C5.heatArrow(ctx, kx + 120, ky + 10, kx + 120, ky - 40, S.t, '#f97316');
      // air thermometer slider
      C5.tSlider(ctx, g.w - 64, g.h * .3, g.by - 30, T, -10, 40, { step: 10, label: 'حرارة الجو', bd: T < 12 ? '#0284c7' : '#ea580c' });
      if (p.labels) {
        K.tag(ctx, 'هواء الزفير دافئ (≈ 35 °C) وفيه بخار ماء', kx, ky - 30, { s: 11.5, bg: '#b45309' });
        K.tag(ctx, vis > .15 ? 'يظهر «بخار» من الفم: بخار الماء برد فتكاثف قطيرات صغيرة ☁' : 'الجو دافئ: بخار الماء لا يتكاثف فلا نراه', (g.x0 + g.w) / 2 - 20, g.by + 26, { s: 12.5, bg: vis > .15 ? '#0284c7' : '#64748b' });
        if (p.heat && S.puffs.length && T < 30) G.text(ctx, 'يفقد حرارته للهواء البارد', kx + 120, ky - 54, { s: 11, w: 800, c: '#9a3412', bg: 'rgba(255,255,255,.85)' });
      }
    },
    drawSubl(ctx, S) {
      const p = S.p, g = gS(S), sb = SUB[p.sub];
      // hot plate
      const on = p.warm > 26; ctx.fillStyle = '#334155'; rr(ctx, g.cx - 200, g.py, 400, 34, 8); ctx.fill(); ctx.fillStyle = on ? `rgba(239,68,68,${.25 + (p.warm - 25) / 50})` : '#475569'; rr(ctx, g.cx - 190, g.py - 5, 380, 8, 4); ctx.fill();
      ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(g.kx, g.ky, 15, 0, TAU); ctx.fill(); const ka = -Math.PI * .75 + (p.warm - 15) / 45 * Math.PI * 1.5 - Math.PI / 2; ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(g.kx, g.ky); ctx.lineTo(g.kx + Math.cos(ka) * 12, g.ky + Math.sin(ka) * 12); ctx.stroke();
      G.text(ctx, `الصفيحة ${Math.round(p.warm)} °C`, g.kx - 70, g.ky, { s: 12, w: 900, c: '#fff' });
      // dishes
      const dish = x => { ctx.fillStyle = 'rgba(224,242,254,.6)'; ctx.beginPath(); ctx.ellipse(x, g.py - 8, 70, 13, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.stroke(); };
      dish(g.x1); dish(g.x2);
      // ice (left): melts into a puddle
      if (S.pud > .005) { ctx.fillStyle = 'rgba(56,189,248,.55)'; ctx.beginPath(); ctx.ellipse(g.x1, g.py - 8, 12 + 52 * Math.sqrt(S.pud), 4 + 7 * Math.sqrt(S.pud), 0, 0, TAU); ctx.fill(); }
      if (S.iceM > 0) { const cs = 44 * Math.cbrt(S.iceM); ctx.fillStyle = 'rgba(240,249,255,.95)'; ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.8; rr(ctx, g.x1 - cs / 2, g.py - 10 - cs, cs, cs, cs * .18); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(g.x1 - cs * .3, g.py - 10 - cs * .85, cs * .25, cs * .1); }
      // sublimating solid (right)
      if (S.sm > 0) { const k = Math.cbrt(S.sm);
        if (p.sub === 'naph') [[-24, 0], [0, -4], [24, 0], [-12, -22], [12, -22]].forEach(([a, b]) => K.ball(ctx, g.x2 + a * k, g.py - 20 * k - 4 + b * k, 12 * k, '#f1f5f9'));
        else if (p.sub === 'camph') [[-20, 0], [20, 0], [0, -14]].forEach(([a, b]) => { ctx.fillStyle = '#fefce8'; ctx.strokeStyle = '#a8a29e'; ctx.lineWidth = 1.5; rr(ctx, g.x2 + a * k - 17 * k, g.py - 14 - 14 * k + b * k, 34 * k, 14 * k, 5); ctx.fill(); ctx.stroke(); });
        else [[-22, 0], [8, -2], [26, 2], [-6, -18]].forEach(([a, b]) => { ctx.fillStyle = '#f0f9ff'; ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 1.5; rr(ctx, g.x2 + a * k - 13 * k, g.py - 10 - 22 * k + b * k, 26 * k, 22 * k, 4); ctx.fill(); ctx.stroke(); }); }
      S.fog.forEach(q => { ctx.fillStyle = `rgba(241,245,249,${(.7 * clamp(q.l / 2, 0, 1)).toFixed(3)})`; ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, TAU); ctx.fill(); ctx.strokeStyle = `rgba(148,163,184,${(.3 * clamp(q.l / 2, 0, 1)).toFixed(3)})`; ctx.lineWidth = 1; ctx.stroke(); });
      if (S.sm > 0) { C5.steam(ctx, g.x2, g.py - 40, 60, S.t, p.sub === 'dry' ? .8 : .45, '148,163,184'); if (p.mol) for (let k = 0; k < 9; k++) { const ph = (S.t * .5 + k / 9) % 1; ctx.globalAlpha = 1 - ph; K.ball(ctx, g.x2 - 40 + ((k * 23) % 80) + Math.sin(ph * 8 + k) * 8, g.py - 30 - ph * 150, 3.2, '#9333ea'); ctx.globalAlpha = 1; } }
      if (p.mol && S.pud > .01) for (let k = 0; k < 3; k++) { const ph = (S.t * .3 + k / 3) % 1; ctx.globalAlpha = 1 - ph; K.ball(ctx, g.x1 - 20 + k * 20, g.py - 14 - ph * 80, 3, '#2563eb'); ctx.globalAlpha = 1; }
      // smell waves + nose
      if (sb.smell && S.sm > 0) S.waves.forEach(q => { ctx.strokeStyle = `rgba(147,51,234,${(.55 * (1 - q.d / (g.nx - g.x2))).toFixed(3)})`; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(g.x2, g.py - 60, q.d, -.5, .2); ctx.stroke(); });
      K.mascot(ctx, g.nx, g.ny, 1.3, S.t - S.smellT < 1.5 ? 'wow' : 'happy');
      if (S.t - S.smellT < 2.2) K.bubble(ctx, `أشمّ رائحة ${sb.short}! 👃`, g.nx - 10, g.ny - 6, { s: 12.5, side: 'l' });
      // shelf with jars (click to choose)
      const jy = 118; Object.keys(SUB).forEach((k, j) => { const x = g.w - 50 - j * 62, on = p.sub === k; ctx.fillStyle = on ? '#ede9fe' : 'rgba(255,255,255,.85)'; rr(ctx, x - 26, jy - 34, 52, 46, 8); ctx.fill(); ctx.strokeStyle = on ? '#7c3aed' : '#94a3b8'; ctx.lineWidth = on ? 3 : 1.5; ctx.stroke(); ctx.fillStyle = SUB[k].col; ctx.fillRect(x - 16, jy - 22, 32, 28); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.strokeRect(x - 16, jy - 22, 32, 28); ctx.fillStyle = '#7c3aed'; ctx.fillRect(x - 18, jy - 30, 36, 8); G.text(ctx, SUB[k].short, x, jy + 24, { s: 10.5, w: on ? 900 : 700, c: on ? '#4c1d95' : '#334155' }); });
      ctx.fillStyle = '#a16207'; ctx.fillRect(g.w - 214, jy + 12, 196, 5);
      if (p.labels) {
        K.tag(ctx, S.iceM > 0 ? 'جليد: ينصهر إلى ماء (سائل) أولاً' : 'الجليد صار ماءً (سائلاً)', g.x1, g.py + 52, { s: 11.5, bg: '#0284c7' });
        K.tag(ctx, S.sm > 0 ? `${sb.name}: يتحول إلى غاز مباشرة — لا سائل!` : `اختفى ${sb.short} كله دون أن يبقى أثر!`, g.x2, g.py + 78, { s: 11.5, bg: '#9333ea' });
        G.text(ctx, '(الزمن مُسرَّع)', g.cx, g.py + 102, { s: 11, w: 700, c: '#fff' });
      }
    },
    drags(S) {
      const p = S.p, m = p.mode, g0 = base(S), L = C5.tabsDrag(S, 'mode', g0.w - 14, 12, MODES, { bw: clamp((g0.w - 90) / 4 - 6, 96, 132) });
      if (m === 'plate') { const g = gP(S);
        L.push({ id: 'plate', x: g.px, y: g.py - 10, w: g.pw, h: 40, axis: 'xy', tip: 'اسحب الصحن البارد وضعه فوق بخار الماء المغلي', idle: 'ضع الصحن البارد فوق البخار ✋', drag: (S, d) => { const g = base(S); S.px = clamp(d.ox + d.x - d.sx, g.x0 + 90, g.w - 90) / g.w; S.py = clamp(d.oy + d.y - d.sy + 10, 150, gP(S).top - 20) / g.h; } });
        L.push({ id: 'burner', x: g.bx, y: g.by - 30, w: 50, h: 50, hint: false, tip: 'انقر لإشعال المصدر الحراري أو إطفائه', click: S => { S.fire = !S.fire; } }); }
      if (m === 'bottle') { const g = gB(S);
        L.push({ id: 'door', x: g.fx + g.fw / 2, y: g.fy + g.fh * .2, w: g.fw, h: g.fh * .3, tip: 'انقر لفتح باب الثلاجة أو غلقه', idle: 'انقر لفتح الثلاجة ✋', click: S => { S.door = !S.door; } });
        if (!S.bIn || S.door) L.push({ id: 'coldbottle', x: g.cbx, y: g.cby - 70, w: 60, h: 150, axis: 'xy', hint: S.door ? undefined : false, idle: 'اسحب القنينة الباردة إلى الطاولة ✋', tip: 'اسحب القنينة الباردة (وانقرها لمسح القطرات)',
          down: S => { S._bm = false; }, drag: (S, d) => { S._bm = true; S.bIn = false; const g = gB(S); S.cbx = clamp(d.ox + d.x - d.sx, g.x0 + 30, g.w - 30) / g.w; S.cby = clamp(d.oy + d.y - d.sy + 70, 200, g.by) / g.h; },
          up: S => { if (!S._bm) return; const g = gB(S); if (S.door && g.cbx < g.fx + g.fw && g.cby < g.by - 20) { S.bIn = true; S.cbx = (g.fx + g.fw / 2) / g.w; S.cby = g.shelfY / g.h; } else { S.bIn = false; S.cby = g.by / g.h; } },
          click: S => { const g = gB(S); if (S.bIn) { S.bIn = false; S.cbx = (g.fx + g.fw + 80) / g.w; S.cby = g.by / g.h; } else { S.bd = []; S.wipeT = S.t; } } });
        L.push({ id: 'hygro', x: g.w - 100, y: 114, w: 150, h: 40, axis: 'x', hint: false, tip: 'اسحب لتغيير رطوبة هواء الغرفة', drag: (S, d) => setParam(S, 'rh', (d.ox + d.x - d.sx - (g.w - 162)) / 124 * 100), wheel: (S, s) => setParam(S, 'rh', S.p.rh + 5 * s) }); }
      if (m === 'breath') { const kx = g0.x0 + (g0.w - g0.x0) * .28, ky = g0.by - 150;
        L.push({ id: 'kid', x: kx, y: ky + 40, w: 90, h: 150, tip: 'انقر ليتنفس الولد (زفير)', idle: 'انقر الولد ليتنفس ✋', click: S => this.breathe(S) });
        L.push(C5.tSliderDrag(S, 'air', g0.w - 64, g0.h * .3, g0.by - 30, -10, 40, { tip: 'اسحب لتغيير درجة حرارة الجو', idle: 'اسحب المحرار ✋', hint: false })); }
      if (m === 'subl') { const g = gS(S);
        Object.keys(SUB).forEach((k, j) => L.push({ id: 'jar_' + k, x: g.w - 50 - j * 62, y: 108, w: 56, h: 60, hint: j === 1 ? undefined : false, idle: j === 1 ? 'انقر مادة لتجربتها ✋' : undefined, tip: 'ضع ' + SUB[k].name + ' في الصحن', click: S => { setParam(S, 'sub', k); S.sm = 1; S.iceM = 1; S.pud = 0; S.fog = []; S.waves = []; S.cheered = false; } }));
        L.push({ id: 'knob', x: g.kx, y: g.ky, r: 20, cx: g.kx, cy: g.ky, hint: false, tip: 'أدر مقبض الصفيحة لتسخينها', drag: (S, d) => setParam(S, 'warm', S.p.warm + d.dang / (Math.PI * 1.5) * 45), wheel: (S, s) => setParam(S, 'warm', S.p.warm + s * 2) }); }
      return L;
    },
    readings(S) {
      const p = S.p, m = p.mode;
      if (m === 'plate') return [rd('درجة حرارة الصحن', Math.round(S.Tp) + ' °C'), rd('درجة حرارة الماء', Math.round(S.Tw) + ' °C'), rd('قطرات متكاثفة سقطت', String(S.col)), rd('ما يحدث', S.cr > .05 ? 'تكاثف: غاز ← سائل (يبعث حرارة)' : 'ضع الصحن البارد فوق البخار', 1)];
      if (m === 'bottle') { const Td = dew(25, p.rh); return [rd('حرارة القنينة الباردة', Math.round(S.Tb) + ' °C'), rd('رطوبة الهواء', p.rh + ' %'), rd('تتكاثف القطرات إذا كانت القنينة أبرد من', Td.toFixed(0) + ' °C', 1), rd('عدد القطرات', String(S.bd.length))]; }
      if (m === 'breath') return [rd('درجة حرارة الجو', p.air + ' °C'), rd('هل نرى بخار الزفير؟', p.air < 12 ? 'نعم — تكاثف' : 'لا', 1)];
      return [rd('المادة', SUB[p.sub].name), rd('ما تبقى منها', Math.round(S.sm * 100) + ' %'), rd('ما تبقى من الجليد', Math.round(S.iceM * 100) + ' %'), rd('الفرق', 'الجليد: صلب ← سائل، والمادة المتسامية: صلب ← غاز مباشرة', 1)];
    },
    explain(S) {
      const p = S.p, m = p.mode;
      if (m === 'plate') return S.cr > .05 ? `جزيئات بخار الماء تلامس الصحن البارد (${Math.round(S.Tp)} °C) فتفقد كمية الحرارة التي اكتسبتها وتتجمع قطرات ماء: هذا هو <b>التكاثف</b> (غاز ← سائل). الحرارة المفقودة تنتقل إلى الصحن فيسخن تدريجياً.` : 'اسحب الصحن البارد وضعه في طريق البخار المتصاعد من الماء المغلي.';
      if (m === 'bottle') { const Td = dew(25, p.rh); return S.bIn ? 'القنينة في الثلاجة (5 °C). افتح الباب واسحبها إلى الطاولة.' : S.Tb < Td ? `سطح القنينة بارد (${Math.round(S.Tb)} °C)، فبخار الماء الموجود في هواء الغرفة يلامسه ويفقد حرارته ف<b>يتكاثف</b> قطرات ماء على سطحها الخارجي — الماء لم يرشح من داخلها!` : 'سخنت القنينة فلم يعد بخار الماء في الهواء يتكاثف عليها، والقطرات تتبخر. أعدها إلى الثلاجة أو زد رطوبة الهواء.'; }
      if (m === 'breath') return p.air < 12 ? 'هواء الزفير دافئ ومحمّل ببخار الماء؛ عندما يخرج إلى الجو البارد يفقد حرارته فيتكاثف بخار الماء إلى قطيرات صغيرة جداً نراها كالضباب.' : 'في الجو الدافئ لا يفقد بخار الزفير حرارته بسرعة فلا يتكاثف، لذلك لا نراه (بخار الماء غاز شفاف).';
      return `${SUB[p.sub].name} ${S.sm > 0 ? 'يتحول' : 'تحوّل'} من الحالة الصلبة إلى الحالة الغازية <b>مباشرة</b> دون المرور بحالة السيولة: هذا هو <b>التسامي</b>. أما الجليد فينصهر أولاً إلى ماء سائل.${SUB[p.sub].smell ? ' لذلك نشمّ رائحته.' : ''}`;
    },
    quiz: [
      { q: 'ما سبب خروج «بخار» من فم المتكلم في جو الشتاء البارد؟', o: ['بخار الماء في الزفير الدافئ يبرد فيتكاثف قطيرات صغيرة', 'الهواء البارد يدخل الفم ثم يخرج', 'الزفير يتجمد ثلجاً'], a: 0, why: 'البخار عندما يفقد جزءاً من حرارته يتكاثف (ص 84).' },
      { q: 'التسامي هو عملية تحول المادة من:', o: ['الحالة الصلبة إلى الحالة السائلة', 'الحالة السائلة إلى بخار', 'الحالة الصلبة إلى الحالة الغازية مباشرةً'], a: 2, why: 'دون المرور بحالة السيولة (ص 85، مراجعة الفصل ص 88).' },
      { q: 'لماذا تتكون قطرات ماء على السطح الخارجي لقنينة ماء بارد أُخرجت من الثلاجة؟', o: ['لأن الماء يرشح من داخل القنينة', 'لأن بخار الماء في الهواء يتكاثف عند ملامسة سطحها البارد', 'لأن الزجاج ينصهر'], a: 1, why: 'تكاثف بخار الماء الموجود في الهواء (ص 84).' }
    ]
  });
})();

/* =====================================================================
   9) تطبيقات: قدر الضغط والثلاجة الكهربائية (ص 86)
   ===================================================================== */
(function () {
  const MODES = [['cooker', '🍲 قدر الضغط'], ['fridge', '❄ الثلاجة الكهربائية']];
  const PSET = 2, LR = 4880;
  const TbP = P => 1 / (1 / 373.15 - Math.log(P) / LR) - 273.15; // boiling point (°C) at pressure P (atm)
  const PofT = T => Math.exp(LR * (1 / 373.15 - 1 / (T + 273.15))); // vapour pressure (atm)
  const base = S => { const w = S.W, h = S.H; return { w, h, by: h * .8, x0: 70 }; };
  const gC = S => { const g = base(S); const cx = g.x0 + (g.w - g.x0) * .47, pw = clamp((g.w - g.x0) * .34, 200, 270), ph = clamp(g.h * .2, 120, 165), pb = g.by - 34, pt = pb - ph; return { ...g, cx, pw, ph, pb, pt, vy: pt - 34, lidX: g.x0 + 70, lidY: g.by - 8, kx: cx + 120, ky: g.by - 13, wx: S.wOn ? cx : S.wx * g.w, wy: S.wOn ? pt - 48 : S.wy * g.h }; };
  const gF = S => { const g = base(S); const fw = clamp(g.w - g.x0 - 390, 170, 290), fh = clamp(g.h * .62, 320, 470), fx = g.x0 + Math.max(50, (g.w - g.x0 - fw - 330) * .5), fy = g.by - fh, fz = fy + fh * .28; return { ...g, fw, fh, fx, fy, fz, bx: fx + fw + 20, cmpX: fx + fw + 50, cmpY: g.by - 30 }; };
  const panelVis = S => { const key = S.p.mode; if (S.t - (S._pv ?? -1) < .3 && S._pvk === key) return; S._pv = S.t; S._pvk = key; const show = key === 'cooker' ? ['mode', 'fire'] : ['mode', 'lvl'];
    (S.E?.controls || []).forEach((c, i) => { if (!c.k || c.type === 'toggle') return; const n = document.querySelector(`#ctls .ctl[data-i="${i}"]`); if (n) n.style.display = show.includes(c.k) ? '' : 'none'; }); };
  const newFood = S => { S.food = 0; S.cookT = 0; S.done = false; };
  const plim = S => S.lid && S.wOn ? PSET : 1;
  /* refrigerant loop path (built from fridge geometry) */
  const loop = g => {
    const right = g.fx + g.fw, bxL = right + 10, bxR = right + 46, top = g.fy + 18, zb = g.by - 70;
    const P = [], seg = [];
    const add = (pts, kind) => { seg.push({ i0: P.length ? P.length - 1 : 0, kind }); pts.forEach(p => P.push(p)); seg[seg.length - 1].i1 = P.length - 1; };
    add([[g.cmpX, g.cmpY - 22], [g.cmpX, zb]], 'hotgas');
    const cond = []; const n = 7; for (let k = 0; k <= n; k++) { const y = zb - (zb - top - 40) * k / n; cond.push(k % 2 ? [bxL, y] : [bxR, y]); } add(cond, 'cond');
    add([[bxL, top], [right - 30, top - 8], [g.fx + 30, top - 8]], 'liq');
    const ev = []; const m = 5; for (let k = 0; k <= m; k++) { const y = g.fy + 22 + (g.fz - g.fy - 36) * k / m; ev.push(k % 2 ? [right - 24, y] : [g.fx + 24, y]); } add(ev, 'evap');
    add([[ev[ev.length - 1][0], g.fz - 4], [right - 6, g.fz + 6], [right + 4, g.by - 58], [g.cmpX - 26, g.cmpY - 10]], 'cold');
    // cumulative lengths + density (mass) coordinate
    const L = [0]; for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    const kindAt = i => seg.find(s => i >= s.i0 && i < s.i1) || seg[seg.length - 1];
    const rho = (i, f) => { const s = kindAt(i); const u = (i - s.i0 + f) / Math.max(1, s.i1 - s.i0); return { hotgas: 1, cond: 1 + 2.4 * u, liq: 3.4, evap: 3.4 - 2.4 * u, cold: 1 }[s.kind]; };
    const M = [0]; for (let i = 1; i < P.length; i++) M.push(M[i - 1] + (L[i] - L[i - 1]) * rho(i - 1, .5));
    return { P, L, M, seg, kindAt, Mtot: M[M.length - 1] };
  };
  const posAtM = (lp, m) => { const { P, M } = lp; let i = 1; while (i < M.length - 1 && M[i] < m) i++; const f = (m - M[i - 1]) / Math.max(1e-6, M[i] - M[i - 1]); return { x: P[i - 1][0] + (P[i][0] - P[i - 1][0]) * f, y: P[i - 1][1] + (P[i][1] - P[i - 1][1]) * f, i: i - 1, f }; };
  const zoneT = (S, g, x, y) => { if (x > g.fx && x < g.fx + g.fw && y > g.fy && y < g.by) return y < g.fz ? S.Tfz : S.Tfr; if (x > g.fx + g.fw && x < g.fx + g.fw + 72 && y > g.fy && y < g.by - 60) return S.Tcd; if (Math.hypot(x - g.cmpX, y - g.cmpY) < 36) return S.Tcd + 8; return 25; };

  X7({ id: 'g7_applications', ch: 15, sec: 'تطبيقات', page: 86, kind: 'تطبيق', title: 'تطبيقات: قدر الضغط والثلاجة الكهربائية',
    desc: 'قدر الضغط محكم الغلق وفوق فتحة غطائه ثقل متحرك: يزداد الضغط فوق الماء فترتفع درجة غليانه إلى نحو 120 °C فينضج الطعام أسرع. وفي الثلاجة يتكاثف الغاز في الأنابيب الضيقة خلفها فيبعث حرارة، ويتبخر في الأنابيب الواسعة حول المجمّد فيمتص الحرارة منه.',
    tags: 'قدر الضغط درجة الغليان الضغط ثقل صمام 120 ثلاجة فريون ضاغطة كومبرسر تكاثف تبخر مجمد',
    tools: ['قدر ضغط وثقل الصمام', 'مصدر حراري (طباخ)', 'ثلاجة كهربائية', 'محرار'],
    steps: ['في «قدر الضغط»: أدر مقبض الطباخ وانتظر حتى يغلي الماء والقدر مفتوح. كم درجة الغليان؟',
      'انقر على الغطاء (الموضوع على الطاولة) لإحكام غلق القدر، ثم اسحب الثقل وضعه فوق الفتحة الصغيرة في الغطاء.',
      'راقب الضغط ودرجة الحرارة: إلى أيّ درجة يصل الماء قبل أن يرفع البخار الثقل؟ (فعّل منحني الغليان والضغط)',
      'قارن زمن نضج الطعام في القدر المفتوح وفي قدر الضغط.',
      'حاول فتح الغطاء والضغط مرتفع! ثم برّد القدر بصب الماء البارد فوقه قبل فتحه.',
      'في «الثلاجة»: شغّل الثلاجة، واسحب المحرار إلى الأنابيب خلف الثلاجة ثم إلى المجمّد: أين تُمتص الحرارة وأين تُطرح؟ ضع قنينة العصير وقالب الماء في الداخل.'],
    concl: ['بزيادة الضغط فوق سطح السائل ترتفع درجة غليانه: في قدر الضغط يغلي الماء عند نحو 120 °C فيتم الطبخ بصورة جيدة وسريعة.',
      'عند وصول الضغط إلى الحد المعين يرفع البخار الثقل فيخرج البخار الزائد ليثبت الضغط فوق المحلول، وبذلك تثبت درجة الحرارة.',
      'يجب تبريد القدر بما فيه قبل فتح غطائه، بصب الماء البارد فوقه أو تركه مدة مناسبة ليبرد.',
      'في الثلاجة تكبس الضاغطة الغاز في أنابيب ضيقة فيتحول إلى سائل ويعطي حرارة (الأنابيب في ظهر الثلاجة ساخنة)، ثم يتمدد السائل فجأة في الأنابيب الواسعة حول المجمّد فيتبخر ويمتص الحرارة منه فيبرد.'],
    laws: ['g7_states', 'g7_atm'],
    fact: ['يُبرَّد مشعّ السيارة بتيارات الهواء القوية؛ تبخر الماء على الأنابيب المشعة يخفض درجة حرارة الماء الساخن الذي يبرد المحرك (ص 86).', 'على قمم الجبال العالية يقل الضغط الجوي فيغلي الماء بأقل من 100 °C ويصعب طبخ الطعام — وهنا يفيد قدر الضغط.', 'يوضع مجمّد الثلاجة في الأعلى لأن الهواء البارد أكثف فيهبط ويبرد باقي أجزاء الثلاجة (ص 85).'],
    controls: [
      SEL('mode', 'التطبيق', MODES, 'cooker'),
      R('fire', 'شدة لهب الطباخ', 0, 1, 0, .05, '', null, v => Math.round(v * 100) + '%'),
      R('lvl', 'منظّم الحرارة (الثرموستات)', 1, 5, 3, 1, ''),
      BT('', [{ t: '💧 صبّ ماء بارد فوق القدر', on: S => { S.cool = S.t; } }, { t: '🥔 طعام جديد', on: S => newFood(S) }, { t: '🔌 تشغيل / إطفاء الثلاجة', on: S => { S.on = !S.on; } }]),
      TG('mol', 'الجزيئات', true, null, 'atom'), TG('heat', 'أسهم الحرارة (امتصاص / انبعاث)', true, null, 'heat'),
      TG('graph', 'منحني درجة الغليان والضغط', true, null, 'graph'), TG('conv', 'تيارات الهواء البارد في الثلاجة', true, null, 'velocity'), TG('labels', 'القيم والأسماء', true, null, 'labels')],
    setup(S) {
      S.T = 25; S.P = 1; S.lid = false; S.wOn = false; S.wx = .18; S.wy = .77; newFood(S); S.warn = -9; S.cool = -9; S.vent = 0; S.jig = 0; S.bub = []; S.vap = Array.from({ length: 30 }, () => ({ x: Math.random(), y: Math.random(), a: Math.random() * TAU })); S.cheerC = false; S.boilOpen = false;
      S.on = true; S.Tfz = 25; S.Tfr = 25; S.Tcd = 25; S.ph = 0; S.probe = { x: -1, y: .45 }; S.items = [{ k: 'juice', x: .83, y: .8, T: 25 }, { k: 'tray', x: .91, y: .8, T: 25, ice: 0 }]; S.probeSeen = { hot: false, cold: false }; S.cheerF = false;
    },
    update(S, dt) {
      const p = S.p;
      if (p.mode === 'cooker') {
        if (S.t - S.cool < .05) { S.T = Math.max(25, S.T - 40); }
        const Pl = plim(S), Tb = TbP(Pl);
        S.T += (p.fire * 7 - (S.T - 25) * .025) * dt; if (S.T > Tb) S.T = Tb;
        const boiling = p.fire > .04 && S.T >= Tb - .02; S.boiling = boiling;
        S.P = S.lid && S.wOn ? clamp(PofT(S.T), 1, PSET) : 1;
        if (!S.lid && boiling) S.boilOpen = true;
        S.vent = S.lid && boiling ? 1 : 0; S.jig += dt * (S.vent && S.wOn ? 30 : 0);
        const g = gC(S);
        if (S.T > 85) { const r = Math.pow(2, (S.T - 100) / 12.6) / 45; S.food = Math.min(1, S.food + r * dt); S.cookT += dt; }
        if (S.food >= 1 && !S.done) { S.done = true; S.doneT = S.cookT; if (S.wOn && S.lid && !S.cheerC) { S.cheerC = true; K.cheer(S, g.cx, g.pt - 60); } }
        const wl = g.pb - g.ph * .55; if (boiling || S.T > TbP(Pl) - 8) { if (Math.random() < dt * (boiling ? 30 : 5)) S.bub.push({ x: g.cx + (Math.random() - .5) * (g.pw - 40), y: g.pb - 8, r: 1.5, vy: boiling ? 70 : 25 }); }
        S.bub.forEach(b => { b.y -= b.vy * dt; b.r += 3 * dt; }); S.bub = S.bub.filter(b => b.y > wl);
        const sp = .2 + (S.T - 25) / 100; S.vap.forEach(q => { q.a += (Math.random() - .5) * 1.5; q.x += Math.cos(q.a) * sp * dt; q.y += Math.sin(q.a) * sp * dt; if (q.x < 0 || q.x > 1) { q.a = Math.PI - q.a; q.x = clamp(q.x, 0, 1); } if (q.y < 0 || q.y > 1) { q.a = -q.a; q.y = clamp(q.y, 0, 1); } });
      } else {
        const g = gF(S), lv = p.lvl;
        const tz = S.on ? -6 - 3 * lv : 25, tr = S.on ? 9 - 1.4 * lv : 25, tc = S.on ? 44 : 25;
        S.Tfz += (tz - S.Tfz) * Math.min(1, dt / 7); S.Tfr += (tr - S.Tfr) * Math.min(1, dt / 9); S.Tcd += (tc - S.Tcd) * Math.min(1, dt / 3);
        if (S.on) S.ph += dt * (18 + 6 * lv);
        S.items.forEach(it => { const Tz = zoneT(S, g, it.x * g.w, it.y * g.h - 10); it.T += (Tz - it.T) * Math.min(1, dt / 6); if (it.k === 'tray') { if (it.T < 0) it.ice = Math.min(1, it.ice + dt * .2); else if (it.T > 0) it.ice = Math.max(0, it.ice - dt * .2); } });
        if (S.probe.x < 0) return; const pt = zoneT(S, g, S.probe.x * g.w, S.probe.y * g.h); if (pt > 35) S.probeSeen.hot = true; if (pt < -3) S.probeSeen.cold = true;
        if (S.probeSeen.hot && S.probeSeen.cold && !S.cheerF) { S.cheerF = true; K.cheer(S, S.probe.x * g.w, S.probe.y * g.h); }
      }
    },
    draw(ctx, w, h, S) {
      const p = S.p; panelVis(S); K.bg(ctx, w, h, { benchY: h * .8 });
      K.raw(ctx, () => { if (p.mode === 'cooker') this.drawCooker(ctx, S); else this.drawFridge(ctx, S); C5.tabs(ctx, S, 'mode', w - 14, 12, MODES, { bw: 150 }); K.party(ctx, S); });
    },
    drawCooker(ctx, S) {
      const p = S.p, g = gC(S), Pl = plim(S), Tb = TbP(Pl);
      // stove
      ctx.fillStyle = '#1f2937'; rr(ctx, g.cx - 150, g.by - 26, 300, 26, 6); ctx.fill(); ctx.fillStyle = '#374151'; ctx.fillRect(g.cx - 90, g.by - 32, 180, 6);
      if (p.fire > .02) for (let k = -4; k <= 4; k++) { const f = (10 + 16 * p.fire) * (1 + .15 * Math.sin(S.t * 20 + k)); const x = g.cx + k * 18; const gr = ctx.createLinearGradient(0, g.by - 32 - f, 0, g.by - 32); gr.addColorStop(0, 'rgba(96,165,250,0)'); gr.addColorStop(1, 'rgba(59,130,246,.95)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x - 5, g.by - 32); ctx.quadraticCurveTo(x, g.by - 32 - f * 1.4, x + 5, g.by - 32); ctx.fill(); }
      ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(g.kx, g.ky, 11, 0, TAU); ctx.fill(); const ka = -Math.PI * .75 + p.fire * Math.PI * 1.5 - Math.PI / 2; ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.kx, g.ky); ctx.lineTo(g.kx + Math.cos(ka) * 9, g.ky + Math.sin(ka) * 9); ctx.stroke();
      // pot body (with a cut-away window like the book figure)
      const x0 = g.cx - g.pw / 2, mg = ctx.createLinearGradient(x0, 0, x0 + g.pw, 0); mg.addColorStop(0, '#94a3b8'); mg.addColorStop(.35, '#f1f5f9'); mg.addColorStop(1, '#64748b');
      ctx.fillStyle = mg; rr(ctx, x0, g.pt, g.pw, g.ph, 16); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#1f2937'; rr(ctx, x0 + g.pw - 6, g.pt + 8, 150, 16, 8); ctx.fill(); rr(ctx, x0 - 44, g.pt + 10, 50, 14, 7); ctx.fill(); // handles
      const wx0 = x0 + 16, ww = g.pw - 32, wt = g.pt + 14, wb = g.pb - 10, wl = g.pb - g.ph * .55;
      ctx.fillStyle = '#f8fafc'; rr(ctx, wx0, wt, ww, wb - wt, 10); ctx.fill();
      ctx.save(); rr(ctx, wx0, wt, ww, wb - wt, 10); ctx.clip();
      ctx.fillStyle = 'rgba(56,189,248,.5)'; ctx.fillRect(wx0, wl, ww, wb - wl);
      // food (potatoes) — colour from raw to cooked
      const raw = [234, 213, 160], ck = [217, 119, 6], f = S.food, fc = `rgb(${raw.map((v, i) => Math.round(v + (ck[i] - v) * f)).join(',')})`;
      [[-.3, .7], [0, .82], [.28, .72], [-.1, .6]].forEach(([a, b], k) => { const x = g.cx + a * ww, y = wl + (wb - wl) * b; ctx.fillStyle = fc; ctx.strokeStyle = 'rgba(120,53,15,.6)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x + Math.sin(S.t * 3 + k) * (S.boiling ? 2 : 0), y, 20, 14, k, 0, TAU); ctx.fill(); ctx.stroke(); });
      S.bub.forEach(b => { ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, TAU); ctx.stroke(); });
      if (p.mol) { const n = Math.round(8 + (S.lid ? 14 * (S.P - .6) : 3)); for (let k = 0; k < Math.min(n, S.vap.length); k++) { const q = S.vap[k]; K.ball(ctx, wx0 + 6 + q.x * (ww - 12), wt + 6 + q.y * (wl - wt - 12), 3.2, '#2563eb'); } }
      ctx.restore(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; rr(ctx, wx0, wt, ww, wb - wt, 10); ctx.stroke();
      // lid
      const lid = (cx, cy, tilt) => { ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt); const lg = ctx.createLinearGradient(0, -30, 0, 0); lg.addColorStop(0, '#f8fafc'); lg.addColorStop(1, '#94a3b8'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(-g.pw / 2 - 6, 0); ctx.quadraticCurveTo(0, -46, g.pw / 2 + 6, 0); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#334155'; ctx.fillRect(-5, -34, 10, 12); ctx.fillStyle = '#1f2937'; rr(ctx, 30, -30, 70, 12, 6); ctx.fill(); ctx.restore(); };
      if (S.lid) lid(g.cx, g.pt, 0); else lid(g.lidX + 30, g.lidY - 2, 0);
      // weight
      const wy = g.wy - (S.wOn && S.vent ? Math.abs(Math.sin(S.jig)) * 4 : 0); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.moveTo(g.wx - 16, wy + 12); ctx.lineTo(g.wx - 12, wy - 8); ctx.quadraticCurveTo(g.wx, wy - 16, g.wx + 12, wy - 8); ctx.lineTo(g.wx + 16, wy + 12); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(g.wx - 10, wy - 6, 5, 14);
      if (!S.wOn && p.labels) G.text(ctx, 'الثقل', g.wx, wy + 26, { s: 11, w: 900, c: '#fff', bg: '#334155' });
      // steam
      if (S.boiling && !S.lid) C5.steam(ctx, g.cx, g.pt - 6, g.pw * .6, S.t, 1.2, '148,163,184');
      if (S.lid && S.vent) { C5.steam(ctx, g.cx, g.vy - (S.wOn ? 18 : 2), 14, S.t * 1.8, S.wOn ? .8 : 1.3, '148,163,184'); }
      // heat arrows from flame into pot
      if (p.heat && p.fire > .05) for (let k = -1; k <= 1; k++) C5.heatArrow(ctx, g.cx + k * 60, g.by - 20, g.cx + k * 60, g.pb - 4, S.t + k);
      if (p.heat && S.lid && S.wOn && S.P > 1.02) { [[-1, 0], [1, 0], [0, -1]].forEach(([a, b]) => K.force(ctx, g.cx + a * (ww / 2 - 20), wt + 24 + (b ? 0 : 20), a * 24, b * 22, null, '#dc2626', 3)); }
      // info card
      const cx2 = g.w - 200, cy2 = 70; C5.card(ctx, cx2, cy2, 186, 206, '#0f766e');
      G.text(ctx, 'داخل القدر', cx2 + 93, cy2 + 14, { s: 12.5, w: 900, c: '#0f766e' });
      const gx = cx2 + 93, gy = cy2 + 62; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(gx, gy, 32, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.stroke(); for (let v = 0; v <= 3; v += .5) { const a = Math.PI * .75 + v / 3 * Math.PI * 1.5; ctx.strokeStyle = v === 2 ? '#dc2626' : '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx + Math.cos(a) * 25, gy + Math.sin(a) * 25); ctx.lineTo(gx + Math.cos(a) * 31, gy + Math.sin(a) * 31); ctx.stroke(); if (v % 1 === 0) G.text(ctx, String(v), gx + Math.cos(a) * 18, gy + Math.sin(a) * 18, { s: 9, c: '#334155', mono: 1 }); }
      const pa = Math.PI * .75 + S.P / 3 * Math.PI * 1.5; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(pa) * 24, gy + Math.sin(pa) * 24); ctx.stroke();
      G.text(ctx, `الضغط ${S.P.toFixed(2)} atm`, gx, gy + 46, { s: 12, w: 900, c: '#0f172a', mono: 1 });
      G.text(ctx, `درجة الحرارة ${S.T.toFixed(0)} °C`, gx, gy + 68, { s: 13, w: 900, c: S.T > 101 ? '#dc2626' : '#0f172a', mono: 1 });
      G.text(ctx, `درجة الغليان الآن ${Tb.toFixed(0)} °C`, gx, gy + 90, { s: 11.5, w: 800, c: '#7c2d12' });
      ctx.fillStyle = '#e2e8f0'; rr(ctx, cx2 + 14, gy + 104, 158, 12, 6); ctx.fill(); ctx.fillStyle = S.food >= 1 ? '#16a34a' : '#d97706'; rr(ctx, cx2 + 14, gy + 104, 158 * S.food, 12, 6); ctx.fill();
      G.text(ctx, S.food >= 1 ? `نضج الطعام ✓ خلال ${Math.round(S.doneT)} min` : `نضج الطعام ${Math.round(S.food * 100)}%  (${Math.round(S.cookT)} min)`, gx, gy + 128, { s: 11, w: 800, c: S.food >= 1 ? '#15803d' : '#334155' });
      // graph: boiling point vs pressure
      if (p.graph) { const pts = []; for (let P = .5; P <= 2.21; P += .05) pts.push([P, TbP(P)]); const G2 = C5.graph(ctx, 76, 56, 230, 170, { title: 'درجة الغليان والضغط', x0: .5, x1: 2.2, y0: 85, y1: 125, xt: [.5, 1, 1.5, 2], yt: [90, 100, 110, 120], xl: 'الضغط (atm)', yl: '°C', bd: '#dc2626', series: [{ pts, col: '#dc2626' }] });
        ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(G2.X(Pl), G2.Y(Tb), 6, 0, TAU); ctx.fill(); ctx.setLineDash([3, 3]); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(G2.X(Pl), G2.Y(Tb)); ctx.lineTo(G2.X(Pl), G2.B); ctx.moveTo(G2.X(Pl), G2.Y(Tb)); ctx.lineTo(G2.L, G2.Y(Tb)); ctx.stroke(); ctx.setLineDash([]); }
      // labels / bubbles
      if (p.labels) {
        K.tag(ctx, !S.lid ? 'القدر مفتوح' : S.wOn ? 'مُحكم الغلق والثقل فوق الفتحة' : 'مغلق لكن الفتحة مفتوحة — البخار يخرج', g.cx, g.by + 20, { s: 12, bg: S.lid && S.wOn ? '#0f766e' : '#475569' });
        if (!S.lid) G.text(ctx, 'الغطاء (انقره)', g.lidX + 30, g.lidY + 22, { s: 11, w: 900, c: '#fff', bg: '#475569' });
        if (S.lid && S.wOn && S.vent) G.text(ctx, 'البخار يرفع الثقل ويخرج الزائد ← يثبت الضغط', g.cx, g.vy - 72, { s: 11.5, w: 800, c: '#9a3412', bg: 'rgba(255,255,255,.9)' });
      }
      if (S.t - S.warn < 2.5) K.bubble(ctx, 'خطر! لا تفتح القدر والضغط مرتفع ⚠\nبرّده أولاً بصب الماء البارد فوقه', g.cx, g.pt - 60, { s: 12.5, bg: '#fef2f2', bd: '#dc2626', c: '#7f1d1d' });
      if (S.t - S.cool < 1.2) { ctx.fillStyle = 'rgba(56,189,248,.8)'; for (let k = 0; k < 24; k++) { const x = x0 + ((k * 37) % g.pw), y = g.pt - 80 + ((S.t - S.cool) * 300 + k * 23) % 120; ctx.fillRect(x, y, 2.5, 10); } }
    },
    drawFridge(ctx, S) {
      const p = S.p, g = gF(S), lp = loop(g), on = S.on; if (S.probe.x < 0) S.probe.x = Math.max(g.fx - 48, g.x0 + 12) / g.w;
      // fridge cabinet (cut-away)
      ctx.fillStyle = '#f8fafc'; rr(ctx, g.fx - 10, g.fy - 10, g.fw + 20, g.fh + 10, 14); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.stroke();
      const fzT = S.Tfz, frT = S.Tfr; ctx.fillStyle = fzT < 0 ? '#dbeafe' : '#f1f5f9'; ctx.fillRect(g.fx, g.fy, g.fw, g.fz - g.fy); ctx.fillStyle = frT < 8 ? '#eff6ff' : '#f8fafc'; ctx.fillRect(g.fx, g.fz + 6, g.fw, g.by - g.fz - 16);
      ctx.fillStyle = '#cbd5e1'; ctx.fillRect(g.fx, g.fz, g.fw, 6); [0.42, 0.68].forEach(k => { const y = g.fz + (g.by - g.fz) * k; ctx.fillStyle = 'rgba(148,163,184,.8)'; ctx.fillRect(g.fx + 6, y, g.fw - 12, 4); });
      // convection (cold air sinks from the freezer)
      if (p.conv && on) { for (let k = 0; k < 3; k++) { const x = g.fx + g.fw * (.25 + k * .25), ph = ((S.t * 40 + k * 60) % 120); ctx.globalAlpha = .7; G.arrow(ctx, x, g.fz + 20 + ph, x, g.fz + 50 + ph, '#0284c7', 2.5, 8); ctx.globalAlpha = 1; } ctx.globalAlpha = .55; G.arrow(ctx, g.fx + g.fw - 14, g.by - 30, g.fx + g.fw - 14, g.fz + 40, '#f97316', 2, 7); ctx.globalAlpha = 1; }
      // refrigerant tubes
      const tube = (i0, i1, wdt, col) => { ctx.strokeStyle = col; ctx.lineWidth = wdt; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = i0; i <= i1; i++) i === i0 ? ctx.moveTo(lp.P[i][0], lp.P[i][1]) : ctx.lineTo(lp.P[i][0], lp.P[i][1]); ctx.stroke(); ctx.lineCap = 'butt'; };
      const hot = on ? clamp((S.Tcd - 25) / 19, 0, 1) : 0;
      lp.seg.forEach(s => { const c = { hotgas: `rgb(${200 + 40 * hot},${120 - 40 * hot},90)`, cond: `rgb(${180 + 60 * hot},${110 - 30 * hot},80)`, liq: '#a855f7', evap: '#60a5fa', cold: '#93c5fd' }[s.kind]; tube(s.i0, s.i1, s.kind === 'liq' ? 4 : s.kind === 'evap' ? 11 : 8, c); });
      // compressor
      ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.ellipse(g.cmpX, g.cmpY, 30, 24, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#374151'; ctx.fillRect(g.cmpX - 34, g.cmpY + 16, 68, 10);
      if (on) { ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.cmpX, g.cmpY, 12, S.t * 8, S.t * 8 + 4); ctx.stroke(); }
      // refrigerant particles (denser where liquid)
      if (p.mol) { const step = 11; for (let m = (S.ph % step); m < lp.Mtot; m += step) { const q = posAtM(lp, m), s = lp.kindAt(q.i); const liq = s.kind === 'liq' || (s.kind === 'cond' && (q.i - s.i0) / (s.i1 - s.i0) > .5) || (s.kind === 'evap' && (q.i - s.i0) / (s.i1 - s.i0) < .5); K.ball(ctx, q.x, q.y, 3.2, liq ? '#7c3aed' : s.kind === 'hotgas' || s.kind === 'cond' ? '#ef4444' : '#38bdf8'); } }
      // heat arrows
      if (p.heat && on) {
        for (let k = 0; k < 3; k++) { const y = g.by - 110 - k * (g.fh * .22); C5.heatArrow(ctx, g.bx + 42, y, g.bx + 92, y, S.t + k, '#ef4444'); }
        for (let k = 0; k < 3; k++) { const x = g.fx + g.fw * (.25 + k * .25); C5.heatArrow(ctx, x, g.fz - 8, x, g.fz - 36, S.t + k, '#f97316'); }
        C5.heatArrow(ctx, g.cmpX + 36, g.cmpY - 4, g.cmpX + 84, g.cmpY - 4, S.t, '#ef4444');
      }
      // items (juice bottle, ice tray)
      S.items.forEach(it => { const x = it.x * g.w, y = it.y * g.h; if (it.k === 'juice') { ctx.fillStyle = '#fb923c'; rr(ctx, x - 12, y - 52, 24, 52, 6); ctx.fill(); ctx.fillStyle = '#16a34a'; ctx.fillRect(x - 6, y - 60, 12, 9); ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 1.2; rr(ctx, x - 12, y - 52, 24, 52, 6); ctx.stroke(); }
        else { ctx.fillStyle = '#e2e8f0'; rr(ctx, x - 30, y - 16, 60, 16, 4); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.2; ctx.stroke(); for (let k = 0; k < 4; k++) { ctx.fillStyle = it.ice > .5 ? '#f0f9ff' : 'rgba(56,189,248,.6)'; rr(ctx, x - 26 + k * 13.5, y - 13, 11, 10, 2); ctx.fill(); if (it.ice > .5) { ctx.strokeStyle = '#7dd3fc'; ctx.stroke(); } } }
        if (p.labels) G.text(ctx, `${Math.round(it.T)} °C${it.k === 'tray' ? (it.ice > .5 ? ' ثلج' : ' ماء') : ''}`, x, y + 12, { s: 10.5, w: 900, c: '#fff', bg: it.T < 0 ? '#1d4ed8' : it.T < 10 ? '#0284c7' : '#64748b', mono: 1 }); });
      // probe thermometer
      const px = S.probe.x * g.w, py = S.probe.y * g.h, pT = zoneT(S, g, px, py); ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 22, py - 30); ctx.stroke(); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(px, py, 5, 0, TAU); ctx.fill();
      ctx.fillStyle = '#0f172a'; rr(ctx, px + 14, py - 58, 70, 28, 6); ctx.fill(); ctx.fillStyle = pT > 30 ? '#fca5a5' : pT < 0 ? '#93c5fd' : '#a3e635'; ctx.font = '800 14px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; ctx.fillText(pT.toFixed(0) + ' °C', px + 49, py - 44); ctx.textBaseline = 'alphabetic';
      // labels
      if (p.labels) {
        G.text(ctx, `المجمّد ${Math.round(fzT)} °C`, g.fx + g.fw / 2, g.fy + (g.fz - g.fy) / 2, { s: 12.5, w: 900, c: '#1e3a8a', bg: 'rgba(255,255,255,.85)' });
        G.text(ctx, `قسم التبريد ${Math.round(frT)} °C`, g.fx + g.fw / 2, g.fz + 26, { s: 12, w: 900, c: '#0c4a6e', bg: 'rgba(255,255,255,.85)' });
        const lx = g.w - 96; K.tag(ctx, 'ضاغطة (كومبرسر)', g.cmpX, g.by + 18, { s: 11.5, bg: '#1f2937' });
        const L1 = ['أنابيب ضيقة في ظهر الثلاجة:', 'الغاز يتكاثف إلى سائل', '← يبعث حرارة (ساخنة)'], L2 = ['أنابيب واسعة حول المجمّد:', 'السائل يتمدد فجأة ويتبخر', '← يمتص حرارة (باردة)'];
        C5.card(ctx, lx - 85, g.by - 170, 170, 78, '#ef4444'); L1.forEach((t, i) => G.text(ctx, t, lx, g.by - 152 + i * 21, { s: 11, w: i ? 800 : 900, c: i === 2 ? '#b91c1c' : '#334155' }));
        C5.card(ctx, lx - 85, g.fy - 30, 170, 78, '#2563eb'); L2.forEach((t, i) => G.text(ctx, t, lx, g.fy - 12 + i * 21, { s: 11, w: i ? 800 : 900, c: i === 2 ? '#1d4ed8' : '#334155' }));
        K.tag(ctx, on ? 'الثلاجة تعمل 🔌 (انقر القابس للإطفاء)' : 'الثلاجة مطفأة (انقر القابس)', g.fx + g.fw / 2, g.by + 42, { s: 11.5, bg: on ? '#16a34a' : '#64748b' });
      }
      // plug
      ctx.fillStyle = on ? '#16a34a' : '#94a3b8'; rr(ctx, g.fx - 50, g.by - 40, 30, 22, 5); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(g.fx - 44, g.by - 34, 4, 10); ctx.fillRect(g.fx - 32, g.by - 34, 4, 10); ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.fx - 20, g.by - 29); ctx.quadraticCurveTo(g.fx - 10, g.by - 10, g.fx, g.by - 20); ctx.stroke();
      // thermostat knob inside
      const tkx = g.fx + g.fw - 28, tky = g.fz + 50; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(tkx, tky, 14, 0, TAU); ctx.fill(); ctx.stroke(); const ta = -Math.PI * .75 + (p.lvl - 1) / 4 * Math.PI * 1.5 - Math.PI / 2; ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tkx, tky); ctx.lineTo(tkx + Math.cos(ta) * 11, tky + Math.sin(ta) * 11); ctx.stroke(); G.text(ctx, String(p.lvl), tkx - 24, tky, { s: 12, w: 900, c: '#1d4ed8', mono: 1 });
    },
    drags(S) {
      const p = S.p, g0 = base(S), L = C5.tabsDrag(S, 'mode', g0.w - 14, 12, MODES, { bw: 150 });
      if (p.mode === 'cooker') { const g = gC(S);
        L.push({ id: 'knob', x: g.kx, y: g.ky, r: 18, cx: g.kx, cy: g.ky, tip: 'أدر مقبض الطباخ (أو استعمل عجلة الفأرة)، أو انقره', idle: 'أدر مقبض الطباخ ✋', drag: (S, d) => setParam(S, 'fire', S.p.fire + d.dang / (Math.PI * 1.5)), wheel: (S, s) => setParam(S, 'fire', S.p.fire + .05 * s), click: S => setParam(S, 'fire', S.p.fire > .05 ? 0 : .8) });
        L.push({ id: 'lid', x: S.lid ? g.cx : g.lidX + 30, y: S.lid ? g.pt - 14 : g.lidY - 14, w: S.lid ? g.pw * .7 : 150, h: 30, hint: false, tip: S.lid ? 'انقر لفتح الغطاء' : 'انقر لإحكام غلق القدر بالغطاء',
          click: S => { if (S.lid) { if (S.P > 1.05 || (S.wOn && S.T > 101)) { S.warn = S.t; if (window.Sound) Sound.beep && Sound.beep(300, .12, 'square', .04); return; } S.lid = false; if (S.wOn) { S.wOn = false; S.wx = (g.cx + 80) / g.w; S.wy = g.by / g.h - 8 / g.h; } } else { S.lid = true; } } });
        L.push({ id: 'weight', x: g.wx, y: g.wy, r: 20, axis: 'xy', tip: 'اسحب الثقل وضعه فوق الفتحة الصغيرة في الغطاء', idle: 'ضع الثقل على الغطاء ✋', hint: S.lid ? undefined : false,
          down: S => { if (S.wOn) { S.wOn = false; S.wx = g.cx / g.w; S.wy = (g.pt - 48) / g.h; } },
          drag: (S, d) => { const g = gC(S); S.wx = clamp(d.ox + d.x - d.sx, g.x0 + 20, g.w - 20) / g.w; S.wy = clamp(d.oy + d.y - d.sy, 80, g.by - 8) / g.h; },
          up: S => { const g = gC(S); if (S.lid && Math.abs(S.wx * g.w - g.cx) < 45 && Math.abs(S.wy * g.h - (g.pt - 48)) < 50) { S.wOn = true; if (window.Sound) Sound.click(); } else S.wy = (g.by - 8) / g.h; } }); }
      else { const g = gF(S);
        L.push({ id: 'plug', x: g.fx - 35, y: g.by - 29, w: 44, h: 34, hint: false, tip: 'انقر لتشغيل الثلاجة أو إطفائها', click: S => { S.on = !S.on; } });
        L.push({ id: 'probe', x: S.probe.x * g.w, y: S.probe.y * g.h, r: 16, axis: 'xy', tip: 'اسحب المحرار: إلى الأنابيب خلف الثلاجة، وإلى المجمّد، وإلى الضاغطة', idle: 'اسحب المحرار إلى ظهر الثلاجة ✋', drag: (S, d) => { S.probe.x = clamp(d.ox + d.x - d.sx, g.x0 + 10, g.w - 90) / g.w; S.probe.y = clamp(d.oy + d.y - d.sy, 70, g.by + 20) / g.h; } });
        S.items.forEach((it, i) => L.push({ id: 'item_' + it.k, x: it.x * g.w, y: it.y * g.h - 20, w: it.k === 'tray' ? 64 : 30, h: it.k === 'tray' ? 30 : 64, axis: 'xy', hint: false, tip: it.k === 'tray' ? 'اسحب قالب الماء إلى المجمّد' : 'اسحب قنينة العصير إلى قسم التبريد', drag: (S, d) => { const it = S.items[i]; it.x = clamp(d.ox + d.x - d.sx, g.x0 + 30, g.w - 30) / g.w; it.y = clamp(d.oy + d.y - d.sy + 20, 90, g.by) / g.h; }, up: S => { const it = S.items[i]; const x = it.x * g.w, y = it.y * g.h; const inside = x > g.fx && x < g.fx + g.fw && y > g.fy && y < g.by; if (!inside) it.y = g.by / g.h; else { const shelves = [g.fz - 4, g.fz + (g.by - g.fz) * .42, g.fz + (g.by - g.fz) * .68, g.by - 12]; const sy = shelves.reduce((a, b) => Math.abs(b - y) < Math.abs(a - y) ? b : a); it.y = sy / g.h; } } }));
        L.push({ id: 'thermostat', x: g.fx + g.fw - 28, y: g.fz + 50, r: 16, cx: g.fx + g.fw - 28, cy: g.fz + 50, hint: false, tip: 'أدر منظّم الحرارة (1 → 5)', drag: (S, d) => { S._tk = (S._tk || 0) + d.dang; if (Math.abs(S._tk) > .5) { setParam(S, 'lvl', S.p.lvl + Math.sign(S._tk)); S._tk = 0; } }, wheel: (S, s) => setParam(S, 'lvl', S.p.lvl + s), click: S => setParam(S, 'lvl', S.p.lvl % 5 + 1) }); }
      return L;
    },
    readings(S) {
      const p = S.p;
      if (p.mode === 'cooker') return [rd('الضغط داخل القدر', S.P.toFixed(2) + ' atm'), rd('درجة حرارة الماء', S.T.toFixed(1) + ' °C'), rd('درجة الغليان الآن', TbP(plim(S)).toFixed(0) + ' °C'), rd('نضج الطعام', Math.round(S.food * 100) + ' %'), rd('زمن الطبخ', Math.round(S.cookT) + ' min (مُسرَّع)')];
      const g = gF(S); return [rd('المجمّد', S.Tfz.toFixed(0) + ' °C'), rd('قسم التبريد', S.Tfr.toFixed(0) + ' °C'), rd('الأنابيب خلف الثلاجة', S.Tcd.toFixed(0) + ' °C'), rd('قراءة المحرار', zoneT(S, g, S.probe.x * g.w, S.probe.y * g.h).toFixed(0) + ' °C'), rd('الثلاجة', S.on ? 'تعمل' : 'مطفأة')];
    },
    record(S) { if (S.p.mode !== 'cooker') { Runner.toast('التسجيل في «قدر الضغط»', 'info'); return null; } return { st: !S.lid ? 'مفتوح' : S.wOn ? 'مغلق + ثقل' : 'مغلق بلا ثقل', P: +S.P.toFixed(2), T: +S.T.toFixed(1), tb: +TbP(plim(S)).toFixed(0), f: Math.round(S.food * 100) }; },
    cols: [['st', 'حالة القدر'], ['P', 'الضغط (atm)'], ['T', 'درجة الحرارة (°C)'], ['tb', 'درجة الغليان (°C)'], ['f', 'نضج الطعام (%)']],
    explain(S) {
      const p = S.p;
      if (p.mode === 'cooker') { if (!S.lid) return S.boiling ? 'القدر مفتوح: الماء يغلي عند <b>100 °C</b> تحت الضغط الجوي الاعتيادي، ولا ترتفع درجة حرارته أكثر مهما زدنا اللهب. أغلق القدر وضع الثقل.' : 'سخّن الماء في القدر المفتوح ولاحظ درجة غليانه.'; if (!S.wOn) return 'الغطاء مغلق لكن الفتحة الصغيرة مفتوحة، فيخرج البخار ويبقى الضغط 1 atm ودرجة الغليان 100 °C. ضع الثقل فوق الفتحة!'; return `القدر محكم الغلق والثقل يسد الفتحة: البخار المتجمع يزيد <b>الضغط</b> فوق سطح الماء (${S.P.toFixed(2)} atm) فترتفع <b>درجة الغليان</b> إلى نحو <b>${TbP(PSET).toFixed(0)} °C</b>. عند هذا الحد يرفع البخار الثقل ويخرج البخار الزائد فيثبت الضغط ودرجة الحرارة، وينضج الطعام أسرع.`; }
      return S.on ? 'الضاغطة تكبس الغاز في <b>الأنابيب الضيقة</b> خلف الثلاجة فيتكاثف إلى سائل و<b>يبعث حرارة</b> إلى الغرفة. ثم يندفع السائل إلى <b>الأنابيب الواسعة</b> حول المجمّد فيقل ضغطه ويتبخر بسرعة و<b>يمتص الحرارة</b> من المجمّد فيبرد. الهواء البارد أكثف فيهبط ويبرد باقي الثلاجة.' : 'الثلاجة مطفأة: لا يدور الغاز، فترتفع درجة الحرارة في الداخل تدريجياً. انقر القابس.';
    },
    quiz: [
      { q: 'لماذا ينضج الطعام أسرع في قدر الضغط؟', o: ['لأن زيادة الضغط ترفع درجة غليان الماء إلى نحو 120 °C', 'لأن الضغط يخفض درجة الغليان', 'لأن الثقل يسخن الماء'], a: 0, why: 'الثقل يحدد الضغط فوق السائل فتصبح درجة الغليان نحو 120 °C (ص 86).' },
      { q: 'في الثلاجة الكهربائية، أين يمتص الغاز (الفريون) الحرارة؟', o: ['في الأنابيب الضيقة في ظهر الثلاجة', 'في الأنابيب الواسعة حول قسم التجميد حيث يتبخر', 'في الضاغطة'], a: 1, why: 'عملية التبخر تحتاج إلى حرارة تؤخذ من قسم التجميد فيبرد (ص 86).' },
      { q: 'لماذا يوضع مجمّد الثلاجة في الأعلى؟', o: ['لأن الهواء البارد أكثف فيهبط ويبرد باقي أجزاء الثلاجة', 'لأن الهواء البارد يرتفع للأعلى', 'ليسهل وضع الثلج فيه فقط'], a: 0, why: 'تيارات الحمل: الهواء البارد أكثف فيهبط (تفكير ناقد ص 85).' }
    ]
  });
})();

/* t6/tour order: scene objects first, the on-canvas mode tabs last (they change the scene) */
['g7_ball_ring', 'g7_wire', 'g7_bimetal', 'g7_liquid_exp', 'g7_gas_exp', 'g7_melting', 'g7_evaporation', 'g7_condensation', 'g7_applications'].forEach(id => {
  const E = EXPS.find(e => e.id === id); if (!E || !E.drags) return; const f = E.drags;
  E.drags = function (S) { const L = f.call(this, S); const r = o => /^tab_mode_/.test(o.id) ? 2 : /^tab_/.test(o.id) ? 1 : 0; return L.map((o, i) => [o, i]).sort((a, b) => r(a[0]) - r(b[0]) || a[1] - b[1]).map(x => x[0]); };
});
