'use strict';
/* ======================= الفصل التاسع: الفيزياء النووية ======================= */
const NUCS = [['H2', 'الديوتيريوم ²H', 1, 1, 2.014102], ['He4', 'الهيليوم ⁴He', 2, 2, 4.002603], ['Li7', 'الليثيوم ⁷Li', 3, 4, 7.016005], ['C12', 'الكاربون ¹²C', 6, 6, 12], ['N14', 'النتروجين ¹⁴N', 7, 7, 14.003074], ['O16', 'الأوكسجين ¹⁶O', 8, 8, 15.994915], ['Fe56', 'الحديد ⁵⁶Fe', 26, 30, 55.934939], ['Cu63', 'النحاس ⁶³Cu', 29, 34, 62.929601], ['Ag107', 'الفضة ¹⁰⁷Ag', 47, 60, 106.905093], ['U235', 'اليورانيوم ²³⁵U', 92, 143, 235.043923], ['U238', 'اليورانيوم ²³⁸U', 92, 146, 238.050783]];
function semf(A, Z) { if (A < 2) return 0; const aV = 15.8, aS = 18.3, aC = .714, aA = 23.2; let B = aV * A - aS * A ** (2 / 3) - aC * Z * (Z - 1) / A ** (1 / 3) - aA * (A - 2 * Z) ** 2 / A; return B / A; }
X({ id: 'binding', ch: 9, sec: '3-9 / 4-9', page: 256, kind: 'تجربة', title: 'تركيب النواة وطاقة الربط النووية', desc: 'حساب النقص الكتلي وطاقة الربط لنواة من كتل مكوناتها، ورسم منحني معدل طاقة الربط لكل نيوكليون مقابل العدد الكتلي.',
  tools: ['جدول الكتل الذرية بوحدة الكتل الذرية (u)', 'mH = 1.007825u ، mn = 1.008665u', '1u = 931 MeV'],
  steps: ['اختر نواة ولاحظ عدد البروتونات Z والنيوترونات N وحجمها R = r₀A^(1/3).', 'احسب النقص الكتلي Δm = ZmH + Nmn − M.', 'احسب طاقة الربط Eb = Δm × 931 MeV ومعدلها لكل نيوكليون.', 'حدّد موقع النواة على منحني طاقة الربط.'],
  concl: ['كتلة النواة أقل دائماً من مجموع كتل مكوناتها منفردة؛ الفرق (النقص الكتلي) يتحول إلى طاقة الربط.', 'معدل طاقة الربط لكل نيوكليون يزداد مع A حتى يبلغ أقصاه (~8.8MeV) قرب الحديد ⁵⁶Fe (أكثر النوى استقراراً) ثم يتناقص.', 'النوى الخفيفة تطلق طاقة عند اندماجها، والنوى الثقيلة عند انشطارها.', 'القوة النووية قوية جداً وقصيرة المدى ولا تعتمد على الشحنة.'],
  laws: ['nuc', 'radius', 'bind', 'emc2'],
  controls: [SEL('nuc', 'النواة', NUCS.map(n => [n[0], n[1]]), 'N14')],
  get(S) { const n = NUCS.find(x => x[0] === S.p.nuc); const [, name, Z, N, M] = n; const dm = Z * PHY.mp + N * PHY.mn - M; return { name, Z, N, A: Z + N, M, dm, Eb: dm * 931, Ea: dm * 931 / (Z + N) }; },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const r = this.get(S); const cx = w * .22, cy = h * .4; const R0 = 7 * Math.cbrt(r.A) + 6;
    let k = 0; const tot = r.A; const pts = []; for (let i = 0; i < tot; i++) { const a = i * 2.39996, rr2 = R0 * Math.sqrt((i + .5) / tot); pts.push([cx + Math.cos(a) * rr2, cy + Math.sin(a) * rr2]); }
    pts.forEach((p, i) => { const prot = (i * 7919 % tot) < r.Z; const j = Math.sin(S.t * 5 + i) * 1; ctx.fillStyle = prot ? '#ef4444' : '#94a3b8'; ctx.beginPath(); ctx.arc(p[0] + j, p[1], 6.5, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.stroke(); k++; });
    G.text(ctx, r.name, cx, cy + R0 + 26, { s: 14, w: 900 }); G.text(ctx, '● بروتون   ● نيوترون', cx, cy + R0 + 46, { s: 11, c: '#cbd5e1' });
    // curve
    const x0 = w * .45, x1 = w - 20, y0 = h - 40, y1 = 30; ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
    const X = A => x0 + A / 240 * (x1 - x0), Y = e => y0 - e / 9.5 * (y0 - y1);
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.beginPath(); for (let A = 4; A <= 240; A++) { const Z = Math.round(A / (1.98 + .0155 * A ** (2 / 3))); const e = semf(A, Z); A === 4 ? ctx.moveTo(X(A), Y(e)) : ctx.lineTo(X(A), Y(e)); } ctx.stroke();
    NUCS.forEach(n => { const A = n[2] + n[3]; const e = (n[2] * PHY.mp + n[3] * PHY.mn - n[4]) * 931 / A; ctx.fillStyle = n[0] === S.p.nuc ? '#f472b6' : '#7dd3fc'; ctx.beginPath(); ctx.arc(X(A), Y(e), n[0] === S.p.nuc ? 6 : 3.5, 0, TAU); ctx.fill(); });
    for (let A = 0; A <= 240; A += 40) G.text(ctx, A + '', X(A), y0 + 12, { s: 10, mono: 1, c: '#94a3b8' }); for (let e = 0; e <= 9; e += 3) G.text(ctx, e + '', x0 - 10, Y(e), { s: 10, mono: 1, c: '#94a3b8' });
    G.text(ctx, 'العدد الكتلي A', (x0 + x1) / 2, y0 + 28, { s: 11, c: '#cbd5e1' }); G.text(ctx, 'Eb/A (MeV)', x0 + 40, y1 - 10, { s: 11, c: '#cbd5e1' });
    G.text(ctx, '← اندماج', X(20), Y(4), { s: 11, c: '#86efac' }); G.text(ctx, 'انشطار →', X(200), Y(6.6), { s: 11, c: '#fca5a5' });
  },
  readings(S) { const r = this.get(S); return [rd('Z (بروتونات)', r.Z + ''), rd('N (نيوترونات)', r.N + ''), rd('A = Z + N', r.A + ''), rd('نصف القطر R = 1.2A^(1/3)', fmt(1.2 * Math.cbrt(r.A), 3, 'F')), rd('النقص الكتلي Δm', fmt(r.dm, 6, 'u')), rd('طاقة الربط Eb', fmt(r.Eb, 4, 'MeV')), rd('Eb لكل نيوكليون', fmt(r.Ea, 4, 'MeV')), rd('شحنة النواة Ze', fmtSI(r.Z * PHY.e, 'C'))]; }
});

