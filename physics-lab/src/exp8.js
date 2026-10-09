'use strict';
/* ======================= الفصل الثامن: الأطياف الذرية والليزر ======================= */
const SERIES = { 1: 'لايمان (فوق البنفسجي)', 2: 'بالمر (مرئي)', 3: 'باشن (تحت الأحمر)', 4: 'براكت (تحت الأحمر)', 5: 'فوند (تحت الأحمر)' };
X({ id: 'bohr', ch: 8, sec: '3-8 / 4-8', page: 226, kind: 'تجربة', title: 'نموذج بور لذرة الهيدروجين والمتسلسلات الطيفية', desc: 'إلكترون يدور في مدارات مسموحة؛ عند انتقاله من مستوى أعلى إلى أدنى يبعث فوتوناً طاقته تساوي فرق الطاقة بين المستويين.',
  tools: ['نموذج ذرة الهيدروجين (بور)', 'مخطط مستويات الطاقة', 'مطياف'],
  steps: ['اختر المستوى الابتدائي ni والنهائي nf واضغط «انتقال»؛ لاحظ الفوتون المنبعث ولونه.', 'لاحظ أن الانتقالات إلى n = 2 تعطي خطوط بالمر المرئية.', 'اضغط «إثارة» لامتصاص فوتون ورفع الإلكترون إلى مستوى أعلى.', 'احسب الطول الموجي من 1/λ = RH(1/nf² − 1/ni²).'],
  concl: ['الإلكترون يدور في مدارات محددة دون أن يشع، والزخم الزاوي مكمّى: L = nh/2π.', 'طاقة المستوى En = −13.6/n² eV.', 'عند الانتقال من مستوى أعلى إلى أدنى يبعث فوتون: hf = Ei − Ef.', 'المتسلسلات: لايمان (nf=1)، بالمر (nf=2)، باشن (nf=3)، براكت (nf=4)، فوند (nf=5).'],
  laws: ['bohrE', 'trans', 'planck'],
  controls: [SEL('ni', 'المستوى الابتدائي ni', [2, 3, 4, 5, 6, 7].map(n => [n, 'n = ' + n]), 3), SEL('nf', 'المستوى النهائي nf', [1, 2, 3, 4, 5].map(n => [n, 'n = ' + n + ' — ' + SERIES[n]]), 2), BT('', [{ t: 'انتقال (انبعاث)', cls: 'primary', on: S => bohrGo(S, false) }, { t: 'إثارة (امتصاص)', on: S => bohrGo(S, true) }])],
  setup(S) { S.n = 3; S.ph = []; S.ang = 0; S.lines = []; },
  update(S, dt) { S.ang += dt * 3 / S.n ** 1.5 * 4; if (S.tr) { S.tr.k += dt * 1.6; if (S.tr.k >= 1) { S.n = S.tr.to; if (!S.tr.abs) S.ph.push({ r: 0, a: S.ang, nm: S.tr.nm }); S.tr = null; } } S.ph.forEach(p => p.r += dt * 260); S.ph = S.ph.filter(p => p.r < 900); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const cx = w * .33, cy = h * .5; const rs = n => Math.min(w * .3, h * .45) * n * n / 49 + 10;
    for (let n = 1; n <= 7; n++) { ctx.strokeStyle = n === S.n ? 'rgba(125,211,252,.8)' : 'rgba(148,163,184,.22)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, rs(n), 0, TAU); ctx.stroke(); if (n <= 4) G.text(ctx, 'n=' + n, cx + rs(n) + 2, cy - 8, { s: 10, c: '#94a3b8', a: 'left' }); }
    G.glow(ctx, cx, cy, 16, 'rgba(248,113,113,A)', 1); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, TAU); ctx.fill();
    let r = rs(S.n); if (S.tr) r = lerp(rs(S.tr.from), rs(S.tr.to), S.tr.k);
    ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.arc(cx + Math.cos(S.ang) * r, cy + Math.sin(S.ang) * r, 5, 0, TAU); ctx.fill();
    S.ph.forEach(p => { const col = p.nm < 380 ? '#c084fc' : p.nm > 750 ? '#f87171' : wlColor(p.nm); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); const x0 = cx + Math.cos(p.a) * 20, y0 = cy + Math.sin(p.a) * 20; for (let s = 0; s < 60; s++) { const d = p.r + s; const x = x0 + Math.cos(p.a) * d - Math.sin(p.a) * Math.sin(s * .5) * 5, y = y0 + Math.sin(p.a) * d + Math.cos(p.a) * Math.sin(s * .5) * 5; s ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); });
    // energy diagram
    const ex = w * .7, ew = w * .25, top = 40, bot = h - 60; const Y = E => top + (E / -13.6) * (bot - top);
    for (let n = 1; n <= 7; n++) { const E = -13.6 / (n * n); ctx.strokeStyle = n === S.n ? '#7dd3fc' : '#94a3b8'; ctx.lineWidth = n === S.n ? 3 : 1.4; ctx.beginPath(); ctx.moveTo(ex, Y(E)); ctx.lineTo(ex + ew, Y(E)); ctx.stroke(); if (n <= 5) G.text(ctx, E.toFixed(2) + ' eV', ex - 6, Y(E), { s: 10, a: 'right', mono: 1, c: '#cbd5e1' }); }
    G.text(ctx, '0 eV (التأين)', ex + ew / 2, top - 12, { s: 10, c: '#94a3b8' });
    S.lines.slice(-6).forEach((l, i) => { const x = ex + 14 + i * (ew - 20) / 6; G.arrow(ctx, x, Y(-13.6 / l.ni ** 2), x, Y(-13.6 / l.nf ** 2), l.nm < 380 ? '#c084fc' : l.nm > 750 ? '#f87171' : wlColor(l.nm), 2, 7); });
    // spectrum strip
    const sx0 = 20, sx1 = w * .6, sy = h - 34; ctx.fillStyle = '#000'; ctx.fillRect(sx0, sy, sx1 - sx0, 22); S.lines.forEach(l => { if (l.nm < 380 || l.nm > 750) return; const x = sx0 + (l.nm - 380) / 370 * (sx1 - sx0); ctx.fillStyle = wlColor(l.nm); ctx.fillRect(x - 1.5, sy, 3, 22); }); G.text(ctx, 'الطيف المرئي المسجّل', (sx0 + sx1) / 2, sy - 10, { s: 11, c: '#94a3b8' });
  },
  readings(S) { const ni = +S.p.ni, nf = +S.p.nf; if (ni <= nf) return [rd('تنبيه', 'اختر ni > nf للانبعاث', 1)]; const dE = 13.6 * (1 / nf ** 2 - 1 / ni ** 2); const nm = 1240 / dE; return [rd('Ei', fmt(-13.6 / ni ** 2, 3, 'eV')), rd('Ef', fmt(-13.6 / nf ** 2, 3, 'eV')), rd('طاقة الفوتون hf', fmt(dE, 3, 'eV')), rd('الطول الموجي λ', fmt(nm, 1, 'nm')), rd('التردد f', fmtSI(dE * PHY.e / PHY.h, 'Hz')), rd('المتسلسلة', SERIES[nf]), rd('نصف قطر المدار الحالي rn = n²×0.053nm', fmt(.053 * S.n ** 2, 3, 'nm'), 1)]; }
});
function bohrGo(S, abs) { const ni = +S.p.ni, nf = +S.p.nf; if (ni <= nf) return; if (abs) { S.tr = { from: nf, to: ni, k: 0, abs: true }; return; } const nm = 1240 / (13.6 * (1 / nf ** 2 - 1 / ni ** 2)); S.n = ni; S.tr = { from: ni, to: nf, k: 0, nm }; S.lines.push({ ni, nf, nm }); }

