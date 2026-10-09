'use strict';
/* =====================================================================
   expzz_opt.js — Chapter 5 (wave optics), PhET-style direct manipulation
   ripple · young · thinfilm · single_slit · grating · rope_pol ·
   tourmaline · malus · brewster · scatter
   (overrides draw / drags / controls of the originals in exp5.js)
   ===================================================================== */
const OPTK = (() => {
  const on = (p, k) => p[k] !== false;
  const raw = (ctx, f) => { const cv = ctx.canvas, rw = cv.__raw; cv.__raw = true; try { f(); } finally { cv.__raw = rw; } };
  const book = ctx => !!(ctx.canvas && ctx.canvas.__book);
  function panel(ctx, x, y, w, h, o = {}) {
    raw(ctx, () => {
      const bk = book(ctx);
      ctx.fillStyle = o.fill || (bk ? 'rgba(255,255,255,.95)' : 'rgba(10,17,32,.84)'); rr(ctx, x, y, w, h, o.r || 10); ctx.fill();
      ctx.strokeStyle = o.stroke || (bk ? '#cbd5e1' : 'rgba(148,163,184,.45)'); ctx.lineWidth = 1; ctx.stroke();
      if (o.title) { ctx.direction = 'rtl'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.font = '800 12px Tajawal,sans-serif'; ctx.fillStyle = bk ? '#334155' : '#cbd5e1'; ctx.fillText(o.title, x + w - 10, y + 13); ctx.textBaseline = 'alphabetic'; }
    });
  }
  // spectrum slider (wavelength knob)
  function spec(ctx, x, y, w, h, lam, dis) {
    raw(ctx, () => {
      for (let i = 0; i < w; i++) { ctx.fillStyle = wlColor(380 + 370 * i / w, dis ? .25 : 1); ctx.fillRect(x + i, y, 1.5, h); }
      ctx.strokeStyle = 'rgba(148,163,184,.8)'; ctx.lineWidth = 1; ctx.strokeRect(x - .5, y - .5, w + 1, h + 1);
      if (!dis) { const kx = x + (lam - 380) / 370 * w; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(kx, y + h + 1); ctx.lineTo(kx - 7, y + h + 12); ctx.lineTo(kx + 7, y + h + 12); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.strokeRect(kx - 2, y - 3, 4, h + 6); }
    });
  }
  const specDrag = (id, x, y, w, h, lam, k = 'lam') => ({ id, x: x + (lam - 380) / 370 * w, y: y + h / 2 + 4, hit: (px, py) => px >= x - 8 && px <= x + w + 8 && py >= y - 8 && py <= y + h + 16, axis: 'x', tip: 'اسحب المؤشر على الطيف لتغيير الطول الموجي (اللون)', drag: (S, d) => setParam(S, k, 380 + (d.x - x) / w * 370), click: (S, px) => setParam(S, k, 380 + (px - x) / w * 370), wheel: (S, s) => setParam(S, k, S.p[k] + 5 * s) });
  function dbl(ctx, x, y, dx, dy, col, lw = 2.2, hs = 7) { if (Math.hypot(dx, dy) < 2) return; G.arrow(ctx, x, y, x + dx, y + dy, col, lw, hs); G.arrow(ctx, x, y, x - dx, y - dy, col, lw, hs); }
  function dim(ctx, x1, y1, x2, y2, label, col = '#94a3b8', o = {}) {
    ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.setLineDash([]); G.arrow(ctx, (x1 + x2) / 2, (y1 + y2) / 2, x1, y1, col, 1.2, 6); G.arrow(ctx, (x1 + x2) / 2, (y1 + y2) / 2, x2, y2, col, 1.2, 6);
    if (label) G.text(ctx, label, (x1 + x2) / 2 + (o.dx || 0), (y1 + y2) / 2 + (o.dy || 0), { s: o.s || 12, w: 800, c: o.c || col, bg: o.bg });
  }
  function arcA(ctx, x, y, r, a0, a1, col, lw = 1.5) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, r, Math.min(a0, a1), Math.max(a0, a1)); ctx.stroke(); }
  const rgb = c => `rgb(${c.map(v => Math.round(clamp(v, 0, 255))).join(',')})`;
  return { on, raw, book, panel, spec, specDrag, dbl, dim, arcA, rgb };
})();

/* =============================== 1. RIPPLE TANK =============================== */
(() => {
  const E = EXPS.find(e => e.id === 'ripple'); if (!E) return;
  const { on, panel } = OPTK; const MM = .25, V = 200; // 1 px = 0.25 mm of water surface, wave speed 200 mm/s
  E.controls[0].on = (v, S) => setParam(S, 'f', +(V / (v * MM)).toFixed(1), false);
  E.controls[3].icon = 'eye';
  E.controls = E.controls.concat([
    R('f', 'تردد الهزاز f', 16, 57, 28.5, .5, 'Hz', (v, S) => setParam(S, 'lam', Math.round(V / (v * MM)), false)),
    TG('water', 'سطح الماء (قمم وقعور)', true, null, 'wave'),
    TG('fronts', 'جبهات الموجة (دوائر القمم)', false, null, 'dot'),
    TG('anti', 'خطوط التداخل البنّاء (البطون)', true, null, 'light'),
    TG('labels', 'التسميات والقيم', true, null, 'labels'),
    TG('graph', 'اهتزاز الماء عند النقطة P', true, null, 'graph')
  ]);
  const geo = S => {
    const w = S.W || 800, h = S.H || 600, p = S.p; const g = S.rg || (S.rg = { cx: .22, cy: .5, a: Math.PI / 2 });
    const cx = g.cx * w, cy = g.cy * h, ux = Math.cos(g.a), uy = Math.sin(g.a), nx = -uy, ny = ux;
    const s1 = [cx - ux * p.d / 2, cy - uy * p.d / 2], s2 = [cx + ux * p.d / 2, cy + uy * p.d / 2];
    const pr = S.pr || (S.pr = { x: .64, y: .34 });
    return { w, h, cx, cy, ux, uy, nx, ny, s1, s2, P: [pr.x * w, pr.y * h], mo: [cx + nx * 64, cy + ny * 64], bar: [cx + nx * 30, cy + ny * 30] };
  };
  const hyp = (g, d, D) => { // locus r2 − r1 = D (hyperbola with foci S1,S2)
    const c = d / 2, a = Math.abs(D) / 2; if (a >= c - .3) return null; const b = Math.sqrt(c * c - a * a), sg = D > 0 ? -1 : 1, Vm = 2.2 * Math.max(g.w, g.h); const pts = [];
    for (let i = -70; i <= 70; i++) { const s = i / 70, v = Vm * s * s * s, u = sg * a * Math.sqrt(1 + v * v / (b * b)); pts.push([g.cx + u * g.ux + v * g.nx, g.cy + u * g.uy + v * g.ny]); }
    return pts;
  };
  const line = (ctx, pts) => { ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); };
  const kind = S => { const f = S.pphi - Math.round(S.pphi); return Math.abs(f) < .12 ? 'c' : Math.abs(Math.abs(f) - .5) < .12 ? 'd' : 'p'; };
  E.setup = S => { S.rg = { cx: .22, cy: .5, a: Math.PI / 2 }; S.pr = { x: .64, y: .34 }; S.wph = 0; S.probe = null; };
  E.pointer = null;
  E.update = (S, dt) => { S.wph = (S.wph || 0) + TAU * (30 / S.p.lam) * dt; };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h, false); const p = S.p, g = geo(S); const k = TAU / p.lam, ph2 = rad(p.ph), wt = S.wph || 0; const { s1, s2 } = g;
    // water surface (superposition of both circular waves)
    if (on(p, 'water')) {
      const res = +p.res || 4, iw = Math.ceil(w / res), ih = Math.ceil(h / res);
      let img = S._img; if (!img || img.width !== iw || img.height !== ih) img = S._img = ctx.createImageData(iw, ih);
      const D = img.data;
      for (let j = 0; j < ih; j++) { const y = j * res + res / 2; for (let i = 0; i < iw; i++) { const x = i * res + res / 2; const r1 = Math.hypot(x - s1[0], y - s1[1]) + 1, r2 = Math.hypot(x - s2[0], y - s2[1]) + 1; const z = Math.sin(k * r1 - wt) / Math.sqrt(r1 / 40 + 1) + Math.sin(k * r2 - wt + ph2) / Math.sqrt(r2 / 40 + 1); const v = clamp(.5 + z * .32, 0, 1); const o = (j * iw + i) * 4; D[o] = 14 + 90 * v; D[o + 1] = 60 + 150 * v; D[o + 2] = 110 + 140 * v; D[o + 3] = 255; } }
      const oc = S.oc || (S.oc = document.createElement('canvas')); oc.width = iw; oc.height = ih; oc.getContext('2d').putImageData(img, 0, 0); ctx.imageSmoothingEnabled = true; ctx.drawImage(oc, 0, 0, w, h);
    }
    // crest circles of each source
    if (on(p, 'fronts')) {
      const Rm = Math.hypot(w, h);
      [[s1, wt + Math.PI / 2, 'rgba(253,186,116,A)'], [s2, wt + Math.PI / 2 - ph2, 'rgba(103,232,249,A)']].forEach(([s, ph, c]) => {
        let r0 = ((ph / k) % p.lam + p.lam) % p.lam; ctx.lineWidth = 1.6;
        for (let r = r0; r < Rm; r += p.lam) { ctx.strokeStyle = c.replace('A', (.85 * Math.max(.18, 1 - r / Rm)).toFixed(3)); ctx.beginPath(); ctx.arc(s[0], s[1], Math.max(r, .1), 0, TAU); ctx.stroke(); }
      });
    }
    // nodal (destructive) and antinodal (constructive) lines
    const sh = p.ph / 360;
    if (p.lines) { ctx.strokeStyle = 'rgba(191,219,254,.85)'; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.6; for (let m = -12; m <= 12; m++) { const P = hyp(g, p.d, (m + .5 - sh) * p.lam); if (P) line(ctx, P); } ctx.setLineDash([]); }
    if (on(p, 'anti')) {
      for (let m = -12; m <= 12; m++) { const D = (m - sh) * p.lam; const P = hyp(g, p.d, D); if (!P) continue; ctx.strokeStyle = 'rgba(250,204,21,.9)'; ctx.lineWidth = 2; line(ctx, P);
        if (on(p, 'labels')) { // label where the curve reaches the edge on the open side
          let q = null; for (let i = 0; i <= 70; i++) { const a = P[i]; if (a[0] > 70 && a[0] < w - 14 && a[1] > 14 && a[1] < h - 14) { q = a; break; } }
          if (q) G.text(ctx, 'm=' + m, clamp(q[0], 90, w - 30), clamp(q[1], 60, h - 20), { s: 11, w: 800, c: '#fde68a', bg: 'rgba(15,23,42,.7)' });
        } }
    }
    // vibrator (dipper with two prongs) and sources
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]); ctx.stroke(); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.lineTo(g.mo[0], g.mo[1]); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(g.bar[0], g.bar[1], 7, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.stroke();
    const dA = -Math.PI * .75 + (p.f - 16) / 41 * Math.PI * 1.5; S._dialA = dA;
    ctx.fillStyle = '#334155'; rr(ctx, g.mo[0] - 26, g.mo[1] - 26, 52, 52, 9); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(g.mo[0], g.mo[1], 17, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(g.mo[0], g.mo[1], 17, -Math.PI * .75 - Math.PI / 2 + Math.PI / 2, dA); ctx.stroke();
    ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.mo[0], g.mo[1]); ctx.lineTo(g.mo[0] + Math.cos(dA) * 15, g.mo[1] + Math.sin(dA) * 15); ctx.stroke();
    G.text(ctx, 'f = ' + fmt(p.f, 3) + ' Hz', g.mo[0], g.mo[1] + 40, { s: 11, w: 800, c: '#fde68a', bg: 'rgba(15,23,42,.75)' });
    const vib = Math.sin(wt) * 2.2;
    [s1, s2].forEach((s, i) => { G.glow(ctx, s[0], s[1], 20, 'rgba(251,191,36,A)', .6); ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(s[0], s[1], 7 + (i ? -vib : vib) * .3 + 1, 0, TAU); ctx.fill(); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1.5; ctx.stroke(); if (on(p, 'labels')) G.text(ctx, i ? 'S₂' : 'S₁', s[0] + g.nx * 22, s[1] + g.ny * 22, { s: 13, w: 900, c: i ? '#67e8f9' : '#fdba74' }); });
    // probe point P
    const P = g.P; const r1 = Math.hypot(P[0] - s1[0], P[1] - s1[1]), r2 = Math.hypot(P[0] - s2[0], P[1] - s2[1]);
    S.pdl = (r2 - r1) / p.lam; S.pphi = S.pdl + sh; const K = kind(S); const kc = K === 'c' ? '#4ade80' : K === 'd' ? '#f87171' : '#fb923c';
    ctx.lineWidth = 1.6; ctx.setLineDash([6, 4]); ctx.strokeStyle = '#fdba74'; ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(P[0], P[1]); ctx.stroke(); ctx.strokeStyle = '#67e8f9'; ctx.beginPath(); ctx.moveTo(s2[0], s2[1]); ctx.lineTo(P[0], P[1]); ctx.stroke(); ctx.setLineDash([]);
    if (on(p, 'labels')) { G.text(ctx, 'r₁ = ' + fmt(r1 / p.lam, 3) + 'λ', (s1[0] + P[0]) / 2, (s1[1] + P[1]) / 2 - 12, { s: 11, w: 800, c: '#fdba74', bg: 'rgba(15,23,42,.7)' }); G.text(ctx, 'r₂ = ' + fmt(r2 / p.lam, 3) + 'λ', (s2[0] + P[0]) / 2, (s2[1] + P[1]) / 2 + 12, { s: 11, w: 800, c: '#67e8f9', bg: 'rgba(15,23,42,.7)' }); }
    const zP = Math.sin(k * r1 - wt) / Math.sqrt(r1 / 40 + 1) + Math.sin(k * r2 - wt + ph2) / Math.sqrt(r2 / 40 + 1);
    ctx.fillStyle = kc; ctx.beginPath(); ctx.arc(P[0], P[1], 8 + zP * 2, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    G.text(ctx, 'P', P[0], P[1], { s: 11, w: 900, c: '#0f172a' });
    const msg = 'Δℓ = ' + fmt(S.pdl, 3) + 'λ' + (p.ph ? ' ، فرق طور المصدرين ' + p.ph + '°' : '') + ' ⇐ ' + (K === 'c' ? 'تداخل بنّاء' : K === 'd' ? 'تداخل إتلافي' : 'تداخل جزئي');
    G.text(ctx, msg, clamp(P[0], 180, w - 180), P[1] > 70 ? P[1] - 26 : P[1] + 28, { s: 12, w: 800, c: '#fff', bg: K === 'c' ? 'rgba(21,128,61,.9)' : K === 'd' ? 'rgba(185,28,28,.9)' : 'rgba(194,65,12,.9)' });
    // legend
    if (on(p, 'labels')) {
      panel(ctx, 74, 12, 262, 64);
      ctx.lineWidth = 2.2; ctx.strokeStyle = 'rgba(250,204,21,.95)'; ctx.beginPath(); ctx.moveTo(300, 30); ctx.lineTo(326, 30); ctx.stroke(); ctx.setLineDash([5, 4]); ctx.strokeStyle = 'rgba(191,219,254,.95)'; ctx.beginPath(); ctx.moveTo(300, 56); ctx.lineTo(326, 56); ctx.stroke(); ctx.setLineDash([]);
      G.text(ctx, 'خط بطني (بنّاء): Δℓ = mλ', 292, 30, { s: 11, a: 'right', c: '#fde68a' }); G.text(ctx, 'خط عقدي (إتلافي): Δℓ = (m+½)λ', 292, 56, { s: 11, a: 'right', c: '#bfdbfe' });
    }
    // oscillation at P
    if (on(p, 'graph')) {
      const bw = 250, bh = 118, bx = w - bw - 18, by = h - bh - 92; panel(ctx, bx, by, bw, bh, { title: 'إزاحة سطح الماء عند P مع الزمن' });
      const A1 = 1 / Math.sqrt(r1 / 40 + 2), A2 = 1 / Math.sqrt(r2 / 40 + 2), sc = (bh - 40) / 2 / (A1 + A2 + .05), y0 = by + 24 + (bh - 30) / 2, x0 = bx + 10, x1 = bx + bw - 10;
      ctx.strokeStyle = 'rgba(148,163,184,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
      const tr = (f, col, lw) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); for (let x = x0; x <= x1; x += 2) { const ph = wt - (x1 - x) / (x1 - x0) * 3 * TAU; const v = f(ph); x === x0 ? ctx.moveTo(x, y0 - v * sc) : ctx.lineTo(x, y0 - v * sc); } ctx.stroke(); };
      tr(ph => A1 * Math.sin(k * r1 - ph), 'rgba(253,186,116,.9)', 1.4); tr(ph => A2 * Math.sin(k * r2 - ph + ph2), 'rgba(103,232,249,.9)', 1.4); tr(ph => A1 * Math.sin(k * r1 - ph) + A2 * Math.sin(k * r2 - ph + ph2), '#f8fafc', 2.4);
      G.text(ctx, 'من S₁', x0 + 20, by + bh - 9, { s: 10, c: '#fdba74' }); G.text(ctx, 'من S₂', x0 + 70, by + bh - 9, { s: 10, c: '#67e8f9' }); G.text(ctx, 'المحصلة', x0 + 125, by + bh - 9, { s: 10, c: '#f8fafc' });
    }
    G.text(ctx, '(الحركة مبطّأة)', w / 2, h - 88, { s: 10, c: 'rgba(203,213,225,.6)' });
  };
  E.drags = S => {
    const g = geo(S);
    const mv = (S, d, which) => {
      const g = geo(S); const q = [clamp(d.ox + d.x - d.sx, 76, g.w - 16), clamp(d.oy + d.y - d.sy, 16, g.h - 16)]; const o = which === 1 ? g.s2 : g.s1;
      let vx = which === 1 ? o[0] - q[0] : q[0] - o[0], vy = which === 1 ? o[1] - q[1] : q[1] - o[1]; if (Math.hypot(vx, vy) < 1) return;
      setParam(S, 'd', Math.hypot(vx, vy)); const a = Math.atan2(vy, vx), ux = Math.cos(a), uy = Math.sin(a), dd = S.p.d;
      const c = which === 1 ? [o[0] - ux * dd / 2, o[1] - uy * dd / 2] : [o[0] + ux * dd / 2, o[1] + uy * dd / 2]; S.rg = { cx: c[0] / g.w, cy: c[1] / g.h, a };
    };
    return [
      { id: 'tank', x: g.w * .8, y: g.h * .76, hit: (x, y) => x > 70 && y > 0 && x < g.w && y < g.h, hint: false, click: (S, x, y) => { S.pr = { x: x / g.w, y: y / g.h }; }, wheel: (S, s) => setParam(S, 'f', S.p.f + s) },
      { id: 's1', x: g.s1[0], y: g.s1[1], r: 13, axis: 'xy', tip: 'اسحب المصدر S₁ (يتغير البعد d واتجاه المصدرين)', idle: 'اسحب المصدرين ✋', drag: (S, d) => mv(S, d, 1) },
      { id: 's2', x: g.s2[0], y: g.s2[1], r: 13, axis: 'xy', tip: 'اسحب المصدر S₂', drag: (S, d) => mv(S, d, 2) },
      { id: 'probe', x: g.P[0], y: g.P[1], r: 15, axis: 'xy', tip: 'اسحب النقطة P لقياس فرق المسار ونوع التداخل', drag: (S, d) => { S.pr = { x: clamp(d.ox + d.x - d.sx, 70, g.w - 6) / g.w, y: clamp(d.oy + d.y - d.sy, 6, g.h - 6) / g.h }; } },
      { id: 'bar', x: g.bar[0], y: g.bar[1], r: 9, axis: 'xy', hint: false, tip: 'اسحب الهزاز لنقل المصدرين معاً', drag: (S, d) => { S.rg.cx = clamp(d.ox + d.x - d.sx - g.nx * 30, 90, g.w - 30) / g.w; S.rg.cy = clamp(d.oy + d.y - d.sy - g.ny * 30, 30, g.h - 30) / g.h; } },
      { id: 'dial', cx: g.mo[0], cy: g.mo[1], x: g.mo[0] + Math.cos(S._dialA || 0) * 15, y: g.mo[1] + Math.sin(S._dialA || 0) * 15, r: 16, hint: false, tip: 'دوّر قرص الهزاز لتغيير التردد f (فيتغير الطول الموجي λ = v/f)', drag: (S, d) => setParam(S, 'f', S.p.f + d.dang * 41 / (Math.PI * 1.5)), wheel: (S, s) => setParam(S, 'f', S.p.f + s) }
    ];
  };
  E.readings = S => {
    const p = S.p, lmm = p.lam * MM; const r = [rd('الطول الموجي λ', fmt(lmm, 3, 'mm')), rd('التردد f = v/λ', fmt(V / lmm, 3, 'Hz')), rd('البعد بين المصدرين d', fmt(p.d * MM, 3, 'mm') + ' (' + fmt(p.d / p.lam, 3) + 'λ)')];
    if (S.pdl !== undefined) { const K = kind(S); r.push(rd('فرق المسار Δℓ = r₂ − r₁', fmt(S.pdl, 3) + ' λ'), rd('فرق الطور الكلي عند P', fmt(((S.pphi * 360) % 360 + 360) % 360, 3, '°')), rd('نوع التداخل عند P', K === 'c' ? 'بنّاء (Δℓ = mλ)' : K === 'd' ? 'إتلافي (Δℓ = (m+½)λ)' : 'جزئي', 1)); }
    return r;
  };
  E.explain = S => { if (S.pdl === undefined) return ''; const K = kind(S); return `عند P: فرق المسار ${fmt(Math.abs(S.pdl), 3)}λ${S.p.ph ? ' مع فرق طور بين المصدرين ' + S.p.ph + '°' : ''}، فتصل الموجتان ${K === 'c' ? '<b>بالطور نفسه (قمة مع قمة)</b> وتتضاعف السعة' : K === 'd' ? '<b>متعاكستين (قمة مع قعر)</b> فتنعدم السعة' : 'بفرق طور جزئي فتكون السعة متوسطة'}. الخطوط الصفراء: بنّاء، المنقطة: إتلافي.`; };
  E.howto = 'اسحب المصدرين <b>S₁ و S₂</b> لتغيير البعد بينهما واتجاههما، ودوّر <b>قرص الهزاز</b> لتغيير التردد (عجلة الفأرة على الحوض تفعل ذلك أيضاً). اسحب النقطة <b>P</b> (أو انقر في أي مكان) لترى فرق المسار ونوع التداخل ورسم اهتزاز الماء عندها. أظهر أو أخفِ كل طبقة من لوحة التأثيرات.';
})();

