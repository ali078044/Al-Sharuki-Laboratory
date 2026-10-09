'use strict';
/* ======================= الفصل الثالث: التيار المتناوب ======================= */
function phasors(ctx, w, h, list, t, o = {}) {
  // list: [{mag, ph (rad, relative), col, name}] rotating with angle t
  const cx = w * .42, cy = h * .52, R = Math.min(w * .38, h * .42);
  let m = Math.max(1e-12, ...list.map(p => p.mag)); { let x = 0, y = 0; list.forEach(p => { if (p.chain) { x += Math.cos(p.ph) * p.mag; y += Math.sin(p.ph) * p.mag; m = Math.max(m, Math.hypot(x, y)); } }); }
  ctx.strokeStyle = 'rgba(120,140,170,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - R - 6, cy); ctx.lineTo(cx + R + 6, cy); ctx.moveTo(cx, cy - R - 6); ctx.lineTo(cx, cy + R + 6); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
  let bx = cx, by = cy;
  list.forEach(p => {
    const a = (o.fixed ? 0 : t) + p.ph; const L = p.mag / m * R;
    const x0 = p.chain ? bx : cx, y0 = p.chain ? by : cy; const x1 = x0 + Math.cos(a) * L, y1 = y0 - Math.sin(a) * L;
    if (L > 3) G.arrow(ctx, x0, y0, x1, y1, p.col, p.w || 2.4, 8);
    if (p.chain) { bx = x1; by = y1; }
    ctx.font = 'bold 11px Tajawal,sans-serif'; ctx.fillStyle = p.col; ctx.direction = 'ltr'; ctx.textAlign = 'center'; ctx.fillText(p.name, x1 + Math.cos(a) * 12, y1 - Math.sin(a) * 12 + 4);
  });
  if (o.legend) { ctx.textAlign = 'left'; ctx.font = 'bold 11px Tajawal,sans-serif'; o.legend.forEach((l, i) => { ctx.fillStyle = l[1]; ctx.fillText(l[0], w * .8 - 30, 16 + i * 15); }); }
}
const acScopeWin = S => 3 / Math.max(1, S.C.maxFreq());
function acSource(C, x1, y1, x2, y2, Vm, f, id = 'AC') { return C.add('ac', x1, y1, x2, y2, { val: Vm, f, id }); }

X({ id: 'ac_r', ch: 3, sec: '3-3 / 4-3', page: 95, kind: 'تجربة', title: 'دائرة تيار متناوب تحتوي على مقاومة صرف', desc: 'مصدر فولطية متناوبة جيبية مربوط بمقاومة صرف؛ نلاحظ أن التيار والفولطية متفقان بالطور ونحسب المقدار المؤثر والقدرة المتوسطة.', circuit: true, timeScale: .1,
  tools: ['مصدر فولطية متناوبة (مذبذب)', 'مقاومة صرف R', 'أميتر وفولطميتر للتيار المتناوب', 'راسم إشارة'],
  steps: ['شغّل الدائرة ولاحظ منحني الفولطية والتيار على راسم الإشارة.', 'لاحظ أن المنحنيين يبلغان قيمتيهما العظمى والصفر في اللحظات نفسها (Φ = 0).', 'قارن قراءة الأجهزة (المقدار المؤثر) بالقيمة العظمى: Veff = 0.707 Vm.', 'احسب القدرة المتوسطة وقارنها بـ ½ Im Vm.'],
  concl: ['في دائرة المقاومة الصرف يكون متجه طور التيار ومتجه طور الفولطية متطابقين (زاوية فرق الطور صفر).', 'منحني القدرة الآنية موجب دائماً ويتغير بين الصفر والمقدار الأعظم Pm = Im Vm.', 'Pav = ½ Im Vm = Ieff² R.', 'المقاومة الصرف لا تعتمد على تردد المصدر.', 'المقدار المؤثر للتيار المتناوب = مقدار التيار المستمر الذي يولد التأثير الحراري نفسه: Ieff = 0.707 Im.'],
  laws: ['acv', 'rms', 'pavgR'],
  build(C) { acSource(C, 2, 12, 2, 4, 424.2, 50); C.add('ammeter', 2, 4, 8, 4, { id: 'A' }); C.add('resistor', 8, 4, 14, 4, { val: 100, id: 'R' }); C.add('wire', 14, 4, 14, 12); C.add('wire', 14, 12, 2, 12); C.add('voltmeter', 8, 8, 14, 8, { id: 'V' }); C.add('wire', 8, 4, 8, 8); C.add('wire', 14, 8, 14, 4); },
  controls: [R('Vm', 'الفولطية العظمى Vm', 10, 424.2, 424.2, .1, 'V', (v, S) => S.C.get('AC').val = v), R('f', 'التردد f', 10, 200, 50, 1, 'Hz', (v, S) => S.C.get('AC').f = v), R('R', 'المقاومة R', 10, 500, 100, 1, 'Ω', (v, S) => S.C.get('R').val = v)],
  readings(S) { const C = S.C, r = C.get('R'); const Vm = C.get('AC').val, Im = Vm / r.val; return [rd('Vm', fmtSI(Vm, 'V')), rd('Veff (الفولطميتر)', fmtSI(Math.sqrt(r.v2), 'V')), rd('Im', fmtSI(Im, 'A')), rd('Ieff (الأميتر)', fmtSI(Math.sqrt(r.i2), 'A')), rd('Pav = Ieff²R', fmtSI(r.i2 * r.val, 'W')), rd('½ Im Vm', fmtSI(.5 * Im * Vm, 'W')), rd('زاوية فرق الطور Φ', '0°', 1)]; },
  scope: [{ id: 'R', q: 'v', name: 'V_R', color: '#1f5eff' }, { id: 'R', q: 'i', name: 'I×100', color: '#e11d48', k: 100 }], scopeWin: acScopeWin,
  aux(ctx, w, h, S) { const C = S.C; const a = C.get('AC').th || 0; phasors(ctx, w, h, [{ mag: 1, ph: 0, col: '#1f5eff', name: 'Vm' }, { mag: .7, ph: 0, col: '#e11d48', name: 'Im' }], a); }, auxTitle: 'المخطط الطوري (Vm و Im متفقان بالطور)'
});

