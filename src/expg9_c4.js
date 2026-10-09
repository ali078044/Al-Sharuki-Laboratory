'use strict';
/* ====================== الثالث المتوسط — الفصل الرابع: البطارية والقوة الدافعة الكهربائية (ch 34, ص 79–92) ======================
   Merged experiments (book order): g9_bat_intro (1-4) · g9_bat_primary (2-4، 1-2-4) · g9_bat_secondary (2-2-4) · g9_bat_fuel (3-2-4)
   · g9_bat_emf (3-4 + أسئلة الفصل). Parts live in M8.P and are merged at the end (reg: X9).
   Reuses the circuit kit Q33 of chapter 3 (wires, lamps, meters, switch) and adds Q34: beakers, metal plates, a centre-zero
   galvanometer, bubbles, ions and an LED. */
LW({ id: 'g9_emf', cat: 34, name: 'القوة الدافعة الكهربائية', fx: 'emf = ' + FR('<i>W</i>', '<i>q</i>') + ' ، القوة الدافعة (V) = ' + FR('الطاقة المكتسبة (J)', 'كمية الشحنة (C)'), sym: 'القوة الدافعة الكهربائية (emf) هي فرق الجهد الكهربائي بين القطب السالب والقطب الموجب لأي بطارية عندما تكون الدائرة الكهربائية مفتوحة، وهي مقدار الطاقة التي تزودها البطارية لوحدة الشحنة الكهربائية. وحدتها J/C وتساوي الفولط (V)، وتقاس بالفولطميتر.', calc: { in: [['W', 'الطاقة W', 'J', 20], ['q', 'الشحنة q', 'C', 10]], out: 'emf', u: 'V', f: v => v.W / v.q } });
LW({ id: 'g9_battery', cat: 34, name: 'تصنيف البطاريات', fx: 'أولية (لا تشحن) ، ثانوية (يعاد شحنها) ، وقود (تعمل ما دام الوقود يجهز)', sym: 'البطارية مصدر لإنتاج الطاقة الكهربائية عن طريق التفاعل الكيميائي. الأولية: يتوقف عملها بعد استهلاك إحدى موادها ولا يمكن إعادة شحنها (الخلية الكلفانية البسيطة، الخلية الجافة). الثانوية: يعاد شحنها بإمرار تيار معاكس لتيار التفريغ (بطارية السيارة، أيون–الليثيوم). الوقود: تولد التيار باستمرار عند تجهيزها بالوقود من مصدر خارجي (خلية وقود الهيدروجين).' });

const Q34 = Object.assign(Object.create(Q33), {
  C: '#15803d',
  card(ctx, S, L, o) { return Q31.card(ctx, S, L, Object.assign({ bd: '#15803d' }, o || {})); },
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#166534', y); },
  chips(S, id, list, y, cur, click, o = {}) { return Q33.chips(S, id, list, y, cur, click, Object.assign({ col: '#166534' }, o)); },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f0fdf4'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  /* centre-zero galvanometer; f in −1..1 (full scale); returns the two bottom terminals {l, r} */
  galv(ctx, x, y, f, o = {}) {
    const w = o.w || 100, h = o.h || 78, a = -Math.PI / 2 + clamp(f, -1.15, 1.15) * .95;
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; ctx.fillStyle = '#0f766e'; rr(ctx, x - w / 2, y - h / 2, w, h, 10); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#f0fdfa'; rr(ctx, x - w / 2 + 7, y - h / 2 + 7, w - 14, h * .64, 6); ctx.fill();
      const cx = x, cy = y - h / 2 + 7 + h * .64 - 4, R = h * .5; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2 - .95, -Math.PI / 2 + .95); ctx.stroke();
      for (let k = -5; k <= 5; k++) { const t = -Math.PI / 2 + k * .19, l = k % 5 ? 4 : 9; ctx.beginPath(); ctx.moveTo(cx + Math.cos(t) * R, cy + Math.sin(t) * R); ctx.lineTo(cx + Math.cos(t) * (R - l), cy + Math.sin(t) * (R - l)); ctx.stroke(); }
      ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * (R - 2), cy + Math.sin(a) * (R - 2)); ctx.stroke(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, TAU); ctx.fill();
      [-1, 1].forEach(s => { ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.arc(x + s * (w / 2 - 14), y + h / 2 - 9, 5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.stroke(); }); });
    Q33.T(ctx, o.k || 'G', x, y - h / 2 + 22, { s: 13, w: 900, c: '#0f172a' }); Q33.T(ctx, '0', x, y - h / 2 + 7 + h * .64 - 4 - h * .5 - 7, { s: 9, w: 900, c: '#334155' });
    if (o.txt !== '') Q33.T(ctx, o.txt || (Math.abs(f) < .01 ? 'لا انحراف' : f > 0 ? 'انحراف ➜' : '⬅ انحراف'), o.side ? x + w / 2 + 12 : x, o.side ? y : y + h / 2 + 13, { s: 11.5, w: 900, c: '#fff', bg: Math.abs(f) < .01 ? '#64748b' : '#0f766e', a: o.side ? 'left' : 'center' });
    if (o.name) Q33.T(ctx, o.name, x, y - h / 2 - 11, { s: 10.5, w: 900, c: '#0f766e' });
    return { l: [x - w / 2 + 14, y + h / 2 - 9], r: [x + w / 2 - 14, y + h / 2 - 9] };
  },
  /* beaker drawn in two passes: 'back' (glass + nothing) before the plates, 'front' (liquid tint + rim) after them */
  beaker(ctx, x, yb, w, h, lv, col, part) {
    const x0 = x - w / 2, top = yb - h * lv;
    K.raw(ctx, () => { ctx.save();
      if (part === 'back') { ctx.fillStyle = 'rgba(241,245,249,.75)'; rr(ctx, x0, yb - h, w, h, 10); ctx.fill(); }
      else { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x0 + 3, top); ctx.lineTo(x0 + w - 3, top); ctx.lineTo(x0 + w - 3, yb - 10); ctx.quadraticCurveTo(x0 + w - 3, yb - 3, x0 + w - 12, yb - 3); ctx.lineTo(x0 + 12, yb - 3); ctx.quadraticCurveTo(x0 + 3, yb - 3, x0 + 3, yb - 10); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0 + 3, top); ctx.lineTo(x0 + w - 3, top); ctx.stroke();
        ctx.strokeStyle = 'rgba(71,85,105,.85)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0 - 5, yb - h); ctx.lineTo(x0, yb - h + 6); ctx.lineTo(x0, yb - 10); ctx.quadraticCurveTo(x0, yb, x0 + 10, yb); ctx.lineTo(x0 + w - 10, yb); ctx.quadraticCurveTo(x0 + w, yb, x0 + w, yb - 10); ctx.lineTo(x0 + w, yb - h + 6); ctx.lineTo(x0 + w + 5, yb - h); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 + 9, yb - h + 14); ctx.lineTo(x0 + 9, yb - 18); ctx.stroke(); }
      ctx.restore(); });
    return { top, x0, x1: x0 + w };
  },
  MET: { zn: ['#cbd5e1', '#64748b', 'Zn'], cu: ['#fdba74', '#c2410c', 'Cu'], c: ['#475569', '#0f172a', 'C'], pb: ['#94a3b8', '#334155', 'Pb'], pbo: ['#a16207', '#422006', 'PbO₂'] },
  /* vertical metal plate from y0 (top) to y1; returns its top terminal */
  plate(ctx, x, y0, y1, m, o = {}) {
    const M = Q34.MET[m], w = o.w || 22, sh = o.shrink != null ? o.shrink : 1, ww = w * (.35 + .65 * sh);
    K.raw(ctx, () => { ctx.save(); const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, M[1]); g.addColorStop(.45, M[0]); g.addColorStop(1, M[1]); ctx.fillStyle = g; ctx.fillRect(x - w / 2, y0, w, Math.min(40, y1 - y0)); rr(ctx, x - ww / 2, y0, ww, y1 - y0, 3); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.45)'; ctx.lineWidth = 1; ctx.stroke(); ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.arc(x, y0 - 6, 5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.stroke(); ctx.restore(); });
    if (o.label !== '') Q33.T(ctx, o.label || M[2], x, y0 + 22, { s: 11, w: 900, c: '#fff', bg: M[1] });
    return [x, y0 - 6];
  },
  bubbles(ctx, x, y0, y1, t, n, col) { K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = col || 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.3; for (let k = 0; k < n; k++) { const p = ((t * .45 + k / n) % 1), yy = y1 - (y1 - y0) * p, xx = x + Math.sin(k * 2.3 + t * 3) * 6; ctx.beginPath(); ctx.arc(xx, yy, 2 + (k % 3), 0, TAU); ctx.stroke(); } ctx.restore(); }); },
  ion(ctx, x, y, s, lab, col) { K.raw(ctx, () => { ctx.fillStyle = col || (s > 0 ? '#dc2626' : '#2563eb'); ctx.beginPath(); ctx.arc(x, y, 7, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke(); }); Q33.T(ctx, lab || (s > 0 ? '+' : '−'), x, y, { s: 9, w: 900, c: '#fff' }); },
  led(ctx, x, y, b) { b = clamp(b, 0, 1.3); K.raw(ctx, () => { ctx.save(); if (b > .03) { const g = ctx.createRadialGradient(x, y - 10, 2, x, y - 10, 30 + 20 * b); g.addColorStop(0, 'rgba(248,113,113,' + (.8 * Math.min(1, b)) + ')'); g.addColorStop(1, 'rgba(248,113,113,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y - 10, 30 + 20 * b, 0, TAU); ctx.fill(); }
    ctx.fillStyle = b > .03 ? '#ef4444' : '#fca5a5'; ctx.beginPath(); ctx.arc(x, y - 14, 9, Math.PI, 0); ctx.lineTo(x + 9, y - 2); ctx.lineTo(x - 9, y - 2); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.fillStyle = '#9ca3af'; ctx.fillRect(x - 11, y - 3, 22, 4); ctx.restore(); }); return { a: [x - 9, y + 1], b: [x + 9, y + 1] }; },
  /* two-state fill bar */
  bar(ctx, x, y, w, h, f, col, lab) { K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, x, y, w, h, 6); ctx.fill(); ctx.fillStyle = col; rr(ctx, x, y, Math.max(0, w * clamp(f, 0, 1)), h, 6); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.lineWidth = 1; rr(ctx, x, y, w, h, 6); ctx.stroke(); }); if (lab) Q33.T(ctx, lab, x + w / 2, y + h / 2, { s: 11, w: 900, c: '#0f172a' }); }
});

