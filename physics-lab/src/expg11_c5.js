'use strict';
/* ====================== الخامس العلمي — الفصل الخامس: الشغل والقدرة والطاقة والزخم (ch 55, ص 93–118) ======================
   Merged experiments (book order): g11_c5_work (5-1، 5-2) · g11_c5_power (5-3) · g11_c5_energy (5-4)
   · g11_c5_cons (5-5 … 5-7) · g11_c5_mom (5-8، 5-9) · g11_c5_review (أسئلة ومسائل ص 116–118).
   Local kit Q55 = Q42 + floors, crates, people, energy bars, pulleys, horizontal springs, dimension lines. */
const Q55 = Object.assign(Object.create(Q42), {
  G: 10,
  ez(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  f(v, d = 1) { return Q52.f(v, d); },
  /* left-to-right isolate for signed numbers inside Arabic lines */
  lr(s) { return '\u2066' + s + '\u2069'; },
  d2r(d) { return d * Math.PI / 180; },
  /* number with thin grouping: 600000 → 600 000 */
  n(v, d = 0) { const s = Math.abs(v).toFixed(d), p = s.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return (v < -1e-9 ? '−' : '') + p.join('.'); },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f0fdf4'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  /* wooden floor strip with top edge at y */
  floor(ctx, x0, x1, y, o = {}) {
    K.raw(ctx, () => { const hh = o.h || 18, g = ctx.createLinearGradient(0, y, 0, y + hh); g.addColorStop(0, o.c0 || '#d6a46b'); g.addColorStop(1, o.c1 || '#92400e'); ctx.fillStyle = g; ctx.fillRect(x0, y, x1 - x0, hh);
      ctx.strokeStyle = 'rgba(120,53,15,.35)'; ctx.lineWidth = 1; for (let x = x0 + 30; x < x1; x += 60) { ctx.beginPath(); ctx.moveTo(x, y + 2); ctx.lineTo(x, y + hh); ctx.stroke(); }
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x0, y, x1 - x0, 2); });
  },
  /* rough patch drawn on top of a floor */
  rough(ctx, x0, x1, y) { K.raw(ctx, () => { ctx.fillStyle = '#78716c'; ctx.fillRect(x0, y - 3, x1 - x0, 5); ctx.fillStyle = '#44403c'; for (let x = x0 + 2; x < x1; x += 5) { ctx.beginPath(); ctx.arc(x, y - 3, 1.4 + ((x * 7) % 3) * .4, 0, TAU); ctx.fill(); } }); },
  /* wooden crate: (x, y) = bottom-left */
  crate(ctx, x, y, w, h, lab) {
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const g = ctx.createLinearGradient(x, y - h, x + w, y); g.addColorStop(0, '#fcd34d'); g.addColorStop(.5, '#d97706'); g.addColorStop(1, '#92400e'); ctx.fillStyle = g; ctx.fillRect(x, y - h, w, h); ctx.restore();
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3; ctx.strokeRect(x + 1.5, y - h + 1.5, w - 3, h - 3); ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(x + 4, y - h + 4); ctx.lineTo(x + w - 4, y - 4); ctx.moveTo(x + w - 4, y - h + 4); ctx.lineTo(x + 4, y - 4); ctx.stroke();
      ctx.strokeStyle = 'rgba(120,53,15,.4)'; ctx.lineWidth = 1; for (let k = 1; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x + 3, y - h + h * k / 3); ctx.lineTo(x + w - 3, y - h + h * k / 3); ctx.stroke(); } });
    if (lab) Q42.T(ctx, lab, x + w / 2, y - h / 2, { s: 11, w: 900, c: '#fff', bg: 'rgba(120,53,15,.85)' });
  },
  /* polished metal block (x,y = bottom-left) */
  block(ctx, x, y, w, h, col = '#64748b', lab) {
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 7; ctx.shadowOffsetY = 3; const g = ctx.createLinearGradient(x, y - h, x, y); g.addColorStop(0, shade(col, 45)); g.addColorStop(.45, col); g.addColorStop(1, shade(col, -40)); ctx.fillStyle = g; rr(ctx, x, y - h, w, h, 4); ctx.fill(); ctx.restore(); ctx.strokeStyle = 'rgba(15,23,42,.45)'; ctx.lineWidth = 1; rr(ctx, x, y - h, w, h, 4); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x + 4, y - h + 3, w - 8, 3); });
    if (lab) Q42.T(ctx, lab, x + w / 2, y - h / 2, { s: 11, w: 900, c: '#fff' });
  },
  /* person standing with feet centred at fx on ground gy; hands at o.hands = [[x,y],[x,y]] ; H body height */
  man(ctx, fx, gy, o = {}) {
    const H = o.H || 120, dir = o.dir || 1, lean = (o.lean || 0) * dir, ph = o.ph || 0;
    const hip = [fx + lean * .3, gy - H * .48], sh = [fx + lean, gy - H * .8], hd = [fx + lean * 1.15, gy - H * .92];
    const hands = o.hands || [[sh[0] + 20 * dir, sh[1] + 34], [sh[0] + 14 * dir, sh[1] + 36]];
    K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.fillStyle = 'rgba(15,23,42,.18)'; ctx.beginPath(); ctx.ellipse(fx, gy + 2, 22, 4, 0, 0, TAU); ctx.fill();
      const leg = (s, c) => { const sw = Math.sin(ph) * s * 12, kx = hip[0] + sw * .5 + (o.bend || 0) * dir, ky = gy - H * .24, ft = [fx + sw - (o.brace || 0) * dir * (s > 0 ? 1 : .2), gy]; ctx.strokeStyle = c; ctx.lineWidth = H * .075; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(kx, ky); ctx.lineTo(ft[0], ft[1] - 3); ctx.stroke(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.ellipse(ft[0] + 5 * dir, ft[1] - 3, 8, 3.6, 0, 0, TAU); ctx.fill(); };
      const arm = (hn, c) => { const mx = (sh[0] + hn[0]) / 2, my = (sh[1] + hn[1]) / 2, dx = hn[0] - sh[0], dy = hn[1] - sh[1], L = Math.hypot(dx, dy) || 1, up = Math.max(0, H * .5 - L) * .5, ex = mx + (-dy / L) * up * dir * -1, ey = my + (dx / L) * up * dir * -1 + up * .3; ctx.strokeStyle = c; ctx.lineWidth = H * .06; ctx.beginPath(); ctx.moveTo(sh[0], sh[1]); ctx.lineTo(ex, ey); ctx.lineTo(hn[0], hn[1]); ctx.stroke(); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(hn[0], hn[1], H * .04, 0, TAU); ctx.fill(); };
      leg(-1, '#1e3a8a'); arm(hands[1], shade(o.col || '#0ea5e9', -30));
      const g = ctx.createLinearGradient(sh[0] - 12, 0, sh[0] + 12, 0); g.addColorStop(0, shade(o.col || '#0ea5e9', -20)); g.addColorStop(1, shade(o.col || '#0ea5e9', 25)); ctx.strokeStyle = g; ctx.lineWidth = H * .17; ctx.beginPath(); ctx.moveTo(hip[0], hip[1] - 4); ctx.lineTo(sh[0], sh[1] + 6); ctx.stroke();
      leg(1, '#1e40af'); arm(hands[0], o.col || '#0ea5e9');
      ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(hd[0], hd[1], H * .075, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(hd[0] - 1 * dir, hd[1] - H * .02, H * .072, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
      if (o.sweat) { ctx.fillStyle = '#38bdf8'; [[-1, 0], [1, .5]].forEach(q => { const yy = hd[1] - 4 + ((o.sweat * 30 + q[1] * 15) % 22); ctx.beginPath(); ctx.arc(hd[0] + q[0] * H * .1, yy, 2.3, 0, TAU); ctx.fill(); }); }
      ctx.restore(); });
    return { sh, hd, hip };
  },
  /* vertical energy bar chart: items [[label, value, colour]], base at y + h, max value vm (values may be negative if o.neg) */
  bars(ctx, x, y, h, items, vm, o = {}) {
    const bw = o.bw || 38, gap = o.gap || 16, W = items.length * (bw + gap) - gap, zy = o.neg ? y + h / 2 : y + h, sc = (o.neg ? h / 2 : h) / (vm || 1);
    K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; rr(ctx, x - 12, y - (o.title ? 30 : 12), W + 24, h + (o.title ? 30 : 12) + 34, 10); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x - 6, zy); ctx.lineTo(x + W + 6, zy); ctx.stroke();
      items.forEach((it, i) => { const bx = x + i * (bw + gap), v = clamp(it[1], o.neg ? -vm * 1.02 : 0, vm * 1.02), bh = v * sc; const g = ctx.createLinearGradient(bx, 0, bx + bw, 0); g.addColorStop(0, shade(it[2], 30)); g.addColorStop(.5, it[2]); g.addColorStop(1, shade(it[2], -30)); ctx.fillStyle = g; if (Math.abs(bh) > .5) { rr(ctx, bx, bh > 0 ? zy - bh : zy, bw, Math.abs(bh), 3); ctx.fill(); } }); });
    if (o.title) Q42.T(ctx, o.title, x + W / 2, y - 16, { s: 11, w: 900, c: '#0f172a' });
    items.forEach((it, i) => { const bx = x + i * (bw + gap) + bw / 2, v = it[1], bh = clamp(v, o.neg ? -vm : 0, vm) * sc; Q42.T(ctx, it[0], bx, y + h + 14, { s: 10.5, w: 900, c: shade(it[2], -25) }); Q42.T(ctx, Q55.lr(it[3] != null ? it[3] : Q55.n(v)), bx, bh >= 0 ? zy - bh - 9 : zy - bh + 9, { s: 9, w: 800, c: '#0f172a', bg: 'rgba(255,255,255,.8)' }); });
    return W;
  },
  /* dimension line with end ticks, label in the middle */
  dim(ctx, x0, y0, x1, y1, lab, col = '#7c3aed', o = {}) {
    K.raw(ctx, () => { ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.4; ctx.setLineDash(o.dash || []); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.setLineDash([]);
      const a = Math.atan2(y1 - y0, x1 - x0); [[x0, y0, a + Math.PI], [x1, y1, a]].forEach(q => { ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(q[0] - 8 * Math.cos(q[2] - .4), q[1] - 8 * Math.sin(q[2] - .4)); ctx.lineTo(q[0] - 8 * Math.cos(q[2] + .4), q[1] - 8 * Math.sin(q[2] + .4)); ctx.fill(); }); });
    if (lab) Q42.T(ctx, lab, (x0 + x1) / 2 + (o.dx || 0), (y0 + y1) / 2 + (o.dy || 0), { s: o.s || 11, w: 900, c: '#fff', bg: col });
  },
  /* pulley wheel */
  pulley(ctx, x, y, r = 14) { K.raw(ctx, () => { const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 1, x, y, r); g.addColorStop(0, '#f1f5f9'); g.addColorStop(1, '#64748b'); ctx.fillStyle = g; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(x, y, 3, 0, TAU); ctx.fill(); }); },
  /* horizontal coil spring from x0 to x1 at height y */
  hspring(ctx, x0, x1, y, o = {}) {
    const n = o.n || 12, r = o.r || 13, lead = 8;
    K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; const a = x0 + lead, b = x1 - lead, L = b - a;
      ctx.strokeStyle = o.col || '#475569'; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(a, y); ctx.moveTo(b, y); ctx.lineTo(x1, y); ctx.stroke();
      for (let pass = 0; pass < 2; pass++) { ctx.strokeStyle = pass ? '#e2e8f0' : (o.col || '#475569'); ctx.lineWidth = pass ? 1.1 : 2.6; ctx.beginPath();
        for (let i = 0; i <= n * 24; i++) { const t = i / (n * 24), ph = t * n * TAU, xx = a + t * L + Math.cos(ph) * Math.min(3, L / n * .25), yy = y + Math.sin(ph) * r; i ? ctx.lineTo(xx - (pass ? .7 : 0), yy - (pass ? .7 : 0)) : ctx.moveTo(xx, yy); } ctx.stroke(); }
      ctx.restore(); });
  },
  /* hatched wall (vertical) */
  wall(ctx, x, y0, y1, side = -1) { K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; ctx.fillRect(side < 0 ? x - 16 : x, y0, 16, y1 - y0); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.2; for (let y = y0; y < y1; y += 10) { ctx.beginPath(); ctx.moveTo(side < 0 ? x - 16 : x + 16, y + 10); ctx.lineTo(side < 0 ? x : x, y); ctx.stroke(); } ctx.strokeStyle = '#334155'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); }); },
  arrow(ctx, x, y, dx, dy, col = '#dc2626', lab, w = 3) { K.force(ctx, x, y, dx, dy, lab || '', col, w); },
  /* little flag marker at x on ground y */
  mark(ctx, x, y, lab, col = '#be185d') { K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + 6); ctx.lineTo(x, y + 22); ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y + 6, 3, 0, TAU); ctx.fill(); }); Q42.T(ctx, lab, x, y + 33, { s: 12, w: 900, c: col }); },
  card(ctx, S, L, o) { return Q42.card(ctx, S, L, Object.assign({ bd: '#16a34a', y: 70, wd: 320 }, o || {})); },
  steps(ctx, S, st, o) { return Q42.steps(ctx, S, st, Object.assign({ y: 70, x: S.W - 12, wd: 330 }, o || {})); },
  stepChips(S, id, y, x0, lab, onEx, n = 9) { return Q43.stepChips(S, id, y, x0, lab, onEx, n); },
  play(S, id, y, run, onGo, onRe, o = {}) { return Q52.play(S, id, y, run, onGo, onRe, o); },
  /* graph frame (signed ranges) — same as Q52.axes */
  axes(ctx, A) { return Q52.axes(ctx, A); }
});

LW({ id: 'g11_l5_work', cat: 55, name: 'الشغل', fx: '<i>W</i> = <i>F x</i> cos<i>θ</i>', sym: 'الشغل كمية قياسية تساوي حاصل ضرب مركبة القوة باتجاه الإزاحة في مقدار الإزاحة، ووحدته الجول J = N.m. يكون موجباً عندما 0 ≤ θ < 90° ، وصفراً عندما θ = 90° أو عندما لا تحدث إزاحة، وسالباً عندما 90° < θ ≤ 180°', calc: { in: [['F', 'القوة F', 'N', 50], ['x', 'الإزاحة x', 'm', 3], ['th', 'الزاوية θ', '°', 30]], out: 'الشغل W', u: 'J', f: v => v.F * v.x * Math.cos(v.th * Math.PI / 180) } });
LW({ id: 'g11_l5_area', cat: 55, name: 'الشغل من مخطط القوة − الإزاحة', fx: '<i>W</i> = المساحة تحت منحني <i>F</i> − <i>x</i>', sym: 'عند تمثيل مركبة القوة باتجاه الإزاحة بيانياً مع الإزاحة، فالمساحة المحصورة تحت الخط تساوي الشغل المنجز. للقوة الثابتة تكون المساحة مستطيلاً: W = F cosθ × x', calc: { in: [['F', 'مركبة القوة F cosθ', 'N', 20], ['x', 'الإزاحة x', 'm', 5]], out: 'الشغل = المساحة', u: 'J', f: v => v.F * v.x } });
LW({ id: 'g11_l5_power', cat: 55, name: 'القدرة', fx: '<i>P</i> = ' + FR('<i>W</i>', '<i>t</i>'), sym: 'القدرة المعدل الزمني لإنجاز الشغل، وحدتها الواط Watt = J/s ، والقدرة الحصانية 1 hp = 746 W', calc: { in: [['W', 'الشغل W', 'J', 1800], ['t', 'الزمن t', 's', 10]], out: 'القدرة P', u: 'W', f: v => v.W / v.t } });
LW({ id: 'g11_l5_pinst', cat: 55, name: 'القدرة اللحظية', fx: '<i>P</i><sub>inst</sub> = <i>F v</i> cos<i>θ</i>', sym: 'القدرة اللحظية تساوي حاصل الضرب القياسي لمتجه القوة ومتجه السرعة اللحظية، و θ الزاوية بينهما', calc: { in: [['F', 'القوة F', 'N', 29000], ['v', 'السرعة v', 'm/s', .7], ['th', 'الزاوية θ', '°', 0]], out: 'القدرة اللحظية', u: 'W', f: v => v.F * v.v * Math.cos(v.th * Math.PI / 180) } });
LW({ id: 'g11_l5_ke', cat: 55, name: 'الطاقة الحركية ومبرهنة الشغل − الطاقة', fx: '<i>KE</i> = ½ <i>m v</i>² ، <i>W</i> = ½ <i>m v</i><sub>f</sub>² − ½ <i>m v</i><sub>i</sub>² = Δ<i>KE</i>', sym: 'الطاقة الحركية طاقة يمتلكها الجسم بسبب حركته. الشغل الذي تنجزه القوة المحصلة على الجسم يساوي التغير في طاقته الحركية', calc: { in: [['m', 'الكتلة m', 'kg', 2000], ['vi', 'السرعة الابتدائية vi', 'm/s', 20], ['vf', 'السرعة النهائية vf', 'm/s', 0]], out: 'الشغل W = ΔKE', u: 'J', f: v => .5 * v.m * (v.vf * v.vf - v.vi * v.vi) } });
LW({ id: 'g11_l5_gpe', cat: 55, name: 'الطاقة الكامنة التثاقلية', fx: '<i>GPE</i> = <i>m g h</i>', sym: 'طاقة يمتلكها الجسم بسبب موقعه بالنسبة لمستوى إسناد. قيمتها تعتمد على مستوى الإسناد لكن التغير فيها لا يعتمد عليه', calc: { in: [['m', 'الكتلة m', 'kg', 3], ['g', 'g', 'm/s²', 10], ['h', 'الارتفاع h', 'm', 2]], out: 'GPE', u: 'J', f: v => v.m * v.g * v.h } });
LW({ id: 'g11_l5_epe', cat: 55, name: 'الطاقة الكامنة المرونية', fx: '<i>EPE</i> = ½ <i>K x</i>²', sym: 'طاقة مختزنة في النابض المضغوط أو المسحوب مسافة x عن موضع اتزانه، و K ثابت النابض بوحدة N/m', calc: { in: [['K', 'ثابت النابض K', 'N/m', 200], ['x', 'الانضغاط x', 'm', .2]], out: 'EPE', u: 'J', f: v => .5 * v.K * v.x * v.x } });
LW({ id: 'g11_l5_emech', cat: 55, name: 'حفظ الطاقة الميكانيكية', fx: '<i>KE</i><sub>i</sub> + <i>PE</i><sub>i</sub> = <i>KE</i><sub>f</sub> + <i>PE</i><sub>f</sub>', sym: 'الطاقة الميكانيكية E = PE + KE تبقى ثابتة بإهمال الاحتكاك ومقاومة الهواء، فما ينقص من الكامنة يزداد في الحركية', calc: { in: [['m', 'الكتلة m', 'kg', 5], ['hi', 'الارتفاع الابتدائي', 'm', 5], ['hf', 'الارتفاع النهائي', 'm', 3.2], ['g', 'g', 'm/s²', 10]], out: 'السرعة النهائية من السكون', u: 'm/s', f: v => Math.sqrt(Math.max(0, 2 * v.g * (v.hi - v.hf))) } });
LW({ id: 'g11_l5_wnc', cat: 55, name: 'شغل القوى غير المحافظة', fx: '<i>W</i><sub>nc</sub> = <i>E</i><sub>f</sub> − <i>E</i><sub>i</sub>', sym: 'شغل القوى غير المحافظة كالاحتكاك يساوي التغير في الطاقة الميكانيكية. شغل الاحتكاك سالب ينقص الطاقة الميكانيكية ويتحول إلى حرارة، وشغل المحرك موجب يزيدها', calc: { in: [['Ei', 'الطاقة الابتدائية Ei', 'J', 250], ['Ef', 'الطاقة النهائية Ef', 'J', 100]], out: 'Wnc', u: 'J', f: v => v.Ef - v.Ei } });
LW({ id: 'g11_l5_mom', cat: 55, name: 'الزخم الخطي', fx: '<i>P</i> = <i>m v</i>', sym: 'الزخم الخطي كمية متجهة باتجاه السرعة، وحدته kg.m/s', calc: { in: [['m', 'الكتلة m', 'kg', 1200], ['v', 'السرعة v', 'm/s', 20]], out: 'الزخم P', u: 'kg.m/s', f: v => v.m * v.v } });
LW({ id: 'g11_l5_imp', cat: 55, name: 'الدفع والتغير في الزخم', fx: '<i>F t</i> = <i>m v</i><sub>f</sub> − <i>m v</i><sub>i</sub>', sym: 'الدفع (حاصل ضرب القوة في زمن تأثيرها) يساوي التغير في الزخم. زيادة زمن التصادم تقلل القوة المؤثرة، كما في الوسادة الهوائية', calc: { in: [['m', 'الكتلة m', 'kg', 1200], ['vi', 'vi', 'm/s', 20], ['vf', 'vf', 'm/s', 0], ['t', 'زمن التأثير t', 's', .15]], out: 'متوسط القوة F', u: 'N', f: v => v.m * (v.vf - v.vi) / v.t } });
LW({ id: 'g11_l5_pcons', cat: 55, name: 'حفظ الزخم الخطي', fx: '<i>m</i><sub>1</sub><i>v</i><sub>1i</sub> + <i>m</i><sub>2</sub><i>v</i><sub>2i</sub> = <i>m</i><sub>1</sub><i>v</i><sub>1f</sub> + <i>m</i><sub>2</sub><i>v</i><sub>2f</sub>', sym: 'إذا كانت محصلة القوى الخارجية على منظومة تساوي صفراً فإن زخمها الكلي يبقى ثابتاً. في التصادم عديم المرونة يلتحم الجسمان: v = (m1 v1 + m2 v2) / (m1 + m2)', calc: { in: [['m1', 'm1', 'kg', 30000], ['v1', 'v1', 'm/s', 10], ['m2', 'm2', 'kg', 1200], ['v2', 'v2', 'm/s', -25]], out: 'السرعة المشتركة بعد الالتحام', u: 'm/s', f: v => (v.m1 * v.v1 + v.m2 * v.v2) / (v.m1 + v.m2) } });

