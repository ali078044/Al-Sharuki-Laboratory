'use strict';
/* ==== g7_pressure_area: extra comparison scenes (needle, knife, tyres, bed of nails) + more control ==== */
(() => {
  const E = EXPS.find(e => e.id === 'g7_pressure_area'); if (!E) return;
  const T = {
    needle: { n: 'الإبرة والإصبع على البالون', L: ['رأس إبرة حاد', 0.001], R: ['طرف الإصبع', 1], F: 20, unit: 'N', mat: 'balloon', pop: 30, task: 'اسحب اللوح إلى الأسفل ليضغط الإبرة والإصبع بالقوة نفسها على البالونين ⬇' },
    knife: { n: 'السكين الحادة وغير الحادة', L: ['سكين حادة (مشحوذة)', 0.04], R: ['سكين غير حادة', 1.5], F: 20, unit: 'N', mat: 'carrot', cut: 300, task: 'اسحب اللوح إلى الأسفل لتقطع الجزرة بالسكينين بالقوة نفسها ⬇' },
    tyre: { n: 'الإطار الضيق والإطار العريض (السرفة)', L: ['إطار ضيق', 400], R: ['إطار عريض / سرفة', 4000], F: 20000, unit: 'N', mat: 'mud', task: 'اسحب اللوح إلى الأسفل لتُنزل العربتين (الوزن نفسه) على الأرض الطينية ⬇' },
    bed: { n: 'مسمار واحد وفراش المسامير', L: ['مسمار واحد', 0.005], R: ['فراش من 400 مسمار', 2], F: 30, unit: 'N', mat: 'balloon', pop: 40, under: 1, task: 'اسحب اللوح إلى الأسفل ليضغط البالونين على المسامير بالقوة نفسها ⬇' }
  };
  const vc = E.controls.find(c => c.k === 'view'); vc.opts.push(['needle', 'الإبرة والبالون'], ['knife', 'السكين والجزرة'], ['tyre', 'الإطارات والطين'], ['bed', 'فراش المسامير']);
  const isX = S => !!T[S.p.view];
  const geo = S => { const w = S.W, h = S.H, by = h * .8; return { w, h, by, x1: 64 + (w - 64) * .28, x2: 64 + (w - 64) * .64, sy: by - 30, top: h * .2 }; };
  const st = S => (S.cx = S.cx || { cp: 0, hold: false, pop: [0, 0], cut: [0, 0], dent: [0, 0] });
  const forces = S => { const t = T[S.p.view], c = st(S); const F = c.cp * t.F; return { F, P: [F / t.L[1], F / t.R[1]] }; };
  const fP = v => v >= 1e4 ? fmt(v, 3) : v >= 100 ? Math.round(v) + '' : fmt(v, 3);
  const up0 = E.update, dr0 = E.draw, dg0 = E.drags, rd0 = E.readings, ex0 = E.explain;
  E.update = function (S, dt) {
    if (S.p.view === 'clay' || S.p.view === 'feet') { /* target force + person weight */ }
    up0.call(this, S, dt);
    if (!isX(S)) return; const t = T[S.p.view], c = st(S);
    if (!c.hold) c.cp = Math.max(0, c.cp - dt * 1.4);
    const { P } = forces(S);
    [0, 1].forEach(i => {
      if (t.mat === 'balloon') { if (!c.pop[i] && P[i] > t.pop) { c.pop[i] = 1; if (window.Sound) Sound.pop(); } c.dent[i] = c.pop[i] ? 0 : Math.min(18, P[i] * .6); }
      if (t.mat === 'carrot') c.cut[i] = Math.max(c.cut[i], clamp(P[i] / t.cut, 0, 1));
      if (t.mat === 'mud') c.dent[i] = Math.max(c.dent[i] * .995, Math.min(60, P[i] * 1.2));
    });
  };
  const tool = (ctx, kind, side, x, y, s) => K.raw(ctx, () => { // y = tip y
    ctx.fillStyle = '#94a3b8'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5;
    if (kind === 'needle') { if (!side) { ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 2.5, y - 20); ctx.lineTo(x - 2.5, y - 110); ctx.lineTo(x + 2.5, y - 110); ctx.lineTo(x + 2.5, y - 20); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, y - 104, 1.2, 4, 0, 0, TAU); ctx.fillStyle = '#fff'; ctx.fill(); }
      else { ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#b45309'; rr(ctx, x - 16, y - 110, 32, 110, 15); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fde7d3'; rr(ctx, x - 10, y - 26, 20, 22, 8); ctx.fill(); } }
    if (kind === 'knife') { const bw = side ? 14 : 2; ctx.fillStyle = '#475569'; rr(ctx, x - 9, y - 150, 18, 46, 4); ctx.fill(); ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.moveTo(x - bw / 2, y); ctx.lineTo(x - 9, y - 50); ctx.lineTo(x - 9, y - 104); ctx.lineTo(x + 9, y - 104); ctx.lineTo(x + 9, y - 50); ctx.lineTo(x + bw / 2, y); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    if (kind === 'tyre') { const tw = side ? 90 : 26, r = 46; ctx.fillStyle = side ? '#78350f' : '#334155'; ctx.fillRect(x - 70, y - 2 * r - 46, 140, 40); ctx.fillStyle = '#1f2937'; rr(ctx, x - tw / 2, y - 2 * r, tw, 2 * r, side ? 18 : 10); ctx.fill(); ctx.strokeStyle = '#6b7280'; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(x - tw / 2, y - 2 * r + 8 + k * 14); ctx.lineTo(x + tw / 2, y - 2 * r + 4 + k * 14); ctx.stroke(); } }
    if (kind === 'bed') { ctx.fillStyle = '#a16207'; rr(ctx, x - 70, y - 20, 140, 14, 4); ctx.fill(); }
  });
  E.draw = function (ctx, w, h, S) {
    if (!isX(S)) {
      dr0.call(this, ctx, w, h, S); return;
    }
    const t = T[S.p.view], c = st(S), g = geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.by });
    const { F, P } = forces(S); const press = c.cp * 60;
    [0, 1].forEach(i => {
      const x = i ? g.x2 : g.x1, side = t[i ? 'R' : 'L'];
      if (t.mat === 'balloon') {
        const by = g.sy - (t.under ? 34 : 0); const rx = 54, ry = 46 - c.dent[i] * .5;
        if (t.under) K.raw(ctx, () => { ctx.fillStyle = '#78716c'; rr(ctx, x - 70, g.sy - 10, 140, 12, 3); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.6; const n = i ? 15 : 1; for (let k = 0; k < n; k++) { const xx = n === 1 ? x : x - 60 + 120 * k / (n - 1); ctx.beginPath(); ctx.moveTo(xx, g.sy - 10); ctx.lineTo(xx, g.sy - 34); ctx.stroke(); } });
        if (!c.pop[i]) { K.raw(ctx, () => { const gg = ctx.createRadialGradient(x - 18, by - ry - 14, 4, x, by - ry, rx); gg.addColorStop(0, '#fecaca'); gg.addColorStop(1, '#dc2626'); ctx.fillStyle = gg; ctx.beginPath(); ctx.ellipse(x, by - ry, rx, ry, 0, 0, TAU); ctx.fill(); }); }
        else { K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; for (let k = 0; k < 7; k++) { const a = k * TAU / 7; ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * 40, by - 10 + Math.sin(a) * 12, 10, 4, a, 0, TAU); ctx.fill(); } }); C3.T(ctx, 'انفجر! 💥', x, by - 70, { s: 15, c: '#fff', bg: '#dc2626' }); }
        const tipY = t.under ? by - 2 * ry - 6 : by - 2 * ry + c.dent[i] * .4;
        tool(ctx, t.under ? 'bed' : 'needle', i, x, (t.under ? tipY - 60 + press * (c.pop[i] ? 1 : .2) + 60 : tipY - 50 + press * (c.pop[i] ? 1.2 : .9)), 1);
      }
      if (t.mat === 'carrot') {
        const ch = 70, cy = g.sy; K.raw(ctx, () => { ctx.fillStyle = '#f97316'; rr(ctx, x - 60, cy - ch, 120, ch, 30); ctx.fill(); ctx.strokeStyle = '#c2410c'; ctx.lineWidth = 1.2; for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(x - 50 + k * 20, cy - ch + 8); ctx.lineTo(x - 52 + k * 20, cy - ch + 18); ctx.stroke(); } ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.moveTo(x + 60, cy - ch / 2); ctx.lineTo(x + 86, cy - ch / 2 - 16); ctx.lineTo(x + 82, cy - ch / 2 + 8); ctx.fill(); });
        const cd = c.cut[i] * ch; if (cd > 1) K.raw(ctx, () => { ctx.fillStyle = '#fed7aa'; ctx.fillRect(x - (i ? 7 : 1.5), cy - ch, i ? 14 : 3, cd); });
        if (c.cut[i] >= 1) C3.T(ctx, 'قُطعت ✓', x, cy + 18, { s: 13, c: '#fff', bg: '#16a34a' });
        tool(ctx, 'knife', i, x, cy - ch + cd - 4 + (c.cut[i] < 1 ? press * .15 : 0) - 10 + 10, 1);
      }
      if (t.mat === 'mud') {
        K.raw(ctx, () => { const mg = ctx.createLinearGradient(0, g.sy - 10, 0, g.by); mg.addColorStop(0, '#a16207'); mg.addColorStop(1, '#713f12'); ctx.fillStyle = mg; ctx.fillRect(x - 110, g.sy - 10, 220, g.by - g.sy + 10); ctx.fillStyle = '#451a03'; const tw = i ? 90 : 26; ctx.fillRect(x - tw / 2, g.sy - 10, tw, c.dent[i]); });
        tool(ctx, 'tyre', i, x, g.sy - 10 + c.dent[i] - 60 + press, 1);
      }
      C3.T(ctx, side[0], x, g.by + 22, { s: 12.5, c: '#fff', bg: i ? '#0f766e' : '#7c3aed' });
      if (p.calc) C3.card(ctx, x, 70, [`A = ${side[1]} cm²`, `P = ${fmt(F, 3)} ÷ ${side[1]} = ${fP(P[i])} N/cm²`], { hi: 1, s: 12.5, bd: i ? '#0f766e' : '#7c3aed' });
      if (p.arrows && F > 0) { C3.arrow(ctx, x + 80, g.top + 30, x + 80, g.top + 30 + 20 + c.cp * 50, '#dc2626', 4); C3.T(ctx, 'F = ' + fmt(F, 3) + ' ' + t.unit, x + 80, g.top + 14, { s: 12, c: '#fff', bg: '#dc2626' }); }
    });
    // the common pressing board (same force on both)
    const yb = g.top + 40 + press; K.raw(ctx, () => { ctx.fillStyle = 'rgba(30,41,59,.85)'; rr(ctx, g.x1 - 40, yb, g.x2 - g.x1 + 80, 16, 6); ctx.fill(); ctx.strokeStyle = 'rgba(30,41,59,.5)'; ctx.setLineDash([5, 4]); [g.x1, g.x2].forEach(x => { ctx.beginPath(); ctx.moveTo(x, yb + 16); ctx.lineTo(x, yb + 60); ctx.stroke(); }); ctx.setLineDash([]); });
    C3.T(ctx, 'القوة نفسها على الاثنين', (g.x1 + g.x2) / 2, yb - 12, { s: 12, c: '#fff', bg: '#334155' });
    C3.task(ctx, w, t.task, '#0f766e');
    K.party(ctx, S);
  };
  E.drags = function (S) {
    if (!isX(S)) return dg0.call(this, S); const g = geo(S), c = st(S), yb = g.top + 40 + c.cp * 60;
    return [{ id: 'board', x: (g.x1 + g.x2) / 2, y: yb + 8, w: g.x2 - g.x1 + 80, h: 40, dir: Math.PI / 2, tip: 'اسحب اللوح إلى الأسفل لتضغط بالقوة نفسها على الاثنين', idle: 'اسحب اللوح إلى الأسفل ⬇',
      down: S => { c.hold = true; }, drag: (S, d) => { c.cp = clamp(c.cp + d.dy / 120, 0, 1); }, up: S => { c.hold = false; } },
    { id: 'again', x: g.w - 90, y: g.h * .2 + 120, r: 30, hint: false, tip: 'إعادة', click: S => { S.cx = null; } }];
  };
  E.readings = function (S) {
    if (!isX(S)) return rd0.call(this, S);
    const t = T[S.p.view], { F, P } = forces(S);
    return [rd('القوة (نفسها للاثنين)', fmt(F, 3) + ' ' + t.unit), rd(t.L[0], fP(P[0]) + ' N/cm²'), rd(t.R[0], fP(P[1]) + ' N/cm²'), rd('الضغط أكبر عند', t.L[0] + ' — مساحته أصغر', 1)];
  };
  E.explain = function (S) { if (!isX(S)) return ex0.call(this, S); const t = T[S.p.view]; return `القوة نفسها تؤثر في الاثنين، لكن <b>${t.L[0]}</b> مساحته صغيرة جداً (${t.L[1]} cm²) فيكون <b>ضغطه كبيراً</b>، بينما <b>${t.R[0]}</b> مساحته كبيرة (${t.R[1]} cm²) فيكون ضغطه صغيراً. P = F / A`; };
  // more control: target scale reading for the discs and the man's weight
  const u1 = E.update; E.update = function (S, dt) { u1.call(this, S, dt); };
  E.steps = E.steps.concat(['جرّب المشاهد الجديدة: الإبرة والبالون، السكين والجزرة، الإطارات والطين، وفراش المسامير — القوة نفسها والمساحة مختلفة.']);
})();

