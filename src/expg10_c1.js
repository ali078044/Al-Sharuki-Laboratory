'use strict';
/* ====================== الرابع العلمي — الفصل الأول: معلمات رئيسة في الفيزياء (ch 41, ص 4–14) ======================
   Merged experiments (book order): g10_si (1-1, 1-2) · g10_err (1-3) · g10_graph (1-4) · g10_prop (1-5)
   This file sorts before expg10_c2.js, so the Q42 kit is used only inside functions (never at load time). */
const Q41 = {
  /* graph frame: returns X(v), Y(v) mappers */
  axes(ctx, A) {
    const X = v => A.x + (v - (A.x0 || 0)) / (A.xmax - (A.x0 || 0)) * A.w, Y = v => A.y + A.h - v / A.ymax * A.h;
    K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, A.x - 36, A.y - 22, A.w + 56, A.h + 56, 8); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = 'rgba(15,118,110,.14)'; ctx.lineWidth = 1; for (let v = (A.x0 || 0); v <= A.xmax + 1e-9; v += A.xs) { ctx.beginPath(); ctx.moveTo(X(v), A.y); ctx.lineTo(X(v), A.y + A.h); ctx.stroke(); } for (let v = 0; v <= A.ymax + 1e-9; v += A.ys) { ctx.beginPath(); ctx.moveTo(A.x, Y(v)); ctx.lineTo(A.x + A.w, Y(v)); ctx.stroke(); }
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(A.x, A.y - 8); ctx.lineTo(A.x, A.y + A.h); ctx.lineTo(A.x + A.w + 8, A.y + A.h); ctx.stroke(); });
    const lx = A.lxs || A.xs * 2, ly = A.lys || A.ys * 2;
    for (let v = (A.x0 || 0); v <= A.xmax + 1e-9; v += lx) Q42.T(ctx, String(+v.toFixed(3)), X(v), A.y + A.h + 11, { s: 9.5, w: 700, c: '#334155' });
    for (let v = 0; v <= A.ymax + 1e-9; v += ly) Q42.T(ctx, String(+v.toFixed(3)), A.x - 16, Y(v), { s: 9.5, w: 700, c: '#334155' });
    Q42.T(ctx, A.xl, A.x + A.w - 14, A.y + A.h + 26, { s: 10, w: 800, c: '#0f172a' }); Q42.T(ctx, A.yl, A.x + 8, A.y - 12, { s: 10, w: 800, c: '#0f172a', a: 'left' });
    return { X, Y };
  },
  dot(ctx, x, y, c = '#dc2626', r = 5) { K.raw(ctx, () => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke(); }); },
  line(ctx, pts, c = '#0f766e', w = 2.4, dash) { K.raw(ctx, () => { ctx.strokeStyle = c; ctx.lineWidth = w; if (dash) ctx.setLineDash(dash); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]); }); },
  knob(ctx, x, y, c = '#dc2626', r = 11) { K.raw(ctx, () => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.stroke(); }); },
  /* horizontal slider track with a knob; returns geometry for drags */
  slider(ctx, x0, x1, y, t, lab, c = '#dc2626') { K.raw(ctx, () => { ctx.lineCap = 'round'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + (x1 - x0) * t, y); ctx.stroke(); }); Q41.knob(ctx, x0 + (x1 - x0) * t, y, c); if (lab) Q42.T(ctx, lab, (x0 + x1) / 2, y - 18, { s: 10.5, w: 800, c: '#334155' }); },
  sdrag(id, x0, x1, y, t, set, o = {}) { return Object.assign({ id, x: x0 + (x1 - x0) * t, y, r: 18, axis: 'x', keep: true, tip: o.tip || 'اسحب', drag: (S2, d) => set(S2, clamp((d.x - x0) / (x1 - x0), 0, 1)) }, o.extra || {}); },
  /* step-solution chip pair + card shared by every part */
  stepChips(S, id, y, x0, cur, onEx) { return Q42.chips(S, id, [['ex', cur || 'الحل خطوة خطوة'], ['nx', '⬇ الخطوة التالية']], y, '', (S2, k) => { if (k === 'ex' || !S2.ex) { S2.ex = 1; S2.k = 0; if (onEx) onEx(S2); if (k === 'ex') return; } S2.k = Math.min(S2.k + 1, 9); }, { bw: 160, x0 }); }
};

LW({ id: 'g10_rad', cat: 41, name: 'الراديان والستراديان', fx: '<i>θ</i> = ' + FR('<i>s</i>', '<i>r</i>') + ' ، <i>Ω</i> = ' + FR('<i>A</i>', '<i>r</i>²'), sym: 'الزاوية بالراديان = طول القوس ÷ نصف القطر، والدورة الكاملة 2π rad = 360° ، 1 rad = 57.3°. الزاوية المجسمة بالستراديان = المساحة على سطح الكرة ÷ مربع نصف القطر، والكرة كلها 4π sr', calc: { in: [['s', 'طول القوس s', 'm', 1], ['r', 'نصف القطر r', 'm', 1]], out: 'الزاوية θ بالدرجات', u: '°', f: v => v.s / v.r * 180 / Math.PI } });
LW({ id: 'g10_slope', cat: 41, name: 'ميل الخط المستقيم', fx: '<i>m</i> = ' + FR('Δ<i>y</i>', 'Δ<i>x</i>') + ' = ' + FR('<i>y</i><sub>2</sub> − <i>y</i><sub>1</sub>', '<i>x</i><sub>2</sub> − <i>x</i><sub>1</sub>'), sym: 'ميل الخط البياني يؤخذ من نقطتين عليه، وفي رسم المسافة مع الزمن يمثل الميل الانطلاق', calc: { in: [['y2', 'd₂', 'km', 80], ['y1', 'd₁', 'km', 40], ['x2', 't₂', 'h', 1], ['x1', 't₁', 'h', .5]], out: 'الميل (الانطلاق)', u: 'km/h', f: v => (v.y2 - v.y1) / (v.x2 - v.x1) } });
LW({ id: 'g10_propor', cat: 41, name: 'التغير الطردي والعكسي', fx: '<i>a</i> ∝ <i>b</i> ⟺ <i>a</i> = <i>k b</i> ، <i>a</i> ∝ ' + FR('1', '<i>b</i>') + ' ⟺ <i>a</i> = ' + FR('<i>k</i>', '<i>b</i>'), sym: 'في الطردي تبقى النسبة a/b ثابتة والرسم خط مستقيم يمر بنقطة الأصل، وفي العكسي يبقى حاصل الضرب a × b ثابتاً', calc: { in: [['a1', 'a₁', '', 8], ['b1', 'b₁', '', 15], ['b2', 'b₂', '', 10]], out: 'a₂ في التغير الطردي', u: '', f: v => v.a1 * v.b2 / v.b1 } });
LW({ id: 'g10_gas', cat: 41, name: 'قانون الغاز المثالي', fx: '<i>p V</i> = <i>n R T</i>', sym: 'يجمع قانون بويل (V ∝ 1/p بثبوت T) وقانون شارل (V ∝ T بثبوت p). R = 8.314 J/(mol·K) والحرارة بالكلفن', calc: { in: [['n', 'عدد المولات n', 'mol', 1], ['T', 'درجة الحرارة T', 'K', 273], ['V', 'الحجم V', 'm³', .0224]], out: 'الضغط p', u: 'Pa', f: v => v.n * 8.314 * v.T / v.V } });