/* =============================== 2. YOUNG'S DOUBLE SLIT =============================== */
(() => {
  const E = EXPS.find(e => e.id === 'young'); if (!E) return;
  const { on, panel, spec, specDrag, dim, arcA, rgb } = OPTK;
  E.controls[4].icon = 'light'; E.controls[5].icon = 'eye';
  E.controls = E.controls.concat([
    SEL('zm', 'مدى الشاشة المعروض', [[5, '±5 mm'], [20, '±20 mm'], [60, '±60 mm']], 20),
    TG('waves', 'جبهات الموجة من الشقوق', true, null, 'wave'),
    TG('rays', 'مسارات الضوء إلى الهدب المضيئة', true, null, 'ray'),
    TG('geo', 'هندسة فرق المسار عند المؤشر', true, null, 'vector'),
    TG('graph', 'منحني توزيع الشدة', true, null, 'graph'),
    TG('labels', 'التسميات والقيم', true, null, 'labels')
  ]);
  const WL = [410, 450, 490, 530, 570, 610, 650, 690];
  const geo = S => {
    const w = S.W || 800, h = S.H || 600, p = S.p, cy = h * .5, lx = 76, sx = w * .2, dx = w * .33, x0 = dx + 90, x1 = w * .6;
    const scx = x0 + (p.L - .5) / 2.5 * (x1 - x0), gs = 16 + (p.d - .05) / .95 * 110, top = 58, bot = h - 62, Y = (+p.zm || 20) * 1e-3, H2 = (bot - top) / 2;
    const py = y => cy - y / Y * H2; const yc = clamp(S.yc ?? .16, -1, 1) * Y;
    return { w, h, cy, lx, sx, dx, x0, x1, scx, gs, top, bot, Y, H2, py, yc, s1: [dx + 3, cy - gs / 2], s2: [dx + 3, cy + gs / 2] };
  };
  const I1 = (p, y, lamM) => { const th = Math.atan(y / p.L), s = Math.sin(th); const be = Math.PI * p.a * 1e-3 * s / lamM; const env = Math.abs(be) < 1e-9 ? 1 : (Math.sin(be) / be) ** 2; return p.single ? env * .25 : env * Math.cos(Math.PI * p.d * 1e-3 * s / lamM) ** 2; };
  const pattern = (S, g) => { // cached colour/intensity of every screen row
    const p = S.p, key = [p.lam, p.d, p.L, p.a, p.white, p.single, p.zm, Math.round(g.bot - g.top)].join('|'); if (S._yk === key) return S._yp; const n = Math.round(g.bot - g.top); const col = [], I = [];
    for (let k = 0; k <= n; k++) { const y = (g.cy - (g.top + k)) / g.H2 * g.Y; if (p.white) { const s = [0, 0, 0]; let tot = 0; WL.forEach(nm => { const v = I1(p, y, nm * 1e-9); const c = wlRGB(nm); s[0] += c[0] * v; s[1] += c[1] * v; s[2] += c[2] * v; tot += v; }); col.push(rgb(s.map(v => v / 3.1))); I.push(tot / WL.length); } else { const v = I1(p, y, p.lam * 1e-9); col.push(rgb(wlRGB(p.lam).map(q => q * v))); I.push(v); } }
    S._yk = key; S._yp = { col, I }; return S._yp;
  };
  E.setup = S => { S.yc = .16; };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h, false); const p = S.p, g = geo(S), lamM = p.lam * 1e-9; const col = a => p.white ? `rgba(255,255,255,${a})` : wlColor(p.lam, a);
    const dy = lamM * p.L / (p.d * 1e-3); const off = (S.t * 40) % 16;
    // laser + wavelength knob
    spec(ctx, g.lx, 18, 170, 12, p.lam, p.white); G.text(ctx, p.white ? 'ضوء أبيض (انقر المصدر)' : 'λ = ' + Math.round(p.lam) + ' nm', g.lx + 178, 24, { s: 12, w: 800, a: 'left', c: p.white ? '#e2e8f0' : '#fde68a' });
    ctx.fillStyle = '#334155'; rr(ctx, g.lx, g.cy - 17, 64, 34, 7); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = col(1); ctx.beginPath(); ctx.arc(g.lx + 14, g.cy, 5, 0, TAU); ctx.fill();
    G.text(ctx, p.white ? 'مصباح' : 'ليزر', g.lx + 38, g.cy, { s: 11, w: 800, c: '#e2e8f0' });
    ctx.fillStyle = col(.9); ctx.fillRect(g.lx + 64, g.cy - 3, g.sx - g.lx - 64, 6);
    // barrier 1 (single slit) & barrier 2 (double slit)
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(g.sx, g.top, 6, g.cy - 4 - g.top); ctx.fillRect(g.sx, g.cy + 4, 6, g.bot - g.cy - 4);
    ctx.fillRect(g.dx, g.top, 6, g.s1[1] - 3 - g.top); ctx.fillRect(g.dx, g.s1[1] + 3, 6, g.gs - 6); ctx.fillRect(g.dx, g.s2[1] + 3, 6, g.bot - g.s2[1] - 3);
    if (p.single) { ctx.fillStyle = '#475569'; ctx.fillRect(g.dx - 3, g.s2[1] - 6, 12, 12); G.text(ctx, 'مغلق', g.dx - 26, g.s2[1], { s: 10, c: '#fca5a5' }); }
    // wavefronts
    if (on(p, 'waves')) {
      ctx.save(); ctx.beginPath(); ctx.rect(g.sx, g.top, g.scx - g.sx, g.bot - g.top); ctx.clip(); ctx.lineWidth = 1.3;
      for (let r = off; r < g.dx - g.sx; r += 16) { ctx.strokeStyle = col(.5 * (1 - r / (g.dx - g.sx) * .5)); ctx.beginPath(); ctx.arc(g.sx + 3, g.cy, r, -1.2, 1.2); ctx.stroke(); }
      [g.s1, g.s2].forEach((s, i) => { if (i === 1 && p.single) return; for (let r = off; r < g.scx - g.dx; r += 16) { ctx.strokeStyle = col(.42 * (1 - r / (g.scx - g.dx) * .6)); ctx.beginPath(); ctx.arc(s[0], s[1], r, -1.35, 1.35); ctx.stroke(); } });
      ctx.restore();
    }
    // rays to bright fringes (antinodal lines meet the screen)
    const pat = pattern(S, g); const dyPx = dy / g.Y * g.H2;
    if (on(p, 'rays') && !p.single) {
      const step = dyPx < 10 ? Math.ceil(10 / dyPx) : 1; ctx.lineWidth = 1;
      for (let m = -40; m <= 40; m += step) { const yy = g.py(p.white ? 0 : m * dy); if (p.white && m) continue; if (yy < g.top || yy > g.bot) continue; ctx.strokeStyle = col(m === 0 ? .8 : .45); [g.s1, g.s2].forEach(s => { ctx.beginPath(); ctx.moveTo(s[0], s[1]); ctx.lineTo(g.scx, yy); ctx.stroke(); }); }
    }
    // screen (side view shows the fringes)
    for (let k = 0; k < pat.col.length; k++) { ctx.fillStyle = pat.col[k]; ctx.fillRect(g.scx, g.top + k, 22, 1.2); }
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.strokeRect(g.scx - .5, g.top - .5, 23, g.bot - g.top + 1);
    // intensity graph
    const gx0 = g.scx + 34, gW = w - gx0 - 26;
    if (on(p, 'graph')) {
      ctx.strokeStyle = 'rgba(148,163,184,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx0, g.top); ctx.lineTo(gx0, g.bot); ctx.stroke();
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.7; ctx.beginPath(); pat.I.forEach((v, k) => { const x = gx0 + v * gW; k ? ctx.lineTo(x, g.top + k) : ctx.moveTo(x, g.top + k); }); ctx.stroke();
      G.text(ctx, 'الشدة I', gx0 + gW - 20, g.top - 12, { s: 11, c: '#fbbf24' });
    }
    // labels: fringe orders, Δy, L, d
    if (on(p, 'labels')) {
      if (!p.white && dyPx > 13) for (let m = -30; m <= 30; m++) { const yy = g.py(m * dy); if (yy < g.top + 6 || yy > g.bot - 6) continue; G.text(ctx, (m === 0 ? 'مركزي ' : '') + 'm=' + m, g.scx - 6, yy, { s: 10, a: 'right', c: '#cbd5e1' }); }
      if (!p.white && !p.single && dyPx > 8 && g.py(dy) > g.top) { const x = gx0 + gW * .72; ctx.strokeStyle = '#86efac'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); [0, dy].forEach(v => { ctx.beginPath(); ctx.moveTo(g.scx + 22, g.py(v)); ctx.lineTo(x + 6, g.py(v)); ctx.stroke(); }); ctx.setLineDash([]); OPTK.dim(ctx, x, g.py(dy), x, g.py(0), ''); G.text(ctx, 'Δy = λL/d = ' + fmtSI(dy, 'm'), x - 6, (g.py(0) + g.py(dy)) / 2, { s: 11, w: 800, a: 'right', c: '#86efac', bg: 'rgba(15,23,42,.8)' }); }
      dim(ctx, g.dx + 3, g.bot + 20, g.scx, g.bot + 20, 'L = ' + fmt(p.L, 3) + ' m', '#cbd5e1', { dy: -1, bg: 'rgba(15,23,42,.9)' });
      G.text(ctx, 'd = ' + fmt(p.d, 3) + ' mm', g.dx - 10, g.s1[1] - 18, { s: 11, w: 800, a: 'right', c: '#fde68a' }); G.text(ctx, 'S₁', g.dx + 18, g.s1[1] - 8, { s: 11, w: 900, c: '#fdba74' }); if (!p.single) G.text(ctx, 'S₂', g.dx + 18, g.s2[1] + 9, { s: 11, w: 900, c: '#67e8f9' });
      G.text(ctx, 'حاجز ذو شق مفرد', g.sx + 3, g.top - 12, { s: 10, c: '#94a3b8' }); G.text(ctx, 'الشقان', g.dx + 3, g.top - 12, { s: 10, c: '#94a3b8' }); G.text(ctx, 'الشاشة', g.scx + 11, g.top - 12, { s: 10, c: '#94a3b8' });
    }
    // cursor on the screen + path-difference geometry (book fig. 5)
    const Py = g.py(g.yc), P = [g.scx, Py]; const th = Math.atan(g.yc / p.L), q = p.d * 1e-3 * Math.sin(th) / lamM; const fr = q - Math.round(q);
    const bright = Math.abs(fr) < .12, dark = Math.abs(Math.abs(fr) - .5) < .12; const kc = p.white ? '#e2e8f0' : bright ? '#4ade80' : dark ? '#f87171' : '#fb923c';
    ctx.strokeStyle = kc; ctx.lineWidth = 1.2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(g.scx - 4, Py); ctx.lineTo(w - 24, Py); ctx.stroke(); ctx.setLineDash([]);
    if (on(p, 'geo')) {
      const s1 = g.s1, s2 = p.single ? g.s1 : g.s2, mid = [g.dx + 3, g.cy];
      ctx.lineWidth = 1.6; ctx.strokeStyle = '#fdba74'; ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(P[0], P[1]); ctx.stroke(); if (!p.single) { ctx.strokeStyle = '#67e8f9'; ctx.beginPath(); ctx.moveTo(s2[0], s2[1]); ctx.lineTo(P[0], P[1]); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(203,213,225,.55)'; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(mid[0], mid[1]); ctx.lineTo(g.scx, g.cy); ctx.stroke(); ctx.beginPath(); ctx.moveTo(mid[0], mid[1]); ctx.lineTo(P[0], P[1]); ctx.stroke(); ctx.setLineDash([]);
      const a = Math.atan2(P[1] - mid[1], P[0] - mid[0]); arcA(ctx, mid[0], mid[1], 46, 0, a, '#e2e8f0', 1.4); G.text(ctx, 'θ', mid[0] + 58 * Math.cos(a / 2), mid[1] + 58 * Math.sin(a / 2), { s: 12, w: 900, c: '#e2e8f0' });
      if (!p.single) { const r1 = Math.hypot(P[0] - s1[0], P[1] - s1[1]), v = [s2[0] - P[0], s2[1] - P[1]], r2 = Math.hypot(v[0], v[1]); const F = [P[0] + v[0] / r2 * r1, P[1] + v[1] / r2 * r1]; ctx.strokeStyle = 'rgba(226,232,240,.7)'; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(F[0], F[1]); ctx.stroke(); ctx.setLineDash([]); ctx.strokeStyle = '#f97316'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(s2[0], s2[1]); ctx.lineTo(F[0], F[1]); ctx.stroke(); G.text(ctx, 'Δℓ', (s2[0] + F[0]) / 2 - 16, (s2[1] + F[1]) / 2 + 4, { s: 12, w: 900, c: '#fb923c' }); }
    }
    ctx.fillStyle = kc; ctx.beginPath(); ctx.arc(g.scx + 11, Py, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    const bx = clamp(g.scx + 40, 0, w - 214), by = Py < g.top + 90 ? Py + 14 : Py - 82; panel(ctx, bx, by, 196, 68, { stroke: kc });
    G.text(ctx, 'y = ' + fmtSI(g.yc, 'm'), bx + 98, by + 14, { s: 12, w: 800, c: '#e2e8f0' });
    G.text(ctx, 'Δℓ = d sinθ = ' + (p.white ? fmtSI(p.d * 1e-3 * Math.sin(th), 'm') : fmt(q, 3) + ' λ'), bx + 98, by + 34, { s: 12, w: 800, c: '#fdba74' });
    G.text(ctx, p.white ? (Math.abs(g.yc) < dy * .15 ? 'الهدب المركزي أبيض' : 'هدب ملونة (لكل لون موقع)') : p.single ? 'شق واحد: لا تداخل (حيود فقط)' : bright ? 'هدب مضيء (m = ' + Math.round(q) + ')' : dark ? 'هدب مظلم' : 'بين مضيء ومظلم', bx + 98, by + 54, { s: 12, w: 900, c: kc });
  };
  E.drags = S => {
    const g = geo(S), p = S.p; const setD = gs => setParam(S, 'd', .05 + (gs - 16) / 110 * .95); const lx = g.lx;
    return [
      { id: 'cur', x: g.scx + 11, y: g.py(g.yc), r: 13, axis: 'y', idle: 'اسحب المؤشر ✋', tip: 'اسحب المؤشر على الشاشة: y وفرق المسار ونوع الهدب', drag: (S, d) => { S.yc = clamp((g.cy - (d.oy + d.y - d.sy)) / g.H2, -1, 1); } },
      { id: 'slitB', x: g.s2[0], y: g.s2[1], w: 18, h: 18, axis: 'y', hint: false, tip: 'انقر لغلق/فتح الشق S₂ — أو اسحبه لتغيير d', click: S => setParam(S, 'single', !S.p.single), drag: (S, d) => setD(2 * ((d.oy + d.y - d.sy) - g.cy)) },
      { id: 'slitA', x: g.s1[0], y: g.s1[1], w: 18, h: 18, axis: 'y', tip: 'اسحب الشق لتغيير البعد d بين الشقين', idle: 'اسحب الشق ✋', drag: (S, d) => setD(2 * (g.cy - (d.oy + d.y - d.sy))) },
      { id: 'screen', x: g.scx + 11, y: g.top + 40, w: 30, h: 80, hit: (x, y) => Math.abs(x - g.scx - 11) < 18 && y > g.top && y < g.bot && Math.abs(y - g.py(g.yc)) > 16, axis: 'x', tip: 'اسحب الشاشة لتغيير بعدها L عن الشقين', drag: (S, d) => setParam(S, 'L', .5 + (d.ox + d.x - d.sx - 11 - g.x0) / (g.x1 - g.x0) * 2.5), wheel: (S, s) => setParam(S, 'L', S.p.L + .05 * s) },
      { id: 'laser', x: lx + 32, y: g.cy, w: 64, h: 34, hint: false, tip: 'انقر للتبديل بين الليزر والضوء الأبيض', click: S => setParam(S, 'white', !S.p.white) },
      specDrag('lam', lx, 18, 170, 12, p.lam)
    ];
  };
  const r0 = E.readings;
  E.readings = S => { const p = S.p, g = geo(S); const th = Math.atan(g.yc / p.L), q = p.d * 1e-3 * Math.sin(th) / (p.lam * 1e-9); return r0.call(E, S).concat([rd('موقع المؤشر y', fmtSI(g.yc, 'm')), rd('فرق المسار عند المؤشر', fmt(q, 3) + ' λ')]); };
  E.howto = 'اسحب <b>الشق العلوي</b> لتغيير d، واسحب <b>الشاشة</b> أفقياً لتغيير L، واسحب مؤشر <b>الطيف</b> لتغيير اللون (انقر الليزر للضوء الأبيض، وانقر الشق السفلي لغلقه). اسحب <b>المؤشر على الشاشة</b> لترى y وفرق المسار Δℓ = d sinθ ونوع الهدب — بشكل الكتاب (5).';
})();

