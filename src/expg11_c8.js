'use strict';
/* ====================== الخامس العلمي — الفصل الثامن: الحركة الاهتزازية والموجية والصوت (ch 58, ص 158–194) ======================
   Merged experiments (book order): g11_c8_shm (8-1…8-4) · g11_c8_pend (8-5, 8-6) · g11_c8_waves (8-7…8-11) · g11_c8_sound (8-12)
   · g11_c8_interf (8-13…8-15) · g11_c8_stand (8-16) · g11_c8_char (8-17…8-19) · g11_c8_doppler (8-20, 8-21) · g11_c8_review (ص 192–194).
   Local kit Q58 = Q42 + easing, number format, wave plotting, horizontal spring, metal block, table top, dimension arrows;
   reuses Q25 (fork, ear, speaker, scope, tone), Q52 (axes, watch, play chips). */
const Q58 = Object.assign(Object.create(Q42), {
  ez(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  f(v, d = 2) { let r = +(+v).toFixed(d); if (Object.is(r, -0) || Math.abs(r) < Math.pow(10, -d) / 2) r = 0; return String(r).replace('-', '−'); },
  sci(v, d = 3, u = '') { return Q31.sci(v, d, u); },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#eff6ff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  geo(S, o = {}) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 14, x1 = o.full ? w - 14 : w - (o.cw || 330), y0 = o.y0 || 58, y1 = h - (o.bot || 150); return { w, h, L, x0, x1, y0, y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 }; },
  /* a Latin line ending in ')' gets an LRM so the bracket stays on the right */
  lrm(t) { t = String(t); return !/[\u0600-\u06FF]/.test(t) && /\)\s*$/.test(t) ? '\u200E' + t + '\u200E' : t; },
  card(ctx, S, L, o) { return Q42.card(ctx, S, L.map(q => typeof q === 'string' ? Q58.lrm(q) : Object.assign({}, q, { t: Q58.lrm(q.t) })), Object.assign({ bd: '#2563eb', y: 64, wd: 316 }, o || {})); },
  steps(ctx, S, st, o) { return Q42.steps(ctx, S, Object.assign({}, st, { lines: st.lines.map(Q58.lrm) }), Object.assign({ y: 64, x: S.W - 12, wd: 316 }, o || {})); },
  stepChips(S, id, y, x0, lab, onEx, n = 9, bw = 160) { return Q42.chips(S, id, [['ex', lab || 'الحل خطوة خطوة'], ['nx', '⬇ الخطوة التالية']], y, '', (S2, k) => { if (k === 'ex' || !S2.ex) { S2.ex = 1; S2.k = 0; if (onEx) onEx(S2); if (k === 'ex') return; } S2.k = Math.min(S2.k + 1, n); }, { bw, x0 }); },
  drawSteps(ctx, list) { if (list[1]) list[1]._col = '#be185d'; Q42.drawChips(ctx, list); },
  play(S, id, y, on, onGo, onRe, o) { return Q52.play(S, id, y, on, onGo, onRe, o); },
  axes(ctx, A) { return Q52.axes(ctx, A); },
  watch(ctx, x, y, r, sec, lab, per) { Q52.watch(ctx, x, y, r, sec, lab, per); },
  arrow(ctx, x, y, dx, dy, col = '#dc2626', lab, w = 3.5) { K.force(ctx, x, y, dx, dy, lab || '', col, w); },
  line(ctx, pts, c, w, dash) { Q41.line(ctx, pts, c, w, dash); },
  /* curve y = fn(x) for screen x in [x0,x1] */
  wave(ctx, x0, x1, fn, col = '#2563eb', w = 3, dash, st = 2) { K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); for (let x = x0; x <= x1 + .01; x += st) { const y = fn(x); x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.restore(); }); },
  /* rope = thick wave with a highlight */
  rope(ctx, x0, x1, fn, col = '#b45309', w = 5) { Q58.wave(ctx, x0, x1, fn, col, w); Q58.wave(ctx, x0, x1, x => fn(x) - w * .22, 'rgba(255,255,255,.35)', w * .3); },
  /* horizontal helical spring from x0 to x1 at height y */
  hspring(ctx, x0, x1, y, o = {}) {
    const n = o.n || 12, r = o.r || 13, lead = 8;
    K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; const a = x0 + lead, b = x1 - lead, L = b - a;
      ctx.strokeStyle = o.col || '#475569'; ctx.lineWidth = o.w || 2.6; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(a, y); ctx.moveTo(b, y); ctx.lineTo(x1, y); ctx.stroke();
      for (let pass = 0; pass < 2; pass++) { ctx.strokeStyle = pass ? '#e2e8f0' : (o.col || '#475569'); ctx.lineWidth = pass ? (o.w || 2.6) * .4 : (o.w || 2.6); ctx.beginPath();
        for (let i = 0; i <= n * 24; i++) { const t = i / (n * 24), ph = t * n * TAU, xx = a + t * L + Math.cos(ph) * Math.min(3, L / n * .25), yy = y + Math.sin(ph) * r; i ? ctx.lineTo(xx - (pass ? .7 : 0), yy - (pass ? .7 : 0)) : ctx.moveTo(xx, yy); } ctx.stroke(); }
      ctx.restore(); });
  },
  /* metal block centred at (x,y) */
  block(ctx, x, y, w, h, lab, col = '#64748b') { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const g = ctx.createLinearGradient(x - w / 2, y - h / 2, x + w / 2, y + h / 2); g.addColorStop(0, shade(col, 45)); g.addColorStop(.5, col); g.addColorStop(1, shade(col, -35)); ctx.fillStyle = g; rr(ctx, x - w / 2, y - h / 2, w, h, 6); ctx.fill(); ctx.restore(); ctx.strokeStyle = 'rgba(15,23,42,.45)'; ctx.lineWidth = 1.2; rr(ctx, x - w / 2, y - h / 2, w, h, 6); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.35)'; rr(ctx, x - w / 2 + 4, y - h / 2 + 3, w - 8, 5, 2); ctx.fill(); });
    if (lab) Q42.T(ctx, lab, x, y + 1, { s: 14, w: 900, c: '#fff' }); },
  /* wooden table top from x0 to x1, surface at y */
  table(ctx, x0, x1, y, th = 14) { K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + th); g.addColorStop(0, '#d6a46b'); g.addColorStop(1, '#8b5a2b'); ctx.fillStyle = g; rr(ctx, x0, y, x1 - x0, th, 3); ctx.fill(); ctx.strokeStyle = 'rgba(120,53,15,.35)'; ctx.lineWidth = 1; for (let x = x0 + 30; x < x1; x += 46) { ctx.beginPath(); ctx.moveTo(x, y + 3); ctx.quadraticCurveTo(x + 14, y + th / 2, x + 30, y + th - 3); ctx.stroke(); } }); },
  /* fixed wall (hatched) from y0 to y1 with its face at x */
  wallv(ctx, x, y0, y1, side = -1) { K.raw(ctx, () => { const g = ctx.createLinearGradient(x + side * 18, 0, x, 0); g.addColorStop(0, '#64748b'); g.addColorStop(1, '#cbd5e1'); ctx.fillStyle = g; ctx.fillRect(Math.min(x, x + side * 18), y0, 18, y1 - y0); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.beginPath(); for (let y = y0; y < y1; y += 9) { ctx.moveTo(x, y); ctx.lineTo(x + side * 12, y + 9); } ctx.stroke(); ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); }); },
  /* double-headed dimension arrow with a label */
  dim(ctx, x0, y0, x1, y1, lab, col = '#7c3aed', o = {}) { if (Math.hypot(x1 - x0, y1 - y0) < 6) return; K.raw(ctx, () => { G.arrow(ctx, (x0 + x1) / 2, (y0 + y1) / 2, x1, y1, col, 1.8, 8); G.arrow(ctx, (x0 + x1) / 2, (y0 + y1) / 2, x0, y0, col, 1.8, 8); });
    if (lab) Q42.T(ctx, lab, (x0 + x1) / 2 + (o.dx || 0), (y0 + y1) / 2 + (o.dy != null ? o.dy : -11), { s: o.s || 11.5, w: 900, c: col, bg: 'rgba(255,255,255,.88)' }); },
  /* rounded info tile */
  tile(ctx, x, y, w, h, top, big, col = '#2563eb') { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.18)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 2; ctx.fillStyle = '#fff'; rr(ctx, x, y, w, h, 10); ctx.fill(); ctx.restore(); ctx.strokeStyle = col; ctx.lineWidth = 1.6; rr(ctx, x, y, w, h, 10); ctx.stroke(); });
    Q42.T(ctx, top, x + w / 2, y + 15, { s: 11, w: 800, c: '#475569' }); Q42.T(ctx, big, x + w / 2, y + h - 17, { s: 15, w: 900, c: col }); },
  /* a stopwatch-like count of oscillations: returns updated {n, last} given signed position crossing upward */
  cross(st, xprev, x, vt) { if (xprev < 0 && x >= 0) { st.n++; st.cr.push(vt); if (st.cr.length > 8) st.cr.shift(); if (st.n === 1) st.c0 = vt; st.cl = vt; } },
  /* complete oscillations counted between the first and the last upward crossing */
  per(st) { const n = Math.max(0, st.n - 1); return { n, t: n ? st.cl - st.c0 : 0, T: n ? (st.cl - st.c0) / n : 0 }; },
  tone(f, d, o) { return Q25.tone(f, d, o); },
  noteStop(h) { Q25.stop(h); }
});

