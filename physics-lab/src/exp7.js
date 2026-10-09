'use strict';
/* ======================= الفصل السابع: إلكترونيات الحالة الصلبة ======================= */
X({ id: 'bands', ch: 7, sec: '2-7 / 5-7', page: 202, kind: 'تجربة', title: 'حزم الطاقة وأشباه الموصلات النقية والمطعّمة', desc: 'مقارنة حزمتي التكافؤ والتوصيل في الموصل وشبه الموصل والعازل، وأثر درجة الحرارة والتطعيم (نوع n ونوع p) في عدد حاملات الشحنة.',
  tools: ['نموذج حزم الطاقة', 'بلورة سليكون نقية', 'شوائب خماسية التكافؤ (الزرنيخ As) وثلاثية التكافؤ (الإنديوم In)', 'مصدر حراري'],
  steps: ['اختر نوع المادة ولاحظ مقدار فجوة الطاقة المحظورة Eg.', 'ارفع درجة الحرارة ولاحظ انتقال إلكترونات من حزمة التكافؤ إلى حزمة التوصيل تاركة فجوات.', 'طعّم البلورة بذرات خماسية التكافؤ (نوع n) أو ثلاثية التكافؤ (نوع p) ولاحظ مستوى الواهب أو المستقبل.'],
  concl: ['في الموصلات تتداخل حزمة التكافؤ مع حزمة التوصيل.', 'في العوازل فجوة الطاقة كبيرة (أكبر من 5eV تقريباً) فلا تنتقل الإلكترونات.', 'في أشباه الموصلات الفجوة صغيرة (Si ≈ 1.1eV و Ge ≈ 0.72eV) فتزداد موصليتها بارتفاع درجة الحرارة (معامل حراري سالب للمقاومة).', 'في البلورة النقية عدد الإلكترونات الحرة = عدد الفجوات.', 'النوع n: الشوائب الخماسية (واهبة) والإلكترونات حاملات أغلبية؛ النوع p: الشوائب الثلاثية (مستقبلة) والفجوات حاملات أغلبية. والبلورة المطعمة متعادلة كهربائياً.'],
  laws: ['gap'],
  controls: [SEL('mat', 'المادة', [['cond', 'موصل (نحاس)'], ['Si', 'شبه موصل: سليكون (1.1eV)'], ['Ge', 'شبه موصل: جرمانيوم (0.72eV)'], ['ins', 'عازل: ماس (5.5eV)']], 'Si'), SEL('dop', 'التطعيم', [['i', 'نقي (ذاتي)'], ['n', 'نوع n (زرنيخ As)'], ['p', 'نوع p (إنديوم In)']], 'i'), R('T', 'درجة الحرارة', 0, 600, 300, 5, 'K')],
  setup(S) { S.parts = []; for (let i = 0; i < 70; i++) S.parts.push({ x: Math.random(), up: false, r: Math.random() }); },
  update(S, dt) { const p = S.p; const Eg = { cond: 0, Si: 1.1, Ge: .72, ins: 5.5 }[p.mat]; const kT = 8.617e-5 * Math.max(p.T, 1); const pr = p.mat === 'cond' ? .5 : .5 * Math.exp(-Eg / kT / 12); S.frac = pr; S.parts.forEach(q => { q.x = (q.x + dt * (q.up ? .08 : .01) * (q.r - .5)) % 1; if (q.x < 0) q.x += 1; if (Math.random() < dt * 2) q.up = Math.random() < pr; }); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const p = S.p; const Eg = { cond: 0, Si: 1.1, Ge: .72, ins: 5.5 }[p.mat]; const x0 = w * .08, x1 = w * .62; const vb = h * .78, gapPx = p.mat === 'cond' ? -30 : clamp(Eg * 55, 30, 300); const cbB = vb - 60 - gapPx; const cbT = cbB - 90;
    ctx.fillStyle = 'rgba(59,130,246,.35)'; ctx.fillRect(x0, vb - 60, x1 - x0, 80); G.text(ctx, 'حزمة التكافؤ', x1 + 50, vb - 20, { s: 12 });
    ctx.fillStyle = 'rgba(249,115,22,.28)'; ctx.fillRect(x0, cbT, x1 - x0, 90); G.text(ctx, 'حزمة التوصيل', x1 + 50, cbT + 45, { s: 12 });
    if (p.mat !== 'cond') { G.arrow(ctx, x1 + 10, vb - 60, x1 + 10, cbB, '#fde68a', 1.5, 6); G.arrow(ctx, x1 + 10, cbB, x1 + 10, vb - 60, '#fde68a', 1.5, 6); G.text(ctx, 'Eg = ' + Eg + ' eV', x1 + 60, (vb - 60 + cbB) / 2, { s: 13, c: '#fde68a' }); }
    if (p.dop === 'n') { ctx.setLineDash([6, 4]); ctx.strokeStyle = '#4ade80'; ctx.beginPath(); ctx.moveTo(x0, cbB + 10); ctx.lineTo(x1, cbB + 10); ctx.stroke(); ctx.setLineDash([]); G.text(ctx, 'مستوى الواهب', x0 + 60, cbB + 22, { s: 11, c: '#86efac' }); }
    if (p.dop === 'p') { ctx.setLineDash([6, 4]); ctx.strokeStyle = '#f472b6'; ctx.beginPath(); ctx.moveTo(x0, vb - 70); ctx.lineTo(x1, vb - 70); ctx.stroke(); ctx.setLineDash([]); G.text(ctx, 'مستوى المستقبل', x0 + 60, vb - 82, { s: 11, c: '#f9a8d4' }); }
    const nExtra = p.dop === 'n' ? 18 : 0, hExtra = p.dop === 'p' ? 18 : 0;
    S.parts.forEach((q, i) => { const x = x0 + 10 + q.x * (x1 - x0 - 20); if (q.up) { ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.arc(x, cbT + 20 + q.r * 55, 4, 0, TAU); ctx.fill(); ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x0 + 10 + ((q.x + .3) % 1) * (x1 - x0 - 20), vb - 45 + q.r * 50, 4, 0, TAU); ctx.stroke(); } else { ctx.fillStyle = 'rgba(125,211,252,.55)'; ctx.beginPath(); ctx.arc(x, vb - 45 + q.r * 50, 3, 0, TAU); ctx.fill(); } });
    for (let i = 0; i < nExtra; i++) { const x = x0 + 10 + ((i * .137 + S.t * .03) % 1) * (x1 - x0 - 20); ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.arc(x, cbT + 15 + (i * 37 % 60), 4, 0, TAU); ctx.fill(); }
    for (let i = 0; i < hExtra; i++) { const x = x0 + 10 + ((i * .173 - S.t * .02 + 5) % 1) * (x1 - x0 - 20); ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(x, vb - 40 + (i * 29 % 50), 4, 0, TAU); ctx.stroke(); }
    G.text(ctx, '● إلكترون حر   ○ فجوة', (x0 + x1) / 2, 22, { s: 12, c: '#cbd5e1' });
  },
  readings(S) { const p = S.p; const n0 = Math.round((S.frac || 0) * 70); const ne = n0 + (p.dop === 'n' ? 18 : 0), nh = n0 + (p.dop === 'p' ? 18 : 0); return [rd('إلكترونات في حزمة التوصيل', ne + ''), rd('فجوات في حزمة التكافؤ', nh + ''), rd('حاملات الأغلبية', p.dop === 'n' ? 'الإلكترونات' : p.dop === 'p' ? 'الفجوات' : 'متساوية (نقي)'), rd('التوصيل الكهربائي', p.mat === 'cond' ? 'جيد جداً' : p.mat === 'ins' ? 'معدوم تقريباً' : ne + nh > 30 ? 'جيد' : ne + nh > 4 ? 'ضعيف' : 'ضعيف جداً')]; }
});

