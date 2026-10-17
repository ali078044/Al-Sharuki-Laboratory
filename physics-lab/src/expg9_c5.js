'use strict';
/* ====================== الثالث المتوسط — الفصل الخامس: الطاقة والقدرة الكهربائية (ch 35, ص 93–110) ======================
   Merged experiments (book order): g9_power (1-5) · g9_energy (2-5) · g9_safety (3-5، 4-5، 5-5 + أسئلة الفصل).
   Reuses the circuit kit Q33 (chapter 3) and Q34 (chapter 4); Q35 adds the orange theme, a heating rod, mains wires L/N/E,
   a fuse, a plug and simple appliance icons. */
LW({ id: 'g9_power', cat: 35, name: 'القدرة الكهربائية', fx: '<i>P</i> = ' + FR('<i>E</i>', '<i>t</i>') + ' ، <i>P</i> = <i>I</i> × <i>V</i> ، <i>P</i> = ' + FR('<i>V</i><sup>2</sup>', '<i>R</i>'), sym: 'القدرة الكهربائية المستهلكة في الجهاز: مقدار الطاقة التي يستهلكها (أو يستثمرها) الجهاز الكهربائي في وحدة الزمن، وتقاس بالواط (W = J/s). تعتمد على التيار المنساب في الجهاز وفرق الجهد بين طرفيه: P = I × V. الواط = أمبير × فولط.', calc: { in: [['I', 'التيار I', 'A', 2.5], ['V', 'فرق الجهد V', 'V', 220]], out: 'القدرة P', u: 'W', f: v => v.I * v.V } });
LW({ id: 'g9_energy', cat: 35, name: 'الطاقة الكهربائية المستهلكة', fx: '<i>E</i> = <i>P</i> × <i>t</i> ، الطاقة (J) = القدرة (W) × الزمن (s)', sym: 'الطاقة الكهربائية المستثمرة (المستهلكة) من قبل أي جهاز خلال فترة زمنية تساوي القدرة الكهربائية مضروبة في الزمن. تقيسها وزارة الكهرباء بالمقياس المنصوب في كل منزل بوحدة الكيلو واط–ساعة (kW-h).', calc: { in: [['P', 'القدرة P', 'W', 1500], ['t', 'الزمن t', 's', 1200]], out: 'الطاقة E', u: 'J', f: v => v.P * v.t } });
LW({ id: 'g9_cost', cat: 35, name: 'كلفة الطاقة الكهربائية', fx: 'الكلفة = القدرة (kW) × الزمن (h) × ثمن الوحدة (دينار / kW-h)', sym: 'يمكن حساب الثمن الذي ندفعه بعد استعمال جهاز لفترة زمنية معينة إذا عرفنا ثمن الوحدة الكهربائية (kW-h): كلفة الطاقة المستثمرة = الطاقة (kW-h) × ثمن الوحدة.', calc: { in: [['P', 'القدرة', 'kW', 1], ['t', 'الزمن', 'h', .5], ['u', 'ثمن الوحدة', 'دينار', 100]], out: 'الكلفة', u: 'دينار', f: v => v.P * v.t * v.u } });

const Q35 = Object.assign(Object.create(Q34), {
  card(ctx, S, L, o) { return Q31.card(ctx, S, L, Object.assign({ bd: '#ea580c' }, o || {})); },
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#c2410c', y); },
  chips(S, id, list, y, cur, click, o = {}) { return Q33.chips(S, id, list, y, cur, click, Object.assign({ col: '#c2410c' }, o)); },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#fff7ed'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  /* glowing heating rod (horizontal) from x1 to x2 */
  rod(ctx, x1, x2, y, b) { K.raw(ctx, () => { ctx.save(); if (b > .02) { ctx.shadowColor = 'rgba(249,115,22,' + (.9 * b) + ')'; ctx.shadowBlur = 22 * b; } const g = ctx.createLinearGradient(0, y - 7, 0, y + 7); g.addColorStop(0, b > .02 ? '#fed7aa' : '#d1d5db'); g.addColorStop(.5, b > .02 ? '#f97316' : '#9ca3af'); g.addColorStop(1, b > .02 ? '#c2410c' : '#4b5563'); ctx.fillStyle = g; rr(ctx, x1, y - 7, x2 - x1, 14, 7); ctx.fill(); ctx.restore(); ctx.strokeStyle = b > .02 ? '#7c2d12' : '#374151'; ctx.lineWidth = 1.2; for (let x = x1 + 6; x < x2 - 4; x += 7) { ctx.beginPath(); ctx.moveTo(x, y - 6); ctx.lineTo(x + 3, y + 6); ctx.stroke(); } }); },
  /* mains wire colours */
  LC: { L: '#92400e', N: '#2563eb', E: '#16a34a' },
  /* fuse cartridge centred (x,y); blown → broken wire */
  fuse(ctx, x, y, A, blown, o = {}) { const w = o.w || 56; K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(241,245,249,.95)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; rr(ctx, x - w / 2, y - 10, w, 20, 9); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#9ca3af'; ctx.fillRect(x - w / 2 - 6, y - 8, 8, 16); ctx.fillRect(x + w / 2 - 2, y - 8, 8, 16); ctx.strokeStyle = blown ? '#57534e' : '#b45309'; ctx.lineWidth = 2; ctx.beginPath(); if (blown) { ctx.moveTo(x - w / 2 + 2, y); ctx.lineTo(x - 6, y + 3); ctx.moveTo(x + 6, y - 3); ctx.lineTo(x + w / 2 - 2, y); } else { ctx.moveTo(x - w / 2 + 2, y); ctx.lineTo(x + w / 2 - 2, y); } ctx.stroke(); if (blown) { ctx.fillStyle = 'rgba(15,23,42,.25)'; ctx.beginPath(); ctx.arc(x, y, 7, 0, TAU); ctx.fill(); } ctx.restore(); }); Q33.T(ctx, (o.lab || 'الفاصم') + ' ' + A + ' A', x, y - 22, { s: 10.5, w: 900, c: blown ? '#b91c1c' : '#334155' }); if (blown) Q33.T(ctx, 'انصهر!', x, y + 22, { s: 10.5, w: 900, c: '#fff', bg: '#b91c1c' }); return { a: [x - w / 2 - 6, y], b: [x + w / 2 + 6, y] }; },
  /* earth symbol below (x,y) */
  earth(ctx, x, y) { K.raw(ctx, () => { ctx.strokeStyle = '#166534'; ctx.lineWidth = 2.5; [22, 14, 6].forEach((l, i) => { ctx.beginPath(); ctx.moveTo(x - l, y + i * 6); ctx.lineTo(x + l, y + i * 6); ctx.stroke(); }); }); },
  /* person (simple figure) standing on ground at (x, yg); hand at returned point */
  person(ctx, x, yg, o = {}) { const c = o.shock ? '#dc2626' : '#334155'; K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.fillStyle = o.shock ? '#fecaca' : '#fde68a'; ctx.beginPath(); ctx.arc(x, yg - 112, 14, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, yg - 98); ctx.lineTo(x, yg - 48); ctx.moveTo(x, yg - 48); ctx.lineTo(x - 14, yg); ctx.moveTo(x, yg - 48); ctx.lineTo(x + 14, yg); ctx.moveTo(x, yg - 86); ctx.lineTo(x + (o.reach ? -42 : -20), yg - (o.reach ? 82 : 60)); ctx.moveTo(x, yg - 86); ctx.lineTo(x + 20, yg - 60); ctx.stroke(); if (o.shock) { ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2.5; for (let k = 0; k < 4; k++) { const a = k * 1.6 + (o.t || 0) * 9; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 24, yg - 112 + Math.sin(a) * 24); ctx.lineTo(x + Math.cos(a) * 34, yg - 112 + Math.sin(a) * 34); ctx.stroke(); } } ctx.restore(); }); return { hand: [x + (o.reach ? -42 : -20), yg - (o.reach ? 82 : 60)], feet: [x, yg] }; }
});