/* =============================== 3. THIN FILM (soap film) =============================== */
(() => {
  const E = EXPS.find(e => e.id === 'thinfilm'); if (!E) return;
  const { on, panel, rgb } = OPTK;
  E.controls[3].icon = 'slow';
  E.controls = E.controls.concat([
    TG('rays', 'الشعاعان المنعكسان عن السطحين', true, null, 'ray'),
    TG('waves', 'تراكب الموجتين المنعكستين', true, null, 'wave'),
    TG('scale', 'مقياس سمك الغشاء', true, null, 'energy'),
    TG('labels', 'التسميات والقيم', true, null, 'labels')
  ]);
  const SRC = ['white', 589, 633, 470];
  const refl = (n, t, nm) => Math.cos(Math.PI * (2 * n * t / nm + .5)) ** 2;
  const tmax = S => S.p.tmax * (S.p.drain ? (.6 + .4 * Math.cos(S.t * .25)) : 1);
  const colAt = (S, t) => { const p = S.p; if (p.src === 'white') { const s = [0, 0, 0]; for (let nm = 400; nm <= 700; nm += 20) { const v = refl(p.n, t, nm), q = wlRGB(nm); s[0] += q[0] * v; s[1] += q[1] * v; s[2] += q[2] * v; } return s.map(v => v / 6.2); } const v = refl(p.n, t, +p.src); return wlRGB(+p.src).map(q => q * v); };
  const geo = S => {
    const w = S.W || 800, h = S.H || 600, cx = w * .27, cy = h * .43, R0 = Math.min(w * .19, h * .3), rx = R0 * .8, ry = R0, tl = S.tilt || 0;
    const H = Math.sqrt((ry * Math.cos(tl)) ** 2 + (rx * Math.sin(tl)) ** 2); const rot = (x, y) => [cx + x * Math.cos(tl) - y * Math.sin(tl), cy + x * Math.sin(tl) + y * Math.cos(tl)];
    const pp = S.pp || (S.pp = { x: .12, y: .45 }); const P = [cx + pp.x * R0, cy + pp.y * R0];
    return { w, h, cx, cy, R0, rx, ry, tl, H, rot, P, stem: rot(0, ry + 92), px0: w * .52, py0: 50, pw: w - w * .52 - 22, ph: h * .42 };
  };
  const thick = (S, g, y) => tmax(S) * Math.pow(clamp((y - (g.cy - g.H)) / (2 * g.H), 0, 1), 1.4);
  E.thick = (S, u) => tmax(S) * Math.pow(u, 1.4);
  E.setup = S => { S.k = 0; S.tilt = 0; S.pp = { x: .12, y: .45 }; };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h, false); const p = S.p, g = geo(S); const mono = p.src !== 'white', lam = mono ? +p.src : 550; const lc = a => mono ? wlColor(lam, a) : `rgba(255,255,255,${a})`;
    // film (bands stay horizontal: thickness depends on height because of gravity)
    ctx.save(); ctx.beginPath(); ctx.ellipse(g.cx, g.cy, g.rx, g.ry, g.tl, 0, TAU); ctx.clip();
    for (let y = g.cy - g.H - 1; y < g.cy + g.H + 1; y += 2) { ctx.fillStyle = rgb(colAt(S, thick(S, g, y))); ctx.fillRect(g.cx - g.R0 * 1.2, y, g.R0 * 2.4, 2.4); }
    ctx.restore();
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(g.cx, g.cy, g.rx, g.ry, g.tl, 0, TAU); ctx.stroke();
    const b0 = g.rot(0, g.ry); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(b0[0], b0[1]); ctx.lineTo(g.stem[0], g.stem[1]); ctx.stroke(); ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.arc(g.stem[0], g.stem[1], 11, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 2; ctx.stroke();
    if (on(p, 'labels')) { G.text(ctx, 'الجزء الأرق (أعلى) — مظلم', g.cx, g.cy - g.H - 16, { s: 11, c: '#cbd5e1' }); G.text(ctx, 'الجزء الأسمك (أسفل)', g.cx + g.R0 * .1, g.cy + g.H + 16, { s: 11, c: '#cbd5e1' }); if (Math.abs(g.tl) > .05) G.text(ctx, 'الحزم تبقى أفقية لأن الجاذبية تحدد السمك', g.cx, g.stem[1] + 26, { s: 11, c: '#86efac' }); }
    // thickness ruler
    if (on(p, 'scale')) {
      const x = g.cx + g.R0 * .84 + 22; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, g.cy - g.H); ctx.lineTo(x, g.cy + g.H); ctx.stroke();
      const tm = tmax(S), stp = tm > 1200 ? 500 : tm > 500 ? 200 : 100;
      for (let t = 0; t <= tm + 1; t += stp) { const y = g.cy - g.H + 2 * g.H * Math.pow(t / tm, 1 / 1.4); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6, y); ctx.stroke(); G.text(ctx, t + '', x + 10, y, { s: 10, a: 'left', c: '#cbd5e1', mono: 1 }); }
      G.text(ctx, 't (nm)', x + 6, g.cy - g.H - 14, { s: 10, c: '#94a3b8' });
    }
    // probe (magnifier) on the film
    const P = g.P, t = thick(S, g, P[1]); S.tloc = t;
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(P[0], P[1], 13, 0, TAU); ctx.stroke(); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(P[0] - 6, P[1]); ctx.lineTo(P[0] + 6, P[1]); ctx.moveTo(P[0], P[1] - 6); ctx.lineTo(P[0], P[1] + 6); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(P[0] + 13, P[1]); ctx.lineTo(g.px0, g.py0 + g.ph * .6); ctx.stroke(); ctx.setLineDash([]);
    // cross-section (book fig. 11)
    const { px0, py0, pw, ph } = g; panel(ctx, px0, py0, pw, ph, { title: 'مقطع مكبّر للغشاء عند المكبّرة' });
    const n = p.n, tp = 16 + Math.min(t, 2000) / 2000 * 70, sy = py0 + ph * .5, xa = px0 + 14, xb = px0 + pw - 14;
    ctx.fillStyle = 'rgba(147,197,253,.22)'; ctx.fillRect(xa, sy, xb - xa, tp); ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(xa, sy); ctx.lineTo(xb, sy); ctx.moveTo(xa, sy + tp); ctx.lineTo(xb, sy + tp); ctx.stroke();
    G.text(ctx, 'هواء', xa + 24, sy - 12, { s: 10, c: '#94a3b8' }); G.text(ctx, 'غشاء n = ' + fmt(n, 3), xa + 50, sy + tp / 2, { s: 11, w: 800, c: '#bfdbfe' }); G.text(ctx, 'هواء', xa + 24, sy + tp + 12, { s: 10, c: '#94a3b8' });
    const lampX = px0 + 36, lampY = py0 + 44; const ai = rad(28), ar = Math.asin(Math.sin(ai) / n); const A = [px0 + pw * .38, sy]; const B = [A[0] + Math.tan(ar) * tp, sy + tp], C = [B[0] + Math.tan(ar) * tp, sy];
    const inc0 = [A[0] - Math.tan(ai) * (sy - lampY), lampY];
    // lamp (click to change the source)
    G.glow(ctx, inc0[0], inc0[1], 22, mono ? wlColor(lam, 'A') : 'rgba(255,255,255,A)', .5); ctx.fillStyle = lc(1); ctx.beginPath(); ctx.arc(inc0[0], inc0[1], 9, 0, TAU); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.stroke();
    if (on(p, 'labels')) G.text(ctx, mono ? lam + ' nm' : 'أبيض', inc0[0], inc0[1] - 18, { s: 10, w: 800, c: '#e2e8f0' });
    if (on(p, 'rays')) {
      const up = .8 * (sy - lampY); G.arrow(ctx, inc0[0], inc0[1], A[0], A[1], lc(.95), 2.4, 9);
      const e1 = [A[0] + Math.tan(ai) * up, sy - up], e2 = [C[0] + Math.tan(ai) * up, sy - up];
      G.arrow(ctx, A[0], A[1], e1[0], e1[1], '#fb923c', 2.4, 9); ctx.strokeStyle = lc(.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.lineTo(C[0], C[1]); ctx.stroke(); G.arrow(ctx, C[0], C[1], e2[0], e2[1], '#22d3ee', 2.4, 9);
      G.text(ctx, '1', e1[0] - 8, e1[1] + 6, { s: 12, w: 900, c: '#fb923c' }); G.text(ctx, '2', e2[0] + 10, e2[1] + 6, { s: 12, w: 900, c: '#22d3ee' });
      // eye
      const ex = (e1[0] + e2[0]) / 2 + 26, ey = e1[1] - 8; ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(ex, ey, 14, 8, -.6, 0, TAU); ctx.stroke(); ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(ex - 3, ey + 2, 3, 0, TAU); ctx.fill();
      if (on(p, 'labels')) {
        G.text(ctx, 'انقلاب طور π', A[0] - 10, sy - 26, { s: 11, w: 800, a: 'right', c: '#fca5a5' });
        G.text(ctx, 'لا انقلاب', B[0], sy + tp + 14, { s: 10, c: '#86efac' });
        OPTK.dim(ctx, xb - 16, sy, xb - 16, sy + tp, ''); G.text(ctx, 't = ' + Math.round(t) + ' nm', xb - 24, sy + tp / 2, { s: 11, w: 800, a: 'right', c: '#e2e8f0' });
      }
    }
    // superposition of the two reflected waves (or reflectance spectrum for white light)
    if (on(p, 'waves')) {
      const wy0 = py0 + ph + 12, wh = Math.max(110, h - 92 - wy0); panel(ctx, px0, wy0, pw, wh, { title: mono ? 'الموجتان المنعكستان ومحصلتهما' : 'نسبة الانعكاس لكل لون عند هذا السمك' });
      if (mono) {
        const x0 = px0 + 14, x1 = px0 + pw - 14, rowH = (wh - 36) / 3, ph0 = S.t * 5, kx = TAU / 60; const dphi = TAU * 2 * n * t / lam + Math.PI; const Rr = Math.cos(dphi / 2) ** 2;
        const tr = (yc, f, col, lw) => { ctx.strokeStyle = 'rgba(148,163,184,.3)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, yc); ctx.lineTo(x1, yc); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); for (let x = x0; x <= x1; x += 2) { const v = f(kx * (x - x0) - ph0); x === x0 ? ctx.moveTo(x, yc - v) : ctx.lineTo(x, yc - v); } ctx.stroke(); };
        const a = rowH * .3; const r1y = wy0 + 26 + rowH * .5, r2y = r1y + rowH, r3y = r2y + rowH;
        tr(r1y, u => a * Math.sin(u + Math.PI), '#fb923c', 2); tr(r2y, u => a * Math.sin(u - TAU * 2 * n * t / lam), '#22d3ee', 2); tr(r3y, u => a * (Math.sin(u + Math.PI) + Math.sin(u - TAU * 2 * n * t / lam)) * .55, '#f8fafc', 2.6);
        G.text(ctx, '1: من السطح الأمامي (+π)', x0 + 2, r1y - a - 8, { s: 10, a: 'left', c: '#fb923c' }); G.text(ctx, '2: من السطح الخلفي (+2nt)', x0 + 2, r2y - a - 8, { s: 10, a: 'left', c: '#22d3ee' });
        const fr = 2 * n * t / lam + .5; G.text(ctx, '2nt + λ/2 = ' + fmt(fr, 3) + 'λ ⇐ ' + (Rr > .85 ? 'بنّاء: مضيء' : Rr < .15 ? 'إتلافي: مظلم' : 'جزئي'), x0 + 2, r3y - a - 8, { s: 11, w: 800, a: 'left', c: Rr > .85 ? '#86efac' : Rr < .15 ? '#fca5a5' : '#fdba74' });
      } else {
        const x0 = px0 + 20, x1 = px0 + pw - 70, bb = wy0 + wh - 22, bh = wh - 56, N = 16, bw = (x1 - x0) / N;
        for (let i = 0; i < N; i++) { const nm = 400 + i * 20, v = refl(n, t, nm); ctx.fillStyle = wlColor(nm); ctx.fillRect(x0 + i * bw + 1, bb - v * bh, bw - 2, v * bh); }
        ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, bb); ctx.lineTo(x1, bb); ctx.stroke(); G.text(ctx, '400', x0, bb + 10, { s: 9, c: '#94a3b8', mono: 1 }); G.text(ctx, '700 nm', x1 - 8, bb + 10, { s: 9, c: '#94a3b8', mono: 1 });
        ctx.fillStyle = rgb(colAt(S, t)); rr(ctx, x1 + 12, bb - bh * .8, 44, 44, 8); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.stroke(); G.text(ctx, 'اللون', x1 + 34, bb - bh * .8 - 10, { s: 10, c: '#cbd5e1' });
      }
    }
  };
  E.drags = S => {
    const g = geo(S), p = S.p; const inside = (x, y) => { const dx = x - g.cx, dy = y - g.cy, u = dx * Math.cos(g.tl) + dy * Math.sin(g.tl), v = -dx * Math.sin(g.tl) + dy * Math.cos(g.tl); return (u / g.rx) ** 2 + (v / g.ry) ** 2 <= 1; };
    const lampX = g.px0 + g.pw * .38 - Math.tan(rad(28)) * (g.py0 + g.ph * .5 - g.py0 - 44);
    return [
      { id: 'film', x: g.cx - g.R0 * .3, y: g.cy - g.R0 * .3, hit: inside, axis: 'y', tip: 'اسحب الغشاء لأعلى/لأسفل لتغيير أكبر سمك (أو عجلة الفأرة)', idle: 'اسحب لتغيير السمك ✋', drag: (S, d) => setParam(S, 'tmax', S.p.tmax - d.dy * 5), wheel: (S, s) => setParam(S, 'tmax', S.p.tmax + 20 * s) },
      { id: 'probe', x: g.P[0], y: g.P[1], r: 15, axis: 'xy', tip: 'اسحب المكبّرة لرؤية المقطع والسمك في تلك النقطة', drag: (S, d) => { let x = d.ox + d.x - d.sx, y = d.oy + d.y - d.sy; if (!inside(x, y)) return; S.pp = { x: (x - g.cx) / g.R0, y: (y - g.cy) / g.R0 }; } },
      { id: 'tilt', cx: g.cx, cy: g.cy, x: g.stem[0], y: g.stem[1], r: 16, tip: 'دوّر الحلقة من مقبضها: الحزم تبقى أفقية', drag: (S, d) => { S.tilt = clamp((S.tilt || 0) + d.dang, -1.1, 1.1); } },
      { id: 'lamp', x: lampX, y: g.py0 + 44, r: 16, hint: false, tip: 'انقر لتغيير مصدر الضوء (أبيض / أصفر / أحمر / أزرق)', click: S => { const i = SRC.findIndex(v => v == S.p.src); setParam(S, 'src', SRC[(i + 1) % SRC.length]); } }
    ];
  };
  const r0 = E.readings;
  E.readings = S => { const p = S.p, t = S.tloc || 0, nm = p.src === 'white' ? 550 : +p.src; const fr = 2 * p.n * t / nm + .5; const R = refl(p.n, t, nm); return [rd('السمك عند المكبّرة t', fmt(t, 4, 'nm')), rd('المسار الإضافي 2nt', fmt(2 * p.n * t, 4, 'nm')), rd('(2nt + λ/2)/λ' + (p.src === 'white' ? ' عند 550nm' : ''), fmt(fr, 3)), rd('الانعكاس عند هذه النقطة', p.src === 'white' ? 'لون مركّب (انظر مخطط الألوان)' : R > .85 ? 'مضيء (بنّاء)' : R < .15 ? 'مظلم (إتلافي)' : 'جزئي', 1)].concat(r0.call(E, S)); };
  E.explain = S => { const t = S.tloc || 0; return `عند المكبّرة سمك الغشاء <b>${Math.round(t)} nm</b>. الشعاع (1) ينعكس عن السطح الأمامي مع <b>انقلاب طور π</b>، والشعاع (2) يقطع مساراً إضافياً <b>2nt = ${Math.round(2 * S.p.n * t)} nm</b>. يتحدد اللون المنعكس بالأطوال الموجية التي تتداخل تداخلاً بنّاءً عند هذا السمك.`; };
  E.howto = 'اسحب <b>المكبّرة</b> على الغشاء لرؤية المقطع المكبّر (الشكل 11) والشعاعين المنعكسين وتراكب موجتيهما. اسحب <b>الغشاء</b> عمودياً لتغيير سمكه، ودوّر الحلقة من <b>مقبضها</b>، وانقر <b>المصباح</b> في المقطع لتغيير اللون.';
})();