/* ==== g7_liquid_pressure: weight of the liquid column (black arrow, w = m g), base area arrow, diver scene ==== */
(() => {
  const E = EXPS.find(e => e.id === 'g7_liquid_pressure'); if (!E) return;
  E.controls.push(TG('wcol', 'وزن عمود السائل ومساحة القاعدة', true, null, 'force'));
  const vc = E.controls.find(c => c.k === 'view'); vc.opts.push(['diver', 'الغوّاص والعمق']);
  const dr0 = E.draw, dg0 = E.drags, rd0 = E.readings, ex0 = E.explain;
  E.draw = function (ctx, w, h, S) {
    const p = S.p;
    if (p.view === 'diver') {
      const by = h * .92, top = h * .16; K.bg(ctx, w, h, { benchY: by, bench: false, top: '#bae6fd', bottom: '#bae6fd' });
      const L = B3.LIQ[p.liq]; K.raw(ctx, () => { const g = ctx.createLinearGradient(0, top, 0, by); g.addColorStop(0, '#7dd3fc'); g.addColorStop(1, '#0c4a6e'); ctx.fillStyle = g; ctx.fillRect(0, top, w, h - top); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x < w; x += 8) ctx.lineTo(x, top + 3 * Math.sin(x / 20 + S.t * 2)); ctx.stroke(); });
      const D = S.dvD ?? 10, y = top + (by - top) * D / 40, x = 64 + (w - 64) * .45;
      // depth scale
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.font = '700 11px ui-monospace,monospace'; ctx.textAlign = 'left'; for (let d = 0; d <= 40; d += 5) { const yy = top + (by - top) * d / 40; ctx.fillRect(72, yy, d % 10 ? 8 : 14, 2); ctx.fillText(d + ' m', 90, yy + 4); } });
      // column of water above the diver
      if (p.wcol) K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.18)'; ctx.fillRect(x - 30, top, 60, y - top - 20); ctx.strokeStyle = '#0f172a'; ctx.setLineDash([5, 4]); ctx.strokeRect(x - 30, top, 60, y - top - 20); ctx.setLineDash([]); });
      if (p.wcol && D > 1) { K.raw(ctx, () => G.arrow(ctx, x, top + 10, x, y - 26, '#0f172a', 4, 14)); G.text(ctx, 'w = m × g', x + 74, top + 26, { s: 14, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.9)', mono: 1, raw: 1 }); }
      // diver
      K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#111827'; rr(ctx, -40, -10, 80, 22, 10); ctx.fill(); ctx.fillStyle = '#facc15'; rr(ctx, -30, -22, 46, 12, 5); ctx.fill(); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(46, -2, 11, 0, TAU); ctx.fill(); ctx.fillStyle = '#38bdf8'; ctx.fillRect(48, -8, 9, 8); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(-40, -6); ctx.lineTo(-68, -16 + 5 * Math.sin(S.t * 6)); ctx.lineTo(-68, 8 - 5 * Math.sin(S.t * 6)); ctx.closePath(); ctx.fill(); ctx.restore(); });
      for (let k = 0; k < 5; k++) { const ph = (S.t * .6 + k / 5) % 1; K.ball(ctx, x + 50 + Math.sin(ph * 9) * 4, y - 12 - ph * (y - top), 3 + ph * 4 * (1 + D / 20), 'rgba(255,255,255,.7)'.length ? '#e0f2fe' : '#fff'); }
      // pressure arrows all around
      const P = L.rho * 9.8 * D, Pt = P + 101325, k = 8 + D * 1.1;
      if (p.press) for (let a = 0; a < 8; a++) { const ang = a * TAU / 8, ex = x + Math.cos(ang) * 70, ey = y + Math.sin(ang) * 50; K.raw(ctx, () => G.arrow(ctx, ex + Math.cos(ang) * k, ey + Math.sin(ang) * k, ex, ey, '#f97316', 2.5, 8)); }
      C3.card(ctx, w - 170, 80, [`العمق h = ${fmt(D, 3)} m`, `ضغط ${L.n}: ${fmt(P / 1000, 3)} kPa`, `مع الضغط الجوي: ${fmt(Pt / 1000, 4)} kPa`], { hi: 1, s: 13 });
      if (D > 25) K.bubble(ctx, 'أذناي تؤلمانني! الضغط كبير', x + 40, y - 30, { s: 13 });
      C3.task(ctx, w, 'اسحب الغوّاص إلى الأعمق ولاحظ ازدياد الضغط ⬇', '#0369a1');
      return;
    }
    dr0.call(this, ctx, w, h, S);
    if (p.view === 'holes' && p.wcol) {
      const g = B3.geoH(S), s = g.s, wtop = g.base - S.lev * s, xl = g.bx - g.bw / 2 + 6, xr = g.bx + g.bw / 2 - 6;
      if (S.lev > 1) {
        K.raw(ctx, () => G.arrow(ctx, g.bx, wtop + 18, g.bx, g.base - 12, '#000000', 4.5, 14));
        G.text(ctx, 'w = m × g', g.bx, wtop + 8 > 40 ? wtop - 14 : wtop + 8, { s: 14, w: 900, c: '#000000', bg: 'rgba(255,255,255,.9)', mono: 1, raw: 1 });
        G.text(ctx, 'وزن عمود السائل', g.bx - g.bw / 2 - 64, (wtop + g.base) / 2, { s: 12, w: 800, c: '#000000', bg: 'rgba(255,255,255,.85)', raw: 1 });
      }
      K.raw(ctx, () => { ctx.strokeStyle = '#7c3aed'; ctx.fillStyle = '#7c3aed'; ctx.lineWidth = 3; const y = g.base - 5; ctx.beginPath(); ctx.moveTo(xl + 8, y); ctx.lineTo(xr - 8, y); ctx.stroke(); G.arrow(ctx, g.bx, y, xl, y, '#7c3aed', 3, 9); G.arrow(ctx, g.bx, y, xr, y, '#7c3aed', 3, 9); });
      G.text(ctx, 'A مساحة القاعدة', g.bx, g.base + 18, { s: 12, w: 900, c: '#fff', bg: '#7c3aed', raw: 1 });
      G.text(ctx, 'ضغط السائل = w ÷ A', g.bx + g.bw / 2 + 92, g.base - 40, { s: 13, w: 900, c: '#000000', bg: 'rgba(255,255,255,.9)', raw: 1 });
    }
  };
  E.drags = function (S) {
    if (S.p.view !== 'diver') return dg0.call(this, S);
    const h = S.H, w = S.W, by = h * .92, top = h * .16, D = S.dvD ?? 10, y = top + (by - top) * D / 40, x = 64 + (w - 64) * .45;
    return [{ id: 'diver', x, y, w: 150, h: 60, axis: 'y', idle: 'اسحب الغوّاص ⬇', tip: 'اسحب الغوّاص إلى الأعلى أو الأسفل', keep: true, drag: (S, d) => { S.dvD = clamp(D + (d.y - d.sy) * 40 / (by - top), 0, 40); } }];
  };
  E.readings = function (S) { if (S.p.view !== 'diver') return rd0.call(this, S); const L = B3.LIQ[S.p.liq], D = S.dvD ?? 10, P = L.rho * 9.8 * D; return [rd('العمق', fmt(D, 3) + ' m'), rd('ضغط السائل', fmt(P / 1000, 3) + ' kPa'), rd('الضغط الكلي', fmt((P + 101325) / 1000, 4) + ' kPa'), rd('كل 10 m من الماء تضيف', 'نحو 1 atm', 1)]; };
  E.explain = function (S) { if (S.p.view !== 'diver') return ex0.call(this, S) + (S.p.view === 'holes' ? ' <b>السهم الأسود</b> هو وزن عمود السائل (w = m g) الذي يتوزع على مساحة القاعدة A.' : ''); return 'كلما نزل الغوّاص أعمق ازداد <b>ارتفاع عمود الماء فوقه</b>، فيزداد وزنه ويزداد <b>الضغط</b> عليه من جميع الجهات.'; };
})();