/* ---- pn junction bias (circuit) ---- */
function diodeBuild(C, rev) { C.add('battery', 2, 4, 2, 12, { val: 1, id: 'B' }); C.add('rheostat', 2, 4, 8, 4, { val: 100, min: 10, max: 1000, id: 'Rh', label: 'R حماية' }); C.add('ammeter', 8, 4, 13, 4, { id: 'A' }); if (rev) C.add('diode', 13, 12, 13, 4, { id: 'D' }); else C.add('diode', 13, 4, 13, 12, { id: 'D' }); C.add('wire', 13, 12, 2, 12); C.add('voltmeter', 17, 4, 17, 12, { id: 'V' }); C.add('wire', 13, 4, 17, 4); C.add('wire', 13, 12, 17, 12); }
X({ id: 'pn_bias', ch: 7, sec: '6-7 / 7-7', page: 208, kind: 'نشاط', title: 'نشاط: الثنائي البلوري (pn) في الانحياز الأمامي والعكسي ومنحني الخواص', desc: 'ثنائي سليكون مربوط مع مصدر مستمر متغير ومقاومة حماية وأميتر وفولطميتر؛ نرسم منحني الخواص (I–V).', circuit: true, method: 'be', fixedDt: 1e-3,
  tools: ['ثنائي بلوري من السليكون', 'مصدر فولطية مستمرة متغير', 'مقاومة حماية', 'أميتر (ملي أميتر ومايكرو أميتر)', 'فولطميتر', 'أسلاك توصيل'],
  steps: ['اربط الثنائي في انحياز أمامي (القطب الموجب للبطارية بالمنطقة p).', 'زد فولطية المصدر تدريجياً وسجّل قراءتي الفولطميتر والأميتر؛ لاحظ أن التيار صغير جداً حتى يتجاوز الجهد حاجز الجهد (≈0.7V للسليكون) ثم يزداد بسرعة كبيرة.', 'اعكس ربط الثنائي (انحياز عكسي) وكرر القراءات؛ لاحظ أن التيار صغير جداً (تيار التسرب) تقريباً مهما زاد الجهد.', 'ارسم منحني الخواص (I–V) من الجدول.'],
  concl: ['في الانحياز الأمامي تقل منطقة الاستنزاف ويقل حاجز الجهد فتعبر حاملات الأغلبية الوصلة وينساب تيار كبير.', 'في الانحياز العكسي تتسع منطقة الاستنزاف ويزداد حاجز الجهد فلا ينساب إلا تيار ضئيل جداً (تيار حاملات الأقلية).', 'الثنائي يسمح بمرور التيار باتجاه واحد تقريباً؛ لذا يستعمل في التقويم.', 'حاجز الجهد للسليكون ≈ 0.7V وللجرمانيوم ≈ 0.3V.'],
  laws: ['barrier', 'diodeEq', 'ohm'],
  build(C, S) { S.rev = false; diodeBuild(C, false); },
  controls: [SEL('rev', 'نوع الانحياز', [[0, 'انحياز أمامي'], [1, 'انحياز عكسي']], 0, (v, S, init) => { if (init) return; const E = S.C.get('B').val; S.C.clear(); diodeBuild(S.C, !!v); S.C.get('B').val = E; S.C.resetState(); Runner.stage.fit(60); }), R('E', 'فولطية المصدر', 0, 5, 1, .02, 'V', (v, S) => S.C.get('B').val = v), R('Rh', 'مقاومة الحماية', 10, 1000, 100, 5, 'Ω', (v, S) => S.C.get('Rh').val = v),
    BT('', [{ t: 'مسح المنحني تلقائياً', cls: 'primary', on: S => { S.rows = []; const Is = 1e-14, vt = .02585; for (let v = -1; v <= .78; v += .04) { S.rows.push({ V: +v.toFixed(2), I: +(Is * (Math.exp(v / vt) - 1) * 1000).toFixed(4) }); } Runner.table(Runner.cur, S); } }])],
  readings(S) { const C = S.C, d = C.get('D'); const V = S.p.rev ? -d.v : d.v; const I = S.p.rev ? -d.i : d.i; return [rd('فرق جهد الثنائي', fmtSI(V, 'V')), rd('تيار الثنائي', fmtSI(I, 'A')), rd('المقاومة الديناميكية V/I', Math.abs(I) > 1e-12 ? fmtSI(V / I, 'Ω') : '∞'), rd('الحالة', V > .55 ? 'موصل (تجاوز حاجز الجهد)' : V >= 0 ? 'دون حاجز الجهد' : 'انحياز عكسي — لا يوصل')]; },
  record(S) { const d = S.C.get('D'); return { V: +(S.p.rev ? -d.v : d.v).toFixed(3), I: +((S.p.rev ? -d.i : d.i) * 1000).toFixed(4) }; }, cols: [['V', 'V (V)'], ['I', 'I (mA)']],
  graph: { x: 'V', y: 'I', xl: 'V (V)', yl: 'I (mA)', xmin: -1.05, xmax: .82, y0zero: false, theory: x => 1e-14 * (Math.exp(x / .02585) - 1) * 1000, ymax: () => 40 }
});