/* ---- radioactive decay ---- */
X({ id: 'decay', ch: 9, sec: '5-9', page: 262, kind: 'تجربة', title: 'النشاط الإشعاعي: انحلال ألفا وبيتا وكاما وعمر النصف', desc: 'مجموعة كبيرة من نوى مشعة تنحل عشوائياً؛ نرسم عدد النوى المتبقية مع الزمن ونلاحظ أنه ينخفض إلى النصف كل عمر نصف، ونشاهد انحراف الإشعاعات في مجال مغناطيسي.',
  tools: ['عينة مشعة', 'عداد كايكر', 'مجال مغناطيسي للتمييز بين أنواع الإشعاع', 'ساعة توقيت'],
  steps: ['شغّل العداد وراقب النوى وهي تنحل عشوائياً.', 'سجّل عدد النوى المتبقية بعد كل فترة زمنية وارسم المنحني.', 'لاحظ أنه بعد مرور عمر نصف واحد يتبقى نصف النوى، وبعد عمرين يتبقى الربع…', 'راقب انحراف جسيمات ألفا (موجبة) وبيتا (سالبة) في المجال المغناطيسي وعدم انحراف أشعة كاما.'],
  concl: ['الانحلال الإشعاعي عملية عشوائية تلقائية لا تتأثر بالظروف الخارجية.', 'N = N₀(½)^(t/T½) ؛ عمر النصف: الزمن اللازم لانحلال نصف عدد النوى المشعة.', 'انحلال ألفا: ينقص A بمقدار 4 و Z بمقدار 2. انحلال بيتا السالبة: يزداد Z بمقدار 1 ويبقى A ثابتاً (يتحول نيوترون إلى بروتون). كاما: فوتونات لا تغير A ولا Z.', 'قابلية النفاذ: كاما > بيتا > ألفا ، وقابلية التأين: ألفا > بيتا > كاما.'],
  laws: ['decay', 'qval'],
  controls: [R('T', 'عمر النصف T½', 2, 30, 8, .5, 's'), SEL('type', 'نوع الانحلال', [['a', 'ألفا α (²²⁶Ra → ²²²Rn)'], ['b', 'بيتا β⁻ (¹⁴C → ¹⁴N)'], ['g', 'كاما γ (نواة مثارة)']], 'a'), BT('', [{ t: 'عينة جديدة', cls: 'primary', on: S => decayReset(S) }])],
  setup(S) { decayReset(S); },
  update(S, dt) { const lam = Math.LN2 / S.p.T; S.nuc.forEach(n => { if (!n.d && Math.random() < lam * dt) { n.d = true; S.em.push({ x: n.x, y: n.y, a: Math.random() * TAU, r: 0, type: S.p.type }); S.clicks++; } }); S.em.forEach(e => e.r += dt * (e.type === 'a' ? 120 : e.type === 'b' ? 240 : 400)); S.em = S.em.filter(e => e.r < 600); S.acc += dt; if (S.acc > .5) { S.acc = 0; S.hist.push([S.t, S.nuc.filter(n => !n.d).length]); } },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const bx = 20, by = 30, bw = w * .45, bh = h - 60; ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.strokeRect(bx, by, bw, bh);
    S.nuc.forEach(n => { ctx.fillStyle = n.d ? '#475569' : { a: '#f59e0b', b: '#22c55e', g: '#a855f7' }[S.p.type]; ctx.beginPath(); ctx.arc(bx + n.x * bw, by + n.y * bh, 3.4, 0, TAU); ctx.fill(); });
    S.em.forEach(e => { const col = { a: '#fbbf24', b: '#4ade80', g: '#d8b4fe' }[e.type]; ctx.fillStyle = col; const x = bx + e.x * bw + Math.cos(e.a) * e.r * .15, y = by + e.y * bh + Math.sin(e.a) * e.r * .15; if (e.r < 80) { ctx.beginPath(); ctx.arc(x, y, 2, 0, TAU); ctx.fill(); } });
    // magnetic field chamber
    const mx = w * .55, mw = w * .42, my = h * .1, mh = h * .8; xB(ctx, mx, my, mx + mw, my + mh, 30, 'rgba(147,197,253,.18)'); G.text(ctx, 'B ⊗', mx + mw - 20, my + 14, { s: 12, c: '#93c5fd' });
    ctx.fillStyle = '#64748b'; ctx.fillRect(mx + 4, my + mh / 2 - 12, 26, 24);
    const tr = (k, col, lab) => { ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.beginPath(); for (let s = 0; s < mw - 40; s += 3) { const y = my + mh / 2 + k * s * s / 400; s ? ctx.lineTo(mx + 30 + s, y) : ctx.moveTo(mx + 30, y); } ctx.stroke(); G.text(ctx, lab, mx + mw - 30, clamp(my + mh / 2 + k * (mw - 60) ** 2 / 400, my + 20, my + mh - 20), { s: 14, w: 900, c: col }); };
    const t = S.p.type; if (t === 'a') tr(-.12, '#fbbf24', 'α'); if (t === 'b') tr(.55, '#4ade80', 'β⁻'); if (t === 'g') tr(0, '#d8b4fe', 'γ');
  },
  readings(S) { const left = S.nuc.filter(n => !n.d).length; const eq = { a: '²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He', b: '¹⁴₆C → ¹⁴₇N + ⁰₋₁e + ν̄', g: 'X* → X + γ' }[S.p.type]; return [rd('النوى المتبقية N', left + ' / ' + S.N0), rd('الزمن المنقضي', fmt(S.t, 3, 's')), rd('N المتوقع = N₀(½)^(t/T½)', fmt(S.N0 * Math.pow(.5, S.t / S.p.T), 4)), rd('ثابت الانحلال λ = 0.693/T½', fmt(Math.LN2 / S.p.T, 4, 's⁻¹')), rd('معادلة الانحلال', eq, 1), rd('طاقة انحلال ألفا للراديوم Q', fmt((226.025406 - 222.017574 - 4.002603) * 931, 4, 'MeV'), 1)]; },
  live: { title: 'عدد النوى المتبقية مع الزمن', data: S => { const th = []; const tm = Math.max(S.t, S.p.T * 4); for (let i = 0; i <= 80; i++) { const t = tm * i / 80; th.push([t, S.N0 * Math.pow(.5, t / S.p.T)]); } return { series: [{ pts: th, name: 'النظري', color: '#1f5eff', width: 1.5 }, { pts: S.hist, name: 'المقيس', color: '#e11d48', type: 'pts' }], opts: { xl: 't (s)', ymin: 0, ymax: S.N0 * 1.05, xmin: 0, xmax: tm, marks: [1, 2, 3].map(k => ({ x: k * S.p.T, label: k + 'T½' })) } }; } }
});
function decayReset(S) { S.N0 = 400; S.nuc = []; for (let i = 0; i < S.N0; i++) S.nuc.push({ x: (i % 20 + .5 + (Math.random() - .5) * .4) / 20, y: (Math.floor(i / 20) + .5 + (Math.random() - .5) * .4) / 20, d: false }); S.em = []; S.hist = [[0, S.N0]]; S.t = 0; S.acc = 0; S.clicks = 0; }

