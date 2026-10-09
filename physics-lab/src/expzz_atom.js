'use strict';
/* =====================================================================
   group "atom": PhET-style upgrades for chapter 7–9 scenes
   bands · transistor · bohr · spectra · xray · compton · laser · binding · decay · fission
   (overrides only — the original definitions live in exp7.js / exp8.js / exp9.js)
   ===================================================================== */
const ATM = {
  on: (S, k) => S.p[k] !== false,
  /* wavy photon between two points */
  wig(ctx, x1, y1, x2, y2, wl, col, amp = 5, ph = 0, lw = 2) {
    const L = Math.hypot(x2 - x1, y2 - y1); if (L < 1) return; const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), s = Math.sin(a);
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let d = 0; d <= L; d += 1.5) { const o = amp * Math.sin(d / wl * TAU - ph) * Math.min(1, d / 8, (L - d) / 8); const x = x1 + c * d - s * o, y = y1 + s * d + c * o; d ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke();
  },
  /* photon wave packet centred on (x,y) moving along ang, with an arrow head */
  photon(ctx, x, y, ang, col, len = 40, wl = 9, ph = 0, amp = 5) {
    const c = Math.cos(ang), s = Math.sin(ang);
    this.wig(ctx, x - c * len / 2, y - s * len / 2, x + c * len / 2, y + s * len / 2, wl, col, amp, ph, 2.2);
    const hx = x + c * (len / 2 + 7), hy = y + s * (len / 2 + 7); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx - c * 8 - s * 4.5, hy - s * 8 + c * 4.5); ctx.lineTo(hx - c * 8 + s * 4.5, hy - s * 8 - c * 4.5); ctx.closePath(); ctx.fill();
  },
  nmCol(nm) { return nm < 380 ? '#a855f7' : nm > 750 ? '#dc2626' : wlColor(nm); },
  /* on-canvas push button */
  btn(ctx, x, y, w, h, label, on, col = '#2563eb', s = 12) {
    setRaw(ctx, 1); ctx.fillStyle = on ? col : 'rgba(148,163,184,.16)'; rr(ctx, x, y, w, h, 7); ctx.fill(); ctx.strokeStyle = on ? col : 'rgba(148,163,184,.7)'; ctx.lineWidth = 1.3; ctx.stroke(); setRaw(ctx, 0);
    G.text(ctx, label, x + w / 2, y + h / 2 + 1, { s, w: 800, c: on ? '#fff' : '#94a3b8', raw: on ? 1 : 0 });
  },
  box(ctx, x, y, w, h, title, col = 'rgba(148,163,184,.55)') {
    ctx.strokeStyle = col; ctx.lineWidth = 1.2; rr(ctx, x, y, w, h, 10); ctx.stroke();
    if (title) G.text(ctx, title, x + w - 10, y + 12, { s: 11, w: 800, c: '#94a3b8', a: 'right' });
  },
  /* legend: items [[colour, label, kind('dot'|'ring'|'line'|'wave'|'sq')]] laid out horizontally from right to left */
  legend(ctx, xr, y, items, s = 11) {
    let x = xr; ctx.font = `700 ${s}px Tajawal,sans-serif`;
    items.forEach(([c, lab, k]) => {
      const tw = ctx.measureText(lab).width; G.text(ctx, lab, x, y, { s, c: '#94a3b8', a: 'right' }); x -= tw + 12;
      ctx.fillStyle = c; ctx.strokeStyle = c; ctx.lineWidth = 2;
      if (k === 'ring') { ctx.beginPath(); ctx.arc(x, y, 4.5, 0, TAU); ctx.stroke(); }
      else if (k === 'line') { ctx.beginPath(); ctx.moveTo(x - 7, y); ctx.lineTo(x + 7, y); ctx.stroke(); }
      else if (k === 'wave') this.wig(ctx, x - 9, y, x + 9, y, 6, c, 3, 0, 1.8);
      else if (k === 'sq') ctx.fillRect(x - 6, y - 5, 12, 10);
      else { ctx.beginPath(); ctx.arc(x, y, 4.5, 0, TAU); ctx.fill(); }
      x -= 22;
    });
    return x;
  },
  /* rotary knob; frac 0..1 maps to −225°..+45° */
  knobAng: f => rad(-225 + 270 * clamp(f, 0, 1)),
  knob(ctx, x, y, r, frac, label, val, col = '#475569') {
    setRaw(ctx, 1); ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(x, y, r + 4, 0, TAU); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; for (let i = 0; i <= 10; i++) { const a = this.knobAng(i / 10); ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * (r + 5), y + Math.sin(a) * (r + 5)); ctx.lineTo(x + Math.cos(a) * (r + 9), y + Math.sin(a) * (r + 9)); ctx.stroke(); }
    const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 2, x, y, r); g.addColorStop(0, '#94a3b8'); g.addColorStop(1, col); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    const a = this.knobAng(frac); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * .25, y + Math.sin(a) * r * .25); ctx.lineTo(x + Math.cos(a) * r * .9, y + Math.sin(a) * r * .9); ctx.stroke(); setRaw(ctx, 0);
    if (label) G.text(ctx, label, x, y + r + 20, { s: 11, w: 800, c: '#94a3b8' });
    if (val) G.text(ctx, val, x, y - r - 16, { s: 12, w: 800, mono: 1, c: '#fbbf24' });
  },
  /* drag object for a knob bound to a range control */
  knobObj(S, id, x, y, r, key, tip, extra = {}) {
    const c = (S.E.controls || []).find(q => q.k === key); const f = (S.p[key] - c.min) / (c.max - c.min); const a = this.knobAng(f);
    return Object.assign({ id, x: x + Math.cos(a) * r, y: y + Math.sin(a) * r, r: r + 6, cx: x, cy: y, tip, hit: (px, py) => Math.hypot(px - x, py - y) < r + 10,
      drag: (S, d) => { setParam(S, key, S.p[key] + d.dang / rad(270) * (c.max - c.min)); },
      wheel: (S, s) => setParam(S, key, S.p[key] + s * (c.step || (c.max - c.min) / 50) * 2) }, extra);
  },
  thermo(ctx, x, yt, yb, f, label) {
    setRaw(ctx, 1); ctx.fillStyle = '#f1f5f9'; rr(ctx, x - 7, yt - 6, 14, yb - yt + 6, 7); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.beginPath(); ctx.arc(x, yb + 8, 12, 0, TAU); ctx.fillStyle = '#dc2626'; ctx.fill();
    const yl = yb - (yb - yt) * clamp(f, 0, 1); ctx.fillStyle = '#dc2626'; ctx.fillRect(x - 3.5, yl, 7, yb - yl + 4);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; for (let i = 0; i <= 6; i++) { const y = yb - (yb - yt) * i / 6; ctx.beginPath(); ctx.moveTo(x + 7, y); ctx.lineTo(x + 12, y); ctx.stroke(); }
    setRaw(ctx, 0); if (label) G.text(ctx, label, x, yl - 14, { s: 12, w: 800, mono: 1, c: '#fbbf24', bg: 'rgba(15,23,42,.8)', raw: 1 });
  },
  nuc(ctx, x, y, r, prot) { // one nucleon ball like the book (red proton / blue neutron)
    setRaw(ctx, 1); const g = ctx.createRadialGradient(x - r * .35, y - r * .35, r * .15, x, y, r); g.addColorStop(0, prot ? '#fca5a5' : '#93c5fd'); g.addColorStop(1, prot ? '#b91c1c' : '#1d4ed8'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); setRaw(ctx, 0);
  },
  /* packed nucleus of Z protons and N neutrons (deterministic arrangement) */
  nucleus(ctx, cx, cy, Z, N, r, t = 0, jig = 0) {
    const A = Z + N; if (!A) return 0; const R = r * Math.cbrt(A) * 1.05; const pts = [];
    for (let i = 0; i < A; i++) { const a = i * 2.39996, q = A === 1 ? 0 : R * Math.sqrt((i + .5) / A) * .92; pts.push([cx + Math.cos(a) * q, cy + Math.sin(a) * q * .95]); }
    // interleave protons among neutrons evenly
    const isP = i => Math.floor((i + 1) * Z / A) > Math.floor(i * Z / A);
    for (let i = A - 1; i >= 0; i--) { const j = jig ? Math.sin(t * 9 + i * 1.7) * jig : 0; this.nuc(ctx, pts[i][0] + j, pts[i][1] - j * .6, r, isP(i)); }
    return R + r;
  }
};
const B_ = s => `<b>${s}</b>`;

/* ======================= bands: energy bands + crystal lattice ======================= */
(() => {
  const E = EXPS.find(e => e.id === 'bands'); if (!E) return;
  const EG = { cond: 0, Si: 1.1, Ge: .72, ins: 5.5 }, SYM = { cond: 'Cu', Si: 'Si', Ge: 'Ge', ins: 'C' }, kB = 8.617e-5;
  const COLS = 16, ROWS = 3, NCOL = 5, NROW = 4, K = .9;
  E.controls = E.controls.concat([
    TG('lat', 'الشبكة البلورية (منظر الذرات)', true, null, 'atom'),
    TG('holes', 'الفجوات (حاملات موجبة)', true, null, 'charges'),
    TG('jump', 'أسهم انتقال الإلكترونات', true, null, 'energy'),
    TG('lvl', 'مستويا الواهب والمستقبل', true, null, 'energy'),
    TG('bias', 'تسليط فرق جهد (مرور تيار)', false, null, 'current'),
    TG('lbl', 'التسميات وقيم الطاقة', true, null, 'labels')
  ]);
  const cMat = E.controls.find(c => c.k === 'mat'), cDop = E.controls.find(c => c.k === 'dop');
  cMat.on = (v, S, init) => { if (!init && S.bd) resetCarriers(S); };
  cDop.on = (v, S, init) => { if (!S.lat) return; if (init && S._latInit) return; S._latInit = 1; S.lat = S.lat.map(() => 'Si'); if (v === 'n') [6, 13, 3].forEach(i => S.lat[i] = 'As'); if (v === 'p') [6, 13, 3].forEach(i => S.lat[i] = 'In'); syncSites(S); };
  const nOf = (S, t) => S.lat.filter(x => x === t).length;
  function resetCarriers(S) {
    const vb = []; for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) vb.push({ c, r, f: true });
    S.bd = { vb, ce: [], dn: [], ac: [], fx: [], q: 0, lh: [], le: [] }; syncSites(S);
  }
  function syncSites(S) {
    const B = S.bd; if (!B) return; const nd = nOf(S, 'As'), na = nOf(S, 'In');
    while (B.dn.length < nd) B.dn.push({ b: true }); while (B.dn.length > nd) { const d = B.dn.pop(); if (!d.b && B.ce.length) B.ce.pop(); }
    while (B.ac.length < na) B.ac.push({ f: false }); while (B.ac.length > na) { const a = B.ac.pop(); if (a.f) { const h = B.vb.find(s => !s.f && !s.pend); if (h) h.f = true; } }
  }
  E.setup = function (S) { S.parts = []; S.frac = 0; S.lat = new Array(NCOL * NROW).fill('Si'); S._latInit = 0; resetCarriers(S); if (S.p.dop !== 'i') { cDop.on(S.p.dop, S, false); } S._latInit = 1; };
  const geo = S => {
    const W = S.W || 800, H = S.H || 700, lat = ATM.on(S, 'lat') && W >= 640, nar = W < 720;
    const x0 = 80, x1 = lat ? Math.max(300, W * .46) : W - 170, yT = nar ? 132 : 104, yB = H - 118;
    const Hb = yB - yT, bh = Hb * .22, Eg = EG[S.p.mat];
    const gap = S.p.mat === 'cond' ? -bh * .45 : 34 + (Hb - 2 * bh - 34) * Eg / 5.5;
    const off = S.p.mat === 'ins' ? 0 : (Hb - 2 * bh - Math.max(gap, 0) - (S.p.mat === 'cond' ? gap : 0)) * .45; const vb = { x: x0, y: yB - bh - off, w: x1 - x0, h: bh }, cb = { x: x0, y: yB - off - bh - gap - bh, w: x1 - x0, h: bh };
    const tx = x1 + (lat ? 84 : 110);
    const L = { x: tx + 34, y: yT - 8, w: W - 14 - (tx + 34), h: yB - yT + 18 };
    const sp = Math.min(L.w / NCOL, (L.h - 120) / NROW); const ax = L.x + (L.w - sp * NCOL) / 2 + sp / 2, ay = L.y + 30 + (L.h - 90 - sp * NROW) / 2 + sp / 2;
    return { nar, W, H, x0, x1, yT, yB, vb, cb, gap, tx, L, sp, ax, ay, lat, dl: cb.y + cb.h + Math.min(12, gap * .22), al: vb.y - Math.min(12, gap * .22) };
  };
  const slotXY = (g, s) => [g.vb.x + (s.c + .5) / COLS * g.vb.w, g.vb.y + (s.r + .5) / ROWS * g.vb.h];
  const ceXY = (g, e) => [g.cb.x + e.u * g.cb.w, g.cb.y + e.v * g.cb.h];
  const siteX = (g, i, n) => g.x0 + (i + .5) / n * (g.x1 - g.x0);
  const atomXY = (g, i) => [g.ax + (i % NCOL) * g.sp, g.ay + Math.floor(i / NCOL) * g.sp];
  const bonds = g => { const L = []; for (let r = 0; r < NROW; r++) for (let c = 0; c < NCOL; c++) { const i = r * NCOL + c; if (c < NCOL - 1) L.push([i, i + 1]); if (r < NROW - 1) L.push([i, i + NCOL]); } return L; };
  const BONDS = bonds();
  const ion = (S, Ed) => { const kT = kB * Math.max(S.p.T, 1); return 1 / (1 + .0195 * Math.exp(Math.min(60, (Ed - .045) / kT + .045 / kT))); };
  const niT = S => { const Eg = EG[S.p.mat]; if (S.p.mat === 'cond') return 0; if (S.p.T < 1) return 0; return 40 * Math.exp(-Eg / (2 * kB * S.p.T) * .15); };
  function newCE(B, x, y, g) { const e = { u: Math.random() * .9 + .05, v: .2 + Math.random() * .6, vx: (Math.random() - .5) * .3, k: 0, fx: x, fy: y }; B.ce.push(e); return e; }
  E.update = function (S, dt) {
    const B = S.bd; if (!B || !S.W) return; const g = geo(S); const p = S.p; dt = Math.min(dt, .05);
    const cond = p.mat === 'cond';
    if (cond) { while (B.ce.length < 22) newCE(B, null, null, g).k = 1; }
    else {
      const ni = niT(S); const Ed = p.mat === 'Ge' ? .012 : .045; const fd = ion(S, Ed);
      // thermal generation of electron–hole pairs
      if (Math.random() < K * ni * dt * .5) { const fs = B.vb.filter(s => s.f && !s.pend); if (fs.length) { const s = fs[Math.random() * fs.length | 0]; s.f = false; const [x, y] = slotXY(g, s); newCE(B, x, y, g).u = (s.c + .5) / COLS; B.fx.push({ x1: x, y1: y, x2: x, y2: g.cb.y + g.cb.h * .6, k: 0, up: 1 }); } }
      // recombination (mass-action: n·p = ni²)
      const holes = B.vb.filter(s => !s.f && !s.pend); const nfree = B.ce.filter(e => e.k >= 1);
      if (holes.length && nfree.length && Math.random() < K * .5 * nfree.length * holes.length / Math.max(ni, .3) * dt) { const e = nfree[Math.random() * nfree.length | 0]; const h = holes.reduce((b, q) => Math.abs((q.c + .5) / COLS - e.u) < Math.abs((b.c + .5) / COLS - e.u) ? q : b, holes[0]); const [ex, ey] = ceXY(g, e); const [hx, hy] = slotXY(g, h); B.ce.splice(B.ce.indexOf(e), 1); h.pend = true; B.fx.push({ x1: ex, y1: ey, x2: hx, y2: hy, k: 0, dn: 1, done: () => { h.f = true; h.pend = false; } }); }
      // donors: ionise / capture
      B.dn.forEach((d, i) => { const dx = siteX(g, i, B.dn.length);
        if (d.b && !d.pend && Math.random() < K * 1.5 * fd * dt) { d.b = false; newCE(B, dx, g.dl, g).u = (dx - g.x0) / (g.x1 - g.x0); }
        else if (!d.b && !d.pend && Math.random() < K * 1.5 * (1 - fd) * dt) { const fr = B.ce.filter(e => e.k >= 1); if (fr.length) { const e = fr[Math.random() * fr.length | 0]; const [ex, ey] = ceXY(g, e); B.ce.splice(B.ce.indexOf(e), 1); d.pend = true; B.fx.push({ x1: ex, y1: ey, x2: dx, y2: g.dl, k: 0, dn: 1, done: () => { d.b = true; d.pend = false; } }); } } });
      // acceptors: capture an electron from the valence band (leaves a hole) / release
      B.ac.forEach((a, i) => { const axp = siteX(g, i, B.ac.length);
        if (!a.f && !a.pend && Math.random() < K * 1.5 * fd * dt) { const fs = B.vb.filter(s => s.f && !s.pend); if (fs.length) { const s = fs.reduce((b, q) => Math.abs(slotXY(g, q)[0] - axp) < Math.abs(slotXY(g, b)[0] - axp) && q.r === 0 ? q : b, fs[0]); s.f = false; a.pend = true; const [x, y] = slotXY(g, s); B.fx.push({ x1: x, y1: y, x2: axp, y2: g.al, k: 0, up: 1, done: () => { a.f = true; a.pend = false; } }); } }
        else if (a.f && !a.pend && Math.random() < K * 1.5 * (1 - fd) * dt) { const hs = B.vb.filter(s => !s.f && !s.pend); if (hs.length) { const h = hs[Math.random() * hs.length | 0]; a.f = false; h.pend = true; const [x, y] = slotXY(g, h); B.fx.push({ x1: axp, y1: g.al, x2: x, y2: y, k: 0, dn: 1, done: () => { h.f = true; h.pend = false; } }); } } });
      // hole hopping (a neighbouring valence electron moves into the hole)
      const bias = p.bias;
      B.vb.forEach(s => { if (s.f || s.pend) return; if (Math.random() < (bias ? 2.2 : 1.1) * dt) { let dc = Math.random() < (bias ? .85 : .5) ? -1 : 1, dr = 0; if (!bias && Math.random() < .35) { dc = 0; dr = Math.random() < .5 ? -1 : 1; } let c = s.c + dc, r = s.r + dr; if (bias) { if (c < 0) { c = COLS - 1; B.q += .5; } } if (c < 0 || c >= COLS || r < 0 || r >= ROWS) return; const n = B.vb[r * COLS + c]; if (!n.f || n.pend) return; n.f = false; s.f = true; s.ax = n.c; s.ay = n.r; s.ak = 0; } });
    }
    // conduction-band electrons wander / drift
    B.ce.forEach(e => { if (e.k < 1) { e.k = Math.min(1, e.k + dt * 2.2); return; } e.vx += (Math.random() - .5) * dt * 1.4; e.vx = clamp(e.vx, -.35, .35); const dr = p.bias ? .22 : 0; e.u += (e.vx + dr) * dt * (cond ? 1.4 : 1); e.v = clamp(e.v + (Math.random() - .5) * dt * .6, .12, .88);
      if (p.bias) { if (e.u > 1) { e.u -= 1; B.q += 1; } if (e.u < 0) e.u += 1; } else { if (e.u < .02) { e.u = .02; e.vx = Math.abs(e.vx); } if (e.u > .98) { e.u = .98; e.vx = -Math.abs(e.vx); } } });
    B.vb.forEach(s => { if (s.ak != null) { s.ak += dt * 4; if (s.ak >= 1) s.ak = s.ax = s.ay = null; } });
    B.fx.forEach(f => { f.k += dt * 2.2; if (f.k >= 1 && f.done) { f.done(); f.done = null; } }); B.fx = B.fx.filter(f => f.k < 1.4);
    // current meter (smoothed charge flow)
    B.I = lerp(B.I || 0, (B.q - (B.q0 || 0)) / dt * .1, .04); B.q0 = B.q;
    // lattice picture: holes on bonds and free electrons
    const nH = B.vb.filter(s => !s.f).length, nE = B.ce.length;
    const wantH = Math.min(nH, 6), wantE = Math.min(nE, 7);
    while (B.lh.length < wantH) B.lh.push({ b: Math.random() * BONDS.length | 0, t: 0 }); while (B.lh.length > wantH) B.lh.pop();
    B.lh.forEach(h => { h.t += dt; if (h.t > (p.bias ? .45 : .9) + Math.random()) { h.t = 0; const [a, b] = BONDS[h.b]; const nb = BONDS.map((q, i) => [q, i]).filter(([q, i]) => i !== h.b && (q.includes(a) || q.includes(b)));
      let pick = nb[Math.random() * nb.length | 0]; if (p.bias) { const gx = i => i % NCOL; const lefts = nb.filter(([q]) => (gx(q[0]) + gx(q[1])) < gx(a) + gx(b)); if (lefts.length && Math.random() < .85) pick = lefts[Math.random() * lefts.length | 0]; else if (!lefts.length && Math.random() < .7) { const rr0 = Math.floor(a / NCOL); const i2 = BONDS.findIndex(q => q[0] === rr0 * NCOL + NCOL - 2 && q[1] === rr0 * NCOL + NCOL - 1); if (i2 >= 0) { h.b = i2; return; } } }
      if (pick) h.b = pick[1]; } });
    while (B.le.length < wantE) B.le.push({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 }); while (B.le.length > wantE) B.le.pop();
    B.le.forEach(e => { e.vx += (Math.random() - .5) * dt; e.vy += (Math.random() - .5) * dt; e.vx = clamp(e.vx, -.25, .25); e.vy = clamp(e.vy, -.25, .25); e.x += (e.vx + (p.bias ? .18 : 0)) * dt; e.y += e.vy * dt; if (p.bias) { if (e.x > 1) e.x -= 1; } else if (e.x < 0 || e.x > 1) e.vx *= -1; if (e.y < 0 || e.y > 1) e.vy *= -1; e.x = p.bias ? e.x : clamp(e.x, 0, 1); e.y = clamp(e.y, 0, 1); });
    S.frac = nE / 70;
  };
  const eDot = (ctx, x, y, r = 4.2) => { ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); if (r > 3.5) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(x - 2.2, y); ctx.lineTo(x + 2.2, y); ctx.stroke(); } };
  const hDot = (ctx, x, y, r = 4.6) => { setRaw(ctx, 1); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); setRaw(ctx, 0); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 1.8; ctx.stroke(); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - 2.3, y); ctx.lineTo(x + 2.3, y); ctx.moveTo(x, y - 2.3); ctx.lineTo(x, y + 2.3); ctx.stroke(); };
  const MATS = [['cond', 'موصل Cu'], ['Si', 'سليكون Si'], ['Ge', 'جرمانيوم Ge'], ['ins', 'عازل (ماس)']], DOPS = [['i', 'نقي'], ['n', 'نوع n'], ['p', 'نوع p']];
  const tabs = g => { const L = []; let x = g.x0; const mw = g.nar ? Math.min(92, (g.W - g.x0 - 30) / 4 - 5) : 92; MATS.forEach(([k, l]) => { L.push({ k, l, x, y: 18, w: mw, h: 28, set: 'mat' }); x += mw + 5; }); if (g.nar) x = g.x0; else x += 14; DOPS.forEach(([k, l]) => { L.push({ k, l, x, y: g.nar ? 52 : 18, w: 62, h: 28, set: 'dop' }); x += 66; }); return L; };
  const tokens = g => { const y = g.L.y + g.L.h - 26; const cx = g.L.x + g.L.w / 2; return [{ t: 'As', x: cx - 70, y, col: '#16a34a' }, { t: 'In', x: cx, y, col: '#db2777' }, { t: 'Si', x: cx + 70, y, col: '#64748b' }]; };
  function setAtom(S, i, t) {
    if (t === 'As') S.lat = S.lat.map(x => x === 'In' ? 'Si' : x); if (t === 'In') S.lat = S.lat.map(x => x === 'As' ? 'Si' : x);
    if (t !== 'Si' && S.lat.filter(x => x !== 'Si').length >= 6 && S.lat[i] === 'Si') { Runner.toast('يكفي 6 ذرات شائبة في هذا الجزء من البلورة'); return; }
    S.lat[i] = t; syncSites(S); const nd = nOf(S, 'As'), na = nOf(S, 'In'); setParam(S, 'dop', nd ? 'n' : na ? 'p' : 'i', false); S.nDop = nd + na;
  }
  const atomAt = (g, x, y) => { for (let i = 0; i < NCOL * NROW; i++) { const [ax, ay] = atomXY(g, i); if (Math.hypot(x - ax, y - ay) < g.sp * .3) return i; } return -1; };
  E.pointer = null;
  E.drags = S => {
    const g = geo(S); const L = []; const Tf = S.p.T / 600; const yl = g.yB - 10 - (g.yB - 10 - (g.yT + 20)) * Tf;
    L.push({ id: 'therm', x: g.tx, y: yl, w: 34, h: 30, axis: 'y', tip: 'اسحب لتغيير درجة الحرارة (أو عجلة الفأرة)', idle: 'اسحب لتسخين البلورة ✋', drag: (S, d) => { const y = d.oy + d.y - d.sy; setParam(S, 'T', (g.yB - 10 - y) / (g.yB - 10 - g.yT - 20) * 600); }, wheel: (S, s) => setParam(S, 'T', S.p.T + s * 25) });
    tabs(g).forEach(b => L.push({ id: 'tab_' + b.k, x: b.x + b.w / 2, y: b.y + b.h / 2, w: b.w, h: b.h, hint: false, tip: b.set === 'mat' ? 'اختر المادة' : 'نوع التطعيم', click: S => { if (b.set === 'mat') { setParam(S, 'mat', b.k); } else { S._latInit = 0; setParam(S, 'dop', b.k); } S.nTab = (S.nTab || 0) + 1; } }));
    if (g.lat) {
      tokens(g).forEach(t => { const held = S.hold && S.hold.t === t.t; L.push({ id: 'tok_' + t.t, x: held ? S.hold.x : t.x, y: held ? S.hold.y : t.y, r: 20, axis: 'xy', tip: t.t === 'Si' ? 'اسحب Si فوق ذرة شائبة لإزالة التطعيم' : t.t === 'As' ? 'اسحب ذرة زرنيخ (خماسية التكافؤ) إلى ذرة في البلورة' : 'اسحب ذرة إنديوم (ثلاثية التكافؤ) إلى ذرة في البلورة', idle: 'اسحب ذرة شائبة إلى البلورة', hint: t.t !== 'Si',
        down: (S, x, y) => { S.hold = { t: t.t, x: t.x, y: t.y }; }, drag: (S, d) => { S.hold.x = d.ox + d.x - d.sx; S.hold.y = d.oy + d.y - d.sy; }, up: S => { if (!S.hold) return; const i = atomAt(g, S.hold.x, S.hold.y); if (i >= 0) setAtom(S, i, S.hold.t); else Runner.toast('أفلت الذرة فوق إحدى ذرات البلورة'); S.nTok = (S.nTok || 0) + 1; S.hold = null; } }); });
      L.push({ id: 'lattice', x: atomXY(g, 7)[0], y: atomXY(g, 7)[1], w: g.sp * NCOL, h: g.sp * NROW, hint: false, tip: 'انقر ذرة لتبديلها: Si ← As ← In', hit: (x, y) => atomAt(g, x, y) >= 0, click: (S, x, y) => { const i = atomAt(g, x, y); if (i < 0) return; const nx = { Si: 'As', As: 'In', In: 'Si' }[S.lat[i]]; setAtom(S, i, nx); } });
    }
    L.push({ id: 'batt', x: g.x0 + (g.x1 - g.x0) / 2, y: g.yB + 34, w: 150, h: 30, hint: false, tip: 'انقر لتوصيل البطارية أو فصلها', click: S => setParam(S, 'bias', !S.p.bias) });
    return L;
  };
  E.draw = function (ctx, w, h, S) {
    G.bg(ctx, w, h); const p = S.p, B = S.bd; if (!B) return; const g = geo(S); const on = k => ATM.on(S, k); const cond = p.mat === 'cond', Eg = EG[p.mat];
    // tabs
    tabs(g).forEach(b => ATM.btn(ctx, b.x, b.y, b.w, b.h, b.l, p[b.set] === b.k, b.set === 'mat' ? '#2563eb' : b.k === 'n' ? '#16a34a' : b.k === 'p' ? '#db2777' : '#475569'));
    // energy axis
    G.arrow(ctx, g.x0 - 18, g.yB, g.x0 - 18, g.yT - 6, '#94a3b8', 1.6, 8); G.text(ctx, 'الطاقة', g.x0 - 18, g.yT - 18, { s: 11, c: '#94a3b8' });
    // bands
    const band = (r, col, a) => { setRaw(ctx, 1); ctx.fillStyle = col.replace('A', a); rr(ctx, r.x, r.y, r.w, r.h, 6); ctx.fill(); setRaw(ctx, 0); ctx.strokeStyle = col.replace('A', .9); ctx.lineWidth = 1.5; rr(ctx, r.x, r.y, r.w, r.h, 6); ctx.stroke(); };
    band(g.vb, 'rgba(59,130,246,A)', .2); band(g.cb, 'rgba(234,88,12,A)', .16);
    if (on('lbl')) {
      G.text(ctx, 'حزمة التوصيل', g.cb.x + g.cb.w - 8, g.cb.y + 12, { s: 12, w: 800, c: '#c2410c', a: 'right' }); G.text(ctx, 'حزمة التكافؤ', g.vb.x + g.vb.w - 8, g.vb.y + g.vb.h - 11, { s: 12, w: 800, c: '#1d4ed8', a: 'right' });
      if (!cond) { const xa = g.x1 + 16; G.arrow(ctx, xa, g.vb.y, xa, g.cb.y + g.cb.h, '#b45309', 1.6, 7); G.arrow(ctx, xa, g.cb.y + g.cb.h, xa, g.vb.y, '#b45309', 1.6, 7); G.text(ctx, 'Eg', xa + 7, (g.vb.y + g.cb.y + g.cb.h) / 2 - 9, { s: 13, w: 900, c: '#b45309', a: 'left' }); G.text(ctx, Eg + ' eV', xa + 7, (g.vb.y + g.cb.y + g.cb.h) / 2 + 9, { s: 11, mono: 1, c: '#b45309', a: 'left' }); if (g.gap > 60) G.text(ctx, 'الفجوة المحظورة', (g.x0 + g.x1) / 2, (g.vb.y + g.cb.y + g.cb.h) / 2, { s: 12, c: '#94a3b8' }); }
      else G.text(ctx, 'الحزمتان متداخلتان', (g.x0 + g.x1) / 2, (g.vb.y + g.cb.y + g.cb.h) / 2 + 2, { s: 12, w: 800, c: '#b45309', bg: 'rgba(255,255,255,.0)' });
    }
    // donor / acceptor levels
    if (!cond && on('lvl')) {
      if (B.dn.length) { ctx.setLineDash([6, 4]); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(g.x0, g.dl); ctx.lineTo(g.x1, g.dl); ctx.stroke(); ctx.setLineDash([]); if (on('lbl')) G.text(ctx, 'مستوى الواهب (As)', g.x0 + 6, g.dl + 12, { s: 11, w: 800, c: '#16a34a', a: 'left' }); }
      if (B.ac.length) { ctx.setLineDash([6, 4]); ctx.strokeStyle = '#db2777'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(g.x0, g.al); ctx.lineTo(g.x1, g.al); ctx.stroke(); ctx.setLineDash([]); if (on('lbl')) G.text(ctx, 'مستوى المستقبل (In)', g.x0 + 6, g.al - 12, { s: 11, w: 800, c: '#db2777', a: 'left' }); }
    }
    if (!cond) {
      B.dn.forEach((d, i) => { const x = siteX(g, i, B.dn.length); if (on('lvl')) { ctx.fillStyle = '#16a34a'; ctx.font = '900 12px Tajawal'; } if (d.b) eDot(ctx, x, g.dl); else if (on('lvl')) G.text(ctx, '+', x, g.dl, { s: 15, w: 900, c: '#16a34a' }); });
      B.ac.forEach((a, i) => { const x = siteX(g, i, B.ac.length); if (a.f) eDot(ctx, x, g.al, 3.6); else if (on('lvl')) { ctx.strokeStyle = '#db2777'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(x, g.al, 4, 0, TAU); ctx.stroke(); } });
    }
    // valence electrons and holes
    B.vb.forEach(s => { const [x, y] = slotXY(g, s); if (s.f) { let px = x, py = y; if (s.ak != null) { const [ox, oy] = slotXY(g, { c: s.ax, r: s.ay }); px = lerp(ox, x, s.ak); py = lerp(oy, y, s.ak); } eDot(ctx, px, py, 3.6); } else if (on('holes')) hDot(ctx, x, y); });
    if (cond) { /* fill the lower half of overlapping band */ }
    B.ce.forEach(e => { let [x, y] = ceXY(g, e); if (e.k < 1 && e.fx != null) { const t = e.k * e.k * (3 - 2 * e.k); x = lerp(e.fx, x, t); y = lerp(e.fy, y, t); } eDot(ctx, x, y); });
    if (on('jump')) B.fx.forEach(f => { const k = Math.min(1, f.k); const a = 1 - Math.max(0, f.k - 1) / .4; ctx.globalAlpha = a; G.arrow(ctx, f.x1, f.y1, lerp(f.x1, f.x2, Math.max(.15, k)), lerp(f.y1, f.y2, Math.max(.15, k)), f.up ? '#ea580c' : '#0891b2', 2, 8); if (f.up && k < .6) G.text(ctx, 'طاقة حرارية', f.x1 - 6, f.y1 - 16, { s: 10, w: 800, c: '#ea580c', a: 'right' }); ctx.globalAlpha = 1; if (f.dn && f.k < 1) eDot(ctx, lerp(f.x1, f.x2, k), lerp(f.y1, f.y2, k)); });
    // bias: battery under the bands, electrons drift towards +
    const by = g.yB + 34, bx = (g.x0 + g.x1) / 2;
    ctx.strokeStyle = p.bias ? '#cbd5e1' : 'rgba(148,163,184,.6)'; ctx.lineWidth = 2; ctx.setLineDash(p.bias ? [] : [5, 4]); ctx.beginPath(); ctx.moveTo(g.x0 - 6, g.cb.y + g.cb.h / 2); ctx.lineTo(g.x0 - 6, by); ctx.lineTo(bx - 10, by); ctx.moveTo(bx + 10, by); ctx.lineTo(g.x1 + 6, by); ctx.lineTo(g.x1 + 6, g.cb.y + g.cb.h / 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.lineWidth = 3; ctx.strokeStyle = '#cbd5e1'; ctx.beginPath(); ctx.moveTo(bx - 10, by - 13); ctx.lineTo(bx - 10, by + 13); ctx.stroke(); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(bx + 8, by - 7); ctx.lineTo(bx + 8, by + 7); ctx.stroke();
    G.text(ctx, '−', bx - 22, by - 12, { s: 15, w: 900, c: '#2563eb' }); G.text(ctx, '+', bx + 22, by - 12, { s: 15, w: 900, c: '#dc2626' });
    G.text(ctx, p.bias ? 'البطارية موصولة' : 'انقر لتوصيل البطارية', bx, by + 24, { s: 11, w: 800, c: p.bias ? '#15803d' : '#94a3b8' });
    if (p.bias && on('lbl')) { G.arrow(ctx, g.x0 + 20, g.cb.y - 12, g.x0 + 90, g.cb.y - 12, '#2563eb', 2, 8); G.text(ctx, 'انجراف الإلكترونات نحو القطب الموجب', g.x0 + 96, g.cb.y - 12, { s: 11, w: 800, c: '#2563eb', a: 'left' }); if (on('holes')) { G.arrow(ctx, g.x0 + 90, g.vb.y + g.vb.h + 14, g.x0 + 20, g.vb.y + g.vb.h + 14, '#dc2626', 2, 8); G.text(ctx, 'انجراف الفجوات نحو القطب السالب', g.x0 + 96, g.vb.y + g.vb.h + 14, { s: 11, w: 800, c: '#dc2626', a: 'left' }); } }
    // ammeter
    const I = cond ? 40 : B.ce.length + .6 * B.vb.filter(s => !s.f).length; G.meter(ctx, g.x0 + 28, g.yB + 58, 24, p.bias ? I : 0, 30, 'I', p.bias ? (I < .5 ? '≈ 0' : 'I ∝ n + p') : '0');
    // thermometer
    ATM.thermo(ctx, g.tx, g.yT + 20, g.yB - 10, p.T / 600, Math.round(p.T) + ' K'); G.text(ctx, 'درجة الحرارة', g.tx, g.yB + 30, { s: 11, w: 800, c: '#94a3b8' });
    // lattice view
    if (g.lat) {
      ATM.box(ctx, g.L.x, g.L.y, g.L.w, g.L.h, 'الشبكة البلورية (' + SYM[p.mat] + ')');
      const sym = SYM[p.mat], sp = g.sp, rA = sp * .24;
      const holes = new Set(B.lh.map(q => q.b));
      // In atoms with an un-accepted hole show it on their right bond
      const inHole = new Set(); let ai = 0; S.lat.forEach((t, i) => { if (t === 'In') { const a = B.ac[ai++]; if (!a || !a.f) { const bi = BONDS.findIndex(q => q[0] === i || q[1] === i); if (bi >= 0) inHole.add(bi); } } });
      BONDS.forEach(([a, b], bi) => { const [x1, y1] = atomXY(g, a), [x2, y2] = atomXY(g, b); const vx = x2 - x1, vy = y2 - y1, l = Math.hypot(vx, vy), nx = -vy / l * 3.5, ny = vx / l * 3.5;
        ctx.strokeStyle = 'rgba(100,116,139,.55)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x1 + nx, y1 + ny); ctx.lineTo(x2 + nx, y2 + ny); ctx.moveTo(x1 - nx, y1 - ny); ctx.lineTo(x2 - nx, y2 - ny); ctx.stroke();
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, ox = vx / l * 6, oy = vy / l * 6;
        eDot(ctx, mx - ox, my - oy, 3.3); if (!cond && (holes.has(bi) && on('holes') || inHole.has(bi))) hDot(ctx, mx + ox, my + oy, 4); else eDot(ctx, mx + ox, my + oy, 3.3); });
      let di = 0, ai2 = 0;
      S.lat.forEach((t, i) => { const [x, y] = atomXY(g, i); const col = t === 'As' ? '#16a34a' : t === 'In' ? '#db2777' : '#64748b';
        setRaw(ctx, 1); const gr = ctx.createRadialGradient(x - rA * .35, y - rA * .35, 2, x, y, rA); gr.addColorStop(0, '#f8fafc'); gr.addColorStop(1, col); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, rA, 0, TAU); ctx.fill(); setRaw(ctx, 0);
        G.text(ctx, t === 'Si' ? sym : t, x, y + 1, { s: 12, w: 900, c: '#fff', raw: 1 });
        if (t === 'As') { const d = B.dn[di++]; if (d && d.b && !cond) { const a = S.t * 3 + i; ctx.strokeStyle = 'rgba(22,163,74,.5)'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, rA + 9, 0, TAU); ctx.stroke(); ctx.setLineDash([]); eDot(ctx, x + Math.cos(a) * (rA + 9), y + Math.sin(a) * (rA + 9), 4); } else G.text(ctx, '+', x + rA * .9, y - rA * .9, { s: 14, w: 900, c: '#16a34a' }); }
        if (t === 'In') { const a = B.ac[ai2++]; if (a && a.f) G.text(ctx, '−', x + rA * .9, y - rA * .9, { s: 16, w: 900, c: '#db2777' }); }
      });
      // free electrons in the lattice
      B.le.forEach(e => eDot(ctx, g.ax - sp / 2 + e.x * sp * NCOL, g.ay - sp / 2 + e.y * sp * NROW, 4.4));
      if (on('lbl')) G.text(ctx, cond ? 'بحر من الإلكترونات الحرة بين أيونات النحاس' : 'كل خط مزدوج = آصرة تساهمية (إلكترونان)', g.L.x + g.L.w / 2, g.ay + sp * (NROW - .5) + 12, { s: 11, c: '#94a3b8' });
      // tokens tray
      const tk = tokens(g); ATM.box(ctx, g.L.x + 10, tk[0].y - 22, g.L.w - 20, 44);
      tk.forEach(t => { const held = S.hold && S.hold.t === t.t; const x = held ? S.hold.x : t.x, y = held ? S.hold.y : t.y; setRaw(ctx, 1); ctx.fillStyle = t.col; ctx.beginPath(); ctx.arc(x, y, 15, 0, TAU); ctx.fill(); setRaw(ctx, 0); G.text(ctx, t.t, x, y + 1, { s: 12, w: 900, c: '#fff', raw: 1 }); if (!held) G.text(ctx, t.t === 'As' ? 'واهبة' : t.t === 'In' ? 'مستقبلة' : 'إزالة', x + 30, y, { s: 10, w: 800, c: '#94a3b8' }); });
    }
    // legend + carrier counts
    const nE = B.ce.length, nH = B.vb.filter(s => !s.f).length;
    ATM.legend(ctx, g.x1, g.yT - 22, [['#2563eb', 'إلكترون حر', 'dot'], ['#dc2626', 'فجوة', 'ring']]);
    if (on('lbl')) G.text(ctx, `n = ${nE}   p = ${nH}`, g.x0 + 4, g.yT - 22, { s: 13, w: 900, mono: 1, c: '#0f766e', a: 'left' });
  };
  E.readings = function (S) { const B = S.bd || { ce: [], vb: [] }; const p = S.p; const ne = B.ce.length, nh = B.vb.filter(s => !s.f).length; const nd = S.lat ? nOf(S, 'As') : 0, na = S.lat ? nOf(S, 'In') : 0;
    return [rd('إلكترونات في حزمة التوصيل n', ne + ''), rd('فجوات في حزمة التكافؤ p', nh + ''), rd('فجوة الطاقة Eg', p.mat === 'cond' ? '0 (تداخل)' : EG[p.mat] + ' eV'), rd('ذرات شائبة (As / In)', nd + ' / ' + na), rd('حاملات الأغلبية', p.mat === 'cond' ? 'إلكترونات' : ne > nh ? 'الإلكترونات (نوع n)' : nh > ne ? 'الفجوات (نوع p)' : 'متساوية (نقي)'), rd('التوصيل الكهربائي', p.mat === 'cond' ? 'جيد جداً' : p.mat === 'ins' ? 'معدوم تقريباً' : ne + nh > 12 ? 'جيد' : ne + nh > 3 ? 'ضعيف' : 'ضعيف جداً')]; };
  E.explain = S => { const p = S.p, B = S.bd; if (!B) return ''; const ne = B.ce.length, nh = B.vb.filter(s => !s.f).length;
    if (p.mat === 'cond') return 'في الموصل تتداخل حزمتا التكافؤ والتوصيل فتتوافر إلكترونات حرة كثيرة مهما كانت درجة الحرارة.';
    if (p.mat === 'ins') return `فجوة الطاقة في العازل كبيرة (${B_('5.5eV')}) فلا تكفي الطاقة الحرارية لنقل الإلكترونات إلى حزمة التوصيل.`;
    if (p.T < 30) return 'عند درجات حرارة قريبة من الصفر المطلق تبقى الإلكترونات في حزمة التكافؤ فيسلك شبه الموصل سلوك العازل.';
    return p.dop === 'n' ? `ذرات الزرنيخ الخماسية تمنح إلكتروناتها الخامسة لحزمة التوصيل فتصبح ${B_('الإلكترونات حاملات الأغلبية')} (n = ${ne} ، p = ${nh}).` : p.dop === 'p' ? `ذرات الإنديوم الثلاثية تقتنص إلكترونات من حزمة التكافؤ فتتولد فجوات تصبح ${B_('حاملات الأغلبية')} (p = ${nh} ، n = ${ne}).` : `كل إلكترون يقفز إلى حزمة التوصيل يترك ${B_('فجوة')} في حزمة التكافؤ، لذا n = p في البلورة النقية. ارفع درجة الحرارة لتزداد الأزواج.`; };
  E.howto = '<b>جرّب:</b> اسحب مؤشر المحرار لتسخين البلورة، واختر المادة من الأزرار أعلى المسرح. اسحب ذرة <b>As</b> أو <b>In</b> إلى الشبكة (أو انقر أي ذرة لتبديلها) لتطعيم البلورة، وانقر البطارية لتشاهد انجراف الإلكترونات والفجوات.';
})();

