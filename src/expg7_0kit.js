'use strict';
/* =====================================================================
   K — drawing kit for the grade-7 (الأول المتوسط) lab: friendly, colourful,
   always-light "school lab" look (drawn raw, independent of the theme).
   Every helper draws in canvas px. All helpers are safe to call every frame.
   ===================================================================== */
const K = {
  raw(ctx, f) { const c = ctx.canvas, r = c.__raw; c.__raw = true; try { f(); } finally { c.__raw = r; } },
  /* lab background: pale wall with tiles + wooden bench at y = benchY */
  bg(ctx, w, h, o = {}) {
    G.bg(ctx, w, h, false);
    K.raw(ctx, () => {
      const by = o.benchY ?? h * .78;
      const g = ctx.createLinearGradient(0, 0, 0, by); g.addColorStop(0, o.top || '#e0f2fe'); g.addColorStop(1, o.bottom || '#f0f9ff');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, by);
      if (o.tiles !== false) { ctx.strokeStyle = 'rgba(14,116,144,.07)'; ctx.lineWidth = 1; ctx.beginPath(); for (let x = 0; x < w; x += 40) { ctx.moveTo(x, 0); ctx.lineTo(x, by); } for (let y = 0; y < by; y += 40) { ctx.moveTo(0, y); ctx.lineTo(w, y); } ctx.stroke(); }
      if (o.bench !== false) {
        const wg = ctx.createLinearGradient(0, by, 0, h); wg.addColorStop(0, '#d6a574'); wg.addColorStop(.12, '#c08552'); wg.addColorStop(1, '#8a5a33');
        ctx.fillStyle = wg; ctx.fillRect(0, by, w, h - by);
        ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(0, by, w, 3);
        ctx.strokeStyle = 'rgba(90,50,20,.18)'; ctx.lineWidth = 1; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(0, by + k * (h - by) / 4); ctx.bezierCurveTo(w * .3, by + k * (h - by) / 4 + 4, w * .7, by + k * (h - by) / 4 - 4, w, by + k * (h - by) / 4); ctx.stroke(); }
      }
    });
    return o.benchY ?? h * .78;
  },
  /* rounded info card / label */
  tag(ctx, s, x, y, o = {}) { G.text(ctx, s, x, y, { s: o.s || 13, w: o.w || 800, c: o.c || '#fff', bg: o.bg || 'rgba(30,41,59,.88)', raw: 1, a: o.a }); },
  /* speech bubble from the lab mascot (a round-glasses scientist) */
  mascot(ctx, x, y, s = 1, mood = 'happy') {
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
      ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.moveTo(-26, 60); ctx.quadraticCurveTo(0, 20, 26, 60); ctx.closePath(); ctx.fill(); ctx.stroke(); // coat
      ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(0, 18, 20, 0, TAU); ctx.fill(); ctx.stroke(); // head
      ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(0, 12, 20, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); // hair
      ctx.fillStyle = '#fff'; [-8, 8].forEach(dx => { ctx.beginPath(); ctx.arc(dx, 18, 6, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(dx + 1, 18, 2.2, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; });
      ctx.beginPath(); ctx.moveTo(-2, 18); ctx.lineTo(2, 18); ctx.stroke();
      ctx.beginPath(); if (mood === 'wow') { ctx.arc(0, 29, 3.5, 0, TAU); } else ctx.arc(0, 26, 6, .15 * Math.PI, .85 * Math.PI); ctx.stroke();
      ctx.restore();
    });
  },
  bubble(ctx, s, x, y, o = {}) { // x,y = tail tip
    K.raw(ctx, () => {
      ctx.font = `800 ${o.s || 13}px Tajawal,sans-serif`; ctx.direction = 'rtl';
      const lines = String(s).split('\n'); const tw = Math.max(...lines.map(l => ctx.measureText(l).width)) + 22, th = lines.length * ((o.s || 13) + 6) + 14;
      const bx = clamp(x - tw * (o.side === 'l' ? .85 : .15), 6, ctx.canvas.width / (window.devicePixelRatio || 1) - tw - 6), by = y - th - 12;
      ctx.fillStyle = o.bg || '#fffbeb'; ctx.strokeStyle = o.bd || '#f59e0b'; ctx.lineWidth = 2;
      rr(ctx, bx, by, tw, th, 12); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - 7, by + th - 1); ctx.lineTo(x, y); ctx.lineTo(x + 7, by + th - 1); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillRect(x - 6, by + th - 3, 12, 4);
      ctx.fillStyle = o.c || '#78350f'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      lines.forEach((l, i) => ctx.fillText(l, bx + tw / 2, by + 7 + ((o.s || 13) + 6) * (i + .5)));
      ctx.textBaseline = 'alphabetic';
    });
  },
  /* materials (fill styles) */
  MAT: {
    wood: { name: 'خشب', rho: .6, c1: '#e8b77a', c2: '#b7793f', grain: 1 },
    alu: { name: 'ألمنيوم', rho: 2.7, c1: '#e5e7eb', c2: '#9ca3af' },
    iron: { name: 'حديد', rho: 7.86, c1: '#94a3b8', c2: '#475569' },
    copper: { name: 'نحاس', rho: 8.9, c1: '#f4a26b', c2: '#b45309' },
    gold: { name: 'ذهب', rho: 19.3, c1: '#fde68a', c2: '#ca8a04' },
    lead: { name: 'رصاص', rho: 11.3, c1: '#9aa3ad', c2: '#4b5563' },
    plastic: { name: 'بلاستك', rho: .95, c1: '#fca5a5', c2: '#dc2626' },
    glass: { name: 'زجاج', rho: 2.5, c1: '#e0f2fe', c2: '#7dd3fc' },
    stone: { name: 'حجر', rho: 2.6, c1: '#d6d3d1', c2: '#78716c' },
    ice: { name: 'جليد', rho: .92, c1: '#f0f9ff', c2: '#bae6fd' },
    cork: { name: 'فلين', rho: .24, c1: '#f3d7a7', c2: '#c28f4c' }
  },
  /* pseudo-3D box (cube / cuboid) with a material, front face w×h, depth d */
  box(ctx, x, y, w, h, d, mat = 'wood', o = {}) { // x,y = bottom-left of front face
    const M = typeof mat === 'string' ? K.MAT[mat] : mat; const dx = d * .6, dy = d * .45;
    K.raw(ctx, () => {
      const top = [[x, y - h], [x + w, y - h], [x + w + dx, y - h - dy], [x + dx, y - h - dy]], side = [[x + w, y], [x + w + dx, y - dy], [x + w + dx, y - h - dy], [x + w, y - h]];
      const poly = (p, f) => { ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fillStyle = f; ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.55)'; ctx.lineWidth = 1.2; ctx.stroke(); };
      const g = ctx.createLinearGradient(x, y - h, x + w, y); g.addColorStop(0, M.c1); g.addColorStop(1, M.c2);
      ctx.globalAlpha = o.alpha ?? 1;
      poly([[x, y], [x + w, y], [x + w, y - h], [x, y - h]], g); poly(top, shade(M.c1.length === 7 ? M.c1 : '#cccccc', 18)); poly(side, shade(M.c2.length === 7 ? M.c2 : '#888888', -12));
      if (M.grain) { ctx.strokeStyle = 'rgba(120,60,20,.28)'; ctx.lineWidth = 1; for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(x, y - h * k / 5); ctx.bezierCurveTo(x + w * .3, y - h * k / 5 - 3, x + w * .6, y - h * k / 5 + 3, x + w, y - h * k / 5); ctx.stroke(); } }
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x + 3, y - h + 3, w * .5, 3);
      ctx.globalAlpha = 1;
    });
  },
  /* digital balance: pan centred at (x, y) = top of pan; shows value */
  balance(ctx, x, y, val, o = {}) {
    K.raw(ctx, () => {
      const W = o.w || 170;
      ctx.fillStyle = '#e2e8f0'; rr(ctx, x - W / 2, y + 8, W, 46, 10); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#94a3b8'; rr(ctx, x - W * .42, y, W * .84, 9, 4); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#0f172a'; rr(ctx, x - 52, y + 18, 104, 28, 6); ctx.fill();
      ctx.fillStyle = '#a3e635'; ctx.font = '800 17px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
      ctx.fillText((o.fmt ? o.fmt(val) : (Math.round(val * 10) / 10).toFixed(1)) + ' ' + (o.unit || 'g'), x, y + 32);
      ctx.fillStyle = '#475569'; ctx.font = '800 10px Tajawal,sans-serif'; ctx.direction = 'rtl'; ctx.fillText(o.label || 'ميزان رقمي', x + W / 2 - 34, y + 48);
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(x - W / 2 + 18, y + 31, 6, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '800 7px sans-serif'; ctx.fillText('0', x - W / 2 + 18, y + 31);
      ctx.textBaseline = 'alphabetic';
    });
  },
  /* two-pan (beam) balance: pivot top at (x, y), beam half-length L, tilt (rad, + = right pan down); returns pan tops */
  twoPan(ctx, x, y, L, tilt, o = {}) {
    const H = o.hang || L * .55, c = Math.cos(tilt), s = Math.sin(tilt);
    const ends = [[x - L * c, y - L * s], [x + L * c, y + L * s]]; const pans = ends.map(([ex, ey]) => [ex, ey + H]);
    K.raw(ctx, () => {
      const base = o.base ?? y + L * 1.25;
      const gb = ctx.createLinearGradient(x - 20, 0, x + 20, 0); gb.addColorStop(0, '#a16207'); gb.addColorStop(.5, '#fde68a'); gb.addColorStop(1, '#a16207');
      ctx.fillStyle = gb; ctx.fillRect(x - 6, y, 12, base - y); rr(ctx, x - L * .45, base - 10, L * .9, 14, 6); ctx.fill();
      ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ends[0][0], ends[0][1]); ctx.lineTo(ends[1][0], ends[1][1]); ctx.stroke();
      ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.stroke(); ctx.lineCap = 'butt';
      ctx.fillStyle = '#854d0e'; ctx.beginPath(); ctx.arc(x, y, 8, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(-tilt) * -L * .35, y + L * .35 * Math.cos(tilt)); ctx.stroke(); // pointer
      pans.forEach(([px, py], i) => { const [ex, ey] = ends[i]; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(px - L * .32, py); ctx.moveTo(ex, ey); ctx.lineTo(px + L * .32, py); ctx.stroke();
        const g = ctx.createLinearGradient(0, py, 0, py + 12); g.addColorStop(0, '#fde68a'); g.addColorStop(1, '#a16207'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(px, py + 3, L * .36, 8, 0, 0, TAU); ctx.fill(); });
    });
    return pans;
  },
  /* graduated cylinder: base centre (x, yb), inner width w, height h, capacity cap (mL), liquid volume V; returns geometry */
  cylinder(ctx, x, yb, w, h, cap, V, o = {}) {
    const top = yb - h, lev = yb - 8 - (h - 22) * clamp(V / cap, 0, 1.05);
    K.raw(ctx, () => {
      ctx.fillStyle = 'rgba(148,163,184,.35)'; rr(ctx, x - w / 2 - 14, yb - 8, w + 28, 10, 4); ctx.fill();
      if (V > 0) { const lg = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); const lc = o.liq || '#38bdf8'; lg.addColorStop(0, lc); lg.addColorStop(.5, shade(lc, 30)); lg.addColorStop(1, lc); ctx.globalAlpha = o.liqA ?? .55; ctx.fillStyle = lg; ctx.fillRect(x - w / 2 + 2, lev, w - 4, yb - 8 - lev); ctx.globalAlpha = 1;
        ctx.strokeStyle = shade(o.liq || '#38bdf8', -40); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - w / 2 + 2, lev - 3); ctx.quadraticCurveTo(x, lev + 5, x + w / 2 - 2, lev - 3); ctx.stroke(); }
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x - w / 2, top - 4); ctx.lineTo(x - w / 2, yb - 8); ctx.lineTo(x + w / 2, yb - 8); ctx.lineTo(x + w / 2, top); ctx.lineTo(x + w / 2 + 6, top - 6); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x - w / 2 + 4, top + 4, 5, h - 18);
      const step = o.step || (cap <= 100 ? 10 : cap <= 250 ? 25 : 50), minor = o.minor || step / 5;
      ctx.fillStyle = '#334155'; ctx.font = '700 10px ui-monospace,monospace'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
      for (let v = 0; v <= cap + 1e-6; v += minor) { const yy = yb - 8 - (h - 22) * v / cap; const major = Math.abs(v / step - Math.round(v / step)) < 1e-6; ctx.strokeStyle = '#334155'; ctx.lineWidth = major ? 1.4 : .8; ctx.beginPath(); ctx.moveTo(x + w / 2, yy); ctx.lineTo(x + w / 2 - (major ? 12 : 6), yy); ctx.stroke(); if (major && v > 0) ctx.fillText(Math.round(v), x + w / 2 - 14, yy); }
      ctx.textAlign = 'center'; ctx.font = '800 10px Tajawal,sans-serif'; ctx.direction = 'rtl'; ctx.fillStyle = '#475569'; ctx.fillText(o.unit || 'mL', x, top + 10);
      ctx.textBaseline = 'alphabetic';
    });
    return { lev, top, perML: (h - 22) / cap };
  },
  /* zoom lens showing the meniscus reading */
  lens(ctx, cx, cy, r, drawInside) {
    K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fillStyle = '#fff'; ctx.fill(); ctx.clip(); drawInside(); ctx.restore(); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke(); ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx + r * .72, cy + r * .72); ctx.lineTo(cx + r * 1.15, cy + r * 1.15); ctx.stroke(); ctx.lineCap = 'butt'; });
  },
  /* beaker: bottom centre (x, yb), width w, height h, level 0..1 */
  beaker(ctx, x, yb, w, h, level, o = {}) {
    K.raw(ctx, () => {
      const lev = yb - h * clamp(level, 0, 1);
      if (level > 0) { ctx.globalAlpha = o.liqA ?? .5; ctx.fillStyle = o.liq || '#38bdf8'; ctx.fillRect(x - w / 2 + 2, lev, w - 4, yb - lev - 2); ctx.globalAlpha = 1; ctx.strokeStyle = shade(o.liq || '#38bdf8', -30); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x - w / 2 + 2, lev); ctx.lineTo(x + w / 2 - 2, lev); ctx.stroke(); }
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(x - w / 2 - 6, yb - h - 6); ctx.lineTo(x - w / 2, yb - h); ctx.lineTo(x - w / 2, yb - 4); ctx.quadraticCurveTo(x - w / 2, yb, x - w / 2 + 4, yb); ctx.lineTo(x + w / 2 - 4, yb); ctx.quadraticCurveTo(x + w / 2, yb, x + w / 2, yb - 4); ctx.lineTo(x + w / 2, yb - h); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x - w / 2 + 5, yb - h + 6, 5, h - 14);
    });
    return { lev: yb - h * clamp(level, 0, 1) };
  },
  /* spring balance (newton meter) hanging from (x, y); reading F (N) of max Fmax; returns hook point */
  springBalance(ctx, x, y, F, Fmax = 20, o = {}) {
    const L = o.len || 150, ext = clamp(F / Fmax, 0, 1.05) * (L - 50);
    K.raw(ctx, () => {
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 14); ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y - 18, 5, 0, TAU); ctx.stroke();
      ctx.fillStyle = o.col || '#f59e0b'; rr(ctx, x - 20, y, 40, L, 8); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#fff'; rr(ctx, x - 12, y + 12, 24, L - 24, 4); ctx.fill();
      ctx.fillStyle = '#1e293b'; ctx.font = '700 8.5px ui-monospace,monospace'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
      const n = o.ticks || 4; for (let k = 0; k <= n; k++) { const yy = y + 20 + (L - 50) * k / n; ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - 12, yy); ctx.lineTo(x - 4, yy); ctx.stroke(); ctx.fillText(String(Math.round(Fmax * k / n * 10) / 10), x - 2, yy); }
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.beginPath(); const sy = y + 14, ey = y + 20 + ext; for (let k = 0; k <= 14; k++) { const yy = sy + (ey - sy) * k / 14; ctx.lineTo(x + (k % 2 ? 5 : -5), yy); } ctx.stroke();
      ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(x - 14, y + 20 + ext); ctx.lineTo(x - 4, y + 16 + ext); ctx.lineTo(x - 4, y + 24 + ext); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x, y + 20 + ext); ctx.lineTo(x, y + L + 12); ctx.stroke(); ctx.beginPath(); ctx.arc(x + 4, y + L + 18, 6, -Math.PI / 2, Math.PI * .9); ctx.stroke();
      ctx.fillStyle = '#0f172a'; ctx.font = '800 13px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.fillText(fmt(F, 3) + ' N', x, y - 32);
      ctx.textBaseline = 'alphabetic';
    });
    return { hx: x + 4, hy: y + L + 24 };
  },
  /* thermometer: bulb at (x, yb), tube height h, range [t0,t1], value T */
  thermo(ctx, x, yb, h, T, t0 = -10, t1 = 110, o = {}) {
    K.raw(ctx, () => {
      const top = yb - h, k = clamp((T - t0) / (t1 - t0), 0, 1), yT = yb - 14 - (h - 26) * k;
      ctx.fillStyle = '#f8fafc'; rr(ctx, x - 9, top, 18, h, 9); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = o.liq || '#ef4444'; ctx.beginPath(); ctx.arc(x, yb, 13, 0, TAU); ctx.fill(); ctx.fillRect(x - 3.5, yT, 7, yb - yT);
      ctx.strokeStyle = '#64748b'; ctx.beginPath(); ctx.arc(x, yb, 13, 0, TAU); ctx.stroke();
      ctx.fillStyle = '#334155'; ctx.font = '700 9px ui-monospace,monospace'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
      const st = o.step || 20; for (let v = Math.ceil(t0 / st) * st; v <= t1; v += st) { const yy = yb - 14 - (h - 26) * (v - t0) / (t1 - t0); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 9, yy); ctx.lineTo(x + 15, yy); ctx.stroke(); ctx.fillText(v + '°', x + 17, yy); }
      if (o.show !== false) { ctx.fillStyle = '#0f172a'; ctx.font = '800 13px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.fillText(fmt(T, 3) + ' °C', x, top - 12); }
      ctx.textBaseline = 'alphabetic';
    });
  },
  /* spirit/bunsen burner flame at (x, y) = nozzle top; power 0..1 */
  burner(ctx, x, y, power = 1, t = 0) {
    K.raw(ctx, () => {
      ctx.fillStyle = '#475569'; rr(ctx, x - 22, y + 30, 44, 12, 4); ctx.fill(); ctx.fillStyle = '#64748b'; ctx.fillRect(x - 6, y, 12, 32); ctx.fillStyle = '#94a3b8'; ctx.fillRect(x - 6, y, 4, 32);
      if (power > .02) { const f = 1 + .08 * Math.sin(t * 23) + .05 * Math.sin(t * 37); const H = (26 + 38 * power) * f;
        const g = ctx.createRadialGradient(x, y - H * .3, 2, x, y - H * .35, H * .7); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(.25, 'rgba(96,165,250,.9)'); g.addColorStop(.6, 'rgba(249,115,22,.75)'); g.addColorStop(1, 'rgba(249,115,22,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 9, y); ctx.quadraticCurveTo(x - 14, y - H * .5, x, y - H); ctx.quadraticCurveTo(x + 14, y - H * .5, x + 9, y); ctx.closePath(); ctx.fill(); }
    });
  },
  /* a single particle (molecule) ball */
  ball(ctx, x, y, r, col = '#3b82f6') { K.raw(ctx, () => { const g = ctx.createRadialGradient(x - r * .35, y - r * .35, r * .1, x, y, r); g.addColorStop(0, '#fff'); g.addColorStop(.35, col); g.addColorStop(1, shade(col.length === 7 ? col : '#3b82f6', -45)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }); },
  /* force arrow with label (px length), colour by kind */
  force(ctx, x, y, dx, dy, label, col = '#dc2626', w = 4) { if (Math.hypot(dx, dy) < 2) return; K.raw(ctx, () => { G.arrow(ctx, x, y, x + dx, y + dy, col, w, 10 + w * 1.5); }); if (label) { const L = Math.hypot(dx, dy); G.text(ctx, label, x + dx + dx / L * 16, y + dy + dy / L * 16 - (Math.abs(dy) < 1 ? 14 : 0), { s: 12, w: 900, c: '#fff', bg: col, raw: 1 }); } },
  /* ruler along x from (x,y) of length L px representing Lcm cm */
  ruler(ctx, x, y, L, Lcm, o = {}) {
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot);
      ctx.fillStyle = '#fde047'; rr(ctx, -6, -2, L + 12, 22, 4); ctx.fill(); ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.fillStyle = '#422006'; ctx.font = '700 9px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.direction = 'ltr';
      const px = L / Lcm; for (let c = 0; c <= Lcm * 10 + 1e-6; c++) { const xx = c * px / 10; const major = c % 10 === 0, half = c % 5 === 0; ctx.strokeStyle = '#422006'; ctx.lineWidth = major ? 1.3 : .7; ctx.beginPath(); ctx.moveTo(xx, -2); ctx.lineTo(xx, major ? 9 : half ? 6 : 3.5); ctx.stroke(); if (major && px > 14) ctx.fillText(c / 10, xx, 10); }
      ctx.restore(); ctx.textBaseline = 'alphabetic';
    });
  },
  /* confetti celebration (call K.cheer(S) once; draw each frame with K.party) */
  cheer(S, x, y) { S._conf = Array.from({ length: 36 }, () => ({ x, y, vx: (Math.random() - .5) * 320, vy: -Math.random() * 300 - 80, c: ['#f59e0b', '#ef4444', '#22c55e', '#3b82f6', '#a855f7'][Math.random() * 5 | 0], t: 0 })); if (window.Sound) Sound.ok(); },
  party(ctx, S, dt = 1 / 60) { if (!S._conf) return; K.raw(ctx, () => { S._conf.forEach(p => { p.t += dt; p.vy += 500 * dt; p.x += p.vx * dt; p.y += p.vy * dt; ctx.fillStyle = p.c; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.t * 8); ctx.fillRect(-4, -2, 8, 4); ctx.restore(); }); }); S._conf = S._conf.filter(p => p.t < 1.6); if (!S._conf.length) S._conf = null; }
};
/* register a grade-7 experiment (same schema as X, chapter ids 11..15) */
function X8(def) { def.grade = 'g8'; if (!def.kind) def.kind = 'نشاط'; X(def); }
function X7(def) { def.grade = 'g7'; if (!def.kind) def.kind = 'نشاط'; X(def); }