/* ---- photodiode ---- */
X({ id: 'photodiode', ch: 7, sec: '8-7', page: 212, kind: 'تجربة', title: 'الثنائي المتحسس للضوء (الثنائي الضوئي)', desc: 'ثنائي في انحياز عكسي تسقط على وصلته حزمة ضوئية؛ يزداد التيار العكسي بزيادة شدة الضوء الساقط.', circuit: true, method: 'be', fixedDt: 1e-3,
  tools: ['ثنائي متحسس للضوء', 'بطارية', 'مقاومة', 'مايكرو أميتر', 'مصدر ضوئي متغير الشدة'],
  steps: ['اربط الثنائي الضوئي في انحياز عكسي مع مقاومة ومايكرو أميتر.', 'غطِّ الثنائي (ظلام): التيار ضئيل جداً (تيار الظلام).', 'زد شدة الضوء الساقط تدريجياً وسجّل التيار.'],
  concl: ['الفوتونات الساقطة على منطقة الاستنزاف تولد أزواجاً من الإلكترونات والفجوات فيزداد التيار العكسي.', 'التيار العكسي يتناسب طردياً مع شدة الضوء الساقط.', 'يستعمل في أجهزة التحكم عن بعد وأنظمة الإنذار وقراءة الأقراص الضوئية.'],
  laws: ['planck'],
  build(C) { C.add('battery', 2, 4, 2, 12, { val: 6, id: 'B' }); C.add('resistor', 2, 4, 9, 4, { val: 1000, id: 'R' }); C.add('ammeter', 9, 4, 14, 4, { id: 'A' }); C.add('photodiode', 14, 12, 14, 4, { id: 'PD', light: 40 }); C.add('wire', 14, 12, 2, 12); },
  controls: [R('L', 'شدة الضوء الساقط', 0, 100, 40, 1, '%', (v, S) => S.C.get('PD').light = v)],
  readings(S) { const d = S.C.get('PD'); return [rd('التيار العكسي', fmtSI(-d.i, 'A')), rd('فرق جهد الثنائي', fmtSI(-d.v, 'V')), rd('شدة الضوء', S.p.L + ' %')]; },
  record(S) { return { L: S.p.L, I: +(-S.C.get('PD').i * 1e6).toFixed(2) }; }, cols: [['L', 'شدة الضوء %'], ['I', 'I (µA)']],
  graph: { x: 'L', y: 'I', xl: 'شدة الضوء (%)', yl: 'I (µA)', xmin: 0, xmax: 100, theory: x => x }
});