/* =============================== 4. SINGLE SLIT DIFFRACTION =============================== */
(() => {
  const E = EXPS.find(e => e.id === 'single_slit'); if (!E) return;
  const { on, panel, spec, specDrag, dim, arcA } = OPTK;
  E.controls = E.controls.concat([
    TG('waves', 'جبهات الموجة (الساقطة والحائدة)', true, null, 'wave'),
    TG('huy', 'مويجات هايكنز من نقاط الشق', true, null, 'dot'),
    TG('pair', 'حجة الأزواج (نصفا الشق)', true, null, 'vector'),
    TG('phasor', 'مخطط المتجهات الطورية', false, null, 'energy'),
    TG('front', 'منظر الهدب على الشاشة (الشكل 12)', true, null, 'eye'),
    TG('graph', 'منحني الشدة I مقابل sinθ (الشكل 13)', true, null, 'graph'),
    TG('labels', 'التسميات والقيم', true, null, 'labels')
  ]);
  const SM = .5, K = 4; // side view: angles exaggerated ×4
  const I = (p, s) => { const b = Math.PI * p.a * 1e-6 * s / (p.lam * 1e-9); return Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2; };
  const geo = S => {
    const w = S.W || 800, h = S.H || 600, p = S.p, top = 50, sb = h * .52, cy = (top + sb) / 2, HH = (sb - top) / 2 - 2, lx = 78, sx = w * .3;
    const Lmax = w - 44 - sx, Lpx = p.L / 2 * Lmax, scx = sx + Lpx, g = 10 + (p.a - 2) / 38 * 70;
    const gy0 = h * .575, gy1 = h - 84, gx0 = w * .42, gx1 = w - 22, px0 = 72, px1 = w * .42 - 10;
    if (S.sth == null) S.sth = Math.min(.45, p.lam * 1e-9 / (p.a * 1e-6));
    const st = clamp(S.sth, -SM, SM), tn = st / Math.sqrt(1 - st * st), cyP = cy - tn * Lpx * K; // θ>0 upwards
    const gxOf = s => (gx0 + gx1) / 2 + s / SM * (gx1 - gx0) / 2;
    return { w, h, top, sb, cy, HH, lx, sx, Lmax, Lpx, scx, g, gy0, gy1, gx0, gx1, px0, px1, st, cyP, gxOf };
  };
  E.setup = S => { S.sth = null; };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h, false); const p = S.p, g = geo(S), lamM = p.lam * 1e-9, a = p.a * 1e-6; const col = al => wlColor(p.lam, al); const lp = 18 * p.lam / 600, off = (S.t * 40) % lp;
    spec(ctx, g.lx, 16, 160, 12, p.lam); G.text(ctx, 'λ = ' + Math.round(p.lam) + ' nm', g.lx + 168, 22, { s: 12, w: 800, a: 'left', c: '#fde68a' });
    // lamp + incoming plane waves
    G.glow(ctx, g.lx + 18, g.cy, 34, wlColor(p.lam, 'A'), .7); ctx.fillStyle = col(1); ctx.beginPath(); ctx.arc(g.lx + 18, g.cy, 10, 0, TAU); ctx.fill();
    ctx.fillStyle = col(.18); ctx.fillRect(g.lx + 30, g.cy - 60, g.sx - g.lx - 30, 120);
    if (on(p, 'waves')) { ctx.lineWidth = 1.5; for (let x = g.lx + 40 + off; x < g.sx; x += lp) { ctx.strokeStyle = col(.7); ctx.beginPath(); ctx.moveTo(x, g.cy - 56); ctx.lineTo(x, g.cy + 56); ctx.stroke(); } }
    // diffracted waves: arcs whose brightness follows I(θ)
    if (on(p, 'waves')) {
      ctx.save(); ctx.beginPath(); ctx.rect(g.sx + 4, g.top, g.scx - g.sx - 4, g.sb - g.top); ctx.clip(); ctx.lineWidth = 1.6;
      for (let r = off; r < g.Lpx * 1.25; r += lp) for (let k = -30; k < 30; k++) { const a0 = k / 30 * 1.3, a1 = (k + 1) / 30 * 1.3, v = I(p, Math.sin(Math.atan(Math.tan(-(a0 + a1) / 2) / K))); if (v < .01) continue; ctx.strokeStyle = col(Math.min(.9, Math.sqrt(v) * .85)); ctx.beginPath(); ctx.arc(g.sx + 4, g.cy, r, a0, a1); ctx.stroke(); }
      ctx.restore();
    }
    // slit (two jaws)
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(g.sx, g.top, 8, g.cy - g.g / 2 - g.top); ctx.fillRect(g.sx, g.cy + g.g / 2, 8, g.sb - g.cy - g.g / 2);
    ctx.fillStyle = '#cbd5e1'; [g.cy - g.g / 2 - 14, g.cy + g.g / 2 + 14].forEach(y => { rr(ctx, g.sx - 4, y - 8, 16, 16, 4); ctx.fill(); });
    if (on(p, 'huy')) { const N = 7; for (let i = 0; i < N; i++) { const y = g.cy - g.g / 2 + (i + .5) * g.g / N; ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(g.sx + 4, y, 2.6, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(253,230,138,.55)'; ctx.lineWidth = 1; for (let r = off; r < 3 * lp; r += lp) { ctx.beginPath(); ctx.arc(g.sx + 4, y, r, -Math.PI / 2, Math.PI / 2); ctx.stroke(); } } }
    // screen with pattern (true angles: y = L tanθ)
    for (let y = g.top; y < g.sb; y += 1) { const tn = (g.cy - y) / (g.Lpx * K), s = tn / Math.sqrt(1 + tn * tn), v = Math.pow(I(p, s), .6); const c = wlRGB(p.lam); ctx.fillStyle = `rgb(${c.map(q => Math.round(q * v)).join(',')})`; ctx.fillRect(g.scx, y, 16, 1.2); }
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.strokeRect(g.scx - .5, g.top - .5, 17, g.sb - g.top + 1);
    // rays from slit edges to the cursor point
    const Py = clamp(g.cyP, g.top, g.sb); const kq = a * g.st / lamM; const fr = kq - Math.round(kq); const dark = Math.abs(fr) < .1 && Math.round(kq) !== 0, cen = Math.abs(kq) < .12;
    const kc = cen ? '#fde68a' : dark ? '#f87171' : Math.abs(Math.abs(fr) - .5) < .15 ? '#4ade80' : '#fb923c';
    ctx.strokeStyle = 'rgba(226,232,240,.6)'; ctx.lineWidth = 1; [-1, 0, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(g.sx + 4, g.cy + k * g.g / 2); ctx.lineTo(g.scx, Py); ctx.stroke(); });
    ctx.strokeStyle = 'rgba(203,213,225,.45)'; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(g.sx + 4, g.cy); ctx.lineTo(g.scx, g.cy); ctx.stroke(); ctx.setLineDash([]);
    const aa = Math.atan2(Py - g.cy, g.scx - g.sx); arcA(ctx, g.sx + 4, g.cy, 54, 0, aa, '#e2e8f0'); G.text(ctx, 'θ', g.sx + 70 * Math.cos(aa / 2) + 4, g.cy + 70 * Math.sin(aa / 2), { s: 12, w: 900 });
    ctx.fillStyle = kc; ctx.beginPath(); ctx.arc(g.scx + 8, Py, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    if (on(p, 'labels')) {
      G.text(ctx, 'ℓ = ' + fmt(p.a, 3) + ' µm', g.sx - 10, g.cy - g.g / 2 - 30, { s: 11, w: 800, a: 'right', c: '#fde68a' });
      G.text(ctx, '(الزوايا في الرسم مكبّرة 4 مرات)', (g.sx + g.scx) / 2, g.top - 8, { s: 10, c: 'rgba(203,213,225,.6)' }); dim(ctx, g.sx + 4, g.sb + 14, g.scx, g.sb + 14, 'L = ' + fmt(p.L, 3) + ' m', '#cbd5e1', { bg: 'rgba(15,23,42,.9)' });
      G.text(ctx, 'y = L tanθ = ' + fmtSI(p.L * g.st / Math.sqrt(1 - g.st * g.st), 'm'), clamp(g.scx - 12, 150, w), Py < g.top + 24 ? Py + 18 : Py - 16, { s: 11, w: 800, a: 'right', c: kc, bg: 'rgba(15,23,42,.8)' });
    }
    // pairing argument (magnified slit)
    if (on(p, 'pair')) {
      const x0 = g.px0, y0 = g.gy0, pw = g.px1 - x0, ph = g.gy1 - y0; panel(ctx, x0, y0, pw, ph, { title: 'الشق مكبّراً: تقسيمه إلى نصفين' });
      const sxm = x0 + 34, yA = y0 + 34, yB = y0 + ph - 62, lpx = yB - yA, th = Math.asin(g.st), dx = Math.cos(th), dy = -Math.sin(th), Lr = pw - 60; const cols = ['#f472b6', '#a78bfa', '#38bdf8', '#34d399'];
      ctx.fillStyle = '#64748b'; ctx.fillRect(sxm - 5, y0 + 24, 6, yA - y0 - 24); ctx.fillRect(sxm - 5, yB, 6, 12);
      ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(sxm - 12, (yA + yB) / 2); ctx.lineTo(sxm + 12, (yA + yB) / 2); ctx.stroke(); ctx.setLineDash([]);
      for (let i = 0; i < 4; i++) [0, 1].forEach(hf => { const y = yA + (hf * 4 + i + .5) * lpx / 8; ctx.strokeStyle = cols[i]; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(sxm, y); ctx.lineTo(sxm + dx * Lr, y + dy * Lr); ctx.stroke(); ctx.fillStyle = cols[i]; ctx.beginPath(); ctx.arc(sxm, y, 3.5, 0, TAU); ctx.fill(); G.text(ctx, (i + 1) + (hf ? '′' : ''), sxm - 14, y, { s: 10, w: 900, c: cols[i] }); });
      // perpendicular from the top edge onto the bottom-edge ray; Δ = ℓ sinθ
      const A = [sxm, yA], Bp = [sxm, yB]; const tproj = (A[0] - Bp[0]) * dx + (A[1] - Bp[1]) * dy; const F = [Bp[0] + dx * tproj, Bp[1] + dy * tproj];
      if (Math.abs(tproj) > 1) { ctx.strokeStyle = 'rgba(226,232,240,.8)'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(F[0], F[1]); ctx.stroke(); ctx.setLineDash([]); ctx.strokeStyle = '#f97316'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(Bp[0], Bp[1]); ctx.lineTo(F[0], F[1]); ctx.stroke(); }
      const half = kq / 2; const tx = x0 + pw - 10;
      G.text(ctx, 'ℓ sinθ = ' + fmt(kq, 3) + ' λ', tx, y0 + ph - 42, { s: 12, w: 800, a: 'right', c: '#fb923c' });
      G.text(ctx, cen ? 'كل المويجات بالطور نفسه ⇐ القمة المركزية' : dark ? 'كل زوج (1,1′)… فرقه ' + fmt(half, 2) + 'λ ⇐ يتلاشيان: هدب مظلم ✓' : 'كل زوج فرق مساره (ℓ/2)sinθ = ' + fmt(half, 2) + 'λ', tx, y0 + ph - 20, { s: 11, w: 800, a: 'right', c: kc });
    }
    // graph + front view
    if (on(p, 'graph') || on(p, 'front')) {
      const x0 = g.gx0, x1 = g.gx1, y0 = g.gy0, y1 = g.gy1; panel(ctx, x0 - 8, y0, x1 - x0 + 16, y1 - y0);
      let top = y0 + 8; if (on(p, 'front')) { const c = wlRGB(p.lam); for (let x = x0; x <= x1; x++) { const s = (x - (x0 + x1) / 2) / ((x1 - x0) / 2) * SM, v = Math.pow(I(p, s), .5); ctx.fillStyle = `rgb(${c.map(q => Math.round(q * v)).join(',')})`; ctx.fillRect(x, top, 1.2, 34); } top += 44; }
      if (on(p, 'graph')) {
        const b = y1 - 30, hh = b - top - 6; ctx.strokeStyle = 'rgba(148,163,184,.55)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, b); ctx.lineTo(x1, b); ctx.moveTo((x0 + x1) / 2, b); ctx.lineTo((x0 + x1) / 2, top); ctx.stroke();
        ctx.fillStyle = wlColor(p.lam, .35); ctx.strokeStyle = col(1); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, b); for (let x = x0; x <= x1; x++) ctx.lineTo(x, b - I(p, (x - (x0 + x1) / 2) / ((x1 - x0) / 2) * SM) * hh); ctx.lineTo(x1, b); ctx.fill(); ctx.stroke();
        const u = lamM / a; const sp = u / SM * (x1 - x0) / 2; if (sp > 16) for (let m = -6; m <= 6; m++) { if (!m) continue; const x = g.gxOf(m * u); if (x < x0 || x > x1) continue; ctx.strokeStyle = 'rgba(203,213,225,.35)'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(x, b); ctx.lineTo(x, top + 12); ctx.stroke(); ctx.setLineDash([]); if (on(p, 'labels') && (sp > 34 || Math.abs(m) <= 2)) G.text(ctx, (m < 0 ? '−' : '') + (Math.abs(m) === 1 ? '' : Math.abs(m)) + 'λ/ℓ', x, b + 10, { s: 10, c: '#cbd5e1' }); }
        G.text(ctx, 'sinθ', x0 + 14, b + 20, { s: 10, c: '#94a3b8' }); G.text(ctx, 'I', (x0 + x1) / 2 - 10, top + 6, { s: 11, w: 800, c: '#94a3b8' });
      }
      const cx = g.gxOf(g.st); ctx.strokeStyle = kc; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, y0 + 6); ctx.lineTo(cx, y1 - 26); ctx.stroke(); ctx.fillStyle = kc; ctx.beginPath(); ctx.moveTo(cx, y1 - 26); ctx.lineTo(cx - 7, y1 - 14); ctx.lineTo(cx + 7, y1 - 14); ctx.closePath(); ctx.fill();
      G.text(ctx, 'sinθ = ' + fmt(g.st, 3) + '  I/I₀ = ' + (I(p, g.st) * 100).toFixed(1) + '%', clamp(cx, x0 + 90, x1 - 90), y0 - 12, { s: 11, w: 800, c: kc, bg: 'rgba(15,23,42,.85)' });
    }
    if (on(p, 'phasor')) {
      const bw = 136, bx = g.gx1 - bw - 4, by = g.gy0 + (on(p, 'front') ? 50 : 6); panel(ctx, bx, by, bw, bw, { title: 'المتجهات الطورية' });
      const N = 20, Lc = 100, beta = TAU * kq; const pts = [[0, 0]]; let ang = -beta / 2; for (let i = 0; i < N; i++) { const q = pts[i]; pts.push([q[0] + Lc / N * Math.cos(ang), q[1] - Lc / N * Math.sin(ang)]); ang += beta / N; }
      const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]); const ox = bx + bw / 2 - (Math.min(...xs) + Math.max(...xs)) / 2, oy = by + bw / 2 + 8 - (Math.min(...ys) + Math.max(...ys)) / 2;
      ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.5; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(ox + q[0], oy + q[1]) : ctx.moveTo(ox + q[0], oy + q[1])); ctx.stroke();
      const e = pts[N]; if (Math.hypot(e[0], e[1]) > 3) G.arrow(ctx, ox, oy, ox + e[0], oy + e[1], '#f87171', 2.4, 8); else G.text(ctx, 'المحصلة = 0', bx + bw / 2, by + bw - 12, { s: 10, c: '#f87171' });
    }
  };
  E.drags = S => {
    const g = geo(S), p = S.p; const setG = gg => setParam(S, 'a', 2 + (gg - 10) / 70 * 38); const setS = s => { S.sth = clamp(s, -SM, SM); };
    return [
      { id: 'cur', x: g.scx + 8, y: clamp(g.cyP, g.top, g.sb), r: 13, axis: 'y', tip: 'اسحب المؤشر على الشاشة لتغيير الزاوية θ', idle: 'اسحب المؤشر ✋', drag: (S, d) => { const tn = (g.cy - (d.oy + d.y - d.sy)) / (g.Lpx * K); setS(tn / Math.sqrt(1 + tn * tn)); } },
      { id: 'gcur', x: g.gxOf(g.st), y: g.gy1 - 20, w: 22, h: 30, hit: (x, y) => x > g.gx0 - 6 && x < g.gx1 + 6 && y > g.gy0 && y < g.gy1, axis: 'x', hint: false, tip: 'اسحب المؤشر على منحني الشدة', drag: (S, d) => setS((d.x - (g.gx0 + g.gx1) / 2) / ((g.gx1 - g.gx0) / 2) * SM) },
      { id: 'jawB', x: g.sx + 4, y: g.cy + g.g / 2 + 14, w: 18, h: 18, axis: 'y', tip: 'اسحب فكّ الشق لتغيير عرض الشق ℓ', drag: (S, d) => setG(2 * ((d.oy + d.y - d.sy) - 14 - g.cy)) },
      { id: 'jawT', x: g.sx + 4, y: g.cy - g.g / 2 - 14, w: 18, h: 18, axis: 'y', hint: false, tip: 'اسحب فكّ الشق لتغيير عرض الشق ℓ', drag: (S, d) => setG(2 * (g.cy - (d.oy + d.y - d.sy) - 14)) },
      specDrag('lam', g.lx, 16, 160, 12, p.lam),
      { id: 'screen', x: g.scx + 8, y: g.top + 30, hit: (x, y) => Math.abs(x - g.scx - 8) < 14 && y > g.top && y < g.sb && Math.abs(y - clamp(g.cyP, g.top, g.sb)) > 16, axis: 'x', tip: 'اسحب الشاشة لتغيير بعدها L', drag: (S, d) => setParam(S, 'L', 2 * (d.ox + d.x - d.sx - 8 - g.sx) / g.Lmax) }
    ];
  };
  const r0 = E.readings;
  E.readings = S => { const p = S.p, g = geo(S); const kq = p.a * 1e-6 * g.st / (p.lam * 1e-9); return r0.call(E, S).concat([rd('عند المؤشر: sinθ', fmt(g.st, 3)), rd('ℓ sinθ', fmt(kq, 3) + ' λ'), rd('الشدة النسبية I/I₀', (I(p, g.st) * 100).toFixed(1) + ' %')]); };
  E.explain = S => { const p = S.p, g = geo(S), kq = p.a * 1e-6 * g.st / (p.lam * 1e-9); const f = kq - Math.round(kq); return Math.abs(kq) < .12 ? `في الاتجاه الأمامي تصل مويجات جميع نقاط الشق <b>بالطور نفسه</b> فتتكون القمة المركزية العريضة. كلما ضاق الشق اتسعت.` : Math.abs(f) < .1 ? `ℓ sinθ = ${Math.round(kq)}λ: نقسم الشق إلى ${2 * Math.abs(Math.round(kq))} أجزاء، وكل نقطة في جزء تقابلها نقطة في الجزء المجاور <b>فرق مسارها λ/2</b> فتتلاشيان ⇐ <b>هدب مظلم</b>.` : `ℓ sinθ = ${fmt(kq, 3)}λ: الإلغاء غير تام ⇐ شدة ${Math.round(I(p, g.st) * 100)}% من القمة المركزية.`; };
  E.howto = 'اسحب <b>فكّي الشق</b> لتغيير عرضه ℓ، والمؤشر على <b>الطيف</b> لتغيير λ، و<b>الشاشة</b> لتغيير بعدها. اسحب <b>المؤشر</b> على الشاشة (أو على المنحني) إلى أول هدب مظلم ولاحظ حجة الأزواج: كل نقطتين متقابلتين في نصفي الشق فرق مسارهما λ/2.';
})();

