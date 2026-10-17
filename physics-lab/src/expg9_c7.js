'use strict';
/* ====================== الثالث المتوسط — الفصل السابع: المحولة الكهربائية (ch 37, ص 133–146) ======================
   Merged experiments (book order): g9_c7_induce (1-7) · g9_c7_trans (2-7) · g9_c7_ideal (2-7 المثالية ونقل القدرة)
   · g9_c7_loss (3-7 + الأمثلة) · g9_c7_review (أسئلة الفصل).
   Kit Q37 = Q35 (circuit kit of ch 3–5) + laminated iron core, copper coils (vertical / horizontal), alternating flux arrows,
   AC source, centre-zero galvanometer, digital meters and a small oscilloscope. Every moving thing eases toward its target. */
LW({ id: 'g9_l7_ratio', cat: 37, name: 'نسبة التحويل في المحولة', fx: FR('<i>V</i><sub>2</sub>', '<i>V</i><sub>1</sub>') + ' = ' + FR('<i>N</i><sub>2</sub>', '<i>N</i><sub>1</sub>'), sym: 'الفولطية الخارجة من الملف الثانوي ÷ الفولطية الداخلة في الملف الابتدائي = عدد لفات الملف الثانوي ÷ عدد لفات الملف الابتدائي. تدعى النسبة N₂/N₁ نسبة التحويل (نسبة عدد اللفات): أكبر من الواحد ⟸ محولة رافعة للفولطية، أصغر من الواحد ⟸ محولة خافضة للفولطية.', calc: { in: [['V1', 'فولطية الملف الابتدائي V₁', 'V', 240], ['N1', 'لفات الملف الابتدائي N₁', 'turn', 500], ['N2', 'لفات الملف الثانوي N₂', 'turn', 25]], out: 'فولطية الملف الثانوي V₂', u: 'V', f: v => v.V1 * v.N2 / v.N1 } });
LW({ id: 'g9_l7_ideal', cat: 37, name: 'المحولة المثالية (حفظ الطاقة)', fx: '<i>P</i><sub>1</sub> = <i>P</i><sub>2</sub> ، <i>I</i><sub>1</sub><i>V</i><sub>1</sub> = <i>I</i><sub>2</sub><i>V</i><sub>2</sub> ، ' + FR('<i>V</i><sub>2</sub>', '<i>V</i><sub>1</sub>') + ' = ' + FR('<i>I</i><sub>1</sub>', '<i>I</i><sub>2</sub>') + ' = ' + FR('<i>N</i><sub>2</sub>', '<i>N</i><sub>1</sub>'), sym: 'في المحولة المثالية تهمل خسائر القدرة فتكون القدرة الخارجة من الملف الثانوي مساوية للقدرة الداخلة في الملف الابتدائي (قانون حفظ الطاقة). لذا فالمحولة الرافعة للفولطية تكون خافضة للتيار، والخافضة للفولطية رافعة للتيار: الفولطية تتناسب عكسياً مع التيار.', calc: { in: [['I2', 'تيار الملف الثانوي I₂', 'A', 40], ['N1', 'لفات الملف الابتدائي N₁', 'turn', 800], ['N2', 'لفات الملف الثانوي N₂', 'turn', 200]], out: 'تيار الملف الابتدائي I₁', u: 'A', f: v => v.I2 * v.N2 / v.N1 } });
LW({ id: 'g9_l7_eff', cat: 37, name: 'كفاءة المحولة', fx: '<i>η</i> = ' + FR('<i>P</i><sub>2</sub>', '<i>P</i><sub>1</sub>') + ' × 100%', sym: 'جميع المحولات العملية يحصل فيها ضياع قدرة أثناء عملها فتكون القدرة الخارجة P₂ أقل من القدرة الداخلة P₁. كفاءة المحولة = القدرة الخارجة من ملفها الثانوي ÷ القدرة الداخلة في ملفها الابتدائي × 100%.', calc: { in: [['P2', 'القدرة الخارجة P₂', 'W', 209], ['P1', 'القدرة الداخلة P₁', 'W', 220]], out: 'الكفاءة η', u: '%', f: v => v.P2 / v.P1 * 100 } });
LW({ id: 'g9_l7_loss', cat: 37, name: 'خسائر القدرة في المحولة', fx: '<i>P</i><sub>lost</sub> = <i>P</i><sub>1</sub> − <i>P</i><sub>2</sub>', sym: 'خسائر القدرة = القدرة الداخلة − القدرة الخارجة. من أنواعها: خسارة ناتجة عن مقاومة أسلاك الملفين (تقلل بصنع الأسلاك من النحاس) وخسارة التيارات الدوامة في القلب الحديدي (تقلل بصنع القلب من صفائح رقيقة معزولة من الحديد المطاوع).', calc: { in: [['P1', 'القدرة الداخلة P₁', 'W', 220], ['P2', 'القدرة الخارجة P₂', 'W', 209]], out: 'خسائر القدرة', u: 'W', f: v => v.P1 - v.P2 } });
LW({ id: 'g9_l7_line', cat: 37, name: 'خسارة القدرة في أسلاك النقل', fx: '<i>I</i> = ' + FR('<i>P</i>', '<i>V</i>') + ' ، <i>P</i><sub>lost</sub> = <i>I</i><sup>2</sup> <i>R</i>', sym: 'تنقل القدرة الكهربائية إلى مسافات بعيدة بفولطية عالية وتيار واطئ لتقليل الخسارة الحرارية في أسلاك النقل الطويلة ذات المقاومة الكبيرة.', calc: { in: [['P', 'القدرة المنقولة P', 'W', 10000000], ['V', 'فولطية النقل V', 'V', 132000], ['R', 'مقاومة الأسلاك R', 'Ω', 5]], out: 'القدرة الضائعة', u: 'W', f: v => Math.pow(v.P / v.V, 2) * v.R } });

const Q37 = Object.assign(Object.create(Q35), {
  card(ctx, S, L, o) { return Q31.card(ctx, S, L, Object.assign({ bd: '#0891b2' }, o || {})); },
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#0e7490', y); },
  chips(S, id, list, y, cur, click, o = {}) { return Q33.chips(S, id, list.map(q => [q[0], Q31.iso(q[1])].concat(q.slice(2))), y, cur, click, Object.assign({ col: '#0e7490' }, o)); },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ecfeff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  ez(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  fv(v) { const a = Math.abs(v); return a >= 1000 ? Q33.f(v / 1000, 3) + ' kV' : Q33.f(v, a < 10 ? 2 : 1) + ' V'; },
  fi(v) { const a = Math.abs(v); return a > 0 && a < .01 ? Q33.f(v * 1000, 2) + ' mA' : Q33.f(v, a < 1 ? 3 : a < 10 ? 2 : 1) + ' A'; },
  fp(v) { const a = Math.abs(v); return a >= 1e6 ? Q33.f(v / 1e6, 3) + ' MW' : a >= 1000 ? Q33.f(v / 1000, 3) + ' kW' : Q33.f(v, 1) + ' W'; },
  /* visible turns for N real turns (log scale) */
  nv(N) { return clamp(Math.round(3 + 22 * Math.log(Math.max(N, 5) / 5) / Math.log(1600)), 3, 25); },
  /* closed core: outer box x,y,w,h, limb thickness t. o.gap lifts the top yoke, o.hot reddens, o.lamN laminations, o.solid → none */
  core(ctx, x, y, w, h, t, o = {}) {
    const gap = o.gap || 0, hot = o.hot || 0;
    K.raw(ctx, () => { ctx.save();
      const bar = (bx, by, bw, bh, vert) => { ctx.save(); ctx.shadowColor = o.hl ? '#06b6d4' : 'rgba(15,23,42,.28)'; ctx.shadowBlur = o.hl ? 20 : 8; ctx.shadowOffsetY = o.hl ? 0 : 3;
        const g = vert ? ctx.createLinearGradient(bx, 0, bx + bw, 0) : ctx.createLinearGradient(0, by, 0, by + bh); g.addColorStop(0, '#e2e8f0'); g.addColorStop(.3, '#94a3b8'); g.addColorStop(.7, '#64748b'); g.addColorStop(1, '#334155'); ctx.fillStyle = g; ctx.fillRect(bx, by, bw, bh); ctx.restore();
        if (!o.solid) { const k = o.lamN || Math.max(2, Math.round((vert ? bw : bh) / 4.5)); ctx.strokeStyle = 'rgba(15,23,42,.38)'; ctx.lineWidth = 1; for (let i = 1; i < k; i++) { ctx.beginPath(); if (vert) { const xx = bx + bw * i / k; ctx.moveTo(xx, by); ctx.lineTo(xx, by + bh); } else { const yy = by + bh * i / k; ctx.moveTo(bx, yy); ctx.lineTo(bx + bw, yy); } ctx.stroke(); } }
        else { ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(bx + 2, by + 2, vert ? 4 : bw - 4, vert ? bh - 4 : 4); }
        if (hot > .02) { ctx.fillStyle = 'rgba(239,68,68,' + (.6 * Math.min(1, hot)) + ')'; ctx.fillRect(bx, by, bw, bh); }
        ctx.strokeStyle = o.hl ? '#0891b2' : '#1e293b'; ctx.lineWidth = o.hl ? 2.5 : 1.2; ctx.strokeRect(bx, by, bw, bh); };
      bar(x, y + t, t, h - 2 * t, 1); bar(x + w - t, y + t, t, h - 2 * t, 1); bar(x, y + h - t, w, t, 0); bar(x, y - gap, w, t, 0);
      ctx.restore(); });
  },
  /* coil centred (cx,cy), length len along its axis, around a limb of width lw; nv visible turns.
     vertical by default (leads on o.side −1 left / +1 right); o.horiz → horizontal axis (leads +1 top / −1 bottom) */
  coil(ctx, cx, cy, len, lw, nv, o = {}) {
    nv = clamp(Math.round(nv), 2, 30); const sp = len / nv, hw = lw / 2 + 7, th = Math.max(2.4, Math.min(9, sp * .8)), sd = o.side || -1, hot = o.hot || 0;
    K.raw(ctx, () => { ctx.save(); ctx.translate(cx, cy); if (o.horiz) ctx.rotate(-Math.PI / 2); ctx.lineCap = 'round';
      if (hot > .03) { ctx.save(); const R = hw + 26; ctx.scale(1, (len / 2 + 26) / R); const g = ctx.createRadialGradient(0, 0, 4, 0, 0, R); g.addColorStop(0, 'rgba(249,115,22,' + (.55 * Math.min(1, hot)) + ')'); g.addColorStop(1, 'rgba(249,115,22,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.fill(); ctx.restore(); }
      if (o.hl) { ctx.shadowColor = '#06b6d4'; ctx.shadowBlur = 16; }
      const c1 = hot > .5 ? '#ef4444' : o.col || '#c2410c';
      for (let k = 0; k < nv; k++) { const y = -len / 2 + sp * (k + .5), P = d => { ctx.beginPath(); ctx.moveTo(-hw + d, y - sp * .22 - d * .3); ctx.quadraticCurveTo(0, y + sp * .3 + 2 - d * .5, hw - d, y - sp * .22 - d * .3); };
        P(0); ctx.strokeStyle = '#451a03'; ctx.lineWidth = th + 2; ctx.stroke(); P(0); ctx.strokeStyle = c1; ctx.lineWidth = th; ctx.stroke(); P(2); ctx.strokeStyle = 'rgba(254,243,199,.7)'; ctx.lineWidth = Math.max(1, th * .28); ctx.stroke(); }
      ctx.restore(); });
    const y0 = -len / 2 + sp * .28, y1 = len / 2 - sp * .72;
    return o.horiz ? { a: [cx + y0, cy - sd * hw], b: [cx + y1, cy - sd * hw], hw } : { a: [cx + sd * hw, cy + y0], b: [cx + sd * hw, cy + y1], hw };
  },
  /* alternating magnetic flux around the core: B in −1..1 (sign = direction) */
  flux(ctx, x, y, w, h, t, B, o = {}) {
    const a = Math.min(1, Math.abs(B)); if (a < .04) return; const gp = o.gap || 0, xl = x + t / 2, xr = x + w - t / 2, yt = y + t / 2 - gp, yb = y + h - t / 2;
    let P = [[xl, yb], [xl, yt], [xr, yt], [xr, yb], [xl, yb]]; if (B < 0) P = P.slice().reverse(); const Lp = Q33.plen(P), n = o.n || 10, col = o.col || '124,58,237';
    K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = 'rgba(' + col + ',' + (.2 + .4 * a) + ')'; ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]);
      for (let k = 0; k < n; k++) { const q = Q33.at(P, (k + .5) * Lp / n), s = 4 + 6 * a; ctx.save(); ctx.translate(q[0], q[1]); ctx.rotate(q[2]); ctx.fillStyle = 'rgba(' + col + ',' + (.45 + .55 * a) + ')'; ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(s, 0); ctx.lineTo(-s * .7, -s * .65); ctx.lineTo(-s * .7, s * .65); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
      ctx.restore(); });
  },
  /* whole transformer: core + primary (left limb) + secondary (right limb) + flux. returns leads {p:{a,b}, s:{a,b}} */
  xf(ctx, o) {
    const { x, y, w, h, t } = o, len = h - 2 * t - 14, cy = y + h / 2;
    Q37.core(ctx, x, y, w, h, t, { gap: o.gap, hot: o.hotCore, lamN: o.lamN, solid: o.solid, hl: o.hl === 'core' });
    const p = Q37.coil(ctx, x + t / 2, cy, len, t, o.n1v, { side: -1, hot: o.hotCoil, hl: o.hl === 'p' }), s = Q37.coil(ctx, x + w - t / 2, cy, len, t, o.n2v, { side: 1, hot: o.hotCoil, hl: o.hl === 's' });
    if (o.B != null && o.fl !== false) Q37.flux(ctx, x, y, w, h, t, o.B, { gap: o.gap, n: o.fn || 10 });
    if (o.l1) Q33.T(ctx, o.l1, x + t / 2, y + h + 14, { s: o.ls || 11, w: 900, c: '#c2410c' }); if (o.l2) Q33.T(ctx, o.l2, x + w - t / 2, y + h + 14, { s: o.ls || 11, w: 900, c: '#c2410c' });
    return { p, s };
  },
  /* AC source (or battery when o.dc); terminals on o.side (+1 right / −1 left) */
  src(ctx, x, y, V, o = {}) {
    const w = o.w || 84, h = o.h || 70, sd = o.side || 1, dc = o.dc;
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4; const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#1e293b'); g.addColorStop(.5, '#475569'); g.addColorStop(1, '#1e293b'); ctx.fillStyle = g; rr(ctx, x - w / 2, y - h / 2, w, h, 9); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#0f172a'; rr(ctx, x - w / 2 + 8, y - h / 2 + 7, w - 16, h * .48, 5); ctx.fill(); const sy = y - h / 2 + 7 + h * .24;
      ctx.lineWidth = 2.4; ctx.lineCap = 'round'; if (dc) { ctx.strokeStyle = '#facc15'; ctx.beginPath(); ctx.moveTo(x - 4, sy - 10); ctx.lineTo(x - 4, sy + 10); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + 5, sy - 5); ctx.lineTo(x + 5, sy + 5); ctx.stroke(); }
      else { ctx.strokeStyle = '#22d3ee'; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, xx = x - w / 2 + 14 + u * (w - 28), yy = sy - Math.sin(u * TAU * 1.5 - (o.ph || 0)) * h * .14; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
      [[-1, '#dc2626'], [1, '#111827']].forEach(([k, c]) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x + sd * (w / 2 + 2), y + k * h * .22, 5.5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1.2; ctx.stroke(); }); });
    Q33.T(ctx, o.txt || (Q33.f(V, 1) + ' V'), x, y + h * .3, { s: 11.5, w: 900, c: '#fff' });
    if (o.lab !== '') Q33.T(ctx, o.lab || (dc ? 'بطارية' : 'مصدر متناوب'), x, y - h / 2 - 11, { s: 10.5, w: 900, c: '#334155' });
    return { a: [x + sd * (w / 2 + 2), y - h * .22], b: [x + sd * (w / 2 + 2), y + h * .22] };
  },
  /* centre-zero galvanometer, f in −1..1 */
  galv(ctx, x, y, f, o = {}) {
    const w = o.w || 100, h = o.h || 78;
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; ctx.fillStyle = '#0e7490'; rr(ctx, x - w / 2, y - h / 2, w, h, 9); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#fffbeb'; rr(ctx, x - w / 2 + 7, y - h / 2 + 7, w - 14, h * .62, 6); ctx.fill();
      const cx = x, cy = y - h / 2 + 7 + h * .62 - 4, R = Math.min(w * .42, h * .52); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI * .82, -Math.PI * .18); ctx.stroke();
      for (let k = -5; k <= 5; k++) { const a = -Math.PI / 2 + k * Math.PI * .06, l = k ? (k % 5 ? 4 : 7) : 10; ctx.strokeStyle = k ? '#334155' : '#0e7490'; ctx.lineWidth = k ? 1.2 : 2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.lineTo(cx + Math.cos(a) * (R - l), cy + Math.sin(a) * (R - l)); ctx.stroke(); }
      const ang = -Math.PI / 2 + clamp(f, -1.15, 1.15) * Math.PI * .3; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ang) * (R - 2), cy + Math.sin(ang) * (R - 2)); ctx.stroke(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, TAU); ctx.fill();
      [-1, 1].forEach(k => { ctx.fillStyle = k < 0 ? '#111827' : '#dc2626'; ctx.beginPath(); ctx.arc(x + k * (w / 2 - 14), y + h / 2 - 9, 5, 0, TAU); ctx.fill(); }); });
    Q33.T(ctx, 'G', x, y - h / 2 + 7 + h * .62 - 18, { s: 13, w: 900, c: '#0f172a' });
    if (o.name !== '') Q33.T(ctx, o.name || 'الكلفانوميتر', x, y - h / 2 - 11, { s: 10.5, w: 900, c: '#0e7490' });
    return { a: [x - w / 2 + 14, y + h / 2 - 9], b: [x + w / 2 - 14, y + h / 2 - 9] };
  },
  /* digital meter */
  dm(ctx, x, y, txt, o = {}) {
    const w = o.w || 100, h = o.h || 48, col = o.col || '#0e7490';
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; ctx.fillStyle = col; rr(ctx, x - w / 2, y - h / 2, w, h, 8); ctx.fill(); ctx.restore(); ctx.fillStyle = '#022c22'; rr(ctx, x - w / 2 + 6, y - h / 2 + 5, w - 12, h - 19, 4); ctx.fill(); });
    Q33.T(ctx, txt, x, y - 6, { s: 13, w: 900, c: '#4ade80' }); if (o.k) Q33.T(ctx, o.k, x, y + h / 2 - 7, { s: 10, w: 900, c: '#fff' });
    if (o.name) Q33.T(ctx, o.name, x, y - h / 2 - 11, { s: 10.5, w: 900, c: col, bg: 'rgba(255,255,255,.9)' });
  },
  /* small oscilloscope: tr = [{A (−1..1), col, lab}] */
  scope(ctx, x, y, w, h, tr, ph, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 3; ctx.fillStyle = '#334155'; rr(ctx, x, y, w, h, 12); ctx.fill(); ctx.restore();
      const sx = x + 10, sy = y + 10, sw = w - 20, sh = h - 20; ctx.fillStyle = '#052e16'; rr(ctx, sx, sy, sw, sh, 6); ctx.fill(); ctx.strokeStyle = 'rgba(74,222,128,.16)'; ctx.lineWidth = 1;
      for (let i = 1; i < 10; i++) { ctx.beginPath(); ctx.moveTo(sx + sw * i / 10, sy); ctx.lineTo(sx + sw * i / 10, sy + sh); ctx.stroke(); } for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(sx, sy + sh * i / 6); ctx.lineTo(sx + sw, sy + sh * i / 6); ctx.stroke(); }
      tr.forEach(q => { ctx.save(); ctx.strokeStyle = q.col; ctx.lineWidth = 2.4; ctx.shadowColor = q.col; ctx.shadowBlur = 6; ctx.beginPath(); for (let i = 0; i <= 160; i++) { const u = i / 160, yy = sy + sh / 2 - clamp(q.A, -1, 1) * (sh / 2 - 6) * Math.sin(TAU * (o.cyc || 2) * u - ph); i ? ctx.lineTo(sx + u * sw, yy) : ctx.moveTo(sx + u * sw, yy); } ctx.stroke(); ctx.restore(); });
      ctx.restore(); });
    tr.forEach((q, i) => { if (q.lab) Q33.T(ctx, q.lab, x + w - 18, y + 24 + i * 18, { s: 11.5, w: 900, c: q.col, a: 'right' }); });
    if (o.name) Q33.T(ctx, o.name, x + w / 2, y - 10, { s: 10.5, w: 900, c: '#334155' });
  },
  /* wire with oscillating electrons (AC) */
  acw(ctx, pts, amp, ph, col) { Q33.wire(ctx, pts, { col: col || '#475569' }); if (amp > .03) Q33.flow(ctx, pts, Math.sin(ph) * 16 * Math.min(1.4, amp), 'e', { r: 3.6 }); }
});