/* =============== A1 — مفهوم الشغل: الدفع الأفقي والقوة بزاوية ومثال 1 (5-1، الشكلان 1 و 2، ص 93–95) =============== */
(() => {
  const EX = { q: 'شخص يدفع مكنسة كهربائية بقوة 50 N تصنع زاوية 30° مع الأفق، فتحركت المكنسة إزاحة أفقية مقدارها 3 m. ما مقدار الشغل الذي أنجزه الشخص؟', lines: ['W = F x cosθ', 'W = 50 × 3 × cos30°', 'W = 50 × 3 × 0.866', 'W ≈ 130 J', 'سؤال: إذا لم تتحرك المكنسة', 'x = 0 ⟸ W = 0'] };
  const D = { id: 'g11_w_work', page: 93, fig: 'الشكلان 1 و 2 + مثال 1',
    desc: 'الشغل المنجز على جسم يساوي حاصل ضرب مركبة القوة باتجاه الإزاحة في مقدار الإزاحة: W = F x cosθ ، حيث θ الزاوية بين القوة والإزاحة. وحدته الجول J = N.m وهو كمية قياسية. يكون موجباً إذا كانت مركبة القوة باتجاه الحركة، وسالباً إذا كانت معاكسة لها، وصفراً إذا كانت القوة عمودية على الإزاحة.',
    tags: 'الشغل W=Fxcosθ جول N.m مركبة القوة Fcosθ Fsinθ الإزاحة كمية قياسية موجب سالب صفر مثال 1 مكنسة كهربائية 50N 30° 3m 130J الشكل 1 الشكل 2',
    tools: ['صندوق', 'حبل', 'ميزان نابضي', 'مسطرة مترية', 'منقلة'],
    steps: ['اختر «الشكل 1»: الشخص يدفع الصندوق أفقياً من a إلى b. اضغط «▶ حرّك» وراقب الشغل يزداد.', 'اختر «الشكل 2»: اسحب المقبض الأحمر لتغيير زاوية الحبل θ وراقب المركبتين F cosθ و F sinθ.', 'اجعل θ أكبر من 90° : القوة تعاكس الحركة فيصبح الشغل سالباً. عند θ = 90° يكون الشغل صفراً.', 'اختر «مثال 1» ثم «الحل خطوة خطوة» لحل مثال المكنسة الكهربائية.'],
    concl: ['W = F x cosθ ووحدته الجول J = N.m.', 'المركبة الأفقية F cosθ وحدها تنجز شغلاً، أما F sinθ العمودية على الإزاحة فلا تنجز شغلاً.', 'الشغل موجب عندما θ < 90° ، صفر عندما θ = 90° ، سالب عندما θ > 90°.', 'مثال 1: W = 50 × 3 × cos30° ≈ 130 J.'],
    laws: ['g11_l5_work'],
    controls: [R('F', 'مقدار القوة F', 0, 100, 50, 5, 'N'), R('th', 'الزاوية θ بين القوة والإزاحة', 0, 180, 30, 5, '°'), R('x', 'الإزاحة من a إلى b', 1, 5, 3, .5, 'm'), TG('cmp', 'مركبتا القوة', true, null, 'vector')],
    setup(S) { S.md = 'ang'; S.pos = 0; S.ps = 0; S.run = 0; S.ex = 0; S.k = 0; S.ths = S.p.th; S.wp = 0; },
    th(S) { return S.md === 'push' ? 0 : S.p.th; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, gy = h - 238, u = (w - 40 - 150 - (x0 + 90) - 116) / 5; return { w, h, L, x0, gy, u, bw: 116, bh: 86, sx: x0 + 90 }; },
    update(S, dt) { if (S.run) { S.pos += dt * .9; if (S.pos >= S.p.x) { S.pos = S.p.x; S.run = 0; } } S.pos = Math.min(S.pos, S.p.x); S.ps = Q55.ez(S.ps, S.pos, dt, 12); S.ths = Q55.ez(S.ths, D.th(S), dt, 10); S.wp += dt; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), th = S.ths, tr = Q55.d2r(th), F = S.p.F, bx = g.sx + S.ps * g.u, by = g.gy, cy = by - g.bh / 2, W = F * S.ps * Math.cos(Q55.d2r(D.th(S))), Wb = F * S.p.x * Math.cos(Q55.d2r(D.th(S)));
      Q55.bg(ctx, w, h); Q55.floor(ctx, g.x0 - 10, w - 20, g.gy);
      Q55.mark(ctx, g.sx + g.bw / 2, g.gy, 'a'); Q55.mark(ctx, g.sx + g.bw / 2 + S.p.x * g.u, g.gy, 'b', '#2563eb');
      Q55.dim(ctx, g.sx + g.bw / 2, g.gy + 46, g.sx + g.bw / 2 + S.p.x * g.u, g.gy + 46, 'x = ' + S.p.x + ' m', '#2563eb');
      const vac = S.md === 'vac';
      if (vac) { // vacuum cleaner body + handle going up-back; force pushes along the handle (down-forward)
        K.raw(ctx, () => { const gb = ctx.createLinearGradient(0, by - 50, 0, by); gb.addColorStop(0, '#f87171'); gb.addColorStop(1, '#991b1b'); ctx.fillStyle = gb; rr(ctx, bx, by - 46, g.bw, 38, 14); ctx.fill(); ctx.fillStyle = '#1f2937'; [bx + 18, bx + g.bw - 18].forEach(x => { ctx.beginPath(); ctx.arc(x, by - 8, 8, 0, TAU); ctx.fill(); }); ctx.fillStyle = '#fca5a5'; rr(ctx, bx + 14, by - 40, g.bw - 28, 8, 4); ctx.fill(); });
      } else Q55.crate(ctx, bx, by, g.bw, g.bh);
      const ax = vac ? bx + 22 : (th <= 90 ? bx + g.bw : bx), ay = vac ? by - 40 : cy, Lr = vac ? 130 : 190;
      let hx, hy;
      if (S.md === 'push') { hx = bx - 2; hy = cy; const m = Q55.man(ctx, bx - 70, g.gy, { H: 160, dir: 1, lean: 16, brace: 10, hands: [[bx - 2, cy - 6], [bx - 2, cy + 8]], ph: S.run ? S.wp * 6 : 0 }); Q55.arrow(ctx, bx + g.bw / 2, cy - 50, F * 1.4, 0, '#dc2626', 'F', 3.5); }
      else {
        const dx = vac ? -Math.cos(tr) : Math.cos(tr), dy = vac ? -Math.sin(tr) : -Math.sin(tr); // rope/handle direction from attach point
        hx = ax + dx * Lr; hy = ay + dy * Lr;
        K.raw(ctx, () => { ctx.strokeStyle = vac ? '#334155' : '#a16207'; ctx.lineWidth = vac ? 6 : 3.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(hx, hy); ctx.stroke(); });
        C2.hand(ctx, hx, hy, 1, .62, { rot: Math.atan2(-dy, -dx) + (vac ? 0 : 0) });
        const fs = F * 2, fx = Math.cos(tr) * fs, fy = (vac ? 1 : -1) * Math.sin(tr) * fs, ox = vac ? ax - Math.cos(tr) * 60 : bx + g.bw / 2, oy = vac ? ay - Math.sin(tr) * 60 : cy;
        Q55.arrow(ctx, ox, oy, fx, fy, '#dc2626', 'F', 3.5);
        if (S.p.cmp && Math.abs(fx) > 3) Q55.arrow(ctx, ox, oy, fx, 0, 'rgba(37,99,235,.9)', 'Fcosθ', 2.6);
        if (S.p.cmp && Math.abs(fy) > 3) Q55.arrow(ctx, ox, oy, 0, fy, 'rgba(22,163,74,.9)', 'Fsinθ', 2.6);
        K.raw(ctx, () => { ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.beginPath(); if (vac) ctx.arc(ox, oy, 30, 0, tr); else ctx.arc(ox, oy, 30, -tr, 0); ctx.stroke(); });
        Q42.T(ctx, 'θ = ' + Math.round(th) + '°', ox - 50, oy + (vac ? 26 : -26), { s: 11, w: 900, c: '#7c3aed', bg: 'rgba(255,255,255,.85)' });
        if (!vac) Q41.knob(ctx, hx, hy, '#dc2626', 9);
      }
      // W–θ graph (top-left)
      if (!S.ex || w > 700) { const FX = Math.max(50, Math.ceil(F * S.p.x / 50) * 50), A = Q55.axes(ctx, { x: g.L + 60, y: 98, w: 300, h: 170, x1: 180, y0: -FX, y1: FX, xs: 30, ys: FX / 2, lx: 90, ly: FX, xl: 'θ (°)', yl: 'W (J)', col: '#16a34a' }), P = [];
        for (let a = 0; a <= 180; a += 3) P.push([A.X(a), A.Y(F * S.p.x * Math.cos(Q55.d2r(a)))]); Q52.plot(ctx, P, '#16a34a', 2.4); Q41.dot(ctx, A.X(D.th(S)), A.Y(Wb), '#dc2626', 6);
        Q42.T(ctx, 'W = F x cosθ', g.L + 210, 292, { s: 11, w: 900, c: '#16a34a' }); }
      const sg = Wb > .5 ? ['الشغل موجب: القوة تساعد الحركة', '#16a34a'] : Wb < -.5 ? ['الشغل سالب: القوة تعاكس الحركة', '#dc2626'] : ['الشغل صفر: القوة عمودية على الإزاحة', '#7c3aed'];
      if (S.ex) Q55.steps(ctx, S, Object.assign({ title: 'مثال 1 ص 95' }, EX, { k: S.k }));
      else Q55.card(ctx, S, [{ t: 'W = F x cosθ', mono: 1, w: 900 }, { t: 'F = ' + F + ' N    θ = ' + D.th(S) + '°', mono: 1 }, { t: 'F cosθ = ' + Q55.f(F * Math.cos(Q55.d2r(D.th(S))), 1) + ' N', mono: 1, c: '#2563eb', w: 800 }, { t: 'F sinθ = ' + Q55.f(F * Math.sin(Q55.d2r(D.th(S))), 1) + ' N', mono: 1, c: '#16a34a', w: 800 }, { t: 'الإزاحة الآن = ' + Q55.f(S.ps, 2) + ' m', c: '#334155' }, { t: 'W = ' + Q55.f(W, 1) + ' J', mono: 1, c: '#b91c1c', w: 900, s: 14 }, { t: 'الشغل الكلي من a إلى b', c: '#b91c1c', w: 800 }, { t: 'W = ' + Q55.f(Wb, 1) + ' J', mono: 1, c: '#b91c1c', w: 800 }, { t: sg[0], c: sg[1], w: 900 }], { title: S.md === 'push' ? 'الشكل 1: دفع أفقي' : S.md === 'vac' ? 'مثال 1: المكنسة الكهربائية' : 'الشكل 2: قوة بزاوية θ' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, S.md === 'push' ? 'اسحب الصندوق أو اضغط «▶ حرّك»' : 'اسحب المقبض الأحمر لتغيير الزاوية θ', '#16a34a');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['push', 'الشكل 1: دفع أفقي'], ['ang', 'الشكل 2: قوة بزاوية'], ['vac', 'مثال 1: المكنسة']], g.h - 172, S.md, (S2, k) => { S2.md = k; S2.ex = 0; S2.pos = 0; S2.run = 0; if (k === 'vac') { setParam(S2, 'F', 50); setParam(S2, 'th', 30); setParam(S2, 'x', 3); } }, { bw: 190, col: '#16a34a' }),
      p: Q55.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.pos >= S2.p.x) S2.pos = 0; S2.run = S2.run ? 0 : 1; }, S2 => { S2.pos = 0; S2.run = 0; }, { go: '▶ حرّك من a إلى b' }),
      e: Q55.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 1: الحل خطوة خطوة', S2 => { S2.md = 'vac'; setParam(S2, 'F', 50); setParam(S2, 'th', 30); setParam(S2, 'x', 3); S2.pos = 0; S2.run = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), bx = g.sx + S.ps * g.u, out = [{ id: 'box', x: bx + g.bw / 2, y: g.gy - g.bh / 2, r: 34, axis: 'x', keep: true, tip: 'اسحب الجسم من a إلى b', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.pos = clamp((d.x - g.bw / 2 - g.sx) / g.u, 0, S2.p.x); } }];
      if (S.md === 'ang') { const tr = Q55.d2r(S.ths), ax = S.ths <= 90 ? bx + g.bw : bx, ay = g.gy - g.bh / 2; out.push({ id: 'th', x: ax + Math.cos(tr) * 190, y: ay - Math.sin(tr) * 190, r: 20, axis: 'xy', keep: true, hint: false, tip: 'اسحب لتغيير الزاوية', drag: (S2, d) => { const cx = bx + g.bw / 2; let a = Math.atan2(ay - d.y, d.x - cx) * 180 / Math.PI; setParam(S2, 'th', clamp(Math.round(a / 5) * 5, 0, 180)); } }); }
      return out.concat(C.m, C.p, C.e); },
    readings(S) { const c = Math.cos(Q55.d2r(D.th(S))); return [rd('القوة F', S.p.F + ' N'), rd('الزاوية θ', D.th(S) + '°'), rd('F cosθ', Q55.f(S.p.F * c, 1) + ' N'), rd('الإزاحة', Q55.f(S.pos, 2) + ' m'), rd('الشغل W', Q55.f(S.p.F * S.pos * c, 1) + ' J')]; },
    record(S) { const c = Math.cos(Q55.d2r(D.th(S))); return { F: S.p.F, th: D.th(S), x: S.p.x, W: Q55.f(S.p.F * S.p.x * c, 1) }; },
    cols: [['F', 'F (N)'], ['th', 'θ (°)'], ['x', 'x (m)'], ['W', 'W (J)']],
    explain(S) { return Q26.ex('كلما زادت الزاوية θ نقص الشغل، ويصبح صفراً عند 90° ثم سالباً بعدها.', 'المركبة F cosθ باتجاه الإزاحة هي وحدها التي تنجز شغلاً، أما المركبة F sinθ فعمودية على الإزاحة. لذلك W = F x cosθ.', 'عند سحب حقيبة السفر بمقبضها المائل يضيع جزء من القوة في المركبة الشاقولية التي لا تنجز شغلاً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — متى يكون الشغل صفراً؟ القوة المركزية وحمل الدلو ودفع الجدار (الأشكال 3 و 4 و 5 و 6، ص 94) =============== */
(() => {
  const MD = { circ: 'الشكل 3: الحركة الدائرية', carry: 'الشكلان 4 و 5: الحمل أفقياً', wall: 'الشكل 6: دفع الجدار' };
  const D = { id: 'g11_w_zero', page: 94, fig: 'الأشكال 3 و 4 و 5 و 6 + فكر',
    desc: 'لا ينجز شغل على الجسم إذا كانت القوة عمودية على الإزاحة (θ = 90°) أو إذا لم يحدث إزاحة. فالقوة المركزية في الحركة الدائرية عمودية دائماً على اتجاه الحركة، والشخص الذي يحمل دلواً ويمشي أفقياً يؤثر بقوة شاقولية نحو الأعلى والإزاحة أفقية، ومن يدفع جداراً لا يحركه لا ينجز عليه شغلاً مهما تعب.',
    tags: 'الشغل صفر القوة عمودية على الإزاحة θ=90 cos90=0 القوة المركزية الحركة الدائرية حمل دلو صندوق المشي أفقياً دفع الجدار لا إزاحة الشكل 3 الشكل 4 الشكل 5 الشكل 6 فكر',
    tools: ['كرة مربوطة بخيط', 'دلو ماء', 'صندوق', 'جدار'],
    steps: ['«الشكل 3»: الكرة تدور بانطلاق ثابت. لاحظ أن القوة المركزية F عمودية دائماً على السرعة v.', '«الشكلان 4 و 5»: اسحب الشخص أفقياً: شغل قوة الحمل يبقى صفراً. ثم اسحب الدلو للأعلى أو للأسفل.', '«الشكل 6»: اسحب يد الشخص نحو الجدار لزيادة قوة الدفع: الجدار لا يتحرك فالشغل صفر.', 'غيّر الكتلة والسرعة وقوة الدفع من اللوحة الجانبية.'],
    concl: ['الشغل صفر عندما تكون القوة عمودية على الإزاحة لأن cos90° = 0.', 'القوة المركزية لا تنجز شغلاً فلا يتغير انطلاق الجسم في الحركة الدائرية المنتظمة.', 'حمل جسم والمشي به أفقياً لا ينجز شغلاً عليه، أما رفعه شاقولياً فينجز شغلاً W = m g h.', 'دفع جدار لا يتحرك لا ينجز شغلاً لأن الإزاحة صفر.'],
    laws: ['g11_l5_work'],
    controls: [R('m', 'كتلة الدلو أو الصندوق', 1, 20, 10, 1, 'kg'), R('v', 'انطلاق الكرة أو المشي', .5, 4, 1.5, .5, 'm/s'), R('F', 'قوة الدفع على الجدار', 0, 500, 300, 10, 'N'), TG('box', 'حمل صندوق (الشكل 5)', false, null, 'box')],
    setup(S) { S.md = 'circ'; S.ang = 0; S.px = 0; S.pxs = 0; S.hb = .8; S.hbs = .8; S.wl = 0; S.walk = 0; S.dist = 0; S.fw = 0; S.push = 0; S.tk = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, x1 = w - 350, gy = h - 238; return { w, h, L, x0, x1, gy, u: 94 }; },
    update(S, dt) { S.tk += dt; S.ang += S.p.v / 1.2 * dt;
      if (S.walk) { S.px += S.p.v * dt * .6; if (S.px >= 3) { S.px = 3; S.walk = 0; } }
      const op = S.pxs; S.pxs = Q55.ez(S.pxs, S.px, dt, 10); S.dist += Math.abs(S.pxs - op);
      const oh = S.hbs; S.hbs = Q55.ez(S.hbs, S.hb, dt, 10); S.wl += S.p.m * 10 * (S.hbs - oh);
      S.fw = Q55.ez(S.fw, S.push ? S.p.F : 0, dt, 6); },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q55.bg(ctx, w, h); let L;
      if (S.md === 'circ') {
        const cx = (g.x0 + g.x1) / 2, cy = 300, R = 150, a = S.ang, bx = cx + Math.cos(a) * R, by = cy - Math.sin(a) * R;
        K.raw(ctx, () => { ctx.strokeStyle = 'rgba(37,99,235,.35)'; ctx.setLineDash([6, 6]); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
          ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, TAU); ctx.fill(); });
        for (let k = 1; k <= 6; k++) { const ak = a - k * .16; K.raw(ctx, () => { ctx.globalAlpha = .1 + .05 * (6 - k); }); K.ball(ctx, cx + Math.cos(ak) * R, cy - Math.sin(ak) * R, 13, '#f97316'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); }
        K.ball(ctx, bx, by, 15, '#ea580c');
        Q55.arrow(ctx, bx, by, (cx - bx) * .45, (cy - by) * .45, '#dc2626', 'F', 3.4);
        const vl = 30 + S.p.v * 18; Q55.arrow(ctx, bx, by, -Math.sin(a) * vl, -Math.cos(a) * vl, '#2563eb', 'v', 3.4);
        Q51.rmark(ctx, bx, by, (cx - bx) / R, (cy - by) / R, -Math.sin(a), -Math.cos(a), 12, '#7c3aed');
        Q42.T(ctx, 'θ = 90°', cx, cy + 26, { s: 12, w: 900, c: '#7c3aed', bg: 'rgba(255,255,255,.85)' });
        L = [{ t: 'القوة المركزية F نحو المركز', c: '#dc2626', w: 800 }, { t: 'السرعة v باتجاه المماس', c: '#2563eb', w: 800 }, { t: 'θ = 90°  ⟸  cos90° = 0', mono: 1, c: '#7c3aed', w: 900 }, { t: 'W = F x cos90° = 0', mono: 1, c: '#b91c1c', w: 900, s: 14 }, { t: 'الانطلاق ثابت ' + Q55.f(S.p.v, 1) + ' m/s', c: '#334155' }, { t: 'لا يتغير انطلاق الكرة لأن القوة لا تنجز شغلاً', c: '#16a34a', w: 800 }];
      } else if (S.md === 'carry') {
        Q55.floor(ctx, g.x0 - 10, g.x1 + 20, g.gy); const fx = g.x0 + 60 + S.pxs * 80, hy = g.gy - S.hbs * g.u, hx = fx + 26;
        Q55.dim(ctx, g.x0 + 60, g.gy + 34, Math.max(g.x0 + 62, fx), g.gy + 34, 'x = ' + Q55.f(S.pxs, 1) + ' m', '#2563eb');
        Q55.man(ctx, fx, g.gy, { H: 160, dir: 1, hands: [[hx, hy], [hx - 4, hy + 2]], ph: S.walk ? S.tk * 7 : 0 });
        if (S.p.box) Q55.crate(ctx, hx - 26, hy + 52, 52, 46); else K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(hx, hy + 14, 18, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); const gb = ctx.createLinearGradient(hx - 18, 0, hx + 18, 0); gb.addColorStop(0, '#64748b'); gb.addColorStop(.5, '#e2e8f0'); gb.addColorStop(1, '#475569'); ctx.fillStyle = gb; ctx.beginPath(); ctx.moveTo(hx - 19, hy + 10); ctx.lineTo(hx + 19, hy + 10); ctx.lineTo(hx + 14, hy + 50); ctx.lineTo(hx - 14, hy + 50); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(56,189,248,.8)'; ctx.fillRect(hx - 17, hy + 12, 34, 6); });
        Q55.arrow(ctx, hx + 30, hy + 30, 0, -70, '#dc2626', 'F', 3.4); Q55.arrow(ctx, hx + 30, hy + 80, 60, 0, '#2563eb', 'x', 3);
        Q51.rmark(ctx, hx + 30, hy + 80, 0, -1, 1, 0, 12, '#7c3aed');
        L = [{ t: 'قوة الحمل F = m g = ' + S.p.m * 10 + ' N', c: '#dc2626', w: 800 }, { t: 'اتجاهها شاقولي نحو الأعلى', c: '#dc2626' }, { t: 'الإزاحة الأفقية = ' + Q55.f(S.pxs, 2) + ' m', c: '#2563eb', w: 800 }, { t: 'θ = 90°  ⟸  W = 0', mono: 1, c: '#7c3aed', w: 900, s: 14 }, { t: 'شغل الرفع الشاقولي:', c: '#b45309', w: 800 }, { t: 'W = m g Δh = ' + Q55.f(S.wl, 1) + ' J', mono: 1, c: '#b45309', w: 900 }, { t: 'المشي أفقياً لا ينجز شغلاً، والرفع ينجز شغلاً', c: '#16a34a', w: 800 }];
      } else {
        Q55.floor(ctx, g.x0 - 10, g.x1 + 20, g.gy); const wx = g.x1 - 90; K.raw(ctx, () => { const gw = ctx.createLinearGradient(wx, 0, wx + 60, 0); gw.addColorStop(0, '#b45309'); gw.addColorStop(1, '#78350f'); ctx.fillStyle = gw; ctx.fillRect(wx, 80, 60, g.gy - 80); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1.5; for (let y = 80; y < g.gy; y += 22) { ctx.beginPath(); ctx.moveTo(wx, y); ctx.lineTo(wx + 60, y); ctx.stroke(); for (let x = wx + ((y / 22) % 2 ? 0 : 15); x < wx + 60; x += 30) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 22); ctx.stroke(); } } });
        const e = S.fw / 500, fx = wx - 110 + e * 10, hy = g.gy - 120;
        Q55.man(ctx, fx, g.gy, { H: 165, dir: 1, lean: 22 + e * 12, brace: 18 * e + 6, hands: [[wx - 2, hy], [wx - 2, hy + 14]], sweat: e > .1 ? S.tk : 0 });
        if (S.fw > 5) Q55.arrow(ctx, wx - 70, hy - 50, S.fw * .14 + 10, 0, '#dc2626', 'F', 3.6);
        Q41.knob(ctx, wx - 2, hy + 6, '#dc2626', 9); if (S.fw > 5) Q42.T(ctx, 'الإزاحة = 0', wx + 30, g.gy - 20, { s: 11, w: 900, c: '#fff', bg: '#2563eb' });
        L = [{ t: 'F = ' + Math.round(S.fw) + ' N', mono: 1, c: '#dc2626', w: 900 }, { t: 'الجدار لم يتحرك: x = 0', c: '#2563eb', w: 800 }, { t: 'W = F x cosθ = F × 0 = 0', mono: 1, c: '#b91c1c', w: 900, s: 14 }, { t: 'يتعب الشخص ويتعرق لأن عضلاته تستهلك طاقة كيميائية تتحول إلى حرارة', c: '#334155' }, { t: 'لكنه لا ينجز شغلاً على الجدار', c: '#16a34a', w: 800 }];
      }
      Q55.card(ctx, S, L, { title: MD[S.md] });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); if (C.p) Q42.drawChips(ctx, C.p);
      Q42.banner(ctx, w, S.md === 'circ' ? 'القوة المركزية عمودية دائماً على السرعة' : S.md === 'carry' ? 'اسحب الشخص أفقياً واسحب الدلو شاقولياً' : 'اسحب يد الشخص نحو الجدار', '#16a34a');
    },
    chips(S, g) { const m = Q42.chips(S, 'md', [['circ', 'الشكل 3: دوران'], ['carry', 'الشكلان 4 و 5: حمل'], ['wall', 'الشكل 6: جدار']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.walk = 0; S2.push = 0; }, { bw: 190, col: '#16a34a' });
      let p = null; if (S.md === 'carry') p = Q55.play(S, 'pl', g.h - 84, S.walk, S2 => { if (S2.px >= 3) S2.px = 0; S2.walk = S2.walk ? 0 : 1; }, S2 => { S2.px = 0; S2.walk = 0; S2.hb = .8; S2.wl = 0; S2.dist = 0; }, { go: '▶ امشِ أفقياً' });
      else if (S.md === 'wall') p = Q42.chips(S, 'pw', [['go', S.push ? '✋ توقف عن الدفع' : '▶ ادفع الجدار']], g.h - 84, '', S2 => { S2.push = S2.push ? 0 : 1; }, { bw: 200 });
      return { m, p }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), out = [];
      if (S.md === 'carry') { const fx = g.x0 + 60 + S.pxs * 80, hy = g.gy - S.hbs * g.u; out.push({ id: 'man', x: fx, y: g.gy - 90, r: 30, axis: 'x', keep: true, tip: 'اسحب الشخص أفقياً', idle: 'اسحب ✋', drag: (S2, d) => { S2.walk = 0; S2.px = clamp((d.x - g.x0 - 60) / 80, 0, 3); } });
        out.push({ id: 'bucket', x: fx + 26, y: hy + 30, r: 24, axis: 'y', keep: true, hint: false, tip: 'اسحب الدلو للأعلى أو للأسفل', drag: (S2, d) => { S2.hb = clamp((g.gy - (d.y - 30)) / g.u, .5, 1.9); } }); }
      else if (S.md === 'wall') { const wx = g.x1 - 90, hy = g.gy - 120; out.push({ id: 'hand', x: wx - 2, y: hy + 6, r: 24, axis: 'x', keep: true, tip: 'اسحب نحو الجدار لتدفعه', idle: 'اسحب ✋', drag: (S2, d) => { S2.push = 1; setParam(S2, 'F', clamp(Math.round((d.x - (wx - 120)) / 120 * 500 / 10) * 10, 0, 500)); }, up: S2 => { } }); }
      else out.push({ id: 'ball', x: (g.x0 + g.x1) / 2 + Math.cos(S.ang) * 150, y: 300 - Math.sin(S.ang) * 150, r: 22, axis: 'none', keep: true, tip: 'اضغط لمضاعفة الانطلاق', idle: 'اضغط ✋', click: S2 => { setParam(S2, 'v', S2.p.v >= 4 ? 1 : Math.min(4, S2.p.v * 2)); } });
      return out.concat(C.m, C.p || []); },
    readings(S) { return S.md === 'circ' ? [rd('الانطلاق', Q55.f(S.p.v, 1) + ' m/s'), rd('الزاوية بين F و v', '90°'), rd('الشغل', '0 J')] : S.md === 'carry' ? [rd('الإزاحة الأفقية', Q55.f(S.pxs, 2) + ' m'), rd('شغل الحمل أفقياً', '0 J'), rd('شغل الرفع', Q55.f(S.wl, 1) + ' J')] : [rd('قوة الدفع', Math.round(S.fw) + ' N'), rd('الإزاحة', '0 m'), rd('الشغل', '0 J')]; },
    explain(S) { return Q26.ex('في الحالات الثلاث تؤثر قوة واضحة لكن الشغل المنجز يساوي صفراً.', 'W = F x cosθ يكون صفراً إذا كانت θ = 90° (القوة المركزية، قوة الحمل والمشي أفقياً) أو إذا كانت الإزاحة صفراً (دفع الجدار).', 'القمر يدور حول الأرض بقوة جذب مركزية لا تنجز عليه شغلاً، لذلك يبقى انطلاقه ثابتاً تقريباً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A3 — مثال 2: رافع الأثقال يرفع الثقل ويُنزله (ص 95–96) =============== */
(() => {
  const EX = { q: 'رافع أثقال يرفع ثقلاً وزنه 710 N مسافة 0.65 m بسرعة ثابتة ثم يُنزله المسافة نفسها بسرعة ثابتة. ما الشغل الذي ينجزه في كل حالة؟', lines: ['السرعة ثابتة لذلك F = 710 N نحو الأعلى', 'الرفع: القوة والإزاحة للأعلى', 'W = F x cos0° = 710 × 0.65 × 1', 'W ≈ +460 J', 'الإنزال: القوة للأعلى والإزاحة للأسفل', 'W = 710 × 0.65 × cos180°', 'W ≈ −460 J'] };
  const D = { id: 'g11_w_lift', page: 95, fig: 'مثال 2',
    desc: 'رافع الأثقال يؤثر بقوة نحو الأعلى تساوي وزن الثقل ليحركه بسرعة ثابتة. عند الرفع تكون القوة والإزاحة بالاتجاه نفسه (θ = 0°) فالشغل موجب، وعند الإنزال تبقى القوة نحو الأعلى والإزاحة نحو الأسفل (θ = 180°) فالشغل سالب.',
    tags: 'مثال 2 رافع الأثقال 710N 0.65m 460J −460J الشغل الموجب الشغل السالب cos0 cos180 سرعة ثابتة',
    tools: ['ثقل حديدي', 'مسطرة مترية'],
    steps: ['اسحب الثقل للأعلى (أو اضغط «⬆ ارفع») وراقب شغل الرفع يزداد موجباً.', 'أنزل الثقل (اضغط «⬇ أنزل»): القوة للأعلى والإزاحة للأسفل فالشغل سالب.', 'لاحظ أن الشغل الكلي بعد الرفع والإنزال يساوي صفراً.', 'اضغط «مثال 2: الحل خطوة خطوة».'],
    concl: ['رفع الثقل 0.65 m: W = 710 × 0.65 × cos0° ≈ +460 J.', 'إنزاله: W = 710 × 0.65 × cos180° ≈ −460 J.', 'الشغل موجب عندما تكون القوة باتجاه الإزاحة وسالب عندما تعاكسها.'],
    laws: ['g11_l5_work'],
    controls: [R('F', 'وزن الثقل', 200, 1000, 710, 10, 'N'), R('d', 'مسافة الرفع', .3, 1, .65, .05, 'm')],
    setup(S) { S.y = 0; S.ty = 0; S.wu = 0; S.wd = 0; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, x1 = w - 350, gy = h - 238; return { w, h, L, x0, x1, gy, cx: (x0 + x1) / 2 - 20, u: 220, y0: gy - 150 }; },
    update(S, dt) { S.ty = Math.min(S.ty, S.p.d); const st = clamp(S.ty - S.y, -dt * .5, dt * .5); S.y += st; if (st > 0) S.wu += S.p.F * st; else S.wd += S.p.F * st; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), by = g.y0 - S.y * g.u, cx = g.cx; Q55.bg(ctx, w, h); Q55.floor(ctx, g.x0 - 10, g.x1 + 20, g.gy, { c0: '#94a3b8', c1: '#475569' });
      // front-view lifter
      K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const hip = g.gy - 82, sh = g.gy - 140;
        ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 13; [-1, 1].forEach(s => { ctx.beginPath(); ctx.moveTo(cx + s * 9, hip); ctx.lineTo(cx + s * 22, g.gy - 40); ctx.lineTo(cx + s * 26, g.gy - 4); ctx.stroke(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.ellipse(cx + s * 30, g.gy - 3, 11, 4, 0, 0, TAU); ctx.fill(); });
        const gt = ctx.createLinearGradient(cx - 24, 0, cx + 24, 0); gt.addColorStop(0, '#b91c1c'); gt.addColorStop(.5, '#ef4444'); gt.addColorStop(1, '#991b1b'); ctx.fillStyle = gt; rr(ctx, cx - 24, sh - 6, 48, hip - sh + 12, 12); ctx.fill();
        ctx.strokeStyle = '#fcd9b6'; ctx.lineWidth = 10; [-1, 1].forEach(s => { const hx = cx + s * 46, ex = cx + s * (by > sh - 20 ? 52 : 44), ey = (sh + by) / 2 + (by > sh - 20 ? 14 : 0); ctx.beginPath(); ctx.moveTo(cx + s * 22, sh); ctx.lineTo(ex, ey); ctx.lineTo(hx, by + 2); ctx.stroke(); });
        ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, sh - 24, 15, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(cx, sh - 28, 15, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
        // bar + plates
        const gb = ctx.createLinearGradient(0, by - 4, 0, by + 4); gb.addColorStop(0, '#e5e7eb'); gb.addColorStop(1, '#6b7280'); ctx.fillStyle = gb; ctx.fillRect(cx - 120, by - 3.5, 240, 7);
        [-1, 1].forEach(s => { [0, 1].forEach(k => { const px = cx + s * (88 + k * 14), ph = 64 - k * 16; const gp = ctx.createLinearGradient(px - 6, 0, px + 6, 0); gp.addColorStop(0, '#111827'); gp.addColorStop(.5, '#4b5563'); gp.addColorStop(1, '#111827'); ctx.fillStyle = gp; rr(ctx, px - 6, by - ph / 2, 12, ph, 3); ctx.fill(); }); });
        ctx.restore(); });
      // height scale
      const sx = g.cx + 170; Q41.line(ctx, [[sx, g.y0], [sx, g.y0 - S.p.d * g.u]], '#7c3aed', 1.4, [4, 3]); Q42.T(ctx, '0', sx + 14, g.y0, { s: 10, w: 800, c: '#7c3aed' }); Q42.T(ctx, S.p.d + ' m', sx + 22, g.y0 - S.p.d * g.u, { s: 10, w: 800, c: '#7c3aed' });
      Q41.dot(ctx, sx, by, '#7c3aed', 5);
      Q55.arrow(ctx, cx - 150, by, 0, -60, '#dc2626', 'F', 3.4); Q55.arrow(ctx, cx + 150, by, 0, 60, '#475569', 'mg', 3);
      const mv = S.ty > S.y + 1e-3 ? -1 : S.ty < S.y - 1e-3 ? 1 : 0; if (mv) Q55.arrow(ctx, cx - 195, by - 20, 0, mv * 50, '#2563eb', 'x', 2.6);
      // work bars
      Q55.bars(ctx, w - 290, 380, 150, [['رفع', S.wu, '#16a34a', Q55.f(S.wu, 0) + ' J'], ['إنزال', S.wd, '#dc2626', Q55.f(S.wd, 0) + ' J'], ['الكلي', S.wu + S.wd, '#7c3aed', Q55.f(S.wu + S.wd, 0) + ' J']], Math.max(200, S.p.F * S.p.d * 1.05), { neg: 1, title: 'الشغل المنجز', bw: 50, gap: 26 });
      if (S.ex) Q55.steps(ctx, S, Object.assign({ title: 'مثال 2 ص 95' }, EX, { k: S.k }));
      else Q55.card(ctx, S, [{ t: 'F = ' + S.p.F + ' N    x = ' + S.p.d + ' m', mono: 1, w: 800 }, { t: 'الارتفاع الآن = ' + Q55.f(S.y, 2) + ' m', c: '#7c3aed', w: 800 }, { t: mv < 0 ? 'رفع: الزاوية 0° فالشغل موجب' : mv > 0 ? 'إنزال: الزاوية 180° فالشغل سالب' : 'الثقل ساكن: لا شغل الآن', c: mv < 0 ? '#16a34a' : mv > 0 ? '#dc2626' : '#334155', w: 900 }, { t: 'شغل الرفع = ' + Q55.lr('+' + Q55.f(S.p.F * S.p.d, 1) + ' J'), mono: 1, c: '#16a34a', w: 800 }, { t: 'شغل الإنزال = ' + Q55.lr('−' + Q55.f(S.p.F * S.p.d, 1) + ' J'), mono: 1, c: '#dc2626', w: 800 }], { title: 'رافع الأثقال' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'اسحب الثقل للأعلى ثم للأسفل', '#16a34a');
    },
    chips(S, g) { return { p: Q42.chips(S, 'mv', [['up', '⬆ ارفع'], ['dn', '⬇ أنزل'], ['re', '↺ صفّر الشغل']], g.h - 128, '', (S2, k) => { if (k === 'up') S2.ty = S2.p.d; else if (k === 'dn') S2.ty = 0; else { S2.wu = 0; S2.wd = 0; S2.y = 0; S2.ty = 0; } }, { bw: 160 }),
      e: Q55.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 2: الحل خطوة خطوة', S2 => { setParam(S2, 'F', 710); setParam(S2, 'd', .65); S2.wu = 0; S2.wd = 0; S2.y = 0; S2.ty = .65; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); return [{ id: 'bar', x: g.cx + 95, y: g.y0 - S.y * g.u, r: 30, axis: 'y', keep: true, tip: 'اسحب الثقل', idle: 'اسحب ✋', drag: (S2, d) => { S2.ty = clamp((g.y0 - d.y) / g.u, 0, S2.p.d); } }].concat(C.p, C.e); },
    readings(S) { return [rd('الارتفاع', Q55.f(S.y, 2) + ' m'), rd('شغل الرفع', Q55.f(S.wu, 1) + ' J'), rd('شغل الإنزال', Q55.f(S.wd, 1) + ' J'), rd('الشغل الكلي', Q55.f(S.wu + S.wd, 1) + ' J')]; },
    explain(S) { return Q26.ex('شغل الرفع موجب وشغل الإنزال سالب ومجموعهما صفر.', 'القوة التي يؤثر بها الرافع نحو الأعلى في الحالتين، لكن الإزاحة للأعلى عند الرفع (cos0° = 1) وللأسفل عند الإنزال (cos180° = −1).', 'عند نزول الدرج ببطء تنجز عضلات الساقين شغلاً سالباً لأنها تقاوم الحركة نحو الأسفل.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A4 — التمثيل البياني للشغل: المساحة تحت مخطط القوة − الإزاحة + مثال 3 (5-2، الشكل 9، ص 96–97) =============== */
(() => {
  const EX = { q: 'صندوق يسحب بسرعة ثابتة على أرض أفقية بقوة تصنع زاوية 37° مع الأفق إزاحة 5 m ، وقوة الاحتكاك الحركي 20 N. احسب القوة الساحبة، والشغل الذي تنجزه، وشغل قوة الاحتكاك، والشغل الكلي.', lines: ['السرعة ثابتة لذلك محصلة القوى الأفقية صفر', 'F cos37° = fk', 'F × 0.8 = 20', 'F = 25 N', 'W1 = F x cos37° = 25 × 5 × 0.8', 'W1 = 100 J', 'W2 = fk x cos180° = 20 × 5 × (−1)', 'W2 = −100 J', 'Wnet = 100 + (−100) = 0'] };
  const D = { id: 'g11_w_graph', page: 96, fig: 'الشكل 9 + مثال 3',
    desc: 'عند تمثيل مركبة القوة باتجاه الإزاحة F cosθ على المحور الشاقولي والإزاحة x على المحور الأفقي، تكون المساحة المحصورة تحت الخط مساوية للشغل المنجز. للقوة الثابتة تكون المساحة مستطيلاً. في مثال 3 يسحب صندوق بسرعة ثابتة فتساوي المركبة الأفقية للقوة الساحبة قوة الاحتكاك، ويكون شغلها موجباً وشغل الاحتكاك سالباً والشغل الكلي صفراً.',
    tags: 'التمثيل البياني للشغل المساحة تحت المنحني مخطط القوة الإزاحة الشكل 9 مثال 3 احتكاك حركي 20N 37° 5m 25N 100J −100J الشغل الكلي صفر سرعة ثابتة',
    tools: ['صندوق', 'حبل', 'ميزان نابضي', 'مسطرة مترية', 'ورق رسم بياني'],
    steps: ['اضغط «▶ اسحب الصندوق» أو اسحب الصندوق بيدك: يمتلئ المستطيل تحت خط F cosθ على المخطط.', 'المستطيل الأخضر فوق المحور = شغل القوة الساحبة، والأحمر تحته = شغل الاحتكاك.', 'غيّر الزاوية θ بسحب المقبض الأحمر: تتغير F لتبقى F cosθ = fk لأن السرعة ثابتة.', 'اضغط «مثال 3: الحل خطوة خطوة».'],
    concl: ['الشغل = المساحة تحت مخطط القوة − الإزاحة: W = F cosθ × x.', 'السرعة ثابتة ⟸ F cosθ = fk ، وفي مثال 3: F = 20 / 0.8 = 25 N.', 'W1 = +100 J و W2 = −100 J ، والشغل الكلي صفر لأن محصلة القوى صفر.'],
    laws: ['g11_l5_area', 'g11_l5_work'],
    controls: [R('fk', 'قوة الاحتكاك الحركي fk', 5, 40, 20, 1, 'N'), R('th', 'زاوية الحبل θ', 0, 60, 37, 1, '°'), R('x', 'الإزاحة الكلية x', 1, 8, 5, .5, 'm'), TG('fr', 'شغل الاحتكاك على المخطط', true, null, 'chart')],
    setup(S) { S.pos = 0; S.ps = 0; S.run = 0; S.ex = 0; S.k = 0; S.ths = S.p.th; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, gy = h - 238, sx = x0 + 30, bw = 96, u = (w - 40 - 200 - sx - bw) / 8; return { w, h, L, x0, gy, sx, bw, bh: 70, u }; },
    update(S, dt) { if (S.run) { S.pos += dt * 1.1; if (S.pos >= S.p.x) { S.pos = S.p.x; S.run = 0; } } S.pos = Math.min(S.pos, S.p.x); S.ps = Q55.ez(S.ps, S.pos, dt, 12); S.ths = Q55.ez(S.ths, S.p.th, dt, 10); },
    F(S) { return S.p.fk / Math.cos(Q55.d2r(S.p.th)); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), tr = Q55.d2r(S.ths), F = S.p.fk / Math.cos(tr), fc = S.p.fk, bx = g.sx + S.ps * g.u, cy = g.gy - g.bh / 2; Q55.bg(ctx, w, h);
      // graph F cosθ – x
      const ym = Math.max(20, Math.ceil(fc / 10) * 10 + 10), A = Q55.axes(ctx, { x: g.L + 70, y: 92, w: w - 440 - g.L, h: 190, x1: 8, y0: S.p.fr ? -ym : 0, y1: ym, xs: 1, ys: 10, lx: 1, ly: ym >= 40 ? 20 : 10, xl: 'x (m)', yl: 'F (N)', col: '#16a34a' });
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(22,163,74,.28)'; ctx.fillRect(A.X(0), A.Y(fc), A.X(S.ps) - A.X(0), A.Y(0) - A.Y(fc)); if (S.p.fr) { ctx.fillStyle = 'rgba(220,38,38,.25)'; ctx.fillRect(A.X(0), A.Y(0), A.X(S.ps) - A.X(0), A.Y(-fc) - A.Y(0)); } });
      Q52.plot(ctx, [[A.X(0), A.Y(fc)], [A.X(S.p.x), A.Y(fc)]], '#16a34a', 3); if (S.p.fr) Q52.plot(ctx, [[A.X(0), A.Y(-fc)], [A.X(S.p.x), A.Y(-fc)]], '#dc2626', 3);
      Q41.line(ctx, [[A.X(S.p.x), A.Y(fc)], [A.X(S.p.x), A.Y(S.p.fr ? -fc : 0)]], '#64748b', 1.2, [4, 3]);
      if (S.ps > .4) { Q42.T(ctx, 'W1 = ' + Q55.f(fc * S.ps, 0) + ' J', (A.X(0) + A.X(S.ps)) / 2, (A.Y(fc) + A.Y(0)) / 2, { s: 11, w: 900, c: '#14532d', bg: 'rgba(255,255,255,.8)' }); if (S.p.fr) Q42.T(ctx, 'W2 = −' + Q55.f(fc * S.ps, 0) + ' J', (A.X(0) + A.X(S.ps)) / 2, (A.Y(-fc) + A.Y(0)) / 2, { s: 11, w: 900, c: '#7f1d1d', bg: 'rgba(255,255,255,.8)' }); }
      Q42.T(ctx, 'F cosθ = ' + Q55.f(fc, 1) + ' N', A.X(S.p.x) + 6, A.Y(fc) - 12, { s: 10, w: 900, c: '#16a34a', a: 'left' });
      // scene
      Q55.floor(ctx, g.x0 - 10, w - 20, g.gy); Q55.rough(ctx, g.sx - 10, g.sx + g.bw + 8 * g.u + 10, g.gy + 1);
      Q55.mark(ctx, g.sx + g.bw / 2, g.gy, '0'); Q55.mark(ctx, g.sx + g.bw / 2 + S.p.x * g.u, g.gy, S.p.x + ' m', '#2563eb');
      Q55.crate(ctx, bx, g.gy, g.bw, g.bh);
      const ax = bx + g.bw, ay = cy, Lr = 170, hx = ax + Math.cos(tr) * Lr, hy = ay - Math.sin(tr) * Lr;
      K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(hx, hy); ctx.stroke(); });
      C2.hand(ctx, hx, hy, 1, .6, { rot: Math.atan2(ay - hy, ax - hx) }); Q41.knob(ctx, hx, hy, '#dc2626', 9);
      const k = 2.6; Q55.arrow(ctx, ax, ay, Math.cos(tr) * F * k, -Math.sin(tr) * F * k, '#dc2626', 'F', 3.4);
      if (S.ths > 2) Q55.arrow(ctx, ax, ay, fc * k, 0, 'rgba(37,99,235,.9)', 'Fcosθ', 2.6);
      Q55.arrow(ctx, bx + 10, g.gy - 6, -fc * k, 0, '#b45309', 'fk', 3);
      K.raw(ctx, () => { ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ax, ay, 34, -tr, 0); ctx.stroke(); });
      Q42.T(ctx, 'θ = ' + Math.round(S.ths) + '°', ax + 30, ay + 22, { s: 11, w: 900, c: '#7c3aed', bg: 'rgba(255,255,255,.85)' });
      if (S.ex) Q55.steps(ctx, S, Object.assign({ title: 'مثال 3 ص 97' }, EX, { k: S.k }));
      else Q55.card(ctx, S, [{ t: 'السرعة ثابتة لذلك:', c: '#334155', w: 800 }, { t: 'F cosθ = fk', mono: 1, c: '#334155', w: 800 }, { t: 'F = fk / cosθ = ' + Q55.f(D.F(S), 1) + ' N', mono: 1, c: '#dc2626', w: 900 }, { t: 'الإزاحة الآن = ' + Q55.f(S.ps, 2) + ' m', c: '#334155' }, { t: 'W1 = F cosθ × x = ' + Q55.f(fc * S.ps, 1) + ' J', mono: 1, c: '#16a34a', w: 900 }, { t: 'W2 = −fk × x = ' + Q55.f(-fc * S.ps, 1) + ' J', mono: 1, c: '#b45309', w: 900 }, { t: 'Wnet = 0', mono: 1, c: '#7c3aed', w: 900, s: 14 }, { t: 'الشغل = المساحة تحت مخطط القوة − الإزاحة', c: '#16a34a', w: 800 }], { title: 'الشكل 9: الشغل من المخطط' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'اسحب الصندوق أو المقبض الأحمر', '#16a34a');
    },
    chips(S, g) { return { p: Q55.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.pos >= S2.p.x) S2.pos = 0; S2.run = S2.run ? 0 : 1; }, S2 => { S2.pos = 0; S2.run = 0; }, { go: '▶ اسحب الصندوق' }),
      e: Q55.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 3: الحل خطوة خطوة', S2 => { setParam(S2, 'fk', 20); setParam(S2, 'th', 37); setParam(S2, 'x', 5); S2.pos = 0; S2.run = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), bx = g.sx + S.ps * g.u, tr = Q55.d2r(S.ths), ax = bx + g.bw, ay = g.gy - g.bh / 2;
      return [{ id: 'box', x: bx + g.bw / 2, y: ay, r: 34, axis: 'x', keep: true, tip: 'اسحب الصندوق', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.pos = clamp((d.x - g.bw / 2 - g.sx) / g.u, 0, S2.p.x); } },
        { id: 'th', x: ax + Math.cos(tr) * 170, y: ay - Math.sin(tr) * 170, r: 20, axis: 'xy', keep: true, hint: false, tip: 'اسحب لتغيير الزاوية', drag: (S2, d) => { setParam(S2, 'th', clamp(Math.round(Math.atan2(ay - d.y, d.x - ax) * 180 / Math.PI), 0, 60)); } }].concat(C.p, C.e); },
    readings(S) { const fc = S.p.fk; return [rd('القوة الساحبة F', Q55.f(D.F(S), 1) + ' N'), rd('F cosθ', Q55.f(fc, 1) + ' N'), rd('الإزاحة', Q55.f(S.pos, 2) + ' m'), rd('W1', Q55.f(fc * S.pos, 1) + ' J'), rd('W2', Q55.f(-fc * S.pos, 1) + ' J')]; },
    record(S) { return { th: S.p.th, F: Q55.f(D.F(S), 1), x: S.p.x, W1: Q55.f(S.p.fk * S.p.x, 1) }; },
    cols: [['th', 'θ (°)'], ['F', 'F (N)'], ['x', 'x (m)'], ['W1', 'W1 (J)']],
    explain(S) { return Q26.ex('المساحة الخضراء فوق المحور تساوي المساحة الحمراء تحته، فالشغل الكلي صفر.', 'الصندوق يتحرك بسرعة ثابتة فمحصلة القوى عليه صفر: المركبة الأفقية للقوة الساحبة تساوي قوة الاحتكاك وتعاكسها. لذا شغل القوة الساحبة موجب وشغل الاحتكاك سالب بالمقدار نفسه.', 'سحب حقيبة ذات عجلات بحبل مائل يحتاج قوة أكبر من سحبها أفقياً لأن جزءاً من القوة يكون شاقولياً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — القدرة: الحصان والرجل ومثال 4 المصعد (5-3، الشكل 11، ص 98–99) =============== */
(() => {
  const EX = { q: 'مصعد يرتفع بسرعة ثابتة مقدارها 0.7 m/s وقدرة محركه 20300 W. ما مقدار قوة الشد في حبل المصعد؟', lines: ['P = F v cosθ', 'الشد والسرعة للأعلى لذلك:', 'cosθ = cos0° = 1', '20300 = T × 0.7 × 1', 'T = 20300 / 0.7', 'T = 29000 N'] };
  const D = { id: 'g11_w_power', page: 98, fig: 'الشكل 11 + مثال 4',
    desc: 'القدرة هي المعدل الزمني لإنجاز الشغل: P = W / t ، ووحدتها الواط (Watt = J/s) ، ومن الوحدات الشائعة القدرة الحصانية 1 hp = 746 W. في الشكل 11 يرفع حصان ورجل ثقلين مختلفين مسافة 1 m في الزمن نفسه، فالحصان ينجز شغلاً أكبر وقدرته أكبر. والقدرة اللحظية للقوة الثابتة P = F v cosθ.',
    tags: 'القدرة P=W/t واط Watt J/s القدرة الحصانية hp 746W القدرة اللحظية P=Fvcosθ الشكل 11 حصان رجل بكرة مثال 4 مصعد 0.7m/s 20300W 29000N',
    tools: ['بكرة', 'حبل', 'ثقلان', 'ساعة توقيت', 'مسطرة مترية'],
    steps: ['«الشكل 11»: اضغط «▶ ارفع» فيرفع الحصان والرجل ثقليهما 1 m في الزمن نفسه.', 'قارن الشغل W = F × 1 m لكل منهما، ثم القدرة P = W / t. غيّر الزمن t من اللوحة.', '«مثال 4»: المصعد يرتفع بسرعة ثابتة. غيّر السرعة v والقدرة P وراقب قوة الشد T = P / v.', 'اضغط «مثال 4: الحل خطوة خطوة».'],
    concl: ['P = W / t ووحدتها الواط، و 1 hp = 746 W.', 'من ينجز الشغل نفسه في زمن أقل أو شغلاً أكبر في الزمن نفسه تكون قدرته أكبر.', 'القدرة اللحظية P = F v cosθ.', 'مثال 4: T = 20300 / 0.7 = 29000 N.'],
    laws: ['g11_l5_power', 'g11_l5_pinst'],
    controls: [R('t', 'زمن الرفع t (الشكل 11)', 1, 20, 5, 1, 's'), R('Fh', 'قوة الحصان', 500, 3000, 1800, 100, 'N'), R('Fm', 'قوة الرجل', 50, 600, 200, 10, 'N'), R('v', 'سرعة المصعد v', .2, 2, .7, .1, 'm/s'), R('P', 'قدرة محرك المصعد', 5000, 40000, 20300, 100, 'W')],
    setup(S) { S.md = 'fig'; S.tt = 0; S.run = 0; S.ey = 0; S.erun = 0; S.ex = 0; S.k = 0; S.tk = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, x1 = w - 350; return { w, h, L, x0, x1 }; },
    update(S, dt) { S.tk += dt; if (S.run) { S.tt += dt; if (S.tt >= S.p.t) { S.tt = S.p.t; S.run = 0; } } if (S.erun) { S.ey += S.p.v * dt; if (S.ey >= 12) { S.ey = 12; S.erun = 0; } } },
    horse(ctx, x, gy, ph) { // side view, facing right
      K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; const s = .9; ctx.translate(x, gy); ctx.scale(s, s);
        const legs = (o, c) => { ctx.strokeStyle = c; ctx.lineWidth = 8; [[-38, o], [34, -o]].forEach(q => { const sw = Math.sin(ph + q[1]) * 10; ctx.beginPath(); ctx.moveTo(q[0], -62); ctx.lineTo(q[0] + sw * .5, -30); ctx.lineTo(q[0] + sw, -3); ctx.stroke(); ctx.fillStyle = '#1f2937'; ctx.fillRect(q[0] + sw - 5, -5, 10, 5); }); };
        legs(Math.PI, '#5b3a1e');
        const gb = ctx.createLinearGradient(0, -100, 0, -50); gb.addColorStop(0, '#a16207'); gb.addColorStop(1, '#713f12'); ctx.fillStyle = gb; ctx.beginPath(); ctx.ellipse(0, -74, 54, 24, 0, 0, TAU); ctx.fill();
        ctx.beginPath(); ctx.moveTo(34, -88); ctx.quadraticCurveTo(52, -120, 66, -128); ctx.lineTo(80, -118); ctx.quadraticCurveTo(62, -100, 52, -72); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.ellipse(78, -118, 18, 9, .5, 0, TAU); ctx.fill(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(76, -124, 2, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#3f2a12'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(40, -100); ctx.quadraticCurveTo(52, -128, 64, -132); ctx.stroke();
        ctx.strokeStyle = '#3f2a12'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-52, -80); ctx.quadraticCurveTo(-72, -66, -66, -40); ctx.stroke();
        ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(26, -96); ctx.lineTo(26, -54); ctx.moveTo(-8, -96); ctx.lineTo(30, -96); ctx.stroke();
        legs(0, '#78350f'); ctx.restore(); });
      return [x + 24 * .9, gy - 96 * .9];
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q55.bg(ctx, w, h); let L, title;
      if (S.md === 'fig') {
        const f = clamp(S.tt / S.p.t, 0, 1), up = 100 * f, rows = [[70, S.p.Fh, 'الحصان', 'h'], [330, S.p.Fm, 'الرجل', 'm']];
        rows.forEach(r => { const y0 = r[0], gy = y0 + 220, px = g.x0 + 80, py = y0 + 26;
          K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; rr(ctx, g.x0 - 10, y0 - 6, g.x1 - g.x0 + 20, 236, 12); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.fillRect(px - 3, py, 6, gy - py); });
          Q55.floor(ctx, g.x0, g.x1 + 10, gy, { h: 8 });
          const lw = r[3] === 'h' ? 46 : 22, lh = r[3] === 'h' ? 40 : 22, ly = gy - up, lx = px - 22;
          Q55.block(ctx, lx - lw / 2, ly, lw, lh, '#475569'); K.raw(ctx, () => { ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, ly - lh); ctx.lineTo(px - 14, py + 8); ctx.stroke(); });
          Q55.pulley(ctx, px, py + 8, 14);
          let hand; if (r[3] === 'h') hand = D.horse(ctx, g.x1 - 140 + f * 50, gy, S.run ? S.tk * 6 : 0);
          else { const fx = g.x1 - 110 + f * 50; Q55.man(ctx, fx, gy, { H: 150, dir: -1, lean: -6, hands: [[fx - 26, gy - 110], [fx - 20, gy - 106]], col: '#f59e0b' }); hand = [fx - 26, gy - 110]; }
          K.raw(ctx, () => { ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px + 4, py - 5); ctx.lineTo(hand[0], hand[1]); ctx.stroke(); });
          Q55.arrow(ctx, lx - lw / 2 - 18, gy, 0, -up - 2, '#2563eb', '', 2.4); Q42.T(ctx, 'x = ' + Q55.f(f, 2) + ' m', lx - lw / 2 - 18, gy - 116, { s: 10, w: 900, c: '#2563eb', bg: 'rgba(255,255,255,.85)' });
          Q52.watch(ctx, g.x0 + 190, y0 + 46, 22, S.tt, Q55.f(S.tt, 1) + ' s', S.p.t);
          Q42.T(ctx, r[2] + ': F = ' + r[1] + ' N', (g.x0 + g.x1) / 2 + 40, y0 + 18, { s: 12, w: 900, c: '#fff', bg: r[3] === 'h' ? '#92400e' : '#d97706' }); });
        const Wh = S.p.Fh, Wm = S.p.Fm, t = S.p.t; title = 'الشكل 11: الحصان والرجل';
        L = [{ t: 'كلاهما يرفع ثقله 1 m في ' + t + ' s', c: '#334155', w: 800 }, { t: 'شغل الحصان = ' + Wh + ' J', c: '#92400e', w: 900 }, { t: 'شغل الرجل = ' + Wm + ' J', c: '#d97706', w: 900 }, { t: 'قدرة الحصان = ' + Q55.f(Wh / t, 1) + ' W', c: '#92400e', w: 900 }, { t: 'قدرة الرجل = ' + Q55.f(Wm / t, 1) + ' W', c: '#d97706', w: 900 }, { t: 'P = W / t', mono: 1, c: '#16a34a', w: 900, s: 14 }, { t: 'بالحصانية: ' + Q55.f(Wh / t / 746, 2) + ' hp و ' + Q55.f(Wm / t / 746, 3) + ' hp', c: '#334155' }, { t: 'الحصان أنجز شغلاً أكبر في الزمن نفسه فقدرته أكبر', c: '#16a34a', w: 800 }];
      } else {
        const sx = g.x0 + 60, sw = 150, top = 96, bot = h - 250, pm = (bot - top - 90) / 12, cyb = bot - S.ey * pm, T = S.p.P / S.p.v;
        K.raw(ctx, () => { const gs = ctx.createLinearGradient(sx, 0, sx + sw, 0); gs.addColorStop(0, '#cbd5e1'); gs.addColorStop(.5, '#f1f5f9'); gs.addColorStop(1, '#94a3b8'); ctx.fillStyle = gs; ctx.fillRect(sx, top, sw, bot - top); ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.strokeRect(sx, top, sw, bot - top);
          ctx.fillStyle = '#334155'; rr(ctx, sx + sw / 2 - 40, top - 30, 80, 34, 6); ctx.fill(); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(sx + sw / 2, top - 13, 11, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; const a = S.tk * S.p.v * 4 * (S.erun ? 1 : 0); ctx.beginPath(); ctx.moveTo(sx + sw / 2, top - 13); ctx.lineTo(sx + sw / 2 + Math.cos(a) * 10, top - 13 + Math.sin(a) * 10); ctx.stroke();
          ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx + sw / 2, top + 2); ctx.lineTo(sx + sw / 2, cyb - 84); ctx.stroke();
          const gc = ctx.createLinearGradient(sx + 10, 0, sx + sw - 10, 0); gc.addColorStop(0, '#64748b'); gc.addColorStop(.5, '#e2e8f0'); gc.addColorStop(1, '#475569'); ctx.fillStyle = gc; ctx.fillRect(sx + 12, cyb - 84, sw - 24, 84); ctx.fillStyle = 'rgba(15,23,42,.25)'; ctx.fillRect(sx + sw / 2 - 1, cyb - 76, 2, 72); ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.strokeRect(sx + 12, cyb - 84, sw - 24, 84);
          for (let k = 0; k <= 12; k += 2) { ctx.fillStyle = '#475569'; ctx.fillRect(sx + sw + 4, bot - k * pm - 1, 10, 2); } });
        for (let k = 0; k <= 12; k += 4) Q42.T(ctx, k + ' m', sx + sw + 32, bot - k * pm, { s: 9.5, w: 800, c: '#475569' });
        Q55.arrow(ctx, sx + sw / 2 + 30, cyb - 84, 0, -60, '#dc2626', 'T', 3.4); Q55.arrow(ctx, sx - 24, cyb - 40, 0, -46, '#2563eb', 'v', 3);
        Q52.speedo(ctx, sx + sw + 105, 160, 46, S.p.v, 2, 'm/s', 'السرعة');
        Q43.gauge(ctx, sx + sw + 105, 300, 44, S.p.P / 40000, 'P = ' + Q55.n(S.p.P) + ' W', '#16a34a');
        title = 'مثال 4: المصعد'; L = [{ t: 'P = F v cosθ', mono: 1, w: 900, s: 14 }, { t: 'الزاوية صفر لأن الشد والسرعة للأعلى', c: '#334155' }, { t: 'v = ' + Q55.f(S.p.v, 1) + ' m/s', mono: 1, c: '#2563eb', w: 800 }, { t: 'P = ' + Q55.n(S.p.P) + ' W = ' + Q55.f(S.p.P / 746, 1) + ' hp', mono: 1, c: '#16a34a', w: 800 }, { t: 'T = P / v = ' + Q55.n(T) + ' N', mono: 1, c: '#dc2626', w: 900, s: 14 }, { t: 'كلما زادت السرعة بالقدرة نفسها قلّت قوة الشد', c: '#16a34a', w: 800 }];
      }
      if (S.ex) Q55.steps(ctx, S, Object.assign({ title: 'مثال 4 ص 99' }, EX, { k: S.k })); else Q55.card(ctx, S, L, { title });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, S.md === 'fig' ? 'اضغط «▶ ارفع» وقارن القدرتين' : 'غيّر السرعة والقدرة من اللوحة الجانبية', '#16a34a');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['fig', 'الشكل 11: الحصان والرجل'], ['lift', 'مثال 4: المصعد']], g.h - 172, S.md, (S2, k) => { S2.md = k; S2.ex = 0; }, { bw: 210, col: '#16a34a' }),
      p: S.md === 'fig' ? Q55.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.tt >= S2.p.t) S2.tt = 0; S2.run = S2.run ? 0 : 1; }, S2 => { S2.tt = 0; S2.run = 0; }, { go: '▶ ارفع' }) : Q55.play(S, 'pe', g.h - 128, S.erun, S2 => { if (S2.ey >= 12) S2.ey = 0; S2.erun = S2.erun ? 0 : 1; }, S2 => { S2.ey = 0; S2.erun = 0; }, { go: '▶ شغّل المصعد' }),
      e: Q55.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 4: الحل خطوة خطوة', S2 => { S2.md = 'lift'; setParam(S2, 'v', .7); setParam(S2, 'P', 20300); S2.ey = 0; S2.erun = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), out = [];
      if (S.md === 'fig') out.push({ id: 'clock', x: g.x0 + 190, y: 116, r: 26, axis: 'none', keep: true, tip: 'اضغط لتشغيل الساعتين', idle: 'اضغط ✋', click: S2 => { if (S2.tt >= S2.p.t) S2.tt = 0; S2.run = 1; } });
      else { const top = 96, bot = g.h - 250, pm = (bot - top - 90) / 12; out.push({ id: 'car', x: g.x0 + 135, y: bot - S.ey * pm - 42, r: 34, axis: 'y', keep: true, tip: 'اسحب المصعد', idle: 'اسحب ✋', drag: (S2, d) => { S2.erun = 0; S2.ey = clamp((bot - d.y - 42) / pm, 0, 12); } }); }
      return out.concat(C.m, C.p, C.e); },
    readings(S) { return S.md === 'fig' ? [rd('الزمن', Q55.f(S.tt, 1) + ' s'), rd('قدرة الحصان', Q55.f(S.p.Fh / S.p.t, 1) + ' W'), rd('قدرة الرجل', Q55.f(S.p.Fm / S.p.t, 1) + ' W')] : [rd('السرعة', Q55.f(S.p.v, 1) + ' m/s'), rd('القدرة', S.p.P + ' W'), rd('قوة الشد', Q55.f(S.p.P / S.p.v, 0) + ' N'), rd('الارتفاع', Q55.f(S.ey, 1) + ' m')]; },
    record(S) { return { t: S.p.t, Ph: Q55.f(S.p.Fh / S.p.t, 1), Pm: Q55.f(S.p.Fm / S.p.t, 1) }; },
    cols: [['t', 't (s)'], ['Ph', 'P الحصان (W)'], ['Pm', 'P الرجل (W)']],
    explain(S) { return Q26.ex('الحصان والرجل يرفعان ثقليهما المسافة نفسها في الزمن نفسه، لكن قدرة الحصان أكبر بكثير.', 'القدرة هي الشغل المنجز في وحدة الزمن P = W / t. الحصان يؤثر بقوة أكبر فينجز شغلاً أكبر في الزمن نفسه. وللقوة الثابتة P = F v cosθ.', 'تقاس قدرة محركات السيارات بالحصان، و 1 hp = 746 W.'); }
  };
  M8.P[D.id] = D;
})();