/* ---- LED ---- */
X({ id: 'led', ch: 7, sec: '8-7', page: 213, kind: 'تجربة', title: 'الثنائي الباعث للضوء (LED)', desc: 'ثنائيات LED بألوان مختلفة في انحياز أمامي؛ نلاحظ أن فولطية التشغيل تزداد بنقصان الطول الموجي للضوء المنبعث.', circuit: true, method: 'be', fixedDt: 1e-3,
  tools: ['ثنائيات باعثة للضوء (أحمر، أصفر، أخضر، أزرق)', 'مصدر فولطية مستمرة متغير', 'مقاومة حماية', 'أميتر وفولطميتر'],
  steps: ['اربط LED في انحياز أمامي مع مقاومة حماية.', 'زد الفولطية تدريجياً حتى يبدأ بالتوهج وسجّل فولطية الثنائي.', 'بدّل لون LED وكرر؛ قارن طاقة الفوتون hc/λ مع فولطية التشغيل.', 'اعكس الانحياز: لا يتوهج.'],
  concl: ['عند الانحياز الأمامي تتحد الإلكترونات مع الفجوات عند الوصلة فتتحرر طاقة بشكل فوتونات ضوئية.', 'لون الضوء يعتمد على فجوة الطاقة للمادة شبه الموصلة (GaAs، GaP…): E = hf ≈ eV.', 'LED لا يتوهج في الانحياز العكسي.'],
  laws: ['planck', 'barrier'],
  build(C) { C.add('battery', 2, 4, 2, 12, { val: 5, id: 'B' }); C.add('rheostat', 2, 4, 8, 4, { val: 150, min: 50, max: 1000, id: 'Rh' }); C.add('ammeter', 8, 4, 13, 4, { id: 'A' }); C.add('led', 13, 4, 13, 12, { id: 'D', color: 'red' }); C.add('wire', 13, 12, 2, 12); C.add('voltmeter', 17, 4, 17, 12, { id: 'V' }); C.add('wire', 13, 4, 17, 4); C.add('wire', 13, 12, 17, 12); },
  controls: [SEL('col', 'لون LED', Object.entries(LED_COL).map(([k, o]) => [k, o.name + ' (' + o.nm + 'nm)']), 'red', (v, S) => S.C.get('D').color = v), R('E', 'فولطية المصدر', 0, 9, 5, .05, 'V', (v, S) => S.C.get('B').val = v), R('Rh', 'مقاومة الحماية', 50, 1000, 150, 5, 'Ω', (v, S) => S.C.get('Rh').val = v)],
  readings(S) { const d = S.C.get('D'); const o = LED_COL[d.color]; return [rd('فرق جهد LED', fmtSI(d.v, 'V')), rd('التيار', fmtSI(d.i, 'A')), rd('الطول الموجي', o.nm + ' nm'), rd('طاقة الفوتون hc/λ', fmt(1240 / o.nm, 3, 'eV')), rd('الحالة', d.i > 1e-3 ? 'يتوهج ✦' : 'منطفئ', 1)]; }
});

