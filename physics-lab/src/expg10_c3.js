'use strict';
/* ====================== الرابع العلمي — الفصل الثالث: الموائع الساكنة (ch 43, ص 28–51) ======================
   Merged experiments (book order): g10_fl_press (3-1, 3-2) · g10_fl_atm (3-3) · g10_fl_pascal (3-4) · g10_fl_arch (3-5)
   · g10_fl_surf (3-6, 3-7) · g10_fl_flow (3-8 … 3-11) · g10_fl_review (questions ص 48–51).
   Local kit Q43 = Q42 + liquids, tanks, gauges, flow particles. */
const Q43 = Object.assign(Object.create(Q42), {
  LIQ: { w: ['ماء', 1000, 'rgba(56,189,248,.55)', '#0284c7'], oil: ['زيت', 800, 'rgba(250,204,21,.55)', '#a16207'], hg: ['زئبق', 13600, 'rgba(148,163,184,.9)', '#475569'], salt: ['ماء مالح', 1030, 'rgba(14,165,233,.6)', '#0369a1'] },
  /* open glass tank with liquid up to level y */
  tank(ctx, x, y0, w, y1, lvl, col, o = {}) {
    K.raw(ctx, () => { ctx.fillStyle = col; ctx.fillRect(x, lvl, w, y1 - lvl); const g = ctx.createLinearGradient(0, lvl, 0, y1); g.addColorStop(0, 'rgba(255,255,255,.15)'); g.addColorStop(1, 'rgba(15,23,42,.12)'); ctx.fillStyle = g; ctx.fillRect(x, lvl, w, y1 - lvl);
      ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, lvl); ctx.lineTo(x + w, lvl); ctx.stroke();
      ctx.strokeStyle = o.bd || '#334155'; ctx.lineWidth = o.lw || 3; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.lineTo(x + w, y1); ctx.lineTo(x + w, y0); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(x + 4, y0, 6, y1 - y0); });
  },
  arrow(ctx, x, y, dx, dy, col = '#dc2626', lab, w = 3) { K.force(ctx, x, y, dx, dy, lab || '', col, w); },
  gauge(ctx, x, y, r, t, lab, col = '#0f766e') { // dial with needle t in 0..1
    K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; for (let k = 0; k <= 10; k++) { const a = Math.PI * (.75 + k * .15); ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * .78, y + Math.sin(a) * r * .78); ctx.lineTo(x + Math.cos(a) * r * .92, y + Math.sin(a) * r * .92); ctx.stroke(); }
      const a = Math.PI * (.75 + clamp(t, 0, 1) * 1.5); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8); ctx.stroke(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, TAU); ctx.fill(); });
    if (lab) Q42.T(ctx, lab, x, y + r + 14, { s: 11, w: 900, c: '#fff', bg: col });
  },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f0f9ff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  stepChips(S, id, y, x0, lab, onEx, n = 9) { return Q42.chips(S, id, [['ex', lab || 'الحل خطوة خطوة'], ['nx', '⬇ الخطوة التالية']], y, '', (S2, k) => { if (k === 'ex' || !S2.ex) { S2.ex = 1; S2.k = 0; if (onEx) onEx(S2); if (k === 'ex') return; } S2.k = Math.min(S2.k + 1, n); }, { bw: 160, x0 }); }
});