/* ---- Spectra activity ---- */
const LINES = { H: [656.3, 486.1, 434.0, 410.2], He: [706.5, 667.8, 587.6, 501.6, 492.2, 471.3, 447.1], Na: [589.0, 589.6, 568.8, 498.3], Hg: [579.1, 577.0, 546.1, 435.8, 404.7], Ne: [703.2, 692.9, 667.8, 650.6, 640.2, 633.4, 621.7, 614.3, 609.6, 594.5, 588.2, 585.2] };
X({ id: 'spectra', ch: 8, sec: '5-8', page: 232, kind: 'نشاط', title: 'نشاط: أنواع الأطياف (الانبعاث المستمر والخطي وطيف الامتصاص)', desc: 'فحص مصادر ضوئية مختلفة بالمطياف: مصباح متوهج (طيف مستمر)، مصابيح غازية (طيف خطي انبعاثي)، وضوء أبيض يمر خلال غاز بارد (طيف امتصاص).',
  tools: ['مطياف (منشور أو محزز حيود)', 'مصباح متوهج (ضوء أبيض)', 'أنابيب تفريغ غازية (هيدروجين، هيليوم، صوديوم، زئبق، نيون)', 'مجهز فولطية عالية'],
  steps: ['انظر خلال المطياف إلى المصباح المتوهج: تشاهد طيفاً مستمراً فيه جميع الألوان.', 'انظر إلى أنبوب الغاز المتوهج: تشاهد خطوطاً ملونة منفصلة على خلفية مظلمة (طيف انبعاث خطي).', 'مرر الضوء الأبيض خلال الغاز البارد: تشاهد طيفاً مستمراً تتخلله خطوط مظلمة في مواقع الخطوط الانبعاثية نفسها (طيف امتصاص).', 'قارن أطياف الغازات المختلفة.'],
  concl: ['الأجسام الصلبة والسوائل والغازات تحت ضغط عالٍ الساخنة تعطي طيفاً مستمراً.', 'الغاز المتوهج تحت ضغط منخفض يعطي طيفاً خطياً انبعاثياً مميزاً لكل عنصر (بصمة العنصر).', 'الغاز البارد يمتص الأطوال الموجية نفسها التي يبعثها عندما يتوهج فتظهر خطوط مظلمة (طيف الامتصاص) — مثل خطوط فراونهوفر في طيف الشمس.', 'يستعمل التحليل الطيفي في معرفة تركيب المواد والنجوم.'],
  laws: ['trans', 'planck', 'grating'],
  controls: [SEL('type', 'نوع الطيف', [['cont', 'طيف انبعاث مستمر (مصباح متوهج)'], ['emit', 'طيف انبعاث خطي (غاز متوهج)'], ['abs', 'طيف امتصاص (ضوء أبيض خلال غاز بارد)']], 'emit'), SEL('gas', 'الغاز', [['H', 'الهيدروجين'], ['He', 'الهيليوم'], ['Na', 'الصوديوم'], ['Hg', 'الزئبق'], ['Ne', 'النيون']], 'H')],
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const p = S.p; const L = LINES[p.gas]; const cy = h * .32;
    // source
    const col = p.type === 'cont' ? '#fff4c2' : { H: '#ff5ab4', He: '#ffd8a8', Na: '#ffc83d', Hg: '#b4c8ff', Ne: '#ff6a2a' }[p.gas];
    if (p.type !== 'abs') { G.glow(ctx, 70, cy, 50, hexA(col.length === 7 ? col : '#ffffff'), .9); ctx.fillStyle = col; rr(ctx, 50, cy - 40, 40, 80, 18); ctx.fill(); }
    else { G.glow(ctx, 50, cy, 40, 'rgba(255,244,194,A)', .9); setRaw(ctx, 1); ctx.fillStyle = '#fff4c2'; setRaw(ctx, 0); ctx.beginPath(); ctx.arc(50, cy, 16, 0, TAU); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.strokeRect(90, cy - 30, 70, 60); G.text(ctx, 'غاز بارد', 125, cy + 44, { s: 11 }); }
    // prism
    const px = w * .38; ctx.fillStyle = 'rgba(200,230,255,.18)'; ctx.strokeStyle = 'rgba(200,230,255,.7)'; ctx.beginPath(); ctx.moveTo(px, cy - 60); ctx.lineTo(px + 60, cy + 45); ctx.lineTo(px - 60, cy + 45); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(p.type === 'abs' ? 160 : 90, cy); ctx.lineTo(px - 28, cy); ctx.stroke();
    // spectrum
    const x0 = 30, x1 = w - 30, y0 = h * .62, hh = h * .22; const X = nm => x0 + (nm - 380) / 370 * (x1 - x0);
    for (let x = x0; x < x1; x++) { const nm = 380 + (x - x0) / (x1 - x0) * 370; let a = 0; if (p.type === 'cont') a = 1; if (p.type === 'abs') { a = 1; L.forEach(l => { a *= 1 - .92 * Math.exp(-(((nm - l) / 1.3) ** 2)); }); } ctx.fillStyle = a > 0 ? wlColor(nm, a) : '#000'; ctx.fillRect(x, y0, 1.3, hh); }
    if (p.type === 'emit') L.forEach(l => { ctx.fillStyle = wlColor(l); ctx.fillRect(X(l) - 1.5, y0, 3, hh); G.glow(ctx, X(l), y0 + hh / 2, 16, hexA('#ffffff'), .15); });
    for (let nm = 400; nm <= 750; nm += 50) G.text(ctx, nm + '', X(nm), y0 + hh + 14, { s: 10, mono: 1, c: '#94a3b8' });
    if (p.type !== 'cont') L.forEach(l => G.text(ctx, l.toFixed(0), X(l), y0 - 10, { s: 9, mono: 1, c: '#cbd5e1' }));
    G.text(ctx, 'nm', x1 + 12, y0 + hh + 14, { s: 10, c: '#94a3b8' });
  },
  readings(S) { const L = LINES[S.p.gas]; return [rd('نوع الطيف', { cont: 'مستمر', emit: 'خطي انبعاثي', abs: 'خطي امتصاصي' }[S.p.type]), rd('عدد الخطوط المرئية', S.p.type === 'cont' ? '—' : L.length + ''), rd('الأطوال الموجية (nm)', S.p.type === 'cont' ? 'جميع الأطوال 380–750' : L.join(' ، '), 1)]; }
});

