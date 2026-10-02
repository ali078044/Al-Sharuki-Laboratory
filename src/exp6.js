'use strict';
/* ======================= الفصل السادس: الفيزياء الحديثة ======================= */
function planckI(lam, T) { const h = PHY.h, c = PHY.c, k = PHY.kB; return 2 * h * c * c / Math.pow(lam, 5) / (Math.exp(h * c / (lam * k * T)) - 1); }
function tempColor(T) { let s = [0, 0, 0]; for (let nm = 400; nm <= 700; nm += 10) { const v = planckI(nm * 1e-9, T); const c = wlRGB(nm); for (let k = 0; k < 3; k++) s[k] += c[k] * v; } const m = Math.max(...s); return s.map(v => Math.round(v / m * 255)); }

X({ id: 'blackbody', ch: 6, sec: '2-6', page: 177, kind: 'تجربة', title: 'إشعاع الجسم الأسود وفرضية بلانك', desc: 'منحنيات توزيع شدة الإشعاع مع الطول الموجي لجسم أسود عند درجات حرارة مختلفة؛ التحقق من قانوني فين وستيفان-بولتزمان.',
  tools: ['جسم أسود مثالي (تجويف ذو فتحة صغيرة)', 'مصدر تسخين يمكن التحكم بدرجة حرارته', 'مطياف وكاشف إشعاع'],
  steps: ['ارفع درجة حرارة الجسم الأسود ولاحظ ازدياد المساحة تحت المنحني (الشدة الكلية).', 'لاحظ انزياح قمة المنحني λm نحو الأطوال الموجية الأقصر بارتفاع درجة الحرارة.', 'قارن منحني بلانك بتنبؤ الفيزياء الكلاسيكية (رايلي-جينز) الذي يتباعد عند الأطوال القصيرة (كارثة فوق البنفسجي).', 'سجّل λm لعدة درجات حرارة وتحقق من أن λm T ثابت.'],
  concl: ['المعدل الزمني للطاقة التي يشعها الجسم الأسود لوحدة المساحة يتناسب طردياً مع الأس الرابع لدرجة الحرارة المطلقة: I = σT⁴.', 'قانون الإزاحة لفين: λm T = 2.898×10⁻³ m·K.', 'فشلت الفيزياء الكلاسيكية في تفسير المنحني؛ فافترض بلانك أن الطاقة مكمّاة: E = hf.'],
  laws: ['stefan', 'wien', 'planck'],
  controls: [R('T', 'درجة الحرارة T', 1000, 8000, 5000, 50, 'K'), TG('cmp', 'مقارنة مع 4000K و 6000K', true), TG('rj', 'إظهار التنبؤ الكلاسيكي (رايلي-جينز)', false)],
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h, false); const T = S.p.T; const x0 = 60, x1 = w - 30, y0 = h - 50, y1 = 30; const lmax = 3000e-9;
    const Imax = planckI(2.898e-3 / 8000, 8000) * (S.p.cmp ? 1 : planckI(2.898e-3 / T, T) / planckI(2.898e-3 / 8000, 8000)) * 1.08;
    for (let nm = 380; nm <= 750; nm += 2) { const x = x0 + nm * 1e-9 / lmax * (x1 - x0); ctx.fillStyle = wlColor(nm, .18); ctx.fillRect(x, y1, 2.4, y0 - y1); }
    ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
    for (let l = 500; l <= 3000; l += 500) { const x = x0 + l * 1e-9 / lmax * (x1 - x0); G.text(ctx, l + '', x, y0 + 14, { s: 10, mono: 1, c: '#94a3b8' }); }
    G.text(ctx, 'الطول الموجي (nm)', (x0 + x1) / 2, y0 + 32, { s: 11, c: '#cbd5e1' });
    const curve = (TT, col, lw) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); for (let x = x0 + 1; x <= x1; x += 2) { const l = (x - x0) / (x1 - x0) * lmax; const y = y0 - planckI(l, TT) / Imax * (y0 - y1); x === x0 + 1 ? ctx.moveTo(x, y) : ctx.lineTo(x, Math.max(y1 - 5, y)); } ctx.stroke(); const lm = 2.898e-3 / TT; const xm = x0 + lm / lmax * (x1 - x0); const ym = y0 - planckI(lm, TT) / Imax * (y0 - y1); ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(xm, ym); ctx.lineTo(xm, y0); ctx.stroke(); ctx.setLineDash([]); G.text(ctx, TT + 'K', xm + 26, ym - 8, { s: 11, c: col }); };
    if (S.p.cmp) { curve(4000, '#f97316', 1.4); curve(6000, '#facc15', 1.4); }
    curve(T, '#f472b6', 2.6);
    if (S.p.rj) { ctx.strokeStyle = '#60a5fa'; ctx.setLineDash([6, 4]); ctx.lineWidth = 1.8; ctx.beginPath(); let st = false; for (let x = x0 + 4; x <= x1; x += 2) { const l = (x - x0) / (x1 - x0) * lmax; const I = 2 * PHY.c * PHY.kB * T / Math.pow(l, 4); const y = y0 - I / Imax * (y0 - y1); if (y < y1) { st = false; continue; } st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } ctx.stroke(); ctx.setLineDash([]); G.text(ctx, 'رايلي-جينز (كلاسيكي)', x0 + 120, y1 + 14, { s: 11, c: '#93c5fd' }); }
    const c = tempColor(T); G.glow(ctx, x1 - 50, y1 + 50, 46, `rgba(${c},A)`, .9); ctx.fillStyle = `rgb(${c})`; ctx.beginPath(); ctx.arc(x1 - 50, y1 + 50, 20, 0, TAU); ctx.fill(); G.text(ctx, 'لون الجسم', x1 - 50, y1 + 92, { s: 11 });
  },
  readings(S) { const T = S.p.T; const lm = 2.898e-3 / T; return [rd('λm = 2.898×10⁻³/T', fmtSI(lm, 'm')), rd('I = σT⁴', fmtSI(PHY.sigma * T ** 4, 'W/m²')), rd('طاقة فوتون عند λm', fmt(PHY.h * PHY.c / lm / PHY.e, 3, 'eV')), rd('منطقة λm', lm < 380e-9 ? 'فوق البنفسجي' : lm < 750e-9 ? 'مرئي' : 'تحت الأحمر')]; },
  record(S) { const T = S.p.T; return { T, lm: +(2.898e-3 / T * 1e9).toFixed(1), lT: 2.898e-3 }; }, cols: [['T', 'T (K)'], ['lm', 'λm (nm)'], ['lT', 'λm·T (m·K)']],
  graph: { x: 'T', y: 'lm', xl: 'T (K)', yl: 'λm (nm)', theory: x => 2.898e-3 / x * 1e9, xmin: 900, xmax: 8200, ymax: () => 3200 }
});