/* ---- inductive reactance activities ---- */
function xlBuild(C) { acSource(C, 2, 12, 2, 4, 10, 50); C.add('switch', 2, 4, 6, 4, { id: 'S', closed: true }); C.add('ammeter', 6, 4, 11, 4, { id: 'A' }); C.add('inductor', 11, 4, 11, 12, { val: .2, id: 'L', label: 'L', rs: 2 }); C.get('AC').ph = Math.PI / 2; C.add('wire', 11, 12, 2, 12); C.add('voltmeter', 17, 4, 17, 12, { id: 'V' }); C.add('wire', 11, 4, 17, 4); C.add('wire', 11, 12, 17, 12); }
const xlReads = S => { const C = S.C, L = C.get('L'); const V = Math.sqrt(L.v2), I = Math.sqrt(L.i2); const f = C.get('AC').f; return [rd('قراءة الفولطميتر', fmtSI(V, 'V')), rd('قراءة الأميتر', fmtSI(I, 'A')), rd('XL المقيسة = V/I', fmtSI(V / I, 'Ω')), rd('XL = 2πfL', fmtSI(TAU * f * L.val, 'Ω')), rd('التردد f', fmtSI(f, 'Hz')), rd('معامل الحث L', fmtSI(L.val, 'H'))]; };
X({ id: 'xl_f', ch: 3, sec: '6-3', page: 101, kind: 'نشاط', title: 'نشاط (1): تأثير تغيّر مقدار تردد الدائرة (f) في مقدار رادة الحث (XL)', desc: 'نزيد تردد المذبذب تدريجياً مع المحافظة على فرق الجهد بين طرفي الملف ثابتاً، ونراقب قراءة الأميتر.', circuit: true, timeScale: .1, probeDt: 0,
  tools: ['مذبذب كهربائي (مصدر فولطية متناوبة يمكن تغيير تردده)', 'أميتر', 'فولطميتر', 'ملف مهمل المقاومة (محث صرف)', 'مفتاح كهربائي'],
  steps: ['نربط دائرة كهربائية عملية تتألف من الملف والأميتر والمذبذب الكهربائي على التوالي، ونربط الفولطميتر على التوازي بين طرفي الملف.', 'نغلق الدائرة ونبدأ بزيادة تردد المذبذب تدريجياً مع المحافظة على بقاء مقدار فرق الجهد بين طرفي الملف ثابتاً (بمراقبة قراءة الفولطميتر).', 'كيف ستتغير قراءة الأميتر في الدائرة؟ نلاحظ حصول نقصان في قراءة الأميتر.', 'سجّل التردد ورادة الحث (V/I) لعدة قيم وارسم العلاقة بينهما.'],
  concl: ['رادة الحث (XL) تتناسب طردياً مع تردد الفولطية (f) بثبوت معامل الحث الذاتي L: XL ∝ f.', 'من النشاط يمكن رسم العلاقة بين تردد المصدر ورادة الحث بيانياً فنحصل على خط مستقيم يمر بنقطة الأصل.', 'تفسير ذلك وفق قانون لنز: ازدياد التردد يعني ازدياد المعدل الزمني لتغير التيار ΔI/Δt فتزداد القوة الدافعة المحتثة المعاكسة، أي تزداد رادة الحث.'],
  laws: ['xl', 'self'],
  build: xlBuild, controls: [R('f', 'تردد المذبذب f', 10, 500, 50, 1, 'Hz', (v, S) => S.C.get('AC').f = v), R('Vm', 'فولطية المذبذب العظمى', 2, 20, 10, .5, 'V', (v, S) => S.C.get('AC').val = v)],
  readings: xlReads, scope: [{ id: 'L', q: 'v', name: 'V_L', color: '#1f5eff' }, { id: 'L', q: 'i', name: 'I×100', color: '#e11d48', k: 100 }], scopeWin: acScopeWin,
  record: S => { const L = S.C.get('L'); return { f: S.C.get('AC').f, I: +(Math.sqrt(L.i2) * 1000).toFixed(2), XL: +(Math.sqrt(L.v2) / Math.sqrt(L.i2)).toFixed(1) }; }, cols: [['f', 'f (Hz)'], ['I', 'I (mA)'], ['XL', 'XL (Ω)']],
  graph: { x: 'f', y: 'XL', xl: 'التردد f (Hz)', yl: 'رادة الحث XL (Ω)', theory: (x, S) => TAU * x * S.C.get('L').val, xmin: 0, xmax: 520 }
});
X({ id: 'xl_L', ch: 3, sec: '6-3', page: 101, kind: 'نشاط', title: 'نشاط (2): تأثير تغيّر معامل الحث الذاتي (L) في مقدار رادة الحث (XL)', desc: 'نُدخل قلب الحديد تدريجياً في جوف الملف (يزداد L) مع بقاء التردد وفرق الجهد ثابتين ونراقب قراءة الأميتر.', circuit: true, timeScale: .1,
  tools: ['مصدر فولطية متناوبة ثابت التردد', 'أميتر', 'فولطميتر', 'ملف مهمل المقاومة', 'قلب من الحديد المطاوع', 'مفتاح كهربائي'],
  steps: ['نربط دائرة عملية تتألف من الملف والأميتر والمذبذب على التوالي، ونربط الفولطميتر على التوازي بين طرفي الملف.', 'نغلق الدائرة ونلاحظ قراءة الأميتر.', 'ندخل قلب الحديد تدريجياً في جوف الملف مع المحافظة على بقاء مقدار الفولطية بين طرفي الملف ثابتاً (بمراقبة قراءة الفولطميتر).', 'كيف ستتغير قراءة الأميتر؟ نلاحظ حصول نقصان في قراءة الأميتر بسبب ازدياد رادة الحث (لأن إدخال قلب الحديد يزيد من معامل الحث الذاتي للملف).'],
  concl: ['رادة الحث (XL) تتناسب طردياً مع معامل الحث الذاتي (L) بثبوت التردد: XL ∝ L.', 'من النشاط يمكننا رسم مخطط بياني بين رادة الحث ومعامل الحث الذاتي فنحصل على خط مستقيم.'],
  laws: ['xl'],
  build: xlBuild, controls: [R('core', 'نسبة إدخال قلب الحديد', 0, 1, 0, .01, '', (v, S) => { S.C.get('L').val = .05 * (1 + 9 * v); S.C.get('L').core = v > .05; }, v => Math.round(v * 100) + '%'), R('f', 'التردد (ثابت)', 20, 200, 50, 1, 'Hz', (v, S) => S.C.get('AC').f = v)],
  readings: xlReads, scope: [{ id: 'L', q: 'v', name: 'V_L', color: '#1f5eff' }, { id: 'L', q: 'i', name: 'I×100', color: '#e11d48', k: 100 }], scopeWin: acScopeWin,
  record: S => { const L = S.C.get('L'); return { L: +L.val.toFixed(3), I: +(Math.sqrt(L.i2) * 1000).toFixed(2), XL: +(Math.sqrt(L.v2) / Math.sqrt(L.i2)).toFixed(1) }; }, cols: [['L', 'L (H)'], ['I', 'I (mA)'], ['XL', 'XL (Ω)']],
  graph: { x: 'L', y: 'XL', xl: 'معامل الحث L (H)', yl: 'XL (Ω)', theory: (x, S) => TAU * S.C.get('AC').f * x, xmin: 0, xmax: .55 }
});