/* ---- X-rays ---- */
X({ id: 'xray', ch: 8, sec: '6-8', page: 236, kind: 'تجربة', title: 'الأشعة السينية: توليدها وطيفها', desc: 'أنبوب كولدج: إلكترونات معجلة بفرق جهد عالٍ تصطدم بهدف معدني فتنتج أشعة سينية بطيف مستمر (أشعة الكبح) وخطوط مميزة للهدف.',
  tools: ['أنبوب كولدج المفرغ', 'فتيلة (كاثود) مسخنة', 'هدف معدني (تنكستن أو موليبدنيوم)', 'مجهز فولطية عالية'],
  steps: ['زد فرق جهد التعجيل ولاحظ انزياح أقصر طول موجي λmin نحو الأقصر.', 'زد تيار الفتيلة (عدد الإلكترونات) ولاحظ ازدياد الشدة دون تغير λmin.', 'لاحظ ظهور الخطوط المميزة Kα و Kβ عند تجاوز الجهد حداً معيناً.'],
  concl: ['تنتج الأشعة السينية ذات الطيف المستمر من تباطؤ الإلكترونات عند اقترابها من نوى ذرات الهدف (إشعاع الكبح).', 'أقصر طول موجي λmin = hc/eV يعتمد على فرق جهد التعجيل فقط.', 'الخطوط المميزة تنتج من انتقال إلكترونات ذرات الهدف لملء فراغات في المستويات الداخلية، وتعتمد على نوع مادة الهدف.', 'شدة الأشعة تعتمد على عدد الإلكترونات (تيار الفتيلة).'],
  laws: ['xmin', 'planck'],
  controls: [R('V', 'فرق جهد التعجيل', 10, 50, 35, .5, 'kV'), R('I', 'تيار الفتيلة (الشدة)', 10, 100, 60, 1, '%'), SEL('tg', 'مادة الهدف', [['Mo', 'موليبدنيوم (Kα 0.071nm)'], ['Cu', 'نحاس (Kα 0.154nm)'], ['W', 'تنكستن (Kα 0.021nm)']], 'Mo')],
  spec(S, l) { const p = S.p; const lmin = 1.24 / p.V; if (l <= lmin) return 0; const x = l / lmin; let I = p.I / 100 * (x - 1) / Math.pow(x, 3.2) * 3; const k = { Mo: [.071, .063, 20], Cu: [.154, .139, 9], W: [.021, .018, 70] }[p.tg]; if (p.V > k[2] && k[0] > lmin) { I += p.I / 100 * 1.4 * Math.exp(-(((l - k[0]) / .0015) ** 2)); } if (p.V > k[2] && k[1] > lmin) I += p.I / 100 * .6 * Math.exp(-(((l - k[1]) / .0015) ** 2)); return I; },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const cy = h * .26; ctx.fillStyle = 'rgba(200,230,255,.08)'; ctx.strokeStyle = 'rgba(200,230,255,.5)'; rr(ctx, w * .1, cy - 50, w * .55, 100, 50); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#f59e0b'; ctx.fillRect(w * .15, cy - 14, 12, 28); G.glow(ctx, w * .155, cy, 20, 'rgba(251,146,60,A)', .8); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.moveTo(w * .58, cy - 30); ctx.lineTo(w * .6, cy + 30); ctx.lineTo(w * .62, cy + 30); ctx.lineTo(w * .62, cy - 30); ctx.fill();
    for (let k = 0; k < Math.round(S.p.I / 10); k++) { const x = w * .17 + ((S.t * S.p.V * 8 + k * 37) % (w * .41)); ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.arc(x, cy + (k % 3 - 1) * 6, 2.5, 0, TAU); ctx.fill(); }
    for (let k = 0; k < 4; k++) { const d = (S.t * 120 + k * 30) % 120; ctx.strokeStyle = `rgba(196,181,253,${1 - d / 120})`; ctx.lineWidth = 2; ctx.beginPath(); for (let s = 0; s < 20; s++) { const x = w * .6 + s * 1.2 + d * .2, y = cy + 30 + d + Math.sin(s) * 3; s ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
    G.text(ctx, S.p.V + ' kV', w * .38, cy - 66, { s: 13, c: '#fde68a' }); G.text(ctx, 'أشعة سينية', w * .72, cy + 90, { s: 12, c: '#c4b5fd' });
    // spectrum plot
    const x0 = 50, x1 = w - 20, y0 = h - 30, y1 = h * .5; ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke(); const lm = .2;
    ctx.strokeStyle = '#c084fc'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = x0; x <= x1; x++) { const l = (x - x0) / (x1 - x0) * lm; const y = y0 - this.spec(S, l) / 2 * (y0 - y1); x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, Math.max(y1 - 10, y)); } ctx.stroke();
    for (let l = 0; l <= .2; l += .05) G.text(ctx, l.toFixed(2), x0 + l / lm * (x1 - x0), y0 + 12, { s: 10, mono: 1, c: '#94a3b8' }); G.text(ctx, 'λ (nm)', x1 - 20, y0 - 10, { s: 10, c: '#94a3b8' });
    const xm = x0 + 1.24 / S.p.V / lm * (x1 - x0); ctx.setLineDash([3, 3]); ctx.strokeStyle = '#fde68a'; ctx.beginPath(); ctx.moveTo(xm, y1); ctx.lineTo(xm, y0); ctx.stroke(); ctx.setLineDash([]); G.text(ctx, 'λmin', xm, y1 - 8, { s: 11, c: '#fde68a' });
  },
  readings(S) { const V = S.p.V * 1e3; return [rd('λmin = hc/eV', fmtSI(PHY.h * PHY.c / (PHY.e * V), 'm')), rd('fmax = eV/h', fmtSI(PHY.e * V / PHY.h, 'Hz')), rd('KEmax للإلكترون', fmt(S.p.V, 3, 'keV')), rd('سرعة الإلكترون (كلاسيكياً)', fmtSI(Math.sqrt(2 * PHY.e * V / PHY.me), 'm/s'))]; }
});

