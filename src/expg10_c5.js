'use strict';
/* ====================== الرابع العلمي — الفصل الخامس: الضوء (ch 45, ص 84–94) ======================
   Merged experiments (book order): g10_light (1-5) · g10_huygens (2-5, 3-5) · g10_photometry (4-5, 5-5, 6-5)
   Parts live in M8.P (expg8_0kit.js) and are merged at the end (reg: X10). Everything is hands-on: drag, tap, rub…
   Local kit Q45 (text, cards, buttons, step-by-step solutions, lamp & lux meter) + Q45W (Huygens wave engine). */
LW({ id: 'g10_fc', cat: 45, name: 'تردد الضوء', fx: '<i>f</i> = ' + FR('<i>c</i>', '<i>λ</i>'), sym: 'التردد = سرعة الضوء في الفراغ ÷ الطول الموجي. c = 3×10<sup>8</sup> m/s ، λ بالمتر ، f بالهيرتز (Hz)', calc: { in: [['l', 'الطول الموجي λ', 'm', 4e-7]], out: 'التردد f', u: 'Hz', f: v => 3e8 / v.l } });
LW({ id: 'g10_hf', cat: 45, name: 'طاقة الفوتون', fx: '<i>E</i> = <i>h</i> <i>f</i> = ' + FR('<i>h c</i>', '<i>λ</i>'), sym: 'طاقة الفوتون = ثابت بلانك × تردد الإشعاع ، h = 6.63×10<sup>−34</sup> J·s', calc: { in: [['l', 'الطول الموجي λ', 'm', 5.55e-7]], out: 'طاقة الفوتون E', u: 'J', f: v => 6.63e-34 * 3e8 / v.l } });
LW({ id: 'g10_flux', cat: 45, name: 'السيل الضوئي', fx: '<i>Φ</i> = 4<i>π</i> <i>I</i>', sym: 'السيل الضوئي الكلي (Lm) لمصدر نقطي قوة إضاءته I (cd). اللومن: السيل الساقط على 1 m² من سطح كروي نصف قطره 1 m في مركزه مصدر قوة إضاءته 1 cd', calc: { in: [['I', 'قوة الإضاءة I', 'cd', 139]], out: 'السيل الضوئي Φ', u: 'Lm', f: v => 4 * Math.PI * v.I } });
LW({ id: 'g10_ill', cat: 45, name: 'شدة الاستضاءة', fx: '<i>E</i> = ' + FR('<i>Φ</i>', '<i>A</i>') + ' (Lux = Lm/m²)', sym: 'السيل الضوئي الساقط عمودياً على وحدة المساحة من السطح. تقاس بالفوتومتر واللوكسميتر', calc: { in: [['F', 'السيل Φ', 'Lm', 100], ['A', 'المساحة A', 'm²', 4]], out: 'شدة الاستضاءة E', u: 'Lux', f: v => v.F / v.A } });
LW({ id: 'g10_inv', cat: 45, name: 'قانون التربيع العكسي', fx: '<i>E</i> = ' + FR('<i>I</i>', '<i>r</i><sup>2</sup>') + ' ، ' + FR('<i>E</i><sub>1</sub>', '<i>E</i><sub>2</sub>') + ' = ' + FR('<i>r</i><sub>2</sub><sup>2</sup>', '<i>r</i><sub>1</sub><sup>2</sup>'), sym: 'شدة الاستضاءة على سطح يسقط عليه الضوء عمودياً تتناسب طردياً مع قوة إضاءة المصدر النقطي وعكسياً مع مربع بعده عن السطح', calc: { in: [['I', 'قوة الإضاءة I', 'cd', 5], ['r', 'البعد r', 'm', 5]], out: 'شدة الاستضاءة E', u: 'Lux', f: v => v.I / (v.r * v.r) } });
LW({ id: 'g10_phot', cat: 45, name: 'الفوتومتر (تساوي الاستضاءة)', fx: FR('<i>I</i><sub>1</sub>', '<i>r</i><sub>1</sub><sup>2</sup>') + ' = ' + FR('<i>I</i><sub>2</sub>', '<i>r</i><sub>2</sub><sup>2</sup>'), sym: 'عندما تتساوى شدة الاستضاءة على وجهي الفوتومتر (E₁ = E₂) تختفي البقعة الدهنية', calc: { in: [['I1', 'I₁', 'cd', 32], ['r1', 'r₁', 'm', .6], ['r2', 'r₂', 'm', 1.2]], out: 'I₂', u: 'cd', f: v => v.I1 * v.r2 * v.r2 / (v.r1 * v.r1) } });

const Q45 = {
  h: 6.63e-34, c: 3e8, col: '#d97706',
  T(ctx, s, x, y, o) { Q31.T(ctx, s, x, y, o); },
  card(ctx, S, L, o) { return Q31.card(ctx, S, L, Object.assign({ bd: '#b45309' }, o || {})); },
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#b45309', y); },
  btn(id, b, click, o) { return Q31.btn(id, b, click, o); },
  drawBtn(ctx, b, label, col, on) { Q31.drawBtn(ctx, b, label, col, on); },
  sci(v, d = 3, u = '') { return Q31.sci(v, d, u); },
  L(S) { return S.W < 600 ? 12 : 76; }, // left edge of the free canvas
  /* row of chip buttons: list [[key,label]], returns drag items; cur = active key */
  chips(S, id, list, y, cur, click, o = {}) {
    const ph = S.W < 600, L = o.x0 != null ? o.x0 : Q45.L(S), R = o.x1 != null ? o.x1 : S.W - 12, gap = 6, n = list.length;
    const bw = Math.min(o.bw || 150, (R - L - gap * (n - 1)) / n), bh = o.bh || (ph ? 30 : 34); const out = [];
    list.forEach((q, i) => { const x = L + bw / 2 + i * (bw + gap); out.push(Q45.btn(id + '_' + q[0], { x, y, w: bw, h: bh }, S2 => click(S2, q[0]), { tip: q[2] || q[1] })); out[i]._lab = q[1]; out[i]._on = cur === q[0]; out[i]._col = o.col; });
    return out;
  },
  drawChips(ctx, list) { list.forEach(b => Q45.drawBtn(ctx, b, b._lab, b._on ? (b._col || '#b45309') : '#64748b', b._on)); },
  /* step-by-step solution card: st = {title, lines:[...], k: shown} */
  steps(ctx, S, st, o = {}) {
    const L = [{ t: st.q, s: 12, c: '#334155', w: 800 }].concat(st.lines.slice(0, st.k).map((t, i) => ({ t: t, mono: /[=×÷]/.test(t) && !/[؀-ۿ]/.test(t) ? 1 : 0, c: i === st.lines.length - 1 ? '#b91c1c' : '#1e293b', w: i === st.lines.length - 1 ? 900 : 700 })));
    if (st.k < st.lines.length) L.push({ t: '⬇ اضغط «الخطوة التالية» (' + st.k + '/' + st.lines.length + ')', c: '#b45309', s: 11.5, w: 800 });
    return Q45.card(ctx, S, L, Object.assign({ title: st.title, bd: '#be185d' }, o));
  },
  /* glowing point lamp (small bulb) at (x,y); I in cd sets the glow */
  lamp(ctx, x, y, s = 1, I = 20, on = true) {
    K.raw(ctx, () => { if (on) { const R = (40 + Math.sqrt(I) * 9) * s, g = ctx.createRadialGradient(x, y, 2, x, y, R); g.addColorStop(0, 'rgba(255,251,235,.95)'); g.addColorStop(.25, 'rgba(253,224,71,.45)'); g.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill(); } });
    Q26.bulb(ctx, x, y, 11 * s, on);
  },
  /* digital lux meter (sensor + display) ; (x,y) = sensor centre */
  luxMeter(ctx, x, y, val, o = {}) {
    const s = o.s || 1, u = o.u || 'Lux';
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
      const dx = o.dx != null ? o.dx : 46 * s, dy = o.dy != null ? o.dy : 30 * s; // display offset
      ctx.fillStyle = '#1f2937'; rr(ctx, x + dx - 34 * s, y + dy - 22 * s, 68 * s, 46 * s, 7 * s); ctx.fill(); ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#a3e635'; rr(ctx, x + dx - 28 * s, y + dy - 16 * s, 56 * s, 22 * s, 3 * s); ctx.fill();
      ctx.strokeStyle = '#111827'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(x, y + 8 * s); ctx.quadraticCurveTo(x, y + dy, x + dx - 34 * s, y + dy); ctx.stroke();
      const g = ctx.createRadialGradient(x - 4 * s, y - 4 * s, 1, x, y, 13 * s); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#cbd5e1'); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(x, y, 13 * s, 0, TAU); ctx.fill(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 9 * s, 0, TAU); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#14532d'; ctx.font = '800 ' + (12 * s) + 'px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; ctx.fillText(o.txt || (val >= 100 ? val.toFixed(0) : val >= 10 ? val.toFixed(1) : val.toFixed(2)), x + dx, y + dy - 5 * s); ctx.fillStyle = '#e5e7eb'; ctx.font = '700 ' + (8.5 * s) + 'px sans-serif'; ctx.fillText(u, x + dx, y + dy + 14 * s); ctx.textBaseline = 'alphabetic'; });
  },
  /* metre rule from x0 (0 m) with ppm px per metre up to max metres */
  rule(ctx, x0, y, ppm, max, o = {}) {
    K.raw(ctx, () => { ctx.fillStyle = o.bg || '#fde68a'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; rr(ctx, x0 - 6, y, ppm * max + 12, 16, 3); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#78350f';
      for (let k = 0; k <= max * 10 + 1e-6; k++) { const x = x0 + k * ppm / 10, L = k % 10 === 0 ? 10 : k % 5 === 0 ? 7 : 4; ctx.lineWidth = k % 10 ? .8 : 1.4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + L); ctx.stroke(); } });
    for (let m = 0; m <= max + 1e-6; m += (o.step || 1)) Q45.T(ctx, (+m.toFixed(1)) + ' m', x0 + m * ppm, y + 27, { s: 10.5, w: 800, c: o.tc || '#fde68a' });
  }
};