/* ---- capacitive reactance ---- */
function xcBuild(C) { acSource(C, 2, 12, 2, 4, 10, 50); C.add('switch', 2, 4, 6, 4, { id: 'S', closed: true }); C.add('ammeter', 6, 4, 11, 4, { id: 'A' }); C.add('capacitor', 11, 4, 11, 12, { val: 10, id: 'C', vmax: 10 }); C.add('wire', 11, 12, 2, 12); C.add('voltmeter', 17, 4, 17, 12, { id: 'V' }); C.add('wire', 11, 4, 17, 4); C.add('wire', 11, 12, 17, 12); }
const xcReads = S => { const C = S.C, c = C.get('C'); const V = Math.sqrt(c.v2), I = Math.sqrt(c.i2); const f = C.get('AC').f; return [rd('قراءة الفولطميتر', fmtSI(V, 'V')), rd('قراءة الأميتر', fmtSI(I, 'A')), rd('XC المقيسة = V/I', fmtSI(V / I, 'Ω')), rd('XC = 1/(2πfC)', fmtSI(1 / (TAU * f * c.val * 1e-6), 'Ω')), rd('التردد f', fmtSI(f, 'Hz')), rd('السعة C', fmtSI(c.val * 1e-6, 'F'))]; };
X({ id: 'xc_f', ch: 3, sec: '7-3', page: 106, kind: 'نشاط', title: 'نشاط (1): تأثير تغيّر مقدار تردد فولطية المصدر في مقدار رادة السعة (XC)', desc: 'نزيد تردد المذبذب مع إبقاء فرق الجهد بين صفيحتي المتسعة ثابتاً ونراقب الأميتر.', circuit: true, timeScale: .1,
  tools: ['أميتر', 'فولطميتر', 'متسعة ذات الصفيحتين المتوازيتين', 'مذبذب كهربائي', 'أسلاك توصيل', 'مفتاح كهربائي'],
  steps: ['نربط دائرة كهربائية عملية تتألف من المتسعة والأميتر والمذبذب الكهربائي على التوالي، ونربط الفولطميتر على التوازي بين صفيحتي المتسعة.', 'نغلق الدائرة ونبدأ بزيادة تردد المذبذب الكهربائي مع المحافظة على بقاء مقدار فرق الجهد بين صفيحتي المتسعة ثابتاً (بمراقبة قراءة الفولطميتر).', 'كيف ستتغير قراءة الأميتر في الدائرة؟ نلاحظ ازدياد قراءة الأميتر (ازدياد التيار المنساب في الدائرة مع ازدياد تردد فولطية المصدر).'],
  concl: ['إن رادة السعة XC تتناسب عكسياً مع تردد فولطية المصدر (XC ∝ 1/f) بثبوت سعة المتسعة (C).', 'من النشاط يمكن رسم العلاقة بين تردد فولطية المصدر ورادة السعة بيانياً فهو يمثل العلاقة العكسية.', 'عند الترددات الواطئة جداً تكون رادة السعة كبيرة جداً فتعمل المتسعة عمل مفتاح مفتوح، وعند الترددات العالية جداً تقترب من الصفر.'],
  laws: ['xc'],
  build: xcBuild, controls: [R('f', 'تردد المذبذب f', 10, 1000, 50, 1, 'Hz', (v, S) => S.C.get('AC').f = v), R('Vm', 'فولطية المذبذب العظمى', 2, 20, 10, .5, 'V', (v, S) => S.C.get('AC').val = v)],
  readings: xcReads, scope: [{ id: 'C', q: 'v', name: 'V_C', color: '#1f5eff' }, { id: 'C', q: 'i', name: 'I×100', color: '#e11d48', k: 100 }], scopeWin: acScopeWin,
  record: S => { const c = S.C.get('C'); return { f: S.C.get('AC').f, I: +(Math.sqrt(c.i2) * 1000).toFixed(2), XC: +(Math.sqrt(c.v2) / Math.sqrt(c.i2)).toFixed(1) }; }, cols: [['f', 'f (Hz)'], ['I', 'I (mA)'], ['XC', 'XC (Ω)']],
  graph: { x: 'f', y: 'XC', xl: 'التردد f (Hz)', yl: 'رادة السعة XC (Ω)', theory: (x, S) => 1 / (TAU * x * S.C.get('C').val * 1e-6), xmin: 8, xmax: 1000, ymax: () => 2000 }
});
X({ id: 'xc_C', ch: 3, sec: '7-3', page: 107, kind: 'نشاط', title: 'نشاط (2): تأثير تغيّر سعة المتسعة في مقدار رادة السعة', desc: 'نزيد سعة المتسعة (بإدخال لوح عازل بين صفيحتيها) مع بقاء التردد وفرق الجهد ثابتين.', circuit: true, timeScale: .1,
  tools: ['مصدر للفولطية المتناوبة ثابت التردد', 'أميتر', 'فولطميتر', 'متسعة ذات الصفيحتين المتوازيتين متغيرة السعة', 'مفتاح كهربائي', 'أسلاك توصيل', 'عازل'],
  steps: ['نربط دائرة كهربائية عملية تتألف من المتسعة والأميتر ومصدر الفولطية على التوالي، ونربط الفولطميتر على التوازي بين صفيحتي المتسعة.', 'نغلق الدائرة ونلاحظ قراءة الأميتر.', 'نزيد مقدار سعة المتسعة تدريجياً (وذلك بإدخال لوح من مادة عازلة كهربائياً بين صفيحتي المتسعة).', 'كيف ستتغير قراءة الأميتر في هذه الحالة؟ نلاحظ ازدياد قراءة الأميتر (ازدياد التيار المنساب في الدائرة مع ازدياد سعة المتسعة).'],
  concl: ['إن رادة السعة XC تتناسب عكسياً مع مقدار سعة المتسعة بثبوت تردد فولطية المصدر: XC ∝ 1/C.', 'من النشاط يمكن رسم العلاقة بين رادة السعة والسعة بيانياً فيمثل العلاقة العكسية.'],
  laws: ['xc'],
  build: xcBuild, controls: [R('Cv', 'السعة C (بإدخال العازل)', 1, 50, 10, .5, 'µF', (v, S) => S.C.get('C').val = v), R('f', 'التردد (ثابت)', 20, 500, 50, 1, 'Hz', (v, S) => S.C.get('AC').f = v)],
  readings: xcReads, scope: [{ id: 'C', q: 'v', name: 'V_C', color: '#1f5eff' }, { id: 'C', q: 'i', name: 'I×100', color: '#e11d48', k: 100 }], scopeWin: acScopeWin,
  record: S => { const c = S.C.get('C'); return { C: c.val, I: +(Math.sqrt(c.i2) * 1000).toFixed(2), XC: +(Math.sqrt(c.v2) / Math.sqrt(c.i2)).toFixed(1) }; }, cols: [['C', 'C (µF)'], ['I', 'I (mA)'], ['XC', 'XC (Ω)']],
  graph: { x: 'C', y: 'XC', xl: 'السعة C (µF)', yl: 'XC (Ω)', theory: (x, S) => 1 / (TAU * S.C.get('AC').f * x * 1e-6), xmin: .8, xmax: 52, ymax: () => 2000 }
});