/* ---- Compton ---- */
X({ id: 'compton', ch: 8, sec: '7-8', page: 238, kind: 'تجربة', title: 'تأثير كومبتون', desc: 'فوتون أشعة سينية يصطدم بإلكترون حر فيستطير بطول موجي أكبر؛ الزيادة تعتمد على زاوية الاستطارة فقط.',
  tools: ['مصدر أشعة سينية أحادية الطول الموجي', 'هدف من الكرافيت (إلكترونات شبه حرة)', 'كاشف متحرك حول الهدف لقياس الطول الموجي المستطار'],
  steps: ['غيّر زاوية الاستطارة θ ولاحظ ازدياد الطول الموجي للفوتون المستطار.', 'لاحظ ارتداد الإلكترون وحفظ الزخم والطاقة في التصادم.'],
  concl: ['Δλ = λ′ − λ = (h/mₑc)(1 − cosθ).', 'الزيادة لا تعتمد على الطول الموجي الساقط ولا على مادة الهدف؛ أعظم زيادة عند θ = 180°.', 'التأثير يثبت الطبيعة الجسيمية للفوتون وأن له زخماً p = h/λ.'],
  laws: ['compton', 'debroglie'],
  controls: [R('th', 'زاوية الاستطارة θ', 0, 180, 90, 1, '°'), R('lam', 'الطول الموجي الساقط λ', .005, .1, .0711, .0005, 'nm')],
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const cx = w * .5, cy = h * .5; const th = rad(S.p.th); const lam = S.p.lam, dl = .002426 * (1 - Math.cos(th)), lp = lam + dl;
    const wave = (x1, y1, x2, y2, l, col) => { const L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1); const wl = clamp(l * 600, 6, 60); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); for (let s = 0; s <= L; s += 1) { const o = 8 * Math.sin(s / wl * TAU - S.t * 8); const x = x1 + Math.cos(a) * s - Math.sin(a) * o, y = y1 + Math.sin(a) * s + Math.cos(a) * o; s ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); };
    wave(40, cy, cx - 10, cy, lam, '#c084fc'); wave(cx + 10 * Math.cos(th), cy - 10 * Math.sin(th), cx + Math.cos(th) * w * .4, cy - Math.sin(th) * w * .4, lp, '#f472b6');
    const pe = [1 / lam - Math.cos(th) / lp, Math.sin(th) / lp]; const pa = Math.atan2(-pe[1], pe[0]);
    G.arrow(ctx, cx, cy, cx + Math.cos(pa) * 120, cy - Math.sin(pa) * 120, '#7dd3fc', 2.5, 9); ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, TAU); ctx.fill();
    G.text(ctx, 'فوتون ساقط λ', 110, cy - 26, { s: 12, c: '#e9d5ff' }); G.text(ctx, "فوتون مستطار λ′", cx + Math.cos(th) * w * .3, cy - Math.sin(th) * w * .3 - 22, { s: 12, c: '#fbcfe8' }); G.text(ctx, 'إلكترون مرتد', cx + Math.cos(pa) * 150, cy - Math.sin(pa) * 150, { s: 12, c: '#bae6fd' });
    ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.arc(cx, cy, 40, -th, 0); ctx.stroke(); G.text(ctx, 'θ', cx + 52 * Math.cos(th / 2), cy - 52 * Math.sin(th / 2), { s: 13, w: 900 });
  },
  readings(S) { const th = rad(S.p.th); const dl = .002426 * (1 - Math.cos(th)); const lam = S.p.lam; return [rd('Δλ = (h/mc)(1−cosθ)', fmt(dl, 4, 'nm')), rd("λ′", fmt(lam + dl, 4, 'nm')), rd('طاقة الفوتون الساقط', fmt(1.24 / lam, 4, 'keV')), rd('طاقة الفوتون المستطار', fmt(1.24 / (lam + dl), 4, 'keV')), rd('الطاقة الحركية للإلكترون', fmt(1.24 / lam - 1.24 / (lam + dl), 4, 'keV'), 1)]; }
});