/* ---- photoelectric (activity) ---- */
const METALS = [['Na', 'الصوديوم', 2.46], ['K', 'البوتاسيوم', 2.3], ['Cs', 'السيزيوم', 2.14], ['Ca', 'الكالسيوم', 2.87], ['Zn', 'الخارصين', 4.31], ['Cu', 'النحاس', 4.7], ['Pt', 'البلاتين', 6.35]];
function peCalc(S) { const p = S.p; const W = METALS.find(m => m[0] === p.metal)[2]; const E = 1240 / p.lam; const KE = E - W; const Vs = Math.max(0, KE); let I = 0; const Isat = p.I / 100 * 50e-6; if (KE > 0) { if (p.V >= 0) I = Isat * (1 - .25 * Math.exp(-p.V / .6)); else I = -p.V < Vs ? Isat * .75 * Math.pow((Vs + p.V) / Vs, 1.5) : 0; } return { W, E, KE, Vs, I, f0: W * PHY.e / PHY.h, l0: 1240 / W }; }
X({ id: 'photoelectric', ch: 6, sec: '3-6', page: 180, kind: 'نشاط', title: 'نشاط: تجربة لدراسة الظاهرة الكهروضوئية', desc: 'خلية كهروضوئية يسقط على لوحها الباعث ضوء بتردد وشدة قابلين للتغيير؛ نقيس التيار الكهروضوئي ونعيّن جهد القطع وتردد العتبة.',
  tools: ['خلية كهروضوئية (أنبوبة مفرغة من الهواء فيها لوح باعث (كاثود) ولوح جامع (أنود))', 'فولطميتر (V)', 'أميتر (A)', 'مصدر فولطية مستمرة يمكن تغيير جهده وعكس قطبيته', 'مصدر ضوئي', 'أسلاك توصيل'],
  steps: ['نربط الدائرة الكهربائية كما في الشكل.', 'عند وضع الأنبوبة بالظلام نلاحظ أن قراءة الأميتر تساوي صفراً؛ أي لا يمر تيار في الدائرة.', 'عند إضاءة اللوح الباعث للإلكترونات بضوء ذي تردد مؤثر نلاحظ انحراف مؤشر الأميتر؛ إن هذا التيار يظهر نتيجة انبعاث الإلكترونات الضوئية من اللوح الباعث.', 'عند زيادة فرق الجهد الموجب للوح الجامع نلاحظ أن التيار يزداد حتى يصل إلى مقداره الأعظم (تيار الإشباع).', 'نجعل اللوح الجامع سالباً بالنسبة للباعث ونزيد الجهد السالب تدريجياً حتى تصبح قراءة الأميتر صفراً؛ هذا الجهد يسمى جهد القطع (الإيقاف) Vs.', 'غيّر شدة الضوء وتردده ومعدن الباعث وسجّل النتائج.'],
  concl: ['أولاً: عند زيادة شدة الضوء الساقط (بتردد معين مؤثر) نلاحظ زيادة تيار الإشباع بزيادة شدة الضوء.', 'ثانياً: جهد القطع لا يعتمد على شدة الضوء، بل يعتمد على تردده: (KE)max = eVs.', 'ثالثاً: لا تنبعث إلكترونات إذا كان تردد الضوء أقل من تردد العتبة f₀ مهما كانت شدته.', 'معادلة أينشتاين: (KE)max = hf − W ، حيث W = hf₀ دالة الشغل للمعدن.', 'الانبعاث آني (أقل من 10⁻⁹s) ولا يحتاج زمناً لتجميع الطاقة — ما لا تفسره النظرية الموجية.'],
  laws: ['photo', 'planck'],
  controls: [R('lam', 'الطول الموجي للضوء λ', 150, 700, 300, 1, 'nm'), R('I', 'شدة الضوء', 0, 100, 60, 1, '%'), R('V', 'فرق الجهد (الجامع − الباعث)', -6, 6, 2, .05, 'V'), SEL('metal', 'معدن اللوح الباعث', METALS.map(m => [m[0], m[1] + ' (W=' + m[2] + 'eV)']), 'Na'),
    BT('', [{ t: 'مسح منحني I–V تلقائياً', cls: 'primary', on: S => { S.rows = []; const v0 = S.p.V; for (let v = -4; v <= 4.01; v += .25) { S.p.V = v; const r0 = peCalc(S); S.rows.push({ V: +v.toFixed(2), I: +(r0.I * 1e6).toFixed(3), f: +(PHY.c / (S.p.lam * 1e-9) / 1e14).toFixed(3), KE: +Math.max(0, r0.KE).toFixed(3) }); } S.p.V = v0; Runner.table(Runner.cur, S); } }])],
  setup(S) { S.els = []; },
  update(S, dt) { const r = peCalc(S); const rate = r.KE > 0 ? S.p.I / 100 * 40 : 0; S.acc = (S.acc || 0) + rate * dt; while (S.acc > 1) { S.acc--; S.els.push({ x: 0, y: Math.random(), v: Math.sqrt(Math.max(r.KE, 0)) * (.6 + .4 * Math.random()) }); } S.els.forEach(e => { const a = S.p.V * .9; e.v += a * dt; e.x += e.v * dt * .8; }); S.els = S.els.filter(e => e.x >= -.02 && e.x < 1.02); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const r = peCalc(S); const cx = w * .45, cy = h * .4, tw = Math.min(w * .5, 360), th = 150;
    ctx.fillStyle = 'rgba(200,230,255,.08)'; ctx.strokeStyle = 'rgba(200,230,255,.5)'; ctx.lineWidth = 2; rr(ctx, cx - tw / 2, cy - th / 2, tw, th, 70); ctx.fill(); ctx.stroke();
    const kx = cx - tw / 2 + 40, ax = cx + tw / 2 - 40;
    ctx.fillStyle = '#a3a3a3'; rr(ctx, kx - 8, cy - 55, 16, 110, 4); ctx.fill(); ctx.fillStyle = '#d4a017'; ctx.fillRect(ax - 4, cy - 50, 8, 100);
    G.text(ctx, 'الباعث (−)', kx, cy + 72, { s: 11 }); G.text(ctx, 'الجامع', ax, cy + 72, { s: 11 });
    // light beam
    const lc = S.p.lam < 380 ? 'rgba(180,120,255,' : wlColor(S.p.lam).replace(/[\d.]+\)$/, ''); const a = S.p.I / 100;
    for (let k = 0; k < 5; k++) { const y = cy - 40 + k * 20; ctx.strokeStyle = (S.p.lam < 380 ? `rgba(180,120,255,${.3 + .6 * a})` : wlColor(S.p.lam, .3 + .6 * a)); ctx.lineWidth = 2; ctx.beginPath(); for (let t = 0; t <= 1; t += .02) { const x = kx - 140 + t * 130, yy = y - 60 + t * 60 + Math.sin(t * 60 - S.t * 20) * 4; t ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); }
    void lc; G.text(ctx, S.p.lam < 380 ? 'فوق البنفسجي' : 'λ = ' + S.p.lam + 'nm', kx - 110, cy - 110, { s: 12, c: '#e9d5ff' });
    S.els.forEach(e => { ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.arc(kx + 10 + e.x * (ax - kx - 18), cy - 45 + e.y * 90, 3, 0, TAU); ctx.fill(); });
    // circuit
    const by = h * .82; G.wire(ctx, [[kx, cy + 55], [kx, by], [cx - 60, by]]); G.wire(ctx, [[ax, cy + 50], [ax, by], [cx + 60, by]]);
    ctx.fillStyle = '#1f2937'; rr(ctx, cx - 60, by - 18, 120, 36, 6); ctx.fill(); G.text(ctx, (S.p.V >= 0 ? '+' : '') + S.p.V.toFixed(2) + ' V', cx, by, { s: 13, mono: 1, c: '#fde68a' });
    G.meter(ctx, w * .85, h * .3, 30, r.I * 1e6, 60, 'µA', fmt(r.I * 1e6, 3) + ' µA');
    if (r.KE <= 0) G.text(ctx, 'f < f₀ : لا تنبعث إلكترونات مهما كانت الشدة', cx, 30, { s: 13, w: 800, c: '#fca5a5', bg: 'rgba(15,23,42,.7)' });
  },
  readings(S) { const r = peCalc(S); return [rd('طاقة الفوتون hf', fmt(r.E, 3, 'eV')), rd('دالة الشغل W', fmt(r.W, 3, 'eV')), rd('(KE)max = hf − W', r.KE > 0 ? fmt(r.KE, 3, 'eV') : 'لا انبعاث'), rd('جهد القطع Vs', r.KE > 0 ? fmt(r.KE, 3, 'V') : '—'), rd('تردد العتبة f₀', fmtSI(r.f0, 'Hz')), rd('طول موجة العتبة λ₀', fmt(r.l0, 4, 'nm')), rd('تردد الضوء f', fmtSI(PHY.c / (S.p.lam * 1e-9), 'Hz')), rd('التيار الكهروضوئي', fmtSI(r.I, 'A'))]; },
  record(S) { const r = peCalc(S); return { V: S.p.V, I: +(r.I * 1e6).toFixed(3), f: +(PHY.c / (S.p.lam * 1e-9) / 1e14).toFixed(3), KE: +Math.max(0, r.KE).toFixed(3) }; }, cols: [['V', 'V (V)'], ['I', 'I (µA)'], ['f', 'f (×10¹⁴Hz)'], ['KE', 'KEmax (eV)']],
  graph: { x: 'V', y: 'I', xl: 'فرق الجهد V', yl: 'I (µA)', xmin: -6, xmax: 6, theory: (x, S) => { const v0 = S.p.V; S.p.V = x; const I = peCalc(S).I * 1e6; S.p.V = v0; return I; }, x0zero: false }
});

