'use strict';
/* ======================= تطبيقات من الكتاب ======================= */
function insertAfter(id, def) { X(def); const e = EXPS.pop(); const i = EXPS.findIndex(x => x.id === id); EXPS.splice(i + 1, 0, e); EXPS.filter(x => x.ch === e.ch).forEach((x, k) => x.idx = k + 1); }

insertAfter('mutual', { id: 'app_stove', ch: 2, sec: '19-2', page: 83, kind: 'تطبيق', title: 'الطباخ الحثي (Induction stove)', desc: 'ملف تحت سطح الطباخ ينساب فيه تيار متناوب فيولد مجالاً مغناطيسياً متغيراً يولد تيارات دوامة في قاعدة الإناء المعدنية فتسخن، بينما لا يسخن الإناء الزجاجي.',
  tools: ['ملف سلكي تحت سطح زجاجي', 'مصدر تيار متناوب عالي التردد', 'إناء معدني وإناء زجاجي فيهما ماء'],
  steps: ['شغّل الطباخ وضع الإناء المعدني؛ لاحظ التيارات الدوامة في قاعدته وارتفاع درجة حرارة الماء.', 'بدّل إلى الإناء الزجاجي؛ لا تتولد تيارات دوامة فلا يسخن.', 'زد تردد التيار ولاحظ ازدياد سرعة التسخين.'],
  concl: ['التيار المتناوب في الملف يولد فيضاً متغيراً يخترق قاعدة الإناء فتتولد فيها تيارات دوامة (قانون فراداي).', 'التيارات الدوامة تحول الطاقة الكهربائية إلى حرارية في قاعدة الإناء نفسها (I²R).', 'الزجاج عازل فلا تتولد فيه تيارات دوامة ولا يسخن، ويبقى سطح الطباخ بارداً نسبياً.'],
  laws: ['faraday', 'lenz'],
  controls: [SEL('pot', 'نوع الإناء', [['metal', 'إناء معدني'], ['glass', 'إناء زجاجي']], 'metal', (v, S) => { S.T = 25; }), R('f', 'تردد التيار', 1, 50, 25, 1, 'kHz'), R('P', 'مستوى القدرة', 0, 10, 7, 1, '')],
  setup(S) { S.T = 25; S.bub = []; },
  update(S, dt) { const p = S.p; const heat = p.pot === 'metal' ? p.P * p.f / 25 * 1.2 : 0; S.T = Math.min(100, S.T + (heat - (S.T - 25) * .02) * dt); if (S.T > 90 && Math.random() < dt * 20) S.bub.push({ x: Math.random(), y: 0 }); S.bub.forEach(b => b.y += dt * .6); S.bub = S.bub.filter(b => b.y < 1); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const p = S.p; const cx = w * .5, top = h * .62;
    ctx.fillStyle = '#1f2937'; rr(ctx, cx - 220, top, 440, 70, 10); ctx.fill(); ctx.fillStyle = 'rgba(148,163,184,.35)'; ctx.fillRect(cx - 210, top, 420, 8);
    for (let k = 0; k < 6; k++) { ctx.strokeStyle = '#c87533'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(cx, top + 30, 40 + k * 22, 9 + k * 3, 0, 0, TAU); ctx.stroke(); }
    const ph = S.t * p.f * .4; if (p.P > 0) for (let k = -3; k <= 3; k++) { const a = Math.sin(ph) * p.P / 10; ctx.strokeStyle = `rgba(59,130,246,${.25 + .5 * Math.abs(a)})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx + k * 34, top - 10, 14, 70 * Math.abs(a) + 8, 0, Math.PI, TAU); ctx.stroke(); }
    const metal = p.pot === 'metal'; const py = top - 120;
    ctx.fillStyle = metal ? '#9ca3af' : 'rgba(186,230,253,.45)'; ctx.strokeStyle = metal ? '#6b7280' : '#7dd3fc'; ctx.lineWidth = 3; rr(ctx, cx - 130, py, 260, 110, 12); ctx.fill(); ctx.stroke();
    const wc = `rgb(${Math.round(80 + (S.T - 25) * 2)},${Math.round(160 - (S.T - 25))},${Math.round(230 - (S.T - 25) * 1.8)})`; setRaw(ctx, 1); ctx.fillStyle = wc; ctx.fillRect(cx - 120, py + 25, 240, 78); setRaw(ctx, 0);
    S.bub.forEach(b => { ctx.strokeStyle = '#e0f2fe'; ctx.beginPath(); ctx.arc(cx - 110 + b.x * 220, py + 100 - b.y * 70, 4, 0, TAU); ctx.stroke(); });
    if (metal && p.P > 0) { const a = Math.abs(Math.sin(ph)); for (let k = -2; k <= 2; k++) { ctx.strokeStyle = `rgba(250,204,21,${.3 + .6 * a})`; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(cx + k * 45, py + 106, 18, 4, 0, 0, TAU); ctx.stroke(); } G.text(ctx, 'تيارات دوامة في قاعدة الإناء', cx, py + 128, { s: 12, c: '#b45309' }); }
    G.text(ctx, Math.round(S.T) + ' °C', cx + 170, py + 50, { s: 18, w: 900, c: S.T > 80 ? '#dc2626' : '#1d4ed8' });
    G.text(ctx, 'ملف التسخين (تيار متناوب)', cx, top + 86, { s: 12 });
  },
  readings(S) { return [rd('درجة حرارة الماء', fmt(S.T, 3, '°C')), rd('التيارات الدوامة', S.p.pot === 'metal' && S.p.P > 0 ? 'تتولد' : 'لا تتولد'), rd('معدل التسخين', S.p.pot === 'metal' ? fmt(S.p.P * S.p.f / 25 * 6, 3, '°C/s') : 'صفر')]; },
  explain(S) { return S.p.pot === 'metal' ? 'المجال المغناطيسي المتغير يولد <b>تيارات دوامة</b> في قاعدة الإناء المعدني فتتحول طاقتها إلى حرارة.' : 'الزجاج <b>عازل</b>: لا تنساب فيه تيارات دوامة فلا يسخن الماء.'; }
});

insertAfter('app_stove', { id: 'app_guitar', ch: 2, sec: '19-2', page: 83, kind: 'تطبيق', title: 'القيثارة الكهربائية (Electric guitar)', desc: 'وتر معدني يهتز فوق ملف فيه مغناطيس دائم؛ اهتزاز الوتر الممغنط يغير الفيض في الملف فتتولد قوة دافعة محتثة ترددها يساوي تردد اهتزاز الوتر.',
  tools: ['أوتار معدنية (فيرومغناطيسية)', 'ملف سلكي حول ساق مغناطيسية (اللاقط)', 'مضخم صوت'],
  steps: ['اضغط «اعزف» لاهتزاز الوتر فوق اللاقط.', 'لاحظ الإشارة المتولدة في الملف: ترددها يساوي تردد الوتر وسعتها تتضاءل مع تخامد الاهتزاز.', 'غيّر الوتر (التردد) وقارن.'],
  concl: ['الوتر يتمغنط بتأثير المغناطيس، واهتزازه يغير الفيض الذي يخترق الملف.', 'تتولد في الملف قوة دافعة محتثة متناوبة ترددها = تردد اهتزاز الوتر (قانون فراداي)، تُضخَّم وتُرسل إلى السماعة.'],
  laws: ['faraday'],
  controls: [SEL('note', 'الوتر', [[82.4, 'E2 — 82Hz'], [110, 'A2 — 110Hz'], [146.8, 'D3 — 147Hz'], [196, 'G3 — 196Hz'], [329.6, 'E4 — 330Hz']], 110), BT('', [{ t: '🎸 اعزف', cls: 'primary', on: S => { S.A = 1; S.t0 = S.t; Sound.beep(S.p.note * 2, 1.2, 'triangle', .08); } }])],
  setup(S) { S.A = 0; S.h = []; S.t0 = 0; },
  update(S, dt) { S.A *= Math.exp(-dt * .9); S.h.push([S.t, S.A * Math.cos(TAU * S.p.note / 40 * (S.t - S.t0))]); if (S.h.length > 300) S.h.shift(); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const cy = h * .35; const x0 = 40, x1 = w - 40; const px = w * .55;
    ctx.fillStyle = '#7c2d12'; rr(ctx, x0, cy - 40, x1 - x0, 80, 10); ctx.fill();
    ctx.fillStyle = '#111827'; rr(ctx, px - 50, cy - 30, 100, 60, 8); ctx.fill(); for (let k = 0; k < 6; k++) { ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(px - 38 + k * 15, cy, 5, 0, TAU); ctx.fill(); }
    G.text(ctx, 'اللاقط (ملف + مغناطيس)', px, cy + 56, { s: 12 });
    const amp = S.A * 22 * Math.cos(TAU * S.p.note / 40 * (S.t - S.t0));
    ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 2.5; ctx.beginPath(); for (let x = x0; x <= x1; x += 4) { const u = (x - x0) / (x1 - x0); const y = cy - 12 + amp * Math.sin(Math.PI * u); x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
    const gy = h * .75; ctx.strokeStyle = '#1f5eff'; ctx.lineWidth = 2; ctx.beginPath(); S.h.forEach((q, i) => { const x = x0 + i / 300 * (x1 - x0), y = gy - q[1] * 60; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); G.text(ctx, 'الإشارة المتولدة في الملف (إلى المضخم)', w / 2, gy - 80, { s: 12 });
  },
  readings(S) { return [rd('تردد الوتر', S.p.note + ' Hz'), rd('تردد الإشارة المتولدة', S.p.note + ' Hz'), rd('سعة الاهتزاز', Math.round(S.A * 100) + ' %')]; },
  explain(S) { return S.A > .05 ? 'الوتر الممغنط يهتز فيتغير الفيض في الملف فتتولد <b>قوة دافعة متناوبة</b> بتردد الوتر نفسه.' : 'اضغط «اعزف» لتحريك الوتر.'; }
});

insertAfter('rlc_parallel', { id: 'app_transformer', ch: 3, sec: 'تطبيق', page: 93, kind: 'تطبيق', title: 'المحولة الكهربائية (الرافعة والخافضة)', desc: 'ملفان على قلب حديدي مغلق؛ التيار المتناوب في الابتدائي يولد فيضاً متغيراً يحث قوة دافعة في الثانوي تتناسب مع عدد لفاته. تستعمل المحولات الرافعة لنقل الطاقة لمسافات بعيدة بخسارة قليلة.',
  tools: ['قلب من الحديد المطاوع على شكل حلقة مغلقة (مصنوع من شرائح معزولة)', 'ملف ابتدائي Np لفة', 'ملف ثانوي Ns لفة', 'مصدر تيار متناوب', 'حمل (مصباح)'],
  steps: ['غيّر عدد لفات الملف الثانوي ولاحظ فولطية الثانوي.', 'اجعل Ns > Np (رافعة) ثم Ns < Np (خافضة).', 'جرّب مصدراً مستمراً: لا تعمل المحولة لأن الفيض لا يتغير.', 'قارن خسارة الطاقة في خطوط النقل عند النقل بفولطية عالية.'],
  concl: ['Vs/Vp = Ns/Np (للمحولة المثالية) ، و Is/Ip = Np/Ns.', 'المحولة تعمل بالتيار المتناوب فقط (تعتمد على الحث المتبادل).', 'رفع الفولطية يقلل التيار في خطوط النقل فتقل الخسارة I²R.', 'يُصنع القلب من شرائح معزولة لتقليل التيارات الدوامة.'],
  laws: ['mutual', 'faraday', 'power'],
  controls: [R('Np', 'لفات الابتدائي Np', 50, 1000, 200, 10, ''), R('Ns', 'لفات الثانوي Ns', 10, 4000, 1000, 10, ''), R('Vp', 'فولطية الابتدائي (مؤثرة)', 5, 240, 220, 1, 'V'), R('RL', 'مقاومة الحمل', 10, 5000, 1000, 10, 'Ω'), SEL('src', 'نوع المصدر', [['ac', 'تيار متناوب'], ['dc', 'تيار مستمر']], 'ac')],
  calc(S) { const p = S.p; if (p.src === 'dc') return { Vs: 0, Is: 0, Ip: p.Vp / 2, P: 0 }; const Vs = p.Vp * p.Ns / p.Np, Is = Vs / p.RL, Ip = Is * p.Ns / p.Np; return { Vs, Is, Ip, P: Vs * Is }; },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const r = this.calc(S); const cx = w * .5, cy = h * .45, cw = Math.min(360, w * .5), chh = 220;
    ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 34; ctx.strokeRect(cx - cw / 2, cy - chh / 2, cw, chh); ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 1; for (let k = -15; k <= 15; k += 5) ctx.strokeRect(cx - cw / 2 + k, cy - chh / 2 + k, cw - 2 * k, chh - 2 * k);
    const coil = (x, n, col) => { const m = clamp(Math.round(n / 40), 3, 22); for (let i = 0; i < m; i++) { const y = cy - chh / 2 + 25 + i * (chh - 50) / (m - 1); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, 26, 5, 0, 0, TAU); ctx.stroke(); } };
    coil(cx - cw / 2, S.p.Np, '#c2410c'); coil(cx + cw / 2, S.p.Ns, '#b45309');
    if (S.p.src === 'ac') { const a = Math.sin(S.t * 6); for (let k = 0; k < 8; k++) { const t = (k / 8 + S.t * .15) % 1; const L = 2 * (cw + chh); let d = t * L, x, y; if (d < cw) { x = cx - cw / 2 + d; y = cy - chh / 2; } else if ((d -= cw) < chh) { x = cx + cw / 2; y = cy - chh / 2 + d; } else if ((d -= chh) < cw) { x = cx + cw / 2 - d; y = cy + chh / 2; } else { d -= cw; x = cx - cw / 2; y = cy + chh / 2 - d; } ctx.fillStyle = `rgba(37,99,235,${.3 + .6 * Math.abs(a)})`; ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill(); } G.text(ctx, 'الفيض المغناطيسي المتغير في القلب', cx, cy, { s: 12, c: '#1d4ed8' }); }
    const g = clamp(r.P / 20, 0, 1.2); const lx = cx + cw / 2 + 110; G.wire(ctx, [[cx + cw / 2 + 26, cy - 60], [lx, cy - 60], [lx, cy - 20]]); G.wire(ctx, [[cx + cw / 2 + 26, cy + 60], [lx, cy + 60], [lx, cy + 20]]); if (g > .02) G.glow(ctx, lx, cy, 60 * Math.min(1, g) + 10, 'rgba(255,208,90,A)', Math.min(1, g)); ctx.strokeStyle = '#1b2437'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(lx, cy, 18, 0, TAU); ctx.stroke();
    G.text(ctx, 'Np = ' + S.p.Np, cx - cw / 2, cy + chh / 2 + 34, { s: 13, w: 800 }); G.text(ctx, 'Ns = ' + S.p.Ns, cx + cw / 2, cy + chh / 2 + 34, { s: 13, w: 800 });
    G.text(ctx, S.p.src === 'dc' ? 'مصدر مستمر: لا يتغير الفيض فلا تعمل المحولة' : (S.p.Ns > S.p.Np ? 'محولة رافعة' : S.p.Ns < S.p.Np ? 'محولة خافضة' : 'نسبة 1:1'), cx, 26, { s: 15, w: 900, c: S.p.src === 'dc' ? '#dc2626' : '#0e9f6e' });
  },
  readings(S) { const r = this.calc(S); return [rd('Vs = Vp × Ns/Np', fmtSI(r.Vs, 'V')), rd('تيار الثانوي Is', fmtSI(r.Is, 'A')), rd('تيار الابتدائي Ip', fmtSI(r.Ip, 'A')), rd('القدرة المنقولة', fmtSI(r.P, 'W')), rd('نسبة التحويل Ns/Np', fmt(S.p.Ns / S.p.Np, 3))]; },
  explain(S) { return S.p.src === 'dc' ? 'التيار المستمر يولد فيضاً <b>ثابتاً</b> فلا يتولد شيء في الملف الثانوي.' : 'الفيض المتغير نفسه يخترق كل لفة من الملفين، لذا فولطية كل ملف <b>تتناسب مع عدد لفاته</b>.'; }
});

insertAfter('modulation', { id: 'app_radar', ch: 4, sec: '10-4', page: 146, kind: 'تطبيق', title: 'الرادار (RADAR)', desc: 'يرسل الرادار نبضات من الموجات الراديوية القصيرة (المايكروية) ويستقبل انعكاسها عن الهدف؛ من زمن الذهاب والإياب يحسب بعد الهدف: d = ct/2.',
  tools: ['مذبذب ومرسل نبضات', 'هوائي دوّار (للإرسال والاستقبال)', 'مفتاح إرسال–استقبال', 'مستقبل وشاشة'],
  steps: ['راقب الهوائي الدوّار وهو يرسل النبضات.', 'عندما تنعكس النبضة عن الطائرة تظهر نقطة مضيئة على الشاشة.', 'غيّر بعد الهدف ولاحظ زمن رجوع الصدى.'],
  concl: ['البعد عن الهدف d = c × t / 2 حيث t زمن ذهاب النبضة ورجوعها.', 'يستعمل الرادار موجات قصيرة الطول الموجي لأنها تنتشر بخطوط مستقيمة وتنعكس عن الأجسام.'],
  laws: ['wave'],
  controls: [R('d', 'بعد الهدف', 5, 150, 60, 1, 'km'), R('ang', 'اتجاه الهدف', 0, 359, 40, 1, '°')],
  setup(S) { S.sweep = 0; S.pulses = []; S.blips = []; S.pt = 0; },
  update(S, dt) { S.sweep = (S.sweep + dt * 60) % 360; S.pt += dt; if (S.pt > .25) { S.pt = 0; S.pulses.push({ a: S.sweep, r: 0, back: false }); } S.pulses.forEach(p => { p.r += dt * (p.back ? -220 : 220); const diff = Math.abs(((p.a - S.p.ang) + 540) % 360 - 180); if (!p.back && diff < 8 && p.r >= S.p.d) { p.back = true; p.hit = true; } }); S.pulses = S.pulses.filter(p => p.r > -1 && p.r < 170); S.pulses.filter(p => p.back && p.r <= 1).forEach(p => { S.blips.push({ a: S.p.ang, d: S.p.d, life: 3 }); Sound.beep(1400, .05, 'sine', .03); }); S.blips.forEach(b => b.life -= dt); S.blips = S.blips.filter(b => b.life > 0); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const cx = w * .5, cy = h * .52, R0 = Math.min(w, h) * .42; const sc = R0 / 160;
    setRaw(ctx, 1); ctx.fillStyle = '#052e16'; ctx.beginPath(); ctx.arc(cx, cy, R0, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(74,222,128,.35)'; for (let r = 40; r <= 160; r += 40) { ctx.beginPath(); ctx.arc(cx, cy, r * sc, 0, TAU); ctx.stroke(); ctx.fillStyle = 'rgba(134,239,172,.8)'; ctx.font = '10px monospace'; ctx.fillText(r + 'km', cx + 4, cy - r * sc + 12); }
    const a = rad(S.sweep - 90); const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R0); g.addColorStop(0, 'rgba(74,222,128,.5)'); g.addColorStop(1, 'rgba(74,222,128,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R0, a - .5, a); ctx.closePath(); ctx.fill();
    S.pulses.forEach(p => { const aa = rad(p.a - 90); ctx.fillStyle = p.back ? '#fde047' : 'rgba(134,239,172,.9)'; ctx.beginPath(); ctx.arc(cx + Math.cos(aa) * p.r * sc, cy + Math.sin(aa) * p.r * sc, 2.5, 0, TAU); ctx.fill(); });
    const ta = rad(S.p.ang - 90); ctx.fillStyle = '#e5e7eb'; ctx.save(); ctx.translate(cx + Math.cos(ta) * S.p.d * sc, cy + Math.sin(ta) * S.p.d * sc); ctx.fillText('✈', -6, 4); ctx.restore();
    S.blips.forEach(b => { const ba = rad(b.a - 90); ctx.fillStyle = `rgba(250,250,120,${b.life / 3})`; ctx.beginPath(); ctx.arc(cx + Math.cos(ba) * b.d * sc, cy + Math.sin(ba) * b.d * sc, 7, 0, TAU); ctx.fill(); });
    setRaw(ctx, 0);
  },
  readings(S) { const t = 2 * S.p.d * 1e3 / 3e8; return [rd('زمن الذهاب والإياب t', fmtSI(t, 's')), rd('البعد d = ct/2', S.p.d + ' km'), rd('سرعة النبضة', '3×10⁸ m/s')]; },
  explain() { return 'النبضة تنتشر بسرعة الضوء وتنعكس عن الطائرة؛ الشاشة تحسب <b>البعد = سرعة الضوء × الزمن ÷ 2</b>.'; }
});

insertAfter('photoelectric', { id: 'app_solar', ch: 6, sec: '3-6', page: 184, kind: 'تطبيق', title: 'الخلية الشمسية (تطبيق للظاهرة الكهروضوئية)', desc: 'تحول الخلية الشمسية الطاقة الضوئية إلى طاقة كهربائية مباشرة؛ التيار يتناسب مع شدة الضوء، والقدرة الخارجة تعتمد على مقاومة الحمل.',
  tools: ['خلية شمسية', 'مصدر ضوئي متغير الشدة', 'مقاومة حمل متغيرة', 'أميتر وفولطميتر'],
  steps: ['زد شدة الضوء ولاحظ ازدياد التيار.', 'غيّر مقاومة الحمل وسجّل القدرة لإيجاد أعظم قدرة.', 'اضغط «مسح منحني I–V» لرسم منحني الخلية.'],
  concl: ['تيار الخلية يتناسب طردياً مع شدة الضوء الساقط.', 'للخلية نقطة عمل تعطي أعظم قدرة عند مقاومة حمل معينة.', 'تستعمل في إنارة الشوارع والأقمار الصناعية والحاسبات.'],
  laws: ['photo', 'power'],
  controls: [R('L', 'شدة الضوء', 0, 100, 80, 1, '%'), R('RL', 'مقاومة الحمل', 1, 200, 20, 1, 'Ω'), BT('', [{ t: 'مسح منحني I–V', cls: 'primary', on: S => { S.rows = []; for (let r = 1; r <= 200; r *= 1.35) { const q = solarOp(S, r); S.rows.push({ V: +q.V.toFixed(3), I: +(q.I * 1e3).toFixed(1), P: +(q.V * q.I * 1e3).toFixed(1) }); } Runner.table(Runner.cur, S); } }])],
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const q = solarOp(S, S.p.RL); const cx = w * .4, cy = h * .45;
    G.glow(ctx, 80, 60, 70, 'rgba(250,204,21,A)', S.p.L / 100); setRaw(ctx, 1); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(80, 60, 26, 0, TAU); ctx.fill(); setRaw(ctx, 0);
    for (let k = 0; k < 6; k++) G.arrow(ctx, 110 + k * 12, 80 + k * 6, cx - 100 + k * 40, cy - 70, `rgba(234,179,8,${.2 + .7 * S.p.L / 100})`, 2, 8);
    ctx.save(); ctx.translate(cx, cy); ctx.transform(1, 0, -.4, .6, 0, 0); ctx.fillStyle = '#1e3a8a'; ctx.fillRect(-140, -70, 280, 140); ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 1.5; for (let x = -140; x <= 140; x += 35) { ctx.beginPath(); ctx.moveTo(x, -70); ctx.lineTo(x, 70); ctx.stroke(); } for (let y = -70; y <= 70; y += 35) { ctx.beginPath(); ctx.moveTo(-140, y); ctx.lineTo(140, y); ctx.stroke(); } ctx.restore();
    const lx = w * .78; G.wire(ctx, [[cx + 100, cy], [lx, cy], [lx, cy - 30]]); G.wire(ctx, [[cx + 80, cy + 30], [lx, cy + 30], [lx, cy + 20]]);
    const g = clamp(q.V * q.I / .6, 0, 1.2); if (g > .03) G.glow(ctx, lx, cy - 5, 50 * g + 10, 'rgba(255,208,90,A)', Math.min(1, g)); ctx.strokeStyle = '#1b2437'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(lx, cy - 5, 16, 0, TAU); ctx.stroke();
    G.meter(ctx, w * .62, h * .8, 26, q.I * 1e3, 600, 'mA', fmt(q.I * 1e3, 3) + ' mA'); G.meter(ctx, w * .86, h * .8, 26, q.V, .7, 'V', fmt(q.V, 3) + ' V');
  },
  readings(S) { const q = solarOp(S, S.p.RL); return [rd('التيار', fmtSI(q.I, 'A')), rd('الفولطية', fmtSI(q.V, 'V')), rd('القدرة الخارجة', fmtSI(q.V * q.I, 'W')), rd('تيار الدائرة القصيرة', fmtSI(.006 * S.p.L, 'A'))]; },
  record(S) { const q = solarOp(S, S.p.RL); return { V: +q.V.toFixed(3), I: +(q.I * 1e3).toFixed(1), P: +(q.V * q.I * 1e3).toFixed(1) }; }, cols: [['V', 'V (V)'], ['I', 'I (mA)'], ['P', 'P (mW)']],
  graph: { x: 'V', y: 'I', xl: 'V (V)', yl: 'I (mA)', xmin: 0, xmax: .7 },
  explain(S) { return 'الفوتونات تحرر إلكترونات عند الوصلة فتتولد قوة دافعة؛ زيادة <b>شدة الضوء</b> تزيد عدد الإلكترونات أي تزيد التيار.'; }
});
function solarOp(S, R) { const IL = .006 * S.p.L, Is = 1e-9, vt = .0335; let lo = 0, hi = .8; for (let k = 0; k < 50; k++) { const V = (lo + hi) / 2; const I = IL - Is * (Math.exp(V / vt) - 1); if (I > V / R) lo = V; else hi = V; } const V = lo; return { V, I: V / R }; }
