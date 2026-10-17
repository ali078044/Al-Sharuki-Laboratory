'use strict';
/* ====================== الخامس العلمي — الفصل التاسع: التيار الكهربائي (ch 59, ص 195–228) ======================
   Merged experiments (book order): g11_c9_current (9-1) · g11_c9_ohm (9-2) · g11_c9_temp (9-3, 9-4) · g11_c9_emf (9-5 … 9-7)
   · g11_c9_measure (قياس المقاومة، قنطرة وتستون) · g11_c9_power (9-8) · g11_c9_combo (9-9, 9-10) · g11_c9_kirch (9-11)
   · g11_c9_review (أسئلة ومسائل ص 225–228).
   Local kit Q59 = Q42 + schematic symbols, galvanometer, potential bars; realistic parts come from Q33 (grade 9 circuits). */
const Q59 = Object.assign(Object.create(Q42), {
  e: 1.6e-19,
  ease(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  f(v, d = 2) { if (!isFinite(v)) return '∞'; const s = String(+(+v).toFixed(d)); return s.startsWith('-') ? '−' + s.slice(1) : s; },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#fefce8'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  card(ctx, S, L, o) { return Q42.card(ctx, S, L, Object.assign({ bd: '#ca8a04', y: 70, wd: 310 }, o || {})); },
  steps(ctx, S, st, o) { return Q42.steps(ctx, S, st, Object.assign({ y: 70, x: S.W - 12, wd: 320 }, o || {})); },
  stepChips(S, id, y, x0, lab, onEx, n = 9) { return Q43.stepChips(S, id, y, x0, lab, onEx, n); },
  chips(S, id, list, y, cur, click, o = {}) { return Q42.chips(S, id, list, y, cur, click, Object.assign({ col: '#a16207' }, o)); },
  /* ---------- schematic symbols (any orientation) between points a and b ---------- */
  path(ctx, pts, col = '#0f172a', w = 2.4) { Q41.line(ctx, pts, col, w); },
  zig(ctx, a, b, lab, o = {}) { // resistor zig-zag centred on segment a→b
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, bl = Math.min(o.bl || 40, L - 8), m0 = (L - bl) / 2, col = o.col || '#0f172a';
    K.raw(ctx, () => { ctx.save(); ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.lineWidth = o.w || 2.4; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + ux * m0, a[1] + uy * m0);
      for (let k = 1; k <= 6; k++) { const s = m0 + bl * (k - .5) / 6, n = (k % 2 ? 1 : -1) * 7; ctx.lineTo(a[0] + ux * s - uy * n, a[1] + uy * s + ux * n); }
      ctx.lineTo(a[0] + ux * (m0 + bl), a[1] + uy * (m0 + bl)); ctx.lineTo(b[0], b[1]); ctx.stroke();
      if (o.hot) { ctx.strokeStyle = 'rgba(249,115,22,' + clamp(o.hot, 0, 1) * .6 + ')'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(a[0] + ux * m0, a[1] + uy * m0); ctx.lineTo(a[0] + ux * (m0 + bl), a[1] + uy * (m0 + bl)); ctx.stroke(); }
      ctx.restore(); });
    if (lab) { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, side = o.side || 1, off = o.off || 20; Q42.T(ctx, lab, mx - uy * off * side, my + ux * off * side, { s: o.s || 11, w: 900, c: o.lc || col, bg: o.bg }); }
  },
  /* cell symbol on segment a→b; long plate (+) toward b when pos=1 */
  cellS(ctx, a, b, lab, o = {}) {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, pos = o.pos == null ? 1 : o.pos, col = o.col || '#0f172a';
    const pl = (s, h, w) => { ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(mx + ux * s - uy * h, my + uy * s + ux * h); ctx.lineTo(mx + ux * s + uy * h, my + uy * s - ux * h); ctx.stroke(); };
    K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(mx - ux * 5, my - uy * 5); ctx.moveTo(mx + ux * 5, my + uy * 5); ctx.lineTo(b[0], b[1]); ctx.stroke();
      pl(5 * pos, 15, 2.4); pl(-5 * pos, 8, 5); ctx.restore(); });
    if (o.sign !== false) { Q42.T(ctx, '+', mx + ux * 13 * pos - uy * 20, my + uy * 13 * pos + ux * 20, { s: 12, w: 900, c: '#dc2626' }); }
    if (lab) { const side = o.side || -1, off = o.off || 26; Q42.T(ctx, lab, mx - uy * off * side, my + ux * off * side, { s: o.s || 11, w: 900, c: o.lc || col, bg: o.bg }); }
  },
  swS(ctx, a, b, closed, lab) { // switch on horizontal/vertical segment
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, h = 14;
    K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(mx - ux * h, my - uy * h); ctx.moveTo(mx + ux * h, my + uy * h); ctx.lineTo(b[0], b[1]); ctx.stroke();
      const ang = closed ? 0 : -.6, ca = Math.cos(ang), sa = Math.sin(ang), ex = ux * ca - uy * sa, ey = uy * ca + ux * sa; ctx.strokeStyle = closed ? '#15803d' : '#b91c1c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(mx - ux * h, my - uy * h); ctx.lineTo(mx - ux * h + ex * 2 * h, my - uy * h + ey * 2 * h); ctx.stroke();
      ctx.fillStyle = '#0f172a'; [-1, 1].forEach(s => { ctx.beginPath(); ctx.arc(mx + ux * h * s, my + uy * h * s, 3, 0, TAU); ctx.fill(); }); ctx.restore(); });
    if (lab) Q42.T(ctx, lab, mx + uy * 22, my - ux * 22 - (uy ? 0 : 0), { s: 10, w: 900, c: closed ? '#15803d' : '#b91c1c' });
  },
  meterS(ctx, x, y, k, val, col) { // round schematic meter with optional reading
    K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = col || '#0f172a'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(x, y, 14, 0, TAU); ctx.fill(); ctx.stroke(); });
    Q42.T(ctx, k, x, y, { s: 12, w: 900, c: col || '#0f172a' }); if (val != null) Q42.T(ctx, val, x, y + 27, { s: 10.5, w: 900, c: '#fff', bg: col || '#0f172a' });
  },
  node(ctx, x, y, lab, o = {}) { Q41.dot(ctx, x, y, o.c || '#0f172a', 4.5); if (lab) Q42.T(ctx, lab, x + (o.dx || 0), y + (o.dy != null ? o.dy : -14), { s: 12, w: 900, c: o.lc || '#7c2d12' }); },
  /* small current arrow on a wire at (x,y) pointing along angle a */
  carr(ctx, x, y, a, col = '#dc2626', lab, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(-6, -6); ctx.lineTo(-6, 6); ctx.closePath(); ctx.fill(); ctx.restore(); });
    if (lab) Q42.T(ctx, lab, x + (o.dx != null ? o.dx : 0), y + (o.dy != null ? o.dy : -14), { s: o.s || 11, w: 900, c: col });
  },
  /* galvanometer with centre zero: val in −1..1 */
  galv(ctx, x, y, val, o = {}) {
    const r = o.r || 34; K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 2, x, y, r); g.addColorStop(0, '#fff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore(); ctx.stroke();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; for (let k = -5; k <= 5; k++) { const a = -Math.PI / 2 + k * .13; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * .62, y + 8 + Math.sin(a) * r * .62); ctx.lineTo(x + Math.cos(a) * r * (k ? .72 : .8), y + 8 + Math.sin(a) * r * (k ? .72 : .8)); ctx.stroke(); }
      const a = -Math.PI / 2 + clamp(val, -1.1, 1.1) * .65; ctx.strokeStyle = Math.abs(val) < .03 ? '#16a34a' : '#dc2626'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(x, y + 8); ctx.lineTo(x + Math.cos(a) * r * .78, y + 8 + Math.sin(a) * r * .78); ctx.stroke(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(x, y + 8, 3, 0, TAU); ctx.fill(); });
    Q42.T(ctx, 'G', x, y + r * .55, { s: 12, w: 900, c: '#0f172a' });
    if (o.lab !== '') Q42.T(ctx, o.lab || (Math.abs(val) < .03 ? 'صفر: متوازنة' : 'غير متوازنة'), x, y + r + 13, { s: 10.5, w: 900, c: '#fff', bg: Math.abs(val) < .03 ? '#16a34a' : '#b91c1c' });
  },
  /* dashed internal-resistance box */
  dbox(ctx, x, y, w, h, lab) { K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = '#eab308'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]); rr(ctx, x, y, w, h, 8); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = 'rgba(254,240,138,.18)'; rr(ctx, x, y, w, h, 8); ctx.fill(); ctx.restore(); }); if (lab) Q42.T(ctx, lab, x + w / 2, y - 10, { s: 10, w: 900, c: '#a16207' }); },
  /* panel frame */
  panel(ctx, x, y, w, h, title, col = '#a16207') { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.12)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 3; ctx.fillStyle = 'rgba(255,255,255,.93)'; rr(ctx, x, y, w, h, 12); ctx.fill(); ctx.restore(); ctx.strokeStyle = col; ctx.lineWidth = 1.6; rr(ctx, x, y, w, h, 12); ctx.stroke(); }); if (title) Q42.T(ctx, title, x + w / 2, y + 14, { s: 11, w: 900, c: '#fff', bg: col }); },
  /* stacked bar: parts [[value,color,label]] scaled to total height H, drawn at x bottom y */
  vbar(ctx, x, y, wd, H, max, parts, title) {
    let yy = y; K.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.18)'; ctx.fillRect(x, y - H, wd, H); });
    parts.forEach(p => { const hh = clamp(p[0] / max, 0, 1.2) * H; K.raw(ctx, () => { const g = ctx.createLinearGradient(x, 0, x + wd, 0); g.addColorStop(0, shade(p[1], 20)); g.addColorStop(1, shade(p[1], -20)); ctx.fillStyle = g; ctx.fillRect(x, yy - hh, wd, hh); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1; ctx.strokeRect(x, yy - hh, wd, hh); }); if (p[2] && hh > 14) Q42.T(ctx, p[2], x + wd / 2, yy - hh / 2, { s: 10, w: 900, c: '#fff' }); yy -= hh; });
    if (title) Q42.T(ctx, title, x + wd / 2, y + 12, { s: 10, w: 900, c: '#334155' });
  },
  play(S, id, y, run, onGo, onRe, o = {}) { return Q59.chips(S, id, [['go', run ? '⏸ أوقف' : (o.go || '▶ شغّل')], ['re', '↺ من البداية']].concat(o.more || []), y, '', (S2, k) => { if (k === 'go') onGo(S2); else if (k === 're') onRe(S2); else if (o.onMore) o.onMore(S2, k); }, { bw: o.bw || 150, x0: o.x0 }); }
});

/* ====================== laws ====================== */
LW({ id: 'g11_l9_current', cat: 59, name: 'التيار الكهربائي', fx: '<i>I</i> = ' + FR('Δ<i>q</i>', 'Δ<i>t</i>'), sym: 'المعدل الزمني لكمية الشحنة المارة خلال مقطع موصل. وحدته الأمبير A = C/s. اتجاه التيار الاصطلاحي باتجاه حركة الشحنات الموجبة وعكس حركة الإلكترونات', calc: { in: [['q', 'الشحنة Δq', 'C', 3e-6], ['t', 'الزمن Δt', 's', .01]], out: 'التيار I', u: 'A', f: v => v.q / v.t } });
LW({ id: 'g11_l9_drift', cat: 59, name: 'سرعة الانجراف', fx: '<i>v</i><sub>D</sub> = ' + FR('<i>I</i>', '<i>A N e</i>'), sym: 'N عدد الإلكترونات الحرة في وحدة الحجم (للنحاس 8.5×10²⁸ m⁻³) و A مساحة المقطع و e = 1.6×10⁻¹⁹ C. سرعة الانجراف صغيرة جداً (أجزاء من mm/s) بينما ينتقل أثر المجال الكهربائي بسرعة قريبة من سرعة الضوء', calc: { in: [['I', 'التيار I', 'A', 10], ['A', 'المساحة A', 'mm²', 2], ['N', 'N ×10²⁸', 'm⁻³', 8.5]], out: 'سرعة الانجراف', u: 'mm/s', f: v => v.I / (v.A * 1e-6 * v.N * 1e28 * 1.6e-19) * 1000 } });
LW({ id: 'g11_l9_ohm', cat: 59, name: 'قانون أوم', fx: '<i>R</i> = ' + FR('Δ<i>V</i>', '<i>I</i>') + ' ، Δ<i>V</i> = <i>I R</i>', sym: 'التيار المار في موصل يتناسب طردياً مع فرق الجهد بين طرفيه عند ثبوت درجة حرارته. الأوم Ω مقاومة موصل يمر فيه تيار 1 A عندما يكون فرق الجهد بين طرفيه 1 V. ميل خط I − ΔV للموصل الأومي يساوي 1/R', calc: { in: [['V', 'فرق الجهد ΔV', 'V', 12], ['I', 'التيار I', 'A', 2]], out: 'المقاومة R', u: 'Ω', f: v => v.V / v.I } });
LW({ id: 'g11_l9_rho', cat: 59, name: 'المقاومية', fx: '<i>R</i> = <i>ρ</i> ' + FR('<i>L</i>', '<i>A</i>') + ' ، <i>σ</i> = ' + FR('1', '<i>ρ</i>'), sym: 'المقاومة تتناسب طردياً مع الطول وعكسياً مع مساحة المقطع. المقاومية ρ (Ω·m) صفة للمادة تعتمد على نوعها ودرجة حرارتها، أما المقاومة فصفة للجسم. والموصلية σ مقلوب المقاومية', calc: { in: [['rho', 'المقاومية ρ ×10⁻⁸', 'Ω·m', 1.72], ['L', 'الطول L', 'm', 2], ['A', 'المساحة A', 'mm²', 4]], out: 'المقاومة R', u: 'Ω', f: v => v.rho * 1e-8 * v.L / (v.A * 1e-6) } });
LW({ id: 'g11_l9_temp', cat: 59, name: 'المقاومية ودرجة الحرارة', fx: '<i>ρ</i> = <i>ρ</i><sub>0</sub>[1 + <i>α</i>(<i>T</i> − <i>T</i><sub>0</sub>)] ، <i>R</i> = <i>R</i><sub>0</sub>[1 + <i>α</i>(<i>T</i> − <i>T</i><sub>0</sub>)]', sym: 'α المعامل الحراري للمقاومية (°C⁻¹) موجب للفلزات، وسالب لأشباه الموصلات والكاربون والمحاليل الإلكتروليتية فتقل مقاومتها بارتفاع درجة الحرارة', calc: { in: [['R0', 'R0', 'Ω', 50], ['a', 'α ×10⁻⁴', '°C⁻¹', 39.3], ['T', 'T', '°C', 70.9], ['T0', 'T0', '°C', 20]], out: 'المقاومة R', u: 'Ω', f: v => v.R0 * (1 + v.a * 1e-4 * (v.T - v.T0)) } });
LW({ id: 'g11_l9_emf', cat: 59, name: 'القوة الدافعة الكهربائية', fx: '<i>ε</i> = ' + FR('<i>W</i>', '<i>q</i>'), sym: 'مقدار الطاقة الكهربائية التي تكسبها البطارية لكل كولوم من الشحنة ينتقل بين قطبيها، أي الشغل المنجز لوحدة الشحنة. وحدتها J/C = V', calc: { in: [['W', 'الشغل W', 'J', 24], ['q', 'الشحنة q', 'C', 2]], out: 'ε', u: 'V', f: v => v.W / v.q } });
LW({ id: 'g11_l9_closed', cat: 59, name: 'قانون الدائرة الكهربائية المغلقة', fx: '<i>ε</i> = Δ<i>V</i> + <i>I r</i> ، <i>I</i> = ' + FR('<i>ε</i>', '<i>R</i> + <i>r</i>'), sym: 'فولطية الأقطاب ΔV = ε − I r تقل كلما زاد التيار المسحوب من البطارية بسبب المقاومة الداخلية r. في الدائرة المفتوحة I = 0 فيقرأ الفولطميتر ε تقريباً', calc: { in: [['e', 'ε', 'V', 12], ['r', 'r', 'Ω', .01], ['I', 'I', 'A', 100]], out: 'فولطية الأقطاب ΔV', u: 'V', f: v => v.e - v.I * v.r } });
LW({ id: 'g11_l9_bridge', cat: 59, name: 'قنطرة وتستون', fx: FR('<i>R</i><sub>1</sub>', '<i>R</i><sub>2</sub>') + ' = ' + FR('<i>R</i><sub>3</sub>', '<i>R</i><sub>4</sub>') + ' ، ' + FR('<i>R</i><sub>1</sub>', '<i>R</i><sub>2</sub>') + ' = ' + FR('<i>L</i><sub>1</sub>', '<i>L</i><sub>2</sub>'), sym: 'عند اتزان القنطرة لا يمر تيار في الكلفانوميتر (Vbd = 0). في قنطرة السلك المنزلق نستبدل R3 و R4 بسلك منتظم فتتناسب المقاومتان مع الطولين', calc: { in: [['R2', 'R2', 'Ω', 10], ['R3', 'R3', 'Ω', 4], ['R4', 'R4', 'Ω', 2]], out: 'R1 المجهولة', u: 'Ω', f: v => v.R2 * v.R3 / v.R4 } });
LW({ id: 'g11_l9_power', cat: 59, name: 'القدرة الكهربائية', fx: '<i>P</i> = <i>I</i> Δ<i>V</i> = <i>I</i>²<i>R</i> = ' + FR('Δ<i>V</i>²', '<i>R</i>') + ' ، <i>E</i> = <i>P t</i>', sym: 'القدرة: الطاقة المستهلكة في وحدة الزمن، وحدتها الواط W = J/s = A·V. أعظم قدرة تنتقل إلى الحمل عندما R = r وعندها تساوي نصف قدرة المصدر', calc: { in: [['e', 'ε', 'V', 12], ['r', 'r', 'Ω', .05], ['R', 'R', 'Ω', 3]], out: 'قدرة الحمل', u: 'W', f: v => Math.pow(v.e / (v.R + v.r), 2) * v.R } });
LW({ id: 'g11_l9_series', cat: 59, name: 'ربط المقاومات على التوالي', fx: '<i>R</i><sub>eq</sub> = <i>R</i><sub>1</sub> + <i>R</i><sub>2</sub> + <i>R</i><sub>3</sub> ، <i>I</i> = <i>I</i><sub>1</sub> = <i>I</i><sub>2</sub> = <i>I</i><sub>3</sub>', sym: 'مسار واحد للتيار: التيار نفسه في كل المقاومات، وفرق الجهد الكلي يساوي مجموع فروق الجهد V = V1 + V2 + V3', calc: { in: [['a', 'R1', 'Ω', 2], ['b', 'R2', 'Ω', 3], ['c', 'R3', 'Ω', 5]], out: 'Req', u: 'Ω', f: v => v.a + v.b + v.c } });
LW({ id: 'g11_l9_parallel', cat: 59, name: 'ربط المقاومات على التوازي', fx: FR('1', '<i>R</i><sub>eq</sub>') + ' = ' + FR('1', '<i>R</i><sub>1</sub>') + ' + ' + FR('1', '<i>R</i><sub>2</sub>') + ' + ' + FR('1', '<i>R</i><sub>3</sub>'), sym: 'فرق الجهد نفسه على كل فرع V = V1 = V2 = V3 ، والتيار الكلي يساوي مجموع تيارات الفروع I = I1 + I2 + I3. هكذا تربط الأجهزة في المنازل', calc: { in: [['a', 'R1', 'Ω', 2], ['b', 'R2', 'Ω', 3], ['c', 'R3', 'Ω', 6]], out: 'Req', u: 'Ω', f: v => 1 / (1 / v.a + 1 / v.b + 1 / v.c) } });
LW({ id: 'g11_l9_kirch', cat: 59, name: 'قاعدتا كيرشوف', fx: 'Σ<i>I</i><sub>in</sub> = Σ<i>I</i><sub>out</sub> ، ΣΔ<i>V</i> = 0', sym: 'قاعدة العقدة (حفظ الشحنة): مجموع التيارات الداخلة إلى نقطة تفرع يساوي مجموع الخارجة منها. قاعدة العروة (حفظ الطاقة): المجموع الجبري لفروق الجهد حول مسار مغلق صفر، أي هبوط الجهد = ارتفاع الجهد', calc: { in: [['e2', 'ε2', 'V', 12], ['e1', 'ε1', 'V', 6], ['R', 'مجموع المقاومات', 'Ω', 12]], out: 'تيار العروة', u: 'A', f: v => (v.e2 - v.e1) / v.R } });