/* ======================= transistor: npn common-emitter amplifier ======================= */
(() => {
  const E = EXPS.find(e => e.id === 'transistor'); if (!E) return;
  E.controls = E.controls.concat([
    TG('flow', 'حركة الإلكترونات في الدائرة', true, null, 'electron'),
    TG('conv', 'أسهم التيار الاصطلاحي', false, null, 'current'),
    TG('phys', 'داخل الترانزستور (n-p-n)', true, null, 'eye'),
    TG('scope', 'راسم الإشارة (الداخلة والخارجة)', true, null, 'wave'),
    TG('load', 'خط الحمل ونقطة التشغيل', true, null, 'graph'),
    TG('lbl', 'قيم التيارات والفولطيات', true, null, 'labels')
  ]);
  const geo = S => {
    const W = S.W || 800, H = S.H || 700; const x0 = 84, x1 = Math.max(360, W * .6), y0 = 64, y1 = Math.max(330, H * .6);
    const tx = x0 + (x1 - x0) * .52, ty = y0 + (y1 - y0) * .56; const top = y0 + 26, gnd = y1 - 10;
    const rc = { x: tx + 12, y1: top + 30, y2: ty - 70 }; const rb = { y: ty, x1: x0 + 70, x2: tx - 70 };
    const src = { x: x0 + 30, y: (ty + gnd) / 2 + 6 }; const kIB = { x: x0 + 96, y: ty + 66 }, kS = { x: x0 + 172, y: ty + 66 }; const vcc = { x: x1 - 24, y: (top + gnd) / 2 };
    const col = { x: Math.max(x1 + 22, W * .63), w: W - 16 - Math.max(x1 + 22, W * .63) };
    const ph = { x: x0, y: y1 + 34, w: x1 - x0, h: Math.min(96, H - y1 - 190) };
    return { W, H, x0, x1, y0, y1, tx, ty, top, gnd, rc, rb, src, vcc, col, ph, kIB, kS };
  };
  const calc = E.calc;
  E.setup = function (S) { S.hi = []; S.ho = []; S.el = []; S.nC = 0; S.nB = 0; S.acc = 0; S.r = calc.call(E, S, 0); };
  E.update = function (S, dt) {
    const r = calc.call(E, S, S.t); S.r = r; (S.hi = S.hi || []).push([S.t, r.ib * 1e6]); (S.ho = S.ho || []).push([S.t, r.vce]); if (S.hi.length > 300) { S.hi.shift(); S.ho.shift(); }
    // inside the transistor: electrons injected from the emitter, 1 in (β+1) recombines in the base
    const rate = Math.min(70, r.ie * 1e3 * 7); S.acc = (S.acc || 0) + rate * dt; const beta = S.p.beta;
    while (S.acc > 1) { S.acc -= 1; S.el.push({ x: 0, y: .15 + Math.random() * .7, b: Math.random() < 1 / (beta + 1) || r.sat && Math.random() < .5 }); }
    S.el.forEach(e => { if (e.b && e.x > .44) { e.y += dt * 1.1; e.x += (.47 - e.x) * dt * 4; if (e.y > 1.15) { e.dead = 1; S.nB++; } return; } e.x += dt * (e.x < .4 ? .32 : e.x < .52 ? .9 : .7); e.y += (Math.random() - .5) * dt * .4; e.y = clamp(e.y, .08, .92); if (e.x > 1) { e.dead = 1; S.nC++; } });
    S.el = S.el.filter(e => !e.dead); if (S.el.length > 160) S.el.splice(0, S.el.length - 160);
  };
  const zig = (ctx, x1, y1, x2, y2, n = 6, a = 7) => { const L = Math.hypot(x2 - x1, y2 - y1), c = (x2 - x1) / L, s = (y2 - y1) / L; ctx.beginPath(); ctx.moveTo(x1, y1); for (let i = 1; i < n * 2; i++) { const d = L * i / (n * 2); const o = (i % 2 ? a : -a); ctx.lineTo(x1 + c * d - s * o, y1 + s * d + c * o); } ctx.lineTo(x2, y2); ctx.stroke(); };
  const batt = (ctx, x, y, vert, lab) => { ctx.lineWidth = 3; ctx.beginPath(); if (vert) { ctx.moveTo(x - 14, y - 5); ctx.lineTo(x + 14, y - 5); ctx.stroke(); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 7, y + 5); ctx.lineTo(x + 7, y + 5); } ctx.stroke(); ctx.lineWidth = 2; };
  E.pointer = null;
  E.drags = S => {
    const g = geo(S); const p = S.p; const L = [];
    L.push(ATM.knobObj(S, 'kIB', g.kIB.x, g.kIB.y, 16, 'IB', 'أدر المقبض لتغيير تيار القاعدة المستمر IB', { idle: 'أدر مقبض تيار القاعدة ✋' }));
    L.push(ATM.knobObj(S, 'kVin', g.kS.x, g.kS.y, 14, 'vin', 'أدر المقبض لتغيير سعة الإشارة الداخلة'));
    L.push(ATM.knobObj(S, 'kVcc', g.vcc.x, g.vcc.y + 76, 14, 'VCC', 'أدر المقبض لتغيير VCC', { hint: false }));
    const fr = (p.RC - .5) / 4.5; const wy = lerp(g.rc.y1 + 6, g.rc.y2 - 6, fr);
    L.push({ id: 'rc', x: g.rc.x + 20, y: wy, r: 14, axis: 'y', tip: 'اسحب منزلق المقاومة المتغيرة لتغيير RC', drag: (S, d) => { const y = d.oy + d.y - d.sy; setParam(S, 'RC', .5 + 4.5 * clamp((y - g.rc.y1 - 6) / (g.rc.y2 - g.rc.y1 - 12), 0, 1)); } });
    L.push({ id: 'tr', x: g.tx, y: g.ty, r: 34, axis: 'y', hint: false, tip: 'اسحب لأعلى/أسفل (أو العجلة) لتغيير ربح التيار β', drag: (S, d) => setParam(S, 'beta', S.p.beta - d.dy * 1.2), wheel: (S, s) => setParam(S, 'beta', S.p.beta + s * 10) });
    if (ATM.on(S, 'phys')) L.push({ id: 'npn', x: g.ph.x + g.ph.w / 2, y: g.ph.y + g.ph.h / 2, w: g.ph.w, h: g.ph.h, hint: false, tip: 'انقر لتصفير العدادات', click: S => { S.nC = 0; S.nB = 0; S.zc = (S.zc || 0) + 1; } });
    return L;
  };
  E.draw = function (ctx, w, h, S) {
    G.bg(ctx, w, h); const p = S.p, g = geo(S); const r = S.r || calc.call(E, S, 0); const on = k => ATM.on(S, k);
    const ink = '#cbd5e1'; ctx.strokeStyle = ink; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    const tx = g.tx, ty = g.ty, R = 32;
    // wires (book schematic)
    const cTop = [tx + 12, ty - 22], eBot = [tx + 12, ty + 22];
    const wC = [[tx + 12, ty - 40], [tx + 12, g.rc.y2]], wRC = [[tx + 12, g.rc.y1], [tx + 12, g.top], [g.vcc.x, g.top], [g.vcc.x, g.vcc.y - 8]];
    const wE = [[tx + 12, ty + 40], [tx + 12, g.gnd], [g.vcc.x, g.gnd], [g.vcc.x, g.vcc.y + 8]], wE2 = [[tx + 12, g.gnd], [g.src.x, g.gnd], [g.src.x, g.src.y + 22]];
    const wB = [[tx - R + 4, ty], [g.rb.x2, ty]], wRB = [[g.rb.x1, ty], [g.src.x, ty], [g.src.x, g.src.y - 40]];
    [wC, wRC, wE, wE2, wB, wRB, [[g.src.x, g.src.y - 26], [g.src.x, g.src.y - 22]]].forEach(q => G.wire(ctx, q, ink, 2));
    const vo = [tx + 58, g.rc.y2 + 14]; G.wire(ctx, [[tx + 12, vo[1]], vo], '#7c3aed', 1.6); ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(tx + 12, vo[1], 3.5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(vo[0] + 4, vo[1], 4, 0, TAU); ctx.stroke(); G.text(ctx, 'Vout ← للراسم', vo[0] + 12, vo[1] - 12, { s: 10, w: 800, c: '#7c3aed', a: 'left' });
    // RC (variable) and RB
    ctx.strokeStyle = ink; ctx.lineWidth = 2; zig(ctx, tx + 12, g.rc.y1, tx + 12, g.rc.y2, 6, 8); zig(ctx, g.rb.x1, ty, g.rb.x2, ty, 6, 7);
    const fr = (p.RC - .5) / 4.5, wy = lerp(g.rc.y1 + 6, g.rc.y2 - 6, fr); G.arrow(ctx, tx + 36, wy, tx + 21, wy, '#b45309', 2.4, 8); ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(tx + 38, wy, 6, 0, TAU); ctx.fill();
    if (on('lbl')) { G.text(ctx, 'RC = ' + fmt(p.RC, 2) + ' kΩ', tx - 30, (g.rc.y1 + g.rc.y2) / 2, { s: 12, w: 800, mono: 1, c: '#b45309' }); G.text(ctx, 'RB', (g.rb.x1 + g.rb.x2) / 2, ty - 18, { s: 12, w: 800 }); }
    // VCC battery + knob
    ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.vcc.x - 16, g.vcc.y - 8); ctx.lineTo(g.vcc.x + 16, g.vcc.y - 8); ctx.stroke(); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(g.vcc.x - 8, g.vcc.y + 8); ctx.lineTo(g.vcc.x + 8, g.vcc.y + 8); ctx.stroke();
    G.text(ctx, '+', g.vcc.x + 22, g.vcc.y - 14, { s: 13, w: 900, c: '#dc2626' }); G.text(ctx, 'VCC', g.vcc.x - 34, g.vcc.y - 2, { s: 12, w: 900 });
    ATM.knob(ctx, g.vcc.x, g.vcc.y + 76, 14, (p.VCC - 5) / 15, '', p.VCC + ' V');
    // input: AC source in series, + VBB with IB knob
    ctx.strokeStyle = ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.src.x, g.src.y, 22, 0, TAU); ctx.stroke(); ATM.wig(ctx, g.src.x - 13, g.src.y, g.src.x + 13, g.src.y, 26, '#2563eb', 6, 0, 2);
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.src.x - 14, g.src.y - 40); ctx.lineTo(g.src.x + 14, g.src.y - 40); ctx.stroke(); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(g.src.x - 7, g.src.y - 28); ctx.lineTo(g.src.x + 7, g.src.y - 28); ctx.stroke();
    G.text(ctx, 'VBB', g.src.x - 32, g.src.y - 34, { s: 11, w: 900 }); G.text(ctx, 'إشارة', g.src.x - 42, g.src.y, { s: 11, w: 800, c: '#2563eb' });
    ATM.knob(ctx, g.kIB.x, g.kIB.y, 16, p.IB / 100, 'IB المستمر', fmt(p.IB, 3) + ' µA'); ATM.knob(ctx, g.kS.x, g.kS.y, 14, p.vin / 40, 'سعة الإشارة', '±' + fmt(p.vin, 3) + ' µA');
    // ground
    ctx.strokeStyle = ink; ctx.lineWidth = 2; const gx = (tx + 12 + g.vcc.x) / 2; [16, 10, 4].forEach((q, i) => { ctx.beginPath(); ctx.moveTo(gx - q, g.gnd + 8 + i * 5); ctx.lineTo(gx + q, g.gnd + 8 + i * 5); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(gx, g.gnd); ctx.lineTo(gx, g.gnd + 8); ctx.stroke();
    // transistor symbol (npn: arrow on emitter pointing out)
    setRaw(ctx, 1); ctx.fillStyle = 'rgba(250,204,21,.28)'; ctx.beginPath(); ctx.arc(tx, ty, R, 0, TAU); ctx.fill(); setRaw(ctx, 0); ctx.strokeStyle = ink; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(tx, ty, R, 0, TAU); ctx.stroke();
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(tx - 10, ty - 18); ctx.lineTo(tx - 10, ty + 18); ctx.stroke(); ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(tx - 10, ty - 8); ctx.lineTo(tx + 12, ty - 24); ctx.lineTo(tx + 12, ty - 40); ctx.moveTo(tx - 10, ty + 8); ctx.lineTo(tx + 12, ty + 24); ctx.lineTo(tx + 12, ty + 40); ctx.moveTo(tx - R, ty); ctx.lineTo(tx - 10, ty); ctx.stroke();
    G.arrow(ctx, tx - 2, ty + 14, tx + 10, ty + 23, ink, 2, 9);
    G.text(ctx, 'C', tx + 28, ty - 34, { s: 13, w: 900 }); G.text(ctx, 'B', tx - R - 8, ty - 12, { s: 13, w: 900 }); G.text(ctx, 'E', tx + 28, ty + 34, { s: 13, w: 900 }); G.text(ctx, 'β = ' + p.beta, tx - 2, ty + R + 16, { s: 12, w: 900, mono: 1, c: '#7c3aed' });
    // currents: electron dots (opposite to conventional) / conventional arrows
    const sp = I => 16 + 90 * Math.sqrt(Math.max(0, I) / 10e-3);
    const pathC = [[g.vcc.x, g.vcc.y - 8], [g.vcc.x, g.top], [tx + 12, g.top], [tx + 12, ty - 22]].reverse(); // electrons: collector → RC → VCC+
    const pathE = [[g.vcc.x, g.vcc.y + 8], [g.vcc.x, g.gnd], [tx + 12, g.gnd], [tx + 12, ty + 22]]; // electrons: VCC− → ground → emitter
    const pathB = [[tx - R + 4, ty], [g.src.x, ty], [g.src.x, g.src.y - 40]]; // electrons leave base towards VBB+
    const pathB2 = [[g.src.x, g.src.y + 22], [g.src.x, g.gnd], [tx + 12, g.gnd]];
    if (on('flow')) { const t = S.t; G.dotsAlong(ctx, pathC, t * sp(r.ic), '#2563eb', 15); G.dotsAlong(ctx, pathE, t * sp(r.ie), '#2563eb', 15); G.dotsAlong(ctx, pathB, t * sp(r.ib), '#2563eb', 15); G.dotsAlong(ctx, pathB2, t * sp(r.ib), '#2563eb', 15); }
    if (on('conv')) { const th = I => clamp(1.5 + Math.sqrt(I / 1e-3) * 1.6, 1.5, 7);
      G.arrow(ctx, tx + 12 + 18, g.top + 34, tx + 12 + 18, g.top + 72, '#ea580c', th(r.ic), 10); G.arrow(ctx, tx + 34, ty + 46, tx + 34, ty + 84, '#ea580c', th(r.ie), 10); G.arrow(ctx, g.rb.x2 + 6, ty + 14, tx - R - 6, ty + 14, '#ea580c', th(r.ib), 8); }
    if (on('lbl')) { G.text(ctx, 'IC = ' + fmt(r.ic * 1e3, 3) + ' mA', tx + 44, g.top + 30, { s: 12, w: 800, mono: 1, c: '#c2410c', a: 'left' }); G.text(ctx, 'IE = ' + fmt(r.ie * 1e3, 3) + ' mA', tx + 40, ty + 66, { s: 12, w: 800, mono: 1, c: '#c2410c', a: 'left' }); G.text(ctx, 'IB = ' + fmt(r.ib * 1e6, 3) + ' µA', (g.rb.x1 + g.rb.x2) / 2, ty - 36, { s: 12, w: 800, mono: 1, c: '#c2410c' }); G.text(ctx, 'VCE = ' + fmt(r.vce, 3) + ' V', tx + 40, ty + 10, { s: 12, w: 800, mono: 1, c: '#7c3aed', a: 'left' }); }
    if (r.sat || r.cut) G.text(ctx, r.sat ? 'إشباع — الإشارة الخارجة مشوهة' : 'قطع — الإشارة الخارجة مشوهة', (g.x0 + g.x1) / 2, g.y0 - 30, { s: 13, w: 900, c: '#fff', bg: '#dc2626', raw: 1 });
    // physical n-p-n view
    if (on('phys') && g.ph.h > 50) { const P = g.ph; const xe = P.x + P.w * .4, xb = P.x + P.w * .52;
      setRaw(ctx, 1); ctx.fillStyle = 'rgba(96,165,250,.35)'; ctx.fillRect(P.x, P.y, xe - P.x, P.h); ctx.fillStyle = 'rgba(244,114,182,.35)'; ctx.fillRect(xe, P.y, xb - xe, P.h); ctx.fillStyle = 'rgba(96,165,250,.28)'; ctx.fillRect(xb, P.y, P.x + P.w - xb, P.h);
      ctx.fillStyle = 'rgba(148,163,184,.25)'; ctx.fillRect(xe - 3, P.y, 6, P.h); ctx.fillRect(xb, P.y, 14 + p.VCC * .6, P.h); setRaw(ctx, 0);
      ctx.strokeStyle = ink; ctx.lineWidth = 1.5; ctx.strokeRect(P.x, P.y, P.w, P.h);
      G.text(ctx, 'n', (P.x + xe) / 2, P.y + 14, { s: 14, w: 900, c: '#1d4ed8' }); G.text(ctx, 'p', (xe + xb) / 2, P.y + 14, { s: 14, w: 900, c: '#be185d' }); G.text(ctx, 'n', (xb + P.x + P.w) / 2, P.y + 14, { s: 14, w: 900, c: '#1d4ed8' });
      G.text(ctx, 'الباعث E', (P.x + xe) / 2, P.y + P.h + 14, { s: 11, w: 800 }); G.text(ctx, 'القاعدة B', (xe + xb) / 2, P.y + P.h + 30, { s: 11, w: 800 }); G.text(ctx, 'الجامع C', (xb + P.x + P.w) / 2, P.y + P.h + 14, { s: 11, w: 800 });
      G.wire(ctx, [[(xe + xb) / 2, P.y + P.h], [(xe + xb) / 2, P.y + P.h + 18]], ink, 2);
      if (on('lbl')) { G.text(ctx, 'انحياز أمامي', xe, P.y - 12, { s: 10, w: 800, c: '#15803d' }); G.text(ctx, 'انحياز عكسي', xb + 20, P.y - 12, { s: 10, w: 800, c: '#b91c1c' }); }
      S.el.forEach(e => { const x = P.x + e.x * P.w, y = P.y + e.y * P.h; ctx.fillStyle = e.b && e.x > .44 ? '#db2777' : '#2563eb'; ctx.beginPath(); ctx.arc(x, y, 3.2, 0, TAU); ctx.fill(); });
      G.arrow(ctx, P.x + 8, P.y + P.h / 2, P.x + P.w - 8, P.y + P.h / 2, 'rgba(37,99,235,.35)', 1.5, 8);
      G.text(ctx, `إلكترونات وصلت الجامع ${S.nC}  ،  خرجت من القاعدة ${S.nB}` + (S.nB ? `  (النسبة ≈ ${fmt(S.nC / S.nB, 3)})` : ''), P.x + P.w / 2, P.y + P.h + 48, { s: 11, w: 800, c: '#94a3b8' });
    }
    // oscilloscope traces
    const col = g.col; let cy = 44;
    const scope = (y, hh, title, data, lo, hi, colr, ref) => { setRaw(ctx, 1); ctx.fillStyle = '#0b1220'; rr(ctx, col.x, y, col.w, hh, 8); ctx.fill(); ctx.strokeStyle = 'rgba(74,222,128,.14)'; ctx.lineWidth = 1; for (let i = 1; i < 8; i++) { ctx.beginPath(); ctx.moveTo(col.x + col.w * i / 8, y + 4); ctx.lineTo(col.x + col.w * i / 8, y + hh - 4); ctx.stroke(); } for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(col.x + 4, y + hh * i / 4); ctx.lineTo(col.x + col.w - 4, y + hh * i / 4); ctx.stroke(); }
      const tN = S.t, win = 1.5; ctx.strokeStyle = colr; ctx.lineWidth = 2.2; ctx.beginPath(); let st = 0; data.forEach(([t, v]) => { if (t < tN - win) return; const x = col.x + 6 + (t - tN + win) / win * (col.w - 12), yy = y + hh - 8 - (v - lo) / (hi - lo) * (hh - 16); st++ ? ctx.lineTo(x, clamp(yy, y + 3, y + hh - 3)) : ctx.moveTo(x, clamp(yy, y + 3, y + hh - 3)); }); ctx.stroke();
      if (ref != null) { const yy = y + hh - 8 - (ref - lo) / (hi - lo) * (hh - 16); ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(col.x + 4, yy); ctx.lineTo(col.x + col.w - 4, yy); ctx.stroke(); ctx.setLineDash([]); }
      setRaw(ctx, 0); G.text(ctx, title, col.x + col.w - 8, y + 12, { s: 11, w: 800, c: '#e2e8f0', a: 'right', raw: 1 }); };
    if (on('scope')) { const hh = Math.min(128, (g.H - 300) / 3.4);
      scope(cy, hh, 'الداخلة: تيار القاعدة IB (µA)', S.hi || [], 0, 140, '#60a5fa', p.IB); G.text(ctx, '0–140 µA', col.x + 34, cy + hh - 10, { s: 9, mono: 1, c: '#94a3b8', raw: 1 });
      cy += hh + 8; scope(cy, hh, 'الخارجة: VCE (V) — مضخمة ومعكوسة', S.ho || [], 0, p.VCC, '#f87171', calc.call(E, { p: Object.assign({}, p, { vin: 0 }) }, 0).vce); G.text(ctx, '0–' + p.VCC + ' V', col.x + 30, cy + hh - 10, { s: 9, mono: 1, c: '#94a3b8', raw: 1 });
      cy += hh + 14; if (on('lbl')) { const dVo = p.beta * p.vin * 1e-6 * p.RC * 1e3; G.text(ctx, 'سعة الخارجة ≈ ' + fmt(dVo, 3) + ' V ، فرق الطور 180°', col.x + col.w / 2, cy, { s: 11, w: 800, c: '#7c3aed' }); cy += 18; } }
    // load line
    if (on('load')) { const x0 = col.x + 34, y0 = cy + 14, pw = col.w - 44, ph = Math.min(170, g.H - y0 - 110); if (ph > 60) {
      const Vm = 20, Im = Math.max(p.VCC / (p.RC * 1e3) * 1e3 * 1.25, 3); const X = v => x0 + v / Vm * pw, Y = i => y0 + ph - i / Im * ph;
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y0 + ph); ctx.lineTo(x0 + pw, y0 + ph); ctx.stroke();
      [20, 40, 60, 80, 100].forEach(ib => { const ic = p.beta * ib * 1e-3; if (ic > Im) return; ctx.strokeStyle = 'rgba(100,116,139,.55)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(.4), Y(ic)); ctx.lineTo(X(Vm), Y(ic * 1.04)); ctx.stroke(); G.text(ctx, ib + 'µA', X(Vm) - 14, Y(ic * 1.04) - 7, { s: 9, mono: 1, c: '#64748b' }); });
      ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(p.VCC), Y(0)); ctx.lineTo(X(0), Y(p.VCC / (p.RC * 1e3) * 1e3)); ctx.stroke();
      const lo = calc.call(E, { p: Object.assign({}, p, { vin: 0, IB: Math.max(0, p.IB - p.vin) }) }, 0), hi2 = calc.call(E, { p: Object.assign({}, p, { vin: 0, IB: p.IB + p.vin }) }, 0);
      ctx.strokeStyle = 'rgba(234,88,12,.6)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(X(lo.vce), Y(lo.ic * 1e3)); ctx.lineTo(X(hi2.vce), Y(hi2.ic * 1e3)); ctx.stroke();
      ctx.fillStyle = '#ea580c'; ctx.beginPath(); ctx.arc(X(r.vce), Y(r.ic * 1e3), 5.5, 0, TAU); ctx.fill();
      G.text(ctx, 'VCE (V)', x0 + pw - 20, y0 + ph + 14, { s: 10, mono: 1, c: '#64748b' }); G.text(ctx, 'IC (mA)', x0 - 4, y0 - 8, { s: 10, mono: 1, c: '#64748b' }); G.text(ctx, fmt(Im, 2), x0 - 16, y0 + 4, { s: 9, mono: 1, c: '#64748b' });
      G.text(ctx, 'خط الحمل', X(p.VCC * .12) + 40, Y(p.VCC * .88 / (p.RC * 1e3) * 1e3) + 2, { s: 11, w: 800, c: '#dc2626' }); } }
  };
  E.explain = S => { const r = S.r; if (!r) return ''; return r.sat ? `${B_('إشباع')}: تيار الجامع بلغ أقصاه VCC/RC فتشوهت الإشارة؛ قلل IB أو RC أو سعة الإشارة.` : r.cut ? `${B_('قطع')}: تيار القاعدة صفر في جزء من الدورة فتشوهت الإشارة؛ زد IB.` : `كل ${B_(S.p.beta + ' إلكترون')} تقريباً يعبر من الباعث إلى الجامع يقابله إلكترون واحد يخرج من القاعدة، لذا تغير صغير في IB يسبب تغيراً ${B_('أكبر بـ ' + S.p.beta + ' مرة')} في IC، والإشارة الخارجة معكوسة الطور.`; };
  E.howto = '<b>جرّب:</b> أدر مقبض <b>IB</b> ومقبض سعة الإشارة، واسحب منزلق المقاومة <b>RC</b>، وأدر مقبض <b>VCC</b>. اسحب الترانزستور لأعلى/أسفل لتغيير β. راقب داخل الترانزستور: الإلكترونات تعبر من الباعث إلى الجامع وقليل منها يخرج من القاعدة.';
})();