/* =============================== 5. DIFFRACTION GRATING + SPECTROMETER =============================== */
(() => {
  const E = EXPS.find(e => e.id === 'grating'); if (!E) return;
  const { on, panel, dim, arcA } = OPTK;
  E.controls = E.controls.concat([
    TG('rays', 'حزم الحيود (المراتب m)', true, null, 'ray'),
    TG('scale', 'تدريج المطياف (المنقلة)', true, null, 'grid'),
    TG('view', 'منظر العدسة العينية للمنظار', true, null, 'eye'),
    TG('geo', 'تكبير المحزز: d sinθ = mλ', true, null, 'vector'),
    TG('labels', 'التسميات والقيم', true, null, 'labels')
  ]);
  const SRCS = [632.8, 532, 405, 'H', 'W'];
  const geo = S => { const w = S.W || 800, h = S.H || 600, cx = w * .43, cy = h * .47, R0 = Math.min(w * .5, h * .41); const t = rad(S.tel || 0); return { w, h, cx, cy, R0, tel: S.tel || 0, te: [cx + Math.cos(t) * R0 * .9, cy - Math.sin(t) * R0 * .9], lampX: Math.max(100, cx - R0 * .95) }; };
  const beams = S => { const d = .01 / S.p.N; const L = E.lines(S); const out = []; L.forEach(l => { for (let m = -4; m <= 4; m++) { const s = m * l * 1e-9 / d; if (Math.abs(s) < 1) out.push({ l, m, th: deg(Math.asin(s)) }); } }); return out; };
  const aligned = S => { let best = null; beams(S).forEach(b => { if (b.m === 0) return; const e = Math.abs(b.th - (S.tel || 0)); if (e < .35 && (!best || e < best.e)) best = { ...b, e }; }); return best; };
  E.setup = S => { S.tel = 12; };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h, false); const p = S.p, g = geo(S), d = .01 / p.N, white = p.src === 'W'; const { cx, cy, R0 } = g;
    // spectrometer table + protractor
    ctx.fillStyle = 'rgba(51,65,85,.35)'; ctx.beginPath(); ctx.arc(cx, cy, R0 * .38, 0, TAU); ctx.fill();
    if (on(p, 'scale')) {
      ctx.strokeStyle = 'rgba(203,213,225,.45)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, R0, -Math.PI / 2, Math.PI / 2); ctx.stroke();
      for (let a = -90; a <= 90; a += 2) { const t = rad(a), l = a % 10 ? 5 : 11; ctx.strokeStyle = a % 10 ? 'rgba(203,213,225,.35)' : 'rgba(203,213,225,.75)'; ctx.beginPath(); ctx.moveTo(cx + Math.cos(t) * (R0 - l), cy - Math.sin(t) * (R0 - l)); ctx.lineTo(cx + Math.cos(t) * R0, cy - Math.sin(t) * R0); ctx.stroke(); if (a % 30 === 0) G.text(ctx, a + '°', cx + Math.cos(t) * (R0 + 18), cy - Math.sin(t) * (R0 + 18), { s: 10, c: '#94a3b8', mono: 1 }); }
    }
    // lamp + collimator
    const lx = g.lampX; const lamC = white ? '#fff' : p.src === 'H' ? '#f0abfc' : wlColor(+p.src);
    G.glow(ctx, lx, cy, 30, white ? 'rgba(255,255,255,A)' : p.src === 'H' ? 'rgba(240,171,252,A)' : wlColor(+p.src, 'A'), .8); ctx.fillStyle = lamC; ctx.beginPath(); ctx.arc(lx, cy, 11, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#475569'; ctx.fillRect(lx + 20, cy - 9, cx - R0 * .38 - lx - 20, 18); ctx.fillStyle = lamC; ctx.globalAlpha = .7; ctx.fillRect(cx - R0 * .38, cy - 3, R0 * .38 - 4, 6); ctx.globalAlpha = 1;
    if (on(p, 'labels')) { G.text(ctx, 'المصدر (انقر للتبديل)', lx + 10, cy + 30, { s: 10, c: '#cbd5e1' }); G.text(ctx, 'المسدِّد', (lx + cx - R0 * .38) / 2 + 10, cy - 18, { s: 10, c: '#94a3b8' }); }
    // diffracted beams
    if (on(p, 'rays')) {
      beams(S).forEach(b => { const t = rad(b.th); ctx.strokeStyle = b.m === 0 ? (white ? '#fff' : wlColor(b.l, .95)) : wlColor(b.l, white ? .45 : .9); ctx.lineWidth = white ? 1.5 : 2.4; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(t) * R0 * .97, cy - Math.sin(t) * R0 * .97); ctx.stroke(); });
      if (on(p, 'labels')) { const done = {}; beams(S).forEach(b => { if (done[b.m] || (white && b.l < 540) ) return; done[b.m] = 1; const t = rad(b.th); G.text(ctx, 'm=' + b.m, cx + Math.cos(t) * R0 * .66, cy - Math.sin(t) * R0 * .66 - 10, { s: 11, w: 800, c: '#e2e8f0', bg: 'rgba(15,23,42,.75)' }); }); }
    }
    // grating
    ctx.fillStyle = 'rgba(148,163,184,.9)'; ctx.fillRect(cx - 3, cy - 42, 6, 84); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1; for (let y = cy - 40; y < cy + 40; y += 3) { ctx.beginPath(); ctx.moveTo(cx - 3, y); ctx.lineTo(cx + 3, y); ctx.stroke(); }
    if (on(p, 'labels')) G.text(ctx, Math.round(p.N / 10) + ' lines/mm', cx, cy + 60, { s: 11, w: 800, c: '#e2e8f0', bg: 'rgba(15,23,42,.75)' });
    // telescope
    const t = rad(g.tel), ca = Math.cos(t), sa = Math.sin(t), r1 = R0 * .45, r2 = R0 * .9; const nx = -sa, ny = -ca;
    ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(cx + ca * r1 + nx * 11, cy - sa * r1 + ny * 11); ctx.lineTo(cx + ca * r2 + nx * 8, cy - sa * r2 + ny * 8); ctx.lineTo(cx + ca * r2 - nx * 8, cy - sa * r2 - ny * 8); ctx.lineTo(cx + ca * r1 - nx * 11, cy - sa * r1 - ny * 11); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(g.te[0], g.te[1], 10, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.stroke();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx + ca * (R0 - 14), cy - sa * (R0 - 14)); ctx.lineTo(cx + ca * (R0 + 4), cy - sa * (R0 + 4)); ctx.stroke();
    if (!on(p, 'view')) G.text(ctx, 'θ = ' + fmt(g.tel, 4) + '°', cx + ca * R0 * .6 - sa * 24, cy - sa * R0 * .6 - ca * 24, { s: 12, w: 800, c: '#fbbf24', bg: 'rgba(15,23,42,.85)' });
    // eyepiece view
    const al = aligned(S);
    if (on(p, 'view')) {
      const vx = 150, vy = 100, vr = 66; panel(ctx, vx - vr - 10, vy - vr - 16, 2 * vr + 20, 2 * vr + 66, { title: 'ما تراه العين في المنظار' });
      ctx.save(); ctx.beginPath(); ctx.arc(vx, vy + 6, vr, 0, TAU); ctx.fillStyle = '#020617'; ctx.fill(); ctx.clip(); const FOV = 2;
      beams(S).forEach(b => { const x = vx + (g.tel - b.th) / FOV * vr; if (Math.abs(x - vx) > vr) return; ctx.fillStyle = b.m === 0 && white ? '#fff' : wlColor(b.l, .95); ctx.fillRect(x - (white ? 1 : 2), vy + 6 - vr, white ? 2 : 4, 2 * vr); });
      ctx.strokeStyle = 'rgba(226,232,240,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(vx, vy + 6 - vr); ctx.lineTo(vx, vy + 6 + vr); ctx.moveTo(vx - vr, vy + 6); ctx.lineTo(vx + vr, vy + 6); ctx.stroke(); ctx.restore();
      ctx.strokeStyle = al ? '#4ade80' : '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(vx, vy + 6, vr, 0, TAU); ctx.stroke();
      G.text(ctx, 'زاوية المنظار θ = ' + fmt(g.tel, 4) + '°', vx, vy + vr + 20, { s: 11, w: 800, c: '#fbbf24' }); G.text(ctx, al ? '✓ خط على الشعيرة: m = ' + al.m : 'دوّره حتى يقع خط على الشعيرة', vx, vy + vr + 38, { s: 10, w: 800, c: al ? '#86efac' : '#94a3b8' });
    }
    // magnified grating: d sinθ = mλ
    if (on(p, 'geo')) {
      const bw = 262, bh = 176, bx = 72, by = h - bh - 86; panel(ctx, bx, by, bw, bh, { title: 'المحزز مكبّراً (اسحب لتغيير d)' });
      const l0 = al ? al.l : (white ? 550 : E.lines(S)[0]), m0 = al ? al.m : 1, s0 = m0 * l0 * 1e-9 / d; const th = Math.abs(s0) < 1 ? Math.asin(s0) : 0;
      const dpx = 22 + (d * 1e6) * 7, gx = bx + 60, ymid = by + bh / 2 + 6, n = Math.max(2, Math.min(5, Math.floor((bh - 50) / dpx) + 1)); const ys = []; for (let i = 0; i < n; i++) ys.push(ymid + (i - (n - 1) / 2) * dpx);
      ctx.fillStyle = '#64748b'; ctx.fillRect(gx - 3, by + 28, 6, bh - 36); ctx.fillStyle = '#020617'; ys.forEach(y => ctx.fillRect(gx - 3, y - 2, 6, 4));
      const colr = wlColor(l0); ys.forEach(y => { G.arrow(ctx, bx + 14, y, gx - 6, y, 'rgba(203,213,225,.6)', 1, 5); ctx.strokeStyle = colr; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx + Math.cos(th) * 150, y - Math.sin(th) * 150); ctx.stroke(); });
      if (n >= 2 && Math.abs(th) > .01) { const yA = ys[0], yB = ys[1], tp = (yA - yB) * -Math.sin(th); const F = [gx + Math.cos(th) * tp, yB - Math.sin(th) * tp]; const up = th > 0; const P0 = up ? [gx, yA] : [gx, yB], P1 = up ? [gx, yB] : [gx, yA]; const tq = (P0[1] - P1[1]) * -Math.sin(th); const F2 = [P1[0] + Math.cos(th) * tq, P1[1] - Math.sin(th) * tq]; ctx.strokeStyle = 'rgba(226,232,240,.8)'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(P0[0], P0[1]); ctx.lineTo(F2[0], F2[1]); ctx.stroke(); ctx.setLineDash([]); ctx.strokeStyle = '#f97316'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(P1[0], P1[1]); ctx.lineTo(F2[0], F2[1]); ctx.stroke(); void F; }
      OPTK.dim(ctx, gx - 18, ys[0], gx - 18, ys[1], ''); G.text(ctx, 'd', gx - 28, (ys[0] + ys[1]) / 2, { s: 12, w: 900, c: '#e2e8f0' });
      G.text(ctx, 'd = ' + fmt(d * 1e6, 3) + ' µm', bx + bw - 12, by + bh - 34, { s: 11, w: 800, a: 'right', c: '#e2e8f0' });
      G.text(ctx, 'd sinθ = ' + m0 + 'λ (' + Math.round(l0) + ' nm)', bx + bw - 12, by + bh - 14, { s: 11, w: 800, a: 'right', c: '#fb923c' });
    }
  };
  E.drags = S => {
    const g = geo(S), p = S.p; const setN = v => setParam(S, 'N', v);
    return [
      { id: 'tel', cx: g.cx, cy: g.cy, x: g.te[0], y: g.te[1], r: 16, tip: 'دوّر المنظار حول المطياف (العجلة للضبط الدقيق)', idle: 'دوّر المنظار ✋', drag: (S, d) => { S.tel = clamp(deg(Math.atan2(g.cy - d.y, d.x - g.cx)), -88, 88); }, wheel: (S, s) => { S.tel = clamp((S.tel || 0) + .1 * s, -88, 88); } },
      { id: 'grat', x: g.cx, y: g.cy, w: 16, h: 84, axis: 'y', tip: 'اسحب المحزز لأعلى/لأسفل لتغيير عدد الخطوط (أو العجلة)', drag: (S, d) => setN(S.p.N - d.dy * 25), wheel: (S, s) => setN(S.p.N + 100 * s) },
      { id: 'mag', x: 72 + 60, y: g.h - 86 - 88, w: 60, h: 130, axis: 'y', hint: false, tip: 'اسحب الخطوط لتقريبها أو تبعيدها (يتغير d)', drag: (S, d) => setN(S.p.N - d.dy * 40) },
      { id: 'lamp', x: g.lampX, y: g.cy, r: 16, hint: false, tip: 'انقر لتبديل المصدر (ليزر / هيدروجين / أبيض)', click: S => { const i = SRCS.findIndex(v => v == S.p.src); setParam(S, 'src', SRCS[(i + 1) % SRCS.length]); } }
    ];
  };
  const r0 = E.readings;
  E.readings = S => { const al = aligned(S); const d = .01 / S.p.N; return [rd('خطوط لكل mm', Math.round(S.p.N / 10) + ''), rd('زاوية المنظار θ', fmt(S.tel || 0, 4, '°')), rd('المنظار على خط؟', al ? 'نعم: m = ' + al.m + ' ⇐ λ = d sinθ/m = ' + Math.round(d * Math.sin(rad(S.tel)) / al.m * 1e9) + ' nm' : 'لا', 1)].concat(r0.call(E, S)); };
  E.explain = S => { const al = aligned(S); return al ? `المنظار على خط المرتبة <b>m = ${al.m}</b> عند θ = ${fmt(S.tel, 3)}°. من <b>d sinθ = mλ</b>: λ = ${Math.round(.01 / S.p.N * Math.abs(Math.sin(rad(S.tel))) / Math.abs(al.m) * 1e9)} nm.` : 'دوّر المنظار حتى يقع أحد الخطوط الساطعة على الشعيرة المتصالبة، ثم اقرأ الزاوية من التدريج واحسب λ.'; };
  E.howto = 'دوّر <b>المنظار</b> من طرفه حول المطياف (عجلة الفأرة للضبط الدقيق) حتى يقع الخط على الشعيرة في نافذة العدسة العينية، ثم احسب λ من d sinθ = mλ. اسحب <b>المحزز</b> (أو خطوطه المكبّرة) لتغيير عدد الخطوط لكل mm، وانقر <b>المصدر</b> لتبديله.';
})();