/* ---- de Broglie ---- */
X({ id: 'debroglie', ch: 6, sec: '5-6', page: 187, kind: 'تجربة', title: 'الموجات المادية (دي برولي) وحيود الإلكترونات', desc: 'حزمة إلكترونات معجلة بفرق جهد V تسقط على بلورة (شبكية)؛ يظهر نمط حيود يثبت الطبيعة الموجية للجسيمات.',
  tools: ['مدفع إلكتروني بفرق جهد تعجيل V', 'رقيقة بلورية (غرافيت)', 'شاشة متوهجة'],
  steps: ['زد فرق جهد التعجيل V ولاحظ أن حلقات الحيود تصغر (λ يقل).', 'احسب λ من λ = h/p = h/√(2meV).', 'قارن طول موجة الإلكترون بطول موجة كرة تنس أو جسم كبير.'],
  concl: ['لكل جسيم متحرك موجة مرافقة طولها λ = h/p = h/mv (فرضية دي برولي).', 'الطبيعة الموجية تظهر بوضوح للجسيمات الصغيرة جداً (الإلكترونات) لأن λ مقاربة للمسافات بين ذرات البلورة.', 'للأجسام الكبيرة λ صغيرة جداً فلا تظهر خواصها الموجية.'],
  laws: ['debroglie', 'heis'],
  controls: [R('V', 'فرق جهد التعجيل V', 20, 5000, 150, 10, 'V'), SEL('part', 'الجسيم', [['e', 'إلكترون'], ['p', 'بروتون']], 'e')],
  lam(S) { const m = S.p.part === 'e' ? PHY.me : 1.67e-27; return PHY.h / Math.sqrt(2 * m * PHY.e * S.p.V); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const l = this.lam(S); const cx = w * .62, cy = h * .5; const d = 2.13e-10; const R0 = Math.min(w, h) * .4;
    ctx.fillStyle = '#0b1a10'; ctx.beginPath(); ctx.arc(cx, cy, R0, 0, TAU); ctx.fill(); G.glow(ctx, cx, cy, 30, 'rgba(134,239,172,A)', 1);
    [1, 1.73].forEach((f, i) => { const s = l / (2 * d / f); if (s >= 1) return; const th = 2 * Math.asin(s); const r = Math.tan(th) * R0 * .9; if (r > R0) return; ctx.strokeStyle = `rgba(134,239,172,${.8 - i * .25})`; ctx.lineWidth = 5 - i * 1.5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke(); });
    ctx.fillStyle = '#334155'; rr(ctx, 20, cy - 18, 90, 36, 6); ctx.fill(); G.text(ctx, 'مدفع', 65, cy, { s: 12 });
    const lamPx = clamp(l * 1e11 * 2.2, 3, 60); ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 110; x < cx - R0 - 10; x++) { const y = cy + 12 * Math.sin((x - S.t * 80) / lamPx * TAU); x === 110 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
    ctx.fillStyle = '#a3a3a3'; ctx.fillRect(cx - R0 - 14, cy - 40, 6, 80); G.text(ctx, 'بلورة', cx - R0 - 11, cy + 54, { s: 11 });
  },
  readings(S) { const l = this.lam(S); const m = S.p.part === 'e' ? PHY.me : 1.67e-27; const v = Math.sqrt(2 * PHY.e * S.p.V / m); return [rd('السرعة v', fmtSI(v, 'm/s')), rd('الزخم p = mv', fmt(m * v, 3, 'kg·m/s')), rd('λ = h/p', fmtSI(l, 'm')), rd('λ لكرة 0.06kg بسرعة 30m/s', fmt(PHY.h / (.06 * 30), 3, 'm'))]; }
});