/* =============== A1 — الضغط P = F / A: الطابوقة على الإسفنج (3-2، ص 28–29) =============== */
(() => {
  const FACE = [['big', 'الوجه الكبير', .2, .1, 20], ['mid', 'الوجه المتوسط', .2, .05, 10], ['small', 'الوجه الصغير', .1, .05, 5]]; // w,d (m), height cm
  const W = 20; // N
  const D = { id: 'g10_f_press', page: 28, fig: 'الشكل 1-3',
    desc: 'الضغط هو مقدار القوة المؤثرة عمودياً على وحدة المساحة: P = F / A ، ووحدته N/m² وتسمى الباسكال Pa. فإذا أثرت قوة 1 N عمودياً على مساحة 1 m² كان الضغط 1 Pa. القوة نفسها تولد ضغطاً أكبر كلما صغرت المساحة.',
    tags: 'الضغط P=F/A باسكال Pa مساحة قوة عمودية طابوقة إسفنج مائع تعريف المائع',
    tools: ['طابوقة وزنها 20 N', 'قطعة إسفنج', 'يد تضغط'],
    steps: ['اضغط على الطابوقة (أو الأزرار) لتقلبها على وجه آخر: القوة نفسها 20 N لكن المساحة تتغير.', 'لاحظ غوص الطابوقة في الإسفنج: كلما صغرت المساحة كبر الضغط وزاد الغوص.', 'اسحب اليد الحمراء إلى الأسفل لتضيف قوة ضغط: P = F / A يزداد.'],
    concl: ['P = F / A: الضغط يتناسب طردياً مع القوة وعكسياً مع المساحة.', 'وحدة الضغط N/m² = Pa (باسكال).', 'لهذا تُصنع السكاكين حادة (مساحة صغيرة) والأحذية الثلجية عريضة (مساحة كبيرة).'],
    laws: ['g10_pressure'],
    controls: [],
    setup(S) { S.f = 'big'; S.hand = 0; S.sink = 0; },
    F(S) { return W + S.hand; },
    A(S) { const q = FACE.find(q => q[0] === S.f); return q[2] * q[3]; },
    update(S, dt) { const tgt = clamp(D.F(S) / D.A(S) / 9000 * 60, 0, 70); S.sink += (tgt - S.sink) * Math.min(1, dt * 5); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), cx = L + (ph ? (w - L) / 2 : 190), sy = ph ? h * .5 : h * .55; return { w, h, ph, L, cx, sy }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 12, q = FACE.find(q => q[0] === S.f), bw = q[2] * 900, bh = q[4] * 7, F = D.F(S), A = D.A(S), P = F / A;
      Q43.bg(ctx, w, h);
      // sponge with dent
      K.raw(ctx, () => { ctx.fillStyle = '#fde68a'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.cx - 160, g.sy); ctx.lineTo(g.cx - bw / 2 - 18, g.sy); ctx.quadraticCurveTo(g.cx - bw / 2, g.sy + S.sink, g.cx - bw / 2, g.sy + S.sink); ctx.lineTo(g.cx + bw / 2, g.sy + S.sink); ctx.quadraticCurveTo(g.cx + bw / 2 + 18, g.sy, g.cx + bw / 2 + 18, g.sy); ctx.lineTo(g.cx + 160, g.sy); ctx.lineTo(g.cx + 160, g.sy + 110); ctx.lineTo(g.cx - 160, g.sy + 110); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(161,98,7,.35)'; for (let i = 0; i < 60; i++) { const x = g.cx - 150 + (i * 37) % 300, y = g.sy + 10 + (i * 53) % 95; if (y > g.sy + S.sink + 4 || Math.abs(x - g.cx) > bw / 2 + 16) { ctx.beginPath(); ctx.arc(x, y, 2.5, 0, TAU); ctx.fill(); } } });
      const by = g.sy + S.sink - bh; Q42.box(ctx, g.cx - bw / 2, by, bw, bh, 14, '#b91c1c');
      // hand / force
      const hy = by - 24 - 10; K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; rr(ctx, g.cx - 26, hy - 8 - S.hand * .4, 52, 16, 6); ctx.fill(); ctx.strokeStyle = '#7f1d1d'; ctx.stroke(); });
      if (S.hand > 0) Q43.arrow(ctx, g.cx, hy - 50 - S.hand * .4, 0, 34, '#dc2626', '', 3);
      Q43.arrow(ctx, g.cx + bw / 2 + 30, by + bh / 2 - 30, 0, 50, '#0f766e', 'F', 3);
      Q42.T(ctx, q[1], g.cx, g.sy + 130, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' });
      Q42.T(ctx, 'A = ' + (q[2] * 100) + ' cm × ' + (q[3] * 100) + ' cm = ' + Q42.sci(A, 3, 'm²'), g.cx, g.sy + 156, { s: fs, w: 800, c: '#334155' });
      if (!g.ph) Q42.card(ctx, S, [{ t: 'F = ' + W + ' + ' + S.hand + ' = ' + F + ' N', mono: 1 }, { t: 'A = ' + Q42.sci(A, 3, 'm²'), mono: 1 }, { t: 'P = F / A = ' + F + ' / ' + Q42.sci(A, 3), mono: 1 }, { t: 'P = ' + Q42.sci(P, 4, 'Pa'), mono: 1, c: '#b91c1c', w: 900 }, { t: 'مساحة أصغر ⟸ ضغط أكبر', c: '#0f766e', w: 900 }], { title: 'الضغط', y: 70, wd: 300 });
      else Q42.T(ctx, 'P = ' + Q42.sci(P, 4, 'Pa'), w / 2, 80, { s: 13, w: 900, c: '#fff', bg: '#b91c1c' });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, 'اقلب الطابوقة، واسحب اليد الحمراء لتضغط');
    },
    chips(S, g) { return Q42.chips(S, 'f', FACE.map(q => [q[0], q[1]]), g.h - 84, S.f, (S2, k) => { S2.f = k; }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), q = FACE.find(q => q[0] === S.f), bw = q[2] * 900, bh = q[4] * 7, by = g.sy + S.sink - bh, hy = by - 34;
      return [{ id: 'hand', x: g.cx, y: hy - S.hand * .4, r: 20, axis: 'y', keep: true, tip: 'اسحب إلى الأسفل لتضغط', idle: 'اسحب ✋', drag: (S2, d) => { S2.hand = clamp(Math.round((d.y - (hy - S.hand * .4) + S.hand) / 5) * 5, 0, 40); } },
        { id: 'brick', x: g.cx, y: by + bh / 2, w: bw, h: Math.max(bh, 30), axis: 'none', hint: false, tip: 'اضغط لقلب الطابوقة', click: S2 => { const i = FACE.findIndex(q => q[0] === S2.f); S2.f = FACE[(i + 1) % 3][0]; } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('القوة F', D.F(S) + ' N'), rd('المساحة A', Q42.sci(D.A(S), 3, 'm²')), rd('الضغط P', Q42.sci(D.F(S) / D.A(S), 4, 'Pa'))]; },
    record(S) { return { a: D.A(S), f: D.F(S), p: Math.round(D.F(S) / D.A(S)) }; },
    cols: [['a', 'A (m²)'], ['f', 'F (N)'], ['p', 'P (Pa)']],
    explain(S) { return Q26.ex('الطابوقة نفسها تغوص في الإسفنج أكثر عندما تقف على وجهها الصغير.', 'الوزن نفسه يتوزع على مساحة أصغر، فيكون نصيب كل متر مربع من القوة أكبر: P = F / A.', 'المسمار المدبب يدخل الخشب بسهولة، وسرفة الدبابة العريضة تمنعها من الغوص في الرمل.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — ضغط السائل P = P₀ + ρgh: المجس داخل الحوض (الأشكال 2-3، 3-3، 4-3، مثال الغواص) =============== */
(() => {
  const HM = 25; // tank depth in m
  const EX = { q: 'احسب الضغط المتولد من الماء على غواص على عمق 20 m تحت سطح الماء، كثافة الماء 1000 kg/m³', lines: ['P = ρ g h', 'P = 1000 × 9.8 × 20', 'P = 196000 N/m²'] };
  const DIRS = [['dn', 'الغشاء للأسفل', Math.PI / 2], ['up', 'للأعلى', -Math.PI / 2], ['side', 'للجانب', 0]];
  const D = { id: 'g10_f_depth', page: 29, fig: 'الأشكال 2-3 و 3-3 و 4-3 + مثال ص 31',
    desc: 'ضغط السائل عند عمق h يساوي وزن عمود السائل فوق وحدة المساحة: Ph = ρ g h. وفي الوعاء المفتوح يضاف الضغط الجوي: P = P₀ + ρ g h. ولأن السائل غير قابل للانضغاط وجزيئاته تنزلق بسهولة فإن ضغطه يؤثر في جميع الاتجاهات بالمقدار نفسه عند العمق نفسه.',
    tags: 'ضغط السائل Ph=ρgh P=P0+ρgh الضغط الجوي العمق الكثافة جميع الاتجاهات غواص 196000',
    tools: ['حوض سائل', 'مجس ضغط بغشاء مطاطي', 'مانوميتر'],
    steps: ['اسحب المجس الأحمر إلى الأسفل داخل الحوض: الضغط يزداد مع العمق.', 'اضغط على المجس (أو زر الاتجاه) لتدوير الغشاء للأعلى أو للجانب: الضغط لا يتغير عند العمق نفسه.', 'غيّر السائل (ماء، زيت، زئبق): الضغط يتناسب مع الكثافة.', 'فعّل «الضغط الجوي» لترى الضغط الكلي P = P₀ + ρgh، ثم حل مثال الغواص.'],
    concl: ['Ph = ρ g h: يزداد ضغط السائل طردياً مع العمق ومع الكثافة.', 'الضغط الكلي في وعاء مفتوح P = P₀ + ρ g h.', 'ضغط السائل يؤثر في جميع الاتجاهات بالمقدار نفسه عند العمق نفسه (الشكل 4-3).', 'مثال الغواص: P = 196000 N/m² على عمق 20 m.'],
    laws: ['g10_liqp'],
    controls: [TG('p0', 'إضافة الضغط الجوي P₀', false, null, 'atm')],
    setup(S) { S.h = 5; S.lq = 'w'; S.dir = 'dn'; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), tx = L + 30, tw = ph ? w - L - 120 : 300, lvl = 110, bot = h - 190; return { w, h, ph, L, tx, tw, lvl, bot, px: tx + tw * .55 }; },
    py(S, g) { return g.lvl + S.h / HM * (g.bot - g.lvl - 20); },
    P(S) { return Q43.LIQ[S.lq][1] * 9.8 * S.h + (S.p.p0 ? 101300 : 0); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 12, Lq = Q43.LIQ[S.lq], y = D.py(S, g), P = D.P(S), Ph = Lq[1] * 9.8 * S.h;
      Q43.bg(ctx, w, h); Q43.tank(ctx, g.tx, g.lvl - 40, g.tw, g.bot, g.lvl, Lq[2]);
      for (let m = 0; m <= HM; m += 5) { const yy = g.lvl + m / HM * (g.bot - g.lvl - 20); Q41.line(ctx, [[g.tx + g.tw - 14, yy], [g.tx + g.tw, yy]], '#0f172a', 1.5); Q42.T(ctx, m + ' m', g.tx + g.tw + 22, yy, { s: 9.5, w: 800, c: '#334155' }); }
      // column of liquid above probe
      K.raw(ctx, () => { ctx.strokeStyle = 'rgba(220,38,38,.6)'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5; ctx.strokeRect(g.px - 22, g.lvl, 44, y - g.lvl); ctx.setLineDash([]); });
      Q42.T(ctx, 'h', g.px - 34, (g.lvl + y) / 2, { s: 13, w: 900, c: '#dc2626' });
      // probe: tube from top + membrane
      const a = DIRS.find(q => q[0] === S.dir)[2];
      K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.px + 40, g.lvl - 60); ctx.lineTo(g.px + 40, y); ctx.lineTo(g.px, y); ctx.stroke(); ctx.save(); ctx.translate(g.px, y); ctx.rotate(a - Math.PI / 2); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(-14, -6); ctx.lineTo(14, -6); ctx.lineTo(14, 4); ctx.lineTo(-14, 4); ctx.fill(); ctx.fillStyle = '#fca5a5'; ctx.beginPath(); ctx.ellipse(0, 6 - Math.min(5, Ph / 4e4), 14, 4, 0, 0, TAU); ctx.fill(); ctx.restore(); });
      // pressure arrows in all directions
      const L = clamp(Ph / 6000, 8, 40); [0, Math.PI / 2, Math.PI, -Math.PI / 2].forEach(t => Q43.arrow(ctx, g.px + Math.cos(t) * (L + 22), y + Math.sin(t) * (L + 22), -Math.cos(t) * L, -Math.sin(t) * L, '#7c3aed', '', 2.4));
      // gauge on top
      const gx = g.ph ? w - 60 : g.tx + g.tw + 120, gy = g.ph ? g.lvl - 10 : 330; Q43.gauge(ctx, gx, gy + 30, 34, P / (S.p.p0 ? 450000 : 350000), Q42.sci(P, 3, 'Pa'));
      Q42.T(ctx, Lq[0] + ': ρ = ' + Lq[1] + ' kg/m³', g.tx + g.tw / 2, g.bot + 20, { s: fs, w: 900, c: '#fff', bg: Lq[3] });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.l); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e); Q42.drawChips(ctx, C.d);
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: 'مثال ص 31: الغواص' }, EX, { k: S.k }), { y: 70, x: w - 12, wd: g.ph ? w - 24 : 300 });
      else if (!g.ph) Q42.card(ctx, S, [{ t: 'Ph = ρ g h', mono: 1, w: 900, c: '#0f766e' }, { t: '= ' + Lq[1] + ' × 9.8 × ' + S.h.toFixed(1), mono: 1 }, { t: '= ' + Q42.sci(Ph, 4, 'Pa'), mono: 1, c: '#b91c1c', w: 900 }].concat(S.p.p0 ? [{ t: 'P = P₀ + ρgh = ' + Q42.sci(P, 4, 'Pa'), mono: 1, c: '#7c3aed', w: 900 }] : [{ t: 'الضغط نفسه في جميع الاتجاهات', c: '#7c3aed', w: 800 }]), { title: 'ضغط السائل على عمق ' + S.h.toFixed(1) + ' m', y: 70, wd: 300 });
      Q42.banner(ctx, w, 'اسحب المجس الأحمر إلى الأسفل، واضغط عليه لتدويره');
    },
    chips(S, g) { return { l: Q42.chips(S, 'lq', [['w', 'ماء'], ['oil', 'زيت'], ['hg', 'زئبق']], g.h - 128, S.lq, (S2, k) => { S2.lq = k; }, { bw: 110 }), d: Q42.chips(S, 'dir', DIRS.map(q => [q[0], q[1]]), g.h - 128, S.dir, (S2, k) => { S2.dir = k; }, { bw: 120, x0: g.L + 360 }), e: Q43.stepChips(S, 'ex', g.h - 84, g.L, 'مثال الغواص', S2 => { S2.h = 20; S2.lq = 'w'; }, 3) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), y = D.py(S, g);
      return [{ id: 'probe', x: g.px, y, r: 20, axis: 'y', keep: true, tip: 'اسحب المجس', idle: 'اسحب ✋', drag: (S2, d) => { S2.h = Math.round(clamp((d.y - g.lvl) / (g.bot - g.lvl - 20) * HM, 0, HM) * 2) / 2; }, click: S2 => { const i = DIRS.findIndex(q => q[0] === S2.dir); S2.dir = DIRS[(i + 1) % 3][0]; } }].concat(C.l, C.d, C.e); },
    readings(S) { return [rd('السائل', Q43.LIQ[S.lq][0]), rd('العمق h', S.h.toFixed(1) + ' m'), rd('ضغط السائل ρgh', Q42.sci(Q43.LIQ[S.lq][1] * 9.8 * S.h, 4, 'Pa')), rd('الضغط الكلي', Q42.sci(Q43.LIQ[S.lq][1] * 9.8 * S.h + 101300, 4, 'Pa'))]; },
    record(S) { return { l: Q43.LIQ[S.lq][0], h: S.h, p: Math.round(Q43.LIQ[S.lq][1] * 9.8 * S.h) }; },
    cols: [['l', 'السائل'], ['h', 'h (m)'], ['p', 'ρgh (Pa)']],
    explain(S) { return Q26.ex('كلما نزل المجس ازدادت قراءة المقياس، ودوران الغشاء عند العمق نفسه لا يغير القراءة.', 'الضغط عند عمق h يساوي وزن عمود السائل فوق وحدة المساحة: ρgh. والسائل لا ينضغط وجزيئاته تنزلق على بعضها فينقل الضغط في جميع الاتجاهات.', 'تُبنى السدود أسمك من الأسفل، ويشعر الغواص بألم في أذنيه كلما غاص أعمق.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — الضغط الجوي: مرواز تورشلي (الشكل 5-3 + مثال ص 32) =============== */
(() => {
  const ALT = [['sea', 'سطح البحر', 76], ['city', 'مدينة مرتفعة 1500 m', 63.5], ['mt', 'جبل 3000 m', 52.6]];
  const EX = { q: 'ما طول عمود الماء اللازم لمعادلة الضغط الجوي إذا كان ارتفاع عمود الزئبق 76 cm؟ كثافة الماء 1000 وكثافة الزئبق 13600 kg/m³', lines: ['ضغط عمود الماء = ضغط عمود الزئبق', 'ρm g hm = ρw g hw', '13600 × 9.8 × 0.76 = 1000 × 9.8 × hw', 'hw = 13.6 × 0.76 = 10.33 m'] };
  const D = { id: 'g10_f_baro', page: 31, fig: 'الشكل 5-3 + مثال ص 32',
    desc: 'المرواز (البارومتر) الذي صممه تورشلي: أنبوبة زجاج طولها متر واحد تملأ تماماً بالزئبق ثم تنكس فوهتها في حوض فيه زئبق، فيستقر الزئبق في الأنبوبة على ارتفاع 76 cm فوق سطحه في الحوض عند سطح البحر وبدرجة 0 °C تاركاً فراغاً في أعلى الأنبوبة. الضغط الجوي يتزن مع ضغط عمود الزئبق.',
    tags: 'الضغط الجوي مرواز بارومتر تورشلي زئبق 76cm عمود الماء 10.33m ارتفاع عن سطح البحر',
    tools: ['أنبوبة زجاج طولها 1 m', 'زئبق', 'حوض'],
    steps: ['اسحب طرف الأنبوبة العلوي لإمالتها: يزداد طول الزئبق داخلها لكن الارتفاع الشاقولي يبقى 76 cm.', 'اختر مكاناً أعلى عن سطح البحر: ينخفض عمود الزئبق لأن الضغط الجوي يقل.', 'بدّل السائل إلى الماء: كم يجب أن يكون طول الأنبوبة؟ ثم حل مثال الكتاب.'],
    concl: ['الضغط الجوي عند سطح البحر يعادل ضغط عمود زئبق ارتفاعه 76 cm: P₀ = ρ g h ≈ 1.013×10⁵ Pa.', 'الارتفاع الشاقولي لعمود الزئبق لا يعتمد على ميل الأنبوبة ولا على قطرها.', 'يقل الضغط الجوي بالارتفاع عن سطح البحر.', 'عمود الماء المكافئ = 13.6 × 0.76 = 10.33 m ، لذا يُستعمل الزئبق الكثيف.'],
    laws: ['g10_liqp'],
    controls: [],
    setup(S) { S.tilt = 0; S.alt = 'sea'; S.lq = 'hg'; S.ex = 0; S.k = 0; },
    hcm(S) { const h = ALT.find(q => q[0] === S.alt)[2]; return S.lq === 'hg' ? h : h * 13.6; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), bx = L + (ph ? 110 : 150), by = h - 200, pc = Math.min(4.4, (h - 300) / 110); return { w, h, ph, L, bx, by, pc }; }, // pc: px per cm
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 12, hc = D.hcm(S), wat = S.lq === 'w', Ltube = wat ? 1100 : 100, pc = wat ? g.pc * 100 / 1100 * 1.0 : g.pc, th = S.tilt, ca = Math.cos(th), sa = Math.sin(th);
      const len = Ltube * pc, top = [g.bx + sa * len, g.by - 20 - ca * len], vertH = Math.min(hc, Ltube * ca) * pc, inTube = Math.min(Ltube, hc / Math.max(ca, .01));
      Q43.bg(ctx, w, h);
      // dish
      const col = wat ? Q43.LIQ.w[2] : Q43.LIQ.hg[2];
      K.raw(ctx, () => { ctx.fillStyle = col; ctx.fillRect(g.bx - 90, g.by - 20, 180, 40); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.bx - 90, g.by - 40); ctx.lineTo(g.bx - 90, g.by + 20); ctx.lineTo(g.bx + 90, g.by + 20); ctx.lineTo(g.bx + 90, g.by - 40); ctx.stroke(); });
      // tube: from (bx, by+5) along angle th
      K.raw(ctx, () => { ctx.save(); ctx.translate(g.bx, g.by + 5); ctx.rotate(th); const lp = (len + 25), fill = inTube * pc + 25; ctx.fillStyle = col; ctx.fillRect(-7, -fill, 14, fill); ctx.strokeStyle = 'rgba(51,65,85,.9)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(-9, -lp); ctx.arc(0, -lp, 9, Math.PI, 0); ctx.lineTo(9, 0); ctx.stroke(); ctx.restore(); });
      if (Ltube * ca > hc + .5) Q42.T(ctx, 'فراغ', g.bx + sa * (len - 6) + 26, g.by - ca * (len - 6), { s: 10, w: 800, c: '#64748b' });
      // vertical height marker
      const yTop = g.by - 20 - vertH, xm = g.bx + 120; Q41.line(ctx, [[g.bx + sa * (inTube * pc + 25) + 10, yTop], [xm + 10, yTop]], '#dc2626', 1.4, [4, 3]); Q41.line(ctx, [[xm, g.by - 20], [xm, yTop]], '#dc2626', 2.2);
      Q42.T(ctx, 'h = ' + (wat ? (hc / 100).toFixed(2) + ' m' : hc.toFixed(1) + ' cm'), xm + 12, (g.by - 20 + yTop) / 2, { s: fs + 1, w: 900, c: '#fff', bg: '#dc2626', a: 'left' });
      Q41.knob(ctx, top[0], top[1], '#2563eb', 11);
      // air arrows on the dish
      [-60, -30, 30, 60].forEach(dx => Q43.arrow(ctx, g.bx + dx, g.by - 70, 0, 36, '#0ea5e9', '', 2.2)); Q42.T(ctx, 'P₀', g.bx - 76, g.by - 70, { s: 12, w: 900, c: '#0369a1' });
      const P0 = (wat ? 1000 : 13600) * 9.8 * hc / 100;
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.l); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: 'مثال ص 32' }, EX, { k: S.k }), { y: 70, x: w - 12, wd: g.ph ? w - 24 : 320 });
      else if (!g.ph) Q42.card(ctx, S, [{ t: 'P₀ = ρ g h', mono: 1, w: 900, c: '#0f766e' }, { t: '= ' + (wat ? 1000 : 13600) + ' × 9.8 × ' + (hc / 100).toFixed(3), mono: 1 }, { t: '= ' + Q42.sci(P0, 4, 'Pa'), mono: 1, c: '#b91c1c', w: 900 }, { t: 'ميل الأنبوبة: ' + Math.round(th * 180 / Math.PI) + '° والارتفاع الشاقولي ثابت', c: '#334155' }, { t: 'طول الزئبق داخل الأنبوبة = ' + (inTube).toFixed(1) + ' cm', c: '#64748b' }], { title: 'مرواز تورشلي — ' + ALT.find(q => q[0] === S.alt)[1], y: 70, wd: 320 });
      Q42.banner(ctx, w, 'اسحب طرف الأنبوبة الأزرق لإمالتها');
    },
    chips(S, g) { return { a: Q42.chips(S, 'alt', ALT.map(q => [q[0], q[1]]), g.h - 128, S.alt, (S2, k) => { S2.alt = k; }, { bw: 170 }), l: Q42.chips(S, 'lq', [['hg', 'زئبق'], ['w', 'ماء']], g.h - 128, S.lq, (S2, k) => { S2.lq = k; }, { bw: 90, x0: g.L + 540 }), e: Q43.stepChips(S, 'ex', g.h - 84, g.L, 'مثال عمود الماء', S2 => { S2.alt = 'sea'; S2.lq = 'w'; }, 4) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), wat = S.lq === 'w', pc = wat ? g.pc * 100 / 1100 : g.pc, len = (wat ? 1100 : 100) * pc;
      return [{ id: 'tube', x: g.bx + Math.sin(S.tilt) * len, y: g.by - 20 - Math.cos(S.tilt) * len, r: 18, axis: 'xy', keep: true, tip: 'اسحب لإمالة الأنبوبة', idle: 'اسحب ✋', drag: (S2, d) => { S2.tilt = clamp(Math.atan2(d.x - g.bx, g.by - 20 - d.y), 0, 1.1); } }].concat(C.a, C.l, C.e); },
    readings(S) { const hc = D.hcm(S); return [rd('المكان', ALT.find(q => q[0] === S.alt)[1]), rd('ارتفاع العمود', S.lq === 'w' ? (hc / 100).toFixed(2) + ' m ماء' : hc.toFixed(1) + ' cm زئبق'), rd('الضغط الجوي', Q42.sci(13600 * 9.8 * ALT.find(q => q[0] === S.alt)[2] / 100, 4, 'Pa')), rd('ميل الأنبوبة', Math.round(S.tilt * 180 / Math.PI) + '°')]; },
    explain(S) { return Q26.ex('عند إمالة الأنبوبة يدخلها زئبق أكثر، لكن الارتفاع الشاقولي للعمود يبقى 76 cm.', 'الضغط الجوي على سطح الحوض يتزن مع ضغط عمود الزئبق ρgh ، وهذا يعتمد على الارتفاع الشاقولي فقط. والماء أقل كثافة 13.6 مرة فيحتاج عموداً أطول 13.6 مرة: 10.33 m.', 'جهاز قياس ضغط الدم مانوميتر زئبقي: الضغط الانقباضي حوالي 120 mmHg والانبساطي حوالي 80 mmHg.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — قاعدة باسكال: المكبس الهيدروليكي (الشكلان 6-3 و 7-3 + مثال ص 34) =============== */
(() => {
  const CASE = { car: ['مثال ص 34: سيارة', 15, 2000, 30000], p3: ['مسألة 3 ص 51: النسبة 50', 10, 500, 6000], free: ['جرّب بنفسك', 20, 400, 8000] }; // A1 cm², A2 cm², F2 N
  const EX = { car: { q: 'احسب القوة اللازمة لرفع سيارة كتلتها 3000 kg بالرافعة الزيتية، مساحة المكبس الصغير 15 cm² والكبير 2000 cm² (g = 10)', lines: ['F₂ = m g = 3000 × 10 = 30000 N', 'F₁ / A₁ = F₂ / A₂', 'F₁ = 30000 × 15 / 2000', 'F₁ = 225 N'] }, p3: { q: 'مكبس هيدروليكي النسبة بين مساحتي مكبسيه 50، فإذا كانت القوة المؤثرة على المكبس الكبير 6000 N فما القوة على المكبس الصغير؟', lines: ['A₂ / A₁ = 50', 'F₁ = F₂ × A₁ / A₂', 'F₁ = 6000 / 50', 'F₁ = 120 N'] }, free: { q: 'كلما ازدادت النسبة A₂ / A₁ ازدادت القوة في المكبس الكبير', lines: ['F₂ = F₁ × A₂ / A₁', 'حجم السائل المنتقل ثابت: A₁ d₁ = A₂ d₂', 'نكسب في القوة ونخسر في المسافة'] } };
  const D = { id: 'g10_f_pascal', page: 33, fig: 'الشكلان 6-3 و 7-3 + مثال ص 34',
    desc: 'قاعدة باسكال: عندما يسلَّط ضغط على سائل محصور في إناء فإن الضغط ينتقل بالتساوي إلى جميع أجزاء السائل وإلى جدران الإناء. في المكبس الهيدروليكي: P = F₁ / A₁ = F₂ / A₂ ، فتتضاعف القوة بنسبة المساحتين A₂ / A₁. ومن تطبيقاته الرافعة الزيتية والكوابح والمطارق.',
    tags: 'قاعدة باسكال مكبس هيدروليكي رافعة زيتية F1/A1=F2/A2 225N 120N كوابح سائل محصور',
    tools: ['مكبس صغير', 'مكبس كبير', 'زيت هيدروليكي', 'سيارة'],
    steps: ['اسحب مقبض المكبس الصغير الأحمر إلى الأسفل: ترتفع السيارة على المكبس الكبير ببطء.', 'لاحظ المقياسين: الضغط متساوٍ في المكبسين (قاعدة باسكال) لكن القوة مختلفة.', 'اختر مثال الكتاب أو مسألة 3 واضغط «الحل خطوة خطوة».', 'في «جرّب بنفسك» اسحب المقبض الأزرق لتغيير مساحة المكبس الكبير.'],
    concl: ['الضغط المسلط على سائل محصور ينتقل بالتساوي إلى جميع أجزائه.', 'F₁ / A₁ = F₂ / A₂ ⟸ F₂ = F₁ × A₂ / A₁.', 'مثال ص 34: F₁ = 225 N ترفع سيارة وزنها 30000 N.', 'الحجم المزاح ثابت A₁ d₁ = A₂ d₂: نكسب في القوة ونخسر في المسافة.'],
    laws: ['g10_pascal'],
    controls: [],
    setup(S) { S.cs = 'car'; S.d1 = 0; S.A2 = 400; S.ex = 0; S.k = 0; },
    C(S) { const c = CASE[S.cs]; return { A1: c[1], A2: S.cs === 'free' ? S.A2 : c[2], F2: c[3] }; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), base = h - 225, x1 = L + (ph ? 50 : 80), x2 = L + (ph ? 200 : 300); return { w, h, ph, L, base, x1, x2, top: base - 180 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 12, c = D.C(S), F1 = c.F2 * c.A1 / c.A2, P = F1 / (c.A1 * 1e-4), w1 = 12 + Math.sqrt(c.A1) * 2.6, w2 = Math.min(g.ph ? 150 : 200, 30 + Math.sqrt(c.A2) * 3.4), d2 = S.d1 * c.A1 / c.A2;
      const y1 = g.top + 20 + S.d1, y2 = g.top + 80 - d2; Q43.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(234,179,8,.65)'; ctx.fillRect(g.x1 - w1 / 2, y1, w1, g.base - y1); ctx.fillRect(g.x2 - w2 / 2, y2, w2, g.base - y2); ctx.fillRect(g.x1 - w1 / 2, g.base - 26, g.x2 - g.x1 + w1 / 2, 26);
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.x1 - w1 / 2, g.top - 40); ctx.lineTo(g.x1 - w1 / 2, g.base); ctx.lineTo(g.x2 + w2 / 2, g.base); ctx.lineTo(g.x2 + w2 / 2, g.top - 10); ctx.moveTo(g.x2 - w2 / 2, g.top - 10); ctx.lineTo(g.x2 - w2 / 2, g.base - 26); ctx.lineTo(g.x1 + w1 / 2, g.base - 26); ctx.lineTo(g.x1 + w1 / 2, g.top - 40); ctx.stroke();
        ctx.fillStyle = '#475569'; ctx.fillRect(g.x1 - w1 / 2 + 2, y1 - 10, w1 - 4, 10); ctx.fillRect(g.x2 - w2 / 2 + 2, y2 - 12, w2 - 4, 12); ctx.fillStyle = '#64748b'; ctx.fillRect(g.x1 - 3, y1 - 60, 6, 50); ctx.fillStyle = '#dc2626'; rr(ctx, g.x1 - 20, y1 - 72, 40, 14, 5); ctx.fill(); });
      // car on big piston
      K.raw(ctx, () => { const cx = g.x2, cy = y2 - 12; ctx.fillStyle = '#2563eb'; rr(ctx, cx - 60, cy - 30, 120, 22, 6); ctx.fill(); rr(ctx, cx - 34, cy - 48, 66, 22, 8); ctx.fill(); ctx.fillStyle = '#bfdbfe'; ctx.fillRect(cx - 26, cy - 44, 24, 14); ctx.fillRect(cx + 2, cy - 44, 24, 14); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(cx - 34, cy - 6, 10, 0, TAU); ctx.arc(cx + 34, cy - 6, 10, 0, TAU); ctx.fill(); });
      Q43.arrow(ctx, g.x1, y1 - 130, 0, 50, '#dc2626', '', 3); Q42.T(ctx, 'F₁ = ' + F1.toFixed(F1 < 100 ? 1 : 0) + ' N', g.x1, y1 - 145, { s: fs, w: 900, c: '#fff', bg: '#dc2626' });
      Q43.arrow(ctx, g.x2 + w2 / 2 + 24, y2 - 60, 0, -50, '#16a34a', '', 3); Q42.T(ctx, 'F₂ = ' + c.F2 + ' N', g.x2 + w2 / 2 + 24, y2 - 124, { s: fs, w: 900, c: '#fff', bg: '#16a34a' });
      Q42.T(ctx, 'A₁ = ' + c.A1 + ' cm²', g.x1, g.base + 18, { s: fs - 1, w: 800 }); Q42.T(ctx, 'A₂ = ' + c.A2 + ' cm²', g.x2, g.base + 18, { s: fs - 1, w: 800 });
      Q42.T(ctx, 'الضغط متساوٍ: ' + Q42.sci(P, 3, 'Pa'), (g.x1 + g.x2) / 2, g.base - 12, { s: fs - 1, w: 900, c: '#7c2d12' });
      Q42.T(ctx, 'نزل المكبس الصغير ' + S.d1.toFixed(0) + ' وحدة ⟸ ارتفعت السيارة ' + d2.toFixed(2), (g.x1 + g.x2) / 2, g.base + 42, { s: fs - 1, w: 800, c: '#334155' });
      if (S.cs === 'free') Q41.knob(ctx, g.x2 + w2 / 2, g.base - 50, '#2563eb', 10);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: CASE[S.cs][0] }, EX[S.cs], { k: S.k }), { y: 70, x: w - 12, wd: g.ph ? w - 24 : 320 });
      else if (!g.ph) Q42.card(ctx, S, [{ t: 'F₁ / A₁ = F₂ / A₂', mono: 1, w: 900, c: '#0f766e' }, { t: 'مضاعف القوة: A₂ / A₁ = ' + (c.A2 / c.A1).toFixed(1), c: '#334155' }, { t: 'F₁ = F₂ × A₁ / A₂ = ' + F1.toFixed(1) + ' N', mono: 1, c: '#b91c1c', w: 900 }, { t: 'A₁ d₁ = A₂ d₂', mono: 1, c: '#7c3aed' }], { title: 'قاعدة باسكال', y: 70, wd: 320 });
      Q42.banner(ctx, w, 'اسحب مقبض المكبس الصغير الأحمر إلى الأسفل');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', Object.keys(CASE).map(k => [k, CASE[k][0]]), g.h - 128, S.cs, (S2, k) => { S2.cs = k; S2.d1 = 0; S2.ex = 0; }, { bw: 200 }), e: Q43.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, 4) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), L = [{ id: 'p1', x: g.x1, y: g.top + 20 + S.d1 - 65, r: 20, axis: 'y', keep: true, tip: 'اسحب إلى الأسفل', idle: 'اسحب ✋', drag: (S2, d) => { S2.d1 = clamp(d.y + 65 - g.top - 20, 0, 140); } }];
      if (S.cs === 'free') { const w2 = Math.min(g.ph ? 150 : 200, 30 + Math.sqrt(S.A2) * 3.4); L.push({ id: 'a2', x: g.x2 + w2 / 2, y: g.base - 50, r: 16, axis: 'x', keep: true, hint: false, tip: 'اسحب لتغيير A₂', drag: (S2, d) => { const ww = clamp((d.x - g.x2) * 2, 60, g.ph ? 150 : 200); S2.A2 = Math.max(40, Math.round(Math.pow((ww - 30) / 3.4, 2) / 10) * 10); } }); }
      return L.concat(C.c, C.e); },
    readings(S) { const c = D.C(S), F1 = c.F2 * c.A1 / c.A2; return [rd('A₁', c.A1 + ' cm²'), rd('A₂', c.A2 + ' cm²'), rd('F₁ اللازمة', F1.toFixed(1) + ' N'), rd('F₂', c.F2 + ' N'), rd('الضغط', Q42.sci(F1 / (c.A1 * 1e-4), 3, 'Pa'))]; },
    explain(S) { return Q26.ex('قوة صغيرة على المكبس الصغير ترفع سيارة ثقيلة على المكبس الكبير، لكن السيارة ترتفع مسافة صغيرة جداً.', 'السائل المحصور ينقل الضغط بالتساوي (باسكال): F₁/A₁ = F₂/A₂ ، فالقوة تتضاعف بنسبة المساحتين. وحجم الزيت المنتقل ثابت فالمسافة تقل بالنسبة نفسها.', 'يجب ألا يتجمد زيت الرافعة ولا يتبخر وأن يكون غير سام وغير سريع الاشتعال (هل تعلم ص 33).'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — قاعدة أرخميدس: الميزان الحلزوني والحوض الفائض (الأشكال 8-3، 9-3، 10-3 + المثالان ص 37–38) =============== */
(() => {
  const MAT = [['fe', 'حديد', 7800, '#64748b'], ['al', 'ألمنيوم', 2700, '#cbd5e1'], ['pl', 'بلاستيك معلق', 1000, '#a855f7'], ['ice', 'جليد', 920, '#e0f2fe'], ['wd', 'خشب', 800, '#b45309']];
  const V = 4.5e-5, g0 = 10; // body volume (m³), g
  const EX = { e1: { t: 'مثال 1 ص 37', q: 'جسم يزن في الهواء 5 N ويزن 4.55 N عند غمره تماماً في الماء. احسب حجمه (g = 10)', lines: ['الوزن في الهواء − الوزن في الماء = V ρ g', '5 − 4.55 = V × 1000 × 10', '0.45 = 10000 V', 'V = 0.45×10⁻⁴ m³'] }, e2: { t: 'مثال 2 ص 38', q: 'مكعب من الخشب طول حرفه 10 cm وكثافته الوزنية 7840 N/m³ يطفو في الماء. ما طول الجزء الغاطس؟', lines: ['وزن الجسم الطافي = وزن السائل المزاح', '(ρ g V) جسم = (ρ g V) ماء', '7840 × 0.1³ = 9800 × 0.1² × h', 'h = 784 / 9800 = 0.08 m = 8 cm'] } };
  const D = { id: 'g10_f_arch', page: 35, fig: 'الأشكال 8-3 و 9-3 و 10-3',
    desc: 'قاعدة أرخميدس: إذا غُمر جسم جزئياً أو كلياً في مائع فإنه يفقد من وزنه بقدر وزن المائع المزاح. قوة الطفو FB = ρ g V وتساوي وزن المائع المزاح. إذا كانت كثافة الجسم أكبر من كثافة المائع غطس (FB < mg)، وإذا تساوتا بقي معلقاً (FB = mg)، وإذا كانت أصغر طفا (عند الطفو FB = mg بجزء مغمور).',
    tags: 'قاعدة أرخميدس قوة الطفو وزن المائع المزاح ميزان حلزوني غطس معلق طفو كثافة الوزن الظاهري مثال 4.55N مكعب خشب 8cm',
    tools: ['ميزان حلزوني', 'أجسام من مواد مختلفة', 'إناء فائض', 'كأس لجمع الماء المزاح'],
    steps: ['اختر مادة الجسم من الأزرار، ثم اسحب الجسم المعلق بالميزان إلى الأسفل داخل الإناء.', 'لاحظ: قراءة الميزان تقل، والماء المزاح ينسكب في الكأس، والنقص في الوزن = وزن الماء المزاح.', 'جرّب الخشب والجليد: يطفوان وقراءة الميزان صفر. والبلاستيك المعلق يبقى حيث تتركه.', 'اضغط «مثال 1» أو «مثال 2» لحل مثالي الكتاب.'],
    concl: ['الجسم المغمور يفقد من وزنه بقدر وزن المائع المزاح: FB = ρ g V.', 'الوزن في الهواء − الوزن في السائل = V ρ g.', 'ρ جسم > ρ سائل: يغطس. ρ جسم = ρ سائل: يبقى معلقاً. ρ جسم < ρ سائل: يطفو (الشكل 9-3).', 'الجسم الطافي: وزنه = وزن السائل المزاح بالجزء المغمور فقط (مثال 2: h = 8 cm).'],
    laws: ['g10_arch'],
    controls: [],
    setup(S) { S.m = 'fe'; S.lq = 'w'; S.d = 0; S.ex = ''; S.k = 0; S.spill = 0; },
    M(S) { return MAT.find(q => q[0] === S.m); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), bx = L + (ph ? 120 : 170), lvl = h * .5, bot = lvl + (ph ? 110 : 140), tw = 150, top = 70; return { w, h, ph, L, bx, lvl, bot, tw, top, cs: 44 }; },
    /* physics: submerged fraction f (0..1) for depth d of the body's bottom below the surface */
    state(S, g) { const M = D.M(S), rl = Q43.LIQ[S.lq][1], W = M[2] * V * g0, cs = g.cs; let f = clamp(S.d / cs, 0, 1); const fl = rl > M[2] * 1.001 ? M[2] / rl : null;
      if (fl != null && f > fl) f = fl; // floating: cannot be pushed further by the spring (string slack)
      const FB = rl * g0 * V * f, T = Math.max(0, W - FB); return { W, FB, T, f, fl, M, rl }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 12, st = D.state(S, g), Lq = Q43.LIQ[S.lq], cs = g.cs, yb = g.lvl - cs + st.f * cs + (st.fl != null && S.d / cs > st.fl ? 0 : 0), by = g.lvl - cs + Math.min(S.d, st.f * cs);
      const ytop = g.lvl - cs + st.f * cs - cs + cs; // top of body
      const bodyTop = g.lvl + st.f * cs - cs;
      Q43.bg(ctx, w, h);
      // overflow vessel with spout and a catch cup
      const spill = st.f * cs * .55; Q43.tank(ctx, g.bx - g.tw / 2, g.lvl - 30, g.tw, g.bot, g.lvl, Lq[2]);
      K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.bx + g.tw / 2, g.lvl + 2); ctx.lineTo(g.bx + g.tw / 2 + 40, g.lvl + 22); ctx.stroke(); const cx = g.bx + g.tw / 2 + 70; ctx.strokeRect(cx - 26, g.bot - 70, 52, 70); ctx.fillStyle = Lq[2]; ctx.fillRect(cx - 24, g.bot - spill, 48, spill); if (S.d > 0 && st.f < 1 && st.f > 0) { ctx.fillStyle = Lq[2]; ctx.fillRect(g.bx + g.tw / 2 + 40, g.lvl + 22, 3, g.bot - 70 - g.lvl - 22); } });
      Q42.T(ctx, 'الماء المزاح', g.bx + g.tw / 2 + 70, g.bot + 14, { s: 10, w: 800, c: '#0369a1' }); Q42.T(ctx, Q42.sci(st.FB, 3, 'N'), g.bx + g.tw / 2 + 70, g.bot + 32, { s: 10.5, w: 900, c: '#0369a1' });
      // spring balance
      const sy0 = g.top, sh = 110, hookY = bodyTop - 26;
      K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; rr(ctx, g.bx - 18, sy0, 36, sh, 6); ctx.fill(); ctx.stroke(); for (let k = 0; k <= 4; k++) { const y = sy0 + 12 + k * 20; ctx.beginPath(); ctx.moveTo(g.bx + 6, y); ctx.lineTo(g.bx + 16, y); ctx.stroke(); } const yy = sy0 + 12 + st.T / 4 * 80; ctx.fillStyle = '#dc2626'; ctx.fillRect(g.bx - 14, yy - 2, 24, 4); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.bx, sy0 + sh); ctx.lineTo(g.bx, hookY); ctx.stroke(); });
      for (let k = 0; k <= 4; k++) Q42.T(ctx, String(k), g.bx + 26, sy0 + 12 + k * 20, { s: 9, w: 800, c: '#334155' });
      Q42.T(ctx, 'قراءة الميزان', g.bx - 70, sy0 + 30, { s: 10, w: 800, c: '#334155' }); Q42.T(ctx, st.T.toFixed(2) + ' N', g.bx - 70, sy0 + 50, { s: fs + 1, w: 900, c: '#fff', bg: '#dc2626' });
      Q42.box(ctx, g.bx - cs / 2, bodyTop, cs, cs, 10, st.M[3]); Q41.knob(ctx, g.bx + cs / 2 + 14, bodyTop + cs / 2, '#dc2626', 9);
      // forces on the body
      Q43.arrow(ctx, g.bx - 6, bodyTop + cs + 4, 0, clamp(st.W * 40, 20, 80), '#0f172a', 'mg', 3);
      if (st.FB > .005) Q43.arrow(ctx, g.bx + 8, bodyTop + cs - 2, 0, -clamp(st.FB * 40, 14, 80), '#0284c7', 'FB', 3);
      const cas = st.M[2] > st.rl * 1.001 ? ['يغطس: ρ جسم > ρ سائل', '#b91c1c'] : st.M[2] < st.rl * .999 ? ['يطفو: ρ جسم < ρ سائل', '#16a34a'] : ['يبقى معلقاً: ρ جسم = ρ سائل', '#7c3aed'];
      if (S.d > 2) Q42.T(ctx, cas[0], g.bx, g.bot + 56, { s: fs, w: 900, c: '#fff', bg: cas[1] });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.l); C.e.forEach(b => b._col = '#be185d'); Q42.drawChips(ctx, C.e);
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: EX[S.ex].t }, EX[S.ex], { k: S.k }), { y: 70, x: w - 12, wd: g.ph ? w - 24 : 320 });
      else if (!g.ph) Q42.card(ctx, S, [{ t: 'الوزن في الهواء = ' + st.W.toFixed(3) + ' N', c: '#0f172a', w: 800 }, { t: 'قراءة الميزان = ' + st.T.toFixed(3) + ' N', c: '#dc2626', w: 800 }, { t: 'النقص = قوة الطفو = ' + st.FB.toFixed(3) + ' N', c: '#0284c7', w: 900 }, { t: 'FB = ρ g V = ' + st.rl + ' × 10 × ' + Q42.sci(V * st.f, 3), mono: 1 }, { t: 'الجزء المغمور ' + Math.round(st.f * 100) + '%', c: '#334155' }], { title: 'قاعدة أرخميدس — ' + st.M[1] + ' في ' + Lq[0], y: 70, wd: 320 });
      Q42.banner(ctx, w, 'اسحب الجسم المعلق إلى الأسفل داخل السائل');
    },
    chips(S, g) { return { m: Q42.chips(S, 'm', MAT.map(q => [q[0], q[1]]), g.h - 128, S.m, (S2, k) => { S2.m = k; S2.ex = ''; }, { bw: 120 }), l: Q42.chips(S, 'lq', [['w', 'ماء'], ['salt', 'مالح'], ['oil', 'زيت']], g.h - 84, S.lq, (S2, k) => { S2.lq = k; }, { bw: 80, x0: g.L + 350 }),
      e: Q42.chips(S, 'ex', [['e1', 'مثال 1'], ['e2', 'مثال 2'], ['nx', '⬇ التالية']], g.h - 84, S.ex, (S2, k) => { if (k === 'nx') { if (!S2.ex) S2.ex = 'e1'; S2.k = Math.min(S2.k + 1, 4); } else { S2.ex = k; S2.k = 0; S2.lq = 'w'; S2.m = k === 'e1' ? 'al' : 'wd'; S2.d = k === 'e1' ? 60 : 60; } }, { bw: 85, x1: g.L + 340 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), st = D.state(S, g), C = D.chips(S, g), bodyTop = g.lvl + st.f * g.cs - g.cs;
      return [{ id: 'body', x: g.bx, y: bodyTop + g.cs / 2, w: g.cs + 40, h: g.cs + 10, axis: 'y', keep: true, tip: 'اسحب الجسم إلى الأسفل', idle: 'اسحب ✋', drag: (S2, d) => { S2.d = clamp(d.y - (g.lvl - g.cs / 2), 0, g.bot - g.lvl - 6); } }].concat(C.m, C.l, C.e); },
    readings(S) { const st = D.state(S, D.geo(S)); return [rd('الجسم', st.M[1] + ' ρ = ' + st.M[2]), rd('الوزن في الهواء', st.W.toFixed(3) + ' N'), rd('قراءة الميزان', st.T.toFixed(3) + ' N'), rd('قوة الطفو FB', st.FB.toFixed(3) + ' N'), rd('الجزء المغمور', Math.round(st.f * 100) + '%')]; },
    record(S) { const st = D.state(S, D.geo(S)); return { m: st.M[1], l: Q43.LIQ[S.lq][0], w: st.W.toFixed(3), t: st.T.toFixed(3), b: st.FB.toFixed(3) }; },
    cols: [['m', 'الجسم'], ['l', 'السائل'], ['w', 'الوزن (N)'], ['t', 'قراءة الميزان'], ['b', 'FB (N)']],
    explain(S) { return Q26.ex('كلما غمرنا جزءاً أكبر من الجسم قلّت قراءة الميزان وانسكب ماء أكثر في الكأس.', 'السائل يدفع الجسم إلى الأعلى بقوة الطفو FB = ρ g V(المغمور)، وهي تساوي وزن السائل المزاح. فإذا كانت كثافة الجسم أصغر من كثافة السائل طفا قبل أن يُغمر كله.', 'السفن الحديدية تطفو لأن شكلها المجوف يزيح ماءً وزنه يساوي وزنها، والغواصة تغطس وتطفو بملء خزاناتها بالماء أو تفريغها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — الشد السطحي والخاصية الشعرية (الأشكال 11-3 إلى 14-3) =============== */
(() => {
  const D = { id: 'g10_f_surf', page: 39, fig: 'الأشكال 11-3 و 12-3 و 13-3 و 14-3',
    desc: 'الشد السطحي: سطح السائل يسلك سلوك غشاء مشدود نتيجة قوى التماسك بين جزيئاته، فيطفو عليه دبوس أو إبرة وتمشي عليه بعض الحشرات وتتخذ القطرات الشكل الكروي. الخاصية الشعرية: يرتفع الماء في الأنبوبة الشعرية لأن قوى التلاصق بين الماء والزجاج أكبر من قوى التماسك بين جزيئات الماء، أما الزئبق فينخفض لأن تماسكه أكبر من تلاصقه. ويزداد الارتفاع كلما ضاقت الأنبوبة.',
    tags: 'الشد السطحي قوى التماسك قوى التلاصق إبرة تطفو حشرات قطرات كروية الخاصية الشعرية أنبوبة شعرية ماء زئبق تقعر تحدب صابون',
    tools: ['إناء ماء', 'إبرة', 'صابون', 'أنابيب شعرية مختلفة الأقطار', 'زئبق'],
    steps: ['في «الإبرة» اسحب الإبرة وضعها برفق على سطح الماء: تطفو على «غشاء» السطح رغم أنها أكثف من الماء.', 'اضغط «أضف صابوناً»: يقل الشد السطحي فتغرق الإبرة.', 'في «الأنابيب الشعرية» اسحب المقبض لتغيير قطر الأنبوبة الوسطى: كلما ضاقت ارتفع الماء أكثر.', 'بدّل إلى الزئبق: ينخفض مستواه داخل الأنابيب وسطحه محدب.'],
    concl: ['الشد السطحي ناتج عن قوى التماسك بين جزيئات السائل، ويجعل السطح كغشاء مشدود.', 'الصابون يقلل الشد السطحي.', 'الماء يرتفع في الأنابيب الشعرية (التلاصق > التماسك) وسطحه مقعر؛ الزئبق ينخفض (التماسك > التلاصق) وسطحه محدب.', 'يزداد الارتفاع الشعري كلما قل نصف قطر الأنبوبة.', 'تطبيقات: صعود الماء والأملاح في التربة وجذور النبات، والفتيل في المدفأة النفطية.'],
    controls: [TG('mol', 'قوى بين الجزيئات', false, null, 'particles')],
    setup(S) { S.m = 'needle'; S.nx = 0; S.ny = 0; S.on = 0; S.soap = 0; S.sink = 0; S.r = .6; S.lq = 'w'; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), tx = L + 30, tw = ph ? w - L - 50 : 400, lvl = h * .45, bot = h * .45 + 150; return { w, h, ph, L, tx, tw, lvl, bot }; },
    update(S, dt) { if (S.on && S.soap) S.sink = Math.min(1, S.sink + dt * .7); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 12; Q43.bg(ctx, w, h);
      if (S.m === 'needle') { const col = S.soap ? 'rgba(186,230,253,.7)' : Q43.LIQ.w[2];
        Q43.tank(ctx, g.tx, g.lvl - 40, g.tw, g.bot, g.lvl, col);
        const onX = S.on ? S.nx : null, dip = S.on && !S.sink ? 6 : 0;
        if (S.on && !S.sink) K.raw(ctx, () => { ctx.fillStyle = col; ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 1.5; ctx.clearRect; ctx.beginPath(); ctx.moveTo(onX - 70, g.lvl); ctx.quadraticCurveTo(onX - 40, g.lvl, onX - 36, g.lvl + dip); ctx.lineTo(onX + 36, g.lvl + dip); ctx.quadraticCurveTo(onX + 40, g.lvl, onX + 70, g.lvl); ctx.stroke(); });
        const ny = S.on ? g.lvl + dip - 3 + S.sink * (g.bot - g.lvl - 10) : S.ny, nx = S.on ? S.nx : S.nx;
        K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(nx - 34, ny); ctx.lineTo(nx + 34, ny); ctx.stroke(); ctx.lineWidth = 1; ctx.strokeStyle = '#94a3b8'; ctx.beginPath(); ctx.ellipse(nx + 28, ny, 4, 2, 0, 0, TAU); ctx.stroke(); });
        if (S.on && !S.sink) { Q43.arrow(ctx, nx - 40, g.lvl + 18, 12, -10, '#0284c7', '', 2); Q43.arrow(ctx, nx + 40, g.lvl + 18, -12, -10, '#0284c7', '', 2); Q42.T(ctx, 'الإبرة تطفو بالشد السطحي', nx, g.lvl - 40, { s: fs, w: 900, c: '#fff', bg: '#0284c7' }); }
        if (S.sink >= 1) Q42.T(ctx, 'الصابون قلّل الشد السطحي فغرقت', g.tx + g.tw / 2, g.lvl - 40, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' });
        if (S.p.mol) for (let i = 0; i < 9; i++) { const x = g.tx + 30 + i * (g.tw - 60) / 8, y = g.lvl + 10; Q41.dot(ctx, x, y, '#0284c7', 5); Q41.dot(ctx, x, y + 50, '#0284c7', 5); }
        if (S.p.mol) Q42.T(ctx, 'جزيء السطح يُسحب إلى الجانبين والأسفل فقط', g.tx + g.tw / 2, g.lvl + 90, { s: 10.5, w: 800, c: '#0369a1' });
        // drops
        if (!g.ph) { Q42.T(ctx, 'قطرات كروية', g.tx + g.tw + 60, g.lvl - 60, { s: 10.5, w: 800, c: '#0369a1' }); [10, 16, 7].forEach((r, i) => K.raw(ctx, () => { const gr = ctx.createRadialGradient(g.tx + g.tw + 40 + i * 26 - r / 3, g.lvl - 30 - r / 3, 1, g.tx + g.tw + 40 + i * 26, g.lvl - 30, r); gr.addColorStop(0, '#fff'); gr.addColorStop(1, '#38bdf8'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.tx + g.tw + 40 + i * 26, g.lvl - 30, r, 0, TAU); ctx.fill(); })); }
      } else { const hg = S.lq === 'hg', Lq = Q43.LIQ[S.lq], rs = [1.2, S.r, .25], xs = [g.tx + 80, g.tx + 190, g.tx + 300], col = Lq[2];
        Q43.tank(ctx, g.tx, g.lvl - 30, g.tw, g.bot, g.lvl + 40, col);
        rs.forEach((r, i) => { const hh = (hg ? -1 : 1) * 14 / r, wd = r * 14, x = xs[i], top = g.lvl - 170, yl = g.lvl + 40 - hh;
          K.raw(ctx, () => { ctx.fillStyle = col; ctx.fillRect(x - wd / 2, Math.min(yl, g.lvl + 40), wd, g.bot - 10 - Math.min(yl, g.lvl + 40)); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x - wd / 2 - 3, top, 3, g.bot - 10 - top); ctx.fillRect(x + wd / 2, top, 3, g.bot - 10 - top);
            ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.strokeRect(x - wd / 2 - 3, top, wd + 6, g.bot - 10 - top);
            ctx.strokeStyle = hg ? '#334155' : '#0369a1'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - wd / 2, yl); ctx.quadraticCurveTo(x, yl + (hg ? -1 : 1) * Math.min(8, wd * .4), x + wd / 2, yl); ctx.stroke(); });
          Q42.T(ctx, (hg ? '−' : '+') + Math.abs(hh / 10).toFixed(1) + ' cm', x, top - 14, { s: 10, w: 900, c: hg ? '#475569' : '#0369a1' }); });
        Q41.knob(ctx, xs[1] + S.r * 7 + 10, g.lvl - 120, '#dc2626', 10);
        Q42.T(ctx, hg ? 'الزئبق ينخفض، وسطحه محدب: التماسك > التلاصق' : 'الماء يرتفع، وسطحه مقعر: التلاصق > التماسك', g.tx + g.tw / 2, g.bot + 22, { s: fs, w: 900, c: '#fff', bg: hg ? '#475569' : '#0284c7' });
        Q42.T(ctx, 'أنبوبة أضيق ⟸ ارتفاع أكبر', g.tx + g.tw / 2, g.bot + 48, { s: fs - 1, w: 800, c: '#334155' }); }
      if (!g.ph) Q42.card(ctx, S, S.m === 'needle' ? [{ t: 'قوى التماسك: بين جزيئات السائل نفسه', c: '#0369a1', w: 800 }, { t: 'جزيئات السطح تُسحب إلى الداخل فيتصرف السطح كغشاء مشدود', c: '#334155' }, { t: 'أمثلة: الإبرة تطفو، الحشرات تمشي على الماء، القطرات كروية', c: '#334155' }, { t: 'الصابون يقلل الشد السطحي', c: '#b91c1c', w: 800 }] : [{ t: 'قوى التلاصق: بين جزيئات السائل وجدار الأنبوبة', c: '#0369a1', w: 800 }, { t: 'الماء: التلاصق أكبر ⟸ يرتفع، سطح مقعر', c: '#334155' }, { t: 'الزئبق: التماسك أكبر ⟸ ينخفض، سطح محدب', c: '#334155' }, { t: 'تطبيقات: الماء في التربة، جذور النبات، فتيل المدفأة، ترشيح الكلية', c: '#7c3aed', w: 800 }], { title: S.m === 'needle' ? 'الشد السطحي' : 'الخاصية الشعرية', y: 70, wd: 300 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.x);
      Q42.banner(ctx, w, S.m === 'needle' ? 'اسحب الإبرة وضعها على سطح الماء' : 'اسحب المقبض الأحمر لتغيير قطر الأنبوبة');
    },
    chips(S, g) { return { m: Q42.chips(S, 'm', [['needle', 'الإبرة والشد السطحي'], ['cap', 'الأنابيب الشعرية']], g.h - 128, S.m, (S2, k) => { S2.m = k; }, { bw: 200 }), x: S.m === 'needle' ? Q42.chips(S, 'x', [['soap', '🧼 أضف صابوناً'], ['reset', 'ماء نظيف']], g.h - 84, S.soap ? 'soap' : '', (S2, k) => { if (k === 'soap') S2.soap = 1; else { S2.soap = 0; S2.sink = 0; S2.on = 0; S2.nx = g.tx + g.tw * .5; S2.ny = g.lvl - 90; } }, { bw: 180 }) : Q42.chips(S, 'x', [['w', 'ماء'], ['hg', 'زئبق']], g.h - 84, S.lq, (S2, k) => { S2.lq = k; }, { bw: 120 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); if (!S.nx) { S.nx = g.tx + g.tw * .5; S.ny = g.lvl - 90; }
      const L = S.m === 'needle' ? [{ id: 'needle', x: S.nx, y: S.on ? g.lvl : S.ny, w: 80, h: 30, axis: 'xy', keep: true, tip: 'اسحب الإبرة إلى سطح الماء', idle: 'اسحب ✋', drag: (S2, d) => { S2.on = 0; S2.sink = 0; S2.nx = clamp(d.x, g.tx + 40, g.tx + g.tw - 40); S2.ny = Math.min(d.y, g.lvl - 4); }, up: S2 => { if (S2.ny > g.lvl - 40) S2.on = 1; } }]
        : [{ id: 'rad', x: g.tx + 190 + S.r * 7 + 10, y: g.lvl - 120, r: 16, axis: 'x', keep: true, tip: 'اسحب لتغيير القطر', idle: 'اسحب ✋', drag: (S2, d) => { S2.r = clamp((d.x - g.tx - 200) / 7, .25, 1.6); } }];
      return L.concat(C.m, C.x); },
    readings(S) { return S.m === 'needle' ? [rd('الإبرة', S.on ? (S.sink >= 1 ? 'غرقت' : 'تطفو') : 'في اليد'), rd('الصابون', S.soap ? 'مضاف' : 'لا')] : [rd('السائل', Q43.LIQ[S.lq][0]), rd('نصف قطر الأنبوبة الوسطى', S.r.toFixed(2) + ' mm'), rd('التغير في المستوى', (S.lq === 'hg' ? '−' : '+') + (1.4 / S.r).toFixed(1) + ' cm')]; },
    explain(S) { return Q26.ex('الإبرة الفولاذية تطفو على الماء النظيف وتغرق بعد إضافة الصابون. والماء يرتفع في الأنابيب الضيقة بينما ينخفض الزئبق.', 'جزيئات السطح تسحبها جاراتها إلى الجوانب والداخل فقط، فيتصرف السطح كغشاء مشدود (الشد السطحي). وفي الأنبوبة الشعرية تجذب جزيئات الزجاج الماء أكثر مما تتجاذب جزيئاته (التلاصق > التماسك) فيرتفع.', 'المنشفة المبللة تمتص أسرع، والفتيل يرفع النفط في المدفأة، والنبات يرفع الماء من التربة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — المائع المثالي ومعادلة الاستمرارية + مقياس فنتوري (3-8، 3-9، 3-11، الشكلان 15-3 و 17-3) =============== */
(() => {
  const EX = { ex: { t: 'مثال ص 42', q: 'أنبوب نصف قطره 2.5 cm يجري فيه الماء بانطلاق 2 m/s ويتصل بأنبوب نصف قطره 1.5 cm. ما انطلاق الماء فيه؟', lines: ['A₁ v₁ = A₂ v₂', 'π r₁² v₁ = π r₂² v₂', 'v₂ = v₁ (r₁ / r₂)² = 2 × (2.5 / 1.5)²', 'v₂ ≈ 5.55 m/s'] }, ven: { t: 'مثال فنتوري ص 45', q: 'فرق ارتفاع الزئبق في مانوميتر مقياس فنتوري 0.075 m. ما فرق الضغط؟ (ρ = 13600 ، g = 9.8)', lines: ['P₁ − P₂ = ρ g h', '= 13600 × 9.8 × 0.075', '= 9.996×10³ Pa'] } };
  const D = { id: 'g10_f_cont', page: 41, fig: 'الشكلان 15-3 و 17-3 + مثال ص 42',
    desc: 'المائع المثالي: جريانه منتظم (انسيابي) وغير قابل للانضغاط وعديم اللزوجة وغير دوراني. معادلة الاستمرارية A₁v₁ = A₂v₂: كمية المائع الداخلة في وحدة الزمن تساوي الخارجة، فيزداد الانطلاق حيث يضيق الأنبوب. ومن معادلة برنولي P + ½ρv² + ρgh = ثابت يقل الضغط حيث يزداد الانطلاق، وهذا مبدأ مقياس فنتوري: P₁ − P₂ = ρ g h.',
    tags: 'المائع المثالي معادلة الاستمرارية A1v1=A2v2 برنولي مقياس فنتوري مانوميتر انطلاق ضغط أنبوب ضيق 5.55m/s',
    tools: ['أنبوب متغير المقطع', 'أنابيب قياس ضغط شاقولية', 'مانوميتر زئبقي'],
    steps: ['اسحب المقبض الأحمر لتضييق الجزء الأوسط من الأنبوب: تتسارع الجسيمات في الجزء الضيق.', 'لاحظ أنابيب الضغط الشاقولية: مستوى الماء فوق الجزء الضيق أقل (الضغط أقل).', 'اسحب مقبض الصنبور الأزرق لزيادة الانطلاق الداخل v₁.', 'اضغط «مثال الكتاب» أو «فنتوري» لحل المثالين خطوة خطوة.'],
    concl: ['A₁ v₁ = A₂ v₂ ⟸ في المقطع الضيق يكون الانطلاق أكبر.', 'برنولي: P + ½ρv² + ρgh = ثابت ⟸ حيث يزداد الانطلاق يقل الضغط.', 'مثال ص 42: v₂ ≈ 5.55 m/s.', 'مقياس فنتوري يقيس فرق الضغط P₁ − P₂ = ρ g h ومنه يُحسب الانطلاق.'],
    laws: ['g10_cont', 'g10_bern'],
    controls: [TG('ln', 'خطوط الجريان', true, null, 'lines')],
    setup(S) { S.r2 = 1.5; S.v1 = 2; S.ex = ''; S.k = 0; S.pp = []; for (let i = 0; i < 70; i++) S.pp.push({ x: Math.random(), y: Math.random() }); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), x0 = L + 10, x1 = ph ? w - 10 : w - 20, cy = ph ? h * .55 : h * .62, R1 = ph ? 34 : 46; return { w, h, ph, L, x0, x1, cy, R1, a: x0 + (x1 - x0) * .38, b: x0 + (x1 - x0) * .62 }; },
    rad(S, g, x) { const R2 = g.R1 * S.r2 / 2.5, t = x < g.a - 40 ? 0 : x < g.a ? (x - g.a + 40) / 40 : x < g.b ? 1 : x < g.b + 40 ? 1 - (x - g.b) / 40 : 0, s = t * t * (3 - 2 * t); return g.R1 + (R2 - g.R1) * s; },
    update(S, dt) { const g = D.geo(S); if (!S.W) return; S.pp.forEach(p => { const x = g.x0 + p.x * (g.x1 - g.x0), r = D.rad(S, g, x), v = S.v1 * (g.R1 / r) ** 2; p.x += v * dt * .05; if (p.x > 1) { p.x -= 1; p.y = Math.random(); } }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 12, v2 = S.v1 * (2.5 / S.r2) ** 2, rho = 1000, dP = .5 * rho * (v2 * v2 - S.v1 * S.v1), P1 = 30000, P2 = P1 - dP;
      Q43.bg(ctx, w, h);
      const top = [], bot = []; for (let x = g.x0; x <= g.x1; x += 4) { const r = D.rad(S, g, x); top.push([x, g.cy - r]); bot.push([x, g.cy + r]); }
      K.raw(ctx, () => { ctx.fillStyle = Q43.LIQ.w[2]; ctx.beginPath(); top.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); bot.slice().reverse().forEach(p => ctx.lineTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); top.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.beginPath(); bot.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); });
      if (S.p.ln) for (let k = -2; k <= 2; k++) Q41.line(ctx, top.map((p, i) => [p[0], g.cy + (bot[i][1] - g.cy) * k / 2.6]), 'rgba(2,132,199,.35)', 1.2);
      S.pp.forEach(p => { const x = g.x0 + p.x * (g.x1 - g.x0), r = D.rad(S, g, x); Q41.dot(ctx, x, g.cy + (p.y * 2 - 1) * (r - 6), '#0369a1', 3); });
      // pressure columns above wide and narrow parts
      const k = 1 / 400, xa = g.x0 + (g.a - g.x0) / 2, xb = (g.a + g.b) / 2, ha = P1 * k, hb = Math.max(4, P2 * k);
      [[xa, ha, 'P₁'], [xb, hb, 'P₂']].forEach(q => { const r = D.rad(S, g, q[0]); K.raw(ctx, () => { ctx.fillStyle = Q43.LIQ.w[2]; ctx.fillRect(q[0] - 6, g.cy - r - q[1], 12, q[1]); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.6; ctx.strokeRect(q[0] - 7, g.cy - r - 100, 14, 100); }); Q42.T(ctx, q[2], q[0] - 22, g.cy - r - q[1], { s: 12, w: 900, c: '#0369a1' }); });
      Q41.line(ctx, [[xa + 10, g.cy - D.rad(S, g, xa) - ha], [xb + 30, g.cy - D.rad(S, g, xa) - ha]], '#dc2626', 1.2, [4, 3]); if (ha - hb > 3) Q42.T(ctx, 'h', xb + 22, g.cy - D.rad(S, g, xa) - ha + (ha - hb) / 2 + 6, { s: 12, w: 900, c: '#dc2626' });
      Q42.T(ctx, 'v₁ = ' + S.v1.toFixed(2) + ' m/s', xa, g.cy + g.R1 + 22, { s: fs, w: 900, c: '#fff', bg: '#0369a1' }); Q42.T(ctx, 'v₂ = ' + v2.toFixed(2) + ' m/s', xb, g.cy + D.rad(S, g, xb) + 22, { s: fs, w: 900, c: '#fff', bg: '#dc2626' });
      Q42.T(ctx, 'r₁ = 2.5 cm', xa, g.cy + g.R1 + 46, { s: fs - 1, w: 800 }); Q42.T(ctx, 'r₂ = ' + S.r2.toFixed(2) + ' cm', xb, g.cy + D.rad(S, g, xb) + 46, { s: fs - 1, w: 800 });
      Q41.knob(ctx, xb, g.cy + D.rad(S, g, xb), '#dc2626', 10); Q41.knob(ctx, g.x0 + 18, g.cy - g.R1 - 18 - S.v1 * 8, '#2563eb', 10);
      const C = D.chips(S, g); C.forEach(b => { if (b._lab.indexOf('التالية') >= 0) b._col = '#be185d'; }); Q42.drawChips(ctx, C);
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: EX[S.ex].t }, EX[S.ex], { k: S.k }), { y: 70, x: w - 12, wd: g.ph ? w - 24 : 330 });
      else if (!g.ph) Q42.card(ctx, S, [{ t: 'A₁ v₁ = A₂ v₂', mono: 1, c: '#0f766e', w: 900 }, { t: 'v₂ = v₁ (r₁ / r₂)² = ' + v2.toFixed(2) + ' m/s', mono: 1 }, { t: 'برنولي: المجموع ثابت', c: '#7c3aed', w: 900 }, { t: 'P + ½ρv² + ρgh', mono: 1, c: '#7c3aed', w: 900 }, { t: 'P₁ − P₂ = ½ρ(v₂² − v₁²) = ' + Q42.sci(dP, 3, 'Pa'), mono: 1, c: '#b91c1c', w: 800 }, { t: 'المائع المثالي: منتظم، غير قابل للانضغاط، عديم اللزوجة، غير دوراني', c: '#64748b' }], { title: 'الاستمرارية وبرنولي', y: 70, wd: 330 });
      Q42.banner(ctx, w, 'اسحب المقبض الأحمر لتضييق الأنبوب، والأزرق للانطلاق');
    },
    chips(S, g) { return Q42.chips(S, 'ex', [['ex', 'مثال ص 42'], ['ven', 'فنتوري'], ['nx', '⬇ الخطوة التالية']], g.h - 84, S.ex, (S2, k) => { if (k === 'nx') { if (!S2.ex) S2.ex = 'ex'; S2.k = Math.min(S2.k + 1, EX[S2.ex].lines.length); } else { S2.ex = k; S2.k = 0; if (k === 'ex') { S2.r2 = 1.5; S2.v1 = 2; } } }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), xb = (g.a + g.b) / 2;
      return [{ id: 'neck', x: xb, y: g.cy + D.rad(S, g, xb), r: 18, axis: 'y', keep: true, tip: 'اسحب لتضييق الأنبوب', idle: 'اسحب ✋', drag: (S2, d) => { S2.r2 = clamp(Math.round((d.y - g.cy) / g.R1 * 2.5 * 20) / 20, .8, 2.5); } },
        { id: 'tap', x: g.x0 + 18, y: g.cy - g.R1 - 18 - S.v1 * 8, r: 16, axis: 'y', keep: true, hint: false, tip: 'اسحب لتغيير الانطلاق', drag: (S2, d) => { S2.v1 = clamp(Math.round((g.cy - g.R1 - 18 - d.y) / 8 * 4) / 4, .5, 4); } }].concat(D.chips(S, g)); },
    readings(S) { const v2 = S.v1 * (2.5 / S.r2) ** 2; return [rd('r₁ / r₂', '2.5 / ' + S.r2.toFixed(2) + ' cm'), rd('v₁', S.v1.toFixed(2) + ' m/s'), rd('v₂', v2.toFixed(2) + ' m/s'), rd('P₁ − P₂', Q42.sci(500 * (v2 * v2 - S.v1 * S.v1), 3, 'Pa'))]; },
    record(S) { return { r: S.r2, v1: S.v1, v2: +(S.v1 * (2.5 / S.r2) ** 2).toFixed(2) }; },
    cols: [['r', 'r₂ (cm)'], ['v1', 'v₁ (m/s)'], ['v2', 'v₂ (m/s)']],
    explain(S) { return Q26.ex('الماء يسرع في الجزء الضيق، وعمود الماء فوقه أقصر.', 'الماء لا ينضغط، فما يدخل في الثانية يجب أن يخرج: A₁v₁ = A₂v₂ ، فيزداد الانطلاق حيث تقل المساحة. ومن برنولي يقل الضغط حيث يزداد الانطلاق.', 'نضغط فوهة خرطوم الحديقة ليندفع الماء أبعد، ويقيس مقياس فنتوري سرعة الموائع في الأنابيب.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F2 — تطبيقات برنولي: جناح الطائرة والمرذاذ (الشكلان 18-3 و 19-3) =============== */
(() => {
  const D = { id: 'g10_f_bern', page: 45, fig: 'الشكلان 18-3 و 19-3',
    desc: 'المرذاذ: دفع تيار هواء سريع أمام فتحة الأنبوبة العمودية المغمور طرفها في السائل يقلل الضغط فوقها، فيرتفع السائل بفعل الضغط الجوي P₀ > P₁ ويتناثر رذاذاً. جناح الطائرة: شكله الانسيابي يجعل الهواء فوقه أسرع منه تحته، فيكون الضغط فوقه أقل، فتتولد قوة رفع إلى الأعلى.',
    tags: 'برنولي المرذاذ البخاخ جناح الطائرة قوة الرفع ضغط منخفض انطلاق عال الشكل الانسيابي',
    tools: ['مرذاذ بكرة مطاطية', 'نموذج جناح في نفق هوائي'],
    steps: ['في «الجناح» اسحب مقبض السرعة: خطوط الهواء فوق الجناح تتقارب وتسرع.', 'لاحظ أسهم الضغط: الضغط تحت الجناح أكبر، فتتولد قوة رفع، وعندما تزيد على الوزن ترتفع الطائرة.', 'في «المرذاذ» اسحب الكرة المطاطية (أو اضغط عليها): يندفع الهواء فوق الأنبوبة فيرتفع السائل ويتناثر.'],
    concl: ['حيث يزداد انطلاق الهواء يقل ضغطه (برنولي).', 'قوة الرفع على الجناح = فرق الضغط × مساحة الجناح.', 'في المرذاذ: P₀ > P₁ فيرتفع السائل في الأنبوبة.'],
    laws: ['g10_bern'],
    controls: [],
    setup(S) { S.m = 'wing'; S.v = 40; S.sq = 0; S.drops = []; S.ph = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), cx = L + (ph ? (w - L) / 2 : 230), cy = h * .45; return { w, h, ph, L, cx, cy }; },
    lift(S) { const v = S.v, vt = v * 1.25, dP = .5 * 1.2 * (vt * vt - v * v); return { dP, F: dP * 16, W: 9000 * 9.8 * 0 + 30000 }; },
    update(S, dt) { S.ph = (S.ph + dt * (S.m === 'wing' ? S.v / 30 : 1)) % 1000; if (S.m === 'spray') { S.sq = Math.max(0, S.sq - dt * 1.4); if (S.sq > .3) for (let i = 0; i < 3; i++) S.drops.push({ x: 0, y: 0, vx: 160 + Math.random() * 120, vy: (Math.random() - .5) * 60, t: 0 }); S.drops.forEach(d => { d.t += dt; d.x += d.vx * dt; d.y += d.vy * dt + 60 * dt * d.t; }); S.drops = S.drops.filter(d => d.t < 1.2); } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 12; Q43.bg(ctx, w, h);
      if (S.m === 'wing') { const ww = g.ph ? 200 : 260, L = D.lift(S), up = L.F > L.W, yw = g.cy - (up ? Math.min(40, (L.F - L.W) / 3000) : 0);
        // streamlines
        for (let k = -3; k <= 3; k++) { if (!k) continue; const pts = []; for (let x = g.cx - ww / 2 - 120; x <= g.cx + ww / 2 + 120; x += 6) { const t = (x - g.cx) / (ww / 2), bump = Math.abs(t) < 1 ? (k < 0 ? 30 : 8) * (1 - t * t) : 0; pts.push([x, yw + k * (k < 0 ? 16 : 22) - (k < 0 ? bump * (4 + k) / 3 : -bump * .2)]); } Q41.line(ctx, pts, k < 0 ? 'rgba(220,38,38,.6)' : 'rgba(2,132,199,.6)', 1.6);
          const n = 4; for (let j = 0; j < n; j++) { const f = ((S.ph * (k < 0 ? 1.25 : 1) * .5 + j / n) % 1), i = Math.floor(f * (pts.length - 1)); Q41.dot(ctx, pts[i][0], pts[i][1], k < 0 ? '#dc2626' : '#0284c7', 2.6); } }
        K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(g.cx - ww / 2, yw); ctx.bezierCurveTo(g.cx - ww / 2 + 20, yw - 40, g.cx + ww / 4, yw - 34, g.cx + ww / 2, yw + 4); ctx.bezierCurveTo(g.cx + ww / 4, yw + 8, g.cx - ww / 2 + 20, yw + 10, g.cx - ww / 2, yw); ctx.fill(); });
        Q42.T(ctx, 'انطلاق أكبر ⟸ ضغط أقل', g.cx, yw - 92, { s: fs, w: 900, c: '#dc2626' }); Q42.T(ctx, 'انطلاق أقل ⟸ ضغط أكبر', g.cx, yw + 88, { s: fs, w: 900, c: '#0284c7' });
        const fa = clamp(L.F / 1500, 14, 80); Q43.arrow(ctx, g.cx, yw - 10, 0, -fa, '#16a34a', 'قوة الرفع', 3.4); Q43.arrow(ctx, g.cx + 70, yw + 4, 0, 50, '#0f172a', 'الوزن', 3);
        if (up) Q42.T(ctx, 'قوة الرفع > الوزن ⟸ يرتفع', g.cx, g.cy + 130, { s: fs, w: 900, c: '#fff', bg: '#16a34a' });
        Q41.slider(ctx, g.cx - 150, g.cx + 150, g.h - 150, (S.v - 10) / 90, 'سرعة الهواء ' + S.v + ' m/s', '#2563eb');
        if (!g.ph) Q42.card(ctx, S, [{ t: 'تحت الجناح: v₁ = ' + S.v + ' m/s', c: '#0284c7', w: 800 }, { t: 'فوق الجناح: v₂ ≈ ' + (S.v * 1.25).toFixed(0) + ' m/s', c: '#dc2626', w: 800 }, { t: 'فرق الضغط = ' + L.dP.toFixed(0) + ' Pa' }, { t: 'قوة الرفع = ' + L.F.toFixed(0) + ' N', c: '#16a34a', w: 900 }, { t: 'F = ΔP × A', mono: 1, c: '#64748b' }, { t: 'وزن النموذج = ' + L.W + ' N', c: '#334155' }], { title: 'جناح الطائرة', y: 70, wd: 320 });
      } else { const bx = g.cx - 90, by = g.cy, jar = [g.cx + 10, g.cy + 20]; const r = 34 * (1 - S.sq * .35);
        K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.ellipse(bx, by, r * 1.15, r, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#7f1d1d'; ctx.fillRect(bx + r, by - 6, jar[0] - bx - r + 20, 12); });
        Q43.tank(ctx, jar[0], jar[1], 90, jar[1] + 110, jar[1] + 40, 'rgba(168,85,247,.5)');
        const lift = S.sq > .2 ? Math.min(1, S.sq) : 0; K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.strokeRect(jar[0] + 28, by - 4, 10, jar[1] + 100 - by); ctx.fillStyle = 'rgba(168,85,247,.6)'; const top = jar[1] + 40 - lift * (jar[1] + 40 - by); ctx.fillRect(jar[0] + 29, top, 8, jar[1] + 100 - top); });
        if (S.sq > .3) Q43.arrow(ctx, jar[0] - 20, by - 16, 60, 0, '#0ea5e9', 'هواء سريع', 2.4);
        S.drops.forEach(d => Q41.dot(ctx, jar[0] + 40 + d.x, by - 2 + d.y, '#a855f7', 2.5));
        Q43.arrow(ctx, jar[0] + 70, jar[1] - 30, 0, 50, '#0f766e', 'P₀', 2.6); Q42.T(ctx, 'P₁ < P₀', jar[0] + 33, by - 34, { s: fs, w: 900, c: '#dc2626' });
        Q42.T(ctx, 'اضغط الكرة المطاطية', bx, by + 56, { s: fs, w: 800, c: '#7f1d1d' });
        if (!g.ph) Q42.card(ctx, S, [{ t: 'يندفع هواء سريع فوق فتحة الأنبوبة', c: '#334155' }, { t: 'انطلاق أكبر ⟸ ضغط أقل P₁', c: '#dc2626', w: 800 }, { t: 'الضغط الجوي P₀ على سطح السائل أكبر', c: '#0f766e', w: 800 }, { t: 'P₀ > P₁ ⟸ يرتفع السائل ويتناثر رذاذاً', c: '#7c3aed', w: 900 }], { title: 'المرذاذ', y: 70, wd: 320 }); }
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, S.m === 'wing' ? 'اسحب مقبض سرعة الهواء' : 'اضغط الكرة المطاطية الحمراء');
    },
    chips(S, g) { return Q42.chips(S, 'm', [['wing', '✈ جناح الطائرة'], ['spray', 'المرذاذ']], g.h - 84, S.m, (S2, k) => { S2.m = k; }, { bw: 180 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      const L = S.m === 'wing' ? [Q41.sdrag('spd', g.cx - 150, g.cx + 150, g.h - 150, (S.v - 10) / 90, (S2, t) => { S2.v = Math.round(10 + t * 90); }, { tip: 'اسحب لتغيير السرعة', extra: { idle: 'اسحب ✋' } })]
        : [{ id: 'bulb', x: g.cx - 90, y: g.cy, r: 36, axis: 'x', keep: false, tip: 'اسحب أو اضغط الكرة', idle: 'اضغط ✋', drag: S2 => { S2.sq = 1.2; }, click: S2 => { S2.sq = 1.2; } }];
      return L.concat(D.chips(S, g)); },
    readings(S) { if (S.m === 'wing') { const L = D.lift(S); return [rd('سرعة الهواء', S.v + ' m/s'), rd('فرق الضغط', L.dP.toFixed(0) + ' Pa'), rd('قوة الرفع', L.F.toFixed(0) + ' N'), rd('الحالة', L.F > L.W ? 'ترتفع' : 'لا ترتفع')]; } return [rd('المرذاذ', S.sq > .3 ? 'يرذّ' : 'متوقف')]; },
    explain(S) { return Q26.ex('كلما زادت سرعة الهواء زادت قوة الرفع على الجناح، والمرذاذ يرفع السائل عند ضغط الكرة.', 'معادلة برنولي: P + ½ρv² ثابت تقريباً، فحيث يزداد الانطلاق يقل الضغط. فوق الجناح الهواء أسرع فالضغط أقل، والفرق يدفع الجناح إلى الأعلى. وفوق أنبوبة المرذاذ يقل الضغط فيدفع الضغط الجوي السائل إلى الأعلى.', 'تطير الأسقف المعدنية في العواصف لأن الهواء السريع فوقها يقلل الضغط، والقطار السريع يسحب الأشياء القريبة نحوه.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F3 — اللزوجة: الكرات الساقطة في موائع مختلفة (الشكل 20-3) =============== */
(() => {
  const FL = [['w', 'ماء', 1, 'rgba(56,189,248,.45)'], ['oil', 'زيت', 25, 'rgba(250,204,21,.55)'], ['gly', 'كليسرين', 120, 'rgba(226,232,240,.75)'], ['hon', 'عسل', 400, 'rgba(217,119,6,.6)']];
  const D = { id: 'g10_f_visc', page: 46, fig: 'الشكل 20-3',
    desc: 'اللزوجة مقياس لمقاومة المائع للجريان (الاحتكاك الداخلي بين طبقاته). العسل لزوجته كبيرة فيجري ببطء والماء لزوجته صغيرة. الكرة تسقط ببطء أكبر في المائع الأكثر لزوجة. لزوجة السوائل تقل بارتفاع درجة الحرارة، أما لزوجة الغازات فتزداد.',
    tags: 'اللزوجة الاحتكاك الداخلي عسل ماء زيت كليسرين كرات ساقطة درجة الحرارة زيت المحرك شتاء صيف',
    tools: ['أربع أسطوانات مدرجة', 'ماء وزيت وكليسرين وعسل', 'كرات فولاذية متماثلة', 'مصدر حرارة'],
    steps: ['اضغط «أسقط الكرات» واراقب: أي الكرات تصل القاع أولاً؟', 'اسحب مقبض الحرارة لتسخين السوائل ثم أعد إسقاط الكرات: تقل اللزوجة فتسرع الكرات.', 'فكّر: أي زيت محرك تستعمل شتاءً وأيّ صيفاً؟'],
    concl: ['الكرة تسقط أبطأ في المائع الأكثر لزوجة.', 'لزوجة السوائل تقل بارتفاع درجة الحرارة، ولزوجة الغازات تزداد.', 'في الشتاء نستعمل زيتاً أقل لزوجة كي يجري في المحرك البارد، وفي الصيف زيتاً أعلى لزوجة لأن الحرارة تقلل لزوجته.'],
    controls: [],
    setup(S) { S.T = 20; S.y = [0, 0, 0, 0]; S.go = 0; S.tt = [0, 0, 0, 0]; S.time = 0; },
    eta(S, i) { return FL[i][2] * Math.exp(-(S.T - 20) / 30); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S), x0 = L + 50, sp = ph ? (w - L - 60) / 4 : 100, top = 110, bot = h - 220; return { w, h, ph, L, x0, sp, top, bot }; },
    update(S, dt) { if (!S.go) return; S.time += dt; const g = D.geo(S); for (let i = 0; i < 4; i++) { if (S.y[i] >= 1) continue; const v = .9 / Math.max(.35, Math.sqrt(D.eta(S, i))); S.y[i] = Math.min(1, S.y[i] + v * dt); if (S.y[i] >= 1) S.tt[i] = S.time; } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 9.5 : 11.5; Q43.bg(ctx, w, h);
      FL.forEach((f, i) => { const x = g.x0 + i * g.sp, tw = Math.min(64, g.sp - 16); Q43.tank(ctx, x - tw / 2, g.top - 20, tw, g.bot, g.top, f[3]); const by = g.top + 10 + S.y[i] * (g.bot - g.top - 22);
        K.raw(ctx, () => { const gr = ctx.createRadialGradient(x - 3, by - 3, 1, x, by, 9); gr.addColorStop(0, '#fff'); gr.addColorStop(1, '#334155'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, by, 9, 0, TAU); ctx.fill(); });
        Q42.T(ctx, f[1], x, g.bot + 18, { s: fs, w: 900, c: '#0f172a' }); Q42.T(ctx, S.tt[i] ? S.tt[i].toFixed(2) + ' s' : '…', x, g.bot + 38, { s: fs, w: 900, c: '#fff', bg: S.tt[i] ? '#16a34a' : '#94a3b8' }); });
      const tx0 = g.x0 - 20, tx1 = g.x0 + 3 * g.sp + 20; Q41.slider(ctx, tx0, tx1, g.h - 150, (S.T - 0) / 80, 'درجة الحرارة ' + S.T + ' °C', '#ea580c');
      if (!g.ph) Q42.card(ctx, S, FL.map((f, i) => ({ t: f[1] + ': لزوجة نسبية ' + D.eta(S, i).toFixed(1), c: '#334155', w: 800 })).concat([{ t: 'لزوجة السوائل تقل بالتسخين', c: '#ea580c', w: 900 }, { t: 'لزوجة الغازات تزداد بالتسخين', c: '#64748b' }, { t: 'فكّر: زيت المحرك الشتوي أقل لزوجة من الصيفي', c: '#7c3aed', w: 800 }]), { title: 'اللزوجة: مقاومة الجريان', y: 70, wd: 300 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, 'اضغط «أسقط الكرات»، واسحب مقبض الحرارة');
    },
    chips(S, g) { return Q42.chips(S, 'go', [['go', '▶ أسقط الكرات'], ['re', '↺ أعد']], g.h - 84, '', (S2, k) => { S2.y = [0, 0, 0, 0]; S2.tt = [0, 0, 0, 0]; S2.time = 0; S2.go = k === 'go' ? 1 : 0; }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), tx0 = g.x0 - 20, tx1 = g.x0 + 3 * g.sp + 20; return [Q41.sdrag('temp', tx0, tx1, g.h - 150, S.T / 80, (S2, t) => { S2.T = Math.round(t * 80); }, { tip: 'اسحب لتغيير درجة الحرارة', extra: { idle: 'اسحب ✋' } })].concat(D.chips(S, g)); },
    readings(S) { return [rd('درجة الحرارة', S.T + ' °C')].concat(FL.map((f, i) => rd('زمن السقوط في ' + f[1], S.tt[i] ? S.tt[i].toFixed(2) + ' s' : '—'))); },
    record(S) { return { T: S.T, a: S.tt[0].toFixed(2), b: S.tt[1].toFixed(2), c: S.tt[2].toFixed(2), d: S.tt[3].toFixed(2) }; },
    cols: [['T', 'T (°C)'], ['a', 'ماء (s)'], ['b', 'زيت (s)'], ['c', 'كليسرين (s)'], ['d', 'عسل (s)']],
    explain(S) { return Q26.ex('الكرة في الماء تصل القاع أولاً، وفي العسل آخراً، وكلها تسرع عند التسخين.', 'اللزوجة احتكاك داخلي بين طبقات المائع يقاوم الحركة فيه. وتسخين السائل يضعف قوى التماسك بين جزيئاته فتقل لزوجته.', 'نسخّن العسل ليسهل صبّه، ونختار زيت المحرك حسب الفصل.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G1 — مسائل الفصل وأسئلة «علل» على الجهاز (ص 48–51) =============== */
(() => {
  const PB = {
    p1: { t: 'م1 الحوض', q: 'حوض أسماك أبعاد قاعدته 20 m × 12 m وعمق الماء فيه 5 m. احسب الضغط والقوة على قاعدته (g = 9.8)', lines: ['P = ρ g h = 1000 × 9.8 × 5', 'P = 49000 N/m²', 'F = P × A = 49000 × 20 × 12', 'F = 1176×10⁴ N'], sc: 'tank', h: 5 },
    p2: { t: 'م2 المرواز', q: 'ارتفاع عمود الزئبق في مرواز 75 cm. احسب الضغط الجوي (ρ = 13600 ، g = 9.8)', lines: ['P₀ = ρ g h', '= 13600 × 9.8 × 0.75', 'P₀ = 99960 Pa'], sc: 'baro', h: 75 },
    p3: { t: 'م3 المكبس', q: 'النسبة بين مساحتي مكبسين 50 والقوة على الكبير 6000 N. ما القوة على الصغير؟', lines: ['F₁ / A₁ = F₂ / A₂', 'F₁ = 6000 / 50', 'F₁ = 120 N'], sc: 'press' },
    p4: { t: 'م4 الطافي', q: 'شخص وزنه 600 N يطفو في الماء مغموراً كلياً تقريباً. ما حجمه؟ (g = 10)', lines: ['الجسم الطافي: FB = W', 'ρ g V = 600', 'V = 600 / (1000 × 10)', 'V = 0.06 m³'], sc: 'float' },
    p5: { t: 'م5 الميزان', q: 'جسم يزن 20 N في الهواء و 15 N في الماء. ما حجمه؟ (g = 10)', lines: ['FB = 20 − 15 = 5 N', 'V = FB / (ρ g) = 5 / 10000', 'V = 5×10⁻⁴ m³'], sc: 'bal' },
    p6: { t: 'م6 الأنبوب', q: 'يجري الماء في أنبوب بانطلاق 1.2 m/s ثم 6 m/s في الجزء الضيق. ما النسبة بين القطرين؟', lines: ['A₁ v₁ = A₂ v₂ ⟸ A₁ / A₂ = 6 / 1.2 = 5', 'A ∝ d² ⟸ (d₁ / d₂)² = 5', 'd₁ / d₂ = √5 ≈ 2.24', '(النسبة بين المساحتين 5)'], sc: 'pipe' },
    w1: { t: 'علل: الشفرة', q: 'علل: تطفو شفرة الحلاقة على سطح الماء رغم أن كثافتها أكبر منه', lines: ['بسبب الشد السطحي', 'سطح الماء يتصرف كغشاء مشدود بقوى التماسك', 'وزن الشفرة الصغير لا يكفي لتمزيقه'], sc: 'blade' },
    w2: { t: 'علل: السقف', q: 'علل: تطير الأسقف المصنوعة من الألمنيوم في العواصف', lines: ['الهواء فوق السقف سريع جداً', 'برنولي: الانطلاق الكبير ⟸ ضغط قليل', 'الضغط تحت السقف أكبر فيدفعه إلى الأعلى'], sc: 'roof' },
    w3: { t: 'علل: السبّاح', q: 'علل: يخف ألم قدمي السبّاح الحافي على الحصى كلما تقدم إلى عمق أكبر', lines: ['كلما زاد الجزء المغمور زادت قوة الطفو', 'قوة الطفو تقلل الوزن الظاهري', 'فتقل القوة التي يضغط بها على الحصى'], sc: 'swim' } };
  const KEYS = Object.keys(PB);
  const D = { id: 'g10_f_problems', page: 48, fig: 'الأسئلة والمسائل ص 48–51',
    desc: 'مسائل الفصل الثالث على الجهاز: ضغط الماء على قاعدة حوض، المرواز، المكبس الهيدروليكي، الجسم الطافي، الميزان الحلزوني، ومعادلة الاستمرارية، مع أسئلة «علل» من الكتاب.',
    tags: 'مسائل الفصل الثالث ضغط حوض مرواز 75cm مكبس 120N طفو 0.06 ميزان 5×10⁻⁴ أنبوب √5 علل شفرة سقف سباح',
    tools: ['الأجهزة المرسومة لكل مسألة'],
    steps: ['اختر مسألة أو سؤال «علل» من الأزرار.', 'اضغط «الخطوة التالية» لكشف الحل خطوة خطوة، وقارن بجوابك.'],
    concl: ['م1: P = 49000 N/m² ، F = 1176×10⁴ N.', 'م2: P₀ = 99960 Pa. م3: F₁ = 120 N.', 'م4: V = 0.06 m³. م5: V = 5×10⁻⁴ m³.', 'م6: نسبة القطرين √5 (ونسبة المساحتين 5).'],
    laws: ['g10_liqp', 'g10_pascal', 'g10_arch', 'g10_cont'],
    controls: [],
    setup(S) { S.pb = 'p1'; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q42.L(S); return { w, h, ph, L, cx: L + (ph ? (w - L) / 2 : 200), cy: h * .42 }; },
    scene(ctx, S, g) { const P = PB[S.pb], cx = g.cx, cy = g.cy, fs = 11;
      if (P.sc === 'tank') { Q43.tank(ctx, cx - 140, cy - 80, 280, cy + 80, cy - 50, Q43.LIQ.w[2]); Q42.T(ctx, '20 m × 12 m', cx, cy + 100, { s: fs, w: 900 }); Q41.line(ctx, [[cx + 160, cy - 50], [cx + 160, cy + 80]], '#dc2626', 2); Q42.T(ctx, 'h = 5 m', cx + 170, cy + 15, { s: fs, w: 900, c: '#dc2626', a: 'left' }); for (let i = -2; i <= 2; i++) Q43.arrow(ctx, cx + i * 50, cy + 30, 0, 40, '#7c3aed', '', 2.4); }
      else if (P.sc === 'baro') { Q43.tank(ctx, cx - 70, cy + 50, 140, cy + 90, cy + 60, Q43.LIQ.hg[2]); K.raw(ctx, () => { ctx.fillStyle = Q43.LIQ.hg[2]; ctx.fillRect(cx - 6, cy - 110, 12, 180); ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.strokeRect(cx - 8, cy - 150, 16, 220); }); Q41.line(ctx, [[cx + 30, cy + 60], [cx + 30, cy - 110]], '#dc2626', 2); Q42.T(ctx, '75 cm', cx + 40, cy - 25, { s: fs, w: 900, c: '#dc2626', a: 'left' }); }
      else if (P.sc === 'press') { K.raw(ctx, () => { ctx.fillStyle = 'rgba(234,179,8,.65)'; ctx.fillRect(cx - 120, cy - 20, 24, 100); ctx.fillRect(cx - 120, cy + 60, 260, 20); ctx.fillRect(cx + 20, cy - 20, 120, 100); ctx.fillStyle = '#475569'; ctx.fillRect(cx - 120, cy - 30, 24, 10); ctx.fillRect(cx + 20, cy - 30, 120, 10); }); Q43.arrow(ctx, cx - 108, cy - 90, 0, 50, '#dc2626', 'F₁ ؟', 3); Q43.arrow(ctx, cx + 80, cy - 40, 0, -50, '#16a34a', '6000 N', 3); Q42.T(ctx, 'A₂ / A₁ = 50', cx, cy + 110, { s: fs + 1, w: 900 }); }
      else if (P.sc === 'float' || P.sc === 'swim') { Q43.tank(ctx, cx - 160, cy - 60, 320, cy + 90, cy - 20, Q43.LIQ.w[2]); K.raw(ctx, () => { ctx.fillStyle = '#f59e0b'; if (P.sc === 'float') { ctx.beginPath(); ctx.ellipse(cx, cy - 14, 60, 12, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(cx - 70, cy - 22, 11, 0, TAU); ctx.fill(); } else { [[-110, -40], [0, -10], [100, 20]].forEach(q => { ctx.beginPath(); ctx.arc(cx + q[0], cy + q[1] - 50, 9, 0, TAU); ctx.fill(); ctx.fillRect(cx + q[0] - 6, cy + q[1] - 40, 12, 50); }); ctx.fillStyle = '#78716c'; for (let i = 0; i < 20; i++) { ctx.beginPath(); ctx.arc(cx - 150 + i * 16, cy + 84, 5, 0, TAU); ctx.fill(); } } });
        if (P.sc === 'float') { Q43.arrow(ctx, cx + 20, cy, 0, -50, '#0284c7', 'FB', 3); Q43.arrow(ctx, cx - 20, cy - 10, 0, 50, '#0f172a', '600 N', 3); } else Q42.T(ctx, 'أعمق ⟸ طفو أكبر ⟸ ألم أقل', cx, cy + 112, { s: fs, w: 900, c: '#fff', bg: '#0284c7' }); }
      else if (P.sc === 'bal') { [[cx - 90, 20, 'هواء'], [cx + 90, 15, 'ماء']].forEach((q, i) => { K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#334155'; rr(ctx, q[0] - 16, cy - 140, 32, 80, 6); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(q[0], cy - 60); ctx.lineTo(q[0], cy - 10); ctx.stroke(); }); if (i) Q43.tank(ctx, q[0] - 50, cy - 20, 100, cy + 70, cy - 4, Q43.LIQ.w[2]); Q42.box(ctx, q[0] - 18, cy - 10, 36, 36, 8, '#64748b'); Q42.T(ctx, q[1] + ' N', q[0], cy - 160, { s: 13, w: 900, c: '#fff', bg: '#dc2626' }); Q42.T(ctx, q[2], q[0], cy + 90, { s: fs, w: 800 }); }); }
      else if (P.sc === 'pipe') { K.raw(ctx, () => { ctx.fillStyle = Q43.LIQ.w[2]; ctx.beginPath(); ctx.moveTo(cx - 170, cy - 45); ctx.lineTo(cx - 30, cy - 45); ctx.lineTo(cx + 10, cy - 20); ctx.lineTo(cx + 170, cy - 20); ctx.lineTo(cx + 170, cy + 20); ctx.lineTo(cx + 10, cy + 20); ctx.lineTo(cx - 30, cy + 45); ctx.lineTo(cx - 170, cy + 45); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 2.5; ctx.stroke(); }); Q42.T(ctx, '1.2 m/s', cx - 100, cy, { s: 12, w: 900, c: '#0369a1' }); Q42.T(ctx, '6 m/s', cx + 100, cy, { s: 12, w: 900, c: '#dc2626' }); }
      else if (P.sc === 'blade') { Q43.tank(ctx, cx - 140, cy - 40, 280, cy + 80, cy, Q43.LIQ.w[2]); K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; ctx.fillRect(cx - 40, cy - 5, 80, 5); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx - 80, cy); ctx.quadraticCurveTo(cx - 45, cy, cx - 40, cy + 3); ctx.moveTo(cx + 80, cy); ctx.quadraticCurveTo(cx + 45, cy, cx + 40, cy + 3); ctx.stroke(); }); }
      else if (P.sc === 'roof') { K.raw(ctx, () => { ctx.fillStyle = '#e7e5e4'; ctx.fillRect(cx - 100, cy, 200, 90); ctx.fillStyle = '#94a3b8'; ctx.save(); ctx.translate(cx, cy - 14); ctx.rotate(-.08); ctx.fillRect(-120, -6, 240, 10); ctx.restore(); }); for (let k = 0; k < 3; k++) Q43.arrow(ctx, cx - 160, cy - 50 - k * 16, 300, 0, '#dc2626', k ? '' : 'ريح سريعة', 2); Q43.arrow(ctx, cx, cy + 40, 0, -40, '#16a34a', 'P أكبر', 3); } },
    draw(ctx, w, h, S) { const g = D.geo(S), P = PB[S.pb]; Q43.bg(ctx, w, h); D.scene(ctx, S, g);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.b); C.n._lab = '⬇ الخطوة التالية'; C.n._col = '#be185d'; Q42.drawChips(ctx, [C.n]);
      Q42.steps(ctx, S, { title: P.t, q: P.q, lines: P.lines, k: S.k }, { y: 70, x: w - 12, wd: g.ph ? w - 24 : 330 });
      Q42.banner(ctx, w, 'اختر مسألة ثم اضغط «الخطوة التالية»'); },
    chips(S, g) { const f = (S2, k) => { S2.pb = k; S2.k = 0; }; return { a: Q42.chips(S, 'pa', KEYS.slice(0, 6).map(k => [k, PB[k].t]), g.h - 172, S.pb, f, { bw: 120 }), b: Q42.chips(S, 'pb', KEYS.slice(6).map(k => [k, PB[k].t]), g.h - 128, S.pb, f, { bw: 140 }), n: Q42.btn('nx', { x: g.L + 90, y: g.h - 84, w: 170, h: 34 }, S2 => { S2.k = Math.min(S2.k + 1, PB[S2.pb].lines.length); }, { tip: 'الخطوة التالية' }) }; },
    drags(S) { if (!S.W) return []; const C = D.chips(S, D.geo(S)); return C.a.concat(C.b, [C.n]); },
    readings(S) { return [rd('السؤال', PB[S.pb].t), rd('الخطوات', S.k + ' / ' + PB[S.pb].lines.length)]; },
    explain(S) { return Q26.ex('كل مسألة تُحل بقانون واحد من قوانين الفصل.', 'الضغط ρgh ، باسكال F₁/A₁ = F₂/A₂ ، أرخميدس FB = ρgV ، الاستمرارية A₁v₁ = A₂v₂ ، وبرنولي للضغط والانطلاق.', 'المهندسون يستعملون هذه القوانين في تصميم السدود والسفن والرافعات وشبكات الماء.'); }
  };
  M8.P[D.id] = D;
})();

/* laws */
LW({ id: 'g10_pressure', cat: 43, name: 'الضغط', fx: '<i>P</i> = ' + FR('<i>F</i>', '<i>A</i>'), sym: 'الضغط مقدار القوة المؤثرة عمودياً على وحدة المساحة، ووحدته N/m² وتسمى باسكال Pa', calc: { in: [['F', 'القوة F', 'N', 20], ['A', 'المساحة A', 'm²', .005]], out: 'الضغط P', u: 'Pa', f: v => v.F / v.A } });
LW({ id: 'g10_liqp', cat: 43, name: 'ضغط السائل', fx: '<i>P</i> = <i>P</i><sub>o</sub> + <i>ρ</i> <i>g</i> <i>h</i>', sym: 'ضغط السائل عند عمق h يساوي الكثافة × التعجيل الأرضي × العمق، ويضاف إليه الضغط الجوي في الوعاء المفتوح. يؤثر في جميع الاتجاهات', calc: { in: [['r', 'الكثافة ρ', 'kg/m³', 1000], ['g', 'التعجيل g', 'm/s²', 9.8], ['h', 'العمق h', 'm', 20]], out: 'ضغط السائل ρgh', u: 'Pa', f: v => v.r * v.g * v.h } });
LW({ id: 'g10_pascal', cat: 43, name: 'قاعدة باسكال', fx: FR('<i>F</i><sub>1</sub>', '<i>A</i><sub>1</sub>') + ' = ' + FR('<i>F</i><sub>2</sub>', '<i>A</i><sub>2</sub>'), sym: 'الضغط المسلط على سائل محصور ينتقل بالتساوي إلى جميع أجزاء السائل وجدران الإناء. المكبس الهيدروليكي يضاعف القوة بنسبة المساحتين', calc: { in: [['F2', 'القوة على المكبس الكبير F₂', 'N', 30000], ['A1', 'مساحة المكبس الصغير A₁', 'cm²', 15], ['A2', 'مساحة المكبس الكبير A₂', 'cm²', 2000]], out: 'القوة على المكبس الصغير F₁', u: 'N', f: v => v.F2 * v.A1 / v.A2 } });
LW({ id: 'g10_arch', cat: 43, name: 'قاعدة أرخميدس', fx: '<i>F</i><sub>B</sub> = <i>ρ</i> <i>g</i> <i>V</i>', sym: 'إذا غمر جسم جزئياً أو كلياً في مائع فإنه يفقد من وزنه بقدر وزن المائع المزاح. الوزن في الهواء − الوزن في السائل = V ρ g', calc: { in: [['r', 'كثافة السائل ρ', 'kg/m³', 1000], ['g', 'التعجيل g', 'm/s²', 10], ['V', 'حجم الجزء المغمور V', 'm³', 4.5e-5]], out: 'قوة الطفو FB', u: 'N', f: v => v.r * v.g * v.V } });
LW({ id: 'g10_cont', cat: 43, name: 'معادلة الاستمرارية', fx: '<i>A</i><sub>1</sub> <i>v</i><sub>1</sub> = <i>A</i><sub>2</sub> <i>v</i><sub>2</sub>', sym: 'للمائع المثالي: كمية المائع المارة في وحدة الزمن ثابتة، فيزداد الانطلاق حيث تقل مساحة المقطع', calc: { in: [['r1', 'نصف القطر الأول r₁', 'cm', 2.5], ['v1', 'الانطلاق v₁', 'm/s', 2], ['r2', 'نصف القطر الثاني r₂', 'cm', 1.5]], out: 'الانطلاق v₂', u: 'm/s', f: v => v.v1 * (v.r1 / v.r2) ** 2 } });
LW({ id: 'g10_bern', cat: 43, name: 'معادلة برنولي', fx: '<i>P</i> + ½ <i>ρ</i> <i>v</i>² + <i>ρ</i> <i>g</i> <i>h</i> = ثابت', sym: 'مجموع الضغط وطاقة الحركة لوحدة الحجم وطاقة الموقع لوحدة الحجم ثابت على طول خط الجريان، وهي تطبيق لقانون حفظ الطاقة. حيث يزداد الانطلاق يقل الضغط. مقياس فنتوري: P₁ − P₂ = ρ g h', calc: { in: [['r', 'كثافة الزئبق ρ', 'kg/m³', 13600], ['g', 'g', 'm/s²', 9.8], ['h', 'فرق الارتفاع h', 'm', .075]], out: 'فرق الضغط P₁ − P₂', u: 'Pa', f: v => v.r * v.g * v.h } });

/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g10_f_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g10_f_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g10_fl_press', ch: 43, reg: X10, sec: '3-1 المائع + 3-2 الضغط', page: 28, kind: 'نشاط',
  title: 'الضغط وضغط السائل: P = F / A و P = P₀ + ρgh',
  desc: 'المائع مادة تجري ولا تتخذ شكلاً ثابتاً (السوائل والغازات). نقلب طابوقة على الإسفنج لنرى أن الضغط = القوة ÷ المساحة، ثم ننزل مجس ضغط في حوض لنرى أن ضغط السائل يزداد مع العمق والكثافة ويؤثر في جميع الاتجاهات، ونحل مثال الغواص.',
  tags: 'المائع الضغط باسكال ضغط السائل العمق',
  fact: ['الزئبق فلز سائل في درجة حرارة الغرفة (هل تعلم ص 28).', 'المائع يشمل السوائل والغازات، ويستفاد من خواصه في طيران الطائرات وغوص الغواصات (ص 28).', 'للسائل صفتان مهمتان: عدم قابليته للانضغاط وسهولة انزلاق جزيئاته، لذا يؤثر ضغطه في جميع الاتجاهات (تذكر ص 30).'],
  quiz: [
    { q: 'حوض سباحة عمقه 5 m مملوء بالماء. ضغط الماء على قاعدته (g = 9.8):', o: ['49×10³ N/m²', '5×10³ N/m²', '98×10³ N/m²', '4.9×10³ N/m²'], a: 0, why: 'س ص 49: P = 1000 × 9.8 × 5 = 49000 N/m².' },
    { q: 'وحدة الضغط N/m² تسمى:', o: ['الباسكال', 'النيوتن', 'الجول', 'الواط'], a: 0, why: 'ص 29: 1 Pa = 1 N/m².' },
    { q: 'وعاءان مختلفا الشكل فيهما الماء إلى الارتفاع نفسه. الضغط عند قاعدتيهما:', o: ['متساوٍ لأن ضغط السائل يعتمد على العمق فقط', 'أكبر في الوعاء الأوسع', 'أكبر في الوعاء الأضيق'], a: 0, why: 'P = ρgh لا يعتمد على شكل الإناء.' },
    { q: 'ضغط الماء على غواص على عمق 20 m (ρ = 1000 ، g = 9.8):', o: ['196000 N/m²', '19600 N/m²', '2000 N/m²'], a: 0, why: 'مثال ص 31.' }],
  parts: [{ id: 'g10_f_press', n: 'الضغط P = F / A: الطابوقة على الإسفنج' }, { id: 'g10_f_depth', n: 'ضغط السائل مع العمق وفي جميع الاتجاهات + مثال الغواص' }] });
M8.merge({ id: 'g10_fl_atm', ch: 43, reg: X10, sec: '3-3 قياس الضغط الجوي', page: 31, kind: 'نشاط',
  title: 'الضغط الجوي: مرواز تورشلي وعمود الماء المكافئ',
  desc: 'نميل أنبوبة مرواز تورشلي ونرى أن الارتفاع الشاقولي للزئبق ثابت 76 cm، ونصعد إلى أماكن أعلى فينخفض العمود، ونحسب طول عمود الماء المكافئ 10.33 m.',
  tags: 'الضغط الجوي مرواز تورشلي زئبق',
  fact: ['جهاز قياس ضغط الدم مانوميتر زئبقي: الضغط الانقباضي حوالي 120 mmHg والانبساطي حوالي 80 mmHg للشخص الطبيعي (ص 32).', 'الضغط الجوي يعادل ارتفاع عمود زئبق 76 cm عند سطح البحر وبدرجة صفر سيليزي، ويتغير بتغير الارتفاع عن سطح البحر (هل تعلم ص 32).'],
  quiz: [
    { q: 'الارتفاع الشاقولي لعمود الزئبق في المرواز عند إمالة الأنبوبة:', o: ['يبقى ثابتاً', 'يزداد', 'يقل'], a: 0, why: 'الضغط يعتمد على الارتفاع الشاقولي فقط.' },
    { q: 'طول عمود الماء الذي يعادل الضغط الجوي (76 cm زئبق):', o: ['10.33 m', '0.76 m', '1.36 m', '76 m'], a: 0, why: 'مثال ص 32: hw = 13.6 × 0.76.' },
    { q: 'ارتفاع عمود الزئبق في مرواز 75 cm. الضغط الجوي (ρ = 13600 ، g = 9.8):', o: ['99960 Pa', '101300 Pa', '7500 Pa'], a: 0, why: 'مسألة ص 51.' }],
  parts: [{ id: 'g10_f_baro', n: 'مرواز تورشلي + مثال عمود الماء' }] });
M8.merge({ id: 'g10_fl_pascal', ch: 43, reg: X10, sec: '3-4 قاعدة باسكال', page: 33, kind: 'مثال',
  title: 'قاعدة باسكال: المكبس الهيدروليكي ورفع السيارة',
  desc: 'نضغط المكبس الصغير فترتفع سيارة على المكبس الكبير: الضغط متساوٍ والقوة تتضاعف بنسبة المساحتين F₁/A₁ = F₂/A₂ ، ونحل مثال الكتاب (225 N) ومسألة النسبة 50 (120 N).',
  tags: 'قاعدة باسكال مكبس هيدروليكي رافعة زيتية',
  fact: ['السائل المستعمل في المكابح والرافعات الزيتية يجب ألا يتجمد ولا يصبح لزجاً جداً في درجات الحرارة الواطئة، ولا يتبخر، وغير سام وليس سريع الاشتعال (هل تعلم ص 33).', 'من الأجهزة التي تعمل بضغط الزيت: الكوابح والمطارق والرافعات الزيتية (ص 33).'],
  quiz: [
    { q: 'إذا سُلّط ضغط على سائل محصور فإنه ينتقل بالتساوي إلى جميع أجزائه. هذه قاعدة:', o: ['باسكال', 'برنولي', 'أرخميدس', 'الاستمرارية'], a: 0, why: 'س ص 48.' },
    { q: 'المكبس الهيدروليكي يعمل وفق مبدأ ما عدا:', o: ['معادلة برنولي', 'قاعدة باسكال', 'انتقال الضغط في السائل المحصور'], a: 0, why: 'س ص 49: المكبس لا يستعمل برنولي.' },
    { q: 'مساحتا مكبسين 15 cm² و 2000 cm². القوة اللازمة لرفع سيارة وزنها 30000 N:', o: ['225 N', '2250 N', '400 N'], a: 0, why: 'مثال ص 34.' }],
  parts: [{ id: 'g10_f_pascal', n: 'المكبس الهيدروليكي + مثال ص 34 + مسألة 3' }] });
M8.merge({ id: 'g10_fl_arch', ch: 43, reg: X10, sec: '3-5 قاعدة أرخميدس', page: 34, kind: 'نشاط',
  title: 'قاعدة أرخميدس: الطفو والغطس والتعليق بالميزان الحلزوني',
  desc: 'نغمر أجساماً من الحديد والألمنيوم والخشب والجليد في الماء والماء المالح والزيت، ونقيس النقص في الوزن ووزن الماء المزاح، ونرى حالات الغطس والتعليق والطفو (الشكل 9-3)، ونحل مثالي الكتاب.',
  tags: 'أرخميدس قوة الطفو غطس طفو تعليق',
  fact: ['أول من اكتشف قوة الطفو هو العالم اليوناني أرخميدس (ص 34).', 'إذا كانت كثافة المائع أكبر من كثافة الجسم طفا، وإذا كانت أصغر غطس، وإذا تساوتا بقي معلقاً في حالة توازن (تذكر ص 37).', 'البالون المعلق في الجو يطفو في الهواء كما يطفو الزورق على الماء (ص 34).'],
  quiz: [
    { q: 'النقص في وزن جسم مغمور في سائل يعتمد على:', o: ['حجم الجسم', 'وزن الجسم', 'كثافة الجسم', 'شكل الجسم'], a: 0, why: 'س ص 48: FB = ρ g V.' },
    { q: 'القوة التي يسلطها السائل على جسم مغمور فيه نحو الأعلى:', o: ['قوة الطفو', 'الشد السطحي', 'اللزوجة', 'قوة التماسك'], a: 0, why: 'س ص 49.' },
    { q: 'جسم معلق داخل سائل في حالة توازن:', o: ['FB = mg', 'FB > mg', 'FB < mg', 'FB = 0'], a: 0, why: 'س ص 50 والشكل 9-3.' },
    { q: 'إذا كانت كثافة الجسم أكبر من كثافة السائل فإنه:', o: ['يغطس كلياً', 'يطفو', 'يبقى معلقاً'], a: 0, why: 'س ص 50.' },
    { q: 'جسم يزن 20 N في الهواء و 15 N في الماء (g = 10). حجمه:', o: ['5×10⁻⁴ m³', '5×10⁻³ m³', '2×10⁻³ m³'], a: 0, why: 'مسألة ص 51: V = 5 / 10000.' }],
  parts: [{ id: 'g10_f_arch', n: 'الميزان الحلزوني والإناء الفائض + المثالان ص 37–38' }] });
M8.merge({ id: 'g10_fl_surf', ch: 43, reg: X10, sec: '3-6 الشد السطحي + 3-7 الخاصية الشعرية', page: 39, kind: 'نشاط',
  title: 'الشد السطحي والخاصية الشعرية: الإبرة الطافية والأنابيب الشعرية',
  desc: 'نضع إبرة على سطح الماء فتطفو، ثم نضيف الصابون فتغرق. ونغمر أنابيب شعرية مختلفة الأقطار في الماء والزئبق ونقارن الارتفاع والانخفاض وشكل السطح.',
  tags: 'الشد السطحي الخاصية الشعرية تماسك تلاصق',
  fact: ['بعض الحشرات تمشي على سطح الماء بفضل الشد السطحي (ص 39).', 'الخاصية الشعرية تساعد على صعود الماء والأملاح في التربة وجذور النباتات، وفي ترشيح الكلية، وفي فتيل المدفأة النفطية (ص 40–41).'],
  quiz: [
    { q: 'سطح الماء في أنبوبة زجاجية شعرية يكون:', o: ['مقعراً لأن التلاصق أكبر من التماسك', 'محدباً لأن التماسك أكبر', 'مستوياً'], a: 0, why: 'ص 40: الماء يرتفع ويتقعر سطحه.' },
    { q: 'تطفو شفرة الحلاقة على سطح الماء بسبب:', o: ['الشد السطحي', 'قوة الطفو فقط', 'اللزوجة'], a: 0, why: 'علل ص 50.' },
    { q: 'المنشفة المبللة تمتص الماء أسرع من الجافة بسبب:', o: ['الخاصية الشعرية', 'الضغط الجوي', 'قاعدة باسكال'], a: 0, why: 'علل ص 50.' }],
  parts: [{ id: 'g10_f_surf', n: 'الإبرة على الماء والأنابيب الشعرية' }] });
M8.merge({ id: 'g10_fl_flow', ch: 43, reg: X10, sec: '3-8 المائع المثالي إلى 3-11 تطبيقات برنولي واللزوجة', page: 41, kind: 'نشاط',
  title: 'الموائع المتحركة: الاستمرارية وبرنولي وفنتوري وجناح الطائرة والمرذاذ واللزوجة',
  desc: 'نضيّق أنبوباً فيه ماء جارٍ فيسرع الماء ويقل ضغطه (A₁v₁ = A₂v₂ وبرنولي)، ونحل مثال الكتاب ومثال فنتوري، ثم نرى قوة الرفع على جناح الطائرة والمرذاذ، ونقارن لزوجة الماء والزيت والعسل.',
  tags: 'استمرارية برنولي فنتوري جناح مرذاذ لزوجة',
  fact: ['معادلة برنولي تطبيق لقانون حفظ الطاقة على المائع المتحرك (ص 43).', 'لزوجة السوائل تقل بارتفاع درجة الحرارة، أما لزوجة الغازات فتزداد (ص 47).', 'الشكل الانسيابي لجناح الطائرة يجعل الهواء فوقه أسرع فيتولد فرق ضغط يرفعها (ص 46).'],
  quiz: [
    { q: 'سائل مهمل اللزوجة يجري في أنبوب يضيق من 10 cm إلى 5 cm. في الجزء الضيق:', o: ['يزداد الانطلاق ويقل الضغط', 'يقل الانطلاق ويزداد الضغط', 'يزدادان معاً', 'لا يتغيران'], a: 0, why: 'س ص 48: الاستمرارية وبرنولي.' },
    { q: 'معادلة برنولي مبنية على:', o: ['حفظ الطاقة', 'حفظ الزخم', 'قانون نيوتن الثالث', 'قاعدة باسكال'], a: 0, why: 'س ص 48.' },
    { q: 'تجري الموائع بسهولة بسبب:', o: ['صغر الاحتكاك الداخلي بين جزيئاتها', 'كبر كثافتها', 'الشد السطحي'], a: 0, why: 'س ص 48.' },
    { q: 'تطير الأسقف المعدنية في العواصف لأن:', o: ['الضغط فوقها أقل من الضغط تحتها', 'الضغط فوقها أكبر', 'وزنها يزداد'], a: 0, why: 'علل ص 50: برنولي.' },
    { q: 'زيت المحرك المناسب للشتاء يكون:', o: ['أقل لزوجة', 'أكثر لزوجة', 'لا فرق'], a: 0, why: 'فكّر ص 47: البرد يزيد لزوجة الزيت.' }],
  parts: [{ id: 'g10_f_cont', n: 'الاستمرارية وبرنولي ومقياس فنتوري + مثال ص 42' }, { id: 'g10_f_bern', n: 'جناح الطائرة والمرذاذ' }, { id: 'g10_f_visc', n: 'اللزوجة: الكرات الساقطة ودرجة الحرارة' }] });
M8.merge({ id: 'g10_fl_review', ch: 43, reg: X10, sec: 'أسئلة الفصل الثالث ومسائله', page: 48, kind: 'مثال',
  title: 'مسائل الفصل الثالث وأسئلة «علل» على الجهاز',
  desc: 'نحل مسائل الكتاب خطوة خطوة: ضغط الماء على قاعدة حوض، المرواز، المكبس الهيدروليكي، الجسم الطافي، الميزان الحلزوني، والأنبوب المتغير المقطع، مع أسئلة «علل».',
  tags: 'مسائل الفصل الثالث علل',
  fact: ['الأسئلة في نهاية الفصل تغطي كل قوانينه: الضغط، باسكال، أرخميدس، الاستمرارية، برنولي (ص 48–51).'],
  quiz: [
    { q: 'لوصف جريان المائع نحتاج إلى معرفة:', o: ['الضغط والكثافة والانطلاق', 'الكتلة فقط', 'الحجم فقط'], a: 0, why: 'س ص 50.' },
    { q: 'يرتفع الماء إلى المستوى نفسه في أوانٍ مستطرقة لأن:', o: ['ضغط السائل يعتمد على العمق فقط', 'الأواني متساوية الحجم', 'الشد السطحي'], a: 0, why: 'س ص 49.' },
    { q: 'شخص وزنه 600 N يطفو في الماء (g = 10). حجمه تقريباً:', o: ['0.06 m³', '0.6 m³', '6 m³'], a: 0, why: 'مسألة ص 51.' }],
  parts: [{ id: 'g10_f_problems', n: 'المسائل م1–م6 وأسئلة «علل»' }] });