/* ---- rectification ---- */
function rectBuild(C, mode) {
  C.add('ac', 2, 14, 2, 4, { val: 12, f: 50, id: 'AC' });
  if (mode === 'half') { C.add('diode', 2, 4, 9, 4, { id: 'D1' }); C.add('resistor', 9, 4, 9, 14, { val: 1000, id: 'RL', label: 'RL' }); C.add('wire', 9, 14, 2, 14); C.add('wire', 9, 4, 13, 4); C.add('switch', 13, 4, 13, 8, { id: 'SF', label: 'ترشيح' }); C.add('capacitor', 13, 8, 13, 14, { val: 47, id: 'Cf', vmax: 12 }); C.add('wire', 13, 14, 9, 14); }
  else {
    C.add('wire', 2, 4, 10, 4); C.add('wire', 2, 14, 10, 14);
    C.add('diode', 10, 4, 15, 9, { id: 'D1' }); C.add('diode', 10, 14, 15, 9, { id: 'D2' }); C.add('diode', 5, 9, 10, 4, { id: 'D3' }); C.add('diode', 5, 9, 10, 14, { id: 'D4' });
    C.add('wire', 15, 9, 18, 9); C.add('resistor', 18, 9, 18, 17, { val: 1000, id: 'RL', label: 'RL' }); C.add('wire', 18, 17, 5, 17); C.add('wire', 5, 17, 5, 9);
    C.add('wire', 18, 9, 22, 9); C.add('switch', 22, 9, 22, 12, { id: 'SF', label: 'ترشيح' }); C.add('capacitor', 22, 12, 22, 17, { val: 47, id: 'Cf', vmax: 12 }); C.add('wire', 22, 17, 18, 17);
  }
}
X({ id: 'rectifier', ch: 7, sec: '9-7', page: 214, kind: 'تجربة', title: 'التقويم: تحويل التيار المتناوب إلى تيار مستمر', desc: 'مقوم نصف موجة بثنائي واحد، ومقوم موجة كاملة (قنطرة) بأربعة ثنائيات، مع متسعة ترشيح لتنعيم الفولطية الخارجة.', circuit: true, timeScale: .1, probeDt: 0, method: 'be', fixedDt: 5e-5,
  tools: ['مصدر فولطية متناوبة (محولة)', 'ثنائي أو أربعة ثنائيات بلورية', 'مقاومة حمل RL', 'متسعة ترشيح', 'راسم إشارة'],
  steps: ['في مقوم نصف الموجة لاحظ أن الفولطية على المقاومة تظهر في أنصاف الدورات الموجبة فقط.', 'بدّل إلى مقوم القنطرة: يمر التيار في المقاومة باتجاه واحد في نصفي الدورة.', 'أغلق مفتاح متسعة الترشيح وزد سعتها ولاحظ تنعيم الموجة (تقليل التموج).'],
  concl: ['الثنائي يوصل في الانحياز الأمامي فقط فيقوم التيار المتناوب.', 'مقوم نصف الموجة يستفيد من نصف الدورة فقط، ومقوم القنطرة يستفيد من الدورة كاملة (ثنائيان يوصلان في كل نصف دورة).', 'المتسعة المربوطة على التوازي مع الحمل تُشحن عند قمم الموجة وتُفرّغ ببطء فتقلل التموج.'],
  laws: ['barrier', 'rms'],
  build(C, S) { rectBuild(C, 'half'); S.mode = 'half'; },
  controls: [SEL('mode', 'نوع المقوم', [['half', 'مقوم نصف موجة'], ['full', 'مقوم موجة كاملة (قنطرة)']], 'half', (v, S, init) => { if (init) return; S.C.clear(); rectBuild(S.C, v); S.C.resetState(); S.C.get('RL').probe = true; S.C.get('AC').probe = true; S.C.get('Cf').val = S.p.Cf; S.C.get('SF').closed = S.p.filt; Runner.stage.fit(60); }), TG('filt', 'توصيل متسعة الترشيح', false, (v, S) => { S.C.get('SF').closed = v; S.C.beSteps = 2; }), R('Cf', 'سعة متسعة الترشيح', 1, 200, 47, 1, 'µF', (v, S) => S.C.get('Cf').val = v)],
  readings(S) { const r = S.C.get('RL'); const b = r.buf.slice(-400).map(q => q[1]); const mx = Math.max(0, ...b.map(Math.abs)), mn = Math.min(...b.map(Math.abs)); return [rd('Vmax على الحمل', fmtSI(mx, 'V')), rd('المعدل (DC)', fmtSI(b.reduce((a, v) => a + Math.abs(v), 0) / Math.max(1, b.length), 'V')), rd('التموج (Vmax − Vmin)', fmtSI(mx - (isFinite(mn) ? mn : 0), 'V')), rd('Vm للمصدر', '12 V')]; },
  scope: [{ id: 'AC', q: 'v', name: 'V الداخلة', color: '#94a3b8' }, { id: 'RL', q: 'v', name: 'V على الحمل', color: '#e11d48' }], scopeWin: S => 3 / 50, scopeY: () => ({ ymin: -13, ymax: 13 })
});