/* ---- RLC series ---- */
function rlcVals(S) { const C = S.C; const f = C.get('AC').f, R0 = C.get('R').val, L = C.get('L').val, Cc = C.get('C').val * 1e-6; const XL = TAU * f * L, XC = 1 / (TAU * f * Cc), Z = Math.hypot(R0, XL - XC); const Veff = C.get('AC').val / Math.SQRT2; const I = Veff / Z; const ph = Math.atan2(XL - XC, R0); return { f, R0, L, Cc, XL, XC, Z, Veff, I, ph }; }
X({ id: 'rlc_series', ch: 3, sec: '8-3 / 9-3', page: 109, kind: 'تجربة', title: 'دائرة RLC متوالية الربط: المخطط الطوري وعامل القدرة', desc: 'مقاومة صرف ومحث صرف ومتسعة صرف على التوالي مع مصدر متناوب وفولطميتر على كل عنصر؛ نتحقق من الجمع الاتجاهي للفولطيات.', circuit: true, timeScale: .1,
  tools: ['مصدر فولطية متناوبة', 'مقاومة صرف R', 'محث صرف L', 'متسعة صرف C', 'أميتر', 'أربعة فولطميترات'],
  steps: ['شغّل الدائرة وسجّل قراءات الفولطميترات VR و VL و VC و VT.', 'لاحظ أن VT ≠ VR + VL + VC جبرياً، بل VT² = VR² + (VL − VC)².', 'ارسم المخطط الطوري وحدّد زاوية فرق الطور Φ.', 'غيّر التردد: عندما XL > XC تكون خواص الدائرة حثية، وعندما XC > XL سعوية، وعند تساويهما أومية.'],
  concl: ['التيار مشترك في جميع العناصر (متجه طور التيار مرجعاً).', 'Z = √(R² + (XL − XC)²) و tanΦ = (XL − XC)/R.', 'القدرة الحقيقية تستهلك في المقاومة فقط: Preal = I VT cosΦ، والقدرة الظاهرية Papp = I VT.', 'عامل القدرة pf = cosΦ = R/Z.'],
  laws: ['imped', 'phase', 'pf', 'xl', 'xc'],
  build(C) { acSource(C, 2, 14, 2, 4, 282.84, 50); C.add('ammeter', 2, 4, 6, 4, { id: 'A' }); C.add('resistor', 6, 4, 11, 4, { val: 40, id: 'R', label: 'R' }); C.add('inductor', 11, 4, 16, 4, { val: .382, id: 'L', label: 'L', rs: .5 }); C.add('capacitor', 16, 4, 21, 4, { val: 35.4, id: 'C', label: 'C', vmax: 300 }); C.add('wire', 21, 4, 21, 14); C.add('wire', 21, 14, 2, 14);
    C.add('voltmeter', 6, 8, 11, 8, { id: 'VR' }); C.add('wire', 6, 4, 6, 8); C.add('wire', 11, 4, 11, 8); C.add('voltmeter', 11, 9, 16, 9, { id: 'VL' }); C.add('wire', 11, 8, 11, 9); C.add('wire', 16, 4, 16, 9); C.add('voltmeter', 16, 10, 21, 10, { id: 'VC' }); C.add('wire', 16, 9, 16, 10); C.add('wire', 21, 4, 21, 10); },
  controls: [R('f', 'التردد f', 10, 150, 50, 1, 'Hz', (v, S) => S.C.get('AC').f = v), R('R', 'R', 5, 200, 40, 1, 'Ω', (v, S) => S.C.get('R').val = v), R('L', 'L', .05, 1, .382, .001, 'H', (v, S) => S.C.get('L').val = v), R('Cv', 'C', 5, 200, 35.4, .1, 'µF', (v, S) => S.C.get('C').val = v), R('Vm', 'Vm', 10, 400, 282.84, 1, 'V', (v, S) => S.C.get('AC').val = v)],
  readings(S) { const C = S.C; const r = rlcVals(S); const V = id => Math.sqrt(C.get(id).v2); const VR = V('R'), VL = V('L'), VC = V('C'); const I = Math.sqrt(C.get('A').i2);
    return [rd('VR', fmtSI(VR, 'V')), rd('VL', fmtSI(VL, 'V')), rd('VC', fmtSI(VC, 'V')), rd('VT = √(VR²+(VL−VC)²)', fmtSI(Math.hypot(VR, VL - VC), 'V')), rd('I (الأميتر)', fmtSI(I, 'A')), rd('Z', fmtSI(r.Z, 'Ω')), rd('XL', fmtSI(r.XL, 'Ω')), rd('XC', fmtSI(r.XC, 'Ω')), rd('Φ', fmt(deg(r.ph), 3, '°')), rd('pf = cosΦ', fmt(Math.cos(r.ph), 3)), rd('Preal', fmtSI(I * I * r.R0, 'W')), rd('Papp', fmtSI(I * r.Veff, 'VA')), rd('خواص الدائرة', Math.abs(r.XL - r.XC) < r.R0 * .03 ? 'أومية (رنين)' : r.XL > r.XC ? 'حثية' : 'سعوية', 1)]; },
  aux(ctx, w, h, S) { const r = rlcVals(S); const VR = r.I * r.R0, VL = r.I * r.XL, VC = r.I * r.XC; phasors(ctx, w, h, [{ mag: VR, ph: 0, col: '#16a34a', name: 'VR' }, { mag: VL, ph: Math.PI / 2, col: '#e11d48', name: 'VL' }, { mag: VC, ph: -Math.PI / 2, col: '#1f5eff', name: 'VC' }, { mag: Math.hypot(VR, VL - VC), ph: r.ph, col: '#d97706', name: 'VT', w: 3 }], 0, { fixed: 1 }); }, auxTitle: 'المخطط الطوري للفولطيات', auxTall: 1,
  scope: [{ id: 'AC', q: 'v', name: 'VT', color: '#d97706' }, { id: 'A', q: 'i', name: 'I×50', color: '#e11d48', k: 50 }], scopeWin: acScopeWin
});