/* =============================== 6. ROPE THROUGH A SLIT =============================== */
(() => {
  const E = EXPS.find(e => e.id === 'rope_pol'); if (!E) return;
  const { on, panel, dbl } = OPTK;
  E.controls[0].max = 180; E.controls[1].max = 180;
  E.controls = E.controls.concat([
    TG('auto', 'هزّ الحبل تلقائياً', true, null, 'wave'),
    TG('endv', 'منظر من طرف الحبل (اتجاه الاهتزاز)', true, null, 'eye'),
    TG('comp', 'تحليل الاهتزاز عند الشق', true, null, 'vector'),
    TG('plane', 'مستوى الاهتزاز', true, null, 'dot'),
    TG('labels', 'التسميات', true, null, 'labels')
  ]);
  const V = 280, KZ = .45, KY = .25;
  const geo = S => { const w = S.W || 800, h = S.H || 600, cy = h * .34, hx = 110, bx = w * .5, wx = w - 118, A = Math.min(h * .12, 80); const iso = (x, y, z) => [x + z * KZ, cy - y + z * KY]; const er = Math.min(62, h * .085); return { w, h, cy, hx, bx, wx, A, iso, er, ev1: [w * .3, h * .76], ev2: [w * .7, h * .76] }; };
  const fold = a => ((a % 180) + 180) % 180;
  const inv = (sx, sy) => { const z = sx / KZ; return { z, y: -(sy - KY * z) }; };
  E.setup = S => { S.buf = []; S.hy = 0; S.hz = 0; S.grab = false; };
  E.update = (S, dt) => {
    const g = geo(S), p = S.p; let y, z;
    if (S.grab && S.hd) { y = S.hd.y; z = S.hd.z; }
    else if (p.auto) { const s = g.A * Math.sin(S.t * 5.5); y = s * Math.cos(rad(p.vib)); z = s * Math.sin(rad(p.vib)); }
    else { const k = Math.exp(-4 * dt); y = (S.hy || 0) * k; z = (S.hz || 0) * k; }
    S.hy = y; S.hz = z; const b = S.buf || (S.buf = []); b.push([S.t, y, z]); const tmin = S.t - (g.wx - g.hx) / V - .3; while (b.length > 2 && b[1][0] < tmin) b.shift();
  };
  const sampler = S => { const b = S.buf || []; let i = b.length - 1; return tq => { while (i > 0 && b[i][0] > tq) i--; const q = b[i] || [0, 0, 0]; return q[0] > tq ? [0, 0] : [q[1], q[2]]; }; };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h); const p = S.p, g = geo(S), sa = rad(p.slot), va = rad(p.vib); const { iso } = g; const us = [Math.cos(sa), Math.sin(sa)];
    const trans = Math.abs(Math.cos(va - sa)); const at = sampler(S);
    const pts1 = [], pts2 = [];
    for (let x = g.hx; x <= g.wx; x += 4) { let [y, z] = at(S.t - (x - g.hx) / V); if (x > g.bx) { const k = y * us[0] + z * us[1]; y = k * us[0]; z = k * us[1]; } (x <= g.bx ? pts1 : pts2).push(iso(x, y, z)); }
    pts2.unshift(pts1[pts1.length - 1]);
    // vibration planes
    if (on(p, 'plane')) {
      const quad = (x0, x1, ang, amp, col) => { const c = Math.cos(ang), s = Math.sin(ang); const a = iso(x0, amp * c, amp * s), b = iso(x1, amp * c, amp * s), cc = iso(x1, -amp * c, -amp * s), d = iso(x0, -amp * c, -amp * s); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(cc[0], cc[1]); ctx.lineTo(d[0], d[1]); ctx.closePath(); ctx.fill(); };
      OPTK.raw(ctx, () => { if (p.auto || S.grab) quad(g.hx, g.bx, va, g.A, 'rgba(245,158,11,.13)'); if (trans > .03) quad(g.bx, g.wx, sa, g.A * trans, 'rgba(34,197,94,.13)'); });
    }
    // axis line (rope at rest)
    ctx.strokeStyle = 'rgba(100,116,139,.5)'; ctx.setLineDash([5, 5]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.hx, g.cy); ctx.lineTo(g.wx, g.cy); ctx.stroke(); ctx.setLineDash([]);
    const rope = (pts, col) => { ctx.lineJoin = 'round'; ctx.strokeStyle = '#78350f'; ctx.lineWidth = 6; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 3.6; ctx.stroke(); };
    rope(pts1, '#f59e0b');
    // barrier with slot (oblique view)
    const H = g.A * 1.7, D = g.A * 1.3; const c4 = [iso(g.bx, H, -D), iso(g.bx, H, D), iso(g.bx, -H, D), iso(g.bx, -H, -D)];
    ctx.fillStyle = 'rgba(100,116,139,.55)'; ctx.beginPath(); c4.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke();
    const Ls = g.A * 1.3, wS = 7; const sl = (k, m) => iso(g.bx, k * Ls * us[0] + m * wS * -us[1], k * Ls * us[1] + m * wS * us[0]);
    const sq = [sl(1, 1), sl(1, -1), sl(-1, -1), sl(-1, 1)]; OPTK.raw(ctx, () => { ctx.fillStyle = OPTK.book(ctx) ? '#ffffff' : '#0b1220'; ctx.beginPath(); sq.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill(); }); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.stroke();
    const hdl = iso(g.bx, Ls * 1.12 * us[0], Ls * 1.12 * us[1]); ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(hdl[0], hdl[1], 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    rope(pts2, '#fbbf24');
    // wall + hand
    ctx.fillStyle = '#64748b'; const wa = iso(g.wx, H, -D * .7), wb = iso(g.wx, H, D * .7), wc = iso(g.wx, -H, D * .7), wd = iso(g.wx, -H, -D * .7); ctx.beginPath(); ctx.moveTo(wa[0], wa[1]); ctx.lineTo(wb[0], wb[1]); ctx.lineTo(wc[0], wc[1]); ctx.lineTo(wd[0], wd[1]); ctx.closePath(); ctx.fill();
    const hp = pts1[0]; ctx.fillStyle = '#fcd34d'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(hp[0] - 12, hp[1], 16, 12, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#92400e'; ctx.fillRect(hp[0] - 44, hp[1] - 6, 20, 12);
    if (on(p, 'labels')) {
      G.text(ctx, 'اليد (اسحبها لهزّ الحبل)', hp[0] + 10, g.cy - g.A - 30, { s: 11, c: '#fcd34d' }); G.text(ctx, 'الحاجز ذو الشق', g.bx + 20, g.cy + H + 30, { s: 12, w: 800, c: '#cbd5e1' }); G.text(ctx, 'جدار', g.wx + 10, g.cy + H + 36, { s: 11, c: '#cbd5e1' });
      G.arrow(ctx, g.hx + 40, g.cy + H + 50, g.hx + 180, g.cy + H + 50, '#64748b', 2, 9); G.text(ctx, 'اتجاه انتشار الموجة', g.hx + 110, g.cy + H + 66, { s: 11, c: '#cbd5e1' });
    }
    G.text(ctx, trans > .97 ? 'مستوى الاهتزاز موازٍ للشق: تنفذ الموجة كاملة' : trans < .05 ? 'مستوى الاهتزاز عمودي على الشق: لا تنفذ الموجة' : 'تنفذ مركبة الاهتزاز الموازية للشق فقط (A cosθ)', w / 2 + 20, 24, { s: 14, w: 800, c: trans > .05 ? '#86efac' : '#fca5a5' });
    // end views
    if (on(p, 'endv')) {
      const view = (c, title) => { panel(ctx, c[0] - g.er - 60, c[1] - g.er - 28, 2 * g.er + 120, 2 * g.er + 56, { title }); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(c[0], c[1], g.er, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(c[0] - g.er, c[1]); ctx.lineTo(c[0] + g.er, c[1]); ctx.moveTo(c[0], c[1] - g.er); ctx.lineTo(c[0], c[1] + g.er); ctx.stroke(); };
      const k = g.er / g.A;
      view(g.ev1, 'قبل الشق (من طرف الحبل)');
      const b = S.buf || []; ctx.strokeStyle = 'rgba(217,119,6,.45)'; ctx.lineWidth = 2; ctx.beginPath(); let st = 0; for (let i = Math.max(0, b.length - 70); i < b.length; i++) { const x = g.ev1[0] + b[i][2] * k, y = g.ev1[1] - b[i][1] * k; st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = 1; } ctx.stroke();
      ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.arc(g.ev1[0] + (S.hz || 0) * k, g.ev1[1] - (S.hy || 0) * k, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      G.text(ctx, 'اسحب النقطة لتهزّ الحبل', g.ev1[0], g.ev1[1] + g.er + 16, { s: 10, c: '#94a3b8' });
      view(g.ev2, 'عند الشق وبعده');
      const c = g.ev2, L = g.er * .92; OPTK.raw(ctx, () => { ctx.save(); ctx.translate(c[0], c[1]); ctx.rotate(sa); ctx.fillStyle = 'rgba(71,85,105,.55)'; ctx.fillRect(-L - 6, -L - 6, 2 * L + 12, 2 * L + 12); ctx.fillStyle = OPTK.book(ctx) ? '#ffffff' : '#0b1220'; ctx.fillRect(-6, -L, 12, 2 * L); ctx.restore(); });
      const vx = Math.sin(va), vy = -Math.cos(va), sx = Math.sin(sa), sy = -Math.cos(sa); const Ar = L * .85;
      if (on(p, 'comp') && (p.auto || S.grab)) {
        ctx.setLineDash([4, 3]); dbl(ctx, c[0], c[1], vx * Ar, vy * Ar, '#94a3b8', 1.6, 7); ctx.setLineDash([]);
        const cp = Math.cos(va - sa), sp = Math.sin(va - sa); const px = -Math.cos(sa), py = -Math.sin(sa); // perpendicular to slot (screen)
        dbl(ctx, c[0], c[1], sx * Ar * cp, sy * Ar * cp, '#16a34a', 3, 9); if (Math.abs(sp) > .05) { ctx.setLineDash([3, 3]); dbl(ctx, c[0], c[1], px * Ar * sp, py * Ar * sp, '#dc2626', 2, 7); ctx.setLineDash([]); G.text(ctx, '✗ تُحجب', c[0] + px * Ar * sp * 1.1 + 34, c[1] + py * Ar * sp * 1.1, { s: 10, w: 800, c: '#fca5a5' }); }
        G.text(ctx, 'تنفذ: A cosθ', c[0], c[1] + g.er + 16, { s: 10, w: 800, c: '#86efac' });
      } else dbl(ctx, c[0], c[1], sx * Ar * trans, sy * Ar * trans, '#16a34a', 3, 9);
      const hd2 = [c[0] + sx * (L + 10), c[1] + sy * (L + 10)]; ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(hd2[0], hd2[1], 7, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    }
  };
  E.drags = S => {
    const g = geo(S), p = S.p, sa = rad(p.slot); const hp = g.iso(g.hx, S.hy || 0, S.hz || 0); const sc = g.iso(g.bx, 0, 0), Ls = g.A * 1.3 * 1.12; const hdl = g.iso(g.bx, Ls * Math.cos(sa), Ls * Math.sin(sa));
    const setHand = (S, y, z) => { const m = Math.hypot(y, z), M = g.A * 1.1; if (m > M) { y *= M / m; z *= M / m; } S.grab = true; S.hd = { y, z }; if (m > g.A * .3) setParam(S, 'vib', Math.round(fold(deg(Math.atan2(z, y))))); };
    const slotAng = (S, sx, sy) => { const q = inv(sx, sy); setParam(S, 'slot', Math.round(fold(deg(Math.atan2(q.z, q.y))))); };
    const L = [
      { id: 'hand', x: hp[0], y: hp[1], r: 20, axis: 'xy', tip: 'اسحب اليد لأعلى/لأسفل أو يميناً/يساراً لهزّ الحبل', idle: 'هزّ الحبل ✋', down: S => { S.grab = true; S.hd = { y: S.hy || 0, z: S.hz || 0 }; }, drag: (S, d) => { const q = inv(d.x - g.hx, d.y - g.cy); setHand(S, q.y, q.z); }, up: S => { S.grab = false; } },
      { id: 'slot', cx: sc[0], cy: sc[1], x: hdl[0], y: hdl[1], r: 15, tip: 'دوّر الشق حول محور الحبل', drag: (S, d) => slotAng(S, d.x - sc[0], d.y - sc[1]) },
      { id: 'barrier', x: sc[0] + 50, y: sc[1] + g.A * 1.2, w: 40, h: 60, hint: false, tip: 'انقر لجعل الشق شاقولياً / أفقياً', click: S => setParam(S, 'slot', Math.abs(S.p.slot - 90) < 45 ? 0 : 90) }
    ];
    if (on(p, 'endv')) {
      const k = g.er / g.A, e1 = g.ev1, e2 = g.ev2, L2 = g.er * .92 + 10;
      L.push({ id: 'ev1', x: e1[0] + (S.hz || 0) * k, y: e1[1] - (S.hy || 0) * k, r: 14, axis: 'xy', hint: false, tip: 'اسحب لتحريك طرف الحبل (منظر من الطرف)', down: S => { S.grab = true; S.hd = { y: S.hy || 0, z: S.hz || 0 }; }, drag: (S, d) => setHand(S, -(d.y - e1[1]) / k, (d.x - e1[0]) / k), up: S => { S.grab = false; } });
      L.push({ id: 'ev2', cx: e2[0], cy: e2[1], x: e2[0] + Math.sin(sa) * L2, y: e2[1] - Math.cos(sa) * L2, r: 13, hint: false, tip: 'دوّر الشق', drag: (S, d) => setParam(S, 'slot', Math.round(fold(deg(Math.atan2(d.x - e2[0], -(d.y - e2[1])))))) });
    }
    return L;
  };
  const ang = S => { let a = Math.abs(fold(S.p.vib) - fold(S.p.slot)); return a > 90 ? 180 - a : a; };
  E.readings = S => { const a = ang(S), t = Math.cos(rad(a)); return [rd('الزاوية بين الشق ومستوى الاهتزاز', a + '°'), rd('السعة النافذة A cosθ', Math.round(t * 100) + ' %'), rd('الطاقة النافذة ∝ cos²θ', Math.round(t * t * 100) + ' %')]; };
  E.explain = S => { const a = ang(S); return a < 3 ? `مستوى اهتزاز الحبل <b>موازٍ</b> للشق فتمر الموجة المستعرضة كاملة.` : a > 87 ? `مستوى الاهتزاز <b>عمودي</b> على الشق فيحجب الحاجز الموجة كلياً — هذا ما يحدث للضوء في الاستقطاب ويثبت أنه موجات <b>مستعرضة</b>.` : `الشق يسمح فقط بمركبة الاهتزاز الموازية له <b>A cos${a}° = ${Math.round(Math.cos(rad(a)) * 100)}%</b> من السعة، وبعد الشق يهتز الحبل في مستوى الشق.`; };
  E.howto = 'اسحب <b>اليد</b> (أو النقطة في «منظر من طرف الحبل») لتهزّ الحبل بنفسك في أي اتجاه، ودوّر <b>الشق</b> من المقبض الأزرق (أو انقر الحاجز للتبديل بين الشاقولي والأفقي). يستمر الهز التلقائي في آخر اتجاه هززت به.';
})();

/* =============================== 7 & 8. TOURMALINE / MALUS =============================== */
const OPTpolar = (E, mal) => {
  const { on, panel, dbl } = OPTK;
  E.controls = E.controls.concat([
    TG('wave', 'موجة المجال الكهربائي E', true, null, 'wave'),
    TG('vec', 'متجهات المجال الكهربائي E', true, null, 'vector'),
    TG('endv', 'منظر أمامي للشرائح (محاور النفاذ)', true, null, 'eye'),
    TG('meter', 'مقياس شدة الضوء', true, null, 'meter'),
    TG('graph', 'منحني I مقابل θ', !!mal, null, 'graph'),
    TG('labels', 'التسميات', true, null, 'labels')
  ]);
  const KZ = .38;
  const geo = S => { const w = S.W || 800, h = S.H || 600, cy = h * .28, R = Math.min(76, h * .11); const xs = [Math.max(112, w * .12), w * .38, w * .62, w * .85]; const ey = h * .56, er = Math.min(48, h * .065, w * .075); const ex = [0, 1, 2, 3].map(i => 72 + (w - 82) * (.125 + .25 * i)), pw = Math.min(2 * er + 44, (w - 82) * .25 - 6); return { w, h, cy, R, xs, ey, er, ex, pw }; };
  const pr = (g, x, Y, Z) => [x + Z * KZ, g.cy - Y];
  const fold = a => ((a % 180) + 180) % 180;
  const an = S => mal || S.p.an;
  const th = S => rad(S.p.b - S.p.a);
  E.pointer = null;
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h); const p = S.p, g = geo(S), A = rad(p.a), Bb = rad(p.b), I1 = .5, I2 = an(S) ? I1 * Math.cos(th(S)) ** 2 : I1; S.I1 = I1; S.I2 = I2; const xs = g.xs, cy = g.cy, R = g.R;
    // beam
    OPTK.raw(ctx, () => { const band = (x0, x1, I) => { ctx.fillStyle = `rgba(245,158,11,${(.08 + .32 * I).toFixed(3)})`; ctx.fillRect(x0, cy - 22, x1 - x0, 44); }; band(xs[0], xs[1], 1); band(xs[1], xs[2], I1); band(xs[2], xs[3] - 20, I2); });
    ctx.strokeStyle = 'rgba(100,116,139,.6)'; ctx.setLineDash([6, 5]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(xs[0], cy); ctx.lineTo(xs[3], cy); ctx.stroke(); ctx.setLineDash([]);
    // lamp
    G.glow(ctx, xs[0], cy, 46, 'rgba(250,204,21,A)', .8); OPTK.raw(ctx, () => { ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(xs[0], cy, 16, 0, TAU); ctx.fill(); ctx.strokeStyle = '#a16207'; ctx.lineWidth = 2; ctx.stroke(); });
    const Ecol = '#dc2626', kx = TAU / 70, ph = S.t * 6;
    // E-field wave
    if (on(p, 'wave')) {
      const seg = (x0, x1, ang, amp, rnd) => { for (let x = x0 + 8; x < x1 - 8; x += 7) { const a = rnd ? (Math.floor(x / 7) * 2.399 + S.t * 3) : ang; const v = amp * Math.sin(kx * x - ph); const q = pr(g, x, v * Math.cos(a), v * Math.sin(a)); ctx.strokeStyle = rnd ? 'rgba(220,38,38,.45)' : 'rgba(220,38,38,.55)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(q[0], q[1]); ctx.stroke(); }
        if (!rnd && amp > 1) { ctx.strokeStyle = Ecol; ctx.lineWidth = 2; ctx.beginPath(); for (let x = x0 + 8; x < x1 - 8; x += 3) { const v = amp * Math.sin(kx * x - ph); const q = pr(g, x, v * Math.cos(ang), v * Math.sin(ang)); x === x0 + 8 ? ctx.moveTo(q[0], q[1]) : ctx.lineTo(q[0], q[1]); } ctx.stroke(); } };
      const E0 = R * .5; seg(xs[0] + 20, xs[1] - 16, 0, E0, true); seg(xs[1] + 16, xs[2] - 16, A, E0 * Math.SQRT1_2 * 1.3, false); seg(xs[2] + 16, xs[3] - 22, Bb, an(S) ? E0 * Math.SQRT1_2 * 1.3 * Math.abs(Math.cos(th(S))) : E0 * .92, false);
      if (!an(S)) { /* no analyzer: after polarizer the wave continues along A */ }
    }
    // plates
    const plate = (x, ang, name, ghost) => {
      if (ghost) { ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x, cy, R * KZ, R, 0, 0, TAU); ctx.stroke(); ctx.setLineDash([]); G.text(ctx, 'انقر لإدخال المحلل', x, cy + R + 18, { s: 11, c: '#94a3b8' }); return; }
      ctx.save(); ctx.beginPath(); ctx.ellipse(x, cy, R * KZ, R, 0, 0, TAU); OPTK.raw(ctx, () => { ctx.fillStyle = 'rgba(180,120,60,.42)'; ctx.fill(); }); ctx.clip();
      const c = Math.cos(ang), s = Math.sin(ang); ctx.strokeStyle = 'rgba(120,53,15,.45)'; ctx.lineWidth = 1; for (let k = -R; k <= R; k += 9) { const a0 = pr(g, x, -s * k + c * -R * 1.5, c * k + s * -R * 1.5), a1 = pr(g, x, -s * k + c * R * 1.5, c * k + s * R * 1.5); ctx.beginPath(); ctx.moveTo(a0[0], a0[1]); ctx.lineTo(a1[0], a1[1]); ctx.stroke(); }
      ctx.restore(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x, cy, R * KZ, R, 0, 0, TAU); ctx.stroke();
      const t0 = pr(g, x, -c * R, -s * R), t1 = pr(g, x, c * R, s * R); ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2.5; ctx.setLineDash([7, 4]); ctx.beginPath(); ctx.moveTo(t0[0], t0[1]); ctx.lineTo(t1[0], t1[1]); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(t1[0], t1[1], 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      if (on(p, 'labels')) { G.text(ctx, name, x, cy + R + 18, { s: 12, w: 800, c: '#cbd5e1' }); G.text(ctx, fmt(deg(ang), 3) + '°', x, cy - R - 18, { s: 12, w: 800, mono: 1, c: '#93c5fd' }); }
    };
    plate(xs[1], A, 'المستقطب'); plate(xs[2], Bb, 'المحلل', !an(S));
    // E vectors (double arrows) in each segment
    if (on(p, 'vec')) {
      const ev = (x, ang, amp) => { const c = Math.cos(ang), s = Math.sin(ang); const q = pr(g, x, c * amp, s * amp); dbl(ctx, x, cy, q[0] - x, q[1] - cy, Ecol, 2.6, 8); };
      const m0 = (xs[0] + xs[1]) / 2 + 12; for (let i = 0; i < 4; i++) ev(m0, i * Math.PI / 4 + S.t * .8, R * .45);
      ev((xs[1] + xs[2]) / 2, A, R * .5); const a2 = an(S) ? R * .5 * Math.abs(Math.cos(th(S))) : R * .5; if (a2 > 1.5) ev((xs[2] + xs[3]) / 2 - 10, an(S) ? Bb : A, a2);
      if (on(p, 'labels')) { G.text(ctx, 'غير مستقطب', m0, cy - R * .6 - 14, { s: 11, c: '#fca5a5' }); G.text(ctx, 'مستقطب استوائياً', (xs[1] + xs[2]) / 2, cy - R * .6 - 14, { s: 11, c: '#fca5a5' }); }
    }
    // detector: eye (tourmaline) or photocell (malus)
    const dx = xs[3]; if (mal) { ctx.fillStyle = '#334155'; rr(ctx, dx - 20, cy - 30, 40, 60, 8); ctx.fill(); OPTK.raw(ctx, () => { ctx.fillStyle = `rgba(250,204,21,${(.15 + .85 * I2 / I1).toFixed(3)})`; ctx.beginPath(); ctx.arc(dx - 20, cy, 14, Math.PI / 2, -Math.PI / 2); ctx.fill(); }); if (on(p, 'labels')) G.text(ctx, 'خلية ضوئية', dx, cy + 46, { s: 11, c: '#cbd5e1' }); }
    else { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(dx, cy, 22, 13, 0, 0, TAU); ctx.stroke(); ctx.fillStyle = '#1e3a8a'; ctx.beginPath(); ctx.arc(dx - 6, cy, 7, 0, TAU); ctx.fill(); G.glow(ctx, dx - 22, cy, 26, 'rgba(250,204,21,A)', .9 * I2 / I1); if (on(p, 'labels')) G.text(ctx, 'العين', dx, cy + 30, { s: 11, c: '#cbd5e1' }); }
    // end views (book fig. 18/20)
    if (on(p, 'endv')) {
      const titles = ['ضوء غير مستقطب', 'محور المستقطب و E', an(S) ? 'عند المحلل: E cosθ' : 'لا يوجد محلل', 'بعد المحلل'];
      g.ex.forEach((x, i) => { panel(ctx, x - g.pw / 2, g.ey - g.er - 30, g.pw, 2 * g.er + 58, { title: titles[i] }); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, g.ey, g.er, 0, TAU); ctx.stroke(); });
      const vec = (i, ang, len, col, lw = 2.6, dash) => { const x = g.ex[i]; if (dash) ctx.setLineDash([4, 3]); dbl(ctx, x, g.ey, Math.sin(ang) * len, -Math.cos(ang) * len, col, lw, 8); ctx.setLineDash([]); };
      const axis = (i, ang) => { const x = g.ex[i], L = g.er; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 6; ctx.globalAlpha = .35; ctx.beginPath(); ctx.moveTo(x - Math.sin(ang) * L, g.ey + Math.cos(ang) * L); ctx.lineTo(x + Math.sin(ang) * L, g.ey - Math.cos(ang) * L); ctx.stroke(); ctx.globalAlpha = 1; ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(x + Math.sin(ang) * (L + 8), g.ey - Math.cos(ang) * (L + 8), 7, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); };
      const L = g.er * .82; for (let i = 0; i < 4; i++) vec(0, i * Math.PI / 4 + S.t * .8, L * (.7 + .3 * Math.sin(S.t * 3 + i)), Ecol, 1.8);
      axis(1, A); vec(1, A, L, Ecol);
      if (an(S)) { axis(2, Bb); vec(2, A, L, '#94a3b8', 1.5, 1); const c = Math.cos(th(S)); vec(2, Bb, L * Math.abs(c), '#16a34a', 3); const pa = Bb + Math.PI / 2, sn = Math.sin(th(S)); if (Math.abs(sn) > .05) vec(2, pa, L * Math.abs(sn), '#dc2626', 1.6, 1); if (on(p, 'labels')) G.text(ctx, 'θ = ' + Math.round(Math.abs(fold(p.b - p.a) > 90 ? 180 - fold(p.b - p.a) : fold(p.b - p.a))) + '°', g.ex[2], g.ey + g.er + 14, { s: 11, w: 800, c: '#86efac' }); vec(3, Bb, L * Math.abs(c), Ecol); }
      else vec(3, A, L, Ecol);
    }
    // meter
    if (on(p, 'meter')) {
      const bx = g.w - 214, by = g.h * .68 + 6, bw = 194, bh = 96; panel(ctx, bx, by, bw, bh, { title: 'شدة الضوء (نسبة إلى المصدر)' });
      const bar = (y, v, lab, col) => { OPTK.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, bx + 10, y, bw - 20, 12, 6); ctx.fill(); ctx.fillStyle = col; rr(ctx, bx + 10, y, Math.max(4, (bw - 20) * v), 12, 6); ctx.fill(); }); G.text(ctx, lab, bx + bw - 10, y - 9, { s: 11, w: 800, a: 'right', c: '#cbd5e1' }); };
      bar(by + 40, I1, 'بعد المستقطب I₀ = 50%', '#f59e0b'); bar(by + 76, I2, (an(S) ? 'بعد المحلل I = I₀cos²θ = ' : 'النافذ = ') + Math.round(I2 * 100) + '%', '#16a34a');
    }
    // I–θ graph
    if (on(p, 'graph')) {
      const bx = 72, bw = Math.min(300, g.w * .42), by = g.h * .68 + 6, bh = g.h - 86 - by; panel(ctx, bx, by, bw, bh, { title: 'I/I₀ مقابل θ' });
      const x0 = bx + 30, x1 = bx + bw - 12, y0 = by + bh - 22, y1 = by + 26; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
      [0, 90, 180].forEach(t => G.text(ctx, t + '°', x0 + (x1 - x0) * t / 180, y0 + 10, { s: 9, mono: 1, c: '#94a3b8' })); G.text(ctx, '1', x0 - 10, y1, { s: 9, c: '#94a3b8' });
      ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2; ctx.beginPath(); for (let t = 0; t <= 180; t += 3) { const x = x0 + (x1 - x0) * t / 180, y = y0 - (y0 - y1) * Math.cos(rad(t)) ** 2; t ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      const tt = Math.abs(p.b - p.a) % 180; const px = x0 + (x1 - x0) * tt / 180, py = y0 - (y0 - y1) * Math.cos(rad(tt)) ** 2; ctx.strokeStyle = 'rgba(220,38,38,.5)'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(px, y0); ctx.lineTo(px, py); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(px, py, 6, 0, TAU); ctx.fill();
    }
  };
  E.drags = S => {
    const g = geo(S), p = S.p; const L = [];
    const rot = (id, x, key, ang, tip, extra) => { const t1 = pr(g, x, Math.cos(ang) * g.R, Math.sin(ang) * g.R); return Object.assign({ id, cx: x, cy: g.cy, x: t1[0], y: t1[1], r: 14, tip, drag: (S, d) => { const Z = (d.x - x) / KZ, Y = -(d.y - g.cy); setParam(S, key, Math.round(fold(deg(Math.atan2(Z, Y))))); }, wheel: (S, s) => setParam(S, key, fold(S.p[key] + s)) }, extra || {}); };
    if (on(p, 'endv')) { const rv = (id, i, key) => { const x = g.ex[i], a = rad(p[key]), Lr = g.er + 8; return { id, cx: x, cy: g.ey, x: x + Math.sin(a) * Lr, y: g.ey - Math.cos(a) * Lr, r: 13, tip: 'دوّر محور النفاذ (منظر أمامي)', drag: (S, d) => setParam(S, key, Math.round(fold(deg(Math.atan2(d.x - x, -(d.y - g.ey)))))) }; }; L.push(rv('evA', 1, 'a')); if (an(S)) L.push(rv('evB', 2, 'b')); }
    L.push(rot('pol', g.xs[1], 'a', rad(p.a), 'دوّر المستقطب حول محور الشعاع', { idle: 'دوّر الشريحة ✋' }));
    if (an(S)) L.push(rot('ana', g.xs[2], 'b', rad(p.b), 'دوّر المحلل ولاحظ شدة الضوء'));
    if (!mal) L.push({ id: 'plate2', x: g.xs[2], y: g.cy + g.R * .4, w: 40, h: 50, hint: false, tip: an(S) ? 'انقر لإزالة المحلل' : 'انقر لإدخال المحلل', click: S => setParam(S, 'an', !S.p.an) });
    return L;
  };
  E.howto = 'دوّر كل شريحة من <b>مقبضها الأزرق</b> (أو في المنظر الأمامي أسفلها، أو بعجلة الفأرة). الأسهم الحمراء هي المجال الكهربائي E: قبل المستقطب في كل الاتجاهات، وبعده في اتجاه محوره فقط، وعند المحلل تنفذ المركبة <b>E cosθ</b> (الخضراء) وتُمتص <b>E sinθ</b> (الحمراء)' + (mal ? '. سجّل القراءات لرسم I مقابل θ.' : '. انقر المحلل لإزالته أو إدخاله.');
};
['tourmaline', 'malus'].forEach(id => { const E = EXPS.find(e => e.id === id); if (E) OPTpolar(E, id === 'malus'); });