/* path helpers for tracks: keys [[x, h, 'l'?], ...] in metres (cosine-smoothed between keys, 'l' = straight segment) */
Object.assign(Q55, {
  path(keys, n = 30) { const P = []; for (let i = 0; i < keys.length - 1; i++) { const a = keys[i], b = keys[i + 1], lin = b[2] === 'l'; for (let j = i ? 1 : 0; j <= n; j++) { const t = j / n, e = lin ? t : (1 - Math.cos(Math.PI * t)) / 2; P.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * e]); } }
    let s = 0; P[0][2] = 0; for (let i = 1; i < P.length; i++) { s += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); P[i][2] = s; } return { P, len: s, n, keys }; },
  at(T, s) { const P = T.P; s = clamp(s, 0, T.len); let lo = 0, hi = P.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (P[m][2] <= s) lo = m; else hi = m; } const a = P[lo], b = P[hi], f = (s - a[2]) / ((b[2] - a[2]) || 1); return { x: a[0] + (b[0] - a[0]) * f, h: a[1] + (b[1] - a[1]) * f, ang: Math.atan2(b[1] - a[1], b[0] - a[0]) }; },
  sAtX(T, x) { const P = T.P; if (x <= P[0][0]) return 0; for (let i = 1; i < P.length; i++) if (P[i][0] >= x) { const a = P[i - 1], b = P[i], f = (x - a[0]) / ((b[0] - a[0]) || 1); return a[2] + (b[2] - a[2]) * clamp(f, 0, 1); } return T.len; },
  sKey(T, i) { return T.P[Math.min(T.P.length - 1, i * T.n)][2]; },
  view(T, x0, x1, yt, gy, o = {}) { const P = T.P, mx = o.xm != null ? o.xm : P[0][0], Mx = P[P.length - 1][0] + (o.xp || 0), Mh = Math.max(...P.map(p => p[1])) + (o.hp || 0), k = Math.min((x1 - x0) / (Mx - mx), (gy - yt) / Mh), ox = x0 + ((x1 - x0) - (Mx - mx) * k) / 2 - mx * k; return { k, X: x => ox + x * k, Y: hh => gy - hh * k, gy }; },
  /* draw a track line with filled body below it */
  trackDraw(ctx, T, V, o = {}) {
    K.raw(ctx, () => { const P = T.P; ctx.beginPath(); ctx.moveTo(V.X(P[0][0]), V.gy); P.forEach(p => ctx.lineTo(V.X(p[0]), V.Y(p[1]))); ctx.lineTo(V.X(P[P.length - 1][0]), V.gy); ctx.closePath();
      const g = ctx.createLinearGradient(0, V.Y(Math.max(...P.map(p => p[1]))), 0, V.gy); g.addColorStop(0, o.c0 || '#fdba74'); g.addColorStop(1, o.c1 || '#c2410c'); ctx.fillStyle = g; ctx.globalAlpha = o.a || .85; ctx.fill(); ctx.globalAlpha = 1;
      ctx.strokeStyle = o.rail || '#7c2d12'; ctx.lineWidth = o.lw || 4; ctx.lineJoin = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(V.X(p[0]), V.Y(p[1])) : ctx.moveTo(V.X(p[0]), V.Y(p[1]))); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1.2; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(V.X(p[0]), V.Y(p[1]) + 3) : ctx.moveTo(V.X(p[0]), V.Y(p[1]) + 3)); ctx.stroke(); });
  },
  /* ground slab */
  ground(ctx, x0, x1, y) { K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + 12); g.addColorStop(0, '#a8a29e'); g.addColorStop(1, '#57534e'); ctx.fillStyle = g; ctx.fillRect(x0, y, x1 - x0, 12); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x0, y, x1 - x0, 1.5); }); },
  /* nice step for axes */
  nice(v) { const p = Math.pow(10, Math.floor(Math.log10(v || 1))), r = v / p; return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * p; },
  /* rail cart (x centre, yg rail top, width bw) */
  cart(ctx, x, yg, bw, col, lab, rot = 0) {
    const bh = Math.max(34, bw * .45);
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const g = ctx.createLinearGradient(0, yg - bh - 10, 0, yg - 10); g.addColorStop(0, shade(col, 40)); g.addColorStop(.5, col); g.addColorStop(1, shade(col, -40)); ctx.fillStyle = g; rr(ctx, x - bw / 2, yg - bh - 12, bw, bh, 6); ctx.fill(); ctx.restore();
      ctx.strokeStyle = 'rgba(15,23,42,.45)'; ctx.lineWidth = 1; rr(ctx, x - bw / 2, yg - bh - 12, bw, bh, 6); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(x - bw / 2 + 5, yg - bh - 9, bw - 10, 4);
      ctx.fillStyle = '#334155'; ctx.fillRect(x - bw / 2 - 6, yg - 22, 6, 8); ctx.fillRect(x + bw / 2, yg - 22, 6, 8);
      [x - bw / 2 + 14, x + bw / 2 - 14].forEach(wx => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(wx, yg - 7, 7, 0, TAU); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.4; for (let k = 0; k < 3; k++) { const a = rot + k * TAU / 3; ctx.beginPath(); ctx.moveTo(wx, yg - 7); ctx.lineTo(wx + Math.cos(a) * 6, yg - 7 + Math.sin(a) * 6); ctx.stroke(); } }); });
    if (lab) Q42.T(ctx, lab, x, yg - bh / 2 - 12, { s: 11, w: 900, c: '#fff' });
  }
});