/* ======================= bohr: hydrogen atom, orbits ↔ energy levels ↔ spectrum ======================= */
(() => {
  const E = EXPS.find(e => e.id === 'bohr'); if (!E) return;
  const NM = 6, En = n => -13.6 / (n * n), lamOf = (a, b) => 1240 / Math.abs(En(a) - En(b));
  E.controls = E.controls.concat([
    SEL('lamp', 'مصباح الفوتونات', [['mono', 'أحادي اللون'], ['white', 'ضوء أبيض']], 'mono'),
    R('lam', 'الطول الموجي لفوتون المصباح', 90, 1900, 656, 1, 'nm'),
    TG('auto', 'إطلاق مستمر من المصباح', false, null, 'light'),
    TG('spont', 'الانبعاث التلقائي (عودة الإلكترون)', true, null, 'photon'),
    TG('lvl', 'مخطط مستويات الطاقة', true, null, 'energy'),
    TG('sL', 'متسلسلة لايمان (nf = 1)', false, null, 'energy'),
    TG('sB', 'متسلسلة بالمر (nf = 2)', true, null, 'energy'),
    TG('sP', 'متسلسلة باشن (nf = 3)', false, null, 'energy'),
    TG('sR', 'متسلسلتا براكت وفوند (nf = 4 ، 5)', false, null, 'energy'),
    TG('spec', 'شريط الطيف المسجّل', true, null, 'wave'),
    TG('real', 'أنصاف الأقطار بمقياس rn ∝ n²', false, null, 'eye'),
    TG('lbl', 'التسميات والقيم', true, null, 'labels')
  ]);
  const geo = S => {
    const W = S.W || 800, H = S.H || 700; const L = 74, right = Math.max(360, W * .56);
    const Rm = Math.max(90, Math.min((right - L - 90) / 2, (H - 300) / 2)); const ax = L + 80 + Rm, ay = 64 + Rm + 20;
    const lx = L + 22, ly = ay; const dg = { x: right + 26, y: 64, w: W - right - 44, h: Math.max(200, H - 330) };
    const sp = { x: L + 10, y: H - 196, w: W - L - 26, h: 34 };
    return { W, H, ax, ay, Rm, lx, ly, dg, sp };
  };
  const rOf = (S, g, n) => ATM.on(S, 'real') ? Math.max(4, g.Rm * n * n / (NM * NM)) : g.Rm * (.14 + .86 * (n - 1) / (NM - 1));
  const Ey = (g, e) => g.dg.y + 18 + Math.sqrt(-e / 13.6) * (g.dg.h - 30); // sqrt scale (not to scale)
  const spX = (g, nm) => { const s = g.sp; if (nm < 380) return s.x + s.w * .14 * clamp((nm - 90) / 290, 0, 1); if (nm <= 750) return s.x + s.w * (.14 + .52 * (nm - 380) / 370); return s.x + s.w * (.66 + .34 * clamp(Math.log(nm / 750) / Math.log(7500 / 750), 0, 1)); };
  const spInv = (g, x) => { const s = g.sp, f = (x - s.x) / s.w; if (f < .14) return 90 + f / .14 * 290; if (f <= .66) return 380 + (f - .14) / .52 * 370; return 750 * Math.pow(10, (f - .66) / .34); };
  function go(S, to, why) { if (S.tr || S.ion || to === S.n) return; if (to < S.n) { const nm = lamOf(S.n, to); S.tr = { from: S.n, to, k: 0, nm }; S.lines.push({ ni: S.n, nf: to, nm }); const g = geo(S); const a = Math.random() * TAU; const r = rOf(S, g, S.n); const ex = g.ax + Math.cos(S.ang) * r, ey = g.ay + Math.sin(S.ang) * r; S.ph.push({ x: ex, y: ey, vx: Math.cos(a) * 230, vy: Math.sin(a) * 230, nm, out: 1 }); S.nEm = (S.nEm || 0) + 1; S.wait = 1 + Math.random() * 1.5; }
    else fire(S, lamOf(S.n, to), true); }
  function fire(S, nm, exact) { const g = geo(S); S.ph.push({ x: g.lx + 26, y: g.ly + (exact ? 0 : (Math.random() - .5) * 16), vx: 260, vy: 0, nm, inc: 1 }); S.nFire = (S.nFire || 0) + 1; }
  E.controls[2].btns[0].on = S => { const ni = +S.p.ni, nf = +S.p.nf; if (ni <= nf) { Runner.toast('اختر ni أكبر من nf'); return; } S.tr = null; S.ion = 0; S.n = ni; go(S, nf); };
  E.controls[2].btns[1].on = S => { const ni = +S.p.ni, nf = +S.p.nf; if (ni <= nf) { Runner.toast('اختر ni أكبر من nf'); return; } S.tr = null; S.ion = 0; S.n = nf; fire(S, lamOf(ni, nf), true); };
  E.setup = function (S) { S.n = 1; S.ang = 0; S.ph = []; S.lines = []; S.absd = []; S.tr = null; S.wait = 2; S.ion = 0; S.autoT = 0; S.nEm = 0; S.nAbs = 0; };
  E.update = function (S, dt) {
    const g = geo(S), p = S.p; if (!S.drag) S.ang += dt * 4 / Math.pow(S.n, 1.5);
    if (S.tr) { S.tr.k += dt * 2.2; if (S.tr.k >= 1) { S.n = S.tr.to; S.tr = null; } }
    if (S.ion) { S.ion += dt; if (S.ion > 2.4) { S.ion = 0; S.n = NM; S.wait = .6; } }
    // spontaneous emission
    if (p.spont && !S.tr && !S.ion && !S.drag && S.n > 1) { S.wait -= dt; if (S.wait <= 0) { const to = 1 + Math.floor(Math.random() * (S.n - 1)); go(S, to); } }
    // lamp auto fire
    if (p.auto) { S.autoT += dt; if (S.autoT > .45) { S.autoT = 0; fireLamp(S); } }
    // photons
    const r = rOf(S, g, S.n);
    S.ph.forEach(q => { const d0 = Math.hypot(q.x - g.ax, q.y - g.ay); q.x += q.vx * dt; q.y += q.vy * dt; if (q.inc && !q.done && !S.tr && !S.ion && !S.drag) { const d1 = Math.hypot(q.x - g.ax, q.y - g.ay); if (d0 >= r && d1 < r || d1 < 6) { q.done = 1; const Eph = 1240 / q.nm; let hit = 0;
      for (let m = S.n + 1; m <= NM; m++) { const dE = En(m) - En(S.n); if (Math.abs(Eph - dE) / dE < .004) { hit = m; break; } }
      if (hit) { q.dead = 1; S.tr = { from: S.n, to: hit, k: 0, abs: true, nm: q.nm }; S.absd.push({ ni: hit, nf: S.n, nm: q.nm }); S.nAbs++; S.wait = 1.2 + Math.random() * 1.5; S.flash = { x: q.x, y: q.y, t: 0, txt: 'امتُص ✓' }; }
      else if (Eph >= -En(S.n)) { q.dead = 1; S.ion = .001; S.flash = { x: q.x, y: q.y, t: 0, txt: 'تأيّن!' }; }
      else S.flash = { x: q.x, y: q.y, t: 0, txt: 'لم يُمتص — طاقته لا تساوي فرق مستويين', miss: 1 }; } } });
    S.ph.forEach(q => { if (q.inc && q.x > g.ax + g.Rm + 40) q.dead = 1; }); S.ph = S.ph.filter(q => !q.dead && q.x > -40 && q.x < g.W + 40 && q.y > -40 && q.y < g.H + 40);
    if (S.flash) { S.flash.t += dt; if (S.flash.t > 1.3) S.flash = null; }
    if (S.lines.length > 400) S.lines.splice(0, 100);
  };
  function fireLamp(S) { const p = S.p; if (p.lamp === 'white') { if (Math.random() < .5) { const n = S.n; const m = n + 1 + Math.floor(Math.random() * (NM - n)); fire(S, m <= NM ? lamOf(n, m) : 400 + Math.random() * 350); } else fire(S, 90 + Math.random() * 1800); } else fire(S, p.lam); }
  E.pointer = null;
  E.drags = S => {
    const g = geo(S); const L = [];
    L.push({ id: 'lamp', x: g.lx, y: g.ly, w: 44, h: 56, hint: true, tip: 'انقر لإطلاق فوتون — العجلة تغيّر طوله الموجي', idle: 'انقر المصباح لإطلاق فوتون', click: S => fireLamp(S), wheel: (S, s) => setParam(S, 'lam', S.p.lam + s * 5) });
    if (ATM.on(S, 'spec')) { const x = spX(g, S.p.lam); L.push({ id: 'lamMk', x, y: g.sp.y - 10, r: 12, axis: 'x', tip: 'اسحب لاختيار الطول الموجي لفوتون المصباح', drag: (S, d) => { setParam(S, 'lam', spInv(g, clamp(d.ox + d.x - d.sx, g.sp.x, g.sp.x + g.sp.w))); if (S.p.lamp !== 'mono') setParam(S, 'lamp', 'mono'); } }); }
    L.push({ id: 'orbits', x: g.ax, y: g.ay, r: g.Rm + 10, hint: false, tip: 'انقر أحد المدارات لنقل الإلكترون إليه', hit: (x, y) => { const d = Math.hypot(x - g.ax, y - g.ay); for (let n = 1; n <= NM; n++) if (Math.abs(d - rOf(S, g, n)) < 9) return true; return false; },
      click: (S, x, y) => { const d = Math.hypot(x - g.ax, y - g.ay); let best = 1; for (let n = 1; n <= NM; n++) if (Math.abs(d - rOf(S, g, n)) < Math.abs(d - rOf(S, g, best))) best = n; go(S, best); } });
    if (ATM.on(S, 'lvl')) L.push({ id: 'levels', x: g.dg.x + g.dg.w / 2, y: g.dg.y + g.dg.h / 2, w: g.dg.w, h: g.dg.h, hint: false, tip: 'انقر مستوى طاقة لنقل الإلكترون إليه', click: (S, x, y) => { let best = 1, bd = 1e9; for (let n = 1; n <= NM; n++) { const dd = Math.abs(y - Ey(g, En(n))); if (dd < bd) { bd = dd; best = n; } } go(S, best); } });
    const r = S.drag ? S.dragR : rOf(S, g, S.n); const ex = g.ax + Math.cos(S.ang) * r, ey = g.ay + Math.sin(S.ang) * r;
    if (!S.ion) L.push({ id: 'elec', x: ex, y: ey, r: 14, dir: S.ang, tip: 'اسحب الإلكترون إلى مدار آخر', idle: 'اسحب الإلكترون إلى مدار آخر ✋',
      down: S => { if (S.tr) return; S.drag = 1; S.dragR = rOf(S, g, S.n); }, drag: (S, d) => { if (!S.drag) return; S.dragR = clamp(Math.hypot(d.x - g.ax, d.y - g.ay), rOf(S, g, 1) * .7, g.Rm + 14); },
      up: S => { if (!S.drag) return; S.drag = 0; let best = 1; for (let n = 1; n <= NM; n++) if (Math.abs(S.dragR - rOf(S, g, n)) < Math.abs(S.dragR - rOf(S, g, best))) best = n; go(S, best); } });
    return L;
  };
  E.draw = function (ctx, w, h, S) {
    G.bg(ctx, w, h); const g = geo(S), p = S.p; const on = k => ATM.on(S, k);
    // orbits
    for (let n = 1; n <= NM; n++) { const r = rOf(S, g, n); const cur = n === S.n; ctx.strokeStyle = cur ? 'rgba(125,211,252,.9)' : 'rgba(148,163,184,.35)'; ctx.lineWidth = cur ? 2 : 1.2; ctx.setLineDash(cur ? [] : [4, 5]); ctx.beginPath(); ctx.arc(g.ax, g.ay, r, 0, TAU); ctx.stroke(); ctx.setLineDash([]); if (on('lbl') && (r > 16 || n === NM)) G.text(ctx, 'n=' + n, g.ax + r * .72 + 4, g.ay - r * .72 - 4, { s: 10, w: 800, c: cur ? '#7dd3fc' : '#94a3b8' }); }
    G.glow(ctx, g.ax, g.ay, 18, 'rgba(248,113,113,A)', .9); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(g.ax, g.ay, 6.5, 0, TAU); ctx.fill(); G.text(ctx, '+', g.ax, g.ay, { s: 11, w: 900, c: '#fff' });
    // electron
    let r = rOf(S, g, S.n); if (S.tr) { const k = S.tr.k, t = k * k * (3 - 2 * k); r = lerp(rOf(S, g, S.tr.from), rOf(S, g, S.tr.to), t); } if (S.drag) r = S.dragR;
    if (S.ion) r = rOf(S, g, S.n) + S.ion * 160;
    const ex = g.ax + Math.cos(S.ang) * r, ey = g.ay + Math.sin(S.ang) * r;
    if (S.ion < 2) { G.glow(ctx, ex, ey, 14, 'rgba(56,189,248,A)', .8); ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(ex, ey, 6, 0, TAU); ctx.fill(); G.text(ctx, '−', ex, ey - .5, { s: 11, w: 900, c: '#0c4a6e' }); }
    if (S.drag) { let best = 1; for (let n = 1; n <= NM; n++) if (Math.abs(S.dragR - rOf(S, g, n)) < Math.abs(S.dragR - rOf(S, g, best))) best = n; if (best !== S.n) { ctx.strokeStyle = '#fbbf24'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(g.ax, g.ay, rOf(S, g, best), 0, TAU); ctx.stroke(); ctx.setLineDash([]); const dE = En(best) - En(S.n); G.text(ctx, (dE < 0 ? 'يبعث فوتوناً ' : 'يحتاج فوتوناً ') + fmt(Math.abs(dE), 3) + ' eV (λ = ' + fmt(lamOf(best, S.n), 4) + ' nm)', g.ax, g.ay + g.Rm + 30, { s: 12, w: 800, c: '#fde68a' }); } }
    // lamp
    const lc = p.lamp === 'white' ? '#fef9c3' : ATM.nmCol(p.lam);
    G.glow(ctx, g.lx + 18, g.ly, 26, p.lamp === 'white' ? 'rgba(254,249,195,A)' : hexA('#ffffff'), .25); ctx.fillStyle = '#334155'; rr(ctx, g.lx - 18, g.ly - 24, 36, 48, 7); ctx.fill(); ctx.fillStyle = lc; rr(ctx, g.lx + 12, g.ly - 12, 10, 24, 4); ctx.fill();
    if (on('lbl')) { G.text(ctx, 'مصباح', g.lx, g.ly + 38, { s: 11, w: 800, c: '#94a3b8' }); G.text(ctx, p.lamp === 'white' ? 'أبيض' : Math.round(p.lam) + ' nm', g.lx, g.ly + 54, { s: 11, w: 800, mono: 1, c: '#fde68a' }); }
    // photons
    S.ph.forEach(q => { const a = Math.atan2(q.vy, q.vx); const col = ATM.nmCol(q.nm); const wl = clamp(q.nm / 40, 4, 22); ATM.photon(ctx, q.x, q.y, a, col, 42, wl, S.t * 14, 5); if (on('lbl') && q.out) G.text(ctx, Math.round(q.nm) + ' nm', q.x, q.y - 16, { s: 10, w: 800, mono: 1, c: col }); });
    if (S.flash) { const f = S.flash; ctx.globalAlpha = 1 - f.t / 1.3; G.text(ctx, f.txt, clamp(f.x, 150, g.W * .5), f.y - 26, { s: 12, w: 800, c: f.miss ? '#fca5a5' : '#86efac', bg: 'rgba(15,23,42,.8)' }); ctx.globalAlpha = 1; }
    if (on('lbl')) G.text(ctx, 'rn = n² × 0.053 nm' + (on('real') ? '' : '  (الرسم ليس بمقياس)'), g.ax, 20, { s: 11, w: 800, c: '#94a3b8' });
    // energy level diagram
    if (on('lvl')) { const D = g.dg; ATM.box(ctx, D.x - 8, D.y - 22, D.w + 16, D.h + 34, 'مستويات الطاقة'); const x0 = D.x + 44, x1 = D.x + D.w - 6;
      ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(148,163,184,.6)'; ctx.beginPath(); ctx.moveTo(x0, Ey(g, 0)); ctx.lineTo(x1, Ey(g, 0)); ctx.stroke(); ctx.setLineDash([]); G.text(ctx, '0 (تأين)', x0 - 4, Ey(g, 0), { s: 9, w: 800, c: '#94a3b8', a: 'right' });
      for (let n = 1; n <= NM; n++) { const y = Ey(g, En(n)); const cur = n === S.n; ctx.strokeStyle = cur ? '#7dd3fc' : '#94a3b8'; ctx.lineWidth = cur ? 3 : 1.5; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); G.text(ctx, 'n=' + n, n >= 5 ? x0 - 30 * (n - 5) - 6 : x0 - 6, n >= 5 ? y - 3 : y - 7, { s: 10, w: 800, c: cur ? '#7dd3fc' : '#cbd5e1', a: 'right' }); if (on('lbl') && n < 5) G.text(ctx, En(n).toFixed(2), x0 - 6, y + 6, { s: 9, mono: 1, c: '#94a3b8', a: 'right' }); }
      G.text(ctx, 'eV', x0 - 22, D.y - 8, { s: 9, mono: 1, c: '#94a3b8' });
      // series arrows
      const ser = [['sL', 1, 'لايمان'], ['sB', 2, 'بالمر'], ['sP', 3, 'باشن'], ['sR', 4, 'براكت'], ['sR', 5, 'فوند']].filter(q => on(q[0]));
      const gw = (x1 - x0 - 10) / Math.max(1, ser.length);
      ser.forEach(([, nf, nm], gi) => { const gx = x0 + 8 + gi * gw; const cnt = NM - nf; for (let ni = nf + 1; ni <= NM; ni++) { const x = gx + (ni - nf - .5) / cnt * (gw - 12); const l = lamOf(ni, nf); G.arrow(ctx, x, Ey(g, En(ni)), x, Ey(g, En(nf)), ATM.nmCol(l), 1.6, 6); } G.text(ctx, nm, gx + gw / 2 - 6, Ey(g, En(nf)) + 12, { s: 10, w: 800, c: '#cbd5e1' }); });
      // electron marker and current transition
      const yl = S.tr ? lerp(Ey(g, En(S.tr.from)), Ey(g, En(S.tr.to)), S.tr.k) : Ey(g, En(S.n)); ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(x1 - 14, yl, 6, 0, TAU); ctx.fill();
      if (S.tr) { const c = ATM.nmCol(S.tr.nm); G.arrow(ctx, x1 - 30, Ey(g, En(S.tr.from)), x1 - 30, Ey(g, En(S.tr.to)), c, 3, 9); G.text(ctx, (S.tr.abs ? 'امتصاص ' : 'انبعاث ') + fmt(Math.abs(En(S.tr.to) - En(S.tr.from)), 3) + ' eV', x1 - 36, (Ey(g, En(S.tr.from)) + Ey(g, En(S.tr.to))) / 2, { s: 11, w: 800, c, a: 'right', bg: 'rgba(15,23,42,.75)' }); }
      if (on('lbl')) G.text(ctx, 'En = −13.6 / n²  eV', D.x + D.w / 2, D.y + D.h + 22, { s: 11, w: 800, mono: 1, c: '#fde68a' });
    }
    // recorded spectrum
    if (on('spec')) { const s = g.sp; setRaw(ctx, 1); ctx.fillStyle = '#000'; ctx.fillRect(s.x, s.y, s.w, s.h); for (let x = spX(g, 380); x < spX(g, 750); x += 2) { ctx.fillStyle = wlColor(spInv(g, x), .16); ctx.fillRect(x, s.y, 2, s.h); } ctx.fillStyle = 'rgba(168,85,247,.08)'; ctx.fillRect(s.x, s.y, spX(g, 380) - s.x, s.h); ctx.fillStyle = 'rgba(220,38,38,.08)'; ctx.fillRect(spX(g, 750), s.y, s.x + s.w - spX(g, 750), s.h);
      const cnt = {}; S.lines.forEach(l => { const k = Math.round(l.nm); cnt[k] = (cnt[k] || 0) + 1; }); Object.keys(cnt).forEach(k => { const x = spX(g, +k), a = clamp(.35 + cnt[k] * .15, 0, 1); ctx.fillStyle = ATM.nmCol(+k).replace(/[\d.]+\)$/, a + ')'); ctx.fillRect(x - 1.5, s.y, 3, s.h); });
      setRaw(ctx, 0); ctx.strokeStyle = 'rgba(148,163,184,.6)'; ctx.lineWidth = 1; ctx.strokeRect(s.x, s.y, s.w, s.h);
      [100, 200, 300, 400, 500, 600, 700, 1000, 2000, 4000, 7000].forEach(nm => G.text(ctx, nm + '', spX(g, nm), s.y + s.h + 11, { s: 9, mono: 1, c: '#94a3b8' }));
      G.text(ctx, 'فوق البنفسجي', (s.x + spX(g, 380)) / 2, s.y + s.h + 26, { s: 10, w: 800, c: '#c084fc' }); G.text(ctx, 'مرئي', (spX(g, 380) + spX(g, 750)) / 2, s.y + s.h + 26, { s: 10, w: 800, c: '#86efac' }); G.text(ctx, 'تحت الأحمر', (spX(g, 750) + s.x + s.w) / 2, s.y + s.h + 26, { s: 10, w: 800, c: '#f87171' }); G.text(ctx, 'λ (nm)', s.x + s.w - 20, s.y + s.h + 26, { s: 10, mono: 1, c: '#94a3b8' });
      G.text(ctx, 'طيف الانبعاث المسجّل (' + S.lines.length + ' فوتون)', s.x + s.w, s.y - 12, { s: 11, w: 800, c: '#94a3b8', a: 'right' });
      const mx = spX(g, p.lam); ctx.fillStyle = p.lamp === 'white' ? '#64748b' : '#fde68a'; ctx.beginPath(); ctx.moveTo(mx, s.y - 1); ctx.lineTo(mx - 8, s.y - 16); ctx.lineTo(mx + 8, s.y - 16); ctx.closePath(); ctx.fill(); G.text(ctx, 'المصباح', mx, s.y - 25, { s: 9, w: 800, c: '#fde68a' });
    }
    if (on('lbl')) ATM.legend(ctx, g.ax + g.Rm + 40, g.ay + g.Rm + 48, [['#38bdf8', 'إلكترون', 'dot'], ['#ef4444', 'بروتون (النواة)', 'dot'], ['#fbbf24', 'فوتون', 'wave']]);
  };
  const r0 = E.readings;
  E.readings = function (S) { const n = S.n; return [rd('المستوى الحالي n', n + ''), rd('طاقة المستوى En = −13.6/n²', fmt(En(n), 4, 'eV')), rd('نصف قطر المدار rn = n²×0.053nm', fmt(.053 * n * n, 3, 'nm')), rd('طاقة فوتون المصباح hc/λ', fmt(1240 / S.p.lam, 4, 'eV')), rd('فوتونات منبعثة / ممتصة', (S.nEm || 0) + ' / ' + (S.nAbs || 0))].concat(r0.call(this, S).filter(x => !/نصف قطر/.test(x.label || x[0] || ''))); };
  E.explain = S => { if (S.ion) return `طاقة الفوتون أكبر من طاقة التأين (${fmt(-En(S.n), 3)} eV) فتحرر الإلكترون من الذرة (${B_('تأين')}).`; if (S.tr) { const dE = Math.abs(En(S.tr.to) - En(S.tr.from)); return S.tr.abs ? `امتصت الذرة فوتوناً طاقته ${B_(fmt(dE, 3) + ' eV')} تساوي تماماً فرق الطاقة بين n=${S.tr.from} و n=${S.tr.to}.` : `انتقال من n=${S.tr.from} إلى n=${S.tr.to}: يُبعث فوتون طاقته hf = Ei − Ef = ${B_(fmt(dE, 3) + ' eV')} وطوله الموجي ${fmt(S.tr.nm, 4)} nm.`; } return `الإلكترون في المستوى n = ${S.n} وطاقته ${fmt(En(S.n), 3)} eV. الذرة ${B_('لا تمتص')} إلا فوتوناً طاقته تساوي فرق الطاقة بين مستويين.`; };
  E.howto = '<b>جرّب:</b> انقر أي مدار أو أي مستوى طاقة لنقل الإلكترون، أو اسحب الإلكترون نفسه إلى مدار آخر. انقر المصباح لإطلاق فوتون، واسحب المثلث فوق شريط الطيف لاختيار طوله الموجي: جرّب 656 nm و 486 nm عندما يكون الإلكترون في n = 2، و 122 nm عندما يكون في n = 1.';
})();