/* =============== A1 — التيار الكهربائي I = Δq / Δt: الشحنات العابرة لمقطع (9-1، الأشكال 1–3، ص 195–196) =============== */
(() => {
  const TH = [['a', 3, 2, -1], ['b', 3, 0, -1], ['c', 2, 2, -1], ['d', 0, 2, 1]]; // id, n+, n−, direction of negatives
  const D = { id: 'g11_i_flow', page: 195, fig: 'الأشكال 1 و 2 و 3',
    desc: 'التيار الكهربائي هو المعدل الزمني لكمية الشحنة المارة خلال مقطع موصل: I = Δq / Δt ، ووحدته الأمبير (1 A = 1 C / 1 s). يتولد التيار من حركة الإلكترونات الحرة في الفلزات أو الأيونات الموجبة والسالبة في المحاليل، واتجاهه الاصطلاحي هو اتجاه حركة الشحنات الموجبة.',
    tags: 'التيار الكهربائي I=Δq/Δt الأمبير اتجاه التيار الاصطلاحي شحنات موجبة سالبة إلكترونات حرة أيونات مقطع الموصل الشكل 1 الشكل 2 الشكل 3 فكر',
    tools: ['أنبوب موصل شفاف', 'مقطع عرضي مساحته A', 'عداد للشحنات وساعة توقيت'],
    steps: ['راقب الشحنات وهي تعبر المقطع الأصفر A: العداد يجمع Δq والساعة تقيس Δt.', 'غيّر عدد الشحنات وسرعتها من اللوحة، أو اختر الشكل 2 a و b للمقارنة.', 'اسحب المقطع A على طول الموصل: التيار نفسه في أي مقطع.', 'اختر «فكر: الشكل 3» واضغط على كل مقطع لتعرف اتجاه تياره، ثم رتّبها.'],
    concl: ['I = Δq / Δt ووحدته الأمبير A = C/s.', 'اتجاه التيار الاصطلاحي باتجاه حركة الشحنات الموجبة، وعكس حركة الشحنات السالبة.', 'شحنات سالبة تتحرك نحو اليسار تكافئ شحنات موجبة نحو اليمين، فيُجمع أثرهما.', 'الشكل 3: الترتيب من الأقل إلى الأكبر d ثم b ثم c ثم a.'],
    laws: ['g11_l9_current'],
    controls: [R('np', 'عدد الشحنات الموجبة', 0, 6, 3, 1, ''), R('nn', 'عدد الشحنات السالبة', 0, 6, 2, 1, ''), R('v', 'سرعة الشحنات', .1, .6, .25, .05, 'm/s'), TG('dn', 'السالبة تتحرك نحو اليمين', false, null, 'arrow')],
    setup(S) { S.md = 'free'; S.pp = 0; S.pn = 0; S.qn = 0; S.clk = 0; S.ax = .5; S.axd = .5; S.rev = {}; S.ord = 0; S.ph4 = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 30, x1: w - 30, ty: 450 }; },
    Ith(S) { return S.p.v * (S.p.np - (S.p.dn ? 1 : -1) * S.p.nn); },
    update(S, dt) {
      S.ph4 += dt * .25; S.axd = Q59.ease(S.axd, S.ax, dt, 12);
      if (S.md === 'think') return;
      const v = S.p.v, dn = S.p.dn ? 1 : -1, a = S.pp, b = S.pp + v * dt, an = S.pn, bn = S.pn + dn * v * dt;
      const cnt = (n, p0, p1) => { let c = 0; for (let i = 0; i < n; i++) c += Math.floor(i / n + p1 - S.axd + 1e-9) - Math.floor(i / n + p0 - S.axd + 1e-9); return c; };
      S.qn += cnt(S.p.np, a, b) - cnt(S.p.nn, an + .37, bn + .37); S.pp = b; S.pn = bn; S.clk += dt;
    },
    tube(ctx, x0, x1, y, hh, lab) {
      K.raw(ctx, () => { ctx.save(); const g = ctx.createLinearGradient(0, y - hh, 0, y + hh); g.addColorStop(0, 'rgba(203,213,225,.9)'); g.addColorStop(.25, 'rgba(255,255,255,.75)'); g.addColorStop(.6, 'rgba(226,232,240,.55)'); g.addColorStop(1, 'rgba(100,116,139,.7)');
        ctx.fillStyle = g; ctx.fillRect(x0, y - hh, x1 - x0, 2 * hh); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0, y - hh); ctx.lineTo(x1, y - hh); ctx.moveTo(x0, y + hh); ctx.lineTo(x1, y + hh); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(x0, y, hh * .35, hh, 0, 0, TAU); ctx.fillStyle = 'rgba(148,163,184,.5)'; ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x1, y, hh * .35, hh, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke(); ctx.restore(); });
      if (lab) Q42.T(ctx, lab, x0 - 14, y, { s: 13, w: 900, c: '#fff', bg: '#7c2d12' });
    },
    parts(ctx, x0, x1, y, np, nn, pp, pn, r = 10) {
      const W = x1 - x0; for (let i = 0; i < np; i++) { const f = ((i / np + pp) % 1 + 1) % 1; Q31.sg(ctx, x0 + f * W, y - 11 + 3 * Math.sin(i * 2.1 + pp * 9), 1, r); }
      for (let i = 0; i < nn; i++) { const f = ((i / nn + pn + .37) % 1 + 1) % 1; Q31.sg(ctx, x0 + f * W, y + 11 + 3 * Math.sin(i * 1.7 + pn * 9), -1, r); }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q59.bg(ctx, w, h);
      if (S.md === 'think') { D.drawThink(ctx, w, h, S, g); return; }
      const I = D.Ith(S), dn = S.p.dn ? 1 : -1, X = f => g.x0 + f * (g.x1 - g.x0), ax = X(S.axd);
      // counter panel
      Q59.panel(ctx, g.L + 24, 84, 360, 210, 'عداد الشحنات عند المقطع A');
      Q52.watch(ctx, g.L + 90, 180, 40, S.clk, 'Δt = ' + Q59.f(S.clk, 1) + ' s', 60);
      Q42.T(ctx, 'Δq = ' + S.qn + ' μC', g.L + 270, 140, { s: 16, w: 900, c: '#7c2d12' });
      Q42.T(ctx, 'I = Δq / Δt', g.L + 270, 178, { s: 13, w: 900, c: '#334155' });
      Q42.T(ctx, 'I = ' + (S.clk > .5 ? Q59.f(S.qn / S.clk, 2) : '…') + ' μA', g.L + 270, 212, { s: 16, w: 900, c: '#fff', bg: '#b45309' });
      Q42.T(ctx, 'كل كرة تمثل 1 μC', g.L + 270, 252, { s: 10.5, w: 800, c: '#64748b' });
      // conductor
      D.tube(ctx, g.x0, g.x1, g.ty, 36);
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(250,204,21,.35)'; ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(ax, g.ty, 13, 36, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); });
      D.parts(ctx, g.x0, g.x1, g.ty, S.p.np, S.p.nn, S.pp, S.pn);
      Q42.T(ctx, 'A', ax, g.ty - 50, { s: 13, w: 900, c: '#fff', bg: '#ca8a04' });
      // motion arrows
      if (S.p.np) { Q52.arrow(ctx, g.x0 + 20, g.ty - 64, 70, 0, '#dc2626', '', 2.5); Q42.T(ctx, 'حركة الموجبة', g.x0 + 150, g.ty - 64, { s: 10.5, w: 900, c: '#dc2626' }); }
      if (S.p.nn) { const bx = g.x1 - 110; Q52.arrow(ctx, bx + (dn > 0 ? 0 : 70), g.ty - 64, 70 * dn, 0, '#2563eb', '', 2.5); Q42.T(ctx, 'حركة السالبة', bx - 50, g.ty - 64, { s: 10.5, w: 900, c: '#2563eb' }); }
      // conventional current arrow
      const cx = (g.x0 + g.x1) / 2; if (Math.abs(I) > 1e-6) { Q52.arrow(ctx, cx - 90 * Math.sign(I), g.ty + 70, 180 * Math.sign(I), 0, '#ca8a04', '', 6); }
      Q42.T(ctx, Math.abs(I) < 1e-6 ? 'لا يوجد تيار: I = 0' : 'اتجاه التيار الاصطلاحي ' + (I > 0 ? 'نحو اليمين' : 'نحو اليسار'), cx, g.ty + 96, { s: 12, w: 900, c: '#fff', bg: '#a16207' });
      Q59.card(ctx, S, [{ t: 'n+ = ' + S.p.np + '     n− = ' + S.p.nn, mono: 1 }, { t: 'الموجبة نحو اليمين، والسالبة ' + (dn > 0 ? 'نحو اليمين' : 'نحو اليسار') }, { t: 'I = v(n+ ' + (dn > 0 ? '−' : '+') + ' n−) = ' + Q59.f(Math.abs(I), 2) + ' μA', mono: 1, c: '#b45309', w: 900 }, { t: S.md === 'a' ? 'الشكل 2a: موجبة نحو اليمين والتيار أكبر' : S.md === 'b' ? 'الشكل 2b: السالبة نحو اليمين فالتيار نحو اليسار وأصغر' : 'السالبة نحو اليسار تكافئ موجبة نحو اليمين', c: '#334155' }], { title: 'التيار في الموصل' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.r);
      Q42.banner(ctx, w, 'عُدّ الشحنات العابرة للمقطع الأصفر واسحبه', '#a16207');
    },
    drawThink(ctx, w, h, S, g) {
      const x0 = g.L + 60, x1 = w - 360, ys = [120, 225, 330, 435];
      TH.forEach((q, i) => { const y = ys[i], net = q[1] - q[3] * q[2]; D.tube(ctx, x0, x1, y, 26, q[0]); D.parts(ctx, x0, x1, y, q[1], q[2], S.ph4, q[3] * S.ph4, 7);
        if (S.rev[q[0]] || S.ord) { Q52.arrow(ctx, (x0 + x1) / 2 - 50 * Math.sign(net), y + 44, 100 * Math.sign(net), 0, '#ca8a04', '', 4); Q42.T(ctx, Math.abs(net) + ' وحدات ' + (net > 0 ? 'نحو اليمين' : 'نحو اليسار'), x1 - 50, y + 44, { s: 10.5, w: 900, c: '#fff', bg: '#a16207' }); }
        else Q42.T(ctx, 'اضغط لمعرفة التيار', (x0 + x1) / 2, y + 44, { s: 10, w: 800, c: '#64748b' }); });
      const L = [{ t: 'الشحنات الموجبة تتحرك نحو اليمين دائماً', c: '#dc2626' }, { t: 'المقطع a: ثلاث موجبة واثنتان سالبة نحو اليسار' }, { t: 'المقطع b: ثلاث موجبة فقط' }, { t: 'المقطع c: اثنتان موجبة واثنتان سالبة نحو اليسار' }, { t: 'المقطع d: اثنتان سالبة نحو اليمين' }, { t: 'السؤال: اتجاه التيار، ثم الترتيب من الأقل إلى الأكبر', c: '#7c2d12', w: 800 }];
      if (S.ord) L.push({ t: 'الاتجاه نحو اليمين في a و b و c ونحو اليسار في d', c: '#15803d', w: 900 }, { t: 'الترتيب: d < b < c < a', c: '#b91c1c', w: 900 }, { t: '2 < 3 < 4 < 5', mono: 1, c: '#b91c1c' });
      Q59.card(ctx, S, L, { title: 'فكر: الشكل 3 ص 196' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.r);
      Q42.banner(ctx, w, 'حدد اتجاه التيار في كل مقطع ثم رتّبها', '#a16207');
    },
    chips(S, g) { return { m: Q59.chips(S, 'md', [['free', 'حر'], ['a', 'الشكل 2a'], ['b', 'الشكل 2b'], ['think', 'فكر: الشكل 3']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.qn = 0; S2.clk = 0; S2.ord = 0; S2.rev = {};
        if (k === 'a') { setParam(S2, 'np', 5); setParam(S2, 'nn', 0); } if (k === 'b') { setParam(S2, 'np', 0); setParam(S2, 'nn', 3); setParam(S2, 'dn', true); } if (k === 'free') { setParam(S2, 'np', 3); setParam(S2, 'nn', 2); setParam(S2, 'dn', false); } }, { bw: 160 }),
      r: S.md === 'think' ? Q59.chips(S, 'or', [['ord', 'اظهر الاتجاهات والترتيب'], ['hide', 'أخفِ الحل']], g.h - 84, S.ord ? 'ord' : '', (S2, k) => { S2.ord = k === 'ord' ? 1 : 0; if (!S2.ord) S2.rev = {}; }, { bw: 200 })
        : Q59.chips(S, 'rs', [['re', '↺ صفّر العداد والساعة']], g.h - 84, '', S2 => { S2.qn = 0; S2.clk = 0; }, { bw: 220 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      if (S.md === 'think') { const ys = [120, 225, 330, 435], x0 = g.L + 60, x1 = S.W - 360; return TH.map((q, i) => ({ id: 'th' + q[0], x: (x0 + x1) / 2, y: ys[i], w: x1 - x0, h: 56, axis: 'none', hint: i ? false : undefined, idle: i ? undefined : 'اضغط ✋', tip: 'اضغط: اتجاه التيار', click: S2 => { S2.rev = Object.assign({}, S2.rev, { [q[0]]: 1 }); } })).concat(C.m, C.r); }
      return [{ id: 'A', x: g.x0 + S.axd * (g.x1 - g.x0), y: g.ty, r: 26, axis: 'x', keep: true, tip: 'اسحب المقطع A', idle: 'اسحب ✋', drag: (S2, d) => { S2.ax = clamp((d.x - g.x0) / (g.x1 - g.x0), .05, .95); } }].concat(C.m, C.r); },
    readings(S) { return [rd('الشحنة العابرة Δq', S.qn + ' μC'), rd('الزمن Δt', Q59.f(S.clk, 1) + ' s'), rd('التيار المقيس', (S.clk > .5 ? Q59.f(S.qn / S.clk, 2) : '…') + ' μA'), rd('التيار النظري', Q59.f(D.Ith(S), 2) + ' μA')]; },
    explain(S) { return Q26.ex('العداد يزداد كلما عبرت شحنة المقطع A، والتيار يساوي ما يعبر في كل ثانية.', 'I = Δq / Δt. الشحنة السالبة المتحركة نحو اليسار تنقل الأثر نفسه لشحنة موجبة نحو اليمين، لذلك يجمع تأثيرهما في الاتجاه الاصطلاحي نفسه.', 'في المحاليل الإلكتروليتية وفي البطارية السائلة يتولد التيار من حركة أيونات موجبة وسالبة باتجاهين متعاكسين.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — سرعة الانجراف vD = I / (A N e): المثالان 1 و 2 (9-1، ص 196–198) =============== */
(() => {
  const N = 8.5e28, NE = 46;
  const EX = { ex1: { title: 'مثال 1 ص 197', q: 'عند ضغط زر حاسبة يمر تيار 300 μA لمدة 0.01 s. احسب الشحنة المارة وعدد الإلكترونات.', lines: ['Δq = I Δt', 'Δq = 300×10⁻⁶ × 1×10⁻²', 'Δq = 3×10⁻⁶ C', 'n = Δq / e = 3×10⁻⁶ / 1.6×10⁻¹⁹', 'عدد الإلكترونات n = 1.9×10¹³'] },
    ex2: { title: 'مثال 2 ص 198', q: 'سلك نحاس مساحة مقطعه 2 mm² يمر فيه تيار 10 A ، وعدد الإلكترونات الحرة في وحدة الحجم 8.5×10²⁸. احسب سرعة الانجراف.', lines: ['vD = I / (A N e)', 'vD = 10 / (2×10⁻⁶ × 8.5×10²⁸ × 1.6×10⁻¹⁹)', 'vD = 0.37×10⁻³ m/s', 'سرعة الانجراف 0.37 mm/s فقط'] } };
  const D = { id: 'g11_i_drift', page: 196, fig: 'مثال 1 + مثال 2',
    desc: 'تتحرك الإلكترونات الحرة داخل الموصل حركة عشوائية سريعة وتتصادم مع ذرات الموصل، وعند تسليط فرق جهد تنجرف ببطء شديد عكس المجال: سرعة الانجراف vD = I / (A N e). أما أثر المجال الكهربائي فينتقل في السلك بسرعة قريبة من سرعة الضوء، لذلك يضيء المصباح فور غلق المفتاح.',
    tags: 'سرعة الانجراف vD=I/ANe الإلكترونات الحرة النحاس 8.5×10^28 مثال 1 الحاسبة 300μA مثال 2 0.37mm/s سرعة الضوء',
    tools: ['سلك نحاس مكبر', 'بطارية ومفتاح ومصباح', 'حاسبة جيب'],
    steps: ['أغلق المفتاح: يضيء المصباح فوراً، بينما ينجرف الإلكترون المعلَّم ببطء نحو اليسار.', 'غيّر التيار ومساحة المقطع من اللوحة وراقب سرعة الانجراف.', 'اسحب الإلكترون المعلَّم إلى أي مكان لتتابع مساره المتعرج.', 'اختر المثال 1 أو 2 واضغط «الحل خطوة خطوة».'],
    concl: ['vD = I / (A N e): تزداد بزيادة التيار وتقل بزيادة مساحة المقطع.', 'سرعة الانجراف صغيرة جداً: لسلك نحاس قطره 1 mm يحمل 1 A تكون 9.4×10⁻⁵ m/s.', 'مثال 1: Δq = 3×10⁻⁶ C و n = 1.9×10¹³ إلكترون.', 'مثال 2: vD = 0.37 mm/s.'],
    laws: ['g11_l9_drift', 'g11_l9_current'],
    controls: [R('I', 'التيار I', 0, 20, 10, .5, 'A'), R('A', 'مساحة المقطع A', .5, 4, 2, .01, 'mm²'), TG('sw', 'المفتاح مغلق', true, null, 'power'), TG('trail', 'أثر الإلكترون المعلَّم', true, null, 'trail')],
    setup(S) { S.md = 'wire'; S.ex = 0; S.k = 0; S.el = []; for (let i = 0; i < NE; i++) { const a = Math.random() * TAU; S.el.push([Math.random(), Math.random(), Math.cos(a), Math.sin(a), Math.random() * .3]); } S.tr = []; S.tk = 0; S.lit = 0; S.vdd = 0; S.clk = 0; S.press = 0; },
    vD(S) { return S.p.sw ? S.p.I / (S.p.A * 1e-6 * N * Q59.e) : 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 30, x1: w - 30, y0: 352, y1: 548 }; },
    update(S, dt) {
      S.clk += dt; S.lit = Q59.ease(S.lit, S.p.sw && S.p.I > 0 ? 1 : 0, dt, 25); S.vdd = Q59.ease(S.vdd, D.vD(S), dt, 4); S.press = Math.max(0, S.press - dt);
      const g = D.geo(S), W = g.x1 - g.x0, H = g.y1 - g.y0, vth = 150 / W, drift = -S.vdd * 1000 * 55 / W;
      S.el.forEach((e, i) => { e[4] -= dt; if (e[4] < 0) { const a = Math.random() * TAU; e[2] = Math.cos(a); e[3] = Math.sin(a); e[4] = .15 + Math.random() * .3; }
        if (i === 0 && S.drg) return; e[0] += (e[2] * vth + drift) * dt; e[1] += e[3] * vth * W / H * dt; if (e[1] < .04) { e[1] = .04; e[3] = Math.abs(e[3]); } if (e[1] > .96) { e[1] = .96; e[3] = -Math.abs(e[3]); }
        if (e[0] < 0) { e[0] += 1; if (!i) S.tr = []; } if (e[0] > 1) { e[0] -= 1; if (!i) S.tr = []; } });
      S.tk += dt; if (S.tk > .06) { S.tk = 0; S.tr.push([S.el[0][0], S.el[0][1]]); if (S.tr.length > 90) S.tr.shift(); }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), W = g.x1 - g.x0, H = g.y1 - g.y0, X = f => g.x0 + f * W, Y = f => g.y0 + f * H, vD = D.vD(S);
      Q59.bg(ctx, w, h);
      // top panel: circuit or calculator
      const px = g.L + 24, pw = w - 340 - px - 10;
      if (S.md === 'ex1') D.calc(ctx, px, 84, pw, S);
      else { Q59.panel(ctx, px, 84, pw, 220, 'المصباح يضيء فور غلق المفتاح');
        const by = 274, lx = px + pw - 70, c = Q33.cell(ctx, px + 70, by, { V: 6, w: 70, h: 26 }); const b = Q33.bulb(ctx, lx, 196, S.lit, {});
        Q33.wire(ctx, [c.p, [px + 160, by]], { col: '#dc2626' }); const s = Q33.sw(ctx, px + 160, px + 210, by, S.p.sw, { label: '' }); Q33.wire(ctx, [s.b, [lx + 50, by], [lx + 50, 196], b.b], { col: '#dc2626' }); Q33.wire(ctx, [c.n, [px + 22, by], [px + 22, 130], [lx - 50, 130], [lx - 50, 196], b.a], { col: '#111827' });
        Q42.T(ctx, 'سرعة الأثر ≈ 3×10⁸ m/s', px + pw / 2 - 30, 160, { s: 11, w: 900, c: '#fff', bg: '#16a34a' });
        Q42.T(ctx, S.p.sw ? 'الإلكترونات تنجرف ببطء' : 'المفتاح مفتوح', px + pw / 2 - 30, 220, { s: 11, w: 900, c: S.p.sw ? '#1d4ed8' : '#b91c1c' }); }
      // magnified conductor
      K.raw(ctx, () => { ctx.save(); const gg = ctx.createLinearGradient(0, g.y0 - 16, 0, g.y1 + 16); gg.addColorStop(0, '#fcd9b6'); gg.addColorStop(.12, '#fde7d1'); gg.addColorStop(.88, '#f5c79b'); gg.addColorStop(1, '#c2410c'); ctx.fillStyle = gg; rr(ctx, g.x0 - 10, g.y0 - 16, W + 20, H + 32, 18); ctx.fill(); ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); });
      Q42.T(ctx, 'سلك نحاس مكبَّر', g.x0 + 70, g.y0 - 30, { s: 11, w: 900, c: '#fff', bg: '#9a3412' });
      for (let r = 0; r < 4; r++) for (let c = 0; c < 14; c++) { const x = X((c + .5 + (r % 2) * .5) / 14.5), y = Y((r + .5) / 4), j = 1.5 * Math.sin(S.clk * 23 + r * 3 + c * 7); K.raw(ctx, () => { const gr = ctx.createRadialGradient(x + j - 3, y - 3, 1, x + j, y, 11); gr.addColorStop(0, '#f1f5f9'); gr.addColorStop(1, '#94a3b8'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x + j, y, 11, 0, TAU); ctx.fill(); }); Q42.T(ctx, '+', x + j, y, { s: 12, w: 900, c: '#475569' }); }
      if (S.p.trail && S.tr.length > 1) Q41.line(ctx, S.tr.map(q => [X(q[0]), Y(q[1])]), 'rgba(220,38,38,.75)', 1.8);
      S.el.forEach((e, i) => { if (i) Q33.elec(ctx, X(e[0]), Y(e[1]), 5); });
      const e0 = S.el[0]; K.raw(ctx, () => { ctx.fillStyle = 'rgba(220,38,38,.25)'; ctx.beginPath(); ctx.arc(X(e0[0]), Y(e0[1]), 13, 0, TAU); ctx.fill(); }); Q31.sg(ctx, X(e0[0]), Y(e0[1]), -1, 8);
      // field + current arrows
      if (S.p.sw && S.p.I > 0) { Q52.arrow(ctx, g.x0 + 20, g.y1 + 30, 110, 0, '#ca8a04', '', 4); Q42.T(ctx, 'المجال E والتيار I', g.x0 + 210, g.y1 + 30, { s: 11, w: 900, c: '#a16207' });
        Q52.arrow(ctx, g.x1 - 20, g.y1 + 30, -110, 0, '#2563eb', '', 4); Q42.T(ctx, 'انجراف الإلكترونات', g.x1 - 220, g.y1 + 30, { s: 11, w: 900, c: '#1d4ed8' }); }
      const t1 = vD > 0 ? 1 / vD : Infinity;
      if (S.ex && EX[S.md]) Q59.steps(ctx, S, Object.assign({}, EX[S.md], { k: S.k }));
      else Q59.card(ctx, S, [{ t: 'vD = I / (A N e)', mono: 1 }, { t: 'I = ' + Q59.f(S.p.I, 1) + ' A     A = ' + Q59.f(S.p.A, 2) + ' mm²', mono: 1 }, { t: 'للنحاس N = 8.5×10²⁸ m⁻³' }, { t: 'vD = ' + Q31.sci(vD, 3) + ' m/s', mono: 1, c: '#1d4ed8', w: 900 }, { t: 'زمن الانجراف لمسافة متر واحد', c: '#334155' }, { t: isFinite(t1) ? Q59.f(t1 / 3600, 2) + ' h' : '∞', mono: 1, c: '#b91c1c', w: 900 }, { t: 'الحركة العشوائية سريعة لكن محصلتها صفر', c: '#64748b' }], { title: 'سرعة الانجراف' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); if (C.e) { C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e); }
      Q42.banner(ctx, w, 'أغلق المفتاح وراقب انجراف الإلكترون المعلَّم', '#a16207');
    },
    calc(ctx, x, y, pw, S) {
      Q59.panel(ctx, x, y, pw, 220, 'مثال 1: زر الحاسبة');
      const cx = x + 90, cy = y + 118; K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 10; ctx.fillStyle = '#334155'; rr(ctx, cx - 58, cy - 92, 116, 180, 14); ctx.fill(); ctx.restore(); ctx.fillStyle = '#bef264'; rr(ctx, cx - 46, cy - 80, 92, 34, 5); ctx.fill();
        for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { const on = r === 3 && c === 1 && S.press > 0; ctx.fillStyle = on ? '#f59e0b' : '#e2e8f0'; rr(ctx, cx - 42 + c * 30, cy - 34 + r * 30 + (on ? 2 : 0), 24, 22, 5); ctx.fill(); } });
      Q42.T(ctx, S.press > 0 ? '300 μA' : '0', cx + 30, cy - 63, { s: 13, w: 900, c: '#14532d', a: 'right' });
      Q42.T(ctx, 'Δt = 0.01 s', x + pw - 110, y + 80, { s: 13, w: 900, c: '#334155' }); Q42.T(ctx, 'I = 300 μA', x + pw - 110, y + 110, { s: 13, w: 900, c: '#334155' });
      Q42.T(ctx, 'Δq = 3×10⁻⁶ C', x + pw - 110, y + 150, { s: 13, w: 900, c: '#fff', bg: '#b45309' }); Q42.T(ctx, 'n = 1.9×10¹³', x + pw - 110, y + 186, { s: 13, w: 900, c: '#fff', bg: '#1d4ed8' });
      Q42.T(ctx, 'اضغط الزر', cx + 92, cy + 70, { s: 10, w: 800, c: '#64748b' });
    },
    chips(S, g) { return { m: Q59.chips(S, 'md', [['wire', 'السلك والمصباح'], ['ex1', 'مثال 1: الحاسبة'], ['ex2', 'مثال 2: سلك النحاس'], ['mm', 'سلك 1 mm و 1 A']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.ex = 0; S2.k = 0;
        if (k === 'ex2') { setParam(S2, 'I', 10); setParam(S2, 'A', 2); } if (k === 'mm') { setParam(S2, 'I', 1); setParam(S2, 'A', .785); } if (k === 'ex1') S2.press = 3; setParam(S2, 'sw', true); }, { bw: 170 }),
      e: EX[S.md] ? Q59.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { if (S2.md === 'ex1') S2.press = 3; }, EX[S.md].lines.length) : null }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), e0 = S.el[0], W = g.x1 - g.x0, H = g.y1 - g.y0, px = g.L + 24;
      const L = [{ id: 'el', x: g.x0 + e0[0] * W, y: g.y0 + e0[1] * H, r: 20, axis: 'xy', keep: true, tip: 'اسحب الإلكترون المعلَّم', idle: 'اسحب ✋', drag: (S2, d) => { S2.drg = 1; S2.el[0][0] = clamp((d.x - g.x0) / W, .01, .99); S2.el[0][1] = clamp((d.y - g.y0) / H, .05, .95); S2.tr = []; }, up: S2 => { S2.drg = 0; } }];
      if (S.md === 'ex1') L.push({ id: 'key', x: px + 90, y: 84 + 118 + 30, w: 110, h: 120, axis: 'none', hint: false, tip: 'اضغط زر الحاسبة', click: S2 => { S2.press = 2; } });
      else L.push({ id: 'swc', x: px + 185, y: 274, w: 70, h: 40, axis: 'none', hint: false, tip: 'اضغط: افتح أو أغلق المفتاح', click: S2 => setParam(S2, 'sw', !S2.p.sw) });
      return L.concat(C.m, C.e || []); },
    readings(S) { const v = D.vD(S); return [rd('التيار I', Q59.f(S.p.I, 1) + ' A'), rd('مساحة المقطع', Q59.f(S.p.A, 2) + ' mm²'), rd('سرعة الانجراف', Q31.sci(v, 3, 'm/s')), rd('زمن قطع 1 m', v > 0 ? Q59.f(1 / v / 3600, 2) + ' h' : '∞')]; },
    record(S) { const v = D.vD(S); return { I: Q59.f(S.p.I, 1), A: Q59.f(S.p.A, 2), v: Q31.sci(v, 3) }; },
    cols: [['I', 'I (A)'], ['A', 'A (mm²)'], ['v', 'vD (m/s)']],
    explain(S) { return Q26.ex('الإلكترون المعلَّم يتحرك بسرعة في كل الاتجاهات لكنه يتقدم ببطء شديد نحو اليسار، بينما يضيء المصباح فوراً.', 'التصادمات مع أيونات الشبيكة تبعثر حركة الإلكترونات، فتبقى سرعة الانجراف صغيرة vD = I / (A N e). أما المجال الكهربائي فيتكون في السلك كله بسرعة قريبة من سرعة الضوء فتتحرك كل الإلكترونات معاً.', 'عند فتح صنبور خرطوم مملوء بالماء يخرج الماء فوراً من الطرف الآخر مع أن كل قطرة تتحرك ببطء.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A3 — قانون أوم: الموصل الأومي وغير الأومي ومقارنة الماء (9-2، الأشكال 4 و 5، ص 198–199) =============== */
(() => {
  const D = { id: 'g11_i_ohm', page: 198, fig: 'الشكلان 4 و 5',
    desc: 'تتصادم الشحنات الحرة في أثناء حركتها مع بعضها ومع ذرات الموصل فتعيق حركتها، وهذه الإعاقة هي المقاومة R = ΔV / I. قانون أوم: التيار المار في موصل يتناسب طردياً مع فرق الجهد بين طرفيه عند ثبوت درجة حرارته. الموصل الأومي يعطي خطاً مستقيماً في مخطط I − ΔV ميله 1/R ، والموصل غير الأومي يعطي منحنياً.',
    tags: 'المقاومة الكهربائية قانون أوم R=V/I الأوم موصل أومي غير أومي مخطط التيار فرق الجهد ميل 1/R مصباح فتيل صنبور الماء مقياس الجريان الشكل 4 الشكل 5',
    tools: ['مجهز قدرة متغير الفولطية', 'أميتر', 'فولطميتر', 'مقاوم ثابت ومصباح فتيل', 'صنبور ماء ومقياس جريان (للمقارنة)'],
    steps: ['اسحب مقبض المجهز (أو غيّر ΔV من اللوحة) ثم اضغط «سجّل القراءة» عدة مرات.', 'لاحظ أن نقاط المقاوم تقع على خط مستقيم يمر بنقطة الأصل ميله 1/R.', 'بدّل إلى المصباح وسجّل القراءات: المنحني يميل لأن مقاومة الفتيل تزداد بسخونته.', 'اختر «مقارنة الماء: الشكل 4» لترى أن فرق الجهد يشبه فرق ارتفاع الماء، والتيار يشبه معدل الجريان.'],
    concl: ['R = ΔV / I ، ووحدة المقاومة الأوم Ω = V/A.', 'للموصل الأومي I يتناسب طردياً مع ΔV والمخطط خط مستقيم ميله 1/R.', 'المصباح موصل غير أومي: مقاومته تزداد مع ارتفاع درجة حرارة فتيله.', 'زيادة فتحة الصنبور تزيد جريان الماء كما تزيد زيادة فرق الجهد التيار.'],
    laws: ['g11_l9_ohm'],
    controls: [R('V', 'فرق الجهد ΔV', 0, 12, 6, .5, 'V'), R('R', 'مقاومة المقاوم', 5, 30, 10, 1, 'Ω'), TG('fl', 'حركة الشحنات', true, null, 'flow')],
    setup(S) { S.el = 'res'; S.md = 'lab'; S.pts = { res: [], lamp: [] }; S.Vd = 6; S.Id = 0; S.fp = 0; S.lv = 0; },
    Rl(S, V) { return S.el === 'lamp' ? S.p.R * (.4 + .12 * V) : S.p.R; },
    I(S, V) { V = V == null ? S.p.V : V; return V / D.Rl(S, V); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, gx: L + 70, gy: 108, gw: w - L - 470, gh: 170 }; },
    update(S, dt) { S.Vd = Q59.ease(S.Vd, S.p.V, dt, 8); S.Id = Q59.ease(S.Id, D.I(S), dt, 8); Q33.adv(S, dt, S.p.fl ? S.Id : 0, 90); S.lv = Q59.ease(S.lv, S.p.V / 12, dt, 5); },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q59.bg(ctx, w, h);
      const ImaxR = 12 / 5, Im = S.el === 'lamp' ? 1.2 : Math.max(.4, Math.ceil(12 / S.p.R * 5) / 5);
      const A = Q52.axes(ctx, { x: g.gx, y: g.gy, w: g.gw, h: g.gh, x0: 0, x1: 12, y0: 0, y1: Im, xs: 1, ys: Im / 6, lx: 2, ly: Im / 3, xl: 'ΔV (V)', yl: 'I (A)', col: '#a16207' }); void ImaxR;
      if (S.el === 'res') Q41.line(ctx, [[A.X(0), A.Y(0)], [A.X(12), A.Y(12 / S.p.R)]], 'rgba(202,138,4,.45)', 1.6, [5, 4]);
      else { const P = []; for (let v = 0; v <= 12.01; v += .25) P.push([A.X(v), A.Y(D.I(S, v))]); Q41.line(ctx, P, 'rgba(220,38,38,.4)', 1.6, [5, 4]); }
      ['res', 'lamp'].forEach(k => S.pts[k].forEach(q => Q41.dot(ctx, A.X(q[0]), A.Y(q[1]), k === 'res' ? '#ca8a04' : '#dc2626', 5)));
      Q41.dot(ctx, A.X(S.Vd), A.Y(S.Id), '#0f172a', 3.5);
      Q42.T(ctx, S.el === 'res' ? 'أومي: خط مستقيم' : 'غير أومي: منحنٍ', g.gx + g.gw - 70, g.gy + 12, { s: 10.5, w: 900, c: '#fff', bg: S.el === 'res' ? '#ca8a04' : '#dc2626' });
      if (S.md === 'water') D.water(ctx, w, h, S); else D.lab(ctx, w, h, S);
      const R = D.Rl(S, S.p.V), I = D.I(S);
      Q59.card(ctx, S, [{ t: 'ΔV = ' + Q59.f(S.p.V, 1) + ' V', mono: 1 }, { t: 'I = ' + Q59.f(I, 3) + ' A', mono: 1 }, { t: 'R = ΔV / I = ' + (S.p.V > 0 ? Q59.f(R, 2) : '—') + ' Ω', mono: 1, c: '#b45309', w: 900 }, { t: S.el === 'res' ? 'المقاومة ثابتة مهما تغير ΔV' : 'مقاومة الفتيل تزداد مع سخونته', c: S.el === 'res' ? '#15803d' : '#b91c1c', w: 800 }, { t: 'النقاط المسجلة: ' + S.pts[S.el].length, c: '#64748b' }], { title: S.el === 'res' ? 'قانون أوم: المقاوم' : 'المصباح: موصل غير أومي' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.e); Q42.drawChips(ctx, C.r);
      Q42.banner(ctx, w, 'غيّر فرق الجهد وسجّل القراءات على المخطط', '#a16207');
    },
    supply(ctx, x, y, V) { // variable DC supply box centre (x,y)
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4; const g = ctx.createLinearGradient(0, y - 46, 0, y + 46); g.addColorStop(0, '#475569'); g.addColorStop(1, '#1e293b'); ctx.fillStyle = g; rr(ctx, x - 75, y - 46, 150, 92, 10); ctx.fill(); ctx.restore();
        ctx.fillStyle = '#052e16'; rr(ctx, x - 62, y - 34, 74, 30, 4); ctx.fill(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(x + 48, y - 46, 7, 0, TAU); ctx.fill(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(x - 48, y - 46, 7, 0, TAU); ctx.fill();
        const a = -Math.PI * .75 + V / 12 * Math.PI * 1.5, gk = ctx.createRadialGradient(x + 38, y + 14, 2, x + 40, y + 16, 18); gk.addColorStop(0, '#e2e8f0'); gk.addColorStop(1, '#64748b'); ctx.fillStyle = gk; ctx.beginPath(); ctx.arc(x + 40, y + 16, 17, 0, TAU); ctx.fill(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 40, y + 16); ctx.lineTo(x + 40 + Math.sin(a) * 14, y + 16 - Math.cos(a) * 14); ctx.stroke(); });
      Q42.T(ctx, Q59.f(V, 1) + ' V', x - 25, y - 19, { s: 13, w: 900, c: '#4ade80' }); Q42.T(ctx, 'مجهز قدرة', x - 25, y + 20, { s: 10, w: 900, c: '#e2e8f0' });
      return { p: [x + 48, y - 46], n: [x - 48, y - 46] };
    },
    lab(ctx, w, h, S) {
      const L = Q42.L(S), sx = L + 120, sy = 520, y = 430, s = D.supply(ctx, sx, sy, S.Vd);
      const am = Q33.meter(ctx, L + 300, y - 30, 'A', S.Id, S.el === 'lamp' ? 1.5 : Math.max(.5, 12 / S.p.R), { flip: 1, d: 3, name: 'أميتر' });
      let c; const cx = L + 470; if (S.el === 'lamp') { const b = Q33.bulb(ctx, cx, y, S.Id * 1.3, { s: 1.2 }); c = { a: b.a, b: b.b }; } else c = Q33.res(ctx, cx, y, S.p.R, {});
      const vm = Q33.meter(ctx, cx, y + 110, 'V', S.Vd, 12, { flip: 1, d: 1, name: 'فولطميتر' });
      const ex = w - 70, Wa = [s.p, [s.p[0], y - 2], [am.p[0], y - 2], am.p], Wb = [am.n, [am.n[0] + 30, y], c.a], Wc = [c.b, [ex, y], [ex, 610], [s.n[0] - 40, 610], [s.n[0] - 40, s.n[1]], s.n];
      [Wa, Wb, Wc].forEach((p, i) => Q33.wire(ctx, p, { col: i === 2 ? '#111827' : '#dc2626' }));
      Q33.wire(ctx, [[c.a[0] - 14, y], [c.a[0] - 14, vm.p[1]], vm.p], { col: '#f59e0b' }); Q33.wire(ctx, [[c.b[0] + 14, y], [c.b[0] + 14, vm.n[1]], vm.n], { col: '#f59e0b' });
      if (S.p.fl && S.Id > .005) [Wa, Wb, Wc].forEach(p => Q33.flow(ctx, p, S.fp, 'c'));
      Q42.T(ctx, 'اسحب المقبض', sx + 40, sy + 60, { s: 10, w: 800, c: '#334155' });
    },
    water(ctx, w, h, S) {
      const L = Q42.L(S), x0 = L + 24, y0 = 330, pw = (w - L - 70) / 2;
      Q59.panel(ctx, x0, y0, pw, 280, 'الماء: الصنبور ومقياس الجريان'); Q59.panel(ctx, x0 + pw + 12, y0, pw, 280, 'الكهرباء: البطارية والأميتر والمصباح');
      // tank + tap + flow meter
      const tx = x0 + 30, lvl = 60 + 100 * S.lv, fl = D.I(S) / (S.el === 'lamp' ? 1 : 12 / S.p.R);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(56,189,248,.6)'; ctx.fillRect(tx, y0 + 210 - lvl, 70, lvl); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.strokeRect(tx, y0 + 50, 70, 160);
        ctx.fillStyle = '#94a3b8'; ctx.fillRect(tx + 70, y0 + 196, pw - 130, 10); ctx.fillStyle = 'rgba(56,189,248,.8)'; ctx.fillRect(tx + 70, y0 + 198, (pw - 130) * Math.min(1, .2 + S.lv), 6);
        ctx.fillStyle = '#dc2626'; rr(ctx, tx + 92, y0 + 178, 16, 18, 3); ctx.fill(); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(tx + 175, y0 + 201, 20, 0, TAU); ctx.fill(); ctx.stroke(); });
      for (let k = 0; k < 6; k++) { const a = S.fp * .05 + k; Q41.dot(ctx, tx + 175 + Math.cos(a) * 12, y0 + 201 + Math.sin(a) * 12, '#0ea5e9', 2.5); }
      Q42.T(ctx, 'ارتفاع الماء يشبه ΔV', tx + 60, y0 + 38, { s: 10, w: 900, c: '#0369a1' }); Q42.T(ctx, 'مقياس الجريان يشبه الأميتر', tx + 170, y0 + 240, { s: 10, w: 900, c: '#0369a1' }); Q42.T(ctx, 'الصنبور', tx + 100, y0 + 165, { s: 10, w: 800, c: '#b91c1c' });
      // electric side
      const bx = x0 + pw + 12, c = Q33.cell(ctx, bx + 80, y0 + 220, { V: Q59.f(S.p.V, 1), w: 80, h: 28 }), b = Q33.bulb(ctx, bx + pw - 70, y0 + 130, S.Id * 1.2, {}); const m = Q33.meter(ctx, bx + 110, y0 + 95, 'A', S.Id, S.el === 'lamp' ? 1.5 : Math.max(.5, 12 / S.p.R), { w: 74, h: 60, d: 2 });
      Q33.wire(ctx, [c.p, [bx + pw - 30, y0 + 220], [bx + pw - 30, y0 + 130], b.b], { col: '#dc2626' }); Q33.wire(ctx, [c.n, [bx + 24, y0 + 220], [bx + 24, m.n[1]], m.n], { col: '#111827' }); Q33.wire(ctx, [m.p, [b.a[0], m.p[1]], b.a], { col: '#dc2626' }); void fl;
    },
    chips(S, g) { return { e: Q59.chips(S, 'el', [['res', 'أومي: مقاوم'], ['lamp', 'غير أومي: مصباح'], ['lab', 'الدائرة: الشكل 5'], ['water', 'مقارنة الماء: الشكل 4']], g.h - 128, '', (S2, k) => { if (k === 'lab' || k === 'water') S2.md = k; else S2.el = k; }, { bw: 175 }).map(b => { b._on = b.id.endsWith(S.el) || b.id.endsWith(S.md); return b; }),
      r: Q59.chips(S, 'rec', [['rec', '● سجّل القراءة'], ['auto', 'سجّل سلسلة كاملة'], ['clr', 'امسح النقاط']], g.h - 84, '', (S2, k) => { const L = S2.pts[S2.el]; if (k === 'clr') S2.pts[S2.el] = []; if (k === 'rec' && !L.some(q => Math.abs(q[0] - S2.p.V) < .01)) L.push([S2.p.V, D.I(S2)]); if (k === 'auto') { S2.pts[S2.el] = []; for (let v = 0; v <= 12; v += 1.5) S2.pts[S2.el].push([v, D.I(S2, v)]); } }, { bw: 175 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), L = Q42.L(S);
      const it = S.md === 'water' ? { id: 'tap', x: L + 24 + 30 + 100, y: 330 + 187, r: 22, axis: 'y', keep: true, tip: 'اسحب: افتح الصنبور أكثر', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'V', Math.round(clamp((517 - d.y) / 8 + 6, 0, 12) * 2) / 2) }
        : { id: 'knob', x: L + 160, y: 536, r: 22, axis: 'x', keep: true, tip: 'اسحب: غيّر فرق الجهد', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'V', Math.round(clamp((d.x - L - 100) / 10, 0, 12) * 2) / 2) };
      return [it, { id: 'gr', x: g.gx + g.gw / 2, y: g.gy + g.gh / 2, w: g.gw, h: g.gh, axis: 'none', hint: false, tip: 'اضغط: سجّل القراءة', click: S2 => { const P = S2.pts[S2.el]; if (!P.some(q => Math.abs(q[0] - S2.p.V) < .01)) P.push([S2.p.V, D.I(S2)]); } }].concat(C.e, C.r); },
    readings(S) { return [rd('فرق الجهد ΔV', Q59.f(S.p.V, 1) + ' V'), rd('التيار I', Q59.f(D.I(S), 3) + ' A'), rd('المقاومة R = ΔV/I', S.p.V > 0 ? Q59.f(D.Rl(S, S.p.V), 2) + ' Ω' : '—'), rd('العنصر', S.el === 'res' ? 'مقاوم أومي' : 'مصباح غير أومي')]; },
    record(S) { return { V: Q59.f(S.p.V, 1), I: Q59.f(D.I(S), 3), R: S.p.V > 0 ? Q59.f(D.Rl(S, S.p.V), 2) : '—' }; },
    cols: [['V', 'ΔV (V)'], ['I', 'I (A)'], ['R', 'R (Ω)']],
    explain(S) { return Q26.ex(S.el === 'res' ? 'كلما ضاعفت فرق الجهد تضاعف التيار، والنقاط على خط مستقيم.' : 'التيار في المصباح يزداد ببطء أكثر مما يتوقع والمنحني يميل نحو الأفقي.', 'R = ΔV / I. المقاومة تنشأ من تصادم الشحنات الحرة مع ذرات الموصل. في المصباح ترتفع حرارة الفتيل فتزداد التصادمات والمقاومة، لذا لا ينطبق عليه قانون أوم.', 'فتح الصنبور أكثر يزيد جريان الماء، كما تزيد زيادة فرق الجهد التيار المار في المصباح.'); }
  };
  M8.P[D.id] = D;
})();

/* digital multimeter (shared) */
Q59.dmm = function (ctx, x, y, txt, lab, col = '#facc15') {
  K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4; ctx.fillStyle = col; rr(ctx, x - 70, y - 60, 140, 120, 14); ctx.fill(); ctx.restore(); ctx.fillStyle = '#1f2937'; rr(ctx, x - 62, y - 52, 124, 104, 10); ctx.fill();
    ctx.fillStyle = '#d9f99d'; rr(ctx, x - 52, y - 44, 104, 36, 4); ctx.fill(); const g = ctx.createRadialGradient(x - 4, y + 18, 2, x, y + 22, 18); g.addColorStop(0, '#e5e7eb'); g.addColorStop(1, '#4b5563'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y + 22, 17, 0, TAU); ctx.fill();
    ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(x + 44, y + 40, 5, 0, TAU); ctx.fill(); ctx.fillStyle = '#111827'; ctx.strokeStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(x - 44, y + 40, 5, 0, TAU); ctx.fill(); ctx.stroke(); });
  Q42.T(ctx, txt, x, y - 26, { s: 14, w: 900, c: '#14532d' }); if (lab) Q42.T(ctx, lab, x, y - 74, { s: 10.5, w: 900, c: '#334155' });
  return { p: [x + 44, y + 40], n: [x - 44, y + 40] };
};

/* =============== A4 — المقاومية R = ρ L / A: الجدول 1 والمثال 3 (9-2، ص 200–201) =============== */
(() => {
  const MAT = [['ag', 'فضة', 1.6e-8, '#cbd5e1'], ['cu', 'نحاس', 1.72e-8, '#ea580c'], ['au', 'ذهب', 2.44e-8, '#eab308'], ['al', 'ألمنيوم', 2.8e-8, '#94a3b8'], ['w', 'تنكستن', 5.6e-8, '#64748b'], ['ni', 'نايكروم', 100e-8, '#78716c'], ['si', 'سليكون نقي', 3e3, '#334155'], ['gl', 'زجاج', 1e10, '#7dd3fc']];
  const EX = { title: 'مثال 3 ص 201', q: 'سلك نحاس مساحة مقطعه 4 mm² وطوله 2 m ، ومقاوميته 1.72×10⁻⁸ Ω·m. احسب مقاومته، وفرق الجهد بين طرفيه عندما يمر فيه تيار 10 A.', lines: ['R = ρ L / A', 'R = 1.72×10⁻⁸ × 2 / 4×10⁻⁶', 'R = 8.6×10⁻³ Ω', 'ΔV = I R = 10 × 8.6×10⁻³', 'فرق الجهد ΔV = 0.086 V'] };
  const D = { id: 'g11_i_rho', page: 200, fig: 'الجدول 1 + مثال 3',
    desc: 'مقاومة الموصل تتناسب طردياً مع طوله L وعكسياً مع مساحة مقطعه A: R = ρ L / A ، حيث ρ المقاومية (Ω·m) وتعتمد على نوع المادة ودرجة حرارتها. المقاومية صفة للمادة والمقاومة صفة للجسم، كما الكثافة صفة للمادة والكتلة صفة للجسم. والموصلية σ = 1/ρ.',
    tags: 'المقاومية ρ R=ρL/A الطول مساحة المقطع الموصلية σ الجدول 1 فضة نحاس ذهب ألمنيوم تنكستن نايكروم سليكون زجاج مثال 3 8.6×10^-3',
    tools: ['لوح عليه سلك مشدود فوق مسطرة مترية', 'ماسك متحرك (تمساح)', 'أوميتر رقمي', 'أسلاك من مواد ومقاطع مختلفة'],
    steps: ['اسحب الماسك على السلك: كلما زاد الطول L زادت المقاومة بالنسبة نفسها.', 'غيّر مساحة المقطع من اللوحة: مضاعفة المساحة تنصّف المقاومة.', 'اختر مادة أخرى من الأزرار أو من الجدول: المقاومة تتبع المقاومية ρ.', 'اضغط «مثال 3» ثم «الحل خطوة خطوة».'],
    concl: ['R = ρ L / A: طردياً مع الطول وعكسياً مع المساحة.', 'الفضة أقل المواد مقاومية ثم النحاس، والزجاج عازل مقاوميته 10¹⁰ Ω·m.', 'المقاومية صفة للمادة والمقاومة صفة للجسم.', 'مثال 3: R = 8.6×10⁻³ Ω و ΔV = 0.086 V.'],
    laws: ['g11_l9_rho'],
    controls: [R('L', 'الطول L', .1, 2, 1, .05, 'm'), R('A', 'مساحة المقطع A', .5, 4, 1, .5, 'mm²'), TG('tbl', 'الجدول 1: المقاومية', true, null, 'table')],
    setup(S) { S.m = 'cu'; S.ex = 0; S.k = 0; S.Ld = 1; S.Ad = 1; },
    mat(S) { return MAT.find(q => q[0] === S.m); },
    R(S) { return D.mat(S)[2] * S.p.L / (S.p.A * 1e-6); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 70, x1: w - 60, wy: 470 }; },
    update(S, dt) { S.Ld = Q59.ease(S.Ld, S.p.L, dt, 12); S.Ad = Q59.ease(S.Ad, S.p.A, dt, 8); },
    fmtR(R) { return R < 1 ? Q59.f(R * 1000, 2) + ' mΩ' : R < 1e4 ? Q59.f(R, 2) + ' Ω' : Q31.sci(R, 3, 'Ω'); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), M = D.mat(S), X = m => g.x0 + m / 2 * (g.x1 - g.x0), R = D.R(S); Q59.bg(ctx, w, h);
      if (S.p.tbl) { const px = g.L + 24, pw = w - 360 - px; Q59.panel(ctx, px, 84, pw, 236, 'الجدول 1: المقاومية في 20°C');
        MAT.forEach((q, i) => { const y = 112 + i * 25, f = (Math.log10(q[2]) + 8.5) / 19, on = q[0] === S.m; K.raw(ctx, () => { ctx.fillStyle = on ? 'rgba(250,204,21,.35)' : 'rgba(0,0,0,0)'; rr(ctx, px + 6, y - 11, pw - 12, 22, 5); ctx.fill(); ctx.fillStyle = q[3]; rr(ctx, px + 96, y - 6, (pw - 200) * f, 12, 4); ctx.fill(); });
          Q42.T(ctx, q[1], px + 50, y, { s: 10.5, w: on ? 900 : 700, c: '#0f172a' }); Q42.T(ctx, Q31.sci(q[2], 3), px + pw - 50, y, { s: 10, w: 800, c: '#7c2d12' }); });
        Q42.T(ctx, 'المقياس لوغاريتمي', px + pw / 2, 318, { s: 9, w: 700, c: '#64748b' }); }
      // board + ruler + wire
      Q33.board(ctx, g.x0 - 50, g.wy - 90, g.x1 - g.x0 + 100, 190);
      Q52.ruler(ctx, X, 0, 2, g.wy + 30, .1, { sub: 2, lab: 5, unit: 'm' });
      const th = 2 + Math.sqrt(S.Ad) * 3.2; K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.wy - th, 0, g.wy + th); gr.addColorStop(0, shade(M[3], 40)); gr.addColorStop(.5, M[3]); gr.addColorStop(1, shade(M[3], -40)); ctx.fillStyle = gr; ctx.fillRect(X(0), g.wy - th / 2, X(2) - X(0), th);
        ctx.fillStyle = 'rgba(250,204,21,.35)'; ctx.fillRect(X(0), g.wy - th / 2 - 4, X(S.Ld) - X(0), th + 8); });
      [0, 2].forEach(m => K.raw(ctx, () => { const gb = ctx.createLinearGradient(X(m) - 9, 0, X(m) + 9, 0); gb.addColorStop(0, '#a16207'); gb.addColorStop(.5, '#fde68a'); gb.addColorStop(1, '#a16207'); ctx.fillStyle = gb; rr(ctx, X(m) - 9, g.wy - 26, 18, 34, 4); ctx.fill(); }));
      Q42.T(ctx, 'سلك ' + M[1] + ' مقطعه ' + Q59.f(S.p.A, 1) + ' mm²', X(0) + 100, g.wy - 80, { s: 11, w: 900, c: '#7c2d12' });
      // clip + meter
      const cx = X(S.Ld); K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(cx - 7, g.wy - 6); ctx.lineTo(cx + 7, g.wy - 6); ctx.lineTo(cx + 12, g.wy - 34); ctx.lineTo(cx - 12, g.wy - 34); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#7f1d1d'; ctx.fillRect(cx - 12, g.wy - 40, 24, 8); });
      const mx = g.L + 120, my = 225 + (S.p.tbl ? 1000 : 0); void my;
      const mm = Q59.dmm(ctx, w - 160, g.wy - 160 + (S.p.tbl ? 0 : 0), D.fmtR(R), 'أوميتر');
      Q33.wire(ctx, [mm.n, [mm.n[0], g.wy - 108], [X(0) - 20, g.wy - 108], [X(0) - 20, g.wy - 40], [X(0), g.wy - 26]], { col: '#111827' }); Q33.wire(ctx, [mm.p, [mm.p[0] + 20, mm.p[1]], [mm.p[0] + 20, g.wy - 58], [cx, g.wy - 58], [cx, g.wy - 40]], { col: '#dc2626' }); void mx;
      Q42.T(ctx, 'L = ' + Q59.f(S.Ld, 2) + ' m', cx, g.wy + 70, { s: 11, w: 900, c: '#fff', bg: '#dc2626' });
      if (S.ex) Q59.steps(ctx, S, Object.assign({}, EX, { k: S.k }), { y: S.p.tbl ? 70 : 70 });
      else Q59.card(ctx, S, [{ t: 'المادة: ' + M[1], w: 900 }, { t: 'ρ = ' + Q31.sci(M[2], 3, 'Ω·m'), mono: 1 }, { t: 'L = ' + Q59.f(S.p.L, 2) + ' m     A = ' + Q59.f(S.p.A, 1) + ' mm²', mono: 1 }, { t: 'R = ρ L / A = ' + D.fmtR(R), mono: 1, c: '#b45309', w: 900 }, { t: 'σ = 1/ρ = ' + Q31.sci(1 / M[2], 3) + ' (Ω·m)⁻¹', mono: 1, c: '#15803d' }], { title: 'R = ρ L / A' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'اسحب الماسك الأحمر وغيّر المادة والمقطع', '#a16207');
    },
    chips(S, g) { return { m: Q59.chips(S, 'mt', MAT.slice(0, 6).map(q => [q[0], q[1]]), g.h - 128, S.m, (S2, k) => { S2.m = k; S2.ex = 0; }, { bw: 112 }),
      e: Q59.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 3: الحل خطوة خطوة', S2 => { S2.m = 'cu'; setParam(S2, 'L', 2); setParam(S2, 'A', 4); }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), X = m => g.x0 + m / 2 * (g.x1 - g.x0);
      const L = [{ id: 'clip', x: X(S.Ld), y: g.wy - 24, r: 24, axis: 'x', keep: true, tip: 'اسحب الماسك: غيّر الطول', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'L', Math.round(clamp((d.x - g.x0) / (g.x1 - g.x0) * 2, .1, 2) * 20) / 20) }];
      if (S.p.tbl) { const px = g.L + 24, pw = S.W - 360 - px; MAT.forEach((q, i) => L.push({ id: 'row' + q[0], x: px + pw / 2, y: 112 + i * 25, w: pw - 12, h: 22, axis: 'none', hint: false, tip: 'اختر ' + q[1], click: S2 => { S2.m = q[0]; S2.ex = 0; } })); }
      return L.concat(C.m, C.e); },
    readings(S) { const M = D.mat(S); return [rd('المادة', M[1]), rd('المقاومية ρ', Q31.sci(M[2], 3, 'Ω·m')), rd('الطول L', Q59.f(S.p.L, 2) + ' m'), rd('المساحة A', Q59.f(S.p.A, 1) + ' mm²'), rd('المقاومة R', D.fmtR(D.R(S)))]; },
    record(S) { return { m: D.mat(S)[1], L: Q59.f(S.p.L, 2), A: Q59.f(S.p.A, 1), R: D.fmtR(D.R(S)) }; },
    cols: [['m', 'المادة'], ['L', 'L (m)'], ['A', 'A (mm²)'], ['R', 'R']],
    explain(S) { return Q26.ex('مضاعفة الطول تضاعف قراءة الأوميتر، ومضاعفة المساحة تنصّفها، والفضة والنحاس أقل المواد مقاومة.', 'في السلك الأطول تمر الشحنات بعدد أكبر من الذرات فتزداد التصادمات، وفي السلك الأسمك تتوفر مسارات أكثر للشحنات. لذلك R = ρ L / A.', 'تصنع أسلاك التوصيل المنزلية من النحاس، ويصنع ملف المدفأة من النايكروم لكبر مقاوميته.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A5 — المقاومية ودرجة الحرارة: الجدول 2 والمثال 4 (9-3، ص 202–203) =============== */
(() => {
  const MAT = [['al', 'ألمنيوم', 39e-4, '#94a3b8'], ['cu', 'نحاس', 39.3e-4, '#ea580c'], ['c', 'كاربون', -5e-4, '#1f2937'], ['fe', 'حديد', 50e-4, '#78716c'], ['pb', 'رصاص', 43e-4, '#64748b'], ['hg', 'زئبق', 8.8e-4, '#cbd5e1'], ['ag', 'فضة', 38e-4, '#e2e8f0'], ['w', 'تنكستن', 45e-4, '#475569']];
  const CK = ['ck', 'سلك الطباخ', 2e-3, '#b45309'];
  const EX = { title: 'مثال 4 ص 203', q: 'سلك طباخ كهربائي طوله 1.1 m ومساحة مقطعه 3.1×10⁻⁶ m² ، مقاوميته 6.8×10⁻⁵ Ω·m في 320°C ومعامله الحراري 2.0×10⁻³ °C⁻¹. احسب مقاومته في 420°C.', lines: ['ρ = ρ0 [1 + α (T − T0)]', 'ρ = 6.8×10⁻⁵ [1 + 2×10⁻³ × (420 − 320)]', 'ρ = 6.8×10⁻⁵ × 1.2 = 8.16×10⁻⁵ Ω·m', 'R = ρ L / A = 8.16×10⁻⁵ × 1.1 / 3.1×10⁻⁶', 'مقاومة السلك R = 29 Ω'] };
  const D = { id: 'g11_i_temp', page: 202, fig: 'الجدول 2 + مثال 4',
    desc: 'تتغير مقاومية الموصل مع درجة الحرارة: ρ = ρ0[1 + α(T − T0)] ، حيث T0 = 20°C و α المعامل الحراري للمقاومية (°C⁻¹). في الفلزات تزداد المقاومة بارتفاع درجة الحرارة (α موجب)، أما أشباه الموصلات والكاربون والمحاليل الإلكتروليتية فتقل مقاومتها (α سالب). وتزداد مقاومة فتيل المصباح أكثر من عشرة أمثال عند توهجه.',
    tags: 'المقاومية ودرجة الحرارة المعامل الحراري للمقاومية α الجدول 2 ألمنيوم نحاس كاربون حديد رصاص زئبق فضة تنكستن مثال 4 سلك الطباخ 29 Ω المقاوم الحراري الثرمستور المحرار البلاتيني',
    tools: ['ملف سلك داخل حمام زيت', 'مسخن (لهب)', 'محرار', 'أوميتر رقمي'],
    steps: ['اسحب مقبض اللهب (أو غيّر T من اللوحة): ترتفع درجة الحرارة تدريجياً وتزداد قراءة الأوميتر.', 'اختر «كاربون» من الأزرار: مقاومته تقل بارتفاع درجة الحرارة لأن α سالب.', 'قارن ميل الخط للفلزات المختلفة في المخطط.', 'اضغط «مثال 4» ثم «الحل خطوة خطوة».'],
    concl: ['ρ = ρ0[1 + α(T − T0)] و R = R0[1 + α(T − T0)].', 'α موجب للفلزات فتزداد مقاومتها بالتسخين، وسالب للكاربون وأشباه الموصلات.', 'تستعمل هذه الخاصية في المحرار المقاومي (البلاتين) والمقاوم الحراري في دوائر إنذار الحريق.', 'مثال 4: R = 29 Ω في 420°C.'],
    laws: ['g11_l9_temp'],
    controls: [R('T', 'درجة الحرارة المطلوبة T', -50, 500, 20, 5, '°C'), R('R0', 'المقاومة R0 في 20°C', 10, 100, 50, 1, 'Ω'), TG('gr', 'مخطط المقاومة − درجة الحرارة', true, null, 'chart')],
    setup(S) { S.m = 'cu'; S.Tn = 20; S.ex = 0; S.k = 0; S.bub = 0; },
    mat(S) { return S.m === 'ck' ? CK : MAT.find(q => q[0] === S.m); },
    T0(S) { return S.m === 'ck' ? 320 : 20; },
    R0(S) { return S.m === 'ck' ? 6.8e-5 * 1.1 / 3.1e-6 : S.p.R0; },
    R(S, T) { return D.R0(S) * (1 + D.mat(S)[2] * (T - D.T0(S))); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, bx: L + 160, by: 560 }; },
    update(S, dt) { S.Tn = Q59.ease(S.Tn, S.p.T, dt, 1.2); S.bub += dt; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), M = D.mat(S), T = S.Tn, R = D.R(S, T), R0 = D.R0(S); Q59.bg(ctx, w, h);
      if (S.p.gr) { const ym = Math.max(2, Math.ceil(D.R(S, 500) / R0 * 2) / 2) * R0, A = Q52.axes(ctx, { x: g.L + 70, y: 100, w: w - g.L - 470, h: 180, x0: -50, x1: 500, y0: 0, y1: ym, xs: 50, ys: ym / 8, lx: 100, ly: ym / 4, xl: 'T (°C)', yl: 'R (Ω)', col: '#a16207' });
        if (S.m !== 'ck') MAT.forEach(q => { if (q[0] !== S.m) Q41.line(ctx, [[A.X(-50), A.Y(R0 * (1 + q[2] * -70))], [A.X(500), A.Y(R0 * (1 + q[2] * 480))]], 'rgba(148,163,184,.45)', 1.2); });
        Q41.line(ctx, [[A.X(-50), A.Y(D.R(S, -50))], [A.X(500), A.Y(D.R(S, 500))]], M[3] === '#e2e8f0' ? '#94a3b8' : M[3], 3); Q41.dot(ctx, A.X(T), A.Y(R), '#dc2626', 6); }
      // bath + coil + burner
      const bx = g.bx, by = g.by, hot = clamp((T + 50) / 550, 0, 1);
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#475569'; ctx.fillRect(bx - 70, by - 4, 140, 8); ctx.fillRect(bx - 66, by, 6, 50); ctx.fillRect(bx + 60, by, 6, 50);
        const gl = ctx.createLinearGradient(0, by - 150, 0, by); gl.addColorStop(0, 'rgba(254,243,199,.5)'); gl.addColorStop(1, 'rgba(' + Math.round(250) + ',' + Math.round(204 - 120 * hot) + ',' + Math.round(21 + 30 * (1 - hot)) + ',.55)'); ctx.fillStyle = gl; ctx.fillRect(bx - 56, by - 130, 112, 126);
        ctx.strokeStyle = 'rgba(100,116,139,.9)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx - 58, by - 160); ctx.lineTo(bx - 58, by - 4); ctx.lineTo(bx + 58, by - 4); ctx.lineTo(bx + 58, by - 160); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(bx - 52, by - 150, 6, 140);
        ctx.strokeStyle = M[3] === '#e2e8f0' ? '#94a3b8' : M[3]; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const t = k / 60, x = bx - 36 + 72 * t, y = by - 70 + 22 * Math.sin(t * TAU * 5); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
        if (hot > .45) { ctx.fillStyle = 'rgba(255,255,255,.6)'; for (let k = 0; k < 7; k++) { const yy = by - 10 - ((S.bub * 40 * hot + k * 23) % 115); ctx.beginPath(); ctx.arc(bx - 40 + k * 13, yy, 2 + k % 3, 0, TAU); ctx.fill(); } }
        // flame
        const fh = 16 + 46 * hot; ctx.fillStyle = '#334155'; rr(ctx, bx - 14, by + 50, 28, 26, 4); ctx.fill(); const gf = ctx.createRadialGradient(bx, by + 50 - fh * .3, 2, bx, by + 50 - fh * .3, fh * .8); gf.addColorStop(0, 'rgba(219,234,254,.95)'); gf.addColorStop(.4, 'rgba(59,130,246,.85)'); gf.addColorStop(1, 'rgba(59,130,246,0)'); ctx.fillStyle = gf;
        ctx.beginPath(); ctx.moveTo(bx - 12, by + 50); ctx.quadraticCurveTo(bx - 14, by + 50 - fh * .6, bx + 2 * Math.sin(S.bub * 17), by + 50 - fh); ctx.quadraticCurveTo(bx + 14, by + 50 - fh * .6, bx + 12, by + 50); ctx.closePath(); ctx.fill(); ctx.restore(); });
      // thermometer
      const tx = bx + 24, ty0 = by - 200, ty1 = by - 30, f = (T + 50) / 550; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; rr(ctx, tx - 6, ty0, 12, ty1 - ty0, 6); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(tx, ty1 + 4, 9, 0, TAU); ctx.fill(); ctx.fillRect(tx - 2.5, ty1 - (ty1 - ty0 - 10) * f, 5, (ty1 - ty0 - 10) * f + 4); });
      Q42.T(ctx, Q59.f(T, 0) + ' °C', tx + 44, ty0 + 10, { s: 12, w: 900, c: '#fff', bg: '#dc2626' });
      const mm = Q59.dmm(ctx, w - 170, by - 90, Q59.f(R, 2) + ' Ω', 'أوميتر');
      Q33.wire(ctx, [mm.n, [mm.n[0], by - 110], [bx + 90, by - 110], [bx + 90, by - 178], [bx - 36, by - 178], [bx - 36, by - 70]], { col: '#111827' }); Q33.wire(ctx, [mm.p, [mm.p[0], by + 20], [bx + 100, by + 20], [bx + 100, by - 168], [bx + 36, by - 168], [bx + 36, by - 70]], { col: '#dc2626' });
      Q42.T(ctx, M[1] + ' α = ' + Q59.f(M[2] * 1e4, 1) + '×10⁻⁴', bx, by + 92, { s: 11, w: 900, c: '#7c2d12' });
      if (S.ex) Q59.steps(ctx, S, Object.assign({}, EX, { k: S.k }));
      else Q59.card(ctx, S, [{ t: 'R = R0 [1 + α (T − T0)]', mono: 1 }, { t: 'R0 = ' + Q59.f(R0, 2) + ' Ω     T0 = ' + D.T0(S) + ' °C', mono: 1 }, { t: 'α = ' + Q59.f(M[2] * 1e4, 1) + '×10⁻⁴ °C⁻¹', mono: 1 }, { t: 'R = ' + Q59.f(R, 2) + ' Ω', mono: 1, c: '#b45309', w: 900 }, { t: M[2] < 0 ? 'α سالب: المقاومة تقل بالتسخين' : 'α موجب: المقاومة تزداد بالتسخين', c: M[2] < 0 ? '#1d4ed8' : '#b91c1c', w: 800 }], { title: 'المقاومية ودرجة الحرارة' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'سخّن الملف وراقب قراءة الأوميتر', '#a16207');
    },
    chips(S, g) { return { m: Q59.chips(S, 'mt', MAT.map(q => [q[0], q[1]]), g.h - 128, S.m, (S2, k) => { S2.m = k; S2.ex = 0; if (S2.p.T > 300 && k !== 'ck') {} }, { bw: 84 }),
      e: Q59.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 4: الحل خطوة خطوة', S2 => { S2.m = 'ck'; setParam(S2, 'T', 420); S2.Tn = 320; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'fl', x: g.bx, y: g.by + 30, r: 24, axis: 'y', keep: true, tip: 'اسحب للأعلى: زد التسخين', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'T', Math.round(clamp(20 + (g.by + 30 - d.y) * 4, -50, 500) / 5) * 5) }].concat(C.m, C.e); },
    readings(S) { return [rd('المادة', D.mat(S)[1]), rd('درجة الحرارة', Q59.f(S.Tn, 0) + ' °C'), rd('المقاومة R', Q59.f(D.R(S, S.Tn), 2) + ' Ω'), rd('α', Q59.f(D.mat(S)[2] * 1e4, 1) + '×10⁻⁴ °C⁻¹')]; },
    record(S) { return { m: D.mat(S)[1], T: Q59.f(S.Tn, 0), R: Q59.f(D.R(S, S.Tn), 2) }; },
    cols: [['m', 'المادة'], ['T', 'T (°C)'], ['R', 'R (Ω)']],
    explain(S) { return Q26.ex('قراءة الأوميتر تتغير تدريجياً مع ارتفاع درجة الحرارة: تزداد للفلزات وتقل للكاربون.', 'بالتسخين تزداد سعة اهتزاز ذرات الفلز فتزداد تصادمات الإلكترونات الحرة وتزداد المقاومية. أما في أشباه الموصلات فيزداد عدد الشحنات الحرة بالتسخين فتقل المقاومية.', 'المحرار المقاومي المصنوع من البلاتين يقيس درجة الحرارة من مقاومته، والمقاوم الحراري يستعمل في دوائر إنذار الحريق.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A6 — فرط التوصيل: درجة الحرارة الحرجة والتيار الدائم (9-4، الشكلان 7 و 8، ص 204) =============== */
(() => {
  const TC = 4.2;
  const D = { id: 'g11_i_super', page: 204, fig: 'الشكلان 7 و 8',
    desc: 'المواد فائقة التوصيل تهبط مقاومتها فجأة إلى الصفر عند تبريدها إلى درجة حرارة معينة تسمى درجة الحرارة الحرجة Tc (للزئبق 4.2 K). إذا تولد تيار في حلقة فائقة التوصيل فإنه يستمر أسابيع دون وجود قوة دافعة كهربائية. وتستعمل في صنع مغانط فائقة التوصيل مجالها نحو عشرة أمثال أقوى المغانط الاعتيادية، كما في جهاز الرنين المغناطيسي MRI.',
    tags: 'فرط التوصيل فائق التوصيل درجة الحرارة الحرجة Tc الزئبق 4.2 K مقاومة صفر تيار دائم حلقة مغانط فائقة التوصيل الرنين المغناطيسي MRI الشكل 7 الشكل 8',
    tools: ['حلقة من مادة فائقة التوصيل', 'حمام هيليوم سائل', 'بطارية ومفتاح', 'أميتر'],
    steps: ['برّد الحلقة بسحب مقبض التبريد إلى الأسفل (أو من اللوحة) وراقب المقاومة في المخطط.', 'عند T < Tc تهبط المقاومة فجأة إلى الصفر.', 'افصل البطارية والحلقة باردة: يستمر التيار بالدوران دون نقصان.', 'دفّئ الحلقة فوق Tc والبطارية مفصولة: يتلاشى التيار بسرعة.'],
    concl: ['المقاومة تهبط فجأة إلى الصفر عند درجة الحرارة الحرجة Tc.', 'التيار في الحلقة فائقة التوصيل يستمر أسابيع بلا مصدر.', 'المغانط فائقة التوصيل أقوى بنحو عشرة أمثال وتستعمل في جهاز MRI.'],
    laws: ['g11_l9_temp'],
    controls: [R('T', 'درجة الحرارة', 1, 10, 7, .1, 'K'), TG('bat', 'البطارية موصولة', true, null, 'power')],
    setup(S) { S.Td = 7; S.I = 0; S.ph = 0; S.days = 0; },
    Rof(T) { return T < TC ? 0 : .08 + .012 * (T - TC); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, rx: L + 250, ry: 470 }; },
    update(S, dt) { S.Td = Q59.ease(S.Td, S.p.T, dt, 2.5); const R = D.Rof(S.Td);
      if (S.p.bat) { S.I = Q59.ease(S.I, R === 0 ? 1 : .35, dt, 3); S.days = 0; } else { if (R > 0) S.I *= Math.exp(-dt * 3); else S.days += dt * 2; }
      S.ph += S.I * dt * 2.4; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), R = D.Rof(S.Td); Q59.bg(ctx, w, h);
      const A = Q52.axes(ctx, { x: g.L + 70, y: 100, w: w - g.L - 470, h: 170, x0: 0, x1: 10, y0: 0, y1: .16, xs: 1, ys: .02, lx: 2, ly: .04, xl: 'T (K)', yl: 'R (Ω)', col: '#7c3aed' });
      const P = []; for (let T = TC; T <= 10; T += .1) P.push([A.X(T), A.Y(D.Rof(T))]); Q41.line(ctx, [[A.X(0), A.Y(0)], [A.X(TC), A.Y(0)], [A.X(TC), A.Y(.08)]].concat(P), '#7c3aed', 3);
      Q41.line(ctx, [[A.X(TC), A.Y(0)], [A.X(TC), A.Y(.15)]], 'rgba(124,58,237,.35)', 1.2, [4, 4]); Q42.T(ctx, 'Tc = 4.2 K', A.X(TC) + 34, A.Y(.15), { s: 10, w: 900, c: '#7c3aed' }); Q41.dot(ctx, A.X(S.Td), A.Y(R), '#dc2626', 6);
      // cryostat + ring
      const rx = g.rx, ry = g.ry, cold = clamp((10 - S.Td) / 9, 0, 1);
      K.raw(ctx, () => { ctx.save(); const gc = ctx.createLinearGradient(0, ry - 110, 0, ry + 110); gc.addColorStop(0, 'rgba(186,230,253,' + (.3 + .4 * cold) + ')'); gc.addColorStop(1, 'rgba(14,165,233,' + (.35 + .45 * cold) + ')'); ctx.fillStyle = gc; rr(ctx, rx - 150, ry - 70, 300, 170, 16); ctx.fill(); ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 3; rr(ctx, rx - 150, ry - 70, 300, 170, 16); ctx.stroke();
        if (cold > .4) { ctx.fillStyle = 'rgba(255,255,255,.55)'; for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.arc(rx - 130 + k * 32, ry + 80 - ((S.ph * 0 + k * 37 + Date.now() * 0) % 40), 2, 0, TAU); ctx.fill(); } }
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 16; ctx.beginPath(); ctx.ellipse(rx, ry + 10, 100, 50, 0, 0, TAU); ctx.stroke(); ctx.strokeStyle = R === 0 ? '#c4b5fd' : '#cbd5e1'; ctx.lineWidth = 9; ctx.beginPath(); ctx.ellipse(rx, ry + 10, 100, 50, 0, 0, TAU); ctx.stroke(); ctx.restore(); });
      const n = 14; for (let k = 0; k < n; k++) { const a = k / n * TAU + S.ph; Q31.sg(ctx, rx + Math.cos(a) * 100, ry + 10 + Math.sin(a) * 50, 1, 6, clamp(S.I * 1.2, .1, 1)); }
      Q42.T(ctx, 'هيليوم سائل', rx + 100, ry - 56, { s: 10, w: 900, c: '#0c4a6e' });
      // battery leads
      const bxx = rx + 230, c = Q33.cell(ctx, bxx, ry - 120, { V: 1.5, w: 64, h: 24, pos: -1 });
      if (S.p.bat) { Q33.wire(ctx, [c.p, [rx + 60, ry - 120], [rx + 60, ry - 30]], { col: '#dc2626' }); Q33.wire(ctx, [c.n, [bxx + 50, ry - 120], [bxx + 50, ry - 90], [rx + 90, ry - 90], [rx + 90, ry - 18]], { col: '#111827' }); }
      else Q42.T(ctx, 'البطارية مفصولة', bxx, ry - 90, { s: 10.5, w: 900, c: '#b91c1c' });
      // cooling handle
      const hy = ry - 60 + (10 - S.p.T) * 0 ; void hy;
      Q42.T(ctx, 'T = ' + Q59.f(S.Td, 1) + ' K', rx - 110, ry - 56, { s: 12, w: 900, c: '#fff', bg: R === 0 ? '#7c3aed' : '#0369a1' });
      const st = R === 0 ? (S.p.bat ? 'R = 0 : فائق التوصيل' : 'التيار مستمر بلا بطارية') : (S.p.bat ? 'مقاومة اعتيادية' : 'التيار يتلاشى');
      Q59.card(ctx, S, [{ t: 'Tc = 4.2 K للزئبق', mono: 0 }, { t: 'R = ' + Q59.f(R, 3) + ' Ω', mono: 1, c: R === 0 ? '#7c3aed' : '#334155', w: 900 }, { t: 'I = ' + Q59.f(S.I, 2) + ' A', mono: 1 }, { t: st, c: R === 0 ? '#15803d' : '#b91c1c', w: 900 }, { t: !S.p.bat && R === 0 ? 'مدة الاستمرار: ' + Q59.f(S.days, 0) + ' يوم' : 'المغانط فائقة التوصيل في جهاز MRI', c: '#64748b' }], { title: 'فرط التوصيل' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m);
      Q42.banner(ctx, w, 'برّد الحلقة تحت Tc ثم افصل البطارية', '#7c3aed');
    },
    chips(S, g) { return { m: Q59.chips(S, 'md', [['cool', '❄ برّد إلى 2 K'], ['warm', 'دفّئ إلى 8 K'], ['bat', S.p.bat ? 'افصل البطارية' : 'صِل البطارية']], g.h - 84, '', (S2, k) => { if (k === 'cool') setParam(S2, 'T', 2); if (k === 'warm') setParam(S2, 'T', 8); if (k === 'bat') setParam(S2, 'bat', !S2.p.bat); }, { bw: 190, col: '#7c3aed' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'cool', x: g.rx - 110, y: g.ry - 56 + (S.p.T - 7) * 10, r: 26, axis: 'y', keep: true, tip: 'اسحب للأسفل: برّد', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'T', Math.round(clamp(7 + (d.y - (g.ry - 56)) / 10, 1, 10) * 10) / 10) },
        { id: 'ring', x: g.rx, y: g.ry + 10, w: 220, h: 110, axis: 'none', hint: false, tip: 'اضغط: صِل أو افصل البطارية', click: S2 => setParam(S2, 'bat', !S2.p.bat) }].concat(C.m); },
    readings(S) { return [rd('درجة الحرارة', Q59.f(S.Td, 1) + ' K'), rd('المقاومة', Q59.f(D.Rof(S.Td), 3) + ' Ω'), rd('التيار في الحلقة', Q59.f(S.I, 2) + ' A'), rd('البطارية', S.p.bat ? 'موصولة' : 'مفصولة')]; },
    explain(S) { return Q26.ex('تحت 4.2 K تصبح المقاومة صفراً، ويبقى التيار يدور في الحلقة بعد فصل البطارية.', 'في الحالة فائقة التوصيل لا تفقد الشحنات طاقتها بالتصادم، فلا يحتاج التيار إلى قوة دافعة ليستمر. فوق Tc تعود المقاومة فتتحول طاقة التيار إلى حرارة ويتلاشى.', 'مغانط جهاز الرنين المغناطيسي MRI في المستشفيات مصنوعة من ملفات فائقة التوصيل تبرد بالهيليوم السائل.'); }
  };
  M8.P[D.id] = D;
})();

/* moving charges on a schematic loop */
Q59.dots = function (ctx, pts, ph, on) { if (on) Q33.flow(ctx, pts, ph, 'c', { sp: 30 }); };
/* simple sloped-line graph helper: returns axes */
Q59.ax = function (ctx, o) { return Q52.axes(ctx, Object.assign({ col: '#a16207' }, o)); };

/* =============== A7 — القوة الدافعة الكهربائية وقانون الدائرة المغلقة والمقاومة الداخلية (9-5 … 9-7، الأشكال 9–13، مثال 5) =============== */
(() => {
  const EX = { title: 'مثال 5 ص 207', q: 'بطارية سيارة قوتها الدافعة 12 V ومقاومتها الداخلية 0.01 Ω. احسب فولطية الأقطاب عندما يسحب منها تيار 10 A ثم 100 A.', lines: ['ΔV = ε − I r', 'أ: I r = 10 × 0.01 = 0.1 V', 'ΔV = 12 − 0.1 = 11.9 V', 'ب: I r = 100 × 0.01 = 1 V', 'ΔV = 12 − 1 = 11 V', 'التيار الكبير لمحرك التشغيل يخفض فولطية الأقطاب'] };
  const D = { id: 'g11_i_emf', page: 204, fig: 'الأشكال 9 إلى 13 + مثال 5',
    desc: 'القوة الدافعة الكهربائية ε مقدار الطاقة التي تكسبها البطارية لكل كولوم من الشحنة ينتقل بين قطبيها: ε = W / q ووحدتها الفولت، كما تكسب المضخة الماء طاقة برفعه إلى الخزان. لكل بطارية مقاومة داخلية r فتكون فولطية الأقطاب ΔV = ε − I r ، ومنها قانون الدائرة المغلقة I = ε / (R + r). يقيس الفولطميتر الموصول مباشرة بين القطبين في الدائرة المفتوحة ε تقريباً.',
    tags: 'القوة الدافعة الكهربائية ε=W/q المضخة الخزان الصمام الفوهة قانون الدائرة المغلقة I=ε/(R+r) المقاومة الداخلية فولطية الأقطاب ΔV=ε−Ir بطارية السيارة محرك التشغيل المصابيح الأمامية مثال 5 الشكل 9 الشكل 10 الشكل 11 الشكل 12 الشكل 13 فكر',
    tools: ['بطارية ذات مقاومة داخلية', 'مقاومة حمل متغيرة R', 'مفتاح', 'فولطميتر عالي المقاومة', 'أميتر', 'مضخة وخزان ماء (للمقارنة)'],
    steps: ['في «الدائرة المغلقة» افتح المفتاح: يقرأ الفولطميتر ε تماماً.', 'أغلق المفتاح ثم اسحب مقبض R نحو الأسفل أو الأعلى: كلما زاد التيار هبطت فولطية الأقطاب ΔV.', 'لاحظ العمود: ε = I R + I r دائماً، والخط ΔV = ε − I r في المخطط.', 'اختر «المضخة: الشكل 9» لترى التشابه، ثم «سيارة: مثال 5» وشغّل المحرك لترى خفوت المصابيح.'],
    concl: ['ε = W / q ، وحدتها J/C = V.', 'ε = ΔV + I r و I = ε / (R + r).', 'فولطية الأقطاب أقل من ε عند سحب تيار، وتساويها في الدائرة المفتوحة.', 'مثال 5: 11.9 V عند 10 A و 11 V عند 100 A ، لذلك تخفت المصابيح عند تشغيل المحرك.'],
    laws: ['g11_l9_emf', 'g11_l9_closed'],
    controls: [R('e', 'القوة الدافعة ε', 1.5, 24, 12, .5, 'V'), R('r', 'المقاومة الداخلية r', 0, 3, .5, .05, 'Ω'), R('R', 'مقاومة الحمل R', .5, 30, 6, .5, 'Ω'), TG('sw', 'المفتاح مغلق', true, null, 'power')],
    setup(S) { S.md = 'circ'; S.ex = 0; S.k = 0; S.Id = 0; S.st = 0; S.pump = 0; S.wl = 0; S.Vd = 12; },
    I(S) { if (S.md === 'car') return S.st ? 100 : 10; return S.p.sw ? S.p.e / (S.p.R + S.p.r) : 0; },
    rr(S) { return S.md === 'car' ? .01 : S.p.r; }, ee(S) { return S.md === 'car' ? 12 : S.p.e; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 70, y0: 136, x1: L + 380, y1: 306 }; },
    update(S, dt) { S.Id = Q59.ease(S.Id, D.I(S), dt, 6); S.Vd = Q59.ease(S.Vd, D.ee(S) - D.I(S) * D.rr(S), dt, 6); Q33.adv(S, dt, Math.min(S.Id, 6), 40); S.pump += dt * S.p.e / 4; S.wl = Q59.ease(S.wl, S.p.sw ? 1 : 0, dt, 3); },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q59.bg(ctx, w, h);
      if (S.md === 'pump') D.pumpV(ctx, w, h, S, g); else if (S.md === 'car') D.car(ctx, w, h, S, g); else D.circ(ctx, w, h, S, g);
      const I = D.I(S), e = D.ee(S), r = D.rr(S);
      if (S.ex && S.md === 'car') Q59.steps(ctx, S, Object.assign({}, EX, { k: S.k }));
      else Q59.card(ctx, S, [{ t: 'ε = ' + Q59.f(e, 2) + ' V     r = ' + Q59.f(r, 2) + ' Ω', mono: 1 }, S.md === 'car' ? { t: S.st ? 'محرك التشغيل يعمل: 100 A' : 'المصابيح فقط: 10 A', c: '#334155' } : { t: 'I = ε / (R + r) = ' + Q59.f(I, 3) + ' A', mono: 1 }, { t: 'الهبوط الداخلي وفولطية الأقطاب:', c: '#334155' }, { t: 'I r = ' + Q59.f(I * r, 3) + ' V', mono: 1, c: '#b91c1c' }, { t: 'ΔV = ε − I r = ' + Q59.f(e - I * r, 3) + ' V', mono: 1, c: '#1d4ed8', w: 900 }, { t: I < 1e-6 ? 'الدائرة مفتوحة: الفولطميتر يقرأ ε' : 'ΔV أقل من ε لأن البطارية تستهلك جزءاً من الطاقة', c: '#64748b' }], { title: S.md === 'pump' ? 'المضخة تشبه البطارية' : 'قانون الدائرة المغلقة' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); if (C.e) Q42.drawChips(ctx, C.e); if (C.c) Q42.drawChips(ctx, C.c);
      Q42.banner(ctx, w, S.md === 'pump' ? 'المضخة ترفع الماء كما تدفع البطارية الشحنات' : S.md === 'car' ? 'شغّل المحرك وراقب المصابيح الأمامية' : 'اسحب مقبض R وراقب فولطية الأقطاب', '#a16207');
    },
    circ(ctx, w, h, S, g) {
      const { x0, y0, x1, y1 } = g, my = (y0 + y1) / 2, I = S.Id, on = S.p.sw;
      Q59.panel(ctx, g.L + 24, 84, x1 - g.L + 20, 246, 'الشكلان 10 و 11');
      Q59.dbox(ctx, x0 - 26, y0 + 22, 52, y1 - y0 - 44, 'البطارية');
      Q59.path(ctx, [[x0, y0 + 22], [x0, y0], [x0 + 110, y0]]); Q59.swS(ctx, [x0 + 110, y0], [x0 + 180, y0], on, on ? 'مغلق' : 'مفتوح'); Q59.path(ctx, [[x0 + 180, y0], [x1, y0], [x1, y0 + 30]]);
      Q59.cellS(ctx, [x0, my + 50], [x0, my - 10], 'ε', { side: 1 }); Q59.zig(ctx, [x0, my - 10], [x0, y0 + 22], 'r', { bl: 30, side: -1 }); Q59.path(ctx, [[x0, my + 50], [x0, y1]]);
      Q59.zig(ctx, [x1, y0 + 30], [x1, y1 - 30], 'R', { bl: 70, side: -1, hot: I / 4 }); Q59.path(ctx, [[x1, y1 - 30], [x1, y1], [x0, y1]]);
      Q59.meterS(ctx, x0 + 220, y1, 'A', Q59.f(I, 2) + ' A', '#a16207');
      Q59.path(ctx, [[x0 + 60, y0], [x0 + 60, my - 14]], '#ea580c', 2); Q59.path(ctx, [[x0 + 60, my + 14], [x0 + 60, y1]], '#ea580c', 2); Q59.meterS(ctx, x0 + 60, my, 'V', null, '#b91c1c'); Q42.T(ctx, Q59.f(S.Vd, 2) + ' V', x0 + 108, my, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' });
      Q59.node(ctx, x0, y0, 'a', { dx: -12 }); Q59.node(ctx, x0, y1, 'b', { dx: -12, dy: 14 });
      const hy = y0 + 30 + (S.p.R - .5) / 29.5 * (y1 - y0 - 60); Q41.dot(ctx, x1, hy, '#2563eb', 9); Q42.T(ctx, 'اسحب', x1 + 30, hy, { s: 10, w: 800, c: '#2563eb' });
      Q59.dots(ctx, [[x0, y1], [x0, y0], [x1, y0], [x1, y1], [x0, y1]], S.fp, on && I > .01);
      // potential bars + ΔV–I graph
      const by = 600, H = 220, mx = Math.max(S.p.e, 1);
      Q59.vbar(ctx, g.L + 50, by, 54, H, mx, [[S.p.e, '#16a34a', 'ε']], 'ε'); Q59.vbar(ctx, g.L + 120, by, 54, H, mx, [[I * S.p.R, '#2563eb', 'IR'], [I * S.p.r, '#dc2626', 'Ir']], 'IR + Ir');
      const A = Q59.ax(ctx, { x: g.L + 240, y: 370, w: w - g.L - 300, h: 200, x0: 0, x1: Math.max(1, Math.ceil(S.p.e / Math.max(S.p.r, .4))), y0: 0, y1: Math.ceil(S.p.e), xs: 1, ys: 1, lx: Math.max(1, Math.ceil(S.p.e / Math.max(S.p.r, .4) / 6)), ly: Math.max(1, Math.ceil(S.p.e / 6)), xl: 'I (A)', yl: 'ΔV (V)' });
      const Imax = Math.max(1, Math.ceil(S.p.e / Math.max(S.p.r, .4))); Q41.line(ctx, [[A.X(0), A.Y(S.p.e)], [A.X(Imax), A.Y(Math.max(0, S.p.e - Imax * S.p.r))]], '#1d4ed8', 2.5); Q41.dot(ctx, A.X(I), A.Y(S.Vd), '#dc2626', 6);
      Q42.T(ctx, 'ΔV = ε − I r', A.X(Imax * .7), A.Y(S.p.e) + 14, { s: 10.5, w: 900, c: '#1d4ed8' });
    },
    pumpV(ctx, w, h, S, g) {
      const px = g.L + 24, pw = w - 360 - px, on = S.p.sw;
      Q59.panel(ctx, px, 84, pw, 250, 'الشكل 9 a: دائرة الماء');
      const tx = px + pw - 120, ty = 120, ux = px + 70, uy = 290, ph = S.pump * 60;
      K.raw(ctx, () => { ctx.save(); const gt = ctx.createLinearGradient(0, ty, 0, ty + 70); gt.addColorStop(0, '#bae6fd'); gt.addColorStop(1, '#0284c7'); ctx.fillStyle = '#e2e8f0'; ctx.fillRect(tx, ty, 90, 70); ctx.fillStyle = gt; ctx.fillRect(tx, ty + 70 - 50 * (.5 + .5 * S.p.e / 24), 90, 50 * (.5 + .5 * S.p.e / 24)); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.strokeRect(tx, ty, 90, 70);
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 12; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(ux, uy - 20); ctx.lineTo(ux, ty + 10); ctx.lineTo(tx, ty + 10); ctx.moveTo(tx + 45, ty + 70); ctx.lineTo(tx + 45, uy); ctx.lineTo(ux + 26, uy); ctx.stroke();
        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 6; ctx.setLineDash([10, 8]); ctx.lineDashOffset = -ph; ctx.beginPath(); ctx.moveTo(ux, uy - 20); ctx.lineTo(ux, ty + 10); ctx.lineTo(tx, ty + 10); ctx.stroke(); if (S.wl > .05) { ctx.lineDashOffset = -ph * S.wl; ctx.beginPath(); ctx.moveTo(tx + 45, ty + 70); ctx.lineTo(tx + 45, uy); ctx.lineTo(ux + 26, uy); ctx.stroke(); } ctx.setLineDash([]);
        const gp = ctx.createRadialGradient(ux - 6, uy - 6, 2, ux, uy, 26); gp.addColorStop(0, '#fca5a5'); gp.addColorStop(1, '#b91c1c'); ctx.fillStyle = gp; ctx.beginPath(); ctx.arc(ux, uy, 26, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; for (let k = 0; k < 4; k++) { const a = S.pump * 3 + k * Math.PI / 2; ctx.beginPath(); ctx.moveTo(ux, uy); ctx.lineTo(ux + Math.cos(a) * 18, uy + Math.sin(a) * 18); ctx.stroke(); }
        ctx.fillStyle = on ? '#16a34a' : '#dc2626'; ctx.save(); ctx.translate(tx + 45, ty + 130); ctx.rotate(on ? 0 : Math.PI / 2); ctx.fillRect(-16, -4, 32, 8); ctx.restore(); ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(tx + 33, ty + 175); ctx.lineTo(tx + 57, ty + 175); ctx.lineTo(tx + 50, ty + 192); ctx.lineTo(tx + 40, ty + 192); ctx.closePath(); ctx.fill(); ctx.restore(); });
      Q42.T(ctx, 'خزان', tx + 45, ty - 12, { s: 10.5, w: 900, c: '#0369a1' }); Q42.T(ctx, 'المضخة: تشبه البطارية', ux + 95, uy - 28, { s: 10.5, w: 900, c: '#b91c1c' }); Q42.T(ctx, on ? 'الصمام مفتوح' : 'الصمام مغلق', tx - 40, ty + 112, { s: 10.5, w: 900, c: on ? '#15803d' : '#b91c1c' }); Q42.T(ctx, 'الفوهة: تشبه المقاومة', tx - 40, ty + 185, { s: 10.5, w: 900, c: '#334155' });
      Q59.panel(ctx, g.L + 24, 350, w - g.L - 60, 250, 'الشكل 9 b: البطارية والمفتاح والمصباح');
      const by = 540, c = Q33.cell(ctx, g.L + 140, by, { V: Q59.f(S.p.e, 1), w: 90, h: 30 }), b = Q33.bulb(ctx, w - 160, 470, S.Id / 2 * (S.p.R / 6), {}), s = Q33.sw(ctx, g.L + 280, g.L + 340, by, on, {});
      Q33.wire(ctx, [c.p, s.a], { col: '#dc2626' }); Q33.wire(ctx, [s.b, [w - 110, by], [w - 110, 470], b.b], { col: '#dc2626' }); Q33.wire(ctx, [c.n, [g.L + 60, by], [g.L + 60, 420], [w - 210, 420], [w - 210, 470], b.a], { col: '#111827' });
      Q42.T(ctx, 'ε = W / q', g.L + 420, 470, { s: 14, w: 900, c: '#fff', bg: '#a16207' });
    },
    car(ctx, w, h, S, g) {
      Q59.panel(ctx, g.L + 24, 84, w - g.L - 360, 250, 'الشكلان 12 و 13: بطارية السيارة');
      const bx = g.L + 110, by = 250, b = Q33.bat(ctx, bx, by, { V: 12, w: 110, h: 76, label: 'بطارية سيارة' });
      Q59.dbox(ctx, bx - 70, by - 70, 140, 120, ''); Q42.T(ctx, 'r = 0.01 Ω', bx, by - 84, { s: 10.5, w: 900, c: '#a16207' });
      const V = S.Vd, br = Math.pow(V / 12, 2) * 1.1, lx = g.L + 260, ly = 200;
      const l1 = Q33.bulb(ctx, lx, ly, br, { s: .9 }), l2 = Q33.bulb(ctx, lx + 80, ly, br, { s: .9 });
      Q42.T(ctx, 'المصابيح الأمامية', lx + 40, ly + 28, { s: 10.5, w: 900, c: '#334155' });
      Q33.wire(ctx, [b.p, [b.p[0], 140], [lx + 120, 140], [lx + 120, ly], l2.b], { col: '#dc2626' }); Q33.wire(ctx, [l2.a, l1.b], { col: '#dc2626' }); Q33.wire(ctx, [l1.a, [lx - 30, ly], [lx - 30, 300], [b.n[0] - 30, 300], [b.n[0] - 30, b.n[1]], b.n], { col: '#111827' });
      // starter motor
      const mx = g.L + 380, my = 292; K.raw(ctx, () => { ctx.save(); const gm = ctx.createLinearGradient(0, my - 26, 0, my + 26); gm.addColorStop(0, '#cbd5e1'); gm.addColorStop(.5, '#64748b'); gm.addColorStop(1, '#1e293b'); ctx.fillStyle = gm; rr(ctx, mx - 50, my - 26, 100, 52, 10); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.save(); ctx.translate(mx + 62, my); ctx.rotate(S.st ? S.pump * 8 : 0); for (let k = 0; k < 8; k++) { ctx.rotate(Math.PI / 4); ctx.fillRect(-3, -16, 6, 8); } ctx.beginPath(); ctx.arc(0, 0, 10, 0, TAU); ctx.fill(); ctx.restore(); ctx.restore(); });
      Q42.T(ctx, 'محرك التشغيل', mx, my - 40, { s: 10.5, w: 900, c: '#334155' }); if (S.st) Q33.wire(ctx, [[b.p[0], 140], [mx, 140], [mx, my - 26]], { col: '#dc2626', thick: 1 });
      Q42.T(ctx, 'ΔV = ' + Q59.f(V, 2) + ' V', g.L + 240, 262, { s: 13, w: 900, c: '#fff', bg: '#1d4ed8' });
      // book's فكر
      Q59.panel(ctx, g.L + 24, 360, w - g.L - 60, 170, 'فكر ص 208');
      Q42.T(ctx, 'متى تكون المصابيح أشد إضاءة: قبل تشغيل المحرك أم في أثنائه؟', g.L + 24 + (w - g.L - 60) / 2, 400, { s: 12, w: 800, c: '#334155' });
      Q42.T(ctx, 'قبل التشغيل', g.L + 220, 440, { s: 12, w: 900, c: '#15803d' }); Q42.T(ctx, 'ΔV = 11.9 V', g.L + 220, 462, { s: 12, w: 900, c: '#15803d' }); Q42.T(ctx, 'في أثناء التشغيل', g.L + 520, 440, { s: 12, w: 900, c: '#b91c1c' }); Q42.T(ctx, 'ΔV = 11 V', g.L + 520, 462, { s: 12, w: 900, c: '#b91c1c' });
      Q42.T(ctx, 'السبب: التيار الكبير يزيد الهبوط I r داخل البطارية', g.L + 24 + (w - g.L - 60) / 2, 495, { s: 11.5, w: 800, c: '#64748b' });
    },
    chips(S, g) { const C = { m: Q59.chips(S, 'md', [['circ', 'الدائرة المغلقة'], ['pump', 'المضخة: الشكل 9'], ['car', 'سيارة: مثال 5']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.ex = 0; S2.k = 0; S2.st = 0; }, { bw: 180 }) };
      if (S.md === 'car') { C.c = Q59.chips(S, 'st', [['st', S.st ? 'أطفئ محرك التشغيل' : '🔑 شغّل المحرك']], g.h - 84, '', S2 => { S2.st = S2.st ? 0 : 1; }, { bw: 190, x0: g.L + 340 }); C.e = Q59.stepChips(S, 'ex', g.h - 84, g.L, 'حل مثال 5', null, EX.lines.length); }
      else C.c = Q59.chips(S, 'sw', [['sw', S.p.sw ? 'افتح المفتاح' : 'أغلق المفتاح'], ['short', 'حمل صغير جداً'], ['big', 'حمل كبير']], g.h - 84, '', (S2, k) => { if (k === 'sw') setParam(S2, 'sw', !S2.p.sw); if (k === 'short') { setParam(S2, 'R', .5); setParam(S2, 'sw', true); } if (k === 'big') { setParam(S2, 'R', 30); setParam(S2, 'sw', true); } }, { bw: 170 });
      return C; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), L = [];
      if (S.md === 'circ') { const hy = g.y0 + 30 + (S.p.R - .5) / 29.5 * (g.y1 - g.y0 - 60);
        L.push({ id: 'Rk', x: g.x1, y: hy, r: 20, axis: 'y', keep: true, tip: 'اسحب: غيّر مقاومة الحمل R', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'R', Math.round(clamp(.5 + (d.y - g.y0 - 30) / (g.y1 - g.y0 - 60) * 29.5, .5, 30) * 2) / 2) },
          { id: 'swc', x: g.x0 + 145, y: g.y0, w: 80, h: 40, axis: 'none', hint: false, tip: 'اضغط: افتح أو أغلق المفتاح', click: S2 => setParam(S2, 'sw', !S2.p.sw) }); }
      else if (S.md === 'pump') L.push({ id: 'valve', x: S.W - 360 - 120 + 45, y: 250, r: 26, axis: 'none', tip: 'اضغط: افتح أو أغلق الصمام', idle: 'اضغط ✋', click: S2 => setParam(S2, 'sw', !S2.p.sw) });
      else L.push({ id: 'motor', x: g.L + 380, y: 292, w: 120, h: 60, axis: 'none', tip: 'اضغط: شغّل المحرك', idle: 'اضغط ✋', click: S2 => { S2.st = S2.st ? 0 : 1; } });
      return L.concat(C.m, C.c || [], C.e || []); },
    readings(S) { const I = D.I(S), e = D.ee(S), r = D.rr(S); return [rd('ε', Q59.f(e, 2) + ' V'), rd('التيار I', Q59.f(I, 3) + ' A'), rd('الهبوط الداخلي I r', Q59.f(I * r, 3) + ' V'), rd('فولطية الأقطاب', Q59.f(e - I * r, 3) + ' V')]; },
    record(S) { const I = D.I(S); return { R: Q59.f(S.p.R, 1), I: Q59.f(I, 3), V: Q59.f(D.ee(S) - I * D.rr(S), 3) }; },
    cols: [['R', 'R (Ω)'], ['I', 'I (A)'], ['V', 'ΔV (V)']],
    explain(S) { return Q26.ex(S.md === 'car' ? 'عند تشغيل المحرك يقفز التيار إلى 100 A فتهبط فولطية الأقطاب إلى 11 V وتخفت المصابيح.' : 'كلما صغّرت R زاد التيار وهبطت قراءة الفولطميتر عن ε.', 'جزء من القوة الدافعة يُصرف داخل البطارية على مقاومتها الداخلية: ε = I R + I r. فكلما كبر التيار كبر الهبوط I r وقلت فولطية الأقطاب.', 'يلاحظ السائق خفوت المصابيح الأمامية لحظة تشغيل محرك السيارة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A8 — تعيين المقاومة الداخلية وقياس المقاومة بالأميتر والفولطميتر (الأشكال 14–16، ص 209–210) =============== */
(() => {
  const RV = 10000, RA = 1, E0 = 6;
  const D = { id: 'g11_i_rint', page: 209, fig: 'الأشكال 14 و 15 و 16',
    desc: 'لتعيين المقاومة الداخلية r نغلق المفتاح الأول فقط فيقرأ الفولطميتر ε تقريباً، ثم نغلق المفتاح الثاني فيمر تيار I في الأميتر والمقاومة R فتهبط القراءة إلى ΔV ، ومن ε = I R + I r نجد r = (ε − ΔV) / I. ولقياس مقاومة بطريقة الأميتر والفولطميتر: للمقاومة الصغيرة نربط الفولطميتر مباشرة على طرفيها (الشكل 15)، وللمقاومة الكبيرة نربطه على المقاومة والأميتر معاً (الشكل 16) ثم R = ΔV / I.',
    tags: 'تعيين المقاومة الداخلية r مفتاحان فولطميتر أميتر الشكل 14 قياس المقاومة طريقة الأميتر والفولطميتر مقاومة صغيرة الشكل 15 مقاومة كبيرة الشكل 16 خطأ القياس',
    tools: ['بطارية', 'فولطميتر', 'أميتر', 'مقاومة معلومة R', 'مفتاحان', 'مقاومات مجهولة صغيرة وكبيرة'],
    steps: ['في «الشكل 14» أغلق المفتاح الأول فقط: سجّل قراءة الفولطميتر = ε.', 'أغلق المفتاح الثاني أيضاً: سجّل التيار I والقراءة الجديدة ΔV.', 'اقرأ الحساب في البطاقة: r = (ε − ΔV) / I ، وغيّر r من اللوحة لتتأكد.', 'اختر «قياس R: الشكلان 15 و 16» واسحب المؤشر على المخطط: الطريقة الأولى أدق للمقاومة الصغيرة والثانية للكبيرة.'],
    concl: ['في الدائرة المفتوحة يقرأ الفولطميتر عالي المقاومة ε.', 'r = (ε − ΔV) / I ، وإن كانت R مجهولة نستعمل قراءة الفولطميتر بدل I R.', 'للمقاومة الصغيرة: تيار الفولطميتر مهمل فالطريقة الأولى دقيقة.', 'للمقاومة الكبيرة: جهد الأميتر مهمل فالطريقة الثانية دقيقة. والطريقة كلها غير دقيقة تماماً.'],
    laws: ['g11_l9_closed', 'g11_l9_ohm'],
    controls: [R('e', 'القوة الدافعة ε', 1.5, 12, 6, .5, 'V'), R('r', 'المقاومة الداخلية r', .1, 3, 1, .1, 'Ω'), R('R', 'المقاومة المعلومة R', 1, 20, 5, .5, 'Ω'), R('lg', 'المقاومة المقيسة: log Rx', -1, 4, .5, .05, '')],
    setup(S) { S.md = 'rint'; S.s1 = 1; S.s2 = 0; S.Vd = 6; S.Id = 0; S.V1 = null; S.lgd = .5; S.fp = 0; },
    I(S) { return S.s2 ? S.p.e / (S.p.R + S.p.r) : 0; }, V(S) { return S.s1 ? S.p.e - D.I(S) * S.p.r : 0; },
    m1(Rx) { const Rp = Rx * RV / (Rx + RV), I = E0 / (RA + Rp); return { I, V: I * Rp, Rm: Rp, er: (Rx - Rp) / Rx * 100 }; },
    m2(Rx) { const I = E0 / (RA + Rx); return { I, V: I * (RA + Rx), Rm: RA + Rx, er: RA / Rx * 100 }; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 70, y0: 136, x1: L + 390, y1: 306 }; },
    update(S, dt) { S.Id = Q59.ease(S.Id, D.I(S), dt, 6); S.Vd = Q59.ease(S.Vd, D.V(S), dt, 6); S.lgd = Q59.ease(S.lgd, S.p.lg, dt, 8); Q33.adv(S, dt, S.Id, 50); },
    draw(ctx, w, h, S) { const g = D.geo(S); Q59.bg(ctx, w, h); if (S.md === 'meas') D.meas(ctx, w, h, S, g); else D.rint(ctx, w, h, S, g);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.c);
      Q42.banner(ctx, w, S.md === 'meas' ? 'قارن الطريقتين لمقاومة صغيرة وكبيرة' : 'أغلق المفتاحين بالترتيب واحسب r', '#a16207'); },
    rint(ctx, w, h, S, g) {
      const { x0, y0, x1, y1 } = g, my = (y0 + y1) / 2, xm = x0 + 150;
      Q59.panel(ctx, g.L + 24, 84, x1 - g.L + 20, 250, 'الشكل 14: تعيين المقاومة الداخلية');
      Q59.dbox(ctx, x0 - 26, y0 + 22, 52, y1 - y0 - 44, 'البطارية');
      Q59.cellS(ctx, [x0, my + 50], [x0, my - 10], 'ε', { side: 1 }); Q59.zig(ctx, [x0, my - 10], [x0, y0 + 22], 'r', { bl: 30, side: -1 }); Q59.path(ctx, [[x0, y0 + 22], [x0, y0], [xm, y0]]); Q59.path(ctx, [[x0, my + 50], [x0, y1], [x1, y1]]);
      Q59.swS(ctx, [xm, y0], [xm, y0 + 60], !!S.s1, 'S1'); Q59.path(ctx, [[xm, y0 + 60], [xm, my + 20 - 14]]); Q59.meterS(ctx, xm, my + 20, 'V', null, '#b91c1c'); Q59.path(ctx, [[xm, my + 34], [xm, y1]]);
      Q42.T(ctx, Q59.f(S.Vd, 3) + ' V', xm + 52, my + 20, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' });
      Q59.path(ctx, [[xm, y0], [xm + 50, y0]]); Q59.swS(ctx, [xm + 50, y0], [xm + 120, y0], !!S.s2, 'S2'); Q59.path(ctx, [[xm + 120, y0], [x1, y0], [x1, y0 + 26]]);
      Q59.meterS(ctx, x1, y0 + 40, 'A', null, '#a16207'); Q42.T(ctx, Q59.f(S.Id, 3) + ' A', x1 - 52, y0 + 40, { s: 11, w: 900, c: '#fff', bg: '#a16207' }); Q59.zig(ctx, [x1, y0 + 54], [x1, y1], 'R', { bl: 60, side: -1 });
      Q59.node(ctx, x0, y0, 'a', { dx: -12 }); Q59.node(ctx, xm, y0); Q59.node(ctx, xm, y1); Q59.node(ctx, x0, y1, 'b', { dx: -12, dy: 14 });
      Q59.dots(ctx, [[x0, y1], [x0, y0], [x1, y0], [x1, y1], [x0, y1]], S.fp, S.Id > .02);
      // record table
      const V1 = S.V1 != null ? S.V1 : null, rc = S.s2 && V1 != null && S.Id > .01 ? (V1 - D.V(S)) / D.I(S) : null;
      Q59.panel(ctx, g.L + 24, 350, w - g.L - 60, 230, 'خطوات القياس');
      const cx = g.L + 24 + (w - g.L - 60) / 2;
      Q42.T(ctx, 'الخطوة 1: المفتاح S1 فقط', cx, 390, { s: 12, w: 900, c: '#334155' }); Q42.T(ctx, V1 != null ? 'ε = ' + Q59.f(V1, 3) + ' V' : '—', cx, 414, { s: 13, w: 900, c: '#15803d' });
      Q42.T(ctx, 'الخطوة 2: المفتاحان S1 و S2', cx, 450, { s: 12, w: 900, c: '#334155' }); Q42.T(ctx, S.s2 ? 'I = ' + Q59.f(D.I(S), 3) + ' A     ΔV = ' + Q59.f(D.V(S), 3) + ' V' : '—', cx, 474, { s: 13, w: 900, c: '#1d4ed8' });
      Q42.T(ctx, 'النتيجة', cx, 510, { s: 12, w: 900, c: '#334155' }); Q42.T(ctx, rc != null ? 'r = (ε − ΔV) / I = ' + Q59.f(rc, 3) + ' Ω' : '—', cx, 536, { s: 14, w: 900, c: '#fff', bg: rc != null ? '#b91c1c' : '#94a3b8' });
      Q59.card(ctx, S, [{ t: S.s1 && !S.s2 ? 'دائرة مفتوحة: الفولطميتر يقرأ ε' : S.s2 ? 'يمر تيار فتهبط قراءة الفولطميتر' : 'أغلق المفتاح S1', c: '#334155', w: 800 }, { t: 'ε = I R + I r', mono: 1 }, { t: 'r = (ε − ΔV) / I', mono: 1, c: '#b91c1c', w: 900 }, { t: 'القيمة الحقيقية المضبوطة من اللوحة:', c: '#64748b' }, { t: 'r = ' + Q59.f(S.p.r, 2) + ' Ω', mono: 1, c: '#64748b' }], { title: 'تعيين r' });
    },
    meas(ctx, w, h, S, g) {
      const Rx = Math.pow(10, S.lgd), a = D.m1(Rx), b = D.m2(Rx);
      const A = Q59.ax(ctx, { x: g.L + 70, y: 100, w: w - g.L - 450, h: 180, x0: -1, x1: 4, y0: 0, y1: 50, xs: 1, ys: 10, lx: 1, ly: 10, xl: 'log Rx', yl: 'خطأ %' });
      const P1 = [], P2 = []; for (let l = -1; l <= 4.001; l += .05) { P1.push([A.X(l), A.Y(Math.min(50, D.m1(Math.pow(10, l)).er))]); P2.push([A.X(l), A.Y(Math.min(50, D.m2(Math.pow(10, l)).er))]); }
      Q41.line(ctx, P1, '#2563eb', 2.6); Q41.line(ctx, P2, '#dc2626', 2.6); Q41.line(ctx, [[A.X(S.lgd), A.Y(0)], [A.X(S.lgd), A.Y(50)]], 'rgba(15,23,42,.4)', 1.4, [5, 4]); Q41.dot(ctx, A.X(S.lgd), A.Y(Math.min(50, a.er)), '#2563eb', 6); Q41.dot(ctx, A.X(S.lgd), A.Y(Math.min(50, b.er)), '#dc2626', 6);
      Q42.T(ctx, 'الشكل 15', A.X(3.4), A.Y(44), { s: 10.5, w: 900, c: '#fff', bg: '#2563eb' }); Q42.T(ctx, 'الشكل 16', A.X(-.4), A.Y(44), { s: 10.5, w: 900, c: '#fff', bg: '#dc2626' });
      const pw = (w - g.L - 60) / 2 - 6, py = 340;
      [[a, 'الشكل 15: لمقاومة صغيرة', '#2563eb', 0], [b, 'الشكل 16: لمقاومة كبيرة', '#dc2626', 1]].forEach(([m, t, col, k]) => {
        const x = g.L + 24 + k * (pw + 12); Q59.panel(ctx, x, py, pw, 250, t, col);
        const lx = x + 40, rx = x + pw - 40, ty = py + 70, by = py + 190;
        Q59.cellS(ctx, [lx, by], [lx, ty], 'ε', { side: 1 }); Q59.path(ctx, [[lx, ty], [lx + 50, ty]]); Q59.meterS(ctx, lx + 64, ty, 'A', null, '#a16207'); Q59.path(ctx, [[lx + 78, ty], [rx, ty], [rx, ty + 30]]); Q59.zig(ctx, [rx, ty + 30], [rx, by - 10], 'Rx', { bl: 50, side: -1 }); Q59.path(ctx, [[rx, by - 10], [rx, by], [lx, by]]);
        const vx = rx - 70, vt = k ? lx + 30 : rx; Q59.path(ctx, k ? [[lx + 30, ty], [lx + 30, ty + 60], [vx, ty + 60]] : [[rx, ty + 22], [vx, ty + 22], [vx, ty + 46]], '#ea580c', 2); Q59.meterS(ctx, vx, ty + 60 + (k ? 0 : 0), 'V', null, '#b91c1c'); Q59.path(ctx, [[vx, ty + 74], [vx, by - 18], [rx, by - 18]], '#ea580c', 2); void vt;
        Q42.T(ctx, 'R = V / I = ' + Q59.f(m.Rm, m.Rm < 10 ? 3 : 1) + ' Ω', x + pw / 2, by + 30, { s: 12, w: 900, c: '#fff', bg: col });
        Q42.T(ctx, 'الخطأ', x + pw / 2 - 40, by + 54, { s: 11, w: 900, c: '#334155' }); Q42.T(ctx, Q59.f(m.er, 2) + ' %', x + pw / 2 + 30, by + 54, { s: 11, w: 900, c: m.er < 1 ? '#15803d' : '#b91c1c' }); });
      Q59.card(ctx, S, [{ t: 'Rx = ' + Q59.f(Rx, Rx < 10 ? 2 : 0) + ' Ω', mono: 1, w: 900 }, { t: 'مقاومتا الفولطميتر والأميتر:', c: '#64748b' }, { t: 'RV = 10 kΩ     RA = 1 Ω', mono: 1, c: '#64748b' }, { t: 'الشكل 15: الفولطميتر على Rx وحدها', c: '#2563eb', w: 800 }, { t: 'الشكل 16: الفولطميتر على Rx والأميتر', c: '#dc2626', w: 800 }, { t: a.er < b.er ? 'الأدق هنا: الشكل 15' : 'الأدق هنا: الشكل 16', c: '#15803d', w: 900 }], { title: 'قياس المقاومة' });
    },
    chips(S, g) { return { m: Q59.chips(S, 'md', [['rint', 'الشكل 14: تعيين r'], ['meas', 'قياس R: الشكلان 15 و 16']], g.h - 128, S.md, (S2, k) => { S2.md = k; }, { bw: 220 }),
      c: S.md === 'meas' ? Q59.chips(S, 'rx', [['-0.5', '0.3 Ω'], ['0.5', '3 Ω'], ['2', '100 Ω'], ['3.5', '3 kΩ']], g.h - 84, '', (S2, k) => setParam(S2, 'lg', +k), { bw: 120 })
        : Q59.chips(S, 'sw', [['s1', S.s1 ? 'افتح S1' : 'أغلق S1'], ['s2', S.s2 ? 'افتح S2' : 'أغلق S2'], ['rec', '● سجّل ε'], ['re', '↺ من البداية']], g.h - 84, '', (S2, k) => { if (k === 's1') { S2.s1 = S2.s1 ? 0 : 1; if (S2.s1 && !S2.s2) S2.V1 = S2.p.e; } if (k === 's2') { S2.s2 = S2.s2 ? 0 : 1; if (S2.s2) S2.s1 = 1; } if (k === 'rec' && S2.s1 && !S2.s2) S2.V1 = S2.p.e; if (k === 're') { S2.s1 = 0; S2.s2 = 0; S2.V1 = null; } }, { bw: 140 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), xm = g.x0 + 150;
      const L = S.md === 'meas' ? [{ id: 'lg', x: g.L + 70 + (S.p.lg + 1) / 5 * (S.W - g.L - 450), y: 190, r: 22, axis: 'x', keep: true, tip: 'اسحب: غيّر المقاومة المقيسة', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'lg', Math.round(clamp((d.x - g.L - 70) / (S2.W - g.L - 450) * 5 - 1, -1, 4) * 20) / 20) }]
        : [{ id: 'S1', x: xm, y: g.y0 + 40, r: 24, axis: 'none', tip: 'اضغط: المفتاح S1', idle: 'اضغط ✋', click: S2 => { S2.s1 = S2.s1 ? 0 : 1; if (S2.s1 && !S2.s2) S2.V1 = S2.p.e; } }, { id: 'S2', x: xm + 85, y: g.y0, r: 24, axis: 'none', hint: false, tip: 'اضغط: المفتاح S2', click: S2 => { S2.s2 = S2.s2 ? 0 : 1; if (S2.s2) S2.s1 = 1; } }];
      return L.concat(C.m, C.c); },
    readings(S) { if (S.md === 'meas') { const Rx = Math.pow(10, S.p.lg); return [rd('Rx الحقيقية', Q59.f(Rx, 2) + ' Ω'), rd('الشكل 15', Q59.f(D.m1(Rx).Rm, 2) + ' Ω'), rd('الشكل 16', Q59.f(D.m2(Rx).Rm, 2) + ' Ω')]; }
      return [rd('قراءة الفولطميتر', Q59.f(D.V(S), 3) + ' V'), rd('قراءة الأميتر', Q59.f(D.I(S), 3) + ' A'), rd('r المحسوبة', S.s2 && S.V1 != null ? Q59.f((S.V1 - D.V(S)) / D.I(S), 3) + ' Ω' : '—')]; },
    explain(S) { return Q26.ex(S.md === 'meas' ? 'للمقاومة الصغيرة يكون خطأ الشكل 15 صغيراً جداً، وللكبيرة يكون خطأ الشكل 16 صغيراً.' : 'عند غلق S2 تهبط قراءة الفولطميتر عن ε بمقدار I r.', S.md === 'meas' ? 'في الشكل 15 يمر جزء صغير من التيار في الفولطميتر، ويهمل إذا كانت Rx صغيرة. وفي الشكل 16 يقيس الفولطميتر جهد الأميتر أيضاً، ويهمل إذا كانت Rx كبيرة.' : 'الفولطميتر عالي المقاومة يسحب تياراً مهملاً فيقرأ ε في الدائرة المفتوحة. ومع مرور التيار يضيع جزء من الجهد على المقاومة الداخلية.', 'يستعمل الفنيون هذه الطريقة لفحص البطاريات القديمة: مقاومتها الداخلية كبيرة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A9 — قنطرة وتستون وقنطرة السلك المنزلق ومثال 6 (الأشكال 17–19، ص 210–211) =============== */
(() => {
  const XS = [['x1', 'المجهولة 1', 15], ['x2', 'المجهولة 2', 68], ['x3', 'المجهولة 3', 220]];
  const EX = { title: 'مثال 6 ص 211', q: 'في الشكل 19 المقاومات R و 10 Ω و 2 Ω و 4 Ω ، والبطارية مقاومتها الداخلية 1 Ω. قراءة الكلفانوميتر صفر عندما يمر 0.6 A في R. احسب R والتيارات و ε.', lines: ['اتزان القنطرة:', 'R / 10 = 4 / 2', 'R = 20 Ω', 'Vac = 0.6 × (20 + 10) = 18 V', 'I(adc) = 18 / (4 + 2) = 3 A', 'I = 0.6 + 3 = 3.6 A', 'Req = 30 × 6 / (30 + 6) = 5 Ω', 'ε = I Req + I r = 3.6 × 5 + 3.6 × 1', 'القوة الدافعة ε = 21.6 V'] };
  const D = { id: 'g11_i_bridge', page: 210, fig: 'الأشكال 17 و 18 و 19 + مثال 6',
    desc: 'قنطرة وتستون: أربع مقاومات على أضلاع شكل رباعي، ثلاث منها معلومة متغيرة والرابعة R1 مجهولة، وكلفانوميتر بين b و d. نغيّر المقاومات حتى تصبح قراءة الكلفانوميتر صفراً (Vbd = 0) فتتزن القنطرة: R1 / R2 = R3 / R4. في قنطرة السلك المنزلق نستبدل R3 و R4 بسلك منتظم فيه نقطة تماس منزلقة: R1 / R2 = L1 / L2.',
    tags: 'قنطرة وتستون الكلفانوميتر اتزان القنطرة R1/R2=R3/R4 قنطرة السلك المنزلق القنطرة المترية L1/L2 مثال 6 الشكل 17 الشكل 18 الشكل 19 21.6V',
    tools: ['ثلاث مقاومات معلومة متغيرة', 'مقاومة مجهولة', 'كلفانوميتر صفره في الوسط', 'بطارية ومفتاح', 'سلك منتظم طوله 100 cm ومسطرة ومنزلقة'],
    steps: ['في «قنطرة وتستون» اسحب مقبض R2 حتى يشير الكلفانوميتر إلى الصفر.', 'اقرأ R1 = R2 × R3 / R4 في البطاقة، وغيّر R3 و R4 من اللوحة وأعد الاتزان.', 'في «السلك المنزلق» اسحب المنزلقة على السلك حتى ينعدم انحراف الكلفانوميتر ثم اقرأ L1 و L2.', 'في «مثال 6» اسحب مقبض R حتى الاتزان ثم اضغط «حل مثال 6».'],
    concl: ['عند الاتزان لا يمر تيار في الكلفانوميتر و Vb = Vd.', 'I1 R1 = I2 R3 و I1 R2 = I2 R4 ومنهما R1 / R2 = R3 / R4.', 'في القنطرة المترية R1 / R2 = L1 / L2 لأن مقاومة السلك تتناسب مع طوله.', 'مثال 6: R = 20 Ω ، التيار في الفرع الآخر 3 A ، و ε = 21.6 V.'],
    laws: ['g11_l9_bridge'],
    controls: [R('R2', 'المقاومة المتغيرة R2', 1, 300, 40, 1, 'Ω'), R('R3', 'المقاومة R3', 1, 100, 20, 1, 'Ω'), R('R4', 'المقاومة R4', 1, 100, 10, 1, 'Ω'), R('L1', 'موضع المنزلقة L1', 1, 99, 30, .5, 'cm')],
    setup(S) { S.md = 'wh'; S.x = 'x1'; S.nd = 0; S.R6 = 12; S.R6t = 12; S.ex = 0; S.k = 0; S.Ld = 30; S.R2d = 40; S.fp = 0; },
    Rx(S) { return XS.find(q => q[0] === S.x)[2]; },
    vbd(S) { if (S.md === 'ex6') return S.R6 / (S.R6 + 10) - 4 / 6; if (S.md === 'slide') return D.Rx(S) / (D.Rx(S) + S.p.R2) - S.Ld / 100; return D.Rx(S) / (D.Rx(S) + S.R2d) - S.p.R3 / (S.p.R3 + S.p.R4); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 210, cy: 212, dx: 130, dy: 82, tx0: L + 60, tx1: w - 70, ty: 420 }; },
    update(S, dt) { S.R6 = Q59.ease(S.R6, S.R6t, dt, 8); S.Ld = Q59.ease(S.Ld, S.p.L1, dt, 10); S.R2d = Q59.ease(S.R2d, S.p.R2, dt, 10); S.nd = Q59.ease(S.nd, clamp(D.vbd(S) * 6, -1, 1), dt, 5); Q33.adv(S, dt, 1, 30); },
    diamond(ctx, g, labs, S, bat) {
      const { cx, cy, dx, dy } = g, A = [cx - dx, cy], B = [cx, cy - dy], C = [cx + dx, cy], Dd = [cx, cy + dy];
      Q59.zig(ctx, A, B, labs[0], { bl: 46, side: 1, lc: '#b91c1c' }); Q59.zig(ctx, B, C, labs[1], { bl: 46, side: 1 }); Q59.zig(ctx, A, Dd, labs[2], { bl: 46, side: -1 }); Q59.zig(ctx, Dd, C, labs[3], { bl: 46, side: -1 });
      Q59.path(ctx, [B, [cx, cy - 30]], '#475569', 2); Q59.path(ctx, [[cx, cy + 30], Dd], '#475569', 2); Q59.galv(ctx, cx, cy - 4, S.nd, { r: 26, lab: '' });
      Q42.T(ctx, Math.abs(S.nd) < .03 ? 'متزنة' : 'غير متزنة', cx + 62, cy, { s: 10.5, w: 900, c: '#fff', bg: Math.abs(S.nd) < .03 ? '#16a34a' : '#b91c1c' });
      const yb = cy + dy + 28; Q59.path(ctx, [A, [A[0] - 20, cy], [A[0] - 20, yb], [cx - 40, yb]]); Q59.cellS(ctx, [cx - 40, yb], [cx + 40, yb], bat || 'ε', { side: 1, off: 18 }); Q59.path(ctx, [[cx + 40, yb], [C[0] + 20, yb], [C[0] + 20, cy], C]);
      [[A, 'a'], [B, 'b'], [C, 'c'], [Dd, 'd']].forEach(([p, l], i) => Q59.node(ctx, p[0], p[1], l, { dx: i === 0 ? -14 : i === 2 ? 14 : 14, dy: i === 1 ? -12 : i === 3 ? 12 : -12 }));
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q59.bg(ctx, w, h); Q59.panel(ctx, g.L + 24, 84, w - g.L - 370, 280, S.md === 'slide' ? 'الشكل 18: قنطرة السلك المنزلق' : S.md === 'ex6' ? 'الشكل 19: مثال 6' : 'الشكل 17: قنطرة وتستون');
      const bal = Math.abs(S.nd) < .03;
      if (S.md === 'slide') D.slide(ctx, w, h, S, g);
      else {
        const ex6 = S.md === 'ex6'; D.diamond(ctx, g, ex6 ? ['R = ' + Q59.f(S.R6, 1) + ' Ω', '10 Ω', '4 Ω', '2 Ω'] : ['R1 = ?', 'R2 = ' + Q59.f(S.R2d, 0) + ' Ω', 'R3 = ' + S.p.R3 + ' Ω', 'R4 = ' + S.p.R4 + ' Ω'], S, ex6 ? 'ε     r = 1 Ω' : 'ε');
        // resistance box slider
        const v = ex6 ? S.R6 : S.R2d, mx = ex6 ? 40 : 300, kx = g.tx0 + (v / mx) * (g.tx1 - g.tx0);
        Q59.panel(ctx, g.L + 24, 380, w - g.L - 60, 110, ex6 ? 'مقبض المقاومة R' : 'صندوق المقاومات R2');
        K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.ty - 8, 0, g.ty + 8); gr.addColorStop(0, '#e2e8f0'); gr.addColorStop(1, '#64748b'); ctx.fillStyle = gr; rr(ctx, g.tx0, g.ty - 6, g.tx1 - g.tx0, 12, 6); ctx.fill(); const gk = ctx.createRadialGradient(kx - 4, g.ty - 4, 2, kx, g.ty, 16); gk.addColorStop(0, '#fde68a'); gk.addColorStop(1, '#a16207'); ctx.fillStyle = gk; ctx.beginPath(); ctx.arc(kx, g.ty, 15, 0, TAU); ctx.fill(); });
        for (let k = 0; k <= 4; k++) Q42.T(ctx, Q59.f(mx * k / 4, 0) + ' Ω', g.tx0 + k / 4 * (g.tx1 - g.tx0), g.ty + 28, { s: 10, w: 800, c: '#64748b' });
        if (ex6 && S.ex) Q59.steps(ctx, S, Object.assign({}, EX, { k: S.k }));
        else if (ex6) Q59.card(ctx, S, [{ t: 'عند الاتزان:', mono: 0 }, { t: 'R / 10 = 4 / 2', mono: 1 }, { t: 'R = ' + Q59.f(S.R6, 1) + ' Ω', mono: 1, w: 900, c: bal ? '#15803d' : '#b91c1c' }, { t: bal ? 'متزنة: لا تيار في الكلفانوميتر' : 'اسحب المقبض حتى ينعدم الانحراف', c: '#334155' }, { t: 'التيار في R يساوي 0.6 A', c: '#64748b' }], { title: 'مثال 6' });
        else Q59.card(ctx, S, [{ t: 'Vbd = ' + Q59.f(D.vbd(S) * 6, 3) + ' V', mono: 1, c: bal ? '#15803d' : '#b91c1c' }, { t: 'R1 / R2 = R3 / R4', mono: 1 }, { t: 'R1 = R2 × R3 / R4', mono: 1 }, { t: 'R1 = ' + Q59.f(S.R2d * S.p.R3 / S.p.R4, 1) + ' Ω', mono: 1, w: 900, c: '#b45309' }, { t: bal ? 'متزنة: هذه قيمة المجهولة' : 'غير متزنة بعد: غيّر R2', c: bal ? '#15803d' : '#b91c1c', w: 800 }], { title: 'قنطرة وتستون' });
      }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.c);
      Q42.banner(ctx, w, 'غيّر المقاومة حتى تصبح قراءة الكلفانوميتر صفراً', '#a16207');
    },
    slide(ctx, w, h, S, g) {
      const x0 = g.L + 60, x1 = g.L + 400, wy = 262, ty = 128, j = x0 + S.Ld / 100 * (x1 - x0), Rx = D.Rx(S);
      K.raw(ctx, () => { ctx.fillStyle = '#a16207'; rr(ctx, x0 - 20, wy + 6, x1 - x0 + 40, 30, 4); ctx.fill(); ctx.fillStyle = '#fef3c7'; ctx.fillRect(x0, wy + 10, x1 - x0, 14); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1; for (let k = 0; k <= 100; k += 5) { const x = x0 + k / 100 * (x1 - x0); ctx.beginPath(); ctx.moveTo(x, wy + 10); ctx.lineTo(x, wy + (k % 10 ? 16 : 22)); ctx.stroke(); } });
      Q41.line(ctx, [[x0, wy], [x1, wy]], '#94a3b8', 3);
      Q59.path(ctx, [[x0, wy], [x0, ty]]); Q59.zig(ctx, [x0, ty], [(x0 + x1) / 2, ty], 'R1 = ?', { bl: 60, lc: '#b91c1c', side: -1 }); Q59.zig(ctx, [(x0 + x1) / 2, ty], [x1, ty], 'R2 = ' + S.p.R2 + ' Ω', { bl: 60, side: -1 }); Q59.path(ctx, [[x1, ty], [x1, wy]]);
      Q59.node(ctx, (x0 + x1) / 2, ty, 'b'); Q59.path(ctx, [[(x0 + x1) / 2, ty], [(x0 + x1) / 2, ty + 34]], '#475569', 2); Q59.galv(ctx, (x0 + x1) / 2, ty + 62, S.nd, { r: 26, lab: '' }); Q59.path(ctx, [[(x0 + x1) / 2, ty + 90], [(x0 + x1) / 2, ty + 110], [j, ty + 110], [j, wy - 14]], '#475569', 2);
      K.raw(ctx, () => { ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.moveTo(j - 9, wy - 22); ctx.lineTo(j + 9, wy - 22); ctx.lineTo(j, wy - 2); ctx.closePath(); ctx.fill(); });
      Q59.path(ctx, [[x0, wy], [x0 - 30, wy], [x0 - 30, wy + 62], [x0 + 120, wy + 62]]); Q59.cellS(ctx, [x0 + 120, wy + 62], [x0 + 200, wy + 62], 'ε', { side: 1, off: 18 }); Q59.path(ctx, [[x0 + 200, wy + 62], [x1 + 30, wy + 62], [x1 + 30, wy], [x1, wy]]);
      Q42.T(ctx, 'L1 = ' + Q59.f(S.Ld, 1) + ' cm', (x0 + j) / 2, wy - 30, { s: 11, w: 900, c: '#1d4ed8' }); Q42.T(ctx, 'L2 = ' + Q59.f(100 - S.Ld, 1) + ' cm', (j + x1) / 2, wy - 30, { s: 11, w: 900, c: '#1d4ed8' });
      const bal = Math.abs(S.nd) < .03;
      Q59.card(ctx, S, [{ t: 'R1 / R2 = L1 / L2', mono: 1 }, { t: 'R1 = R2 × L1 / L2', mono: 1 }, { t: 'R1 = ' + Q59.f(S.p.R2 * S.Ld / (100 - S.Ld), 1) + ' Ω', mono: 1, w: 900, c: '#b45309' }, { t: bal ? 'متزنة: هذه قيمة المجهولة' : 'اسحب المنزلقة حتى ينعدم الانحراف', c: bal ? '#15803d' : '#b91c1c', w: 800 }, { t: 'القيمة الحقيقية تظهر عند الاتزان: ' + (bal ? Rx + ' Ω' : '؟'), c: '#64748b' }], { title: 'القنطرة المترية' });
    },
    chips(S, g) { return { m: Q59.chips(S, 'md', [['wh', 'قنطرة وتستون'], ['slide', 'السلك المنزلق'], ['ex6', 'مثال 6']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.ex = 0; S2.k = 0; }, { bw: 170 }),
      c: S.md === 'ex6' ? Q59.stepChips(S, 'ex', g.h - 84, g.L, 'حل مثال 6', S2 => { S2.R6t = 20; }, EX.lines.length)
        : Q59.chips(S, 'x', XS.map(q => [q[0], q[1]]), g.h - 84, S.x, (S2, k) => { S2.x = k; }, { bw: 150 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), L = [];
      if (S.md === 'slide') { const x0 = g.L + 60, x1 = g.L + 400; L.push({ id: 'jk', x: x0 + S.p.L1 / 100 * (x1 - x0), y: 250, r: 22, axis: 'x', keep: true, tip: 'اسحب المنزلقة على السلك', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'L1', Math.round(clamp((d.x - x0) / (x1 - x0) * 100, 1, 99) * 2) / 2) }); }
      else { const ex6 = S.md === 'ex6', mx = ex6 ? 40 : 300, v = ex6 ? S.R6t : S.p.R2;
        L.push({ id: 'knob', x: g.tx0 + v / mx * (g.tx1 - g.tx0), y: g.ty, r: 22, axis: 'x', keep: true, tip: ex6 ? 'اسحب: غيّر R' : 'اسحب: غيّر R2', idle: 'اسحب ✋', drag: (S2, d) => { const q = clamp((d.x - g.tx0) / (g.tx1 - g.tx0), 0, 1) * mx; if (ex6) S2.R6t = Math.max(1, Math.round(q * 2) / 2); else setParam(S2, 'R2', Math.max(1, Math.round(q))); } }); }
      return L.concat(C.m, C.c); },
    readings(S) { return [rd('Vbd', Q59.f(D.vbd(S) * 6, 3) + ' V'), rd('الحالة', Math.abs(D.vbd(S) * 6) < .03 ? 'متزنة' : 'غير متزنة'), S.md === 'slide' ? rd('L1 / L2', Q59.f(S.p.L1, 1) + ' / ' + Q59.f(100 - S.p.L1, 1)) : S.md === 'ex6' ? rd('R', Q59.f(S.R6t, 1) + ' Ω') : rd('R2 × R3 / R4', Q59.f(S.p.R2 * S.p.R3 / S.p.R4, 1) + ' Ω')]; },
    explain(S) { return Q26.ex('عندما يشير الكلفانوميتر إلى الصفر تكون القنطرة متزنة.', 'عند الاتزان Vb = Vd فلا يمر تيار في الكلفانوميتر، ويكون هبوط الجهد على R1 مساوياً لهبوطه على R3 ، وعلى R2 مساوياً لهبوطه على R4 ، فنحصل على R1 / R2 = R3 / R4.', 'تستعمل القنطرة لقياس المقاومات بدقة عالية، وفي أجهزة قياس درجة الحرارة والإجهاد.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A10 — القدرة الكهربائية P = I ΔV ومثال 7 وأعظم قدرة (9-8، الشكلان 20 و 21، ص 212–214) =============== */
(() => {
  const EX = { title: 'مثال 7 ص 214', q: 'بطارية قوتها الدافعة 12 V ومقاومتها الداخلية 0.05 Ω ربطت بمقاومة حمل 3 Ω. احسب التيار وفولطية الأقطاب والقدرة في الحمل وفي المقاومة الداخلية وقدرة المصدر.', lines: ['I = ε / (R + r) = 12 / 3.05', 'I = 3.93 A', 'ΔV = I R = 3.93 × 3 = 11.8 V', 'P(R) = I² R = 3.93² × 3 = 46.3 W', 'P(r) = I² r = 3.93² × 0.05 = 0.772 W', 'قدرة المصدر تساوي مجموعهما:', 'P = ε I = 46.3 + 0.772 = 47.1 W'] };
  const D = { id: 'g11_i_power', page: 212, fig: 'الشكلان 20 و 21 + مثال 7',
    desc: 'عندما تنتقل الشحنة Δq عبر جهاز بين طرفيه فرق جهد ΔV تفقد طاقة Δq ΔV تتحول إلى حرارة أو ضوء أو حركة. القدرة الكهربائية هي الطاقة المستهلكة في وحدة الزمن: P = I ΔV = I² R = ΔV² / R ووحدتها الواط، والطاقة E = P t. أعظم قدرة تنتقل من المصدر إلى الحمل عندما تساوي مقاومة الحمل المقاومة الداخلية، وعندها تكون قدرة الحمل نصف قدرة المصدر.',
    tags: 'القدرة الكهربائية P=IV P=I²R P=V²/R الواط الطاقة E=Pt الحمل المقاومة الداخلية أعظم قدرة R=r نصف قدرة المصدر مثال 7 46.3W الشكل 20 الشكل 21 فكر',
    tools: ['بطارية ذات مقاومة داخلية', 'سخان كهربائي (مقاومة حمل متغيرة)', 'أميتر وفولطميتر', 'ساعة توقيت'],
    steps: ['اسحب مقبض R على المخطط (أو من اللوحة) وراقب توهج السخان وأعمدة القدرة.', 'اختر «مثال 7» واضغط «حل مثال 7» خطوة خطوة.', 'اختر «أعظم قدرة: فكر» ثم اسحب R: أكبر قدرة في الحمل عندما R = r.', 'شغّل العداد لترى الطاقة E = P t تتجمع مع الزمن.'],
    concl: ['P = I ΔV = I² R = ΔV² / R ، والواط W = J/s = A·V.', 'قدرة المصدر ε I = قدرة الحمل I² R + القدرة الضائعة I² r.', 'مثال 7: I = 3.93 A و ΔV = 11.8 V و P = 46.3 W و 0.772 W و 47.1 W.', 'عند R = r تنتقل أعظم قدرة إلى الحمل، وهي نصف قدرة المصدر.'],
    laws: ['g11_l9_power'],
    controls: [R('e', 'القوة الدافعة ε', 1.5, 24, 12, .5, 'V'), R('r', 'المقاومة الداخلية r', .05, 5, .05, .05, 'Ω'), R('R', 'مقاومة الحمل R', .1, 20, 3, .1, 'Ω'), TG('run', 'عداد الطاقة يعمل', true, null, 'timer')],
    setup(S) { S.md = 'dev'; S.ex = 0; S.k = 0; S.Rd = 3; S.tE = 0; S.En = 0; S.fp = 0; },
    I(S, R) { return S.p.e / ((R == null ? S.Rd : R) + S.p.r); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, gx: L + 70, gy: 360, gw: w - L - 300, gh: 200 }; },
    update(S, dt) { S.Rd = Q59.ease(S.Rd, S.p.R, dt, 8); const I = D.I(S); Q33.adv(S, dt, Math.min(I, 5), 40); if (S.p.run) { S.tE += dt; S.En += I * I * S.Rd * dt; } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), I = D.I(S), PR = I * I * S.Rd, Pr = I * I * S.p.r, Ps = S.p.e * I, Pm = S.p.e * S.p.e / (4 * S.p.r); Q59.bg(ctx, w, h);
      // schematic with heater
      const x0 = g.L + 70, x1 = g.L + 380, y0 = 128, y1 = 300, my = (y0 + y1) / 2;
      Q59.panel(ctx, g.L + 24, 84, x1 - g.L + 20, 250, S.md === 'ex7' ? 'الشكل 21: مثال 7' : 'الشكل 20: البطارية والجهاز');
      Q59.dbox(ctx, x0 - 26, y0 + 22, 52, y1 - y0 - 44, 'البطارية'); Q59.cellS(ctx, [x0, my + 50], [x0, my - 10], 'ε', { side: 1 }); Q59.zig(ctx, [x0, my - 10], [x0, y0 + 22], 'r', { bl: 30, side: -1, hot: Pr / Math.max(Pm, 1) }); Q59.path(ctx, [[x0, y0 + 22], [x0, y0], [x1 - 40, y0]]); Q59.path(ctx, [[x0, my + 50], [x0, y1], [x1 - 40, y1]]);
      const hot = clamp(PR / Math.max(Pm, 1), 0, 1), hx = x1 - 40;
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#334155'; rr(ctx, hx - 10, y0 + 10, 70, y1 - y0 - 20, 10); ctx.fill(); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = 'rgb(' + Math.round(120 + 135 * hot) + ',' + Math.round(70 + 90 * hot * hot) + ',' + Math.round(50) + ')'; ctx.shadowColor = 'rgba(249,115,22,' + hot + ')'; ctx.shadowBlur = 20 * hot; ctx.beginPath(); for (let k = 0; k <= 80; k++) { const t = k / 80, y = y0 + 22 + t * (y1 - y0 - 44), x = hx + 25 + 18 * Math.sin(t * TAU * 7); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); });
      Q59.path(ctx, [[hx, y0], [hx + 25, y0], [hx + 25, y0 + 22]]); Q59.path(ctx, [[hx, y1], [hx + 25, y1], [hx + 25, y1 - 22]]);
      Q59.node(ctx, hx + 25, y0 + 4, 'A +', { dx: 26, dy: 0 }); Q59.node(ctx, hx + 25, y1 - 4, 'B −', { dx: 26, dy: 0 }); Q42.T(ctx, 'R = ' + Q59.f(S.Rd, 1) + ' Ω', hx + 25, y1 + 18, { s: 11, w: 900, c: '#7c2d12' });
      Q59.dots(ctx, [[x0, y1], [x0, y0], [hx + 25, y0], [hx + 25, y1], [x0, y1]], S.fp, true);
      Q59.meterS(ctx, x0 + 130, y0, 'A', Q59.f(I, 2) + ' A', '#a16207');
      // P vs R graph
      const ym = Math.max(1, Pm * 1.15), A = Q59.ax(ctx, { x: g.gx, y: g.gy, w: g.gw, h: g.gh, x0: 0, x1: 20, y0: 0, y1: ym, xs: 2, ys: ym / 5, lx: 4, ly: ym / 5, xl: 'R (Ω)', yl: 'P (W)' });
      const P = []; for (let R = .02; R <= 20; R += .05) P.push([A.X(R), A.Y(Math.min(ym, D.I(S, R) ** 2 * R))]); Q41.line(ctx, P, '#ea580c', 2.6);
      if (S.p.r <= 20) { Q41.line(ctx, [[A.X(S.p.r), A.Y(0)], [A.X(S.p.r), A.Y(Pm)]], 'rgba(22,163,74,.6)', 1.5, [5, 4]); Q42.T(ctx, 'R = r', A.X(S.p.r) + 26, A.Y(Pm) - 10, { s: 10.5, w: 900, c: '#15803d' }); }
      Q41.dot(ctx, A.X(S.Rd), A.Y(Math.min(ym, PR)), '#dc2626', 7);
      // bars
      const bx = w - 200; Q59.vbar(ctx, bx, g.gy + g.gh, 50, g.gh, Math.max(Ps, .1), [[Ps, '#16a34a', '']], 'εI'); Q59.vbar(ctx, bx + 70, g.gy + g.gh, 50, g.gh, Math.max(Ps, .1), [[PR, '#ea580c', 'I²R'], [Pr, '#dc2626', '']], 'I²R + I²r');
      Q42.T(ctx, 'الكفاءة ' + Q59.f(S.Rd / (S.Rd + S.p.r) * 100, 0) + ' %', bx + 60, g.gy - 14, { s: 11, w: 900, c: '#334155' });
      if (S.ex && S.md === 'ex7') Q59.steps(ctx, S, Object.assign({}, EX, { k: S.k }));
      else Q59.card(ctx, S, [{ t: 'I = ' + Q59.f(I, 3) + ' A     ΔV = ' + Q59.f(I * S.Rd, 2) + ' V', mono: 1 }, { t: 'P(R) = I² R = ' + Q59.f(PR, 2) + ' W', mono: 1, c: '#ea580c', w: 900 }, { t: 'P(r) = I² r = ' + Q59.f(Pr, 3) + ' W', mono: 1, c: '#b91c1c' }, { t: 'P = ε I = ' + Q59.f(Ps, 2) + ' W', mono: 1, c: '#15803d' }, S.md === 'max' ? { t: Math.abs(S.Rd - S.p.r) < .06 ? 'R = r: أعظم قدرة = نصف قدرة المصدر' : 'اسحب R حتى تساوي r', c: '#15803d', w: 900 } : { t: 'الطاقة في الحمل خلال ' + Q59.f(S.tE, 0) + ' s', c: '#334155' }, S.md === 'max' ? { t: 'P(R) / P = ' + Q59.f(PR / Ps * 100, 0) + ' %', mono: 1 } : { t: 'E = ' + Q59.f(S.En, 0) + ' J', mono: 1, c: '#1d4ed8', w: 900 }], { title: S.md === 'max' ? 'فكر: أعظم قدرة' : 'القدرة الكهربائية' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.c);
      Q42.banner(ctx, w, 'اسحب مقاومة الحمل وراقب القدرة', '#a16207');
    },
    chips(S, g) { return { m: Q59.chips(S, 'md', [['dev', 'P = I ΔV'], ['ex7', 'مثال 7'], ['max', 'أعظم قدرة: فكر']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.ex = 0; S2.k = 0; S2.En = 0; S2.tE = 0; if (k === 'ex7') { setParam(S2, 'e', 12); setParam(S2, 'r', .05); setParam(S2, 'R', 3); } if (k === 'max') { setParam(S2, 'r', 2); setParam(S2, 'R', 8); } }, { bw: 170 }),
      c: S.md === 'ex7' ? Q59.stepChips(S, 'ex', g.h - 84, g.L, 'حل مثال 7', S2 => { setParam(S2, 'e', 12); setParam(S2, 'r', .05); setParam(S2, 'R', 3); }, EX.lines.length)
        : Q59.chips(S, 'q', [['eq', 'اجعل R = r'], ['z', '↺ صفّر العداد']], g.h - 84, '', (S2, k) => { if (k === 'eq') setParam(S2, 'R', Math.max(.1, Math.round(S2.p.r * 10) / 10)); else { S2.En = 0; S2.tE = 0; } }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'Rp', x: g.gx + S.p.R / 20 * g.gw, y: g.gy + g.gh / 2, r: 22, axis: 'x', keep: true, tip: 'اسحب: غيّر مقاومة الحمل', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'R', Math.round(clamp((d.x - g.gx) / g.gw * 20, .1, 20) * 10) / 10) }].concat(C.m, C.c); },
    readings(S) { const I = D.I(S, S.p.R); return [rd('التيار', Q59.f(I, 3) + ' A'), rd('قدرة الحمل', Q59.f(I * I * S.p.R, 2) + ' W'), rd('القدرة الضائعة', Q59.f(I * I * S.p.r, 3) + ' W'), rd('قدرة المصدر', Q59.f(S.p.e * I, 2) + ' W')]; },
    record(S) { const I = D.I(S, S.p.R); return { R: Q59.f(S.p.R, 1), I: Q59.f(I, 3), P: Q59.f(I * I * S.p.R, 2) }; },
    cols: [['R', 'R (Ω)'], ['I', 'I (A)'], ['P', 'P (W)']],
    explain(S) { return Q26.ex('قدرة الحمل تزداد ثم تقل عندما نكبّر R ، وتبلغ أعظم قيمة عند R = r.', 'P = I² R: تصغير R يزيد التيار لكن يضيع معظم القدرة داخل البطارية، وتكبيرها يقلل التيار. عند R = r تتقاسم المقاومتان القدرة بالتساوي فتكون قدرة الحمل نصف قدرة المصدر.', 'السخان والمكواة يحولان الطاقة الكهربائية إلى حرارة، ويقاس استهلاكها بالواط والكيلوواط ساعة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A11 — ربط المقاومات على التوالي والتوازي ومثال 8 والشكلان 25 و 26 (9-9، 9-10، ص 215–218) =============== */
(() => {
  const EX = { ser: { title: 'مثال 8 ص 216', q: 'ثلاث مقاومات 2 Ω و 3 Ω و 5 Ω ربطت على التوالي مع مصدر 20 V. احسب المقاومة المكافئة والتيار وفرق الجهد على كل مقاومة.', lines: ['Req = 2 + 3 + 5 = 10 Ω', 'I = V / Req = 20 / 10 = 2 A', 'V1 = I R1 = 2 × 2 = 4 V', 'V2 = I R2 = 2 × 3 = 6 V', 'V3 = I R3 = 2 × 5 = 10 V', 'V = 4 + 6 + 10 = 20 V'] },
    par: { title: 'الشكل 26 ص 218', q: 'المقاومات 2 Ω و 3 Ω و 6 Ω ربطت على التوازي بين K و L مع مصدر 12 V.', lines: ['1 / Req = 1/2 + 1/3 + 1/6 = 1', 'Req = 1 Ω', 'I1 = 12 / 2 = 6 A', 'I2 = 12 / 3 = 4 A', 'I3 = 12 / 6 = 2 A', 'I = 6 + 4 + 2 = 12 A'] } };
  const DEV = [['تلفاز', 110, '#1e293b'], ['فيديو', 44, '#475569'], ['مصباح', 66, '#facc15']];
  const D = { id: 'g11_i_combo', page: 215, fig: 'الأشكال 22 إلى 26 + مثال 8',
    desc: 'في ربط التوالي مسار واحد للتيار: I = I1 = I2 = I3 و V = V1 + V2 + V3 و Req = R1 + R2 + R3 ، وإذا تلف مصباح انفتحت الدائرة كلها (مصابيح الزينة). في ربط التوازي يكون فرق الجهد نفسه على كل فرع V = V1 = V2 = V3 ، والتيار الكلي I = I1 + I2 + I3 و 1 / Req = 1/R1 + 1/R2 + 1/R3 ، وهكذا تربط الأجهزة في المنازل على 220 V فلا يؤثر إطفاء جهاز في غيره.',
    tags: 'ربط التوالي ربط التوازي المقاومة المكافئة Req مصابيح الزينة الأجهزة المنزلية 220V تلفاز فيديو مثال 8 الشكل 22 الشكل 23 الشكل 24 الشكل 25 الشكل 26',
    tools: ['ثلاثة مصابيح بمقاومات مختلفة', 'مجهز فولطية متغير', 'أسلاك ومفاتيح', 'أميتر وفولطميتر'],
    steps: ['في «توالي: مثال 8» راقب التيار نفسه في المصابيح الثلاثة، واضغط مصباحاً لتتلفه: تنطفئ كلها.', 'في «توازي: الشكل 26» أتلف مصباحاً: يبقى الآخران مضيئين بالسطوع نفسه.', 'غيّر المقاومات وفرق الجهد من اللوحة وقارن الأعمدة.', 'في «المنزل: الشكل 25» شغّل الأجهزة وأطفئها وراقب التيار الكلي.'],
    concl: ['التوالي: Req = R1 + R2 + R3 أكبر من أكبر مقاومة، والتيار واحد.', 'التوازي: Req أصغر من أصغر مقاومة، والجهد واحد على كل فرع.', 'مثال 8: Req = 10 Ω و I = 2 A و 4 V و 6 V و 10 V.', 'الشكل 26: Req = 1 Ω والتيارات 6 A و 4 A و 2 A ومجموعها 12 A.'],
    laws: ['g11_l9_series', 'g11_l9_parallel'],
    controls: [R('V', 'فرق جهد المصدر V', 1, 24, 20, .5, 'V'), R('R1', 'R1', 1, 20, 2, .5, 'Ω'), R('R2', 'R2', 1, 20, 3, .5, 'Ω'), R('R3', 'R3', 1, 20, 5, .5, 'Ω')],
    setup(S) { S.md = 'ser'; S.out = [0, 0, 0]; S.on = [1, 1, 1]; S.ex = 0; S.k = 0; S.fp = 0; S.bd = [0, 0, 0]; },
    Rs(S) { return [S.p.R1, S.p.R2, S.p.R3]; },
    calc(S) { const R = D.Rs(S), V = S.p.V;
      if (S.md === 'ser') { const ok = !S.out.some(x => x), Req = R[0] + R[1] + R[2], I = ok ? V / Req : 0; return { Req, I, Ii: R.map(() => I), Vi: R.map(r => I * r) }; }
      if (S.md === 'par') { const Ii = R.map((r, i) => S.out[i] ? 0 : V / r), G = R.reduce((a, r, i) => a + (S.out[i] ? 0 : 1 / r), 0); return { Req: G ? 1 / G : Infinity, I: Ii[0] + Ii[1] + Ii[2], Ii, Vi: R.map((r, i) => S.out[i] ? 0 : V) }; }
      const Ii = DEV.map((d, i) => S.on[i] ? d[1] / 220 : 0); return { Req: 0, I: Ii[0] + Ii[1] + Ii[2], Ii, Vi: DEV.map(() => 220) }; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 60, x1: w - 380, y0: 130, y1: 300 }; },
    lamps(S, g) { const n = 3; return [0, 1, 2].map(i => S.md === 'ser' ? [g.x0 + 80 + i * (g.x1 - g.x0 - 110) / 2, g.y0 + 96] : [g.x0 + 120 + i * (g.x1 - g.x0 - 130) / 2, (g.y0 + g.y1) / 2 + 30]); },
    update(S, dt) { const c = D.calc(S); S.bd = S.bd.map((b, i) => Q59.ease(b, S.md === 'home' ? (S.on[i] ? 1 : 0) : Math.min(1.4, c.Ii[i] * c.Vi[i] / (S.md === 'ser' ? 8 : 40)), dt, 8)); Q33.adv(S, dt, Math.min(c.I, 4), 30); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = D.calc(S), P = D.lamps(S, g), R = D.Rs(S); Q59.bg(ctx, w, h);
      Q59.panel(ctx, g.L + 24, 84, g.x1 - g.L + 10, 250, S.md === 'ser' ? 'التوالي: الأشكال 22 و 23 و 24' : S.md === 'par' ? 'التوازي: الشكل 26' : 'المنزل: الشكل 25');
      const by = g.y1, src = S.md === 'home' ? '220 V' : Q59.f(S.p.V, 1) + ' V';
      if (S.md === 'ser') {
        const cl = Q33.cell(ctx, (g.x0 + g.x1) / 2, by, { V: src, w: 90, h: 28, label: src });
        Q33.wire(ctx, [cl.p, [g.x1, by], [g.x1, P[0][1]], [P[2][0] + 18, P[0][1]]], { col: '#dc2626' }); Q33.wire(ctx, [[P[2][0] - 18, P[2][1]], [P[1][0] + 18, P[1][1]]], { col: '#dc2626' }); Q33.wire(ctx, [[P[1][0] - 18, P[1][1]], [P[0][0] + 18, P[0][1]]], { col: '#dc2626' }); Q33.wire(ctx, [[P[0][0] - 18, P[0][1]], [g.x0, P[0][1]], [g.x0, by], cl.n], { col: '#111827' });
        if (c.I > .01) Q33.flow(ctx, [cl.p, [g.x1, by], [g.x1, P[0][1]], [g.x0, P[0][1]], [g.x0, by], cl.n], S.fp, 'c');
      } else {
        const top = g.y0 + 4, bot = by; const cl = Q33.cell(ctx, g.x0, (top + bot) / 2, { V: src, w: 80, h: 26, label: src, rot: -Math.PI / 2, sp: 0, sn: 0 });
        Q33.wire(ctx, [[g.x0, (top + bot) / 2 - 45], [g.x0, top], [g.x1 - 10, top]], { col: '#dc2626' }); Q33.wire(ctx, [[g.x0, (top + bot) / 2 + 45], [g.x0, bot], [g.x1 - 10, bot]], { col: '#111827' });
        P.forEach((q, i) => { Q33.wire(ctx, [[q[0] + 18, q[1]], [q[0] + 30, q[1]], [q[0] + 30, top]], { col: '#dc2626' }); Q33.wire(ctx, [[q[0] - 18, q[1]], [q[0] - 30, q[1]], [q[0] - 30, bot]], { col: '#111827' }); if (c.Ii[i] > .001) Q33.flow(ctx, [[q[0] + 30, top], [q[0] + 30, q[1]], [q[0] - 30, q[1]], [q[0] - 30, bot]], S.fp * (c.Ii[i] / Math.max(c.I, .01)) * 2, 'c'); });
        if (S.md === 'par') { Q59.node(ctx, g.x0, top, 'K', { dx: -14 }); Q59.node(ctx, g.x0, bot, 'L', { dx: -14, dy: 14 }); }
      }
      P.forEach((q, i) => { if (S.md === 'home') { const [n, pw, col] = DEV[i]; if (i === 2) Q33.bulb(ctx, q[0], q[1], S.bd[i], {}); else K.raw(ctx, () => { ctx.save(); ctx.fillStyle = col; rr(ctx, q[0] - 26, q[1] - 56, 52, 46, 6); ctx.fill(); ctx.fillStyle = S.on[i] ? 'rgba(125,211,252,' + (.4 + .5 * S.bd[i]) + ')' : '#0f172a'; rr(ctx, q[0] - 20, q[1] - 50, 40, 32, 4); ctx.fill(); ctx.fillStyle = '#334155'; rr(ctx, q[0] - 24, q[1] - 8, 48, 14, 3); ctx.fill(); ctx.restore(); });
          Q42.T(ctx, n + ' ' + pw + ' W', q[0], q[1] + 22, { s: 10.5, w: 900, c: S.on[i] ? '#15803d' : '#64748b' }); }
        else { Q33.bulb(ctx, q[0], q[1], S.bd[i], { burnt: !!S.out[i] }); Q42.T(ctx, 'R' + (i + 1) + ' = ' + R[i] + ' Ω', q[0], q[1] + 22, { s: 10.5, w: 900, c: '#7c2d12' }); } });
      // bars
      const bx = g.L + 40, bw = (w - g.L - 100) / 3; Q59.panel(ctx, g.L + 24, 350, w - g.L - 60, 220, 'كل جزء من الدائرة');
      const Im = Math.max(...c.Ii, .01), Vm = Math.max(...c.Vi, .01);
      [0, 1, 2].forEach(i => { const x = bx + i * bw + 20; Q59.vbar(ctx, x, 540, 40, 120, Im, [[c.Ii[i], '#2563eb', '']], 'I' + (i + 1)); Q59.vbar(ctx, x + 60, 540, 40, 120, Vm, [[c.Vi[i], '#dc2626', '']], 'V' + (i + 1));
        Q42.T(ctx, Q59.f(c.Ii[i], 2) + ' A', x + 20, 404, { s: 10.5, w: 900, c: '#1d4ed8' }); Q42.T(ctx, Q59.f(c.Vi[i], 1) + ' V', x + 80, 404, { s: 10.5, w: 900, c: '#b91c1c' }); });
      const st = EX[S.md];
      if (S.ex && st) Q59.steps(ctx, S, Object.assign({}, st, { k: S.k }));
      else Q59.card(ctx, S, S.md === 'home' ? [{ t: 'كل الأجهزة على 220 V', c: '#334155', w: 800 }, { t: 'I = I1 + I2 + I3', mono: 1 }, { t: 'I = ' + Q59.f(c.I, 2) + ' A', mono: 1, c: '#1d4ed8', w: 900 }, { t: 'إطفاء جهاز لا يؤثر في غيره', c: '#15803d' }] :
        [{ t: S.md === 'ser' ? 'Req = R1 + R2 + R3' : '1/Req = 1/R1 + 1/R2 + 1/R3', mono: 1 }, { t: 'Req = ' + Q59.f(c.Req, 3) + ' Ω', mono: 1, c: '#b45309', w: 900 }, { t: 'I = ' + Q59.f(c.I, 3) + ' A', mono: 1, c: '#1d4ed8' }, { t: S.md === 'ser' ? (S.out.some(x => x) ? 'مصباح تالف: انفتحت الدائرة كلها' : 'التيار نفسه في كل مصباح') : (S.out.some(x => x) ? 'الفروع الأخرى تبقى مضيئة' : 'الجهد نفسه على كل فرع'), c: S.out.some(x => x) ? '#b91c1c' : '#15803d', w: 800 }, { t: 'اضغط مصباحاً لتتلفه أو تصلحه', c: '#64748b' }], { title: S.md === 'ser' ? 'ربط التوالي' : S.md === 'par' ? 'ربط التوازي' : 'الأجهزة المنزلية' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); if (C.e) Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, S.md === 'home' ? 'شغّل الأجهزة وأطفئها' : 'اضغط مصباحاً لتتلفه وقارن التوالي بالتوازي', '#a16207');
    },
    chips(S, g) { return { m: Q59.chips(S, 'md', [['ser', 'توالي: مثال 8'], ['par', 'توازي: الشكل 26'], ['home', 'المنزل: الشكل 25']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.out = [0, 0, 0]; S2.ex = 0; S2.k = 0; if (k === 'ser') { setParam(S2, 'V', 20); setParam(S2, 'R1', 2); setParam(S2, 'R2', 3); setParam(S2, 'R3', 5); } if (k === 'par') { setParam(S2, 'V', 12); setParam(S2, 'R1', 2); setParam(S2, 'R2', 3); setParam(S2, 'R3', 6); } }, { bw: 180 }),
      e: EX[S.md] ? Q59.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, EX[S.md].lines.length) : Q59.chips(S, 'dv', DEV.map((d, i) => [String(i), (S.on[i] ? 'أطفئ ' : 'شغّل ') + d[0]]), g.h - 84, '', (S2, k) => { S2.on[+k] = S2.on[+k] ? 0 : 1; }, { bw: 150 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), P = D.lamps(S, g);
      return P.map((q, i) => ({ id: 'L' + i, x: q[0], y: q[1] - 34, r: 26, axis: 'none', hint: i === 0 ? undefined : false, idle: i === 0 ? 'اضغط ✋' : undefined, tip: S.md === 'home' ? 'اضغط: شغّل أو أطفئ' : 'اضغط: أتلف المصباح أو أصلحه', click: S2 => { S2.nk = (S2.nk || 0) + 1; if (S2.md === 'home') S2.on[i] = S2.on[i] ? 0 : 1; else S2.out[i] = S2.out[i] ? 0 : 1; } })).concat(C.m, C.e); },
    readings(S) { const c = D.calc(S); return [rd('المقاومة المكافئة', S.md === 'home' ? '—' : Q59.f(c.Req, 3) + ' Ω'), rd('التيار الكلي', Q59.f(c.I, 3) + ' A'), rd('التيارات', c.Ii.map(x => Q59.f(x, 2)).join(' , ') + ' A'), rd('فروق الجهد', c.Vi.map(x => Q59.f(x, 1)).join(' , ') + ' V')]; },
    explain(S) { return Q26.ex(S.md === 'ser' ? 'في التوالي يمر التيار نفسه في المصابيح، وإذا تلف أحدها انطفأت كلها.' : 'في التوازي يبقى كل فرع على فرق الجهد نفسه، وتلف فرع لا يطفئ الباقي.', S.md === 'ser' ? 'للتيار مسار واحد فقط، فالمقاومات تجمع وفرق الجهد يتوزع عليها بنسبة مقاوماتها.' : 'لكل فرع مساره الخاص بين النقطتين نفسيهما، فالتيار الكلي مجموع تيارات الفروع، والمقاومة المكافئة أصغر من أصغر مقاومة.', 'مصابيح الزينة القديمة تربط على التوالي، أما أجهزة المنزل فتربط على التوازي.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A12 — فكر الشكل 27 ومثال 9: المكافئة بين x و y (ص 218) =============== */
(() => {
  const EX = { title: 'مثال 9 ص 218', q: 'جد المقاومة المكافئة بين x و y في الشكل 28 والمفتاح مفتوح، ثم بعد غلقه.', lines: ['المفتاح مفتوح:', '30 + 50 = 80 Ω توالي', '20 + 60 = 80 Ω توالي', 'Req = 80 × 80 / 160 = 40 Ω', 'المفتاح مغلق:', 'Req = 0 : دائرة قصر'] };
  const D = { id: 'g11_i_req', page: 218, fig: 'الشكلان 27 و 28 + مثال 9',
    desc: 'فكر (الشكل 27): مصباحان 30 W و 60 W على التوازي مع مصدر 120 V ، رتّب التيارات في الفروع ab و cd و ef من الأكبر: ab = 0.75 A ثم cd = 0.5 A ثم ef = 0.25 A. مثال 9 (الشكل 28): فرعان كل منهما مقاومتان على التوالي (30 + 50) و (20 + 60) بينهما توازي فتكون المكافئة 40 Ω ، وعند غلق المفتاح يصبح بين x و y سلك بلا مقاومة فتصبح المكافئة صفراً.',
    tags: 'فكر الشكل 27 مصباح 30W 60W 120V ترتيب التيارات مثال 9 الشكل 28 المقاومة المكافئة 40Ω دائرة قصر المفتاح',
    tools: ['مصباحان 30 W و 60 W', 'مصدر 120 V', 'أربع مقاومات ومفتاح', 'أوميتر'],
    steps: ['في «فكر: الشكل 27» راقب سمك سهم التيار في كل فرع واقرأ قيمه.', 'غيّر قدرة المصباحين من اللوحة: الفرع الرئيس ab يحمل دائماً مجموعهما.', 'في «مثال 9» افتح المفتاح وأغلقه واقرأ الأوميتر بين x و y.', 'اضغط «الحل خطوة خطوة».'],
    concl: ['I = P / V: المصباح 60 W يسحب 0.5 A و 30 W يسحب 0.25 A.', 'الترتيب: ab ثم cd ثم ef.', 'مثال 9: Req = 40 Ω والمفتاح مفتوح.', 'غلق المفتاح يقصر الدائرة فتصبح Req صفراً ويمر التيار في السلك فقط.'],
    laws: ['g11_l9_parallel', 'g11_l9_power'],
    controls: [R('P1', 'قدرة المصباح في cd', 10, 100, 60, 5, 'W'), R('P2', 'قدرة المصباح في ef', 10, 100, 30, 5, 'W'), TG('swx', 'مفتاح الشكل 28 مغلق', false, null, 'power')],
    setup(S) { S.md = 'f27'; S.ex = 0; S.k = 0; S.fp = 0; S.om = 40; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 70, x1: w - 380, y0: 130, y1: 300 }; },
    update(S, dt) { S.om = Q59.ease(S.om, S.p.swx ? 0 : 40, dt, 6); Q33.adv(S, dt, 1, 40); },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q59.bg(ctx, w, h);
      if (S.md === 'f27') { const I1 = S.p.P1 / 120, I2 = S.p.P2 / 120, I = I1 + I2, xs = [g.x0, g.x0 + 150, g.x1 - 10];
        Q59.panel(ctx, g.L + 24, 84, g.x1 - g.L + 10, 250, 'فكر: الشكل 27');
        Q59.path(ctx, [[xs[0], g.y0], [xs[2], g.y0]]); Q59.path(ctx, [[xs[0], g.y1], [xs[2], g.y1]]);
        Q59.cellS(ctx, [xs[0], g.y1], [xs[0], g.y0], '120 V', { side: 1, off: 30 });
        Q33.bulb(ctx, xs[1], (g.y0 + g.y1) / 2 + 24, I1 * 2, { s: .9 }); Q33.bulb(ctx, xs[2], (g.y0 + g.y1) / 2 + 24, I2 * 2, { s: .9 });
        [[xs[1], I1, 'cd', S.p.P1], [xs[2], I2, 'ef', S.p.P2]].forEach(([x, i, n, pw]) => { Q59.path(ctx, [[x, g.y0], [x, (g.y0 + g.y1) / 2 - 30]]); Q59.path(ctx, [[x, (g.y0 + g.y1) / 2 + 24], [x, g.y1]]); Q42.T(ctx, pw + ' W', x + 40, (g.y0 + g.y1) / 2, { s: 11, w: 900, c: '#a16207' }); Q42.T(ctx, n + ': ' + Q59.f(i, 2) + ' A', x - 46, g.y0 + 28, { s: 11, w: 900, c: '#fff', bg: '#dc2626' }); });
        Q42.T(ctx, 'ab: ' + Q59.f(I, 2) + ' A', xs[0] + 50, g.y0 - 14, { s: 11, w: 900, c: '#fff', bg: '#dc2626' });
        Q33.flow(ctx, [[xs[0], g.y1], [xs[0], g.y0], [xs[1], g.y0], [xs[1], g.y1]], S.fp * I1 * 2, 'c'); Q33.flow(ctx, [[xs[1], g.y0], [xs[2], g.y0], [xs[2], g.y1], [xs[1], g.y1]], S.fp * I2 * 2, 'c');
        const ord = [['ab', I], ['cd', I1], ['ef', I2]].sort((a, b) => b[1] - a[1]);
        Q59.panel(ctx, g.L + 24, 350, w - g.L - 60, 200, 'ترتيب التيارات من الأكبر');
        ord.forEach((o, k) => { const x = g.L + 90 + k * (w - g.L - 180) / 2; Q59.vbar(ctx, x - 25, 520, 50, 110, I, [[o[1], ['#dc2626', '#ea580c', '#f59e0b'][k], '']], o[0]); Q42.T(ctx, Q59.f(o[1], 2) + ' A', x, 396, { s: 12, w: 900, c: '#334155' }); });
        Q59.card(ctx, S, [{ t: 'I = P / V', mono: 1 }, { t: 'I(cd) = ' + S.p.P1 + ' / 120 = ' + Q59.f(I1, 3) + ' A', mono: 1 }, { t: 'I(ef) = ' + S.p.P2 + ' / 120 = ' + Q59.f(I2, 3) + ' A', mono: 1 }, { t: 'I(ab) = ' + Q59.f(I, 3) + ' A', mono: 1, c: '#b91c1c', w: 900 }, { t: 'الترتيب من الأكبر:', c: '#15803d', w: 900 }, { t: ord.map(o => o[0]).join(' > '), mono: 1, c: '#15803d', w: 900 }], { title: 'فكر ص 218' });
      } else {
        const xL = g.x0 + 20, xR = g.x1 - 20, yT = g.y0 + 10, yB = g.y1 - 20, mx = (xL + xR) / 2, my = (yT + yB) / 2;
        Q59.panel(ctx, g.L + 24, 84, g.x1 - g.L + 10, 250, 'الشكل 28: مثال 9');
        Q59.path(ctx, [[xL, my], [xL, yT], [xL + 20, yT]]); Q59.zig(ctx, [xL + 20, yT], [mx, yT], '30 Ω', { bl: 50, side: -1 }); Q59.zig(ctx, [mx, yT], [xR - 20, yT], '50 Ω', { bl: 50, side: -1 }); Q59.path(ctx, [[xR - 20, yT], [xR, yT], [xR, my]]);
        Q59.path(ctx, [[xL, my], [xL, yB], [xL + 20, yB]]); Q59.zig(ctx, [xL + 20, yB], [mx, yB], '20 Ω', { bl: 50, side: 1 }); Q59.zig(ctx, [mx, yB], [xR - 20, yB], '60 Ω', { bl: 50, side: 1 }); Q59.path(ctx, [[xR - 20, yB], [xR, yB], [xR, my]]);
        Q59.path(ctx, [[xL, my], [mx - 35, my]]); Q59.swS(ctx, [mx - 35, my], [mx + 35, my], S.p.swx, S.p.swx ? 'مغلق' : 'مفتوح'); Q59.path(ctx, [[mx + 35, my], [xR, my]]);
        Q59.node(ctx, xL, my, 'x', { dx: -14, dy: 0 }); Q59.node(ctx, xR, my, 'y', { dx: 14, dy: 0 });
        Q59.dmm(ctx, (g.L + w) / 2 - 20, 450, Q59.f(S.om, 1) + ' Ω', 'أوميتر بين x و y');
        if (S.ex) Q59.steps(ctx, S, Object.assign({}, EX, { k: S.k }));
        else Q59.card(ctx, S, [{ t: S.p.swx ? 'المفتاح مغلق' : 'المفتاح مفتوح', w: 900, c: S.p.swx ? '#15803d' : '#b91c1c' }, { t: S.p.swx ? 'Req = 0 Ω' : '(30 + 50) ∥ (20 + 60)', mono: 1 }, { t: S.p.swx ? 'دائرة قصر: التيار يمر في السلك فقط' : 'Req = 40 Ω', c: '#b45309', w: 900, mono: S.p.swx ? 0 : 1 }], { title: 'مثال 9' });
      }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); if (C.e) Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, S.md === 'f27' ? 'رتّب تيارات الفروع من الأكبر' : 'افتح المفتاح وأغلقه واقرأ الأوميتر', '#a16207');
    },
    chips(S, g) { return { m: Q59.chips(S, 'md', [['f27', 'فكر: الشكل 27'], ['ex9', 'مثال 9: الشكل 28']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.ex = 0; S2.k = 0; }, { bw: 200 }),
      e: S.md === 'ex9' ? Q59.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, EX.lines.length).concat(Q59.chips(S, 'sx', [['sw', S.p.swx ? 'افتح المفتاح' : 'أغلق المفتاح']], g.h - 84, '', S2 => setParam(S2, 'swx', !S2.p.swx), { bw: 160, x0: g.L + 340 })) : null }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), L = [];
      if (S.md === 'ex9') L.push({ id: 'swx', x: (g.x0 + g.x1) / 2, y: (g.y0 + g.y1) / 2 - 5, w: 80, h: 40, axis: 'none', tip: 'اضغط: افتح أو أغلق المفتاح', idle: 'اضغط ✋', click: S2 => setParam(S2, 'swx', !S2.p.swx) });
      else L.push({ id: 'lp', x: g.x0 + 150, y: (g.y0 + g.y1) / 2 - 8, r: 26, axis: 'y', keep: true, tip: 'اسحب: غيّر قدرة المصباح', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'P1', Math.round(clamp(60 - (d.y - (g.y0 + g.y1) / 2 + 8), 10, 100) / 5) * 5) });
      return L.concat(C.m, C.e || []); },
    readings(S) { return S.md === 'f27' ? [rd('I(ab)', Q59.f((S.p.P1 + S.p.P2) / 120, 3) + ' A'), rd('I(cd)', Q59.f(S.p.P1 / 120, 3) + ' A'), rd('I(ef)', Q59.f(S.p.P2 / 120, 3) + ' A')] : [rd('المفتاح', S.p.swx ? 'مغلق' : 'مفتوح'), rd('Req', (S.p.swx ? 0 : 40) + ' Ω')]; },
    explain(S) { return Q26.ex(S.md === 'f27' ? 'الفرع الرئيس ab يحمل أكبر تيار، ثم فرع المصباح 60 W ثم 30 W.' : 'المكافئة 40 Ω والمفتاح مفتوح، وتصبح صفراً عند غلقه.', S.md === 'f27' ? 'الجهد نفسه 120 V على المصباحين، فالتيار I = P / V يتناسب مع القدرة، ويجتمع التياران في الفرع الرئيس.' : 'السلك المغلق بين x و y مقاومته مهملة فيمر فيه التيار كله ولا يمر شيء في المقاومات.', 'دائرة القصر خطرة في المنازل لأنها تسحب تياراً كبيراً جداً، لذلك نستعمل المنصهرات والقواطع.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A13 — قاعدتا كيرشوف: العقدة والعروة ومشي الجهد ومثالا 10 و 11 (9-11، الأشكال 29–33، ص 219–223) =============== */
(() => {
  const EXS = { ex10: { title: 'مثال 10 ص 221', q: 'في الدائرة (الشكل 32) احسب التيار، مبتدئاً من A باتجاه دوران عقارب الساعة.', lines: ['هبوط الجهد = ارتفاع الجهد', 'I (12) + 6 + I (8) = 24', '20 I = 18', 'I = 0.9 A'] },
    ex11: { title: 'مثال 11 ص 222', q: 'R = 9 Ω و r1 = 1 Ω و r2 = 2 Ω و ε1 = 6 V و ε2 = 12 V. احسب التيار و Vab.', lines: ['ε2 أكبر فالتيار عكس عقارب الساعة', 'I R + I r2 + ε1 + I r1 = ε2', 'I = (12 − 6) / (9 + 2 + 1) = 0.5 A', 'Va + I r1 + ε1 = Vb', 'Vab = −ε1 − I r1 = −6.5 V', 'وبالطريقة نفسها:', 'Vbc = 11 V'] } };
  const D = { id: 'g11_i_kirch', page: 219, fig: 'الأشكال 29 إلى 33 + مثالا 10 و 11',
    desc: 'قاعدة كيرشوف الأولى (العقدة): مجموع التيارات الداخلة إلى نقطة تفرع يساوي مجموع التيارات الخارجة منها، وهي تعبير عن حفظ الشحنة، كما يتوزع الماء في أنبوب متفرع. القاعدة الثانية (العروة): المجموع الجبري لفروق الجهد حول أي مسار مغلق يساوي صفراً، أي هبوط الجهد = ارتفاع الجهد، وهي تعبير عن حفظ الطاقة. عبور مقاومة باتجاه التيار: −IR وعكسه: +IR ، وعبور بطارية من − إلى +: +ε ومن + إلى −: −ε.',
    tags: 'قواعد كيرشوف قاعدة العقدة حفظ الشحنة قاعدة العروة حفظ الطاقة فرق الجهد Vab=ε−Ir هبوط الجهد ارتفاع الجهد الشكل 29 الشكل 30 الشكل 31 مثال 10 0.9A مثال 11 0.5A −6.5V',
    tools: ['دائرة فيها بطاريات ومقاومات', 'فولطميتر رقمي بمجس متحرك', 'أنبوب ماء متفرع (للمقارنة)'],
    steps: ['في «العقدة» اسحب نقطة التفرع لتغيير توزيع التيار: I = I1 + I2 دائماً.', 'في «العروة: الشكل 30» شغّل المشي حول الدائرة: الجهد يهبط في المقاومات ويرتفع في البطارية ويعود إلى قيمته الأولى.', 'اسحب المؤشر على مخطط الجهد لتقف عند أي نقطة.', 'اختر مثال 10 أو 11 واضغط «الحل خطوة خطوة».'],
    concl: ['ΣI الداخلة = ΣI الخارجة (حفظ الشحنة).', 'ΣΔV = 0 حول أي عروة مغلقة (حفظ الطاقة).', 'Vab = ε − I r لبطارية يخرج التيار من قطبها الموجب.', 'مثال 10: I = 0.9 A. مثال 11: I = 0.5 A و Vab = −6.5 V و Vbc = 11 V.'],
    laws: ['g11_l9_kirch', 'g11_l9_closed'],
    controls: [R('e', 'القوة الدافعة ε', 1.5, 24, 12, .5, 'V'), R('r', 'المقاومة الداخلية r', 0, 5, 1, .1, 'Ω'), R('R', 'المقاومة الخارجية R', 1, 30, 5, .5, 'Ω'), R('I', 'التيار الداخل إلى العقدة', 1, 10, 6, .5, 'A')],
    setup(S) { S.md = 'node'; S.ws = 0; S.wsd = 0; S.run = 1; S.sp = .5; S.spd = .5; S.ex = 0; S.k = 0; S.fp = 0; },
    loop(S) { const md = S.md;
      if (md === 'ex10') { const I = .9; return { I, dir: 1, start: 'A', E: [{ s0: .06, s1: .2, t: 'R', dv: -12 * I, lab: '12 Ω' }, { s0: .23, s1: .29, t: 'E', dv: -6, lab: '6 V' }, { s0: .55, s1: .68, t: 'R', dv: -8 * I, lab: '8 Ω' }, { s0: .72, s1: .78, t: 'E', dv: 24, lab: '24 V' }], nodes: [[0, 'A']] }; }
      if (md === 'ex11') { const I = .5; return { I, dir: -1, start: 'a', E: [{ s0: .05, s1: .1, t: 'R', dv: I * 1, lab: 'r1' }, { s0: .12, s1: .16, t: 'E', dv: 6, lab: 'ε1' }, { s0: .2, s1: .24, t: 'E', dv: -12, lab: 'ε2' }, { s0: .25, s1: .3, t: 'R', dv: I * 2, lab: 'r2' }, { s0: .6, s1: .72, t: 'R', dv: I * 9, lab: 'R' }], nodes: [[.02, 'a'], [.18, 'b'], [.315, 'c']] }; }
      const I = S.p.e / (S.p.R + S.p.r); return { I, dir: 1, start: 'b', E: [{ s0: .36, s1: .46, t: 'R', dv: -I * S.p.R, lab: 'R' }, { s0: .84, s1: .89, t: 'R', dv: -I * S.p.r, lab: 'r' }, { s0: .92, s1: .97, t: 'E', dv: S.p.e, lab: 'ε' }], nodes: [[.825, 'b'], [.905, 'c'], [.985, 'a']], off: .825 }; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 80, y0: 140, x1: L + 390, y1: 300, gx: L + 70, gy: 370, gw: w - L - 130, gh: 170 }; },
    pt(g, s) { const W = g.x1 - g.x0, H = g.y1 - g.y0, P = 2 * (W + H); let d = ((s % 1) + 1) % 1 * P; if (d < W) return [g.x0 + d, g.y0]; d -= W; if (d < H) return [g.x1, g.y0 + d]; d -= H; if (d < W) return [g.x1 - d, g.y1]; d -= W; return [g.x0, g.y1 - d]; },
    V(Lp, s) { let v = 0; Lp.E.forEach(e => { if (s >= e.s1) v += e.dv; else if (s > e.s0) v += e.dv * (s - e.s0) / (e.s1 - e.s0); }); return v; },
    update(S, dt) { S.spd = Q59.ease(S.spd, S.sp, dt, 8); if (S.run && S.md !== 'node') { S.ws += dt * .08; if (S.ws > 1) S.ws = 0; } S.wsd = Math.abs(S.ws - S.wsd) > .5 ? S.ws : Q59.ease(S.wsd, S.ws, dt, 12); Q33.adv(S, dt, 1.5, 30); },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q59.bg(ctx, w, h);
      if (S.md === 'node') D.node(ctx, w, h, S, g); else D.loopV(ctx, w, h, S, g);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.c);
      Q42.banner(ctx, w, S.md === 'node' ? 'اسحب نقطة التفرع: التيار الداخل = مجموع الخارج' : 'امشِ حول العروة: مجموع تغيرات الجهد صفر', '#a16207');
    },
    node(ctx, w, h, S, g) {
      const I = S.p.I, I1 = I * S.spd, I2 = I - I1, cx = g.L + 200, cy = 210, ex = g.x1 + 20;
      Q59.panel(ctx, g.L + 24, 84, ex - g.L + 10, 250, 'الشكل 29 a: نقطة التفرع');
      const wd = i => 3 + i * 1.6;
      K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#d97706'; ctx.lineWidth = wd(I); ctx.beginPath(); ctx.moveTo(g.L + 50, cy); ctx.lineTo(cx, cy); ctx.stroke(); ctx.lineWidth = wd(I1); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + 60, cy - 70); ctx.lineTo(ex - 20, cy - 70); ctx.stroke(); ctx.lineWidth = wd(I2); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + 60, cy + 70); ctx.lineTo(ex - 20, cy + 70); ctx.stroke(); ctx.restore(); });
      Q33.flow(ctx, [[g.L + 50, cy], [cx, cy]], S.fp * I / 3, 'c'); Q33.flow(ctx, [[cx, cy], [cx + 60, cy - 70], [ex - 20, cy - 70]], S.fp * I1 / 3, 'c'); Q33.flow(ctx, [[cx, cy], [cx + 60, cy + 70], [ex - 20, cy + 70]], S.fp * I2 / 3, 'c');
      Q41.dot(ctx, cx, cy, '#0f172a', 8); Q42.T(ctx, 'I = ' + Q59.f(I, 1) + ' A', g.L + 110, cy - 22, { s: 12, w: 900, c: '#fff', bg: '#dc2626' }); Q42.T(ctx, 'I1 = ' + Q59.f(I1, 2) + ' A', ex - 80, cy - 94, { s: 12, w: 900, c: '#fff', bg: '#ea580c' }); Q42.T(ctx, 'I2 = ' + Q59.f(I2, 2) + ' A', ex - 80, cy + 94, { s: 12, w: 900, c: '#fff', bg: '#ea580c' });
      // knob for split
      const ky = cy - 70 + (1 - S.spd) * 140; Q41.dot(ctx, ex - 4, ky, '#2563eb', 9); Q41.line(ctx, [[ex - 4, cy - 70], [ex - 4, cy + 70]], 'rgba(37,99,235,.35)', 2, [4, 4]);
      // water analogy
      Q59.panel(ctx, g.L + 24, 350, w - g.L - 60, 220, 'الشكل 29 b: الماء في أنبوب متفرع');
      const wy = 460, wx = g.L + 80, sx = g.L + 300, eX = w - 80;
      K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; const pipe = (pts, ww) => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = ww + 8; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = ww; ctx.setLineDash([12, 10]); ctx.lineDashOffset = -S.fp; ctx.stroke(); ctx.setLineDash([]); };
        pipe([[wx, wy], [sx, wy]], 8 + I * 2.4); pipe([[sx, wy], [sx + 70, wy - 50], [eX, wy - 50]], 4 + I1 * 2.4); pipe([[sx, wy], [sx + 70, wy + 50], [eX, wy + 50]], 4 + I2 * 2.4); ctx.restore(); });
      Q42.T(ctx, 'جريان الماء الداخل = مجموع الخارج', (wx + eX) / 2, 395, { s: 11.5, w: 900, c: '#0369a1' });
      Q59.card(ctx, S, [{ t: 'ΣI(in) = ΣI(out)', mono: 1 }, { t: 'I = I1 + I2', mono: 1 }, { t: Q59.f(I, 2) + ' = ' + Q59.f(I1, 2) + ' + ' + Q59.f(I2, 2), mono: 1, c: '#b45309', w: 900 }, { t: 'الشحنة لا تفنى ولا تتراكم في العقدة', c: '#15803d', w: 800 }], { title: 'قاعدة العقدة' });
    },
    loopV(ctx, w, h, S, g) {
      const Lp = D.loop(S), off = Lp.off || 0, sh = s => (s - off + 1) % 1;
      Q59.panel(ctx, g.L + 24, 84, g.x1 - g.L + 40, 260, S.md === 'ex10' ? 'الشكل 32: مثال 10' : S.md === 'ex11' ? 'الشكل 33: مثال 11' : 'الشكل 30: حساب فرق الجهد');
      // wires between elements
      const cuts = [0, .25 * 0].concat([]); void cuts; const segs = []; let last = 0; Lp.E.slice().sort((a, b) => a.s0 - b.s0).forEach(e => { segs.push([last, e.s0]); last = e.s1; }); segs.push([last, 1]);
      segs.forEach(([a, b]) => { const pts = []; for (let s = a; s <= b + 1e-9; s += .005) pts.push(D.pt(g, s)); pts.push(D.pt(g, b)); Q59.path(ctx, pts); });
      Lp.E.forEach(e => { const a = D.pt(g, e.s0), b = D.pt(g, e.s1), inside = (D.pt(g, (e.s0 + e.s1) / 2)[1] === g.y0 || D.pt(g, (e.s0 + e.s1) / 2)[0] === g.x1) ? 1 : 1;
        if (e.t === 'R') Q59.zig(ctx, a, b, e.lab, { bl: Math.hypot(b[0] - a[0], b[1] - a[1]) - 8, side: -1 * inside, off: 22 }); else Q59.cellS(ctx, a, b, e.lab, { pos: e.dv > 0 ? 1 : -1, side: 1, off: 28 }); });
      if (S.md === 'ex11') { Q59.dbox(ctx, D.pt(g, .04)[0] - 4, g.y0 - 24, D.pt(g, .17)[0] - D.pt(g, .04)[0], 48, ''); Q59.dbox(ctx, D.pt(g, .19)[0], g.y0 - 24, D.pt(g, .305)[0] - D.pt(g, .19)[0], 48, ''); }
      Lp.nodes.forEach(([s, l]) => { const p = D.pt(g, s); Q59.node(ctx, p[0], p[1], l, { dx: p[0] === g.x0 ? -14 : 0, dy: p[1] === g.y1 ? 16 : -16 }); });
      [.13, .55, .82, .4].forEach(s => { const a = D.pt(g, s), b = D.pt(g, s + .004 * Lp.dir); Q59.carr(ctx, a[0], a[1], Math.atan2(b[1] - a[1], b[0] - a[0]), '#dc2626'); });
      const wp = D.pt(g, S.wsd + off); K.raw(ctx, () => { ctx.fillStyle = 'rgba(37,99,235,.25)'; ctx.beginPath(); ctx.arc(wp[0], wp[1], 14, 0, TAU); ctx.fill(); }); Q41.dot(ctx, wp[0], wp[1], '#2563eb', 7);
      // potential graph
      let vmin = 0, vmax = 0; for (let s = 0; s <= 1; s += .01) { const v = D.V(Lp, (s + off) % 1 + (s + off >= 1 ? 0 : 0)); void v; }
      const Vs = s => D.V(Lp, (s + off) % 1) - D.V(Lp, off % 1) + (s + off >= 1 && off ? D.V(Lp, 1) - 0 : 0);
      const pts = []; for (let s = 0; s <= 1.0001; s += .005) { const v = Vs(Math.min(s, .9999)); vmin = Math.min(vmin, v); vmax = Math.max(vmax, v); pts.push([s, v]); }
      const yl = Math.floor(vmin - 1), yh = Math.ceil(vmax + 1), stp = Math.max(1, Math.ceil((yh - yl) / 6));
      const A = Q59.ax(ctx, { x: g.gx, y: g.gy, w: g.gw, h: g.gh, x0: 0, x1: 1, y0: yl, y1: yh, xs: .1, ys: stp, lx: .25, ly: stp, xl: 'الموقع حول العروة', yl: 'V (V)' });
      Q41.line(ctx, pts.filter(q => q[0] <= S.wsd).map(q => [A.X(q[0]), A.Y(q[1])]), '#2563eb', 2.6); Q41.line(ctx, pts.map(q => [A.X(q[0]), A.Y(q[1])]), 'rgba(37,99,235,.15)', 1.5);
      Lp.E.forEach(e => { const m = sh((e.s0 + e.s1) / 2); Q42.T(ctx, e.lab, A.X(m), g.gy + 10, { s: 10, w: 900, c: e.t === 'E' ? '#15803d' : '#7c2d12' }); });
      const vw = Vs(Math.min(S.wsd, .9999)); Q41.dot(ctx, A.X(S.wsd), A.Y(vw), '#dc2626', 6);
      const st = EXS[S.md];
      if (S.ex && st) Q59.steps(ctx, S, Object.assign({}, st, { k: S.k }));
      else Q59.card(ctx, S, [{ t: 'قواعد الشكل 31:', c: '#334155', w: 800 }, { t: 'عبور مقاومة مع التيار ثم عكسه:', c: '#64748b' }, { t: '−I R     +I R', mono: 1 }, { t: 'عبور بطارية من السالب إلى الموجب ثم العكس:', c: '#64748b' }, { t: '+ε     −ε', mono: 1 }, { t: 'I = ' + Q59.f(Lp.I, 3) + ' A', mono: 1, c: '#1d4ed8', w: 900 }, { t: 'V − V(' + Lp.start + ') = ' + Q59.f(vw, 2) + ' V', mono: 1, c: '#b91c1c', w: 900 }, { t: S.wsd > .98 ? 'عدنا إلى البداية: المجموع صفر' : 'تابع المشي حول العروة', c: '#15803d' }], { title: 'قاعدة العروة' });
    },
    chips(S, g) { return { m: Q59.chips(S, 'md', [['node', 'العقدة'], ['loop', 'العروة: الشكل 30'], ['ex10', 'مثال 10'], ['ex11', 'مثال 11']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.ws = 0; S2.wsd = 0; S2.ex = 0; S2.k = 0; }, { bw: 150 }),
      c: EXS[S.md] ? Q59.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, EXS[S.md].lines.length).concat(Q59.chips(S, 'w', [['go', S.run ? '⏸ أوقف المشي' : '▶ امشِ']], g.h - 84, '', S2 => { S2.run = S2.run ? 0 : 1; }, { bw: 150, x0: g.L + 340 }))
        : S.md === 'loop' ? Q59.chips(S, 'w', [['go', S.run ? '⏸ أوقف المشي' : '▶ امشِ'], ['re', '↺ من البداية']], g.h - 84, '', (S2, k) => { if (k === 'go') S2.run = S2.run ? 0 : 1; else { S2.ws = 0; S2.wsd = 0; } }, { bw: 160 })
        : Q59.chips(S, 'sp', [['.5', 'تفرع متساوٍ'], ['.8', 'معظمه إلى الأعلى'], ['.2', 'معظمه إلى الأسفل']], g.h - 84, '', (S2, k) => { S2.sp = +k; }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      const it = S.md === 'node' ? { id: 'sp', x: g.x1 + 16, y: 140 + (1 - S.sp) * 140, r: 22, axis: 'y', keep: true, tip: 'اسحب: غيّر توزيع التيار', idle: 'اسحب ✋', drag: (S2, d) => { S2.sp = clamp(1 - (d.y - 140) / 140, 0, 1); } }
        : { id: 'wk', x: g.gx + S.ws * g.gw, y: g.gy + g.gh / 2, r: 22, axis: 'x', keep: true, tip: 'اسحب: حرّك نقطة القياس حول العروة', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.ws = clamp((d.x - g.gx) / g.gw, 0, 1); } };
      return [it].concat(C.m, C.c); },
    readings(S) { if (S.md === 'node') return [rd('I الداخل', Q59.f(S.p.I, 2) + ' A'), rd('I1', Q59.f(S.p.I * S.sp, 2) + ' A'), rd('I2', Q59.f(S.p.I * (1 - S.sp), 2) + ' A')]; const Lp = D.loop(S); return [rd('تيار العروة', Q59.f(Lp.I, 3) + ' A'), rd('مجموع تغيرات الجهد', Q59.f(Lp.E.reduce((a, e) => a + e.dv, 0), 3) + ' V')]; },
    explain(S) { return Q26.ex(S.md === 'node' ? 'مهما غيّرت التوزيع يبقى مجموع التيارين الخارجين مساوياً للتيار الداخل.' : 'الجهد يهبط في المقاومات باتجاه التيار ويرتفع في البطارية من − إلى + ، ويعود إلى قيمته الأولى بعد دورة كاملة.', S.md === 'node' ? 'الشحنة محفوظة: ما يدخل العقدة في كل ثانية يخرج منها.' : 'الطاقة محفوظة: الطاقة التي تكسبها الشحنة في البطاريات تساوي ما تفقده في المقاومات خلال دورة كاملة، لذلك ΣΔV = 0.', 'كما يعود متسلق الجبل إلى الارتفاع نفسه عند رجوعه إلى نقطة البداية مهما صعد ونزل.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A14 — مثال 12: دائرة بعروتين وقاعدتا كيرشوف (الشكل 34، ص 223–224) =============== */
(() => {
  const EX = { title: 'مثال 12 ص 223', q: 'في الشكل 34 احسب التيارات I1 و I2 و I3 مستعملاً قاعدتي كيرشوف.', lines: ['العقدة C: I1 + I2 = I3', 'العروة ABCDEA: 6 I2 = 3 I1', 'I2 = ½ I1', 'العروة ABCFGHA: 6 I2 + 4 I3 = 6', '½ I1 × 6 + 1.5 I1 × 4 = 6', '9 I1 = 6', 'I1 = 2/3 A', 'I2 = 1/3 A', 'I3 = 1 A'] };
  const D = { id: 'g11_i_kex', page: 223, fig: 'الشكل 34 + مثال 12',
    desc: 'نطبق قاعدة العقدة عند C: I1 + I2 = I3 ، وقاعدة العروة على العروة ABCDEA فنجد I2 = ½ I1 ، وعلى العروة ABCFGHA فنجد 6 I2 + 4 I3 = 6. بحل المعادلات: I1 = 2/3 A و I2 = 1/3 A و I3 = 1 A.',
    tags: 'مثال 12 الشكل 34 قاعدتا كيرشوف عروتان عقدة C I1=2/3A I2=1/3A I3=1A معادلات آنية',
    tools: ['بطارية 6 V', 'مقاومات 3 Ω و 6 Ω و 4 Ω', 'ثلاثة أميترات'],
    steps: ['راقب حركة الشحنات في الفروع الثلاثة: تجتمع في C.', 'اضغط على العروة الأولى أو الثانية لتظليلها وقراءة معادلتها.', 'غيّر المقاومات وقوة البطارية من اللوحة وراقب الأميترات.', 'اضغط «الحل خطوة خطوة».'],
    concl: ['عند C: I1 + I2 = I3.', 'الفرعان 3 Ω و 6 Ω على التوازي فيقسم التيار بعكس نسبة المقاومتين.', 'I1 = 2/3 A و I2 = 1/3 A و I3 = 1 A.'],
    laws: ['g11_l9_kirch'],
    controls: [R('V', 'قوة البطارية', 1, 24, 6, .5, 'V'), R('R1', 'المقاومة DC', 1, 20, 3, .5, 'Ω'), R('R2', 'المقاومة BC', 1, 20, 6, .5, 'Ω'), R('R3', 'المقاومة FG', 1, 20, 4, .5, 'Ω')],
    setup(S) { S.lp = 0; S.ex = 0; S.k = 0; S.fp = 0; },
    cur(S) { const { V, R1, R2, R3 } = S.p, Rp = R1 * R2 / (R1 + R2), I3 = V / (Rp + R3); return { I3, I1: I3 * R2 / (R1 + R2), I2: I3 * R1 / (R1 + R2) }; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, xD: L + 60, xC: L + 190, xB: L + 285, xG: L + 385, yT: 126, yM: 204, yB: 310 }; },
    update(S, dt) { Q33.adv(S, dt, 1, 40); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = D.cur(S); Q59.bg(ctx, w, h); Q59.panel(ctx, g.L + 24, 84, g.xG - g.L + 20, 270, 'الشكل 34');
      const P = { D: [g.xD, g.yM], C: [g.xC, g.yM], B: [g.xB, g.yM], F: [g.xC, g.yT], G: [g.xG, g.yT], H: [g.xG, g.yB], A: [g.xB, g.yB], E: [g.xD, g.yB] };
      if (S.lp) K.raw(ctx, () => { ctx.fillStyle = S.lp === 1 ? 'rgba(37,99,235,.12)' : 'rgba(234,88,12,.12)'; if (S.lp === 1) ctx.fillRect(g.xD, g.yM, g.xB - g.xD, g.yB - g.yM); else { ctx.beginPath(); ctx.moveTo(g.xC, g.yT); ctx.lineTo(g.xG, g.yT); ctx.lineTo(g.xG, g.yB); ctx.lineTo(g.xB, g.yB); ctx.lineTo(g.xB, g.yM); ctx.lineTo(g.xC, g.yM); ctx.closePath(); ctx.fill(); } });
      Q59.zig(ctx, P.D, P.C, S.p.R1 + ' Ω', { bl: 50, side: -1 }); Q59.zig(ctx, P.B, P.C, S.p.R2 + ' Ω', { bl: 50, side: 1 }); Q59.path(ctx, [P.C, P.F]); Q59.zig(ctx, P.F, P.G, S.p.R3 + ' Ω', { bl: 60, side: -1 }); Q59.path(ctx, [P.G, P.H]);
      Q59.cellS(ctx, P.H, P.A, S.p.V + ' V', { pos: 1, side: 1, off: 26 }); Q59.path(ctx, [P.A, P.B]); Q59.path(ctx, [P.A, P.E, P.D]);
      Object.keys(P).forEach(k => { const p = P[k]; Q59.node(ctx, p[0], p[1], k, { dx: p[0] === g.xD ? -14 : 12, dy: p[1] === g.yB ? 14 : -14 }); });
      Q59.dots(ctx, [P.E, P.D, P.C], S.fp * c.I1, true); Q59.dots(ctx, [P.A, P.B, P.C], S.fp * c.I2, true); Q59.dots(ctx, [P.C, P.F, P.G, P.H, P.A], S.fp * c.I3, true);
      Q42.T(ctx, 'I1 = ' + Q59.f(c.I1, 3) + ' A', (g.xD + g.xC) / 2, g.yM + 40, { s: 11, w: 900, c: '#fff', bg: '#2563eb' }); Q42.T(ctx, 'I2 = ' + Q59.f(c.I2, 3) + ' A', (g.xB + g.xC) / 2 + 6, g.yM + 40, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' }); Q42.T(ctx, 'I3 = ' + Q59.f(c.I3, 3) + ' A', g.xC + 48, (g.yT + g.yM) / 2, { s: 11, w: 900, c: '#fff', bg: '#ea580c' });
      Q59.panel(ctx, g.L + 24, 370, w - g.L - 60, 190, 'المعادلات');
      const cx = g.L + 24 + (w - g.L - 60) / 2; const eq = [['العقدة C:', 'I1 + I2 = I3', '#334155'], ['العروة الأولى ABCDEA:', S.p.R2 + ' I2 = ' + S.p.R1 + ' I1', '#2563eb'], ['العروة الثانية ABCFGHA:', S.p.R2 + ' I2 + ' + S.p.R3 + ' I3 = ' + S.p.V, '#ea580c']];
      eq.forEach((e, k) => { Q42.T(ctx, e[0], cx + 120, 410 + k * 46, { s: 12, w: 900, c: e[2] }); Q42.T(ctx, e[1], cx - 110, 410 + k * 46, { s: 13, w: 900, c: e[2] }); });
      if (S.ex) Q59.steps(ctx, S, Object.assign({}, EX, { k: S.k }));
      else Q59.card(ctx, S, [{ t: 'I1 = ' + Q59.f(c.I1, 3) + ' A', mono: 1, c: '#2563eb', w: 900 }, { t: 'I2 = ' + Q59.f(c.I2, 3) + ' A', mono: 1, c: '#7c3aed', w: 900 }, { t: 'I3 = ' + Q59.f(c.I3, 3) + ' A', mono: 1, c: '#ea580c', w: 900 }, { t: 'تحقق العقدة:', c: '#64748b' }, { t: Q59.f(c.I1, 3) + ' + ' + Q59.f(c.I2, 3) + ' = ' + Q59.f(c.I3, 3), mono: 1, c: '#15803d' }], { title: 'مثال 12' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.l); Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'اختر عروة واقرأ معادلتها', '#a16207');
    },
    chips(S, g) { return { l: Q59.chips(S, 'lp', [['0', 'الدائرة كاملة'], ['1', 'العروة ABCDEA'], ['2', 'العروة ABCFGHA'], ['bk', 'قيم الكتاب']], g.h - 128, String(S.lp), (S2, k) => { if (k === 'bk') { setParam(S2, 'V', 6); setParam(S2, 'R1', 3); setParam(S2, 'R2', 6); setParam(S2, 'R3', 4); } else S2.lp = +k; }, { bw: 160 }), e: Q59.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { setParam(S2, 'V', 6); setParam(S2, 'R1', 3); setParam(S2, 'R2', 6); setParam(S2, 'R3', 4); }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'l1', x: (g.xD + g.xB) / 2, y: (g.yM + g.yB) / 2 + 10, w: 120, h: 50, axis: 'none', tip: 'اضغط: العروة الأولى', idle: 'اضغط ✋', click: S2 => { S2.lp = S2.lp === 1 ? 0 : 1; } }, { id: 'l2', x: (g.xC + g.xG) / 2 + 30, y: (g.yT + g.yM) / 2 + 10, w: 80, h: 40, axis: 'none', hint: false, tip: 'اضغط: العروة الثانية', click: S2 => { S2.lp = S2.lp === 2 ? 0 : 2; } }].concat(C.l, C.e); },
    readings(S) { const c = D.cur(S); return [rd('I1', Q59.f(c.I1, 3) + ' A'), rd('I2', Q59.f(c.I2, 3) + ' A'), rd('I3', Q59.f(c.I3, 3) + ' A')]; },
    explain(S) { return Q26.ex('التياران I1 و I2 يجتمعان عند C ليكوّنا I3 الذي يمر في المقاومة 4 Ω والبطارية.', 'لكل عروة معادلة من قاعدة الجهد، وللعقدة معادلة من قاعدة التيار، فنحصل على ثلاث معادلات لثلاثة مجاهيل.', 'تحلل شبكات الكهرباء الكبيرة وأجهزة الإلكترونيات بهذه الطريقة نفسها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A15 — مسائل الفصل التاسع (ص 227–228) =============== */
(() => {
  const PB = [
    { title: 'المسألة 1', q: 'ملف نحاس مقاومته 50 Ω في 20°C أصبحت 60 Ω عند تسخينه. جد درجة حرارته علماً أن α = 39.3×10⁻⁴ °C⁻¹.', lines: ['R = R0 [1 + α (T − T0)]', '60 = 50 [1 + 39.3×10⁻⁴ (T − 20)]', 'T − 20 = 0.2 / 39.3×10⁻⁴ = 50.9', 'T = 70.9 °C'] },
    { title: 'المسألة 2', q: 'بطارية قوتها الدافعة 13 V وفولطية أقطابها 12 V وقدرة الحمل 24 W. جد مقاومة الحمل والتيار والمقاومة الداخلية.', lines: ['R = ΔV² / P = 144 / 24 = 6 Ω', 'I = ΔV / R = 12 / 6 = 2 A', 'ε = ΔV + I r', '13 = 12 + 2 r', 'r = 0.5 Ω'] },
    { title: 'المسألة 3', q: 'بطارية 24 V مقاومتها الداخلية 0.75 Ω تغذي فرعين متوازيين: 5 Ω مع (3 Ω ∥ 6 Ω) ، و 8 Ω مع 13 Ω.', lines: ['3 ∥ 6 = 2 Ω', '5 + 2 = 7 Ω     8 + 13 = 21 Ω', 'Req = 7 × 21 / 28 = 5.25 Ω', 'I = 24 / (5.25 + 0.75) = 4 A', 'I r = 0.75 × 4 = 3 V', 'ΔV = 24 − 3 = 21 V', 'I(5 Ω) = 21 / 7 = 3 A', 'I(3 Ω) = 2 A     I(6 Ω) = 1 A', 'I(8 Ω) = I(13 Ω) = 1 A'] },
    { title: 'المسألة 4', q: 'مصباح يدوي يسحب تياراً 0.4 A عند فرق جهد 3.0 V. جد مقاومته وقدرته والطاقة المستهلكة في 5.5 min.', lines: ['R = V / I = 3 / 0.4 = 7.5 Ω', 'P = I V = 0.4 × 3 = 1.2 W', 't = 5.5 × 60 = 330 s', 'E = P t = 1.2 × 330 = 396 J'] },
    { title: 'المسألة 5', q: 'مقاومة 4 Ω ربطت مع بطاريتين 8 V و 4 V متساندتين، المقاومة الداخلية لكل منهما 1 Ω. جد التيار و Vab والدائرة مغلقة ثم مفتوحة.', lines: ['I = (8 + 4) / (4 + 1 + 1) = 2 A', 'الدائرة مغلقة:', 'Vab = I R = 2 × 4 = 8 V', 'الدائرة مفتوحة:', 'Vab = 8 + 4 = 12 V'] },
    { title: 'المسألة 6', q: 'R1 = 5 Ω و R2 = 2 Ω و R3 = 4 Ω و ε1 = 3 V و ε2 = 1 V في ثلاثة فروع بين a و b. جد التيارات و Vab.', lines: ['قاعدة العقدة ثم قاعدة العروة لعروتين:', 'I(ε1 , R2) = 16/19 = 0.842 A', 'I(ε2 , R3) = 11/19 = 0.579 A', 'I(R1) = 5/19 = 0.263 A', '0.842 = 0.579 + 0.263', 'Vab = −25/19 = −1.32 V'] }];
  const D = { id: 'g11_i_review', page: 227, fig: 'مسائل الفصل التاسع',
    desc: 'حل مسائل الفصل التاسع خطوة خطوة مع رسم كل دائرة: المقاومة ودرجة الحرارة، فولطية الأقطاب والقدرة، شبكة مقاومات مع مقاومة داخلية، المصباح اليدوي، بطاريتان متساندتان، ودائرة بثلاثة فروع بقاعدتي كيرشوف.',
    tags: 'مسائل الفصل التاسع 70.9°C 0.5Ω 5.25Ω 4A 7.5Ω 1.2W 396J 2A 12V كيرشوف ثلاثة فروع',
    tools: ['ورقة وقلم', 'حاسبة'],
    steps: ['اختر رقم المسألة من الأزرار أو من اللوحة.', 'اضغط «الحل خطوة خطوة» ثم «الخطوة التالية» لكل خطوة.', 'قارن جوابك بالسطر الأخير الملون.'],
    concl: ['م1: 70.9 °C. م2: 6 Ω و 2 A و 0.5 Ω.', 'م3: 5.25 Ω و 4 A و 3 V و 21 V.', 'م4: 7.5 Ω و 1.2 W و 396 J. م5: 2 A و 8 V و 12 V.', 'م6: 0.842 A و 0.579 A و 0.263 A و Vab = −1.32 V.'],
    laws: ['g11_l9_temp', 'g11_l9_closed', 'g11_l9_power', 'g11_l9_kirch'],
    controls: [R('pr', 'رقم المسألة', 1, 6, 1, 1, ''), TG('fl', 'حركة الشحنات', true, null, 'flow')],
    setup(S) { S.ex = 0; S.k = 0; S.fp = 0; S.lit = 0; S.pv = 1; },
    update(S, dt) { if (S.pv !== S.p.pr) { S.pv = S.p.pr; S.ex = 0; S.k = 0; } Q33.adv(S, dt, S.p.fl ? 1 : 0, 40); S.lit = Q59.ease(S.lit, 1, dt, 3); },
    draw(ctx, w, h, S) {
      const L = Q42.L(S), n = S.p.pr, P = PB[n - 1], x0 = L + 70, x1 = L + 380, y0 = 140, y1 = 300, mx = (x0 + x1) / 2, my = (y0 + y1) / 2; Q59.bg(ctx, w, h);
      Q59.panel(ctx, L + 24, 84, x1 - L + 40, 260, P.title);
      const loop = pts => Q59.dots(ctx, pts, S.fp, S.p.fl);
      if (n === 1) { const A = Q59.ax(ctx, { x: x0, y: y0 - 20, w: x1 - x0, h: 170, x0: 0, x1: 100, y0: 40, y1: 65, xs: 10, ys: 5, lx: 20, ly: 5, xl: 'T (°C)', yl: 'R (Ω)' }); Q41.line(ctx, [[A.X(0), A.Y(50 * (1 - 39.3e-4 * 20))], [A.X(100), A.Y(50 * (1 + 39.3e-4 * 80))]], '#ea580c', 2.6); Q41.dot(ctx, A.X(20), A.Y(50), '#2563eb', 6); Q41.dot(ctx, A.X(70.9), A.Y(60), '#dc2626', 7); Q42.T(ctx, '70.9 °C', A.X(70.9), A.Y(60) - 16, { s: 11, w: 900, c: '#dc2626' }); }
      else if (n === 2 || n === 5) { Q59.dbox(ctx, x0 - 26, y0 + 10, 52, y1 - y0 - 20, ''); Q59.path(ctx, [[x0, y0 + 10], [x0, y0], [x1, y0], [x1, y0 + 40]]); Q59.zig(ctx, [x1, y0 + 40], [x1, y1 - 40], n === 2 ? 'R = 6 Ω' : '4 Ω', { bl: 60, side: -1 }); Q59.path(ctx, [[x1, y1 - 40], [x1, y1], [x0, y1], [x0, y1 - 10]]);
        if (n === 2) { Q59.cellS(ctx, [x0, my + 50], [x0, my], '13 V', { side: 1 }); Q59.zig(ctx, [x0, my], [x0, y0 + 10], 'r', { bl: 30, side: -1 }); Q59.path(ctx, [[x0, my + 50], [x0, y1 - 10]]); Q42.T(ctx, 'P = 24 W', x1 - 80, my, { s: 12, w: 900, c: '#fff', bg: '#ea580c' }); }
        else { Q59.cellS(ctx, [x0, y1 - 10], [x0, y1 - 40], '8 V', { side: 1 }); Q59.zig(ctx, [x0, y1 - 40], [x0, my + 10], '1 Ω', { bl: 22, side: -1 }); Q59.cellS(ctx, [x0, my + 10], [x0, my - 30], '4 V', { side: 1 }); Q59.zig(ctx, [x0, my - 30], [x0, y0 + 10], '1 Ω', { bl: 22, side: -1 }); Q59.node(ctx, x1, y0 + 40, 'a', { dx: 14, dy: 0 }); Q59.node(ctx, x1, y1 - 40, 'b', { dx: 14, dy: 0 }); }
        loop([[x0, y1], [x0, y0], [x1, y0], [x1, y1], [x0, y1]]); }
      else if (n === 3) { const yA = y0 + 14, yB2 = y0 + 96; Q59.path(ctx, [[x0, y1], [x0, yA], [x0 + 20, yA]]); Q59.zig(ctx, [x0 + 20, yA], [x0 + 130, yA], '5 Ω', { bl: 50, side: -1 }); Q59.path(ctx, [[x0 + 130, yA], [x0 + 150, yA], [x0 + 150, yA - 20], [x0 + 170, yA - 20]]); Q59.path(ctx, [[x0 + 150, yA], [x0 + 150, yA + 20], [x0 + 170, yA + 20]]); Q59.zig(ctx, [x0 + 170, yA - 20], [x0 + 260, yA - 20], '3 Ω', { bl: 40, side: -1 }); Q59.zig(ctx, [x0 + 170, yA + 20], [x0 + 260, yA + 20], '6 Ω', { bl: 40, side: 1 }); Q59.path(ctx, [[x0 + 260, yA - 20], [x0 + 280, yA - 20], [x0 + 280, yA + 20], [x0 + 260, yA + 20]]); Q59.path(ctx, [[x0 + 280, yA], [x1, yA], [x1, y1]]); Q59.path(ctx, [[x1, yB2], [x1 - 1, yB2]]);
        Q59.path(ctx, [[x0, yB2], [x0 + 40, yB2]]); Q59.zig(ctx, [x0 + 40, yB2], [x0 + 150, yB2], '8 Ω', { bl: 50, side: 1 }); Q59.zig(ctx, [x0 + 150, yB2], [x0 + 260, yB2], '13 Ω', { bl: 50, side: 1 }); Q59.path(ctx, [[x0 + 260, yB2], [x1, yB2]]);
        Q59.path(ctx, [[x0, y1], [mx - 40, y1]]); Q59.cellS(ctx, [mx - 40, y1], [mx + 40, y1], '24 V     r = 0.75 Ω', { side: -1, off: 22 }); Q59.path(ctx, [[mx + 40, y1], [x1, y1]]); loop([[x1, y1], [x0, y1], [x0, yA], [x1, yA], [x1, y1]]); }
      else if (n === 4) { const c = Q33.cell(ctx, mx - 60, y1 - 20, { V: 3, w: 110, h: 34, label: '3.0 V' }), b = Q33.bulb(ctx, x1 - 40, my, S.lit, { s: 1.2 }); Q33.wire(ctx, [c.p, [x1, y1 - 20], [x1, my], b.b], { col: '#dc2626' }); Q33.wire(ctx, [c.n, [x0, y1 - 20], [x0, y0 + 10], [x1 - 100, y0 + 10], [x1 - 100, my], b.a], { col: '#111827' }); Q42.T(ctx, 'I = 0.4 A', mx - 40, y0 + 50, { s: 12, w: 900, c: '#fff', bg: '#a16207' }); Q42.T(ctx, 't = 5.5 min', mx - 40, y0 + 80, { s: 12, w: 900, c: '#334155' }); }
      else { const xs = [x0 + 30, mx, x1 - 30]; Q59.path(ctx, [[xs[0], y0], [xs[2], y0]]); Q59.path(ctx, [[xs[0], y1], [xs[2], y1]]); Q59.node(ctx, mx, y0, 'a'); Q59.node(ctx, mx, y1, 'b', { dy: 16 });
        Q59.cellS(ctx, [xs[0], y0], [xs[0], my - 10], 'ε1 = 3 V', { side: 1, pos: -1 }); Q59.zig(ctx, [xs[0], my - 10], [xs[0], y1], 'R2 = 2 Ω', { bl: 44, side: 1 }); Q59.zig(ctx, [mx, y0], [mx, y1], 'R1 = 5 Ω', { bl: 60, side: 1 }); Q59.cellS(ctx, [xs[2], y0], [xs[2], my - 10], 'ε2 = 1 V', { side: -1, pos: -1 }); Q59.zig(ctx, [xs[2], my - 10], [xs[2], y1], 'R3 = 4 Ω', { bl: 44, side: -1 }); loop([[xs[0], y1], [xs[0], y0], [mx, y0], [mx, y1]]); }
      Q59.steps(ctx, S, Object.assign({}, P, { k: S.ex ? S.k : 0 }), { wd: 330 });
      Q59.panel(ctx, L + 24, 360, w - L - 60, 170, 'الجواب النهائي');
      const last = P.lines.filter(t => /=/.test(t)).slice(-2); last.forEach((t, k) => Q42.T(ctx, S.ex && S.k >= P.lines.length ? t : '؟', (L + w) / 2 - 20, 410 + k * 40, { s: 14, w: 900, c: S.ex && S.k >= P.lines.length ? '#b91c1c' : '#94a3b8' }));
      const C = D.chips(S); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'اختر مسألة واضغط الحل خطوة خطوة', '#a16207');
    },
    chips(S) { return { p: Q59.chips(S, 'pr', PB.map((q, i) => [String(i + 1), 'م' + (i + 1)]), S.H - 128, String(S.p.pr), (S2, k) => { setParam(S2, 'pr', +k); S2.pv = +k; S2.ex = 0; S2.k = 0; }, { bw: 90 }), e: Q59.stepChips(S, 'ex', S.H - 84, Q42.L(S), 'الحل خطوة خطوة', null, PB[S.p.pr - 1].lines.length) }; },
    drags(S) { if (!S.W) return []; const C = D.chips(S), L = Q42.L(S); return [{ id: 'fig', x: (L + 24 + L + 440) / 2, y: 214, w: 380, h: 220, axis: 'none', tip: 'اضغط: الخطوة التالية', idle: 'اضغط ✋', click: S2 => { if (!S2.ex) { S2.ex = 1; S2.k = 0; } else S2.k = Math.min(S2.k + 1, PB[S2.p.pr - 1].lines.length); } }].concat(C.p, C.e); },
    readings(S) { const P = PB[S.p.pr - 1]; return [rd('المسألة', String(S.p.pr)), rd('الخطوة', (S.ex ? S.k : 0) + ' / ' + P.lines.length)]; },
    explain(S) { return Q26.ex('كل مسألة تُحل بقانون واحد أو أكثر من قوانين الفصل.', 'نبدأ بالمقاومة المكافئة أو بقاعدتي كيرشوف ثم نحسب التيار، وبعده فروق الجهد والقدرة.', 'هذه الحسابات يستعملها الكهربائي لاختيار الأسلاك والمنصهرات المناسبة.'); }
  };
  M8.P[D.id] = D;
})();

/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g11_i_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f && !D._tap) { D._tap = 1; D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); } });
Object.keys(M8.P).filter(id => /^g11_i_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g11_c9_current', ch: 59, reg: X11, sec: '9-1 التيار الكهربائي', page: 195, kind: 'نشاط',
  title: 'التيار الكهربائي: الشحنات العابرة وسرعة الانجراف',
  desc: 'نعدّ الشحنات العابرة لمقطع موصل لنجد I = Δq / Δt واتجاه التيار الاصطلاحي (الأشكال 1–3 وفكر)، ثم نرى انجراف الإلكترونات البطيء vD = I / (A N e) ونحل المثالين 1 و 2.',
  tags: 'التيار الكهربائي الأمبير اتجاه التيار سرعة الانجراف مثال 1 مثال 2',
  fact: ['ينتقل أثر المجال الكهربائي في السلك بسرعة قريبة من سرعة الضوء 3×10⁸ m/s ، أما سرعة انجراف الإلكترونات فصغيرة جداً: 9.4×10⁻⁵ m/s لسلك نحاس قطره 1 mm يحمل 1 A (ص 196).', 'التيار في المحاليل الإلكتروليتية ينتج من حركة الأيونات الموجبة والسالبة معاً (ص 195).'],
  quiz: [
    { q: 'الأمبير الواحد يساوي:', o: ['1 C / 1 s', '1 J / 1 C', '1 V / 1 Ω · s', '1 C · 1 s'], a: 0, why: 'ص 195: I = Δq / Δt.' },
    { q: 'اتجاه التيار الاصطلاحي هو اتجاه حركة:', o: ['الشحنات الموجبة', 'الإلكترونات', 'النيوترونات', 'الذرات'], a: 0, why: 'ص 196.' },
    { q: 'في الشكل 3 الترتيب من الأصغر تياراً إلى الأكبر:', o: ['d ثم b ثم c ثم a', 'a ثم b ثم c ثم d', 'b ثم d ثم a ثم c'], a: 0, why: 'فكر ص 196: d = 2 و b = 3 و c = 4 و a = 5 وحدات.' },
    { q: 'مثال 2: سرعة الانجراف في سلك نحاس مقطعه 2 mm² يحمل 10 A تقريباً:', o: ['0.37 mm/s', '3×10⁸ m/s', '37 m/s', '0.37 m/s'], a: 0, why: 'vD = I / (A N e) ص 198.' }],
  parts: [{ id: 'g11_i_flow', n: 'الشحنات العابرة للمقطع: الأشكال 1 و 2 و 3' }, { id: 'g11_i_drift', n: 'سرعة الانجراف: مثالا 1 و 2' }] });
M8.merge({ id: 'g11_c9_ohm', ch: 59, reg: X11, sec: '9-2 المقاومة الكهربائية وقانون أوم', page: 198, kind: 'نشاط',
  title: 'قانون أوم والمقاومية',
  desc: 'نرسم مخطط I − ΔV لمقاوم أومي ولمصباح غير أومي ونقارن بجريان الماء (الشكلان 4 و 5)، ثم نغيّر طول السلك ومساحة مقطعه ومادته لنتحقق من R = ρ L / A ونحل المثال 3.',
  tags: 'قانون أوم الأوم المقاومية الموصلية الجدول 1 مثال 3',
  fact: ['المقاومية صفة للمادة والمقاومة صفة للجسم، كما الكثافة صفة للمادة والكتلة صفة للجسم (ص 201).', 'الموصلية σ مقلوب المقاومية ρ (ص 201).', 'تستعمل المقاومات الحرارية في دوائر إنذار الحريق، والمحرار المقاومي يصنع من البلاتين (ص 201).'],
  quiz: [
    { q: 'سلك مقاومته 1 Ω ، سلك من المادة نفسها طوله ضعف الأول ومساحة مقطعه نصفه مقاومته:', o: ['4 Ω', '1 Ω', '2 Ω', '½ Ω'], a: 0, why: 'س1 فقرة 1: R = ρ L / A.' },
    { q: 'سلك نحاس مقاومته 10 Ω قطع نصفين متساويين، مقاومة كل نصف:', o: ['5 Ω', '10 Ω', '20 Ω', '2.5 Ω'], a: 0, why: 'س1 فقرة 2.' },
    { q: 'سلك مقاومته 0.1 Ω ، سلك آخر من المادة نفسها طوله ضعفه وقطره نصفه مقاومته:', o: ['0.8 Ω', '0.4 Ω', '0.2 Ω', '0.1 Ω'], a: 0, why: 'س1 فقرة 8: الطول ×2 والمساحة ÷4.' },
    { q: 'الدائرة A: 2 V و 1 A ، الدائرة B: 1 V و 2 A. مقاومة A تساوي من مقاومة B:', o: ['أربعة أضعاف', 'ضعفين', 'النصف', 'الربع'], a: 0, why: 'س1 فقرة 7: 2 Ω مقابل 0.5 Ω.' }],
  parts: [{ id: 'g11_i_ohm', n: 'قانون أوم: الموصل الأومي وغير الأومي' }, { id: 'g11_i_rho', n: 'المقاومية R = ρL/A: الجدول 1 ومثال 3' }] });
M8.merge({ id: 'g11_c9_temp', ch: 59, reg: X11, sec: '9-3 المقاومية ودرجة الحرارة + 9-4 فرط التوصيل', page: 202, kind: 'نشاط',
  title: 'المقاومية ودرجة الحرارة وفرط التوصيل',
  desc: 'نسخن ملفات من مواد مختلفة ونقيس مقاومتها ρ = ρ0[1 + α(T − T0)] (الجدول 2 ومثال 4)، ثم نبرد حلقة الزئبق تحت 4.2 K فتنعدم مقاومتها ويستمر التيار بلا بطارية.',
  tags: 'المعامل الحراري للمقاومية مثال 4 فرط التوصيل درجة الحرارة الحرجة MRI',
  fact: ['مقاومة فتيل المصباح تزداد أكثر من عشر مرات بين درجة حرارة الغرفة والتوهج الأبيض (ص 203).', 'التيار في حلقة فائقة التوصيل يبقى أسابيع بلا قوة دافعة، والمغانط فائقة التوصيل أقوى بنحو عشر مرات وتستعمل في أجهزة الرنين المغناطيسي (ص 204).'],
  quiz: [
    { q: 'مقاومة الكاربون وأشباه الموصلات بارتفاع درجة الحرارة:', o: ['تقل لأن α سالب', 'تزداد', 'لا تتغير', 'تصبح صفراً'], a: 0, why: 'ص 202.' },
    { q: 'فرط التوصيل هو:', o: ['انعدام المقاومة فجأة تحت درجة الحرارة الحرجة', 'زيادة المقاومة بالتبريد', 'توصيل المحاليل للتيار', 'زيادة التيار بزيادة الجهد'], a: 0, why: 'س3 ص 226.' },
    { q: 'مثال 4: مقاومة سلك الطباخ عند 420°C تقريباً:', o: ['29 Ω', '24 Ω', '2.9 Ω', '290 Ω'], a: 0, why: 'ρ = 8.16×10⁻⁵ Ω·m ص 203.' }],
  parts: [{ id: 'g11_i_temp', n: 'المقاومية ودرجة الحرارة: الجدول 2 ومثال 4' }, { id: 'g11_i_super', n: 'فرط التوصيل: الشكلان 7 و 8' }] });
M8.merge({ id: 'g11_c9_emf', ch: 59, reg: X11, sec: '9-5 القوة الدافعة الكهربائية + 9-6 قانون الدائرة المغلقة + 9-7 المقاومة الداخلية', page: 204, kind: 'نشاط',
  title: 'القوة الدافعة والمقاومة الداخلية وفولطية الأقطاب',
  desc: 'نشبّه البطارية بمضخة ماء (الشكل 9)، ونغيّر الحمل في دائرة مغلقة لنرى ΔV = ε − I r و I = ε / (R + r) ، ونحل مثال 5 لبطارية السيارة، ثم نعيّن r بمفتاحين (الشكل 14) ونقارن طريقتي الأميتر والفولطميتر لقياس المقاومة (الشكلان 15 و 16).',
  tags: 'القوة الدافعة الكهربائية المقاومة الداخلية فولطية الأقطاب مثال 5 تعيين r قياس المقاومة',
  fact: ['الفولطميتر مقاومته كبيرة جداً، فإذا ربط مباشرة بين قطبي البطارية في دائرة مفتوحة قرأ قوتها الدافعة تقريباً (ص 206).', 'المقاومة الداخلية للبطارية تنشأ من موادها الكيميائية، وللمولد من أسلاك ملفاته (ص 207).'],
  quiz: [
    { q: 'بطارية قوتها الدافعة 1 V ومقاومتها الداخلية r. لتكون فولطية أقطابها ½ V يجب أن تكون مقاومة الحمل:', o: ['R = r', 'R = 2r', 'R = ½ r', 'R = 0'], a: 0, why: 'س1 فقرة 4.' },
    { q: 'فولطية الأقطاب أقل من القوة الدافعة عند مرور تيار بسبب:', o: ['الهبوط I r في المقاومة الداخلية', 'مقاومة الفولطميتر', 'انعدام التيار', 'زيادة ε'], a: 0, why: 'س6 ص 226.' },
    { q: 'تخفت مصابيح السيارة لحظة تشغيل المحرك لأن:', o: ['محرك التشغيل يسحب تياراً كبيراً فيزداد I r', 'البطارية تنفد', 'المقاومة الداخلية تصبح صفراً'], a: 0, why: 'س7 ومثال 5: 11.9 V ثم 11 V.' },
    { q: 'لقياس مقاومة صغيرة بطريقة الأميتر والفولطميتر يربط الفولطميتر:', o: ['على طرفي المقاومة وحدها', 'على المقاومة والأميتر معاً', 'على التوالي مع المقاومة'], a: 0, why: 'الشكل 15 ص 209.' }],
  parts: [{ id: 'g11_i_emf', n: 'المضخة والدائرة المغلقة وبطارية السيارة: مثال 5' }, { id: 'g11_i_rint', n: 'تعيين r وقياس المقاومة: الأشكال 14–16' }] });
M8.merge({ id: 'g11_c9_bridge', ch: 59, reg: X11, sec: 'قياس المقاومة: قنطرة وتستون', page: 210, kind: 'مثال',
  title: 'قنطرة وتستون والقنطرة المترية ومثال 6',
  desc: 'نوازن قنطرة وتستون حتى تصبح قراءة الكلفانوميتر صفراً فنجد R1 = R2 × R3 / R4 ، ثم القنطرة المترية R1 / R2 = L1 / L2 ، ونحل مثال 6.',
  tags: 'قنطرة وتستون كلفانوميتر اتزان القنطرة المترية مثال 6',
  fact: ['عند اتزان القنطرة يكون Vbd = 0 فلا يمر تيار في الكلفانوميتر (ص 210).'],
  quiz: [
    { q: 'فائدة الكلفانوميتر في قنطرة وتستون:', o: ['معرفة الاتزان عندما تكون قراءته صفراً', 'قياس القوة الدافعة', 'حماية البطارية', 'قياس القدرة'], a: 0, why: 'س2 ص 226.' },
    { q: 'مثال 6: المقاومة المجهولة R تساوي:', o: ['20 Ω', '5 Ω', '0.8 Ω', '40 Ω'], a: 0, why: 'R / 10 = 4 / 2.' },
    { q: 'مثال 6: القوة الدافعة للبطارية:', o: ['21.6 V', '18 V', '3.6 V', '24 V'], a: 0, why: '3.6 × 5 + 3.6 × 1.' }],
  parts: [{ id: 'g11_i_bridge', n: 'قنطرة وتستون والسلك المنزلق ومثال 6' }] });
M8.merge({ id: 'g11_c9_power', ch: 59, reg: X11, sec: '9-8 القدرة الكهربائية', page: 212, kind: 'مثال',
  title: 'القدرة الكهربائية وأعظم قدرة ومثال 7',
  desc: 'نغيّر مقاومة الحمل ونقيس P = I ΔV = I² R ، ونحل مثال 7 (12 V و 0.05 Ω و 3 Ω) ، ونجد أن أعظم قدرة تنتقل إلى الحمل عندما R = r وعندها تكون نصف قدرة المصدر.',
  tags: 'القدرة الكهربائية الواط أعظم قدرة مثال 7',
  fact: ['الواط: A · V = (C/s) · (J/C) = J/s (ص 213).', 'فكر ص 213: عند R = r تكون قدرة الحمل نصف قدرة المصدر.'],
  quiz: [
    { q: 'الوحدة Ω · A² تقيس:', o: ['القدرة', 'التيار', 'الطاقة', 'الفولطية'], a: 0, why: 'س1 فقرة 5: P = I² R.' },
    { q: 'مدفأة 1000 W تعمل على 120 V. مدفأتان مثلها على التوالي مع 120 V تستهلكان معاً:', o: ['500 W', '2000 W', '1000 W', '250 W'], a: 0, why: 'س1 فقرة 3: المقاومة تتضاعف.' },
    { q: 'تلفاز يعمل على 120 V ومجفف على 240 V. أيهما يستهلك طاقة أكبر؟', o: ['المعطيات غير كافية', 'التلفاز', 'المجفف', 'متساويان'], a: 0, why: 'س1 فقرة 6: نحتاج القدرة والزمن.' },
    { q: 'تنتقل أعظم قدرة من البطارية إلى الحمل عندما:', o: ['تساوي مقاومة الحمل المقاومة الداخلية', 'تكون مقاومة الحمل صفراً', 'تكون مقاومة الحمل كبيرة جداً'], a: 0, why: 'س4 وفكر ص 213.' }],
  parts: [{ id: 'g11_i_power', n: 'P = I ΔV ومثال 7 وأعظم قدرة' }] });
M8.merge({ id: 'g11_c9_combo', ch: 59, reg: X11, sec: '9-9 ربط المقاومات على التوالي + 9-10 ربط المقاومات على التوازي', page: 215, kind: 'نشاط',
  title: 'ربط المقاومات على التوالي والتوازي',
  desc: 'نربط ثلاثة مصابيح على التوالي (مثال 8) ثم على التوازي (الشكل 26) ونتلف أحدها، ونشغّل أجهزة المنزل على 220 V (الشكل 25)، ثم نرتب تيارات الشكل 27 ونحل مثال 9.',
  tags: 'التوالي التوازي المقاومة المكافئة مثال 8 مثال 9 الشكل 26 الشكل 27',
  fact: ['مصابيح الزينة على التوالي: إذا تلف أحدها انفتحت الدائرة كلها (ص 215).', 'أجهزة المنزل تربط على التوازي فيعمل كل منها على 220 V ولا يؤثر إطفاء أحدها في غيره (ص 217).'],
  quiz: [
    { q: 'مصباحان متماثلان على التوازي مع بطارية، ثم على التوالي مع بطارية مماثلة (r = 0). نسبة القدرة الكلية P1 / P2:', o: ['4', '¼', '½', '2'], a: 0, why: 'س1 فقرة 9: Req = R/2 مقابل 2R.' },
    { q: 'مثال 8: التيار في المقاومات 2 Ω و 3 Ω و 5 Ω مع 20 V:', o: ['2 A في كل منها', '10 A', '4 A و 6 A و 10 A'], a: 0, why: 'Req = 10 Ω.' },
    { q: 'الشكل 26: المكافئة لـ 2 Ω و 3 Ω و 6 Ω على التوازي:', o: ['1 Ω', '11 Ω', '6 Ω', '2 Ω'], a: 0, why: '1/2 + 1/3 + 1/6 = 1.' },
    { q: 'مثال 9 والمفتاح مفتوح: المكافئة بين x و y:', o: ['40 Ω', '160 Ω', '80 Ω', 'صفر'], a: 0, why: '80 Ω ∥ 80 Ω.' }],
  parts: [{ id: 'g11_i_combo', n: 'التوالي والتوازي: مثال 8 والشكلان 25 و 26' }, { id: 'g11_i_req', n: 'فكر الشكل 27 ومثال 9' }] });
M8.merge({ id: 'g11_c9_kirch', ch: 59, reg: X11, sec: '9-11 قواعد كيرشوف', page: 219, kind: 'مثال',
  title: 'قاعدتا كيرشوف: العقدة والعروة',
  desc: 'نوزع التيار في عقدة (الشكل 29)، ونمشي حول العروة نقيس الجهد عند كل نقطة (الشكلان 30 و 31) ونحل الأمثلة 10 و 11 و 12.',
  tags: 'كيرشوف العقدة العروة حفظ الشحنة حفظ الطاقة مثال 10 مثال 11 مثال 12',
  fact: ['قاعدة العقدة تعبير عن حفظ الشحنة، وقاعدة العروة تعبير عن حفظ الطاقة (ص 219–220).', 'سميت القاعدتان باسم العالم الألماني غوستاف كيرشوف (ص 219).'],
  quiz: [
    { q: 'قاعدة كيرشوف الأولى (العقدة) تعبير عن:', o: ['حفظ الشحنة', 'حفظ الطاقة', 'حفظ الزخم', 'قانون أوم'], a: 0, why: 'ص 219.' },
    { q: 'عبور مقاومة R باتجاه التيار I يكون تغير الجهد:', o: ['−I R', '+I R', '+ε', 'صفراً'], a: 0, why: 'الشكل 31 ص 221.' },
    { q: 'مثال 10: تيار الدائرة:', o: ['0.9 A', '1.5 A', '0.3 A', '2 A'], a: 0, why: '20 I = 18.' },
    { q: 'مثال 12: التيار I3 في المقاومة 4 Ω:', o: ['1 A', '2/3 A', '1/3 A', '1.5 A'], a: 0, why: 'I3 = I1 + I2.' }],
  parts: [{ id: 'g11_i_kirch', n: 'العقدة والعروة ومثالا 10 و 11' }, { id: 'g11_i_kex', n: 'مثال 12: دائرة بعروتين' }] });
M8.merge({ id: 'g11_c9_review', ch: 59, reg: X11, sec: 'أسئلة الفصل التاسع ومسائله', page: 225, kind: 'مثال',
  title: 'مسائل الفصل التاسع خطوة خطوة',
  desc: 'نحل المسائل الست في نهاية الفصل مع رسم كل دائرة، وأسئلة الاختيار في الاختبار.',
  tags: 'مسائل الفصل التاسع أسئلة',
  fact: ['ربط البطاريات على التوالي يزيد القوة الدافعة، وربطها على التوازي يقلل المقاومة الداخلية ويطيل مدة عملها (س8 ص 226).'],
  quiz: [
    { q: 'المسألة 1: درجة حرارة ملف النحاس عندما تصبح مقاومته 60 Ω:', o: ['70.9 °C', '50.9 °C', '120 °C', '30 °C'], a: 0, why: 'T − 20 = 0.2 / 39.3×10⁻⁴.' },
    { q: 'المسألة 2: المقاومة الداخلية للبطارية:', o: ['0.5 Ω', '6 Ω', '1 Ω', '2 Ω'], a: 0, why: '13 = 12 + 2 r.' },
    { q: 'المسألة 4: الطاقة التي يستهلكها المصباح في 5.5 min:', o: ['396 J', '6.6 J', '1.2 J', '66 J'], a: 0, why: 'E = 1.2 × 330.' },
    { q: 'إشارة فرق الجهد على المقاومة الداخلية عكس إشارة القوة الدافعة لأن:', o: ['الشحنة تفقد طاقة في r وتكسبها في ε', 'r سالبة', 'التيار ينعدم'], a: 0, why: 'س5 ص 226.' }],
  parts: [{ id: 'g11_i_review', n: 'المسائل 1 إلى 6' }] });