/* ---- transistor amplifier ---- */
X({ id: 'transistor', ch: 7, sec: '10-7 / 11-7', page: 217, kind: 'تجربة', title: 'الترانزستور (npn) مضخماً بربط الباعث المشترك', desc: 'تيار قاعدة صغير يتحكم بتيار جامع كبير (IC = βIB)؛ إشارة صغيرة متناوبة على القاعدة تظهر مضخمة ومقلوبة الطور على الجامع.',
  tools: ['ترانزستور npn', 'مصدرا فولطية VBB و VCC', 'مقاومة قاعدة RB ومقاومة حمل RC', 'مولد إشارة صغيرة', 'راسم إشارة'],
  steps: ['غيّر تيار القاعدة IB ولاحظ تغير IC (منحني النقل) والعلاقة IE = IC + IB.', 'أضف إشارة متناوبة صغيرة على القاعدة ولاحظ الإشارة الخارجة المضخمة على الجامع.', 'احسب ربح التيار β وربح الفولطية Av.', 'زد الإشارة كثيراً ولاحظ القطع والإشباع (تشوه الإشارة).'],
  concl: ['في الترانزستور تكون وصلة الباعث-القاعدة بانحياز أمامي ووصلة الجامع-القاعدة بانحياز عكسي عند التضخيم.', 'IE = IC + IB ، ربح التيار في الباعث المشترك β = IC/IB (كبير)، وفي القاعدة المشتركة α = IC/IE (أقل من 1 بقليل).', 'الإشارة الخارجة في ربط الباعث المشترك معاكسة للداخلة بالطور (180°).', 'ربح القدرة = ربح التيار × ربح الفولطية.'],
  laws: ['trI', 'gainCE', 'gainCB', 'gainV'],
  controls: [R('beta', 'ربح التيار β', 20, 300, 100, 1, ''), R('IB', 'تيار القاعدة المستمر IB', 0, 100, 40, 1, 'µA'), R('vin', 'سعة الإشارة الداخلة (تيار القاعدة)', 0, 40, 10, .5, 'µA'), R('RC', 'مقاومة الحمل RC', .5, 5, 2, .1, 'kΩ'), R('VCC', 'VCC', 5, 20, 12, .5, 'V')],
  calc(S, t) { const p = S.p; const ib = Math.max(0, p.IB + p.vin * Math.sin(TAU * 2 * t)) * 1e-6; let ic = p.beta * ib; const icsat = p.VCC / (p.RC * 1e3); ic = Math.min(ic, icsat); const vce = p.VCC - ic * p.RC * 1e3; return { ib, ic, ie: ic + ib, vce, sat: ic >= icsat * .999, cut: ib <= 0 }; },
  update(S) { const r = this.calc(S, S.t); (S.hi = S.hi || []).push([S.t, r.ib * 1e6]); (S.ho = S.ho || []).push([S.t, r.vce]); if (S.hi.length > 300) { S.hi.shift(); S.ho.shift(); } S.r = r; },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const r = S.r || this.calc(S, 0); const cx = w * .45, cy = h * .5;
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx, cy, 44, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - 14, cy - 26); ctx.lineTo(cx - 14, cy + 26); ctx.stroke(); ctx.lineWidth = 2;
    G.wire(ctx, [[cx - 14, cy - 10], [cx + 18, cy - 40], [cx + 18, cy - 110]]); G.wire(ctx, [[cx - 14, cy + 10], [cx + 18, cy + 40], [cx + 18, cy + 110]]); G.arrow(ctx, cx - 4, cy + 18, cx + 14, cy + 36, '#e2e8f0', 2, 8);
    G.wire(ctx, [[cx - 14, cy], [cx - 120, cy]]);
    G.text(ctx, 'C', cx + 32, cy - 60, { s: 14, w: 900 }); G.text(ctx, 'B', cx - 30, cy - 14, { s: 14, w: 900 }); G.text(ctx, 'E', cx + 32, cy + 60, { s: 14, w: 900 });
    const dots = (pts, I, col) => G.dotsAlong(ctx, pts, S.t * Math.min(200, 8 + I * 3e4), col, 14);
    dots([[cx - 120, cy], [cx - 14, cy]], r.ib * 30, '#fde68a'); dots([[cx + 18, cy - 110], [cx + 18, cy - 40], [cx, cy]], r.ic, '#fbbf24'); dots([[cx, cy], [cx + 18, cy + 40], [cx + 18, cy + 110]], r.ie, '#f59e0b');
    ctx.fillStyle = '#334155'; rr(ctx, cx + 4, cy - 170, 28, 50, 4); ctx.fill(); G.text(ctx, 'RC', cx + 18, cy - 145, { s: 11 }); G.text(ctx, 'VCC = ' + S.p.VCC + 'V', cx + 18, cy - 184, { s: 12, c: '#fde68a' });
    ctx.fillStyle = '#334155'; rr(ctx, cx - 180, cy - 14, 50, 28, 4); ctx.fill(); G.text(ctx, 'RB', cx - 155, cy, { s: 11 });
    G.text(ctx, 'IB = ' + fmt(r.ib * 1e6, 3) + ' µA', cx - 150, cy + 34, { s: 12, mono: 1, c: '#fde68a' }); G.text(ctx, 'IC = ' + fmt(r.ic * 1e3, 3) + ' mA', cx + 110, cy - 80, { s: 12, mono: 1, c: '#fbbf24' }); G.text(ctx, 'IE = ' + fmt(r.ie * 1e3, 3) + ' mA', cx + 110, cy + 80, { s: 12, mono: 1, c: '#f59e0b' });
    if (r.sat) G.text(ctx, 'إشباع (تشوه)', cx, 24, { s: 13, c: '#fca5a5', w: 800 }); if (r.cut) G.text(ctx, 'قطع (تشوه)', cx, 24, { s: 13, c: '#fca5a5', w: 800 });
  },
  readings(S) { const r = S.r || this.calc(S, 0); const p = S.p; const dIB = p.vin * 1e-6, dVo = p.beta * dIB * p.RC * 1e3; const rin = 1e3; return [rd('IB', fmtSI(r.ib, 'A')), rd('IC = βIB', fmtSI(r.ic, 'A')), rd('IE = IC + IB', fmtSI(r.ie, 'A')), rd('VCE', fmtSI(r.vce, 'V')), rd('β = IC/IB', fmt(p.beta, 3)), rd('α = β/(1+β)', fmt(p.beta / (1 + p.beta), 4)), rd('ربح الفولطية Av ≈ βRC/rin', fmt(dVo / (dIB * rin), 4)), rd('ربح القدرة', fmt(p.beta * dVo / (dIB * rin), 4))]; },
  live: { title: 'الإشارة الداخلة (IB) والخارجة (VCE)', data: S => { const hi = S.hi || [], ho = S.ho || []; const mi = Math.max(1e-9, ...hi.map(q => q[1])), mo = Math.max(1e-9, ...ho.map(q => q[1])); return { series: [{ pts: hi.map(q => [q[0], q[1] / mi]), name: 'IB (منسوب)', color: '#1f5eff' }, { pts: ho.map(q => [q[0], q[1] / mo]), name: 'VCE (منسوب)', color: '#e11d48' }], opts: { xl: 't', ymin: 0, ymax: 1.1 } }; } }
});