/* =============== C1 — الطاقة الحركية ومبرهنة الشغل − الطاقة + مثال 5 (5-4، الشكل 13، ص 100–101) =============== */
(() => {
  const EX = { q: 'سيارة كتلتها 2000 kg تتحرك بسرعة 20 m/s ، ضغط سائقها على الفرامل فتوقفت بعد أن قطعت مسافة 100 m. احسب التغير في طاقتها الحركية والشغل المنجز ومقدار قوة الفرامل.', lines: ['KEi = ½ m vi² = ½ × 2000 × 20²', 'KEi = 400 000 J', 'السيارة توقفت لذلك KEf = 0', 'ΔKE = 0 − 400 000 = −400 000 J', 'W = ΔKE = −400 000 J', 'W = f x cos180°', '−400 000 = f × 100 × (−1)', 'f = 4000 N'] };
  const D = { id: 'g11_w_ke', page: 100, fig: 'الشكل 13 + مثال 5',
    desc: 'الطاقة الحركية طاقة يمتلكها الجسم بسبب حركته: KE = ½ m v². وتنص مبرهنة الشغل − الطاقة على أن الشغل الذي تنجزه القوة المحصلة على جسم يساوي التغير في طاقته الحركية: W = ½ m vf² − ½ m vi² = ΔKE. القوة باتجاه الحركة تنجز شغلاً موجباً فتزيد الطاقة الحركية، والقوة المعاكسة كالفرامل تنجز شغلاً سالباً فتنقصها.',
    tags: 'الطاقة الحركية KE=½mv² مبرهنة الشغل الطاقة W=ΔKE الشكل 13 مثال 5 سيارة 2000kg 20m/s 100m فرامل 4000N −400000J',
    tools: ['عربة', 'مسار أفقي', 'ميزان نابضي', 'مسطرة مترية', 'ساعة توقيت'],
    steps: ['«الشكل 13»: قوة ثابتة F باتجاه الحركة تؤثر على السيارة مسافة x. اضغط «▶ انطلق» وراقب الطاقة الحركية تزداد.', '«مثال 5»: قوة الفرامل تعاكس الحركة فتنقص الطاقة الحركية حتى تتوقف السيارة.', 'اسحب السيارة على الطريق لترى KE والشغل عند أي موضع، ولاحظ أن W = ΔKE دائماً.', 'غيّر الكتلة والسرعة والقوة من اللوحة، ثم اضغط «مثال 5: الحل خطوة خطوة».'],
    concl: ['KE = ½ m v² وحدتها الجول، وتتناسب مع مربع السرعة.', 'W = ½ m vf² − ½ m vi² = ΔKE (مبرهنة الشغل − الطاقة).', 'مثال 5: ΔKE = −400 000 J و W = −400 000 J و f = 4000 N.'],
    laws: ['g11_l5_ke', 'g11_l5_work'],
    controls: [R('m', 'كتلة السيارة m', 500, 3000, 2000, 100, 'kg'), R('vi', 'السرعة الابتدائية vi', 0, 30, 20, 1, 'm/s'), R('F', 'مقدار القوة F', 1000, 10000, 4000, 100, 'N'), R('x', 'طول المسار x', 20, 150, 100, 5, 'm')],
    setup(S) { S.md = 'brk'; S.s = 0; S.ss = 0; S.run = 0; S.ex = 0; S.k = 0; S.rot = 0; },
    acc(S) { return (S.md === 'brk' ? -1 : 1) * S.p.F / S.p.m; },
    vAt(S, s) { return Math.sqrt(Math.max(0, S.p.vi * S.p.vi + 2 * D.acc(S) * s)); },
    send(S) { const a = D.acc(S); return a < 0 ? Math.min(S.p.x, S.p.vi * S.p.vi / (-2 * a)) : S.p.x; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 40, x1 = w - 40, gy = h - 230; return { w, h, L, x0, x1, gy, X: s => x0 + 60 + s / S.p.x * (x1 - x0 - 130) }; },
    update(S, dt) { const e = D.send(S); if (S.run) { const v = Math.max(D.vAt(S, S.s), S.md === 'acc' ? .5 : 0); S.s += v * dt; if (S.s >= e - 1e-6 || (S.md === 'brk' && v < .02)) { S.s = e; S.run = 0; } } S.s = Math.min(S.s, e); const o = S.ss; S.ss = Q55.ez(S.ss, S.s, dt, 12); S.rot += (S.ss - o) * .9; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), m = S.p.m, vi = S.p.vi, s = S.ss, v = D.vAt(S, s), KEi = .5 * m * vi * vi, KE = .5 * m * v * v, Wk = KE - KEi, e = D.send(S), brk = S.md === 'brk';
      Q55.bg(ctx, w, h);
      // KE – x graph
      const KEe = .5 * m * D.vAt(S, e) ** 2, ym = Math.max(10, Math.max(KEi, KEe, .5 * m * D.vAt(S, S.p.x) ** 2) / 1000 * 1.1), ys = Q55.nice(ym / 4);
      const A = Q55.axes(ctx, { x: g.L + 70, y: 92, w: w - 450 - g.L, h: 190, x1: S.p.x, y0: 0, y1: Math.ceil(ym / ys) * ys, xs: Q55.nice(S.p.x / 6), ys, xl: 'x (m)', yl: 'KE (kJ)', col: '#0284c7' }), P = [];
      for (let k = 0; k <= 60; k++) { const xx = e * k / 60; P.push([A.X(xx), A.Y(.5 * m * D.vAt(S, xx) ** 2 / 1000)]); }
      Q52.plot(ctx, P, '#0284c7', 2.6); Q41.dot(ctx, A.X(s), A.Y(KE / 1000), '#dc2626', 6);
      Q41.line(ctx, [[A.X(s), A.Y(KE / 1000)], [A.X(s), A.Y(KEi / 1000)]], brk ? '#dc2626' : '#16a34a', 2, [4, 3]);
      if (Math.abs(Wk) > 1) Q42.T(ctx, 'W = ' + Q55.n(Wk) + ' J', A.X(s) + (s > S.p.x * .6 ? -60 : 60), (A.Y(KE / 1000) + A.Y(KEi / 1000)) / 2, { s: 10, w: 900, c: brk ? '#b91c1c' : '#15803d', bg: 'rgba(255,255,255,.85)' });
      // road + car
      Q52.road(ctx, g.x0, g.x1, g.gy, 34, 0);
      if (brk && s > .5) K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.55)'; ctx.fillRect(g.X(0) - 27 * 1.4, g.gy + 4, g.X(s) - g.X(0), 3); ctx.fillRect(g.X(0) + 28 * 1.4 - 30, g.gy + 4, Math.max(0, g.X(s) - g.X(0)), 3); });
      Q55.mark(ctx, g.X(0), g.gy + 18, 'vi', '#2563eb'); Q55.mark(ctx, g.X(S.p.x), g.gy + 18, 'x = ' + S.p.x + ' m', '#7c3aed');
      if (brk && e < S.p.x - .5) Q55.mark(ctx, g.X(e), g.gy + 18, 'توقف', '#dc2626');
      const cx = g.X(s); Q52.car(ctx, cx, g.gy, 1.45, '#dc2626', S.rot, 1);
      const fl = 30 + S.p.F / 10000 * 90; Q55.arrow(ctx, brk ? cx - 66 : cx + 66, g.gy - 30, brk ? -fl : fl, 0, brk ? '#b45309' : '#16a34a', brk ? 'f' : 'F', 3.4);
      if (v > .05) Q55.arrow(ctx, cx - 20, g.gy - 92, 14 + v * 4, 0, '#2563eb', 'v', 3);
      Q52.speedo(ctx, g.x0 + 60, g.gy - 150, 40, v, 40, 'm/s', 'السرعة');
      if (S.ex) Q55.steps(ctx, S, Object.assign({ title: 'مثال 5 ص 101' }, EX, { k: S.k }));
      else Q55.card(ctx, S, [{ t: 'KE = ½ m v²', mono: 1, w: 900, s: 14 }, { t: 'KEi = ' + Q55.n(KEi) + ' J', mono: 1, c: '#0284c7', w: 800 }, { t: 'v = ' + Q55.f(v, 2) + ' m/s', mono: 1, c: '#2563eb', w: 800 }, { t: 'KE = ' + Q55.n(KE) + ' J', mono: 1, c: '#0284c7', w: 900 }, { t: 'شغل القوة على المسافة المقطوعة:', c: '#334155', w: 800 }, { t: 'W = ' + (brk ? '−' : '') + 'F × ' + Q55.f(s, 1) + ' = ' + Q55.n(Wk) + ' J', mono: 1, c: brk ? '#b91c1c' : '#15803d', w: 900 }, { t: 'ΔKE = ' + Q55.n(KE - KEi) + ' J', mono: 1, c: '#7c3aed', w: 900 }, { t: 'الشغل يساوي التغير في الطاقة الحركية', c: '#16a34a', w: 800 }], { title: brk ? 'مثال 5: قوة الفرامل' : 'الشكل 13: قوة باتجاه الحركة' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'اسحب السيارة أو اضغط «▶ انطلق»', '#0284c7');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['acc', 'الشكل 13: قوة مع الحركة'], ['brk', 'مثال 5: قوة الفرامل']], g.h - 172, S.md, (S2, k) => { S2.md = k; S2.s = 0; S2.run = 0; S2.ex = 0; }, { bw: 220, col: '#0284c7' }),
      p: Q55.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.s >= D.send(S2) - 1e-6) S2.s = 0; S2.run = S2.run ? 0 : 1; }, S2 => { S2.s = 0; S2.run = 0; }, { go: '▶ انطلق' }),
      e: Q55.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 5: الحل خطوة خطوة', S2 => { S2.md = 'brk'; setParam(S2, 'm', 2000); setParam(S2, 'vi', 20); setParam(S2, 'F', 4000); setParam(S2, 'x', 100); S2.s = 0; S2.run = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'car', x: g.X(S.ss), y: g.gy - 30, r: 40, axis: 'x', keep: true, tip: 'اسحب السيارة على الطريق', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.s = clamp((d.x - g.x0 - 60) / (g.x1 - g.x0 - 130) * S2.p.x, 0, D.send(S2)); } }].concat(C.m, C.p, C.e); },
    readings(S) { const v = D.vAt(S, S.s); return [rd('السرعة', Q55.f(v, 2) + ' m/s'), rd('الطاقة الحركية', Q55.n(.5 * S.p.m * v * v) + ' J'), rd('المسافة', Q55.f(S.s, 1) + ' m'), rd('الشغل W', Q55.n(.5 * S.p.m * (v * v - S.p.vi * S.p.vi)) + ' J')]; },
    record(S) { const e = D.send(S), v = D.vAt(S, e); return { m: S.p.m, vi: S.p.vi, F: S.p.F, d: Q55.f(e, 1), vf: Q55.f(v, 2) }; },
    cols: [['m', 'm (kg)'], ['vi', 'vi (m/s)'], ['F', 'F (N)'], ['d', 'x (m)'], ['vf', 'vf (m/s)']],
    explain(S) { return Q26.ex(S.md === 'brk' ? 'تتباطأ السيارة حتى تتوقف، وتنقص طاقتها الحركية بمقدار يساوي شغل الفرامل.' : 'تتسارع السيارة وتزداد طاقتها الحركية بمقدار يساوي شغل القوة.', 'مبرهنة الشغل − الطاقة: الشغل الذي تنجزه القوة المحصلة يساوي التغير في الطاقة الحركية W = ΔKE. شغل الفرامل سالب لأن القوة تعاكس الإزاحة.', 'مضاعفة سرعة السيارة تجعل طاقتها الحركية أربعة أمثال، فتحتاج مسافة توقف أربعة أمثال بالقوة نفسها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — الطاقة الكامنة التثاقلية: الشكل 15 ومثال 6 ومستوى الإسناد (ص 102–104) =============== */
(() => {
  const EX = { q: 'كتاب كتلته 3 kg رُفع من سطح الأرض إلى رف ارتفاعه 2 m. احسب طاقته الكامنة التثاقلية على الأرض وعلى الرف والتغير فيها. اعتبر g = 10 m/s².', lines: ['مستوى الإسناد سطح الأرض', 'GPE1 = m g h1 = 3 × 10 × 0 = 0', 'GPE2 = m g h2 = 3 × 10 × 2 = 60 J', 'ΔGPE = 60 − 0 = 60 J', 'سؤال: مستوى الإسناد عند الرف', 'GPE1 = 3 × 10 × (−2) = −60 J', 'GPE2 = 3 × 10 × 0 = 0', 'ΔGPE = 0 − (−60) = 60 J', 'التغير لا يعتمد على مستوى الإسناد'] };
  const D = { id: 'g11_w_pe', page: 102, fig: 'الشكل 15 + مثال 6 + سؤال ص 104',
    desc: 'الطاقة الكامنة التثاقلية طاقة يمتلكها الجسم بسبب موقعه: GPE = m g h ، حيث h الارتفاع عن مستوى إسناد نختاره. في الشكل 15 كتلتان متساويتان على بكرتين: عندما تنزل B مسافة h ترتفع A المسافة نفسها، فالشغل الذي ينجزه وزن B يساوي m g h ويُختزن في A طاقة كامنة. قيمة GPE تعتمد على مستوى الإسناد، أما التغير فيها فلا يعتمد عليه.',
    tags: 'الطاقة الكامنة التثاقلية GPE=mgh مستوى الإسناد الشكل 15 بكرتان كتلتان متساويتان مثال 6 كتاب 3kg رف 2m 60J سؤال ص 104 الشلالات توربينات',
    tools: ['بكرتان', 'خيط', 'ثقلان متساويان', 'كتاب', 'رف', 'مسطرة مترية'],
    steps: ['«الشكل 15»: اسحب الثقل B للأسفل: يرتفع A المسافة نفسها h. قارن شغل وزن B بالطاقة المختزنة في A.', '«مثال 6»: اسحب الكتاب من الأرض إلى الرف وراقب GPE.', 'اسحب خط مستوى الإسناد (أو اضغط «الرف مستوى إسناد»): تتغير قيمتا GPE لكن التغير يبقى 60 J.', 'اضغط «مثال 6: الحل خطوة خطوة».'],
    concl: ['GPE = m g h ، و h تقاس من مستوى الإسناد.', 'الشغل اللازم لرفع جسم بسرعة ثابتة يساوي الزيادة في طاقته الكامنة m g h.', 'مثال 6: GPE على الأرض = 0 وعلى الرف = 60 J والتغير 60 J.', 'التغير في GPE لا يعتمد على مستوى الإسناد.'],
    laws: ['g11_l5_gpe'],
    controls: [R('m', 'الكتلة m', 1, 10, 3, 1, 'kg'), R('ref', 'ارتفاع مستوى الإسناد', 0, 2, 0, .5, 'm'), R('hs', 'ارتفاع الرف', 1, 2.5, 2, .5, 'm')],
    setup(S) { S.md = 'book'; S.hb = 0; S.th = 0; S.d = 0; S.td = 0; S.rs = 0; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, x1 = w - 350, gy = h - 200; return { w, h, L, x0, x1, gy, u: (gy - 120) / 2.6 }; },
    update(S, dt) { S.th = Math.min(S.th, S.p.hs); S.hb = Q55.ez(S.hb, S.th, dt, 7); S.d = Q55.ez(S.d, S.td, dt, 5); S.rs = Q55.ez(S.rs, S.p.ref, dt, 10); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), m = S.p.m, G = 10; Q55.bg(ctx, w, h); let L, title;
      if (S.md === 'book') {
        Q55.floor(ctx, g.x0 - 10, g.x1 + 20, g.gy); const sx = g.x1 - 150, shy = g.gy - S.p.hs * g.u;
        // bookcase
        K.raw(ctx, () => { const gw = ctx.createLinearGradient(sx, 0, sx + 150, 0); gw.addColorStop(0, '#92400e'); gw.addColorStop(.5, '#b45309'); gw.addColorStop(1, '#78350f'); ctx.fillStyle = gw; ctx.fillRect(sx, shy - 4, 12, g.gy - shy + 4); ctx.fillRect(sx + 138, shy - 4, 12, g.gy - shy + 4); ctx.fillRect(sx, shy, 150, 12); ctx.fillRect(sx, (shy + g.gy) / 2, 150, 10);
          ['#1d4ed8', '#16a34a', '#be185d', '#ca8a04'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(sx + 16 + i * 14, (shy + g.gy) / 2 - 46 + (i % 2) * 6, 12, 46 - (i % 2) * 6); }); });
        // book
        const bx = sx + 50, by = g.gy - S.hb * g.u - (S.hb > S.p.hs - .02 ? 0 : 0);
        K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2; const gb = ctx.createLinearGradient(bx, by - 22, bx, by); gb.addColorStop(0, '#f87171'); gb.addColorStop(1, '#991b1b'); ctx.fillStyle = gb; rr(ctx, bx, by - 22, 76, 22, 3); ctx.fill(); ctx.restore(); ctx.fillStyle = '#fef3c7'; ctx.fillRect(bx + 4, by - 6, 68, 4); ctx.fillStyle = '#fde68a'; ctx.fillRect(bx + 4, by - 18, 20, 2); });
        Q42.T(ctx, m + ' kg', bx + 38, by - 12, { s: 10, w: 900, c: '#fff' });
        // reference level
        const ry = g.gy - S.rs * g.u; Q41.line(ctx, [[g.x0, ry], [g.x1 + 10, ry]], '#7c3aed', 2, [8, 5]); Q41.knob(ctx, g.x0 + 20, ry, '#7c3aed', 9); Q42.T(ctx, 'مستوى الإسناد h = 0', g.x0 + 110, ry - 12, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' });
        const hh = S.hb - S.rs; if (Math.abs(hh) > .04) Q55.dim(ctx, bx - 26, ry, bx - 26, by, 'h = ' + Q55.f(hh, 2) + ' m', '#0284c7', { dx: -46 });
        Q55.dim(ctx, sx - 14, g.gy, sx - 14, shy, S.p.hs + ' m', '#475569', { dx: 0 });
        const E1 = m * G * (0 - S.p.ref), E2 = m * G * (S.p.hs - S.p.ref), E = m * G * hh;
        Q55.bars(ctx, g.L + 60, 120, 150, [['GPE', E, '#0284c7', Q55.f(E, 0) + ' J']], Math.max(10, m * G * 2.5), { neg: 1, title: 'GPE الآن', bw: 48 });
        title = 'مثال 6: الكتاب والرف'; L = [{ t: 'GPE = m g h', mono: 1, w: 900, s: 14 }, { t: 'h = ' + Q55.f(hh, 2) + ' m', mono: 1, c: '#0284c7', w: 800 }, { t: 'GPE = ' + Q55.f(E, 1) + ' J', mono: 1, c: '#0284c7', w: 900 }, { t: 'على الأرض وعلى الرف:', c: '#334155', w: 800 }, { t: 'GPE1 = ' + Q55.f(E1, 0) + ' J    GPE2 = ' + Q55.f(E2, 0) + ' J', mono: 1, c: '#334155', w: 800 }, { t: 'ΔGPE = ' + Q55.f(E2 - E1, 0) + ' J', mono: 1, c: '#b91c1c', w: 900, s: 14 }, { t: 'غيّر مستوى الإسناد: التغير يبقى نفسه', c: '#16a34a', w: 800 }];
      } else {
        const top = 112, p1 = g.x0 + 120, p2 = g.x0 + 300, H = 1.5, hA = .25 + S.d, hB = .25 + H - S.d, yA = g.gy - hA * g.u * .9, yB = g.gy - hB * g.u * .9, mw = 30 + m * 3;
        Q55.floor(ctx, g.x0 - 10, g.x1 + 20, g.gy, { c0: '#94a3b8', c1: '#475569' });
        K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.x0 + 40, top - 26, 360, 10); ctx.fillRect(g.x0 + 40, top - 26, 10, g.gy - top + 26); ctx.fillStyle = '#334155'; [p1, p2].forEach(x => ctx.fillRect(x - 3, top - 18, 6, 16)); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p1 - 16, yA - mw * .7); ctx.lineTo(p1 - 16, top); ctx.arc(p1, top, 16, Math.PI, Math.PI * 1.5); ctx.lineTo(p2, top - 16); ctx.arc(p2, top, 16, -Math.PI / 2, 0); ctx.lineTo(p2 + 16, yB - mw * .7); ctx.stroke(); });
        Q55.pulley(ctx, p1, top, 16); Q55.pulley(ctx, p2, top, 16);
        Q55.block(ctx, p1 - 16 - mw / 2, yA, mw, mw * .7, '#0284c7', 'A'); Q55.block(ctx, p2 + 16 - mw / 2, yB, mw, mw * .7, '#dc2626', 'B');
        if (S.d > .03) { Q55.dim(ctx, p1 - 16 - mw / 2 - 18, g.gy - .25 * g.u * .9, p1 - 16 - mw / 2 - 18, yA, 'h', '#0284c7'); Q55.dim(ctx, p2 + 16 + mw / 2 + 18, g.gy - (.25 + H) * g.u * .9, p2 + 16 + mw / 2 + 18, yB, 'h', '#dc2626'); }
        Q55.arrow(ctx, p2 + 16, yB + 4, 0, 40 + m * 3, '#475569', 'mg', 3);
        const W = m * G * S.d; Q55.bars(ctx, w - 280, 350, 120, [['GPE A', m * G * hA, '#0284c7', Q55.f(m * G * hA, 0)], ['GPE B', m * G * hB, '#dc2626', Q55.f(m * G * hB, 0)]], m * G * 2, { title: 'الطاقة الكامنة (J)', bw: 44 });
        title = 'الشكل 15: الكتلتان المتساويتان'; L = [{ t: 'نزلت B مسافة h = ' + Q55.f(S.d, 2) + ' m', c: '#dc2626', w: 800 }, { t: 'وارتفعت A المسافة نفسها', c: '#0284c7', w: 800 }, { t: 'شغل وزن B:', c: '#334155', w: 800 }, { t: 'W = m g h = ' + Q55.f(W, 1) + ' J', mono: 1, c: '#b91c1c', w: 900, s: 14 }, { t: 'زادت الطاقة الكامنة للثقل A بمقدار:', c: '#0284c7', w: 800 }, { t: 'ΔGPE = ' + Q55.f(W, 1) + ' J', mono: 1, c: '#0284c7', w: 900 }, { t: 'الشغل المنجز على A اختُزن فيها طاقة كامنة', c: '#16a34a', w: 800 }];
      }
      if (S.ex) Q55.steps(ctx, S, Object.assign({ title: 'مثال 6 ص 103' }, EX, { k: S.k })); else Q55.card(ctx, S, L, { title });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, S.md === 'book' ? 'اسحب الكتاب أو خط مستوى الإسناد' : 'اسحب الثقل B للأسفل', '#0284c7');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['pul', 'الشكل 15: البكرتان'], ['book', 'مثال 6: الكتاب والرف']], g.h - 172, S.md, (S2, k) => { S2.md = k; S2.ex = 0; }, { bw: 210, col: '#0284c7' }),
      p: S.md === 'book' ? Q42.chips(S, 'mv', [['up', '⬆ إلى الرف'], ['dn', '⬇ إلى الأرض'], ['r0', 'الأرض مستوى إسناد'], ['r2', 'الرف مستوى إسناد']], g.h - 128, '', (S2, k) => { if (k === 'up') S2.th = S2.p.hs; else if (k === 'dn') S2.th = 0; else setParam(S2, 'ref', k === 'r0' ? 0 : S2.p.hs); }, { bw: 170 })
        : Q42.chips(S, 'mv', [['go', '▶ دع B تنزل'], ['re', '↺ من البداية']], g.h - 128, '', (S2, k) => { S2.td = k === 'go' ? 1.5 : 0; }, { bw: 170 }),
      e: Q55.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 6: الحل خطوة خطوة', S2 => { S2.md = 'book'; setParam(S2, 'm', 3); setParam(S2, 'hs', 2); setParam(S2, 'ref', 0); S2.th = 2; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), out = [];
      if (S.md === 'book') { const sx = g.x1 - 150; out.push({ id: 'book', x: sx + 88, y: g.gy - S.hb * g.u - 11, r: 30, axis: 'y', keep: true, tip: 'اسحب الكتاب للأعلى أو للأسفل', idle: 'اسحب ✋', drag: (S2, d) => { S2.th = clamp((g.gy - d.y - 11) / g.u, 0, S2.p.hs); } });
        out.push({ id: 'ref', x: g.x0 + 20, y: g.gy - S.rs * g.u, r: 20, axis: 'y', keep: true, hint: false, tip: 'اسحب مستوى الإسناد', drag: (S2, d) => setParam(S2, 'ref', clamp(Math.round((g.gy - d.y) / g.u * 2) / 2, 0, 2)) }); }
      else { const p2 = g.x0 + 300, yB = g.gy - (.25 + 1.5 - S.d) * g.u * .9; out.push({ id: 'B', x: p2 + 16, y: yB - 20, r: 30, axis: 'y', keep: true, tip: 'اسحب B للأسفل', idle: 'اسحب ✋', drag: (S2, d) => { S2.td = clamp(1.5 - ((g.gy - d.y - 20) / (g.u * .9) - .25), 0, 1.5); } }); }
      return out.concat(C.m, C.p, C.e); },
    readings(S) { return S.md === 'book' ? [rd('الارتفاع عن مستوى الإسناد', Q55.f(S.hb - S.p.ref, 2) + ' m'), rd('GPE', Q55.f(S.p.m * 10 * (S.hb - S.p.ref), 1) + ' J'), rd('ΔGPE من الأرض إلى الرف', Q55.f(S.p.m * 10 * S.p.hs, 1) + ' J')] : [rd('المسافة h', Q55.f(S.d, 2) + ' m'), rd('شغل وزن B', Q55.f(S.p.m * 10 * S.d, 1) + ' J'), rd('زيادة GPE لـ A', Q55.f(S.p.m * 10 * S.d, 1) + ' J')]; },
    record(S) { return { m: S.p.m, ref: S.p.ref, E1: Q55.f(S.p.m * 10 * -S.p.ref, 0), E2: Q55.f(S.p.m * 10 * (S.p.hs - S.p.ref), 0), dE: Q55.f(S.p.m * 10 * S.p.hs, 0) }; },
    cols: [['m', 'm (kg)'], ['ref', 'الإسناد (m)'], ['E1', 'GPE1 (J)'], ['E2', 'GPE2 (J)'], ['dE', 'ΔGPE (J)']],
    explain(S) { return Q26.ex('كلما ارتفع الجسم عن مستوى الإسناد زادت طاقته الكامنة، وتصبح سالبة تحته.', 'GPE = m g h تقاس من مستوى إسناد نختاره، لذلك تتغير قيمتها بتغييره، لكن الفرق بين موضعين يبقى m g Δh.', 'الماء المخزون خلف السدود وفي أعالي الشلالات يمتلك طاقة كامنة تتحول إلى طاقة حركية تدير التوربينات لتوليد الكهرباء.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C3 — الطاقة الكامنة المرونية: النابض المضغوط ومثال 7 (الشكل 18، ص 104–105) =============== */
(() => {
  const EX = { q: 'نابض ثابته 200 N/m ضُغط مسافة 0.2 m بوساطة كتلة 2 kg موضوعة على سطح أفقي أملس ثم تُرك. ما سرعة الكتلة لحظة مغادرتها النابض؟', lines: ['EPE = ½ K x² = ½ × 200 × 0.2²', 'EPE = 4 J', 'تتحول كلها إلى طاقة حركية', '½ m v² = ½ K x²', '½ × 2 × v² = 4', 'v² = 4', 'v = 2 m/s'] };
  const U = 420, SL = .3;
  const D = { id: 'g11_w_spring', page: 104, fig: 'الشكل 18 + مثال 7',
    desc: 'النابض المضغوط أو المسحوب مسافة x عن موضع اتزانه يختزن طاقة كامنة مرونية EPE = ½ K x² ، حيث K ثابت النابض. عند ترك الكتلة على سطح أملس تتحول هذه الطاقة إلى طاقة حركية، فتغادر الكتلة النابض بسرعة v تحقق ½ m v² = ½ K x². ومساحة المثلث تحت مخطط القوة F = K x مع الانضغاط تساوي ½ K x².',
    tags: 'الطاقة الكامنة المرونية EPE=½Kx² ثابت النابض K N/m الشكل 18 مثال 7 200N/m 2kg 0.2m 2m/s نابض مضغوط سطح أملس المساحة تحت مخطط القوة',
    tools: ['نابض', 'كتلة', 'سطح أفقي أملس', 'مسطرة'],
    steps: ['اسحب الكتلة نحو اليسار لتضغط النابض مسافة x ، ثم اتركها.', 'راقب EPE تتحول إلى KE حتى تغادر الكتلة النابض بسرعة ثابتة (العرض بطيء).', 'المثلث على مخطط F − x مساحته = ½ K x². غيّر K و m من اللوحة.', 'اضغط «مثال 7: الحل خطوة خطوة».'],
    concl: ['EPE = ½ K x².', 'على السطح الأملس: ½ K x² = ½ m v² ⟸ v = x √(K/m).', 'مثال 7: EPE = 4 J و v = 2 m/s.'],
    laws: ['g11_l5_epe'],
    controls: [R('K', 'ثابت النابض K', 50, 500, 200, 10, 'N/m'), R('m', 'الكتلة m', .5, 5, 2, .5, 'kg'), R('x', 'مقدار الانضغاط x', .05, .3, .2, .01, 'm')],
    setup(S) { S.ph = 'hold'; S.q = 0; S.qv = 0; S.sx = 0; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), xw = L + 46, gy = h - 230; return { w, h, L, xw, gy, xn: xw + 230, xe: w - 40, bw: 80 }; },
    update(S, dt) { const K = S.p.K, m = S.p.m, g = S.W ? D.geo(S) : null;
      if (S.ph === 'hold') { S.q = Q55.ez(S.q, S.p.x, dt, 8); S.qv = 0; S.sx = 0; }
      else if (S.ph === 'push') { const n = 20, h = dt * SL / n; for (let i = 0; i < n; i++) { S.qv += K * S.q / m * h; S.q -= S.qv * h; if (S.q <= 0) { S.q = 0; S.qv = S.p.x * Math.sqrt(K / m); S.ph = 'free'; break; } } }
      else if (S.ph === 'free') { S.sx += S.qv * dt * SL; if (g && g.xn + S.sx * U + g.bw >= g.xe) { S.sx = (g.xe - g.bw - g.xn) / U; S.ph = 'done'; } } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), Kk = S.p.K, m = S.p.m, x = S.p.x, q = S.q, EPE = .5 * Kk * q * q, E = S.ph === 'hold' ? EPE : .5 * Kk * x * x, KE = S.ph === 'hold' ? 0 : Math.max(0, E - EPE), v = Math.sqrt(2 * KE / m);
      Q55.bg(ctx, w, h);
      // F – x graph
      const Fm = Kk * .3, A = Q55.axes(ctx, { x: g.L + 70, y: 92, w: w - 450 - g.L, h: 190, x1: .3, y0: 0, y1: Q55.nice(Fm / 4) * Math.ceil(Fm / Q55.nice(Fm / 4)), xs: .05, ys: Q55.nice(Fm / 4), lx: .1, xl: 'x (m)', yl: 'F (N)', col: '#9333ea' });
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(147,51,234,.25)'; ctx.beginPath(); ctx.moveTo(A.X(0), A.Y(0)); ctx.lineTo(A.X(q), A.Y(0)); ctx.lineTo(A.X(q), A.Y(Kk * q)); ctx.closePath(); ctx.fill(); });
      Q52.plot(ctx, [[A.X(0), A.Y(0)], [A.X(.3), A.Y(Fm)]], '#9333ea', 2.6); Q41.dot(ctx, A.X(q), A.Y(Kk * q), '#dc2626', 6);
      if (q > .06) Q42.T(ctx, '½ K x² = ' + Q55.f(EPE, 2) + ' J', A.X(q * .66), A.Y(Kk * q * .25), { s: 10, w: 900, c: '#581c87', bg: 'rgba(255,255,255,.85)' });
      Q42.T(ctx, 'F = K x', A.X(.27), A.Y(Fm * .9) - 14, { s: 11, w: 900, c: '#9333ea' });
      // bars
      Q55.bars(ctx, w - 270, 336, 70, [['EPE', EPE, '#9333ea', Q55.f(EPE, 2)], ['KE', KE, '#0284c7', Q55.f(KE, 2)], ['E', EPE + KE, '#16a34a', Q55.f(EPE + KE, 2)]], Math.max(.5, .5 * Kk * x * x) * 1.05, { title: 'الطاقة (J)', bw: 44, gap: 22 });
      // scene
      Q55.floor(ctx, g.xw - 4, g.xe + 6, g.gy, { c0: '#e2e8f0', c1: '#94a3b8' }); Q55.wall(ctx, g.xw, g.gy - 130, g.gy, -1); K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.xe, g.gy - 40, 10, 40); });
      const bl = S.ph === 'hold' || S.ph === 'push' ? g.xn - q * U : g.xn + S.sx * U, sEnd = S.ph === 'hold' || S.ph === 'push' ? bl : g.xn, cy = g.gy - 32;
      Q41.line(ctx, [[g.xn, g.gy + 4], [g.xn, g.gy - 90]], '#64748b', 1.2, [4, 3]); Q42.T(ctx, 'موضع الاتزان', g.xn, g.gy - 100, { s: 10, w: 800, c: '#475569' });
      Q55.hspring(ctx, g.xw, sEnd, cy, { n: 12, r: 15, col: '#64748b' }); K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(sEnd - 4, cy - 20, 6, 40); });
      Q55.block(ctx, bl, g.gy, g.bw, 64, '#f59e0b', m + ' kg');
      if (q > .01) Q55.dim(ctx, bl, g.gy + 30, g.xn, g.gy + 30, 'x = ' + Q55.f(q, 2) + ' m', '#9333ea', { dy: 14 });
      if (q > .01) Q55.arrow(ctx, bl + g.bw + 6, cy, 20 + Kk * q * .4, 0, '#dc2626', 'F', 3.2);
      if (v > .05) Q55.arrow(ctx, bl + g.bw / 2, g.gy - 88, 18 + v * 25, 0, '#2563eb', 'v', 3);
      if (S.ph === 'free' || S.ph === 'done') Q42.T(ctx, 'عرض بطيء', g.xe - 60, g.gy + 34, { s: 10, w: 800, c: '#64748b' });
      if (S.ex) Q55.steps(ctx, S, Object.assign({ title: 'مثال 7 ص 105' }, EX, { k: S.k }));
      else Q55.card(ctx, S, [{ t: 'EPE = ½ K x²', mono: 1, w: 900, s: 14 }, { t: 'K = ' + Kk + ' N/m    x = ' + Q55.f(x, 2) + ' m', mono: 1, c: '#9333ea', w: 800 }, { t: 'الطاقة المرونية العظمى:', c: '#9333ea', w: 800 }, { t: 'EPE = ' + Q55.f(.5 * Kk * x * x, 2) + ' J', mono: 1, c: '#9333ea', w: 900 }, { t: 'سرعة المغادرة v = x √(K/m)', c: '#334155', w: 800 }, { t: 'v = ' + Q55.f(x * Math.sqrt(Kk / m), 2) + ' m/s', mono: 1, c: '#2563eb', w: 900, s: 14 }, { t: 'السرعة الآن = ' + Q55.f(v, 2) + ' m/s', c: '#2563eb' }, { t: 'EPE + KE ثابتة على السطح الأملس', c: '#16a34a', w: 800 }], { title: 'الشكل 18: النابض المضغوط' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'اسحب الكتلة لتضغط النابض ثم اتركها', '#9333ea');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pl', [['go', '▶ أطلق الكتلة'], ['re', '↺ اضغط النابض من جديد']], g.h - 128, '', (S2, k) => { if (k === 'go') { if (S2.ph === 'hold') { S2.q = S2.p.x; S2.ph = 'push'; } else { S2.ph = 'hold'; S2.q = S2.p.x; S2.ph = 'push'; S2.sx = 0; } } else { S2.ph = 'hold'; S2.sx = 0; } }, { bw: 200 }),
      e: Q55.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 7: الحل خطوة خطوة', S2 => { setParam(S2, 'K', 200); setParam(S2, 'm', 2); setParam(S2, 'x', .2); S2.ph = 'hold'; S2.sx = 0; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), bl = S.ph === 'hold' || S.ph === 'push' ? g.xn - S.q * U : g.xn + S.sx * U;
      return [{ id: 'blk', x: bl + g.bw / 2, y: g.gy - 32, r: 36, axis: 'x', keep: true, tip: 'اسحب لليسار لضغط النابض ثم اترك', idle: 'اسحب ✋', drag: (S2, d) => { S2.ph = 'hold'; S2.sx = 0; const qq = clamp((g.xn - (d.x - g.bw / 2)) / U, .05, .3); setParam(S2, 'x', Math.round(qq * 100) / 100); S2.q = S2.p.x; }, up: S2 => { S2.q = S2.p.x; S2.ph = 'push'; } }].concat(C.p, C.e); },
    readings(S) { const E = .5 * S.p.K * S.p.x * S.p.x, EPE = .5 * S.p.K * S.q * S.q, KE = S.ph === 'hold' ? 0 : Math.max(0, E - EPE); return [rd('الانضغاط', Q55.f(S.q, 3) + ' m'), rd('EPE', Q55.f(EPE, 2) + ' J'), rd('KE', Q55.f(KE, 2) + ' J'), rd('السرعة', Q55.f(Math.sqrt(2 * KE / S.p.m), 2) + ' m/s')]; },
    record(S) { return { K: S.p.K, m: S.p.m, x: S.p.x, E: Q55.f(.5 * S.p.K * S.p.x * S.p.x, 2), v: Q55.f(S.p.x * Math.sqrt(S.p.K / S.p.m), 2) }; },
    cols: [['K', 'K (N/m)'], ['m', 'm (kg)'], ['x', 'x (m)'], ['E', 'EPE (J)'], ['v', 'v (m/s)']],
    explain(S) { return Q26.ex('تندفع الكتلة بسرعة أكبر كلما زاد انضغاط النابض أو ثابته، وبسرعة أقل كلما زادت كتلتها.', 'النابض المضغوط يختزن طاقة ½ K x² ، وعلى السطح الأملس تتحول كلها إلى طاقة حركية ½ m v² لحظة مغادرة الكتلة النابض.', 'لعبة المسدس النابضي وقوس السهم يختزنان طاقة مرونية تتحول إلى طاقة حركية للمقذوف.'); }
  };
  M8.P[D.id] = D;
})();