/* ---- LC oscillation ---- */
X({ id: 'lc_osc', ch: 3, sec: '10-3', page: 115, kind: 'تجربة', title: 'الاهتزاز الكهرومغناطيسي في دائرة (L-C)', desc: 'متسعة مشحونة تُفرغ خلال محث؛ تتبادل الطاقة بين المجال الكهربائي للمتسعة والمجال المغناطيسي للمحث بتردد طبيعي fr = 1/(2π√LC).', circuit: true, method: 'trap', timeScale: .1,
  tools: ['متسعة ذات سعة صرف', 'محث صرف', 'بطارية لشحن المتسعة', 'مفتاح مزدوج', 'راسم إشارة'],
  steps: ['اشحن المتسعة بوضع المفتاح على البطارية.', 'انقل المفتاح لربط المتسعة بالمحث: لاحظ الاهتزاز الجيبي للفولطية والتيار.', 'راقب تبادل الطاقة بين UE = ½CV² و UB = ½LI² (مخطط الطاقة).', 'أضف مقاومة صغيرة ولاحظ تضاؤل الاهتزازات (الاهتزاز المتخامد).'],
  concl: ['الطاقة الكلية تبقى ثابتة في الدائرة المثالية (L-C) وتتبادل بين المجالين الكهربائي والمغناطيسي.', 'تردد الاهتزاز الطبيعي fr = 1/(2π√(LC)).', 'في الدوائر العملية توجد مقاومة فتتلاشى الاهتزازات تدريجياً (متخامدة) بسبب تحول الطاقة إلى حرارة.'],
  laws: ['reson', 'capE', 'indE'],
  build(C) { C.add('battery', 2, 5, 2, 12, { val: 10, id: 'B' }); C.add('switch', 2, 5, 8, 5, { id: 'S1', label: 'شحن' }); C.add('capacitor', 8, 5, 8, 12, { val: 50, id: 'C', vmax: 10 }); C.add('wire', 8, 12, 2, 12); C.add('switch', 8, 5, 14, 5, { id: 'S2', label: 'اهتزاز' }); C.add('resistor', 14, 5, 14, 8, { val: .01, id: 'R', label: 'R' }); C.add('inductor', 14, 8, 14, 12, { val: .5, id: 'L' }); C.add('wire', 14, 12, 8, 12); },
  controls: [BT('المفتاح', [{ t: '1) شحن المتسعة', cls: 'primary', on: S => { S.C.get('S1').closed = true; S.C.get('S2').closed = false; S.C.beSteps = 2; } }, { t: '2) ربط المحث (اهتزاز)', cls: 'warn', on: S => { S.C.get('S1').closed = false; S.C.get('S2').closed = true; S.C.beSteps = 0; S.C.get('C').buf = []; } }]), R('L', 'L', .05, 2, .5, .01, 'H', (v, S) => S.C.get('L').val = v), R('Cv', 'C', 5, 200, 50, 1, 'µF', (v, S) => S.C.get('C').val = v), R('R', 'مقاومة التخامد R', .01, 50, .01, .01, 'Ω', (v, S) => S.C.get('R').val = v)],
  onReset: S => { S.C.get('C').vPrev = 10; },
  readings(S) { const C = S.C, c = C.get('C'), L = C.get('L'); const UE = .5 * c.val * 1e-6 * c.v * c.v, UB = .5 * L.val * L.i * L.i; return [rd('فرق جهد المتسعة', fmtSI(c.v, 'V')), rd('التيار', fmtSI(L.i, 'A')), rd('UE = ½CV²', fmtSI(UE, 'J')), rd('UB = ½LI²', fmtSI(UB, 'J')), rd('الطاقة الكلية', fmtSI(UE + UB, 'J')), rd('fr = 1/(2π√LC)', fmtSI(1 / (TAU * Math.sqrt(L.val * c.val * 1e-6)), 'Hz'))]; },
  aux(ctx, w, h, S) { const C = S.C, c = C.get('C'), L = C.get('L'); const UE = .5 * c.val * 1e-6 * c.v * c.v, UB = .5 * L.val * L.i * L.i; const T = Math.max(UE + UB, 1e-12), M = .5 * c.val * 1e-6 * 100; const bw = w * .18; [[UE, '#1f5eff', 'UE'], [UB, '#e11d48', 'UB'], [UE + UB, '#d97706', 'الكلية']].forEach(([v, col, n], i) => { const x = w * (.18 + i * .3), hh = (h - 40) * clamp(v / Math.max(M, T), 0, 1); ctx.fillStyle = col; ctx.fillRect(x - bw / 2, h - 22 - hh, bw, hh); ctx.fillStyle = '#7a879f'; ctx.font = 'bold 12px Tajawal'; ctx.textAlign = 'center'; ctx.direction = 'rtl'; ctx.fillText(n, x, h - 6); }); }, auxTitle: 'تبادل الطاقة',
  scope: [{ id: 'C', q: 'v', name: 'V_C', color: '#1f5eff' }, { id: 'L', q: 'i', name: 'I×10', color: '#e11d48', k: 10 }], scopeWin: S => 4 / (1 / (TAU * Math.sqrt(S.C.get('L').val * S.C.get('C').val * 1e-6)))
});

