'use strict';
/* ====================== الثالث المتوسط — الفصل الثالث: التيار الكهربائي (ch 33, ص 47–78) ======================
   Merged experiments (book order): g9_current (1-3, 2-3) · g9_circuit (3-3, 4-3) · g9_voltage (5-3, 6-3) · g9_resist (7-3, 8-3)
   · g9_combo (9-3) · g9_short (10-3, 11-3 + أسئلة الفصل). Parts live in M8.P and are merged at the end (reg: X9).
   Local circuit kit Q33: light «bench» look — wires with moving charges, cells, lamps that glow, knife switch, analog meters,
   colour-coded resistors and a rheostat. Circuits are simple, so every part solves its own circuit analytically. */
LW({ id: 'g9_I', cat: 33, name: 'التيار الكهربائي', fx: '<i>I</i> = ' + FR('<i>q</i>', '<i>t</i>') + ' ، التيار (A) = ' + FR('الشحنة (C)', 'الزمن (s)'), sym: 'التيار الكهربائي: مقدار الشحنات الكهربائية الكلية التي تعبر مقطعاً عرضياً لموصل في وحدة الزمن. الأمبير الواحد يمثل تدفق كولوم واحد من الشحنات في ثانية واحدة. 1 mA = 10<sup>−3</sup> A ، 1 µA = 10<sup>−6</sup> A', calc: { in: [['q', 'الشحنة q', 'C', 1.2], ['t', 'الزمن t', 's', 60]], out: 'التيار I', u: 'A', f: v => v.q / v.t } });
LW({ id: 'g9_ohm', cat: 33, name: 'قانون أوم', fx: '<i>R</i> = ' + FR('<i>V</i>', '<i>I</i>') + ' ، <i>V</i> = <i>I</i> × <i>R</i>', sym: 'حاصل قسمة فرق الجهد بين طرفي المقاوم على مقدار التيار المار فيه يساوي مقداراً ثابتاً ضمن حدود معينة يسمى المقاومة الكهربائية، وتقاس بالأوم (Ω). الأوم: مقاومة موصل فرق الجهد بين طرفيه فولط واحد ومقدار التيار المار خلاله أمبير واحد', calc: { in: [['V', 'فرق الجهد V', 'V', 6], ['I', 'التيار I', 'A', 2]], out: 'المقاومة R', u: 'Ω', f: v => v.V / v.I } });
LW({ id: 'g9_RLA', cat: 33, name: 'العوامل المؤثرة في المقاومة', fx: '<i>R</i> ∝ ' + FR('<i>L</i>', '<i>A</i>'), sym: 'مقاومة الموصل تتناسب طردياً مع طوله وعكسياً مع مساحة مقطعه العرضي، وتعتمد على نوع المادة ودرجة الحرارة (تزداد مقاومة المعادن النقية بارتفاع درجة حرارتها)' });
LW({ id: 'g9_series', cat: 33, name: 'ربط المقاومات على التوالي', fx: '<i>I</i> = <i>I</i><sub>1</sub> = <i>I</i><sub>2</sub> ، <i>V</i><sub>total</sub> = <i>V</i><sub>1</sub> + <i>V</i><sub>2</sub> ، <i>R</i><sub>eq</sub> = <i>R</i><sub>1</sub> + <i>R</i><sub>2</sub>', sym: 'مسار واحد لانسياب التيار: التيار نفسه في جميع الأجزاء، وفرق الجهد الكلي يتوزع على المقاومات، والمقاومة المكافئة أكبر من أكبرها', calc: { in: [['R1', 'R₁', 'Ω', 6], ['R2', 'R₂', 'Ω', 3]], out: 'المقاومة المكافئة', u: 'Ω', f: v => v.R1 + v.R2 } });
LW({ id: 'g9_parallel', cat: 33, name: 'ربط المقاومات على التوازي', fx: '<i>V</i> = <i>V</i><sub>1</sub> = <i>V</i><sub>2</sub> ، <i>I</i><sub>total</sub> = <i>I</i><sub>1</sub> + <i>I</i><sub>2</sub> ، ' + FR('1', '<i>R</i><sub>eq</sub>') + ' = ' + FR('1', '<i>R</i><sub>1</sub>') + ' + ' + FR('1', '<i>R</i><sub>2</sub>'), sym: 'عدة مسارات لانسياب التيار: فرق الجهد نفسه على كل فرع، والتيار الكلي يساوي مجموع تيارات الفروع، والمقاومة المكافئة أصغر من أصغرها', calc: { in: [['R1', 'R₁', 'Ω', 6], ['R2', 'R₂', 'Ω', 3]], out: 'المقاومة المكافئة', u: 'Ω', f: v => 1 / (1 / v.R1 + 1 / v.R2) } });
LW({ id: 'g9_cells', cat: 33, name: 'ربط الأعمدة الكهربائية', fx: 'توالي: emf<sub>total</sub> = emf<sub>1</sub> + emf<sub>2</sub> + … ، توازي (متماثلة): emf<sub>total</sub> = emf', sym: 'ربط الأعمدة على التوالي يجهز فولطية أكبر، وربطها على التوازي (المتماثلة) يبقي الفولطية نفسها ويجهز الدائرة بتيار أكبر لمدة أطول' });

const Q33 = {
  T(ctx, s, x, y, o) { Q31.T(ctx, s, x, y, o); },
  card(ctx, S, L, o) { return Q31.card(ctx, S, L, Object.assign({ bd: '#ca8a04' }, o || {})); },
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#a16207', y); },
  btn(id, b, click, o) { return Q31.btn(id, b, click, o); },
  drawBtn(ctx, b, label, col, on) { Q31.drawBtn(ctx, b, label, col, on); },
  sci(v, d = 3, u = '') { return Q31.sci(v, d, u); },
  L(S) { return S.W < 600 ? 12 : 76; },
  ph(S) { return S.W < 600; },
  f(v, d = 2) { return isFinite(v) ? String(+(+v).toFixed(d)) : '∞'; },
  chips(S, id, list, y, cur, click, o = {}) { const C = Q42.chips(S, id, list, y, cur, click, Object.assign({ col: '#a16207' }, o)); C.forEach(b => { b.idle = 'اضغط ✋'; }); return C; },
  drawChips(ctx, list) { list.forEach(b => Q33.drawBtn(ctx, b, b._lab, b._on ? (b._col || '#a16207') : '#64748b', b._on)); },
  steps(ctx, S, st, o = {}) { return Q42.steps(ctx, S, st, o); },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#fefce8'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  /* wooden bench board under a circuit */
  board(ctx, x, y, w, h) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.18)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 5; const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#fffbeb'); g.addColorStop(1, '#fde68a'); ctx.fillStyle = g; rr(ctx, x, y, w, h, 14); ctx.fill(); ctx.restore(); ctx.strokeStyle = 'rgba(161,98,7,.35)'; ctx.lineWidth = 1.5; rr(ctx, x, y, w, h, 14); ctx.stroke(); }); },
  /* ---------- wires ---------- */
  wire(ctx, pts, o = {}) {
    if (!pts || pts.length < 2) return;
    K.raw(ctx, () => { ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; const P = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); };
      if (o.thick) { P(); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 11; ctx.stroke(); P(); ctx.strokeStyle = '#d97706'; ctx.lineWidth = 7; ctx.stroke(); }
      else { P(); ctx.strokeStyle = 'rgba(15,23,42,.75)'; ctx.lineWidth = 6.5; ctx.stroke(); P(); ctx.strokeStyle = o.col || '#2563eb'; ctx.lineWidth = 4; ctx.stroke(); P(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1.2; ctx.stroke(); }
      ctx.restore(); });
  },
  plen(pts) { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; },
  at(pts, d) { for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], l = Math.hypot(b[0] - a[0], b[1] - a[1]); if (d <= l || i === pts.length - 1) { const f = l ? clamp(d / l, 0, 1) : 0; return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, Math.atan2(b[1] - a[1], b[0] - a[0])]; } d -= l; } return [pts[0][0], pts[0][1], 0]; },
  /* moving charges along a wire path drawn in the CONVENTIONAL direction (pts[0] → end). ph = travelled distance (px).
     mode 'c': yellow «+» dots with arrows (conventional current); 'e': blue «−» electrons going the other way */
  flow(ctx, pts, ph, mode, o = {}) {
    const L = Q33.plen(pts); if (L < 4) return; const sp = o.sp || 26, n = Math.floor(L / sp);
    const off = ((mode === 'e' ? -ph : ph) % sp + sp) % sp;
    for (let k = 0; k <= n; k++) { const d = k * sp + off; if (d > L) continue; const [x, y, a] = Q33.at(pts, d);
      if (mode === 'e') Q33.elec(ctx, x, y, o.r || 4.2); else K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = '#facc15'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(-4, -4.5); ctx.lineTo(-2, 0); ctx.lineTo(-4, 4.5); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }); }
  },
  elec(ctx, x, y, r = 4.2) { K.raw(ctx, () => { const g = ctx.createRadialGradient(x - r * .3, y - r * .3, .5, x, y, r); g.addColorStop(0, '#bfdbfe'); g.addColorStop(1, '#1d4ed8'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - r * .5, y); ctx.lineTo(x + r * .5, y); ctx.stroke(); }); },
  /* dashed arrow showing current direction next to a wire */
  arrow(ctx, x1, y1, x2, y2, col, lab) { K.raw(ctx, () => { G.arrow(ctx, x1, y1, x2, y2, col, 2.4, 9); }); if (lab) Q33.T(ctx, lab, (x1 + x2) / 2, (y1 + y2) / 2 - 12, { s: 10.5, w: 900, c: col }); },
  /* ---------- cell / battery: horizontal body centred (x,y), «+» on the side given by o.pos (+1 → right) ---------- */
  cell(ctx, x, y, o = {}) {
    const w = o.w || 74, h = o.h || 30, pos = o.pos || 1;
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(pos, 1);
      ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 3;
      let g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#fde68a'); g.addColorStop(.4, '#f59e0b'); g.addColorStop(1, '#92400e'); ctx.fillStyle = g; rr(ctx, -w / 2, -h / 2, w * .62, h, 5); ctx.fill();
      ctx.shadowColor = 'transparent'; g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#94a3b8'); g.addColorStop(.4, '#1e293b'); g.addColorStop(1, '#020617'); ctx.fillStyle = g; rr(ctx, -w / 2 + w * .58, -h / 2, w * .42, h, 5); ctx.fill();
      ctx.fillStyle = '#cbd5e1'; rr(ctx, w / 2 - 1, -h * .18, 6, h * .36, 2); ctx.fill(); ctx.fillStyle = '#64748b'; rr(ctx, -w / 2 - 3, -h * .3, 4, h * .6, 1); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(-w / 2 + 4, -h / 2 + 4, w - 10, 3); ctx.restore(); });
    const ex = x + pos * (w / 2 + 12);
    if (o.sp !== 0) Q33.T(ctx, '+', ex, y - h / 2 - 2, { s: 14, w: 900, c: '#dc2626' }); if (o.sn !== 0) Q33.T(ctx, '−', x - pos * (w / 2 + 10), y - h / 2 - 2, { s: 14, w: 900, c: '#1e293b' });
    if (o.label !== '') Q33.T(ctx, o.label || ((o.V || 1.5) + ' V'), x - pos * 8, y, { s: 10.5, w: 900, c: '#fff' });
    return { p: [x + pos * (w / 2 + 5), y], n: [x - pos * (w / 2 + 3), y] };
  },
  /* box battery (9 V / 12 V car style) with two top terminals; returns terminal points */
  bat(ctx, x, y, o = {}) {
    const w = o.w || 80, h = o.h || 64;
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4; const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#1e3a8a'); g.addColorStop(.5, '#3b82f6'); g.addColorStop(1, '#1e3a8a'); ctx.fillStyle = g; rr(ctx, x - w / 2, y - h / 2, w, h, 7); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#facc15'; ctx.fillRect(x - w / 2, y - 6, w, 14); ctx.fillStyle = '#dc2626'; rr(ctx, x + w / 2 - 22, y - h / 2 - 9, 14, 10, 2); ctx.fill(); ctx.fillStyle = '#111827'; rr(ctx, x - w / 2 + 8, y - h / 2 - 9, 14, 10, 2); ctx.fill(); });
    Q33.T(ctx, o.label || 'بطارية', x, y + 1, { s: 10.5, w: 900, c: '#1e3a8a' }); Q33.T(ctx, (o.V != null ? o.V : 12) + ' V', x, y + h / 2 - 11, { s: 11, w: 900, c: '#fff' });
    Q33.T(ctx, '+', x + w / 2 - 15, y - h / 2 - 20, { s: 14, w: 900, c: '#dc2626' }); Q33.T(ctx, '−', x - w / 2 + 15, y - h / 2 - 20, { s: 14, w: 900, c: '#111827' });
    return { p: [x + w / 2 - 15, y - h / 2 - 7], n: [x - w / 2 + 15, y - h / 2 - 7] };
  },
  /* ---------- lamp: glass bulb above a socket whose two screws sit at (x±18, y). b = brightness 0..1.5 ---------- */
  bulb(ctx, x, y, b, o = {}) {
    const s = o.s || 1, burnt = o.burnt, r = 17 * s, cy = y - 34 * s; b = burnt ? 0 : clamp(b, 0, 1.6);
    K.raw(ctx, () => { ctx.save();
      if (b > .02) { const R = r * (1.6 + 2.6 * Math.min(b, 1.3)); const g = ctx.createRadialGradient(x, cy, r * .3, x, cy, R); g.addColorStop(0, 'rgba(254,240,138,' + (.85 * Math.min(1, b)) + ')'); g.addColorStop(.45, 'rgba(250,204,21,' + (.35 * Math.min(1, b)) + ')'); g.addColorStop(1, 'rgba(250,204,21,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, cy, R, 0, TAU); ctx.fill(); }
      // socket
      ctx.fillStyle = '#334155'; rr(ctx, x - 24 * s, y - 6 * s, 48 * s, 12 * s, 4); ctx.fill(); ctx.fillStyle = '#94a3b8'; rr(ctx, x - 10 * s, y - 16 * s, 20 * s, 12 * s, 2); ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x - 10 * s, y - 14 * s + k * 4 * s); ctx.lineTo(x + 10 * s, y - 12 * s + k * 4 * s); ctx.stroke(); }
      [-18, 18].forEach(d => { ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.arc(x + d * s, y, 3.6 * s, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.stroke(); });
      // glass
      const gl = ctx.createRadialGradient(x - r * .35, cy - r * .4, 1, x, cy, r * 1.1); const on = Math.min(1, b);
      gl.addColorStop(0, 'rgba(255,255,255,.95)'); gl.addColorStop(.5, on > .05 ? 'rgba(254,249,195,' + (.5 + .45 * on) + ')' : 'rgba(226,232,240,.55)'); gl.addColorStop(1, on > .05 ? 'rgba(250,204,21,' + (.35 + .5 * on) + ')' : 'rgba(148,163,184,.45)');
      ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(x, cy, r, Math.PI * .75, Math.PI * .25); ctx.lineTo(x + r * .45, y - 16 * s); ctx.lineTo(x - r * .45, y - 16 * s); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(100,116,139,.7)'; ctx.lineWidth = 1.2; ctx.stroke();
      // filament
      ctx.strokeStyle = burnt ? '#57534e' : on > .05 ? '#fb923c' : '#78716c'; ctx.lineWidth = on > .05 ? 2.2 : 1.4; ctx.beginPath(); ctx.moveTo(x - 6 * s, y - 16 * s); ctx.lineTo(x - 5 * s, cy + 2 * s);
      if (burnt) { ctx.lineTo(x - 2 * s, cy - 3 * s); ctx.moveTo(x + 2 * s, cy - 1 * s); } else for (let k = 0; k <= 8; k++) ctx.lineTo(x - 5 * s + k * 1.25 * s, cy + 2 * s + (k % 2 ? -3 : 3) * s);
      ctx.lineTo(x + 6 * s, y - 16 * s); ctx.stroke();
      if (on > .3) { ctx.strokeStyle = 'rgba(250,204,21,' + (.7 * on) + ')'; ctx.lineWidth = 2; for (let k = 0; k < 8; k++) { const a = -Math.PI / 2 + (k - 3.5) * .38; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * 1.3, cy + Math.sin(a) * r * 1.3); ctx.lineTo(x + Math.cos(a) * r * (1.5 + .4 * on), cy + Math.sin(a) * r * (1.5 + .4 * on)); ctx.stroke(); } }
      ctx.restore(); });
    if (o.label) Q33.T(ctx, o.label, x, y + 18 * s, { s: 11, w: 900, c: '#0f172a' });
    if (burnt) Q33.T(ctx, 'تالف', x, cy - r - 10, { s: 10, w: 900, c: '#fff', bg: '#b91c1c' });
    return { a: [x - 18 * s, y], b: [x + 18 * s, y], top: cy - r };
  },
  /* ---------- knife switch between screws (x1,y) and (x2,y) ---------- */
  sw(ctx, x1, x2, y, closed, o = {}) {
    const ang = closed ? 0 : -.75, L = x2 - x1;
    K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#1f2937'; rr(ctx, x1 - 12, y + 2, L + 24, 12, 4); ctx.fill(); ctx.fillStyle = '#9ca3af'; [x1, x2].forEach(x => { ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill(); });
      ctx.translate(x1, y); ctx.rotate(ang); ctx.fillStyle = '#d1d5db'; ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1; rr(ctx, 0, -3, L + 4, 6, 2); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#2563eb'; rr(ctx, L - 4, -9, 16, 18, 5); ctx.fill(); ctx.restore(); });
    if (o.label !== '') Q33.T(ctx, o.label || (closed ? 'المفتاح مغلق' : 'المفتاح مفتوح'), (x1 + x2) / 2, y + 26, { s: 10.5, w: 900, c: closed ? '#15803d' : '#b91c1c' });
    return { a: [x1, y], b: [x2, y], hx: x1 + Math.cos(ang) * (L + 4), hy: y + Math.sin(ang) * (L + 4) };
  },
  /* ---------- analog meter centred (x,y); kind 'A' | 'mA' | 'V' | 'Ω'; val reading, max full scale ---------- */
  meter(ctx, x, y, kind, val, max, o = {}) {
    const w = o.w || 92, h = o.h || 74, col = kind === 'V' ? '#b91c1c' : kind === 'Ω' ? '#7c3aed' : '#a16207';
    const f = max ? val / max : 0, a0 = -Math.PI * .8, a1 = -Math.PI * .2, ang = a0 + (a1 - a0) * clamp(f, -.08, 1.08);
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; ctx.fillStyle = col; rr(ctx, x - w / 2, y - h / 2, w, h, 9); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#fffbeb'; rr(ctx, x - w / 2 + 7, y - h / 2 + 7, w - 14, h * .62, 6); ctx.fill();
      const cx = x, cy = y - h / 2 + 7 + h * .62 - 4, R = Math.min(w * .42, h * .52); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.stroke();
      for (let k = 0; k <= 10; k++) { const a = a0 + (a1 - a0) * k / 10, l = k % 5 ? 4 : 8; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.lineTo(cx + Math.cos(a) * (R - l), cy + Math.sin(a) * (R - l)); ctx.stroke(); }
      ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ang) * (R - 2), cy + Math.sin(ang) * (R - 2)); ctx.stroke(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, TAU); ctx.fill();
      // terminals
      const sg = o.flip ? -1 : 1; ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(x + sg * (w / 2 - 14), y + h / 2 - 9, 5, 0, TAU); ctx.fill(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(x - sg * (w / 2 - 14), y + h / 2 - 9, 5, 0, TAU); ctx.fill(); });
    Q33.T(ctx, kind, x, y - h / 2 + 7 + h * .62 - 16, { s: 13, w: 900, c: '#0f172a' }); const sg = o.flip ? -1 : 1;
    Q33.T(ctx, '+', x + sg * (w / 2 - 26), y + h / 2 - 9, { s: 11, w: 900, c: '#fff' }); Q33.T(ctx, '−', x - sg * (w / 2 - 26), y + h / 2 - 9, { s: 11, w: 900, c: '#fff' });
    const txt = o.txt != null ? o.txt : (f > 1.08 ? 'خارج التدريج!' : Q33.f(val, o.d != null ? o.d : 2) + ' ' + (o.unit || (kind === 'Ω' ? 'Ω' : kind)));
    Q33.T(ctx, txt, x, y + h / 2 + 13, { s: 12, w: 900, c: '#fff', bg: f > 1.08 || f < -.02 ? '#b91c1c' : col });
    if (o.name) Q33.T(ctx, o.name, x, y - h / 2 - 11, { s: 10.5, w: 900, c: col });
    return o.flip ? { p: [x - w / 2 + 14, y + h / 2 - 9], n: [x + w / 2 - 14, y + h / 2 - 9] } : { n: [x - w / 2 + 14, y + h / 2 - 9], p: [x + w / 2 - 14, y + h / 2 - 9] };
  },
  /* ---------- colour-coded resistor along a horizontal or vertical segment; body centred at (x,y) ---------- */
  CC: ['#111827', '#7c2d12', '#dc2626', '#ea580c', '#facc15', '#16a34a', '#2563eb', '#7c3aed', '#6b7280', '#f8fafc'],
  CCN: ['أسود', 'بني', 'أحمر', 'برتقالي', 'أصفر', 'أخضر', 'أزرق', 'بنفسجي', 'رمادي', 'أبيض'],
  bands(R) { if (!(R > 0)) return [0, 0, 0]; let e = Math.floor(Math.log10(R)) - 1; if (e < 0) e = 0; const m = Math.round(R / Math.pow(10, e)); return [Math.floor(m / 10) % 10, m % 10, e]; },
  res(ctx, x, y, R, o = {}) {
    const len = o.len || 64, vert = o.vert, th = o.th || 18, B = o.bands || Q33.bands(R);
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); if (vert) ctx.rotate(Math.PI / 2);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-len / 2 - 12, 0); ctx.lineTo(len / 2 + 12, 0); ctx.stroke();
      const g = ctx.createLinearGradient(0, -th / 2, 0, th / 2); g.addColorStop(0, '#fef3c7'); g.addColorStop(.45, '#e7c99a'); g.addColorStop(1, '#a8845a'); ctx.fillStyle = g; rr(ctx, -len / 2, -th / 2, len, th, th / 2.2); ctx.fill(); ctx.strokeStyle = 'rgba(120,53,15,.5)'; ctx.lineWidth = 1; ctx.stroke();
      B.forEach((c, i) => { ctx.fillStyle = Q33.CC[c]; ctx.fillRect(-len / 2 + len * (.14 + i * .12), -th / 2 + 1, len * .065, th - 2); }); ctx.fillStyle = '#ca8a04'; ctx.fillRect(len / 2 - len * .2, -th / 2 + 1, len * .065, th - 2);
      ctx.restore(); });
    if (o.label !== '') Q33.T(ctx, o.label || ('R = ' + Q33.f(R) + ' Ω'), vert ? x + 44 : x, vert ? y : y - th / 2 - 12, { s: 11, w: 900, c: '#7c2d12' });
    return vert ? { a: [x, y - len / 2 - 12], b: [x, y + len / 2 + 12] } : { a: [x - len / 2 - 12, y], b: [x + len / 2 + 12, y] };
  },
  /* ---------- rheostat: coil from x1 to x2 at y, slider fraction f (0 → x1). Returns slider top point ---------- */
  rheo(ctx, x1, x2, y, f, o = {}) {
    const L = x2 - x1, sx = x1 + L * f;
    K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#e5e7eb'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; rr(ctx, x1 - 8, y - 14, L + 16, 28, 12); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.6; for (let x = x1; x <= x2; x += 4) { ctx.beginPath(); ctx.moveTo(x, y - 12); ctx.lineTo(x + 2, y + 12); ctx.stroke(); }
      ctx.fillStyle = '#334155'; ctx.fillRect(x1 - 14, y - 34, L + 28, 6); ctx.fillRect(x1 - 14, y - 34, 6, 46); ctx.fillRect(x2 + 8, y - 34, 6, 46);
      ctx.fillStyle = '#2563eb'; rr(ctx, sx - 9, y - 40, 18, 30, 4); ctx.fill(); ctx.fillStyle = '#93c5fd'; ctx.fillRect(sx - 2, y - 14, 4, 6); ctx.restore(); });
    if (o.label !== '') Q33.T(ctx, o.label || 'الريوستات (مقاومة متغيرة)', (x1 + x2) / 2, y + 28, { s: 10.5, w: 900, c: '#334155' });
    return { a: [x1 - 11, y - 31], s: [sx, y - 40], b: [x2 + 11, y + 10] };
  },
  /* ---------- schematic mini symbols (for side diagrams / questions) ---------- */
  sym: {
    line(ctx, a, b, col = '#0f172a') { K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }); },
    path(ctx, pts, col = '#0f172a') { K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }); },
    res(ctx, x, y, vert, lab, col = '#0f172a') { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); if (vert) ctx.rotate(Math.PI / 2); ctx.fillStyle = '#fff'; ctx.fillRect(-16, -7, 32, 14); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-16, 0); for (let k = 0; k < 6; k++) ctx.lineTo(-13 + k * 5.3, k % 2 ? 6 : -6); ctx.lineTo(16, 0); ctx.stroke(); ctx.restore(); }); if (lab) Q33.T(ctx, lab, vert ? x + 26 : x, vert ? y : y - 15, { s: 10, w: 900, c: col }); },
    cell(ctx, x, y, vert, lab) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); if (vert) ctx.rotate(Math.PI / 2); ctx.fillStyle = '#fff'; ctx.fillRect(-6, -14, 12, 28); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-4, -13); ctx.lineTo(-4, 13); ctx.stroke(); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(4, -7); ctx.lineTo(4, 7); ctx.stroke(); ctx.restore(); }); if (lab) Q33.T(ctx, lab, x, vert ? y + 24 : y + 22, { s: 10, w: 900, c: '#0f172a' }); },
    meter(ctx, x, y, k, col) { K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = col || '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 11, 0, TAU); ctx.fill(); ctx.stroke(); }); Q33.T(ctx, k, x, y, { s: 11, w: 900, c: col || '#0f172a' }); },
    lamp(ctx, x, y, b, lab) { K.raw(ctx, () => { if (b > .05) { ctx.fillStyle = 'rgba(250,204,21,' + (.25 + .5 * Math.min(1, b)) + ')'; ctx.beginPath(); ctx.arc(x, y, 11 + 9 * Math.min(1.3, b), 0, TAU); ctx.fill(); } ctx.fillStyle = b > .05 ? '#fef08a' : '#fff'; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 10, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 7, y - 7); ctx.lineTo(x + 7, y + 7); ctx.moveTo(x + 7, y - 7); ctx.lineTo(x - 7, y + 7); ctx.stroke(); }); if (lab) Q33.T(ctx, lab, x, y + 20, { s: 10, w: 900, c: '#0f172a' }); },
    sw(ctx, x, y, closed) { K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.fillRect(x - 14, y - 12, 28, 14); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 12, y); ctx.lineTo(x + 11, closed ? y : y - 11); ctx.stroke(); ctx.fillStyle = '#0f172a'; [x - 12, x + 12].forEach(xx => { ctx.beginPath(); ctx.arc(xx, y, 2.6, 0, TAU); ctx.fill(); }); }); }
  },
  /* small brightness word for kids */
  glow(b) { return b < .02 ? 'منطفئ' : b < .3 ? 'خافت' : b < .75 ? 'متوسط' : b < 1.2 ? 'ساطع' : 'ساطع جداً'; },
  /* advance the charge-flow phase with current I (A): S.fp in px */
  adv(S, dt, I, k = 60) { S.fp = (S.fp || 0) + clamp(I * k, -260, 260) * dt; }
};