/* ==== g7_vessels: tilt each vessel left / right by dragging its top ==== */
(() => {
  const E = EXPS.find(e => e.id === 'g7_vessels'); if (!E) return;
  B4.tilt = [0, 0, 0, 0, 0];
  B4.SH.forEach((s, i) => { const o0 = s.off; s.off = y => o0(y) + B4.tilt[i] * y; });
  E.controls.push(BT('ميل الأواني', [{ t: 'إعادة الأواني مستقيمة', on: S => { S.tilts = [0, 0, 0, 0, .2]; } }, { t: 'إمالة عشوائية', on: S => { S.tilts = S.tilts.map(() => +(Math.random() * .9 - .45).toFixed(2)); } }]));
  const su0 = E.setup, up0 = E.update, dr0 = E.draw, dg0 = E.drags;
  const sync = S => { if (!S.tilts) S.tilts = [0, 0, 0, 0, 0]; S.tilts.forEach((t, i) => B4.tilt[i] = i === 4 ? t - .2 : t); };
  E.setup = function (S) { su0.call(this, S); S.tilts = [0, 0, 0, 0, .2]; };
  E.update = function (S, dt) { sync(S); up0.call(this, S, dt); };
  E.draw = function (ctx, w, h, S) { sync(S); dr0.call(this, ctx, w, h, S); const g = B4.geo(S); if (S.p.labels) B4.SH.forEach((s, i) => { const x = g.xs[i] + s.off(1) * g.Hv; G.text(ctx, '↔', x, g.y0 - g.Hv - 16, { s: 14, w: 900, c: '#fff', bg: '#7c3aed', raw: 1 }); }); };
  E.drags = function (S) {
    sync(S); const L = dg0.call(this, S); if (!S.W) return L; const g = B4.geo(S);
    B4.SH.forEach((s, i) => { const x = g.xs[i] + s.off(1) * g.Hv, y = g.y0 - g.Hv - 16; L.unshift({ id: 'tilt' + i, x, y, r: 16, axis: 'x', hint: i === 1 && !S._touched, idle: i === 1 ? 'أمِل الإناء يميناً أو يساراً ↔' : undefined, tip: 'اسحب يميناً أو يساراً لإمالة الإناء', keep: true, drag: (S, d) => { const t0 = S._t0 ?? S.tilts[i]; S.tilts[i] = clamp(t0 + (d.x - d.sx) / g.Hv, i === 4 ? -.1 : -.28, i === 4 ? .5 : .28); }, down: S => { S._t0 = S.tilts[i]; }, up: S => { S._t0 = null; } }); });
    return L;
  };
  E.steps = E.steps.concat(['أمِل أي إناء يميناً أو يساراً بسحب المقبض ↔ أعلاه: يبقى سطح الماء في المستوى الأفقي نفسه في كل الأواني.']);
})();