/* ======================= spectra: sources, cold gas, prism/grating spectroscope ======================= */
(() => {
  const E = EXPS.find(e => e.id === 'spectra'); if (!E) return;
  const GC = { H: '#ff5ab4', He: '#ffd8a8', Na: '#ffc83d', Hg: '#b4c8ff', Ne: '#ff6a2a' }, GN = { H: 'H', He: 'He', Na: 'Na', Hg: 'Hg', Ne: 'Ne' };
  const HTR = { 656: '3→2', 486: '4→2', 434: '5→2', 410: '6→2' };
  E.controls = E.controls.concat([
    SEL('disp', 'المحلل الطيفي', [['prism', 'منشور'], ['grat', 'محزز حيود']], 'prism'),
    TG('rays', 'مسار الأشعة داخل المطياف', true, null, 'ray'),
    TG('ref', 'طيف انبعاث الغاز للمقارنة', true, null, 'eye'),
    TG('graph', 'منحني الشدة I(λ)', false, null, 'graph'),
    TG('eyep', 'منظر العينية (تكبير عند التقاطع)', true, null, 'eye'),
    TG('lbl', 'التسميات والأطوال الموجية', true, null, 'labels')
  ]);
  const cType = E.controls.find(c => c.k === 'type');
  cType.on = (v, S) => { if (v !== 'emit') S.cellIn = v === 'abs'; };
  const inten = (S, nm) => { const p = S.p, L = LINES[p.gas]; if (p.type === 'cont') return 1; if (p.type === 'emit') { let a = 0; L.forEach((l, i) => { a += (1 - i * .08) * Math.exp(-(((nm - l) / 1.1) ** 2)); }); return Math.min(1, a); } let a = 1; L.forEach(l => { a *= 1 - .92 * Math.exp(-(((nm - l) / 1.3) ** 2)); }); return a; };
  const geo = S => {
    const W = S.W || 800, H = S.H || 700; const cy = Math.max(170, H * .27); const hx = 108, slit = hx + 150, px = Math.max(slit + 110, W * .47), Rs = Math.min(W - px - 60, H * .3);
    const sp = { x: 84, y: H * .6, w: W - 110, h: Math.min(70, H * .09) };
    return { W, H, cy, hx, slit, px, Rs, sp, rackY: 30 };
  };
  const dev = (S, nm) => S.p.disp === 'grat' ? Math.asin(clamp(nm / 1250, -1, 1)) : .2 + 55000 / (nm * nm);
  const devInv = (S, a) => S.p.disp === 'grat' ? 1250 * Math.sin(a) : Math.sqrt(55000 / Math.max(.001, a - .2));
  const X = (g, nm) => g.sp.x + (nm - 380) / 370 * g.sp.w;
  const RACK = ['bulb', 'H', 'He', 'Na', 'Hg', 'Ne'];
  const rackPos = (g, i) => [96 + i * 58, g.rackY + 22];
  E.setup = function (S) { S.cellIn = S.p.type === 'abs'; S.cellP = null; S.tl = 560; S.sel = null; S.hold = null; };
  const setSource = (S, k) => { if (k === 'bulb') setParam(S, 'type', S.cellIn ? 'abs' : 'cont'); else { setParam(S, 'gas', k); setParam(S, 'type', 'emit'); S.cellIn = false; } S.nSrc = (S.nSrc || 0) + 1; };
  const cellXY = (S, g) => S.cellP ? [S.cellP.x, S.cellP.y] : S.cellIn ? [g.hx + 76, g.cy] : [g.hx + 76, g.cy + 92];
  const telA = S => dev(S, S.tl);
  E.pointer = null;
  E.drags = S => {
    const g = geo(S), L = [];
    RACK.forEach((k, i) => { const [x, y] = rackPos(g, i); const held = S.hold === k; L.push({ id: 'src_' + k, x: held ? S.hx : x, y: held ? S.hy : y, w: 44, h: 40, axis: 'xy', hint: i === 1, tip: 'انقر أو اسحب المصدر إلى الحامل', idle: 'اسحب مصباحاً إلى الحامل ✋',
      down: S => { S.hold = k; S.hx = x; S.hy = y; }, drag: (S, d) => { S.hx = d.ox + d.x - d.sx; S.hy = d.oy + d.y - d.sy; }, up: S => { const k2 = S.hold; S.hold = null; if (Math.hypot(S.hx - g.hx, S.hy - g.cy) < 70) setSource(S, k2); }, click: S => { S.hold = null; setSource(S, k); } }); });
    const [cx, cyy] = cellXY(S, g);
    L.push({ id: 'cell', x: cx, y: cyy, w: 56, h: 50, axis: 'xy', tip: 'غاز بارد: اسحبه إلى مسار الضوء الأبيض (طيف امتصاص) أو أبعده', down: S => { S.cellP = { x: cx, y: cyy }; }, drag: (S, d) => { S.cellP = { x: clamp(d.ox + d.x - d.sx, 90, g.slit - 30), y: clamp(d.oy + d.y - d.sy, g.cy - 60, g.cy + 120) }; },
      up: S => { if (!S.cellP) return; const inP = Math.abs(S.cellP.y - g.cy) < 40; S.cellP = null; S.cellIn = inP; if (S.p.type !== 'emit') setParam(S, 'type', inP ? 'abs' : 'cont'); S.nCell = (S.nCell || 0) + 1; }, click: S => { S.cellP = null; S.cellIn = !S.cellIn; if (S.p.type !== 'emit') setParam(S, 'type', S.cellIn ? 'abs' : 'cont'); S.nCell = (S.nCell || 0) + 1; } });
    const a = telA(S), tr = g.Rs + 26; L.push({ id: 'tel', x: g.px + Math.cos(a) * tr, y: g.cy + Math.sin(a) * tr, r: 22, cx: g.px, cy: g.cy, tip: 'أدر التلسكوب حول المنشور لمسح الطيف', drag: (S, d) => { const a2 = clamp(telA(S) + d.dang, dev(S, S.p.disp === 'grat' ? 360 : 770), dev(S, S.p.disp === 'grat' ? 770 : 360)); S.tl = clamp(devInv(S, a2), 370, 770); } });
    L.push({ id: 'disp', x: g.px, y: g.cy, r: 34, hint: false, tip: 'انقر للتبديل بين المنشور ومحزز الحيود', click: S => setParam(S, 'disp', S.p.disp === 'grat' ? 'prism' : 'grat') });
    L.push({ id: 'screen', x: g.sp.x + g.sp.w / 2, y: g.sp.y + g.sp.h / 2, w: g.sp.w, h: g.sp.h + 10, axis: 'x', hint: false, tip: 'اسحب لتحريك خط التقاطع — انقر خطاً لمعرفة طوله الموجي', drag: (S, d) => { S.tl = clamp(380 + (d.x - g.sp.x) / g.sp.w * 370, 380, 750); }, click: (S, x) => { const nm = 380 + (x - g.sp.x) / g.sp.w * 370; const L2 = LINES[S.p.gas]; const b = L2.reduce((a, l) => Math.abs(l - nm) < Math.abs(a - nm) ? l : a, L2[0]); S.sel = S.p.type !== 'cont' && Math.abs(b - nm) < 8 ? b : null; S.tl = S.sel || clamp(nm, 380, 750); } });
    return L;
  };
  const drawSrc = (ctx, k, x, y, S, lit) => {
    if (k === 'bulb') { if (lit) G.glow(ctx, x, y, 34, 'rgba(255,244,194,A)', .8); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y - 4, 13, 0, TAU); ctx.stroke(); ctx.fillStyle = '#64748b'; ctx.fillRect(x - 6, y + 8, 12, 9); ctx.strokeStyle = lit ? '#fde047' : '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 5, y - 2); for (let i = 0; i < 5; i++) ctx.lineTo(x - 5 + i * 2.5, y - 8 + (i % 2) * 6); ctx.stroke(); return; }
    const c = GC[k]; if (lit) G.glow(ctx, x, y, 34, hexA(c), .7); ctx.fillStyle = lit ? c : 'rgba(148,163,184,.3)'; rr(ctx, x - 6, y - 17, 12, 34, 6); ctx.fill(); ctx.strokeStyle = c; ctx.lineWidth = 1.2; rr(ctx, x - 6, y - 17, 12, 34, 6); ctx.stroke(); ctx.fillStyle = '#475569'; ctx.fillRect(x - 8, y - 21, 16, 5); ctx.fillRect(x - 8, y + 16, 16, 5);
  };
  E.draw = function (ctx, w, h, S) {
    G.bg(ctx, w, h, false); const g = geo(S), p = S.p, on = k => ATM.on(S, k); const L = LINES[p.gas]; const bulb = p.type !== 'emit';
    // rack
    ATM.box(ctx, 70, g.rackY - 4, RACK.length * 58 + 12, 62); RACK.forEach((k, i) => { if (S.hold === k) return; const [x, y] = rackPos(g, i); const cur = bulb ? k === 'bulb' : k === p.gas; drawSrc(ctx, k, x, y - 4, S, false); G.text(ctx, k === 'bulb' ? 'متوهج' : GN[k], x, y + 26, { s: 10, w: 800, c: cur ? '#fde68a' : '#94a3b8' }); if (cur) { ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.5; rr(ctx, x - 25, y - 28, 50, 64, 6); ctx.stroke(); } });
    G.text(ctx, 'المصادر (انقر أو اسحب إلى الحامل)', 70 + RACK.length * 58 + 22, g.rackY + 22, { s: 11, w: 800, c: '#94a3b8', a: 'left' });
    // holder + current source
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.hx - 22, g.cy + 38); ctx.lineTo(g.hx + 22, g.cy + 38); ctx.moveTo(g.hx, g.cy + 38); ctx.lineTo(g.hx, g.cy + 22); ctx.stroke(); drawSrc(ctx, bulb ? 'bulb' : p.gas, g.hx, g.cy, S, true);
    if (on('lbl')) G.text(ctx, bulb ? 'مصباح متوهج' : 'أنبوب ' + GN[p.gas] + ' متوهج', g.hx, g.cy + 54, { s: 11, w: 800, c: '#e2e8f0' });
    if (S.hold) drawSrc(ctx, S.hold, S.hx, S.hy, S, false);
    // beam to slit
    const beamCol = bulb ? 'rgba(255,250,230,.75)' : hexA(GC[p.gas]).replace('A', .8);
    const [cx, cyy] = cellXY(S, g); const cellOn = S.cellIn && !S.cellP;
    if (on('rays')) { ctx.strokeStyle = beamCol; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.hx + 18, g.cy); ctx.lineTo(g.slit, g.cy); ctx.lineTo(g.px - 16, g.cy); ctx.stroke(); }
    // cold gas cell
    setRaw(ctx, 1); ctx.fillStyle = hexA(GC[p.gas]).replace('A', .16); rr(ctx, cx - 26, cyy - 22, 52, 44, 10); ctx.fill(); setRaw(ctx, 0); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; rr(ctx, cx - 26, cyy - 22, 52, 44, 10); ctx.stroke();
    for (let i = 0; i < 9; i++) { const a = i * 2.4 + S.t * .8; ctx.fillStyle = hexA(GC[p.gas]).replace('A', .8); ctx.beginPath(); ctx.arc(cx + Math.cos(a) * (8 + i * 1.6), cyy + Math.sin(a * 1.3) * 12, 2.2, 0, TAU); ctx.fill(); }
    G.text(ctx, 'غاز ' + GN[p.gas] + ' بارد', cx, cyy + 34, { s: 10, w: 800, c: '#cbd5e1' });
    // slit
    ctx.fillStyle = '#475569'; ctx.fillRect(g.slit - 4, g.cy - 50, 8, 46); ctx.fillRect(g.slit - 4, g.cy + 4, 8, 46); if (on('lbl')) G.text(ctx, 'شق', g.slit, g.cy - 60, { s: 11, w: 800, c: '#94a3b8' });
    // dispersing element
    if (p.disp === 'grat') { ctx.fillStyle = 'rgba(200,230,255,.2)'; ctx.fillRect(g.px - 5, g.cy - 42, 10, 84); ctx.strokeStyle = 'rgba(200,230,255,.8)'; ctx.lineWidth = 1; for (let y = g.cy - 40; y < g.cy + 42; y += 4) { ctx.beginPath(); ctx.moveTo(g.px - 5, y); ctx.lineTo(g.px + 5, y); ctx.stroke(); } }
    else { ctx.fillStyle = 'rgba(200,230,255,.16)'; ctx.strokeStyle = 'rgba(200,230,255,.8)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.px, g.cy - 42); ctx.lineTo(g.px + 40, g.cy + 30); ctx.lineTo(g.px - 40, g.cy + 30); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    if (on('lbl')) G.text(ctx, p.disp === 'grat' ? 'محزز حيود' : 'منشور', g.px, g.cy - 56, { s: 11, w: 800, c: '#94a3b8' });
    // dispersed rays
    if (on('rays')) { const fan = nm => { const a = dev(S, nm); return [g.px + Math.cos(a) * g.Rs, g.cy + Math.sin(a) * g.Rs]; };
      if (p.type === 'emit') L.forEach(l => { const [x2, y2] = fan(l); ctx.strokeStyle = wlColor(l, .9); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.px + 6, g.cy); ctx.lineTo(x2, y2); ctx.stroke(); });
      else for (let nm = 382; nm < 750; nm += 3) { const a = inten(S, nm); if (a < .2) continue; const [x2, y2] = fan(nm); ctx.strokeStyle = wlColor(nm, .25 * a); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.px + 6, g.cy); ctx.lineTo(x2, y2); ctx.stroke(); }
      if (p.disp === 'grat') { ctx.strokeStyle = beamCol; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.px, g.cy); ctx.lineTo(g.px + g.Rs, g.cy); ctx.stroke(); if (on('lbl')) G.text(ctx, 'الرتبة الصفرية', g.px + g.Rs - 30, g.cy - 10, { s: 10, c: '#94a3b8' }); } }
    // telescope arm
    const a = telA(S), tr = g.Rs + 26; ctx.strokeStyle = 'rgba(148,163,184,.4)'; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(g.px, g.cy, tr, dev(S, p.disp === 'grat' ? 380 : 750) - .1, dev(S, p.disp === 'grat' ? 750 : 380) + .1); ctx.stroke(); ctx.setLineDash([]);
    ctx.save(); ctx.translate(g.px + Math.cos(a) * tr, g.cy + Math.sin(a) * tr); ctx.rotate(a); ctx.fillStyle = '#64748b'; rr(ctx, -20, -9, 50, 18, 5); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(28, -11, 10, 22); ctx.restore(); if (on('lbl')) G.text(ctx, 'التلسكوب', g.px + Math.cos(a) * (tr + 56), g.cy + Math.sin(a) * (tr + 56), { s: 11, w: 800, c: '#94a3b8' });
    // eyepiece view
    if (on('eyep')) { const ex = g.W - 90, ey = g.cy - 60, er = 58; ctx.save(); ctx.beginPath(); ctx.arc(ex, ey, er, 0, TAU); ctx.clip(); ctx.fillStyle = '#000'; ctx.fillRect(ex - er, ey - er, er * 2, er * 2); for (let x = -er; x < er; x += 2) { const nm = S.tl + x / er * 18; if (nm < 380 || nm > 750) continue; const I = inten(S, nm); if (I > .02) { ctx.fillStyle = wlColor(nm, I); ctx.fillRect(ex + x, ey - er, 2, er * 2); } } ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ex, ey - er); ctx.lineTo(ex, ey + er); ctx.moveTo(ex - er, ey); ctx.lineTo(ex + er, ey); ctx.stroke(); ctx.restore(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(ex, ey, er, 0, TAU); ctx.stroke(); G.text(ctx, 'λ = ' + fmt(S.tl, 4) + ' nm', ex, ey + er + 14, { s: 12, w: 800, mono: 1, c: '#fde68a' }); G.text(ctx, 'منظر العينية', ex, ey - er - 12, { s: 11, w: 800, c: '#94a3b8' }); }
    // spectrum screen
    const sp = g.sp; if (on('graph')) { const gy = sp.y - 12, gh = Math.min(90, sp.y - (g.cy + g.Rs * .8) - 30); if (gh > 30) { ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sp.x, gy - gh); ctx.lineTo(sp.x, gy); ctx.lineTo(sp.x + sp.w, gy); ctx.stroke(); ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.8; ctx.beginPath(); for (let x = 0; x <= sp.w; x += 1.5) { const nm = 380 + x / sp.w * 370; const y = gy - inten(S, nm) * (gh - 4); x ? ctx.lineTo(sp.x + x, y) : ctx.moveTo(sp.x + x, y); } ctx.stroke(); G.text(ctx, 'I', sp.x - 10, gy - gh + 6, { s: 11, w: 800, c: '#94a3b8' }); } }
    for (let x = 0; x < sp.w; x += 1) { const nm = 380 + x / sp.w * 370; const I = inten(S, nm); ctx.fillStyle = I > .01 ? wlColor(nm, I) : '#000'; ctx.fillRect(sp.x + x, sp.y, 1.2, sp.h); }
    ctx.strokeStyle = 'rgba(148,163,184,.6)'; ctx.lineWidth = 1; ctx.strokeRect(sp.x, sp.y, sp.w, sp.h);
    for (let nm = 400; nm <= 750; nm += 50) G.text(ctx, nm + '', X(g, nm), sp.y + sp.h + 11, { s: 10, mono: 1, c: '#94a3b8' }); G.text(ctx, 'λ (nm)', sp.x + sp.w - 4, sp.y + sp.h + 26, { s: 10, mono: 1, c: '#94a3b8' });
    const title = { cont: 'طيف انبعاث مستمر', emit: 'طيف انبعاث خطي — ' + GN[p.gas], abs: 'طيف امتصاص — خطوط مظلمة لغاز ' + GN[p.gas] }[p.type]; G.text(ctx, title, sp.x + sp.w, on('graph') ? sp.y - Math.min(90, sp.y - (g.cy + g.Rs * .8) - 30) - 26 : sp.y - 12, { s: 13, w: 800, c: '#e2e8f0', a: 'right' });
    if (on('lbl') && p.type !== 'cont') L.forEach((l, i) => G.text(ctx, l.toFixed(0), X(g, l), sp.y + sp.h + 24 + (i % 2) * 11, { s: 9, mono: 1, c: '#cbd5e1' }));
    // reference emission strip
    let ry = sp.y + sp.h + 48; if (on('ref') && p.type !== 'emit') { ctx.fillStyle = '#000'; ctx.fillRect(sp.x, ry, sp.w, 24); L.forEach(l => { ctx.fillStyle = wlColor(l); ctx.fillRect(X(g, l) - 1.5, ry, 3, 24); }); ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.strokeRect(sp.x, ry, sp.w, 24); G.text(ctx, 'طيف انبعاث ' + GN[p.gas] + ' (للمقارنة): الخطوط في المواقع نفسها', sp.x + sp.w, ry + 36, { s: 11, w: 800, c: '#94a3b8', a: 'right' });
      if (p.type === 'abs') L.forEach(l => { ctx.setLineDash([2, 3]); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(X(g, l), sp.y + sp.h); ctx.lineTo(X(g, l), ry); ctx.stroke(); ctx.setLineDash([]); }); }
    // crosshair marker
    const mx = X(g, S.tl); ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(mx, sp.y - 6); ctx.lineTo(mx, sp.y + sp.h + 4); ctx.stroke(); ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.moveTo(mx, sp.y - 2); ctx.lineTo(mx - 6, sp.y - 11); ctx.lineTo(mx + 6, sp.y - 11); ctx.closePath(); ctx.fill();
    if (S.sel) { const t = p.gas === 'H' && HTR[Math.round(S.sel)] ? '  (انتقال n = ' + HTR[Math.round(S.sel)] + ')' : ''; G.text(ctx, 'λ = ' + S.sel + ' nm' + t, X(g, S.sel), sp.y - 26, { s: 12, w: 800, c: '#0f172a', bg: '#fde68a' }); }
  };
  E.readings = function (S) { const L = LINES[S.p.gas]; const near = L.reduce((a, l) => Math.abs(l - S.tl) < Math.abs(a - S.tl) ? l : a, L[0]); return [rd('نوع الطيف', { cont: 'مستمر', emit: 'خطي انبعاثي', abs: 'خطي امتصاصي' }[S.p.type]), rd('λ عند خط التقاطع', fmt(S.tl, 4) + ' nm'), rd('طاقة الفوتون hc/λ', fmt(1240 / S.tl, 3, 'eV')), rd('أقرب خط للغاز', S.p.type === 'cont' ? '—' : near + ' nm'), rd('عدد الخطوط المرئية', S.p.type === 'cont' ? '—' : L.length + ''), rd('الأطوال الموجية (nm)', S.p.type === 'cont' ? 'جميع الأطوال 380–750' : L.join(' ، '), 1)]; };
  E.explain = S => ({ cont: `الجسم الصلب المتوهج يبعث ${B_('جميع')} الأطوال الموجية فيظهر طيف مستمر. اسحب الغاز البارد إلى مسار الضوء.`, emit: `ذرات الغاز المتوهج تبعث أطوالاً موجية ${B_('محددة')} فقط (بصمة العنصر) فتظهر خطوط ملونة على خلفية مظلمة.`, abs: `الغاز البارد ${B_('يمتص')} من الضوء الأبيض الأطوال الموجية نفسها التي يبعثها عندما يتوهج، فتظهر خطوط مظلمة في مواقع خطوط الانبعاث نفسها.` })[S.p.type];
  E.howto = '<b>جرّب:</b> اسحب مصباحاً أو أنبوب غاز من الرف إلى الحامل (أو انقره)، واسحب «الغاز البارد» إلى مسار الضوء الأبيض. أدر التلسكوب حول المنشور أو اسحب خط التقاطع على الشاشة، وانقر أي خط لمعرفة طوله الموجي. انقر المنشور للتبديل إلى محزز الحيود.';
})();