/* ---- fission chain reaction ---- */
X({ id: 'fission', ch: 9, sec: '7-9 / 8-9', page: 270, kind: 'تجربة', title: 'الانشطار النووي والتفاعل المتسلسل والاندماج', desc: 'نيوترون بطيء يشطر نواة ²³⁵U إلى نواتين متوسطتين ونيوترونات جديدة تشطر نوى أخرى؛ نتحكم بالتفاعل بقضبان السيطرة (المفاعل النووي).',
  tools: ['وقود نووي (يورانيوم مخصب ²³⁵U)', 'مهدئ (ماء ثقيل أو كرافيت) لإبطاء النيوترونات', 'قضبان السيطرة (كادميوم أو بورون) لامتصاص النيوترونات'],
  steps: ['أطلق نيوتروناً نحو النوى ولاحظ الانشطار وانبعاث 2–3 نيوترونات وطاقة.', 'بدون قضبان سيطرة: لاحظ تزايد عدد الانشطارات أُسياً (تفاعل متسلسل غير مسيطر عليه — القنبلة).', 'أدخل قضبان السيطرة لامتصاص جزء من النيوترونات بحيث يسبب كل انشطار انشطاراً واحداً في المتوسط (المفاعل).', 'قارن مع الاندماج النووي: اتحاد نواتي ديوتيريوم وتريتيوم.'],
  concl: ['²³⁵U + ¹n → ¹⁴¹Ba + ⁹²Kr + 3¹n + Q (Q ≈ 200 MeV لكل انشطار).', 'التفاعل المتسلسل يحدث عندما يسبب نيوترون واحد على الأقل من كل انشطار انشطاراً جديداً (الكتلة الحرجة).', 'في المفاعل تتحكم قضبان السيطرة بعدد النيوترونات، والمهدئ يبطئها لزيادة احتمال الانشطار.', 'الاندماج: ²H + ³H → ⁴He + ¹n + 17.6 MeV ويحتاج درجات حرارة عالية جداً (~10⁸K) — مصدر طاقة الشمس.'],
  laws: ['qval', 'emc2', 'bind'],
  controls: [R('ctrl', 'إدخال قضبان السيطرة (امتصاص النيوترونات)', 0, 90, 0, 1, '%'), BT('', [{ t: 'إطلاق نيوترون', cls: 'primary', on: S => { S.neu.push({ x: 0, y: .5, vx: .45, vy: (Math.random() - .5) * .1 }); } }, { t: 'إعادة', on: S => fisReset(S) }])],
  setup(S) { fisReset(S); },
  update(S, dt) { const ab = S.p.ctrl / 100; S.neu.forEach(n => { n.x += n.vx * dt; n.y += n.vy * dt; if (n.x > .15 && n.x < .95 && Math.random() < ab * dt * 2.2) n.dead = true; S.U.forEach(u => { if (!u.f && !n.dead && Math.abs(u.x - n.x) < .018 && Math.abs(u.y - n.y) < .03) { u.f = true; u.ft = S.t; n.dead = true; S.fis++; S.E += 200; for (let k = 0; k < 3; k++) { const a = Math.random() * TAU; S.neu.push({ x: u.x, y: u.y, vx: Math.cos(a) * .35, vy: Math.sin(a) * .35 }); } } }); }); S.neu = S.neu.filter(n => !n.dead && n.x > -.05 && n.x < 1.05 && n.y > -.05 && n.y < 1.05); S.acc += dt; if (S.acc > .2) { S.acc = 0; S.hist.push([S.t, S.fis]); if (S.hist.length > 200) S.hist.shift(); } },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const X = x => 20 + x * (w - 40), Y = y => 20 + y * (h - 40);
    for (let k = 0; k < 4; k++) { const cx = X(.25 + k * .2); const len = (h - 40) * S.p.ctrl / 100; ctx.fillStyle = '#374151'; ctx.fillRect(cx - 5, 20, 10, len); }
    S.U.forEach(u => { if (!u.f) { ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(X(u.x), Y(u.y), 6, 0, TAU); ctx.fill(); } else { const d = Math.min(1, (S.t - u.ft) * 2); ctx.fillStyle = `rgba(250,204,21,${1 - d})`; ctx.beginPath(); ctx.arc(X(u.x), Y(u.y), 6 + d * 20, 0, TAU); ctx.fill(); ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(X(u.x) - 4 - d * 6, Y(u.y), 4, 0, TAU); ctx.fill(); ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.arc(X(u.x) + 4 + d * 6, Y(u.y), 3.6, 0, TAU); ctx.fill(); } });
    S.neu.forEach(n => { ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(X(n.x), Y(n.y), 2.5, 0, TAU); ctx.fill(); });
    G.text(ctx, '● ²³⁵U   ● ¹⁴¹Ba   ● ⁹²Kr   · نيوترون', w / 2, h - 10, { s: 11, c: '#cbd5e1' });
  },
  readings(S) { return [rd('عدد الانشطارات', S.fis + ''), rd('النيوترونات الحرة', S.neu.length + ''), rd('الطاقة المتحررة', fmt(S.E, 4, 'MeV')), rd('بالجول', fmtSI(S.E * 1.6e-13, 'J')), rd('حالة التفاعل', S.neu.length > 60 ? 'متسلسل متزايد (غير مسيطر عليه)' : S.neu.length > 0 ? 'مستمر' : S.fis ? 'توقف' : 'بانتظار نيوترون', 1)]; },
  live: { title: 'عدد الانشطارات التراكمي مع الزمن', data: S => ({ series: [{ pts: S.hist, color: '#f97316', name: 'الانشطارات' }], opts: { xl: 't (s)', ymin: 0 } }) }
});
function fisReset(S) { S.U = []; for (let i = 0; i < 17; i++) for (let j = 0; j < 11; j++) S.U.push({ x: .08 + i * .053 + (j % 2) * .02, y: .06 + j * .088, f: false }); S.neu = []; S.fis = 0; S.E = 0; S.hist = []; S.acc = 0; S.t = 0; }