/* =============================== 9. BREWSTER ANGLE =============================== */
(() => {
  const E = EXPS.find(e => e.id === 'brewster'); if (!E) return;
  const { on, panel, dbl, arcA } = OPTK;
  E.controls = E.controls.concat([
    TG('pol', 'رموز الاستقطاب (• و ↕)', true, null, 'dot'),
    TG('normal', 'العمود المقام والزوايا', true, null, 'vector'),
    TG('anl', 'محلل لفحص الضوء المنعكس', true, null, 'eye'),
    TG('graph', 'منحني درجة الاستقطاب', true, null, 'graph'),
    TG('labels', 'التسميات', true, null, 'labels')
  ]);
  const geo = S => { const w = S.W || 800, h = S.H || 600, cx = w * .48, cy = h * .47, Lr = Math.min(w * .42, h * .4); const i = rad(S.p.i); return { w, h, cx, cy, Lr, src: [cx - Math.sin(i) * Lr, cy - Math.cos(i) * Lr], chip: [w - 120, cy + 70], av: [w - 96, 118], ar: 44 }; };
  const fres = S => E.fres(S);
  E.setup = S => { S.an = 90; };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h); const p = S.p, g = geo(S), n = +p.n, f = fres(S), i = rad(p.i), r = f.t, tp = deg(Math.atan(n)); const { cx, cy, Lr } = g; const atB = Math.abs(p.i - tp) < .6;
    OPTK.raw(ctx, () => { ctx.fillStyle = `rgba(56,189,248,${(.1 + (n - 1) * .12).toFixed(3)})`; ctx.fillRect(0, cy, w, h - cy); });
    ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
    if (on(p, 'labels')) { G.text(ctx, 'هواء (n = 1)', 110, cy - 16, { s: 12, c: '#cbd5e1' }); G.text(ctx, 'الوسط العاكس', 110, cy + 18, { s: 12, c: '#7dd3fc' }); }
    // n chip (drag)
    ctx.fillStyle = '#0369a1'; rr(ctx, g.chip[0] - 58, g.chip[1] - 17, 116, 34, 17); ctx.fill(); G.text(ctx, 'n = ' + fmt(n, 3) + ' ↕', g.chip[0], g.chip[1], { s: 13, w: 900, c: '#fff' });
    const R = f.Rs + f.Rp; const rEnd = [cx + Math.sin(i) * Lr, cy - Math.cos(i) * Lr], tEnd = [cx + Math.sin(r) * Lr * .85, cy + Math.cos(r) * Lr * .85];
    if (on(p, 'normal')) {
      ctx.strokeStyle = '#64748b'; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(cx, cy - Lr - 10); ctx.lineTo(cx, cy + Lr * .9); ctx.stroke(); ctx.setLineDash([]);
      arcA(ctx, cx, cy, 52, -Math.PI / 2 - i, -Math.PI / 2, '#b45309'); G.text(ctx, 'θ = ' + fmt(p.i, 3) + '°', cx - 20 - 66 * Math.sin(i / 2), cy - 64 * Math.cos(i / 2) - 8, { s: 12, w: 800, c: '#fcd34d' });
      arcA(ctx, cx, cy, 44, -Math.PI / 2, -Math.PI / 2 + i, '#ca8a04'); arcA(ctx, cx, cy, 52, Math.PI / 2 - r, Math.PI / 2, '#0369a1'); G.text(ctx, 'θr = ' + fmt(deg(r), 3) + '°', cx - 44, cy + 66, { s: 12, w: 800, c: '#7dd3fc' });
      const a1 = -Math.PI / 2 + i, a2 = Math.PI / 2 - r; const between = 180 - p.i - deg(r); arcA(ctx, cx, cy, 30, a1, a2, atB ? '#86efac' : '#7c3aed', atB ? 3 : 1.8);
      G.text(ctx, fmt(between, 3) + '°' + (atB ? ' ✓' : ''), cx + 52, cy - 6 + 30 * Math.sin((a1 + a2) / 2), { s: 12, w: 900, a: 'left', c: OPTK.book(ctx) ? (atB ? '#15803d' : '#7c3aed') : (atB ? '#86efac' : '#c4b5fd'), bg: OPTK.book(ctx) ? 'rgba(255,255,255,.85)' : 'rgba(15,23,42,.8)', raw: 1 });
    }
    // rays
    G.arrow(ctx, g.src[0], g.src[1], cx - Math.sin(i) * 8, cy - Math.cos(i) * 8, '#ea580c', 3.2, 12);
    OPTK.raw(ctx, () => { G.arrow(ctx, cx, cy, rEnd[0], rEnd[1], `rgba(234,88,12,${(.25 + Math.min(.75, R * 2.2)).toFixed(3)})`, 1.5 + Math.min(4, R * 12), 11); G.arrow(ctx, cx, cy, tEnd[0], tEnd[1], 'rgba(234,88,12,.85)', 2.8, 11); });
    // lamp
    ctx.save(); ctx.translate(g.src[0], g.src[1]); ctx.rotate(Math.atan2(cy - g.src[1], cx - g.src[0])); ctx.fillStyle = '#334155'; rr(ctx, -34, -14, 40, 28, 6); ctx.fill(); OPTK.raw(ctx, () => { ctx.fillStyle = '#fde047'; ctx.fillRect(4, -9, 5, 18); }); ctx.restore();
    // polarisation symbols
    if (on(p, 'pol')) {
      const sym = (P0, P1, as, ap) => { const dx = P1[0] - P0[0], dy = P1[1] - P0[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L; [.3, .5, .7].forEach(t => { const x = P0[0] + dx * t, y = P0[1] + dy * t; if (as > .06) { ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.arc(x - ux * 9, y - uy * 9, 2 + 3.5 * as, 0, TAU); ctx.fill(); } if (ap > .06) dbl(ctx, x + ux * 9, y + uy * 9, -uy * 13 * ap, ux * 13 * ap, '#be123c', 2, 6); }); };
      sym(g.src, [cx, cy], 1, 1); const m = Math.max(Math.sqrt(f.Rs), Math.sqrt(f.Rp), 1e-6); sym([cx, cy], rEnd, Math.sqrt(f.Rs) / m, Math.sqrt(f.Rp) / m); sym([cx, cy], tEnd, Math.sqrt(1 - f.Rs), Math.sqrt(1 - f.Rp));
      if (on(p, 'labels')) { panel(ctx, 72, 14, 250, 58); ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.arc(300, 31, 4.5, 0, TAU); ctx.fill(); dbl(ctx, 300, 55, 0, 9, '#be123c', 2, 5); G.text(ctx, 'اهتزاز عمودي على مستوى السقوط', 288, 31, { s: 11, a: 'right', c: '#93c5fd' }); G.text(ctx, 'اهتزاز في مستوى السقوط', 288, 55, { s: 11, a: 'right', c: '#fda4af' }); }
    }
    if (on(p, 'labels')) { G.text(ctx, 'ضوء غير مستقطب', (g.src[0] + cx) / 2 - 60, (g.src[1] + cy) / 2 - 10, { s: 11, w: 800, c: '#fdba74' }); G.text(ctx, atB ? 'منعكس: مستقطب كلياً' : 'منعكس: مستقطب جزئياً', (rEnd[0] + cx) / 2 + 70, (rEnd[1] + cy) / 2 - 4, { s: 11, w: 800, c: OPTK.book(ctx) ? (atB ? '#15803d' : '#c2410c') : (atB ? '#86efac' : '#fdba74'), bg: OPTK.book(ctx) ? 'rgba(255,255,255,.85)' : 'rgba(15,23,42,.8)', raw: 1 }); G.text(ctx, 'منكسر: مستقطب جزئياً', (tEnd[0] + cx) / 2 + 76, (tEnd[1] + cy) / 2, { s: 11, w: 800, c: '#7dd3fc' }); }
    G.text(ctx, 'tan θp = n ⇐ θp = ' + fmt(tp, 3) + '°', w / 2 + 40, 26, { s: 14, w: 900, c: atB ? '#86efac' : '#cbd5e1' });
    // analyzer on the reflected ray
    if (on(p, 'anl')) {
      const q = [cx + Math.sin(i) * Lr * .62, cy - Math.cos(i) * Lr * .62]; ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(q[0] - Math.cos(i) * 18, q[1] - Math.sin(i) * 18); ctx.lineTo(q[0] + Math.cos(i) * 18, q[1] + Math.sin(i) * 18); ctx.stroke();
      const a = rad(S.an ?? 90); const It = f.Rs * Math.cos(a) ** 2 + f.Rp * Math.sin(a) ** 2; const frac = It / Math.max(1e-9, R); S.anI = frac;
      const { av, ar } = g; panel(ctx, av[0] - ar - 44, av[1] - ar - 30, 2 * ar + 88, 2 * ar + 82, { title: 'المحلل (منظر أمامي)' });
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(av[0], av[1], ar, 0, TAU); ctx.stroke(); ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.arc(av[0], av[1] - ar * .55, 3, 0, TAU); ctx.fill(); dbl(ctx, av[0] + ar * .55, av[1], 8, 0, '#be123c', 1.6, 5);
      ctx.strokeStyle = '#92400e'; ctx.lineWidth = 6; ctx.globalAlpha = .45; ctx.beginPath(); ctx.moveTo(av[0] - Math.sin(a) * ar, av[1] + Math.cos(a) * ar); ctx.lineTo(av[0] + Math.sin(a) * ar, av[1] - Math.cos(a) * ar); ctx.stroke(); ctx.globalAlpha = 1;
      ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(av[0] + Math.sin(a) * (ar + 8), av[1] - Math.cos(a) * (ar + 8), 7, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      const by = av[1] + ar + 16; OPTK.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, av[0] - ar - 30, by, 2 * ar + 60, 10, 5); ctx.fill(); ctx.fillStyle = '#16a34a'; rr(ctx, av[0] - ar - 30, by, Math.max(3, (2 * ar + 60) * frac), 10, 5); ctx.fill(); });
      G.text(ctx, 'النافذ: ' + Math.round(frac * 100) + '% من المنعكس', av[0], by + 22, { s: 11, w: 800, c: frac < .02 ? '#fca5a5' : '#86efac' });
    }
    // degree of polarisation vs angle
    if (on(p, 'graph')) {
      const bx = 72, by = h - 206, bw = 250, bh = 120; panel(ctx, bx, by, bw, bh, { title: 'درجة استقطاب الضوء المنعكس' });
      const x0 = bx + 26, x1 = bx + bw - 12, y0 = by + bh - 20, y1 = by + 28; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
      const P = a => { const q = { p: { n: p.n, i: a } }; const F = E.fres(q); return (F.Rs - F.Rp) / (F.Rs + F.Rp); };
      ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.beginPath(); for (let a = .5; a <= 89.5; a += 1) { const x = x0 + (x1 - x0) * a / 90, y = y0 - (y0 - y1) * P(a); a === .5 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
      const xp = x0 + (x1 - x0) * tp / 90; ctx.strokeStyle = '#16a34a'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(xp, y0); ctx.lineTo(xp, y1); ctx.stroke(); ctx.setLineDash([]); G.text(ctx, 'θp', xp, y0 + 10, { s: 10, w: 800, c: '#86efac' });
      const xi = x0 + (x1 - x0) * p.i / 90; ctx.fillStyle = '#ea580c'; ctx.beginPath(); ctx.arc(xi, y0 - (y0 - y1) * P(Math.max(.5, p.i)), 5.5, 0, TAU); ctx.fill();
      G.text(ctx, '0°', x0, y0 + 10, { s: 9, c: '#94a3b8', mono: 1 }); G.text(ctx, '90°', x1, y0 + 10, { s: 9, c: '#94a3b8', mono: 1 }); G.text(ctx, '100%', x0 + 2, y1 - 8, { s: 9, c: '#94a3b8', mono: 1 });
    }
  };
  E.drags = S => {
    const g = geo(S), p = S.p; const L = [
      { id: 'src', cx: g.cx, cy: g.cy, x: g.src[0], y: g.src[1], r: 22, tip: 'اسحب المصباح على القوس لتغيير زاوية السقوط', idle: 'حرّك المصباح ✋', drag: (S, d) => setParam(S, 'i', clamp(deg(Math.atan2(g.cx - d.x, g.cy - d.y)), 0, 89)), wheel: (S, s) => setParam(S, 'i', S.p.i + .5 * s) },
      { id: 'n', x: g.chip[0], y: g.chip[1], w: 116, h: 34, axis: 'y', tip: 'اسحب لأعلى/لأسفل لتغيير معامل انكسار الوسط', drag: (S, d) => { S.p.n = +clamp(+S.p.n - d.dy * .01, 1.05, 2.6).toFixed(2); const c = E.controls.find(c => c.k === 'n'); if (c && c._set) c._set(S.p.n); }, wheel: (S, s) => { S.p.n = +clamp(+S.p.n + .01 * s, 1.05, 2.6).toFixed(2); } }
    ];
    if (on(p, 'anl')) { const a = rad(S.an ?? 90), r = g.ar + 8; L.push({ id: 'anl', cx: g.av[0], cy: g.av[1], x: g.av[0] + Math.sin(a) * r, y: g.av[1] - Math.cos(a) * r, r: 13, tip: 'دوّر المحلل: عند زاوية بروستر ينعدم الضوء عند وضع معين', drag: (S, d) => { S.an = deg(Math.atan2(d.x - g.av[0], -(d.y - g.av[1]))); }, wheel: (S, s) => { S.an = (S.an ?? 90) + 5 * s; } }); }
    return L;
  };
  const r0 = E.readings;
  E.readings = S => r0.call(E, S).concat([rd('الزاوية بين المنعكس والمنكسر', fmt(180 - S.p.i - deg(fres(S).t), 4, '°'))]).concat(S.anI != null && S.p.anl !== false ? [rd('النافذ من المحلل', Math.round(S.anI * 100) + ' % من المنعكس')] : []);
  E.howto = 'اسحب <b>المصباح</b> على القوس لتغيير زاوية السقوط، واسحب رقاقة <b>n</b> لأعلى/لأسفل لتغيير الوسط. لاحظ الرموز: النقاط (اهتزاز عمودي على مستوى السقوط) والأسهم (اهتزاز في المستوى). دوّر <b>المحلل</b> على الشعاع المنعكس: عند θp تنعدم الشدة تماماً في وضع معين — أي أن المنعكس مستقطب كلياً، والزاوية بين المنعكس والمنكسر 90°.';
})();