/* ---- resonance ---- */
function resI(S, f) { const C = S.C; const R0 = C.get('R').val, L = C.get('L').val, Cc = C.get('C').val * 1e-6; const Z = Math.hypot(R0, TAU * f * L - 1 / (TAU * f * Cc)); return C.get('AC').val / Math.SQRT2 / Z; }
X({ id: 'resonance', ch: 3, sec: '11-3 / 12-3', page: 117, kind: 'تجربة', title: 'الرنين في دوائر التيار المتناوب وعامل النوعية', desc: 'دائرة RLC متوالية تُغذّى بمذبذب متغير التردد؛ نرسم منحني الرنين (I مقابل f) ونلاحظ تأثير المقاومة في حدّته.', circuit: true, timeScale: .1,
  tools: ['مذبذب كهربائي متغير التردد', 'مقاومة R', 'محث L', 'متسعة C', 'أميتر'],
  steps: ['غيّر التردد تدريجياً وسجّل قراءة الأميتر لكل تردد (أو اضغط «مسح تلقائي للتردد»).', 'لاحظ أن التيار يبلغ أعظم مقدار له عند التردد الرنيني fr حيث XL = XC.', 'قلل المقاومة R ولاحظ ازدياد حدّة منحني الرنين (يزداد عامل النوعية).'],
  concl: ['تحدث حالة الرنين عندما XL = XC فتكون Z = R (أقل ممانعة) ويكون التيار أعظم ما يمكن.', 'fr = 1/(2π√LC) ويمكن تغييره بتغيير L أو C (مبدأ عمل دائرة التنغيم في المستقبلات).', 'عامل النوعية Qf = ωr/Δω = (1/R)√(L/C): كلما صغرت R ضاق نطاق التردد وازدادت حدة المنحني (انتقائية أعلى).'],
  laws: ['reson', 'qf', 'imped'],
  build(C) { acSource(C, 2, 12, 2, 4, 141.4, 159); C.add('ammeter', 2, 4, 7, 4, { id: 'A' }); C.add('resistor', 7, 4, 11, 4, { val: 100, id: 'R' }); C.add('inductor', 11, 4, 16, 4, { val: 2, id: 'L' }); C.add('capacitor', 16, 4, 20, 4, { val: .5, id: 'C', vmax: 400 }); C.add('wire', 20, 4, 20, 12); C.add('wire', 20, 12, 2, 12); },
  controls: [R('f', 'تردد المذبذب f', 20, 400, 159, 1, 'Hz', (v, S) => S.C.get('AC').f = v), R('R', 'المقاومة R', 20, 1000, 100, 5, 'Ω', (v, S) => S.C.get('R').val = v), R('L', 'L', .5, 4, 2, .1, 'H', (v, S) => S.C.get('L').val = v), R('Cv', 'C', .2, 2, .5, .05, 'µF', (v, S) => S.C.get('C').val = v),
    BT('', [{ t: 'مسح تلقائي للتردد', cls: 'primary', on: S => { S.rows = []; const fr = 1 / (TAU * Math.sqrt(S.C.get('L').val * S.C.get('C').val * 1e-6)); for (let k = 0; k <= 24; k++) { const f = fr * (0.3 + 1.4 * k / 24); S.rows.push({ f: +f.toFixed(1), I: +(resI(S, f) * 1000).toFixed(2) }); } Runner.table(Runner.cur, S); } }])],
  readings(S) { const C = S.C; const f = C.get('AC').f, L = C.get('L').val, Cc = C.get('C').val * 1e-6, R0 = C.get('R').val; const fr = 1 / (TAU * Math.sqrt(L * Cc)); return [rd('fr = 1/(2π√LC)', fmtSI(fr, 'Hz')), rd('ωr', fmt(TAU * fr, 4, 'rad/s')), rd('XL', fmtSI(TAU * f * L, 'Ω')), rd('XC', fmtSI(1 / (TAU * f * Cc), 'Ω')), rd('I (الأميتر)', fmtSI(Math.sqrt(C.get('A').i2), 'A')), rd('Qf = (1/R)√(L/C)', fmt(Math.sqrt(L / Cc) / R0, 3)), rd('Δω = R/L', fmt(R0 / L, 3, 'rad/s')), rd('الحالة', Math.abs(f - fr) / fr < .02 ? 'رنين ✓' : f < fr ? 'سعوية (f < fr)' : 'حثية (f > fr)')]; },
  record: S => ({ f: S.C.get('AC').f, I: +(Math.sqrt(S.C.get('A').i2) * 1000).toFixed(2) }), cols: [['f', 'f (Hz)'], ['I', 'I (mA)']],
  graph: { x: 'f', y: 'I', xl: 'التردد f (Hz)', yl: 'التيار I (mA)', theory: (x, S) => resI(S, x) * 1000, xmin: 20, xmax: 400 },
  scope: [{ id: 'A', q: 'i', name: 'I×100', color: '#e11d48', k: 100 }, { id: 'AC', q: 'v', name: 'V', color: '#1f5eff' }], scopeWin: acScopeWin
});

/* ---- RLC parallel ---- */
X({ id: 'rlc_parallel', ch: 3, sec: '13-3', page: 120, kind: 'تجربة', title: 'دائرة تيار متناوب متوازية الربط (R-L-C)', desc: 'مقاومة صرف ومحث صرف ومتسعة صرف مربوطة على التوازي مع مصدر متناوب؛ الفولطية مشتركة والتيارات تجمع اتجاهياً.', circuit: true, timeScale: .1,
  tools: ['مصدر فولطية متناوبة', 'مقاومة صرف 80Ω', 'محث صرف (XL = 20Ω)', 'متسعة صرف (XC = 30Ω)', 'أربعة أميترات'],
  steps: ['سجّل قراءات أميترات الأفرع IR و IL و IC وأميتر التيار الرئيس IT.', 'لاحظ أن IT ≠ IR + IL + IC جبرياً، بل IT = √(IR² + (IC − IL)²).', 'غيّر التردد ولاحظ متى تكون الدائرة حثية (IL > IC) أو سعوية (IC > IL).'],
  concl: ['فروق الجهد متساوية على العناصر المربوطة على التوازي.', 'التيار الرئيس يساوي الجمع الاتجاهي لتيارات الأفرع (قانون كيرشوف الأول بصيغة اتجاهية).', 'tanΦ = (IC − IL)/IR ؛ إذا كان IL > IC فالخواص حثية ويتأخر التيار عن الفولطية.'],
  laws: ['rlcpar', 'kcl', 'xl', 'xc'],
  build(C) { acSource(C, 2, 14, 2, 4, 339.4, 50); C.add('ammeter', 2, 4, 6, 4, { id: 'AT', label: 'IT' }); C.add('wire', 6, 4, 11, 4); C.add('wire', 11, 4, 16, 4);
    C.add('ammeter', 6, 4, 6, 7, { id: 'AR', label: 'IR' }); C.add('resistor', 6, 7, 6, 14, { val: 80, id: 'R' }); C.add('ammeter', 11, 4, 11, 7, { id: 'AL', label: 'IL' }); C.add('inductor', 11, 7, 11, 14, { val: .0637, id: 'L', rs: .5 }); C.get('AC').ph = Math.PI / 2; C.add('ammeter', 16, 4, 16, 7, { id: 'AC2', label: 'IC' }); C.add('capacitor', 16, 7, 16, 14, { val: 106.1, id: 'C', vmax: 340 });
    C.add('wire', 16, 14, 11, 14); C.add('wire', 11, 14, 6, 14); C.add('wire', 6, 14, 2, 14); },
  controls: [R('f', 'التردد f', 10, 150, 50, 1, 'Hz', (v, S) => S.C.get('AC').f = v), R('R', 'R', 20, 300, 80, 1, 'Ω', (v, S) => S.C.get('R').val = v)],
  readings(S) { const C = S.C; const I = id => Math.sqrt(C.get(id).i2); const IR = I('AR'), IL = I('AL'), IC = I('AC2'), IT = I('AT'); return [rd('IR', fmtSI(IR, 'A')), rd('IL', fmtSI(IL, 'A')), rd('IC', fmtSI(IC, 'A')), rd('IT (الأميتر)', fmtSI(IT, 'A')), rd('√(IR²+(IC−IL)²)', fmtSI(Math.hypot(IR, IC - IL), 'A')), rd('IR+IL+IC (جبرياً)', fmtSI(IR + IL + IC, 'A')), rd('Φ', fmt(deg(Math.atan2(IC - IL, IR)), 3, '°')), rd('الخواص', IL > IC ? 'حثية' : IC > IL ? 'سعوية' : 'أومية')]; },
  aux(ctx, w, h, S) { const C = S.C; const I = id => Math.sqrt(C.get(id).i2); const IR = I('AR'), IL = I('AL'), IC = I('AC2'); phasors(ctx, w, h, [{ mag: IR, ph: 0, col: '#16a34a', name: 'IR' }, { mag: IC, ph: Math.PI / 2, col: '#1f5eff', name: 'IC' }, { mag: IL, ph: -Math.PI / 2, col: '#e11d48', name: 'IL' }, { mag: Math.hypot(IR, IC - IL), ph: Math.atan2(IC - IL, IR), col: '#d97706', name: 'IT', w: 3 }], 0, { fixed: 1 }); }, auxTitle: 'المخطط الطوري للتيارات', auxTall: 1
});