/* ---- Laser ---- */
X({ id: 'laser', ch: 8, sec: '8-8 / 9-8', page: 240, kind: 'تجربة', title: 'الليزر: الانبعاث المحفز والتوزيع المعكوس (ليزر الياقوت)', desc: 'ضخ بصري يرفع الذرات إلى مستوى شبه مستقر فيحدث توزيع معكوس؛ فوتون واحد يحفز انبعاث فوتونات مماثلة له في الطور والاتجاه والتردد، وتتضخم بين مرآتين.',
  tools: ['قضيب من الياقوت (وسط فعال)', 'مصباح وميضي للضخ البصري', 'مرآة عاكسة كلياً ومرآة عاكسة جزئياً (مرنان)', 'مصدر قدرة'],
  steps: ['شغّل الضخ بقدرة منخفضة: تنبعث فوتونات تلقائية عشوائية الاتجاه والطور.', 'زد قدرة الضخ حتى يصبح عدد الذرات في المستوى شبه المستقر أكبر من المستوى الأرضي (توزيع معكوس).', 'لاحظ تضخم الفوتونات المحفزة بين المرآتين وخروج حزمة ليزر من المرآة الجزئية.'],
  concl: ['الامتصاص: فوتون يرفع الذرة إلى مستوى أعلى. الانبعاث التلقائي: الذرة المثارة تعود وتبعث فوتوناً عشوائياً. الانبعاث المحفز: فوتون ساقط طاقته = فرق الطاقة يحفز الذرة المثارة على بعث فوتون مماثل تماماً.', 'التوزيع المعكوس (N₂ > N₁) شرط أساسي لعمل الليزر ويتطلب مستوى شبه مستقر (عمر طويل ~10⁻³s) ومضخة.', 'خواص ضوء الليزر: أحادي اللون، متشاكه، متوازٍ (قليل الانفراج)، عالي الشدة.'],
  laws: ['boltz', 'planck'],
  controls: [R('pump', 'قدرة الضخ', 0, 100, 30, 1, '%'), TG('mirr', 'المرآتان (المرنان)', true)],
  setup(S) { S.atoms = []; for (let i = 0; i < 90; i++) S.atoms.push({ x: Math.random(), y: Math.random(), st: 0 }); S.ph = []; S.out = 0; },
  update(S, dt) { const p = S.p; const pr = p.pump / 100 * 1.8 * dt;
    S.atoms.forEach(a => { if (a.st === 0 && Math.random() < pr) a.st = 1; else if (a.st === 1 && Math.random() < dt * .25) { a.st = 0; const ax = Math.random() < .25; S.ph.push({ x: a.x, y: a.y, dx: ax ? (Math.random() < .5 ? 1 : -1) : Math.cos(Math.random() * TAU), dy: ax ? 0 : Math.sin(Math.random() * TAU) * .6, stim: false }); } });
    S.ph.forEach(q => { q.x += q.dx * dt * .5; q.y += q.dy * dt * .5; if (Math.abs(q.dx) > .95) S.atoms.forEach(a => { if (a.st === 1 && Math.abs(a.x - q.x) < .02 && Math.abs(a.y - q.y) < .08 && Math.random() < .6) { a.st = 0; S.ph.push({ x: a.x, y: q.y, dx: q.dx, dy: 0, stim: true }); } }); if (p.mirr) { if (q.x < 0 && Math.abs(q.dy) < .05) { q.x = 0; q.dx = Math.abs(q.dx); } if (q.x > 1 && Math.abs(q.dy) < .05) { if (Math.random() < .15) { q.out = true; S.out += 1; } else { q.x = 1; q.dx = -Math.abs(q.dx); } } } });
    S.ph = S.ph.filter(q => !q.out && q.x > -.05 && q.x < 1.05 && q.y > -.05 && q.y < 1.05).slice(-400); S.out *= Math.exp(-dt * 2); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const x0 = w * .12, x1 = w * .78, y0 = h * .3, y1 = h * .62;
    ctx.fillStyle = 'rgba(220,38,38,.2)'; rr(ctx, x0, y0, x1 - x0, y1 - y0, 14); ctx.fill(); ctx.strokeStyle = 'rgba(248,113,113,.5)'; ctx.stroke();
    if (S.p.mirr) { ctx.fillStyle = '#e5e7eb'; ctx.fillRect(x0 - 16, y0 - 10, 8, y1 - y0 + 20); ctx.fillStyle = 'rgba(229,231,235,.5)'; ctx.fillRect(x1 + 8, y0 - 10, 8, y1 - y0 + 20); G.text(ctx, 'عاكسة كلياً', x0 - 12, y1 + 26, { s: 11 }); G.text(ctx, 'عاكسة جزئياً', x1 + 12, y1 + 26, { s: 11 }); }
    ctx.strokeStyle = `rgba(250,250,210,${.2 + S.p.pump / 120})`; ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x < x1; x += 4) ctx.lineTo(x, y0 - 30 + Math.sin(x / 6) * 6); ctx.stroke(); G.text(ctx, 'مصباح الضخ الوميضي', (x0 + x1) / 2, y0 - 50, { s: 11, c: '#fef9c3' });
    S.atoms.forEach(a => { ctx.fillStyle = a.st ? '#f87171' : '#64748b'; ctx.beginPath(); ctx.arc(x0 + a.x * (x1 - x0), y0 + a.y * (y1 - y0), a.st ? 4 : 3, 0, TAU); ctx.fill(); });
    S.ph.forEach(q => { ctx.fillStyle = q.stim ? '#ff1f3d' : 'rgba(255,150,150,.6)'; ctx.fillRect(x0 + q.x * (x1 - x0) - 3, y0 + q.y * (y1 - y0) - 1, 6, 2); });
    const beam = clamp(S.out / 4, 0, 1); if (beam > .02) { const g = ctx.createLinearGradient(x1, 0, w, 0); g.addColorStop(0, `rgba(255,30,60,${beam})`); g.addColorStop(1, `rgba(255,30,60,${beam * .6})`); ctx.fillStyle = g; ctx.fillRect(x1 + 16, (y0 + y1) / 2 - 4, w - x1 - 16, 8); G.glow(ctx, w - 10, (y0 + y1) / 2, 30, 'rgba(255,30,60,A)', beam); }
    // level populations
    const n2 = S.atoms.filter(a => a.st).length, n1 = 90 - n2; const bx = w * .2, by = h * .9; ctx.fillStyle = '#64748b'; ctx.fillRect(bx, by - n1 * .6, 40, n1 * .6); ctx.fillStyle = '#f87171'; ctx.fillRect(bx + 60, by - n2 * .6, 40, n2 * .6); G.text(ctx, 'N₁', bx + 20, by + 12, { s: 11 }); G.text(ctx, 'N₂', bx + 80, by + 12, { s: 11 });
    G.text(ctx, n2 > n1 ? 'توزيع معكوس ✓' : 'لا يوجد توزيع معكوس', bx + 200, by - 20, { s: 13, w: 800, c: n2 > n1 ? '#86efac' : '#fca5a5' });
  },
  readings(S) { const n2 = S.atoms.filter(a => a.st).length; return [rd('ذرات مثارة N₂', n2 + ''), rd('ذرات في المستوى الأرضي N₁', 90 - n2 + ''), rd('شدة حزمة الليزر', Math.round(clamp(S.out / 4, 0, 1) * 100) + ' %'), rd('طول موجة ليزر الياقوت', '694.3 nm')]; }
});