/* =============== D1 — حفظ الطاقة الميكانيكية: مسار الأفعوانية (الشكل 20) ومثال 8 (5-5، ص 106–107) =============== */
(() => {
  const EX = { q: 'كرة كتلتها 5 kg تبدأ الحركة من السكون عند النقطة a على ارتفاع 5.00 m وتتحرك على مسار أملس. احسب سرعتها عند النقطة b على ارتفاع 3.20 m وعند النقطة c على ارتفاع 2.00 m. اعتبر g = 10 m/s².', lines: ['KEa + PEa = KEb + PEb', '0 + m g ha = ½ m vb² + m g hb', '10 × 5 = ½ vb² + 10 × 3.2', 'vb² = 36  ⟸  vb = 6 m/s', 'وعند النقطة c:', '10 × 5 = ½ vc² + 10 × 2', 'vc² = 60  ⟸  vc = 7.746 m/s'] };
  const TR = { fig: { T: Q55.path([[0, 60], [35, 30], [70, 40], [100, 10], [130, 20], [165, 0], [200, 0]]), lab: [[0, 'a'], [2, 'b'], [4, 'c'], [5, 'd']], sl: 1 },
    ex8: { T: Q55.path([[0, 5], [2.5, 2.4], [5, 3.2], [7.5, 2], [10, 2]]), lab: [[0, 'a'], [2, 'b'], [3, 'c']], sl: .5 } };
  const D = { id: 'g11_w_track', page: 106, fig: 'الشكل 20 + مثال 8',
    desc: 'الطاقة الميكانيكية E مجموع الطاقتين الكامنة والحركية: E = PE + KE. بإهمال الاحتكاك ومقاومة الهواء تبقى E ثابتة، فما ينقص من الطاقة الكامنة يظهر زيادة في الطاقة الحركية: KEi + PEi = KEf + PEf. في الشكل 20 عربة على مسار طاقتها الكلية 600 000 J ، وفي مثال 8 كرة كتلتها 5 kg تنزل من ارتفاع 5 m.',
    tags: 'حفظ الطاقة الميكانيكية E=PE+KE KEi+PEi=KEf+PEf الشكل 20 أفعوانية 600000J مثال 8 كرة 5kg 5m 3.2m 2m 6m/s 7.746m/s مسار أملس',
    tools: ['مسار منحن أملس', 'كرة', 'مسطرة مترية'],
    steps: ['«الشكل 20»: اضغط «▶ انطلق» وراقب الأعمدة: PE تنقص و KE تزداد والمجموع ثابت 600 000 J.', 'اسحب العربة على المسار وقارن قيم الطاقة عند النقاط a و b و c و d بجدول الكتاب.', '«مثال 8»: الكرة تنزل من a فاحسب سرعتها عند b و c.', 'اضغط «مثال 8: الحل خطوة خطوة».'],
    concl: ['E = PE + KE ثابتة بإهمال الاحتكاك.', 'الشكل 20: عند a كلها كامنة 600 000 J وعند d كلها حركية.', 'مثال 8: vb = 6 m/s و vc = 7.746 m/s.'],
    laws: ['g11_l5_emech', 'g11_l5_gpe', 'g11_l5_ke'],
    controls: [R('m', 'كتلة الكرة في مثال 8', 1, 10, 5, 1, 'kg'), R('spd', 'سرعة العرض', .25, 1, 1, .25, '×'), TG('lab', 'قيم الطاقة عند النقاط', true, null, 'tag')],
    setup(S) { S.md = 'fig'; S.s = 0; S.ss = 0; S.run = 0; S.ex = 0; S.k = 0; },
    tr(S) { return TR[S.md]; },
    m(S) { return S.md === 'fig' ? 1000 : S.p.m; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), gy = h - 200, V = Q55.view(D.tr(S).T, L + 40, w - 30, 345, gy); return { w, h, L, gy, V }; },
    st(S, s) { const T = D.tr(S).T, p = Q55.at(T, s), h0 = T.P[0][1], m = D.m(S), E = m * 10 * h0, PE = m * 10 * p.h; return { p, E, PE, KE: E - PE, v: Math.sqrt(Math.max(0, 2 * 10 * (h0 - p.h))) }; },
    update(S, dt) { const T = D.tr(S).T; if (S.run) { const v = Math.max(D.st(S, S.s).v, .6); S.s += v * dt * D.tr(S).sl * S.p.spd; if (S.s >= T.len) { S.s = T.len; S.run = 0; } S.ss = S.s; } else S.ss = Q55.ez(S.ss, S.s, dt, 12); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), V = g.V, R0 = D.tr(S), T = R0.T, q = D.st(S, S.ss), fig = S.md === 'fig';
      Q55.bg(ctx, w, h); Q55.ground(ctx, g.L + 30, w - 20, g.gy);
      if (fig) K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; for (let x = 5; x < 200; x += 10) { const hh = Q55.at(T, Q55.sAtX(T, x)).h; if (hh > 1) { ctx.beginPath(); ctx.moveTo(V.X(x), V.gy); ctx.lineTo(V.X(x), V.Y(hh) + 4); ctx.stroke(); } } });
      Q55.trackDraw(ctx, T, V, fig ? { c0: '#e0f2fe', c1: '#bae6fd', rail: '#b91c1c', a: .5, lw: 5 } : { c0: '#fde68a', c1: '#b45309' });
      R0.lab.forEach(l => { const k = l[0], pt = T.P[k * T.n], X = V.X(pt[0]), Y = V.Y(pt[1]), st = D.st(S, Q55.sKey(T, k));
        Q42.T(ctx, l[1], X, Y + 22, { s: 13, w: 900, c: '#fff', bg: '#be185d' });
        if (S.p.lab) { Q42.T(ctx, 'PE = ' + Q55.n(st.PE) + ' J', X, Y - 50, { s: 9.5, w: 800, c: '#0284c7', bg: 'rgba(255,255,255,.85)' }); Q42.T(ctx, 'KE = ' + Q55.n(st.KE) + ' J', X, Y - 34, { s: 9.5, w: 800, c: '#dc2626', bg: 'rgba(255,255,255,.85)' }); } });
      const px = V.X(q.p.x), py = V.Y(q.p.h), a = q.p.ang;
      if (fig) K.raw(ctx, () => { ctx.save(); ctx.translate(px, py); ctx.rotate(-a); const gc = ctx.createLinearGradient(0, -30, 0, 0); gc.addColorStop(0, '#fde047'); gc.addColorStop(1, '#ca8a04'); ctx.fillStyle = gc; rr(ctx, -24, -28, 48, 22, 6); ctx.fill(); ctx.strokeStyle = '#713f12'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#1e3a8a'; ctx.beginPath(); ctx.arc(-6, -32, 6, 0, TAU); ctx.arc(10, -32, 6, 0, TAU); ctx.fill(); ctx.fillStyle = '#0f172a'; [-14, 14].forEach(x => { ctx.beginPath(); ctx.arc(x, -5, 5, 0, TAU); ctx.fill(); }); ctx.restore(); });
      else K.ball(ctx, px - 14 * Math.sin(a), py - 14 * Math.cos(a), 14, '#2563eb');
      if (q.v > .1) Q55.arrow(ctx, px - 40 * Math.sin(a), py - 40 * Math.cos(a), Math.cos(a) * (16 + q.v * (fig ? 2 : 8)), -Math.sin(a) * (16 + q.v * (fig ? 2 : 8)), '#16a34a', 'v', 2.6);
      Q55.bars(ctx, g.L + 56, 112, 150, [['PE', q.PE, '#0284c7', Q55.n(q.PE)], ['KE', q.KE, '#dc2626', Q55.n(q.KE)], ['E', q.E, '#16a34a', Q55.n(q.E)]], q.E * 1.05, { title: 'الطاقة (J)', bw: 54, gap: 26 });
      if (S.ex) Q55.steps(ctx, S, Object.assign({ title: 'مثال 8 ص 107' }, EX, { k: S.k }));
      else Q55.card(ctx, S, [{ t: 'E = PE + KE', mono: 1, w: 900, s: 14 }, { t: 'h = ' + Q55.f(q.p.h, 2) + ' m', mono: 1, c: '#0284c7', w: 800 }, { t: 'PE = ' + Q55.n(q.PE) + ' J', mono: 1, c: '#0284c7', w: 800 }, { t: 'KE = ' + Q55.n(q.KE) + ' J', mono: 1, c: '#dc2626', w: 800 }, { t: 'E = ' + Q55.n(q.E) + ' J', mono: 1, c: '#16a34a', w: 900, s: 14 }, { t: 'v = ' + Q55.f(q.v, fig ? 1 : 3) + ' m/s', mono: 1, c: '#334155', w: 800 }, { t: 'ما ينقص من الكامنة يزداد في الحركية', c: '#16a34a', w: 800 }], { title: fig ? 'الشكل 20: العربة على المسار' : 'مثال 8: الكرة على المسار الأملس' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'اسحب ' + (fig ? 'العربة' : 'الكرة') + ' على المسار أو اضغط «▶ انطلق»', '#16a34a');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['fig', 'الشكل 20: الأفعوانية'], ['ex8', 'مثال 8: الكرة']], g.h - 172, S.md, (S2, k) => { S2.md = k; S2.s = 0; S2.ss = 0; S2.run = 0; S2.ex = 0; }, { bw: 210, col: '#16a34a' }),
      p: Q55.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.s >= D.tr(S2).T.len - 1e-6) { S2.s = 0; S2.ss = 0; } S2.run = S2.run ? 0 : 1; }, S2 => { S2.s = 0; S2.run = 0; }, { go: '▶ انطلق' }),
      e: Q55.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 8: الحل خطوة خطوة', S2 => { S2.md = 'ex8'; setParam(S2, 'm', 5); S2.s = 0; S2.ss = 0; S2.run = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), T = D.tr(S).T, q = D.st(S, S.ss);
      return [{ id: 'obj', x: g.V.X(q.p.x), y: g.V.Y(q.p.h) - 16, r: 30, axis: 'x', keep: true, tip: 'اسحب على المسار', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.s = Q55.sAtX(T, (d.x - g.V.X(0)) / g.V.k); } }].concat(C.m, C.p, C.e); },
    readings(S) { const q = D.st(S, S.s); return [rd('الارتفاع', Q55.f(q.p.h, 2) + ' m'), rd('السرعة', Q55.f(q.v, 2) + ' m/s'), rd('PE', Q55.n(q.PE) + ' J'), rd('KE', Q55.n(q.KE) + ' J'), rd('E', Q55.n(q.E) + ' J')]; },
    record(S) { const q = D.st(S, S.s); return { h: Q55.f(q.p.h, 2), PE: Math.round(q.PE), KE: Math.round(q.KE), v: Q55.f(q.v, 2) }; },
    cols: [['h', 'h (m)'], ['PE', 'PE (J)'], ['KE', 'KE (J)'], ['v', 'v (m/s)']],
    explain(S) { return Q26.ex('كلما نزل الجسم على المسار نقصت طاقته الكامنة وزادت الحركية، ويبقى عمود الطاقة الكلية ثابتاً.', 'بإهمال الاحتكاك لا تنجز قوى غير محافظة شغلاً، لذلك تبقى الطاقة الميكانيكية E = PE + KE ثابتة وتتحول من شكل إلى آخر.', 'تُصمم الأفعوانية بحيث تكون القمة الأولى أعلى نقطة لأن العربة لا تستطيع تجاوز ارتفاع أكبر من ارتفاع انطلاقها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — سؤال الشكل 22 وشغل القوى غير المحافظة: سؤال الشكل 23 (5-5، 5-6، ص 108–109) =============== */
(() => {
  const EXA = { q: 'أكمل قيم الطاقة في الشكل 22: كرة على قمة سطح، طاقتها الحركية على المنصة 75 J وعند أسفل السطح 100 J ، وكرة أخرى تسقط سقوطاً حراً من القمة نفسها.', lines: ['عند أسفل السطح: PE = 0', 'وطاقتها الحركية KE = 100 J', 'الطاقة الكلية ثابتة E = 100 J', 'عند القمة KE = 0 لذلك PE = 100 J', 'على المنصة PE = 100 − 75 = 25 J', 'في السقوط الحر عند الأرض:', 'PE = 0    KE = 100 J', 'الطاقة نفسها مهما كان المسار'] };
  const EXB = { q: 'كرة كتلتها 5 kg تبدأ من السكون عند a على ارتفاع 5 m. المسار من a إلى b أملس ومن b إلى c خشن، فتوقفت عند c بعد أن قطعت 10 m من b. ارتفاع b هو 3.2 m و c هو 2 m. احسب سرعتها عند b وقوة الاحتكاك.', lines: ['Ea = m g ha = 5 × 10 × 5 = 250 J', 'المسار ab أملس لذلك Eb = 250 J', 'PEb = 5 × 10 × 3.2 = 160 J', 'KEb = 250 − 160 = 90 J', '½ × 5 × vb² = 90  ⟸  vb = 6 m/s', 'Ec = PEc = 5 × 10 × 2 = 100 J', 'Wnc = Ec − Eb = 100 − 250 = −150 J', 'Wnc = −f d  ⟸  −150 = −f × 10', 'f = 15 N'] };
  const TA = Q55.path([[0, 4], [1.2, 4, 'l'], [4.2, 1, 'l'], [6.2, 1, 'l'], [9.2, 0, 'l'], [10.6, 0, 'l']], 20);
  const LB = 15.928, TB = Q55.path([[0, 5], [6, 3.2], [LB, 2, 'l'], [22, 2, 'l']], 30), SB = Q55.sKey(TB, 1);
  const D = { id: 'g11_w_ramp', page: 108, fig: 'الشكلان 22 و 23',
    desc: 'سؤال الشكل 22: الطاقة الميكانيكية الكلية ثابتة 100 J ، فعند القمة كلها كامنة، وعلى المنصة PE = 25 J و KE = 75 J ، وعند الأسفل كلها حركية، سواء نزلت الكرة على السطح أو سقطت سقوطاً حراً. وعند وجود قوى غير محافظة كالاحتكاك يكون شغلها مساوياً للتغير في الطاقة الميكانيكية: Wnc = Ef − Ei ، وهو سالب للاحتكاك فيتحول جزء من الطاقة إلى حرارة.',
    tags: 'الشكل 22 الشكل 23 سؤال حفظ الطاقة السقوط الحر سطح مائل منصة 75J 100J 25J شغل القوى غير المحافظة Wnc=Ef−Ei احتكاك 15N 250J 100J −150J 6m/s حرارة',
    tools: ['سطح مائل', 'كرة', 'مسطرة مترية', 'ساعة توقيت'],
    steps: ['«الشكل 22»: اضغط «▶ انطلق»: تنزل كرة على السطح وتسقط الأخرى سقوطاً حراً من الارتفاع نفسه.', 'قارن الأعمدة: الطاقة عند الأرض 100 J للكرتين، وعلى المنصة PE = 25 J و KE = 75 J.', '«الشكل 23»: الجزء bc خشن. غيّر قوة الاحتكاك f وراقب أين تتوقف الكرة وكمية الحرارة.', 'اضغط زر الحل خطوة خطوة لكل سؤال.'],
    concl: ['الشكل 22: القمة PE = 100 J ، المنصة PE = 25 J ، الأسفل KE = 100 J.', 'الطاقة عند الأرض لا تعتمد على المسار.', 'Wnc = Ef − Ei ، وفي الشكل 23: Wnc = −150 J و f = 15 N و vb = 6 m/s.'],
    laws: ['g11_l5_emech', 'g11_l5_wnc'],
    controls: [R('E', 'الطاقة الكلية في الشكل 22', 50, 200, 100, 10, 'J'), R('f', 'قوة الاحتكاك على bc', 0, 30, 15, 1, 'N'), R('m', 'كتلة الكرة في الشكل 23', 1, 10, 5, 1, 'kg'), TG('ans', 'إظهار الإجابات', true, null, 'tag')],
    setup(S) { S.md = 'q22'; S.sA = Q55.sKey(TA, 1); S.yB = 0; S.vB = 0; S.sb = 0; S.run = 0; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), gy = h - 200, V = S.md === 'q22' ? Q55.view(TA, L + 40, w - 30, 340, gy, { xm: -1, hp: .6 }) : Q55.view(TB, L + 40, w - 30, 340, gy, { hp: .4 }); return { w, h, L, gy, V }; },
    KEB(S, s) { const m = S.p.m, p = Q55.at(TB, s); return m * 10 * 5 - m * 10 * p.h - S.p.f * Math.max(0, s - SB); },
    stop(S) { for (let s = .05; s <= TB.len; s += .02) if (D.KEB(S, s) <= 0) return s; return TB.len; },
    update(S, dt) { if (!S.run) return; const sl = .45;
      if (S.md === 'q22') { const p = Q55.at(TA, S.sA), v = Math.max(Math.sqrt(Math.max(0, 2 * 10 * (4 - p.h))), .5); S.sA = Math.min(TA.len, S.sA + v * dt * sl); if (S.yB < 4) { S.vB += 10 * dt * sl; S.yB = Math.min(4, S.yB + S.vB * dt * sl); } if (S.sA >= TA.len && S.yB >= 4) S.run = 0; }
      else { const ke = D.KEB(S, S.sb), v = Math.max(Math.sqrt(Math.max(0, 2 * ke / S.p.m)), 1); const e = D.stop(S); S.sb = Math.min(e, S.sb + v * dt * .7); if (S.sb >= e) S.run = 0; } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), V = g.V; Q55.bg(ctx, w, h); let L, title;
      if (S.md === 'q22') {
        const E = S.p.E, m = E / 40, pA = Q55.at(TA, S.sA), PA = m * 10 * pA.h, KA = E - PA, PB = m * 10 * (4 - S.yB), KB = E - PB;
        Q55.ground(ctx, V.X(-1), V.X(10.8), g.gy); Q55.trackDraw(ctx, TA, V, { c0: '#fdba74', c1: '#ea580c', rail: '#9a3412' });
        Q41.line(ctx, [[V.X(-.45), V.Y(4) - 30], [V.X(-.45), V.gy - 14]], 'rgba(15,23,42,.35)', 1.4, [5, 4]);
        const ans = S.p.ans, lb = (x, hh, pe, ke, dy) => { Q42.T(ctx, 'PE = ' + pe + ' J', V.X(x), V.Y(hh) - 54 + (dy || 0), { s: 10, w: 900, c: '#b91c1c', bg: 'rgba(255,255,255,.9)' }); Q42.T(ctx, 'KE = ' + ke + ' J', V.X(x), V.Y(hh) - 38 + (dy || 0), { s: 10, w: 900, c: '#b91c1c', bg: 'rgba(255,255,255,.9)' }); };
        const r = n => ans ? Q55.f(n, 0) : '?';
        lb(1.2, 4, r(E), '0'); lb(5.2, 1, r(E / 4), Q55.f(E * .75, 0)); lb(9.4, 0, '0', Q55.f(E, 0)); lb(-.45, 0, r(0), r(E), 0);
        K.ball(ctx, V.X(pA.x) - 12 * Math.sin(pA.ang), V.Y(pA.h) - 12 * Math.cos(pA.ang), 12, '#dc2626'); K.ball(ctx, V.X(-.45), V.Y(4 - S.yB) - 12, 12, '#2563eb');
        Q42.T(ctx, 'سقوط حر', V.X(-.45) - 4, V.Y(2.2), { s: 10, w: 900, c: '#fff', bg: '#2563eb' });
        Q55.bars(ctx, g.L + 56, 112, 140, [['PE', PA, '#0284c7', Q55.f(PA, 0)], ['KE', KA, '#dc2626', Q55.f(KA, 0)], ['PE', PB, '#0284c7', Q55.f(PB, 0)], ['KE', KB, '#dc2626', Q55.f(KB, 0)]], E * 1.05, { title: 'الكرة الحمراء ثم الكرة الزرقاء', bw: 40, gap: 14 });
        title = 'سؤال الشكل 22'; L = [{ t: 'E = PE + KE = ' + E + ' J', mono: 1, w: 900, s: 14 }, { t: 'الكرة على السطح:', c: '#dc2626', w: 800 }, { t: 'PE = ' + Q55.f(PA, 1) + '   KE = ' + Q55.f(KA, 1), mono: 1, c: '#dc2626' }, { t: 'الكرة الساقطة سقوطاً حراً:', c: '#2563eb', w: 800 }, { t: 'PE = ' + Q55.f(PB, 1) + '   KE = ' + Q55.f(KB, 1), mono: 1, c: '#2563eb' }, { t: 'تصل الكرتان إلى الأرض بالطاقة نفسها والسرعة نفسها، لكن الساقطة تصل أسرع', c: '#16a34a', w: 800 }];
      } else {
        const m = S.p.m, p = Q55.at(TB, S.sb), PE = m * 10 * p.h, Q = S.p.f * Math.max(0, S.sb - SB), E0 = m * 50, KE = Math.max(0, E0 - PE - Q), e = D.stop(S);
        Q55.ground(ctx, V.X(-.3), V.X(22.3), g.gy); Q55.trackDraw(ctx, TB, V, { c0: '#d9f99d', c1: '#4d7c0f', rail: '#365314' });
        K.raw(ctx, () => { ctx.fillStyle = '#44403c'; for (let s = SB; s < TB.len; s += .25) { const q = Q55.at(TB, s); ctx.beginPath(); ctx.arc(V.X(q.x), V.Y(q.h) - 1, 1.6 + (Math.round(s * 4) % 3) * .4, 0, TAU); ctx.fill(); } });
        [[0, 'a', 5], [SB, 'b', 3.2], [Q55.sKey(TB, 2), 'c', 2]].forEach(q => { const pt = Q55.at(TB, q[0]); Q42.T(ctx, q[1] + '', V.X(pt.x), V.Y(pt.h) + 20, { s: 13, w: 900, c: '#fff', bg: '#be185d' }); Q42.T(ctx, q[2] + ' m', V.X(pt.x), V.Y(pt.h) - 34, { s: 10, w: 800, c: '#365314', bg: 'rgba(255,255,255,.85)' }); });
        Q42.T(ctx, 'خشن', V.X(11), V.Y(2.6) + 30, { s: 11, w: 900, c: '#fff', bg: '#57534e' }); Q42.T(ctx, 'أملس', V.X(3), V.Y(4) + 34, { s: 11, w: 900, c: '#fff', bg: '#0284c7' });
        if (e < TB.len - .1) { const pe = Q55.at(TB, e); Q41.line(ctx, [[V.X(pe.x), V.Y(pe.h) - 40], [V.X(pe.x), V.Y(pe.h) + 4]], '#dc2626', 2, [4, 3]); }
        K.ball(ctx, V.X(p.x) - 11 * Math.sin(p.ang), V.Y(p.h) - 11 * Math.cos(p.ang), 11, '#2563eb');
        if (Q > .5 && KE > .01) K.raw(ctx, () => { ctx.fillStyle = 'rgba(249,115,22,.5)'; ctx.beginPath(); ctx.arc(V.X(p.x), V.Y(p.h), 6 + Math.random() * 4, 0, TAU); ctx.fill(); });
        Q55.bars(ctx, g.L + 56, 112, 140, [['PE', PE, '#0284c7', Q55.f(PE, 0)], ['KE', KE, '#dc2626', Q55.f(KE, 0)], ['حرارة', Q, '#f97316', Q55.f(Q, 0)], ['E', PE + KE, '#16a34a', Q55.f(PE + KE, 0)]], E0 * 1.05, { title: 'الطاقة (J)', bw: 42, gap: 16 });
        const Eb = E0, KEb = E0 - m * 32, Ec = m * 20;
        title = 'سؤال الشكل 23: شغل الاحتكاك'; L = [{ t: 'Wnc = Ef − Ei', mono: 1, w: 900, s: 14 }, { t: 'Eb = ' + Q55.f(Eb, 0) + ' J    vb = ' + Q55.f(Math.sqrt(2 * KEb / m), 2) + ' m/s', mono: 1, c: '#0284c7', w: 800 }, { t: 'الحرارة المتولدة الآن:', c: '#f97316', w: 800 }, { t: 'Q = f d = ' + Q55.f(Q, 1) + ' J', mono: 1, c: '#f97316', w: 900 }, { t: 'E = ' + Q55.f(PE + KE, 1) + ' J', mono: 1, c: '#16a34a', w: 900 }, { t: 'لتتوقف عند c يلزم:', c: '#334155', w: 800 }, { t: 'f = (Eb − Ec) / 10 = ' + Q55.f((Eb - Ec) / 10, 1) + ' N', mono: 1, c: '#b91c1c', w: 900 }];
      }
      const ex = S.md === 'q22' ? EXA : EXB;
      if (S.ex) Q55.steps(ctx, S, Object.assign({ title: S.md === 'q22' ? 'سؤال ص 108' : 'سؤال ص 109' }, ex, { k: S.k })); else Q55.card(ctx, S, L, { title });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'اضغط «▶ انطلق» أو اسحب الكرة', '#ea580c');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['q22', 'الشكل 22: مساران'], ['q23', 'الشكل 23: مسار خشن']], g.h - 172, S.md, (S2, k) => { S2.md = k; S2.run = 0; S2.ex = 0; S2.sA = Q55.sKey(TA, 1); S2.yB = 0; S2.vB = 0; S2.sb = 0; }, { bw: 210, col: '#ea580c' }),
      p: Q55.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.md === 'q22' && S2.sA >= TA.len - .01) { S2.sA = Q55.sKey(TA, 1); S2.yB = 0; S2.vB = 0; } if (S2.md === 'q23' && S2.sb >= D.stop(S2) - .01) S2.sb = 0; S2.run = S2.run ? 0 : 1; }, S2 => { S2.run = 0; S2.sA = Q55.sKey(TA, 1); S2.yB = 0; S2.vB = 0; S2.sb = 0; }, { go: '▶ انطلق' }),
      e: Q55.stepChips(S, 'ex', g.h - 84, g.L, S.md === 'q22' ? 'سؤال الشكل 22: الحل' : 'سؤال الشكل 23: الحل', S2 => { if (S2.md === 'q23') { setParam(S2, 'm', 5); setParam(S2, 'f', 15); } else setParam(S2, 'E', 100); }, (S.md === 'q22' ? EXA : EXB).lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), V = g.V, C = D.chips(S, g), out = [];
      if (S.md === 'q22') { const pA = Q55.at(TA, S.sA); out.push({ id: 'ballA', x: V.X(pA.x), y: V.Y(pA.h) - 12, r: 26, axis: 'x', keep: true, tip: 'اسحب الكرة على السطح', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.sA = Math.max(Q55.sKey(TA, 1), Q55.sAtX(TA, (d.x - V.X(0)) / V.k)); } });
        out.push({ id: 'ballB', x: V.X(-.45), y: V.Y(4 - S.yB) - 12, r: 24, axis: 'y', keep: true, hint: false, tip: 'اسحب الكرة الساقطة', drag: (S2, d) => { S2.run = 0; S2.vB = 0; S2.yB = clamp(4 - (V.gy - d.y - 12) / V.k, 0, 4); } }); }
      else { const p = Q55.at(TB, S.sb); out.push({ id: 'ball', x: V.X(p.x), y: V.Y(p.h) - 11, r: 26, axis: 'x', keep: true, tip: 'اسحب الكرة على المسار', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.sb = Math.min(D.stop(S2), Q55.sAtX(TB, (d.x - V.X(0)) / V.k)); } }); }
      return out.concat(C.m, C.p, C.e); },
    readings(S) { if (S.md === 'q22') { const E = S.p.E, m = E / 40, p = Q55.at(TA, S.sA); return [rd('PE الكرة على السطح', Q55.f(m * 10 * p.h, 1) + ' J'), rd('KE الكرة على السطح', Q55.f(E - m * 10 * p.h, 1) + ' J'), rd('KE الكرة الساقطة', Q55.f(m * 10 * S.yB, 1) + ' J')]; }
      const p = Q55.at(TB, S.sb), Q = S.p.f * Math.max(0, S.sb - SB); return [rd('الارتفاع', Q55.f(p.h, 2) + ' m'), rd('KE', Q55.f(Math.max(0, D.KEB(S, S.sb)), 1) + ' J'), rd('الحرارة', Q55.f(Q, 1) + ' J'), rd('Wnc', Q55.f(-Q, 1) + ' J')]; },
    explain(S) { return S.md === 'q22' ? Q26.ex('الكرتان تبدآن بالطاقة الكامنة نفسها وتصلان إلى الأرض بالطاقة الحركية نفسها.', 'بإهمال الاحتكاك تبقى الطاقة الميكانيكية ثابتة 100 J ، فالطاقة الحركية عند الأرض لا تعتمد على شكل المسار بل على الارتفاع فقط.', 'المتزلج الذي ينزل من قمة تل بمسار متعرج يصل إلى أسفله بالسرعة نفسها تقريباً لو نزل بمسار مستقيم، إذا أهملنا الاحتكاك.') : Q26.ex('على الجزء الخشن تنقص الطاقة الميكانيكية ويظهر مقدار مساوٍ لها حرارة.', 'شغل القوى غير المحافظة يساوي التغير في الطاقة الميكانيكية Wnc = Ef − Ei ، وشغل الاحتكاك سالب −f d.', 'تسخن فرامل السيارة عند الضغط عليها لأن الطاقة الحركية تتحول بالاحتكاك إلى حرارة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D3 — قانون حفظ الطاقة: الكرة المرتدة والبندول يتوقفان (5-7، الشكل 24، ص 109) =============== */
(() => {
  const LP = 2.4, SL = .7;
  const D = { id: 'g11_w_pend', page: 109, fig: 'الشكل 24',
    desc: 'الكرة التي تسقط وترتد عن الأرض لا تعود إلى ارتفاعها الأصلي، والبندول المهتز تقل سعة اهتزازه حتى يتوقف. لا تختفي الطاقة الميكانيكية بل تتحول إلى طاقة حرارية بسبب مقاومة الهواء والاحتكاك والتصادم. قانون حفظ الطاقة: الطاقة لا تفنى ولا تستحدث ولكن تتحول من شكل إلى آخر، والطاقة الكلية للنظام المعزول ثابتة.',
    tags: 'قانون حفظ الطاقة الطاقة لا تفنى ولا تستحدث الشكل 24 كرة مرتدة بندول مقاومة الهواء احتكاك طاقة حرارية تحول الطاقة نظام معزول',
    tools: ['كرة مطاطية', 'بندول بسيط', 'مسطرة مترية', 'حامل'],
    steps: ['«الكرة المرتدة»: اسحب الكرة إلى ارتفاع ثم اتركها: يقل ارتفاع الارتداد في كل مرة.', 'راقب عمود الحرارة يزداد بقدر ما تنقص الطاقة الميكانيكية، والمجموع ثابت.', '«البندول»: اسحب الثقل جانباً واتركه، وغيّر نسبة الطاقة الضائعة من اللوحة.', 'اجعل الطاقة الضائعة صفراً: تبقى الحركة بلا نهاية تقريباً.'],
    concl: ['الطاقة الميكانيكية تنقص بسبب الاحتكاك ومقاومة الهواء وتتحول إلى حرارة.', 'الطاقة الكلية = PE + KE + الحرارة تبقى ثابتة.', 'الطاقة لا تفنى ولا تستحدث ولكن تتحول من شكل إلى آخر.'],
    laws: ['g11_l5_emech', 'g11_l5_wnc'],
    controls: [R('loss', 'الطاقة الضائعة', 0, 40, 15, 5, '%'), R('h', 'ارتفاع البداية', .5, 2.5, 2, .25, 'm'), R('m', 'الكتلة', .5, 5, 1, .5, 'kg')],
    setup(S) { S.md = 'ball'; S.y = S.p.h; S.vy = 0; S.hold = 0; S.E0 = S.p.m * 10 * S.p.h; S.th = Math.acos(1 - Math.min(S.p.h, 2) / LP); S.om = 0; S.tr = []; S.bn = 0; },
    rel(S) { S.vy = 0; S.y = S.p.h; S.th = Math.acos(1 - Math.min(S.p.h, 2) / LP); S.om = 0; S.E0 = S.p.m * 10 * (S.md === 'ball' ? S.p.h : Math.min(S.p.h, 2)); S.tr = []; S.bn = 0; },
    E(S) { const m = S.p.m; if (S.md === 'ball') return { PE: m * 10 * S.y, KE: .5 * m * S.vy * S.vy }; const hh = LP * (1 - Math.cos(S.th)), v = S.om * LP; return { PE: m * 10 * hh, KE: .5 * m * v * v }; },
    update(S, dt) { if (S.hold) return; const n = 10, h = dt * SL / n;
      if (S.md === 'ball') { for (let i = 0; i < n; i++) { S.vy -= 10 * h; S.y += S.vy * h; if (S.y <= 0 && S.vy < 0) { S.y = 0; const v2 = S.vy * S.vy * (1 - S.p.loss / 100); S.vy = v2 < .09 ? 0 : Math.sqrt(v2); S.bn++; } } if (S.y <= 0 && S.vy === 0) S.y = 0; }
      else { const b = S.p.loss / 100 * .35; for (let i = 0; i < n; i++) { S.om += (-(10 / LP) * Math.sin(S.th) - b * S.om) * h; S.th += S.om * h; } }
      const E = D.E(S); S.tr.push(S.md === 'ball' ? S.y : S.th); if (S.tr.length > 40) S.tr.shift(); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, x1 = w - 350, gy = h - 200; return { w, h, L, x0, x1, gy, u: (gy - 110) / 2.8 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), E = D.E(S), Q = Math.max(0, S.E0 - E.PE - E.KE); Q55.bg(ctx, w, h); let title;
      if (S.md === 'ball') {
        const bx = (g.x0 + g.x1) / 2 + 20; Q55.floor(ctx, g.x0, g.x1 + 10, g.gy, { c0: '#94a3b8', c1: '#475569' });
        K.raw(ctx, () => { ctx.fillStyle = '#fef3c7'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; rr(ctx, g.x0 + 20, g.gy - 2.6 * g.u - 6, 26, 2.6 * g.u + 6, 3); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#78350f'; for (let k = 0; k <= 26; k++) { ctx.lineWidth = k % 5 ? .7 : 1.4; ctx.beginPath(); ctx.moveTo(g.x0 + 46, g.gy - k * .1 * g.u); ctx.lineTo(g.x0 + 46 - (k % 5 ? 6 : 12), g.gy - k * .1 * g.u); ctx.stroke(); } });
        for (let k = 0; k <= 2.5; k += .5) Q42.T(ctx, String(k), g.x0 + 8, g.gy - k * g.u, { s: 9, w: 800, c: '#78350f' });
        Q41.line(ctx, [[bx - 60, g.gy - S.p.h * g.u], [bx + 60, g.gy - S.p.h * g.u]], '#7c3aed', 1.6, [6, 4]); Q42.T(ctx, 'ارتفاع البداية', bx + 110, g.gy - S.p.h * g.u, { s: 10, w: 800, c: '#7c3aed' });
        S.tr.forEach((y, i) => { if (i % 5 === 0) { K.raw(ctx, () => { ctx.globalAlpha = .12 + i / 40 * .2; }); K.ball(ctx, bx - 40 + i, g.gy - y * g.u - 16, 16, '#f97316'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); } });
        K.ball(ctx, bx, g.gy - S.y * g.u - 16, 16, '#ea580c');
        if (Q > .05 && S.y < .1) K.raw(ctx, () => { ctx.fillStyle = 'rgba(249,115,22,.35)'; ctx.beginPath(); ctx.ellipse(bx, g.gy, 30, 6, 0, 0, TAU); ctx.fill(); });
        Q41.knob(ctx, bx + 26, g.gy - S.y * g.u - 16, '#ea580c', 7);
        title = 'الشكل 24: الكرة المرتدة';
      } else {
        const px = (g.x0 + g.x1) / 2 + 20, py = 110, Lp = LP * g.u * .95, bx = px + Math.sin(S.th) * Lp, by = py + Math.cos(S.th) * Lp;
        K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(px - 90, py - 14, 180, 12); ctx.strokeStyle = 'rgba(124,58,237,.25)'; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(px, py, Lp, Math.PI / 2 - 1.4, Math.PI / 2 + 1.4); ctx.stroke(); ctx.setLineDash([]); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx, by); ctx.stroke(); });
        S.tr.forEach((t, i) => { if (i % 6 === 0) { K.raw(ctx, () => { ctx.globalAlpha = .1 + i / 40 * .2; }); K.ball(ctx, px + Math.sin(t) * Lp, py + Math.cos(t) * Lp, 18, '#7c3aed'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); } });
        K.ball(ctx, bx, by, 18, '#7c3aed'); Q41.line(ctx, [[px - 120, py + Lp + 18], [px + 120, py + Lp + 18]], '#94a3b8', 1.2, [4, 4]);
        title = 'الشكل 24: البندول';
      }
      Q55.bars(ctx, w - 300, 360, 120, [['PE', E.PE, '#0284c7', Q55.f(E.PE, 1)], ['KE', E.KE, '#dc2626', Q55.f(E.KE, 1)], ['حرارة', Q, '#f97316', Q55.f(Q, 1)], ['الكلية', E.PE + E.KE + Q, '#16a34a', Q55.f(E.PE + E.KE + Q, 1)]], Math.max(1, S.E0) * 1.05, { title: 'الطاقة (J)', bw: 40, gap: 16 });
      Q55.card(ctx, S, [{ t: 'الطاقة الميكانيكية الآن:', c: '#334155', w: 800 }, { t: 'PE + KE = ' + Q55.f(E.PE + E.KE, 2) + ' J', mono: 1, c: '#0284c7', w: 900 }, { t: 'الحرارة المتولدة:', c: '#f97316', w: 800 }, { t: 'Q = ' + Q55.f(Q, 2) + ' J', mono: 1, c: '#f97316', w: 900 }, { t: 'PE + KE + Q = ' + Q55.f(S.E0, 2) + ' J', mono: 1, c: '#16a34a', w: 900, s: 14 }, { t: 'الطاقة لا تفنى ولا تستحدث ولكن تتحول من شكل إلى آخر', c: '#16a34a', w: 900 }], { title });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p);
      Q42.banner(ctx, w, S.md === 'ball' ? 'اسحب الكرة إلى ارتفاع ثم اتركها' : 'اسحب الثقل جانباً ثم اتركه', '#f97316');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['ball', 'الكرة المرتدة'], ['pend', 'البندول']], g.h - 128, S.md, (S2, k) => { S2.md = k; D.rel(S2); }, { bw: 200, col: '#f97316' }),
      p: Q42.chips(S, 'pl', [['re', '↺ أطلق من جديد'], ['z', 'بلا ضياع للطاقة']], g.h - 84, '', (S2, k) => { if (k === 'z') setParam(S2, 'loss', 0); D.rel(S2); }, { bw: 200 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), out = [];
      if (S.md === 'ball') { const bx = (g.x0 + g.x1) / 2 + 20; out.push({ id: 'ball', x: bx, y: g.gy - S.y * g.u - 16, r: 28, axis: 'y', keep: true, tip: 'اسحب الكرة للأعلى ثم اترك', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; setParam(S2, 'h', clamp(Math.round((g.gy - d.y - 16) / g.u * 4) / 4, .5, 2.5)); S2.y = S2.p.h; S2.vy = 0; }, up: S2 => { S2.hold = 0; D.rel(S2); } }); }
      else { const px = (g.x0 + g.x1) / 2 + 20, py = 110, Lp = LP * g.u * .95; out.push({ id: 'bob', x: px + Math.sin(S.th) * Lp, y: py + Math.cos(S.th) * Lp, r: 28, axis: 'x', keep: true, tip: 'اسحب الثقل جانباً ثم اترك', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; const t = clamp(Math.asin(clamp((d.x - px) / Lp, -1, 1)), -1.35, 1.35); S2.th = t; S2.om = 0; }, up: S2 => { S2.hold = 0; S2.om = 0; S2.E0 = S2.p.m * 10 * LP * (1 - Math.cos(S2.th)); S2.tr = []; } }); }
      return out.concat(C.m, C.p); },
    readings(S) { const E = D.E(S); return [rd('PE', Q55.f(E.PE, 2) + ' J'), rd('KE', Q55.f(E.KE, 2) + ' J'), rd('الحرارة', Q55.f(Math.max(0, S.E0 - E.PE - E.KE), 2) + ' J'), rd('الطاقة الكلية', Q55.f(S.E0, 2) + ' J')].concat(S.md === 'ball' ? [rd('عدد الارتدادات', S.bn)] : []); },
    explain(S) { return Q26.ex('يقل ارتفاع الارتداد أو سعة الاهتزاز تدريجياً حتى تتوقف الحركة.', 'جزء من الطاقة الميكانيكية يتحول في كل ارتداد أو اهتزازة إلى طاقة حرارية بسبب مقاومة الهواء والاحتكاك، والطاقة الكلية تبقى ثابتة لأن الطاقة لا تفنى ولا تستحدث.', 'في محطات الطاقة الكهرومائية تتحول الطاقة الكامنة للماء إلى حركية ثم إلى كهربائية، ويضيع جزء منها حرارة.'); }
  };
  M8.P[D.id] = D;
})();