/* =============== A1 — الأجسام المضيئة والمستضيئة (الشكل 1-5، ص 84) =============== */
(() => {
  const ITEMS = [['sun', 'الشمس', 1], ['candle', 'الشمعة المتقدة', 1], ['moon', 'القمر', 0], ['lamp', 'المصباح المتوهج', 1], ['book', 'الكتاب', 0], ['star', 'النجوم', 1], ['mirror', 'المرآة', 0], ['face', 'وجه زميلك', 0]];
  const D = { id: 'g10_l_sources', page: 84, fig: 'الشكل 1-5',
    desc: 'نتمكن من رؤية الأجسام لأن الضوء الساقط عليها ينعكس عنها ويصل إلى العين. الأجسام التي تبعث الضوء بذاتها (الشمعة المتقدة، الشمس) أجسام مضيئة، والتي تعكس الضوء الساقط عليها فقط (القمر) أجسام مستضيئة.',
    tags: 'جسم مضيء مستضيء رؤية الأجسام انعكاس الضوء طاقة الشمس',
    tools: ['شمعة', 'كرة القمر', 'حاجز معتم', 'العين'],
    steps: ['اضغط على الشمعة لإشعالها أو إطفائها، ولاحظ: هل نرى القمر والشمعة مطفأة؟', 'اسحب القمر والشمعة والعين إلى أي مكان، وتتبع الشعاع من الشمعة إلى القمر ثم إلى العين.', 'اسحب الحاجز المعتم بين الشمعة والقمر: لماذا يختفي القمر مع أن الشمعة ما زالت متقدة؟', 'صنّف الأجسام في الأسفل: اضغط على كل بطاقة لتختار «مضيء» أو «مستضيء».'],
    concl: ['الجسم المضيء يبعث الضوء بذاته (الشمس، الشمعة المتقدة، المصباح المتوهج، النجوم).', 'الجسم المستضيء لا يبعث ضوءاً، بل يعكس الضوء الساقط عليه فنراه (القمر، الكتاب، المرآة).', 'نرى الجسم المستضيء فقط عندما يسقط عليه ضوء وينعكس منه إلى العين.', 'الضوء يحمل طاقة: تنتقل طاقة الشمس إلى الأرض عبر الفضاء الخالي بالضوء.'],
    laws: [],
    controls: [TG('rays', 'إظهار الأشعة', true, null, 'rays'), TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { S.on = 1; S.g = {}; S.cd = null; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, ty = h * (ph ? .5 : .58); return { w, h, ph, ty, L: Q45.L(S) }; },
    flame(S) { return [S.cd[0], S.cd[1] - 62]; },
    block(S, a, b) { const B = S.bl, s = [[B[0], B[1] - 70], [B[0], B[1] + 4]]; const d = [b[0] - a[0], b[1] - a[1]], L = Math.hypot(d[0], d[1]); const r = Q26.seg(a, [d[0] / L, d[1] / L], s[0], s[1]); return r && r.t < L ? r.pt : null; },
    init(S, g) { if (S.cd) return; const L = g.L, W = g.w - L; S.cd = [L + W * .14, g.ty - 4]; S.mo = [L + W * .52, g.ty - (g.ph ? 150 : 210)]; S.ey = [L + W * .86, g.ty - 70]; S.bl = [L + W * .36, g.ty - 6]; S.bl0 = S.bl.slice(); S.bl[0] = L + W * .06 > 0 ? S.bl[0] : S.bl[0]; S.blOut = 1; },
    tiles(S, g) { const ph = g.ph, cols = ph ? 4 : 8, L = g.L, R = g.w - 12, gap = 6, tw = (R - L - gap * (cols - 1)) / cols, th = ph ? 38 : 42, y0 = g.ty + (ph ? 64 : 74);
      return ITEMS.map((it, i) => { const c = i % cols, r = (i / cols) | 0; return Q45.btn('it_' + it[0], { x: L + tw / 2 + c * (tw + gap), y: y0 + r * (th + gap), w: tw, h: th }, S2 => { const v = S2.g[it[0]]; S2.g[it[0]] = v == null ? 1 : v === 1 ? 0 : null; }, { tip: 'اضغط لتصنيف ' + it[1] }); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; D.init(S, g); const fs = g.ph ? 10.5 : 12;
      Q26.room(ctx, w, h, g.ty, { top: '#0b1120', bot: '#1e293b' });
      const F = D.flame(S), M = S.mo, E = S.ey;
      // candle light: radial rays
      if (S.on && p.rays !== false) for (let k = 0; k < 18; k++) { const a = k / 18 * TAU, e = [F[0] + Math.cos(a) * 2000, F[1] + Math.sin(a) * 2000], hit = D.block(S, F, e) || [F[0] + Math.cos(a) * 95, F[1] + Math.sin(a) * 95]; const L = Math.min(Math.hypot(hit[0] - F[0], hit[1] - F[1]), 95); Q26.ray(ctx, [F, [F[0] + Math.cos(a) * L, F[1] + Math.sin(a) * L]], '#fde047', { w: 1.4, alpha: .35, arrows: false, glow: false }); }
      const b1 = S.on ? D.block(S, F, M) : null, lit = S.on && !b1, b2 = lit ? D.block(S, M, E) : null, seen = lit && !b2, bc = S.on ? D.block(S, F, E) : null;
      if (S.on && p.rays !== false) {
        Q26.ray(ctx, [F, b1 || M], '#fde047', { w: 2.6 }); if (lit) Q26.ray(ctx, [M, b2 || E], '#e2e8f0', { w: 2.2 });
        Q26.ray(ctx, [F, bc || E], '#fb923c', { w: 1.8, alpha: .8 });
      }
      // moon (lit side faces the candle)
      K.raw(ctx, () => { const r = g.ph ? 26 : 34; ctx.save(); const a = Math.atan2(F[1] - M[1], F[0] - M[0]); const gr = ctx.createRadialGradient(M[0] + Math.cos(a) * r * .5, M[1] + Math.sin(a) * r * .5, r * .1, M[0], M[1], r * 1.1);
        if (lit) { gr.addColorStop(0, '#fffbeb'); gr.addColorStop(.6, '#e7e5e4'); gr.addColorStop(1, '#57534e'); ctx.shadowColor = 'rgba(254,243,199,.7)'; ctx.shadowBlur = 26; } else { gr.addColorStop(0, '#334155'); gr.addColorStop(1, '#0f172a'); }
        ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(M[0], M[1], r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; ctx.fillStyle = lit ? 'rgba(120,113,108,.35)' : 'rgba(71,85,105,.4)'; [[-.3, -.2, .18], [.25, .3, .14], [.1, -.45, .1], [-.2, .4, .09]].forEach(c => { ctx.beginPath(); ctx.arc(M[0] + c[0] * r, M[1] + c[1] * r, c[2] * r, 0, TAU); ctx.fill(); });
        if (!lit) { ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(M[0], M[1], r, 0, TAU); ctx.stroke(); } ctx.restore(); });
      // blocker card
      K.raw(ctx, () => { const B = S.bl; ctx.fillStyle = '#334155'; ctx.fillRect(B[0] - 5, B[1] - 70, 10, 74); ctx.fillStyle = '#475569'; ctx.fillRect(B[0] - 16, B[1], 32, 6); });
      Q26.candle(ctx, S.cd[0], S.cd[1], 1.2, S.t, !!S.on);
      Q26.eye(ctx, E[0], E[1], g.ph ? .9 : 1.1, Math.atan2(M[1] - E[1], M[0] - E[0]) + Math.PI);
      if (p.lab !== false) {
        Q45.T(ctx, S.on ? 'جسم مضيء 🔥' : 'شمعة مطفأة', S.cd[0], S.cd[1] + 18, { s: fs, w: 900, c: '#fff', bg: S.on ? '#c2410c' : '#475569' });
        Q45.T(ctx, lit ? 'جسم مستضيء (يعكس الضوء)' : 'القمر مظلم: لا يصله ضوء', M[0], M[1] + (g.ph ? 44 : 54), { s: fs, w: 900, c: '#fff', bg: lit ? '#0369a1' : '#475569' });
        Q45.T(ctx, 'حاجز معتم', S.bl[0], S.bl[1] + 18, { s: fs - 1, w: 800, c: '#cbd5e1' });
        Q45.T(ctx, seen ? '👁 العين ترى القمر' : '👁 العين لا ترى القمر', E[0], E[1] + 44, { s: fs, w: 900, c: '#fff', bg: seen ? '#15803d' : '#b91c1c' });
      }
      // classification tiles
      const T = D.tiles(S, g); let ok = 0, done = 0;
      Q45.T(ctx, 'صنّف: اضغط على كل جسم لتختار «مضيء» أو «مستضيء»', (g.L + w - 12) / 2, T[0].y - (g.ph ? 30 : 34), { s: fs, w: 900, c: '#fde68a' });
      T.forEach((b, i) => { const it = ITEMS[i], v = S.g[it[0]]; if (v != null) { done++; if (v === it[2]) ok++; }
        Q45.drawBtn(ctx, b, it[1] + (v == null ? ' ؟' : v ? ' ← مضيء' : ' ← مستضيء'), v == null ? '#64748b' : (done === ITEMS.length ? (v === it[2] ? '#15803d' : '#b91c1c') : (v ? '#c2410c' : '#0369a1')), false); });
      if (done === ITEMS.length) Q26.verdict(ctx, (g.L + w - 12) / 2, h - 46, ok === ITEMS.length, ok === ITEMS.length ? 'أحسنت! صنّفت الأجسام كلها صحيحاً' : 'صحيح ' + ok + ' من ' + ITEMS.length + ' — راجع البطاقات الحمراء');
      if (!g.ph) Q45.card(ctx, S, [{ t: 'المضيء: يبعث الضوء بذاته', c: '#c2410c', w: 900 }, { t: 'المستضيء: يعكس الضوء الساقط عليه', c: '#0369a1', w: 900 }, { t: 'نرى الجسم عندما يصل منه ضوء إلى العين', c: '#334155' }], { title: 'الشكل (1-5)', y: 44, wd: 300 });
      Q45.banner(ctx, w, 'اضغط على الشمعة، واسحب القمر والحاجز والعين');
    },
    drags(S) { if (!S.W || !S.cd) return []; const g = D.geo(S), cl = (v, a, b) => clamp(v, a, b);
      const L = [
        { id: 'candle', x: S.cd[0], y: S.cd[1] - 40, r: 40, axis: 'xy', keep: true, tip: 'اسحب الشمعة — أو اضغط لإشعالها/إطفائها', idle: 'اضغط على الشمعة ✋', click: S2 => { S2.on = S2.on ? 0 : 1; }, drag: (S2, d) => { S2.cd = [cl(d.ox + d.x - d.sx, g.L + 20, g.w - 30), cl(d.oy + d.y - d.sy + 40, 120, g.ty - 4)]; } },
        { id: 'block', x: S.bl[0], y: S.bl[1] - 34, w: 34, h: 84, axis: 'xy', keep: true, tip: 'اسحب الحاجز المعتم', drag: (S2, d) => { S2.bl = [cl(d.ox + d.x - d.sx, g.L + 10, g.w - 20), cl(d.oy + d.y - d.sy + 34, 90, g.ty - 6)]; } },
        { id: 'moon', x: S.mo[0], y: S.mo[1], r: 36, axis: 'xy', keep: true, tip: 'اسحب القمر', drag: (S2, d) => { S2.mo = [cl(d.ox + d.x - d.sx, g.L + 30, g.w - 30), cl(d.oy + d.y - d.sy, 60, g.ty - 40)]; } },
        { id: 'eye', x: S.ey[0], y: S.ey[1], r: 30, axis: 'xy', keep: true, tip: 'اسحب العين', drag: (S2, d) => { S2.ey = [cl(d.ox + d.x - d.sx, g.L + 30, g.w - 30), cl(d.oy + d.y - d.sy, 60, g.ty - 20)]; } }];
      return L.concat(D.tiles(S, g)); },
    readings(S) { if (!S.cd) return []; const F = D.flame(S), lit = S.on && !D.block(S, F, S.mo), seen = lit && !D.block(S, S.mo, S.ey); const n = ITEMS.filter(it => S.g[it[0]] === it[2]).length;
      return [rd('الشمعة', S.on ? 'متقدة (مضيئة)' : 'مطفأة'), rd('القمر', lit ? 'مستضاء' : 'مظلم'), rd('هل تراه العين؟', seen ? 'نعم' : 'لا'), rd('التصنيف الصحيح', n + ' / ' + ITEMS.length)]; },
    explain(S) { if (!S.cd) return ''; const F = D.flame(S), lit = S.on && !D.block(S, F, S.mo); return Q26.ex(lit ? 'القمر مضاء ونراه لأن ضوء الشمعة يسقط عليه ثم ينعكس إلى العين.' : 'القمر مظلم: ' + (S.on ? 'الحاجز المعتم يمنع ضوء الشمعة من الوصول إليه.' : 'الشمعة مطفأة فلا يوجد مصدر ضوء.'), 'الشمعة المتقدة جسم <b>مضيء</b> يبعث الضوء بذاته، أما القمر فجسم <b>مستضيء</b> لا يبعث ضوءاً، بل يعكس الضوء الساقط عليه.', 'يضيء القمر ليلاً لأنه يعكس ضوء الشمس، والضوء ينقل طاقة الشمس إلى الأرض عبر الفضاء الخالي.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — انتشار الضوء بخطوط مستقيمة ونظريات طبيعة الضوء (الشكل 2-5، ص 84–85) =============== */
(() => {
  const MOD = [['newton', 'نيوتن: دقائق'], ['huygens', 'هايجنز: موجات'], ['maxwell', 'ماكسويل: كهرومغناطيسية'], ['planck', 'بلانك: فوتونات']];
  const INFO = {
    newton: ['النظرية الدقائقية (نيوتن): الضوء سيل من جسيمات صغيرة جداً (corpuscles) تنتشر في وسط منتظم.', 'فسّرت: الانعكاس ✔ والانتشار بخطوط مستقيمة ✔', 'لكن تفسيرها لظاهرة الانكسار كان خاطئاً ✘'],
    huygens: ['النظرية الموجية (هايجنز): الضوء موجات.', 'فسّرت: الانعكاس ✔ الانكسار ✔ التداخل ✔ الحيود ✔', 'لم تستطع أي نظرية منفردة تفسير كل الظواهر.'],
    maxwell: ['النظرية الكهرومغناطيسية (ماكسويل، القرن 19): كل شعاع ضوئي موجات كهرومغناطيسية.', 'مجال كهربائي E عمودي على مجال مغناطيسي B.', 'أخفقت في تفسير إشعاع الجسم الأسود والظاهرة الكهروضوئية ✘'],
    planck: ['نظرية الكم (ماكس بلانك): الضوء يُشع على هيئة حزم محددة من الطاقة غير قابلة للتجزئة تسمى كمّات (فوتونات).', 'طاقة الفوتون تتناسب طردياً مع تردد الإشعاع: E = h f', 'فسّرت إشعاع الجسم الأسود والظاهرة الكهروضوئية ✔'] };
  const D = { id: 'g10_l_theory', page: 84, fig: 'الشكل 2-5',
    desc: 'الضوء ينتشر بخطوط مستقيمة في الوسط المتجانس (الشكل 2-5: شمعة وثلاث بطاقات مثقوبة). وفُسِّرت طبيعة الضوء بفرضيتين: الدقائقية (نيوتن) والموجية (هايجنز)، ثم الكهرومغناطيسية (ماكسويل) ونظرية الكم (بلانك).',
    tags: 'انتشار الضوء خطوط مستقيمة نظرية دقائقية موجية نيوتن هايجنز ماكسويل بلانك فوتون',
    tools: ['شمعة', 'ثلاث بطاقات مثقوبة على حوامل', 'العين'],
    steps: ['انظر إلى لهب الشمعة عبر ثقوب البطاقات الثلاث: الضوء يصل إلى العين لأن الثقوب على استقامة واحدة.', 'اسحب البطاقة الوسطى إلى الأعلى أو الأسفل: لماذا لا ترى اللهب؟', 'أعدها حتى تستقيم الثقوب فيعود الضوء.', 'اختر نظرية من الأزرار (نيوتن، هايجنز، ماكسويل، بلانك) وشاهد كيف تصف كل نظرية الضوء نفسه.'],
    concl: ['الضوء ينتشر في الوسط المتجانس بخطوط مستقيمة.', 'النظرية الدقائقية فسّرت الانعكاس والانتشار المستقيم وأخفقت في الانكسار.', 'النظرية الموجية فسّرت الانعكاس والانكسار والتداخل والحيود.', 'الضوء موجات كهرومغناطيسية (ماكسويل)، ويُشع على هيئة فوتونات طاقتها E = h f (بلانك).'],
    laws: ['g10_hf'],
    controls: [TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { S.m = 'newton'; S.cy = null; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q45.L(S), ty = h * (ph ? .5 : .6), fy = ty - 90; const xs = [0, 1, 2].map(i => L + (w - L) * (.34 + i * .17)); return { w, h, ph, L, ty, fy, fx: L + (w - L) * .12, xs, ex: L + (w - L) * .9 }; },
    path(S, g) { // ray from flame through hole 1 (pinhole); returns points & whether it reaches the eye
      const F = [g.fx, g.fy], H1 = [g.xs[0], S.cy[0]]; const d = Q26.nrm([H1[0] - F[0], H1[1] - F[1]]); const pts = [F, H1]; let ok = true;
      for (let i = 1; i < 3; i++) { const t = (g.xs[i] - F[0]) / d[0], y = F[1] + d[1] * t; if (Math.abs(y - S.cy[i]) > 8) { pts.push([g.xs[i], y]); ok = false; break; } pts.push([g.xs[i], y]); }
      if (Math.abs(S.cy[0] - g.fy) > 8) ok = false;
      if (ok) { const t = (g.ex - F[0]) / d[0]; pts.push([g.ex, F[1] + d[1] * t]); } return { pts, ok, d }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10.5 : 12; if (!S.cy) S.cy = [g.fy, g.fy, g.fy];
      Q26.room(ctx, w, h, g.ty, { top: '#0b1120', bot: '#1e293b' });
      const P = D.path(S, g);
      // the light along the path in the chosen model
      const pts = P.pts; let Ltot = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push([Ltot, l, pts[i - 1], pts[i]]); Ltot += l; }
      const at = s => { for (const q of seg) if (s <= q[0] + q[1]) { const f = (s - q[0]) / q[1]; return [q[2][0] + (q[3][0] - q[2][0]) * f, q[2][1] + (q[3][1] - q[2][1]) * f]; } return pts[pts.length - 1]; };
      const v = 140, t = S.t, dir = P.d, nx = -dir[1], ny = dir[0];
      Q26.ray(ctx, pts, 'rgba(253,224,71,.55)', { w: 1.2, arrows: false, glow: true });
      K.raw(ctx, () => { ctx.save();
        if (S.m === 'newton') { for (let s = (t * v) % 28; s < Ltot; s += 28) { const q = at(s); ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(q[0], q[1], 3.6, 0, TAU); ctx.fill(); } }
        else if (S.m === 'huygens') { ctx.strokeStyle = 'rgba(253,224,71,.9)'; ctx.lineWidth = 2; for (let s = (t * v) % 22; s < Ltot; s += 22) { const q = at(s); ctx.beginPath(); ctx.moveTo(q[0] - nx * 11, q[1] - ny * 11); ctx.quadraticCurveTo(q[0] + dir[0] * 4, q[1] + dir[1] * 4, q[0] + nx * 11, q[1] + ny * 11); ctx.stroke(); } }
        else if (S.m === 'maxwell') { ['#fde047', '#60a5fa'].forEach((c, j) => { ctx.strokeStyle = c; ctx.lineWidth = 1.8; ctx.beginPath(); for (let s = 0; s < Ltot; s += 2) { const q = at(s), a = Math.sin(s / 36 * TAU - t * 6) * 12; const x = j ? q[0] + a * .45 : q[0] + nx * a, y = j ? q[1] + a * .4 : q[1] + ny * a; s ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }); }
        else { for (let s0 = (t * v) % 90; s0 < Ltot; s0 += 90) { ctx.strokeStyle = '#fde047'; ctx.lineWidth = 2; ctx.beginPath(); for (let s = s0 - 30; s < s0 + 30; s += 1.5) { if (s < 0 || s > Ltot) continue; const q = at(s), e = Math.exp(-Math.pow((s - s0) / 13, 2)), a = Math.sin(s / 9 * TAU) * 9 * e; s === s0 - 30 ? ctx.moveTo(q[0] + nx * a, q[1] + ny * a) : ctx.lineTo(q[0] + nx * a, q[1] + ny * a); } ctx.stroke(); const q = at(s0); ctx.fillStyle = 'rgba(253,224,71,.25)'; ctx.beginPath(); ctx.arc(q[0], q[1], 14, 0, TAU); ctx.fill(); } }
        ctx.restore(); });
      // cards with holes on stands
      g.xs.forEach((x, i) => { K.raw(ctx, () => { const y = S.cy[i], H = 120; ctx.fillStyle = '#f5f5f4'; ctx.strokeStyle = '#a8a29e'; ctx.lineWidth = 1; ctx.fillRect(x - 4, y - H / 2, 8, H); ctx.fillStyle = '#0b1120'; ctx.fillRect(x - 5, y - 6, 10, 12); ctx.fillStyle = '#78716c'; ctx.fillRect(x - 2, y + H / 2, 4, g.ty - y - H / 2); ctx.fillRect(x - 14, g.ty - 4, 28, 4); });
        if (p.lab !== false && !g.ph) Q45.T(ctx, 'بطاقة ' + (i + 1), x, S.cy[i] - 72, { s: 10.5, w: 800, c: '#e7e5e4' }); });
      Q26.candle(ctx, g.fx, g.fy + 62, 1.2, S.t, true);
      Q26.eye(ctx, g.ex + 18, g.fy, g.ph ? .9 : 1.1, Math.PI);
      Q26.verdict(ctx, g.ex - 10, g.fy + 50, P.ok, P.ok ? 'العين ترى اللهب' : 'لا ترى اللهب');
      // model chips
      const C = Q45.chips(S, 'm', MOD, g.ty + (g.ph ? 26 : 30), S.m, () => { }, { bw: 190 }); Q45.drawChips(ctx, C);
      const I = INFO[S.m]; Q45.card(ctx, S, I.map((t, i) => ({ t, c: i ? '#334155' : '#b45309', w: i ? 700 : 900, s: 12 })), { title: MOD.find(q => q[0] === S.m)[1], y: g.ph ? g.ty + 50 : g.ty + 56, x: w - 12, wd: g.ph ? w - 24 : Math.min(560, w - g.L - 20), f: 1 });
      Q45.banner(ctx, w, P.ok ? 'الثقوب على استقامة واحدة: الضوء ينتشر بخط مستقيم' : 'اسحب البطاقات حتى تستقيم الثقوب الثلاثة');
    },
    drags(S) { if (!S.W || !S.cy) return []; const g = D.geo(S);
      const L = g.xs.map((x, i) => ({ id: 'card' + i, x, y: S.cy[i], w: 30, h: 120, axis: 'y', keep: true, tip: 'اسحب البطاقة إلى الأعلى أو الأسفل', idle: i === 1 ? 'اسحب البطاقة الوسطى ✋' : undefined, drag: (S2, d) => { let y = clamp(d.oy + d.y - d.sy, 70, g.ty - 64); if (Math.abs(y - g.fy) < 6) y = g.fy; S2.cy[i] = y; } }));
      return L.concat(Q45.chips(S, 'm', MOD, g.ty + (g.ph ? 26 : 30), S.m, (S2, k) => { S2.m = k; }, { bw: 190 })); },
    readings(S) { if (!S.cy) return []; const P = D.path(S, D.geo(S)); return [rd('الثقوب', P.ok ? 'على استقامة واحدة' : 'غير مستقيمة'), rd('النظرية', MOD.find(q => q[0] === S.m)[1])]; },
    explain(S) { if (!S.cy) return ''; const P = D.path(S, D.geo(S)); return Q26.ex(P.ok ? 'ترى العين لهب الشمعة عبر الثقوب الثلاثة.' : 'إحدى البطاقات تحجب الضوء فلا يصل إلى العين.', 'الضوء ينتشر في الوسط المتجانس <b>بخطوط مستقيمة</b>، فلا يمر عبر الثقوب إلا إذا كانت على استقامة واحدة مع اللهب والعين. ' + INFO[S.m][0], 'تكوّن الظل وأشعة الشمس بين الأشجار دليل على انتشار الضوء بخطوط مستقيمة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A3 — الطيف الكهرومغناطيسي، f = c/λ و E = h f (الشكل 3-5، مثال 1 و 2 ص 86، س5 ص 94) =============== */
(() => {
  const BANDS = [[3, -0.0, 'موجات الراديو والتلفاز', '#a78bfa'], [0, -3, 'الموجات الدقيقة (المايكروية)', '#818cf8'], [-3, -6.155, 'الأشعة تحت الحمراء', '#f87171'], [-6.155, -6.398, 'الضوء المرئي', null], [-6.398, -8, 'الأشعة فوق البنفسجية', '#c084fc'], [-8, -11, 'الأشعة السينية X', '#38bdf8'], [-11, -14, 'أشعة كاما γ', '#34d399']];
  const band = lg => (BANDS.find(b => lg <= b[0] && lg > b[1]) || BANDS[lg > 0 ? 0 : 6]);
  const NAME = nm => nm >= 620 ? 'أحمر' : nm >= 590 ? 'برتقالي' : nm >= 570 ? 'أصفر' : nm >= 495 ? 'أخضر' : nm >= 450 ? 'أزرق' : nm >= 425 ? 'نيلي' : 'بنفسجي';
  const EX = {
    e1: { nm: 400, title: 'مثال 1 (ص 86)', q: 'احسب تردد الضوء البنفسجي الذي طوله الموجي 400 nm ، c = 3×10⁸ m/s', lines: ['f = c / λ', 'f = 3×10⁸ / (400×10⁻⁹)', 'f = 7.5×10¹⁴ Hz  (تردد الضوء البنفسجي)'] },
    e2: { nm: 555, title: 'مثال 2 (ص 86)', q: 'ما طاقة فوتون الإشعاع للضوء الأخضر الذي طوله الموجي 555 nm ؟', lines: ['E = h f = h c / λ', 'λ = 555 nm = 555×10⁻⁹ m', 'E = 6.63×10⁻³⁴ × 3×10⁸ / (555×10⁻⁹)', 'E = 3.58×10⁻¹⁹ J'] },
    q5: { nm: 600, title: 'س5 مسائل (ص 94)', q: 'فوتون ضوئي طول موجة إشعاعه 600 nm. ما مقدار طاقة هذا الكم؟ h = 6.63×10⁻³⁴ J.s', lines: ['E = h c / λ', 'E = 6.63×10⁻³⁴ × 3×10⁸ / (600×10⁻⁹)', 'E = 3.315×10⁻¹⁹ J'] } };
  const D = { id: 'g10_l_spectrum', page: 85, fig: 'الشكل 3-5 + مثال 1، مثال 2',
    desc: 'الطيف الكهرومغناطيسي يتضمن ترددات موجات الضوء المرئي التي تمتد أطوالها الموجية من نحو 400 nm (البنفسجي) إلى 700 nm (الأحمر). التردد = سرعة الضوء ÷ الطول الموجي f = c/λ، وطاقة الفوتون E = h f.',
    tags: 'الطيف الكهرومغناطيسي طول موجي تردد فوتون ثابت بلانك طاقة الفوتون f=c/λ E=hf راديو أشعة سينية كاما',
    tools: ['الطيف الكهرومغناطيسي (الشكل 3-5)'],
    steps: ['اسحب المؤشر على الطيف الكهرومغناطيسي من موجات الراديو إلى أشعة كاما، ولاحظ اسم كل منطقة.', 'اسحب المؤشر الثاني على شريط الضوء المرئي (400–700 nm) واختر لوناً.', 'لاحظ: كلما قصر الطول الموجي زاد التردد f = c/λ وزادت طاقة الفوتون E = h f.', 'اضغط «مثال 1» أو «مثال 2» أو «س5» ثم «الخطوة التالية» لحل مثال الكتاب على الجهاز.'],
    concl: ['الضوء المرئي جزء صغير من الطيف الكهرومغناطيسي (400 nm – 700 nm تقريباً).', 'f = c / λ : التردد يتناسب عكسياً مع الطول الموجي.', 'E = h f : طاقة الفوتون تتناسب طردياً مع التردد، لذلك فوتون البنفسجي أكبر طاقة من فوتون الأحمر.', 'مثال 1: f البنفسجي (400 nm) = 7.5×10¹⁴ Hz ، مثال 2: E الأخضر (555 nm) = 3.58×10⁻¹⁹ J.'],
    laws: ['g10_fc', 'g10_hf'],
    controls: [R('nm', 'الطول الموجي في المرئي', 400, 700, 555, 1, 'nm', (v, S) => { if (S) { S.lg = Math.log10(v * 1e-9); if (S.ex && EX[S.ex].nm !== v) S.ex = null; } }), TG('ph', 'الفوتونات', true, null, 'particles')],
    setup(S) { S.lg = Math.log10(555e-9); S.ex = null; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q45.L(S), x0 = L + 6, x1 = w - 18, by = ph ? 70 : 62, bh = ph ? 34 : 40; return { w, h, ph, L, x0, x1, by, bh, X: lg => x0 + (3 - lg) / 17 * (x1 - x0), LG: x => 3 - (x - x0) / (x1 - x0) * 17, vy: by + bh + (ph ? 70 : 78), vh: ph ? 26 : 30 }; },
    lam(S) { return Math.pow(10, S.lg); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, lam = D.lam(S), f = 3e8 / lam, E = 6.63e-34 * f, B = band(S.lg);
      G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#0b1120'; ctx.fillRect(0, 0, w, h); });
      // full EM bar
      K.raw(ctx, () => { BANDS.forEach(b => { const xa = g.X(b[0]), xb = g.X(b[1]); if (b[3]) { ctx.fillStyle = b[3]; ctx.fillRect(xa, g.by, xb - xa, g.bh); } else { for (let x = xa; x < xb; x++) { ctx.fillStyle = wlColor(700 - (x - xa) / (xb - xa) * 300); ctx.fillRect(x, g.by, 1.4, g.bh); } } }); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.strokeRect(g.x0, g.by, g.x1 - g.x0, g.bh); });
      BANDS.forEach(b => { const xa = g.X(b[0]), xb = g.X(b[1]); if (xb - xa > 46) Q45.T(ctx, b[2], (xa + xb) / 2, g.by + g.bh / 2, { s: g.ph ? 8 : 10, w: 900, c: '#0f172a' }); });
      for (let lg = 3; lg >= -14; lg -= (g.ph ? 3 : 2)) Q45.T(ctx, '10' + Q31.sup(lg), g.X(lg), g.by - 10, { s: fs - .5, w: 700, c: '#cbd5e1' });
      Q45.T(ctx, 'الطول الموجي λ (m)', (g.x0 + g.x1) / 2, g.by - 28, { s: fs, w: 800, c: '#fde68a' });
      // zoom lines to the visible strip
      const va = g.X(-6.155), vb = g.X(-6.398);
      K.raw(ctx, () => { ctx.strokeStyle = 'rgba(226,232,240,.5)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(va, g.by + g.bh); ctx.lineTo(g.x0, g.vy); ctx.moveTo(vb, g.by + g.bh); ctx.lineTo(g.x1, g.vy); ctx.stroke(); ctx.setLineDash([]);
        for (let x = g.x0; x <= g.x1; x++) { ctx.fillStyle = wlColor(700 - (x - g.x0) / (g.x1 - g.x0) * 300); ctx.fillRect(x, g.vy, 1.4, g.vh); } });
      const XV = nm => g.x0 + (700 - nm) / 300 * (g.x1 - g.x0);
      for (let nm = 700; nm >= 400; nm -= 50) Q45.T(ctx, nm + (nm % 100 ? '' : ' nm'), XV(nm), g.vy + g.vh + 14, { s: fs - .5, w: 700, c: '#e2e8f0' });
      Q45.T(ctx, 'الأحمر (7×10⁻⁷ m)', g.x0 + 60, g.vy - 10, { s: fs - .5, w: 800, c: '#fca5a5' }); Q45.T(ctx, 'البنفسجي (4×10⁻⁷ m)', g.x1 - 66, g.vy - 10, { s: fs - .5, w: 800, c: '#d8b4fe' });
      // markers
      const mx = g.X(S.lg); K.raw(ctx, () => { ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(mx - 5, g.by - 4, 10, g.bh + 8); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(mx, g.by + g.bh + 6); ctx.lineTo(mx - 8, g.by + g.bh + 18); ctx.lineTo(mx + 8, g.by + g.bh + 18); ctx.fill(); });
      const vis = B[2] === 'الضوء المرئي', nm = lam * 1e9;
      if (vis) { const x = XV(nm); K.raw(ctx, () => { ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(x - 5, g.vy - 4, 10, g.vh + 8); }); }
      // wave + photons
      const wy = g.vy + g.vh + (g.ph ? 70 : 84), A = g.ph ? 20 : 26, lamPx = clamp(14 + (S.lg + 14) / 17 * 150, 8, 200), col = vis ? wlColor(nm) : (B[3] || '#fde047');
      Q26.wave(ctx, g.x0, g.x1, wy, lamPx, A, col, S.t * 5, 2.6);
      if (S.p.ph !== false) { const n = 5; for (let i = 0; i < n; i++) { const x = g.x0 + ((S.t * 90 + i * (g.x1 - g.x0) / n) % (g.x1 - g.x0)); const r = clamp(4 + (S.lg + 14) * -0.0 + Math.log10(E / 1e-25) * 1.4, 4, 22); K.raw(ctx, () => { const gr = ctx.createRadialGradient(x, wy, 1, x, wy, r * 1.6); gr.addColorStop(0, '#fff'); gr.addColorStop(.4, col); gr.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, wy, r * 1.6, 0, TAU); ctx.fill(); }); } }
      Q45.T(ctx, B[2] + (vis ? ' — ' + NAME(nm) : ''), (g.x0 + g.x1) / 2, wy - A - 18, { s: fs + 1.5, w: 900, c: '#fff', bg: 'rgba(15,23,42,.8)' });
      // buttons (examples)
      const by = wy + A + (g.ph ? 30 : 36); const C = Q45.chips(S, 'ex', [['e1', 'مثال 1: 400 nm'], ['e2', 'مثال 2: 555 nm'], ['q5', 'س5: 600 nm'], ['nx', '⬇ الخطوة التالية']], by, S.ex, () => { }, { bw: 170 }); C[3]._col = '#be185d'; C[3]._on = false; Q45.drawChips(ctx, C);
      const cy = by + 26;
      if (S.ex) Q45.steps(ctx, S, Object.assign({}, EX[S.ex], { k: S.k }), { y: cy, x: w - 12, wd: g.ph ? w - 24 : Math.min(520, (w - g.L) * .6), f: 1 });
      const L2 = [{ t: 'λ = ' + Q45.sci(lam, 3, 'm') + (vis ? '  = ' + nm.toFixed(0) + ' nm' : ''), mono: 1 }, { t: 'f = c / λ = ' + Q45.sci(f, 3, 'Hz'), mono: 1, c: '#7c3aed' }, { t: 'E = h f = ' + Q45.sci(E, 3, 'J'), mono: 1, c: '#be185d', w: 900 }];
      if (!S.ex || !g.ph) Q45.card(ctx, S, L2, { title: 'الحساب الحي', y: S.ex && !g.ph ? cy : cy, x: S.ex ? g.L + (g.ph ? w - 24 : Math.min(330, (w - g.L) * .38)) : w - 12, wd: g.ph ? w - 24 : Math.min(330, (w - g.L) * .38), f: 1 });
      Q45.banner(ctx, w, 'اسحب المؤشر على الطيف الكهرومغناطيسي أو على شريط الضوء المرئي');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), XV = nm => g.x0 + (700 - nm) / 300 * (g.x1 - g.x0); const lam = D.lam(S), vis = band(S.lg)[2] === 'الضوء المرئي';
      const set = (S2, lg) => { S2.lg = clamp(lg, -13.5, 2.8); S2.ex = null; const nm = Math.pow(10, S2.lg) * 1e9; if (nm >= 400 && nm <= 700) setParam(S2, 'nm', Math.round(nm), false); };
      const L = [{ id: 'em', x: g.X(S.lg), y: g.by + g.bh / 2, w: 36, h: g.bh + 30, axis: 'x', keep: true, tip: 'اسحب على الطيف الكهرومغناطيسي', idle: 'اسحب المؤشر ✋', drag: (S2, d) => set(S2, g.LG(d.x)) },
        { id: 'vis', x: vis ? XV(lam * 1e9) : (g.x0 + g.x1) / 2, y: g.vy + g.vh / 2, w: vis ? 36 : g.x1 - g.x0, h: g.vh + 20, axis: 'x', keep: true, tip: 'اسحب على شريط الضوء المرئي', drag: (S2, d) => { const nm = clamp(700 - (d.x - g.x0) / (g.x1 - g.x0) * 300, 400, 700); S2.lg = Math.log10(nm * 1e-9); S2.ex = null; setParam(S2, 'nm', Math.round(nm), false); } }];
      const wy = g.vy + g.vh + (g.ph ? 70 : 84), A = g.ph ? 20 : 26, by = wy + A + (g.ph ? 30 : 36);
      return L.concat(Q45.chips(S, 'ex', [['e1', 'مثال 1'], ['e2', 'مثال 2'], ['q5', 'س5'], ['nx', 'التالية']], by, S.ex, (S2, k) => { if (k === 'nx') { if (!S2.ex) { S2.ex = 'e1'; S2.k = 0; S2.lg = Math.log10(400e-9); setParam(S2, 'nm', 400, false); } S2.k = Math.min(S2.k + 1, EX[S2.ex].lines.length); return; } S2.ex = k; S2.k = 0; S2.lg = Math.log10(EX[k].nm * 1e-9); setParam(S2, 'nm', EX[k].nm, false); }, { bw: 170 })); },
    readings(S) { const lam = D.lam(S), f = 3e8 / lam; return [rd('المنطقة', band(S.lg)[2]), rd('الطول الموجي λ', Q45.sci(lam, 3, 'm')), rd('التردد f = c/λ', Q45.sci(f, 3, 'Hz')), rd('طاقة الفوتون E = hf', Q45.sci(6.63e-34 * f, 3, 'J'))]; },
    record(S) { const lam = D.lam(S), f = 3e8 / lam; return { b: band(S.lg)[2], l: Q45.sci(lam, 3), f: Q45.sci(f, 3), E: Q45.sci(6.63e-34 * f, 3) }; },
    cols: [['b', 'المنطقة'], ['l', 'λ (m)'], ['f', 'f (Hz)'], ['E', 'E (J)']],
    explain(S) { const lam = D.lam(S), f = 3e8 / lam, B = band(S.lg); return Q26.ex('المؤشر في منطقة <b>' + B[2] + '</b>: λ = ' + Q45.sci(lam, 3, 'm') + ' ، f = ' + Q45.sci(f, 3, 'Hz') + ' ، وطاقة الفوتون ' + Q45.sci(6.63e-34 * f, 3, 'J') + '.', 'جميع الموجات الكهرومغناطيسية تسير في الفراغ بسرعة الضوء c ، فإذا قصر الطول الموجي زاد التردد (f = c/λ) وزادت طاقة الفوتون (E = h f). لذلك أشعة كاما والأشعة السينية خطرة، وموجات الراديو آمنة.', 'السنة الضوئية: المسافة التي يقطعها الضوء في الفراغ في 365 يوماً، وتقدر بنحو 10¹³ km.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== Q45W — Huygens wave engine: every point of the opening is a source of wavelets =============== */
const Q45W = {
  /* phasor field C = Σ e^{ikr}/√r over a grid; value at time t: Re(C e^{-iωt}) */
  build(src, rect, cell, lam) {
    const nx = Math.max(1, Math.ceil(rect.w / cell)), ny = Math.max(1, Math.ceil(rect.h / cell)), re = new Float32Array(nx * ny), im = new Float32Array(nx * ny), k = TAU / lam, n = src.length;
    for (let j = 0; j < ny; j++) { const y = rect.y + (j + .5) * cell; for (let i = 0; i < nx; i++) { const x = rect.x + (i + .5) * cell; let a = 0, b = 0;
      for (let s = 0; s < n; s++) { const dx = x - src[s][0], dy = y - src[s][1], r = Math.sqrt(dx * dx + dy * dy), q = 1 / Math.sqrt(r + lam * .5); a += q * Math.cos(k * r); b += q * Math.sin(k * r); }
      re[j * nx + i] = a; im[j * nx + i] = b; } }
    const m = []; for (let q = 0; q < re.length; q += 7) m.push(Math.hypot(re[q], im[q])); m.sort((a, b) => a - b); const sc = Math.max(1e-6, m[Math.floor(m.length * .9)] || 1);
    return { nx, ny, re, im, sc, rect, cell };
  },
  val(F, x, y, wt) { const i = Math.floor((x - F.rect.x) / F.cell), j = Math.floor((y - F.rect.y) / F.cell); if (i < 0 || j < 0 || i >= F.nx || j >= F.ny) return 0; const q = j * F.nx + i; return (F.re[q] * Math.cos(wt) + F.im[q] * Math.sin(wt)) / F.sc; },
  amp(F, x, y) { const i = Math.floor((x - F.rect.x) / F.cell), j = Math.floor((y - F.rect.y) / F.cell); if (i < 0 || j < 0 || i >= F.nx || j >= F.ny) return 0; const q = j * F.nx + i; return Math.hypot(F.re[q], F.im[q]) / F.sc; },
  col(v, P) { P = P || Q45W.SEA; v = clamp(v, -1, 1); const t = v > 0 ? P[2] : P[0], f = Math.abs(v); return [P[1][0] + (t[0] - P[1][0]) * f, P[1][1] + (t[1] - P[1][1]) * f, P[1][2] + (t[2] - P[1][2]) * f]; },
  SEA: [[8, 47, 73], [3, 105, 161], [224, 242, 254]],
  TANK: [[30, 41, 59], [71, 85, 105], [241, 245, 249]],
  draw(ctx, F, wt, P) {
    let c = F._cv; if (!c || c.width !== F.nx || c.height !== F.ny) { c = F._cv = document.createElement('canvas'); c.width = F.nx; c.height = F.ny; }
    const cx = c.getContext('2d'), img = cx.createImageData(F.nx, F.ny), d = img.data, cw = Math.cos(wt), sw = Math.sin(wt);
    for (let q = 0; q < F.re.length; q++) { const v = (F.re[q] * cw + F.im[q] * sw) / F.sc, k = Q45W.col(v, P); d[q * 4] = k[0]; d[q * 4 + 1] = k[1]; d[q * 4 + 2] = k[2]; d[q * 4 + 3] = 255; }
    cx.putImageData(img, 0, 0); K.raw(ctx, () => { ctx.save(); ctx.imageSmoothingEnabled = true; ctx.drawImage(c, F.rect.x, F.rect.y, F.nx * F.cell, F.ny * F.cell); ctx.restore(); });
  },
  /* incoming plane wave in a rect, travelling +x (dir 'x') or +y (dir 'y'), phase 0 at (x0|y0) */
  plane(ctx, rect, lam, wt, dir, o0, P) { const k = TAU / lam; K.raw(ctx, () => { const st = 3; if (dir === 'x') for (let x = rect.x; x < rect.x + rect.w; x += st) { const c = Q45W.col(Math.cos(k * (x - o0) - wt), P); ctx.fillStyle = 'rgb(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ')'; ctx.fillRect(x, rect.y, st + .6, rect.h); }
    else for (let y = rect.y; y < rect.y + rect.h; y += st) { const c = Q45W.col(Math.cos(k * (y - o0) - wt), P); ctx.fillStyle = 'rgb(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ')'; ctx.fillRect(rect.x, y, rect.w, st + .6); } }); }
};

/* =============== B1 — المصدر النقطي للضوء: الفتحة d والطول الموجي λ (الشكل 4-5، ص 87) =============== */
(() => {
  const PPC = 18; // px per cm (ripple tank)
  const CASES = [['a', 'a) d ≫ λ'], ['b', 'b) d = λ'], ['c', 'c) d ≪ λ']];
  const kind = r => r > 2.5 ? 'a' : r >= .6 ? 'b' : 'c';
  const TXT = { a: 'd ≫ λ: الموجة تجتاز الفتحة وتستمر في الحركة بخط مستقيم (الشكل 4-5 a)', b: 'd ≈ λ: الموجات تنتشر من الفتحة في جميع الاتجاهات (الشكل 4-5 b)', c: 'd ≪ λ: الفتحة تعد مصدراً نقطياً للضوء (الشكل 4-5 c)' };
  const D = { id: 'g10_h_aperture', page: 87, fig: 'الشكل 4-5 (a, b, c)',
    desc: 'موجات الضوء تنتقل في الوسط المتجانس بخطوط مستقيمة. إذا صادفت حاجزاً فيه فتحة قطرها d: إذا كان d أكبر كثيراً من λ تجتاز الموجة الفتحة بخط مستقيم، وإذا كان d ≈ λ تنتشر في جميع الاتجاهات، وإذا كان d أصغر كثيراً من λ تعد الفتحة مصدراً نقطياً.',
    tags: 'مصدر نقطي فتحة حاجز طول موجي حيود d λ حوض الموجات',
    tools: ['حوض موجات (مولد موجات مستوية)', 'حاجز ذو فتحة يتغير قطرها d'],
    steps: ['اسحب طرفي الحاجز (المقبضين الأصفرين) لتغيير قطر الفتحة d.', 'اسحب طرف السهم λ فوق الموجات القادمة لتغيير الطول الموجي.', 'جرّب الحالات الثلاث بالأزرار a و b و c وقارن شكل الموجات خلف الحاجز.', 'متى تصبح الفتحة مصدراً نقطياً للضوء؟'],
    concl: ['d ≫ λ : تجتاز الموجة الفتحة بخط مستقيم (الشكل 4-5 a).', 'd = λ تقريباً : تنتشر الموجات من الفتحة في جميع الاتجاهات (الشكل 4-5 b).', 'd ≪ λ : تعد الفتحة مصدراً نقطياً تنتشر منه موجات دائرية (الشكل 4-5 c).'],
    laws: [],
    controls: [R('lam', 'الطول الموجي λ', .6, 3, 1.5, .1, 'cm'), TG('ar', 'أسهم اتجاه الانتشار', true, null, 'rays'), TG('src', 'نقاط المصادر الثانوية', false, null, 'charges')],
    setup(S) { S.d = 9; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = ph ? 0 : 64, y0 = ph ? 64 : 40, y1 = h - 36, bx = L + (w - L) * (ph ? .3 : .32); return { w, h, ph, L, y0, y1, bx, yc: (y0 + y1) / 2, cell: ph ? 5 : 4 }; },
    field(S, g) { const lam = S.p.lam * PPC, d = S.d * PPC, key = [lam, d, g.w, g.h].join(); if (S._fk === key && S._F) return S._F; const n = clamp(Math.ceil(d / (lam / 4)), 1, 90), src = []; for (let i = 0; i < n; i++) src.push([g.bx + 3, g.yc - d / 2 + (i + .5) * d / n]);
      S._F = Q45W.build(src, { x: g.bx + 4, y: g.y0, w: g.w - g.bx - 4, h: g.y1 - g.y0 }, g.cell, lam); S._F.src = src; S._fk = key; return S._F; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), lam = S.p.lam * PPC, d = S.d * PPC, wt = S.t * 4, F = D.field(S, g), r = S.d / S.p.lam, kd = kind(r), fs = g.ph ? 10.5 : 12;
      G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, w, h); });
      Q45W.plane(ctx, { x: g.L, y: g.y0, w: g.bx - g.L, h: g.y1 - g.y0 }, lam, wt, 'x', g.bx + 3, Q45W.TANK); Q45W.draw(ctx, F, wt, Q45W.TANK);
      // barrier
      K.raw(ctx, () => { ctx.fillStyle = '#111827'; ctx.fillRect(g.bx - 6, g.y0, 12, g.yc - d / 2 - g.y0); ctx.fillRect(g.bx - 6, g.yc + d / 2, 12, g.y1 - g.yc - d / 2); ctx.strokeStyle = '#000'; ctx.lineWidth = 1; ctx.strokeRect(g.bx - 6, g.y0, 12, g.yc - d / 2 - g.y0); ctx.strokeRect(g.bx - 6, g.yc + d / 2, 12, g.y1 - g.yc - d / 2);
        [g.yc - d / 2, g.yc + d / 2].forEach(y => { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(g.bx, y, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; ctx.stroke(); }); });
      if (S.p.src) F.src.forEach(q => K.raw(ctx, () => { ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(q[0], q[1], 2.6, 0, TAU); ctx.fill(); }));
      // d dimension
      K.raw(ctx, () => { ctx.strokeStyle = '#fde047'; ctx.lineWidth = 1.5; const x = g.bx + 22; ctx.beginPath(); ctx.moveTo(x, g.yc - d / 2); ctx.lineTo(x, g.yc + d / 2); ctx.stroke(); }); Q26.head(ctx, g.bx + 22, g.yc - d / 2, -Math.PI / 2, '#fde047', 6); Q26.head(ctx, g.bx + 22, g.yc + d / 2, Math.PI / 2, '#fde047', 6);
      Q45.T(ctx, 'd = ' + S.d.toFixed(1) + ' cm', g.bx + 30 + 34, g.yc, { s: fs, w: 900, c: '#0f172a', bg: '#fde047' });
      // λ handle on the incoming wave (crest to crest)
      const lx = g.L + 30, ly = g.y0 + 24; K.raw(ctx, () => { ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + lam, ly); ctx.stroke(); [lx, lx + lam].forEach(x => { ctx.beginPath(); ctx.moveTo(x, ly - 8); ctx.lineTo(x, ly + 8); ctx.stroke(); }); ctx.fillStyle = '#f472b6'; ctx.beginPath(); ctx.arc(lx + lam, ly, 7, 0, TAU); ctx.fill(); });
      Q45.T(ctx, 'λ = ' + S.p.lam.toFixed(1) + ' cm', lx + lam / 2, ly + 20, { s: fs, w: 900, c: '#fff', bg: '#be185d' });
      // book-style arrows
      if (S.p.ar !== false) { const col = '#ef4444', x0 = g.bx + 16, Lr = Math.min(170, (w - x0) * .5);
        if (kd === 'a') { for (let k = -2; k <= 2; k++) { const y = g.yc + k * d / 6; Q26.ray(ctx, [[g.L + 20, y], [x0 + Lr, y]], col, { w: 2.2, glow: false }); } }
        else { const n = kd === 'b' ? 7 : 9, spread = kd === 'b' ? 1.2 : 1.5; for (let k = 0; k < n; k++) { const a = -spread + 2 * spread * k / (n - 1); Q26.ray(ctx, [[g.bx + 2, g.yc], [g.bx + 2 + Math.cos(a) * Lr, g.yc + Math.sin(a) * Lr]], col, { w: 2.2, glow: false }); } for (let k = -2; k <= 2; k++) Q26.ray(ctx, [[g.L + 20, g.yc + k * 22], [g.bx - 10, g.yc + k * 22]], col, { w: 2, glow: false }); } }
      const C = Q45.chips(S, 'case', CASES, g.ph ? 36 : g.y1 - 22, kind(r), () => { }, { bw: 130, x0: g.ph ? 12 : g.bx + 40 }); Q45.drawChips(ctx, C);
      Q45.T(ctx, 'd / λ = ' + r.toFixed(2), w - 70, g.y0 + 22, { s: fs + 1, w: 900, c: '#0f172a', bg: '#fde047' });
      Q45.T(ctx, TXT[kd], g.ph ? w / 2 : (g.bx + w) / 2, g.ph ? g.y1 - 12 : g.y0 + 54, { s: fs, w: 900, c: '#fff', bg: 'rgba(15,23,42,.85)' });
      Q45.banner(ctx, w, 'اسحب طرفي الفتحة d وطرف السهم λ');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), lam = S.p.lam * PPC, d = S.d * PPC;
      const jaw = s => ({ id: 'jaw' + (s > 0 ? 'B' : 'T'), x: g.bx, y: g.yc + s * d / 2, r: 18, axis: 'y', keep: true, tip: 'اسحب لتغيير قطر الفتحة d', idle: s < 0 ? 'اسحب طرف الفتحة ✋' : undefined, drag: (S2, dd) => { S2.d = +clamp(2 * Math.abs(dd.y - g.yc) / PPC, .2, (g.y1 - g.y0 - 30) / PPC).toFixed(1); } });
      const L = [jaw(-1), jaw(1), { id: 'lam', x: g.L + 30 + lam, y: g.y0 + 24, r: 16, axis: 'x', keep: true, tip: 'اسحب لتغيير الطول الموجي λ', drag: (S2, dd) => setParam(S2, 'lam', +clamp((dd.x - g.L - 30) / PPC, .6, 3).toFixed(1)) }];
      return L.concat(Q45.chips(S, 'case', CASES, g.ph ? 36 : g.y1 - 22, kind(S.d / S.p.lam), (S2, k) => { const l = S2.p.lam; S2.d = +(k === 'a' ? Math.min(l * 6, (g.y1 - g.y0 - 30) / PPC) : k === 'b' ? l : Math.max(.2, l / 4)).toFixed(1); }, { bw: 130, x0: g.ph ? 12 : g.bx + 40 })); },
    readings(S) { const r = S.d / S.p.lam; return [rd('قطر الفتحة d', S.d.toFixed(1) + ' cm'), rd('الطول الموجي λ', S.p.lam.toFixed(1) + ' cm'), rd('d / λ', r.toFixed(2)), rd('الحالة', { a: 'd ≫ λ (خط مستقيم)', b: 'd ≈ λ (تنتشر)', c: 'd ≪ λ (مصدر نقطي)' }[kind(r)])]; },
    record(S) { const r = S.d / S.p.lam; return { d: S.d, l: S.p.lam, r: +r.toFixed(2), k: { a: 'خط مستقيم', b: 'تنتشر', c: 'مصدر نقطي' }[kind(r)] }; },
    cols: [['d', 'd (cm)'], ['l', 'λ (cm)'], ['r', 'd/λ'], ['k', 'شكل الموجة']],
    explain(S) { const kd = kind(S.d / S.p.lam); return Q26.ex(TXT[kd] + '.', 'وفق مبدأ هايجنز كل نقطة في الفتحة مصدر لموجات ثانوية. إذا كانت الفتحة واسعة (فيها نقاط كثيرة) تتجمع الموجات الثانوية في جبهة مستوية فتستمر الموجة بخط مستقيم، وكلما ضاقت الفتحة نسبة إلى λ قلّت النقاط فتنتشر الموجة دائرية كأنها من مصدر نقطي.', 'لهذا نسمع الصوت (λ كبير) من خلف باب مفتوح ولا نرى الضوء (λ صغير جداً) ينحني حول الباب.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — مبدأ هايجنز: بناء جبهة الموجة الجديدة (الشكل 5-5 a, b، ص 87–88) =============== */
(() => {
  const D = { id: 'g10_h_wavelets', page: 87, fig: 'الشكل 5-5 (a, b)',
    desc: 'مبدأ هايجنز: كل نقطة من نقاط جبهة الموجة الافتراضية تعد مصدراً نقطياً لتوليد موجات ثانوية كروية تسمى المويجات، تنتشر بعيداً عن المصدر بسرعة الموجة في ذلك الوسط. بعد زمن ما يكون الموضع الجديد لجبهة الموجة هو السطح المماس للمويجات.',
    tags: 'مبدأ هايجنز جبهة الموجة المويجات موجة مستوية موجة كروية السطح المماس',
    tools: ['جبهة موجة AA′ عند t = 0', 'نقاط على الجبهة (مصادر ثانوية)'],
    steps: ['اختر جبهة مستوية (الشكل 5-5 a) أو كروية (الشكل 5-5 b).', 'اسحب مقبض الزمن t (أو اضغط «▶ انشر») فتكبر المويجات من كل نقطة على الجبهة AA′.', 'لاحظ أن الجبهة الجديدة BB′ هي السطح المماس لجميع المويجات.', 'اضغط «الجبهة الجديدة» لتصبح BB′ جبهة جديدة وكرّر. في الكروية اسحب المصدر O.'],
    concl: ['كل نقطة على جبهة الموجة مصدر نقطي لمويجات ثانوية تنتشر بسرعة الموجة في الوسط.', 'جبهة الموجة الجديدة هي السطح المماس للمويجات بعد زمن Δt، وتبعد عن القديمة مسافة v Δt.', 'جبهة الموجة المستوية تبقى مستوية، والكروية تبقى كروية بنصف قطر أكبر.'],
    laws: [],
    controls: [R('n', 'عدد نقاط الجبهة', 3, 15, 7, 1, ''), R('v', 'سرعة الموجة v', 1, 4, 2, .5, 'cm/s')],
    setup(S) { S.m = 'pl'; S.tt = 0; S.play = 0; S.adv = 0; S.r0 = 60; S.O = null; },
    update(S, dt) { if (S.play) { S.tt += dt * .45; if (S.tt >= 1) { S.tt = 1; S.play = 0; } } },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q45.L(S), y0 = ph ? 70 : 56, y1 = h - (ph ? 120 : 110); return { w, h, ph, L, y0, y1, yc: (y0 + y1) / 2, Rm: (ph ? 22 : 30) * S.p.v, ty: h - (ph ? 92 : 78) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10.5 : 12, n = S.p.n | 0, R = S.tt * g.Rm;
      G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, w, h); ctx.strokeStyle = 'rgba(148,163,184,.25)'; ctx.lineWidth = 1; ctx.beginPath(); for (let x = g.L; x < w; x += 24) { ctx.moveTo(x, g.y0); ctx.lineTo(x, g.y1); } for (let y = g.y0; y < g.y1; y += 24) { ctx.moveTo(g.L, y); ctx.lineTo(w, y); } ctx.stroke(); });
      const pts = []; let env = null;
      if (S.m === 'pl') { const x = g.L + 60 + S.adv, H = g.y1 - g.y0 - 40; for (let i = 0; i < n; i++) pts.push([x, g.y0 + 20 + H * (n > 1 ? i / (n - 1) : .5)]);
        K.raw(ctx, () => { ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, g.y0 + 8); ctx.lineTo(x, g.y1 - 8); ctx.stroke(); }); Q45.T(ctx, 'A', x - 14, g.y0 + 12, { s: 14, w: 900, c: '#2563eb' }); Q45.T(ctx, 'A′', x - 16, g.y1 - 12, { s: 14, w: 900, c: '#2563eb' }); Q45.T(ctx, 't = 0', x, g.y1 + 14, { s: fs, w: 800, c: '#2563eb' });
        if (R > 2) env = () => { K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + R, g.y0 + 8); ctx.lineTo(x + R, g.y1 - 8); ctx.stroke(); }); Q45.T(ctx, 'B', x + R + 14, g.y0 + 12, { s: 14, w: 900, c: '#dc2626' }); Q45.T(ctx, 'B′', x + R + 16, g.y1 - 12, { s: 14, w: 900, c: '#dc2626' }); Q45.T(ctx, 't = Δt', x + R, g.y1 + 14, { s: fs, w: 800, c: '#dc2626' }); };
      } else { if (!S.O) S.O = [g.L + 70, g.yc]; const O = S.O, A = .85;
        for (let i = 0; i < n; i++) { const a = -A + 2 * A * (n > 1 ? i / (n - 1) : .5); pts.push([O[0] + Math.cos(a) * S.r0, O[1] + Math.sin(a) * S.r0]); }
        K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(O[0], O[1], 6, 0, TAU); ctx.fill(); ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(O[0], O[1], S.r0, -A - .12, A + .12); ctx.stroke(); }); Q45.T(ctx, 'O المصدر', O[0], O[1] + 20, { s: fs, w: 900, c: '#0f172a' });
        Q45.T(ctx, 'A', O[0] + Math.cos(-A - .2) * S.r0, O[1] + Math.sin(-A - .2) * S.r0, { s: 14, w: 900, c: '#2563eb' }); Q45.T(ctx, 'A′', O[0] + Math.cos(A + .2) * S.r0, O[1] + Math.sin(A + .2) * S.r0, { s: 14, w: 900, c: '#2563eb' });
        if (R > 2) env = () => { K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(O[0], O[1], S.r0 + R, -A - .12, A + .12); ctx.stroke(); }); Q45.T(ctx, 'B', O[0] + Math.cos(-A - .2) * (S.r0 + R), O[1] + Math.sin(-A - .2) * (S.r0 + R), { s: 14, w: 900, c: '#dc2626' }); Q45.T(ctx, 'B′', O[0] + Math.cos(A + .2) * (S.r0 + R), O[1] + Math.sin(A + .2) * (S.r0 + R), { s: 14, w: 900, c: '#dc2626' }); };
      }
      // wavelets
      pts.forEach(q => { K.raw(ctx, () => { if (R > 1) { ctx.strokeStyle = 'rgba(124,58,237,.75)'; ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.arc(q[0], q[1], R, 0, TAU); ctx.stroke(); ctx.setLineDash([]); } ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(q[0], q[1], 4.5, 0, TAU); ctx.fill(); }); });
      if (pts.length && R > 6) { const q = pts[(pts.length / 2) | 0]; const dir = S.m === 'pl' ? [1, 0] : Q26.nrm([q[0] - S.O[0], q[1] - S.O[1]]); K.force(ctx, q[0], q[1], dir[0] * R, dir[1] * R, 'v Δt', '#7c3aed', 2.4); }
      if (env) env();
      // time knob
      const tx0 = g.L + 40, tx1 = Math.min(w - 40, g.L + 380); K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(tx0, g.ty); ctx.lineTo(tx1, g.ty); ctx.stroke(); ctx.strokeStyle = '#7c3aed'; ctx.beginPath(); ctx.moveTo(tx0, g.ty); ctx.lineTo(tx0 + (tx1 - tx0) * S.tt, g.ty); ctx.stroke(); ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(tx0 + (tx1 - tx0) * S.tt, g.ty, 11, 0, TAU); ctx.fill(); });
      Q45.T(ctx, 'الزمن: Δt = ' + (S.tt * 1).toFixed(2) + ' s  ←  نصف قطر المويجة v Δt = ' + (S.tt * S.p.v).toFixed(2) + ' cm', (tx0 + tx1) / 2, g.ty - 20, { s: fs, w: 800, c: '#334155' });
      Q45.drawChips(ctx, D.chips(S, g));
      if (!g.ph) Q45.card(ctx, S, [{ t: 'كل نقطة على الجبهة AA′ مصدر لمويجة', c: '#7c3aed', w: 900 }, { t: 'الجبهة الجديدة BB′ = السطح المماس للمويجات', c: '#dc2626', w: 900 }, { t: 'المسافة بين الجبهتين = v Δt', c: '#334155' }], { title: S.m === 'pl' ? 'موجة مستوية (5-5 a)' : 'موجة كروية (5-5 b)', y: 44, wd: 330 });
      Q45.banner(ctx, w, 'اسحب مقبض الزمن لترى المويجات تبني الجبهة الجديدة');
    },
    chips(S, g) { const y = g.h - (g.ph ? 84 : 80); return Q45.chips(S, 'hw', [['pl', 'a) مستوية'], ['sp', 'b) كروية'], ['go', '▶ انشر'], ['nx', 'الجبهة الجديدة'], ['rs', '↺ من البداية']], y, S.m, (S2, k) => { if (k === 'pl' || k === 'sp') { S2.m = k; S2.tt = 0; S2.adv = 0; S2.r0 = 60; S2.play = 0; } else if (k === 'go') { if (S2.tt >= 1) S2.tt = 0; S2.play = 1; } else if (k === 'nx') { const R = S2.tt * g.Rm; if (S2.m === 'pl') { S2.adv += R; if (g.L + 60 + S2.adv > g.w - 60) S2.adv = 0; } else { S2.r0 += R; if (S2.r0 > Math.min(g.w - g.L, g.y1 - g.y0) * .75) S2.r0 = 60; } S2.tt = 0; } else { S2.tt = 0; S2.adv = 0; S2.r0 = 60; S2.play = 0; } }, { bw: 150 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), tx0 = g.L + 40, tx1 = Math.min(g.w - 40, g.L + 380);
      const L = [{ id: 'time', x: tx0 + (tx1 - tx0) * S.tt, y: g.ty, r: 18, axis: 'x', keep: true, tip: 'اسحب لتغيير الزمن Δt', idle: 'اسحب مقبض الزمن ✋', drag: (S2, d) => { S2.play = 0; S2.tt = clamp((d.x - tx0) / (tx1 - tx0), 0, 1); } }];
      if (S.m === 'sp' && S.O) L.push({ id: 'O', x: S.O[0], y: S.O[1], r: 16, axis: 'xy', keep: true, tip: 'اسحب المصدر O', drag: (S2, d) => { S2.O = [clamp(d.ox + d.x - d.sx, g.L + 20, g.w - 60), clamp(d.oy + d.y - d.sy, g.y0 + 20, g.y1 - 20)]; } });
      return L.concat(D.chips(S, g)); },
    readings(S) { return [rd('الجبهة', S.m === 'pl' ? 'مستوية' : 'كروية'), rd('Δt', S.tt.toFixed(2) + ' s'), rd('v Δt', (S.tt * S.p.v).toFixed(2) + ' cm'), rd('عدد المويجات', String(S.p.n | 0))]; },
    explain(S) { return Q26.ex('من كل نقطة على الجبهة AA′ تخرج مويجة دائرية نصف قطرها v Δt = ' + (S.tt * S.p.v).toFixed(2) + ' cm.', 'وفق <b>مبدأ هايجنز</b> كل نقطة على جبهة الموجة مصدر نقطي لمويجات ثانوية، والسطح المماس لها جميعاً هو الموضع الجديد لجبهة الموجة BB′. ' + (S.m === 'pl' ? 'الجبهة المستوية تبقى مستوية.' : 'الجبهة الكروية تبقى كروية ويزداد نصف قطرها.'), 'هكذا تتقدم موجات البحر وموجات الضوء خطوة بعد خطوة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B3 — موجات البحر وفتحة الميناء (الشكل 6-5، ص 88) =============== */
(() => {
  const D = { id: 'g10_h_harbor', page: 88, fig: 'الشكل 6-5',
    desc: 'الشكل 6-5 يظهر مبدأ هايجنز: موجات مستوية قادمة من بعيد نحو الشاطئ من مارة من فتحة في الجدار الحاجز (كاسر الأمواج) بهيئة موجات دائرية منتشرة نحو الخارج باتجاه الساحل.',
    tags: 'موجات البحر كاسر الأمواج ميناء فتحة موجات دائرية هايجنز حيود',
    tools: ['بحر وموجات مستوية', 'جدار حاجز فيه فتحة', 'قارب'],
    steps: ['اسحب طرفي الجدار الحاجز لتوسيع الفتحة أو تضييقها.', 'لاحظ كيف تخرج الموجات من الفتحة دائرية وتنتشر نحو الساحل.', 'اسحب القارب إلى أماكن مختلفة داخل الميناء: أين يكون البحر أهدأ؟', 'غيّر طول موجة البحر وقارن.'],
    concl: ['الفتحة في الجدار الحاجز تتصرف كمصدر لموجات ثانوية (مبدأ هايجنز).', 'كلما ضاقت الفتحة نسبة إلى طول الموجة انتشرت الموجات دائرية في جميع الاتجاهات.', 'خلف الجدار بعيداً عن الفتحة تكون الموجات أضعف، لذلك تحمي كاسرات الأمواج القوارب.'],
    laws: [],
    controls: [R('lam', 'طول موجة البحر', 20, 60, 36, 2, 'm')],
    setup(S) { S.g1 = null; S.bt = null; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = ph ? 0 : 64, y0 = ph ? 60 : 36, by = y0 + (h - y0) * .3, y1 = h - 64; return { w, h, ph, L, y0, by, y1, ppm: (ph ? 1.4 : 1.8), cell: ph ? 5 : 4 }; },
    field(S, g) { const lam = S.p.lam * g.ppm, key = [lam, S.g1, S.g2, g.w, g.h].join(); if (S._fk === key && S._F) return S._F; const d = S.g2 - S.g1, n = clamp(Math.ceil(d / (lam / 4)), 1, 90), src = []; for (let i = 0; i < n; i++) src.push([S.g1 + (i + .5) * d / n, g.by + 3]);
      S._F = Q45W.build(src, { x: g.L, y: g.by + 4, w: g.w - g.L, h: g.y1 - g.by - 4 }, g.cell, lam); S._fk = key; return S._F; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10.5 : 12; if (S.g1 == null) { const c = (g.L + w) / 2; S.g1 = c - 30; S.g2 = c + 30; S.bt = [c + (w - g.L) * .22, g.by + (g.y1 - g.by) * .5]; }
      const lam = S.p.lam * g.ppm, wt = S.t * 2.4, F = D.field(S, g);
      G.bg(ctx, w, h, false); Q45W.plane(ctx, { x: g.L, y: 0, w: w - g.L, h: g.by }, lam, wt, 'y', g.by + 3); Q45W.draw(ctx, F, wt);
      // beach
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.y1 - 10, 0, h); gr.addColorStop(0, '#fde68a'); gr.addColorStop(1, '#d97706'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(g.L, g.y1); for (let x = g.L; x <= w; x += 20) ctx.lineTo(x, g.y1 + Math.sin(x * .03) * 5); ctx.lineTo(w, h); ctx.lineTo(g.L, h); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.6)'; for (let x = g.L; x <= w; x += 6) { const a = Q45W.amp(F, x, g.y1 - 8); if (a > .5) ctx.fillRect(x, g.y1 - 3 + Math.sin(x * .03) * 5, 6, 3); } });
      // breakwater arms (rock texture)
      [[g.L, S.g1], [S.g2, w]].forEach(a => K.raw(ctx, () => { ctx.fillStyle = '#57534e'; ctx.fillRect(a[0], g.by - 7, a[1] - a[0], 14); ctx.fillStyle = '#78716c'; for (let x = a[0] + 6; x < a[1] - 4; x += 14) { ctx.beginPath(); ctx.arc(x, g.by - 2 + (x % 3), 6, 0, TAU); ctx.fill(); } }));
      [S.g1, S.g2].forEach(x => K.raw(ctx, () => { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x, g.by, 9, 0, TAU); ctx.fill(); ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; ctx.stroke(); }));
      Q45.T(ctx, 'كاسر الأمواج (جدار حاجز)', g.L + (S.g1 - g.L) / 2, g.by - 20, { s: fs, w: 900, c: '#fff', bg: 'rgba(41,37,36,.8)' });
      Q45.T(ctx, 'الفتحة = ' + ((S.g2 - S.g1) / g.ppm).toFixed(0) + ' m', (S.g1 + S.g2) / 2, g.by + 24, { s: fs, w: 900, c: '#0f172a', bg: '#fde047' });
      Q45.T(ctx, 'موجات مستوية قادمة من بعيد', (g.L + w) / 2, g.y0 + 10, { s: fs, w: 900, c: '#fff', bg: 'rgba(3,105,161,.8)' }); Q45.T(ctx, 'الساحل', w - 60, h - 30, { s: fs + 1, w: 900, c: '#7c2d12' });
      // boat
      const B = S.bt, a = Q45W.amp(F, B[0], B[1]), v = Q45W.val(F, B[0], B[1], wt); K.raw(ctx, () => { ctx.save(); ctx.translate(B[0], B[1] - v * 4); ctx.rotate(v * .22 * Math.min(1.5, a)); ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.moveTo(-22, -4); ctx.lineTo(22, -4); ctx.lineTo(14, 8); ctx.lineTo(-14, 8); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#f5f5f4'; ctx.fillRect(-2, -30, 3, 26); ctx.beginPath(); ctx.moveTo(1, -30); ctx.lineTo(18, -8); ctx.lineTo(1, -8); ctx.fill(); ctx.restore(); });
      Q45.T(ctx, a > .9 ? 'القارب يتأرجح بقوة 🌊' : a > .45 ? 'تأرجح متوسط' : 'مياه هادئة ✔', B[0], B[1] + 26, { s: fs, w: 900, c: '#fff', bg: a > .9 ? '#b91c1c' : a > .45 ? '#c2410c' : '#15803d' });
      Q45.banner(ctx, w, 'اسحب طرفي كاسر الأمواج، واسحب القارب');
    },
    drags(S) { if (!S.W || S.g1 == null) return []; const g = D.geo(S);
      return [{ id: 'gL', x: S.g1, y: g.by, r: 18, axis: 'x', keep: true, tip: 'اسحب طرف الجدار', idle: 'اسحب طرف الجدار ✋', drag: (S2, d) => { S2.g1 = clamp(d.x, g.L + 20, S2.g2 - 6); } },
        { id: 'gR', x: S.g2, y: g.by, r: 18, axis: 'x', keep: true, tip: 'اسحب طرف الجدار', drag: (S2, d) => { S2.g2 = clamp(d.x, S2.g1 + 6, g.w - 20); } },
        { id: 'boat', x: S.bt[0], y: S.bt[1] - 8, r: 28, axis: 'xy', keep: true, tip: 'اسحب القارب', drag: (S2, d) => { S2.bt = [clamp(d.ox + d.x - d.sx, g.L + 30, g.w - 30), clamp(d.oy + d.y - d.sy + 8, g.by + 30, g.y1 - 20)]; } }]; },
    readings(S) { if (S.g1 == null || !S._F) return []; const g = D.geo(S), d = (S.g2 - S.g1) / g.ppm; return [rd('عرض الفتحة', d.toFixed(0) + ' m'), rd('طول موجة البحر', S.p.lam + ' m'), rd('الفتحة ÷ طول الموجة', (d / S.p.lam).toFixed(2)), rd('ارتفاع الموج عند القارب', (Q45W.amp(S._F, S.bt[0], S.bt[1]) * 100 / 1.5).toFixed(0) + ' %')]; },
    explain(S) { return Q26.ex('الموجات المستوية تمر من فتحة كاسر الأمواج وتخرج منها <b>دائرية</b> تنتشر نحو الساحل.', 'كل نقطة في الفتحة مصدر لمويجات ثانوية (مبدأ هايجنز). عندما تكون الفتحة قريبة من طول الموجة أو أصغر تنتشر الموجات في جميع الاتجاهات كأنها من مصدر نقطي.', 'كاسرات الأمواج في الموانئ تجعل الماء خلفها هادئاً فتحمي القوارب.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — نشاط الكتاب: شدة الاستضاءة تتناسب عكسياً مع مربع البعد (ص 91) =============== */
(() => {
  const S1 = .1; // side of the lit square at r = 1 m (m)
  const D = { id: 'g10_p_activity', page: 91, fig: 'شكل النشاط ص 91',
    desc: 'نشاط: شدة الاستضاءة لمصدر ضوئي نقطي تتناسب عكسياً مع مربع بعد المصدر عن السطح المضاء. الأدوات: مصدر ضوئي، حاجز فيه فتحة مربعة، شاشة بيضاء. نجعل الشاشة على بعد r₁ = 1 m ثم 2 m ثم 3 m ونلاحظ مساحة المربع المضاء وشدة استضاءته.',
    tags: 'نشاط قانون التربيع العكسي شدة الاستضاءة مساحة مربع مضاء شاشة حاجز فتحة مربعة',
    tools: ['مصدر ضوئي نقطي', 'حاجز فيه فتحة مربعة', 'شاشة بيضاء', 'مسطرة مترية', 'مقياس الاستضاءة (لوكسميتر)'],
    steps: ['ثبّت الحاجز أمام المصدر الضوئي، واسحب الشاشة إلى البعد r₁ = 1 m: يظهر على الشاشة سطح مضاء مربع الشكل مساحته A₁.', 'اسحب الشاشة إلى r₂ = 2 m: كم مربعاً من A₁ يضيء الآن؟ وماذا حدث لقراءة مقياس الاستضاءة؟', 'اسحب الشاشة إلى r₃ = 3 m ولاحظ: A₃ = 9 A₁ وشدة الاستضاءة 1/9 مما كانت عليه.', 'سجّل القراءة عند كل بعد (زر «سجّل القراءة») وقارن العمود E × r² في الجدول.'],
    concl: ['بما أن السيل الضوئي Φ الساقط على السطح يبقى ثابتاً في الحالات الثلاث بينما تكبر المساحة A₁ ، 4A₁ ، 9A₁ فإن الاستضاءة تقل إلى 1/4 ثم 1/9.', 'E = Φ / 4πr² ⟸ E ∝ 1 / r²', 'شدة الاستضاءة على السطح المضاء تتناسب عكسياً مع مربع بعده عن المصدر الضوئي النقطي: E₁ / E₂ = r₂² / r₁²', 'حاصل الضرب E × r² ثابت ويساوي قوة إضاءة المصدر I.'],
    laws: ['g10_inv', 'g10_ill'],
    controls: [R('I', 'قوة إضاءة المصدر I', 4, 100, 36, 1, 'cd'), TG('cone', 'إظهار حزمة الضوء', true, null, 'rays')],
    setup(S) { S.r = 1; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q45.L(S), xL = L + (ph ? 26 : 50), ppm = (w - xL - (ph ? 40 : 70)) / 3.3, ty = h * (ph ? .4 : .44), ly = ty - (ph ? 90 : 120); return { w, h, ph, L, xL, ppm, ty, ly, xb: xL + .25 * ppm, fy: ty + 66 }; },
    E(S) { return S.p.I / (S.r * S.r); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10 : 11.5, r = S.r, xs = g.xL + r * g.ppm, side = S1 * r * g.ppm, E = D.E(S), E1 = p.I;
      G.bg(ctx, w, h, false); Q26.room(ctx, w, h, g.ty, { top: '#0f172a', bot: '#1e293b' });
      Q45.rule(ctx, g.xL, g.ty + 6, g.ppm, 3.2, { step: g.ph ? 1 : .5 });
      // light pyramid through the square hole
      const hb = S1 * .25 * g.ppm / 2;
      if (p.cone !== false) K.raw(ctx, () => { const a = clamp(E / E1, .05, 1); ctx.fillStyle = 'rgba(253,224,71,' + (.12 + .25 * a) + ')'; ctx.beginPath(); ctx.moveTo(g.xL, g.ly); ctx.lineTo(xs, g.ly - side / 2); ctx.lineTo(xs, g.ly + side / 2); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(253,224,71,.8)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(g.xL, g.ly); ctx.lineTo(xs, g.ly - side / 2); ctx.moveTo(g.xL, g.ly); ctx.lineTo(xs, g.ly + side / 2); ctx.stroke();
        ctx.setLineDash([3, 5]); ctx.strokeStyle = 'rgba(253,224,71,.35)'; [1, 2, 3].forEach(m => { const x = g.xL + m * g.ppm, s2 = S1 * m * g.ppm; ctx.beginPath(); ctx.moveTo(x, g.ly - s2 / 2); ctx.lineTo(x, g.ly + s2 / 2); ctx.stroke(); }); ctx.setLineDash([]); });
      // lamp box, barrier with hole
      Q45.lamp(ctx, g.xL, g.ly, g.ph ? .8 : 1, p.I);
      K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; ctx.fillRect(g.xb - 4, g.ly - 46, 8, 46 - hb); ctx.fillRect(g.xb - 4, g.ly + hb, 8, 46 - hb); ctx.fillStyle = '#4b5563'; ctx.fillRect(g.xb - 2, g.ly + 46, 4, g.ty - g.ly - 46); ctx.fillRect(g.xb - 12, g.ty - 4, 24, 4); });
      Q45.T(ctx, 'حاجز', g.xb, g.ly - 58, { s: fs, w: 800, c: '#cbd5e1' }); Q45.T(ctx, 'مصدر ضوئي', g.xL, g.ly + 34, { s: fs, w: 800, c: '#fde68a' });
      // the screen (side view)
      K.raw(ctx, () => { const H = Math.max(.42 * g.ppm, side + 20); ctx.fillStyle = '#f8fafc'; ctx.fillRect(xs, g.ly - H / 2, 7, H); ctx.fillStyle = 'rgba(253,224,71,' + clamp(E / E1, .08, 1) + ')'; ctx.fillRect(xs - 1, g.ly - side / 2, 3, side); ctx.fillStyle = '#64748b'; ctx.fillRect(xs + 2, g.ly + H / 2, 4, g.ty - g.ly - H / 2); ctx.fillRect(xs - 10, g.ty - 4, 26, 4); });
      Q45.T(ctx, 'شاشة بيضاء', xs + 4, g.ly - Math.max(.42 * g.ppm, side + 20) / 2 - 12, { s: fs, w: 800, c: '#e2e8f0' });
      Q45.T(ctx, 'r = ' + r.toFixed(2) + ' m', (g.xL + xs) / 2, g.ty - 14, { s: fs + 1, w: 900, c: '#0f172a', bg: '#fde047' });
      // front view of the screen with A1 grid
      const fv = g.ph ? Math.min(w - 24, 200) : Math.min(230, h - g.fy - 60), fx = g.ph ? (w - fv) / 2 : g.L + 20, fy = g.fy, cell = fv / 4, ps = cell * r;
      K.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.fillRect(fx, fy, fv, fv); const a = clamp(E / E1, .04, 1); ctx.fillStyle = 'rgba(250,204,21,' + (.15 + .85 * a) + ')'; const cx0 = fx + fv / 2 - ps / 2, cy0 = fy + fv / 2 - ps / 2; ctx.save(); ctx.beginPath(); ctx.rect(fx, fy, fv, fv); ctx.clip(); ctx.fillRect(cx0, cy0, ps, ps); ctx.restore();
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; for (let k = 0; k <= 4; k++) { ctx.beginPath(); ctx.moveTo(fx + k * cell, fy); ctx.lineTo(fx + k * cell, fy + fv); ctx.moveTo(fx, fy + k * cell); ctx.lineTo(fx + fv, fy + k * cell); ctx.stroke(); }
        ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2; ctx.strokeRect(fx + fv / 2 - cell / 2, fy + fv / 2 - cell / 2, cell, cell); });
      Q45.T(ctx, 'الشاشة من الأمام (كل مربع = A₁)', fx + fv / 2, fy - 12, { s: fs, w: 900, c: '#fde68a' });
      Q45.T(ctx, 'المساحة المضاءة = ' + (r * r).toFixed(r % 1 ? 2 : 0) + ' A₁', fx + fv / 2, fy + fv + 16, { s: fs + .5, w: 900, c: '#0f172a', bg: '#fde047' });
      Q45.luxMeter(ctx, fx + fv / 2 + Math.min(ps / 2 - 14, fv / 2 - 14) * 0, fy + fv / 2, E, { s: g.ph ? .8 : 1, dx: fv / 2 + 50, dy: 0 });
      // live card
      const ok = [1, 2, 3].find(m => Math.abs(r - m) < 1e-6);
      const L2 = [{ t: 'E = I / r² = ' + p.I + ' / ' + (r * r).toFixed(2) + ' = ' + (E >= 10 ? E.toFixed(1) : E.toFixed(2)) + ' Lux', mono: 1, c: '#b45309', w: 900 }, { t: 'E / E₁ = ' + (E / E1).toFixed(3) + (ok ? '  = 1/' + ok * ok : ''), mono: 1 }, { t: 'E × r² = ' + (E * r * r).toFixed(1) + ' = I (ثابت)', mono: 1, c: '#15803d' }, { t: 'Φ الساقط على المربع ثابت ، والمساحة تكبر ' + (r * r).toFixed(2) + ' مرة', c: '#334155' }];
      Q45.card(ctx, S, L2, { title: 'قانون التربيع العكسي', y: g.ph ? fy + fv + 34 : g.fy, x: w - 12, wd: g.ph ? w - 24 : Math.min(420, w - (fx + fv + 140) - 20), f: 1 });
      const rb = Q45.btn('rec', { x: w - 90, y: h - 52, w: 150, h: 34 }, () => { }); if (!g.ph) Q45.drawBtn(ctx, rb, '📋 سجّل القراءة', '#15803d');
      Q45.banner(ctx, w, 'اسحب الشاشة إلى 1 m ثم 2 m ثم 3 m');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), xs = g.xL + S.r * g.ppm;
      const L = [{ id: 'screen', x: xs + 3, y: g.ly, w: 34, h: Math.max(.42 * g.ppm, S1 * S.r * g.ppm + 20), axis: 'x', keep: true, tip: 'اسحب الشاشة على المسطرة', idle: 'اسحب الشاشة ✋', drag: (S2, d) => { let r = clamp((d.ox + d.x - d.sx - 3 - g.xL) / g.ppm, .5, 3.2); [1, 2, 3].forEach(m => { if (Math.abs(r - m) < .07) r = m; }); S2.r = +r.toFixed(2); } }];
      if (!g.ph) L.push(Q45.btn('rec', { x: g.w - 90, y: g.h - 52, w: 150, h: 34 }, () => { const b = document.getElementById('recBtn'); b && b.click(); }, { tip: 'سجّل القراءة في الجدول' }));
      return L; },
    readings(S) { const E = D.E(S); return [rd('البعد r', S.r.toFixed(2) + ' m'), rd('المساحة المضاءة', (S.r * S.r).toFixed(2) + ' A₁'), rd('شدة الاستضاءة E', E.toFixed(2) + ' Lux'), rd('E × r²', (E * S.r * S.r).toFixed(1))]; },
    record(S) { const E = D.E(S); return { r: S.r, A: +(S.r * S.r).toFixed(2), E: +E.toFixed(2), k: +(E * S.r * S.r).toFixed(1) }; },
    cols: [['r', 'r (m)'], ['A', 'A (×A₁)'], ['E', 'E (Lux)'], ['k', 'E × r²']],
    graph: { x: 'r', y: 'E', xl: 'البعد r (m)', yl: 'شدة الاستضاءة E (Lux)' },
    explain(S) { const r = S.r; return Q26.ex('على بعد ' + r.toFixed(2) + ' m يضيء على الشاشة مربع مساحته ' + (r * r).toFixed(2) + ' A₁ ، وشدة الاستضاءة ' + D.E(S).toFixed(2) + ' Lux.', 'السيل الضوئي المار من الفتحة <b>ثابت</b>، لكنه يتوزع على مساحة تكبر مع مربع البعد (A₁ ، 4A₁ ، 9A₁)، فتقل الاستضاءة إلى 1/4 ثم 1/9: <b>E ∝ 1/r²</b>.', 'لهذا نقرّب المصباح من الكتاب عند القراءة، ويبدو ضوء السيارة البعيدة خافتاً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — قوة الإضاءة والسيل الضوئي (الشكلان 7-5 و 8-5، ص 88–89) =============== */
(() => {
  const PW = [40, 100, 500], CDW = 1.39; // 100 W ≈ 139 cd (هل تعلم ص 89)
  const D = { id: 'g10_p_intensity', page: 88, fig: 'الشكل 7-5 + الشكل 8-5',
    desc: 'لو أخذنا مصباحين متماثلين من النوع نفسه قدرة أحدهما 500 W والآخر 40 W فالأول يضيء أكثر (الشكل 7-5) بسبب اختلاف قوة الإضاءة I. قوة الإضاءة تقاس بالشمعة القياسية (cd)، والسيل الضوئي Φ = 4π I يقاس باللومن (Lm): السيل الساقط على 1 m² من سطح كروي نصف قطره 1 m في مركزه مصدر قوة إضاءته 1 cd (الشكل 8-5).',
    tags: 'قوة الإضاءة شمعة قياسية cd السيل الضوئي لومن Lm Φ=4πI مصباح 40 واط 500 واط',
    tools: ['مصباحان متماثلان 40 W و 500 W', 'سطح كروي نصف قطره r حول مصدر نقطي', 'مقياس الاستضاءة'],
    steps: ['الشكل 7-5: اضغط على كل مصباح لتغيير قدرته (40 W ، 100 W ، 500 W)، وقارن قراءتي مقياسي الاستضاءة تحتهما.', 'انتقل إلى «الكرة والسيل الضوئي» (الشكل 8-5): غيّر قوة الإضاءة I ولاحظ السيل الكلي Φ = 4π I.', 'اسحب حافة الكرة لتغيير نصف قطرها r: السيل الساقط على الجزء المظلل (مساحته r²) ثابت، فماذا يحدث لشدة الاستضاءة؟', 'اضغط «هل تعلم: 100 W» لتحسب سيل مصباح قوة إضاءته 139 cd.'],
    concl: ['قوة الإضاءة I: كمية فيزيائية تمثل الجزء من السيل الضوئي الذي يولد إحساساً ضوئياً في العين، وهي مقياس لقوة إضاءة المصدر، ووحدتها الشمعة القياسية (cd).', 'السيل الضوئي Φ: كمية الطاقة الضوئية المنبعثة من مصدر ضوئي خلال وحدة الزمن، ويقاس باللومن (Lm).', 'Φ = 4π I : لأن مساحة سطح الكرة 4π r² وكل 1 m² منها على بعد 1 m يستقبل I لومن.', 'مصباح 100 W قوة إضاءته 139 cd يبعث سيلاً ضوئياً مقداره 4π × 139 ≈ 1750 Lm.'],
    laws: ['g10_flux', 'g10_ill'],
    controls: [R('I', 'قوة الإضاءة I (الكرة)', 1, 200, 20, 1, 'cd')],
    setup(S) { S.m = 'w'; S.pw = [40, 500]; S.r = 1; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q45.L(S); return { w, h, ph, L, cy: ph ? h * .42 : h * .5, top: ph ? 78 : 60 }; },
    chips(S, g) { return Q45.chips(S, 'mode', [['w', 'مصباحان (الشكل 7-5)'], ['s', 'الكرة والسيل (الشكل 8-5)'], ['dyk', 'هل تعلم: 100 W']], g.h - 44, S.m, (S2, k) => { if (k === 'dyk') { S2.m = 's'; S2.r = 1; setParam(S2, 'I', 139); } else S2.m = k; }, { bw: 220 }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10.5 : 12, p = S.p;
      G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, w, h); });
      if (S.m === 'w') {
        const xs = [g.L + (w - g.L) * .28, g.L + (w - g.L) * .7], ly = g.top + 80, py = ly + (g.ph ? 190 : 250);
        xs.forEach((x, i) => { const P = S.pw[i], I = P * CDW, E = I / 1; // page 1 m below
          K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ly - 30); ctx.stroke(); const a = clamp(Math.sqrt(I / 700), .15, 1); const gr = ctx.createLinearGradient(0, ly, 0, py); gr.addColorStop(0, 'rgba(253,224,71,' + (.5 * a) + ')'); gr.addColorStop(1, 'rgba(253,224,71,' + (.08 * a) + ')'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x, ly); ctx.lineTo(x - 110, py); ctx.lineTo(x + 110, py); ctx.closePath(); ctx.fill();
            ctx.fillStyle = 'rgb(' + (180 + 75 * a | 0) + ',' + (170 + 75 * a | 0) + ',' + (140 + 80 * a | 0) + ')'; ctx.fillRect(x - 100, py, 200, 12); });
          Q45.lamp(ctx, x, ly, (g.ph ? .9 : 1.2) * (.8 + .4 * Math.sqrt(P / 500)), I);
          Q45.T(ctx, P + ' watt', x, ly - 48, { s: fs + 3, w: 900, c: '#fde047' });
          Q45.T(ctx, 'I = ' + I.toFixed(0) + ' cd', x, ly + 44, { s: fs, w: 900, c: '#fff', bg: '#b45309' });
          Q45.luxMeter(ctx, x - 40, py - 10, E, { s: g.ph ? .75 : .95, dx: 70, dy: 34 });
          Q45.T(ctx, 'اضغط لتغيير القدرة', x, ly - 72, { s: fs - 1, w: 700, c: '#94a3b8' }); });
        Q45.T(ctx, 'المصباحان على البعد نفسه (1 m) من الصفحة', (g.L + w) / 2, py + 50, { s: fs, w: 800, c: '#cbd5e1' });
      } else {
        const C = [g.L + (w - g.L) * (g.ph ? .5 : .36), g.cy], ppm = Math.min(w - g.L, h) * (g.ph ? .16 : .17), R = S.r * ppm, I = p.I, N = 36;
        // rays & sphere
        for (let k = 0; k < N; k++) { const a = k / N * TAU; Q26.ray(ctx, [C, [C[0] + Math.cos(a) * (R + 40), C[1] + Math.sin(a) * (R + 40)]], '#fde047', { w: 1.3, alpha: .55, arrows: false, glow: false }); }
        K.raw(ctx, () => { const gr = ctx.createRadialGradient(C[0] - R * .3, C[1] - R * .3, R * .1, C[0], C[1], R); gr.addColorStop(0, 'rgba(251,146,60,.12)'); gr.addColorStop(1, 'rgba(234,88,12,.35)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(C[0], C[1], R, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fb923c'; ctx.lineWidth = 2; ctx.stroke();
          // 1-steradian patch (arc length r) drawn as a lens-shaped cap
          const a0 = -.5, a1 = .5; ctx.fillStyle = 'rgba(253,224,71,.4)'; ctx.beginPath(); ctx.moveTo(C[0], C[1]); ctx.arc(C[0], C[1], R, a0 - Math.PI / 2 + .9, a1 - Math.PI / 2 + .9); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#fde047'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(C[0], C[1], R, a0 - Math.PI / 2 + .9, a1 - Math.PI / 2 + .9); ctx.stroke(); });
        Q45.lamp(ctx, C[0], C[1], .9, I);
        const am = .9 - Math.PI / 2; Q45.T(ctx, 'المساحة A = r² = ' + (S.r * S.r).toFixed(2) + ' m²', C[0] + Math.cos(am) * (R + 50), C[1] + Math.sin(am) * (R + 40), { s: fs, w: 900, c: '#0f172a', bg: '#fde047' });
        K.raw(ctx, () => { ctx.strokeStyle = '#e2e8f0'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(C[0], C[1]); ctx.lineTo(C[0] - R, C[1]); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#fb923c'; ctx.beginPath(); ctx.arc(C[0] - R, C[1], 10, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); });
        Q45.T(ctx, 'r = ' + S.r.toFixed(2) + ' m', C[0] - R / 2, C[1] - 14, { s: fs, w: 900, c: '#fff' });
        const F = 4 * Math.PI * I, E = I / (S.r * S.r);
        Q45.card(ctx, S, [{ t: 'Φ = 4π I = 4π × ' + I + ' = ' + F.toFixed(0) + ' Lm', mono: 1, c: '#b45309', w: 900 }, { t: 'السيل على الجزء المظلل = I = ' + I + ' Lm (ثابت)', c: '#334155' }, { t: 'E = Φ / A = ' + I + ' / ' + (S.r * S.r).toFixed(2) + ' = ' + E.toFixed(2) + ' Lux', mono: 1, c: '#be185d', w: 900 }, ...(I === 139 && Math.abs(S.r - 1) < .01 ? [{ t: 'هل تعلم: 100 W ↔ 139 cd ↔ Φ ≈ 1750 Lm', c: '#15803d', w: 900 }] : [])], { title: 'الشكل (8-5)', y: g.ph ? g.cy + R + 30 : 60, x: w - 12, wd: g.ph ? w - 24 : 380, f: 1 });
      }
      if (S.m === 'w' && !g.ph) Q45.card(ctx, S, [{ t: 'المصباحان متماثلان ومن النوع نفسه', c: '#334155' }, { t: 'الأكبر قدرة قوة إضاءته I أكبر فيضيء أكثر', c: '#b45309', w: 900 }, { t: 'I تقاس بالشمعة القياسية (cd)', c: '#334155' }], { title: 'الشكل (7-5)', y: 44, wd: 320 });
      Q45.drawChips(ctx, D.chips(S, g));
      Q45.banner(ctx, w, S.m === 'w' ? 'اضغط على المصباح لتغيير قدرته' : 'اسحب حافة الكرة (النقطة البرتقالية) لتغيير نصف القطر');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      if (S.m === 'w') { const xs = [g.L + (g.w - g.L) * .28, g.L + (g.w - g.L) * .7], ly = g.top + 80; xs.forEach((x, i) => L.push({ id: 'lamp' + i, x, y: ly, r: 40, axis: 'xy', keep: true, tip: 'اضغط لتغيير قدرة المصباح', idle: i ? undefined : 'اضغط على المصباح ✋', click: S2 => { S2.pw[i] = PW[(PW.indexOf(S2.pw[i]) + 1) % PW.length]; } })); }
      else { const C = [g.L + (g.w - g.L) * (g.ph ? .5 : .36), g.cy], ppm = Math.min(g.w - g.L, g.h) * (g.ph ? .16 : .17); L.push({ id: 'rim', x: C[0] - S.r * ppm, y: C[1], r: 18, axis: 'x', keep: true, tip: 'اسحب لتغيير نصف قطر الكرة', idle: 'اسحب حافة الكرة ✋', drag: (S2, d) => { let r = clamp((C[0] - d.x) / ppm, .4, 2.4); if (Math.abs(r - 1) < .05) r = 1; if (Math.abs(r - 2) < .05) r = 2; S2.r = +r.toFixed(2); } }); }
      return L.concat(D.chips(S, g)); },
    readings(S) { if (S.m === 'w') return S.pw.map((P, i) => rd('المصباح ' + (i + 1), P + ' W ، I = ' + (P * CDW).toFixed(0) + ' cd')); const I = S.p.I; return [rd('قوة الإضاءة I', I + ' cd'), rd('السيل الكلي Φ = 4πI', (4 * Math.PI * I).toFixed(0) + ' Lm'), rd('نصف القطر r', S.r.toFixed(2) + ' m'), rd('E = I / r²', (I / (S.r * S.r)).toFixed(2) + ' Lux')]; },
    explain(S) { if (S.m === 'w') return Q26.ex('المصباح ' + Math.max(...S.pw) + ' W يضيء أكثر من ' + Math.min(...S.pw) + ' W، وقراءة مقياس الاستضاءة تحته أكبر.', 'المصباحان من النوع نفسه وعلى البعد نفسه، فالاختلاف سببه <b>قوة الإضاءة I</b>: كمية الطاقة الضوئية (المرئية) المنبعثة من المصدر خلال وحدة الزمن.', 'هل تعلم: مصباح الإضاءة 100 W قوة إضاءته 139 cd ويبعث سيلاً ضوئياً مقداره 1750 Lm.');
      return Q26.ex('السيل الكلي من المصدر Φ = 4π I = ' + (4 * Math.PI * S.p.I).toFixed(0) + ' Lm.', 'مساحة سطح الكرة 4π r²، والجزء المظلل مساحته r² يستقبل دائماً I لومن مهما كان r، لكن المساحة تكبر فتقل شدة الاستضاءة E = I / r².', 'اللومن: السيل الضوئي الساقط على 1 m² من سطح كرة نصف قطرها 1 m في مركزها مصدر قوة إضاءته 1 cd.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C3 — الفوتومتر: مثال 2 ص 92 + المسائل س1 و س2 ص 94 =============== */
(() => {
  const PB = { free: { t: 'حر', I1: 20, I2: 20, a: 0, x: 1, b: 2, un: null }, e2: { t: 'مثال 2', I1: 32, I2: 60, a: 0, x: .6, b: 1.8, un: 'I2', q: 'مصباح قوة إضاءته 32 cd يبعد 0.6 m عن شاشة، وهناك مصباح آخر من الجهة الثانية يبعد عنها 1.2 m. فإذا تساوت شدة الاستضاءة على وجهي الشاشة ما قوة إضاءة المصباح الثاني؟', lines: ['E₁ = E₂ ⟸ I₁ / r₁² = I₂ / r₂²', 'I₂ / I₁ = r₂² / r₁²', 'I₂ / 32 = (1.2)² / (0.6)²', 'I₂ = 32 × 1.44 / 0.36', 'I₂ = 128 cd'] },
    q1: { t: 'س1', I1: 36, I2: 4, a: 0, x: .35, b: 1, un: 'x', q: 'مصباحان قوة إضاءة الأول تسعة أمثال الثاني والمسافة بينهما 1 m. أين يجب وضع فوتومتر بين المصدرين لكي تصبح شدة الاستضاءة متساوية على جانبيه؟', lines: ['I₁ / x² = I₂ / (1 − x)² ، I₁ = 9 I₂', '9 / x² = 1 / (1 − x)²', '3 / x = 1 / (1 − x) ⟸ 3 − 3x = x', 'x = 0.75 m (من المصباح الأقوى)'] },
    q2: { t: 'س2', I1: 12, I2: 6, a: 0, x: 1.2, b: 2.52, un: 'I2', q: 'وضع مصباح قوة إضاءته 12 cd على بعد 1.2 m من فوتومتر، ووضع في الجهة الثانية مصباح آخر على بعد 1.32 m فتساوت شدة الاستضاءة على جانبي الفوتومتر. احسب قوة إضاءة المصباح الثاني.', lines: ['I₂ = I₁ × r₂² / r₁²', 'I₂ = 12 × (1.32)² / (1.2)²', 'I₂ = 12 × 1.7424 / 1.44', 'I₂ = 14.52 cd'] } };
  const D = { id: 'g10_p_photometer', page: 92, fig: 'مثال 2 ص 92 + س1، س2 ص 94',
    desc: 'الفوتومتر (مقياس الضوء) ذو البقعة الدهنية يوضع بين مصباحين؛ عندما تتساوى شدة الاستضاءة على وجهيه تختفي البقعة الدهنية، وعندها I₁ / r₁² = I₂ / r₂². نحل على الجهاز مثال 2 ص 92 والمسألتين س1 و س2 ص 94.',
    tags: 'فوتومتر بقعة دهنية تساوي الاستضاءة مثال 2 مسائل قوة الإضاءة المجهولة',
    tools: ['مصطبة بصرية بمسطرة مترية', 'مصباحان نقطيان', 'فوتومتر ذو بقعة دهنية'],
    steps: ['اسحب الفوتومتر بين المصباحين وراقب وجهيه في الأعلى: متى تختفي البقعة الدهنية؟', 'اسحب مقبض قوة الإضاءة تحت كل مصباح (أو المنزلق) لتغيير I.', 'اختر «مثال 2» أو «س2»: المجهول قوة إضاءة المصباح الثاني، غيّرها حتى تختفي البقعة.', 'اختر «س1»: المجهول موضع الفوتومتر، اسحبه حتى تتساوى الاستضاءة، ثم اضغط «الخطوة التالية» للحل.'],
    concl: ['عند اختفاء البقعة الدهنية تتساوى الاستضاءة على وجهي الفوتومتر: E₁ = E₂.', 'I₁ / r₁² = I₂ / r₂² ⟸ I₂ = I₁ × r₂² / r₁²', 'مثال 2: I₂ = 128 cd ، س1: x = 0.75 m من المصباح الأقوى ، س2: I₂ = 14.52 cd.'],
    laws: ['g10_phot', 'g10_inv'],
    controls: [R('I1', 'قوة إضاءة المصباح الأول I₁', 1, 200, 20, 1, 'cd'), R('I2', 'قوة إضاءة المصباح الثاني I₂', 1, 200, 20, .01, 'cd')],
    setup(S) { S.pb = 'free'; Object.assign(S, { a: 0, x: 1, b: 2 }); S.k = 0; },
    load(S, k) { const P = PB[k]; S.pb = k; S.a = P.a; S.x = P.x; S.b = P.b; S.k = 0; setParam(S, 'I1', P.I1); setParam(S, 'I2', P.I2); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q45.L(S), x0 = L + (ph ? 24 : 40), ppm = (w - x0 - (ph ? 24 : 40)) / 2.7, by = h * (ph ? .5 : .48); return { w, h, ph, L, x0, ppm, by, ly: by - 70 }; },
    Es(S) { const r1 = Math.max(.02, S.x - S.a), r2 = Math.max(.02, S.b - S.x); return { r1, r2, E1: S.p.I1 / (r1 * r1), E2: S.p.I2 / (r2 * r2) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, p = S.p, X = m => g.x0 + m * g.ppm, P = PB[S.pb], Q = D.Es(S), bal = Math.abs(Q.E1 - Q.E2) / Math.max(Q.E1, Q.E2) < .025;
      G.bg(ctx, w, h, false); Q26.room(ctx, w, h, g.by + 30, { top: '#0f172a', bot: '#1e293b' });
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.x0 - 10, g.by + 4, g.ppm * 2.7, 10); }); Q45.rule(ctx, g.x0, g.by + 16, g.ppm, 2.6, { step: g.ph ? 1 : .2 });
      // light from both lamps toward the photometer
      [[S.a, p.I1, '#fde047'], [S.b, p.I2, '#fdba74']].forEach(q => { const x = X(q[0]); K.raw(ctx, () => { const gr = ctx.createLinearGradient(x, 0, X(S.x), 0); gr.addColorStop(0, 'rgba(253,224,71,.35)'); gr.addColorStop(1, 'rgba(253,224,71,.04)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x, g.ly); ctx.lineTo(X(S.x), g.ly - 30); ctx.lineTo(X(S.x), g.ly + 30); ctx.closePath(); ctx.fill(); }); });
      [[S.a, p.I1, 'I₁'], [S.b, p.I2, 'I₂']].forEach((q, i) => { const x = X(q[0]); K.raw(ctx, () => { ctx.fillStyle = '#64748b'; ctx.fillRect(x - 2, g.ly + 12, 4, g.by - g.ly - 8); });
        Q45.lamp(ctx, x, g.ly, g.ph ? .8 : 1, q[1]); const unk = P.un === 'I2' && i === 1 && S.k < PB[S.pb].lines.length; Q45.T(ctx, q[2] + ' = ' + (unk ? '؟' : q[1].toFixed(q[1] % 1 ? 2 : 0) + ' cd'), x, g.ly - 44, { s: fs + 1, w: 900, c: '#0f172a', bg: '#fde047' });
        // dimmer knob under the lamp
        const kx = x + (i ? -1 : 1) * 0, ky = g.by + 52, kw = g.ph ? 70 : 90, f = (q[1] - 1) / 199; K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(kx - kw / 2, ky); ctx.lineTo(kx + kw / 2, ky); ctx.stroke(); ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(kx - kw / 2 + kw * f, ky, 9, 0, TAU); ctx.fill(); }); Q45.T(ctx, 'قوة الإضاءة', kx, ky + 18, { s: fs - 1.5, w: 700, c: '#94a3b8' }); });
      // photometer (grease-spot)
      const xp = X(S.x); K.raw(ctx, () => { ctx.fillStyle = '#64748b'; ctx.fillRect(xp - 2, g.ly + 26, 4, g.by - g.ly - 22); ctx.fillStyle = '#f8fafc'; ctx.fillRect(xp - 3, g.ly - 30, 6, 60); });
      Q45.T(ctx, 'فوتومتر', xp, g.ly + 44, { s: fs, w: 900, c: '#e2e8f0' });
      // the two faces seen from above (mirrors of the Bunsen photometer)
      const fr = g.ph ? 30 : 40, fy = g.ly - (g.ph ? 120 : 140), mx = Math.max(Q.E1, Q.E2), lum = e => clamp(.12 + .85 * e / mx, 0, 1);
      [[-1, Q.E1 * .9 + Q.E2 * .1, (Q.E1 + Q.E2) * .5, 'الوجه المقابل لـ I₁'], [1, Q.E2 * .9 + Q.E1 * .1, (Q.E1 + Q.E2) * .5, 'الوجه المقابل لـ I₂']].forEach(f => { const cx = xp + f[0] * (fr + 8); K.raw(ctx, () => { const a = lum(f[1]), b = lum(f[2]); ctx.fillStyle = 'rgb(' + (255 * a | 0) + ',' + (250 * a | 0) + ',' + (230 * a | 0) + ')'; ctx.beginPath(); ctx.arc(cx, fy, fr, 0, TAU); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = 'rgb(' + (255 * b | 0) + ',' + (250 * b | 0) + ',' + (230 * b | 0) + ')'; ctx.beginPath(); ctx.arc(cx, fy, fr * .38, 0, TAU); ctx.fill(); });
        if (!g.ph) Q45.T(ctx, f[3], cx, fy + fr + 14, { s: fs - 1, w: 700, c: '#cbd5e1' }); });
      Q26.verdict(ctx, xp, fy - fr - 18, bal, bal ? 'اختفت البقعة: E₁ = E₂' : 'البقعة ظاهرة: E₁ ≠ E₂');
      Q45.T(ctx, 'r₁ = ' + Q.r1.toFixed(2) + ' m', (X(S.a) + xp) / 2, g.by - 10, { s: fs, w: 900, c: '#fde68a' }); Q45.T(ctx, 'r₂ = ' + Q.r2.toFixed(2) + ' m', (X(S.b) + xp) / 2, g.by - 10, { s: fs, w: 900, c: '#fdba74' });
      // chips + solution
      const cy = g.by + (g.ph ? 92 : 96); const C = Q45.chips(S, 'pb', [['free', 'حر'], ['e2', 'مثال 2 ص 92'], ['q1', 'س1 ص 94'], ['q2', 'س2 ص 94'], ['nx', '⬇ الخطوة التالية']], cy, S.pb, () => { }, { bw: 150 }); C[4]._col = '#be185d'; C[4]._on = false; Q45.drawChips(ctx, C);
      const live = [{ t: 'E₁ = I₁ / r₁² = ' + Q.E1.toFixed(2) + ' Lux', mono: 1, c: '#b45309', w: 900 }, { t: 'E₂ = I₂ / r₂² = ' + Q.E2.toFixed(2) + ' Lux', mono: 1, c: '#c2410c', w: 900 }];
      if (S.pb !== 'free') Q45.steps(ctx, S, Object.assign({ title: P.t }, P, { k: S.k }), { y: cy + 26, x: w - 12, wd: g.ph ? w - 24 : Math.min(560, (w - g.L) * .62), f: 1 });
      if (S.pb === 'free' || !g.ph) Q45.card(ctx, S, live, { title: 'القراءة الحية', y: cy + 26, x: S.pb === 'free' ? w - 12 : g.L + (g.ph ? w - 24 : Math.min(300, (w - g.L) * .34)), wd: g.ph ? w - 24 : Math.min(300, (w - g.L) * .34), f: 1 });
      Q45.banner(ctx, w, 'اسحب الفوتومتر بين المصباحين حتى تختفي البقعة الدهنية');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), X = m => g.x0 + m * g.ppm, P = PB[S.pb], free = S.pb === 'free';
      const L = [{ id: 'phot', x: X(S.x), y: g.ly, w: 34, h: 80, axis: 'x', keep: true, tip: 'اسحب الفوتومتر', idle: 'اسحب الفوتومتر ✋', drag: (S2, d) => { if (S2.pb === 'e2' || S2.pb === 'q2') return; let x = clamp((d.ox + d.x - d.sx - g.x0) / g.ppm, S2.a + .05, S2.b - .05); S2.x = +x.toFixed(3); } }];
      [['a', 'I1'], ['b', 'I2']].forEach((q, i) => { const x = X(S[q[0]]), kw = g.ph ? 70 : 90, ky = g.by + 52, f = (S.p[q[1]] - 1) / 199;
        if (free) L.push({ id: 'lamp' + i, x, y: g.ly, r: 28, axis: 'x', keep: true, tip: 'اسحب المصباح على المصطبة', drag: (S2, d) => { const m = clamp((d.ox + d.x - d.sx - g.x0) / g.ppm, i ? S2.x + .1 : 0, i ? 2.6 : S2.x - .1); S2[q[0]] = +m.toFixed(2); } });
        if (free || P.un === q[1] || (P.un !== 'x' && i === 0 && false)) L.push({ id: 'dim' + i, x: x - kw / 2 + kw * f, y: ky, r: 16, axis: 'x', keep: true, tip: 'اسحب لتغيير قوة الإضاءة', drag: (S2, d) => { const v = 1 + clamp((d.x - (x - kw / 2)) / kw, 0, 1) * 199; setParam(S2, q[1], +v.toFixed(v < 30 ? 2 : 0)); } }); });
      const cy = g.by + (g.ph ? 92 : 96); return L.concat(Q45.chips(S, 'pb', [['free', 'حر'], ['e2', 'مثال 2'], ['q1', 'س1'], ['q2', 'س2'], ['nx', 'التالية']], cy, S.pb, (S2, k) => { if (k === 'nx') { if (S2.pb === 'free') D.load(S2, 'e2'); S2.k = Math.min(S2.k + 1, PB[S2.pb].lines.length); if (S2.k === PB[S2.pb].lines.length) { if (S2.pb === 'e2') setParam(S2, 'I2', 128); if (S2.pb === 'q2') setParam(S2, 'I2', 14.52); if (S2.pb === 'q1') S2.x = .75; } return; } D.load(S2, k); }, { bw: 150 })); },
    readings(S) { const Q = D.Es(S); return [rd('r₁', Q.r1.toFixed(2) + ' m'), rd('r₂', Q.r2.toFixed(2) + ' m'), rd('E₁', Q.E1.toFixed(2) + ' Lux'), rd('E₂', Q.E2.toFixed(2) + ' Lux'), rd('البقعة الدهنية', Math.abs(Q.E1 - Q.E2) / Math.max(Q.E1, Q.E2) < .025 ? 'اختفت' : 'ظاهرة')]; },
    record(S) { const Q = D.Es(S); return { I1: S.p.I1, r1: +Q.r1.toFixed(2), I2: S.p.I2, r2: +Q.r2.toFixed(2), k: +(S.p.I1 / S.p.I2).toFixed(2), q: +(Q.r1 * Q.r1 / (Q.r2 * Q.r2)).toFixed(2) }; },
    cols: [['I1', 'I₁ (cd)'], ['r1', 'r₁ (m)'], ['I2', 'I₂ (cd)'], ['r2', 'r₂ (m)'], ['k', 'I₁/I₂'], ['q', 'r₁²/r₂²']],
    explain(S) { const Q = D.Es(S), bal = Math.abs(Q.E1 - Q.E2) / Math.max(Q.E1, Q.E2) < .025; return Q26.ex(bal ? 'اختفت البقعة الدهنية: الاستضاءة متساوية على الوجهين (' + Q.E1.toFixed(2) + ' Lux).' : 'البقعة ظاهرة لأن الاستضاءة على الوجه الأول ' + Q.E1.toFixed(2) + ' Lux وعلى الثاني ' + Q.E2.toFixed(2) + ' Lux.', 'البقعة الدهنية تنفذ الضوء أكثر من الورق حولها، فإذا كان أحد الوجهين أكثر استضاءة ظهرت البقعة. عند التساوي: <b>I₁ / r₁² = I₂ / r₂²</b>، فنعرف قوة إضاءة مصباح مجهول بمقارنته بمصباح معلوم.', 'هكذا كانت تقارن قوة إضاءة المصابيح قبل أجهزة الفوتومتر الإلكترونية (الشكل 9-5).'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C4 — شدة الاستضاءة E = I/r²: مثال 1 ص 92 + س3 و س4 ص 94 + اختيار س1-3 =============== */
(() => {
  const PB = { free: { t: 'حر', I: 20, r: 2 }, e1: { t: 'مثال 1 ص 92', I: 5, r: 5, q: 'وضعت شاشة بيضاء بمستوى عمودياً على اتجاه سقوط أشعة ضوئية من مصدر نقطي قوة إضاءته 5 cd. احسب شدة الاستضاءة على الشاشة إذا كان بعدها عن المصدر 5 m.', lines: ['E = I / r² (في حالة السقوط العمودي)', 'E = 5 / 25', 'E = 0.2 Lm/m² = 0.2 Lux'] },
    q3: { t: 'س3 ص 94', I: 25, r: 1.5, q: 'مصباح مضيء يسلط عمودياً على صفحة كتاب سيلاً ضوئياً مقداره 100π Lm. ما بعد المصباح عن الكتاب إذا كانت شدة إضاءتها 4 Lux؟ (اسحب المصباح حتى يقرأ المقياس 4 Lux)', lines: ['Φ = 4π I ⟸ I = 100π / 4π = 25 cd', 'E = I / r² ⟸ r² = I / E = 25 / 4', 'r = 2.5 m'] },
    q4: { t: 'س4 القمر', I: 8.84e16, r: 3.84e8, q: 'في ليلة مقمرة كان القمر فيها بدراً شدة الاستضاءة 0.6 Lux. جد قوة إضاءة القمر في تلك الليلة، علماً أن المسافة بين الأرض والقمر 3.84×10⁸ m.', lines: ['E = I / r² ⟸ I = E × r²', 'I = 0.6 × (3.84×10⁸)²', 'I = 0.6 × 1.4746×10¹⁷', 'I = 8.84×10¹⁶ cd'] },
    c3: { t: 'اختيار س1-3', I: 20, r: 1, q: 'لمضاعفة شدة الاستضاءة مباشرة فوق سطح منضدة أفقية فوقها تماماً مصباح مضيء على ارتفاع 1 m من مركزها، وذلك بجعل المصباح على ارتفاع: (a) 0.75 m (b) 0.707 m (c) 0.5 m (d) 0.25 m — اسحب المصباح حتى تتضاعف القراءة', lines: ['E₂ = 2 E₁ ⟸ I / r₂² = 2 I / r₁²', 'r₂² = r₁² / 2 = 1 / 2', 'r₂ = 0.707 m ⟸ الجواب (b)'] } };
  const D = { id: 'g10_p_problems', page: 92, fig: 'مثال 1 ص 92 + س3، س4 ص 94 + س1-3 ص 93',
    desc: 'شدة الاستضاءة على سطح يسقط عليه الضوء عمودياً E = I / r². هناك طريقتان لزيادة شدة الاستضاءة: زيادة قوة إضاءة المصدر، أو تقليل بعده عن السطح. نحل على الجهاز مثال 1 ص 92، والمسألتين س3 و س4، واختيار س1-3.',
    tags: 'شدة الاستضاءة مثال 1 مسائل لوكس قوة إضاءة القمر مضاعفة الاستضاءة 0.707',
    tools: ['مصباح نقطي بارتفاع يتغير', 'منضدة أو صفحة كتاب', 'مقياس الاستضاءة (لوكسميتر)'],
    steps: ['اسحب المصباح إلى الأعلى أو الأسفل وراقب قراءة مقياس الاستضاءة على المنضدة.', 'غيّر قوة الإضاءة I بمقبض المصباح: طريقتان لزيادة شدة الاستضاءة.', 'اختر مثالاً أو مسألة، ونفّذ المطلوب على الجهاز (مثل سحب المصباح حتى تصبح القراءة 4 Lux)، ثم اضغط «الخطوة التالية».'],
    concl: ['E = I / r² في حالة السقوط العمودي من مصدر نقطي.', 'لزيادة شدة الاستضاءة: نزيد قوة إضاءة المصدر I أو نقلل بعده r عن السطح.', 'مثال 1: E = 0.2 Lux ، س3: r = 2.5 m ، س4: I القمر = 8.84×10¹⁶ cd ، س1-3: r = 0.707 m.'],
    laws: ['g10_inv', 'g10_flux'],
    controls: [R('I', 'قوة الإضاءة I', 1, 100, 20, 1, 'cd')],
    setup(S) { S.pb = 'free'; S.r = 2; S.k = 0; S.E0 = null; },
    load(S, k) { S.pb = k; S.k = 0; const P = PB[k]; if (k !== 'q4') { setParam(S, 'I', P.I); S.r = P.r; } S.E0 = k === 'c3' ? P.I : null; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q45.L(S), ty = h * (ph ? .6 : .72), top = ph ? 84 : 66, ppm = (ty - top - 20) / 5.6, x = L + (w - L) * (ph ? .3 : .26); return { w, h, ph, L, ty, top, ppm, x }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, P = PB[S.pb], cy = g.ty + (g.ph ? 40 : 46);
      G.bg(ctx, w, h, false);
      if (S.pb === 'q4') { K.raw(ctx, () => { ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, w, h); for (let k = 0; k < 90; k++) { ctx.fillStyle = 'rgba(255,255,255,' + (.3 + (k * 37 % 7) / 10) + ')'; ctx.fillRect((k * 97) % w, (k * 53) % (g.ty), 1.6, 1.6); } const mx = g.x + 40, my = g.top + 40; const gr = ctx.createRadialGradient(mx - 10, my - 10, 4, mx, my, 40); gr.addColorStop(0, '#fffbeb'); gr.addColorStop(1, '#a8a29e'); ctx.shadowColor = 'rgba(254,243,199,.8)'; ctx.shadowBlur = 40; ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(mx, my, 36, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
          ctx.fillStyle = '#1e3a8a'; ctx.fillRect(0, g.ty, w, h - g.ty); ctx.strokeStyle = 'rgba(254,243,199,.25)'; ctx.setLineDash([5, 6]); ctx.beginPath(); ctx.moveTo(mx, my + 40); ctx.lineTo(mx + 120, g.ty); ctx.stroke(); ctx.setLineDash([]); });
        Q45.T(ctx, 'القمر بدراً', g.x + 40, g.top + 96, { s: fs + 1, w: 900, c: '#fde68a' }); Q45.T(ctx, 'r = 3.84×10⁸ m', g.x + 120, (g.top + g.ty) / 2, { s: fs + 1, w: 900, c: '#fff', bg: 'rgba(30,58,138,.8)' });
        Q45.luxMeter(ctx, g.x + 120, g.ty - 6, .6, { s: 1, dx: 80, dy: 0 });
      } else {
        Q26.room(ctx, w, h, g.ty, { top: '#0f172a', bot: '#1e293b' });
        const I = S.p.I, r = S.r, ly = g.ty - r * g.ppm, E = I / (r * r);
        // vertical scale
        K.raw(ctx, () => { const sx = g.x - 70; ctx.fillStyle = '#fde68a'; ctx.fillRect(sx - 8, g.ty - 5.5 * g.ppm, 16, 5.5 * g.ppm); ctx.strokeStyle = '#78350f'; for (let k = 0; k <= 55; k++) { const y = g.ty - k * g.ppm / 10; ctx.lineWidth = k % 10 ? .7 : 1.4; ctx.beginPath(); ctx.moveTo(sx + 8, y); ctx.lineTo(sx + 8 - (k % 10 ? 4 : 10), y); ctx.stroke(); } });
        for (let m = 0; m <= 5; m++) Q45.T(ctx, m + ' m', g.x - 98, g.ty - m * g.ppm, { s: 10, w: 800, c: '#fde68a' });
        // light cone
        K.raw(ctx, () => { const a = clamp(Math.sqrt(E / 40), .05, 1); const gr = ctx.createLinearGradient(0, ly, 0, g.ty); gr.addColorStop(0, 'rgba(253,224,71,' + (.45 * a + .05) + ')'); gr.addColorStop(1, 'rgba(253,224,71,' + (.15 * a + .02) + ')'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(g.x, ly); ctx.lineTo(g.x - r * g.ppm * .6, g.ty); ctx.lineTo(g.x + r * g.ppm * .6, g.ty); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.x, 0); ctx.lineTo(g.x, ly - 14); ctx.stroke();
          ctx.fillStyle = '#92400e'; ctx.fillRect(g.x - 120, g.ty - 8, 240, 8); ctx.fillStyle = '#f8fafc'; ctx.fillRect(g.x - 36, g.ty - 12, 72, 4); });
        Q45.lamp(ctx, g.x, ly, g.ph ? .8 : 1, I);
        K.raw(ctx, () => { ctx.strokeStyle = '#fde047'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(g.x + 30, ly); ctx.lineTo(g.x + 30, g.ty - 12); ctx.stroke(); ctx.setLineDash([]); });
        Q45.T(ctx, 'r = ' + r.toFixed(r < 1 ? 3 : 2) + ' m', g.x + 72, (ly + g.ty) / 2, { s: fs + 1, w: 900, c: '#0f172a', bg: '#fde047' });
        Q45.T(ctx, 'I = ' + I + ' cd', g.x, ly - 34, { s: fs, w: 900, c: '#fff', bg: '#b45309' });
        Q45.luxMeter(ctx, g.x + 10, g.ty - 16, E, { s: g.ph ? .8 : 1, dx: 110, dy: -4 });
        if (S.pb === 'c3' && S.E0) { const ok = Math.abs(E - 2 * S.E0) / (2 * S.E0) < .02; Q26.verdict(ctx, g.x + 120, g.ty - 80, ok, ok ? 'تضاعفت الاستضاءة: ' + E.toFixed(1) + ' = 2 × ' + S.E0.toFixed(0) + ' Lux' : 'الهدف: ' + (2 * S.E0).toFixed(0) + ' Lux (الآن ' + E.toFixed(1) + ')'); }
        if (S.pb === 'q3') { const ok = Math.abs(E - 4) < .05; Q26.verdict(ctx, g.x + 120, g.ty - 80, ok, ok ? 'القراءة 4 Lux عند r = 2.5 m' : 'اسحب المصباح حتى تصبح القراءة 4 Lux'); }
      }
      const C = Q45.chips(S, 'pb', [['free', 'حر'], ['e1', 'مثال 1'], ['q3', 'س3'], ['q4', 'س4 القمر'], ['c3', 'اختيار س1-3'], ['nx', '⬇ الخطوة التالية']], cy, S.pb, () => { }, { bw: 140 }); C[5]._col = '#be185d'; C[5]._on = false; Q45.drawChips(ctx, C);
      if (S.pb !== 'free') Q45.steps(ctx, S, Object.assign({ title: P.t }, P, { k: S.k }), { y: g.ph ? cy + 26 : 44, x: w - 12, wd: g.ph ? w - 24 : Math.min(470, (w - g.x) - 260), f: 1 });
      else Q45.card(ctx, S, [{ t: 'E = I / r² = ' + S.p.I + ' / ' + (S.r * S.r).toFixed(2) + ' = ' + (S.p.I / (S.r * S.r)).toFixed(2) + ' Lux', mono: 1, c: '#b45309', w: 900 }, { t: 'طريقتان لزيادة E: زيادة I أو تقليل r', c: '#334155' }], { title: 'شدة الاستضاءة', y: g.ph ? cy + 26 : 44, x: w - 12, wd: g.ph ? w - 24 : 360, f: 1 });
      Q45.banner(ctx, w, S.pb === 'q4' ? 'القمر جسم مستضيء: اضغط «الخطوة التالية» للحل' : 'اسحب المصباح إلى الأعلى أو الأسفل');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      if (S.pb !== 'q4') { const ly = g.ty - S.r * g.ppm; L.push({ id: 'lamp', x: g.x, y: ly, r: 30, axis: 'y', keep: true, tip: 'اسحب المصباح', idle: 'اسحب المصباح ✋', drag: (S2, d) => { let r = clamp((g.ty - (d.oy + d.y - d.sy)) / g.ppm, .25, 5.5); [.5, .707, 1, 1.5, 2, 2.5, 3, 4, 5].forEach(m => { if (Math.abs(r - m) < .02) r = m; }); S2.r = +r.toFixed(3); } }); }
      const cy = g.ty + (g.ph ? 40 : 46); return L.concat(Q45.chips(S, 'pb', [['free', 'حر'], ['e1', 'مثال 1'], ['q3', 'س3'], ['q4', 'س4'], ['c3', 'س1-3'], ['nx', 'التالية']], cy, S.pb, (S2, k) => { if (k === 'nx') { if (S2.pb === 'free') D.load(S2, 'e1'); S2.k = Math.min(S2.k + 1, PB[S2.pb].lines.length); if (S2.k === PB[S2.pb].lines.length) { if (S2.pb === 'q3') S2.r = 2.5; if (S2.pb === 'c3') S2.r = .707; } return; } D.load(S2, k); }, { bw: 140 })); },
    readings(S) { if (S.pb === 'q4') return [rd('شدة الاستضاءة', '0.6 Lux'), rd('البعد', '3.84×10⁸ m'), rd('قوة إضاءة القمر', S.k >= 4 ? '8.84×10¹⁶ cd' : '؟')]; return [rd('قوة الإضاءة I', S.p.I + ' cd'), rd('البعد r', S.r.toFixed(3) + ' m'), rd('E = I / r²', (S.p.I / (S.r * S.r)).toFixed(2) + ' Lux')]; },
    record(S) { if (S.pb === 'q4') return null; return { I: S.p.I, r: S.r, E: +(S.p.I / (S.r * S.r)).toFixed(3) }; },
    cols: [['I', 'I (cd)'], ['r', 'r (m)'], ['E', 'E (Lux)']],
    explain(S) { if (S.pb === 'q4') return Q26.ex('القمر بعيد جداً، ومع ذلك تبلغ الاستضاءة 0.6 Lux.', 'من E = I / r² نجد I = E r² = 0.6 × (3.84×10⁸)² ≈ 8.84×10¹⁶ cd. القمر جسم <b>مستضيء</b>: هذه «قوة إضاءة» ضوء الشمس المنعكس منه.', 'لهذا نستطيع رؤية الطريق في ليلة البدر.'); return Q26.ex('على بعد ' + S.r.toFixed(2) + ' m من مصدر قوة إضاءته ' + S.p.I + ' cd تكون الاستضاءة ' + (S.p.I / (S.r * S.r)).toFixed(2) + ' Lux.', 'E = I / r²: عندما نقرّب المصباح إلى النصف تتضاعف الاستضاءة أربع مرات، ولكي نضاعفها مرتين فقط نقرّبه إلى r ÷ √2 = 0.707 r.', 'طريقتان لزيادة الإضاءة على مكتبك: مصباح أقوى، أو تقريبه.'); }
  };
  M8.P[D.id] = D;
})();

/* interaction counter (lets the smoke test see that each drag/click handler ran) */
['g10_l_sources', 'g10_l_theory', 'g10_l_spectrum', 'g10_h_aperture', 'g10_h_wavelets', 'g10_h_harbor', 'g10_p_activity', 'g10_p_intensity', 'g10_p_photometer', 'g10_p_problems'].forEach(id => { const D = M8.P[id]; if (!D || !D.drags) return; const od = D.drags;
  D.drags = S => (od.call(D, S) || []).map(o => { ['drag', 'click'].forEach(f => { if (o[f]) { const fn = o[f]; o[f] = (S2, ...a) => { S2.act = (S2.act || 0) + 1; return fn(S2, ...a); }; } }); return o; }); });
Object.keys(M8.P).filter(id => id.indexOf('g10_') === 0 && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g10_light', ch: 45, reg: X10, sec: '1-5 طبيعة الضوء وانتشاره', page: 84, kind: 'نشاط',
  title: 'طبيعة الضوء وانتشاره: الأجسام المضيئة، نظريات الضوء، والطيف الكهرومغناطيسي',
  desc: 'نرى الأجسام لأن الضوء ينعكس عنها إلى العين (الشكل 1-5). الضوء ينتشر بخطوط مستقيمة (الشكل 2-5)، وفُسّرت طبيعته بالنظرية الدقائقية والموجية والكهرومغناطيسية ونظرية الكم. والضوء المرئي جزء من الطيف الكهرومغناطيسي (الشكل 3-5): f = c/λ و E = h f مع مثالي الكتاب.',
  tags: 'طبيعة الضوء انتشار الضوء نظريات الضوء الطيف',
  fact: ['السنة الضوئية هي المسافة التي يقطعها الضوء في الفراغ بسرعة 3×10⁸ m/s في مدة 365 يوماً، وتقدر بحوالي 10¹³ km (هل تعلم ص 85).', 'افترض ماكس بلانك أن الضوء لا يشع من مصدره على هيئة موجات بل على هيئة حزم محددة من الطاقة غير قابلة للتجزئة تدعى كمّات (فوتونات) (ص 85).', 'ثابت بلانك h = 6.63×10⁻³⁴ J.s (ص 86).'],
  quiz: [
    { q: 'ينتشر الضوء الصادر عن مصدر نقطي في الفراغ:', o: ['باتجاه واحد', 'باتجاهين', 'بجميع الاتجاهات', 'جميع الاحتمالات السابقة'], a: 2, why: 'س1-1 ص 93: المصدر النقطي يبعث الضوء في جميع الاتجاهات.' },
    { q: 'عند انتقال حزمة من الضوء بصورة مائلة من وسط لآخر فالكمية التي لا تتغير هي:', o: ['اتجاهها', 'انطلاقها', 'طولها الموجي', 'ترددها'], a: 3, why: 'س1-2 ص 93: التردد يحدده المصدر فلا يتغير، أما الانطلاق والطول الموجي والاتجاه فتتغير.' },
    { q: 'القمر مثال على جسم:', o: ['مضيء', 'مستضيء', 'لا مضيء ولا مستضيء'], a: 1, why: 'الشكل 1-5: القمر يعكس ضوء الشمس الساقط عليه ولا يبعث ضوءاً بذاته.' },
    { q: 'أي الفوتونين طاقته أكبر؟', o: ['فوتون الضوء الأحمر (700 nm)', 'فوتون الضوء البنفسجي (400 nm)', 'متساويان'], a: 1, why: 'E = hc/λ: الطول الموجي الأقصر يعني تردداً وطاقة أكبر.' }],
  parts: [{ id: 'g10_l_sources', n: 'الأجسام المضيئة والمستضيئة (الشكل 1-5)' }, { id: 'g10_l_theory', n: 'الانتشار المستقيم ونظريات الضوء (الشكل 2-5)' }, { id: 'g10_l_spectrum', n: 'الطيف الكهرومغناطيسي + مثال 1 و 2 (الشكل 3-5)' }] });
M8.merge({ id: 'g10_huygens', ch: 45, reg: X10, sec: '2-5 المصدر النقطي للضوء + 3-5 مبدأ هايجنز', page: 87, kind: 'نشاط',
  title: 'المصدر النقطي ومبدأ هايجنز: الفتحة والطول الموجي، المويجات، وموجات البحر',
  desc: 'إذا صادفت موجات الضوء حاجزاً فيه فتحة قطرها d: تجتاز الفتحة بخط مستقيم إذا كان d ≫ λ، وتنتشر إذا كان d ≈ λ، وتصبح الفتحة مصدراً نقطياً إذا كان d ≪ λ (الشكل 4-5). ومبدأ هايجنز: كل نقطة على جبهة الموجة مصدر لمويجات ثانوية (الشكلان 5-5 و 6-5).',
  tags: 'مصدر نقطي مبدأ هايجنز جبهة موجة مويجات فتحة',
  fact: ['مبدأ هايجنز: كل نقطة من نقاط جبهة الموجة الافتراضية تعد مصدراً نقطياً لتوليد موجات ثانوية كروية تسمى المويجات، تنتشر بسرعة الموجة في ذلك الوسط (ص 87).', 'الشكل 6-5: موجات مستوية قادمة من بعيد نحو الشاطئ تمر من فتحة في الجدار الحاجز وتخرج دائرية منتشرة نحو الساحل.'],
  quiz: [
    { q: 'تعد الفتحة في حاجز مصدراً نقطياً للضوء عندما يكون قطرها d:', o: ['أكبر كثيراً من λ', 'مساوياً تقريباً لـ λ', 'أصغر كثيراً من λ'], a: 2, why: 'الشكل 4-5 c: إذا كان d ≪ λ تعد الفتحة مصدراً نقطياً للضوء.' },
    { q: 'وفق مبدأ هايجنز الموضع الجديد لجبهة الموجة هو:', o: ['السطح المماس للمويجات', 'مركز المويجات', 'الخط الواصل بين المصدر والجبهة'], a: 0, why: 'ص 87: بعد زمن ما يكون الموضع الجديد لجبهة الموجة هو السطح المماس للمويجات.' },
    { q: 'إذا كان قطر الفتحة أكبر كثيراً من الطول الموجي فإن الموجة:', o: ['تنتشر في جميع الاتجاهات', 'تجتاز الفتحة وتستمر بخط مستقيم', 'تنعكس كلها'], a: 1, why: 'الشكل 4-5 a: d ≫ λ ⟸ تجتاز الموجة الفتحة بخط مستقيم.' }],
  parts: [{ id: 'g10_h_aperture', n: 'الفتحة d والطول الموجي λ (الشكل 4-5)' }, { id: 'g10_h_wavelets', n: 'مبدأ هايجنز: المويجات والجبهة الجديدة (الشكل 5-5)' }, { id: 'g10_h_harbor', n: 'موجات البحر وفتحة كاسر الأمواج (الشكل 6-5)' }] });
M8.merge({ id: 'g10_photometry', ch: 45, reg: X10, sec: '4-5 قوة الإضاءة + 5-5 شدة الاستضاءة + 6-5 قانون التربيع العكسي', page: 91, kind: 'نشاط',
  title: 'قوة الإضاءة وشدة الاستضاءة وقانون التربيع العكسي (نشاط ص 91 + الأمثلة والمسائل)',
  desc: 'نشاط الكتاب: شدة الاستضاءة لمصدر نقطي تتناسب عكسياً مع مربع البعد. ثم قوة الإضاءة I والسيل الضوئي Φ = 4π I (الشكلان 7-5 و 8-5)، وشدة الاستضاءة E = Φ/A = I/r²، والفوتومتر، مع مثالي ص 92 ومسائل الفصل على الجهاز.',
  tags: 'قوة الإضاءة سيل ضوئي استضاءة لوكس قانون التربيع العكسي فوتومتر',
  fact: ['مصباح الإضاءة الكهربائي الذي قدرته 100 W قوة إضاءته 139 cd ويبعث عند اشتعاله سيلاً ضوئياً مقداره 1750 Lm (هل تعلم ص 89).', 'تقاس شدة الاستضاءة بجهاز الفوتومتر واللوكسميتر (الشكل 9-5).', 'العلاقة E = I/r² تتحقق فقط في حالة السقوط العمودي للضوء الصادر من مصدر ضوئي نقطي (ص 90).'],
  quiz: [
    { q: 'لمضاعفة شدة الاستضاءة مباشرة فوق سطح منضدة فوقها تماماً مصباح على ارتفاع 1 m من مركزها نجعل المصباح على ارتفاع:', o: ['0.75 m', '0.707 m', '0.5 m', '0.25 m'], a: 1, why: 'س1-3: E ∝ 1/r² ⟸ r₂ = r₁/√2 = 0.707 m.' },
    { q: 'تقاس قوة الإضاءة بوحدة:', o: ['الشمعة القياسية (candle)', 'Lux', 'watt', 'lumen'], a: 0, why: 'س1-4 ص 93: قوة الإضاءة تقاس بالشمعة القياسية (cd).' },
    { q: 'تقاس شدة الاستضاءة بوحدة:', o: ['Joule', 'lumen', 'Lux', 'watt'], a: 2, why: 'س1-5: Lux = Lm/m².' },
    { q: 'كلما ازداد بعد السطح المضاء بواسطة مصدر نقطي فإن شدة الاستضاءة للسطح:', o: ['تقل', 'تزداد', 'لا تتأثر', 'جميع الاحتمالات السابقة'], a: 0, why: 'س1-6: E = I/r² تقل بزيادة البعد.' },
    { q: 'مصدر ضوئي نقطي موضوع عند مركز سطح كروي. لو ازداد نصف قطر تكور هذا السطح فإن السيل الضوئي الساقط عليه من المصدر:', o: ['يتناقص', 'يتزايد', 'لا يتغير', 'كل الاحتمالات السابقة'], a: 2, why: 'س1-7 ص 94: السيل الكلي Φ = 4π I لا يعتمد على نصف القطر.' }],
  parts: [{ id: 'g10_p_activity', n: 'نشاط: قانون التربيع العكسي (ص 91)' }, { id: 'g10_p_intensity', n: 'قوة الإضاءة والسيل الضوئي (الشكلان 7-5 و 8-5)' }, { id: 'g10_p_photometer', n: 'الفوتومتر: مثال 2 + س1 + س2' }, { id: 'g10_p_problems', n: 'شدة الاستضاءة: مثال 1 + س3 + س4 + س1-3' }] });