/* ---- Special relativity ---- */
X({ id: 'relativity', ch: 6, sec: '8-6 / 11-6', page: 193, kind: 'تجربة', title: 'النظرية النسبية الخاصة: تمدد الزمن وتقلص الطول', desc: 'مركبة فضائية تتحرك بسرعة v قريبة من سرعة الضوء؛ نقارن الزمن والطول والكتلة بين إطار المركبة وإطار الراصد الساكن.',
  tools: ['إطار إسناد ساكن S (الراصد على الأرض)', 'إطار إسناد متحرك S′ (المركبة) بسرعة منتظمة v', 'ساعتان متماثلتان'],
  steps: ['زد سرعة المركبة ولاحظ تغير عامل لورنز γ.', 'قارن قراءة ساعة المركبة (الزمن الحقيقي t₀) بساعة الأرض (t = γt₀).', 'لاحظ تقلص طول المركبة باتجاه الحركة كما يقيسه الراصد الساكن: L = L₀/γ.'],
  concl: ['فرضيتا أينشتاين: قوانين الفيزياء واحدة في جميع الأطر القصورية، وسرعة الضوء في الفراغ ثابتة لجميع الراصدين.', 'تمدد الزمن: t = γ t₀ ؛ الساعة المتحركة تبدو أبطأ.', 'تقلص الطول: L = L₀/γ باتجاه الحركة فقط.', 'الكتلة النسبية m = γm₀ ، وتكافؤ الكتلة والطاقة E = mc².', 'عند السرعات الصغيرة γ ≈ 1 وتؤول النتائج إلى الميكانيك الكلاسيكي.'],
  laws: ['gamma', 'emc2'],
  controls: [R('b', 'السرعة v/c', 0, .995, .8, .005, '', null, v => v.toFixed(3) + ' c')],
  setup(S) { S.t0 = 0; S.te = 0; },
  update(S, dt) { const g = 1 / Math.sqrt(1 - S.p.b ** 2); S.te += dt; S.t0 += dt / g; S.x = ((S.x || 0) + S.p.b * dt * 180); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); for (let i = 0; i < 60; i++) { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect((i * 97 + 13) % w, (i * 53 + 7) % h, 1.5, 1.5); }
    const g = 1 / Math.sqrt(1 - S.p.b ** 2); const L0 = Math.min(260, w * .4); const L = L0 / g; const cy = h * .38; const x = ((S.x % (w + L)) + w + L) % (w + L) - L;
    ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.moveTo(x, cy - 24); ctx.lineTo(x + L * .8, cy - 24); ctx.lineTo(x + L, cy); ctx.lineTo(x + L * .8, cy + 24); ctx.lineTo(x, cy + 24); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(x, cy - 16); ctx.lineTo(x - 26 * S.p.b - 4, cy); ctx.lineTo(x, cy + 16); ctx.fill();
    ctx.fillStyle = '#1e3a8a'; ctx.fillRect(x + L * .55, cy - 10, L * .12, 20);
    const clock = (cx, cy2, t, name, col) => { ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy2, 44, 0, TAU); ctx.stroke(); const a = t * TAU / 10 - Math.PI / 2; G.arrow(ctx, cx, cy2, cx + Math.cos(a) * 36, cy2 + Math.sin(a) * 36, col, 3, 8); G.text(ctx, name, cx, cy2 + 62, { s: 12 }); G.text(ctx, t.toFixed(2) + ' s', cx, cy2 + 80, { s: 13, mono: 1, c: col }); };
    clock(w * .3, h * .72, S.te, 'ساعة الأرض t', '#fde68a'); clock(w * .7, h * .72, S.t0, 'ساعة المركبة t₀', '#7dd3fc');
    G.text(ctx, 'L = ' + (100 / g).toFixed(1) + ' m (L₀ = 100 m)', w * .5, 26, { s: 13, c: '#e2e8f0', bg: 'rgba(15,23,42,.7)' });
  },
  readings(S) { const b = S.p.b, g = 1 / Math.sqrt(1 - b * b); return [rd('عامل لورنز γ', fmt(g, 4)), rd('t لكل 1s من t₀', fmt(g, 4, 's')), rd('L لمركبة L₀=100m', fmt(100 / g, 4, 'm')), rd('m لجسيم m₀=1kg', fmt(g, 4, 'kg')), rd('الطاقة الحركية (γ−1)m₀c² لكل kg', fmt((g - 1) * 9e16, 3, 'J'), 1)]; },
  live: { title: 'γ مقابل v/c', data: S => { const pts = []; for (let b = 0; b < .996; b += .005) pts.push([b, 1 / Math.sqrt(1 - b * b)]); return { series: [{ pts, color: '#1f5eff', name: 'γ' }, { pts: [[S.p.b, 1 / Math.sqrt(1 - S.p.b ** 2)]], type: 'pts', color: '#e11d48' }], opts: { xl: 'v/c', ymax: 10, ymin: 0 } }; } }
});