/* ======================= الفصل الرابع ======================= */
X({ id: 'em_wave', ch: 4, sec: '3-4 / 4-4', page: 135, kind: 'تجربة', title: 'توليد الموجات الكهرومغناطيسية بالهوائي ثنائي القطب', desc: 'دائرة اهتزاز كهرومغناطيسي (L-C) تغذي هوائياً ثنائي القطب؛ تتذبذب الشحنات فيه فيتولد مجالان كهربائي ومغناطيسي متعامدان ينتشران بسرعة الضوء.',
  tools: ['دائرة اهتزاز مؤلفة من ملف L ومتسعة متغيرة السعة C', 'هوائي ثنائي القطب (ساقان معدنيتان)', 'مصدر طاقة (مضخم)'],
  steps: ['اضبط سعة المتسعة ومعامل حث الملف ولاحظ التردد الرنيني للدائرة المهتزة.', 'لاحظ تذبذب الشحنات بين طرفي الهوائي وانقلاب قطبيتهما كل نصف دورة.', 'لاحظ أن المجال الكهربائي E والمجال المغناطيسي B متعامدان على بعضهما وعلى اتجاه الانتشار ومتفقان بالطور.', 'لاحظ الطول المناسب للهوائي (نصف طول الموجة).'],
  concl: ['الشحنات الكهربائية المعجلة (المتذبذبة) تولد موجات كهرومغناطيسية.', 'الموجة الكهرومغناطيسية تتألف من مجالين كهربائي ومغناطيسي متلازمين متغيرين مع الزمن ومتعامدين ومتفقين بالطور، وهي موجات مستعرضة.', 'تنتشر في الفراغ بسرعة c = 1/√(μ₀ε₀) = 3×10⁸ m/s.', 'fr = 1/(2π√LC) ، λ = c/f ، وطول الهوائي ثنائي القطب ℓ = λ/2.'],
  laws: ['wave', 'cmax', 'ant', 'reson', 'disp'],
  controls: [R('L', 'معامل الحث L', .5, 20, 6.4, .1, 'µH'), R('Cp', 'السعة C', .5, 20, 1.9, .1, 'pF'), TG('showB', 'إظهار المجال المغناطيسي B', true)],
  setup(S) { S.ph = 0; },
  update(S, dt) { S.ph += dt * 2.2; },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const ax = w * .16, cy = h * .5; const ph = S.ph; const q = Math.sin(ph);
    // antenna
    ctx.fillStyle = '#9ca3af'; ctx.fillRect(ax - 4, cy - 120, 8, 104); ctx.fillRect(ax - 4, cy + 16, 8, 104);
    G.glow(ctx, ax, cy - 110, 26, q > 0 ? 'rgba(248,113,113,A)' : 'rgba(96,165,250,A)', Math.abs(q)); G.glow(ctx, ax, cy + 110, 26, q < 0 ? 'rgba(248,113,113,A)' : 'rgba(96,165,250,A)', Math.abs(q));
    G.text(ctx, q > 0 ? '+' : '−', ax, cy - 110, { s: 18, w: 900, c: '#fff' }); G.text(ctx, q > 0 ? '−' : '+', ax, cy + 110, { s: 18, w: 900, c: '#fff' });
    // oscillator box
    ctx.fillStyle = '#1e293b'; rr(ctx, ax - 70, cy - 16, 60, 32, 6); ctx.fill(); G.text(ctx, 'مذبذب LC', ax - 40, cy, { s: 11, c: '#e2e8f0' }); G.wire(ctx, [[ax - 10, cy - 8], [ax, cy - 8], [ax, cy - 16]]); G.wire(ctx, [[ax - 10, cy + 8], [ax, cy + 8], [ax, cy + 16]]);
    // propagating wave (E vertical, B oblique perspective)
    const x0 = ax + 30, x1 = w - 20, lam = 170; const Ea = 90;
    ctx.lineWidth = 2; ctx.strokeStyle = '#fbbf24'; ctx.beginPath();
    for (let x = x0; x < x1; x += 3) { const y = cy - Ea * Math.sin(TAU * (x - x0) / lam - ph); x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
    for (let x = x0 + 10; x < x1; x += 18) { const e = Math.sin(TAU * (x - x0) / lam - ph); G.arrow(ctx, x, cy, x, cy - Ea * e, 'rgba(251,191,36,.45)', 1.2, 5); if (S.p.showB) { const bx = x - 30 * e * .7, by = cy + 40 * e * .7; ctx.strokeStyle = 'rgba(96,165,250,.55)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(bx, by); ctx.stroke(); } }
    if (S.p.showB) { ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = x0; x < x1; x += 3) { const e = Math.sin(TAU * (x - x0) / lam - ph); const X2 = x - 30 * e * .7, Y2 = cy + 40 * e * .7; x === x0 ? ctx.moveTo(X2, Y2) : ctx.lineTo(X2, Y2); } ctx.stroke(); }
    ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x0, cy); ctx.lineTo(x1, cy); ctx.stroke(); ctx.setLineDash([]);
    G.arrow(ctx, x1 - 70, cy + 130, x1 - 10, cy + 130, '#e2e8f0', 2, 8); G.text(ctx, 'اتجاه الانتشار c', x1 - 40, cy + 148, { s: 12 });
    G.text(ctx, 'E', x0 + 40, cy - Ea - 16, { s: 15, w: 900, c: '#fbbf24' }); if (S.p.showB) G.text(ctx, 'B', x0 + 10, cy + 60, { s: 15, w: 900, c: '#60a5fa' });
  },
  readings(S) { const L = S.p.L * 1e-6, C = S.p.Cp * 1e-12; const f = 1 / (TAU * Math.sqrt(L * C)); const lam = 3e8 / f; return [rd('التردد الرنيني fr', fmtSI(f, 'Hz')), rd('الطول الموجي λ = c/f', fmtSI(lam, 'm')), rd('طول الهوائي ℓ = λ/2', fmtSI(lam / 2, 'm')), rd('الهوائي المؤرض λ/4', fmtSI(lam / 4, 'm')), rd('c = 1/√(μ₀ε₀)', fmt(1 / Math.sqrt(4e-7 * Math.PI * 8.854e-12), 4, 'm/s'), 1)]; }
});