/* =============== A1 — نشاط 1: كيف تعمل بطارية من الليمون (ص 81، الشكلان 1 و 2) =============== */
(() => {
  const PR = { zncu: { n: 'مسمار مغلون + نحاس', e: .9 }, cucu: { n: 'نحاس + نحاس', e: 0 }, znzn: { n: 'مسماران مغلونان', e: 0 } }, RI = 3000;
  const D = { id: 'g9_b_lemon', page: 81, fig: 'الشكلان 1 و 2',
    desc: 'البطارية مصدر لإنتاج الطاقة الكهربائية عن طريق التفاعل الكيميائي، وتتكون من خلية كهربائية واحدة أو أكثر، اخترعها العالم الإيطالي أليساندرو فولطا. في النشاط نغرس مسماراً مغلوناً (سبيكة حديد وخارصين) وقطعة نحاس في حبة ليمون حامض: يعمل النحاس قطباً موجباً والمسمار المغلون قطباً سالباً، فيتولد فرق جهد بين القطبين، وعند وصلهما بملي أميتر ينحرف مؤشره لأن الإلكترونات تنطلق من المسمار بتأثير المحلول الحامضي متجهة نحو النحاس عبر الدائرة الخارجية.',
    tags: 'بطارية الليمون نشاط 1 مسمار مغلون نحاس ملي أميتر فولطا قطب موجب قطب سالب تفاعل كيميائي',
    tools: ['ملي أميتر (مقياس للتيار)', 'مسمار مغلون', 'قطعة من النحاس', 'حبة ليمون حامض', 'أسلاك توصيل'],
    steps: ['اضغط على الليمونة لغرس المسمار وقطعة النحاس فيها (الشكل 2)، ولاحظ انحراف مؤشر الملي أميتر.', 'غيّر الأقطاب إلى «نحاس + نحاس» أو «مسماران مغلونان»: هل ينحرف المؤشر؟', 'زد عدد الليمونات المربوطة على التوالي ثم صِل مصباح LED: متى يضيء؟'],
    concl: ['يتولد فرق جهد بين قطبين من معدنين مختلفين مغروسين في محلول حامضي.', 'النحاس قطب موجب والمسمار المغلون قطب سالب، والإلكترونات تتحرك في الدائرة الخارجية من المسمار نحو النحاس.', 'ربط عدة ليمونات على التوالي يزيد فرق الجهد الكلي.'],
    laws: ['g9_battery', 'g9_emf'],
    controls: [],
    setup(S) { S.n = 1; S.pr = 'zncu'; S.in = 1; S.led = 0; S.fp = 0; },
    V(S) { return S.in ? S.n * PR[S.pr].e : 0; },
    I(S) { const V = D.V(S); if (!V) return 0; if (S.led) return V > 1.7 ? (V - 1.7) / (S.n * RI) : 0; return V / (S.n * RI + 100); },
    update(S, dt) { Q33.adv(S, dt, D.I(S) * 1500, 60); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 380, w - 320), ly = ph ? 360 : Math.min(h - 210, 470), my = ph ? 170 : 200; return { w, h, ph, L, x0, x1, ly, my, cx: (x0 + x1) / 2 }; },
    lx(S, g, i) { const n = S.n, sp = Math.min(g.ph ? 118 : 165, (g.x1 - g.x0 - 30) / n); return g.cx + (i - (n - 1) / 2) * sp; },
    lemon(ctx, x, y, s) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 5; const g = ctx.createRadialGradient(x - 18 * s, y - 14 * s, 4, x, y, 62 * s); g.addColorStop(0, '#fef9c3'); g.addColorStop(.55, '#facc15'); g.addColorStop(1, '#ca8a04'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, 58 * s, 40 * s, 0, 0, TAU); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#eab308'; ctx.beginPath(); ctx.ellipse(x + 58 * s, y, 8 * s, 6 * s, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(x - 58 * s, y, 7 * s, 5 * s, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(x - 20 * s, y - 18 * s, 18 * s, 7 * s, -.3, 0, TAU); ctx.fill(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, V = D.V(S), I = D.I(S), s = g.ph && S.n > 2 ? .82 : 1;
      Q34.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.my - 90, g.x1 - g.x0 + 28, g.ly - g.my + 160);
      const lift = S.in ? 0 : 48, T = [];
      for (let i = 0; i < S.n; i++) { const x = D.lx(S, g, i); D.lemon(ctx, x, g.ly, s);
        const mA = S.pr === 'cucu' ? 'cu' : 'zn', mB = S.pr === 'znzn' ? 'zn' : 'cu';
        const draw = (xx, m) => { K.raw(ctx, () => { ctx.save(); if (m === 'zn') { ctx.fillStyle = '#9ca3af'; ctx.fillRect(xx - 4, g.ly - 62 * s - lift, 8, 70 * s); ctx.fillStyle = '#6b7280'; ctx.beginPath(); ctx.ellipse(xx, g.ly - 62 * s - lift, 9, 4, 0, 0, TAU); ctx.fill(); } else { const gg = ctx.createLinearGradient(xx - 7, 0, xx + 7, 0); gg.addColorStop(0, '#c2410c'); gg.addColorStop(.5, '#fdba74'); gg.addColorStop(1, '#c2410c'); ctx.fillStyle = gg; ctx.fillRect(xx - 7, g.ly - 62 * s - lift, 14, 70 * s); } ctx.restore(); }); return [xx, g.ly - 64 * s - lift]; };
        const a = draw(x - 24 * s, mA), b = draw(x + 24 * s, mB); T.push({ n: a, p: b });
        if (!g.ph || S.n < 3) { Q33.T(ctx, mA === 'zn' ? 'مسمار مغلون' : 'نحاس', x - 24 * s, g.ly + 50 * s, { s: 9.5, w: 900, c: mA === 'zn' ? '#334155' : '#c2410c' }); Q33.T(ctx, mB === 'zn' ? 'مسمار مغلون' : 'نحاس', x + 24 * s, g.ly + 64 * s, { s: 9.5, w: 900, c: mB === 'zn' ? '#334155' : '#c2410c' }); }
        if (S.in && PR[S.pr].e) { Q33.T(ctx, '−', x - 24 * s, g.ly - 80 * s, { s: 14, w: 900, c: '#1e293b' }); Q33.T(ctx, '+', x + 24 * s, g.ly - 80 * s, { s: 14, w: 900, c: '#dc2626' }); } }
      const m = Q33.meter(ctx, g.cx, g.my, 'mA', I * 1000, 1, { name: 'ملي أميتر', d: 2, w: 96, h: 74 });
      const W = [], top = g.ly - 105 * s - lift;
      for (let i = 0; i < S.n - 1; i++) W.push([T[i].p, [T[i].p[0], top], [T[i + 1].n[0], top], T[i + 1].n]);
      W.forEach(p => { Q33.wire(ctx, p, { col: '#475569' }); if (I > 0) Q33.flow(ctx, p, S.fp, 'e'); });
      const last = T[S.n - 1].p, first = T[0].n, yr = m.p[1];
      const Wa = [last, [last[0], top - 20], [Math.max(last[0], m.p[0] + 40), top - 20], [Math.max(last[0], m.p[0] + 40), yr], m.p];
      let Wb; if (S.led) { const lx = (g.x0 + m.n[0]) / 2 - 10, L2 = Q34.led(ctx, lx, yr + 12, I > 0 ? clamp(I / 1e-4, .15, 1.2) : 0); Q33.T(ctx, 'LED', lx, yr + 30, { s: 10, w: 900, c: '#7f1d1d' }); Wb = [m.n, [L2.b[0], m.n[1]]]; Q33.wire(ctx, Wb, { col: '#111827' }); if (I > 0) Q33.flow(ctx, Wb, S.fp, 'e'); Wb = [L2.a, [Math.min(first[0], g.x0 + 20), L2.a[1]], [Math.min(first[0], g.x0 + 20), top - 20], [first[0], top - 20], first]; }
      else Wb = [m.n, [Math.min(first[0], m.n[0] - 40), yr], [Math.min(first[0], m.n[0] - 40), top - 20], [first[0], top - 20], first];
      Q33.wire(ctx, Wa, { col: '#dc2626' }); Q33.wire(ctx, Wb, { col: '#111827' }); if (I > 0) { Q33.flow(ctx, Wa, S.fp, 'e'); Q33.flow(ctx, Wb, S.fp, 'e'); }
      Q33.T(ctx, S.in ? ('فرق الجهد ≈ ' + Q33.f(V, 1) + ' V' + (I > 0 ? ' — الإلكترونات من المسمار نحو النحاس' : '')) : 'اضغط على الليمونة لغرس الأقطاب', g.cx, g.ly + (g.ph ? 92 : 98), { s: fs + .5, w: 900, c: '#fff', bg: I > 0 ? '#166534' : '#64748b', maxW: g.x1 - g.x0 });
      if (!g.ph) Q34.card(ctx, S, [{ t: 'النحاس: قطب موجب +', c: '#c2410c', w: 900 }, { t: 'المسمار المغلون: قطب سالب −', c: '#334155', w: 900 }, { t: 'المحلول الحامضي يحرر الإلكترونات من المسمار فتتحرك نحو النحاس عبر الأسلاك.', c: '#0f172a' }, { t: 'ليمونة واحدة ≈ 0.9 V وتيار أقل من 1 mA', c: '#166534' }, { t: S.led ? (V > 1.7 ? 'يضيء LED لأن الفولطية تجاوزت 1.7 V' : 'LED يحتاج 1.7 V على الأقل: زد عدد الليمونات') : 'جرّب وصل LED بعد ربط 3 ليمونات', c: '#b45309', w: 800 }], { title: 'كيف تعمل بطارية الليمون؟', wd: 280, y: 70 });
      Q33.drawChips(ctx, D.chipsN(S, g)); Q33.drawChips(ctx, D.chipsP(S, g)); Q34.banner(ctx, w, 'نشاط 1: اضغط على الليمونة، واختر الأقطاب وعدد الليمونات');
    },
    chipsN(S, g) { return Q34.chips(S, 'n', [['1', 'ليمونة واحدة'], ['2', 'ليمونتان'], ['3', 'ثلاث ليمونات'], ['led', S.led ? 'إزالة LED' : 'وصل LED']], g.h - 84, String(S.n), (S2, k) => { if (k === 'led') S2.led = S2.led ? 0 : 1; else S2.n = +k; }, { bw: 150 }); },
    chipsP(S, g) { return Q34.chips(S, 'pr', Object.keys(PR).map(k => [k, PR[k].n]), g.h - 128, S.pr, (S2, k) => { S2.pr = k; }, { bw: 190, bh: 30, col: '#0f766e' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = []; for (let i = 0; i < S.n; i++) L.push({ id: 'lemon' + i, x: D.lx(S, g, i), y: g.ly, w: 120, h: 86, tip: S.in ? 'اضغط لسحب الأقطاب' : 'اضغط لغرس الأقطاب', idle: 'اضغط على الليمونة ✋', click: S2 => { S2.in = S2.in ? 0 : 1; } }); return L.concat(D.chipsN(S, g), D.chipsP(S, g)); },
    readings(S) { const V = D.V(S), I = D.I(S); return [rd('الأقطاب', PR[S.pr].n), rd('عدد الليمونات', S.n), rd('فرق الجهد', Q33.f(V, 2) + ' V'), rd('قراءة الملي أميتر', Q33.f(I * 1000, 3) + ' mA')]; },
    record(S) { return { n: S.n, V: +D.V(S).toFixed(2), I: +(D.I(S) * 1000).toFixed(3) }; },
    cols: [['n', 'عدد الليمونات'], ['V', 'فرق الجهد (V)'], ['I', 'التيار (mA)']],
    graph: { x: 'n', y: 'V', xl: 'عدد الليمونات', yl: 'فرق الجهد (V)' },
    explain(S) { const V = D.V(S); if (!S.in) return Q26.ex('المؤشر لا ينحرف.', 'الأقطاب خارج الليمونة فلا يوجد محلول حامضي بينهما ولا يحدث تفاعل كيميائي.', ''); if (!V) return Q26.ex('المؤشر لا ينحرف.', 'القطبان من المعدن نفسه، فلا يتولد فرق جهد بينهما. نحتاج معدنين مختلفين.', ''); return Q26.ex('ينحرف مؤشر الملي أميتر وفرق الجهد ≈ ' + Q33.f(V, 1) + ' V.', 'التفاعل الكيميائي بين المحلول الحامضي والمسمار المغلون يحرر إلكترونات تنساب في الدائرة الخارجية من المسمار (القطب السالب) نحو النحاس (القطب الموجب). الليمونات على التوالي تجمع فولطياتها.', 'البطاريات تصنع بأحجام مختلفة: من بطاريات الساعات الصغيرة إلى بطاريات الغواصات التي تصل كتلتها 910 kg — الشكل 1.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — نشاط 2: تحويل الطاقة الكيميائية إلى كهربائية — الخلية البسيطة (ص 82، الشكل 3) =============== */
(() => {
  const LQ = { acid: { n: 'حامض الكبريتيك المخفف', c: 'rgba(125,211,252,.42)', k: 1 }, water: { n: 'ماء مقطر', c: 'rgba(224,242,254,.4)', k: 0 } };
  const D = { id: 'g9_b_simple', page: 82, fig: 'الشكل 3',
    desc: 'الخلية الكهربائية البسيطة عبارة عن صفيحتين من معدنين مختلفين (مثل النحاس والخارصين) مغمورتين في حامض الكبريتيك المخفف، يتولد بين الصفيحتين فرق جهد كهربائي يقدر بحوالي فولط واحد، إذ إن جهد النحاس أكبر من جهد الخارصين، فتتولد طاقة كافية تسمح بانسياب تيار كهربائي عند ربطها بدائرة خارجية. الكلفانوميتر (G) يتحسس التيارات الصغيرة جداً (µA) وينعكس اتجاه انحراف مؤشره بانعكاس اتجاه التيار.',
    tags: 'الخلية البسيطة نشاط 2 نحاس خارصين حامض الكبريتيك كلفانوميتر طاقة كيميائية طاقة كهربائية فرق جهد فولط',
    tools: ['صفيحة نحاس', 'صفيحة خارصين (زنك)', 'وعاء زجاج فيه حامض الكبريتيك المخفف', 'كلفانوميتر حساس', 'أسلاك توصيل'],
    steps: ['اسحب حامل الصفيحتين إلى الأسفل لغمرهما في الحامض، ولاحظ انحراف مؤشر الكلفانوميتر.', 'اعكس توصيل السلكين: لاحظ انعكاس اتجاه الانحراف.', 'استبدل الحامض بالماء المقطر، أو استعمل صفيحتين من النحاس: هل يمر تيار؟'],
    concl: ['الخلية البسيطة: صفيحتان من معدنين مختلفين في محلول إلكتروليتي.', 'يتولد بين الصفيحتين فرق جهد ≈ 1 V (جهد النحاس أكبر من جهد الخارصين).', 'تتحول الطاقة الكيميائية إلى طاقة كهربائية.'],
    laws: ['g9_battery'],
    controls: [],
    setup(S) { S.dip = 0; S.lq = 'acid'; S.pr = 'zncu'; S.rev = 0; S.fp = 0; },
    I(S) { const d = clamp((S.dip - .25) / .75, 0, 1); return (S.pr === 'zncu' ? 1 : 0) * LQ[S.lq].k * d; },
    update(S, dt) { Q33.adv(S, dt, D.I(S) * 2.5, 60); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 360, w - 320), cx = (x0 + x1) / 2, yb = ph ? 470 : Math.min(h - 170, 540), bh = ph ? 170 : 200, bw = ph ? 210 : 260, gy = ph ? 140 : 160; return { w, h, ph, L, x0, x1, cx, yb, bh, bw, gy }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, I = D.I(S), f = I * (S.rev ? -1 : 1) * .85, t = S.t || 0;
      Q34.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.gy - 80, g.x1 - g.x0 + 28, g.yb - g.gy + 110);
      const yh = g.yb - g.bh - 70 + S.dip * 105, pl = g.bw * .22;
      Q34.beaker(ctx, g.cx, g.yb, g.bw, g.bh, .72, LQ[S.lq].c, 'back');
      const A = Q34.plate(ctx, g.cx - pl, yh, yh + 165, 'zn', { label: 'Zn' }), B = Q34.plate(ctx, g.cx + pl, yh, yh + 165, S.pr === 'cucu' ? 'cu' : 'cu', { label: 'Cu' });
      if (S.pr === 'cucu') Q34.plate(ctx, g.cx - pl, yh, yh + 165, 'cu', { label: 'Cu' });
      K.raw(ctx, () => { ctx.fillStyle = '#92400e'; rr(ctx, g.cx - pl - 34, yh + 4, pl * 2 + 68, 14, 5); ctx.fill(); });
      const top = g.yb - g.bh * .72; if (I > .02) { Q34.bubbles(ctx, g.cx + pl, Math.max(top + 6, yh + 30), Math.min(g.yb - 10, yh + 160), t, 9); }
      Q34.beaker(ctx, g.cx, g.yb, g.bw, g.bh, .72, LQ[S.lq].c, 'front');
      Q33.T(ctx, LQ[S.lq].n, g.cx, g.yb + 18, { s: fs, w: 900, c: '#0369a1' });
      const G2 = Q34.galv(ctx, g.cx, g.gy, f, { name: 'الكلفانوميتر', side: 1, txt: I > .02 ? (Q33.f(I * 300, 0) + ' µA ' + (f > 0 ? '➜' : '⬅')) : 'لا انحراف' });
      const [pL, pR] = S.rev ? [B, A] : [A, B], yw = g.gy + 60;
      const Wl = [G2.l, [G2.l[0], yw], [pL[0] - (S.rev ? -1 : 0) * 0, yw], pL], Wr = [pR, [pR[0], yw + 14], [G2.r[0], yw + 14], G2.r];
      if (S.rev) { Wl[2] = [pL[0], yw]; }
      Q33.wire(ctx, [A, [A[0], yh - 26], [g.cx - pl - 60, yh - 26], [g.cx - pl - 60, g.gy + 40], [S.rev ? G2.r[0] : G2.l[0], g.gy + 40], S.rev ? G2.r : G2.l], { col: '#475569' });
      const Bw = [S.rev ? G2.l : G2.r, [S.rev ? G2.l[0] : G2.r[0], g.gy + 54], [g.cx + pl + 60, g.gy + 54], [g.cx + pl + 60, yh - 26], [B[0], yh - 26], B];
      Q33.wire(ctx, Bw, { col: '#c2410c' });
      if (I > .02) { const Aw = [A, [A[0], yh - 26], [g.cx - pl - 60, yh - 26], [g.cx - pl - 60, g.gy + 40], [S.rev ? G2.r[0] : G2.l[0], g.gy + 40], S.rev ? G2.r : G2.l]; Q33.flow(ctx, [...Aw].reverse(), S.fp, 'e'); Q33.flow(ctx, [...Bw].reverse(), S.fp, 'e'); void Wl; void Wr; }
      if (I > .02) { Q33.T(ctx, '−', g.cx - pl - 22, yh - 8, { s: 15, w: 900, c: '#1e293b' }); Q33.T(ctx, '+', g.cx + pl + 22, yh - 8, { s: 15, w: 900, c: '#dc2626' }); }
      const msg = S.dip < .26 ? 'الصفيحتان خارج المحلول' : S.pr === 'cucu' ? 'معدنان متماثلان: لا فرق جهد' : !LQ[S.lq].k ? 'الماء المقطر لا يوصل: لا تيار' : 'فرق الجهد ≈ 1 V — طاقة كيميائية ⟸ طاقة كهربائية';
      Q33.T(ctx, msg, g.cx, g.yb + (g.ph ? 44 : 46), { s: fs + .5, w: 900, c: '#fff', bg: I > .02 ? '#166534' : '#64748b', maxW: g.x1 - g.x0 });
      if (!g.ph) Q34.card(ctx, S, [{ t: 'الكلفانوميتر G يتحسس التيارات الصغيرة جداً µA، وينعكس اتجاه انحراف مؤشره بانعكاس اتجاه التيار.', c: '#0f172a' }, { t: 'الملي أميتر mA يقيس التيارات الصغيرة: أجزاء الأمبير.', c: '#0f172a' }], { title: 'هل تعلم؟ — للاطلاع', wd: 280, y: 70 });
      Q33.drawChips(ctx, D.chipsA(S, g)); Q33.drawChips(ctx, D.chipsB(S, g)); Q34.banner(ctx, w, 'نشاط 2: اسحب الحامل لغمر الصفيحتين، ثم جرّب الخيارات');
    },
    chipsA(S, g) { return Q34.chips(S, 'lq', [['acid', 'حامض مخفف'], ['water', 'ماء مقطر'], ['rev', '⇄ عكس التوصيل']], g.h - 84, S.lq, (S2, k) => { if (k === 'rev') S2.rev = S2.rev ? 0 : 1; else S2.lq = k; }, { bw: 170 }); },
    chipsB(S, g) { return Q34.chips(S, 'pr', [['zncu', 'خارصين + نحاس'], ['cucu', 'نحاس + نحاس']], g.h - 128, S.pr, (S2, k) => { S2.pr = k; }, { bw: 170, bh: 30, col: '#0f766e' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), yh = g.yb - g.bh - 70 + S.dip * 105, pl = g.bw * .22;
      return [{ id: 'holder', x: g.cx, y: yh + 11, w: pl * 2 + 80, h: 34, axis: 'y', keep: 1, tip: 'اسحب إلى الأسفل لغمر الصفيحتين', idle: 'اسحب الحامل ⬇', drag: (S2, d) => { S2.dip = clamp(S2.dip + d.dy / 105, 0, 1); } }].concat(D.chipsA(S, g), D.chipsB(S, g)); },
    readings(S) { const I = D.I(S); return [rd('المحلول', LQ[S.lq].n), rd('الصفيحتان', S.pr === 'zncu' ? 'خارصين ونحاس' : 'نحاس ونحاس'), rd('الغمر', Math.round(clamp((S.dip - .25) / .75, 0, 1) * 100) + ' %'), rd('التيار', Q33.f(I * 300, 0) + ' µA'), rd('اتجاه الانحراف', I < .02 ? '—' : S.rev ? 'يسار' : 'يمين')]; },
    record(S) { return { d: Math.round(clamp((S.dip - .25) / .75, 0, 1) * 100), I: Math.round(D.I(S) * 300) }; },
    cols: [['d', 'نسبة الغمر (%)'], ['I', 'التيار (µA)']],
    explain(S) { const I = D.I(S); if (I < .02) return Q26.ex('لا ينحرف مؤشر الكلفانوميتر.', S.dip < .26 ? 'الصفيحتان خارج المحلول.' : S.pr === 'cucu' ? 'الصفيحتان من المعدن نفسه فلا فرق جهد بينهما.' : 'الماء المقطر لا يحتوي أيونات كافية فلا يحدث تفاعل ولا يمر تيار.', ''); return Q26.ex('ينحرف مؤشر الكلفانوميتر ' + (S.rev ? 'باتجاه معاكس' : '') + '، دلالة على انسياب تيار.', 'يتولد بين صفيحتي النحاس والخارصين فرق جهد ≈ 1 V لأن جهد النحاس أكبر من جهد الخارصين، فتتحول الطاقة الكيميائية إلى طاقة كهربائية. هذا الجهاز يدعى الخلية الكهربائية البسيطة.', 'تظهر فقاعات غاز الهيدروجين عند صفيحة النحاس.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — تصنيف البطاريات: لعبة السحب إلى الأصناف الثلاثة (ص 82، 2-4) =============== */
(() => {
  const IT = [['watch', 'بطارية الساعة', 'p', '⌚'], ['dry', 'الخلية الجافة', 'p', '🔦'], ['galv', 'الخلية الكلفانية', 'p', '⚗'], ['lemon', 'بطارية الليمون', 'p', '🍋'], ['car', 'بطارية السيارة', 's', '🚗'], ['li', 'أيون–الليثيوم', 's', '📱'], ['h2', 'خلية وقود الهيدروجين', 'f', '💧']];
  const BN = { p: ['البطارية الأولية', 'لا يمكن إعادة شحنها', '#b45309'], s: ['البطارية الثانوية', 'يعاد شحنها', '#1d4ed8'], f: ['بطارية الوقود', 'تعمل ما دام الوقود يجهز', '#15803d'] };
  const D = { id: 'g9_b_classify', page: 82, fig: 'مخطط تصنيف البطاريات',
    desc: 'هناك أنواع مختلفة من البطاريات تحدد أنواعها حسب المواد الكيميائية الداخلة في تركيبها، مثل البطاريات ذوات الوسط السائل (كبطارية السيارة) وذوات الوسط الصلب كالمساحيق أو المعاجين (كالخلايا الجافة) وذوات الوسط الغازي (كبطارية الوقود)، أو تصنف بحسب إمكانية شحنها إلى ثلاثة أنواع: البطارية الأولية، البطارية الثانوية، بطارية الوقود.',
    tags: 'تصنيف البطاريات أولية ثانوية وقود شحن خلية جافة بطارية السيارة أيون الليثيوم الهيدروجين',
    tools: ['بطاقات لأنواع مختلفة من البطاريات'],
    steps: ['اسحب كل بطاقة إلى الصنف المناسب في الأسفل.', 'البطاقة الخضراء موضوعة صحيحاً والحمراء خطأ: أعد سحبها.', 'اضغط «↺ من جديد» لإعادة اللعبة.'],
    concl: ['الأولية: يتوقف عملها بعد استهلاك إحدى موادها ولا يمكن إعادة شحنها.', 'الثانوية: يعاد شحنها بإمرار تيار معاكس لتيار التفريغ.', 'بطارية الوقود: تولد التيار باستمرار عند تجهيزها بالوقود.'],
    laws: ['g9_battery'],
    controls: [],
    setup(S) { S.as = {}; S.dg = null; S.dx = 0; S.dy = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 0 : 20), x1 = ph ? w - 12 : w - 20, cols = ph ? 2 : 4, cw = (x1 - x0 - (cols - 1) * 10) / cols, chh = ph ? 40 : 46, y0 = ph ? 110 : 90, by = ph ? h - 380 : Math.min(h - 330, y0 + 2 * (chh + 12) + 70), bh = ph ? 200 : 200, bw = (x1 - x0 - 20) / 3; return { w, h, ph, L, x0, x1, cols, cw, chh, y0, by, bh, bw }; },
    home(S, g, i) { return [g.x0 + (i % g.cols) * (g.cw + 10) + g.cw / 2, g.y0 + Math.floor(i / g.cols) * (g.chh + 12) + g.chh / 2]; },
    binX(g, j) { return g.x0 + j * (g.bw + 10); },
    slot(S, g, k) { const b = S.as[k], j = 'psf'.indexOf(b), list = IT.filter(q => S.as[q[0]] === b).map(q => q[0]), n = list.indexOf(k); const cw = g.ph ? g.bw - 8 : g.bw - 16; return [D.binX(g, j) + g.bw / 2, g.by + 44 + n * (g.ph ? 32 : 30) + 12, cw]; },
    pos(S, g, i) { const k = IT[i][0]; if (S.dg === k) return [S.dx, S.dy, g.cw]; if (S.as[k]) return D.slot(S, g, k); const p = D.home(S, g, i); return [p[0], p[1], g.cw]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 9.5 : 11.5; Q34.bg(ctx, w, h);
      ['p', 's', 'f'].forEach((b, j) => { const x = D.binX(g, j); K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.strokeStyle = BN[b][2]; ctx.lineWidth = 2.5; ctx.setLineDash([7, 5]); rr(ctx, x, g.by, g.bw, g.bh, 12); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = BN[b][2]; rr(ctx, x, g.by, g.bw, 36, 12); ctx.fill(); });
        Q33.T(ctx, BN[b][0], x + g.bw / 2, g.by + 12, { s: fs + 1, w: 900, c: '#fff' }); Q33.T(ctx, BN[b][1], x + g.bw / 2, g.by + 27, { s: fs - 1, w: 800, c: '#fff' }); });
      let ok = 0, bad = 0; IT.forEach((q, i) => { if (S.as[q[0]]) { if (S.as[q[0]] === q[2]) ok++; else bad++; } });
      IT.forEach((q, i) => { const [x, y, cw] = D.pos(S, g, i), a = S.as[q[0]], dragging = S.dg === q[0], c = dragging ? '#334155' : !a ? '#166534' : a === q[2] ? '#15803d' : '#b91c1c', hh = a && !dragging ? (g.ph ? 28 : 26) : g.chh;
        K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = dragging ? 14 : 5; ctx.shadowOffsetY = 3; ctx.fillStyle = a && !dragging ? (a === q[2] ? '#dcfce7' : '#fee2e2') : '#fff'; ctx.strokeStyle = c; ctx.lineWidth = 2; rr(ctx, x - cw / 2, y - hh / 2, cw, hh, 8); ctx.fill(); ctx.restore(); ctx.strokeStyle = c; ctx.lineWidth = 2; rr(ctx, x - cw / 2, y - hh / 2, cw, hh, 8); ctx.stroke(); });
        Q33.T(ctx, q[3] + ' ' + q[1] + (a && !dragging ? (a === q[2] ? ' ✔' : ' ✖') : ''), x, y, { s: a && !dragging ? fs - .5 : fs, w: 900, c: c, maxW: cw - 8 }); });
      const done = ok === IT.length;
      Q33.T(ctx, done ? '🎉 أحسنت! صنّفت جميع البطاريات صحيحاً' : 'صحيح: ' + ok + ' من ' + IT.length + (bad ? ' — أعد سحب البطاقات الحمراء' : ''), (g.x0 + g.x1) / 2, g.by - 22, { s: fs + 1.5, w: 900, c: '#fff', bg: done ? '#15803d' : bad ? '#b91c1c' : '#166534' });
      Q33.drawChips(ctx, D.chips(S, g)); Q34.banner(ctx, w, 'اسحب كل بطاقة إلى صنفها: أولية، ثانوية، وقود');
    },
    chips(S, g) { return Q34.chips(S, 'cl', [['rs', '↺ من جديد'], ['sol', '✔ أظهر الحل']], g.h - 84, '', (S2, k) => { if (k === 'rs') S2.as = {}; else { const A = {}; IT.forEach(q => { A[q[0]] = q[2]; }); S2.as = A; } }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      return IT.map((q, i) => { const [x, y, cw] = D.pos(S, g, i), a = S.as[q[0]]; return { id: 'card_' + q[0], x, y, w: cw, h: a ? 28 : g.chh, axis: 'xy', keep: 1, tip: 'اسحب إلى الصنف المناسب', idle: 'اسحب البطاقة ✋', hint: i ? false : undefined,
        drag: (S2, d) => { S2.dg = q[0]; S2.dx = d.x; S2.dy = d.y; },
        up: (S2, x2, y2) => { if (S2.dg !== q[0]) return; const g2 = D.geo(S2); let b = null; ['p', 's', 'f'].forEach((k, j) => { const bx = D.binX(g2, j); if (x2 >= bx && x2 <= bx + g2.bw && y2 >= g2.by - 20 && y2 <= g2.by + g2.bh + 20) b = k; }); const A = Object.assign({}, S2.as); if (b) A[q[0]] = b; else delete A[q[0]]; S2.as = A; S2.dg = null; } }; }).concat(D.chips(S, g)); },
    readings(S) { let ok = 0; IT.forEach(q => { if (S.as[q[0]] === q[2]) ok++; }); return [rd('المصنفة', Object.keys(S.as).length + ' / ' + IT.length), rd('الصحيحة', ok)]; },
    explain(S) { return Q26.ex('البطاريات ثلاثة أصناف حسب إمكانية شحنها.', 'الأولية (الخلية الكلفانية، الخلية الجافة، بطارية الساعة، الليمون) ينتهي مفعولها بعد استهلاك إحدى موادها فيتطلب التخلص منها. الثانوية (السيارة، أيون–الليثيوم) يعاد شحنها. بطارية الوقود (الهيدروجين) تعمل باستمرار ما دام الوقود يجهز من مصدر خارجي.', 'تخلص من البطاريات الأولية المستهلكة في الأماكن المخصصة لها — الشكل 4.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — الخلية الكلفانية البسيطة: خلية دانيال والجسر الملحي (ص 83، الأشكال 4 و 5) =============== */
(() => {
  const D = { id: 'g9_b_daniell', page: 83, fig: 'الشكلان 4 و 5',
    desc: 'تتكون الخلية الكلفانية من نصفي خليتين، يغمر في كل منهما لوح معدني: لوح الخارصين (Zn) في محلول كبريتات الخارصين (ZnSO₄) ولوح النحاس (Cu) في محلول كبريتات النحاس (CuSO₄). ذرات المعدن تترك الإلكترونات على اللوح وتدخل المحلول على هيئة أيونات موجبة، وتراكم الإلكترونات على لوح الخارصين (القطب السالب) أكبر من تراكمها على لوح النحاس (القطب الموجب)، وسميت خلية دانيال نسبة إلى مخترعها. الجسر الملحي يربط المحلولين بشكل غير مباشر ويساعد على هجرة الأيونات. وهي بطارية أولية: يتوقف عملها بعد استهلاك إحدى موادها ولا يمكن إعادة شحنها.',
    tags: 'الخلية الكلفانية خلية دانيال جسر ملحي خارصين نحاس كبريتات الخارصين كبريتات النحاس أيونات بطارية أولية',
    tools: ['لوح خارصين في محلول ZnSO₄', 'لوح نحاس في محلول CuSO₄', 'جسر ملحي', 'مصباح صغير', 'مفتاح', 'أسلاك توصيل'],
    steps: ['أغلق المفتاح: لاحظ الإلكترونات تتحرك في السلك من الخارصين نحو النحاس، والأيونات تهاجر في الجسر الملحي.', 'اضغط على الجسر الملحي لرفعه: ماذا يحدث للتيار؟', 'اترك الخلية تعمل حتى يستهلك لوح الخارصين، ثم جرّب «إعادة الشحن».'],
    concl: ['لوح الخارصين قطب سالب ولوح النحاس قطب موجب.', 'الجسر الملحي يكمل الدائرة داخلياً بهجرة الأيونات؛ برفعه يتوقف التيار.', 'الخلية الكلفانية بطارية أولية: ينتهي مفعولها باستهلاك الخارصين ولا يعاد شحنها.'],
    laws: ['g9_battery'],
    controls: [],
    setup(S) { S.on = 0; S.br = 1; S.zn = 1; S.fp = 0; S.msg = ''; },
    I(S) { return S.on && S.br && S.zn > 0 ? 1 : 0; },
    update(S, dt) { const I = D.I(S); if (I) S.zn = Math.max(0, S.zn - dt / 40); Q33.adv(S, dt, I * 1.4, 60); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 420, w - 320), cx = (x0 + x1) / 2, bw = ph ? 130 : 160, bh = ph ? 150 : 180, dx = ph ? 88 : 125, yb = ph ? 470 : Math.min(h - 170, 540), ty = ph ? 150 : 170; return { w, h, ph, L, x0, x1, cx, bw, bh, dx, yb, ty }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, I = D.I(S), t = S.t || 0, xa = g.cx - g.dx, xb = g.cx + g.dx;
      Q34.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.ty - 80, g.x1 - g.x0 + 28, g.yb - g.ty + 110);
      Q34.beaker(ctx, xa, g.yb, g.bw, g.bh, .74, '', 'back'); Q34.beaker(ctx, xb, g.yb, g.bw, g.bh, .74, '', 'back');
      const yp = g.yb - g.bh - 30, A = Q34.plate(ctx, xa - g.bw * .18, yp, g.yb - 22, 'zn', { label: 'Zn', shrink: .15 + .85 * S.zn, w: 26 }), B = Q34.plate(ctx, xb + g.bw * .18, yp, g.yb - 22, 'cu', { label: 'Cu', w: 22 + 6 * (1 - S.zn) });
      const top = g.yb - g.bh * .74;
      if (I) for (let k = 0; k < 5; k++) { const p = ((t * .25 + k / 5) % 1); Q34.ion(ctx, xa - g.bw * .18 + 18 + p * 34, top + 30 + k * 18, 1, 'Zn²⁺', '#64748b'); const p2 = ((t * .25 + k / 5) % 1); Q34.ion(ctx, xb + g.bw * .18 - 18 - (1 - p2) * 34, top + 26 + k * 18, 1, 'Cu²⁺', '#2563eb'); }
      Q34.beaker(ctx, xa, g.yb, g.bw, g.bh, .74, 'rgba(226,232,240,.55)', 'front'); Q34.beaker(ctx, xb, g.yb, g.bw, g.bh, .74, 'rgba(59,130,246,.42)', 'front');
      Q33.T(ctx, 'ZnSO₄', xa, g.yb + 16, { s: fs, w: 900, c: '#334155' }); Q33.T(ctx, 'CuSO₄', xb, g.yb + 16, { s: fs, w: 900, c: '#1d4ed8' });
      // salt bridge
      const by = S.br ? top + 40 : top - 70, bx0 = xa + g.bw * .22, bx1 = xb - g.bw * .22, bt = Math.min(by, top) - 46;
      K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const P = () => { ctx.beginPath(); ctx.moveTo(bx0, by); ctx.lineTo(bx0, bt + 14); ctx.quadraticCurveTo(bx0, bt, bx0 + 14, bt); ctx.lineTo(bx1 - 14, bt); ctx.quadraticCurveTo(bx1, bt, bx1, bt + 14); ctx.lineTo(bx1, by); }; P(); ctx.strokeStyle = 'rgba(71,85,105,.8)'; ctx.lineWidth = 20; ctx.stroke(); P(); ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 15; ctx.stroke(); ctx.restore(); });
      if (I) for (let k = 0; k < 6; k++) { const p = ((t * .18 + k / 6) % 1), x = bx0 + 14 + (bx1 - bx0 - 28) * p; Q34.ion(ctx, k % 2 ? x : bx1 - 14 - (bx1 - bx0 - 28) * p, bt, k % 2 ? 1 : -1); }
      Q33.T(ctx, S.br ? 'الجسر الملحي' : 'الجسر الملحي مرفوع', g.cx, bt - 20, { s: fs, w: 900, c: S.br ? '#334155' : '#b91c1c' });
      // external circuit
      const lb = Q33.bulb(ctx, g.cx, g.ty, I ? .9 : 0, { label: '' }), sw = Q33.sw(ctx, g.cx - 40, g.cx + 10, g.ty + 62, S.on);
      const Wc = [B, [B[0], g.ty], lb.b], Wz = [lb.a, [g.cx - 70, g.ty], [g.cx - 70, g.ty + 62], sw.a], Wz2 = [sw.b, [g.cx + 40, g.ty + 62], [g.cx + 40, g.ty + 100], [A[0], g.ty + 100], A];
      Q33.wire(ctx, Wc, { col: '#c2410c' }); Q33.wire(ctx, Wz, { col: '#475569' }); Q33.wire(ctx, Wz2, { col: '#475569' });
      if (I) { [Wc, Wz, Wz2].forEach(p => Q33.flow(ctx, p, S.fp, 'e')); }
      Q33.T(ctx, '− القطب السالب', A[0], yp - 40, { s: fs, w: 900, c: '#1e293b' }); Q33.T(ctx, 'القطب الموجب +', B[0], yp - 40, { s: fs, w: 900, c: '#dc2626' });
      Q34.bar(ctx, xa - 60, g.yb + 32, 120, 14, S.zn, S.zn > .15 ? '#64748b' : '#b91c1c'); Q33.T(ctx, 'الخارصين المتبقي ' + Math.round(S.zn * 100) + ' %', xa, g.yb + 58, { s: fs - .5, w: 900, c: '#334155' });
      const msg = S.zn <= 0 ? 'استهلك لوح الخارصين: انتهى مفعول الخلية' : !S.on ? 'الدائرة مفتوحة: اضغط على المفتاح' : !S.br ? 'لا تيار: الجسر الملحي مرفوع' : 'تيار ينساب: الإلكترونات من Zn إلى Cu عبر السلك';
      Q33.T(ctx, S.msg || msg, (g.x0 + g.x1) / 2, g.yb + (g.ph ? 84 : 88), { s: fs + .5, w: 900, c: '#fff', bg: S.msg || S.zn <= 0 ? '#b91c1c' : I ? '#166534' : '#64748b', maxW: g.x1 - g.x0 });
      if (!g.ph) Q34.card(ctx, S, [{ t: 'الجسر الملحي يربط محلولي الإناءين بشكل غير مباشر، ويساعد على هجرة الأيونات الموجبة والسالبة.', c: '#0f172a' }, { t: 'الخلية الكلفانية بطارية أولية: لا يمكن إعادة شحنها.', c: '#b45309', w: 900 }], { title: 'هل تعلم؟ — للاطلاع', wd: 280, y: 70 });
      Q33.drawChips(ctx, D.chips(S, g)); Q34.banner(ctx, w, 'أغلق المفتاح، واضغط على الجسر الملحي لرفعه أو إعادته');
    },
    chips(S, g) { return Q34.chips(S, 'dn', [['ch', '⚡ محاولة إعادة الشحن'], ['new', '↺ خلية جديدة'], ['fast', '⏩ استهلاك سريع']], g.h - 84, '', (S2, k) => { if (k === 'new') { S2.zn = 1; S2.msg = ''; } else if (k === 'fast') { S2.zn = Math.max(0, S2.zn - .35); S2.msg = ''; } else S2.msg = S2.zn < 1 ? 'لا يمكن إعادة شحن البطارية الأولية: يجب التخلص منها' : 'الخلية جديدة — ولا يمكن شحنها لأنها أولية'; }, { bw: 190 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), xa = g.cx - g.dx, xb = g.cx + g.dx, top = g.yb - g.bh * .74, by = S.br ? top + 40 : top - 70, bt = Math.min(by, top) - 46;
      return [{ id: 'sw', x: g.cx - 15, y: g.ty + 62, w: 90, h: 44, tip: 'اضغط لفتح/إغلاق المفتاح', idle: 'اضغط على المفتاح ✋', click: S2 => { S2.on = S2.on ? 0 : 1; } },
        { id: 'bridge', x: g.cx, y: bt + 10, w: xb - xa, h: 40, tip: S.br ? 'اضغط لرفع الجسر الملحي' : 'اضغط لإعادة الجسر الملحي', click: S2 => { S2.br = S2.br ? 0 : 1; } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('المفتاح', S.on ? 'مغلق' : 'مفتوح'), rd('الجسر الملحي', S.br ? 'موجود' : 'مرفوع'), rd('الخارصين المتبقي', Math.round(S.zn * 100) + ' %'), rd('المصباح', D.I(S) ? 'يتوهج' : 'منطفئ')]; },
    explain(S) { return Q26.ex(D.I(S) ? 'يتوهج المصباح ويتآكل لوح الخارصين تدريجياً.' : 'المصباح منطفئ.', 'ذرات الخارصين تترك إلكتروناتها على اللوح وتدخل المحلول أيونات Zn²⁺، فتتراكم الإلكترونات على لوح الخارصين (القطب السالب) وتنساب عبر السلك نحو النحاس (القطب الموجب) حيث تترسب أيونات Cu²⁺. الجسر الملحي يسمح بهجرة الأيونات فيكمل الدائرة؛ وعند استهلاك الخارصين يتوقف عمل الخلية نهائياً.', 'سميت خلية دانيال نسبة إلى مخترعها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B3 — الخلية الجافة (كاربون – خارصين): مقطع تفصيلي واستعمالاتها (ص 84، الشكلان 6 و 7) =============== */
(() => {
  const PT = {
    cap: { n: 'الغطاء المعدني (القطب الموجب +)', d: 'غطاء نحاسي فوق عمود الكاربون يمثل القطب الموجب للخلية.', c: '#ca8a04' },
    seal: { n: 'مادة عازلة', d: 'تغلف فتحة الوعاء العليا بمادة عازلة لحفظ مكونات الخلية.', c: '#ea580c' },
    rod: { n: 'عمود الكاربون (القطب الموجب)', d: 'عمود من الكاربون في وسط الخلية يعمل كقطب موجب.', c: '#0f172a' },
    mix: { n: 'ثنائي أوكسيد المنغنيز ومسحوق الكاربون', d: 'خليط يحيط بعمود الكاربون، وهو جزء من العجينة الإلكتروليتية.', c: '#57534e' },
    paste: { n: 'العجينة الإلكتروليتية', d: 'تتكون من كلوريد الأمونيوم وكلوريد الخارصين والماء وثنائي أوكسيد المنغنيز ومسحوق الكاربون.', c: '#a16207' },
    zn: { n: 'وعاء الخارصين (القطب السالب −)', d: 'وعاء من الخارصين يحيط بمكونات الخلية ويعمل كقطب سالب.', c: '#64748b' }
  };
  const DEV = { torch: ['🔦', 'كشّاف ضوئي يدوي'], remote: ['📺', 'جهاز السيطرة عن بعد'], cam: ['📷', 'آلة التصوير'], toy: ['🚂', 'لعبة أطفال كهربائية'] };
  const D = { id: 'g9_b_dry', page: 84, fig: 'الشكلان 6 و 7',
    desc: 'الخلية الجافة (كاربون – خارصين) خلية ذات وسط جاف تتركب من وعاء من الخارصين يعمل كقطب سالب، في وسطه عمود من الكاربون يعمل كقطب موجب محاط بعجينة إلكتروليتية (كلوريد الأمونيوم وكلوريد الخارصين والماء وثنائي أوكسيد المنغنيز ومسحوق الكاربون)، وتغلف فتحة الوعاء العليا بمادة عازلة لحفظها. نتيجة التفاعل الكيميائي يتولد فرق جهد بين طرفيها مقداره 1.5 V فينساب تيار عند ربط طرفيها بحمل خارجي مناسب.',
    tags: 'الخلية الجافة كاربون خارصين عجينة إلكتروليتية ثنائي أوكسيد المنغنيز كلوريد الأمونيوم 1.5 V كشافة ريموت كاميرا لعب الأطفال',
    tools: ['خلية جافة (مقطع طولي)', 'أجهزة تعمل بالخلايا الجافة'],
    steps: ['اضغط على كل جزء في المقطع الطولي لتتعرف عليه (الشكل 7).', 'اختر جهازاً من الأسفل لتشغيله بالخلية الجافة.', 'قارن «تيار صغير متقطع» مع «تيار كبير مستمر»: أيهما يطيل عمر الخلية؟'],
    concl: ['وعاء الخارصين قطب سالب وعمود الكاربون قطب موجب.', 'فرق الجهد بين طرفي الخلية الجافة 1.5 V.', 'سحب تيار كبير لمدة قصيرة يقصّر عمر الخلية، والخزن الطويل يقلل كفاءتها.'],
    laws: ['g9_battery'],
    controls: [],
    setup(S) { S.sel = 'rod'; S.dev = 'torch'; S.on = 1; S.use = 'small'; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), cx = ph ? w * .3 : L + 170, cy = ph ? 300 : Math.min(h / 2, 360), cw = ph ? 120 : 170, ch = ph ? 260 : 340; return { w, h, ph, L, cx, cy, cw, ch }; },
    regions(g) { const x0 = g.cx - g.cw / 2, y0 = g.cy - g.ch / 2, cw = g.cw, ch = g.ch; return {
      cap: [g.cx - cw * .14, y0 - 18, cw * .28, 18], seal: [x0 + 8, y0 + 4, cw - 16, ch * .07], rod: [g.cx - cw * .07, y0 + ch * .02, cw * .14, ch * .82], mix: [g.cx - cw * .25, y0 + ch * .13, cw * .5, ch * .72], paste: [x0 + 10, y0 + ch * .1, cw - 20, ch * .82], zn: [x0, y0, cw, ch] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, R = D.regions(g), x0 = g.cx - g.cw / 2, y0 = g.cy - g.ch / 2;
      Q34.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 6;
        const draw = (k, fill) => { const r = R[k]; ctx.fillStyle = fill; rr(ctx, r[0], r[1], r[2], r[3], k === 'zn' ? 14 : k === 'cap' ? 4 : 8); ctx.fill(); };
        let gg = ctx.createLinearGradient(x0, 0, x0 + g.cw, 0); gg.addColorStop(0, '#475569'); gg.addColorStop(.5, '#cbd5e1'); gg.addColorStop(1, '#475569'); draw('zn', gg); ctx.shadowColor = 'transparent';
        draw('paste', '#d6a35c'); for (let k = 0; k < 60; k++) { ctx.fillStyle = 'rgba(120,53,15,.35)'; ctx.beginPath(); ctx.arc(R.paste[0] + ((k * 37) % R.paste[2]), R.paste[1] + ((k * 53) % R.paste[3]), 1.6, 0, TAU); ctx.fill(); }
        draw('mix', '#44403c'); for (let k = 0; k < 50; k++) { ctx.fillStyle = 'rgba(214,211,209,.35)'; ctx.beginPath(); ctx.arc(R.mix[0] + ((k * 29) % R.mix[2]), R.mix[1] + ((k * 41) % R.mix[3]), 1.4, 0, TAU); ctx.fill(); }
        gg = ctx.createLinearGradient(R.rod[0], 0, R.rod[0] + R.rod[2], 0); gg.addColorStop(0, '#020617'); gg.addColorStop(.5, '#475569'); gg.addColorStop(1, '#020617'); draw('rod', gg);
        draw('seal', '#f97316'); gg = ctx.createLinearGradient(R.cap[0], 0, R.cap[0] + R.cap[2], 0); gg.addColorStop(0, '#a16207'); gg.addColorStop(.5, '#fde68a'); gg.addColorStop(1, '#a16207'); draw('cap', gg);
        const r = R[S.sel]; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3.5; ctx.setLineDash([6, 4]); rr(ctx, r[0] - 3, r[1] - 3, r[2] + 6, r[3] + 6, 8); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); });
      Q33.T(ctx, '+', g.cx, y0 - 34, { s: 18, w: 900, c: '#dc2626' }); Q33.T(ctx, '−', g.cx, y0 + g.ch + 18, { s: 18, w: 900, c: '#1e293b' }); Q33.T(ctx, '1.5 V', g.cx + g.cw / 2 + 30, g.cy, { s: 13, w: 900, c: '#fff', bg: '#166534' });
      // labels with leader lines (desktop)
      if (!g.ph) { const lx = g.cx + g.cw / 2 + 80; Object.keys(PT).forEach((k, i) => { const r = R[k], ly = y0 + 10 + i * (g.ch / 6), on = S.sel === k; K.raw(ctx, () => { ctx.strokeStyle = on ? '#dc2626' : '#94a3b8'; ctx.lineWidth = on ? 2 : 1.2; ctx.beginPath(); ctx.moveTo(r[0] + r[2] - 4, r[1] + Math.min(r[3] / 2, 30)); ctx.lineTo(lx - 6, ly); ctx.stroke(); }); Q33.T(ctx, PT[k].n, lx, ly, { s: 11, w: 900, c: '#fff', bg: on ? '#dc2626' : PT[k].c, a: 'left' }); }); }
      const P = PT[S.sel], dv = DEV[S.dev], life = S.use === 'small' ? 1 : .35;
      Q34.card(ctx, S, [{ t: P.n, c: '#dc2626', w: 900 }, { t: P.d, c: '#0f172a' }], { title: 'الجزء المختار', wd: 280, y: g.ph ? g.cy + g.ch / 2 + 40 : 70 });
      if (!g.ph) { const dx = g.w - 110, dy = 250; Q33.T(ctx, dv[0], dx, dy, { s: 46, c: '#0f172a' }); if (S.on) Q33.T(ctx, '✨', dx + 40, dy - 24, { s: 22 }); Q33.T(ctx, dv[1] + (S.on ? ' — يعمل' : ' — متوقف'), dx, dy + 44, { s: 11.5, w: 900, c: '#fff', bg: S.on ? '#166534' : '#64748b' });
        Q34.bar(ctx, dx - 90, dy + 76, 180, 16, life, life > .5 ? '#16a34a' : '#dc2626'); Q33.T(ctx, 'عمر الخلية النسبي: ' + (life > .5 ? 'طويل' : 'قصير'), dx, dy + 106, { s: 11, w: 900, c: '#334155' }); }
      Q33.drawChips(ctx, D.chipsD(S, g)); Q33.drawChips(ctx, D.chipsU(S, g)); Q34.banner(ctx, w, 'اضغط على أجزاء الخلية الجافة، واختر جهازاً يعمل بها');
    },
    chipsD(S, g) { return Q34.chips(S, 'dev', Object.keys(DEV).map(k => [k, DEV[k][0] + ' ' + DEV[k][1]]), g.h - 84, S.dev, (S2, k) => { S2.dev = k; S2.on = 1; }, { bw: 190 }); },
    chipsU(S, g) { return Q34.chips(S, 'use', [['small', 'تيار صغير متقطع'], ['big', 'تيار كبير مستمر']], g.h - 128, S.use, (S2, k) => { S2.use = k; }, { bw: 170, bh: 30, col: '#0f766e' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), R = D.regions(g), L = [];
      ['zn', 'paste', 'mix', 'seal', 'rod', 'cap'].forEach(k => { const r = R[k]; L.push({ id: 'pt_' + k, x: k === 'mix' || k === 'seal' ? r[0] + 16 : r[0] + r[2] / 2, y: k === 'zn' ? r[1] + r[3] - 10 : k === 'paste' ? r[1] + r[3] - 24 : k === 'mix' ? r[1] + r[3] - 30 : r[1] + r[3] / 2, w: k === 'mix' || k === 'seal' ? 28 : r[2], h: k === 'zn' ? 20 : k === 'paste' ? 24 : k === 'mix' ? 30 : r[3], tip: PT[k].n, idle: 'اضغط على جزء ✋', click: S2 => { S2.sel = k; } }); });
      return L.concat(D.chipsD(S, g), D.chipsU(S, g)); },
    readings(S) { return [rd('الجزء المختار', PT[S.sel].n), rd('فرق الجهد', '1.5 V'), rd('الجهاز', DEV[S.dev][1]), rd('طريقة الاستعمال', S.use === 'small' ? 'تيار صغير متقطع' : 'تيار كبير مستمر')]; },
    explain(S) { return Q26.ex('الخلية الجافة تجهز فرق جهد 1.5 V.', 'التفاعل الكيميائي بين وعاء الخارصين (القطب السالب) والعجينة الإلكتروليتية حول عمود الكاربون (القطب الموجب) يولد فرق جهد 1.5 V، فينساب تيار عند ربطها بحمل خارجي. ' + (S.use === 'big' ? 'سحب تيار كبير في فترة قصيرة يقصّر عمر الخلية.' : 'يفضل استعمالها لتجهيز تيارات صغيرة المقدار وبصورة متقطعة.'), 'خزن الخلية لفترة طويلة يقلل من كفاءتها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — بطارية السيارة (رصاص – حامض) وشحنها والعناية بها (ص 85–86، الأشكال 8–10) =============== */
(() => {
  const RI = .35;
  const D = { id: 'g9_b_car', page: 85, fig: 'الأشكال 8 و 9 و 10',
    desc: 'بطارية السيارة بطارية ثانوية يمكن إعادة شحنها، تعمل على بدء تشغيل محرك السيارة. تتركب من وعاء من البلاستك أو المطاط الصلب يحتوي على 3–6 خلايا، كل منها صفائح يحيط بها محلول إلكتروليتي (حامض الكبريتيك وماء مقطر) كثافته النسبية 1.3 عندما تكون تامة الشحن. كل خلية رصاص–حامض تولد 2 V، فست خلايا على التوالي تعطي 12 V. الألواح: رصاص Pb (قطب سالب) متبادلة مع أوكسيد الرصاص PbO₂ (قطب موجب). عند الشحن: نصل موجب الشاحن بموجب البطارية وسالبه بسالبها، وفولطية الشاحن أكبر بقليل من emf البطارية (حوالي 14 V) بسبب الجهد الضائع في المقاومة الداخلية والأسلاك، وترفع الأغطية للتخلص من الغازات.',
    tags: 'بطارية السيارة رصاص حامض بطارية ثانوية شحن البطارية شاحنة 12 V 14 V خلايا 2 V كثافة نسبية 1.3 ماء مقطر أغطية غازات العناية بالبطارية',
    tools: ['بطارية سيارة 12 V', 'شاحنة (مصدر تيار مستمر)', 'أسلاك توصيل غليظة', 'ماء مقطر'],
    steps: ['اختر عدد الخلايا: كل خلية 2 V، والخلايا على التوالي (س1-3).', 'اختر «شحن البطارية» واسحب مقبض الشاحن: جرّب 10 V ثم 12 V ثم 14 V (الشكل 10).', 'اعكس التوصيل، أو اشحن والأغطية مغلقة، أو اترك المحلول ينخفض: ماذا يحدث؟'],
    concl: ['كل خلية رصاص–حامض تولد 2 V، وست خلايا على التوالي = 12 V.', 'عند الشحن يربط الموجب بالموجب والسالب بالسالب، وفولطية الشاحن أكبر بقليل من emf (≈ 14 V).', 'العناية: تجنب التيار العالي لفترة طويلة، أبقِ المحلول أعلى من الصفائح بالماء المقطر، ولا تتركها طويلاً دون استعمال.'],
    laws: ['g9_battery', 'g9_emf'],
    controls: [],
    setup(S) { S.n = 6; S.md = 'ch'; S.vc = 14; S.pol = 1; S.cap = 0; S.soc = .35; S.lv = 1; S.fp = 0; S.heat = 0; },
    emf(S) { return 2 * S.n; },
    I(S) { const e = D.emf(S); if (S.md === 'ch') return S.pol ? (S.vc - e) / RI : -(S.vc + e) / RI; if (S.md === 'st') return S.soc > .05 ? -(S.n === 6 ? 15 : 8) : 0; return 0; },
    update(S, dt) { const I = D.I(S), e = D.emf(S); if (S.md === 'ch') { if (S.pol) S.soc = clamp(S.soc + I * dt * .006 * (S.lv > .35 ? 1 : .2), 0, 1); S.lv = Math.max(.15, S.lv - (I > 0 ? I * dt * .0016 : 0)); } else if (S.md === 'st') S.soc = clamp(S.soc - dt * .03, 0, 1);
      S.heat = clamp(S.heat + (Math.abs(I) > 12 ? dt * .5 : -dt * .3), 0, 1); Q33.adv(S, dt, clamp(I, -20, 20) * .25, 60); void e; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 420, w - 320), bw = ph ? Math.min(240, x1 - x0 - 20) : 250, bh = ph ? 120 : 140, bx = ph ? (x0 + x1) / 2 : x0 + bw / 2 + 10, by = ph ? 430 : Math.min(h - 210, 470), cx = ph ? (x0 + x1) / 2 : x1 - 85, cy = ph ? 200 : 235; return { w, h, ph, L, x0, x1, bw, bh, bx, by, cx, cy }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, e = D.emf(S), I = D.I(S), t = S.t || 0, X0 = g.bx - g.bw / 2, Y0 = g.by - g.bh / 2;
      Q34.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, (g.ph ? 120 : 140), g.x1 - g.x0 + 28, g.by + g.bh / 2 + 40 - (g.ph ? 120 : 140));
      // battery case (cut-away)
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 5; ctx.fillStyle = '#1f2937'; rr(ctx, X0, Y0, g.bw, g.bh, 10); ctx.fill(); ctx.restore();
        const cw = (g.bw - 16) / S.n; for (let i = 0; i < S.n; i++) { const x = X0 + 8 + i * cw, yl = Y0 + 16 + (g.bh - 26) * (1 - .85 * S.lv); ctx.fillStyle = '#334155'; ctx.fillRect(x + 2, Y0 + 12, cw - 4, g.bh - 20);
          ctx.fillStyle = 'rgba(125,211,252,' + (.35 + .3 * S.soc) + ')'; ctx.fillRect(x + 2, yl, cw - 4, Y0 + g.bh - 8 - yl);
          for (let k = 0; k < 4; k++) { ctx.fillStyle = k % 2 ? '#a16207' : '#94a3b8'; ctx.fillRect(x + 6 + k * (cw - 12) / 4, Y0 + 30, (cw - 12) / 4 - 3, g.bh - 44); }
          ctx.fillStyle = 'rgba(125,211,252,' + (.25 + .25 * S.soc) + ')'; ctx.fillRect(x + 2, yl, cw - 4, Y0 + g.bh - 8 - yl);
          ctx.fillStyle = S.cap ? '#facc15' : '#111827'; rr(ctx, x + cw / 2 - 9, Y0 - (S.cap ? 22 : 9), 18, 10, 3); ctx.fill(); } ctx.restore(); });
      const cw = (g.bw - 16) / S.n; for (let i = 0; i < S.n; i++) Q33.T(ctx, '2 V', X0 + 8 + i * cw + cw / 2, Y0 + 20, { s: g.ph ? 9 : 10.5, w: 900, c: '#fde68a' });
      if (S.md === 'ch' && I > .5 && S.soc < 1) for (let i = 0; i < S.n; i++) Q34.bubbles(ctx, X0 + 8 + i * cw + cw / 2, Y0 + 30, Y0 + g.bh - 14, t, 4);
      if (S.lv < .35) Q33.T(ctx, '⚠ المحلول أدنى من الصفائح', g.bx, Y0 + g.bh + 18, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' }); else Q33.T(ctx, 'رصاص Pb ⟷ أوكسيد الرصاص PbO₂ في حامض الكبريتيك', g.bx, Y0 + g.bh + 18, { s: fs - 1, w: 800, c: '#334155' });
      const tp = [X0 + g.bw - 26, Y0 - 12], tn = [X0 + 26, Y0 - 12];
      K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; rr(ctx, tp[0] - 10, tp[1] - 6, 20, 12, 3); ctx.fill(); ctx.fillStyle = '#111827'; rr(ctx, tn[0] - 10, tn[1] - 6, 20, 12, 3); ctx.fill(); });
      Q33.T(ctx, '+', tp[0], tp[1] - 18, { s: 15, w: 900, c: '#dc2626' }); Q33.T(ctx, '−', tn[0], tn[1] - 18, { s: 15, w: 900, c: '#111827' });
      Q33.T(ctx, 'emf = ' + S.n + ' × 2 V = ' + e + ' V', g.bx, Y0 + g.bh / 2 + 8, { s: fs + 1, w: 900, c: '#fff', bg: 'rgba(22,101,52,.9)' });
      // charger or starter
      let cP, cN;
      if (S.md === 'ch') { const cx = g.cx, cy = g.cy, W2 = 150, H2 = 96; K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 10; ctx.fillStyle = '#334155'; rr(ctx, cx - W2 / 2, cy - H2 / 2, W2, H2, 10); ctx.fill(); ctx.restore(); ctx.fillStyle = '#0f172a'; rr(ctx, cx - 50, cy - 36, 100, 30, 5); ctx.fill(); ctx.fillStyle = '#475569'; rr(ctx, cx - 56, cy + 18, 112, 8, 4); ctx.fill(); ctx.fillStyle = '#16a34a'; const kx = cx - 56 + 112 * (S.vc - 8) / 10; ctx.beginPath(); ctx.arc(kx, cy + 22, 10, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#dc2626'; rr(ctx, cx + W2 / 2 - 30, cy + H2 / 2 - 4, 18, 10, 3); ctx.fill(); ctx.fillStyle = '#111827'; rr(ctx, cx - W2 / 2 + 12, cy + H2 / 2 - 4, 18, 10, 3); ctx.fill(); });
        Q33.T(ctx, Q33.f(S.vc, 1) + ' V', cx, cy - 21, { s: 15, w: 900, c: '#4ade80' }); Q33.T(ctx, 'الشاحنة', cx, cy - H2 / 2 - 12, { s: 11, w: 900, c: '#334155' }); Q33.T(ctx, '+', cx + W2 / 2 - 21, cy + H2 / 2 + 16, { s: 13, w: 900, c: '#dc2626' }); Q33.T(ctx, '−', cx - W2 / 2 + 21, cy + H2 / 2 + 16, { s: 13, w: 900, c: '#111827' });
        cP = [cx + W2 / 2 - 21, cy + H2 / 2 + 2]; cN = [cx - W2 / 2 + 21, cy + H2 / 2 + 2]; }
      else { const cx = g.cx, cy = g.cy; Q33.T(ctx, S.md === 'st' ? '🚗' : '🔌', cx, cy - 10, { s: 54 }); Q33.T(ctx, S.md === 'st' ? 'محرك بدء التشغيل — تيار عالٍ' : 'غير موصولة', cx, cy + 36, { s: 11, w: 900, c: '#334155' }); cP = [cx + 40, cy + 50]; cN = [cx - 40, cy + 50]; }
      if (S.md !== 'off') { const yw = Y0 - 46, a = S.pol || S.md !== 'ch' ? cP : cN, b = S.pol || S.md !== 'ch' ? cN : cP;
        const Wp = [tp, [tp[0], yw], [a[0] + 20, yw], [a[0] + 20, a[1] + 14], [a[0], a[1] + 14], a], Wn = [b, [b[0], b[1] + 30], [tn[0], b[1] + 30 > yw - 22 ? yw - 22 : b[1] + 30], tn];
        Wn[2] = [tn[0], Math.min(b[1] + 30, yw - 22)]; Wn[1] = [b[0], Math.min(b[1] + 30, yw - 22)];
        Q33.wire(ctx, Wp, { col: '#dc2626', thick: 1 }); Q33.wire(ctx, Wn, { col: '#111827', thick: 1 }); Q33.wire(ctx, Wp, { col: S.pol || S.md !== 'ch' ? '#dc2626' : '#111827' }); Q33.wire(ctx, Wn, { col: S.pol || S.md !== 'ch' ? '#111827' : '#dc2626' });
        if (Math.abs(I) > .2) { const s = I > 0 ? 1 : -1; Q33.flow(ctx, s > 0 ? [...Wp].reverse() : Wp, S.fp * s, 'c'); Q33.flow(ctx, s > 0 ? [...Wn].reverse() : Wn, S.fp * s, 'c'); } }
      // status
      const dens = 1.1 + .2 * S.soc; Q34.bar(ctx, g.bx - 110, g.by + g.bh / 2 + (g.ph ? 40 : 44), 220, 18, S.soc, S.soc > .25 ? '#16a34a' : '#dc2626', 'الشحن ' + Math.round(S.soc * 100) + ' % — الكثافة النسبية ' + dens.toFixed(2));
      let msg, bad = 0; if (S.md === 'ch') { if (!S.pol) { msg = '⚠ توصيل معكوس: تيار كبير جداً يتلف البطارية!'; bad = 1; } else if (S.vc < e - .01) { msg = 'فولطية الشاحن أصغر من emf: البطارية تفرّغ في الشاحن'; bad = 1; } else if (Math.abs(S.vc - e) < .01) { msg = 'فولطية الشاحن = emf: لا يمر تيار شحن'; } else if (S.vc - e > 3.2) { msg = '⚠ فولطية أكبر كثيراً: تيار شحن كبير وحرارة عالية'; bad = 1; } else if (!S.cap && I > 0) { msg = 'ارفع الأغطية للتخلص من الغازات المتولدة'; bad = 1; } else msg = S.soc >= 1 ? 'تامة الشحن: الكثافة النسبية 1.3' : 'شحن صحيح: تيار ' + Q33.f(I, 1) + ' A'; }
      else msg = S.md === 'st' ? 'تفريغ: الطاقة الكيميائية ⟸ كهربائية (أسلاك غليظة لتيار عالٍ)' : 'اختر «شحن» أو «تشغيل المحرك»';
      Q33.T(ctx, msg, (g.x0 + g.x1) / 2, g.ph ? 112 : 120, { s: fs + .5, w: 900, c: '#fff', bg: bad ? '#b91c1c' : '#166534', maxW: g.x1 - g.x0 });
      if (!g.ph) Q34.card(ctx, S, [{ t: '1. تجنب سحب تيار عالٍ لفترة طويلة: الحرارة تتلف البطارية.', c: '#0f172a' }, { t: '2. أبقِ المحلول أعلى من الصفائح بقليل، وأضف ماءً مقطراً عند نقصانه، مع ثبوت الكثافة 1.3.', c: '#0f172a' }, { t: '3. لا تتركها مدة طويلة دون استعمال: تتكون طبقة عازلة من الكبريتات على ألواحها.', c: '#0f172a' }], { title: 'العناية ببطارية السيارة', wd: 280, y: 70 });
      Q33.drawChips(ctx, D.chipsM(S, g)); Q33.drawChips(ctx, D.chipsO(S, g)); Q34.banner(ctx, w, 'اختر الوضع، واسحب مقبض الشاحن الأخضر لتغيير فولطيته');
    },
    chipsM(S, g) { return Q34.chips(S, 'md', [['ch', '⚡ شحن البطارية'], ['st', '🚗 تشغيل المحرك'], ['off', 'فصل']], g.h - 84, S.md, (S2, k) => { S2.md = k; }, { bw: 160 }); },
    chipsO(S, g) { return Q34.chips(S, 'op', [['n', 'الخلايا: ' + S.n], ['pol', S.pol ? '⇄ اعكس التوصيل' : '✔ صحّح التوصيل'], ['cap', S.cap ? 'أعد الأغطية' : 'ارفع الأغطية'], ['wat', '💧 ماء مقطر']], g.h - 128, '', (S2, k) => { if (k === 'n') S2.n = S2.n >= 6 ? 3 : S2.n + 1; else if (k === 'pol') S2.pol = S2.pol ? 0 : 1; else if (k === 'cap') S2.cap = S2.cap ? 0 : 1; else S2.lv = 1; }, { bw: 160, bh: 30, col: '#0f766e' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      if (S.md === 'ch') L.push({ id: 'knob', x: g.cx - 56 + 112 * (S.vc - 8) / 10, y: g.cy + 22, r: 16, axis: 'x', keep: 1, tip: 'اسحب لتغيير فولطية الشاحن', idle: 'اسحب المقبض ✋', drag: (S2, d) => { const g2 = D.geo(S2); S2.vc = clamp(Math.round(((d.x - (g2.cx - 56)) / 112 * 10 + 8) * 2) / 2, 8, 18); } });
      return L.concat(D.chipsM(S, g), D.chipsO(S, g)); },
    readings(S) { const I = D.I(S); return [rd('عدد الخلايا', S.n), rd('emf البطارية', D.emf(S) + ' V'), rd('فولطية الشاحن', S.md === 'ch' ? Q33.f(S.vc, 1) + ' V' : '—'), rd('تيار الشحن', S.md === 'ch' ? Q33.f(I, 1) + ' A' : '—'), rd('الشحن', Math.round(S.soc * 100) + ' %'), rd('الكثافة النسبية', (1.1 + .2 * S.soc).toFixed(2))]; },
    record(S) { return { vc: S.vc, I: S.md === 'ch' && S.pol ? +D.I(S).toFixed(1) : '—' }; },
    cols: [['vc', 'فولطية الشاحن (V)'], ['I', 'تيار الشحن (A)']],
    graph: { x: 'vc', y: 'I', xl: 'فولطية الشاحن (V)', yl: 'تيار الشحن (A)' },
    explain(S) { const e = D.emf(S); return Q26.ex('emf البطارية ' + e + ' V من ' + S.n + ' خلايا × 2 V على التوالي.', 'لإعادة الشحن نمرر تياراً معاكساً لتيار التفريغ فتتحول الطاقة الكهربائية إلى كيميائية مخزونة. لذلك نصل الموجب بالموجب والسالب بالسالب، وتكون فولطية الشاحن أكبر بقليل من emf (حوالي 14 V لبطارية 12 V) لتعويض الجهد الضائع في المقاومة الداخلية والأسلاك؛ إذا كانت أصغر من emf فإن البطارية هي التي تفرّغ.', 'بطارية السيارة تعطي تياراً عالياً، لذا تربط بأسلاك توصيل غليظة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — بطارية أيون–الليثيوم: الشرائح الثلاث وحركة الأيونات وفقدان الشحنة (ص 87، الشكلان 11 و 12) =============== */
(() => {
  const D = { id: 'g9_b_liion', page: 87, fig: 'الشكلان 11 و 12',
    desc: 'بطاريات أيون–الليثيوم بطاريات ثانوية يعاد شحنها مرات عديدة دون أن تضعف، تستعمل في الحاسوب النقال والجوال وأجهزة MP3 والكاميرات. تحاط بغلاف متين يتحمل الضغط والحرارة وفيه صمام أمان، ويحتوي داخله ثلاث شرائح رقيقة ملفوفة بشكل لولبي: القطب الموجب (أوكسيد كوبلت الليثيوم)، العازل، القطب السالب (الكاربون)، مغمورة في محلول إلكتروليتي (في الأغلب الأيثر). شريحة العازل من مادة لدنة تعزل القطبين بينما تسمح للأيونات بالمرور. تفقد 5% من شحنتها في الشهر عند عدم الاستعمال مقارنة بـ 20% للبطاريات الجافة الأخرى.',
    tags: 'بطارية أيون الليثيوم بطارية ثانوية أوكسيد كوبلت الليثيوم الكاربون العازل الأيثر صمام أمان ملفوفة لولبية فقدان الشحنة 5% 20%',
    tools: ['بطارية أيون–الليثيوم (مقطع)', 'جوال', 'شاحن'],
    steps: ['اختر «تشغيل الجوال» ثم «الشحن»: راقب أيونات الليثيوم تعبر شريحة العازل في الاتجاهين.', 'اضغط على شريحة العازل: هل تمر الإلكترونات خلالها أم الأيونات فقط؟ (س1-4)', 'اسحب مؤشر الأشهر: قارن فقدان الشحنة مع البطارية الجافة.'],
    concl: ['ثلاث شرائح ملفوفة لولبياً: موجب (أوكسيد كوبلت الليثيوم)، عازل، سالب (كاربون).', 'العازل يسمح للأيونات بالمرور ويعزل القطبين، والإلكترونات تمر في الدائرة الخارجية.', 'تحتفظ بشحنتها أكثر: تفقد 5% شهرياً مقابل 20% للجافة.'],
    laws: ['g9_battery'],
    controls: [],
    setup(S) { S.md = 'use'; S.soc = .8; S.mo = 2; S.fp = 0; S.sep = 0; },
    update(S, dt) { if (S.md === 'use') S.soc = Math.max(0, S.soc - dt * .02); else if (S.md === 'ch') S.soc = Math.min(1, S.soc + dt * .04); const I = S.md === 'use' ? (S.soc > 0 ? 1 : 0) : S.md === 'ch' ? (S.soc < 1 ? -1 : 0) : 0; Q33.adv(S, dt, I * 1.3, 60); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 420, w - 320), yt = ph ? 200 : 230, lh = ph ? 34 : 40, gx = ph ? x0 : x0, gy = ph ? 520 : Math.min(h - 200, 560); return { w, h, ph, L, x0, x1, yt, lh, gy }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, t = S.t || 0, xs = g.x0 + (g.ph ? 0 : 130), xe = g.x1 - (g.ph ? 0 : 20), on = S.md === 'use' ? (S.soc > 0 ? 1 : 0) : S.md === 'ch' ? (S.soc < 1 ? -1 : 0) : 0;
      Q34.bg(ctx, w, h);
      // spiral inset (desktop)
      if (!g.ph) { const cx = g.x0 + 60, cy = g.yt + 40; K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(cx, cy, 56, 0, TAU); ctx.fill(); ['#1d4ed8', '#f8fafc', '#111827'].forEach((c, j) => { ctx.strokeStyle = c; ctx.lineWidth = 3.2; ctx.beginPath(); for (let a = 0; a < 5.2 * TAU; a += .08) { const r = 6 + a * 1.45 + j * 3.2; if (r > 52) break; const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; a ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }); ctx.restore(); }); Q33.T(ctx, 'ملفوفة لولبياً — الشكل 12', cx, cy + 74, { s: 10, w: 900, c: '#334155' }); }
      // layers
      const yP = g.yt, yS = g.yt + g.lh + 6, yN = g.yt + 2 * (g.lh + 6);
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(186,230,253,.45)'; rr(ctx, xs - 10, yP - 12, xe - xs + 20, 3 * g.lh + 36, 12); ctx.fill();
        ctx.fillStyle = '#1d4ed8'; rr(ctx, xs, yP, xe - xs, g.lh, 6); ctx.fill(); ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = S.sep ? '#dc2626' : '#94a3b8'; ctx.lineWidth = S.sep ? 3 : 1.5; ctx.setLineDash([5, 4]); rr(ctx, xs, yS, xe - xs, g.lh, 6); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#111827'; rr(ctx, xs, yN, xe - xs, g.lh, 6); ctx.fill(); ctx.restore(); });
      Q33.T(ctx, 'محلول إلكتروليتي: الأيثر', xe - 60, yN + g.lh + 20, { s: fs - 1, w: 800, c: '#0369a1' });
      // ions crossing
      const nI = g.ph ? 5 : 8; for (let k = 0; k < nI; k++) { const x = xs + 30 + k * (xe - xs - 60) / (nI - 1); let f = Math.round(S.soc * nI) > k ? 1 : 0; let yy = f ? yN + g.lh / 2 : yP + g.lh / 2; if (on) { const p = ((t * .35 + k * .37) % 1); yy = on > 0 ? yN + g.lh / 2 - p * (yN - yP) : yP + g.lh / 2 + p * (yN - yP); } Q34.ion(ctx, x + (k % 2 ? 10 : -10), yy, 1, 'Li⁺', '#16a34a'); }
      Q33.T(ctx, 'القطب الموجب + أوكسيد كوبلت الليثيوم', (xs + xe) / 2, yP + g.lh / 2, { s: fs, w: 900, c: '#fff', bg: 'rgba(30,58,138,.85)' }); Q33.T(ctx, 'العازل: يسمح بمرور الأيونات فقط', (xs + xe) / 2, yS + g.lh / 2, { s: fs, w: 900, c: '#334155', bg: 'rgba(248,250,252,.9)' }); Q33.T(ctx, 'القطب السالب − الكاربون', (xs + xe) / 2, yN + g.lh / 2, { s: fs, w: 900, c: '#fff', bg: 'rgba(17,24,39,.85)' });
      // external circuit
      const xr = xe + (g.ph ? -20 : 0), top = g.yt - (g.ph ? 70 : 80), Wx = [[xs + 20, yP], [xs + 20, top], [xr - 20, top], [xr - 20, yN + g.lh], [xr - 20, yN + g.lh + 4]];
      Q33.wire(ctx, [[xe - 30, yN + g.lh], [xe - 30, yN + g.lh + 30], [xe + (g.ph ? -40 : 30), yN + g.lh + 30], [xe + (g.ph ? -40 : 30), top], [(xs + xe) / 2 + 40, top]], { col: '#111827' }); Q33.wire(ctx, [[xs + 20, yP], [xs + 20, top], [(xs + xe) / 2 - 40, top]], { col: '#dc2626' }); void Wx;
      if (on) { const ew = [[xe - 30, yN + g.lh], [xe - 30, yN + g.lh + 30], [xe + (g.ph ? -40 : 30), yN + g.lh + 30], [xe + (g.ph ? -40 : 30), top], [(xs + xe) / 2 + 40, top]], ew2 = [[(xs + xe) / 2 - 40, top], [xs + 20, top], [xs + 20, yP]]; Q33.flow(ctx, on > 0 ? ew : [...ew].reverse(), S.fp * Math.sign(on), 'e'); Q33.flow(ctx, on > 0 ? ew2 : [...ew2].reverse(), S.fp * Math.sign(on), 'e'); }
      Q33.T(ctx, S.md === 'ch' ? '🔌' : '📱', (xs + xe) / 2, top - 6, { s: 34 }); Q33.T(ctx, S.md === 'ch' ? 'الشاحن' : S.md === 'use' ? (S.soc > 0 ? 'الجوال يعمل' : 'نفدت الشحنة') : 'لا توصيل', (xs + xe) / 2, top + 26, { s: 10.5, w: 900, c: '#334155' });
      Q34.bar(ctx, (xs + xe) / 2 - 90, yN + g.lh + 46, 180, 16, S.soc, S.soc > .2 ? '#16a34a' : '#dc2626', 'الشحنة ' + Math.round(S.soc * 100) + ' %');
      if (S.sep) Q33.T(ctx, 'العازل يعزل القطب الموجب عن السالب ويسمح للأيونات بالمرور — س1-4: a', (xs + xe) / 2, yS - 22 - g.lh, { s: fs, w: 900, c: '#fff', bg: '#b91c1c', maxW: xe - xs });
      // self-discharge bars
      const gx = g.x0 + (g.ph ? 0 : 20), gw = g.ph ? g.x1 - g.x0 : g.x1 - g.x0 - 40, gy = g.gy, m = S.mo, li = Math.max(0, 100 - 5 * m), dr = Math.max(0, 100 - 20 * m);
      Q33.T(ctx, 'الشحنة المتبقية بعد ' + m + (m === 1 ? ' شهر' : ' أشهر') + ' دون استعمال', gx + gw / 2, gy - 26, { s: fs + .5, w: 900, c: '#0f172a' });
      Q34.bar(ctx, gx, gy - 8, gw, 20, li / 100, '#16a34a', 'أيون–الليثيوم: ' + li + ' %'); Q34.bar(ctx, gx, gy + 20, gw, 20, dr / 100, '#f59e0b', 'جافة أخرى: ' + dr + ' %');
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; rr(ctx, gx, gy + 54, gw, 6, 3); ctx.fill(); ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(gx + gw * m / 6, gy + 57, 10, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); });
      Q33.drawChips(ctx, D.chips(S, g)); Q34.banner(ctx, w, 'اختر تشغيل الجوال أو الشحن، واضغط على العازل، واسحب مؤشر الأشهر');
    },
    chips(S, g) { return Q34.chips(S, 'md', [['use', '📱 تشغيل الجوال'], ['ch', '🔌 الشحن'], ['off', 'فصل']], g.h - 84, S.md, (S2, k) => { S2.md = k; }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), xs = g.x0 + (g.ph ? 0 : 130), xe = g.x1 - (g.ph ? 0 : 20), gx = g.x0 + (g.ph ? 0 : 20), gw = g.ph ? g.x1 - g.x0 : g.x1 - g.x0 - 40;
      return [{ id: 'mo', x: gx + gw * S.mo / 6, y: g.gy + 57, r: 16, axis: 'x', keep: 1, tip: 'اسحب لتغيير عدد الأشهر', idle: 'اسحب المؤشر ✋', drag: (S2, d) => { const g2 = D.geo(S2), gx2 = g2.x0 + (g2.ph ? 0 : 20), gw2 = g2.ph ? g2.x1 - g2.x0 : g2.x1 - g2.x0 - 40; S2.mo = clamp(Math.round((d.x - gx2) / gw2 * 6), 0, 6); } },
        { id: 'sep', x: (xs + xe) / 2, y: g.yt + g.lh + 6 + g.lh / 2, w: xe - xs, h: g.lh, tip: 'اضغط على شريحة العازل', click: S2 => { S2.sep = S2.sep ? 0 : 1; } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('الوضع', S.md === 'use' ? 'تفريغ (تشغيل)' : S.md === 'ch' ? 'شحن' : 'فصل'), rd('الشحنة', Math.round(S.soc * 100) + ' %'), rd('الأشهر دون استعمال', S.mo), rd('أيون–الليثيوم', Math.max(0, 100 - 5 * S.mo) + ' %'), rd('الجافة', Math.max(0, 100 - 20 * S.mo) + ' %')]; },
    record(S) { return { m: S.mo, li: Math.max(0, 100 - 5 * S.mo), dr: Math.max(0, 100 - 20 * S.mo) }; },
    cols: [['m', 'الأشهر'], ['li', 'أيون–الليثيوم (%)'], ['dr', 'الجافة (%)']],
    graph: { x: 'm', y: 'li', xl: 'الأشهر', yl: 'الشحنة المتبقية (%)' },
    explain(S) { return Q26.ex(S.md === 'ch' ? 'أثناء الشحن تعبر أيونات الليثيوم العازل من الموجب نحو السالب.' : 'أثناء التشغيل تعود أيونات الليثيوم إلى القطب الموجب.', 'شريحة العازل الرقيقة (مادة لدنة) تعزل القطب الموجب عن القطب السالب بينما تسمح للأيونات بالمرور، أما الإلكترونات فتنساب في الدائرة الخارجية فتشغل الجهاز.', 'تفقد بطارية أيون–الليثيوم 5% من شحنتها في الشهر مقابل 20% للبطاريات الجافة الأخرى.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — خلية وقود الهيدروجين: الآلية والشرائح والمميزات (ص 88–89، الأشكال 13–16) =============== */
(() => {
  const D = { id: 'g9_b_fuel', page: 88, fig: 'الأشكال 13 إلى 16',
    desc: 'بطارية الوقود خلية قادرة على توليد التيار الكهربائي باعتمادها على الوقود (مواد كيميائية) الذي يجهز من مصدر خارجي، ولا ينتهي مفعولها فهي تعمل باستمرار عند تجهيزها بالوقود، ومن أمثلتها بطارية وقود الهيدروجين: تحول الطاقة الكيميائية إلى كهربائية، إذ يتحول غاز الهيدروجين وغاز الأوكسجين المأخوذ من الجو إلى ماء وطاقة كهربائية. يخزن الهيدروجين عادة سائلاً في أوعية خاصة. بطارية الوقود شرائح رقيقة تولد كل منها 1 V، وكلما ازداد عدد الشرائح الموصولة على التوالي ازداد فرق الجهد.',
    tags: 'خلية وقود الهيدروجين بطارية الوقود أوكسجين ماء شرائح 1 V توالي محطة تزويد مميزات لا تلوث كفاءة عالية',
    tools: ['خلية وقود هيدروجين', 'خزان هيدروجين', 'محرك صغير (مروحة)'],
    steps: ['افتح صمام الهيدروجين: لاحظ الإلكترونات في الدائرة الخارجية وخروج الماء (الشكل 14).', 'زد عدد الشرائح المربوطة على التوالي: كل شريحة 1 V (الشكل 15).', 'اغلق الصمام أو انتظر نفاد الخزان، ثم اضغط «محطة التزويد» (الشكل 16).'],
    concl: ['الهيدروجين + الأوكسجين ⟸ ماء + طاقة كهربائية.', 'كل شريحة 1 V، والشرائح على التوالي تزيد فرق الجهد.', 'تعمل باستمرار ما دام الوقود يجهز، ولا تلوث البيئة.'],
    laws: ['g9_battery'],
    controls: [],
    setup(S) { S.v = 1; S.n = 3; S.tk = 1; S.fp = 0; S.wt = 0; },
    V(S) { return S.v && S.tk > 0 ? S.n : 0; },
    update(S, dt) { const V = D.V(S); if (V) { S.tk = Math.max(0, S.tk - dt * .012 * S.n / 3); S.wt += dt * S.n; } Q33.adv(S, dt, V * .5, 60); S.ang = (S.ang || 0) + dt * V * 2.2; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 440, w - 320), cx = (x0 + x1) / 2, cy = ph ? 360 : Math.min(h / 2 + 30, 400), cw = ph ? 210 : 280, ch = ph ? 150 : 180; return { w, h, ph, L, x0, x1, cx, cy, cw, ch }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, V = D.V(S), t = S.t || 0, X0 = g.cx - g.cw / 2, Y0 = g.cy - g.ch / 2, wA = g.cw * .3;
      Q34.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, Y0 - 150, g.x1 - g.x0 + 28, g.ch + 230);
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 10; ctx.fillStyle = '#e0f2fe'; rr(ctx, X0, Y0, wA, g.ch, 8); ctx.fill(); ctx.fillStyle = '#fef3c7'; rr(ctx, X0 + g.cw - wA, Y0, wA, g.ch, 8); ctx.fill(); ctx.restore();
        ctx.fillStyle = '#475569'; ctx.fillRect(X0 + wA, Y0, 12, g.ch); ctx.fillRect(X0 + g.cw - wA - 12, Y0, 12, g.ch); ctx.fillStyle = '#c4b5fd'; ctx.fillRect(X0 + wA + 12, Y0, g.cw - 2 * wA - 24, g.ch); });
      Q33.T(ctx, 'H₂', X0 + wA / 2, Y0 + 18, { s: 13, w: 900, c: '#0369a1' }); Q33.T(ctx, 'O₂ من الهواء', X0 + g.cw - wA / 2, Y0 + 18, { s: 11, w: 900, c: '#b45309' }); Q33.T(ctx, 'الإلكتروليت', g.cx, Y0 + g.ch + 14, { s: 10, w: 900, c: '#6d28d9' });
      Q33.T(ctx, 'القطب السالب', X0 + wA, Y0 - 12, { s: 9.5, w: 900, c: '#334155' }); Q33.T(ctx, 'القطب الموجب', X0 + g.cw - wA, Y0 - 12, { s: 9.5, w: 900, c: '#334155' });
      // tank
      const tx = X0 - (g.ph ? 40 : 70), ty = g.cy; K.raw(ctx, () => { ctx.fillStyle = '#cbd5e1'; rr(ctx, tx - 22, ty - 60, 44, 120, 18); ctx.fill(); ctx.fillStyle = '#38bdf8'; rr(ctx, tx - 18, ty + 56 - 112 * S.tk, 36, 112 * S.tk, 14); ctx.fill(); ctx.fillStyle = S.v ? '#16a34a' : '#dc2626'; ctx.beginPath(); ctx.arc(tx + 30, ty, 9, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(tx + 22, ty); ctx.lineTo(X0, ty); ctx.stroke(); });
      Q33.T(ctx, 'خزان H₂ ' + Math.round(S.tk * 100) + ' %', tx, ty + 76, { s: 10, w: 900, c: '#0369a1' });
      if (V) { for (let k = 0; k < 6; k++) { const p = (t * .4 + k / 6) % 1; Q33.T(ctx, 'H', X0 + 10 + p * (wA - 20), Y0 + 40 + (k * 23) % (g.ch - 50), { s: 10, w: 900, c: '#fff', bg: '#0284c7' }); Q33.T(ctx, 'H⁺', X0 + wA + 14 + p * (g.cw - 2 * wA - 28), Y0 + 30 + (k * 29) % (g.ch - 40), { s: 9.5, w: 900, c: '#fff', bg: '#dc2626' }); Q33.T(ctx, 'O', X0 + g.cw - 10 - p * (wA - 20), Y0 + 40 + (k * 31) % (g.ch - 50), { s: 10, w: 900, c: '#fff', bg: '#ea580c' }); }
        for (let k = 0; k < 3; k++) { const p = (t * .5 + k / 3) % 1; Q33.T(ctx, '💧', X0 + g.cw - wA / 2 + (k - 1) * 18, Y0 + g.ch + 10 + p * 50, { s: 14 }); } Q33.T(ctx, 'ماء H₂O', X0 + g.cw - wA / 2, Y0 + g.ch + 76, { s: 10.5, w: 900, c: '#0369a1' }); }
      // external circuit with fan
      const top = Y0 - 90, a = [X0 + wA / 2, Y0], b = [X0 + g.cw - wA / 2, Y0], fx = g.cx, fy = top;
      const Wa = [a, [a[0], top], [fx - 34, top]], Wb = [[fx + 34, top], [b[0], top], b]; Q33.wire(ctx, Wa, { col: '#111827' }); Q33.wire(ctx, Wb, { col: '#dc2626' }); if (V) { Q33.flow(ctx, [...Wb].reverse(), S.fp, 'c'); Q33.flow(ctx, [...Wa].reverse(), S.fp, 'c'); Q33.flow(ctx, Wa, S.fp, 'e'); }
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(fx, fy, 30, 0, TAU); ctx.fill(); ctx.translate(fx, fy); ctx.rotate(S.ang || 0); ctx.fillStyle = '#93c5fd'; for (let k = 0; k < 3; k++) { ctx.rotate(TAU / 3); ctx.beginPath(); ctx.ellipse(0, -14, 7, 15, 0, 0, TAU); ctx.fill(); } ctx.restore(); });
      Q33.T(ctx, V ? 'المروحة تدور' : 'المروحة متوقفة', fx, fy + 44, { s: 10.5, w: 900, c: V ? '#166534' : '#64748b' });
      // stack inset
      const sx = g.ph ? g.x1 - 70 : g.x1 - 50, sy = g.ph ? 140 : Y0 - 115; for (let i = 0; i < S.n; i++) K.raw(ctx, () => { ctx.fillStyle = i % 2 ? '#a78bfa' : '#7c3aed'; rr(ctx, sx - 24 + i * 7, sy - 30 + i * 7, 42, 42, 5); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke(); });
      Q33.T(ctx, S.n + ' شرائح × 1 V = ' + S.n + ' V', sx, sy + 34 + S.n * 7, { s: 10.5, w: 900, c: '#fff', bg: '#6d28d9' });
      Q33.T(ctx, V ? 'فرق الجهد ' + V + ' V — H₂ + O₂ ⟸ ماء + طاقة كهربائية' : S.tk <= 0 ? 'نفد الوقود: توقفت الخلية — اذهب إلى محطة التزويد' : 'الصمام مغلق: لا وقود ولا تيار', g.cx, Y0 + g.ch + (g.ph ? 100 : 104), { s: fs + .5, w: 900, c: '#fff', bg: V ? '#166534' : '#b91c1c', maxW: g.x1 - g.x0 });
      if (!g.ph) Q34.card(ctx, S, [{ t: '1. لا تلوث البيئة: الهيدروجين ينتج من الماء ويعود ماءً.', c: '#0f172a' }, { t: '2. آمنة: لا تحتوي عناصر خطرة.', c: '#0f172a' }, { t: '3. كفاءة تشغيل عالية: تحول الطاقة الكيميائية إلى كهربائية مباشرة.', c: '#0f172a' }, { t: '4. عمرها طويل مقارنة ببقية البطاريات.', c: '#0f172a' }], { title: 'مميزات بطارية وقود الهيدروجين', wd: 280, y: 70 });
      Q33.drawChips(ctx, D.chipsA(S, g)); Q33.drawChips(ctx, D.chipsN(S, g)); Q34.banner(ctx, w, 'افتح صمام الهيدروجين واختر عدد الشرائح');
    },
    chipsA(S, g) { return Q34.chips(S, 'v', [['v', S.v ? '⛔ أغلق الصمام' : '✅ افتح الصمام'], ['fill', '⛽ محطة التزويد']], g.h - 84, '', (S2, k) => { if (k === 'v') S2.v = S2.v ? 0 : 1; else S2.tk = 1; }, { bw: 170 }); },
    chipsN(S, g) { return Q34.chips(S, 'n', [['1', 'شريحة'], ['3', '3 شرائح'], ['6', '6 شرائح']], g.h - 128, String(S.n), (S2, k) => { S2.n = +k; }, { bw: 130, bh: 30, col: '#6d28d9' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), tx = g.cx - g.cw / 2 - (g.ph ? 40 : 70); return [{ id: 'valve', x: tx + 30, y: g.cy, r: 18, tip: 'اضغط لفتح/غلق صمام الهيدروجين', idle: 'اضغط على الصمام ✋', click: S2 => { S2.v = S2.v ? 0 : 1; } }].concat(D.chipsA(S, g), D.chipsN(S, g)); },
    readings(S) { return [rd('الصمام', S.v ? 'مفتوح' : 'مغلق'), rd('الوقود في الخزان', Math.round(S.tk * 100) + ' %'), rd('عدد الشرائح', S.n), rd('فرق الجهد', D.V(S) + ' V')]; },
    record(S) { return { n: S.n, V: D.V(S) }; },
    cols: [['n', 'عدد الشرائح'], ['V', 'فرق الجهد (V)']],
    graph: { x: 'n', y: 'V', xl: 'عدد الشرائح', yl: 'فرق الجهد (V)' },
    explain(S) { return Q26.ex(D.V(S) ? 'تدور المروحة ويخرج الماء من الخلية.' : 'تتوقف الخلية.', 'خلية الوقود تحول الطاقة الكيميائية للهيدروجين والأوكسجين مباشرة إلى طاقة كهربائية وماء، فتعمل ما دام الوقود يجهز من الخارج ولا ينتهي مفعولها. كل شريحة تولد 1 V، والشرائح على التوالي تجمع فولطياتها.', 'تستعمل في تشغيل الحاسوب وتسيير المركبات الحديثة، وتزود بالوقود من محطات الهيدروجين.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — القوة الدافعة الكهربائية emf = W/q والمقاومة الداخلية (ص 89–90 + مسائل ص 92) =============== */
(() => {
  const RL = 6;
  const EX = {
    ex: { t: 'مثال ص 90', e: 2, q: 'انسابت شحنة q = 10 C خلال بطارية فاكتسبت طاقة W = 20 J. احسب emf.', lines: ['emf = W / q', 'emf = 20 J ÷ 10 C', 'emf = 2 V'] },
    fk: { t: 'فكّر ص 89', e: 1.5, q: 'ماذا نعني أن القوة الدافعة الكهربائية لبطارية emf = 1.5 V؟', lines: ['1.5 V = 1.5 J / C', 'البطارية تزود كل كولوم يمر خلالها بطاقة مقدارها 1.5 J'] },
    s1: { t: 'س1 مسائل ص92', e: 1.5, q: 'احسب الشغل المبذول على شحنة 2 C في دائرة فيها بطارية emf = 1.5 V.', lines: ['W = emf × q', 'W = 1.5 V × 2 C', 'W = 3 J'] },
    s2: { t: 'س2 مسائل ص92', e: 12, q: 'بطارية emf = 12 V تزود شغلاً 120 J لتحريك شحنة q. احسب q.', lines: ['q = W / emf', 'q = 120 J ÷ 12 V', 'q = 10 C'] }
  };
  const D = { id: 'g9_b_emf', page: 89, fig: 'الأشكال 17 و 18 و 19',
    desc: 'فرق الجهد الكهربائي بين القطب السالب والقطب الموجب لأي بطارية عندما تكون الدائرة مفتوحة يسمى القوة الدافعة الكهربائية (emf). لكي تتحرك الإلكترونات في الدائرة الخارجية لابد أن تزود بطاقة تكتسبها من البطارية، ومقدار الطاقة التي تزودها البطارية لوحدة الشحنة هو emf: emf = W / q، ووحدتها J/C وتساوي الفولط، وتقاس بالفولطميتر. الإعاقة التي تبديها مادة الوسط داخل البطارية لحركة الشحنات تسمى المقاومة الداخلية (r).',
    tags: 'القوة الدافعة الكهربائية emf الطاقة الشحنة جول كولوم فولط فولطميتر دائرة مفتوحة المقاومة الداخلية مثال ص 90 مسائل ص 92',
    tools: ['بطارية', 'فولطميتر', 'مصباح', 'مفتاح', 'أسلاك توصيل'],
    steps: ['والمفتاح مفتوح: قراءة الفولطميتر بين قطبي البطارية = emf (الشكل 17).', 'أغلق المفتاح: لماذا تقل القراءة قليلاً؟ غيّر المقاومة الداخلية r من لوحة التحكم (الشكل 19).', 'راقب كل كولوم يعبر البطارية فيكتسب طاقة = emf جول، ثم حل الأمثلة خطوة خطوة.'],
    concl: ['emf = فرق الجهد بين قطبي البطارية والدائرة مفتوحة.', 'emf = W / q ، وحدتها J/C = V.', 'المقاومة الداخلية r تعيق حركة الشحنات داخل البطارية فتقل الفولطية بين القطبين عند غلق الدائرة.'],
    laws: ['g9_emf'],
    controls: [R('r', 'المقاومة الداخلية r', 0, 3, 1, .1, 'Ω')],
    setup(S) { S.e = 1.5; S.on = 0; S.ex = ''; S.k = 0; S.fp = 0; S.qq = 0; },
    I(S) { return S.on ? S.e / (RL + S.p.r) : 0; },
    update(S, dt) { const I = D.I(S); S.qq += I * dt * 4; Q33.adv(S, dt, I * (12 / S.e) * .6, 60); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 12 : Math.max(x0 + 400, w - 400), yt = ph ? 170 : 200, yb = ph ? 400 : Math.min(h - 200, 470); return { w, h, ph, L, x0, x1, yt, yb, cx: (x0 + x1) / 2 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, I = D.I(S), Vt = S.e - I * S.p.r;
      Q34.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.yt - 90, g.x1 - g.x0 + 28, g.yb - g.yt + 170);
      // battery box with internal r (dashed)
      const bx = g.cx, by = g.yb; K.raw(ctx, () => { ctx.strokeStyle = '#166534'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]); rr(ctx, bx - 110, by - 34, 220, 70, 12); ctx.stroke(); ctx.setLineDash([]); });
      const c = Q33.cell(ctx, bx - 35, by, { w: 80, h: 30, label: Q33.f(S.e, 1) + ' V', sp: 0, sn: 0 }), r = Q33.res(ctx, bx + 55, by, 0, { len: 36, th: 14, label: '' });
      Q33.T(ctx, 'r = ' + Q33.f(S.p.r, 1) + ' Ω', bx + 55, by + 24, { s: 10.5, w: 900, c: '#7c2d12' }); Q33.T(ctx, 'البطارية', bx, by - 46, { s: 10.5, w: 900, c: '#166534' });
      Q33.wire(ctx, [c.p, r.a], { col: '#475569' });
      const tP = [bx + 110, by], tN = [bx - 110, by]; Q33.wire(ctx, [r.b, tP], { col: '#dc2626' }); Q33.wire(ctx, [c.n, tN], { col: '#111827' });
      K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(tP[0], tP[1], 6, 0, TAU); ctx.fill(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(tN[0], tN[1], 6, 0, TAU); ctx.fill(); });
      Q33.T(ctx, '+', tP[0] + 14, tP[1] - 12, { s: 15, w: 900, c: '#dc2626' }); Q33.T(ctx, '−', tN[0] - 14, tN[1] - 12, { s: 15, w: 900, c: '#111827' });
      // load
      const lb = Q33.bulb(ctx, g.cx + 60, g.yt, I ? (I * RL / 1.5) ** 2 * .25 : 0, { label: 'R = 6 Ω' }), sw = Q33.sw(ctx, g.cx - 110, g.cx - 50, g.yt, S.on);
      const W1 = [tP, [g.x1 - 10, by], [g.x1 - 10, g.yt], lb.b], W2 = [lb.a, sw.b], W3 = [sw.a, [g.x0 + 10, g.yt], [g.x0 + 10, by], tN];
      [W1, W2, W3].forEach(p => Q33.wire(ctx, p, { col: '#475569' })); if (I) [W1, W2, W3].forEach(p => Q33.flow(ctx, p, S.fp, 'c'));
      // voltmeter across terminals
      const vm = Q33.meter(ctx, g.cx, by + (g.ph ? 92 : 100), 'V', Vt, S.e > 6 ? 15 : 3, { name: 'الفولطميتر', d: 2, w: 86, h: 62 });
      Q33.wire(ctx, [vm.p, [tP[0], vm.p[1]], tP], { col: '#f97316' }); Q33.wire(ctx, [vm.n, [tN[0], vm.n[1]], tN], { col: '#334155' });
      // energy per coulomb
      Q33.T(ctx, S.on ? 'كل كولوم يعبر البطارية يكتسب ' + Q33.f(S.e, 1) + ' J' : 'الدائرة مفتوحة: قراءة الفولطميتر تساوي emf', g.cx, g.yt - 64, { s: fs + 1, w: 900, c: '#fff', bg: '#166534', maxW: g.x1 - g.x0 });
      if (S.on) Q33.T(ctx, 'V = emf − I r = ' + Q33.f(S.e, 2) + ' − ' + Q33.f(I, 2) + ' × ' + Q33.f(S.p.r, 1) + ' = ' + Q33.f(Vt, 2) + ' V', g.cx, g.yt - 34, { s: fs, w: 900, c: '#7c2d12', bg: '#fef3c7' });
      if (S.ex) { const E = EX[S.ex]; Q33.steps(ctx, S, { title: E.t, q: E.q, lines: E.lines, k: S.k }, { wd: 360, y: g.ph ? g.yb + 160 : 70 }); }
      else if (!g.ph) Q34.card(ctx, S, [{ t: 'emf = W / q', c: '#166534', w: 900, s: 14 }, { t: 'القوة الدافعة = الطاقة المكتسبة ÷ كمية الشحنة', c: '#0f172a' }, { t: 'الوحدة: J / C = V فولط', c: '#0f172a' }, { t: 'تقاس بالفولطميتر والدائرة مفتوحة', c: '#0f172a' }], { title: 'القوة الدافعة الكهربائية', wd: 300, y: 70 });
      Q33.drawChips(ctx, D.chipsE(S, g)); Q33.drawChips(ctx, D.chipsV(S, g)); Q34.banner(ctx, w, 'اضغط على المفتاح، واختر emf أو مثالاً');
    },
    chipsV(S, g) { return Q34.chips(S, 'e', [['1.5', '1.5 V'], ['2', '2 V'], ['9', '9 V'], ['12', '12 V']], g.h - 128, String(S.e), (S2, k) => { S2.e = +k; }, { bw: 100, bh: 30, col: '#0f766e' }); },
    chipsE(S, g) { return Q34.chips(S, 'ex', Object.keys(EX).map(k => [k, EX[k].t]).concat([['nx', '⬇ الخطوة التالية']]), g.h - 84, S.ex, (S2, k) => { if (k === 'nx') { if (!S2.ex) { S2.ex = 'ex'; S2.e = EX.ex.e; } else S2.k = Math.min(S2.k + 1, EX[S2.ex].lines.length); return; } S2.ex = k; S2.k = 0; S2.e = EX[k].e; }, { bw: 150 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'sw', x: g.cx - 80, y: g.yt, w: 90, h: 44, tip: 'اضغط لفتح/إغلاق المفتاح', idle: 'اضغط على المفتاح ✋', click: S2 => { S2.on = S2.on ? 0 : 1; } }].concat(D.chipsE(S, g), D.chipsV(S, g)); },
    readings(S) { const I = D.I(S); return [rd('emf', Q33.f(S.e, 2) + ' V'), rd('المفتاح', S.on ? 'مغلق' : 'مفتوح'), rd('التيار', Q33.f(I, 3) + ' A'), rd('قراءة الفولطميتر', Q33.f(S.e - I * S.p.r, 2) + ' V'), rd('الطاقة لكل كولوم', Q33.f(S.e, 2) + ' J/C')]; },
    record(S) { const I = D.I(S); return { r: S.p.r, I: +I.toFixed(3), V: +(S.e - I * S.p.r).toFixed(2) }; },
    cols: [['r', 'r (Ω)'], ['I', 'I (A)'], ['V', 'قراءة الفولطميتر (V)']],
    graph: { x: 'r', y: 'V', xl: 'المقاومة الداخلية r (Ω)', yl: 'فرق الجهد بين القطبين (V)' },
    explain(S) { return Q26.ex(S.on ? 'تقل قراءة الفولطميتر عن emf عند غلق الدائرة.' : 'قراءة الفولطميتر تساوي emf.', 'emf هي الطاقة التي تزودها البطارية لكل كولوم: emf = W / q. عندما تكون الدائرة مفتوحة لا يمر تيار فتقرأ الفولطميتر emf كاملة. عند غلقها يضيع جزء من الطاقة داخل البطارية في مقاومتها الداخلية r.', 'emf = 1.5 V تعني أن البطارية تعطي كل كولوم 1.5 J.'); }
  };
  M8.P[D.id] = D;
})();

/* عناصر الضغط فقط (بلا سحب) لا تُظهر أسهم السحب */
Object.keys(M8.P).filter(k => /^g9_b_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });

/* =============== تجارب الفصل الرابع (البطارية والقوة الدافعة الكهربائية) =============== */
const M94 = M => M8.merge(Object.assign({ ch: 34, reg: X9 }, M));
M94({ id: 'g9_bat_intro', sec: '1-4 مقدمة: البطارية', page: 81, kind: 'نشاط', fig: 'الأشكال 1–3',
  title: 'البطارية: بطارية الليمون والخلية الكهربائية البسيطة',
  desc: 'ننفذ نشاطي الكتاب: نغرس مسماراً مغلوناً وقطعة نحاس في ليمونة ونقيس التيار بالملي أميتر، ثم نغمر صفيحتي النحاس والخارصين في حامض الكبريتيك المخفف ونراقب الكلفانوميتر.',
  tags: 'بطارية ليمون خلية بسيطة نحاس خارصين كلفانوميتر ملي أميتر طاقة كيميائية',
  fact: ['البطارية مصدر لإنتاج الطاقة الكهربائية عن طريق التفاعل الكيميائي.', 'اخترع البطارية العالم الإيطالي أليساندرو فولطا.', 'الخلية البسيطة تولد بين صفيحتي النحاس والخارصين فرق جهد ≈ 1 V.'],
  quiz: [
    { q: 'في بطارية الليمون يعمل النحاس قطباً:', o: ['موجباً', 'سالباً', 'متعادلاً'], a: 0, why: 'المسمار المغلون قطب سالب والنحاس قطب موجب.' },
    { q: 'الجهاز الذي يتحسس التيارات الصغيرة جداً µA هو:', o: ['الكلفانوميتر', 'الفولطميتر', 'الأوميتر'], a: 0, why: 'وينعكس اتجاه انحراف مؤشره بانعكاس اتجاه التيار.' },
    { q: 'الخلية الكهربائية البسيطة تحول الطاقة:', o: ['الكيميائية إلى كهربائية', 'الكهربائية إلى كيميائية', 'الضوئية إلى كهربائية'], a: 0, why: 'التفاعل الكيميائي بين المعدنين والحامض يولد فرق جهد.' }
  ],
  parts: [{ id: 'g9_b_lemon', n: 'نشاط 1: بطارية الليمون' }, { id: 'g9_b_simple', n: 'نشاط 2: الخلية البسيطة' }] });
M94({ id: 'g9_bat_primary', sec: '2-4 + 1-2-4 تصنيف البطاريات والبطارية الأولية', page: 82, kind: 'نشاط', fig: 'الأشكال 4–7',
  title: 'تصنيف البطاريات، والخلية الكلفانية، والخلية الجافة',
  desc: 'نصنف البطاريات إلى أولية وثانوية ووقود بلعبة سحب، ونشغل خلية دانيال بجسرها الملحي حتى يستهلك الخارصين، ونتعرف على أجزاء الخلية الجافة واستعمالاتها.',
  tags: 'تصنيف البطاريات أولية ثانوية وقود الخلية الكلفانية خلية دانيال الجسر الملحي الخلية الجافة',
  fact: ['البطارية الأولية لا يمكن إعادة شحنها.', 'الجسر الملحي يساعد على هجرة الأيونات الموجبة والسالبة.', 'الخلية الجافة تولد 1.5 V، ووعاؤها الخارصين قطب سالب وعمود الكاربون قطب موجب.'],
  quiz: [
    { q: 'الخلية الكلفانية البسيطة هي:', o: ['بطارية أولية', 'بطارية ثانوية', 'بطارية وقود', 'بطارية قابلة للشحن'], a: 0, why: 'س1-2 ص 91: يتوقف عملها بعد استهلاك إحدى موادها.' },
    { q: 'القطب السالب في الخلية الجافة هو:', o: ['وعاء الخارصين', 'عمود الكاربون', 'العجينة الإلكتروليتية'], a: 0, why: 'عمود الكاربون في الوسط قطب موجب.' },
    { q: 'عند رفع الجسر الملحي من الخلية الكلفانية:', o: ['يتوقف التيار', 'يزداد التيار', 'لا يتغير التيار'], a: 0, why: 'الجسر الملحي يكمل الدائرة بهجرة الأيونات.' },
    { q: 'سحب تيار كبير من الخلية الجافة لفترة قصيرة:', o: ['يقصّر عمرها', 'يطيل عمرها', 'لا يؤثر فيها'], a: 0, why: 'يفضل استعمالها لتجهيز تيارات صغيرة وبصورة متقطعة.' }
  ],
  parts: [{ id: 'g9_b_classify', n: 'تصنيف البطاريات' }, { id: 'g9_b_daniell', n: 'الخلية الكلفانية البسيطة' }, { id: 'g9_b_dry', n: 'الخلية الجافة' }] });
M94({ id: 'g9_bat_secondary', sec: '2-2-4 البطارية الثانوية', page: 85, kind: 'نشاط', fig: 'الأشكال 8–12',
  title: 'البطارية الثانوية: بطارية السيارة وشحنها، وبطارية أيون–الليثيوم',
  desc: 'نشحن بطارية السيارة بشاحنة نغير فولطيتها ونجرب الأخطاء الشائعة، ثم نراقب أيونات الليثيوم تعبر العازل أثناء الشحن والتشغيل ونقارن فقدان الشحنة مع البطاريات الجافة.',
  tags: 'البطارية الثانوية بطارية السيارة رصاص حامض شحن 14 V أيون الليثيوم العازل',
  fact: ['كل خلية رصاص–حامض تولد 2 V، وست خلايا على التوالي تعطي 12 V.', 'فولطية الشاحن أكبر بقليل من emf البطارية: حوالي 14 V.', 'بطارية أيون–الليثيوم تفقد 5% من شحنتها شهرياً مقابل 20% للجافة.'],
  quiz: [
    { q: 'بطارية السيارة 12 V تتكون من ست خلايا مربوطة:', o: ['جميعها على التوالي', 'جميعها على التوازي', 'ثلاث على التوالي وثلاث على التوازي', 'خليتان على التوالي وأربع على التوازي'], a: 0, why: 'س1-3 ص 91: 6 × 2 V = 12 V.' },
    { q: 'عند شحن بطارية السيارة تكون فولطية المصدر:', o: ['أكبر قليلاً من emf البطارية', 'أصغر من emf البطارية', 'تساوي emf البطارية', 'أكبر كثيراً من emf البطارية'], a: 0, why: 'س1-5 ص 91: لتعويض الجهد الضائع في المقاومة الداخلية والأسلاك.' },
    { q: 'في بطارية أيون–الليثيوم تعمل شريحة العازل على:', o: ['السماح للأيونات بالمرور خلالها', 'السماح للمحلول الإلكتروليتي بالمرور', 'السماح للأيونات والمحلول بالمرور', 'منع الأيونات والمحلول من المرور'], a: 0, why: 'س1-4 ص 91: وتعزل القطب الموجب عن السالب.' },
    { q: 'الطاقة المخزونة في البطارية الثانوية هي طاقة:', o: ['كيميائية', 'حركية', 'ضوئية'], a: 0, why: 'س3 ص 92: عند الشحن تتحول الطاقة الكهربائية إلى كيميائية تخزن فيها.' }
  ],
  parts: [{ id: 'g9_b_car', n: 'بطارية السيارة وشحنها' }, { id: 'g9_b_liion', n: 'بطارية أيون–الليثيوم' }] });
M94({ id: 'g9_bat_fuel', sec: '3-2-4 بطارية الوقود', page: 88, kind: 'نشاط', fig: 'الأشكال 13–16',
  title: 'بطارية الوقود: خلية وقود الهيدروجين ومميزاتها',
  desc: 'نفتح صمام الهيدروجين فيتحد مع أوكسجين الهواء ليعطي ماءً وطاقة كهربائية تدير مروحة، ونزيد عدد الشرائح على التوالي، ونعيد التزويد من المحطة.',
  tags: 'بطارية الوقود خلية وقود الهيدروجين أوكسجين ماء شرائح مميزات',
  fact: ['خلية وقود الهيدروجين تحول الطاقة الكيميائية إلى كهربائية.', 'كل شريحة تولد 1 V، والشرائح على التوالي تزيد فرق الجهد.', 'لا تلوث البيئة: الهيدروجين ينتج من الماء ويعود ماءً.'],
  quiz: [
    { q: 'خلية وقود الهيدروجين تعمل على تحويل:', o: ['الطاقة الكيميائية إلى طاقة كهربائية', 'الطاقة الكهربائية إلى طاقة كيميائية', 'الطاقة الضوئية إلى طاقة كيميائية', 'الطاقة الكهربائية إلى طاقة ضوئية'], a: 0, why: 'س1-6 ص 92.' },
    { q: 'ناتج تفاعل خلية وقود الهيدروجين مع الطاقة الكهربائية هو:', o: ['ماء', 'ثنائي أوكسيد الكاربون', 'دخان'], a: 0, why: 'الهيدروجين + الأوكسجين ⟸ ماء.' },
    { q: 'خمس شرائح وقود على التوالي تولد:', o: ['5 V', '1 V', '0.2 V'], a: 0, why: 'كل شريحة 1 V.' }
  ],
  parts: [{ id: 'g9_b_fuel', n: 'خلية وقود الهيدروجين' }] });
M94({ id: 'g9_bat_emf', sec: '3-4 القوة الدافعة الكهربائية + مسائل الفصل', page: 89, kind: 'نشاط', fig: 'الأشكال 17–19',
  title: 'القوة الدافعة الكهربائية emf = W/q والمقاومة الداخلية',
  desc: 'نقيس emf بالفولطميتر والدائرة مفتوحة، ونرى انخفاض القراءة عند غلقها بسبب المقاومة الداخلية، ونحل مثال ص 90 ومسائل ص 92 خطوة خطوة.',
  tags: 'القوة الدافعة الكهربائية emf جول كولوم فولط المقاومة الداخلية مسائل',
  fact: ['emf: فرق الجهد بين قطبي البطارية والدائرة مفتوحة.', 'emf = W / q ، ووحدتها J/C = V.', 'المقاومة الداخلية r: إعاقة مادة الوسط داخل البطارية لحركة الشحنات.'],
  quiz: [
    { q: 'وحدة قياس القوة الدافعة الكهربائية الفولط تساوي:', o: ['J / C', 'C / J', 'A / C', 'C / s'], a: 0, why: 'س1-1 ص 91: emf = W / q.' },
    { q: 'بطارية emf = 1.5 V، الشغل المبذول على شحنة 2 C:', o: ['3 J', '0.75 J', '1.33 J'], a: 0, why: 'س1 مسائل ص 92: W = 1.5 × 2 = 3 J.' },
    { q: 'بطارية 12 V تزود شغلاً 120 J. الشحنة المتحركة:', o: ['10 C', '1440 C', '0.1 C'], a: 0, why: 'س2 مسائل ص 92: q = 120 ÷ 12 = 10 C.' },
    { q: 'عند غلق الدائرة تكون قراءة الفولطميتر بين قطبي البطارية:', o: ['أقل قليلاً من emf', 'أكبر من emf', 'صفراً'], a: 0, why: 'جزء من الطاقة يضيع في المقاومة الداخلية.' }
  ],
  parts: [{ id: 'g9_b_emf', n: 'القوة الدافعة الكهربائية + المسائل' }] });