/* =============== A1 — القدرة الكهربائية: مصباح 20 W ومصباح 100 W (ص 95، الشكل 1) =============== */
(() => {
  const PW = [20, 40, 60, 100];
  const D = { id: 'g9_p_bulbs', page: 95, fig: 'الشكل 1',
    desc: 'لماذا يعطي المصباح ذو القدرة 100 W إضاءة أكبر من المصباح المماثل ذي القدرة 20 W؟ عند تشغيل أي جهاز كهربائي فإنه يستهلك مقداراً معيناً من الطاقة الكهربائية ويحولها إلى نوع آخر (حركية في المحركات، حرارية في المدافئ، ضوئية في المصابيح). القدرة الكهربائية المستهلكة في الجهاز: مقدار الطاقة التي يستهلكها الجهاز في وحدة الزمن، القدرة = الطاقة ÷ الزمن، وتقاس بالواط (W = J/s). المصباح 20 W يستهلك في 1 s طاقة 20 J، والمصباح 100 W يستهلك 100 J فتكون إضاءته أكبر.',
    tags: 'القدرة الكهربائية واط جول ثانية مصباح 20 W مصباح 100 W الطاقة الزمن P = E / t إضاءة',
    tools: ['مصباح 20 W', 'مصباح 100 W', 'ساعة توقيت'],
    steps: ['اضغط «▶ ابدأ» وراقب عداد الطاقة لكل مصباح: كم جولاً يستهلك كل منهما في الثانية؟', 'اضغط على أي مصباح لتغيير قدرته (20، 40، 60، 100 W).', 'سجّل القراءات وارسم الطاقة مع الزمن: الميل يساوي القدرة.'],
    concl: ['القدرة = الطاقة ÷ الزمن ، وحدتها الواط W = J/s.', 'المصباح 100 W يستهلك 100 J كل ثانية فإضاءته أكبر من المصباح 20 W.', 'الجهاز يحول الطاقة الكهربائية إلى نوع آخر من الطاقة.'],
    laws: ['g9_power'],
    controls: [],
    setup(S) { S.a = 20; S.b = 100; S.run = 0; S.tt = 0; },
    update(S, dt) { if (S.run) S.tt = Math.min(S.tt + dt, 600); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 420, w - 320), ly = ph ? 230 : 260; return { w, h, ph, L, x0, x1, ly, xa: x0 + (x1 - x0) * .25, xb: x0 + (x1 - x0) * .75 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5; Q35.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.ly - 130, g.x1 - g.x0 + 28, g.ph ? 360 : 400);
      [[g.xa, S.a], [g.xb, S.b]].forEach(([x, P]) => { const b = Q33.bulb(ctx, x, g.ly, .15 + 1.15 * P / 100, { s: g.ph ? 1.1 : 1.5, label: '' }); void b;
        Q33.T(ctx, P + ' W', x, g.ly + 30, { s: 16, w: 900, c: '#fff', bg: '#c2410c' }); const E = P * S.tt;
        const jh = g.ph ? 90 : 120, jy = g.ly + (g.ph ? 70 : 80), f = clamp(E / (100 * 60), 0, 1);
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; rr(ctx, x - 34, jy, 68, jh, 8); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#f59e0b'; rr(ctx, x - 30, jy + jh - 4 - (jh - 8) * f, 60, (jh - 8) * f, 6); ctx.fill(); });
        Q33.T(ctx, 'E = ' + Q33.f(E, 0) + ' J', x, jy + jh + 16, { s: 13, w: 900, c: '#0f172a', bg: '#fde68a' });
        Q33.T(ctx, 'كل ثانية: ' + P + ' J', x, jy + jh + 42, { s: fs, w: 900, c: '#c2410c' }); });
      Q33.T(ctx, '⏱ t = ' + S.tt.toFixed(1) + ' s', (g.x0 + g.x1) / 2, g.ly - 104, { s: 15, w: 900, c: '#fff', bg: '#1e293b' });
      if (!g.ph) Q35.card(ctx, S, [{ t: 'القدرة = الطاقة ÷ الزمن', c: '#c2410c', w: 900, s: 14 }, { t: 'P = E / t', c: '#0f172a', w: 900 }, { t: 'الواط = جول ÷ ثانية', c: '#0f172a' }, { t: 'المصباح ' + S.b + ' W يستهلك ' + S.b + ' J في كل ثانية، والمصباح ' + S.a + ' W يستهلك ' + S.a + ' J فقط.', c: '#334155' }], { title: 'ماذا تعني هذه الأرقام؟', wd: 280, y: 70 });
      Q33.drawChips(ctx, D.chips(S, g)); Q35.banner(ctx, w, 'اضغط «ابدأ» وراقب الطاقة، واضغط على مصباح لتغيير قدرته');
    },
    chips(S, g) { return Q35.chips(S, 'run', [['go', S.run ? '⏸ إيقاف' : '▶ ابدأ'], ['rs', '↺ تصفير']], g.h - 84, S.run ? 'go' : '', (S2, k) => { if (k === 'go') S2.run = !S2.run; else { S2.run = 0; S2.tt = 0; } }, { bw: 150, col: '#15803d' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), cyc = v => PW[(PW.indexOf(v) + 1) % PW.length];
      return [{ id: 'la', x: g.xa, y: g.ly - 40, w: 80, h: 100, tip: 'اضغط لتغيير قدرة المصباح', idle: 'اضغط على المصباح ✋', click: S2 => { S2.a = cyc(S2.a); } }, { id: 'lb', x: g.xb, y: g.ly - 40, w: 80, h: 100, tip: 'اضغط لتغيير قدرة المصباح', click: S2 => { S2.b = cyc(S2.b); } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('الزمن', S.tt.toFixed(1) + ' s'), rd('المصباح الأول', S.a + ' W ⟸ ' + Q33.f(S.a * S.tt, 0) + ' J'), rd('المصباح الثاني', S.b + ' W ⟸ ' + Q33.f(S.b * S.tt, 0) + ' J')]; },
    record(S) { return { t: +S.tt.toFixed(1), Ea: Math.round(S.a * S.tt), Eb: Math.round(S.b * S.tt) }; },
    cols: [['t', 't (s)'], ['Ea', 'E المصباح الأول (J)'], ['Eb', 'E المصباح الثاني (J)']],
    graph: { x: 't', y: 'Eb', xl: 'الزمن t (s)', yl: 'الطاقة E (J)' },
    explain(S) { return Q26.ex('المصباح ' + Math.max(S.a, S.b) + ' W أكثر إضاءة ويملأ عداد الطاقة أسرع.', 'القدرة هي مقدار الطاقة المستهلكة في وحدة الزمن: P = E / t. المصباح 100 W يحول 100 J من الطاقة الكهربائية في كل ثانية، والمصباح 20 W يحول 20 J فقط، لذا تكون إضاءة الأول أكبر.', 'الطاقة الكهربائية = القدرة × الزمن.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — نشاط: حساب القدرة الكهربائية بالأميتر والفولطميتر (ص 96–97، الشكل 2) =============== */
(() => {
  const RL = 14.4;
  const D = { id: 'g9_p_meter', page: 97, fig: 'الشكل 2',
    desc: 'القدرة الكهربائية لجهاز تعتمد على مقدار التيار المنساب فيه وفرق الجهد بين طرفيه: P = I × V. إذا كان التيار 1 A وفرق الجهد 1 V تكون القدرة 1 W (1 Watt = 1 Ampere × 1 Volt). نشاط: مصباح يعمل بفولطية 6 V وقدرة 2.5 W، بطارية 6 V، فولطميتر، أميتر، مفتاح، أسلاك. نربط الدائرة كما في الشكل 2، نغلق المفتاح ونسجل قراءة الأميتر (تيار الدائرة) ثم قراءة الفولطميتر (فرق الجهد على المصباح)، ونحسب القدرة P = I × V.',
    tags: 'نشاط حساب القدرة الكهربائية P = I × V أميتر فولطميتر مصباح 6 V 2.5 W واط أمبير فولط',
    tools: ['مصباح 6 V / 2.5 W', 'بطارية 6 V', 'فولطميتر', 'أميتر', 'مفتاح كهربائي', 'أسلاك توصيل'],
    steps: ['اضغط على المفتاح لغلق الدائرة، وسجّل قراءة الأميتر ثم قراءة الفولطميتر.', 'احسب القدرة P = I × V وقارنها بالمكتوب على المصباح 2.5 W.', 'غيّر فولطية البطارية وسجّل: كيف تتغير القدرة والتوهج؟'],
    concl: ['القدرة = التيار × فرق الجهد: P = I × V.', '1 W = 1 A × 1 V.', 'المصباح يعطي قدرته المقررة 2.5 W عند تشغيله بفولطيته المقررة 6 V.'],
    laws: ['g9_power'],
    controls: [],
    setup(S) { S.V = 6; S.on = 0; S.fp = 0; },
    I(S) { return S.on ? S.V / RL : 0; },
    update(S, dt) { Q33.adv(S, dt, D.I(S) * 2.2, 60); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 400, w - 320), yt = ph ? 170 : 200, yb = ph ? 400 : Math.min(h - 220, 450); return { w, h, ph, L, x0, x1, yt, yb, cx: (x0 + x1) / 2 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, I = D.I(S), P = I * S.V;
      Q35.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.yt - 80, g.x1 - g.x0 + 28, g.yb - g.yt + 170);
      const bt = Q33.bat(ctx, g.cx, g.yb + 24, { V: S.V, w: 84, h: 60 }), sw = Q33.sw(ctx, g.x0 + 40, g.x0 + 96, g.yt, S.on);
      const am = Q33.meter(ctx, g.x1 - 70, g.yt - 6, 'A', I, 1, { name: 'الأميتر', d: 3, w: 84, h: 62 }), lb = Q33.bulb(ctx, g.cx, g.yt + 70, I ? (P / 2.5) * .9 : 0, { label: '6 V / 2.5 W' });
      const W1 = [bt.p, [bt.p[0], g.yb - 40], [g.x1 - 10, g.yb - 40], [g.x1 - 10, am.p[1] + 40], [am.p[0], am.p[1] + 40], am.p], W2 = [am.n, [am.n[0], g.yt + 70], lb.b], W3 = [lb.a, [g.x0 + 10, g.yt + 70], [g.x0 + 10, g.yt], sw.a], W4 = [sw.b, [g.x0 + 130, g.yt], [g.x0 + 130, g.yb - 20], [bt.n[0], g.yb - 20], bt.n];
      [W1, W2, W3, W4].forEach(p => { Q33.wire(ctx, p, { col: '#475569' }); if (I) Q33.flow(ctx, p, S.fp, 'c'); });
      const vm = Q33.meter(ctx, g.cx, g.yt + 170, 'V', S.on ? S.V : 0, 10, { name: 'الفولطميتر', d: 1, w: 84, h: 62 });
      Q33.wire(ctx, [vm.p, [lb.b[0] + 26, vm.p[1]], [lb.b[0] + 26, lb.b[1]]], { col: '#f97316' }); Q33.wire(ctx, [vm.n, [lb.a[0] - 26, vm.n[1]], [lb.a[0] - 26, lb.a[1]]], { col: '#334155' });
      Q33.T(ctx, S.on ? 'P = I × V = ' + Q33.f(I, 3) + ' A × ' + S.V + ' V = ' + Q33.f(P, 2) + ' W' : 'اضغط على المفتاح لغلق الدائرة', g.cx, g.yt - 56, { s: fs + 1.5, w: 900, c: '#fff', bg: S.on ? '#c2410c' : '#64748b', maxW: g.x1 - g.x0 });
      if (!g.ph) Q35.card(ctx, S, [{ t: 'القدرة = التيار × فرق الجهد', c: '#c2410c', w: 900 }, { t: 'P = I × V', c: '#0f172a', w: 900, s: 14 }, { t: '1 Watt = 1 Ampere × 1 Volt', c: '#0f172a' }, { t: 'الأميتر على التوالي، والفولطميتر على التوازي مع المصباح.', c: '#334155' }], { title: 'تذكّر', wd: 280, y: 70 });
      Q33.drawChips(ctx, D.chips(S, g)); Q35.banner(ctx, w, 'نشاط: أغلق المفتاح، اقرأ الأميتر والفولطميتر، واحسب القدرة');
    },
    chips(S, g) { return Q35.chips(S, 'V', [['2', 'بطارية 2 V'], ['4', 'بطارية 4 V'], ['6', 'بطارية 6 V']], g.h - 84, String(S.V), (S2, k) => { S2.V = +k; }, { bw: 150 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'sw', x: g.x0 + 68, y: g.yt, w: 90, h: 44, tip: 'اضغط لفتح/إغلاق المفتاح', idle: 'اضغط على المفتاح ✋', click: S2 => { S2.on = S2.on ? 0 : 1; } }].concat(D.chips(S, g)); },
    readings(S) { const I = D.I(S); return [rd('قراءة الأميتر I', Q33.f(I, 3) + ' A'), rd('قراءة الفولطميتر V', (S.on ? S.V : 0) + ' V'), rd('القدرة P = I × V', Q33.f(I * S.V, 2) + ' W')]; },
    record(S) { const I = D.I(S); return { V: S.on ? S.V : 0, I: +I.toFixed(3), P: +(I * S.V).toFixed(2) }; },
    cols: [['V', 'V (V)'], ['I', 'I (A)'], ['P', 'P (W)']],
    graph: { x: 'V', y: 'P', xl: 'فرق الجهد V (V)', yl: 'القدرة P (W)' },
    explain(S) { const I = D.I(S); return Q26.ex(S.on ? 'القدرة المستثمرة في المصباح ' + Q33.f(I * S.V, 2) + ' W.' : 'المصباح منطفئ.', 'القدرة المستثمرة = قراءة الأميتر × قراءة الفولطميتر. عند 6 V يمر تيار ≈ 0.42 A فتكون القدرة ≈ 2.5 W كما هو مكتوب على المصباح؛ وعند فولطية أصغر يقل التيار والقدرة والتوهج.', ''); }
  };
  M8.P[D.id] = D;
})();

/* =============== A3 — مثال المدفأة الكهربائية: P = V²/R و I = V/R (ص 97) =============== */
(() => {
  const V = 220;
  const D = { id: 'g9_p_heater', page: 97, fig: 'مثال ص 97',
    desc: 'مدفأة كهربائية سلطت عليها فولطية 220 V، ومقاومة أحد أسلاك التسخين الثلاثة 88 Ω. احسب: 1) القدرة المستهلكة في أحد أسلاك التسخين: P = V²/R = (220)²/88 = 550 W. 2) التيار المنساب في أحد أسلاك التسخين: I = V/R = 220/88 = 2.5 A. أسلاك التسخين مربوطة على التوازي فكل سلك يعمل بفولطية 220 V.',
    tags: 'مثال المدفأة الكهربائية 220 V 88 Ω أسلاك التسخين القدرة P = V² / R التيار I = V / R 550 W 2.5 A توازي',
    tools: ['مدفأة كهربائية بثلاثة أسلاك تسخين', 'مصدر 220 V'],
    steps: ['اضغط على أسلاك التسخين لتشغيلها واحداً بعد الآخر.', 'لاحظ قدرة كل سلك وتياره، والقدرة والتيار الكلي.', 'اضغط «مثال ص 97» ثم «الخطوة التالية» لحل المثال.'],
    concl: ['P = V² / R = 550 W لكل سلك.', 'I = V / R = 2.5 A لكل سلك.', 'تشغيل سلك إضافي (على التوازي) يزيد القدرة الكلية والتيار الكلي.'],
    laws: ['g9_power'],
    controls: [R('R', 'مقاومة سلك التسخين R', 44, 176, 88, 4, 'Ω')],
    setup(S) { S.on = [1, 0, 0]; S.ex = ''; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 400, w - 400), cy = ph ? 300 : 320; return { w, h, ph, L, x0, x1, cy, cx: (x0 + x1) / 2 }; },
    ry(g, i) { return g.cy - 70 + i * 70; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, R2 = S.p.R, P1 = V * V / R2, I1 = V / R2, n = S.on.filter(Boolean).length, rx1 = g.cx - (g.ph ? 100 : 130), rx2 = g.cx + (g.ph ? 100 : 130);
      Q35.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 14; ctx.fillStyle = '#e5e7eb'; rr(ctx, rx1 - 40, g.cy - 120, rx2 - rx1 + 80, 250, 18); ctx.fill(); ctx.restore(); ctx.fillStyle = n ? 'rgba(254,215,170,.6)' : '#d1d5db'; rr(ctx, rx1 - 24, g.cy - 104, rx2 - rx1 + 48, 218, 12); ctx.fill(); ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 2; for (let x = rx1 - 20; x < rx2 + 20; x += 14) { ctx.beginPath(); ctx.moveTo(x, g.cy - 104); ctx.lineTo(x, g.cy + 114); ctx.stroke(); } });
      for (let i = 0; i < 3; i++) { Q35.rod(ctx, rx1, rx2, D.ry(g, i), S.on[i] ? 1 : 0); Q33.T(ctx, (S.on[i] ? 'P = ' + Q33.f(P1, 0) + ' W ، I = ' + Q33.f(I1, 2) + ' A' : 'مطفأ — R = ' + R2 + ' Ω'), g.cx, D.ry(g, i) + 20, { s: fs - .5, w: 900, c: '#fff', bg: S.on[i] ? '#c2410c' : '#64748b' }); }
      Q33.T(ctx, 'الأسلاك على التوازي: فرق الجهد على كل سلك 220 V', g.cx, g.cy - 140, { s: fs + .5, w: 900, c: '#fff', bg: '#334155' });
      Q33.T(ctx, 'P_total = ' + n + ' × ' + Q33.f(P1, 0) + ' = ' + Q33.f(n * P1, 0) + ' W', g.cx, g.cy + 160, { s: fs + 1.5, w: 900, c: '#0f172a', bg: '#fde68a' });
      Q33.T(ctx, 'I_total = ' + n + ' × ' + Q33.f(I1, 2) + ' = ' + Q33.f(n * I1, 2) + ' A', g.cx, g.cy + 192, { s: fs + 1, w: 900, c: '#c2410c' });
      if (S.ex) Q33.steps(ctx, S, { title: 'مثال ص 97', q: 'مدفأة 220 V، مقاومة أحد أسلاك التسخين 88 Ω. احسب القدرة والتيار في سلك واحد.', lines: ['P = V² / R', 'P = 220² / 88 = 48400 / 88', 'P = 550 W', 'I = V / R = 220 / 88', 'I = 2.5 A'], k: S.k }, { wd: 330, y: g.ph ? g.cy + 220 : 70 });
      else if (!g.ph) Q35.card(ctx, S, [{ t: 'P = I × V', c: '#0f172a', w: 900 }, { t: 'I = V / R', c: '#0f172a', w: 900 }, { t: 'إذن P = V² / R', c: '#c2410c', w: 900, s: 14 }, { t: 'كلما صغرت مقاومة السلك عند الفولطية نفسها زادت قدرته.', c: '#334155' }], { title: 'علاقات القدرة', wd: 300, y: 70 });
      Q33.drawChips(ctx, D.chips(S, g)); Q35.banner(ctx, w, 'اضغط على أسلاك التسخين لتشغيلها، أو اختر المثال');
    },
    chips(S, g) { return Q35.chips(S, 'ex', [['ex', 'مثال ص 97'], ['nx', '⬇ الخطوة التالية'], ['all', 'تشغيل الثلاثة']], g.h - 84, S.ex, (S2, k) => { if (k === 'all') { S2.on = [1, 1, 1]; return; } if (k === 'nx') { if (!S2.ex) { S2.ex = 'ex'; setParam(S2, 'R', 88); } else S2.k = Math.min(S2.k + 1, 5); return; } S2.ex = S2.ex ? '' : 'ex'; S2.k = 0; setParam(S2, 'R', 88); }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = []; for (let i = 0; i < 3; i++) L.push({ id: 'rod' + i, x: g.cx, y: D.ry(g, i), w: (g.ph ? 200 : 260), h: 30, tip: 'اضغط لتشغيل/إطفاء سلك التسخين', idle: 'اضغط على السلك ✋', hint: i ? false : undefined, click: S2 => { const O = S2.on.slice(); O[i] = O[i] ? 0 : 1; S2.on = O; S2.ok = O.join(''); } }); return L.concat(D.chips(S, g)); },
    readings(S) { const R2 = S.p.R, n = S.on.filter(Boolean).length; return [rd('مقاومة السلك', R2 + ' Ω'), rd('قدرة السلك P = V²/R', Q33.f(V * V / R2, 0) + ' W'), rd('تيار السلك I = V/R', Q33.f(V / R2, 2) + ' A'), rd('الأسلاك العاملة', n), rd('القدرة الكلية', Q33.f(n * V * V / R2, 0) + ' W')]; },
    record(S) { return { R: S.p.R, P: Math.round(V * V / S.p.R) }; },
    cols: [['R', 'R (Ω)'], ['P', 'P لسلك واحد (W)']],
    graph: { x: 'R', y: 'P', xl: 'مقاومة السلك R (Ω)', yl: 'القدرة P (W)' },
    explain(S) { return Q26.ex('كل سلك تسخين يستهلك ' + Q33.f(V * V / S.p.R, 0) + ' W.', 'أسلاك التسخين على التوازي، لذا يعمل كل سلك بفولطية 220 V كاملة: P = V² / R و I = V / R. عند R = 88 Ω تكون P = 550 W و I = 2.5 A.', 'المدافئ تحول الطاقة الكهربائية إلى حرارية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A4 — نشاط: القدرة والفولطية لأجهزة منزلية وحساب التيار I = P/V (ص 98–99) =============== */
(() => {
  const AP = [['heat', '🔥', 'مدفئة زيتية', 1600], ['iron', '👕', 'مكواة', 1000], ['wash', '🧺', 'غسالة', 500], ['lamp', '💡', 'مصباح', 100], ['vac', '🌀', 'مفرغة هواء', 200]], V = 220;
  const D = { id: 'g9_p_home', page: 98, fig: 'الشكل 3 والجدول',
    desc: 'للقدرة الكهربائية تطبيقات كثيرة في حياتنا اليومية في المنازل والمصانع والمحال التجارية والمستشفيات لغرض الإضاءة والتدفئة والتبريد وتشغيل الأجهزة. نشاط: من البيانات الموضحة على الأجهزة المنزلية (الفولطية والقدرة) احسب مقدار التيار الذي يحتاجه كل جهاز عند اشتغاله I = P/V ثم احسب مقدار التيار الكلي. الأجهزة الكهربائية في المنازل توصل مع بعضها على التوازي.',
    tags: 'نشاط الأجهزة المنزلية القدرة الفولطية التيار I = P / V مدفئة مكواة غسالة مصباح مفرغة هواء التيار الكلي توازي 220 V',
    tools: ['مدفئة زيتية 1600 W', 'مكواة 1000 W', 'غسالة 500 W', 'مصباح 100 W', 'مفرغة هواء 200 W'],
    steps: ['اضغط على كل جهاز لتشغيله: يُحسب تياره I = P / V في الجدول.', 'لاحظ أن الأجهزة على التوازي فكل منها يعمل بفولطية 220 V.', 'شغّل جميع الأجهزة واحسب التيار الكلي = مجموع التيارات.'],
    concl: ['تيار الجهاز I = P / V.', 'الأجهزة المنزلية على التوازي: التيار الكلي = مجموع تيارات الأجهزة.', 'كلما زادت قدرة الجهاز زاد التيار الذي يحتاجه.'],
    laws: ['g9_power'],
    controls: [],
    setup(S) { S.on = { heat: 1, lamp: 1 }; S.fp = 0; },
    It(S) { return AP.reduce((s, a) => s + (S.on[a[0]] ? a[3] / V : 0), 0); },
    update(S, dt) { Q33.adv(S, dt, D.It(S) * .2, 60); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : w - 24, yL = ph ? 120 : 110, yN = yL + 30, ay = ph ? 230 : 250, ty = ph ? 360 : 400; return { w, h, ph, L, x0, x1, yL, yN, ay, ty, sp: (x1 - x0 - 80) / AP.length }; },
    ax(g, i) { return g.x0 + 80 + g.sp * (i + .5); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 9.5 : 11.5, It = D.It(S);
      Q35.bg(ctx, w, h);
      Q33.wire(ctx, [[g.x0 + 60, g.yL], [g.x1 - 10, g.yL]], { col: Q35.LC.L }); Q33.wire(ctx, [[g.x0 + 60, g.yN], [g.x1 - 10, g.yN]], { col: Q35.LC.N });
      Q33.T(ctx, 'L', g.x0 + 44, g.yL, { s: 13, w: 900, c: Q35.LC.L }); Q33.T(ctx, 'N', g.x0 + 44, g.yN, { s: 13, w: 900, c: Q35.LC.N }); Q33.T(ctx, '220 V', g.x0 + 30, (g.yL + g.yN) / 2 + 30, { s: 10.5, w: 900, c: '#334155' });
      if (It > 0) { Q33.flow(ctx, [[g.x0 + 60, g.yL], [g.x1 - 10, g.yL]], S.fp, 'c'); Q33.flow(ctx, [[g.x1 - 10, g.yN], [g.x0 + 60, g.yN]], S.fp, 'c'); }
      AP.forEach((a, i) => { const x = D.ax(g, i), on = S.on[a[0]];
        Q33.wire(ctx, [[x - 8, g.yL], [x - 8, g.ay - 34]], { col: Q35.LC.L }); Q33.wire(ctx, [[x + 8, g.yN], [x + 8, g.ay - 34]], { col: Q35.LC.N });
        K.raw(ctx, () => { ctx.fillStyle = on ? '#fff7ed' : '#f1f5f9'; ctx.strokeStyle = on ? '#ea580c' : '#94a3b8'; ctx.lineWidth = on ? 3 : 1.5; rr(ctx, x - g.sp / 2 + 6, g.ay - 34, g.sp - 12, 92, 12); ctx.fill(); ctx.stroke(); });
        Q33.T(ctx, a[1], x, g.ay + 2, { s: g.ph ? 24 : 32 }); if (on) Q33.T(ctx, '⚡', x + (g.ph ? 18 : 26), g.ay - 18, { s: 14 });
        Q33.T(ctx, a[2], x, g.ay + 40, { s: fs, w: 900, c: on ? '#c2410c' : '#475569', maxW: g.sp - 14 }); });
      // table
      const tx0 = g.x0 + 10, tw = g.x1 - g.x0 - 20, rh = g.ph ? 24 : 28, cols = [['الجهاز', .3], ['القدرة P', .22], ['الفولطية V', .22], ['التيار I', .26]];
      const row = (y, cells, head, hl) => { K.raw(ctx, () => { ctx.fillStyle = head ? '#c2410c' : hl ? '#ffedd5' : '#fff'; ctx.fillRect(tx0, y, tw, rh); ctx.strokeStyle = '#e2e8f0'; ctx.strokeRect(tx0, y, tw, rh); });
        let xr = tx0 + tw; cells.forEach((c, j) => { const cw = tw * cols[j][1]; Q33.T(ctx, c, xr - cw / 2, y + rh / 2, { s: fs, w: head ? 900 : 800, c: head ? '#fff' : '#0f172a' }); xr -= cw; }); };
      row(g.ty, cols.map(c => c[0]), 1);
      AP.forEach((a, i) => { const on = S.on[a[0]]; row(g.ty + rh * (i + 1), [a[2], a[3] + ' W', V + ' V', on ? Q33.f(a[3] / V, 2) + ' A' : '— اضغط الجهاز'], 0, on); });
      Q33.T(ctx, 'التيار الكلي = ' + Q33.f(It, 2) + ' A — القدرة الكلية = ' + AP.reduce((s, a) => s + (S.on[a[0]] ? a[3] : 0), 0) + ' W', (g.x0 + g.x1) / 2, g.ty + rh * 6 + 22, { s: fs + 1.5, w: 900, c: '#fff', bg: '#c2410c', maxW: tw });
      Q33.drawChips(ctx, D.chips(S, g)); Q35.banner(ctx, w, 'نشاط: اضغط على الأجهزة لتشغيلها واحسب تيار كل جهاز');
    },
    chips(S, g) { return Q35.chips(S, 'al', [['all', 'تشغيل الجميع'], ['none', 'إطفاء الجميع']], g.h - 84, '', (S2, k) => { const O = {}; if (k === 'all') AP.forEach(a => { O[a[0]] = 1; }); S2.on = O; }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return AP.map((a, i) => ({ id: 'ap_' + a[0], x: D.ax(g, i), y: g.ay + 12, w: g.sp - 12, h: 92, tip: 'اضغط لتشغيل/إطفاء ' + a[2], idle: 'اضغط على جهاز ✋', hint: i ? false : undefined, click: S2 => { const O = Object.assign({}, S2.on); O[a[0]] = O[a[0]] ? 0 : 1; S2.on = O; } })).concat(D.chips(S, g)); },
    readings(S) { return AP.filter(a => S.on[a[0]]).map(a => rd(a[2], a[3] + ' W ⟸ ' + Q33.f(a[3] / V, 2) + ' A')).concat([rd('التيار الكلي', Q33.f(D.It(S), 2) + ' A')]); },
    explain(S) { return Q26.ex('التيار الكلي ' + Q33.f(D.It(S), 2) + ' A.', 'كل جهاز يأخذ تياراً I = P / V، والأجهزة على التوازي فتجمع تياراتها: المدفئة 1600 W تحتاج 7.27 A بينما المصباح 100 W يحتاج 0.45 A فقط.', 'تشغيل أجهزة كثيرة عالية القدرة في وقت واحد يزيد التيار الكلي وقد ينصهر الفاصم.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A5 — توهج المصابيح المتماثلة: أمثلة ص 99–100 وسؤال 60 W و 30 W =============== */
(() => {
  const Rb = 4;
  const D = { id: 'g9_p_glow', page: 99, fig: 'أمثلة ص 99–100 والشكل 4',
    desc: 'مثال: المصابيح (a, b, c) متماثلة، والمصباح (c) أكثر سطوعاً لزيادة عدد الأعمدة في دائرته أي زيادة فرق الجهد عبره فيزداد التيار، والقدرة المتحولة فيه هي الأكبر P = V²/R. مثال: المصابيح المتماثلة (d, e, f): المصباح (d) هو الأكثر سطوعاً أما (e, f) فأقل توهجاً بسبب زيادة عدد المصابيح في الدائرة وزيادة المقاومة المكافئة ونقصان التيار. تذكّر: التيار المنساب في خويط المصباح هو الذي يؤثر في مقدار توهجه، ويتأثر بفرق الجهد وبعدد المصابيح وطريقة ربطها. سؤال: مصباحان 60 W و 30 W على التوازي: املأ الفراغ بـ < أو = أو >.',
    tags: 'توهج المصابيح المتماثلة سطوع عدد الأعمدة فرق الجهد التيار P = V² / R مثال ص 99 مثال ص 100 مصباح 60 W 30 W توازي',
    tools: ['مصابيح متماثلة', 'أعمدة كهربائية 1.5 V', 'مصباحان 60 W و 30 W'],
    steps: ['اختر «a, b, c»: أي مصباح أكثر توهجاً؟ ولماذا؟', 'اختر «d, e, f»: قارن توهج d مع e و f.', 'اختر «سؤال 60 W و 30 W»: اضغط على كل فراغ لتختار < أو = أو > ثم اضغط «تحقق».'],
    concl: ['زيادة عدد الأعمدة تزيد فرق الجهد والتيار فيزداد التوهج والقدرة.', 'زيادة عدد المصابيح على التوالي تزيد المقاومة المكافئة فيقل التيار والتوهج.', 'على التوازي: فرق الجهد متساوٍ، والمصباح ذو القدرة الأكبر مقاومته أصغر وتياره أكبر وإضاءته أكبر.'],
    laws: ['g9_power'],
    controls: [],
    setup(S) { S.md = 'abc'; S.ans = ['', '', '', '']; S.chk = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 0 : 20), x1 = ph ? w - 12 : w - 20, y0 = ph ? 110 : 110; return { w, h, ph, L, x0, x1, y0 }; },
    mini(ctx, x, y, w, h, cells, lamps, lab) {
      const X0 = x + 18, X1 = x + w - 18, Y0 = y + 34, Y1 = y + h - 40, n = lamps.length, V = cells * 1.5, I = V / (Rb * n), P = I * I * Rb;
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5; rr(ctx, x, y, w, h, 12); ctx.fill(); ctx.stroke(); });
      Q33.sym.path(ctx, [[X0, Y0], [X1, Y0], [X1, Y1], [X0, Y1], [X0, Y0]]);
      for (let k = 0; k < cells; k++) Q33.sym.cell(ctx, (X0 + X1) / 2 + (k - (cells - 1) / 2) * 26, Y0, false, '');
      for (let k = 0; k < n; k++) { const xx = X0 + (X1 - X0) * (k + 1) / (n + 1); Q33.sym.lamp(ctx, xx, Y1, Math.sqrt(P / 2.25), ''); Q33.T(ctx, lamps[k], xx, Y1 + 22, { s: 12, w: 900, c: '#334155' }); }
      Q33.T(ctx, cells + ' × 1.5 V' + (n > 1 ? ' — ' + n + ' مصابيح' : ''), (X0 + X1) / 2, Y0 - 20, { s: 10.5, w: 900, c: '#475569' });
      Q33.T(ctx, Q33.glow(Math.sqrt(P / 2.25)), (X0 + X1) / 2, (Y0 + Y1) / 2 - 12, { s: 12, w: 900, c: '#fff', bg: P > 2 ? '#c2410c' : P > .4 ? '#f59e0b' : '#64748b' }); Q33.T(ctx, 'P = ' + Q33.f(P, 2) + ' W', (X0 + X1) / 2, (Y0 + Y1) / 2 + 14, { s: 11, w: 900, c: '#0f172a' });
      return P; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5; Q35.bg(ctx, w, h);
      if (S.md === 'abc' || S.md === 'def') { const L = S.md === 'abc' ? [[1, ['a']], [2, ['b']], [3, ['c']]] : [[1, ['d']], [1, ['e', 'f']]]; const n = L.length, cw = g.ph ? g.x1 - g.x0 : (g.x1 - g.x0 - (n - 1) * 16) / n, ch = g.ph ? 150 : 200;
        L.forEach((q, i) => { const x = g.ph ? g.x0 : g.x0 + i * (cw + 16), y = g.ph ? g.y0 + i * (ch + 12) : g.y0 + 40; D.mini(ctx, x, y, cw, ch, q[0], q[1]); });
        const ans = S.md === 'abc' ? 'المصباح c الأكثر سطوعاً: عدد أعمدة أكبر ⟸ فرق جهد وتيار أكبر ⟸ قدرة أكبر' : 'المصباح d الأكثر سطوعاً: e و f على التوالي ⟸ مقاومة مكافئة أكبر وتيار أقل';
        if (!g.ph) Q33.T(ctx, ans, (g.x0 + g.x1) / 2, g.y0 + ch + 80, { s: fs + 1, w: 900, c: '#fff', bg: '#c2410c', maxW: g.x1 - g.x0 });
        if (!g.ph) Q35.card(ctx, S, [{ t: 'التيار في خويط المصباح هو الذي يحدد توهجه.', c: '#0f172a', w: 800 }, { t: 'تيار الدائرة يتأثر بـ: 1. فرق الجهد بين طرفي الدائرة. 2. عدد المصابيح وطريقة ربطها.', c: '#334155' }], { title: 'تذكّر', wd: 330, x: g.x1, y: g.y0 + ch + 110 }); }
      else { const cx = g.ph ? g.w / 2 : g.x0 + 150, y = g.y0 + 60;
        Q33.T(ctx, '60 W', cx, y, { s: 13, w: 900, c: '#fff', bg: '#c2410c' }); Q33.bulb(ctx, cx, y + 100, 1, { s: 1.2 }); Q33.T(ctx, '30 W', cx, y + 140, { s: 13, w: 900, c: '#fff', bg: '#f59e0b' }); Q33.bulb(ctx, cx, y + 240, .45, { s: 1.2 });
        Q33.sym.path(ctx, [[cx - 22, y + 100], [cx - 70, y + 100], [cx - 70, y + 300], [cx + 70, y + 300], [cx + 70, y + 100], [cx + 22, y + 100]]); Q33.sym.path(ctx, [[cx - 22, y + 240], [cx - 70, y + 240]]); Q33.sym.path(ctx, [[cx + 22, y + 240], [cx + 70, y + 240]]);
        for (let k = 0; k < 3; k++) Q33.sym.cell(ctx, cx - 26 + k * 26, y + 300, false, ''); Q33.T(ctx, 'الشكل 4', cx, y + 330, { s: 10.5, w: 900, c: '#475569' });
        const Q = D.Q(), tx = g.ph ? g.x0 : g.x0 + 300; Q.forEach((q, i) => { const yy = (g.ph ? y + 360 : y) + i * (g.ph ? 46 : 58), ok = S.chk && S.ans[i] === q[1], bad = S.chk && S.ans[i] !== q[1];
          Q33.T(ctx, (i + 1) + '. ' + q[0][0], g.x1 - 6, yy, { s: fs + .5, w: 800, c: '#0f172a', a: 'right' });
          const bx = g.ph ? tx + 30 : tx + 40; K.raw(ctx, () => { ctx.fillStyle = ok ? '#dcfce7' : bad ? '#fee2e2' : '#fff7ed'; ctx.strokeStyle = ok ? '#15803d' : bad ? '#b91c1c' : '#ea580c'; ctx.lineWidth = 2; rr(ctx, bx - 22, yy + 10, 44, 30, 8); ctx.fill(); ctx.stroke(); });
          Q33.T(ctx, S.ans[i] || '؟', bx, yy + 25, { s: 17, w: 900, c: '#0f172a' }); Q33.T(ctx, q[0][1], g.x1 - 6, yy + 25, { s: fs + .5, w: 800, c: '#334155', a: 'right' }); });
        if (S.chk) { const all = Q.every((q, i) => S.ans[i] === q[1]); Q33.T(ctx, all ? '✔ أحسنت! المصباح 60 W مقاومته أصغر فيمر فيه تيار أكبر وإضاءته أكبر، وفرق الجهد متساوٍ لأنهما على التوازي.' : 'الإجابات الحمراء خطأ — تذكّر: R = V² / P', (g.x0 + g.x1) / 2, g.h - 160, { s: fs + .5, w: 900, c: '#fff', bg: all ? '#15803d' : '#b91c1c', maxW: g.x1 - g.x0 }); } }
      Q33.drawChips(ctx, D.chips(S, g)); Q35.banner(ctx, w, S.md === 'q4' ? 'اضغط على كل مربع لاختيار < أو = أو > ثم «تحقق»' : 'قارن توهج المصابيح المتماثلة');
    },
    Q() { return [[['مقاومة المصباح الأول 60 W', 'مقاومة المصباح الثاني 30 W'], '<'], [['التيار في المصباح الأول', 'التيار في المصباح الثاني'], '>'], [['إضاءة المصباح الأول', 'إضاءة المصباح الثاني'], '>'], [['فرق الجهد على المصباح الأول', 'فرق الجهد على المصباح الثاني'], '=']]; },
    chips(S, g) { const L = [['abc', 'مثال a, b, c'], ['def', 'مثال d, e, f'], ['q4', 'سؤال 60 W و 30 W']]; if (S.md === 'q4') L.push(['chk', '✔ تحقق']); return Q35.chips(S, 'md', L, g.h - 84, S.md, (S2, k) => { if (k === 'chk') S2.chk = 1; else { S2.md = k; S2.chk = 0; } }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = []; if (S.md === 'q4') { const tx = g.ph ? g.x0 : g.x0 + 300, y = g.y0 + 60; for (let i = 0; i < 4; i++) { const yy = (g.ph ? y + 360 : y) + i * (g.ph ? 46 : 58), bx = g.ph ? tx + 30 : tx + 40; L.push({ id: 'blank' + i, x: bx, y: yy + 25, w: 48, h: 34, tip: 'اضغط لاختيار < أو = أو >', idle: 'اضغط ✋', hint: i ? false : undefined, click: S2 => { const A = S2.ans.slice(), O = ['<', '=', '>']; A[i] = O[(O.indexOf(A[i]) + 1) % 3]; S2.ans = A; S2.ak = A.join(''); S2.chk = 0; } }); } } return L.concat(D.chips(S, g)); },
    readings(S) { return [rd('الحالة', S.md === 'abc' ? 'مثال a, b, c' : S.md === 'def' ? 'مثال d, e, f' : 'سؤال 60 W و 30 W')]; },
    explain(S) { if (S.md === 'q4') return Q26.ex('المصباحان على التوازي.', 'فرق الجهد متساوٍ عليهما. R = V² / P: المصباح 60 W مقاومته أصغر من مقاومة 30 W، فيمر فيه تيار أكبر وإضاءته أكبر.', ''); return Q26.ex(S.md === 'abc' ? 'المصباح c أكثر سطوعاً.' : 'المصباح d أكثر سطوعاً.', S.md === 'abc' ? 'زيادة عدد الأعمدة تزيد فرق الجهد عبر المصباح فيزداد التيار، والقدرة المتحولة P = V² / R تكون الأكبر في c.' : 'المصباحان e و f على التوالي فتزداد المقاومة المكافئة ويقل التيار فيقل توهجهما، أما d فوحده مع العمود فيتحول فيه أكبر قدرة.', ''); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — الطاقة الكهربائية E = P × t ومقياس الطاقة المنزلي (ص 101–102، الشكل 5) =============== */
(() => {
  const DV = { dry: ['💨', 'مجفف شعر', 1500], ket: ['🫖', 'إبريق شاي', 2200], vac: ['🌀', 'مكنسة كهربائية', 1000], heat: ['🔥', 'سخان', 2000] };
  const EX = {
    e1: { t: 'مثال ص 101', d: 'dry', ts: 1200, q: 'مجفف شعر قدرته 1500 W استعمل 20 دقيقة. احسب الطاقة المستثمرة.', lines: ['t = 20 × 60 = 1200 s', 'E = P × t', 'E = 1500 W × 1200 s = 1800000 J', 'E = 1800 kJ'] },
    e2: { t: 'مثال ص 102', d: 'ket', ts: 20, q: 'إبريق شاي يعمل على 220 V ويمر فيه 10 A. احسب قدرته والطاقة خلال 20 s.', lines: ['P = I × V = 10 × 220', 'P = 2200 W', 'E = P × t = 2200 × 20', 'E = 44000 J = 44 kJ'] }
  };
  const D = { id: 'g9_e_energy', page: 101, fig: 'الشكل 5',
    desc: 'تزودنا وزارة الكهرباء بالطاقة الكهربائية اللازمة لتشغيل الأجهزة، وتنصب مقياساً كهربائياً في كل منزل لتسجيل مقدار الطاقة المستهلكة فيه ونستلم شهرياً قائمة بثمنها. الطاقة الكهربائية المستثمرة (المستهلكة) من قبل أي جهاز خلال فترة زمنية: E (J) = P (W) × t (s). فكّر: علامَ يعتمد مقدار الطاقة المستهلكة؟ على قدرة الجهاز وزمن تشغيله.',
    tags: 'الطاقة الكهربائية E = P × t جول مقياس الطاقة المنزلي مجفف شعر إبريق شاي مثال ص 101 مثال ص 102 kJ',
    tools: ['أجهزة منزلية', 'مقياس الطاقة الكهربائية المنزلي', 'ساعة توقيت'],
    steps: ['اختر جهازاً وغيّر زمن التشغيل t من لوحة التحكم: لاحظ قرص المقياس يدور وعداد الطاقة يزداد.', 'قارن الأجهزة: أيها يُدير القرص أسرع؟', 'اختر مثالاً واضغط «الخطوة التالية» لحله خطوة خطوة.'],
    concl: ['E = P × t ، وحدتها الجول.', 'الطاقة المستهلكة تعتمد على قدرة الجهاز وزمن تشغيله.', 'مقياس الطاقة المنزلي يسجل الطاقة المستهلكة بوحدة kW-h.'],
    laws: ['g9_energy', 'g9_power'],
    controls: [R('t', 'زمن التشغيل t', 0, 3600, 1200, 10, 's')],
    setup(S) { S.d = 'dry'; S.ex = ''; S.k = 0; S.ang = 0; },
    update(S, dt) { S.ang += dt * DV[S.d][2] / 400; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 380, w - 400), cy = ph ? 260 : 290; return { w, h, ph, L, x0, x1, cy, cx: (x0 + x1) / 2 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, d = DV[S.d], E = d[2] * S.p.t, mx = g.ph ? g.cx + 70 : g.cx + 90;
      Q35.bg(ctx, w, h);
      Q33.T(ctx, d[0], g.ph ? g.cx - 90 : g.cx - 120, g.cy - 20, { s: g.ph ? 52 : 70 }); Q33.T(ctx, d[1] + ' — ' + d[2] + ' W', g.ph ? g.cx - 90 : g.cx - 120, g.cy + 40, { s: fs + 1, w: 900, c: '#fff', bg: '#c2410c' });
      // meter
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 12; ctx.fillStyle = '#e5e7eb'; rr(ctx, mx - 70, g.cy - 110, 140, 200, 14); ctx.fill(); ctx.restore(); ctx.fillStyle = '#0f172a'; rr(ctx, mx - 52, g.cy - 90, 104, 30, 5); ctx.fill(); ctx.fillStyle = 'rgba(203,213,225,.6)'; ctx.beginPath(); ctx.ellipse(mx, g.cy + 10, 50, 14, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.ellipse(mx, g.cy + 10, 46, 9, 0, 0, TAU); ctx.fill(); const a = S.ang % TAU; ctx.fillStyle = '#dc2626'; ctx.fillRect(mx + Math.cos(a) * 40 - 4, g.cy + 6, 8, 8); });
      Q33.T(ctx, (E / 3.6e6).toFixed(3) + ' kW-h', mx, g.cy - 75, { s: 14, w: 900, c: '#4ade80', mono: 1 }); Q33.T(ctx, 'مقياس الطاقة', mx, g.cy + 60, { s: 10.5, w: 900, c: '#334155' });
      Q33.T(ctx, 'E = P × t = ' + d[2] + ' W × ' + S.p.t + ' s', g.cx, g.cy + 120, { s: fs + 1.5, w: 900, c: '#0f172a', bg: '#fde68a' });
      Q33.T(ctx, 'E = ' + Q33.f(E, 0) + ' J = ' + Q33.f(E / 1000, 1) + ' kJ', g.cx, g.cy + 156, { s: fs + 2, w: 900, c: '#fff', bg: '#c2410c' });
      if (S.ex) { const X = EX[S.ex]; Q33.steps(ctx, S, { title: X.t, q: X.q, lines: X.lines, k: S.k }, { wd: 350, y: g.ph ? g.cy + 190 : 70 }); }
      else if (!g.ph) Q35.card(ctx, S, [{ t: 'الطاقة الكهربائية المستثمرة = القدرة × الزمن', c: '#c2410c', w: 900 }, { t: 'E (J) = P (W) × t (s)', c: '#0f172a', w: 900 }, { t: 'فكّر: علامَ يعتمد مقدار الطاقة المستهلكة؟ على قدرة الجهاز وزمن تشغيله.', c: '#334155' }], { title: 'حساب الطاقة', wd: 330, y: 70 });
      Q33.drawChips(ctx, D.chipsE(S, g)); Q33.drawChips(ctx, D.chipsD(S, g)); Q35.banner(ctx, w, 'اختر جهازاً وغيّر زمن التشغيل، أو اختر مثالاً');
    },
    chipsD(S, g) { return Q35.chips(S, 'd', Object.keys(DV).map(k => [k, DV[k][0] + ' ' + DV[k][1]]), g.h - 128, S.d, (S2, k) => { S2.d = k; }, { bw: 160, bh: 30, col: '#0f766e' }); },
    chipsE(S, g) { return Q35.chips(S, 'ex', Object.keys(EX).map(k => [k, EX[k].t]).concat([['nx', '⬇ الخطوة التالية']]), g.h - 84, S.ex, (S2, k) => { if (k === 'nx') { if (!S2.ex) { S2.ex = 'e1'; S2.d = 'dry'; setParam(S2, 't', 1200); } else S2.k = Math.min(S2.k + 1, EX[S2.ex].lines.length); return; } S2.ex = k; S2.k = 0; S2.d = EX[k].d; setParam(S2, 't', EX[k].ts); }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return D.chipsE(S, g).concat(D.chipsD(S, g)); },
    readings(S) { const d = DV[S.d], E = d[2] * S.p.t; return [rd('الجهاز', d[1]), rd('القدرة P', d[2] + ' W'), rd('الزمن t', S.p.t + ' s'), rd('الطاقة E', Q33.f(E / 1000, 1) + ' kJ'), rd('بالكيلو واط–ساعة', (E / 3.6e6).toFixed(3) + ' kW-h')]; },
    record(S) { const d = DV[S.d]; return { t: S.p.t, E: Math.round(d[2] * S.p.t / 1000) }; },
    cols: [['t', 't (s)'], ['E', 'E (kJ)']],
    graph: { x: 't', y: 'E', xl: 'الزمن t (s)', yl: 'الطاقة E (kJ)' },
    explain(S) { const d = DV[S.d]; return Q26.ex('يستهلك ' + d[1] + ' طاقة ' + Q33.f(d[2] * S.p.t / 1000, 1) + ' kJ.', 'الطاقة المستهلكة = القدرة × الزمن، فتزداد بزيادة قدرة الجهاز أو زمن تشغيله. قرص المقياس يدور أسرع مع الأجهزة الأكبر قدرة.', 'المقياس المنزلي يسجل الطاقة بالكيلو واط–ساعة: 1 kW-h = 3600000 J.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — كلفة الطاقة الكهربائية بالدينار (ص 102–103 + مسائل ص 110) =============== */
(() => {
  const EX = {
    e1: { t: 'مثال ص 103', P: 1000, h: .5, u: 100, q: 'مكنسة كهربائية قدرتها 1000 W استعملت 30 دقيقة، وثمن الوحدة 100 دينار لكل kW-h. ما المبلغ؟', lines: ['P = 1000 ÷ 1000 = 1 kW', 't = 30 min = 0.5 h', 'الكلفة = 1 × 0.5 × 100', 'الكلفة = 50 دينار'] },
    s3: { t: 'س3 مسائل ص110', P: 24, h: 10, u: 100, q: 'مصباح 24 W يعمل 10 ساعات. احسب الطاقة المستهلكة بالكيلو واط–ساعة.', lines: ['P = 24 ÷ 1000 = 0.024 kW', 'E = P × t = 0.024 × 10', 'E = 0.24 kW-h'] },
    s4: { t: 'س4 مسائل ص110', P: 2000, h: 6, u: 100, q: 'سخان قدرته 2 kW شغل 6 ساعات، وثمن kW-h الواحد 100 دينار. ما الكلفة؟', lines: ['E = 2 kW × 6 h = 12 kW-h', 'الكلفة = 12 × 100', 'الكلفة = 1200 دينار'] }
  };
  const D = { id: 'g9_e_cost', page: 102, fig: 'مثال ص 103',
    desc: 'يمكننا حساب الثمن الذي ندفعه بعد استعمال جهاز لفترة زمنية معينة إذا عرفنا ثمن الوحدة الكهربائية (kW-h): كلفة الطاقة الكهربائية المستثمرة = الطاقة الكهربائية (kW-h) × ثمن الوحدة بالدينار لكل kW-h. وبما أن الطاقة = القدرة × الزمن، فإن: الكلفة = القدرة (kW) × الزمن (h) × ثمن الوحدة. ترشيد استهلاك الطاقة الكهربائية يعني الاستخدام الأمثل لمواردها: استغلال الإضاءة الطبيعية وتقليل الإنارة نهاراً وأجهزة التبريد والتدفئة في الغرف غير المستعملة واستعمال المصابيح الاقتصادية.',
    tags: 'كلفة الطاقة الكهربائية دينار كيلو واط ساعة kW-h ثمن الوحدة مكنسة كهربائية مثال ص 103 مسائل ص 110 ترشيد استهلاك',
    tools: ['قائمة الكهرباء الشهرية', 'أجهزة منزلية'],
    steps: ['غيّر القدرة والزمن وثمن الوحدة من لوحة التحكم: لاحظ الطاقة بالـ kW-h والكلفة.', 'اختر مثالاً واضغط «الخطوة التالية» لحله.', 'فكّر في الترشيد: كيف نقلل الكلفة؟'],
    concl: ['الكلفة = القدرة (kW) × الزمن (h) × ثمن الوحدة.', 'نحول القدرة إلى kW (÷ 1000) والزمن إلى ساعات.', 'الترشيد يقلل الطاقة المستهلكة والكلفة.'],
    laws: ['g9_cost', 'g9_energy'],
    controls: [R('P', 'القدرة P', 0, 3000, 1000, 10, 'W'), R('h', 'الزمن t', 0, 12, .5, .5, 'h'), R('u', 'ثمن الوحدة', 0, 200, 100, 10, 'دينار/kW-h')],
    setup(S) { S.ex = ''; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 380, w - 400), cy = ph ? 230 : 250; return { w, h, ph, L, x0, x1, cy, cx: (x0 + x1) / 2 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, kW = S.p.P / 1000, E = kW * S.p.h, C = E * S.p.u;
      Q35.bg(ctx, w, h);
      // bill
      const bw = g.ph ? g.x1 - g.x0 : 320, bx = g.cx - bw / 2, by = g.cy - 130;
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 12; ctx.fillStyle = '#fff'; rr(ctx, bx, by, bw, 270, 10); ctx.fill(); ctx.restore(); ctx.fillStyle = '#c2410c'; rr(ctx, bx, by, bw, 40, 10); ctx.fill(); ctx.strokeStyle = '#e2e8f0'; ctx.setLineDash([5, 4]); for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(bx + 14, by + 40 + i * 48); ctx.lineTo(bx + bw - 14, by + 40 + i * 48); ctx.stroke(); } ctx.setLineDash([]); });
      Q33.T(ctx, '🧾 قائمة الكهرباء', g.cx, by + 20, { s: 14, w: 900, c: '#fff' });
      [['القدرة', Q33.f(S.p.P, 0) + ' W = ' + Q33.f(kW, 3) + ' kW'], ['الزمن', Q33.f(S.p.h, 1) + ' h'], ['الطاقة', Q33.f(kW, 3) + ' × ' + Q33.f(S.p.h, 1) + ' = ' + Q33.f(E, 3) + ' kW-h'], ['ثمن الوحدة', S.p.u + ' دينار / kW-h']].forEach((r2, i) => { const y = by + 64 + i * 48; Q33.T(ctx, r2[0], bx + bw - 16, y, { s: fs, w: 900, c: '#c2410c', a: 'right' }); Q33.T(ctx, r2[1], bx + 16, y, { s: fs, w: 800, c: '#0f172a', a: 'left' }); });
      Q33.T(ctx, 'الكلفة = ' + Q33.f(E, 3) + ' × ' + S.p.u + ' = ' + Q33.f(C, 1) + ' دينار', g.cx, by + 248, { s: fs + 2, w: 900, c: '#fff', bg: '#15803d', maxW: bw - 10 });
      // coin stack
      const n = Math.min(24, Math.round(C / 50)); for (let k = 0; k < n; k++) K.raw(ctx, () => { const x = bx + bw + (g.ph ? -30 : 50) + (k % 2) * 4, y = by + 250 - k * 9; ctx.fillStyle = '#facc15'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(x, y, 22, 7, 0, 0, TAU); ctx.fill(); ctx.stroke(); });
      if (!g.ph && n) Q33.T(ctx, 'كل قطعة = 50 دينار', bx + bw + 52, by + 278, { s: 10, w: 900, c: '#a16207' });
      if (S.ex) { const X = EX[S.ex]; Q33.steps(ctx, S, { title: X.t, q: X.q, lines: X.lines, k: S.k }, { wd: 350, y: g.ph ? by + 290 : 70 }); }
      else if (!g.ph) Q35.card(ctx, S, [{ t: 'الكلفة = القدرة × الزمن × ثمن الوحدة', c: '#c2410c', w: 900 }, { t: 'kW × h × دينار / kW-h', c: '#0f172a', w: 900 }, { t: 'الترشيد: استغل الإضاءة الطبيعية، أطفئ الإنارة نهاراً وأجهزة التبريد والتدفئة في الغرف غير المستعملة، واستعمل المصابيح الاقتصادية.', c: '#15803d' }], { title: 'كلفة الطاقة والترشيد', wd: 330, y: 70 });
      Q33.drawChips(ctx, D.chips(S, g)); Q35.banner(ctx, w, 'غيّر القدرة والزمن وثمن الوحدة، أو اختر مثالاً');
    },
    chips(S, g) { return Q35.chips(S, 'ex', Object.keys(EX).map(k => [k, EX[k].t]).concat([['nx', '⬇ الخطوة التالية']]), g.h - 84, S.ex, (S2, k) => { const set = X => { setParam(S2, 'P', X.P); setParam(S2, 'h', X.h); setParam(S2, 'u', X.u); }; if (k === 'nx') { if (!S2.ex) { S2.ex = 'e1'; set(EX.e1); } else S2.k = Math.min(S2.k + 1, EX[S2.ex].lines.length); return; } S2.ex = k; S2.k = 0; set(EX[k]); }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; return D.chips(S, D.geo(S)); },
    readings(S) { const E = S.p.P / 1000 * S.p.h; return [rd('القدرة', S.p.P / 1000 + ' kW'), rd('الزمن', S.p.h + ' h'), rd('الطاقة', Q33.f(E, 3) + ' kW-h'), rd('الكلفة', Q33.f(E * S.p.u, 1) + ' دينار')]; },
    record(S) { const E = S.p.P / 1000 * S.p.h; return { h: S.p.h, E: +E.toFixed(3), C: +(E * S.p.u).toFixed(1) }; },
    cols: [['h', 't (h)'], ['E', 'E (kW-h)'], ['C', 'الكلفة (دينار)']],
    graph: { x: 'h', y: 'C', xl: 'الزمن (h)', yl: 'الكلفة (دينار)' },
    explain(S) { const E = S.p.P / 1000 * S.p.h; return Q26.ex('الكلفة ' + Q33.f(E * S.p.u, 1) + ' دينار.', 'نحول القدرة إلى كيلو واط والزمن إلى ساعات فنحصل على الطاقة بوحدة kW-h، ثم نضربها في ثمن الوحدة.', 'ترشيد الاستهلاك يقلل القائمة الشهرية ويحافظ على موارد الطاقة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — الكهرباء في بيوتنا: السلك الحي والمتعادل والفاصم وقاطع الدورة (ص 103–105، الأشكال 6–10) =============== */
(() => {
  const AP = { lamp: ['💡', 'مصباح', 100], iron: ['👕', 'مكواة', 1000], ket: ['🫖', 'إبريق شاي', 2200], heat: ['🔥', 'مدفأة', 3000] }, FU = [3, 5, 13];
  const D = { id: 'g9_h_wiring', page: 103, fig: 'الأشكال 6 إلى 10',
    desc: 'تزودنا مؤسسات إنتاج الطاقة بالطاقة عن طريق سلكين يمر فيهما تيار متناوب فرق الجهد بينهما 220 V: السلك الحي (الحار) L جهده 220 V، والسلك المتعادل (البارد) N يحمل التيار أيضاً لكنه مؤرض عند محطة القدرة. السلك المؤرض E متصل بالأرض للسلامة. القابس ذو الفاصم يتركب من L و N و E والفاصم. الفاصم سلك فلزي لا يتحمل تياراً يزيد عن حد معين فينصهر وينقطع التيار، ويجب أن يوضع على التوالي مع السلك الحي قبل دخول التيار في الجهاز. قاطع الدورة يقطع التيار تلقائياً عند انسياب تيار أكبر من المصمم له.',
    tags: 'الكهرباء في بيوتنا السلك الحي L السلك المتعادل N السلك المؤرض E القابس الفاصم قاطع الدورة 220 V تيار متناوب انصهار',
    tools: ['قابس ذو فاصم', 'فواصم 3 A و 5 A و 13 A', 'قاطع دورة', 'أجهزة منزلية'],
    steps: ['اختر جهازاً ثم فاصماً: هل يتحمل الفاصم تيار الجهاز I = P / V؟', 'انقل الفاصم إلى السلك المتعادل N وانصهره: هل يبقى الجهاز متصلاً بالجهد العالي؟', 'استبدل الفاصم بقاطع الدورة: عند التيار الزائد ينفصل، اضغط عليه لإعادته.'],
    concl: ['الفاصم يربط على التوالي مع السلك الحي قبل الجهاز.', 'إذا وضع في السلك المتعادل وانصهر يبقى الجهاز متصلاً بالسلك الحي فيبقى خطراً.', 'قاطع الدورة يقطع التيار تلقائياً عند التيار الزائد ويمكن إعادته.'],
    laws: ['g9_power'],
    controls: [],
    setup(S) { S.ap = 'iron'; S.fu = 13; S.pos = 'L'; S.br = 0; S.blown = 0; S.on = 1; S.fp = 0; S.t2 = 0; },
    I(S) { return AP[S.ap][2] / 220; },
    flowing(S) { return S.on && !S.blown; },
    update(S, dt) { const I = D.I(S), lim = S.br ? 16 : S.fu; if (S.on && !S.blown && I > lim) { S.t2 += dt; if (S.t2 > .6) { S.blown = 1; S.t2 = 0; } } else S.t2 = 0; Q33.adv(S, dt, D.flowing(S) ? I * .25 : 0, 60); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 420, w - 320), yL = ph ? 170 : 200, yN = ph ? 330 : 380, yE = ph ? 400 : 460; return { w, h, ph, L, x0, x1, yL, yN, yE }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, I = D.I(S), fl = D.flowing(S), ax = g.x1 - (g.ph ? 60 : 80), fx = g.x0 + (g.x1 - g.x0) * .45, lim = S.br ? 16 : S.fu;
      Q35.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.yL - 90, g.x1 - g.x0 + 28, g.yE - g.yL + 150);
      // supply
      K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, g.x0, g.yL - 30, 60, g.yN - g.yL + 60, 10); ctx.fill(); });
      Q33.T(ctx, '220 V', g.x0 + 30, (g.yL + g.yN) / 2, { s: 12, w: 900, c: '#fde68a' }); Q33.T(ctx, 'L', g.x0 + 74, g.yL - 14, { s: 13, w: 900, c: Q35.LC.L }); Q33.T(ctx, 'N', g.x0 + 74, g.yN - 14, { s: 13, w: 900, c: Q35.LC.N }); Q33.T(ctx, 'E', g.x0 + 74, g.yE - 14, { s: 13, w: 900, c: Q35.LC.E });
      // device box
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 10; ctx.fillStyle = fl ? '#fff7ed' : '#f1f5f9'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; rr(ctx, ax - 54, g.yL - 20, 108, g.yN - g.yL + 40, 14); ctx.fill(); ctx.stroke(); ctx.restore(); });
      Q33.T(ctx, AP[S.ap][0], ax, (g.yL + g.yN) / 2 - 10, { s: g.ph ? 32 : 44 }); Q33.T(ctx, AP[S.ap][1] + ' ' + AP[S.ap][2] + ' W', ax, (g.yL + g.yN) / 2 + 36, { s: fs, w: 900, c: fl ? '#c2410c' : '#475569' }); if (fl) Q33.T(ctx, '⚡ يعمل', ax, g.yL + 4, { s: 10.5, w: 900, c: '#15803d' });
      // wires L and N with fuse/breaker
      const fy = S.pos === 'L' ? g.yL : g.yN; let F;
      if (S.br) { K.raw(ctx, () => { ctx.fillStyle = S.blown ? '#fee2e2' : '#e0f2fe'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; rr(ctx, fx - 34, fy - 22, 68, 44, 8); ctx.fill(); ctx.stroke(); ctx.fillStyle = S.blown ? '#dc2626' : '#16a34a'; rr(ctx, fx - 8, fy - (S.blown ? 18 : 2), 16, 20, 4); ctx.fill(); }); Q33.T(ctx, 'قاطع الدورة 16 A', fx, fy - 34, { s: 10.5, w: 900, c: '#334155' }); if (S.blown) Q33.T(ctx, 'فصل! اضغط لإعادته', fx, fy + 36, { s: 10.5, w: 900, c: '#fff', bg: '#b91c1c' }); F = { a: [fx - 34, fy], b: [fx + 34, fy] }; }
      else F = Q35.fuse(ctx, fx, fy, S.fu, S.blown);
      const Lw = S.pos === 'L' ? [[[g.x0 + 60, g.yL], F.a], [F.b, [ax - 54, g.yL]]] : [[[g.x0 + 60, g.yL], [ax - 54, g.yL]]], Nw = S.pos === 'N' ? [[[ax - 54, g.yN], F.b], [F.a, [g.x0 + 60, g.yN]]] : [[[ax - 54, g.yN], [g.x0 + 60, g.yN]]];
      Lw.forEach(p => Q33.wire(ctx, p, { col: Q35.LC.L })); Nw.forEach(p => Q33.wire(ctx, p, { col: Q35.LC.N }));
      Q33.wire(ctx, [[g.x0 + 60, g.yE], [ax, g.yE], [ax, g.yN + 20]], { col: Q35.LC.E }); Q35.earth(ctx, g.x0 + 90, g.yE + 8);
      if (fl) { Lw.concat(Nw).forEach(p => Q33.flow(ctx, p, S.fp, 'c')); }
      // live-device warning
      const danger = S.blown && S.pos === 'N';
      const msg = danger ? '⚠ انصهر الفاصم في N لكن الجهاز ما زال متصلاً بالسلك الحي: خطر!' : S.blown ? (S.br ? 'فصل قاطع الدورة: التيار أكبر من 16 A' : 'انصهر الفاصم: التيار أكبر من ' + S.fu + ' A') : (I > lim ? '⚠ التيار أكبر من حد الحماية ' + lim + ' A' : 'التيار ضمن حد الحماية ' + lim + ' A');
      Q33.T(ctx, 'I = P / V = ' + AP[S.ap][2] + ' / 220 = ' + Q33.f(I, 2) + ' A', (g.x0 + g.x1) / 2, g.yL - 34, { s: fs, w: 900, c: '#0f172a', bg: '#fde68a' });
      Q33.T(ctx, msg, (g.x0 + g.x1) / 2, g.yL - 66, { s: fs + .5, w: 900, c: '#fff', bg: danger || (I > lim) ? '#b91c1c' : S.blown ? '#c2410c' : '#15803d', maxW: g.x1 - g.x0 });
      if (danger) Q33.T(ctx, '220 V', ax - 54, g.yL + 22, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' });
      if (!g.ph) { Q35.card(ctx, S, [{ t: 'L السلك الحي (الحار): جهده 220 V', c: Q35.LC.L, w: 900 }, { t: 'N السلك المتعادل (البارد): مؤرض عند محطة القدرة', c: Q35.LC.N, w: 900 }, { t: 'E السلك المؤرض: سلك الأمان', c: Q35.LC.E, w: 900 }, { t: 'الفاصم على التوالي مع السلك الحي قبل دخول التيار في الجهاز.', c: '#0f172a' }], { title: 'القابس ذو الفاصم — الشكل 8', wd: 280, y: 70 }); }
      Q33.drawChips(ctx, D.chipsA(S, g)); Q33.drawChips(ctx, D.chipsF(S, g)); Q35.banner(ctx, w, 'اختر الجهاز والفاصم، واضغط على الفاصم لنقله بين L و N');
    },
    chipsA(S, g) { return Q35.chips(S, 'ap', Object.keys(AP).map(k => [k, AP[k][0] + ' ' + AP[k][1]]), g.h - 84, S.ap, (S2, k) => { S2.ap = k; }, { bw: 150 }); },
    chipsF(S, g) { return Q35.chips(S, 'fu', FU.map(a => [String(a), 'فاصم ' + a + ' A']).concat([['br', 'قاطع الدورة'], ['new', '↺ فاصم جديد']]), g.h - 128, S.br ? 'br' : String(S.fu), (S2, k) => { if (k === 'new') { S2.blown = 0; return; } if (k === 'br') { S2.br = 1; S2.blown = 0; return; } S2.br = 0; S2.fu = +k; S2.blown = 0; }, { bw: 130, bh: 30, col: '#0f766e' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), fx = g.x0 + (g.x1 - g.x0) * .45, fy = S.pos === 'L' ? g.yL : g.yN;
      return [{ id: 'fuse', x: fx, y: fy, w: 76, h: 44, tip: S.br ? 'اضغط لإعادة قاطع الدورة' : 'اضغط لنقل الفاصم إلى السلك الآخر', idle: 'اضغط على الفاصم ✋', click: S2 => { if (S2.br) { S2.blown = 0; return; } S2.pos = S2.pos === 'L' ? 'N' : 'L'; } }].concat(D.chipsA(S, g), D.chipsF(S, g)); },
    readings(S) { const I = D.I(S); return [rd('الجهاز', AP[S.ap][1] + ' ' + AP[S.ap][2] + ' W'), rd('التيار I = P/V', Q33.f(I, 2) + ' A'), rd('الحماية', S.br ? 'قاطع الدورة 16 A' : 'فاصم ' + S.fu + ' A في السلك ' + S.pos), rd('الحالة', S.blown ? (S.br ? 'فصل' : 'انصهر') : 'يعمل')]; },
    explain(S) { return Q26.ex(S.blown ? 'انقطع التيار عن الجهاز.' : 'يعمل الجهاز.', 'الفاصم سلك فلزي يسخن وينصهر إذا تجاوز التيار حداً معيناً. يوضع على التوالي مع السلك الحي حتى إذا انصهر انفصل الجهاز عن الجهد العالي؛ أما إذا وضع في السلك المتعادل فإن الجهاز يبقى متصلاً بالسلك الحي رغم توقفه فيبقى خطر الصعقة.', 'قاطع الدورة يربط على التوالي مع السلك الحار ويقطع التيار تلقائياً، ثم يعاد بالضغط عليه.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — الدوائر المؤرضة وتجنب الصعقة: الغسالة، القابس الثنائي والثلاثي، الطائر على السلك (ص 104–107، الأشكال 11–14) =============== */
(() => {
  const RB = 2000;
  const D = { id: 'g9_h_earth', page: 105, fig: 'الأشكال 11 إلى 14',
    desc: 'عملية التأريض تعني الاتصال بالأرض، وهي من وسائل الأمان. تؤرض الأجهزة ذات الغلاف المعدني لأن سلك التأريض غليظ مقاومته صغيرة جداً أقل من مقاومة جسم الإنسان، فينساب التيار فيه ولا ينساب في جسم الشخص الملامس للجهاز. إذا حدث خلل في غسالة موصولة بقابس ثنائي أدى إلى ملامسة السلك الحار لجسمها المعدني ولمسها شخص، يسري التيار من السلك الحي عبر الغسالة وجسم الشخص إلى الأرض فيصاب بصعقة شديدة وخطرة (الشكل 12-b). أما مع القابس الثلاثي الحاوي على سلك التأريض فلن يؤدي التماس إلى صعقة (الشكل 12-c). تيار 0.005 A يسبب ألماً بسيطاً، و 0.01 A يجعل العضلات تنقبض، و 0.1 A لثوانٍ قليلة قد يؤدي إلى الموت.',
    tags: 'الدوائر المؤرضة التأريض سلك التأريض الصعقة الكهربائية الغسالة القابس الثنائي القابس الثلاثي جسم الإنسان 0.1 A الطائر على السلك إجراءات السلامة',
    tools: ['غسالة بغلاف معدني', 'قابس ثنائي', 'قابس ثلاثي مع سلك التأريض'],
    steps: ['أحدث خللاً: السلك الحي يلامس الغلاف المعدني، ثم اضغط على الشخص ليلمس الغسالة.', 'قارن القابس الثنائي (الشكل 12-b) مع القابس الثلاثي المؤرض (الشكل 12-c).', 'اختر «الطائر على السلك» وفسّر لماذا لا يصاب بصعقة (س2-3 ص 109).'],
    concl: ['سلك التأريض مقاومته صغيرة جداً فيمر فيه التيار بدل جسم الإنسان.', 'تؤرض الأجهزة ذات الغلاف المعدني لتجنب الصعقة ولحمايتها.', 'الطائر على سلك واحد لا يصاب لأن قدميه بالجهد نفسه فلا يمر تيار في جسمه.'],
    laws: ['g9_power'],
    controls: [],
    setup(S) { S.md = 'wash'; S.fault = 0; S.pl = 2; S.touch = 0; S.blown = 0; S.fp = 0; S.bird = 'one'; },
    Ib(S) { if (S.md !== 'wash') return S.bird === 'gnd' ? 220 / RB : 0; if (!S.fault || S.blown) return 0; if (S.pl === 3) return 0; return S.touch ? 220 / RB : 0; },
    Ie(S) { return S.md === 'wash' && S.fault && S.pl === 3 && !S.blown ? 30 : 0; },
    update(S, dt) { if (S.Ie_t === undefined) S.Ie_t = 0; if (D.Ie(S) > 13) { S.Ie_t += dt; if (S.Ie_t > .8) { S.blown = 1; S.Ie_t = 0; } } else S.Ie_t = 0; Q33.adv(S, dt, (D.Ib(S) * 6 + D.Ie(S) * .05), 60); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 420, w - 320), yg = ph ? 470 : Math.min(h - 170, 540); return { w, h, ph, L, x0, x1, yg, cx: (x0 + x1) / 2 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, t = S.t || 0;
      Q35.bg(ctx, w, h); K.raw(ctx, () => { ctx.fillStyle = '#a16207'; ctx.fillRect(g.x0 - 10, g.yg, g.x1 - g.x0 + 20, 16); ctx.fillStyle = '#ca8a04'; ctx.fillRect(g.x0 - 10, g.yg, g.x1 - g.x0 + 20, 4); });
      Q33.T(ctx, 'الأرض', g.x0 + 30, g.yg + 30, { s: 10.5, w: 900, c: '#78350f' });
      if (S.md === 'wash') {
        const mx = g.cx + (g.ph ? 10 : 30), my = g.yg - 110, Ib = D.Ib(S), Ie = D.Ie(S), live = S.fault && !S.blown;
        // washing machine
        K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 10; ctx.fillStyle = live && S.pl === 2 ? '#fecaca' : '#e5e7eb'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; rr(ctx, mx - 70, my - 100, 140, 210, 14); ctx.fill(); ctx.stroke(); ctx.restore(); ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.arc(mx, my + 20, 48, 0, TAU); ctx.fill(); ctx.fillStyle = '#93c5fd'; ctx.beginPath(); ctx.arc(mx, my + 20, 36, 0, TAU); ctx.fill(); ctx.fillStyle = '#334155'; ctx.fillRect(mx - 60, my - 90, 120, 20); });
        Q33.T(ctx, 'غسالة — غلاف معدني', mx, my - 116, { s: 10.5, w: 900, c: '#334155' });
        // socket on wall at left
        const sx = g.x0 + 30, sy = my - 60; K.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; rr(ctx, sx - 24, sy - 34, 48, 68, 8); ctx.fill(); ctx.stroke(); });
        Q33.T(ctx, S.pl === 3 ? 'قابس ثلاثي' : 'قابس ثنائي', sx, sy + 48, { s: 10, w: 900, c: '#334155' });
        const LP = [[sx + 24, sy - 14], [mx - 70, sy - 14]], NP = [[sx + 24, sy + 4], [mx - 70, sy + 4]]; Q33.wire(ctx, LP, { col: Q35.LC.L }); Q33.wire(ctx, NP, { col: Q35.LC.N });
        if (S.pl === 3) { Q33.wire(ctx, [[sx + 24, sy + 22], [mx - 70, sy + 22]], { col: Q35.LC.E }); Q33.wire(ctx, [[sx, sy + 34], [sx, g.yg]], { col: Q35.LC.E }); if (Ie) Q33.flow(ctx, [[mx - 70, sy + 22], [sx + 24, sy + 22]], S.fp, 'c'); }
        if (S.fault) { K.raw(ctx, () => { ctx.strokeStyle = Q35.LC.L; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(mx - 70, sy - 14); ctx.lineTo(mx - 40, sy - 30); ctx.stroke(); }); Q33.T(ctx, '⚡ خلل: السلك الحي يلامس الغلاف', mx, sy - 44, { s: 10, w: 900, c: '#fff', bg: '#b91c1c' }); }
        // fuse indicator
        Q35.fuse(ctx, (sx + mx) / 2 - 20, sy - 14, 13, S.blown, { w: 40 });
        // person
        const px = mx + 140, P = Q35.person(ctx, px, g.yg, { reach: S.touch, shock: Ib > .01, t });
        if (Ib > .01) { const path = [[mx + 70, P.hand[1]], P.hand, [px, g.yg - 86], [px, g.yg - 48], P.feet]; Q33.flow(ctx, path, S.fp, 'c', { sp: 18 }); }
        Q33.T(ctx, S.touch ? 'يلمس الغسالة' : 'اضغط على الشخص', px, g.yg + 30, { s: 10, w: 900, c: '#334155' });
        const msg = !S.fault ? 'لا يوجد خلل: الغلاف المعدني آمن' : S.blown ? 'انصهر الفاصم بسبب التيار الكبير في سلك التأريض: لا صعقة' : S.pl === 3 ? 'سلك التأريض يمرر التيار إلى الأرض' : S.touch ? '⚠ صعقة شديدة: التيار يمر عبر جسم الشخص إلى الأرض' : 'الغلاف أصبح بجهد 220 V: لا تلمسه!';
        Q33.T(ctx, msg, (g.x0 + g.x1) / 2, g.ph ? 112 : 120, { s: fs + .5, w: 900, c: '#fff', bg: S.fault && !S.blown && S.pl === 2 ? '#b91c1c' : '#15803d', maxW: g.x1 - g.x0 });
        if (Ib > .01) Q33.T(ctx, 'تيار الجسم ≈ ' + Q33.f(Ib, 2) + ' A', px, g.yg - 150, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' });
      } else {
        // bird / person on high-voltage line
        const y = g.yg - 230; Q33.wire(ctx, [[g.x0, y], [g.x1, y]], { col: Q35.LC.L }); Q33.T(ctx, 'سلك ضغط عالٍ مكشوف', g.x1 - 90, y - 18, { s: 10.5, w: 900, c: Q35.LC.L }); Q33.flow(ctx, [[g.x0, y], [g.x1, y]], S.fp + t * 30, 'c');
        Q33.T(ctx, '🐦', g.cx - 60, y - 22, { s: 38 }); Q33.T(ctx, 'قدما الطائر على السلك نفسه: لا فرق جهد بينهما', g.cx - 60, y + 30, { s: fs, w: 900, c: '#fff', bg: '#15803d' });
        if (S.bird === 'gnd') { const P = Q35.person(ctx, g.cx + 120, g.yg, { reach: 1, shock: 1, t }); Q33.wire(ctx, [[P.hand[0], P.hand[1]], [P.hand[0], y]], { col: '#94a3b8' }); Q33.flow(ctx, [[P.hand[0], y], P.hand, [g.cx + 120, g.yg - 86], [g.cx + 120, g.yg]], S.fp, 'c', { sp: 18 }); Q33.T(ctx, '⚠ بين السلك الحي والأرض: يمر التيار في جسمه', g.cx + 60, g.yg - 170, { s: fs, w: 900, c: '#fff', bg: '#b91c1c', maxW: g.x1 - g.x0 }); }
        Q33.T(ctx, 'س2-3: الطائر لا يكمل دائرة بين نقطتين بينهما فرق جهد', (g.x0 + g.x1) / 2, g.ph ? 112 : 120, { s: fs, w: 900, c: '#fff', bg: '#334155', maxW: g.x1 - g.x0 });
      }
      if (!g.ph) { const Ib = D.Ib(S); Q35.card(ctx, S, [{ t: '0.005 A: ألم بسيط', c: Ib >= .005 && Ib < .01 ? '#b91c1c' : '#0f172a', w: 800 }, { t: '0.01 A: تنقبض العضلات', c: Ib >= .01 && Ib < .1 ? '#b91c1c' : '#0f172a', w: 800 }, { t: '0.1 A لثوانٍ قليلة: قد يؤدي إلى الموت', c: Ib >= .1 ? '#b91c1c' : '#0f172a', w: 900 }, { t: 'السلامة: افصل المصاب عن المصدر قبل لمسه، لا تضع جسماً معدنياً في نقطة الكهرباء، لا تترك الأسلاك مكشوفة، وتجنب أن يصل جسمك بين السلك الحي والمتعادل أو الأرض.', c: '#15803d' }], { title: 'تأثير التيار في جسم الإنسان', wd: 280, y: 70 }); }
      Q33.drawChips(ctx, D.chipsM(S, g)); Q33.drawChips(ctx, D.chipsO(S, g)); Q35.banner(ctx, w, S.md === 'wash' ? 'أحدث خللاً، واختر القابس، واضغط على الشخص' : 'لماذا لا يصاب الطائر بصعقة؟');
    },
    chipsM(S, g) { return Q35.chips(S, 'md', [['wash', 'الغسالة — الشكل 12'], ['bird', '🐦 الطائر على السلك']], g.h - 84, S.md, (S2, k) => { S2.md = k; }, { bw: 190 }); },
    chipsO(S, g) { const L = S.md === 'wash' ? [['fault', S.fault ? 'إصلاح الخلل' : '⚡ أحدث خللاً'], ['p2', 'قابس ثنائي'], ['p3', 'قابس ثلاثي مؤرض'], ['fx', '↺ فاصم جديد']] : [['one', 'الطائر وحده'], ['gnd', 'شخص على الأرض']]; return Q35.chips(S, 'o', L, g.h - 128, S.md === 'wash' ? 'p' + S.pl : S.bird, (S2, k) => { if (k === 'fault') { S2.fault = S2.fault ? 0 : 1; S2.blown = 0; } else if (k === 'p2') { S2.pl = 2; S2.blown = 0; } else if (k === 'p3') { S2.pl = 3; S2.blown = 0; } else if (k === 'fx') S2.blown = 0; else S2.bird = k; }, { bw: 170, bh: 30, col: '#0f766e' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = []; if (S.md === 'wash') L.push({ id: 'person', x: g.cx + (g.ph ? 10 : 30) + 140, y: g.yg - 70, w: 60, h: 140, tip: 'اضغط ليلمس الشخص الغسالة', idle: 'اضغط على الشخص ✋', click: S2 => { S2.touch = S2.touch ? 0 : 1; } }); return L.concat(D.chipsM(S, g), D.chipsO(S, g)); },
    readings(S) { return [rd('الخلل', S.fault ? 'السلك الحي يلامس الغلاف' : 'لا يوجد'), rd('القابس', S.pl === 3 ? 'ثلاثي مؤرض' : 'ثنائي'), rd('الفاصم', S.blown ? 'انصهر' : 'سليم'), rd('تيار جسم الشخص', Q33.f(D.Ib(S), 3) + ' A')]; },
    explain(S) { if (S.md !== 'wash') return Q26.ex('الطائر لا يصاب بصعقة.', 'قدما الطائر على السلك نفسه فلا يوجد فرق جهد بينهما ولا يمر تيار في جسمه. أما الشخص الذي يصل جسمه بين السلك الحي والأرض فيمر التيار فيه.', 'تجنب أن يتصل جسمك بين السلك الحي والسلك المتعادل أو بين السلك الحي والأرض — الشكل 14.'); return Q26.ex(D.Ib(S) > .01 ? 'يصاب الشخص بصعقة.' : 'الشخص آمن.', 'مع القابس الثنائي لا يوجد مسار للتيار إلى الأرض إلا عبر جسم الإنسان. سلك التأريض في القابس الثلاثي غليظ مقاومته صغيرة جداً أقل من مقاومة الجسم، فيمر فيه التيار إلى الأرض (دائرة قصيرة) فينصهر الفاصم وينقطع التيار.', 'تؤرض الأجهزة الكهربائية ذات الغلاف المعدني.'); }
  };
  M8.P[D.id] = D;
})();

/* عناصر الضغط فقط (بلا سحب) لا تُظهر أسهم السحب */
Object.keys(M8.P).filter(k => /^g9_(p|e|h)_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });

/* =============== تجارب الفصل الخامس (الطاقة والقدرة الكهربائية) =============== */
const M95 = M => M8.merge(Object.assign({ ch: 35, reg: X9 }, M));
M95({ id: 'g9_power', sec: '1-5 القدرة الكهربائية', page: 95, kind: 'نشاط', fig: 'الأشكال 1–4',
  title: 'القدرة الكهربائية: P = E/t و P = I × V وتوهج المصابيح',
  desc: 'نقارن مصباح 20 W بمصباح 100 W، وننفذ نشاط حساب القدرة بالأميتر والفولطميتر، ونحل مثال المدفأة، ونحسب تيار الأجهزة المنزلية، ونقارن توهج المصابيح المتماثلة.',
  tags: 'القدرة الكهربائية واط P = I × V P = V² / R مصابيح مدفأة أجهزة منزلية توهج',
  fact: ['القدرة = الطاقة ÷ الزمن ، وحدتها الواط W = J/s.', 'P = I × V ، و 1 W = 1 A × 1 V.', 'الأجهزة الكهربائية في المنازل توصل على التوازي.'],
  quiz: [
    { q: 'إحدى الوحدات التالية ليست وحدة للقدرة الكهربائية:', o: ['J × s', 'J / s', 'Watt', 'A × V'], a: 0, why: 'س1-3 ص 108: القدرة = الطاقة ÷ الزمن.' },
    { q: 'إبريق شاي قدرته 1200 W ويمر فيه 5 A. الفولطية التي يعمل عليها:', o: ['240 V', '60 V', '120 V', '600 V'], a: 0, why: 'س1-4 ص 108: V = P / I = 1200 / 5 = 240 V.' },
    { q: 'جهاز يستثمر 18000 J في خمس دقائق. معدل قدرته:', o: ['60 W', '360 W', '180 W', '30 W'], a: 0, why: 'س1-5 ص 109: P = 18000 ÷ 300 = 60 W.' },
    { q: 'مصباح قراءة الفولطميتر عليه 3 V والأميتر 0.5 A. قدرته:', o: ['1.5 W', '6 W', '0.17 W'], a: 0, why: 'س1 مسائل ص 110: P = 0.5 × 3 = 1.5 W ومقاومته 6 Ω.' },
    { q: 'مقاومتان 90 Ω و 180 Ω على التوازي عبر 36 V. القدرة في المقاومة 90 Ω:', o: ['14.4 W', '7.2 W', '3.6 W'], a: 0, why: 'س2 مسائل ص 110: I = 36/90 = 0.4 A ، P = 0.4 × 36 = 14.4 W.' }
  ],
  parts: [{ id: 'g9_p_bulbs', n: 'مصباح 20 W ومصباح 100 W' }, { id: 'g9_p_meter', n: 'نشاط: حساب القدرة' }, { id: 'g9_p_heater', n: 'مثال المدفأة الكهربائية' }, { id: 'g9_p_home', n: 'نشاط: الأجهزة المنزلية' }, { id: 'g9_p_glow', n: 'توهج المصابيح المتماثلة' }] });
M95({ id: 'g9_energy', sec: '2-5 الطاقة الكهربائية وكيفية حسابها', page: 101, kind: 'نشاط', fig: 'الشكل 5',
  title: 'الطاقة الكهربائية E = P × t وكلفتها بالدينار',
  desc: 'نشغل أجهزة منزلية ونراقب مقياس الطاقة، ونحسب الطاقة بالجول وبالكيلو واط–ساعة، ثم نحسب كلفة الاستهلاك ونحل أمثلة الكتاب ومسائله.',
  tags: 'الطاقة الكهربائية E = P × t كيلو واط ساعة الكلفة دينار ترشيد',
  fact: ['E (J) = P (W) × t (s).', 'الكلفة = القدرة (kW) × الزمن (h) × ثمن الوحدة.', '1 kW-h = 3600000 J.'],
  quiz: [
    { q: 'الكيلو واط–ساعة kW-h وحدة قياس:', o: ['الطاقة الكهربائية', 'القدرة', 'فرق الجهد', 'المقاومة'], a: 0, why: 'س1-2 ص 108.' },
    { q: 'مجفف شعر 1500 W استعمل 20 دقيقة. الطاقة المستثمرة:', o: ['1800 kJ', '30 kJ', '75 kJ'], a: 0, why: 'مثال ص 101: E = 1500 × 1200 = 1800000 J.' },
    { q: 'مصباح 24 W يعمل 10 ساعات. الطاقة المستهلكة:', o: ['0.24 kW-h', '240 kW-h', '2.4 kW-h'], a: 0, why: 'س3 مسائل ص 110: 0.024 kW × 10 h.' },
    { q: 'سخان 2 kW شغل 6 ساعات وثمن الوحدة 100 دينار. الكلفة:', o: ['1200 دينار', '200 دينار', '600 دينار'], a: 0, why: 'س4 مسائل ص 110: 2 × 6 × 100.' }
  ],
  parts: [{ id: 'g9_e_energy', n: 'حساب الطاقة الكهربائية' }, { id: 'g9_e_cost', n: 'كلفة الطاقة الكهربائية' }] });
M95({ id: 'g9_safety', sec: '3-5 + 4-5 + 5-5 الكهرباء في بيوتنا والتأريض وتجنب الصعقة', page: 103, kind: 'نشاط', fig: 'الأشكال 6–14',
  title: 'الكهرباء في بيوتنا: الفاصم وقاطع الدورة والتأريض وتجنب الصعقة',
  desc: 'نختار الجهاز والفاصم ونرى متى ينصهر ولماذا يوضع في السلك الحي، ونجرب قاطع الدورة، ثم نحدث خللاً في غسالة ونقارن القابس الثنائي بالثلاثي المؤرض، ونفسر لماذا لا يصاب الطائر على السلك.',
  tags: 'السلك الحي المتعادل المؤرض الفاصم قاطع الدورة التأريض الصعقة الكهربائية الطائر',
  fact: ['الفاصم يربط على التوالي مع السلك الحي قبل دخول التيار في الجهاز.', 'سلك التأريض مقاومته صغيرة جداً أقل من مقاومة جسم الإنسان.', 'تيار 0.1 A لثوانٍ قليلة قد يؤدي إلى الموت.'],
  quiz: [
    { q: 'الفاصم يجب أن يربط:', o: ['على التوالي مع السلك الحي', 'على التوالي مع السلك المتعادل', 'مع سلك التأريض', 'على التوازي مع السلك الحي'], a: 0, why: 'س1-1 ص 108.' },
    { q: 'علل: تؤرض الأجهزة ذات الغلاف المعدني:', o: ['لأن سلك التأريض مقاومته صغيرة فيمر فيه التيار بدل جسم الإنسان', 'لزيادة قدرة الجهاز', 'لتقليل الكلفة'], a: 0, why: 'س2-2 ص 109.' },
    { q: 'يربط قاطع الدورة مع الجهاز المطلوب حمايته:', o: ['على التوالي مع السلك الحار', 'على التوازي', 'مع سلك التأريض'], a: 0, why: 'س3 ص 109: ليقطع التيار عن الجهاز عند التيار الزائد.' },
    { q: 'يقف الطائر على سلك مكشوف للجهد العالي دون أن يصاب لأن:', o: ['قدميه بالجهد نفسه فلا يمر تيار في جسمه', 'جسمه عازل تماماً', 'التيار في السلك صغير'], a: 0, why: 'س2-3 ص 109.' }
  ],
  parts: [{ id: 'g9_h_wiring', n: 'الكهرباء في بيوتنا والفاصم' }, { id: 'g9_h_earth', n: 'التأريض وتجنب الصعقة' }] });