/* =============================== 10. SCATTERING (blue sky / red sunset) =============================== */
(() => {
  const E = EXPS.find(e => e.id === 'scatter'); if (!E) return;
  const { on, panel, rgb } = OPTK;
  E.controls = E.controls.concat([
    TG('scat', 'الضوء المستطار عن الجزيئات', true, null, 'ray'),
    TG('phot', 'فوتونات متحركة', true, null, 'photon'),
    TG('view', 'ما يراه الراصد', true, null, 'eye'),
    TG('spec', 'طيف الضوء النافذ والمستطار', true, null, 'graph'),
    TG('labels', 'التسميات', true, null, 'labels')
  ]);
  const AMf = el => 1 / (Math.sin(rad(el)) + .50572 * Math.pow(el + 6.07995, -1.6364));
  const tr = (S, nm, f = 1) => Math.exp(-.25 * S.p.dens * AMf(S.p.sun) * f * Math.pow(450 / nm, 4));
  const colors = S => { const sky = [0, 0, 0], sun = [0, 0, 0]; for (let nm = 400; nm <= 700; nm += 10) { const c = wlRGB(nm), s = Math.pow(450 / nm, 4) * tr(S, nm, .5), t = tr(S, nm); for (let k = 0; k < 3; k++) { sky[k] += c[k] * s; sun[k] += c[k] * t; } } const ms = Math.max(...sky), mu = Math.max(...sun), br = clamp(Math.sin(rad(S.p.sun)) * 3, .3, 1); return { sky: sky.map(v => v / ms * 230 * br), sun: sun.map(v => v / mu * 255) }; };
  const geo = S => {
    const w = S.W || 800, h = S.H || 600, gy = h * .8, ox = Math.max(96, w * .2), Re = w * 1.2, Rs = Math.min(w - ox - 36, gy - 44), Ha = Math.min(h * .2, (Rs - 50) ** 2 / (2 * Re) * .95);
    const el = rad(S.p.sun), dir = [Math.cos(el), -Math.sin(el)]; const se = Re * Math.sin(el); const sx = -se + Math.sqrt(se * se + 2 * Re * Ha + Ha * Ha);
    return { w, h, gy, ox, Re, Ha, Rs, dir, sExit: sx, sun: [ox + dir[0] * Rs, gy + dir[1] * Rs], ec: [ox, gy + Re] };
  };
  const PH = [420, 460, 510, 570, 620, 680];
  let sun0 = 0; const SUN0 = () => { if (!sun0) { const c = [0, 0, 0]; for (let nm = 400; nm <= 700; nm += 10) { const q = wlRGB(nm); for (let k = 0; k < 3; k++) c[k] += q[k]; } sun0 = c[2] / c[0]; } return sun0; };
  E.setup = S => { S.ph = []; S.phT = 0; };
  E.update = (S, dt) => {
    const g = geo(S), p = S.p; if (p.phot === false) { S.ph = []; return; } const ph = S.ph || (S.ph = []);
    S.phT = (S.phT || 0) + dt; while (S.phT > .03) { S.phT -= .03; if (ph.length < 160) { const off = (Math.random() - .5) * 14; ph.push({ x: g.sun[0] - g.dir[1] * off, y: g.sun[1] + g.dir[0] * off, vx: -g.dir[0], vy: -g.dir[1], l: PH[Math.random() * PH.length | 0], s: 0 }); } }
    const sp = 260 * dt, k = .0022 * p.dens * g.Ha / 120;
    for (const q of ph) { q.x += q.vx * sp; q.y += q.vy * sp; const r = Math.hypot(q.x - g.ec[0], q.y - g.ec[1]); if (!q.s && r < g.Re + g.Ha && r > g.Re && Math.random() < k * Math.pow(450 / q.l, 4) * sp) { const a = Math.random() * TAU; q.vx = Math.cos(a); q.vy = Math.sin(a); q.s = 1; } q.dead = q.x < -10 || q.x > g.w + 10 || q.y < -10 || r < g.Re; }
    S.ph = ph.filter(q => !q.dead);
  };
  E.draw = (ctx, w, h, S) => {
    const p = S.p, g = geo(S), C = colors(S); const { gy, ox, Re, Ha } = g;
    ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(226,232,240,.5)'; for (let i = 0; i < 60; i++) { const x = (i * 197.3) % w, y = (i * 73.7) % (gy * .9); ctx.fillRect(x, y, 1.4, 1.4); }
    // atmosphere shell tinted with the sky colour, molecules
    ctx.fillStyle = `rgba(${C.sky.map(v => v | 0).join(',')},.55)`; ctx.beginPath(); ctx.arc(g.ec[0], g.ec[1], Re + Ha, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(226,232,240,.55)'; const nm = Math.round(90 * p.dens); for (let i = 0; i < nm; i++) { const a = -Math.PI / 2 + ((i * 0.6180339) % 1 - .5) * 1.1, r = Re + ((i * 0.41421) % 1) * Ha; const x = g.ec[0] + Math.cos(a) * r, y = g.ec[1] + Math.sin(a) * r; if (x > 0 && x < w && y > 0) ctx.fillRect(x, y, 2, 2); }
    // earth
    ctx.fillStyle = '#14532d'; ctx.beginPath(); ctx.arc(g.ec[0], g.ec[1], Re, 0, TAU); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.fillRect(0, gy + 30, w, h);
    // sun and its ray to the observer; colour changes along the path in the air
    G.glow(ctx, g.sun[0], g.sun[1], 80, `rgba(${C.sun.map(v => v | 0).join(',')},A)`, .55); ctx.fillStyle = rgb(C.sun); ctx.beginPath(); ctx.arc(g.sun[0], g.sun[1], 24, 0, TAU); ctx.fill();
    const L = Math.hypot(g.sun[0] - ox, g.sun[1] - gy) - 26, N = 30; for (let k = 0; k < N; k++) { const s0 = L - k * L / N, s1 = L - (k + 1) * L / N; const inside = Math.min(1, Math.max(0, (g.sExit - s1) / g.sExit)); const c = [0, 0, 0]; let mx = 0; for (let l = 400; l <= 700; l += 20) { const q = wlRGB(l), t = tr(S, l, inside); c[0] += q[0] * t; c[1] += q[1] * t; c[2] += q[2] * t; } mx = Math.max(...c); ctx.strokeStyle = rgb(c.map(v => v / mx * 255)); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(ox + g.dir[0] * s0, gy + g.dir[1] * s0); ctx.lineTo(ox + g.dir[0] * s1, gy + g.dir[1] * s1); ctx.stroke(); }
    if (on(p, 'labels')) { const m = g.sExit / 2; G.text(ctx, 'طول المسار في الجو ' + fmt(AMf(p.sun), 3) + ' مرة', ox + g.dir[0] * m - g.dir[1] * 26 + 20, gy + g.dir[1] * m + g.dir[0] * 26 - 18, { s: 12, w: 800, c: '#fde68a', bg: 'rgba(15,23,42,.8)' }); G.text(ctx, 'الغلاف الجوي', ox - 14, gy - Ha + 18, { s: 11, a: 'right', c: '#e2e8f0' }); }
    // scattered arrows at points along the path in the air
    if (on(p, 'scat')) {
      for (let k = 1; k <= 4; k++) { const s = g.sExit * k / 5; const x = ox + g.dir[0] * s, y = gy + g.dir[1] * s; const f = 1 - k / 5; [[450, -1], [550, 0], [650, 1]].forEach(([l, j]) => { const len = 34 * Math.pow(450 / l, 4) * tr(S, l, f) * Math.min(1.6, p.dens); if (len < 2) return; [Math.PI / 2 + .5, Math.PI / 2 + 1.4, -2.2].forEach((a, m) => { const aa = a + j * .18; G.arrow(ctx, x, y, x + Math.cos(aa) * len, y + Math.sin(aa) * len, wlColor(l, .9), 2, 6); }); }); }
    }
    // photons
    if (on(p, 'phot')) (S.ph || []).forEach(q => { ctx.strokeStyle = wlColor(q.l, q.s ? .95 : .8); ctx.lineWidth = q.s ? 2.6 : 2; ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(q.x - q.vx * 7, q.y - q.vy * 7); ctx.stroke(); });
    // observer
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(ox, gy - 32, 6, 0, TAU); ctx.moveTo(ox, gy - 26); ctx.lineTo(ox, gy - 10); ctx.moveTo(ox, gy - 10); ctx.lineTo(ox - 6, gy); ctx.moveTo(ox, gy - 10); ctx.lineTo(ox + 6, gy); ctx.moveTo(ox - 7, gy - 20); ctx.lineTo(ox + 7, gy - 20); ctx.stroke();
    if (on(p, 'labels')) G.text(ctx, 'الراصد', ox, gy + 16, { s: 11, c: '#e2e8f0' });
    // observer's view
    if (on(p, 'view')) {
      const bx = 72, by = 14, bw = 230, bh = 150; panel(ctx, bx, by, bw, bh, { title: 'ما يراه الراصد' });
      const gr = ctx.createLinearGradient(0, by + 24, 0, by + bh - 24); gr.addColorStop(0, rgb(C.sky.map(v => v * .75))); gr.addColorStop(1, rgb(C.sky.map(v => Math.min(255, v * 1.1 + 25)))); ctx.fillStyle = gr; ctx.fillRect(bx + 8, by + 24, bw - 16, bh - 48);
      const sy = by + bh - 24 - (bh - 48) * Math.sin(rad(p.sun)) * .9; G.glow(ctx, bx + bw * .62, sy, 30, `rgba(${C.sun.map(v => v | 0).join(',')},A)`, .6); ctx.fillStyle = rgb(C.sun); ctx.beginPath(); ctx.arc(bx + bw * .62, sy, 11, 0, TAU); ctx.fill();
      ctx.fillStyle = '#14532d'; ctx.fillRect(bx + 8, by + bh - 24, bw - 16, 12); G.text(ctx, 'السماء', bx + 40, by + bh - 6, { s: 10, c: '#cbd5e1' }); G.text(ctx, 'الشمس', bx + bw * .62, by + bh - 6, { s: 10, c: '#cbd5e1' });
    }
    // spectra
    if (on(p, 'spec')) {
      const bw = 250, bh = 128, bx = w - bw - 16, by = 52; panel(ctx, bx, by, bw, bh, { title: 'لكل لون: النافذ (أعمدة) والمستطار ∝ 1/λ⁴' });
      const x0 = bx + 14, x1 = bx + bw - 14, b = by + bh - 20, hh = bh - 46, Nn = 16, cw = (x1 - x0) / Nn;
      for (let i = 0; i < Nn; i++) { const l = 400 + i * 20, t = tr(S, l); ctx.fillStyle = wlColor(l, .9); ctx.fillRect(x0 + i * cw + 1, b - t * hh, cw - 2, t * hh); ctx.strokeStyle = 'rgba(148,163,184,.4)'; ctx.lineWidth = 1; ctx.strokeRect(x0 + i * cw + 1, b - hh, cw - 2, hh); }
      ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= Nn; i++) { const l = 400 + i * 18.75, v = Math.pow(400 / l, 4); const x = x0 + i * cw, y = b - v * hh; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      G.text(ctx, '400', x0 + 8, b + 10, { s: 9, c: '#94a3b8', mono: 1 }); G.text(ctx, '700 nm', x1 - 14, b + 10, { s: 9, c: '#94a3b8', mono: 1 });
    }
  };
  E.drags = S => {
    const g = geo(S);
    return [
      { id: 'sun', cx: g.ox, cy: g.gy, x: g.sun[0], y: g.sun[1], r: 28, tip: 'اسحب الشمس على مسارها (من الشروق إلى الظهر)', idle: 'حرّك الشمس ✋', drag: (S, d) => setParam(S, 'sun', clamp(deg(Math.atan2(g.gy - d.y, d.x - g.ox)), 2, 90)), wheel: (S, s) => setParam(S, 'sun', S.p.sun + s) },
      { id: 'air', x: g.ox + 60, y: g.gy - g.Ha * .5, hit: (x, y) => { const r = Math.hypot(x - g.ec[0], y - g.ec[1]); return r > g.Re + 4 && r < g.Re + g.Ha && Math.hypot(x - g.sun[0], y - g.sun[1]) > 40; }, axis: 'y', hint: false, tip: 'اسحب لأعلى/لأسفل (أو العجلة) لتغيير كثافة الجسيمات في الجو', drag: (S, d) => setParam(S, 'dens', S.p.dens - d.dy * .01), wheel: (S, s) => setParam(S, 'dens', S.p.dens + .05 * s) }
    ];
  };
  E.readings = S => { const C = colors(S); const s = C.sun; const hue = (s[2] / Math.max(1, s[0])) / SUN0(); const name = hue > .7 ? 'أبيض مصفر' : hue > .45 ? 'أصفر' : hue > .2 ? 'برتقالي' : 'أحمر'; return [rd('ارتفاع الشمس', fmt(S.p.sun, 3, '°')), rd('طول المسار في الجو (نسبة للعمودي)', fmt(AMf(S.p.sun), 3) + '×'), rd('نسبة استطارة الأزرق (450nm) إلى الأحمر (700nm)', fmt((700 / 450) ** 4, 3) + ' مرة', 1), rd('النافذ من الأزرق 450nm', Math.round(tr(S, 450) * 100) + ' %'), rd('النافذ من الأحمر 700nm', Math.round(tr(S, 700) * 100) + ' %'), rd('لون قرص الشمس', name)]; };
  E.explain = S => S.p.sun > 25 ? `الشمس عالية: يقطع ضوؤها مساراً قصيراً في الجو. جزيئات الهواء <b>تستطير الأزرق أكثر</b> (I ∝ 1/λ⁴) في جميع الاتجاهات فتبدو السماء زرقاء، ويصل قرص الشمس أبيض مصفراً.` : `الشمس قرب الأفق: المسار في الجو أطول ${fmt(AMf(S.p.sun), 3)} مرة، فيُستطار <b>معظم الأزرق</b> قبل وصوله إلى العين ويصل <b>الأحمر والبرتقالي</b> — لون الشفق.`;
  E.howto = 'اسحب <b>الشمس</b> على قوسها من الأفق إلى السمت ولاحظ طول مسار ضوئها في الغلاف الجوي، وتغيّر لون الشعاع على طول المسار، والأسهم الملونة للضوء المستطار (الأزرق أطول بكثير). اسحب في <b>الغلاف الجوي</b> (أو استعمل العجلة) لتغيير كثافة الجسيمات.';
})();