/* =============== A1 — حركة الشحنات: موصلات وعوازل، التيار الإلكتروني والاصطلاحي، المحاليل والغازات (1-3، 2-3، الأشكال 1–7) =============== */
(() => {
  const MT = { cu: { n: 'نحاس', c: 1, I: .5 }, al: { n: 'ألمنيوم', c: 1, I: .5 }, wood: { n: 'خشب جاف', c: 0 }, plas: { n: 'بلاستيك', c: 0 }, glass: { n: 'زجاج', c: 0 }, rub: { n: 'مطاط', c: 0 }, sol: { n: 'محلول إلكتروليتي', c: 1, I: .3 }, gas: { n: 'غاز نيون', c: 1, I: .2 } };
  const D = { id: 'g9_i_flow', page: 49, fig: 'الأشكال 2 إلى 7',
    desc: 'إلكترونات المدارات الخارجية في المواد الموصلة ضعيفة الارتباط بنواتها، فإذا تعرضت لمجال كهربائي خارجي تحركت بين ذرات الموصل باتجاه معاكس لاتجاه المجال (E) لأنها سالبة. أما العوازل فقوى ارتباط إلكتروناتها كبيرة جداً فلا تسمح بانسياب التيار (الخشب الجاف، البلاستيك، الزجاج، المطاط). اتجاه حركة الإلكترونات في الأسلاك من القطب السالب إلى الموجب (التيار الإلكتروني)، والتيار الاصطلاحي اتجاهه مع اتجاه المجال: من القطب الموجب إلى السالب خلال الأسلاك. وقد يكون التيار ناتجاً عن حركة الأيونات الموجبة والسالبة داخل المحاليل الإلكتروليتية أو داخل غاز متأين.',
    tags: 'حركة الشحنات موصل عازل تيار إلكتروني تيار اصطلاحي مجال كهربائي أيونات محلول إلكتروليتي غاز النيون فلورسنت',
    tools: ['عمودان كهربائيان', 'مصباح كهربائي', 'مفتاح', 'أسلاك توصيل', 'مواد مختلفة (نحاس، خشب، بلاستيك، زجاج، مطاط)', 'محلول إلكتروليتي', 'مصباح فلورسنت'],
    steps: ['اختر مادة من الأسفل وضعها بين الماسكين، ثم أغلق المفتاح (اضغط عليه).', 'هل يتوهج المصباح؟ جرّب الخشب الجاف والبلاستيك والزجاج والمطاط (الشكل 2).', 'بدّل بين «التيار الإلكتروني» و«التيار الاصطلاحي»: لاحظ أن اتجاهيهما متعاكسان (الشكلان 3 و 5).', 'جرّب المحلول الإلكتروليتي والغاز: التيار هنا حركة أيونات موجبة وسالبة (الشكلان 6 و 7).'],
    concl: ['الموصلات (كالنحاس) تسمح بانسياب التيار لأن إلكترونات التكافؤ فيها ضعيفة الارتباط بنواتها.', 'العوازل (الخشب الجاف، البلاستيك، الزجاج، المطاط) لا تسمح بانسياب التيار.', 'التيار الإلكتروني: من القطب السالب إلى الموجب خلال الأسلاك، معاكس لاتجاه المجال الكهربائي.', 'التيار الاصطلاحي: من القطب الموجب إلى السالب خلال الأسلاك، وهو المعتمد في جميع الدوائر.', 'في المحاليل والغازات المتأينة ينتج التيار عن حركة الأيونات الموجبة والسالبة.'],
    laws: ['g9_I'],
    controls: [TG('E', 'اتجاه المجال الكهربائي E (الشكل 4)', true, null, 'arrow')],
    setup(S) { S.m = 'cu'; S.on = 0; S.md = 'e'; S.fp = 0; },
    I(S) { const M = MT[S.m]; return S.on && M.c ? M.I : 0; },
    update(S, dt) { Q33.adv(S, dt, D.I(S), 90); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 4 : 20), x1 = ph ? w - 16 : Math.min(w - 20, x0 + 640), yt = ph ? 150 : 170, yb = ph ? h * .62 : h - 214; return { w, h, ph, L, x0, x1, yt, yb, xl: x0 + (x1 - x0) * .28, xc1: x0 + (x1 - x0) * .55, xc2: x0 + (x1 - x0) * .8, cx: x0 + (x1 - x0) * .36, xs1: x0 + (x1 - x0) * .64, xs2: x0 + (x1 - x0) * .78 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, M = MT[S.m], I = D.I(S), md = S.md;
      Q33.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.yt - 90, g.x1 - g.x0 + 28, g.yb - g.yt + 130);
      // battery: two cells on the bottom wire
      const c1 = Q33.cell(ctx, g.cx - 40, g.yb, { V: 1.5, sp: 0 }), c2 = Q33.cell(ctx, g.cx + 44, g.yb, { V: 1.5, sn: 0 });
      Q33.T(ctx, 'البطارية 3 V', g.cx, g.yb + 30, { s: fs, w: 900, c: '#92400e' });
      // wires (conventional order)
      const Wa = [c2.p, [g.xs1, g.yb]], Wb = [[g.xs2, g.yb], [g.x1, g.yb], [g.x1, g.yt], [g.xc2 + 6, g.yt]], Wc = [[g.xc1 - 6, g.yt], [g.xl + 18, g.yt]], Wd = [[g.xl - 18, g.yt], [g.x0, g.yt], [g.x0, g.yb], c1.n];
      [Wa, Wb, Wc, Wd].forEach(p => Q33.wire(ctx, p, { col: p === Wd ? '#111827' : '#dc2626' }));
      Q33.wire(ctx, [c1.p, c2.n], { col: '#475569' });
      Q33.sw(ctx, g.xs1, g.xs2, g.yb, S.on);
      Q33.bulb(ctx, g.xl, g.yt, M.c && S.on ? (S.m === 'sol' ? .55 : S.m === 'gas' ? .4 : 1) : 0, { label: 'المصباح' });
      // sample between crocodile clips
      const sy = g.yt, a = g.xc1, b = g.xc2;
      if (S.m === 'sol') { // beaker under the clips
        const bx = (a + b) / 2, by = sy + 70, bw = Math.min(150, b - a + 40);
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(56,189,248,.35)'; ctx.fillRect(bx - bw / 2, by - 20, bw, 60); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - bw / 2, by - 50); ctx.lineTo(bx - bw / 2, by + 40); ctx.lineTo(bx + bw / 2, by + 40); ctx.lineTo(bx + bw / 2, by - 50); ctx.stroke();
          ctx.fillStyle = '#475569'; ctx.fillRect(bx - bw / 2 + 16, by - 58, 9, 86); ctx.fillStyle = '#a16207'; ctx.fillRect(bx + bw / 2 - 25, by - 58, 9, 86); });
        Q33.wire(ctx, [[a - 6, sy], [bx - bw / 2 + 20, sy], [bx - bw / 2 + 20, by - 56]], { col: '#dc2626' }); Q33.wire(ctx, [[b + 6, sy], [bx + bw / 2 - 20, sy], [bx + bw / 2 - 20, by - 56]], { col: '#dc2626' });
        for (let k = 0; k < 7; k++) { const u = ((k * .37 + (I ? S.fp / 260 : 0)) % 1 + 1) % 1, yy = by - 8 + (k % 3) * 16, xp = bx - bw / 2 + 32 + (bw - 64) * (1 - u), xn = bx - bw / 2 + 32 + (bw - 64) * u; Q31.sg(ctx, xp, yy, 1, 6); Q31.sg(ctx, xn, yy + 8, -1, 6); }
        Q33.T(ctx, 'الأيونات الموجبة نحو القطب السالب والسالبة نحو الموجب', bx, by + 56, { s: fs - 1, w: 800, c: '#0369a1' });
      } else if (S.m === 'gas') {
        K.raw(ctx, () => { const on = I > 0; const gg = ctx.createLinearGradient(0, sy - 12, 0, sy + 12); gg.addColorStop(0, on ? '#fdf4ff' : '#f8fafc'); gg.addColorStop(.5, on ? '#f0abfc' : '#e2e8f0'); gg.addColorStop(1, on ? '#c026d3' : '#94a3b8'); ctx.fillStyle = gg; if (on) { ctx.shadowColor = '#e879f9'; ctx.shadowBlur = 22; } rr(ctx, a, sy - 12, b - a, 24, 12); ctx.fill(); ctx.shadowBlur = 0; });
        for (let k = 0; k < 5; k++) { const u = ((k * .23 + (I ? S.fp / 300 : 0)) % 1 + 1) % 1; Q31.sg(ctx, a + 12 + (b - a - 24) * (1 - u), sy - 4, 1, 4.5); Q33.elec(ctx, a + 12 + (b - a - 24) * u, sy + 5, 3.6); }
        Q33.T(ctx, 'أنبوب فيه غاز النيون المتأين', (a + b) / 2, sy + 30, { s: fs - 1, w: 800, c: '#a21caf' });
      } else {
        const kind = { cu: 'copper', al: 'pvc', wood: 'amber', plas: 'comb', glass: 'glass', rub: 'rubber' }[S.m];
        if (S.m === 'wood') K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, sy - 10, 0, sy + 10); gg.addColorStop(0, '#d6a46b'); gg.addColorStop(1, '#7c4a1e'); ctx.fillStyle = gg; rr(ctx, a, sy - 10, b - a, 20, 4); ctx.fill(); ctx.strokeStyle = 'rgba(92,51,23,.5)'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(a + 6, sy - 5 + k * 5); ctx.bezierCurveTo(a + (b - a) * .3, sy - 8 + k * 5, a + (b - a) * .6, sy - 2 + k * 5, b - 6, sy - 5 + k * 5); ctx.stroke(); } });
        else Q31.rod(ctx, a, sy, b, sy, 18, kind);
        if (M.c && I) for (let k = 0; k < 6; k++) { const u = ((k / 6 + S.fp / 400) % 1 + 1) % 1; Q33.elec(ctx, a + 8 + (b - a - 16) * u, sy + (k % 2 ? -3 : 3), 3.4); }
        else if (!M.c) for (let k = 0; k < 6; k++) { const xx = a + 12 + (b - a - 24) * k / 5; K.raw(ctx, () => { ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(xx, sy, 6, 0, TAU); ctx.stroke(); }); Q33.elec(ctx, xx + 6, sy, 2.8); }
      }
      // clips
      [a, b].forEach(x => K.raw(ctx, () => { ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.moveTo(x - 9, sy - 9); ctx.lineTo(x + 9, sy - 3); ctx.lineTo(x + 9, sy + 3); ctx.lineTo(x - 9, sy + 9); ctx.closePath(); ctx.fill(); }));
      Q33.T(ctx, M.n + (M.c ? ' — موصل ✔' : ' — عازل ✖'), (a + b) / 2, sy - 42, { s: fs + .5, w: 900, c: '#fff', bg: M.c ? '#15803d' : '#b91c1c' });
      // E field arrow
      if (S.p.E !== false && M.c && S.m !== 'sol' && S.m !== 'gas') { Q33.arrow(ctx, b - 6, sy - 22, a + 6, sy - 22, '#7c3aed', ''); Q33.T(ctx, 'E', (a + b) / 2 + 30, sy - 22, { s: 12, w: 900, c: '#7c3aed' }); }
      // charges on wires
      if (I) [Wa, Wb, Wc, Wd].forEach(p => Q33.flow(ctx, p, S.fp, md));
      if (S.m !== 'sol' && S.m !== 'gas') D.zoom(ctx, S, g, M, I);
      // legend
      const lx = g.ph ? w / 2 : Math.min(w - 170, g.x1 + 160), ly = g.ph ? g.yb + 74 : g.yt + 30;
      if (!g.ph || true) { Q33.T(ctx, md === 'e' ? 'التيار الإلكتروني: من − إلى + خلال الأسلاك' : 'التيار الاصطلاحي: من + إلى − خلال الأسلاك', lx, ly, { s: fs, w: 900, c: '#fff', bg: md === 'e' ? '#1d4ed8' : '#a16207' }); }
      if (!S.on) Q33.T(ctx, 'اضغط على المفتاح لإغلاق الدائرة', (g.xs1 + g.xs2) / 2, g.yb - 40, { s: fs, w: 900, c: '#fff', bg: '#2563eb' });
      Q33.drawChips(ctx, D.chipsM(S, g)); Q33.drawChips(ctx, D.chipsF(S, g));
      Q33.banner(ctx, w, 'اختر مادة وضعها بين الماسكين ثم أغلق المفتاح');
    },
    /* magnified view inside the sample (الشكل 4): fixed + ions, free electrons drift against E */
    zoom(ctx, S, g, M, I) {
      const x0 = g.x0 + (g.ph ? 14 : 60), x1 = g.x1 - (g.ph ? 14 : 60), y0 = g.yt + (g.ph ? 50 : 70), y1 = Math.min(g.yb - 60, y0 + (g.ph ? 120 : 150)); if (y1 - y0 < 70) return;
      K.raw(ctx, () => { ctx.fillStyle = M.c ? 'rgba(254,215,170,.55)' : 'rgba(226,232,240,.7)'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]); rr(ctx, x0, y0, x1 - x0, y1 - y0, 18); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); });
      Q33.T(ctx, '🔍 نظرة مكبرة داخل ' + M.n, x0 + 90, y0 + 14, { s: 10.5, w: 900, c: '#92400e' });
      const nx = Math.max(5, Math.floor((x1 - x0 - 40) / 46)), ny = 2, t = S.t || 0;
      for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) { const xx = x0 + 30 + i * (x1 - x0 - 60) / (nx - 1), yy = y0 + 42 + j * (y1 - y0 - 60) / (ny - 1 || 1);
        K.raw(ctx, () => { ctx.fillStyle = '#e5e7eb'; ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(xx, yy, 10, 0, TAU); ctx.fill(); ctx.stroke(); }); Q33.T(ctx, M.c ? '+' : '', xx, yy, { s: 11, w: 900, c: '#b91c1c' });
        if (!M.c) { const a = t * 3 + i + j; Q33.elec(ctx, xx + Math.cos(a) * 15, yy + Math.sin(a) * 15, 3.4); } }
      if (M.c) { const W = x1 - x0 - 30, n = nx * 2 + 2; for (let k = 0; k < n; k++) { const u = (((k * .618) % 1) + (I ? S.fp / (W * 1.5) : 0)) % 1, j = Math.sin(t * 9 + k * 3) * 3; Q33.elec(ctx, x0 + 15 + W * ((u % 1 + 1) % 1), y0 + 30 + ((k * 37) % Math.max(10, y1 - y0 - 44)) + j, 4); } }
      Q33.arrow(ctx, x1 - 30, y1 - 12, x1 - 110, y1 - 12, '#7c3aed'); Q33.T(ctx, 'E', x1 - 70, y1 - 26, { s: 12, w: 900, c: '#7c3aed' });
      Q33.T(ctx, M.c ? (I ? 'الإلكترونات الحرة تنساب عكس اتجاه المجال E' : 'إلكترونات حرة تتحرك عشوائياً (لا مجال)') : 'الإلكترونات مرتبطة بنواتها بقوى كبيرة جداً: لا تنساب', (x0 + x1) / 2, y1 + 12, { s: 10.5, w: 900, c: '#fff', bg: M.c ? '#1d4ed8' : '#b91c1c' });
    },
    chipsM(S, g) { const ks = Object.keys(MT); return Q33.chips(S, 'mt', ks.map(k => [k, MT[k].n]), g.h - (g.ph ? 84 : 84), S.m, (S2, k) => { S2.m = k; }, { bw: 120, bh: 30 }); },
    chipsF(S, g) { return Q33.chips(S, 'md', [['e', 'التيار الإلكتروني — الشكل 3'], ['c', 'التيار الاصطلاحي — الشكل 5']], g.h - (g.ph ? 122 : 124), S.md, (S2, k) => { S2.md = k; }, { bw: 200, col: '#1d4ed8' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'sw', x: (g.xs1 + g.xs2) / 2, y: g.yb - 8, w: g.xs2 - g.xs1 + 30, h: 46, tip: 'اضغط لفتح/إغلاق المفتاح', idle: 'اضغط ✋', click: S2 => { S2.on = !S2.on; } }].concat(D.chipsM(S, g), D.chipsF(S, g)); },
    readings(S) { const M = MT[S.m], I = D.I(S); return [rd('المادة بين الماسكين', M.n), rd('النوع', M.c ? 'موصل' : 'عازل'), rd('المفتاح', S.on ? 'مغلق' : 'مفتوح'), rd('التيار', Q33.f(I) + ' A')]; },
    explain(S) { const M = MT[S.m], I = D.I(S); return Q26.ex(!S.on ? 'الدائرة مفتوحة فلا يمر تيار.' : M.c ? 'يتوهج المصباح: ' + M.n + ' يسمح بانسياب التيار (' + Q33.f(I) + ' A).' : 'لا يتوهج المصباح: ' + M.n + ' عازل.', S.m === 'sol' || S.m === 'gas' ? 'التيار هنا ناتج عن حركة الأيونات الموجبة والسالبة: الموجبة باتجاه التيار الاصطلاحي والسالبة عكسه (الشكلان 6 و 7)، أما في أسلاك التوصيل فهو حركة إلكترونات فقط.' : M.c ? 'إلكترونات التكافؤ في ' + M.n + ' ضعيفة الارتباط بنواتها فتتحرك بعكس اتجاه المجال E. اتجاه التيار الاصطلاحي مع اتجاه المجال (من + إلى − خلال الأسلاك).' : 'إلكترونات العازل مرتبطة بنواتها بقوى كبيرة جداً فلا تتحرك بتأثير المجال الخارجي (الشكل 2).', 'التيار وسيلة لنقل الطاقة الكهربائية من مصادر توليدها (المولدات، البطاريات، الخلايا الشمسية) إلى الأجهزة: المصباح، الغسالة، الفرن، المحمصة (الشكل 1).'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — مقدار التيار: الشحنات التي تعبر مقطعاً في ثانية (الشكل 8 + المثالان 1 و 2 + س1 المسائل) =============== */
(() => {
  const EX = {
    e1: { t: 'مثال 1 ص 52', I: .02, T: 60, q: 'يمر خلال مقطع عرضي من موصل شحنات مقدارها 1.2 C في كل دقيقة. احسب مقدار التيار.', lines: ['التيار = الشحنة ÷ الزمن ، I = q / t', 't = 1 min = 60 s', 'I = 1.2 C ÷ 60 s', 'I = 0.02 A'] },
    e2a: { t: 'مثال 2 (a)', I: .4, T: 2, q: 'تيار مقداره 0.4 A في موصل. احسب كمية الشحنة التي تعبر مقطعاً منه خلال 2 s.', lines: ['q = I × t', 'q = 0.4 A × 2 s', 'q = 0.8 C'] },
    e2b: { t: 'مثال 2 (b)', I: .4, T: 240, q: 'تيار مقداره 0.4 A في موصل. احسب كمية الشحنة التي تعبر مقطعاً منه خلال 4 minutes.', lines: ['q = I × t', 't = 4 × 60 = 240 s', 'q = 0.4 A × 240 s', 'q = 96 C'] },
    s1: { t: 'س1 مسائل ص78', I: 3, T: 3e-6, q: 'ما مقدار التيار المنساب خلال مقطع عرضي في موصل تعبر خلاله شحنات مقدارها 9 µC في زمن قدره 3 µs؟', lines: ['I = q / t', 'I = 9×10⁻⁶ C ÷ 3×10⁻⁶ s', 'I = 3 A'] }
  };
  const D = { id: 'g9_i_count', page: 51, fig: 'الشكل 8 + المثالان 1 و 2',
    desc: 'لو تصورنا مقطعاً عرضياً لموصل مساحته (A) تعبر منه الشحنات الكهربائية، فإن مقدار الشحنات الكهربائية الكلية التي تعبر هذا المقطع في وحدة الزمن هو مقدار التيار الكهربائي: التيار = كمية الشحنة ÷ الزمن ، I = q / t. ويقاس بالأمبير (A = C/s). الأمبير الواحد يمثل تدفق كولوم واحد من الشحنات في ثانية واحدة. والتيارات صغيرة المقدار تقاس بالملي أمبير (1 mA = 10⁻³ A) والمايكرو أمبير (1 µA = 10⁻⁶ A).',
    tags: 'مقدار التيار الشحنة الزمن I=q/t أمبير كولوم ثانية ملي أمبير مايكرو أمبير مقطع عرضي مثال',
    tools: ['موصل (سلك)', 'ساعة توقيت', 'عداد شحنات'],
    steps: ['اضغط «▶ ابدأ العدّ»: يعدّ العداد الشحنات التي تعبر المقطع الأصفر (A) وتعمل ساعة التوقيت.', 'غيّر مقدار التيار I بالمنزلق: كيف تتغير سرعة عبور الشحنات وكمية الشحنة q؟', 'لاحظ أن q ÷ t يساوي دائماً I.', 'اختر مثالاً من الكتاب واضغط «الخطوة التالية» لترى الحل خطوة بخطوة.'],
    concl: ['التيار الكهربائي = كمية الشحنة ÷ الزمن: I = q / t.', 'الأمبير = كولوم ÷ ثانية (C/s): مرور 2 C في كل ثانية يعني تياراً مقداره 2 A.', 'q = I × t: كلما طال الزمن عبرت شحنة أكبر للتيار نفسه.', '1 mA = 10⁻³ A ، 1 µA = 10⁻⁶ A.'],
    laws: ['g9_I'],
    controls: [R('I', 'مقدار التيار I', .1, 3, 2, .1, 'A')],
    setup(S) { S.run = 0; S.tt = 0; S.ex = ''; S.k = 0; S.fp = 0; },
    update(S, dt) { if (S.run) S.tt += dt; Q33.adv(S, dt, S.run ? S.p.I : 0, 70); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 10 : 30), x1 = ph ? w - 16 : Math.min(w - 390, x0 + 520), cy = ph ? (S.ex ? 175 : 120) : 170; return { w, h, ph, L, x0, x1, cy, R: ph ? 34 : 46 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, I = S.p.I, q = I * S.tt, mx = (g.x0 + g.x1) / 2, R = g.R;
      Q33.bg(ctx, w, h);
      // conductor (cylinder seen slightly from the side)
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.cy - R, 0, g.cy + R); gg.addColorStop(0, '#fde68a'); gg.addColorStop(.5, '#f59e0b'); gg.addColorStop(1, '#b45309'); ctx.fillStyle = gg; ctx.fillRect(g.x0, g.cy - R, g.x1 - g.x0, 2 * R);
        ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.ellipse(g.x0, g.cy, R * .35, R, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#fcd34d'; ctx.beginPath(); ctx.ellipse(g.x1, g.cy, R * .35, R, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = 'rgba(250,204,21,.55)'; ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(mx, g.cy, R * .35, R, 0, 0, TAU); ctx.fill(); ctx.stroke(); });
      Q33.T(ctx, 'المقطع العرضي A', mx, g.cy - R - 14, { s: fs + 1, w: 900, c: '#a16207' });
      // charges moving (conventional)
      const sp = 34, len = g.x1 - g.x0, off = ((S.fp % sp) + sp) % sp;
      for (let r = -1; r <= 1; r++) for (let d = off + r * 9; d < len; d += sp) if (d > 6) { const x = g.x0 + d, y = g.cy + r * R * .55; Q31.sg(ctx, x, y, 1, 6.5); }
      Q33.arrow(ctx, g.x0 + 20, g.cy - R - 30, g.x0 + 110, g.cy - R - 30, '#dc2626', 'I'); 
      // counter + stopwatch
      const by = g.cy + R + (g.ph ? 92 : 110), bx = g.ph ? w / 2 : mx;
      Q33.T(ctx, '⏱ t = ' + (S.tt < 100 ? S.tt.toFixed(2) : S.tt.toFixed(0)) + ' s', bx - (g.ph ? 90 : 130), by, { s: 15, w: 900, c: '#fff', bg: '#1e293b' });
      Q33.T(ctx, 'q = ' + Q33.f(q, 2) + ' C', bx + (g.ph ? 70 : 110), by, { s: 15, w: 900, c: '#fff', bg: '#b91c1c' });
      Q33.T(ctx, 'q ÷ t = ' + (S.tt > .05 ? Q33.f(q / S.tt, 2) : '—') + ' A = I', bx, by + 36, { s: 13, w: 900, c: '#0f172a', bg: '#fde047' });
      Q33.T(ctx, I + ' A = ' + Q33.f(I * 1000, 0) + ' mA = ' + Q33.sci(I * 1e6, 3) + ' µA', bx, by + 68, { s: 11.5, w: 800, c: '#334155' });
      Q33.drawChips(ctx, D.chipsR(S, g)); const C = D.chipsE(S, g); Q33.drawChips(ctx, C);
      if (S.ex) { const E = EX[S.ex]; Q33.steps(ctx, S, { title: E.t, q: E.q, lines: E.lines, k: S.k }); }
      Q33.banner(ctx, w, 'اضغط «ابدأ العدّ» وغيّر التيار I، أو اختر مثالاً');
    },
    chipsR(S, g) { const y = g.cy + g.R + (g.ph ? 50 : 60); return Q33.chips(S, 'run', [['go', S.run ? '⏸ إيقاف' : '▶ ابدأ العدّ'], ['rs', '↺ تصفير']], y, S.run ? 'go' : '', (S2, k) => { if (k === 'go') S2.run = !S2.run; else { S2.run = 0; S2.tt = 0; } }, { bw: 130, bh: 30, x0: g.ph ? 12 : (g.x0 + g.x1) / 2 - 133, col: '#15803d' }); },
    chipsE(S, g) { return Q33.chips(S, 'ex', Object.keys(EX).map(k => [k, EX[k].t]).concat([['nx', '⬇ الخطوة التالية']]), g.h - 84, S.ex, (S2, k) => { if (k === 'nx') { if (!S2.ex) S2.ex = 'e1'; else S2.k = Math.min(S2.k + 1, EX[S2.ex].lines.length); return; } S2.ex = k; S2.k = 0; setParam(S2, 'I', clamp(EX[k].I, .1, 3)); S2.tt = 0; S2.run = 0; }, { bw: 140 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return D.chipsR(S, g).concat(D.chipsE(S, g)); },
    readings(S) { const I = S.p.I; return [rd('التيار I', I + ' A'), rd('الزمن t', S.tt.toFixed(2) + ' s'), rd('الشحنة q = I × t', Q33.f(I * S.tt) + ' C'), rd('بالملي أمبير', Q33.f(I * 1000, 0) + ' mA')]; },
    record(S) { return { I: S.p.I, t: +S.tt.toFixed(2), q: +(S.p.I * S.tt).toFixed(2) }; },
    cols: [['I', 'I (A)'], ['t', 't (s)'], ['q', 'q (C)']],
    graph: { x: 't', y: 'q', xl: 'الزمن t (s)', yl: 'الشحنة q (C)' },
    explain(S) { const I = S.p.I; return Q26.ex('في كل ثانية تعبر المقطع A شحنة مقدارها ' + I + ' C، لذلك التيار ' + I + ' A.', 'التيار = كمية الشحنة ÷ الزمن (I = q / t). الأمبير الواحد يمثل تدفق كولوم واحد من الشحنات في ثانية واحدة، فإذا قلنا إن تياراً مقداره 2 A ينساب في سلك فهذا يعني أن شحنة 2 C تعبر مقطعاً منه في الثانية.', 'تيار المصباح المنزلي نحو 0.5 A، وتيار الساعة الرقمية بضعة مايكرو أمبير.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A3 — التيار المستمر والمتناوب (هل تعلم ص 53) =============== */
(() => {
  const SRC = { dc: { n: 'بطارية: تيار مستمر ثابت', c: '#15803d' }, pdc: { n: 'مولد بسيط: مستمر متغير المقدار', c: '#ca8a04' }, ac: { n: 'تيار متناوب AC', c: '#7c3aed' } };
  const D = { id: 'g9_i_dcac', page: 53, fig: 'هل تعلم ص 53',
    desc: 'إذا كان التيار الكهربائي المنساب خلال موصل ما ثابتاً في الاتجاه مع مرور الزمن يسمى التيار المستمر (Direct current) ويرمز له (DC). مصادره: مولدات التيار المستمر والأعمدة الكيميائية (البطاريات). التيار الخارج من البطارية مستمر وثابت المقدار والاتجاه، والخارج من المولد البسيط مستمر ثابت الاتجاه متغير المقدار، أما التيار المتغير المقدار والاتجاه مع مرور الزمن فيسمى التيار المتناوب (AC).',
    tags: 'تيار مستمر DC تيار متناوب AC مولد بطارية هل تعلم رسم بياني التيار مع الزمن',
    tools: ['بطارية', 'مولد بسيط', 'مصدر متناوب', 'مصباح', 'أميتر ذو صفر في المنتصف'],
    steps: ['اختر مصدر التيار من الأسفل، ولاحظ مؤشر الأميتر والسهم على السلك والرسم البياني.', 'البطارية: السهم ثابت الاتجاه والمقدار (خط أفقي).', 'المولد البسيط: الاتجاه ثابت لكن المقدار يتغير (أقواس فوق المحور).', 'المتناوب: المقدار والاتجاه يتغيران (أقواس فوق المحور وتحته).'],
    concl: ['التيار المستمر DC: ثابت الاتجاه مع مرور الزمن، ومصادره المولدات المستمرة والبطاريات.', 'التيار الخارج من البطارية مستمر وثابت المقدار والاتجاه (يعد مثالياً).', 'التيار الخارج من المولد البسيط مستمر وثابت الاتجاه ومتغير المقدار.', 'التيار المتغير المقدار والاتجاه مع الزمن يسمى التيار المتناوب AC.'],
    laws: ['g9_I'],
    controls: [R('f', 'سرعة التغير (التردد)', .2, 2, .6, .1, 'Hz')],
    setup(S) { S.m = 'dc'; S.tt = 0; S.hist = []; S.fp = 0; },
    I(S, t) { const w = TAU * S.p.f * t; return S.m === 'dc' ? 1 : S.m === 'pdc' ? Math.abs(Math.sin(w)) : Math.sin(w); },
    update(S, dt) { S.tt += dt; const I = D.I(S, S.tt); S.hist.push(I); if (S.hist.length > 360) S.hist.shift(); Q33.adv(S, dt, I, 120); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 14 : Math.min(w * .5, x0 + 400), yt = ph ? 150 : 170, yb = ph ? 300 : 360; return { w, h, ph, L, x0, x1, yt, yb, gx: ph ? 30 : x1 + 50, gy: ph ? 380 : 150, gw: ph ? w - 50 : Math.min(420, w - x1 - 80), gh: ph ? 150 : 220 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, I = D.I(S, S.tt), Sr = SRC[S.m], cx = (g.x0 + g.x1) / 2;
      Q33.bg(ctx, w, h); Q33.board(ctx, g.x0 - 12, g.yt - 80, g.x1 - g.x0 + 24, g.yb - g.yt + 120);
      // source at bottom
      let P, N;
      if (S.m === 'dc') { const t = Q33.bat(ctx, cx, g.yb + 4, { V: 6, w: 76, h: 50 }); P = t.p; N = t.n; }
      else { // generator / AC box with a rotating coil
        K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, cx - 50, g.yb - 22, 100, 52, 8); ctx.fill(); ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(cx, g.yb + 4, 26 * Math.abs(Math.cos(TAU * S.p.f * S.tt / 2)) + 2, 18, 0, 0, TAU); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.fillRect(cx - 48, g.yb - 10, 12, 30); ctx.fillStyle = '#2563eb'; ctx.fillRect(cx + 36, g.yb - 10, 12, 30); });
        Q33.T(ctx, S.m === 'ac' ? 'مولد متناوب' : 'مولد بسيط', cx, g.yb + 42, { s: fs, w: 900, c: '#334155' }); P = [cx + 30, g.yb - 22]; N = [cx - 30, g.yb - 22]; }
      const lb = Q33.bulb(ctx, cx, g.yt, Math.abs(I), { label: '' });
      const mtr = [g.x1 - 54, (g.yt + g.yb) / 2 - 10];
      const Wa = [P, [P[0], g.yb - 40], [g.x1, g.yb - 40], [g.x1, g.yt], lb.b], Wb = [lb.a, [g.x0, g.yt], [g.x0, g.yb - 40], [N[0], g.yb - 40], N];
      Q33.wire(ctx, Wa, { col: '#dc2626' }); Q33.wire(ctx, Wb, { col: '#111827' });
      Q33.flow(ctx, Wa, S.fp, 'c'); Q33.flow(ctx, Wb, S.fp, 'c');
      // centre-zero meter
      Q33.meter(ctx, mtr[0], mtr[1], 'A', I, 1.1, { txt: (I >= 0 ? '' : '−') + Q33.f(Math.abs(I), 2) + ' A', name: 'أميتر صفره في المنتصف', w: 86, h: 66 });
      // graph
      const X0 = g.gx, Y0 = g.gy + g.gh / 2, GW = g.gw, GH = g.gh / 2 - 14;
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, X0 - 14, g.gy - 24, GW + 34, g.gh + 50, 10); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X0, g.gy); ctx.lineTo(X0, g.gy + g.gh); ctx.moveTo(X0, Y0); ctx.lineTo(X0 + GW, Y0); ctx.stroke();
        ctx.strokeStyle = Sr.c; ctx.lineWidth = 2.6; ctx.beginPath(); const H = S.hist, n = H.length; for (let i = 0; i < n; i++) { const x = X0 + GW - (n - 1 - i) * GW / 360, y = Y0 - H[i] * GH; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.fillStyle = Sr.c; ctx.beginPath(); ctx.arc(X0 + GW, Y0 - I * GH, 5, 0, TAU); ctx.fill(); });
      Q33.T(ctx, 'التيار', X0 + 24, g.gy - 10, { s: 10.5, w: 900, c: '#0f172a' }); Q33.T(ctx, 'الزمن', X0 + GW - 14, Y0 + 14, { s: 10.5, w: 900, c: '#0f172a' });
      Q33.T(ctx, Sr.n, X0 + GW / 2, g.gy + g.gh + 14, { s: fs + .5, w: 900, c: '#fff', bg: Sr.c });
      Q33.drawChips(ctx, D.chips(S, g));
      Q33.banner(ctx, w, 'اختر مصدر التيار وقارن الرسوم البيانية');
    },
    chips(S, g) { return Q33.chips(S, 'src', Object.keys(SRC).map(k => [k, SRC[k].n]), g.h - 84, S.m, (S2, k) => { S2.m = k; S2.hist = []; }, { bw: 220 }); },
    drags(S) { if (!S.W) return []; return D.chips(S, D.geo(S)); },
    readings(S) { const I = D.I(S, S.tt); return [rd('المصدر', SRC[S.m].n), rd('التيار الآن (نسبي)', Q33.f(I, 2)), rd('الاتجاه', I > .01 ? 'موجب' : I < -.01 ? 'معاكس' : 'صفر')]; },
    explain(S) { return Q26.ex(S.m === 'dc' ? 'السهم على السلك ثابت والرسم خط أفقي.' : S.m === 'pdc' ? 'التيار يكبر ويصغر لكن اتجاهه لا ينعكس: أقواس فوق المحور فقط.' : 'التيار يكبر ويصغر وينعكس اتجاهه: أقواس فوق المحور وتحته، ومؤشر الأميتر يتأرجح يميناً ويساراً.', 'التيار المستمر ثابت الاتجاه مع مرور الزمن، والمتناوب متغير المقدار والاتجاه (هل تعلم ص 53).', 'البطاريات في الهاتف والمصباح اليدوي تجهز تياراً مستمراً، والكهرباء الوطنية في البيوت تيار متناوب.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — الدائرة الكهربائية البسيطة: مفتوحة ومغلقة (3-3، الأشكال 9 و 10 و 11) =============== */
(() => {
  const RL = 18, V = 9; // lamp resistance, battery volts
  const D = { id: 'g9_c_open', page: 54, fig: 'الأشكال 9 و 10 و 11',
    desc: 'المسار المغلق الذي تتحرك خلاله الإلكترونات يدعى بالدائرة الكهربائية. والدائرة الكهربائية البسيطة تتألف من مصباح كهربائي (الحمل)، أسلاك توصيل، مفتاح، بطارية فولطيتها مناسبة. في الحالة التي يكون فيها مفتاح الدائرة مفتوحاً لا نلاحظ توهج المصباح، وهذا يعني وجود قطع في الدائرة فتدعى الدائرة الكهربائية المفتوحة. وعند إغلاق مفتاح هذه الدائرة فإن الإلكترونات ستتحرك وتنساب خلال أسلاك التوصيل وخلال المصباح فيتوهج، وتدعى الدائرة الكهربائية المغلقة.',
    tags: 'الدائرة الكهربائية البسيطة مفتوحة مغلقة حمل مصباح مفتاح بطارية أسلاك توصيل قطع رسم تخطيطي رموز',
    tools: ['بطارية 9 V', 'مصباح كهربائي (الحمل)', 'مفتاح', 'أسلاك توصيل'],
    steps: ['اضغط على المفتاح لإغلاق الدائرة: يتوهج المصباح وتتحرك الشحنات (الشكل 11).', 'افتح المفتاح: ينطفئ المصباح لأن الدائرة مفتوحة (الشكل 10).', 'اسحب الماسك الأخضر لفصل السلك عن المصباح: هذا قطع آخر في الدائرة. أعده إلى برغي المصباح.', 'قارن الدائرة الحقيقية بالمخطط الكهربائي المرسوم بالرموز إلى جانبها.'],
    concl: ['الدائرة الكهربائية: المسار المغلق الذي تتحرك خلاله الإلكترونات.', 'الدائرة البسيطة: مصباح (حمل) + أسلاك توصيل + مفتاح + بطارية.', 'الدائرة المفتوحة: فيها قطع، فلا يمر تيار ولا يتوهج المصباح.', 'الدائرة المغلقة: لا قطع فيها، فتنساب الشحنات ويتوهج المصباح.'],
    laws: ['g9_I'],
    controls: [TG('sch', 'المخطط الكهربائي بالرموز', true, null, 'diagram')],
    setup(S) { S.on = 0; S.att = 1; S.cp = null; S.fp = 0; },
    closed(S) { return S.on && S.att; },
    I(S) { return D.closed(S) ? V / RL : 0; },
    update(S, dt) { Q33.adv(S, dt, D.I(S), 160); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), sch = S.p.sch !== false && !ph, x0 = L + (ph ? 6 : 24), x1 = ph ? w - 14 : sch ? Math.min(w * .58, x0 + 460) : Math.min(w - 30, x0 + 560), yt = ph ? 150 : 200, yb = ph ? Math.min(h - 140, 330) : Math.min(h - 190, 520); return { w, h, ph, L, sch, x0, x1, yt, yb, xl: (x0 + x1) / 2, xs1: x0 + (x1 - x0) * .62, xs2: x0 + (x1 - x0) * .78, bx: x0 + (x1 - x0) * .3 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, I = D.I(S), cl = D.closed(S);
      Q33.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.yt - 86, g.x1 - g.x0 + 28, g.yb - g.yt + 150);
      const bt = Q33.bat(ctx, g.bx, g.yb + 26, { V, label: 'بطارية' });
      const lb = Q33.bulb(ctx, g.xl, g.yt, cl ? 1 : 0, { label: 'الحمل: مصباح' });
      const sw = Q33.sw(ctx, g.xs1, g.xs2, g.yb, S.on);
      const clip = S.att ? lb.b : (S.cp || [lb.b[0] + 40, lb.b[1] + 50]);
      const Wa = [bt.p, [bt.p[0], g.yb], [g.xs1, g.yb]], Wb = [[g.xs2, g.yb], [g.x1, g.yb], [g.x1, g.yt], [lb.b[0] + 40, g.yt], clip], Wc = [lb.a, [g.x0, g.yt], [g.x0, g.yb], [bt.n[0], g.yb], bt.n];
      Q33.wire(ctx, Wa, { col: '#dc2626' }); Q33.wire(ctx, Wb, { col: '#16a34a' }); Q33.wire(ctx, Wc, { col: '#111827' });
      K.raw(ctx, () => { ctx.fillStyle = '#16a34a'; ctx.strokeStyle = '#14532d'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(clip[0], clip[1], 8, 0, TAU); ctx.fill(); ctx.stroke(); });
      if (!S.att) Q33.T(ctx, '✂ قطع في الدائرة!', clip[0] + 10, clip[1] + 24, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' });
      if (I) { Q33.flow(ctx, Wa, S.fp, 'c'); Q33.flow(ctx, Wb, S.fp, 'c'); Q33.flow(ctx, Wc, S.fp, 'c'); }
      Q33.T(ctx, cl ? 'دائرة كهربائية مغلقة: المصباح يتوهج' : 'دائرة كهربائية مفتوحة: لا يمر تيار', (g.x0 + g.x1) / 2, g.yt - 70, { s: fs + 1.5, w: 900, c: '#fff', bg: cl ? '#15803d' : '#b91c1c' });
      if (!S.on) Q33.T(ctx, 'اضغط المفتاح', (g.xs1 + g.xs2) / 2, g.yb - 44, { s: fs, w: 900, c: '#fff', bg: '#2563eb' });
      // schematic side by side
      if (g.sch) { const X0 = g.x1 + 50, X1 = Math.min(w - 50, X0 + 280), Y0 = g.yt + 10, Y1 = Math.min(g.yb - 20, Y0 + 220), mx = (X0 + X1) / 2;
        K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, X0 - 24, Y0 - 50, X1 - X0 + 48, Y1 - Y0 + 100, 12); ctx.fill(); ctx.stroke(); });
        Q33.T(ctx, 'المخطط الكهربائي بالرموز', mx, Y0 - 38, { s: fs + .5, w: 900, c: '#0f172a' });
        Q33.sym.path(ctx, [[X0 + 50, Y1], [X0, Y1], [X0, Y0], [X1, Y0], [X1, Y1], [mx + 40, Y1]]); Q33.sym.line(ctx, [mx + 15, Y1], [X0 + 70, Y1]);
        Q33.sym.cell(ctx, X0 + 60, Y1, false, 'البطارية'); Q33.sym.sw(ctx, mx + 28, Y1, S.on); Q33.T(ctx, 'المفتاح', mx + 28, Y1 + 20, { s: 10, w: 800, c: '#0f172a' }); Q33.sym.lamp(ctx, mx, Y0, cl ? 1 : 0, ''); Q33.T(ctx, 'المصباح', mx + 40, Y0 - 14, { s: 10, w: 800, c: '#0f172a' });
        if (!S.att) { K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.fillRect(X1 - 6, Y0 + 30, 12, 24); }); Q33.T(ctx, '✂', X1 + 12, Y0 + 42, { s: 13, w: 900, c: '#b91c1c' }); }
        if (I) { Q33.arrow(ctx, X1 + 14, Y1 - 30, X1 + 14, Y0 + 70, '#dc2626'); Q33.T(ctx, 'I', X1 + 26, (Y0 + Y1) / 2, { s: 12, w: 900, c: '#dc2626' }); }
        Q33.T(ctx, 'الرموز تختصر رسم الدائرة', mx, Y1 + 34, { s: 10.5, w: 800, c: '#475569' }); }
      Q33.banner(ctx, w, 'اضغط المفتاح، واسحب الماسك الأخضر لفصل السلك');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), lbB = [g.xl + 18, g.yt], clip = S.att ? lbB : (S.cp || [lbB[0] + 40, lbB[1] + 50]);
      return [{ id: 'sw', x: (g.xs1 + g.xs2) / 2, y: g.yb - 8, w: g.xs2 - g.xs1 + 30, h: 46, tip: 'اضغط لفتح/إغلاق المفتاح', idle: 'اضغط ✋', click: S2 => { S2.on = !S2.on; } },
        { id: 'clip', x: clip[0], y: clip[1], r: 20, axis: 'xy', keep: true, tip: 'اسحب الماسك لفصل السلك أو إعادته', idle: 'اسحب الماسك ✋', drag: (S2, d) => { S2.att = 0; S2.cp = [clamp(d.x, g.x0, g.x1), clamp(d.y, g.yt - 60, g.yb)]; }, up: S2 => { if (S2.cp && Math.hypot(S2.cp[0] - lbB[0], S2.cp[1] - lbB[1]) < 26) { S2.att = 1; S2.cp = null; } } }]; },
    readings(S) { const I = D.I(S); return [rd('المفتاح', S.on ? 'مغلق' : 'مفتوح'), rd('السلك', S.att ? 'متصل' : 'مفصول'), rd('نوع الدائرة', D.closed(S) ? 'مغلقة' : 'مفتوحة'), rd('التيار', Q33.f(I) + ' A')]; },
    explain(S) { const cl = D.closed(S); return Q26.ex(cl ? 'المصباح يتوهج والشحنات تتحرك في كل أجزاء الدائرة.' : 'المصباح لا يتوهج: ' + (!S.on ? 'المفتاح مفتوح.' : 'السلك مفصول عن المصباح.'), cl ? 'الدائرة مغلقة: مسار متصل من القطب الموجب للبطارية عبر المفتاح والمصباح إلى القطب السالب، فتنساب الشحنات (الشكل 11).' : 'وجود قطع في أي مكان في المسار يجعل الدائرة مفتوحة، فيتوقف انسياب الشحنات في كل الدائرة (الشكل 10).', 'مفتاح الإنارة في البيت يفتح الدائرة ويغلقها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — نشاط قياس التيار باستعمال الأميتر + شروط ربطه (4-3، الأشكال 12 و 13 و 14) =============== */
(() => {
  const V = 6, RL = 4, RMAX = 20, IMAX = 1.5;
  const WAYS = { ok: 'الربط الصحيح: على التوالي', par: 'خطأ: الأميتر على التوازي', rev: 'خطأ: عكس أقطاب الأميتر' };
  const D = { id: 'g9_c_ammeter', page: 56, fig: 'الأشكال 12 و 13 و 14',
    desc: 'يستعمل جهاز الأميتر لقياس مقدار التيار الكهربائي المنساب في الدائرة الكهربائية. عند استعماله: 1) يربط على التوالي مع الحمل (لكي تنساب خلاله جميع الشحنات). 2) تكون مقاومته صغيرة جداً. 3) يربط طرفه الموجب (الأحمر) مع القطب الموجب للبطارية وطرفه السالب مع القطب السالب. نشاط: نربط الأميتر والمصباح والبطارية والمفتاح والريوستات على التوالي، نغلق المفتاح، ثم نغير مقاومة الريوستات فنحصل على قراءات جديدة للأميتر.',
    tags: 'نشاط قياس التيار أميتر ريوستات مقاومة متغيرة ربط على التوالي أقطاب ملي أميتر قراءة',
    tools: ['جهاز أميتر', 'أسلاك توصيل', 'مصباح كهربائي', 'بطارية فولطيتها مناسبة', 'مقاومة متغيرة (ريوستات)', 'مفتاح كهربائي'],
    steps: ['أغلق المفتاح (اضغط عليه): يتوهج المصباح وينحرف مؤشر الأميتر. ما الذي تمثله القراءة؟ وما وحداتها؟', 'اسحب منزلق الريوستات الأزرق: تتغير قراءة الأميتر ودرجة توهج المصباح.', 'سجّل كل قراءة في الجدول (زر «سجّل القراءة»).', 'جرّب الربط الخاطئ: الأميتر على التوازي، أو عكس أقطابه، ولاحظ ماذا يحدث.'],
    concl: ['قراءة الأميتر تتغير بتغير مقدار التيار المنساب في الدائرة، فهي تشير دائماً إلى مقدار التيار المنساب في الدائرة.', 'يربط الأميتر على التوالي مع الحمل، ومقاومته صغيرة جداً.', 'يربط طرفه الموجب (الأحمر) مع القطب الموجب للبطارية وطرفه السالب (الأسود) مع القطب السالب.', 'زيادة مقاومة الريوستات تقلل التيار فيقل توهج المصباح.'],
    laws: ['g9_I', 'g9_ohm'],
    controls: [],
    setup(S) { S.on = 0; S.f = .5; S.way = 'ok'; S.fp = 0; },
    Rr(S) { return RMAX * (1 - S.f); },
    st(S) { if (!S.on) return { I: 0, Ib: 0, A: 0 }; const Rr = D.Rr(S); if (S.way === 'par') { const I = V / (Rr + .2); return { I, Ib: 0, A: I }; } const I = V / (RL + Rr); return { I, Ib: I, A: S.way === 'rev' ? -I : I }; },
    update(S, dt) { Q33.adv(S, dt, D.st(S).I, 140); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 14 : Math.min(w - 300, x0 + 620), yt = ph ? 150 : 200, yb = ph ? Math.min(h - 140, 330) : Math.min(h - 200, 520); const W = x1 - x0; return { w, h, ph, L, x0, x1, yt, yb, xl: x0 + W * .2, r1: x0 + W * .5, r2: x0 + W * .86, bx: x0 + W * .2, ax: x0 + W * .52, xs1: x0 + W * .72, xs2: x0 + W * .86 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, T = D.st(S), Rr = D.Rr(S);
      Q33.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.yt - 96, g.x1 - g.x0 + 28, g.yb - g.yt + 150);
      const bt = Q33.bat(ctx, g.bx, g.yb + 26, { V, w: 74, h: 54 });
      const lb = Q33.bulb(ctx, g.xl, g.yt, T.Ib / (V / RL) * 1.3, { label: '' });
      const rh = Q33.rheo(ctx, g.r1, g.r2, g.yt + 34, S.f, { label: 'الريوستات: ' + Q33.f(Rr, 1) + ' Ω' });
      const sw = Q33.sw(ctx, g.xs1, g.xs2, g.yb, S.on);
      const par = S.way === 'par', my = par ? g.yt + 120 : g.yb - 36;
      const am = Q33.meter(ctx, par ? g.xl : g.ax, my, 'A', T.A, IMAX, { flip: S.way !== 'rev', name: 'الأميتر', d: 2 });
      // wiring
      const W = [];
      if (!par) { W.push([bt.p, [bt.p[0], g.yb], [am.p[0] - 0, g.yb], am.p], [am.n, [am.n[0], g.yb], [g.xs1, g.yb]]); }
      else { W.push([bt.p, [bt.p[0], g.yb], [g.xs1, g.yb]]); W.push([[lb.a[0], g.yt], [lb.a[0], g.yt + 14], [am.p[0], g.yt + 14], am.p], [[lb.b[0], g.yt], [lb.b[0], g.yt + 18], [am.n[0], g.yt + 18], am.n]); }
      W.push([[g.xs2, g.yb], [g.x1, g.yb], [g.x1, g.yt + 44], rh.b]);
      W.push([rh.a, [rh.a[0], g.yt], lb.b]);
      W.push([lb.a, [g.x0, g.yt], [g.x0, g.yb], [bt.n[0], g.yb], bt.n]);
      W.forEach((p, i) => Q33.wire(ctx, p, { col: i === W.length - 1 ? '#111827' : '#dc2626' }));
      if (T.I) W.forEach((p, i) => { if (par && (i === 1 || i === 2)) { if (i === 1) Q33.flow(ctx, p, S.fp, 'c'); else Q33.flow(ctx, [...p].reverse(), S.fp, 'c'); } else Q33.flow(ctx, p, S.fp, 'c'); });
      const big = Math.abs(T.A) > IMAX * 1.05;
      if (par && S.on) Q33.T(ctx, '⚠ تيار كبير جداً يمر في الأميتر والمصباح لا يتوهج: قد يتلف الأميتر!', (g.x0 + g.x1) / 2, g.yt - 70, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' });
      else if (S.way === 'rev' && S.on) Q33.T(ctx, '⚠ المؤشر انحرف إلى الجهة المعاكسة: اعكس أقطاب الأميتر', (g.x0 + g.x1) / 2, g.yt - 70, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' });
      else if (S.on) Q33.T(ctx, 'قراءة الأميتر = ' + Q33.f(T.A) + ' A ، المصباح ' + Q33.glow(T.Ib / (V / RL) * 1.3), (g.x0 + g.x1) / 2, g.yt - 70, { s: fs + 1, w: 900, c: '#fff', bg: '#15803d' });
      if (!S.on) Q33.T(ctx, 'اضغط المفتاح', (g.xs1 + g.xs2) / 2, g.yb - 44, { s: fs, w: 900, c: '#fff', bg: '#2563eb' });
      void big;
      // side card: rules of the ammeter (fig 13)
      if (!g.ph) Q33.card(ctx, S, [{ t: '• يربط على التوالي مع الحمل', c: S.way === 'par' ? '#b91c1c' : '#15803d', w: 900 }, { t: '• مقاومته صغيرة جداً', c: '#334155' }, { t: '• الطرف الأحمر + نحو القطب الموجب للبطارية', c: S.way === 'rev' ? '#b91c1c' : '#15803d', w: 900 }, { t: '• التيارات الصغيرة تقاس بالملي أميتر mA', c: '#475569' }], { title: 'شروط ربط الأميتر — الشكل 13', wd: 270, y: 70 });
      const C = D.chips(S, g); Q33.drawChips(ctx, C);
      const rb = Q33.btn('rec', { x: g.ph ? w - 90 : w - 100, y: g.ph ? 40 : h - 130, w: 160, h: 32 }, () => { }); Q33.drawBtn(ctx, rb, '📋 سجّل القراءة', '#15803d');
      Q33.banner(ctx, w, 'أغلق المفتاح ثم اسحب منزلق الريوستات');
    },
    chips(S, g) { return Q33.chips(S, 'way', Object.keys(WAYS).map(k => [k, WAYS[k]]), g.h - 84, S.way, (S2, k) => { S2.way = k; }, { bw: 220 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), sx = g.r1 + (g.r2 - g.r1) * S.f;
      return [{ id: 'sw', x: (g.xs1 + g.xs2) / 2, y: g.yb - 8, w: g.xs2 - g.xs1 + 30, h: 46, tip: 'اضغط لفتح/إغلاق المفتاح', idle: 'اضغط ✋', click: S2 => { S2.on = !S2.on; } },
        { id: 'slider', x: sx, y: g.yt + 34 - 25, w: 34, h: 44, axis: 'x', keep: true, tip: 'اسحب المنزلق لتغيير المقاومة', idle: 'اسحب المنزلق ✋', drag: (S2, d) => { S2.f = clamp((d.x - g.r1) / (g.r2 - g.r1), 0, 1); } }]
        .concat(D.chips(S, g), [Q33.btn('rec', { x: g.ph ? g.w - 90 : g.w - 100, y: g.ph ? 40 : g.h - 130, w: 160, h: 32 }, () => { const b = document.getElementById('recBtn'); b && b.click(); }, { tip: 'سجّل القراءة في الجدول' })]); },
    readings(S) { const T = D.st(S); return [rd('مقاومة الريوستات', Q33.f(D.Rr(S), 1) + ' Ω'), rd('قراءة الأميتر', Q33.f(T.A) + ' A'), rd('بالملي أمبير', Q33.f(T.A * 1000, 0) + ' mA'), rd('توهج المصباح', Q33.glow(T.Ib / (V / RL) * 1.3))]; },
    record(S) { const T = D.st(S); return { R: +D.Rr(S).toFixed(1), I: +T.A.toFixed(3), b: Q33.glow(T.Ib / (V / RL) * 1.3) }; },
    cols: [['R', 'الريوستات (Ω)'], ['I', 'قراءة الأميتر (A)'], ['b', 'توهج المصباح']],
    graph: { x: 'R', y: 'I', xl: 'مقاومة الريوستات (Ω)', yl: 'التيار (A)' },
    explain(S) { const T = D.st(S); if (!S.on) return Q26.ex('المفتاح مفتوح: مؤشر الأميتر على الصفر.', 'لا يمر تيار في دائرة مفتوحة.', ''); if (S.way === 'par') return Q26.ex('المصباح انطفأ وقراءة الأميتر كبيرة جداً.', 'مقاومة الأميتر صغيرة جداً، فإذا رُبط على التوازي مع المصباح يمر فيه معظم التيار (كأنه سلك يقصر المصباح) وقد يتلف. لذلك يربط على التوالي.', ''); if (S.way === 'rev') return Q26.ex('انحرف المؤشر إلى الجهة المعاكسة للصفر.', 'يجب أن يربط الطرف الموجب (الأحمر) للأميتر مع القطب الموجب للبطارية والسالب مع السالب.', ''); return Q26.ex('قراءة الأميتر ' + Q33.f(T.A) + ' A عندما مقاومة الريوستات ' + Q33.f(D.Rr(S), 1) + ' Ω.', 'كلما زادت مقاومة الريوستات قلّ التيار المنساب في الدائرة فقلت قراءة الأميتر وقلّ توهج المصباح. قراءة الأميتر تشير دائماً إلى مقدار التيار المنساب في الدائرة.', 'الريوستات يستعمل في التحكم بشدة الإضاءة وسرعة المروحة وصوت المذياع.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — فرق الجهد: تشبيه مائي (5-3، الشكل 15) =============== */
(() => {
  const D = { id: 'g9_v_water', page: 57, fig: 'الشكل 15',
    desc: 'مقدار فرق الجهد بين نقطتين داخل المجال الكهربائي يحدد مقدار التيار المنساب بينهما، فيكون اتجاه انسياب التيار من النقطة ذات الجهد الكهربائي الأعلى إلى النقطة ذات الجهد الكهربائي الأوطأ، وعند تساوي مقدار جهدي النقطتين يتوقف سريان التيار الكهربائي. ووحدة قياس فرق الجهد هي الفولط (volt) ويقاس عملياً باستعمال جهاز الفولطميتر. الشكل 15 يشبه ذلك بالماء: الماء ينساب من الخزان العالي (طاقة كامنة عالية) إلى الواطئ، والمضخة (البطارية) تعيد رفعه.',
    tags: 'فرق الجهد الكهربائي فولط تشبيه مائي خزان مضخة جهد عالي جهد واطئ طاقة كامنة الشكل 15',
    tools: ['خزانان للماء', 'مضخة', 'عجلة مائية', 'بطارية', 'مصباح'],
    steps: ['شغّل المضخة: ترفع الماء إلى الخزان العالي فينساب الماء من الأعلى إلى الأوطأ ويدير العجلة.', 'غيّر فرق الارتفاع بالمنزلق: كلما زاد فرق الارتفاع زاد انسياب الماء، وكلما زاد فرق الجهد زاد التيار وتوهج المصباح.', 'أطفئ المضخة (اضغط عليها): يتساوى مستوى الماء فيتوقف الانسياب، وكذلك يتوقف التيار عند تساوي الجهدين.', 'قارن الجانبين: المضخة ⟵ البطارية، الماء ⟵ الشحنات، العجلة ⟵ المصباح.'],
    concl: ['يحدد فرق الجهد بين نقطتين مقدار التيار المنساب بينهما.', 'ينساب التيار من النقطة ذات الجهد الأعلى إلى النقطة ذات الجهد الأوطأ.', 'عند تساوي جهدي النقطتين يتوقف سريان التيار.', 'وحدة فرق الجهد الفولط (V) ويقاس بالفولطميتر.'],
    laws: ['g9_ohm'],
    controls: [R('V', 'فرق الجهد ⟵ فرق الارتفاع', 1, 12, 6, 1, 'V')],
    setup(S) { S.pump = 1; S.dh = 1; S.ang = 0; S.fp = 0; S.wp = 0; },
    update(S, dt) { S.dh += ((S.pump ? 1 : 0) - S.dh) * Math.min(1, dt * (S.pump ? 1.6 : .7)); if (S.dh < .01 && !S.pump) S.dh = 0; const v = S.p.V * S.dh; S.ang += v * dt * .5; S.wp += v * dt * 14; Q33.adv(S, dt, v / 6, 90); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S); const half = ph ? w - L - 12 : (w - L - 40) / 2; return { w, h, ph, L, ax: L + 10, aw: half, bx: ph ? L : L + 30 + half, top: ph ? 70 : 90, bot: ph ? Math.min(h - 120, 300) : Math.min(h - 150, 520) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, V = S.p.V * S.dh, t = S.t || 0;
      Q33.bg(ctx, w, h);
      // ---- water side ----
      const x0 = g.ax, W = g.aw, yb = g.bot, rise = 40 + S.p.V * 14, hiY = yb - 60 - rise * Math.max(S.dh, .02), loY = yb - 60;
      const ta = [x0 + W * .2, hiY], tb = [x0 + W * .78, loY];
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, x0, g.top - 10, W, yb - g.top + 40, 12); ctx.fill(); ctx.stroke();
        // stairs/stand under tank A
        ctx.fillStyle = '#cbd5e1'; ctx.fillRect(ta[0] - 40, ta[1] + 30, 80, yb - ta[1] - 30); ctx.fillStyle = '#94a3b8'; ctx.fillRect(tb[0] - 44, tb[1] + 30, 88, yb - tb[1] - 30);
        const tank = (c, lvl) => { ctx.fillStyle = '#e0f2fe'; ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; ctx.fillRect(c[0] - 40, c[1] - 30, 80, 60); ctx.fillStyle = '#38bdf8'; ctx.fillRect(c[0] - 40, c[1] + 30 - 60 * lvl, 80, 60 * lvl); ctx.strokeRect(c[0] - 40, c[1] - 30, 80, 60); };
        tank(ta, .3 + .6 * S.dh); tank(tb, .9 - .5 * S.dh);
        // pipe A → wheel → B
        ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 9; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(ta[0] + 40, ta[1] + 22); ctx.lineTo((ta[0] + tb[0]) / 2, ta[1] + 22); ctx.lineTo((ta[0] + tb[0]) / 2, tb[1] - 10); ctx.lineTo(tb[0] - 40, tb[1] - 10); ctx.stroke();
        // pump pipe B → A on the far side
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(tb[0] + 40, tb[1] + 20); ctx.lineTo(x0 + W - 18, tb[1] + 20); ctx.lineTo(x0 + W - 18, g.top + 18); ctx.lineTo(ta[0], g.top + 18); ctx.lineTo(ta[0], ta[1] - 30); ctx.stroke();
        // wheel
        const wx = (ta[0] + tb[0]) / 2, wy = (ta[1] + 22 + tb[1] - 10) / 2; ctx.save(); ctx.translate(wx + 14, wy); ctx.rotate(S.ang); ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 18, 0, TAU); ctx.stroke(); for (let k = 0; k < 6; k++) { ctx.rotate(TAU / 6); ctx.fillStyle = '#c2410c'; ctx.fillRect(0, -2, 22, 4); } ctx.restore(); });
      // water drops moving
      const P = [[ta[0] + 40, ta[1] + 22], [(ta[0] + tb[0]) / 2, ta[1] + 22], [(ta[0] + tb[0]) / 2, tb[1] - 10], [tb[0] - 40, tb[1] - 10]];
      if (V > .05) { const Lp = Q33.plen(P); for (let d = (S.wp % 22); d < Lp; d += 22) { const [x, y] = Q33.at(P, d); K.raw(ctx, () => { ctx.fillStyle = '#e0f2fe'; ctx.beginPath(); ctx.arc(x, y, 2.6, 0, TAU); ctx.fill(); }); } }
      // pump box
      const px = x0 + W - 18, py = (g.top + 18 + tb[1] + 20) / 2; K.raw(ctx, () => { ctx.fillStyle = S.pump ? '#16a34a' : '#64748b'; rr(ctx, px - 26, py - 22, 52, 44, 8); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.save(); ctx.translate(px, py); ctx.rotate(S.pump ? t * 6 : 0); for (let k = 0; k < 3; k++) { ctx.rotate(TAU / 3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(13, 0); ctx.stroke(); } ctx.restore(); });
      Q33.T(ctx, S.pump ? 'المضخة تعمل' : 'المضخة متوقفة', px - 4, py + 34, { s: fs, w: 900, c: '#fff', bg: S.pump ? '#15803d' : '#64748b' });
      Q33.T(ctx, 'طاقة كامنة عالية', ta[0], ta[1] - 44, { s: fs, w: 900, c: '#0369a1' }); Q33.T(ctx, 'طاقة كامنة واطئة', tb[0], tb[1] + 46, { s: fs, w: 900, c: '#0369a1' });
      Q33.T(ctx, S.dh < .03 ? 'تساوى المستويان: توقف انسياب الماء' : 'الماء ينساب من الأعلى إلى الأوطأ ويدير العجلة', x0 + W / 2, yb + 18, { s: fs, w: 900, c: '#fff', bg: S.dh < .03 ? '#b91c1c' : '#0369a1' });
      // ---- electric side ----
      if (!g.ph) { const X0 = g.bx, X1 = g.bx + g.aw - 10, yt = g.top + 70, yb2 = yb - 60, cx = (X0 + X1) / 2;
        Q33.board(ctx, X0, g.top - 10, X1 - X0, yb - g.top + 40);
        const lb = Q33.bulb(ctx, cx, yt, V / 8, { label: 'المصباح ⟵ العجلة' });
        const c = Q33.cell(ctx, cx, yb2, { label: Q33.f(V, 1) + ' V', w: 90, h: 34 });
        const Wa = [c.p, [X1 - 30, yb2], [X1 - 30, yt], lb.b], Wb = [lb.a, [X0 + 30, yt], [X0 + 30, yb2], c.n];
        Q33.wire(ctx, Wa, { col: '#dc2626' }); Q33.wire(ctx, Wb, { col: '#111827' }); if (V > .05) { Q33.flow(ctx, Wa, S.fp, 'c'); Q33.flow(ctx, Wb, S.fp, 'c'); }
        Q33.T(ctx, 'البطارية ⟵ المضخة', cx, yb2 + 34, { s: fs, w: 900, c: '#92400e' });
        Q33.T(ctx, 'جهد عالي +', X1 - 30, yb2 + 26, { s: fs, w: 900, c: '#dc2626' }); Q33.T(ctx, 'جهد واطئ −', X0 + 40, yb2 + 26, { s: fs, w: 900, c: '#1e293b' });
        Q33.T(ctx, 'فرق الجهد = ' + Q33.f(V, 1) + ' V ، التيار ' + (V > .05 ? 'ينساب' : 'متوقف'), cx, yb + 18, { s: fs + .5, w: 900, c: '#fff', bg: V > .05 ? '#a16207' : '#b91c1c' }); }
      Q33.banner(ctx, w, 'اضغط على المضخة لتشغيلها أو إيقافها، وغيّر فرق الجهد');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), loY = g.bot - 60, tb = [g.ax + g.aw * .78, loY], px = g.ax + g.aw - 18, py = (g.top + 18 + tb[1] + 20) / 2; return [{ id: 'pump', x: px, y: py, w: 60, h: 52, tip: 'اضغط لتشغيل/إيقاف المضخة', idle: 'اضغط المضخة ✋', click: S2 => { S2.pump = !S2.pump; } }]; },
    readings(S) { const V = S.p.V * S.dh; return [rd('المضخة / البطارية', S.pump ? 'تعمل' : 'متوقفة'), rd('فرق الجهد', Q33.f(V, 1) + ' V'), rd('انسياب الماء / التيار', V > .05 ? 'ينساب' : 'متوقف')]; },
    explain(S) { return Q26.ex(S.dh > .03 ? 'الماء ينساب من الخزان العالي إلى الواطئ، والتيار ينساب في الدائرة فيتوهج المصباح.' : 'تساوى مستوى الماء فتوقف انسيابه، وتوقف التيار.', 'الماء ينساب من مستوى أعلى إلى أوطأ، والشحنات تنساب (التيار الاصطلاحي) من النقطة ذات الجهد الأعلى إلى الأوطأ. فرق الجهد هو الذي يحدد مقدار التيار، وعند تساوي الجهدين يتوقف السريان. البطارية تعمل عمل المضخة: تحافظ على فرق الجهد.', 'خزان الماء فوق سطح البيت يعطي ضغطاً لانسياب الماء في الأنابيب.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — نشاط قياس فرق الجهد باستعمال الفولطميتر (6-3، الأشكال 16 و 17 و 18) =============== */
(() => {
  const V = 6;
  const NODES = { bp: 'القطب الموجب للبطارية', bn: 'القطب السالب للبطارية', s1: 'طرف المفتاح الأول', s2: 'طرف المفتاح الثاني', lb: 'طرف المصباح الأول', la: 'طرف المصباح الثاني' };
  const D = { id: 'g9_v_meter', page: 58, fig: 'الأشكال 16 و 17 و 18',
    desc: 'يستعمل الفولطميتر لقياس مقدار فرق الجهد الكهربائي بين أي نقطتين في الدائرة، ويستعمل كذلك لقياس فرق الجهد بين قطبي البطارية. عند استعماله: 1) يربط على التوازي بين طرفي الحمل المطلوب معرفة فرق الجهد بين طرفيه. 2) تكون مقاومته كبيرة جداً. 3) يربط طرفه الموجب (الأحمر) مع النقطة ذات الجهد الأعلى وطرفه السالب (الأسود) مع النقطة ذات الجهد الأوطأ. فرق الجهد بين طرفي العمود في الحالة التي تكون فيها الدائرة مفتوحة (التيار = صفر) يسمى القوة الدافعة الكهربائية (emf). نشاط: نربط المصباح والمفتاح بين قطبي البطارية ثم نربط الفولطميتر على التوازي مع المصباح، نغلق المفتاح ونسجل القراءة.',
    tags: 'نشاط قياس فرق الجهد فولطميتر ربط على التوازي مقاومة كبيرة القوة الدافعة الكهربائية emf ملي فولط قطبي البطارية',
    tools: ['جهاز فولطميتر', 'أسلاك توصيل', 'مصباح كهربائي', 'بطارية فولطيتها مناسبة', 'مفتاح كهربائي'],
    steps: ['أغلق المفتاح، ثم اسحب الطرف الأحمر والطرف الأسود للفولطميتر وضعهما على طرفي المصباح (الشكل 18). ما الذي تمثله القراءة؟', 'ضع الطرفين على قطبي البطارية والمفتاح مفتوح: القراءة هي القوة الدافعة الكهربائية emf (الشكل 17-b).', 'ضع الطرفين على طرفي سلك أو طرفي المفتاح المغلق: القراءة صفر. افتح المفتاح وكرّر.', 'اعكس الطرفين، ثم جرّب الربط الخاطئ على التوالي.'],
    concl: ['انحراف مؤشر الفولطميتر يشير إلى وجود فرق جهد كهربائي بين طرفي المصباح.', 'يربط الفولطميتر على التوازي بين طرفي الحمل، ومقاومته كبيرة جداً.', 'الطرف الأحمر (+) مع النقطة ذات الجهد الأعلى والأسود (−) مع الأوطأ.', 'فرق الجهد بين قطبي البطارية والدائرة مفتوحة يسمى القوة الدافعة الكهربائية emf.', 'إذا رُبط الفولطميتر على التوالي لا يتوهج المصباح لأن مقاومته كبيرة جداً.'],
    laws: ['g9_ohm'],
    controls: [],
    setup(S) { S.on = 1; S.way = 'ok'; S.pr = 'lb'; S.pb = 'la'; S.rp = null; S.bp = null; S.fp = 0; },
    pot(S) { const c = S.on && S.way === 'ok'; return c ? { bp: V, s1: V, s2: V, lb: V, la: 0, bn: 0 } : S.way === 'ser' && S.on ? { bp: V, s1: V, s2: V, lb: 0, la: 0, bn: 0 } : { bp: V, s1: V, s2: 0, lb: 0, la: 0, bn: 0 }; },
    I(S) { return S.on && S.way === 'ok' ? 1 : 0; },
    read(S) { if (S.way === 'ser') return S.on ? V : 0; const P = D.pot(S); if (!S.pr || !S.pb || S.rp || S.bp) return null; return P[S.pr] - P[S.pb]; },
    update(S, dt) { Q33.adv(S, dt, D.I(S), 140); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 14 : Math.min(w - 300, x0 + 600), yt = ph ? 150 : 200, yb = ph ? Math.min(h - 150, 320) : Math.min(h - 210, 470); const W = x1 - x0; return { w, h, ph, L, x0, x1, yt, yb, xl: x0 + W * .5, bx: x0 + W * .3, xs1: x0 + W * .62, xs2: x0 + W * .8, mx: x0 + W * .5, my: ph ? yt + 60 : yt + 110 }; },
    pts(S, g) { return { bp: [g.bx + 25, g.yb - 9], bn: [g.bx - 25, g.yb - 9], s1: [g.xs1, g.yb], s2: [g.xs2, g.yb], lb: [g.xl + 18, g.yt], la: [g.xl - 18, g.yt] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, P = D.pts(S, g), ser = S.way === 'ser', I = D.I(S), r = D.read(S);
      Q33.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.yt - 96, g.x1 - g.x0 + 28, g.yb - g.yt + 150);
      const bt = Q33.bat(ctx, g.bx, g.yb + 26, { V, w: 74, h: 54 });
      const lb = Q33.bulb(ctx, g.xl, g.yt, I, { label: '' });
      Q33.sw(ctx, g.xs1, g.xs2, g.yb, S.on);
      const W = [[bt.p, [bt.p[0], g.yb], [g.xs1, g.yb]], ser ? [[g.xs2, g.yb], [g.x1, g.yb], [g.x1, g.yt + 70], [g.x1 - 40, g.yt + 70]] : [[g.xs2, g.yb], [g.x1, g.yb], [g.x1, g.yt], lb.b], [lb.a, [g.x0, g.yt], [g.x0, g.yb], [bt.n[0], g.yb], bt.n]];
      let vm;
      if (ser) { vm = Q33.meter(ctx, g.x1 - 100, g.yt + 50, 'V', r, 10, { name: 'الفولطميتر على التوالي', flip: false, d: 1 }); W.push([[g.x1 - 40, g.yt + 70], vm.p], [vm.n, [vm.n[0] - 20, vm.n[1]], [vm.n[0] - 20, g.yt + 30], [lb.b[0], g.yt + 30], lb.b]); }
      W.forEach((p, i) => Q33.wire(ctx, p, { col: i === 2 ? '#111827' : '#dc2626' })); if (I) W.forEach(p => Q33.flow(ctx, p, S.fp, 'c'));
      if (!ser) { vm = Q33.meter(ctx, g.mx, g.my, 'V', r == null ? 0 : r, 10, { name: 'الفولطميتر', d: 1, txt: r == null ? 'ضع الطرفين على نقطتين' : Q33.f(r, 1) + ' V' });
        // nodes
        Object.keys(P).forEach(k => K.raw(ctx, () => { ctx.strokeStyle = 'rgba(124,58,237,.6)'; ctx.lineWidth = 2; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(P[k][0], P[k][1], 12, 0, TAU); ctx.stroke(); ctx.setLineDash([]); }));
        const tip = (k, c) => { const pos = S[k === 'r' ? 'rp' : 'bp'] || P[S[k === 'r' ? 'pr' : 'pb']] || [g.mx + (k === 'r' ? 60 : -60), g.my + 70]; return pos; };
        const R = tip('r'), B = tip('b');
        const lead = (from, to, col) => K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 3.4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(from[0], from[1]); ctx.bezierCurveTo(from[0], from[1] + 60, to[0], to[1] + 70, to[0], to[1]); ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(to[0], to[1], 7, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); });
        lead(vm.p, R, '#dc2626'); lead(vm.n, B, '#111827');
        if (r != null && r >= -.01) Q33.T(ctx, 'بين ' + NODES[S.pr] + ' و ' + NODES[S.pb], g.mx, g.my + 72, { s: fs, w: 800, c: '#5b21b6' });
        if (r != null && r < -.01) Q33.T(ctx, '⚠ اعكس الطرفين: الأحمر نحو الجهد الأعلى', g.mx, g.my + 70, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' }); }
      else Q33.T(ctx, '⚠ المصباح لا يتوهج: مقاومة الفولطميتر كبيرة جداً', (g.x0 + g.x1) / 2, g.yt - 70, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' });
      if (!ser && S.pr && S.pb && !S.rp && !S.bp && ((S.pr === 'bp' && S.pb === 'bn') || (S.pr === 'bn' && S.pb === 'bp')) && !S.on) Q33.T(ctx, 'الدائرة مفتوحة: القراءة = القوة الدافعة الكهربائية emf', (g.x0 + g.x1) / 2, g.yt - 70, { s: fs, w: 900, c: '#fff', bg: '#7c3aed' });
      if (!g.ph) Q33.card(ctx, S, [{ t: '• يربط على التوازي بين طرفي الحمل', c: ser ? '#b91c1c' : '#15803d', w: 900 }, { t: '• مقاومته كبيرة جداً', c: '#334155' }, { t: '• الأحمر + مع الجهد الأعلى والأسود − مع الأوطأ', c: r != null && r < 0 ? '#b91c1c' : '#15803d', w: 900 }, { t: '• الفولطيات الصغيرة تقاس بالملي فولطميتر mV', c: '#475569' }], { title: 'شروط ربط الفولطميتر — الشكل 17', wd: 270, y: 70 });
      Q33.drawChips(ctx, D.chips(S, g));
      const rb = Q33.btn('rec', { x: g.ph ? w - 90 : w - 100, y: g.ph ? 40 : h - 130, w: 160, h: 32 }, () => { }); Q33.drawBtn(ctx, rb, '📋 سجّل القراءة', '#15803d');
      Q33.banner(ctx, w, 'اسحب طرفي الفولطميتر الأحمر والأسود إلى نقطتين في الدائرة');
    },
    chips(S, g) { return Q33.chips(S, 'way', [['ok', 'على التوازي — صحيح'], ['ser', 'خطأ: على التوالي']], g.h - 84, S.way, (S2, k) => { S2.way = k; }, { bw: 200 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = D.pts(S, g), L = [{ id: 'sw', x: (g.xs1 + g.xs2) / 2, y: g.yb - 8, w: g.xs2 - g.xs1 + 30, h: 46, tip: 'اضغط لفتح/إغلاق المفتاح', idle: 'اضغط ✋', click: S2 => { S2.on = !S2.on; } }];
      if (S.way === 'ok') ['r', 'b'].forEach(k => { const pk = k === 'r' ? 'rp' : 'bp', nk = k === 'r' ? 'pr' : 'pb', pos = S[pk] || P[S[nk]] || [g.mx + (k === 'r' ? 60 : -60), g.my + 70];
        L.push({ id: 'probe_' + k, x: pos[0], y: pos[1], r: 18, axis: 'xy', keep: true, tip: k === 'r' ? 'اسحب الطرف الأحمر (+)' : 'اسحب الطرف الأسود (−)', idle: k === 'r' ? 'الطرف الأحمر ✋' : 'الطرف الأسود ✋', drag: (S2, d) => { S2[pk] = [d.x, d.y]; S2[nk] = null; }, up: S2 => { const p = S2[pk]; if (!p) return; let best = null, bd = 34; Object.keys(P).forEach(n => { const dd = Math.hypot(P[n][0] - p[0], P[n][1] - p[1]); if (dd < bd) { bd = dd; best = n; } }); if (best) { S2[nk] = best; S2[pk] = null; } } }); });
      return L.concat(D.chips(S, g), [Q33.btn('rec', { x: g.ph ? g.w - 90 : g.w - 100, y: g.ph ? 40 : g.h - 130, w: 160, h: 32 }, () => { const b = document.getElementById('recBtn'); b && b.click(); }, { tip: 'سجّل القراءة في الجدول' })]); },
    readings(S) { const r = D.read(S); return [rd('المفتاح', S.on ? 'مغلق' : 'مفتوح'), rd('الطرف الأحمر على', S.way === 'ser' ? '—' : NODES[S.pr] || '—'), rd('الطرف الأسود على', S.way === 'ser' ? '—' : NODES[S.pb] || '—'), rd('قراءة الفولطميتر', r == null ? '—' : Q33.f(r, 1) + ' V')]; },
    record(S) { const r = D.read(S); return { a: S.way === 'ser' ? 'على التوالي' : (NODES[S.pr] || '—') + ' / ' + (NODES[S.pb] || '—'), sw: S.on ? 'مغلق' : 'مفتوح', v: r == null ? '—' : +r.toFixed(2) }; },
    cols: [['a', 'النقطتان (أحمر / أسود)'], ['sw', 'المفتاح'], ['v', 'القراءة (V)']],
    explain(S) { const r = D.read(S); if (S.way === 'ser') return Q26.ex('المصباح لا يتوهج والفولطميتر يقرأ تقريباً فولطية البطارية.', 'مقاومة الفولطميتر كبيرة جداً، فإذا رُبط على التوالي لا يكاد يمر تيار. لذلك يربط على التوازي.', ''); if (r == null) return Q26.ex('ضع طرفي الفولطميتر على نقطتين.', 'الفولطميتر يقيس فرق الجهد بين نقطتين في الدائرة.', ''); return Q26.ex('القراءة ' + Q33.f(r, 1) + ' V بين ' + NODES[S.pr] + ' و ' + NODES[S.pb] + '.', Math.abs(r) < .01 ? 'لا يوجد فرق جهد بين نقطتين يصل بينهما سلك (أو مفتاح مغلق)، أو نقطتين لا يمر بينهما تيار في دائرة مفتوحة.' : (S.pr === 'bp' && S.pb === 'bn' && !S.on ? 'الدائرة مفتوحة (التيار = صفر)، فالقراءة بين قطبي البطارية هي القوة الدافعة الكهربائية emf.' : 'يوجد فرق جهد بين النقطتين: الطاقة تنتقل من الشحنات إلى الحمل.') + (r < 0 ? ' الإشارة سالبة: الطرف الأحمر على النقطة ذات الجهد الأوطأ.' : ''), 'فولطية بطارية السيارة 12 V وفولطية العمود الجاف 1.5 V.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — نشاط قياس مقاومة كهربائية: قانون أوم بالأميتر والفولطميتر + الأوميتر (8-3، الأشكال 22 و 23 و 24) =============== */
(() => {
  const RS = [2, 3, 4, 6, 10];
  const D = { id: 'g9_r_ohm', page: 60, fig: 'الأشكال 22 و 23 و 24',
    desc: 'لقد وجد العالم أوم أن حاصل قسمة فرق الجهد الكهربائي بين طرفي المقاوم على مقدار التيار المنساب فيه يساوي مقداراً ثابتاً ضمن حدود معينة، سمي بالمقاومة الكهربائية، وتقاس بالأوم (Ω): المقاومة = فرق الجهد ÷ التيار ، R = V / I. نشاط: نربط الأجهزة كما في الشكل 22 مع مراعاة ربط الأميتر على التوالي مع المقاومة والفولطميتر على التوازي بين طرفيها، نغلق الدائرة ونسجل القراءتين، ثم نقسم قراءة الفولطميتر على قراءة الأميتر. ويمكن قياس المقاومة مباشرة بجهاز الأوميتر، ويتوجب أن تكون المقاومة غير موصولة بدائرة كهربائية عند قياسها.',
    tags: 'نشاط قانون أوم المقاومة الكهربائية أوم R=V/I أميتر فولطميتر أوميتر قياس مقاومة صغيرة',
    tools: ['أسلاك توصيل', 'جهاز أميتر A', 'جهاز فولطميتر V', 'بطارية', 'مفتاح كهربائي', 'مقاومة صغيرة المقدار', 'جهاز الأوميتر'],
    steps: ['أغلق المفتاح وسجّل قراءة الأميتر والفولطميتر (زر «سجّل القراءة»).', 'زد عدد الأعمدة (1.5 V لكل عمود) وسجّل في كل مرة: ماذا تلاحظ على V ÷ I؟', 'غيّر المقاومة R وكرّر: الرسم البياني V مع I خط مستقيم ميله R.', 'اختر «الأوميتر» لقياس المقاومة مباشرة وهي مفصولة عن الدائرة (الشكلان 23 و 24).'],
    concl: ['قراءة الفولطميتر ÷ قراءة الأميتر = مقدار ثابت = المقاومة R (قانون أوم).', 'R = V / I ، وتقاس بالأوم Ω.', 'الأوم: مقاومة موصل فرق الجهد بين طرفيه فولط واحد ومقدار التيار المار خلاله أمبير واحد.', 'يقاس مقدار المقاومة مباشرة بالأوميتر، على أن تكون غير موصولة بدائرة كهربائية.'],
    laws: ['g9_ohm'],
    controls: [],
    setup(S) { S.on = 1; S.n = 2; S.ri = 2; S.md = 'cir'; S.fp = 0; },
    R(S) { return RS[S.ri]; },
    I(S) { return S.on && S.md === 'cir' ? S.n * 1.5 / D.R(S) : 0; },
    update(S, dt) { Q33.adv(S, dt, D.I(S), 120); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 14 : Math.min(w - 330, x0 + 600), yt = ph ? 200 : 260, yb = ph ? Math.min(h - 150, 340) : Math.min(h - 210, 500); const W = x1 - x0; return { w, h, ph, L, x0, x1, yt, yb, xr: x0 + W * .38, xa: x0 + W * .74, bx: x0 + W * .32, xs1: x0 + W * .66, xs2: x0 + W * .82 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, R = D.R(S), I = D.I(S), V = I * R;
      Q33.bg(ctx, w, h);
      if (S.md !== 'cir') { // ohmmeter (multimeter) measuring a loose resistor
        const cx = g.ph ? w / 2 : (g.x0 + g.x1) / 2, cy = g.ph ? 190 : 250, bad = S.md === 'bad';
        Q33.board(ctx, cx - 230, cy - 150, 460, 330);
        K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = 10; ctx.fillStyle = '#facc15'; rr(ctx, cx - 190, cy - 110, 120, 200, 16); ctx.fill(); ctx.restore(); ctx.fillStyle = '#1f2937'; rr(ctx, cx - 178, cy - 98, 96, 44, 6); ctx.fill(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(cx - 130, cy + 10, 28, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 130, cy + 10); ctx.lineTo(cx - 112, cy - 8); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(cx - 110, cy + 66, 7, 0, TAU); ctx.fill(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(cx - 150, cy + 66, 7, 0, TAU); ctx.fill(); });
        Q33.T(ctx, bad ? 'خطأ!' : Q33.f(R, 1) + ' Ω', cx - 130, cy - 76, { s: 17, w: 900, c: bad ? '#f87171' : '#4ade80', mono: 1 }); Q33.T(ctx, 'Ω أوميتر', cx - 130, cy - 34, { s: 10.5, w: 900, c: '#1f2937' });
        const rs = Q33.res(ctx, cx + 80, cy + 10, R, { len: 90, th: 22 });
        K.raw(ctx, () => { ctx.lineWidth = 3.4; ctx.strokeStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(cx - 110, cy + 66); ctx.bezierCurveTo(cx - 60, cy + 140, rs.b[0], cy + 120, rs.b[0], rs.b[1] + 4); ctx.stroke(); ctx.strokeStyle = '#111827'; ctx.beginPath(); ctx.moveTo(cx - 150, cy + 66); ctx.bezierCurveTo(cx - 120, cy + 160, rs.a[0], cy + 110, rs.a[0], rs.a[1] + 4); ctx.stroke(); });
        if (bad) { Q33.cell(ctx, cx + 80, cy - 80, { label: '' }); Q33.wire(ctx, [[cx + 80 + 42, cy - 80], [rs.b[0] + 20, cy - 80], [rs.b[0] + 20, cy + 10], rs.b], { col: '#dc2626' }); Q33.wire(ctx, [[cx + 80 - 40, cy - 80], [rs.a[0] - 20, cy - 80], [rs.a[0] - 20, cy + 10], rs.a], { col: '#111827' });
          Q33.T(ctx, '⚠ المقاومة موصولة بدائرة: القراءة غير صحيحة وقد يتلف الجهاز', cx, cy + 150, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' }); }
        else Q33.T(ctx, 'المقاومة مفصولة عن الدائرة: الأوميتر يقرأ ' + Q33.f(R, 1) + ' Ω مباشرة', cx, cy + 150, { s: fs, w: 900, c: '#fff', bg: '#15803d' });
      } else {
        Q33.board(ctx, g.x0 - 14, g.yt - 200, g.x1 - g.x0 + 28, g.yb - g.yt + 250);
        const n = S.n, cw = 64, c0 = g.bx - (n - 1) * cw / 2; const cs = []; for (let i = 0; i < n; i++) cs.push(Q33.cell(ctx, c0 + i * cw, g.yb, { w: 56, h: 26, label: '1.5', sp: i === n - 1 ? 1 : 0, sn: i === 0 ? 1 : 0 }));
        for (let i = 0; i < n - 1; i++) Q33.wire(ctx, [cs[i].p, cs[i + 1].n], { col: '#475569' });
        const P = cs[n - 1].p, N = cs[0].n;
        Q33.sw(ctx, g.xs1, g.xs2, g.yb, S.on);
        const rs = Q33.res(ctx, g.xr, g.yt, R, { len: 76, th: 20, label: '' });
        const am = Q33.meter(ctx, g.xa, g.yt - 28, 'A', I, 3, { name: 'الأميتر — على التوالي', d: 2 });
        const vm = Q33.meter(ctx, g.xr, g.yt - 130, 'V', V, 6, { name: 'الفولطميتر — على التوازي', d: 2 });
        const W = [[P, [g.xs1, g.yb]], [[g.xs2, g.yb], [g.x1, g.yb], [g.x1, g.yt], am.p], [am.n, rs.b], [rs.a, [g.x0, g.yt], [g.x0, g.yb], N]];
        W.forEach((p, i) => Q33.wire(ctx, p, { col: i === 3 ? '#111827' : '#dc2626' })); if (I) W.forEach(p => Q33.flow(ctx, p, S.fp, 'c'));
        Q33.wire(ctx, [vm.p, [vm.p[0], g.yt - 60], [rs.b[0] - 4, g.yt - 60], [rs.b[0] - 4, g.yt]], { col: '#f97316' }); Q33.wire(ctx, [vm.n, [vm.n[0], g.yt - 60], [rs.a[0] + 4, g.yt - 60], [rs.a[0] + 4, g.yt]], { col: '#334155' });
        Q33.T(ctx, 'R = ' + R + ' Ω', g.xr, g.yt + 24, { s: fs + 1, w: 900, c: '#7c2d12' });
        Q33.T(ctx, 'البطارية: ' + n + ' × 1.5 = ' + Q33.f(n * 1.5, 1) + ' V', g.bx, g.yb + 30, { s: fs, w: 900, c: '#92400e' });
        Q33.T(ctx, S.on ? 'V ÷ I = ' + Q33.f(V, 2) + ' ÷ ' + Q33.f(I, 2) + ' = ' + Q33.f(R, 2) + ' Ω' : 'أغلق المفتاح', g.x0 + (g.x1 - g.x0) * .3, g.yb - 60, { s: fs + 2, w: 900, c: '#0f172a', bg: '#fde047' });
        if (!g.ph && S.rows && S.rows.length) D.plot(ctx, S, g, w);
      }
      Q33.drawChips(ctx, D.chipsA(S, g)); Q33.drawChips(ctx, D.chipsB(S, g)); Q33.drawChips(ctx, D.chipsC(S, g));
      if (S.md === 'cir') { const rb = Q33.btn('rec', { x: g.ph ? w - 90 : w - 100, y: g.ph ? 40 : h - 170, w: 160, h: 32 }, () => { }); Q33.drawBtn(ctx, rb, '📋 سجّل القراءة', '#15803d'); }
      Q33.banner(ctx, w, S.md === 'cir' ? 'غيّر عدد الأعمدة والمقاومة وسجّل V و I' : 'الأوميتر يقيس المقاومة مباشرة');
    },
    plot(ctx, S, g, w) { const X0 = g.x1 + 60, Y0 = 250, GW = Math.min(240, w - X0 - 30), GH = 200; if (GW < 120) return;
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, X0 - 30, Y0 - 30, GW + 50, GH + 70, 10); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X0, Y0); ctx.lineTo(X0, Y0 + GH); ctx.lineTo(X0 + GW, Y0 + GH); ctx.stroke(); });
      const X = I => X0 + I / 3 * GW, Y = V => Y0 + GH - V / 6 * GH; const cols = ['#dc2626', '#2563eb', '#16a34a', '#a16207', '#7c3aed'];
      S.rows.forEach(r => { const c = cols[RS.indexOf(r.R)] || '#0f172a'; K.raw(ctx, () => { ctx.strokeStyle = c; ctx.globalAlpha = .35; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(Math.min(3, 6 / r.R)), Y(Math.min(3, 6 / r.R) * r.R)); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(X(r.I), Y(r.V), 5, 0, TAU); ctx.fill(); }); });
      Q33.T(ctx, 'V (V)', X0 + 4, Y0 - 14, { s: 10, w: 900, c: '#0f172a' }); Q33.T(ctx, 'I (A)', X0 + GW - 10, Y0 + GH + 16, { s: 10, w: 900, c: '#0f172a' }); Q33.T(ctx, 'الميل = R', X0 + GW / 2, Y0 + GH + 34, { s: 10.5, w: 900, c: '#a16207' }); },
    chipsA(S, g) { return Q33.chips(S, 'n', [1, 2, 3, 4].map(k => [String(k), k + ' عمود = ' + Q33.f(k * 1.5, 1) + ' V']), g.h - 128, String(S.n), (S2, k) => { S2.n = +k; S2.md = 'cir'; }, { bw: 150, bh: 30 }); },
    chipsB(S, g) { return Q33.chips(S, 'r', RS.map((r, i) => [String(i), 'R = ' + r + ' Ω']), g.h - 84, String(S.ri), (S2, k) => { S2.ri = +k; }, { bw: 110, bh: 30, col: '#7c2d12' }); },
    chipsC(S, g) { return Q33.chips(S, 'md', [['cir', 'الأميتر والفولطميتر'], ['ohm', 'الأوميتر'], ['bad', 'خطأ: أوميتر في دائرة']], g.h - 172, S.md, (S2, k) => { S2.md = k; }, { bw: 200, bh: 30, col: '#7c3aed', x1: g.w - 190 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = []; if (S.md === 'cir') L.push({ id: 'sw', x: (g.xs1 + g.xs2) / 2, y: g.yb - 8, w: g.xs2 - g.xs1 + 30, h: 46, tip: 'اضغط لفتح/إغلاق المفتاح', idle: 'اضغط ✋', click: S2 => { S2.on = !S2.on; } });
      L.push(...D.chipsA(S, g), ...D.chipsB(S, g), ...D.chipsC(S, g)); if (S.md === 'cir') L.push(Q33.btn('rec', { x: g.ph ? g.w - 90 : g.w - 100, y: g.ph ? 40 : g.h - 170, w: 160, h: 32 }, () => { const b = document.getElementById('recBtn'); b && b.click(); }, { tip: 'سجّل القراءة في الجدول' })); return L; },
    readings(S) { const R = D.R(S), I = D.I(S); return [rd('قراءة الفولطميتر V', Q33.f(I * R) + ' V'), rd('قراءة الأميتر I', Q33.f(I) + ' A'), rd('R = V ÷ I', S.md === 'bad' ? '—' : Q33.f(R) + ' Ω')]; },
    record(S) { const R = D.R(S), I = D.I(S); return S.md === 'cir' ? { V: +(I * R).toFixed(2), I: +I.toFixed(3), R: I ? +(I * R / I).toFixed(2) : '—' } : null; },
    cols: [['V', 'V (V)'], ['I', 'I (A)'], ['R', 'R = V/I (Ω)']],
    graph: { x: 'I', y: 'V', xl: 'التيار I (A)', yl: 'فرق الجهد V (V)' },
    explain(S) { const R = D.R(S), I = D.I(S); if (S.md === 'ohm') return Q26.ex('الأوميتر يقرأ ' + R + ' Ω مباشرة.', 'يمكن قياس مقدار المقاومة الكهربائية بطريقة مباشرة باستعمال جهاز الأوميتر (Ohmmeter) على أن تكون المقاومة غير موصولة بدائرة (الشكل 24).', 'الفني يستعمل الأوميتر لفحص الأسلاك والمقاومات التالفة.'); if (S.md === 'bad') return Q26.ex('قراءة غير صحيحة.', 'يتوجب عند استعمال الأوميتر أن تكون المقاومة المطلوب قياسها غير موصولة بدائرة كهربائية، لأن تيار الدائرة يفسد القياس وقد يتلف الجهاز.', ''); return Q26.ex(S.on ? 'الفولطميتر يقرأ ' + Q33.f(I * R) + ' V والأميتر ' + Q33.f(I) + ' A ، وناتج القسمة ' + R + ' Ω.' : 'أغلق المفتاح.', 'عند مضاعفة عدد الأعمدة يتضاعف فرق الجهد فيتضاعف التيار، ويبقى V ÷ I ثابتاً = R (قانون أوم). الأميتر على التوالي مع المقاومة، والفولطميتر على التوازي بين طرفيها.', 'قانون أوم يستعمله المهندسون لاختيار المقاومات والأسلاك المناسبة للأجهزة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — العوامل التي يتوقف عليها مقدار مقاومة الموصل (نشاطا الطول والمساحة + الحرارة + نوع المادة، الأشكال 25 إلى 31) =============== */
(() => {
  const MODES = { len: 'الطول — نشاط ص 63', area: 'المساحة — نشاط ص 64', temp: 'درجة الحرارة — الشكل 25', mat: 'نوع المادة — الشكل 31' };
  const MATS = { ni: { n: 'نيكل كروم', k: 1, c: '#94a3b8' }, fe: { n: 'حديد', k: .1, c: '#57534e' }, ag: { n: 'فضة', k: .016, c: '#e2e8f0' }, cu: { n: 'نحاس', k: .017, c: '#ea580c' } };
  const V = 3, RL = 2, RN = 8; // battery, lamp, full nichrome wire (one strand)
  const D = { id: 'g9_r_factors', page: 62, fig: 'الأشكال 25 إلى 31',
    desc: 'العوامل التي يتوقف عليها مقدار مقاومة الموصل: 1) درجة الحرارة: المعادن النقية تزداد مقاومتها مع ارتفاع درجة حرارتها (كالنحاس): عند تسخين سلك النحاس المربوط مع مصباح يقل توهج المصباح تدريجياً. ومن الجدير بالذكر أن انخفاض درجة حرارة بعض المواد انخفاضاً كبيراً يجعلها فائقة التوصيل (superconductor). 2) طول الموصل: تتناسب مقاومة الموصل طردياً مع طوله. 3) مساحة المقطع العرضي: تقل مقاومة الموصل بزيادة مساحة مقطعه العرضي. 4) نوع المادة: مقاومة سلك من الفضة أصغر من مقاومة سلك من الحديد مساوٍ له بالطول والمساحة وعند درجة الحرارة نفسها. R ∝ L / A.',
    tags: 'العوامل المؤثرة في المقاومة طول الموصل مساحة المقطع درجة الحرارة نوع المادة نيكل كروم ماسكان نشاط فائق التوصيل R∝L/A',
    tools: ['بطارية', 'سلك موصل من النيكل كروم', 'مصباح كهربائي', 'أميتر', 'أسلاك توصيل', 'ماسكان', 'مفتاح', 'شمعات للتسخين', 'سلك حديد وسلك فضة'],
    steps: ['الطول: اسحب الماسك الأيمن على سلك النيكل كروم نحو الماسك الآخر (تصغير الطول): يزداد توهج المصباح وقراءة الأميتر.', 'المساحة: اختر «سلكان ملفوفان 2A»: يزداد التيار عن حالة السلك المفرد.', 'الحرارة: اضغط على الشمعات لإشعالها تحت ملف النحاس: يقل توهج المصباح تدريجياً.', 'المادة: قارن سلك الفضة بسلك الحديد المساويين في الطول والمساحة.'],
    concl: ['مقاومة الموصل (R) تتناسب طردياً مع طوله (L) بثبوت العوامل الأخرى.', 'مقاومة الموصل تتناسب عكسياً مع مساحة مقطعه العرضي (A) بثبوت العوامل الأخرى.', 'تزداد مقاومة المعادن النقية بارتفاع درجة حرارتها، وبعض المواد تصبح فائقة التوصيل عند التبريد الشديد.', 'تختلف المقاومة باختلاف نوع المادة: مقاومة الفضة أصغر من مقاومة الحديد.', 'المقاومة ∝ طول السلك ÷ مساحة المقطع.'],
    laws: ['g9_RLA', 'g9_ohm'],
    controls: [],
    setup(S) { S.m = 'len'; S.f = 1; S.two = 0; S.nc = 0; S.T = 20; S.cold = 0; S.mt = 'fe'; S.fp = 0; },
    Rw(S) { if (S.m === 'len') return RN * clamp(S.f, .05, 1); if (S.m === 'area') return RN / (S.two ? 2 : 1); if (S.m === 'temp') return S.cold ? 0 : 2 * (1 + .0039 * (S.T - 20)); return 4 * MATS[S.mt].k / .1; },
    I(S) { return V / (RL + D.Rw(S)); },
    update(S, dt) { const Tt = S.cold ? -196 : 20 + S.nc * 140; S.T += (Tt - S.T) * Math.min(1, dt * .5); Q33.adv(S, dt, D.I(S), 120); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 14 : Math.min(w - 40, x0 + 760), yt = ph ? 140 : 170, yb = ph ? Math.min(h - 160, 330) : Math.min(h - 230, 460); const W = x1 - x0; return { w, h, ph, L, x0, x1, yt, yb, xl: x0 + W * .14, xa: x0 + W * .36, bx: x0 + W * .3, w1: x0 + W * .52, w2: x0 + W * .95, wy: (yt + yb) / 2 + 10 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, I = D.I(S), Rw = D.Rw(S), I0 = V / (RL + 2);
      Q33.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.yt - 100, g.x1 - g.x0 + 28, g.yb - g.yt + 150);
      const bt = Q33.bat(ctx, g.bx, g.yb + 26, { V, w: 70, h: 50 });
      const lb = Q33.bulb(ctx, g.xl, g.yt, I / I0, { label: '' });
      const am = Q33.meter(ctx, g.xa, g.yt - 28, 'A', I, 1.6, { name: 'الأميتر', d: 2, w: 84, h: 68, flip: true });
      // the sample on its own wooden plank (right side)
      const a = [g.w1, g.wy], wl = g.w2 - g.w1;
      K.raw(ctx, () => { ctx.fillStyle = '#d6a46b'; rr(ctx, g.w1 - 20, g.wy - 26, wl + 40, 52, 8); ctx.fill(); ctx.strokeStyle = 'rgba(120,53,15,.4)'; ctx.stroke(); });
      let b;
      if (S.m === 'len' || S.m === 'area') { const xb = g.w1 + wl * (S.m === 'len' ? S.f : 1);
        K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = S.m === 'area' && S.two ? 6 : 3; ctx.beginPath(); ctx.moveTo(g.w1, g.wy); ctx.lineTo(g.w2, g.wy); ctx.stroke(); if (S.m === 'area' && S.two) { ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5; for (let x = g.w1; x < g.w2; x += 8) { ctx.beginPath(); ctx.moveTo(x, g.wy - 3); ctx.lineTo(x + 5, g.wy + 3); ctx.stroke(); } } });
        Q33.T(ctx, S.m === 'area' ? (S.two ? 'سلكان ملفوفان: مساحة المقطع 2A' : 'سلك واحد: مساحة المقطع A') : 'سلك نيكل كروم: الطول المستعمل L = ' + Q33.f(S.f * 100, 0) + ' cm', (g.w1 + g.w2) / 2, g.wy + 40, { s: fs, w: 900, c: '#334155' });
        if (S.m === 'len') K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(g.w1, g.wy - 18); ctx.lineTo(xb, g.wy - 18); ctx.stroke(); ctx.setLineDash([]); });
        b = [xb, g.wy]; }
      else if (S.m === 'temp') { // copper coil on two holders with candles
        K.raw(ctx, () => { ctx.strokeStyle = S.T > 200 ? '#dc2626' : S.T < -50 ? '#38bdf8' : '#ea580c'; ctx.lineWidth = 2.6; ctx.beginPath(); for (let x = g.w1; x <= g.w2; x += 1.5) { const u = (x - g.w1) / wl; ctx.lineTo(x, g.wy + Math.sin(u * TAU * 16) * 10); } ctx.stroke(); });
        const nC = 3; for (let i = 0; i < nC; i++) { const cx = g.w1 + wl * (.25 + i * .25), lit = i < S.nc; K.raw(ctx, () => { ctx.fillStyle = '#fef3c7'; ctx.fillRect(cx - 7, g.wy + 30, 14, 40); if (lit) { const fl = 1 + Math.sin((S.t || 0) * 20 + i) * .12; ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.ellipse(cx, g.wy + 22, 6 * fl, 12 * fl, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.ellipse(cx, g.wy + 24, 3, 7, 0, 0, TAU); ctx.fill(); } }); }
        Q33.T(ctx, 'ملف نحاس — درجة حرارته ' + Q33.f(S.T, 0) + ' °C', (g.w1 + g.w2) / 2, g.wy - 40, { s: fs, w: 900, c: '#fff', bg: S.T > 100 ? '#dc2626' : S.T < -50 ? '#0369a1' : '#475569' });
        Q33.T(ctx, 'اضغط على الشمعات', (g.w1 + g.w2) / 2, g.wy + 86, { s: fs, w: 800, c: '#92400e' });
        b = [g.w2, g.wy]; }
      else { const M = MATS[S.mt]; K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(g.w1, g.wy); ctx.lineTo(g.w2, g.wy); ctx.stroke(); ctx.strokeStyle = M.c; ctx.lineWidth = 4; ctx.stroke(); });
        Q33.T(ctx, 'سلك ' + M.n + ' — الطول L والمساحة A نفسها', (g.w1 + g.w2) / 2, g.wy + 40, { s: fs, w: 900, c: '#334155' }); b = [g.w2, g.wy]; }
      // clamps
      const clamp2 = p => K.raw(ctx, () => { ctx.fillStyle = '#facc15'; ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(p[0] - 7, p[1] - 16); ctx.lineTo(p[0] + 7, p[1] - 16); ctx.lineTo(p[0] + 4, p[1] + 2); ctx.lineTo(p[0] - 4, p[1] + 2); ctx.closePath(); ctx.fill(); ctx.stroke(); });
      clamp2(a); clamp2(b); Q33.T(ctx, 'ماسك', a[0], a[1] - 28, { s: 10, w: 800, c: '#854d0e' }); Q33.T(ctx, 'ماسك', b[0], b[1] - 28, { s: 10, w: 800, c: '#854d0e' });
      const W = [[bt.p, [bt.p[0], g.yb], [g.x1, g.yb], [g.x1, g.wy + 60], [b[0], g.wy + 60], [b[0], b[1] - 14]], [[a[0], a[1] - 14], [a[0], g.yt], am.p], [am.n, lb.b], [lb.a, [g.x0, g.yt], [g.x0, g.yb], [bt.n[0], g.yb], bt.n]];
      W.forEach((p, i) => Q33.wire(ctx, p, { col: i === 3 ? '#111827' : '#dc2626' })); W.forEach(p => Q33.flow(ctx, p, S.fp, 'c'));
      Q33.T(ctx, 'مقاومة السلك ' + (S.m === 'temp' && S.cold ? '= 0 فائق التوصيل' : '≈ ' + Q33.f(Rw, 2) + ' Ω') + ' ، التيار ' + Q33.f(I, 2) + ' A ، المصباح ' + Q33.glow(I / I0), (g.x0 + g.x1) / 2, g.yt - 80, { s: fs + 1, w: 900, c: '#fff', bg: '#a16207' });
      Q33.drawChips(ctx, D.chipsM(S, g)); const C2s = D.chipsS(S, g); if (C2s.length) Q33.drawChips(ctx, C2s);
      const rb = Q33.btn('rec', { x: g.ph ? w - 90 : w - 100, y: g.ph ? 40 : h - 170, w: 160, h: 32 }, () => { }); Q33.drawBtn(ctx, rb, '📋 سجّل القراءة', '#15803d');
      Q33.banner(ctx, w, 'اختر العامل من الأسفل ثم غيّره وراقب المصباح والأميتر');
    },
    chipsM(S, g) { return Q33.chips(S, 'fm', Object.keys(MODES).map(k => [k, MODES[k]]), g.h - 84, S.m, (S2, k) => { S2.m = k; }, { bw: 200, bh: 30 }); },
    chipsS(S, g) { const y = g.h - 128; if (S.m === 'area') return Q33.chips(S, 'ar', [['1', 'سلك واحد A'], ['2', 'سلكان ملفوفان 2A']], y, S.two ? '2' : '1', (S2, k) => { S2.two = k === '2'; }, { bw: 190, bh: 30, col: '#0f766e' });
      if (S.m === 'mat') return Q33.chips(S, 'mt', Object.keys(MATS).map(k => [k, MATS[k].n]), y, S.mt, (S2, k) => { S2.mt = k; }, { bw: 140, bh: 30, col: '#0f766e' });
      if (S.m === 'temp') return Q33.chips(S, 'tc', [['0', 'إطفاء الشمعات'], ['cold', 'تبريد شديد جداً']], y, S.cold ? 'cold' : '', (S2, k) => { if (k === 'cold') { S2.cold = !S2.cold; S2.nc = 0; } else { S2.nc = 0; S2.cold = 0; } }, { bw: 190, bh: 30, col: '#0369a1' });
      if (S.m === 'len') return Q33.chips(S, 'ln', [['1', 'L كامل'], ['.5', 'نصف الطول L/2'], ['.25', 'ربع الطول L/4']], y, String(S.f), (S2, k) => { S2.f = +k; }, { bw: 160, bh: 30, col: '#0f766e' });
      return []; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), wl = g.w2 - g.w1, L = [];
      if (S.m === 'len') L.push({ id: 'clamp', x: g.w1 + wl * S.f, y: g.wy - 6, r: 22, axis: 'x', keep: true, tip: 'اسحب الماسك لتغيير طول السلك', idle: 'اسحب الماسك ✋', drag: (S2, d) => { S2.f = clamp((d.x - g.w1) / wl, .05, 1); } });
      if (S.m === 'temp') for (let i = 0; i < 3; i++) L.push({ id: 'candle' + i, x: g.w1 + wl * (.25 + i * .25), y: g.wy + 44, w: 34, h: 66, tip: 'اضغط لإشعال/إطفاء الشمعة', idle: 'أشعل الشمعة ✋', click: S2 => { S2.cold = 0; S2.nc = S2.nc > i ? i : i + 1; } });
      return L.concat(D.chipsM(S, g), D.chipsS(S, g), [Q33.btn('rec', { x: g.ph ? g.w - 90 : g.w - 100, y: g.ph ? 40 : g.h - 170, w: 160, h: 32 }, () => { const b = document.getElementById('recBtn'); b && b.click(); }, { tip: 'سجّل القراءة في الجدول' })]); },
    desc2(S) { return S.m === 'len' ? 'L = ' + Q33.f(S.f * 100, 0) + ' cm' : S.m === 'area' ? (S.two ? '2A' : 'A') : S.m === 'temp' ? Q33.f(S.T, 0) + ' °C' : MATS[S.mt].n; },
    readings(S) { return [rd('العامل', MODES[S.m]), rd('قيمته', D.desc2(S)), rd('مقاومة السلك', Q33.f(D.Rw(S), 2) + ' Ω'), rd('قراءة الأميتر', Q33.f(D.I(S), 3) + ' A')]; },
    record(S) { return { m: MODES[S.m].split(' — ')[0], v: D.desc2(S), R: +D.Rw(S).toFixed(2), I: +D.I(S).toFixed(3) }; },
    cols: [['m', 'العامل'], ['v', 'القيمة'], ['R', 'مقاومة السلك (Ω)'], ['I', 'التيار (A)']],
    explain(S) { const m = S.m; return Q26.ex('مقاومة السلك ' + Q33.f(D.Rw(S), 2) + ' Ω والتيار ' + Q33.f(D.I(S), 2) + ' A.', m === 'len' ? 'تصغير طول السلك يقلل مقاومته فيزداد التيار ويزداد توهج المصباح: المقاومة تتناسب طردياً مع الطول (الشكل 26).' : m === 'area' ? 'مضاعفة مساحة المقطع العرضي (سلكان ملفوفان) تقلل المقاومة إلى النصف فيزداد التيار: المقاومة تتناسب عكسياً مع المساحة (الشكل 28).' : m === 'temp' ? (S.cold ? 'بعض المواد عند انخفاض درجة حرارتها انخفاضاً كبيراً جداً تصبح فائقة التوصيل: مقاومتها تكاد تنعدم.' : 'ارتفاع درجة حرارة سلك النحاس يزيد مقاومته فيقل التيار ويقل توهج المصباح تدريجياً (الشكل 25). وهناك مواد تبقى مقاومتها ثابتة تقريباً مهما اختلفت درجة حرارتها (كالمنكانين والكونستنتان).') : 'لسلكين متساويين في الطول والمساحة ودرجة الحرارة: مقاومة الفضة أصغر من مقاومة الحديد، فالمقاومة خاصية فيزيائية للمادة (الشكل 31).', 'أسلاك نقل الكهرباء تصنع من النحاس أو الألمنيوم السميك لتقليل مقاومتها، وعنصر المدفأة يصنع من النيكل كروم.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D3 — أنواع المقاومات: الثابتة (حلقات الألوان) والمتغيرة (7-3، الأشكال 20 و 21) =============== */
(() => {
  const D = { id: 'g9_r_types', page: 59, fig: 'الأشكال 19 و 20 و 21',
    desc: 'فرق الجهد ضروري لتوليد تيار في الموصلات، وحركة الإلكترونات تواجه إعاقة أثناء انتقالها ناجمة عن تصادم الإلكترونات مع بعضها ومع ذرات الموصل مما يسبب ارتفاع درجة حرارة الموصل (الشكل 19). فالمقاومة الكهربائية هي الإعاقة التي يبديها الموصل للتيار المار خلاله، ووحدة قياسها هي الأوم. أنواعها: a) مقاومة ثابتة المقدار: يمكن معرفة مقدارها من ملاحظة ألوان الحلقات على سطحها بالاعتماد على جدول خاص (الشكل 20). b) مقاومة متغيرة المقدار (الريوستات)، ومنها مقاومة التحكم في مستوى الصوت (الشكل 21).',
    tags: 'المقاومة الكهربائية أنواع المقاومات ثابتة متغيرة حلقات الألوان جدول الألوان ريوستات التحكم بالصوت تصادم الإلكترونات رمز المقاومة',
    tools: ['مقاومات ثابتة ملونة', 'ريوستات', 'مقاومة للتحكم في مستوى الصوت'],
    steps: ['اضغط على كل حلقة ملونة في المقاومة الكبيرة لتغيير لونها، واقرأ قيمتها من جدول الألوان.', 'الحلقة الأولى والثانية رقمان، والثالثة عدد الأصفار (المضاعف).', 'أدر مقبض التحكم في الصوت (اسحبه دائرياً): المقاومة المتغيرة تغير شدة الصوت.', 'لاحظ رمزي المقاومة الثابتة والمتغيرة في الدوائر.'],
    concl: ['المقاومة الكهربائية: الإعاقة التي يبديها الموصل للتيار المار خلاله، وتقاس بالأوم Ω.', 'سبب المقاومة: تصادم الإلكترونات مع بعضها ومع ذرات الموصل، فترتفع درجة حرارته.', 'المقاومة الثابتة يعرف مقدارها من حلقات الألوان على سطحها.', 'المقاومة المتغيرة (الريوستات) يتغير مقدارها بتحريك منزلق أو تدوير مقبض.'],
    laws: ['g9_ohm'],
    controls: [],
    setup(S) { S.b = [2, 2, 1]; S.kn = .4; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S); return { w, h, ph, L, rx: ph ? w / 2 : L + (w - L) * .3, ry: ph ? 110 : 170, kx: ph ? w * .3 : L + (w - L) * .3, ky: ph ? 260 : 420 }; },
    val(S) { return (S.b[0] * 10 + S.b[1]) * Math.pow(10, S.b[2]); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, R = D.val(S), sc = g.ph ? .8 : 1.3;
      Q33.bg(ctx, w, h);
      // big resistor
      const len = 220 * sc, th = 64 * sc;
      Q33.res(ctx, g.rx, g.ry, R, { len, th, bands: S.b, label: '' });
      const bx = i => g.rx - len / 2 + (10 + i * 9 + 2.5) * 1 + 0; void bx;
      Q33.T(ctx, 'R = ' + (S.b[0] * 10 + S.b[1]) + ' × 10' + Q31.sup(S.b[2]) + ' = ' + Q33.sci(R, 3) + ' Ω', g.rx, g.ry + th / 2 + 26, { s: fs + 3, w: 900, c: '#fff', bg: '#7c2d12' });
      ['الرقم الأول', 'الرقم الثاني', 'المضاعف'].forEach((t, i) => Q33.T(ctx, t + ': ' + Q33.CCN[S.b[i]], g.rx - len / 2 + len * (.14 + i * .12) + len * .03, g.ry - th / 2 - 16 - (2 - i) * 18, { s: 10.5, w: 900, c: '#334155' }));
      // colour table
      if (!g.ph) { const X = g.L + (w - g.L) * .62, Y = 70; K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, X - 10, Y - 10, 240, 10 * 26 + 40, 10); ctx.fill(); ctx.stroke(); });
        Q33.T(ctx, 'جدول ألوان المقاومات', X + 110, Y + 6, { s: 11.5, w: 900, c: '#0f172a' });
        for (let i = 0; i < 10; i++) { const y = Y + 30 + i * 26; K.raw(ctx, () => { ctx.fillStyle = Q33.CC[i]; ctx.strokeStyle = '#94a3b8'; rr(ctx, X + 160, y - 9, 50, 18, 4); ctx.fill(); ctx.stroke(); }); Q33.T(ctx, Q33.CCN[i], X + 110, y, { s: 11, w: 800, c: '#334155' }); Q33.T(ctx, String(i), X + 30, y, { s: 12, w: 900, c: '#0f172a' }); Q33.T(ctx, '×10' + Q31.sup(i), X + 70, y, { s: 10, w: 800, c: '#64748b' }); } }
      // symbols
      Q33.T(ctx, 'رمز المقاومة الثابتة', g.rx - (g.ph ? 80 : 120), g.ry + th / 2 + 70, { s: 10.5, w: 900, c: '#0f172a' }); Q33.sym.res(ctx, g.rx - (g.ph ? 80 : 120), g.ry + th / 2 + 94, false, '');
      Q33.T(ctx, 'رمز المقاومة المتغيرة', g.rx + (g.ph ? 80 : 120), g.ry + th / 2 + 70, { s: 10.5, w: 900, c: '#0f172a' }); Q33.sym.res(ctx, g.rx + (g.ph ? 80 : 120), g.ry + th / 2 + 94, false, ''); Q33.arrow(ctx, g.rx + (g.ph ? 60 : 100), g.ry + th / 2 + 106, g.rx + (g.ph ? 100 : 140), g.ry + th / 2 + 80, '#0f172a');
      // volume knob + speaker
      if (!g.ph || h > 420) { const kx = g.kx, ky = g.ky, Rk = 36, a = -Math.PI * .75 + S.kn * Math.PI * 1.5;
        K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; rr(ctx, kx - 50, ky - 50, 100, 100, 14); ctx.fill(); ctx.fillStyle = '#6b7280'; ctx.beginPath(); ctx.arc(kx, ky, Rk, 0, TAU); ctx.fill(); ctx.strokeStyle = '#facc15'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + Math.cos(a - Math.PI / 2) * Rk * .85, ky + Math.sin(a - Math.PI / 2) * Rk * .85); ctx.stroke();
          const sx = kx + 150; ctx.fillStyle = '#334155'; rr(ctx, sx - 34, ky - 50, 68, 100, 10); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(sx, ky + 12, 22, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(sx, ky - 30, 9, 0, TAU); ctx.fill();
          const vol = 1 - S.kn; ctx.strokeStyle = 'rgba(37,99,235,.8)'; ctx.lineWidth = 3; for (let k = 1; k <= Math.round(vol * 5); k++) { ctx.beginPath(); ctx.arc(sx + 30, ky + 12, 10 + k * 12, -.6, .6); ctx.stroke(); } });
        Q33.T(ctx, 'مقاومة التحكم في مستوى الصوت: ' + Q33.f(S.kn * 10, 1) + ' kΩ', kx + 70, ky + 72, { s: fs, w: 900, c: '#334155' }); Q33.T(ctx, 'الصوت ' + (S.kn > .8 ? 'خافت جداً' : S.kn > .5 ? 'منخفض' : S.kn > .2 ? 'متوسط' : 'عالٍ'), kx + 150, ky - 66, { s: fs, w: 900, c: '#fff', bg: '#2563eb' }); }
      Q33.banner(ctx, w, 'اضغط الحلقات الملونة لتغييرها، وأدر مقبض الصوت');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), sc = g.ph ? .8 : 1.3, len = 220 * sc, th = 64 * sc, L = [];
      for (let i = 0; i < 3; i++) L.push({ id: 'band' + i, x: g.rx - len / 2 + len * (.14 + i * .12) + len * .0325, y: g.ry, w: Math.max(18, len * .1), h: th + 10, tip: 'اضغط لتغيير لون الحلقة', idle: i ? undefined : 'اضغط الحلقة ✋', click: S2 => { const B = S2.b.slice(); B[i] = (B[i] + 1) % (i === 2 ? 7 : 10); if (i === 0 && B[0] === 0) B[0] = 1; S2.b = B; S2.bk = B.join(''); } });
      if (!g.ph || g.h > 420) L.push({ id: 'knob', x: g.kx, y: g.ky, r: 40, axis: 'xy', keep: true, tip: 'اسحب دائرياً لتدوير المقبض', idle: 'أدر المقبض ✋', drag: (S2, d) => { let a = Math.atan2(d.y - g.ky, d.x - g.kx) + Math.PI / 2; if (a > Math.PI) a -= TAU; S2.kn = clamp((a + Math.PI * .75) / (Math.PI * 1.5), 0, 1); } });
      return L; },
    readings(S) { return [rd('الحلقات', S.b.map(c => Q33.CCN[c]).join(' ، ')), rd('قيمة المقاومة', Q33.sci(D.val(S), 3) + ' Ω'), rd('مقاومة الصوت', Q33.f(S.kn * 10, 1) + ' kΩ')]; },
    explain(S) { return Q26.ex('الحلقات ' + S.b.map(c => Q33.CCN[c]).join(' ، ') + ' تعني ' + Q33.sci(D.val(S), 3) + ' Ω.', 'الحلقة الأولى والثانية رقمان، والثالثة عدد الأصفار التي تضاف (المضاعف 10 مرفوعة لرقم لونها). الحلقة الذهبية في الطرف تدل على دقة القيمة.', 'مقبض الصوت في المذياع والتلفاز مقاومة متغيرة: زيادة المقاومة تقلل التيار فيخفت الصوت.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — نشاط ربط المصابيح على التوالي (9-3 a، الشكلان 32 و 33) =============== */
(() => {
  const V = 6, RLp = 6;
  const D = { id: 'g9_k_series', page: 67, fig: 'الشكلان 32 و 33',
    desc: 'ربط المقاومات على التوالي يوفر نوعاً من الربط مسرباً واحداً لانسياب التيار: I = I₁ = I₂ ، V_total = V₁ + V₂ ، R_eq = R₁ + R₂. نشاط: نربط أحد المصابيح على التوالي مع المفتاح والبطارية ونلاحظ توهجه، ثم نربط مصباحين، ثم الثلاثة: نجد أن توهجهما متساوٍ وتوهج كل منهما أقل من توهج المصباح لو ربط لوحده، ونجد أن مقدار توهج المصابيح الثلاثة متساوٍ وأقل مما هو عليه في الحالة السابقة.',
    tags: 'نشاط ربط المصابيح على التوالي مقاومات توالي مسار واحد التيار متساو المقاومة المكافئة Req=R1+R2 فرق الجهد يتوزع',
    tools: ['ثلاثة مصابيح متماثلة a و b و c', 'بطارية فولطيتها مناسبة', 'أسلاك توصيل', 'مفتاح كهربائي'],
    steps: ['اختر «مصباح واحد» وأغلق المفتاح: لاحظ توهجه وقراءة الأميتر.', 'اختر «مصباحان» ثم «ثلاثة مصابيح»: ماذا يحدث لتوهج كل مصباح وللتيار؟', 'لاحظ فرق الجهد على كل مصباح: مجموعها يساوي فولطية البطارية.', 'اضغط على أحد المصابيح لإتلافه (فك المصباح): ماذا يحدث للمصابيح الأخرى؟'],
    concl: ['تيار الدائرة المتوالية الربط يكون متساوياً في جميع أجزائها.', 'يقل مقدار التيار بازدياد عدد المصابيح المربوطة على التوالي بسبب ازدياد المقاومة المكافئة.', 'فرق الجهد الكلي يتوزع على المصابيح: V_total = V₁ + V₂ + V₃.', 'المقاومة المكافئة: R_eq = R₁ + R₂ + R₃.', 'عند تلف أحد المصابيح تنطفئ جميع المصابيح لأنه يوجد مسرب واحد للتيار.'],
    laws: ['g9_series'],
    controls: [],
    setup(S) { S.n = 1; S.on = 1; S.bl = -1; S.fp = 0; },
    I(S) { return S.on && (S.bl < 0 || S.bl >= S.n) ? V / (S.n * RLp) : 0; },
    update(S, dt) { Q33.adv(S, dt, D.I(S), 160); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 14 : Math.min(w - 330, x0 + 620), yt = ph ? 160 : 210, yb = ph ? Math.min(h - 150, 320) : Math.min(h - 220, 470); const W = x1 - x0; return { w, h, ph, L, x0, x1, yt, yb, bx: x0 + W * .3, xs1: x0 + W * .62, xs2: x0 + W * .78, xa: x0 + W * .9 }; },
    lx(S, g, i) { const n = S.n, W = g.x1 - g.x0; return g.x0 + W * (n === 1 ? .5 : .2 + i * .6 / (n - 1)); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, I = D.I(S), I1 = V / RLp, n = S.n;
      Q33.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.yt - 110, g.x1 - g.x0 + 28, g.yb - g.yt + 160);
      const bt = Q33.bat(ctx, g.bx, g.yb + 26, { V, w: 74, h: 52 }); Q33.sw(ctx, g.xs1, g.xs2, g.yb, S.on);
      const L = []; for (let i = 0; i < n; i++) L.push(Q33.bulb(ctx, D.lx(S, g, i), g.yt, (I / I1) ** 2 * 1.1, { burnt: S.bl === i, label: 'abc'[i] }));
      const W = [[bt.p, [bt.p[0], g.yb], [g.xs1, g.yb]], [[g.xs2, g.yb], [g.x1, g.yb], [g.x1, g.yt], L[n - 1].b]];
      for (let i = n - 1; i > 0; i--) W.push([L[i].a, L[i - 1].b]);
      W.push([L[0].a, [g.x0, g.yt], [g.x0, g.yb], [bt.n[0], g.yb], bt.n]);
      W.forEach((p, i) => Q33.wire(ctx, p, { col: i === W.length - 1 ? '#111827' : '#dc2626' })); if (I) W.forEach(p => Q33.flow(ctx, p, S.fp, 'c'));
      for (let i = 0; i < n; i++) Q33.T(ctx, 'V' + '₁₂₃'[i] + ' = ' + Q33.f(I * RLp, 2) + ' V', D.lx(S, g, i), g.yt - 74, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' });
      Q33.T(ctx, 'I = ' + Q33.f(I, 2) + ' A في كل الأجزاء', g.x1 - 80, (g.yt + g.yb) / 2, { s: fs + 1, w: 900, c: '#fff', bg: '#a16207' });
      Q33.T(ctx, 'R_eq = ' + Array.from({ length: n }, () => RLp).join(' + ') + ' = ' + n * RLp + ' Ω', g.x0 + (g.x1 - g.x0) * .32, (g.yt + g.yb) / 2, { s: fs + 1, w: 900, c: '#0f172a', bg: '#fde047' });
      if (S.bl >= 0 && S.bl < n && S.on) Q33.T(ctx, 'تلف مصباح واحد ⟵ انطفأت جميع المصابيح: مسرب واحد للتيار', (g.x0 + g.x1) / 2, g.yt - 100, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' });
      if (!g.ph) { const rows = [1, 2, 3].map(k => ({ t: k + ' ' + (k === 1 ? 'مصباح' : 'مصابيح') + ': I = ' + Q33.f(V / (k * RLp), 2) + ' A ، التوهج ' + Q33.glow((1 / k) ** 2 * 1.1), c: k === n ? '#a16207' : '#475569', w: k === n ? 900 : 700 })); Q33.card(ctx, S, rows.concat([{ t: 'V_total = V₁ + V₂ + V₃ = ' + V + ' V', c: '#b91c1c', w: 900 }]), { title: 'مقارنة: مصباح ، مصباحان ، ثلاثة', wd: 290, y: 70 }); }
      Q33.drawChips(ctx, D.chips(S, g)); Q33.banner(ctx, w, 'اختر عدد المصابيح، واضغط على مصباح لإتلافه');
    },
    chips(S, g) { return Q33.chips(S, 'n', [['1', 'مصباح واحد'], ['2', 'مصباحان'], ['3', 'ثلاثة مصابيح'], ['fix', '↺ إصلاح المصابيح']], g.h - 84, String(S.n), (S2, k) => { if (k === 'fix') S2.bl = -1; else S2.n = +k; }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [{ id: 'sw', x: (g.xs1 + g.xs2) / 2, y: g.yb - 8, w: g.xs2 - g.xs1 + 30, h: 46, tip: 'اضغط لفتح/إغلاق المفتاح', click: S2 => { S2.on = !S2.on; } }];
      for (let i = 0; i < S.n; i++) L.push({ id: 'lamp' + i, x: D.lx(S, g, i), y: g.yt - 34, w: 50, h: 56, tip: 'اضغط لإتلاف المصباح أو إصلاحه', idle: 'اضغط لإتلافه ✋', click: S2 => { S2.bl = S2.bl === i ? -1 : i; } });
      return L.concat(D.chips(S, g)); },
    readings(S) { const I = D.I(S); return [rd('عدد المصابيح', S.n), rd('التيار I (نفسه في كل مصباح)', Q33.f(I, 2) + ' A'), rd('فرق الجهد على كل مصباح', Q33.f(I * RLp, 2) + ' V'), rd('المقاومة المكافئة', S.n * RLp + ' Ω')]; },
    record(S) { const I = D.I(S); return { n: S.n, I: +I.toFixed(3), v: +(I * RLp).toFixed(2), R: S.n * RLp }; },
    cols: [['n', 'عدد المصابيح'], ['I', 'I (A)'], ['v', 'V لكل مصباح'], ['R', 'R_eq (Ω)']],
    explain(S) { const I = D.I(S); if (S.bl >= 0 && S.bl < S.n) return Q26.ex('انطفأت جميع المصابيح.', 'في الربط على التوالي يوجد مسرب واحد للتيار، فعند عطب (تلف) أحد المصابيح أو رفعه تنطفئ جميع المصابيح الأخرى (الشكل 36).', 'لهذا لا تربط مصابيح البيت على التوالي.'); return Q26.ex(S.n + ' ' + (S.n > 1 ? 'مصابيح' : 'مصباح') + ': التيار ' + Q33.f(I, 2) + ' A وتوهج كل مصباح ' + Q33.glow((I / (V / RLp)) ** 2 * 1.1) + '.', 'المقاومة المكافئة = مجموع المقاومات، فكلما زاد عدد المصابيح زادت المقاومة وقلّ التيار المتساوي في جميع الأجزاء، ويتوزع فرق جهد البطارية على المصابيح.', 'مصابيح الزينة القديمة كانت تربط على التوالي.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — نشاط ربط المصابيح على التوازي (9-3 b، الشكلان 34 و 35) =============== */
(() => {
  const V = 6, RLp = 6;
  const D = { id: 'g9_k_parallel', page: 68, fig: 'الشكلان 34 و 35',
    desc: 'ربط المقاومات على التوازي يوفر عدة مسارات لانسياب التيار: V = V₁ = V₂ ، I_total = I₁ + I₂ ، 1/R_eq = 1/R₁ + 1/R₂. نشاط: نربط أحد المصابيح على التوالي مع المفتاح والبطارية، ثم نربط مصباحين على التوازي ونربط مجموعتهما مع المفتاح والبطارية، ثم الثلاثة: نجد أن مقدار توهج المصابيح متساوٍ ويماثل توهج المصباح في الحالة الأولى والثانية.',
    tags: 'نشاط ربط المصابيح على التوازي مقاومات توازي عدة مسارات التيار الكلي مجموع فرق الجهد متساو المقاومة المكافئة',
    tools: ['ثلاثة مصابيح متماثلة a و b و c', 'بطارية', 'أسلاك توصيل', 'مفتاح كهربائي', 'أميترات للفروع'],
    steps: ['اختر «مصباح واحد» وأغلق المفتاح، ثم «مصباحان» ثم «ثلاثة مصابيح» على التوازي.', 'قارن توهج المصابيح في الحالات الثلاث: هل يتغير؟', 'لاحظ تيار كل فرع والتيار الرئيسي: I_total = I₁ + I₂ + I₃.', 'اضغط على مصباح لإتلافه: هل تنطفئ المصابيح الأخرى؟'],
    concl: ['فرق الجهد عبر أجزاء الدائرة المتوازية الربط يكون متساوياً.', 'التيار الرئيسي في الدائرة يساوي مجموع التيارات المارة في المصابيح المربوطة على التوازي، ويزداد بزيادة عدد المصابيح.', 'المقاومة المكافئة في دائرة التوازي تقل بزيادة عدد المصابيح (المقاومات) المربوطة على التوازي.', 'عند تلف أحد المصابيح تبقى المصابيح الأخرى متوهجة.'],
    laws: ['g9_parallel'],
    controls: [],
    setup(S) { S.n = 2; S.on = 1; S.bl = -1; S.fp = 0; S.fq = [0, 0, 0]; },
    Ib(S, i) { return S.on && S.bl !== i && i < S.n ? V / RLp : 0; },
    It(S) { let t = 0; for (let i = 0; i < S.n; i++) t += D.Ib(S, i); return t; },
    update(S, dt) { Q33.adv(S, dt, D.It(S), 70); for (let i = 0; i < 3; i++) S.fq[i] += D.Ib(S, i) * 70 * dt; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 14 : Math.min(w - 330, x0 + 600), yt = ph ? 110 : 160, yb = ph ? Math.min(h - 140, 330) : Math.min(h - 200, 500); const W = x1 - x0; return { w, h, ph, L, x0, x1, yt, yb, xa: x0 + W * .22, xb: x0 + W * .78, bx: x0 + W * .3, xs1: x0 + W * .55, xs2: x0 + W * .7, s: ph ? .75 : 1 }; },
    by(S, g, i) { const n = S.n, top = g.yt + 20, bot = g.yb - 70; return n === 1 ? (top + bot) / 2 : top + i * (bot - top) / (n - 1); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, It = D.It(S), n = S.n;
      Q33.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.yt - 70, g.x1 - g.x0 + 28, g.yb - g.yt + 120);
      const bt = Q33.bat(ctx, g.bx, g.yb + 26, { V, w: 74, h: 52 }); Q33.sw(ctx, g.xs1, g.xs2, g.yb, S.on);
      const rT = [], lT = [];
      for (let i = 0; i < n; i++) { const y = D.by(S, g, i) + 26 * g.s, x = (g.xa + g.xb) / 2; const lb = Q33.bulb(ctx, x, y, D.Ib(S, i) / (V / RLp) * 1.1, { burnt: S.bl === i, s: g.s }); const Wb = [[g.xb, y], lb.b], Wa = [lb.a, [g.xa, y]]; Q33.wire(ctx, Wb, { col: '#dc2626' }); Q33.wire(ctx, Wa, { col: '#111827' }); if (D.Ib(S, i)) { Q33.flow(ctx, Wb, S.fq[i], 'c'); Q33.flow(ctx, Wa, S.fq[i], 'c'); }
        Q33.T(ctx, 'abc'[i] + ': I' + '₁₂₃'[i] + ' = ' + Q33.f(D.Ib(S, i), 1) + ' A', g.xb + (g.ph ? -40 : 56), y - 20, { s: fs, w: 900, c: '#fff', bg: D.Ib(S, i) ? '#a16207' : '#64748b' }); rT.push(y); lT.push(y); }
      const top = Math.min(...rT);
      const Wr = [bt.p, [bt.p[0], g.yb], [g.xs1, g.yb]], Wr2 = [[g.xs2, g.yb], [g.xb, g.yb], [g.xb, top]], Wl = [[g.xa, top], [g.xa, g.yb], [bt.n[0], g.yb], bt.n];
      Q33.wire(ctx, Wr, { col: '#dc2626' }); Q33.wire(ctx, Wr2, { col: '#dc2626' }); Q33.wire(ctx, Wl, { col: '#111827' }); if (It) { Q33.flow(ctx, Wr, S.fp, 'c'); Q33.flow(ctx, Wr2, S.fp, 'c'); Q33.flow(ctx, Wl, S.fp, 'c'); }
      K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; rT.forEach(y => { ctx.beginPath(); ctx.arc(g.xb, y, 4.5, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(g.xa, y, 4.5, 0, TAU); ctx.fill(); }); });
      Q33.T(ctx, 'I_total = ' + Array.from({ length: n }, (_, i) => Q33.f(D.Ib(S, i), 1)).join(' + ') + ' = ' + Q33.f(It, 1) + ' A', (g.x0 + g.x1) / 2, g.yt - 48, { s: fs + 1, w: 900, c: '#fff', bg: '#b91c1c' });
      if (!g.ph) { const Req = RLp / n; Q33.card(ctx, S, [{ t: 'V = V₁ = V₂ = V₃ = ' + V + ' V على كل مصباح', c: '#b91c1c', w: 900 }, { t: '1/R_eq = ' + Array.from({ length: n }, () => '1/' + RLp).join(' + ') + ' ⟸ R_eq = ' + Q33.f(Req, 2) + ' Ω', c: '#0f172a', w: 800 }, { t: 'التوهج متساوٍ ويماثل توهج مصباح واحد', c: '#15803d', w: 900 }, { t: S.bl >= 0 && S.bl < n ? 'تلف مصباح: البقية ما زالت متوهجة ✔' : 'اضغط على مصباح لإتلافه', c: S.bl >= 0 && S.bl < n ? '#15803d' : '#475569', w: 800 }], { title: 'ربط التوازي — عدة مسارات', wd: 290, y: 70 }); }
      Q33.drawChips(ctx, D.chips(S, g)); Q33.banner(ctx, w, 'اختر عدد المصابيح على التوازي، واضغط على مصباح لإتلافه');
    },
    chips(S, g) { return Q33.chips(S, 'n', [['1', 'مصباح واحد'], ['2', 'مصباحان'], ['3', 'ثلاثة مصابيح'], ['fix', '↺ إصلاح المصابيح']], g.h - 84, String(S.n), (S2, k) => { if (k === 'fix') S2.bl = -1; else S2.n = +k; }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [{ id: 'sw', x: (g.xs1 + g.xs2) / 2, y: g.yb - 8, w: g.xs2 - g.xs1 + 30, h: 46, tip: 'اضغط لفتح/إغلاق المفتاح', click: S2 => { S2.on = !S2.on; } }];
      for (let i = 0; i < S.n; i++) L.push({ id: 'lamp' + i, x: (g.xa + g.xb) / 2, y: D.by(S, g, i) + 26 * g.s - 34 * g.s, w: 50, h: 56 * g.s, tip: 'اضغط لإتلاف المصباح أو إصلاحه', idle: 'اضغط لإتلافه ✋', click: S2 => { S2.bl = S2.bl === i ? -1 : i; } });
      return L.concat(D.chips(S, g)); },
    readings(S) { return [rd('عدد المصابيح', S.n), rd('فرق الجهد على كل مصباح', (S.on ? V : 0) + ' V'), rd('تيار كل فرع', Q33.f(V / RLp, 2) + ' A'), rd('التيار الرئيسي', Q33.f(D.It(S), 2) + ' A'), rd('المقاومة المكافئة', Q33.f(RLp / S.n, 2) + ' Ω')]; },
    record(S) { return { n: S.n, It: +D.It(S).toFixed(2), R: +(RLp / S.n).toFixed(2) }; },
    cols: [['n', 'عدد المصابيح'], ['It', 'التيار الرئيسي (A)'], ['R', 'R_eq (Ω)']],
    explain(S) { if (S.bl >= 0 && S.bl < S.n) return Q26.ex('تلف مصباح ' + 'abc'[S.bl] + ' لكن البقية ما زالت متوهجة.', 'في الربط على التوازي توجد عدة مسارات، فعند عطب أحد المصابيح يتوقف التيار في فرعه فقط (الشكل 37).', 'لذلك تربط الأجهزة الكهربائية المنزلية على التوازي.'); return Q26.ex('توهج المصابيح متساوٍ ويماثل توهج مصباح واحد، والتيار الرئيسي ' + Q33.f(D.It(S), 1) + ' A.', 'كل مصباح متصل مباشرة بقطبي البطارية فيكون فرق الجهد عليه 6 V نفسه، والتيار الرئيسي يساوي مجموع تيارات الفروع، والمقاومة المكافئة تقل بزيادة عدد الفروع.', 'كلما شغّلت جهازاً إضافياً في البيت يزداد التيار الرئيسي في العداد.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E3 — مقارنة: التوالي مع التوازي جنباً إلى جنب (الشكلان 36 و 37) =============== */
(() => {
  const V = 6, RLp = 6, N = 4;
  const D = { id: 'g9_k_compare', page: 70, fig: 'الشكلان 36 و 37',
    desc: 'من مزايا طريقة ربط المصابيح على التوالي هو عند عطب (تلف) أو رفع أحد المصابيح فإن جميع المصابيح الأخرى المربوطة معه تنطفئ (لا تتوهج) لأنه يوجد مسرب واحد لحركة الشحنات خلال الدائرة. ومن مزايا ربط المصابيح على التوازي هو عند عطب أو رفع أحد المصابيح فإن جميع المصابيح الأخرى المربوطة معه تبقى متوهجة لأنه يتوقف انسياب التيار في فرع ذلك المصباح فقط، وسبب ذلك أن جميع المصابيح متصلة مباشرة إلى مصدر الفولطية. لذا فإن معظم الدوائر الكهربائية تستعمل فيها طريقة ربط الأجهزة على التوازي، وجميع الأجهزة الكهربائية المنزلية تربط بطريقة ربط التوازي.',
    tags: 'مقارنة ربط التوالي التوازي تلف مصباح مسرب واحد عدة مسارات الأجهزة المنزلية الشكل 36 الشكل 37',
    tools: ['أربعة مصابيح على التوالي', 'أربعة مصابيح على التوازي', 'مصدران متماثلان'],
    steps: ['اضغط على أي مصباح في جهة التوالي لإتلافه: ماذا يحدث للبقية؟ (الشكل 36)', 'اضغط على مصباح في جهة التوازي: ماذا يحدث للبقية؟ (الشكل 37)', 'قارن توهج المصابيح في الجهتين قبل الإتلاف.', 'أيهما تختار لربط أجهزة البيت؟ ولماذا؟'],
    concl: ['التوالي: مسرب واحد، تلف مصباح يطفئ الجميع، والتوهج أضعف.', 'التوازي: عدة مسارات، تلف مصباح لا يؤثر في البقية، وكل مصباح يأخذ فولطية المصدر كاملة.', 'جميع الأجهزة الكهربائية المنزلية تربط على التوازي.'],
    laws: ['g9_series', 'g9_parallel'],
    controls: [],
    setup(S) { S.bs = -1; S.bp = -1; S.side = 's'; S.fp = 0; S.fq = 0; },
    Is(S) { return S.bs < 0 ? V / (N * RLp) : 0; },
    update(S, dt) { Q33.adv(S, dt, D.Is(S), 200); S.fq += dt * 70; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S); const pw = ph ? w - L - 12 : (w - L - 40) / 2; return { w, h, ph, L, pw, ys: ph ? 120 : 200, sides: ph ? [S.side] : ['s', 'p'] }; },
    px(S, g, side) { return g.ph ? g.L : side === 's' ? g.L + 10 : g.L + 30 + g.pw; },
    lampX(g, x0, i) { return x0 + 50 + i * (g.pw - 100) / (N - 1); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, sc = g.ph ? .7 : .9;
      Q33.bg(ctx, w, h);
      g.sides.forEach(side => { const x0 = D.px(S, g, side), y = g.ys + 40, ser = side === 's', bl = ser ? S.bs : S.bp, by = y + 150;
        Q33.board(ctx, x0, g.ys - 60, g.pw, 300);
        Q33.T(ctx, ser ? 'ربط على التوالي — الشكل 36' : 'ربط على التوازي — الشكل 37', x0 + g.pw / 2, g.ys - 40, { s: fs + 1, w: 900, c: '#fff', bg: ser ? '#b45309' : '#0f766e' });
        const L = []; for (let i = 0; i < N; i++) { const b = ser ? (bl < 0 ? .3 : 0) : (bl === i ? 0 : 1); L.push(Q33.bulb(ctx, D.lampX(g, x0, i), y, b, { s: sc, burnt: bl === i })); }
        const c = Q33.cell(ctx, x0 + g.pw / 2, by, { w: 80, h: 30, label: V + ' V' });
        if (ser) { const W = [[c.p, [x0 + g.pw - 18, by], [x0 + g.pw - 18, y], L[N - 1].b]]; for (let i = N - 1; i > 0; i--) W.push([L[i].a, L[i - 1].b]); W.push([L[0].a, [x0 + 18, y], [x0 + 18, by], c.n]); W.forEach(p => Q33.wire(ctx, p, { col: '#dc2626' })); if (bl < 0) W.forEach(p => Q33.flow(ctx, p, S.fp, 'c')); }
        else { const r1 = y + 34, r2 = y + 52; const R1 = [c.p, [x0 + g.pw - 18, by], [x0 + g.pw - 18, r1], [x0 + 40, r1]], R2 = [[x0 + g.pw - 60, r2], [x0 + 18, r2], [x0 + 18, by], c.n]; Q33.wire(ctx, R1, { col: '#dc2626' }); Q33.wire(ctx, R2, { col: '#111827' }); Q33.flow(ctx, R1, S.fq, 'c'); Q33.flow(ctx, R2, S.fq, 'c');
          L.forEach((lb, i) => { if (bl === i) return; Q33.wire(ctx, [lb.b, [lb.b[0], r1]], { col: '#dc2626' }); Q33.wire(ctx, [lb.a, [lb.a[0], r2]], { col: '#111827' }); }); }
        const msg = ser ? (bl < 0 ? 'التوهج خافت: الفولطية تتوزع على 4 مصابيح' : 'تلف مصباح ⟵ انطفأت جميع المصابيح ✖') : (bl < 0 ? 'كل مصباح متوهج بفولطية المصدر كاملة' : 'تلف مصباح ⟵ البقية ما زالت متوهجة ✔');
        Q33.T(ctx, msg, x0 + g.pw / 2, by + 44, { s: fs, w: 900, c: '#fff', bg: (ser && bl >= 0) ? '#b91c1c' : (!ser && bl >= 0) ? '#15803d' : '#475569' }); });
      Q33.T(ctx, '🏠 لذا تربط جميع الأجهزة الكهربائية المنزلية على التوازي', g.ph ? w / 2 : (w + g.L) / 2, g.ys + 290, { s: fs + 1, w: 900, c: '#fff', bg: '#7c3aed' });
      Q33.drawChips(ctx, D.chips(S, g)); Q33.banner(ctx, w, 'اضغط على أي مصباح لإتلافه وقارن الجهتين');
    },
    chips(S, g) { const L = [['fix', '↺ إصلاح جميع المصابيح']]; if (g.ph) L.unshift(['s', 'التوالي'], ['p', 'التوازي']); return Q33.chips(S, 'cm', L, g.h - 84, g.ph ? S.side : '', (S2, k) => { if (k === 'fix') { S2.bs = -1; S2.bp = -1; } else S2.side = k; }, { bw: 200 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), sc = g.ph ? .7 : .9, L = []; g.sides.forEach(side => { const x0 = D.px(S, g, side); for (let i = 0; i < N; i++) L.push({ id: side + 'lamp' + i, x: D.lampX(g, x0, i), y: g.ys + 40 - 30 * sc, w: 44, h: 50, tip: 'اضغط لإتلاف المصباح أو إصلاحه', idle: 'اضغط لإتلافه ✋', click: S2 => { const k = side === 's' ? 'bs' : 'bp'; S2[k] = S2[k] === i ? -1 : i; } }); }); return L.concat(D.chips(S, g)); },
    readings(S) { return [rd('التوالي', S.bs < 0 ? 'جميع المصابيح متوهجة (خافتة)' : 'جميعها منطفئة'), rd('التوازي', S.bp < 0 ? 'جميعها متوهجة' : 'ثلاثة متوهجة')]; },
    explain(S) { return Q26.ex(S.bs >= 0 ? 'في جهة التوالي انطفأت كل المصابيح عند تلف واحد.' : S.bp >= 0 ? 'في جهة التوازي بقيت المصابيح الأخرى متوهجة.' : 'المصابيح على التوالي أخفت من المصابيح على التوازي.', 'التوالي مسرب واحد لحركة الشحنات، أما التوازي فعدة مسارات وجميع المصابيح متصلة مباشرة بمصدر الفولطية.', 'جميع الأجهزة الكهربائية المنزلية تربط على التوازي: إطفاء الثلاجة لا يطفئ المصابيح.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E4 — المثال ص 71 ومسائل الربط (س2 و س3 المسائل ص 78، س4 و س5 ص 75–76) على جهاز واحد بقيم قابلة للتغيير =============== */
(() => {
  const EX = {
    e71: { t: 'مثال ص 71', par: 1, R: [6, 9, 18], V: 18, q: 'ثلاث مقاومات R₁ = 6 Ω ، R₂ = 9 Ω ، R₃ = 18 Ω مربوطة على التوازي عبر فرق جهد 18 V. احسب: المقاومة المكافئة، التيار في كل مقاومة، التيار الكلي.', lines: ['1/R_eq = 1/6 + 1/9 + 1/18', '1/R_eq = (3 + 2 + 1) / 18 = 6/18', 'R_eq = 3 Ω', 'V_total = V₁ = V₂ = V₃ = 18 V', 'I₁ = 18/6 = 3 A ، I₂ = 18/9 = 2 A ، I₃ = 18/18 = 1 A', 'I_total = 3 + 2 + 1 = 6 A = V / R_eq = 18 / 3'] },
    s2: { t: 'س2 مسائل ص78', par: 1, R: [3, 6, 9], V: 18, q: 'ثلاث مقاومات 3 Ω و 6 Ω و 9 Ω على التوازي، وقراءة الأميتر الرئيسي I = 11 A. احسب: المقاومة المكافئة، فرق الجهد على كل مقاومة، التيار في كل مقاومة.', lines: ['1/R_eq = 1/3 + 1/6 + 1/9 = (6 + 3 + 2)/18 = 11/18', 'R_eq = 18/11 ≈ 1.6 Ω', 'V = I × R_eq = 11 × 18/11 = 18 V = V₁ = V₂ = V₃', 'I₁ = 18/3 = 6 A ، I₂ = 18/6 = 3 A ، I₃ = 18/9 = 2 A'] },
    s3: { t: 'س3 مسائل ص78', par: 0, R: [4, 2], V: 12, q: 'المقاومتان R و 2 Ω ربطتا على التوالي ثم ربطتا على طرفي مصدر فرق جهده 12 V فانساب تيار 2 A. احسب: المقاومة المجهولة R ، فرق الجهد على كل مقاومة.', lines: ['R_eq = V / I = 12 / 2 = 6 Ω', 'R_eq = R + 2 ⟸ R = 6 − 2 = 4 Ω', 'V₂ = I × 2 = 2 × 2 = 4 V', 'V_R = I × R = 2 × 4 = 8 V'] },
    q4: { t: 'س1-4 ص 75', par: 1, R: [19, 1], V: 1.9, q: 'مقاومتان على التوازي، التيار الكلي I_total = 2 A والتيار في R₁ هو 0.1 A. التيار في R₂ يساوي: 0.1 A ، 2 A ، 2.1 A ، 1.9 A ؟', lines: ['I_total = I₁ + I₂', 'I₂ = I_total − I₁ = 2 − 0.1', 'I₂ = 1.9 A — الجواب d'] },
    q5: { t: 'س1-5 ص 76', par: 1, R: [2, 3, 6], V: 6, q: 'إذا كانت قراءة الأميتر المربوط في الدائرة تساوي 6 A (R₁ = 2 Ω ، R₂ = 3 Ω ، R₃ = 6 Ω على التوازي) فإن قراءة الفولطميتر تساوي: 6 V ، 12 V ، 18 V ، 3 V ؟', lines: ['1/R_eq = 1/2 + 1/3 + 1/6 = (3 + 2 + 1)/6 = 1', 'R_eq = 1 Ω', 'V = I × R_eq = 6 × 1 = 6 V — الجواب a'] }
  };
  const D = { id: 'g9_k_example', page: 71, fig: 'مثال ص 71 + المسائل',
    desc: 'نحل مثال الكتاب (ص 71) وأسئلة الربط ومسائل الفصل على دائرة واحدة قيمها قابلة للتغيير: المقاومات R₁ و R₂ و R₃ وفرق جهد المصدر وطريقة الربط (توالٍ أو توازٍ)، مع أميتر في كل فرع وقراءة لفرق الجهد على كل مقاومة. التوالي: R_eq = R₁ + R₂ + R₃ والتيار نفسه. التوازي: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃ وفرق الجهد نفسه و I_total = I₁ + I₂ + I₃.',
    tags: 'مثال مسائل ربط المقاومات توالي توازي المقاومة المكافئة تيار الفروع فرق الجهد قانون أوم حل خطوة بخطوة',
    tools: ['ثلاث مقاومات', 'مصدر فرق جهد', 'أميترات', 'فولطميتر'],
    steps: ['اختر مثالاً من الأسفل: تتغير الدائرة وقيمها كما في الكتاب.', 'اضغط «الخطوة التالية» لترى الحل خطوة بخطوة، وقارن بقراءات الأميترات على الدائرة.', 'غيّر R₁ و R₂ و R₃ و V من لوحة التحكم، أو بدّل بين التوالي والتوازي، وتأكد من القوانين.'],
    concl: ['التوالي: التيار نفسه في كل المقاومات، والفولطية تتوزع، و R_eq = R₁ + R₂ + R₃.', 'التوازي: الفولطية نفسها على كل مقاومة، والتيار الكلي مجموع التيارات، و 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃.', 'المقاومة المكافئة للتوازي أصغر من أصغر مقاومة.'],
    laws: ['g9_series', 'g9_parallel', 'g9_ohm'],
    controls: [R('R1', 'R₁', 1, 30, 6, 1, 'Ω'), R('R2', 'R₂', 1, 30, 9, 1, 'Ω'), R('R3', 'R₃ (0 = غير موجودة)', 0, 30, 18, 1, 'Ω'), R('V', 'فرق جهد المصدر V', 1, 24, 18, .1, 'V'), TG('par', 'ربط على التوازي', true, null, 'parallel')],
    setup(S) { S.ex = 'e71'; S.k = 0; S.fq = [0, 0, 0, 0]; },
    sol(S) { const p = S.p, R = [p.R1, p.R2, p.R3].filter(r => r > 0), V = p.V; if (p.par !== false) { const Req = 1 / R.reduce((a, r) => a + 1 / r, 0), I = R.map(r => V / r); return { R, Req, I, It: V / Req, Vr: R.map(() => V), par: 1 }; } const Req = R.reduce((a, r) => a + r, 0), It = V / Req; return { R, Req, I: R.map(() => It), It, Vr: R.map(r => It * r), par: 0 }; },
    update(S, dt) { const s = D.sol(S); S.fq[3] += clamp(s.It * 14, 0, 220) * dt; s.I.forEach((I, i) => { S.fq[i] += clamp(I * 14, 0, 220) * dt; }); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), X0 = L + (ph ? 20 : 60), X1 = ph ? w - 24 : Math.min(w - 400, X0 + 440), Y0 = ph ? 110 : 140, Y1 = ph ? Math.min(h - 140, 330) : Math.min(h - 160, 480); return { w, h, ph, L, X0, X1, Y0, Y1 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, s = D.sol(S), n = s.R.length, xm = (g.X0 + g.X1) / 2;
      Q33.bg(ctx, w, h); K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, g.X0 - 50, g.Y0 - 60, g.X1 - g.X0 + 100, g.Y1 - g.Y0 + 110, 14); ctx.fill(); ctx.stroke(); });
      const ymid = (g.Y0 + g.Y1) / 2, col = '#0f172a';
      // source on the left side (vertical), main ammeter on the bottom
      Q33.sym.path(ctx, [[g.X0, ymid - 20], [g.X0, g.Y0]]); Q33.sym.path(ctx, [[g.X0, ymid + 20], [g.X0, g.Y1], [xm - 16, g.Y1]]); Q33.sym.line(ctx, [xm + 16, g.Y1], [g.X1, g.Y1]);
      Q33.sym.cell(ctx, g.X0, ymid, true, ''); Q33.T(ctx, Q33.f(S.p.V, 1) + ' V', g.X0 - 30, ymid, { s: 12, w: 900, c: '#b91c1c' });
      Q33.sym.meter(ctx, xm, g.Y1, 'A', '#a16207'); Q33.T(ctx, 'I_total = ' + Q33.f(s.It, 2) + ' A', xm, g.Y1 + 24, { s: fs + 1, w: 900, c: '#fff', bg: '#a16207' });
      Q33.flow(ctx, [[g.X1, g.Y1], [xm + 16, g.Y1]], -S.fq[3], 'c', { sp: 22 }); Q33.flow(ctx, [[xm - 16, g.Y1], [g.X0, g.Y1], [g.X0, ymid + 20]], S.fq[3], 'c', { sp: 22 });
      if (s.par) { const ys = s.R.map((_, i) => n === 1 ? ymid : g.Y0 + i * (g.Y1 - 60 - g.Y0) / (n - 1)); const xa = g.X0 + 70, xb = g.X1;
        Q33.sym.path(ctx, [[g.X0, g.Y0], [xb, g.Y0]]); Q33.sym.line(ctx, [xa, g.Y0], [xa, ys[n - 1]]); Q33.sym.line(ctx, [xb, g.Y0], [xb, g.Y1]);
        s.R.forEach((r, i) => { const y = ys[i], xr = (xa + xb) / 2 + 20, xA = xa + 40; Q33.sym.line(ctx, [xa, y], [xb, y]); Q33.sym.res(ctx, xr, y, false, 'R' + '₁₂₃'[i] + ' = ' + r + ' Ω'); Q33.sym.meter(ctx, xA, y, 'A', '#a16207');
          Q33.flow(ctx, [[xb, y], [xr + 16, y]], S.fq[i], 'c', { sp: 22 }); Q33.flow(ctx, [[xr - 16, y], [xA + 12, y]], S.fq[i], 'c', { sp: 22 });
          Q33.T(ctx, 'I' + '₁₂₃'[i] + ' = ' + Q33.f(s.I[i], 2) + ' A', xr, y + 20, { s: fs, w: 900, c: '#a16207' }); });
        K.raw(ctx, () => { ctx.fillStyle = col; ys.forEach(y => { [xa, xb].forEach(x => { ctx.beginPath(); ctx.arc(x, y, 3.5, 0, TAU); ctx.fill(); }); }); }); }
      else { const xs = s.R.map((_, i) => g.X0 + 60 + (i + .5) * (g.X1 - g.X0 - 60) / n); Q33.sym.path(ctx, [[g.X0, g.Y0], [g.X1, g.Y0], [g.X1, g.Y1]]); Q33.flow(ctx, [[g.X1, g.Y1], [g.X1, g.Y0], [g.X0, g.Y0], [g.X0, ymid - 20]], S.fq[0], 'c', { sp: 22 });
        s.R.forEach((r, i) => { Q33.sym.res(ctx, xs[i], g.Y0, false, 'R' + '₁₂₃'[i] + ' = ' + r + ' Ω'); Q33.T(ctx, 'V' + '₁₂₃'[i] + ' = ' + Q33.f(s.Vr[i], 2) + ' V', xs[i], g.Y0 + 22, { s: fs, w: 900, c: '#b91c1c' }); }); }
      Q33.T(ctx, (s.par ? 'توازي' : 'توالي') + ': R_eq = ' + Q33.f(s.Req, 2) + ' Ω', xm, g.Y0 - 38, { s: fs + 1.5, w: 900, c: '#0f172a', bg: '#fde047' });
      if (S.ex) { const E = EX[S.ex]; Q33.steps(ctx, S, { title: E.t, q: E.q, lines: E.lines, k: S.k }, { wd: 360 }); }
      Q33.drawChips(ctx, D.chips(S, g)); Q33.banner(ctx, w, 'اختر مثالاً ثم «الخطوة التالية»، أو غيّر القيم من لوحة التحكم');
    },
    chips(S, g) { return Q33.chips(S, 'ex', Object.keys(EX).map(k => [k, EX[k].t]).concat([['nx', '⬇ الخطوة التالية']]), g.h - 84, S.ex, (S2, k) => { if (k === 'nx') { S2.k = Math.min(S2.k + 1, EX[S2.ex || 'e71'].lines.length); if (!S2.ex) S2.ex = 'e71'; return; } const E = EX[k]; S2.ex = k; S2.k = 0; setParam(S2, 'par', !!E.par); setParam(S2, 'R1', E.R[0]); setParam(S2, 'R2', E.R[1]); setParam(S2, 'R3', E.R[2] || 0); setParam(S2, 'V', E.V); }, { bw: 130, bh: 32 }); },
    drags(S) { if (!S.W) return []; return D.chips(S, D.geo(S)); },
    readings(S) { const s = D.sol(S); return [rd('طريقة الربط', s.par ? 'توازي' : 'توالي'), rd('المقاومة المكافئة', Q33.f(s.Req, 2) + ' Ω'), rd('التيار الكلي', Q33.f(s.It, 2) + ' A')].concat(s.R.map((r, i) => rd('R' + '₁₂₃'[i] + ' = ' + r + ' Ω', Q33.f(s.I[i], 2) + ' A ، ' + Q33.f(s.Vr[i], 2) + ' V'))); },
    explain(S) { const s = D.sol(S); return Q26.ex('المقاومة المكافئة ' + Q33.f(s.Req, 2) + ' Ω والتيار الكلي ' + Q33.f(s.It, 2) + ' A.', s.par ? 'على التوازي: فرق الجهد نفسه على كل مقاومة (' + Q33.f(S.p.V, 1) + ' V)، والتيار يتوزع: المقاومة الأصغر يمر فيها تيار أكبر، ومجموع تيارات الفروع = التيار الكلي.' : 'على التوالي: التيار نفسه في كل المقاومات، وفرق الجهد يتوزع بنسبة المقاومات، ومجموعها = فرق جهد المصدر.', 'يمكنك التحقق من كل خطوة بقراءة الأميترات على الدائرة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — الدائرة القصيرة (10-3، الشكل 38 + انتباه + س1-10) =============== */
(() => {
  const V = 9, RLp = 6;
  const D = { id: 'g9_s_short', page: 72, fig: 'الشكل 38 + انتباه ص 72',
    desc: 'عند ربط مصباحين كهربائيين متساويين في مقاومتهما على التوالي مع بعضهما وربط مجموعتهما بين قطبي بطارية، نلاحظ أن توهج المصباحين يكون متساوياً. فإذا ربطنا سلكاً موصلاً غليظاً بين طرفي أحد المصباحين نلاحظ انطفاء هذا المصباح، وسبب ذلك هو أن السلك الغليظ ولّد دائرة قصيرة للمصباح فجعل معظم التيار ينساب في السلك الغليظ (مقاومة صغيرة جداً) والجزء القليل جداً من التيار ينساب في المصباح فلا يكفي لتوهجه. أما المصباح الآخر فنجده متوهجاً ويكون توهجه أكبر من الحالة الأولى بسبب ازدياد تيار الدائرة نتيجة لنقصان مقاومتها المكافئة. انتباه: تجنب ربط الأميتر مباشرة مع المصدر (من غير وجود حمل) لأن هذا يؤدي إلى تلفه وتلف البطارية معاً لتعرضها إلى دائرة قصيرة ينتج عنها مرور تيار عالي المقدار.',
    tags: 'الدائرة القصيرة سلك غليظ انطفاء المصباح زيادة التوهج تيار عالي انتباه الأميتر مع المصدر تلف البطارية س10',
    tools: ['بطارية 9 V', 'مصباحان متساويان', 'سلك موصل غليظ', 'أسلاك توصيل', 'أميتر'],
    steps: ['لاحظ توهج المصباحين المتساويين على التوالي (الشكل 38-a).', 'اسحب طرف السلك الغليظ البرتقالي من النقطة b وضعه على النقطة c (طرفي المصباح الثاني): ماذا يحدث؟ (الشكل 38-b، س10)', 'ضعه على النقطة a بدلاً من c: أي مصباح ينطفئ الآن؟', 'اختر «انتباه»: لماذا لا يربط الأميتر مباشرة بين قطبي البطارية؟'],
    concl: ['السلك الغليظ مقاومته صغيرة جداً فيولد دائرة قصيرة للمصباح: معظم التيار ينساب في السلك فينطفئ المصباح.', 'المصباح الآخر يزداد توهجه لأن المقاومة المكافئة للدائرة تقل فيزداد تيارها.', 'تجنب ربط الأميتر مباشرة مع المصدر من غير حمل: تيار عالٍ جداً يتلف الأميتر والبطارية.'],
    laws: ['g9_series', 'g9_ohm'],
    controls: [],
    setup(S) { S.end = null; S.ep = null; S.md = 'lamp'; S.fp = 0; S.heat = 0; },
    st(S) { if (S.md === 'amm') return { I: 30, b1: 0, b2: 0 }; if (S.end === 'c') return { I: V / RLp, b1: 1, b2: 0, sh: 2 }; if (S.end === 'a') return { I: V / RLp, b1: 0, b2: 1, sh: 1 }; return { I: V / (2 * RLp), b1: .25, b2: .25 }; },
    update(S, dt) { Q33.adv(S, dt, D.st(S).I, S.md === 'amm' ? 12 : 160); S.heat += ((S.md === 'amm' ? 1 : 0) - S.heat) * Math.min(1, dt * .8); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 14 : Math.min(w - 320, x0 + 600), yt = ph ? 170 : 220, yb = ph ? Math.min(h - 150, 330) : Math.min(h - 210, 470); const W = x1 - x0; return { w, h, ph, L, x0, x1, yt, yb, l1: x0 + W * .3, l2: x0 + W * .7, bx: x0 + W * .5 }; },
    pts(g) { return { a: [g.l1 - 18, g.yt], b: [(g.l1 + g.l2) / 2, g.yt], c: [g.l2 + 18, g.yt] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, T = D.st(S), P = D.pts(g);
      Q33.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.yt - 110, g.x1 - g.x0 + 28, g.yb - g.yt + 160);
      if (S.md === 'amm') { const bt = Q33.bat(ctx, g.bx - 90, g.yb, { V, w: 90, h: 64 }); const am = Q33.meter(ctx, g.bx + 110, g.yb - 110, 'A', 30, 3, { name: 'أميتر بلا حمل!', flip: true }); const W1 = [bt.p, [bt.p[0], g.yb - 60], [am.p[0], g.yb - 60], am.p], W2 = [am.n, [am.n[0] + 30, am.n[1]], [am.n[0] + 30, g.yb + 50], [bt.n[0] - 40, g.yb + 50], [bt.n[0] - 40, bt.n[1] - 20], bt.n];
        Q33.wire(ctx, W1, { col: '#dc2626' }); Q33.wire(ctx, W2, { col: '#111827' }); Q33.flow(ctx, W1, S.fp, 'c', { sp: 12 }); Q33.flow(ctx, W2, S.fp, 'c', { sp: 12 });
        K.raw(ctx, () => { const gg = ctx.createRadialGradient(g.bx - 90, g.yb, 10, g.bx - 90, g.yb, 90); gg.addColorStop(0, 'rgba(239,68,68,' + .55 * S.heat + ')'); gg.addColorStop(1, 'rgba(239,68,68,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(g.bx - 90, g.yb, 90, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(100,100,100,' + .3 * S.heat + ')'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(g.bx + 110 + (k - 1.5) * 12, g.yb - 170 - ((S.t || 0) * 30 + k * 13) % 40, 8 + k * 2, 0, TAU); ctx.fill(); } });
        Q33.T(ctx, '⚠ انتباه: دائرة قصيرة! تيار عالٍ جداً: يتلف الأميتر وتسخن البطارية وتتلف', (g.x0 + g.x1) / 2, g.yt - 90, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' });
      } else {
        const bt = Q33.bat(ctx, g.bx, g.yb + 26, { V, w: 80, h: 56 });
        const L1 = Q33.bulb(ctx, g.l1, g.yt, T.b1, { label: 'R₁' }), L2 = Q33.bulb(ctx, g.l2, g.yt, T.b2, { label: 'R₂' });
        const Wm = [[bt.p, [bt.p[0], g.yb], [g.x1, g.yb], [g.x1, g.yt], L2.b], [L2.a, L1.b], [L1.a, [g.x0, g.yt], [g.x0, g.yb], [bt.n[0], g.yb], bt.n]];
        Wm.forEach((p, i) => Q33.wire(ctx, p, { col: i === 2 ? '#111827' : '#dc2626' }));
        // thick wire from b
        const end = S.ep || (S.end ? P[S.end] : [P.b[0] + 50, P.b[1] + 80]);
        const mid = [(P.b[0] + end[0]) / 2, Math.max(P.b[1], end[1]) + 60];
        const path = [P.b, [P.b[0], P.b[1] + 30], [mid[0], mid[1]], [end[0], end[1] + 30], end];
        Q33.wire(ctx, path, { thick: 1 });
        K.raw(ctx, () => { ctx.fillStyle = '#ea580c'; ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(end[0], end[1], 9, 0, TAU); ctx.fill(); ctx.stroke(); });
        // flow
        if (T.sh === 2) { Q33.flow(ctx, Wm[0], S.fp, 'c'); Q33.flow(ctx, [...path].reverse(), S.fp, 'c'); Q33.flow(ctx, Wm[2], S.fp, 'c'); }
        else if (T.sh === 1) { Q33.flow(ctx, Wm[0], S.fp, 'c'); Q33.flow(ctx, Wm[1], S.fp, 'c'); Q33.flow(ctx, path, S.fp, 'c'); Q33.flow(ctx, Wm[2], S.fp, 'c'); }
        else Wm.forEach(p => Q33.flow(ctx, p, S.fp, 'c'));
        ['a', 'b', 'c'].forEach(k => Q33.T(ctx, k, P[k][0], P[k][1] + 20, { s: 13, w: 900, c: '#1d4ed8' }));
        Q33.T(ctx, T.sh ? 'دائرة قصيرة للمصباح ' + (T.sh === 2 ? 'R₂: انطفأ، و R₁ ازداد توهجه' : 'R₁: انطفأ، و R₂ ازداد توهجه') : 'المصباحان متساويان في التوهج: I = ' + Q33.f(T.I, 2) + ' A', (g.x0 + g.x1) / 2, g.yt - 92, { s: fs + 1, w: 900, c: '#fff', bg: T.sh ? '#b45309' : '#15803d' });
        Q33.T(ctx, 'السلك الغليظ', end[0] + 50, end[1] + 40, { s: fs, w: 900, c: '#c2410c' });
      }
      if (!g.ph) Q33.card(ctx, S, [{ t: 'قبل وضع السلك:', c: '#334155', w: 900 }, { t: 'R_eq = 6 + 6 = 12 Ω', c: '#334155' }, { t: 'I = 9 / 12 = 0.75 A', c: '#334155' }, { t: 'بعد وضع السلك:', c: '#b45309', w: 900 }, { t: 'R_eq ≈ 6 Ω', c: '#b45309' }, { t: 'I = 9 / 6 = 1.5 A', c: '#b45309' }, { t: 'السلك الغليظ مقاومته صغيرة جداً فيمر فيه معظم التيار', c: '#0f172a' }], { title: 'لماذا؟', wd: 280, y: 70 });
      Q33.drawChips(ctx, D.chips(S, g)); Q33.banner(ctx, w, S.md === 'amm' ? 'انتباه: لا تربط الأميتر مباشرة مع المصدر' : 'اسحب طرف السلك الغليظ إلى النقطة c أو a');
    },
    chips(S, g) { return Q33.chips(S, 'md', [['lamp', 'المصباحان والسلك الغليظ'], ['amm', '⚠ انتباه: أميتر مع المصدر'], ['rs', '↺ إزالة السلك الغليظ']], g.h - 84, S.md, (S2, k) => { if (k === 'rs') { S2.end = null; S2.ep = null; S2.md = 'lamp'; } else S2.md = k; }, { bw: 220 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = D.pts(g), L = []; if (S.md === 'lamp') { const end = S.ep || (S.end ? P[S.end] : [P.b[0] + 50, P.b[1] + 80]);
      L.push({ id: 'thick', x: end[0], y: end[1], r: 22, axis: 'xy', keep: true, tip: 'اسحب طرف السلك الغليظ إلى a أو c', idle: 'اسحب السلك الغليظ ✋', drag: (S2, d) => { S2.ep = [clamp(d.x, g.x0, g.x1), clamp(d.y, g.yt - 60, g.yb)]; S2.end = null; }, up: S2 => { const p = S2.ep; if (!p) return; let best = null; ['a', 'c'].forEach(k => { if (Math.hypot(P[k][0] - p[0], P[k][1] - p[1]) < 40) best = k; }); S2.end = best; S2.ep = best ? null : p; } }); }
      return L.concat(D.chips(S, g)); },
    readings(S) { const T = D.st(S); return [rd('السلك الغليظ', S.md === 'amm' ? '—' : S.end ? 'بين b و ' + S.end : 'غير موصول'), rd('تيار الدائرة', S.md === 'amm' ? 'عالٍ جداً!' : Q33.f(T.I, 2) + ' A'), rd('المصباح R₁', Q33.glow(T.b1)), rd('المصباح R₂', Q33.glow(T.b2))]; },
    explain(S) { if (S.md === 'amm') return Q26.ex('الأميتر خرج عن تدريجه والبطارية تسخن.', 'مقاومة الأميتر صغيرة جداً، فربطه مباشرة مع المصدر من غير حمل يولد دائرة قصيرة ينتج عنها تيار عالي المقدار يتلف الأميتر والبطارية معاً.', 'الدائرة القصيرة في أسلاك البيت قد تسبب حريقاً، لذلك نستعمل القواطع (الفيوزات).'); const T = D.st(S); return Q26.ex(T.sh ? 'انطفأ المصباح المربوط بين طرفيه السلك الغليظ وازداد توهج الآخر.' : 'توهج المصباحين متساوٍ لأن مقاومتيهما متساويتان والتيار نفسه.', T.sh ? 'السلك الغليظ ولّد دائرة قصيرة للمصباح: معظم التيار ينساب فيه لأن مقاومته صغيرة جداً، والجزء القليل جداً في المصباح لا يكفي لتوهجه. وأصبحت الدائرة كأن فيها مصباحاً واحداً فقلت مقاومتها المكافئة وازداد تيارها (الشكل 38-b). جواب س10: a.' : 'المصباحان على التوالي: R_eq = 12 Ω والتيار 0.75 A.', ''); }
  };
  M8.P[D.id] = D;
})();

/* =============== F2 — ربط الخلايا الكهربائية (الأعمدة) على التوالي والتوازي (11-3، الشكلان 39 و 40) =============== */
(() => {
  const E = 1.5, RLp = 3;
  const D = { id: 'g9_s_cells', page: 73, fig: 'الشكلان 39 و 40',
    desc: 'العديد من الدوائر الكهربائية لكي تعمل تحتاج إلى أكثر من خلية واحدة، لذا تربط الخلايا مع بعضها على التوالي أو على التوازي لتجهيز الدائرة بالتيار المناسب. a) على التوالي: يربط القطب الموجب للخلية الأولى مع القطب السالب للخلية الثانية وهكذا؛ من مميزاته تجهيز فولطية أكبر (قوة دافعة كهربائية أكبر): emf_total تساوي مجموع emf للخلايا (خليتان 1.5 V ⟸ 3 V). b) على التوازي: تربط الأقطاب الموجبة لجميع الخلايا سوية والسالبة سوية؛ من مميزاته إمكانية تجهيز الدائرة الكهربائية بتيار أكبر، و emf_total تساوي emf للخلية الواحدة (1.5 V).',
    tags: 'ربط الخلايا الأعمدة الكهربائية توالي توازي القوة الدافعة الكهربائية emf فولطية أكبر تيار أكبر عمود معكوس س8',
    tools: ['ثلاث خلايا (أعمدة) 1.5 V', 'مصباح', 'فولطميتر', 'أسلاك توصيل'],
    steps: ['اختر «على التوالي» وزد عدد الخلايا: لاحظ قراءة الفولطميتر emf_total وتوهج المصباح (الشكل 39).', 'اختر «على التوازي»: تبقى القراءة 1.5 V مهما زاد العدد، لكن الخلايا تجهز تياراً أكبر لمدة أطول (الشكل 40).', 'اضغط على خلية لقلبها (عكس أقطابها) في ربط التوالي: ماذا يحدث للفولطية؟ (س8 ص 76)'],
    concl: ['ربط الخلايا على التوالي: emf_total = emf₁ + emf₂ + … فتجهز فولطية أكبر.', 'ربط الخلايا المتماثلة على التوازي: emf_total = emf للخلية الواحدة، وتجهز تياراً أكبر.', 'خلية معكوسة في ربط التوالي تطرح فولطيتها من المجموع.'],
    laws: ['g9_cells'],
    controls: [],
    setup(S) { S.n = 2; S.md = 's'; S.fl = [1, 1, 1]; S.fp = 0; },
    emf(S) { if (S.md === 's') { let e = 0; for (let i = 0; i < S.n; i++) e += E * S.fl[i]; return e; } const bad = S.fl.slice(0, S.n).some(f => f < 0); return bad ? NaN : E; },
    update(S, dt) { const e = D.emf(S); Q33.adv(S, dt, isNaN(e) ? 3 : Math.abs(e) / RLp, 120); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), x0 = L + (ph ? 6 : 24), x1 = ph ? w - 14 : Math.min(w - 320, x0 + 560), yt = ph ? 150 : 200, yb = ph ? Math.min(h - 150, 330) : Math.min(h - 200, 480); return { w, h, ph, L, x0, x1, yt, yb, cx: (x0 + x1) / 2 }; },
    cellPos(S, g, i) { const n = S.n; if (S.md === 's') return [g.cx + (i - (n - 1) / 2) * 92, g.yb]; return [g.cx, g.yb - (n - 1 - i) * 52]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, e = D.emf(S), bad = isNaN(e), n = S.n;
      Q33.bg(ctx, w, h); Q33.board(ctx, g.x0 - 14, g.yt - 100, g.x1 - g.x0 + 28, g.yb - g.yt + 150);
      const lb = Q33.bulb(ctx, g.cx, g.yt, bad ? 0 : (e / E) ** 2 * .35, { label: '' });
      const vm = Q33.meter(ctx, g.x1 - 70, (g.yt + g.yb) / 2 - 30, 'V', bad ? 0 : e, 5, { name: 'الفولطميتر', d: 1, txt: bad ? '⚠' : 'emf_total = ' + Q33.f(e, 1) + ' V', w: 86, h: 66 });
      const C = []; for (let i = 0; i < n; i++) { const p = D.cellPos(S, g, i); C.push(Q33.cell(ctx, p[0], p[1], { w: 70, h: 28, pos: S.fl[i], label: '1.5 V' })); }
      let P, N; const W = [];
      if (S.md === 's') { for (let i = 0; i < n - 1; i++) W.push([S.fl[i] > 0 ? C[i].p : C[i].n, S.fl[i + 1] > 0 ? C[i + 1].n : C[i + 1].p]); P = S.fl[n - 1] > 0 ? C[n - 1].p : C[n - 1].n; N = S.fl[0] > 0 ? C[0].n : C[0].p; }
      else { const xr = g.cx + 70, xl = g.cx - 70, top = D.cellPos(S, g, 0)[1]; C.forEach((c, i) => { W.push([S.fl[i] > 0 ? c.p : c.n, [xr, c.p[1]]]); W.push([S.fl[i] > 0 ? c.n : c.p, [xl, c.n[1]]]); }); W.push([[xr, top], [xr, g.yb]], [[xl, top], [xl, g.yb]]); P = [xr, g.yb]; N = [xl, g.yb]; }
      W.forEach(p => Q33.wire(ctx, p, { col: '#475569' }));
      const Wa = [P, [P[0], g.yb + (S.md === 's' ? 0 : 30)], [g.x1, g.yb + (S.md === 's' ? 0 : 30)], [g.x1, g.yt], lb.b], Wb = [lb.a, [g.x0, g.yt], [g.x0, g.yb + (S.md === 's' ? 0 : 30)], [N[0], g.yb + (S.md === 's' ? 0 : 30)], N];
      Q33.wire(ctx, Wa, { col: '#dc2626' }); Q33.wire(ctx, Wb, { col: '#111827' }); if (!bad && Math.abs(e) > .01) { const sg = e > 0 ? 1 : -1; Q33.flow(ctx, sg > 0 ? Wa : [...Wa].reverse(), S.fp * sg, 'c'); Q33.flow(ctx, sg > 0 ? Wb : [...Wb].reverse(), S.fp * sg, 'c'); }
      Q33.wire(ctx, [vm.p, [vm.p[0], g.yt + 4], [g.x1 - 4, g.yt + 4]], { col: '#f97316' }); Q33.wire(ctx, [vm.n, [vm.n[0], (g.yt + g.yb) / 2 + 30], [g.x0 + 4, (g.yt + g.yb) / 2 + 30], [g.x0 + 4, g.yt + 8]], { col: '#334155' });
      const msg = bad ? '⚠ خلية معكوسة في ربط التوازي: دائرة قصيرة بين الخلايا!' : S.md === 's' ? 'emf_total = ' + S.fl.slice(0, n).map(f => (f > 0 ? '' : '−') + '1.5').join(' + ') + ' = ' + Q33.f(e, 1) + ' V' : 'emf_total = 1.5 V';
      Q33.T(ctx, msg, (g.x0 + g.x1) / 2, g.yt - 80, { s: fs + 1, w: 900, c: '#fff', bg: bad ? '#b91c1c' : '#a16207' });
      Q33.drawChips(ctx, D.chipsM(S, g)); Q33.drawChips(ctx, D.chipsN(S, g)); Q33.banner(ctx, w, 'اختر طريقة الربط وعدد الخلايا، واضغط على خلية لقلبها');
    },
    chipsM(S, g) { return Q33.chips(S, 'md', [['s', 'على التوالي — الشكل 39'], ['p', 'على التوازي — الشكل 40'], ['fix', '↺ تعديل الأقطاب']], g.h - 84, S.md, (S2, k) => { if (k === 'fix') S2.fl = [1, 1, 1]; else S2.md = k; }, { bw: 220 }); },
    chipsN(S, g) { return Q33.chips(S, 'n', [['1', 'خلية واحدة'], ['2', 'خليتان'], ['3', 'ثلاث خلايا']], g.h - 128, String(S.n), (S2, k) => { S2.n = +k; }, { bw: 150, bh: 30, col: '#0f766e' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = []; for (let i = 0; i < S.n; i++) { const p = D.cellPos(S, g, i); L.push({ id: 'cell' + i, x: p[0], y: p[1], w: 76, h: 34, tip: 'اضغط لقلب الخلية (عكس أقطابها)', idle: 'اضغط لقلبها ✋', click: S2 => { const F = S2.fl.slice(); F[i] = -F[i]; S2.fl = F; S2.fk = F.join(''); } }); } return L.concat(D.chipsM(S, g), D.chipsN(S, g)); },
    readings(S) { const e = D.emf(S); return [rd('طريقة الربط', S.md === 's' ? 'توالي' : 'توازي'), rd('عدد الخلايا', S.n), rd('emf_total', isNaN(e) ? 'دائرة قصيرة!' : Q33.f(e, 1) + ' V')]; },
    record(S) { const e = D.emf(S); return { m: S.md === 's' ? 'توالي' : 'توازي', n: S.n, e: isNaN(e) ? '—' : +e.toFixed(2) }; },
    cols: [['m', 'الربط'], ['n', 'عدد الخلايا'], ['e', 'emf_total (V)']],
    explain(S) { const e = D.emf(S); if (isNaN(e)) return Q26.ex('خلية معكوسة في ربط التوازي.', 'قلب خلية في ربط التوازي يصل قطبها الموجب بالسالب لخلية أخرى فيمر بينهما تيار كبير (دائرة قصيرة) يتلفها.', ''); return Q26.ex('القوة الدافعة الكلية ' + Q33.f(e, 1) + ' V.', S.md === 's' ? 'على التوالي تجمع فولطيات الخلايا: الموجب مع السالب للخلية التالية. الخلية المقلوبة تطرح فولطيتها، لذلك في س8 ص 76 يكون التوهج أكبر عندما تكون جميع الأعمدة بالاتجاه نفسه.' : 'الخلايا المتماثلة على التوازي تعطي فولطية خلية واحدة، لكنها تتقاسم التيار فتجهز تياراً أكبر وتدوم مدة أطول.', 'المصباح اليدوي فيه خليتان على التوالي لتجهيز 3 V.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F3 — أسئلة الفصل المصورة: س1-3، س1-8، س1-9، س1-10 (ص 75–77) =============== */
(() => {
  const QS = {
    q3: { t: 'س1-3', q: 'أي من مخططات الدوائر الآتية تعد صحيحة عند استعمالها لقياس مقاومة صغيرة بربط الأميتر والفولطميتر؟', ans: 'b', why: 'الأميتر على التوالي مع المقاومة والفولطميتر على التوازي بين طرفيها (الشكل 22).' },
    q8: { t: 'س1-8', q: 'إذا كانت الأعمدة في الدوائر الكهربائية التالية متماثلة. وضح في أي منها يكون توهج المصباح أكبر؟', ans: 'b', why: 'في (b) ثلاثة أعمدة على التوالي بالاتجاه نفسه: 4.5 V. في (a) المسطرة البلاستيكية عازل فلا يمر تيار، وفي (c) عمود معكوس يطرح فولطيته، وفي (d) عمود واحد.' },
    q9: { t: 'س1-9', q: 'إذا كانت المصابيح الكهربائية في الدوائر الكهربائية التالية متماثلة. وضح في أي منها يكون توهج المصباح أو المصباحين ضعيفاً؟', ans: 'b', why: 'في (b) مصباحان على التوالي يتقاسمان فولطية العمود فيكون توهجهما ضعيفاً. في (c) المصباحان على التوازي، وفي (d) السلك الغليظ يقصر أحد المصباحين فيتوهج الآخر كاملاً.' },
    q10: { t: 'س1-10', q: 'في الشكل المجاور، ربط سلك غليظ بين طرفي المصباح الثاني (بين النقطتين b و c). نلاحظ:', ans: 'a', opts: ['انطفاء المصباح الثاني R₂ مع زيادة توهج R₁', 'انطفاء المصباح الأول R₁ مع زيادة توهج R₂', 'لا يتغير توهج أي من المصباحين', 'انطفاء كل من المصباحين'], why: 'السلك الغليظ يولد دائرة قصيرة للمصباح الثاني فينطفئ، وتقل المقاومة المكافئة فيزداد التيار وتوهج المصباح الأول.' }
  };
  const SP = { // mini circuits per question & option: cells (signs), lamps kind, extras
    q8: { a: { c: [1, 1, 1], L: 'one', ruler: 1 }, b: { c: [1, 1, 1], L: 'one' }, c: { c: [1, 1, -1], L: 'one' }, d: { c: [1], L: 'one' } },
    q9: { a: { c: [1], L: 'one' }, b: { c: [1], L: 'ser' }, c: { c: [1], L: 'par' }, d: { c: [1], L: 'short' } }
  };
  const D = { id: 'g9_q_visual', page: 75, fig: 'أسئلة الفصل الثالث المصورة',
    desc: 'أسئلة الفصل الثالث التي فيها مخططات دوائر: اختر الدائرة الصحيحة واضغط عليها، وتشاهد الدوائر وهي تعمل (توهج المصابيح وقراءات الأجهزة) لتتحقق من جوابك.',
    tags: 'أسئلة الفصل الثالث اختر العبارة الصحيحة مخططات الدوائر توهج المصباح أعمدة متماثلة سلك غليظ أميتر فولطميتر',
    tools: ['مخططات دوائر كهربائية'],
    steps: ['اختر السؤال من الأسفل.', 'اضغط على الدائرة (أو العبارة) التي تراها صحيحة.', 'اقرأ التعليل، وقارن توهج المصابيح في الدوائر الأربع.'],
    concl: ['س1-3: b ، س1-8: b ، س1-9: b ، س1-10: a.'],
    laws: ['g9_series', 'g9_parallel', 'g9_cells'],
    controls: [],
    setup(S) { S.q = 'q8'; S.pick = ''; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, L = Q33.L(S), cw = ph ? (w - L - 24) / 2 : Math.min(200, (w - L - 90) / 4), ch = ph ? 96 : 150, y0 = ph ? 120 : 190; return { w, h, ph, L, cw, ch, y0 }; },
    box(S, g, i) { if (g.ph) return [g.L + 6 + (i % 2) * (g.cw + 12), g.y0 + Math.floor(i / 2) * (g.ch + 24)]; return [g.L + 10 + i * (g.cw + 16), g.y0]; },
    bright(sp) { const e = sp.c.reduce((a, b) => a + b, 0) * 1.5; if (sp.ruler) return [0]; const one = (e / 1.5) ** 2; return sp.L === 'one' ? [one] : sp.L === 'ser' ? [one / 4, one / 4] : sp.L === 'par' ? [one, one] : [0, one]; },
    mini(ctx, S, x, y, w, h, k) {
      if (S.q === 'q3') { const X0 = x + 24, X1 = x + w - 24, Y0 = y + 30, Y1 = y + h - 30, xm = (X0 + X1) / 2; Q33.sym.path(ctx, [[X0, Y0], [X1, Y0], [X1, Y1], [X0, Y1], [X0, Y0]]); Q33.sym.cell(ctx, xm, Y1, false, '');
        if (k === 'a') { Q33.sym.res(ctx, xm, Y0, false, 'R'); Q33.sym.path(ctx, [[xm - 30, Y0], [xm - 30, Y0 - 22], [xm + 30, Y0 - 22], [xm + 30, Y0]]); Q33.sym.meter(ctx, xm, Y0 - 22, 'A'); Q33.sym.meter(ctx, X1, (Y0 + Y1) / 2, 'V'); }
        if (k === 'b') { Q33.sym.res(ctx, xm, Y0, false, 'R'); Q33.sym.path(ctx, [[xm - 30, Y0], [xm - 30, Y0 - 22], [xm + 30, Y0 - 22], [xm + 30, Y0]]); Q33.sym.meter(ctx, xm, Y0 - 22, 'V'); Q33.sym.meter(ctx, X1, (Y0 + Y1) / 2, 'A'); }
        if (k === 'c') { Q33.sym.res(ctx, X0, (Y0 + Y1) / 2, true, ''); Q33.sym.path(ctx, [[X0, Y0 + 8], [X0 - 18, Y0 + 8], [X0 - 18, Y1 - 8], [X0, Y1 - 8]]); Q33.sym.meter(ctx, X0 - 18, (Y0 + Y1) / 2, 'V'); Q33.sym.path(ctx, [[X1, Y0 + 8], [X1 + 18, Y0 + 8], [X1 + 18, Y1 - 8], [X1, Y1 - 8]]); Q33.sym.meter(ctx, X1 + 18, (Y0 + Y1) / 2, 'A'); }
        if (k === 'd') { Q33.sym.res(ctx, X0, (Y0 + Y1) / 2, true, ''); Q33.sym.path(ctx, [[X0, Y0 + 8], [X0 - 18, Y0 + 8], [X0 - 18, Y1 - 8], [X0, Y1 - 8]]); Q33.sym.meter(ctx, X0 - 18, (Y0 + Y1) / 2, 'A'); Q33.sym.path(ctx, [[X1, Y0 + 8], [X1 + 18, Y0 + 8], [X1 + 18, Y1 - 8], [X1, Y1 - 8]]); Q33.sym.meter(ctx, X1 + 18, (Y0 + Y1) / 2, 'V'); }
        return; }
      if (S.q === 'q10') return;
      const sp = SP[S.q][k], B = D.bright(sp), X0 = x + 16, X1 = x + w - 16, Y0 = y + 28, Y1 = y + h - 34;
      Q33.sym.path(ctx, [[X0, Y0], [X1, Y0], [X1, Y1], [X0, Y1], [X0, Y0]]);
      sp.c.forEach((c, i) => { const cx = (X0 + X1) / 2 + (i - (sp.c.length - 1) / 2) * 30; K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.fillRect(cx - 9, Y0 - 12, 18, 24); }); Q33.sym.cell(ctx, cx, Y0, false, ''); Q33.T(ctx, c > 0 ? '+ −' : '− +', cx, Y0 - 16, { s: 9, w: 900, c: c > 0 ? '#b91c1c' : '#1d4ed8' }); });
      if (sp.ruler) { K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.fillRect(X0 + (X1 - X0) * .55, Y1 - 6, (X1 - X0) * .35, 12); ctx.fillStyle = '#fda4af'; ctx.fillRect(X0 + (X1 - X0) * .55, Y1 - 5, (X1 - X0) * .35, 10); }); Q33.T(ctx, 'مسطرة بلاستك', X0 + (X1 - X0) * .72, Y1 + 14, { s: 9, w: 800, c: '#be123c' }); }
      if (sp.L === 'one') Q33.sym.lamp(ctx, X0 + (X1 - X0) * .3, Y1, B[0]);
      if (sp.L === 'ser') { Q33.sym.lamp(ctx, X0 + (X1 - X0) * .3, Y1, B[0]); Q33.sym.lamp(ctx, X0 + (X1 - X0) * .7, Y1, B[1]); }
      if (sp.L === 'par') { const xm = (X0 + X1) / 2; Q33.sym.lamp(ctx, xm, Y1, B[0]); Q33.sym.path(ctx, [[xm - 30, Y1], [xm - 30, Y1 + 24], [xm + 30, Y1 + 24], [xm + 30, Y1]]); Q33.sym.lamp(ctx, xm, Y1 + 24, B[1]); }
      if (sp.L === 'short') { const x1 = X0 + (X1 - X0) * .3; Q33.sym.lamp(ctx, x1, Y1, B[0]); Q33.sym.lamp(ctx, X0 + (X1 - X0) * .7, Y1, B[1]); K.raw(ctx, () => { ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x1 - 22, Y1); ctx.lineTo(x1 - 22, Y1 - 22); ctx.lineTo(x1 + 22, Y1 - 22); ctx.lineTo(x1 + 22, Y1); ctx.stroke(); }); Q33.T(ctx, 'سلك غليظ', x1, Y1 - 32, { s: 9, w: 800, c: '#c2410c' }); }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), fs = g.ph ? 10 : 11.5, Q = QS[S.q];
      Q33.bg(ctx, w, h);
      Q33.T(ctx, Q.t + ': ' + Q.q, g.ph ? w / 2 : (w + g.L) / 2, g.ph ? 74 : 100, { s: g.ph ? 10 : 13, w: 900, c: '#0f172a', maxW: w - g.L - 30 });
      if (S.q === 'q10') { // big figure + 4 statements
        const x0 = g.ph ? g.L + 10 : g.L + 30, y0 = g.y0 - 20, W = g.ph ? w - g.L - 30 : 300, H = 150, bc = S.pick === 'a' || S.pick === '' ? 1 : 0; void bc;
        const shown = S.pick ? 1 : 0, X0 = x0 + 20, X1 = x0 + W - 20, Y0 = y0 + 50, Y1 = y0 + H;
        Q33.sym.path(ctx, [[X0, Y0], [X1, Y0], [X1, Y1], [X0, Y1], [X0, Y0]]); Q33.sym.cell(ctx, (X0 + X1) / 2, Y1, false, '');
        const l1 = X0 + (X1 - X0) * .28, l2 = X0 + (X1 - X0) * .68; Q33.sym.lamp(ctx, l1, Y0, shown ? 1 : .25, 'R₁'); Q33.sym.lamp(ctx, l2, Y0, shown ? 0 : .25, 'R₂');
        K.raw(ctx, () => { ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(l2 - 30, Y0); ctx.quadraticCurveTo(l2, Y0 + 40, l2 + 30, Y0); ctx.stroke(); });
        Q33.T(ctx, 'b', l2 - 30, Y0 - 14, { s: 12, w: 900, c: '#1d4ed8' }); Q33.T(ctx, 'c', l2 + 30, Y0 - 14, { s: 12, w: 900, c: '#1d4ed8' }); Q33.T(ctx, 'a', l1 - 30, Y0 - 14, { s: 12, w: 900, c: '#1d4ed8' });
        Q.opts.forEach((o, i) => { const k = 'abcd'[i], bx = g.ph ? g.L + 10 : g.L + 360, by = (g.ph ? y0 + H + 30 : y0 + 10) + i * (g.ph ? 34 : 46), on = S.pick === k, right = k === Q.ans; Q33.T(ctx, k + ') ' + o, bx, by, { s: fs + 1, w: 900, c: on ? '#fff' : '#0f172a', bg: on ? (right ? '#15803d' : '#b91c1c') : '#f1f5f9', a: 'left' }); });
      } else {
        ['a', 'b', 'c', 'd'].forEach((k, i) => { const [x, y] = D.box(S, g, i), on = S.pick === k, right = k === Q.ans;
          K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = on ? (right ? '#15803d' : '#b91c1c') : '#cbd5e1'; ctx.lineWidth = on ? 4 : 1.5; rr(ctx, x, y, g.cw, g.ch, 10); ctx.fill(); ctx.stroke(); });
          D.mini(ctx, S, x, y, g.cw, g.ch, k); Q33.T(ctx, '(' + k + ')', x + g.cw / 2, y + g.ch + 12, { s: 12, w: 900, c: on ? (right ? '#15803d' : '#b91c1c') : '#334155' });
          if (S.pick && S.q !== 'q3') { const B = D.bright(SP[S.q][k]); Q33.T(ctx, B.map(b => Q33.glow(b)).join(' / '), x + g.cw / 2, y + 12, { s: 9.5, w: 800, c: '#a16207' }); } }); }
      if (S.pick) { const ok = S.pick === Q.ans; Q33.T(ctx, (ok ? '✔ صحيح! ' : '✖ ليس هذا. الجواب ' + Q.ans + ': ') + Q.why, g.ph ? w / 2 : (w + g.L) / 2, g.ph ? h - 140 : g.y0 + g.ch + 70, { s: fs, w: 900, c: '#fff', bg: ok ? '#15803d' : '#b91c1c', maxW: w - g.L - 30 }); }
      Q33.drawChips(ctx, D.chips(S, g)); Q33.banner(ctx, w, 'اضغط على الدائرة أو العبارة الصحيحة');
    },
    chips(S, g) { return Q33.chips(S, 'q', Object.keys(QS).map(k => [k, QS[k].t + (k === 'q3' ? ' ص 75' : k === 'q8' ? ' ص 76' : ' ص 77')]), g.h - 84, S.q, (S2, k) => { S2.q = k; S2.pick = ''; }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      if (S.q === 'q10') { const y0 = g.y0 - 20; for (let i = 0; i < 4; i++) { const k = 'abcd'[i], bx = g.ph ? g.L + 10 : g.L + 360, by = (g.ph ? y0 + 180 : y0 + 10) + i * (g.ph ? 34 : 46); L.push({ id: 'opt' + k, x: bx + 150, y: by, w: 300, h: 30, tip: 'اختر هذه العبارة', idle: i ? undefined : 'اختر ✋', click: S2 => { S2.pick = k; } }); } }
      else for (let i = 0; i < 4; i++) { const [x, y] = D.box(S, g, i), k = 'abcd'[i]; L.push({ id: 'opt' + k, x: x + g.cw / 2, y: y + g.ch / 2, w: g.cw, h: g.ch, tip: 'اختر هذه الدائرة', idle: i ? undefined : 'اختر ✋', click: S2 => { S2.pick = k; } }); }
      return L.concat(D.chips(S, g)); },
    readings(S) { return [rd('السؤال', QS[S.q].t), rd('اختيارك', S.pick || '—'), rd('النتيجة', !S.pick ? '—' : S.pick === QS[S.q].ans ? 'صحيح ✔' : 'خطأ ✖')]; },
    explain(S) { const Q = QS[S.q]; return Q26.ex(S.pick ? (S.pick === Q.ans ? 'جواب صحيح.' : 'الجواب الصحيح ' + Q.ans + '.') : 'اختر جواباً.', S.pick ? Q.why : 'فكّر في: طريقة ربط الأجهزة، وعدد الأعمدة واتجاهها، وهل في الدائرة عازل أو سلك غليظ.', ''); }
  };
  M8.P[D.id] = D;
})();

/* =============== تجارب الفصل الثالث (التيار الكهربائي) =============== */
/* عناصر الضغط فقط (بلا سحب) لا تُظهر أسهم السحب */
Object.keys(M8.P).filter(k => /^g9_(i|c|v|r|k|s|q)_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
const M93 = M => M8.merge(Object.assign({ ch: 33, reg: X9 }, M));
M93({ id: 'g9_current', sec: '1-3 + 2-3 التيار الكهربائي وأنواعه', page: 49, kind: 'نشاط', fig: 'الأشكال 1–10',
  title: 'التيار الكهربائي: الإلكتروني والاصطلاحي، وحساب I = q/t، والمستمر والمتناوب',
  desc: 'نشاهد حركة الشحنات في الموصلات الصلبة والمحاليل والغازات، ونقارن اتجاه التيار الإلكتروني بالاصطلاحي، ونحسب التيار من الشحنة والزمن، ونميّز التيار المستمر من المتناوب.',
  tags: 'تيار كهربائي إلكتروني اصطلاحي أمبير كولوم مستمر متناوب موصل عازل',
  fact: ['التيار الكهربائي هو المعدل الزمني لانسياب الشحنات: I = q / t.', 'الأمبير = كولوم ÷ ثانية.', 'التيار الاصطلاحي من القطب الموجب إلى السالب خارج المصدر، والإلكتروني بعكسه.', 'التيار المتناوب يغير اتجاهه ومقداره دورياً، والمستمر ثابت الاتجاه.'],
  quiz: [
    { q: 'التيار الكهربائي هو:', o: ['المعدل الزمني لانسياب الشحنات الكهربائية', 'مقدار الشحنة فقط', 'فرق الجهد بين نقطتين'], a: 0, why: 'I = q / t.' },
    { q: 'اتجاه التيار الاصطلاحي خارج المصدر يكون:', o: ['من القطب الموجب إلى القطب السالب', 'من القطب السالب إلى القطب الموجب', 'لا اتجاه له'], a: 0, why: 'التيار الإلكتروني بعكس الاصطلاحي.' },
    { q: 'شحنة 9 µC تعبر مقطعاً في 3 µs. التيار يساوي:', o: ['3 A', '27 A', '0.33 A'], a: 0, why: 'I = 9×10⁻⁶ ÷ 3×10⁻⁶ = 3 A.' },
    { q: 'حاملات الشحنة في المحاليل الإلكتروليتية هي:', o: ['الأيونات الموجبة والسالبة', 'الإلكترونات الحرة فقط', 'البروتونات'], a: 0, why: 'تتحرك الأيونات الموجبة والسالبة باتجاهين متعاكسين.' }
  ],
  parts: [{ id: 'g9_i_flow', n: 'حركة الشحنات والتيار الإلكتروني والاصطلاحي' }, { id: 'g9_i_count', n: 'حساب التيار I = q/t + الأمثلة' }, { id: 'g9_i_dcac', n: 'التيار المستمر والمتناوب' }] });
M93({ id: 'g9_circuit', sec: '3-3 + 4-3 الدائرة الكهربائية وقياس التيار', page: 54, kind: 'نشاط', fig: 'الأشكال 11–17',
  title: 'الدائرة الكهربائية المغلقة والمفتوحة، وقياس التيار بالأميتر',
  desc: 'نغلق الدائرة ونفتحها ونقارن الرسم الحقيقي بالمخطط، ثم ننفذ نشاط الكتاب: نربط الأميتر على التوالي ونغير الريوستات ونسجل القراءات.',
  tags: 'دائرة مغلقة مفتوحة أميتر ريوستات توالي',
  fact: ['لا يمر التيار إلا في دائرة كهربائية مغلقة.', 'يربط الأميتر على التوالي، وقطبه الموجب نحو القطب الموجب للمصدر.', 'مقاومة الأميتر صغيرة جداً.'],
  quiz: [
    { q: 'يربط الأميتر في الدائرة:', o: ['على التوالي', 'على التوازي', 'مباشرة مع المصدر'], a: 0, why: 'لكي يمر فيه التيار نفسه المار في الدائرة.' },
    { q: 'عند زيادة مقاومة الريوستات فإن قراءة الأميتر:', o: ['تقل', 'تزداد', 'لا تتغير'], a: 0, why: 'I = V / R.' },
    { q: 'لا يتوهج المصباح عندما تكون الدائرة:', o: ['مفتوحة', 'مغلقة', 'فيها أميتر'], a: 0, why: 'الدائرة المفتوحة لا يمر فيها تيار.' }
  ],
  parts: [{ id: 'g9_c_open', n: 'الدائرة المغلقة والمفتوحة والمخطط' }, { id: 'g9_c_ammeter', n: 'نشاط: قياس التيار بالأميتر' }] });
M93({ id: 'g9_voltage', sec: '5-3 + 6-3 فرق الجهد وقياسه', page: 57, kind: 'نشاط', fig: 'الأشكال 18–22',
  title: 'فرق الجهد الكهربائي: تشبيه المضخة وقياسه بالفولطميتر',
  desc: 'نشبه البطارية بمضخة ماء ترفع الماء لينساب، ثم نقيس فرق الجهد بالفولطميتر المربوط على التوازي بين نقاط الدائرة.',
  tags: 'فرق جهد فولط فولطميتر قوة دافعة كهربائية توازي',
  fact: ['فرق الجهد يقاس بوحدة الفولط V.', 'يربط الفولطميتر على التوازي، ومقاومته كبيرة جداً.', 'القوة الدافعة الكهربائية emf هي فرق الجهد بين قطبي المصدر عندما تكون الدائرة مفتوحة.'],
  quiz: [
    { q: 'يربط الفولطميتر في الدائرة:', o: ['على التوازي مع الجزء المراد قياس فرق الجهد عليه', 'على التوالي', 'بدل المصباح'], a: 0, why: 'ليقيس فرق الجهد بين طرفي ذلك الجزء.' },
    { q: 'مقاومة الفولطميتر:', o: ['كبيرة جداً', 'صغيرة جداً', 'صفر'], a: 0, why: 'حتى لا يسحب تياراً يذكر من الدائرة.' },
    { q: 'في تشبيه الماء، تقابل البطارية:', o: ['المضخة', 'الأنابيب', 'العجلة المائية'], a: 0, why: 'المضخة تولد فرق الضغط كما تولد البطارية فرق الجهد.' }
  ],
  parts: [{ id: 'g9_v_water', n: 'تشبيه فرق الجهد بمضخة الماء' }, { id: 'g9_v_meter', n: 'قياس فرق الجهد بالفولطميتر' }] });
M93({ id: 'g9_resist', sec: '7-3 + 8-3 المقاومة وقانون أوم', page: 59, kind: 'نشاط', fig: 'الأشكال 23–31',
  title: 'المقاومة الكهربائية: قانون أوم، والعوامل المؤثرة، وأنواع المقاومات',
  desc: 'ننفذ نشاط قانون أوم ونرسم V–I، ونغير طول السلك ومساحة مقطعه ودرجة حرارته ونوع مادته، ونقرأ ألوان المقاومات الثابتة ونجرب المتغيرة.',
  tags: 'مقاومة قانون أوم أوم طول مساحة مقطع درجة حرارة ألوان ريوستات',
  fact: ['قانون أوم: V = I × R عند ثبوت درجة الحرارة.', 'تزداد مقاومة الموصل بزيادة طوله وتقل بزيادة مساحة مقطعه.', 'تزداد مقاومة المعادن بارتفاع درجة الحرارة.', 'الفضة أفضل الموصلات ثم النحاس.'],
  quiz: [
    { q: 'مقاومة يمر بها 2 A عند فرق جهد 12 V. مقدارها:', o: ['6 Ω', '24 Ω', '0.17 Ω'], a: 0, why: 'R = V / I = 12 / 2 = 6 Ω.' },
    { q: 'عند مضاعفة طول السلك فإن مقاومته:', o: ['تتضاعف', 'تقل للنصف', 'لا تتغير'], a: 0, why: 'المقاومة تتناسب طردياً مع الطول.' },
    { q: 'عند زيادة مساحة مقطع السلك فإن مقاومته:', o: ['تقل', 'تزداد', 'لا تتغير'], a: 0, why: 'المقاومة تتناسب عكسياً مع مساحة المقطع.' },
    { q: 'ميل خط V–I لموصل أومي يمثل:', o: ['المقاومة', 'التيار', 'القدرة'], a: 0, why: 'R = V / I.' }
  ],
  parts: [{ id: 'g9_r_ohm', n: 'نشاط: قانون أوم ومخطط V–I' }, { id: 'g9_r_factors', n: 'العوامل المؤثرة في المقاومة' }, { id: 'g9_r_types', n: 'أنواع المقاومات وألوانها' }] });
M93({ id: 'g9_combo', sec: '9-3 ربط المقاومات', page: 66, kind: 'نشاط', fig: 'الأشكال 32–37',
  title: 'ربط المصابيح والمقاومات على التوالي وعلى التوازي',
  desc: 'نربط مصابيح على التوالي ثم على التوازي، ونتلف مصباحاً لنرى أثره، ونقارن الطريقتين جنباً إلى جنب، ونحل مثال الكتاب ومسائله بقيم قابلة للتغيير.',
  tags: 'ربط توالي توازي مقاومة مكافئة مصابيح تيار',
  fact: ['على التوالي: R_eq = R₁ + R₂ + … والتيار نفسه في الجميع.', 'على التوازي: 1/R_eq = 1/R₁ + 1/R₂ + … وفرق الجهد نفسه على الجميع.', 'المقاومة المكافئة على التوازي أصغر من أصغر مقاومة.', 'مصابيح البيوت مربوطة على التوازي.'],
  quiz: [
    { q: 'مقاومتان 4 Ω و 2 Ω على التوالي. المقاومة المكافئة:', o: ['6 Ω', '1.33 Ω', '8 Ω'], a: 0, why: 'R_eq = 4 + 2 = 6 Ω.' },
    { q: 'مقاومتان 6 Ω و 6 Ω على التوازي. المقاومة المكافئة:', o: ['3 Ω', '12 Ω', '6 Ω'], a: 0, why: '1/R_eq = 1/6 + 1/6 = 1/3.' },
    { q: 'إذا تلف مصباح في دائرة توالي فإن بقية المصابيح:', o: ['تنطفئ', 'يزداد توهجها', 'لا تتأثر'], a: 0, why: 'تصبح الدائرة مفتوحة.' },
    { q: 'تربط الأجهزة في المنازل على التوازي لأن:', o: ['كل جهاز يعمل بفرق الجهد الكامل ومستقل عن غيره', 'المقاومة المكافئة أكبر', 'التيار الكلي أصغر'], a: 0, why: 'تلف جهاز لا يطفئ البقية.' }
  ],
  parts: [{ id: 'g9_k_series', n: 'ربط المصابيح على التوالي' }, { id: 'g9_k_parallel', n: 'ربط المصابيح على التوازي' }, { id: 'g9_k_compare', n: 'مقارنة التوالي والتوازي' }, { id: 'g9_k_example', n: 'مثال ص 71 ومسائل الربط' }] });
M93({ id: 'g9_short', sec: '10-3 + 11-3 الدائرة القصيرة وربط الأعمدة + أسئلة الفصل', page: 72, kind: 'نشاط', fig: 'الأشكال 38–40',
  title: 'الدائرة القصيرة، وربط الأعمدة الكهربائية، وأسئلة الفصل المصورة',
  desc: 'نضع سلكاً غليظاً على طرفي مصباح فنرى الدائرة القصيرة، ونربط الخلايا على التوالي وعلى التوازي ونقيس emf، ثم نحل أسئلة الفصل المصورة.',
  tags: 'دائرة قصيرة ربط أعمدة خلايا توالي توازي emf أسئلة',
  fact: ['الدائرة القصيرة مسار مقاومته صغيرة جداً يمر فيه معظم التيار.', 'الخلايا على التوالي: emf_total = emf₁ + emf₂ + …', 'الخلايا المتماثلة على التوازي: emf_total = emf الخلية الواحدة لكنها تدوم أطول.'],
  quiz: [
    { q: 'ثلاث خلايا 1.5 V على التوالي. القوة الدافعة الكلية:', o: ['4.5 V', '1.5 V', '0.5 V'], a: 0, why: '1.5 + 1.5 + 1.5 = 4.5 V.' },
    { q: 'ثلاث خلايا 1.5 V متماثلة على التوازي. القوة الدافعة الكلية:', o: ['1.5 V', '4.5 V', '0.5 V'], a: 0, why: 'تساوي emf الخلية الواحدة.' },
    { q: 'عند حدوث دائرة قصيرة فإن التيار:', o: ['يزداد كثيراً', 'يقل', 'ينعدم'], a: 0, why: 'لأن المقاومة المكافئة تقل جداً.' },
    { q: 'لا يربط الأميتر مباشرة بين قطبي المصدر لأن:', o: ['مقاومته صغيرة جداً فيمر تيار كبير يتلفه', 'مقاومته كبيرة جداً', 'لا يقيس التيار المستمر'], a: 0, why: 'يصبح دائرة قصيرة.' }
  ],
  parts: [{ id: 'g9_s_short', n: 'الدائرة القصيرة — الشكل 38' }, { id: 'g9_s_cells', n: 'ربط الأعمدة الكهربائية' }, { id: 'g9_q_visual', n: 'أسئلة الفصل المصورة' }] });