X({ id: 'modulation', ch: 4, sec: '5-4 / 7-4', page: 140, kind: 'تجربة', title: 'الإرسال والتسلم والتضمين (AM, FM, PM)', desc: 'تحميل إشارة المعلومات (صوت) على موجة حاملة عالية التردد، ثم تنغيم دائرة الاستقبال إلى تردد المحطة بتغيير سعة المتسعة.',
  tools: ['مذبذب (موجة حاملة)', 'مضخم إشارة صوتية (المعلومات)', 'مُضمِّن', 'هوائي إرسال', 'دائرة تسلم: ملف ومتسعة متغيرة السعة وكاشف'],
  steps: ['اختر نوع التضمين ولاحظ الموجة المضمنة: في AM تتغير سعة الحاملة، في FM يتغير ترددها، وفي PM يتغير طورها وفق الإشارة.', 'غيّر تردد الإشارة الصوتية ونسبة التضمين ولاحظ التغير.', 'في جهاز الاستقبال: غيّر سعة المتسعة المتغيرة حتى يتساوى تردد دائرة الرنين مع تردد المحطة فتستقبل إشارتها بأعظم شدة.'],
  concl: ['التضمين: تحميل الإشارة ذات التردد الواطئ (صوت، صورة) على موجة عالية التردد تسمى الموجة الحاملة.', 'التضمين السعوي AM: تتغير سعة الموجة الحاملة تبعاً لسعة الإشارة المحمولة مع بقاء ترددها ثابتاً.', 'التضمين الترددي FM: يتغير تردد الموجة الحاملة تبعاً لسعة الإشارة مع بقاء سعتها ثابتة.', 'دائرة التسلم تنتقي المحطة عندما يتساوى ترددها الرنيني fr = 1/(2π√LC) مع تردد المحطة.'],
  laws: ['reson', 'wave'],
  controls: [SEL('mode', 'نوع التضمين', [['AM', 'تضمين سعوي AM'], ['FM', 'تضمين ترددي FM'], ['PM', 'تضمين طوري PM']], 'AM'), R('fm', 'تردد الإشارة الصوتية (نسبي)', .5, 3, 1, .1, ''), R('m', 'نسبة التضمين', .1, 1, .6, .05, ''), R('Crx', 'سعة متسعة المستقبل', 50, 400, 160, 1, 'pF')],
  setup(S) { S.ph = 0; },
  update(S, dt) { S.ph += dt; },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const p = S.p; const rows = [['الإشارة (المعلومات)', '#4ade80'], ['الموجة الحاملة', '#60a5fa'], ['الموجة المضمنة ' + p.mode, '#fbbf24']];
    const x0 = 30, x1 = w * .64; const hh = h / 4.4;
    rows.forEach((r, i) => { const cy = 40 + hh * (i + .55); G.text(ctx, r[0], (x0 + x1) / 2, cy - hh * .48, { s: 12, c: r[1] }); ctx.strokeStyle = r[1]; ctx.lineWidth = 1.6; ctx.beginPath();
      for (let x = x0; x <= x1; x++) { const t = (x - x0) / (x1 - x0) * 4 + S.ph * .5; const msg = Math.sin(TAU * p.fm * t * .5); let y;
        if (i === 0) y = msg; else if (i === 1) y = Math.sin(TAU * 12 * t); else { if (p.mode === 'AM') y = (1 + p.m * msg) / (1 + p.m) * Math.sin(TAU * 12 * t); else if (p.mode === 'FM') { y = Math.sin(TAU * 12 * t + p.m * 6 / p.fm * -Math.cos(TAU * p.fm * t * .5)); } else y = Math.sin(TAU * 12 * t + p.m * 2.5 * msg); }
        const Y = cy - y * hh * .36; x === x0 ? ctx.moveTo(x, Y) : ctx.lineTo(x, Y); } ctx.stroke(); });
    // receiver tuning dial
    const rx = w * .83, ry = h * .5; const L = 200e-6; const fr = 1 / (TAU * Math.sqrt(L * p.Crx * 1e-12)) / 1e3; S.fr = fr;
    const st = [[600, 'محطة 1'], [900, 'محطة 2'], [1300, 'محطة 3']]; const Q = 25;
    ctx.fillStyle = '#1e293b'; rr(ctx, rx - 90, 30, 180, h - 60, 12); ctx.fill();
    G.text(ctx, 'جهاز الاستقبال', rx, 50, { s: 13, w: 800 }); G.text(ctx, 'fr = ' + fr.toFixed(0) + ' kHz', rx, 74, { s: 14, mono: 1, c: '#fde68a' });
    let best = 0, bi = -1; st.forEach((s, i) => { const x = s[0] / fr; const resp = 1 / Math.sqrt(1 + Q * Q * (x - 1 / x) ** 2); if (resp > best) { best = resp; bi = i; } const yy = 110 + i * 40; ctx.fillStyle = '#0f172a'; rr(ctx, rx - 70, yy, 140, 30, 6); ctx.fill(); ctx.fillStyle = `rgba(74,222,128,${resp})`; rr(ctx, rx - 70, yy, 140 * resp, 30, 6); ctx.fill(); G.text(ctx, s[1] + ' ' + s[0] + 'kHz', rx, yy + 15, { s: 12, c: '#e2e8f0' }); });
    S.best = best; S.bi = bi;
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x < 140; x++) { const y = ry + 120 - Math.sin(x / 8 + S.ph * 6) * 22 * best * (bi >= 0 ? 1 : 0); x ? ctx.lineTo(rx - 70 + x, y) : ctx.moveTo(rx - 70, y); } ctx.stroke();
    G.text(ctx, 'الصوت المستخلص (بعد الكشف)', rx, ry + 90, { s: 11, c: '#94a3b8' });
  },
  readings(S) { return [rd('تردد رنين المستقبل', fmt(S.fr || 0, 4, 'kHz')), rd('شدة الاستقبال', Math.round((S.best || 0) * 100) + ' %'), rd('المحطة المستقبلة', (S.best || 0) > .7 ? 'محطة ' + (S.bi + 1) : 'لا توجد (غيّر السعة)', 1)]; }
});