/* =============== A1 — قانون هوك والحركة التوافقية البسيطة: كتلة ونابض على سطح أملس (الشكل 3، ص 159–160) =============== */
(() => {
  const SC = 520; // px per metre
  const D = { id: 'g11_o_spring', page: 159, fig: 'الشكل 3 (a , b , c)',
    desc: 'كتلة m على سطح أفقي أملس مربوطة بنابض. عندما نسحبها إزاحة x نحو اليمين يؤثر النابض بقوة معيدة نحو اليسار، وعندما نكبسها تكون القوة نحو اليمين. قانون هوك: F = −k x. والحركة التوافقية البسيطة حركة اهتزازية على خط مستقيم تتناسب فيها القوة المعيدة والتعجيل طردياً مع الإزاحة وباتجاه معاكس لها: a ∝ −x.',
    tags: 'قانون هوك القوة المعيدة F=-kx ثابت النابض N/m الحركة التوافقية البسيطة a∝-x موضع الاستقرار سطح أملس الشكل 3 8-1 8-2 8-3 الحركة الدورية الاهتزازية',
    tools: ['كتلة m', 'نابض', 'سطح أفقي أملس'],
    steps: ['اسحب الكتلة نحو اليمين ثم أفلتها: لاحظ سهم القوة المعيدة الأحمر يشير دائماً نحو موضع الاستقرار.', 'اكبس النابض بسحب الكتلة نحو اليسار: انعكس اتجاه القوة.', 'راقب المخطط: الإزاحة والتعجيل متعاكسان دائماً.', 'غيّر ثابت النابض k والكتلة m من اللوحة ولاحظ تغير سرعة الاهتزاز والزمن الدوري المقاس.'],
    concl: ['القوة المعيدة F = −k x تتناسب طردياً مع الإزاحة وتعاكسها في الاتجاه.', 'التعجيل a = −(k/m) x يتناسب طردياً مع الإزاحة ويعاكسها: هذه هي الحركة التوافقية البسيطة.', 'تكون القوة والتعجيل صفراً عند موضع الاستقرار وأكبر ما يمكن عند أقصى إزاحة.', 'شروط الحركة الاهتزازية: قوة معيدة، واستمرارية، ومصدر يجهز الطاقة.'],
    laws: ['g11_l8_hooke', 'g11_l8_shm'],
    controls: [R('k', 'ثابت النابض k', 10, 100, 40, 5, 'N/m'), R('m', 'الكتلة m', .2, 2, 1, .1, 'kg'), TG('vec', 'أسهم القوة والسرعة', true, null, 'vector'), TG('acc', 'منحني التعجيل', true, null, 'chart')],
    setup(S) { S.x = .1; S.v = 0; S.hold = 0; S.tx = .1; S.clk = 0; S.hx = []; S.st = { n: 0, cr: [] }; S.Tm = 0; },
    update(S, dt) {
      const k = S.p.k, m = S.p.m;
      if (S.hold) { S.x = Q58.ez(S.x, S.tx, dt, 14); S.v = 0; }
      else { const n = 8, h = dt / n; for (let i = 0; i < n; i++) { const xp = S.x; S.v += -(k / m) * S.x * h; S.x += S.v * h; Q58.cross(S.st, xp, S.x, S.clk + h * i); } }
      S.clk += dt; S.hx.push([S.clk, S.x]); while (S.hx.length && S.hx[0][0] < S.clk - 6.2) S.hx.shift();
      const c = S.st.cr; S.Tm = c.length > 1 ? (c[c.length - 1] - c[0]) / (c.length - 1) : 0;
    },
    geo(S) { const g = Q58.geo(S); g.ys = 250; g.wx = g.x0 + 18; g.xe = g.x0 + 236; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), k = S.p.k, m = S.p.m, x = S.x, F = -k * x, a = F / m, mx = g.xe + x * SC, bw = 74, bh = 56, yc = g.ys - bh / 2;
      Q58.bg(ctx, w, h); Q58.table(ctx, g.x0, g.x1 + 4, g.ys); Q58.wallv(ctx, g.wx, g.ys - 120, g.ys, -1);
      Q58.line(ctx, [[g.xe, g.ys - 120], [g.xe, g.ys + 46]], '#16a34a', 1.6, [6, 5]); Q42.T(ctx, 'موضع الاستقرار', g.xe, g.ys + 58, { s: 11, w: 800, c: '#16a34a' });
      Q58.hspring(ctx, g.wx, mx - bw / 2, yc, { n: 13, r: 14 });
      Q58.block(ctx, mx, yc, bw, bh, 'm', '#2563eb');
      Q58.dim(ctx, g.xe, g.ys + 26, mx, g.ys + 26, Math.abs(x) > .004 ? 'x = ' + Q58.f(x * 100, 1) + ' cm' : '', '#7c3aed', { dy: 15 });
      if (S.p.vec) { if (Math.abs(F) > .05) Q58.arrow(ctx, mx, yc - 6, F * 7, 0, '#dc2626', 'F', 4); if (Math.abs(S.v) > .01) Q58.arrow(ctx, mx, yc - bh / 2 - 18, S.v * 110, 0, '#16a34a', 'v', 3); }
      Q42.T(ctx, x > .004 ? 'سحب: القوة المعيدة نحو اليسار' : x < -.004 ? 'كبس: القوة المعيدة نحو اليمين' : 'عند الاستقرار F = 0', (g.x0 + g.x1) / 2 + 20, g.y0 + 30, { s: 12.5, w: 900, c: '#fff', bg: Math.abs(x) > .004 ? '#dc2626' : '#16a34a' });
      // graph
      const A = { x: g.L + 64, y: 370, w: w - g.L - 120, h: 190, x0: 0, x1: 6, y0: -16, y1: 16, xs: .5, ys: 4, lx: 1, ly: 8, xl: 't (s)', yl: 'x (cm)', col: '#2563eb' }, M = Q58.axes(ctx, A), t0 = Math.max(0, S.clk - 6);
      const amax = (k / m) * .16 || 1;
      Q52.plot(ctx, S.hx.map(p => [M.X(p[0] - t0), M.Y(p[1] * 100)]), '#2563eb', 2.8);
      if (S.p.acc) { Q52.plot(ctx, S.hx.map(p => [M.X(p[0] - t0), M.Y(-(k / m) * p[1] / amax * 16)]), '#dc2626', 2, [6, 4]); Q42.T(ctx, 'التعجيل a بمقياس آخر', A.x + A.w - 70, A.y + 8, { s: 10.5, w: 800, c: '#dc2626', bg: 'rgba(255,255,255,.9)' }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      Q58.card(ctx, S, [{ t: 'F = −k x', mono: 1, c: '#dc2626', w: 900 }, { t: 'F = −' + k + ' × ' + (x < 0 ? '(' + Q58.f(x, 3) + ')' : Q58.f(x, 3)) + ' = ' + Q58.f(F, 2) + ' N', mono: 1 }, { t: 'a = F / m = ' + Q58.f(a, 2) + ' m/s²', mono: 1, c: '#7c3aed', w: 800 }, { t: 'a ∝ −x', mono: 1, c: '#0f766e', w: 900 }, { t: 'الزمن الدوري المقاس من المخطط:', c: '#334155', w: 800 }, { t: 'T = ' + (S.Tm ? Q58.f(S.Tm, 2) + ' s' : '...'), mono: 1, c: '#2563eb', w: 900 }, { t: 'القوة والتعجيل باتجاه موضع الاستقرار دائماً', c: '#64748b', s: 11.5 }], { title: 'قانون هوك' });
      Q42.banner(ctx, w, 'اسحب الكتلة يميناً أو يساراً ثم أفلتها');
    },
    chips(S, g) { return Q42.chips(S, 'go', [['pull', 'اسحب 10 cm وأفلت'], ['push', 'اكبس 10 cm وأفلت'], ['st', 'أوقف عند الاستقرار']], g.h - 84, '', (S2, k) => { S2.hold = 0; S2.v = 0; S2.x = k === 'pull' ? .1 : k === 'push' ? -.1 : 0; S2.st = { n: 0, cr: [] }; }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), mx = g.xe + S.x * SC;
      return [{ id: 'mass', x: mx, y: g.ys - 28, r: 34, axis: 'x', keep: true, tip: 'اسحب الكتلة', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; S2.tx = clamp((d.x - g.xe) / SC, -.15, .15); }, up: S2 => { S2.hold = 0; S2.v = 0; S2.st = { n: 0, cr: [] }; } }].concat(D.chips(S, g)); },
    readings(S) { const F = -S.p.k * S.x; return [rd('الإزاحة x', Q58.f(S.x * 100, 1) + ' cm'), rd('القوة المعيدة F', Q58.f(F, 2) + ' N'), rd('التعجيل a', Q58.f(F / S.p.m, 2) + ' m/s²'), rd('السرعة v', Q58.f(S.v, 2) + ' m/s'), rd('T المقاس', S.Tm ? Q58.f(S.Tm, 2) + ' s' : '—')]; },
    record(S) { const F = -S.p.k * S.x; return { x: +(S.x * 100).toFixed(1), F: +F.toFixed(2), a: +(F / S.p.m).toFixed(2) }; },
    cols: [['x', 'x (cm)'], ['F', 'F (N)'], ['a', 'a (m/s²)']],
    explain(S) { return Q26.ex('كلما ابتعدت الكتلة عن موضع الاستقرار كبر سهم القوة المعيدة واتجه نحو موضع الاستقرار، فتهتز الكتلة ذهاباً وإياباً.', 'النابض المشدود أو المكبوس يؤثر بقوة F = −k x ، والإشارة السالبة تعني أن القوة تعاكس الإزاحة. ومن قانون نيوتن الثاني a = −(k/m) x ، فالتعجيل يتناسب مع الإزاحة ويعاكسها: هذا تعريف الحركة التوافقية البسيطة.', 'نوابض السيارات وأوتار الغيتار والأرجوحة وبندول الساعة كلها أمثلة على الحركة الدورية والاهتزازية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — نشاط: تمثيل الحركة التوافقية البسيطة بيانياً (الشكل 4، ص 160) =============== */
(() => {
  const SC = 420;
  const D = { id: 'g11_o_trace', page: 160, fig: 'الشكل 4 — نشاط عملي',
    desc: 'نشاط: نربط كتلة m بنابض معلق ونثبت بها قلماً يلامس شريطاً ورقياً ملفوفاً حول أسطوانة. نسحب الكتلة إلى الأسفل ونتركها، وندير الأسطوانة فيتحرك الشريط أفقياً فيرسم القلم منحنياً جيبياً. الهزة الكاملة: مرور الجسم بنقطة معينة مرتين متتاليتين بالاتجاه نفسه. السعة: أعظم إزاحة. الزمن الدوري T = زمن عدة اهتزازات ÷ عددها، والتردد f = 1/T.',
    tags: 'نشاط عملي تمثيل الحركة التوافقية بيانياً شريط ورقي أسطوانة قلم منحني جيبي الهزة الكاملة سعة الاهتزاز الزمن الدوري التردد هيرتز Hz الشكل 4',
    tools: ['كتلة m', 'نابض', 'قلم', 'شريط ورقي بياني ملفوف حول أسطوانة', 'ساعة توقيت'],
    steps: ['اربط الكتلة بالنابض وثبت القلم فيها بحيث يلامس الشريط الورقي.', 'اسحب الكتلة إلى الأسفل ثم أفلتها (أو اضغط «اسحب وأفلت»).', 'اضغط «دوّر الأسطوانة» ليتحرك الشريط أفقياً: ماذا يرسم القلم؟', 'عُدّ الهزات بساعة التوقيت واحسب T = t ÷ n و f = 1 ÷ T.'],
    concl: ['يرسم القلم منحنياً جيبياً: الإزاحة دالة جيبية للزمن.', 'الهزة الكاملة: مرور الجسم بالنقطة نفسها مرتين متتاليتين بالاتجاه نفسه.', 'سعة الاهتزاز A أعظم إزاحة عن موضع الاستقرار.', 'T = زمن الاهتزازات ÷ عددها، والتردد f = 1/T ويقاس بالهيرتز Hz.'],
    laws: ['g11_l8_period'],
    controls: [R('k', 'ثابت النابض k', 10, 80, 20, 5, 'N/m'), R('m', 'الكتلة m', .2, 2, .5, .1, 'kg'), R('sp', 'سرعة الشريط', 2, 12, 6, 1, 'cm/s'), TG('mk', 'علامات السعة والهزة', true, null, 'labels')],
    setup(S) { S.y = .08; S.v = 0; S.hold = 0; S.ty = 0; S.clk = 0; S.drum = 1; S.tr = []; S.pp = 0; S.st = { n: 0, cr: [] }; S.tw = 0; S.on = 1; S.amp = .08; },
    update(S, dt) {
      const k = S.p.k, m = S.p.m;
      if (S.hold) { S.y = Q58.ez(S.y, S.ty, dt, 14); S.v = 0; }
      else { const n = 8, h = dt / n; for (let i = 0; i < n; i++) { const yp = S.y; S.v += -(k / m) * S.y * h; S.y += S.v * h; if (S.on) Q58.cross(S.st, yp, S.y, S.tw + h * i); } if (S.on) S.tw += dt; }
      S.amp = Math.max(Math.abs(S.y) * (S.hold ? 1 : 0), S.amp * (S.hold ? 0 : 1), Math.abs(S.y));
      S.clk += dt; if (S.drum) { S.pp += S.p.sp * 10 * dt; S.tr.push([S.pp, S.y]); }
      while (S.tr.length && S.tr[0][0] < S.pp - 420) S.tr.shift();
    },
    geo(S) { const g = Q58.geo(S); g.sx = g.x1 - 66; g.top = 76; g.yc = 222; g.pen = g.sx - 64; g.px0 = g.x0 + 44; g.py0 = 120; g.py1 = 324; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), y = S.y, my = g.yc + y * SC, k = S.p.k, m = S.p.m;
      Q58.bg(ctx, w, h);
      // paper strip + drum
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.2)'; ctx.shadowBlur = 8; ctx.fillStyle = '#fffef7'; ctx.fillRect(g.px0, g.py0, g.pen + 26 - g.px0, g.py1 - g.py0); ctx.restore();
        ctx.save(); ctx.beginPath(); ctx.rect(g.px0, g.py0, g.pen + 26 - g.px0, g.py1 - g.py0); ctx.clip(); const off = S.pp % 20; ctx.strokeStyle = 'rgba(37,99,235,.13)'; ctx.lineWidth = 1;
          for (let x = g.pen + 26 + off - 20 * 30; x < g.pen + 26; x += 20) { if (x < g.px0) continue; ctx.beginPath(); ctx.moveTo(x, g.py0); ctx.lineTo(x, g.py1); ctx.stroke(); } for (let yy = g.yc - 100; yy <= g.py1; yy += 20) { ctx.beginPath(); ctx.moveTo(g.px0, yy); ctx.lineTo(g.pen + 26, yy); ctx.stroke(); } ctx.restore();
        const dg = ctx.createLinearGradient(g.px0 - 26, 0, g.px0 + 8, 0); dg.addColorStop(0, '#475569'); dg.addColorStop(.5, '#e2e8f0'); dg.addColorStop(1, '#64748b'); ctx.fillStyle = dg; rr(ctx, g.px0 - 26, g.py0 - 14, 32, g.py1 - g.py0 + 28, 12); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.stroke();
        ctx.strokeStyle = 'rgba(15,23,42,.35)'; for (let i = 0; i < 4; i++) { const yy = g.py0 + ((S.pp * .9 + i * 55) % (g.py1 - g.py0)); ctx.beginPath(); ctx.moveTo(g.px0 - 24, yy); ctx.lineTo(g.px0 + 4, yy); ctx.stroke(); } });
      Q58.line(ctx, [[g.px0, g.yc], [g.pen + 26, g.yc]], '#16a34a', 1.3, [6, 5]);
      // trace
      const X = pp => g.pen - (S.pp - pp);
      K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.px0, g.py0, g.pen - g.px0 + 2, g.py1 - g.py0); ctx.clip(); ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 2.4; ctx.beginPath(); S.tr.forEach((p, i) => { const xx = X(p[0]), yy = g.yc + p[1] * SC; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke(); ctx.restore(); });
      if (S.p.mk && S.amp > .01) { const ay = g.yc - S.amp * SC; Q58.dim(ctx, g.px0 + 40, g.yc, g.px0 + 40, ay, 'A', '#dc2626', { dx: 16, dy: 0 }); }
      if (S.p.mk && S.drum && S.st.cr.length > 1 && !S.hold) { const om = Math.sqrt(k / m), Tn = TAU / om, x1 = g.pen, x0 = g.pen - Tn * S.p.sp * 10; if (x0 > g.px0 + 10) { Q58.dim(ctx, x0, g.py0 + 14, x1, g.py0 + 14, 'هزة كاملة', '#7c3aed', { dy: 12 }); Q58.line(ctx, [[x0, g.py0 + 6], [x0, g.py1 - 6]], 'rgba(124,58,237,.5)', 1.2, [3, 4]); } }
      Q42.T(ctx, 'اتجاه حركة الورقة ⬅', (g.px0 + g.pen) / 2, g.py1 + 14, { s: 11, w: 800, c: '#334155' });
      // stand, spring, mass, pen
      Q42.stand(ctx, g.x1 - 14, g.top - 14, g.py1 + 10, g.sx - 10);
      Q42.spring(ctx, g.sx, g.top - 10, my - 24, { n: 12, r: 12 });
      Q58.line(ctx, [[g.sx - 22, my], [g.pen, my]], '#334155', 3);
      K.raw(ctx, () => { ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.moveTo(g.pen, my); ctx.lineTo(g.pen + 10, my - 4); ctx.lineTo(g.pen + 10, my + 4); ctx.fill(); });
      Q58.block(ctx, g.sx, my, 46, 48, 'm', '#2563eb');
      // measurement tiles
      const ty = 372, tw = 140; Q58.watch(ctx, g.L + 80, ty + 60, 50, S.tw, 'ساعة التوقيت', 10);
      const P = Q58.per(S.st), T = P.T;
      Q58.tile(ctx, g.L + 150, ty + 6, tw, 56, 'عدد الهزات n', String(P.n), '#7c3aed'); Q58.tile(ctx, g.L + 150 + tw + 10, ty + 6, tw, 56, 'زمنها t', Q58.f(P.t, 2) + ' s', '#0f766e');
      Q58.tile(ctx, g.L + 150, ty + 72, tw, 56, 'T = t ÷ n', T ? Q58.f(T, 2) + ' s' : '—', '#2563eb'); Q58.tile(ctx, g.L + 150 + tw + 10, ty + 72, tw, 56, 'f = 1 ÷ T', T ? Q58.f(1 / T, 2) + ' Hz' : '—', '#dc2626');
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      Q58.card(ctx, S, [{ t: 'الهزة الكاملة: مرور الجسم بالنقطة نفسها مرتين متتاليتين بالاتجاه نفسه', c: '#7c3aed', w: 800 }, { t: 'سعة الاهتزاز: أعظم إزاحة', c: '#dc2626', w: 800 }, { t: 'A = ' + Q58.f(S.amp * 100, 1) + ' cm', mono: 1, c: '#dc2626' }, { t: 'الزمن الدوري = زمن الاهتزازات ÷ عددها', c: '#2563eb', w: 800 }, { t: 'التردد: عدد الاهتزازات في الثانية ويقاس بالهيرتز', c: '#334155', w: 800 }, { t: 'f = 1 / T', mono: 1, c: '#0f766e', w: 900 }], { title: 'نشاط: رسم الحركة' });
      Q42.banner(ctx, w, 'اسحب الكتلة إلى الأسفل وأفلتها، والورقة تتحرك');
    },
    chips(S, g) { return Q42.chips(S, 'tr', [['go', 'اسحب 10 cm وأفلت'], ['dr', S.drum ? '⏸ أوقف الأسطوانة' : '▶ دوّر الأسطوانة'], ['cl', 'امسح الورقة']], g.h - 84, S.drum ? 'dr' : '', (S2, k) => { if (k === 'go') { S2.hold = 0; S2.y = .1; S2.v = 0; S2.amp = .1; S2.on = 1; S2.tw = 0; S2.st = { n: 0, cr: [] }; } else if (k === 'dr') S2.drum = S2.drum ? 0 : 1; else { S2.tr = []; } }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      return [{ id: 'mass', x: g.sx, y: g.yc + S.y * SC, r: 30, axis: 'y', keep: true, tip: 'اسحب الكتلة', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; S2.ty = clamp((d.y - g.yc) / SC, -.2, .2); S2.amp = Math.abs(S2.ty); }, up: S2 => { S2.hold = 0; S2.v = 0; S2.on = 1; S2.tw = 0; S2.st = { n: 0, cr: [] }; } }].concat(D.chips(S, g)); },
    readings(S) { const P = Q58.per(S.st), T = P.T; return [rd('عدد الهزات', String(P.n)), rd('زمنها', Q58.f(P.t, 2) + ' s'), rd('الزمن الدوري T', T ? Q58.f(T, 2) + ' s' : '—'), rd('التردد f', T ? Q58.f(1 / T, 2) + ' Hz' : '—'), rd('السعة A', Q58.f(S.amp * 100, 1) + ' cm')]; },
    record(S) { const P = Q58.per(S.st), T = P.T; return { n: P.n, t: +P.t.toFixed(2), T: +T.toFixed(3), f: T ? +(1 / T).toFixed(3) : 0 }; },
    cols: [['n', 'n'], ['t', 't (s)'], ['T', 'T (s)'], ['f', 'f (Hz)']],
    explain(S) { return Q26.ex('يرسم القلم على الشريط المتحرك منحنياً يشبه منحني الجيب، قممه وقيعانه على البعد نفسه من خط الاستقرار.', 'الكتلة تتحرك حركة توافقية بسيطة، وحركة الورقة المنتظمة تحوّل الزمن إلى مسافة أفقية، فيظهر مخطط الإزاحة − الزمن. والزمن بين قمتين متتاليتين هو الزمن الدوري.', 'أجهزة رسم الزلازل (السيزموغراف) وتخطيط القلب ترسم الاهتزازات على ورق متحرك بالطريقة نفسها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A3 — الحركة الدائرية المنتظمة وظلها: x = A sinθ (الأشكال 5 و 6 و 7، ص 161) =============== */
(() => {
  const D = { id: 'g11_o_circle', page: 161, fig: 'الأشكال 5 و 6 و 7',
    desc: 'كرة مثبتة على حافة قرص يدور بسرعة زاوية منتظمة ω ، ويسقط ضوء على الكرة فيظهر ظلها على شاشة. يتحرك الظل ذهاباً وإياباً حركة توافقية بسيطة، وإزاحته x = A sinθ حيث A نصف قطر الدوران (السعة) و θ الإزاحة الزاوية. فالحركة التوافقية البسيطة هي مسقط الحركة الدائرية المنتظمة على قطر الدائرة.',
    tags: 'العلاقة بين الحركة الدائرية المنتظمة والحركة التوافقية البسيطة ظل كرة قرص دوار شاشة x=A sinθ السرعة الزاوية ω منحني الجيب وجيب التمام الأشكال 5 6 7 8-4',
    tools: ['قرص دوار', 'كرة صغيرة', 'مصباح', 'شاشة'],
    steps: ['شغّل القرص وراقب ظل الكرة على الشاشة: يتحرك صعوداً ونزولاً فقط.', 'لاحظ المخطط في الأسفل: إزاحة الظل مع الزاوية θ ترسم منحني الجيب.', 'اسحب الكرة بيدك حول القرص لتضعها عند زاوية معينة وقارن x مع A sinθ.', 'شغّل «منحني جيب التمام» لترى مسقط الحركة على القطر الآخر.'],
    concl: ['ظل جسم يدور بانتظام يتحرك حركة توافقية بسيطة.', 'x = A sinθ ، و θ = ω t.', 'السعة A تساوي نصف قطر الدوران، والزمن الدوري للظل يساوي زمن دورة القرص T = 2π/ω.'],
    laws: ['g11_l8_circ'],
    controls: [R('A', 'نصف القطر (السعة) A', 3, 10, 8, .5, 'cm'), R('w', 'السرعة الزاوية ω', .3, 3, 1, .1, 'rad/s'), TG('cos', 'منحني جيب التمام', false, null, 'chart'), TG('ray', 'أشعة الضوء', true, null, 'light')],
    setup(S) { S.th = 0; S.tot = 0; S.go = 1; S.hold = 0; S.tth = 0; S.Ae = S.p.A; },
    update(S, dt) { S.Ae = Q58.ez(S.Ae, S.p.A, dt, 8);
      if (S.hold) { let d = S.tth - S.th; d = ((d + Math.PI) % TAU + TAU) % TAU - Math.PI; const st = d * Math.min(1, dt * 12); S.th += st; S.tot = Math.max(0, S.tot + st); }
      else if (S.go) { S.th += S.p.w * dt; S.tot += S.p.w * dt; }
      if (S.tot > 4 * Math.PI) S.tot -= 4 * Math.PI; },
    geo(S) { const g = Q58.geo(S); g.cx = g.x0 + 150; g.cy = 196; g.u = 10; g.sx = g.x1 - 30; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), R0 = S.Ae * g.u, th = S.th, bx = g.cx + R0 * Math.cos(th), by = g.cy - R0 * Math.sin(th), xs = S.Ae * Math.sin(th);
      Q58.bg(ctx, w, h);
      Q45.lamp(ctx, g.x0 + 18, g.cy, .8, 20, true);
      if (S.p.ray) for (let k = -5; k <= 5; k++) { const yy = g.cy + k * 18; const blk = Math.abs(yy - by) < 9; Q58.line(ctx, [[g.x0 + 36, yy], [blk ? bx - 8 : g.sx, yy]], 'rgba(234,179,8,.55)', 1.6); }
      // disk
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 12; const dg = ctx.createRadialGradient(g.cx - 20, g.cy - 20, 10, g.cx, g.cy, 112); dg.addColorStop(0, '#f8fafc'); dg.addColorStop(1, '#94a3b8'); ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(g.cx, g.cy, 108, 0, TAU); ctx.fill(); ctx.restore();
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.cx, g.cy, 108, 0, TAU); ctx.stroke(); ctx.strokeStyle = 'rgba(71,85,105,.35)'; for (let k = 0; k < 12; k++) { const a = th + k * TAU / 12; ctx.beginPath(); ctx.moveTo(g.cx + Math.cos(a) * 96, g.cy - Math.sin(a) * 96); ctx.lineTo(g.cx + Math.cos(a) * 106, g.cy - Math.sin(a) * 106); ctx.stroke(); }
        ctx.strokeStyle = 'rgba(37,99,235,.5)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(g.cx, g.cy, R0, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(g.cx, g.cy, 5, 0, TAU); ctx.fill(); });
      Q58.line(ctx, [[g.cx, g.cy], [bx, by]], '#7c3aed', 2.5); Q58.line(ctx, [[g.cx - 112, g.cy], [g.cx + 112, g.cy]], 'rgba(15,23,42,.3)', 1, [4, 4]);
      Q51.arc(ctx, g.cx, g.cy, 26, 0, ((th * 180 / Math.PI) % 360 + 360) % 360, '#be185d', 'θ', { lo: 12 });
      K.ball(ctx, bx, by, 9, '#dc2626');
      // screen + shadow
      K.raw(ctx, () => { const sg = ctx.createLinearGradient(g.sx, 0, g.sx + 14, 0); sg.addColorStop(0, '#f8fafc'); sg.addColorStop(1, '#cbd5e1'); ctx.fillStyle = sg; ctx.fillRect(g.sx, g.cy - 130, 14, 260); ctx.strokeStyle = '#64748b'; ctx.strokeRect(g.sx, g.cy - 130, 14, 260); ctx.fillStyle = 'rgba(15,23,42,.8)'; ctx.beginPath(); ctx.ellipse(g.sx + 3, by, 4, 9, 0, 0, TAU); ctx.fill(); });
      Q58.line(ctx, [[bx, by], [g.sx, by]], 'rgba(220,38,38,.55)', 1.3, [5, 4]);
      Q58.dim(ctx, g.sx - 14, g.cy, g.sx - 14, by, Math.abs(xs) > .3 ? 'x' : '', '#0f766e', { dx: -12, dy: 0 });
      Q42.T(ctx, 'الشاشة', g.sx + 7, g.cy + 146, { s: 11, w: 800, c: '#334155' });
      // graph
      const A = { x: g.L + 64, y: 380, w: w - g.L - 120, h: 180, x0: 0, x1: 4, y0: -11, y1: 11, xs: .5, ys: 2.5, lx: 1, ly: 5, xl: 'θ (π rad)', yl: 'x (cm)', col: '#0f766e' }, M = Q58.axes(ctx, A), tp = S.tot / Math.PI, Aa = S.Ae;
      const pts = [], pc = []; for (let u = 0; u <= tp; u += .02) { pts.push([M.X(u), M.Y(Aa * Math.sin(u * Math.PI))]); pc.push([M.X(u), M.Y(Aa * Math.cos(u * Math.PI))]); }
      if (S.p.cos) Q52.plot(ctx, pc, '#d97706', 2.2, [6, 4]); Q52.plot(ctx, pts, '#0f766e', 3); Q41.dot(ctx, M.X(tp), M.Y(Aa * Math.sin(tp * Math.PI)), '#dc2626', 6);
      ['π', '2π', '3π', '4π'].forEach((s, i) => Q42.T(ctx, s, M.X(i + 1), A.y + A.h + 24, { s: 11, w: 900, c: '#be185d' }));
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      const deg = ((th * 180 / Math.PI) % 360 + 360) % 360;
      Q58.card(ctx, S, [{ t: 'x = A sin θ', mono: 1, c: '#0f766e', w: 900 }, { t: 'θ = ' + Q58.f(deg, 0) + '°', mono: 1 }, { t: 'x = ' + Q58.f(S.Ae, 1) + ' × sin ' + Q58.f(deg, 0) + '° = ' + Q58.f(xs, 2) + ' cm', mono: 1, c: '#dc2626', w: 800 }, { t: 'θ = ω t', mono: 1, c: '#7c3aed' }, { t: 'T = 2π / ω = ' + Q58.f(TAU / S.p.w, 2) + ' s', mono: 1, c: '#2563eb', w: 800 }, { t: 'الظل يتحرك حركة توافقية بسيطة سعتها نصف قطر الدوران', c: '#334155', w: 800 }].concat(S.p.cos ? [{ t: 'المسقط الأفقي يتبع x = A cos θ', c: '#d97706', w: 800 }] : []), { title: 'الدائري ⟷ التوافقي' });
      Q42.banner(ctx, w, 'راقب ظل الكرة على الشاشة، واسحب الكرة حول القرص');
    },
    chips(S, g) { return Q58.play(S, 'pl', g.h - 84, S.go, S2 => { S2.go = S2.go ? 0 : 1; }, S2 => { S2.th = 0; S2.tot = 0; }, { go: '▶ دوّر القرص' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), R0 = S.Ae * g.u;
      return [{ id: 'ball', x: g.cx + R0 * Math.cos(S.th), y: g.cy - R0 * Math.sin(S.th), r: 20, axis: 'xy', keep: true, tip: 'اسحب الكرة حول القرص', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; S2.tth = Math.atan2(g.cy - d.y, d.x - g.cx); }, up: S2 => { S2.hold = 0; } }].concat(D.chips(S, g)); },
    readings(S) { const deg = ((S.th * 180 / Math.PI) % 360 + 360) % 360; return [rd('الزاوية θ', Q58.f(deg, 0) + '°'), rd('إزاحة الظل x', Q58.f(S.Ae * Math.sin(S.th), 2) + ' cm'), rd('السعة A', Q58.f(S.p.A, 1) + ' cm'), rd('الزمن الدوري', Q58.f(TAU / S.p.w, 2) + ' s')]; },
    record(S) { const deg = ((S.th * 180 / Math.PI) % 360 + 360) % 360; return { th: +deg.toFixed(0), x: +(S.Ae * Math.sin(S.th)).toFixed(2) }; },
    cols: [['th', 'θ (°)'], ['x', 'x (cm)']],
    explain(S) { return Q26.ex('الكرة تدور بانتظام لكن ظلها على الشاشة يصعد وينزل فقط، أسرع ما يكون عند المنتصف وأبطأ ما يكون عند الطرفين.', 'الظل يمثل المسقط الشاقولي لموضع الكرة: x = A sinθ و θ = ωt ، فإزاحته دالة جيبية للزمن، وهذا هو شكل الحركة التوافقية البسيطة.', 'المكبس في محرك السيارة يتحرك ذهاباً وإياباً بينما يدور عمود المرفق دوراناً منتظماً تقريباً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — البندول البسيط: T = 2π√(L/g) + مثال 1 (الأشكال 8 و 9، ص 162) =============== */
(() => {
  const EX = { q: 'ساعة بندولية طول خيط بندولها 1 m ، احسب زمنها الدوري علماً أن g = 9.8 m/s²', lines: ['T = 2π √(L / g)', 'T = 2 × 3.14 × √(1 / 9.8)', 'T = 6.28 × 0.319', 'T = 2 s'] };
  const GS = [['sea', 'عند سطح البحر', 9.8], ['mt', 'على قمة جبل', 9.78], ['moon', 'على سطح القمر', 1.6]];
  const D = { id: 'g11_o_pend', page: 162, fig: 'الشكلان 8 و 9 + مثال 1',
    desc: 'البندول البسيط كرة صغيرة معلقة بخيط مهمل الوزن غير قابل للاستطالة طوله L. إذا أزيحت الكرة بزاوية صغيرة (لا تزيد على 5°) وتُركت تهتز حركة توافقية بسيطة a → c → b → c → a. القوة المعيدة مركبة الوزن المماسية F = −mg sinθ ، والزمن الدوري T = 2π√(L/g) لا يعتمد على كتلة الكرة ولا على سعة الاهتزاز.',
    tags: 'البندول البسيط طول الخيط زاوية صغيرة 5 درجات mg sinθ mg cosθ قوة الشد T=2π√(L/g) كتلة الكرة التعجيل الأرضي مثال 1 ساعة بندولية 2 s الشكل 8 الشكل 9 8-5',
    tools: ['كرة صغيرة', 'خيط', 'حامل', 'ساعة توقيت', 'منقلة'],
    steps: ['اسحب الكرة جانباً بزاوية صغيرة ثم أفلتها: لاحظ المسار a ثم c ثم b ثم c ثم a.', 'راقب مركبتي الوزن: mg sinθ تعيد الكرة إلى c ، و mg cosθ يوازنها الشد.', 'غيّر الكتلة m: هل يتغير الزمن الدوري؟ ثم غيّر الطول L.', 'شغّل «بندول بطول مضاعف» للمقارنة، وجرّب g على قمة جبل وعلى القمر.', 'اضغط «مثال 1 ص 162» لحل مثال الكتاب.'],
    concl: ['T = 2π √(L / g).', 'الزمن الدوري لا يعتمد على كتلة الكرة ولا على السعة (للزوايا الصغيرة).', 'مضاعفة الطول تزيد الزمن الدوري √2 مرة، ويزداد T حيث يقل g كما على قمة جبل.', 'مثال 1: بندول طوله 1 m زمنه الدوري 2 s.'],
    laws: ['g11_l8_pend'],
    controls: [R('L', 'طول الخيط L', .25, 2.5, 1, .05, 'm'), R('g', 'التعجيل الأرضي g', 1.6, 9.8, 9.8, .01, 'm/s²'), R('m', 'كتلة الكرة m', .05, 1, .2, .05, 'kg'), TG('two', 'بندول بطول مضاعف للمقارنة', false, null, 'compare')],
    setup(S) { S.a = 5 * Math.PI / 180; S.w = 0; S.a2 = S.a; S.w2 = 0; S.hold = 0; S.ta = 0; S.sc = 100; S.clk = 0; S.h = []; S.tw = 0; S.st = { n: 0, cr: [] }; S.ex = 0; S.k = 0; S.Le = S.p.L; },
    rel(S) { S.w = 0; S.a2 = S.a; S.w2 = 0; S.tw = 0; S.st = { n: 0, cr: [] }; },
    update(S, dt) {
      const g = S.p.g; S.Le = Q58.ez(S.Le, S.p.L, dt, 8); const L = S.Le;
      if (S.hold) { S.a = Q58.ez(S.a, S.ta, dt, 14); S.w = 0; S.a2 = S.a; S.w2 = 0; }
      else { const n = 10, h = dt / n; for (let i = 0; i < n; i++) { const ap = S.a; S.w += -(g / L) * Math.sin(S.a) * h; S.a += S.w * h; S.w2 += -(g / (2 * L)) * Math.sin(S.a2) * h; S.a2 += S.w2 * h; Q58.cross(S.st, ap, S.a, S.tw + h * i); } S.tw += dt; }
      const tg = 222 / (S.p.two ? 2 * S.p.L : S.p.L); S.sc = Q58.ez(S.sc, Math.min(200, tg), dt, 6);
      S.clk += dt; S.h.push([S.clk, S.a, S.a2]); while (S.h.length && S.h[0][0] < S.clk - 10.2) S.h.shift();
    },
    geo(S) { const g = Q58.geo(S); g.px = g.x0 + 190; g.py = 80; return g; },
    bob(S, g, a, L) { return [g.px + Math.sin(a) * L * S.sc, g.py + Math.cos(a) * L * S.sc]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), L = S.Le, a = S.a, deg = a * 180 / Math.PI, [bx, by] = D.bob(S, g, a, L), m = S.p.m, r = 8 + Math.cbrt(m) * 9, Tth = TAU * Math.sqrt(L / S.p.g);
      Q58.bg(ctx, w, h);
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.py - 14, 0, g.py); gg.addColorStop(0, '#475569'); gg.addColorStop(1, '#94a3b8'); ctx.fillStyle = gg; ctx.fillRect(g.px - 90, g.py - 14, 180, 12); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; for (let x = g.px - 86; x < g.px + 90; x += 10) { ctx.beginPath(); ctx.moveTo(x, g.py - 14); ctx.lineTo(x - 7, g.py - 22); ctx.stroke(); } });
      const amax = Math.max(Math.abs(S.ta), 5 * Math.PI / 180, Math.abs(a));
      K.raw(ctx, () => { ctx.strokeStyle = 'rgba(37,99,235,.35)'; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.px, g.py, L * S.sc, Math.PI / 2 - amax, Math.PI / 2 + amax); ctx.stroke(); ctx.setLineDash([]); });
      Q58.line(ctx, [[g.px, g.py], [g.px, g.py + L * S.sc + 26]], 'rgba(15,23,42,.35)', 1.2, [4, 4]);
      if (S.p.two) { const [b2x, b2y] = D.bob(S, g, S.a2, 2 * L); Q58.line(ctx, [[g.px, g.py], [b2x, b2y]], '#b45309', 1.6); K.ball(ctx, b2x, b2y, r, '#f59e0b'); Q42.T(ctx, '2L', b2x + r + 14, b2y, { s: 11, w: 900, c: '#b45309' }); }
      Q58.line(ctx, [[g.px, g.py], [bx, by]], '#334155', 1.8);
      const ca = [g.px + Math.sin(amax) * L * S.sc, g.py + Math.cos(amax) * L * S.sc];
      Q42.T(ctx, 'a', 2 * g.px - ca[0] - 14, ca[1] + 4, { s: 13, w: 900, c: '#2563eb' }); Q42.T(ctx, 'b', ca[0] + 14, ca[1] + 4, { s: 13, w: 900, c: '#2563eb' }); Q42.T(ctx, 'c', g.px, g.py + L * S.sc + r + 14, { s: 13, w: 900, c: '#2563eb' });
      if (Math.abs(deg) > .4) Q51.arc(ctx, g.px, g.py, 34, 270, 270 + deg, '#be185d', 'θ', { lo: 10 });
      K.ball(ctx, bx, by, r, '#dc2626');
      if (Math.abs(a) > .002) { const F = 56, sn = Math.sin(a), cs = Math.cos(a), tx = -F * sn * cs * 1.6, ty = F * sn * sn * 1.6;
        Q58.arrow(ctx, bx, by, 0, F, '#16a34a', 'mg', 3); Q58.arrow(ctx, bx, by, F * cs * sn, F * cs * cs, '#7c3aed', '', 2.2); Q58.arrow(ctx, bx, by, -F * cs * sn, -F * cs * cs, '#0f172a', 'T', 2.4);
        Q58.arrow(ctx, bx, by, tx, ty, '#dc2626', '', 3.4); Q42.T(ctx, 'mg sinθ', bx + tx - 30 * Math.sign(a), by + ty - 10, { s: 10.5, w: 900, c: '#dc2626', bg: 'rgba(255,255,255,.85)' }); Q42.T(ctx, 'mg cosθ', bx + F * cs * sn + 30 * Math.sign(a), by + F * cs * cs, { s: 10.5, w: 900, c: '#7c3aed', bg: 'rgba(255,255,255,.85)' }); }
      Q58.dim(ctx, g.px - 24, g.py, g.px - 24, g.py + L * S.sc, 'L', '#0f766e', { dx: -12, dy: 0 });
      if (Math.abs(S.ta) > 5.5 * Math.PI / 180 && S.hold) Q42.T(ctx, 'الزاوية أكبر من 5° ليست حركة توافقية بسيطة دقيقة', g.cx, g.y0 + 4, { s: 11, w: 800, c: '#fff', bg: '#d97706' });
      // stopwatch + graph
      const P = Q58.per(S.st), T = P.T;
      Q58.watch(ctx, g.L + 70, 430, 44, S.tw, 'ساعة التوقيت', 10);
      Q58.tile(ctx, g.L + 22, 494, 100, 48, 'عدد الهزات', String(P.n), '#7c3aed'); Q58.tile(ctx, g.L + 22, 548, 100, 48, 'T = t ÷ n', T ? Q58.f(T, 2) + ' s' : '—', '#2563eb');
      const A = { x: g.L + 180, y: 384, w: w - g.L - 230, h: 176, x0: 0, x1: 10, y0: -20, y1: 20, xs: 1, ys: 5, lx: 2, ly: 10, xl: 't (s)', yl: 'θ (°)', col: '#dc2626' }, M = Q58.axes(ctx, A), t0 = Math.max(0, S.clk - 10);
      if (S.p.two) Q52.plot(ctx, S.h.map(p => [M.X(p[0] - t0), M.Y(clamp(p[2] * 180 / Math.PI, -20, 20))]), '#f59e0b', 2.2, [6, 4]);
      Q52.plot(ctx, S.h.map(p => [M.X(p[0] - t0), M.Y(clamp(p[1] * 180 / Math.PI, -20, 20))]), '#dc2626', 2.6);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.g); Q58.drawSteps(ctx, C.e);
      if (S.ex) Q58.steps(ctx, S, Object.assign({ title: 'مثال 1 ص 162' }, EX, { k: S.k }));
      else Q58.card(ctx, S, [{ t: 'T = 2π √(L / g)', mono: 1, c: '#2563eb', w: 900 }, { t: 'T = 2π √(' + Q58.f(L, 2) + ' / ' + Q58.f(S.p.g, 2) + ') = ' + Q58.f(Tth, 2) + ' s', mono: 1 }, { t: 'الزمن الدوري المقاس: ' + (T ? Q58.f(T, 2) + ' s' : '...'), c: '#7c3aed', w: 800 }, { t: 'F = −mg sin θ', mono: 1, c: '#dc2626', w: 900 }, { t: 'الكتلة m = ' + Q58.f(m, 2) + ' kg لا تؤثر في T', c: '#334155', w: 800 }].concat(S.p.two ? [{ t: 'البندول المضاعف: T = ' + Q58.f(Tth * Math.SQRT2, 2) + ' s أي √2 مرة', c: '#b45309', w: 800 }] : []), { title: 'البندول البسيط' });
      Q42.banner(ctx, w, 'اسحب الكرة جانباً بزاوية صغيرة ثم أفلتها');
    },
    chips(S, g) { return { g: Q42.chips(S, 'gv', GS.map(q => [q[0], q[1]]), g.h - 128, (GS.find(q => Math.abs(q[2] - S.p.g) < .005) || [''])[0], (S2, k) => { setParam(S2, 'g', GS.find(q => q[0] === k)[2]); S2.a = 5 * Math.PI / 180; D.rel(S2); }, { bw: 150 }),
      e: Q58.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 1 ص 162', S2 => { setParam(S2, 'L', 1); setParam(S2, 'g', 9.8); S2.a = 5 * Math.PI / 180; D.rel(S2); }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), [bx, by] = D.bob(S, g, S.a, S.Le), C = D.chips(S, g);
      return [{ id: 'bob', x: bx, y: by, r: 24, axis: 'x', keep: true, tip: 'اسحب الكرة', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; S2.ta = clamp(Math.atan2(d.x - g.px, Math.max(10, d.y - g.py)), -.35, .35); }, up: S2 => { S2.hold = 0; D.rel(S2); } }].concat(C.g, C.e); },
    readings(S) { const T = Q58.per(S.st).T; return [rd('الزاوية θ', Q58.f(S.a * 180 / Math.PI, 1) + '°'), rd('T النظري', Q58.f(TAU * Math.sqrt(S.p.L / S.p.g), 3) + ' s'), rd('T المقاس', T ? Q58.f(T, 3) + ' s' : '—'), rd('الطول L', Q58.f(S.p.L, 2) + ' m'), rd('g', Q58.f(S.p.g, 2) + ' m/s²')]; },
    record(S) { const T = Q58.per(S.st).T; return { L: S.p.L, g: S.p.g, m: S.p.m, Tt: +(TAU * Math.sqrt(S.p.L / S.p.g)).toFixed(3), Tm: +T.toFixed(3) }; },
    cols: [['L', 'L (m)'], ['g', 'g (m/s²)'], ['m', 'm (kg)'], ['Tt', 'T نظري (s)'], ['Tm', 'T مقاس (s)']],
    explain(S) { return Q26.ex('تهتز الكرة حول أدنى نقطة c ، وزمن الهزة يتغير بتغيير الطول أو g لكنه لا يتغير بتغيير الكتلة.', 'مركبة الوزن المماسية mg sinθ تعيد الكرة دائماً نحو c ، وللزوايا الصغيرة sinθ ≈ θ فتتناسب القوة مع الإزاحة: حركة توافقية بسيطة زمنها T = 2π√(L/g). الكتلة تظهر في القوة وفي القصور معاً فتُختصر.', 'الساعة البندولية تضبط بتغيير طول البندول: نطيله إذا كانت الساعة تسبق ونقصره إذا كانت تتأخر.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — الحركة التوافقية المضمحلة وتعويض الطاقة (الأشكال 10 و 11 و 12 و 13، ص 163) =============== */
(() => {
  const K0 = 20, M0 = .5, BC = 2 * Math.sqrt(K0 * M0), SC = 520;
  const MED = [['air', 'هواء: إخماد ضعيف', .15, 'rgba(226,232,240,.25)'], ['water', 'ماء: إخماد أشد', 1.2, 'rgba(59,130,246,.28)'], ['oil', 'سائل لزج جداً: حرج', BC, 'rgba(217,119,6,.45)']];
  const D = { id: 'g11_o_damp', page: 163, fig: 'الأشكال 10 و 11 و 12 و 13',
    desc: 'عندما يهتز ثقل معلق بنابض داخل سائل لزج تتناقص سعة اهتزازه تدريجياً حتى يتوقف: هذه الحركة التوافقية المضمحلة (Damping Vibration). كلما زادت لزوجة الوسط زاد الإخماد (الشكل 11: a ضعيف، b أشد، c حرج). ولكي يستمر الاهتزاز نعوض الطاقة المفقودة كما ندفع الأرجوحة في كل ذبذبة. ويستفاد من الإخماد في ماصات الصدمات في السيارة.',
    tags: 'الحركة التوافقية المضمحلة الإخماد سائل لزج سعة متناقصة إخماد حرج تعويض الطاقة الأرجوحة ماصات الصدمات السيارة الشكل 10 الشكل 11 الشكل 12 الشكل 13 8-6',
    tools: ['نابض', 'ثقل', 'حامل', 'إناء فيه سائل لزج'],
    steps: ['اسحب الثقل إلى الأسفل وأفلته في الهواء: السعة تتناقص ببطء.', 'اختر الماء ثم السائل اللزج: كيف يتغير معدل تناقص السعة؟', 'شغّل «مقارنة المنحنيات الثلاثة» لترى الشكل 11.', 'شغّل «تعويض الطاقة» لتدفع الثقل دفعة صغيرة في كل ذبذبة كما في الأرجوحة.'],
    concl: ['تتناقص سعة الاهتزاز بسبب الاحتكاك ومقاومة الوسط: حركة توافقية مضمحلة.', 'كلما زادت لزوجة الوسط كان الاضمحلال أسرع، وفي الإخماد الحرج يعود الجسم إلى الاستقرار دون اهتزاز.', 'للمحافظة على الاهتزاز نعوض الطاقة المفقودة بدفعات بالتردد نفسه وباتجاه الحركة.', 'ماصات الصدمات تخمد اهتزاز جسم السيارة بسرعة.'],
    laws: ['g11_l8_shm'],
    controls: [R('b', 'معامل الإخماد', 0, 7, .15, .05, 'kg/s'), TG('push', 'تعويض الطاقة: دفعة في كل ذبذبة', false, null, 'play'), TG('env', 'المغلف المتناقص', true, null, 'chart'), TG('cmp', 'مقارنة المنحنيات الثلاثة', false, null, 'compare')],
    setup(S) { S.y = .1; S.v = 0; S.hold = 0; S.ty = 0; S.clk = 0; S.h = []; S.t0 = 0; S.kick = 0; },
    rel(S) { S.v = 0; S.t0 = S.clk; S.h = []; },
    update(S, dt) {
      const b = S.p.b;
      if (S.hold) { S.y = Q58.ez(S.y, S.ty, dt, 14); S.v = 0; }
      else { const n = 10, h = dt / n; for (let i = 0; i < n; i++) { const yp = S.y; S.v += (-(K0 / M0) * S.y - (b / M0) * S.v) * h; S.y += S.v * h; if (S.p.push && yp * S.y <= 0 && S.v !== 0) { const sp = Math.abs(S.v), tg = Math.sqrt(K0 / M0) * .1; if (sp < tg) { S.v = Math.sign(S.v) * (sp + (tg - sp) * .7); S.kick = .3; S.kd = Math.sign(S.v); } } } }
      S.kick -= dt; S.clk += dt; S.h.push([S.clk, S.y]); while (S.h.length && S.h[0][0] < S.clk - 8.2) S.h.shift();
    },
    geo(S) { const g = Q58.geo(S); g.sx = g.x0 + 170; g.top = 76; g.yc = 214; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), b = S.p.b, my = g.yc + S.y * SC, med = MED.reduce((p, q) => Math.abs(q[2] - b) < Math.abs(p[2] - b) ? q : p);
      Q58.bg(ctx, w, h);
      Q42.stand(ctx, g.sx + 120, g.top - 12, 330, g.sx - 6);
      Q42.spring(ctx, g.sx, g.top - 8, my - 22, { n: 12, r: 12 });
      // beaker with liquid
      K.raw(ctx, () => { const x = g.sx - 70, y = 150, ww = 140, hh = 170, liq = med[3]; if (b > .3) { ctx.fillStyle = b > 3 ? 'rgba(217,119,6,.5)' : 'rgba(59,130,246,.3)'; ctx.fillRect(x + 4, y + 30, ww - 8, hh - 34); }
        ctx.strokeStyle = 'rgba(100,116,139,.9)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + hh); ctx.lineTo(x + ww, y + hh); ctx.lineTo(x + ww, y); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x + 8, y + 6, 8, hh - 14); void liq; });
      Q58.block(ctx, g.sx, my, 44, 40, 'm', '#475569');
      if (S.p.push && S.kick > .1) { Q58.arrow(ctx, g.sx + 46, my, 0, (S.kd || 1) * 40, '#16a34a', 'دفعة', 3.5); }
      Q42.T(ctx, med[1], g.sx, 345, { s: 12, w: 900, c: '#fff', bg: '#2563eb' });
      // graph
      const A = { x: g.L + 64, y: 384, w: w - g.L - 120, h: 176, x0: 0, x1: 8, y0: -12, y1: 12, xs: .5, ys: 3, lx: 1, ly: 6, xl: 't (s)', yl: 'y (cm)', col: '#2563eb' }, M = Q58.axes(ctx, A), t0 = Math.max(0, S.clk - 8);
      if (S.p.cmp) MED.forEach((q, i) => { const pts = []; const bb = q[2], gm = bb / (2 * M0), w0 = Math.sqrt(K0 / M0), wd = Math.sqrt(Math.max(1e-6, w0 * w0 - gm * gm)); for (let t = 0; t <= 8; t += .02) { const y = i === 2 ? 10 * (1 + w0 * t) * Math.exp(-w0 * t) : 10 * Math.exp(-gm * t) * (Math.cos(wd * t) + gm / wd * Math.sin(wd * t)); pts.push([M.X(t), M.Y(y)]); } Q52.plot(ctx, pts, ['#16a34a', '#0284c7', '#d97706'][i], 2, [5, 4]); Q42.T(ctx, 'abc'[i], M.X(.3 + i * .35), M.Y([9, 5, 8.6][i]) - 10, { s: 13, w: 900, c: ['#16a34a', '#0284c7', '#d97706'][i] }); });
      Q52.plot(ctx, S.h.map(p => [M.X(p[0] - t0), M.Y(p[1] * 100)]), '#dc2626', 2.8);
      if (S.p.env && !S.p.push && b > 0 && S.h.length > 2) { const A0 = Math.abs(S.h.reduce((m, p) => p[0] >= S.t0 - .01 ? (Math.abs(p[1]) > Math.abs(m) ? p[1] : m) : m, 0)) * 100; if (A0 > .5) { const e = [], e2 = []; for (let t = Math.max(S.t0, t0); t <= S.clk; t += .05) { const v = A0 * Math.exp(-b / (2 * M0) * (t - S.t0)); e.push([M.X(t - t0), M.Y(v)]); e2.push([M.X(t - t0), M.Y(-v)]); } Q52.plot(ctx, e, '#7c3aed', 1.6, [3, 3]); Q52.plot(ctx, e2, '#7c3aed', 1.6, [3, 3]); } }
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      Q58.card(ctx, S, [{ t: 'السعة تتناقص بسبب الاحتكاك ومقاومة الوسط', c: '#334155', w: 800 }, { t: 'معامل الإخماد b = ' + Q58.f(b, 2) + ' kg/s', mono: 1, c: '#dc2626' }, { t: b >= BC - .05 ? 'إخماد حرج: يعود دون اهتزاز' : b > .8 ? 'إخماد شديد: تتلاشى بسرعة' : 'إخماد ضعيف: تتلاشى ببطء', c: '#7c3aed', w: 900 }, { t: S.p.push ? 'تعويض الطاقة: دفعة صغيرة باتجاه الحركة في كل ذبذبة فتبقى السعة ثابتة' : 'لتعويض الطاقة ندفع بالتردد نفسه كما في الأرجوحة', c: '#16a34a', w: 800 }, { t: 'ماصات الصدمات في السيارة تخمد الاهتزاز بسرعة', c: '#64748b', s: 11.5 }], { title: 'الحركة المضمحلة' });
      Q42.banner(ctx, w, 'اسحب الثقل إلى الأسفل وأفلته، واختر الوسط');
    },
    chips(S, g) { return Q42.chips(S, 'md', MED.map(q => [q[0], q[1]]), g.h - 84, (MED.find(q => Math.abs(q[2] - S.p.b) < .02) || [''])[0], (S2, k) => { setParam(S2, 'b', +MED.find(q => q[0] === k)[2].toFixed(2)); S2.y = .1; D.rel(S2); }, { bw: 190 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      return [{ id: 'mass', x: g.sx, y: g.yc + S.y * SC, r: 28, axis: 'y', keep: true, tip: 'اسحب الثقل', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; S2.ty = clamp((d.y - g.yc) / SC, -.12, .12); }, up: S2 => { S2.hold = 0; D.rel(S2); } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('الإزاحة', Q58.f(S.y * 100, 1) + ' cm'), rd('معامل الإخماد', Q58.f(S.p.b, 2) + ' kg/s'), rd('الإخماد الحرج', Q58.f(BC, 2) + ' kg/s')]; },
    explain(S) { return Q26.ex('في الهواء يستمر الاهتزاز طويلاً، وفي الماء تتناقص السعة بسرعة، وفي السائل اللزج جداً يعود الثقل إلى موضع الاستقرار دون أن يهتز.', 'قوة مقاومة الوسط تعاكس السرعة دائماً فتحوّل طاقة الاهتزاز إلى حرارة، فتتناقص السعة. وكلما زادت اللزوجة زادت المقاومة والاضمحلال.', 'ماصات الصدمات في السيارة أسطوانات فيها زيت لزج تخمد اهتزاز النوابض، والأرجوحة تستمر إذا دفعناها في كل ذبذبة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — النبضات في وتر: v = √(T/μ) والانعكاس + مثال 2 (الأشكال 14 و 15 و 16، ص 164–166) =============== */
(() => {
  const EX = { q: 'وتر كتلته 20 g وطوله 60 cm ، ما مقدار قوة الشد اللازمة كي تكون سرعة الموجة فيه 30 m/s؟', lines: ['μ = m / L = 0.02 / 0.6 = 0.0333 kg/m', 'v = √(T / μ)', 'v² = T / μ', 'T = μ v² = m v² / L', 'T = 0.02 × 900 / 0.6', 'T = 30 N'] };
  const D = { id: 'g11_o_pulse', page: 164, fig: 'الأشكال 14 و 15 و 16 + مثال 2',
    desc: 'الحركة الموجية اضطراب ينتج عن مصدر طاقة وينتقل في الوسط. عندما نحرك نهاية وتر مشدود بسرعة إلى الأعلى ثم إلى الأسفل تتولد نبضة تنتقل بسرعة v = √(T/μ) حيث T قوة الشد و μ = m/L كتلة وحدة الطول. كل جزء من الوتر يتحرك صعوداً ونزولاً فقط. عند الطرف المثبت تنعكس النبضة مقلوبة (فرق طور 180°)، وعند الطرف الحر تنعكس دون أن تنقلب.',
    tags: 'الحركة الموجية النبضة pulse وتر قوة الشد كتلة وحدة الطول μ=m/L v=√(T/μ) x=vt انعكاس النبضة طرف مثبت طرف حر انقلاب 180 مثال 2 الشكل 15 الشكل 16 8-7 8-8',
    tools: ['وتر أو حبل', 'حامل أو جدار', 'حلقة على قضيب أملس'],
    steps: ['اسحب اليد إلى الأعلى ثم إلى الأسفل بسرعة (أو اضغط «نبضة للأعلى»): تتولد نبضة.', 'راقب الخرزة الحمراء ومخططها: تتحرك صعوداً ونزولاً فقط بينما تنتقل النبضة أفقياً.', 'زد قوة الشد أو قلل كتلة الوتر: النبضة أسرع.', 'بدّل بين الطرف المثبت والطرف الحر وقارن شكل النبضة المنعكسة.', 'اضغط «مثال 2 ص 166» لحل مثال الكتاب.'],
    concl: ['v = √(T / μ) و μ = m / L : تعتمد سرعة الموجة على الشد وكتلة وحدة الطول.', 'جسيمات الوسط تهتز في مكانها ولا تنتقل مع النبضة؛ الذي ينتقل هو الطاقة.', 'عند الطرف المثبت تنعكس النبضة مقلوبة، وعند الطرف الحر تنعكس غير مقلوبة.', 'مثال 2: T = 30 N.'],
    laws: ['g11_l8_vstring'],
    controls: [R('T', 'قوة الشد T', 5, 60, 30, 1, 'N'), R('m', 'كتلة الوتر m', 5, 50, 20, 1, 'g'), R('Lc', 'طول الوتر L', 30, 120, 60, 5, 'cm'), TG('fix', 'الطرف البعيد مثبت', true, null, 'lock')],
    setup(S) { S.hy = 0; S.ty = 0; S.hold = 0; S.clk = 0; S.buf = []; S.au = -1; S.ad = 1; S.bh = []; S.ex = 0; S.k = 0; },
    v(S) { return Math.sqrt(S.p.T / (S.p.m / 1000 / (S.p.Lc / 100))); },
    update(S, dt) {
      if (S.au >= 0) { S.au += dt; const u = S.au / .32; S.ty = u < 1 ? -S.ad * 62 * Math.sin(Math.PI * u) : 0; if (u >= 1) S.au = -1; }
      else if (!S.hold) S.ty = 0;
      S.hy = Q58.ez(S.hy, S.ty, dt, S.au >= 0 ? 30 : 16); S.clk += dt; S.buf.push([S.clk, S.hy]); while (S.buf.length > 2 && S.buf[0][0] < S.clk - 8) S.buf.shift();
      if (S.W) { const g = D.geo(S); S.bh.push([S.clk, D.y(S, g, g.xm)]); while (S.bh.length && S.bh[0][0] < S.clk - 4) S.bh.shift(); }
    },
    geo(S) { const g = Q58.geo(S); g.ry = 478; g.xh = g.L + 74; g.xe = g.w - 70; g.xm = (g.xh + g.xe) / 2; g.vv = clamp(D.v(S) * 7, 40, 700); return g; },
    H(S, t) { const b = S.buf; if (!b.length || t < b[0][0]) return 0; let lo = 0, hi = b.length - 1; if (t >= b[hi][0]) return b[hi][1]; while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (b[mid][0] <= t) lo = mid; else hi = mid; } const u = (t - b[lo][0]) / ((b[hi][0] - b[lo][0]) || 1); return b[lo][1] + (b[hi][1] - b[lo][1]) * u; },
    y(S, g, x) { const d = x - g.xh, Lp = g.xe - g.xh, vv = g.vv; return D.H(S, S.clk - d / vv) + (S.p.fix ? -1 : 1) * D.H(S, S.clk - (2 * Lp - d) / vv); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), v = D.v(S), mu = S.p.m / 1000 / (S.p.Lc / 100);
      Q58.bg(ctx, w, h);
      // far end
      if (S.p.fix) Q58.wallv(ctx, g.xe, g.ry - 90, g.ry + 90, 1);
      else K.raw(ctx, () => { const gg = ctx.createLinearGradient(g.xe + 2, 0, g.xe + 12, 0); gg.addColorStop(0, '#94a3b8'); gg.addColorStop(.5, '#f1f5f9'); gg.addColorStop(1, '#64748b'); ctx.fillStyle = gg; ctx.fillRect(g.xe + 2, g.ry - 120, 10, 240); });
      Q58.rope(ctx, g.xh, g.xe, x => g.ry + D.y(S, g, x), '#b45309', 5);
      if (!S.p.fix) K.raw(ctx, () => { const yy = g.ry + D.y(S, g, g.xe); ctx.strokeStyle = '#334155'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(g.xe + 7, yy, 9, 6, 0, 0, TAU); ctx.stroke(); });
      Q41.dot(ctx, g.xm, g.ry + D.y(S, g, g.xm), '#dc2626', 7);
      Q58.line(ctx, [[g.xh, g.ry], [g.xe, g.ry]], 'rgba(15,23,42,.25)', 1, [4, 6]);
      Q25.fist(ctx, g.xh - 6, g.ry + S.hy - 4, .8, { flip: 1 });
      Q42.T(ctx, S.p.fix ? 'طرف مثبت: تنعكس مقلوبة' : 'طرف حر: تنعكس غير مقلوبة', g.xe - 110, g.ry - 104, { s: 11.5, w: 900, c: '#fff', bg: S.p.fix ? '#334155' : '#0f766e' });
      Q58.dim(ctx, g.xh, g.ry + 82, g.xe, g.ry + 82, 'L = ' + S.p.Lc + ' cm', '#7c3aed', { dy: 13 });
      // bead graph
      const A = { x: g.x0 + 44, y: 104, w: g.x1 - g.x0 - 70, h: 150, x0: 0, x1: 4, y0: -130, y1: 130, xs: .5, ys: 32.5, lx: 1, ly: 65, xl: 't (s)', yl: 'إزاحة الخرزة', col: '#dc2626' }, M = Q58.axes(ctx, A), t0 = Math.max(0, S.clk - 4);
      Q52.plot(ctx, S.bh.map(p => [M.X(p[0] - t0), M.Y(clamp(-p[1], -130, 130))]), '#dc2626', 2.4);
      Q42.T(ctx, 'الخرزة الحمراء تتحرك صعوداً ونزولاً فقط', (A.x + A.x + A.w) / 2, A.y + A.h + 34, { s: 11.5, w: 800, c: '#334155' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q58.drawSteps(ctx, C.e);
      if (S.ex) Q58.steps(ctx, S, Object.assign({ title: 'مثال 2 ص 166' }, EX, { k: S.k }));
      else Q58.card(ctx, S, [{ t: 'μ = m / L = ' + Q58.f(mu, 4) + ' kg/m', mono: 1, c: '#7c3aed' }, { t: 'v = √(T / μ)', mono: 1, c: '#2563eb', w: 900 }, { t: 'v = √(' + S.p.T + ' / ' + Q58.f(mu, 4) + ') = ' + Q58.f(v, 1) + ' m/s', mono: 1 }, { t: 'x = v t', mono: 1, c: '#0f766e' }, { t: 'زمن وصول النبضة إلى الطرف الآخر:', c: '#334155', w: 800 }, { t: 't = L / v = ' + Q58.f(S.p.Lc / 100 / v * 1000, 1) + ' ms', mono: 1, c: '#dc2626', w: 800 }, { t: 'العرض على الشاشة بالحركة البطيئة', c: '#64748b', s: 11 }], { title: 'النبضة في وتر' });
      Q42.banner(ctx, w, 'اسحب اليد إلى الأعلى ثم الأسفل بسرعة لتوليد نبضة');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pl', [['up', 'نبضة للأعلى'], ['dn', 'نبضة للأسفل'], ['end', S.p.fix ? 'اجعل الطرف حراً' : 'اجعل الطرف مثبتاً']], g.h - 128, '', (S2, k) => { if (k === 'end') setParam(S2, 'fix', !S2.p.fix); else { S2.au = 0; S2.ad = k === 'up' ? 1 : -1; } }, { bw: 160 }),
      e: Q58.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 2 ص 166', S2 => { setParam(S2, 'm', 20); setParam(S2, 'Lc', 60); setParam(S2, 'T', 30); S2.au = 0; S2.ad = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'hand', x: g.xh - 4, y: g.ry + S.hy, r: 26, axis: 'y', keep: true, tip: 'حرّك اليد', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; S2.au = -1; S2.ty = clamp(d.y - g.ry, -80, 80); }, up: S2 => { S2.hold = 0; } }].concat(C.p, C.e); },
    readings(S) { const mu = S.p.m / 1000 / (S.p.Lc / 100); return [rd('كتلة وحدة الطول μ', Q58.f(mu, 4) + ' kg/m'), rd('سرعة الموجة v', Q58.f(D.v(S), 1) + ' m/s'), rd('قوة الشد', S.p.T + ' N'), rd('الطرف البعيد', S.p.fix ? 'مثبت' : 'حر')]; },
    record(S) { const mu = S.p.m / 1000 / (S.p.Lc / 100); return { T: S.p.T, mu: +mu.toFixed(4), v: +D.v(S).toFixed(1) }; },
    cols: [['T', 'T (N)'], ['mu', 'μ (kg/m)'], ['v', 'v (m/s)']],
    explain(S) { return Q26.ex('النبضة تنتقل على طول الوتر بينما كل جزء منه يصعد وينزل في مكانه، وعند النهاية ترتد ' + (S.p.fix ? 'مقلوبة.' : 'دون أن تنقلب.'), 'قوة الشد تعيد كل جزء إلى مكانه بسرعة، وكتلة الوتر تقاوم الحركة، لذا v = √(T/μ). عند الطرف المثبت يؤثر الحامل في الوتر بقوة معاكسة فتنقلب النبضة، أما الطرف الحر فيرتفع ثم يسحب الوتر بالاتجاه نفسه.', 'يشد العازف أوتار العود أو الغيتار ليغير سرعة الموجات فيها وبالتالي نغمتها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — مبدأ التراكب: نبضتان تلتقيان (الشكلان 17 و 18، ص 166–167) =============== */
(() => {
  const SG = 36;
  const D = { id: 'g11_o_super', page: 166, fig: 'الشكلان 17 و 18',
    desc: 'مبدأ التراكب: إذا التقت نبضتان في وسط واحد فإن الإزاحة المحصلة في أية نقطة تساوي المجموع الاتجاهي للإزاحتين. نبضتان قمتان تلتقيان فتتكون نبضة سعتها a + b ، ونبضة قمة مع نبضة قعر لهما السعة نفسها (فرق طور 180°) تكون محصلتهما صفراً لحظة الالتقاء. وبعد الالتقاء تستمر كل نبضة في طريقها دون أن يتغير شكلها.',
    tags: 'مبدأ التراكب نبضتان التقاء المجموع الاتجاهي للإزاحات a+b قمة وقعر فرق طور 180 محصلة صفر تستمر دون تغير الشكلان 17 18 8-9',
    tools: ['حبل طويل', 'شخصان يولدان نبضتين'],
    steps: ['اضغط «قمة مع قمة» ثم شغّل: تلتقي النبضتان وتتراكبان.', 'اسحب النبضة الزرقاء ببطء لترى لحظة الالتقاء بدقة.', 'اختر «قمة مع قعر» بسعتين متساويتين: تختفي المحصلة لحظياً.', 'بعد الالتقاء: هل تغير شكل أي نبضة؟'],
    concl: ['الإزاحة المحصلة = المجموع الاتجاهي لإزاحتي النبضتين.', 'قمة مع قمة: سعة المحصلة a + b ، وقمة مع قعر متساويتين: المحصلة صفر.', 'تفترق النبضتان بعد الالتقاء دون أن يتغير شكلهما.'],
    laws: ['g11_l8_super'],
    controls: [R('a', 'سعة النبضة الأولى a', 10, 70, 45, 5, 'px'), R('b', 'سعة النبضة الثانية b', 10, 70, 45, 5, 'px'), TG('ind', 'إظهار النبضتين منفردتين', true, null, 'labels')],
    setup(S) { S.s = -1; S.ts = -1; S.go = 1; S.opp = 0; S.hold = 0; },
    update(S, dt) { if (S.hold) S.s = Q58.ez(S.s, S.ts, dt, 12); else if (S.go) { S.s += dt * .28; if (S.s > 1.05) S.s = -1.05; } },
    geo(S) { const g = Q58.geo(S); g.ry = 470; g.xa = g.L + 40; g.xb = g.w - 40; g.cx = (g.xa + g.xb) / 2; g.hw = (g.xb - g.xa) / 2 - 50; return g; },
    pul(x, c, A) { const d = (x - c) / SG; return -A * Math.exp(-d * d); },
    yy(S, g, x, s) { const c1 = g.cx + s * g.hw, c2 = g.cx - s * g.hw; return [D.pul(x, c1, S.p.a), D.pul(x, c2, S.opp ? -S.p.b : S.p.b)]; },
    frame(ctx, S, x0, x1, y, s, lab) { const g = { cx: (x0 + x1) / 2, hw: (x1 - x0) / 2 - 30 }, sc = .55; Q58.line(ctx, [[x0, y], [x1, y]], 'rgba(15,23,42,.25)', 1, [3, 4]);
      Q58.wave(ctx, x0, x1, x => { const r = D.yy(S, g, x, s); return y + (r[0] + r[1]) * sc; }, '#1e293b', 2.6); Q42.T(ctx, lab, x1 + 10, y, { s: 11, w: 900, c: '#475569', a: 'left' }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), s = S.s, [y1m, y2m] = D.yy(S, g, g.cx, s);
      Q58.bg(ctx, w, h);
      // snapshots (Fig 17 / 18)
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.85)'; rr(ctx, g.x0 + 10, 76, g.x1 - g.x0 - 20, 266, 12); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.stroke(); });
      Q42.T(ctx, S.opp ? 'الشكل 18: قمة مع قعر' : 'الشكل 17: قمة مع قمة', (g.x0 + g.x1) / 2, 92, { s: 12, w: 900, c: '#2563eb' });
      [[-.7, 'قبل'], [-.25, 'تقترب'], [0, 'تلتقي'], [.7, 'بعد']].forEach((q, i) => D.frame(ctx, S, g.x0 + 30, g.x1 - 70, 140 + i * 56, q[0], q[1]));
      // main rope
      Q58.line(ctx, [[g.xa, g.ry], [g.xb, g.ry]], 'rgba(15,23,42,.25)', 1, [4, 6]);
      if (S.p.ind) { Q58.wave(ctx, g.xa, g.xb, x => g.ry + D.yy(S, g, x, s)[0], 'rgba(37,99,235,.75)', 2.2, [6, 4]); Q58.wave(ctx, g.xa, g.xb, x => g.ry + D.yy(S, g, x, s)[1], 'rgba(22,163,74,.75)', 2.2, [6, 4]); }
      Q58.rope(ctx, g.xa, g.xb, x => { const r = D.yy(S, g, x, s); return g.ry + r[0] + r[1]; }, '#b45309', 5);
      const c1 = g.cx + s * g.hw, c2 = g.cx - s * g.hw;
      Q42.T(ctx, 'a', c1, g.ry - S.p.a - 16, { s: 13, w: 900, c: '#2563eb' }); Q42.T(ctx, 'b', c2, g.ry + (S.opp ? S.p.b + 16 : -S.p.b - 16), { s: 13, w: 900, c: '#16a34a' });
      Q58.arrow(ctx, c1, g.ry + 30 + (S.opp ? 40 : 0), (s < 1 ? 1 : 0) * 36, 0, '#2563eb', '', 2.4); Q58.arrow(ctx, c2, g.ry + 30 + (S.opp ? 40 : 0) + 14, -36, 0, '#16a34a', '', 2.4);
      const R = y1m + y2m; if (Math.abs(s) < .05) Q42.T(ctx, S.opp && Math.abs(S.p.a - S.p.b) < 1 ? 'لحظة الالتقاء: المحصلة صفر' : 'لحظة الالتقاء: المحصلة ' + (S.opp ? 'a − b' : 'a + b'), g.cx, g.ry - 100, { s: 12, w: 900, c: '#fff', bg: '#dc2626' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p);
      Q58.card(ctx, S, [{ t: 'الإزاحة المحصلة = المجموع الاتجاهي للإزاحتين', c: '#334155', w: 800 }, { t: 'y = y₁ + y₂', mono: 1, c: '#dc2626', w: 900 }, { t: 'عند المنتصف الآن:', c: '#475569', w: 800 }, { t: Q58.f(-y1m, 0) + ' + (' + Q58.f(-y2m, 0) + ') = ' + Q58.f(-R, 0) + ' px', mono: 1, c: '#7c3aed', w: 800 }, { t: S.opp ? 'قمة مع قعر: فرق طور 180°' : 'قمة مع قمة: السعة تصل إلى a + b', c: '#0f766e', w: 800 }, { t: 'بعد الالتقاء تعود كل نبضة إلى شكلها', c: '#64748b', s: 11.5 }], { title: 'مبدأ التراكب' });
      Q42.banner(ctx, w, 'شغّل أو اسحب النبضة الزرقاء نحو الأخرى');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['same', 'قمة مع قمة'], ['opp', 'قمة مع قعر'], ['eq', 'سعتان متساويتان']], g.h - 128, S.opp ? 'opp' : 'same', (S2, k) => { if (k === 'eq') setParam(S2, 'b', S2.p.a); else S2.opp = k === 'opp' ? 1 : 0; }, { bw: 160 }),
      p: Q58.play(S, 'pl', g.h - 84, S.go, S2 => { S2.go = S2.go ? 0 : 1; }, S2 => { S2.s = -1; }, { go: '▶ شغّل' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), c1 = g.cx + S.s * g.hw;
      return [{ id: 'pa', x: c1, y: g.ry - S.p.a / 2, r: 26, axis: 'x', keep: true, tip: 'اسحب النبضة', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; S2.go = 0; S2.ts = clamp((d.x - g.cx) / g.hw, -1.05, 1.05); }, up: S2 => { S2.hold = 0; } }].concat(C.m, C.p); },
    readings(S) { return [rd('السعة a', S.p.a + ''), rd('السعة b', (S.opp ? '−' : '') + S.p.b), rd('أكبر محصلة عند الالتقاء', (S.opp ? S.p.a - S.p.b : S.p.a + S.p.b) + '')]; },
    explain(S) { return Q26.ex('تمر النبضتان إحداهما خلال الأخرى؛ لحظة الالتقاء تكون الإزاحة ' + (S.opp ? 'صغيرة أو صفراً' : 'كبيرة') + ' ثم تفترقان بشكلهما الأصلي.', 'كل نبضة تؤثر في جسيمات الوسط مستقلة عن الأخرى، فتجمع الإزاحتان جمعاً اتجاهياً: قمتان تتقويان، وقمة وقعر يلغي أحدهما الآخر.', 'سماعات إلغاء الضوضاء تولد موجة معاكسة للضجيج فتلغيه بالتراكب.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C3 — أنواع الموجات: المستعرضة والطولية وموجات الماء + مثال 3 (الأشكال 19–24، ص 167–169) =============== */
(() => {
  const EX = { q: 'رادار يرسل موجات راديوية لمدة 0.08 s بتردد 9400 MHz ، احسب الطول الموجي وعدد الموجات المرسلة علماً أن c = 3×10⁸ m/s', lines: ['λ = c / f', 'λ = 3×10⁸ / 9.4×10⁹', 'λ = 3.19×10⁻² m = 3.19 cm', 'n = f t', 'n = 9.4×10⁹ × 8×10⁻²', 'n = 75.2×10⁷ موجة'] };
  const MD = [['tr', 'مستعرضة: حبل'], ['lo', 'طولية: نابض'], ['wa', 'موجات الماء']];
  const SC = 100; // px per metre
  const D = { id: 'g11_o_types', page: 167, fig: 'الأشكال 19 إلى 24 + مثال 3',
    desc: 'الموجات الدورية تعيد نفسها بفترات منتظمة وجسيمات الوسط فيها تتحرك حركة توافقية بسيطة، و v = f λ. في الموجة المستعرضة تهتز الجسيمات عمودياً على خط الانتشار (قمم وقيعان)، وفي الطولية تهتز موازية له (تضاغطات وتخلخلات) مثل الصوت. وفي موجات الماء تتحرك الجزيئات في مسارات دائرية فهي مستعرضة وطولية معاً.',
    tags: 'الموجات الدورية v=fλ الطول الموجي القمة القعر السعة موضع الاستقرار الموجة المستعرضة الطولية تضاغط تخلخل نابض موجات الماء مسار دائري الزلازل رادار مثال 3 الأشكال 19 20 21 22 23 24 8-10 8-11',
    tools: ['حبل مشدود', 'نابض طويل', 'حوض ماء'],
    steps: ['اختر «مستعرضة» وراقب الجسيم الأحمر: يهتز عمودياً على اتجاه الانتشار.', 'اختر «طولية»: الجسيم يهتز موازياً لاتجاه الانتشار، وتظهر التضاغطات والتخلخلات.', 'اختر «موجات الماء»: الجسيم يدور في دائرة.', 'غيّر التردد والطول الموجي وراقب v = f λ ، ثم اضغط «مثال 3 ص 167».'],
    concl: ['v = f λ ، والتردد يساوي تردد المصدر والسرعة تعتمد على الوسط.', 'المستعرضة: الاهتزاز عمودي على الانتشار، وتنتقل في الأجسام الصلبة وعلى سطوح السوائل.', 'الطولية: الاهتزاز موازٍ للانتشار، تضاغطات وتخلخلات، مثل الصوت.', 'موجات الماء: الجزيئات في مسارات دائرية، والزلازل تنتج النوعين.', 'مثال 3: λ = 3.19 cm و n = 75.2×10⁷ موجة.'],
    laws: ['g11_l8_vfl'],
    controls: [R('f', 'التردد f', .2, 2, .6, .05, 'Hz'), R('lam', 'الطول الموجي λ', 1.2, 3.4, 2.4, .1, 'm'), R('A', 'السعة A', 10, 40, 28, 1, 'px'), TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { S.md = 'tr'; S.ph = 0; S.clk = 0; S.h = []; S.ex = 0; S.k = 0; S.le = S.p.lam; },
    update(S, dt) { S.le = Q58.ez(S.le, S.p.lam, dt, 6); S.ph += TAU * S.p.f * dt; S.clk += dt; if (S.W) { const g = D.geo(S), q = D.pt(S, g, g.xp); S.h.push([S.clk, q[0] - g.xp, q[1] - g.ry]); while (S.h.length && S.h[0][0] < S.clk - 4) S.h.shift(); } },
    geo(S) { const g = Q58.geo(S); g.ry = 468; g.xa = g.L + 40; g.xb = g.w - 40; g.xp = g.xa + Math.round((g.xb - g.xa) * .42 / 16) * 16; return g; },
    pt(S, g, x0) { const k = TAU / (S.le * SC), A = S.p.A, ph = k * (x0 - g.xa) - S.ph; if (S.md === 'tr') return [x0, g.ry - A * Math.sin(ph)]; if (S.md === 'lo') return [x0 + A * .7 * Math.sin(ph), g.ry]; return [x0 + A * .8 * Math.cos(ph), g.ry - A * .8 * Math.sin(ph)]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), k = TAU / (S.le * SC), A = S.p.A, lamp = S.le * SC, v = S.p.f * S.p.lam;
      Q58.bg(ctx, w, h);
      if (S.md === 'wa') K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.ry - 40, 0, g.ry + 110); gg.addColorStop(0, '#60a5fa'); gg.addColorStop(1, '#1e3a8a'); ctx.fillStyle = gg; ctx.beginPath(); for (let x = g.xa; x <= g.xb; x += 3) { const y = g.ry - A * .8 * Math.sin(k * (x - g.xa) - S.ph); x === g.xa ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.lineTo(g.xb, g.ry + 110); ctx.lineTo(g.xa, g.ry + 110); ctx.closePath(); ctx.fill(); });
      Q58.line(ctx, [[g.xa, g.ry], [g.xb, g.ry]], S.md === 'wa' ? 'rgba(255,255,255,.5)' : 'rgba(15,23,42,.3)', 1.2, [5, 5]);
      if (S.md === 'tr') { Q58.rope(ctx, g.xa, g.xb, x => g.ry - A * Math.sin(k * (x - g.xa) - S.ph), '#b45309', 4); for (let x = g.xa; x <= g.xb; x += 16) { const q = D.pt(S, g, x); Q41.dot(ctx, q[0], q[1], '#92400e', 3); } }
      else if (S.md === 'lo') { for (let x = g.xa; x <= g.xb; x += 8) { const q = D.pt(S, g, x); Q58.line(ctx, [[q[0], g.ry - 34], [q[0] + 3, g.ry + 34]], '#475569', 2.2); }
        if (S.p.lab) { Q58.wave(ctx, g.xa, g.xb, x => g.ry + 70 - 26 * Math.cos(k * (x - g.xa) - S.ph), '#7c3aed', 2, [5, 4]); Q42.T(ctx, 'تغير الضغط', g.xb - 40, g.ry + 112, { s: 10.5, w: 800, c: '#7c3aed' }); } }
      else for (let x = g.xa; x <= g.xb; x += 16) { const q = D.pt(S, g, x); Q41.dot(ctx, q[0], q[1], '#e0f2fe', 3); }
      const P = D.pt(S, g, g.xp);
      if (S.md === 'wa') K.raw(ctx, () => { ctx.strokeStyle = 'rgba(254,240,138,.9)'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.xp, g.ry, A * .8, 0, TAU); ctx.stroke(); ctx.setLineDash([]); });
      if (S.md === 'tr') Q58.line(ctx, [[g.xp, g.ry - A - 8], [g.xp, g.ry + A + 8]], 'rgba(220,38,38,.5)', 1.5, [3, 3]);
      if (S.md === 'lo') Q58.line(ctx, [[g.xp - A * .7, g.ry + 44], [g.xp + A * .7, g.ry + 44]], 'rgba(220,38,38,.6)', 2);
      Q41.dot(ctx, P[0], P[1], '#dc2626', 7);
      Q58.arrow(ctx, g.xb - 120, g.ry - 92, 90, 0, '#0f766e', '', 3); Q42.T(ctx, 'اتجاه الانتشار', g.xb - 75, g.ry - 108, { s: 11, w: 800, c: '#0f766e' });
      if (S.p.lab) { const c0 = g.xa + ((S.ph / k + lamp / 4) % lamp + lamp) % lamp;
        if (S.md === 'tr') { const c1 = c0 + lamp < g.xb ? c0 : c0 - lamp; Q58.dim(ctx, c1, g.ry - A - 22, c1 + lamp, g.ry - A - 22, 'λ', '#7c3aed'); Q42.T(ctx, 'قمة', c1, g.ry - A - 44, { s: 11, w: 900, c: '#b45309' }); Q42.T(ctx, 'قعر', c1 + lamp / 2, g.ry + A + 18, { s: 11, w: 900, c: '#b45309' }); Q58.dim(ctx, c1 + lamp, g.ry, c1 + lamp, g.ry - A, 'A', '#dc2626', { dx: 12, dy: 0 }); Q42.T(ctx, 'موضع الاستقرار', g.xa + 50, g.ry + 14, { s: 10, w: 800, c: '#475569' }); }
        if (S.md === 'lo') { const cc = ((S.ph / k) % lamp + lamp) % lamp + g.xa, c1 = cc + lamp < g.xb ? cc : cc - lamp; Q42.T(ctx, 'تضاغط', c1, g.ry - 48, { s: 11, w: 900, c: '#fff', bg: '#dc2626' }); Q42.T(ctx, 'تخلخل', c1 + lamp / 2 < g.xb ? c1 + lamp / 2 : c1 - lamp / 2, g.ry - 48, { s: 11, w: 900, c: '#fff', bg: '#2563eb' }); if (c1 + lamp < g.xb) Q58.dim(ctx, c1, g.ry + 44 + 18, c1 + lamp, g.ry + 44 + 18, 'λ', '#7c3aed', { dy: 12 }); }
        if (S.md === 'wa') Q42.T(ctx, 'عند القمة يتحرك الجزيء باتجاه الموجة وعند القعر بعكسه', (g.xa + g.xb) / 2, g.ry + 96, { s: 11.5, w: 800, c: '#fff' }); }
      // particle graph
      const AX = { x: g.x0 + 44, y: 100, w: g.x1 - g.x0 - 70, h: 150, x0: 0, x1: 4, y0: -45, y1: 45, xs: .5, ys: 15, lx: 1, ly: 15, xl: 't (s)', yl: S.md === 'lo' ? 'إزاحة أفقية' : 'إزاحة شاقولية', col: '#dc2626' }, M = Q58.axes(ctx, AX), t0 = Math.max(0, S.clk - 4);
      Q52.plot(ctx, S.h.map(p => [M.X(p[0] - t0), M.Y(S.md === 'lo' ? p[1] : -p[2])]), '#dc2626', 2.4);
      if (S.md === 'wa') Q52.plot(ctx, S.h.map(p => [M.X(p[0] - t0), M.Y(p[1])]), '#0284c7', 2, [5, 4]);
      Q42.T(ctx, ['الجسيم يهتز عمودياً على الانتشار', 'الجسيم يهتز موازياً للانتشار', 'الجسيم يتحرك في مسار دائري'][MD.findIndex(q => q[0] === S.md)], (AX.x * 2 + AX.w) / 2, AX.y + AX.h + 34, { s: 11.5, w: 800, c: '#334155' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q58.drawSteps(ctx, C.e);
      if (S.ex) Q58.steps(ctx, S, Object.assign({ title: 'مثال 3 ص 167' }, EX, { k: S.k }));
      else Q58.card(ctx, S, [{ t: 'v = f λ', mono: 1, c: '#2563eb', w: 900 }, { t: 'v = ' + Q58.f(S.p.f, 2) + ' × ' + Q58.f(S.p.lam, 1) + ' = ' + Q58.f(v, 2) + ' m/s', mono: 1 }, { t: 'T = 1 / f = ' + Q58.f(1 / S.p.f, 2) + ' s', mono: 1, c: '#7c3aed' }, { t: S.md === 'tr' ? 'مستعرضة: اهتزاز عمودي على الانتشار' : S.md === 'lo' ? 'طولية: اهتزاز موازٍ للانتشار' : 'موجات الماء: مستعرضة وطولية معاً', c: '#dc2626', w: 900 }, { t: S.md === 'tr' ? 'تنتقل في الأجسام الصلبة وعلى سطوح السوائل' : S.md === 'lo' ? 'الصوت موجة طولية من تضاغطات وتخلخلات' : 'الزلازل تولد موجات من النوعين', c: '#334155', w: 800 }, { t: 'انطلاق الموجة يعتمد على نوعها وطبيعة الوسط', c: '#64748b', s: 11.5 }], { title: 'أنواع الموجات' });
      Q42.banner(ctx, w, 'اختر نوع الموجة وراقب الجسيم الأحمر');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', MD, g.h - 128, S.md, (S2, k) => { S2.md = k; S2.h = []; }, { bw: 170 }), e: Q58.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 3 ص 167', null, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), P = D.pt(S, g, g.xb - 60);
      return [{ id: 'lam', x: P[0], y: P[1], r: 22, axis: 'x', keep: true, tip: 'اسحب لتغيير الطول الموجي', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'lam', clamp(Math.round((1.2 + (d.x - g.xa) / (g.xb - g.xa) * 2.4) * 10) / 10, 1.2, 3.4)) }].concat(C.m, C.e); },
    readings(S) { return [rd('نوع الموجة', MD.find(q => q[0] === S.md)[1]), rd('التردد f', Q58.f(S.p.f, 2) + ' Hz'), rd('الطول الموجي λ', Q58.f(S.p.lam, 1) + ' m'), rd('السرعة v = fλ', Q58.f(S.p.f * S.p.lam, 2) + ' m/s')]; },
    record(S) { return { f: S.p.f, l: S.p.lam, v: +(S.p.f * S.p.lam).toFixed(2) }; },
    cols: [['f', 'f (Hz)'], ['l', 'λ (m)'], ['v', 'v (m/s)']],
    explain(S) { return Q26.ex('الموجة تتقدم إلى اليمين لكن الجسيم الأحمر يبقى في مكانه ويهتز ' + (S.md === 'tr' ? 'صعوداً ونزولاً.' : S.md === 'lo' ? 'يميناً ويساراً.' : 'في دائرة صغيرة.'), 'الموجة تنقل الطاقة لا المادة. في كل دورة يقطع شكل الموجة مسافة طول موجي واحد خلال زمن دوري واحد، لذا v = λ/T = f λ.', 'الزلازل ترسل موجات طولية أسرع تصل أولاً وموجات مستعرضة تصل بعدها، ومن فرق زمن الوصول يُحدَّد بعد مركز الزلزال.'); }
  };
  M8.P[D.id] = D;
})();


/* ---------- kit additions for 8-12 … 8-21 ---------- */
Object.assign(Q58, {
  /* several worked examples in one part: list = [[key, label, EX]]; S.ex = key, S.k = shown lines */
  exChips(S, id, y, list, onEx, o = {}) { const cur = S.ex || ''; return Q42.chips(S, id, list.map(q => [q[0], q[1]]).concat([['nx', '⬇ الخطوة التالية']]), y, cur, (S2, k) => {
    if (k === 'nx') { if (!S2.ex) { S2.ex = list[0][0]; S2.k = 0; if (onEx) onEx(S2, S2.ex); } const E = list.find(q => q[0] === S2.ex); S2.k = Math.min((S2.k || 0) + 1, E ? E[2].lines.length : 9); return; }
    if (S2.ex === k) { S2.ex = 0; return; } S2.ex = k; S2.k = 1; if (onEx) onEx(S2, k); }, { bw: o.bw || 150, x0: o.x0, col: '#be185d' }); },
  drawEx(ctx, S, list, o) { const E = list.find(q => q[0] === S.ex); if (!E) return false; Q58.steps(ctx, S, Object.assign({ title: E[1] }, E[2], { k: S.k }), o); return true; },
  /* white panel */
  panel(ctx, x, y, w, h, title, col = '#2563eb') { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.14)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 2; ctx.fillStyle = 'rgba(255,255,255,.93)'; rr(ctx, x, y, w, h, 12); ctx.fill(); ctx.restore(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.2; rr(ctx, x, y, w, h, 12); ctx.stroke(); });
    if (title) Q42.T(ctx, title, x + w / 2, y + 15, { s: 12, w: 900, c: col }); },
  /* resonance box with a tuning fork standing on it; (x, y) = middle of the box top */
  forkBox(ctx, x, y, s, dsp, lab, o = {}) { K.raw(ctx, () => { const bw = 92 * s, bh = 34 * s, g = ctx.createLinearGradient(0, y, 0, y + bh); g.addColorStop(0, '#d6a46b'); g.addColorStop(1, '#92400e'); ctx.fillStyle = g; rr(ctx, x - bw / 2, y, bw, bh, 4); ctx.fill(); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.fillStyle = '#451a03'; ctx.beginPath(); ctx.ellipse(x + bw / 2 - 3, y + bh / 2, 4 * s, 10 * s, 0, 0, TAU); ctx.fill(); });
    Q25.fork(ctx, x, y - 30 * s, 92 * s, -Math.PI / 2, dsp, { label: lab });
    if (o.wax) K.raw(ctx, () => { ctx.fillStyle = '#fde68a'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1; for (let i = 0; i < Math.min(o.wax, 4); i++) { ctx.beginPath(); ctx.ellipse(x - 10 * s - dsp, y - 100 * s + i * 9 * s, 6 * s, 4.5 * s, 0, 0, TAU); ctx.fill(); ctx.stroke(); } }); },
  /* air particles between x0 and x1 (rows around yc), displacement fn(x) in px, alpha per x */
  air(ctx, x0, x1, yc, hh, fn, col = '#475569') { K.raw(ctx, () => { ctx.fillStyle = col; for (let r = 0; r < 7; r++) { const y = yc - hh / 2 + (r + .5) * hh / 7; for (let x = x0 + (r % 2) * 4; x <= x1; x += 8) { const xx = x + fn(x); if (xx < x0 - 2 || xx > x1 + 2) continue; ctx.beginPath(); ctx.arc(xx, y, 1.9, 0, TAU); ctx.fill(); } } }); },
  /* microphone pointing left at (x,y) */
  mic(ctx, x, y, s = 1) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const g = ctx.createLinearGradient(0, -10, 0, 10); g.addColorStop(0, '#9ca3af'); g.addColorStop(.5, '#f3f4f6'); g.addColorStop(1, '#4b5563'); ctx.fillStyle = '#1f2937'; rr(ctx, 8, -6, 40, 12, 4); ctx.fill(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(4, 0, 11, 0, TAU); ctx.fill(); ctx.strokeStyle = '#374151'; ctx.lineWidth = 1; for (let k = -6; k <= 6; k += 3) { ctx.beginPath(); ctx.moveTo(-6, k); ctx.lineTo(14, k); ctx.stroke(); } ctx.restore(); }); },
  /* sound level meter (box with display) at (x,y) top-left */
  meter(ctx, x, y, txt, col = '#22c55e') { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 6; const g = ctx.createLinearGradient(x, y, x + 70, y); g.addColorStop(0, '#374151'); g.addColorStop(1, '#111827'); ctx.fillStyle = g; rr(ctx, x, y, 72, 92, 9); ctx.fill(); ctx.restore(); ctx.fillStyle = '#052e16'; rr(ctx, x + 7, y + 8, 58, 26, 4); ctx.fill(); ctx.fillStyle = col; ctx.font = '800 14px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x + 36, y + 22); ctx.fillStyle = '#6b7280'; ctx.beginPath(); ctx.arc(x + 36, y + 60, 15, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(x + 36, y + 60, 9, 0, TAU); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.fillRect(x + 30, y + 92, 12, 22); }); }
});

/* =============== D1 — الصوت موجة طولية: الشوكة الرنانة وراسم الذبذبات (الشكل 25، ص 170) =============== */
(() => {
  const D = { id: 'g11_o_sound', page: 170, fig: 'الشكل 25',
    desc: 'الصوت موجة طولية تنتقل في الأوساط المادية ولا ينتقل في الفراغ. عند طرق الشوكة الرنانة يهتز فرعاها فتتولد في الهواء تضاغطات وتخلخلات متتالية. يحول المايكروفون الموجة الصوتية إلى إشارة كهربائية يعرضها راسم الذبذبات فنقرأ منها السعة والزمن الدوري. المدى المسموع للإنسان من 20 Hz إلى 20000 Hz.',
    tags: 'الصوت موجة طولية تضاغط تخلخل الشوكة الرنانة المايكروفون راسم الذبذبات السماعة السعة الزمن الدوري الطول الموجي الفراغ المدى المسموع 20 20000 هيرتز الشكل 25 8-12',
    tools: ['شوكة رنانة على صندوق رنين', 'مطرقة مطاطية', 'مايكروفون', 'راسم ذبذبات', 'ناقوس مفرغ من الهواء'],
    steps: ['اضغط على الشوكة (أو «اطرق الشوكة»): راقب التضاغطات والتخلخلات تنتشر في الهواء.', 'لاحظ الإشارة على راسم الذبذبات: السعة تتناقص تدريجياً مع خفوت الصوت.', 'غيّر تردد الشوكة: يقصر الطول الموجي ويقصر الزمن الدوري على الشاشة.', 'شغّل «تفريغ الهواء» واطرق الشوكة: هل يصل الصوت إلى المايكروفون؟'],
    concl: ['الصوت موجة طولية من تضاغطات وتخلخلات.', 'يحتاج الصوت إلى وسط مادي ولا ينتقل في الفراغ.', 'راسم الذبذبات يعرض السعة والزمن الدوري، و λ = v / f.', 'المدى المسموع من 20 Hz إلى 20000 Hz.'],
    laws: ['g11_l8_vfl'],
    controls: [R('f', 'تردد الشوكة f', 128, 1024, 256, 1, 'Hz'), R('A', 'قوة الطرق', .3, 1, .8, .05, ''), TG('vac', 'تفريغ الهواء', false, null, 'vacuum'), TG('snd', 'تشغيل الصوت', false, null, 'sound')],
    setup(S) { S.amp = 0; S.front = 0; S.ph = 0; S.hit = 0; S.fv = .9; S.air = 1; S.sc = []; },
    fv(S) { return .5 + S.p.f / 400; },
    update(S, dt) { S.amp *= Math.exp(-dt * .22); if (S.amp < .01) S.amp = 0; S.front += dt * 150; S.ph += TAU * D.fv(S) * dt; S.hit = Math.max(0, S.hit - dt * 3); S.air = Q58.ez(S.air, S.p.vac ? 0 : 1, dt, 2); },
    geo(S) { const g = Q58.geo(S); g.fx = g.x0 + 50; g.fy = 236; g.mx = g.x1 - 30; g.yc = 190; return g; },
    strike(S) { S.amp = S.p.A; S.front = 0; S.hit = 1; if (S.p.snd) Q58.tone(S.p.f, 2.6, { vol: .09 * S.p.A, decay: .9 }); },
    lam(S) { return clamp(110 * 256 / S.p.f, 26, 140); },
    disp(S, g, x) { const d = x - g.fx - 30; if (d < 0 || d > S.front) return 0; const k = TAU / D.lam(S), env = S.amp * Math.exp(-d / 900); return 4.5 * env * S.air * Math.sin(k * d - S.ph); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), f = S.p.f, v = 343, lam = v / f, reach = S.front > g.mx - g.fx - 30 && S.amp > 0 && S.air > .5, sig = reach ? S.amp * S.air : 0;
      Q58.bg(ctx, w, h);
      // bell jar when vacuum
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(219,234,254,' + (.25 + .35 * (1 - S.air)) + ')'; ctx.strokeStyle = 'rgba(100,116,139,.6)'; ctx.lineWidth = 2; rr(ctx, g.x0 + 4, 84, g.x1 - g.x0 - 8, 200, 26); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#475569'; ctx.fillRect(g.x0 - 4, 282, g.x1 - g.x0 + 8, 10); });
      Q58.air(ctx, g.fx + 26, g.mx - 14, g.yc, 120, x => D.disp(S, g, x), 'rgba(51,65,85,' + (.15 + .75 * S.air) + ')');
      Q58.forkBox(ctx, g.fx, g.fy, .9, Math.sin(S.ph * 9) * 4 * S.amp, f + ' Hz');
      if (S.hit > 0) K.raw(ctx, () => { ctx.save(); ctx.translate(g.fx + 30, g.fy - 92); ctx.rotate(-.6 * S.hit); ctx.fillStyle = '#7c2d12'; ctx.fillRect(0, -3, 48, 6); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(52, 0, 9, 0, TAU); ctx.fill(); ctx.restore(); });
      Q58.mic(ctx, g.mx, g.yc, 1); K.raw(ctx, () => { ctx.strokeStyle = '#111827'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(g.mx + 48, g.yc); ctx.bezierCurveTo(g.mx + 90, g.yc, g.mx + 60, 340, g.mx - 20, 352); ctx.stroke(); });
      if (S.p.vac) Q42.T(ctx, 'فراغ: لا ينتقل الصوت', (g.x0 + g.x1) / 2, 104, { s: 12, w: 900, c: '#fff', bg: '#dc2626' });
      else if (S.p.A && S.amp > 0) { const xc = g.fx + 30 + Math.min(S.front, g.mx - g.fx - 60) * .5; Q42.T(ctx, 'تضاغطات وتخلخلات', xc, 104, { s: 11.5, w: 900, c: '#0f766e', bg: 'rgba(255,255,255,.85)' }); }
      // oscilloscope
      const sx = g.L + 22, sy = 354, sw = w - g.L - 44, sh = 160, cyc = f / 128 * 2;
      Q25.scope(ctx, sx, sy, sw, sh, [{ f: u => sig * Math.sin(TAU * cyc * u - S.ph), c: '#34d399', lw: 2.6 }], { title: 'راسم الذبذبات' });
      if (sig > .05) { const per = (sw - 12) / cyc, xa = sx + 6 + per * ((S.ph / TAU % 1 + 1) % 1 + .25); if (xa + per < sx + sw - 6) Q58.dim(ctx, xa, sy + sh - 18, xa + per, sy + sh - 18, 'T', '#fbbf24', { dy: -12 }); Q58.dim(ctx, sx + 30, sy + sh / 2, sx + 30, sy + sh / 2 - sig * (sh / 2 - 8), 'A', '#f472b6', { dx: 14, dy: 0 }); }
      else Q42.T(ctx, S.p.vac && S.amp > 0 ? 'لا إشارة: الصوت لم يصل' : 'اطرق الشوكة', sx + sw / 2, sy + sh / 2 + 22, { s: 12, w: 800, c: '#a7f3d0' });
      // audible range bar
      const bx = sx + 10, bw2 = sw - 20, by = 548, X = q => bx + (Math.log10(q) - 0) / 5 * bw2;
      K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, bx, by, bw2, 16, 8); ctx.fill(); ctx.fillStyle = '#86efac'; rr(ctx, X(20), by, X(20000) - X(20), 16, 8); ctx.fill(); });
      Q42.T(ctx, 'تحت سمعية', (bx + X(20)) / 2, by + 30, { s: 10.5, w: 800, c: '#64748b' }); Q42.T(ctx, 'المدى المسموع', (X(20) + X(20000)) / 2, by + 30, { s: 10.5, w: 800, c: '#15803d' }); Q42.T(ctx, 'فوق سمعية', (X(20000) + bx + bw2) / 2, by + 30, { s: 10.5, w: 800, c: '#64748b' });
      Q42.T(ctx, '20 Hz', X(20), by - 10, { s: 9.5, w: 800, c: '#15803d' }); Q42.T(ctx, '20000 Hz', X(20000), by - 10, { s: 9.5, w: 800, c: '#15803d' });
      Q41.dot(ctx, X(f), by + 8, '#dc2626', 6);
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      Q58.card(ctx, S, [{ t: 'الصوت موجة طولية في الأوساط المادية', c: '#0f766e', w: 900 }, { t: 'λ = v / f', mono: 1, c: '#2563eb', w: 900 }, { t: 'λ = 343 / ' + f + ' = ' + Q58.f(lam, 3) + ' m', mono: 1 }, { t: 'T = 1 / f = ' + Q58.f(1000 / f, 2) + ' ms', mono: 1, c: '#7c3aed' }, { t: 'سرعة الصوت في الهواء تقريباً 343 m/s', c: '#334155', s: 11.5 }, { t: 'لا ينتقل الصوت في الفراغ', c: '#dc2626', w: 800 }], { title: 'الصوت وراسم الذبذبات' });
      Q42.banner(ctx, w, 'اضغط على الشوكة لطرقها وراقب الشاشة');
    },
    chips(S, g) { return Q42.chips(S, 'sd', [['hit', 'اطرق الشوكة'], ['256', '256 Hz'], ['512', '512 Hz'], ['vac', S.p.vac ? 'أدخل الهواء' : 'فرّغ الهواء']], g.h - 84, '', (S2, k) => { if (k === 'hit') D.strike(S2); else if (k === 'vac') setParam(S2, 'vac', !S2.p.vac); else { setParam(S2, 'f', +k); D.strike(S2); } }, { bw: 150 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'fork', x: g.fx, y: g.fy - 70, w: 70, h: 120, axis: 'none', tip: 'اطرق الشوكة', idle: 'اضغط ✋', click: S2 => D.strike(S2) }].concat(D.chips(S, g)); },
    readings(S) { return [rd('التردد f', S.p.f + ' Hz'), rd('الزمن الدوري T', Q58.f(1000 / S.p.f, 2) + ' ms'), rd('الطول الموجي في الهواء', Q58.f(343 / S.p.f, 3) + ' m'), rd('الوسط', S.p.vac ? 'فراغ' : 'هواء')]; },
    record(S) { return { f: S.p.f, T: +(1000 / S.p.f).toFixed(3), l: +(343 / S.p.f).toFixed(3) }; },
    cols: [['f', 'f (Hz)'], ['T', 'T (ms)'], ['l', 'λ (m)']],
    explain(S) { return Q26.ex(S.p.vac ? 'في الفراغ تهتز الشوكة لكن الإشارة لا تظهر على راسم الذبذبات.' : 'فرعا الشوكة يدفعان الهواء ويسحبانه فتنتشر تضاغطات وتخلخلات تصل إلى المايكروفون.', 'الصوت اهتزاز ميكانيكي تنقله جزيئات الوسط من واحدة إلى أخرى، فإذا انعدمت الجزيئات لا يجد الصوت ما ينقله. وتردد الموجة يساوي تردد الشوكة.', 'لا يسمع رواد الفضاء بعضهم مباشرة خارج المركبة، بل يتواصلون بموجات الراديو.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — سرعة الصوت في الأوساط: الجدول 1 + مثال 4 + مثال 5 (ص 170–172) =============== */
(() => {
  const GAS = [['الهيدروجين', 1286, '0°C'], ['الهيليوم', 972, '0°C'], ['الهواء', 343, '20°C'], ['الهواء', 331, '0°C'], ['الأوكسجين', 317, '0°C']];
  const LIQ = [['ماء البحر', 1533], ['الماء', 1493], ['الزئبق', 1450], ['الكيروسين', 1324], ['الكحول المثيلي', 1143], ['رباعي كلوريد الكربون', 926]];
  const SOL = [['الماس', 12000], ['زجاج البيركس', 5640], ['الحديد', 5130], ['الألمنيوم', 5100], ['النحاس الأصفر', 4700], ['النحاس', 3560], ['الرصاص', 1322]];
  const CAT = [GAS, LIQ, SOL], CN = ['غازات', 'سوائل', 'جوامد'], CC = ['#0ea5e9', '#2563eb', '#64748b'];
  const E4 = { q: 'طُرق طرف ساق من الألمنيوم بمطرقة فتولدت موجة طولية. احسب انطلاقها علماً أن معامل يونك 7×10¹⁰ N/m² والكثافة 2.70×10³ kg/m³', lines: ['vs = √(Y / ρ)', 'vs = √(7×10¹⁰ / 2.70×10³)', 'vs = √(2.59×10⁷)', 'vs = 5091 m/s'] };
  const E5 = { q: 'احسب انطلاق الصوت في الماء علماً أن معامل المرونة الحجمي β = 2.1×10⁹ N/m² وكثافته 1×10³ kg/m³', lines: ['vs = √(β / ρ)', 'vs = √(2.1×10⁹ / 1×10³)', 'vs = √(2.1×10⁶)', 'vs = 1449 m/s'] };
  const EXL = [['e4', 'مثال 4 ص 171', E4], ['e5', 'مثال 5 ص 172', E5]];
  const D = { id: 'g11_o_vsound', page: 170, fig: 'الجدول 1 + مثال 4 + مثال 5',
    desc: 'تنطلق الموجات الصوتية في الجوامد أسرع منها في السوائل، وفي السوائل أسرع منها في الغازات. في الجوامد vs = √(Y/ρ) ، وفي السوائل vs = √(β/ρ). في الغازات يزداد انطلاق الصوت بنحو 0.6 m/s لكل ارتفاع درجة سيليزية واحدة: v = 331 + 0.6 T ، والرطوبة تزيده لأن الهواء الرطب أقل كثافة.',
    tags: 'سرعة الصوت انطلاق الصوت الجدول 1 الجوامد السوائل الغازات معامل يونك Y الكثافة ρ vs=√(Y/ρ) vs=√(β/ρ) v=331+0.6T درجة الحرارة الرطوبة الألمنيوم الماء مثال 4 مثال 5 8-12',
    tools: ['ساق ألمنيوم', 'أنبوب ماء', 'أنبوب هواء', 'مطرقة', 'ساعة توقيت'],
    steps: ['اضغط على اسم كل وسط لتغيير مادته من الجدول 1.', 'اضغط «أطلق النبضات» واطرق الأوساط الثلاثة معاً: أيها يصل أولاً؟', 'غيّر درجة حرارة الهواء وراقب المنحني v = 331 + 0.6 T.', 'اضغط «مثال 4» و«مثال 5» للحل خطوة خطوة.'],
    concl: ['انطلاق الصوت في الجوامد > السوائل > الغازات.', 'في الجوامد vs = √(Y/ρ) ، وفي السوائل vs = √(β/ρ).', 'في الهواء v = 331 + 0.6 T حيث T بالدرجات السيليزية.', 'مثال 4: 5091 m/s في الألمنيوم ، مثال 5: 1449 m/s في الماء.'],
    laws: ['g11_l8_vsolid', 'g11_l8_vliq', 'g11_l8_vgas'],
    controls: [R('d', 'طول المسار d', 50, 1000, 200, 10, 'm'), R('T', 'درجة حرارة الهواء T', -20, 50, 20, 1, '°C'), TG('tab', 'جدول 1', true, null, 'table')],
    setup(S) { S.sel = [2, 1, 3]; S.tau = 0; S.run = 0; S.ex = 0; S.k = 0; S.vis = [0, 0, 0]; },
    v(S, i) { const q = CAT[i][S.sel[i]]; if (i === 0 && q[0] === 'الهواء' && q[2] === '20°C') return 331 + .6 * S.p.T; return q[1]; },
    update(S, dt) { const tmax = S.p.d / D.v(S, 0); if (S.run) { S.tau += dt * tmax / 5; if (S.tau >= tmax) { S.tau = tmax; S.run = 0; } } for (let i = 0; i < 3; i++) S.vis[i] = Q58.ez(S.vis[i], Math.min(1, D.v(S, i) * S.tau / S.p.d), dt, 14); },
    geo(S) { const g = Q58.geo(S); g.lx0 = g.x0 + 112; g.lx1 = g.x1 - 6; g.ly = [118, 190, 262]; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S);
      Q58.bg(ctx, w, h);
      for (let i = 0; i < 3; i++) { const y = g.ly[i], q = CAT[i][S.sel[i]], v = D.v(S, i), px = g.lx0 + (g.lx1 - g.lx0) * S.vis[i];
        K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, y - 20, 0, y + 20); if (i === 0) { gg.addColorStop(0, '#f0f9ff'); gg.addColorStop(1, '#bae6fd'); } else if (i === 1) { gg.addColorStop(0, '#93c5fd'); gg.addColorStop(1, '#1d4ed8'); } else { gg.addColorStop(0, '#e5e7eb'); gg.addColorStop(.45, '#9ca3af'); gg.addColorStop(1, '#4b5563'); } ctx.fillStyle = gg; rr(ctx, g.lx0, y - 20, g.lx1 - g.lx0, 40, i === 2 ? 4 : 12); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.lineWidth = 1.2; ctx.stroke();
          if (S.tau > 0 && S.vis[i] < 1) { ctx.fillStyle = 'rgba(220,38,38,.55)'; for (let k = 0; k < 5; k++) ctx.fillRect(px - 3 - k * 5, y - 18, 2.5 - k * .3, 36); } });
        if (S.vis[i] >= .999) Q42.T(ctx, 'وصلت ✓', g.lx1 - 30, y - 30, { s: 10.5, w: 900, c: '#16a34a' });
        Q42.T(ctx, q[0], g.x0 + 44, y - 8, { s: 11.5, w: 900, c: CC[i] }); Q42.T(ctx, Q58.f(v, 0) + ' m/s', g.x0 + 44, y + 10, { s: 11, w: 800, c: '#334155' });
        Q42.T(ctx, 't = ' + Q58.f(S.p.d / v * 1000, 1) + ' ms', (g.lx0 + g.lx1) / 2, y + 30, { s: 10, w: 800, c: '#475569' }); }
      K.raw(ctx, () => { ctx.fillStyle = '#7c2d12'; ctx.fillRect(g.lx0 - 18, 96, 8, 190); });
      Q58.dim(ctx, g.lx0, 304, g.lx1, 304, 'd = ' + S.p.d + ' m', '#7c3aed', { dy: 12 });
      // v–T graph of air
      const A = { x: g.L + 64, y: 362, w: (w - g.L) / 2 - 80, h: 190, x0: -20, x1: 50, y0: 315, y1: 365, xs: 10, ys: 10, lx: 10, ly: 10, xl: 'T (°C)', yl: 'v (m/s)', col: '#0ea5e9' }, M = Q58.axes(ctx, A);
      Q52.plot(ctx, [[M.X(-20), M.Y(331 - 12)], [M.X(50), M.Y(331 + 30)]], '#0ea5e9', 2.6);
      Q41.dot(ctx, M.X(S.p.T), M.Y(331 + .6 * S.p.T), '#dc2626', 6); Q42.T(ctx, 'v = 331 + 0.6 T', A.x + A.w * .35, A.y + 14, { s: 11, w: 900, c: '#0369a1', bg: 'rgba(255,255,255,.9)' });
      Q42.T(ctx, Q58.f(331 + .6 * S.p.T, 1) + ' m/s', M.X(S.p.T), M.Y(331 + .6 * S.p.T) - 16, { s: 10.5, w: 900, c: '#dc2626', bg: 'rgba(255,255,255,.9)' });
      // table 1
      if (S.p.tab) { const tx = (w + g.L) / 2 + 6, tw = w - 16 - tx, cw = tw / 3; Q58.panel(ctx, tx, 344, tw, 266, 'الجدول 1: سرعة الصوت m/s', '#0f766e');
        CAT.forEach((L, c) => { const cx = tx + tw - cw * (c + .5); Q42.T(ctx, CN[c] + (c === 1 ? ' 25°C' : ''), cx, 382, { s: 11, w: 900, c: CC[c] }); L.forEach((q, r) => { const on = S.sel[c] === r, yy = 404 + r * 28; if (on) K.raw(ctx, () => { ctx.fillStyle = 'rgba(250,204,21,.35)'; rr(ctx, cx - cw / 2 + 3, yy - 12, cw - 6, 26, 6); ctx.fill(); }); Q42.T(ctx, q[0], cx, yy - 3, { s: q[0].length > 12 ? 8.5 : 10, w: 800, c: '#1e293b' }); Q42.T(ctx, q[1] + (q[2] ? '  ·  ' + q[2] : ''), cx, yy + 9, { s: 9.5, w: 700, c: '#475569' }); }); }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.e);
      if (!Q58.drawEx(ctx, S, EXL)) Q58.card(ctx, S, [{ t: 'في الجوامد:', c: '#475569', w: 800 }, { t: 'vs = √(Y / ρ)', mono: 1, c: '#475569', w: 900 }, { t: 'في السوائل:', c: '#2563eb', w: 800 }, { t: 'vs = √(β / ρ)', mono: 1, c: '#2563eb', w: 900 }, { t: 'في الغازات:', c: '#0ea5e9', w: 800 }, { t: 'v = 331 + 0.6 T', mono: 1, c: '#0ea5e9', w: 900 }, { t: 'الجوامد أسرع ثم السوائل ثم الغازات', c: '#dc2626', w: 800 }, { t: 'الرطوبة تزيد الانطلاق لأن الهواء الرطب أقل كثافة', c: '#64748b', s: 11.5 }], { title: 'انطلاق الصوت' });
      Q42.banner(ctx, w, 'اضغط اسم الوسط لتغييره ثم أطلق النبضات');
    },
    chips(S, g) { return { p: Q42.chips(S, 'rc', [['go', S.run ? '⏸ أوقف' : '▶ أطلق النبضات'], ['re', '↺ من البداية']], g.h - 128, '', (S2, k) => { if (k === 'go') { if (!S2.run && S2.vis.every(x => x > .999) || S2.tau >= S2.p.d / D.v(S2, 0)) S2.tau = 0; S2.run = S2.run ? 0 : 1; } else { S2.tau = 0; S2.run = 0; } }, { bw: 170 }),
      e: Q58.exChips(S, 'ex', g.h - 84, EXL, (S2, k) => { if (k === 'e4') S2.sel[2] = 3; else S2.sel[1] = 1; S2.tau = 0; S2.run = 1; }, { bw: 160 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return g.ly.map((y, i) => ({ id: 'lane' + i, x: g.x0 + 44, y, w: 88, h: 44, axis: 'none', tip: 'غيّر المادة', idle: i ? undefined : 'اضغط ✋', hint: i ? false : undefined, click: S2 => { S2.sel[i] = (S2.sel[i] + 1) % CAT[i].length; S2.chg = (S2.chg || 0) + 1; S2.tau = 0; S2.run = 0; } })).concat(C.p, C.e); },
    readings(S) { return [0, 1, 2].map(i => rd(CAT[i][S.sel[i]][0], Q58.f(D.v(S, i), 0) + ' m/s')).concat([rd('سرعة الصوت في الهواء', Q58.f(331 + .6 * S.p.T, 1) + ' m/s')]); },
    record(S) { return { T: S.p.T, v: +(331 + .6 * S.p.T).toFixed(1) }; },
    cols: [['T', 'T (°C)'], ['v', 'v (m/s)']],
    explain(S) { return Q26.ex('النبضة في ' + CAT[2][S.sel[2]][0] + ' تصل أولاً، ثم في ' + CAT[1][S.sel[1]][0] + '، وأخيراً في ' + CAT[0][S.sel[0]][0] + '.', 'جسيمات الجوامد مترابطة بقوة فمعامل مرونتها كبير جداً مقارنة بكثافتها، لذا تنقل الاضطراب بسرعة. وفي الغازات تزداد سرعة الجزيئات بارتفاع درجة الحرارة فيزداد انطلاق الصوت.', 'يضع بعض الناس آذانهم على سكة الحديد ليسمعوا القطار القادم قبل سماعه في الهواء.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — نشاط: تداخل الصوت بأنبوبة كوينك (الأشكال 26 و 27، ص 172–174) =============== */
(() => {
  const PX = 2.6; // px per cm of slide
  const D = { id: 'g11_o_quincke', page: 172, fig: 'الشكل 26 + الشكل 27 — نشاط',
    desc: 'نشاط: أنبوبة كوينك أنبوبة معدنية ذات فرعين: فرع ثابت PAR وفرع منزلق PBR يتغير طوله. نطرق شوكة رنانة عند الفتحة P ونستمع عند R. عندما يتساوى المساران يصل الصوت واضحاً (تداخل بناء: تضاغط مع تضاغط). وعندما نسحب B تدريجياً يخفت الصوت حتى ينعدم عندما يصبح فرق المسار نصف طول موجي (تداخل إتلافي: تضاغط مع تخلخل)، ثم تزداد الشدة من جديد عند فرق مسار طول موجي كامل.',
    tags: 'تداخل الموجات أنبوبة كوينك Quincke فرق المسار تداخل بناء تداخل هدام إتلافي تضاغط تخلخل λ/2 مكبرا صوت الشكل 26 الشكل 27 نشاط 8-13',
    tools: ['أنبوبة كوينك ذات فرعين', 'شوكة رنانة', 'مطرقة مطاطية', 'سماعة طبية أو أذن عند R'],
    steps: ['اجعل PAR = PBR (فرق المسار صفر) واطرق الشوكة: الصوت واضح عند R.', 'اسحب الأنبوبة B إلى الأعلى ببطء وراقب مؤشر الشدة.', 'عند فرق مسار λ/2 ينعدم الصوت تقريباً.', 'استمر بالسحب: تزداد الشدة من جديد عند فرق مسار λ.', 'غيّر تردد الشوكة: يتغير الموضع الذي ينعدم فيه الصوت.'],
    concl: ['التداخل: التقاء موجات من نوع واحد في وقت واحد.', 'تداخل بناء عند فرق مسار 0 أو λ أو 2λ… : قمة مع قمة فالسعة 2A.', 'تداخل هدام عند فرق مسار λ/2 أو 3λ/2… : قمة مع قعر فالمحصلة صفر.', 'للحصول على نمط تداخل واضح ومستقر يجب أن يكون للموجتين التردد نفسه والسعة نفسها.'],
    laws: ['g11_l8_interf'],
    controls: [R('f', 'تردد الشوكة f', 256, 1024, 512, 1, 'Hz'), R('e', 'سحب الأنبوبة B', 0, 40, 0, .5, 'cm'), TG('snd', 'تشغيل الصوت', false, null, 'sound')],
    setup(S) { S.ev = 0; S.ph = 0; S.amp = 0; S.hd = null; },
    lam(S) { return 343 / S.p.f * 100; },  // cm
    I(S) { const dl = 2 * S.ev; return Math.pow(Math.cos(Math.PI * dl / D.lam(S)), 2); },
    update(S, dt) { S.ev = Q58.ez(S.ev, S.p.e, dt, 10); S.ph += dt * TAU * 1.2; S.amp *= Math.exp(-dt * .25); if (S.amp < .02) S.amp = 0; if (S.hd) Q25.vol(S.hd, .1 * S.amp * D.I(S) + .0001); },
    strike(S) { S.amp = 1; if (S.hd) Q25.stop(S.hd); S.hd = S.p.snd ? Q58.tone(S.p.f, 5, { vol: .1 * D.I(S) + .0005 }) : null; },
    geo(S) { const g = Q58.geo(S); g.px = g.x0 + 74; g.rx = g.x1 - 96; g.cy = 236; g.ay = 296; g.by = 180; return g; },
    tube(ctx, pts, col = '#94a3b8', wd = 16) { K.raw(ctx, () => { ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'butt'; ctx.strokeStyle = '#475569'; ctx.lineWidth = wd + 3; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = wd * .25; ctx.stroke(); ctx.restore(); }); },
    flow(ctx, pts, ph, col) { K.raw(ctx, () => { ctx.save(); ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.setLineDash([6, 12]); ctx.lineDashOffset = -ph * 12; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), lam = D.lam(S), dl = 2 * S.ev, I = D.I(S), top = g.by - 40 - S.ev * PX, sxL = g.px + 46, sxR = g.rx - 46;
      Q58.bg(ctx, w, h);
      const A = [[g.px, g.cy], [g.px, g.ay], [g.rx, g.ay], [g.rx, g.cy]];
      D.tube(ctx, A, '#cbd5e1');
      D.tube(ctx, [[g.px, g.cy], [g.px, g.by], [sxL, g.by], [sxL, g.by - 40]], '#cbd5e1'); D.tube(ctx, [[g.rx, g.cy], [g.rx, g.by], [sxR, g.by], [sxR, g.by - 40]], '#cbd5e1');
      D.tube(ctx, [[sxL, g.by - 30], [sxL, top], [sxR, top], [sxR, g.by - 30]], '#e2e8f0', 20);
      if (S.amp > 0) { const ca = 'rgba(37,99,235,' + (.35 + .5 * S.amp) + ')'; D.flow(ctx, A, S.ph, ca); D.flow(ctx, [[g.px, g.cy], [g.px, g.by], [sxL, g.by], [sxL, top], [sxR, top], [sxR, g.by], [g.rx, g.by], [g.rx, g.cy]], S.ph, 'rgba(22,163,74,' + (.35 + .5 * S.amp) + ')'); }
      D.tube(ctx, [[g.px - 40, g.cy], [g.px, g.cy]], '#cbd5e1'); D.tube(ctx, [[g.rx, g.cy], [g.rx + 34, g.cy]], '#cbd5e1');
      Q42.T(ctx, 'A', (g.px + g.rx) / 2, g.ay + 22, { s: 14, w: 900, c: '#2563eb' }); Q42.T(ctx, 'B', (sxL + sxR) / 2, top - 22, { s: 14, w: 900, c: '#16a34a' });
      Q42.T(ctx, 'P', g.px - 18, g.cy - 20, { s: 13, w: 900, c: '#334155' }); Q42.T(ctx, 'R', g.rx + 18, g.cy - 20, { s: 13, w: 900, c: '#334155' });
      if (S.ev > .5) Q58.dim(ctx, sxR + 22, g.by - 40, sxR + 22, top, Q58.f(S.ev, 1) + ' cm', '#7c3aed', { dx: 30, dy: 0 });
      Q25.fork(ctx, g.px - 54, g.cy + 50, 70, -Math.PI / 2, Math.sin(S.ph * 7) * 3 * S.amp, { label: S.p.f + '' });
      Q25.ear(ctx, g.rx + 60, g.cy, 13, -1);
      // loudness bar at R
      K.raw(ctx, () => { const bx = g.rx + 30, by = 120, bh = 70; ctx.fillStyle = '#e2e8f0'; rr(ctx, bx, by, 14, bh, 5); ctx.fill(); const lv = I * (S.amp > 0 ? S.amp : 1); ctx.fillStyle = lv > .6 ? '#16a34a' : lv > .2 ? '#f59e0b' : '#dc2626'; rr(ctx, bx, by + bh * (1 - lv), 14, bh * lv, 5); ctx.fill(); });
      Q42.T(ctx, I > .85 ? 'تداخل بناء: صوت واضح' : I < .15 ? 'تداخل هدام: ينعدم الصوت' : 'شدة متوسطة', (g.px + g.rx) / 2, g.cy, { s: 12, w: 900, c: '#fff', bg: I > .85 ? '#16a34a' : I < .15 ? '#dc2626' : '#d97706' });
      // waves arriving at R
      const wx = g.L + 30, ww = (w - g.L) / 2 - 50, wy = 352; Q58.panel(ctx, wx, wy, ww, 258, 'الموجتان عند R ومحصلتهما', '#0f766e');
      const k = TAU / 120, sh = TAU * dl / lam, rows = [[wy + 70, x => Math.sin(k * x - S.ph), '#2563eb', 'عبر A'], [wy + 140, x => Math.sin(k * x - S.ph - sh), '#16a34a', 'عبر B'], [wy + 212, x => Math.sin(k * x - S.ph) + Math.sin(k * x - S.ph - sh), '#7c3aed', 'المحصلة']];
      rows.forEach(r => { Q58.line(ctx, [[wx + 14, r[0]], [wx + ww - 70, r[0]]], 'rgba(15,23,42,.2)', 1, [3, 4]); Q58.wave(ctx, wx + 14, wx + ww - 70, x => r[0] - 15 * r[1](x - wx), r[2], 2.4); Q42.T(ctx, r[3], wx + ww - 36, r[0], { s: 11, w: 900, c: r[2] }); });
      // intensity vs path difference
      const AX = { x: (w + g.L) / 2 + 40, y: 380, w: (w - g.L) / 2 - 70, h: 180, x0: 0, x1: 80, y0: 0, y1: 1.1, xs: 10, ys: .25, lx: 20, ly: .5, xl: 'Δ (cm)', yl: 'شدة الصوت عند R', col: '#dc2626' }, M = Q58.axes(ctx, AX), pts = [];
      for (let x = 0; x <= 80; x += .5) pts.push([M.X(x), M.Y(Math.pow(Math.cos(Math.PI * x / lam), 2))]); Q52.plot(ctx, pts, '#dc2626', 2.4);
      if (lam / 2 <= 80) Q42.T(ctx, 'λ/2', M.X(lam / 2), M.Y(0) - 12, { s: 10.5, w: 900, c: '#7c3aed', bg: 'rgba(255,255,255,.85)' });
      if (lam <= 80) Q42.T(ctx, 'λ', M.X(lam), M.Y(1) - 12, { s: 10.5, w: 900, c: '#7c3aed', bg: 'rgba(255,255,255,.85)' });
      Q41.dot(ctx, M.X(Math.min(dl, 80)), M.Y(I), '#1e293b', 6);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.b);
      Q58.card(ctx, S, [{ t: 'λ = v / f = 343 / ' + S.p.f + ' = ' + Q58.f(lam, 1) + ' cm', mono: 1, c: '#2563eb' }, { t: 'فرق المسار = PBR − PAR', c: '#334155', w: 800 }, { t: 'Δ = 2 × ' + Q58.f(S.ev, 1) + ' = ' + Q58.f(dl, 1) + ' cm', mono: 1, c: '#7c3aed', w: 800 }, { t: 'Δ / λ = ' + Q58.f(dl / lam, 2), mono: 1, c: '#0f766e', w: 900 }, { t: 'بناء: فرق المسار عدد صحيح من λ', c: '#16a34a', w: 800 }, { t: 'هدام: فرق المسار نصف λ أو 1.5 λ', c: '#dc2626', w: 800 }, { t: 'مكبرا صوت على البعد نفسه من السامع: تداخل بناء', c: '#64748b', s: 11 }], { title: 'نشاط: أنبوبة كوينك' });
      Q42.banner(ctx, w, 'اطرق الشوكة ثم اسحب الأنبوبة B إلى الأعلى');
    },
    chips(S, g) { const lam = D.lam(S); return { a: Q42.chips(S, 'q', [['hit', 'اطرق الشوكة'], ['0', 'PAR = PBR'], ['h', 'فرق المسار نصف λ'], ['l', 'فرق المسار λ']], g.h - 84, '', (S2, k) => { if (k === 'hit') { D.strike(S2); return; } const L2 = D.lam(S2), e = k === '0' ? 0 : k === 'h' ? L2 / 4 : L2 / 2; setParam(S2, 'e', Math.min(40, Math.round(e * 2) / 2)); if (!S2.amp) D.strike(S2); }, { bw: 150 }),
      b: Q42.chips(S, 'fq', [['256', '256 Hz'], ['512', '512 Hz'], ['1024', '1024 Hz']], g.h - 128, String(S.p.f), (S2, k) => setParam(S2, 'f', +k), { bw: 120 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), top = g.by - 40 - S.ev * PX;
      return [{ id: 'slide', x: (g.px + g.rx) / 2, y: top, w: 120, h: 30, axis: 'y', keep: true, tip: 'اسحب الأنبوبة B', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'e', clamp(Math.round((g.by - 40 - d.y) / PX * 2) / 2, 0, 40)) },
        { id: 'fork', x: g.px - 54, y: g.cy + 10, w: 40, h: 80, axis: 'none', hint: false, tip: 'اطرق الشوكة', click: S2 => D.strike(S2) }].concat(C.a, C.b); },
    readings(S) { const lam = D.lam(S); return [rd('الطول الموجي λ', Q58.f(lam, 1) + ' cm'), rd('فرق المسار', Q58.f(2 * S.ev, 1) + ' cm'), rd('فرق المسار ÷ λ', Q58.f(2 * S.ev / lam, 2)), rd('الشدة النسبية عند R', Q58.f(D.I(S) * 100, 0) + ' %')]; },
    record(S) { return { d: +(2 * S.ev).toFixed(1), I: +(D.I(S) * 100).toFixed(0) }; },
    cols: [['d', 'Δ (cm)'], ['I', 'I (%)']],
    explain(S) { const I = D.I(S); return Q26.ex(I > .85 ? 'الصوت عند R واضح وقوي.' : I < .15 ? 'الصوت عند R خافت جداً أو منعدم رغم أن الشوكة تهتز.' : 'الصوت عند R متوسط الشدة.', 'تنقسم موجة الشوكة عند P إلى موجتين تسلكان الفرعين ثم تلتقيان عند R. إذا كان فرق المسار عدداً صحيحاً من الأطوال الموجية التقى التضاغط بالتضاغط فتقوى الصوت، وإذا كان نصف طول موجي التقى التضاغط بالتخلخل فألغى أحدهما الآخر.', 'تصمم القاعات بحيث لا تتكون فيها مناطق تداخل هدام يخفت فيها صوت المتحدث.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — الرنين: أرجوحة تدفع بقوة دورية (الشكلان 28 و 29، ص 174) =============== */
(() => {
  const F0 = .028;
  const D = { id: 'g11_o_reson', page: 174, fig: 'الشكلان 28 و 29',
    desc: 'الرنين: عندما تؤثر في جسم قوة خارجية دورية ترددها يساوي التردد الطبيعي للجسم f₀ تزداد سعة اهتزازه كثيراً وينتقل إليه أكبر قدر من الطاقة. مثل دفع الأرجوحة بالاتجاه نفسه لحركتها عند كل ذبذبة وبالتردد نفسه. ويبين الشكل 28 أن قمة منحني السعة حادة وعالية عندما يكون الإخماد ضعيفاً، ومنخفضة عندما يكون الإخماد عالياً.',
    tags: 'الرنين Resonance التردد الطبيعي f0 قوة خارجية دورية سعة الاهتزاز أكبر طاقة الأرجوحة منحني السعة مع التردد الإخماد الجنود الجسر الشكل 28 الشكل 29 8-14',
    tools: ['أرجوحة', 'دافع بقوة دورية'],
    steps: ['اترك تردد الدفع مختلفاً عن التردد الطبيعي: تبقى السعة صغيرة.', 'اضغط «f = f₀» أو اسحب المؤشر على المنحني إلى القمة: تكبر السعة تدريجياً كثيراً.', 'بدّل إلى «إخماد عالٍ»: تنخفض قمة المنحني.', 'فكّر: لماذا لا يُسمح للجنود بالسير بخطوات منتظمة على جسر؟'],
    concl: ['الرنين: تساوي تردد القوة الدورية مع التردد الطبيعي للجسم.', 'عند الرنين تكون سعة الاهتزاز أكبر ما يمكن وينتقل أكبر قدر من الطاقة.', 'كلما ضعف الإخماد كانت قمة الرنين أعلى وأحدّ.', 'خطوات الجنود المنتظمة قد توافق التردد الطبيعي للجسر فيهتز بسعة كبيرة وقد ينهار.'],
    laws: ['g11_l8_reson'],
    controls: [R('fd', 'تردد الدفع f', .2, 1.2, .4, .01, 'Hz'), R('f0', 'التردد الطبيعي f₀', .4, .9, .6, .01, 'Hz'), TG('hd', 'إخماد عالٍ', false, null, 'damp'), TG('fast', 'تسريع الزمن ×3', true, null, 'fast')],
    setup(S) { S.th = 0; S.om = 0; S.ph = 0; S.pk = 0; S.pkh = []; S.clk = 0; S.mx = .25; },
    gam(S) { return S.p.hd ? .28 : .07; },
    ss(S, f) { const w0 = TAU * S.p.f0, w = TAU * f, gm = D.gam(S); return F0 * w0 * w0 / Math.sqrt(Math.pow(w0 * w0 - w * w, 2) + Math.pow(2 * gm * w, 2)) * .5; },
    update(S, dt) { const sp = S.p.fast ? 3 : 1, n = 12, hh = dt * sp / n, w0 = TAU * S.p.f0, gm = D.gam(S), wd = TAU * S.p.fd;
      for (let i = 0; i < n; i++) { const F = F0 * .5 * w0 * w0 * Math.max(0, Math.cos(S.ph)) * 2.2; S.om += (-w0 * w0 * S.th - 2 * gm * S.om + F) * hh; S.th += S.om * hh; S.ph += wd * hh; }
      S.th = clamp(S.th, -1.1, 1.1); S.clk += dt * sp; S.pkh.push([S.clk, Math.abs(S.th)]); while (S.pkh.length && S.pkh[0][0] < S.clk - 1 / S.p.fd - .5) S.pkh.shift(); S.pk = S.pkh.reduce((m, q) => Math.max(m, q[1]), 0); S.mx = Q58.ez(S.mx, Math.max(.25, D.ss(S, S.p.f0) * 1.15), dt, 3); },
    geo(S) { const g = Q58.geo(S); g.sx = (g.x0 + g.x1) / 2; g.sy = 92; g.Lr = 190; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), th = S.th, bx = g.sx + g.Lr * Math.sin(th), by = g.sy + g.Lr * Math.cos(th), push = Math.max(0, Math.cos(S.ph));
      Q58.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = '#86efac'; ctx.fillRect(g.x0, 318, g.x1 - g.x0, 14); const fg = ctx.createLinearGradient(0, 0, 0, 10); ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(g.sx - 150, 320); ctx.lineTo(g.sx - 110, g.sy - 6); ctx.lineTo(g.sx + 110, g.sy - 6); ctx.lineTo(g.sx + 150, 320); ctx.stroke(); });
      K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.4; [-22, 22].forEach(dx => { ctx.beginPath(); ctx.moveTo(g.sx + dx, g.sy); ctx.lineTo(bx + dx * Math.cos(th), by - dx * Math.sin(th) * 0); ctx.stroke(); }); ctx.save(); ctx.translate(bx, by); ctx.rotate(-th); const sg = ctx.createLinearGradient(-30, 0, 30, 0); sg.addColorStop(0, '#b45309'); sg.addColorStop(.5, '#f59e0b'); sg.addColorStop(1, '#92400e'); ctx.fillStyle = sg; rr(ctx, -32, -4, 64, 10, 3); ctx.fill();
        ctx.fillStyle = '#2563eb'; rr(ctx, -12, -36, 24, 32, 8); ctx.fill(); ctx.fillStyle = '#f2c29b'; ctx.beginPath(); ctx.arc(0, -46, 11, 0, TAU); ctx.fill(); ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-6, -2); ctx.lineTo(-14, 22); ctx.moveTo(6, -2); ctx.lineTo(10, 22); ctx.stroke(); ctx.restore(); });
      Q58.line(ctx, [[g.sx, g.sy], [g.sx, g.sy + g.Lr + 30]], 'rgba(22,163,74,.6)', 1.4, [5, 5]);
      if (push > .3 && S.om > -0.05) Q58.arrow(ctx, bx - 60, by - 20, 40 * push, 0, '#dc2626', 'F', 3.5);
      K.raw(ctx, () => { ctx.fillStyle = '#f2c29b'; ctx.strokeStyle = '#b45309'; ctx.beginPath(); ctx.arc(bx - 64 - 10 * (1 - push), by - 20, 9, 0, TAU); ctx.fill(); ctx.stroke(); });
      Q42.T(ctx, 'السعة ' + Q58.f(S.pk * 180 / Math.PI, 0) + '°', g.x0 + 50, g.sy + 6, { s: 12, w: 900, c: '#fff', bg: Math.abs(S.p.fd - S.p.f0) < .02 ? '#dc2626' : '#475569' });
      // resonance curves
      const A = { x: g.L + 64, y: 372, w: w - g.L - 130, h: 196, x0: .2, x1: 1.2, y0: 0, y1: S.mx * 180 / Math.PI, xs: .1, ys: 10, lx: .2, ly: 20, xl: 'f (Hz)', yl: 'سعة الاهتزاز (°)', col: '#dc2626' }, M = Q58.axes(ctx, A);
      const sv = S.p.hd; [[0, '#dc2626'], [1, '#2563eb']].forEach(q => { S.p.hd = !!q[0]; const pts = []; for (let f = .2; f <= 1.2001; f += .005) pts.push([M.X(f), M.Y(Math.min(D.ss(S, f), S.mx) * 180 / Math.PI)]); Q52.plot(ctx, pts, q[1], q[0] === (sv ? 1 : 0) ? 3 : 1.6, q[0] === (sv ? 1 : 0) ? null : [5, 4]); }); S.p.hd = sv;
      Q58.line(ctx, [[M.X(S.p.f0), A.y], [M.X(S.p.f0), A.y + A.h]], 'rgba(124,58,237,.6)', 1.4, [4, 4]); Q42.T(ctx, 'f₀', M.X(S.p.f0), A.y - 8, { s: 11, w: 900, c: '#7c3aed' });
      Q58.line(ctx, [[M.X(S.p.fd), A.y + A.h], [M.X(S.p.fd), M.Y(Math.min(S.pk, S.mx) * 180 / Math.PI)]], '#0f172a', 1.5); Q41.dot(ctx, M.X(S.p.fd), M.Y(Math.min(S.pk, S.mx) * 180 / Math.PI), '#0f172a', 6);
      Q42.T(ctx, 'أحمر: إخماد ضعيف', A.x + A.w - 70, A.y + 10, { s: 10.5, w: 900, c: '#dc2626', bg: 'rgba(255,255,255,.9)' }); Q42.T(ctx, 'أزرق: إخماد عالٍ', A.x + A.w - 70, A.y + 28, { s: 10.5, w: 900, c: '#2563eb', bg: 'rgba(255,255,255,.9)' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      Q58.card(ctx, S, [{ t: 'f₀ = ' + Q58.f(S.p.f0, 2) + ' Hz', mono: 1, c: '#7c3aed', w: 900 }, { t: 'f = ' + Q58.f(S.p.fd, 2) + ' Hz', mono: 1, c: '#0f172a', w: 900 }, { t: Math.abs(S.p.fd - S.p.f0) < .02 ? 'رنين: f = f₀ والسعة أكبر ما يمكن' : 'لا رنين: السعة صغيرة', c: Math.abs(S.p.fd - S.p.f0) < .02 ? '#dc2626' : '#475569', w: 900 }, { t: 'ندفع الأرجوحة باتجاه حركتها وبترددها نفسه', c: '#334155', w: 800 }, { t: 'الإخماد العالي يخفض قمة الرنين', c: '#2563eb', s: 11.5 }, { t: 'اسحب النقطة السوداء على المنحني', c: '#64748b', s: 11 }], { title: 'الرنين' });
      Q42.banner(ctx, w, 'غيّر تردد الدفع حتى يساوي التردد الطبيعي');
    },
    chips(S, g) { return Q42.chips(S, 'rs', [['eq', 'f = f₀'], ['lo', 'f = f₀ / 2'], ['hi', 'f = 2 f₀'], ['dm', S.p.hd ? 'إخماد ضعيف' : 'إخماد عالٍ'], ['st', 'من السكون']], g.h - 84, '', (S2, k) => { if (k === 'dm') setParam(S2, 'hd', !S2.p.hd); else if (k === 'st') { S2.th = 0; S2.om = 0; S2.pkh = []; } else setParam(S2, 'fd', clamp(Math.round(S2.p.f0 * (k === 'eq' ? 1 : k === 'lo' ? .5 : 2) * 100) / 100, .2, 1.2)); }, { bw: 128 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), w = S.W, A = { x: g.L + 64, w: w - g.L - 130 }, X = f => A.x + (f - .2) / 1 * A.w;
      return [{ id: 'fd', x: X(S.p.fd), y: 520, r: 26, axis: 'x', keep: true, tip: 'اسحب تردد الدفع', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'fd', clamp(Math.round(((d.x - A.x) / A.w + .2) * 100) / 100, .2, 1.2)) }].concat(D.chips(S, g)); },
    readings(S) { return [rd('التردد الطبيعي f₀', Q58.f(S.p.f0, 2) + ' Hz'), rd('تردد الدفع f', Q58.f(S.p.fd, 2) + ' Hz'), rd('السعة الحالية', Q58.f(S.pk * 180 / Math.PI, 1) + '°'), rd('الإخماد', S.p.hd ? 'عالٍ' : 'ضعيف')]; },
    record(S) { return { f: S.p.fd, A: +(S.pk * 180 / Math.PI).toFixed(1) }; },
    cols: [['f', 'f (Hz)'], ['A', 'السعة (°)']],
    explain(S) { const r = Math.abs(S.p.fd - S.p.f0) < .02; return Q26.ex(r ? 'الأرجوحة تتأرجح بسعة كبيرة تزداد مع كل دفعة.' : 'الأرجوحة تهتز بسعة صغيرة لأن الدفعات لا تتوافق مع حركتها.', 'عندما يتساوى تردد الدفع مع التردد الطبيعي تأتي كل دفعة في اللحظة التي يتحرك فيها الجسم باتجاهها، فتضاف الطاقة في كل دورة ولا يخسر منها إلا ما يضيع بالإخماد.', 'لا يُسمح للجنود بالسير بخطوات منتظمة على الجسور؛ فقد يتساوى تردد خطواتهم مع التردد الطبيعي للجسر فيهتز بسعة كبيرة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E3 — الضربات: شوكتان متقاربتان في التردد + مثال 6 (الشكلان 30 و 31، ص 175–176) =============== */
(() => {
  const E6 = { q: 'لإيجاد تردد شوكة رنانة طُرقت بالقرب من شوكة أخرى مهتزة ترددها 446 Hz فسُمعت 7 ضربات في الثانية. ما تردد الشوكة المجهولة؟', lines: ['fB = f1 − f2', 'إما أن تردد الشوكة المجهولة أكبر:', 'f1 = 446 + 7 = 453 Hz', 'أو أصغر:', 'f2 = 446 − 7 = 439 Hz', 'نثقل الشوكة المجهولة بقليل من الشمع فيقل ترددها', 'إذا قل عدد الضربات فالتردد 453 Hz', 'وإذا ازداد عدد الضربات فالتردد 439 Hz'] };
  const EXL = [['e6', 'مثال 6 ص 176', E6]];
  const D = { id: 'g11_o_beats', page: 175, fig: 'الشكلان 30 و 31 + مثال 6',
    desc: 'الضربات: عند اهتزاز شوكتين رنانتين ترددهما متقاربان (مثلاً 440 Hz و 438 Hz) معاً نسمع تغيراً دورياً في شدة الصوت بين القوي والضعيف. عدد الضربات في الثانية يساوي فرق الترددين fB = f1 − f2 ، وتردد الصوت المسموع f = (f1 + f2)/2. تدرك الأذن الضربات عندما يكون الفرق صغيراً (لا يزيد على نحو 7 Hz). وتستثمر الضربات في ضبط أوتار الآلات الموسيقية وتعيين تردد مجهول لشوكة بأخرى معلومة التردد.',
    tags: 'الضربات Beats شوكتان رنانتان fB=f1-f2 f=(f1+f2)/2 تغير دوري في الشدة تداخل بناء هدام تثقيل الشوكة شمع تردد مجهول ضبط الأوتار مثال 6 الشكل 30 الشكل 31 8-15',
    tools: ['شوكتان رنانتان 440 Hz و 438 Hz', 'مطرقة مطاطية', 'قطعة شمع'],
    steps: ['اترك f1 = 440 Hz و f2 = 438 Hz وراقب شكل الموجة المحصلة وعدّاد الشدة.', 'عُدّ الضربات في الثانية: تساوي f1 − f2.', 'قرّب f2 من f1: تبطؤ الضربات حتى تختفي عند التساوي.', 'اضغط «مثال 6» ثم «ثقّل المجهولة بالشمع» وراقب عدد الضربات.', 'فكّر: كيف تحصل على ضربات من شوكتين متساويتين في التردد؟'],
    concl: ['fB = f1 − f2 : عدد الضربات في الثانية يساوي فرق الترددين.', 'تردد الصوت المسموع f = (f1 + f2) / 2.', 'الضربات تداخل بناء وهدام يتناوبان في الزمن.', 'تثقيل الشوكة يقلل ترددها، وبه نعرف أي الترددين هو الصحيح.', 'نحصل على ضربات من شوكتين متساويتين بتثقيل إحداهما.'],
    laws: ['g11_l8_beat'],
    controls: [R('f1', 'تردد الشوكة الأولى f1', 430, 460, 440, 1, 'Hz'), R('f2', 'تردد الشوكة الثانية f2', 430, 460, 438, 1, 'Hz'), TG('env', 'غلاف الضربات', true, null, 'chart'), TG('snd', 'تشغيل الصوت', false, null, 'sound')],
    setup(S) { S.tau = 0; S.wax = 0; S.ex = 0; S.k = 0; S.cnt = 0; S.lastB = 0; S.hd = []; S.c0 = 0; },
    f2e(S) { return S.p.f2 - 3 * S.wax; },
    update(S, dt) { S.tau += dt; const fb = Math.abs(S.p.f1 - D.f2e(S)); if (fb > 0) { const nb = Math.floor(S.tau * fb); if (nb !== S.lastB) { S.lastB = nb; S.cnt++; } } },
    listen(S) { S.hd.forEach(Q25.stop); S.hd = [Q58.tone(S.p.f1, 4, { vol: .07 }), Q58.tone(D.f2e(S), 4, { vol: .07 })].filter(Boolean); },
    geo(S) { const g = Q58.geo(S); g.f1x = g.x0 + 70; g.f2x = g.x0 + 220; g.fy = 250; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), f1 = S.p.f1, f2 = D.f2e(S), fb = Math.abs(f1 - f2), fm = (f1 + f2) / 2, loud = fb ? Math.abs(Math.cos(Math.PI * fb * S.tau)) : 1;
      Q58.bg(ctx, w, h);
      const vib = Math.sin(S.tau * 60);
      Q58.forkBox(ctx, g.f1x, g.fy, .95, vib * 3, f1 + ' Hz'); Q58.forkBox(ctx, g.f2x, g.fy, .95, -vib * 3, S.ex ? '?' : f2 + ' Hz', { wax: S.wax });
      Q42.T(ctx, 'f1', g.f1x, g.fy + 50, { s: 13, w: 900, c: '#2563eb' }); Q42.T(ctx, S.ex ? 'المجهولة' : 'f2', g.f2x, g.fy + 50, { s: 13, w: 900, c: '#16a34a' });
      // loudness meter + ear
      const ex = g.x1 - 70; Q25.ear(ctx, ex + 10, 150, 16, -1);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(250,204,21,' + (.15 + .55 * loud) + ')'; ctx.beginPath(); ctx.arc(ex - 10, 150, 18 + 26 * loud, 0, TAU); ctx.fill(); ctx.fillStyle = '#e2e8f0'; rr(ctx, ex - 40, 214, 100, 14, 7); ctx.fill(); ctx.fillStyle = loud > .5 ? '#16a34a' : '#f59e0b'; rr(ctx, ex - 40, 214, 100 * loud, 14, 7); ctx.fill(); });
      Q42.T(ctx, 'شدة الصوت المسموع', ex + 10, 244, { s: 10.5, w: 800, c: '#334155' });
      Q42.T(ctx, 'عدّاد الضربات: ' + S.cnt, ex + 10, 270, { s: 11.5, w: 900, c: '#fff', bg: '#7c3aed' });
      // waves (Fig 31) — carrier slowed down for display
      const px0 = g.L + 30, pw = w - g.L - 50, py = 340; Q58.panel(ctx, px0, py, pw, 270, '', '#0f766e');
      Q42.T(ctx, 'الشكل 31 بإبطاء التردد للعرض', px0 + pw - 110, py + 14, { s: 10.5, w: 800, c: '#64748b' });
      const X0 = px0 + 20, X1 = px0 + pw - 70, NB = 2.2, U = x => (x - X0) / (X1 - X0), pB = x => fb ? Math.PI * NB * U(x) - Math.PI * fb * S.tau : 0, pc = x => TAU * 26 * U(x), ph1 = x => pc(x) + pB(x), ph2 = x => pc(x) - pB(x);
      const y1 = py + 52, y2 = py + 112, y3 = py + 200;
      Q58.wave(ctx, X0, X1, x => y1 - 16 * Math.sin(ph1(x)), '#2563eb', 1.8, null, 1); Q42.T(ctx, 'f1', X1 + 30, y1, { s: 12, w: 900, c: '#2563eb' });
      Q58.wave(ctx, X0, X1, x => y2 - 16 * Math.sin(ph2(x)), '#16a34a', 1.8, null, 1); Q42.T(ctx, 'f2', X1 + 30, y2, { s: 12, w: 900, c: '#16a34a' });
      Q58.wave(ctx, X0, X1, x => y3 - 24 * (Math.sin(ph1(x)) + Math.sin(ph2(x))), '#7c3aed', 1.8, null, 1); Q42.T(ctx, 'المحصلة', X1 + 30, y3, { s: 11.5, w: 900, c: '#7c3aed' });
      if (S.p.env && fb) { const en = x => 48 * Math.abs(Math.cos(pB(x))); Q58.wave(ctx, X0, X1, x => y3 - en(x), '#dc2626', 1.6, [5, 4]); Q58.wave(ctx, X0, X1, x => y3 + en(x), '#dc2626', 1.6, [5, 4]);
        const fr = ((fb * S.tau) % 1 + 1) % 1, pbx = (X1 - X0) / NB, xm = X0 + (fr > 0 ? 1 - fr : 0) * pbx;
        Q42.T(ctx, 'تداخل بناء', Math.max(xm, X0 + 34), y3 - 62, { s: 10.5, w: 900, c: '#16a34a', bg: 'rgba(255,255,255,.9)' }); const xn = xm + pbx / 2 < X1 - 30 ? xm + pbx / 2 : xm - pbx / 2; Q42.T(ctx, 'تداخل هدام', xn, y3 - 30, { s: 10.5, w: 900, c: '#dc2626', bg: 'rgba(255,255,255,.9)' });
        const xa = xm + pbx < X1 ? xm : xm - pbx; if (xa >= X0) Q58.dim(ctx, xa, y3 + 58, xa + pbx, y3 + 58, 'ضربة واحدة: 1/fB', '#7c3aed', { dy: 12 }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.e);
      if (!Q58.drawEx(ctx, S, EXL)) Q58.card(ctx, S, [{ t: 'fB = f1 − f2', mono: 1, c: '#7c3aed', w: 900 }, { t: 'fB = ' + f1 + ' − ' + f2 + ' = ' + fb + ' Hz', mono: 1 }, { t: 'f = (f1 + f2) / 2 = ' + Q58.f(fm, 1) + ' Hz', mono: 1, c: '#2563eb' }, { t: fb === 0 ? 'لا ضربات: الترددان متساويان' : fb <= 7 ? 'تدركها الأذن: ' + fb + ' ضربة في الثانية' : 'الفرق كبير: لا تميز الأذن الضربات', c: fb && fb <= 7 ? '#16a34a' : '#dc2626', w: 800 }, { t: 'تثقيل الشوكة بالشمع يقلل ترددها', c: '#b45309', w: 800 }, { t: 'تستعمل لضبط أوتار الآلات الموسيقية', c: '#64748b', s: 11.5 }], { title: 'الضربات' });
      Q42.banner(ctx, w, 'قرّب الترددين أو ثقّل الشوكة الثانية وراقب الضربات');
    },
    chips(S, g) { return { a: Q42.chips(S, 'bt', [['ls', '🔊 استمع 4 s'], ['wx', 'ثقّل الشوكة الثانية'], ['nw', 'أزل الشمع'], ['eq', 'f2 = f1']], g.h - 128, '', (S2, k) => { if (k === 'ls') D.listen(S2); else if (k === 'wx') { S2.wax = Math.min(S2.wax + 1, 4); S2.cnt = 0; } else if (k === 'nw') { S2.wax = 0; S2.cnt = 0; } else { setParam(S2, 'f2', S2.p.f1); S2.wax = 0; } if (S2.p.snd && k !== 'ls') D.listen(S2); }, { bw: 150 }),
      e: Q58.exChips(S, 'ex', g.h - 84, EXL, S2 => { setParam(S2, 'f1', 446); setParam(S2, 'f2', 453); S2.wax = 0; S2.cnt = 0; }, { bw: 160 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'f2', x: g.f2x, y: g.fy - 60, w: 60, h: 120, axis: 'y', keep: true, tip: 'اسحب لأعلى أو لأسفل لتغيير f2', idle: 'اسحب ✋', drag: (S2, d) => { if (S2._y0 == null) { S2._y0 = d.y; S2._f0 = S2.p.f2; } setParam(S2, 'f2', clamp(Math.round(S2._f0 + (S2._y0 - d.y) / 8), 430, 460)); }, up: S2 => { S2._y0 = null; S2.cnt = 0; } },
        { id: 'f1', x: g.f1x, y: g.fy - 60, w: 60, h: 120, axis: 'none', hint: false, tip: 'اطرق الشوكتين', click: S2 => { S2.tau = 0; S2.cnt = 0; if (S2.p.snd) D.listen(S2); } }].concat(C.a, C.e); },
    readings(S) { const f2 = D.f2e(S), fb = Math.abs(S.p.f1 - f2); return [rd('f1', S.p.f1 + ' Hz'), rd('f2', f2 + ' Hz'), rd('عدد الضربات في الثانية fB', fb + ' Hz'), rd('تردد الصوت المسموع', Q58.f((S.p.f1 + f2) / 2, 1) + ' Hz'), rd('كتل الشمع', String(S.wax))]; },
    record(S) { const f2 = D.f2e(S); return { f1: S.p.f1, f2, fb: Math.abs(S.p.f1 - f2) }; },
    cols: [['f1', 'f1 (Hz)'], ['f2', 'f2 (Hz)'], ['fb', 'fB (Hz)']],
    explain(S) { const fb = Math.abs(S.p.f1 - D.f2e(S)); return Q26.ex(fb ? 'شدة الصوت تعلو وتنخفض ' + fb + ' مرة في الثانية.' : 'الصوت ثابت الشدة ولا توجد ضربات.', 'الموجتان تبدآن متفقتين في الطور فتتقويان، ثم تتأخر إحداهما تدريجياً حتى تصبح قمة إحداهما مع قعر الأخرى فتضعفان، ثم تعودان متفقتين. يتكرر ذلك بعدد مرات يساوي فرق الترددين.', 'يضبط العازف وتر الآلة بمقارنته بشوكة رنانة حتى تختفي الضربات.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — نشاط: الموجات الواقفة في وتر + مثال 7 (الأشكال 32 و 33 و 34، ص 176–178) =============== */
(() => {
  const MU = .001; // kg/m
  const E7 = { q: 'وتر طوله 42 cm تولدت فيه موجة واقفة من ستة بطون، وانطلاق الموجة فيه 84 m/s. احسب الطول الموجي وتردد النغمتين التوافقيتين الأولى والثانية.', lines: ['L = n λ / 2', '0.42 = 6 × λ / 2', 'λ = 0.42 / 3 = 0.14 m', 'f = n v / 2L', 'f1 = 1 × 84 / (2 × 0.42) = 100 Hz', 'f2 = 2 × 84 / (2 × 0.42) = 200 Hz', 'f2 = 2 f1'] };
  const EXL = [['e7', 'مثال 7 ص 178', E7]];
  const D = { id: 'g11_o_stand', page: 176, fig: 'الأشكال 32 و 33 و 34 + مثال 7',
    desc: 'نشاط: نثبت أحد طرفي وتر بأحد فرعي شوكة رنانة ونمرر طرفه الآخر على بكرة ونعلق منه ثقلاً. عند اهتزاز الشوكة نتحكم بطول الوتر أو بالثقل حتى يهتز الوتر بعدد صحيح من أنصاف الطول الموجي. تتولد الموجة الواقفة من تراكب موجتين متساويتين في التردد والسعة تسيران باتجاهين متعاكسين. ينقسم الوتر إلى عقد سعتها صفر وبطون سعتها أكبر ما يمكن، والمسافة بين عقدتين متتاليتين λ/2. L = n λ/2 و f = n v / 2L ، والتردد الأساسي f1 = v / 2L.',
    tags: 'الموجات الواقفة نشاط شوكة رنانة وتر بكرة ثقل عقد بطون العقدة البطن L=nλ/2 f=nv/2L التردد الأساسي التوافقية الأولى الثانية الثالثة مثال 7 الأشكال 32 33 34 8-16',
    tools: ['شوكة رنانة كهربائية', 'وتر', 'بكرة', 'ثقل معلق', 'مسطرة مترية'],
    steps: ['غيّر طول الوتر بسحب البكرة، أو غيّر الثقل، حتى يهتز الوتر بسعة كبيرة.', 'عُدّ البطون n وقس المسافة بين عقدتين متتاليتين: تساوي λ/2.', 'اضغط «التوافقية الأولى» ثم الثانية ثم الثالثة وقارن مع الشكل 33.', 'اضغط «مثال 7» للحل: ستة بطون في وتر طوله 42 cm.'],
    concl: ['الموجة الواقفة: تراكب موجتين متساويتين في التردد والسعة متعاكستين في الاتجاه.', 'العقد سعتها وطاقتها صفر، والبطون في منتصف المسافة بين عقدتين سعتها أكبر ما يمكن.', 'L = n λ / 2 والمسافة بين عقدتين متتاليتين λ/2.', 'f = n v / 2L ، والتردد الأساسي f1 = v / 2L و f2 = 2 f1.', 'مثال 7: λ = 0.14 m و f1 = 100 Hz و f2 = 200 Hz.'],
    laws: ['g11_l8_stand', 'g11_l8_vstring'],
    controls: [R('f', 'تردد الشوكة f', 50, 700, 600, 5, 'Hz'), R('M', 'الثقل المعلق', 100, 2000, 720, 10, 'g'), R('Lc', 'طول الوتر L', 20, 90, 42, 1, 'cm'), TG('lab', 'تسمية العقد والبطون', true, null, 'labels')],
    setup(S) { S.ph = 0; S.amp = 0; S.Lv = 42; S.ex = 0; S.k = 0; },
    v(S) { return Math.sqrt(S.p.M / 1000 * 9.8 / MU); },
    nf(S) { return 2 * S.p.Lc / 100 * S.p.f / D.v(S); },
    update(S, dt) { const nf = D.nf(S), n = Math.max(1, Math.round(nf)), d = nf - n; S.ph += dt * TAU * 2.2; S.amp = Q58.ez(S.amp, (nf < .5 ? .06 : 1 / (1 + Math.pow(d * 14, 2))), dt, 4); S.Lv = Q58.ez(S.Lv, S.p.Lc, dt, 12); },
    geo(S) { const g = Q58.geo(S); g.ry = 432; g.xa = g.L + 96; g.sc = (S.W - 150 - g.xa) / 90; g.xb = g.xa + S.Lv * g.sc; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), nf = D.nf(S), n = Math.max(1, Math.round(nf)), v = D.v(S), lam = 2 * S.p.Lc / 100 / n, A = 40 * S.amp, cs = Math.cos(S.ph), Lp = g.xb - g.xa;
      Q58.bg(ctx, w, h);
      // Fig 33: harmonics 1..3
      const hx0 = g.x0 + 20, hx1 = g.x1 - 20; Q58.panel(ctx, g.x0, 70, g.x1 - g.x0, 270, 'الشكل 33: التوافقيات', '#7c3aed');
      [[1, 'λ = 2L', 'f = f1'], [2, 'λ = L', 'f = 2f1'], [3, 'λ = 2L/3', 'f = 3f1']].forEach((q, i) => { const y = 132 + i * 76, on = n === q[0] && S.amp > .5; Q58.line(ctx, [[hx0, y], [hx1 - 90, y]], 'rgba(15,23,42,.2)', 1);
        [1, -1].forEach(sg => Q58.wave(ctx, hx0, hx1 - 90, x => y - sg * 20 * Math.sin(q[0] * Math.PI * (x - hx0) / (hx1 - 90 - hx0)) * (on ? cs : 1), on ? '#dc2626' : '#7c3aed', on ? 2.6 : 1.6, sg < 0 && !on ? [4, 3] : null));
        Q42.T(ctx, q[1], hx1 - 44, y - 9, { s: 10.5, w: 900, c: '#334155' }); Q42.T(ctx, q[2], hx1 - 44, y + 9, { s: 10.5, w: 900, c: '#2563eb' }); });
      // apparatus
      const fx = g.xa - 78; Q58.table(ctx, g.L + 10, w - 20, g.ry + 140);
      K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, fx - 28, g.ry - 20, 22, 160, 4); ctx.fill(); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(fx - 17, g.ry + 20, 4, 0, TAU); ctx.fill(); });
      Q25.fork(ctx, fx, g.ry - 7, 70, 0, Math.sin(S.ph * 6) * 2, { label: S.p.f + '' });
      const px = g.xb + 14, pr = 14;
      K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px, g.ry + pr); ctx.lineTo(px + 20, g.ry + 140); ctx.stroke(); const pg = ctx.createRadialGradient(px - 4, g.ry - 4, 2, px, g.ry, pr); pg.addColorStop(0, '#f8fafc'); pg.addColorStop(1, '#64748b'); ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, g.ry + pr, pr, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.stroke(); });
      Q58.line(ctx, [[px + pr, g.ry + pr], [px + pr, g.ry + 82]], '#78350f', 2);
      Q42.weight(ctx, px + pr, g.ry + 92, 40, 18, null, ['#94a3b8', '#e2e8f0', '#475569']); Q42.T(ctx, S.p.M + ' g', px + pr + 44, g.ry + 92, { s: 11, w: 900, c: '#334155' });
      [1, -1].forEach(sg => Q58.wave(ctx, g.xa, g.xb, x => g.ry + sg * A * Math.sin(n * Math.PI * (x - g.xa) / Lp) * cs, sg > 0 ? '#b45309' : 'rgba(180,83,9,.25)', sg > 0 ? 3.4 : 1.6));
      Q58.line(ctx, [[g.xb, g.ry], [px, g.ry]], '#b45309', 3);
      if (S.p.lab && S.amp > .4) { for (let i = 0; i <= n; i++) { const x = g.xa + Lp * i / n; Q41.dot(ctx, x, g.ry, '#2563eb', 4); if (n <= 8) Q42.T(ctx, 'N', x, g.ry + 22, { s: 10.5, w: 900, c: '#2563eb' }); } if (n <= 8) for (let i = 0; i < n; i++) Q42.T(ctx, 'A', g.xa + Lp * (i + .5) / n, g.ry - A - 16, { s: 10.5, w: 900, c: '#dc2626' });
        Q58.dim(ctx, g.xa, g.ry + 44, g.xa + Lp / n, g.ry + 44, 'λ/2', '#7c3aed', { dy: 12 }); }
      Q58.dim(ctx, g.xa, g.ry - 68, g.xb, g.ry - 68, 'L = ' + S.p.Lc + ' cm', '#0f766e');
      Q42.T(ctx, S.amp > .5 ? 'موجة واقفة: ' + n + ' بطون' : 'لا موجة واقفة واضحة', (g.xa + g.xb) / 2, g.ry - 100, { s: 12, w: 900, c: '#fff', bg: S.amp > .5 ? '#16a34a' : '#64748b' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.e);
      if (!Q58.drawEx(ctx, S, EXL)) Q58.card(ctx, S, [{ t: 'v = √(T / μ) = ' + Q58.f(v, 1) + ' m/s', mono: 1, c: '#0f766e' }, { t: 'n = 2 L f / v = ' + Q58.f(nf, 2), mono: 1, c: '#7c3aed', w: 800 }, { t: S.amp > .5 ? 'عدد صحيح: يهتز الوتر بسعة كبيرة' : 'ليس عدداً صحيحاً: السعة صغيرة', c: S.amp > .5 ? '#16a34a' : '#dc2626', w: 800 }, { t: 'L = n λ / 2', mono: 1, c: '#2563eb', w: 900 }, { t: 'λ = ' + Q58.f(lam, 3) + ' m', mono: 1 }, { t: 'f1 = v / 2L = ' + Q58.f(v / (2 * S.p.Lc / 100), 1) + ' Hz', mono: 1, c: '#dc2626', w: 800 }, { t: 'العقد سعتها صفر والبطون سعتها أكبر ما يمكن', c: '#64748b', s: 11.5 }], { title: 'الموجات الواقفة' });
      Q42.banner(ctx, w, 'اسحب البكرة لتغيير طول الوتر حتى يرن');
    },
    setN(S, n) { const v = D.v(S); setParam(S, 'f', clamp(Math.round(n * v / (2 * S.p.Lc / 100) / 5) * 5, 50, 700)); },
    chips(S, g) { return { a: Q42.chips(S, 'hm', [['1', 'التوافقية الأولى'], ['2', 'الثانية'], ['3', 'الثالثة'], ['6', 'ستة بطون']], g.h - 128, '', (S2, k) => { if (+k === 1 || +k === 2 || +k === 3 || +k === 6) { if (S2.p.f < 100 && +k > 1) 0; D.setN(S2, +k); } }, { bw: 150 }),
      e: Q58.exChips(S, 'ex', g.h - 84, EXL, S2 => { setParam(S2, 'Lc', 42); setParam(S2, 'M', 720); setParam(S2, 'f', 600); }, { bw: 160 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'pul', x: g.xb + 14, y: g.ry + 14, r: 26, axis: 'x', keep: true, tip: 'اسحب البكرة', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'Lc', clamp(Math.round((d.x - 14 - g.xa) / g.sc), 20, 90)) }].concat(C.a, C.e); },
    readings(S) { const nf = D.nf(S), n = Math.max(1, Math.round(nf)), v = D.v(S); return [rd('انطلاق الموجة v', Q58.f(v, 1) + ' m/s'), rd('عدد البطون', S.amp > .5 ? String(n) : '—'), rd('الطول الموجي λ', Q58.f(2 * S.p.Lc / 100 / n, 3) + ' m'), rd('التردد الأساسي f1', Q58.f(v / (2 * S.p.Lc / 100), 1) + ' Hz')]; },
    record(S) { const nf = D.nf(S); return { L: S.p.Lc, f: S.p.f, n: +nf.toFixed(2) }; },
    cols: [['L', 'L (cm)'], ['f', 'f (Hz)'], ['n', '2Lf/v']],
    explain(S) { return Q26.ex(S.amp > .5 ? 'الوتر ينقسم إلى أجزاء تهتز بسعة كبيرة تفصلها نقاط ساكنة هي العقد.' : 'الوتر يهتز بسعة صغيرة ولا يظهر نمط ثابت.', 'الموجة الصادرة من الشوكة تنعكس عند البكرة وتتراكب مع الموجة الساقطة. عندما يكون طول الوتر عدداً صحيحاً من أنصاف الطول الموجي تتفق الموجات المنعكسة في الطور فيحدث رنين وتظهر العقد والبطون.', 'أوتار الغيتار والعود تهتز بموجات واقفة، ويغير العازف طول الجزء المهتز بأصابعه فيغير التردد.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G0 — خصائص الصوت: درجة الصوت ونوعه (الشكلان 36 و 37، ص 178–182) =============== */
(() => {
  const INS = { fork: ['شوكة رنانة', [1]], piano: ['بيانو', [1, .55, .32, .18, .1, .06]], guitar: ['غيتار', [1, .8, .2, .45, .12, .25, .08]] };
  const D = { id: 'g11_o_pitch', page: 178, fig: 'الشكلان 36 و 37',
    desc: 'خصائص الصوت ثلاث: علو الصوت ويرتبط بشدته (السعة)، ودرجة الصوت وتعتمد على التردد فالصوت الحاد تردده عالٍ (كصوت المرأة) والغليظ تردده واطئ (كصوت الرجل)، ونوع الصوت (الطابع) الذي تميز به الأذن نغمتين لهما الدرجة والشدة نفساهما من آلتين مختلفتين، مثل نغمة 256 Hz من شوكة رنانة ومن بيانو، ويعتمد على نوع المصدر وطريقة توليده.',
    tags: 'خصائص الصوت علو الصوت الشدة درجة الصوت Pitch التردد حاد غليظ نوع الصوت الطابع شوكة بيانو غيتار 256 Hz الشكل 36 الشكل 37 8-17',
    tools: ['راسم ذبذبات', 'مايكروفون', 'شوكة رنانة 256 Hz', 'بيانو', 'غيتار'],
    steps: ['قارن الموجتين في الشاشة اليسرى: الأعلى تردداً أكثر تزاحماً وأحدّ صوتاً.', 'غيّر السعة: يتغير علو الصوت ولا تتغير درجته.', 'في الشاشة اليمنى اختر الشوكة ثم البيانو ثم الغيتار: الدرجة نفسها 256 Hz لكن شكل الموجة مختلف.', 'شغّل الصوت واستمع للفرق.'],
    concl: ['علو الصوت يرتبط بشدته أي بسعة الاهتزاز.', 'درجة الصوت تعتمد على التردد: حاد تردده عالٍ وغليظ تردده واطئ.', 'نوع الصوت يعتمد على المصدر وطريقة توليده، ويظهر في شكل الموجة.'],
    laws: ['g11_l8_vfl'],
    controls: [R('fl', 'التردد الواطئ f1', 100, 300, 150, 10, 'Hz'), R('fh', 'التردد العالي f2', 300, 1000, 600, 10, 'Hz'), R('A', 'السعة', .2, 1, .8, .05, ''), TG('snd', 'تشغيل الصوت', false, null, 'sound')],
    setup(S) { S.ins = 'piano'; S.ph = 0; S.Av = .8; },
    update(S, dt) { S.ph += dt * 2; S.Av = Q58.ez(S.Av, S.p.A, dt, 8); },
    play(S, f, h) { if (S.p.snd) Q58.tone(f, 1.2, { vol: .1 * S.p.A, h }); },
    draw(ctx, w, h, S) {
      const g = Q58.geo(S), L = g.L, a = S.Av, H = INS[S.ins][1], nh = H.reduce((s, x) => s + x, 0);
      Q58.bg(ctx, w, h);
      // left: pitch
      const sx = g.x0, sw = g.x1 - g.x0, sh = 116;
      Q42.T(ctx, 'درجة الصوت: الشكل 36', sx + sw / 2, 80, { s: 12.5, w: 900, c: '#2563eb' });
      Q25.scope(ctx, sx, 94, sw, sh, [{ f: u => a * Math.sin(TAU * S.p.fl / 50 * u - S.ph), c: '#60a5fa' }], { title: 'f1 = ' + S.p.fl + ' Hz' });
      Q25.scope(ctx, sx, 94 + sh + 14, sw, sh, [{ f: u => a * Math.sin(TAU * S.p.fh / 50 * u - S.ph), c: '#f472b6' }], { title: 'f2 = ' + S.p.fh + ' Hz' });
      Q42.T(ctx, 'غليظ: تردد واطئ', sx + 70, 94 + sh - 12, { s: 10.5, w: 900, c: '#bfdbfe' }); Q42.T(ctx, 'حاد: تردد عالٍ', sx + 70, 94 + 2 * sh + 2, { s: 10.5, w: 900, c: '#fbcfe8' });
      // bottom: quality
      const qx = L + 24, qw = w - L - 48, qy = 372; Q42.T(ctx, 'نوع الصوت: الشكل 37 — النغمة 256 Hz من ' + INS[S.ins][0], qx + qw / 2, qy - 14, { s: 12.5, w: 900, c: '#0f766e' });
      Q25.scope(ctx, qx, qy, qw * .62, 200, [{ f: u => a * H.reduce((s, x, i) => s + x * Math.sin((i + 1) * (TAU * 4 * u - S.ph)), 0) / nh * 1.6, c: '#34d399', lw: 2.4 }], { title: INS[S.ins][0] });
      // harmonics bars
      const bx = qx + qw * .62 + 20, bw = qw * .38 - 20; Q58.panel(ctx, bx, qy, bw, 200, 'التوافقيات المكوِّنة', '#0f766e');
      H.forEach((v, i) => { const x = bx + 20 + i * (bw - 40) / 7, hh = 130 * v; K.raw(ctx, () => { ctx.fillStyle = i ? '#a78bfa' : '#2563eb'; rr(ctx, x, qy + 180 - hh, (bw - 40) / 7 - 6, hh, 3); ctx.fill(); }); Q42.T(ctx, String(256 * (i + 1)), x + ((bw - 40) / 7 - 6) / 2, qy + 190, { s: 8, w: 700, c: '#475569' }); });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.i); Q42.drawChips(ctx, C.s);
      Q58.card(ctx, S, [{ t: '1. علو الصوت: يرتبط بشدته أي بالسعة', c: '#dc2626', w: 800 }, { t: 'السعة الآن ' + Q58.f(S.p.A * 100, 0) + ' %', c: '#475569' }, { t: '2. درجة الصوت: تعتمد على التردد', c: '#2563eb', w: 800 }, { t: 'صوت المرأة حاد وصوت الرجل غليظ', c: '#475569', s: 11.5 }, { t: '3. نوع الصوت: يعتمد على المصدر وطريقة توليده', c: '#0f766e', w: 800 }, { t: 'تبطن قاعات الحفلات بمواد ماصة للصوت', c: '#64748b', s: 11 }], { title: 'خصائص الصوت' });
      Q42.banner(ctx, w, 'اختر الآلة وقارن شكل الموجة والدرجة');
    },
    chips(S, g) { return { i: Q42.chips(S, 'in', [['fork', 'شوكة رنانة'], ['piano', 'بيانو'], ['guitar', 'غيتار']], g.h - 128, S.ins, (S2, k) => { S2.ins = k; D.play(S2, 256, INS[k][1]); }, { bw: 150 }),
      s: Q42.chips(S, 'ls', [['lo', '🔊 الغليظ f1'], ['hi', '🔊 الحاد f2'], ['q', '🔊 النغمة 256 Hz']], g.h - 84, '', (S2, k) => { if (!S2.p.snd) setParam(S2, 'snd', true); if (k === 'lo') D.play(S2, S2.p.fl); else if (k === 'hi') D.play(S2, S2.p.fh); else D.play(S2, 256, INS[S2.ins][1]); }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = Q58.geo(S), C = D.chips(S, g);
      return [{ id: 'amp', x: g.x0 + (g.x1 - g.x0) / 2, y: 220, w: g.x1 - g.x0, h: 100, axis: 'y', keep: true, tip: 'اسحب لتغيير السعة', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'A', clamp(Math.round((1 - (d.y - 100) / 110) * 20) / 20, .2, 1)) }].concat(C.i, C.s); },
    readings(S) { return [rd('التردد الواطئ', S.p.fl + ' Hz'), rd('التردد العالي', S.p.fh + ' Hz'), rd('الآلة', INS[S.ins][0]), rd('السعة', Q58.f(S.p.A * 100, 0) + ' %')]; },
    explain(S) { return Q26.ex('النغمة 256 Hz من ' + INS[S.ins][0] + ' لها الزمن الدوري نفسه لكن شكل موجتها مختلف.', 'كل آلة تولد مع التردد الأساسي ترددات توافقية بنسب مختلفة، فتختلف شكل الموجة المحصلة، وهذا ما تميزه الأذن على أنه نوع الصوت أو طابعه.', 'نعرف المتكلم على الهاتف من نوع صوته حتى لو قال الكلمة نفسها بالدرجة والعلو نفسيهما.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G1 — شدة الصوت ومستوى الشدة بالديسبل + مثال 8 (الشكل 35، الجدول 2، ص 179–183) =============== */
(() => {
  const T2 = [[150, 'طائرة نفاثة قريبة'], [120, 'صفارة إنذار'], [100, 'مترو الأنفاق'], [80, 'المرور المزدحم'], [70, 'المكنسة الكهربائية'], [50, 'المحادثات الطبيعية'], [40, 'أزيز البعوض'], [30, 'الهمس'], [10, 'حفيف الأوراق'], [0, 'حد السمع']];
  const E8 = { q: 'آلتان متماثلتان على البعد نفسه من عامل، شدة الصوت الواصلة من كل منهما 2×10⁻⁷ W/m². احسب مستوى الشدة من آلة واحدة ثم من الآلتين معاً.', lines: ['LI = 10 log(I / I0)', 'LI = 10 log(2×10⁻⁷ / 10⁻¹²)', 'LI = 10 log(2×10⁵) = 53 dB', 'الآلتان معاً: I = 4×10⁻⁷ W/m²', 'LI = 10 log(4×10⁵) = 56 dB', 'مضاعفة الشدة تزيد المستوى 3 dB فقط'] };
  const EV = { q: 'فكّر ص 183: عازف كمان منفرد ينضم إليه تسعة عازفين بالشدة نفسها. كم يزداد مستوى الشدة؟', lines: ['الشدة تصبح 10 أضعاف', 'ΔL = 10 log(10) = 10 dB', 'انضمام عشرة آخرين يضاعف الشدة فقط', 'ΔL = 10 log(2) = 3 dB'] };
  const EXL = [['e8', 'مثال 8 ص 182', E8], ['ev', 'فكّر: العازفون', EV]];
  const D = { id: 'g11_o_level', page: 179, fig: 'الشكل 35 + الجدول 2 + مثال 8',
    desc: 'شدة الصوت المعدل الزمني للطاقة الصوتية لوحدة المساحة العمودية على اتجاه الانتشار: I = P / A ، ولمصدر نقطي A = 4πr² فتقل الشدة عكسياً مع مربع البعد (1 ، 1/4 ، 1/9 ، 1/16 عند 1 و 2 و 3 و 4 m). وتعتمد الشدة أيضاً على سعة المصدر وتردده ومساحة الجسم المهتز وكثافة الوسط. وبسبب استجابة الأذن اللوغاريتمية نقيس مستوى الشدة بالديسبل: LI = 10 log(I/I0) حيث عتبة السمع I0 = 10⁻¹² W/m² وعتبة الألم 1 W/m² أي 120 dB.',
    tags: 'شدة الصوت I=P/A مصدر نقطي 4πr² التربيع العكسي مستوى الشدة ديسبل dB LI=10log(I/I0) عتبة السمع عتبة الألم 120 dB الجدول 2 مثال 8 العازفون علو الصوت الشكل 35 8-17 8-18',
    tools: ['مصدر صوتي', 'مقياس مستوى الصوت', 'شريط قياس'],
    steps: ['اسحب مقياس مستوى الصوت مبتعداً عن المصدر: كيف تتغير الشدة والمستوى؟', 'ضاعف البعد: تقل الشدة إلى الربع.', 'اضغط «مصدران» ثم «عشرة مصادر»: كم ديسبل يزداد المستوى؟', 'قارن المستوى بأمثلة الجدول 2، واضغط «مثال 8».'],
    concl: ['I = P / A = P / 4πr² : الشدة تتناسب عكسياً مع مربع البعد.', 'LI = 10 log(I / I0) ، و I0 = 10⁻¹² W/m² عتبة السمع (0 dB).', 'عتبة الألم 1 W/m² أي 120 dB.', 'مضاعفة الشدة تزيد المستوى 3 dB ، وزيادتها 10 مرات تزيده 10 dB.'],
    laws: ['g11_l8_int', 'g11_l8_db'],
    controls: [R('P', 'قدرة المصدر P', .01, 15, 1, .01, 'W'), R('n', 'عدد المصادر المتماثلة', 1, 10, 1, 1, ''), R('r', 'البعد عن المصدر r', 1, 10, 2, .1, 'm'), TG('sq', 'مربعات الشكل 35', true, null, 'grid')],
    setup(S) { S.rv = 2; S.ph = 0; S.ex = 0; S.k = 0; S.Lv = 0; },
    I(S) { return S.p.n * S.p.P / (4 * Math.PI * S.p.r * S.p.r); },
    Ld(S) { return 10 * Math.log10(D.I(S) / 1e-12); },
    update(S, dt) { S.rv = Q58.ez(S.rv, S.p.r, dt, 10); S.ph += dt * 60; S.Lv = Q58.ez(S.Lv, D.Ld(S), dt, 6); },
    geo(S) { const g = Q58.geo(S); g.sx = g.x0 + 40; g.sy = 210; g.ppm = (g.x1 - 20 - g.sx) / 10; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), I = D.I(S), Ld = S.Lv, mx = g.sx + S.rv * g.ppm;
      Q58.bg(ctx, w, h);
      // wavefront arcs
      K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.sx, 70, g.x1 - g.sx, 270); ctx.clip(); for (let k = 0; k < 12; k++) { const r = (S.ph + k * 40) % 480; ctx.strokeStyle = 'rgba(37,99,235,' + clamp(.5 - r / 1000, .05, .5) + ')'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.sx, g.sy, r, -.7, .7); ctx.stroke(); } ctx.restore(); });
      if (S.p.sq) [1, 2, 3, 4].forEach(r => { const x = g.sx + r * g.ppm, s = 14 * r; K.raw(ctx, () => { ctx.strokeStyle = 'rgba(124,58,237,.6)'; ctx.fillStyle = 'rgba(167,139,250,.12)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - s * .35, g.sy - s); ctx.lineTo(x + s * .35, g.sy - s * .8); ctx.lineTo(x + s * .35, g.sy + s * 1.2); ctx.lineTo(x - s * .35, g.sy + s); ctx.closePath(); ctx.fill(); ctx.stroke(); }); Q42.T(ctx, ['1', '1/4', '1/9', '1/16'][r - 1], x, g.sy + 14 * r + 26, { s: 10.5, w: 900, c: '#7c3aed' }); });
      for (let i = 0; i < Math.min(S.p.n, 10); i++) Q25.speaker(ctx, g.sx - 4, g.sy + (i - (Math.min(S.p.n, 10) - 1) / 2) * 7, .34, 1, Math.sin(S.ph * .7) * 2);
      // ruler
      K.raw(ctx, () => { ctx.fillStyle = '#fef3c7'; rr(ctx, g.sx, 316, g.ppm * 10, 18, 3); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; ctx.stroke(); for (let m = 0; m <= 10; m++) { ctx.beginPath(); ctx.moveTo(g.sx + m * g.ppm, 316); ctx.lineTo(g.sx + m * g.ppm, 326); ctx.stroke(); } });
      for (let m = 0; m <= 10; m += 2) Q42.T(ctx, m + '', g.sx + m * g.ppm, 342, { s: 9.5, w: 800, c: '#78350f' });
      Q58.meter(ctx, mx - 36, g.sy - 46, Q58.f(Ld, 0) + ' dB', Ld > 120 ? '#f87171' : '#4ade80');
      Q58.dim(ctx, g.sx, 300, mx, 300, 'r = ' + Q58.f(S.rv, 1) + ' m', '#0f766e', { dy: -12 });
      // dB scale (Table 2)
      const bx = g.L + 40, bw = w - g.L - 80, by = 470, X = L => bx + L / 150 * bw;
      Q58.panel(ctx, g.L + 16, 370, w - g.L - 32, 240, 'الجدول 2: مستويات شدة بعض الأصوات بالديسبل', '#0f766e');
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(bx, 0, bx + bw, 0); gg.addColorStop(0, '#22c55e'); gg.addColorStop(.55, '#facc15'); gg.addColorStop(.8, '#f97316'); gg.addColorStop(1, '#dc2626'); ctx.fillStyle = gg; rr(ctx, bx, by, bw, 16, 8); ctx.fill(); });
      T2.forEach((q, i) => { const x = X(q[0]), up = i % 2 === 0; Q58.line(ctx, [[x, by + (up ? 0 : 16)], [x, by + (up ? -22 : 40)]], 'rgba(15,23,42,.35)', 1); Q42.T(ctx, q[1], x, by + (up ? -32 : 52), { s: 9.5, w: 800, c: '#334155' }); Q42.T(ctx, q[0] + '', x, by + (up ? -48 : 68), { s: 9.5, w: 900, c: '#0f766e' }); });
      const xL = X(clamp(Ld, 0, 150)); K.raw(ctx, () => { ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.moveTo(xL, by + 18); ctx.lineTo(xL - 8, by + 32); ctx.lineTo(xL + 8, by + 32); ctx.closePath(); ctx.fill(); });
      Q42.T(ctx, 'المستوى الآن ' + Q58.f(Ld, 1) + ' dB', clamp(xL, bx + 60, bx + bw - 60), by + 100, { s: 12, w: 900, c: '#fff', bg: Ld >= 120 ? '#dc2626' : '#0f766e' });
      Q42.T(ctx, 'عتبة الألم 120 dB', X(120), by + 130, { s: 10, w: 800, c: '#dc2626' }); Q42.T(ctx, 'عتبة السمع 0 dB', X(0) + 30, by + 130, { s: 10, w: 800, c: '#16a34a' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.e);
      if (!Q58.drawEx(ctx, S, EXL)) Q58.card(ctx, S, [{ t: 'I = n P / 4πr²', mono: 1, c: '#2563eb', w: 900 }, { t: 'I = ' + Q58.sci(I, 3) + ' W/m²', mono: 1 }, { t: 'LI = 10 log(I / I0)', mono: 1, c: '#0f766e', w: 900 }, { t: 'LI = ' + Q58.f(Ld, 1) + ' dB', mono: 1, c: '#dc2626', w: 900 }, { t: 'I0 = 10⁻¹² W/m²', mono: 1, c: '#475569' }, { t: 'ضعف البعد يقلل الشدة إلى الربع', c: '#7c3aed', w: 800 }, { t: 'تعتمد الشدة على البعد وسعة المصدر وتردده ومساحته وكثافة الوسط', c: '#64748b', s: 11 }], { title: 'شدة الصوت ومستواها' });
      Q42.banner(ctx, w, 'اسحب مقياس مستوى الصوت مبتعداً عن المصدر');
    },
    chips(S, g) { return { a: Q42.chips(S, 'ns', [['1', 'مصدر واحد'], ['2', 'مصدران'], ['10', 'عشرة مصادر'], ['d', 'ضاعف البعد']], g.h - 128, String(S.p.n), (S2, k) => { if (k === 'd') setParam(S2, 'r', Math.min(10, S2.p.r * 2)); else setParam(S2, 'n', +k); }, { bw: 150 }),
      e: Q58.exChips(S, 'ex', g.h - 84, EXL, (S2, k) => setParam(S2, 'n', k === 'e8' ? 2 : 10), { bw: 160 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'met', x: g.sx + S.rv * g.ppm, y: g.sy, w: 76, h: 96, axis: 'x', keep: true, tip: 'اسحب المقياس', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'r', clamp(Math.round((d.x - g.sx) / g.ppm * 10) / 10, 1, 10)) }].concat(C.a, C.e); },
    readings(S) { return [rd('البعد r', Q58.f(S.p.r, 1) + ' m'), rd('شدة الصوت I', Q58.sci(D.I(S), 3) + ' W/m²'), rd('مستوى الشدة LI', Q58.f(D.Ld(S), 1) + ' dB'), rd('عدد المصادر', String(S.p.n))]; },
    record(S) { return { r: S.p.r, I: +D.I(S).toExponential(3), L: +D.Ld(S).toFixed(1) }; },
    cols: [['r', 'r (m)'], ['I', 'I (W/m²)'], ['L', 'LI (dB)']],
    explain(S) { return Q26.ex('كلما ابتعد المقياس قلت قراءته، لكن مضاعفة البعد تنقص المستوى نحو 6 dB فقط.', 'الطاقة الصوتية تتوزع على سطح كرة مساحتها 4πr² ، فإذا تضاعف البعد تضاعف نصف القطر وزادت المساحة أربع مرات فتقل الشدة إلى الربع. والأذن تستجيب لوغاريتمياً لذلك يقاس المستوى بالديسبل.', 'يرتدي العاملون قرب الطائرات النفاثة واقيات للأذن لأن المستوى هناك يتجاوز عتبة الألم.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G2 — الموجات فوق السمعية: السونار والخفاش (ص 183–184) =============== */
(() => {
  const D = { id: 'g11_o_sonar', page: 183, fig: 'تطبيقات الموجات فوق السمعية + الشكل 39',
    desc: 'الموجات فوق السمعية موجات ميكانيكية تنتشر بسرعة الصوت لكن ترددها أكبر من 20000 Hz. يرسل الخفاش موجات فوق سمعية ويستقبل المنعكسة منها ليحدد مواقع العوائق، وتقاس أعماق البحار بإرسال نبضة نحو القاع وقياس زمن الذهاب والإياب ومعرفة سرعتها في الماء: العمق = v t / 2. ومن تطبيقاتها الفحوص الطبية بدلاً من الأشعة السينية، وكشف عيوب المصنوعات، والتعقيم، وتحطيم حصى الكلى.',
    tags: 'الموجات فوق السمعية Ultrasonic أكبر من 20000 Hz الخفاش السونار قياس أعماق البحار الصدى زمن الذهاب والإياب d=vt/2 الفحوص الطبية كشف العيوب التعقيم حصى الكلى الدولفين الطول الموجي القصير 8-19',
    tools: ['جهاز سونار', 'ساعة توقيت إلكترونية'],
    steps: ['اضغط «أرسل نبضة» وراقب النبضة تذهب إلى القاع وترتد.', 'اقرأ الزمن الكلي t واحسب العمق d = v t / 2.', 'اسحب قاع البحر لتغيير العمق وكرر.', 'بدّل إلى «الخفاش» في الهواء، وغيّر التردد: لماذا يفضل التردد العالي؟'],
    concl: ['الموجات فوق السمعية ترددها أكبر من 20000 Hz وسرعتها سرعة الصوت في الوسط.', 'العمق أو البعد = v t / 2 لأن النبضة تقطع المسافة ذهاباً وإياباً.', 'التردد العالي يعني طولاً موجياً قصيراً فيكشف أجساماً صغيرة بدقة أكبر.'],
    laws: ['g11_l8_sonar'],
    controls: [R('d', 'العمق أو البعد', 10, 100, 60, 1, '%'), R('f', 'تردد الموجات', 25, 200, 50, 5, 'kHz'), TG('sea', 'ماء البحر', true, null, 'water')],
    setup(S) { S.u = -1; S.tm = 0; S.res = 0; S.dv = 60; },
    env(S) { return S.p.sea ? { v: 1533, D: 4000 * S.p.d / 100, u: 'm' } : { v: 343, D: 30 * S.p.d / 100, u: 'm' }; },
    update(S, dt) { S.dv = Q58.ez(S.dv, S.p.d, dt, 10); if (S.u >= 0) { S.u += dt / 1.6; if (S.u >= 2) { S.u = -1; const E = D.env(S); S.res = 2 * E.D / E.v; } } },
    geo(S) { const g = Q58.geo(S); g.cx = (g.x0 + g.x1) / 2; g.sy = 130; g.by = g.sy + 40 + S.dv / 100 * 420; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), E = D.env(S), lam = E.v / (S.p.f * 1000), sea = S.p.sea;
      Q58.bg(ctx, w, h);
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.sy, 0, 620); if (sea) { gg.addColorStop(0, '#38bdf8'); gg.addColorStop(1, '#0c4a6e'); } else { gg.addColorStop(0, '#1e1b4b'); gg.addColorStop(1, '#312e81'); } ctx.fillStyle = gg; ctx.fillRect(g.L + 10, g.sy, w - g.L - 20, 620 - g.sy);
        ctx.fillStyle = sea ? '#a16207' : '#57534e'; ctx.beginPath(); ctx.moveTo(g.L + 10, 620); for (let x = g.L + 10; x <= w - 10; x += 20) ctx.lineTo(x, g.by + 8 * Math.sin(x * .05)); ctx.lineTo(w - 10, 620); ctx.closePath(); ctx.fill(); });
      if (sea) K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.moveTo(g.cx - 70, g.sy - 22); ctx.lineTo(g.cx + 70, g.sy - 22); ctx.lineTo(g.cx + 50, g.sy + 6); ctx.lineTo(g.cx - 50, g.sy + 6); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.fillRect(g.cx - 70, g.sy - 22, 140, 6); ctx.fillStyle = '#f8fafc'; ctx.fillRect(g.cx - 20, g.sy - 48, 40, 26); ctx.fillStyle = '#334155'; ctx.fillRect(g.cx - 6, g.sy + 4, 12, 8); });
      else K.raw(ctx, () => { ctx.save(); ctx.translate(g.cx, g.sy); ctx.fillStyle = '#0f172a'; const fl = Math.sin(S.u * 30) * 8; ctx.beginPath(); ctx.moveTo(0, -6); ctx.quadraticCurveTo(-30, -26 - fl, -60, -10); ctx.quadraticCurveTo(-40, -4, -30, 4); ctx.quadraticCurveTo(-14, -2, 0, 8); ctx.quadraticCurveTo(14, -2, 30, 4); ctx.quadraticCurveTo(40, -4, 60, -10); ctx.quadraticCurveTo(30, -26 - fl, 0, -6); ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, 9, 0, TAU); ctx.fill(); ctx.restore(); });
      // pulse
      if (S.u >= 0) { const down = S.u < 1, y = down ? g.sy + 10 + (g.by - g.sy - 10) * S.u : g.by - (g.by - g.sy - 10) * (S.u - 1);
        K.raw(ctx, () => { ctx.strokeStyle = down ? '#fde047' : '#f472b6'; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(g.cx, y + (down ? -k * 8 : k * 8), 36 - k * 6, down ? .3 : Math.PI + .3, down ? Math.PI - .3 : TAU - .3); ctx.stroke(); } }); }
      Q58.dim(ctx, g.cx + 110, g.sy + 10, g.cx + 110, g.by, 'd = ' + Q58.f(E.D, 0) + ' m', '#fde047', { dx: 46, dy: 0 });
      Q42.T(ctx, sea ? 'قاع البحر' : 'جدار الكهف', g.cx - 120, g.by + 24, { s: 12, w: 900, c: '#fff' });
      // timer tiles
      const tt = S.u >= 0 ? 2 * E.D / E.v * S.u / 2 : S.res; Q58.tile(ctx, g.L + 24, 520, 150, 56, 'الزمن t', tt ? Q58.f(tt * (tt < 1 ? 1000 : 1), tt < 1 ? 1 : 3) + (tt < 1 ? ' ms' : ' s') : '—', '#7c3aed');
      Q58.tile(ctx, g.L + 184, 520, 160, 56, 'العمق d = v t / 2', S.res && S.u < 0 ? Q58.f(E.v * S.res / 2, 0) + ' m' : '—', '#dc2626');
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      Q58.card(ctx, S, [{ t: sea ? 'السونار: سرعة الموجات في ماء البحر 1533 m/s' : 'الخفاش: سرعة الصوت في الهواء 343 m/s', c: '#0f766e', w: 800 }, { t: 'd = v t / 2', mono: 1, c: '#dc2626', w: 900 }, { t: 'f = ' + S.p.f + ' kHz', mono: 1, c: '#2563eb' }, { t: 'λ = v / f = ' + Q58.f(lam * 1000, 1) + ' mm', mono: 1, c: '#2563eb', w: 800 }, { t: 'التردد العالي: طول موجي قصير ودقة أكبر في تحديد الموقع', c: '#7c3aed', s: 11.5 }, { t: 'تطبيقات: الفحوص الطبية، كشف عيوب المصنوعات، التعقيم وقتل البكتريا، تخريم الزجاج، تحطيم حصى الكلى', c: '#64748b', s: 11 }], { title: 'الموجات فوق السمعية' });
      Q42.banner(ctx, w, 'أرسل نبضة وقس زمن عودة الصدى');
    },
    chips(S, g) { return Q42.chips(S, 'so', [['go', '📡 أرسل نبضة'], ['sea', 'سفينة: سونار'], ['bat', 'خفاش في كهف']], g.h - 84, S.p.sea ? 'sea' : 'bat', (S2, k) => { if (k === 'go') { S2.u = 0; S2.res = 0; } else { setParam(S2, 'sea', k === 'sea'); S2.res = 0; S2.u = -1; } }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      return [{ id: 'bed', x: g.cx - 120, y: g.by + 10, w: 160, h: 40, axis: 'y', keep: true, tip: 'اسحب القاع', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'd', clamp(Math.round((d.y - 10 - g.sy - 40) / 420 * 100), 10, 100)); S2.res = 0; } }].concat(D.chips(S, g)); },
    readings(S) { const E = D.env(S); return [rd('الوسط', S.p.sea ? 'ماء البحر' : 'الهواء'), rd('السرعة v', E.v + ' m/s'), rd('العمق أو البعد', Q58.f(E.D, 0) + ' m'), rd('زمن الذهاب والإياب', Q58.f(2 * E.D / E.v, 3) + ' s'), rd('الطول الموجي', Q58.f(E.v / S.p.f, 1) + ' mm')]; },
    record(S) { const E = D.env(S); return { d: +E.D.toFixed(0), t: +(2 * E.D / E.v).toFixed(3) }; },
    cols: [['d', 'd (m)'], ['t', 't (s)']],
    explain(S) { return Q26.ex('النبضة تنزل إلى ' + (S.p.sea ? 'القاع' : 'الجدار') + ' ثم يعود صداها، ويقاس الزمن الكلي للرحلتين.', 'تقطع النبضة المسافة مرتين، لذا البعد = v t / 2. وللموجات فوق السمعية طول موجي قصير فتنعكس حتى عن الأجسام الصغيرة ولا تنتشر كثيراً، فتعطي صورة دقيقة.', 'يستعمل الأطباء الموجات فوق السمعية لتصوير الجنين لأنها غير ضارة مثل الأشعة السينية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== H1 — تأثير دوبلر + مثال 9 + مثال 10 (الأشكال 40 و 41 و 42، ص 185–189) =============== */
(() => {
  const E9 = { q: 'سيارة تسير بسرعة 72 km/h نحو رجل واقف على الرصيف ثم تبتعد عنه، وتصدر صوتاً تردده 644 Hz. احسب التردد والطول الموجي اللذين يدركهما الرجل علماً أن سرعة الصوت 342 m/s', lines: ['vs = 72 × 1000 / 3600 = 20 m/s', 'نحو الرجل: vs = +20 m/s', 'f′ = (342 − 0) / (342 − 20) × 644', 'f′ = 684 Hz', 'λ′ = 342 / 684 = 0.5 m', 'بعيداً عنه: vs = −20 m/s', 'f′ = 342 / (342 + 20) × 644 = 608.42 Hz', 'λ′ = 342 / 608.42 = 0.5621 m'] };
  const E10 = { q: 'راكب دراجة يسير بسرعة 5 m/s نحو مصدر صوت ساكن تردده 1035 Hz ثم يبتعد عنه. احسب التردد والطول الموجي اللذين يدركهما علماً أن سرعة الصوت 345 m/s', lines: ['نحو المصدر: vo = −5 m/s', 'f′ = (345 + 5) / 345 × 1035', 'f′ = 1050 Hz', 'المصدر ساكن فالطول الموجي لا يتغير:', 'λ′ = λ = 345 / 1035 = 0.33 m', 'بعيداً عنه: vo = +5 m/s', 'f′ = (345 − 5) / 345 × 1035 = 1020 Hz', 'λ′ = 0.33 m'] };
  const EXL = [['e9', 'مثال 9 ص 187', E9], ['e10', 'مثال 10 ص 188', E10]];
  const CV = 120, BOOST = 4; // px/s for sound on screen; source speed exaggerated
  const D = { id: 'g11_o_doppler', page: 185, fig: 'الأشكال 40 و 41 و 42 + مثال 9 + مثال 10',
    desc: 'تأثير دوبلر: تغير التردد الذي يدركه السامع عن تردد المصدر بسبب حركة المصدر أو السامع. عندما يقترب المصدر تتقارب الجبهات أمامه فيقصر الطول الموجي ويرتفع التردد المسموع f′ = v f /(v − vs) ، وعندما يبتعد تتباعد الجبهات خلفه فينخفض f′ = v f /(v + vs). العلاقة العامة f′ = (v − vo) f / (v − vs) والاتجاه من المصدر نحو السامع موجب: vs موجبة عند اقتراب المصدر، و vo سالبة عند اقتراب السامع.',
    tags: 'تأثير دوبلر Doppler effect المصدر المتحرك السامع المتحرك f′=(v−vo)/(v−vs)f الجبهات الموجية تقارب تباعد سيارة إطفاء منبه الطول الموجي الظاهري مقياس جريان الدم مثال 9 مثال 10 الأشكال 40 41 42 8-20',
    tools: ['مصدر صوت متحرك', 'سامع'],
    steps: ['شغّل السيارة نحو السامع A: لاحظ تقارب الجبهات أمامها وارتفاع f′ عند A.', 'لاحظ السامع B خلف السيارة: تتباعد الجبهات وينخفض التردد.', 'اختر «السامع يتحرك» وحرّك الدراجة نحو المصدر الساكن: يرتفع التردد ولا يتغير الطول الموجي.', 'اضغط «مثال 9» و«مثال 10» للحل خطوة خطوة.'],
    concl: ['f′ = (v − vo) f / (v − vs) ، والاتجاه من المصدر نحو السامع موجب.', 'اقتراب المصدر أو السامع يرفع التردد المسموع، وابتعادهما يخفضه.', 'حركة المصدر تغير الطول الموجي، أما حركة السامع فتغير التردد فقط.', 'مثال 9: 684 Hz و 608.42 Hz ، مثال 10: 1050 Hz و 1020 Hz.'],
    laws: ['g11_l8_dopp'],
    controls: [R('vs', 'سرعة المصدر vs', -40, 40, 20, 1, 'm/s'), R('vo', 'سرعة السامع vo', -20, 20, 0, 1, 'm/s'), R('f', 'تردد المصدر f', 200, 1500, 644, 1, 'Hz'), R('v', 'سرعة الصوت v', 330, 350, 342, 1, 'm/s')],
    setup(S) { S.md = 'src'; S.sx = 0; S.tx = 0; S.hold = 0; S.em = []; S.clk = 0; S.te = 0; S.ox = 0; S.ex = 0; S.k = 0; },
    pn(n) { return n < 0 ? '(' + Q58.f(n) + ')' : Q58.f(n); },
    fp(S, side) { const v = S.p.v, vs = S.md === 'src' ? S.p.vs * side : 0, vo = S.md === 'obs' ? S.p.vo * side : S.p.vo * side; return (v - vo) / (v - vs) * S.p.f; },
    update(S, dt) { const W = S.W || 820, xmin = -((W - 140) / 2) + 40, xmax = (W - 140) / 2 - 40; S.clk += dt;
      if (S.md === 'src') { if (S.hold) S.sx = Q58.ez(S.sx, S.tx, dt, 12); else { S.sx += S.p.vs / S.p.v * CV * BOOST * dt; if (S.sx > xmax || S.sx < xmin) { S.sx = S.p.vs >= 0 ? xmin : xmax; S.em = []; } } }
      else { S.sx = Q58.ez(S.sx, 0, dt, 4); S.ox += S.p.vo / S.p.v * CV * BOOST * dt; if (S.ox > 120 || S.ox < -220) { S.ox = S.p.vo >= 0 ? -220 : 120; } }
      S.te += dt; if (S.te > .32) { S.te = 0; S.em.push({ x: S.sx, t: S.clk }); } while (S.em.length && (S.clk - S.em[0].t) * CV > 900) S.em.shift(); },
    geo(S) { const g = Q58.geo(S); g.cx = (g.L + S.W) / 2; g.ry = 470; g.ax = S.W - 70; g.bx = g.L + 50; return g; },
    car(ctx, x, y, dir) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1); const bg = ctx.createLinearGradient(0, -34, 0, 0); bg.addColorStop(0, '#f87171'); bg.addColorStop(1, '#991b1b'); ctx.fillStyle = bg; rr(ctx, -46, -30, 92, 26, 6); ctx.fill(); rr(ctx, -30, -46, 50, 20, 6); ctx.fill(); ctx.fillStyle = '#bfdbfe'; rr(ctx, -24, -42, 18, 13, 3); ctx.fill(); rr(ctx, -2, -42, 18, 13, 3); ctx.fill(); ctx.fillStyle = '#fbbf24'; ctx.fillRect(-8, -52, 14, 6); ctx.fillStyle = '#111827'; [-28, 28].forEach(wx => { ctx.beginPath(); ctx.arc(wx, -2, 10, 0, TAU); ctx.fill(); }); ctx.fillStyle = '#9ca3af'; [-28, 28].forEach(wx => { ctx.beginPath(); ctx.arc(wx, -2, 4, 0, TAU); ctx.fill(); }); ctx.restore(); }); },
    bike(ctx, x, y) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 3; [-16, 16].forEach(wx => { ctx.beginPath(); ctx.arc(wx, -12, 12, 0, TAU); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(-16, -12); ctx.lineTo(-2, -30); ctx.lineTo(16, -12); ctx.moveTo(-2, -30); ctx.lineTo(10, -32); ctx.stroke(); ctx.fillStyle = '#2563eb'; rr(ctx, -10, -60, 14, 26, 5); ctx.fill(); ctx.fillStyle = '#f2c29b'; ctx.beginPath(); ctx.arc(-3, -68, 8, 0, TAU); ctx.fill(); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), sxp = g.cx + S.sx, src = S.md === 'src', fA = D.fp(S, 1), fB = D.fp(S, -1), v = S.p.v;
      Q58.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.L + 10, g.ry, w - g.L - 20, 40); ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.setLineDash([22, 18]); ctx.beginPath(); ctx.moveTo(g.L + 10, g.ry + 20); ctx.lineTo(w - 10, g.ry + 20); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#86efac'; ctx.fillRect(g.L + 10, g.ry + 40, w - g.L - 20, 12); });
      K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.L + 10, 344, w - g.L - 20, 280); ctx.clip(); ctx.strokeStyle = 'rgba(37,99,235,.55)'; ctx.lineWidth = 1.8; S.em.forEach(e => { const r = (S.clk - e.t) * CV; ctx.beginPath(); ctx.arc(g.cx + e.x, g.ry - 30, r, 0, TAU); ctx.stroke(); }); ctx.restore(); });
      if (src) { D.car(ctx, sxp, g.ry + 12, S.p.vs >= 0 ? 1 : -1); if (S.p.vs) Q58.arrow(ctx, sxp, g.ry - 74, S.p.vs * 2, 0, '#dc2626', 'vs', 3); Q25.ear(ctx, g.ax, g.ry - 30, 12, -1); Q25.ear(ctx, g.bx, g.ry - 30, 12, 1); if (S.p.vo) Q58.arrow(ctx, g.ax, g.ry - 76, S.p.vo * 3, 0, '#16a34a', 'vo', 3); }
      else { Q25.speaker(ctx, g.cx, g.ry - 30, .45, 1, Math.sin(S.clk * 40) * 2); D.bike(ctx, g.ax - 60 + S.ox, g.ry + 4); if (S.p.vo) Q58.arrow(ctx, g.ax - 60 + S.ox, g.ry - 92, S.p.vo * 3, 0, '#16a34a', 'vo', 3); }
      Q42.T(ctx, 'مبالغ في سرعة الحركة للتوضيح', g.L + 110, 600, { s: 10, w: 800, c: '#64748b' });
      // listener tiles
      const tx = g.x0, tw = (g.x1 - g.x0 - 12) / 2;
      Q58.tile(ctx, tx + tw + 12, 86, tw, 62, src ? 'السامع A أمام المصدر' : 'راكب الدراجة', Q58.f(fA, 1) + ' Hz', fA > S.p.f + .5 ? '#dc2626' : fA < S.p.f - .5 ? '#2563eb' : '#334155');
      Q58.tile(ctx, tx + tw + 12, 156, tw, 50, 'λ′ عنده', Q58.f(src ? (v - S.p.vs) / S.p.f : v / S.p.f, 4) + ' m', '#7c3aed');
      if (src) { Q58.tile(ctx, tx, 86, tw, 62, 'السامع B خلف المصدر', Q58.f(fB, 1) + ' Hz', fB > S.p.f + .5 ? '#dc2626' : fB < S.p.f - .5 ? '#2563eb' : '#334155'); Q58.tile(ctx, tx, 156, tw, 50, 'λ′ عنده', Q58.f((v + S.p.vs) / S.p.f, 4) + ' m', '#7c3aed'); }
      else Q58.tile(ctx, tx, 86, tw, 62, 'المصدر ساكن f', S.p.f + ' Hz', '#334155');
      Q58.panel(ctx, tx, 216, g.x1 - g.x0, 112, 'قاعدة الإشارات', '#0f766e');
      Q42.T(ctx, 'الاتجاه من المصدر نحو السامع موجب', (tx + g.x1) / 2, 248, { s: 11.5, w: 800, c: '#334155' });
      Q42.T(ctx, 'المصدر يقترب: vs موجبة ، يبتعد: سالبة', (tx + g.x1) / 2, 274, { s: 11, w: 800, c: '#dc2626' });
      Q42.T(ctx, 'السامع يقترب: vo سالبة ، يبتعد: موجبة', (tx + g.x1) / 2, 300, { s: 11, w: 800, c: '#16a34a' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.e);
      if (!Q58.drawEx(ctx, S, EXL)) Q58.card(ctx, S, [{ t: 'f′ = (v − vo) f / (v − vs)', mono: 1, c: '#0f766e', w: 900 }, { t: 'f′ = (' + v + ' − ' + D.pn(S.p.vo) + ') × ' + S.p.f + ' / (' + v + ' − ' + D.pn(src ? S.p.vs : 0) + ')', mono: 1, s: 11.5 }, { t: 'f′ = ' + Q58.f(fA, 2) + ' Hz', mono: 1, c: '#dc2626', w: 900 }, { t: fA > S.p.f + .5 ? 'التردد المسموع أعلى: اقتراب' : fA < S.p.f - .5 ? 'التردد المسموع أوطأ: ابتعاد' : 'لا تغير: لا حركة نسبية', c: '#334155', w: 800 }, { t: 'يستعمل في مقياس جريان الدم ورادار الشرطة', c: '#64748b', s: 11 }], { title: 'تأثير دوبلر' });
      Q42.banner(ctx, w, src ? 'اسحب السيارة أو غيّر سرعتها وقارن ما يسمعه A و B' : 'غيّر سرعة الدراجة نحو المصدر أو بعيداً عنه');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['src', 'المصدر يتحرك'], ['obs', 'السامع يتحرك'], ['hear', '🔊 ما يسمعه A'], ['orig', '🔊 تردد المصدر']], g.h - 128, S.md, (S2, k) => { if (k === 'hear') Q58.tone(D.fp(S2, 1), 1, { vol: .08 }); else if (k === 'orig') Q58.tone(S2.p.f, 1, { vol: .08 }); else { S2.md = k; S2.em = []; if (k === 'obs') { setParam(S2, 'vs', 0); setParam(S2, 'vo', -5); } else { setParam(S2, 'vo', 0); setParam(S2, 'vs', 20); } } }, { bw: 150 }),
      e: Q58.exChips(S, 'ex', g.h - 84, EXL, (S2, k) => { S2.em = []; if (k === 'e9') { S2.md = 'src'; setParam(S2, 'v', 342); setParam(S2, 'f', 644); setParam(S2, 'vs', 20); setParam(S2, 'vo', 0); } else { S2.md = 'obs'; setParam(S2, 'v', 345); setParam(S2, 'f', 1035); setParam(S2, 'vs', 0); setParam(S2, 'vo', -5); } }, { bw: 160 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'car', x: g.cx + S.sx, y: g.ry - 10, w: 96, h: 60, axis: 'x', keep: true, tip: 'اسحب المصدر', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; S2.tx = clamp(d.x - g.cx, -(S2.W - 140) / 2 + 40, (S2.W - 140) / 2 - 40); }, up: S2 => { S2.hold = 0; } }].concat(C.m, C.e); },
    readings(S) { return [rd('f المصدر', S.p.f + ' Hz'), rd(S.md === 'src' ? 'f′ عند A' : 'f′ عند الراكب', Q58.f(D.fp(S, 1), 2) + ' Hz'), rd('f′ عند B', S.md === 'src' ? Q58.f(D.fp(S, -1), 2) + ' Hz' : '—'), rd('vs', S.p.vs + ' m/s'), rd('vo', S.p.vo + ' m/s')]; },
    record(S) { return { vs: S.p.vs, vo: S.p.vo, fA: +D.fp(S, 1).toFixed(2) }; },
    cols: [['vs', 'vs (m/s)'], ['vo', 'vo (m/s)'], ['fA', 'f′ (Hz)']],
    explain(S) { return Q26.ex(S.md === 'src' ? 'الجبهات أمام السيارة متقاربة وخلفها متباعدة، فيسمع A صوتاً أحدّ ويسمع B صوتاً أغلظ.' : 'الجبهات متساوية البعد لأن المصدر ساكن، لكن الراكب يقابل عدداً أكبر أو أقل منها في الثانية.', 'المصدر المتحرك يلاحق موجاته من الأمام فيقصر الطول الموجي ويبتعد عنها من الخلف فيطول. والسامع المتحرك نحو المصدر يلتقي بالجبهات أسرع فيزداد عدد ما يصله منها في الثانية.', 'تتغير درجة صوت منبه سيارة الإسعاف من حاد إلى غليظ لحظة مرورها بجانبك.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== H2 — موجة الدرجة (الموجة الصدمية) وعدد ماخ (الأشكال 44 و 45، ص 189–191) =============== */
(() => {
  const CV = 70;
  const D = { id: 'g11_o_shock', page: 189, fig: 'الشكلان 44 و 45',
    desc: 'موجة الدرجة: عندما تطير الطائرة أبطأ من الصوت تتقارب الجبهات أمامها (الشكل 44a). وعندما تطير بسرعة الصوت تتزاحم الجبهات أمامها مكونة حاجز الصوت (44b). وعندما تطير أسرع من الصوت تتراكم الجبهات على سطح مخروطي هو موجات الصدم التي تحمل طاقة كبيرة وتسمع كصوت مدوٍ (44c). نصف زاوية رأس المخروط θ يعطى بالعلاقة sinθ = v / vs ، والنسبة vs / v تسمى عدد ماخ.',
    tags: 'موجة الدرجة الموجة الصدمية Shock wave حاجز الصوت sound barrier مخروط sinθ=v/vs عدد ماخ Mach number فوق صوتية طائرة أسرع من الصوت ضجة الكتلة الهوائية الباردة الساخنة الشكل 44 الشكل 45 8-21',
    tools: ['طائرة نموذجية', 'جبهات موجية'],
    steps: ['اضغط «أبطأ من الصوت»: الجبهات متقاربة أمام الطائرة.', 'اضغط «بسرعة الصوت»: الجبهات تتزاحم عند مقدمة الطائرة (حاجز الصوت).', 'اضغط «أسرع من الصوت»: يتكون المخروط وتقاس زاويته θ.', 'غيّر درجة حرارة الهواء: كيف يتغير عدد ماخ لطائرة سرعتها ثابتة؟'],
    concl: ['sinθ = v / vs حيث θ نصف زاوية رأس المخروط.', 'عدد ماخ = vs / v ، وإذا زاد على 1 فالطيران فوق صوتي.', 'موجات الصدم تحمل طاقة كبيرة وقد تسبب أضراراً للمباني عند الطيران المنخفض.', 'عند الانتقال إلى هواء ساخن يزداد v فيقل عدد ماخ.'],
    laws: ['g11_l8_mach'],
    controls: [R('vs', 'سرعة الطائرة vs', 150, 800, 520, 5, 'm/s'), R('T', 'درجة حرارة الهواء', -50, 40, 20, 1, '°C'), TG('cone', 'إظهار المخروط', true, null, 'labels')],
    setup(S) { S.px = 0; S.em = []; S.clk = 0; S.te = 0; S.hold = 0; S.tx = 0; },
    v(S) { return 331 + .6 * S.p.T; },
    M(S) { return S.p.vs / D.v(S); },
    update(S, dt) { const W = S.W || 820, x0 = 0, x1 = W - 140; S.clk += dt;
      if (S.hold) S.px = Q58.ez(S.px, S.tx, dt, 12); else { S.px += D.M(S) * CV * dt; if (S.px > x1) { S.px = x0 + 20; S.em = []; } }
      S.te += dt; if (S.te > .22) { S.te = 0; S.em.push({ x: S.px, t: S.clk }); } while (S.em.length > 40) S.em.shift(); },
    geo(S) { const g = Q58.geo(S); g.yc = 476; g.xl = g.L + 20; return g; },
    plane(ctx, x, y) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); const gg = ctx.createLinearGradient(0, -10, 0, 10); gg.addColorStop(0, '#e2e8f0'); gg.addColorStop(1, '#64748b'); ctx.fillStyle = gg; ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(-10, -6); ctx.lineTo(-56, -6); ctx.lineTo(-62, 0); ctx.lineTo(-56, 6); ctx.lineTo(-10, 6); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(-22, -4); ctx.lineTo(-40, -30); ctx.lineTo(-46, -30); ctx.lineTo(-38, -4); ctx.moveTo(-22, 4); ctx.lineTo(-40, 30); ctx.lineTo(-46, 30); ctx.lineTo(-38, 4); ctx.moveTo(-50, -5); ctx.lineTo(-60, -18); ctx.lineTo(-63, -18); ctx.lineTo(-58, -4); ctx.fill(); ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.ellipse(-4, -2, 7, 3, 0, 0, TAU); ctx.fill(); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), M = D.M(S), v = D.v(S), xp = g.xl + S.px;
      Q58.bg(ctx, w, h);
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, 340, 0, 620); gg.addColorStop(0, '#bae6fd'); gg.addColorStop(1, '#e0f2fe'); ctx.fillStyle = gg; rr(ctx, g.L + 10, 340, w - g.L - 20, 280, 12); ctx.fill();
        ctx.save(); ctx.beginPath(); ctx.rect(g.L + 10, 340, w - g.L - 20, 280); ctx.clip(); ctx.strokeStyle = 'rgba(30,64,175,.55)'; ctx.lineWidth = 1.6; S.em.forEach(e => { const r = (S.clk - e.t) * CV; ctx.beginPath(); ctx.arc(g.xl + e.x, g.yc, r, 0, TAU); ctx.stroke(); });
        if (S.p.cone && M > 1.02) { const th = Math.asin(1 / M), L = 700; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xp - L * Math.cos(th), g.yc - L * Math.sin(th)); ctx.lineTo(xp, g.yc); ctx.lineTo(xp - L * Math.cos(th), g.yc + L * Math.sin(th)); ctx.stroke(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(xp, g.yc, 60, Math.PI - th, Math.PI); ctx.stroke(); } ctx.restore(); });
      D.plane(ctx, xp, g.yc);
      if (S.p.cone && M > 1.02) { const th = Math.asin(1 / M); Q42.T(ctx, 'θ', xp - 74 * Math.cos(th / 2), g.yc - 74 * Math.sin(th / 2), { s: 13, w: 900, c: '#7c3aed' }); Q42.T(ctx, 'موجات الصدم', xp - 140, g.yc - 140 * Math.tan(th) - 14, { s: 11.5, w: 900, c: '#fff', bg: '#dc2626' }); }
      Q42.T(ctx, M < .97 ? 'الشكل 44a: أبطأ من الصوت' : M < 1.03 ? 'الشكل 44b: بسرعة الصوت — حاجز الصوت' : 'الشكل 44c: أسرع من الصوت', (g.L + w) / 2, 360, { s: 12, w: 900, c: '#fff', bg: M < .97 ? '#16a34a' : M < 1.03 ? '#d97706' : '#dc2626' });
      // tiles
      const tw = (g.x1 - g.x0 - 12) / 2; Q58.tile(ctx, g.x0 + tw + 12, 86, tw, 62, 'سرعة الصوت v', Q58.f(v, 1) + ' m/s', '#0ea5e9'); Q58.tile(ctx, g.x0, 86, tw, 62, 'سرعة الطائرة vs', S.p.vs + ' m/s', '#334155');
      Q58.tile(ctx, g.x0 + tw + 12, 160, tw, 62, 'عدد ماخ', Q58.f(M, 2), '#dc2626'); Q58.tile(ctx, g.x0, 160, tw, 62, 'نصف زاوية المخروط θ', M > 1 ? Q58.f(Math.asin(1 / M) * 180 / Math.PI, 1) + '°' : '—', '#7c3aed');
      Q58.panel(ctx, g.x0, 234, g.x1 - g.x0, 94, 'فكّر ص 191', '#b45309'); Q42.T(ctx, 'طائرة بسرعة ثابتة تنتقل من هواء بارد إلى ساخن:', (g.x0 + g.x1) / 2, 268, { s: 11, w: 800, c: '#334155' }); Q42.T(ctx, 'يزداد v فيقل عدد ماخ', (g.x0 + g.x1) / 2, 296, { s: 11.5, w: 900, c: '#b45309' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.b);
      Q58.card(ctx, S, [{ t: 'sinθ = v / vs', mono: 1, c: '#7c3aed', w: 900 }, { t: M > 1 ? 'sinθ = ' + Q58.f(v, 1) + ' / ' + S.p.vs + ' = ' + Q58.f(1 / M, 3) : 'لا مخروط: vs ≤ v', mono: M > 1 ? 1 : 0, c: '#334155' }, { t: 'عدد ماخ = vs / v', c: '#dc2626', w: 900 }, { t: 'M = ' + Q58.f(M, 2), mono: 1, c: '#dc2626' }, { t: 'v = 331 + 0.6 T = ' + Q58.f(v, 1) + ' m/s', mono: 1, c: '#0ea5e9' }, { t: 'موجات الصدم تحمل طاقة كبيرة وتسبب صوتاً مدوياً', c: '#64748b', s: 11.5 }], { title: 'موجة الدرجة' });
      Q42.banner(ctx, w, 'غيّر سرعة الطائرة وراقب الجبهات والمخروط');
    },
    chips(S, g) { const v = D.v(S); return { a: Q42.chips(S, 'mc', [['a', 'أبطأ من الصوت'], ['b', 'بسرعة الصوت'], ['c', 'أسرع من الصوت']], g.h - 128, '', (S2, k) => { const v2 = D.v(S2); setParam(S2, 'vs', clamp(Math.round(v2 * (k === 'a' ? .7 : k === 'b' ? 1 : 1.8) / 5) * 5, 150, 800)); S2.em = []; S2.px = 20; }, { bw: 160 }),
      b: Q42.chips(S, 'tm', [['cold', 'هواء بارد جداً'], ['hot', 'هواء ساخن']], g.h - 84, S.p.T <= -50 ? 'cold' : S.p.T >= 40 ? 'hot' : '', (S2, k) => setParam(S2, 'T', k === 'cold' ? -50 : 40), { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'pl', x: g.xl + S.px - 24, y: g.yc, w: 80, h: 60, axis: 'x', keep: true, tip: 'اسحب الطائرة', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; S2.tx = clamp(d.x + 24 - g.xl, 20, S2.W - 160); }, up: S2 => { S2.hold = 0; } }].concat(C.a, C.b); },
    readings(S) { const M = D.M(S); return [rd('سرعة الصوت v', Q58.f(D.v(S), 1) + ' m/s'), rd('عدد ماخ', Q58.f(M, 2)), rd('نصف زاوية المخروط', M > 1 ? Q58.f(Math.asin(1 / M) * 180 / Math.PI, 1) + '°' : '—')]; },
    record(S) { return { vs: S.p.vs, T: S.p.T, M: +D.M(S).toFixed(3) }; },
    cols: [['vs', 'vs (m/s)'], ['T', 'T (°C)'], ['M', 'Mach']],
    explain(S) { const M = D.M(S); return Q26.ex(M > 1.02 ? 'الطائرة تسبق موجاتها فتتراكم الجبهات على مخروط خلفها.' : M > .97 ? 'الجبهات تتزاحم عند مقدمة الطائرة.' : 'الجبهات تسبق الطائرة لكنها متقاربة أمامها.', 'في الزمن t تقطع الطائرة vs t ويقطع الصوت v t ، فالجبهات تلامس خطين يصنعان مع مسار الطائرة زاوية sinθ = v t / vs t = v / vs.', 'يسمع الناس على الأرض دوياً قوياً عند مرور طائرة أسرع من الصوت فوقهم.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== R — أسئلة الفصل الثامن ومسائله (ص 192–194) =============== */
(() => {
  const P = [
    { k: 's1', n: 'س1', q: 'بندول بسيط يتم 12 دورة خلال 2 min ، احسب زمنه الدوري.', g: [['n', 'عدد الدورات', 12, ''], ['t', 'الزمن', 120, 's']], f: v => v.t / v.n, u: 's', lines: v => ['T = t / n', 'T = ' + Q58.f(v.t) + ' / ' + Q58.f(v.n), 'T = ' + Q58.f(v.t / v.n, 2) + ' s'] },
    { k: 's2', n: 'س2', q: 'صفارة على بعد 10 m منك ومستوى شدة صوتها 100 dB. احسب قدرتها والمعدل الزمني للطاقة الساقطة على طبلة أذن مساحتها 8×10⁻⁵ m².', g: [['r', 'البعد', 10, 'm'], ['L', 'مستوى الشدة', 100, 'dB']], f: v => 1e-12 * Math.pow(10, v.L / 10) * 4 * Math.PI * v.r * v.r, u: 'W', lines: v => { const I = 1e-12 * Math.pow(10, v.L / 10); return ['I = I0 × 10^(L/10) = ' + Q58.sci(I, 3) + ' W/m²', 'P = I × 4πr²', 'P = ' + Q58.sci(I, 3) + ' × 4π × ' + Q58.f(v.r * v.r) + ' = ' + Q58.sci(I * 4 * Math.PI * v.r * v.r, 4) + ' W', 'على الطبلة: I × A = ' + Q58.sci(I * 8e-5, 3) + ' W']; } },
    { k: 's3', n: 'س3', q: 'ما التغير في مستوى الشدة إذا زادت قدرة المذياع عشرة أضعاف: من 25 إلى 250 بالوحدة نفسها؟', g: [['a', 'القدرة الأولى', 25, ''], ['b', 'القدرة الثانية', 250, '']], f: v => 10 * Math.log10(v.b / v.a), u: 'dB', lines: v => ['ΔL = 10 log(P2 / P1)', 'ΔL = 10 log(' + Q58.f(v.b) + ' / ' + Q58.f(v.a) + ')', 'ΔL = ' + Q58.f(10 * Math.log10(v.b / v.a), 2) + ' dB'] },
    { k: 's4', n: 'س4', q: 'قدرة صفارة 3.5π W. على أي بعد منها تكون شدة الصوت 1.2×10⁻³ W/m²؟', g: [['P', 'القدرة ÷ π', 3.5, 'W'], ['I', 'الشدة × 1000', 1.2, 'W/m²']], f: v => Math.sqrt(v.P * Math.PI / (4 * Math.PI * v.I * 1e-3)), u: 'm', lines: v => ['I = P / 4πr²', 'r = √(P / 4πI)', 'r = √(' + Q58.f(v.P) + 'π / (4π × ' + Q58.f(v.I) + '×10⁻³))', 'r = ' + Q58.f(Math.sqrt(v.P / (4 * v.I * 1e-3)), 1) + ' m'] },
    { k: 's5', n: 'س5', q: 'ما نسبة شدتي صوتين إذا كان الفرق بين مستويي شدتيهما 40 dB؟', g: [['d', 'فرق المستويين', 40, 'dB']], f: v => Math.pow(10, v.d / 10), u: '', lines: v => ['ΔL = 10 log(I1 / I2)', Q58.f(v.d) + ' = 10 log(I1 / I2)', 'I1 / I2 = 10^(' + Q58.f(v.d / 10, 2) + ')', 'I1 / I2 = ' + Q58.sci(Math.pow(10, v.d / 10), 3)] },
    { k: 's6', n: 'س6', q: 'ساعة جدارية قدرة صوت تكتكتها 1.2×10⁻⁸ W. هل يسمعها شخص اعتيادي على بعد 15 m؟', g: [['P', 'القدرة × 10⁸', 1.2, 'W'], ['r', 'البعد', 15, 'm']], f: v => v.P * 1e-8 / (4 * Math.PI * v.r * v.r), u: 'W/m²', lines: v => { const I = v.P * 1e-8 / (4 * Math.PI * v.r * v.r); return ['I = P / 4πr²', 'I = ' + Q58.f(v.P) + '×10⁻⁸ / (4π × ' + Q58.f(v.r * v.r) + ')', 'I = ' + Q58.sci(I, 3) + ' W/m²', 'LI = ' + Q58.f(10 * Math.log10(I / 1e-12), 1) + ' dB', I > 1e-12 ? 'أكبر من عتبة السمع: نعم يسمعها' : 'أقل من عتبة السمع: لا يسمعها']; } },
    { k: 's7', n: 'س7', q: 'آلة موسيقية وترية كتلة وترها 15 g وطوله 50 cm وقوة شده 25 N. احسب انطلاق الموجة فيه.', g: [['m', 'الكتلة', 15, 'g'], ['L', 'الطول', 50, 'cm'], ['T', 'قوة الشد', 25, 'N']], f: v => Math.sqrt(v.T / (v.m / 1000 / (v.L / 100))), u: 'm/s', lines: v => { const mu = v.m / 1000 / (v.L / 100); return ['μ = m / L = ' + Q58.f(mu, 4) + ' kg/m', 'v = √(T / μ)', 'v = √(' + Q58.f(v.T) + ' / ' + Q58.f(mu, 4) + ')', 'v = ' + Q58.f(Math.sqrt(v.T / mu), 1) + ' m/s']; } },
    { k: 's8', n: 'س8', q: 'رادار يرسل موجات راديوية طولها الموجي 2 cm مدة 0.1 s. احسب ترددها وعدد الموجات المرسلة، c = 3×10⁸ m/s.', g: [['l', 'الطول الموجي', 2, 'cm'], ['t', 'الزمن', .1, 's']], f: v => 3e8 / (v.l / 100), u: 'Hz', lines: v => { const f = 3e8 / (v.l / 100); return ['f = c / λ', 'f = 3×10⁸ / ' + Q58.f(v.l / 100, 3), 'f = ' + Q58.sci(f, 3) + ' Hz', 'n = f t = ' + Q58.sci(f, 3) + ' × ' + Q58.f(v.t, 2), 'n = ' + Q58.sci(f * v.t, 3) + ' موجة']; } },
    { k: 's9', n: 'س9', q: 'مصدر صوت يتحرك نحو فتاة واقفة فتسمع تردداً أعلى بمقدار 5% من تردده. احسب سرعة المصدر، v = 340 m/s.', g: [['p', 'نسبة الزيادة', 5, '%'], ['v', 'سرعة الصوت', 340, 'm/s']], f: v => v.v - v.v / (1 + v.p / 100), u: 'm/s', lines: v => ['f′ = v f / (v − vs)', 'f′ / f = ' + Q58.f(1 + v.p / 100, 3), 'v − vs = v / ' + Q58.f(1 + v.p / 100, 3), 'vs = ' + Q58.f(v.v) + ' − ' + Q58.f(v.v / (1 + v.p / 100), 1), 'vs = ' + Q58.f(v.v - v.v / (1 + v.p / 100), 1) + ' m/s'] },
    { k: 's10', n: 'س10', q: 'صبي يتحرك بسرعة 5 m/s مقترباً من مصدر ساكن فيسمع 700 Hz. احسب تردد المصدر، v = 345 m/s.', g: [['vo', 'سرعة الصبي', 5, 'm/s'], ['fp', 'التردد المسموع', 700, 'Hz'], ['v', 'سرعة الصوت', 345, 'm/s']], f: v => v.fp * v.v / (v.v + v.vo), u: 'Hz', lines: v => ['يقترب: vo = −' + Q58.f(v.vo) + ' m/s', 'f′ = (v − vo) f / v', 'f = f′ v / (v + ' + Q58.f(v.vo) + ')', 'f = ' + Q58.f(v.fp) + ' × ' + Q58.f(v.v) + ' / ' + Q58.f(v.v + v.vo), 'f = ' + Q58.f(v.fp * v.v / (v.v + v.vo), 1) + ' Hz'] }];
  const D = { id: 'g11_o_review', page: 194, fig: 'مسائل الفصل الثامن ص 194',
    desc: 'المسائل العشر في نهاية الفصل الثامن محلولة خطوة خطوة: الزمن الدوري للبندول، شدة الصوت ومستواها، سرعة الموجة في وتر، الرادار، وتأثير دوبلر. غيّر المعطيات بالمنزلق لترى كيف يتغير الجواب.',
    tags: 'أسئلة الفصل الثامن مسائل الزمن الدوري شدة الصوت مستوى الشدة ديسبل وتر رادار دوبلر ص 192 193 194',
    tools: ['آلة حاسبة'],
    steps: ['اختر رقم المسألة.', 'اضغط «الحل خطوة خطوة» ثم «الخطوة التالية».', 'غيّر معامل المعطى الأول بالمنزلق وقارن الجواب الجديد.'],
    concl: ['س1: 10 s ، س2: 12.57 W و 8×10⁻⁷ W ، س3: 10 dB ، س4: 27 m ، س5: 10⁴.', 'س6: نعم يسمعها ، س7: 28.9 m/s ، س8: 1.5×10¹⁰ Hz و 1.5×10⁹ موجة ، س9: 16.2 m/s ، س10: 690 Hz.'],
    laws: ['g11_l8_period', 'g11_l8_int', 'g11_l8_db', 'g11_l8_vstring', 'g11_l8_dopp'],
    controls: [R('sc', 'تغيير المعطى الأول ×', .5, 2, 1, .1, '')],
    setup(S) { S.q = 's1'; S.ex = 0; S.k = 0; S.bar = 0; },
    vals(S) { const p = P.find(x => x.k === S.q), v = {}; p.g.forEach((q, i) => { v[q[0]] = q[2] * (i === 0 ? S.p.sc : 1); }); return { p, v }; },
    update(S, dt) { const { p, v } = D.vals(S); S.bar = Q58.ez(S.bar, Math.min(1, Math.abs(p.f(v)) / (Math.abs(p.f(Object.fromEntries(p.g.map(q => [q[0], q[2]])))) * 2 || 1)), dt, 8); },
    draw(ctx, w, h, S) {
      const g = Q58.geo(S), { p, v } = D.vals(S), ans = p.f(v), x0 = g.x0, ww = g.x1 - g.x0;
      Q58.bg(ctx, w, h);
      Q58.panel(ctx, x0, 70, ww, 250, 'المعطيات', '#0f766e');
      p.g.forEach((q, i) => { const y = 112 + i * 56; Q58.tile(ctx, x0 + 16, y - 22, ww - 32, 48, q[1], Q58.f(v[q[0]], 3) + (q[3] ? ' ' + q[3] : ''), i === 0 ? '#dc2626' : '#2563eb'); });
      Q58.tile(ctx, x0 + 16, 262, ww - 32, 50, 'الجواب', (Math.abs(ans) >= 1e5 || (Math.abs(ans) < .01 && ans)) ? Q58.sci(ans, 3) + ' ' + p.u : Q58.f(ans, 3) + ' ' + p.u, '#be185d');
      // concept answers (ص 193)
      Q58.panel(ctx, g.L + 16, 344, w - g.L - 32, 170, 'أجوبة الأسئلة النظرية ص 193', '#7c3aed');
      ['س2: القوة المعيدة والتعجيل يتناسبان طردياً مع الإزاحة وباتجاه معاكس لها.', 'س3: يمر الطفل بموقع الاستقرار مرتين في كل دورة.', 'س4: مضاعفة الطول تزيد T بمقدار √2 مرة، ومضاعفة الكتلة أو السعة لا تغيره.', 'س5: نعم، على قمة الجبل g أصغر فيكون الزمن الدوري أكبر.'].forEach((t, i) => Q42.T(ctx, t, (g.L + w) / 2, 382 + i * 34, { s: 11.5, w: 800, c: '#334155' }));
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.b); Q58.drawSteps(ctx, C.e);
      const st = { title: 'مسألة ' + p.n + ' ص 194', q: p.q, lines: p.lines(v), k: S.ex ? S.k : 0 }; Q58.steps(ctx, S, st);
      Q42.banner(ctx, w, 'اختر المسألة واعرض الحل خطوة خطوة');
    },
    chips(S, g) { const pick = (S2, k) => { S2.q = k; S2.ex = 0; S2.k = 0; setParam(S2, 'sc', 1); };
      return { a: Q42.chips(S, 'qa', P.slice(0, 5).map(p => [p.k, p.n]), g.h - 172, S.q, pick, { bw: 100 }), b: Q42.chips(S, 'qb', P.slice(5).map(p => [p.k, p.n]), g.h - 128, S.q, pick, { bw: 100 }),
        e: Q58.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, 9) }; },
    drags(S) { if (!S.W) return []; const g = Q58.geo(S), C = D.chips(S, g);
      return [{ id: 'given', x: g.x0 + (g.x1 - g.x0) / 2, y: 112, w: g.x1 - g.x0 - 32, h: 48, axis: 'x', keep: true, tip: 'اسحب لتغيير المعطى الأول', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'sc', clamp(Math.round((.5 + (d.x - g.x0) / (g.x1 - g.x0) * 1.5) * 10) / 10, .5, 2)) }].concat(C.a, C.b, C.e); },
    readings(S) { const { p, v } = D.vals(S); return [rd('المسألة', p.n), rd('الجواب', Q58.sci(p.f(v), 4) + ' ' + p.u)]; },
    explain(S) { const { p } = D.vals(S); return Q26.ex('المسألة ' + p.n + ' محلولة بخطوات قصيرة، والجواب يتغير مع تغير المعطى.', 'نكتب القانون أولاً ثم نعوض المعطيات بوحدات النظام الدولي ثم نحسب الناتج ونكتب وحدته.', 'تعلّم خطوات الحل المنظمة يساعدك في حل أي مسألة جديدة في الامتحان.'); }
  };
  M8.P[D.id] = D;
})();
/* ====================== laws ====================== */
LW({ id: 'g11_l8_hooke', cat: 58, name: 'قانون هوك', fx: '<i>F</i> = −<i>k x</i>', sym: 'القوة المعيدة تتناسب طردياً مع الإزاحة x عن موضع الاستقرار وتعاكسها في الاتجاه، و k ثابت النابض ووحدته N/m', calc: { in: [['k', 'ثابت النابض k', 'N/m', 40], ['x', 'الإزاحة x', 'm', .1]], out: 'القوة المعيدة F', u: 'N', f: v => -v.k * v.x } });
LW({ id: 'g11_l8_shm', cat: 58, name: 'شرط الحركة التوافقية البسيطة', fx: '<i>F</i> ∝ −<i>x</i> ، <i>a</i> ∝ −<i>x</i> ، <i>a</i> = −' + FR('<i>k</i>', '<i>m</i>') + ' <i>x</i>', sym: 'حركة اهتزازية على خط مستقيم تتناسب فيها القوة المعيدة والتعجيل طردياً مع الإزاحة وباتجاه معاكس لها', calc: { in: [['k', 'k', 'N/m', 40], ['m', 'الكتلة m', 'kg', 1], ['x', 'الإزاحة x', 'm', .1]], out: 'التعجيل a', u: 'm/s²', f: v => -v.k / v.m * v.x } });
LW({ id: 'g11_l8_period', cat: 58, name: 'الزمن الدوري والتردد', fx: '<i>T</i> = ' + FR('زمن الاهتزازات', 'عددها') + ' ، <i>f</i> = ' + FR('1', '<i>T</i>'), sym: 'الزمن الدوري زمن هزة كاملة بالثانية، والتردد عدد الاهتزازات في الثانية ويقاس بالهيرتز Hz', calc: { in: [['t', 'الزمن الكلي', 's', 120], ['n', 'عدد الهزات', '', 12]], out: 'الزمن الدوري T', u: 's', f: v => v.t / v.n } });
LW({ id: 'g11_l8_circ', cat: 58, name: 'إزاحة الحركة التوافقية من الدائرية', fx: '<i>x</i> = <i>A</i> sin<i>θ</i> ، <i>θ</i> = <i>ω t</i>', sym: 'ظل جسم يدور بانتظام على دائرة نصف قطرها A يتحرك حركة توافقية بسيطة سعتها A', calc: { in: [['A', 'السعة A', 'cm', 8], ['t', 'الزاوية θ', '°', 30]], out: 'الإزاحة x', u: 'cm', f: v => v.A * Math.sin(v.t * Math.PI / 180) } });
LW({ id: 'g11_l8_pend', cat: 58, name: 'الزمن الدوري للبندول البسيط', fx: '<i>T</i> = 2π √(' + FR('<i>L</i>', '<i>g</i>') + ')', sym: 'L طول خيط البندول و g التعجيل الأرضي، والزمن الدوري لا يعتمد على الكتلة ولا على السعة عند الزوايا الصغيرة (≤ 5°)', calc: { in: [['L', 'طول الخيط L', 'm', 1], ['g', 'التعجيل الأرضي g', 'm/s²', 9.8]], out: 'الزمن الدوري T', u: 's', f: v => 2 * Math.PI * Math.sqrt(v.L / v.g) } });
LW({ id: 'g11_l8_vstring', cat: 58, name: 'سرعة الموجة في وتر مشدود', fx: '<i>v</i> = √(' + FR('<i>T</i>', '<i>μ</i>') + ') ، <i>μ</i> = ' + FR('<i>m</i>', '<i>L</i>'), sym: 'T قوة الشد بالنيوتن و μ كتلة وحدة الطول بوحدة kg/m', calc: { in: [['T', 'قوة الشد T', 'N', 30], ['m', 'كتلة الوتر', 'kg', .02], ['L', 'طول الوتر', 'm', .6]], out: 'سرعة الموجة v', u: 'm/s', f: v => Math.sqrt(v.T / (v.m / v.L)) } });
LW({ id: 'g11_l8_super', cat: 58, name: 'مبدأ التراكب', fx: '<i>y</i> = <i>y</i><sub>1</sub> + <i>y</i><sub>2</sub>', sym: 'عند التقاء موجتين في وسط واحد تكون الإزاحة المحصلة في أية نقطة المجموع الاتجاهي لإزاحتي الموجتين', calc: { in: [['a', 'إزاحة النبضة الأولى', 'cm', 4], ['b', 'إزاحة النبضة الثانية', 'cm', -4]], out: 'الإزاحة المحصلة', u: 'cm', f: v => v.a + v.b } });
LW({ id: 'g11_l8_vfl', cat: 58, name: 'سرعة الموجة والتردد والطول الموجي', fx: '<i>v</i> = <i>f λ</i> = ' + FR('<i>λ</i>', '<i>T</i>') + ' ، <i>f</i> = ' + FR('1', '<i>T</i>'), sym: 'λ المسافة بين قمتين متتاليتين، وتردد الموجة يساوي تردد المصدر وسرعتها تعتمد على الوسط', calc: { in: [['c', 'سرعة الموجة', 'm/s', 3e8], ['f', 'التردد', 'Hz', 9.4e9]], out: 'الطول الموجي λ', u: 'm', f: v => v.c / v.f } });

LW({ id: 'g11_l8_vsolid', cat: 58, name: 'انطلاق الصوت في الجوامد', fx: '<i>v</i><sub>s</sub> = √(' + FR('<i>Y</i>', '<i>ρ</i>') + ')', sym: 'Y معامل يونك للمادة بوحدة N/m² و ρ كثافتها بوحدة kg/m³', calc: { in: [['Y', 'معامل يونك Y', 'N/m²', 7e10], ['r', 'الكثافة ρ', 'kg/m³', 2700]], out: 'انطلاق الصوت', u: 'm/s', f: v => Math.sqrt(v.Y / v.r) } });
LW({ id: 'g11_l8_vliq', cat: 58, name: 'انطلاق الصوت في السوائل', fx: '<i>v</i><sub>s</sub> = √(' + FR('<i>β</i>', '<i>ρ</i>') + ')', sym: 'β معامل المرونة الحجمي للسائل بوحدة N/m² و ρ كثافته', calc: { in: [['b', 'معامل المرونة β', 'N/m²', 2.1e9], ['r', 'الكثافة ρ', 'kg/m³', 1000]], out: 'انطلاق الصوت', u: 'm/s', f: v => Math.sqrt(v.b / v.r) } });
LW({ id: 'g11_l8_vgas', cat: 58, name: 'انطلاق الصوت في الهواء ودرجة الحرارة', fx: '<i>v</i> = 331 + 0.6 <i>T</i>', sym: 'يزداد انطلاق الصوت في الهواء بنحو 0.6 m/s لكل ارتفاع درجة سيليزية واحدة، و T بالدرجات السيليزية', calc: { in: [['T', 'درجة الحرارة T', '°C', 20]], out: 'انطلاق الصوت v', u: 'm/s', f: v => 331 + .6 * v.T } });
LW({ id: 'g11_l8_interf', cat: 58, name: 'شرطا التداخل البناء والهدام', fx: 'بناء: Δ = <i>n λ</i> ، هدام: Δ = (<i>n</i> + ½) <i>λ</i>', sym: 'Δ فرق المسار بين الموجتين و n = 0, 1, 2 … ، ويشترط أن يكون للموجتين التردد نفسه والسعة نفسها', calc: { in: [['d', 'فرق المسار Δ', 'm', .335], ['l', 'الطول الموجي λ', 'm', .67]], out: 'Δ ÷ λ', u: '', f: v => v.d / v.l } });
LW({ id: 'g11_l8_reson', cat: 58, name: 'شرط الرنين', fx: '<i>f</i> = <i>f</i><sub>0</sub>', sym: 'يحدث الرنين عندما يساوي تردد القوة الخارجية الدورية التردد الطبيعي للجسم، فتكون سعة الاهتزاز أكبر ما يمكن', calc: { in: [['L', 'طول بندول الأرجوحة', 'm', 2.5], ['g', 'التعجيل الأرضي g', 'm/s²', 9.8]], out: 'التردد الطبيعي f₀', u: 'Hz', f: v => 1 / (2 * Math.PI * Math.sqrt(v.L / v.g)) } });
LW({ id: 'g11_l8_beat', cat: 58, name: 'تردد الضربات', fx: '<i>f</i><sub>B</sub> = <i>f</i><sub>1</sub> − <i>f</i><sub>2</sub> ، <i>f</i> = ' + FR('<i>f</i><sub>1</sub> + <i>f</i><sub>2</sub>', '2'), sym: 'عدد الضربات في الثانية يساوي فرق الترددين، و f تردد الصوت المسموع', calc: { in: [['a', 'التردد f1', 'Hz', 440], ['b', 'التردد f2', 'Hz', 438]], out: 'عدد الضربات fB', u: 'Hz', f: v => Math.abs(v.a - v.b) } });
LW({ id: 'g11_l8_stand', cat: 58, name: 'الموجات الواقفة في وتر', fx: '<i>L</i> = <i>n</i> ' + FR('<i>λ</i>', '2') + ' ، <i>f</i> = ' + FR('<i>n v</i>', '2<i>L</i>'), sym: 'n عدد البطون (1 ، 2 ، 3 …)، والتردد الأساسي f1 = v / 2L ، والمسافة بين عقدتين متتاليتين λ/2', calc: { in: [['n', 'عدد البطون n', '', 2], ['v', 'انطلاق الموجة v', 'm/s', 84], ['L', 'طول الوتر L', 'm', .42]], out: 'التردد f', u: 'Hz', f: v => v.n * v.v / (2 * v.L) } });
LW({ id: 'g11_l8_int', cat: 58, name: 'شدة الصوت', fx: '<i>I</i> = ' + FR('<i>P</i>', '<i>A</i>') + ' = ' + FR('<i>P</i>', '4π<i>r</i>²'), sym: 'P القدرة بالواط و A المساحة العمودية على اتجاه الانتشار، والشدة لمصدر نقطي تتناسب عكسياً مع مربع البعد', calc: { in: [['P', 'القدرة P', 'W', 12.57], ['r', 'البعد r', 'm', 10]], out: 'الشدة I', u: 'W/m²', f: v => v.P / (4 * Math.PI * v.r * v.r) } });
LW({ id: 'g11_l8_db', cat: 58, name: 'مستوى شدة الصوت', fx: '<i>L</i><sub>I</sub> = 10 log ' + FR('<i>I</i>', '<i>I</i><sub>0</sub>') + ' ، <i>I</i><sub>0</sub> = 10⁻¹² W/m²', sym: 'يقاس بالديسبل dB؛ عتبة السمع 0 dB وعتبة الألم 120 dB، ومضاعفة الشدة عشر مرات تزيد المستوى 10 dB', calc: { in: [['I', 'الشدة I', 'W/m²', 2e-7]], out: 'مستوى الشدة', u: 'dB', f: v => 10 * Math.log10(v.I / 1e-12) } });
LW({ id: 'g11_l8_sonar', cat: 58, name: 'قياس العمق بالصدى', fx: '<i>d</i> = ' + FR('<i>v t</i>', '2'), sym: 't زمن ذهاب النبضة وإيابها و v سرعتها في الوسط', calc: { in: [['v', 'السرعة v', 'm/s', 1533], ['t', 'الزمن t', 's', 4]], out: 'العمق d', u: 'm', f: v => v.v * v.t / 2 } });
LW({ id: 'g11_l8_dopp', cat: 58, name: 'تأثير دوبلر', fx: '<i>f′</i> = ' + FR('<i>v</i> − <i>v</i><sub>o</sub>', '<i>v</i> − <i>v</i><sub>s</sub>') + ' <i>f</i>', sym: 'الاتجاه من المصدر نحو السامع موجب: vs موجبة عند اقتراب المصدر وسالبة عند ابتعاده، و vo سالبة عند اقتراب السامع وموجبة عند ابتعاده', calc: { in: [['f', 'تردد المصدر f', 'Hz', 644], ['v', 'سرعة الصوت v', 'm/s', 342], ['vs', 'سرعة المصدر vs', 'm/s', 20], ['vo', 'سرعة السامع vo', 'm/s', 0]], out: 'التردد المسموع f′', u: 'Hz', f: v => (v.v - v.vo) / (v.v - v.vs) * v.f } });
LW({ id: 'g11_l8_mach', cat: 58, name: 'موجة الدرجة وعدد ماخ', fx: 'sin<i>θ</i> = ' + FR('<i>v</i>', '<i>v</i><sub>s</sub>') + ' ، عدد ماخ = ' + FR('<i>v</i><sub>s</sub>', '<i>v</i>'), sym: 'θ نصف زاوية رأس مخروط موجات الصدم و vs سرعة المصدر و v سرعة الصوت', calc: { in: [['vs', 'سرعة الطائرة vs', 'm/s', 680], ['v', 'سرعة الصوت v', 'm/s', 340]], out: 'عدد ماخ', u: '', f: v => v.vs / v.v } });
/* ====================== merges (book order) ====================== */
M8.merge({ id: 'g11_c8_shm', ch: 58, reg: X11, sec: '8-1 الحركة الدورية + 8-2 الاهتزازية + 8-3 التوافقية البسيطة + 8-4 علاقتها بالدائرية', page: 158, kind: 'نشاط',
  title: 'الحركة التوافقية البسيطة: النابض، رسمها على شريط متحرك، وظل الحركة الدائرية',
  desc: 'نسحب كتلة مربوطة بنابض على سطح أملس فنرى القوة المعيدة F = −k x ، ثم ننفذ نشاط رسم الحركة على شريط ورقي متحرك ونقيس الزمن الدوري والتردد والسعة، ونرى أن ظل كرة على قرص دوار يتحرك حركة توافقية x = A sinθ.',
  tags: 'الحركة الدورية الاهتزازية التوافقية البسيطة قانون هوك نشاط شريط ورقي ظل',
  fact: ['الحركة الدورية تعيد نفسها بفترات زمنية منتظمة، مثل بندول الساعة وأوتار الغيتار والأرجوحة (ص 158).', 'شروط الحركة الاهتزازية: وجود قوة معيدة، والاستمرارية، ومصدر يجهز الطاقة (ص 158).', 'تتلاشى الحركة الاهتزازية تدريجياً بسبب الاحتكاك ما لم نعوض الطاقة المفقودة (ص 158).'],
  quiz: [
    { q: 'في الحركة التوافقية البسيطة يتناسب التعجيل مع الإزاحة:', o: ['طردياً وباتجاه معاكس لها', 'طردياً وبالاتجاه نفسه', 'عكسياً', 'لا علاقة بينهما'], a: 0, why: 'ص 160: a ∝ −x.' },
    { q: 'نابض ثابته 40 N/m مزاح 0.1 m. القوة المعيدة:', o: ['−4 N', '4 N', '400 N', '0.4 N'], a: 0, why: 'F = −k x.' },
    { q: 'الهزة الكاملة هي:', o: ['مرور الجسم بنقطة معينة مرتين متتاليتين بالاتجاه نفسه', 'الانتقال من الطرف إلى موضع الاستقرار', 'أعظم إزاحة', 'عدد الاهتزازات في الثانية'], a: 0, why: 'ص 160.' },
    { q: 'ظل كرة على قرص يدور بانتظام يتحرك:', o: ['حركة توافقية بسيطة', 'حركة دائرية', 'بسرعة ثابتة', 'لا يتحرك'], a: 0, why: 'ص 161: x = A sinθ.' }],
  parts: [{ id: 'g11_o_spring', n: 'قانون هوك: كتلة ونابض على سطح أملس' }, { id: 'g11_o_trace', n: 'نشاط: رسم الحركة على شريط ورقي متحرك' }, { id: 'g11_o_circle', n: 'ظل الحركة الدائرية ومنحني الجيب' }] });

M8.merge({ id: 'g11_c8_pend', ch: 58, reg: X11, sec: '8-5 البندول البسيط + 8-6 الحركة التوافقية المضمحلة', page: 162, kind: 'مثال',
  title: 'البندول البسيط والحركة المضمحلة',
  desc: 'نزيح كرة البندول بزاوية صغيرة ونقيس زمنها الدوري ونقارنه مع T = 2π√(L/g) ونحل مثال 1، ثم نرى كيف تتناقص سعة الاهتزاز في وسط لزج وكيف نعوض الطاقة المفقودة.',
  tags: 'البندول البسيط T=2π√(L/g) مثال 1 الحركة المضمحلة الإخماد',
  fact: ['يجب ألا تزيد زاوية إزاحة البندول البسيط على 5° لتكون حركته توافقية بسيطة (ص 162).', 'ندفع الأرجوحة باتجاه حركتها عند كل ذبذبة لتعويض الطاقة المفقودة بالاحتكاك (ص 163).', 'تستعمل ماصات الصدمات في منظومة التعليق في السيارة لإخماد الاهتزازات (ص 163).'],
  quiz: [
    { q: 'بندول بسيط طوله 1 m و g = 9.8 m/s². زمنه الدوري تقريباً:', o: ['2 s', '1 s', '6.28 s', '0.5 s'], a: 0, why: 'مثال 1 ص 162.' },
    { q: 'أي مما يأتي لا يؤثر في الزمن الدوري لبندول بسيط يهتز في الهواء؟', o: ['كتلة الكرة', 'طول الخيط', 'التعجيل الأرضي', 'موقع البندول'], a: 0, why: 'س1 فقرة 1 ص 192.' },
    { q: 'إذا ضوعف طول البندول البسيط فإن زمنه الدوري:', o: ['يزداد √2 مرة', 'يتضاعف', 'يقل إلى النصف', 'لا يتغير'], a: 0, why: 'T ∝ √L.' },
    { q: 'القوة المعيدة في البندول البسيط هي:', o: ['−mg sinθ', 'mg cosθ', 'قوة الشد', 'mg'], a: 0, why: 'ص 162 الشكل 9.' },
    { q: 'في الحركة المضمحلة تتناقص:', o: ['سعة الاهتزاز', 'الكتلة', 'ثابت النابض', 'طول النابض الطبيعي'], a: 0, why: 'ص 163.' }],
  parts: [{ id: 'g11_o_pend', n: 'البندول البسيط ومثال 1' }, { id: 'g11_o_damp', n: 'الحركة المضمحلة وتعويض الطاقة' }] });

M8.merge({ id: 'g11_c8_waves', ch: 58, reg: X11, sec: '8-7 الحركة الموجية + 8-8 النبضات + 8-9 التراكب + 8-10 الموجات الدورية + 8-11 أنواع الموجات', page: 164, kind: 'مثال',
  title: 'الموجات: النبضة في وتر، مبدأ التراكب، والموجات المستعرضة والطولية',
  desc: 'نولد نبضة في وتر مشدود ونقيس سرعتها v = √(T/μ) ونرى انعكاسها عند طرف مثبت وطرف حر ونحل مثال 2، ثم نجعل نبضتين تلتقيان لنتحقق من مبدأ التراكب، ونقارن الموجات المستعرضة والطولية وموجات الماء ونحل مثال 3 (الرادار).',
  tags: 'الحركة الموجية النبضة الوتر التراكب الموجات الدورية المستعرضة الطولية v=fλ رادار',
  fact: ['الحركة الموجية اضطراب ناتج عن مصدر طاقة، مثل موجات الماء حول حجر يسقط فيه والزلازل والصوت (ص 164).', 'تردد الموجة يساوي تردد المصدر، أما سرعتها فتعتمد على الوسط (ص 165).', 'الموجات الكهرومغناطيسية مستعرضة ولا تحتاج إلى وسط لتنتقل (ص 168).', 'في موجات الماء تتحرك الجزيئات في مسارات دائرية، والزلازل تولد موجات مستعرضة وطولية (ص 169).'],
  quiz: [
    { q: 'وتر كتلته 20 g وطوله 60 cm. قوة الشد اللازمة لتكون سرعة الموجة 30 m/s:', o: ['30 N', '18 N', '900 N', '0.3 N'], a: 0, why: 'مثال 2: T = m v² / L.' },
    { q: 'عند انعكاس نبضة من طرف مثبت فإنها:', o: ['تنقلب بفرق طور 180°', 'لا تنقلب', 'تختفي', 'تتضاعف سعتها'], a: 0, why: 'ص 165 الشكل 16.' },
    { q: 'نبضتان قمة وقعر متساويتان في السعة تلتقيان. الإزاحة المحصلة لحظة الالتقاء:', o: ['صفر', 'ضعف السعة', 'السعة نفسها', 'نصف السعة'], a: 0, why: 'ص 167 الشكل 18.' },
    { q: 'ثمان موجات تمر عبر نقطة معينة كل 12 s والمسافة بين قمتين متتاليتين 1.2 m. سرعة الموجة:', o: ['0.8 m/s', '0.667 m/s', '1.8 m/s', '9.6 m/s'], a: 0, why: 'س1 فقرة 3: f = 8/12 ، v = f λ.' },
    { q: 'الموجات الميكانيكية المستعرضة تتحرك فقط خلال:', o: ['الأجسام الصلبة', 'السوائل', 'الغازات', 'كل ما ذكر'], a: 0, why: 'س1 فقرة 7 ص 193.' },
    { q: 'في الموجة الطولية تهتز جسيمات الوسط:', o: ['موازية لخط الانتشار', 'عمودية على خط الانتشار', 'في دوائر', 'لا تهتز'], a: 0, why: 'ص 168.' }],
  parts: [{ id: 'g11_o_pulse', n: 'النبضة في وتر وانعكاسها ومثال 2' }, { id: 'g11_o_super', n: 'مبدأ التراكب: نبضتان تلتقيان' }, { id: 'g11_o_types', n: 'المستعرضة والطولية وموجات الماء ومثال 3' }] });


M8.merge({ id: 'g11_c8_sound', ch: 58, reg: X11, sec: '8-12 الصوت', page: 170, kind: 'مثال',
  title: 'الصوت: موجة طولية وانطلاقها في الأوساط',
  desc: 'نطرق شوكة رنانة ونرى التضاغطات والتخلخلات وإشارتها على راسم الذبذبات ونتحقق أن الصوت لا ينتقل في الفراغ، ثم نسابق نبضات صوتية في غاز وسائل وجامد من الجدول 1 ونحل مثال 4 ومثال 5.',
  tags: 'الصوت موجة طولية راسم الذبذبات الفراغ المدى المسموع سرعة الصوت الجدول 1 مثال 4 مثال 5 v=331+0.6T',
  fact: ['المدى المسموع للإنسان من 20 Hz إلى 20000 Hz ، وما دونه تحت سمعي وما فوقه فوق سمعي (ص 170).', 'سرعة الصوت في الماس 12000 m/s وفي الهواء عند 0°C نحو 331 m/s فقط (ص 170).', 'الهواء الرطب أقل كثافة من الجاف لذا ينتقل فيه الصوت أسرع (ص 171).'],
  quiz: [
    { q: 'انطلاق الصوت في الهواء دالة لـ:', o: ['درجة الحرارة', 'الطول الموجي', 'التردد', 'السعة'], a: 0, why: 'س1 فقرة 9 ص 193.' },
    { q: 'يكون انطلاق الصوت أكبر في:', o: ['الجوامد', 'السوائل', 'الغازات', 'الفراغ'], a: 0, why: 'ص 170.' },
    { q: 'سرعة الصوت في الهواء عند 30°C تقريباً:', o: ['349 m/s', '331 m/s', '313 m/s', '361 m/s'], a: 0, why: 'v = 331 + 0.6 × 30.' },
    { q: 'ساق ألمنيوم Y = 7×10¹⁰ N/m² و ρ = 2.7×10³ kg/m³. انطلاق الصوت فيه:', o: ['5091 m/s', '1449 m/s', '343 m/s', '2.59×10⁷ m/s'], a: 0, why: 'مثال 4: vs = √(Y/ρ).' },
    { q: 'لا ينتقل الصوت في:', o: ['الفراغ', 'الماء', 'الحديد', 'الهواء'], a: 0, why: 'الصوت موجة ميكانيكية تحتاج إلى وسط.' }],
  parts: [{ id: 'g11_o_sound', n: 'الصوت موجة طولية: الشوكة وراسم الذبذبات' }, { id: 'g11_o_vsound', n: 'سرعة الصوت في الأوساط ومثالا 4 و 5' }] });

M8.merge({ id: 'g11_c8_interf', ch: 58, reg: X11, sec: '8-13 تداخل الموجات + 8-14 الرنين + 8-15 الضربات', page: 172, kind: 'نشاط',
  title: 'التداخل والرنين والضربات',
  desc: 'نشاط أنبوبة كوينك: نغير فرق المسار بين فرعين فيقوى الصوت أو ينعدم. ثم ندفع أرجوحة بقوة دورية لنرى الرنين عند f = f₀ ونقارن الإخماد الضعيف والعالي، وأخيراً نسمع الضربات من شوكتين متقاربتين ونحل مثال 6.',
  tags: 'تداخل أنبوبة كوينك بناء هدام فرق المسار الرنين التردد الطبيعي الأرجوحة الضربات fB=f1-f2 مثال 6',
  fact: ['للحصول على نمط تداخل واضح ومستقر يجب أن تتساوى الموجتان في التردد والسعة (ص 173).', 'لا يُسمح للجنود بالسير بخطوات منتظمة على الجسور خشية الرنين (ص 174).', 'تدرك الأذن الضربات إذا كان فرق الترددين صغيراً، وتستعمل لضبط أوتار الآلات الموسيقية (ص 175).'],
  quiz: [
    { q: 'في أنبوبة كوينك ينعدم الصوت عند R عندما يكون فرق المسار:', o: ['نصف طول موجي', 'صفراً', 'طولاً موجياً واحداً', 'طولين موجيين'], a: 0, why: 'تداخل هدام: تضاغط مع تخلخل ص 173.' },
    { q: 'التداخل البناء يحدث عند التقاء:', o: ['قمة مع قمة', 'قمة مع قعر', 'تضاغط مع تخلخل', 'موجتين مختلفتين في التردد'], a: 0, why: 'ص 173.' },
    { q: 'يحدث الرنين عندما يكون تردد القوة الدورية:', o: ['مساوياً للتردد الطبيعي', 'ضعف التردد الطبيعي', 'نصف التردد الطبيعي', 'صفراً'], a: 0, why: 'ص 174.' },
    { q: 'شوكتان 440 Hz و 438 Hz. عدد الضربات في الثانية:', o: ['2', '439', '878', '1'], a: 0, why: 'fB = f1 − f2.' },
    { q: 'شوكة معلومة 446 Hz وسُمعت 7 ضربات، وعند تثقيل المجهولة قلّ عدد الضربات. تردد المجهولة:', o: ['453 Hz', '439 Hz', '446 Hz', '7 Hz'], a: 0, why: 'مثال 6 ص 176.' }],
  parts: [{ id: 'g11_o_quincke', n: 'نشاط: أنبوبة كوينك والتداخل' }, { id: 'g11_o_reson', n: 'الرنين: الأرجوحة ومنحني السعة' }, { id: 'g11_o_beats', n: 'الضربات ومثال 6' }] });

M8.merge({ id: 'g11_c8_stand', ch: 58, reg: X11, sec: '8-16 الموجات الواقفة', page: 176, kind: 'نشاط',
  title: 'نشاط: الموجات الواقفة في وتر',
  desc: 'نصل وتراً بشوكة رنانة ونمرره على بكرة ونعلق ثقلاً، ونغير الطول أو الثقل حتى تتكون موجة واقفة بعقد وبطون، ونقارن التوافقيات الأولى والثانية والثالثة ونحل مثال 7.',
  tags: 'الموجات الواقفة عقد بطون L=nλ/2 f=nv/2L التردد الأساسي التوافقيات مثال 7',
  fact: ['العقد نقاط سعتها وطاقتها صفر، والبطون في منتصف المسافة بين عقدتين (ص 177).', 'تتكون الموجة الواقفة من موجتين متساويتين في التردد والسعة تسيران باتجاهين متعاكسين في الوسط نفسه (ص 177).'],
  quiz: [
    { q: 'المسافة بين عقدتين متتاليتين في موجة واقفة:', o: ['λ/2', 'λ', 'λ/4', '2λ'], a: 0, why: 'ص 177.' },
    { q: 'وتر طوله 42 cm فيه ستة بطون. الطول الموجي:', o: ['0.14 m', '0.84 m', '0.42 m', '0.07 m'], a: 0, why: 'مثال 7: L = 6 λ/2.' },
    { q: 'التردد الأساسي لوتر طوله L وانطلاق الموجة فيه v:', o: ['v / 2L', 'v / L', '2v / L', 'vL'], a: 0, why: 'f1 = v / 2L ص 177.' },
    { q: 'تردد التوافقية الثانية يساوي:', o: ['ضعف التردد الأساسي', 'التردد الأساسي', 'نصف التردد الأساسي', 'ثلاثة أضعافه'], a: 0, why: 'f2 = 2 f1.' }],
  parts: [{ id: 'g11_o_stand', n: 'الموجات الواقفة في وتر ومثال 7' }] });

M8.merge({ id: 'g11_c8_char', ch: 58, reg: X11, sec: '8-17 خصائص الصوت + 8-18 مستويات الصوت + 8-19 الموجات فوق السمعية', page: 178, kind: 'مثال',
  title: 'خصائص الصوت وشدته والموجات فوق السمعية',
  desc: 'نقارن درجة الصوت ونوعه على راسم الذبذبات، ثم نقيس شدة الصوت ومستواها بالديسبل عند أبعاد مختلفة ونقارنها بالجدول 2 ونحل مثال 8، ثم نقيس عمق البحر بالسونار ونرى كيف يحدد الخفاش العوائق.',
  tags: 'علو الصوت درجة الصوت نوع الصوت شدة الصوت I=P/A ديسبل LI=10log(I/I0) الجدول 2 مثال 8 الموجات فوق السمعية السونار الخفاش',
  fact: ['تبطن السقوف والجدران في قاعات الحفلات بمواد ماصة للصوت (ص 182).', 'عتبة السمع 10⁻¹² W/m² أي 0 dB ، وعتبة الألم 1 W/m² أي 120 dB (ص 180).', 'تستعمل الموجات فوق السمعية في الفحوص الطبية بدل الأشعة السينية وفي تحطيم حصى الكلى (ص 184).'],
  quiz: [
    { q: 'زيادة شدة الصوت 10 مرات تزيد مستوى الشدة بمقدار:', o: ['10 dB', '100 dB', '20 dB', '2 dB'], a: 0, why: 'س1 فقرة 8 ص 193.' },
    { q: 'تعتمد درجة الصوت على:', o: ['التردد', 'السعة', 'كثافة الوسط', 'البعد عن المصدر'], a: 0, why: 'ص 181.' },
    { q: 'إذا تضاعف البعد عن مصدر نقطي فإن شدة الصوت:', o: ['تقل إلى الربع', 'تقل إلى النصف', 'تتضاعف', 'لا تتغير'], a: 0, why: 'I ∝ 1/r² الشكل 35.' },
    { q: 'آلة واحدة تعطي 53 dB. الآلتان المتماثلتان معاً تعطيان:', o: ['56 dB', '106 dB', '53 dB', '63 dB'], a: 0, why: 'مثال 8: مضاعفة الشدة تزيد 3 dB.' },
    { q: 'الموجات فوق السمعية ترددها:', o: ['أكبر من 20000 Hz', 'أقل من 20 Hz', 'بين 20 و 20000 Hz', 'يساوي 1000 Hz'], a: 0, why: 'ص 183.' },
    { q: 'يفضل الدولفين الموجات عالية التردد في تحديد الموقع لأن:', o: ['طولها الموجي قصير', 'سرعتها أكبر', 'سعتها أكبر', 'لا تنعكس'], a: 0, why: 'فكّر ص 184.' }],
  parts: [{ id: 'g11_o_pitch', n: 'درجة الصوت ونوعه' }, { id: 'g11_o_level', n: 'شدة الصوت ومستواها بالديسبل ومثال 8' }, { id: 'g11_o_sonar', n: 'الموجات فوق السمعية: السونار والخفاش' }] });

M8.merge({ id: 'g11_c8_doppler', ch: 58, reg: X11, sec: '8-20 تأثير دوبلر + 8-21 موجة الدرجة', page: 185, kind: 'مثال',
  title: 'تأثير دوبلر وموجات الصدم',
  desc: 'نحرك مصدر صوت نحو سامع وبعيداً عنه، ثم نحرك السامع نحو مصدر ساكن، ونحسب التردد المسموع بالعلاقة العامة ونحل مثالي 9 و 10، ثم نزيد سرعة الطائرة حتى تتجاوز سرعة الصوت ونقيس زاوية مخروط موجات الصدم وعدد ماخ.',
  tags: 'تأثير دوبلر f′=(v−vo)/(v−vs)f مثال 9 مثال 10 موجة الدرجة الموجة الصدمية حاجز الصوت عدد ماخ sinθ=v/vs',
  fact: ['مقياس جريان الدم يستعمل تأثير دوبلر للموجات المنعكسة عن كريات الدم الحمراء (ص 187).', 'موجات الصدم تحمل طاقة كبيرة وقد تسبب أضراراً للمباني عند الطيران المنخفض (ص 191).'],
  quiz: [
    { q: 'لا يحدث تأثير دوبلر عندما:', o: ['يكون المراقب والمصدر ساكنين أحدهما بالنسبة للآخر', 'يتحرك المصدر باتجاه المراقب', 'يتحرك المراقب باتجاه المصدر', 'يسيران باتجاهين متعاكسين'], a: 0, why: 'س1 فقرة 4 ص 192.' },
    { q: 'راكب حافلة يمر قرب سيارة متوقفة يطلق سائقها المنبه. الصوت الذي يسمعه:', o: ['تتغير درجته من كبير إلى صغير', 'الأصلي ترتفع درجته', 'الأصلي تنخفض درجته', 'تتغير درجته من صغير إلى كبير'], a: 0, why: 'س1 فقرة 5 ص 192.' },
    { q: 'سيارة 20 m/s تقترب من رجل وتصدر 644 Hz ، v = 342 m/s. التردد المسموع:', o: ['684 Hz', '608 Hz', '644 Hz', '664 Hz'], a: 0, why: 'مثال 9.' },
    { q: 'عندما يتحرك السامع نحو مصدر ساكن فإن الطول الموجي:', o: ['لا يتغير', 'يقصر', 'يطول', 'ينعدم'], a: 0, why: 'مثال 10 ص 189.' },
    { q: 'طائرة سرعتها ضعف سرعة الصوت. نصف زاوية رأس مخروط الصدم:', o: ['30°', '60°', '45°', '90°'], a: 0, why: 'sinθ = v / vs = 0.5.' },
    { q: 'طائرة بسرعة ثابتة تنتقل من هواء بارد إلى ساخن، فعدد ماخ:', o: ['يقل', 'يزداد', 'لا يتغير', 'يصبح صفراً'], a: 0, why: 'فكّر ص 191: سرعة الصوت تزداد.' }],
  parts: [{ id: 'g11_o_doppler', n: 'تأثير دوبلر ومثالا 9 و 10' }, { id: 'g11_o_shock', n: 'موجة الدرجة وعدد ماخ' }] });

M8.merge({ id: 'g11_c8_review', ch: 58, reg: X11, sec: 'أسئلة الفصل الثامن ومسائله', page: 192, kind: 'مثال',
  title: 'أسئلة الفصل الثامن ومسائله',
  desc: 'حل المسائل العشر في ص 194 خطوة خطوة مع إمكانية تغيير المعطيات، وأجوبة الأسئلة النظرية ص 193، واختبار بأسئلة الاختيار من متعدد ص 192–193.',
  tags: 'أسئلة الفصل الثامن مسائل اختر الإجابة الصحيحة ص 192 193 194',
  fact: ['الزمن الدوري للبندول البسيط لا يعتمد على كتلة الكرة (س1 فقرة 1 ص 192).'],
  quiz: [
    { q: 'بندول طوله 2 m و g = 10 m/s². عدد اهتزازاته خلال 5 min تقريباً:', o: ['106', '1.76', '21.6', '236'], a: 0, why: 'س1 فقرة 2: T = 2.81 s و 300 ÷ 2.81.' },
    { q: 'الزمن اللازم لإكمال هزة واحدة يسمى:', o: ['الزمن الدوري', 'الهزة', 'السعة', 'التردد'], a: 0, why: 'س1 فقرة 6 ص 193.' },
    { q: 'كم مرة يمر طفل على أرجوحة بموقع الاستقرار خلال دورة واحدة؟', o: ['مرتين', 'مرة واحدة', 'أربع مرات', 'لا يمر'], a: 0, why: 'س3 ص 193.' },
    { q: 'الزمن الدوري لبندول على قمة جبل مقارنة بسطح البحر:', o: ['أكبر', 'أصغر', 'مساوٍ', 'صفر'], a: 0, why: 'س5: g أصغر على الجبل.' },
    { q: 'فرق مستويي شدة صوتين 40 dB. نسبة شدتيهما:', o: ['10⁴', '40', '400', '10⁴⁰'], a: 0, why: 'مسألة س5 ص 194.' },
    { q: 'وتر كتلته 15 g وطوله 50 cm وشده 25 N. انطلاق الموجة فيه تقريباً:', o: ['28.9 m/s', '833 m/s', '5 m/s', '40.8 m/s'], a: 0, why: 'مسألة س7 ص 194.' }],
  parts: [{ id: 'g11_o_review', n: 'مسائل الفصل محلولة خطوة خطوة' }] });
/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g11_o_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f && !D._tap) { D._tap = 1; D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); } });
Object.keys(M8.P).filter(id => /^g11_o_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });
