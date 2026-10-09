'use strict';
/* ======================= الفصل الثاني: الحث الكهرومغناطيسي ======================= */
function hist(S, key, v, n = 400) { (S[key] = S[key] || []).push([S.t, v]); if (S[key].length > n) S[key].shift(); }
function xB(ctx, x0, y0, x1, y1, sp = 34, col = 'rgba(147,197,253,.35)', dots = false) { ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.6; for (let x = x0 + sp / 2; x < x1; x += sp) for (let y = y0 + sp / 2; y < y1; y += sp) { if (dots) { ctx.beginPath(); ctx.arc(x, y, 2.5, 0, TAU); ctx.fill(); } else { ctx.beginPath(); ctx.moveTo(x - 4, y - 4); ctx.lineTo(x + 4, y + 4); ctx.moveTo(x + 4, y - 4); ctx.lineTo(x - 4, y + 4); ctx.stroke(); } } }

/* ---------- Lorentz force ---------- */
X({ id: 'lorentz', ch: 2, sec: '2-2', page: 47, kind: 'تجربة', title: 'تأثير المجالين الكهربائي والمغناطيسي في شحنة متحركة (قوة لورنز)', desc: 'جسيم مشحون يدخل منطقة فيها مجال كهربائي منتظم ومجال مغناطيسي منتظم متعامدان؛ نلاحظ مساره والقوتين المؤثرتين فيه (منتقي السرعة).',
  tools: ['مصدر جسيمات مشحونة (مدفع)', 'صفيحتان متوازيتان مشحونتان (مجال كهربائي E)', 'مجال مغناطيسي منتظم B عمودي على الصفحة (نحو الداخل ×)', 'شاشة متوهجة'],
  steps: ['شغّل المجال الكهربائي فقط ولاحظ انحراف الجسيم باتجاه القوة FE = qE.', 'شغّل المجال المغناطيسي فقط ولاحظ أن الجسيم يسلك مساراً دائرياً بتأثير FB = qvB عمودية على السرعة.', 'شغّل المجالين معاً واضبط السرعة حتى يمر الجسيم دون انحراف (FE = FB أي v = E/B).', 'اعكس نوع الشحنة ولاحظ انعكاس اتجاه القوتين.'],
  concl: ['القوة المغناطيسية FB = qvB sinθ تكون عمودية دائماً على كل من v و B (قاعدة الكف اليمنى)، فتغيّر اتجاه السرعة لا مقدارها.', 'إذا كانت v موازية لـ B فإن FB = 0، وتكون أعظم ما يمكن عندما θ = 90°.', 'محصلة القوتين تسمى قوة لورنز: F = qE + q(v × B).', 'عندما تتساوى القوتان يتحرك الجسيم بخط مستقيم، وتكون v = E/B (مبدأ منتقي السرعة).'],
  laws: ['lorentz'],
  controls: [R('v', 'سرعة الجسيم v (×10⁵ m/s)', 1, 10, 5, .1, ''), R('E', 'المجال الكهربائي E (×10⁵ V/m)', 0, 5, 2.5, .05, ''), R('B', 'كثافة الفيض B (T)', 0, 1, .5, .01, ''), SEL('q', 'نوع الشحنة', [[1, 'موجبة (+q)'], [-1, 'سالبة (−q)']], 1), TG('eon', 'تشغيل المجال الكهربائي', true), TG('bon', 'تشغيل المجال المغناطيسي', true), BT('', [{ t: 'إطلاق جسيم', cls: 'primary', on: S => lzFire(S) }])],
  setup(S) { S.trails = []; S.parts = []; S.fireT = 0; },
  update(S, dt) {
    S.fireT -= dt; if (S.fireT < 0) { lzFire(S); S.fireT = 1.6; }
    const p = S.p; const E = p.eon ? p.E : 0, B = p.bon ? p.B : 0;
    for (const pt of S.parts) { if (!pt.alive) continue; for (let k = 0; k < 8; k++) { const d = dt / 8; const inField = pt.x > S.x0 && pt.x < S.x1; let ax = 0, ay = 0; if (inField) { const ux = pt.vx / 40, uy = pt.vy / 40; ax = 80 * pt.q * (uy * B); ay = 80 * pt.q * (E - ux * B); } pt.vx += ax * d; pt.vy += ay * d; pt.x += pt.vx * d; pt.y += pt.vy * d; }
      pt.tr.push([pt.x, pt.y]); if (pt.tr.length > 300) pt.tr.shift(); if (pt.x > S.W + 20 || pt.x < -20 || pt.y < -20 || pt.y > S.H + 20) pt.alive = false; }
    S.parts = S.parts.filter(p => p.alive || p.tr.length).slice(-6);
    S.parts.forEach(p => { if (!p.alive) p.tr.shift(); });
  },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h, false); S.x0 = w * .3; S.x1 = w * .82; const yT = h * .18, yB = h * .82; S.cy = h * .5; const p = S.p;
    if (p.bon) { xB(ctx, S.x0, yT, S.x1, yB, 34, 'rgba(147,197,253,.28)'); G.text(ctx, 'B ⊗ ' + p.B + ' T', S.x1 - 40, yT + 18, { s: 12, c: '#93c5fd' }); }
    // plates: top negative / bottom positive so E points up? choose E upward: bottom (+) top(−)
    ctx.fillStyle = '#475569'; ctx.fillRect(S.x0, yB, S.x1 - S.x0, 8); ctx.fillStyle = '#b45309'; ctx.fillRect(S.x0, yT - 8, S.x1 - S.x0, 8);
    if (p.eon && p.E > 0) { for (let x = S.x0 + 25; x < S.x1; x += 50) G.arrow(ctx, x, yT + 4, x, yB - 4, 'rgba(255,209,102,.35)', 1.2, 6); G.text(ctx, '− − − − − −', (S.x0 + S.x1) / 2, yB + 18, { s: 13, c: '#93c5fd' }); G.text(ctx, '+ + + + + +', (S.x0 + S.x1) / 2, yT - 18, { s: 13, c: '#fca5a5' }); G.text(ctx, 'E ↓', S.x0 + 20, (yT + yB) / 2, { s: 13, c: '#fde68a' }); }
    // gun
    ctx.fillStyle = '#334155'; rr(ctx, 10, S.cy - 16, 70, 32, 6); ctx.fill(); ctx.fillStyle = '#64748b'; ctx.fillRect(80, S.cy - 6, 20, 12);
    // screen
    ctx.fillStyle = 'rgba(74,222,128,.15)'; ctx.fillRect(w - 14, h * .1, 8, h * .8);
    for (const pt of S.parts) { ctx.strokeStyle = pt.q > 0 ? 'rgba(252,165,165,.8)' : 'rgba(125,211,252,.8)'; ctx.lineWidth = 2; ctx.beginPath(); pt.tr.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
      if (pt.alive) { ctx.fillStyle = pt.q > 0 ? '#f87171' : '#38bdf8'; ctx.beginPath(); ctx.arc(pt.x, pt.y, 6, 0, TAU); ctx.fill(); G.text(ctx, pt.q > 0 ? '+' : '−', pt.x, pt.y, { s: 11, w: 900, c: '#fff' });
        if (pt.x > S.x0 && pt.x < S.x1) { const E = p.eon ? p.E : 0, B = p.bon ? p.B : 0; const ux = pt.vx / 40; const fe = pt.q * E * 14, fb = -pt.q * ux * B * 14; if (Math.abs(fe) > 2) G.arrow(ctx, pt.x, pt.y, pt.x, pt.y + fe, '#fde047', 2.2, 7); if (Math.abs(fb) > 2) G.arrow(ctx, pt.x + 3, pt.y, pt.x + 3, pt.y + fb, '#60a5fa', 2.2, 7); } } }
    G.text(ctx, 'FE (أصفر)   FB (أزرق)', w * .5, h - 14, { s: 12, c: '#cbd5e1' });
  },
  readings(S) { const p = S.p; const q = 1.6e-19, v = p.v * 1e5; const FE = p.eon ? q * p.E * 1e5 : 0, FB = p.bon ? q * v * p.B : 0; return [rd('FE = qE', fmtSI(FE, 'N')), rd('FB = qvB', fmtSI(FB, 'N')), rd('محصلة قوة لورنز', fmtSI(Math.abs(FE - FB), 'N')), rd('السرعة المنتقاة E/B', p.B > 0 ? fmt(p.E / p.B, 3) + '×10⁵ m/s' : '∞'), rd('الحالة', Math.abs(FE - FB) < FE * .03 && p.eon && p.bon ? 'يمر دون انحراف ✓' : 'ينحرف الجسيم', 1)]; }
});
function lzFire(S) { S.parts.push({ x: 100, y: S.cy || 200, vx: S.p.v * 40, vy: 0, q: +S.p.q, alive: true, tr: [] }); }

/* ---------- Activity 1: magnet & coil ---------- */
X({ id: 'faraday_magnet', ch: 2, sec: '4-2', page: 53, kind: 'نشاط', title: 'نشاط (1): توضيح ظاهرة الحث الكهرومغناطيسي (ساق مغناطيسي وملف)', desc: 'تحريك ساق مغناطيسي نحو ملف مربوط بكلفانوميتر أو بعيداً عنه، ومراقبة انحراف المؤشر ومقداره واتجاهه.',
  tools: ['ملفان سلكيان مجوفان (يمكن إدخال أحدهما في الآخر)', 'كلفانوميتر صفره في وسط التدريجة', 'ساق مغناطيسية', 'بطارية', 'مفتاح كهربائي', 'أسلاك توصيل'],
  steps: ['نربط طرفي الملف بطرفي الكلفانوميتر بوساطة أسلاك التوصيل.', 'نجعل الساق المغناطيسية وقطبها الشمالي مواجه للملف وفي حالة سكون نسبة للملف: هل يتحرك مؤشر الكلفانوميتر؟ (لا).', 'ندفع الساق المغناطيسية نحو وجه الملف (اسحب المغناطيس بالفأرة أو اضغط «إدخال»): ينحرف المؤشر على أحد جانبي الصفر.', 'نسحب الساق بعيداً عن الملف: ينحرف المؤشر إلى الجانب المعاكس.', 'كرر بسرعة أكبر، وبعدد لفات أكبر، ولاحظ ازدياد الانحراف.'],
  concl: ['تتولد قوة دافعة كهربائية محتثة εind وينساب تيار محتث Iind في الدائرة المقفلة فقط عند حصول تغيّر في الفيض المغناطيسي الذي يخترقها لوحدة الزمن.', 'يزداد مقدار التيار المحتث بزيادة سرعة الحركة النسبية، وعدد لفات الملف، ومقدار الفيض (مثلاً بإدخال قلب من الحديد).', 'اتجاه التيار المحتث يعاكس التغير المسبب له (قانون لنز): عند تقريب القطب الشمالي يتولد قطب شمالي في وجه الملف القريب فيتنافر معه.'],
  laws: ['faraday', 'lenz', 'flux'],
  howto: 'اسحب المغناطيس أفقياً بالفأرة أو باللمس، أو استخدم الأزرار للحركة التلقائية. راقب مؤشر الكلفانوميتر والقطب المتولد في وجه الملف.',
  controls: [SEL('N', 'عدد لفات الملف N', [[50, '50 لفة'], [100, '100 لفة'], [200, '200 لفة'], [400, '400 لفة']], 200), R('spd', 'سرعة الحركة التلقائية', .2, 3, 1, .1, '×'), TG('flip', 'عكس قطبي المغناطيس', false), TG('core', 'قلب من الحديد المطاوع داخل الملف', false),
    BT('حركة تلقائية', [{ t: 'إدخال', cls: 'primary', on: S => { S.auto = 'in'; } }, { t: 'إخراج', on: S => { S.auto = 'out'; } }, { t: 'اهتزاز مستمر', on: S => { S.auto = 'osc'; } }, { t: 'إيقاف', on: S => { S.auto = null; } }])],
  setup(S) { S.mx = -260; S.vx = 0; S.auto = 'osc'; S.emf = 0; S.I = 0; S.hist = []; S.drag = false; S.phi = 0; },
  pointer(S, t, x, y) { const cx = S.W * .56; const mxs = cx + S.mx; if (t === 'down' && Math.abs(x - mxs) < 90 && Math.abs(y - S.H * .42) < 40) { S.drag = true; S.auto = null; S.dx = x - mxs; } if (t === 'drag' && S.drag) { S.mx = clamp(x - S.dx - cx, -S.W * .5 + 70, 60); } if (t === 'up') S.drag = false; },
  update(S, dt) {
    const p = S.p; const old = S.mx;
    if (S.auto === 'in') { S.mx = Math.min(-40, S.mx + 220 * p.spd * dt); if (S.mx >= -40) S.auto = null; }
    else if (S.auto === 'out') { S.mx = Math.max(-S.W * .5 + 80, S.mx - 220 * p.spd * dt); if (S.mx <= -S.W * .5 + 80) S.auto = null; }
    else if (S.auto === 'osc') { S.ph = (S.ph || 0) + dt * p.spd * 1.6; S.mx = -150 - 110 * Math.cos(S.ph); }
    const vel = (S.mx - old) / Math.max(dt, 1e-4); S.vx += (vel - S.vx) * Math.min(1, dt * 20);
    // flux per turn (Wb) vs magnet position: dipole on-axis model, coil face at x=-60 (relative), coil center 0
    const phiAt = x => { const a = 70; const d = -x; return 4e-4 * (p.core ? 6 : 1) / Math.pow(1 + (d / a) * (d / a), 1.5); };
    const sgn = p.flip ? -1 : 1; const ph = sgn * phiAt(S.mx); const dphi = (ph - S.phi) / Math.max(dt, 1e-4); S.phi = ph; S.dphi = (S.dphi || 0) + (dphi - (S.dphi || 0)) * Math.min(1, dt * 25);
    if (Math.abs(S.dphi) < 1e-9) S.dphi = 0; S.emf = -p.N * S.dphi; S.I = S.emf / 50;
    hist(S, 'hist', S.emf);
  },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const p = S.p; const cx = w * .56, cy = h * .42; const cw = 200, ch = 90;
    // field lines of magnet (simple)
    const mx = cx + S.mx; const mw = 150, mh = 38;
    ctx.strokeStyle = 'rgba(147,197,253,.18)'; ctx.lineWidth = 1.2;
    for (let k = 1; k <= 4; k++) { ctx.beginPath(); ctx.ellipse(mx, cy, mw / 2 + k * 26, mh / 2 + k * 22, 0, 0, TAU); ctx.stroke(); }
    G.coil(ctx, cx + cw / 2 - 30, cy, cw, ch, Math.round(p.N / 25) + 4, '#c87533', p.core);
    G.magnet(ctx, mx, cy, mw, mh, p.flip);
    // induced pole label
    const I = S.I; const face = cx + cw / 2 - 30 - cw / 2;
    if (Math.abs(S.emf) > .003) { const nearN = (p.flip ? 1 : -1) * Math.sign(S.dphi) < 0; const lbl = (Math.sign(S.dphi) * (p.flip ? -1 : 1) > 0) ? (p.flip ? 'S' : 'N') : (p.flip ? 'N' : 'S'); void nearN;
      G.text(ctx, 'قطب محتث: ' + lbl, face, cy - ch / 2 - 18, { s: 13, w: 900, c: lbl === 'N' ? '#fca5a5' : '#93c5fd', bg: 'rgba(15,23,42,.8)' }); }
    // wires to galvanometer
    const gx = cx + cw / 2 - 30, gy = h * .8;
    G.wire(ctx, [[cx - 30 - cw / 2 + 6, cy + ch / 2], [cx - 30 - cw / 2 + 6, gy], [gx - 40, gy]], '#e5484d');
    G.wire(ctx, [[cx - 30 + cw / 2 + cw / 2 - 6, cy + ch / 2], [cx + cw - 30 - 6, gy], [gx + 40, gy]], '#64748b');
    G.dotsAlong(ctx, [[cx - 30 - cw / 2 + 6, cy + ch / 2], [cx - 30 - cw / 2 + 6, gy], [gx - 40, gy]], (S.q = (S.q || 0) + I * 900 * .016), '#ffd166');
    G.meter(ctx, gx, gy - 10, 30, I * 1000, 1, 'G', fmt(I * 1000, 2) + ' mA', { center: true });
    G.text(ctx, 'N = ' + p.N + ' لفة', cx + cw / 2 - 30, cy + ch / 2 + 20, { s: 12, c: '#fcd34d' });
  },
  readings(S) { return [rd('الفيض لكل لفة Φ', fmtSI(S.phi, 'Wb')), rd('ΔΦ/Δt', fmtSI(S.dphi, 'Wb/s')), rd('ε المحتثة = −NΔΦ/Δt', fmtSI(S.emf, 'V')), rd('التيار المحتث', fmtSI(S.I, 'A')), rd('حالة المغناطيس', Math.abs(S.vx) < 5 ? 'ساكن ⇒ لا تيار' : S.vx > 0 ? 'يقترب من الملف' : 'يبتعد عن الملف', 1)]; },
  live: { title: 'القوة الدافعة المحتثة مع الزمن', data: S => ({ series: [{ pts: S.hist || [], color: '#e11d48', name: 'ε (V)' }], opts: { xl: 't (s)', y0zero: false, ymin: -Math.max(.05, ...(S.hist || []).map(p => Math.abs(p[1]))), ymax: Math.max(.05, ...(S.hist || []).map(p => Math.abs(p[1]))) } }) }
});

/* ---------- Faraday's iron ring (discovery) ---------- */
X({ id: 'faraday_ring', ch: 2, sec: '4-2', page: 51, kind: 'تجربة', title: 'اكتشاف فراداي: الحلقة الحديدية والملفان', desc: 'ملفان على حلقة من الحديد المطاوع؛ الابتدائي مع بطارية ومفتاح، والثانوي مع كلفانوميتر. ينحرف المؤشر لحظة غلق المفتاح ولحظة فتحه فقط.',
  tools: ['حلقة مقفلة من الحديد المطاوع', 'ملف ابتدائي مربوط مع بطارية ومفتاح على التوالي', 'ملف ثانوي مربوط مع كلفانوميتر', 'ريوستات'],
  steps: ['أغلق المفتاح في دائرة الملف الابتدائي: لاحظ انحراف مؤشر الكلفانوميتر لحظياً ثم عودته إلى الصفر.', 'أبقِ المفتاح مغلقاً: لا ينحرف المؤشر رغم وجود تيار ثابت في الابتدائي.', 'افتح المفتاح: ينحرف المؤشر لحظياً إلى الجهة المعاكسة.', 'غيّر مقاومة الريوستات والمفتاح مغلق: لاحظ انحراف المؤشر أثناء تغيّر التيار فقط.'],
  concl: ['يتولد تيار محتث في الملف الثانوي فقط عندما يتغير الفيض المغناطيسي الذي يخترقه، أي عند نمو أو تلاشي التيار في الملف الابتدائي.', 'التيار الثابت في الابتدائي يولد فيضاً ثابتاً فلا يتولد تيار محتث.', 'اتجاه التيار المحتث لحظة الغلق معاكس لاتجاهه لحظة الفتح.'],
  laws: ['faraday', 'mutual'],
  controls: [BT('مفتاح الابتدائي', [{ t: 'غلق / فتح المفتاح', cls: 'primary', on: S => { S.sw = !S.sw; } }]), R('rh', 'مقاومة الريوستات', 2, 20, 6, .5, 'Ω'), R('E', 'فولطية البطارية', 2, 12, 6, .5, 'V'), SEL('N2', 'لفات الثانوي', [[100, '100'], [300, '300'], [600, '600']], 300)],
  setup(S) { S.sw = false; S.I1 = 0; S.e2 = 0; S.h1 = []; S.h2 = []; },
  update(S, dt) { const p = S.p; const L1 = .6, Rt = p.rh + 2; const target = S.sw ? p.E / Rt : 0; const old = S.I1; if (S.sw) S.I1 += (target - S.I1) * (1 - Math.exp(-dt * Rt / L1)); else S.I1 += (0 - S.I1) * (1 - Math.exp(-dt * 60)); const M = .004 * p.N2 / 100 * 3; S.e2 = -M * (S.I1 - old) / Math.max(dt, 1e-4); hist(S, 'h1', S.I1); hist(S, 'h2', S.e2); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const cx = w * .5, cy = h * .45, R0 = Math.min(w, h) * .28;
    ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 26; ctx.beginPath(); ctx.arc(cx, cy, R0, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R0 + 11, 0, TAU); ctx.stroke();
    // flux arrows inside ring
    const Bm = S.I1 / 3; if (Math.abs(Bm) > .01) for (let a = 0; a < TAU; a += TAU / 10) { const x1 = cx + Math.cos(a) * R0, y1 = cy + Math.sin(a) * R0, x2 = cx + Math.cos(a + .25) * R0, y2 = cy + Math.sin(a + .25) * R0; G.arrow(ctx, x1, y1, x2, y2, `rgba(125,211,252,${clamp(Bm, 0, 1)})`, 2, 7); }
    const coil = (a, col, n) => { for (let i = 0; i < n; i++) { const t = a - .45 + .9 * i / (n - 1); const x = cx + Math.cos(t) * R0, y = cy + Math.sin(t) * R0; ctx.save(); ctx.translate(x, y); ctx.rotate(t); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, 18, 4, 0, 0, TAU); ctx.stroke(); ctx.restore(); } };
    coil(Math.PI, '#e8914a', 10); coil(0, '#e8914a', Math.round(S.p.N2 / 40) + 4);
    // primary circuit
    const px = cx - R0 - 20; G.wire(ctx, [[px, cy - 40], [px - 90, cy - 40], [px - 90, cy - 110]], '#e5484d'); G.wire(ctx, [[px, cy + 40], [px - 90, cy + 40], [px - 90, cy + 110]], '#64748b');
    ctx.fillStyle = '#1f2937'; rr(ctx, px - 115, cy - 110, 50, 34, 5); ctx.fill(); G.text(ctx, S.p.E + 'V', px - 90, cy - 93, { s: 12, c: '#fde68a', w: 900 });
    ctx.fillStyle = '#7c4a1e'; rr(ctx, px - 118, cy + 100, 56, 14, 3); ctx.fill(); ctx.save(); ctx.translate(px - 112, cy + 98); ctx.rotate(S.sw ? 0 : -.6); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(0, -3, 46, 5); ctx.restore(); G.text(ctx, S.sw ? 'مغلق' : 'مفتوح', px - 90, cy + 130, { s: 12, c: S.sw ? '#86efac' : '#fca5a5' });
    // secondary with galvanometer
    const sx = cx + R0 + 20; G.wire(ctx, [[sx, cy - 40], [sx + 80, cy - 40], [sx + 80, cy + 60]], '#e5484d'); G.wire(ctx, [[sx, cy + 40], [sx + 40, cy + 40], [sx + 40, cy + 60]], '#64748b');
    G.meter(ctx, sx + 60, cy + 95, 30, S.e2, .15, 'G', fmt(S.e2 * 1000, 1) + ' mV', { center: true });
    G.text(ctx, 'الملف الابتدائي', cx - R0, cy + R0 + 34, { s: 12, c: '#cbd5e1' }); G.text(ctx, 'الملف الثانوي', cx + R0, cy + R0 + 34, { s: 12, c: '#cbd5e1' });
  },
  readings(S) { return [rd('تيار الابتدائي I₁', fmtSI(S.I1, 'A')), rd('ε المحتثة في الثانوي', fmtSI(S.e2, 'V')), rd('المفتاح', S.sw ? 'مغلق' : 'مفتوح'), rd('ملاحظة', Math.abs(S.e2) > 1e-3 ? 'الفيض يتغير ⇒ تيار محتث' : 'الفيض ثابت ⇒ لا تيار'), rd('', '', 1)].slice(0, 4); },
  live: { title: 'تيار الابتدائي و ε الثانوي', data: S => ({ series: [{ pts: S.h1, name: 'I₁ (A)', color: '#1f5eff' }, { pts: S.h2.map(p => [p[0], p[1] * 10]), name: 'ε₂ ×10 (V)', color: '#e11d48' }], opts: { xl: 't (s)', y0zero: false } }) }
});

/* ---------- motional emf ---------- */
X({ id: 'motional', ch: 2, sec: '5-2 / 6-2', page: 54, kind: 'تجربة', title: 'القوة الدافعة الكهربائية الحركية والتيار المحتث', desc: 'ساق موصلة تنزلق على سكة موصلة داخل مجال مغناطيسي منتظم؛ يتوهج المصباح المربوط بطرفي السكة.',
  tools: ['سكة موصلة على شكل حرف U', 'ساق موصلة طولها ℓ تنزلق على السكة', 'مصباح (مقاومة R)', 'مجال مغناطيسي منتظم B عمودي على مستوى السكة (نحو الداخل ⊗)'],
  steps: ['حرّك الساق نحو اليمين بسرعة ثابتة v (اسحبها بالفأرة أو استخدم منزلق السرعة).', 'لاحظ تجمع الشحنات الموجبة في أحد طرفي الساق والسالبة في الطرف الآخر وتولد فرق جهد بين طرفيها.', 'لاحظ توهج المصباح وازدياد شدته بزيادة v أو B أو ℓ.', 'اعكس اتجاه الحركة ولاحظ انعكاس اتجاه التيار، ولاحظ القوة المغناطيسية المعرقلة للحركة (قانون لنز).'],
  concl: ['تتولد قوة دافعة كهربائية حركية مقدارها εmotional = vBℓ.', 'ينساب في الدائرة تيار محتث I = vBℓ/R.', 'تتأثر الساق بقوة مغناطيسية F = IℓB معاكسة لاتجاه حركتها؛ لذا يلزم بذل شغل (قوة ساحبة) لإدامة الحركة بسرعة ثابتة.', 'القدرة الميكانيكية المبذولة Fv تساوي القدرة الكهربائية المتبددة I²R = v²B²ℓ²/R (حفظ الطاقة).'],
  laws: ['motional', 'lenz'],
  controls: [R('v', 'السرعة v', -6, 6, 3, .1, 'm/s'), R('B', 'كثافة الفيض B', 0, 1.5, .8, .05, 'T'), R('L', 'طول الساق ℓ', .5, 2, 1.6, .05, 'm'), R('R', 'مقاومة المصباح R', 20, 300, 128, 1, 'Ω'), TG('open', 'دائرة مفتوحة (بدون مصباح)', false)],
  setup(S) { S.x = .2; S.q = 0; },
  pointer(S, t, x) { if (t === 'down') S.drag = true; if (t === 'drag' && S.drag) { const nx = clamp((x - S.x0) / (S.x1 - S.x0), 0, 1); S.vd = (nx - S.x) / .016 * 6; S.x = nx; } if (t === 'up') { S.drag = false; S.vd = null; } },
  update(S, dt) { const v = S.drag ? (S.vd || 0) : S.p.v; if (!S.drag) { S.x += v / 6 * dt * .5; if (S.x > 1) S.x = 0; if (S.x < 0) S.x = 1; } S.vcur = S.drag ? clamp(S.vd || 0, -8, 8) : v; const I = S.p.open ? 0 : S.vcur * S.p.B * S.p.L / S.p.R; S.I = I; S.q += I * 2000 * dt; S.glow = (S.glow || 0) + (Math.min(1.3, Math.sqrt(I * I * S.p.R / .32)) - (S.glow || 0)) * Math.min(1, dt * 10); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h, false); const p = S.p; const yT = h * .5 - p.L * 70, yB = h * .5 + p.L * 70; S.x0 = w * .28; S.x1 = w * .9;
    xB(ctx, S.x0 - 30, 20, w - 10, h - 20, 36, `rgba(147,197,253,${.12 + .25 * p.B / 1.5})`); G.text(ctx, 'B ⊗', w - 40, 34, { s: 14, c: '#93c5fd' });
    // rails
    G.wire(ctx, [[S.x1 + 20, yT], [S.x0 - 90, yT], [S.x0 - 90, yB], [S.x1 + 20, yB]], '#cbd5e1', 5);
    // lamp on left leg
    if (!p.open) { ctx.save(); ctx.fillStyle = '#0b1220'; ctx.fillRect(S.x0 - 100, h / 2 - 26, 20, 52); ctx.restore(); if (S.glow > .02) G.glow(ctx, S.x0 - 90, h / 2, 60 * Math.min(1, S.glow) + 10, 'rgba(255,208,90,A)', Math.min(1, S.glow)); setRaw(ctx, 1); ctx.fillStyle = S.glow > .05 ? '#fff4c2' : 'rgba(210,225,255,.4)'; setRaw(ctx, 0); ctx.beginPath(); ctx.arc(S.x0 - 90, h / 2, 16, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.stroke(); }
    else { ctx.fillStyle = '#0b1220'; ctx.fillRect(S.x0 - 100, h / 2 - 20, 20, 40); }
    // rod
    const rx = S.x0 + S.x * (S.x1 - S.x0);
    ctx.fillStyle = '#a3a3a3'; rr(ctx, rx - 7, yT - 14, 14, yB - yT + 28, 5); ctx.fill();
    // hand/force
    G.arrow(ctx, rx, h / 2, rx + Math.sign(S.vcur || 1) * 60, h / 2, '#4ade80', 3, 10); G.text(ctx, 'v', rx + Math.sign(S.vcur || 1) * 70, h / 2 - 12, { s: 14, c: '#4ade80', w: 900 });
    if (!p.open && Math.abs(S.I) > 1e-4) { G.arrow(ctx, rx, h / 2 + 30, rx - Math.sign(S.vcur) * 50, h / 2 + 30, '#f472b6', 3, 10); G.text(ctx, 'F مغناطيسية', rx - Math.sign(S.vcur) * 50, h / 2 + 48, { s: 11, c: '#f9a8d4' }); }
    // charges on rod: v to right, B into page => force on + is up (q v×B): v=+x, B=-z → v×B = +y (screen up)
    const up = Math.sign(S.vcur || 0); const sep = clamp(Math.abs(S.vcur) / 6, 0, 1);
    for (let i = 0; i < 4; i++) { G.text(ctx, '+', rx, (up >= 0 ? yT + 8 : yB - 8) + (up >= 0 ? 1 : -1) * i * 12 * sep, { s: 13, w: 900, c: '#fca5a5' }); G.text(ctx, '−', rx, (up >= 0 ? yB - 8 : yT + 8) - (up >= 0 ? 1 : -1) * i * 12 * sep, { s: 13, w: 900, c: '#93c5fd' }); }
    // current dots around loop
    if (!p.open && Math.abs(S.I) > 1e-4) { const loop = [[rx, yB], [rx, yT], [S.x0 - 90, yT], [S.x0 - 90, yB], [rx, yB]]; G.dotsAlong(ctx, up >= 0 ? loop : loop.slice().reverse(), Math.abs(S.q), '#ffd166'); }
    G.text(ctx, 'ℓ = ' + p.L + ' m', rx + 36, yT + 20, { s: 12, c: '#e2e8f0', bg: 'rgba(15,23,42,.7)' });
  },
  readings(S) { const p = S.p; const v = S.vcur || 0; const e = v * p.B * p.L; const I = p.open ? 0 : e / p.R; return [rd('ε = vBℓ', fmtSI(e, 'V')), rd('التيار I = ε/R', fmtSI(I, 'A')), rd('القوة المغناطيسية F = IℓB', fmtSI(Math.abs(I * p.L * p.B), 'N')), rd('القدرة المتبددة I²R', fmtSI(I * I * p.R, 'W')), rd('المجال داخل الساق E = vB', fmt(Math.abs(v * p.B), 3, 'V/m')), rd('القدرة الميكانيكية Fv', fmtSI(Math.abs(I * p.L * p.B * v), 'W'))]; },
  record(S) { const p = S.p; const v = S.vcur || 0; return { v: +v.toFixed(2), e: +(v * p.B * p.L).toFixed(3) }; }, cols: [['v', 'v (m/s)'], ['e', 'ε (V)']],
  graph: { x: 'v', y: 'e', xl: 'السرعة v (m/s)', yl: 'ε (V)', theory: (x, S) => x * S.p.B * S.p.L, xmin: -6, xmax: 6, y0zero: false }
});

/* ---------- eddy currents (activity 2) ---------- */
X({ id: 'eddy', ch: 2, sec: '11-2', page: 66, kind: 'نشاط', title: 'نشاط (2): كيفية تقليل تأثير التيارات الدوامة في الموصلات', desc: 'بندولان متماثلان يتأرجحان بين قطبي مغناطيس قوي: أحدهما بصفيحة كاملة والآخر بصفيحة مشقوقة (أسنان المشط).',
  tools: ['بندولان متماثلان كل منهما بشكل صفيحة مصنوعة من مادة موصلة غير فيرومغناطيسية (الألمنيوم مثلاً)', 'إحدى الصفيحتين كاملة والأخرى مقطعة بشكل أسنان المشط', 'مغناطيس دائم قوي (أو مغناطيس كهربائي)', 'حامل'],
  steps: ['نزيح الصفيحتين بإزاحة متساوية إلى أحد جانبي موضع استقرارهما.', 'نترك الصفيحتين في آن واحد تهتزان بين قطبي المغناطيس.', 'ماذا نتوقع أن يحصل؟ أيهتز البندولان بالسعة نفسها؟', 'نلاحظ أن البندول ذا الصفيحة الكاملة يتوقف عن الحركة خلال مروره بين القطبين بعد عدد قليل من الاهتزازات، بينما يستمر الآخر بالاهتزاز فترة أطول.'],
  concl: ['تتولد تيارات دوامة كبيرة في الصفيحة الكاملة أثناء دخولها المجال وخروجها منه (تغيّر الفيض ΔΦ/Δt) تكون باتجاه معين وفق قانون لنز.', 'تتولد عن التيارات الدوامة قوة مغناطيسية FB تعرقل حركة الصفيحة فتتخامد اهتزازاتها سريعاً وتتحول طاقتها إلى طاقة حرارية.', 'تقطيع الصفيحة إلى شرائح يقلل مسارات التيارات الدوامة فيقل تأثيرها كثيراً — لذلك تُصنع قلوب المحولات من شرائح معزولة.'],
  laws: ['faraday', 'lenz'],
  controls: [R('B', 'شدة المغناطيس B', 0, 1.5, 1, .05, 'T'), R('a0', 'زاوية الإزاحة الابتدائية', 10, 60, 45, 1, '°'), BT('', [{ t: 'إطلاق البندولين', cls: 'primary', on: S => eddyReset(S) }])],
  setup(S) { eddyReset(S); S.hA = []; S.hB = []; },
  update(S, dt) { const g = 9.8, L = .8; for (const P of S.pend) { for (let k = 0; k < 10; k++) { const d = dt / 10; const inF = Math.abs(P.th) < .32 ? 1 : Math.exp(-Math.pow((Math.abs(P.th) - .32) / .08, 2)); const b = 6 * S.p.B * S.p.B * P.f * inF; const acc = -g / L * Math.sin(P.th) - b * P.w; P.w += acc * d; P.th += P.w * d; P.eddy = Math.abs(b * P.w); } } hist(S, 'hA', deg(S.pend[0].th)); hist(S, 'hB', deg(S.pend[1].th)); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const L = h * .52;
    S.pend.forEach((P, i) => {
      const px = w * (i ? .72 : .28), py = h * .1; ctx.fillStyle = '#475569'; ctx.fillRect(px - 60, py - 8, 120, 8);
      const bx = px + Math.sin(P.th) * L, by = py + Math.cos(P.th) * L;
      // magnet poles around lowest point
      const mx = px, my = py + L; ctx.fillStyle = '#b91c1c'; rr(ctx, mx - 34, my - 70, 68, 28, 5); ctx.fill(); ctx.fillStyle = '#1d4ed8'; rr(ctx, mx - 34, my + 42, 68, 28, 5); ctx.fill(); G.text(ctx, 'N', mx, my - 56, { s: 14, w: 900, c: '#fff' }); G.text(ctx, 'S', mx, my + 56, { s: 14, w: 900, c: '#fff' });
      ctx.strokeStyle = 'rgba(147,197,253,.25)'; for (let x = mx - 26; x <= mx + 26; x += 13) { ctx.beginPath(); ctx.moveTo(x, my - 42); ctx.lineTo(x, my + 42); ctx.stroke(); }
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx, by - 30); ctx.stroke();
      ctx.save(); ctx.translate(bx, by); ctx.rotate(-P.th);
      const g = ctx.createLinearGradient(-36, 0, 36, 0); g.addColorStop(0, '#9ca3af'); g.addColorStop(.5, '#f3f4f6'); g.addColorStop(1, '#9ca3af'); ctx.fillStyle = g;
      if (P.f > .5) { rr(ctx, -36, -30, 72, 60, 4); ctx.fill(); if (P.eddy > .05) { ctx.strokeStyle = `rgba(250,204,21,${clamp(P.eddy / 2, 0, .9)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(-12, 0, 12, 18, 0, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.ellipse(12, 0, 12, 18, 0, 0, TAU); ctx.stroke(); } }
      else { ctx.fillRect(-36, -30, 72, 14); for (let k = 0; k < 6; k++) ctx.fillRect(-36 + k * 13, -16, 7, 46); }
      ctx.restore();
      G.text(ctx, i ? 'صفيحة مشقوقة (مشط)' : 'صفيحة كاملة', px, h * .95, { s: 13, c: '#e2e8f0', w: 800 });
    });
  },
  readings(S) { const [A, B] = S.pend; const amp = P => { const E = .5 * P.w * P.w * .8 / 9.8 + (1 - Math.cos(P.th)); return deg(Math.acos(clamp(1 - E, -1, 1))); }; return [rd('سعة الصفيحة الكاملة', fmt(amp(A), 3, '°')), rd('سعة الصفيحة المشقوقة', fmt(amp(B), 3, '°')), rd('الطاقة المتبقية (كاملة)', Math.round(100 * (1 - Math.cos(rad(amp(A)))) / (1 - Math.cos(rad(S.p.a0)))) + ' %'), rd('الطاقة المتبقية (مشقوقة)', Math.round(100 * (1 - Math.cos(rad(amp(B)))) / (1 - Math.cos(rad(S.p.a0)))) + ' %')]; },
  live: { title: 'إزاحة البندولين مع الزمن', data: S => ({ series: [{ pts: S.hA, name: 'كاملة', color: '#e11d48' }, { pts: S.hB, name: 'مشقوقة', color: '#1f5eff' }], opts: { xl: 't (s)', y0zero: false, ymin: -65, ymax: 65 } }) }
});
function eddyReset(S) { const a = rad(S.p.a0 ?? 45); S.pend = [{ th: a, w: 0, f: 1 }, { th: a, w: 0, f: .06 }]; S.hA = []; S.hB = []; S.t = 0; }

/* ---------- AC / DC generator ---------- */
X({ id: 'generator', ch: 2, sec: '12-2', page: 68, kind: 'تجربة', title: 'المولد الكهربائي (التيار المتناوب والمستمر)', desc: 'ملف يدور بسرعة زاوية منتظمة ω داخل مجال مغناطيسي منتظم؛ تتولد قوة دافعة محتثة جيبية الموجة، ومع المبادل تصبح موحدة الاتجاه.',
  tools: ['ملف مستطيل عدد لفاته N ومساحة وجهه A', 'مغناطيس (قطبان N و S) يولد مجالاً منتظماً B', 'حلقتا انزلاق وفرشاتان من الكرافيت (مولد AC)', 'مبادل (نصفا حلقة معزولان) لمولد DC', 'مصباح'],
  steps: ['شغّل المولد ولاحظ منحني القوة الدافعة المحتثة مع الزمن.', 'لاحظ أن ε = 0 عندما يكون مستوى الملف عمودياً على B (الفيض أعظم) وأنها عظمى عندما يكون مستوى الملف موازياً لـ B (الفيض صفر).', 'ضاعف سرعة الدوران أو عدد اللفات ولاحظ تغير εmax.', 'بدّل إلى مولد التيار المستمر (المبادل) ولاحظ شكل الموجة الناتجة.'],
  concl: ['ΦB = BA cos(ωt) و εind = NBAω sin(ωt) — دالة جيبية.', 'εmax = NBAω: تزداد بزيادة عدد اللفات وكثافة الفيض ومساحة الملف والسرعة الزاوية.', 'تنعكس قطبية القوة الدافعة مرتين في الدورة الواحدة في مولد التيار المتناوب.', 'المبادل يعكس ربط طرفي الملف كل نصف دورة فيكون التيار الخارجي باتجاه واحد (تيار نابض)، Iaverage = 0.636 Imax.'],
  laws: ['gen', 'flux', 'faraday'],
  controls: [SEL('mode', 'نوع المولد', [['ac', 'مولد تيار متناوب (حلقتا انزلاق)'], ['dc', 'مولد تيار مستمر (مبادل)']], 'ac'), R('f', 'تردد الدوران f', .2, 3, .5, .05, 'Hz'), R('N', 'عدد اللفات N', 10, 200, 100, 10, ''), R('B', 'كثافة الفيض B', .05, 1, .2, .01, 'T'), R('A', 'مساحة الملف A', .01, .1, .05, .005, 'm²')],
  setup(S) { S.th = 0; S.hg = []; },
  update(S, dt) { const p = S.p; const w = TAU * p.f; S.th += w * dt; let e = p.N * p.B * p.A * w * Math.sin(S.th); if (p.mode === 'dc') e = Math.abs(e); S.e = e; S.phi = p.B * p.A * Math.cos(S.th); hist(S, 'hg', e, 500); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const cx = w * .42, cy = h * .45; const p = S.p;
    // poles
    ctx.fillStyle = '#b91c1c'; rr(ctx, cx - 220, cy - 80, 70, 160, 10); ctx.fill(); ctx.fillStyle = '#1d4ed8'; rr(ctx, cx + 150, cy - 80, 70, 160, 10); ctx.fill();
    G.text(ctx, 'N', cx - 185, cy, { s: 26, w: 900, c: '#fff' }); G.text(ctx, 'S', cx + 185, cy, { s: 26, w: 900, c: '#fff' });
    for (let y = cy - 60; y <= cy + 60; y += 30) G.arrow(ctx, cx - 145, y, cx + 145, y, 'rgba(147,197,253,.25)', 1.2, 6);
    // rotating loop (about vertical axis)
    const hw = 110 * Math.cos(S.th), hh = 70; const dep = Math.sin(S.th);
    const col = dep > 0 ? '#f59e0b' : '#fbbf24';
    ctx.strokeStyle = '#c2410c'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(cx - hw, cy - hh); ctx.lineTo(cx + hw, cy - hh + dep * 14); ctx.lineTo(cx + hw, cy + hh + dep * 14); ctx.lineTo(cx - hw, cy + hh); ctx.closePath(); ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke();
    // axis & rings
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy + hh); ctx.lineTo(cx, cy + hh + 70); ctx.stroke();
    if (p.mode === 'ac') { [0, 18].forEach(o => { ctx.strokeStyle = '#d4a017'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, cy + hh + 30 + o, 20, 6, 0, 0, TAU); ctx.stroke(); }); }
    else { ctx.lineWidth = 6; const a = S.th % Math.PI; ctx.strokeStyle = '#d4a017'; ctx.beginPath(); ctx.ellipse(cx, cy + hh + 40, 20, 7, 0, a, a + Math.PI - .3); ctx.stroke(); ctx.strokeStyle = '#a16207'; ctx.beginPath(); ctx.ellipse(cx, cy + hh + 40, 20, 7, 0, a + Math.PI, a + TAU - .3); ctx.stroke(); }
    // brushes & lamp
    const ly = cy + hh + 110; G.wire(ctx, [[cx - 26, cy + hh + 32], [cx - 70, cy + hh + 32], [cx - 70, ly], [cx - 16, ly]], '#e5484d'); G.wire(ctx, [[cx + 26, cy + hh + 48], [cx + 70, cy + hh + 48], [cx + 70, ly], [cx + 16, ly]], '#64748b');
    const g = clamp(Math.abs(S.e) / (p.N * p.B * p.A * TAU * 1.5 + 1e-9), 0, 1); if (g > .03) G.glow(ctx, cx, ly - 6, 50 * g + 10, 'rgba(255,208,90,A)', g); setRaw(ctx, 1); ctx.fillStyle = g > .05 ? '#fff4c2' : 'rgba(210,225,255,.4)'; setRaw(ctx, 0); ctx.beginPath(); ctx.arc(cx, ly - 6, 13, 0, TAU); ctx.fill();
    G.text(ctx, 'θ = ωt = ' + Math.round(deg(S.th) % 360) + '°', cx, cy - hh - 26, { s: 13, c: '#e2e8f0', bg: 'rgba(15,23,42,.7)' });
  },
  readings(S) { const p = S.p; const w = TAU * p.f; return [rd('ε الآنية', fmtSI(S.e, 'V')), rd('εmax = NBAω', fmtSI(p.N * p.B * p.A * w, 'V')), rd('الفيض Φ = BA cosωt', fmtSI(S.phi, 'Wb')), rd('السرعة الزاوية ω', fmt(w, 3, 'rad/s')), rd('المقدار المؤثر (AC)', fmtSI(p.N * p.B * p.A * w * .707, 'V')), rd('المتوسط (DC) 0.636εmax', fmtSI(p.N * p.B * p.A * w * .636, 'V'))]; },
  live: { title: 'القوة الدافعة المحتثة ε(t)', data: S => { const m = S.p.N * S.p.B * S.p.A * TAU * S.p.f * 1.1; return { series: [{ pts: S.hg, name: 'ε', color: '#e11d48' }], opts: { xl: 't (s)', ymin: -m, ymax: m, y0zero: false } }; } }
});

/* ---------- DC motor back emf ---------- */
X({ id: 'motor', ch: 2, sec: '13-2', page: 72, kind: 'تجربة', title: 'المحرك الكهربائي والقوة الدافعة الكهربائية المضادة', desc: 'عند دوران ملف المحرك تتولد فيه قوة دافعة محتثة مضادة εback تعاكس الفولطية المسلطة فيقل التيار كلما ازدادت سرعة الدوران.',
  tools: ['محرك تيار مستمر', 'مصدر فولطية مستمرة', 'أميتر', 'حمل ميكانيكي قابل للتغيير'],
  steps: ['شغّل المحرك: لاحظ أن التيار يبدأ كبيراً لحظة التشغيل ثم يتناقص مع ازدياد سرعة الدوران.', 'زد الحمل الميكانيكي: تقل السرعة فتقل εback ويزداد التيار.', 'قارن بين تيار بدء الحركة والتيار عند السرعة الثابتة.'],
  concl: ['I = (Vapplied − εback)/R.', 'εback تتناسب مع سرعة دوران الملف؛ لذا يكون التيار أعظم لحظة بدء الدوران (εback = 0).', 'عند زيادة الحمل تقل السرعة وتقل εback فيزداد التيار — لهذا قد تحترق ملفات المحرك إذا توقف عن الدوران وهو موصول بالمصدر.'],
  laws: ['backemf', 'faraday'],
  controls: [R('V', 'الفولطية المسلطة', 0, 24, 12, .5, 'V'), R('load', 'الحمل الميكانيكي', 0, 1, .2, .01, ''), R('Rm', 'مقاومة الملف R', .5, 5, 2, .1, 'Ω'), BT('', [{ t: 'إعادة التشغيل من السكون', cls: 'primary', on: S => { S.w = 0; S.h1 = []; S.h2 = []; S.t = 0; } }])],
  setup(S) { S.w = 0; S.th = 0; S.h1 = []; S.h2 = []; },
  update(S, dt) { const p = S.p, k = .05; for (let i = 0; i < 10; i++) { const d = dt / 10; const eb = k * S.w; const I = (p.V - eb) / p.Rm; const tq = k * I - .0004 * S.w - p.load * .15 * Math.sign(S.w || 1) * (S.w > .5 ? 1 : 0); S.w = Math.max(0, S.w + tq / .004 * d); S.I = I; S.eb = eb; } S.th += S.w * dt * .05; hist(S, 'h1', S.I); hist(S, 'h2', S.eb); },
  draw(ctx, w, h, S) { G.bg(ctx, w, h); const cx = w * .45, cy = h * .45; ctx.fillStyle = '#374151'; ctx.beginPath(); ctx.arc(cx, cy, 110, 0, TAU); ctx.fill(); ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.arc(cx, cy, 104, Math.PI * .6, Math.PI * 1.4); ctx.fill(); ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.arc(cx, cy, 104, -Math.PI * .4, Math.PI * .4); ctx.fill(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(cx, cy, 70, 0, TAU); ctx.fill();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(S.th); for (let k = 0; k < 3; k++) { ctx.rotate(TAU / 3); ctx.fillStyle = '#c87533'; rr(ctx, -12, -64, 24, 50, 5); ctx.fill(); } ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(0, 0, 10, 0, TAU); ctx.fill(); ctx.restore();
    G.text(ctx, 'N', cx - 88, cy, { s: 18, w: 900, c: '#fff' }); G.text(ctx, 'S', cx + 88, cy, { s: 18, w: 900, c: '#fff' });
    G.meter(ctx, w * .83, h * .3, 32, S.I, 12, 'A', fmt(S.I, 3) + ' A'); G.text(ctx, 'rpm ≈ ' + Math.round(S.w * 60 / TAU), cx, cy + 140, { s: 14, c: '#fde68a', mono: 1 }); },
  readings(S) { return [rd('التيار I', fmtSI(S.I, 'A')), rd('εback', fmtSI(S.eb, 'V')), rd('السرعة الزاوية', fmt(S.w, 3, 'rad/s')), rd('القدرة المسحوبة VI', fmtSI(S.p.V * S.I, 'W'))]; },
  live: { title: 'التيار و εback مع الزمن', data: S => ({ series: [{ pts: S.h1, name: 'I (A)', color: '#e11d48' }, { pts: S.h2, name: 'εback (V)', color: '#1f5eff' }], opts: { xl: 't (s)' } }) }
});

/* ---------- self-induction: two lamps (fig 44) ---------- */
X({ id: 'self_lamps', ch: 2, sec: '14-2', page: 73, kind: 'تجربة', title: 'المحاثة: تأخر توهج المصباح المربوط مع الملف', desc: 'مصباحان متماثلان: الأول مع ملف (محث) والثاني مع مقاومة تساوي مقاومة الملف، مربوطان على التوازي مع بطارية ومفتاح.', circuit: true, method: 'be', fixedDt: 2e-3, probeDt: .005, speeds: [[.35, 'بطيء'], [1, '1×'], [.1, 'بطيء جداً']],
  tools: ['بطارية', 'مفتاح', 'ملف (محث L) في جوفه قلب من الحديد', 'مقاومة R مساوية لمقاومة الملف', 'مصباحان متماثلان'],
  steps: ['أغلق المفتاح ولاحظ: المصباح المربوط مع المقاومة R يتوهج فوراً، بينما يتأخر توهج المصباح المربوط مع الملف.', 'افتح المفتاح وكرر مع قلب حديد (زيادة L) ولاحظ ازدياد زمن التأخر.'],
  concl: ['التيار في فرع الملف ينمو ببطء بسبب القوة الدافعة الكهربائية المحتثة الذاتية التي تعاكس نمو التيار (قانون لنز): ε = −L ΔI/Δt.', 'هذه الخاصية تسمى المحاثة (الحث الذاتي) وتزداد بزيادة L.', 'ثابت الزمن لنمو التيار τ = L/R.'],
  laws: ['self', 'indE'],
  build(C) { C.add('battery', 2, 4, 2, 14, { val: 6, id: 'B' }); C.add('switch', 2, 4, 6, 4, { id: 'S' }); C.add('wire', 6, 4, 10, 4); C.add('wire', 10, 4, 20, 4);
    C.add('inductor', 10, 4, 10, 9, { val: 8, id: 'L', core: true, label: 'L' }); C.add('resistor', 10, 9, 10, 11, { val: 10, id: 'RL', label: 'r' }); C.add('bulb', 10, 11, 10, 14, { val: 10, rated: 1, id: 'B1', label: 'م1' });
    C.add('rheostat', 20, 4, 20, 9, { val: 10, min: 0, max: 50, id: 'Rh', label: 'R' }); C.add('wire', 20, 9, 20, 11); C.add('bulb', 20, 11, 20, 14, { val: 10, rated: 1, id: 'B2', label: 'م2' });
    C.add('wire', 20, 14, 10, 14); C.add('wire', 10, 14, 2, 14); },
  controls: [BT('المفتاح', [{ t: 'غلق / فتح', cls: 'primary', on: S => { const s = S.C.get('S'); s.closed = !s.closed; S.C.beSteps = 2; } }]), R('L', 'معامل الحث L', .5, 20, 8, .5, 'H', (v, S) => S.C.get('L').val = v)],
  readings(S) { const C = S.C; return [rd('تيار فرع الملف', fmtSI(C.get('B1').i, 'A')), rd('تيار فرع المقاومة', fmtSI(C.get('B2').i, 'A')), rd('ε المحتثة الذاتية', fmtSI(C.get('L').v, 'V')), rd('τ = L/R', fmt(C.get('L').val / 20, 3, 's'))]; },
  scope: [{ id: 'B1', q: 'i', name: 'I (الملف)', color: '#e11d48' }, { id: 'B2', q: 'i', name: 'I (المقاومة)', color: '#1f5eff' }], scopeWin: () => 5
});

/* ---------- Activity 3: neon lamp ---------- */
X({ id: 'neon', ch: 2, sec: '15-2', page: 77, kind: 'نشاط', title: 'نشاط (3): تولد القوة الدافعة الكهربائية المحتثة الذاتية على طرفي الملف', desc: 'مصباح نيون يحتاج 80V ليتوهج مربوط على التوازي مع ملف، والملف مع بطارية 9V ومفتاح.', circuit: true, method: 'be', fixedDt: 5e-5, probeDt: 2e-4, speeds: [[1, '1×'], [.1, 'بطيء'], [.02, 'بطيء جداً']],
  tools: ['بطارية ذات فولطية (9V)', 'مفتاح', 'ملف سلكي في جوفه قلب من الحديد المطاوع', 'مصباح نيون يحتاج (80V) ليتوهج'],
  steps: ['نربط الملف والمفتاح والبطارية على التوالي مع بعض.', 'نربط مصباح النيون على التوازي مع الملف.', 'نغلق دائرة الملف والبطارية بوساطة المفتاح: لا نلاحظ توهج المصباح.', 'نفتح دائرة الملف والبطارية بوساطة المفتاح: نلاحظ توهج مصباح النيون بضوء ساطع لبرهة قصيرة من الزمن، على الرغم من فصل البطارية عن الدائرة.'],
  concl: ['أولاً: عدم توهج مصباح النيون لحظة إغلاق المفتاح كان بسبب أن الفولطية على طرفيه (9V) لم تكن كافية لتوهجه، وذلك لأن نمو التيار من الصفر إلى مقداره الثابت يكون بطيئاً نتيجة لتولد قوة دافعة كهربائية محتثة في الملف تعرقل المسبب لها.', 'ثانياً: توهج مصباح النيون لحظة فتح المفتاح كان بسبب تولد فولطية كبيرة على طرفيه تكفي لتوهجه؛ نتيجة التلاشي السريع للتيار خلال الملف تتولد على طرفيه قوة دافعة كهربائية محتثة ذاتية كبيرة المقدار، فيعمل الملف في هذه الحالة كمصدر طاقة يجهز المصباح بفولطية تكفي لتوهجه.'],
  laws: ['self', 'indE'],
  build(C, S) { C.add('battery', 2, 4, 2, 13, { val: 9, id: 'B' }); C.add('switch', 2, 4, 7, 4, { id: 'S' }); C.add('wire', 7, 4, 12, 4); C.add('inductor', 12, 4, 12, 9, { val: 5, id: 'L', core: true, label: 'L' }); C.add('resistor', 12, 9, 12, 13, { val: 30, id: 'r', label: 'مقاومة الملف' }); C.add('wire', 12, 13, 2, 13); C.add('wire', 12, 4, 18, 4); C.add('neon', 18, 4, 18, 13, { id: 'N' }); C.add('wire', 18, 13, 12, 13); S.peak = 0; },
  controls: [BT('المفتاح', [{ t: 'غلق المفتاح', cls: 'good', on: S => { S.C.get('S').closed = true; S.C.beSteps = 2; } }, { t: 'فتح المفتاح', cls: 'warn', on: S => { S.C.get('S').closed = false; S.C.beSteps = 2; S.C.get('N').peak = 0; } }]), R('L', 'معامل الحث L', .5, 10, 5, .5, 'H', (v, S) => S.C.get('L').val = v)],
  tick(S) { S.peak = S.C.get('N').peak || 0; },
  readings(S) { const C = S.C; return [rd('فرق الجهد على النيون', fmtSI(C.get('N').v, 'V')), rd('أعلى فولطية بعد الفتح', fmtSI(S.peak, 'V')), rd('تيار الملف', fmtSI(C.get('L').i, 'A')), rd('حالة المصباح', C.get('N').on ? 'متوهج ✦' : 'منطفئ'), rd('الطاقة ½LI²', fmtSI(.5 * C.get('L').val * C.get('L').i ** 2, 'J'), 1)]; },
  scope: [{ id: 'N', q: 'v', name: 'V النيون', color: '#ea580c' }], scopeWin: () => .25
});

/* ---------- mutual induction ---------- */
X({ id: 'mutual', ch: 2, sec: '17-2', page: 79, kind: 'تجربة', title: 'الحث المتبادل بين ملفين متجاورين', desc: 'تغيّر التيار في الملف الابتدائي يولد قوة دافعة محتثة في الملف الثانوي المجاور: ε₂ = −M ΔI₁/Δt.',
  tools: ['ملف ابتدائي مع بطارية ومقاومة متغيرة (ريوستات) ومفتاح', 'ملف ثانوي مع كلفانوميتر', 'قلب من الحديد المطاوع'],
  steps: ['حرّك منزلق الريوستات بسرعة لتغيير تيار الابتدائي؛ لاحظ انحراف الكلفانوميتر في الثانوي أثناء التغيير فقط.', 'قرّب الملفين أو أدخل قلب الحديد المشترك؛ لاحظ ازدياد الانحراف (ازدياد M).', 'استعمل «تغيير تلقائي» لتيار الابتدائي بموجة مثلثية ولاحظ أن ε₂ ثابتة المقدار أثناء التزايد والتناقص.'],
  concl: ['ε₂ = −M ΔI₁/Δt حيث M معامل الحث المتبادل.', 'M يعتمد على عدد لفات الملفين وحجم كل ملف وشكله الهندسي والمسافة بينهما ووضعيتهما والنفوذية المغناطيسية للوسط.', 'في حالة الاقتران التام M = √(L₁L₂).'],
  laws: ['mutual', 'faraday'],
  controls: [R('rh', 'مقاومة الريوستات', 2, 30, 10, .1, 'Ω'), R('dist', 'المسافة بين الملفين', 0, 1, .2, .01, '', null, v => Math.round(v * 20) + ' cm'), TG('core', 'قلب حديد مشترك', true), TG('auto', 'تغيير تلقائي لتيار الابتدائي', true)],
  setup(S) { S.I1 = 0; S.e2 = 0; S.h1 = []; S.h2 = []; },
  update(S, dt) { const p = S.p; let rh = p.rh; if (p.auto) rh = 16 + 13 * (2 / Math.PI) * Math.asin(Math.sin(S.t * 2)); S.rhE = rh; const I = 12 / (rh + 2); const old = S.I1; S.I1 += (I - S.I1) * Math.min(1, dt * 30); const L1 = .5, L2 = .08; const k = (p.core ? .95 : .35) * Math.exp(-p.dist * 2.2); S.M = k * Math.sqrt(L1 * L2); S.e2 = -S.M * (S.I1 - old) / Math.max(dt, 1e-4); hist(S, 'h1', S.I1); hist(S, 'h2', S.e2); },
  draw(ctx, w, h, S) { G.bg(ctx, w, h); const p = S.p; const cy = h * .42; const gap = 20 + p.dist * 160; const x1 = w * .5 - gap / 2 - 90, x2 = w * .5 + gap / 2 + 70;
    if (p.core) { ctx.fillStyle = '#6b7280'; ctx.fillRect(x1 - 100, cy - 14, x2 + 90 - x1 + 100, 28); }
    G.coil(ctx, x1, cy, 170, 90, 12, '#e8914a'); G.coil(ctx, x2, cy, 130, 90, 8, '#d97706');
    const a = clamp(S.I1 / 6, 0, 1); for (let k = -1; k <= 1; k++) G.arrow(ctx, x1 - 70, cy + k * 22, x2 + 40 - (1 - Math.exp(-p.dist * 2)) * 80, cy + k * 22, `rgba(125,211,252,${.2 + .6 * a})`, 1.5, 7);
    G.text(ctx, 'الابتدائي', x1, cy + 70, { s: 12, c: '#e2e8f0' }); G.text(ctx, 'الثانوي', x2, cy + 70, { s: 12, c: '#e2e8f0' });
    G.meter(ctx, x2, h * .8, 28, S.e2, .6, 'G', fmt(S.e2, 3) + ' V', { center: true }); G.meter(ctx, x1, h * .8, 28, S.I1, 6, 'A', fmt(S.I1, 3) + ' A'); },
  readings(S) { return [rd('تيار الابتدائي I₁', fmtSI(S.I1, 'A')), rd('ε₂ المحتثة', fmtSI(S.e2, 'V')), rd('معامل الحث المتبادل M', fmtSI(S.M, 'H')), rd('مقاومة الريوستات', fmt(S.rhE ?? S.p.rh, 3, 'Ω'))]; },
  live: { title: 'I₁ و ε₂ مع الزمن', data: S => ({ series: [{ pts: S.h1, name: 'I₁ (A)', color: '#1f5eff' }, { pts: S.h2, name: 'ε₂ (V)', color: '#e11d48' }], opts: { xl: 't (s)', y0zero: false } }) }
});