/* =============== E1 — الزخم والدفع: مثال 9 ومثال 10 (الشكل 25) والوسادة الهوائية (5-8، ص 110–112) =============== */
(() => {
  const EX9 = { q: 'سيارة كتلتها 1200 kg. احسب: a زخمها حين تتحرك بسرعة 20 m/s شمالاً. b زخمها إذا توقفت ثم تحركت نحو الجنوب بسرعة 40 m/s. c التغير في زخم السيارة في الحالتين السابقتين.', lines: ['P = m v', 'Pi = m vi = 1200 × 20 = 24 × 10³ kg.m/s', 'الزخم شمالاً', 'Pf = m vf = 1200 × 40 = 48 × 10³ kg.m/s', 'الزخم جنوباً', 'ΔP = Pf − Pi', 'ΔP = 48 × 10³ − 24 × 10³', 'ΔP = 24 × 10³ kg.m/s', 'التغير في الزخم جنوباً'] };
  const EX10 = { q: 'اصطدمت سيارة كتلتها 1200 kg ومقدار سرعتها 20 m/s بشجرة وتوقفت بعد أن قطعت مسافة 1.5 m بزمن قدره 0.15 s. جد مقدار القوة المتوسطة في إيقاف الشجرة للسيارة.', lines: ['F t = m (vf − vi)', 'vi = 20 m/s    vf = 0', 'F × 0.15 = 1200 × (0 − 20)', 'F = −24000 / 0.15', 'F = −16 × 10⁴ N', 'الإشارة السالبة تعني أن القوة تعاكس اتجاه الحركة'] };
  const MP = 60, T1 = .02;
  const D = { id: 'g11_w_imp', page: 110, fig: 'مثال 9 + مثال 10 والشكل 25 + الشكل 26',
    desc: 'الزخم الخطي P = m v كمية متجهة باتجاه السرعة، ووحدته kg.m/s. والدفع حاصل ضرب القوة في زمن تأثيرها ويساوي التغير في الزخم: F t = m vf − m vi. لذلك كلما زاد زمن التصادم قلّت القوة المؤثرة للتغير نفسه في الزخم، وهذه فكرة الوسادة الهوائية في السيارات.',
    tags: 'الزخم الخطي P=mv kg.m/s كمية متجهة الدفع Ft=mvf−mvi مثال 9 1200kg 20m/s شمالاً 40m/s جنوباً 24×10³ 48×10³ مثال 10 شجرة 1.5m 0.15s −16×10⁴N الشكل 25 الوسادة الهوائية الشكل 26 زمن التصادم',
    tools: ['عربة', 'مسار', 'مستشعر قوة', 'ساعة توقيت'],
    steps: ['«مثال 9»: اختر الحالة a ثم b وقارن سهمي الزخم. سهم ΔP يمثل Pf − Pi.', '«مثال 10»: اضغط «▶ صادم» لترى السيارة تصطدم بالشجرة بعرض بطيء، والمساحة تحت مخطط F − t تساوي الدفع.', 'غيّر زمن التصادم t: كلما زاد t قلّت القوة.', '«الوسادة الهوائية»: الراكب يتوقف في زمن أطول فتكون القوة عليه أصغر.'],
    concl: ['P = m v ، وفي مثال 9: Pi = 24 × 10³ kg.m/s شمالاً و Pf = 48 × 10³ kg.m/s جنوباً.', 'F t = m vf − m vi ، وفي مثال 10: F = −16 × 10⁴ N.', 'زيادة زمن التصادم تقلل القوة المؤثرة، كما في الوسادة الهوائية.'],
    laws: ['g11_l5_mom', 'g11_l5_imp'],
    controls: [R('m', 'كتلة السيارة m', 500, 3000, 1200, 100, 'kg'), R('v1', 'السرعة الأولى vi', 0, 40, 20, 1, 'm/s'), R('v2', 'السرعة جنوباً في مثال 9', 0, 40, 40, 1, 'm/s'), R('t', 'زمن التصادم t', .02, 1, .15, .01, 's')],
    setup(S) { S.md = 'mom'; S.st = 'a'; S.cx = 0; S.rot = 0; S.ph = 0; S.ct = 0; S.run = 0; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, x1 = w - 30, gy = h - 230; return { w, h, L, x0, x1, gy }; },
    update(S, dt) { const g = S.W ? D.geo(S) : null; if (!g) return;
      if (S.md === 'mom') { const v = S.st === 'a' ? S.p.v1 : -S.p.v2, span = g.x1 - g.x0 - 120; S.cx = ((S.cx + v * 6 * dt) % span + span) % span; S.rot += v * dt * .5; }
      else if (S.run) { if (S.ph === 0) { S.cx += 260 * dt; if (S.cx >= 1) { S.cx = 1; S.ph = 1; S.ct = 0; } } else if (S.ph === 1) { S.ct += dt / 8; if (S.ct >= Math.max(S.p.t, S.md === 'bag' ? T1 : 0)) { S.ct = Math.max(S.p.t, S.md === 'bag' ? T1 : 0); S.ph = 2; S.run = 0; } } } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), m = S.p.m; Q55.bg(ctx, w, h); let L, title, ex;
      if (S.md === 'mom') {
        const Pi = m * S.p.v1, Pf = m * S.p.v2, dP = -(Pf + Pi), k = 150 / Math.max(1, Pi, Pf, Math.abs(dP) * .75), ox = g.L + 250;
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; rr(ctx, g.L + 40, 84, w - 400 - g.L, 230, 10); ctx.fill(); ctx.stroke(); });
        Q41.line(ctx, [[ox, 96], [ox, 300]], '#94a3b8', 1.2, [4, 3]);
        Q55.arrow(ctx, ox, 130, Pi * k, 0, '#16a34a', 'Pi', 3.4); Q42.T(ctx, Q55.f(Pi / 1000, 1) + ' × 10³', ox + Pi * k / 2, 152, { s: 10, w: 900, c: '#15803d' });
        Q55.arrow(ctx, ox, 200, -Pf * k, 0, '#dc2626', 'Pf', 3.4); Q42.T(ctx, Q55.f(Pf / 1000, 1) + ' × 10³', ox - Pf * k / 2, 222, { s: 10, w: 900, c: '#b91c1c' });
        Q55.arrow(ctx, ox, 268, dP * k, 0, '#7c3aed', 'ΔP', 3.4); Q42.T(ctx, Q55.f(Math.abs(dP) / 1000, 1) + ' × 10³', ox + dP * k / 2, 290, { s: 10, w: 900, c: '#6d28d9' });
        Q42.T(ctx, 'جنوب', g.L + 70, 104, { s: 11, w: 900, c: '#475569' }); Q42.T(ctx, 'شمال', w - 390, 104, { s: 11, w: 900, c: '#475569' });
        Q52.road(ctx, g.x0, g.x1, g.gy, 34, 0); const v = S.st === 'a' ? S.p.v1 : -S.p.v2, cx = g.x0 + 60 + S.cx;
        Q52.car(ctx, cx, g.gy, 1.4, '#dc2626', S.rot, v >= 0 ? 1 : -1);
        if (Math.abs(v) > .1) Q55.arrow(ctx, cx, g.gy - 86, v * 3, 0, v > 0 ? '#16a34a' : '#dc2626', 'P', 3.4);
        Q42.T(ctx, 'نحو الشمال ⟵ يمين', g.x1 - 80, g.gy + 52, { s: 10.5, w: 900, c: '#fff', bg: '#475569' });
        title = 'مثال 9: الزخم كمية متجهة'; ex = EX9;
        L = [{ t: 'P = m v', mono: 1, w: 900, s: 14 }, { t: 'الحالة a: الزخم شمالاً', c: '#16a34a', w: 800 }, { t: 'Pi = ' + Q55.n(Pi) + ' kg.m/s', mono: 1, c: '#16a34a', w: 900 }, { t: 'الحالة b: الزخم جنوباً', c: '#dc2626', w: 800 }, { t: 'Pf = ' + Q55.n(Pf) + ' kg.m/s', mono: 1, c: '#dc2626', w: 900 }, { t: 'الفرق بين المقدارين كما في الكتاب:', c: '#334155', w: 800 }, { t: 'Pf − Pi = ' + Q55.n(Pf - Pi) + ' kg.m/s', mono: 1, c: '#334155', w: 800 }, { t: 'بطرح المتجهين باعتبار الشمال موجباً:', c: '#7c3aed', w: 800 }, { t: 'ΔP = ' + Q55.n(dP) + ' kg.m/s', mono: 1, c: '#7c3aed', w: 900 }];
      } else {
        const vi = S.p.v1, tb = S.p.t, bag = S.md === 'bag', ct = S.ph === 0 ? 0 : S.ct;
        const ser = bag ? [[T1, MP * vi / T1, '#dc2626', 'بلا وسادة'], [tb, MP * vi / tb, '#16a34a', 'مع الوسادة']] : [[tb, m * vi / tb, '#dc2626', 'F']];
        const tm = Math.max(...ser.map(q => q[0])) * 1.25, Fm = Math.max(...ser.map(q => q[1])) / 1000 * 1.15, ys = Q55.nice(Fm / 4);
        const A = Q55.axes(ctx, { x: g.L + 70, y: 92, w: w - 450 - g.L, h: 190, x1: tm, y0: 0, y1: Math.ceil(Fm / ys) * ys, xs: Q55.nice(tm / 6), ys, xl: 't (s)', yl: 'F (kN)', col: '#dc2626' });
        ser.forEach(q => { const tt = Math.min(ct, q[0]); K.raw(ctx, () => { ctx.fillStyle = q[2]; ctx.globalAlpha = .25; ctx.fillRect(A.X(0), A.Y(q[1] / 1000), A.X(tt) - A.X(0), A.Y(0) - A.Y(q[1] / 1000)); ctx.globalAlpha = 1; }); Q52.plot(ctx, [[A.X(0), A.Y(0)], [A.X(0), A.Y(q[1] / 1000)], [A.X(q[0]), A.Y(q[1] / 1000)], [A.X(q[0]), A.Y(0)]], q[2], 2.4); Q42.T(ctx, q[3] + '', A.X(q[0]) + 4, A.Y(q[1] / 1000) - 10, { s: 10, w: 900, c: q[2], a: 'left', bg: 'rgba(255,255,255,.8)' }); });
        Q42.T(ctx, 'المساحة = الدفع F t', A.X(tm * .55), A.Y(Fm * .55), { s: 10.5, w: 900, c: '#334155', bg: 'rgba(255,255,255,.85)' });
        if (!bag) {
          Q55.ground(ctx, g.x0, g.x1, g.gy); const tx = g.x1 - 110; Q52.tree(ctx, tx, g.gy, 2.6);
          const d = vi * tb / 2, f = S.ph === 0 ? 0 : clamp(ct / tb, 0, 1), crush = (1 - (1 - f) * (1 - f)) * Math.min(60, d * 22), start = g.x0 + 60, hit = tx - 8 - 1.4 * 46;
          const cx = S.ph === 0 ? start + (hit - start) * S.cx : hit + crush * .5;
          Q52.car(ctx, cx, g.gy, 1.4, '#ea580c', 0, 1);
          if (S.ph > 0 && f < 1) K.raw(ctx, () => { ctx.fillStyle = 'rgba(250,204,21,.6)'; ctx.beginPath(); ctx.arc(tx - 8, g.gy - 30, 16 + Math.random() * 10, 0, TAU); ctx.fill(); });
          if (S.ph > 0) Q55.arrow(ctx, tx - 12, g.gy - 70, -40 - m * vi / tb / 4000, 0, '#dc2626', 'F', 3.6);
          if (S.ph === 0) Q55.arrow(ctx, cx, g.gy - 86, 20 + vi * 2.5, 0, '#2563eb', 'v', 3);
          if (S.ph > 0) Q42.T(ctx, 'عرض بطيء', g.x0 + 80, g.gy + 34, { s: 10, w: 800, c: '#64748b' });
          const F = -m * vi / tb; title = 'مثال 10: السيارة والشجرة'; ex = EX10;
          L = [{ t: 'F t = m (vf − vi)', mono: 1, w: 900, s: 14 }, { t: 'Δp = ' + Q55.n(-m * vi) + ' kg.m/s', mono: 1, c: '#7c3aed', w: 800 }, { t: 't = ' + tb + ' s', mono: 1, c: '#334155', w: 800 }, { t: 'F = ' + Q55.n(F) + ' N', mono: 1, c: '#dc2626', w: 900, s: 14 }, { t: 'مسافة التوقف = ' + Q55.f(d, 2) + ' m', c: '#334155' }, { t: 'القوة تعاكس الحركة، وتقل كلما زاد زمن التصادم', c: '#16a34a', w: 800 }];
        } else {
          const pw = (w - 120 - g.L) / 2;
          [[0, T1, 0], [1, tb, 1]].forEach(q => { const x0 = g.L + 40 + q[0] * (pw + 30), y0 = 330, f = S.ph === 0 ? 0 : clamp(ct / q[1], 0, 1), mv = S.ph === 0 ? 0 : (1 - (1 - f) * (1 - f));
            K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; rr(ctx, x0, y0, pw, 230, 12); ctx.fill(); ctx.stroke();
              ctx.fillStyle = '#334155'; ctx.fillRect(x0 + 30, y0 + 160, 70, 14); ctx.fillRect(x0 + 30, y0 + 70, 14, 104);
              ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(x0 + pw - 20, y0 + 80); ctx.lineTo(x0 + pw - 70, y0 + 110); ctx.lineTo(x0 + pw - 70, y0 + 200); ctx.lineTo(x0 + pw - 20, y0 + 200); ctx.fill();
              ctx.strokeStyle = '#111827'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x0 + pw - 70, y0 + 110); ctx.lineTo(x0 + pw - 100, y0 + 90); ctx.stroke();
              if (q[2] && S.ph > 0) { ctx.fillStyle = 'rgba(241,245,249,.95)'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x0 + pw - 112, y0 + 84, 10 + 26 * Math.min(1, f * 4), 0, TAU); ctx.fill(); ctx.stroke(); }
              const hx = x0 + 70 + mv * (pw - 200 - (q[2] ? 24 : 0)), lean = mv * (pw - 200 - (q[2] ? 24 : 0)); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 + 66, y0 + 156); ctx.lineTo(hx, y0 + 100); ctx.stroke(); ctx.fillStyle = '#fcd34d'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(hx + 6, y0 + 80, 15, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(hx + 12, y0 + 77, 2, 0, TAU); ctx.fill(); if (lean < 0) ctx.stroke(); });
            Q42.T(ctx, q[2] ? 'مع الوسادة الهوائية' : 'بلا وسادة هوائية', x0 + pw / 2, y0 + 16, { s: 11, w: 900, c: '#fff', bg: q[2] ? '#16a34a' : '#dc2626' });
            Q42.T(ctx, 'F = ' + Q55.n(MP * vi / q[1]) + ' N', x0 + pw / 2, y0 + 214, { s: 11, w: 900, c: q[2] ? '#15803d' : '#b91c1c' }); });
          title = 'الشكل 26: الوسادة الهوائية'; ex = EX10;
          L = [{ t: 'راكب كتلته 60 kg يتوقف من ' + vi + ' m/s', c: '#334155', w: 800 }, { t: 'Δp = ' + Q55.n(MP * vi) + ' kg.m/s', mono: 1, c: '#7c3aed', w: 900 }, { t: 'بلا وسادة t = 0.02 s', c: '#dc2626', w: 800 }, { t: 'F = ' + Q55.n(MP * vi / T1) + ' N', mono: 1, c: '#dc2626', w: 900 }, { t: 'مع الوسادة t = ' + tb + ' s', c: '#16a34a', w: 800 }, { t: 'F = ' + Q55.n(MP * vi / tb) + ' N', mono: 1, c: '#16a34a', w: 900 }, { t: 'الدفع نفسه، والزمن الأطول يعني قوة أصغر', c: '#16a34a', w: 800 }];
        }
      }
      if (S.ex) Q55.steps(ctx, S, Object.assign({ title: S.md === 'mom' ? 'مثال 9 ص 111' : 'مثال 10 ص 111' }, ex, { k: S.k })); else Q55.card(ctx, S, L, { title });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, S.md === 'mom' ? 'اختر الحالة a أو b أو اسحب السيارة' : 'اضغط «▶ صادم» وغيّر زمن التصادم', '#7c3aed');
    },
    chips(S, g) { const mom = S.md === 'mom';
      return { m: Q42.chips(S, 'md', [['mom', 'مثال 9: الزخم'], ['tree', 'مثال 10: الشجرة'], ['bag', 'الوسادة الهوائية']], g.h - 172, S.md, (S2, k) => { S2.md = k; S2.ex = 0; S2.ph = 0; S2.cx = 0; S2.run = 0; S2.ct = 0; }, { bw: 190, col: '#7c3aed' }),
        p: mom ? Q42.chips(S, 'st', [['a', 'a: شمالاً ' + S.p.v1 + ' m/s'], ['b', 'b: جنوباً ' + S.p.v2 + ' m/s']], g.h - 128, S.st, (S2, k) => { S2.st = k; }, { bw: 200, col: '#7c3aed' })
          : Q55.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.ph === 2) { S2.ph = 0; S2.cx = 0; S2.ct = 0; } S2.run = S2.run ? 0 : 1; }, S2 => { S2.ph = 0; S2.cx = 0; S2.ct = 0; S2.run = 0; }, { go: '▶ صادم' }),
        e: mom ? Q55.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 9: الحل خطوة خطوة', S2 => { setParam(S2, 'm', 1200); setParam(S2, 'v1', 20); setParam(S2, 'v2', 40); }, EX9.lines.length)
          : Q55.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 10: الحل خطوة خطوة', S2 => { S2.md = 'tree'; setParam(S2, 'm', 1200); setParam(S2, 'v1', 20); setParam(S2, 't', .15); S2.ph = 0; S2.cx = 0; S2.ct = 0; S2.run = 1; }, EX10.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), out = [];
      if (S.md === 'mom') out.push({ id: 'car', x: g.x0 + 60 + S.cx, y: g.gy - 30, r: 40, axis: 'x', keep: true, tip: 'اسحب السيارة: اليمين شمال', idle: 'اسحب ✋', drag: (S2, d) => { S2.cx = clamp(d.x - g.x0 - 60, 0, g.x1 - g.x0 - 121); } });
      else out.push({ id: 'go', x: S.md === 'tree' ? g.x1 - 110 : (g.w + g.L) / 2, y: S.md === 'tree' ? g.gy - 60 : 450, r: 34, axis: 'none', keep: true, tip: 'اضغط لبدء التصادم', idle: 'اضغط ✋', click: S2 => { S2.ph = 0; S2.cx = 0; S2.ct = 0; S2.run = 1; } });
      return out.concat(C.m, C.p, C.e); },
    readings(S) { const m = S.p.m; if (S.md === 'mom') return [rd('Pi', Q55.n(m * S.p.v1) + ' kg.m/s'), rd('Pf', Q55.n(m * S.p.v2) + ' kg.m/s'), rd('ΔP بالمتجهات', Q55.n(-(m * S.p.v2 + m * S.p.v1)) + ' kg.m/s')];
      return S.md === 'tree' ? [rd('الدفع', Q55.n(-m * S.p.v1) + ' N.s'), rd('زمن التصادم', S.p.t + ' s'), rd('القوة المتوسطة', Q55.n(-m * S.p.v1 / S.p.t) + ' N')] : [rd('القوة بلا وسادة', Q55.n(MP * S.p.v1 / T1) + ' N'), rd('القوة مع الوسادة', Q55.n(MP * S.p.v1 / S.p.t) + ' N')]; },
    record(S) { return { m: S.p.m, v: S.p.v1, t: S.p.t, F: Math.round(S.p.m * S.p.v1 / S.p.t) }; },
    cols: [['m', 'm (kg)'], ['v', 'vi (m/s)'], ['t', 't (s)'], ['F', '|F| (N)']],
    explain(S) { return S.md === 'mom' ? Q26.ex('سهم الزخم يتجه دائماً باتجاه سرعة السيارة ويطول بزيادة السرعة.', 'الزخم P = m v كمية متجهة، لذلك عند انعكاس اتجاه الحركة ينعكس اتجاه الزخم، والتغير فيه يُحسب بطرح المتجهات.', 'إيقاف شاحنة ثقيلة أصعب من إيقاف دراجة بالسرعة نفسها لأن زخمها أكبر بكثير.') : Q26.ex('كلما طال زمن التصادم صغر ارتفاع مستطيل القوة مع بقاء مساحته (الدفع) ثابتة.', 'الدفع F t يساوي التغير في الزخم، فللتغير نفسه في الزخم تتناسب القوة عكسياً مع زمن التأثير.', 'الوسادة الهوائية وحزام الأمان ومقدمة السيارة القابلة للانبعاج كلها تطيل زمن التوقف فتقلل القوة على الركاب.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — حفظ الزخم وأنواع التصادم: مثال 11 ومثال 12 (5-9، الأشكال 28 – 30، ص 112–115) =============== */
(() => {
  const EX11 = { q: 'شاحنة كتلتها 3 × 10⁴ kg تتحرك بسرعة 10 m/s اصطدمت بسيارة كتلتها 1200 kg تتحرك باتجاه معاكس بسرعة 25 m/s فالتحمتا. ما سرعتهما بعد التصادم مباشرة؟', lines: ['الزخم قبل التصادم = الزخم بعده', 'm1 v1 + m2 v2 = (m1 + m2) v', '3 × 10⁴ × 10 + 1200 × (−25) = 31200 v', '300 000 − 30 000 = 31200 v', 'v = 270 000 / 31200', 'v = 8.65 m/s', 'باتجاه حركة الشاحنة'] };
  const EX12 = { q: 'عربة قطار كتلتها 2.5 × 10⁴ kg تتحرك بسرعة 8 m/s اصطدمت بعربة ساكنة كتلتها 1.5 × 10⁴ kg فالتحمتا وتحركتا معاً بسرعة 5 m/s. احسب التغير في الطاقة الحركية.', lines: ['KEi = ½ × 2.5 × 10⁴ × 8²', 'KEi = 80 × 10⁴ J', 'KEf = ½ × 4 × 10⁴ × 5²', 'KEf = 50 × 10⁴ J', 'ΔKE = 50 × 10⁴ − 80 × 10⁴', 'ΔKE = −30 × 10⁴ J', 'نقصت الطاقة الحركية: تصادم عديم المرونة'] };
  const SP = 5;
  const D = { id: 'g11_w_coll', page: 112, fig: 'مثال 11 + مثال 12 + الأشكال 28 و 29 و 30',
    desc: 'إذا كانت محصلة القوى الخارجية المؤثرة على منظومة تساوي صفراً فإن الزخم الكلي لها يبقى ثابتاً: m1 v1 + m2 v2 = m1 v1′ + m2 v2′. الزخم محفوظ في جميع أنواع التصادم، أما الطاقة الحركية فتحفظ فقط في التصادم المرن. في التصادم عديم المرونة يلتحم الجسمان ويتحركان معاً، وفي التصادم غير المرن ينفصلان مع فقدان جزء من الطاقة الحركية.',
    tags: 'حفظ الزخم الخطي m1v1+m2v2 التصادم المرن عديم المرونة التحام غير مرن كرة البولنج مثال 11 شاحنة 3×10⁴kg 10m/s سيارة 1200kg 25m/s 8.65m/s مثال 12 عربة قطار 2.5×10⁴ 8m/s 1.5×10⁴ 5m/s −30×10⁴J فكر',
    tools: ['مسار هوائي', 'عربتان', 'مشبك لاصق', 'نابض مصد', 'بوابتان ضوئيتان'],
    steps: ['اختر نوع التصادم، ثم اضغط «▶ صادم» وراقب أعمدة الزخم والطاقة قبل التصادم وبعده.', 'لاحظ أن الزخم الكلي لا يتغير أبداً، أما الطاقة الحركية فتنقص إلا في التصادم المرن.', 'غيّر الكتلتين والسرعتين من اللوحة، أو اسحب العربتين قبل التصادم.', 'اختر «مثال 11» أو «مثال 12» ثم اضغط الحل خطوة خطوة.'],
    concl: ['الزخم الكلي محفوظ في كل أنواع التصادم.', 'المرن: تحفظ الطاقة الحركية. عديم المرونة: يلتحم الجسمان. غير المرن: ينفصلان مع فقد طاقة.', 'مثال 11: v = 8.65 m/s. مثال 12: ΔKE = −30 × 10⁴ J.'],
    laws: ['g11_l5_pcons', 'g11_l5_mom'],
    controls: [R('m1', 'كتلة الجسم الأول m1', 500, 40000, 30000, 100, 'kg'), R('v1', 'سرعة الأول v1', -30, 30, 10, 1, 'm/s'), R('m2', 'كتلة الجسم الثاني m2', 500, 40000, 1200, 100, 'kg'), R('v2', 'سرعة الثاني v2', -30, 30, -25, 1, 'm/s')],
    setup(S) { S.ty = 'stick'; S.exn = 11; S.x1 = -1; S.x2 = 1; S.u1 = 0; S.u2 = 0; S.hit = 0; S.run = 0; S.ex = 0; S.k = 0; S.r1 = 0; S.r2 = 0; },
    after(S) { const m1 = S.p.m1, m2 = S.p.m2, v1 = S.p.v1, v2 = S.p.v2, P = m1 * v1 + m2 * v2, e = S.ty === 'elastic' ? 1 : S.ty === 'inel' ? .5 : 0; return [(P - m2 * e * (v1 - v2)) / (m1 + m2), (P + m1 * e * (v1 - v2)) / (m1 + m2)]; },
    bw(m) { return 56 + 80 * Math.sqrt(m / 40000); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, x1 = w - 20, gy = h - 230, cx = (x0 + x1) / 2; return { w, h, L, x0, x1, gy, cx }; },
    pos(S, g) { return [g.cx + S.x1 * 230 - D.bw(S.p.m1) / 2, g.cx + S.x2 * 230 + D.bw(S.p.m2) / 2]; },
    update(S, dt) { if (!S.run || !S.W) return; const g = D.geo(S), v1 = S.hit ? S.u1 : S.p.v1, v2 = S.hit ? S.u2 : S.p.v2;
      S.x1 += v1 * SP * dt / 230; S.x2 += v2 * SP * dt / 230; S.r1 += v1 * dt; S.r2 += v2 * dt;
      const p = D.pos(S, g); if (!S.hit && p[1] - p[0] <= (D.bw(S.p.m1) + D.bw(S.p.m2)) / 2) { S.hit = 1; const a = D.after(S); S.u1 = a[0]; S.u2 = a[1]; }
      if (p[0] < g.x0 - 40 || p[1] > g.x1 + 40 || p[0] > g.x1 + 40 || p[1] < g.x0 - 40 || Math.abs(S.x1) > 2.2 || Math.abs(S.x2) > 2.2) S.run = 0; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), m1 = S.p.m1, m2 = S.p.m2, v1 = S.p.v1, v2 = S.p.v2, a = D.after(S), Pi = m1 * v1 + m2 * v2, Pf = m1 * a[0] + m2 * a[1], Ki = .5 * m1 * v1 * v1 + .5 * m2 * v2 * v2, Kf = .5 * m1 * a[0] * a[0] + .5 * m2 * a[1] * a[1];
      const cur1 = S.hit ? S.u1 : v1, cur2 = S.hit ? S.u2 : v2; Q55.bg(ctx, w, h);
      const Pm = Math.max(1, Math.abs(Pi)) * 1.1; Q55.bars(ctx, g.L + 56, 112, 140, [['قبل', Pi, '#7c3aed', Q55.n(Pi)], ['بعد', S.hit ? Pf : 0, '#a855f7', S.hit ? Q55.n(Pf) : '?']], Pm, { neg: 1, title: 'الزخم الكلي', bw: 56, gap: 22 });
      Q55.bars(ctx, g.L + 56 + 134 + 40, 112, 140, [['قبل', Ki, '#dc2626', Q55.n(Ki)], ['بعد', S.hit ? Kf : 0, '#f97316', S.hit ? Q55.n(Kf) : '?']], Math.max(1, Ki) * 1.05, { title: 'الطاقة الحركية الكلية', bw: 56, gap: 22 });
      // track
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.gy, 0, g.gy + 16); gg.addColorStop(0, '#cbd5e1'); gg.addColorStop(1, '#64748b'); ctx.fillStyle = gg; ctx.fillRect(g.x0, g.gy, g.x1 - g.x0, 16); ctx.fillStyle = '#334155'; ctx.fillRect(g.x0, g.gy, g.x1 - g.x0, 3); });
      const p = D.pos(S, g), b1 = D.bw(m1), b2 = D.bw(m2);
      Q55.cart(ctx, p[0], g.gy, b1, '#dc2626', 'm1', S.r1); Q55.cart(ctx, p[1], g.gy, b2, '#2563eb', 'm2', S.r2);
      if (S.ty === 'stick') K.raw(ctx, () => { ctx.fillStyle = '#facc15'; ctx.fillRect(p[0] + b1 / 2, g.gy - 26, 6, 12); ctx.fillRect(p[1] - b2 / 2 - 6, g.gy - 26, 6, 12); });
      if (S.ty === 'elastic') K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 12; i++) ctx.lineTo(p[1] - b2 / 2 - 6 - i * 1.5, g.gy - 20 + (i % 2 ? 6 : -6)); ctx.stroke(); });
      [[p[0], cur1, b1, '#dc2626'], [p[1], cur2, b2, '#2563eb']].forEach(q => { const bh = Math.max(34, q[2] * .45); if (Math.abs(q[1]) > .05) Q55.arrow(ctx, q[0], g.gy - bh - 30, q[1] * 4, 0, q[3], Q55.f(q[1], 2) + ' m/s', 2.8); });
      if (!S.hit && v1 - v2 <= 0) Q42.T(ctx, 'الجسمان لا يقتربان: لا تصادم', g.cx, g.gy + 40, { s: 11, w: 900, c: '#fff', bg: '#dc2626' });
      const TY = { stick: 'تصادم عديم المرونة: يلتحم الجسمان', elastic: 'تصادم مرن: تحفظ الطاقة الحركية', inel: 'تصادم غير مرن: ينفصلان وتضيع طاقة' };
      const ex = S.exn === 11 ? EX11 : EX12;
      if (S.ex) Q55.steps(ctx, S, Object.assign({ title: S.exn === 11 ? 'مثال 11 ص 113' : 'مثال 12 ص 115' }, ex, { k: S.k }));
      else Q55.card(ctx, S, [{ t: 'm1 v1 + m2 v2 = m1 v1′ + m2 v2′', mono: 1, w: 900 }, { t: 'الزخم الكلي قبل التصادم وبعده:', c: '#7c3aed', w: 800 }, { t: 'Pi = ' + Q55.n(Pi) + '    Pf = ' + Q55.n(Pf), mono: 1, c: '#7c3aed', w: 800 }, { t: 'v1′ = ' + Q55.f(a[0], 2) + '    v2′ = ' + Q55.f(a[1], 2) + ' m/s', mono: 1, c: '#334155', w: 800 }, { t: 'ΔKE = ' + Q55.n(Kf - Ki) + ' J', mono: 1, c: '#dc2626', w: 900 }, { t: TY[S.ty], c: '#0f766e', w: 900 }, { t: 'الزخم محفوظ دائماً، والطاقة الحركية في المرن فقط', c: '#16a34a', w: 800 }], { title: 'حفظ الزخم في التصادم' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'اختر نوع التصادم ثم اضغط «▶ صادم»', '#7c3aed');
    },
    reset(S) { S.x1 = -1; S.x2 = 1; S.hit = 0; S.run = 0; },
    preset(S, n) { S.exn = n; S.ty = 'stick'; if (n === 11) { setParam(S, 'm1', 30000); setParam(S, 'v1', 10); setParam(S, 'm2', 1200); setParam(S, 'v2', -25); } else { setParam(S, 'm1', 25000); setParam(S, 'v1', 8); setParam(S, 'm2', 15000); setParam(S, 'v2', 0); } D.reset(S); },
    chips(S, g) { return { m: Q42.chips(S, 'ty', [['stick', 'عديم المرونة: التحام'], ['elastic', 'مرن'], ['inel', 'غير مرن']], g.h - 172, S.ty, (S2, k) => { S2.ty = k; D.reset(S2); }, { bw: 200, col: '#7c3aed' }),
      p: Q55.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.hit && !S2.run) D.reset(S2); S2.run = S2.run ? 0 : 1; }, S2 => D.reset(S2), { go: '▶ صادم', bw: 140, more: [['e11', 'مثال 11'], ['e12', 'مثال 12']], onMore: (S2, k) => { D.preset(S2, k === 'e11' ? 11 : 12); S2.ex = 0; } }),
      e: Q55.stepChips(S, 'ex', g.h - 84, g.L, 'مثال ' + S.exn + ': الحل خطوة خطوة', S2 => { D.preset(S2, S2.exn); S2.run = 1; }, (S.exn === 11 ? EX11 : EX12).lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), p = D.pos(S, g);
      return [{ id: 'c1', x: p[0], y: g.gy - 30, r: 34, axis: 'x', keep: true, tip: 'اسحب العربة الأولى', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.hit = 0; S2.x1 = clamp((d.x + D.bw(S2.p.m1) / 2 - g.cx) / 230, -1.6, S2.x2 - .3); } },
        { id: 'c2', x: p[1], y: g.gy - 30, r: 34, axis: 'x', keep: true, hint: false, tip: 'اسحب العربة الثانية', drag: (S2, d) => { S2.run = 0; S2.hit = 0; S2.x2 = clamp((d.x - D.bw(S2.p.m2) / 2 - g.cx) / 230, S2.x1 + .3, 1.6); } }].concat(C.m, C.p, C.e); },
    readings(S) { const a = D.after(S), m1 = S.p.m1, m2 = S.p.m2; return [rd('الزخم قبل', Q55.n(m1 * S.p.v1 + m2 * S.p.v2) + ' kg.m/s'), rd('الزخم بعد', Q55.n(m1 * a[0] + m2 * a[1]) + ' kg.m/s'), rd('v1 بعد', Q55.f(a[0], 2) + ' m/s'), rd('v2 بعد', Q55.f(a[1], 2) + ' m/s'), rd('ΔKE', Q55.n(.5 * m1 * (a[0] ** 2 - S.p.v1 ** 2) + .5 * m2 * (a[1] ** 2 - S.p.v2 ** 2)) + ' J')]; },
    record(S) { const a = D.after(S); return { ty: S.ty, v1: Q55.f(a[0], 2), v2: Q55.f(a[1], 2), dK: Math.round(.5 * S.p.m1 * (a[0] ** 2 - S.p.v1 ** 2) + .5 * S.p.m2 * (a[1] ** 2 - S.p.v2 ** 2)) }; },
    cols: [['ty', 'النوع'], ['v1', 'v1′ (m/s)'], ['v2', 'v2′ (m/s)'], ['dK', 'ΔKE (J)']],
    explain(S) { return Q26.ex('عمودا الزخم قبل التصادم وبعده متساويان دائماً، أما عمود الطاقة الحركية فينقص إلا في التصادم المرن.', 'قوتا التصادم بين الجسمين داخليتان ومتساويتان مقداراً ومتعاكستان اتجاهاً، فلا يتغير الزخم الكلي. وفي التصادم غير المرن يتحول جزء من الطاقة الحركية إلى حرارة وصوت وتشوه.', 'عند ضرب كرات البولنج للقناني تنفصل الأجسام بعد التصادم ويضيع جزء من الطاقة صوتاً، وهو تصادم غير مرن.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — مسائل الفصل الخامس: س1 … س7 بحل خطوة خطوة (ص 117–118) =============== */
(() => {
  const PR = [
    { q: 'سقط جسم كتلته 2 kg من ارتفاع 10 m على أرض رملية واستقر فيها بعد أن قطع 3 cm شاقولياً داخل الرمل. ما متوسط القوة التي يؤثر بها الرمل على الجسم؟ بإهمال تأثير الهواء.', lines: ['الجسم بدأ وانتهى ساكناً لذلك ΔKE = 0', 'شغل الوزن على المسافة كلها:', 'W1 = m g (h + d) = 2 × 10 × 10.03', 'W1 = 200.6 J', 'شغل الرمل W2 = −F × d', '200.6 − F × 0.03 = 0', 'F ≈ 6687 N', 'بإهمال الوزن داخل الرمل:', 'F = 200 / 0.03 ≈ 6667 N'] },
    { q: 'انزلقت سيارة كتلتها 1250 kg فوصلت إلى حالة السكون بعد أن قطعت مسافة 36 m. ما مقدار قوة الاحتكاك بين إطاراتها وسطح الطريق إذا كان معامل الاحتكاك الانزلاقي 0.7؟ وما الشغل الذي بذلته قوة الاحتكاك؟', lines: ['f = μ m g = 0.7 × 1250 × 10', 'f = 8750 N', 'W = f x cos180°', 'W = 8750 × 36 × (−1)', 'W = −315 000 J'] },
    { q: 'دُفع صندوق شحن كتلته 80 kg مسافة 3.5 m إلى أعلى سطح مائل مهمل الاحتكاك يميل بزاوية 37° على الأفق. ما مقدار الشغل المبذول؟ افرض أن الصندوق يُدفع بسرعة ثابتة.', lines: ['السرعة ثابتة لذلك F = m g sin37°', 'F = 80 × 10 × 0.6 = 480 N', 'W = F x = 480 × 3.5', 'W = 1680 J', 'الارتفاع h = 3.5 × 0.6 = 2.1 m', 'W = m g h = 80 × 10 × 2.1 = 1680 J'] },
    { q: 'ما مقدار القدرة اللازمة لدفع عربة تسوق بقوة أفقية مقدارها 50 N مسافة أفقية مقدارها 20 m خلال 5 s؟', lines: ['W = F x = 50 × 20', 'W = 1000 J', 'P = W / t = 1000 / 5', 'P = 200 W'] },
    { q: 'قوة احتكاك مقدارها 20 N تؤثر في صندوق كتلته 6 kg يزلق على أرضية أفقية. ما مقدار القدرة اللازمة لسحب الصندوق على الأرضية بسرعة ثابتة مقدارها 0.6 m/s؟', lines: ['السرعة ثابتة لذلك F = f = 20 N', 'P = F v = 20 × 0.6', 'P = 12 W'] },
    { q: 'يستطيع جرار شد محصول بقوة ثابتة مقدارها 12000 N عندما تكون سرعته 2.5 m/s. ما قيمة قدرة الجرار بالواط وبالقدرة الحصانية تحت هذه الشروط؟', lines: ['P = F v = 12000 × 2.5', 'P = 30 000 W', 'P = 30 000 / 746', 'P ≈ 40.2 hp'] },
    { q: 'بينما كان أحد لاعبي كرة القدم كتلته 90 kg يجري بسرعة 6 m/s قام لاعب من الفريق الآخر بشده من الخلف فتوقف بعد أن قطع مسافة 1.8 m. a ما مقدار متوسط القوة التي سببت إيقاف اللاعب؟ b ما الزمن الذي استغرقه اللاعب ليتوقف تماماً؟', lines: ['W = ΔKE = 0 − ½ × 90 × 6²', 'W = −1620 J', '−F × 1.8 = −1620', 'F = 900 N', 'F t = m (vf − vi)', '−900 × t = 90 × (0 − 6)', 't = 0.6 s'] }];
  const D = { id: 'g11_w_prob', page: 117, fig: 'مسائل الفصل الخامس س1 – س7',
    desc: 'مسائل نهاية الفصل الخامس من الكتاب، لكل مسألة مشهد متحرك يوضح الموقف وحل خطوة خطوة: الشغل ومبرهنة الشغل − الطاقة (س1 و س2 و س3 و س7)، والقدرة (س4 و س5 و س6)، والدفع (س7).',
    tags: 'مسائل الفصل الخامس س1 2kg 10m رمل 3cm 6687N س2 1250kg 36m 0.7 8750N −315000J س3 80kg 3.5m 37° 1680J س4 50N 20m 5s 200W س5 20N 0.6m/s 12W س6 12000N 2.5m/s 30000W 40.2hp س7 90kg 6m/s 1.8m 900N 0.6s',
    tools: ['ورقة وقلم', 'آلة حاسبة'],
    steps: ['اختر رقم المسألة من الأزرار العليا.', 'اضغط «▶ شغّل» لترى المشهد يتحرك.', 'اضغط «الحل خطوة خطوة» ثم «الخطوة التالية» لكشف الحل سطراً سطراً.'],
    concl: ['س1: F ≈ 6687 N ، س2: f = 8750 N و W = −315 000 J ، س3: W = 1680 J.', 'س4: P = 200 W ، س5: P = 12 W ، س6: P = 30 000 W ≈ 40.2 hp.', 'س7: F = 900 N و t = 0.6 s.'],
    laws: ['g11_l5_work', 'g11_l5_ke', 'g11_l5_power', 'g11_l5_pinst', 'g11_l5_imp'],
    controls: [R('spd', 'سرعة العرض', .5, 2, 1, .5, '×'), TG('dim', 'الأبعاد والقوى', true, null, 'ruler')],
    setup(S) { S.n = 0; S.f = 0; S.run = 1; S.ex = 0; S.k = 0; S.tk = 0; },
    update(S, dt) { S.tk += dt; if (S.run) { S.f += dt * S.p.spd / 3; if (S.f >= 1) { S.f = 1; S.run = 0; } } },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, x1 = w - 350, gy = h - 240; return { w, h, L, x0, x1, gy }; },
    rbox(ctx, x, y, a, bw, bh, col) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); const g = ctx.createLinearGradient(0, -bh, 0, 0); g.addColorStop(0, shade(col, 35)); g.addColorStop(1, shade(col, -35)); ctx.fillStyle = g; rr(ctx, -bw / 2, -bh, bw, bh, 4); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.5)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-bw / 2 + 4, -bh + 4); ctx.lineTo(bw / 2 - 4, -4); ctx.moveTo(bw / 2 - 4, -bh + 4); ctx.lineTo(-bw / 2 + 4, -4); ctx.stroke(); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), f = S.f, eo = 1 - (1 - f) * (1 - f), dm = S.p.dim, n = S.n; Q55.bg(ctx, w, h);
      const cx = (g.x0 + g.x1) / 2;
      if (n === 0) { const top = 100, sy = g.gy - 50, u = (sy - top - 20) / 10, ff = Math.min(1, f / .85), pen = f > .85 ? (f - .85) / .15 : 0, by = top + ff * ff * (sy - top - 14) + pen * 26;
        K.raw(ctx, () => { const gs = ctx.createLinearGradient(0, sy, 0, g.gy); gs.addColorStop(0, '#fde68a'); gs.addColorStop(1, '#b45309'); ctx.fillStyle = gs; ctx.fillRect(cx - 120, sy, 240, g.gy - sy); ctx.fillStyle = 'rgba(120,53,15,.35)'; for (let i = 0; i < 60; i++) { ctx.beginPath(); ctx.arc(cx - 115 + (i * 37) % 230, sy + 4 + (i * 13) % 44, 1.4, 0, TAU); ctx.fill(); } });
        K.ball(ctx, cx, by, 14, '#475569');
        if (dm) { Q55.dim(ctx, cx + 90, top + 14, cx + 90, sy, 'h = 10 m', '#7c3aed'); if (pen > 0) Q42.T(ctx, 'd = 3 cm', cx - 70, sy + 18, { s: 11, w: 900, c: '#fff', bg: '#be185d' }); Q55.arrow(ctx, cx - 40, by, 0, 40, '#475569', 'mg', 2.6); if (pen > 0) Q55.arrow(ctx, cx + 40, by + 10, 0, -70, '#dc2626', 'F', 3.4); } }
      else if (n === 1 || n === 5) { Q52.road(ctx, g.x0, g.x1 + 300, g.gy, 34, n === 5 ? -S.tk * 40 : 0);
        if (n === 1) { const sx = g.x0 + 60, ex = g.x0 + 60 + 400, x = sx + (ex - sx) * eo; K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.6)'; ctx.fillRect(sx - 40, g.gy + 4, x - sx, 3); ctx.fillRect(sx + 40, g.gy + 4, Math.max(0, x - sx - 0), 3); }); Q52.car(ctx, x, g.gy, 1.4, '#2563eb', 0, 1); if (dm) { Q55.arrow(ctx, x - 70, g.gy - 30, -70, 0, '#b45309', 'f', 3.4); Q55.dim(ctx, sx, g.gy + 50, ex, g.gy + 50, '36 m', '#7c3aed'); Q42.T(ctx, 'μ = 0.7', x, g.gy - 100, { s: 11, w: 900, c: '#fff', bg: '#475569' }); } }
        else { const x = g.x0 + 300; Q52.car(ctx, x, g.gy, 1.5, '#16a34a', S.tk * 3, 1); K.raw(ctx, () => { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 66, g.gy - 20); ctx.lineTo(x - 150, g.gy - 20); ctx.stroke(); }); Q55.crate(ctx, x - 230, g.gy, 80, 56, 'المحصول'); if (dm) { Q55.arrow(ctx, x - 100, g.gy - 70, 70, 0, '#dc2626', 'F', 3.4); Q55.arrow(ctx, x - 20, g.gy - 100, 60, 0, '#2563eb', 'v', 3); Q42.T(ctx, '12000 N    2.5 m/s', x - 60, g.gy - 140, { s: 11, w: 900, c: '#fff', bg: '#15803d' }); } } }
      else if (n === 2) { const bx0 = g.x0 + 30, a = 37 * Math.PI / 180, Ls = 420, tx = bx0 + Ls * Math.cos(a), ty = g.gy - Ls * Math.sin(a);
        Q55.ground(ctx, g.x0, g.x1 + 20, g.gy); K.raw(ctx, () => { const gi = ctx.createLinearGradient(0, ty, 0, g.gy); gi.addColorStop(0, '#cbd5e1'); gi.addColorStop(1, '#64748b'); ctx.fillStyle = gi; ctx.beginPath(); ctx.moveTo(bx0, g.gy); ctx.lineTo(tx, ty); ctx.lineTo(tx, g.gy); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.stroke(); ctx.strokeStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(bx0, g.gy, 50, -a, 0); ctx.stroke(); });
        Q42.T(ctx, '37°', bx0 + 66, g.gy - 16, { s: 11, w: 900, c: '#7c3aed' });
        const s0 = 60, s1 = 60 + 300, ss = s0 + (s1 - s0) * f, px = bx0 + ss * Math.cos(a), py = g.gy - ss * Math.sin(a); D.rbox(ctx, px, py, -a, 60, 46, '#d97706');
        if (dm) { Q55.arrow(ctx, px - 50 * Math.cos(a) + 20 * Math.sin(a), py + 50 * Math.sin(a) + 20 * Math.cos(a) - 30, 70 * Math.cos(a), -70 * Math.sin(a), '#dc2626', 'F', 3.4); Q55.arrow(ctx, px + 8, py - 20, 0, 60, '#475569', 'mg', 2.6); Q55.dim(ctx, bx0 + s0 * Math.cos(a) + 30 * Math.sin(a), g.gy - s0 * Math.sin(a) + 30 * Math.cos(a) - 0, bx0 + s1 * Math.cos(a) + 30 * Math.sin(a), g.gy - s1 * Math.sin(a) + 30 * Math.cos(a), '3.5 m', '#2563eb', { dx: 20, dy: 14 }); Q42.T(ctx, '80 kg', px, py - 70, { s: 11, w: 900, c: '#fff', bg: '#92400e' }); } }
      else if (n === 3 || n === 4) { Q55.floor(ctx, g.x0 - 10, g.x1 + 20, g.gy);
        if (n === 3) { const x = g.x0 + 120 + 300 * f; Q55.cart(ctx, x, g.gy, 90, '#0ea5e9', '', S.tk * (S.run ? 4 : 0)); Q55.man(ctx, x - 90, g.gy, { H: 150, dir: 1, lean: 14, hands: [[x - 50, g.gy - 70], [x - 50, g.gy - 60]], ph: S.run ? S.tk * 7 : 0 }); Q52.watch(ctx, g.x1 - 40, 130, 30, 5 * f, Q55.f(5 * f, 1) + ' s', 5); if (dm) { Q55.arrow(ctx, x - 40, g.gy - 110, 70, 0, '#dc2626', 'F = 50 N', 3.4); Q55.dim(ctx, g.x0 + 120, g.gy + 40, g.x0 + 420, g.gy + 40, '20 m', '#7c3aed'); } }
        else { const x = g.x0 + 60 + 300 * f; Q55.crate(ctx, x, g.gy, 80, 60, '6 kg'); K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 80, g.gy - 30); ctx.lineTo(x + 180, g.gy - 30); ctx.stroke(); }); C2.hand(ctx, x + 184, g.gy - 30, 1, .6, { rot: Math.PI }); if (dm) { Q55.arrow(ctx, x + 90, g.gy - 70, 60, 0, '#dc2626', 'F', 3.4); Q55.arrow(ctx, x, g.gy - 8, -60, 0, '#b45309', 'f = 20 N', 3); Q55.arrow(ctx, x + 20, g.gy - 100, 50, 0, '#2563eb', 'v = 0.6 m/s', 2.6); } } }
      else { Q55.floor(ctx, g.x0 - 10, g.x1 + 20, g.gy, { c0: '#86efac', c1: '#15803d' }); const sx = g.x0 + 160, x = sx + 260 * eo, ph = S.tk * 10 * (1 - f);
        Q55.man(ctx, x, g.gy, { H: 160, dir: 1, lean: 12 * (1 - f), ph, col: '#dc2626' }); Q55.man(ctx, x - 70, g.gy, { H: 155, dir: 1, lean: -10, ph: ph * .8, col: '#1d4ed8', hands: [[x - 20, g.gy - 120], [x - 22, g.gy - 110]] });
        if (dm) { Q55.arrow(ctx, x + 20, g.gy - 175, -70, 0, '#b45309', 'F', 3.4); Q55.dim(ctx, sx, g.gy + 40, sx + 260, g.gy + 40, '1.8 m', '#7c3aed'); if (f < 1) Q55.arrow(ctx, x + 30, g.gy - 100, 20 + 50 * (1 - eo), 0, '#2563eb', 'v', 3); Q42.T(ctx, '90 kg', x, g.gy - 200, { s: 11, w: 900, c: '#fff', bg: '#dc2626' }); } }
      const P = PR[n];
      if (S.ex) Q55.steps(ctx, S, Object.assign({ title: 'س' + (n + 1) + ' ص ' + (n < 2 ? 117 : 118) }, P, { k: S.k }));
      else Q55.card(ctx, S, [{ t: P.q, c: '#334155', w: 800, s: 12 }, { t: 'اضغط «الحل خطوة خطوة»', c: '#be185d', w: 900 }], { title: 'مسائل الفصل: س' + (n + 1) });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'اختر المسألة ثم شغّل المشهد', '#be185d');
    },
    chips(S, g) { return { m: Q42.chips(S, 'pn', PR.map((q, i) => [String(i), 'س' + (i + 1)]), g.h - 172, String(S.n), (S2, k) => { S2.n = +k; S2.f = 0; S2.run = 1; S2.ex = 0; S2.k = 0; }, { bw: 96, col: '#be185d' }),
      p: Q55.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.f >= 1) S2.f = 0; S2.run = S2.run ? 0 : 1; }, S2 => { S2.f = 0; S2.run = 0; }),
      e: Q55.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, PR[S.n].lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); return [{ id: 'scene', x: (g.x0 + g.x1) / 2, y: g.gy - 120, r: 40, axis: 'x', keep: true, tip: 'اسحب لتقديم المشهد أو إرجاعه', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.f = clamp((d.x - g.x0) / (g.x1 - g.x0), 0, 1); } }].concat(C.m, C.p, C.e); },
    readings(S) { const L = PR[S.n].lines; return [rd('المسألة', 'س' + (S.n + 1)), rd('الجواب', L[L.length - 1])]; },
    explain(S) { return Q26.ex('كل مسألة تطبيق مباشر لقانون من قوانين الفصل.', 'الشغل W = F x cosθ ، ومبرهنة الشغل − الطاقة W = ΔKE ، والقدرة P = W / t = F v ، والدفع F t = Δp.', 'حدد أولاً القوة والإزاحة والزمن المعطاة، ثم اختر القانون المناسب.'); }
  };
  M8.P[D.id] = D;
})();