/* ======================= xray: Coolidge tube, bremsstrahlung + characteristic lines ======================= */
(() => {
  const E = EXPS.find(e => e.id === 'xray'); if (!E) return;
  const cV = E.controls.find(c => c.k === 'V'); cV.max = 80;
  const TG_ = { Mo: { ka: .071, kb: .063, edge: 20, n: 'موليبدنيوم Mo' }, Cu: { ka: .154, kb: .139, edge: 9, n: 'نحاس Cu' }, W: { ka: .021, kb: .018, edge: 70, n: 'تنكستن W' } };
  E.controls = E.controls.concat([
    TG('elec', 'الإلكترونات المعجلة', true, null, 'electron'),
    TG('field', 'المجال الكهربائي المعجل', false, null, 'efield'),
    TG('xr', 'فوتونات الأشعة السينية', true, null, 'photon'),
    TG('hist', 'الطيف المقيس (عدّ الفوتونات)', true, null, 'graph'),
    TG('shell', 'ذرة الهدف (توليد الخطوط المميزة)', true, null, 'atom'),
    TG('lbl', 'التسميات والقيم', true, null, 'labels')
  ]);
  const NB = 80, LM = .2;
  const geo = S => { const W = S.W || 800, H = S.H || 700; const tx0 = 96, tx1 = Math.max(380, W * .6), cy = Math.max(150, H * .2) + 20; const cat = tx0 + 44, an = tx1 - 60;
    const det = { x: an - 30, y: cy + 150 }; const gr = { x: 118, y: Math.max(det.y + 70, H * .5), w: W - 150 }; gr.h = Math.max(120, H - 150 - gr.y); const sh = { x: Math.min(W - 95, tx1 + 110), y: cy + 30, r: 66 };
    return { W, H, tx0, tx1, cy, cat, an, det, gr, sh }; };
  E.setup = function (S) { S.el = []; S.xp = []; S.bins = new Array(NB).fill(0); S.nX = 0; S.acc = 0; S.ev = null; S.sel = null; };
  const smax = S => { let m = 0; for (let i = 1; i <= 200; i++) m = Math.max(m, E.spec(S, i / 200 * LM)); return m || 1; };
  const sample = (S, mx) => { const lmin = 1.24 / S.p.V; for (let k = 0; k < 40; k++) { const l = lmin + Math.random() * (LM - lmin); if (Math.random() * mx < E.spec(S, l)) return l; } return null; };
  E.update = function (S, dt) {
    const g = geo(S), p = S.p; dt = Math.min(dt, .05); S.acc += dt * p.I / 100 * 14;
    while (S.acc > 1) { S.acc -= 1; S.el.push({ x: 0, y: (Math.random() - .5) * 14, v: 0 }); }
    const acc = p.V * 0.05; const L = g.an - g.cat - 12; let mx = null;
    S.el.forEach(e => { e.v += acc * dt; e.x += e.v * dt * 1.4; if (e.x >= 1) { e.dead = 1; if (Math.random() < .55) { mx = mx || smax(S); const l = sample(S, mx); if (l) { const t = TG_[p.tg]; const ch = p.V > t.edge && (Math.abs(l - t.ka) < .003 || Math.abs(l - t.kb) < .003); S.xp.push({ x: g.an - 16, y: g.cy + 4, a: Math.PI / 2 + (Math.random() - .5) * .35, d: 0, l, ch }); if (ch && !S.ev) S.ev = { t: 0, b: Math.abs(l - t.kb) < .003 }; } for (let k = 0; k < 5; k++) { const l2 = sample(S, mx); if (l2) { const b = Math.floor(l2 / LM * NB); if (b >= 0 && b < NB) S.bins[b]++; } } } } });
    S.el = S.el.filter(e => !e.dead);
    S.xp.forEach(q => { q.d += dt * 260; const y = g.cy + 4 + Math.sin(q.a) * q.d; if (y > g.det.y) { q.dead = 1; const b = Math.floor(q.l / LM * NB); if (b >= 0 && b < NB) { S.bins[b]++; S.nX++; } } });
    S.xp = S.xp.filter(q => !q.dead);
    if (S.ev) { S.ev.t += dt; if (S.ev.t > 2.2) S.ev = null; }
  };
  const clearBins = S => { S.bins = new Array(NB).fill(0); S.nX = 0; };
  ['V', 'tg'].forEach(k => { const c = E.controls.find(q => q.k === k); const o = c.on; c.on = (v, S, init) => { o && o(v, S, init); if (!init && S.bins) clearBins(S); }; });
  E.pointer = null;
  E.drags = S => {
    const g = geo(S), L = []; const hx = (g.tx0 + g.tx1) / 2;
    L.push(ATM.knobObj(S, 'kV', hx + 40, g.cy - 104, 18, 'V', 'أدر مقبض فرق جهد التعجيل (kV)', { idle: 'أدر مقبض الجهد العالي ✋' }));
    L.push(ATM.knobObj(S, 'kI', g.tx0 + 30, g.cy - 104, 15, 'I', 'أدر مقبض تيار الفتيلة (عدد الإلكترونات)'));
    L.push({ id: 'target', x: g.an + 10, y: g.cy, w: 40, h: 64, hint: false, tip: 'انقر لتبديل مادة الهدف', click: S => { const o = ['Mo', 'Cu', 'W']; setParam(S, 'tg', o[(o.indexOf(S.p.tg) + 1) % 3]); } });
    const G2 = g.gr; const xm = G2.x + 1.24 / S.p.V / LM * G2.w;
    L.push({ id: 'lmin', x: xm, y: G2.y + 14, r: 13, axis: 'x', tip: 'اسحب λmin — يتغير فرق الجهد اللازم (λmin = hc/eV)', drag: (S, d) => { const l = clamp((d.ox + d.x - d.sx - G2.x) / G2.w * LM, 1.24 / 80, 1.24 / 10); setParam(S, 'V', 1.24 / l); } });
    L.push({ id: 'graph', x: G2.x + G2.w / 2, y: G2.y + G2.h / 2 + 10, w: G2.w, h: G2.h - 20, hint: false, tip: 'انقر قمة لمعرفة سببها — انقر مرتين لتصفير العدّ', click: (S, x) => { const l = (x - G2.x) / G2.w * LM; const t = TG_[S.p.tg]; S.sel = Math.abs(l - t.ka) < .006 ? 'ka' : Math.abs(l - t.kb) < .006 ? 'kb' : l < 1.24 / S.p.V + .004 && l > 1.24 / S.p.V - .004 ? 'min' : 'br'; S.selX = x; S.nSel = (S.nSel || 0) + 1; } });
    return L;
  };
  E.draw = function (ctx, w, h, S) {
    G.bg(ctx, w, h); const g = geo(S), p = S.p, on = k => ATM.on(S, k), T = TG_[p.tg]; const cy = g.cy;
    // HV supply box
    const hx = (g.tx0 + g.tx1) / 2; ctx.fillStyle = '#1e293b'; rr(ctx, g.tx0, cy - 140, g.tx1 - g.tx0, 66, 10); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; rr(ctx, g.tx0, cy - 140, g.tx1 - g.tx0, 66, 10); ctx.stroke();
    G.text(ctx, 'مجهز فولطية عالية', g.tx1 - 12, cy - 126, { s: 11, w: 800, c: '#94a3b8', a: 'right' }); G.text(ctx, fmt(p.V, 3) + ' kV', hx + 110, cy - 102, { s: 16, w: 900, mono: 1, c: '#fde68a' });
    ATM.knob(ctx, hx + 40, cy - 104, 18, (p.V - 10) / 70, '', ''); ATM.knob(ctx, g.tx0 + 30, cy - 104, 15, (p.I - 10) / 90, '', ''); G.text(ctx, 'الجهد', hx + 8, cy - 104, { s: 10, w: 800, c: '#94a3b8', a: 'right' }); G.text(ctx, 'تيار الفتيلة ' + p.I + '%', g.tx0 + 54, cy - 104, { s: 10, w: 800, c: '#94a3b8', a: 'left' });
    // wires
    G.wire(ctx, [[g.an + 30, cy - 74], [g.an + 30, cy - 30]], '#ef4444', 2); G.wire(ctx, [[g.cat - 20, cy - 74], [g.cat - 20, cy - 12]], '#3b82f6', 2); G.text(ctx, '+', g.an + 44, cy - 60, { s: 15, w: 900, c: '#ef4444' }); G.text(ctx, '−', g.cat - 34, cy - 60, { s: 15, w: 900, c: '#60a5fa' });
    // glass tube
    ctx.fillStyle = 'rgba(200,230,255,.07)'; ctx.strokeStyle = 'rgba(200,230,255,.55)'; ctx.lineWidth = 1.5; rr(ctx, g.tx0, cy - 50, g.tx1 - g.tx0, 100, 48); ctx.fill(); ctx.stroke(); if (on('lbl')) G.text(ctx, 'أنبوب مفرغ', g.tx0 + 70, cy + 40, { s: 10, c: '#94a3b8' });
    // filament
    const glow = p.I / 100; G.glow(ctx, g.cat - 8, cy, 26, 'rgba(251,146,60,A)', .3 + glow * .6); ctx.strokeStyle = `rgb(255,${150 + glow * 90},60)`; ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i <= 12; i++) ctx.lineTo(g.cat - 14 + (i % 2) * 8, cy - 14 + i * 2.4); ctx.stroke(); ctx.fillStyle = '#64748b'; ctx.fillRect(g.cat - 26, cy - 14, 6, 28); if (on('lbl')) G.text(ctx, 'الفتيلة (كاثود)', g.cat - 10, cy + 30, { s: 10, w: 800, c: '#fdba74' });
    // anode with angled target
    ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.moveTo(g.an - 20, cy - 26); ctx.lineTo(g.an + 40, cy - 26); ctx.lineTo(g.an + 40, cy + 26); ctx.lineTo(g.an + 4, cy + 26); ctx.closePath(); ctx.fill();
    ctx.fillStyle = { Mo: '#94a3b8', Cu: '#f97316', W: '#cbd5e1' }[p.tg]; ctx.beginPath(); ctx.moveTo(g.an - 20, cy - 26); ctx.lineTo(g.an - 8, cy - 26); ctx.lineTo(g.an + 14, cy + 26); ctx.lineTo(g.an + 4, cy + 26); ctx.closePath(); ctx.fill();
    G.text(ctx, p.tg, g.an + 24, cy, { s: 13, w: 900, c: '#fff' }); if (on('lbl')) G.text(ctx, 'الهدف (أنود) — انقر للتبديل', g.an + 6, cy - 38, { s: 10, w: 800, c: '#fdba74' });
    // accelerating field
    if (on('field')) for (let k = 0; k < 3; k++) { const y = cy - 20 + k * 20; G.arrow(ctx, g.an - 30, y, g.cat + 6, y, 'rgba(251,146,60,.45)', 1.5, 7); } if (on('field') && on('lbl')) G.text(ctx, 'E', (g.cat + g.an) / 2, cy - 34, { s: 13, w: 900, c: '#fb923c' });
    // electrons
    if (on('elec')) S.el.forEach(e => { const x = g.cat + e.x * (g.an - g.cat - 14), y = cy + e.y * (1 - e.x); ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.arc(x, y, 2.6, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(125,211,252,.3)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 6 - e.v * 4, y); ctx.stroke(); });
    // window and detector
    ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.an - 20, cy + 49); ctx.lineTo(g.an + 20, cy + 49); ctx.stroke(); if (on('lbl')) G.text(ctx, 'نافذة', g.an + 36, cy + 58, { s: 10, c: '#c4b5fd' });
    ctx.fillStyle = '#334155'; rr(ctx, g.det.x - 36, g.det.y, 132, 22, 5); ctx.fill(); G.text(ctx, 'كاشف ومطياف (' + S.nX + ')', g.det.x + 30, g.det.y + 11, { s: 10, w: 800, c: '#e2e8f0' });
    if (on('xr')) S.xp.forEach(q => { const x = q.x + Math.cos(q.a) * q.d, y = q.y + Math.sin(q.a) * q.d; const c = q.ch ? '#f0abfc' : '#a78bfa'; ATM.photon(ctx, x, y, q.a, c, 26, clamp(q.l * 140, 3, 16), S.t * 20, 3.5); });
    if (on('lbl') && on('xr')) G.text(ctx, 'أشعة سينية', g.an - 64, cy + 94, { s: 11, w: 800, c: '#c4b5fd' });
    // target atom inset
    if (on('shell')) { const c = g.sh; ATM.box(ctx, c.x - c.r - 22, c.y - c.r - 30, c.r * 2 + 44, c.r * 2 + 64, 'ذرة الهدف'); const rs = [c.r * .34, c.r * .64, c.r * .92];
      rs.forEach((r, i) => { ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, TAU); ctx.stroke(); G.text(ctx, 'KLM'[i], c.x + r * .72 + 4, c.y - r * .72 - 2, { s: 10, w: 900, c: '#94a3b8' }); });
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(c.x, c.y, 7, 0, TAU); ctx.fill();
      const ev = S.ev, ph = ev ? ev.t : -1; const kEmpty = ev && ph > .5 && ph < 1.4; const from = ev && ev.b ? 2 : 1;
      const eAt = (r, a) => { ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.arc(c.x + Math.cos(a) * r, c.y + Math.sin(a) * r, 3.5, 0, TAU); ctx.fill(); };
      eAt(rs[0], S.t * .9); if (!kEmpty) eAt(rs[0], S.t * .9 + Math.PI); else { ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(c.x + Math.cos(S.t * .9 + Math.PI) * rs[0], c.y + Math.sin(S.t * .9 + Math.PI) * rs[0], 4, 0, TAU); ctx.stroke(); }
      for (let k = 0; k < 8; k++) if (!(ev && ph > 1.4 && ph < 1.7 && k === 0 && from === 1)) eAt(rs[1], S.t * .5 + k * TAU / 8); for (let k = 0; k < 8; k++) eAt(rs[2], -S.t * .3 + k * TAU / 8);
      if (ev) { if (ph < .5) { const k = ph / .5; eAt(lerp(c.r * 1.3, rs[0], k), Math.PI * 1.1); G.text(ctx, 'إلكترون معجل', c.x - c.r * .9, c.y - c.r - 12, { s: 10, w: 800, c: '#7dd3fc' }); }
        else if (ph < 1.4) { const k = (ph - .5) / .9; eAt(lerp(rs[0], c.r * 1.3, k), S.t * .9 + Math.PI); G.text(ctx, 'فراغ في المستوى K', c.x, c.y + c.r + 16, { s: 10, w: 800, c: '#fbbf24' }); }
        else { const k = Math.min(1, (ph - 1.4) / .3), a = S.t * .9 + Math.PI; eAt(lerp(rs[from], rs[0], k), a); const lab = ev.b ? 'Kβ: M → K' : 'Kα: L → K'; ATM.photon(ctx, c.x + Math.cos(a) * (rs[0] + 20 + (ph - 1.4) * 60), c.y + Math.sin(a) * (rs[0] + 20 + (ph - 1.4) * 60), a, '#f0abfc', 26, 5, S.t * 20, 3); G.text(ctx, lab + ' (hf = EL − EK)', c.x, c.y + c.r + 16, { s: 10, w: 800, c: '#f0abfc' }); } }
      else G.text(ctx, p.V > T.edge ? 'تنتظر إصابة إلكترون K' : 'الجهد أقل من ' + T.edge + ' kV: لا خطوط مميزة', c.x, c.y + c.r + 16, { s: 10, w: 800, c: '#94a3b8' }); }
    // spectrum graph
    const R = g.gr, x0 = R.x, y0 = R.y + R.h, mx = smax(S); const X = l => x0 + l / LM * R.w, Y = v => y0 - v / mx * (R.h - 24);
    ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x0, R.y); ctx.lineTo(x0, y0); ctx.lineTo(x0 + R.w, y0); ctx.stroke();
    if (on('hist')) { const bm = Math.max(1, ...S.bins); const sc = Math.max(bm, 8); for (let i = 0; i < NB; i++) { if (!S.bins[i]) continue; const bh = S.bins[i] / sc * (R.h - 24); ctx.fillStyle = 'rgba(167,139,250,.45)'; ctx.fillRect(X(i * LM / NB) + 1, y0 - bh, R.w / NB - 2, bh); } }
    ctx.strokeStyle = '#c084fc'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x <= R.w; x++) { const l = x / R.w * LM; const y = Y(E.spec(S, l)); x ? ctx.lineTo(x0 + x, Math.max(R.y, y)) : ctx.moveTo(x0 + x, y); } ctx.stroke();
    for (let l = 0; l <= LM + 1e-9; l += .025) G.text(ctx, l.toFixed(3), X(l), y0 + 12, { s: 9, mono: 1, c: '#94a3b8' }); G.text(ctx, 'λ (nm)', x0 + R.w - 12, y0 + 26, { s: 10, mono: 1, c: '#94a3b8' }); G.text(ctx, 'الشدة', x0 - 20, R.y + 4, { s: 10, w: 800, c: '#94a3b8' });
    const lmn = 1.24 / p.V, xm = X(lmn); ctx.setLineDash([4, 4]); ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(xm, R.y + 24); ctx.lineTo(xm, y0); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(xm, R.y + 14, 7, 0, TAU); ctx.fill(); G.text(ctx, 'λmin = ' + fmt(lmn, 3) + ' nm', xm + 12, R.y + 14, { s: 11, w: 800, mono: 1, c: '#fde68a', a: 'left' });
    if (p.V > T.edge && on('lbl')) { [['Kα', T.ka], ['Kβ', T.kb]].forEach(([n, l]) => { if (l > lmn) G.text(ctx, n, X(l), Math.max(R.y + 34, Y(E.spec(S, l))) - 10, { s: 12, w: 900, c: '#f0abfc' }); }); }
    if (S.sel) { const t = { ka: 'Kα: انتقال إلكترون من L إلى فراغ في K — مميز لمادة الهدف', kb: 'Kβ: انتقال من M إلى K — مميز لمادة الهدف', min: 'λmin: الإلكترون يفقد كل طاقته eV في فوتون واحد', br: 'أشعة الكبح: تباطؤ الإلكترونات قرب نوى الهدف (طيف مستمر)' }[S.sel]; G.text(ctx, t, clamp(S.selX, x0 + 170, x0 + R.w - 170), R.y - 8, { s: 11, w: 800, c: '#0f172a', bg: '#fde68a' }); }
  };
  const r0 = E.readings; E.readings = function (S) { const T = TG_[S.p.tg]; return r0.call(this, S).concat([rd('مادة الهدف', T.n), rd('الخطوط المميزة', S.p.V > T.edge ? 'Kα ' + T.ka + ' nm ، Kβ ' + T.kb + ' nm' : 'لا تظهر (V < ' + T.edge + ' kV)', 1), rd('فوتونات مسجلة', S.nX + '')]); };
  E.explain = S => { const T = TG_[S.p.tg]; return `الإلكترونات تكتسب طاقة ${B_(fmt(S.p.V, 3) + ' keV')} وتتباطأ في الهدف فتبعث أشعة كبح طولها الموجي لا يقل عن λmin = ${fmt(1.24 / S.p.V, 3)} nm.` + (S.p.V > T.edge ? ` الجهد يكفي لاقتلاع إلكترونات K فتظهر ${B_('الخطوط المميزة')} Kα و Kβ لمادة الهدف.` : ` لا تظهر خطوط ${T.n.split(' ')[0]} المميزة لأن الجهد أقل من ${T.edge} kV.`); };
  E.howto = '<b>جرّب:</b> أدر مقبض الجهد العالي (أو اسحب نقطة λmin على المنحني) ولاحظ انزياح أقصر طول موجي، وأدر مقبض تيار الفتيلة لزيادة عدد الإلكترونات. انقر الهدف لتبديل مادته، وانقر أي قمة في الطيف لمعرفة سببها.';
})();