/* =============== A1 — نشاط: توليد تيار محتث في ملف (1-7، ص 135–136، الشكل 2) =============== */
(() => {
  const NP = 60;
  const D = { id: 'g9_tr_mutual', page: 135, fig: 'الشكل 2',
    desc: 'يتولد التيار المحتث من تغير خطوط المجال المغناطيسي خلال الموصل في وحدة الزمن. نشاط: نضع داخل ملف أسطواني ساق حديد مطاوع طويلة نسبياً، ونربط مصدر الفولطية المتناوبة والمفتاح على التوالي بين طرفي الملف الأسطواني (دائرة الملف الابتدائي)، ونربط المصباح بالملف الحلقي (الملف الثانوي). عند غلق دائرة الملف الابتدائي نلاحظ توهج المصباح المربوط مع الملف الثانوي: تولد تيار محتث في الملف الثانوي نتيجة لتغير خطوط المجال المغناطيسي في وحدة الزمن المتولد في الملف الابتدائي والذي سببه انسياب التيار المتناوب فيه.',
    tags: 'نشاط توليد تيار محتث ملف أسطواني ملف حلقي مصباح ساق حديد مطاوع مصدر متناوب مفتاح الملف الابتدائي الملف الثانوي الحث المتبادل',
    tools: ['ملف بشكل أسطوانة مجوفة', 'ملف حلقي الشكل', 'مصباح كهربائي', 'مصدر للفولطية المتناوبة', 'مفتاح', 'ساق من الحديد المطاوع طويلة نسبياً'],
    steps: ['اضغط على المفتاح لغلق دائرة الملف الابتدائي: لاحظ توهج المصباح المربوط مع الملف الحلقي مع أنه غير متصل بأي مصدر.', 'اسحب الملف الحلقي إلى الأعلى على الساق: يقل التوهج كلما ابتعد عن الملف الأسطواني.', 'اضغط على رأس الساق لإخراجها: يضعف التوهج كثيراً لأن الحديد المطاوع يجمع خطوط المجال.', 'اختر «بطارية» ثم أغلق وافتح المفتاح: ومضة لحظية فقط.'],
    concl: ['يتولد تيار محتث في الملف الثانوي نتيجة تغير خطوط المجال المغناطيسي المتولد في الملف الابتدائي في وحدة الزمن.', 'سبب تغير المجال انسياب التيار المتناوب في الملف الابتدائي.', 'ساق الحديد المطاوع تزيد خطوط المجال التي تخترق الملف الثانوي فيزداد التيار المحتث.', 'مع تيار البطارية المستمر لا يتولد تيار محتث إلا لحظة الغلق أو الفتح.'],
    laws: ['g9_l7_ratio'],
    controls: [R('V', 'فولطية المصدر', 2, 24, 12, 1, 'V'), R('Nr', 'لفات الملف الحلقي', 5, 40, 20, 1, 'لفة'), TG('rod', 'ساق الحديد المطاوع', true, null, 'core'), TG('fl', 'خطوط المجال', true, null, 'bfield')],
    setup(S) { S.on = 0; S.dc = 0; S.u = .12; S.tu = .12; S.rl = 0; S.kick = 0; S.b = 0; S.ph = 0; S.V2 = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, cx = x0 + 190, base = Math.min(h - 190, 600), yt = base - 150, rt = base - 390, yHi = rt - 50, yLo = yt - 26; return { w, h, L, x0, cx, base, yt, rt, yHi, yLo, swx: cx + 118, swy: yt - 6, sx: cx + 210, sy: base - 70 }; },
    ry(S, g) { return g.yLo - S.u * (g.yLo - g.yHi); },
    cpl(S, g) { const y = D.ry(S, g), d = Math.max(0, g.yt - y), inR = 1 - S.rl, onRod = y > g.rt + 6 ? 1 : Math.exp(-(g.rt + 6 - y) / 26); return inR * Math.exp(-d / 330) * onRod + (1 - inR) * .26 * Math.exp(-d / 70); },
    tog(S2) { S2.on = S2.on ? 0 : 1; if (S2.dc) S2.kick = 1; },
    update(S, dt) { S.ph += dt * TAU * 1.1; S.u = Q37.ez(S.u, S.tu, dt, 12); S.rl = Q37.ez(S.rl, S.p.rod ? 0 : 1, dt, 6); S.kick *= Math.exp(-dt * 5);
      const c = S.W ? D.cpl(S, D.geo(S)) : .8, V2 = S.p.V * c * S.p.Nr / NP; S.V2 = S.dc ? V2 * S.kick : S.on ? V2 : 0; S.b = Q37.ez(S.b, S.V2 / 3, dt, S.dc ? 30 : 9); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), cx = g.cx, y = D.ry(S, g), ac = !S.dc, B = S.on ? (ac ? Math.sin(S.ph) : 1) : 0, inR = 1 - S.rl;
      Q37.bg(ctx, w, h); Q33.board(ctx, g.x0 - 6, g.base - 6, 440, 34);
      // field lines around the rod and coil
      if (S.p.fl !== false && Math.abs(B) > .05) K.raw(ctx, () => { ctx.save(); const a = Math.abs(B); ctx.strokeStyle = 'rgba(124,58,237,' + (.15 + .35 * a) + ')'; ctx.lineWidth = 1.6; ctx.setLineDash([5, 5]);
        const top = inR > .5 ? g.rt + 10 : g.yt - 20; for (let i = 1; i <= 3; i++) [-1, 1].forEach(sg => { ctx.beginPath(); ctx.moveTo(cx, top); ctx.bezierCurveTo(cx + sg * (50 + i * 55), top - 30 * i, cx + sg * (60 + i * 60), g.base - 20, cx + sg * 30, g.base - 30); ctx.stroke(); }); ctx.restore(); });
      // soft-iron rod (ghost when removed)
      K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = 1 - S.rl * .82; const gr = ctx.createLinearGradient(cx - 13, 0, cx + 13, 0); gr.addColorStop(0, '#e2e8f0'); gr.addColorStop(.4, '#94a3b8'); gr.addColorStop(1, '#334155'); ctx.fillStyle = gr; rr(ctx, cx - 13, g.rt, 26, g.base - g.rt - 6, 5); ctx.fill(); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.2; if (S.rl > .5) ctx.setLineDash([5, 4]); ctx.stroke(); ctx.restore(); });
      if (S.p.fl !== false && inR > .5 && Math.abs(B) > .05) for (let k = 0; k < 4; k++) { const yy = g.rt + 40 + k * (g.base - g.rt - 80) / 3; K.raw(ctx, () => { ctx.save(); ctx.translate(cx, yy); ctx.scale(1, B > 0 ? -1 : 1); ctx.fillStyle = 'rgba(124,58,237,' + (.4 + .6 * Math.abs(B)) + ')'; ctx.beginPath(); ctx.moveTo(0, 9); ctx.lineTo(-7, -5); ctx.lineTo(7, -5); ctx.closePath(); ctx.fill(); ctx.restore(); }); }
      // primary coil on a cylindrical former
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(cx - 46, 0, cx + 46, 0); gr.addColorStop(0, '#fef3c7'); gr.addColorStop(.5, '#fde68a'); gr.addColorStop(1, '#d97706'); ctx.fillStyle = gr; rr(ctx, cx - 46, g.yt - 6, 92, g.base - g.yt, 6); ctx.fill(); });
      const pc = Q37.coil(ctx, cx, (g.yt + g.base - 6) / 2, g.base - g.yt - 14, 80, 14, { side: 1 });
      Q33.T(ctx, 'الملف الابتدائي الأسطواني', cx, g.base + 32, { s: 11, w: 900, c: '#fff', bg: '#c2410c' });
      // ring coil (secondary) + lamp
      const rc = Q37.coil(ctx, cx, y, 26, 38, 4, { side: -1, hl: !S.drg }), lx = cx - 128, ly = y + 40;
      const W1 = [rc.a, [lx - 32, rc.a[1]], [lx - 32, ly], [lx - 18, ly]], W2 = [rc.b, [lx + 18, rc.b[1]], [lx + 18, ly]];
      [W1, W2].forEach(p => { Q33.wire(ctx, p, { col: '#2563eb' }); if (S.V2 > .08) Q33.flow(ctx, p, ac ? Math.sin(S.ph) * 14 : S.kick * 30, 'e', { r: 3.4 }); });
      Q33.bulb(ctx, lx, ly, S.b, { s: 1.05 }); Q33.T(ctx, 'مصباح 3 V', lx, ly + 22, { s: 10, w: 900, c: '#334155' });
      Q33.T(ctx, 'الملف الثانوي الحلقي', cx + 92, y, { s: 10.5, w: 900, c: '#fff', bg: '#2563eb' });
      if (Math.abs(y - g.rt) > 36) Q33.T(ctx, inR > .5 ? 'ساق حديد مطاوع' : 'الساق خارج الملف', cx + 78, g.rt + 12, { s: 10, w: 900, c: '#475569' });
      // primary circuit: switch + source
      const sw = Q33.sw(ctx, g.swx - 26, g.swx + 26, g.swy, !!S.on, { label: S.on ? 'مغلق' : 'مفتوح' }), so = Q37.src(ctx, g.sx, g.sy, S.p.V, { side: -1, dc: S.dc, ph: S.ph });
      const amp = S.on && ac ? 1 : 0, P1 = [pc.a, [sw.a[0], pc.a[1]], sw.a], P2 = [sw.b, [g.sx - 70, sw.b[1]], [g.sx - 70, so.a[1]], so.a], P3 = [pc.b, [g.sx - 90, pc.b[1]], [g.sx - 90, so.b[1]], so.b];
      [P1, P2, P3].forEach(p => Q37.acw(ctx, p, amp, S.ph, '#dc2626')); if (S.on && !ac) [P1, P2, P3].forEach(p => Q33.flow(ctx, p, S.ph * 6, 'c'));
      // status + card
      const lit = S.b > .08; Q33.T(ctx, lit ? 'المصباح يتوهج: تيار محتث في الملف الثانوي' : S.on ? (ac ? 'التوهج ضعيف: قرّب الملف الحلقي أو أدخل الساق' : 'المجال ثابت: لا تيار محتث') : 'اضغط على المفتاح لغلق دائرة الملف الابتدائي', g.x0 + 200, 78, { s: 12.5, w: 900, c: '#fff', bg: lit ? '#15803d' : S.on ? '#b45309' : '#64748b' });
      Q37.card(ctx, S, [{ t: 'الدائرة الابتدائية: المصدر والمفتاح والملف الأسطواني', c: '#b91c1c', w: 800 }, { t: 'الدائرة الثانوية: الملف الحلقي والمصباح فقط بلا مصدر', c: '#1d4ed8', w: 800 }, { t: 'V₂ ≈ ' + Q37.fv(S.V2), mono: 1, w: 900 }, { t: S.dc ? 'البطارية: ومضة لحظية عند الغلق أو الفتح فقط' : 'التيار المتناوب يغير المجال باستمرار فيتوهج المصباح باستمرار', c: '#0e7490', w: 900 }], { title: 'التيار المحتث', wd: 300, y: 70 });
      Q33.drawChips(ctx, D.chips(S, g)); Q37.banner(ctx, w, 'نشاط: أغلق المفتاح، واسحب الملف الحلقي على الساق');
    },
    chips(S, g) { return Q37.chips(S, 'src', [['ac', '∿ مصدر متناوب'], ['dc', '🔋 بطارية'], ['sw', S.on ? 'فتح المفتاح' : 'غلق المفتاح']], g.h - 84, S.dc ? 'dc' : 'ac', (S2, k) => { if (k === 'sw') D.tog(S2); else { S2.dc = k === 'dc' ? 1 : 0; S2.kick = 0; } }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), y = D.ry(S, g);
      return [{ id: 'ring', x: g.cx, y, w: 120, h: 44, axis: 'y', keep: true, tip: 'اسحب الملف الحلقي إلى الأعلى أو الأسفل', idle: 'اسحب الملف الحلقي ✋', down: S2 => { S2.drg = 1; }, up: S2 => { S2.drg = 0; }, drag: (S2, d) => { S2.tu = clamp((g.yLo - (d.oy + d.y - d.sy)) / (g.yLo - g.yHi), 0, 1); } },
        { id: 'sw', x: g.swx, y: g.swy, w: 84, h: 46, hint: false, tip: 'اضغط لغلق أو فتح المفتاح', click: S2 => D.tog(S2) },
        { id: 'rod', x: g.cx, y: g.rt + 22, w: 40, h: 44, hint: false, tip: 'اضغط لإخراج الساق أو إدخالها', click: S2 => setParam(S2, 'rod', !S2.p.rod) }].concat(D.chips(S, g)); },
    readings(S) { const g = S.W ? D.geo(S) : null; return [rd('المصدر', S.dc ? 'بطارية: تيار مستمر' : 'تيار متناوب'), rd('المفتاح', S.on ? 'مغلق' : 'مفتوح'), rd('ارتفاع الملف الحلقي', g ? Q33.f((g.yt - D.ry(S, g)) / 10, 1) + ' cm' : '—'), rd('الفولطية المحتثة', Q37.fv(S.V2)), rd('توهج المصباح', Q33.glow(S.b))]; },
    explain(S) { return Q26.ex(S.b > .08 ? 'المصباح المربوط بالملف الحلقي يتوهج مع أنه غير متصل بالمصدر.' : 'المصباح منطفئ أو خافت.', 'التيار المتناوب في الملف الابتدائي يغير مقداره واتجاهه باستمرار فيتولد مجال مغناطيسي متغير، تجمعه ساق الحديد المطاوع وتمرره خلال الملف الثانوي؛ وتغير خطوط المجال خلال الملف الثانوي في وحدة الزمن يولد فيه تياراً محتثاً. التيار المستمر يولد مجالاً ثابتاً فلا يتولد تيار محتث إلا لحظة الغلق أو الفتح.', 'هذا هو أساس عمل المحولة الكهربائية والشاحن اللاسلكي للموبايل.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — الحث المتبادل: غلق المفتاح وفتحه، وتيار مستمر أم متناوب (ص 136، س7 و س8) =============== */
(() => {
  const D = { id: 'g9_tr_switch', page: 136, fig: 'الشكل 2 + س7 و س8',
    desc: 'ملفان على ساق من الحديد المطاوع: الملف الابتدائي مع بطارية ومفتاح، والملف الثانوي مع كلفانوميتر. لحظة غلق المفتاح يتزايد التيار في الملف الابتدائي فيتغير المجال المغناطيسي فينحرف مؤشر الكلفانوميتر ثم يعود إلى الصفر عندما يثبت التيار؛ ولحظة فتح المفتاح ينحرف بالاتجاه المعاكس. مع المصدر المتناوب يتغير المجال باستمرار فيتذبذب المؤشر باستمرار. لذا تعد المحولة جهازاً من أجهزة التيار المتناوب ولا تعمل على التيار المستمر لعدم حدوث تغير في المجال المغناطيسي داخل القلب الحديدي.',
    tags: 'الحث المتبادل غلق المفتاح فتح المفتاح كلفانوميتر تيار مستمر تيار متناوب بطارية المحولة لا تعمل على التيار المستمر س7 س8 تغير المجال',
    tools: ['ملفان معزولان', 'ساق حديد مطاوع', 'بطارية', 'مصدر متناوب', 'مفتاح', 'كلفانوميتر'],
    steps: ['اضغط على المفتاح لغلقه وراقب مؤشر الكلفانوميتر والرسم البياني.', 'أبقِ المفتاح مغلقاً: يعود المؤشر إلى الصفر. ثم افتحه: ينحرف بالاتجاه المعاكس.', 'اختر «مصدر متناوب» وأغلق المفتاح: يتذبذب المؤشر باستمرار.', 'اسحب الملف الثانوي بعيداً، أو أخرج الساق، أو قلل لفاته: يقل الانحراف.'],
    concl: ['يتولد التيار المحتث في الملف الثانوي فقط عندما يتغير التيار (والمجال) في الملف الابتدائي.', 'لحظة الغلق ولحظة الفتح يتولد تيار محتث باتجاهين متعاكسين.', 'التيار المستمر الثابت لا يولد تياراً محتثاً، لذا لا تعمل المحولة على البطارية.', 'التيار المتناوب يغير مجاله باستمرار فيولد تياراً محتثاً متناوباً باستمرار.'],
    laws: [],
    controls: [R('V', 'فولطية المصدر', 1, 12, 6, 1, 'V'), R('N2', 'لفات الملف الثانوي', 20, 200, 100, 10, 'لفة'), TG('rod', 'ساق الحديد المطاوع', true, null, 'core'), TG('gr', 'الرسم البياني', true, null, 'graph')],
    setup(S) { S.on = 0; S.src = 'dc'; S.I1 = 0; S.ck = 0; S.g = 0; S.fz = 0; S.hist = []; S.acc = 0; S.u = .1; S.tu = .1; S.rl = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, ry = 262; return { w, h, L, x0, ry, r0: x0 + 6, r1: x0 + 390, px: x0 + 80, gx0: x0, gx1: w - 24, gy0: h - 330, gy1: h - 170 }; },
    xs(S, g) { return g.x0 + 205 + S.u * 150; },
    cpl(S) { return (1 - .72 * S.rl) * Math.exp(-1.3 * S.u); },
    update(S, dt) { dt = Math.min(dt, .05); S.ck += dt; S.u = Q37.ez(S.u, S.tu, dt, 12); S.rl = Q37.ez(S.rl, S.p.rod ? 0 : 1, dt, 6);
      const Im = S.p.V / 2; let I; if (S.src === 'ac') I = S.on ? Im * Math.sin(TAU * .4 * S.ck) : S.I1 * Math.exp(-dt / .08);
      else { const tau = (S.on ? .5 : .3) * (1 - S.rl * .5); I = S.I1 + ((S.on ? Im : 0) - S.I1) * (1 - Math.exp(-dt / tau)); }
      const dI = (I - S.I1) / Math.max(dt, 1e-3); S.I1 = I; S.fz = -.15 * D.cpl(S) * (S.p.N2 / 100) * dI; S.g = Q37.ez(S.g, clamp(S.fz, -1.2, 1.2), dt, 16);
      S.acc += dt; if (S.acc > 1 / 30) { S.acc = 0; S.hist.push([S.I1 / 6, S.g]); if (S.hist.length > 300) S.hist.shift(); } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), xs = D.xs(S, g), ry = g.ry, ac = S.src === 'ac';
      Q37.bg(ctx, w, h);
      // rod
      K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = 1 - S.rl * .82; const gr = ctx.createLinearGradient(0, ry - 15, 0, ry + 15); gr.addColorStop(0, '#e2e8f0'); gr.addColorStop(.4, '#94a3b8'); gr.addColorStop(1, '#334155'); ctx.fillStyle = gr; rr(ctx, g.r0, ry - 15, g.r1 - g.r0, 30, 6); ctx.fill(); ctx.strokeStyle = '#1e293b'; if (S.rl > .5) ctx.setLineDash([5, 4]); ctx.stroke(); ctx.restore(); });
      const Bn = S.I1 / 6; if (Math.abs(Bn) > .04 && S.rl < .5) for (let k = 0; k < 6; k++) { const xx = g.r0 + 30 + k * (g.r1 - g.r0 - 60) / 5; K.raw(ctx, () => { ctx.save(); ctx.translate(xx, ry); ctx.scale(Bn > 0 ? 1 : -1, 1); ctx.fillStyle = 'rgba(124,58,237,' + (.35 + .6 * Math.min(1, Math.abs(Bn))) + ')'; ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(-6, -7); ctx.lineTo(-6, 7); ctx.closePath(); ctx.fill(); ctx.restore(); }); }
      const pc = Q37.coil(ctx, g.px, ry, 110, 30, 11, { horiz: 1, side: -1 }), sc = Q37.coil(ctx, xs, ry, 80, 30, Math.round(3 + S.p.N2 / 20), { horiz: 1, side: 1, hl: !S.drg });
      Q33.T(ctx, 'الملف الابتدائي', g.px, ry - 44, { s: 10.5, w: 900, c: '#fff', bg: '#c2410c' }); Q33.T(ctx, 'الملف الثانوي', xs, ry + 38, { s: 10.5, w: 900, c: '#fff', bg: '#2563eb' });
      if (S.rl > .5) Q33.T(ctx, 'الساق خارج الملفين', (g.r0 + g.r1) / 2, ry + 70, { s: 10, w: 900, c: '#475569' });
      // primary circuit
      const so = Q37.src(ctx, g.x0 + 50, ry + 150, S.p.V, { side: 1, dc: !ac, ph: S.ck * 3 }), swx = g.x0 + 165, swy = ry + 84, sw = Q33.sw(ctx, swx - 24, swx + 24, swy, !!S.on, { label: S.on ? 'مغلق' : 'مفتوح' });
      const W1 = [pc.a, [pc.a[0], swy], sw.a], W2 = [sw.b, [swx + 50, swy], [swx + 50, so.a[1]], so.a], W3 = [pc.b, [pc.b[0], ry + 58], [swx + 80, ry + 58], [swx + 80, so.b[1]], so.b];
      [W1, W2, W3].forEach(p => { Q33.wire(ctx, p, { col: '#dc2626' }); if (Math.abs(S.I1) > .05) Q33.flow(ctx, p, ac ? Math.sin(TAU * .4 * S.ck) * 18 : S.ck * 40 * Math.min(1, S.I1 / 3), ac ? 'e' : 'c', { r: 3.6 }); });
      // galvanometer on the secondary
      const gv = Q37.galv(ctx, xs, ry - 128, S.g); [[sc.a, gv.a], [sc.b, gv.b]].forEach(([a, b]) => Q33.wire(ctx, [a, [a[0], ry - 60], [b[0], ry - 60], b], { col: '#2563eb' }));
      // strip chart
      if (S.p.gr !== false) { const X0 = g.gx0, X1 = g.gx1, Y0 = g.gy0, Y1 = g.gy1, ym = (Y0 + Y1) / 2, A = (Y1 - Y0) / 2 - 10;
        K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5; rr(ctx, X0, Y0, X1 - X0, Y1 - Y0, 10); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#94a3b8'; ctx.beginPath(); ctx.moveTo(X0 + 8, ym); ctx.lineTo(X1 - 8, ym); ctx.stroke();
          [[0, '#dc2626'], [1, '#2563eb']].forEach(([j, c]) => { ctx.strokeStyle = c; ctx.lineWidth = 2.4; ctx.beginPath(); S.hist.forEach((q, i) => { const xx = X1 - 10 - (S.hist.length - 1 - i) * (X1 - X0 - 20) / 299, yy = ym - clamp(q[j], -1.15, 1.15) * A; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke(); }); ctx.restore(); });
        Q33.T(ctx, 'تيار الملف الابتدائي', X1 - 80, Y0 + 14, { s: 10.5, w: 900, c: '#dc2626' }); Q33.T(ctx, 'التيار المحتث في الثانوي', X1 - 250, Y0 + 14, { s: 10.5, w: 900, c: '#2563eb' }); Q33.T(ctx, '⟵ الزمن', X1 - 40, Y1 - 12, { s: 10, w: 800, c: '#64748b' }); }
      // card
      const st = ac ? (S.on ? 3 : 0) : Math.abs(S.g) > .12 ? (S.on ? 1 : 2) : S.on ? 4 : 0;
      const ln = (t, i) => (st === i ? { t: '● ' + t, c: '#dc2626', w: 900 } : { t, c: '#334155', w: 700 });
      Q37.card(ctx, S, [ln('لحظة الغلق: ينحرف المؤشر ثم يعود للصفر', 1), ln('المفتاح مغلق والتيار ثابت: المؤشر على الصفر', 4), ln('لحظة الفتح: ينحرف بالاتجاه المعاكس', 2), ln('المصدر المتناوب: يتذبذب المؤشر باستمرار', 3), { t: 'لذا لا تعمل المحولة على التيار المستمر', c: '#0e7490', w: 900 }], { title: 'متى يتولد التيار المحتث؟', wd: 300, y: 70 });
      Q33.drawChips(ctx, D.chips(S, g)); Q37.banner(ctx, w, 'أغلق المفتاح وافتحه وراقب مؤشر الكلفانوميتر');
    },
    tog(S2) { S2.on = S2.on ? 0 : 1; },
    chips(S, g) { return Q37.chips(S, 'src', [['dc', '🔋 بطارية'], ['ac', '∿ مصدر متناوب'], ['sw', S.on ? 'فتح المفتاح' : 'غلق المفتاح']], g.h - 84, S.src, (S2, k) => { if (k === 'sw') D.tog(S2); else S2.src = k; }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), xs = D.xs(S, g);
      return [{ id: 'sec', x: xs, y: g.ry, w: 90, h: 70, axis: 'x', keep: true, tip: 'اسحب الملف الثانوي على الساق', idle: 'اسحب الملف الثانوي ✋', down: S2 => { S2.drg = 1; }, up: S2 => { S2.drg = 0; }, drag: (S2, d) => { S2.tu = clamp((d.ox + d.x - d.sx - g.x0 - 205) / 150, 0, 1); } },
        { id: 'sw', x: g.x0 + 165, y: g.ry + 84, w: 80, h: 44, hint: false, tip: 'اضغط لغلق أو فتح المفتاح', click: S2 => D.tog(S2) },
        { id: 'rod', x: g.r1 - 20, y: g.ry, w: 40, h: 34, hint: false, tip: 'اضغط لإخراج الساق أو إدخالها', click: S2 => setParam(S2, 'rod', !S2.p.rod) }].concat(D.chips(S, g)); },
    readings(S) { return [rd('المصدر', S.src === 'ac' ? 'متناوب' : 'بطارية: مستمر'), rd('المفتاح', S.on ? 'مغلق' : 'مفتوح'), rd('تيار الملف الابتدائي', Q37.fi(S.I1)), rd('قراءة الكلفانوميتر', Q33.f(S.g * 50, 0) + ' µA')]; },
    explain(S) { return Q26.ex(S.src === 'ac' ? 'مع المصدر المتناوب يتذبذب مؤشر الكلفانوميتر باستمرار.' : 'مع البطارية ينحرف المؤشر لحظة الغلق ولحظة الفتح فقط وباتجاهين متعاكسين.', 'التيار المحتث يتولد عند تغير خطوط المجال المغناطيسي خلال الملف الثانوي. تيار البطارية يتغير فقط لحظة الغلق (يتزايد) ولحظة الفتح (يتناقص)، وعندما يثبت يصبح المجال ثابتاً فلا يتولد تيار محتث. التيار المتناوب يغير مقداره واتجاهه باستمرار فيولد تياراً محتثاً متناوباً.', 'س8: لو وضعت بطارية بين طرفي الملف الابتدائي لا تعمل المحولة لأن مجالها ثابت لا يتغير.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — المحولة الكهربائية وأجزاؤها (2-7، ص 134–136، الشكلان 1 و 3) =============== */
(() => {
  const PARTS = { core: ['القلب الحديدي المغلق', 'قلب مغلق من الحديد المطاوع مصنوع من صفائح رقيقة معزولة.', 'يتولد داخله مجال مغناطيسي متغير يشج الملف الثانوي كما يشج الملف الابتدائي.'], p: ['الملف الابتدائي N₁', 'سلك نحاسي معزول ملفوف حول القلب، يربط مع مصدر الفولطية المتناوبة.', 'ينساب فيه تيار متناوب فيولد مجالاً مغناطيسياً متغيراً.'], s: ['الملف الثانوي N₂', 'سلك نحاسي معزول ملفوف حول القلب، يربط مع الحمل.', 'يتولد فيه تيار محتث متناوب يشغل الحمل.'], src: ['مصدر الفولطية المتناوبة V₁', 'الفولطية المجهزة للمحولة.', 'المحولة من أجهزة التيار المتناوب ولا تعمل على التيار المستمر.'], load: ['الحمل', 'الجهاز الذي يشتغل على المحولة، هنا مصباح 12 V.', 'يأخذ القدرة من الملف الثانوي.'] };
  const N1 = 440, N2 = 24;
  const D = { id: 'g9_tr_build', page: 136, fig: 'الشكلان 1 و 3',
    desc: 'المحولة الكهربائية جهاز يعمل على رفع الفولطية المتناوبة أو خفضها (أي تغيير مقدارها إلى مقدار آخر) فيقل التيار أو يزداد. تتألف من ملفين مصنوعين من أسلاك نحاسية معزولة ملفوفة حول قلب مغلق من الحديد المطاوع. عند انسياب تيار متناوب في الملف الابتدائي يتولد مجال مغناطيسي متغير داخل القلب الحديدي يشج الملف الثانوي كما يشج الملف الابتدائي. الملف المربوط مع مصدر الفولطية المتناوبة (عدد لفاته N₁) يدعى الملف الابتدائي، والملف المربوط مع الحمل (عدد لفاته N₂) يدعى الملف الثانوي.',
    tags: 'المحولة الكهربائية أجزاء المحولة القلب الحديدي المغلق الحديد المطاوع الملف الابتدائي الملف الثانوي الحمل مصدر متناوب أسلاك نحاسية معزولة الشكل 3',
    tools: ['قلب مغلق من الحديد المطاوع', 'ملفان من أسلاك نحاسية معزولة', 'مصدر فولطية متناوبة', 'حمل: مصباح 12 V'],
    steps: ['اضغط على كل جزء من أجزاء المحولة (أو أزرارها) لتتعرف عليه.', 'لاحظ أسهم المجال المغناطيسي تدور في القلب وتغير اتجاهها مع التيار المتناوب.', 'اسحب الجزء العلوي من القلب إلى الأعلى لفتحه: يضعف التوهج لأن المجال يتسرب.', 'اختر «تيار مستمر»: المجال ثابت فلا يتوهج المصباح.'],
    concl: ['المحولة: ملفان من أسلاك نحاسية معزولة حول قلب مغلق من الحديد المطاوع.', 'الملف الابتدائي يربط مع المصدر المتناوب، والملف الثانوي يربط مع الحمل.', 'القلب الحديدي المغلق ينقل المجال المغناطيسي المتغير من الملف الابتدائي إلى الثانوي.', 'المحولة لا تعمل على التيار المستمر.'],
    laws: ['g9_l7_ratio'],
    controls: [R('V1', 'فولطية المصدر V₁', 0, 240, 220, 10, 'V'), R('gap', 'فتحة في القلب الحديدي', 0, 20, 0, 1, 'mm'), TG('fl', 'أسهم المجال المغناطيسي', true, null, 'bfield'), TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { S.sel = 'core'; S.dc = 0; S.ph = 0; S.gv = 0; S.b = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24; return { w, h, L, x0, cx: x0 + 92, cy: 160, cw: 250, ch: 250, t: 40 }; },
    k(S) { return 1 / (1 + S.gv * .4); },
    /* circuit symbol of the transformer (الشكل 1) */
    sym(ctx, x, y) { K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; rr(ctx, x - 110, y - 40, 220, 92, 10); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2.2; [-1, 1].forEach(sd => { ctx.beginPath(); for (let k = 0; k < 4; k++) ctx.arc(x + sd * 22, y - 21 + k * 14, 7, -Math.PI / 2, Math.PI / 2, sd > 0); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + sd * 22, y - 28); ctx.lineTo(x + sd * 70, y - 28); ctx.moveTo(x + sd * 22, y + 28); ctx.lineTo(x + sd * 70, y + 28); ctx.stroke(); }); ctx.lineWidth = 2; [-4, 4].forEach(d => { ctx.beginPath(); ctx.moveTo(x + d, y - 32); ctx.lineTo(x + d, y + 32); ctx.stroke(); }); ctx.restore(); }); Q33.T(ctx, 'N₁', x - 52, y, { s: 12, w: 900, c: '#c2410c' }); Q33.T(ctx, 'N₂', x + 52, y, { s: 12, w: 900, c: '#1d4ed8' }); Q33.T(ctx, 'الشكل 1: مخطط المحولة', x, y + 42, { s: 10.5, w: 900, c: '#334155' }); },
    update(S, dt) { S.ph += dt * TAU * .9; S.gv = Q37.ez(S.gv, S.p.gap, dt, 10); const V2 = S.dc ? 0 : S.p.V1 * N2 / N1 * D.k(S); S.b = Q37.ez(S.b, V2 / 12, dt, 8); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), k = D.k(S), B = S.p.V1 > 0 ? (S.dc ? .8 : Math.sin(S.ph)) * (S.p.V1 / 220) : 0, gp = S.gv * 3.2, V2 = S.dc ? 0 : S.p.V1 * N2 / N1 * k, lab = S.p.lab !== false;
      Q37.bg(ctx, w, h);
      const X = Q37.xf(ctx, { x: g.cx, y: g.cy, w: g.cw, h: g.ch, t: g.t, n1v: 16, n2v: 6, B: B * (S.dc ? 1 : .5 + .5 * k), gap: gp, fl: S.p.fl !== false, hl: S.sel });
      const so = Q37.src(ctx, g.x0 + 20, g.cy + g.ch / 2, S.p.V1, { side: 1, dc: S.dc, ph: S.ph, w: 72, lab: S.dc ? 'مصدر مستمر' : 'مصدر متناوب' });
      if (S.sel === 'src') K.raw(ctx, () => { ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 3; rr(ctx, g.x0 - 22, g.cy + g.ch / 2 - 42, 84, 84, 12); ctx.stroke(); });
      const amp = S.dc ? 0 : S.p.V1 / 220; Q37.acw(ctx, [so.a, [so.a[0] + 14, so.a[1]], [so.a[0] + 14, X.p.a[1]], X.p.a], amp, S.ph, '#dc2626'); Q37.acw(ctx, [so.b, [so.b[0] + 14, so.b[1]], [so.b[0] + 14, X.p.b[1]], X.p.b], amp, S.ph, '#dc2626');
      const lx = g.cx + g.cw + 70, ly = g.cy + g.ch / 2 + 30; Q37.acw(ctx, [X.s.a, [lx + 18, X.s.a[1]], [lx + 18, ly]], S.b, S.ph, '#2563eb'); Q37.acw(ctx, [X.s.b, [lx - 30, X.s.b[1]], [lx - 30, ly], [lx - 18, ly]], S.b, S.ph, '#2563eb');
      Q33.bulb(ctx, lx, ly, S.b, { s: 1.15 }); if (S.sel === 'load') K.raw(ctx, () => { ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 3; rr(ctx, lx - 34, ly - 80, 68, 96, 12); ctx.stroke(); });
      if (lab) { Q33.T(ctx, 'الملف الابتدائي', g.cx + 20, g.cy + g.ch + 18, { s: 11, w: 900, c: '#fff', bg: '#c2410c' }); Q33.T(ctx, 'الملف الثانوي', g.cx + g.cw - 20, g.cy + g.ch + 18, { s: 11, w: 900, c: '#fff', bg: '#2563eb' }); Q33.T(ctx, 'قلب من', g.cx + g.cw / 2, g.cy + g.ch / 2 - 10, { s: 10.5, w: 900, c: '#334155' }); Q33.T(ctx, 'الحديد المطاوع', g.cx + g.cw / 2, g.cy + g.ch / 2 + 8, { s: 10.5, w: 900, c: '#334155' }); Q33.T(ctx, 'N₁ = ' + N1, g.cx + 20, g.cy + g.ch + 42, { s: 11, w: 900, c: '#c2410c' }); Q33.T(ctx, 'N₂ = ' + N2, g.cx + g.cw - 20, g.cy + g.ch + 42, { s: 11, w: 900, c: '#2563eb' }); Q33.T(ctx, 'الحمل', lx, ly + 22, { s: 10.5, w: 900, c: '#334155' }); }
      if (gp > 4) Q33.T(ctx, 'القلب مفتوح: المجال يتسرب', g.cx + g.cw / 2, g.cy - gp - 16, { s: 10.5, w: 900, c: '#fff', bg: '#b45309' });
      Q33.T(ctx, 'V₁ = ' + Q33.f(S.p.V1, 0) + ' V', so.a[0] - 36, g.cy + g.ch / 2 + 56, { s: 11.5, w: 900, c: '#b91c1c' }); Q33.T(ctx, 'V₂ = ' + Q33.f(V2, 1) + ' V', lx, ly + 44, { s: 11.5, w: 900, c: '#1d4ed8' });
      D.sym(ctx, g.x0 + 330, g.cy + g.ch + 92);
      const P = PARTS[S.sel]; Q37.card(ctx, S, [{ t: P[1], c: '#0f172a', w: 800 }, { t: P[2], c: '#0e7490', w: 800 }].concat(S.dc ? [{ t: 'التيار المستمر: المجال ثابت فلا يتولد تيار محتث', c: '#b91c1c', w: 900 }] : []), { title: P[0], wd: 300, y: 70 });
      const C = D.chips(S, g); Q33.drawChips(ctx, C.p); Q33.drawChips(ctx, C.s); Q37.banner(ctx, w, 'اضغط على أجزاء المحولة، واسحب الجزء العلوي من القلب');
    },
    chips(S, g) { return { p: Q37.chips(S, 'sel', [['src', 'المصدر'], ['p', 'الملف الابتدائي'], ['core', 'القلب الحديدي'], ['s', 'الملف الثانوي'], ['load', 'الحمل']], g.h - 128, S.sel, (S2, k) => { S2.sel = k; }, { bw: 128 }), s: Q37.chips(S, 'cur', [['ac', '∿ تيار متناوب'], ['dc', '— تيار مستمر'], ['cl', 'غلق القلب']], g.h - 84, S.dc ? 'dc' : 'ac', (S2, k) => { if (k === 'cl') setParam(S2, 'gap', 0); else S2.dc = k === 'dc' ? 1 : 0; }, { bw: 150 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), gp = S.gv * 3.2, C = D.chips(S, g), sel = (id, x, y, ww, hh, k, tip) => ({ id, x, y, w: ww, h: hh, hint: false, tip, click: S2 => { S2.sel = k; } });
      return [{ id: 'yoke', x: g.cx + g.cw / 2, y: g.cy - gp + g.t / 2, w: g.cw - 20, h: g.t, axis: 'y', keep: true, tip: 'اسحب الجزء العلوي من القلب إلى الأعلى لفتحه', idle: 'اسحب أعلى القلب ✋', drag: (S2, d) => { setParam(S2, 'gap', Math.round(clamp(-(d.oy + d.y - d.sy - g.cy - g.t / 2) / 3.2, 0, 20))); S2.sel = 'core'; } },
        sel('pc', g.cx + g.t / 2, g.cy + g.ch / 2, 60, g.ch - 90, 'p', 'الملف الابتدائي'), sel('sc', g.cx + g.cw - g.t / 2, g.cy + g.ch / 2, 60, g.ch - 90, 's', 'الملف الثانوي'), sel('src', g.x0 + 20, g.cy + g.ch / 2, 76, 72, 'src', 'المصدر'), sel('load', g.cx + g.cw + 70, g.cy + g.ch / 2, 60, 80, 'load', 'الحمل'), sel('bot', g.cx + g.cw / 2, g.cy + g.ch - g.t / 2, g.cw - 100, g.t, 'core', 'القلب الحديدي')].concat(C.p, C.s); },
    readings(S) { const V2 = S.dc ? 0 : S.p.V1 * N2 / N1 * D.k(S); return [rd('الجزء المختار', PARTS[S.sel][0]), rd('نوع التيار', S.dc ? 'مستمر' : 'متناوب'), rd('فولطية الملف الابتدائي', S.p.V1 + ' V'), rd('فولطية الملف الثانوي', Q33.f(V2, 2) + ' V'), rd('فتحة القلب', Q33.f(S.gv, 0) + ' mm')]; },
    explain(S) { return Q26.ex('المجال المغناطيسي المتغير يدور في القلب الحديدي المغلق من الملف الابتدائي إلى الملف الثانوي فيتوهج المصباح.', 'التيار المتناوب في الملف الابتدائي يولد مجالاً مغناطيسياً متغيراً داخل القلب الحديدي، يشج الملف الثانوي فيتولد فيه تيار محتث. القلب المغلق من الحديد المطاوع يجمع خطوط المجال، فإذا فُتح تسرب المجال وضعف التيار المحتث. مع التيار المستمر يكون المجال ثابتاً فلا يتولد تيار محتث.', 'تستعمل المحولات لرفع الفولطية كما في جهاز التلفاز، ولخفضها كما في المذياع والمسجل.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — نسبة التحويل V₂/V₁ = N₂/N₁ + مثال 1 ص 143 + س1 فقرة 4 =============== */
(() => {
  const EX = { e1: { t: 'مثال 1 ص 143', set: { V1: 240, N1: 500, N2: 25 }, q: 'محولة ملفها الابتدائي على مصدر متناوب 240 V، والحمل على ملفها الثانوي يشتغل على 12 V، وعدد لفات ملفها الابتدائي 500 turn. ما نوعها؟ احسب عدد لفات ملفها الثانوي.', lines: ['نوعها خافضة لأن V₂ أصغر من V₁', 'V₂ / V₁ = N₂ / N₁', '12 / 240 = N₂ / 500', 'N₂ = 500 × 12 / 240', 'N₂ = 25 turn'] },
    q4: { t: 'س1 فقرة 4 ص 144', set: { V1: 240, N1: 6000, N2: 300 }, q: 'محولة عدد لفات ملفها الثانوي 300 turn وملفها الابتدائي 6000 turn، والفولطية المطبقة على الابتدائي 240 V. الفولطية الخارجة من الثانوي؟', lines: ['V₂ / V₁ = N₂ / N₁', 'V₂ = V₁ × N₂ / N₁', 'V₂ = 240 × 300 / 6000', 'V₂ = 12 V', 'الجواب a وهي محولة خافضة'] } };
  const D = { id: 'g9_tr_ratio', page: 138, fig: 'الشكلان 4 و 6 + مثال 1',
    desc: 'العلاقة بين عدد اللفات والفولطية: الفولطية الخارجة من الملف الثانوي V₂ ÷ الفولطية الداخلة في الملف الابتدائي V₁ = عدد لفات الملف الثانوي N₂ ÷ عدد لفات الملف الابتدائي N₁. تدعى النسبة N₂/N₁ بنسبة التحويل أو نسبة عدد اللفات. إذا كانت أكبر من الواحد فالمحولة رافعة للفولطية (V₂ أكبر من V₁)، وإذا كانت أصغر من الواحد فالمحولة خافضة للفولطية (V₂ أصغر من V₁). مثال 1: V₁ = 240 V، V₂ = 12 V، N₁ = 500 turn ⟸ المحولة خافضة و N₂ = 25 turn.',
    tags: 'نسبة التحويل نسبة عدد اللفات N2/N1 V2/V1 محولة رافعة محولة خافضة مثال 1 ص 143 240 V 12 V 500 turn 25 turn س1 فقرة 4 6000 300 راسم الإشارة',
    tools: ['محولة بملفين يمكن تغيير لفاتهما', 'مصدر متناوب', 'فولطميتران', 'راسم إشارة'],
    steps: ['اسحب الملف الابتدائي أو الثانوي إلى الأعلى لزيادة لفاته، أو إلى الأسفل لتقليلها.', 'راقب الفولطميترين وراسم الإشارة: V₂/V₁ تساوي دائماً N₂/N₁.', 'اجعل N₂ أكبر من N₁ ثم أصغر منها: رافعة أم خافضة؟', 'اختر «مثال 1» أو «س1 فقرة 4» ثم «الخطوة التالية».'],
    concl: ['V₂ / V₁ = N₂ / N₁.', 'نسبة التحويل أكبر من الواحد ⟸ محولة رافعة للفولطية.', 'نسبة التحويل أصغر من الواحد ⟸ محولة خافضة للفولطية.', 'مثال 1: N₂ = 25 turn ، س1 فقرة 4: V₂ = 12 V.'],
    laws: ['g9_l7_ratio'],
    controls: [R('V1', 'فولطية الملف الابتدائي V₁', 1, 240, 120, 1, 'V'), R('N1', 'لفات الملف الابتدائي N₁', 5, 8000, 400, 5, 'turn'), R('N2', 'لفات الملف الثانوي N₂', 5, 8000, 800, 5, 'turn'), TG('sc', 'راسم الإشارة', true, null, 'wave')],
    setup(S) { S.ph = 0; S.ex = 0; S.k = 0; S.m = 'e1'; S.n1 = 400; S.n2 = 800; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24; return { w, h, L, x0, cx: x0 + 110, cy: 110, cw: 200, ch: 230, t: 40 }; },
    update(S, dt) { S.ph += dt * TAU * .7; S.n1 = Q37.ez(S.n1, S.p.N1, dt, 10); S.n2 = Q37.ez(S.n2, S.p.N2, dt, 10); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), r = S.p.N2 / S.p.N1, V2 = S.p.V1 * r, typ = r > 1.0001 ? 'up' : r < .9999 ? 'down' : 'eq';
      Q37.bg(ctx, w, h);
      const X = Q37.xf(ctx, { x: g.cx, y: g.cy, w: g.cw, h: g.ch, t: g.t, n1v: Q37.nv(S.n1), n2v: Q37.nv(S.n2), B: Math.sin(S.ph) * .8, l1: 'N₁ = ' + S.p.N1, l2: 'N₂ = ' + S.p.N2, ls: 12 });
      const so = Q37.src(ctx, g.x0 + 20, g.cy + g.ch / 2, S.p.V1, { side: 1, ph: S.ph, w: 72 }); Q37.acw(ctx, [so.a, [so.a[0] + 16, so.a[1]], [so.a[0] + 16, X.p.a[1]], X.p.a], 1, S.ph, '#dc2626'); Q37.acw(ctx, [so.b, [so.b[0] + 16, so.b[1]], [so.b[0] + 16, X.p.b[1]], X.p.b], 1, S.ph, '#dc2626');
      Q37.dm(ctx, g.x0 + 20, g.cy + 30, Q37.fv(S.p.V1), { name: 'V₁', col: '#b91c1c', w: 90 });
      const mx = g.cx + g.cw + 66, my = g.cy + g.ch - 20; Q33.wire(ctx, [X.s.a, [mx, X.s.a[1]], [mx, my - 24]], { col: '#2563eb' }); Q33.wire(ctx, [X.s.b, [X.s.b[0] + 14, X.s.b[1]], [X.s.b[0] + 14, my + 36], [mx, my + 36], [mx, my + 24]], { col: '#2563eb' });
      Q37.dm(ctx, mx, my, Q37.fv(V2), { name: 'V₂', col: '#1d4ed8', w: 104 });
      Q33.T(ctx, typ === 'up' ? 'محولة رافعة للفولطية' : typ === 'down' ? 'محولة خافضة للفولطية' : 'نسبة التحويل = 1', g.cx + g.cw / 2, g.cy + g.ch + 44, { s: 13, w: 900, c: '#fff', bg: typ === 'up' ? '#15803d' : typ === 'down' ? '#b45309' : '#64748b' });
      if (S.p.sc !== false) { const m = Math.max(S.p.V1, V2); Q37.scope(ctx, g.x0, g.cy + g.ch + 76, 400, 140, [{ A: S.p.V1 / m, col: '#f87171', lab: 'V₁' }, { A: V2 / m, col: '#60a5fa', lab: 'V₂' }], S.ph, { name: 'راسم الإشارة' }); }
      if (S.ex) Q42.steps(ctx, S, { title: EX[S.m].t, q: EX[S.m].q, lines: EX[S.m].lines, k: S.k }, { y: 70, x: w - 12, wd: 320 });
      else Q37.card(ctx, S, [{ t: 'V₂ / V₁ = N₂ / N₁', mono: 1, w: 900, c: '#0e7490', s: 14 }, { t: 'N₂ / N₁ = ' + S.p.N2 + ' / ' + S.p.N1 + ' = ' + Q33.f(r, 3), mono: 1 }, { t: 'V₂ = ' + Q33.f(S.p.V1, 0) + ' × ' + Q33.f(r, 3) + ' = ' + Q37.fv(V2), mono: 1, w: 900, c: '#1d4ed8' }, { t: 'نسبة التحويل أكبر من 1: رافعة', c: typ === 'up' ? '#15803d' : '#64748b', w: 800 }, { t: 'نسبة التحويل أصغر من 1: خافضة', c: typ === 'down' ? '#b45309' : '#64748b', w: 800 }], { title: 'نسبة التحويل', wd: 310, y: 70 });
      const C = D.chips(S, g); Q33.drawChips(ctx, C.m); C.e[1]._col = '#be185d'; Q33.drawChips(ctx, C.e); Q37.banner(ctx, w, 'اسحب الملفين إلى الأعلى أو الأسفل لتغيير عدد اللفات');
    },
    chips(S, g) { const set = S2 => { const e = EX[S2.m].set; Object.keys(e).forEach(k => setParam(S2, k, e[k])); };
      return { m: Q37.chips(S, 'm', [['e1', 'مثال 1 ص 143'], ['q4', 'س1 فقرة 4 ص 144']], g.h - 128, S.m, (S2, k) => { S2.m = k; S2.ex = 0; S2.k = 0; set(S2); }, { bw: 220 }), e: Q43.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', set, 5) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), mk = (id, x, k, idle) => Object.assign({ id, x, y: g.cy + g.ch / 2, w: 64, h: g.ch - 90, axis: 'y', keep: true, tip: 'اسحب للأعلى لزيادة اللفات وللأسفل لتقليلها', down: S2 => { S2._n0 = S2.p[k]; }, drag: (S2, d) => { setParam(S2, k, Math.round(clamp((S2._n0 || S2.p[k]) * Math.exp(-(d.y - d.sy) / 70), 5, 8000) / 5) * 5); S2.ex = 0; } }, idle ? { idle } : { hint: false });
      return [mk('n2', g.cx + g.cw - g.t / 2, 'N2', 'اسحب الملف الثانوي ✋'), mk('n1', g.cx + g.t / 2, 'N1')].concat(C.m, C.e); },
    readings(S) { const r = S.p.N2 / S.p.N1; return [rd('N₁', S.p.N1 + ' turn'), rd('N₂', S.p.N2 + ' turn'), rd('نسبة التحويل N₂/N₁', Q33.f(r, 3)), rd('V₁', S.p.V1 + ' V'), rd('V₂', Q37.fv(S.p.V1 * r)), rd('نوع المحولة', r > 1 ? 'رافعة' : r < 1 ? 'خافضة' : 'نسبة 1')]; },
    record(S) { return { N1: S.p.N1, N2: S.p.N2, V1: S.p.V1, V2: +(S.p.V1 * S.p.N2 / S.p.N1).toFixed(2) }; },
    cols: [['N1', 'N₁'], ['N2', 'N₂'], ['V1', 'V₁ (V)'], ['V2', 'V₂ (V)']],
    graph: { x: 'N2', y: 'V2', xl: 'لفات الملف الثانوي N₂', yl: 'فولطية الملف الثانوي V₂ (V)' },
    explain(S) { const r = S.p.N2 / S.p.N1; return Q26.ex('V₂ = ' + Q37.fv(S.p.V1 * r) + ' والمحولة ' + (r > 1 ? 'رافعة' : r < 1 ? 'خافضة' : 'بنسبة تحويل 1') + '.', 'المجال المتغير نفسه يشج كل لفة من لفات الملفين، فتتولد في كل لفة الفولطية نفسها؛ لذا تتناسب فولطية كل ملف مع عدد لفاته: V₂ / V₁ = N₂ / N₁. الملف الذي لفاته أكثر تكون فولطيته أكبر.', 'شاحن الموبايل محولة خافضة لفات ثانويها قليلة جداً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B3 — المحولة الخافضة والمحولة الرافعة جنباً إلى جنب واستعمالاتهما (الأشكال 4–7، ص 138–141) =============== */
(() => {
  const APP = { city: ['🏙', 'استلام القدرة للمدن', 11000, 5000, 100, 110000], weld: ['🔥', 'جهاز اللحام الكهربائي', 220, 550, 100, 4000], mob: ['📱', 'شاحنة الموبايل', 220, 1100, 25, 10], tv: ['📺', 'جهاز التلفاز', 220, 100, 5000, 44], st: ['🏭', 'محطة توليد الطاقة', 11000, 500, 6000, 11000000] };
  const D = { id: 'g9_tr_types', page: 138, fig: 'الأشكال 4 و 5 و 6 و 7',
    desc: 'المحولات الكهربائية نوعان. النوع الأول: المحولة الخافضة يكون عدد لفات ملفها الثانوي N₂ أقل من عدد لفات ملفها الابتدائي N₁ فتكون V₂ أقل من V₁؛ ومعظم المحولات المستعملة في الفولطية الداخلة إلى المنازل من هذا النوع، وكذلك المحولة في مناطق استلام القدرة المجهزة إلى المدن، وفي جهاز اللحام الكهربائي، وفي شاحنة الموبايل. النوع الثاني: المحولة الرافعة يكون N₂ أكبر من N₁ فتكون V₂ أكبر من V₁؛ مثل المحولة في جهاز التلفاز لتجهيز الفولطية العالية، والمحولات في محطات توليد الطاقة عند إرسالها إلى المدن. تذكّر: المحولة الرافعة للفولطية تكون خافضة للتيار، والخافضة للفولطية رافعة للتيار.',
    tags: 'المحولة الخافضة المحولة الرافعة step-up step-down استلام القدرة المدن جهاز اللحام شاحنة الموبايل جهاز التلفاز محطات توليد الطاقة رافعة للفولطية خافضة للتيار مقارنة',
    tools: ['محولة خافضة', 'محولة رافعة', 'أجهزة تعمل على المحولات'],
    steps: ['قارن المحولتين: لفات الملف الثانوي أقل في الخافضة وأكثر في الرافعة.', 'اختر استعمالاً للمحولة الخافضة (الصف الأعلى) وآخر للرافعة (الصف الأسفل).', 'لاحظ أعمدة المقارنة: الرافعة للفولطية خافضة للتيار، والخافضة للفولطية رافعة للتيار.', 'اسحب الملف الثانوي في أي محولة لتغيير لفاته.'],
    concl: ['الخافضة: N₂ أقل من N₁ فتكون V₂ أقل من V₁ والتيار I₂ أكبر من I₁.', 'الرافعة: N₂ أكبر من N₁ فتكون V₂ أكبر من V₁ والتيار I₂ أصغر من I₁.', 'خافضة: المنازل، مناطق استلام القدرة في المدن، اللحام، شاحنة الموبايل.', 'رافعة: التلفاز، محطات توليد الطاقة عند الإرسال إلى المدن.'],
    laws: ['g9_l7_ratio', 'g9_l7_ideal'],
    controls: [R('pl', 'قدرة الحمل', 10, 100, 100, 5, '%'), TG('bars', 'أعمدة المقارنة', true, null, 'graph')],
    setup(S) { S.ad = 'mob'; S.au = 'tv'; S.fd = 1; S.fu = 1; S.ph = 0; S.vd = 0; S.vu = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 20, x1 = w - 20, mid = (x0 + x1) / 2; return { w, h, L, x0, x1, mid, pw: (x1 - x0 - 16) / 2, y0: 62, y1: h - 160 }; },
    calc(S, k, f, up) { const a = APP[k], N2 = Math.round(clamp(a[4] * f, up ? a[3] * 1.05 : 1, up ? a[3] * 100 : a[3] * .95)), V2 = a[2] * N2 / a[3], P = a[5] * S.p.pl / 100; return { a, N1: a[3], N2, V1: a[2], V2, I1: P / a[2], I2: P / V2, P }; },
    update(S, dt) { S.ph += dt * TAU * .8; S.vd = Q37.ez(S.vd, Q37.nv(D.calc(S, S.ad, S.fd, 0).N2), dt, 8); S.vu = Q37.ez(S.vu, Q37.nv(D.calc(S, S.au, S.fu, 1).N2), dt, 8); },
    panel(ctx, S, g, x, up) { const c = D.calc(S, up ? S.au : S.ad, up ? S.fu : S.fd, up), pw = g.pw, col = up ? '#15803d' : '#b45309', y0 = g.y0;
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.strokeStyle = col; ctx.lineWidth = 2.5; rr(ctx, x, y0, pw, g.y1 - y0, 14); ctx.fill(); ctx.stroke(); ctx.fillStyle = col; rr(ctx, x, y0, pw, 34, 14); ctx.fill(); ctx.fillRect(x, y0 + 20, pw, 14); ctx.restore(); });
      Q33.T(ctx, up ? 'محولة رافعة للفولطية' : 'محولة خافضة للفولطية', x + pw / 2, y0 + 17, { s: 14, w: 900, c: '#fff' });
      Q33.T(ctx, up ? 'الشكل 6 — لفات الثانوي أكثر من الابتدائي' : 'الشكل 4 — لفات الثانوي أقل من الابتدائي', x + pw / 2, y0 + 50, { s: 11, w: 800, c: '#334155' });
      const cw = 170, ch = 170, cx = x + pw / 2 - cw / 2, cy = y0 + 76;
      const X = Q37.xf(ctx, { x: cx, y: cy, w: cw, h: ch, t: 30, n1v: Q37.nv(c.N1), n2v: up ? S.vu : S.vd, B: Math.sin(S.ph) * .7, fn: 8, l1: 'N₁ = ' + c.N1, l2: 'N₂ = ' + c.N2 });
      Q33.wire(ctx, [X.p.a, [cx - 30, X.p.a[1]]], { col: '#dc2626' }); Q33.wire(ctx, [X.p.b, [cx - 30, X.p.b[1]]], { col: '#dc2626' }); Q33.wire(ctx, [X.s.a, [cx + cw + 30, X.s.a[1]]], { col: '#2563eb' }); Q33.wire(ctx, [X.s.b, [cx + cw + 30, X.s.b[1]]], { col: '#2563eb' });
      Q33.T(ctx, 'V₁', cx - 44, cy + ch / 2 - 12, { s: 12, w: 900, c: '#b91c1c' }); Q33.T(ctx, Q37.fv(c.V1), cx - 50, cy + ch / 2 + 8, { s: 11, w: 900, c: '#b91c1c' }); Q33.T(ctx, 'V₂', cx + cw + 44, cy + ch / 2 - 12, { s: 12, w: 900, c: '#1d4ed8' }); Q33.T(ctx, Q37.fv(c.V2), cx + cw + 52, cy + ch / 2 + 8, { s: 11, w: 900, c: '#1d4ed8' });
      const ya = cy + ch + 40; Q33.T(ctx, c.a[0] + ' ' + c.a[1], x + pw / 2, ya, { s: 13, w: 900, c: col });
      if (S.p.bars !== false) { const by = ya + 30, bh = 20, bw = pw - 110, bx = x + 90, mV = Math.max(c.V1, c.V2), mI = Math.max(c.I1, c.I2);
        [['الفولطية V₁', c.V1 / mV, '#ef4444', Q37.fv(c.V1)], ['الفولطية V₂', c.V2 / mV, '#3b82f6', Q37.fv(c.V2)], ['التيار I₁', c.I1 / mI, '#f97316', Q37.fi(c.I1)], ['التيار I₂', c.I2 / mI, '#8b5cf6', Q37.fi(c.I2)]].forEach((q, i) => { const yy = by + i * (bh + 14) + (i > 1 ? 10 : 0);
          Q33.T(ctx, q[0], x + 46, yy + bh / 2, { s: 10.5, w: 900, c: '#334155' }); K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, bx, yy, bw, bh, 5); ctx.fill(); ctx.fillStyle = q[2]; const bwq = Math.max(10, bw * q[1]); rr(ctx, bx, yy, bwq, bh, Math.min(5, bwq / 2)); ctx.fill(); }); Q33.T(ctx, q[3], bx + bw - 4, yy + bh / 2, { s: 10.5, w: 900, c: '#0f172a', a: 'right' }); });
        Q33.T(ctx, up ? 'رافعة للفولطية ⟸ خافضة للتيار' : 'خافضة للفولطية ⟸ رافعة للتيار', x + pw / 2, by + 4 * (bh + 14) + 30, { s: 12.5, w: 900, c: '#fff', bg: col }); Q33.T(ctx, 'I₁ × V₁ = I₂ × V₂ = ' + Q37.fp(c.P), x + pw / 2, by + 4 * (bh + 14) + 64, { s: 12, w: 900, c: '#334155' }); }
      return { cx: cx + cw - 15, cy: cy + ch / 2 }; },
    draw(ctx, w, h, S) { const g = D.geo(S); Q37.bg(ctx, w, h); D.panel(ctx, S, g, g.x0, 0); D.panel(ctx, S, g, g.x0 + g.pw + 16, 1); const C = D.chips(S, g); Q33.drawChips(ctx, C.d); C.u.forEach(b => { b._col = '#15803d'; }); Q33.drawChips(ctx, C.u); Q37.banner(ctx, w, 'اختر استعمالاً لكل محولة، واسحب الملف الثانوي'); },
    chips(S, g) { return { d: Q37.chips(S, 'ad', ['city', 'weld', 'mob'].map(k => [k, APP[k][0] + ' ' + APP[k][1]]), g.h - 128, S.ad, (S2, k) => { S2.ad = k; S2.fd = 1; }, { bw: 220, col: '#b45309' }), u: Q37.chips(S, 'au', ['tv', 'st'].map(k => [k, APP[k][0] + ' ' + APP[k][1]]), g.h - 84, S.au, (S2, k) => { S2.au = k; S2.fu = 1; }, { bw: 220, col: '#15803d' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), mk = (id, x, k, idle) => Object.assign({ id, x: x + g.pw / 2 + 70, y: g.y0 + 161, w: 50, h: 120, axis: 'y', keep: true, tip: 'اسحب لتغيير لفات الملف الثانوي', down: S2 => { S2._f0 = S2[k]; }, drag: (S2, d) => { S2[k] = clamp((S2._f0 || 1) * Math.exp(-(d.y - d.sy) / 80), .3, 3); } }, idle ? { idle } : { hint: false });
      return [mk('fd', g.x0, 'fd', 'اسحب الملف الثانوي ✋'), mk('fu', g.x0 + g.pw + 16, 'fu')].concat(C.d, C.u); },
    readings(S) { const d = D.calc(S, S.ad, S.fd, 0), u = D.calc(S, S.au, S.fu, 1); return [rd('الخافضة: ' + d.a[1], Q37.fv(d.V1) + ' ⟵ ' + Q37.fv(d.V2)), rd('تيارا الخافضة', Q37.fi(d.I1) + ' ⟵ ' + Q37.fi(d.I2)), rd('الرافعة: ' + u.a[1], Q37.fv(u.V1) + ' ⟵ ' + Q37.fv(u.V2)), rd('تيارا الرافعة', Q37.fi(u.I1) + ' ⟵ ' + Q37.fi(u.I2))]; },
    explain(S) { return Q26.ex('في الخافضة يقل عدد لفات الثانوي فتقل الفولطية ويزداد التيار، وفي الرافعة يحدث العكس.', 'القدرة الداخلة تساوي القدرة الخارجة في المحولة المثالية I₁V₁ = I₂V₂؛ فإذا ارتفعت الفولطية في الثانوي قل التيار فيه بالنسبة نفسها، والعكس صحيح.', 'جهاز اللحام يحتاج تياراً كبيراً جداً لذا يستعمل محولة خافضة، والتلفاز القديم يحتاج فولطية عالية جداً للقاذف الإلكتروني لذا يستعمل محولة رافعة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — المحولة المثالية: P₁ = P₂ و I₁V₁ = I₂V₂ (ص 137، 140–141) + س1 فقرة 3 و س1 فقرة 5 والمسألتان 1 و 4 =============== */
(() => {
  const EX = {
    q3: { t: 'س1 فقرة 3 ص 144', set: { V1: 240, N1: 800, N2: 200, R: 1.5 }, q: 'محولة مثالية لفات ملفها الابتدائي 800 turn والثانوي 200 turn، والتيار في الثانوي 40 A. التيار في الملف الابتدائي؟', lines: ['I₁ / I₂ = N₂ / N₁', 'I₁ = I₂ × N₂ / N₁', 'I₁ = 40 × 200 / 800', 'I₁ = 10 A', 'الجواب a'] },
    q5: { t: 'س1 فقرة 5 ص 145', set: { V1: 240, N1: 600, N2: 1800, R: 720 }, q: 'محولة مثالية لفات ابتدائيها 600 turn وثانويها 1800 turn، والقدرة الداخلة 720 W بفولطية 240 V. تيار ملفها الثانوي؟', lines: ['V₂ = 240 × 1800 / 600 = 720 V', 'P₂ = P₁ = 720 W', 'I₂ = P₂ / V₂ = 720 / 720', 'I₂ = 1 A', 'الجواب a'] },
    p1: { t: 'المسألة 1 ص 146', set: { V1: 220, N1: 400, N2: 200, R: 100 }, q: 'محولة كفاءتها 100% ونسبة التحويل فيها 1/2 تعمل على 220 V، والتيار في ملفها الثانوي 1.1 A. احسب فولطية الثانوي وتيار الابتدائي.', lines: ['V₂ = V₁ × N₂ / N₁', 'V₂ = 220 × 1/2 = 110 V', 'I₁ V₁ = I₂ V₂', 'I₁ = 1.1 × 110 / 220', 'I₁ = 0.55 A'] },
    p4: { t: 'المسألة 4 ص 146', set: { V1: 240, N1: 8000, N2: 200, R: 3 }, q: 'مصباح مكتوب عليه 6 V و 12 W ربط مع الثانوي، والابتدائي على 240 V ولفاته 8000 turn، فتوهج المصباح توهجاً اعتيادياً. احسب N₂ وتيار المصباح وتيار الابتدائي.', lines: ['N₂ = N₁ × V₂ / V₁', 'N₂ = 8000 × 6 / 240 = 200 turn', 'I₂ = P / V₂ = 12 / 6 = 2 A', 'I₁ = P / V₁ = 12 / 240', 'I₁ = 0.05 A'] } };
  const RL = f => .5 * Math.pow(2000, f), FR2 = R => clamp(Math.log(R / .5) / Math.log(2000), 0, 1);
  const D = { id: 'g9_tr_ideal', page: 140, fig: 'ص 137 و 140–141',
    desc: 'القدرة الكهربائية P = I × V. القدرة الداخلة في الملف الابتدائي P₁ = I₁ × V₁ والقدرة الخارجة من الملف الثانوي P₂ = I₂ × V₂. وطبقاً لقانون حفظ الطاقة فإن القدرة المجهزة لدائرة الملف الابتدائي تساوي القدرة الخارجة من دائرة الملف الثانوي على فرض أن المحولة مثالية (إهمال الضياع في أسلاك الملفين وفي القلب الحديدي): P₁ = P₂ أي I₁V₁ = I₂V₂ ومنها V₂/V₁ = I₁/I₂ = N₂/N₁. فالمحولة الرافعة للفولطية تكون خافضة للتيار في الوقت نفسه، والفولطية تتناسب عكسياً مع التيار.',
    tags: 'المحولة المثالية حفظ الطاقة P1 = P2 I1V1 = I2V2 I1/I2 = N2/N1 القدرة الداخلة القدرة الخارجة س1 فقرة 3 س1 فقرة 5 المسألة 1 المسألة 4 مصباح 6 V 12 W 8000 turn 0.05 A',
    tools: ['محولة مثالية', 'مصدر متناوب', 'أميتران وفولطميتران', 'حمل متغير (ريوستات) أو مصباح'],
    steps: ['اسحب منزلق الريوستات (الحمل) لتغيير مقاومته: يتغير I₂ ثم يتغير I₁ معه.', 'لاحظ عمودي القدرة: P₁ = P₂ دائماً في المحولة المثالية.', 'اسحب الملفين لتغيير اللفات: I₁ / I₂ = N₂ / N₁.', 'اختر سؤالاً أو مسألة ثم اضغط «الخطوة التالية».'],
    concl: ['في المحولة المثالية P₁ = P₂ أي I₁V₁ = I₂V₂.', 'V₂/V₁ = I₁/I₂ = N₂/N₁.', 'الرافعة للفولطية خافضة للتيار، والخافضة للفولطية رافعة للتيار.', 'س1 فقرة 3: 10 A، س1 فقرة 5: 1 A، المسألة 1: 110 V و 0.55 A، المسألة 4: 200 turn و 2 A و 0.05 A.'],
    laws: ['g9_l7_ideal', 'g9_l7_ratio', 'g9_power'],
    controls: [R('V1', 'فولطية الملف الابتدائي V₁', 1, 240, 240, 1, 'V'), R('N1', 'لفات الملف الابتدائي N₁', 5, 8000, 800, 5, 'turn'), R('N2', 'لفات الملف الثانوي N₂', 5, 8000, 200, 5, 'turn'), R('R', 'مقاومة الحمل R', .5, 1000, 1.5, .5, 'Ω')],
    setup(S) { S.ph = 0; S.ex = 0; S.k = 0; S.m = 'q3'; S.n1 = 800; S.n2 = 200; S.p1 = 0; S.p2 = 0; S.rf = FR2(S.p.R); },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24; return { w, h, L, x0, cx: x0 + 110, cy: 100, cw: 170, ch: 210, t: 36, rx0: x0 + 130, rx1: x0 + 300, ry: 410 }; },
    q(S) { const V2 = S.p.V1 * S.p.N2 / S.p.N1, I2 = V2 / S.p.R, I1 = I2 * S.p.N2 / S.p.N1; return { V2, I2, I1, P1: I1 * S.p.V1, P2: I2 * V2 }; },
    update(S, dt) { S.ph += dt * TAU * .8; S.n1 = Q37.ez(S.n1, S.p.N1, dt, 10); S.n2 = Q37.ez(S.n2, S.p.N2, dt, 10); S.rf = Q37.ez(S.rf, FR2(S.p.R), dt, 12); const q = D.q(S); S.p1 = Q37.ez(S.p1, q.P1, dt, 8); S.p2 = Q37.ez(S.p2, q.P2, dt, 6); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), q = D.q(S), lamp = S.m === 'p4';
      Q37.bg(ctx, w, h);
      const X = Q37.xf(ctx, { x: g.cx, y: g.cy, w: g.cw, h: g.ch, t: g.t, n1v: Q37.nv(S.n1), n2v: Q37.nv(S.n2), B: Math.sin(S.ph) * .8, l1: 'N₁ = ' + S.p.N1, l2: 'N₂ = ' + S.p.N2, ls: 11.5 });
      const so = Q37.src(ctx, g.x0 + 20, g.cy + g.ch / 2 + 20, S.p.V1, { side: 1, ph: S.ph, w: 72 }); Q37.acw(ctx, [so.a, [so.a[0] + 16, so.a[1]], [so.a[0] + 16, X.p.a[1]], X.p.a], 1, S.ph, '#dc2626'); Q37.acw(ctx, [so.b, [so.b[0] + 16, so.b[1]], [so.b[0] + 16, X.p.b[1]], X.p.b], 1, S.ph, '#dc2626');
      Q37.dm(ctx, g.x0 + 20, g.cy + 20, Q37.fi(q.I1), { name: 'الأميتر I₁', col: '#b91c1c', w: 92 }); Q33.T(ctx, 'V₁ = ' + S.p.V1 + ' V', g.x0 + 20, g.cy + g.ch / 2 + 74, { s: 11.5, w: 900, c: '#b91c1c' });
      // secondary → load
      const lx = (g.rx0 + g.rx1) / 2, amp = Math.min(1.2, q.I2 / 20 + .3), xr = g.rx1 + 11, xl = g.rx0 - 11;
      Q37.acw(ctx, [X.s.a, [xr, X.s.a[1]], [xr, lamp ? g.ry - 32 : g.ry + 10]].concat(lamp ? [[lx + 18, g.ry - 32]] : []), amp, S.ph, '#2563eb'); Q37.acw(ctx, [X.s.b, [X.s.b[0], g.cy + g.ch + 34], [xl, g.cy + g.ch + 34], [xl, g.ry - 31]].concat(lamp ? [[lx - 18, g.ry - 32]] : []), amp, S.ph, '#2563eb');
      if (lamp) { Q33.bulb(ctx, lx, g.ry - 32, q.V2 / 6, { s: 1.1 }); Q33.T(ctx, 'مصباح 6 V و 12 W', lx, g.ry - 6, { s: 10.5, w: 900, c: '#334155' }); }
      else Q33.rheo(ctx, g.rx0, g.rx1, g.ry, S.rf, { label: 'الحمل R = ' + S.p.R + ' Ω' });
      Q37.dm(ctx, xr + 50, g.cy + 20, Q37.fi(q.I2), { name: 'الأميتر I₂', col: '#1d4ed8', w: 88 }); Q37.dm(ctx, xr + 50, g.cy + g.ch / 2 + 40, Q37.fv(q.V2), { name: 'الفولطميتر V₂', col: '#1d4ed8', w: 88 });
      // power bars
      const by = g.ry + 62, bx = g.x0 + 60, bw = w - 24 - bx - 60, mP = Math.max(S.p1, S.p2, 1e-9);
      [['P₁', S.p1, '#ef4444', 'I₁ × V₁ = ' + Q37.fi(q.I1) + ' × ' + S.p.V1 + ' V = ' + Q37.fp(q.P1)], ['P₂', S.p2, '#3b82f6', 'I₂ × V₂ = ' + Q37.fi(q.I2) + ' × ' + Q37.fv(q.V2) + ' = ' + Q37.fp(q.P2)]].forEach((b, i) => { const yy = by + i * 42;
        Q33.T(ctx, b[0], bx - 26, yy + 12, { s: 14, w: 900, c: b[2] }); K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, bx, yy, bw, 24, 6); ctx.fill(); ctx.fillStyle = b[2]; const ww = Math.max(8, bw * b[1] / mP); rr(ctx, bx, yy, ww, 24, Math.min(6, ww / 2)); ctx.fill(); }); Q33.T(ctx, b[3], bx + 12, yy + 12, { s: 11.5, w: 900, c: '#fff', a: 'left' }); });
      Q33.T(ctx, 'القدرة الداخلة تساوي القدرة الخارجة', bx + bw / 2, by + 100, { s: 12.5, w: 900, c: '#fff', bg: '#0e7490' });
      if (S.ex) Q42.steps(ctx, S, { title: EX[S.m].t, q: EX[S.m].q, lines: EX[S.m].lines, k: S.k }, { y: 70, x: w - 12, wd: 300 });
      else Q37.card(ctx, S, [{ t: 'P₁ = P₂', mono: 1, w: 900, c: '#0e7490', s: 14 }, { t: 'I₁ V₁ = I₂ V₂', mono: 1, w: 900 }, { t: 'V₂ / V₁ = I₁ / I₂ = N₂ / N₁', mono: 1 }, { t: 'I₁ / I₂ = ' + Q33.f(q.I1 / q.I2, 4), mono: 1, c: '#b91c1c' }, { t: 'N₂ / N₁ = ' + Q33.f(S.p.N2 / S.p.N1, 4), mono: 1, c: '#1d4ed8' }, { t: S.p.N2 > S.p.N1 ? 'رافعة للفولطية وخافضة للتيار' : S.p.N2 < S.p.N1 ? 'خافضة للفولطية ورافعة للتيار' : 'لا تغيّر الفولطية ولا التيار', c: '#0e7490', w: 900 }], { title: 'المحولة المثالية', wd: 290, y: 70 });
      const C = D.chips(S, g); Q33.drawChips(ctx, C.m); C.e[1]._col = '#be185d'; Q33.drawChips(ctx, C.e); Q37.banner(ctx, w, 'اسحب منزلق الحمل وغيّر اللفات، ولاحظ أن P₁ = P₂');
    },
    chips(S, g) { const set = S2 => { const e = EX[S2.m].set; Object.keys(e).forEach(k => setParam(S2, k, e[k])); };
      return { m: Q37.chips(S, 'm', [['q3', 'س1 فقرة 3'], ['q5', 'س1 فقرة 5'], ['p1', 'المسألة 1'], ['p4', 'المسألة 4 المصباح']], g.h - 128, S.m, (S2, k) => { S2.m = k; S2.ex = 0; S2.k = 0; set(S2); }, { bw: 170 }), e: Q43.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', set, 5) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), L = [];
      if (S.m !== 'p4') L.push({ id: 'rh', x: g.rx0 + (g.rx1 - g.rx0) * S.rf, y: g.ry - 25, r: 18, axis: 'x', keep: true, tip: 'اسحب منزلق الحمل لتغيير مقاومته', idle: 'اسحب منزلق الحمل ✋', drag: (S2, d) => { const f = clamp((d.ox + d.x - d.sx - g.rx0) / (g.rx1 - g.rx0), 0, 1), R = RL(f); setParam(S2, 'R', R < 10 ? Math.round(R * 2) / 2 : Math.round(R)); S2.ex = 0; } });
      const mk = (id, x, k) => ({ id, x, y: g.cy + g.ch / 2, w: 60, h: g.ch - 90, axis: 'y', keep: true, hint: L.length ? false : undefined, idle: L.length ? undefined : 'اسحب الملف ✋', tip: 'اسحب للأعلى لزيادة اللفات وللأسفل لتقليلها', down: S2 => { S2._n0 = S2.p[k]; }, drag: (S2, d) => { setParam(S2, k, Math.round(clamp((S2._n0 || S2.p[k]) * Math.exp(-(d.y - d.sy) / 70), 5, 8000) / 5) * 5); S2.ex = 0; } });
      L.push(mk('n2', g.cx + g.cw - g.t / 2, 'N2')); L.push(Object.assign(mk('n1', g.cx + g.t / 2, 'N1'), { hint: false, idle: undefined })); return L.concat(C.m, C.e); },
    readings(S) { const q = D.q(S); return [rd('V₁ ، I₁', S.p.V1 + ' V ، ' + Q37.fi(q.I1)), rd('V₂ ، I₂', Q37.fv(q.V2) + ' ، ' + Q37.fi(q.I2)), rd('القدرة الداخلة P₁', Q37.fp(q.P1)), rd('القدرة الخارجة P₂', Q37.fp(q.P2)), rd('الحمل R', S.p.R + ' Ω')]; },
    record(S) { const q = D.q(S); return { R: S.p.R, I1: +q.I1.toFixed(4), I2: +q.I2.toFixed(4), P1: +q.P1.toFixed(2), P2: +q.P2.toFixed(2) }; },
    cols: [['R', 'R (Ω)'], ['I1', 'I₁ (A)'], ['I2', 'I₂ (A)'], ['P1', 'P₁ (W)'], ['P2', 'P₂ (W)']],
    graph: { x: 'I2', y: 'I1', xl: 'تيار الملف الثانوي I₂ (A)', yl: 'تيار الملف الابتدائي I₁ (A)' },
    explain(S) { const q = D.q(S); return Q26.ex('I₁ = ' + Q37.fi(q.I1) + ' و I₂ = ' + Q37.fi(q.I2) + ' والقدرتان متساويتان ' + Q37.fp(q.P1) + '.', 'المحولة المثالية لا تضيع شيئاً من الطاقة، لذا القدرة الداخلة = القدرة الخارجة: I₁V₁ = I₂V₂. الحمل هو الذي يحدد التيار I₂، ومنه يتحدد التيار الذي يسحبه الملف الابتدائي من المصدر: I₁ = I₂ × N₂ / N₁.', 'المحولة لا تصنع طاقة: إذا رفعت الفولطية خفضت التيار.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — نقل القدرة الكهربائية إلى مسافات بعيدة بفولطية عالية وتيار واطئ (ص 138، س6 و س9) =============== */
(() => {
  const P = 1e7, VG = 11;
  const D = { id: 'g9_tr_grid', page: 138, fig: 'الشكل 7 + س6 و س9',
    desc: 'عند نقل الطاقة الكهربائية إلى مسافات بعيدة خلال أسلاك توصيل طويلة فإنها تنقل بفولطية عالية وتيار واطئ وذلك لتقليل الخسارة التي تحصل بسبب المقاومة الكبيرة لهذه الأسلاك. لذا توضع محولة رافعة في بداية خطوط نقل القدرة عند محطة الإرسال، ومحولة خافضة في نهاية خطوط النقل قبل دخولها المدينة أو المصنع.',
    tags: 'نقل القدرة الكهربائية فولطية عالية تيار واطئ خسارة الأسلاك محطة توليد محولة رافعة محولة خافضة المصنع المدينة س6 س9 الفائدة الاقتصادية',
    tools: ['محطة توليد 11 kV', 'محولة رافعة', 'أسلاك نقل طويلة', 'محولة خافضة', 'مصنع أو مدينة'],
    steps: ['اسحب مقبض المحولة الرافعة إلى الأعلى لرفع فولطية النقل، أو اختر فولطية من الأزرار.', 'لاحظ: كلما ارتفعت الفولطية قل التيار في الأسلاك وقلت سخونتها والقدرة الضائعة.', 'جرّب «بدون محولة رافعة»: معظم القدرة تضيع حرارة في الأسلاك.', 'غيّر مقاومة الأسلاك من لوحة التحكم.'],
    concl: ['القدرة المنقولة P = I × V: عند الفولطية العالية يكون التيار واطئاً.', 'الخسارة الحرارية في الأسلاك تزداد كثيراً بزيادة التيار.', 'س9: في بداية الخطوط محولة رافعة، وفي نهايتها قبل المصنع محولة خافضة.', 'س6: النقل بفولطية عالية وتيار واطئ يقلل الطاقة الضائعة والكلفة.'],
    laws: ['g9_l7_line', 'g9_power'],
    controls: [R('Vt', 'فولطية النقل', 11, 400, 132, 1, 'kV'), R('Rl', 'مقاومة أسلاك النقل', 1, 20, 5, 1, 'Ω'), TG('cur', 'حركة الشحنات في الأسلاك', true, null, 'current')],
    setup(S) { S.fp = 0; S.hot = 0; S.ph = 0; S.kv = Math.log(S.p.Vt / 11) / Math.log(400 / 11); },
    I(S) { return P / (S.p.Vt * 1000); },
    loss(S) { return Math.min(P * .95, Math.pow(D.I(S), 2) * S.p.Rl); },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 20, x1 = w - 20, yg = 330; return { w, h, L, x0, x1, yg, ux: x0 + 150, dx: x1 - 170, ly: 150 }; },
    update(S, dt) { S.ph += dt * 3; const I = D.I(S); S.fp += clamp(I / 4, 4, 240) * dt; S.hot = Q37.ez(S.hot, D.loss(S) / P, dt, 4); S.kv = Q37.ez(S.kv, Math.log(S.p.Vt / 11) / Math.log(400 / 11), dt, 10); },
    tower(ctx, x, yg, top) { K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x - 22, yg); ctx.lineTo(x - 5, top); ctx.lineTo(x + 5, top); ctx.lineTo(x + 22, yg); ctx.stroke(); ctx.lineWidth = 1.2; for (let y = top + 14; y < yg; y += 18) { const f = (y - top) / (yg - top), a = 5 + 17 * f, f2 = (y + 18 - top) / (yg - top), b = 5 + 17 * Math.min(1, f2); ctx.beginPath(); ctx.moveTo(x - a, y); ctx.lineTo(x + b, Math.min(yg, y + 18)); ctx.moveTo(x + a, y); ctx.lineTo(x - b, Math.min(yg, y + 18)); ctx.stroke(); } ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 30, top + 6); ctx.lineTo(x + 30, top + 6); ctx.stroke(); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), I = D.I(S), Pl = D.loss(S), fr = Pl / P, hot = S.hot;
      Q37.bg(ctx, w, h);
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, 60, 0, g.yg); gr.addColorStop(0, '#bae6fd'); gr.addColorStop(1, '#e0f2fe'); ctx.fillStyle = gr; rr(ctx, g.x0, 60, g.x1 - g.x0, g.yg - 60 + 40, 14); ctx.fill(); ctx.fillStyle = '#86efac'; ctx.fillRect(g.x0, g.yg, g.x1 - g.x0, 40); ctx.fillStyle = '#4ade80'; ctx.fillRect(g.x0, g.yg, g.x1 - g.x0, 6); });
      // station
      K.raw(ctx, () => { ctx.fillStyle = '#64748b'; ctx.fillRect(g.x0 + 14, g.yg - 80, 70, 80); ctx.fillStyle = '#94a3b8'; ctx.fillRect(g.x0 + 24, g.yg - 130, 14, 50); ctx.fillRect(g.x0 + 50, g.yg - 115, 14, 35); ctx.fillStyle = 'rgba(148,163,184,.5)'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(g.x0 + 31 + k * 8 + Math.sin(S.ph + k) * 3, g.yg - 142 - k * 14, 8 + k * 3, 0, TAU); ctx.fill(); } });
      Q33.T(ctx, 'محطة توليد', g.x0 + 49, g.yg + 16, { s: 10.5, w: 900, c: '#14532d' }); Q33.T(ctx, VG + ' kV', g.x0 + 49, g.yg - 40, { s: 11, w: 900, c: '#fff' });
      // step-up and step-down transformers (small)
      const up = S.p.Vt > VG; [[g.ux, up ? 'محولة رافعة' : 'بدون محولة رافعة', up], [g.dx, 'محولة خافضة', 1]].forEach(([x, t, on], i) => { K.raw(ctx, () => { ctx.globalAlpha = on ? 1 : .35; }); Q37.xf(ctx, { x: x - 34, y: g.yg - 86, w: 68, h: 70, t: 14, n1v: i ? 7 : 3, n2v: i ? 3 : 7, B: on ? Math.sin(S.ph * 2) * .6 : 0, fn: 4 }); K.raw(ctx, () => { ctx.globalAlpha = 1; }); Q33.T(ctx, t, x, g.yg + 16, { s: 10.5, w: 900, c: on ? (i ? '#b45309' : '#15803d') : '#64748b' }); });
      // knob on the step-up transformer
      const ky = g.yg - 100 - S.kv * 60; K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.ux + 44, g.yg - 100); ctx.lineTo(g.ux + 44, g.yg - 160); ctx.stroke(); ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.arc(g.ux + 44, ky, 10, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); });
      // towers and lines
      const T = [g.ux + 90, (g.ux + g.dx) / 2, g.dx - 80], top = g.ly; T.forEach(x => D.tower(ctx, x, g.yg, top));
      const pts = [[g.x0 + 84, g.yg - 60], [g.ux - 34, g.yg - 60]], seg = (a, b, sag) => { const n = 12, out = []; for (let i = 0; i <= n; i++) { const u = i / n; out.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u + sag * 4 * u * (1 - u)]); } return out; };
      let L1 = [[g.ux + 34, g.yg - 70], [T[0] - 28, top + 6]]; L1 = L1.concat(seg([T[0] - 28, top + 6], [T[1] - 28, top + 6], 26).slice(1), seg([T[1] - 28, top + 6], [T[2] - 28, top + 6], 26).slice(1), [[g.dx - 34, g.yg - 70]]);
      let L2 = [[g.ux + 34, g.yg - 40], [T[0] + 28, top + 6]]; L2 = L2.concat(seg([T[0] + 28, top + 6], [T[1] + 28, top + 6], 30).slice(1), seg([T[1] + 28, top + 6], [T[2] + 28, top + 6], 30).slice(1), [[g.dx - 34, g.yg - 40]]);
      Q33.wire(ctx, pts, { col: '#dc2626' });
      [L1, L2].forEach((p, i) => { K.raw(ctx, () => { ctx.save(); ctx.lineJoin = 'round'; if (hot > .01) { ctx.shadowColor = 'rgba(239,68,68,' + Math.min(1, hot * 3) + ')'; ctx.shadowBlur = 6 + 30 * Math.min(1, hot * 2); } ctx.strokeStyle = hot > .01 ? 'rgb(' + Math.round(71 + 184 * Math.min(1, hot * 2.5)) + ',' + Math.round(85 - 40 * Math.min(1, hot * 2.5)) + ',' + Math.round(105 - 60 * Math.min(1, hot * 2.5)) + ')' : '#475569'; ctx.lineWidth = 3; ctx.beginPath(); p.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.restore(); }); if (S.p.cur !== false) Q33.flow(ctx, p, S.fp * (i ? -1 : 1) * .5, 'c', { sp: Math.max(14, 50 - I / 30) }); });
      // city / factory
      K.raw(ctx, () => { [[0, 70, '#475569'], [26, 100, '#64748b'], [56, 60, '#334155'], [80, 84, '#475569']].forEach(([dx, hh, c]) => { ctx.fillStyle = c; ctx.fillRect(g.x1 - 116 + dx, g.yg - hh, 24, hh); ctx.fillStyle = 'rgba(253,224,71,' + (.4 + .6 * (1 - fr)) + ')'; for (let yy = g.yg - hh + 8; yy < g.yg - 8; yy += 14) ctx.fillRect(g.x1 - 110 + dx, yy, 6, 6), ctx.fillRect(g.x1 - 100 + dx, yy, 6, 6); }); });
      Q33.wire(ctx, [[g.dx + 34, g.yg - 50], [g.x1 - 116, g.yg - 50]], { col: '#2563eb' }); Q33.T(ctx, 'المصنع والمدينة', g.x1 - 66, g.yg + 16, { s: 10.5, w: 900, c: '#14532d' });
      // labels on the line
      Q33.T(ctx, 'V = ' + S.p.Vt + ' kV', T[1], top - 26, { s: 13, w: 900, c: '#fff', bg: '#0e7490' }); Q33.T(ctx, 'I = ' + Q37.fi(I), T[1], top + 58, { s: 13, w: 900, c: '#fff', bg: I > 200 ? '#b91c1c' : '#334155' });
      // loss bars (bottom-left)
      const bx = g.x0 + 130, bw = 420, by = g.yg + 66; Q33.T(ctx, 'القدرة المرسلة 10 MW', bx + bw / 2, by - 14, { s: 12, w: 900, c: '#334155' });
      [['تصل للمصنع', 1 - fr, '#16a34a', Q37.fp(P - Pl)], ['تضيع حرارة', fr, '#dc2626', Q37.fp(Pl)]].forEach((q, i) => { const yy = by + i * 34; Q33.T(ctx, q[0], g.x0 + 64, yy + 11, { s: 11, w: 900, c: q[2] }); K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, bx, yy, bw, 22, 6); ctx.fill(); ctx.fillStyle = q[2]; const ww = Math.max(8, bw * q[1]); rr(ctx, bx, yy, ww, 22, Math.min(6, ww / 2)); ctx.fill(); }); Q33.T(ctx, q[3] + '  ' + Q33.f(q[1] * 100, 2) + '%', bx + bw + 8, yy + 11, { s: 11, w: 900, c: '#0f172a', a: 'left' }); });
      Q37.card(ctx, S, [{ t: 'I = P / V = ' + Q37.fi(I), mono: 1 }, { t: 'P_lost = I² R = ' + Q37.fp(Pl), mono: 1, c: '#b91c1c', w: 900 }, { t: 'في بداية الخطوط: محولة رافعة', c: '#15803d', w: 900 }, { t: 'في نهايتها قبل المصنع: محولة خافضة', c: '#b45309', w: 900 }], { title: 'لماذا فولطية عالية وتيار واطئ؟', wd: 330, x: w - 20, y: g.yg + 150 });
      Q33.drawChips(ctx, D.chips(S, g)); Q37.banner(ctx, w, 'اسحب مقبض المحولة الرافعة وراقب سخونة الأسلاك');
    },
    chips(S, g) { return Q37.chips(S, 'vt', [['11', 'بدون محولة رافعة 11 kV'], ['33', '33 kV'], ['132', '132 kV'], ['400', '400 kV']], g.h - 84, String(S.p.Vt), (S2, k) => setParam(S2, 'Vt', +k), { bw: 190 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), ky = g.yg - 100 - S.kv * 60;
      return [{ id: 'knob', x: g.ux + 44, y: ky, r: 16, axis: 'y', keep: true, tip: 'اسحب للأعلى لرفع فولطية النقل', idle: 'اسحب المقبض ✋', drag: (S2, d) => { const f = clamp((g.yg - 100 - (d.oy + d.y - d.sy)) / 60, 0, 1); setParam(S2, 'Vt', Math.round(11 * Math.pow(400 / 11, f))); } }].concat(D.chips(S, g)); },
    readings(S) { const I = D.I(S), Pl = D.loss(S); return [rd('فولطية النقل', S.p.Vt + ' kV'), rd('التيار في الأسلاك', Q37.fi(I)), rd('القدرة الضائعة', Q37.fp(Pl)), rd('نسبة الضياع', Q33.f(Pl / P * 100, 3) + ' %'), rd('القدرة الواصلة', Q37.fp(P - Pl))]; },
    record(S) { return { V: S.p.Vt, I: +D.I(S).toFixed(1), L: Math.round(D.loss(S)) }; },
    cols: [['V', 'V (kV)'], ['I', 'I (A)'], ['L', 'الضائع (W)']],
    graph: { x: 'V', y: 'L', xl: 'فولطية النقل (kV)', yl: 'القدرة الضائعة (W)' },
    explain(S) { return Q26.ex('عند ' + S.p.Vt + ' kV يضيع ' + Q33.f(D.loss(S) / P * 100, 2) + '% من القدرة في الأسلاك.', 'القدرة المنقولة نفسها P = I × V؛ فكلما رفعنا الفولطية قل التيار في الأسلاك. والحرارة المتولدة في الأسلاك الطويلة ذات المقاومة الكبيرة تتزايد بشدة مع التيار، لذا ننقل القدرة بفولطية عالية وتيار واطئ ثم نخفض الفولطية قرب المدن والمصانع.', 'محطات التوليد ترفع الفولطية بمحولات رافعة، ومحطات التوزيع قرب المدن تخفضها بمحولات خافضة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — خسائر القدرة في المحولة: مقاومة الأسلاك والتيارات الدوامة (3-7، ص 142، الشكلان 8 و 9) =============== */
(() => {
  const P1 = 1000, WIRE = { cu: ['نحاس', 15, '#c2410c'], fe: ['حديد', 90, '#64748b'], ni: ['نيكروم', 260, '#a1a1aa'] };
  const D = { id: 'g9_tr_losses', page: 142, fig: 'الشكلان 8 و 9',
    desc: 'جميع المحولات يحصل فيها ضياع قدرة أثناء عملها فتكون القدرة الخارجة أقل من القدرة الداخلة. من أنواع هذه الخسائر: 1) خسارة ناتجة عن مقاومة أسلاك الملفين تظهر بشكل طاقة حرارية في أسلاك الملفين الابتدائي والثانوي؛ ولتقليلها تصنع أسلاك الملفين من مادة ذات مقاومة صغيرة (النحاس). 2) خسارة التيارات الدوامة تظهر بشكل طاقة حرارية في القلب الحديدي بسبب التغير في خطوط المجال المغناطيسي خلاله والذي يولد تيارات محتثة داخله تسمى التيارات الدوامة؛ ولتقليلها يصنع القلب من صفائح رقيقة من الحديد المطاوع معزولة بعضها عن بعض كهربائياً ومكبوسة كبساً شديداً ومستواها موازٍ للمجال المغناطيسي.',
    tags: 'خسائر القدرة مقاومة أسلاك الملفين النحاس طاقة حرارية التيارات الدوامة القلب الحديدي صفائح رقيقة معزولة الحديد المطاوع الكفاءة الشكل 8 الشكل 9',
    tools: ['محولة', 'أسلاك من النحاس والحديد والنيكروم', 'قلب مصمت وقلب من صفائح معزولة', 'مقياس حرارة'],
    steps: ['اضغط على الملفين لتغيير مادة الأسلاك: النحاس أقل سخونة.', 'اضغط على القلب أو الأزرار للتبديل بين قلب مصمت وقلب من صفائح: لاحظ التيارات الدوامة في المقطع.', 'اسحب مقبض المقطع لزيادة عدد الصفائح: تصغر التيارات الدوامة وتقل الحرارة.', 'راقب الكفاءة: η = P₂ / P₁ × 100%.'],
    concl: ['خسارة مقاومة الأسلاك تظهر حرارةً في الملفين، وتقلل باستعمال أسلاك النحاس.', 'التيارات الدوامة تيارات محتثة داخل القلب تظهر حرارةً فيه.', 'تقلل بصنع القلب من صفائح رقيقة معزولة مكبوسة مستواها موازٍ للمجال.', 'كلما قلت الخسائر زادت كفاءة المحولة.'],
    laws: ['g9_l7_loss', 'g9_l7_eff'],
    controls: [R('nL', 'عدد صفائح القلب', 2, 24, 12, 1, ''), TG('ed', 'التيارات الدوامة', true, null, 'current'), TG('ht', 'الحرارة', true, null, 'heat')],
    setup(S) { S.wm = 'fe'; S.cr = 'solid'; S.ph = 0; S.hc = 0; S.hk = 0; S.nl = 12; },
    L(S) { const pc = WIRE[S.wm][1], pe = S.cr === 'solid' ? 220 : 220 / Math.pow(S.p.nL, 2) * 4; return { pc, pe, tot: pc + pe, P2: P1 - pc - pe, eta: (P1 - pc - pe) / P1 * 100 }; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24; return { w, h, L, x0, cx: x0 + 110, cy: 120, cw: 190, ch: 220, t: 40, ix: w - 304, iy: 330, iw: 284, ih: 150 }; },
    update(S, dt) { S.ph += dt * TAU * .9; const q = D.L(S); S.hc = Q37.ez(S.hc, q.pc / 260, dt, 2.5); S.hk = Q37.ez(S.hk, q.pe / 220, dt, 2.5); S.nl = Q37.ez(S.nl, S.cr === 'solid' ? 1 : S.p.nL, dt, 8); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), q = D.L(S), B = Math.sin(S.ph), ht = S.p.ht !== false;
      Q37.bg(ctx, w, h);
      Q37.core(ctx, g.cx, g.cy, g.cw, g.ch, g.t, { solid: S.cr === 'solid', lamN: S.cr === 'solid' ? 1 : Math.round(S.nl), hot: ht ? S.hk * .9 : 0 });
      const len = g.ch - 2 * g.t - 14, cyy = g.cy + g.ch / 2, wc = WIRE[S.wm];
      const p = Q37.coil(ctx, g.cx + g.t / 2, cyy, len, g.t, 12, { side: -1, hot: ht ? S.hc : 0, col: wc[2] }), s = Q37.coil(ctx, g.cx + g.cw - g.t / 2, cyy, len, g.t, 8, { side: 1, hot: ht ? S.hc : 0, col: wc[2] });
      Q37.flux(ctx, g.cx, g.cy, g.cw, g.ch, g.t, B * .8, { n: 10 });
      Q33.T(ctx, 'أسلاك من ' + wc[0], g.cx + g.cw / 2, g.cy + g.ch + 18, { s: 11.5, w: 900, c: '#fff', bg: S.wm === 'cu' ? '#15803d' : '#b45309' }); Q33.T(ctx, S.cr === 'solid' ? 'قلب مصمت' : 'قلب من ' + S.p.nL + ' صفيحة معزولة', g.cx + g.cw / 2, g.cy + g.ch / 2, { s: 10.5, w: 900, c: '#fff', bg: S.cr === 'solid' ? '#b91c1c' : '#0e7490' });
      const so = Q37.src(ctx, g.x0 + 4, cyy, 220, { side: 1, ph: S.ph, w: 60, h: 64, lab: '' }); Q37.acw(ctx, [so.a, [so.a[0] + 14, so.a[1]], [so.a[0] + 14, p.a[1]], p.a], 1, S.ph, '#dc2626'); Q37.acw(ctx, [so.b, [so.b[0] + 14, so.b[1]], [so.b[0] + 14, p.b[1]], p.b], 1, S.ph, '#dc2626');
      const lx = g.cx + g.cw + 70, ly = cyy + 30; Q37.acw(ctx, [s.a, [lx + 18, s.a[1]], [lx + 18, ly]], 1, S.ph, '#2563eb'); Q37.acw(ctx, [s.b, [lx - 28, s.b[1]], [lx - 28, ly], [lx - 18, ly]], 1, S.ph, '#2563eb'); Q33.bulb(ctx, lx, ly, q.P2 / P1, { s: 1.1 });
      if (ht) { Q33.T(ctx, '🌡 ' + Q33.f(25 + S.hc * 95, 0) + ' °C', g.cx - 6, g.cy - 14, { s: 11, w: 900, c: '#fff', bg: S.hc > .4 ? '#b91c1c' : '#475569' }); Q33.T(ctx, '🌡 ' + Q33.f(25 + S.hk * 110, 0) + ' °C', g.cx + g.cw / 2, g.cy + g.ch - g.t / 2, { s: 11, w: 900, c: '#fff', bg: S.hk > .4 ? '#b91c1c' : '#475569' }); }
      // cross-section inset with eddy currents
      const ix = g.ix, iy = g.iy, iw = g.iw, ih = g.ih, n = Math.max(1, Math.round(S.nl));
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.strokeStyle = '#0891b2'; ctx.lineWidth = 2; rr(ctx, ix, iy - 26, iw, ih + 66, 12); ctx.fill(); ctx.stroke();
        const bx = ix + 20, by = iy + 10, bw = iw - 40, bh = ih - 30, lw = bw / n, gr = ctx.createLinearGradient(0, by, 0, by + bh); gr.addColorStop(0, '#cbd5e1'); gr.addColorStop(1, '#64748b'); ctx.fillStyle = gr; ctx.fillRect(bx, by, bw, bh);
        if (ht) { ctx.fillStyle = 'rgba(239,68,68,' + (.55 * S.hk) + ')'; ctx.fillRect(bx, by, bw, bh); }
        ctx.strokeStyle = '#fef3c7'; ctx.lineWidth = n > 1 ? 2.2 : 0; for (let i = 1; i < n; i++) { ctx.beginPath(); ctx.moveTo(bx + i * lw, by); ctx.lineTo(bx + i * lw, by + bh); ctx.stroke(); }
        ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.5; ctx.strokeRect(bx, by, bw, bh);
        // field symbols (perpendicular to the section)
        const sg = B > 0; ctx.fillStyle = 'rgba(124,58,237,' + (.25 + .5 * Math.abs(B)) + ')'; ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = 1.5; for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) { const xx = bx + bw * (i + .5) / 6, yy = by + bh * (j + .5) / 2 + (j ? 12 : -12); ctx.beginPath(); ctx.arc(xx, yy, 5, 0, TAU); ctx.stroke(); if (sg) { ctx.beginPath(); ctx.arc(xx, yy, 1.6, 0, TAU); ctx.fill(); } else { ctx.beginPath(); ctx.moveTo(xx - 3.5, yy - 3.5); ctx.lineTo(xx + 3.5, yy + 3.5); ctx.moveTo(xx + 3.5, yy - 3.5); ctx.lineTo(xx - 3.5, yy + 3.5); ctx.stroke(); } }
        if (S.p.ed !== false) { const a = Math.abs(B), dir = B > 0 ? 1 : -1; ctx.strokeStyle = 'rgba(220,38,38,' + (.35 + .65 * a) * Math.min(1, 1.6 / Math.sqrt(n)) + ')'; ctx.lineWidth = Math.max(1.2, 4 / Math.sqrt(n)); for (let i = 0; i < n; i++) { const ex = bx + lw * (i + .5), rx = lw / 2 - Math.max(2, lw * .12), ry = bh / 2 - 8; if (rx < 1.5) continue; ctx.beginPath(); ctx.ellipse(ex, by + bh / 2, rx * (.5 + .5 * a), ry * (.5 + .5 * a), 0, 0, TAU); ctx.stroke(); const ang = dir * (S.ph * 2) % TAU, ax = ex + Math.cos(ang) * rx * (.5 + .5 * a), ay = by + bh / 2 + Math.sin(ang) * ry * (.5 + .5 * a); ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.arc(ax, ay, Math.max(2, 4 / Math.sqrt(n)), 0, TAU); ctx.fill(); } }
        ctx.restore(); });
      Q33.T(ctx, 'مقطع في القلب: التيارات الدوامة', ix + iw / 2, iy - 12, { s: 11.5, w: 900, c: '#0e7490' }); Q33.T(ctx, 'الدوامة ' + Q37.fp(q.pe), ix + iw / 2, iy + ih + 4, { s: 11.5, w: 900, c: '#fff', bg: q.pe > 30 ? '#b91c1c' : '#15803d' });
      // handle to change laminations
      const hx = ix + 20 + (iw - 40) * (S.cr === 'solid' ? 0 : (S.p.nL - 2) / 22); K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, ix + 20, iy + ih + 24, iw - 40, 8, 4); ctx.fill(); ctx.fillStyle = '#0e7490'; ctx.beginPath(); ctx.arc(hx, iy + ih + 28, 10, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); });
      // loss bars
      const bx = g.x0 + 90, bw = 250, by = g.cy + g.ch + 60; [['مقاومة الأسلاك', q.pc, '#f97316'], ['التيارات الدوامة', q.pe, '#dc2626'], ['القدرة الخارجة P₂', q.P2, '#16a34a']].forEach((b, i) => { const yy = by + i * 32; Q33.T(ctx, b[0], bx - 50, yy + 10, { s: 10.5, w: 900, c: b[2] }); K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, bx + 10, yy, bw, 20, 5); ctx.fill(); ctx.fillStyle = b[2]; const ww = Math.max(8, bw * b[1] / P1); rr(ctx, bx + 10, yy, ww, 20, Math.min(5, ww / 2)); ctx.fill(); }); Q33.T(ctx, Q37.fp(b[1]), bx + bw + 16, yy + 10, { s: 11, w: 900, c: '#0f172a', a: 'left' }); });
      Q37.card(ctx, S, [{ t: 'P₁ = ' + P1 + ' W', mono: 1 }, { t: 'P_lost = ' + Q33.f(q.tot, 1) + ' W', mono: 1, c: '#b91c1c' }, { t: 'P₂ = P₁ − P_lost = ' + Q33.f(q.P2, 1) + ' W', mono: 1 }, { t: 'η = P₂ / P₁ × 100% = ' + Q33.f(q.eta, 1) + '%', mono: 1, w: 900, c: '#0e7490', s: 13.5 }, { t: 'النحاس والصفائح الرقيقة المعزولة تقلل الخسائر', c: '#15803d', w: 900 }], { title: 'خسائر القدرة والكفاءة', wd: 300, y: 70 });
      const C = D.chips(S, g); Q33.drawChips(ctx, C.w); Q33.drawChips(ctx, C.c); Q37.banner(ctx, w, 'اختر مادة الأسلاك ونوع القلب، واسحب مقبض الصفائح');
    },
    chips(S, g) { return { w: Q37.chips(S, 'wm', Object.keys(WIRE).map(k => [k, 'أسلاك ' + WIRE[k][0]]), g.h - 128, S.wm, (S2, k) => { S2.wm = k; }, { bw: 150 }), c: Q37.chips(S, 'cr', [['solid', 'قلب مصمت'], ['lam', 'صفائح رقيقة معزولة']], g.h - 84, S.cr, (S2, k) => { S2.cr = k; }, { bw: 190 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), hx = g.ix + 20 + (g.iw - 40) * (S.cr === 'solid' ? 0 : (S.p.nL - 2) / 22), cyc = S2 => { const K2 = Object.keys(WIRE); S2.wm = K2[(K2.indexOf(S2.wm) + 1) % K2.length]; };
      return [{ id: 'lam', x: hx, y: g.iy + g.ih + 28, r: 16, axis: 'x', keep: true, tip: 'اسحب لزيادة عدد الصفائح', idle: 'اسحب مقبض الصفائح ✋', drag: (S2, d) => { S2.cr = 'lam'; setParam(S2, 'nL', Math.round(2 + clamp((d.ox + d.x - d.sx - g.ix - 20) / (g.iw - 40), 0, 1) * 22)); } },
        { id: 'pc', x: g.cx + g.t / 2, y: g.cy + g.ch / 2, w: 60, h: 120, hint: false, tip: 'اضغط لتغيير مادة أسلاك الملفين', click: cyc }, { id: 'sc', x: g.cx + g.cw - g.t / 2, y: g.cy + g.ch / 2, w: 60, h: 120, hint: false, tip: 'اضغط لتغيير مادة أسلاك الملفين', click: cyc },
        { id: 'core', x: g.cx + g.cw / 2, y: g.cy + g.t / 2, w: g.cw - 40, h: g.t, hint: false, tip: 'اضغط للتبديل بين قلب مصمت وقلب من صفائح', click: S2 => { S2.cr = S2.cr === 'solid' ? 'lam' : 'solid'; } }].concat(C.w, C.c); },
    readings(S) { const q = D.L(S); return [rd('أسلاك الملفين', WIRE[S.wm][0]), rd('القلب', S.cr === 'solid' ? 'مصمت' : S.p.nL + ' صفيحة'), rd('خسارة مقاومة الأسلاك', Q37.fp(q.pc)), rd('خسارة التيارات الدوامة', Q37.fp(q.pe)), rd('القدرة الخارجة', Q37.fp(q.P2)), rd('الكفاءة η', Q33.f(q.eta, 1) + ' %')]; },
    record(S) { const q = D.L(S); return { n: S.cr === 'solid' ? 1 : S.p.nL, pe: +q.pe.toFixed(1), eta: +q.eta.toFixed(1) }; },
    cols: [['n', 'عدد الصفائح'], ['pe', 'خسارة الدوامة (W)'], ['eta', 'η (%)']],
    explain(S) { const q = D.L(S); return Q26.ex('الكفاءة ' + Q33.f(q.eta, 1) + '%: تضيع ' + Q33.f(q.tot, 0) + ' W حرارةً.', 'تيار الملفين يسخن الأسلاك بسبب مقاومتها، والنحاس مقاومته صغيرة فيسخن أقل. والمجال المتغير داخل القلب يولد تيارات محتثة تدور داخله (التيارات الدوامة) فتسخنه؛ تقسيم القلب إلى صفائح رقيقة معزولة يقطع مسارات هذه التيارات فتصغر كثيراً.', 'تُغمر المحولات الكبيرة بالزيت أو تُزوَّد بزعانف لتبريدها من هذه الحرارة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — كفاءة المحولة η = P₂/P₁ × 100%: مثال 2 ص 143 والمسألتان 2 و 3 ص 146 =============== */
(() => {
  const EX = { e2: { t: 'مثال 2 ص 143', set: { P1: 220, eta: 95 }, q: 'القدرة الداخلة في الملف الابتدائي لمحولة 220 W وخسائر القدرة فيها 11 W. جد كفاءة المحولة.', lines: ['P_lost = P₁ − P₂', '11 = 220 − P₂', 'P₂ = 209 W', 'η = P₂ / P₁ × 100%', 'η = 209 / 220 × 100%', 'η = 95%'] },
    p2: { t: 'المسألة 2 ص 146', set: { P1: 6000, eta: 80 }, q: 'محولة كفاءتها 80% والقدرة الخارجة منها 4.8 kW. ما مقدار القدرة الداخلة؟', lines: ['η = P₂ / P₁ × 100%', '80% = 4.8 kW / P₁ × 100%', 'P₁ = 4.8 / 0.8', 'P₁ = 6 kW'] },
    p3: { t: 'المسألة 3 ص 146', set: { P1: 9500, eta: 95 }, q: 'محولة كفاءتها 95% والقدرة الداخلة فيها 9.5 kW. ما مقدار القدرة الخارجة منها؟', lines: ['η = P₂ / P₁ × 100%', 'P₂ = η × P₁', 'P₂ = 0.95 × 9.5 kW', 'P₂ = 9.025 kW'] } };
  const D = { id: 'g9_tr_eff', page: 143, fig: 'مثال 2 + المسائل 2 و 3',
    desc: 'كفاءة المحولة العملية η = القدرة الخارجة من ملفها الثانوي P₂ ÷ القدرة الداخلة في ملفها الابتدائي P₁ × 100%، وخسائر القدرة = القدرة الداخلة − القدرة الخارجة. مثال 2: القدرة الداخلة 220 W والخسائر 11 W ⟸ P₂ = 209 W و η = 95%. المسألة 2: η = 80% و P₂ = 4.8 kW ⟸ P₁ = 6 kW. المسألة 3: η = 95% و P₁ = 9.5 kW ⟸ P₂ = 9.025 kW.',
    tags: 'كفاءة المحولة η = P2/P1 × 100% خسائر القدرة P1 − P2 مثال 2 ص 143 220 W 11 W 95% المسألة 2 80% 4.8 kW 6 kW المسألة 3 9.5 kW 9.025 kW مخطط سريان الطاقة',
    tools: ['مخطط سريان القدرة', 'مقياس الكفاءة'],
    steps: ['اسحب طرف سهم الخسائر إلى الأسفل لزيادة الخسائر، أو إلى الأعلى لتقليلها.', 'اسحب مقبض القدرة الداخلة لتغيير P₁.', 'لاحظ: P₁ = P₂ + الخسائر دائماً، والكفاءة أقل من 100%.', 'اختر المثال أو المسألة ثم «الخطوة التالية».'],
    concl: ['η = P₂ / P₁ × 100%.', 'خسائر القدرة = P₁ − P₂.', 'مثال 2: η = 95%. المسألة 2: P₁ = 6 kW. المسألة 3: P₂ = 9.025 kW.', 'كفاءة المحولة المثالية 100%، والعملية أقل من ذلك.'],
    laws: ['g9_l7_eff', 'g9_l7_loss'],
    controls: [R('P1', 'القدرة الداخلة P₁', 100, 10000, 220, 10, 'W'), R('eta', 'الكفاءة η', 50, 100, 95, 1, '%')],
    setup(S) { S.m = 'e2'; S.ex = 0; S.k = 0; S.e = 95; S.ph = 0; S.pp = S.p.P1; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24; return { w, h, L, x0, ax: x0 + 20, ay: 230, bx: x0 + 210, ex: x0 + 430, maxW: 120 }; },
    update(S, dt) { S.e = Q37.ez(S.e, S.p.eta, dt, 8); S.pp = Q37.ez(S.pp, S.p.P1, dt, 8); S.ph += dt; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P1 = S.p.P1, P2 = P1 * S.e / 100, Pl = P1 - P2, W1 = 60 + g.maxW * Math.sqrt(S.pp / 10000), W2 = W1 * S.e / 100, Wl = W1 - W2, ay = g.ay;
      Q37.bg(ctx, w, h);
      // Sankey: input band, split into output (straight) and loss (down)
      K.raw(ctx, () => { ctx.save(); const t0 = ay - W1 / 2;
        const gi = ctx.createLinearGradient(g.ax, 0, g.bx, 0); gi.addColorStop(0, '#fca5a5'); gi.addColorStop(1, '#ef4444'); ctx.fillStyle = gi; ctx.fillRect(g.ax, t0, g.bx - g.ax, W1);
        ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.moveTo(g.bx, t0); ctx.lineTo(g.ex, t0); ctx.lineTo(g.ex, t0 + W2); ctx.lineTo(g.bx, t0 + W2); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.moveTo(g.ex, t0 - 14); ctx.lineTo(g.ex + 40, t0 + W2 / 2); ctx.lineTo(g.ex, t0 + W2 + 14); ctx.closePath(); ctx.fill();
        if (Wl > .5) { const ly = t0 + W2, yb = ay + 150; ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(g.bx, ly); ctx.quadraticCurveTo(g.bx + 70 + Wl, ly, g.bx + 70 + Wl, ly + 70); ctx.lineTo(g.bx + 70 + Wl, yb); ctx.lineTo(g.bx + 70, yb); ctx.lineTo(g.bx + 70, ly + 70); ctx.quadraticCurveTo(g.bx + 70, ly + Wl, g.bx, ly + Wl); ctx.closePath(); ctx.fill();
          ctx.beginPath(); ctx.moveTo(g.bx + 56, yb); ctx.lineTo(g.bx + 70 + Wl / 2, yb + 34); ctx.lineTo(g.bx + 84 + Wl, yb); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = 'rgba(249,115,22,.5)'; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { const xx = g.bx + 70 + Wl / 2 + (k - 1) * 14, ph = (S.ph * 30 + k * 12) % 36; ctx.beginPath(); ctx.moveTo(xx, yb + 44 + ph); ctx.quadraticCurveTo(xx + 6, yb + 50 + ph, xx, yb + 56 + ph); ctx.stroke(); } }
        ctx.restore(); });
      Q33.T(ctx, 'P₁ = ' + Q37.fp(P1), (g.ax + g.bx) / 2, ay - W1 / 2 - 16, { s: 13, w: 900, c: '#b91c1c' }); Q33.T(ctx, 'القدرة الداخلة', (g.ax + g.bx) / 2, ay, { s: 11.5, w: 900, c: '#fff' });
      Q33.T(ctx, 'P₂ = ' + Q37.fp(P2), (g.bx + g.ex) / 2 + 20, ay - W1 / 2 - 16, { s: 13, w: 900, c: '#15803d' }); if (W2 > 22) Q33.T(ctx, 'القدرة الخارجة', (g.bx + g.ex) / 2 + 20, ay - W1 / 2 + W2 / 2, { s: 11.5, w: 900, c: '#fff' });
      Q33.T(ctx, 'الخسائر ' + Q37.fp(Pl), g.bx + 70 + Wl / 2 + 80, ay + 150, { s: 12.5, w: 900, c: '#fff', bg: '#ea580c' }); Q33.T(ctx, 'حرارة', g.bx + 70 + Wl / 2 + 80, ay + 176, { s: 10.5, w: 900, c: '#c2410c' });
      // efficiency gauge
      Q43.gauge(ctx, g.x0 + 90, ay + 200, 52, (S.e - 50) / 50, 'η = ' + Q33.f(S.e, 1) + '%', '#0e7490'); Q33.T(ctx, '50%', g.x0 + 40, ay + 250, { s: 9.5, w: 800, c: '#64748b' }); Q33.T(ctx, '100%', g.x0 + 142, ay + 250, { s: 9.5, w: 800, c: '#64748b' });
      // handles
      const hy = ay - W1 / 2 + W2 + Wl; K.raw(ctx, () => { ctx.fillStyle = '#ea580c'; ctx.beginPath(); ctx.arc(g.bx + 4, hy, 9, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.arc(g.ax, ay - W1 / 2, 9, 0, TAU); ctx.fill(); ctx.stroke(); });
      if (S.ex) Q42.steps(ctx, S, { title: EX[S.m].t, q: EX[S.m].q, lines: EX[S.m].lines, k: S.k }, { y: 70, x: w - 12, wd: 300 });
      else Q37.card(ctx, S, [{ t: 'η = P₂ / P₁ × 100%', mono: 1, w: 900, c: '#0e7490', s: 14 }, { t: '= ' + Q33.f(P2, 1) + ' / ' + P1 + ' × 100%', mono: 1 }, { t: '= ' + Q33.f(S.e, 1) + '%', mono: 1, w: 900, c: '#0e7490' }, { t: 'P_lost = P₁ − P₂ = ' + Q37.fp(Pl), mono: 1, c: '#c2410c' }, { t: 'المحولة المثالية كفاءتها 100% وخسائرها صفر', c: '#334155', w: 800 }], { title: 'كفاءة المحولة', wd: 290, y: 70 });
      const C = D.chips(S, g); Q33.drawChips(ctx, C.m); C.e[1]._col = '#be185d'; Q33.drawChips(ctx, C.e); Q37.banner(ctx, w, 'اسحب طرف سهم الخسائر ومقبض القدرة الداخلة');
    },
    chips(S, g) { const set = S2 => { const e = EX[S2.m].set; Object.keys(e).forEach(k => setParam(S2, k, e[k])); };
      return { m: Q37.chips(S, 'm', [['e2', 'مثال 2 ص 143'], ['p2', 'المسألة 2 ص 146'], ['p3', 'المسألة 3 ص 146']], g.h - 128, S.m, (S2, k) => { S2.m = k; S2.ex = 0; S2.k = 0; set(S2); }, { bw: 200 }), e: Q43.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', set, 6) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), W1 = 60 + g.maxW * Math.sqrt(S.pp / 10000), t0 = g.ay - W1 / 2;
      return [{ id: 'loss', x: g.bx + 4, y: t0 + W1, r: 16, axis: 'y', keep: true, tip: 'اسحب لتغيير الخسائر', idle: 'اسحب طرف الخسائر ✋', drag: (S2, d) => { const yy = d.oy + d.y - d.sy, f = clamp((t0 + W1 - yy) / W1, 0, .5); setParam(S2, 'eta', Math.round(100 - f * 100)); S2.ex = 0; } },
        { id: 'p1', x: g.ax, y: t0, r: 16, axis: 'y', keep: true, hint: false, tip: 'اسحب للأعلى لزيادة القدرة الداخلة', down: S2 => { S2._p0 = S2.p.P1; }, drag: (S2, d) => { setParam(S2, 'P1', Math.round(clamp((S2._p0 || 220) * Math.exp(-(d.y - d.sy) / 40), 100, 10000) / 10) * 10); S2.ex = 0; } }].concat(C.m, C.e); },
    readings(S) { const P2 = S.p.P1 * S.p.eta / 100; return [rd('القدرة الداخلة P₁', Q37.fp(S.p.P1)), rd('القدرة الخارجة P₂', Q37.fp(P2)), rd('خسائر القدرة', Q37.fp(S.p.P1 - P2)), rd('الكفاءة η', S.p.eta + ' %')]; },
    explain(S) { const P2 = S.p.P1 * S.p.eta / 100; return Q26.ex('من كل ' + Q37.fp(S.p.P1) + ' تدخل المحولة يخرج ' + Q37.fp(P2) + ' فقط.', 'جزء من القدرة الداخلة يتحول إلى حرارة في الأسلاك والقلب الحديدي، لذا P₂ أقل من P₁ وتكون الكفاءة η = P₂ / P₁ × 100% أقل من 100%.', 'كفاءة المحولات الكبيرة عالية جداً قد تزيد على 95%.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — أسئلة الفصل السابع: س1 فقرة 6 (الأشكال الأربعة) والأسئلة س2–س9 (ص 144–146) =============== */
(() => {
  const F = [['a', 'V₁ = 220 V', 'V₂ = 40 V', 'down', 12, 5], ['b', 'N₁ = 20 turn', 'N₂ = 300 turn', 'up', 4, 14], ['c', 'V₁ = 180 V', 'V₂ = 12 V', 'down', 14, 3], ['d', 'N₁ = 1800 turn', 'N₂ = 250 turn', 'down', 14, 6]];
  const QA = [['س2', 'بماذا تختلف المحولة الرافعة عن الخافضة؟', ['الرافعة: لفات ملفها الثانوي أكثر من الابتدائي فتكون فولطيتها الخارجة أكبر والتيار أقل.', 'الخافضة: لفات ملفها الثانوي أقل من الابتدائي فتكون فولطيتها الخارجة أصغر والتيار أكبر.']],
    ['س3', 'ما أساس عمل المحولة الكهربائية؟', ['الحث المتبادل: التيار المتناوب في الملف الابتدائي يولد مجالاً مغناطيسياً متغيراً في القلب الحديدي.', 'تغير خطوط المجال خلال الملف الثانوي يولد فيه تياراً محتثاً.']],
    ['س4', 'كيف تغير المحولة مقدار الفولطية؟', ['فولطية كل ملف تتناسب مع عدد لفاته: V₂ / V₁ = N₂ / N₁.', 'فإذا كانت لفات الثانوي أكثر ارتفعت الفولطية، وإذا كانت أقل انخفضت.']],
    ['س5', 'في أي المجالات تستعمل المحولة؟', ['الرافعة: محطات توليد الطاقة عند الإرسال إلى المدن، وجهاز التلفاز.', 'الخافضة: المنازل ومناطق استلام القدرة في المدن وجهاز اللحام وشاحنة الموبايل والمذياع والمسجل.']],
    ['س6', 'الفائدة الاقتصادية من النقل بفولطية عالية؟', ['عند الفولطية العالية يكون التيار واطئاً للقدرة نفسها.', 'فتقل الطاقة الضائعة حرارةً في الأسلاك الطويلة ذات المقاومة الكبيرة وتقل الكلفة.']],
    ['س7', 'لماذا تحتاج المحولة إلى تيار متناوب؟', ['التيار المتناوب يغير مقداره واتجاهه باستمرار فيولد مجالاً مغناطيسياً متغيراً.', 'وهذا التغير هو الذي يولد التيار المحتث في الملف الثانوي.']],
    ['س8', 'هل تعمل المحولة على بطارية؟', ['لا تعمل: تيار البطارية مستمر ثابت فيولد مجالاً ثابتاً.', 'فلا يتولد تيار محتث في الملف الثانوي إلا لحظة الغلق أو الفتح.']],
    ['س9', 'نوع المحولة في خطوط نقل القدرة إلى المصنع؟', ['في بداية الخطوط عند محطة الإرسال: محولة رافعة.', 'في نهاية الخطوط قبل دخولها المصنع: محولة خافضة.']]];
  const D = { id: 'g9_tr_review', page: 144, fig: 'أسئلة الفصل ص 144–146',
    desc: 'أسئلة الفصل السابع: س1 فقرة 6 الشكل يبين أربعة أنواع من المحولات (a: V₁ = 220 V و V₂ = 40 V، b: N₁ = 20 turn و N₂ = 300 turn، c: V₁ = 180 V و V₂ = 12 V، d: N₁ = 1800 turn و N₂ = 250 turn)؛ بيّن أيها رافعة. والأسئلة من س2 إلى س9 عن الفرق بين الرافعة والخافضة، وأساس عمل المحولة، وكيف تغير الفولطية، ومجالات استعمالها، والفائدة الاقتصادية من النقل بفولطية عالية، وحاجتها إلى التيار المتناوب، وعملها مع البطارية، ونوع المحولات في خطوط نقل القدرة.',
    tags: 'أسئلة الفصل السابع س1 فقرة 6 أربع محولات أي منها رافعة س2 س3 س4 س5 س6 س7 س8 س9 مراجعة',
    tools: ['أربع محولات', 'بطاقات الأسئلة'],
    steps: ['اختر «س1 فقرة 6» واضغط على كل محولة لتصنيفها: رافعة أو خافضة، ثم «تحقق».', 'اختر «أسئلة س2–س9» واضغط على أي سؤال لترى جوابه.'],
    concl: ['س1 فقرة 6: المحولة b فقط رافعة لأن N₂ أكبر من N₁.', 'المحولة تعمل بالحث المتبادل وتحتاج إلى تيار متناوب.', 'ننقل القدرة بفولطية عالية وتيار واطئ لتقليل الخسارة.'],
    laws: ['g9_l7_ratio'],
    controls: [],
    setup(S) { S.md = 'q6'; S.ans = ['', '', '', '']; S.ak = ''; S.chk = 0; S.qi = 0; S.ph = 0; S.op = 1; },
    geo(S) { const w = S.W, h = S.H, L = Q33.L(S), x0 = L + 24, x1 = w - 340; return { w, h, L, x0, x1, cw: (x1 - x0 - 20) / 2, chh: 220, y0: 70 }; },
    update(S, dt) { S.ph += dt * TAU * .8; S.op = Q37.ez(S.op, 1, dt, 6); },
    cell(g, i) { return { x: g.x0 + (i % 2) * (g.cw + 20), y: g.y0 + Math.floor(i / 2) * (g.chh + 16) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q37.bg(ctx, w, h);
      if (S.md === 'q6') {
        F.forEach((f, i) => { const c = D.cell(g, i), a = S.ans[i], ok = S.chk && a === f[3], bad = S.chk && a !== f[3];
          K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.strokeStyle = ok ? '#15803d' : bad ? '#b91c1c' : '#94a3b8'; ctx.lineWidth = ok || bad ? 3 : 1.5; rr(ctx, c.x, c.y, g.cw, g.chh, 12); ctx.fill(); ctx.stroke(); });
          Q33.T(ctx, f[0], c.x + g.cw / 2, c.y + 16, { s: 17, w: 900, c: '#0f172a' });
          const tx = c.x + g.cw / 2 - 55; Q37.xf(ctx, { x: tx, y: c.y + 36, w: 110, h: 100, t: 22, n1v: f[4], n2v: f[5], B: Math.sin(S.ph) * .5, fn: 6 });
          Q33.T(ctx, f[1], c.x + g.cw / 2 - 48, c.y + 156, { s: 11, w: 900, c: '#b91c1c' }); Q33.T(ctx, f[2], c.x + g.cw / 2 + 48, c.y + 156, { s: 11, w: 900, c: '#1d4ed8' });
          Q33.T(ctx, a ? (a === 'up' ? 'رافعة' : 'خافضة') : 'اضغط لتصنيفها', c.x + g.cw / 2, c.y + 190, { s: 12.5, w: 900, c: '#fff', bg: a ? (a === 'up' ? '#15803d' : '#b45309') : '#64748b' }); });
        const all = S.chk && F.every((f, i) => S.ans[i] === f[3]);
        Q37.card(ctx, S, [{ t: 'الشكل يبين أربعة أنواع من المحولات. طبقاً للمعلومات أسفل كل شكل، بيّن أيها رافعة؟', c: '#0f172a', w: 800 }, { t: 'الرافعة: V₂ أكبر من V₁ أو N₂ أكبر من N₁', c: '#15803d', w: 800 }, { t: 'الخافضة: V₂ أصغر من V₁ أو N₂ أصغر من N₁', c: '#b45309', w: 800 }].concat(S.chk ? [{ t: all ? 'أحسنت! المحولة b فقط رافعة' : 'راجع الإطارات الحمراء', c: all ? '#15803d' : '#b91c1c', w: 900, s: 13.5 }] : []), { title: 'س1 فقرة 6 ص 145', wd: 310, y: 70 });
      } else {
        QA.forEach((q, i) => { const y = g.y0 + i * 54, on = S.qi === i; K.raw(ctx, () => { ctx.fillStyle = on ? '#cffafe' : 'rgba(255,255,255,.9)'; ctx.strokeStyle = on ? '#0891b2' : '#cbd5e1'; ctx.lineWidth = on ? 2.5 : 1.2; rr(ctx, g.x0, y, g.x1 - g.x0, 46, 10); ctx.fill(); ctx.stroke(); });
          Q33.T(ctx, q[0], g.x1 - 26, y + 23, { s: 13, w: 900, c: '#fff', bg: '#0e7490' }); Q33.T(ctx, q[1], g.x1 - 54, y + 23, { s: 12, w: 800, c: '#0f172a', a: 'right' }); });
        const q = QA[S.qi]; K.raw(ctx, () => { ctx.globalAlpha = S.op; }); Q37.card(ctx, S, [{ t: q[1], c: '#0f172a', w: 900 }].concat(q[2].map((t, j) => ({ t, c: j ? '#b45309' : '#15803d', w: 800 }))), { title: q[0] + ': الجواب', wd: 310, y: 70 }); K.raw(ctx, () => { ctx.globalAlpha = 1; });
      }
      Q33.drawChips(ctx, D.chips(S, g)); Q37.banner(ctx, w, S.md === 'q6' ? 'اضغط على كل محولة لتصنيفها ثم تحقق' : 'اضغط على أي سؤال لترى جوابه');
    },
    chips(S, g) { const L = [['q6', 'أي المحولات رافعة؟'], ['qa', 'الأسئلة س2–س9']]; if (S.md === 'q6') L.push(['chk', '✔ تحقق'], ['rs', '↺ من جديد']); return Q37.chips(S, 'md', L, g.h - 84, S.md, (S2, k) => { if (k === 'chk') S2.chk = 1; else if (k === 'rs') { S2.ans = ['', '', '', '']; S2.ak = ''; S2.chk = 0; } else S2.md = k; }, { bw: 190 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      if (S.md === 'q6') F.forEach((f, i) => { const c = D.cell(g, i); L.push({ id: 'f' + f[0], x: c.x + g.cw / 2, y: c.y + g.chh / 2, w: g.cw, h: g.chh, tip: 'اضغط لتصنيف المحولة', idle: i ? undefined : 'اضغط على المحولة ✋', hint: i ? false : undefined, click: S2 => { const A = S2.ans.slice(), O = ['up', 'down']; A[i] = A[i] ? O[(O.indexOf(A[i]) + 1) % 2] : 'up'; S2.ans = A; S2.ak = A.join(','); S2.chk = 0; } }); });
      else QA.forEach((q, i) => L.push({ id: 'qa' + i, x: (g.x0 + g.x1) / 2, y: g.y0 + i * 54 + 23, w: g.x1 - g.x0, h: 46, tip: 'اضغط لعرض الجواب', idle: i ? undefined : 'اضغط على سؤال ✋', hint: i ? false : undefined, click: S2 => { S2.qi = i; S2.op = .2; } }));
      return L.concat(D.chips(S, g)); },
    readings(S) { return S.md === 'q6' ? F.map((f, i) => rd('المحولة ' + f[0], S.ans[i] ? (S.ans[i] === 'up' ? 'رافعة' : 'خافضة') : '—')) : [rd('السؤال', QA[S.qi][0])]; },
    explain(S) { if (S.md === 'q6') return Q26.ex('المحولة b وحدها رافعة.', 'في a و c الفولطية الخارجة V₂ أصغر من الداخلة V₁ فهما خافضتان؛ وفي d عدد لفات الثانوي 250 أقل من الابتدائي 1800 فهي خافضة؛ أما b فلفات ثانويها 300 أكثر من ابتدائيها 20 فهي رافعة.', ''); const q = QA[S.qi]; return Q26.ex(q[0] + ': ' + q[1], q[2].join(' '), ''); }
  };
  M8.P[D.id] = D;
})();

/* عناصر الضغط فقط (بلا سحب) لا تُظهر أسهم السحب، وشرح التجربة يمر عبر Q31.bidi */
Object.keys(M8.P).filter(k => /^g9_tr_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g9_tr_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* =============== تجارب الفصل السابع (المحولة الكهربائية) =============== */
const M97 = M => M8.merge(Object.assign({ ch: 37, reg: X9 }, M));
M97({ id: 'g9_c7_induce', sec: '1-7 التيار المحتث', page: 135, kind: 'نشاط', fig: 'الشكل 2',
  title: 'التيار المحتث: توليد تيار محتث في ملف بالحث المتبادل',
  desc: 'ننفذ نشاط الكتاب: ملف أسطواني فيه ساق حديد مطاوع مع مصدر متناوب ومفتاح، وملف حلقي مع مصباح؛ ثم نقارن غلق المفتاح وفتحه مع البطارية والمصدر المتناوب ونراقب الكلفانوميتر.',
  tags: 'التيار المحتث الحث المتبادل الملف الابتدائي الملف الثانوي ساق حديد مطاوع غلق المفتاح فتح المفتاح تيار مستمر متناوب',
  fact: ['يتولد التيار المحتث من تغير خطوط المجال المغناطيسي خلال الموصل في وحدة الزمن (ص 135).', 'الملف المربوط مع المصدر يدعى الملف الابتدائي، والمربوط مع المصباح يدعى الملف الثانوي (ص 136).', 'هل تعلم؟ شاحن الموبايل اللاسلكي يعمل بالحث المتبادل بين ملفين مثل نشاط الكتاب.'],
  quiz: [
    { q: 'التيار المتناوب المنساب في الملف الثانوي لمحولة هو تيار محتث يتولد بوساطة:', o: ['مجال مغناطيسي متغير خلال قلب الحديد', 'مجال كهربائي متغير', 'قلب حديد المحولة', 'حركة الملف'], a: 0, why: 'س1 فقرة 1 ص 144: تغير خطوط المجال المغناطيسي خلال الملف الثانوي يولد التيار المحتث.' },
    { q: 'عند بقاء مفتاح دائرة البطارية مغلقاً فإن مؤشر الكلفانوميتر في دائرة الملف الثانوي:', o: ['يبقى على الصفر', 'يبقى منحرفاً', 'يتذبذب باستمرار'], a: 0, why: 'التيار ثابت فالمجال ثابت ولا يتولد تيار محتث.' },
    { q: 'لماذا تحتاج المحولة الكهربائية إلى تيار متناوب؟', o: ['لأنه يولد مجالاً مغناطيسياً متغيراً باستمرار', 'لأنه أقوى من التيار المستمر', 'لأن القلب الحديدي يحتاجه'], a: 0, why: 'س7 ص 145.' }
  ],
  parts: [{ id: 'g9_tr_mutual', n: 'نشاط: توليد تيار محتث في ملف' }, { id: 'g9_tr_switch', n: 'غلق المفتاح وفتحه: مستمر أم متناوب' }] });
M97({ id: 'g9_c7_trans', sec: '2-7 المحولة الكهربائية وأنواعها', page: 136, kind: 'نشاط', fig: 'الأشكال 1 و 3–7',
  title: 'المحولة الكهربائية: أجزاؤها ونسبة التحويل والمحولة الرافعة والخافضة',
  desc: 'نتعرف على أجزاء المحولة ونرى المجال المتغير في القلب الحديدي، ثم نغير عدد لفات الملفين ونتحقق من V₂/V₁ = N₂/N₁ ونحل مثال 1، ونقارن المحولة الخافضة بالرافعة واستعمالاتهما.',
  tags: 'المحولة الكهربائية أجزاء المحولة نسبة التحويل محولة رافعة محولة خافضة مثال 1 استعمالات المحولات',
  fact: ['المحولة تتألف من ملفين من أسلاك نحاسية معزولة ملفوفة حول قلب مغلق من الحديد المطاوع (ص 136).', 'تدعى النسبة N₂/N₁ نسبة التحويل أو نسبة عدد اللفات (ص 138).', 'تذكّر: المحولة الرافعة للفولطية خافضة للتيار، والخافضة للفولطية رافعة للتيار (ص 141).'],
  quiz: [
    { q: 'محولة عدد لفات ثانويها 300 turn وابتدائيها 6000 turn، والفولطية على ابتدائيها 240 V. الفولطية الخارجة من ثانويها:', o: ['12 V', '24 V', '4800 V', '80 V'], a: 0, why: 'س1 فقرة 4 ص 144: V₂ = 240 × 300 / 6000 = 12 V.' },
    { q: 'النسبة بين فولطية الملف الثانوي وفولطية الملف الابتدائي لا تعتمد على:', o: ['مقاومة أسلاك الملفين', 'نسبة عدد اللفات في الملفين', 'الفولطية الخارجة من الملف الثانوي'], a: 0, why: 'س1 فقرة 2 ص 144: V₂/V₁ = N₂/N₁.' },
    { q: 'محولة ابتدائيها على 240 V وحملها يعمل على 12 V ولفات ابتدائيها 500 turn. لفات ثانويها:', o: ['25 turn', '10000 turn', '250 turn'], a: 0, why: 'مثال 1 ص 143: N₂ = 500 × 12 / 240.' },
    { q: 'أي المحولات الآتية رافعة؟', o: ['N₁ = 20 turn و N₂ = 300 turn', 'V₁ = 220 V و V₂ = 40 V', 'V₁ = 180 V و V₂ = 12 V', 'N₁ = 1800 turn و N₂ = 250 turn'], a: 0, why: 'س1 فقرة 6 ص 145: لفات الثانوي أكثر من الابتدائي.' },
    { q: 'المحولة المستعملة في شاحنة الموبايل:', o: ['خافضة', 'رافعة', 'نسبة تحويلها 1'], a: 0, why: 'الشكل 5-c ص 139.' }
  ],
  parts: [{ id: 'g9_tr_build', n: 'أجزاء المحولة الكهربائية' }, { id: 'g9_tr_ratio', n: 'نسبة التحويل + مثال 1' }, { id: 'g9_tr_types', n: 'المحولة الخافضة والرافعة' }] });
M97({ id: 'g9_c7_ideal', sec: '2-7 المحولة المثالية ونقل القدرة', page: 140, kind: 'مثال', fig: 'ص 137 و 140–141',
  title: 'المحولة المثالية I₁V₁ = I₂V₂ ونقل القدرة بفولطية عالية',
  desc: 'نغير الحمل ونرى أن القدرة الداخلة تساوي القدرة الخارجة في المحولة المثالية ونحل أسئلة الكتاب ومسائله خطوة خطوة، ثم ننقل القدرة من محطة التوليد إلى المصنع ونقارن الخسارة عند فولطيات نقل مختلفة.',
  tags: 'المحولة المثالية حفظ الطاقة I1V1 = I2V2 نقل القدرة فولطية عالية تيار واطئ محولة رافعة محولة خافضة',
  fact: ['على فرض إهمال خسائر القدرة تدعى المحولة مثالية: P₂ = P₁ (ص 140).', 'تنقل الطاقة الكهربائية إلى مسافات بعيدة بفولطية عالية وتيار واطئ لتقليل الخسارة (ص 138).', 'هل تعلم؟ خطوط النقل في العراق تعمل بفولطيات تصل إلى 400 kV.'],
  quiz: [
    { q: 'محولة مثالية لفات ابتدائيها 800 turn وثانويها 200 turn والتيار في ثانويها 40 A. التيار في ابتدائيها:', o: ['10 A', '80 A', '160 A', '8000 A'], a: 0, why: 'س1 فقرة 3 ص 144: I₁ = 40 × 200 / 800.' },
    { q: 'محولة مثالية لفاتها 600 و 1800 turn والقدرة الداخلة 720 W بفولطية 240 V. تيار ثانويها:', o: ['1 A', '3 A', '0.1 A', '0.3 A'], a: 0, why: 'س1 فقرة 5 ص 145: V₂ = 720 V و I₂ = 720 / 720.' },
    { q: 'المحولة الرافعة للفولطية تكون في الوقت نفسه:', o: ['خافضة للتيار', 'رافعة للتيار', 'لا تغير التيار'], a: 0, why: 'ص 141: الفولطية تتناسب عكسياً مع التيار.' },
    { q: 'نوع المحولة في بداية خطوط نقل القدرة عند محطة الإرسال:', o: ['رافعة', 'خافضة', 'لا توجد محولة'], a: 0, why: 'س9 ص 146.' }
  ],
  parts: [{ id: 'g9_tr_ideal', n: 'المحولة المثالية + الأسئلة والمسائل' }, { id: 'g9_tr_grid', n: 'نقل القدرة إلى مسافات بعيدة' }] });
M97({ id: 'g9_c7_loss', sec: '3-7 خسائر القدرة في المحولة الكهربائية', page: 142, kind: 'مثال', fig: 'الشكلان 8 و 9 + مثال 2',
  title: 'خسائر القدرة في المحولة وكفاءتها η = P₂/P₁ × 100%',
  desc: 'نقارن أسلاك النحاس بغيرها والقلب المصمت بالقلب المصنوع من صفائح رقيقة معزولة ونرى التيارات الدوامة، ثم نحسب الكفاءة بمخطط سريان القدرة ونحل مثال 2 والمسألتين 2 و 3.',
  tags: 'خسائر القدرة مقاومة الأسلاك التيارات الدوامة صفائح معزولة النحاس كفاءة المحولة مثال 2',
  fact: ['جميع المحولات يحصل فيها ضياع قدرة فتكون القدرة الخارجة أقل من الداخلة (ص 138).', 'تصنع أسلاك الملفين من النحاس لأن مقاومته صغيرة (ص 142).', 'يصنع القلب من صفائح رقيقة معزولة مكبوسة مستواها موازٍ للمجال لتقليل التيارات الدوامة (ص 142).'],
  quiz: [
    { q: 'القدرة الداخلة لمحولة 220 W وخسائرها 11 W. كفاءتها:', o: ['95%', '5%', '105%', '90%'], a: 0, why: 'مثال 2 ص 143: P₂ = 209 W و η = 209 / 220 × 100%.' },
    { q: 'محولة كفاءتها 80% والقدرة الخارجة منها 4.8 kW. القدرة الداخلة:', o: ['6 kW', '3.84 kW', '5.6 kW'], a: 0, why: 'المسألة 2 ص 146.' },
    { q: 'لتقليل خسارة التيارات الدوامة يصنع قلب المحولة من:', o: ['صفائح رقيقة معزولة من الحديد المطاوع', 'قطعة حديد مصمتة', 'النحاس'], a: 0, why: 'الشكل 9 ص 142.' },
    { q: 'تصنع أسلاك ملفي المحولة من النحاس:', o: ['لأن مقاومته صغيرة فتقل الخسارة الحرارية', 'لأنه مادة مغناطيسية', 'لزيادة التيارات الدوامة'], a: 0, why: 'الشكل 8 ص 142.' }
  ],
  parts: [{ id: 'g9_tr_losses', n: 'خسائر القدرة: الأسلاك والتيارات الدوامة' }, { id: 'g9_tr_eff', n: 'كفاءة المحولة + مثال 2 والمسائل' }] });
M97({ id: 'g9_c7_review', sec: 'أسئلة الفصل السابع', page: 144, kind: 'مثال', fig: 'ص 144–146',
  title: 'أسئلة الفصل السابع: أي المحولات رافعة؟ وأسئلة س2–س9',
  desc: 'نصنف المحولات الأربع في س1 فقرة 6 ونتحقق، ونستعرض أجوبة الأسئلة من س2 إلى س9.',
  tags: 'أسئلة الفصل السابع المحولة الكهربائية مراجعة',
  fact: ['المحولة الرافعة: N₂ أكبر من N₁ ، والخافضة: N₂ أصغر من N₁.', 'المحولة لا تعمل على التيار المستمر (س8).'],
  quiz: [
    { q: 'هل تعمل المحولة الكهربائية لو وضعت بطارية بين طرفي ملفها الابتدائي؟', o: ['لا، لأن مجال التيار المستمر ثابت لا يتغير', 'نعم وبكفاءة أكبر', 'نعم إذا كان القلب من الحديد'], a: 0, why: 'س8 ص 145.' },
    { q: 'أساس عمل المحولة الكهربائية:', o: ['الحث المتبادل بين ملفيها', 'التأثير الحراري للتيار', 'التجاذب بين الشحنات'], a: 0, why: 'س3 ص 145.' },
    { q: 'الفائدة من نقل القدرة بفولطية عالية وتيار واطئ:', o: ['تقليل الخسارة في أسلاك النقل', 'زيادة التيار في الأسلاك', 'زيادة مقاومة الأسلاك'], a: 0, why: 'س6 ص 145.' }
  ],
  parts: [{ id: 'g9_tr_review', n: 'س1 فقرة 6 والأسئلة س2–س9' }] });
