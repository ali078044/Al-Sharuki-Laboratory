'use strict';
/* ====================== الخامس العلمي — الفصل السابع: الحركة الدائرية والدورانية (ch 57, ص 131–157) ======================
   Merged experiments (book order): g11_c7_ang (7-1 … 7-3) · g11_c7_cent (7-4, 7-5) · g11_c7_curve (7-6, 7-7) · g11_c7_weight (7-8)
   · g11_c7_rev1 (أسئلة ص 143–145) · g11_c7_rot (7-9 … 7-11) · g11_c7_inertia (7-12 … 7-15) · g11_c7_L (7-16, 7-17) · g11_c7_rev2 (أسئلة ص 156–157).
   Local kit Q57 = Q42 + discs, wheels, top-view cars, people, dial scale, arrows, motion helpers. */
const Q57 = Object.assign(Object.create(Q42), {
  G: 9.8,
  ez(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  f(v, d = 2) { let r = +(+v).toFixed(d); if (Object.is(r, -0) || Math.abs(r) < Math.pow(10, -d) / 2) r = 0; return String(r).replace('-', '−'); },
  deg(a) { return a * 180 / Math.PI; },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f5f3ff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#7c3aed', y); },
  card(ctx, S, L, o) { return Q42.card(ctx, S, L, Object.assign({ bd: '#7c3aed', y: 70, wd: 310 }, o || {})); },
  steps(ctx, S, st, o) { return Q42.steps(ctx, S, st, Object.assign({ y: 70, x: S.W - 12, wd: 330 }, o || {})); },
  stepChips(S, id, y, x0, lab, onEx, n = 9, bw = 160) { return Q51.stepChips(S, id, y, x0, lab, onEx, n, bw); },
  drawSteps(ctx, list) { if (list[1]) list[1]._col = '#be185d'; Q42.drawChips(ctx, list); },
  arrow(ctx, x, y, dx, dy, col = '#dc2626', lab, w = 3) { if (Math.hypot(dx, dy) < 3) return; K.force(ctx, x, y, dx, dy, lab || '', col, w); },
  ball(ctx, x, y, r, col = '#f97316') { K.ball(ctx, x, y, r, col); },
  play(S, id, y, run, onGo, onRe, o = {}) { return Q42.chips(S, id, [['go', run ? '⏸ أوقف' : (o.go || '▶ شغّل')], ['re', '↺ من البداية']].concat(o.more || []), y, '', (S2, k) => { if (k === 'go') onGo(S2); else if (k === 're') onRe(S2); else if (o.onMore) o.onMore(S2, k); }, { bw: o.bw || 150, x0: o.x0 }); },
  /* angle arc + label (angles in radians, canvas convention) */
  arc(ctx, x, y, r, a0, a1, col, lab, lr) { K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, Math.min(a0, a1), Math.max(a0, a1)); ctx.stroke(); }); if (lab) { const a = (a0 + a1) / 2, R2 = lr || r + 16; Q42.T(ctx, lab, x + Math.cos(a) * R2, y + Math.sin(a) * R2, { s: 12, w: 900, c: col }); } },
  dash(ctx, pts, col = '#64748b', w = 1.6) { Q41.line(ctx, pts, col, w, [6, 4]); },
  /* compact disc seen from above: rot = angle (rad, ccw on screen = negative canvas angle) */
  cd(ctx, x, y, R, rot) {
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 5; const g = ctx.createRadialGradient(x - R * .2, y - R * .2, R * .1, x, y, R); g.addColorStop(0, '#f8fafc'); g.addColorStop(.6, '#cbd5e1'); g.addColorStop(1, '#94a3b8'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill(); ctx.restore();
      const hues = ['rgba(244,114,182,.35)', 'rgba(250,204,21,.35)', 'rgba(74,222,128,.32)', 'rgba(56,189,248,.35)', 'rgba(167,139,250,.35)'];
      for (let k = 0; k < 10; k++) { const a = -rot + k * TAU / 10; ctx.fillStyle = hues[k % 5]; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, R * .97, a, a + .38); ctx.closePath(); ctx.fill(); }
      ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1; for (let rr2 = R * .4; rr2 < R; rr2 += R * .09) { ctx.beginPath(); ctx.arc(x, y, rr2, 0, TAU); ctx.stroke(); }
      ctx.fillStyle = 'rgba(226,232,240,.95)'; ctx.beginPath(); ctx.arc(x, y, R * .3, 0, TAU); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#f5f3ff'; ctx.beginPath(); ctx.arc(x, y, R * .1, 0, TAU); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.stroke();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.stroke(); });
  },
  /* spoked wheel (side view) */
  wheel(ctx, x, y, R, rot, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = o.tyre || '#111827'; ctx.lineWidth = Math.max(4, R * .12); ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.stroke();
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = Math.max(1.5, R * .03); ctx.beginPath(); ctx.arc(0, 0, R * .9, 0, TAU); ctx.stroke();
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.2; const n = o.n || 16; for (let k = 0; k < n; k++) { const a = k * TAU / n; ctx.beginPath(); ctx.moveTo(Math.cos(a) * R * .1, Math.sin(a) * R * .1); ctx.lineTo(Math.cos(a + .2) * R * .9, Math.sin(a + .2) * R * .9); ctx.stroke(); }
      const g = ctx.createRadialGradient(-R * .03, -R * .03, 1, 0, 0, R * .13); g.addColorStop(0, '#f8fafc'); g.addColorStop(1, '#475569'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, R * .12, 0, TAU); ctx.fill();
      if (o.mark !== false) { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(R * .9, 0, Math.max(3, R * .06), 0, TAU); ctx.fill(); ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1; ctx.stroke(); }
      ctx.restore(); });
  },
  /* solid disc face (cylinder end) with grooves */
  drum(ctx, x, y, R, rot, col = '#7c3aed') {
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 4; const g = ctx.createRadialGradient(x - R * .3, y - R * .3, R * .1, x, y, R); g.addColorStop(0, shade(col, 70)); g.addColorStop(.7, col); g.addColorStop(1, shade(col, -50)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill(); ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, R * .82, 0, TAU); ctx.stroke();
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(R * .82, 0); ctx.stroke(); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(R * .82, 0, 5, 0, TAU); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(x, y, Math.max(4, R * .09), 0, TAU); ctx.fill(); });
  },
  /* top-view car: centre x,y, heading a (rad), length L */
  carTop(ctx, x, y, a, L = 44, col = '#f97316') {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); const W = L * .5;
      ctx.fillStyle = 'rgba(15,23,42,.28)'; rr(ctx, -L / 2 + 2, -W / 2 + 3, L, W, 8); ctx.fill();
      ctx.fillStyle = '#111827'; [[-L * .3, -W / 2 - 2], [L * .22, -W / 2 - 2], [-L * .3, W / 2 - 3], [L * .22, W / 2 - 3]].forEach(p => { rr(ctx, p[0], p[1], L * .16, 5, 2); ctx.fill(); });
      const g = ctx.createLinearGradient(0, -W / 2, 0, W / 2); g.addColorStop(0, shade(col, 40)); g.addColorStop(.5, col); g.addColorStop(1, shade(col, -40)); ctx.fillStyle = g; rr(ctx, -L / 2, -W / 2, L, W, W * .4); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.4)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#bae6fd'; rr(ctx, L * .08, -W * .36, L * .16, W * .72, 3); ctx.fill(); rr(ctx, -L * .34, -W * .32, L * .1, W * .64, 3); ctx.fill();
      ctx.fillStyle = shade(col, -20); rr(ctx, -L * .22, -W * .34, L * .28, W * .68, 4); ctx.fill();
      ctx.fillStyle = '#fef08a'; ctx.fillRect(L / 2 - 3, -W * .4, 3, 5); ctx.fillRect(L / 2 - 3, W * .4 - 5, 3, 5); ctx.restore(); });
  },
  /* rear view of a car; ground centre x,yg; tilt (rad) */
  carBack(ctx, x, yg, s = 1, col = '#f97316', tilt = 0) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, yg); ctx.rotate(tilt); ctx.scale(s, s);
      ctx.fillStyle = '#111827'; rr(ctx, -40, -16, 14, 16, 3); ctx.fill(); rr(ctx, 26, -16, 14, 16, 3); ctx.fill();
      const g = ctx.createLinearGradient(0, -56, 0, -10); g.addColorStop(0, shade(col, 40)); g.addColorStop(1, shade(col, -30)); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-42, -12); ctx.lineTo(-42, -34); ctx.quadraticCurveTo(-40, -40, -30, -42); ctx.lineTo(-22, -58); ctx.lineTo(22, -58); ctx.lineTo(30, -42); ctx.quadraticCurveTo(40, -40, 42, -34); ctx.lineTo(42, -12); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.4)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#bae6fd'; ctx.beginPath(); ctx.moveTo(-19, -54); ctx.lineTo(19, -54); ctx.lineTo(25, -43); ctx.lineTo(-25, -43); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#ef4444'; rr(ctx, -38, -34, 10, 6, 2); ctx.fill(); rr(ctx, 28, -34, 10, 6, 2); ctx.fill(); ctx.fillStyle = '#e2e8f0'; rr(ctx, -10, -28, 20, 7, 1); ctx.fill(); ctx.restore(); });
  },
  /* person (front view): feet at x,yg, height H; arm = 0 (down) … 1 (out horizontally); col shirt */
  person(ctx, x, yg, H = 90, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, yg); const k = H / 90, arm = o.arm == null ? 0 : o.arm, sq = o.sq == null ? 1 : o.sq; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.strokeStyle = o.pants || '#1e3a8a'; ctx.lineWidth = 8 * k; ctx.beginPath(); ctx.moveTo(-7 * k, 0); ctx.lineTo(-5 * k, -40 * k); ctx.moveTo(7 * k, 0); ctx.lineTo(5 * k, -40 * k); ctx.stroke();
      const g = ctx.createLinearGradient(-16 * k, 0, 16 * k, 0); g.addColorStop(0, shade(o.col || '#b91c1c', -30)); g.addColorStop(.5, o.col || '#b91c1c'); g.addColorStop(1, shade(o.col || '#b91c1c', -30)); ctx.fillStyle = g; rr(ctx, -15 * k, -74 * k, 30 * k, 38 * k, 8 * k); ctx.fill();
      ctx.strokeStyle = '#f2c8a0'; ctx.lineWidth = 6 * k; const Lr = 34 * k;
      [-1, 1].forEach(sd => { const ax = sd * 15 * k, ay = -66 * k, dx = sd * Math.sin(Math.PI / 2 * arm) * Lr * sq, dy = Math.cos(Math.PI / 2 * arm) * Lr; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + dx, ay + dy); ctx.stroke();
        if (o.dumb) { ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(ax + dx, ay + dy, 5 * k, 0, TAU); ctx.fill(); } });
      ctx.fillStyle = '#f2c8a0'; ctx.beginPath(); ctx.arc(0, -84 * k, 10 * k, 0, TAU); ctx.fill(); ctx.fillStyle = o.hair || '#1f2937'; ctx.beginPath(); ctx.arc(0, -87 * k, 10 * k, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
      ctx.restore(); });
  },
  /* platform scale with round dial reading val (N) of max */
  scale(ctx, x, y, val, max = 1200, lab) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y - 8, 0, y + 10); g.addColorStop(0, '#e2e8f0'); g.addColorStop(1, '#64748b'); ctx.fillStyle = g; rr(ctx, x - 40, y - 8, 80, 16, 5); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.stroke(); });
  },
  dial(ctx, x, y, r, val, max, unit = 'N', lab) {
    K.raw(ctx, () => { const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 2, x, y, r); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.strokeStyle = '#334155'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke();
      for (let k = 0; k <= 12; k++) { const a = Math.PI * (.75 + k * 1.5 / 12); ctx.strokeStyle = '#475569'; ctx.lineWidth = k % 3 ? 1 : 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * .74, y + Math.sin(a) * r * .74); ctx.lineTo(x + Math.cos(a) * r * .9, y + Math.sin(a) * r * .9); ctx.stroke(); }
      const a = Math.PI * (.75 + clamp(val / max, 0, 1.02) * 1.5); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8); ctx.stroke(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(x, y, 4, 0, TAU); ctx.fill(); });
    for (let k = 0; k <= 12; k += 3) { const a = Math.PI * (.75 + k * 1.5 / 12); Q42.T(ctx, String(Math.round(max * k / 12)), x + Math.cos(a) * r * .56, y + Math.sin(a) * r * .56, { s: 9, w: 800, c: '#334155' }); }
    Q42.T(ctx, Math.round(val) + ' ' + unit, x, y + r * .55, { s: 11, w: 900, c: '#b91c1c' });
    if (lab) Q42.T(ctx, lab, x, y + r + 14, { s: 11, w: 900, c: '#fff', bg: '#334155' });
  },
  /* earth globe */
  earth(ctx, x, y, R, rot = 0) {
    K.raw(ctx, () => { const g = ctx.createRadialGradient(x - R * .35, y - R * .35, R * .1, x, y, R); g.addColorStop(0, '#7dd3fc'); g.addColorStop(.7, '#0284c7'); g.addColorStop(1, '#075985'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.clip(); ctx.fillStyle = 'rgba(34,197,94,.75)';
      for (let k = 0; k < 4; k++) { const ph = ((rot + k * 1.6) % TAU + TAU) % TAU; const px = x + Math.cos(ph) * R * .85; if (Math.sin(ph) > -0.1) { ctx.beginPath(); ctx.ellipse(px, y - R * .3 + k * R * .22, R * .22 * Math.max(.15, Math.sin(ph) + .1), R * .14, 0, 0, TAU); ctx.fill(); } }
      ctx.restore(); ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(x, y, R, R * .18, 0, 0, TAU); ctx.stroke(); });
  },
  /* ω vector next to a small tilted disc (right-hand rule): s = +1 ccw (seen from above), −1 cw */
  rhr(ctx, x, y, s, lab = 'ω', col = '#dc2626', rot = 0, len = 60) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(x - 46, y, x + 46, y); g.addColorStop(0, '#a3e635'); g.addColorStop(1, '#4d7c0f'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, 46, 14, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#365314'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x, y, 32, 8, 0, .3, Math.PI - .3); ctx.stroke(); const ex = s > 0 ? x - 30 : x + 30; ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(ex, y + 3); ctx.lineTo(ex + (s > 0 ? 7 : -7), y + 8); ctx.lineTo(ex + (s > 0 ? 6 : -6), y - 1); ctx.fill();
      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x + Math.cos(rot) * 32, y + Math.sin(rot) * 8, 3.5, 0, TAU); ctx.fill(); });
    if (s) Q57.arrow(ctx, x, y, 0, -s * len, col, lab, 3.4);
  }
});

/* ---------------- laws (cat 57) ---------------- */
LW({ id: 'g11_l7_theta', cat: 57, name: 'الإزاحة الزاوية', fx: '<i>θ</i> = ' + FR('<i>S</i>', '<i>r</i>') + ' ، دورة كاملة: <i>θ</i> = ' + FR('2π<i>r</i>', '<i>r</i>') + ' = 2π rad', sym: 'الإزاحة الزاوية تساوي طول القوس S مقسوماً على نصف القطر r ، وتقاس بالزاوية نصف القطرية (rad). الدورة الكاملة = 2π rad = 360°', calc: { in: [['S', 'طول القوس S', 'm', 0.3], ['r', 'نصف القطر r', 'm', 0.1]], out: 'الإزاحة الزاوية θ', u: 'rad', f: v => v.S / v.r } });
LW({ id: 'g11_l7_vrw', cat: 57, name: 'الانطلاق الخطي والزاوي', fx: '<i>υ</i> = <i>r ω</i> ، <i>ω</i> = ' + FR('2π', '<i>T</i>') + ' = 2π<i>f</i> ، <i>f</i> = ' + FR('1', '<i>T</i>'), sym: 'الانطلاق الخطي للجسم = بعده عن مركز الدوران × الانطلاق الزاوي. ω بوحدة rev/s تسمى تردد الدوران f ، وبوحدة rad/s تسمى التردد الزاوي', calc: { in: [['rpm', 'السرعة الزاوية', 'rpm', 5400], ['r', 'نصف القطر r', 'm', 0.28]], out: 'الانطلاق الخطي υ', u: 'm/s', f: v => v.rpm / 60 * TAU * v.r } });
LW({ id: 'g11_l7_ac', cat: 57, name: 'التعجيل المركزي والقوة المركزية', fx: '<i>a</i><sub>c</sub> = ' + FR('<i>υ</i>²', '<i>r</i>') + ' ، <i>F</i><sub>c</sub> = ' + FR('<i>m υ</i>²', '<i>r</i>') + ' = <i>m r ω</i>²', sym: 'التعجيل المركزي ثابت المقدار ومتجه نحو مركز الدائرة وعمودي على السرعة المماسية الآنية. القوة المركزية قد تكون شداً أو احتكاكاً أو جاذبية أو قوة كهربائية', calc: { in: [['m', 'الكتلة m', 'kg', 1200], ['v', 'الانطلاق υ', 'm/s', 6], ['r', 'نصف القطر r', 'm', 30]], out: 'القوة المركزية Fc', u: 'N', f: v => v.m * v.v * v.v / v.r } });
LW({ id: 'g11_l7_anet', cat: 57, name: 'الحركة الدائرية غير المنتظمة', fx: '<i>a</i> = √(<i>a</i><sub>c</sub>² + <i>a</i><sub>T</sub>²) ، tan<i>θ</i> = ' + FR('<i>a</i><sub>c</sub>', '<i>a</i><sub>T</sub>'), sym: 'عندما يتغير الانطلاق يكون للتعجيل مركبتان متعامدتان: المركزية ac تغير اتجاه السرعة، والمماسية aT تغير مقدارها', calc: { in: [['ac', 'التعجيل المركزي ac', 'm/s²', 4], ['aT', 'التعجيل المماسي aT', 'm/s²', 3]], out: 'التعجيل المحصل a', u: 'm/s²', f: v => Math.hypot(v.ac, v.aT) } });
LW({ id: 'g11_l7_vmax', cat: 57, name: 'انطلاق الأمان على منعطف أفقي', fx: '<i>f</i><sub>s</sub> = ' + FR('<i>m υ</i>²', '<i>r</i>') + ' ≤ <i>μ</i><sub>s</sub> <i>m g</i> ⟸ <i>υ</i><sub>max</sub> = √(<i>μ</i><sub>s</sub> <i>g r</i>)', sym: 'الاحتكاك الشروعي بين الإطارات والطريق يوفر القوة المركزية. التعجيل المركزي لا يزيد على μs g ، وكتلة المركبة لا تظهر في المعادلة', calc: { in: [['mu', 'معامل الاحتكاك μs', '', 0.8], ['r', 'نصف القطر r', 'm', 200], ['g', 'g', 'm/s²', 9.8]], out: 'انطلاق الأمان الأقصى', u: 'm/s', f: v => Math.sqrt(v.mu * v.g * v.r) } });
LW({ id: 'g11_l7_bank', cat: 57, name: 'المنعطف المائل', fx: '<i>N</i> sin<i>θ</i> = ' + FR('<i>m υ</i>²', '<i>r</i>') + ' ، <i>N</i> cos<i>θ</i> = <i>m g</i> ⟸ tan<i>θ</i> = ' + FR('<i>υ</i>²', '<i>r g</i>'), sym: 'المركبة الأفقية لرد فعل الطريق N sinθ توفر القوة المركزية من غير اعتماد على الاحتكاك', calc: { in: [['v', 'الانطلاق المصمم υ', 'm/s', 29.698], ['r', 'نصف القطر r', 'm', 120], ['g', 'g', 'm/s²', 9.8]], out: 'زاوية الميل θ', u: '°', f: v => Math.atan(v.v * v.v / (v.r * v.g)) * 180 / Math.PI } });
LW({ id: 'g11_l7_wapp', cat: 57, name: 'الوزن الظاهري في المصعد', fx: '<i>w</i><sub>app</sub> = <i>w</i><sub>real</sub> ± <i>m a</i>', sym: 'الوزن الحقيقي w = mg. الوزن الظاهري = قراءة الميزان = قوة رد الفعل N. صاعد بتعجيل: +ma ، نازل بتعجيل: −ma ، سرعة ثابتة: يساويان ، سقوط حر: صفر', calc: { in: [['m', 'الكتلة m', 'kg', 60], ['a', 'التعجيل نحو الأعلى a (سالب للأسفل)', 'm/s²', 2], ['g', 'g', 'm/s²', 10]], out: 'قراءة الميزان N', u: 'N', f: v => v.m * (v.g + v.a) } });
LW({ id: 'g11_l7_alpha', cat: 57, name: 'التعجيل الزاوي', fx: '<i>α</i> = ' + FR('Δ<i>ω</i>', 'Δ<i>t</i>') + ' = ' + FR('<i>ω</i><sub>f</sub> − <i>ω</i><sub>i</sub>', '<i>t</i><sub>f</sub> − <i>t</i><sub>i</sub>') + ' ، <i>a</i><sub>T</sub> = <i>r α</i>', sym: 'المعدل الزمني لتغير السرعة الزاوية، ووحدته rad/s². جميع نقاط الجسم الجاسئ لها ω و α نفسيهما، والتعجيل المماسي لنقطة = rα', calc: { in: [['wf', 'ωf', 'rad/s', 9], ['wi', 'ωi', 'rad/s', 2], ['t', 'Δt', 's', 2]], out: 'α', u: 'rad/s²', f: v => (v.wf - v.wi) / v.t } });
LW({ id: 'g11_l7_kin', cat: 57, name: 'معادلات الحركة الزاوية', fx: '<i>ω</i><sub>f</sub> = <i>ω</i><sub>i</sub> + <i>αt</i> ، <i>θ</i> = <i>ω</i><sub>i</sub><i>t</i> + ½<i>αt</i>² ، <i>ω</i><sub>f</sub>² = <i>ω</i><sub>i</sub>² + 2<i>αθ</i> ، <i>θ</i> = ' + FR('<i>ω</i><sub>i</sub> + <i>ω</i><sub>f</sub>', '2') + '<i>t</i>', sym: 'تناظر معادلات الحركة الخطية بتعجيل منتظم: x ↔ θ ، υ ↔ ω ، a ↔ α', calc: { in: [['wi', 'ωi', 'rad/s', 2], ['al', 'α', 'rad/s²', 3.5], ['t', 't', 's', 2]], out: 'الإزاحة الزاوية θ', u: 'rad', f: v => v.wi * v.t + .5 * v.al * v.t * v.t } });
LW({ id: 'g11_l7_inertia', cat: 57, name: 'عزم القصور الذاتي', fx: '<i>I</i> = <i>m r</i>² ، <i>I</i><sub>body</sub> = <i>I</i><sub>1</sub> + <i>I</i><sub>2</sub> + … ، كرة صلدة: ' + FR('2', '5') + '<i>MR</i>² ، أسطوانة صلدة: ½<i>MR</i>²', sym: 'مقياس لمقاومة الجسم الجاسئ للتغير في سرعته الزاوية، ووحدته kg.m². يعتمد على الكتلة والشكل ونمط توزيع الكتلة حول محور الدوران', calc: { in: [['m', 'الكتلة M', 'kg', 0.2], ['r', 'نصف القطر R', 'm', 0.1]], out: 'I للكرة الصلدة', u: 'kg.m²', f: v => .4 * v.m * v.r * v.r } });
LW({ id: 'g11_l7_ke', cat: 57, name: 'الطاقة الحركية الكلية', fx: '<i>KE</i><sub>total</sub> = ½<i>mυ</i>² + ½<i>Iω</i>²', sym: 'الجسم المتدحرج يمتلك حركة انتقالية وحركة دورانية معاً، فطاقته الحركية مجموع الطاقتين', calc: { in: [['m', 'الكتلة', 'kg', 0.2], ['v', 'الانطلاق υ', 'm/s', 1.5], ['I', 'I', 'kg.m²', 0.0008], ['w', 'ω', 'rad/s', 15]], out: 'KE الكلية', u: 'J', f: v => .5 * v.m * v.v * v.v + .5 * v.I * v.w * v.w } });
LW({ id: 'g11_l7_tau', cat: 57, name: 'العزم المدور والتعجيل الزاوي', fx: 'Σ<i>τ</i> = <i>I α</i> ، <i>τ</i> = <i>r F</i>', sym: 'التعجيل الزاوي يتناسب طردياً مع محصلة العزوم ويتجه باتجاهها، وعكسياً مع عزم القصور الذاتي. وحدة العزم N.m', calc: { in: [['F', 'القوة المماسية F', 'N', 10], ['r', 'نصف القطر r', 'm', 0.2], ['I', 'I', 'kg.m²', 0.02]], out: 'α', u: 'rad/s²', f: v => v.F * v.r / v.I } });
LW({ id: 'g11_l7_work', cat: 57, name: 'الشغل والقدرة الدورانية', fx: '<i>W</i> = <i>τ θ</i> = ½<i>I</i>(<i>ω</i><sub>f</sub>² − <i>ω</i><sub>i</sub>²) ، <i>P</i> = <i>τ ω</i><sub>avg</sub>', sym: 'الشغل الدوراني = العزم × الإزاحة الزاوية ويساوي التغير في الطاقة الحركية الدورانية. القدرة الدورانية = العزم × متوسط السرعة الزاوية (Watt)', calc: { in: [['P', 'القدرة P', 'W', 172000], ['rpm', 'السرعة الزاوية', 'rev/min', 500]], out: 'العزم τ', u: 'N.m', f: v => v.P / (v.rpm * TAU / 60) } });
LW({ id: 'g11_l7_L', cat: 57, name: 'الزخم الزاوي وحفظه', fx: '<i>L</i> = <i>r</i> × <i>p</i> = <i>m r</i>²<i>ω</i> = <i>I ω</i> ، <i>I</i><sub>1</sub><i>ω</i><sub>1</sub> = <i>I</i><sub>2</sub><i>ω</i><sub>2</sub>', sym: 'الزخم الزاوي كمية متجهة وحدتها kg.m²/s. عندما تكون محصلة العزوم الخارجية صفراً يبقى الزخم الزاوي ثابتاً مقداراً واتجاهاً', calc: { in: [['I1', 'I1', 'kg.m²', 3.8], ['w1', 'ω1', 'rev/s', 1], ['I2', 'I2', 'kg.m²', 1.5]], out: 'ω2', u: 'rev/s', f: v => v.I1 * v.w1 / v.I2 } });