/* ======================= compton: rotating detector, λ and λ′, recoil electron ======================= */
(() => {
  const E = EXPS.find(e => e.id === 'compton'); if (!E) return;
  const LC = .002426;
  E.controls = E.controls.concat([
    TG('auto', 'إطلاق فوتونات متتابعة', true, null, 'photon'),
    TG('elec', 'الإلكترون المرتد (متجه زخمه)', true, null, 'electron'),
    TG('ruler', 'مقارنة الطولين الموجيين λ و λ′', true, null, 'wave'),
    TG('vec', 'مخطط حفظ الزخم', true, null, 'vector'),
    TG('graph', 'منحني Δλ مقابل θ', true, null, 'graph'),
    TG('det', 'طيف الكاشف (قمتان)', true, null, 'graph'),
    TG('lbl', 'التسميات والقيم', true, null, 'labels')
  ]);
  const geo = S => { const W = S.W || 800, H = S.H || 700; const cx = Math.max(250, W * .42), cy = Math.max(200, H * .36), Rd = Math.min(W * .3, H * .26, cx - 130); const pan = { y: Math.max(cy + Rd * .55 + 40, H * .6), h: 0 }; pan.h = Math.max(110, H - 120 - pan.y); return { W, H, cx, cy, Rd, sx: 104, pan }; };
  const phys = S => { const th = rad(S.p.th), lam = S.p.lam, dl = LC * (1 - Math.cos(th)), lp = lam + dl; const pe = [1 / lam - Math.cos(th) / lp, -Math.sin(th) / lp]; return { th, lam, dl, lp, pe, pm: Math.hypot(pe[0], pe[1]), phi: Math.atan2(-pe[1], pe[0]) }; }; // phi below the axis
  E.setup = function (S) { S.ph = 0; S.nShot = 0; S.hits = 0; };
  E.update = function (S, dt) { if (S.ph < 2.3) { S.ph += dt * 1.2; if (S.ph >= 2 && !S.counted) { S.counted = 1; S.hits++; } } else if (S.p.auto) { S.ph = 0; S.counted = 0; S.nShot++; } };
  E.pointer = null;
  E.drags = S => { const g = geo(S), th = rad(S.p.th), L = [];
    L.push({ id: 'det', x: g.cx + Math.cos(th) * g.Rd, y: g.cy - Math.sin(th) * g.Rd, r: 24, cx: g.cx, cy: g.cy, tip: 'أدر الكاشف حول الهدف لتغيير زاوية الاستطارة θ', idle: 'أدر الكاشف حول الهدف ✋', drag: (S, d) => { const a = Math.atan2(-(d.y - g.cy), d.x - g.cx); setParam(S, 'th', clamp(Math.round(deg(a < -Math.PI / 2 ? a + TAU : a)), 0, 180)); S.ph = Math.min(S.ph, 2); } });
    L.push(ATM.knobObj(S, 'kLam', g.sx, g.cy + 66, 15, 'lam', 'أدر المقبض لتغيير الطول الموجي الساقط λ'));
    L.push({ id: 'src', x: g.sx, y: g.cy, w: 60, h: 44, hint: false, tip: 'انقر لإطلاق فوتون', click: S => { S.ph = 0; S.counted = 0; S.nShot++; } });
    return L; };
  const wave = (ctx, x1, y1, x2, y2, wl, col, ph, amp = 7) => ATM.wig(ctx, x1, y1, x2, y2, wl, col, amp, ph, 2.2);
  E.draw = function (ctx, w, h, S) {
    G.bg(ctx, w, h); const g = geo(S), P = phys(S), on = k => ATM.on(S, k); const K = 180; // px per 0.1 nm-ish scale for wiggles
    const wlI = clamp(P.lam * K, 5, 40), wlS = clamp(P.lp * K, 5, 44); const cI = '#7c3aed', cS = '#db2777', cE = '#2563eb';
    // detector track
    ctx.strokeStyle = 'rgba(148,163,184,.55)'; ctx.setLineDash([4, 5]); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.Rd, Math.PI, 0); ctx.stroke(); ctx.setLineDash([]);
    for (let a = 0; a <= 180; a += 30) { const r = rad(a); ctx.strokeStyle = '#94a3b8'; ctx.beginPath(); ctx.moveTo(g.cx + Math.cos(r) * (g.Rd - 5), g.cy - Math.sin(r) * (g.Rd - 5)); ctx.lineTo(g.cx + Math.cos(r) * (g.Rd + 5), g.cy - Math.sin(r) * (g.Rd + 5)); ctx.stroke(); G.text(ctx, a + '°', g.cx + Math.cos(r) * (g.Rd + 18), g.cy - Math.sin(r) * (g.Rd + 18), { s: 10, mono: 1, c: '#94a3b8' }); }
    // source (x-ray tube)
    ctx.fillStyle = '#475569'; rr(ctx, g.sx - 30, g.cy - 22, 60, 44, 8); ctx.fill(); ctx.fillStyle = '#a78bfa'; ctx.fillRect(g.sx + 26, g.cy - 8, 6, 16); G.text(ctx, 'مصدر', g.sx, g.cy - 6, { s: 11, w: 800, c: '#fff', raw: 1 }); G.text(ctx, 'أشعة X', g.sx, g.cy + 9, { s: 10, w: 800, c: '#e9d5ff', raw: 1 });
    ATM.knob(ctx, g.sx, g.cy + 66, 15, (P.lam - .005) / .095, 'λ الساقط', fmt(P.lam, 4) + ' nm');
    // forward direction reference
    ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.lineTo(g.cx + g.Rd - 30, g.cy); ctx.stroke(); ctx.setLineDash([]);
    // target
    setRaw(ctx, 1); ctx.fillStyle = '#374151'; rr(ctx, g.cx - 16, g.cy - 22, 32, 44, 4); ctx.fill(); setRaw(ctx, 0); G.text(ctx, 'كرافيت', g.cx, g.cy + 36, { s: 11, w: 800, c: '#64748b' });
    // animation
    const ph = S.ph; const xin0 = g.sx + 34, xin1 = g.cx - 18;
    if (ph < 1) { const hx = lerp(xin0, xin1, ph); wave(ctx, Math.max(xin0, hx - 90), g.cy, hx, g.cy, wlI, cI, S.t * 14); ctx.fillStyle = cE; ctx.beginPath(); ctx.arc(g.cx - 4, g.cy - 3, 6, 0, TAU); ctx.fill(); }
    else { const k = Math.min(1, ph - 1); const Ld = g.Rd - 26; const d1 = k * Ld; const ca = Math.cos(P.th), sa = -Math.sin(P.th);
      wave(ctx, g.cx + ca * Math.max(0, d1 - 90), g.cy + sa * Math.max(0, d1 - 90), g.cx + ca * d1, g.cy + sa * d1, wlS, cS, S.t * 14);
      if (on('elec')) { const re = 60 + 120 * P.pm / (1 / P.lam) * 4; const de = k * Math.min(re, 150); const ex = g.cx + Math.cos(P.phi) * de, ey = g.cy + Math.sin(P.phi) * de; ctx.fillStyle = cE; ctx.beginPath(); ctx.arc(ex, ey, 6, 0, TAU); ctx.fill(); G.text(ctx, '−', ex, ey - .5, { s: 11, w: 900, c: '#fff', raw: 1 }); } }
    if (on('elec')) { const L2 = 110; G.arrow(ctx, g.cx, g.cy, g.cx + Math.cos(P.phi) * L2, g.cy + Math.sin(P.phi) * L2, 'rgba(37,99,235,.55)', 2, 9); if (on('lbl')) G.text(ctx, 'إلكترون مرتد  φ = ' + fmt(deg(P.phi), 3) + '°', g.cx + Math.cos(P.phi) * (L2 + 16) + 40, g.cy + Math.sin(P.phi) * (L2 + 16), { s: 11, w: 800, c: cE }); }
    // static rays
    ctx.strokeStyle = 'rgba(124,58,237,.25)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(xin0, g.cy); ctx.lineTo(xin1, g.cy); ctx.stroke(); ctx.strokeStyle = 'rgba(219,39,119,.28)'; ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.lineTo(g.cx + Math.cos(P.th) * (g.Rd - 26), g.cy - Math.sin(P.th) * (g.Rd - 26)); ctx.stroke();
    // angle θ
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.cx, g.cy, 46, -P.th, 0); ctx.stroke(); G.text(ctx, 'θ = ' + S.p.th + '°', g.cx + 70 * Math.cos(P.th / 2) + 18, g.cy - 70 * Math.sin(P.th / 2), { s: 13, w: 900, c: '#e2e8f0' });
    // detector
    ctx.save(); ctx.translate(g.cx + Math.cos(P.th) * g.Rd, g.cy - Math.sin(P.th) * g.Rd); ctx.rotate(-P.th); ctx.fillStyle = '#0f766e'; rr(ctx, -10, -16, 34, 32, 6); ctx.fill(); ctx.fillStyle = '#5eead4'; ctx.fillRect(-12, -10, 4, 20); ctx.restore();
    if (on('lbl')) { G.text(ctx, 'فوتون ساقط λ', (xin0 + xin1) / 2, g.cy - 26, { s: 12, w: 800, c: cI }); const mx = g.cx + Math.cos(P.th) * g.Rd * .62, my = g.cy - Math.sin(P.th) * g.Rd * .62; G.text(ctx, "فوتون مستطار λ′", mx + (P.th > 1.6 ? -60 : 62), my - 10, { s: 12, w: 800, c: cS }); G.text(ctx, 'الكاشف', g.cx + Math.cos(P.th) * (g.Rd + 42), g.cy - Math.sin(P.th) * (g.Rd + 42), { s: 11, w: 800, c: '#0f766e' }); }
    // ruler comparison (top right)
    if (on('ruler')) { const rx = Math.min(g.W - 240, g.cx + g.Rd + 30), rw = g.W - 20 - rx; if (rw > 150) { const y1 = 60, K2 = 520 / Math.max(P.lam, .02) * .1; const n = 5; ATM.box(ctx, rx - 6, y1 - 30, rw + 12, 108, 'مقارنة λ و λ′ (مكبّر)');
      const draw = (y, l, col, lab) => { const wl = l * 520 * (.07 / Math.max(P.lam, .02)) * .95; ATM.wig(ctx, rx + 34, y, rx + 34 + Math.min(rw - 40, n * wl), y, wl, col, 9, Math.PI / 2, 2); G.text(ctx, lab, rx + 14, y, { s: 12, w: 900, c: col }); ctx.strokeStyle = col; ctx.setLineDash([2, 3]); ctx.beginPath(); const xe = rx + 34 + Math.min(rw - 40, n * wl); ctx.moveTo(xe, y - 14); ctx.lineTo(xe, y + 14); ctx.stroke(); ctx.setLineDash([]); };
      draw(y1, P.lam, cI, 'λ'); draw(y1 + 34, P.lp, cS, "λ′"); G.text(ctx, '5 أطوال موجية لكل منهما', rx + rw / 2, y1 + 60, { s: 10, c: '#64748b' }); } }
    // bottom panels
    const pn = g.pan, half = (g.W - 100) / 2;
    if (on('graph')) { const x0 = 104, y0 = pn.y + pn.h - 16, pw = half - 40, phh = pn.h - 36; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x0, y0 - phh); ctx.lineTo(x0, y0); ctx.lineTo(x0 + pw, y0); ctx.stroke(); const X = a => x0 + a / 180 * pw, Y = v => y0 - v / (2 * LC) * (phh - 10);
      ctx.strokeStyle = '#db2777'; ctx.lineWidth = 2; ctx.beginPath(); for (let a = 0; a <= 180; a += 3) { const y = Y(LC * (1 - Math.cos(rad(a)))); a ? ctx.lineTo(X(a), y) : ctx.moveTo(X(a), y); } ctx.stroke(); ctx.fillStyle = '#0f766e'; ctx.beginPath(); ctx.arc(X(S.p.th), Y(P.dl), 6, 0, TAU); ctx.fill();
      [0, 90, 180].forEach(a => G.text(ctx, a + '°', X(a), y0 + 11, { s: 9, mono: 1, c: '#64748b' })); G.text(ctx, '0.00485', x0 - 4, Y(2 * LC), { s: 9, mono: 1, c: '#64748b', a: 'right' }); G.text(ctx, 'Δλ (nm)', x0 + 34, y0 - phh - 6, { s: 10, w: 800, c: '#64748b' }); G.text(ctx, 'θ', x0 + pw + 8, y0, { s: 12, w: 800, c: '#64748b' }); G.text(ctx, 'Δλ = (h/mₑc)(1 − cosθ)', x0 + pw / 2 + 30, y0 - phh + 8, { s: 11, w: 800, mono: 1, c: '#db2777' }); }
    if (on('vec')) { const rx = Math.min(g.W - 240, g.cx + g.Rd + 30), rw = g.W - 20 - rx, vy = 170, vh = Math.min(200, pn.y - vy - 20); if (rw > 150 && vh > 110) { ATM.box(ctx, rx - 6, vy - 26, rw + 12, vh + 20, 'حفظ الزخم: p = p′ + pₑ'); const sc = Math.min(rw * .42, vh * .5, 110) * P.lam; const pin = [sc / P.lam, 0], ps = [sc * Math.cos(P.th) / P.lp, -sc * Math.sin(P.th) / P.lp];
      const bx = rx + (P.th > 1.57 ? rw * .5 : 20), by = vy + vh - 30;
      G.arrow(ctx, bx, by, bx + pin[0], by, cI, 2.5, 9); G.arrow(ctx, bx, by, bx + ps[0], by + ps[1], cS, 2.5, 9); G.arrow(ctx, bx + ps[0], by + ps[1], bx + pin[0], by, cE, 2.5, 9);
      G.text(ctx, 'p = h/λ', bx + pin[0] / 2, by + 13, { s: 10, w: 800, c: cI }); G.text(ctx, "p′", bx + ps[0] / 2 - 12, by + ps[1] / 2, { s: 12, w: 900, c: cS }); G.text(ctx, 'pₑ', (bx + ps[0] + bx + pin[0]) / 2 + 12, (by + ps[1] + by) / 2 - 4, { s: 12, w: 900, c: cE }); } }
    if (on('det')) { const x0 = 104 + half + 20, pw = half - 30, y0 = pn.y + pn.h - 16, hh = Math.min(110, pn.h * .6); const l0 = P.lam - .004, l1 = P.lam + .008; const X = l => x0 + (l - l0) / (l1 - l0) * pw; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + pw, y0); ctx.stroke();
      ctx.strokeStyle = '#0f766e'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x <= pw; x += 1.5) { const l = l0 + x / pw * (l1 - l0); const v = .45 * Math.exp(-(((l - P.lam) / .0003) ** 2)) + .9 * Math.exp(-(((l - P.lp) / .0004) ** 2)); const y = y0 - v * hh; x ? ctx.lineTo(x0 + x, y) : ctx.moveTo(x0 + x, y); } ctx.stroke();
      G.text(ctx, 'λ', X(P.lam), y0 - .45 * hh - 10, { s: 11, w: 900, c: cI }); if (P.dl > .0006) G.text(ctx, "λ′", X(P.lp), y0 - .9 * hh - 10, { s: 11, w: 900, c: cS }); G.text(ctx, 'طيف الكاشف عند θ', x0 + pw - 50, y0 - hh - 8, { s: 10, w: 800, c: '#0f766e' }); G.text(ctx, 'λ (nm)', x0 + pw - 16, y0 + 11, { s: 9, mono: 1, c: '#64748b' }); }
    if (on('lbl')) G.text(ctx, "λ′ = " + fmt(P.lp, 4) + ' nm   Δλ = ' + fmt(P.dl, 4) + ' nm', g.cx, 22, { s: 13, w: 900, mono: 1, c: '#0f766e' });
  };
  E.explain = S => { const P = phys(S); return `الفوتون يفقد جزءاً من طاقته للإلكترون فيزداد طوله الموجي بمقدار ${B_(fmt(P.dl, 4) + ' nm')} عند θ = ${S.p.th}°. الزيادة تعتمد على ${B_('زاوية الاستطارة فقط')} وأكبرها عند 180°.`; };
  E.howto = '<b>جرّب:</b> أدر الكاشف حول الهدف لتغيير زاوية الاستطارة θ، وأدر مقبض المصدر لتغيير λ الساقط، وانقر المصدر لإطلاق فوتون. قارن الموجتين λ و λ′ في الأعلى ولاحظ مخطط حفظ الزخم.';
})();