/* ====================== wrappers ====================== */
Object.keys(M8.P).filter(k => /^g11_w_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f && !D._tap) { D._tap = 1; D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); } });
Object.keys(M8.P).filter(id => /^g11_w_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g11_c5_work', ch: 55, reg: X11, sec: '5-1 مفهوم الشغل + 5-2 التمثيل البياني للشغل', page: 93, kind: 'مثال',
  title: 'الشغل: W = F x cosθ ومتى يكون موجباً أو سالباً أو صفراً',
  desc: 'ندفع صندوقاً ونسحبه بحبل مائل لنرى أن مركبة القوة باتجاه الإزاحة وحدها تنجز شغلاً، ونرى حالات الشغل الصفري (الحركة الدائرية، حمل الدلو، دفع الجدار)، والشغل الموجب والسالب لرافع الأثقال، ثم نحسب الشغل من المساحة تحت مخطط القوة − الإزاحة. ونحل الأمثلة 1 و 2 و 3.',
  tags: 'الشغل جول Fcosθ شغل صفر شغل سالب المساحة تحت المخطط',
  fact: ['الشغل كمية قياسية ووحدته الجول، والجول الواحد هو الشغل الذي تنجزه قوة مقدارها 1 N عندما تحرك جسماً إزاحة 1 m باتجاهها (ص 93).', 'إذا كانت القوة عمودية على الإزاحة فلا تنجز شغلاً، لذلك لا تنجز القوة المركزية شغلاً على جسم يدور بانطلاق ثابت (ص 94).', 'الشغل يمكن حسابه بيانياً من المساحة المحصورة تحت منحني القوة − الإزاحة (ص 96).'],
  quiz: [
    { q: 'شخص يدفع مكنسة بقوة 50 N بزاوية 30° مع الأفق إزاحة 3 m. الشغل المنجز تقريباً:', o: ['130 J', '150 J', '75 J', '0 J'], a: 0, why: 'مثال 1: W = 50 × 3 × cos30°.' },
    { q: 'رافع أثقال يُنزل ثقلاً 710 N مسافة 0.65 m بسرعة ثابتة. الشغل الذي ينجزه:', o: ['−460 J', '+460 J', '0 J', '−710 J'], a: 0, why: 'مثال 2: القوة للأعلى والإزاحة للأسفل cos180° = −1.' },
    { q: 'شخص يحمل دلواً ويمشي أفقياً بسرعة ثابتة. شغل قوة الحمل:', o: ['صفر', 'موجب', 'سالب', 'يساوي m g h'], a: 0, why: 'القوة شاقولية والإزاحة أفقية θ = 90° (ص 94).' },
    { q: 'في مثال 3 يسحب صندوق بسرعة ثابتة والاحتكاك 20 N وزاوية الحبل 37°. القوة الساحبة:', o: ['25 N', '20 N', '16 N', '33 N'], a: 0, why: 'F cos37° = 20 ⟸ F = 20 / 0.8.' }],
  parts: [{ id: 'g11_w_work', n: 'مفهوم الشغل والقوة بزاوية + مثال 1' }, { id: 'g11_w_zero', n: 'متى يكون الشغل صفراً؟ الأشكال 3 – 6' }, { id: 'g11_w_lift', n: 'مثال 2: الشغل الموجب والسالب' }, { id: 'g11_w_graph', n: 'الشغل من مخطط القوة − الإزاحة + مثال 3' }] });