/* ==== g7_gas_pressure: more examples — sealed syringe (volume) and spray can in the sun (temperature) ==== */
(() => {
  const E = EXPS.find(e => e.id === 'g7_gas_pressure'); if (!E) return;
  const oc = E.controls.find(c => c.k === 'obj'); oc.opts.push(['syringe', 'محقنة مسدودة'], ['spray', 'علبة بخاخ'], ['jar', 'قنينة مغلقة على النار']);
  const NEW = { syringe: 1, spray: 1, jar: 1 }; Object.assign(B5.OBJ, { syringe: { n: 'محقنة مسدودة', N0: 1, k: .1 }, spray: { n: 'علبة بخاخ', N0: 1, k: .1 }, jar: { n: 'قنينة مغلقة', N0: 1, k: .1 } });
  const dr0 = E.draw, dg0 = E.drags, rd0 = E.readings, ex0 = E.explain, up0 = E.update;
  const P = S => { const o = S.p.obj, Tr = (S.p.T + 273) / 293; if (o === 'syringe') return Tr / (S.syV ?? 1); if (o === 'jar') return (S.jarT + 273) / 293; return Tr; };
  const parts = S => { if (!S.gp) S.gp = Array.from({ length: 36 }, () => ({ x: Math.random(), y: Math.random(), a: Math.random() * TAU })); return S.gp; };
  E.update = function (S, dt) {
    if (!NEW[S.p.obj]) return up0.call(this, S, dt);
    if (S.jarT == null) S.jarT = 20; if (S.p.obj === 'jar') S.jarT = S.fire ? Math.min(140, S.jarT + dt * 12) : Math.max(20, S.jarT - dt * 4);
    const Tk = S.p.obj === 'jar' ? S.jarT : S.p.T; const v = .25 * Math.sqrt((Tk + 273) / 293); S.hits = (S.hits || 0) * .98;
    parts(S).forEach(q => { q.x += Math.cos(q.a) * v * dt * 2; q.y += Math.sin(q.a) * v * dt * 2; if (q.x < 0 || q.x > 1) { q.a = Math.PI - q.a; q.x = clamp(q.x, 0, 1); S.hits++; } if (q.y < 0 || q.y > 1) { q.a = -q.a; q.y = clamp(q.y, 0, 1); S.hits++; } });
    if (S.p.obj === 'jar' && S.jarT > 120 && !S.jarPop) { S.jarPop = 1; if (window.Sound) Sound.pop(); }
  };
  const box = (ctx, S, x, y, w, h, col) => { parts(S).forEach(q => K.ball(ctx, x + 6 + q.x * (w - 12), y + 6 + q.y * (h - 12), 5, col)); };
  E.draw = function (ctx, w, h, S) {
    const o = S.p.obj; if (!NEW[o]) return dr0.call(this, ctx, w, h, S);
    const by = h * .84; K.bg(ctx, w, h, { benchY: by }); const cx = 64 + (w - 64) * .42, Pv = P(S);
    if (o === 'syringe') {
      const V = S.syV ?? 1, L = 300, x0 = cx - L / 2, y = h * .45, gl = L * V * .8;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(224,242,254,.7)'; ctx.fillRect(x0, y - 40, L, 80); ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.strokeRect(x0, y - 40, L, 80); ctx.fillStyle = '#dc2626'; rr(ctx, x0 - 26, y - 10, 26, 20, 4); ctx.fill(); ctx.fillStyle = '#334155'; ctx.fillRect(x0 + gl, y - 38, 12, 76); ctx.fillRect(x0 + gl + 12, y - 6, 160, 12); ctx.fillRect(x0 + gl + 170, y - 34, 12, 68); });
      box(ctx, S, x0, y - 40, gl, 80, '#3b82f6');
      G.text(ctx, 'الفوهة مسدودة', x0 - 14, y + 34, { s: 11, c: '#fff', bg: '#dc2626', raw: 1 });
      G.text(ctx, `حجم الهواء V = ${Math.round(V * 100)} cm³`, cx, y + 70, { s: 13, w: 800, c: '#1e293b', bg: 'rgba(255,255,255,.9)', raw: 1 });
    } else if (o === 'spray') {
      const x = cx, yb = by - 4, cw = 90, chh = 200, hot = S.p.T > 48;
      K.raw(ctx, () => { const g = ctx.createLinearGradient(x - cw / 2, 0, x + cw / 2, 0); g.addColorStop(0, '#2563eb'); g.addColorStop(.5, '#93c5fd'); g.addColorStop(1, '#1d4ed8'); ctx.fillStyle = g; rr(ctx, x - cw / 2, yb - chh, cw, chh, 18); ctx.fill(); ctx.fillStyle = '#e5e7eb'; rr(ctx, x - 16, yb - chh - 26, 32, 28, 5); ctx.fill(); ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(w - 130, 110, 30 + (S.p.T - 20) * .5, 0, TAU); ctx.fill(); });
      box(ctx, S, x - cw / 2 + 4, yb - chh + 8, cw - 8, chh - 16, '#facc15');
      if (hot) K.bubble(ctx, '⚠ خطر! الضغط كبير — احفظ البخاخ في مكان بارد وفي الظل', x + 40, yb - chh - 30, { s: 12.5, bg: '#fee2e2', bd: '#dc2626', c: '#991b1b' });
      G.text(ctx, 'غيّر درجة حرارة الهواء (الشمس) من الترتيبات أو اسحب الشمس', cx, by + 26, { s: 12, c: '#fff', bg: '#b45309', raw: 1 });
    } else {
      const x = cx, yb = by - 70; K.burner(ctx, x, yb + 10, S.fire ? 1 : 0, S.t);
      if (!S.jarPop) { K.raw(ctx, () => { ctx.fillStyle = 'rgba(186,230,253,.55)'; rr(ctx, x - 60, yb - 190, 120, 180, 14); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#475569'; rr(ctx, x - 40, yb - 206, 80, 18, 4); ctx.fill(); }); box(ctx, S, x - 56, yb - 186, 112, 172, '#ef4444'); }
      else { K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.save(); ctx.translate(x + 60, yb - 300); ctx.rotate(.6); rr(ctx, -40, -9, 80, 18, 4); ctx.fill(); ctx.restore(); }); G.text(ctx, 'انطلق الغطاء! الضغط تغلّب عليه 💥', x, yb - 230, { s: 14, c: '#fff', bg: '#dc2626', raw: 1 }); }
      K.thermo(ctx, x + 120, yb - 20, 170, S.jarT ?? 20, 0, 150, { step: 30 });
      G.text(ctx, 'انقر الموقد للتشغيل / الإطفاء', x, by + 26, { s: 12, c: '#fff', bg: '#b45309', raw: 1 });
    }
    // pressure gauge
    const gx = w - 120, gy = h * .62; K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(gx, gy, 58, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 5; ctx.stroke(); const a = -Math.PI * 1.2 + clamp(Pv / 4, 0, 1) * Math.PI * 1.4; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(a) * 46, gy + Math.sin(a) * 46); ctx.stroke(); });
    G.text(ctx, fmt(Pv * 101, 3) + ' kPa', gx, gy + 30, { s: 13, w: 900, c: '#0f172a', mono: 1, raw: 1 });
    G.text(ctx, 'مقياس الضغط', gx, gy - 74, { s: 12, c: '#fff', bg: '#334155', raw: 1 });
    G.text(ctx, 'تصادمات الجزيئات ↑ ⇒ الضغط ↑', 64 + (w - 64) * .42, 40, { s: 14, w: 900, c: '#fff', bg: '#0f766e', raw: 1 });
  };
  E.drags = function (S) {
    const o = S.p.obj; if (!NEW[o]) return dg0.call(this, S); const w = S.W, h = S.H, by = h * .84, cx = 64 + (w - 64) * .42;
    if (o === 'syringe') { const V = S.syV ?? 1, L = 300, x0 = cx - L / 2, y = h * .45; return [{ id: 'plunger', x: x0 + L * V * .8 + 176, y, w: 30, h: 80, axis: 'x', keep: true, idle: 'ادفع المكبس ⬅', tip: 'اسحب المكبس: دفعه يقلل الحجم فيزداد الضغط', drag: (S, d) => { S.syV = clamp(V + (d.x - d.sx) / (L * .8), .3, 1.2); } }]; }
    if (o === 'spray') return [{ id: 'sun', x: w - 130, y: 110, r: 40, axis: 'y', keep: true, tip: 'اسحب الشمس للأعلى لتسخين الجو، وللأسفل لتبريده', drag: (S, d) => setParam(S, 'T', clamp(S._T0 + -(d.y - d.sy) / 3, -10, 60)), down: S => { S._T0 = S.p.T; } }];
    return [{ id: 'burner', x: cx, y: by - 40, w: 80, h: 70, tip: 'شغّل / أطفئ الموقد', idle: 'انقر الموقد 🔥', click: S => { S.fire = !S.fire; } }, { id: 'reset', x: cx, y: by - 300, r: 30, hint: false, tip: 'إعادة الغطاء', click: S => { S.jarPop = 0; S.jarT = 20; S.fire = false; } }];
  };
  E.readings = function (S) { const o = S.p.obj; if (!NEW[o]) return rd0.call(this, S); const Pv = P(S); return [rd('الضغط', fmt(Pv * 101, 3) + ' kPa'), o === 'syringe' ? rd('الحجم', Math.round((S.syV ?? 1) * 100) + ' cm³') : rd('درجة الحرارة', fmt(o === 'jar' ? S.jarT : S.p.T, 3) + ' °C'), rd('العامل المؤثر', o === 'syringe' ? 'الحجم (بثبوت الحرارة)' : 'درجة الحرارة', 1)]; };
  E.explain = function (S) { const o = S.p.obj; if (!NEW[o]) return ex0.call(this, S); if (o === 'syringe') return 'عند دفع المكبس <b>يقل حجم الهواء</b> فتتقارب الجزيئات وتزداد تصادماتها بالجدران ← <b>يزداد الضغط</b> (قانون بويل).'; return 'التسخين يزيد <b>سرعة الجزيئات</b> فتزداد قوة تصادماتها وعددها ← <b>يزداد ضغط الغاز</b>. لذلك تُحفظ البخاخات في مكان بارد، وقد ينطلق غطاء القنينة المغلقة عند تسخينها.'; };
})();