/* ======================= laser: ruby rod, flash lamp, resonator, three-level populations ======================= */
(() => {
  const E = EXPS.find(e => e.id === 'laser'); if (!E) return;
  E.controls = E.controls.concat([
    R('refl', 'انعكاسية المرآة الجزئية', 50, 99, 85, 1, '%'),
    TG('spont', 'الفوتونات التلقائية (عشوائية الاتجاه)', true, null, 'photon'),
    TG('atoms', 'ذرات الكروم داخل الياقوت', true, null, 'atom'),
    TG('lvl', 'مستويات الطاقة والتوزيع', true, null, 'energy'),
    TG('beam', 'حزمة الليزر الخارجة', true, null, 'ray'),
    TG('graph', 'شدة الحزمة مع الزمن', true, null, 'graph'),
    TG('lbl', 'التسميات والقيم', true, null, 'labels')
  ]);
  const A21 = .25;
  const geo = S => { const W = S.W || 800, H = S.H || 700; const x0 = 112, x1 = Math.max(360, W * .7), y0 = Math.max(110, H * .2), y1 = y0 + Math.max(90, H * .16); const lampY = y1 + 40; const bot = { y: Math.max(lampY + 70, H * .56) }; bot.h = Math.max(120, H - 110 - bot.y); return { W, H, x0, x1, y0, y1, lampY, bot }; };
  E.setup = function (S) { S.atoms = []; for (let i = 0; i < 90; i++) S.atoms.push({ x: .03 + .94 * ((i % 18) + .5 + (Math.random() - .5) * .6) / 18, y: .08 + .84 * (Math.floor(i / 18) + .5 + (Math.random() - .5) * .6) / 5, st: 0 }); S.ph = []; S.out = 0; S.tilt = 0; S.flash = 0; S.bh = []; S.acc = 0; S.nStim = 0; S.nFlash = 0; };
  E.update = function (S, dt) {
    const p = S.p, g = geo(S); dt = Math.min(dt, .04); const asp = (g.x1 - g.x0) / (g.y1 - g.y0); const V = 1.3;
    const pr = (p.pump / 100 * 1.8 + (S.flash > 0 ? 9 : 0)) * dt; if (S.flash > 0) S.flash -= dt;
    S.atoms.forEach(a => { if (a.st === 0 && Math.random() < pr) a.st = 2; else if (a.st === 2 && Math.random() < dt * 9) a.st = 1; else if (a.st === 1 && Math.random() < dt * A21) { a.st = 0; const ang = Math.random() < .12 ? (Math.random() < .5 ? 0 : Math.PI) : Math.random() * TAU; S.ph.push({ x: a.x, y: a.y, dx: Math.cos(ang), dy: Math.sin(ang) * asp, st: false }); } });
    const tl = Math.tan(2 * rad(S.tilt)) * asp;
    S.ph.forEach(q => { q.x += q.dx * dt * V; q.y += q.dy * dt * V; const axial = Math.abs(q.dy) < .05;
      for (const a of S.atoms) { if (a.st === 2 || Math.abs(a.x - q.x) > .012 || Math.abs(a.y - q.y) > .05) continue; if (a.st === 1 && Math.random() < .3) { a.st = 0; S.ph.push({ x: q.x, y: q.y, dx: q.dx, dy: q.dy, st: true }); S.nStim++; break; } if (a.st === 0 && Math.random() < .3) { a.st = 1; q.dead = 1; break; } }
      if (q.x < 0) { if (Math.abs(q.y - .5) < .5) { q.x = 0; q.dx = Math.abs(q.dx); q.dy += tl; } }
      if (q.x > 1 && !q.gone) { if (p.mirr && Math.random() < p.refl / 100) { q.x = 1; q.dx = -Math.abs(q.dx); } else { q.gone = 1; if (axial || Math.abs(q.dy) < .2) S.out += 1; } } });
    S.ph = S.ph.filter(q => !q.dead && !q.gone && q.x > -.05 && q.x < 1.05 && q.y > -.02 && q.y < 1.02); if (S.ph.length > 320) S.ph.splice(0, S.ph.length - 320);
    S.out *= Math.exp(-dt * 2); S.acc += dt; if (S.acc > .1) { S.acc = 0; S.bh.push([S.t, clamp(S.out / 4, 0, 1.2)]); if (S.bh.length > 150) S.bh.shift(); }
  };
  E.pointer = null;
  E.drags = S => { const g = geo(S), L = []; const cy = (g.y0 + g.y1) / 2;
    L.push({ id: 'lamp', x: (g.x0 + g.x1) / 2, y: g.lampY, w: g.x1 - g.x0, h: 26, hint: true, tip: 'انقر المصباح الوميضي لإطلاق ومضة ضخ قوية', idle: 'انقر مصباح الضخ ⚡', click: S => { S.flash = .35; S.nFlash++; } });
    L.push(ATM.knobObj(S, 'kPump', g.x0 - 20, g.lampY + 62, 16, 'pump', 'أدر مقبض قدرة الضخ المستمر'));
    L.push({ id: 'mL', x: g.x0 - 14, y: cy, w: 16, h: g.y1 - g.y0 + 20, axis: 'y', tip: 'اسحب لأعلى/أسفل لإمالة المرآة العاكسة كلياً', drag: (S, d) => { S.tilt = clamp(S.tilt - d.dy * .02, -3, 3); }, click: S => { S.tilt = 0; } });
    L.push({ id: 'mR', x: g.x1 + 14, y: cy, w: 16, h: g.y1 - g.y0 + 20, hint: false, tip: 'انقر لإزالة/تركيب المرآتين — العجلة تغيّر الانعكاسية', click: S => setParam(S, 'mirr', !S.p.mirr), wheel: (S, s) => setParam(S, 'refl', S.p.refl + s * 2) });
    L.push({ id: 'rod', x: (g.x0 + g.x1) / 2, y: cy, w: g.x1 - g.x0 - 20, h: g.y1 - g.y0, hint: false, tip: 'انقر ذرة لإثارتها إلى المستوى شبه المستقر', click: (S, x, y) => { const u = (x - g.x0) / (g.x1 - g.x0), v = (y - g.y0) / (g.y1 - g.y0); let b = null, bd = 1e9; S.atoms.forEach(a => { const d = Math.hypot((a.x - u) * 5, a.y - v); if (d < bd && a.st === 0) { bd = d; b = a; } }); if (b) { b.st = 1; S.nClickA = (S.nClickA || 0) + 1; } } });
    return L; };
  E.draw = function (ctx, w, h, S) {
    G.bg(ctx, w, h); const g = geo(S), p = S.p, on = k => ATM.on(S, k); const cy = (g.y0 + g.y1) / 2, RW = g.x1 - g.x0, RH = g.y1 - g.y0;
    const n1 = S.atoms.filter(a => a.st === 0).length, n2 = S.atoms.filter(a => a.st === 1).length, n3 = S.atoms.filter(a => a.st === 2).length; const inv = n2 > n1;
    // rod
    const gr = ctx.createLinearGradient(0, g.y0, 0, g.y1); gr.addColorStop(0, 'rgba(244,63,94,.35)'); gr.addColorStop(.5, 'rgba(190,18,60,.22)'); gr.addColorStop(1, 'rgba(244,63,94,.35)'); ctx.fillStyle = gr; rr(ctx, g.x0, g.y0, RW, RH, 12); ctx.fill(); ctx.strokeStyle = 'rgba(251,113,133,.7)'; ctx.lineWidth = 1.5; rr(ctx, g.x0, g.y0, RW, RH, 12); ctx.stroke();
    if (on('lbl')) G.text(ctx, 'قضيب الياقوت (الوسط الفعال)', (g.x0 + g.x1) / 2, g.y0 - 14, { s: 12, w: 800, c: '#fda4af' });
    // mirrors
    ctx.save(); ctx.translate(g.x0 - 14, cy); ctx.rotate(rad(S.tilt) * 4); ctx.fillStyle = p.mirr ? '#e5e7eb' : 'rgba(229,231,235,.2)'; ctx.fillRect(-5, -RH / 2 - 12, 10, RH + 24); ctx.fillStyle = '#64748b'; ctx.fillRect(-9, -RH / 2 - 12, 4, RH + 24); ctx.restore();
    ctx.fillStyle = p.mirr ? 'rgba(229,231,235,' + (.25 + p.refl / 140) + ')' : 'rgba(229,231,235,.12)'; ctx.fillRect(g.x1 + 9, cy - RH / 2 - 12, 10, RH + 24);
    if (on('lbl')) { G.text(ctx, 'عاكسة كلياً', g.x0 - 14, g.y1 + 22, { s: 10, w: 800, c: '#cbd5e1' }); G.text(ctx, p.mirr ? 'عاكسة جزئياً ' + p.refl + '%' : 'بلا مرآتين', g.x1 + 14, g.y1 + 22, { s: 10, w: 800, c: '#cbd5e1' }); if (Math.abs(S.tilt) > .05) G.text(ctx, 'ميل المرآة ' + fmt(S.tilt, 2) + '° — الفوتونات تهرب من الجوانب', g.x0 + 150, g.y0 - 34, { s: 11, w: 800, c: '#fca5a5' }); }
    // flash lamp
    const fl = S.flash > 0 ? 1 : p.pump / 100; ctx.strokeStyle = `rgba(254,240,138,${.25 + fl * .75})`; ctx.lineWidth = 4; ctx.beginPath(); for (let x = g.x0 + 10; x <= g.x1 - 10; x += 3) ctx.lineTo(x, g.lampY + Math.sin(x / 7) * 7); ctx.stroke(); if (S.flash > 0) G.glow(ctx, (g.x0 + g.x1) / 2, g.lampY, RW * .5, 'rgba(254,249,195,A)', .5);
    if (fl > .05) for (let k = 0; k < 6; k++) { const x = g.x0 + RW * (k + .5) / 6; G.arrow(ctx, x, g.lampY - 10, x, g.y1 + 4, `rgba(250,204,21,${.3 + fl * .6})`, 2 + fl * 2, 8); }
    if (on('lbl')) G.text(ctx, 'مصباح الضخ الوميضي (انقره)', (g.x0 + g.x1) / 2, g.lampY + 20, { s: 11, w: 800, c: '#fef08a' });
    ATM.knob(ctx, g.x0 - 20, g.lampY + 62, 16, p.pump / 100, 'قدرة الضخ', p.pump + '%');
    // atoms & photons
    const X = u => g.x0 + u * RW, Y = v => g.y0 + v * RH;
    if (on('atoms')) S.atoms.forEach(a => { ctx.fillStyle = a.st === 1 ? '#f87171' : a.st === 2 ? '#c084fc' : '#64748b'; ctx.beginPath(); ctx.arc(X(a.x), Y(a.y), a.st ? 4.2 : 3.2, 0, TAU); ctx.fill(); if (a.st === 1) { ctx.strokeStyle = 'rgba(248,113,113,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(X(a.x), Y(a.y), 7, 0, TAU); ctx.stroke(); } });
    S.ph.forEach(q => { const axial = Math.abs(q.dy) < .05; if (!axial && !on('spont')) return; const a = Math.atan2(q.dy / ((g.x1 - g.x0) / RH), q.dx); const x = X(q.x), y = Y(q.y); if (axial) { ctx.strokeStyle = '#ff1f3d'; ctx.lineWidth = 2; ctx.beginPath(); for (let s = -8; s <= 8; s++) { const xx = x + s * Math.sign(q.dx), yy = y + Math.sin(s * .9 + S.t * 20) * 2.5; s === -8 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke(); } else { ctx.strokeStyle = 'rgba(255,150,150,.55)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - Math.cos(a) * 6, y - Math.sin(a) * 6); ctx.lineTo(x + Math.cos(a) * 6, y + Math.sin(a) * 6); ctx.stroke(); } });
    // output beam
    const beam = clamp(S.out / 4, 0, 1); if (on('beam') && beam > .02) { const bx = g.x1 + 20; const gb = ctx.createLinearGradient(bx, 0, g.W, 0); gb.addColorStop(0, `rgba(255,30,60,${beam})`); gb.addColorStop(1, `rgba(255,30,60,${beam * .5})`); ctx.fillStyle = gb; ctx.fillRect(bx, cy - 4, g.W - bx, 8); G.glow(ctx, g.W - 12, cy, 30, 'rgba(255,30,60,A)', beam); if (on('lbl')) G.text(ctx, 'ليزر 694.3 nm', (bx + g.W) / 2, cy - 18, { s: 11, w: 800, c: '#fda4af' }); }
    // energy levels + populations
    const B = g.bot; if (on('lvl')) { const x0 = 96, lw = Math.min(g.W * .44, 360); ATM.box(ctx, x0 - 6, B.y - 24, lw + 12, B.h + 30, 'نظام المستويات الثلاثة (الياقوت)'); const yE1 = B.y + B.h - 22, yE2 = B.y + B.h * .42, yE3 = B.y + 22; const lx0 = x0 + 70, lx1 = x0 + lw - 70;
      [[yE3, 'E₃ (حزمة الضخ)', '#c084fc', n3], [yE2, 'E₂ شبه مستقر', '#f87171', n2], [yE1, 'E₁ الأرضي', '#94a3b8', n1]].forEach(([y, l, c, n]) => { ctx.strokeStyle = c; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(lx0, y); ctx.lineTo(lx1, y); ctx.stroke(); G.text(ctx, l, lx0 - 6, y, { s: 10, w: 800, c, a: 'right' }); const per = Math.max(1, Math.floor((lx1 - lx0) / 7)); for (let i = 0; i < n; i++) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(lx0 + 5 + (i % per) * 7, y - 6 - Math.floor(i / per) * 7, 2.8, 0, TAU); ctx.fill(); } G.text(ctx, 'N=' + n, lx1 + 6, y, { s: 11, w: 800, mono: 1, c, a: 'left' }); });
      const ax = lx1 - 40; G.arrow(ctx, ax - 70, yE1, ax - 70, yE3 + 4, '#facc15', 2, 8); G.text(ctx, 'ضخ', ax - 82, (yE1 + yE3) / 2, { s: 10, w: 800, c: '#facc15', a: 'right' }); ctx.setLineDash([3, 3]); G.arrow(ctx, ax - 40, yE3, ax - 40, yE2 - 3, '#c084fc', 1.5, 7); ctx.setLineDash([]); G.text(ctx, 'سريع', ax - 34, (yE3 + yE2) / 2, { s: 9, c: '#c084fc', a: 'left' });
      G.arrow(ctx, ax, yE2, ax, yE1 - 3, '#ff1f3d', 2.5, 9); ATM.wig(ctx, ax + 6, (yE1 + yE2) / 2, ax + 40, (yE1 + yE2) / 2, 8, '#ff1f3d', 3, S.t * 10, 1.8); G.text(ctx, inv ? 'توزيع معكوس N₂ > N₁ ✓' : 'لا يوجد توزيع معكوس', x0 + lw / 2, B.y + B.h + 2, { s: 12, w: 900, c: inv ? '#86efac' : '#fca5a5' }); }
    if (on('graph')) { const gx = Math.max(96 + Math.min(g.W * .44, 360) + 30, g.W * .56), gw = g.W - 24 - gx; if (gw > 120) { ATM.box(ctx, gx - 6, B.y - 24, gw + 12, B.h + 30, 'شدة حزمة الليزر'); const y0 = B.y + B.h - 8, hh = B.h - 24; ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, y0 - hh); ctx.lineTo(gx, y0); ctx.lineTo(gx + gw, y0); ctx.stroke(); ctx.strokeStyle = '#ff1f3d'; ctx.lineWidth = 2; ctx.beginPath(); S.bh.forEach(([t, v], i) => { const x = gx + i / 150 * gw, y = y0 - Math.min(1.1, v) * hh * .85; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke();
      G.text(ctx, 'انبعاثات محفزة: ' + S.nStim, gx + gw / 2, B.y + 4, { s: 10, w: 800, c: '#94a3b8' }); } }
    if (on('lbl')) ATM.legend(ctx, g.W - 20, 22, [['#64748b', 'ذرة في E₁', 'dot'], ['#f87171', 'مثارة E₂', 'dot'], ['#ff1f3d', 'فوتون محفز', 'wave'], ['rgba(255,150,150,.8)', 'تلقائي', 'line']]);
  };
  E.readings = function (S) { const n2 = S.atoms.filter(a => a.st === 1).length, n1 = S.atoms.filter(a => a.st === 0).length; return [rd('ذرات في المستوى شبه المستقر N₂', n2 + ''), rd('ذرات في المستوى الأرضي N₁', n1 + ''), rd('توزيع معكوس؟', n2 > n1 ? 'نعم' : 'لا'), rd('شدة حزمة الليزر', Math.round(clamp(S.out / 4, 0, 1) * 100) + ' %'), rd('طول موجة ليزر الياقوت', '694.3 nm'), rd('طاقة الفوتون', fmt(1240 / 694.3, 3, 'eV'))]; };
  E.explain = S => { const n2 = S.atoms.filter(a => a.st === 1).length, n1 = S.atoms.filter(a => a.st === 0).length; if (!S.p.mirr) return 'بدون المرآتين تخرج الفوتونات من القضيب بعد مرور واحد فلا يحدث تضخيم كافٍ.'; if (Math.abs(S.tilt) > .3) return 'المرآة مائلة: الفوتونات المنعكسة تنحرف وتخرج من جوانب القضيب فيتوقف التضخيم. انقر المرآة لإرجاعها.'; return n2 > n1 ? `${B_('توزيع معكوس')} (N₂ = ${n2} > N₁ = ${n1}): الفوتون يحفز ذرة مثارة على بعث فوتون ${B_('مماثل')} له في الطور والاتجاه، فيتضخم الضوء بين المرآتين.` : `N₂ = ${n2} أقل من N₁ = ${n1}: الذرات الأرضية ${B_('تمتص')} الفوتونات أكثر مما يُحفَّز. زد قدرة الضخ أو انقر المصباح الوميضي.`; };
  E.howto = '<b>جرّب:</b> انقر المصباح الوميضي لومضة ضخ، أو أدر مقبض قدرة الضخ. انقر أي ذرة في القضيب لإثارتها. اسحب المرآة اليسرى لإمالتها (انقرها لإرجاعها)، وانقر المرآة اليمنى لإزالة المرآتين أو استعمل العجلة لتغيير انعكاسيتها.';
})();

/* ======================= binding: build a nucleus, mass defect balance, Eb/A curve ======================= */
const ELS = ['n', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U'];
const ELN = { 1: 'الهيدروجين', 2: 'الهيليوم', 3: 'الليثيوم', 4: 'البريليوم', 5: 'البورون', 6: 'الكاربون', 7: 'النتروجين', 8: 'الأوكسجين', 9: 'الفلور', 10: 'النيون', 11: 'الصوديوم', 12: 'المغنيسيوم', 13: 'الألمنيوم', 14: 'السليكون', 15: 'الفسفور', 16: 'الكبريت', 17: 'الكلور', 18: 'الأركون', 19: 'البوتاسيوم', 20: 'الكالسيوم', 26: 'الحديد', 27: 'الكوبلت', 28: 'النيكل', 29: 'النحاس', 30: 'الخارصين', 36: 'الكربتون', 47: 'الفضة', 56: 'الباريوم', 79: 'الذهب', 82: 'الرصاص', 86: 'الرادون', 88: 'الراديوم', 92: 'اليورانيوم' };
(() => {
  const E = EXPS.find(e => e.id === 'binding'); if (!E) return;
  const BL = { '1,1': 2.224, '1,2': 8.482, '2,1': 7.718, '2,2': 28.296, '3,3': 31.994, '3,4': 39.245, '4,5': 58.165, '5,5': 64.751, '5,6': 76.205, '6,6': 92.162, '6,7': 97.108, '7,7': 104.659, '7,8': 115.492, '8,8': 127.619, '8,9': 131.763, '8,10': 139.807 };
  const STABLE_L = new Set(['1,0', '1,1', '2,1', '2,2', '3,3', '3,4', '4,5', '5,5', '5,6', '6,6', '6,7', '7,7', '7,8', '8,8', '8,9', '8,10']);
  E.controls = E.controls.concat([
    TG('scale', 'الميزان: كتلة المكونات مقابل كتلة النواة', true, null, 'meter'),
    TG('curve', 'منحني طاقة الربط لكل نيوكليون', true, null, 'graph'),
    TG('flash', 'الطاقة المتحررة عند إضافة نيوكليون', true, null, 'energy'),
    TG('lbl', 'رمز النواة والتسميات', true, null, 'labels')
  ]);
  const cN = E.controls.find(c => c.k === 'nuc'); cN.on = (v, S) => { const n = NUCS.find(x => x[0] === v); if (n) { S.Z = n[2]; S.N = n[3]; } };
  const calc = (Z, N) => { const A = Z + N; const key = Z + ',' + N; const t = NUCS.find(x => x[2] === Z && x[3] === N); let M, Eb;
    if (t) { M = t[4]; Eb = (Z * PHY.mp + N * PHY.mn - M) * 931; } else if (BL[key] != null) { Eb = BL[key]; M = Z * PHY.mp + N * PHY.mn - Eb / 931; } else if (A < 2 || Z === 0 || (N === 0 && Z > 1)) { Eb = 0; M = Z * PHY.mp + N * PHY.mn; } else { Eb = Math.max(0, semf(A, Z) * A); M = Z * PHY.mp + N * PHY.mn - Eb / 931; }
    const bound = A <= 1 || Eb > 0; const Zs = A / (1.98 + .0155 * Math.pow(A, 2 / 3));
    const stable = A <= 18 ? STABLE_L.has(key) : bound && Z <= 82 && Math.abs(Z - Zs) < .9 + A * .004;
    return { Z, N, A, M, Eb, dm: Z * PHY.mp + N * PHY.mn - M, Ea: A ? Eb / A : 0, bound, stable }; };
  E.get = S => { const r = calc(S.Z, S.N); r.name = (ELN[S.Z] || ELS[S.Z] || '') + ' ' + (ELS[S.Z] || '') + '-' + r.A; return r; };
  E.setup = function (S) { const n = NUCS.find(x => x[0] === S.p.nuc) || NUCS[4]; S.Z = n[2]; S.N = n[3]; S.hold = null; S.fx = []; S.nBuild = 0; };
  const geo = S => { const W = S.W || 800, H = S.H || 700; const cx = Math.max(230, W * .3), cy = Math.max(180, H * .3); const bk = { y: cy + Math.max(150, H * .2), px: cx - 90, nx: cx + 90 }; const cv = { x: 110, y: bk.y + 104, w: W - 140 }; cv.h = Math.max(120, H - 120 - cv.y); const sc = { x: Math.min(W - 260, cx + 190), y: 60, w: 0 }; sc.w = W - 24 - sc.x; return { W, H, cx, cy, bk, cv, sc }; };
  const nucR = S => 11 * Math.cbrt(Math.max(1, S.Z + S.N)) * 1.05 + 11;
  function add(S, t, d) { const Z0 = S.Z, N0 = S.N, b0 = calc(Z0, N0).Eb; if (t === 'p') S.Z = clamp(S.Z + d, 0, 92); else S.N = clamp(S.N + d, 0, 146); if (S.Z + S.N === 0) { S.Z = Z0; S.N = N0; return; } const b1 = calc(S.Z, S.N).Eb; if (d > 0 && b1 > b0) S.fx.push({ t: 0, txt: '+' + fmt(b1 - b0, 3) + ' MeV' }); if (d < 0 && b0 > b1) S.fx.push({ t: 0, txt: 'تحتاج ' + fmt(b0 - b1, 3) + ' MeV', neg: 1 }); S.nBuild++;
    const m = NUCS.find(x => x[2] === S.Z && x[3] === S.N); if (m) setParam(S, 'nuc', m[0], false); }
  E.update = function (S, dt) { S.fx.forEach(f => f.t += dt); S.fx = S.fx.filter(f => f.t < 1.6); };
  E.pointer = null;
  E.drags = S => { const g = geo(S), L = []; const R = nucR(S);
    [['p', g.bk.px, 'بروتون'], ['n', g.bk.nx, 'نيوترون']].forEach(([t, x, nm]) => { const held = S.hold && S.hold.t === t && S.hold.src === 'b';
      L.push({ id: 'b' + t, x: held ? S.hold.x : x, y: held ? S.hold.y : g.bk.y, r: 30, axis: 'xy', tip: 'اسحب ' + nm + 'اً إلى النواة', idle: 'اسحب نيوكليوناً إلى النواة ✋', hint: t === 'p', down: S => { S.hold = { t, x, y: g.bk.y, src: 'b' }; }, drag: (S, d) => { S.hold.x = d.ox + d.x - d.sx; S.hold.y = d.oy + d.y - d.sy; }, up: S => { const h = S.hold; S.hold = null; S.nDrop = (S.nDrop || 0) + 1; if (h && Math.hypot(h.x - g.cx, h.y - g.cy) < R + 30) add(S, t, 1); }, click: S => { S.hold = null; add(S, t, 1); } });
      L.push({ id: t + 'plus', x: x + 46, y: g.bk.y + 36, r: 12, hint: false, tip: 'إضافة ' + nm, click: S => add(S, t, 1) }); L.push({ id: t + 'minus', x: x - 46, y: g.bk.y + 36, r: 12, hint: false, tip: 'إزالة ' + nm, click: S => add(S, t, -1) }); });
    const held = S.hold && S.hold.src === 'n';
    L.push({ id: 'nucleus', x: held ? S.hold.x : g.cx, y: held ? S.hold.y : g.cy, r: R, axis: 'xy', hint: false, tip: 'اسحب نيوكليوناً من النواة لإخراجه',
      down: (S, x, y) => { const bs = S._balls || []; let b = null, bd = 1e9; bs.forEach(q => { const d = Math.hypot(q[0] - x, q[1] - y); if (d < bd) { bd = d; b = q; } }); const t = b ? (b[2] ? 'p' : 'n') : 'n'; if ((t === 'p' ? S.Z : S.N) === 0 || S.Z + S.N <= 1) { S.hold = null; return; } S.hold = { t, x, y, src: 'n' }; if (t === 'p') S.Z--; else S.N--; },
      drag: (S, d) => { if (S.hold) { S.hold.x = d.x; S.hold.y = d.y; } }, up: S => { const h = S.hold; S.hold = null; if (!h) return; if (h.t === 'p') S.Z++; else S.N++; if (Math.hypot(h.x - g.cx, h.y - g.cy) > nucR(S) + 20) add(S, h.t, -1); } });
    return L; };
  E.draw = function (ctx, w, h, S) {
    G.bg(ctx, w, h); const g = geo(S), on = k => ATM.on(S, k); const r = E.get(S);
    // nucleus
    const A = S.Z + S.N, rN = 11; const R = 11 * Math.cbrt(Math.max(1, A)) * 1.05;
    if (!r.bound && A > 1) G.text(ctx, 'لا تتكون نواة مرتبطة!', g.cx, g.cy - R - 50, { s: 12, w: 800, c: '#fff', bg: '#dc2626', raw: 1 });
    setRaw(ctx, 1); ctx.fillStyle = r.stable ? 'rgba(34,197,94,.10)' : 'rgba(249,115,22,.10)'; ctx.beginPath(); ctx.arc(g.cx, g.cy, R + rN + 16, 0, TAU); ctx.fill(); setRaw(ctx, 0);
    S._balls = []; { const pts = []; for (let i = 0; i < A; i++) { const a = i * 2.39996, q = A === 1 ? 0 : R * Math.sqrt((i + .5) / A) * .92; pts.push([g.cx + Math.cos(a) * q, g.cy + Math.sin(a) * q * .95]); } const isP = i => Math.floor((i + 1) * S.Z / A) > Math.floor(i * S.Z / A); const jig = r.stable ? .4 : 1.4; for (let i = A - 1; i >= 0; i--) { const j = Math.sin(S.t * 9 + i * 1.7) * jig; ATM.nuc(ctx, pts[i][0] + j, pts[i][1] - j * .6, rN, isP(i)); S._balls.push([pts[i][0], pts[i][1], isP(i)]); } }
    // symbol card
    if (on('lbl')) { const sx = g.cx, sy = g.cy - R - 70 > 30 ? g.cy - R - 64 : 30; const sym = ELS[S.Z] || '?'; G.text(ctx, sym, sx, sy, { s: 30, w: 900, c: '#e2e8f0' }); ctx.font = '900 30px Tajawal'; const tw = ctx.measureText(sym).width; G.text(ctx, A + '', sx - tw / 2 - 4, sy - 12, { s: 14, w: 900, mono: 1, c: '#94a3b8', a: 'right' }); G.text(ctx, S.Z + '', sx - tw / 2 - 4, sy + 14, { s: 14, w: 900, mono: 1, c: '#dc2626', a: 'right' });
      G.text(ctx, (ELN[S.Z] || '') + (A > 1 || S.Z ? '' : ''), sx + tw / 2 + 10, sy - 6, { s: 13, w: 800, c: '#cbd5e1', a: 'left' }); G.text(ctx, r.stable ? 'مستقرة' : 'غير مستقرة (مشعة)', sx + tw / 2 + 10, sy + 13, { s: 11, w: 800, c: r.stable ? '#15803d' : '#c2410c', a: 'left' }); }
    // flashes
    if (on('flash')) S.fx.forEach(f => { ctx.globalAlpha = 1 - f.t / 1.6; G.text(ctx, f.txt, g.cx + R + 30, g.cy - 10 - f.t * 40, { s: 13, w: 900, c: f.neg ? '#dc2626' : '#b45309', a: 'left' }); if (!f.neg && f.t < .5) { ctx.strokeStyle = 'rgba(234,179,8,' + (1 - f.t * 2) + ')'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(g.cx, g.cy, R + 14 + f.t * 60, 0, TAU); ctx.stroke(); } ctx.globalAlpha = 1; });
    // buckets
    [['p', g.bk.px, 'بروتونات', S.Z, '#dc2626'], ['n', g.bk.nx, 'نيوترونات', S.N, '#2563eb']].forEach(([t, x, nm, n, c]) => { const y = g.bk.y; ctx.fillStyle = '#e2e8f0'; setRaw(ctx, 1); ctx.fillStyle = 'rgba(148,163,184,.25)'; ctx.beginPath(); ctx.moveTo(x - 42, y - 6); ctx.lineTo(x + 42, y - 6); ctx.lineTo(x + 32, y + 26); ctx.lineTo(x - 32, y + 26); ctx.closePath(); ctx.fill(); setRaw(ctx, 0); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.stroke();
      for (let k = 0; k < 7; k++) ATM.nuc(ctx, x - 24 + (k % 4) * 16 + (k > 3 ? 8 : 0), y - 8 - (k > 3 ? 12 : 0), 8, t === 'p'); G.text(ctx, nm + ': ' + n, x, y + 58, { s: 12, w: 800, c });
      [[-46, '−'], [46, '+']].forEach(([dx, s]) => { setRaw(ctx, 1); ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x + dx, y + 36, 11, 0, TAU); ctx.fill(); setRaw(ctx, 0); G.text(ctx, s, x + dx, y + 36, { s: 15, w: 900, c: '#fff', raw: 1 }); }); });
    if (S.hold) ATM.nuc(ctx, S.hold.x, S.hold.y, 9, S.hold.t === 'p');
    // balance (mass defect)
    if (on('scale') && g.sc.w > 180) { const s = g.sc, bx = s.x + s.w / 2, by = s.y + 50; const mSep = S.Z * PHY.mp + S.N * PHY.mn, M = r.M; const tilt = clamp((mSep - M) / Math.max(M, 1) * 60, 0, .22);
      ATM.box(ctx, s.x, s.y - 30, s.w, 212, 'النقص الكتلي'); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by + 90); ctx.lineTo(bx, by); ctx.stroke(); ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(bx - 16, by + 96); ctx.lineTo(bx + 16, by + 96); ctx.lineTo(bx, by + 84); ctx.fill();
      const L = s.w * .36, lx = bx - Math.cos(tilt) * L, ly = by + Math.sin(tilt) * L, rx = bx + Math.cos(tilt) * L, ry = by - Math.sin(tilt) * L; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry); ctx.stroke();
      [[lx, ly], [rx, ry]].forEach(([x, y]) => { ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 22, y + 34); ctx.moveTo(x, y); ctx.lineTo(x + 22, y + 34); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 26, y + 34); ctx.lineTo(x + 26, y + 34); ctx.stroke(); });
      for (let k = 0; k < Math.min(6, A); k++) ATM.nuc(ctx, lx - 16 + (k % 3) * 14, ly + 26 - Math.floor(k / 3) * 12, 6, k < Math.min(6, A) * S.Z / Math.max(1, A)); ATM.nucleus(ctx, rx, ry + 20, Math.min(S.Z, 6), Math.min(S.N, 6), 4.5);
      G.text(ctx, 'Z mH + N mn', lx, ly + 52, { s: 10, w: 800, mono: 1, c: '#94a3b8' }); G.text(ctx, fmt(mSep, 6) + ' u', lx, ly + 66, { s: 10, mono: 1, c: '#94a3b8' }); G.text(ctx, 'M النواة', rx, ry + 52, { s: 10, w: 800, c: '#94a3b8' }); G.text(ctx, fmt(M, 6) + ' u', rx, ry + 66, { s: 10, mono: 1, c: '#94a3b8' });
      G.text(ctx, 'Δm = ' + fmt(r.dm, 5) + ' u  →  Eb = ' + fmt(r.Eb, 4) + ' MeV', bx, s.y + 166, { s: 11, w: 800, mono: 1, c: '#b45309' }); }
    // Eb/A curve
    if (on('curve')) { const c = g.cv, x0 = c.x, y0 = c.y + c.h, X = a => x0 + a / 240 * c.w, Y = e => y0 - e / 9.5 * (c.h - 10); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x0, c.y); ctx.lineTo(x0, y0); ctx.lineTo(x0 + c.w, y0); ctx.stroke();
      ctx.strokeStyle = '#d97706'; ctx.lineWidth = 2; ctx.beginPath(); for (let a = 12; a <= 240; a++) { const Z = Math.round(a / (1.98 + .0155 * a ** (2 / 3))); const e = semf(a, Z); a === 12 ? ctx.moveTo(X(a), Y(e)) : ctx.lineTo(X(a), Y(e)); } ctx.stroke();
      Object.keys(BL).forEach(k => { const [z, n] = k.split(',').map(Number); ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.arc(X(z + n), Y(BL[k] / (z + n)), 3, 0, TAU); ctx.fill(); }); NUCS.forEach(n => { const a = n[2] + n[3]; const e = (n[2] * PHY.mp + n[3] * PHY.mn - n[4]) * 931 / a; ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.arc(X(a), Y(e), 3.5, 0, TAU); ctx.fill(); });
      ctx.fillStyle = '#db2777'; ctx.beginPath(); ctx.arc(X(A), Y(r.Ea), 7, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); G.text(ctx, (ELS[S.Z] || '') + '-' + A + '  ' + fmt(r.Ea, 3) + ' MeV', X(A) + (A > 180 ? -12 : 12), Y(r.Ea) - 14, { s: 11, w: 900, c: '#db2777', a: A > 180 ? 'right' : 'left' });
      for (let a = 0; a <= 240; a += 40) G.text(ctx, a + '', X(a), y0 + 12, { s: 10, mono: 1, c: '#64748b' }); for (let e = 0; e <= 9; e += 3) G.text(ctx, e + '', x0 - 10, Y(e), { s: 10, mono: 1, c: '#64748b' });
      G.text(ctx, 'العدد الكتلي A', x0 + c.w / 2, y0 + 26, { s: 11, w: 800, c: '#64748b' }); G.text(ctx, 'Eb/A (MeV)', x0 + 34, c.y - 8, { s: 11, w: 800, c: '#64748b' });
      G.text(ctx, '⁵⁶Fe الأكثر استقراراً', X(56), Y(8.8) - 14, { s: 10, w: 800, c: '#94a3b8' }); G.text(ctx, '← اندماج', X(22), Y(5.6), { s: 11, w: 800, c: '#15803d' }); G.text(ctx, 'انشطار →', X(205), Y(6.9), { s: 11, w: 800, c: '#dc2626' }); }
  };
  E.readings = function (S) { const r = E.get(S); return [rd('Z (بروتونات)', r.Z + ''), rd('N (نيوترونات)', r.N + ''), rd('A = Z + N', r.A + ''), rd('نصف القطر R = 1.2A^(1/3)', fmt(1.2 * Math.cbrt(r.A), 3, 'F')), rd('النقص الكتلي Δm', fmt(r.dm, 6, 'u')), rd('طاقة الربط Eb', fmt(r.Eb, 4, 'MeV')), rd('Eb لكل نيوكليون', fmt(r.Ea, 4, 'MeV')), rd('شحنة النواة Ze', fmtSI(r.Z * PHY.e, 'C')), rd('الاستقرار', r.stable ? 'مستقرة' : 'غير مستقرة', 1)]; };
  E.explain = S => { const r = E.get(S); if (r.A < 2) return 'نيوكليون منفرد: لا توجد طاقة ربط. أضف نيوكليونات أخرى.'; return `كتلة النواة أقل من مجموع كتل مكوناتها بمقدار ${B_(fmt(r.dm, 5) + ' u')} تحولت إلى طاقة ربط ${B_(fmt(r.Eb, 4) + ' MeV')} (${fmt(r.Ea, 3)} MeV لكل نيوكليون).` + (r.stable ? '' : ` هذه النواة ${B_('غير مستقرة')}: نسبة النيوترونات إلى البروتونات غير مناسبة.`); };
  E.howto = '<b>جرّب:</b> اسحب بروتونات (حمراء) ونيوترونات (زرقاء) من السلتين إلى النواة، أو استعمل أزرار + و −. اسحب نيوكليوناً من النواة لإخراجه. راقب الميزان (النقص الكتلي) وموقع النواة على منحني طاقة الربط.';
})();

/* ======================= decay: clickable nuclei, α/β/γ in B-field, absorbers, N(t) with time cursor ======================= */
(() => {
  const E = EXPS.find(e => e.id === 'decay'); if (!E) return;
  E.controls = E.controls.concat([
    R('Bf', 'شدة المجال المغناطيسي (نسبية)', 0, 1, .6, .05, ''),
    TG('Bshow', 'رموز المجال المغناطيسي B', true, null, 'bfield'),
    TG('tracks', 'مسارات الإشعاعات في المجال', true, null, 'ray'),
    TG('eq', 'معادلة الانحلال (نواة مكبّرة)', true, null, 'atom'),
    TG('graph', 'منحني N(t) على المسرح', true, null, 'graph'),
    TG('lbl', 'التسميات والقيم', true, null, 'labels')
  ]);
  const COL = { a: '#d97706', b: '#16a34a', g: '#9333ea' }, NMS = { a: 'α', b: 'β⁻', g: 'γ' };
  const EQ = { a: [[88, 138, 'Ra', 226], [86, 136, 'Rn', 222], '⁴₂He'], b: [[6, 8, 'C', 14], [7, 7, 'N', 14], '⁰₋₁e + ν̄'], g: [[27, 33, 'Co*', 60], [27, 33, 'Co', 60], 'γ'] };
  const ABS = [['none', 'بلا حاجز'], ['paper', 'ورقة'], ['Al', 'ألمنيوم'], ['Pb', 'رصاص']];
  const geo = S => { const W = S.W || 800, H = S.H || 700; const bx = 84, by = 58, bs = Math.min(W * .4, H * .44); const ch = { x: bx + bs + 40, y: 58, h: bs * .78 }; ch.w = W - 20 - ch.x; const gr = { x: 112, y: by + bs + 70, w: W - 140 }; gr.h = Math.max(100, H - 118 - gr.y); return { W, H, bx, by, bs, ch, gr }; };
  const base = E.setup;
  E.setup = function (S) { base.call(E, S); S.bp = []; S.absb = 'none'; S.flip = false; S.cur = null; S.ev = null; S.nClick = 0; };
  const decayOne = (S, n) => { n.d = true; S.em.push({ x: n.x, y: n.y, a: Math.random() * TAU, r: 0, type: S.p.type }); S.clicks++; if (S.bp.length < 60) S.bp.push({ s: 0, t: S.p.type, blk: false }); S.ev = { t: 0, type: S.p.type }; };
  E.update = function (S, dt) { const lam = Math.LN2 / S.p.T; S.nuc.forEach(n => { if (!n.d && Math.random() < lam * dt) decayOne(S, n); }); S.em.forEach(e => e.r += dt * (e.type === 'a' ? 120 : e.type === 'b' ? 240 : 400)); S.em = S.em.filter(e => e.r < 600); S.acc += dt; if (S.acc > .5) { S.acc = 0; S.hist.push([S.t, S.nuc.filter(n => !n.d).length]); }
    const g = geo(S); const sp = { a: 150, b: 300, g: 420 }; S.bp.forEach(q => { q.s += dt * sp[q.t]; }); S.bp = S.bp.filter(q => q.s < g.ch.w * 1.3 && !q.dead); if (S.ev) { S.ev.t += dt; if (S.ev.t > 1.5) S.ev = null; } };
  const trackPt = (S, g, t, s) => { const sx = g.ch.x + 44, sy = g.ch.y + g.ch.h / 2; const B = S.p.Bf * (S.flip ? -1 : 1); if (t === 'g' || Math.abs(B) < .01) return [sx + s, sy]; const R = (t === 'a' ? 900 : 120) / Math.abs(B); const sg = (t === 'a' ? -1 : 1) * Math.sign(B); const a = s / R; return [sx + R * Math.sin(a), sy + sg * R * (1 - Math.cos(a))]; };
  const blocks = (S, t) => { const b = S.absb; if (b === 'none') return false; if (t === 'a') return true; if (t === 'b') return b !== 'paper'; return b === 'Pb'; };
  const absX = g => g.ch.x + 44 + 60;
  E.pointer = null;
  E.drags = S => { const g = geo(S), L = [];
    L.push({ id: 'sample', x: g.bx + g.bs / 2, y: g.by + g.bs / 2, w: g.bs, h: g.bs, hint: true, tip: 'انقر نواة لتنحل فوراً', idle: 'انقر أي نواة لتنحل ☢', click: (S, x, y) => { let b = null, bd = 1e9; S.nuc.forEach(n => { if (n.d) return; const d = Math.hypot(g.bx + n.x * g.bs - x, g.by + n.y * g.bs - y); if (d < bd) { bd = d; b = n; } }); if (b && bd < 14) { decayOne(S, b); S.nClick++; } } });
    ['a', 'b', 'g'].forEach((t, i) => L.push({ id: 'type_' + t, x: g.ch.x + 30 + i * 62, y: g.ch.y - 26 + 14, w: 56, h: 26, hint: false, tip: 'نوع الانحلال', click: S => { setParam(S, 'type', t); S.bp = []; } }));
    L.push({ id: 'chamber', x: g.ch.x + g.ch.w / 2 + 30, y: g.ch.y + g.ch.h / 2, w: g.ch.w - 80, h: g.ch.h, hint: false, tip: 'انقر لعكس اتجاه المجال — العجلة تغيّر شدته', click: S => { S.flip = !S.flip; }, wheel: (S, s) => setParam(S, 'Bf', S.p.Bf + s * .05) });
    ABS.forEach(([k], i) => L.push({ id: 'abs_' + k, x: g.ch.x + 36 + i * 64, y: g.ch.y + g.ch.h + 26, w: 58, h: 30, hint: false, tip: 'ضع هذا الحاجز أمام المصدر', click: S => { S.absb = k; S.nAbs = (S.nAbs || 0) + 1; } }));
    L.push(ATM.knobObj(S, 'kT', g.ch.x + g.ch.w - 30, g.ch.y + g.ch.h + 64, 16, 'T', 'أدر لتغيير عمر النصف T½'));
    if (ATM.on(S, 'graph')) { const tm = Math.max(S.t, S.p.T * 4), c = S.cur == null ? Math.min(S.t, S.p.T) : S.cur; L.push({ id: 'tcur', x: g.gr.x + c / tm * g.gr.w, y: g.gr.y + 10, r: 12, axis: 'x', tip: 'اسحب مؤشر الزمن لقراءة N عند أي لحظة', drag: (S, d) => { S.cur = clamp((d.ox + d.x - d.sx - g.gr.x) / g.gr.w * tm, 0, tm); } }); }
    return L; };
  E.draw = function (ctx, w, h, S) {
    G.bg(ctx, w, h); const g = geo(S), p = S.p, on = k => ATM.on(S, k); const col = COL[p.type];
    // sample
    ATM.box(ctx, g.bx - 6, g.by - 6, g.bs + 12, g.bs + 12); const left = S.nuc.filter(n => !n.d).length;
    S.nuc.forEach(n => { const x = g.bx + n.x * g.bs, y = g.by + n.y * g.bs; if (n.d) { ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.arc(x, y, 3.2, 0, TAU); ctx.fill(); } else { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 4.2, 0, TAU); ctx.fill(); } });
    S.em.forEach(e => { if (e.r > 60) return; const x = g.bx + e.x * g.bs + Math.cos(e.a) * e.r * .3, y = g.by + e.y * g.bs + Math.sin(e.a) * e.r * .3; ctx.fillStyle = COL[e.type]; ctx.beginPath(); ctx.arc(x, y, 2.4, 0, TAU); ctx.fill(); });
    if (on('lbl')) { G.text(ctx, 'العينة المشعة: ' + left + ' / ' + S.N0 + ' نواة', g.bx + g.bs, g.by + g.bs + 20, { s: 12, w: 800, c: '#cbd5e1', a: 'right' }); G.text(ctx, 't = ' + fmt(S.t, 3) + ' s', g.bx, g.by + g.bs + 20, { s: 12, w: 800, mono: 1, c: '#cbd5e1', a: 'left' }); }
    // type tabs
    ['a', 'b', 'g'].forEach((t, i) => ATM.btn(ctx, g.ch.x + 2 + i * 62, g.ch.y - 25, 56, 26, NMS[t] + (t === 'a' ? ' ألفا' : t === 'b' ? ' بيتا' : ' كاما'), p.type === t, COL[t], 12));
    // chamber
    const C = g.ch; ATM.box(ctx, C.x, C.y + 6, C.w, C.h); if (on('Bshow') && p.Bf > .01) { const sp = 30; ctx.strokeStyle = 'rgba(37,99,235,' + (.2 + p.Bf * .45) + ')'; ctx.fillStyle = ctx.strokeStyle; ctx.lineWidth = 1.4; for (let x = C.x + 60; x < C.x + C.w - 6; x += sp) for (let y = C.y + 22; y < C.y + C.h; y += sp) { if (S.flip) { ctx.beginPath(); ctx.arc(x, y, 2.4, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(x, y, 6, 0, TAU); ctx.stroke(); } else { ctx.beginPath(); ctx.moveTo(x - 4, y - 4); ctx.lineTo(x + 4, y + 4); ctx.moveTo(x + 4, y - 4); ctx.lineTo(x - 4, y + 4); ctx.stroke(); } } G.text(ctx, 'B ' + (S.flip ? '⊙ خارج من الصفحة' : '⊗ داخل الصفحة'), C.x + C.w - 10, C.y + 18, { s: 11, w: 800, c: '#2563eb', a: 'right' }); }
    const sx = C.x + 44, sy = C.y + C.h / 2; ctx.fillStyle = '#475569'; rr(ctx, C.x + 6, sy - 26, 40, 52, 4); ctx.fill(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(C.x + 30, sy, 5, 0, TAU); ctx.fill(); ctx.fillStyle = '#1e293b'; ctx.fillRect(C.x + 30, sy - 3, 16, 6); if (on('lbl')) G.text(ctx, 'رصاص', C.x + 26, sy + 38, { s: 10, w: 800, c: '#94a3b8' });
    const ax = absX(g); if (S.absb !== 'none') { const ac = { paper: '#f5f5f4', Al: '#a8a29e', Pb: '#334155' }[S.absb]; setRaw(ctx, 1); ctx.fillStyle = ac; ctx.fillRect(ax - (S.absb === 'paper' ? 2 : S.absb === 'Al' ? 4 : 8), sy - 46, S.absb === 'paper' ? 4 : S.absb === 'Al' ? 8 : 16, 92); setRaw(ctx, 0); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.strokeRect(ax - (S.absb === 'paper' ? 2 : S.absb === 'Al' ? 4 : 8), sy - 46, S.absb === 'paper' ? 4 : S.absb === 'Al' ? 8 : 16, 92); }
    const blk = blocks(S, p.type); const smax = C.w * 1.2;
    const inside = ([x, y]) => x < C.x + C.w - 4 && y > C.y + 8 && y < C.y + C.h + 4;
    if (on('tracks')) { ctx.strokeStyle = col; ctx.globalAlpha = .45; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); let st = 0; for (let s = 0; s < smax; s += 4) { const pt = trackPt(S, g, p.type, s); if (!inside(pt) || (blk && pt[0] > ax - 4 && !(p.type === 'g' && s < 0))) break; st++ ? ctx.lineTo(pt[0], pt[1]) : ctx.moveTo(pt[0], pt[1]); } ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; }
    S.bp.forEach(q => { const pt = trackPt(S, g, q.t, q.s); if (!inside(pt)) { q.dead = 1; return; } if (blocks(S, q.t) && pt[0] > ax - 3) { if (q.t === 'g' && (q.pass == null ? (q.pass = Math.random() < .2) : q.pass)) { } else { q.dead = 1; return; } } if (q.t === 'g') ATM.photon(ctx, pt[0], pt[1], 0, COL.g, 20, 5, S.t * 20, 3); else { ctx.fillStyle = COL[q.t]; ctx.beginPath(); ctx.arc(pt[0], pt[1], q.t === 'a' ? 5 : 3, 0, TAU); ctx.fill(); if (q.t === 'a') G.text(ctx, '+', pt[0], pt[1], { s: 8, w: 900, c: '#fff', raw: 1 }); } });
    if (on('lbl')) { const end = (() => { let last = trackPt(S, g, p.type, 0); for (let s = 0; s < smax; s += 4) { const pt = trackPt(S, g, p.type, s); if (!inside(pt) || (blk && pt[0] > ax - 4)) break; last = pt; } return last; })(); G.text(ctx, NMS[p.type] + (blk ? ' (توقف)' : ''), clamp(end[0] - 10, C.x + 60, C.x + C.w - 40), clamp(end[1] + (p.type === 'b' ? -14 : 14), C.y + 26, C.y + C.h - 6), { s: 14, w: 900, c: col }); }
    // absorber tray + knob
    ABS.forEach(([k, l], i) => ATM.btn(ctx, g.ch.x + 7 + i * 64, g.ch.y + g.ch.h + 11, 58, 30, l, S.absb === k, '#475569', 11));
    ATM.knob(ctx, g.ch.x + g.ch.w - 30, g.ch.y + g.ch.h + 64, 16, (p.T - 2) / 28, '', 'T½ = ' + p.T + ' s'); G.text(ctx, 'عمر النصف', g.ch.x + g.ch.w - 60, g.ch.y + g.ch.h + 64, { s: 11, w: 800, c: '#94a3b8', a: 'right' });
    // equation inset
    if (on('eq') && g.gr.y - (g.ch.y + g.ch.h + 50) > 50) { const [a1, a2, par] = EQ[p.type]; const iy = g.ch.y + g.ch.h + 64, ix = g.ch.x + 20; const k = S.ev ? Math.min(1, S.ev.t / .8) : 1;
      const done = !!S.ev; ATM.nucleus(ctx, ix + 16, iy, done ? a2[0] > 20 ? 8 : a2[0] : a1[0] > 20 ? 8 : a1[0], done ? a2[1] > 20 ? 9 : a2[1] : a1[1] > 20 ? 9 : a1[1], 5, S.t, done ? 0 : .6);
      const lab = done ? `${a2[3]}${a2[2]}` : `${a1[3]}${a1[2]}`; G.text(ctx, lab.replace(/^(\d+)/, m => m.split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('')), ix + 16, iy + 30, { s: 12, w: 900, c: '#cbd5e1' });
      if (done) { const px = ix + 40 + k * 70; if (p.type === 'a') ATM.nucleus(ctx, px, iy, 2, 2, 5); else if (p.type === 'b') { ctx.fillStyle = COL.b; ctx.beginPath(); ctx.arc(px, iy, 4, 0, TAU); ctx.fill(); } else ATM.photon(ctx, px, iy, 0, COL.g, 26, 6, S.t * 20, 3); }
      if (on('lbl')) { const eqs = { a: '²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He', b: '¹⁴₆C → ¹⁴₇N + ⁰₋₁e + ν̄', g: '⁶⁰Co* → ⁶⁰Co + γ' }[p.type]; G.text(ctx, eqs, ix + 130, iy + 30, { s: 12, w: 800, c: col, a: 'left' }); } }
    // N(t) graph
    if (on('graph')) { const R2 = g.gr, x0 = R2.x, y0 = R2.y + R2.h; const tm = Math.max(S.t, p.T * 4); const X = t => x0 + t / tm * R2.w, Y = n => y0 - n / (S.N0 * 1.05) * (R2.h - 16); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x0, R2.y); ctx.lineTo(x0, y0); ctx.lineTo(x0 + R2.w, y0); ctx.stroke();
      [1, 2, 3, 4].forEach(k => { if (k * p.T > tm) return; ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(100,116,139,.5)'; ctx.beginPath(); ctx.moveTo(X(k * p.T), y0); ctx.lineTo(X(k * p.T), Y(S.N0 / 2 ** k)); ctx.lineTo(x0, Y(S.N0 / 2 ** k)); ctx.stroke(); ctx.setLineDash([]); G.text(ctx, k + 'T½', X(k * p.T), y0 + 12, { s: 10, mono: 1, c: '#64748b' }); G.text(ctx, 'N₀/' + 2 ** k, x0 - 6, Y(S.N0 / 2 ** k), { s: 9, mono: 1, c: '#64748b', a: 'right' }); });
      ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 100; i++) { const t = tm * i / 100; const y = Y(S.N0 * Math.pow(.5, t / p.T)); i ? ctx.lineTo(X(t), y) : ctx.moveTo(X(t), y); } ctx.stroke();
      ctx.fillStyle = '#e11d48'; S.hist.forEach(([t, n]) => { ctx.beginPath(); ctx.arc(X(t), Y(n), 2.6, 0, TAU); ctx.fill(); });
      const c = S.cur == null ? Math.min(S.t, p.T) : S.cur; const nt = S.N0 * Math.pow(.5, c / p.T); ctx.strokeStyle = '#0f766e'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X(c), R2.y + 18); ctx.lineTo(X(c), y0); ctx.stroke(); ctx.fillStyle = '#0f766e'; ctx.beginPath(); ctx.arc(X(c), R2.y + 10, 7, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(X(c), Y(nt), 4.5, 0, TAU); ctx.fill();
      G.text(ctx, `t = ${fmt(c, 3)} s  →  N = N₀(½)^(t/T½) = ${fmt(nt, 4)}`, clamp(X(c), x0 + 150, x0 + R2.w - 150), R2.y - 6, { s: 11, w: 800, mono: 1, c: '#0f766e' });
      G.text(ctx, 'N', x0 - 14, R2.y + 4, { s: 12, w: 900, c: '#64748b' }); G.text(ctx, 't (s)', x0 + R2.w, y0 + 24, { s: 10, mono: 1, c: '#64748b' }); ATM.legend(ctx, x0 + R2.w, R2.y + 20, [['#2563eb', 'النظري', 'line'], ['#e11d48', 'المقيس', 'dot']]); }
  };
  const r0 = E.readings; E.readings = function (S) { const left = S.nuc.filter(n => !n.d).length; return r0.call(this, S).concat([rd('النشاط الإشعاعي A = λN', fmt(Math.LN2 / S.p.T * left, 3, 'Bq')), rd('الحاجز أمام المصدر', ABS.find(a => a[0] === S.absb)[1])]); };
  E.explain = S => { const t = S.p.type; const b = S.absb; let s = `الانحلال عشوائي: لا نعرف أي نواة ستنحل، لكن ${B_('نصف')} النوى تقريباً ينحل خلال كل عمر نصف (${S.p.T} s). `; s += t === 'a' ? 'جسيمات ألفا موجبة وثقيلة فتنحرف قليلاً في المجال' : t === 'b' ? 'جسيمات بيتا سالبة وخفيفة فتنحرف كثيراً وبعكس ألفا' : 'أشعة كاما فوتونات متعادلة فلا تنحرف في المجال'; if (b !== 'none') s += blocks(S, t) ? `، ويوقفها حاجز ${B_(ABS.find(a => a[0] === b)[1])}.` : `، وتنفذ من حاجز ${ABS.find(a => a[0] === b)[1]}.`; else s += '.'; return s; };
  E.howto = '<b>جرّب:</b> انقر أي نواة في العينة لتنحل فوراً. اختر نوع الانحلال من الأزرار فوق حجرة المجال، وانقر الحجرة لعكس اتجاه B (العجلة تغيّر شدته). ضع ورقة أو ألمنيوم أو رصاصاً أمام المصدر لمقارنة قابلية النفاذ. أدر مقبض عمر النصف، واسحب مؤشر الزمن على المنحني.';
})();

/* ======================= fission: neutron gun, control rods, moderator, chain reaction; D–T fusion ======================= */
(() => {
  const E = EXPS.find(e => e.id === 'fission'); if (!E) return;
  E.controls = E.controls.concat([
    SEL('mode', 'التفاعل', [['fis', 'انشطار'], ['fus', 'اندماج']], 'fis'),
    R('Tf', 'درجة حرارة البلازما (اندماج)', 1, 200, 30, 1, 'MK'),
    TG('mod', 'المهدئ (إبطاء النيوترونات)', true, null, 'slow'),
    TG('neu', 'النيوترونات', true, null, 'dot'),
    TG('frag', 'نواتج الانشطار (Ba و Kr)', true, null, 'atom'),
    TG('flash', 'ومضات الطاقة المتحررة', true, null, 'energy'),
    TG('lbl', 'التسميات ومعادلة التفاعل', true, null, 'labels')
  ]);
  const cMode = E.controls.find(c => c.k === 'mode'); cMode.on = (v, S, init) => { if (!init) reset(S); };
  const geo = S => { const W = S.W || 800, H = S.H || 700; const x0 = 118, y0 = 62, x1 = W - 22, y1 = Math.max(y0 + 260, H * .68); return { W, H, x0, y0, x1, y1, cw: x1 - x0, ch: y1 - y0, gx: 90, gy: (y0 + y1) / 2 }; };
  function initX(S) { S.aim = 0; S.fr = []; S.fl = []; S.win = [0, 0]; S.wt = 0; S.k = 0; S.fus = 0; S.shots = 0; S.pl = [];
    if (S.p.mode === 'fus') { S.U = []; for (let i = 0; i < 44; i++) S.pl.push({ x: Math.random() * .9 + .05, y: Math.random() * .9 + .05, a: Math.random() * TAU, t: i % 2 ? 'T' : 'D' }); } }
  function reset(S) { S.U = []; for (let i = 0; i < 17; i++) for (let j = 0; j < 11; j++) S.U.push({ x: .08 + i * .053 + (j % 2) * .02, y: .06 + j * .088, f: false }); S.neu = []; S.fis = 0; S.En = 0; S.hist = []; S.acc = 0; S.t = 0; initX(S); }
  E.setup = function (S) { reset(S); };
  E.controls[1].btns[0].on = S => fire(S); E.controls[1].btns[1].on = S => reset(S);
  function fire(S, tx, ty) { const g = geo(S); if (S.p.mode === 'fus') { S.pl.push({ x: .5, y: .5, a: Math.random() * TAU, t: Math.random() < .5 ? 'D' : 'T' }); return; } if (tx != null) S.aim = Math.atan2(ty - g.gy, tx - g.gx); const a = S.aim; S.neu.push({ x: (g.gx + 26 * Math.cos(a) - g.x0) / g.cw, y: (g.gy + 26 * Math.sin(a) - g.y0) / g.ch, vx: Math.cos(a) * .2, vy: Math.sin(a) * .2 * g.cw / g.ch, slow: 1 }); S.shots++; }
  const NR = 5, rodX = k => .18 + k * .16;
  E.update = function (S, dt) {
    const g = geo(S), p = S.p; dt = Math.min(dt, .04); const asp = g.cw / g.ch;
    if (p.mode === 'fus') { const v = Math.sqrt(p.Tf) * .03; S.pl.forEach(q => { q.a += (Math.random() - .5) * dt * 3; q.x += Math.cos(q.a) * v * dt; q.y += Math.sin(q.a) * v * dt * asp; if (q.x < .02 || q.x > .98) { q.a = Math.PI - q.a; q.x = clamp(q.x, .02, .98); } if (q.y < .03 || q.y > .97) { q.a = -q.a; q.y = clamp(q.y, .03, .97); } });
      const pr = Math.exp(-150 / Math.max(1, p.Tf)); for (let i = 0; i < S.pl.length; i++) { const a = S.pl[i]; if (a.t !== 'D') continue; for (let j = 0; j < S.pl.length; j++) { const b = S.pl[j]; if (b.t !== 'T' || b.dead || a.dead) continue; if (Math.abs(a.x - b.x) < .02 && Math.abs(a.y - b.y) < .02 * asp) { if (Math.random() < pr) { a.dead = b.dead = 1; S.fus++; S.En += 17.6; S.fl.push({ x: a.x, y: a.y, t: 0, txt: '17.6 MeV' }); S.fr.push({ x: a.x, y: a.y, a: Math.random() * TAU, t: 0, he: 1 }); const an = Math.random() * TAU; S.neu.push({ x: a.x, y: a.y, vx: Math.cos(an) * .45, vy: Math.sin(an) * .45 * asp, slow: 0 }); } } } }
      S.pl = S.pl.filter(q => !q.dead); }
    const ab = p.ctrl / 100;
    S.neu.forEach(n => { if (p.mode === 'fis' && p.mod && !n.slow) { n.vx *= Math.exp(-dt * 3); n.vy *= Math.exp(-dt * 3); if (Math.hypot(n.vx, n.vy / asp) < .2) n.slow = 1; }
      n.x += n.vx * dt; n.y += n.vy * dt;
      if (p.mode === 'fis') { for (let k = 0; k < NR; k++) if (Math.abs(n.x - rodX(k)) < 16 / g.cw && n.y < ab) { n.dead = 1; S.absd = (S.absd || 0) + 1; }
        if (!n.dead) for (const u of S.U) { if (u.f || u.hit || Math.abs(u.x - n.x) > .016 || Math.abs(u.y - n.y) > .016 * asp) continue; if (Math.random() < (n.slow ? .95 : .12)) { u.hit = S.t; n.dead = 1; } break; } } });
    // U-236 wobble then split
    if (p.mode === 'fis') S.U.forEach(u => { if (u.hit && !u.f && S.t - u.hit > .25) { u.f = true; u.ft = S.t; S.fis++; S.En += 200; S.win[1]++; const a = Math.random() * TAU; u.fa = a; S.fr.push({ x: u.x, y: u.y, a, t: 0 }); S.fl.push({ x: u.x, y: u.y, t: 0, txt: '200 MeV' }); const nn = Math.random() < .5 ? 2 : 3; for (let k = 0; k < nn; k++) { const b = Math.random() * TAU; S.neu.push({ x: u.x, y: u.y, vx: Math.cos(b) * .45, vy: Math.sin(b) * .45 * asp, slow: 0 }); } } });
    S.neu = S.neu.filter(n => !n.dead && n.x > -.02 && n.x < 1.02 && n.y > -.02 && n.y < 1.02); if (S.neu.length > 400) S.neu.splice(0, S.neu.length - 400);
    S.fr.forEach(f => f.t += dt); S.fl.forEach(f => f.t += dt); S.fl = S.fl.filter(f => f.t < 1); if (S.fr.length > 300) S.fr.splice(0, S.fr.length - 300);
    S.wt += dt; if (S.wt > 1) { S.k = S.win[0] ? S.win[1] / S.win[0] : (S.win[1] ? 9 : 0); S.win = [S.win[1], 0]; S.wt = 0; }
    S.acc += dt; if (S.acc > .2) { S.acc = 0; S.hist.push([S.t, p.mode === 'fus' ? S.fus : S.fis]); if (S.hist.length > 200) S.hist.shift(); }
  };
  E.pointer = null;
  E.drags = S => { const g = geo(S), L = [], p = S.p;
    if (p.mode === 'fis') { L.push({ id: 'core', x: (g.x0 + g.x1) / 2, y: (g.y0 + g.y1) / 2, w: g.cw, h: g.ch, hint: false, tip: 'انقر لإطلاق نيوترون نحو هذه النقطة', click: (S, x, y) => fire(S, x, y) });
      const d = g.y0 + g.ch * p.ctrl / 100; L.push({ id: 'rods', x: (g.x0 + g.cw * rodX(0) + g.x0 + g.cw * rodX(NR - 1)) / 2, y: d, w: g.cw * .64, h: 18, axis: 'y', tip: 'اسحب قضبان السيطرة إلى داخل المفاعل أو خارجه', idle: 'اسحب قضبان السيطرة ✋', drag: (S, dd) => setParam(S, 'ctrl', (dd.oy + dd.y - dd.sy - g.y0) / g.ch * 100) }); }
    else L.push({ id: 'therm', x: g.x1 - 30, y: g.y1 - 20 - (g.ch - 60) * p.Tf / 200, w: 34, h: 28, axis: 'y', tip: 'اسحب لرفع درجة حرارة البلازما', drag: (S, dd) => setParam(S, 'Tf', (g.y1 - 20 - (dd.oy + dd.y - dd.sy)) / (g.ch - 60) * 200) });
    L.push({ id: 'gun', x: g.gx + Math.cos(S.aim) * 22, y: g.gy + Math.sin(S.aim) * 22, r: 20, cx: g.gx, cy: g.gy, tip: 'أدر المدفع للتصويب — انقر لإطلاق نيوترون', idle: 'انقر لإطلاق نيوترون ✋', drag: (S, dd) => { S.aim = clamp(S.aim + dd.dang, -1.2, 1.2); }, click: S => fire(S) });
    return L; };
  E.draw = function (ctx, w, h, S) {
    G.bg(ctx, w, h); const g = geo(S), p = S.p, on = k => ATM.on(S, k); const X = x => g.x0 + x * g.cw, Y = y => g.y0 + y * g.ch;
    // core vessel
    setRaw(ctx, 1); ctx.fillStyle = p.mode === 'fus' ? 'rgba(251,146,60,' + (.04 + p.Tf / 200 * .16) + ')' : p.mod ? 'rgba(59,130,246,.08)' : 'rgba(148,163,184,.05)'; rr(ctx, g.x0, g.y0, g.cw, g.ch, 12); ctx.fill(); setRaw(ctx, 0); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; rr(ctx, g.x0, g.y0, g.cw, g.ch, 12); ctx.stroke();
    if (on('lbl')) G.text(ctx, p.mode === 'fus' ? 'بلازما ديوتيريوم وتريتيوم' : p.mod ? 'قلب المفاعل: وقود ²³⁵U + مهدئ (ماء ثقيل)' : 'قلب المفاعل: وقود ²³⁵U بلا مهدئ', g.x1 - 10, g.y0 - 12, { s: 12, w: 800, c: '#94a3b8', a: 'right' });
    if (p.mode === 'fis') {
      S.U.forEach(u => { const x = X(u.x), y = Y(u.y); if (!u.f) { if (u.hit) { const j = Math.sin(S.t * 60) * 2.5; ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.ellipse(x, y, 8 + j, 8 - j, 0, 0, TAU); ctx.fill(); G.text(ctx, '²³⁶U', x, y - 14, { s: 9, w: 800, c: '#15803d' }); } else { ATM.nuc(ctx, x, y, 7, true); ctx.fillStyle = 'rgba(22,163,74,.55)'; ctx.beginPath(); ctx.arc(x, y, 7, 0, TAU); ctx.fill(); } } });
      if (on('frag')) S.fr.forEach(f => { const d = Math.min(1, f.t * 1.4) * 16; const x = X(f.x), y = Y(f.y); ATM.nuc(ctx, x + Math.cos(f.a) * d, y + Math.sin(f.a) * d, 5, true); ctx.fillStyle = 'rgba(249,115,22,.6)'; ctx.beginPath(); ctx.arc(x + Math.cos(f.a) * d, y + Math.sin(f.a) * d, 5, 0, TAU); ctx.fill(); ATM.nuc(ctx, x - Math.cos(f.a) * d, y - Math.sin(f.a) * d, 4.4, false); ctx.fillStyle = 'rgba(14,165,233,.55)'; ctx.beginPath(); ctx.arc(x - Math.cos(f.a) * d, y - Math.sin(f.a) * d, 4.4, 0, TAU); ctx.fill(); });
      // control rods
      const dpt = g.ch * p.ctrl / 100; for (let k = 0; k < NR; k++) { const x = X(rodX(k)); setRaw(ctx, 1); ctx.fillStyle = 'rgba(100,116,139,.15)'; ctx.fillRect(x - 16, g.y0, 32, dpt); ctx.fillStyle = '#4b5563'; ctx.fillRect(x - 7, g.y0 - 30, 14, 30 + dpt); setRaw(ctx, 0); }
      ctx.fillStyle = '#1f2937'; ctx.fillRect(X(rodX(0)) - 14, g.y0 - 40, X(rodX(NR - 1)) - X(rodX(0)) + 28, 10); setRaw(ctx, 1); ctx.fillStyle = '#f59e0b'; rr(ctx, X(rodX(0)), g.y0 + dpt - 9, X(rodX(NR - 1)) - X(rodX(0)), 18, 6); ctx.globalAlpha = .0; ctx.fill(); ctx.globalAlpha = 1; setRaw(ctx, 0);
      for (let k = 0; k < NR; k++) { const x = X(rodX(k)); ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(x, g.y0 + dpt, 7, 0, TAU); ctx.fill(); }
      if (on('lbl')) G.text(ctx, 'قضبان السيطرة (كادميوم) ' + p.ctrl + '%', X(rodX(NR - 1)) + 20, g.y0 - 30, { s: 11, w: 800, c: '#374151', a: 'left' });
    } else {
      S.pl.forEach(q => { const x = X(q.x), y = Y(q.y); ATM.nucleus(ctx, x, y, 1, q.t === 'D' ? 1 : 2, 4.5); });
      if (on('frag')) S.fr.forEach(f => { if (f.t > 3) return; const d = f.t * 30; ATM.nucleus(ctx, X(f.x) + Math.cos(f.a) * d, Y(f.y) + Math.sin(f.a) * d, 2, 2, 4.5); });
      ATM.thermo(ctx, g.x1 - 30, g.y0 + 30, g.y1 - 20, p.Tf / 200, p.Tf + ' MK');
      if (on('lbl')) ATM.legend(ctx, g.x1 - 60, g.y1 - 14, [['#dc2626', 'بروتون', 'dot'], ['#2563eb', 'نيوترون', 'dot']]);
    }
    if (on('neu')) S.neu.forEach(n => { const x = X(n.x), y = Y(n.y); ctx.fillStyle = n.slow ? '#e2e8f0' : '#94a3b8'; ctx.beginPath(); ctx.arc(x, y, n.slow ? 3 : 2.6, 0, TAU); ctx.fill(); if (!n.slow) { ctx.strokeStyle = 'rgba(100,116,139,.5)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - n.vx * 30, y - n.vy * 30 * g.ch / g.cw * (g.cw / g.ch)); ctx.stroke(); } });
    if (on('flash')) S.fl.forEach(f => { const x = X(f.x), y = Y(f.y); ctx.strokeStyle = 'rgba(234,179,8,' + (1 - f.t) + ')'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 6 + f.t * 26, 0, TAU); ctx.stroke(); if (f.t < .7) G.text(ctx, f.txt, x, y - 14 - f.t * 20, { s: 10, w: 900, c: '#b45309' }); });
    // gun
    ctx.save(); ctx.translate(g.gx, g.gy); ctx.rotate(S.aim); ctx.fillStyle = '#475569'; rr(ctx, -16, -10, 42, 20, 5); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(22, -5, 10, 10); ctx.restore(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(g.gx, g.gy, 12, 0, TAU); ctx.fill(); if (on('lbl')) G.text(ctx, p.mode === 'fus' ? 'حقن وقود D/T' : 'مدفع نيوترونات', g.gx + 4, g.gy + 34, { s: 10, w: 800, c: '#94a3b8' });
    // bottom: equation + status
    const by = g.y1 + 24; if (on('lbl')) { const eq = p.mode === 'fus' ? '²₁H + ³₁H → ⁴₂He + ¹₀n + 17.6 MeV' : '¹₀n + ²³⁵₉₂U → ²³⁶₉₂U* → ¹⁴¹₅₆Ba + ⁹²₃₆Kr + 3 ¹₀n + 200 MeV'; G.text(ctx, eq, (g.x0 + g.x1) / 2, by, { s: 13, w: 800, c: '#cbd5e1' }); }
    const st = p.mode === 'fus' ? (S.fus ? 'اندماجات: ' + S.fus : p.Tf < 60 ? 'الحرارة منخفضة: التنافر الكهربائي يمنع الاندماج' : 'بانتظار تصادم D مع T') : S.neu.length === 0 ? (S.fis ? 'توقف التفاعل' : 'أطلق نيوتروناً') : S.k > 1.25 ? 'متسلسل متزايد (فوق الحرج)' : S.k > .75 ? 'مسيطر عليه (حرج تقريباً)' : 'متناقص (دون الحرج)';
    const sc = /متزايد/.test(st) ? '#dc2626' : /مسيطر/.test(st) ? '#15803d' : '#475569';
    G.text(ctx, st, (g.x0 + g.x1) / 2, by + 26, { s: 13, w: 900, c: sc });
    if (p.mode === 'fis') G.text(ctx, 'عامل التكاثر k ≈ ' + fmt(S.k, 2) + '   نيوترونات حرة: ' + S.neu.length + '   الطاقة: ' + fmt(S.En, 4) + ' MeV', (g.x0 + g.x1) / 2, by + 50, { s: 11, w: 800, mono: 0, c: '#64748b' });
    else G.text(ctx, 'الطاقة: ' + fmt(S.En, 4) + ' MeV', (g.x0 + g.x1) / 2, by + 50, { s: 11, w: 800, c: '#64748b' });
    if (on('lbl') && p.mode === 'fis') ATM.legend(ctx, g.x1, by + 74, [['#16a34a', '²³⁵U', 'dot'], ['#f97316', 'Ba', 'dot'], ['#0ea5e9', 'Kr', 'dot'], ['#e2e8f0', 'نيوترون بطيء', 'dot'], ['#94a3b8', 'سريع', 'dot']]);
  };
  E.readings = function (S) { if (S.p.mode === 'fus') return [rd('عدد الاندماجات', S.fus + ''), rd('الطاقة المتحررة', fmt(S.En, 4, 'MeV')), rd('بالجول', fmtSI(S.En * 1.6e-13, 'J')), rd('درجة الحرارة', S.p.Tf + ' ×10⁶ K')]; return [rd('عدد الانشطارات', S.fis + ''), rd('النيوترونات الحرة', S.neu.length + ''), rd('الطاقة المتحررة', fmt(S.En, 4, 'MeV')), rd('بالجول', fmtSI(S.En * 1.6e-13, 'J')), rd('عامل التكاثر k', fmt(S.k || 0, 3)), rd('حالة التفاعل', S.neu.length > 60 ? 'متسلسل متزايد (غير مسيطر عليه)' : S.neu.length > 0 ? 'مستمر' : S.fis ? 'توقف' : 'بانتظار نيوترون', 1)]; };
  E.explain = S => { if (S.p.mode === 'fus') return S.p.Tf < 60 ? `النوى الموجبة تتنافر؛ يلزم ${B_('درجة حرارة عالية جداً')} لتقترب بسرعة كافية فتندمج. اسحب المحرار لأعلى.` : `نواتا الديوتيريوم والتريتيوم تندمجان فتتكون نواة هيليوم ونيوترون وتتحرر ${B_('17.6 MeV')}.`; if (!S.fis) return `أطلق نيوتروناً ${B_('بطيئاً')} نحو نوى اليورانيوم (انقر المدفع أو أي نقطة في المفاعل).`; return S.k > 1.25 ? `${B_('تفاعل متسلسل غير مسيطر عليه')}: كل انشطار يطلق 2–3 نيوترونات تشطر نوى أخرى. أدخل قضبان السيطرة.` : S.k > .75 ? `قضبان السيطرة تمتص الفائض فيسبب كل انشطار ${B_('انشطاراً واحداً')} تقريباً — هكذا يعمل المفاعل.` : (!S.p.mod ? `بلا مهدئ تبقى النيوترونات ${B_('سريعة')} فيقل احتمال أسرها والانشطار.` : 'قضبان السيطرة تمتص معظم النيوترونات فيتناقص التفاعل.'); };
  E.howto = '<b>جرّب:</b> انقر المدفع (أو أي نقطة في المفاعل) لإطلاق نيوترون، وأدر المدفع للتصويب. اسحب قضبان السيطرة لأعلى وأسفل للتحكم بالتفاعل المتسلسل، وأطفئ المهدئ لتلاحظ أثر النيوترونات السريعة. اختر «اندماج» واسحب المحرار لرفع درجة حرارة البلازما.';
})();
