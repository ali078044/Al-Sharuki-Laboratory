'use strict';
/* ====================== الرابع العلمي — الفصل الثاني: الخصائص الميكانيكية للمادة (ch 42, ص 15–27) ======================
   Merged experiments (book order): g10_hooke (1-2) · g10_stress (2-2) · g10_young (3-2) · g10_props (4-2)
   Parts live in M8.P and are merged at the end (reg: X10). Everything by hand: hang weights, pull, press, hammer, scratch.
   Local kit Q42 (text, cards, chip buttons, step-by-step solutions, spring, slotted weights, rulers, stand, blocks). */
LW({ id: 'g10_hooke', cat: 42, name: 'قانون هوك', fx: '<i>F</i> = <i>k</i> Δ<i>L</i>', sym: 'قوة الشد = ثابت مرونة النابض × الاستطالة، ضمن حدود المرونة. k ثابت مرونة النابض (N/m) يمثل ميل الخط المستقيم ولا يتغير إلا بتغير شكل النابض أو مادته', calc: { in: [['k', 'ثابت النابض k', 'N/m', 33.3], ['dL', 'الاستطالة ΔL', 'm', .003]], out: 'قوة الشد F', u: 'N', f: v => v.k * v.dL } });
LW({ id: 'g10_stress', cat: 42, name: 'الإجهاد', fx: '<i>σ</i> = ' + FR('<i>F</i>', '<i>A</i>') + ' (N/m²)', sym: 'مقدار القوة العمودية المؤثرة في وحدة المساحة من الجسم. أنواعه: إجهاد الشد، إجهاد الكبس، إجهاد القص (القوة المماسة للسطح ÷ مساحته)', calc: { in: [['F', 'القوة F', 'N', 30], ['A', 'المساحة A', 'm²', 1.5e-6]], out: 'الإجهاد', u: 'N/m²', f: v => v.F / v.A } });
LW({ id: 'g10_strain', cat: 42, name: 'المطاوعة النسبية', fx: FR('Δ<i>L</i>', '<i>L</i><sub>o</sub>') + ' ، ' + FR('Δ<i>V</i>', '<i>V</i><sub>o</sub>') + ' ، <i>θ</i>', sym: 'مقياس لمقدار تشوه المادة نتيجة الإجهاد: المطاوعة الطولية = التغير في الطول ÷ الطول الأصلي، مطاوعة الحجم = التغير في الحجم ÷ الحجم الأصلي، مطاوعة القص تقاس بالزاوية θ. ليس لها وحدة', calc: { in: [['dL', 'التغير في الطول ΔL', 'm', .05], ['L', 'الطول الأصلي Lo', 'm', .4]], out: 'المطاوعة الطولية', u: '', f: v => v.dL / v.L } });
LW({ id: 'g10_young', cat: 42, name: 'معامل يونك', fx: '<i>Y</i> = ' + FR('<i>F</i> / <i>A</i>', 'Δ<i>L</i> / <i>L</i><sub>o</sub>') + ' = ' + FR('<i>F</i> <i>L</i><sub>o</sub>', '<i>A</i> Δ<i>L</i>'), sym: 'معامل المرونة: النسبة بين الإجهاد والمطاوعة النسبية، وحدته N/m² ، وهو صفة مميزة للمواد الصلبة (الفولاذ 200×10⁹ ، النحاس 120×10⁹ ، الألمنيوم 70×10⁹ N/m²)', calc: { in: [['F', 'القوة F', 'N', 500], ['L', 'الطول الأصلي Lo', 'm', 4], ['A', 'مساحة المقطع A', 'm²', 5e-6], ['Y', 'معامل يونك Y', 'N/m²', 2e11]], out: 'الزيادة في الطول ΔL', u: 'm', f: v => v.F * v.L / (v.Y * v.A) } });
LW({ id: 'g10_tough', cat: 42, name: 'المتانة', fx: 'المتانة = ' + FR('القوة القاطعة', 'المساحة') + ' (N/m²)', sym: 'خاصية المادة لمقاومة القوة القاطعة لها. القوة اللازمة لقطع سلك تتناسب مع مساحة مقطعه ولا تعتمد على طوله' });

const Q42 = {
  T(ctx, s, x, y, o) { Q31.T(ctx, s, x, y, o); },
  card(ctx, S, L, o) { return Q31.card(ctx, S, L, Object.assign({ bd: '#0f766e' }, o || {})); },
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#0f766e', y); },
  btn(id, b, click, o) { return Q31.btn(id, b, click, o); },
  drawBtn(ctx, b, label, col, on) { Q31.drawBtn(ctx, b, label, col, on); },
  sci(v, d = 3, u = '') { return Q31.sci(v, d, u); },
  L(S) { return S.W < 600 ? 12 : 76; },
  chips(S, id, list, y, cur, click, o = {}) {
    const ph = S.W < 600, L = o.x0 != null ? o.x0 : Q42.L(S), R = o.x1 != null ? o.x1 : S.W - 12, gap = 6, n = list.length;
    const bw = Math.min(o.bw || 150, (R - L - gap * (n - 1)) / n), bh = o.bh || (ph ? 30 : 34); const out = [];
    list.forEach((q, i) => { const x = L + bw / 2 + i * (bw + gap); const b = Q42.btn(id + '_' + q[0], { x, y, w: bw, h: bh }, S2 => click(S2, q[0]), { tip: q[2] || q[1] }); b._lab = q[1]; b._on = cur === q[0]; b._col = o.col; out.push(b); });
    return out;
  },
  drawChips(ctx, list) { list.forEach(b => Q42.drawBtn(ctx, b, b._lab, b._on ? (b._col || '#0f766e') : '#64748b', b._on)); },
  steps(ctx, S, st, o = {}) {
    const L = [{ t: st.q, s: 12, c: '#334155', w: 800 }].concat(st.lines.slice(0, st.k).map((t, i) => ({ t, mono: /[=×÷]/.test(t) && !/[؀-ۿ]/.test(t) ? 1 : 0, c: i === st.lines.length - 1 ? '#b91c1c' : '#1e293b', w: i === st.lines.length - 1 ? 900 : 700 })));
    if (st.k < st.lines.length) L.push({ t: '⬇ اضغط «الخطوة التالية» (' + st.k + '/' + st.lines.length + ')', c: '#0f766e', s: 11.5, w: 800 });
    return Q42.card(ctx, S, L, Object.assign({ title: st.title, bd: '#be185d' }, o));
  },
  /* helical spring from (x,y0) to (x,y1) */
  spring(ctx, x, y0, y1, o = {}) {
    const n = o.n || 14, r = o.r || 12, lead = o.lead != null ? o.lead : 10;
    K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; const a = y0 + lead, b = y1 - lead, L = b - a;
      ctx.strokeStyle = o.col || '#475569'; ctx.lineWidth = o.w || 2.6; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, a); ctx.moveTo(x, b); ctx.lineTo(x, y1); ctx.stroke();
      for (let pass = 0; pass < 2; pass++) { ctx.strokeStyle = pass ? (o.hi || '#cbd5e1') : (o.col || '#475569'); ctx.lineWidth = pass ? (o.w || 2.6) * .45 : (o.w || 2.6); ctx.beginPath();
        for (let i = 0; i <= n * 24; i++) { const t = i / (n * 24), ph = t * n * TAU, xx = x + Math.sin(ph) * r, yy = a + t * L + Math.cos(ph) * Math.min(3, L / n * .25); i ? ctx.lineTo(xx - (pass ? .8 : 0), yy - (pass ? .8 : 0)) : ctx.moveTo(xx, yy); } ctx.stroke(); }
      ctx.restore(); });
  },
  /* slotted weight disc centred at (x,y) */
  weight(ctx, x, y, w = 34, h = 11, label, col) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); const c = col || ['#9ca3af', '#f3f4f6', '#4b5563']; g.addColorStop(0, c[0]); g.addColorStop(.45, c[1]); g.addColorStop(1, c[2]); ctx.fillStyle = g; rr(ctx, x - w / 2, y - h / 2, w, h, 3); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.45)'; ctx.lineWidth = 1; ctx.stroke(); ctx.fillStyle = 'rgba(15,23,42,.55)'; ctx.fillRect(x - 1.5, y - h / 2, 3, h * .6); });
    if (label) Q42.T(ctx, label, x + w / 2 + 16, y, { s: 9.5, w: 800, c: '#334155' });
  },
  /* retort stand: base at (x, by), rod to top, arm to the right ending at ax */
  stand(ctx, x, top, by, ax) {
    K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, x - 40, by - 10, 110, 10, 3); ctx.fill(); const g = ctx.createLinearGradient(x - 4, 0, x + 4, 0); g.addColorStop(0, '#6b7280'); g.addColorStop(.5, '#e5e7eb'); g.addColorStop(1, '#4b5563'); ctx.fillStyle = g; ctx.fillRect(x - 4, top - 10, 8, by - top); ctx.fillRect(x, top - 10, ax - x + 6, 7); ctx.fillStyle = '#1f2937'; ctx.fillRect(x - 8, top - 14, 16, 14); });
  },
  /* vertical ruler: 0 at y0 going down, pxcm px per unit, n units */
  vruler(ctx, x, y0, pxu, n, o = {}) {
    K.raw(ctx, () => { ctx.fillStyle = o.bg || '#fef3c7'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; rr(ctx, x - 4, y0 - 8, o.w || 34, pxu * n + 16, 3); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#78350f';
      const sub = o.sub || 10; for (let k = 0; k <= n * sub; k++) { const y = y0 + k * pxu / sub, L = k % sub === 0 ? 12 : k % (sub / 2) === 0 ? 8 : 4; ctx.lineWidth = k % sub ? .7 : 1.3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + L, y); ctx.stroke(); } });
    for (let k = 0; k <= n; k += (o.step || 1)) Q42.T(ctx, String(k * (o.mul || 1)), x + 22, y0 + k * pxu, { s: 9.5, w: 800, c: '#78350f' });
    if (o.unit) Q42.T(ctx, o.unit, x + 13, y0 - 18, { s: 10, w: 900, c: '#78350f' });
  },
  /* pseudo-3D box: front rect (x,y,w,h) with depth d */
  box(ctx, x, y, w, h, d, col, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = o.alpha ?? 1; ctx.fillStyle = shade(col, 25); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + d, y - d * .6); ctx.lineTo(x + w + d, y - d * .6); ctx.lineTo(x + w, y); ctx.closePath(); ctx.fill();
      ctx.fillStyle = shade(col, -25); ctx.beginPath(); ctx.moveTo(x + w, y); ctx.lineTo(x + w + d, y - d * .6); ctx.lineTo(x + w + d, y + h - d * .6); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fill();
      ctx.fillStyle = col; ctx.fillRect(x, y, w, h); ctx.strokeStyle = 'rgba(15,23,42,.4)'; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, h); ctx.restore(); });
  },
  /* jagged crack across a vertical line at x from y0 to y1 */
  crack(ctx, x, y0, y1, a = 1) { K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#111827'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y0); for (let y = y0; y <= y1; y += 7) ctx.lineTo(x + ((y * 7) % 11 - 5) * .9, y); ctx.stroke(); ctx.restore(); }); },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f0fdfa'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); }
};

/* =============== A1 — المرونة: المطاط والنابض وسلك الفولاذ (مقدمة + الشكل 1-2، ص 15) =============== */
(() => {
  const OB = [['rub', 'شريط مطاط', 100, '#b45309'], ['spr', 'نابض حلزوني', 300, '#475569'], ['stl', 'سلك فولاذ (1 m ، 0.5 mm²)', 1e5, '#64748b']];
  const FMAX = 200; // the strongest pull of a hand (N)
  const D = { id: 'g10_k_band', page: 15, fig: 'الشكل 1-2',
    desc: 'إذا سحبنا حبلاً من المطاط من طرفيه بقوة فإنه يقاوم المط ولكن طوله يتمدد متأثراً بالقوة، وعند تركه يرجع إلى طوله الأصلي. وإذا علّقنا ثقلاً بسلك من الفولاذ فإنه يستطيل قليلاً، فإذا زال الثقل عاد السلك إلى طوله الأصلي. يعتمد التشوه على: مقدار القوة الخارجية، وأبعاد الجسم، والمادة المصنوع منها.',
    tags: 'مرونة مطاط سلك فولاذ نابض تشوه قوة خارجية عوامل التشوه F=kΔL',
    tools: ['شريط مطاط', 'نابض حلزوني', 'سلك فولاذ'],
    steps: ['امسك المقبض الأحمر أسفل كل جسم واسحبه إلى الأسفل: لاحظ الاستطالة ΔL والقوة F.', 'اترك المقبض: هل يعود الجسم إلى طوله الأصلي؟', 'اسحب سلك الفولاذ بأقصى قوة يد (200 N): لماذا لا تكاد ترى استطالته؟', 'اضغط «F ثم 2F» في الأسفل لترى أن مضاعفة القوة تضاعف الاستطالة (الشكل 1-2).'],
    concl: ['الجسم المرن يقاوم القوة المؤثرة فيه، ويعود إلى شكله أو طوله السابق بعد زوال تأثيرها.', 'يعتمد التشوه على: مقدار القوة الخارجية، وأبعاد الجسم، والمادة المصنوع منها.', 'مضاعفة القوة تضاعف الاستطالة: F = k ΔL (الشكل 1-2).', 'قوى التجاذب الجزيئي بين جزيئات المادة هي التي تقاوم القوة الخارجية وتعيد الجسم إلى حالته الأصلية.'],
    laws: ['g10_hooke'],
    controls: [TG('mol', 'جزيئات المادة (قوى التجاذب)', false, null, 'particles')],
    setup(S) { S.e = [0, 0, 0]; S.v = [0, 0, 0]; S.hold = -1; S.f2 = 0; S.f2t = 0; },
    update(S, dt) { for (let i = 0; i < 3; i++) if (S.hold !== i) { const a = -60 * S.e[i] - 6 * S.v[i]; S.v[i] += a * dt; S.e[i] += S.v[i] * dt; if (Math.abs(S.e[i]) < .05 && Math.abs(S.v[i]) < .5) { S.e[i] = 0; S.v[i] = 0; } } if (S.f2) S.f2t = Math.min(1, S.f2t + dt * .8); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), top = ph ? 84 : 92, L0 = ph ? 110 : 140; const xs = [0, 1, 2].map(i => L + (w - L) * (ph ? .2 + i * .3 : .16 + i * .17)); return { w, h, ph, L, top, L0, xs }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5; Q42.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(g.xs[0] - 50, g.top - 16, g.xs[2] - g.xs[0] + 100, 14); ctx.strokeStyle = '#1e293b'; for (let x = g.xs[0] - 50; x < g.xs[2] + 50; x += 10) { ctx.beginPath(); ctx.moveTo(x, g.top - 16); ctx.lineTo(x + 8, g.top - 26); ctx.stroke(); } });
      OB.forEach((o, i) => { const x = g.xs[i], e = S.e[i], y1 = g.top + g.L0 + e, F = o[2] * e / 1000;
        if (o[0] === 'rub') K.raw(ctx, () => { const th = 10 * Math.sqrt(g.L0 / (g.L0 + e)); ctx.fillStyle = '#d97706'; rr(ctx, x - th / 2, g.top - 2, th, y1 - g.top + 2, 4); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.stroke(); });
        else if (o[0] === 'spr') Q42.spring(ctx, x, g.top - 2, y1, { n: 14, r: 13 });
        else K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, g.top - 2); ctx.lineTo(x, y1); ctx.stroke(); });
        if (S.p.mol) for (let k = 1; k < 7; k++) { const yy = g.top + (y1 - g.top) * k / 7; K.raw(ctx, () => { ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.arc(x + 22, yy, 4, 0, TAU); ctx.fill(); if (k > 1) { ctx.strokeStyle = 'rgba(14,165,233,.6)'; ctx.lineWidth = 1.2; ctx.beginPath(); for (let j = 0; j <= 12; j++) { const t = j / 12, y = yy - (y1 - g.top) / 7 * (1 - t); ctx.lineTo(x + 22 + Math.sin(t * 6 * Math.PI) * 3, y); } ctx.stroke(); } }); }
        // grip
        K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; rr(ctx, x - 18, y1, 36, 14, 5); ctx.fill(); ctx.strokeStyle = '#7f1d1d'; ctx.stroke(); });
        if (S.hold === i) C2.hand(ctx, x - 6, y1 + 18, 1, g.ph ? .7 : .85, { rot: Math.PI / 2 });
        if (F > .05) K.force(ctx, x + 26, y1 + 8, 0, clamp(F * .8, 18, 90), 'F', '#dc2626', 3);
        Q42.T(ctx, o[1], x, g.top - 40, { s: fs, w: 900, c: '#fff', bg: o[3] });
        Q42.T(ctx, 'ΔL = ' + (e < 1 && e > 0 ? (e).toFixed(2) : e.toFixed(0)) + ' mm', x, y1 + 40, { s: fs, w: 900, c: '#0f172a' });
        Q42.T(ctx, 'F = ' + F.toFixed(F < 10 ? 1 : 0) + ' N', x, y1 + 58, { s: fs, w: 900, c: '#dc2626' });
        if (o[0] === 'stl' && S.hold === i && e > 1) Q42.T(ctx, 'أقصى قوة يد 200 N ← استطالة 2 mm فقط!', x, y1 + 78, { s: fs - 1, w: 800, c: '#fff', bg: '#7c3aed' });
      });
      // fig 1-2: F and 2F
      const by = h - (g.ph ? 60 : 56); const B = Q42.btn('f2', { x: g.L + 110, y: by, w: 200, h: 34 }, () => { }); Q42.drawBtn(ctx, B, S.f2 ? '↺ أعد الشكل 1-2' : '▶ الشكل 1-2: F ثم 2F', '#0f766e');
      if (S.f2 && !g.ph) { const x0 = g.xs[2] + 120, t = S.f2t, top = g.top + 10, Ls = 60, d1 = 50 * Math.min(1, t * 2), d2 = 100 * Math.min(1, t * 2); [[x0, d1, 'F', 'L'], [x0 + 80, d2, '2F', '2L']].forEach(q => { Q42.spring(ctx, q[0], top, top + Ls + q[1], { n: 10, r: 9 }); Q42.weight(ctx, q[0], top + Ls + q[1] + 10, 30, q[2] === 'F' ? 16 : 26); Q42.T(ctx, q[2], q[0], top + Ls + q[1] + 36, { s: 13, w: 900, c: '#dc2626' }); K.raw(ctx, () => { ctx.strokeStyle = '#0f172a'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(q[0] - 26, top + Ls); ctx.lineTo(q[0] + 26, top + Ls); ctx.stroke(); ctx.setLineDash([]); }); Q42.T(ctx, q[3], q[0] + 30, top + Ls + q[1] / 2, { s: 12, w: 900, c: '#0f766e' }); }); Q42.T(ctx, 'F = k ΔL', x0 + 40, top - 14, { s: 13, w: 900, c: '#0f172a' }); }
      if (!g.ph && !S.f2) Q42.card(ctx, S, [{ t: '1) مقدار القوة الخارجية المؤثرة', c: '#b45309', w: 900 }, { t: '2) أبعاد الجسم', c: '#b45309', w: 900 }, { t: '3) المادة المصنوع منها', c: '#b45309', w: 900 }], { title: 'يعتمد التشوه على', y: 44, wd: 270 });
      Q42.banner(ctx, w, 'اسحب المقبض الأحمر إلى الأسفل ثم اتركه');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); const L = OB.map((o, i) => { const y1 = g.top + g.L0 + S.e[i]; return { id: 'pull' + i, x: g.xs[i], y: y1 + 7, r: 26, axis: 'y', keep: true, tip: 'اسحب إلى الأسفل', idle: i === 0 ? 'اسحب المقبض ✋' : undefined, down: S2 => { S2.hold = i; S2.v[i] = 0; }, up: S2 => { S2.hold = -1; }, drag: (S2, d) => { const want = clamp(d.y - g.top - g.L0, 0, g.ph ? 130 : 170); S2.e[i] = Math.min(want, FMAX / o[2] * 1000); } }; });
      L.push(Q42.btn('f2', { x: g.L + 110, y: g.h - (g.ph ? 60 : 56), w: 200, h: 34 }, S2 => { S2.f2 = S2.f2 ? 0 : 1; S2.f2t = 0; }, { tip: 'الشكل 1-2' })); return L; },
    readings(S) { return OB.map((o, i) => rd(o[1], 'ΔL = ' + S.e[i].toFixed(1) + ' mm ، F = ' + (o[2] * S.e[i] / 1000).toFixed(1) + ' N')); },
    explain(S) { return Q26.ex('كل جسم يستطيل عند سحبه ثم يعود إلى طوله الأصلي عند تركه، لكن بمقادير مختلفة جداً: المطاط كثيراً وسلك الفولاذ لا يكاد يُرى.', 'القوة الخارجية تبعد الجزيئات قليلاً عن بعضها، فتقاومها قوى التجاذب الجزيئي وتعيد الجسم إلى حالته الأصلية بعد زوالها: هذه هي <b>المرونة</b>. ومقدار التشوه يعتمد على القوة وأبعاد الجسم ومادته.', 'الغازات لا تحتفظ بشكلها ولا بحجمها، والسوائل تحتفظ بحجمها فقط، أما المواد الصلبة فتحتفظ بشكلها ما لم تؤثر فيها قوى كافية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — نشاط مفهوم المرونة: النابض والأثقال 0.1 N (الشكلان 2-2، 3-2، الجدول 1، الشكل 4-2) =============== */
(() => {
  const SP = { A: ['A (نابض الكتاب)', 100 / 3], B: ['B (أصلب)', 200 / 3], C: ['C (أضعف)', 20] };
  const NW = 6, WN = .1, PXCM = 34; // weights, 0.1 N each, px per cm on the ruler
  const D = { id: 'g10_k_activity', page: 16, fig: 'الشكلان 2-2 و 3-2 + الجدول (1) + الشكل 4-2',
    desc: 'نشاط مفهوم المرونة: نعلّق النابض الحلزوني شاقولياً بحامل حديد ونثبت مؤشراً على حلقته السفلى أمام مسطرة مدرجة، ثم نعلّق أثقالاً متساوية مقدار كل منها 0.1 N ونسجل الزيادة في طول النابض، ونرسم العلاقة البيانية بين الأثقال والاستطالة.',
    tags: 'نشاط مفهوم المرونة قانون هوك نابض حلزوني أثقال 0.1N استطالة ثابت مرونة النابض الجدول 1 الشكل 4-2',
    tools: ['نابض حلزوني', 'أثقال متساوية مقدار كل منها 0.1 N', 'حامل حديد', 'مسطرة مدرجة', 'مؤشر', 'ورقة رسم بياني'],
    steps: ['اسحب ثقلاً (0.1 N) من الصندوق وعلّقه في كفة النابض (أو اضغط على الصندوق)، ولاحظ المؤشر على المسطرة.', 'سجّل القراءة (زر «سجّل القراءة»)، ثم علّق ثقلاً آخر ليصبح المقدار الكلي 0.2 N: الزيادة ضعف السابقة (الشكل 3-2).', 'كرّر حتى 0.4 N وسجّل في الجدول (1)، ولاحظ الرسم البياني F مع ΔL (الشكل 4-2).', 'أنزل الأثقال (اسحبها من الكفة أو اضغط عليها): هل يعود النابض إلى وضعه السابق؟ جرّب نابضاً آخر.'],
    concl: ['الزيادة الحاصلة في طول النابض تتناسب طردياً مع قوة الشد ضمن حدود المرونة.', 'قوة الشد = ثابت مرونة النابض × الاستطالة: F = k ΔL (قانون هوك).', 'k ثابت مرونة النابض: يمثل ميل الخط المستقيم ويقاس بوحدة N/m، ولا يتغير إلا بتغير شكل النابض أو مادته.', 'النابض يعود إلى وضعه السابق فور زوال القوة (المرونة).'],
    laws: ['g10_hooke'],
    controls: [TG('gr', 'الرسم البياني (الشكل 4-2)', true, null, 'graph')],
    setup(S) { S.n = 0; S.sp = 'A'; S.y = 0; S.vy = 0; S.drag = null; },
    k(S) { return SP[S.sp][1]; },
    target(S) { return S.n * WN / D.k(S) * 100 * PXCM; }, // px
    update(S, dt) { const T = D.target(S); const a = -70 * (S.y - T) - 7 * S.vy; S.vy += a * dt; S.y += S.vy * dt; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), sx = L + (ph ? 60 : 90), top = ph ? 100 : 86, by = h - (ph ? 110 : 70), hx = sx + 110; return { w, h, ph, L, sx, top, by, hx, L0: ph ? 150 : 190, tx: hx + (ph ? 110 : 150) }; },
    hookY(S, g) { return g.top + g.L0 + S.y; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, k = D.k(S), hy = D.hookY(S, g), F = S.n * WN, dL = S.n * WN / k;
      Q42.bg(ctx, w, h); K.raw(ctx, () => { ctx.fillStyle = '#7c2d12'; ctx.fillRect(g.L, g.by, w - g.L, 12); ctx.fillStyle = '#a16207'; ctx.fillRect(g.L + 30, g.by + 12, 10, h - g.by); ctx.fillRect(w - 50, g.by + 12, 10, h - g.by); });
      Q42.stand(ctx, g.sx, g.top, g.by, g.hx);
      // ruler behind the pointer
      const r0 = g.top + g.L0 - PXCM * .5; Q42.vruler(ctx, g.hx - 70, g.top + g.L0, PXCM, 6, { unit: 'cm', step: 1, sub: 10 });
      Q42.spring(ctx, g.hx, g.top - 4, hy, { n: 16, r: 13 });
      // pointer
      K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(g.hx, hy); ctx.lineTo(g.hx - 36, hy); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(g.hx - 40, hy); ctx.lineTo(g.hx - 32, hy - 5); ctx.lineTo(g.hx - 32, hy + 5); ctx.fill(); });
      void r0;
      // hanger + weights
      K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.hx, hy); ctx.lineTo(g.hx, hy + 18); ctx.moveTo(g.hx - 22, hy + 18 + S.n * 12 + 6); ctx.lineTo(g.hx, hy + 18); ctx.lineTo(g.hx + 22, hy + 18 + S.n * 12 + 6); ctx.stroke(); ctx.fillStyle = '#475569'; ctx.fillRect(g.hx - 24, hy + 22 + S.n * 12, 48, 5); });
      for (let i = 0; i < S.n; i++) Q42.weight(ctx, g.hx, hy + 22 + S.n * 12 - 6 - i * 12, 34, 11);
      Q42.T(ctx, 'كفة الميزان', g.hx + 64, hy + 30 + S.n * 12, { s: fs - 1, w: 800, c: '#475569' });
      // tray
      const left = NW - S.n; K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#64748b'; rr(ctx, g.tx - 34, g.by - 16 - 6 * 12, 68, 6 * 12 + 16, 6); ctx.fill(); ctx.stroke(); });
      for (let i = 0; i < left; i++) if (!(S.drag === 'tray' && i === left - 1)) Q42.weight(ctx, g.tx, g.by - 12 - i * 12, 34, 11);
      Q42.T(ctx, 'أثقال 0.1 N', g.tx, g.by + 22, { s: fs, w: 900, c: '#0f172a' });
      if (S.drag && S.dp) Q42.weight(ctx, S.dp[0], S.dp[1], 34, 11);
      // readings near the pointer
      Q42.T(ctx, 'F = ' + F.toFixed(1) + ' N', g.hx + 70, hy - 26, { s: fs + 1, w: 900, c: '#fff', bg: '#dc2626' });
      Q42.T(ctx, 'ΔL = ' + (dL * 100).toFixed(1) + ' cm', g.hx + 70, hy - 4, { s: fs + 1, w: 900, c: '#0f172a', bg: '#fde047' });
      // spring chips
      const C = Q42.chips(S, 'sp', Object.keys(SP).map(q => [q, SP[q][0]]), g.ph ? h - 120 : 100, S.sp, () => { }, { bw: 140, x0: g.ph ? 12 : g.tx + 80, x1: w - 12 }); if (!g.ph) Q42.drawChips(ctx, C); else Q42.drawChips(ctx, C);
      // table + graph
      if (S.p.gr !== false) { const gx = g.ph ? 20 : g.tx + 90, gy = g.ph ? g.by + 22 : 156, gw = g.ph ? w - 40 : Math.min(360, w - gx - 24), gh = g.ph ? 0 : Math.min(250, g.by - gy - 60);
        if (gh > 60) { K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, gx - 10, gy - 24, gw + 30, gh + 64, 8); ctx.fill(); ctx.stroke(); ctx.strokeStyle = 'rgba(219,39,119,.15)'; for (let k2 = 0; k2 <= 10; k2++) { ctx.beginPath(); ctx.moveTo(gx + 30 + k2 * (gw - 40) / 10, gy); ctx.lineTo(gx + 30 + k2 * (gw - 40) / 10, gy + gh); ctx.stroke(); ctx.beginPath(); ctx.moveTo(gx + 30, gy + k2 * gh / 10); ctx.lineTo(gx + gw - 10, gy + k2 * gh / 10); ctx.stroke(); } ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx + 30, gy); ctx.lineTo(gx + 30, gy + gh); ctx.lineTo(gx + gw - 10, gy + gh); ctx.stroke(); });
          const xmax = 3.6, ymax = .6, X = v => gx + 30 + v / xmax * (gw - 40), Y = v => gy + gh - v / ymax * gh;
          for (let v = 0; v <= xmax + 1e-6; v += .6) Q42.T(ctx, v.toFixed(1), X(v), gy + gh + 12, { s: 9, w: 700, c: '#334155' }); for (let v = 0; v <= ymax + 1e-6; v += .1) Q42.T(ctx, v.toFixed(1), gx + 16, Y(v), { s: 9, w: 700, c: '#334155' });
          Q42.T(ctx, 'ΔL (×10⁻² m)', X(xmax) - 30, gy + gh + 28, { s: 10, w: 800, c: '#0f172a' }); Q42.T(ctx, 'F (N)', gx + 44, gy - 14, { s: 10, w: 800, c: '#0f172a' });
          K.raw(ctx, () => { ctx.strokeStyle = '#0f766e'; ctx.lineWidth = 1.6; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(0), Y(0)); const xe = Math.min(xmax, ymax / k * 100); ctx.lineTo(X(xe), Y(xe / 100 * k)); ctx.stroke(); ctx.setLineDash([]); });
          (S.rows || []).forEach(r => { if (r.sp !== S.sp) return; K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(X(r.L), Y(r.F), 4.5, 0, TAU); ctx.fill(); }); });
          K.raw(ctx, () => { ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(X(dL * 100), Y(F), 6, 0, TAU); ctx.fill(); });
          Q42.T(ctx, 'ميل الخط = k = ΔF / ΔL = ' + k.toFixed(1) + ' N/m', gx + gw / 2 + 10, gy + gh + 44, { s: 10.5, w: 900, c: '#0f766e' });
        } }
      const rb = Q42.btn('rec', { x: g.ph ? w - 90 : w - 92, y: g.ph ? 40 : h - 84, w: 150, h: 32 }, () => { }); Q42.drawBtn(ctx, rb, '📋 سجّل القراءة', '#15803d');
      Q42.banner(ctx, w, 'اسحب ثقلاً من الصندوق وعلّقه في كفة النابض');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), hy = D.hookY(S, g), L = [];
      L.push({ id: 'tray', x: g.tx, y: g.by - 40, w: 76, h: 90, axis: 'xy', keep: false, tip: 'اسحب ثقلاً إلى الكفة — أو اضغط', idle: 'علّق ثقلاً ✋', click: S2 => { if (S2.n < NW) S2.n++; }, down: (S2, x, y) => { S2.drag = 'tray'; S2.dp = [x, y]; }, drag: (S2, d) => { if (S2.n >= NW) return; S2.drag = 'tray'; S2.dp = [d.x, d.y]; }, up: S2 => { if (S2.drag === 'tray' && S2.dp && Math.abs(S2.dp[0] - g.hx) < 60 && Math.abs(S2.dp[1] - (hy + 40)) < 90 && S2.n < NW) S2.n++; S2.drag = null; S2.dp = null; } });
      if (S.n > 0) L.push({ id: 'hang', x: g.hx, y: hy + 22 + S.n * 6, w: 60, h: S.n * 12 + 30, axis: 'xy', keep: false, tip: 'اسحب الثقل لإنزاله — أو اضغط', click: S2 => { if (S2.n > 0) S2.n--; }, drag: (S2, d) => { if (!S2.lift) { S2.lift = 1; S2.n--; S2.drag = 'hang'; } S2.dp = [d.x, d.y]; }, up: S2 => { if (S2.lift && S2.dp && Math.abs(S2.dp[0] - g.hx) < 50 && Math.abs(S2.dp[1] - (hy + 40)) < 70) S2.n++; S2.lift = 0; S2.drag = null; S2.dp = null; } });
      L.push(...Q42.chips(S, 'sp', Object.keys(SP).map(q => [q, SP[q][0]]), g.ph ? g.h - 120 : 100, S.sp, (S2, k) => { S2.sp = k; }, { bw: 140, x0: g.ph ? 12 : g.tx + 80, x1: g.w - 12 }));
      L.push(Q42.btn('rec', { x: g.ph ? g.w - 90 : g.w - 92, y: g.ph ? 40 : g.h - 84, w: 150, h: 32 }, () => { const b = document.getElementById('recBtn'); b && b.click(); }, { tip: 'سجّل القراءة في الجدول (1)' }));
      return L; },
    readings(S) { const k = D.k(S); return [rd('الثقل المعلق F', (S.n * WN).toFixed(1) + ' N'), rd('الاستطالة ΔL', (S.n * WN / k * 100).toFixed(2) + ' ×10⁻² m'), rd('ثابت النابض k = F/ΔL', k.toFixed(1) + ' N/m')]; },
    record(S) { const k = D.k(S); return { sp: S.sp, F: +(S.n * WN).toFixed(1), L: +(S.n * WN / k * 100).toFixed(2), k: S.n ? +k.toFixed(1) : '—' }; },
    cols: [['sp', 'النابض'], ['F', 'F (N)'], ['L', 'ΔL (×10⁻² m)'], ['k', 'k = F/ΔL (N/m)']],
    graph: { x: 'L', y: 'F', xl: 'الاستطالة ΔL (×10⁻² m)', yl: 'الثقل F (N)' },
    explain(S) { const k = D.k(S), F = S.n * WN; return Q26.ex(S.n ? 'علّقت ' + S.n + ' ' + (S.n > 2 ? 'أثقال' : 'ثقل') + ' (F = ' + F.toFixed(1) + ' N) فاستطال النابض ' + (F / k * 100).toFixed(2) + ' ×10⁻² m.' : 'النابض بطوله الأصلي: لا يوجد ثقل.', 'كل ثقل 0.1 N يزيد طول النابض المقدار نفسه، فالاستطالة تتناسب طردياً مع قوة الشد: <b>F = k ΔL</b> (قانون هوك). ثابت هذا النابض k = ' + k.toFixed(1) + ' N/m وهو ميل الخط المستقيم في الشكل 4-2.', 'ميزان النابض في الأسواق والمختبر يعمل بقانون هوك.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — أنواع الإجهاد: الشد والكبس والقص (2-2، الأشكال 5-2، 6-2، 7-2) =============== */
(() => {
  const D = { id: 'g10_s_types', page: 18, fig: 'الأشكال 5-2 و 6-2 و 7-2',
    desc: 'الإجهاد: مقدار القوة العمودية المؤثرة في وحدة المساحة من الجسم، ويقاس بوحدة N/m². إجهاد الشد: قوتا شد عموديتان في سطحين متقابلين تؤديان إلى زيادة في الطول. إجهاد الكبس: قوتان عموديتان باتجاه الداخل تسببان نقصاناً في الطول. إجهاد القص: قوة مماسة للسطح تسبب تشوه شكله (كتاب على منضدة تدفعه يدك).',
    tags: 'إجهاد شد كبس قص قوة عمودية مساحة N/m2 tensile compressive shear stress',
    tools: ['ساق من مادة صلبة', 'كتاب على منضدة'],
    steps: ['في «شد وكبس»: اسحب المقبض الأيمن إلى الخارج (شد) أو إلى الداخل (كبس) ولاحظ تغير الطول ونوع الإجهاد.', 'غيّر مساحة المقطع A بالمنزلق: لماذا يقل الإجهاد مع أن القوة نفسها؟', 'زد القوة كثيراً: تظهر شقوق ثم ينكسر الجسم (الشكلان 5-2 و 6-2).', 'في «القص»: ضع يدك على الكتاب واسحبها جانباً، ولاحظ تشوه شكله وقوة الاحتكاك من المنضدة (الشكل 7-2).'],
    concl: ['الإجهاد = القوة العمودية ÷ المساحة ، ويقاس بوحدة N/m².', 'إجهاد الشد يزيد طول الجسم، وإجهاد الكبس ينقص طوله.', 'إجهاد القص = القوة المماسة للسطح ÷ مساحة السطح الذي تؤثر فيه القوة، ويغير شكل الجسم.', 'للقوة نفسها: كلما كبرت مساحة المقطع قلّ الإجهاد.'],
    laws: ['g10_stress'],
    controls: [R('A', 'مساحة المقطع A', 1, 10, 4, 1, 'cm²')],
    setup(S) { S.m = 'ts'; S.u = 0; S.sx = 0; S.br = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S); return { w, h, ph, L, cx: L + (w - L) * (ph ? .5 : .42), cy: h * (ph ? .4 : .48) }; },
    F(S) { return S.m === 'ts' ? S.u * 60 : S.sx * 40; }, // N
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10.5 : 12, A = S.p.A, F = D.F(S), sig = Math.abs(F) / (A * 1e-4), lim = 6e6;
      Q42.bg(ctx, w, h);
      if (S.m === 'ts') {
        const bw = g.ph ? 150 : 220, bh = 30 + A * 6, dl = S.u * 1.2, x0 = g.cx - bw / 2, x1 = g.cx + bw / 2 + dl, y = g.cy - bh / 2, crackA = clamp((sig - lim * .6) / (lim * .4), 0, 1);
        if (S.br) { Q42.box(ctx, x0 - 20, y, bw / 2, bh, 16, '#a8a29e'); Q42.box(ctx, g.cx + 20, y, bw / 2 + dl, bh, 16, '#a8a29e'); Q26.verdict(ctx, g.cx, y - 40, false, F > 0 ? 'انقطع الجسم بإجهاد الشد!' : 'تهشّم الجسم بإجهاد الكبس!'); }
        else { Q42.box(ctx, x0, y, x1 - x0, bh, 16, F < 0 ? '#c4b5a5' : '#d6d3d1'); if (crackA > 0) Q42.crack(ctx, g.cx + dl / 2, y, y + bh, crackA); }
        K.raw(ctx, () => { ctx.strokeStyle = '#0f172a'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(g.cx + bw / 2, y - 20); ctx.lineTo(g.cx + bw / 2, y + bh + 20); ctx.stroke(); ctx.setLineDash([]); });
        if (Math.abs(F) > 1) { const dir = F > 0 ? 1 : -1, L = clamp(Math.abs(F) / 6, 26, 110); K.force(ctx, dir > 0 ? x1 + 10 : x1 + 10 + L, g.cy, dir * L, 0, 'F', '#dc2626', 3.5); K.force(ctx, dir > 0 ? x0 - 10 : x0 - 10 - L, g.cy, -dir * L, 0, 'F', '#dc2626', 3.5); }
        K.raw(ctx, () => { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x1 + 2, g.cy, 11, 0, TAU); ctx.fill(); ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; ctx.stroke(); });
        Q42.T(ctx, F > 1 ? 'إجهاد شد ⟸ زيادة في الطول (الشكل 5-2)' : F < -1 ? 'إجهاد كبس ⟸ نقصان في الطول (الشكل 6-2)' : 'لا توجد قوة', g.cx, y + bh + 44, { s: fs + 1, w: 900, c: '#fff', bg: F > 1 ? '#dc2626' : F < -1 ? '#7c3aed' : '#64748b' });
        Q42.T(ctx, 'ΔL = ' + (dl / 10).toFixed(1) + ' mm (مكبّرة)', g.cx, y - 20, { s: fs, w: 800, c: '#0f172a' });
      } else {
        // book on a table, hand pushes the top cover sideways
        const bw = g.ph ? 150 : 210, bh = 70, ty = g.cy + bh / 2, x0 = g.cx - bw / 2, sx = S.sx;
        K.raw(ctx, () => { ctx.fillStyle = '#92400e'; ctx.fillRect(g.L + 20, ty, w - g.L - 40, 14); ctx.fillStyle = '#78350f'; ctx.fillRect(g.L + 40, ty + 14, 12, 120); ctx.fillRect(w - 60, ty + 14, 12, 120);
          ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.moveTo(x0, ty); ctx.lineTo(x0 + bw, ty); ctx.lineTo(x0 + bw + sx, ty - bh); ctx.lineTo(x0 + sx, ty - bh); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#f8fafc'; for (let k = 1; k < 9; k++) { const f = k / 9; ctx.fillRect(x0 + bw - 2 + sx * f, ty - bh * f, 4, 2); } ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.moveTo(x0 + bw - 6, ty - 4); ctx.lineTo(x0 + bw - 2, ty); ctx.lineTo(x0 + bw + sx - 2, ty - bh); ctx.lineTo(x0 + bw + sx - 6, ty - bh + 4); ctx.fill(); });
        if (sx > 1) Q26.arc(ctx, x0, ty, 42, -Math.PI / 2, -Math.PI / 2 + Math.atan2(sx, bh), '#ea580c', 'θ', { lr: 14 });
        C2.hand(ctx, x0 + sx + bw * .55, ty - bh - 6, 1, g.ph ? .7 : .9, { rot: 0 });
        if (F > 1) { K.force(ctx, x0 + sx + bw * .3, ty - bh - 30, clamp(F, 26, 100), 0, 'F قوة مماسة', '#dc2626', 3.2); K.force(ctx, x0 + bw * .7, ty + 26, -clamp(F, 26, 100), 0, 'قوة الاحتكاك', '#0f766e', 3.2); }
        Q42.T(ctx, 'إجهاد القص: القوة مماسة للسطح فتغيّر شكل الكتاب (الشكل 7-2)', g.cx, ty + 64, { s: fs, w: 900, c: '#fff', bg: '#ea580c' });
      }
      const C = Q42.chips(S, 'm', [['ts', 'شد وكبس (5-2 ، 6-2)'], ['sh', 'القص (7-2)'], ['rs', '↺ جسم جديد']], h - 84, S.m, () => { }, { bw: 200 }); C[2]._on = false; Q42.drawChips(ctx, C);
      Q42.card(ctx, S, [{ t: (S.m === 'ts' ? 'الإجهاد الطولي' : 'إجهاد القص') + ' = F / A', c: '#0f172a', w: 900 }, { t: '= ' + Math.abs(F).toFixed(0) + ' N ÷ ' + A + '×10⁻⁴ m²', mono: 1 }, { t: '= ' + Q42.sci(sig, 3, 'N/m²'), mono: 1, c: '#dc2626', w: 900 }], { title: 'الإجهاد', y: 44, wd: g.ph ? w - 24 : 300 });
      Q42.banner(ctx, w, S.m === 'ts' ? 'اسحب المقبض الأصفر إلى الخارج أو إلى الداخل' : 'اسحب اليد على الكتاب جانباً');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      if (S.m === 'ts') { const bw = g.ph ? 150 : 220; L.push({ id: 'end', x: g.cx + bw / 2 + S.u * 1.2 + 2, y: g.cy, r: 22, axis: 'x', keep: true, tip: 'اسحب: إلى الخارج شد، إلى الداخل كبس', idle: 'اسحب المقبض ✋', drag: (S2, d) => { if (S2.br) return; S2.u = clamp((d.x - g.cx - bw / 2) / 1.2, -50, 60); const sig = Math.abs(D.F(S2)) / (S2.p.A * 1e-4); if (sig > 6e6) S2.br = 1; } }); }
      else { const bw = g.ph ? 150 : 210, x0 = g.cx - bw / 2; L.push({ id: 'hand', x: x0 + S.sx + bw * .55, y: g.cy - 35 - 10, r: 34, axis: 'x', keep: true, tip: 'اسحب اليد جانباً', idle: 'اسحب الكتاب ✋', drag: (S2, d) => { S2.sx = clamp(d.ox + d.x - d.sx - (x0 + bw * .55), 0, 40); }, up: S2 => { S2.sx = 0; } }); }
      return L.concat(Q42.chips(S, 'm', [['ts', 'شد وكبس'], ['sh', 'القص'], ['rs', 'جديد']], g.h - 84, S.m, (S2, k) => { if (k === 'rs') { S2.u = 0; S2.br = 0; S2.sx = 0; } else { S2.m = k; S2.u = 0; S2.sx = 0; S2.br = 0; } }, { bw: 200 })); },
    readings(S) { const F = D.F(S), sig = Math.abs(F) / (S.p.A * 1e-4); return [rd('النوع', S.m === 'sh' ? 'إجهاد قص' : F > 0 ? 'إجهاد شد' : F < 0 ? 'إجهاد كبس' : '—'), rd('القوة F', Math.abs(F).toFixed(0) + ' N'), rd('المساحة A', S.p.A + ' cm²'), rd('الإجهاد F/A', Q42.sci(sig, 3, 'N/m²'))]; },
    explain(S) { const F = D.F(S); return Q26.ex(S.m === 'sh' ? 'اليد تدفع الغلاف العلوي للكتاب بقوة مماسة فيميل شكله، والمنضدة تؤثر بقوة احتكاك معاكسة في الأسفل.' : F > 0 ? 'قوتا شد عموديتان على سطحين متقابلين: يزداد طول الجسم.' : F < 0 ? 'قوتان عموديتان باتجاه الداخل: ينقص طول الجسم.' : 'اسحب المقبض لتؤثر بقوة.', 'الإجهاد = القوة ÷ المساحة. للقوة نفسها يقل الإجهاد إذا كبرت مساحة المقطع، لذلك تُصنع الأعمدة الحاملة سميكة.', 'الحبل المشدود في إجهاد شد، وأعمدة المباني في إجهاد كبس، والمقص يقطع الورق بإجهاد القص.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — المطاوعة: الطولية والقص والحجم (الأشكال 8-2، 9-2، 10-2، ص 19–20) =============== */
(() => {
  const D = { id: 'g10_s_strain', page: 19, fig: 'الأشكال 8-2 و 9-2 و 10-2',
    desc: 'المطاوعة مقياس لمقدار تشوه المادة (تغير شكلها أو حجمها) نتيجة الإجهاد. المطاوعة الطولية = ΔL / Lo (الشكل 8-2)، ومطاوعة القص تقاس بالزاوية θ التي ينحرف بها سطحا الجسم (الشكل 9-2)، ومطاوعة الحجم = ΔV / Vo عند انضغاط الجسم بأكمله (الشكل 10-2).',
    tags: 'مطاوعة طولية قص حجم ΔL/Lo ΔV/Vo زاوية القص strain',
    tools: ['ساق مثبتة بملزمة على المنضدة', 'متوازي سطوح', 'مكعب'],
    steps: ['اختر «طولية»: اسحب طرف الساق وغيّر طولها الأصلي Lo بالمنزلق، واحسب ΔL / Lo.', 'اختر «قص»: اسحب السطح العلوي جانباً، ولاحظ الزاوية θ (الشكل 9-2).', 'اختر «حجم»: اضغط المكعب من جميع الجهات بسحب المقبض، ولاحظ ΔV / Vo (الشكل 10-2).', 'المطاوعة نسبة بين كميتين من النوع نفسه، فما وحدتها؟'],
    concl: ['المطاوعة الطولية = التغير في الطول ÷ الطول الأصلي = ΔL / Lo (الشكل يتغير من غير تغير في الحجم).', 'مطاوعة القص تقاس بالزاوية θ التي ينحرف بها سطحا الجسم الشاقوليان المتقابلان.', 'مطاوعة الحجم = التغير في الحجم ÷ الحجم الأصلي = ΔV / Vo ، والشكل ثابت.', 'المطاوعة ليس لها وحدة لأنها نسبة.'],
    laws: ['g10_strain'],
    controls: [R('L0', 'الطول الأصلي Lo (طولية)', .2, 1, .4, .05, 'm')],
    setup(S) { S.m = 'L'; S.dl = 0; S.dx = 0; S.dv = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S); return { w, h, ph, L, cx: L + (w - L) * (ph ? .5 : .4), cy: h * (ph ? .42 : .5) }; },
    vals(S) { const ppm = 400; if (S.m === 'L') return { s: S.dl / ppm / S.p.L0, t: 'ΔL / Lo = ' + (S.dl / ppm * 100).toFixed(1) + ' cm ÷ ' + (S.p.L0 * 100).toFixed(0) + ' cm' }; if (S.m === 'S') { const th = Math.atan2(S.dx, 140); return { s: th, t: 'θ = ' + (th * 180 / Math.PI).toFixed(1) + '° = ' + th.toFixed(3) + ' rad' }; } const a0 = 140, a = a0 - S.dv; return { s: (a0 ** 3 - a ** 3) / a0 ** 3, t: 'ΔV / Vo = (Vo − V) / Vo' }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10.5 : 12, V = D.vals(S); Q42.bg(ctx, w, h);
      if (S.m === 'L') { const ppm = g.ph ? 300 : 400, Lp = S.p.L0 * ppm * (g.ph ? .9 : 1), x0 = g.cx - Lp / 2 - 40, y = g.cy, dl = S.dl * (ppm / 400);
        K.raw(ctx, () => { ctx.fillStyle = '#d6a76b'; ctx.fillRect(g.L + 10, y + 16, x0 - g.L + 20, 20); ctx.fillStyle = '#9a3412'; rr(ctx, x0 - 26, y - 34, 34, 52, 5); ctx.fill(); ctx.fillStyle = '#6b7280'; ctx.fillRect(x0 - 13, y - 60, 8, 30); ctx.fillRect(x0 - 28, y - 64, 38, 6); });
        Q42.box(ctx, x0, y - 7, Lp + dl, 14, 8, '#94a3b8');
        K.raw(ctx, () => { ctx.strokeStyle = '#0f172a'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x0 + Lp, y - 30); ctx.lineTo(x0 + Lp, y + 30); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x0 + Lp + dl + 4, y, 11, 0, TAU); ctx.fill(); ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; ctx.stroke(); });
        Q42.T(ctx, 'Lo = ' + (S.p.L0 * 100).toFixed(0) + ' cm', x0 + Lp / 2, y + 40, { s: fs, w: 900, c: '#0f172a' }); if (dl > 2) { Q42.T(ctx, 'ΔL', x0 + Lp + dl / 2, y - 34, { s: fs, w: 900, c: '#dc2626' }); K.force(ctx, x0 + Lp + dl + 18, y, 50, 0, 'F', '#dc2626', 3); }
        Q42.T(ctx, 'الشكل يتغير من غير تغير في الحجم (يرقّ قليلاً)', g.cx, y + 80, { s: fs, w: 800, c: '#475569' });
      } else if (S.m === 'S') { const bw = 160, bh = 140, x0 = g.cx - bw / 2, yb = g.cy + bh / 2;
        K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(x0 - 30, yb, bw + 80, 10); ctx.fillStyle = '#cbd5e1'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0, yb); ctx.lineTo(x0 + bw, yb); ctx.lineTo(x0 + bw + S.dx, yb - bh); ctx.lineTo(x0 + S.dx, yb - bh); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fdba74'; ctx.fillRect(x0 + S.dx, yb - bh - 8, bw, 8);
          ctx.setLineDash([4, 4]); ctx.strokeStyle = '#0f172a'; ctx.strokeRect(x0, yb - bh, bw, bh); ctx.setLineDash([]); });
        if (S.dx > 1) { Q26.arc(ctx, x0, yb, 52, -Math.PI / 2, -Math.PI / 2 + Math.atan2(S.dx, bh), '#ea580c', 'θ', { lr: 14 }); Q42.T(ctx, 'Δx', x0 + S.dx / 2, yb - bh - 22, { s: fs, w: 900, c: '#ea580c' }); K.force(ctx, x0 + S.dx + bw, yb - bh - 4, 60, 0, 'F', '#dc2626', 3); K.force(ctx, x0 + 20, yb + 26, -60, 0, '−F', '#0f766e', 3); }
        K.raw(ctx, () => { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x0 + S.dx + bw / 2, yb - bh - 4, 11, 0, TAU); ctx.fill(); ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; ctx.stroke(); });
        Q42.T(ctx, 'l', x0 - 14, yb - bh / 2, { s: 13, w: 900, c: '#0f172a' });
      } else { const a0 = 140, a = a0 - S.dv, c = [g.cx, g.cy];
        K.raw(ctx, () => { ctx.setLineDash([5, 4]); ctx.strokeStyle = '#64748b'; ctx.strokeRect(c[0] - a0 / 2, c[1] - a0 / 2, a0, a0); ctx.setLineDash([]); });
        Q42.box(ctx, c[0] - a / 2, c[1] - a / 2, a, a, a * .35, '#f59e0b');
        const L2 = 30 + S.dv * 1.5; [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(q => K.force(ctx, c[0] + q[0] * (a / 2 + 20 + L2), c[1] + q[1] * (a / 2 + 20 + L2), -q[0] * L2, -q[1] * L2, '', '#2563eb', 3)); K.force(ctx, c[0] + a * .6, c[1] - a * .9, -24, 18, 'F', '#2563eb', 3);
        K.raw(ctx, () => { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(c[0] + a / 2 + 70, c[1] + a / 2 + 40, 13, 0, TAU); ctx.fill(); ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; ctx.stroke(); });
        Q42.T(ctx, 'اسحب نحو المكعب لزيادة الضغط ↖', c[0] + a / 2 + 70, c[1] + a / 2 + 64, { s: fs - 1, w: 800, c: '#475569' });
        Q42.T(ctx, 'Vo', c[0] - a0 / 2 - 14, c[1] - a0 / 2 - 6, { s: 13, w: 900, c: '#64748b' }); Q42.T(ctx, 'Vo − ΔV', c[0], c[1], { s: 12, w: 900, c: '#78350f' });
        Q42.T(ctx, 'الحجم يقل والشكل ثابت', c[0], c[1] + a0 / 2 + 80, { s: fs, w: 800, c: '#475569' }); }
      const C = Q42.chips(S, 'm', [['L', 'طولية (8-2)'], ['S', 'قص (9-2)'], ['V', 'حجم (10-2)']], h - 84, S.m, () => { }, { bw: 170 }); Q42.drawChips(ctx, C);
      Q42.card(ctx, S, [{ t: V.t, mono: 0 }, { t: 'المطاوعة = ' + (S.m === 'S' ? V.s.toFixed(3) + ' rad' : V.s.toFixed(4)), c: '#dc2626', w: 900, mono: 1 }, { t: 'ليس لها وحدة (نسبة)', c: '#475569' }], { title: { L: 'المطاوعة الطولية', S: 'مطاوعة القص', V: 'مطاوعة الحجم' }[S.m], y: 44, wd: g.ph ? w - 24 : 320 });
      Q42.banner(ctx, w, 'اسحب المقبض الأصفر');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      if (S.m === 'L') { const ppm = g.ph ? 300 : 400, Lp = S.p.L0 * ppm * (g.ph ? .9 : 1), x0 = g.cx - Lp / 2 - 40; L.push({ id: 'pull', x: x0 + Lp + S.dl * (ppm / 400) + 4, y: g.cy, r: 22, axis: 'x', keep: true, tip: 'اسحب طرف الساق', idle: 'اسحب ✋', drag: (S2, d) => { S2.dl = clamp((d.x - x0 - Lp) / (ppm / 400), 0, 70); } }); }
      else if (S.m === 'S') { const bw = 160, bh = 140, x0 = g.cx - bw / 2, yb = g.cy + bh / 2; L.push({ id: 'top', x: x0 + S.dx + bw / 2, y: yb - bh - 4, r: 22, axis: 'x', keep: true, tip: 'اسحب السطح العلوي', idle: 'اسحب ✋', drag: (S2, d) => { S2.dx = clamp(d.x - x0 - bw / 2, 0, 80); } }); }
      else { const a = 140 - S.dv; L.push({ id: 'press', x: g.cx + a / 2 + 70, y: g.cy + a / 2 + 40, r: 22, axis: 'xy', keep: true, tip: 'اسحب لزيادة الضغط', idle: 'اسحب ✋', down: S2 => { S2.dv0 = S2.dv; }, drag: (S2, d) => { S2.dv = clamp((S2.dv0 || 0) + ((d.sx - d.x) + (d.sy - d.y)) / 4, 0, 40); } }); }
      return L.concat(Q42.chips(S, 'm', [['L', 'طولية'], ['S', 'قص'], ['V', 'حجم']], g.h - 84, S.m, (S2, k) => { S2.m = k; }, { bw: 170 })); },
    readings(S) { const V = D.vals(S); return [rd('النوع', { L: 'طولية', S: 'قص', V: 'حجم' }[S.m]), rd('المطاوعة', S.m === 'S' ? V.s.toFixed(3) + ' rad' : V.s.toFixed(4))]; },
    explain(S) { return Q26.ex({ L: 'الساق المثبتة بالملزمة تستطيل بالسحب: المطاوعة الطولية ΔL/Lo.', S: 'السطح العلوي ينزاح جانباً فينحرف الجانبان بزاوية θ: هذه مطاوعة القص، والحجم لا يتغير.', V: 'المكعب منضغط من جميع الجهات فيقل حجمه ويبقى شكله: مطاوعة الحجم ΔV/Vo.' }[S.m], 'المطاوعة مقياس لمقدار تشوه المادة نتيجة الإجهاد الذي تتعرض له، ونوعها يتوقف على نوع الإجهاد.', 'الإسفنج تحت الضغط (حجم)، وصفحات الكتاب عند دفع غلافه (قص)، والحبل المشدود (طولية).'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — معامل يونك: جهاز السلك والمواد المختلفة + مثال ص 22 (الجدول 2) =============== */
const Q42Y = [['al', 'المنيوم', 70], ['pb', 'رصاص', 16], ['cu', 'نحاس', 120], ['dia', 'الماس', 1200], ['au', 'الذهب', 79], ['w', 'تنكستن', 360], ['st', 'فولاذ', 200], ['con', 'الخرسانة', 27.5], ['gl', 'الزجاج', 65]];
Q42.wireRig = (ctx, x, top, bot, o = {}) => { // ceiling bracket, wire, hanger at bot
  K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(x - 60, top - 16, 120, 14); ctx.strokeStyle = '#1e293b'; for (let k = -60; k < 60; k += 10) { ctx.beginPath(); ctx.moveTo(x + k, top - 16); ctx.lineTo(x + k + 8, top - 26); ctx.stroke(); }
    ctx.fillStyle = '#64748b'; ctx.fillRect(x - 8, top - 4, 16, 10); ctx.strokeStyle = o.col || '#78716c'; ctx.lineWidth = o.w || 2; ctx.beginPath(); ctx.moveTo(x, top + 4); ctx.lineTo(x, bot); ctx.stroke(); ctx.fillStyle = '#475569'; ctx.fillRect(x - 6, bot, 12, 8); ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, bot + 8); ctx.lineTo(x, bot + 20); ctx.stroke(); });
};
(() => {
  const EX = { q: 'سلك فولاذي طوله 4 m ومساحة مقطعه 0.05 cm². ما مقدار الزيادة الحاصلة في طوله إذا سُحب بقوة 500 N؟ معامل يونك للفولاذ 200×10⁹ N/m²', lines: ['Y = (F/A) / (ΔL/Lo) = F Lo / (A ΔL)', 'ΔL = F Lo / (Y A)', 'ΔL = 500 × 4 / (200×10⁹ × 0.05×10⁻⁴)', 'ΔL = 2×10⁻³ m = 2 mm'] };
  const D = { id: 'g10_y_lab', page: 21, fig: 'الجدول (2) + مثال ص 22',
    desc: 'النسبة بين الإجهاد والمطاوعة النسبية تدعى معامل المرونة أو معامل يونك: Y = (F/A) / (ΔL/Lo) ويقاس بوحدة N/m²، وهو صفة مميزة للمواد الصلبة. الجدول 2 يمثل القيم لمعامل يونك لمواد مختلفة.',
    tags: 'معامل يونك معامل المرونة Y=FLo/AΔL الجدول 2 فولاذ نحاس المنيوم الماس مثال ص22',
    tools: ['سلك معلق شاقولياً', 'أثقال (قوة شد F)', 'مسطرة ميكرومترية لقياس ΔL'],
    steps: ['اختر مادة السلك من مخطط الجدول (2) على اليمين (اضغط على عمودها).', 'اسحب مقبض القوة F إلى الأسفل لتعليق أثقال أكبر، ولاحظ الزيادة ΔL في العدسة المكبرة.', 'غيّر الطول Lo ومساحة المقطع A بالمنزلقين: كيف تتغير ΔL؟', 'اضغط «مثال ص 22» ثم «الخطوة التالية» لحل مثال الكتاب على الجهاز.'],
    concl: ['Y = الإجهاد ÷ المطاوعة النسبية = (F/A) / (ΔL/Lo) ، ووحدته N/m².', 'ΔL = F Lo / (Y A): تزداد الاستطالة بزيادة القوة والطول، وتقل بزيادة مساحة المقطع ومعامل يونك.', 'معامل يونك صفة مميزة للمادة لا يعتمد على أبعاد السلك.', 'مثال ص 22: ΔL = 2 mm.'],
    laws: ['g10_young'],
    controls: [R('F', 'قوة الشد F', 0, 2000, 500, 10, 'N'), R('L', 'الطول الأصلي Lo', 1, 5, 4, .5, 'm'), R('A', 'مساحة المقطع A', .01, .2, .05, .01, 'cm²')],
    setup(S) { S.mat = 'st'; S.ex = 0; S.k = 0; },
    Y(S) { return Q42Y.find(q => q[0] === S.mat)[2] * 1e9; },
    dL(S) { return S.p.F * S.p.L / (D.Y(S) * S.p.A * 1e-4); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), x = L + (w - L) * (ph ? .25 : .18), top = ph ? 80 : 70, bot = h * (ph ? .52 : .62); return { w, h, ph, L, x, top, bot, fx: x + 90 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, p = S.p, dl = D.dL(S), Y = D.Y(S), mm = dl * 1000, ext = clamp(mm * 3, 0, 60), yb = g.bot + ext;
      Q42.bg(ctx, w, h); Q42.wireRig(ctx, g.x, g.top, yb, { col: S.mat === 'cu' ? '#b45309' : S.mat === 'au' ? '#ca8a04' : '#78716c' });
      const nW = Math.round(p.F / 100); for (let i = 0; i < Math.min(nW, 20); i++) Q42.weight(ctx, g.x, yb + 26 + i * 7, 40, 7);
      Q42.T(ctx, 'Lo = ' + p.L + ' m', g.x - 40, (g.top + g.bot) / 2, { s: fs, w: 900, c: '#0f172a' });
      // force handle (slider) to the right
      const sy0 = g.top + 20, sy1 = g.bot + 60, fy = sy0 + (sy1 - sy0) * p.F / 2000;
      K.raw(ctx, () => { ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(g.fx, sy0); ctx.lineTo(g.fx, sy1); ctx.stroke(); ctx.strokeStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(g.fx, sy0); ctx.lineTo(g.fx, fy); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(g.fx, fy, 12, 0, TAU); ctx.fill(); });
      Q42.T(ctx, 'F = ' + p.F + ' N', g.fx + 50, fy, { s: fs, w: 900, c: '#fff', bg: '#dc2626' }); Q42.T(ctx, 'قوة الشد', g.fx, sy0 - 14, { s: fs - 1, w: 800, c: '#475569' });
      // magnifier with a mm scale at the wire end
      const mx = g.x, my = g.bot + 140 > h - 90 ? h - 110 : g.bot + 140, R = g.ph ? 46 : 56, zp = 18; // 18 px per mm in the bubble
      K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.arc(mx - 120, my, R, 0, TAU); ctx.fillStyle = '#fff'; ctx.fill(); ctx.clip(); const z0 = my - R + 10; ctx.strokeStyle = '#475569'; for (let k = 0; k <= 12; k++) { const y = z0 + k * zp / 2; ctx.lineWidth = k % 2 ? .7 : 1.4; ctx.beginPath(); ctx.moveTo(mx - 120 - 30, y); ctx.lineTo(mx - 120 - 30 + (k % 2 ? 8 : 14), y); ctx.stroke(); }
        ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(mx - 150, z0); ctx.lineTo(mx - 80, z0); ctx.stroke(); ctx.setLineDash([]); const ye = z0 + Math.min(mm, 5.5) * zp; ctx.fillStyle = '#dc2626'; ctx.fillRect(mx - 125, ye - 2, 40, 4); ctx.restore(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(mx - 120, my, R, 0, TAU); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(mx - 120 + R * .7, my + R * .7); ctx.lineTo(mx - 120 + R * 1.2, my + R * 1.2); ctx.stroke(); });
      Q42.T(ctx, 'ΔL = ' + (mm < 10 ? mm.toFixed(2) : mm.toFixed(1)) + ' mm', mx - 120, my + R + 16, { s: fs + 1, w: 900, c: '#fff', bg: '#dc2626' });
      // material bar chart (table 2) — tap a bar to choose
      const B = D.bars(S, g); B.forEach((b, i) => { const q = Q42Y[i], on = q[0] === S.mat; K.raw(ctx, () => { ctx.fillStyle = on ? '#0f766e' : '#94a3b8'; ctx.fillRect(b.x - b.w / 2 + 3, b._y, b.w - 6, b._h); }); Q42.T(ctx, q[1], b.x, b.y + b.h / 2 + 12, { s: g.ph ? 8.5 : 10, w: 800, c: on ? '#0f766e' : '#334155' }); Q42.T(ctx, String(q[2]), b.x, b._y - 9, { s: g.ph ? 8.5 : 9.5, w: 800, c: '#0f172a' }); });
      if (B.length) Q42.T(ctx, 'الجدول (2): معامل يونك (×10⁹ N/m²) — اضغط على مادة', (B[0].x + B[B.length - 1].x) / 2, B[0].y - B[0].h / 2 - 14, { s: fs, w: 900, c: '#0f766e' });
      const cy = B.length ? B[0].y + B[0].h / 2 + 34 : 44; const C = Q42.chips(S, 'ex', [['ex', 'مثال ص 22'], ['nx', '⬇ الخطوة التالية']], cy, S.ex ? 'ex' : '', () => { }, { bw: 160, x0: g.ph ? 12 : g.fx + 110 }); C[1]._col = '#be185d'; Q42.drawChips(ctx, C);
      const sig = p.F / (p.A * 1e-4), st = dl / p.L;
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: 'مثال ص 22' }, EX, { k: S.k }), { y: cy + 26, x: w - 12, wd: g.ph ? w - 24 : Math.min(470, w - g.fx - 130), f: 1 });
      else Q42.card(ctx, S, [{ t: 'الإجهاد F/A = ' + Q42.sci(sig, 3, 'N/m²'), mono: 1 }, { t: 'المطاوعة ΔL/Lo = ' + Q42.sci(st, 3), mono: 1 }, { t: 'Y = الإجهاد ÷ المطاوعة = ' + Q42.sci(sig / (st || 1e-30), 3, 'N/m²'), mono: 1, c: '#0f766e', w: 900 }, { t: 'ΔL = F Lo / (Y A) = ' + Q42.sci(dl, 3, 'm'), mono: 1, c: '#dc2626', w: 900 }], { title: 'معامل يونك — ' + Q42Y.find(q => q[0] === S.mat)[1], y: cy + 26, x: w - 12, wd: g.ph ? w - 24 : Math.min(420, w - g.fx - 130), f: 1 });
      Q42.banner(ctx, w, 'اسحب مقبض القوة الأحمر، واختر المادة من الجدول (2)');
    },
    bars(S, g) { if (g.ph) return []; const x0 = g.fx + 120, x1 = g.w - 16, n = Q42Y.length, bw = (x1 - x0) / n, y = 60 + 70, hh = 120; return Q42Y.map((q, i) => { const b = Q42.btn('mat_' + q[0], { x: x0 + bw * (i + .5), y, w: bw, h: hh }, S2 => { S2.mat = q[0]; S2.ex = 0; }, { tip: 'اختر ' + q[1] }); const v = Math.log10(q[2]) / Math.log10(1500); b._h = Math.max(6, hh * v); b._y = y + hh / 2 - b._h; return b; }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), sy0 = g.top + 20, sy1 = g.bot + 60;
      const L = [{ id: 'force', x: g.fx, y: sy0 + (sy1 - sy0) * S.p.F / 2000, r: 20, axis: 'y', keep: true, tip: 'اسحب لتغيير قوة الشد', idle: 'اسحب المقبض ✋', drag: (S2, d) => { setParam(S2, 'F', Math.round(clamp((d.y - sy0) / (sy1 - sy0), 0, 1) * 200) * 10); S2.ex = 0; } }];
      const B = D.bars(S, g); const cy = B.length ? B[0].y + B[0].h / 2 + 34 : 44;
      return L.concat(B, Q42.chips(S, 'ex', [['ex', 'مثال'], ['nx', 'التالية']], cy, '', (S2, k) => { if (k === 'ex' || !S2.ex) { S2.ex = 1; S2.k = 0; S2.mat = 'st'; setParam(S2, 'F', 500); setParam(S2, 'L', 4); setParam(S2, 'A', .05); if (k === 'ex') return; } S2.k = Math.min(S2.k + 1, EX.lines.length); }, { bw: 160, x0: g.ph ? 12 : g.fx + 110 })); },
    readings(S) { const dl = D.dL(S); return [rd('المادة', Q42Y.find(q => q[0] === S.mat)[1]), rd('معامل يونك Y', Q42.sci(D.Y(S), 3, 'N/m²')), rd('الإجهاد F/A', Q42.sci(S.p.F / (S.p.A * 1e-4), 3, 'N/m²')), rd('الاستطالة ΔL', (dl * 1000).toFixed(3) + ' mm')]; },
    record(S) { return { m: Q42Y.find(q => q[0] === S.mat)[1], F: S.p.F, L: S.p.L, A: S.p.A, d: +(D.dL(S) * 1000).toFixed(3) }; },
    cols: [['m', 'المادة'], ['F', 'F (N)'], ['L', 'Lo (m)'], ['A', 'A (cm²)'], ['d', 'ΔL (mm)']],
    explain(S) { const m = Q42Y.find(q => q[0] === S.mat); return Q26.ex('سلك من ' + m[1] + ' (Y = ' + m[2] + '×10⁹ N/m²) يستطيل ' + (D.dL(S) * 1000).toFixed(3) + ' mm تحت قوة ' + S.p.F + ' N.', 'ΔL = F Lo / (Y A): المادة ذات معامل يونك الكبير (كالماس والتنكستن والفولاذ) تحتاج إجهاداً عالياً لتوليد المطاوعة نفسها، أي أنها أقسى.', 'تُصنع الجسور والرافعات من الفولاذ لأن معامل يونك له كبير، فلا يستطيل كثيراً تحت الأحمال.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — سؤال ص 22: تجربة الطلبة لتحديد معامل يونك من ميل الخط (الجدول 3) =============== */
(() => {
  const DL = [0, 2.8, 6.2, 8.7, 12.1, 15], L0 = 2, A = 1.25e-6; // book table 3 (mm) for F = 0..500 N
  const BEST = DL.reduce((s, v, i) => s + v * i * 100, 0) / DL.reduce((s, v) => s + v * v, 0); // N per mm
  const D = { id: 'g10_y_graph', page: 22, fig: 'سؤال ص 22 + الجدول (3)',
    desc: 'قامت مجموعة من الطلبة بتجربة لتحديد معامل يونك لسلك من مادة معينة فحصلوا على النتائج المبينة في الجدول (3). إذا علمت أن طول السلك 2 m ومساحة مقطعه 1.25×10⁻⁶ m²: ارسم العلاقة البيانية بين القوة واستطالة السلك، وأوجد معامل يونك لمادة السلك بيانياً من ميل المستقيم.',
    tags: 'سؤال الجدول 3 معامل يونك بيانياً ميل المستقيم رسم بياني قوة استطالة',
    tools: ['سلك طوله 2 m ومساحة مقطعه 1.25×10⁻⁶ m²', 'أثقال 100 N', 'مقياس ميكرومتري للاستطالة', 'ورقة رسم بياني'],
    steps: ['علّق الأثقال واحداً بعد الآخر (اسحب ثقلاً من الصندوق إلى الكفة أو اضغط على الصندوق): كل ثقل 100 N.', 'اقرأ الاستطالة في العدسة المكبرة، فتظهر النقطة على الرسم البياني (الجدول 3).', 'اسحب طرف الخط المستقيم ليمر بالنقاط أفضل مرور، أو اضغط «أفضل خط».', 'معامل يونك = الميل × Lo / A. اضغط «الخطوة التالية» لترى الحساب.'],
    concl: ['العلاقة بين القوة والاستطالة خط مستقيم (ضمن حدود المرونة).', 'الميل = ΔF / ΔL ، ومعامل يونك Y = الميل × Lo / A.', 'من بيانات الجدول (3): الميل ≈ ' + (BEST).toFixed(1) + ' N/mm ⟸ Y ≈ ' + (BEST * 1000 * L0 / A / 1e10).toFixed(2) + '×10¹⁰ N/m².'],
    laws: ['g10_young'],
    controls: [],
    setup(S) { S.n = 0; S.seen = [true, false, false, false, false, false]; S.sl = 20; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), x = L + (ph ? 70 : 90), top = ph ? 90 : 70, bot = h * (ph ? .42 : .5); return { w, h, ph, L, x, top, bot, tx: x + 100, gx: ph ? 40 : x + 230, gy: ph ? h * .5 : 80, gw: ph ? w - 70 : Math.min(460, w - x - 280), gh: ph ? h * .3 : Math.min(300, h * .5) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, mm = DL[S.n], yb = g.bot + mm * 2;
      Q42.bg(ctx, w, h); Q42.wireRig(ctx, g.x, g.top, yb);
      for (let i = 0; i < S.n; i++) Q42.weight(ctx, g.x, yb + 26 + i * 10, 44, 9, null, ['#78716c', '#e7e5e4', '#44403c']);
      Q42.T(ctx, 'Lo = 2 m', g.x - 40, (g.top + g.bot) / 2, { s: fs, w: 900, c: '#0f172a' });
      K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#64748b'; rr(ctx, g.tx - 30, g.bot + 30, 60, 70, 6); ctx.fill(); ctx.stroke(); });
      for (let i = 0; i < 5 - S.n; i++) Q42.weight(ctx, g.tx, g.bot + 90 - i * 10, 44, 9, null, ['#78716c', '#e7e5e4', '#44403c']);
      Q42.T(ctx, 'أثقال 100 N', g.tx, g.bot + 114, { s: fs, w: 900, c: '#0f172a' });
      Q42.T(ctx, 'F = ' + S.n * 100 + ' N', g.x + 60, yb - 30, { s: fs + 1, w: 900, c: '#fff', bg: '#dc2626' }); Q42.T(ctx, 'ΔL = ' + mm + ' mm', g.x + 60, yb - 8, { s: fs + 1, w: 900, c: '#0f172a', bg: '#fde047' });
      // graph
      const X = v => g.gx + 30 + v / 16 * (g.gw - 40), Yp = v => g.gy + g.gh - v / 5.5 * g.gh;
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, g.gx - 10, g.gy - 14, g.gw + 24, g.gh + 54, 8); ctx.fill(); ctx.stroke(); ctx.strokeStyle = 'rgba(15,118,110,.15)'; for (let v = 0; v <= 16; v += 2) { ctx.beginPath(); ctx.moveTo(X(v), g.gy); ctx.lineTo(X(v), g.gy + g.gh); ctx.stroke(); } for (let v = 0; v <= 5; v++) { ctx.beginPath(); ctx.moveTo(X(0), Yp(v)); ctx.lineTo(X(16), Yp(v)); ctx.stroke(); } ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X(0), g.gy); ctx.lineTo(X(0), Yp(0)); ctx.lineTo(X(16), Yp(0)); ctx.stroke(); });
      for (let v = 0; v <= 16; v += 4) Q42.T(ctx, String(v), X(v), Yp(0) + 12, { s: 9.5, w: 700, c: '#334155' }); for (let v = 0; v <= 5; v++) Q42.T(ctx, String(v * 100), X(0) - 16, Yp(v), { s: 9.5, w: 700, c: '#334155' });
      Q42.T(ctx, 'ΔL (mm)', X(16) - 20, Yp(0) + 28, { s: 10, w: 800, c: '#0f172a' }); Q42.T(ctx, 'F (N)', X(0) + 4, g.gy - 4, { s: 10, w: 800, c: '#0f172a' });
      // user line through origin with draggable end
      const xe = 15.5, ye = xe * S.sl / 100; K.raw(ctx, () => { ctx.strokeStyle = '#0f766e'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(X(0), Yp(0)); ctx.lineTo(X(xe), Yp(Math.min(ye, 5.5))); ctx.stroke(); ctx.fillStyle = '#0f766e'; ctx.beginPath(); ctx.arc(X(Math.min(xe, 5.5 / S.sl * 100)), Yp(Math.min(ye, 5.5)), 9, 0, TAU); ctx.fill(); });
      DL.forEach((v, i) => { if (S.seen[i]) K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(X(v), Yp(i), 5, 0, TAU); ctx.fill(); }); });
      const Yu = S.sl * 1000 * L0 / A; const stp = { q: 'معامل يونك من ميل الخط', lines: ['الميل = ΔF / ΔL = ' + S.sl.toFixed(1) + ' N/mm = ' + Q42.sci(S.sl * 1000, 3, 'N/m'), 'Y = (F/A) / (ΔL/Lo) = الميل × Lo / A', 'Y = ' + Q42.sci(S.sl * 1000, 3) + ' × 2 / 1.25×10⁻⁶', 'Y ≈ ' + Q42.sci(Yu, 3, 'N/m²')], k: S.k };
      const cy = g.ph ? h - 80 : g.gy + g.gh + 70; const C = Q42.chips(S, 'g', [['best', '📈 أفضل خط'], ['nx', '⬇ الخطوة التالية']], cy, '', () => { }, { bw: 160, x0: g.ph ? 12 : g.gx }); C[1]._col = '#be185d'; Q42.drawChips(ctx, C);
      if (!g.ph) Q42.steps(ctx, S, Object.assign({ title: 'الحساب' }, stp), { y: cy + 26, x: g.gx + g.gw + 14, wd: Math.min(460, g.gw + 24), f: 1 });
      Q42.banner(ctx, w, 'علّق الأثقال، ثم اسحب طرف الخط الأخضر ليمر بالنقاط');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), X = v => g.gx + 30 + v / 16 * (g.gw - 40), Yp = v => g.gy + g.gh - v / 5.5 * g.gh, xe = Math.min(15.5, 5.5 / S.sl * 100);
      const L = [{ id: 'tray', x: g.tx, y: g.bot + 65, w: 70, h: 80, axis: 'xy', keep: false, tip: 'اضغط أو اسحب ثقلاً إلى الكفة', idle: 'علّق ثقلاً ✋', click: S2 => { if (S2.n < 5) { S2.n++; S2.seen[S2.n] = true; } }, up: (S2, x, y) => { if (Math.abs(x - g.x) < 60 && S2.n < 5 && y > g.bot) { S2.n++; S2.seen[S2.n] = true; } }, drag: () => { } }];
      if (S.n) L.push({ id: 'hang', x: g.x, y: g.bot + DL[S.n] * 2 + 30 + S.n * 5, w: 60, h: S.n * 10 + 20, axis: 'xy', keep: false, tip: 'اضغط لإنزال ثقل', click: S2 => { if (S2.n > 0) S2.n--; } });
      L.push({ id: 'line', x: X(xe), y: Yp(xe * S.sl / 100), r: 18, axis: 'xy', keep: true, tip: 'اسحب لتغيير ميل الخط', drag: (S2, d) => { const fx = (d.x - g.gx - 30) / (g.gw - 40) * 16, fy = (g.gy + g.gh - d.y) / g.gh * 5.5; if (fx > .5) S2.sl = clamp(fy / fx * 100, 10, 80); } });
      const cy = g.ph ? g.h - 80 : g.gy + g.gh + 70; return L.concat(Q42.chips(S, 'g', [['best', 'أفضل خط'], ['nx', 'التالية']], cy, '', (S2, k) => { if (k === 'best') S2.sl = BEST; else S2.k = Math.min(S2.k + 1, 4); }, { bw: 160, x0: g.ph ? 12 : g.gx })); },
    readings(S) { return [rd('القوة F', S.n * 100 + ' N'), rd('الاستطالة ΔL', DL[S.n] + ' mm'), rd('ميل خطك', S.sl.toFixed(1) + ' N/mm'), rd('معامل يونك', Q42.sci(S.sl * 1000 * L0 / A, 3, 'N/m²'))]; },
    record(S) { return { F: S.n * 100, d: DL[S.n] }; },
    cols: [['F', 'F (N)'], ['d', 'ΔL (mm)']],
    explain(S) { return Q26.ex('النقاط تقع تقريباً على خط مستقيم يمر بنقطة الأصل.', 'ميل المستقيم = ΔF/ΔL ، ومن Y = (F/A)/(ΔL/Lo) نجد Y = الميل × Lo / A. القراءات العملية فيها أخطاء قياس صغيرة، لذلك نرسم أفضل خط يمر بين النقاط.', 'بهذه الطريقة تختبر المصانع المواد قبل استعمالها في البناء.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C3 — مسائل الفصل على الجهاز (س1–س6 ص 27 + س2 ص 26) =============== */
(() => {
  const PB = {
    s1: { t: 'س1', q: 'أثّر إجهاد توتري مقداره 20×10⁶ N/m² في سلك معدني مساحة مقطعه العرضي 1.5 mm². ما القوة المؤثرة فيه؟', lines: ['الإجهاد = F / A ⟸ F = الإجهاد × A', 'A = 1.5 mm² = 1.5×10⁻⁶ m²', 'F = 20×10⁶ × 1.5×10⁻⁶', 'F = 30 N'], sc: 'wire', v: { L: '—', A: '1.5 mm²', F: '؟' } },
    s2: { t: 'س2', q: 'ما الزيادة الحاصلة في طول سلك من الفولاذ طوله 2 m وقطره 1 mm إذا علقت في نهايته كتلة 8 kg؟ (g = 10 m/s² ، Y = 200×10⁹ N/m²)', lines: ['F = m g = 8 × 10 = 80 N', 'A = π r² = 3.14 × (0.5×10⁻³)² = 7.85×10⁻⁷ m²', 'ΔL = F Lo / (Y A) = 80 × 2 / (200×10⁹ × 7.85×10⁻⁷)', 'ΔL ≈ 0.001 m = 1 mm'], sc: 'wire', v: { L: '2 m', A: 'd = 1 mm', F: '8 kg' } },
    s3: { t: 'س3', q: 'سلك نصف قطر مقطعه 0.5 mm وطوله 120 cm معلق شاقولياً. ما القوة اللازمة لتسليطها على طرفه السفلي كي يصبح طوله 121.2 cm؟ (Y = 1.4×10¹⁰ N/m²)', lines: ['ΔL = 121.2 − 120 = 1.2 cm = 0.012 m', 'A = π r² = 3.14 × (0.5×10⁻³)² = 7.85×10⁻⁷ m²', 'F = Y A ΔL / Lo = 1.4×10¹⁰ × 7.85×10⁻⁷ × 0.012 / 1.2', 'F ≈ 109.9 N'], sc: 'wire', v: { L: '120 cm', A: 'r = 0.5 mm', F: '؟' } },
    s4: { t: 'س4', q: 'سلكان متماثلان طول أحدهما 125 cm والآخر 375 cm. فإذا قُطع السلك الأول بتأثير قوة مقدارها 489 N، ما القوة اللازمة لقطع السلك الثاني؟ (اسحب مقبض القوة)', lines: ['المتانة = القوة القاطعة ÷ المساحة (لا تعتمد على الطول)', 'السلكان متماثلان: المادة نفسها ومساحة المقطع نفسها', 'F = 489 N'], sc: 'cut', items: [['125 cm', 489, 1], ['375 cm', 489, 3]] },
    cut: { t: 'س2 ص 26', q: 'إذا كانت القوة اللازمة لقطع سلك معين هي F فما القوة اللازمة لقطع: (a) سلكين منطبقين من النوع نفسه (b) سلك قطره ضعف قطر الأول (c) سلك طوله ضعف طول الأول؟ (اسحب مقبض القوة)', lines: ['(a) سلكان: المساحة ضعف ⟸ 2F', '(b) القطر ضعف ⟸ المساحة π r² أربعة أمثال ⟸ 4F ، وهو الأكثر متانة', '(c) الطول لا يؤثر في القوة القاطعة ⟸ F'], sc: 'cut', items: [['F (الأصلي)', 100, 1], ['a) سلكان', 200, 1], ['b) القطر ضعف', 400, 1], ['c) الطول ضعف', 100, 2]] },
    s5: { t: 'س5', q: 'ساق طوله 0.4 m ضُغط فقصر طوله 0.05 m. ما المطاوعة النسبية له؟ (اسحب مقبض الملزمة)', lines: ['المطاوعة = ΔL / Lo', '= 0.05 / 0.4', '= 0.125 (ليس لها وحدة)'], sc: 'press' },
    s6: { t: 'س6', q: 'سلك من البرونز طوله 2.5 m ومساحة مقطعه 1×10⁻³ cm² استطال 1 mm بتعليق جسم كتلته 0.4 kg. احسب معامل يونك للمعدن (g = 10 N/kg).', lines: ['F = 0.4 × 10 = 4 N ، A = 1×10⁻³ cm² = 1×10⁻⁷ m²', 'Y = F Lo / (A ΔL)', 'Y = 4 × 2.5 / (1×10⁻⁷ × 1×10⁻³)', 'Y = 1×10¹¹ N/m²'], sc: 'wire', v: { L: '2.5 m', A: '1×10⁻³ cm²', F: '0.4 kg' } } };
  const KEYS = Object.keys(PB);
  const D = { id: 'g10_y_problems', page: 27, fig: 'المسائل ص 27 + س2 ص 26',
    desc: 'مسائل الفصل الثاني على الجهاز: القوة من الإجهاد (س1)، الاستطالة بمعامل يونك (س2)، القوة اللازمة لاستطالة معينة (س3)، القوة القاطعة لا تعتمد على الطول (س4 و س2 ص 26)، المطاوعة النسبية (س5)، وحساب معامل يونك (س6).',
    tags: 'مسائل الفصل الثاني إجهاد معامل يونك متانة قوة قاطعة مطاوعة نسبية برونز',
    tools: ['أسلاك وأثقال', 'جهاز قطع الأسلاك', 'ملزمة'],
    steps: ['اختر مسألة من الأزرار.', 'نفّذ المطلوب على الجهاز: في س4 و س2 ص 26 اسحب مقبض القوة حتى تنقطع الأسلاك، وفي س5 اضغط الساق بالملزمة.', 'اضغط «الخطوة التالية» لكشف الحل خطوة خطوة وقارن بجواب الكتاب.'],
    concl: ['س1: F = 30 N ، س2: ΔL = 0.001 m ، س3: F = 109.9 N.', 'س4: F = 489 N لأن القوة القاطعة لا تعتمد على طول السلك.', 'س2 ص 26: a) 2F ، b) 4F (الأكثر متانة) ، c) F.', 'س5: المطاوعة = 0.125 ، س6: Y = 10¹¹ N/m².'],
    laws: ['g10_young', 'g10_tough', 'g10_stress', 'g10_strain'],
    controls: [],
    setup(S) { S.pb = 's1'; S.k = 0; S.F = 0; S.c = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S); return { w, h, ph, L, cx: L + (w - L) * (ph ? .5 : .3), top: ph ? 120 : 110, bot: h * (ph ? .5 : .66) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, P = PB[S.pb]; Q42.bg(ctx, w, h);
      if (P.sc === 'wire') { Q42.wireRig(ctx, g.cx, g.top, g.bot, { col: S.pb === 's6' ? '#b45309' : '#78716c' }); Q42.weight(ctx, g.cx, g.bot + 30, 48, 18);
        Q42.T(ctx, 'Lo = ' + P.v.L, g.cx - 60, (g.top + g.bot) / 2, { s: fs + 1, w: 900, c: '#0f172a', bg: '#fde047' }); Q42.T(ctx, 'المقطع: ' + P.v.A, g.cx + 70, (g.top + g.bot) / 2 + 30, { s: fs, w: 900, c: '#fff', bg: '#0f766e' }); Q42.T(ctx, (P.v.F.indexOf('kg') > 0 ? 'm = ' : 'F = ') + P.v.F, g.cx + 70, g.bot + 30, { s: fs + 1, w: 900, c: '#fff', bg: '#dc2626' });
        if (S.pb === 's1') { K.raw(ctx, () => { ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.arc(g.cx + 80, g.top + 40, 22, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.stroke(); }); Q42.T(ctx, 'σ = 20×10⁶ N/m²', g.cx + 80, g.top + 76, { s: fs, w: 900, c: '#7c3aed' }); }
      } else if (P.sc === 'cut') { const n = P.items.length, sp = Math.min(110, (w - g.L - (g.ph ? 40 : 420)) / n), x0 = g.L + 40, F = S.F;
        P.items.forEach((it, i) => { const x = x0 + i * sp + sp / 2, Lp = (g.bot - g.top) * it[2] / (P.items.some(q => q[2] === 3) ? 3 : 2), y0 = g.top, y1 = y0 + Lp, br = F >= it[1];
          K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(x - 24, y0 - 14, 48, 12); ctx.strokeStyle = '#78716c'; ctx.lineWidth = /القطر/.test(it[0]) ? 4.5 : 2.2; const pair = /سلكان/.test(it[0]);
            [pair ? -4 : 0, pair ? 4 : null].forEach(dx => { if (dx == null) return; if (br) { ctx.beginPath(); ctx.moveTo(x + dx, y0); ctx.lineTo(x + dx, y0 + Lp * .45); ctx.moveTo(x + dx, y0 + Lp * .55 + 18); ctx.lineTo(x + dx, y1 + 18); ctx.stroke(); } else { ctx.beginPath(); ctx.moveTo(x + dx, y0); ctx.lineTo(x + dx, y1); ctx.stroke(); } }); ctx.fillStyle = '#475569'; ctx.fillRect(x - 14, y1 + (br ? 18 : 0), 28, 8); });
          Q42.T(ctx, it[0], x, y0 - 28, { s: fs - .5, w: 900, c: '#0f172a' }); Q42.T(ctx, br ? 'انقطع عند ' + it[1] + ' N' : 'سليم', x, y1 + 46, { s: fs - 1, w: 900, c: '#fff', bg: br ? '#b91c1c' : '#15803d' }); });
        const sx = x0 + n * sp + 30, sy0 = g.top, sy1 = g.bot, fy = sy0 + (sy1 - sy0) * S.F / 600; K.raw(ctx, () => { ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, sy0); ctx.lineTo(sx, sy1); ctx.stroke(); ctx.strokeStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(sx, sy0); ctx.lineTo(sx, fy); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(sx, fy, 12, 0, TAU); ctx.fill(); });
        Q42.T(ctx, 'F = ' + S.F.toFixed(0) + ' N على كل جهاز', sx + 4, sy0 - 16, { s: fs, w: 900, c: '#dc2626' });
      } else { const Lp = g.ph ? 220 : 320, x0 = g.cx - Lp / 2, y = (g.top + g.bot) / 2, c = S.c * Lp / .4;
        K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(x0 - 30, y - 50, 24, 100); ctx.fillRect(x0 - 30, y + 50, Lp + 90, 14); }); Q42.box(ctx, x0, y - 14, Lp - c, 28, 10, '#a8a29e');
        K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(x0 + Lp - c, y - 50, 24, 100); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x0 + Lp - c + 46, y, 14, 0, TAU); ctx.fill(); ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; ctx.stroke(); ctx.strokeStyle = '#0f172a'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x0 + Lp, y - 60); ctx.lineTo(x0 + Lp, y + 60); ctx.stroke(); ctx.setLineDash([]); });
        Q42.T(ctx, 'Lo = 0.4 m', x0 + Lp / 2, y - 70, { s: fs + 1, w: 900, c: '#0f172a' }); Q42.T(ctx, 'ΔL = ' + S.c.toFixed(3) + ' m', x0 + Lp - c / 2, y + 84, { s: fs + 1, w: 900, c: '#fff', bg: '#7c3aed' }); Q42.T(ctx, 'المطاوعة = ' + (S.c / .4).toFixed(3), x0 + Lp / 2, y + 112, { s: fs + 1, w: 900, c: '#dc2626' }); }
      const cy = g.ph ? h - 120 : h - 84; const C = Q42.chips(S, 'pb', KEYS.map(k => [k, PB[k].t]).concat([['nx', '⬇ التالية']]), cy, S.pb, () => { }, { bw: 92, x0: 12 + Q42.L(S) }); C[C.length - 1]._col = '#be185d'; C[C.length - 1]._on = false; Q42.drawChips(ctx, C);
      Q42.steps(ctx, S, Object.assign({ title: P.t }, P, { k: S.k }), { y: g.ph ? g.bot + 70 : 80, x: w - 12, wd: g.ph ? w - 24 : Math.min(470, (w - g.L) * .48), f: 1 });
      Q42.banner(ctx, w, 'اختر مسألة ونفّذها على الجهاز');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = PB[S.pb], L = [];
      if (P.sc === 'cut') { const n = P.items.length, sp = Math.min(110, (g.w - g.L - (g.ph ? 40 : 420)) / n), sx = g.L + 40 + n * sp + 30; L.push({ id: 'force', x: sx, y: g.top + (g.bot - g.top) * S.F / 600, r: 20, axis: 'y', keep: true, tip: 'اسحب لزيادة القوة', idle: 'اسحب مقبض القوة ✋', drag: (S2, d) => { S2.F = clamp((d.y - g.top) / (g.bot - g.top), 0, 1) * 600; } }); }
      if (P.sc === 'press') { const Lp = g.ph ? 220 : 320, x0 = g.cx - Lp / 2, y = (g.top + g.bot) / 2; L.push({ id: 'vise', x: x0 + Lp - S.c * Lp / .4 + 46, y, r: 22, axis: 'x', keep: true, tip: 'اسحب الملزمة لضغط الساق', idle: 'اضغط الساق ✋', drag: (S2, d) => { let c = clamp((x0 + Lp + 46 - d.x) / Lp * .4, 0, .06); if (Math.abs(c - .05) < .003) c = .05; S2.c = c; } }); }
      const cy = g.ph ? g.h - 120 : g.h - 84; return L.concat(Q42.chips(S, 'pb', KEYS.map(k => [k, PB[k].t]).concat([['nx', 'التالية']]), cy, S.pb, (S2, k) => { if (k === 'nx') { S2.k = Math.min(S2.k + 1, PB[S2.pb].lines.length); if (S2.k === PB[S2.pb].lines.length) { if (PB[S2.pb].sc === 'cut') S2.F = 600; if (S2.pb === 's5') S2.c = .05; } return; } S2.pb = k; S2.k = 0; S2.F = 0; S2.c = 0; }, { bw: 92, x0: 12 + Q42.L(S) })); },
    readings(S) { const P = PB[S.pb]; if (P.sc === 'cut') return P.items.map(it => rd(it[0], S.F >= it[1] ? 'انقطع (' + it[1] + ' N)' : 'سليم')); if (P.sc === 'press') return [rd('ΔL', S.c.toFixed(3) + ' m'), rd('المطاوعة', (S.c / .4).toFixed(3))]; return [rd('المسألة', P.t), rd('الخطوة', S.k + ' / ' + P.lines.length)]; },
    explain(S) { const P = PB[S.pb]; return Q26.ex(P.q, P.sc === 'cut' ? 'القوة القاطعة تتناسب مع مساحة المقطع (المتانة = القوة القاطعة ÷ المساحة) ولا تعتمد على طول السلك.' : P.sc === 'press' ? 'المطاوعة النسبية نسبة بين التغير في الطول والطول الأصلي، فليس لها وحدة.' : 'نستعمل Y = F Lo / (A ΔL) والإجهاد = F / A مع تحويل الوحدات إلى النظام الدولي (m ، m² ، N).', 'المهندسون يحسبون هذه القيم قبل اختيار أسلاك الرافعات والجسور المعلقة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — منحني الإجهاد والمطاوعة: التشوه المرن والبلاستيكي (الشكل 11-2، ص 24) =============== */
(() => {
  const MAT = { cu: { n: 'نحاس (لدن)', Y: 120e9, se: 150e6, uts: 220e6, eu: .25, eb: .3, col: '#b45309' }, st: { n: 'فولاذ (قاسٍ ومتين)', Y: 200e9, se: 250e6, uts: 400e6, eu: .12, eb: .16, col: '#64748b' }, gl: { n: 'زجاج (هش)', Y: 65e9, se: 50e6, uts: 50e6, eu: 0, eb: 0, col: '#38bdf8' } };
  const EMAX = .32, FR0 = .3; // x-axis: elastic part gets the first 30 % of the width
  const sOf = (M, e) => { const ee = M.se / M.Y; if (e <= ee) return M.Y * e; if (!M.eb) return M.se; if (e <= M.eu) return M.se + (M.uts - M.se) * Math.sqrt((e - ee) / (M.eu - ee)); return M.uts - (M.uts - M.se) * .35 * (e - M.eu) / (M.eb - M.eu); };
  const D = { id: 'g10_m_curve', page: 24, fig: 'الشكل 11-2',
    desc: 'معظم المعادن (عدا الحديد الصلب) تمتلك الليونة، وقابلية التشوه الدائم تصلها بعد حد المرونة. السلك النحاسي ذو المساحة 1 mm² يصل إلى حد المرونة عند قوة شد 150 N. قبل حد المرونة يخضع لقانون هوك (تشوه مرن) فيعود إلى طوله الأصلي، وبعده يحصل تشوه بلاستيكي (لدن) دائم حتى الانقطاع.',
    tags: 'منحني الإجهاد والمطاوعة حد المرونة تشوه مرن تشوه بلاستيكي لدن ليونة هشاشة نحاس 150N انقطاع الشكل 11-2',
    tools: ['جهاز شد يسحب سلكاً طوله 1 m ومساحة مقطعه 1 mm²'],
    steps: ['اختر سلك النحاس واسحب مقبض الجهاز إلى الأسفل ببطء، وراقب النقطة على المنحني.', 'قبل حد المرونة (150 N) أرجع المقبض: يعود السلك إلى طوله الأصلي (تشوه مرن).', 'تجاوز حد المرونة ثم أرجع المقبض: يبقى في السلك تشوه دائم (بلاستيكي).', 'استمر حتى ينقطع السلك (×)، ثم قارن مع الفولاذ والزجاج الهش.'],
    concl: ['التشوه المرن: الزيادة المؤقتة في الطول ضمن حدود المرونة، يخضع لقانون هوك ويعود الجسم إلى وضعه الأصلي.', 'حد المرونة: الحد الذي إذا تجاوزته القوة لا يعود الجسم إلى ما كان عليه بعد زوال القوة، فيحدث تشوه دائم.', 'التشوه البلاستيكي (اللدن): زيادة دائمة خارج حدود المرونة ولا يخضع لقانون هوك.', 'المواد اللدنة (النحاس) تتشوه كثيراً قبل الانقطاع، والمواد الهشة (الزجاج) تنكسر مباشرة بعد حد المرونة.'],
    laws: ['g10_hooke', 'g10_young'],
    controls: [],
    setup(S) { S.m = 'cu'; D.reset(S); },
    reset(S) { S.e = 0; S.emax = 0; S.br = 0; S.path = [[0, 0]]; },
    st(S) { const M = MAT[S.m], ee = M.se / M.Y; if (S.br) return { s: 0, ep: 0 }; const smax = sOf(M, S.emax), ep = S.emax > ee ? S.emax - smax / M.Y : 0; if (S.e >= S.emax) return { s: sOf(M, S.e), ep }; return { s: Math.max(0, smax - M.Y * (S.emax - S.e)), ep }; },
    xmap(M, e) { const ee = M.se / M.Y; return e <= ee ? e / ee * FR0 : FR0 + (e - ee) / (EMAX - ee) * (1 - FR0); },
    emap(M, f) { const ee = M.se / M.Y; return f <= FR0 ? f / FR0 * ee : ee + (f - FR0) / (1 - FR0) * (EMAX - ee); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), x = L + (ph ? 60 : 90), top = ph ? 110 : 90, bot = h * (ph ? .5 : .7); return { w, h, ph, L, x, top, bot, gx: ph ? 50 : x + 200, gy: ph ? h * .56 : 90, gw: ph ? w - 80 : Math.min(520, w - x - 250), gh: ph ? h * .26 : Math.min(320, h * .55) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, M = MAT[S.m], T = D.st(S), ee = M.se / M.Y, F = T.s * 1e-6; // N for 1 mm²
      Q42.bg(ctx, w, h);
      // machine: top grip, specimen, bottom grip, handle
      const f = D.xmap(M, S.e), Lp = g.bot - g.top - 60, yb = g.top + Lp + f * 60; K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(g.x - 50, g.top - 30, 100, 24); ctx.fillRect(g.x - 50, g.bot + 50, 100, 20); ctx.fillStyle = '#64748b'; ctx.fillRect(g.x - 46, g.top - 6, 8, Lp + 120); ctx.fillRect(g.x + 38, g.top - 6, 8, Lp + 120); });
      K.raw(ctx, () => { ctx.strokeStyle = M.col; ctx.lineCap = 'round'; const neck = S.e > M.eu && M.eu ? clamp((S.e - M.eu) / (M.eb - M.eu), 0, 1) : 0; if (S.br) { ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.x, g.top); ctx.lineTo(g.x, g.top + Lp * .5); ctx.moveTo(g.x, g.top + Lp * .5 + 26); ctx.lineTo(g.x, yb); ctx.stroke(); } else { ctx.lineWidth = 4 * (1 - .2 * f); ctx.beginPath(); ctx.moveTo(g.x, g.top); ctx.lineTo(g.x, g.top + Lp * .45); ctx.stroke(); ctx.lineWidth = 4 * (1 - .2 * f) * (1 - .55 * neck); ctx.beginPath(); ctx.moveTo(g.x, g.top + Lp * .45); ctx.lineTo(g.x, g.top + Lp * .55); ctx.stroke(); ctx.lineWidth = 4 * (1 - .2 * f); ctx.beginPath(); ctx.moveTo(g.x, g.top + Lp * .55); ctx.lineTo(g.x, yb); ctx.stroke(); }
        ctx.fillStyle = '#1f2937'; ctx.fillRect(g.x - 14, g.top - 8, 28, 12); ctx.fillRect(g.x - 14, yb, 28, 12); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(g.x, yb + 34, 14, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.x, yb + 12); ctx.lineTo(g.x, yb + 20); ctx.stroke(); });
      Q42.T(ctx, 'F = ' + F.toFixed(0) + ' N', g.x + 70, yb - 10, { s: fs + 1, w: 900, c: '#fff', bg: '#dc2626' }); Q42.T(ctx, 'ΔL = ' + (S.e * 1000 < 10 ? (S.e * 1000).toFixed(2) : (S.e * 1000).toFixed(0)) + ' mm', g.x + 70, yb + 14, { s: fs, w: 900, c: '#0f172a', bg: '#fde047' });
      // graph
      const X = e => g.gx + 30 + D.xmap(M, e) * (g.gw - 40), smx = 450e6, Yp = s => g.gy + g.gh - s / smx * g.gh;
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, g.gx - 10, g.gy - 16, g.gw + 24, g.gh + 58, 8); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(16,185,129,.1)'; ctx.fillRect(X(0), g.gy, X(ee) - X(0), g.gh); ctx.fillStyle = 'rgba(249,115,22,.08)'; ctx.fillRect(X(ee), g.gy, g.gx + g.gw - 10 - X(ee), g.gh); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X(0), g.gy); ctx.lineTo(X(0), Yp(0)); ctx.lineTo(g.gx + g.gw - 10, Yp(0)); ctx.stroke();
        ctx.strokeStyle = 'rgba(100,116,139,.45)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.4; ctx.beginPath(); for (let k = 0; k <= 200; k++) { const e = (M.eb || ee) * k / 200; k ? ctx.lineTo(X(e), Yp(sOf(M, e))) : ctx.moveTo(X(e), Yp(sOf(M, e))); } ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = M.col; ctx.lineWidth = 3; ctx.beginPath(); S.path.forEach((q, i) => i ? ctx.lineTo(X(q[0]), Yp(q[1])) : ctx.moveTo(X(q[0]), Yp(q[1]))); ctx.stroke();
        ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(X(ee), Yp(M.se), 5, 0, TAU); ctx.fill(); if (!S.br) { ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(X(S.e), Yp(T.s), 6, 0, TAU); ctx.fill(); } });
      Q42.T(ctx, 'حد المرونة', X(ee) + 4, Yp(M.se) - 16, { s: 10.5, w: 900, c: '#dc2626' }); Q42.T(ctx, 'منطقة التشوه المرن', (X(0) + X(ee)) / 2, g.gy + 12, { s: 10, w: 800, c: '#047857' }); if (M.eb) Q42.T(ctx, 'التشوه البلاستيكي (اللدن)', (X(ee) + g.gx + g.gw) / 2, g.gy + 12, { s: 10, w: 800, c: '#c2410c' });
      if (S.br) { const e = S.emax, s = sOf(M, Math.min(e, M.eb || ee)); Q42.T(ctx, '×', X(M.eb || ee), Yp(s), { s: 22, w: 900, c: '#b91c1c' }); }
      Q42.T(ctx, 'المطاوعة (الاستطالة) — ليست بمقياس رسم', g.gx + g.gw / 2, Yp(0) + 16, { s: 10, w: 800, c: '#334155' }); Q42.T(ctx, 'الإجهاد', X(0) + 6, g.gy - 6, { s: 10.5, w: 800, c: '#0f172a' });
      for (let v = 100; v <= 400; v += 100) Q42.T(ctx, v + ' N', X(0) - 18, Yp(v * 1e6), { s: 9, w: 700, c: '#334155' });
      if (T.ep > 0 && !S.br) Q42.T(ctx, 'تشوه دائم = ' + (T.ep * 1000).toFixed(0) + ' mm', X(T.ep), Yp(0) - 14, { s: 10.5, w: 900, c: '#fff', bg: '#c2410c' });
      const msg = S.br ? (S.m === 'gl' ? 'انكسر الزجاج مباشرة عند حد المرونة: مادة هشة' : 'انقطع السلك بعد تشوه بلاستيكي كبير: مادة لدنة') : S.e < 1e-9 && T.ep > 0 ? 'أرجعتَ القوة إلى الصفر لكن السلك لم يعد إلى طوله: تشوه دائم' : S.emax > ee ? 'تجاوزت حد المرونة: تشوه بلاستيكي (لدن)' : 'ضمن حدود المرونة: يخضع لقانون هوك ويعود إلى طوله';
      Q42.T(ctx, msg, g.ph ? w / 2 : g.gx + g.gw / 2, g.gy + g.gh + 32, { s: fs, w: 900, c: '#fff', bg: S.br ? '#b91c1c' : S.emax > ee ? '#c2410c' : '#047857' });
      const C = Q42.chips(S, 'm', Object.keys(MAT).map(k => [k, MAT[k].n]).concat([['rs', '↺ سلك جديد']]), h - 80, S.m, () => { }, { bw: 170 }); C[3]._on = false; Q42.drawChips(ctx, C);
      Q42.banner(ctx, w, 'اسحب المقبض الأحمر إلى الأسفل لشد السلك، ثم أرجعه');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), M = MAT[S.m], Lp = g.bot - g.top - 60, f = D.xmap(M, S.e), yb = g.top + Lp + f * 60;
      const L = [{ id: 'pull', x: g.x, y: yb + 34, r: 22, axis: 'y', keep: true, tip: 'اسحب لشد السلك، أرجعه لإزالة القوة', idle: 'اسحب المقبض ✋', drag: (S2, d) => { if (S2.br) return; const ff = clamp((d.y - 34 - g.top - Lp) / 60, 0, 1); let e = D.emap(M, ff); const T0 = D.st(S2); if (e < S2.emax && T0.ep > 0) e = Math.max(e, T0.ep); S2.e = e; if (e > S2.emax) S2.emax = e; const ee = M.se / M.Y; if ((M.eb && S2.emax >= M.eb) || (!M.eb && S2.emax > ee * 1.001)) { S2.br = 1; } const T = D.st(S2); S2.path.push([S2.br ? (M.eb || ee) : S2.e, S2.br ? sOf(M, M.eb || ee) : T.s]); if (S2.path.length > 600) S2.path.splice(1, 1); } }];
      return L.concat(Q42.chips(S, 'm', Object.keys(MAT).map(k => [k, MAT[k].n]).concat([['rs', 'جديد']]), g.h - 80, S.m, (S2, k) => { if (k !== 'rs') S2.m = k; D.reset(S2); }, { bw: 170 })); },
    readings(S) { const M = MAT[S.m], T = D.st(S); return [rd('المادة', M.n), rd('القوة F (1 mm²)', (T.s * 1e-6).toFixed(0) + ' N'), rd('حد المرونة', (M.se * 1e-6).toFixed(0) + ' N'), rd('التشوه الدائم', (T.ep * 1000).toFixed(1) + ' mm'), rd('الحالة', S.br ? 'انقطع' : S.emax > M.se / M.Y ? 'تشوه بلاستيكي' : 'تشوه مرن')]; },
    explain(S) { const M = MAT[S.m]; return Q26.ex(S.br ? 'انقطع السلك.' : S.emax > M.se / M.Y ? 'تجاوز السلك حد المرونة فبقي فيه تشوه دائم.' : 'السلك ضمن حدود المرونة.', 'قبل حد المرونة: الاستطالة تتناسب مع القوة (خط مستقيم، قانون هوك) ويعود السلك إلى طوله. بعده: زيادة صغيرة في القوة تنتج زيادة كبيرة في الطول، ويحصل تشوه بلاستيكي دائم حتى الانقطاع. ' + (S.m === 'gl' ? 'الزجاج هش: ينكسر مباشرة بعد تجاوز حد المرونة ولا يصل إلى التشوه الدائم.' : ''), 'النحاس يُسحب إلى أسلاك كهربائية رفيعة لأنه لدن، والزجاج ينكسر ولا يُسحب.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — الصلادة: جدول الصلادة التصاعدي (موس) بالخدش (ص 23) =============== */
(() => {
  const MO = ['التلك', 'الجبس', 'الكالسايت', 'الفلورايت', 'الابتايت', 'الفلسبار', 'الكوارتز', 'التوباز', 'الياقوت', 'الماس'];
  const COL = ['#e7e5e4', '#f5f5f4', '#fde68a', '#c4b5fd', '#86efac', '#fda4af', '#e0f2fe', '#fcd34d', '#ef4444', '#f0f9ff'];
  const D = { id: 'g10_m_hard', page: 23, fig: 'جدول قياس الصلادة التصاعدي ص 23',
    desc: 'الصلادة: خاصية المادة على خدش مواد أخرى أو مقاومتها للخدش. تقاس صلادة المادة بمقارنتها بصلادة عشر مواد مرتبة في الجدول من 1 إلى 10، حيث أن كل مادة في الجدول تخدش المادة الأقل منها وتُخدش من المادة الأعلى منها في الترتيب.',
    tags: 'الصلادة الخدش جدول موس التلك الماس الكوارتز hardness',
    tools: ['عشر عينات معدنية (من التلك إلى الماس)'],
    steps: ['اختر العينة (الصف العلوي) والأداة التي تخدش بها (الصف السفلي).', 'اسحب رأس الأداة على سطح العينة.', 'إذا ظهر خدش فالأداة أصلد من العينة، وإذا لم يظهر فالعينة أصلد أو متساويتان.', 'جرّب الماس على كل العينات، والتلك على كل العينات.'],
    concl: ['كل مادة في الجدول تخدش المادة الأقل منها وتُخدش من المادة الأعلى منها.', 'الماس (10) أصلد المواد: يخدش جميعها ولا يخدشه غيره.', 'التلك (1) أقل المواد صلادة: يُخدش من الجميع.'],
    laws: [],
    controls: [],
    setup(S) { S.s = 6; S.t = 9; S.scr = []; S.done = {}; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S); return { w, h, ph, L, cx: L + (w - L) * .42, cy: h * (ph ? .4 : .42), sw: ph ? 200 : 280, sh: ph ? 90 : 120 }; },
    tip(S, g) { return S.tp || [g.cx + g.sw / 2 + 80, g.cy - 60]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, sH = S.s + 1, tH = S.t + 1;
      Q42.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = '#78350f'; ctx.fillRect(g.L + 10, g.cy + g.sh / 2, w - g.L - 20, 14); });
      Q42.box(ctx, g.cx - g.sw / 2, g.cy - g.sh / 2, g.sw, g.sh, 22, COL[S.s]);
      K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.cx - g.sw / 2, g.cy - g.sh / 2, g.sw, g.sh); ctx.clip(); S.scr.forEach(st => { if (st.length < 2) return; const ok = st.ok; ctx.strokeStyle = ok > 0 ? 'rgba(15,23,42,.75)' : ok === 0 ? 'rgba(71,85,105,.4)' : 'rgba(255,255,255,.9)'; ctx.lineWidth = ok > 0 ? 3 : 5; ctx.lineCap = 'round'; ctx.beginPath(); st.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); }); ctx.restore(); });
      Q42.T(ctx, 'العينة: ' + MO[S.s] + ' (' + sH + ')', g.cx, g.cy + g.sh / 2 + 30, { s: fs + 1, w: 900, c: '#0f172a' });
      // tool (pencil-like rod with mineral tip)
      const T = D.tip(S, g); K.raw(ctx, () => { ctx.save(); ctx.translate(T[0], T[1]); ctx.rotate(-.7); ctx.fillStyle = '#334155'; rr(ctx, 6, -7, 110, 14, 4); ctx.fill(); ctx.fillStyle = COL[S.t]; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(10, -8); ctx.lineTo(10, 8); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); });
      Q42.T(ctx, 'الأداة: ' + MO[S.t] + ' (' + tH + ')', T[0] + 60, T[1] - 70, { s: fs, w: 900, c: '#fff', bg: '#0f766e' });
      const last = S.scr.length ? S.scr[S.scr.length - 1].ok : null;
      if (last != null) Q26.verdict(ctx, g.cx, g.cy - g.sh / 2 - 46, last > 0, last > 0 ? MO[S.t] + ' خدش ' + MO[S.s] + ': الأداة أصلد' : last === 0 ? 'صلادتهما متساوية: لا خدش واضح' : 'لم يُخدش ' + MO[S.s] + ': هو أصلد (تركت الأداة مسحوقاً)');
      const R1 = D.row(S, g, 0), R2 = D.row(S, g, 1); Q42.T(ctx, 'العينة', g.L + 30, R1[0].y - 26, { s: fs, w: 900, c: '#334155' }); Q42.drawChips(ctx, R1); Q42.T(ctx, 'أداة الخدش', g.L + 40, R2[0].y - 26, { s: fs, w: 900, c: '#334155' }); Q42.drawChips(ctx, R2);
      if (!g.ph) Q42.card(ctx, S, MO.map((m, i) => ({ t: (i + 1) + ') ' + m + (S.done[i] ? '  ✔' : ''), c: i === S.s ? '#b45309' : i === S.t ? '#0f766e' : '#334155', w: i === S.s || i === S.t ? 900 : 700, s: 11.5 })), { title: 'جدول الصلادة التصاعدي', y: 44, wd: 230, lh: 18 });
      Q42.banner(ctx, w, 'اسحب رأس الأداة على سطح العينة');
    },
    row(S, g, r) { const y = g.h - (r ? 82 : 128); return Q42.chips(S, r ? 'tl' : 'sm', MO.map((m, i) => [String(i), (i + 1) + ' ' + (g.ph ? '' : m)]), y, String(r ? S.t : S.s), (S2, k) => { if (r) S2.t = +k; else { S2.s = +k; S2.scr = []; } }, { bw: 110, bh: 30, col: r ? '#0f766e' : '#b45309' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), T = D.tip(S, g);
      const L = [{ id: 'tool', x: T[0] + 30, y: T[1] - 22, r: 34, axis: 'xy', keep: true, tip: 'اسحب الأداة على العينة', idle: 'اسحب أداة الخدش ✋', down: S2 => { S2._new = 1; }, drag: (S2, d) => { const p = [d.ox + d.x - d.sx - 30, d.oy + d.y - d.sy + 22]; S2.tp = p; const inS = Math.abs(p[0] - g.cx) < g.sw / 2 && Math.abs(p[1] - g.cy) < g.sh / 2; if (inS) { if (S2._new || !S2.scr.length) { S2.scr.push(Object.assign([], { ok: Math.sign(S2.t - S2.s) })); S2._new = 0; if (S2.t !== S2.s) S2.done[S2.t > S2.s ? S2.s : S2.t] = 1; } S2.scr[S2.scr.length - 1].push(p); } else S2._new = 1; } }];
      return L.concat(D.row(S, g, 0), D.row(S, g, 1)); },
    readings(S) { return [rd('العينة', MO[S.s] + ' (' + (S.s + 1) + ')'), rd('الأداة', MO[S.t] + ' (' + (S.t + 1) + ')'), rd('النتيجة المتوقعة', S.t > S.s ? 'تخدش' : S.t < S.s ? 'لا تخدش' : 'متساويتان')]; },
    explain(S) { return Q26.ex(S.t > S.s ? MO[S.t] + ' يخدش ' + MO[S.s] + '.' : MO[S.t] + ' لا يخدش ' + MO[S.s] + '.', 'تقاس صلادة المادة بمقارنتها بالجدول: كل مادة تخدش المادة الأقل منها وتُخدش من المادة الأعلى منها في الترتيب.', 'رؤوس مثاقب حفر النفط ومناشير قطع الحجر مطلية بالماس لأنه أصلد المواد.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D3 — مقارنة الخصائص بالمطرقة: الليونة والهشاشة والقساوة والمرونة (ص 22–24 + فكر) =============== */
(() => {
  const SM = [['cu', 'نحاس', '#d97706', 'الليونة: يتشكل بالطرق والسحب دون أن ينكسر'], ['gl', 'زجاج', '#7dd3fc', 'الهشاشة: ينكسر مباشرة ولا يصل إلى التشوه الدائم'], ['st', 'فولاذ', '#94a3b8', 'القساوة والصلادة: يقاوم التشوه، معامل يونك عالٍ 2×10¹¹ N/m²'], ['rb', 'مطاط', '#334155', 'مرونة عالية: يتشوه كثيراً ثم يعود إلى شكله']];
  const D = { id: 'g10_m_hammer', page: 22, fig: 'بعض الخصائص الميكانيكية للمواد الصلبة 4-2',
    desc: 'هناك خصائص ميكانيكية ينبغي أن تؤخذ بنظر الاعتبار عند اختبار المواد الصلبة: الليونة (قابلية المط والكبس واللي والسحب والطرق كالنحاس)، الهشاشة (تنكسر مباشرة بعد حد المرونة كالزجاج والحديد الصلب والكونكريت)، القساوة (مقاومة التشوه كالفولاذ)، المتانة، الصلادة، والعجز (فقدان قوة التحمل).',
    tags: 'الليونة الهشاشة القساوة المتانة الصلادة العجز مقارنة نحاس زجاج فولاذ مطاط فكر',
    tools: ['مطرقة', 'سندان', 'قطع من النحاس والزجاج والفولاذ والمطاط'],
    steps: ['اضغط على أي قطعة (أو اسحب المطرقة إليها) لتطرقها.', 'اطرق كل قطعة عدة مرات وقارن: أيها يتشكل؟ أيها ينكسر؟ أيها يقاوم؟ أيها يعود إلى شكله؟', 'اقرأ الخاصية التي تظهر تحت كل قطعة، وأجب عن «فكر»: ما الخصائص التي يمتاز بها كل من المطاط والماس؟'],
    concl: ['الليونة: خاصية المادة التي تمتاز بقابليتها على المط والكبس واللي والسحب والطرق (النحاس).', 'الهشاشة: المادة تنكسر مباشرة بعد اجتيازها حد المرونة (الزجاج، الحديد الصلب، الكونكريت).', 'القساوة: مقاومة التشوه، والفولاذ معامل يونك له عالٍ (2×10¹¹ N/m²).', 'العجز: خاصية المادة الصلبة على فقدان قوة تحملها تحت تأثير إجهاد خارجي.', 'فكر: المطاط عالي المرونة، والماس أصلد المواد لكنه هش.'],
    laws: [],
    controls: [],
    setup(S) { S.hits = [0, 0, 0, 0]; S.anim = null; S.hp = null; },
    update(S, dt) { if (S.anim) { S.anim.t += dt * 3; if (S.anim.t >= 1 && !S.anim.done) { S.anim.done = 1; S.hits[S.anim.i]++; } if (S.anim.t >= 1.6) S.anim = null; } },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), ay = h * (ph ? .42 : .52); return { w, h, ph, L, ay, xs: SM.map((q, i) => L + (w - L) * (.14 + i * .24)) }; },
    hit(S, i) { if (!S.anim) S.anim = { i, t: 0 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 9.5 : 11.5; Q42.bg(ctx, w, h);
      SM.forEach((q, i) => { const x = g.xs[i], n = S.hits[i];
        K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; rr(ctx, x - 50, g.ay, 100, 22, 4); ctx.fill(); ctx.fillStyle = '#374151'; ctx.fillRect(x - 26, g.ay + 22, 52, 40); ctx.fillRect(x - 44, g.ay + 62, 88, 12); });
        const squash = S.anim && S.anim.i === i ? Math.max(0, 1 - Math.abs(S.anim.t - 1) * 4) : 0;
        if (q[0] === 'cu') { const th = Math.max(8, 30 - n * 4), wd = 50 * 30 / th; Q42.box(ctx, x - wd / 2, g.ay - th, wd, th, 10, q[2]); }
        else if (q[0] === 'gl') { if (n === 0) Q42.box(ctx, x - 25, g.ay - 30, 50, 30, 10, q[2], { alpha: .85 }); else K.raw(ctx, () => { ctx.fillStyle = q[2]; for (let k = 0; k < 9; k++) { const a = k * 2.1, r = 16 + (k * 13) % 30; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r, g.ay - 4 - (k % 3) * 3); ctx.lineTo(x + Math.cos(a) * r + 9, g.ay - 2); ctx.lineTo(x + Math.cos(a) * r - 4, g.ay); ctx.closePath(); ctx.fill(); } }); }
        else if (q[0] === 'st') { Q42.box(ctx, x - 25, g.ay - 30, 50, 30, 10, q[2]); if (n) K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.25)'; ctx.beginPath(); ctx.ellipse(x + 2, g.ay - 30, 4 + Math.min(n, 6), 2, 0, 0, TAU); ctx.fill(); }); }
        else { const th = 30 * (1 - .6 * squash), wd = 50 * 30 / th; Q42.box(ctx, x - wd / 2, g.ay - th, wd, th, 10, q[2]); }
        Q42.T(ctx, q[1], x, g.ay + 92, { s: fs + 2, w: 900, c: '#0f172a' }); Q42.T(ctx, 'طرقات: ' + n, x, g.ay + 112, { s: fs, w: 800, c: '#475569' });
        if (n) { const lines = Q26.wrap(q[3], g.ph ? 14 : 22); lines.forEach((t, k) => Q42.T(ctx, t, x, g.ay + 136 + k * 18, { s: fs, w: 900, c: k ? '#334155' : '#0f766e' })); }
      });
      // hammer
      let hx, hy, rot = 0; if (S.anim) { const x = g.xs[S.anim.i], t = S.anim.t; const up = t < 1 ? 1 - t : (t - 1) * 1.6; hx = x; hy = g.ay - 34 - 120 * clamp(up, 0, 1); rot = -.9 * clamp(up, 0, 1); } else if (S.hp) { hx = S.hp[0]; hy = S.hp[1]; rot = -.5; } else { hx = w - 80; hy = g.ay - 170; rot = -.4; }
      K.raw(ctx, () => { ctx.save(); ctx.translate(hx, hy); ctx.rotate(rot); ctx.fillStyle = '#92400e'; rr(ctx, -5, -6, 12, 120, 4); ctx.fill(); const gr = ctx.createLinearGradient(-30, 0, 30, 0); gr.addColorStop(0, '#4b5563'); gr.addColorStop(.5, '#e5e7eb'); gr.addColorStop(1, '#374151'); ctx.fillStyle = gr; rr(ctx, -32, -24, 64, 26, 4); ctx.fill(); ctx.restore(); });
      if (!g.ph) Q42.card(ctx, S, [{ t: 'المطاط: مرونة عالية، يعود إلى شكله', c: '#334155' }, { t: 'الماس: أصلد المواد (الصلادة 10) لكنه هش', c: '#334155' }], { title: 'فكر (ص 23)', y: 44, wd: 300 });
      Q42.banner(ctx, w, 'اضغط على أي قطعة لطرقها، أو اسحب المطرقة إليها');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); const L = g.xs.map((x, i) => ({ id: 'smp' + i, x, y: g.ay - 15, w: 100, h: 70, axis: 'xy', tip: 'اضغط لطرق ' + SM[i][1], idle: i ? undefined : 'اطرق القطعة ✋', click: S2 => D.hit(S2, i) }));
      const hp = S.hp || [g.w - 80, g.ay - 170]; L.push({ id: 'hammer', x: hp[0], y: hp[1] - 10, r: 34, axis: 'xy', keep: true, tip: 'اسحب المطرقة فوق قطعة ثم اتركها', drag: (S2, d) => { S2.hp = [d.ox + d.x - d.sx, d.oy + d.y - d.sy + 10]; }, up: S2 => { if (!S2.hp) return; const i = g.xs.findIndex(x => Math.abs(x - S2.hp[0]) < 60); if (i >= 0 && S2.hp[1] < g.ay + 40) D.hit(S2, i); S2.hp = null; } });
      return L; },
    readings(S) { return SM.map((q, i) => rd(q[1], S.hits[i] ? q[3].split(':')[0] : 'لم تُطرق')); },
    explain(S) { return Q26.ex('النحاس يتسطح ولا ينكسر، والزجاج يتهشم من أول طرقة، والفولاذ لا يكاد يتأثر، والمطاط ينضغط ثم يعود.', 'لكل مادة خصائص ميكانيكية تحدد استعمالها: الليونة، الهشاشة، القساوة، المتانة، الصلادة. المادة الهشة تنكسر بعد حد المرونة مباشرة، واللدنة تتشوه تشوهاً دائماً قبل الانكسار.', 'تُصنع الأسلاك الكهربائية من النحاس (لين)، وأدوات القطع من الفولاذ (قاسٍ وصلد)، وإطارات السيارات من المطاط (مرن).'); }
  };
  M8.P[D.id] = D;
})();

/* interaction counter (lets the smoke test see that each drag/click handler ran) */
['g10_k_band', 'g10_k_activity', 'g10_s_types', 'g10_s_strain', 'g10_y_lab', 'g10_y_graph', 'g10_y_problems', 'g10_m_curve', 'g10_m_hard', 'g10_m_hammer'].forEach(id => { const D = M8.P[id]; if (!D || !D.drags) return; const od = D.drags;
  D.drags = S => (od.call(D, S) || []).map(o => { ['drag', 'click'].forEach(f => { if (o[f]) { const fn = o[f]; o[f] = (S2, ...a) => { S2.act = (S2.act || 0) + 1; return fn(S2, ...a); }; } }); return o; }); });
Object.keys(M8.P).filter(id => id.indexOf('g10_') === 0 && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g10_hooke', ch: 42, reg: X10, sec: 'مقدمة + 1-2 مفهوم المرونة وقانون هوك', page: 15, kind: 'نشاط',
  title: 'المرونة وقانون هوك: نشاط النابض والأثقال (F = k ΔL)',
  desc: 'نشاط الكتاب: نعلّق أثقالاً متساوية 0.1 N بنابض حلزوني ونقيس الزيادة في طوله، ونرسم العلاقة البيانية (الجدول 1 والشكل 4-2) لنصل إلى قانون هوك F = k ΔL. وقبله: المطاط وسلك الفولاذ والنابض يعودان إلى أطوالهما بعد زوال القوة (الشكل 1-2).',
  tags: 'المرونة قانون هوك نابض ثابت المرونة',
  fact: ['للمادة ثلاث حالات (صلبة وسائلة وغازية) على وفق القوى الجزيئية والطاقة الحركية للجزيئات، كما توجد حالة أخرى تسمى البلازما (ص 15).', 'تُصنع مواد صناعية جديدة كالألياف الصناعية تمتاز بتحمّلها لإجهادات عالية رغم خفة وزنها، فتستعمل في هياكل الطائرات والصواريخ والمركبات الفضائية (ص 15).', 'وجد العالم روبرت هوك العلاقة بين القوة المؤثرة في سلك ومقدار التغير الحاصل في طوله (ص 16).'],
  quiz: [
    { q: 'خاصية المادة التي تجعل النابض يستعيد طوله الأصلي بعد سحبه قليلاً وتركه تسمى:', o: ['الهشاشة', 'الليونة', 'القساوة', 'المرونة'], a: 3, why: 'س1-1 ص 25: المرونة هي الإعاقة التي يبديها الجسم للقوة المغيرة لشكله أو حجمه أو طوله مع رجوعه إلى وضعه السابق بعد زوال المؤثر.' },
    { q: 'ينطبق قانون هوك على المواد الصلبة في حدود:', o: ['المتانة', 'العجز الهندسي', 'المرونة', 'إجهاد القص'], a: 2, why: 'س1-3 ص 25: الاستطالة تتناسب طردياً مع قوة الشد ضمن حدود المرونة.' },
    { q: 'علّقنا 0.2 N بنابض فاستطال 0.6×10⁻² m. ثابت النابض k يساوي:', o: ['33.3 N/m', '0.12 N/m', '3 N/m'], a: 0, why: 'k = F/ΔL = 0.2 / 0.006 = 33.3 N/m (الجدول 1).' },
    { q: 'ما المقصود بثابت مرونة النابض وما وحدة قياسه؟', o: ['ميل خط القوة مع الاستطالة ويقاس بـ N/m ويعتمد على شكل النابض ومادته', 'القوة القاطعة للنابض ويقاس بـ N', 'طول النابض الأصلي ويقاس بـ m'], a: 0, why: 'س4 ص 26 وص 17: k يمثل ميل الخط المستقيم ويقاس بوحدة N/m، ولا يتغير إلا بتغير شكل النابض أو مادته.' }],
  parts: [{ id: 'g10_k_activity', n: 'نشاط مفهوم المرونة: النابض والأثقال (الشكلان 2-2، 3-2، 4-2)' }, { id: 'g10_k_band', n: 'المطاط والنابض وسلك الفولاذ: F و 2F (الشكل 1-2)' }] });
M8.merge({ id: 'g10_stress', ch: 42, reg: X10, sec: '2-2 الإجهاد والمطاوعة', page: 18, kind: 'نشاط',
  title: 'الإجهاد والمطاوعة: الشد والكبس والقص، والمطاوعة الطولية والقص والحجم',
  desc: 'الإجهاد مقدار القوة العمودية المؤثرة في وحدة المساحة (N/m²): إجهاد الشد والكبس (الطولي) وإجهاد القص (الأشكال 5-2 إلى 7-2). والمطاوعة مقياس لمقدار التشوه: طولية ΔL/Lo، قص θ، حجم ΔV/Vo (الأشكال 8-2 إلى 10-2).',
  tags: 'إجهاد مطاوعة شد كبس قص حجم',
  fact: ['تختلف الإجهادات في المواد التي تؤثر فيها القوة في الجسم: إجهاد طولي (شد أو كبس) وإجهاد قص (ص 18–19).', 'نوع المطاوعة يتوقف على نوع الإجهاد الذي يتعرض له الجسم (ص 19).'],
  quiz: [
    { q: 'عندما تؤثر قوة في جسم فإن الإجهاد الطولي فيه يساوي:', o: ['التغير النسبي في أبعاده', 'القوة العمودية المؤثرة لوحدة المساحة', 'معامل يونك', 'حد المرونة'], a: 1, why: 'س1-5 ص 25.' },
    { q: 'إجهاد القص العامل على جسم يؤثر في:', o: ['طوله', 'عرضه', 'حجمه', 'شكله'], a: 3, why: 'س1-6 ص 25: إجهاد القص يسبب تشوهاً في شكل الجسم (الشكل 7-2).' },
    { q: 'عندما تؤثر على جسم قوتا سحب متساويتان في المقدار ومتعاكستان في الاتجاه وعلى خط فعل واحد يقال إن الجسم واقع تحت تأثير:', o: ['إجهاد شد', 'إجهاد كبس', 'المطاوعة', 'إجهاد قص'], a: 0, why: 'س1-10 ص 26 والشكل 5-2.' },
    { q: 'مطاوعة القص يُعبَّر عنها بـ:', o: ['نسبة التغير في الطول إلى الطول الأصلي', 'نسبة التغير في الحجم إلى الحجم الأصلي', 'مقدار الزاوية التي ينحرف بها سطحا الجسم المتقابلان المؤثرة فيهما قوتان بموازاتهما'], a: 2, why: 'س5 ص 26 والشكل 9-2.' }],
  parts: [{ id: 'g10_s_types', n: 'أنواع الإجهاد: الشد والكبس والقص (الأشكال 5-2، 6-2، 7-2)' }, { id: 'g10_s_strain', n: 'أنواع المطاوعة: طولية وقص وحجم (الأشكال 8-2، 9-2، 10-2)' }] });
M8.merge({ id: 'g10_young', ch: 42, reg: X10, sec: '3-2 معامل المرونة (معامل يونك)', page: 21, kind: 'مثال',
  title: 'معامل يونك: جهاز السلك، الجدول (2)، مثال ص 22، سؤال الجدول (3) والمسائل',
  desc: 'معامل يونك Y = (F/A) / (ΔL/Lo) صفة مميزة للمواد الصلبة. نقيس استطالة أسلاك من مواد الجدول (2)، ونحل مثال ص 22 على الجهاز، ونجد Y بيانياً من بيانات الجدول (3)، ثم نحل مسائل الفصل.',
  tags: 'معامل يونك معامل المرونة مسائل',
  fact: ['معامل يونك للماس 1200×10⁹ N/m² وللفولاذ 200×10⁹ وللرصاص 16×10⁹ N/m² (الجدول 2).', 'النسبة (الإجهاد / المطاوعة) صفة مميزة للمواد الصلبة (ص 21).'],
  quiz: [
    { q: 'مرونة الفولاذ أكبر من مرونة المطاط بسبب:', o: ['الفولاذ يحتاج قوة شد أو كبس كبيرة', 'المطاط يحتاج قوة شد أو كبس كبيرة', 'معامل مرونة الفولاذ صغيرة', 'معامل مرونة الفولاذ كبيرة'], a: 3, why: 'س1-2 ص 25: معامل يونك للفولاذ كبير جداً.' },
    { q: 'الإجهاد المؤثر في سلك شاقولي معلق به ثقل لا يعتمد على:', o: ['طول السلك', 'قطر السلك', 'كتلة الثقل', 'تعجيل الجاذبية'], a: 0, why: 'س1-7 ص 25: الإجهاد = mg / A لا يعتمد على الطول.' },
    { q: 'X و Y سلكان من مادة واحدة، طول X نصف طول Y وقطره ضعف قطر Y. إذا استطالا بالمقدار نفسه فالقوة المؤثرة على X تساوي:', o: ['نصف القوة على Y', 'ضعف ما على Y', 'أربع أمثال ما على Y', 'ثمانية أمثال ما على Y'], a: 3, why: 'س1-8 ص 26: F = Y A ΔL / Lo: المساحة 4 أمثال والطول النصف ⟸ 8 أمثال.' },
    { q: 'سلك فولاذي طوله 4 m ومساحة مقطعه 0.05 cm² سُحب بقوة 500 N (Y = 200×10⁹). الزيادة في طوله:', o: ['2 mm', '0.2 mm', '20 mm'], a: 0, why: 'مثال ص 22: ΔL = F Lo / (Y A) = 2×10⁻³ m.' }],
  parts: [{ id: 'g10_y_lab', n: 'جهاز معامل يونك + الجدول (2) + مثال ص 22' }, { id: 'g10_y_graph', n: 'سؤال ص 22: Y من ميل الخط (الجدول 3)' }, { id: 'g10_y_problems', n: 'مسائل الفصل س1–س6 + س2 ص 26' }] });
M8.merge({ id: 'g10_props', ch: 42, reg: X10, sec: '4-2 بعض الخصائص الميكانيكية للمواد الصلبة', page: 22, kind: 'نشاط',
  title: 'الخصائص الميكانيكية: منحني الشد، التشوه المرن والبلاستيكي، الصلادة، ومقارنة المواد',
  desc: 'الليونة والهشاشة والقساوة والمتانة والصلادة والعجز. نشد سلكاً من النحاس حتى ينقطع ونرسم منحنيه (الشكل 11-2)، ونختبر الصلادة بجدول الخدش، ونقارن المواد بالمطرقة جنباً إلى جنب.',
  tags: 'خصائص ميكانيكية ليونة هشاشة قساوة متانة صلادة عجز تشوه مرن بلاستيكي',
  fact: ['بداية القطع (الكسر) يظهر في سطح المادة في المناطق ذات المتانة القليلة والتي تظهرها كونها تمتلك تشققات في جزء من تركيبها البلوري (هل تعلم ص 24).', 'مقاومة المادة الهشة تزداد بالضغط، فمثلاً عند عمق 10 km في القشرة الأرضية تصبح الصخور أقل احتمالاً للتكسر وأكثر احتمالاً لتشوه المط (هل تعلم ص 24).', 'لتجنب كسر الزجاج أو امتصاص نمو الكسر تؤخذ صفيحتان من الزجاج مفصولتان بطبقة من مادة بولي فاينل بيوترال التي تعمل كمانع للتكسر (هل تعلم ص 24).', 'السلك النحاسي ذو المساحة 1 mm² يصل إلى حد المرونة عند قوة شد 150 N (ص 24).'],
  quiz: [
    { q: 'المواد التي لا يمكن زيادة طولها إلا بإجهاد عالٍ وضمن حدود مرونتها تسمى مواد:', o: ['هشة', 'عالية المرونة', 'غير المرنة', 'قابلة للطرق'], a: 0, why: 'س1-4 ص 25: المواد الهشة تنكسر مباشرة بعد اجتيازها حد المرونة.' },
    { q: 'الزيادة الحاصلة في طول الجسم أو شكله خارج حدود المرونة تسمى:', o: ['تشوه مؤقت', 'تشوه دائم', 'تتناسب طردياً مع القوة المؤثرة', 'تتناسب مع القوة المؤثرة'], a: 1, why: 'س1-9 ص 26: التشوه البلاستيكي (اللدن) دائم.' },
    { q: 'إذا كانت القوة اللازمة لقطع سلك هي F، فالقوة اللازمة لقطع سلك من النوع نفسه قطره ضعف قطر الأول:', o: ['F', '2F', '4F'], a: 2, why: 'س2 ص 26: المساحة π r² تصبح أربعة أمثال ⟸ 4F.' },
    { q: 'أي المواد الآتية يخدش الكوارتز (7)؟', o: ['الفلسبار (6)', 'التوباز (8)', 'الكالسايت (3)'], a: 1, why: 'جدول الصلادة ص 23: كل مادة تخدش المادة الأقل منها.' },
    { q: 'ما العوامل التي تحدد مقدار ونوع التشوه الذي يحصل في المادة الصلبة؟', o: ['مقدار القوة الخارجية وأبعاد الجسم والمادة المصنوع منها', 'لون المادة فقط', 'درجة الحرارة فقط'], a: 0, why: 'س3 ص 26 وص 15.' }],
  parts: [{ id: 'g10_m_curve', n: 'منحني الشد: التشوه المرن والبلاستيكي (الشكل 11-2)' }, { id: 'g10_m_hammer', n: 'مقارنة المواد بالمطرقة: الليونة والهشاشة والقساوة' }, { id: 'g10_m_hard', n: 'الصلادة: جدول الخدش التصاعدي (ص 23)' }] });