M8.merge({ id: 'g11_c5_power', ch: 55, reg: X11, sec: '5-3 القدرة', page: 98, kind: 'مثال',
  title: 'القدرة: P = W / t و P = F v',
  desc: 'يرفع حصان ورجل ثقليهما 1 m في الزمن نفسه فنقارن الشغل والقدرة (الشكل 11)، ثم نحسب قوة الشد في حبل مصعد يرتفع بسرعة ثابتة من قدرة محركه (مثال 4).',
  tags: 'القدرة واط قدرة حصانية مصعد',
  fact: ['القدرة الحصانية وحدة عملية لقياس القدرة: 1 hp = 746 W (ص 98).', 'القدرة اللحظية تساوي حاصل الضرب القياسي للقوة والسرعة P = F v cosθ (ص 98).'],
  quiz: [
    { q: 'رجل يرفع جسماً كتلته 40 kg إلى ارتفاع 5 m خلال 10 s. قدرته (g = 10):', o: ['200 W', '2000 W', '20 W', '400 W'], a: 0, why: 'P = m g h / t = 40 × 10 × 5 / 10 (س1 ص 116).' },
    { q: 'محرك قدرته 1 hp يرفع حملاً بسرعة ثابتة 3 m/s. القوة التي يؤثر بها:', o: ['248.7 N', '746 N', '2238 N', '3 N'], a: 0, why: 'F = P / v = 746 / 3 (س3 ص 116).' },
    { q: 'أي مما يأتي ليس وحدة لقياس القدرة؟', o: ['Joule.second', 'Watt', 'J/s', 'hp'], a: 0, why: 'القدرة = شغل ÷ زمن (س4 ص 116).' },
    { q: 'القدرة اللحظية تساوي:', o: ['F . v', 'F × x', 'W × t', 'm v'], a: 0, why: 'P = F v cosθ (س5 ص 116).' },
    { q: 'مصعد يرتفع بسرعة ثابتة 0.7 m/s وقدرة محركه 20300 W. قوة الشد في الحبل:', o: ['29000 N', '14210 N', '20300 N', '2900 N'], a: 0, why: 'مثال 4: T = P / v.' }],
  parts: [{ id: 'g11_w_power', n: 'الحصان والرجل + مثال 4 المصعد' }] });
M8.merge({ id: 'g11_c5_energy', ch: 55, reg: X11, sec: '5-4 الطاقة: الحركية والكامنة التثاقلية والمرونية', page: 99, kind: 'مثال',
  title: 'الطاقة الحركية والكامنة ومبرهنة الشغل − الطاقة',
  desc: 'نرى أن شغل القوة المحصلة يساوي التغير في الطاقة الحركية (مثال 5 السيارة والفرامل)، ونرفع كتاباً إلى رف ونغير مستوى الإسناد (مثال 6 والسؤال)، ونضغط نابضاً ونطلق كتلة (مثال 7).',
  tags: 'الطاقة الحركية الكامنة التثاقلية المرونية مستوى الإسناد',
  fact: ['من أشكال الطاقة: الميكانيكية (الحركية والكامنة) والحرارية والكيميائية والمغناطيسية والنووية والكهربائية والضوئية والصوتية (ص 99).', 'الشلالات ومساقط المياه خلف السدود تمتلك طاقة كامنة تتحول إلى حركية تدير التوربينات لتوليد الطاقة الكهربائية (ص 103).', 'قيمة الطاقة الكامنة التثاقلية تعتمد على مستوى الإسناد، لكن التغير فيها لا يعتمد عليه (ص 104).'],
  quiz: [
    { q: 'سيارة كتلتها 2000 kg تتحرك بسرعة 20 m/s توقفت بعد 100 m. قوة الفرامل:', o: ['4000 N', '400 N', '40000 N', '2000 N'], a: 0, why: 'مثال 5: f = 400 000 / 100.' },
    { q: 'كتاب كتلته 3 kg رفع من الأرض إلى رف ارتفاعه 2 m. التغير في طاقته الكامنة:', o: ['60 J', '6 J', '30 J', '0 J'], a: 0, why: 'مثال 6: ΔGPE = 3 × 10 × 2.' },
    { q: 'جسم كتلته 1 kg طاقته الكامنة 1 J ، فارتفاعه عن مستوى الإسناد (g = 10):', o: ['0.1 m', '1 m', '10 m', '9.8 m'], a: 0, why: 'h = GPE / (m g) (س6 ص 116).' },
    { q: 'نابض ثابته 200 N/m ضُغط 0.2 m بكتلة 2 kg على سطح أملس ثم ترك. سرعة الكتلة:', o: ['2 m/s', '4 m/s', '1 m/s', '20 m/s'], a: 0, why: 'مثال 7: ½ K x² = ½ m v².' }],
  parts: [{ id: 'g11_w_ke', n: 'الطاقة الحركية ومبرهنة الشغل − الطاقة + مثال 5' }, { id: 'g11_w_pe', n: 'الطاقة الكامنة التثاقلية + مثال 6' }, { id: 'g11_w_spring', n: 'الطاقة الكامنة المرونية + مثال 7' }] });
M8.merge({ id: 'g11_c5_cons', ch: 55, reg: X11, sec: '5-5 حفظ الطاقة الميكانيكية + 5-6 شغل القوى غير المحافظة + 5-7 قانون حفظ الطاقة', page: 106, kind: 'مثال',
  title: 'حفظ الطاقة: الميكانيكية ثابتة بلا احتكاك، والطاقة الكلية لا تفنى',
  desc: 'نتابع عربة الأفعوانية (الشكل 20) وكرة مثال 8 والطاقة تتحول بين كامنة وحركية، ونكمل جدول الشكل 22، ثم نضيف احتكاكاً لنحسب شغل القوى غير المحافظة (الشكل 23)، ونرى كرة مرتدة وبندولاً يتوقفان وتتحول طاقتهما إلى حرارة (الشكل 24).',
  tags: 'حفظ الطاقة الميكانيكية الأفعوانية Wnc احتكاك حرارة بندول',
  fact: ['الطاقة الميكانيكية E = PE + KE تبقى ثابتة إذا أهملنا الاحتكاك ومقاومة الهواء (ص 106).', 'شغل القوى غير المحافظة يساوي التغير في الطاقة الميكانيكية Wnc = Ef − Ei ، فهو سالب للاحتكاك وموجب لمحرك (ص 108).', 'الطاقة لا تفنى ولا تستحدث ولكن تتحول من شكل إلى آخر (ص 109).'],
  quiz: [
    { q: 'كرة كتلتها 5 kg تنطلق من السكون من ارتفاع 5 m على مسار أملس. سرعتها عند ارتفاع 3.2 m:', o: ['6 m/s', '7.746 m/s', '3.6 m/s', '10 m/s'], a: 0, why: 'مثال 8: v² = 2 × 10 × 1.8.' },
    { q: 'جسم وزنه 10 N يسقط من السكون من ارتفاع 2 m. سرعته لحظة اصطدامه بالأرض:', o: ['√40 m/s', '20 m/s', '400 m/s', '10 m/s'], a: 0, why: 'v = √(2 g h) (س7 ص 117).' },
    { q: 'الطاقة:', o: ['لا تفنى ولا تستحدث', 'تفنى بالاحتكاك', 'تستحدث في المحركات', 'تبقى ميكانيكية دائماً'], a: 0, why: 'قانون حفظ الطاقة (س2 ص 116).' },
    { q: 'في الشكل 22 الطاقة الحركية على المنصة 75 J والطاقة الكلية 100 J. الطاقة الكامنة على المنصة:', o: ['25 J', '75 J', '100 J', '175 J'], a: 0, why: 'PE = E − KE.' },
    { q: 'في الشكل 23 كانت Eb = 250 J و Ec = 100 J والمسافة bc = 10 m. قوة الاحتكاك:', o: ['15 N', '25 N', '10 N', '150 N'], a: 0, why: 'Wnc = −150 J = −f × 10.' }],
  parts: [{ id: 'g11_w_track', n: 'الأفعوانية الشكل 20 + مثال 8' }, { id: 'g11_w_ramp', n: 'سؤال الشكل 22 + شغل الاحتكاك الشكل 23' }, { id: 'g11_w_pend', n: 'قانون حفظ الطاقة: الكرة المرتدة والبندول' }] });
M8.merge({ id: 'g11_c5_mom', ch: 55, reg: X11, sec: '5-8 الزخم الخطي والدفع + 5-9 حفظ الزخم الخطي', page: 110, kind: 'مثال',
  title: 'الزخم والدفع وحفظ الزخم في التصادمات',
  desc: 'نمثل الزخم بسهم متجه (مثال 9)، ونرى أن الدفع F t يساوي التغير في الزخم في تصادم سيارة بشجرة (مثال 10) وفكرة الوسادة الهوائية، ثم نصادم عربتين بأنواع التصادم الثلاثة ونتحقق من حفظ الزخم (مثال 11 ومثال 12).',
  tags: 'الزخم الدفع حفظ الزخم تصادم مرن عديم المرونة',
  fact: ['الوسادة الهوائية تزيد زمن توقف الراكب فتقل القوة المؤثرة عليه للتغير نفسه في الزخم (ص 112).', 'الزخم الخطي محفوظ في جميع أنواع التصادمات، أما الطاقة الحركية فلا تحفظ إلا في التصادم المرن، ولذلك تصنف التصادمات حسب التغير في الطاقة الحركية (ص 114).'],
  quiz: [
    { q: 'شاحنة 3 × 10⁴ kg بسرعة 10 m/s اصطدمت بسيارة 1200 kg متحركة باتجاه معاكس بسرعة 25 m/s فالتحمتا. سرعتهما:', o: ['8.65 m/s', '10.6 m/s', '9.6 m/s', '0 m/s'], a: 0, why: 'مثال 11: v = 270 000 / 31 200.' },
    { q: 'سيارة 1200 kg بسرعة 20 m/s اصطدمت بشجرة وتوقفت في 0.15 s. مقدار القوة المتوسطة:', o: ['16 × 10⁴ N', '24 × 10³ N', '3600 N', '16 × 10³ N'], a: 0, why: 'مثال 10: F = 1200 × 20 / 0.15.' },
    { q: 'الذي لا يتغير عندما يصطدم جسمان أو أكثر هو:', o: ['الزخم الخطي الكلي للأجسام', 'الزخم الخطي لكل منهم', 'الطاقة الحركية لكل منهم', 'الطاقة الحركية الكلية للأجسام'], a: 0, why: 'حفظ الزخم (س8 ص 117).' },
    { q: 'عندما يصطدم جسمان متساويان بالكتلة فالتغير بالزخم الكلي:', o: ['يساوي صفراً', 'يعتمد على سرعتي الجسمين', 'يعتمد على زاوية التصادم', 'يعتمد على الدفع المعطى لكل جسم'], a: 0, why: 'الزخم الكلي محفوظ (س9 ص 117).' },
    { q: 'في التصادم عديم المرونة:', o: ['يلتحم الجسمان وتنقص الطاقة الحركية', 'تحفظ الطاقة الحركية', 'لا يحفظ الزخم', 'ينفصل الجسمان دون فقد طاقة'], a: 0, why: 'ص 114.' }],
  parts: [{ id: 'g11_w_imp', n: 'الزخم والدفع: مثال 9 ومثال 10 والوسادة الهوائية' }, { id: 'g11_w_coll', n: 'حفظ الزخم وأنواع التصادم: مثال 11 ومثال 12' }] });
M8.merge({ id: 'g11_c5_review', ch: 55, reg: X11, sec: 'أسئلة ومسائل الفصل الخامس', page: 116, kind: 'مثال',
  title: 'مسائل الفصل الخامس بحل خطوة خطوة',
  desc: 'مشاهد متحركة لمسائل نهاية الفصل السبع مع حل كل مسألة سطراً سطراً، وأسئلة الاختيار من متعدد في الاختبار.',
  tags: 'أسئلة مسائل الفصل الخامس حل خطوة خطوة',
  fact: ['عند حل مسائل الشغل والطاقة حدد أولاً الحالة الابتدائية والنهائية للطاقة، ثم القوى التي تنجز شغلاً (ص 117).'],
  quiz: [
    { q: 'جسم كتلته 2 kg سقط من 10 m على رمل واستقر بعد 3 cm. متوسط قوة الرمل تقريباً:', o: ['6687 N', '200 N', '667 N', '20 N'], a: 0, why: 'س1: F × 0.03 = 2 × 10 × 10.03.' },
    { q: 'سيارة 1250 kg انزلقت 36 m ومعامل الاحتكاك 0.7. شغل الاحتكاك:', o: ['−315 000 J', '315 000 J', '−8750 J', '−31 500 J'], a: 0, why: 'س2: W = −0.7 × 1250 × 10 × 36.' },
    { q: 'قدرة جرار يشد بقوة 12000 N بسرعة 2.5 m/s:', o: ['30 000 W', '4800 W', '12 000 W', '300 W'], a: 0, why: 'س6: P = F v.' },
    { q: 'لاعب 90 kg يجري 6 m/s توقف بعد 1.8 m. زمن توقفه:', o: ['0.6 s', '0.3 s', '1.8 s', '6 s'], a: 0, why: 'س7: F = 900 N و t = m v / F.' }],
  parts: [{ id: 'g11_w_prob', n: 'مسائل الفصل س1 – س7' }] });