/* =============== A1 — وحدات النظام الدولي: صِل الكمية بوحدتها (الجدولان 1 و 2، ص 4–5) =============== */
(() => {
  const BASE = [['len', 'الطول', 'm', 'metre متر'], ['mass', 'الكتلة', 'kg', 'kilogram كيلوغرام'], ['time', 'الزمن', 's', 'second ثانية'], ['cur', 'التيار الكهربائي', 'A', 'ampere أمبير'], ['mol', 'كمية المادة', 'mol', 'mole مول'], ['temp', 'درجة الحرارة', 'K', 'kelvin كلفن'], ['lum', 'شدة الإضاءة', 'cd', 'candela شمعة']];
  const SUP = [['ang', 'الزاوية المستوية', 'rad', 'radian راديان'], ['sol', 'الزاوية المجسمة', 'sr', 'steradian ستراديان']];
  const ORD = [3, 0, 5, 1, 6, 2, 4]; // fixed shuffle of the unit column
  const list = S => S.set === 'sup' ? SUP : BASE;
  const D = { id: 'g10_u_si', page: 4, fig: 'الجدول (1) + الجدول (2)',
    desc: 'اتفق العلماء في المؤتمر الدولي للأوزان والمقاييس على نظام موحد للوحدات يسمى النظام الدولي SI، وله سبع وحدات أساسية (الجدول 1) ووحدتان تكميليتان هما الراديان والستراديان (الجدول 2). وكل الكميات الفيزيائية الأخرى تشتق من الكميات الأساسية.',
    tags: 'النظام الدولي SI وحدات أساسية متر كيلوغرام ثانية أمبير مول كلفن شمعة راديان ستراديان الجدول 1 الجدول 2',
    tools: ['بطاقات الكميات الأساسية', 'بطاقات الوحدات'],
    steps: ['اضغط على كمية فيزيائية من العمود الأيمن.', 'ثم اضغط على وحدتها في النظام الدولي من العمود الأيسر: الصحيح يُوصل بخط أخضر.', 'أكمل الكميات السبع الأساسية، ثم اضغط «الوحدات التكميلية» في الأسفل.'],
    concl: ['للنظام الدولي سبع وحدات أساسية: m ، kg ، s ، A ، mol ، K ، cd.', 'الوحدتان التكميليتان: الراديان rad للزاوية المستوية والستراديان sr للزاوية المجسمة.', 'جميع الكميات الأخرى (كالسرعة والقوة) كميات مشتقة من الكميات الأساسية.'],
    controls: [],
    setup(S) { S.set = 'base'; S.sel = ''; S.ok = {}; S.bad = ''; S.bt = 0; S.n = 0; },
    update(S, dt) { if (S.bt > 0) S.bt -= dt; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), top = ph ? 70 : 76, bot = h - 160, qx = ph ? w - 92 : L + 330, ux = ph ? 72 : L + 90; return { w, h, ph, L, top, bot, qx, ux, bw: ph ? 160 : 190, ubw: ph ? 120 : 150 }; },
    rows(S, g) { const n = list(S).length, dy = Math.min(56, (g.bot - g.top) / n); return { n, dy }; },
    items(S) { const g = D.geo(S), r = D.rows(S, g), Ls = list(S); const ord = S.set === 'sup' ? [1, 0] : ORD;
      const Q = Ls.map((q, i) => { const b = Q42.btn('q_' + q[0], { x: g.qx, y: g.top + r.dy * (i + .5), w: g.bw, h: r.dy - 10 }, S2 => { if (!S2.ok[q[0]]) S2.sel = q[0]; }, { tip: q[1], hint: i === 0 ? undefined : false }); b._q = q; return b; });
      const U = ord.map((k, i) => { const q = Ls[k]; const b = Q42.btn('u_' + q[0], { x: g.ux, y: g.top + r.dy * (i + .5), w: g.ubw, h: r.dy - 10 }, S2 => { if (!S2.sel) return; if (S2.sel === q[0]) { S2.ok[q[0]] = 1; S2.n++; S2.sel = ''; } else { S2.bad = q[0]; S2.bt = .8; } }, { tip: q[2], hint: false }); b._q = q; return b; });
      return { Q, U }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10.5 : 12.5, it = D.items(S), Ls = list(S); Q42.bg(ctx, w, h);
      Q42.T(ctx, 'الكمية', g.qx, g.top - 16, { s: fs, w: 900, c: '#0f766e' }); Q42.T(ctx, 'الوحدة SI', g.ux, g.top - 16, { s: fs, w: 900, c: '#0f766e' });
      it.Q.forEach(b => { const q = b._q, U = it.U.find(u => u._q[0] === q[0]); if (S.ok[q[0]]) Q41.line(ctx, [[b.x - b.w / 2, b.y], [U.x + U.w / 2, U.y]], '#16a34a', 3); });
      if (S.sel) { const b = it.Q.find(b => b._q[0] === S.sel); Q41.line(ctx, [[b.x - b.w / 2, b.y], [b.x - b.w / 2 - 40, b.y]], '#f59e0b', 3, [5, 4]); }
      it.Q.forEach(b => Q42.drawBtn(ctx, b, b._q[1], S.ok[b._q[0]] ? '#16a34a' : S.sel === b._q[0] ? '#f59e0b' : '#0f766e', !!S.ok[b._q[0]] || S.sel === b._q[0]));
      it.U.forEach(b => Q42.drawBtn(ctx, b, b._q[2], S.bad === b._q[0] && S.bt > 0 ? '#dc2626' : S.ok[b._q[0]] ? '#16a34a' : '#475569', !!S.ok[b._q[0]] || (S.bad === b._q[0] && S.bt > 0)));
      const done = Ls.filter(q => S.ok[q[0]]).length;
      Q42.T(ctx, 'المُنجَز ' + done + ' / ' + Ls.length, (g.qx + g.ux) / 2, g.bot + 14, { s: fs, w: 900, c: '#fff', bg: done === Ls.length ? '#16a34a' : '#0f766e' });
      if (S.bad && S.bt > 0) Q42.T(ctx, 'ليست وحدتها، حاول مرة أخرى', (g.qx + g.ux) / 2, g.bot + 38, { s: fs - 1, w: 800, c: '#fff', bg: '#dc2626' });
      if (!g.ph) Q42.card(ctx, S, [{ t: 'الكمية ← الوحدة ← الرمز', c: '#64748b', w: 800 }].concat(Ls.map(q => ({ t: q[1] + ' ← ' + (S.ok[q[0]] ? q[3] + ' ، ' + q[2] : '؟'), c: S.ok[q[0]] ? '#15803d' : '#94a3b8', w: 800 }))), { title: S.set === 'sup' ? 'الجدول (2): الوحدات التكميلية' : 'الجدول (1): الوحدات الأساسية SI', y: 70, wd: 300 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, S.sel ? 'الآن اضغط على وحدة «' + Ls.find(q => q[0] === S.sel)[1] + '»' : 'اضغط على كمية ثم على وحدتها');
    },
    chips(S, g) { return Q42.chips(S, 'set', [['base', 'الوحدات الأساسية (7)'], ['sup', 'الوحدات التكميلية (2)']], g.h - 84, S.set, (S2, k) => { S2.set = k; S2.sel = ''; }, { bw: 200 }); },
    drags(S) { if (!S.W) return []; const it = D.items(S); return it.Q.concat(it.U, D.chips(S, D.geo(S))); },
    readings(S) { const Ls = list(S); return [rd('المجموعة', S.set === 'sup' ? 'التكميلية' : 'الأساسية'), rd('الأزواج الصحيحة', Ls.filter(q => S.ok[q[0]]).length + ' / ' + Ls.length), rd('الكمية المختارة', S.sel ? Ls.find(q => q[0] === S.sel)[1] : '—')]; },
    explain(S) { return Q26.ex('لكل كمية أساسية وحدة واحدة متفق عليها عالمياً: المتر للطول، والكيلوغرام للكتلة، والثانية للزمن...', 'وحّد العلماء الوحدات في النظام الدولي SI كي يفهم الجميع القياسات نفسها في كل مكان. وتُشتق باقي الوحدات منها، فوحدة السرعة m/s مشتقة من الطول والزمن.', 'الأمبير يقيس التيار في الأجهزة الكهربائية، والكلفن يستعمل في الدراسات العلمية لدرجات الحرارة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — الراديان والستراديان (الجدول 2، ص 5) =============== */
(() => {
  const D = { id: 'g10_u_rad', page: 5, fig: 'الجدول (2): الراديان والستراديان',
    desc: 'الراديان: الزاوية المركزية المقابلة لقوس طوله يساوي نصف قطر الدائرة، ومحيط الدائرة يقابل زاوية 2π rad فيكون 1 rad = 57.3°. الستراديان: الزاوية المجسمة المقابلة لمساحة على سطح الكرة تساوي مربع نصف قطرها، وسطح الكرة كله يقابل 4π sr.',
    tags: 'راديان ستراديان زاوية مستوية زاوية مجسمة طول القوس نصف القطر 57.3 درجة 2π 4π',
    tools: ['دائرة وخيط بطول نصف القطر', 'كرة'],
    steps: ['اسحب النقطة الحمراء على محيط الدائرة لتكبير الزاوية θ ولاحظ طول القوس s.', 'عندما يصبح طول القوس مساوياً لنصف القطر s = r تكون الزاوية 1 rad = 57.3°.', 'أكمل الدورة: كم نصف قطر يلتف حول المحيط؟ 2π ≈ 6.28', 'اضغط «الستراديان» واسحب حافة القبة على الكرة حتى تصبح مساحتها r².'],
    concl: ['θ (rad) = طول القوس ÷ نصف القطر = s / r.', 'محيط الدائرة 2πr يقابل 2π rad = 360° ، لذا 1 rad = 57.3°.', 'Ω (sr) = المساحة على سطح الكرة ÷ r² ، وسطح الكرة 4πr² يقابل 4π sr.'],
    laws: ['g10_rad'],
    controls: [],
    setup(S) { S.m = 'rad'; S.th = .6; S.al = .5; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), cx = ph ? w / 2 : L + (w - L - 330) / 2, cy = ph ? h * .36 : h * .46, r = ph ? 92 : Math.min(150, h * .26); return { w, h, ph, L, cx, cy, r }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10.5 : 12, r = g.r; Q42.bg(ctx, w, h);
      if (S.m === 'rad') { const th = S.th, ex = g.cx + r * Math.cos(-th), ey = g.cy + r * Math.sin(-th);
        K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.cx, g.cy, r, 0, TAU); ctx.stroke(); ctx.fillStyle = 'rgba(13,148,136,.15)'; ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.arc(g.cx, g.cy, r, 0, -th, true); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(g.cx, g.cy, r, 0, -th, true); ctx.stroke();
          ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.cx + r, g.cy); ctx.lineTo(g.cx, g.cy); ctx.lineTo(ex, ey); ctx.stroke();
          // radius-long pieces laid along the circumference
          ctx.fillStyle = '#0f766e'; for (let k = 1; k <= 6; k++) { if (k > th + 1e-6) break; const a = -k; ctx.beginPath(); ctx.arc(g.cx + (r + 10) * Math.cos(a), g.cy + (r + 10) * Math.sin(a), 4, 0, TAU); ctx.fill(); }
          ctx.strokeStyle = '#0f766e'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.cx, g.cy, 28, 0, -th, true); ctx.stroke(); });
        for (let k = 1; k <= 6; k++) if (k <= th + 1e-6) Q42.T(ctx, k + 'r', g.cx + (r + 26) * Math.cos(-k), g.cy + (r + 26) * Math.sin(-k), { s: 9.5, w: 900, c: '#0f766e' });
        Q42.T(ctx, 'r', g.cx + r / 2, g.cy + 12, { s: 13, w: 900, c: '#0f172a' }); Q42.T(ctx, 'θ', g.cx + 40 * Math.cos(-th / 2), g.cy + 40 * Math.sin(-th / 2), { s: 13, w: 900, c: '#0f766e' });
        Q42.T(ctx, 's', g.cx + (r - 18) * Math.cos(-th / 2), g.cy + (r - 18) * Math.sin(-th / 2), { s: 13, w: 900, c: '#dc2626' });
        Q41.knob(ctx, ex, ey);
        const one = Math.abs(th - 1) < .04, full = th > TAU - .05;
        const rows = [{ t: 's = ' + (th).toFixed(2) + ' r', mono: 1, c: '#dc2626', w: 900 }, { t: 'θ = s / r = ' + th.toFixed(2) + ' rad', mono: 1, c: '#0f766e', w: 900 }, { t: 'θ = ' + (th * 180 / Math.PI).toFixed(1) + '°', mono: 1, w: 900 }, { t: '1 rad = 180° / π = 57.3°', mono: 1, c: '#64748b' }];
        if (one) rows.push({ t: 'طول القوس = نصف القطر: هذه هي الزاوية 1 راديان', c: '#fff', w: 900 }); if (full) rows.push({ t: 'دورة كاملة: المحيط 2πr يقابل 2π rad = 360°', c: '#b91c1c', w: 900 });
        if (!g.ph) Q42.card(ctx, S, rows, { title: 'الزاوية المستوية', y: 70, wd: 300 });
        else { Q42.T(ctx, 'θ = ' + th.toFixed(2) + ' rad = ' + (th * 180 / Math.PI).toFixed(1) + '°', w / 2, g.cy + r + 40, { s: 12, w: 900, c: '#fff', bg: '#0f766e' }); }
        if (one) Q42.T(ctx, 's = r ⟸ θ = 1 rad', g.cx, g.cy + r + (g.ph ? 64 : 34), { s: 13, w: 900, c: '#fff', bg: '#16a34a' });
      } else { const al = S.al, ca = Math.cos(al), sa = Math.sin(al), A = 2 * Math.PI * (1 - ca), yC = g.cy - r * ca, rc = r * sa;
        K.raw(ctx, () => { const gr = ctx.createRadialGradient(g.cx - r * .3, g.cy - r * .35, r * .1, g.cx, g.cy, r); gr.addColorStop(0, '#fff'); gr.addColorStop(1, '#94a3b8'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.cx, g.cy, r, 0, TAU); ctx.fill();
          ctx.save(); ctx.beginPath(); ctx.arc(g.cx, g.cy, r, 0, TAU); ctx.clip(); ctx.fillStyle = 'rgba(220,38,38,.45)'; ctx.beginPath(); ctx.rect(g.cx - r, g.cy - r - 2, 2 * r, yC - (g.cy - r) + 2); ctx.fill(); ctx.restore();
          ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(g.cx, yC, rc, rc * .22, 0, 0, TAU); ctx.stroke();
          ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(g.cx - rc, yC); ctx.lineTo(g.cx, g.cy); ctx.lineTo(g.cx + rc, yC); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(g.cx, g.cy, 3.5, 0, TAU); ctx.fill(); });
        Q41.knob(ctx, g.cx + rc, yC); Q42.T(ctx, 'r', g.cx + r * .5, g.cy + 14, { s: 13, w: 900 });
        const one = Math.abs(A - 1) < .06, rows = [{ t: 'مساحة القبة = ' + A.toFixed(2) + ' r²', mono: 1, c: '#dc2626', w: 900 }, { t: 'Ω = A / r² = ' + A.toFixed(2) + ' sr', mono: 1, c: '#0f766e', w: 900 }, { t: 'سطح الكرة 4πr² ⟸ 4π = 12.57 sr', c: '#64748b' }];
        if (one) rows.push({ t: 'المساحة = r²: هذه هي الزاوية 1 ستراديان', c: '#fff', w: 900 });
        if (!g.ph) Q42.card(ctx, S, rows, { title: 'الزاوية المجسمة', y: 70, wd: 300 }); else Q42.T(ctx, 'Ω = ' + A.toFixed(2) + ' sr', w / 2, g.cy + r + 40, { s: 12, w: 900, c: '#fff', bg: '#0f766e' });
        if (one) Q42.T(ctx, 'A = r² ⟸ Ω = 1 sr', g.cx, g.cy + r + (g.ph ? 64 : 34), { s: 13, w: 900, c: '#fff', bg: '#16a34a' });
      }
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, S.m === 'rad' ? 'اسحب النقطة الحمراء على المحيط' : 'اسحب حافة القبة الحمراء على الكرة');
    },
    chips(S, g) { return Q42.chips(S, 'm', [['rad', 'الراديان rad'], ['sr', 'الستراديان sr'], ['one', 'اجعلها 1 بالضبط']], g.h - 84, S.m, (S2, k) => { if (k === 'one') { if (S2.m === 'rad') S2.th = 1; else S2.al = Math.acos(1 - 1 / (2 * Math.PI)); } else S2.m = k; }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); let it;
      if (S.m === 'rad') it = { id: 'arc', x: g.cx + g.r * Math.cos(-S.th), y: g.cy + g.r * Math.sin(-S.th), r: 20, axis: 'xy', keep: true, tip: 'اسحب على المحيط', idle: 'اسحب ✋', drag: (S2, d) => { let a = -Math.atan2(d.y - g.cy, d.x - g.cx); if (a < 0) a += TAU; if (S2.th > 5 && a < 1) a = TAU - .001; if (S2.th < 1.2 && a > 5.5) a = .01; S2.th = clamp(a, .01, TAU - .001); } };
      else it = { id: 'cap', x: g.cx + g.r * Math.sin(S.al), y: g.cy - g.r * Math.cos(S.al), r: 20, axis: 'xy', keep: true, tip: 'اسحب حافة القبة', idle: 'اسحب ✋', drag: (S2, d) => { S2.al = clamp(Math.atan2(Math.abs(d.x - g.cx), -(d.y - g.cy)), .1, Math.PI - .05); } };
      return [it].concat(D.chips(S, g)); },
    readings(S) { if (S.m === 'rad') return [rd('الزاوية θ', S.th.toFixed(3) + ' rad'), rd('بالدرجات', (S.th * 180 / Math.PI).toFixed(1) + '°'), rd('طول القوس', S.th.toFixed(2) + ' r')]; const A = 2 * Math.PI * (1 - Math.cos(S.al)); return [rd('مساحة القبة', A.toFixed(2) + ' r²'), rd('الزاوية المجسمة', A.toFixed(3) + ' sr')]; },
    explain(S) { return Q26.ex('كلما طال القوس كبرت الزاوية، وعندما يساوي القوس نصف القطر تكون الزاوية راديان واحد.', 'الزاوية بالراديان = طول القوس ÷ نصف القطر، فهي نسبة بين طولين. ولأن المحيط 2πr فالدورة الكاملة 2π rad = 360°. وبالطريقة نفسها: الزاوية المجسمة = المساحة على الكرة ÷ r² ، والكرة كلها 4π sr.', 'تستعمل الراديان في حساب الحركة الدائرية، والستراديان في قياس الضوء المنبعث من مصباح في كل الاتجاهات.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A3 — البادئات: أجزاء الوحدات ومضاعفاتها (الجدول 3، ص 5–6) =============== */
(() => {
  const PF = [['T', 'تيرا', 12], ['G', 'كيكا', 9], ['M', 'ميكا', 6], ['k', 'كيلو', 3], ['', 'الوحدة', 0], ['c', 'سنتي', -2], ['m', 'ملي', -3], ['μ', 'مايكرو', -6], ['n', 'نانو', -9], ['p', 'بيكو', -12], ['f', 'فيمتو', -15]];
  const OBJ = [['road', 'طريق بغداد – البصرة', 545e3, 'm'], ['pen', 'طول قلم', .15, 'm'], ['hair', 'سمك شعرة', 8e-5, 'm'], ['radio', 'تردد محطة إذاعة', 1e8, 'Hz'], ['cur', 'تيار ساعة رقمية', 2e-6, 'A']];
  const EX = { q: 'كم يساوي 1 mm² بوحدة m²؟ (س5 ص 13)', lines: ['1 mm = 1×10⁻³ m', '1 mm² = (1×10⁻³ m)²', '1 mm² = 1×10⁻⁶ m²'] };
  const D = { id: 'g10_u_prefix', page: 5, fig: 'الجدول (3): البادئات',
    desc: 'تكون مضاعفات الوحدات في النظام الدولي بخطوات كل منها 10³ وأجزاؤها بخطوات كل منها 10⁻³ ، ويُعبَّر عنها ببادئات مثل كيلو k = 10³ وملي m = 10⁻³ ومايكرو μ = 10⁻⁶ (الجدول 3). والسنتي c = 10⁻² ليست من خطوات النظام الدولي لكنها شائعة.',
    tags: 'بادئات أجزاء مضاعفات تيرا كيكا ميكا كيلو سنتي ملي مايكرو نانو بيكو فيمتو الجدول 3 قوى العشرة mm² m²',
    tools: ['سُلّم البادئات'],
    steps: ['اختر شيئاً من الأزرار السفلية (طريق، قلم، شعرة، إذاعة، تيار).', 'اسحب المؤشر الأحمر على سلّم البادئات (أو اضغط على بادئة) لتكتب المقدار بها.', 'لاحظ: كل خطوة إلى اليمين تضرب العدد في 10³ ، وإلى اليسار تقسمه على 10³.', 'اضغط «1 mm² = ؟ m²» ثم «الخطوة التالية» لحل س5 ص 13.'],
    concl: ['المضاعفات: k = 10³ ، M = 10⁶ ، G = 10⁹ ، T = 10¹².', 'الأجزاء: m = 10⁻³ ، μ = 10⁻⁶ ، n = 10⁻⁹ ، p = 10⁻¹² ، f = 10⁻¹⁵ ، و c = 10⁻² (ليست من خطوات SI).', '1 mm² = 10⁻⁶ m² لأن الطول يُربَّع مع بادئته.'],
    controls: [],
    setup(S) { S.o = 'road'; S.pi = 3; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), x0 = L + 20, x1 = ph ? w - 16 : w - 350, y = ph ? 150 : 170; return { w, h, ph, L, x0, x1, y, dx: (x1 - x0) / (PF.length - 1) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 9.5 : 12, O = OBJ.find(q => q[0] === S.o), P = PF[S.pi], v = O[2] / Math.pow(10, P[2]);
      Q42.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.strokeStyle = '#0f766e'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.x0, g.y); ctx.lineTo(g.x1, g.y); ctx.stroke(); });
      // best prefix: 1 ≤ v < 1000
      PF.forEach((q, i) => { const x = g.x0 + i * g.dx, on = i === S.pi, vv = O[2] / Math.pow(10, q[2]), good = vv >= 1 && vv < 1000;
        K.raw(ctx, () => { ctx.fillStyle = on ? '#dc2626' : good ? '#16a34a' : q[2] === -2 ? '#a16207' : '#0f766e'; ctx.beginPath(); ctx.arc(x, g.y, on ? 9 : 6, 0, TAU); ctx.fill(); });
        Q42.T(ctx, q[0] || '—', x, g.y - 24, { s: g.ph ? 11 : 14, w: 900, c: on ? '#dc2626' : '#0f172a' });
        if (!g.ph || i % 2 === 0) Q42.T(ctx, '10' + Q31.sup(q[2]), x, g.y + 22, { s: g.ph ? 9 : 11, w: 800, c: '#334155' });
        if (!g.ph) Q42.T(ctx, q[1], x, g.y - 44, { s: 10, w: 800, c: '#64748b' }); });
      Q42.T(ctx, '× 10³ ⟵ مضاعفات', g.x0 + g.dx * 1.5, g.y + 46, { s: fs, w: 800, c: '#0f766e' }); Q42.T(ctx, 'أجزاء ⟶ ÷ 10³', g.x0 + g.dx * 8, g.y + 46, { s: fs, w: 800, c: '#0f766e' });
      // big result
      const ty = g.y + (g.ph ? 100 : 110);
      Q42.T(ctx, O[1], (g.x0 + g.x1) / 2, ty - 26, { s: fs + 1, w: 900, c: '#334155' });
      Q42.T(ctx, Q42.sci(O[2], 4) + ' ' + O[3] + '  =  ' + Q42.sci(v, 4) + ' ' + P[0] + O[3], (g.x0 + g.x1) / 2, ty + 2, { s: g.ph ? 14 : 20, w: 900, c: '#fff', bg: '#0f766e' });
      Q42.T(ctx, P[2] ? '1 ' + P[0] + O[3] + ' = 10' + Q31.sup(P[2]) + ' ' + O[3] : 'بدون بادئة', (g.x0 + g.x1) / 2, ty + 32, { s: fs, w: 800, c: '#be185d' });
      Q42.T(ctx, 'النقطة الخضراء: البادئة الأنسب (العدد بين 1 و 1000)', (g.x0 + g.x1) / 2, ty + 54, { s: fs - 1, w: 700, c: '#15803d' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.o); Q42.drawChips(ctx, C.e);
      if (S.ex) { // mm² square
        const sq = g.ph ? 0 : 1; Q42.steps(ctx, S, Object.assign({ title: 'س5 ص 13' }, EX, { k: S.k }), { y: g.ph ? ty + 70 : 70, x: w - 12, wd: g.ph ? w - 24 : 310, f: 1 });
        if (sq && S.k >= 2) { const x = w - 170, y = 260, s = 120; K.raw(ctx, () => { ctx.strokeStyle = '#0f766e'; ctx.strokeRect(x, y, s, s); ctx.strokeStyle = 'rgba(15,118,110,.25)'; for (let k = 1; k < 10; k++) { ctx.beginPath(); ctx.moveTo(x + k * s / 10, y); ctx.lineTo(x + k * s / 10, y + s); ctx.moveTo(x, y + k * s / 10); ctx.lineTo(x + s, y + k * s / 10); ctx.stroke(); } ctx.fillStyle = '#dc2626'; ctx.fillRect(x, y, s / 10, s / 10); }); Q42.T(ctx, '1000 × 1000 = 10⁶ مربع mm² في 1 m²', x + s / 2, y + s + 16, { s: 10, w: 800, c: '#0f172a' }); }
      } else if (!g.ph) Q42.card(ctx, S, PF.map(q => ({ t: (q[0] || '—') + '  ' + q[1] + '  = 10' + Q31.sup(q[2]) + (q[2] === -2 ? '  (ليست SI)' : ''), c: PF[S.pi] === q ? '#dc2626' : '#1e293b', w: PF[S.pi] === q ? 900 : 700 })), { title: 'الجدول (3): البادئات', y: 70, wd: 300 });
      Q42.banner(ctx, w, 'اسحب المؤشر الأحمر على سلّم البادئات');
    },
    chips(S, g) { const yo = g.h - 128, ye = g.h - 84;
      return { o: Q42.chips(S, 'o', OBJ.map(q => [q[0], q[1]]), yo, S.o, (S2, k) => { S2.o = k; }, { bw: 150, bh: g.ph ? 34 : 34 }), e: Q41.stepChips(S, 'ex', ye, g.L, 'مثال: mm² إلى m²') }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      const it = { id: 'ptr', x: g.x0 + S.pi * g.dx, y: g.y, r: 18, axis: 'x', keep: true, tip: 'اسحب على السلّم', idle: 'اسحب ✋', drag: (S2, d) => { S2.pi = clamp(Math.round((d.x - g.x0) / g.dx), 0, PF.length - 1); } };
      const taps = PF.map((q, i) => ({ id: 'pf' + i, x: g.x0 + i * g.dx, y: g.y - 26, r: 14, axis: 'none', hint: false, tip: q[1], click: S2 => { S2.pi = i; } }));
      return [it].concat(taps, C.o, C.e); },
    readings(S) { const O = OBJ.find(q => q[0] === S.o), P = PF[S.pi]; return [rd('المقدار', Q42.sci(O[2], 4, O[3])), rd('البادئة', (P[0] || '—') + ' ' + P[1] + ' = 10' + Q31.sup(P[2])), rd('بعد التحويل', Q42.sci(O[2] / Math.pow(10, P[2]), 4) + ' ' + P[0] + O[3])]; },
    explain(S) { return Q26.ex('المقدار نفسه يُكتب بأعداد مختلفة حسب البادئة: 545000 m = 545 km.', 'البادئة تعني ضرب الوحدة في قوة من قوى العشرة، فالكيلو يعني 10³ والملي يعني 10⁻³. نختار البادئة التي تجعل العدد بين 1 و 1000 ليسهل قراءته.', 'تقرأ على الأجهزة: mA للتيار، MHz للإذاعة، nm لطول موجة الضوء، GB لسعة الذاكرة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — أخطاء القياس: المسطرة والمايكروميتر والقياسات المتكررة (ص 6–7) =============== */
(() => {
  const TRUE = 1.3236; // cm
  const INS = { ru: ['مسطرة مترية', .1, .02, 'أصغر تدريجة 1 mm'], mic: ['مايكروميتر', .001, .0006, 'أصغر تدريجة 0.01 mm'] };
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }; const gauss = () => { let s = 0; for (let i = 0; i < 6; i++) s += rnd(); return (s - 3) / 1.4; };
  const D = { id: 'g10_u_err', page: 6, fig: 'أخطاء القياس',
    desc: 'لا يوجد قياس تام الدقة. أخطاء الأجهزة تنتج عن محدودية دقة الجهاز (أصغر تدريجة): المسطرة المترية دقتها 1 mm والمايكروميتر 0.01 mm. أما الأخطاء الشخصية (العشوائية) فتنتج عن الشخص القائم بالقياس، وهي الوحيدة التي يمكن معالجتها بتكرار القياس وأخذ المتوسط الحسابي.',
    tags: 'أخطاء القياس خطأ الجهاز أصغر تدريجة مسطرة مايكروميتر أخطاء شخصية عشوائية تكرار القياس المتوسط الحسابي 1.32±0.02',
    tools: ['مسطرة مترية', 'مايكروميتر', 'قطعة معدنية صغيرة'],
    steps: ['اسحب القطعة المعدنية لتضع طرفها الأيسر عند صفر المسطرة بدقة (خطأ شخصي إن لم يكن عند الصفر).', 'اضغط «قِس» عدة مرات: كل قراءة تختلف قليلاً بسبب الأخطاء الشخصية.', 'لاحظ المتوسط الحسابي: هو أفضل تقدير للقيمة الحقيقية.', 'بدّل إلى المايكروميتر: أصغر تدريجة أصغر، فالقراءات أدق.'],
    concl: ['خطأ الجهاز محدد بأصغر تدريجة فيه: لا يمكن قراءة أقل منها.', 'الأخطاء الشخصية عشوائية: تُعالج بتكرار القياس وإيجاد المتوسط الحسابي.', 'تكتب النتيجة مع مقدار الخطأ مثل 1.32 ± 0.02 cm.', 'خطأ صغير في القياس قد يؤدي إلى خطأ كبير في البعد الحقيقي (كالقياس على خارطة).'],
    controls: [],
    setup(S) { S.ins = 'ru'; S.off = .35; S.R = []; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), x0 = L + (ph ? 20 : 40), pm = ph ? 5.4 : 9, y = ph ? 210 : 230; return { w, h, ph, L, x0, pm, y }; }, // pm = px per mm
    reading(S) { const I = INS[S.ins]; let v = TRUE + (S.ins === 'ru' ? S.off * .1 : 0) + gauss() * I[2]; return Math.round(v / I[1]) * I[1]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 12, I = INS[S.ins], fmt = v => v.toFixed(S.ins === 'ru' ? 2 : 3); Q42.bg(ctx, w, h);
      if (S.ins === 'ru') { const len = 50; K.raw(ctx, () => { ctx.fillStyle = '#fef3c7'; ctx.strokeStyle = '#92400e'; rr(ctx, g.x0 - 14, g.y, len * g.pm + 28, 46, 4); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#78350f'; for (let k = 0; k <= len; k++) { const x = g.x0 + k * g.pm, L = k % 10 === 0 ? 18 : k % 5 === 0 ? 12 : 7; ctx.lineWidth = k % 10 ? .8 : 1.4; ctx.beginPath(); ctx.moveTo(x, g.y); ctx.lineTo(x, g.y + L); ctx.stroke(); } });
        for (let k = 0; k <= 5; k++) Q42.T(ctx, String(k), g.x0 + k * 10 * g.pm, g.y + 30, { s: 10, w: 800, c: '#78350f' }); Q42.T(ctx, 'cm', g.x0 + len * g.pm - 6, g.y + 38, { s: 9, w: 800, c: '#78350f' });
        const xL = g.x0 + S.off * g.pm, xR = xL + TRUE * 10 * g.pm; Q42.box(ctx, xL, g.y - 30, xR - xL, 28, 8, '#94a3b8');
        Q41.line(ctx, [[g.x0, g.y - 46], [g.x0, g.y + 4]], '#16a34a', 1.5, [3, 3]); Q41.line(ctx, [[xL, g.y - 40], [xL, g.y + 4]], Math.abs(S.off) < .05 ? '#16a34a' : '#dc2626', 2);
        if (Math.abs(S.off) >= .05) { Q42.T(ctx, 'الطرف ليس عند الصفر: خطأ شخصي', xR + 24, g.y - 34, { s: fs - 1, w: 800, c: '#fff', bg: '#dc2626', a: 'left' }); Q42.T(ctx, (S.off * .1 >= 0 ? '+' : '') + (S.off * .1).toFixed(2) + ' cm', xR + 24, g.y - 12, { s: fs, w: 900, c: '#dc2626', a: 'left' }); }
        else Q42.T(ctx, 'الطرف عند الصفر ✓', xR + 24, g.y - 24, { s: fs - 1, w: 800, c: '#fff', bg: '#16a34a', a: 'left' });
        // magnifier on the right end
        if (!g.ph) { const mx = xR, my = g.y + 120, R = 52, z = 4; K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.arc(mx, my, R, 0, TAU); ctx.fillStyle = '#fef3c7'; ctx.fill(); ctx.clip(); ctx.strokeStyle = '#78350f'; for (let k = -6; k <= 6; k++) { const xx = Math.round((xR - g.x0) / g.pm) + k, x = mx + (g.x0 + xx * g.pm - xR) * z; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x, my - 20); ctx.lineTo(x, my - 20 + (xx % 10 ? xx % 5 ? 14 : 22 : 32)); ctx.stroke(); } ctx.fillStyle = '#94a3b8'; ctx.fillRect(mx - R, my - R, R, 28); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx, my - R); ctx.lineTo(mx, my + R); ctx.stroke(); ctx.restore(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(mx, my, R, 0, TAU); ctx.stroke(); }); Q42.T(ctx, 'الطرف بين تدريجتين: تخمين!', mx, my + R + 14, { s: 10, w: 800, c: '#7c2d12' }); }
      } else { // micrometer
        const cx = g.x0 + (g.ph ? 140 : 230), cy = g.y; K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(cx - 40, cy + 10, 70, Math.PI * .5, Math.PI * 1.5, false); ctx.stroke(); ctx.fillStyle = '#64748b'; ctx.fillRect(cx - 50, cy - 66, 22, 18); ctx.fillStyle = '#94a3b8'; ctx.fillRect(cx - 34, cy - 9, 20, 18); ctx.fillRect(cx - 14 + 26, cy - 9, 70, 18); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(cx + 82, cy - 16, 70, 32); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; for (let k = 0; k < 10; k++) { ctx.beginPath(); ctx.moveTo(cx + 82, cy - 14 + k * 3); ctx.lineTo(cx + 92, cy - 14 + k * 3); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(cx + 12, cy); ctx.lineTo(cx + 82, cy); ctx.stroke(); });
        Q42.box(ctx, cx - 14, cy - 8, 26, 16, 5, '#f59e0b'); Q42.T(ctx, 'القطعة بين الفكين', cx, cy + 42, { s: fs - 1, w: 800, c: '#92400e' }); Q42.T(ctx, 'الأسطوانة الدوّارة', cx + 117, cy - 30, { s: fs - 1, w: 800, c: '#334155' }); }
      // readings table
      const tx = g.ph ? 16 : g.L + 20, ty = g.ph ? g.y + 110 : g.y + 190, n = S.R.length, mean = n ? S.R.reduce((a, b) => a + b, 0) / n : 0, dev = n ? S.R.reduce((a, b) => a + Math.abs(b - mean), 0) / n : 0;
      const rows = S.R.slice(-6).map((v, i) => ({ t: 'القراءة ' + (n - Math.min(6, n) + i + 1) + ' : ' + fmt(v) + ' cm', mono: 0, c: '#1e293b' }));
      if (n) rows.push({ t: 'المتوسط الحسابي = ' + fmt(mean) + ' cm', c: '#0f766e', w: 900 }, { t: 'النتيجة: ' + fmt(mean) + ' ± ' + Math.max(dev, I[1] / 2).toFixed(S.ins === 'ru' ? 2 : 3) + ' cm', c: '#b91c1c', w: 900 });
      else rows.push({ t: 'اضغط «قِس» لتسجيل قراءة', c: '#64748b' });
      Q42.card(ctx, S, [{ t: I[0] + ': ' + I[3], c: '#7c3aed', w: 900 }].concat(rows), { title: 'القراءات المتكررة', y: g.ph ? ty : 70, x: g.ph ? w - 12 : w - 12, wd: 300 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, S.ins === 'ru' ? 'اسحب القطعة إلى صفر المسطرة ثم اضغط «قِس»' : 'اضغط «قِس» عدة مرات وقارن بالمسطرة');
    },
    chips(S, g) { return Q42.chips(S, 'i', [['ru', 'مسطرة 1 mm'], ['mic', 'مايكروميتر 0.01 mm'], ['go', '📏 قِس'], ['clr', 'امسح']], g.h - 84, S.ins, (S2, k) => { if (k === 'go') S2.R.push(D.reading(S2)); else if (k === 'clr') S2.R = []; else { S2.ins = k; S2.R = []; } }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      if (S.ins === 'ru') L.push({ id: 'rod', x: g.x0 + S.off * g.pm + TRUE * 5 * g.pm, y: g.y - 16, w: TRUE * 10 * g.pm, h: 32, axis: 'x', keep: true, tip: 'اسحب القطعة', idle: 'اسحب ✋', drag: (S2, d) => { S2.off = clamp((d.x - TRUE * 5 * g.pm - g.x0) / g.pm, -4, 20); if (Math.abs(S2.off) < .25) S2.off = 0; } });
      return L.concat(D.chips(S, g)); },
    readings(S) { const n = S.R.length, m = n ? S.R.reduce((a, b) => a + b, 0) / n : 0; return [rd('الجهاز', INS[S.ins][0]), rd('أصغر تدريجة', INS[S.ins][3]), rd('عدد القراءات', n), rd('المتوسط الحسابي', n ? m.toFixed(3) + ' cm' : '—')]; },
    record(S) { const n = S.R.length; return { i: INS[S.ins][0], v: n ? S.R[n - 1] : '—' }; },
    cols: [['i', 'الجهاز'], ['v', 'القراءة (cm)']],
    explain(S) { return Q26.ex('القراءات المتكررة لا تتطابق تماماً، لكن متوسطها يقترب من القيمة الحقيقية. والمايكروميتر يعطي أرقاماً عشرية أكثر من المسطرة.', 'كل جهاز محدود بأصغر تدريجة فيه (خطأ الجهاز). والأخطاء الشخصية عشوائية: مرة أكبر ومرة أصغر من الحقيقة، فتلغي بعضها عند أخذ المتوسط الحسابي.', 'يقيس الطبيب ضغط الدم أكثر من مرة ويأخذ المتوسط، ويقيس النجار مرتين قبل أن يقطع.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — الرسوم البيانية: انطلاق السيارة من ميل الخط (الشكلان 1-1 و 2-1، ص 8–9) =============== */
(() => {
  const T = [.25, .5, .75, 1, 1.25], DI = [20, 40, 60, 80, 100];
  const D = { id: 'g10_u_graph', page: 8, fig: 'الشكلان 1-1 و 2-1',
    desc: 'سيارة تسير بانطلاق ثابت وتقطع المسافات المذكورة في الجدول بالأزمان المقابلة لها. نرسم الخط البياني بتحديد نقطة الأصل والمحورين ومقياس الرسم، ثم نحدد النقاط، فنحصل على خط مستقيم يمر بنقطة الأصل، وميله يمثل انطلاق السيارة: v = (d₂ − d₁) / (t₂ − t₁).',
    tags: 'رسم بياني ميل الخط المستقيم انطلاق السيارة مسافة زمن نقطة الأصل مقياس الرسم 80 km/h',
    tools: ['ورقة رسم بياني', 'مسطرة', 'جدول القراءات'],
    steps: ['اضغط على كل عمود في جدول القراءات لتحديد النقطة على الورقة البيانية.', 'بعد رسم النقاط يظهر الخط المستقيم المار بنقطة الأصل.', 'اسحب النقطتين p1 و p2 على الخط وراقب المثلث: الميل يبقى ثابتاً.', 'اسحب مؤشر الزمن الأزرق: السيارة على الطريق تتحرك مع الرسم.'],
    concl: ['الخط المستقيم المار بنقطة الأصل يعني أن d تتناسب طردياً مع t.', 'الميل m = Δy / Δx ، وهنا الميل = انطلاق السيارة.', 'v = (80 − 40) / (1 − 0.5) = 80 km/h ، وهو ثابت لأي نقطتين على الخط.'],
    laws: ['g10_slope'],
    controls: [],
    setup(S) { S.seen = [0, 0, 0, 0, 0]; S.p1 = .5; S.p2 = 1; S.tc = .6; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), gx = L + 50, gy = ph ? 200 : 170, gw = ph ? w - gx - 30 : Math.min(400, w - gx - 380), gh = ph ? h * .3 : Math.min(300, h - 330); return { w, h, ph, L, gx, gy, gw, gh, ry: ph ? 70 : 76 }; },
    tbl(S, g) { const x0 = g.ph ? 12 : g.gx - 30, cw = g.ph ? (g.w - 24 - 70) / 5 : 62, y = g.ry + 34; return T.map((t, i) => { const b = Q42.btn('pt' + i, { x: x0 + 70 + cw * (i + .5), y, w: cw - 4, h: 50 }, S2 => { S2.seen[i] = 1; }, { tip: 'حدّد النقطة', hint: i === 0 ? undefined : false }); b._x0 = x0; b._cw = cw; return b; }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5; Q42.bg(ctx, w, h);
      // road with car
      const rx0 = g.ph ? 20 : g.gx + g.gw + 60, rx1 = g.ph ? w - 20 : w - 30, ry = g.ph ? g.ry - 14 : g.gy + g.gh + 90;
      if (!g.ph) { K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(rx0, ry - 14, rx1 - rx0, 28); ctx.strokeStyle = '#fde047'; ctx.setLineDash([12, 10]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(rx0, ry); ctx.lineTo(rx1, ry); ctx.stroke(); ctx.setLineDash([]); });
        for (let k = 0; k <= 100; k += 20) Q42.T(ctx, k + '', rx0 + (rx1 - rx0 - 20) * k / 100 + 10, ry + 26, { s: 9.5, w: 800, c: '#334155' }); Q42.T(ctx, 'km', rx1 - 6, ry - 24, { s: 9.5, w: 800 });
        const cxp = rx0 + 10 + (rx1 - rx0 - 20) * Math.min(80 * S.tc, 100) / 100; K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; rr(ctx, cxp - 18, ry - 12, 36, 14, 4); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(cxp - 10, ry + 3, 4, 0, TAU); ctx.arc(cxp + 10, ry + 3, 4, 0, TAU); ctx.fill(); }); }
      // table
      const B = D.tbl(S, g), x0 = B[0]._x0, cw = B[0]._cw;
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#94a3b8'; ctx.fillRect(x0, g.ry + 8, 70 + cw * 5, 52); ctx.strokeRect(x0, g.ry + 8, 70 + cw * 5, 52); ctx.beginPath(); ctx.moveTo(x0, g.ry + 34); ctx.lineTo(x0 + 70 + cw * 5, g.ry + 34); ctx.stroke(); for (let i = 0; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(x0 + 70 + cw * i, g.ry + 8); ctx.lineTo(x0 + 70 + cw * i, g.ry + 60); ctx.stroke(); } });
      Q42.T(ctx, 'd (km)', x0 + 35, g.ry + 21, { s: fs, w: 900 }); Q42.T(ctx, 't (h)', x0 + 35, g.ry + 47, { s: fs, w: 900 });
      B.forEach((b, i) => { if (S.seen[i]) K.raw(ctx, () => { ctx.fillStyle = 'rgba(22,163,74,.18)'; ctx.fillRect(b.x - cw / 2, g.ry + 8, cw, 52); }); Q42.T(ctx, String(DI[i]), b.x, g.ry + 21, { s: fs, w: 800 }); Q42.T(ctx, String(T[i]), b.x, g.ry + 47, { s: fs, w: 800 }); });
      if (!S.seen.every(Boolean)) Q42.T(ctx, 'اضغط على عمود لرسم نقطته ⬆', x0 + 70 + cw * 2.5, g.ry + 76, { s: fs - 1, w: 800, c: '#0f766e' });
      // graph
      const A = Q41.axes(ctx, { x: g.gx, y: g.gy, w: g.gw, h: g.gh, xmax: 1.4, ymax: 120, xs: .1, ys: 10, lxs: .2, lys: 20, xl: 't (h)', yl: 'd (km)' }), X = A.X, Y = A.Y;
      const all = S.seen.every(Boolean);
      if (all) { Q41.line(ctx, [[X(0), Y(0)], [X(1.4), Y(112)]], '#0f766e', 2.4);
        const t1 = Math.min(S.p1, S.p2), t2 = Math.max(S.p1, S.p2); Q41.line(ctx, [[X(t1), Y(80 * t1)], [X(t2), Y(80 * t1)], [X(t2), Y(80 * t2)]], '#be185d', 2, [5, 4]);
        Q42.T(ctx, 'Δt = ' + (t2 - t1).toFixed(2) + ' h', (X(t1) + X(t2)) / 2, Y(80 * t1) + 14, { s: 10, w: 900, c: '#be185d' }); Q42.T(ctx, 'Δd = ' + (80 * (t2 - t1)).toFixed(0) + ' km', X(t2) + 8, (Y(80 * t1) + Y(80 * t2)) / 2, { s: 10, w: 900, c: '#be185d', a: 'left' });
        [[S.p1, 'p1'], [S.p2, 'p2']].forEach(q => { Q41.knob(ctx, X(q[0]), Y(80 * q[0]), '#be185d', 9); Q42.T(ctx, q[1], X(q[0]) - 18, Y(80 * q[0]) - 12, { s: 11, w: 900, c: '#be185d' }); }); }
      T.forEach((t, i) => { if (S.seen[i]) Q41.dot(ctx, X(t), Y(DI[i])); });
      // time cursor
      Q41.line(ctx, [[X(S.tc), g.gy], [X(S.tc), Y(0)]], '#2563eb', 1.6, [4, 3]); Q41.knob(ctx, X(S.tc), Y(0), '#2563eb', 8); Q42.T(ctx, 't = ' + S.tc.toFixed(2) + ' h   |   d = ' + (80 * S.tc).toFixed(0) + ' km', X(S.tc), g.gy - 30, { s: 10, w: 900, c: '#fff', bg: '#2563eb' });
      const t1 = Math.min(S.p1, S.p2), t2 = Math.max(S.p1, S.p2), cy = g.ph ? h - 84 : g.gy + g.gh + 60;
      const C = Q41.stepChips(S, 'ex', cy, g.ph ? 12 : g.gx - 30, 'حل الكتاب'); C[1]._col = '#be185d'; Q42.drawChips(ctx, C);
      const st = { q: 'جد انطلاق السيارة بيانياً', lines: ['نأخذ نقطتين على الخط: p1 (0.5 h ، 40 km) و p2 (1 h ، 80 km)', 'v = m = (d₂ − d₁) / (t₂ − t₁)', 'v = (80 − 40) / (1 − 0.5) = 40 / 0.5', 'v = 80 km/h'], k: S.k };
      if (!g.ph) { if (S.ex) Q42.steps(ctx, S, Object.assign({ title: 'ميل الخط' }, st), { y: 70, x: w - 12, wd: 330 }); else if (all) Q42.card(ctx, S, [{ t: 'نقطتاك: t₁ = ' + t1.toFixed(2) + ' ، t₂ = ' + t2.toFixed(2) + ' h', c: '#334155' }, { t: 'v = Δd / Δt = ' + (80 * (t2 - t1)).toFixed(0) + ' / ' + (t2 - t1).toFixed(2), mono: 1 }, { t: 'لأي نقطتين: v = 80 km/h', c: '#b91c1c', w: 900 }], { title: 'الميل = الانطلاق', y: 70, wd: 330 }); }
      Q42.banner(ctx, w, all ? 'اسحب p1 و p2 على الخط، أو مؤشر الزمن الأزرق' : 'اضغط على أعمدة الجدول لرسم النقاط');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), X = v => g.gx + v / 1.4 * g.gw, Y = v => g.gy + g.gh - v / 120 * g.gh, all = S.seen.every(Boolean);
      const L = D.tbl(S, g);
      if (all) ['p1', 'p2'].forEach(k => L.push({ id: k, x: X(S[k]), y: Y(80 * S[k]), r: 16, axis: 'x', keep: true, hint: false, tip: 'اسحب على الخط', drag: (S2, d) => { S2[k] = Math.round(clamp((d.x - g.gx) / g.gw * 1.4, .05, 1.35) * 20) / 20; } }));
      L.push({ id: 'tcur', x: X(S.tc), y: Y(0), r: 14, axis: 'x', keep: true, hint: false, tip: 'اسحب مؤشر الزمن', drag: (S2, d) => { S2.tc = clamp((d.x - g.gx) / g.gw * 1.4, 0, 1.25); } });
      return L.concat(Q41.stepChips(S, 'ex', g.ph ? g.h - 84 : g.gy + g.gh + 60, g.ph ? 12 : g.gx - 30)); },
    readings(S) { const t1 = Math.min(S.p1, S.p2), t2 = Math.max(S.p1, S.p2); return [rd('النقاط المرسومة', S.seen.filter(Boolean).length + ' / 5'), rd('Δt', (t2 - t1).toFixed(2) + ' h'), rd('Δd', (80 * (t2 - t1)).toFixed(0) + ' km'), rd('الميل = الانطلاق', '80 km/h')]; },
    explain(S) { return Q26.ex('النقاط تقع على خط مستقيم يمر بنقطة الأصل، والمثلث بين أي نقطتين يعطي النسبة نفسها.', 'المسافة تتناسب طردياً مع الزمن لأن الانطلاق ثابت، والخط المستقيم ميله ثابت: m = Δd / Δt = 80 km/h.', 'الرسم البياني يعطي متوسطاً جيداً لعدة قراءات، ويكشف القراءة الخاطئة لأنها تبتعد عن الخط.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — التغير الطردي: القطار والأسطوانة و y = 2x + a (مثال 1 و 2، ص 9–11) =============== */
(() => {
  const EX = {
    train: { t: 'مثال 1', q: 'قطار يقطع 160 km في ساعتين بانطلاق ثابت. ما الزمن اللازم لقطع 400 km؟', lines: ['d ∝ t ⟸ d = k t', 'k = 160 / 2 = 80 km/h', '400 = 80 t', 't = 5 h'] },
    cyl: { t: 'مثال 2', q: 'V ∝ r² h. أسطوانة حجمها 6160 cm³ ونصف قطرها 14 cm وارتفاعها 10 cm. ما ارتفاع أسطوانة حجمها 3080 cm³ ونصف قطرها 7 cm؟', lines: ['V = k r² h', 'k = 6160 / (14² × 10) = 22/7', '3080 = (22/7) × 7² × h', 'h = 3080 / 154 = 20 cm'] },
    line: { t: 'س ص 14', q: 'y = 2x + a: متى يمر الخط بنقطة الأصل؟', lines: ['الميل 2 في الحالتين: العلاقة خطية', 'a = 0 ⟸ y = 2x يمر بنقطة الأصل (تناسب طردي)', 'a ≠ 0 ⟸ لا يمر بالأصل: y لا تتناسب طردياً مع x'] } };
  const D = { id: 'g10_u_direct', page: 9, fig: 'مثال 1 + مثال 2',
    desc: 'يقال لكمية a إنها تتغير تغيراً طردياً مع كمية b إذا تغيرت a بالنسبة نفسها التي تتغير بها b: a ∝ b ⟺ a = k b حيث k ثابت التناسب. وقد تعتمد الكمية على أكثر من متغير، كحجم الأسطوانة V ∝ r² h.',
    tags: 'تغير طردي تناسب ثابت التناسب a=kb قطار 160km 400km 5h أسطوانة V=kr²h 22/7 y=2x+a',
    tools: ['قطار على سكة', 'أسطوانة قابلة لتغيير الأبعاد', 'رسم بياني'],
    steps: ['في «القطار» اسحب القطار على السكة: المسافة والزمن يزدادان بالنسبة نفسها، و d/t ثابت.', 'في «الأسطوانة» اسحب مقبضَي نصف القطر والارتفاع: ضاعف r فيصبح الحجم أربعة أمثال.', 'في «y = 2x + a» اسحب نقطة التقاطع: هل يبقى التناسب طردياً؟', 'اضغط «الحل خطوة خطوة» لحل مثال الكتاب.'],
    concl: ['a ∝ b ⟺ a = k b ، والرسم خط مستقيم يمر بنقطة الأصل.', 'مثال 1: k = 80 km/h ، والزمن لقطع 400 km هو 5 h.', 'مثال 2: V = k r² h ، k = 22/7 (أي π) ، والارتفاع 20 cm.', 'y = 2x + a خطية لكنها لا تمر بنقطة الأصل إلا إذا a = 0.'],
    laws: ['g10_propor'],
    controls: [],
    setup(S) { S.m = 'train'; S.tt = 2; S.r = 14; S.hh = 10; S.a = 3; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S); return { w, h, ph, L, gx: L + 50, gy: ph ? 250 : 210, gw: ph ? w - L - 80 : Math.min(360, w - L - 420), gh: ph ? h * .22 : Math.min(250, h - 370) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5; Q42.bg(ctx, w, h); let A;
      if (S.m === 'train') { const x0 = g.L + 20, x1 = g.ph ? w - 20 : w - 380, y = 110, d = 80 * S.tt, X = v => x0 + v / 480 * (x1 - x0);
        K.raw(ctx, () => { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y + 14); ctx.lineTo(x1, y + 14); ctx.stroke(); for (let x = x0; x < x1; x += 14) { ctx.fillStyle = '#a16207'; ctx.fillRect(x, y + 12, 6, 8); } ctx.fillStyle = '#0f766e'; rr(ctx, X(d) - 46, y - 18, 46, 28, 5); ctx.fill(); ctx.fillStyle = '#e0f2fe'; ctx.fillRect(X(d) - 40, y - 12, 12, 9); ctx.fillRect(X(d) - 24, y - 12, 12, 9); });
        for (let k = 0; k <= 480; k += 80) Q42.T(ctx, k + '', X(k), y + 32, { s: 9.5, w: 800, c: '#334155' }); Q42.T(ctx, 'km', x1 + 4, y + 32, { s: 9.5, w: 800 });
        Q42.T(ctx, 'd = ' + d.toFixed(0) + ' km   |   t = ' + S.tt.toFixed(2) + ' h   |   d / t = 80 km/h', (x0 + x1) / 2, y + 58, { s: fs + 1, w: 900, c: '#fff', bg: '#0f766e' });
        A = Q41.axes(ctx, { x: g.gx, y: g.gy, w: g.gw, h: g.gh, xmax: 6, ymax: 480, xs: .5, ys: 40, lxs: 1, lys: 80, xl: 't (h)', yl: 'd (km)' }); Q41.line(ctx, [[A.X(0), A.Y(0)], [A.X(6), A.Y(480)]]); Q41.dot(ctx, A.X(2), A.Y(160), '#64748b'); Q41.dot(ctx, A.X(S.tt), A.Y(d));
        if (Math.abs(S.tt - 5) < .03) Q42.T(ctx, '400 km بعد 5 h ✓', A.X(5), A.Y(400) - 20, { s: 11, w: 900, c: '#fff', bg: '#16a34a' });
      } else if (S.m === 'cyl') { const cx = g.ph ? w / 2 : g.L + 200, base = g.ph ? 200 : 330, ps = g.ph ? 4.4 : 7, rw = S.r * ps, hp = S.hh * ps * 1.4, V = 22 / 7 * S.r * S.r * S.hh;
        K.raw(ctx, () => { const gr = ctx.createLinearGradient(cx - rw, 0, cx + rw, 0); gr.addColorStop(0, '#5eead4'); gr.addColorStop(.5, '#ccfbf1'); gr.addColorStop(1, '#0f766e'); ctx.fillStyle = gr; ctx.fillRect(cx - rw, base - hp, 2 * rw, hp); ctx.beginPath(); ctx.ellipse(cx, base, rw, rw * .25, 0, 0, Math.PI); ctx.fill(); ctx.fillStyle = '#99f6e4'; ctx.beginPath(); ctx.ellipse(cx, base - hp, rw, rw * .25, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#0f766e'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, base - hp); ctx.lineTo(cx + rw, base - hp); ctx.stroke(); });
        Q41.knob(ctx, cx + rw, base - hp, '#dc2626', 10); Q41.knob(ctx, cx - rw - 18, base - hp, '#2563eb', 10); Q41.line(ctx, [[cx - rw - 18, base], [cx - rw - 18, base - hp]], '#2563eb', 2);
        Q42.T(ctx, 'r = ' + S.r + ' cm', cx + rw / 2, base - hp - 22, { s: fs, w: 900, c: '#dc2626' }); Q42.T(ctx, 'h = ' + S.hh + ' cm', cx - rw - 26, base - hp / 2, { s: fs, w: 900, c: '#2563eb', a: 'right' });
        Q42.T(ctx, 'V = (22/7) × r² × h = ' + V.toFixed(0) + ' cm³', cx, base + 40, { s: fs + 1, w: 900, c: '#fff', bg: '#0f766e' });
        if (S.r === 7 && S.hh === 20) Q42.T(ctx, 'هذه أسطوانة مثال 2: V = 3080 cm³ ✓', cx, base + 66, { s: fs, w: 900, c: '#fff', bg: '#16a34a' });
      } else { A = Q41.axes(ctx, { x: g.gx, y: g.gy - 60, w: g.gw, h: g.gh + 60, xmax: 6, ymax: 20, xs: 1, ys: 1, lxs: 1, lys: 4, xl: 'x', yl: 'y' });
        Q41.line(ctx, [[A.X(0), A.Y(0)], [A.X(6), A.Y(12)]], '#94a3b8', 2, [5, 4]); Q41.line(ctx, [[A.X(0), A.Y(S.a)], [A.X(6), A.Y(12 + S.a)]], '#0f766e', 2.6); Q41.knob(ctx, A.X(0), A.Y(S.a), '#dc2626', 10);
        Q42.T(ctx, 'y = 2x + ' + S.a.toFixed(1), A.X(4), A.Y(8 + S.a) - 22, { s: 13, w: 900, c: '#0f766e' }); Q42.T(ctx, 'y = 2x', A.X(5.2), A.Y(10.4) + 18, { s: 11, w: 800, c: '#64748b' });
        Q42.T(ctx, S.a < .05 ? 'يمر بنقطة الأصل: تناسب طردي' : 'لا يمر بنقطة الأصل: y/x ليس ثابتاً', A.X(3), A.Y(19), { s: fs, w: 900, c: '#fff', bg: S.a < .05 ? '#16a34a' : '#dc2626' }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      const st = Object.assign({ title: EX[S.m].t }, EX[S.m], { k: S.k });
      if (S.ex) Q42.steps(ctx, S, st, { y: g.ph ? h - 250 : 70, x: w - 12, wd: g.ph ? w - 24 : 360 });
      else if (!g.ph) Q42.card(ctx, S, [{ t: 'a ∝ b ⟺ a = k b', mono: 1, w: 900, c: '#0f766e' }, { t: 'ثابت: a₁ / b₁ = a₂ / b₂', c: '#334155' }, { t: 'الرسم: خط مستقيم يمر بنقطة الأصل', c: '#334155' }, { t: EX[S.m].q, c: '#7c3aed', w: 800 }], { title: 'التغير الطردي', y: 70, wd: 360 });
      Q42.banner(ctx, w, S.m === 'train' ? 'اسحب القطار على السكة' : S.m === 'cyl' ? 'اسحب المقبض الأحمر (r) والأزرق (h)' : 'اسحب نقطة التقاطع الحمراء على المحور y');
    },
    chips(S, g) { return { m: Q42.chips(S, 'm', [['train', '🚆 القطار'], ['cyl', 'الأسطوانة'], ['line', 'y = 2x + a']], g.h - 128, S.m, (S2, k) => { S2.m = k; S2.ex = 0; S2.k = 0; }, { bw: 150 }), e: Q41.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { if (S2.m === 'cyl') { S2.r = 14; S2.hh = 10; } if (S2.m === 'train') S2.tt = 2; }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), L = [];
      if (S.m === 'train') { const x0 = g.L + 20, x1 = g.ph ? g.w - 20 : g.w - 380, X = v => x0 + v / 480 * (x1 - x0); L.push({ id: 'train', x: X(80 * S.tt) - 23, y: 106, w: 50, h: 32, axis: 'x', keep: true, tip: 'اسحب القطار', idle: 'اسحب ✋', drag: (S2, d) => { S2.tt = Math.round(clamp((d.x + 23 - x0) / (x1 - x0) * 480 / 80, 0, 6) * 20) / 20; } }); }
      else if (S.m === 'cyl') { const cx = g.ph ? g.w / 2 : g.L + 200, base = g.ph ? 200 : 330, ps = g.ph ? 4.4 : 7, rw = S.r * ps, hp = S.hh * ps * 1.4;
        L.push({ id: 'rad', x: cx + rw, y: base - hp, r: 16, axis: 'x', keep: true, tip: 'اسحب نصف القطر', idle: 'اسحب ✋', drag: (S2, d) => { S2.r = clamp(Math.round((d.x - cx) / ps), 3, 20); } }, { id: 'ht', x: cx - rw - 18, y: base - hp, r: 16, axis: 'y', keep: true, hint: false, tip: 'اسحب الارتفاع', drag: (S2, d) => { S2.hh = clamp(Math.round((base - d.y) / (ps * 1.4)), 2, g.ph ? 24 : 24); } }); }
      else { const X0 = g.gx, Y = v => g.gy - 60 + (g.gh + 60) - v / 20 * (g.gh + 60); L.push({ id: 'icpt', x: X0, y: Y(S.a), r: 16, axis: 'y', keep: true, tip: 'اسحب نقطة التقاطع', idle: 'اسحب ✋', drag: (S2, d) => { let a = (g.gy - 60 + g.gh + 60 - d.y) / (g.gh + 60) * 20; a = clamp(a, 0, 8); S2.a = a < .4 ? 0 : Math.round(a * 2) / 2; } }); }
      return L.concat(C.m, C.e); },
    readings(S) { if (S.m === 'train') return [rd('الزمن t', S.tt.toFixed(2) + ' h'), rd('المسافة d', (80 * S.tt).toFixed(0) + ' km'), rd('ثابت التناسب d/t', '80 km/h')]; if (S.m === 'cyl') return [rd('r', S.r + ' cm'), rd('h', S.hh + ' cm'), rd('V', (22 / 7 * S.r * S.r * S.hh).toFixed(0) + ' cm³')]; return [rd('a', S.a.toFixed(1)), rd('يمر بالأصل؟', S.a < .05 ? 'نعم' : 'لا')]; },
    explain(S) { return Q26.ex('في التغير الطردي تبقى النسبة بين الكميتين ثابتة مهما تغيرت قيمتاهما.', 'إذا كانت a = k b فإن مضاعفة b تضاعف a، والرسم خط مستقيم يمر بنقطة الأصل ميله k. وفي الأسطوانة V يتناسب مع r² فمضاعفة r تجعل الحجم أربعة أمثال.', 'ثمن الوقود يتناسب طردياً مع عدد اللترات، وثابت التناسب هو سعر اللتر.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C3 — التغير العكسي: قانونا بويل وشارل والغاز المثالي (ص 11–12) =============== */
(() => {
  const D = { id: 'g10_u_gas', page: 11, fig: 'التغير العكسي + قانون الغاز المثالي',
    desc: 'يقال لكمية a إنها تتغير عكسياً مع كمية b إذا كان a ∝ 1/b ⟺ a = k / b ، أي a b = ثابت. مثاله قانون بويل: حجم كمية من الغاز يتناسب عكسياً مع ضغطه بثبوت درجة الحرارة، وقانون شارل: الحجم يتناسب طردياً مع درجة الحرارة المطلقة بثبوت الضغط. ومنهما قانون الغاز المثالي pV = nRT حيث R = 8.314 J/mol·K.',
    tags: 'تغير عكسي a=k/b قانون بويل قانون شارل الغاز المثالي pV=nRT R=8.314 مكبس أسطوانة',
    tools: ['أسطوانة غاز بمكبس', 'مقياس ضغط', 'محرار', 'مصدر حرارة'],
    steps: ['في «بويل» اسحب المكبس إلى الأسفل لتقليل الحجم: لاحظ ازدياد الضغط وأن p × V ثابت.', 'اضغط «سجّل» عند عدة مواضع: النقاط ترسم منحنياً (قطع زائد) لا خطاً مستقيماً.', 'في «شارل» اسحب مقبض اللهب لرفع درجة الحرارة: الحجم يزداد طردياً مع T بالكلفن.', 'لاحظ في البطاقة أن pV / T ثابت = nR.'],
    concl: ['التغير العكسي: a = k / b ، أي a × b = ثابت ؛ مضاعفة b تنصّف a.', 'بويل: p ∝ 1/V بثبوت T ، فـ p V = ثابت.', 'شارل: V ∝ T بثبوت p (T بالكلفن).', 'قانون الغاز المثالي: p V = n R T ، R = 8.314 J/(mol·K).'],
    laws: ['g10_gas', 'g10_propor'],
    controls: [],
    setup(S) { S.m = 'boyle'; S.V = 2; S.T = 300; S.pts = []; },
    n: 101325 * 2e-3 / (8.314 * 300), // mol, so p = 1 atm at V = 2 L, 300 K
    p(S) { return D.n * 8.314 * S.T / (S.V * 1e-3); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), cx = L + (ph ? 70 : 110), top = 140, ch = ph ? 190 : 250; return { w, h, ph, L, cx, top, ch, cw: ph ? 80 : 110, gx: ph ? cx + 90 : cx + 150, gy: 110, gw: ph ? w - cx - 120 : Math.min(330, w - cx - 520), gh: ph ? 190 : 260 }; },
    yP(S, g) { return g.top + g.ch - S.V / 4 * g.ch; }, // piston y, V up to 4 L
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, p = D.p(S), yp = D.yP(S, g); Q42.bg(ctx, w, h);
      // cylinder + gas
      const hot = (S.T - 250) / 250;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(' + Math.round(150 + 100 * hot) + ',' + Math.round(200 - 80 * hot) + ',255,.35)'; ctx.fillRect(g.cx - g.cw / 2, yp, g.cw, g.top + g.ch - yp); ctx.strokeStyle = '#334155'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.cx - g.cw / 2, g.top - 20); ctx.lineTo(g.cx - g.cw / 2, g.top + g.ch); ctx.lineTo(g.cx + g.cw / 2, g.top + g.ch); ctx.lineTo(g.cx + g.cw / 2, g.top - 20); ctx.stroke(); ctx.fillStyle = '#64748b'; ctx.fillRect(g.cx - g.cw / 2 + 3, yp - 12, g.cw - 6, 12); ctx.fillRect(g.cx - 5, g.top - 40, 10, yp - g.top + 30); ctx.fillStyle = '#dc2626'; rr(ctx, g.cx - 22, g.top - 52, 44, 14, 5); ctx.fill(); });
      // molecules
      const t = S.an || 0, sp = Math.sqrt(S.T / 300); for (let i = 0; i < 24; i++) { const fx = (Math.sin(i * 12.9 + t * sp * (1 + i % 3)) + 1) / 2, fy = (Math.cos(i * 7.3 + t * sp * (1.3 + i % 2)) + 1) / 2; Q41.dot(ctx, g.cx - g.cw / 2 + 8 + fx * (g.cw - 16), yp + 6 + fy * (g.top + g.ch - yp - 12), '#2563eb', 3.5); }
      if (S.m === 'charles') K.raw(ctx, () => { const fl = 10 + hot * 22; ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(g.cx - 20, g.top + g.ch + 34); ctx.quadraticCurveTo(g.cx, g.top + g.ch + 34 - fl * 2, g.cx + 20, g.top + g.ch + 34); ctx.fill(); ctx.fillStyle = '#334155'; ctx.fillRect(g.cx - 30, g.top + g.ch + 34, 60, 8); });
      if (S.m === 'charles') Q41.knob(ctx, g.cx + 44, g.top + g.ch + 34 - hot * 40, '#f97316', 11);
      Q42.T(ctx, 'V = ' + S.V.toFixed(2) + ' L', g.cx, g.top + g.ch + (S.m === 'charles' ? 62 : 18), { s: fs + 1, w: 900, c: '#fff', bg: '#2563eb' });
      Q42.T(ctx, 'p = ' + (p / 1000).toFixed(1) + ' kPa', g.cx, g.top - 70, { s: fs + 1, w: 900, c: '#fff', bg: '#dc2626' });
      Q42.T(ctx, 'T = ' + S.T.toFixed(0) + ' K', g.cx + g.cw / 2 + 8, g.top + g.ch - 14, { s: fs, w: 900, c: '#c2410c', a: 'left' });
      // graph
      if (!g.ph || true) { const boy = S.m === 'boyle'; const A = Q41.axes(ctx, boy ? { x: g.gx, y: g.gy, w: g.gw, h: g.gh, xmax: 4, ymax: 400, xs: .5, ys: 50, lxs: 1, lys: 100, xl: 'V (L)', yl: 'p (kPa)' } : { x: g.gx, y: g.gy, w: g.gw, h: g.gh, xmax: 500, x0: 0, ymax: 4, xs: 50, ys: .5, lxs: 100, lys: 1, xl: 'T (K)', yl: 'V (L)' });
        if (boy) { const pts = []; for (let V = .5; V <= 4.001; V += .05) pts.push([A.X(V), A.Y(D.n * 8.314 * 300 / (V * 1e-3) / 1000)]); Q41.line(ctx, pts, 'rgba(15,118,110,.35)', 2, [5, 4]); S.pts.filter(q => q.m === 'boyle').forEach(q => Q41.dot(ctx, A.X(q.V), A.Y(q.p / 1000))); Q41.dot(ctx, A.X(S.V), A.Y(p / 1000), '#2563eb', 6); }
        else { Q41.line(ctx, [[A.X(0), A.Y(0)], [A.X(500), A.Y(2 * 500 / 300)]], 'rgba(15,118,110,.45)', 2, [5, 4]); S.pts.filter(q => q.m === 'charles').forEach(q => Q41.dot(ctx, A.X(q.T), A.Y(q.V))); Q41.dot(ctx, A.X(S.T), A.Y(S.V), '#2563eb', 6); } }
      if (!g.ph) Q42.card(ctx, S, S.m === 'boyle' ? [{ t: 'ثابت: p × V = ' + (p * S.V * 1e-3).toFixed(1) + ' J', c: '#0f766e', w: 900 }, { t: 'بثبوت درجة الحرارة: p ∝ 1 / V', c: '#334155' }, { t: 'ضاعف الحجم ⟸ ينتصف الضغط', c: '#b91c1c', w: 800 }, { t: 'pV = nRT', mono: 1, c: '#7c3aed' }, { t: 'R = 8.314 J/(mol·K)', mono: 1, c: '#7c3aed' }] : [{ t: 'ثابت: V / T = ' + (S.V / S.T * 1000).toFixed(3) + '×10⁻³ L/K', c: '#0f766e', w: 900 }, { t: 'بثبوت الضغط: V ∝ T', c: '#334155' }, { t: 'درجة الحرارة بالكلفن', c: '#64748b' }, { t: 'pV / T = nR = ' + (D.n * 8.314).toFixed(3) + ' J/K', mono: 1, c: '#7c3aed' }], { title: S.m === 'boyle' ? 'قانون بويل: تغير عكسي' : 'قانون شارل: تغير طردي', y: 70, wd: 300 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, S.m === 'boyle' ? 'اسحب المقبض الأحمر للمكبس ثم سجّل' : 'اسحب مقبض اللهب البرتقالي ثم سجّل');
    },
    update(S, dt) { S.an = (S.an || 0) + dt * 3; if (S.m === 'charles') S.V = 2 * S.T / 300; },
    chips(S, g) { return Q42.chips(S, 'm', [['boyle', 'بويل p ∝ 1/V'], ['charles', 'شارل V ∝ T'], ['rec', '📌 سجّل']], g.h - 84, S.m, (S2, k) => { if (k === 'rec') S2.pts.push({ m: S2.m, V: S2.V, T: S2.T, p: D.p(S2) }); else { S2.m = k; if (k === 'boyle') S2.T = 300; else S2.V = 2 * S2.T / 300; } }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      if (S.m === 'boyle') L.push({ id: 'pist', x: g.cx, y: g.top - 45, r: 20, axis: 'y', keep: true, tip: 'اسحب المكبس', idle: 'اسحب ✋', drag: (S2, d) => { const yp = d.y + 45 - g.top + g.top; S2.V = clamp(Math.round((g.top + g.ch - yp) / g.ch * 4 * 20) / 20, .5, 4); } });
      else { const hot = (S.T - 250) / 250; L.push({ id: 'flame', x: g.cx + 44, y: g.top + g.ch + 34 - hot * 40, r: 18, axis: 'y', keep: true, tip: 'اسحب لرفع درجة الحرارة', idle: 'اسحب ✋', drag: (S2, d) => { S2.T = clamp(Math.round((250 + (g.top + g.ch + 34 - d.y) / 40 * 250) / 5) * 5, 150, 500); } }); }
      return L.concat(D.chips(S, g)); },
    readings(S) { const p = D.p(S); return [rd('الضغط p', (p / 1000).toFixed(1) + ' kPa'), rd('الحجم V', S.V.toFixed(2) + ' L'), rd('درجة الحرارة T', S.T + ' K'), rd('p × V', (p * S.V * 1e-3).toFixed(1) + ' J')]; },
    record(S) { return { V: S.V.toFixed(2), p: (D.p(S) / 1000).toFixed(1), T: S.T }; },
    cols: [['V', 'V (L)'], ['p', 'p (kPa)'], ['T', 'T (K)']],
    explain(S) { return Q26.ex('عند كبس الغاز يزداد ضغطه، وعند تسخينه يتمدد حجمه.', 'في الحجم الأصغر تصطدم الجزيئات بالجدران أكثر فيزداد الضغط بحيث يبقى p V ثابتاً (تغير عكسي). وعند التسخين تزداد سرعة الجزيئات فيدفع الغاز المكبس فيزداد الحجم طردياً مع T. وجمع القانونين يعطي p V = n R T.', 'لهذا تنفخ إطارات السيارة وهي باردة، ويحذَّر من تسخين علب البخاخات المضغوطة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C4 — أسئلة الفصل ومسائله على الجهاز (ص 13–14) =============== */
(() => {
  const PB = {
    d: { t: 'طردي', q: 'تغير طردي: جد قيمة x الجديدة', lines: ['x ∝ y :  x₁ = 8 , y₁ = 15 , y₂ = 10', 'x₁ / y₁ = x₂ / y₂', '8 / 15 = x₂ / 10', 'x₂ = 8 × 10 / 15', 'x₂ = 16/3 ≈ 5.33'], kind: 'd', a: [8, 15], b: 10 },
    i: { t: 'عكسي', q: 'تغير عكسي: جد قيمة x الجديدة', lines: ['x ∝ 1/y :  x₁ = 7 , y₁ = 3 , y₂ = 7', 'x₁ y₁ = x₂ y₂', '7 × 3 = x₂ × 7', 'x₂ = 21 / 7', 'x₂ = 3'], kind: 'i', a: [7, 3], b: 7 },
    rad: { t: '1 rad', q: 'كم درجة يساوي راديان واحد؟', lines: ['2π rad = 360°', '1 rad = 360° / 2π = 180° / π', '1 rad = 180 / 3.14 ≈ 57.3°'], kind: 'n' },
    zero: { t: '5⁰', q: 'ما قيمة 5⁰ ؟ ولماذا؟', lines: ['5³ / 5³ = 5³⁻³ = 5⁰', 'لكن 5³ / 5³ = 125 / 125 = 1', '5⁰ = 1 (أي عدد غير الصفر أُسّه صفر يساوي 1)'], kind: 'n' } };
  const KEYS = Object.keys(PB);
  const D = { id: 'g10_u_problems', page: 13, fig: 'أسئلة الفصل ص 13–14',
    desc: 'أسئلة الفصل الأول ومسائله على الجهاز: التغير الطردي (x ∝ y)، التغير العكسي (x ∝ 1/y)، تحويل الراديان إلى درجات، والقوة الصفرية.',
    tags: 'أسئلة الفصل الأول مسائل تغير طردي عكسي x∝y x∝1/y 16/3 راديان 57.3 القوة الصفرية',
    tools: ['ميزان تناسب'],
    steps: ['اختر سؤالاً من الأزرار السفلية.', 'في سؤالي الطردي والعكسي اسحب المقبض إلى القيمة الجديدة لـ y ولاحظ x يتغير.', 'اضغط «الخطوة التالية» لكشف الحل خطوة خطوة.'],
    concl: ['طردي: x = 16/3 عندما y = 10.', 'عكسي: x = 3 عندما y = 7.', '1 rad = 57.3° ، و 5⁰ = 1.'],
    laws: ['g10_propor', 'g10_rad'],
    controls: [],
    setup(S) { S.pb = 'd'; S.k = 0; S.y = 15; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S); return { w, h, ph, L, x0: L + 30, x1: ph ? w - 30 : w - 400, by: ph ? 200 : 230 }; },
    x(S) { const P = PB[S.pb]; return P.kind === 'd' ? P.a[0] * S.y / P.a[1] : P.a[0] * P.a[1] / S.y; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10.5 : 12, P = PB[S.pb]; Q42.bg(ctx, w, h);
      if (P.kind !== 'n') { const x = D.x(S), X = v => g.x0 + v / 20 * (g.x1 - g.x0), hb = v => v / 20 * (g.ph ? 120 : 160);
        Q41.slider(ctx, g.x0, g.x1, g.by + 60, S.y / 20, 'y = ' + S.y.toFixed(1), '#2563eb');
        K.raw(ctx, () => { ctx.fillStyle = '#2563eb'; ctx.fillRect(g.x0 + 30, g.by - hb(S.y), 50, hb(S.y)); ctx.fillStyle = '#dc2626'; ctx.fillRect(g.x0 + 110, g.by - hb(x), 50, hb(x)); ctx.fillStyle = 'rgba(100,116,139,.35)'; ctx.fillRect(g.x0 + 190, g.by - hb(P.a[1]), 30, hb(P.a[1])); ctx.fillRect(g.x0 + 230, g.by - hb(P.a[0]), 30, hb(P.a[0])); });
        Q42.T(ctx, 'y', g.x0 + 55, g.by + 14, { s: 13, w: 900, c: '#2563eb' }); Q42.T(ctx, 'x = ' + x.toFixed(2), g.x0 + 135, g.by - hb(x) - 14, { s: fs, w: 900, c: '#dc2626' });
        Q42.T(ctx, 'البداية', g.x0 + 225, g.by + 14, { s: 10, w: 800, c: '#64748b' }); Q42.T(ctx, 'y₁ x₁', g.x0 + 225, g.by - Math.max(hb(P.a[0]), hb(P.a[1])) - 12, { s: 10, w: 800, c: '#64748b' });
        Q42.T(ctx, P.kind === 'd' ? 'ثابت: x / y = ' + (x / S.y).toFixed(3) : 'ثابت: x × y = ' + (x * S.y).toFixed(1), (g.x0 + g.x1) / 2 + 60, g.by - 140, { s: fs + 1, w: 900, c: '#fff', bg: '#0f766e' });
        if (Math.abs(S.y - P.b) < .05) Q42.T(ctx, 'y = ' + P.b + ' ⟸ x = ' + (P.kind === 'd' ? '16/3' : '3') + ' ✓', (g.x0 + g.x1) / 2 + 60, g.by - 110, { s: fs, w: 900, c: '#fff', bg: '#16a34a' });
      } else if (S.pb === 'rad') { const cx = g.ph ? w / 2 : g.L + 160, cy = 220, r = 90; K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, -1, true); ctx.stroke(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + r, cy); ctx.lineTo(cx, cy); ctx.lineTo(cx + r * Math.cos(-1), cy + r * Math.sin(-1)); ctx.stroke(); }); Q42.T(ctx, '1 rad = 57.3°', cx, cy + r + 24, { s: 13, w: 900, c: '#fff', bg: '#0f766e' }); }
      else { const cx = g.ph ? w / 2 : g.L + 200; ['5³ = 125', '5² = 25', '5¹ = 5', '5⁰ = 1', '5⁻¹ = 0.2'].forEach((t, i) => Q42.T(ctx, t, cx, 110 + i * 34, { s: 15, w: 900, c: i === 3 ? '#fff' : '#0f172a', bg: i === 3 ? '#dc2626' : undefined })); Q42.T(ctx, 'كل خطوة للأسفل ÷ 5', cx + (g.ph ? 0 : 130), g.ph ? 290 : 160, { s: 11, w: 800, c: '#0f766e' }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); C.n._lab = '⬇ الخطوة التالية'; C.n._col = '#be185d'; Q42.drawChips(ctx, [C.n]);
      Q42.steps(ctx, S, { title: 'سؤال ' + P.t, q: P.q, lines: P.lines, k: S.k }, { y: g.ph ? h - 280 : 70, x: w - 12, wd: g.ph ? w - 24 : 370 });
      Q42.banner(ctx, w, P.kind !== 'n' ? 'اسحب المقبض الأزرق لتغيير y' : 'اضغط «الخطوة التالية»');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pb', KEYS.map(k => [k, PB[k].t]), g.h - 128, S.pb, (S2, k) => { S2.pb = k; S2.k = 0; S2.y = PB[k].a ? PB[k].a[1] : 10; }, { bw: 130 }), n: Q42.btn('nx', { x: g.L + 90, y: g.h - 84, w: 170, h: 34 }, S2 => { S2.k = Math.min(S2.k + 1, PB[S2.pb].lines.length); }, { tip: 'الخطوة التالية' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); const L = [];
      if (PB[S.pb].kind !== 'n') L.push(Q41.sdrag('y', g.x0, g.x1, g.by + 60, S.y / 20, (S2, t) => { S2.y = clamp(Math.round(t * 40) / 2, 1, 20); }, { tip: 'اسحب لتغيير y', extra: { idle: 'اسحب ✋' } }));
      return L.concat(C.p, [C.n]); },
    readings(S) { const P = PB[S.pb]; return P.kind === 'n' ? [rd('السؤال', P.t)] : [rd('y', S.y.toFixed(1)), rd('x', D.x(S).toFixed(3))]; },
    explain(S) { return Q26.ex('في الطردي يكبر x مع y بالنسبة نفسها، وفي العكسي يصغر x كلما كبر y.', 'الطردي: x / y ثابت. العكسي: x × y ثابت. ومن الثابت نجد القيمة المجهولة.', 'عدد العمال وزمن إنجاز عمل معين يتغيران عكسياً.'); }
  };
  M8.P[D.id] = D;
})();

/* tap-only items: no drag arrows */
Object.keys(M8.P).filter(k => /^g10_u_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g10_u_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g10_si', ch: 41, reg: X10, sec: '1-1 القياس + 1-2 النظام الدولي للوحدات', page: 4, kind: 'نشاط',
  title: 'النظام الدولي للوحدات SI: الوحدات الأساسية والتكميلية والبادئات',
  desc: 'حواسنا محدودة، لذا نحتاج إلى أدوات قياس ونظام موحد للوحدات. نصل كل كمية أساسية بوحدتها (الجدول 1)، ونتعرف الراديان والستراديان بأيدينا (الجدول 2)، ونحوّل المقادير بالبادئات (الجدول 3).',
  tags: 'القياس النظام الدولي وحدات أساسية تكميلية بادئات راديان ستراديان',
  fact: ['استعمل الإنسان قديماً نبضات القلب لقياس الزمن، واليوم والسنة كوحدات طبيعية للزمن (ص 4).', 'السنتي c = 10⁻² شائع الاستعمال لكنه ليس من خطوات النظام الدولي 10³ (الجدول 3).', 'كل الكميات الفيزيائية غير الأساسية كميات مشتقة، مثل السرعة m/s والقوة N (ص 4).'],
  quiz: [
    { q: 'الراديان هو الزاوية المركزية المقابلة لقوس طوله يساوي:', o: ['نصف قطر الدائرة', 'قطر الدائرة', 'محيط الدائرة', 'ربع المحيط'], a: 0, why: 'س1 ص 13 والجدول 2.' },
    { q: 'محيط الدائرة يقابل زاوية مركزية مقدارها:', o: ['2π rad', 'π rad', '4π rad', '1 rad'], a: 0, why: 'س2 ص 13: المحيط 2πr ÷ r = 2π.' },
    { q: 'سطح الكرة يقابل زاوية مجسمة مقدارها:', o: ['4π sr', '2π sr', 'π sr', '1 sr'], a: 0, why: 'س3 ص 13: مساحة سطح الكرة 4πr² ÷ r².' },
    { q: 'الأمبير وحدة قياس:', o: ['التيار الكهربائي', 'شدة الإضاءة', 'كمية المادة', 'درجة الحرارة'], a: 0, why: 'س4 ص 13 والجدول 1.' },
    { q: '1 mm² يساوي:', o: ['10⁻⁶ m²', '10⁻³ m²', '10⁻² m²', '10⁻⁹ m²'], a: 0, why: 'س5 ص 13: (10⁻³)² = 10⁻⁶.' },
    { q: 'الراديان الواحد يساوي تقريباً:', o: ['57.3°', '90°', '180°', '3.14°'], a: 0, why: '1 rad = 180° / π.' }],
  parts: [{ id: 'g10_u_si', n: 'صِل الكمية بوحدتها: الجدولان (1) و (2)' }, { id: 'g10_u_rad', n: 'الراديان والستراديان بيدك' }, { id: 'g10_u_prefix', n: 'سلّم البادئات: الجدول (3) و 1 mm² = 10⁻⁶ m²' }] });
M8.merge({ id: 'g10_err', ch: 41, reg: X10, sec: '1-3 أخطاء القياس', page: 6, kind: 'نشاط',
  title: 'أخطاء القياس: المسطرة مقابل المايكروميتر والقياسات المتكررة',
  desc: 'نقيس قطعة معدنية بالمسطرة (أصغر تدريجة 1 mm) ثم بالمايكروميتر (0.01 mm)، ونرى خطأ الجهاز والأخطاء الشخصية، ونعالج العشوائية منها بتكرار القياس وأخذ المتوسط الحسابي.',
  tags: 'أخطاء القياس جهاز شخصية عشوائية متوسط حسابي مايكروميتر',
  fact: ['لا يوجد قياس تام الدقة، فلكل جهاز حد لدقته (ص 6).', 'الأخطاء العشوائية هي الوحيدة التي يمكن معالجتها بالقياسات المتكررة، والمتوسط الحسابي خير تخمين للقيمة الحقيقية (ص 7).', 'خطأ صغير في قياس موقع على خارطة بمسطرة قد يؤدي إلى خطأ كبير في البعد الحقيقي (ص 7).'],
  quiz: [
    { q: 'أي الأخطاء يمكن تقليلها بتكرار القياس وأخذ المتوسط الحسابي؟', o: ['الأخطاء الشخصية العشوائية', 'خطأ أصغر تدريجة في الجهاز', 'لا شيء منها'], a: 0, why: 'ص 7: الأخطاء العشوائية تعالج بالقياسات المتكررة.' },
    { q: 'أيهما أدق في قياس سمك سلك رفيع؟', o: ['المايكروميتر (0.01 mm)', 'المسطرة المترية (1 mm)', 'متساويان'], a: 0, why: 'أصغر تدريجة في المايكروميتر أصغر بمئة مرة.' },
    { q: 'كتابة النتيجة 1.32 ± 0.02 cm تعني أن القيمة الحقيقية تقع بين:', o: ['1.30 و 1.34 cm', '1.32 و 1.34 cm', '1.00 و 2.00 cm'], a: 0, why: '1.32 − 0.02 = 1.30 و 1.32 + 0.02 = 1.34.' }],
  parts: [{ id: 'g10_u_err', n: 'المسطرة والمايكروميتر والمتوسط الحسابي' }] });
M8.merge({ id: 'g10_graph', ch: 41, reg: X10, sec: '1-4 الرسوم البيانية + 1-5 التغير الطردي والعكسي', page: 8, kind: 'مثال',
  title: 'الرسوم البيانية والتناسب: ميل الخط، التغير الطردي والعكسي، والغاز المثالي',
  desc: 'نرسم خط انطلاق السيارة ونجد ميله (80 km/h)، ونحل مثالي القطار والأسطوانة على الجهاز، ونرى التغير العكسي بقانون بويل والطردي بقانون شارل، ثم نحل أسئلة الفصل.',
  tags: 'رسم بياني ميل تغير طردي عكسي بويل شارل الغاز المثالي',
  fact: ['يفضل استعمال الأرقام الزوجية لتدريجات مقياس الرسم (ص 8).', 'الرسوم البيانية من الطرائق المفضلة للحصول على المتوسط الحسابي لعدد من القراءات (ص 8).', 'R = 8.314 J/(mol·K) هو الثابت العام للغازات في pV = nRT (ص 12).'],
  quiz: [
    { q: 'y = 2x + 5 تمثل علاقة:', o: ['خطية لكنها لا تمر بنقطة الأصل', 'عكسية', 'طردية تمر بنقطة الأصل', 'تربيعية'], a: 0, why: 'س ص 14: الحد الثابت 5 يجعل الخط يقطع المحور y عند 5.' },
    { q: 'y = m x تمثل:', o: ['خطاً مستقيماً يمر بنقطة الأصل ميله m', 'منحنياً عكسياً', 'خطاً أفقياً'], a: 0, why: 'س ص 14: تناسب طردي.' },
    { q: 'إذا كان x ∝ y و x = 8 عندما y = 15 ، فإن x عندما y = 10 يساوي:', o: ['16/3', '12', '3', '75/4'], a: 0, why: '8/15 = x/10 ⟸ x = 16/3.' },
    { q: 'إذا كان x ∝ 1/y و x = 7 عندما y = 3 ، فإن x عندما y = 7 يساوي:', o: ['3', '7', '21', '49/3'], a: 0, why: 'x y ثابت = 21 ⟸ x = 3.' },
    { q: 'قطار يقطع 160 km في 2 h. الزمن اللازم لقطع 400 km:', o: ['5 h', '4 h', '2.5 h', '8 h'], a: 0, why: 'مثال 1 ص 10: k = 80 km/h.' }],
  parts: [{ id: 'g10_u_graph', n: 'انطلاق السيارة من ميل الخط (الشكلان 1-1 و 2-1)' }, { id: 'g10_u_direct', n: 'التغير الطردي: القطار والأسطوانة و y = 2x + a' }, { id: 'g10_u_gas', n: 'التغير العكسي: بويل وشارل والغاز المثالي' }, { id: 'g10_u_problems', n: 'أسئلة الفصل على الجهاز (ص 13–14)' }] });