/* =============== A1 — أمثلة الحركة الدائرية: عجلة الكرسي، دولاب الهواء، الطائرة المربوطة بخيط (7-1، الأشكال 1–3، ص 131) =============== */
(() => {
  const SC = { wheel: ['عجلة الكرسي المتحرك', 0.33, 'الشكل 1'], eye: ['دولاب الهواء', 60, 'الشكل 2'], plane: ['طائرة مربوطة بخيط', 15, 'الشكل 3'] };
  const D = { id: 'g11_r_intro', page: 131, fig: 'الأشكال 1 و 2 و 3',
    desc: 'عند دوران جسم جاسئ (لا يتغير شكله بتأثير القوى) حول محور ثابت فإن أي جسيم فيه يبعد بعداً معيناً عن محور الدوران يتحرك حركة دائرية: نقطة على إطار عجلة الكرسي المتحرك، والشخص الجالس في دولاب الهواء الذي يدور بمستوى شاقولي، والطائرة المربوطة بخيط تدور في مسار دائري بمستوى أفقي.',
    tags: 'الحركة الدائرية جسم جاسئ محور دوران ثابت عجلة كرسي متحرك دولاب الهواء طائرة خيط مسار دائري مستوى أفقي شاقولي',
    tools: ['عجلة كرسي متحرك', 'دولاب هواء', 'طائرة نموذجية مربوطة بخيط'],
    steps: ['اختر أحد الأمثلة الثلاثة من الأزرار.', 'اسحب النقطة الصفراء (أو الطائرة) لتغيير بعدها عن المحور، أو لتدويرها بيدك.', 'غيّر زمن الدورة T من اللوحة: كيف يتغير الانطلاق؟', 'فعّل أثر النقطة لترى مسارها الدائري.'],
    concl: ['كل نقطة من جسم جاسئ يدور حول محور ثابت تتحرك في مسار دائري مركزه على المحور.', 'نقاط الجسم كلها تكمل الدورة في الزمن نفسه T.', 'النقطة الأبعد عن المحور تقطع مسافة أكبر في الدورة فيكون انطلاقها أكبر: υ = 2πr / T.', 'اتجاه السرعة مماس للمسار ويتغير باستمرار.'],
    laws: ['g11_l7_vrw'],
    controls: [R('T', 'زمن الدورة الواحدة T', 2, 20, 6, 1, 's'), TG('vel', 'متجه السرعة المماسية', true, null, 'arrow'), TG('trace', 'أثر النقطة', true, null, 'trail')],
    setup(S) { S.sc = 'wheel'; S.ang = 0; S.rf = .9; S.rfd = .9; S.run = 1; S.hold = 0; S.trl = []; S.tk = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 340, cx = (x0 + x1) / 2, cy = 320, R = Math.min(165, (x1 - x0) / 2 - 10); return { w, h, L, x0, x1, cx, cy, R }; },
    pos(S, g, a, rf) { const R = g.R * rf; return S.sc === 'plane' ? [g.cx + Math.cos(a) * R, g.cy + 60 + Math.sin(a) * R * .42] : S.sc === 'eye' ? [g.cx + Math.cos(a) * g.R * .92, g.cy - 10 + Math.sin(a) * g.R * .92] : [g.cx + Math.cos(a) * R, g.cy + Math.sin(a) * R]; },
    update(S, dt) {
      if (!S.W) return; const w = TAU / S.p.T; if (S.run && !S.hold) S.ang += w * dt; S.rfd = Q57.ez(S.rfd, S.sc === 'eye' ? 1 : S.rf, dt, 10);
      S.tk += dt; if (S.tk > .08) { S.tk = 0; S.trl.push([S.ang, S.rfd]); if (S.trl.length > 70) S.trl.shift(); }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), sc = SC[S.sc], a = S.ang, P = D.pos(S, g, a, S.rfd), rM = (S.sc === 'eye' ? 1 : S.rfd) * sc[1], v = TAU * rM / S.p.T;
      Q57.bg(ctx, w, h);
      if (S.sc === 'wheel') {
        K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.cy + g.R, 0, g.cy + g.R + 40); gg.addColorStop(0, '#a3a3a3'); gg.addColorStop(1, '#e5e5e5'); ctx.fillStyle = gg; ctx.fillRect(g.x0 - 10, g.cy + g.R + 4, g.x1 - g.x0 + 20, 30); });
        K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(g.cx - 4, g.cy - g.R - 40, 8, g.R + 40); ctx.fillStyle = '#475569'; rr(ctx, g.cx - 70, g.cy - g.R - 52, 140, 16, 6); ctx.fill(); });
        Q57.wheel(ctx, g.cx, g.cy, g.R, a, { mark: false, n: 24 });
        K.raw(ctx, () => { ctx.strokeStyle = 'rgba(234,179,8,.9)'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.lineTo(P[0], P[1]); ctx.stroke(); ctx.setLineDash([]); });
      } else if (S.sc === 'eye') {
        const cy = g.cy - 10, R = g.R * .92;
        K.raw(ctx, () => { const sky = ctx.createLinearGradient(0, g.cy - g.R - 40, 0, g.cy + g.R + 40); sky.addColorStop(0, '#bfdbfe'); sky.addColorStop(1, '#eff6ff'); ctx.fillStyle = sky; rr(ctx, g.x0 - 10, g.cy - g.R - 40, g.x1 - g.x0 + 20, 2 * g.R + 80, 12); ctx.fill();
          ctx.fillStyle = '#64748b'; ctx.fillRect(g.x0 - 10, g.cy + g.R + 22, g.x1 - g.x0 + 20, 18);
          ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(g.cx, cy); ctx.lineTo(g.cx - 70, g.cy + g.R + 24); ctx.moveTo(g.cx, cy); ctx.lineTo(g.cx + 70, g.cy + g.R + 24); ctx.stroke();
          ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(g.cx, cy, R, 0, TAU); ctx.stroke(); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.cx, cy, R - 10, 0, TAU); ctx.stroke();
          ctx.strokeStyle = 'rgba(148,163,184,.8)'; ctx.lineWidth = 1; for (let k = 0; k < 32; k++) { const b = a + k * TAU / 32; ctx.beginPath(); ctx.moveTo(g.cx, cy); ctx.lineTo(g.cx + Math.cos(b) * R, cy + Math.sin(b) * R); ctx.stroke(); }
          ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(g.cx, cy, 9, 0, TAU); ctx.fill();
          for (let k = 0; k < 16; k++) { const b = a + k * TAU / 16, x = g.cx + Math.cos(b) * R, y = cy + Math.sin(b) * R; const gc = ctx.createLinearGradient(x - 9, 0, x + 9, 0); gc.addColorStop(0, k ? '#e0f2fe' : '#fde68a'); gc.addColorStop(1, k ? '#7dd3fc' : '#f59e0b'); ctx.fillStyle = gc; ctx.beginPath(); ctx.ellipse(x, y + 4, 9, 12, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke(); } });
      } else {
        const cy = g.cy + 60;
        K.raw(ctx, () => { const gg = ctx.createRadialGradient(g.cx, cy, 10, g.cx, cy, g.R * 1.2); gg.addColorStop(0, '#dcfce7'); gg.addColorStop(1, '#bbf7d0'); ctx.fillStyle = gg; ctx.beginPath(); ctx.ellipse(g.cx, cy, g.R * 1.12, g.R * .52, 0, 0, TAU); ctx.fill();
          ctx.strokeStyle = 'rgba(220,38,38,.6)'; ctx.lineWidth = 2; ctx.setLineDash([7, 5]); ctx.beginPath(); ctx.ellipse(g.cx, cy - 40, g.R * S.rfd, g.R * S.rfd * .42, 0, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = 'rgba(15,23,42,.18)'; ctx.beginPath(); ctx.ellipse(P[0], P[1], 14, 4, 0, 0, TAU); ctx.fill(); });
        const front = Math.sin(a) > 0, drawPlane = () => { const tx = -Math.sin(a), ty = Math.cos(a) * .42, hd = Math.atan2(ty, tx); K.raw(ctx, () => { ctx.save(); ctx.translate(P[0], P[1] - 40); ctx.rotate(hd); ctx.fillStyle = '#1d4ed8'; rr(ctx, -16, -4, 32, 8, 4); ctx.fill(); ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(-6, -18); ctx.lineTo(-11, -18); ctx.lineTo(-6, 0); ctx.lineTo(-11, 18); ctx.lineTo(-6, 18); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#93c5fd'; ctx.beginPath(); ctx.moveTo(-13, 0); ctx.lineTo(-18, -7); ctx.lineTo(-18, 7); ctx.fill(); ctx.restore(); }); };
        if (!front) drawPlane();
        Q41.line(ctx, [[g.cx + 8, cy - 62], [P[0], P[1] - 40]], '#334155', 1.4);
        Q57.person(ctx, g.cx, cy, 80, { arm: .55, col: '#0f766e' });
        if (front) drawPlane();
      }
      // trace
      if (S.p.trace) S.trl.forEach((q, i) => { const p = D.pos(S, g, q[0], q[1]); Q41.dot(ctx, p[0], p[1] - (S.sc === 'plane' ? 40 : 0), 'rgba(220,38,38,' + (.1 + .6 * i / S.trl.length) + ')', 3); });
      const Py = P[1] - (S.sc === 'plane' ? 40 : 0);
      if (S.sc !== 'plane') Q41.knob(ctx, P[0], Py, '#facc15', 9);
      if (S.p.vel) { const L = clamp((S.sc === 'eye' ? 1 : S.rfd) * 380 / S.p.T, 22, 120); Q57.arrow(ctx, P[0], Py, -Math.sin(a) * L, Math.cos(a) * L * (S.sc === 'plane' ? .42 : 1), '#dc2626', 'υ', 3); }
      Q42.T(ctx, sc[2] + ': ' + sc[0], g.cx, g.cy - g.R - 64 < 50 ? 64 : g.cy - g.R - 64, { s: 12, w: 900, c: '#fff', bg: '#7c3aed' });
      Q57.card(ctx, S, [{ t: 'كل نقطة تتحرك على دائرة حول محور ثابت', c: '#7c3aed', w: 900 }, { t: 'r = ' + Q57.f(rM, rM < 1 ? 2 : 1) + ' m', mono: 1 }, { t: 'T = ' + S.p.T + ' s', mono: 1 }, { t: 'υ = 2πr / T = ' + Q57.f(v, 2) + ' m/s', mono: 1, c: '#dc2626', w: 900 }, { t: 'ω = 2π / T = ' + Q57.f(TAU / S.p.T, 2) + ' rad/s', mono: 1 }, { t: S.sc === 'eye' ? 'الدوران بمستوى شاقولي' : S.sc === 'plane' ? 'الدوران بمستوى أفقي' : 'النقطة الأبعد عن المحور أسرع', c: '#0f766e', w: 800 }], { title: 'الحركة الدائرية' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.s); Q42.drawChips(ctx, C.p);
      Q57.banner(ctx, w, S.sc === 'eye' ? 'اسحب العربة الصفراء لتدوير الدولاب' : 'اسحب النقطة لتغيير بعدها عن المحور');
    },
    chips(S, g) { return { s: Q42.chips(S, 'sc', Object.keys(SC).map(k => [k, SC[k][0]]), g.h - 128, S.sc, (S2, k) => { S2.sc = k; S2.trl = []; }, { bw: 200, col: '#7c3aed' }),
      p: Q57.play(S, 'run', g.h - 84, S.run, S2 => { S2.run = !S2.run; }, S2 => { S2.ang = 0; S2.trl = []; }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = D.pos(S, g, S.ang, S.rfd), C = D.chips(S, g);
      return [{ id: 'pt', x: P[0], y: P[1] - (S.sc === 'plane' ? 40 : 0), r: 20, axis: 'xy', keep: true, tip: 'اسحب النقطة', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; const cy = S2.sc === 'plane' ? g.cy + 60 : S2.sc === 'eye' ? g.cy - 10 : g.cy, dx = d.x - g.cx, dy = (d.y + (S2.sc === 'plane' ? 40 : 0) - cy) / (S2.sc === 'plane' ? .42 : 1);
        S2.ang = Math.atan2(dy, dx); if (S2.sc !== 'eye') S2.rf = clamp(Math.hypot(dx, dy) / g.R, .25, 1); }, up: S2 => { S2.hold = 0; } }].concat(C.s, C.p); },
    readings(S) { const r = (S.sc === 'eye' ? 1 : S.rf) * SC[S.sc][1]; return [rd('المثال', SC[S.sc][0]), rd('البعد عن المحور r', Q57.f(r, 2) + ' m'), rd('زمن الدورة T', S.p.T + ' s'), rd('الانطلاق الخطي υ', Q57.f(TAU * r / S.p.T, 2) + ' m/s'), rd('الانطلاق الزاوي ω', Q57.f(TAU / S.p.T, 3) + ' rad/s')]; },
    explain(S) { return Q26.ex('النقطة الصفراء ترسم دائرة حول المحور، وسهم سرعتها يبقى مماساً للدائرة ويغير اتجاهه باستمرار.', 'الجسم الجاسئ يدور كله حول المحور، فكل نقطة فيه تبقى على البعد نفسه من المحور وتقطع دائرة في زمن الدورة نفسه T ، فانطلاقها υ = 2πr / T.', 'دولاب الهواء في مدينة الألعاب، وعجلات السيارات، والمراوح، والطائرات النموذجية المربوطة بخيط.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — القرص المدمج: الإزاحة الزاوية θ = S/r والانطلاق υ = rω (7-2، 7-3، الشكل 4، مثال 1 ص 134) =============== */
(() => {
  const EX = { q: 'قرص يدور بسرعة زاوية 5400 rpm. احسب: a التردد الزاوي وزمن الدورة الواحدة. b الانطلاق الخطي لجسيم على محيط القرص إذا كان نصف قطره 28 cm', lines: ['ω = 5400 rev/min × 1 min / 60 s', 'ω = 90 rev/s ⟸ f = 90 Hz', 'T = 1 / f = 1/90 s', 'ω = 2π f = 2π × 90 = 180π rad/s', 'υ = ω r = 180π × 0.28', 'υ = 180 × 22/7 × 0.28 = 180 × 0.88', 'υ = 158.4 m/s'] };
  const RC = 6; // CD radius in cm
  const D = { id: 'g11_r_disc', page: 132, fig: 'الشكل 4 + مثال 1 ص 134',
    desc: 'نختار خطاً ثابتاً للإسناد (الخط المتقطع). عند t = 0 ينطبق الخط الأحمر المرسوم على القرص على خط الإسناد، وبعد مدة Δt يدور بإزاحة زاوية θ بينما يقطع الجسيم P قوساً طوله S على دائرة نصف قطرها r: θ = S / r. وفي دورة كاملة θ = 2πr / r = 2π rad. والانطلاق الخطي υ = r ω ، و ω = 2π / T = 2π f.',
    tags: 'الإزاحة الزاوية θ=S/r خط الإسناد الراديان 2π الانطلاق الزاوي ω الانطلاق الخطي υ=rω ω=2πf T=1/f rpm قرص مدمج مثال 1 5400rpm 158.4',
    tools: ['قرص مدمج CD', 'خط إسناد ثابت', 'مؤقت'],
    steps: ['شغّل الدوران وراقب الخط الأحمر يبتعد عن خط الإسناد: القطاع الملون هو الإزاحة الزاوية θ.', 'اسحب النقطة P إلى بعد آخر عن المركز أو أدر القرص بيدك: θ = S / r.', 'قارن النقطتين P و Q: لهما ω نفسها لكن υ = rω تختلف.', 'غيّر السرعة الزاوية من اللوحة، ثم حل مثال 1 خطوة خطوة.'],
    concl: ['θ = S / r ، ووحدتها الراديان rad. الدورة الكاملة = 2π rad = 360°.', 'جميع نقاط القرص تدور بالإزاحة الزاوية نفسها في المدة نفسها، فلها الانطلاق الزاوي نفسه ω.', 'υ = r ω: الانطلاق الخطي يزداد بالابتعاد عن المحور.', 'ω = 2π / T = 2π f ، و f = 1 / T. مثال 1: f = 90 Hz ، T = 1/90 s ، υ = 158.4 m/s.'],
    laws: ['g11_l7_theta', 'g11_l7_vrw'],
    controls: [R('rpm', 'السرعة الزاوية ω', 0, 60, 10, 1, 'rpm'), TG('two', 'نقطة ثانية Q في منتصف البعد', true, null, 'dot'), TG('vel', 'متجهات السرعة الخطية', true, null, 'arrow')],
    setup(S) { S.th = 0; S.r = 5.5; S.rd = 5.5; S.run = 1; S.hold = 0; S.ex = 0; S.k = 0; S.vis = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 340, cx = (x0 + x1) / 2 - 10, cy = 320, R = Math.min(175, (x1 - x0) / 2 - 16); return { w, h, L, cx, cy, R, pc: R / RC }; },
    om(S) { return (S.ex ? 5400 : S.p.rpm) * TAU / 60; },
    update(S, dt) { if (!S.W) return; const tgt = S.ex ? 5400 / 600 * TAU / 60 : S.p.rpm * TAU / 60; S.vis = Q57.ez(S.vis, S.run ? tgt : 0, dt, 4); if (!S.hold) S.th += S.vis * dt; S.rd = Q57.ez(S.rd, S.r, dt, 12); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), th = S.th, tm = ((th % TAU) + TAU) % TAU, n = Math.floor(th / TAU + 1e-9), rpx = S.rd * g.pc, P = [g.cx + Math.cos(th) * rpx, g.cy - Math.sin(th) * rpx], om = D.om(S), sc = S.ex ? 28 / RC : 1, rcm = S.rd * sc;
      Q57.bg(ctx, w, h); Q57.cd(ctx, g.cx, g.cy, g.R, th);
      // reference line
      Q57.dash(ctx, [[g.cx, g.cy], [g.cx + g.R + 70, g.cy]], '#dc2626', 2); Q42.T(ctx, 'خط الإسناد', g.cx + g.R + 36, g.cy + 16, { s: 10.5, w: 900, c: '#dc2626' });
      // sector + arc
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(249,115,22,.35)'; ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.arc(g.cx, g.cy, rpx, 0, -tm, true); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 4.5; ctx.beginPath(); ctx.arc(g.cx, g.cy, rpx, 0, -tm, true); ctx.stroke(); });
      if (tm > .25) Q57.arc(ctx, g.cx, g.cy, 34, -tm, 0, '#0f172a', 'θ', 48);
      Q41.line(ctx, [[g.cx, g.cy], P], '#b91c1c', 3); Q42.T(ctx, 'r', g.cx + Math.cos(th) * rpx * .78 + Math.sin(th) * 14, g.cy - Math.sin(th) * rpx * .78 + Math.cos(th) * 14, { s: 13, w: 900, c: '#b91c1c' });
      if (tm > .3) { const am = tm / 2; Q42.T(ctx, 'S', g.cx + Math.cos(am) * (rpx + 18), g.cy - Math.sin(am) * (rpx + 18), { s: 14, w: 900, c: '#dc2626', bg: 'rgba(255,255,255,.85)' }); }
      const tang = (x, y, a, v, col, lab) => { if (S.p.vel && v > 0) { const L = clamp(v, 16, 120); Q57.arrow(ctx, x, y, -Math.sin(a) * L, -Math.cos(a) * L, col, lab, 2.8); } };
      if (S.p.two) { const Q = [g.cx + Math.cos(th) * rpx / 2, g.cy - Math.sin(th) * rpx / 2]; tang(Q[0], Q[1], th, S.vis * rpx / 2 * 2.2, '#2563eb', 'υQ'); Q41.knob(ctx, Q[0], Q[1], '#2563eb', 7); Q42.T(ctx, 'Q', Q[0] - Math.sin(th) * 16, Q[1] - Math.cos(th) * 16, { s: 12, w: 900, c: '#1d4ed8' }); }
      tang(P[0], P[1], th, S.vis * rpx * 2.2, '#dc2626', 'υP'); Q41.knob(ctx, P[0], P[1], '#dc2626', 9); Q42.T(ctx, 'P', P[0] + 14, P[1] - 14, { s: 13, w: 900, c: '#b91c1c' });
      if (n > 0) Q42.T(ctx, 'عدد الدورات الكاملة: ' + n, g.cx, g.cy + g.R + 22, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' });
      if (S.ex) Q42.T(ctx, 'عرض مبطأ 600 مرة: 5400 rpm', g.cx, 66, { s: 11, w: 900, c: '#fff', bg: '#be185d' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q57.drawSteps(ctx, C.e);
      if (S.ex) Q57.steps(ctx, S, Object.assign({ title: 'مثال 1 ص 134' }, EX, { k: S.k }));
      else { const f = S.p.rpm / 60, v = rcm * om;
        Q57.card(ctx, S, [{ t: 'θ = S / r ⟸ S = r θ', mono: 1, c: '#7c3aed', w: 900 }, { t: 'θ = ' + Q57.f(th, 2) + ' rad = ' + Math.round(Q57.deg(th)) + '°', mono: 1 }, { t: 'S = ' + Q57.f(rcm, 1) + ' × ' + Q57.f(th, 2) + ' = ' + Q57.f(rcm * th, 1) + ' cm', mono: 1, c: '#dc2626', w: 800 },
          { t: 'f = ' + S.p.rpm + ' / 60 = ' + Q57.f(f, 3) + ' rev/s', mono: 1 }, { t: 'ω = 2π f = ' + Q57.f(om, 3) + ' rad/s', mono: 1 }, { t: 'T = 1 / f = ' + (f ? Q57.f(1 / f, 2) + ' s' : '∞'), mono: 1 },
          { t: 'υP = r ω = ' + Q57.f(v, 2) + ' cm/s', mono: 1, c: '#b91c1c', w: 900 }].concat(S.p.two ? [{ t: 'υQ = ' + Q57.f(v / 2, 2) + ' cm/s', mono: 1, c: '#1d4ed8', w: 800 }] : []), { title: 'الإزاحة الزاوية والسرعة الزاوية' }); }
      Q57.banner(ctx, w, 'اسحب النقطة الحمراء P لتدوير القرص أو تغيير بعدها');
    },
    chips(S, g) { return { p: Q57.play(S, 'run', g.h - 128, S.run, S2 => { S2.run = !S2.run; }, S2 => { S2.th = 0; }, { go: '▶ أدر القرص' }), e: Q57.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 1 ص 134', S2 => { S2.th = 0; S2.r = RC; S2.run = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), rpx = S.rd * g.pc;
      return [{ id: 'P', x: g.cx + Math.cos(S.th) * rpx, y: g.cy - Math.sin(S.th) * rpx, r: 20, axis: 'xy', keep: true, tip: 'اسحب P', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; const dx = d.x - g.cx, dy = g.cy - d.y, a = Math.atan2(dy, dx), cur = ((S2.th % TAU) + TAU) % TAU; let dd = a - cur; while (dd > Math.PI) dd -= TAU; while (dd < -Math.PI) dd += TAU; S2.th = Math.max(0, S2.th + dd); S2.r = clamp(Math.round(Math.hypot(dx, dy) / g.pc * 4) / 4, 2, RC); }, up: S2 => { S2.hold = 0; } }].concat(C.p, C.e); },
    readings(S) { const om = D.om(S), r = S.r * (S.ex ? 28 / RC : 1); return [rd('الإزاحة الزاوية θ', Q57.f(S.th, 2) + ' rad'), rd('بعد P عن المحور r', Q57.f(r, 2) + ' cm'), rd('طول القوس S', Q57.f(r * S.th, 1) + ' cm'), rd('الانطلاق الزاوي ω', Q57.f(om, 3) + ' rad/s'), rd('الانطلاق الخطي υ', Q57.f(r * om / 100, 3) + ' m/s')]; },
    record(S) { return { r: +S.r.toFixed(2), w: +D.om(S).toFixed(3), v: +(S.r * D.om(S)).toFixed(2) }; },
    cols: [['r', 'r (cm)'], ['w', 'ω (rad/s)'], ['v', 'υ (cm/s)']],
    explain(S) { return Q26.ex('القطاع الملون يكبر مع الدوران، وطول القوس S يزداد بزيادة θ وبزيادة بعد النقطة عن المركز. النقطة P أسرع من Q رغم أنهما تدوران معاً.', 'الإزاحة الزاوية θ = S / r واحدة لكل نقاط القرص لأنه جسم جاسئ، فلها الانطلاق الزاوي ω نفسه، أما الانطلاق الخطي υ = rω فيتناسب مع البعد عن المحور.', 'حافة قرص الحاسوب أو قرص الطاحونة تتحرك أسرع بكثير من النقاط القريبة من المركز، لذا تتآكل الحافة أولاً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — التعجيل المركزي والقوة المركزية وزوالها (7-4، الأشكال 5 و 6 و 7، ص 135–136) =============== */
(() => {
  const PX = 110; // px per metre
  const SRC = { hand: ['خيط في اليد', 'قوة الشد في الخيط T', '✂ اقطع الخيط'], earth: ['القمر حول الأرض', 'قوة الجذب بين الأرض والقمر', '✂ أزل قوة الجذب'], atom: ['الإلكترون حول النواة', 'قوة التجاذب الكهربائي', '✂ أزل قوة التجاذب'] };
  const D = { id: 'g11_r_cent', page: 135, fig: 'الأشكال 5 و 6a و 6b و 7',
    desc: 'كرة صغيرة مربوطة بخيط تدور بانطلاق ثابت في مستوى أفقي: اتجاه سرعتها المماسية يتغير باستمرار، ونتيجة لهذا التغير تمتلك تعجيلاً مركزياً ac = υ² / r ثابت المقدار ومتجهاً نحو المركز وعمودياً على السرعة. والقوة التي تغير اتجاه السرعة هي القوة المركزية Fc = m ac = mυ² / r = m r ω²، وهي هنا الشد في الخيط. وزوالها يجعل الجسم ينطلق بخط مستقيم باتجاه المماس (القانون الأول لنيوتن).',
    tags: 'التعجيل المركزي ac=v²/r القوة المركزية Fc=mv²/r Fc=mrω² شد الخيط مماس زوال القوة المركزية القانون الأول لنيوتن القمر الإلكترون',
    tools: ['كرة صغيرة', 'خيط', 'يد تدير الكرة بمستوى أفقي'],
    steps: ['راقب الكرة وهي تدور: سهم السرعة υ مماس للمسار وسهم القوة Fc نحو المركز.', 'غيّر الكتلة والانطلاق ونصف القطر من اللوحة (أو اسحب الكرة): Fc = mυ² / r.', 'فعّل لقطات الشكل 6a لترى السرعة والتعجيل عند ثلاثة مواضع.', 'اضغط «اقطع الخيط»: تنطلق الكرة بخط مستقيم مماس للدائرة.', 'جرّب القمر حول الأرض والإلكترون حول النواة: القوة المركزية تختلف في نوعها.'],
    concl: ['في الحركة الدائرية المنتظمة الانطلاق ثابت واتجاه السرعة يتغير باستمرار.', 'ac = υ² / r ، ثابت المقدار ونحو المركز وعمودي على متجه السرعة الآنية.', 'Fc = m υ² / r = m r ω² ، وهي ليست قوة جديدة: شد أو احتكاك أو جاذبية أو قوة كهربائية.', 'عند زوال القوة المركزية يتحرك الجسم بخط مستقيم باتجاه المماس بالانطلاق الذي كان يمتلكه.'],
    laws: ['g11_l7_ac'],
    controls: [R('m', 'كتلة الكرة m', .1, 1, .2, .05, 'kg'), R('v', 'الانطلاق υ', 1, 6, 3, .5, 'm/s'), R('r', 'نصف القطر r', .5, 1.5, 1, .1, 'm'), TG('snap', 'لقطات الشكل 6a', false, null, 'eye')],
    setup(S) { S.ph = -Math.PI / 2; S.rd = 1; S.vd = 3; S.cut = 0; S.fl = null; S.trl = []; S.src = 'hand'; S.drg = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 340; return { w, h, L, x0, x1, cx: (x0 + x1) / 2, cy: 320 }; },
    update(S, dt) {
      if (!S.W) return; const g = D.geo(S); S.rd = Q57.ez(S.rd, S.p.r, dt, 8); S.vd = Q57.ez(S.vd, S.p.v, dt, 6);
      if (!S.cut) { if (!S.drg) S.ph += S.vd / S.rd * dt * .6; return; }
      const f = S.fl; if (!f || f.out) return; f.x += f.vx * dt * .6; f.y += f.vy * dt * .6; S.trl.push([f.x, f.y]); if (S.trl.length > 60) S.trl.shift();
      if (f.x < g.x0 - 4 || f.x > g.x1 || f.y < 64 || f.y > g.h - 170) f.out = 1;
    },
    doCut(S2) { if (S2.cut) return; const g = D.geo(S2), rp = S2.rd * PX; S2.cut = 1; S2.fl = { x0: g.cx + Math.cos(S2.ph) * rp, y0: g.cy + Math.sin(S2.ph) * rp, vx: -Math.sin(S2.ph) * S2.vd * PX, vy: Math.cos(S2.ph) * S2.vd * PX, ph: S2.ph }; S2.fl.x = S2.fl.x0; S2.fl.y = S2.fl.y0; S2.trl = []; },
    reset(S2) { S2.cut = 0; S2.fl = null; S2.trl = []; },
    center(ctx, S, g) {
      if (S.src === 'earth') { Q57.earth(ctx, g.cx, g.cy, 34, S.ph * 3); return; }
      if (S.src === 'atom') { K.raw(ctx, () => { [[0, 0, 1], [7, 4, 0], [-6, 5, 1], [3, -7, 0], [-5, -5, 0], [8, -3, 1]].forEach(q => { const gr = ctx.createRadialGradient(g.cx + q[0] - 2, g.cy + q[1] - 2, 1, g.cx + q[0], g.cy + q[1], 7); gr.addColorStop(0, '#fff'); gr.addColorStop(1, q[2] ? '#dc2626' : '#64748b'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.cx + q[0], g.cy + q[1], 7, 0, TAU); ctx.fill(); }); }); return; }
      K.raw(ctx, () => { const gr = ctx.createRadialGradient(g.cx - 6, g.cy - 6, 2, g.cx, g.cy, 22); gr.addColorStop(0, '#fde2c4'); gr.addColorStop(1, '#d4a373'); ctx.fillStyle = gr; ctx.beginPath(); ctx.ellipse(g.cx, g.cy, 22, 17, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.strokeStyle = 'rgba(146,64,14,.6)'; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(g.cx - 8 + k * 7, g.cy - 12); ctx.lineTo(g.cx - 8 + k * 7, g.cy + 6); ctx.stroke(); } });
    },
    obj(ctx, S, x, y, a = 1) { const r = S.src === 'atom' ? 7 : 8 + S.p.m * 12; K.raw(ctx, () => { ctx.globalAlpha = a; }); if (S.src === 'earth') { K.raw(ctx, () => { const gr = ctx.createRadialGradient(x - r * .3, y - r * .3, 1, x, y, r); gr.addColorStop(0, '#f8fafc'); gr.addColorStop(1, '#64748b'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }); } else Q57.ball(ctx, x, y, r, S.src === 'atom' ? '#2563eb' : '#f97316'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), rp = S.rd * PX, m = S.p.m, v = S.vd, r = S.rd, ac = v * v / r, Fc = m * ac, src = SRC[S.src];
      Q57.bg(ctx, w, h);
      K.raw(ctx, () => { const gg = ctx.createRadialGradient(g.cx, g.cy, 10, g.cx, g.cy, 220); gg.addColorStop(0, S.src === 'hand' ? '#ecfccb' : '#1e1b4b'); gg.addColorStop(1, S.src === 'hand' ? '#f7fee7' : '#312e81'); ctx.fillStyle = gg; rr(ctx, g.x0 - 10, 64, g.x1 - g.x0 + 14, g.h - 64 - 170, 14); ctx.fill(); });
      K.raw(ctx, () => { ctx.strokeStyle = S.src === 'hand' ? 'rgba(15,23,42,.35)' : 'rgba(226,232,240,.45)'; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.cx, g.cy, rp, 0, TAU); ctx.stroke(); ctx.setLineDash([]); });
      const tc = S.src === 'hand' ? '#0f172a' : '#e2e8f0';
      if (S.p.snap && !S.cut) [-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6].forEach((a, i) => { const x = g.cx + Math.cos(a) * rp, y = g.cy + Math.sin(a) * rp; D.obj(ctx, S, x, y, .35); Q57.arrow(ctx, x, y, -Math.sin(a) * 60, Math.cos(a) * 60, '#db2777', 'υ' + (i + 1), 2.4); Q57.arrow(ctx, x, y, -Math.cos(a) * 40, -Math.sin(a) * 40, '#7c3aed', 'a', 2.4); });
      this.center(ctx, S, g);
      if (!S.cut) {
        const x = g.cx + Math.cos(S.ph) * rp, y = g.cy + Math.sin(S.ph) * rp;
        if (S.src === 'hand') Q41.line(ctx, [[g.cx, g.cy], [x, y]], '#78350f', 2); else Q57.dash(ctx, [[g.cx, g.cy], [x, y]], 'rgba(226,232,240,.5)', 1.2);
        D.obj(ctx, S, x, y);
        const Lf = clamp(18 + 12 * Math.sqrt(Fc), 20, 130); Q57.arrow(ctx, x - Math.cos(S.ph) * 14, y - Math.sin(S.ph) * 14, -Math.cos(S.ph) * Lf, -Math.sin(S.ph) * Lf, '#2563eb', 'Fc', 3.2);
        Q57.arrow(ctx, x, y, -Math.sin(S.ph) * v * 22, Math.cos(S.ph) * v * 22, '#dc2626', 'υ', 3.2);
        Q42.T(ctx, 'r', g.cx + Math.cos(S.ph + .25) * rp * .5, g.cy + Math.sin(S.ph + .25) * rp * .5, { s: 13, w: 900, c: tc });
      } else {
        const f = S.fl; if (S.src === 'hand') { const a = f.ph - .6; Q41.line(ctx, [[g.cx, g.cy], [g.cx + Math.cos(a) * rp * .45, g.cy + Math.sin(a) * rp * .45]], '#78350f', 2); }
        Q57.dash(ctx, [[f.x0 - f.vx * .4, f.y0 - f.vy * .4], [f.x0 + f.vx * 1.6, f.y0 + f.vy * 1.6]], S.src === 'hand' ? '#94a3b8' : 'rgba(226,232,240,.6)', 1.4);
        S.trl.forEach((q, i) => i % 4 === 0 && D.obj(ctx, S, q[0], q[1], .12 + .3 * i / S.trl.length)); D.obj(ctx, S, f.x, f.y); Q57.arrow(ctx, f.x, f.y, f.vx / PX * 22, f.vy / PX * 22, '#dc2626', 'υ', 3.2);
        Q42.T(ctx, 'حركة بخط مستقيم باتجاه المماس', (g.x0 + g.x1) / 2 + 10, g.h - 190, { s: 12, w: 900, c: '#fff', bg: '#dc2626' });
      }
      Q42.T(ctx, src[0] + ': القوة المركزية = ' + src[1], (g.x0 + g.x1) / 2 + 10, 84, { s: 11, w: 900, c: '#fff', bg: '#2563eb' });
      Q57.card(ctx, S, S.cut ? [{ t: 'زالت القوة المركزية: Fc = 0', c: '#dc2626', w: 900 }, { t: 'لا يوجد ما يغير اتجاه السرعة', c: '#334155' }, { t: 'يتحرك الجسم بخط مستقيم باتجاه المماس للمسار عند تلك النقطة', c: '#334155' }, { t: 'وبالانطلاق نفسه', c: '#b91c1c', w: 800 }, { t: 'υ = ' + Q57.f(v, 1) + ' m/s', mono: 1, c: '#b91c1c', w: 800 }, { t: 'القانون الأول لنيوتن', c: '#7c3aed', w: 900 }]
        : [{ t: 'ac = υ² / r', mono: 1, c: '#7c3aed', w: 900 }, { t: 'ac = ' + Q57.f(v, 1) + '² / ' + Q57.f(r, 2) + ' = ' + Q57.f(ac, 2) + ' m/s²', mono: 1 }, { t: 'Fc = m ac = ' + Q57.f(m, 2) + ' × ' + Q57.f(ac, 2), mono: 1 }, { t: 'Fc = ' + Q57.f(Fc, 2) + ' N', mono: 1, c: '#2563eb', w: 900 }, { t: 'ω = υ / r = ' + Q57.f(v / r, 2) + ' rad/s', mono: 1 }, { t: 'Fc = m r ω² = ' + Q57.f(m * r * (v / r) ** 2, 2) + ' N', mono: 1 }, { t: 'الانطلاق ثابت والاتجاه يتغير باستمرار', c: '#0f766e', w: 800 }], { title: 'التعجيل المركزي والقوة المركزية' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.s); C.c.forEach(b => { if (b.id === 'cut_cut') { b._on = !S.cut; b._col = '#dc2626'; } }); Q42.drawChips(ctx, C.c);
      Q57.banner(ctx, w, S.cut ? 'اضغط «أعد» لإعادة الحركة الدائرية' : 'اسحب الكرة لتغيير نصف القطر، ثم اقطع الخيط');
    },
    chips(S, g) { return { s: Q42.chips(S, 'src', Object.keys(SRC).map(k => [k, SRC[k][0]]), g.h - 128, S.src, (S2, k) => { S2.src = k; D.reset(S2); }, { bw: 200, col: '#2563eb' }),
      c: Q42.chips(S, 'cut', [['cut', SRC[S.src][2]], ['re', '↺ أعد']], g.h - 84, '', (S2, k) => { if (k === 'cut') D.doCut(S2); else D.reset(S2); }, { bw: 180 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), rp = S.rd * PX; if (S.cut) return C.s.concat(C.c);
      const x = g.cx + Math.cos(S.ph) * rp, y = g.cy + Math.sin(S.ph) * rp;
      return [{ id: 'ball', x, y, r: 20, axis: 'xy', keep: true, tip: 'اسحب الكرة', idle: 'اسحب ✋', drag: (S2, d) => { S2.drg = 1; S2.ph = Math.atan2(d.y - g.cy, d.x - g.cx); setParam(S2, 'r', clamp(Math.round(Math.hypot(d.x - g.cx, d.y - g.cy) / PX * 10) / 10, .5, 1.5)); }, up: S2 => { S2.drg = 0; } },
        { id: 'str', x: (g.cx + x) / 2, y: (g.cy + y) / 2, r: 14, axis: 'none', hint: false, tip: 'اضغط لقطع الخيط', click: S2 => D.doCut(S2) }].concat(C.s, C.c); },
    readings(S) { const ac = S.p.v ** 2 / S.p.r; return [rd('الانطلاق υ', S.p.v + ' m/s'), rd('نصف القطر r', S.p.r + ' m'), rd('التعجيل المركزي ac', Q57.f(ac, 2) + ' m/s²'), rd('القوة المركزية Fc', Q57.f(S.p.m * ac, 2) + ' N'), rd('الحالة', S.cut ? 'زالت القوة: حركة مستقيمة' : 'حركة دائرية منتظمة')]; },
    record(S) { return { m: S.p.m, v: S.p.v, r: S.p.r, F: +(S.p.m * S.p.v ** 2 / S.p.r).toFixed(3) }; },
    cols: [['m', 'm (kg)'], ['v', 'υ (m/s)'], ['r', 'r (m)'], ['F', 'Fc (N)']],
    explain(S) { return Q26.ex(S.cut ? 'بعد قطع الخيط انطلقت الكرة بخط مستقيم باتجاه المماس عند نقطة القطع، ولم تبتعد نحو الخارج نصف قطرياً.' : 'الكرة تحافظ على انطلاقها لكن اتجاه سرعتها يدور، وسهم القوة يشير دائماً إلى المركز.', 'تغير اتجاه السرعة يعني وجود تعجيل مركزي ac = υ² / r ، وفق القانون الثاني تلزمه قوة مركزية Fc = mυ² / r. عند زوالها لا تؤثر قوة محصلة فيتحرك الجسم بسرعة ثابتة (القانون الأول).', 'احتكاك الإطارات يدير السيارة في المنعطف، وجاذبية الأرض تبقي القمر في مداره، والتجاذب الكهربائي يبقي الإلكترون حول النواة. والطين يتطاير من العجلة باتجاه المماس.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — الحركة الدائرية غير المنتظمة: التعجيل المركزي والمماسي والمحصل (7-5، الشكل 8، ص 137) =============== */
(() => {
  const VMAX = 8;
  const D = { id: 'g11_r_nonu', page: 137, fig: 'الشكل 8',
    desc: 'عندما يتحرك جسم على مسار دائري بانطلاق متغير تسمى حركته غير منتظمة، ولا يتجه تعجيله نحو المركز، بل يتحلل إلى مركبتين متعامدتين: التعجيل المركزي ac عمودي على السرعة ويغير اتجاهها، والتعجيل المماسي aT موازٍ للسرعة ويغير مقدارها. a = √(ac² + aT²) و tanθ = ac / aT.',
    tags: 'الحركة الدائرية غير المنتظمة التعجيل المماسي aT التعجيل المركزي ac التعجيل المحصل فيثاغورس tanθ=ac/aT',
    tools: ['كرة على مسار دائري', 'لقطات متتابعة كل 0.25 s', 'مخطط متجهات التعجيل'],
    steps: ['شغّل الحركة: المسافات بين اللقطات تكبر لأن الانطلاق يزداد.', 'راقب الأسهم: الأزرق ac نحو المركز، والأخضر aT مماسي، والبنفسجي هو المحصل a.', 'اسحب رأس السهم الأخضر في المخطط (أو استعمل اللوحة) لتغيير aT ، واجعله سالباً للتباطؤ.', 'اختر «منتظمة»: يختفي aT ويتجه التعجيل نحو المركز تماماً.'],
    concl: ['في الحركة الدائرية غير المنتظمة للتعجيل مركبتان متعامدتان: ac = υ² / r و aT.', 'ac يغير اتجاه السرعة، و aT يغير مقدارها.', 'a = √(ac² + aT²) ، واتجاهه θ = tan⁻¹(ac / aT).', 'ac يكبر مع زيادة الانطلاق فيدور المحصل نحو المركز.'],
    laws: ['g11_l7_anet', 'g11_l7_ac'],
    controls: [R('aT', 'التعجيل المماسي aT', -2, 3, 1.5, .5, 'm/s²'), R('r', 'نصف القطر r', .5, 2, 1, .1, 'm'), R('v0', 'الانطلاق الابتدائي', .5, 4, 1, .5, 'm/s')],
    setup(S) { S.ph = -Math.PI / 2; S.vs = 1; S.run = 1; S.strb = []; S.tk = 0; S.atd = 1.5; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 340; return { w, h, L, x0, x1, cx: (x0 + x1) / 2, cy: 300, R: 150, vx: w - 300, vy: h - 200, vw: 230, vh: 150 }; },
    reset(S2) { S2.vs = S2.p.v0; S2.ph = -Math.PI / 2; S2.strb = []; S2.tk = 0; },
    update(S, dt) {
      if (!S.W) return; S.atd = Q57.ez(S.atd, S.p.aT, dt, 10); if (!S.run) return;
      S.vs = clamp(S.vs + S.p.aT * dt, 0, VMAX); S.ph += S.vs / S.p.r * dt * .5;
      S.tk += dt; if (S.tk > .25) { S.tk = 0; S.strb.push(S.ph); if (S.strb.length > 24) S.strb.shift(); }
      if (S.vs >= VMAX || (S.vs <= 0 && S.p.aT < 0)) S.run = 0;
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), v = S.vs, r = S.p.r, ac = v * v / r, aT = S.atd, a = Math.hypot(ac, aT), th = Math.atan2(ac, aT), K2 = 22;
      Q57.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.stroke(); ctx.setLineDash([]); });
      Q41.dot(ctx, g.cx, g.cy, '#334155', 5);
      S.strb.forEach((p, i) => Q57.ball(ctx, g.cx + Math.cos(p) * g.R, g.cy + Math.sin(p) * g.R, 6, 'rgba(249,115,22,' + (.15 + .5 * i / S.strb.length) + ')'));
      const x = g.cx + Math.cos(S.ph) * g.R, y = g.cy + Math.sin(S.ph) * g.R, tx = -Math.sin(S.ph), ty = Math.cos(S.ph), nx = -Math.cos(S.ph), ny = -Math.sin(S.ph);
      Q57.dash(ctx, [[g.cx, g.cy], [x, y]], '#64748b', 1.2);
      Q57.arrow(ctx, x, y, nx * clamp(ac * K2, 0, 140), ny * clamp(ac * K2, 0, 140), '#2563eb', 'ac', 3);
      Q57.arrow(ctx, x, y, tx * aT * K2, ty * aT * K2, '#16a34a', 'aT', 3);
      Q57.arrow(ctx, x, y, clamp(nx * ac * K2 + tx * aT * K2, -150, 150), clamp(ny * ac * K2 + ty * aT * K2, -150, 150), '#7c3aed', 'a', 3.4);
      Q57.ball(ctx, x, y, 11, '#f97316');
      Q57.arrow(ctx, x + tx * 14, y + ty * 14, tx * v * 12, ty * v * 12, 'rgba(220,38,38,.75)', 'υ', 2.2);
      // vector diagram (fig 8)
      const ox = g.vx, oy = g.vy + g.vh, s = Math.min(g.vw / 3.4, g.vh / Math.max(4, ac + .5));
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; rr(ctx, ox - 52, g.vy - 34, g.vw + 84, g.vh + 62, 12); ctx.fill(); ctx.stroke(); });
      Q42.T(ctx, 'الشكل 8: تحليل التعجيل', ox + g.vw / 2 - 20, g.vy - 18, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' });
      Q41.line(ctx, [[ox - 40, oy], [ox + g.vw, oy]], '#0f172a', 1.2); Q41.line(ctx, [[ox, oy + 6], [ox, g.vy - 6]], '#0f172a', 1.2);
      const ex = ox + aT * s, ey = oy - Math.min(ac, g.vh / s) * s;
      Q57.dash(ctx, [[ex, oy], [ex, ey], [ox, ey]], '#94a3b8', 1.2);
      Q57.arrow(ctx, ox, oy, aT * s, 0, '#16a34a', '', 3); Q57.arrow(ctx, ox, oy, 0, ey - oy, '#2563eb', '', 3); Q57.arrow(ctx, ox, oy, ex - ox, ey - oy, '#7c3aed', '', 3.2);
      Q42.T(ctx, 'aT', ex + (aT >= 0 ? 4 : -4), oy + 16, { s: 12, w: 900, c: '#16a34a' }); Q42.T(ctx, 'ac', ox - 18, ey + 4, { s: 12, w: 900, c: '#2563eb' }); Q42.T(ctx, 'a', (ox + ex) / 2 + 10, (oy + ey) / 2 - 10, { s: 13, w: 900, c: '#7c3aed' });
      if (a > .05) Q57.arc(ctx, ox, oy, 26, -th, 0, '#dc2626', 'θ', 40);
      Q41.knob(ctx, ex, oy, '#16a34a', 9);
      Q57.card(ctx, S, [{ t: 'ac = υ² / r = ' + Q57.f(v, 2) + '² / ' + Q57.f(r, 1) + ' = ' + Q57.f(ac, 2) + ' m/s²', mono: 1, c: '#2563eb', w: 800 }, { t: 'aT = ' + Q57.f(aT, 2) + ' m/s²', mono: 1, c: '#16a34a', w: 800 }, { t: 'a = √(ac² + aT²) = ' + Q57.f(a, 2) + ' m/s²', mono: 1, c: '#7c3aed', w: 900 }, { t: 'θ = tan⁻¹(ac / aT) = ' + Q57.f(Q57.deg(th), 1) + '°', mono: 1 }, { t: Math.abs(aT) < .01 ? 'حركة منتظمة: التعجيل نحو المركز تماماً' : aT > 0 ? 'الانطلاق يزداد: حركة غير منتظمة' : 'الانطلاق يتناقص: حركة غير منتظمة', c: '#0f766e', w: 800 }], { title: 'الانطلاق الآن ' + Q57.f(v, 2) + ' m/s' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p);
      Q57.banner(ctx, w, 'اسحب رأس السهم الأخضر aT في المخطط');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['u', 'منتظمة aT = 0'], ['n', 'غير منتظمة']], g.h - 128, Math.abs(S.p.aT) < .01 ? 'u' : 'n', (S2, k) => { setParam(S2, 'aT', k === 'u' ? 0 : 1.5); if (!S2.run) { S2.run = 1; } }, { bw: 180, col: '#7c3aed' }),
      p: Q57.play(S, 'run', g.h - 84, S.run, S2 => { if (S2.vs >= VMAX || S2.vs <= 0) D.reset(S2); S2.run = !S2.run; }, S2 => { D.reset(S2); S2.run = 1; }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), v = S.vs, ac = v * v / S.p.r, s = Math.min(g.vw / 3.4, g.vh / Math.max(4, ac + .5));
      return [{ id: 'aT', x: g.vx + S.atd * s, y: g.vy + g.vh, r: 18, axis: 'x', keep: true, tip: 'اسحب لتغيير aT', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'aT', clamp(Math.round((d.x - g.vx) / s * 2) / 2, -2, 3)); if (!S2.run && S2.vs > 0 && S2.vs < VMAX) S2.run = 1; } }].concat(C.m, C.p); },
    readings(S) { const ac = S.vs ** 2 / S.p.r; return [rd('الانطلاق υ', Q57.f(S.vs, 2) + ' m/s'), rd('التعجيل المركزي ac', Q57.f(ac, 2) + ' m/s²'), rd('التعجيل المماسي aT', S.p.aT + ' m/s²'), rd('التعجيل المحصل a', Q57.f(Math.hypot(ac, S.p.aT), 2) + ' m/s²'), rd('الزاوية θ', Q57.f(Q57.deg(Math.atan2(ac, S.p.aT)), 1) + '°')]; },
    explain(S) { return Q26.ex('اللقطات تتباعد مع الزمن لأن الانطلاق يزداد، وسهم التعجيل المحصل لا يتجه نحو المركز بل يميل نحو اتجاه الحركة.', 'المركبة المماسية aT تغير مقدار السرعة والمركبة المركزية ac = υ²/r تغير اتجاهها، والمركبتان متعامدتان فنجمعهما بفيثاغورس.', 'السيارة التي تزيد سرعتها داخل منعطف، أو دولاب الهواء عند بدء تشغيله وإيقافه.'); }
  };
  M8.P[D.id] = D;
})();

/* helper: several worked problems in one chip row [[key,label],...] + next step */
Q57.exChips = function (S, id, y, x0, list, onPick, nOf, bw = 140) {
  return Q42.chips(S, id, list.concat([['nx', '⬇ الخطوة التالية']]), y, S.ex || '', (S2, k) => {
    if (k === 'nx') { if (!S2.ex) { S2.ex = list[0][0]; S2.k = 0; if (onPick) onPick(S2, S2.ex); return; } S2.k = Math.min(S2.k + 1, nOf(S2.ex)); return; }
    if (S2.ex === k) { S2.ex = 0; return; } S2.ex = k; S2.k = 0; if (onPick) onPick(S2, k); }, { bw, x0, col: '#be185d' });
};

/* =============== C1 — المنعطف الأفقي: الاحتكاك الشروعي يوفر القوة المركزية (7-6، الشكل 9، ص 137–138، مسألة 6 ص 145) =============== */
(() => {
  const VEH = { car: ['سيارة صغيرة', 1000, 44, '#f97316'], truck: ['شاحنة', 8000, 64, '#2563eb'], bike: ['دراجة نارية', 200, 26, '#16a34a'] };
  const TS = 3;
  const EX = { q: 'سيارة كتلتها 1000 kg تسير بانطلاق 30 m/s على منعطف أفقي نصف قطره 200 m. احسب: 1 قوة الاحتكاك الشروعي اللازمة. 2 أقصى انطلاق آمن إذا كان μs = 0.8', lines: ['fs = Fc = m υ² / r', 'fs = 1000 × 30² / 200', 'fs = 4500 N', 'υmax = √(μs g r)', 'υmax = √(0.8 × 9.8 × 200)', 'υmax = √1568 = 39.6 m/s'] };
  const D = { id: 'g11_r_flat', page: 137, fig: 'الشكل 9 + مسألة 6 ص 145',
    desc: 'عندما تدور سيارة على منعطف أفقي فإن القوة المركزية التي تبقيها على المسار الدائري هي قوة الاحتكاك الشروعي fs بين الإطارات والطريق، متجهة نحو مركز المنعطف: fs = mυ²/r. وبما أن fs ≤ μs N و N = mg فإن υ²/r ≤ μs g ، وأقصى انطلاق آمن υ = √(μs g r) لا يعتمد على كتلة المركبة. إذا زاد الانطلاق على ذلك انزلقت السيارة إلى خارج المنعطف.',
    tags: 'المنعطف الأفقي الاحتكاك الشروعي fs=mv²/r μs انطلاق الأمان v=√(μs g r) انزلاق السيارة الكتلة لا تظهر شاحنة دراجة مسألة 6',
    tools: ['طريق دائري أفقي', 'سيارة وشاحنة ودراجة نارية', 'مقياس للقوة المركزية اللازمة والاحتكاك الأقصى'],
    steps: ['شغّل الحركة وراقب سهم الاحتكاك fs المتجه نحو مركز المنعطف.', 'زد الانطلاق υ من اللوحة حتى يتجاوز الاحتكاك اللازم أقصى احتكاك متاح: تنزلق السيارة.', 'قلل μs (طريق مبتل أو جليد) أو صغّر نصف القطر: ينخفض انطلاق الأمان.', 'بدّل بين السيارة والشاحنة والدراجة: انطلاق الأمان لا يتغير.', 'حل مسألة 6 خطوة خطوة.'],
    concl: ['قوة الاحتكاك الشروعي بين الإطارات والطريق هي القوة المركزية: fs = mυ²/r.', 'fs ≤ μs m g ⟸ υ² / r ≤ μs g.', 'أقصى انطلاق آمن υ = √(μs g r) ، يزداد بزيادة μs و r.', 'الكتلة لا تظهر في المعادلة: السيارة الصغيرة والشاحنة والدراجة لها انطلاق الأمان نفسه.', 'مسألة 6: fs = 4500 N ، υmax = 39.6 m/s.'],
    laws: ['g11_l7_vmax', 'g11_l7_ac'],
    controls: [R('v', 'الانطلاق υ', 5, 50, 20, 1, 'm/s'), R('r', 'نصف قطر المنعطف r', 50, 300, 200, 10, 'm'), R('mu', 'معامل الاحتكاك الشروعي μs', .1, 1, .8, .05, ''), TG('arr', 'متجهات القوة والسرعة', true, null, 'arrow')],
    setup(S) { S.ph = -Math.PI / 2; S.rd = 200; S.vd = 20; S.run = 1; S.sk = null; S.veh = 'car'; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 340, cx = (x0 + x1) / 2, cy = 300, Rm = Math.min((x1 - x0) / 2 - 24, 200); return { w, h, L, x0, x1, cx, cy, Rm }; },
    rpx(g, r) { return 70 + (r - 50) / 250 * (g.Rm - 70); },
    vmax(S) { return Math.sqrt(S.p.mu * Q57.G * S.rd); },
    update(S, dt) {
      if (!S.W) return; const g = D.geo(S); S.rd = Q57.ez(S.rd, S.p.r, dt, 8); S.vd = Q57.ez(S.vd, S.p.v, dt, 5); if (!S.run) return;
      const sk = S.sk;
      if (!sk) { S.ph += S.vd / S.rd * dt * TS; if (S.vd > D.vmax(S) * 1.002) { const rp = D.rpx(g, S.rd), pxm = rp / S.rd, P = [g.cx + Math.cos(S.ph) * rp, g.cy + Math.sin(S.ph) * rp], Re = S.vd * S.vd / (S.p.mu * Q57.G), Rp = Re * pxm, C = [P[0] - Math.cos(S.ph) * Rp, P[1] - Math.sin(S.ph) * Rp]; S.sk = { cx: C[0], cy: C[1], R: Rp, Re, ps: S.ph, ps0: S.ph, out: 0 }; } return; }
      if (sk.out) return; sk.ps += S.vd / sk.Re * dt * TS; const x = sk.cx + Math.cos(sk.ps) * sk.R, y = sk.cy + Math.sin(sk.ps) * sk.R;
      if (x < g.x0 - 10 || x > g.x1 + 10 || y < 60 || y > g.h - 210) sk.out = 1;
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), rp = D.rpx(g, S.rd), V = VEH[S.veh], m = V[1], v = S.vd, r = S.rd, mu = S.p.mu, fs = m * v * v / r, fmax = mu * m * Q57.G, vm = D.vmax(S), sk = S.sk;
      Q57.bg(ctx, w, h);
      K.raw(ctx, () => { const gg = ctx.createRadialGradient(g.cx, g.cy, 20, g.cx, g.cy, 260); gg.addColorStop(0, '#bbf7d0'); gg.addColorStop(1, '#86efac'); ctx.fillStyle = gg; rr(ctx, g.x0 - 10, 60, g.x1 - g.x0 + 20, g.h - 270, 16); ctx.fill();
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 34; ctx.beginPath(); ctx.arc(g.cx, g.cy, rp, 0, TAU); ctx.stroke(); ctx.strokeStyle = mu < .35 ? 'rgba(186,230,253,.55)' : 'rgba(100,116,139,.0)'; ctx.lineWidth = 30; ctx.beginPath(); ctx.arc(g.cx, g.cy, rp, 0, TAU); ctx.stroke();
        ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.arc(g.cx, g.cy, rp, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5; [rp - 17, rp + 17].forEach(q => { ctx.beginPath(); ctx.arc(g.cx, g.cy, q, 0, TAU); ctx.stroke(); }); });
      Q41.dot(ctx, g.cx, g.cy, '#334155', 5); Q42.T(ctx, 'مركز المنعطف', g.cx, g.cy + 18, { s: 10.5, w: 900, c: '#14532d' });
      let x, y, hd;
      if (!sk) { x = g.cx + Math.cos(S.ph) * rp; y = g.cy + Math.sin(S.ph) * rp; hd = S.ph + Math.PI / 2; Q57.dash(ctx, [[g.cx, g.cy], [x, y]], '#334155', 1.2); Q42.T(ctx, 'r = ' + Math.round(r) + ' m', g.cx + Math.cos(S.ph - .35) * rp * .55, g.cy + Math.sin(S.ph - .35) * rp * .55, { s: 11, w: 900, c: '#14532d', bg: 'rgba(255,255,255,.8)' }); }
      else { x = sk.cx + Math.cos(sk.ps) * sk.R; y = sk.cy + Math.sin(sk.ps) * sk.R; hd = sk.ps + Math.PI / 2;
        K.raw(ctx, () => { ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(sk.cx, sk.cy, sk.R, sk.ps0, sk.ps); ctx.stroke(); }); }
      if (S.p.arr) { const tx = Math.cos(hd), ty = Math.sin(hd), nx = sk ? (sk.cx - x) / sk.R : -Math.cos(S.ph), ny = sk ? (sk.cy - y) / sk.R : -Math.sin(S.ph), Lf = clamp(Math.min(fs, fmax) / (m * Q57.G) * 70, 14, 90);
        Q57.arrow(ctx, x, y, nx * Lf, ny * Lf, '#2563eb', 'fs', 3.2); Q57.arrow(ctx, x + tx * 26, y + ty * 26, tx * clamp(v * 2.2, 18, 110), ty * clamp(v * 2.2, 18, 110), '#dc2626', 'υ', 3); }
      Q57.carTop(ctx, x, y, hd, V[2], V[3]);
      if (sk) Q42.T(ctx, sk.out ? 'انزلقت المركبة خارج المنعطف' : 'الاحتكاك لا يكفي: انزلاق', (g.x0 + g.x1) / 2, 84, { s: 12, w: 900, c: '#fff', bg: '#dc2626' });
      // gauge: needed vs available friction
      const gx = g.x0, gw = g.x1 - g.x0, gy = g.h - 196, top = Math.max(fs, fmax) * 1.15, Xf = q => gx + q / top * gw;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, gx - 6, gy - 22, gw + 12, 52, 10); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.stroke(); ctx.fillStyle = '#e2e8f0'; rr(ctx, gx, gy, gw, 14, 6); ctx.fill();
        ctx.fillStyle = fs > fmax ? '#ef4444' : '#3b82f6'; rr(ctx, gx, gy, Math.max(4, Xf(fs) - gx), 14, 6); ctx.fill(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(Xf(fmax), gy - 6); ctx.lineTo(Xf(fmax), gy + 20); ctx.stroke(); });
      Q42.T(ctx, 'الاحتكاك اللازم', gx + 70, gy - 11, { s: 10.5, w: 900, c: fs > fmax ? '#b91c1c' : '#1d4ed8' }); Q42.T(ctx, 'أقصى احتكاك متاح', clamp(Xf(fmax), gx + 60, gx + gw - 60), gy + 25, { s: 10.5, w: 900, c: '#0f172a' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.v); Q42.drawChips(ctx, C.p); Q57.drawSteps(ctx, C.e);
      if (S.ex) Q57.steps(ctx, S, Object.assign({ title: 'مسألة 6 ص 145' }, EX, { k: S.k }));
      else Q57.card(ctx, S, [{ t: V[0] + ': m = ' + m + ' kg', w: 900, c: '#7c3aed' }, { t: 'fs = m υ² / r = ' + Math.round(fs) + ' N', mono: 1, c: '#2563eb', w: 800 }, { t: 'fs max = μs m g = ' + Math.round(fmax) + ' N', mono: 1 }, { t: 'ac = υ² / r = ' + Q57.f(v * v / r, 2) + ' m/s²', mono: 1 }, { t: 'μs g = ' + Q57.f(mu * Q57.G, 2) + ' m/s²', mono: 1 }, { t: 'υmax = √(μs g r) = ' + Q57.f(vm, 1) + ' m/s', mono: 1, c: '#b91c1c', w: 900 }, { t: v > vm ? 'الانطلاق أكبر من انطلاق الأمان' : 'الانطلاق آمن', c: v > vm ? '#dc2626' : '#15803d', w: 900 }, { t: 'الكتلة لا تظهر في معادلة انطلاق الأمان', c: '#0f766e', w: 800 }], { title: 'المنعطف الأفقي' });
      Q57.banner(ctx, w, 'اسحب المركبة لتغيير نصف قطر المنعطف');
    },
    reset(S2) { S2.sk = null; S2.ph = -Math.PI / 2; S2.run = 1; },
    chips(S, g) { return { v: Q42.chips(S, 'veh', Object.keys(VEH).map(k => [k, VEH[k][0]]), g.h - 128, S.veh, (S2, k) => { S2.veh = k; }, { bw: 130, col: '#7c3aed' }),
      p: Q57.play(S, 'run', g.h - 128, S.run, S2 => { if (S2.sk && S2.sk.out) D.reset(S2); else S2.run = !S2.run; }, S2 => D.reset(S2), { bw: 130, x0: g.L + 412 }),
      e: Q57.stepChips(S, 'ex', g.h - 84, g.L, 'مسألة 6 ص 145', S2 => { setParam(S2, 'r', 200); setParam(S2, 'v', 30); setParam(S2, 'mu', .8); S2.veh = 'car'; D.reset(S2); }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); let out = [];
      if (!S.sk) { const rp = D.rpx(g, S.rd); out = [{ id: 'car', x: g.cx + Math.cos(S.ph) * rp, y: g.cy + Math.sin(S.ph) * rp, r: 24, axis: 'xy', keep: true, tip: 'اسحب المركبة', idle: 'اسحب ✋', drag: (S2, d) => { const q = Math.hypot(d.x - g.cx, d.y - g.cy), r = 50 + (q - 70) / (g.Rm - 70) * 250; setParam(S2, 'r', clamp(Math.round(r / 10) * 10, 50, 300)); S2.ph = Math.atan2(d.y - g.cy, d.x - g.cx); } }]; }
      return out.concat(C.v, C.p, C.e); },
    readings(S) { const m = VEH[S.veh][1], fs = m * S.p.v ** 2 / S.p.r; return [rd('المركبة', VEH[S.veh][0]), rd('الاحتكاك اللازم fs', Math.round(fs) + ' N'), rd('أقصى احتكاك μs mg', Math.round(S.p.mu * m * Q57.G) + ' N'), rd('انطلاق الأمان υmax', Q57.f(Math.sqrt(S.p.mu * Q57.G * S.p.r), 1) + ' m/s'), rd('الحالة', S.sk ? 'انزلاق' : 'تدور بأمان')]; },
    record(S) { return { mu: S.p.mu, r: S.p.r, vm: +Math.sqrt(S.p.mu * Q57.G * S.p.r).toFixed(1) }; },
    cols: [['mu', 'μs'], ['r', 'r (m)'], ['vm', 'υmax (m/s)']],
    explain(S) { return Q26.ex(S.sk ? 'عندما تجاوز الانطلاق حد الأمان لم يعد الاحتكاك كافياً، فاتسع مسار المركبة وخرجت من المنعطف.' : 'سهم الاحتكاك يتجه دائماً نحو مركز المنعطف، ويطول كلما زاد الانطلاق أو صغر نصف القطر.', 'الاحتكاك الشروعي هو القوة المركزية fs = mυ²/r ، وأقصاه μs mg ، فالانطلاق الأقصى υ = √(μs g r) والكتلة تختصر من الطرفين.', 'تخفيض السرعة عند المنعطفات وفي الأيام الممطرة لأن μs يقل، ولوحات السرعة القصوى قبل المنعطفات الحادة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — المنعطف المائل: N sinθ توفر القوة المركزية (7-7، الشكل 10، ص 138–139، مسألة 4 ص 145) =============== */
(() => {
  const HL = 160, RW = 3.75;
  const EX = { q: 'طريق عرضه 3.75 m عند منعطف نصف قطره 120 m ، صمم ليسير عليه بانطلاق 29.698 m/s من غير الاعتماد على الاحتكاك. ما ارتفاع الحافة الخارجية عن الداخلية؟', lines: ['tanθ = υ² / (r g)', 'tanθ = 29.698² / (120 × 9.8)', 'tanθ = 882 / 1176 = 0.75', 'θ = tan⁻¹ 0.75 = 36.87°', 'h = 3.75 × sin 36.87°', 'h = 3.75 × 0.6 = 2.25 m'] };
  const D = { id: 'g11_r_bank', page: 138, fig: 'الشكل 10 + مسألة 4 ص 145',
    desc: 'لزيادة أمان المركبات تجعل الحافة الخارجية للمنعطف أعلى من الداخلية، فيميل رد فعل الطريق N عن الشاقول بزاوية الميل θ. المركبة الأفقية N sinθ تتجه نحو مركز المنعطف وتوفر القوة المركزية mυ²/r ، والمركبة الشاقولية N cosθ توازن الوزن mg ، فيكون tanθ = υ²/(rg) من غير الاعتماد على الاحتكاك.',
    tags: 'المنعطف المائل زاوية الميل N sinθ N cosθ tanθ=v²/rg ارتفاع الحافة الخارجية الانطلاق المصمم مسألة 4',
    tools: ['مقطع عرضي لطريق مائل', 'سيارة (منظر خلفي)', 'متجهات القوى'],
    steps: ['غيّر زاوية الميل θ بسحب الحافة الخارجية للطريق إلى الأعلى أو الأسفل.', 'راقب تحليل N: المركبة الأفقية N sinθ نحو مركز المنعطف والشاقولية N cosθ تساوي الوزن.', 'غيّر الانطلاق: إذا زاد على الانطلاق المصمم تميل السيارة للانزلاق نحو الأعلى، وإذا قل تنزلق نحو الأسفل.', 'حل مسألة 4 واقرأ ارتفاع الحافة الخارجية.'],
    concl: ['N sinθ = mυ² / r و N cosθ = mg.', 'بالقسمة: tanθ = υ² / (r g) ، أي θ = tan⁻¹(υ² / rg).', 'لكل زاوية ميل انطلاق مصمم υ = √(r g tanθ) لا يحتاج فيه إلى احتكاك.', 'مسألة 4: tanθ = 0.75 ، θ = 36.87° ، ارتفاع الحافة الخارجية 2.25 m.'],
    laws: ['g11_l7_bank'],
    controls: [R('th', 'زاوية ميل الطريق θ', 0, 45, 20, 1, '°'), R('v', 'انطلاق السيارة υ', 5, 40, 20, 1, 'm/s'), R('r', 'نصف قطر المنعطف r', 50, 300, 120, 10, 'm'), TG('cmp', 'مركبتا رد الفعل N', true, null, 'arrow')],
    setup(S) { S.thd = 20; S.off = 0; S.ex = 0; S.k = 0; S.rk = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 340; return { w, h, L, x0, x1, cx: (x0 + x1) / 2 + 30, cy: 420 }; },
    update(S, dt) { if (!S.W) return; S.thd = Q57.ez(S.thd, S.p.th, dt, 10); const t = Math.tan(S.thd * Math.PI / 180), e = S.p.v * S.p.v / (S.p.r * Q57.G) - t; S.off = Q57.ez(S.off, clamp(e * 140, -HL + 50, HL - 50), dt, 3); S.rk += dt * 3; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), th = S.thd * Math.PI / 180, c = Math.cos(th), s = Math.sin(th), d = [c, -s], n = [-s, -c], v = S.p.v, r = S.p.r, tn = Math.tan(th), v0 = Math.sqrt(r * Q57.G * tn), A = [g.cx - d[0] * HL, g.cy - d[1] * HL], B = [g.cx + d[0] * HL, g.cy + d[1] * HL], base = g.cy + 80;
      Q57.bg(ctx, w, h);
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, B[1], 0, base); gg.addColorStop(0, '#a16207'); gg.addColorStop(1, '#713f12'); ctx.fillStyle = gg; ctx.beginPath(); ctx.moveTo(A[0] - 30, A[1]); ctx.lineTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.lineTo(B[0] + 30, B[1]); ctx.lineTo(B[0] + 30, base); ctx.lineTo(A[0] - 30, base); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 1.5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(A[0], A[1] - 5); ctx.lineTo(B[0], B[1] - 5); ctx.stroke(); ctx.setLineDash([]); });
      Q57.dash(ctx, [[A[0] - 20, A[1]], [B[0] + 20, A[1]]], '#64748b', 1.2);
      if (th > .03) Q57.arc(ctx, A[0], A[1], 46, -th, 0, '#dc2626', 'θ', 62);
      if (th > .03) { Q57.dash(ctx, [[B[0] + 14, B[1]], [B[0] + 14, A[1]]], '#7c3aed', 2); Q42.T(ctx, 'h = ' + Q57.f(RW * s, 2) + ' m', B[0] + 50, (A[1] + B[1]) / 2, { s: 11, w: 900, c: '#7c3aed', bg: 'rgba(255,255,255,.85)' }); }
      Q42.T(ctx, 'عرض الطريق 3.75 m', g.cx - 40, base - 14, { s: 10.5, w: 900, c: '#fef3c7' });
      Q57.arrow(ctx, g.x0 + 140, 96, -110, 0, '#0f766e', '', 3); Q42.T(ctx, 'نحو مركز المنعطف', g.x0 + 90, 78, { s: 11, w: 900, c: '#0f766e' });
      const G0 = [g.cx + d[0] * S.off, g.cy + d[1] * S.off - 5], sc = 1.15; Q57.carBack(ctx, G0[0], G0[1], sc, '#f97316', -th);
      const P = [G0[0] + n[0] * 30 * sc, G0[1] + n[1] * 30 * sc], Wl = 72, Nl = Math.min(150, Wl / Math.max(c, .1));
      Q57.arrow(ctx, P[0], P[1], 0, Wl, '#dc2626', 'mg', 3.2); Q57.arrow(ctx, P[0], P[1], n[0] * Nl, n[1] * Nl, '#2563eb', 'N', 3.4);
      if (S.p.cmp && th > .03) { Q57.dash(ctx, [[P[0] + n[0] * Nl, P[1] + n[1] * Nl], [P[0], P[1] + n[1] * Nl]], '#94a3b8', 1.2); Q57.arrow(ctx, P[0], P[1], n[0] * Nl, 0, '#16a34a', 'N sinθ', 2.8); Q57.arrow(ctx, P[0] + 4, P[1], 0, n[1] * Nl, '#0ea5e9', 'N cosθ', 2.4); }
      const e = v * v / (r * Q57.G) - tn, st = Math.abs(e) < .03 ? ['الانطلاق مساوٍ للمصمم: لا حاجة للاحتكاك', '#15803d'] : e > 0 ? ['أسرع من المصمم: تميل للانزلاق نحو الأعلى', '#dc2626'] : ['أبطأ من المصمم: تميل للانزلاق نحو الأسفل', '#b45309'];
      Q42.T(ctx, st[0], (g.x0 + g.x1) / 2, base + 40, { s: 11.5, w: 900, c: '#fff', bg: st[1] });
      const C = D.chips(S, g); Q57.drawSteps(ctx, C.e); Q42.drawChips(ctx, C.q);
      if (S.ex) Q57.steps(ctx, S, Object.assign({ title: 'مسألة 4 ص 145' }, EX, { k: S.k }));
      else Q57.card(ctx, S, [{ t: 'N sinθ = m υ² / r', mono: 1, c: '#16a34a', w: 800 }, { t: 'N cosθ = m g', mono: 1, c: '#0ea5e9', w: 800 }, { t: 'tanθ = υ² / (r g)', mono: 1, c: '#7c3aed', w: 900 }, { t: 'θ = ' + Q57.f(S.thd, 1) + '° ⟸ tanθ = ' + Q57.f(tn, 3), mono: 1 }, { t: 'υ² / (r g) = ' + Q57.f(v * v / (r * Q57.G), 3), mono: 1 }, { t: 'الانطلاق المصمم:', c: '#b91c1c', w: 900 }, { t: 'υ = √(r g tanθ) = ' + Q57.f(v0, 1) + ' m/s', mono: 1, c: '#b91c1c', w: 900 }, { t: 'الزاوية اللازمة = ' + Q57.f(Q57.deg(Math.atan(v * v / (r * Q57.G))), 1) + '°', mono: 1 }], { title: 'المنعطف المائل' });
      Q57.banner(ctx, w, 'اسحب الحافة الخارجية لتغيير زاوية الميل');
    },
    chips(S, g) { return { e: Q57.stepChips(S, 'ex', g.h - 84, g.L, 'مسألة 4 ص 145', S2 => { setParam(S2, 'r', 120); setParam(S2, 'v', 29.698); setParam(S2, 'th', 36.87); }, EX.lines.length),
      q: Q42.chips(S, 'q', [['d', 'اجعل υ = المصمم'], ['z', 'طريق أفقي θ = 0']], g.h - 128, '', (S2, k) => { if (k === 'd') setParam(S2, 'v', clamp(+Math.sqrt(S2.p.r * Q57.G * Math.tan(S2.p.th * Math.PI / 180)).toFixed(1), 5, 40)); else setParam(S2, 'th', 0); }, { bw: 190 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), th = S.thd * Math.PI / 180, B = [g.cx + Math.cos(th) * HL, g.cy - Math.sin(th) * HL];
      return [{ id: 'edge', x: B[0], y: B[1], r: 22, axis: 'y', keep: true, tip: 'اسحب الحافة الخارجية', idle: 'اسحب ✋', drag: (S2, d) => { const sn = clamp((g.cy - d.y) / HL, 0, .707); setParam(S2, 'th', Math.round(Math.asin(sn) * 180 / Math.PI)); } }].concat(C.e, C.q); },
    readings(S) { const t = Math.tan(S.p.th * Math.PI / 180); return [rd('زاوية الميل θ', S.p.th + '°'), rd('tanθ', Q57.f(t, 3)), rd('الانطلاق المصمم', Q57.f(Math.sqrt(S.p.r * Q57.G * t), 1) + ' m/s'), rd('υ² / rg', Q57.f(S.p.v ** 2 / (S.p.r * Q57.G), 3)), rd('ارتفاع الحافة الخارجية', Q57.f(RW * Math.sin(S.p.th * Math.PI / 180), 2) + ' m')]; },
    explain(S) { return Q26.ex('سهم رد الفعل N يميل نحو مركز المنعطف، ومركبته الأفقية الخضراء هي التي تدير السيارة.', 'N cosθ يوازن الوزن و N sinθ يوفر القوة المركزية، فبقسمة المعادلتين tanθ = υ² / (rg). عند الانطلاق المصمم لا نحتاج إلى الاحتكاك.', 'المنعطفات في الطرق السريعة وحلبات السباق وسكك القطارات مائلة، والطائرة تميل بجناحيها عند الاستدارة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D — الوزن الحقيقي والظاهري في المصعد (7-8، الشكلان 11 و 12، مثال 2 ص 142) =============== */
(() => {
  const MD = { rest: ['ساكن', 0, 0], cvu: ['صعود ثابت', 0, 2], cvd: ['نزول ثابت', 0, -2], up: ['صعود بتعجيل', 1, 0], dn: ['نزول بتعجيل', -1, 0], ff: ['سقوط حر', 'g', 0] };
  const EX = { q: 'شخص كتلته 60 kg يقف على ميزان داخل مصعد، g = 10 m/s². ما قراءة الميزان عندما: a يتحرك المصعد نحو الأسفل بسرعة ثابتة؟ b ينزل بتعجيل 2 m/s²؟ c يصعد بتعجيل 2 m/s²؟', lines: ['الحالة a: سرعة ثابتة ⟸ a = 0', 'N = m g = 60 × 10 = 600 N', 'الحالة b: نازل بتعجيل 2 m/s²', 'm g − N = m a', 'N = 600 − 60 × 2 = 480 N', 'الحالة c: صاعد بتعجيل 2 m/s²', 'N − m g = m a', 'N = 600 + 60 × 2 = 720 N'] };
  const D = { id: 'g11_r_lift', page: 139, fig: 'الأشكال 11a و 11b و 11c و 11d و 12 + مثال 2',
    desc: 'الوزن الحقيقي w = mg هو قوة جذب الأرض للجسم. أما الوزن الظاهري فهو القوة التي يسلطها السطح على الجسم، أي قراءة الميزان N. في مصعد ساكن أو يتحرك بسرعة ثابتة يكون الوزن الظاهري مساوياً للحقيقي، وعندما ينزل بتعجيل a يكون w_app = w − ma ، وعندما يصعد بتعجيل a يكون w_app = w + ma ، وفي السقوط الحر a = g فيكون الوزن الظاهري صفراً (انعدام الوزن).',
    tags: 'الوزن الحقيقي الوزن الظاهري المصعد الميزان رد الفعل N تعجيل نحو الأعلى نحو الأسفل السقوط الحر انعدام الوزن مثال 2 480N 720N',
    tools: ['مصعد', 'ميزان ذو مؤشر تحت قدمي الشخص', 'شخص كتلته m'],
    steps: ['اختر حالة المصعد من الأزرار، أو اسحب المصعد نحو الأعلى أو الأسفل.', 'راقب مؤشر الميزان ومخطط القوى N و mg.', 'غيّر الكتلة ومقدار التعجيل من اللوحة.', 'اختر «سقوط حر»: الميزان يقرأ صفراً.', 'حل مثال 2 خطوة خطوة: المصعد يتحرك مع كل حالة.'],
    concl: ['الوزن الحقيقي w = mg ثابت، والوزن الظاهري = قراءة الميزان = N.', 'ساكن أو بسرعة ثابتة: N = mg.', 'نازل بتعجيل أو صاعد بتباطؤ: N = mg − ma أقل من الحقيقي.', 'صاعد بتعجيل: N = mg + ma أكبر من الحقيقي.', 'السقوط الحر a = g: N = 0 انعدام الوزن. مثال 2: 600 N ، 480 N ، 720 N.'],
    laws: ['g11_l7_wapp'],
    controls: [R('m', 'كتلة الشخص m', 40, 100, 70, 5, 'kg'), R('a', 'مقدار تعجيل المصعد a', 0, 5, 2, .5, 'm/s²'), TG('g10', 'استعمل g = 10 m/s²', false, null, 'globe'), TG('fbd', 'مخطط القوى', true, null, 'arrow')],
    setup(S) { S.md = 'rest'; S.tt = 0; S.vel = 0; S.scr = 0; S.Nd = 686; S.fl = 0; S.run = 1; S.ex = 0; S.k = 0; S.cy0 = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 340, sx = x0 + 120; return { w, h, L, x0, x1, sx, ct: 120, cw: 190, ch: 270, dx: Math.min(x1 - 70, sx + 250), dy: 240 }; },
    gg(S) { return S.p.g10 ? 10 : 9.8; },
    acc(S) { const q = MD[S.md][1]; return q === 'g' ? -D.gg(S) : q * S.p.a; },
    mode(S2, k) { if (S2.md !== k) { S2.md = k; S2.tt = 0; S2.vel = MD[k][2]; } S2.run = 1; },
    update(S, dt) {
      if (!S.W) return; if (S.ex) { const k = S.k <= 2 ? 'cvd' : S.k <= 5 ? 'dn' : 'up'; if (S.md !== k) D.mode(S, k); }
      const a = D.acc(S), g = D.gg(S), N = Math.max(0, S.p.m * (g + a)); S.Nd = Q57.ez(S.Nd, N, dt, 6); S.fl = Q57.ez(S.fl, S.md === 'ff' ? 14 : 0, dt, 4); S.cy0 = Q57.ez(S.cy0, 0, dt, 6);
      if (!S.run) return; S.tt += dt; S.vel = MD[S.md][2] + a * S.tt; S.scr += S.vel * dt * 40;
      if (MD[S.md][1] !== 0 && S.tt > 3) S.run = 0;
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), m = S.p.m, gv = D.gg(S), a = D.acc(S), W = m * gv, N = Math.max(0, m * (gv + a)), ct = g.ct + S.cy0;
      Q57.bg(ctx, w, h);
      // shaft with moving marks
      K.raw(ctx, () => { const L0 = g.sx - g.cw / 2 - 26, L1 = g.sx + g.cw / 2 + 26; ctx.fillStyle = '#cbd5e1'; ctx.fillRect(L0, 64, L1 - L0, g.h - 64 - 190); ctx.fillStyle = '#94a3b8'; ctx.fillRect(L0, 64, 10, g.h - 254); ctx.fillRect(L1 - 10, 64, 10, g.h - 254);
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; const off = ((S.scr % 70) + 70) % 70; for (let y = 64 + off - 70; y < g.h - 190; y += 70) { if (y < 64) continue; ctx.beginPath(); ctx.moveTo(L0, y); ctx.lineTo(L0 + 18, y); ctx.moveTo(L1 - 18, y); ctx.lineTo(L1, y); ctx.stroke(); }
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; if (S.md !== 'ff') { ctx.beginPath(); ctx.moveTo(g.sx, 64); ctx.lineTo(g.sx, ct); ctx.stroke(); } else { ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(g.sx, 64); ctx.lineTo(g.sx, 90); ctx.stroke(); ctx.setLineDash([]); }
        const gc = ctx.createLinearGradient(g.sx - g.cw / 2, 0, g.sx + g.cw / 2, 0); gc.addColorStop(0, '#e2e8f0'); gc.addColorStop(.5, '#f8fafc'); gc.addColorStop(1, '#cbd5e1'); ctx.fillStyle = gc; rr(ctx, g.sx - g.cw / 2, ct, g.cw, g.ch, 8); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.stroke();
        ctx.fillStyle = '#64748b'; ctx.fillRect(g.sx - g.cw / 2, ct + g.ch - 12, g.cw, 12); });
      const fy = ct + g.ch - 12; Q57.scale(ctx, g.sx, fy - 8, N, 1000); Q57.person(ctx, g.sx, fy - 16 - S.fl, 120, { arm: S.md === 'ff' ? .8 : 0, col: '#b91c1c' });
      if (S.p.fbd) { Q57.arrow(ctx, g.sx + 34, fy - 18, 0, -clamp(N / 8, 0, 130), '#2563eb', 'N', 3.2); Q57.arrow(ctx, g.sx - 34, fy - 80, 0, clamp(W / 8, 20, 130), '#dc2626', 'mg', 3.2); }
      const ax = g.sx + g.cw / 2 + 50; if (Math.abs(a) > .01) Q57.arrow(ctx, ax, ct + 70, 0, -clamp(a * 12, -110, 110), '#7c3aed', 'a', 3.2);
      if (Math.abs(S.vel) > .05 && S.run) Q57.arrow(ctx, ax + 28, ct + 170, 0, -clamp(S.vel * 12, -90, 90), '#16a34a', 'υ', 2.6);
      Q57.dial(ctx, g.dx, g.dy, 66, S.Nd, 1000, 'N', 'قراءة الميزان');
      Q42.T(ctx, MD[S.md][0], g.sx, 84, { s: 12, w: 900, c: '#fff', bg: '#7c3aed' });
      if (S.md === 'ff') Q42.T(ctx, 'انعدام الوزن', g.dx, g.dy + 110, { s: 12, w: 900, c: '#fff', bg: '#dc2626' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p); Q57.drawSteps(ctx, C.e);
      if (S.ex) Q57.steps(ctx, S, Object.assign({ title: 'مثال 2 ص 142' }, EX, { k: S.k }));
      else { const rel = Math.abs(N - W) < .5 ? 'الظاهري = الحقيقي' : N < W ? 'الظاهري أقل من الحقيقي' : 'الظاهري أكبر من الحقيقي';
        Q57.card(ctx, S, [{ t: 'الوزن الحقيقي w = m g', c: '#dc2626', w: 900 }, { t: 'w = ' + m + ' × ' + gv + ' = ' + Q57.f(W, 0) + ' N', mono: 1 }, { t: 'التعجيل نحو الأعلى a = ' + Q57.f(a, 1) + ' m/s²', c: '#7c3aed', w: 800 }, { t: 'N − m g = m a', mono: 1 }, { t: 'N = m (g + a) = ' + Q57.f(N, 0) + ' N', mono: 1, c: '#2563eb', w: 900 }, { t: rel, c: '#0f766e', w: 900 }], { title: 'الوزن الظاهري = قراءة الميزان' }); }
      Q57.banner(ctx, w, 'اسحب المصعد للأعلى أو للأسفل');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', Object.keys(MD).map(k => [k, MD[k][0]]), g.h - 128, S.md, (S2, k) => { S2.ex = 0; D.mode(S2, k); S2.tt = 0; S2.vel = MD[k][2]; }, { bw: 118, col: '#7c3aed' }),
      p: Q57.play(S, 'run', g.h - 84, S.run, S2 => { if (!S2.run && MD[S2.md][1] !== 0 && S2.tt > 3) { S2.tt = 0; S2.vel = MD[S2.md][2]; } S2.run = !S2.run; }, S2 => { S2.tt = 0; S2.vel = MD[S2.md][2]; S2.run = 1; }, { bw: 120, x0: g.L + 340 }),
      e: Q57.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 2 ص 142', S2 => { setParam(S2, 'm', 60); setParam(S2, 'a', 2); setParam(S2, 'g10', true); D.mode(S2, 'cvd'); }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), cy = g.ct + g.ch / 2;
      return [{ id: 'cab', x: g.sx, y: g.ct + 60 + S.cy0, r: 30, axis: 'y', keep: true, tip: 'اسحب المصعد', idle: 'اسحب ✋', drag: (S2, d) => { const dy = d.y - (g.ct + 60); S2.cy0 = clamp(dy, -40, 40); S2.ex = 0; D.mode(S2, dy < -18 ? 'up' : dy > 18 ? 'dn' : 'rest'); } }].concat(C.m, C.p, C.e); },
    readings(S) { const g = D.gg(S), a = D.acc(S), N = Math.max(0, S.p.m * (g + a)); return [rd('حالة المصعد', MD[S.md][0]), rd('الوزن الحقيقي mg', Q57.f(S.p.m * g, 0) + ' N'), rd('التعجيل نحو الأعلى', Q57.f(a, 1) + ' m/s²'), rd('الوزن الظاهري N', Q57.f(N, 0) + ' N')]; },
    record(S) { const g = D.gg(S), a = D.acc(S); return { md: MD[S.md][0], a: +a.toFixed(1), N: +Math.max(0, S.p.m * (g + a)).toFixed(0) }; },
    cols: [['md', 'الحالة'], ['a', 'a (m/s²)'], ['N', 'N (N)']],
    explain(S) { return Q26.ex('مؤشر الميزان يرتفع عند بدء الصعود بتعجيل، وينخفض عند النزول بتعجيل، ويعود إلى الوزن الحقيقي عندما تصبح السرعة ثابتة، ويهبط إلى الصفر في السقوط الحر.', 'الميزان يقيس رد الفعل N. بتطبيق القانون الثاني N − mg = ma ، فالتعجيل نحو الأعلى يزيد N والتعجيل نحو الأسفل ينقصه، ولا يتغير الوزن الحقيقي mg.', 'الشعور بالثقل عند انطلاق المصعد صعوداً وبالخفة عند بدء نزوله، ورواد الفضاء في المحطة الفضائية في حالة سقوط حر مستمر فيشعرون بانعدام الوزن.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E — مسائل الفصل الأول (ص 144–145): الدولاب، دوران الأرض، تعجيل نقطة على الأرض، القمر الصناعي =============== */
(() => {
  const RE = 6.37e6, W0 = TAU / 86400, GM = 6.67e-11 * 5.98e24;
  const PB = { s1: ['مسألة 1: الدولاب', 'دولاب هواء نصف قطره 10 m يدور بمستوى شاقولي. كم يكون زمن الدورة لكي يصير الوزن الظاهري للراكب صفراً في أعلى نقطة؟', ['عند أعلى نقطة: m g − N = m υ² / r', 'الوزن الظاهري صفر ⟸ N = 0', 'υ² = g r = 9.8 × 10 = 98', 'υ = 9.9 m/s', 'T = 2π r / υ = 2π × 10 / 9.9', 'T = 6.35 s']],
    s2: ['مسألة 2: دوران الأرض', 'لو ازدادت السرعة الزاوية للأرض حتى صار التعجيل المركزي لشخص عند خط الاستواء بقدر تعجيل الجاذبية، فكم يكون وزنه الظاهري؟', ['الوزن الظاهري = m g − m ac', 'التعجيل المركزي ac = ω² R', 'يزداد بزيادة السرعة الزاوية للأرض', 'عندما يصير ac = g:', 'الوزن الظاهري = m g − m g = 0', 'الشخص في حالة انعدام الوزن']],
    s3: ['مسألة 3: نقطة على الأرض', 'احسب التعجيل المركزي لنقطة على سطح الأرض تبعد 5000 km عن محور دورانها.', ['ω = 2π / T = 2π / (24 × 3600)', 'ω = 7.27 × 10⁻⁵ rad/s', 'ac = ω² r', 'ac = (7.27 × 10⁻⁵)² × 5 × 10⁶', 'ac = 0.0264 m/s²']],
    s5: ['مسألة 5: القمر الصناعي', 'قمر صناعي يدور حول الأرض بمدار دائري نصف قطره 7000 km. احسب انطلاقه وزمن دورته. G = 6.67×10⁻¹¹ و M = 5.98×10²⁴ kg', ['قوة الجاذبية هي القوة المركزية:', 'G M m / r² = m υ² / r', 'υ = √(G M / r)', 'υ = √(6.67×10⁻¹¹ × 5.98×10²⁴ / 7×10⁶)', 'υ = 7549 m/s', 'T = 2π r / υ = 2π × 7×10⁶ / 7549', 'T = 5826 s ≈ 97 min']] };
  const D = { id: 'g11_r_prob1', page: 144, fig: 'مسائل الفصل ص 144–145',
    desc: 'نحل مسائل القسم الأول من أسئلة الفصل بتجارب مرئية: راكب دولاب الهواء في أعلى نقطة (مسألة 1)، زيادة سرعة دوران الأرض حتى ينعدم الوزن الظاهري عند خط الاستواء (مسألة 2)، التعجيل المركزي لنقطة على سطح الأرض (مسألة 3)، وانطلاق القمر الصناعي وزمن دورته (مسألة 5). المسألتان 4 و 6 في تجربة المنعطفات.',
    tags: 'مسائل الفصل السابع دولاب الهواء الوزن الظاهري صفر دوران الأرض خط الاستواء التعجيل المركزي 0.0264 القمر الصناعي 7549 m/s 97 min',
    tools: ['دولاب هواء', 'الكرة الأرضية', 'قمر صناعي'],
    steps: ['اختر المسألة من الأزرار السفلى، ثم اضغط «الخطوة التالية» لترى الحل.', 'مسألة 1: غيّر زمن الدورة T حتى يصير الوزن الظاهري في القمة صفراً.', 'مسألة 2: زد سرعة دوران الأرض من اللوحة: يقل الوزن الظاهري عند خط الاستواء.', 'مسألة 3: اسحب النقطة على سطح الأرض لتغيير بعدها عن المحور.', 'مسألة 5: اسحب القمر الصناعي لتغيير نصف قطر مداره.'],
    concl: ['مسألة 1: υ = √(g r) = 9.9 m/s ، T = 6.35 s.', 'مسألة 2: عندما ac = g يصير الوزن الظاهري صفراً.', 'مسألة 3: ac = ω² r = 0.0264 m/s².', 'مسألة 5: υ = √(GM / r) = 7549 m/s ، T ≈ 5826 s ≈ 97 min.'],
    laws: ['g11_l7_ac', 'g11_l7_wapp', 'g11_l7_vrw'],
    controls: [R('T', 'زمن دورة الدولاب في مسألة 1', 3, 20, 10, .05, 's'), R('sp', 'مضاعف سرعة دوران الأرض في مسألة 2', 1, 18, 1, .1, '×')],
    setup(S) { S.sc = 's1'; S.ex = 0; S.k = 0; S.an = 0; S.hold = 0; S.lat = .9; S.latd = .9; S.ro = 7000; S.rod = 7000; S.er = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 340; return { w, h, L, x0, x1, cx: (x0 + x1) / 2, cy: 290 }; },
    cur(S) { return S.ex || S.sc; },
    update(S, dt) { if (!S.W) return; const c = D.cur(S); S.latd = Q57.ez(S.latd, S.lat, dt, 10); S.rod = Q57.ez(S.rod, S.ro, dt, 8);
      if (c === 's1' && !S.hold) S.an += TAU / S.p.T * dt; S.er += dt * (c === 's2' ? .25 * S.p.sp : .4);
      if (c === 's5') S.an += dt * 1.2 * Math.pow(7000 / S.rod, 1.5); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = D.cur(S), P = PB[c]; let L = [];
      Q57.bg(ctx, w, h);
      if (c === 's1') {
        const R = 150, cy = g.cy - 10, v = TAU * 10 / S.p.T, q = v * v / (Q57.G * 10), top = 1 - q, bot = 1 + q;
        K.raw(ctx, () => { const sky = ctx.createLinearGradient(0, 64, 0, cy + R + 40); sky.addColorStop(0, '#bfdbfe'); sky.addColorStop(1, '#eff6ff'); ctx.fillStyle = sky; rr(ctx, g.x0 - 10, 64, g.x1 - g.x0 + 20, cy + R + 50 - 64, 12); ctx.fill();
          ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(g.cx, cy); ctx.lineTo(g.cx - 70, cy + R + 40); ctx.moveTo(g.cx, cy); ctx.lineTo(g.cx + 70, cy + R + 40); ctx.stroke();
          ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(g.cx, cy, R, 0, TAU); ctx.stroke(); ctx.lineWidth = 1; for (let k = 0; k < 12; k++) { const b = S.an + k * TAU / 12; ctx.beginPath(); ctx.moveTo(g.cx, cy); ctx.lineTo(g.cx + Math.cos(b) * R, cy + Math.sin(b) * R); ctx.stroke(); } });
        for (let k = 0; k < 12; k++) { const b = S.an + k * TAU / 12, x = g.cx + Math.cos(b) * R, y = cy + Math.sin(b) * R; K.raw(ctx, () => { ctx.fillStyle = k ? '#7dd3fc' : '#f59e0b'; ctx.beginPath(); ctx.ellipse(x, y + 8, 10, 12, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke(); }); }
        const b0 = S.an, rx = g.cx + Math.cos(b0) * R, ry = cy + Math.sin(b0) * R; Q41.knob(ctx, rx, ry, '#f59e0b', 8);
        Q57.arrow(ctx, g.cx, cy - R - 6, 0, -36, '#dc2626', '', 2); Q42.T(ctx, 'القمة: ' + Q57.f(Math.max(0, top) * 100, 0) + '% من الوزن', g.cx, cy - R - 54 < 70 ? 70 : cy - R - 54, { s: 11, w: 900, c: '#fff', bg: Math.abs(top) < .02 ? '#16a34a' : top < 0 ? '#dc2626' : '#2563eb' });
        Q42.T(ctx, 'الأسفل: ' + Q57.f(bot * 100, 0) + '% من الوزن', g.cx, cy + R + 30, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' });
        L = [{ t: 'r = 10 m , T = ' + S.p.T + ' s', mono: 1 }, { t: 'υ = 2π r / T = ' + Q57.f(v, 2) + ' m/s', mono: 1 }, { t: 'υ² / r = ' + Q57.f(v * v / 10, 2) + ' m/s²', mono: 1, c: '#2563eb', w: 800 }, { t: 'في القمة: N = m (g − υ²/r)', c: '#334155' }, { t: top < -0.02 ? 'الراكب يحتاج حزام أمان: g أقل من υ²/r' : Math.abs(top) <= .02 ? 'الوزن الظاهري في القمة = صفر' : 'الوزن الظاهري أقل من الحقيقي', c: Math.abs(top) <= .02 ? '#15803d' : '#b45309', w: 900 }];
      } else if (c === 's2') {
        const Rp = 130, om = W0 * S.p.sp, ac = om * om * RE, wa = Math.max(0, 1 - ac / Q57.G), px = g.cx + Rp, py = g.cy;
        K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; rr(ctx, g.x0 - 10, 64, g.x1 - g.x0 + 20, 420, 14); ctx.fill(); });
        Q57.earth(ctx, g.cx, g.cy, Rp, S.er); Q57.dash(ctx, [[g.cx, g.cy - Rp - 30], [g.cx, g.cy + Rp + 30]], '#e2e8f0', 1.4); Q42.T(ctx, 'محور الدوران', g.cx, g.cy - Rp - 40, { s: 10.5, w: 900, c: '#e2e8f0' });
        K.raw(ctx, () => { ctx.save(); ctx.translate(px, py); ctx.rotate(Math.PI / 2); ctx.restore(); });
        Q57.person(ctx, px + 4, py, 44, { col: '#facc15' });
        Q57.arrow(ctx, px - 6, py - 30, -clamp(ac / Q57.G * 80, 0, 80), 0, '#38bdf8', 'ac', 2.8); Q57.arrow(ctx, px + 30, py - 22, -50, 0, '#f87171', 'g', 2.4);
        Q57.dial(ctx, g.x1 - 70, 150, 54, wa * 100, 100, '%', 'الوزن الظاهري');
        Q41.slider(ctx, g.x0 + 30, g.x1 - 30, g.cy + Rp + 70, (S.p.sp - 1) / 17, '', '#38bdf8'); Q42.T(ctx, 'سرعة دوران الأرض × ' + S.p.sp, g.cx, g.cy + Rp + 50, { s: 11, w: 900, c: '#fff', bg: '#0369a1' });
        L = [{ t: 'ω = ' + S.p.sp + ' × 7.27×10⁻⁵ rad/s', mono: 1 }, { t: 'ac = ω² R = ' + Q57.f(ac, 3) + ' m/s²', mono: 1, c: '#0284c7', w: 800 }, { t: 'نصف قطر الأرض تقريباً 6.37×10⁶ m', c: '#64748b', s: 11 }, { t: 'الوزن الظاهري = ' + Q57.f(wa * 100, 1) + '% من الحقيقي', c: '#b91c1c', w: 900 }, { t: wa < .005 ? 'ac = g: انعدام الوزن' : 'زد السرعة إلى نحو 17 مرة', c: wa < .005 ? '#15803d' : '#0f766e', w: 900 }];
      } else if (c === 's3') {
        const Rp = 140, lat = S.latd, ra = Math.cos(lat) * Rp, py = g.cy - Math.sin(lat) * Rp, rkm = Math.cos(lat) * 6370, ac = W0 * W0 * rkm * 1000;
        Q57.earth(ctx, g.cx, g.cy, Rp, S.er); Q57.dash(ctx, [[g.cx, g.cy - Rp - 30], [g.cx, g.cy + Rp + 30]], '#334155', 1.6); Q42.T(ctx, 'محور الأرض', g.cx, g.cy - Rp - 40, { s: 10.5, w: 900, c: '#334155' });
        K.raw(ctx, () => { ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.ellipse(g.cx, py, ra, ra * .18, 0, 0, TAU); ctx.stroke(); ctx.setLineDash([]); });
        Q41.line(ctx, [[g.cx, py], [g.cx + ra, py]], '#b91c1c', 2.4); Q42.T(ctx, 'r = ' + Math.round(rkm) + ' km', g.cx + ra / 2, py - 14, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' });
        Q57.arrow(ctx, g.cx + ra, py, -Math.min(70, ra * .8), 0, '#7c3aed', 'ac', 3); Q41.knob(ctx, g.cx + ra, py, '#facc15', 9);
        L = [{ t: 'T = 24 h = 86400 s', mono: 1 }, { t: 'ω = 2π / T = 7.27×10⁻⁵ rad/s', mono: 1 }, { t: 'r = ' + Math.round(rkm) + ' km', mono: 1, c: '#b91c1c', w: 800 }, { t: 'ac = ω² r = ' + Q57.f(ac, 4) + ' m/s²', mono: 1, c: '#7c3aed', w: 900 }, { t: 'التعجيل نحو المحور وليس نحو مركز الأرض', c: '#0f766e', w: 800 }];
      } else {
        const sc = 150 / 12000, Rp = 6370 * sc, ro = S.rod * sc, x = g.cx + Math.cos(S.an) * ro * 1.6, y = g.cy + Math.sin(S.an) * ro * 1.6, v = Math.sqrt(GM / (S.rod * 1000)), T = TAU * S.rod * 1000 / v;
        K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; rr(ctx, g.x0 - 10, 64, g.x1 - g.x0 + 20, 440, 14); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.7)'; for (let k = 0; k < 40; k++) ctx.fillRect(g.x0 + (k * 97) % (g.x1 - g.x0), 70 + (k * 53) % 420, 1.5, 1.5); ctx.strokeStyle = 'rgba(148,163,184,.7)'; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.arc(g.cx, g.cy, ro * 1.6, 0, TAU); ctx.stroke(); ctx.setLineDash([]); });
        Q57.earth(ctx, g.cx, g.cy, Rp * 1.6, S.er);
        K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(S.an); ctx.fillStyle = '#2563eb'; ctx.fillRect(-16, -5, 12, 10); ctx.fillRect(4, -5, 12, 10); ctx.fillStyle = '#e5e7eb'; ctx.fillRect(-5, -7, 10, 14); ctx.restore(); });
        Q57.arrow(ctx, x, y, -Math.sin(S.an) * 50, Math.cos(S.an) * 50, '#dc2626', 'υ', 2.8); Q57.arrow(ctx, x, y, -Math.cos(S.an) * 40, -Math.sin(S.an) * 40, '#facc15', 'Fc', 2.8);
        L = [{ t: 'r = ' + Math.round(S.rod) + ' km', mono: 1, c: '#7c3aed', w: 800 }, { t: 'υ = √(G M / r) = ' + Math.round(v) + ' m/s', mono: 1, c: '#b91c1c', w: 900 }, { t: 'T = 2π r / υ = ' + Math.round(T) + ' s', mono: 1 }, { t: 'T = ' + Q57.f(T / 60, 1) + ' min', mono: 1 }, { t: 'كلما كبر نصف قطر المدار قل الانطلاق', c: '#0f766e', w: 800 }];
      }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.s); Q42.drawChips(ctx, C.e);
      if (S.ex) Q57.steps(ctx, S, { title: P[0] + ' ص 144', q: P[1], lines: P[2], k: S.k });
      else Q57.card(ctx, S, L, { title: P[0] });
      Q57.banner(ctx, w, c === 's1' ? 'اسحب العربة الصفراء لتدوير الدولاب' : c === 's2' ? 'اسحب المؤشر لتسريع دوران الأرض' : c === 's3' ? 'اسحب النقطة الصفراء على سطح الأرض' : 'اسحب القمر الصناعي لتغيير مداره');
    },
    chips(S, g) { const ks = Object.keys(PB); return { s: Q42.chips(S, 'sc', ks.map(k => [k, PB[k][0]]), g.h - 128, D.cur(S), (S2, k) => { S2.sc = k; S2.ex = 0; }, { bw: 170, col: '#7c3aed' }),
      e: Q57.exChips(S, 'ex', g.h - 84, g.L, ks.map(k => [k, 'حل ' + PB[k][0].split(':')[0]]), (S2, k) => { S2.sc = k; if (k === 's1') setParam(S2, 'T', 6.35); if (k === 's2') setParam(S2, 'sp', 17.1); if (k === 's3') S2.lat = Math.acos(5000 / 6370); if (k === 's5') S2.ro = 7000; }, k => PB[k][2].length, 130) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), c = D.cur(S); let it = null;
      if (c === 's1') { const R = 150, cy = g.cy - 10; it = { id: 'rid', x: g.cx + Math.cos(S.an) * R, y: cy + Math.sin(S.an) * R, r: 20, axis: 'xy', keep: true, tip: 'اسحب العربة', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; S2.an = Math.atan2(d.y - cy, d.x - g.cx); }, up: S2 => { S2.hold = 0; } }; }
      else if (c === 's2') it = Q41.sdrag('spd', g.x0 + 30, g.x1 - 30, g.cy + 200, (S.p.sp - 1) / 17, (S2, t) => setParam(S2, 'sp', Math.round((1 + 17 * t) * 10) / 10), { tip: 'اسحب المؤشر', extra: { idle: 'اسحب ✋' } });
      else if (c === 's3') { const Rp = 140; it = { id: 'pt', x: g.cx + Math.cos(S.latd) * Rp, y: g.cy - Math.sin(S.latd) * Rp, r: 20, axis: 'xy', keep: true, tip: 'اسحب النقطة', idle: 'اسحب ✋', drag: (S2, d) => { S2.lat = clamp(Math.atan2(g.cy - d.y, Math.max(1, d.x - g.cx)), 0, 1.4); } }; }
      else { const sc = 150 / 12000 * 1.6; it = { id: 'sat', x: g.cx + Math.cos(S.an) * S.rod * sc, y: g.cy + Math.sin(S.an) * S.rod * sc, r: 22, axis: 'xy', keep: true, tip: 'اسحب القمر', idle: 'اسحب ✋', drag: (S2, d) => { S2.ro = clamp(Math.round(Math.hypot(d.x - g.cx, d.y - g.cy) / sc / 100) * 100, 6700, 12000); } }; }
      return [it].concat(C.s, C.e); },
    readings(S) { const c = D.cur(S); if (c === 's1') { const v = TAU * 10 / S.p.T; return [rd('المسألة', PB[c][0]), rd('الانطلاق υ', Q57.f(v, 2) + ' m/s'), rd('الوزن الظاهري في القمة', Q57.f(Math.max(0, 1 - v * v / (98)) * 100, 0) + '%')]; }
      if (c === 's2') { const ac = (W0 * S.p.sp) ** 2 * RE; return [rd('المسألة', PB[c][0]), rd('التعجيل المركزي ac', Q57.f(ac, 3) + ' m/s²'), rd('الوزن الظاهري', Q57.f(Math.max(0, 1 - ac / Q57.G) * 100, 1) + '%')]; }
      if (c === 's3') { const r = Math.cos(S.lat) * 6.37e6; return [rd('المسألة', PB[c][0]), rd('البعد عن المحور r', Math.round(r / 1000) + ' km'), rd('ac', Q57.f(W0 * W0 * r, 4) + ' m/s²')]; }
      const v = Math.sqrt(GM / (S.ro * 1000)); return [rd('المسألة', PB[c][0]), rd('نصف قطر المدار', S.ro + ' km'), rd('الانطلاق υ', Math.round(v) + ' m/s'), rd('زمن الدورة T', Q57.f(TAU * S.ro * 1000 / v / 60, 1) + ' min')]; },
    explain(S) { return Q26.ex('في القمة يقل ما يضغط به الراكب على المقعد كلما زاد انطلاق الدولاب، وفي الأسفل يزداد. وزيادة سرعة دوران الأرض تقلل الوزن الظاهري عند خط الاستواء.', 'جزء من الوزن يستعمل قوة مركزية mυ²/r ، فيكون رد فعل المقعد أو الأرض N = mg − mυ²/r ، فإذا كان mυ²/r = mg صار N = 0. والقمر الصناعي تكون الجاذبية كلها قوة مركزية له.', 'الشعور بالخفة في قمة الأفعوانية، والأقمار الصناعية للاتصالات، ووزن الأجسام عند خط الاستواء أقل قليلاً منه عند القطبين.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F — الحركة الدورانية والتعجيل الزاوي ومعادلات الحركة الزاوية (7-9 … 7-11، الأشكال 13–15، مثال 3 ص 148) =============== */
(() => {
  const SL = .5;
  const EX = { q: 'عجلة تدور بتعجيل زاوي ثابت 3.5 rad/s² ، وسرعتها الزاوية 2 rad/s عند t = 0. احسب: 1 الإزاحة الزاوية خلال 2 s بالراديان وبالدورات. 2 السرعة الزاوية عند t = 2 s', lines: ['θ = ωi t + ½ α t²', 'θ = 2 × 2 + ½ × 3.5 × 2²', 'θ = 4 + 7 = 11 rad', 'θ = 11 / 2π = 1.75 rev', 'ωf = ωi + α t', 'ωf = 2 + 3.5 × 2 = 9 rad/s'] };
  const D = { id: 'g11_r_alpha', page: 146, fig: 'الأشكال 13 و 14 و 15 + جدول المعادلات + مثال 3',
    desc: 'الجسم الجاسئ الذي يدور حول محور ثابت تدور جميع نقاطه بالإزاحة الزاوية θ نفسها وبالسرعة الزاوية ω نفسها وبالتعجيل الزاوي α = Δω/Δt نفسه. اتجاه ω يحدد بقاعدة الكف اليمنى (الأصابع مع الدوران والإبهام باتجاه ω)، و α باتجاه ω إذا تزايدت السرعة وبعكسه إذا تناقصت. والتعجيل المماسي لنقطة تبعد r عن المحور aT = rα. ومعادلات الحركة الزاوية بتعجيل منتظم تناظر معادلات الحركة الخطية.',
    tags: 'الحركة الدورانية الجسم الجاسئ التعجيل الزاوي α=Δω/Δt rad/s² قاعدة الكف اليمنى aT=rα معادلات الحركة الزاوية ωf=ωi+αt θ=ωit+½αt² مثال 3 11 rad 1.75 rev 9 rad/s',
    tools: ['عجلة على محور ثابت', 'خط إسناد', 'مؤقت', 'مخطط ω مع الزمن'],
    steps: ['اضبط ωi و α من اللوحة ثم شغّل الدوران: يرسم مخطط ω مع الزمن خطاً مستقيماً ميله α.', 'قارن النقطتين P و Q: لهما θ و ω و α نفسها، لكن aT = rα و υ = rω مختلفة.', 'اجعل α سالباً: تتباطأ العجلة ويصير سهم α عكس سهم ω.', 'لاحظ قاعدة الكف اليمنى: الإبهام باتجاه ω عمودي على مستوى الدوران.', 'حل مثال 3 خطوة خطوة.'],
    concl: ['α = (ωf − ωi) / (tf − ti) ، ووحدته rad/s².', 'جميع نقاط الجسم الجاسئ لها θ و ω و α نفسها.', 'S = rθ ، υ = rω ، aT = rα.', 'ωf = ωi + αt ، θ = ωi t + ½αt² ، ωf² = ωi² + 2αθ ، θ = (ωi + ωf) t / 2.', 'مثال 3: θ = 11 rad = 1.75 rev ، ωf = 9 rad/s.'],
    laws: ['g11_l7_alpha', 'g11_l7_kin'],
    controls: [R('wi', 'السرعة الزاوية الابتدائية ωi', 0, 6, 2, .5, 'rad/s'), R('al', 'التعجيل الزاوي α', -3, 5, 3.5, .5, 'rad/s²'), TG('rhr', 'قاعدة الكف اليمنى', true, null, 'hand'), TG('two', 'نقطة ثانية Q', true, null, 'dot')],
    setup(S) { S.tw = 0; S.run = 1; S.tEnd = 4; S.hist = []; S.th0 = 0; S.ex = 0; S.k = 0; S.wd = 2; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 340; return { w, h, L, x0, x1, cx: (x0 + x1) / 2, cy: 260, R: 130, gx: w - 290, gy: 410, gw: 250, gh: 130 }; },
    st(S, t) { const wi = S.p.wi, al = S.p.al; let tt = t; if (al < 0) tt = Math.min(t, wi / -al); return { th: wi * tt + .5 * al * tt * tt, om: Math.max(0, wi + al * tt) }; },
    reset(S2) { S2.tw = 0; S2.hist = []; S2.run = 1; },
    update(S, dt) { if (!S.W) return; if (S.run) { S.tw = Math.min(S.tEnd, S.tw + dt * SL); const q = D.st(S, S.tw); S.hist.push([S.tw, q.om]); if (S.hist.length > 400) S.hist.shift(); if (S.tw >= S.tEnd) S.run = 0; } S.wd = Q57.ez(S.wd, D.st(S, S.tw).om, dt, 12); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), q = D.st(S, S.tw), th = q.th + S.th0, om = q.om, al = S.p.al, rot = -th;
      Q57.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.cx - 6, g.cy, 12, g.R + 40); rr(ctx, g.cx - 60, g.cy + g.R + 36, 120, 14, 5); ctx.fill(); });
      Q57.wheel(ctx, g.cx, g.cy, g.R, rot, { mark: false, n: 18 });
      const tm = ((th % TAU) + TAU) % TAU; Q57.dash(ctx, [[g.cx, g.cy], [g.cx + g.R + 50, g.cy]], '#dc2626', 2); Q42.T(ctx, 'خط الإسناد', g.cx + g.R + 26, g.cy + 16, { s: 10.5, w: 900, c: '#dc2626' });
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(249,115,22,.28)'; ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.arc(g.cx, g.cy, g.R * .85, 0, -tm, true); ctx.closePath(); ctx.fill(); });
      const P = [g.cx + Math.cos(rot) * g.R * .9, g.cy + Math.sin(rot) * g.R * .9], tx = Math.sin(rot), ty = -Math.cos(rot);
      Q41.line(ctx, [[g.cx, g.cy], P], '#b91c1c', 3);
      if (S.p.two) { const Q = [g.cx + Math.cos(rot) * g.R * .45, g.cy + Math.sin(rot) * g.R * .45]; Q57.arrow(ctx, Q[0], Q[1], tx * om * 4, ty * om * 4, '#2563eb', 'υQ', 2.4); if (Math.abs(al) > .01) Q57.arrow(ctx, Q[0], Q[1], tx * al * 6 * Math.sign(1), ty * al * 6, '#16a34a', '', 2.2); Q41.knob(ctx, Q[0], Q[1], '#2563eb', 7); }
      Q57.arrow(ctx, P[0], P[1], tx * om * 8, ty * om * 8, '#dc2626', 'υP', 2.8); if (Math.abs(al) > .01) Q57.arrow(ctx, P[0], P[1], tx * al * 12, ty * al * 12, '#16a34a', 'aT', 2.6); Q41.knob(ctx, P[0], P[1], '#facc15', 9);
      if (S.p.rhr) { const rx = g.x0 + 70, ry = g.h - 230; Q57.rhr(ctx, rx, ry, om > .01 ? 1 : 0, 'ω', '#dc2626', rot, 60); if (Math.abs(al) > .01) Q57.arrow(ctx, rx + 64, ry, 0, -Math.sign(al) * 44, '#16a34a', 'α', 3); Q42.T(ctx, 'قاعدة الكف اليمنى', rx, ry + 30, { s: 10.5, w: 900, c: '#334155' }); }
      const A = Q41.axes(ctx, { x: g.gx, y: g.gy, w: g.gw, h: g.gh, xmax: 4, ymax: 26, xs: .5, ys: 2, lxs: 1, lys: 10, xl: 't (s)', yl: 'ω (rad/s)' });
      if (S.hist.length > 1) Q41.line(ctx, S.hist.map(p => [A.X(p[0]), A.Y(p[1])]), '#7c3aed', 2.6); Q41.dot(ctx, A.X(S.tw), A.Y(om), '#7c3aed', 5);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q57.drawSteps(ctx, C.e);
      if (S.ex) Q57.steps(ctx, S, Object.assign({ title: 'مثال 3 ص 148' }, EX, { k: S.k }), { wd: 320 });
      else Q57.card(ctx, S, [{ t: 't = ' + Q57.f(S.tw, 2) + ' s', mono: 1 }, { t: 'ω = ωi + α t = ' + Q57.f(om, 2) + ' rad/s', mono: 1, c: '#7c3aed', w: 900 }, { t: 'θ = ωi t + ½ α t² = ' + Q57.f(q.th, 2) + ' rad', mono: 1, c: '#ea580c', w: 800 }, { t: 'θ = ' + Q57.f(q.th / TAU, 2) + ' rev', mono: 1 }, { t: 'ωf = ωi + αt ↔ υf = υi + at', mono: 1, s: 11 }, { t: 'θ = ωit + ½αt² ↔ x = υit + ½at²', mono: 1, s: 11 }, { t: 'ωf² = ωi² + 2αθ ↔ υf² = υi² + 2ax', mono: 1, s: 11 }], { title: 'التعجيل الزاوي α = ' + al + ' rad/s²' });
      Q57.banner(ctx, w, 'اسحب النقطة الصفراء لتدوير العجلة');
      if (SL < 1) Q42.T(ctx, 'عرض مبطأ ×½', g.cx, 76, { s: 10.5, w: 900, c: '#fff', bg: '#64748b' });
    },
    chips(S, g) { return { p: Q57.play(S, 'run', g.h - 128, S.run, S2 => { if (S2.tw >= S2.tEnd) D.reset(S2); else S2.run = !S2.run; }, S2 => { S2.tEnd = 4; S2.th0 = 0; D.reset(S2); }, { bw: 150 }),
      e: Q57.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 3 ص 148', S2 => { setParam(S2, 'wi', 2); setParam(S2, 'al', 3.5); S2.tEnd = 2; S2.th0 = 0; D.reset(S2); }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), th = D.st(S, S.tw).th + S.th0;
      return [{ id: 'P', x: g.cx + Math.cos(-th) * g.R * .9, y: g.cy + Math.sin(-th) * g.R * .9, r: 20, axis: 'xy', keep: true, tip: 'اسحب لتدوير العجلة', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; const a = -Math.atan2(d.y - g.cy, d.x - g.cx), cur = D.st(S2, S2.tw).th + S2.th0; let dd = a - (((cur % TAU) + TAU) % TAU); while (dd > Math.PI) dd -= TAU; while (dd < -Math.PI) dd += TAU; S2.th0 += dd; } }].concat(C.p, C.e); },
    readings(S) { const q = D.st(S, S.tw); return [rd('الزمن t', Q57.f(S.tw, 2) + ' s'), rd('السرعة الزاوية ω', Q57.f(q.om, 2) + ' rad/s'), rd('الإزاحة الزاوية θ', Q57.f(q.th, 2) + ' rad'), rd('عدد الدورات', Q57.f(q.th / TAU, 2) + ' rev'), rd('التعجيل الزاوي α', S.p.al + ' rad/s²')]; },
    record(S) { const q = D.st(S, S.tw); return { t: +S.tw.toFixed(2), w: +q.om.toFixed(2), th: +q.th.toFixed(2) }; },
    cols: [['t', 't (s)'], ['w', 'ω (rad/s)'], ['th', 'θ (rad)']],
    explain(S) { return Q26.ex('العجلة تدور أسرع فأسرع ومخطط ω مع الزمن خط مستقيم، والنقطتان P و Q تبقيان على نصف القطر نفسه.', 'التعجيل الزاوي ثابت فتتغير ω بمقدار α كل ثانية: ωf = ωi + αt. وبما أن العجلة جسم جاسئ فلكل نقاطها θ و ω و α نفسها، أما التعجيل المماسي aT = rα فيتناسب مع البعد عن المحور.', 'تشغيل المروحة الكهربائية وإيقافها، وعجلات السيارة عند الانطلاق والكبح، وأقراص الحاسوب.'); }
  };
  M8.P[D.id] = D;
})();

/* visual spin rate for very fast real ω (keeps animation smooth and readable) */
Q57.vis = w => Math.sign(w) * Math.min(Math.abs(w), 6 + Math.log1p(Math.max(0, Math.abs(w) - 6)) * 2);

/* =============== G1 — عزم القصور الذاتي وسباق التدحرج والطاقة الحركية الكلية (7-12، 7-13، الجدول 1، مثال 4 ص 151) =============== */
(() => {
  const SH = { hoop: ['حلقة', 1, 'MR²', '#0ea5e9'], cyl: ['أسطوانة صلدة', .5, '½MR²', '#7c3aed'], sph: ['كرة صلدة', .4, '⅖MR²', '#f97316'], shell: ['قشرة كروية', 2 / 3, '⅔MR²', '#16a34a'], box: ['صندوق ينزلق', 0, '0', '#a16207'] };
  const LS = 2, RO = 17;
  const EX = { q: 'كرة صلدة تتدحرج على سطح أفقي خشن بانطلاق 1.5 m/s ، نصف قطرها 0.1 m وكتلتها 0.2 kg. احسب طاقتها الحركية الكلية.', lines: ['I = ⅖ m r² = ⅖ × 0.2 × 0.1²', 'I = 0.0008 kg.m²', 'ω = υ / r = 1.5 / 0.1 = 15 rad/s', 'KE = ½ m υ² + ½ I ω²', 'KE = ½ × 0.2 × 1.5² + ½ × 0.0008 × 15²', 'KE = 0.225 + 0.09 = 0.315 J'] };
  const D = { id: 'g11_r_inertia', page: 149, fig: 'الشكل 16 + الجدول 1 + مثال 4',
    desc: 'عزم القصور الذاتي I مقياس لمقاومة الجسم الجاسئ للتغير في سرعته الزاوية، وهو للجسيم I = mr² وللجسم مجموع عزوم جسيماته، ووحدته kg.m². يعتمد على الكتلة والشكل ونمط توزيع الكتلة حول محور الدوران (الجدول 1). الجسم المتدحرج يمتلك حركة انتقالية ودورانية معاً فطاقته الحركية الكلية KE = ½mυ² + ½Iω². نسابق أجساماً مختلفة الأشكال على سطح مائل لنرى أثر توزيع الكتلة.',
    tags: 'عزم القصور الذاتي I=mr² kg.m² توزيع الكتلة الجدول 1 حلقة أسطوانة صلدة كرة صلدة قشرة كروية الحركة المركبة التدحرج الطاقة الحركية الدورانية ½Iω² مثال 4 0.315 J',
    tools: ['سطح مائل بمسارين', 'حلقة وأسطوانة صلدة وكرة صلدة وقشرة كروية', 'صندوق ينزلق بلا احتكاك للمقارنة'],
    steps: ['اختر جسماً للمسار العلوي وآخر للمسار السفلي ثم اضغط «ابدأ السباق».', 'الجسم ذو عزم القصور الأصغر نسبة إلى mR² يصل أولاً: الكرة الصلدة تسبق الحلقة.', 'غيّر الكتلة ونصف القطر: لا تتغير نتيجة السباق لأنها تعتمد على شكل الجسم فقط.', 'راقب أعمدة الطاقة: جزء من الطاقة يذهب إلى الدوران ½Iω².', 'حل مثال 4 خطوة خطوة.'],
    concl: ['I = Σ m r² ويعتمد على الكتلة والشكل وتوزيع الكتلة حول المحور.', 'الحلقة MR² ، الأسطوانة الصلدة ½MR² ، الكرة الصلدة ⅖MR² ، القشرة الكروية ⅔MR².', 'الجسم الذي تتوزع كتلته بعيداً عن المحور أبطأ في التدحرج لأن نسبة أكبر من طاقته تذهب إلى الدوران.', 'KE = ½mυ² + ½Iω². مثال 4: KE = 0.225 + 0.09 = 0.315 J.'],
    laws: ['g11_l7_inertia', 'g11_l7_ke'],
    controls: [R('be', 'زاوية ميل السطح β', 10, 35, 20, 1, '°'), R('M', 'الكتلة M', .1, 2, .2, .1, 'kg'), R('Rr', 'نصف القطر R', .05, .3, .1, .01, 'm'), TG('tab', 'الجدول 1', true, null, 'table')],
    setup(S) { S.A = 'sph'; S.B = 'hoop'; S.tr = 0; S.run = 0; S.bed = 20; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, x1 = w - 350; return { w, h, L, x0, x1, Lx: x1 - x0, ybA: 380, ybB: 470 }; },
    acc(S, k) { return Q57.G * Math.sin(S.bed * Math.PI / 180) / (1 + k); },
    pos(S, k) { return Math.min(LS, .5 * D.acc(S, k) * S.tr * S.tr); },
    update(S, dt) { if (!S.W) return; S.bed = Q57.ez(S.bed, S.p.be, dt, 8); if (!S.run) return; S.tr += dt; if (D.pos(S, SH[S.A][1]) >= LS && D.pos(S, SH[S.B][1]) >= LS) S.run = 0; },
    body(ctx, key, x, y, ang, be) { const c = SH[key][3];
      if (key === 'box') { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(be); const gg = ctx.createLinearGradient(0, -RO, 0, RO); gg.addColorStop(0, '#d6a35c'); gg.addColorStop(1, '#8a5a1f'); ctx.fillStyle = gg; rr(ctx, -RO, -RO, 2 * RO, 2 * RO, 3); ctx.fill(); ctx.strokeStyle = '#5b3a12'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore(); }); return; }
      if (key === 'hoop') { K.raw(ctx, () => { ctx.strokeStyle = c; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x, y, RO - 3, 0, TAU); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, RO - 4, 3.6, 4.6); ctx.stroke(); }); }
      else if (key === 'cyl') Q57.drum(ctx, x, y, RO, ang, c);
      else K.raw(ctx, () => { const gg = ctx.createRadialGradient(x - 6, y - 6, 2, x, y, RO); gg.addColorStop(0, key === 'shell' ? '#dcfce7' : '#fed7aa'); gg.addColorStop(1, c); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(x, y, RO, 0, TAU); ctx.fill(); if (key === 'shell') { ctx.strokeStyle = shade(c, -40); ctx.lineWidth = 2.5; ctx.stroke(); } });
      K.raw(ctx, () => { ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ang) * (RO - 4), y + Math.sin(ang) * (RO - 4)); ctx.stroke(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), be = S.bed * Math.PI / 180, Hh = g.Lx * Math.tan(be), Lsl = g.Lx / Math.cos(be), u = [Math.cos(be), Math.sin(be)], n = [Math.sin(be), -Math.cos(be)], M = S.p.M, Rr = S.p.Rr;
      Q57.bg(ctx, w, h);
      const lanes = [[S.A, g.ybA, 'A'], [S.B, g.ybB, 'B']], res = [];
      lanes.forEach(([key, yb, nm]) => { const top = [g.x0, yb - Hh];
        K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, top[1], 0, yb); gg.addColorStop(0, '#e7e5e4'); gg.addColorStop(1, '#a8a29e'); ctx.fillStyle = gg; ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.lineTo(g.x1, yb); ctx.lineTo(top[0], yb); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#57534e'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.lineTo(g.x1, yb); ctx.stroke(); ctx.fillStyle = '#44403c'; ctx.fillRect(g.x1 - 4, yb - 26, 4, 26); });
        const k = SH[key][1], s = D.pos(S, k), sp = s / LS * Lsl, x = top[0] + u[0] * sp + n[0] * RO, y = top[1] + u[1] * sp + n[1] * RO, ang = key === 'box' ? 0 : sp / RO;
        D.body(ctx, key, x, y, ang, be); Q42.T(ctx, 'المسار ' + (nm === 'A' ? 'العلوي' : 'السفلي') + ': ' + SH[key][0], nm === 'A' ? g.x1 - 90 : g.x0 + 90, yb + 14, { s: 10.5, w: 900, c: '#fff', bg: SH[key][3] });
        const v = Math.sqrt(2 * D.acc(S, k) * s), E = M * Q57.G * s * Math.sin(be); res.push({ key, k, s, v, E, t: Math.sqrt(2 * LS / D.acc(S, k)) }); });
      if (S.tr > 0) { const done = res.filter(r => r.s >= LS); if (done.length) { const win = res[0].t <= res[1].t ? res[0] : res[1]; if (Math.abs(res[0].t - res[1].t) < 1e-6) Q42.T(ctx, 'وصلا معاً', (g.x0 + g.x1) / 2, 86, { s: 12, w: 900, c: '#fff', bg: '#334155' }); else Q42.T(ctx, 'الفائز: ' + SH[win.key][0], (g.x0 + g.x1) / 2, 86, { s: 12, w: 900, c: '#fff', bg: '#15803d' }); } }
      Q42.T(ctx, 'β = ' + Q57.f(S.bed, 0) + '°', g.x1 - 60, g.ybB - 12, { s: 11, w: 900, c: '#334155' });
      // energy bars
      const bx = w - 320, by = 480; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, bx - 10, by - 30, 318, 116, 10); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.stroke(); });
      Q42.T(ctx, 'توزيع الطاقة الحركية', bx + 150, by - 14, { s: 11, w: 900, c: '#7c3aed' });
      res.forEach((r, i) => { const y = by + 6 + i * 42, tot = M * Q57.G * LS * Math.sin(be), f = tot ? r.E / tot : 0, ft = f / (1 + r.k), fr = f * r.k / (1 + r.k), W = 290;
        K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, bx, y, W, 14, 5); ctx.fill(); ctx.fillStyle = '#3b82f6'; ctx.fillRect(bx, y, W * ft, 14); ctx.fillStyle = '#f97316'; ctx.fillRect(bx + W * ft, y, W * fr, 14); });
        Q42.T(ctx, SH[r.key][0] + ': انتقالية ' + Q57.f(100 / (1 + r.k), 0) + '%', bx + 150, y + 26, { s: 10, w: 800, c: '#334155' }); });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.b); Q42.drawChips(ctx, C.p); Q57.drawSteps(ctx, C.e);
      if (S.ex) Q57.steps(ctx, S, Object.assign({ title: 'مثال 4 ص 151' }, EX, { k: S.k }), { wd: 320 });
      else if (S.p.tab) Q57.card(ctx, S, [{ t: 'حلقة أو قشرة أسطوانية', s: 10.5, c: '#334155' }, { t: 'I = MR²', mono: 1, s: 10.5, c: '#7c3aed', w: 800 }, { t: 'أسطوانة مجوفة', s: 10.5, c: '#334155' }, { t: 'I = ½M(R1² + R2²)', mono: 1, s: 10.5, c: '#7c3aed', w: 800 }, { t: 'أسطوانة أو قرص صلد', s: 10.5, c: '#334155' }, { t: 'I = ½MR²', mono: 1, s: 10.5, c: '#7c3aed', w: 800 }, { t: 'صفيحة مستطيلة', s: 10.5, c: '#334155' }, { t: 'I = M(a² + b²) / 12', mono: 1, s: 10.5, c: '#7c3aed', w: 800 }, { t: 'قضيب والمحور في منتصفه', s: 10.5, c: '#334155' }, { t: 'I = ML² / 12', mono: 1, s: 10.5, c: '#7c3aed', w: 800 }, { t: 'قضيب والمحور في طرفه', s: 10.5, c: '#334155' }, { t: 'I = ML² / 3', mono: 1, s: 10.5, c: '#7c3aed', w: 800 }, { t: 'كرة صلدة', s: 10.5, c: '#334155', w: 900 }, { t: 'I = ⅖MR²', mono: 1, s: 10.5, c: '#ea580c', w: 800 }, { t: 'قشرة كروية رقيقة', s: 10.5, c: '#334155' }, { t: 'I = ⅔MR²', mono: 1, s: 10.5, c: '#7c3aed', w: 800 }], { title: 'الجدول 1: عزم القصور الذاتي', y: 64, wd: 300 });
      Q57.banner(ctx, w, 'اسحب قمة السطح لتغيير زاوية الميل');
    },
    chips(S, g) { const ks = Object.keys(SH); return { a: Q42.chips(S, 'A', ks.map(k => [k, SH[k][0]]), g.h - 172, S.A, (S2, k) => { S2.A = k; S2.tr = 0; S2.run = 0; }, { bw: 136, col: '#ea580c' }),
      b: Q42.chips(S, 'B', ks.map(k => [k, SH[k][0]]), g.h - 128, S.B, (S2, k) => { S2.B = k; S2.tr = 0; S2.run = 0; }, { bw: 136, col: '#0ea5e9' }),
      p: Q57.play(S, 'run', g.h - 84, S.run, S2 => { if (!S2.run && S2.tr > 0 && D.pos(S2, SH[S2.A][1]) >= LS && D.pos(S2, SH[S2.B][1]) >= LS) S2.tr = 0; S2.run = !S2.run; }, S2 => { S2.tr = 0; S2.run = 0; }, { go: '▶ ابدأ السباق', bw: 140, x0: g.L + 340 }),
      e: Q57.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 4 ص 151', S2 => { setParam(S2, 'M', .2); setParam(S2, 'Rr', .1); S2.A = 'sph'; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), Hh = g.Lx * Math.tan(S.bed * Math.PI / 180);
      return [{ id: 'top', x: g.x0, y: g.ybA - Hh, r: 20, axis: 'y', keep: true, tip: 'اسحب قمة السطح', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'be', clamp(Math.round(Math.atan((g.ybA - d.y) / g.Lx) * 180 / Math.PI), 10, 35)); } }].concat(C.a, C.b, C.p, C.e); },
    readings(S) { const M = S.p.M, R2 = S.p.Rr ** 2; return [rd('المسار العلوي', SH[S.A][0] + ' I = ' + SH[S.A][2]), rd('I للمسار العلوي', Q57.f(SH[S.A][1] * M * R2, 5) + ' kg.m²'), rd('المسار السفلي', SH[S.B][0] + ' I = ' + SH[S.B][2]), rd('تعجيل العلوي', Q57.f(D.acc(S, SH[S.A][1]), 2) + ' m/s²'), rd('تعجيل السفلي', Q57.f(D.acc(S, SH[S.B][1]), 2) + ' m/s²')]; },
    explain(S) { return Q26.ex('الكرة الصلدة تسبق الأسطوانة، والأسطوانة تسبق الحلقة، والصندوق المنزلق بلا احتكاك يسبق الجميع، مهما تغيرت الكتلة أو نصف القطر.', 'الطاقة الكامنة mgh تتوزع بين الحركة الانتقالية ½mυ² والدورانية ½Iω². كلما كانت الكتلة أبعد عن المحور كبر I نسبة إلى mR² فذهبت طاقة أكثر إلى الدوران وقل الانطلاق.', 'الحذافة الثقيلة في المحركات تحافظ على انتظام الدوران، والمتزلج يضم جسمه ليقلل عزم قصوره.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G2 — العزم المدور والتعجيل الزاوي والشغل والقدرة الدورانية (7-14، 7-15، الشكلان 17 و 18، مثال 5 ص 152 ، مثال 6 ص 154) =============== */
(() => {
  const TE = 5;
  const EXS = { e5: ['مثال 5 ص 152', 'أسطوانة صلدة كتلتها 1 kg ونصف قطرها 0.2 m تبدأ الدوران من السكون حول محورها الطولي بتأثير قوة مماسية 10 N بوساطة حبل ملفوف عليها. احسب: 1 سرعتها الزاوية بعد 5 s. 2 عدد دوراتها.', ['τ = r F = 0.2 × 10 = 2 N.m', 'I = ½ m r² = ½ × 1 × 0.2² = 0.02 kg.m²', 'α = τ / I = 2 / 0.02 = 100 rad/s²', 'ωf = ωi + α t = 0 + 100 × 5 = 500 rad/s', 'θ = (ωi + ωf) t / 2 = 250 × 5 = 1250 rad', 'عدد الدورات = 1250 / 2π ≈ 199 rev']],
    e6: ['مثال 6 ص 154', 'محرك كهربائي قدرته 1.72×10⁵ W ، ومعدل سرعته الزاوية 500 rev/min. احسب العزم المدور الذي يولده.', ['ω = 500 × 2π / 60', 'ω = 50π / 3 rad/s', 'P = τ ω ⟸ τ = P / ω', 'τ = 1.72×10⁵ × 3 / 50π', 'τ = 3286 N.m']] };
  const D = { id: 'g11_r_torque', page: 151, fig: 'الأشكال 17 و 18 + مثال 5 + مثال 6',
    desc: 'محصلة العزوم المؤثرة في جسم جاسئ تكسبه تعجيلاً زاوياً يتناسب طردياً معها وعكسياً مع عزم قصوره الذاتي: Στ = Iα ، والعزم والتعجيل الزاوي متجهان على محور الدوران (قاعدة الكف اليمنى). قوة مماسية F بحبل ملفوف على قرص نصف قطره r تدوره بزاوية θ فتقطع نقطة تأثيرها قوساً S = rθ ، فالشغل W = F S = τθ ويساوي التغير في الطاقة الحركية الدورانية ½I(ωf² − ωi²) ، والقدرة P = τ ω_avg.',
    tags: 'العزم المدور τ=rF Στ=Iα التعجيل الزاوي الشغل الدوراني W=τθ الطاقة الحركية الدورانية القدرة P=τω أسطوانة صلدة حبل مثال 5 500 rad/s 199 rev مثال 6 3286 N.m',
    tools: ['أسطوانة صلدة على محور أفقي', 'حبل ملفوف عليها', 'يد تسحب بقوة مماسية F', 'مؤقت'],
    steps: ['اسحب اليد للأسفل لضبط القوة المماسية F ، أو استعمل اللوحة.', 'اضغط «شغّل»: تبدأ الأسطوانة من السكون ويزداد ω بانتظام.', 'ضاعف الكتلة أو نصف القطر: يكبر I فيقل α.', 'قارن الشغل τθ بالطاقة الحركية الدورانية ½Iω²: متساويان.', 'حل مثال 5 ومثال 6 خطوة خطوة.'],
    concl: ['τ = r F ، Στ = I α: التعجيل الزاوي يتناسب طردياً مع العزم وعكسياً مع I.', 'W = τ θ = ½ I (ωf² − ωi²) ، بوحدة الجول.', 'P = W / t = τ ω_avg ، بوحدة الواط.', 'مثال 5: α = 100 rad/s² ، ω = 500 rad/s ، θ ≈ 199 rev. مثال 6: τ = 3286 N.m.'],
    laws: ['g11_l7_tau', 'g11_l7_work'],
    controls: [R('F', 'القوة المماسية F', 0, 20, 10, 1, 'N'), R('M', 'كتلة الأسطوانة M', .5, 5, 1, .5, 'kg'), R('Rr', 'نصف القطر r', .1, .4, .2, .05, 'm'), TG('rhr', 'قاعدة الكف اليمنى', true, null, 'hand')],
    setup(S) { S.tq = 0; S.run = 0; S.rv = 0; S.Fd = 10; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 340; return { w, h, L, x0, x1, cx: (x0 + x1) / 2 - 30, cy: 230 }; },
    st(S) { const I = .5 * S.p.M * S.p.Rr ** 2, tau = S.p.Rr * S.p.F, al = tau / I, t = S.tq, om = al * t, th = .5 * al * t * t; return { I, tau, al, t, om, th, W: tau * th, KE: .5 * I * om * om, P: tau * om / 2 }; },
    update(S, dt) { if (!S.W) return; S.Fd = Q57.ez(S.Fd, S.p.F, dt, 10); if (S.run) { S.tq = Math.min(TE, S.tq + dt); if (S.tq >= TE) S.run = 0; } S.rv += Q57.vis(D.st(S).om) * dt; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), q = D.st(S), Rp = 60 + S.p.Rr * 220, rx = g.cx + Rp, hy = g.cy + 190 + S.Fd * 3;
      Q57.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.cx - 7, g.cy, 14, 228); rr(ctx, g.cx - 70, g.cy + 226, 140, 14, 5); ctx.fill(); });
      Q57.drum(ctx, g.cx, g.cy, Rp, S.rv, '#7c3aed');
      K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(rx, g.cy); ctx.lineTo(rx, hy - 12); ctx.stroke(); ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 8]); ctx.lineDashOffset = -((q.th * S.p.Rr * 60) % 12); ctx.beginPath(); ctx.moveTo(rx, g.cy); ctx.lineTo(rx, hy - 12); ctx.stroke(); ctx.setLineDash([]); ctx.lineDashOffset = 0;
        const gg = ctx.createRadialGradient(rx - 4, hy - 4, 2, rx, hy, 16); gg.addColorStop(0, '#fde2c4'); gg.addColorStop(1, '#d4a373'); ctx.fillStyle = gg; ctx.beginPath(); ctx.ellipse(rx, hy, 14, 18, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.2; ctx.stroke(); });
      if (S.Fd > .2) Q57.arrow(ctx, rx + 26, g.cy + 10, 0, clamp(S.Fd * 6, 18, 120), '#dc2626', 'F', 3.2);
      Q57.dash(ctx, [[g.cx, g.cy], [rx, g.cy]], '#facc15', 1.6); Q42.T(ctx, 'r', g.cx + Rp / 2, g.cy - 12, { s: 13, w: 900, c: '#a16207' });
      if (S.p.rhr) { const x = g.x1 - 110, y = g.h - 240; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, x - 50, y - 90, 150, 130, 10); ctx.fill(); });
        Q42.T(ctx, 'τ و α نحو داخل الصفحة', x + 25, y + 26, { s: 10, w: 900, c: '#334155' }); K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x + 25, y - 30, 22, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 10, y - 45); ctx.lineTo(x + 40, y - 15); ctx.moveTo(x + 40, y - 45); ctx.lineTo(x + 10, y - 15); ctx.stroke(); }); Q42.T(ctx, 'دوران مع عقارب الساعة', x + 25, y - 72, { s: 10, w: 900, c: '#7c3aed' }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.e);
      if (S.ex) { const E = EXS[S.ex]; Q57.steps(ctx, S, { title: E[0], q: E[1], lines: E[2], k: S.k }, { wd: 320 }); }
      else Q57.card(ctx, S, [{ t: 'τ = r F = ' + Q57.f(q.tau, 2) + ' N.m', mono: 1, c: '#dc2626', w: 800 }, { t: 'I = ½ M r² = ' + Q57.f(q.I, 4) + ' kg.m²', mono: 1 }, { t: 'α = τ / I = ' + Q57.f(q.al, 1) + ' rad/s²', mono: 1, c: '#7c3aed', w: 900 }, { t: 't = ' + Q57.f(q.t, 2) + ' s , ω = α t = ' + Q57.f(q.om, 1) + ' rad/s', mono: 1 }, { t: 'θ = ½ α t² = ' + Q57.f(q.th, 1) + ' rad = ' + Q57.f(q.th / TAU, 1) + ' rev', mono: 1 }, { t: 'W = τ θ = ' + Q57.f(q.W, 1) + ' J', mono: 1, c: '#15803d', w: 900 }, { t: 'KE = ½ I ω² = ' + Q57.f(q.KE, 1) + ' J', mono: 1, c: '#15803d', w: 900 }, { t: 'P = τ ω avg = ' + Q57.f(q.P, 1) + ' W', mono: 1 }], { title: 'Στ = I α' });
      Q57.banner(ctx, w, 'اسحب اليد للأسفل لزيادة القوة F');
    },
    chips(S, g) { return { p: Q57.play(S, 'run', g.h - 128, S.run, S2 => { if (S2.tq >= TE) S2.tq = 0; S2.run = !S2.run; }, S2 => { S2.tq = 0; S2.run = 0; }, { bw: 150 }),
      e: Q57.exChips(S, 'ex', g.h - 84, g.L, [['e5', EXS.e5[0]], ['e6', EXS.e6[0]]], (S2, k) => { if (k === 'e5') { setParam(S2, 'F', 10); setParam(S2, 'M', 1); setParam(S2, 'Rr', .2); S2.tq = 0; S2.run = 1; } }, k => EXS[k][2].length, 160) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), Rp = 60 + S.p.Rr * 220;
      return [{ id: 'hand', x: g.cx + Rp, y: g.cy + 190 + S.Fd * 3, r: 22, axis: 'y', keep: true, tip: 'اسحب اليد', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'F', clamp(Math.round((d.y - g.cy - 190) / 3), 0, 20)) }].concat(C.p, C.e); },
    readings(S) { const q = D.st(S); return [rd('العزم τ', Q57.f(q.tau, 2) + ' N.m'), rd('عزم القصور I', Q57.f(q.I, 4) + ' kg.m²'), rd('التعجيل الزاوي α', Q57.f(q.al, 1) + ' rad/s²'), rd('السرعة الزاوية ω', Q57.f(q.om, 1) + ' rad/s'), rd('الشغل W', Q57.f(q.W, 1) + ' J')]; },
    record(S) { const q = D.st(S); return { F: S.p.F, I: +q.I.toFixed(4), al: +q.al.toFixed(1) }; },
    cols: [['F', 'F (N)'], ['I', 'I (kg.m²)'], ['al', 'α (rad/s²)']],
    explain(S) { return Q26.ex('كلما زادت القوة زادت سرعة تزايد دوران الأسطوانة، وكلما كبرت كتلتها أو نصف قطرها صعب تدويرها.', 'العزم τ = rF هو مسبب الدوران، و Στ = Iα يناظر F = ma: عزم القصور يقوم مقام الكتلة. والشغل τθ يتحول كله إلى طاقة حركية دورانية ½Iω².', 'فتح الباب من مقبضه البعيد عن المفصلات، ومفتاح الصامولة الطويل، ومحركات السيارات تقاس بعزمها وقدرتها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== H — الزخم الزاوي وحفظه: المتزلجة على الجليد (7-16، 7-17، الشكلان 19 و 20، ص 154–155) =============== */
(() => {
  const Ib = 1.5, Ia = 2.3;
  const D = { id: 'g11_r_skater', page: 154, fig: 'الشكلان 19 و 20',
    desc: 'الزخم الزاوي L = r × p = mr²ω = Iω كمية متجهة وحدتها kg.m²/s ، واتجاهه باتجاه ω (قاعدة الكف اليمنى). قانون حفظ الزخم الزاوي: إذا كانت محصلة العزوم الخارجية المؤثرة في جسم صفراً بقي زخمه الزاوي ثابتاً I1ω1 = I2ω2. المتزلجة التي تضم ذراعيها تقلل عزم قصورها الذاتي فتزداد سرعتها الزاوية، وكذلك راقصة الباليه والغطاس ولاعب السيرك.',
    tags: 'الزخم الزاوي L=Iω kg.m²/s قانون حفظ الزخم الزاوي I1ω1=I2ω2 المتزلجة ضم الذراعين عزم القصور الذاتي راقصة الباليه الغطاس',
    tools: ['متزلجة تدور على الجليد', 'ثقلان في اليدين (اختياري)', 'مقياس للسرعة الزاوية'],
    steps: ['اضغط «شغّل» لتدور المتزلجة وذراعاها مفرودتان.', 'اسحب يدها نحو جسمها (أو اضغط «اضمم الذراعين»): يقل I فتزداد ω.', 'افرد الذراعين من جديد: تتباطأ، ويبقى L = Iω ثابتاً.', 'أضف الثقلين في اليدين: يصير الفرق أكبر.', 'فعّل عزم الاحتكاك الخارجي: يتناقص L ولا يبقى محفوظاً.'],
    concl: ['L = I ω ، ووحدته kg.m²/s ، واتجاهه باتجاه ω.', 'إذا كانت محصلة العزوم الخارجية صفراً: I1 ω1 = I2 ω2.', 'ضم الذراعين يقلل I فتزداد ω ، وفردهما يزيد I فتقل ω.', 'الطاقة الحركية الدورانية تزداد عند ضم الذراعين لأن عضلات المتزلجة تبذل شغلاً.'],
    laws: ['g11_l7_L'],
    controls: [R('w0', 'السرعة الزاوية والذراعان مفرودتان', .2, 1, .4, .05, 'rev/s'), TG('db', 'ثقلان في اليدين', false, null, 'weight'), TG('fr', 'عزم احتكاك خارجي', false, null, 'fire')],
    setup(S) { S.arm = 1; S.armd = 1; S.ph = 0; S.run = 1; S.Lf = 1; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 340; return { w, h, L, x0, x1, cx: (x0 + x1) / 2, yg: 470, H: 220 }; },
    I(S, a) { const r = .15 + .75 * a; return Ib + Ia * a * a + (S.p.db ? 2 * 2 * r * r : 0); },
    L0(S) { return D.I(S, 1) * S.p.w0 * S.Lf; },
    update(S, dt) { if (!S.W) return; S.armd = Q57.ez(S.armd, S.arm, dt, 4); if (S.p.fr && S.run) S.Lf = Math.max(.05, S.Lf * (1 - .12 * dt)); const om = D.L0(S) / D.I(S, S.armd); if (S.run) S.ph += om * TAU * dt; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), I = D.I(S, S.armd), L = D.L0(S), om = L / I, KE = .5 * I * (om * TAU) ** 2, sq = Math.cos(S.ph);
      Q57.bg(ctx, w, h);
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.yg - 30, 0, g.yg + 60); gg.addColorStop(0, '#e0f2fe'); gg.addColorStop(1, '#7dd3fc'); ctx.fillStyle = gg; ctx.beginPath(); ctx.ellipse(g.cx, g.yg + 10, 220, 40, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(g.cx, g.yg + 10, 60 + 30 * Math.abs(Math.sin(S.ph)), 10, 0, 0, TAU); ctx.stroke(); });
      Q57.person(ctx, g.cx, g.yg, g.H, { arm: S.armd, sq, col: '#db2777', pants: '#831843', dumb: S.p.db });
      Q57.arrow(ctx, g.cx, g.yg - g.H - 10, 0, -clamp(L * 18, 10, 70), '#7c3aed', 'L', 3.4);
      K.raw(ctx, () => { ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(g.cx, g.yg - g.H - 30, 26, 7, 0, .4, Math.PI * 2 - .4); ctx.stroke(); });
      // top view
      const tx = g.x0 + 80, ty = 150; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(ctx, tx - 70, ty - 70, 140, 150, 12); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.stroke(); ctx.fillStyle = '#db2777'; ctx.beginPath(); ctx.ellipse(tx, ty, 18, 12, S.ph, 0, TAU); ctx.fill(); const r = 18 + 40 * S.armd; ctx.strokeStyle = '#f2c8a0'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(tx - Math.cos(S.ph) * r, ty - Math.sin(S.ph) * r); ctx.lineTo(tx + Math.cos(S.ph) * r, ty + Math.sin(S.ph) * r); ctx.stroke(); });
      Q42.T(ctx, 'منظر علوي', tx, ty + 64, { s: 10.5, w: 900, c: '#334155' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.p);
      Q57.card(ctx, S, [{ t: 'L = I ω', mono: 1, c: '#7c3aed', w: 900 }, { t: 'I = ' + Q57.f(I, 2) + ' kg.m²', mono: 1 }, { t: 'ω = ' + Q57.f(om, 2) + ' rev/s', mono: 1, c: '#db2777', w: 900 }, { t: 'L = ' + Q57.f(I, 2) + ' × ' + Q57.f(om * TAU, 2) + ' = ' + Q57.f(L * TAU, 2) + ' kg.m²/s', mono: 1 }, { t: 'KE = ½ I ω² = ' + Q57.f(KE, 1) + ' J', mono: 1 }, { t: S.p.fr ? 'عزم خارجي: L يتناقص' : 'لا عزم خارجي: L ثابت', c: S.p.fr ? '#dc2626' : '#15803d', w: 900 }, { t: 'I1 ω1 = I2 ω2', mono: 1, c: '#7c3aed', w: 800 }], { title: 'حفظ الزخم الزاوي' });
      Q57.banner(ctx, w, 'اسحب يد المتزلجة نحو جسمها أو بعيداً عنه');
    },
    chips(S, g) { return { a: Q42.chips(S, 'arm', [['out', 'افرد الذراعين'], ['in', 'اضمم الذراعين']], g.h - 128, S.arm > .5 ? 'out' : 'in', (S2, k) => { S2.arm = k === 'out' ? 1 : 0; }, { bw: 180, col: '#db2777' }),
      p: Q57.play(S, 'run', g.h - 84, S.run, S2 => { S2.run = !S2.run; }, S2 => { S2.ph = 0; S2.Lf = 1; S2.arm = 1; S2.run = 1; }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), k = g.H / 90, a = S.armd, sx = g.cx + 15 * k, sy = g.yg - 66 * k, Lr = 34 * k;
      return [{ id: 'hand', x: sx + Math.sin(Math.PI / 2 * a) * Lr, y: sy + Math.cos(Math.PI / 2 * a) * Lr, r: 22, axis: 'xy', keep: true, tip: 'اسحب اليد', idle: 'اسحب ✋', drag: (S2, d) => { S2.arm = clamp(Math.atan2(d.x - sx, Math.max(1, d.y - sy)) / (Math.PI / 2), 0, 1); } }].concat(C.a, C.p); },
    readings(S) { const I = D.I(S, S.arm), om = D.L0(S) / I; return [rd('عزم القصور I', Q57.f(I, 2) + ' kg.m²'), rd('السرعة الزاوية ω', Q57.f(om, 2) + ' rev/s'), rd('الزخم الزاوي L', Q57.f(D.L0(S) * TAU, 2) + ' kg.m²/s')]; },
    record(S) { const I = D.I(S, S.arm); return { I: +I.toFixed(2), w: +(D.L0(S) / I).toFixed(2), L: +(D.L0(S) * TAU).toFixed(2) }; },
    cols: [['I', 'I (kg.m²)'], ['w', 'ω (rev/s)'], ['L', 'L (kg.m²/s)']],
    explain(S) { return Q26.ex('عندما تضم المتزلجة ذراعيها تدور أسرع بكثير، وعندما تفردهما تتباطأ، وسهم الزخم الزاوي لا يتغير.', 'لا يؤثر عزم خارجي فيبقى L = Iω ثابتاً. ضم الذراعين يقرب الكتلة من المحور فيقل I وتزداد ω بالنسبة نفسها.', 'الغطاس يضم جسمه ليدور عدة دورات في الهواء ثم يفرده قبل دخول الماء، وراقصة الباليه، ولاعب السيرك على الأرجوحة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== I — مسائل القسم الثاني من أسئلة الفصل (ص 157) =============== */
(() => {
  const PB = { s1: ['مسألة 1', 'سيارة تبدأ الحركة من السكون، قطر عجلتها 80 cm ، ويصل انطلاقها إلى 20 m/s خلال 25 s. احسب التعجيل الزاوي للعجلة وإزاحتها الزاوية.', ['r = 80 / 2 = 40 cm = 0.4 m', 'a = (20 − 0) / 25 = 0.8 m/s²', 'α = a / r = 0.8 / 0.4 = 2 rad/s²', 'θ = ½ α t² = ½ × 2 × 25²', 'θ = 625 rad ≈ 99.5 rev'], { R: .4, wi: 0, al: 2, T: 25 }],
    s2: ['مسألة 2', 'عجلة تدور بسرعة زاوية منتظمة، أثر فيها عزم معاكس فأوقفها بعد 50 دورة خلال 10 s. احسب سرعتها الزاوية الابتدائية وتعجيلها الزاوي.', ['θ = 50 × 2π = 100π rad', 'θ = (ωi + 0) t / 2', 'ωi = 2θ / t = 200π / 10 = 20π ≈ 62.8 rad/s', 'α = (0 − ωi) / t = −20π / 10', 'α = −2π ≈ −6.28 rad/s²'], { R: .35, wi: 20 * Math.PI, al: -2 * Math.PI, T: 10 }],
    s3: ['مسألة 3', 'قرص نصف قطره 0.6 m وكتلته 80 kg يدور بسرعة 3600 rev/min ، أوقف بانتظام خلال 20 s. ما العزم المعاكس؟', ['I = ½ m r² = ½ × 80 × 0.36 = 14.4 kg.m²', 'ωi = 3600 × 2π / 60 = 120π rad/s', 'α = 120π / 20 = 6π rad/s²', 'τ = I α = 14.4 × 6π', 'τ = 86.4π ≈ 271 N.m'], { R: .6, wi: 120 * Math.PI, al: -6 * Math.PI, T: 20, disc: 1 }],
    s4: ['مسألة 4', 'عجلة قطرها 0.72 m وعزم قصورها الذاتي 4.8 kg.m² ، أثرت قوة مماسية 10 N في حافتها فبدأت من السكون. احسب التعجيل الزاوي ومعدل القدرة خلال 4 s.', ['τ = r F = 0.36 × 10 = 3.6 N.m', 'α = τ / I = 3.6 / 4.8 = 0.75 rad/s²', 'ωf = α t = 0.75 × 4 = 3 rad/s', 'ω avg = (0 + 3) / 2 = 1.5 rad/s', 'P = τ ω avg = 3.6 × 1.5 = 5.4 W'], { R: .36, wi: 0, al: .75, T: 4 }],
    s5: ['مسألة 5', 'قرص عزم قصوره الذاتي 1 kg.m² أوقفه عزم معاكس بانتظام خلال 4 s ، والشغل المبذول 200 J. احسب العزم المعاكس.', ['W = ½ I ωi² ⟸ 200 = ½ × 1 × ωi²', 'ωi = 20 rad/s', 'α = 20 / 4 = 5 rad/s²', 'τ = I α = 1 × 5 = 5 N.m'], { R: .4, wi: 20, al: -5, T: 4, disc: 1 }],
    s6: ['مسألة 6', 'كرة صلدة كتلتها 0.5 kg ونصف قطرها 0.2 m تتدحرج من السكون على سطح مائل ارتفاعه 7 m. احسب طاقتها الحركية الكلية وانطلاقها عند أسفل السطح.', ['الطاقة الكلية = m g h = 0.5 × 9.8 × 7 = 34.3 J', 'm g h = ½ m υ² + ½ (⅖ m r²)(υ / r)²', 'm g h = 0.7 m υ²', 'υ = √(10 g h / 7) = √98 = 9.9 m/s', 'ω = υ / r = 9.9 / 0.2 = 49.5 rad/s'], { R: .2, roll: 1, T: 0 }] };
  const BE = 30 * Math.PI / 180, LSL = 14; // 7 m high, 30° → 14 m long
  const D = { id: 'g11_r_prob2', page: 157, fig: 'مسائل الفصل ص 157',
    desc: 'نحل مسائل الحركة الدورانية في نهاية الفصل: عجلة السيارة (مسألة 1)، عجلة يوقفها عزم معاكس (مسألة 2)، قرص سريع يوقف خلال 20 s (مسألة 3)، القدرة الدورانية (مسألة 4)، الشغل والعزم (مسألة 5)، وكرة صلدة تتدحرج على سطح مائل (مسألة 6). كل مسألة تُعرض حركتها بالزمن الحقيقي بتسريع أو إبطاء.',
    tags: 'مسائل الحركة الدورانية التعجيل الزاوي عدد الدورات العزم المعاكس القدرة الدورانية الشغل الدوراني تدحرج كرة على سطح مائل',
    tools: ['عجلة', 'قرص', 'كرة صلدة وسطح مائل'],
    steps: ['اختر المسألة من الأزرار السفلى.', 'اضغط «شغّل» لترى الحركة مع قراءات الزمن و ω و θ.', 'اضغط «الخطوة التالية» لعرض الحل خطوة خطوة.', 'غيّر سرعة العرض من اللوحة.'],
    concl: ['مسألة 1: α = 2 rad/s² ، θ = 625 rad.', 'مسألة 2: ωi = 20π rad/s ، α = −2π rad/s².', 'مسألة 3: τ ≈ 271 N.m. مسألة 4: α = 0.75 rad/s² ، P = 5.4 W.', 'مسألة 5: τ = 5 N.m. مسألة 6: KE = 34.3 J ، υ = 9.9 m/s.'],
    laws: ['g11_l7_kin', 'g11_l7_tau', 'g11_l7_work', 'g11_l7_ke'],
    controls: [R('spd', 'سرعة العرض', .2, 3, 1, .1, '×'), TG('arr', 'متجه السرعة الزاوية', true, null, 'arrow')],
    setup(S) { S.sc = 's1'; S.ex = 0; S.k = 0; S.tp = 0; S.run = 0; S.rv = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 340; return { w, h, L, x0, x1, cx: (x0 + x1) / 2, cy: 280 }; },
    cur(S) { return S.ex || S.sc; },
    dur(S) { const d = PB[D.cur(S)][3]; return d.roll ? Math.sqrt(2 * LSL / (Q57.G * Math.sin(BE) / 1.4)) : d.T; },
    st(S) { const d = PB[D.cur(S)][3], t = S.tp; if (d.roll) { const a = Q57.G * Math.sin(BE) / 1.4, s = .5 * a * t * t, v = a * t; return { t, s, v, om: v / d.R, th: s / d.R }; } return { t, om: d.wi + d.al * t, th: d.wi * t + .5 * d.al * t * t }; },
    update(S, dt) { if (!S.W) return; const T = D.dur(S); if (S.run) { S.tp = Math.min(T, S.tp + dt * S.p.spd * T / 5); if (S.tp >= T) S.run = 0; } S.rv += Q57.vis(D.st(S).om) * dt * S.p.spd; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = D.cur(S), P = PB[c], d = P[3], q = D.st(S);
      Q57.bg(ctx, w, h);
      if (d.roll) { const x0 = g.x0 + 10, x1 = g.x1 - 10, Lx = x1 - x0, yb = 470, Hh = Lx * Math.tan(BE), sl = Lx / Math.cos(BE), sp = q.s / LSL * sl, u = [Math.cos(BE), Math.sin(BE)], r = 18, x = x0 + u[0] * sp + Math.sin(BE) * r, y = yb - Hh + u[1] * sp - Math.cos(BE) * r;
        K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, yb - Hh, 0, yb); gg.addColorStop(0, '#e7e5e4'); gg.addColorStop(1, '#a8a29e'); ctx.fillStyle = gg; ctx.beginPath(); ctx.moveTo(x0, yb - Hh); ctx.lineTo(x1, yb); ctx.lineTo(x0, yb); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#57534e'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, yb - Hh); ctx.lineTo(x1, yb); ctx.stroke(); });
        Q57.dash(ctx, [[x0 - 8, yb - Hh], [x0 - 8, yb]], '#7c3aed', 2); Q42.T(ctx, 'h = 7 m', x0 + 34, (yb * 2 - Hh) / 2 + 30, { s: 11, w: 900, c: '#7c3aed', bg: 'rgba(255,255,255,.85)' });
        Q57.ball(ctx, x, y, r, '#f97316'); K.raw(ctx, () => { ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(q.th) * r, y + Math.sin(q.th) * r); ctx.stroke(); });
        if (q.v > .05) Q57.arrow(ctx, x, y, u[0] * clamp(q.v * 8, 16, 90), u[1] * clamp(q.v * 8, 16, 90), '#dc2626', 'υ', 2.8);
      } else { const Rp = 70 + d.R * 160;
        K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.cx - 6, g.cy, 12, Rp + 40); rr(ctx, g.cx - 60, g.cy + Rp + 36, 120, 14, 5); ctx.fill(); });
        if (d.disc) Q57.drum(ctx, g.cx, g.cy, Rp, -S.rv, '#0f766e'); else Q57.wheel(ctx, g.cx, g.cy, Rp, -S.rv, { n: 18 });
        if (S.p.arr && q.om > .01) { Q57.arrow(ctx, g.cx + Rp + 40, g.cy, 0, -clamp(20 + Math.sqrt(q.om) * 6, 20, 110), '#dc2626', 'ω', 3); if (Math.abs(d.al) > 0) Q57.arrow(ctx, g.cx + Rp + 74, g.cy, 0, -Math.sign(d.al) * 50, '#16a34a', 'α', 3); }
      }
      Q41.slider(ctx, g.x0, g.x1, g.h - 214, S.tp / D.dur(S), '', '#7c3aed'); Q42.T(ctx, P[0] + ' ص 157', g.cx, 80, { s: 12, w: 900, c: '#fff', bg: '#7c3aed' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.s); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.e);
      if (S.ex) Q57.steps(ctx, S, { title: P[0] + ' ص 157', q: P[1], lines: P[2], k: S.k }, { wd: 320 });
      else Q57.card(ctx, S, d.roll ? [{ t: 't = ' + Q57.f(q.t, 2) + ' s', mono: 1 }, { t: 'υ = ' + Q57.f(q.v, 2) + ' m/s', mono: 1, c: '#dc2626', w: 900 }, { t: 'ω = υ / r = ' + Q57.f(q.om, 1) + ' rad/s', mono: 1 }, { t: 'KE = ' + Q57.f(.7 * .5 * q.v * q.v, 2) + ' J', mono: 1, c: '#15803d', w: 800 }, { t: 'في الأسفل KE = m g h = 34.3 J', mono: 1 }]
        : [{ t: 't = ' + Q57.f(q.t, 2) + ' s', mono: 1 }, { t: 'ωi = ' + Q57.f(d.wi, 1) + ' rad/s , α = ' + Q57.f(d.al, 2) + ' rad/s²', mono: 1 }, { t: 'ω = ' + Q57.f(q.om, 1) + ' rad/s', mono: 1, c: '#dc2626', w: 900 }, { t: 'θ = ' + Q57.f(q.th, 1) + ' rad = ' + Q57.f(q.th / TAU, 1) + ' rev', mono: 1, c: '#ea580c', w: 800 }], { title: P[0] + ': قراءات الحركة' });
      Q57.banner(ctx, w, 'اختر مسألة ثم شغّل الحركة');
      if (S.p.spd !== 1 || d.T > 5) Q42.T(ctx, 'الزمن مضغوط: المدة كلها في نحو 5 s', g.cx, 104, { s: 10, w: 800, c: '#fff', bg: '#64748b' });
    },
    chips(S, g) { const ks = Object.keys(PB); return { s: Q42.chips(S, 'sc', ks.map(k => [k, PB[k][0]]), g.h - 128, D.cur(S), (S2, k) => { S2.sc = k; S2.ex = 0; S2.tp = 0; S2.run = 0; }, { bw: 92, col: '#7c3aed', x1: g.L + 6 * 98 }),
      p: Q57.play(S, 'run', g.h - 172, S.run, S2 => { if (S2.tp >= D.dur(S2)) S2.tp = 0; S2.run = !S2.run; }, S2 => { S2.tp = 0; S2.run = 0; }, { bw: 140 }),
      e: Q57.exChips(S, 'ex', g.h - 84, g.L, ks.map(k => [k, 'حل ' + PB[k][0].replace('مسألة ', '')]), (S2, k) => { S2.sc = k; S2.tp = 0; S2.run = 1; }, k => PB[k][2].length, 86) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), T = D.dur(S);
      return [{ id: 'tl', x: g.x0 + (g.x1 - g.x0) * S.tp / T, y: g.h - 214, r: 18, axis: 'x', keep: true, tip: 'اسحب لتقديم الزمن', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.tp = clamp((d.x - g.x0) / (g.x1 - g.x0), 0, 1) * D.dur(S2); } }].concat(C.s, C.p, C.e); },
    readings(S) { const q = D.st(S); return [rd('المسألة', PB[D.cur(S)][0]), rd('الزمن t', Q57.f(q.t, 2) + ' s'), rd('السرعة الزاوية ω', Q57.f(q.om, 1) + ' rad/s'), rd('الإزاحة الزاوية θ', Q57.f(q.th, 1) + ' rad')]; },
    explain(S) { return Q26.ex('في كل مسألة ترى العجلة أو القرص يتسارع أو يتباطأ بانتظام حتى نهاية المدة، والكرة تتدحرج متسارعة على السطح المائل.', 'نطبق معادلات الحركة الزاوية بتعجيل منتظم و Στ = Iα و W = τθ = ΔKE ، ونربط الحركة الخطية بالزاوية υ = rω و a = rα.', 'كبح السيارات، وإيقاف الأقراص الدوارة، والمحركات الكهربائية، وتدحرج الكرات.'); }
  };
  M8.P[D.id] = D;
})();

/* ====================== MERGES (book order) ====================== */
M8.merge({ id: 'g11_c7_ang', ch: 57, reg: X11, sec: '7-1 الحركة الدائرية + 7-2 الإزاحة الزاوية والسرعة الزاوية + 7-3 العلاقة بين الانطلاق الخطي والزاوي', page: 131, kind: 'مثال',
  title: 'الحركة الدائرية: الإزاحة الزاوية والانطلاق الزاوي والخطي',
  desc: 'نشاهد أمثلة الحركة الدائرية (عجلة الكرسي، دولاب الهواء، الطائرة المربوطة بخيط)، ثم ندير قرصاً مدمجاً ونقيس الإزاحة الزاوية θ = S / r ونربط الانطلاق الخطي بالزاوي υ = rω ، ونحل مثال 1.',
  tags: 'الحركة الدائرية الإزاحة الزاوية الراديان الانطلاق الزاوي التردد زمن الدورة rpm مثال 1',
  fact: ['إذا كانت السرعة الزاوية ω مقدرة بـ rev/s فتسمى بتردد الدوران f ، وإذا كانت مقدرة بـ rad/s فتسمى بالتردد الزاوي ω (تذكر ص 133).', 'عبارة rpm مختصر revolution per minute وتعني دورة / دقيقة (ص 134).', 'قياس الإزاحة الزاوية خلال دورة كاملة يساوي 2π radian (ص 132).'],
  quiz: [
    { q: 'الإزاحة الزاوية خلال دورة كاملة تساوي:', o: ['2π rad', 'π rad', '1 rad', '2πr'], a: 0, why: 'ص 132: θ = 2πr / r.' },
    { q: 'قرص يدور بسرعة 5400 rpm. تردد دورانه:', o: ['90 Hz', '5400 Hz', '540 Hz', '1/90 Hz'], a: 0, why: 'مثال 1: 5400 / 60.' },
    { q: 'العلاقة بين الانطلاق الخطي والزاوي:', o: ['υ = r ω', 'υ = ω / r', 'υ = r / ω', 'υ = r ω²'], a: 0, why: 'ص 133.' },
    { q: 'نقطتان على قرص دوار، الأولى على حافته والثانية قرب مركزه:', o: ['لهما الانطلاق الزاوي نفسه وانطلاق الأولى الخطي أكبر', 'لهما الانطلاق الخطي نفسه', 'الانطلاق الزاوي للأولى أكبر'], a: 0, why: 'ص 132–133.' }],
  parts: [{ id: 'g11_r_intro', n: 'أمثلة الحركة الدائرية' }, { id: 'g11_r_disc', n: 'القرص المدمج ومثال 1' }] });

M8.merge({ id: 'g11_c7_cent', ch: 57, reg: X11, sec: '7-4 التعجيل المركزي والقوة المركزية + زوال القوة المركزية + 7-5 الحركة الدائرية غير المنتظمة', page: 135, kind: 'نشاط',
  title: 'التعجيل المركزي والقوة المركزية: الكرة والخيط، وقطع الخيط، والحركة غير المنتظمة',
  desc: 'ندير كرة مربوطة بخيط ونقيس التعجيل المركزي ac = υ²/r والقوة المركزية Fc = mυ²/r ، ثم نقطع الخيط فتنطلق الكرة باتجاه المماس، ونزيد الانطلاق أثناء الدوران لنرى التعجيل المماسي والمحصل.',
  tags: 'التعجيل المركزي القوة المركزية زوال القوة المركزية الحركة الدائرية غير المنتظمة التعجيل المماسي',
  fact: ['القوة المركزية لا تختلف عن أية قوة درستها من قبل: الاحتكاك بين الإطارات والطريق، وجذب الأرض للقمر، والتجاذب الكهربائي بين النواة والإلكترون (ص 136).', 'عندما يقضي جسم حركة دائرية منتظمة فإن اتجاه سرعته المماسية يتغير باستمرار مع ثبوت انطلاقه، لذا يمتلك تعجيلاً مركزياً عمودياً على متجه سرعته ومقداره ثابت (تذكر ص 136).'],
  quiz: [
    { q: 'جسم يتحرك على مسار دائري بانطلاق ثابت، يكون اتجاه تعجيله:', o: ['باتجاه مركز الدوران', 'باتجاه الحركة', 'بعيداً عن مركز الدائرة', 'أي واحد مما ذكر يعتمد على موضع الجسم'], a: 0, why: 'س1 فقرة 1 ص 143.' },
    { q: 'يتحرك جسم على مسار دائري بانطلاق ثابت، فإذا تضاعف نصف قطر مساره فإن القوة المركزية اللازمة تصير:', o: ['نصف ما كانت عليه', 'ربع ما كانت عليه', 'مرتين أكبر', 'أربع مرات أكبر'], a: 0, why: 'س1 فقرة 4: Fc = mυ²/r.' },
    { q: 'القوة المركزية التي تبقي الأرض في مسارها حول الشمس تتوافر:', o: ['بواسطة جاذبية الشمس', 'بواسطة القصور الذاتي', 'بواسطة دوران الأرض حول محورها', 'جزءاً بواسطة جاذبية سحب'], a: 0, why: 'س1 فقرة 3.' },
    { q: 'عند زوال القوة المركزية عن جسم يدور يتحرك:', o: ['بخط مستقيم باتجاه المماس', 'نصف قطرياً نحو الخارج', 'نحو المركز', 'يتوقف فوراً'], a: 0, why: 'ص 136 الشكل 7b.' },
    { q: 'في الحركة الدائرية غير المنتظمة التعجيل المماسي aT يغير:', o: ['مقدار السرعة', 'اتجاه السرعة فقط', 'نصف القطر'], a: 0, why: 'ص 137.' }],
  parts: [{ id: 'g11_r_cent', n: 'الكرة والخيط وقطع الخيط' }, { id: 'g11_r_nonu', n: 'الحركة الدائرية غير المنتظمة' }] });


M8.merge({ id: 'g11_c7_curve', ch: 57, reg: X11, sec: '7-6 حركة المركبات على المنعطفات الأفقية + 7-7 المنعطفات المائلة', page: 137, kind: 'نشاط',
  title: 'المركبات على المنعطفات: الأفقية والمائلة',
  desc: 'نقود سيارة على منعطف أفقي فيوفر الاحتكاك الشروعي القوة المركزية ونجد أقصى انطلاق آمن υ = √(μs g r) ، ثم نميل الطريق فتوفر المركبة الأفقية لرد الفعل N sinθ القوة المركزية و tanθ = υ²/(rg) ، ونحل المسألتين 4 و 6 ص 145.',
  tags: 'المنعطف الأفقي الاحتكاك الشروعي انطلاق الأمان المنعطف المائل زاوية الميل tanθ=v²/rg مسألة 4 مسألة 6',
  fact: ['كتلة المركبة لا تظهر في معادلة الانطلاق الأقصى، لذا فإن انطلاق الأمان على منعطف معين هو نفسه للسيارة الصغيرة والشاحنة والدراجة (تذكر ص 138).', 'لزيادة أمان المركبات على المنعطفات تكون الحافة الخارجية للطريق أعلى من الحافة الداخلية (ص 138).'],
  quiz: [
    { q: 'سيارة تتحرك على مسار دائري على طريق أفقي، فإن القوة المركزية هي:', o: ['قوة الاحتكاك الشروعي بين إطارات السيارة والطريق', 'القصور الذاتي', 'الجاذبية الأرضية', 'رد فعل الطريق العمودي'], a: 0, why: 'س1 فقرة 2 ص 143.' },
    { q: 'سيارة كتلتها 1200 kg تتحرك بانطلاق 6 m/s على مسار دائري نصف قطره 30 m. مقدار القوة المركزية:', o: ['1440 N', '48 N', '147 N', '240 N'], a: 0, why: 'س1 فقرة 5: 1200 × 36 / 30.' },
    { q: 'أقصى انطلاق آمن على منعطف أفقي:', o: ['υ = √(μs g r)', 'υ = μs g r', 'υ = √(r / μs g)', 'يعتمد على كتلة السيارة'], a: 0, why: 'ص 138.' },
    { q: 'في المنعطف المائل القوة المركزية تتوافر من:', o: ['المركبة الأفقية لرد الفعل N sinθ', 'المركبة الشاقولية N cosθ', 'وزن السيارة فقط'], a: 0, why: 'ص 138–139.' }],
  parts: [{ id: 'g11_r_flat', n: 'المنعطف الأفقي وانطلاق الأمان ومسألة 6' }, { id: 'g11_r_bank', n: 'المنعطف المائل ومسألة 4' }] });

M8.merge({ id: 'g11_c7_weight', ch: 57, reg: X11, sec: '7-8 الوزن الحقيقي والوزن الظاهري', page: 139, kind: 'مثال',
  title: 'الوزن الحقيقي والوزن الظاهري: شخص على ميزان في مصعد',
  desc: 'شخص يقف على ميزان داخل مصعد: نقارن قراءة الميزان (الوزن الظاهري) بالوزن الحقيقي mg عندما يكون المصعد ساكناً أو بسرعة ثابتة أو صاعداً أو نازلاً بتعجيل أو ساقطاً سقوطاً حراً، ونحل مثال 2.',
  tags: 'الوزن الحقيقي الوزن الظاهري المصعد الميزان انعدام الوزن السقوط الحر مثال 2',
  fact: ['الوزن الحقيقي يقاس بالميزان النابضي، وهو قوة جذب الأرض للجسم w = mg حيث g = 9.8 N/kg (ص 139).', 'عندما يسقط المصعد سقوطاً حراً تكون قراءة الميزان صفراً، وتسمى هذه الحالة انعدام الوزن (ص 141).'],
  quiz: [
    { q: 'شخص كتلته 60 kg في مصعد ينزل بتعجيل 2 m/s² و g = 10 m/s². قراءة الميزان:', o: ['480 N', '600 N', '720 N', 'صفر'], a: 0, why: 'مثال 2: 600 − 120.' },
    { q: 'مصعد يتحرك نحو الأعلى بسرعة ثابتة، الوزن الظاهري للشخص فيه:', o: ['يساوي وزنه الحقيقي', 'أكبر من وزنه الحقيقي', 'أصغر من وزنه الحقيقي', 'صفر'], a: 0, why: 'a = 0 ص 140.' },
    { q: 'إذا انتقل شخص من خط الاستواء إلى أحد قطبي الأرض فإن وزنه المؤثر:', o: ['يساوي وزنه الحقيقي', 'يصير أصغر من وزنه الحقيقي', 'يصير أكبر من وزنه الحقيقي', 'يساوي صفراً'], a: 0, why: 'س1 فقرة 6 ص 143: لا يوجد تعجيل مركزي عند القطب.' },
    { q: 'في السقوط الحر للمصعد قراءة الميزان:', o: ['صفر', 'mg', '2mg', 'mg / 2'], a: 0, why: 'a = g ص 141.' }],
  parts: [{ id: 'g11_r_lift', n: 'المصعد والميزان ومثال 2' }] });

M8.merge({ id: 'g11_c7_rev1', ch: 57, reg: X11, sec: 'أسئلة الفصل السابع ومسائله: الحركة الدائرية', page: 143, kind: 'مثال',
  title: 'أسئلة ومسائل الحركة الدائرية ص 143–145',
  desc: 'نحل مسائل الحركة الدائرية بالتجربة: الدولاب وانعدام الوزن الظاهري في القمة، تسريع دوران الأرض، التعجيل المركزي لنقطة على سطح الأرض، والقمر الصناعي. المسألتان 4 و 6 محلولتان في تجربة المنعطفات، وأسئلة الاختيار والتعليل في الاختبار.',
  tags: 'أسئلة الفصل السابع مسائل الدولاب الوزن الظاهري القمر الصناعي التعجيل المركزي للأرض',
  fact: ['يمكن للجسم أن يتحرك على مسار دائري فقط بوجود قوة مركزية، وإلا تحرك بخط مستقيم (س2 فقرة 2 ص 144).', 'الجسم الذي يتحرك حركة دائرية منتظمة غير متزن، لأن محصلة القوى عليه هي القوة المركزية وليست صفراً (س2 فقرة 3).', 'يكون للجسم تعجيل مركزي من غير تعجيل مماسي عندما يدور بانطلاق ثابت (س2 فقرة 4).', 'في آلة تجفيف الملابس لا تكفي قوة التلاصق لتوفير القوة المركزية اللازمة لقطرات الماء فتنفصل عبر ثقوب الحوض وتتحرك باتجاه المماس (س2 فقرة 5).'],
  quiz: [
    { q: 'جسم يتحرك داخل حلقة شاقولية لعربة الأفعوانية، الوزن الظاهري له في أعلى نقطة:', o: ['w_app = Fc − w_real', 'w_app = w_real + Fc', 'w_app = w_real', 'w_app = w_real − Fc'], a: 0, why: 'س1 فقرة 7 ص 144: N + mg = Fc.' },
    { q: 'وحدة قياس القوة المركزية Fc = mυ²/r هي:', o: ['kg.m/s² أي N', 'kg.m²/s', 'kg/s²', 'J'], a: 0, why: 'س2 فقرة 1: kg × (m/s)² / m.' },
    { q: 'هل يتزن الجسم المتحرك حركة دائرية منتظمة؟', o: ['لا، لأن محصلة القوى عليه هي القوة المركزية', 'نعم، لأن انطلاقه ثابت', 'نعم، لأن تعجيله صفر'], a: 0, why: 'س2 فقرة 3.' },
    { q: 'زمن دورة دولاب نصف قطره 10 m لكي ينعدم الوزن الظاهري في القمة:', o: ['6.35 s', '9.9 s', '3.14 s', '62.8 s'], a: 0, why: 'مسألة 1: T = 2π√(r/g).' },
    { q: 'انطلاق قمر صناعي يدور بمدار نصف قطره 7000 km تقريباً:', o: ['7549 m/s', '9.8 m/s', '754 m/s', '75490 m/s'], a: 0, why: 'مسألة 5: υ = √(GM/r).' }],
  parts: [{ id: 'g11_r_prob1', n: 'مسائل الحركة الدائرية 1 و 2 و 3 و 5' }] });

M8.merge({ id: 'g11_c7_rot', ch: 57, reg: X11, sec: '7-9 الحركة الدورانية + 7-10 التعجيل الزاوي + 7-11 معادلات الحركة الزاوية', page: 146, kind: 'مثال',
  title: 'الحركة الدورانية: التعجيل الزاوي ومعادلات الحركة الزاوية',
  desc: 'نشغّل عجلة بتعجيل زاوي ثابت ونرسم ω مع الزمن، ونقارن نقطتين على بعدين مختلفين من المحور، ونحدد اتجاه ω و α بقاعدة الكف اليمنى، ونطبق معادلات الحركة الزاوية في مثال 3.',
  tags: 'الحركة الدورانية التعجيل الزاوي قاعدة الكف اليمنى aT=rα معادلات الحركة الزاوية مثال 3',
  fact: ['جميع نقاط الجسم الجاسئ الدوار لها الإزاحة الزاوية والسرعة الزاوية والتعجيل الزاوي نفسها (ص 146).', 'يكون التعجيل الزاوي باتجاه السرعة الزاوية عندما تتزايد، وبعكس اتجاهها عندما تتناقص (ص 146).'],
  quiz: [
    { q: 'عجلة تدور بتعجيل 3.5 rad/s² وسرعتها الابتدائية 2 rad/s. سرعتها الزاوية بعد 2 s:', o: ['9 rad/s', '7 rad/s', '11 rad/s', '5.5 rad/s'], a: 0, why: 'مثال 3.' },
    { q: 'وحدة التعجيل الزاوي:', o: ['rad/s²', 'rad/s', 'm/s²', 'rev'], a: 0, why: 'ص 146.' },
    { q: 'التعجيل المماسي لنقطة تبعد r عن المحور:', o: ['aT = r α', 'aT = α / r', 'aT = r ω²', 'aT = ω / r'], a: 0, why: 'الشكل 15 ص 147.' },
    { q: 'باستعمال قاعدة الكف اليمنى يشير الإبهام إلى اتجاه:', o: ['السرعة الزاوية ω', 'السرعة الخطية', 'نصف القطر', 'التعجيل المركزي'], a: 0, why: 'الشكل 14.' }],
  parts: [{ id: 'g11_r_alpha', n: 'العجلة والتعجيل الزاوي ومثال 3' }] });

M8.merge({ id: 'g11_c7_inertia', ch: 57, reg: X11, sec: '7-12 عزم القصور الذاتي وطاقة الدوران + 7-13 الحركة المركبة + 7-14 العزم المدور والتعجيل الزاوي + 7-15 الشغل والقدرة في الحركة الدورانية', page: 149, kind: 'نشاط',
  title: 'عزم القصور الذاتي والعزم المدور والشغل الدوراني',
  desc: 'نسابق أجساماً مختلفة الأشكال على سطح مائل لنفهم عزم القصور الذاتي والطاقة الحركية الكلية (مثال 4)، ثم ندير أسطوانة صلدة بحبل لنتحقق من Στ = Iα و W = τθ و P = τω (مثال 5 ومثال 6).',
  tags: 'عزم القصور الذاتي الجدول 1 الحركة المركبة الطاقة الحركية الدورانية العزم المدور Στ=Iα الشغل الدوراني القدرة الدورانية مثال 4 مثال 5 مثال 6',
  fact: ['عزم القصور الذاتي يعتمد على كتلة الجسم وشكله ونمط توزيع الكتلة نسبة إلى محور الدوران (ص 149).', 'العزم المدور والتعجيل الزاوي كميتان متجهتان على محور الدوران، أما عزم القصور الذاتي فكمية قياسية (ص 152).'],
  quiz: [
    { q: 'عزم القصور الذاتي للكرة الصلدة حول قطرها:', o: ['⅖ MR²', '½ MR²', 'MR²', '⅔ MR²'], a: 0, why: 'الجدول 1 ص 150.' },
    { q: 'وحدة عزم القصور الذاتي:', o: ['kg.m²', 'kg.m/s', 'N.m', 'kg/m²'], a: 0, why: 'ص 149.' },
    { q: 'كرة صلدة 0.2 kg نصف قطرها 0.1 m تتدحرج بانطلاق 1.5 m/s. طاقتها الحركية الكلية:', o: ['0.315 J', '0.225 J', '0.09 J', '0.45 J'], a: 0, why: 'مثال 4.' },
    { q: 'يتناسب التعجيل الزاوي للجسم:', o: ['طردياً مع محصلة العزوم وعكسياً مع عزم القصور', 'عكسياً مع العزم', 'طردياً مع عزم القصور'], a: 0, why: 'ص 151–152.' },
    { q: 'القدرة في الحركة الدورانية:', o: ['P = τ ω', 'P = τ θ', 'P = I ω', 'P = I α'], a: 0, why: 'ص 153.' }],
  parts: [{ id: 'g11_r_inertia', n: 'سباق التدحرج والجدول 1 ومثال 4' }, { id: 'g11_r_torque', n: 'الأسطوانة والحبل ومثال 5 ومثال 6' }] });

M8.merge({ id: 'g11_c7_L', ch: 57, reg: X11, sec: '7-16 الزخم الزاوي + 7-17 قانون حفظ الزخم الزاوي', page: 154, kind: 'نشاط',
  title: 'الزخم الزاوي وحفظه: المتزلجة على الجليد',
  desc: 'متزلجة تدور على الجليد وتضم ذراعيها أو تفردهما: نقيس عزم قصورها وسرعتها الزاوية ونتحقق من ثبات الزخم الزاوي L = Iω عند انعدام العزوم الخارجية.',
  tags: 'الزخم الزاوي L=Iω حفظ الزخم الزاوي المتزلجة الغطاس راقصة الباليه',
  fact: ['الزخم الزاوي كمية متجهة وحدتها kg.m²/s (ص 154).', 'تطبيقات حفظ الزخم الزاوي: راقصة الباليه، والغطاس الذي يضم جسمه، ولاعب السيرك (ص 155).', 'التوازن على دراجة متحركة أسهل منه على دراجة ساكنة لأن لعجلاتها الدوارة زخماً زاوياً يحافظ على اتجاهه (س2 ص 156).', 'لاعب الحبل يفرد ذراعيه أو يحمل عموداً أفقياً طويلاً ليزيد عزم قصوره الذاتي فيصعب انقلابه (س2 ص 156).'],
  quiz: [
    { q: 'قرص يدور بزخم زاوي ثابت، أي الكميات تساوي صفراً؟', o: ['محصلة العزوم الخارجية', 'التعجيل الزاوي فقط ولا غيره', 'الشغل الدوراني', 'السرعة الزاوية'], a: 0, why: 'س1 فقرة 1 ص 156.' },
    { q: 'طفل يقف عند حافة منصة دوارة ويمشي نحو مركزها (لا عزم خارجي)، الزخم الزاوي الكلي:', o: ['يبقى ثابتاً', 'يزداد', 'يقل', 'يساوي الزخم الزاوي للمنصة'], a: 0, why: 'س1 فقرة 2.' },
    { q: 'الجول × ثانية J.s وحدة لقياس:', o: ['الزخم الزاوي', 'القدرة', 'العزم المدور', 'التعجيل الزاوي'], a: 0, why: 'س1 فقرة 3: kg.m²/s.' },
    { q: 'المعدل الزمني لتغير الزخم الزاوي يساوي:', o: ['العزم المدور', 'الشغل الدوراني', 'القوة', 'الإزاحة الزاوية'], a: 0, why: 'س1 فقرة 4.' },
    { q: 'عندما تضم المتزلجة ذراعيها:', o: ['يقل I وتزداد ω', 'يزداد I وتزداد ω', 'يقل L', 'تقل ω'], a: 0, why: 'ص 155.' }],
  parts: [{ id: 'g11_r_skater', n: 'المتزلجة وحفظ الزخم الزاوي' }] });

M8.merge({ id: 'g11_c7_rev2', ch: 57, reg: X11, sec: 'أسئلة الفصل السابع ومسائله: الحركة الدورانية', page: 156, kind: 'مثال',
  title: 'مسائل الحركة الدورانية ص 157',
  desc: 'نحل المسائل الست للحركة الدورانية بالتجربة: تعجيل عجلة السيارة، إيقاف عجلة وقرص بعزم معاكس، القدرة والشغل الدورانيان، وتدحرج كرة صلدة على سطح مائل.',
  tags: 'مسائل الحركة الدورانية التعجيل الزاوي العزم المعاكس القدرة الشغل التدحرج',
  fact: ['يمكن أن يمتلك الجسم زخماً زاوياً مع أن محصلة العزوم المؤثرة فيه صفر، فيبقى زخمه ثابتاً (س2 فقرة 2 ص 156).'],
  quiz: [
    { q: 'عجلة قطرها 80 cm لسيارة يزداد انطلاقها من 0 إلى 20 m/s خلال 25 s. تعجيلها الزاوي:', o: ['2 rad/s²', '0.8 rad/s²', '0.4 rad/s²', '25 rad/s²'], a: 0, why: 'مسألة 1: α = a / r.' },
    { q: 'قرص I = 1 kg.m² أوقف خلال 4 s وكان الشغل 200 J. العزم المعاكس:', o: ['5 N.m', '20 N.m', '50 N.m', '200 N.m'], a: 0, why: 'مسألة 5.' },
    { q: 'انطلاق كرة صلدة تتدحرج من السكون من ارتفاع 7 m عند الأسفل:', o: ['9.9 m/s', '11.7 m/s', '7 m/s', '34.3 m/s'], a: 0, why: 'مسألة 6: υ = √(10gh/7).' }],
  parts: [{ id: 'g11_r_prob2', n: 'مسائل الحركة الدورانية 1 إلى 6' }] });
/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g11_r_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g11_r_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });
