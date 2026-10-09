'use strict';
/* ====================== الثالث المتوسط — الفصل الأول: الكهربائية الساكنة (ch 31, ص 5–30) ======================
   Merged experiments (book order): g9_static_life · g9_charge · g9_charging · g9_electroscope · g9_apps · g9_coulomb · g9_field
   Parts are registered in M8.P (expg8_0kit.js) and merged at the end (reg: X9). Book version first, then «➕ من المختبرات العالمية» scenes.
   Local electrostatics kit Q31 (charges, rods, cloths, balloons, metal sphere, electroscope, field lines, sparks, powers of ten…). */
LW({ id: 'g9_rule', cat: 31, name: 'التجاذب والتنافر بين الشحنات', fx: 'الشحنات المتشابهة تتنافر ، الشحنات المختلفة تتجاذب', sym: 'نوعا الشحنة: موجبة (+q) عند نقص الإلكترونات، وسالبة (−q) عند زيادتها. الإلكترونات هي التي تنتقل بين الأجسام، أما البروتونات فتبقى في النواة.' });
LW({ id: 'g9_qe', cat: 31, name: 'تكمية الشحنة', fx: 'شحنة الجسم = عدد الإلكترونات × شحنة الإلكترون ، <i>q</i> = <i>n</i> × <i>e</i> ، <i>e</i> = 1.6×10<sup>−19</sup> C', sym: 'الكولوم وحدة الشحنة: 1 C يعادل شحنة 6.25×10<sup>18</sup> إلكتروناً. 1 μC = 10<sup>−6</sup> C ، 1 nC = 10<sup>−9</sup> C', calc: { in: [['q', 'الشحنة q', 'C', 1.6e-9]], out: 'عدد الإلكترونات n', u: '', f: v => v.q / 1.6e-19 } });
LW({ id: 'g9_coul', cat: 31, name: 'قانون كولوم', fx: '<i>F</i> = <i>k</i> ' + FR('<i>q</i><sub>1</sub> <i>q</i><sub>2</sub>', '<i>r</i><sup>2</sup>') + ' ، <i>k</i> = 9×10<sup>9</sup> N·m²/C²', sym: 'القوة الكهربائية المتبادلة بين شحنتين نقطيتين تتناسب طردياً مع حاصل ضرب مقداريهما وعكسياً مع مربع البعد بينهما. F₂₁ = −F₁₂ (القانون الثالث لنيوتن). موجبة ⟸ تنافر ، سالبة ⟸ تجاذب', calc: { in: [['q1', 'q₁', 'C', 4e-6], ['q2', 'q₂', 'C', 9e-6], ['r', 'البعد r', 'm', .06]], out: 'القوة F', u: 'N', f: v => 9e9 * v.q1 * v.q2 / (v.r * v.r) } });
LW({ id: 'g9_E', cat: 31, name: 'المجال الكهربائي', fx: '<i>E</i> = ' + FR('<i>F</i>', '<i>q′</i>') + ' (N/C) ، <i>F</i> = <i>q′</i> <i>E</i>', sym: 'المجال الكهربائي عند نقطة: القوة الكهربائية لوحدة الشحنة المؤثرة في شحنة اختبار صغيرة موجبة q′ موضوعة فيها. خطوطه تبدأ من الشحنة الموجبة وتنتهي بالسالبة. المجال المنتظم بين لوحين متوازيين: خطوط متوازية متساوية الأبعاد عمودية على اللوحين', calc: { in: [['F', 'القوة F', 'N', 4e-6], ['q', 'شحنة الاختبار q′', 'C', 2e-9]], out: 'المجال E', u: 'N/C', f: v => v.F / v.q } });

const Q31 = {
  K: 9e9, e: 1.6e-19,
  iso(s) { s = String(s); if (!/[\u0600-\u06FF]/.test(s)) return s; return '\u061C' + s.replace(/[(A-Za-zμ0-9\u2080-\u2089\u2070-\u207E\u00B9\u00B2\u00B3][A-Za-zμ0-9\u2080-\u2089\u2070-\u207E\u00B9\u00B2\u00B3 .=×÷+\-−\/√()·,:≈%′']*[A-Za-zμ0-9\u2080-\u2089\u2070-\u207E\u00B9\u00B2\u00B3)%′]|[0-9]/g, m => '\u2066' + m + '\u2069'); },
  T(ctx, s, x, y, o) { G.text(ctx, Q31.iso(s), x, y, Object.assign({ c: '#1e293b', raw: 1 }, o || {})); },
  raw(ctx, f) { K.raw(ctx, f); },
  ph(S) { return S && S.W && S.W < 600; },
  cx(w) { return w < 600 ? w / 2 : (w + 64) / 2; },
  sc(w, h) { return clamp(Math.min(w / 820, h / 720), .46, 1.25); },
  banner(ctx, w, s, col = '#2563eb', y = 20) { Q26.banner(ctx, w, s, col, y); },
  card(ctx, S, L, o) { o = o || {}; const wd = S.W < 600 ? S.W - 24 : Math.min(o.wd || 340, S.W * (o.f || .46)); const L2 = [];
    L.forEach(q => { const it = typeof q === 'string' ? { t: q } : q; const s = S.W < 600 ? 11 : (it.s || 12.5); const n = Math.max(16, Math.floor((wd - 20) / (s * (it.mono ? .62 : .5)))); if (String(it.t).length > n) Q31.wrap(it.t, n).forEach(l => L2.push(Object.assign({}, it, { t: l }))); else L2.push(it); });
    L = L2.map(q => Object.assign({}, q, { t: Q31.iso(q.t) })); if (o.title) o = Object.assign({}, o, { title: Q31.iso(o.title) }); return Q26.card(ctx, S, L, Object.assign({ bd: '#2563eb' }, o || {})); },
  btn(id, b, click, o) { return Q26.btn(id, b, click, o || {}); },
  drawBtn(ctx, b, label, col, on) { C2.btn(ctx, b.x, b.y, b.w, b.h, label, { col, on, s: b.w < 100 ? 11.5 : 13 }); },
  /* ---------- numbers: a × 10ⁿ with superscripts ---------- */
  sup(n) { const m = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '(': '⁽', ')': '⁾', '−': '⁻' }; return String(n).split('').map(c => m[c] || c).join(''); },
  sci(v, d = 3, u = '') { if (!isFinite(v)) return '∞'; if (v === 0) return '0' + (u ? ' ' + u : ''); const s = v < 0 ? '−' : ''; const a = Math.abs(v); let r;
    if (a >= .01 && a < 1e4) r = String(+a.toPrecision(d)); else { let e = Math.floor(Math.log10(a) + 1e-12); let m = +(a / Math.pow(10, e)).toPrecision(d); if (m >= 10) { m = +(m / 10).toPrecision(d); e++; } r = m + '×10' + Q31.sup(e); }
    return s + r + (u ? ' ' + u : ''); },
  /* ---------- charges ---------- */
  sg(ctx, x, y, s, r = 7, a = 1) { // s>0 '+', s<0 '−'
    Q31.raw(ctx, () => { ctx.globalAlpha = a; ctx.fillStyle = s > 0 ? '#ef4444' : '#2563eb'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = Math.max(1.4, r * .28); ctx.beginPath(); ctx.moveTo(x - r * .55, y); ctx.lineTo(x + r * .55, y); if (s > 0) { ctx.moveTo(x, y - r * .55); ctx.lineTo(x, y + r * .55); } ctx.stroke(); ctx.globalAlpha = 1; });
  },
  /* glossy point charge / ball with sign: s = +1/−1/0 */
  ball(ctx, x, y, r, s, label) {
    const c = s > 0 ? ['#fecaca', '#ef4444', '#991b1b'] : s < 0 ? ['#bfdbfe', '#2563eb', '#1e3a8a'] : ['#f1f5f9', '#94a3b8', '#475569'];
    Q31.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = r * .5; ctx.shadowOffsetY = r * .15; const g = ctx.createRadialGradient(x - r * .35, y - r * .4, r * .1, x, y, r); g.addColorStop(0, '#fff'); g.addColorStop(.2, c[0]); g.addColorStop(.65, c[1]); g.addColorStop(1, c[2]); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
      if (s) { ctx.strokeStyle = '#fff'; ctx.lineWidth = Math.max(2, r * .16); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - r * .42, y); ctx.lineTo(x + r * .42, y); if (s > 0) { ctx.moveTo(x, y - r * .42); ctx.lineTo(x, y + r * .42); } ctx.stroke(); ctx.lineCap = 'butt'; } });
    if (label) Q31.T(ctx, label, x, y + r + 13, { s: 12, w: 900, c: '#fff', bg: s > 0 ? '#b91c1c' : s < 0 ? '#1d4ed8' : '#475569' });
  },
  /* tiny electron dot (mobile charge) */
  el(ctx, x, y, r = 4.5, a = 1) { Q31.raw(ctx, () => { ctx.globalAlpha = a; const g = ctx.createRadialGradient(x - r * .3, y - r * .3, .5, x, y, r); g.addColorStop(0, '#bfdbfe'); g.addColorStop(1, '#1d4ed8'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - r * .5, y); ctx.lineTo(x + r * .5, y); ctx.stroke(); ctx.globalAlpha = 1; }); },
  /* charge signs spread on a rect area (cx,cy,w,h): show 'all' (pairs) / 'diff' (excess only) / 'none'; neutral count nN; excess ex (>0 → + , <0 → −) */
  spread(ctx, cx, cy, w, h, nN, ex, mode, seed = 1, r = 5.5, clip) {
    if (mode === 'none') return; const pts = []; const tot = (mode === 'all' ? nN * 2 : 0) + Math.abs(ex); let rnd = seed * 9301 + 49297;
    const R = () => { rnd = (rnd * 9301 + 49297) % 233280; return rnd / 233280; };
    const cols = Math.max(1, Math.round(Math.sqrt(tot * w / Math.max(h, 1)))), rows = Math.ceil(tot / cols) || 1;
    for (let i = 0; i < tot; i++) { const c = i % cols, rw = (i / cols) | 0; pts.push([cx - w / 2 + (c + .5) * w / cols + (R() - .5) * w / cols * .5, cy - h / 2 + (rw + .5) * h / rows + (R() - .5) * h / rows * .5]); }
    let k = 0; if (mode === 'all') for (let i = 0; i < nN; i++) { const a = pts[k++], b = pts[k++]; Q31.sg(ctx, a[0], a[1], 1, r); Q31.sg(ctx, b[0], b[1], -1, r); }
    for (let i = 0; i < Math.abs(ex); i++) { const a = pts[k++]; if (a) Q31.sg(ctx, a[0], a[1], ex > 0 ? 1 : -1, r); }
  },
  /* ---------- materials ---------- */
  MAT: { glass: { n: 'ساق زجاج', c: ['#f0f9ff', '#bae6fd', '#7dd3fc'], a: .75 }, rubber: { n: 'ساق مطاط صلب', c: ['#64748b', '#1e293b', '#020617'] }, comb: { n: 'مشط بلاستيكي', c: ['#a78bfa', '#7c3aed', '#4c1d95'] }, copper: { n: 'ساق نحاس', c: ['#fed7aa', '#ea580c', '#7c2d12'] }, amber: { n: 'كهرمان', c: ['#fde68a', '#f59e0b', '#92400e'] }, pvc: { n: 'أنبوب بلاستك', c: ['#e2e8f0', '#94a3b8', '#475569'] } },
  /* rod from (x1,y1) to (x2,y2), thickness th; kind from MAT; charges: {n: count, s: sign, from: 0..1, to: 0..1} */
  rod(ctx, x1, y1, x2, y2, th, kind, ch) {
    const M = Q31.MAT[kind] || Q31.MAT.glass, L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1);
    Q31.raw(ctx, () => {
      ctx.save(); ctx.translate(x1, y1); ctx.rotate(a);
      ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.28)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4;
      const g = ctx.createLinearGradient(0, -th / 2, 0, th / 2); g.addColorStop(0, M.c[0]); g.addColorStop(.35, M.c[1]); g.addColorStop(1, M.c[2]);
      ctx.globalAlpha = M.a || 1; ctx.fillStyle = g;
      if (kind === 'comb') { rr(ctx, 0, -th / 2, L, th * .55, 4); ctx.fill(); ctx.restore(); ctx.fillStyle = M.c[1]; for (let x = 4; x < L - 4; x += 5) ctx.fillRect(x, -th / 2 + th * .5, 2.6, th * .55); }
      else { rr(ctx, 0, -th / 2, L, th, th / 2); ctx.fill(); ctx.restore(); ctx.globalAlpha = .55; ctx.fillStyle = '#fff'; rr(ctx, th * .4, -th * .32, L - th * .8, th * .16, th * .08); ctx.fill(); }
      ctx.globalAlpha = 1;
      if (kind === 'glass') { ctx.strokeStyle = 'rgba(14,116,144,.55)'; ctx.lineWidth = 1.2; rr(ctx, 0, -th / 2, L, th, th / 2); ctx.stroke(); }
      ctx.restore();
    });
    if (ch && ch.n) { const f0 = ch.from ?? .45, f1 = ch.to ?? .97; for (let i = 0; i < ch.n; i++) { const f = ch.n === 1 ? (f0 + f1) / 2 : f0 + (f1 - f0) * i / (ch.n - 1); const oy = (i % 2 ? -1 : 1) * th * .12; Q31.sg(ctx, x1 + Math.cos(a) * L * f - Math.sin(a) * oy, y1 + Math.sin(a) * L * f + Math.cos(a) * oy, ch.s, Math.min(7, th * .36)); } }
  },
  /* cloth piece centred (x,y): wool / silk / fur */
  cloth(ctx, x, y, kind, s = 1, rot = 0) {
    Q31.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
      const C = kind === 'silk' ? ['#fdf2f8', '#f9a8d4', '#db2777'] : kind === 'fur' ? ['#fef3c7', '#d97706', '#78350f'] : ['#fef9c3', '#eab308', '#a16207'];
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 3;
      const g = ctx.createLinearGradient(-34, -24, 34, 24); g.addColorStop(0, C[0]); g.addColorStop(.6, C[1]); g.addColorStop(1, C[2]); ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(-36, -18); ctx.quadraticCurveTo(-10, -30, 34, -20); ctx.quadraticCurveTo(42, 2, 32, 22); ctx.quadraticCurveTo(0, 30, -32, 20); ctx.quadraticCurveTo(-42, 0, -36, -18); ctx.fill(); ctx.restore();
      if (kind === 'wool') { ctx.strokeStyle = 'rgba(161,98,7,.45)'; ctx.lineWidth = 1.3; for (let r = -14; r <= 14; r += 7) { ctx.beginPath(); for (let xx = -30; xx <= 30; xx += 6) ctx.arc(xx, r, 3, 0, Math.PI); ctx.stroke(); } }
      else if (kind === 'fur') { ctx.strokeStyle = 'rgba(120,53,15,.5)'; ctx.lineWidth = 1; for (let k = 0; k < 40; k++) { const xx = -30 + (k * 37 % 60), yy = -16 + (k * 23 % 32); ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + 4, yy - 5); ctx.stroke(); } }
      else { ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-28, -8); ctx.quadraticCurveTo(0, -18, 26, -6); ctx.moveTo(-26, 8); ctx.quadraticCurveTo(0, -2, 24, 10); ctx.stroke(); }
      ctx.restore();
    });
  },
  /* balloon: centre (x,y), radius r, colour; string down to (sx,sy) if given */
  balloon(ctx, x, y, r, col = '#f59e0b', o = {}) {
    Q31.raw(ctx, () => {
      if (o.sx != null) { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(x, y + r * 1.18); ctx.quadraticCurveTo(x + 10, (y + o.sy) / 2 + r * .6, o.sx, o.sy); ctx.stroke(); }
      ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 6;
      const g = ctx.createRadialGradient(x - r * .35, y - r * .45, r * .08, x, y, r * 1.15); g.addColorStop(0, '#fff'); g.addColorStop(.16, shade(col, 30)); g.addColorStop(.7, col); g.addColorStop(1, shade(col, -40));
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, r * .9, r * 1.08, 0, 0, TAU); ctx.fill(); ctx.restore();
      ctx.fillStyle = shade(col, -30); ctx.beginPath(); ctx.moveTo(x - 6, y + r * 1.16); ctx.lineTo(x + 6, y + r * 1.16); ctx.lineTo(x, y + r * 1.04); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.ellipse(x - r * .38, y - r * .5, r * .13, r * .24, -.5, 0, TAU); ctx.fill();
    });
  },
  /* lab gallows stand: base centre (x, yb), top arm at yt from x to x+arm (arm may be negative) */
  gallows(ctx, x, yb, yt, arm) {
    Q31.raw(ctx, () => {
      ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.beginPath(); ctx.ellipse(x, yb + 4, 46, 7, 0, 0, TAU); ctx.fill();
      const g = ctx.createLinearGradient(x - 40, 0, x + 40, 0); g.addColorStop(0, '#334155'); g.addColorStop(.5, '#64748b'); g.addColorStop(1, '#1e293b'); ctx.fillStyle = g; rr(ctx, x - 42, yb - 12, 84, 14, 5); ctx.fill();
      const rg = ctx.createLinearGradient(x - 4, 0, x + 4, 0); rg.addColorStop(0, '#94a3b8'); rg.addColorStop(.5, '#f8fafc'); rg.addColorStop(1, '#64748b'); ctx.fillStyle = rg; ctx.fillRect(x - 3.5, yt - 4, 7, yb - yt - 8);
      const ag = ctx.createLinearGradient(0, yt - 4, 0, yt + 4); ag.addColorStop(0, '#f8fafc'); ag.addColorStop(1, '#64748b'); ctx.fillStyle = ag; ctx.fillRect(Math.min(x, x + arm) - 3, yt - 4, Math.abs(arm) + 6, 7);
      ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(x, yt, 6, 0, TAU); ctx.fill();
    });
  },
  /* thread line */
  thread(ctx, x1, y1, x2, y2) { Q31.raw(ctx, () => { ctx.strokeStyle = '#78716c'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }); },
  /* earth symbol at (x,y) top */
  earth(ctx, x, y, s = 1) { Q31.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2.4; ctx.beginPath(); [16, 10, 4].forEach((L, i) => { ctx.moveTo(x - L * s, y + i * 6 * s); ctx.lineTo(x + L * s, y + i * 6 * s); }); ctx.stroke(); }); },
  /* metal sphere on insulating stand: centre (x,y) radius r; base at yb */
  sphere(ctx, x, y, r, yb, o = {}) {
    Q31.raw(ctx, () => {
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(x, yb + 3, r * 1.1, 7, 0, 0, TAU); ctx.fill();
      const bg = ctx.createLinearGradient(x - r, 0, x + r, 0); bg.addColorStop(0, '#1f2937'); bg.addColorStop(.5, '#4b5563'); bg.addColorStop(1, '#111827'); ctx.fillStyle = bg; rr(ctx, x - r * 1.05, yb - 12, r * 2.1, 13, 5); ctx.fill();
      const sg = ctx.createLinearGradient(x - 6, 0, x + 6, 0); sg.addColorStop(0, '#a16207'); sg.addColorStop(.5, '#fde68a'); sg.addColorStop(1, '#854d0e'); ctx.fillStyle = sg; ctx.fillRect(x - 5, y + r * .7, 10, yb - 12 - y - r * .7); // insulating stand (amber/plastic)
      ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 6;
      const g = ctx.createRadialGradient(x - r * .4, y - r * .45, r * .08, x, y, r); g.addColorStop(0, '#ffffff'); g.addColorStop(.25, o.c1 || '#e2e8f0'); g.addColorStop(.75, o.c2 || '#94a3b8'); g.addColorStop(1, o.c3 || '#475569');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
    });
  },
  /* draw signs on a circle by surface density sig(theta) (theta: 0 = towards +x); total visual count ~ |Q|+|p| */
  sphereCharges(ctx, x, y, r, near, far, dirAng = 0, mode = 'diff') { // near = excess charge on the half facing dirAng, far = on the other half
    const N = 18; if (mode === 'none') return; if (mode === 'all') { for (let i = 0; i < 9; i++) { const th = i / 9 * TAU + .2; Q31.sg(ctx, x + Math.cos(th) * r * .42, y + Math.sin(th) * r * .42, 1, 5); Q31.sg(ctx, x + Math.cos(th + .25) * r * .22, y + Math.sin(th + .25) * r * .22, -1, 5); } }
    [[near, 1], [far, -1]].forEach(([q, side]) => { const sl = []; let ws = 0; for (let i = 0; i < N; i++) { const th = dirAng + i / N * TAU, c = Math.cos(th - dirAng); if (c * side > 1e-6) { sl.push([th, Math.abs(c)]); ws += Math.abs(c); } }
      let acc = 0; const k = q / (ws || 1); sl.forEach(([th, wt], j) => { acc += k * wt; let n = 0; while (Math.abs(acc) >= .5) { const s = Math.sign(acc); Q31.sg(ctx, x + Math.cos(th) * (r * .82 - n * 13), y + Math.sin(th) * (r * .82 - n * 13), s, 6); acc -= s; n++; } }); });
  },
  /* electroscope (flask type, fig 18): base centre x, bottom yb, scale s; leafAng (rad); o: {disc: 'disc'|'ball', one: single leaf on rod (fig 19), qDisc, qLeaf, mode, hi: part id to highlight} — returns geometry */
  scope(ctx, x, yb, s, ang, o = {}) {
    const R = 62 * s, cy = yb - 18 * s - R, top = cy - R - 30 * s, dy = top - 26 * s, piv = cy + R * .05;
    const G2 = { x, yb, cy, R, top, discY: dy, piv, discR: 26 * s, rodTop: dy, leafL: R * .62 };
    Q31.raw(ctx, () => {
      const hi = o.hi; const glow = (id) => { if (hi === id) { ctx.shadowColor = '#facc15'; ctx.shadowBlur = 18; } else { ctx.shadowBlur = 0; } };
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(x, yb + 3, R * 1.1, 8 * s, 0, 0, TAU); ctx.fill();
      // feet / stand
      ctx.save(); glow('box'); const fg = ctx.createLinearGradient(0, yb - 22 * s, 0, yb); fg.addColorStop(0, '#94a3b8'); fg.addColorStop(1, '#334155'); ctx.fillStyle = fg; rr(ctx, x - R * .9, yb - 14 * s, R * 1.8, 14 * s, 5); ctx.fill(); ctx.restore();
      // case (metal ring + glass window)
      ctx.save(); glow('box'); ctx.fillStyle = 'rgba(219,234,254,.55)'; ctx.beginPath(); ctx.arc(x, cy, R, 0, TAU); ctx.fill(); ctx.restore();
      ctx.strokeStyle = hi === 'window' ? '#eab308' : '#1e3a8a'; ctx.lineWidth = 7 * s; ctx.beginPath(); ctx.arc(x, cy, R, 0, TAU); ctx.stroke();
      ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.arc(x, cy, R - 4 * s, Math.PI * 1.1, Math.PI * 1.45); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.ellipse(x - R * .45, cy - R * .4, R * .12, R * .26, .6, 0, TAU); ctx.fill();
      // stopper (insulator)
      ctx.save(); glow('stopper'); ctx.fillStyle = '#b45309'; rr(ctx, x - 13 * s, cy - R - 16 * s, 26 * s, 20 * s, 4); ctx.fill(); ctx.restore(); ctx.fillStyle = '#78350f'; ctx.fillRect(x - 13 * s, cy - R - 2 * s, 26 * s, 3 * s);
      // rod
      ctx.save(); glow('rod'); const rg = ctx.createLinearGradient(x - 3 * s, 0, x + 3 * s, 0); rg.addColorStop(0, '#78716c'); rg.addColorStop(.5, '#f5f5f4'); rg.addColorStop(1, '#57534e'); ctx.fillStyle = rg; ctx.fillRect(x - 3 * s, dy, 6 * s, piv - dy + (o.one ? R * .35 : 4 * s)); ctx.restore();
      // disc / ball
      ctx.save(); glow('disc'); if (o.disc === 'ball') { const bg = ctx.createRadialGradient(x - 8 * s, dy - 10 * s, 2, x, dy - 4 * s, 18 * s); bg.addColorStop(0, '#fff'); bg.addColorStop(.6, '#cbd5e1'); bg.addColorStop(1, '#475569'); ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(x, dy - 4 * s, 17 * s, 0, TAU); ctx.fill(); }
      else { const dg = ctx.createLinearGradient(0, dy - 8 * s, 0, dy + 4 * s); dg.addColorStop(0, '#f1f5f9'); dg.addColorStop(1, '#64748b'); ctx.fillStyle = dg; ctx.beginPath(); ctx.ellipse(x, dy - 2 * s, 26 * s, 7 * s, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(x - 26 * s, dy - 2 * s, 52 * s, 4 * s); }
      ctx.restore();
      // leaves
      ctx.save(); glow('leaves'); const L = G2.leafL;
      const leaf = (a, px, py, len) => { ctx.save(); ctx.translate(px, py); ctx.rotate(a); const lg = ctx.createLinearGradient(-5 * s, 0, 5 * s, 0); lg.addColorStop(0, '#ca8a04'); lg.addColorStop(.5, '#fde047'); lg.addColorStop(1, '#a16207'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(-4 * s, 0); ctx.lineTo(4 * s, 0); ctx.lineTo(5 * s, len); ctx.lineTo(-5 * s, len); ctx.closePath(); ctx.fill(); ctx.restore(); };
      if (o.one) leaf(-ang, x + 3 * s, piv, L * .95); else { leaf(ang, x, piv, L); leaf(-ang, x, piv, L); }
      ctx.restore();
    });
    // charges
    const mode = o.mode || 'diff';
    if (mode !== 'none') {
      const qd = Math.round(o.qDisc || 0), ql = Math.round(o.qLeaf || 0);
      for (let i = 0; i < Math.min(8, Math.abs(qd)); i++) { const f = Math.abs(qd) === 1 ? 0 : (i / (Math.min(8, Math.abs(qd)) - 1) - .5); Q31.sg(ctx, x + f * 40 * s, dy - 3 * s - (o.disc === 'ball' ? 4 * s : 0), Math.sign(qd), 5.2 * s); }
      const nl = Math.min(8, Math.abs(ql)); const L = G2.leafL;
      for (let i = 0; i < nl; i++) { const side = o.one ? (i % 2 ? 'rod' : 'leaf') : (i % 2 ? 1 : -1); const f = .3 + .6 * ((i >> 1) / Math.max(1, Math.ceil(nl / 2) - 1 || 1)); let px, py;
        if (o.one) { if (side === 'rod') { px = x - 9 * s; py = piv + R * .3 * f; } else { px = x + 3 * s + Math.sin(ang) * L * .9 * f + 9 * s; py = piv + Math.cos(ang) * L * .9 * f; } }
        else { px = x + side * (Math.sin(ang) * L * f + 9 * s); py = piv + Math.cos(ang) * L * f; }
        Q31.sg(ctx, px, py, Math.sign(ql), 5 * s); }
    }
    return G2;
  },
  /* leaf angle from leaf charge */
  leafAng(q) { return clamp(.06 + .16 * Math.pow(Math.abs(q), .8), .06, 1.05); },
  /* conductor induction model: Q net, qi inducer, f proximity 0..1; grounded → target Q; returns near, far */
  cond(Q, qi, f, kap = .55) { const p = kap * qi * f; return { near: Q / 2 - p, far: Q / 2 + p, Qg: -2 * p }; },
  /* electric spark between two points */
  spark(ctx, x1, y1, x2, y2, t, w = 3) {
    Q31.raw(ctx, () => {
      const n = 9, pts = [[x1, y1]]; const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
      for (let i = 1; i < n; i++) { const f = i / n, j = Math.sin(t * 91 + i * 7.3) * Math.min(14, L * .14); pts.push([x1 + (x2 - x1) * f + nx * j, y1 + (y2 - y1) * f + ny * j]); } pts.push([x2, y2]);
      ctx.lineJoin = 'round'; [['rgba(147,197,253,.35)', w * 5], ['rgba(191,219,254,.8)', w * 2], ['#fff', w * .8]].forEach(([c, lw]) => { ctx.strokeStyle = c; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); });
      const g = ctx.createRadialGradient(x2, y2, 1, x2, y2, 26); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(147,197,253,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x2, y2, 26, 0, TAU); ctx.fill();
    });
  },
  /* lightning bolt polyline from (x1,y1) to (x2,y2) with branches, seed changes shape */
  bolt(ctx, x1, y1, x2, y2, seed, a = 1) {
    Q31.raw(ctx, () => {
      let r = seed * 7919 % 1000 / 1000; const R = () => { r = (r * 9301 + .49297) % 1; return r; };
      const main = [[x1, y1]]; const n = 14; for (let i = 1; i < n; i++) { const f = i / n; main.push([x1 + (x2 - x1) * f + (R() - .5) * 46, y1 + (y2 - y1) * f]); } main.push([x2, y2]);
      const draw = (pts, w) => { [['rgba(196,181,253,' + .35 * a + ')', w * 6], ['rgba(224,231,255,' + .9 * a + ')', w * 2.2], ['rgba(255,255,255,' + a + ')', w]].forEach(([c, lw]) => { ctx.strokeStyle = c; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }); };
      draw(main, 2.6); for (let b = 0; b < 3; b++) { const i = 2 + ((R() * (n - 5)) | 0); const p = main[i]; const br = [p]; let q = p; for (let k = 0; k < 4; k++) { q = [q[0] + (R() - .3) * 34 * (b % 2 ? -1 : 1), q[1] + 18 + R() * 16]; br.push(q); } draw(br, 1.2); }
    });
  },
  /* E field of point charges list [{x,y,q}] at (x,y) (px units, arbitrary scale) */
  E(chs, x, y) { let ex = 0, ey = 0; for (const c of chs) { const dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy + 30, r = Math.sqrt(r2); ex += c.q * dx / (r2 * r); ey += c.q * dy / (r2 * r); } return [ex, ey]; },
  /* field lines traced from + charges (or into − if none positive); returns polylines; bounds b={x0,y0,x1,y1} */
  lines(chs, b, per = 10, rad = 14) {
    const out = []; const pos = chs.filter(c => c.q > 0), neg = chs.filter(c => c.q < 0); const src = pos.length ? pos : neg, sgn = pos.length ? 1 : -1;
    src.forEach(c => { const n = Math.max(4, Math.round(per * Math.abs(c.q))); for (let i = 0; i < n; i++) { const a = (i + .5) / n * TAU; let x = c.x + Math.cos(a) * rad, y = c.y + Math.sin(a) * rad; const pts = [[x, y]]; let end = null;
        for (let k = 0; k < 700; k++) { const [ex, ey] = Q31.E(chs, x, y); const L = Math.hypot(ex, ey) || 1; x += sgn * ex / L * 4; y += sgn * ey / L * 4; pts.push([x, y]);
          if (x < b.x0 - 40 || x > b.x1 + 40 || y < b.y0 - 40 || y > b.y1 + 40) break; let hit = false; for (const d of chs) if (d !== c && Math.hypot(x - d.x, y - d.y) < rad * .8 && Math.sign(d.q) !== Math.sign(c.q)) { hit = true; end = d; } if (hit) break; }
        out.push({ pts: sgn > 0 ? pts : pts.reverse(), from: c, to: end }); } });
    return out;
  },
  drawLines(ctx, L, col = '#ea580c', w = 1.6, arrows = true) {
    Q31.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = w; L.forEach(l => { ctx.beginPath(); l.pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }); });
    if (arrows) L.forEach(l => { const n = l.pts.length; [.3, .7].forEach(f => { const i = Math.floor(n * f); if (i < 2 || i >= n - 1) return; const a = l.pts[i - 1], c = l.pts[i + 1]; Q26.head(ctx, l.pts[i][0], l.pts[i][1], Math.atan2(c[1] - a[1], c[0] - a[0]), col, 7); }); });
  },
  /* moving particles helper: list of {x,y,tx,ty,t,d} */
  fly(S, x, y, tx, ty, d = .7, k = 'e') { (S._fly = S._fly || []).push({ x, y, tx, ty, t: 0, d, k }); },
  drawFly(ctx, S, dt = 1 / 60) { if (!S._fly) return; S._fly.forEach(p => { p.t += dt; const f = clamp(p.t / p.d, 0, 1), e = f * f * (3 - 2 * f); const x = p.x + (p.tx - p.x) * e, y = p.y + (p.ty - p.y) * e - Math.sin(Math.PI * f) * 14; if (p.k === 'e') Q31.el(ctx, x, y, 5); else Q31.sg(ctx, x, y, -1, 5); }); S._fly = S._fly.filter(p => p.t < p.d); },
  /* rub tracker: call in drag with distance moved inside zone; returns # of transfers to perform */
  rub(S, d, inZone, per = 34) { if (!inZone) return 0; S._rubA = (S._rubA || 0) + Math.hypot(d.dx || 0, d.dy || 0); let n = 0; while (S._rubA > per) { S._rubA -= per; n++; } return n; },
  /* hand pointing finger at (x,y) tip */
  finger(ctx, x, y, dir = -1, s = 1, rot = 0) { C2.hand(ctx, x, y, dir, s, { rot, sleeve: '#0ea5e9' }); },
  /* chip row: legend of charge display */
  legend(ctx, x, y) { Q31.sg(ctx, x, y, 1, 6); Q31.T(ctx, 'شحنة موجبة (بروتون/أيون موجب)', x - 12, y, { s: 11, w: 800, a: 'right', c: '#7f1d1d' }); Q31.sg(ctx, x, y + 18, -1, 6); Q31.T(ctx, 'إلكترون (شحنة سالبة)', x - 12, y + 18, { s: 11, w: 800, a: 'right', c: '#1e3a8a' }); },
  /* stage-strip (a b c d e…) of a procedure; cur index */
  strip(ctx, w, y, items, cur, col = '#2563eb') {
    const ph = w < 600, x0 = ph ? 8 : 74, wd = (w - x0 - 10) / items.length;
    items.forEach((t, i) => { const on = i === cur, done = i < cur; Q31.raw(ctx, () => { ctx.fillStyle = on ? col : done ? 'rgba(37,99,235,.18)' : 'rgba(148,163,184,.18)'; rr(ctx, x0 + i * wd + 2, y, wd - 4, ph ? 30 : 26, 8); ctx.fill(); });
      Q31.T(ctx, t, x0 + i * wd + wd / 2, y + (ph ? 15 : 13), { s: ph ? 9.5 : 11.5, w: 900, c: on ? '#fff' : done ? '#1e3a8a' : '#475569' }); });
  },
  wrap(t, n) { return Q26.wrap(t, n); },
  /* simple humanoid (side, standing) via Q24.person */
  person(ctx, o) { Q24.person(ctx, o); },
  ex(S, x, y) { K.cheer(S, x, y); }
};
/* =============== E1 — الكهربائية الساكنة من حولنا (1-1، ص 7–10) =============== */
(() => {
  const SC = [['comb', '1) المشط وقصاصات الورق'], ['bpaper', '2) البالون وقصاصات الورق'], ['bhair', '3) البالون وشعر الرأس'], ['wall', '4) البالون والجدار'], ['carpet', '5) السجادة ومقبض الباب'], ['car', '6) السيارة والمفتاح'], ['water', '7) المشط وماء الحنفية'], ['slide', '8) لعبة التزحلق']];
  const FIG = { comb: 1, bpaper: 2, bhair: 3, wall: 4, carpet: 5, car: 6, water: 7, slide: 8 };
  const QMAX = 10;
  const D = { id: 'g9_life_obs', page: 7, fig: 'الأشكال 1–8',
    desc: 'ملاحظات معروفة من حياتنا: المشط المدلوك بالشعر يجذب قصاصات الورق، البالون المدلوك بالصوف يلتصق بالجدار ويجذب الشعر، صعقة مقبض الباب، شرارة مفتاح السيارة، انحراف ماء الحنفية، وصعقة لعبة التزحلق.',
    tags: 'مشط قصاصات ورق بالون صوف شعر جدار سجادة مقبض باب صعقة شرارة سيارة مفتاح ماء حنفية تزحلق رطوبة',
    tools: ['مشط بلاستيكي', 'بالون', 'قطعة صوف', 'قصاصات ورق', 'حنفية ماء'],
    steps: ['اختر المشاهدة من «المشاهدة (الشكل)» — مرتبة كما في الكتاب (الأشكال 1–8).', 'ادلك: اسحب المشط/البالون ذهاباً وإياباً فوق الشعر أو الصوف (أو اضغط زر «ادلك»)، أو اسحب قدم الشخص على السجادة.', 'لاحظ عدد الشحنات المتولدة بالاحتكاك (أيقونة الشحنات).', 'قرّب الجسم المشحون من القصاصات / الشعر / الجدار / الماء، أو قرّب اليد من الجسم المعدني.', 'غيّر «الجو» إلى رطب ولاحظ كيف تتفرغ الشحنات بسرعة.'],
    concl: ['الأجسام تكتسب شحنات كهربائية ساكنة بالاحتكاك (الدلك).', 'الجسم المشحون يجذب الأجسام الخفيفة غير المشحونة (قصاصات الورق، الشعر، الماء).', 'تتفرغ الشحنات بشكل صعقة طفيفة أو شرارة عند ملامسة جسم معدني.', 'الهواء الرطب يساعد على تفريغ الشحنات بسرعة، لذلك تنجح التجارب في الجو الجاف والشعر الجاف بدون زيت.'],
    controls: [SEL('sc', 'المشاهدة (الشكل)', SC, 'comb', (v, S) => D.reset(S)), SEL('air', 'الجو', [['dry', 'جاف'], ['wet', 'رطب']], 'dry'),
      BT('', [{ t: '🧽 ادلك', on: S => { S.autoRub = 1.4; } }, { t: '↺ أعد', on: S => D.reset(S) }]),
      TG('chg', 'الشحنات', true, null, 'charges'), TG('fx', 'أسهم قوة الجذب', true, null, 'force'), TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.q = 0; S.autoRub = 0; S.obj = null; S.bits = null; S.stuck = 0; S.fall = 0; S.flash = 0; S.slideF = 0; S.shocks = 0; S._fly = []; S.vy = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, cx = Q31.cx(w), by = h * (ph ? .78 : .8), u = Q31.sc(w, h) * (ph ? 1 : 1.3); return { w, h, ph, cx, by, u, x0: ph ? 8 : 70 }; },
    init(S, g) { // object default positions per scene
      if (S.obj) return; const sc = S.p.sc, u = g.u;
      if (sc === 'comb' || sc === 'bpaper') { S.obj = { x: g.cx, y: g.h * .36 }; S.bits = Array.from({ length: 16 }, (_, i) => ({ x: g.cx + g.w * .1 + (i % 8) * 16 * u - 50 * u, y: g.by - 3, ox: g.cx + g.w * .1 + (i % 8) * 16 * u - 50 * u + (i > 7 ? 7 : 0), att: 0, vy: 0, r: (i * 37) % 7 })); }
      else if (sc === 'bhair' || sc === 'wall') { S.obj = { x: g.cx + (sc === 'wall' ? -40 : 140) * u, y: g.h * .35 }; }
      else if (sc === 'water') { S.obj = { x: g.cx + 150 * u, y: g.h * .5 }; }
      else if (sc === 'carpet') { S.obj = { x: g.cx - 60 * u, y: g.by - 110 * u }; S.foot = 0; }
      else if (sc === 'car') { S.obj = { x: g.cx - 130 * u, y: g.by - 105 * u }; }
      else if (sc === 'slide') { S.obj = { x: g.cx - 170 * u, y: g.by - 90 * u }; S.slideF = 0; }
    },
    leak(S) { return S.p.air === 'wet' ? .9 : .02; },
    rubZone(S, g) { const sc = S.p.sc, u = g.u;
      if (sc === 'comb') return { x: g.cx - g.w * .26, y: g.h * .34, r: 60 * u, k: 'hair' };
      if (sc === 'water') return { x: g.cx - g.w * .28, y: g.h * .62, r: 50 * u, k: 'wool' };
      if (sc === 'bpaper' || sc === 'bhair' || sc === 'wall') return { x: g.cx - g.w * .3 + (sc === 'bhair' ? g.w * .52 : 0), y: g.by - 30 * u, r: 55 * u, k: 'wool' };
      return null; },
    addQ(S, n, g) { const sc = S.p.sc; if (S.q >= QMAX) return; const z = D.rubZone(S, g); S.q = Math.min(QMAX, S.q + n); if (z && S.obj) for (let i = 0; i < n; i++) Q31.fly(S, z.x + (Math.random() - .5) * 30, z.y, S.obj.x, S.obj.y, .5); if (window.Sound && Sound.tick) Sound.tick(); },
    update(S, dt) {
      if (!S.W) return; const g = D.geo(S); D.init(S, g); const sc = S.p.sc, u = g.u;
      if (S.autoRub > 0) { S.autoRub -= dt; S._ar = (S._ar || 0) + dt; if (S._ar > .12) { S._ar = 0; D.addQ(S, 1, g); } }
      if (S.q > 0 && !S.drag) S.q = Math.max(0, S.q - S.q * D.leak(S) * dt * (S.p.air === 'wet' ? 1 : .2));
      if (S.flash > 0) S.flash -= dt;
      const O = S.obj; if (!O) return;
      if (sc === 'comb' || sc === 'bpaper') { const rObj = sc === 'comb' ? 30 * u : 50 * u;
        S.bits.forEach(b => { const dx = O.x - b.x, dy = O.y - b.y, d = Math.hypot(dx, dy); const reach = S.q * 15 * u + 10;
          if (b.att) { if (S.q < 1.2) { b.att = 0; b.vy = 0; } else { b.x = O.x + b.ax; b.y = O.y + b.ay; return; } }
          if (d < reach + rObj && S.q >= 1.5) { b.x += dx / d * 320 * dt; b.y += dy / d * 320 * dt; b.vy = 0; if (d < rObj + 6) { b.att = 1; b.ax = b.x - O.x; b.ay = b.y - O.y; } }
          else { b.vy += 900 * dt; b.y = Math.min(g.by - 3, b.y + b.vy * dt); if (b.y >= g.by - 3) b.vy = 0; } }); }
      if (sc === 'wall') { const wx = g.w - (g.ph ? 40 : 110) * u, r = 48 * u;
        if (!S.drag) { if (S.stuck && S.q < 2) S.stuck = 0; if (!S.stuck) { if (O.x + r * .9 >= wx - 4 && S.q >= 2) S.stuck = 1; else { S.vy = (S.vy || 0) + 300 * dt; O.y = Math.min(g.by - r * 1.1, O.y + S.vy * dt); if (O.y >= g.by - r * 1.1) S.vy = 0; } } } }
      if (sc === 'carpet' || sc === 'car' || sc === 'slide') { const T = D.metal(S, g); const d = Math.hypot(O.x - T.x, O.y - T.y);
        if (S.q >= 1 && d < 8 + S.q * 3.2 * u) { S.flash = .45; S.spk = [O.x, O.y, T.x, T.y]; S.shocks++; for (let i = 0; i < Math.min(6, Math.round(S.q)); i++) Q31.fly(S, O.x, O.y, T.x + (Math.random() - .5) * 10, T.y + 10, .35); S.q = 0; C2.msg(S, 'صعقة كهربائية طفيفة! ⚡\nتفرغت الشحنات في المعدن', 2.2); if (window.Sound && Sound.ok) Sound.ok(); } }
    },
    metal(S, g) { const sc = S.p.sc, u = g.u; if (sc === 'carpet') return { x: g.cx + 175 * u, y: g.by - 118 * u }; if (sc === 'car') return { x: g.cx + 10 * u, y: g.by - 84 * u }; return { x: g.cx + 150 * u, y: g.by - 120 * u }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); D.init(S, g); const p = S.p, sc = p.sc, u = g.u, O = S.obj, chg = p.chg !== false;
      K.bg(ctx, w, h, { benchY: g.by, top: p.air === 'wet' ? '#e2e8f0' : '#e0f2fe' });
      if (p.air === 'wet') Q31.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.25)'; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc((i * 97) % w, (i * 53) % (g.by), 2 + i % 3, 0, TAU); ctx.fill(); } });
      const z = D.rubZone(S, g);
      D['d_' + sc](ctx, S, g, z);
      Q31.drawFly(ctx, S);
      // charge meter
      const mx = g.ph ? 12 : 78, my = g.ph ? 62 : 52; Q31.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(ctx, mx, my, 150, 34, 9); ctx.fill(); ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#e2e8f0'; rr(ctx, mx + 8, my + 21, 134, 7, 3); ctx.fill(); ctx.fillStyle = S.q > 6 ? '#dc2626' : '#2563eb'; rr(ctx, mx + 8, my + 21, 134 * S.q / QMAX, 7, 3); ctx.fill(); });
      Q31.T(ctx, 'الشحنة المتولدة: ' + Math.round(S.q), mx + 75, my + 11, { s: 11.5, w: 900, c: '#1e3a8a' });
      Q31.banner(ctx, w, 'الشكل (' + FIG[sc] + ') — ' + D.hint(S), '#2563eb');
      C2.drawMsg(ctx, S, g.cx, g.h * .28); K.party(ctx, S);
    },
    hint(S) { const sc = S.p.sc; if (S.q < 1) return { comb: 'ادلك المشط بالشعر ثم قرّبه من القصاصات', bpaper: 'ادلك البالون بالصوف ثم قرّبه من القصاصات', bhair: 'ادلك البالون بالصوف ثم قرّبه من الشعر', wall: 'ادلك البالون ثم ادفعه نحو الجدار واتركه', carpet: 'اسحب القدم على السجادة ذهاباً وإياباً', car: 'اضغط «ادلك» (الاحتكاك بالمقعد عند النزول)', water: 'ادلك المشط بالصوف ثم قرّبه من الماء', slide: 'اسحب الطفل نزولاً على الزحلوقة' }[sc]; return { carpet: 'قرّب اليد من مقبض الباب المعدني', car: 'قرّب المفتاح من جسم السيارة', slide: 'قرّب يد الطفل من العمود المعدني' }[sc] || 'قرّب الجسم المشحون'; },
    /* ----- scenes ----- */
    hairHead(ctx, x, y, u, S, tgt) { // girl head (facing right) with long loose hair; tgt = charged object attracting the strands
      const hairC = '#6b2f12';
      Q31.raw(ctx, () => {
        // back hair mass
        ctx.fillStyle = shade(hairC, -15); ctx.beginPath(); ctx.ellipse(x - 8 * u, y + 10 * u, 44 * u, 58 * u, 0, 0, TAU); ctx.fill();
        // neck + shirt
        ctx.fillStyle = '#f2c29b'; ctx.fillRect(x - 11 * u, y + 34 * u, 22 * u, 24 * u);
        ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.ellipse(x, y + 78 * u, 52 * u, 26 * u, 0, Math.PI, TAU); ctx.fill();
        // face
        const fg = ctx.createRadialGradient(x + 6 * u, y - 6 * u, 4, x, y, 44 * u); fg.addColorStop(0, '#fde7d3'); fg.addColorStop(1, '#f2c29b'); ctx.fillStyle = fg; ctx.beginPath(); ctx.ellipse(x + 4 * u, y + 2 * u, 31 * u, 38 * u, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(x + 20 * u, y - 2 * u, 3.2 * u, 0, TAU); ctx.fill(); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(x + 20 * u, y - 4 * u, 7 * u, -2.6, -1.4); ctx.stroke();
        ctx.fillStyle = 'rgba(244,114,182,.35)'; ctx.beginPath(); ctx.arc(x + 18 * u, y + 12 * u, 6 * u, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + 18 * u, y + 16 * u, 8 * u, .3, 1.3); ctx.stroke();
        // hair cap
        ctx.fillStyle = hairC; ctx.beginPath(); ctx.ellipse(x - 2 * u, y - 14 * u, 38 * u, 30 * u, 0, Math.PI * .95, Math.PI * 2.05); ctx.fill(); ctx.beginPath(); ctx.ellipse(x - 20 * u, y + 4 * u, 18 * u, 40 * u, 0, 0, TAU); ctx.fill();
        // loose strands: from the crown, hanging; attracted tips move toward the charged object
        ctx.strokeStyle = hairC; ctx.lineCap = 'round';
        for (let i = 0; i < 30; i++) { const a = Math.PI * (1.0 + i / 29 * 1.0); const rx = x - 2 * u + Math.cos(a) * 36 * u, ry = y - 14 * u + Math.sin(a) * 28 * u;
          const side = Math.cos(a); let tx = rx + side * 16 * u, ty = ry + (side < 0 ? 70 : side > .6 ? 20 : -6) * u - (1 - Math.abs(side)) * 18 * u; let cx2 = rx + side * 20 * u, cy2 = ry - 6 * u;
          if (tgt && S.q > 0) { const dx = tgt.x - tx, dy = tgt.y - ty, d = Math.hypot(dx, dy) || 1; const k = clamp(S.q * 2600 * u / (d * d / 60 + 300), 0, d * .75); tx += dx / d * k; ty += dy / d * k; cx2 += dx / d * k * .4; cy2 += dy / d * k * .4; }
          ctx.lineWidth = (1.6 + (i % 3) * .5) * u; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.quadraticCurveTo(cx2, cy2, tx, ty); ctx.stroke(); }
        ctx.lineCap = 'butt';
      });
    },
    rubCloth(ctx, z, u, k) { if (k === 'hair') return; Q31.cloth(ctx, z.x, z.y, k, 1.3 * u); Q31.T(ctx, 'قطعة صوف — ادلك هنا', z.x, z.y + 38 * u, { s: 11, w: 800, c: '#fff', bg: 'rgba(161,98,7,.9)' }); },
    d_comb(ctx, S, g, z) { const u = g.u, O = S.obj; D.hairHead(ctx, z.x, z.y, u * 1.1, S, null); Q31.T(ctx, 'شعر جاف — ادلك المشط هنا', z.x, z.y + 98 * u, { s: 11, w: 800, c: '#fff', bg: 'rgba(124,45,18,.9)' }); D.bitsDraw(ctx, S, g); Q31.rod(ctx, O.x - 55 * u, O.y, O.x + 55 * u, O.y, 22 * u, 'comb', S.p.chg !== false ? { n: Math.round(S.q), s: -1, from: .08, to: .92 } : null); if (S.p.lab !== false) Q31.T(ctx, 'مشط بلاستيكي', O.x, O.y - 24 * u, { s: 11.5, w: 800, c: '#fff', bg: '#6d28d9' }); },
    d_bpaper(ctx, S, g, z) { const u = g.u, O = S.obj; D.rubCloth(ctx, z, u, 'wool'); D.bitsDraw(ctx, S, g); Q31.balloon(ctx, O.x, O.y, 46 * u, '#ef4444'); if (S.p.chg !== false) D.bSigns(ctx, O, 46 * u, S.q); },
    bSigns(ctx, O, r, q) { const n = Math.round(q); for (let i = 0; i < n; i++) { const a = -Math.PI * .1 + i * .62; Q31.sg(ctx, O.x + Math.cos(a) * r * .55, O.y + Math.sin(a) * r * .6, -1, 6); } },
    bitsDraw(ctx, S, g) { const O = S.obj; Q31.raw(ctx, () => { S.bits.forEach((b, i) => { ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r * .4 + (b.att ? .6 : 0)); ctx.fillStyle = ['#fff', '#fde68a', '#bfdbfe', '#fbcfe8'][i % 4]; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = .8; ctx.fillRect(-7, -4.5, 14, 9); ctx.strokeRect(-7, -4.5, 14, 9); ctx.restore(); }); });
      if (S.p.fx !== false && S.q >= 1.5) S.bits.forEach((b, i) => { if (b.att || i % 3) return; const dx = O.x - b.x, dy = O.y - b.y, d = Math.hypot(dx, dy); if (d < 220) Q26.head(ctx, b.x + dx / d * 16, b.y + dy / d * 16, Math.atan2(dy, dx), '#16a34a', 7); });
      if (S.p.lab !== false) Q31.T(ctx, 'قصاصات ورق', g.cx + g.w * .1, g.by + 16, { s: 11, w: 800, c: '#fff', bg: 'rgba(30,41,59,.8)' }); },
    d_bhair(ctx, S, g, z) { const u = g.u, O = S.obj; D.rubCloth(ctx, z, u, 'wool'); D.hairHead(ctx, g.cx - 90 * u, g.h * .4, u * 1.4, S, O); Q31.balloon(ctx, O.x, O.y, 50 * u, '#3b82f6'); if (S.p.chg !== false) D.bSigns(ctx, O, 50 * u, S.q);
      if (S.p.fx !== false && S.q > 1) { const hx = g.cx - 90 * u + 40 * u, hy = g.h * .4 - 50 * u, dx = O.x - hx, dy = O.y - hy, d = Math.hypot(dx, dy); if (d < 300 * u) K.force(ctx, hx, hy, dx / d * 40, dy / d * 40, 'جذب', '#16a34a', 3); } },
    d_wall(ctx, S, g, z) { const u = g.u, O = S.obj, wx = g.w - (g.ph ? 40 : 110) * u, r = 48 * u;
      Q31.raw(ctx, () => { const wg = ctx.createLinearGradient(wx, 0, g.w, 0); wg.addColorStop(0, '#fde68a'); wg.addColorStop(1, '#f59e0b'); ctx.fillStyle = wg; ctx.fillRect(wx, 0, g.w - wx, g.by); ctx.strokeStyle = 'rgba(146,64,14,.25)'; for (let y = 10; y < g.by; y += 28) { ctx.beginPath(); ctx.moveTo(wx, y); ctx.lineTo(g.w, y); ctx.stroke(); } });
      if (S.p.chg !== false) { const near = Math.max(0, 1 - (wx - O.x - r) / (160 * u)) * Math.min(1, S.q / 4); for (let k = 0; k < 7; k++) { const yy = 60 + k * (g.by - 90) / 6, dyb = Math.abs(yy - O.y); const sh = near * Math.max(0, 1 - dyb / (120 * u)) * 6; Q31.raw(ctx, () => { ctx.strokeStyle = 'rgba(120,53,15,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(wx + 26, yy, 14, 9, 0, 0, TAU); ctx.stroke(); }); Q31.sg(ctx, wx + 20 - sh, yy, 1, 4.5); Q31.sg(ctx, wx + 32 + sh, yy, -1, 4.5); }
        if (S.p.lab !== false) Q31.T(ctx, 'جزيئات الجدار تستقطب: + نحو البالون', wx - 8, 84, { s: 10.5, w: 800, c: '#fff', bg: 'rgba(146,64,14,.9)', a: 'right' }); }
      D.rubCloth(ctx, z, u, 'wool'); Q31.balloon(ctx, O.x, O.y, r, '#22c55e'); if (S.p.chg !== false) D.bSigns(ctx, O, r, S.q);
      if (S.stuck) Q31.T(ctx, 'البالون ملتصق بالجدار ✓', O.x - 10, O.y - r - 26, { s: 12, w: 900, c: '#fff', bg: '#15803d' }); },
    d_water(ctx, S, g, z) { const u = g.u, O = S.obj, tx = g.cx, ty = g.h * .12;
      Q31.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; rr(ctx, tx - 70 * u, ty - 22 * u, 80 * u, 16 * u, 5); ctx.fill(); rr(ctx, tx - 10 * u, ty - 22 * u, 20 * u, 30 * u, 5); ctx.fill(); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(tx - 4 * u, ty - 34 * u, 8 * u, 12 * u);
        // stream
        ctx.strokeStyle = 'rgba(56,189,248,.8)'; ctx.lineWidth = 4 * u; ctx.lineCap = 'round'; ctx.beginPath(); let x = tx; ctx.moveTo(x, ty + 8 * u); for (let y = ty + 8 * u; y < g.by - 40 * u; y += 6) { const dy = O.y - y, dx = O.x - x, d2 = dx * dx + dy * dy + 900; x += Math.sign(dx) * Math.min(4, S.q * 900 * u / d2) * (S.q >= 1 ? 1 : 0); ctx.lineTo(x, y); } ctx.stroke();
        ctx.fillStyle = 'rgba(56,189,248,.35)'; ctx.beginPath(); ctx.ellipse(x, g.by - 30 * u, 50 * u, 10 * u, 0, 0, TAU); ctx.fill(); ctx.lineCap = 'butt';
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 60 * u, g.by - 46 * u); ctx.lineTo(x - 55 * u, g.by - 4); ctx.lineTo(x + 55 * u, g.by - 4); ctx.lineTo(x + 60 * u, g.by - 46 * u); ctx.stroke(); });
      D.rubCloth(ctx, z, u, 'wool'); Q31.rod(ctx, O.x - 50 * u, O.y, O.x + 50 * u, O.y, 22 * u, 'comb', S.p.chg !== false ? { n: Math.round(S.q), s: -1, from: .08, to: .92 } : null);
      if (S.p.lab !== false) Q31.T(ctx, 'ماء ينساب رفيعاً من الحنفية', tx, ty - 46 * u, { s: 11, w: 800, c: '#fff', bg: '#0369a1' }); },
    person(ctx, g, S, hip, H, f, shirt) { const O = S.obj; const gy = hip[1] + H * .52; Q31.person(ctx, { H, f, hip, neck: [hip[0] + f * 3, hip[1] - H * .33], hands: [[hip[0] - f * 14, hip[1] + 6], [O.x, O.y]], feet: S.feet || [[hip[0] - 10, gy], [hip[0] + 14, gy]], shirt: shirt || '#0ea5e9', pants: '#1e3a8a' });
      if (S.p.chg !== false && S.q > 0) for (let i = 0; i < Math.round(S.q); i++) Q31.sg(ctx, hip[0] + ((i % 3) - 1) * 12, hip[1] - H * .05 - (i / 3 | 0) * 14, -1, 5.5); },
    d_carpet(ctx, S, g) { const u = g.u, H = 190 * u, hx = g.cx - 100 * u + (S.foot || 0) * .3, hip = [hx, g.by - H * .52]; const T = D.metal(S, g);
      Q31.raw(ctx, () => { const cg = ctx.createLinearGradient(0, g.by - 6, 0, g.by + 18); cg.addColorStop(0, '#b91c1c'); cg.addColorStop(1, '#7f1d1d'); ctx.fillStyle = cg; ctx.fillRect(g.cx - 260 * u, g.by - 6, 380 * u, 18); ctx.strokeStyle = '#fbbf24'; ctx.setLineDash([6, 5]); ctx.strokeRect(g.cx - 254 * u, g.by - 3, 368 * u, 12); ctx.setLineDash([]);
        const dx = T.x + 6 * u; const dg = ctx.createLinearGradient(dx, 0, dx + 90 * u, 0); dg.addColorStop(0, '#92400e'); dg.addColorStop(1, '#78350f'); ctx.fillStyle = dg; ctx.fillRect(dx, g.by - 270 * u, 90 * u, 264 * u);
        const kg = ctx.createRadialGradient(T.x + 10 * u, T.y - 4, 1, T.x + 12 * u, T.y, 12 * u); kg.addColorStop(0, '#fff'); kg.addColorStop(.5, '#d4d4d8'); kg.addColorStop(1, '#52525b'); ctx.fillStyle = kg; ctx.beginPath(); ctx.arc(T.x + 12 * u, T.y, 11 * u, 0, TAU); ctx.fill(); });
      S.feet = [[hx - 12 + (S.foot || 0), g.by - 6], [hx + 14, g.by - 6]]; D.person(ctx, g, S, hip, H, 1);
      Q31.T(ctx, 'سجادة صوف — اسحب القدم ↔', g.cx - 70 * u, g.by + 26, { s: 11, w: 800, c: '#fff', bg: '#7f1d1d' }); if (S.p.lab !== false) Q31.T(ctx, 'مقبض معدني', T.x + 12 * u, T.y - 22 * u, { s: 11, w: 800, c: '#fff', bg: '#52525b' });
      D.shock(ctx, S); },
    shock(ctx, S) { if (S.flash > 0 && S.spk) Q31.spark(ctx, S.spk[0], S.spk[1], S.spk[2], S.spk[3], S.t); },
    d_car(ctx, S, g) { const u = g.u, H = 190 * u, hip = [g.cx - 190 * u, g.by - H * .52], T = D.metal(S, g);
      Q31.raw(ctx, () => { const u0 = u; { const u = u0 * .78; const x = T.x - 20 * u, y = g.by - 150 * u; const cg = ctx.createLinearGradient(0, y, 0, g.by); cg.addColorStop(0, '#60a5fa'); cg.addColorStop(1, '#1e3a8a'); ctx.fillStyle = cg;
        ctx.beginPath(); ctx.moveTo(x, g.by - 30 * u); ctx.lineTo(x, y + 50 * u); ctx.quadraticCurveTo(x + 30 * u, y, x + 90 * u, y); ctx.lineTo(x + 200 * u, y); ctx.quadraticCurveTo(x + 260 * u, y + 40 * u, x + 300 * u, y + 60 * u); ctx.lineTo(x + 300 * u, g.by - 30 * u); ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(224,242,254,.85)'; ctx.beginPath(); ctx.moveTo(x + 20 * u, y + 48 * u); ctx.quadraticCurveTo(x + 40 * u, y + 12 * u, x + 92 * u, y + 12 * u); ctx.lineTo(x + 140 * u, y + 12 * u); ctx.lineTo(x + 140 * u, y + 48 * u); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#111827'; [x + 60 * u, x + 240 * u].forEach(wx => { ctx.beginPath(); ctx.arc(wx, g.by - 26 * u, 26 * u, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(wx, g.by - 26 * u, 11 * u, 0, TAU); ctx.fill(); ctx.fillStyle = '#111827'; }); }
        // key in hand
        const O = S.obj; ctx.fillStyle = '#d4d4d8'; ctx.strokeStyle = '#52525b'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(O.x - 6 * u, O.y, 8 * u, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillRect(O.x, O.y - 2.5 * u, 26 * u, 5 * u); });
      D.person(ctx, g, S, hip, H, 1, '#16a34a'); if (S.p.lab !== false) Q31.T(ctx, 'الجزء المعدني للسيارة', T.x + 30 * u, T.y - 64 * u, { s: 11, w: 800, c: '#fff', bg: '#1e3a8a' });
      if (S.flash > 0) Q31.spark(ctx, S.obj.x + 26 * u, S.obj.y, T.x, T.y, S.t); },
    d_slide(ctx, S, g) { const u = g.u, T = D.metal(S, g), x0 = g.cx - 260 * u, y0 = g.by - 210 * u, x1 = g.cx + 60 * u, y1 = g.by - 30 * u;
      Q31.raw(ctx, () => { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 8 * u; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, g.by); ctx.moveTo(x0 + 40 * u, y0); ctx.lineTo(x0 + 40 * u, g.by); ctx.stroke();
        const sg = ctx.createLinearGradient(0, y0, 0, y1); sg.addColorStop(0, '#4ade80'); sg.addColorStop(1, '#15803d'); ctx.strokeStyle = sg; ctx.lineWidth = 16 * u; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 + 40 * u, y0); ctx.quadraticCurveTo(x0 + 160 * u, y0 + 40 * u, x1, y1); ctx.stroke(); ctx.lineCap = 'butt';
        const pg = ctx.createLinearGradient(T.x - 6, 0, T.x + 6, 0); pg.addColorStop(0, '#52525b'); pg.addColorStop(.5, '#f4f4f5'); pg.addColorStop(1, '#3f3f46'); ctx.fillStyle = pg; ctx.fillRect(T.x - 5 * u, g.by - 260 * u, 10 * u, 260 * u); });
      // child along slide
      const f = S.slideF || 0, bx = x0 + 40 * u + (x1 - x0 - 40 * u) * f, by2 = y0 + (y1 - y0) * (f * f * .3 + f * .7) - 10 * u; const H = 120 * u;
      Q31.person(ctx, { H, f: 1, hip: [bx, by2], neck: [bx - 6 * u, by2 - H * .32], hands: [[bx + 10 * u, by2 + 4], f > .95 ? [S.obj.x, S.obj.y] : [bx + 22 * u, by2 - 8 * u]], feet: [[bx + H * .4, by2 + 8 * u], [bx + H * .42, by2 + 4 * u]], shirt: '#f97316', pants: '#1e40af', kneeSide: -1 });
      if (S.p.chg !== false) for (let i = 0; i < Math.round(S.q); i++) Q31.sg(ctx, bx - 8 + (i % 3) * 9, by2 - 22 * u - (i / 3 | 0) * 11, -1, 5);
      if (S.p.lab !== false) { Q31.T(ctx, 'لعبة التزحلق البلاستيكية', x0 + 120 * u, y0 - 18 * u, { s: 11, w: 800, c: '#fff', bg: '#15803d' }); Q31.T(ctx, 'عمود معدني', T.x, g.by - 274 * u, { s: 11, w: 800, c: '#fff', bg: '#52525b' }); }
      if (S.flash > 0) Q31.spark(ctx, S.obj.x, S.obj.y, T.x, S.obj.y, S.t); },
    drags(S) { if (!S.W || !S.obj) return []; const g = D.geo(S), sc = S.p.sc, u = g.u, O = S.obj, z = D.rubZone(S, g); const L = [];
      const mv = (o) => Object.assign({ keep: true, down: S => { S.drag = 1; }, up: S => { S.drag = 0; S.vy = 0; } }, o);
      if (['comb', 'bpaper', 'bhair', 'wall', 'water'].includes(sc)) L.push(mv({ id: 'obj', x: O.x, y: O.y, r: 50 * u, axis: 'xy', tip: 'اسحب: ادلكه فوق الشعر/الصوف، ثم قرّبه', idle: sc === 'comb' || sc === 'water' ? 'ادلك المشط ✋' : 'ادلك البالون ✋',
        down: S => { S.drag = 1; S.stuck = 0; S.dx0 = O.x; S.dy0 = O.y; }, drag: (S, d) => { O.x = clamp(d.ox + d.x - d.sx, 20, g.w - 20); O.y = clamp(d.oy + d.y - d.sy, 40, g.by - 20); const n = Q31.rub(S, d, z && Math.hypot(O.x - z.x, O.y - z.y) < z.r + 30 * u); if (n) D.addQ(S, n, g); } }));
      if (sc === 'carpet') { const hx = g.cx - 100 * u; L.push(mv({ id: 'foot', x: hx - 12 + (S.foot || 0), y: g.by - 14, w: 70, h: 40, axis: 'x', tip: 'اسحب القدم على السجادة ذهاباً وإياباً', idle: 'اسحب القدم ↔', drag: (S, d) => { S.foot = clamp(d.x - d.sx, -50, 50); const n = Q31.rub(S, d, true, 40); if (n) { S.q = Math.min(QMAX, S.q + n); } } })); }
      if (sc === 'carpet' || sc === 'car' || sc === 'slide') L.push(mv({ id: 'hand', x: O.x, y: O.y, r: 30, axis: 'xy', tip: 'اسحب اليد نحو المعدن', hint: sc !== 'car', drag: (S, d) => { O.x = clamp(d.ox + d.x - d.sx, 30, g.w - 20); O.y = clamp(d.oy + d.y - d.sy, 60, g.by - 20); } }));
      if (sc === 'slide') { const x0 = g.cx - 260 * u, y0 = g.by - 210 * u, x1 = g.cx + 60 * u, f = S.slideF || 0, bx = x0 + 40 * u + (x1 - x0 - 40 * u) * f; L.push({ id: 'kid', x: bx, y: y0 + (g.by - 30 * u - y0) * f - 30 * u, r: 36, dir: Math.atan2(180, 300), keep: true, tip: 'اسحب الطفل نزولاً على الزحلوقة', idle: 'اسحب الطفل ↘',
        drag: (S, d) => { const nf = clamp((d.x - x0 - 40 * u) / (x1 - x0 - 40 * u), 0, 1); if (nf > S.slideF) S.q = Math.min(QMAX, S.q + (nf - S.slideF) * 9); S.slideF = nf; if (nf > .95) { O.x = bx + 30 * u; O.y = g.by - 70 * u; } } }); }
      return L; },
    readings(S) { const sc = S.p.sc; return [rd('المشاهدة', SC.find(q => q[0] === sc)[1], 1), rd('الشحنة المتولدة (وحدات)', String(Math.round(S.q))), rd('الجو', S.p.air === 'wet' ? 'رطب: تتفرغ الشحنات بسرعة' : 'جاف: تبقى الشحنات مدة أطول', 1)].concat(S.bits ? [rd('قصاصات منجذبة', S.bits.filter(b => b.att).length + ' / ' + S.bits.length)] : []).concat(S.shocks ? [rd('عدد الصعقات', String(S.shocks))] : []); },
    explain(S) { const sc = S.p.sc, q = S.q >= 1;
      const T = { comb: 'دلك المشط البلاستيكي بالشعر الجاف ينقل إلكترونات من الشعر إلى المشط فيصبح المشط مشحوناً بشحنات ساكنة. المشحون <b>يجذب</b> قصاصات الورق الخفيفة غير المشحونة.', bpaper: 'دلك البالون بالصوف ينقل إلكترونات من الصوف إلى البالون فيصير البالون مشحوناً، فيجذب قصاصات الورق.', bhair: 'البالون المدلوك بالصوف يجذب شعر رأسك إذا كان الشعر جافاً ومن غير زيت.', wall: 'البالون المشحون يلتصق بالجدار ويبقى ملتصقاً عدة ساعات إذا كان الجو جافاً، لأن الهواء الرطب يساعد على تفريغ الشحنات بسرعة.', carpet: 'عند سيرك على سجادة صوف تحتك قدماك بها فتكتسب شحنات ساكنة، وتشعر بها صعقةً طفيفة لحظة ملامسة يدك للمقبض المعدني للباب.', car: 'عند النزول من السيارة يحتك جسمك بالمقعد فيُشحن؛ وعند تقريب المفتاح المعدني من جسم السيارة تحدث شرارة صغيرة بين طرف المفتاح والسطح المعدني.', water: 'المشط المدلوك بالشعر (أو بالصوف) يجذب ماء الحنفية المنساب رفيعاً فينحرف الماء نحوه.', slide: 'في أثناء انزلاق الطفل تحتك ملابسه بأرضية اللعبة البلاستيكية فيكتسب شحنات ساكنة، وعند ملامسته فوراً عموداً معدنياً يشعر بصعقة طفيفة نتيجة تفريغ الشحنات.' };
      return T[sc] + (q ? '' : '<br><i>ابدأ بالدلك لتوليد الشحنات.</i>') + (S.p.air === 'wet' ? '<br>🌧️ الجو رطب: تتسرب الشحنات إلى الهواء الرطب بسرعة، لذلك تضعف الظاهرة.' : ''); }
  };
  M8.P[D.id] = D;
})();
/* ---- E1 part 2: هل تعلم — البرق والصاعقة (الشكلان 9 و10، ص 10) + ➕ مانعة الصواعق ---- */
(() => {
  const D = { id: 'g9_life_lightning', page: 10, fig: 'الشكلان 9 و10',
    desc: 'قد تكون الكهربائية الساكنة ذات الشدة العالية جداً كالبرق، خطرة ومميتة إذا صعقت شخصاً، وتتسبب الصاعقة في حرائق كبيرة في الغابات عندما تفرغ شحنتها في إحدى أشجارها.',
    tags: 'برق صاعقة غيمة حريق غابة مانعة صواعق تفريغ',
    tools: ['غيمة مشحونة', 'شجرة', 'بيت', 'مانعة صواعق'],
    steps: ['شاهد الغيمة: الرياح والاحتكاك داخلها يفصلان الشحنات (السالبة في أسفلها غالباً).', 'اسحب الغيمة لتقترب من الهدف، أو انتظر حتى تكبر شحنتها.', 'اضغط «⚡ أطلق البرق» أو انتظر التفريغ التلقائي عند امتلاء الغيمة.', 'جرّب الهدف «شجرة في الغابة» (الشكل 10) ثم «بيت مع مانعة صواعق».'],
    concl: ['البرق تفريغ كهربائي هائل لشحنات ساكنة متجمعة في الغيوم.', 'الصاعقة خطرة ومميتة وتسبب حرائق الغابات.', '➕ مانعة الصواعق: قضيب معدني مدبب أعلى البناية موصول بالأرض بسلك سميك، يفرّغ الشحنة في الأرض بأمان.'],
    controls: [SEL('tg', 'الهدف', [['tree', 'شجرة في الغابة (شكل 10)'], ['house', 'بيت بلا مانعة'], ['rod', '➕ بيت مع مانعة صواعق']], 'tree', (v, S) => { S.fire = 0; S.dmg = 0; }),
      R('wind', 'شدة الرياح (سرعة تجمع الشحنات)', 1, 5, 3, 1, ''), BT('', [{ t: '⚡ أطلق البرق', on: S => D.strike(S) }, { t: '🚒 أطفئ', on: S => { S.fire = 0; S.dmg = 0; } }]),
      TG('chg', 'الشحنات', true, null, 'charges'), TG('ind', 'الشحنات المحتثة في الأرض', true, null, 'charges'), TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { S.q = 3; S.fl = 0; S.fire = 0; S.dmg = 0; S.cx = null; S.n = 0; },
    geo(S) { const w = S.W, h = S.H, cx = Q31.cx(w), gy = h * .82, u = Q31.sc(w, h) * 1.15; return { w, h, cx, gy, u, ph: w < 600 }; },
    tgt(S, g) { const u = g.u; const x = g.cx + 60 * u; return S.p.tg === 'tree' ? { x, y: g.gy - 190 * u } : { x, y: g.gy - (S.p.tg === 'rod' ? 225 : 165) * u }; },
    strike(S) { if (S.q < 2) { C2.msg(S, 'شحنة الغيمة قليلة — انتظر قليلاً', 1.6); return; } S.fl = .7; S.seed = (S.seed || 1) + 7; S.n++; S.q = 0; if (S.p.tg === 'tree') S.fire = 1; if (S.p.tg === 'house') S.dmg = 1; if (window.Sound && Sound.ok) Sound.ok(); },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); if (S.cx == null) S.cx = g.cx - 40 * g.u; S.q = Math.min(10, S.q + dt * S.p.wind * .35); const T = D.tgt(S, g); const d = T.y - (g.h * .2 + 40 * g.u); if (S.q >= 10 || S.q > 4 && Math.abs(S.cx - T.x) < 30) D.strike(S); if (S.fl > 0) S.fl -= dt; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), u = g.u, p = S.p, T = D.tgt(S, g), cy = h * .2;
      Q31.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 0, 0, g.gy); sk.addColorStop(0, '#0f172a'); sk.addColorStop(1, '#334155'); ctx.fillStyle = sk; ctx.fillRect(0, 0, w, g.gy); if (S.fl > .45) { ctx.fillStyle = 'rgba(224,231,255,.35)'; ctx.fillRect(0, 0, w, g.gy); }
        const gg = ctx.createLinearGradient(0, g.gy, 0, h); gg.addColorStop(0, '#166534'); gg.addColorStop(1, '#052e16'); ctx.fillStyle = gg; ctx.fillRect(0, g.gy, w, h - g.gy);
        // forest background trees
        for (let i = 0; i < 12; i++) { const x = 70 + i * (w - 70) / 11, hh = (60 + (i * 37) % 40) * u; ctx.fillStyle = '#14532d'; ctx.beginPath(); ctx.moveTo(x, g.gy - hh); ctx.lineTo(x - 22 * u, g.gy); ctx.lineTo(x + 22 * u, g.gy); ctx.closePath(); ctx.fill(); }
        // cloud
        const cl = (x, y, s) => { ctx.beginPath(); [[0, 0, 50], [-55, 12, 38], [55, 10, 40], [-25, -24, 36], [28, -22, 34], [-90, 24, 26], [90, 24, 28]].forEach(([dx, dy, r]) => { ctx.moveTo(x + dx * s + r * s, y + dy * s); ctx.arc(x + dx * s, y + dy * s, r * s, 0, TAU); }); ctx.fill(); };
        ctx.fillStyle = '#475569'; cl(S.cx, cy + 6, u * 1.05); ctx.fillStyle = '#64748b'; cl(S.cx, cy, u);
      });
      if (p.chg !== false) { const n = Math.round(S.q); for (let i = 0; i < n; i++) { Q31.sg(ctx, S.cx - 70 * u + i * 15 * u, cy + 30 * u, -1, 6); Q31.sg(ctx, S.cx - 60 * u + i * 13 * u, cy - 26 * u, 1, 6); } }
      // target
      if (p.tg === 'tree') { Q31.raw(ctx, () => { ctx.fillStyle = '#78350f'; ctx.fillRect(T.x - 9 * u, T.y + 60 * u, 18 * u, g.gy - T.y - 60 * u); ctx.fillStyle = S.fire ? '#3f3f46' : '#15803d'; [[0, 70, 60], [0, 30, 48], [0, 0, 32]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.moveTo(T.x - r * u, T.y + dy * u + 40 * u); ctx.lineTo(T.x, T.y + dy * u - 20 * u); ctx.lineTo(T.x + r * u, T.y + dy * u + 40 * u); ctx.closePath(); ctx.fill(); }); });
        if (S.fire) Q31.raw(ctx, () => { for (let i = 0; i < 9; i++) { const fx = T.x + (i - 4) * 14 * u, fh = (40 + 20 * Math.sin(S.t * 9 + i * 2)) * u, fy = T.y + 90 * u - Math.abs(i - 4) * 8 * u; const fg = ctx.createLinearGradient(0, fy - fh, 0, fy); fg.addColorStop(0, 'rgba(254,240,138,0)'); fg.addColorStop(.4, '#fb923c'); fg.addColorStop(1, '#dc2626'); ctx.fillStyle = fg; ctx.beginPath(); ctx.moveTo(fx - 10 * u, fy); ctx.quadraticCurveTo(fx - 12 * u, fy - fh * .5, fx, fy - fh); ctx.quadraticCurveTo(fx + 12 * u, fy - fh * .5, fx + 10 * u, fy); ctx.fill(); } }); }
      else { Q31.raw(ctx, () => { const bx = T.x - 70 * u, by = g.gy - 120 * u; ctx.fillStyle = S.dmg ? '#57534e' : '#fde68a'; ctx.fillRect(bx, by, 140 * u, 120 * u); ctx.fillStyle = S.dmg ? '#292524' : '#b91c1c'; ctx.beginPath(); ctx.moveTo(bx - 12 * u, by); ctx.lineTo(T.x, by - 50 * u); ctx.lineTo(bx + 152 * u, by); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#7dd3fc'; ctx.fillRect(bx + 20 * u, by + 30 * u, 30 * u, 30 * u); ctx.fillRect(bx + 90 * u, by + 30 * u, 30 * u, 30 * u); ctx.fillStyle = '#78350f'; ctx.fillRect(bx + 58 * u, by + 66 * u, 26 * u, 54 * u);
          if (p.tg === 'rod') { ctx.strokeStyle = '#b45309'; ctx.lineWidth = 4 * u; ctx.beginPath(); ctx.moveTo(T.x, T.y); ctx.lineTo(T.x, by - 50 * u); ctx.lineTo(bx + 152 * u, by + 4 * u); ctx.lineTo(bx + 152 * u, g.gy + 24 * u); ctx.stroke(); ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.moveTo(T.x - 5 * u, T.y + 10 * u); ctx.lineTo(T.x, T.y - 6 * u); ctx.lineTo(T.x + 5 * u, T.y + 10 * u); ctx.fill(); ctx.fillStyle = '#a16207'; ctx.fillRect(bx + 140 * u, g.gy + 24 * u, 24 * u, 8 * u); } });
        if (S.dmg && p.tg === 'house') Q31.raw(ctx, () => { ctx.fillStyle = 'rgba(100,100,100,.5)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(T.x + Math.sin(S.t + i) * 20, T.y - 30 - ((S.t * 30 + i * 25) % 120), 14 + i * 2, 0, TAU); ctx.fill(); } }); }
      if (p.ind !== false) { const n = Math.round(S.q * .8); for (let i = 0; i < n; i++) Q31.sg(ctx, S.cx - 60 * u + i * 16 * u, g.gy + 16, 1, 5.5); if (n > 2) { Q31.sg(ctx, T.x, T.y + 8, 1, 6); } }
      if (S.fl > 0) { Q31.bolt(ctx, S.cx, cy + 40 * u, T.x, T.y, S.seed, clamp(S.fl / .4, 0, 1)); if (p.tg === 'rod' && S.fl > .2) for (let i = 0; i < 4; i++) { const f = ((S.t * 3 + i / 4) % 1); const bx = T.x + 82 * u; Q31.el(ctx, bx, g.gy - 170 * u + f * 190 * u, 4); } }
      if (p.lab !== false) { Q31.T(ctx, 'غيمة مشحونة: − في أسفلها و + في أعلاها', S.cx, cy - 70 * u, { s: 11.5, w: 800, c: '#fff', bg: 'rgba(30,41,59,.85)' }); Q31.T(ctx, 'شحنة موجبة محتثة على الأرض', g.cx - 160 * u, g.gy + 36, { s: 11, w: 800, c: '#fff', bg: 'rgba(185,28,28,.85)' });
        if (p.tg === 'rod') Q31.T(ctx, '➕ مانعة صواعق موصولة بالأرض', T.x + 120 * u, T.y - 20 * u, { s: 11.5, w: 900, c: '#fff', bg: '#a16207' }); if (S.fire) Q31.T(ctx, 'حريق في الغابة! 🔥 (الشكل 10)', T.x, T.y - 30 * u, { s: 13, w: 900, c: '#fff', bg: '#dc2626' }); if (S.dmg && p.tg === 'house') Q31.T(ctx, 'ضرر في البيت!', T.x, T.y - 70 * u, { s: 13, w: 900, c: '#fff', bg: '#dc2626' }); }
      Q31.T(ctx, 'شحنة الغيمة', 120, 60, { s: 11, w: 800, c: '#fff', bg: '#1e3a8a' }); Q31.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.2)'; rr(ctx, 80, 72, 80, 8, 4); ctx.fill(); ctx.fillStyle = '#fbbf24'; rr(ctx, 80, 72, 8 * S.q, 8, 4); ctx.fill(); });
      Q31.banner(ctx, w, 'هل تعلم؟ البرق كهربائية ساكنة عالية الشدة جداً', '#7c3aed'); C2.drawMsg(ctx, S, g.cx, h * .5);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'cloud', x: S.cx, y: S.H * .2, w: 200 * g.u, h: 90 * g.u, axis: 'x', keep: true, tip: 'اسحب الغيمة', idle: 'حرّك الغيمة ↔', drag: (S, d) => { S.cx = clamp(d.ox + d.x - d.sx, 120, S.W - 80); } }]; },
    readings(S) { return [rd('شحنة الغيمة (نسبية)', fmt(S.q, 2)), rd('عدد الصواعق', String(S.n)), rd('الهدف', { tree: 'شجرة (حريق!)', house: 'بيت بلا حماية (ضرر)', rod: 'مانعة صواعق (آمن)' }[S.p.tg], 1)]; },
    explain(S) { return 'تتجمع شحنات ساكنة هائلة في الغيوم بسبب احتكاك قطرات الماء وبلورات الجليد. الشحنة السالبة أسفل الغيمة <b>تحث</b> شحنة موجبة على سطح الأرض والأجسام العالية، وعندما تكبر الشحنة جداً يحدث <b>تفريغ</b> هائل هو البرق. ' + (S.p.tg === 'tree' ? 'الصاعقة تفرغ شحنتها في إحدى الأشجار فتحدث حرائق كبيرة في الغابات (الشكل 10).' : S.p.tg === 'rod' ? '➕ مانعة الصواعق تجذب الصاعقة وتوصل الشحنة إلى الأرض عبر سلك سميك فلا يتضرر البيت.' : 'البيت غير المحمي يتضرر من الصاعقة.') + ' لا تقف تحت شجرة منفردة في العاصفة!'; }
  };
  M8.P[D.id] = D;
})();
/* ---- E1 part 3: ➕ PhET-style «البالونات والكهربائية الساكنة» ---- */
(() => {
  const D = { id: 'g9_life_balloons', page: 7, fig: '➕ من المختبرات العالمية',
    desc: '➕ من المختبرات العالمية (فكرة PhET «البالونات والكهربائية الساكنة»): ادلك البالون بالكنزة الصوفية، شاهد الإلكترونات تنتقل، ثم اترك البالون ليلتصق بالجدار أو يعود إلى الكنزة، وجرّب بالونين يتنافران.',
    tags: 'بالون كنزة صوف جدار استقطاب تنافر تجاذب PhET إلكترونات حفظ الشحنة',
    tools: ['كنزة صوف', 'بالون أو اثنان', 'جدار'],
    steps: ['اسحب البالون فوق الكنزة ذهاباً وإياباً: تنتقل الإلكترونات (−) من الكنزة إلى البالون.', 'اترك البالون بعيداً: ينجذب نحو الكنزة الموجبة.', 'قرّبه من الجدار واتركه: يلتصق بالجدار لأن جزيئات الجدار تستقطب.', 'اختر «بالونان» وادلك الاثنين ثم قرّبهما: يتنافران.', 'غيّر «عرض الشحنات» بين: كل الشحنات / الفرق فقط / لا شيء.'],
    concl: ['عند الدلك تنتقل الإلكترونات فقط (لا تنتقل البروتونات): الكنزة تفقد إلكترونات فتصبح موجبة، والبالون يكتسبها فيصبح سالباً.', 'مجموع الشحنات يبقى ثابتاً (حفظ الشحنة): ما فقدته الكنزة = ما اكتسبه البالون.', 'البالون السالب يجذب الكنزة الموجبة، ويلتصق بالجدار المتعادل بالاستقطاب، ويتنافر مع بالون سالب آخر.'],
    controls: [SEL('nb', 'عدد البالونات', [['1', 'بالون واحد'], ['2', 'بالونان']], '1', (v, S) => D.reset(S)), SEL('show', 'عرض الشحنات', [['all', 'كل الشحنات'], ['diff', 'الفرق فقط'], ['none', 'لا شيء']], 'all'),
      TG('wall', 'الجدار', true, null, 'eye'), TG('fx', 'أسهم القوى', true, null, 'force'), BT('', [{ t: '↺ أعد البالونات والكنزة', on: S => D.reset(S) }])],
    setup(S) { D.reset(S); },
    reset(S) { S.sw = null; S.bal = null; S._fly = []; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, u = Q31.sc(w, h) * (ph ? .95 : 1.1); const x0 = ph ? 6 : 70; const sw = { x: x0 + 8, y: h * .2, w: Math.min(220 * u, w * .3), h: h * .55 }; const wallX = w - (ph ? 50 : 90) * u; return { w, h, ph, u, sw, wallX, r: 44 * u }; },
    init(S, g) { if (S.sw) return; const sw = g.sw, cols = 6, rows = 9; S.sw = []; for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) S.sw.push({ x: sw.x + (j + .5) * sw.w / cols, y: sw.y + 30 + (i + .5) * (sw.h - 40) / rows, e: 1 });
      const n = +S.p.nb; S.bal = []; for (let k = 0; k < n; k++) S.bal.push({ x: g.w * (n === 1 ? .55 : .45 + k * .2), y: g.h * .42, vx: 0, vy: 0, ne: 0, col: k ? '#22c55e' : '#f59e0b', drag: 0 }); },
    Qs(S) { return S.sw.filter(q => !q.e).length; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); D.init(S, g); dt = Math.min(dt, .04); const Qs = D.Qs(S), scx = g.sw.x + g.sw.w / 2, scy = g.sw.y + g.sw.h / 2;
      S.bal.forEach((b, i) => { if (b.drag) { b.vx = b.vy = 0; return; } if (!b.ne) { b.vx *= .9; b.vy *= .9; return; } let fx = 0, fy = 0;
        { const dx = scx - b.x, dy = scy - b.y, d = Math.max(Math.hypot(dx, dy), 60); const F = 700000 * Qs * b.ne / (d * d); fx += F * dx / d; fy += F * dy / d; }
        if (S.p.wall !== false) { const dx = g.wallX - b.x - g.r * .85; const F = 350000 * b.ne * b.ne / Math.pow(Math.max(dx, 12) + 40, 2); fx += F; }
        S.bal.forEach((c, j) => { if (j === i || !c.ne) return; const dx = b.x - c.x, dy = b.y - c.y, d = Math.max(Math.hypot(dx, dy), 50); const F = 600000 * b.ne * c.ne / (d * d); fx += F * dx / d; fy += F * dy / d; });
        b.vx = (b.vx + fx * dt) * .97; b.vy = (b.vy + fy * dt) * .97; b.x += b.vx * dt; b.y += b.vy * dt;
        const xmin = g.sw.x + g.sw.w + g.r * .7, xmax = (S.p.wall !== false ? g.wallX : g.w) - g.r * .85;
        if (b.x > xmax) { b.x = xmax; b.vx = 0; } if (b.x < xmin && Qs) { b.x = Math.max(b.x, g.sw.x + g.sw.w - g.r * .3); if (b.x < xmin) b.vx *= .5; } b.x = Math.max(b.x, 40);
        b.y = clamp(b.y, g.r * 1.2 + 30, g.h - g.r * 1.3 - 40); });
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S); D.init(S, g); const p = S.p, mode = p.show, u = g.u, sw = g.sw;
      Q31.raw(ctx, () => { ctx.fillStyle = '#fef3c7'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#e7e5e4'; ctx.fillRect(0, h * .88, w, h * .12); });
      // sweater
      Q31.raw(ctx, () => { const sg = ctx.createLinearGradient(sw.x, 0, sw.x + sw.w, 0); sg.addColorStop(0, '#7c3aed'); sg.addColorStop(1, '#5b21b6'); ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(sw.x + sw.w * .2, sw.y); ctx.lineTo(sw.x + sw.w * .8, sw.y); ctx.lineTo(sw.x + sw.w, sw.y + 40); ctx.lineTo(sw.x + sw.w, sw.y + sw.h); ctx.lineTo(sw.x, sw.y + sw.h); ctx.lineTo(sw.x, sw.y + 40); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 1; for (let y = sw.y + 50; y < sw.y + sw.h; y += 9) { ctx.beginPath(); for (let x = sw.x + 4; x < sw.x + sw.w; x += 8) { ctx.moveTo(x, y); ctx.lineTo(x + 4, y + 4); ctx.lineTo(x + 8, y); } ctx.stroke(); }
        ctx.fillStyle = '#4c1d95'; ctx.beginPath(); ctx.ellipse(sw.x + sw.w / 2, sw.y + 4, sw.w * .22, 12, 0, 0, Math.PI); ctx.fill(); });
      if (mode !== 'none') S.sw.forEach(q => { if (mode === 'all') Q31.sg(ctx, q.x - 5, q.y, 1, 5); else if (!q.e) Q31.sg(ctx, q.x, q.y, 1, 5); if (q.e && mode === 'all') Q31.sg(ctx, q.x + 6, q.y + 3, -1, 5); });
      // wall
      if (p.wall !== false) { Q31.raw(ctx, () => { const wg = ctx.createLinearGradient(g.wallX, 0, w, 0); wg.addColorStop(0, '#fde68a'); wg.addColorStop(1, '#fbbf24'); ctx.fillStyle = wg; ctx.fillRect(g.wallX, 0, w - g.wallX, h * .88); });
        if (mode !== 'none') for (let i = 0; i < 12; i++) for (let j = 0; j < 2; j++) { const x = g.wallX + 16 + j * 28, y = 30 + i * (h * .84) / 12; let sh = 0; S.bal.forEach(b => { if (!b.ne) return; const d = Math.hypot(b.x - x, b.y - y); sh = Math.max(sh, clamp(b.ne * 900 / (d * d) * 12, 0, 6)); }); if (mode === 'all' || sh > 1) { Q31.sg(ctx, x - sh * .2, y, 1, 4.5, mode === 'all' ? 1 : .8); Q31.sg(ctx, x + 8 + sh, y + 2, -1, 4.5, mode === 'all' ? 1 : .8); } } }
      // balloons
      S.bal.forEach(b => { Q31.balloon(ctx, b.x, b.y, g.r, b.col, { sx: b.x - 6, sy: b.y + g.r * 2.4 });
        if (mode !== 'none') { const pts = []; for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; pts.push([b.x + Math.cos(a) * g.r * .45, b.y + Math.sin(a) * g.r * .55]); } if (mode === 'all') pts.forEach(q => { Q31.sg(ctx, q[0] - 4, q[1], 1, 4.5); Q31.sg(ctx, q[0] + 5, q[1] + 2, -1, 4.5); });
          for (let k = 0; k < b.ne; k++) { const a = -2.2 + k * .38; Q31.sg(ctx, b.x + Math.cos(a) * g.r * .78, b.y + Math.sin(a) * g.r * .9, -1, 5); } }
        if (p.fx !== false && b.ne && !b.drag && Math.hypot(b.vx, b.vy) > 6) K.force(ctx, b.x, b.y, clamp(b.vx * .25, -60, 60), clamp(b.vy * .25, -60, 60), null, '#16a34a', 3); });
      Q31.drawFly(ctx, S);
      const Qs = D.Qs(S), Qb = S.bal.reduce((a, b) => a + b.ne, 0);
      Q31.card(ctx, S, [{ t: 'الكنزة: فقدت ' + Qs + ' إلكتروناً ⟸ شحنتها +' + Qs, c: '#b91c1c' }, { t: 'البالون: اكتسب ' + Qb + ' إلكتروناً ⟸ شحنته −' + Qb, c: '#1d4ed8' }, { t: 'المجموع = ' + Qs + ' − ' + Qb + ' = 0 (حفظ الشحنة)', c: '#15803d', w: 900 }], { title: 'عدّاد الشحنات', y: g.ph ? 64 : 44, x: g.ph ? null : g.wallX - 10, wd: 300 });
      Q31.banner(ctx, w, '➕ من المختبرات العالمية: البالونات والكهربائية الساكنة', '#7c3aed');
    },
    drags(S) { if (!S.W || !S.bal) return []; const g = D.geo(S); return S.bal.map((b, i) => ({ id: 'b' + i, x: b.x, y: b.y, r: g.r, axis: 'xy', keep: true, tip: 'اسحب البالون فوق الكنزة لدلكه، ثم اتركه', idle: i ? undefined : 'ادلك البالون بالكنزة ✋',
      down: S => { b.drag = 1; }, up: S => { b.drag = 0; b.vx = b.vy = 0; },
      drag: (S, d) => { b.x = clamp(d.ox + d.x - d.sx, 50, S.W - 40); b.y = clamp(d.oy + d.y - d.sy, 60, S.H - 90); if (Math.hypot(d.dx || 0, d.dy || 0) > 2) { const q = S.sw.filter(q => q.e && Math.abs(q.x - (b.x - g.r * .4)) < g.r * .7 && Math.abs(q.y - b.y) < g.r).sort((a, c) => Math.hypot(a.x - b.x, a.y - b.y) - Math.hypot(c.x - b.x, c.y - b.y))[0]; if (q && Math.random() < .5) { q.e = 0; b.ne++; Q31.fly(S, q.x + 6, q.y, b.x, b.y, .35); } } } })); },
    readings(S) { if (!S.bal) return []; return [rd('شحنة الكنزة', '+' + D.Qs(S)), rd('شحنة البالون/البالونات', S.bal.map(b => '−' + b.ne).join(' ، ')), rd('المجموع', '0 (محفوظة)')]; },
    explain(S) { if (!S.bal) return ''; const n = S.bal.reduce((a, b) => a + b.ne, 0); if (!n) return 'الكنزة والبالون <b>متعادلان</b>: في كل منهما عدد الشحنات الموجبة يساوي عدد السالبة. اسحب البالون فوق الكنزة لتدلكه.';
      return 'انتقلت <b>' + n + '</b> إلكترونات من الكنزة إلى البالون (البروتونات لا تنتقل). الكنزة صارت <b>موجبة</b> والبالون <b>سالباً</b> فيتجاذبان. قرب الجدار تتحرك إلكترونات الجزيئات قليلاً بعيداً عن البالون (استقطاب) فيلتصق البالون بالجدار.' + (S.bal.length > 1 ? ' البالونان السالبان <b>يتنافران</b>.' : ''); }
  };
  M8.P[D.id] = D;
})();
/* ---- E1 part 4: ➕ PhET-style «جون ترافولتاج» ---- */
(() => {
  const D = { id: 'g9_life_travolta', page: 8, fig: '➕ من المختبرات العالمية',
    desc: '➕ من المختبرات العالمية (فكرة PhET «جون ترافولتاج»): احكك قدم الشخص بالسجادة فتتجمع الإلكترونات في جسمه، ثم قرّب إصبعه من مقبض الباب المعدني: كلما زادت الشحنة قفزت الشرارة من مسافة أبعد.',
    tags: 'ترافولتاج سجادة مقبض باب شرارة صعقة إلكترونات تفريغ PhET',
    tools: ['سجادة صوف', 'مقبض باب معدني'],
    steps: ['اسحب القدم ذهاباً وإياباً على السجادة: تتجمع الإلكترونات في الجسم.', 'اسحب اليد (الإصبع) نحو مقبض الباب.', 'لاحظ: إذا كانت الشحنة كبيرة تحدث الشرارة قبل اللمس (من مسافة أبعد).', 'عدّ الإلكترونات قبل التفريغ وبعده.'],
    concl: ['الاحتكاك بالسجادة ينقل إلكترونات إلى الجسم فيصبح سالب الشحنة.', 'عند اقتراب الإصبع من المعدن تتفرغ الإلكترونات بشرارة (صعقة طفيفة).', 'كلما زادت الشحنة زادت المسافة التي تقفز منها الشرارة.'],
    controls: [BT('', [{ t: '🦶 احكك القدم (تلقائي)', on: S => { S.auto = 2; } }, { t: '↺ أعد', on: S => D.reset(S) }]), TG('chg', 'الإلكترونات', true, null, 'electron'), TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.e = []; S.leg = 0; S.hand = null; S.dis = 0; S.flash = 0; S.max = 0; S.auto = 0; },
    geo(S) { const w = S.W, h = S.H, u = Q31.sc(w, h) * (w < 600 ? 1 : 1.25), cx = Q31.cx(w), gy = h * .82; return { w, h, u, cx, gy, hip: [cx - 60 * u, gy - 100 * u], knob: [cx + 170 * u, gy - 120 * u] }; },
    add(S, g) { if (S.e.length >= 60) return; S.e.push({ x: g.hip[0] + (Math.random() - .5) * 26 * g.u, y: g.hip[1] - Math.random() * 70 * g.u, vx: 0, vy: 0 }); if (window.Sound && Sound.tick) Sound.tick(); },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), u = g.u; if (!S.hand) S.hand = [g.hip[0] + 60 * u, g.hip[1] - 40 * u];
      if (S.auto > 0) { S.auto -= dt; S.leg = Math.sin(S.t * 14) * 40; S._a = (S._a || 0) + dt; if (S._a > .08) { S._a = 0; D.add(S, g); } }
      // electrons jiggle inside body
      S.e.forEach(e => { e.vx += (Math.random() - .5) * 80 * dt; e.vy += (Math.random() - .5) * 80 * dt; e.vx *= .95; e.vy *= .95; e.x += e.vx * dt * 8; e.y += e.vy * dt * 8; e.x = clamp(e.x, g.hip[0] - 16 * u, g.hip[0] + 16 * u); e.y = clamp(e.y, g.hip[1] - 80 * u, g.hip[1] + 10 * u); });
      S.max = Math.max(S.max, S.e.length); const d = Math.hypot(S.hand[0] - g.knob[0], S.hand[1] - g.knob[1]);
      if (S.e.length && d < S.e.length * 2.2 * u + 6) S.dis = 1; if (S.dis) { S._d = (S._d || 0) + dt; if (S._d > .03) { S._d = 0; S.e.pop(); S.flash = .15; Q31.fly(S, S.hand[0], S.hand[1], g.knob[0], g.knob[1], .2); } if (!S.e.length) { S.dis = 0; C2.msg(S, 'تفرغت كل الإلكترونات ⚡\nصعقة طفيفة!', 1.8); } }
      if (S.flash > 0) S.flash -= dt; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), u = g.u; if (!S.hand) S.hand = [g.hip[0] + 60 * u, g.hip[1] - 40 * u];
      Q31.raw(ctx, () => { ctx.fillStyle = '#ecfccb'; ctx.fillRect(0, 0, w, g.gy); ctx.strokeStyle = 'rgba(101,163,13,.18)'; for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, g.gy); ctx.stroke(); }
        const cg = ctx.createLinearGradient(0, g.gy, 0, h); cg.addColorStop(0, '#0e7490'); cg.addColorStop(1, '#164e63'); ctx.fillStyle = cg; ctx.fillRect(0, g.gy, w, h - g.gy); ctx.fillStyle = 'rgba(255,255,255,.08)'; for (let i = 0; i < 200; i++) ctx.fillRect((i * 53) % w, g.gy + (i * 29) % (h - g.gy), 2, 4);
        const dx = g.knob[0] + 4 * u; const dg = ctx.createLinearGradient(dx, 0, dx + 130 * u, 0); dg.addColorStop(0, '#a16207'); dg.addColorStop(1, '#713f12'); ctx.fillStyle = dg; ctx.fillRect(dx, g.gy - 300 * u, 130 * u, 300 * u); ctx.strokeStyle = '#422006'; ctx.lineWidth = 2; ctx.strokeRect(dx + 14 * u, g.gy - 280 * u, 100 * u, 110 * u); ctx.strokeRect(dx + 14 * u, g.gy - 150 * u, 100 * u, 130 * u);
        const kg = ctx.createRadialGradient(g.knob[0] + 12 * u, g.knob[1] - 4, 1, g.knob[0] + 14 * u, g.knob[1], 13 * u); kg.addColorStop(0, '#fff'); kg.addColorStop(.5, '#fcd34d'); kg.addColorStop(1, '#a16207'); ctx.fillStyle = kg; ctx.beginPath(); ctx.arc(g.knob[0] + 14 * u, g.knob[1], 12 * u, 0, TAU); ctx.fill(); });
      const H = 200 * u, hip = g.hip, f1 = [hip[0] - 10 * u + S.leg * u * .6, g.gy - 4 + (Math.abs(S.leg) > 5 ? -3 : 0)];
      Q31.person(ctx, { H, f: 1, hip, neck: [hip[0] + 4 * u, hip[1] - H * .33], hands: [[hip[0] - 12 * u, hip[1] + 10 * u], S.hand], feet: [f1, [hip[0] + 16 * u, g.gy - 4]], shirt: '#16a34a', pants: '#78350f', hair: '#111827' });
      if (S.p.chg !== false) S.e.forEach(e => Q31.el(ctx, e.x, e.y, 4.5 * u));
      Q31.drawFly(ctx, S); if (S.flash > 0) Q31.spark(ctx, S.hand[0], S.hand[1], g.knob[0] + 4 * u, g.knob[1], S.t, 2.4);
      if (S.p.lab !== false) { Q31.T(ctx, 'سجادة — اسحب القدم ↔', hip[0], g.gy + 26, { s: 11.5, w: 800, c: '#fff', bg: '#155e75' }); Q31.T(ctx, 'مقبض معدني', g.knob[0] + 14 * u, g.knob[1] - 26 * u, { s: 11, w: 800, c: '#fff', bg: '#713f12' });
        const d = Math.hypot(S.hand[0] - g.knob[0], S.hand[1] - g.knob[1]); Q31.T(ctx, 'طول الشرارة الممكن ≈ ' + Math.max(1, Math.round(S.e.length / 6)) + ' mm', g.knob[0] - 40 * u, g.knob[1] + 40 * u, { s: 11, w: 800, c: '#fff', bg: '#1e3a8a' }); }
      Q31.card(ctx, S, [{ t: 'إلكترونات في الجسم: ' + S.e.length, c: '#1d4ed8', w: 900 }, { t: 'أكبر عدد وصلت إليه: ' + S.max }], { title: 'عدّاد', y: 46, wd: 220 });
      Q31.banner(ctx, w, '➕ من المختبرات العالمية: جون ترافولتاج', '#7c3aed'); C2.drawMsg(ctx, S, g.knob[0] - 40 * u, g.knob[1] - 40 * u);
    },
    drags(S) { if (!S.W || !S.hand) return []; const g = D.geo(S), u = g.u; return [
      { id: 'foot', x: g.hip[0] - 10 * u + S.leg * u * .6, y: g.gy - 14, w: 70, h: 44, axis: 'x', keep: true, tip: 'احكك القدم بالسجادة', idle: 'احكك القدم ↔', drag: (S, d) => { S.leg = clamp((d.x - d.sx) / u / .6, -60, 60); if (Q31.rub(S, d, true, 22)) D.add(S, g); }, up: S => { S.leg = 0; } },
      { id: 'hand', x: S.hand[0], y: S.hand[1], r: 26, axis: 'xy', keep: true, tip: 'قرّب الإصبع من المقبض', hint: false, drag: (S, d) => { S.hand = [clamp(d.ox + d.x - d.sx, g.hip[0] + 20 * u, g.knob[0] + 4 * u), clamp(d.oy + d.y - d.sy, g.hip[1] - 120 * u, g.hip[1] + 40 * u)]; const ax = S.hand[0] - (g.hip[0] + 4 * u), ay = S.hand[1] - (g.hip[1] - 60 * u), L = Math.hypot(ax, ay), M = 70 * u; if (L > M) S.hand = [g.hip[0] + 4 * u + ax / L * M, g.hip[1] - 60 * u + ay / L * M]; } }]; },
    readings(S) { return [rd('عدد الإلكترونات في الجسم', String(S.e.length)), rd('أكبر شحنة', String(S.max))]; },
    explain(S) { return S.e.length ? 'تجمعت <b>' + S.e.length + '</b> إلكترونات في الجسم بالاحتكاك بالسجادة. الإلكترونات تتنافر وتريد الهرب؛ عندما يقترب الإصبع من المعدن تقفز في <b>شرارة</b>. كلما زاد عددها قفزت من مسافة أبعد.' : 'الجسم متعادل. احكك القدم بالسجادة لتجميع الإلكترونات.'; }
  };
  M8.P[D.id] = D;
})();
/* =============== E2 — الشحنة الكهربائية (2-1، ص 10–12) =============== */
(() => {
  const AT = { He: { n: 'هيليوم', p: 2, nn: 2 }, Li: { n: 'ليثيوم', p: 3, nn: 4 }, C: { n: 'كاربون', p: 6, nn: 6 } };
  const D = { id: 'g9_ch_atom', page: 10, fig: 'الشكلان 11 و12',
    desc: 'تحتوي الذرة إلكترونات سالبة (e⁻) تدور بسرعة عالية حول النواة التي تحوي بروتونات موجبة (p⁺) ونيوترونات متعادلة (n). إذا فقدت الذرة إلكترونات صارت أيوناً موجباً، وإذا اكتسبت إلكترونات صارت أيوناً سالباً.',
    tags: 'ذرة إلكترون بروتون نيوترون نواة أيون موجب سالب متعادلة',
    tools: ['نموذج الذرة'],
    steps: ['شاهد الذرة المتعادلة: عدد الإلكترونات = عدد البروتونات (الشكل 12-a).', 'اسحب إلكتروناً من المدار الخارجي إلى خارج الذرة (أو اضغط «انزع إلكتروناً»): تصير الذرة أيوناً موجباً (12-b).', 'أضف إلكتروناً من مخزن الإلكترونات (اضغطه أو «أضف إلكتروناً»): تصير أيوناً سالباً (12-c).', 'لاحظ أن البروتونات في النواة لا تتغير أبداً.'],
    concl: ['الذرة المتعادلة: عدد إلكتروناتها يساوي عدد بروتوناتها.', 'نقص الإلكترونات ⟸ أيون موجب وجسم مشحون بشحنة موجبة (+q).', 'زيادة الإلكترونات ⟸ أيون سالب وجسم مشحون بشحنة سالبة (−q).', 'ترتبط الإلكترونات بالنواة بقوى تختلف حسب بعدها عنها، فالإلكترونات الخارجية أسهل في الانتزاع.'],
    controls: [SEL('at', 'الذرة', Object.keys(AT).map(k => [k, AT[k].n]), 'Li', (v, S) => { S.ne = AT[v].p; }), BT('', [{ t: '➖ انزع إلكتروناً', on: S => D.rem(S) }, { t: '➕ أضف إلكتروناً', on: S => D.add(S) }, { t: '↺ متعادلة', on: S => { S.ne = AT[S.p.at].p; } }]),
      TG('orb', 'المدارات وحركة الإلكترونات', true, null, 'atom'), TG('lab', 'التسميات', true, null, 'labels'), TG('cmp', 'جدول المقارنة', true, null, 'labels')],
    setup(S) { S.ne = 3; S.free = []; },
    A(S) { return AT[S.p.at]; },
    rem(S) { const A = D.A(S); if (S.ne <= Math.max(0, A.p - 2)) { C2.msg(S, 'يصعب انتزاع إلكترونات أكثر (قريبة من النواة)', 1.8); return; } S.ne--; const g = D.geo(S); const r = D.shellR(g, D.shellOf(S.ne)); Q31.fly(S, g.ax + r, g.ay, g.w - 60, g.ay - 120, .8); },
    add(S) { const A = D.A(S); if (S.ne >= A.p + 2) { C2.msg(S, 'يكفي! جرّب النزع', 1.4); return; } const g = D.geo(S); Q31.fly(S, g.trx, g.try, g.ax, g.ay - 60, .6); S.ne++; },
    shellOf(i) { return i < 2 ? 0 : 1; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, u = Q31.sc(w, h) * (ph ? 1 : 1.2), cx = Q31.cx(w); return { w, h, ph, u, ax: ph ? w / 2 : cx - 60 * u, ay: h * (ph ? .4 : .42), trx: ph ? w - 50 : w - 90, try: h * (ph ? .2 : .5) }; },
    shellR(g, k) { return (k ? 150 : 82) * g.u; },
    epos(S, g, i) { const k = D.shellOf(i), n = k ? S.ne - 2 : Math.min(2, S.ne); const j = k ? i - 2 : i; const a = (S.p.orb !== false ? S.t * (k ? .7 : 1.3) : 0) + j / Math.max(n, 1) * TAU + k * .4; const r = D.shellR(g, k); return [g.ax + Math.cos(a) * r, g.ay + Math.sin(a) * r * .62]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), u = g.u, A = D.A(S), p = S.p; K.bg(ctx, w, h, { benchY: h + 10, bench: false });
      // orbits
      if (p.orb !== false) Q31.raw(ctx, () => { ctx.strokeStyle = 'rgba(37,99,235,.35)'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 5]); [0, 1].forEach(k => { const r = D.shellR(g, k); ctx.beginPath(); ctx.ellipse(g.ax, g.ay, r, r * .62, 0, 0, TAU); ctx.stroke(); }); ctx.setLineDash([]); });
      // nucleus
      const N = A.p + A.nn; let np = 0, nn = 0; for (let i = N - 1; i >= 0; i--) { const a = i * 2.4, r = Math.sqrt(i) * 12 * u; const x = g.ax + Math.cos(a) * r, y = g.ay + Math.sin(a) * r; const pr = (i % 2 === 0 && np < A.p) || nn >= A.nn; if (pr) np++; else nn++; Q31.ball(ctx, x, y, 11 * u, pr ? 1 : 0); }
      // electrons
      for (let i = 0; i < S.ne; i++) { const q = D.epos(S, g, i); Q31.ball(ctx, q[0], q[1], 8 * u, -1); }
      Q31.drawFly(ctx, S);
      // electron tray
      Q31.raw(ctx, () => { ctx.fillStyle = 'rgba(219,234,254,.9)'; rr(ctx, g.trx - 44, g.try - 30, 88, 60, 12); ctx.fill(); ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 1.5; ctx.stroke(); }); for (let k = 0; k < 5; k++) Q31.el(ctx, g.trx - 26 + k * 13, g.try + 4 + (k % 2) * 6, 5.5);
      Q31.T(ctx, 'مخزن إلكترونات (اضغط)', g.trx, g.try - 40, { s: 10.5, w: 800, c: '#fff', bg: '#1d4ed8' });
      const net = A.p - S.ne, st = net === 0 ? ['ذرة متعادلة (الشكل 12-a)', '#475569'] : net > 0 ? ['أيون موجب +' + (net > 1 ? net : '') + 'e (الشكل 12-b)', '#b91c1c'] : ['أيون سالب −' + (net < -1 ? -net : '') + 'e (الشكل 12-c)', '#1d4ed8'];
      Q31.T(ctx, st[0], g.ax, g.ay + 150 * u * .62 + 30, { s: 15, w: 900, c: '#fff', bg: st[1] });
      if (p.lab !== false) { Q31.T(ctx, 'النواة: ' + A.p + ' بروتون (p⁺) + ' + A.nn + ' نيوترون (n)', g.ax, g.ay - 150 * u * .62 - 22, { s: 12, w: 800, c: '#fff', bg: 'rgba(30,41,59,.85)' }); }
      // three mini states (fig 12 a b c)
      const by = h - (g.ph ? 150 : 120), mx = g.ph ? w / 2 : Q31.cx(w); [['a', 0], ['b', 1], ['c', -1]].forEach(([l, s], i) => { const x = mx + (i - 1) * (g.ph ? 110 : 170), cur = Math.sign(net) === s; Q31.raw(ctx, () => { ctx.fillStyle = cur ? 'rgba(250,204,21,.35)' : 'rgba(255,255,255,.7)'; rr(ctx, x - 50, by - 38, 100, 86, 10); ctx.fill(); ctx.strokeStyle = cur ? '#ca8a04' : '#cbd5e1'; ctx.lineWidth = 2; ctx.stroke(); ctx.strokeStyle = 'rgba(37,99,235,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, by, 26, 0, TAU); ctx.stroke(); });
        Q31.ball(ctx, x, by, 9, 1); const ne = 3 - s; for (let k = 0; k < ne; k++) { const a = k / ne * TAU + S.t * .8; Q31.el(ctx, x + Math.cos(a) * 26, by + Math.sin(a) * 26, 5); } Q31.T(ctx, l + ') ' + (s === 0 ? 'متعادلة' : s > 0 ? 'أيون موجب' : 'أيون سالب'), x, by + 38, { s: 10.5, w: 900, c: s > 0 ? '#b91c1c' : s < 0 ? '#1d4ed8' : '#334155' }); });
      if (p.cmp !== false && !g.ph) Q31.card(ctx, S, [{ t: 'الإلكترون e⁻: سالب ، يدور حول النواة ، ينتقل', c: '#1d4ed8' }, { t: 'البروتون p⁺: موجب ، في النواة ، لا ينتقل', c: '#b91c1c' }, { t: 'النيوترون n: متعادل ، في النواة', c: '#475569' }, { t: 'شحنة البروتون = شحنة الإلكترون مقداراً', w: 900 }], { title: 'مقارنة مكونات الذرة', y: 44, wd: 300 });
      Q31.card(ctx, S, [{ t: 'البروتونات: ' + A.p, c: '#b91c1c' }, { t: 'الإلكترونات: ' + S.ne, c: '#1d4ed8' }, { t: 'الشحنة: ' + (net === 0 ? '0 (متعادلة)' : (net > 0 ? '+' : '−') + Math.abs(net) + 'e'), w: 900 }], { title: 'العدّ', y: g.ph ? 58 : 190, wd: 170, x: g.ph ? null : 76 + 170 });
      Q31.banner(ctx, w, 'الذرة ونوعا الشحنة', '#2563eb'); C2.drawMsg(ctx, S, g.ax, g.ay - 60);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), A = D.A(S); const L = [Q31.btn('tray', { x: g.trx, y: g.try, w: 96, h: 66 }, S => D.add(S), { tip: 'أضف إلكتروناً إلى الذرة' })];
      if (S.ne > 0) { const q = D.epos(S, g, S.ne - 1); L.push({ id: 'eOut', x: q[0], y: q[1], r: 22, axis: 'xy', keep: true, tip: 'اسحب الإلكترون الخارجي بعيداً عن الذرة', idle: 'انزع إلكتروناً ✋', down: S => { S._ex = q; }, drag: (S, d) => { S._ed = [d.x, d.y]; if (!S._done && Math.hypot(d.x - g.ax, d.y - g.ay) > D.shellR(g, 1) + 20) { S._done = 1; D.rem(S); } }, up: S => { S._ed = null; S._done = 0; } }); }
      return L; },
    readings(S) { const A = D.A(S), net = A.p - S.ne; return [rd('عدد البروتونات p⁺', String(A.p)), rd('عدد النيوترونات n', String(A.nn)), rd('عدد الإلكترونات e⁻', String(S.ne)), rd('الشحنة الكلية', net === 0 ? '0' : (net > 0 ? '+' : '−') + Math.abs(net) + ' × 1.6×10⁻¹⁹ C', 1)]; },
    explain(S) { const A = D.A(S), net = A.p - S.ne; if (!net) return 'الذرة <b>متعادلة كهربائياً</b>: عدد إلكتروناتها (' + S.ne + ') يساوي عدد بروتوناتها (' + A.p + '). معظم ذرات المواد متعادلة.';
      return net > 0 ? 'فقدت الذرة ' + net + ' إلكترون(ات) خارجية بمؤثر خارجي، فصار عدد البروتونات أكبر: صارت <b>أيوناً موجباً</b>، والجسم الذي تحدث فيه ذلك يصبح مشحوناً بشحنة موجبة (+q).' : 'اكتسبت الذرة ' + (-net) + ' إلكترون(ات) من ذرات جسم آخر، فصارت <b>أيوناً سالباً</b>، والجسم يصبح مشحوناً بشحنة سالبة (−q).'; }
  };
  M8.P[D.id] = D;
})();
/* ---- E2 part 2: مقدار الشحنة والكولوم (ص 11، س1-3) ---- */
(() => {
  const PR = [['free', 'حر'], ['c1', '1 C (الكولوم الواحد)'], ['uc', '1 μC (مايكروكولوم)'], ['nc', '1 nC (نانوكولوم)'], ['q13', 'س1-3: 1.6×10⁻⁹ C'], ['bad', 'شحنة غير ممكنة؟ 2.4×10⁻¹⁹ C']];
  const V = { c1: [1, 0], uc: [1, -6], nc: [1, -9], q13: [1.6, -9], bad: [2.4, -19] };
  const D = { id: 'g9_ch_quant', page: 11, fig: 'ص 11',
    desc: 'شحنة الإلكترون أو البروتون أصغر وحدة للشحنات، ومقدارها 1.6×10⁻¹⁹ C. شحنة أي جسم مشحون تساوي مضاعفات صحيحة لشحنة الإلكترون: عدد الإلكترونات = شحنة الجسم ÷ شحنة الإلكترون.',
    tags: 'كولوم شحنة الإلكترون مايكرو نانو تكمية عدد الإلكترونات أسس',
    tools: ['حاسبة الأسس'],
    steps: ['اختر شحنة من «أمثلة الكتاب» أو غيّر المقدار والأس بنفسك.', 'تابع خطوات الحل: عدد الإلكترونات n = q ÷ e مع قسمة الأسس (اطرح الأسس).', 'لاحظ أن 1 C يعادل 6.25×10¹⁸ إلكتروناً.', 'جرّب «شحنة غير ممكنة» لترى لماذا يجب أن تكون الشحنة مضاعفاً صحيحاً لشحنة الإلكترون.'],
    concl: ['e = 1.6×10⁻¹⁹ C وهي أصغر شحنة.', 'شحنة الجسم = عدد الإلكترونات × شحنة الإلكترون (n عدد صحيح).', '1 C = 6.25×10¹⁸ إلكترون ، 1 μC = 10⁻⁶ C ، 1 nC = 10⁻⁹ C.'],
    controls: [SEL('ex', 'أمثلة الكتاب', PR, 'q13', (v, S) => { if (V[v]) { setParam(S, 'm', V[v][0]); setParam(S, 'ex10', V[v][1]); } }), R('m', 'المقدار (المعامل)', 1, 9.9, 1.6, .1, ''), R('ex10', 'الأس (القوة العشرية)', -19, 0, -9, 1, ''),
      SEL('sgn', 'نوع الشحنة', [['-', 'سالبة (زيادة إلكترونات)'], ['+', 'موجبة (نقص إلكترونات)']], '+'), TG('zoom', 'التكبير (عدّ الإلكترونات)', true, null, 'electron')],
    setup(S) { },
    q(S) { return S.p.m * Math.pow(10, S.p.ex10); },
    draw(ctx, w, h, S) {
      const p = S.p, ph = w < 600, u = Q31.sc(w, h), cx = Q31.cx(w); K.bg(ctx, w, h, { benchY: h * .86 }); const q = D.q(S), n = q / 1.6e-19, nr = Math.round(n), ok = Math.abs(n - nr) < 1e-6 * Math.max(1, n);
      const sx = ph ? w * .5 : 76 + 170 * u, sy = ph ? h * .64 : h * .5, R = 95 * u * (ph ? .8 : 1);
      Q31.sphere(ctx, sx, sy, R, h * .86); const sgn = p.sgn === '-' ? -1 : 1; for (let k = 0; k < 10; k++) { const a = k / 10 * TAU; Q31.sg(ctx, sx + Math.cos(a) * R * .78, sy + Math.sin(a) * R * .78, sgn, 7); }
      Q31.T(ctx, 'q = ' + (p.sgn === '-' ? '−' : '+') + Q31.sci(q, 3, 'C'), sx, sy - R - 22, { s: 15, w: 900, c: '#fff', bg: sgn > 0 ? '#b91c1c' : '#1d4ed8', mono: 1 });
      if (p.zoom !== false) { const lx = sx + R * .55, ly = sy + R * .5; K.lens(ctx, lx + 60 * u, ly + 10, 46 * u, () => { for (let k = 0; k < 14; k++) Q31.el(ctx, lx + 30 * u + (k % 5) * 14 * u, ly - 18 + (k / 5 | 0) * 16, 5); }); }
      // steps card
      const e = p.ex10 + 19, mm = p.m / 1.6; const L = [{ t: 'n = q / e = ' + Q31.sci(q, 3) + ' C ÷ 1.6×10⁻¹⁹ C', mono: 1 }, { t: '= (' + p.m + ' ÷ 1.6) × 10' + Q31.sup('(' + p.ex10 + '+19)'), mono: 1 }, { t: '= ' + (+mm.toPrecision(4)) + ' × 10' + Q31.sup(e), mono: 1 }, { t: 'عند القسمة نطرح الأسس:', c: '#7c3aed' }, { t: '(' + String(p.ex10).replace('-', '−') + ') − (−19) = ' + e, c: '#7c3aed', mono: 1 }, { t: 'n = ' + Q31.sci(n, 4) + ' إلكترون', c: '#1d4ed8', w: 900, mono: 1 },
        ok ? { t: p.sgn === '-' ? '✓ الجسم اكتسب هذا العدد من الإلكترونات' : '✓ الجسم فقد هذا العدد من الإلكترونات', c: '#15803d', w: 900 } : { t: '✗ n ليس عدداً صحيحاً ⟸ هذه الشحنة غير ممكنة!', c: '#dc2626', w: 900 }];
      Q31.card(ctx, S, L, { title: 'عدد الإلكترونات = شحنة الجسم ÷ شحنة الإلكترون', y: ph ? 60 : 50, wd: 380 });
      // ladder of units
      if (!ph) { const lx = Q31.cx(w) + 40, ly = h * .5; Q31.card(ctx, S, [{ t: '1 C = 6.25×10¹⁸ إلكترون' }, { t: '1 μC = 10⁻⁶ C = 6.25×10¹² إلكترون' }, { t: '1 nC = 10⁻⁹ C = 6.25×10⁹ إلكترون' }, { t: 'e = 1.6×10⁻¹⁹ C (أصغر شحنة)', w: 900 }], { title: 'الكولوم وأجزاؤه', y: h * .5, wd: 330, bd: '#7c3aed' }); }
      Q31.banner(ctx, w, 'مقدار الشحنة: q = n × e', '#2563eb');
    },
    readings(S) { const q = D.q(S), n = q / 1.6e-19; return [rd('الشحنة q', Q31.sci(q, 3, 'C')), rd('عدد الإلكترونات n', Q31.sci(n, 4)), rd('بالمايكروكولوم', Q31.sci(q / 1e-6, 3, 'μC')), rd('بالنانوكولوم', Q31.sci(q / 1e-9, 3, 'nC'))]; },
    explain(S) { const q = D.q(S), n = q / 1.6e-19; return 'لحساب عدد الإلكترونات نقسم الشحنة على شحنة الإلكترون: n = q ÷ e. عند قسمة الأسس <b>نطرح</b> الأس السفلي من العلوي. هنا n ≈ <b>' + Q31.sci(n, 4) + '</b> إلكترون. مثال الكتاب (س1-3): 1.6×10⁻⁹ ÷ 1.6×10⁻¹⁹ = 10¹⁰ إلكترون.'; }
  };
  M8.P[D.id] = D;
})();
/* ---- E2 part 3: نشاط — الشحنات المتشابهة تتنافر والمختلفة تتجاذب (الشكل 13، ص 11–12) ---- */
(() => {
  const CASES = { a: ['rubber', 'rubber', 'أولاً: ساقا مطاط تُدلكان بالصوف (13-a)'], b: ['glass', 'glass', 'ثانياً: ساقا زجاج تُدلكان بالحرير (13-b)'], c: ['glass', 'rubber', 'ثالثاً: ساق زجاج بالحرير وساق مطاط بالصوف (13-c)'] };
  const sgnOf = m => m === 'glass' ? 1 : -1, clothOf = m => m === 'glass' ? 'silk' : 'wool';
  const D = { id: 'g9_ch_rods', page: 11, fig: 'الشكل 13 (a, b, c)',
    desc: 'نشاط الكتاب: نعلّق ساقين أفقياً بخيطين بوساطة حاملين ونجعلهما متقاربتين، ندلك كلاً منهما على انفراد، ثم نتركهما معلقتين بحرية ونلاحظ التنافر أو التجاذب.',
    tags: 'نشاط ساق مطاط زجاج صوف حرير فرو تنافر تجاذب شحنات متشابهة مختلفة حاملين خيوط',
    tools: ['ساقان متماثلتان من المطاط الصلب', 'ساقان متماثلتان من الزجاج', 'قطعة صوف (أو فرو)', 'قطعة حرير', 'خيوط من القطن أو الحرير', 'حاملان'],
    steps: ['اختر الخطوة: أولاً (مطاط + مطاط) / ثانياً (زجاج + زجاج) / ثالثاً (زجاج + مطاط).', 'اسحب قطعة القماش تحت كل ساق ذهاباً وإياباً لتدلكها على انفراد (الصوف للمطاط، الحرير للزجاج) — أو اضغط «ادلك الساقين».', 'لاحظ نوع الشحنة على كل ساق وعلى القماش.', 'اضغط «اترك الساقين» (أو هما حرتان أصلاً) ولاحظ: تتنافران أم تتجاذبان؟', 'سجّل النتيجة في الجدول (📋) لكل خطوة.'],
    concl: ['نستنتج من النشاط الأول: أن الشحنات المتشابهة (السالبة) تتنافر مع بعضها.', 'نستنتج من النشاط الثاني: أن الشحنات المتشابهة (الموجبة) تتنافر مع بعضها.', 'نستنتج من النشاط الثالث: أن الشحنات المختلفة تتجاذب مع بعضها.', 'تذكّر: الشحنات المختلفة تتجاذب، والمتشابهة تتنافر.'],
    laws: ['g9_rule'],
    controls: [SEL('cs', 'الخطوة', [['a', 'أولاً: مطاط + مطاط'], ['b', 'ثانياً: زجاج + زجاج'], ['c', 'ثالثاً: زجاج + مطاط']], 'a', (v, S) => D.reset(S)),
      BT('', [{ t: '🧽 ادلك الساقين', on: S => { S.auto = 1.6; } }, { t: '✋ اترك الساقين', on: S => { S.held = 0; } }, { t: '↺ أعد', on: S => D.reset(S) }]),
      TG('chg', 'الشحنات', true, null, 'charges'), TG('fx', 'أسهم قوة التنافر/التجاذب', true, null, 'force'), TG('cl', 'شحنة القماش', true, null, 'charges'), TG('rem', 'بطاقة «تذكّر»', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.q = [0, 0]; S.x = [0, 0]; S.v = [0, 0]; S.held = 1; S.auto = 0; S.cl = null; S.res = ''; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, u = Q31.sc(w, h) * (ph ? .85 : 1.15), cx = Q31.cx(w), by = h * .8, yt = h * .2, L = 150 * u, rl = Math.min(150 * u, (w - (ph ? 20 : 80)) * .26); return { w, h, ph, u, cx, by, yt, L, rl, gap: 30 * u, sx: [cx - rl - 70 * u, cx + rl + 70 * u] }; },
    rodX(S, g, i) { const s = i ? 1 : -1; const c = g.cx + s * (g.gap / 2 + g.rl / 2) - s * S.x[i]; return c; },
    mats(S) { return CASES[S.p.cs]; },
    clothPos(S, g, i) { if (!S.cl) S.cl = [[D.rodX(S, g, 0), g.yt + g.L + 70 * g.u], [D.rodX(S, g, 1), g.yt + g.L + 70 * g.u]]; return S.cl[i]; },
    rubOne(S, i) { const m = D.mats(S)[i]; if (Math.abs(S.q[i]) >= 6) return; S.q[i] += sgnOf(m); },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); dt = Math.min(dt, .04);
      if (S.auto > 0) { S.auto -= dt; S._a = (S._a || 0) + dt; if (S._a > .12) { S._a = 0; D.rubOne(S, 0); D.rubOne(S, 1); } if (S.auto <= 0) S.held = 0; }
      if (S.held) { S.x = [0, 0]; S.v = [0, 0]; return; }
      const gap = g.gap + S.x[0] + S.x[1]; // positive x = toward the other rod
      const F = 9000 * g.u * S.q[0] * S.q[1] / Math.pow(Math.max(gap, 4) + 20 * g.u, 2); // + repel
      for (let i = 0; i < 2; i++) { const a = -F - 18 * S.x[i] - 3 * S.v[i]; S.v[i] += a * dt; S.x[i] += S.v[i] * dt; }
      const gp = g.gap + S.x[0] + S.x[1]; if (gp > g.gap * 2.4 + 0) { } if (g.gap - (-S.x[0] - S.x[1]) < 0) { } if (g.gap + S.x[0] + S.x[1] > 0 && false) { }
      if (g.gap - S.x[0] - S.x[1] < 2) { const ex = (S.x[0] + S.x[1] - g.gap + 2) / 2; S.x[0] -= ex; S.x[1] -= ex; S.v = [Math.min(0, S.v[0]), Math.min(0, S.v[1])]; }
      S.x = S.x.map(x => clamp(x, -g.L * .55, g.L * .55));
      S.res = S.q[0] && S.q[1] ? (S.q[0] * S.q[1] > 0 ? 'تنافر' : 'تجاذب') : '';
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), u = g.u, p = S.p, M = D.mats(S); K.bg(ctx, w, h, { benchY: g.by });
      for (let i = 0; i < 2; i++) { const s = i ? 1 : -1; const ax = g.sx[i], tip = g.cx + s * (g.gap / 2 + g.rl / 2); Q31.gallows(ctx, ax, g.by, g.yt, tip - ax);
        const rc = D.rodX(S, g, i), ry = g.yt + g.L, x1 = rc - g.rl / 2, x2 = rc + g.rl / 2; Q31.thread(ctx, tip, g.yt, x1 + g.rl * .18, ry - 6); Q31.thread(ctx, tip, g.yt, x2 - g.rl * .18, ry - 6);
        const n = Math.abs(S.q[i]); Q31.rod(ctx, x1, ry, x2, ry, 20 * u, M[i], p.chg !== false && n ? { n, s: Math.sign(S.q[i]), from: i ? .06 : .4, to: i ? .6 : .94 } : null);
        if (p.lab !== false) Q31.T(ctx, Q31.MAT[M[i]].n + (S.q[i] ? (S.q[i] > 0 ? ' (موجبة)' : ' (سالبة)') : ' (متعادلة)'), rc, ry - 30 * u, { s: 11.5, w: 900, c: '#fff', bg: M[i] === 'glass' ? '#0369a1' : '#1e293b' });
        // cloth
        const cp = D.clothPos(S, g, i); Q31.cloth(ctx, cp[0], cp[1], clothOf(M[i]), u * 1.05); if (p.cl !== false && S.q[i]) { const k = Math.abs(S.q[i]); for (let j = 0; j < k; j++) Q31.sg(ctx, cp[0] - 25 * u + j * 10 * u, cp[1] - 4, -Math.sign(S.q[i]), 5); }
        Q31.T(ctx, clothOf(M[i]) === 'silk' ? 'حرير — اسحبه تحت الساق' : 'صوف — اسحبه تحت الساق', cp[0], cp[1] + 34 * u, { s: 10.5, w: 800, c: '#fff', bg: clothOf(M[i]) === 'silk' ? '#be185d' : '#a16207' });
      }
      // force arrows at near ends
      if (p.fx !== false && S.q[0] && S.q[1]) { const ry = g.yt + g.L, e0 = D.rodX(S, g, 0) + g.rl / 2, e1 = D.rodX(S, g, 1) - g.rl / 2, rep = S.q[0] * S.q[1] > 0, L = 26 + 5 * Math.abs(S.q[0] * S.q[1]) ** .5 * u;
        K.force(ctx, e0, ry + 26 * u, rep ? -L : L, 0, null, rep ? '#dc2626' : '#16a34a', 4); K.force(ctx, e1, ry + 26 * u, rep ? L : -L, 0, null, rep ? '#dc2626' : '#16a34a', 4);
        Q31.T(ctx, rep ? 'قوة تنافر' : 'قوة تجاذب', g.cx, ry + 52 * u, { s: 13, w: 900, c: '#fff', bg: rep ? '#dc2626' : '#16a34a' }); }
      if (S.held && (S.q[0] || S.q[1])) Q31.T(ctx, 'الساقان ممسوكتان — اضغط «اترك الساقين»', g.cx, g.yt - 14, { s: 12, w: 900, c: '#fff', bg: '#b45309' });
      // remember card
      if (p.rem !== false) { const y = g.by + 34; const pairs = [[1, 1, 'تنافر'], [-1, -1, 'تنافر'], [1, -1, 'تجاذب']]; const x0 = g.ph ? 40 : g.cx - 200 * u;
        pairs.forEach((q, i) => { const x = x0 + i * (g.ph ? 110 : 150 * u); const rep = q[0] * q[1] > 0; Q31.ball(ctx, x, y, 12, q[0]); Q31.ball(ctx, x + 44, y, 12, q[1]); K.force(ctx, x - 14, y, rep ? -16 : 0, 0, null, '#dc2626', 2.5); K.force(ctx, x + 58, y, rep ? 16 : 0, 0, null, '#dc2626', 2.5); if (!rep) { K.force(ctx, x + 14, y, 12, 0, null, '#16a34a', 2.5); K.force(ctx, x + 30, y, -12, 0, null, '#16a34a', 2.5); } Q31.T(ctx, q[2], x + 22, y + 24, { s: 11, w: 900, c: '#fff', bg: rep ? '#dc2626' : '#16a34a' }); });
        if (!g.ph) Q31.T(ctx, 'تذكّر', x0 - 50, y, { s: 13, w: 900, c: '#fff', bg: '#ca8a04' }); }
      Q31.banner(ctx, w, 'نشاط: ' + CASES[p.cs][2], '#16a34a');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [0, 1].map(i => { const cp = D.clothPos(S, g, i); return { id: 'cloth' + i, x: cp[0], y: cp[1], r: 38 * g.u, axis: 'xy', keep: true, tip: 'اسحب القماش تحت الساق ذهاباً وإياباً لدلكها', idle: i ? undefined : 'ادلك الساق ✋',
      drag: (S, d) => { S.cl[i] = [clamp(d.ox + d.x - d.sx, 40, S.W - 30), clamp(d.oy + d.y - d.sy, 60, S.H - 40)]; const rc = D.rodX(S, g, i), ry = g.yt + g.L; const n = Q31.rub(S, d, Math.abs(S.cl[i][0] - rc) < g.rl / 2 && Math.abs(S.cl[i][1] - ry) < 40 * g.u, 30); for (let k = 0; k < n; k++) D.rubOne(S, i); } }; }); },
    readings(S) { const M = D.mats(S); return [rd('الساق الأولى', Q31.MAT[M[0]].n + ': ' + (S.q[0] > 0 ? '+' : S.q[0] < 0 ? '−' : '') + Math.abs(S.q[0])), rd('الساق الثانية', Q31.MAT[M[1]].n + ': ' + (S.q[1] > 0 ? '+' : S.q[1] < 0 ? '−' : '') + Math.abs(S.q[1])), rd('الملاحظة', S.held ? 'الساقان ممسوكتان' : (S.res || '—'), 1)]; },
    record(S) { if (!S.res || S.held) { Runner.toast('ادلك الساقين ثم اتركهما أولاً', 'info'); return null; } const M = D.mats(S); return { a: Q31.MAT[M[0]].n + ' (' + (S.q[0] > 0 ? '+' : '−') + ')', b: Q31.MAT[M[1]].n + ' (' + (S.q[1] > 0 ? '+' : '−') + ')', r: S.res }; },
    cols: [['a', 'الساق الأولى (الشحنة)'], ['b', 'الساق الثانية (الشحنة)'], ['r', 'الملاحظة']],
    explain(S) { const M = D.mats(S); if (!S.q[0] && !S.q[1]) return 'الساقان متعادلتان فلا تؤثر إحداهما في الأخرى. ادلك كل ساق على انفراد.';
      let t = ''; if (M.includes('rubber')) t += 'المطاط المدلوك بالصوف يكتسب إلكترونات من الصوف فيُشحن <b>بالسالبة</b> (والصوف بالموجبة). '; if (M.includes('glass')) t += 'الزجاج المدلوك بالحرير يفقد إلكترونات للحرير فيُشحن <b>بالموجبة</b> (والحرير بالسالبة). ';
      if (S.res) t += S.res === 'تنافر' ? '<br>الشحنتان <b>متشابهتان فتتنافران</b>.' : '<br>الشحنتان <b>مختلفتان فتتجاذبان</b>.'; return t; }
  };
  M8.P[D.id] = D;
})();
/* ---- E2 part 4: ➕ السلسلة الكهربائية الاحتكاكية ---- */
(() => {
  const SER = [['fur', 'الفرو', '#d97706'], ['glass', 'الزجاج', '#7dd3fc'], ['hair', 'الشعر الجاف', '#7c2d12'], ['wool', 'الصوف', '#eab308'], ['silk', 'الحرير', '#f9a8d4'], ['paper', 'الورق', '#f5f5f4'], ['cotton', 'القطن', '#e5e7eb'], ['amber', 'الكهرمان', '#f59e0b'], ['rubber', 'المطاط الصلب', '#1e293b'], ['balloon', 'البالون', '#ef4444'], ['comb', 'المشط البلاستيكي', '#7c3aed'], ['pvc', 'أنبوب PVC', '#94a3b8']];
  const D = { id: 'g9_ch_tribo', page: 13, fig: '➕ من المختبرات العالمية',
    desc: '➕ من المختبرات العالمية: «السلسلة الكهربائية الاحتكاكية» ترتّب المواد حسب ميلها لفقد الإلكترونات. عند دلك مادتين، المادة الأعلى في السلسلة تفقد إلكترونات (تصبح موجبة) والأدنى تكتسبها (تصبح سالبة). تتفق مع الكتاب: الزجاج بالحرير موجب، المطاط بالصوف سالب، البالون بالصوف سالب، المشط بالشعر سالب.',
    tags: 'سلسلة احتكاكية ترايبو مواد دلك موجب سالب',
    tools: ['مواد مختلفة'],
    steps: ['اختر المادة الأولى والمادة الثانية.', 'اسحب قطعة المادة الأولى فوق الثانية ذهاباً وإياباً (أو اضغط «ادلك»).', 'لاحظ أين تقع كل مادة في السلسلة، ومن يفقد الإلكترونات ومن يكتسبها.'],
    concl: ['المادة الأعلى في السلسلة تُشحن بالموجبة، والأدنى بالسالبة.', 'كلما تباعدت المادتان في السلسلة كان الشحن أقوى.', 'مادتان من النوع نفسه لا تُشحنان بالدلك.'],
    controls: [SEL('a', 'المادة الأولى', SER.map(s => [s[0], s[1]]), 'glass', (v, S) => { S.q = 0; }), SEL('b', 'المادة الثانية', SER.map(s => [s[0], s[1]]), 'silk', (v, S) => { S.q = 0; }), BT('', [{ t: '🧽 ادلك', on: S => { S.auto = 1.2; } }, { t: '↺ أعد', on: S => { S.q = 0; } }])],
    setup(S) { S.q = 0; S.off = 0; },
    idx(k) { return SER.findIndex(s => s[0] === k); },
    rub(S) { const d = D.idx(S.p.b) - D.idx(S.p.a); if (!d) return; S.q = clamp(S.q + Math.sign(d), -Math.min(8, Math.abs(d) * 2), Math.min(8, Math.abs(d) * 2)); },
    update(S, dt) { if (S.auto > 0) { S.auto -= dt; S.off = Math.sin(S.t * 18) * 30; S._a = (S._a || 0) + dt; if (S._a > .1) { S._a = 0; D.rub(S); } } },
    draw(ctx, w, h, S) {
      const ph = w < 600, u = Q31.sc(w, h), cx = Q31.cx(w); K.bg(ctx, w, h, { benchY: h * .82 });
      // ladder
      const lx = ph ? w - 120 : w - 190, ly = 60, lh = (h * (ph ? .5 : .74)) / SER.length;
      Q31.T(ctx, '(+) يفقد إلكترونات', lx + 60, ly - 10, { s: 11, w: 900, c: '#fff', bg: '#dc2626' });
      SER.forEach((s, i) => { const y = ly + 10 + i * lh, on = s[0] === S.p.a || s[0] === S.p.b; Q31.raw(ctx, () => { ctx.fillStyle = on ? 'rgba(250,204,21,.5)' : 'rgba(255,255,255,.85)'; rr(ctx, lx, y, 120, lh - 3, 6); ctx.fill(); ctx.fillStyle = s[2]; ctx.beginPath(); ctx.arc(lx + 108, y + lh / 2 - 1, 6, 0, TAU); ctx.fill(); }); Q31.T(ctx, s[1], lx + 94, y + lh / 2 - 1, { s: 11, w: on ? 900 : 700, a: 'right' }); });
      Q31.T(ctx, '(−) يكتسب إلكترونات', lx + 60, ly + 18 + SER.length * lh, { s: 11, w: 900, c: '#fff', bg: '#2563eb' });
      Q31.raw(ctx, () => { G.arrow(ctx, lx - 14, ly + 10, lx - 14, ly + SER.length * lh, '#64748b', 2.5, 9); });
      // two blocks
      const A = SER[D.idx(S.p.a)], B = SER[D.idx(S.p.b)], bx = ph ? w * .4 : cx - 90 * u, by = h * .6, bw = 180 * u;
      Q31.raw(ctx, () => { const gb = ctx.createLinearGradient(0, by, 0, by + 50 * u); gb.addColorStop(0, shade(B[2], 20)); gb.addColorStop(1, shade(B[2], -25)); ctx.fillStyle = gb; rr(ctx, bx - bw / 2, by, bw, 50 * u, 8); ctx.fill(); const ga = ctx.createLinearGradient(0, by - 50 * u, 0, by); ga.addColorStop(0, shade(A[2], 25)); ga.addColorStop(1, shade(A[2], -20)); ctx.fillStyle = ga; rr(ctx, bx - 60 * u + (S.off || 0), by - 46 * u, 120 * u, 44 * u, 8); ctx.fill(); });
      Q31.T(ctx, A[1], bx + (S.off || 0), by - 24 * u, { s: 13, w: 900, c: '#fff', bg: 'rgba(15,23,42,.6)' }); Q31.T(ctx, B[1], bx, by + 25 * u, { s: 13, w: 900, c: '#fff', bg: 'rgba(15,23,42,.6)' });
      const n = Math.abs(S.q); for (let k = 0; k < n; k++) { Q31.sg(ctx, bx - 50 * u + k * 13 * u + (S.off || 0), by - 42 * u + 10, S.q > 0 ? 1 : -1, 5.5); Q31.sg(ctx, bx - 70 * u + k * 17 * u, by + 44 * u, S.q > 0 ? -1 : 1, 5.5); }
      const d = D.idx(S.p.b) - D.idx(S.p.a);
      Q31.card(ctx, S, [d === 0 ? { t: 'المادتان متماثلتان: لا يحدث شحن', w: 900 } : { t: (d > 0 ? A[1] : B[1]) + ' أعلى في السلسلة ⟸ يفقد إلكترونات ⟸ موجب', c: '#b91c1c' }, d ? { t: (d > 0 ? B[1] : A[1]) + ' أدنى ⟸ يكتسب إلكترونات ⟸ سالب', c: '#1d4ed8' } : { t: '' }, { t: 'البعد في السلسلة: ' + Math.abs(d) + ' درجة', w: 800 }], { title: 'النتيجة', y: 50, x: ph ? null : lx - 20, wd: ph ? 340 : 330 });
      Q31.banner(ctx, w, '➕ من المختبرات العالمية: السلسلة الاحتكاكية', '#7c3aed');
    },
    drags(S) { if (!S.W) return []; const u = Q31.sc(S.W, S.H), bx = S.W < 600 ? S.W * .4 : Q31.cx(S.W) - 90 * u, by = S.H * .6; return [{ id: 'top', x: bx + (S.off || 0), y: by - 24 * u, w: 120 * u, h: 44 * u, axis: 'x', keep: true, tip: 'ادلك المادة الأولى فوق الثانية', idle: 'ادلك ↔', drag: (S, d) => { S.off = clamp(d.x - d.sx, -60, 60); if (Q31.rub(S, d, true, 30)) D.rub(S); }, up: S => { S.off = 0; } }]; },
    readings(S) { const d = D.idx(S.p.b) - D.idx(S.p.a); return [rd('شحنة المادة الأولى', (S.q > 0 ? '+' : S.q < 0 ? '−' : '') + Math.abs(S.q)), rd('شحنة المادة الثانية', (S.q > 0 ? '−' : S.q < 0 ? '+' : '') + Math.abs(S.q)), rd('المجموع', '0')]; },
    explain(S) { return 'الإلكترونات تنتقل من المادة التي تمسك إلكتروناتها بقوة أقل (أعلى السلسلة) إلى المادة التي تمسكها بقوة أكبر (أسفل السلسلة). الشحنتان متساويتان مقداراً ومختلفتان نوعاً: مجموعهما صفر.'; }
  };
  M8.P[D.id] = D;
})();
/* =============== E3 — شحن المادة بالكهربائية (3-1، ص 13–14، س4 س5) =============== */
(() => {
  const D = { id: 'g9_chg_rub', page: 13, fig: 'الشكل 14',
    desc: 'الشحن بطريقة الدلك: إذا دلكت بالوناً بقطعة من الصوف تظهر شحنة موجبة على الصوف (لفقده بعض إلكتروناته) وشحنة سالبة على البالون (لاكتسابه تلك الإلكترونات). البالون المعلق بخيط عازل تجذبه قطعة الصوف.',
    tags: 'شحن بالدلك بالون صوف خيط عازل تجاذب حفظ الشحنة',
    tools: ['بالون', 'قطعة صوف', 'خيط من مادة عازلة', 'حامل'],
    steps: ['اسحب قطعة الصوف فوق البالون المعلق ذهاباً وإياباً (دلك).', 'شاهد الإلكترونات تنتقل من الصوف إلى البالون، ولاحظ عدّاد الشحنات.', 'أبعد قطعة الصوف قليلاً ثم قرّبها من البالون دون لمسه: ينجذب البالون نحوها (قوة تجاذب).'],
    concl: ['في الشحن بالدلك يُشحن الجسمان بشحنتين مختلفتين في النوع ومتساويتين في المقدار.', 'تنتقل الإلكترونات من جسم إلى آخر (هنا من الصوف إلى البالون).', 'الجسمان المدلوكان يتجاذبان لأن شحنتيهما مختلفتان.'],
    laws: ['g9_rule'],
    controls: [BT('', [{ t: '🧽 ادلك (تلقائي)', on: S => { S.auto = 1.5; } }, { t: '↺ أعد', on: S => D.reset(S) }]), SEL('show', 'عرض الشحنات', [['all', 'كل الشحنات'], ['diff', 'الفرق فقط'], ['none', 'لا شيء']], 'all'), TG('fx', 'سهم قوة التجاذب', true, null, 'force')],
    setup(S) { D.reset(S); },
    reset(S) { S.n = 0; S.th = 0; S.om = 0; S.w = null; S.auto = 0; S._fly = []; },
    geo(S) { const w = S.W, h = S.H, u = Q31.sc(w, h) * (w < 600 ? 1 : 1.25), cx = Q31.cx(w), by = h * .84, top = h * .14, L = h * .38; return { w, h, u, cx, by, top, L, px: cx - 40 * u, r: 52 * u }; },
    bpos(S, g) { return [g.px + Math.sin(S.th) * g.L, g.top + Math.cos(S.th) * g.L + g.r]; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); dt = Math.min(dt, .04); if (!S.w) S.w = [g.px + 190 * g.u, g.top + g.L + g.r]; const B = D.bpos(S, g);
      if (S.auto > 0) { S.auto -= dt; S.w = [B[0] + 40 * g.u + Math.sin(S.t * 16) * 26, B[1]]; S._a = (S._a || 0) + dt; if (S._a > .1) { S._a = 0; D.tr(S, g); } }
      const dx = S.w[0] - B[0], dy = S.w[1] - B[1], d = Math.hypot(dx, dy); let F = 0; if (S.n && d > g.r * 1.2) F = 2.2e5 * S.n * S.n / (d * d) * (dx / d) / g.L;
      S.om += (-9.8 / (g.L / 300) * Math.sin(S.th) * .05 + F * .02 - 1.5 * S.om) * dt * 8; S.th = clamp(S.th + S.om * dt, -.55, .55);
      const B2 = D.bpos(S, g); if (Math.hypot(S.w[0] - B2[0], S.w[1] - B2[1]) < g.r * 1.1 && S.n && !S.drag && S.auto <= 0) { S.om = 0; } },
    tr(S, g) { if (S.n >= 10) return; S.n++; const B = D.bpos(S, g); Q31.fly(S, S.w[0], S.w[1], B[0], B[1], .4); if (window.Sound && Sound.tick) Sound.tick(); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), u = g.u, mode = S.p.show; K.bg(ctx, w, h, { benchY: g.by }); if (!S.w) S.w = [g.px + 190 * u, g.top + g.L + g.r];
      Q31.gallows(ctx, g.px - 160 * u, g.by, g.top, 160 * u); const B = D.bpos(S, g);
      Q31.thread(ctx, g.px, g.top, B[0], B[1] - g.r * 1.15); Q31.balloon(ctx, B[0], B[1], g.r, '#f97316');
      if (mode !== 'none') { const pts = [[-.35, -.4], [.3, -.45], [-.45, .1], [.4, .05], [0, .45], [-.1, -.1]]; if (mode === 'all') pts.forEach(q => { Q31.sg(ctx, B[0] + q[0] * g.r - 5, B[1] + q[1] * g.r, 1, 5.5); Q31.sg(ctx, B[0] + q[0] * g.r + 6, B[1] + q[1] * g.r + 3, -1, 5.5); }); for (let k = 0; k < S.n; k++) { const a = -1.4 + k * .3; Q31.sg(ctx, B[0] + Math.cos(a) * g.r * .78, B[1] + Math.sin(a) * g.r * .92, -1, 5.5); } }
      Q31.cloth(ctx, S.w[0], S.w[1], 'wool', 1.3 * u); if (mode !== 'none') { const tot = mode === 'all' ? 8 : 0; for (let k = 0; k < tot; k++) { Q31.sg(ctx, S.w[0] - 30 * u + (k % 4) * 18 * u, S.w[1] - 12 * u + (k / 4 | 0) * 18 * u, 1, 5); if (k >= S.n) Q31.sg(ctx, S.w[0] - 22 * u + (k % 4) * 18 * u, S.w[1] - 8 * u + (k / 4 | 0) * 18 * u, -1, 5); } if (mode === 'diff') for (let k = 0; k < S.n; k++) Q31.sg(ctx, S.w[0] - 30 * u + (k % 5) * 14 * u, S.w[1] - 8 * u + (k / 5 | 0) * 14 * u, 1, 5); }
      Q31.T(ctx, 'قطعة صوف — اسحبها', S.w[0], S.w[1] + 40 * u, { s: 11, w: 800, c: '#fff', bg: '#a16207' }); Q31.T(ctx, 'خيط عازل', g.px + 30 * u, g.top + 40, { s: 10.5, w: 800, c: '#fff', bg: '#57534e' });
      Q31.drawFly(ctx, S);
      const d = Math.hypot(S.w[0] - B[0], S.w[1] - B[1]); if (S.p.fx !== false && S.n >= 2 && d > g.r * 1.4 && d < 360 * u) { const ux = (S.w[0] - B[0]) / d, uy = (S.w[1] - B[1]) / d, L = clamp(4000 * S.n / d, 18, 70); K.force(ctx, B[0] + ux * g.r, B[1] + uy * g.r, ux * L, uy * L, 'قوة تجاذب', '#16a34a', 4); }
      Q31.card(ctx, S, [{ t: 'الصوف فقد ' + S.n + ' إلكترون ⟸ +' + S.n, c: '#b91c1c' }, { t: 'البالون اكتسب ' + S.n + ' إلكترون ⟸ −' + S.n, c: '#1d4ed8' }, { t: 'شحنتان متساويتان مقداراً مختلفتان نوعاً', w: 900 }], { title: 'الشحن بالدلك (الشكل 14)', y: 44, wd: 300 });
      Q31.banner(ctx, w, 'a — الشحن بطريقة الدلك', '#ea580c');
    },
    drags(S) { if (!S.W || !S.w) return []; const g = D.geo(S); return [{ id: 'wool', x: S.w[0], y: S.w[1], r: 44 * g.u, axis: 'xy', keep: true, tip: 'ادلك البالون بالصوف ثم أبعده وقرّبه', idle: 'ادلك البالون ✋', down: S => { S.drag = 1; }, up: S => { S.drag = 0; },
      drag: (S, d) => { S.w = [clamp(d.ox + d.x - d.sx, 40, S.W - 30), clamp(d.oy + d.y - d.sy, 60, g.by - 20)]; const B = D.bpos(S, g); if (Q31.rub(S, d, Math.hypot(S.w[0] - B[0], S.w[1] - B[1]) < g.r * 1.3, 34)) D.tr(S, g); } }]; },
    readings(S) { return [rd('شحنة الصوف', '+' + S.n), rd('شحنة البالون', '−' + S.n), rd('مجموع الشحنات', '0 (محفوظ)'), rd('انحراف البالون', fmt(Math.abs(S.th) * 57.3, 2) + '°')]; },
    explain(S) { return S.n ? 'انتقل ' + S.n + ' إلكترون من <b>الصوف</b> إلى <b>البالون</b>: الصوف صار <b>موجباً</b> (فقد إلكترونات) والبالون <b>سالباً</b> (اكتسبها). الشحنتان مختلفتان فيتجاذبان: ينحرف البالون المعلق بالخيط العازل نحو قطعة الصوف.' : 'البالون والصوف متعادلان. ادلك البالون بقطعة الصوف.'; }
  };
  M8.P[D.id] = D;
})();
/* ---- E3 part 2: الشحن بالتماس — كرتا نخاع البيلسان (الشكل 15) ---- */
(() => {
  const D = { id: 'g9_chg_contact', page: 13, fig: 'الشكل 15 (a, b)',
    desc: 'الشحن بطريقة التماس: نعلّق كرتين من نخاع البيلسان بخيطين عازلين من نقطة واحدة، نشحن إحداهما بملامستها لساق زجاج مدلوكة بالحرير ثم نتركها تلامس الكرة الأخرى غير المشحونة، فتبتعد الكرتان: الكرة الثانية اكتسبت قسماً من شحنة الأولى بالتماس.',
    tags: 'شحن بالتماس كرات نخاع البيلسان ساق زجاج حرير تنافر رطوبة',
    tools: ['كرتان من نخاع البيلسان', 'خيطان عازلان', 'ساق زجاج', 'قطعة حرير', 'حامل'],
    steps: ['اضغط «ادلك الساق بالحرير»: تُشحن ساق الزجاج بالموجبة.', 'اسحب الساق حتى تلمس الكرة الأولى (اليسرى): تنتقل إلكترونات من الكرة إلى الساق فتُشحن الكرة بالموجبة (15-a).', 'أبعد الساق، واسحب الكرة الأولى لتلامس الكرة الثانية ثم اتركها.', 'لاحظ ابتعاد الكرتين عن بعضهما (تنافر) لأن كلاً منهما صارت موجبة (15-b).', 'هل تعلم: اجعل الجو رطباً ولاحظ تسرّب الشحنة مع الوقت.'],
    concl: ['في الشحن بالتماس يكتسب الجسم شحنة من النوع نفسه لشحنة الجسم الملامس.', 'الكرة الثانية اكتسبت قسماً من شحنة الكرة الأولى بالتماس، فتنافرتا.', 'الجسم المشحون المعزول يفقد شحنته عند تركه في الهواء، وتزداد سرعة التفريغ بزيادة رطوبة الجو.'],
    laws: ['g9_rule'],
    controls: [BT('', [{ t: '🧽 ادلك الساق بالحرير', on: S => { S.rq = 8; } }, { t: '↺ أعد', on: S => D.reset(S) }]), SEL('air', 'الجو', [['dry', 'جاف'], ['wet', 'رطب (هل تعلم)']], 'dry'), TG('chg', 'الشحنات', true, null, 'charges'), TG('fx', 'أسهم القوى', true, null, 'force'), TG('ang', 'زاوية الانفراج', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.q = [0, 0]; S.th = [-.03, .03]; S.om = [0, 0]; S.rq = 0; S.rod = null; S.hold = -1; S._fly = []; S.touch = 0; },
    geo(S) { const w = S.W, h = S.H, u = Q31.sc(w, h) * (w < 600 ? 1 : 1.2), cx = Q31.cx(w), by = h * .84, top = h * .14, L = h * .44, r = 17 * u; return { w, h, u, cx, by, top, L, r }; },
    bp(S, g, i) { return [g.cx + Math.sin(S.th[i]) * g.L, g.top + Math.cos(S.th[i]) * g.L]; },
    tip(S, g) { if (!S.rod) S.rod = [g.cx + 130 * g.u, g.top + g.L - 60 * g.u]; return S.rod; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); dt = Math.min(dt, .03); const T = D.tip(S, g);
      if (S.p.air === 'wet') { S.q = S.q.map(q => q * (1 - .25 * dt)); S.rq *= (1 - .25 * dt); }
      const P = [D.bp(S, g, 0), D.bp(S, g, 1)];
      for (let i = 0; i < 2; i++) { if (S.hold === i) { S.om[i] = 0; continue; } let fx = 0; const j = 1 - i, dx = P[i][0] - P[j][0], dy = P[i][1] - P[j][1], d = Math.max(Math.hypot(dx, dy), g.r * 2);
        fx += 5e5 * g.u * S.q[i] * S.q[j] / (d * d) * dx / d;
        const tx = P[i][0] - T[0], ty = P[i][1] - T[1], td = Math.max(Math.hypot(tx, ty), g.r * 1.2); if (S.rq) { const f = S.q[i] ? 1.2e5 * g.u * S.q[i] * S.rq * .5 / (td * td) : -2e6 * g.u * S.rq * S.rq * .02 / (td * td * td) * 10; fx += f * tx / td; }
        const a = -9.8 * Math.sin(S.th[i]) * 3 + fx / g.L * 1.4 - 2.2 * S.om[i]; S.om[i] += a * dt; S.th[i] = clamp(S.th[i] + S.om[i] * dt, -1.1, 1.1); }
      // ball-ball contact: share charge, no overlap
      let A = D.bp(S, g, 0), B = D.bp(S, g, 1), dd = Math.hypot(A[0] - B[0], A[1] - B[1]);
      if (dd < g.r * 2) { if (Math.abs(S.q[0] - S.q[1]) > .05) { const m = (S.q[0] + S.q[1]) / 2; const from = S.q[0] > S.q[1] ? 1 : 0; for (let k = 0; k < Math.round(Math.abs(S.q[0] - S.q[1]) / 2); k++) Q31.fly(S, D.bp(S, g, from)[0], D.bp(S, g, from)[1], D.bp(S, g, 1 - from)[0], D.bp(S, g, 1 - from)[1], .3); S.q = [m, m]; }
        const push = (g.r * 2 - dd) / g.L / 2; if (S.hold !== 0) S.th[0] -= push; if (S.hold !== 1) S.th[1] += push; S.om = S.om.map(o => o * .5); }
      // rod contact
      for (let i = 0; i < 2; i++) { const P2 = D.bp(S, g, i), td = Math.hypot(P2[0] - T[0], P2[1] - T[1]); if (td < g.r + 9 * g.u) { if (S.rq > .2 && S.q[i] < S.rq * .5 - .2) { const dq = Math.min(3, S.rq * .5 - S.q[i]); S.q[i] += dq; S.rq -= dq; for (let k = 0; k < Math.round(dq); k++) Q31.fly(S, P2[0], P2[1], T[0] - 30, T[1], .35); S.touch++; } const ux = (P2[0] - T[0]) / (td || 1); S.th[i] += ux * (g.r + 9 * g.u - td) / g.L; } }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), u = g.u, p = S.p, T = D.tip(S, g); K.bg(ctx, w, h, { benchY: g.by, top: p.air === 'wet' ? '#e2e8f0' : undefined }); Q31.gallows(ctx, g.cx - 200 * u, g.by, g.top, 200 * u);
      for (let i = 0; i < 2; i++) { const P = D.bp(S, g, i); Q31.thread(ctx, g.cx, g.top, P[0], P[1]); Q31.raw(ctx, () => { const gg = ctx.createRadialGradient(P[0] - g.r * .35, P[1] - g.r * .4, 2, P[0], P[1], g.r); gg.addColorStop(0, '#fff'); gg.addColorStop(.4, '#fef9c3'); gg.addColorStop(1, '#ca8a04'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(P[0], P[1], g.r, 0, TAU); ctx.fill(); });
        if (p.chg !== false) { const n = Math.round(S.q[i]); for (let k = 0; k < Math.min(n, 4); k++) Q31.sg(ctx, P[0] + (k % 2 ? 6 : -6) * u, P[1] + (k > 1 ? 6 : -6) * u, 1, 5); } }
      if (p.ang !== false) { const a = Math.abs(S.th[1] - S.th[0]) * 57.3; Q31.T(ctx, 'زاوية الانفراج ≈ ' + Math.round(a) + '°', g.cx, g.top + 40, { s: 12, w: 900, c: '#fff', bg: '#475569' }); }
      if (p.fx !== false && S.q[0] > .3 && S.q[1] > .3) { const A = D.bp(S, g, 0), B = D.bp(S, g, 1); K.force(ctx, A[0] - g.r, A[1], -34, 0, null, '#dc2626', 3); K.force(ctx, B[0] + g.r, B[1], 34, 0, null, '#dc2626', 3); Q31.T(ctx, 'تنافر', g.cx, Math.max(A[1], B[1]) + 34 * u, { s: 12.5, w: 900, c: '#fff', bg: '#dc2626' }); }
      // glass rod held by hand
      Q31.rod(ctx, T[0], T[1], T[0] + 220 * u, T[1] + 70 * u, 18 * u, 'glass', p.chg !== false && S.rq > .3 ? { n: Math.round(S.rq), s: 1, from: .05, to: .55 } : null);
      C2.hand(ctx, T[0] + 210 * u, T[1] + 66 * u, -1, 1.1 * u);
      Q31.T(ctx, 'ساق زجاج' + (S.rq > .3 ? ' (+)' : ''), T[0] + 120 * u, T[1] + 10 * u, { s: 11.5, w: 900, c: '#fff', bg: '#0369a1' });
      Q31.drawFly(ctx, S); Q31.T(ctx, 'كرتا نخاع البيلسان', g.cx, g.by - 14, { s: 11, w: 800, c: '#fff', bg: '#a16207' });
      Q31.banner(ctx, w, 'b — الشحن بطريقة التماس', '#ea580c');
      const st = S.q[0] > .3 && S.q[1] > .3 ? '15-b: الكرتان موجبتان فتتنافران' : S.q[0] > .3 || S.q[1] > .3 ? '15-a: كرة واحدة مشحونة — اتركها تلامس الأخرى' : S.rq > .3 ? 'المس كرة بالساق المشحونة' : 'ادلك الساق بالحرير أولاً'; Q31.T(ctx, st, g.cx, 62, { s: 12.5, w: 900, c: '#fff', bg: '#0f766e' });
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), T = D.tip(S, g); const L = [{ id: 'rod', x: T[0] + 80 * g.u, y: T[1] + 26 * g.u, w: 170 * g.u, h: 50 * g.u, axis: 'xy', keep: true, tip: 'اسحب ساق الزجاج لتلمس الكرة', idle: 'المس الكرة بالساق ✋', drag: (S, d) => { S.rod = [clamp(d.ox - 80 * g.u + d.x - d.sx, 60, S.W - 60), clamp(d.oy - 26 * g.u + d.y - d.sy, 60, g.by - 60)]; } }];
      for (let i = 0; i < 2; i++) { const P = D.bp(S, g, i); L.push({ id: 'ball' + i, x: P[0], y: P[1], r: 26, axis: 'x', keep: true, hint: false, tip: 'اسحب الكرة (بالخيط العازل) ثم اتركها', down: S => { S.hold = i; }, up: S => { S.hold = -1; }, drag: (S, d) => { S.th[i] = clamp(Math.asin(clamp((d.x - g.cx) / g.L, -.9, .9)), -1, 1); } }); }
      return L; },
    readings(S) { return [rd('شحنة الكرة الأولى', '+' + fmt(S.q[0], 2)), rd('شحنة الكرة الثانية', '+' + fmt(S.q[1], 2)), rd('شحنة الساق', '+' + fmt(S.rq, 2)), rd('زاوية الانفراج', Math.round(Math.abs(S.th[1] - S.th[0]) * 57.3) + '°')]; },
    explain(S) { if (S.q[0] > .3 && S.q[1] > .3) return 'الكرة الثانية <b>اكتسبت قسماً من شحنة الكرة الأولى بالتماس</b> (انتقلت إلكترونات منها إلى الكرة الأولى)، فصارت الكرتان موجبتين ف<b>تتنافران</b>.' + (S.p.air === 'wet' ? ' في الجو الرطب تتسرب الشحنة بسرعة فتقترب الكرتان تدريجياً.' : '');
      if (S.q[0] > .3 || S.q[1] > .3) return 'عند ملامسة الساق الموجبة للكرة انتقلت <b>إلكترونات من الكرة إلى الساق</b>، فصارت الكرة <b>موجبة</b> (من نوع شحنة الساق نفسها). الآن اترك الكرة المشحونة تلامس الأخرى.';
      return 'الساق الزجاجية المدلوكة بالحرير موجبة. الكرتان متعادلتان (ساق مشحونة تجذب الكرة المتعادلة قليلاً). المس إحدى الكرتين بالساق.'; }
  };
  M8.P[D.id] = D;
})();
/* ---- E3 part 3: الشحن بالحث — الكرة المعدنية (الشكل 16 a–e) ---- */
const Q31I = { // shared sphere + rod induction apparatus (also used by س5)
  KAP: 3.2, F0: 230,
  f(S, g) { const d = Math.max(0, S.rx - (g.sx + g.R)); return S.touch ? 1 : clamp(1 - d / (g.u * Q31I.F0), 0, 1) ** 1.6; },
  step(S, g, dt) { // grounded → electrons flow (animated) ; touching rod (contact) → transfer
    const qi = S.qi, f = Q31I.f(S, g); const p = Q31I.KAP * qi / 6 * f; S.p_ = p;
    if (S.gnd) { const tgt = -2 * p; const dq = tgt - S.Q; if (Math.abs(dq) > .05) { const st = Math.sign(dq) * Math.min(Math.abs(dq), dt * 9); S.Q += st; S._acc = (S._acc || 0) + Math.abs(st); while (S._acc > .5) { S._acc -= .5; const gp = Q31I.gp(S, g); if (dq > 0) Q31.fly(S, gp[0], gp[1], gp[2], gp[3], .45); else Q31.fly(S, gp[2], gp[3], gp[0], gp[1], .45); } } }
    if (S.touch && S.contact) { if (!S._did) { const dq = S.qi * .45; S.Q += dq; S.qi -= dq; S._did = 1; for (let k = 0; k < Math.abs(Math.round(dq)); k++) { const a = [g.sx + g.R, g.sy]; if (dq > 0) Q31.fly(S, a[0], a[1], S.rx + 30, g.sy, .4); else Q31.fly(S, S.rx + 30, g.sy, a[0], a[1], .4); } } }
  },
  gp(S, g) { return S.gmode === 'wire' ? [g.sx, g.sy - g.R, g.sx - g.R - 60 * g.u, g.by + 6] : [g.sx - g.R * .2, g.sy - g.R, g.sx - g.R * .2 - 20 * g.u, g.sy - g.R - 120 * g.u]; },
  drawApp(ctx, S, g, o = {}) {
    const u = g.u, mode = o.mode || 'diff', rod = S.qi >= 0 ? 'glass' : 'rubber';
    Q31.sphere(ctx, g.sx, g.sy, g.R, g.by);
    const p = S.p_ || 0; Q31.sphereCharges(ctx, g.sx, g.sy, g.R, S.Q / 2 - p, S.Q / 2 + p, 0, mode);
    // rod (from right) held by hand
    const rx = S.rx, ry = g.sy; Q31.rod(ctx, rx, ry, rx + 230 * u, ry - 50 * u, 20 * u, rod, mode !== 'none' && Math.round(Math.abs(S.qi)) ? { n: Math.round(Math.abs(S.qi)), s: Math.sign(S.qi), from: .04, to: .5 } : null);
    C2.hand(ctx, rx + 222 * u, ry - 48 * u, -1, 1.1 * u, { sleeve: '#64748b' });
    if (o.lab !== false) Q31.T(ctx, (rod === 'glass' ? 'ساق زجاج (+)' : 'ساق مطاط مشحونة (−)'), rx + 130 * u, ry - 54 * u, { s: 11, w: 900, c: '#fff', bg: rod === 'glass' ? '#0369a1' : '#1e293b' });
    // earth
    if (S.gnd) { const gp = Q31I.gp(S, g); if (S.gmode === 'wire') { Q31.raw(ctx, () => { ctx.strokeStyle = '#b45309'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gp[0], gp[1]); ctx.quadraticCurveTo(gp[2], gp[1] - 30 * u, gp[2], gp[3] - 10); ctx.stroke(); }); Q31.earth(ctx, gp[2], gp[3] - 10); }
      else { C2.hand(ctx, gp[0] - 6 * u, gp[1] - 4, 1, 1.1 * u, { rot: -Math.PI / 2 - .25, sleeve: '#16a34a' }); } }
    Q31.drawFly(ctx, S);
  }
};
(() => {
  const STG = ['a) كرة متعادلة معزولة', 'b) تقريب الساق', 'c) توصيل الكرة بالأرض', 'd) قطع الاتصال بالأرض', 'e) إبعاد الساق'];
  const D = { id: 'g9_chg_induct', page: 14, fig: 'الشكل 16 (a–e)',
    desc: 'الشحن بطريقة الحث: نقرّب ساق مطاط مشحونة بالسالبة من كرة معدنية متعادلة معزولة دون تماس، نوصل الكرة بالأرض ثم نقطع الاتصال مع بقاء الساق قريبة، وأخيراً نبعد الساق فتتوزع الشحنة الموجبة (المقيدة) بانتظام على سطح الكرة.',
    tags: 'شحن بالحث كرة معدنية معزولة ساق مطاط تأريض شحنات طليقة مقيدة',
    tools: ['كرة معدنية على حامل عازل', 'ساق مطاط صلب', 'قطعة صوف', 'سلك موصول بالأرض أو إصبع اليد'],
    steps: ['(a) الكرة المعدنية معزولة ومتعادلة.', '(b) اسحب ساق المطاط المشحونة بالسالبة قرب الكرة دون أن تلمسها: تتنافر إلكترونات الكرة مع الساق وتتجه إلى الجهة البعيدة (شحنات طليقة) وتظهر شحنة موجبة في الجهة القريبة (شحنات مقيدة).', '(c) اسحب اليد لتلمس الكرة (أو اضغط «وصّل بالأرض»): تتسرب الشحنات الطليقة إلى الأرض.', '(d) ارفع الإصبع (اقطع الأرض) مع بقاء الساق قريبة: تبقى الشحنة المقيدة في موضعها.', '(e) أبعد الساق: تتوزع الشحنة الموجبة بانتظام على السطح الخارجي للكرة.'],
    concl: ['في الشحن بالحث يُشحن الجسم دون تماس، بشحنة مخالفة لشحنة الجسم المؤثر.', 'الشحنات الطليقة: الإلكترونات التي تُدفع إلى الجهة البعيدة وتتسرب إلى الأرض. الشحنات المقيدة: الشحنة المخالفة في الجهة القريبة.', 'يجب قطع الاتصال بالأرض قبل إبعاد الساق، وإلا عادت الكرة متعادلة.', 'شحنة الساق لا تتغير لأنها لم تلمس الكرة.'],
    laws: ['g9_rule'],
    controls: [SEL('rod', 'الساق المؤثرة', [['rubber', 'مطاط (−) كالكتاب'], ['glass', 'زجاج (+)']], 'rubber', (v, S) => { S.qi = v === 'glass' ? 6 : -6; }), SEL('gm', 'التأريض', [['finger', 'إصبع اليد'], ['wire', 'سلك موصول بالأرض']], 'finger', (v, S) => { S.gmode = v; }),
      BT('', [{ t: '⏚ وصّل/اقطع الأرض', on: S => { S.gnd = !S.gnd; } }, { t: '↺ أعد', on: S => D.reset(S) }]),
      SEL('show', 'عرض الشحنات', [['diff', 'الفائض فقط'], ['all', 'كل الشحنات'], ['none', 'لا شيء']], 'diff'), TG('lab', 'التسميات (طليقة/مقيدة)', true, null, 'labels'), TG('fl', 'حركة الإلكترونات', true, null, 'electron')],
    setup(S) { D.reset(S); },
    reset(S) { S.Q = 0; S.qi = S.p.rod === 'glass' ? 6 : -6; S.gnd = false; S.gmode = S.p.gm || 'finger'; S.rx = null; S._fly = []; S.touch = 0; S.hist = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, u = Q31.sc(w, h) * (ph ? .85 : 1.15), cx = Q31.cx(w), by = h * .8, R = 80 * u; return { w, h, ph, u, cx, by, R, sx: ph ? w * .3 : cx - 120 * u, sy: by - 150 * u - R }; },
    stage(S, g) { const f = Q31I.f(S, g); if (S.gnd) return 2; if (Math.abs(S.Q) > .3) return f > .15 ? 3 : 4; return f > .15 ? 1 : 0; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); if (S.rx == null) S.rx = g.sx + g.R + 260 * g.u; S.gmode = S.p.gm; S.touch = 0; Q31I.step(S, g, dt); if (S.p.fl === false) S._fly = []; S.hist = Math.max(S.hist, D.stage(S, g)); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), u = g.u; K.bg(ctx, w, h, { benchY: g.by }); if (S.rx == null) S.rx = g.sx + g.R + 260 * u;
      Q31I.drawApp(ctx, S, g, { mode: S.p.show, lab: S.p.lab });
      const st = D.stage(S, g); Q31.strip(ctx, w, g.ph ? h - 92 : 50, STG, st, '#ea580c');
      if (S.p.lab !== false) { const p = S.p_ || 0; if (Math.abs(p) > .4) { Q31.T(ctx, 'شحنات مقيدة', g.sx + g.R * .6, g.sy + g.R + 20, { s: 11, w: 900, c: '#fff', bg: p < 0 ? '#b91c1c' : '#1d4ed8' }); if (!S.gnd) Q31.T(ctx, 'شحنات طليقة', g.sx - g.R * .7, g.sy + g.R + 20, { s: 11, w: 900, c: '#fff', bg: p < 0 ? '#1d4ed8' : '#b91c1c' }); }
        Q31.T(ctx, 'كرة معدنية على حامل عازل', g.sx, g.by + 18, { s: 11, w: 800, c: '#fff', bg: '#334155' }); if (S.gnd) Q31.T(ctx, 'متصلة بالأرض ⏚', g.sx - g.R, g.sy - g.R - 30 * u, { s: 12, w: 900, c: '#fff', bg: '#15803d' }); }
      Q31.card(ctx, S, [{ t: 'شحنة الكرة الكلية: ' + (Math.abs(S.Q) < .3 ? '0 (متعادلة)' : (S.Q > 0 ? '+' : '−') + fmt(Math.abs(S.Q), 2)), c: S.Q > .3 ? '#b91c1c' : S.Q < -.3 ? '#1d4ed8' : '#334155', w: 900 }, { t: 'شحنة الساق: ' + (S.qi > 0 ? '+' : '−') + fmt(Math.abs(S.qi), 2) + ' (لم تتغير)' }], { title: 'العدّاد', y: g.ph ? 60 : 92, wd: 270 });
      Q31.banner(ctx, w, 'c — الشحن بطريقة الحث', '#ea580c');
    },
    drags(S) { if (!S.W || S.rx == null) return []; const g = D.geo(S), u = g.u; const gp = Q31I.gp(S, g);
      return [{ id: 'rod', x: S.rx + 110 * u, y: g.sy - 24 * u, w: 200 * u, h: 60 * u, axis: 'x', keep: true, tip: 'اسحب الساق نحو الكرة أو بعيداً عنها (دون لمس)', idle: 'قرّب الساق ✋', drag: (S, d) => { S.rx = clamp(d.ox - 110 * u + d.x - d.sx, g.sx + g.R + 14 * u, S.W - 40); } },
        { id: 'earth', x: g.sx - g.R * .25, y: g.sy - g.R - 50 * u, r: 34, tip: 'اضغط لتلمس الكرة بإصبعك (توصيل بالأرض) أو لرفعه', click: S => { S.gnd = !S.gnd; } }]; },
    readings(S) { const g = D.geo(S); return [rd('المرحلة', STG[D.stage(S, g)], 1), rd('شحنة الكرة', Math.abs(S.Q) < .3 ? '0' : (S.Q > 0 ? '+' : '−') + fmt(Math.abs(S.Q), 2)), rd('الاتصال بالأرض', S.gnd ? 'موصولة' : 'معزولة'), rd('شحنة الساق', (S.qi > 0 ? '+' : '−') + fmt(Math.abs(S.qi), 2))]; },
    explain(S) { const g = D.geo(S), st = D.stage(S, g), neg = S.qi < 0;
      return ['الكرة المعدنية متعادلة كهربائياً ومعزولة: عدد شحناتها الموجبة يساوي عدد السالبة.',
        neg ? 'شحنة الساق السالبة <b>تنافر</b> بعض إلكترونات سطح الكرة وتدفعها إلى الجهة البعيدة (<b>شحنات طليقة</b>)، فتظهر شحنة موجبة في الجهة القريبة (<b>شحنات مقيدة</b>). الكرة ما زالت متعادلة كلياً.' : 'شحنة الساق الموجبة <b>تجذب</b> إلكترونات الكرة إلى الجهة القريبة (مقيدة)، وتظهر شحنة موجبة في الجهة البعيدة (طليقة).',
        neg ? 'الكرة متصلة بالأرض: <b>تسربت الإلكترونات الطليقة إلى الأرض</b>، وبقيت الشحنة الموجبة المقيدة.' : 'الكرة متصلة بالأرض: <b>صعدت إلكترونات من الأرض</b> فعادلت الشحنة الموجبة الطليقة.',
        'قطعنا الاتصال بالأرض مع بقاء الساق قريبة: <b>بقيت الشحنة المقيدة في موضعها</b>.',
        'أبعدنا الساق: الشحنة (' + (S.Q > 0 ? 'الموجبة' : 'السالبة') + ') المخالفة لشحنة الساق <b>تتوزع بانتظام</b> على السطح الخارجي للكرة. شُحنت الكرة بالحث!'][st] + (st === 4 && Math.abs(S.Q) < .3 ? '' : ''); }
  };
  M8.P[D.id] = D;
})();
/* ---- E3 part 4: س5 — ساق الزجاج والكرة المعدنية في ثلاث حالات (ص 28) — same apparatus, three panels ---- */
(() => {
  const CS = [['a', 'a) الكرة معزولة والساق قريبة', { gnd: 0, touch: 0 }], ['b', 'b) الكرة موصولة بالأرض والساق قريبة', { gnd: 1, touch: 0 }], ['c', 'c) الساق تلامس الكرة المعزولة', { gnd: 0, touch: 1 }]];
  const ANS = { a: ['لا تنتقل شحنات بين الساق والكرة؛ تتحرك إلكترونات الكرة داخلها فقط نحو الساق (حث).', 'الجهة القريبة سالبة والبعيدة موجبة، والكرة متعادلة كلياً.', 'تبقى شحنة الساق كما هي.'], b: ['تنتقل إلكترونات من الأرض إلى الكرة عبر السلك (حث مع تأريض).', 'تظهر على الكرة شحنة سالبة (مقيدة) فقط.', 'تبقى شحنة الساق كما هي.'], c: ['تنتقل إلكترونات من الكرة إلى الساق بالتماس.', 'تُشحن الكرة بشحنة موجبة (من نوع شحنة الساق) تتوزع على سطحها.', 'تقل الشحنة الموجبة على الساق.'] };
  const D = { id: 'g9_chg_q5', page: 28, fig: 'س5 (الأشكال a، b، c)',
    desc: 'سؤال 5 من أسئلة الفصل: استعملت ساق من الزجاج مدلوكة بالحرير (شحنتها موجبة) وكرة معدنية معزولة متعادلة في ثلاث حالات. هل تنتقل شحنات؟ ما نوع الشحنات على الكرة؟ ماذا يحصل لشحنة الساق؟',
    tags: 'سؤال 5 حث تماس تأريض ساق زجاج كرة معدنية مقارنة',
    tools: ['ساق زجاج مدلوكة بالحرير', 'كرة معدنية معزولة', 'سلك أرضي'],
    steps: ['شاهد الحالات الثلاث جنباً إلى جنب على الجهاز نفسه.', 'اضغط على الحالة لتكبيرها وقراءة إجابتها، أو فعّل «أظهر الإجابات».', 'قارن: أين انتقلت الشحنات؟ ما نوعها على الكرة؟ ماذا حدث لشحنة الساق؟'],
    concl: ['(a) لا انتقال للشحنات بين الجسمين — توزيع فقط داخل الكرة (حث)، والكرة متعادلة كلياً.', '(b) تنتقل إلكترونات من الأرض إلى الكرة فتصبح سالبة (شحنة مخالفة للساق).', '(c) تنتقل إلكترونات من الكرة إلى الساق بالتماس فتصبح الكرة موجبة (مماثلة للساق) وتقل شحنة الساق.'],
    controls: [SEL('cs', 'الحالة المكبّرة', CS.map(c => [c[0], c[1]]), 'a'), TG('ans', 'أظهر الإجابات', true, null, 'labels'), SEL('show', 'عرض الشحنات', [['diff', 'الفائض فقط'], ['all', 'كل الشحنات']], 'diff')],
    setup(S) { S.st = CS.map(c => ({ Q: 0, qi: 6, gnd: !!c[2].gnd, touch: !!c[2].touch, contact: !!c[2].touch, Q0c: 0, rx: 0, _fly: [], p_: 0 })); },
    geo(S, i, big) { const w = S.W, h = S.H, ph = w < 600; const x0 = ph ? 8 : 70, cw = (w - x0 - 10) / 3; const u = Q31.sc(w, h) * (big ? .95 : .48); const by = big ? h * .62 : h * .92; const cx = big ? Q31.cx(w) - 110 * u : x0 + cw * (2 - i) + cw * .35; const R = 70 * u; return { w, h, u, by, R, sx: cx, sy: by - 110 * u - R, ph }; },
    update(S, dt) { if (!S.W) return; S.st.forEach((s, i) => { const g = D.geo(S, i, false); s.gmode = 'wire'; s.rx = g.sx + g.R + (s.touch ? 0 : 40 * g.u); Q31I.step(s, g, dt); }); },
    draw(ctx, w, h, S) {
      K.bg(ctx, w, h, { benchY: h * .92 }); const sel = CS.findIndex(c => c[0] === S.p.cs);
      // big view of selected case
      { const s = S.st[sel], g = D.geo(S, sel, true); const ss = Object.assign({}, s, { rx: g.sx + g.R + (s.touch ? 0 : 40 * g.u), _fly: [] }); ss.p_ = Q31I.KAP * ss.qi / 6 * Q31I.f(ss, g); ss.Q = s.Q; ss.qi = s.qi; Q31I.drawApp(ctx, ss, g, { mode: S.p.show });
        Q31.T(ctx, CS[sel][1], g.sx + 60 * g.u, g.sy - g.R - 40 * g.u, { s: 14, w: 900, c: '#fff', bg: '#ea580c' }); }
      // three thumbnails
      CS.forEach((c, i) => { const g = D.geo(S, i, false), s = S.st[i]; Q31.raw(ctx, () => { ctx.fillStyle = i === sel ? 'rgba(254,215,170,.6)' : 'rgba(255,255,255,.6)'; rr(ctx, g.sx - g.R * 2.2, g.sy - g.R - 46, g.R * 6.2, g.by - g.sy + g.R + 50, 10); ctx.fill(); ctx.strokeStyle = i === sel ? '#ea580c' : '#cbd5e1'; ctx.lineWidth = 2; ctx.stroke(); });
        Q31I.drawApp(ctx, s, g, { mode: 'diff', lab: false }); Q31.T(ctx, c[0], g.sx - g.R * 1.7, g.sy - g.R - 30, { s: 14, w: 900, c: '#fff', bg: '#ea580c' }); });
      if (S.p.ans !== false) { const A = ANS[S.p.cs]; Q31.card(ctx, S, [{ t: '1) ' + A[0] }, { t: '2) ' + A[1], c: '#1d4ed8' }, { t: '3) ' + A[2], c: '#b91c1c' }], { title: 'الإجابة — الحالة ' + S.p.cs, y: 50, wd: Math.min(420, w * .5), lh: 20 }); }
      Q31.banner(ctx, w, 'س5: ساق زجاج (+) وكرة معدنية — ثلاث حالات', '#ea580c');
    },
    drags(S) { if (!S.W) return []; return CS.map((c, i) => { const g = D.geo(S, i, false); return { id: 'case' + c[0], x: g.sx + g.R, y: g.sy, w: g.R * 6, h: g.R * 3, tip: 'اضغط لتكبير الحالة ' + c[0], click: S => setParam(S, 'cs', c[0]) }; }); },
    readings(S) { return CS.map((c, i) => rd('الحالة ' + c[0] + ': شحنة الكرة / الساق', (Math.abs(S.st[i].Q) < .3 ? '0' : (S.st[i].Q > 0 ? '+' : '−') + fmt(Math.abs(S.st[i].Q), 2)) + ' / +' + fmt(S.st[i].qi, 2), 1)); },
    explain(S) { const A = ANS[S.p.cs]; return '<b>' + CS.find(c => c[0] === S.p.cs)[1] + '</b><br>1) ' + A[0] + '<br>2) ' + A[1] + '<br>3) ' + A[2]; }
  };
  M8.P[D.id] = D;
})();
/* ---- E3 part 5: مقارنة الطرائق الثلاث جنباً إلى جنب (س4) ---- */
(() => {
  const D = { id: 'g9_chg_compare', page: 13, fig: 'س4 — مقارنة',
    desc: 'مقارنة طرائق شحن الأجسام بالكهربائية الساكنة الثلاث (الدلك، التماس، الحث) على المشهد نفسه وفي الوقت نفسه: هل يحدث تلامس؟ ما نوع الشحنة الناتجة مقارنة بالمؤثر؟ ما الذي ينتقل؟',
    tags: 'مقارنة طرائق الشحن دلك تماس حث سؤال 4',
    tools: ['بالون وصوف', 'ساق زجاج وكرة', 'ساق مطاط وكرة معدنية'],
    steps: ['اضغط «▶ شغّل المقارنة» وشاهد الطرائق الثلاث تحدث معاً خطوة بخطوة.', 'استعمل «الخطوة» لإيقافها عند أي مرحلة.', 'اقرأ جدول المقارنة أسفل المشهد.'],
    concl: ['الدلك: جسمان عازلان يتلامسان ويحتكان ⟸ شحنتان مختلفتان متساويتان.', 'التماس: الجسم يكتسب شحنة من نوع شحنة الجسم الملامس.', 'الحث: دون تماس، مع تأريض ⟸ شحنة مخالفة لشحنة المؤثر.', 'في جميع الطرائق تنتقل الإلكترونات فقط، والشحنة الكلية محفوظة.'],
    controls: [R('k', 'الخطوة', 0, 4, 0, 1, ''), BT('', [{ t: '▶ شغّل المقارنة', on: S => { S.play = 1; S.tt = 0; setParam(S, 'k', 0); } }]), TG('tab', 'جدول المقارنة', true, null, 'labels')],
    setup(S) { S.play = 0; S.tt = 0; },
    update(S, dt) { if (S.play) { S.tt += dt; const k = Math.min(4, Math.floor(S.tt / 1.6)); if (k !== S.p.k) setParam(S, 'k', k); if (S.tt > 8) S.play = 0; } },
    draw(ctx, w, h, S) {
      const ph = w < 600, x0 = ph ? 6 : 68, cw = (w - x0 - 8) / 3, u = clamp(cw / 260, .45, 1), k = S.p.k, top = ph ? 70 : 56, ph2 = h * (S.p.tab !== false ? .52 : .82); K.bg(ctx, w, h, { benchY: top + ph2 - 30, tiles: false });
      const titles = ['الدلك', 'التماس', 'الحث'];
      for (let i = 0; i < 3; i++) { const cx = x0 + cw * (2 - i) + cw / 2, cy = top + ph2 * .5; Q31.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.5)'; rr(ctx, cx - cw / 2 + 4, top, cw - 8, ph2, 12); ctx.fill(); ctx.strokeStyle = '#fdba74'; ctx.lineWidth = 2; ctx.stroke(); }); Q31.T(ctx, titles[i], cx, top + 16, { s: 14, w: 900, c: '#fff', bg: '#ea580c' });
        if (i === 0) { const n = [0, 2, 4, 4, 4][k], off = k >= 1 && k <= 2 ? Math.sin(S.t * 14) * 14 * u : 0; Q31.balloon(ctx, cx + 30 * u, cy, 44 * u, '#f97316'); Q31.cloth(ctx, cx - 40 * u + (k >= 3 ? -30 * u : 0) + off, cy + 10 * u, 'wool', u); for (let j = 0; j < n; j++) { Q31.sg(ctx, cx + 22 * u + (j % 2) * 16 * u, cy - 14 * u + (j >> 1) * 16 * u, -1, 5); Q31.sg(ctx, cx - 56 * u + (j % 2) * 16 * u + (k >= 3 ? -30 * u : 0), cy + 4 * u + (j >> 1) * 12 * u, 1, 5); } }
        if (i === 1) { const near = k >= 1, touch = k >= 2 && k < 4; const bx = cx - 30 * u, rx = touch ? bx + 22 * u : bx + 70 * u; Q31.raw(ctx, () => { ctx.strokeStyle = '#78716c'; ctx.beginPath(); ctx.moveTo(bx, top + 40); ctx.lineTo(bx, cy); ctx.stroke(); }); Q31.ball(ctx, bx, cy, 18 * u, k >= 2 ? 1 : 0); if (near) Q31.rod(ctx, rx, cy, rx + 110 * u, cy - 40 * u, 16 * u, 'glass', { n: k >= 2 ? 2 : 4, s: 1, from: .05, to: .5 }); }
        if (i === 2) { const near = k >= 1 && k <= 3, gnd = k === 2; const sx = cx - 30 * u, R = 34 * u; Q31.sphere(ctx, sx, cy, R, cy + 70 * u); const Q = k >= 2 ? 3 : 0, p = near ? -1.5 : 0; Q31.sphereCharges(ctx, sx, cy, R, Q / 2 - p * -1 * -1, Q / 2 + p * -1 * -1, 0, 'diff');
          if (near) Q31.rod(ctx, sx + R + 14 * u, cy, sx + R + 120 * u, cy - 40 * u, 16 * u, 'rubber', { n: 4, s: -1, from: .05, to: .5 }); if (gnd) { C2.hand(ctx, sx - 6, cy - R - 2, 1, .8 * u, { rot: -Math.PI / 2 - .2, sleeve: '#16a34a' }); } }
      }
      const tl = ['البداية: كل الأجسام متعادلة', 'الخطوة 1: دلك / تقريب الساق', 'الخطوة 2: انتقال الإلكترونات (تلامس أو تأريض)', 'الخطوة 3: فصل الجسمين / قطع الأرض', 'النتيجة النهائية'][k]; Q31.T(ctx, tl, Q31.cx(w), top + ph2 + 14, { s: 13, w: 900, c: '#fff', bg: '#0f766e' });
      if (S.p.tab !== false) { const ty = top + ph2 + 34, rows = [['', 'الدلك', 'التماس', 'الحث'], ['هل يحدث تلامس؟', 'نعم (احتكاك)', 'نعم', 'لا'], ['نوع الشحنة الناتجة', 'مختلفتان', 'مماثلة للملامس', 'مخالفة للمؤثر'], ['ما الذي ينتقل؟', 'إلكترونات', 'إلكترونات', 'إلكترونات (مع الأرض)'], ['المواد', 'عازلة غالباً', 'موصلة/عازلة', 'موصلة']];
        const rh = Math.min(30, (h - ty - 30) / rows.length); rows.forEach((r, j) => r.forEach((c, i) => { const cx = x0 + (w - x0 - 8) * (1 - (i + .5) / 4); Q31.raw(ctx, () => { ctx.fillStyle = j === 0 ? 'rgba(234,88,12,.85)' : j % 2 ? 'rgba(255,255,255,.92)' : 'rgba(255,237,213,.92)'; ctx.fillRect(cx - (w - x0 - 8) / 8, ty + j * rh, (w - x0 - 8) / 4 - 2, rh - 2); }); Q31.T(ctx, c, cx, ty + j * rh + rh / 2 - 1, { s: ph ? 9.5 : 12, w: j === 0 || i === 0 ? 900 : 700, c: j === 0 ? '#fff' : '#1e293b' }); })); }
      Q31.banner(ctx, w, 'مقارنة: طرائق الشحن الثلاث معاً (س4)', '#ea580c');
    },
    readings(S) { return [rd('الخطوة', String(S.p.k))]; },
    explain(S) { return 'س4: طرائق شحن الأجسام بالكهربائية الساكنة ثلاث: <b>الدلك</b> (الجسمان يُشحنان بشحنتين مختلفتين)، <b>التماس</b> (شحنة مماثلة لشحنة الجسم الملامس)، <b>الحث</b> (دون تماس، شحنة مخالفة لشحنة الجسم المؤثر). في كلها تنتقل <b>الإلكترونات</b> فقط.'; }
  };
  M8.P[D.id] = D;
})();
/* =============== E4 — الكشاف الكهربائي وشحنه (4-1، 5-1، ص 15–18، س1-8 س1-9 س2-3 س3 س6) =============== */
const Q31E = { // electroscope physics + rod handling shared by all electroscope parts
  KAP: .5,
  mk(o) { return Object.assign({ Q: 0, gnd: false, rq: 0, rod: 'glass', tip: null, ang: .06, tc: 0, _fly: [] }, o || {}); },
  geo(S, x, yb, s) { const R = 62 * s, cy = yb - 18 * s - R, dy = cy - R - 30 * s - 26 * s; return { x, yb, s, R, cy, discY: dy, piv: cy + R * .05 }; },
  f(E, G) { if (!E.tip || !E.rq) return 0; const d = Math.hypot(E.tip[0] - G.x, E.tip[1] - (G.discY - 4 * G.s)); return clamp(1 - (d - 24 * G.s) / (210 * G.s), 0, 1) ** 1.5; },
  touching(E, G) { return E.tip && Math.hypot(E.tip[0] - G.x, E.tip[1] - (G.discY - 4 * G.s)) < 30 * G.s; },
  step(E, G, dt, S) { const p = Q31E.KAP * E.rq * Q31E.f(E, G); E.p = p;
    if (E.gnd) { const tgt = -2 * p, dq = tgt - E.Q; if (Math.abs(dq) > .04) { const st = Math.sign(dq) * Math.min(Math.abs(dq), dt * 7); E.Q += st; E._acc = (E._acc || 0) + Math.abs(st); while (E._acc > .5) { E._acc -= .5; const a = [G.x - 16 * G.s, G.discY - 40 * G.s], b = [G.x - 4 * G.s, G.discY - 6 * G.s]; if (dq > 0) Q31.fly(E, b[0], b[1], a[0] - 40 * G.s, a[1] - 60 * G.s, .45); else Q31.fly(E, a[0] - 40 * G.s, a[1] - 60 * G.s, b[0], b[1], .45); } } }
    const t = Q31E.touching(E, G); if (t && !E.tc && Math.abs(E.rq) > .3) { const dq = E.rq * .45; E.Q += dq; E.rq -= dq; E.tc = 1; for (let k = 0; k < Math.min(5, Math.abs(Math.round(dq))); k++) { const a = [G.x, G.discY - 6 * G.s]; if (dq > 0) Q31.fly(E, a[0], a[1], E.tip[0] + 20, E.tip[1] - 10, .4); else Q31.fly(E, E.tip[0] + 20, E.tip[1] - 10, a[0], a[1], .4); } if (window.Sound && Sound.tick) Sound.tick(); } if (!t) E.tc = 0;
    E.leaf = E.Q / 2 + p; E.disc = E.Q / 2 - p; const ta = Q31.leafAng(E.leaf); E.ang += (ta - E.ang) * Math.min(1, dt * 6); },
  draw(ctx, E, G, o = {}) {
    Q31.scope(ctx, G.x, G.yb, G.s, E.ang, Object.assign({ qDisc: E.disc || 0, qLeaf: E.leaf || 0, mode: o.mode || 'diff' }, o));
    if (E.gnd) { C2.hand(ctx, G.x - 8 * G.s, G.discY - 10 * G.s, 1, 1.05 * G.s, { rot: -Math.PI / 2 - .35, sleeve: '#16a34a' }); Q31.T(ctx, 'إصبع على القرص (تأريض)', G.x - 70 * G.s, G.discY - 74 * G.s, { s: 10.5, w: 900, c: '#fff', bg: '#15803d' }); }
    if (E.tip && E.rodShow !== false) { const T = E.tip; Q31.rod(ctx, T[0], T[1], T[0] + 200 * G.s, T[1] - 80 * G.s, 17 * G.s, E.rod, o.mode !== 'none' && Math.abs(E.rq) > .3 ? { n: Math.min(7, Math.round(Math.abs(E.rq))), s: Math.sign(E.rq), from: .05, to: .55 } : null); C2.hand(ctx, T[0] + 192 * G.s, T[1] - 77 * G.s, -1, 1.05 * G.s, { rot: -.35, sleeve: '#64748b' }); }
    Q31.drawFly(ctx, E);
  },
  rodDrag(E, G, S, o = {}) { if (!E.tip) return null; return { id: o.id || 'rod', x: E.tip[0] + 90 * G.s, y: E.tip[1] - 36 * G.s, w: 160 * G.s, h: 60 * G.s, axis: 'xy', keep: true, tip: o.tip || 'اسحب الساق نحو قرص الكشاف (أو المسه)', idle: o.idle, hint: o.hint,
    drag: (S2, d) => { E.tip = [clamp(d.ox - 90 * G.s + d.x - d.sx, G.x - 40 * G.s, S.W - 60), clamp(d.oy + 36 * G.s + d.y - d.sy, 80, G.yb - 40)]; } }; },
  far(G, S) { return [Math.min(S.W - 230 * G.s, G.x + 230 * G.s), G.discY - 60 * G.s]; },
  sgn(q) { return Math.abs(q) < .3 ? '0' : (q > 0 ? '+' : '−') + fmt(Math.abs(q), 2); }
};
(() => {
  const PARTS = { disc: ['القرص المعدني (أو الكرة)', 'قرص معدني (أو كرة معدنية) يتصل بالطرف العلوي للساق، نلمسه أو نقرّب منه الجسم المراد فحصه.'], rod: ['الساق المعدنية', 'ساق مصنوعة من المعدن توصل الشحنة بين القرص والورقتين.'], leaves: ['الورقتان الرقيقتان', 'ورقتان رقيقتان (أو شريطان) من الذهب أو الألمنيوم تتصلان بالطرف السفلي للساق؛ تنفرجان عندما تُشحنان بالنوع نفسه.'], window: ['الصندوق ذو النافذة الزجاجية', 'صندوق من الزجاج أو المعدن أو الخشب ذو نافذة زجاجية يحمي الورقتين من تيارات الهواء ونرى من خلاله الانفراج.'], stopper: ['السداد العازل', 'سداد من الفلين أو المطاط في الجزء العلوي من الصندوق يعزل الساق والورقتين عن الصندوق.'] };
  const D = { id: 'g9_es_parts', page: 15, fig: 'الشكل 17',
    desc: 'الكشاف الكهربائي جهاز يستعمل في تجارب الكهربائية الساكنة للكشف عن وجود شحنة على جسم ما، ولمعرفة نوع الشحنة على الجسم المشحون. تصنع الكشافات بأشكال مختلفة.',
    tags: 'كشاف كهربائي أجزاء قرص ساق ورقتان ذهب ألمنيوم صندوق سداد عازل',
    tools: ['كشافات كهربائية بأشكال مختلفة'],
    steps: ['اختر شكل الكشاف (الشكل 17): ورقتان وقرص / ورقتان وكرة / ورقة واحدة على الساق.', 'اضغط على أي جزء في الرسم (أو اختره من «الجزء») لتعرف اسمه ووظيفته.', 'اضغط «جرّب: المس بجسم مشحون» لترى الغرض الأول: الكشف عن وجود الشحنة.'],
    concl: ['أجزاء الكشاف: ساق معدنية، قرص (أو كرة) معدني، ورقتان رقيقتان من الذهب أو الألمنيوم، صندوق ذو نافذة زجاجية، سداد عازل.', 'أغراضه: 1) الكشف عن وجود شحنة كهربائية على جسم. 2) معرفة نوع الشحنة على الجسم المشحون.'],
    controls: [SEL('st', 'شكل الكشاف', [['two', 'ورقتان + قرص'], ['ball', 'ورقتان + كرة'], ['one', 'ورقة واحدة على الساق (شكل 19)']], 'two'), SEL('hi', 'القطعة المختارة', Object.keys(PARTS).map(k => [k, PARTS[k][0]]), 'disc'),
      BT('', [{ t: '⚡ جرّب: المس بجسم مشحون', on: S => { S.E.Q = S.E.Q ? 0 : -4; } }]), TG('lab', 'أسماء الأجزاء', true, null, 'labels')],
    setup(S) { S.E = Q31E.mk(); },
    G(S) { const w = S.W, h = S.H, s = Q31.sc(w, h) * (w < 600 ? 1.15 : 1.9); return Q31E.geo(S, w < 600 ? w / 2 : Q31.cx(w) - 120 * s * .5, h * .9, s); },
    update(S, dt) { if (!S.W) return; Q31E.step(S.E, D.G(S), dt, S); },
    draw(ctx, w, h, S) {
      const G = D.G(S), p = S.p, s = G.s; K.bg(ctx, w, h, { benchY: h * .9 }); Q31.scope(ctx, G.x, G.yb, s, S.E.ang, { disc: p.st === 'ball' ? 'ball' : 'disc', one: p.st === 'one', qDisc: S.E.disc, qLeaf: S.E.leaf, hi: p.hi });
      if (p.lab !== false) { const L = [['disc', G.x + 70 * s, G.discY - 10 * s], ['rod', G.x + 60 * s, G.cy - G.R - 40 * s], ['stopper', G.x - 80 * s, G.cy - G.R - 8 * s], ['leaves', G.x + 80 * s, G.piv + 30 * s], ['window', G.x - 90 * s, G.cy + G.R * .7]];
        L.forEach(([k, x, y]) => { const on = p.hi === k; Q31.raw(ctx, () => { ctx.strokeStyle = on ? '#ca8a04' : '#94a3b8'; ctx.lineWidth = on ? 2.5 : 1.2; ctx.beginPath(); ctx.moveTo(x + (x > G.x ? -36 : 36), y); ctx.lineTo(k === 'window' ? G.x - G.R * .8 : k === 'stopper' ? G.x - 12 * s : k === 'disc' ? G.x + 22 * s : k === 'rod' ? G.x + 3 * s : G.x + 20 * s, k === 'leaves' ? G.piv + 30 * s : k === 'rod' ? G.cy - G.R - 40 * s : y); ctx.stroke(); }); Q31.T(ctx, PARTS[k][0], x, y, { s: on ? 13 : 11.5, w: 900, c: '#fff', bg: on ? '#ca8a04' : '#334155' }); }); }
      Q31.card(ctx, S, [{ t: PARTS[p.hi][1] }, { t: 'الأغراض: 1) الكشف عن وجود شحنة على جسم ما. 2) معرفة نوع الشحنة على الجسم المشحون.', c: '#0f766e', w: 800 }], { title: PARTS[p.hi][0], y: 50, wd: 330 });
      Q31.banner(ctx, w, 'الكشاف الكهربائي وأجزاؤه (الشكل 17)', '#0891b2');
    },
    drags(S) { if (!S.W) return []; const G = D.G(S), s = G.s; const B = (k, x, y, w, h) => Q31.btn('p_' + k, { x, y, w, h }, S => setParam(S, 'hi', k), { tip: 'اضغط: ' + PARTS[k][0] });
      return [B('disc', G.x, G.discY - 4 * s, 64 * s, 26 * s), B('stopper', G.x, G.cy - G.R - 6 * s, 30 * s, 22 * s), B('rod', G.x, G.cy - G.R - 34 * s, 16 * s, 26 * s), B('leaves', G.x, G.piv + 34 * s, 60 * s, 60 * s), B('window', G.x - G.R * .6, G.cy + G.R * .5, 40 * s, 40 * s)]; },
    readings(S) { return [rd('الجزء المختار', PARTS[S.p.hi][0], 1), rd('شحنة الكشاف', Q31E.sgn(S.E.Q)), rd('انفراج الورقتين', Math.round(S.E.ang * 2 * 57.3) + '°')]; },
    explain(S) { return '<b>' + PARTS[S.p.hi][0] + ':</b> ' + PARTS[S.p.hi][1] + (Math.abs(S.E.Q) > .3 ? '<br>الكشاف مشحون الآن فانفرجت ورقتاه: هذا دليل على وجود الشحنة.' : ''); }
  };
  M8.P[D.id] = D;
})();
/* ---- E4 part 2: نشاط (a) — شحن الكشاف بالتماس بالمشط (الشكل 18) ---- */
(() => {
  const D = { id: 'g9_es_contact', page: 16, fig: 'الشكل 18',
    desc: 'نشاط (a): شحن الكشاف الكهربائي بطريقة التماس (التوصيل). ندلك المشط بالشعر الجاف ثم نجعله يلامس قرص الكشاف المتعادل فتبتعد ورقتا الكشاف لاكتسابهما النوع نفسه من الشحنة (مماثلة لشحنة الجسم الملامس).',
    tags: 'نشاط شحن الكشاف بالتماس التوصيل مشط شعر انفراج الورقتين',
    tools: ['كشاف كهربائي', 'مشط من البلاستك'],
    steps: ['ادلك المشط بالشعر: اسحب المشط فوق الشعر ذهاباً وإياباً (بشرط أن يكون الشعر جافاً وبدون زيت).', 'اسحب المشط حتى يلامس قرص الكشاف المتعادل كهربائياً (الكشاف الأيمن).', 'لاحظ ابتعاد ورقتي الكشاف وقارنه بالكشاف المتعادل (الأيسر).', 'أبعد المشط: هل تبقى الورقتان منفرجتين؟'],
    concl: ['عند حصول التماس بين المشط المشحون وقرص الكشاف المتعادل تبتعد ورقتا الكشاف بسبب قوة تنافر بينهما.', 'اكتسبت الورقتان النوع نفسه من الشحنة (مماثلة لشحنة الجسم الملامس: سالبة).', 'تذكّر: الكشاف المشحون بطريقة التماس تنفرج ورقتاه لاكتسابهما شحنة مماثلة لشحنة الجسم الملامس.'],
    laws: ['g9_rule'],
    controls: [BT('', [{ t: '🧽 ادلك المشط', on: S => { S.auto = 1.2; } }, { t: '↺ أعد', on: S => D.reset(S) }]), SEL('show', 'عرض الشحنات', [['diff', 'الفائض فقط'], ['none', 'لا شيء']], 'diff'), TG('ref', 'كشاف متعادل للمقارنة', true, null, 'eye')],
    setup(S) { D.reset(S); },
    reset(S) { S.E = Q31E.mk({ rod: 'comb', rq: 0 }); S.E.tip = null; S.auto = 0; },
    G(S) { const w = S.W, h = S.H, ph = w < 600, s = Q31.sc(w, h) * (ph ? .9 : 1.25); return Q31E.geo(S, ph ? w * .62 : Q31.cx(w) + 40 * s, h * .88, s); },
    head(S) { const w = S.W, h = S.H; return [S.W < 600 ? 70 : 170, h * .26]; },
    update(S, dt) { if (!S.W) return; const G = D.G(S); if (!S.E.tip) S.E.tip = [G.x + 60 * G.s, G.discY - 150 * G.s];
      if (S.auto > 0) { S.auto -= dt; S._a = (S._a || 0) + dt; if (S._a > .12) { S._a = 0; S.E.rq = Math.max(-8, S.E.rq - 1); } } Q31E.step(S.E, G, dt, S); },
    draw(ctx, w, h, S) {
      const G = D.G(S), s = G.s, E = S.E; K.bg(ctx, w, h, { benchY: h * .88 }); if (!E.tip) E.tip = [G.x + 60 * s, G.discY - 150 * s];
      if (S.p.ref !== false && w >= 600) { Q31.scope(ctx, G.x - 230 * s, G.yb, s, .06, {}); Q31.T(ctx, 'كشاف متعادل كهربائياً', G.x - 230 * s, G.yb + 16, { s: 11, w: 800, c: '#fff', bg: '#334155' }); }
      const H = D.head(S); M8.P.g9_life_obs.hairHead(ctx, H[0], H[1], s * .9, { q: 0 }, null); Q31.T(ctx, 'شعر جاف — ادلك المشط هنا', H[0], H[1] + 80 * s, { s: 10.5, w: 800, c: '#fff', bg: '#7c2d12' });
      E.rodShow = false; Q31E.draw(ctx, E, G, { mode: S.p.show });
      const T = E.tip; Q31.rod(ctx, T[0], T[1] - 10 * s, T[0] + 120 * s, T[1] - 10 * s, 24 * s, 'comb', S.p.show !== 'none' && Math.abs(E.rq) > .3 ? { n: Math.min(8, Math.round(Math.abs(E.rq))), s: -1, from: .06, to: .5 } : null); C2.hand(ctx, T[0] + 136 * s, T[1] - 4 * s, -1, s);
      Q31.T(ctx, 'مشط بلاستيكي' + (E.rq < -.3 ? ' مشحون بالدلك (−)' : ''), T[0] + 60 * s, T[1] - 40 * s, { s: 11, w: 900, c: '#fff', bg: '#6d28d9' });
      Q31.T(ctx, Math.abs(E.Q) > .3 ? 'الكشاف مشحون (−): الورقتان منفرجتان' : 'كشاف متعادل', G.x, G.yb + 16, { s: 12, w: 900, c: '#fff', bg: Math.abs(E.Q) > .3 ? '#1d4ed8' : '#334155' });
      Q31.banner(ctx, w, 'نشاط (a): شحن الكشاف بطريقة التماس (التوصيل)', '#0891b2');
    },
    drags(S) { if (!S.W || !S.E.tip) return []; const G = D.G(S), s = G.s, E = S.E, H = D.head(S);
      return [{ id: 'comb', x: E.tip[0] + 60 * s, y: E.tip[1] - 10 * s, w: 140 * s, h: 44 * s, axis: 'xy', keep: true, tip: 'ادلك المشط بالشعر ثم المس به قرص الكشاف', idle: 'ادلك المشط بالشعر ✋',
        drag: (S, d) => { E.tip = [clamp(d.ox - 60 * s + d.x - d.sx, 40, S.W - 150 * s), clamp(d.oy + 10 * s + d.y - d.sy, 70, G.yb - 30)]; if (Q31.rub(S, d, Math.hypot(E.tip[0] + 60 * s - H[0], E.tip[1] - H[1]) < 80 * s, 30)) E.rq = Math.max(-8, E.rq - 1); } }]; },
    readings(S) { return [rd('شحنة المشط', Q31E.sgn(S.E.rq)), rd('شحنة الكشاف', Q31E.sgn(S.E.Q)), rd('انفراج الورقتين', Math.round(S.E.ang * 2 * 57.3) + '°')]; },
    explain(S) { const E = S.E; if (Math.abs(E.Q) > .3) return 'عند تماس المشط المشحون مع القرص انتقلت <b>إلكترونات من المشط إلى الكشاف</b>، فاكتسبت الورقتان النوع نفسه من الشحنة (<b>سالبة</b> مماثلة لشحنة المشط) فتنافرتا وابتعدتا. وتبقى منفرجتين بعد إبعاد المشط لأن الشحنة انتقلت فعلاً.'; if (E.rq < -.3) return 'المشط مشحون بالسالبة بعد دلكه بالشعر. المس به قرص الكشاف.' + (Q31E.f(E, D.G(S)) > .2 ? ' (لاحظ: مجرد تقريبه يفرج الورقتين قليلاً بالحث، لكنهما تنطبقان إذا أبعدته).' : ''); return 'ادلك المشط بالشعر الجاف أولاً.'; }
  };
  M8.P[D.id] = D;
})();
/* ---- E4 part 3: نشاط (b) — شحن الكشاف بالحث بساق الزجاج (الشكل 19 a–d) ---- */
(() => {
  const STG = ['19-a دلك الساق', '19-b تقريب الساق', '19-c التأريض', 'رفع الإصبع', '19-d إبعاد الساق'];
  const D = { id: 'g9_es_induct', page: 16, fig: 'الشكل 19 (a–d)',
    desc: 'نشاط (b): شحن الكشاف الكهربائي بطريقة الحث بساق زجاج مدلوكة بالحرير، كشاف بورقة ألمنيوم واحدة على ساقه كما في الشكل 19.',
    tags: 'نشاط شحن الكشاف بالحث ساق زجاج حرير ورقة ألمنيوم تأريض شحنة مقيدة طليقة',
    tools: ['كشاف كهربائي (ورقة ألمنيوم)', 'ساق من الزجاج', 'قطعة من الحرير'],
    steps: ['ادلك ساق الزجاج بقطعة الحرير: اسحب الحرير فوق الساق (تظهر على الساق شحنة موجبة) — الشكل 19-a.', 'قرّب الساق المشحونة من قرص الكشاف المتعادل (دون لمس): تتنافر ورقة الألمنيوم مع ساق الكشاف — الشكل 19-b.', 'صِل القرص بالأرض بوضع إصبعك عليه (اضغط اليد) مع بقاء الساق قريبة: تنطبق الورقة على الساق — الشكل 19-c.', 'ارفع إصبعك مع بقاء الساق قريبة: تبقى الورقة منطبقة.', 'أخيراً أبعد الساق: تتنافر الورقة مع ساق الكشاف — الشكل 19-d.'],
    concl: ['عند تقريب الساق الموجبة: ينشحن القرص بالسالبة (شحنة مقيدة) والورقة بالموجبة (شحنة طليقة).', 'دائماً ينشحن القرص بالشحنة المخالفة لشحنة المؤثر، والورقة والساق بالشحنة المشابهة.', 'عند التأريض يكتسب الكشاف إلكترونات من الأرض فتنطبق الورقة.', 'بعد قطع الأرض وإبعاد الساق تتوزع الشحنات الباقية (التي كانت مقيدة) على القرص والساق والورقة: الكشاف مشحون بالسالبة (مخالفة لشحنة الساق).'],
    laws: ['g9_rule'],
    controls: [BT('', [{ t: '🧽 ادلك الساق بالحرير', on: S => { S.auto = 1.2; } }, { t: '☝ إصبع على القرص / ارفعه', on: S => { S.E.gnd = !S.E.gnd; } }, { t: '↺ أعد', on: S => D.reset(S) }]),
      SEL('show', 'عرض الشحنات', [['diff', 'الفائض فقط'], ['none', 'لا شيء']], 'diff'), TG('lab', 'تسميات (مقيدة/طليقة)', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.E = Q31E.mk({ rod: 'glass', rq: 0 }); S.auto = 0; S.silk = null; S.hist = 0; },
    G(S) { const w = S.W, h = S.H, ph = w < 600, s = Q31.sc(w, h) * (ph ? .95 : 1.45); return Q31E.geo(S, ph ? w * .4 : Q31.cx(w) - 70 * s, h * .88, s); },
    stage(S, G) { const E = S.E, f = Q31E.f(E, G); if (Math.abs(E.rq) < .3) return 0; if (E.gnd) return 2; if (Math.abs(E.Q) > .3) return f > .12 ? 3 : 4; return 1; },
    update(S, dt) { if (!S.W) return; const G = D.G(S), E = S.E; if (!E.tip) E.tip = Q31E.far(G, S); if (!S.silk) S.silk = [E.tip[0] + 110 * G.s, E.tip[1] - 10 * G.s];
      if (S.auto > 0) { S.auto -= dt; S._a = (S._a || 0) + dt; S.silk = [E.tip[0] + 100 * G.s + Math.sin(S.t * 16) * 30 * G.s, E.tip[1] - 42 * G.s]; if (S._a > .12) { S._a = 0; E.rq = Math.min(7, E.rq + 1); } }
      Q31E.step(E, G, dt, S); S.hist = Math.max(S.hist, D.stage(S, G)); },
    draw(ctx, w, h, S) {
      const G = D.G(S), s = G.s, E = S.E; K.bg(ctx, w, h, { benchY: h * .88 }); if (!E.tip) E.tip = Q31E.far(G, S);
      Q31E.draw(ctx, E, G, { one: true, mode: S.p.show });
      if (S.silk) { Q31.cloth(ctx, S.silk[0], S.silk[1], 'silk', s * .85); if (S.p.show !== 'none' && E.rq > .3) for (let k = 0; k < Math.round(E.rq); k++) Q31.sg(ctx, S.silk[0] - 22 * s + k * 7 * s, S.silk[1] + 4, -1, 4.5); Q31.T(ctx, 'حرير', S.silk[0], S.silk[1] + 28 * s, { s: 10.5, w: 800, c: '#fff', bg: '#be185d' }); }
      if (S.p.lab !== false && Math.abs(E.p || 0) > .3 && !E.gnd) { Q31.T(ctx, 'القرص: شحنة مقيدة (−)', G.x - 110 * s, G.discY - 8 * s, { s: 11, w: 900, c: '#fff', bg: '#1d4ed8' }); Q31.T(ctx, 'الورقة: شحنة طليقة (+)', G.x + 110 * s, G.piv + 50 * s, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' }); }
      const st = D.stage(S, G); Q31.strip(ctx, w, w < 600 ? h - 92 : 50, STG, st, '#0891b2');
      Q31.card(ctx, S, [{ t: 'شحنة الساق: ' + Q31E.sgn(E.rq) }, { t: 'شحنة الكشاف: ' + Q31E.sgn(E.Q), w: 900, c: E.Q < -.3 ? '#1d4ed8' : '#334155' }, { t: 'الورقة: ' + (E.ang > .2 ? 'متنافرة مع الساق' : 'منطبقة على الساق') }], { title: 'العدّاد', y: w < 600 ? 58 : 92, wd: 240 });
      Q31.banner(ctx, w, 'نشاط (b): شحن الكشاف بطريقة الحث', '#0891b2');
    },
    drags(S) { if (!S.W || !S.E.tip) return []; const G = D.G(S), s = G.s, E = S.E; const L = [Q31E.rodDrag(E, G, S, { idle: 'قرّب الساق ✋', hint: Math.abs(E.rq) > .3 }), { id: 'finger', x: G.x, y: G.discY - 34 * s, r: 30 * s, tip: 'اضغط لتضع إصبعك على القرص (تأريض) أو ترفعه', click: S => { E.gnd = !E.gnd; } }];
      if (S.silk) L.push({ id: 'silk', x: S.silk[0], y: S.silk[1], r: 32 * s, axis: 'xy', keep: true, tip: 'ادلك الساق بالحرير', idle: 'ادلك الساق بالحرير ✋', drag: (S2, d) => { S.silk = [clamp(d.ox + d.x - d.sx, 40, S.W - 30), clamp(d.oy + d.y - d.sy, 60, G.yb)]; const mx = E.tip[0] + 100 * s, my = E.tip[1] - 40 * s; if (Q31.rub(S, d, Math.hypot(S.silk[0] - mx, S.silk[1] - my) < 90 * s, 30)) E.rq = Math.min(7, E.rq + 1); } });
      return L; },
    readings(S) { const G = D.G(S); return [rd('المرحلة', STG[D.stage(S, G)], 1), rd('شحنة الساق', Q31E.sgn(S.E.rq)), rd('شحنة الكشاف', Q31E.sgn(S.E.Q)), rd('القرص متصل بالأرض', S.E.gnd ? 'نعم' : 'لا')]; },
    explain(S) { const G = D.G(S), st = D.stage(S, G); return ['ادلك ساق الزجاج بالحرير: تفقد الساق إلكترونات للحرير فتظهر عليها <b>شحنة موجبة</b>.', 'الساق الموجبة تجذب إلكترونات الكشاف إلى القرص: <b>القرص سالب (شحنة مقيدة)</b>، و<b>الورقة والساق موجبتان (شحنة طليقة)</b> فتتنافر الورقة مع ساق الكشاف. دليل على أن الكشاف صار مشحوناً (بالحث).', 'وصلنا القرص بالأرض: <b>اكتسب الكشاف إلكترونات من الأرض</b> فعادلت الشحنة الموجبة الطليقة، فانطبقت الورقة على الساق.', 'قطعنا الاتصال بالأرض مع بقاء الساق قريبة: <b>بقيت الورقة منطبقة</b> لأن الشحنة السالبة ما زالت مقيدة في القرص.', 'أبعدنا الساق: <b>توزعت الشحنات الباقية (التي كانت مقيدة)</b> على القرص والساق والورقة، فتنافرت الورقة مع الساق. الكشاف مشحون بالسالبة — مخالفة لشحنة الساق.'][st]; }
  };
  M8.P[D.id] = D;
})();
/* ---- E4 part 4: مختبر الكشاف — أسئلة الكتاب على الجهاز نفسه ---- */
(() => {
  const PR = { free: ['حر', 0, 'glass', 'جرّب بنفسك: اختر الساق، قرّبها، المس القرص، أرّض بإصبعك.'],
    q18: ['س1-8: جسم موجب قرب كشاف موجب', 4, 'glass', 'الكشاف مشحون بالموجبة. قرّب الساق الموجبة من قرصه ولاحظ الانفراج. الجواب: (a) ازدياد مقدار انفراج الورقتين.'],
    q19: ['س1-9: جسم سالب قرب كشاف متصل بالأرض', 0, 'rubber', 'الكشاف متصل بالأرض. قرّب الساق السالبة. الجواب: (c) تبقى الورقتان منطبقتين رغم ظهور شحنة موجبة على القرص.', 1],
    q23: ['س2-3: جسم سالب قرب كشاف سالب', -4, 'rubber', 'علّل: يزداد انفراج ورقتي الكشاف السالب عند تقريب جسم سالب: لأن الجسم السالب يدفع مزيداً من الإلكترونات من القرص إلى الورقتين فتزداد شحنتهما السالبة.'],
    q3a: ['س3-a: شحن الكشاف بالموجبة بساق زجاج', 0, 'glass', 'الطريقة: المس القرص بساق الزجاج الموجبة (تماس) ⟸ تنتقل إلكترونات من الكشاف إلى الساق ⟸ الكشاف موجب.'],
    q3b: ['س3-b: شحن الكشاف بالموجبة بساق مطاط', 0, 'rubber', 'الطريقة: الحث — قرّب ساق المطاط السالبة، أرّض القرص بإصبعك، ارفع الإصبع، ثم أبعد الساق ⟸ الكشاف موجب.'],
    q6: ['س6: الطالب الذي أخطأ الترتيب', 0, 'glass', 'نفّذ خطوات الطالب: قرّب الساق، المس القرص، أبعد الساق، ثم ارفع إصبعك. النتيجة: كشاف غير مشحون! التفسير: عندما أبعد الساق والإصبع ما زال على القرص عادت الإلكترونات إلى الأرض فتعادل الكشاف.'],
    type: ['الغرض 2: معرفة نوع شحنة جسم مجهول', -4, 'unknown', 'الكشاف مشحون بشحنة سالبة معروفة. قرّب الجسم المجهول: إذا ازداد الانفراج فشحنته مشابهة (سالبة)، وإذا نقص فمخالفة (موجبة).'] };
  const D = { id: 'g9_es_lab', page: 18, fig: 'تذكّر + الأسئلة',
    desc: 'مختبر الكشاف: الجهاز نفسه لكل أسئلة الكتاب عن الكشاف (س1-8، س1-9، س2-3، س3، س6) ولاستعماله في معرفة نوع شحنة جسم.',
    tags: 'كشاف أسئلة انفراج انطباق تأريض نوع الشحنة سؤال 8 سؤال 9 سؤال 6',
    tools: ['كشاف كهربائي', 'ساق زجاج (+)', 'ساق مطاط (−)', 'إصبع للتأريض'],
    steps: ['اختر السؤال من «حالة الكتاب»: يُحضَّر الكشاف والساق كما في السؤال.', 'نفّذ: اسحب الساق نحو القرص (أو المسه)، اضغط القرص لتضع إصبعك (تأريض) أو ترفعه.', 'لاحظ انفراج الورقتين وتوزّع الشحنات، ثم اقرأ الجواب في البطاقة.'],
    concl: ['جسم مشحون قرب كشاف مشحون بالنوع نفسه ⟸ يزداد الانفراج؛ وبنوع مخالف ⟸ يقل الانفراج.', 'كشاف متصل بالأرض لا تنفرج ورقتاه مهما قرّبنا منه، لكن تظهر على قرصه شحنة مخالفة.', 'للشحن بالحث يجب رفع الإصبع قبل إبعاد الساق.', 'التأريض يعادل شحنة الجسم لأن الأرض مستودع كبير تنتقل منه وإليه الشحنات بسهولة.'],
    laws: ['g9_rule'],
    controls: [SEL('pr', 'حالة الكتاب', Object.keys(PR).map(k => [k, PR[k][0]]), 'q18', (v, S) => D.load(S)), SEL('rd', 'الساق', [['glass', 'زجاج (+)'], ['rubber', 'مطاط (−)']], 'glass', (v, S, init) => { if (!init && S.E) { S.E.rod = v; S.E.rq = v === 'glass' ? 6 : -6; } }),
      BT('', [{ t: '☝ إصبع على القرص / ارفعه', on: S => { S.E.gnd = !S.E.gnd; } }, { t: '↺ حضّر الحالة', on: S => D.load(S) }]), SEL('show', 'عرض الشحنات', [['diff', 'الفائض فقط'], ['all', 'كل الشحنات'], ['none', 'لا شيء']], 'diff'), TG('ans', 'بطاقة السؤال والجواب', true, null, 'labels')],
    setup(S) { D.load(S); },
    load(S) { const P = PR[S.p.pr || 'q18']; let rod = P[2], rq; if (rod === 'unknown') { rq = Math.random() < .5 ? 6 : -6; rod = 'amber'; } else rq = rod === 'glass' ? 6 : -6; S.E = Q31E.mk({ Q: P[1], rod, rq, gnd: !!P[4] }); S.E.tip = null; S.unk = P[2] === 'unknown' ? rq : 0; S.ang0 = null; },
    G(S) { const w = S.W, h = S.H, ph = w < 600, s = Q31.sc(w, h) * (ph ? .95 : 1.4); return Q31E.geo(S, ph ? w * .4 : Q31.cx(w) - 110 * s, h * .88, s); },
    update(S, dt) { if (!S.W) return; const G = D.G(S); if (!S.E.tip) S.E.tip = Q31E.far(G, S); Q31E.step(S.E, G, dt, S); if (S.ang0 == null && S.t > .2) S.ang0 = S.E.ang; },
    draw(ctx, w, h, S) {
      const G = D.G(S), s = G.s, E = S.E; K.bg(ctx, w, h, { benchY: h * .88 }); if (!E.tip) E.tip = Q31E.far(G, S);
      Q31E.draw(ctx, E, G, { mode: S.p.show });
      if (S.unk) Q31.T(ctx, 'جسم مجهول الشحنة ؟', E.tip[0] + 110 * s, E.tip[1] - 70 * s, { s: 12, w: 900, c: '#fff', bg: '#a16207' });
      const d = S.ang0 != null ? E.ang - S.ang0 : 0; const tr = Math.abs(d) < .02 ? 'الانفراج لم يتغير' : d > 0 ? 'الانفراج يزداد ↑' : 'الانفراج يقل ↓';
      Q31.T(ctx, 'انفراج الورقتين: ' + Math.round(E.ang * 2 * 57.3) + '° — ' + tr, G.x, G.yb + 16, { s: 12, w: 900, c: '#fff', bg: '#0e7490' });
      if (S.p.ans !== false) { const P = PR[S.p.pr]; Q31.card(ctx, S, [{ t: P[0], w: 900, c: '#0e7490' }, { t: P[3] }, { t: 'شحنة الكشاف: ' + Q31E.sgn(E.Q) + ' ، القرص: ' + Q31E.sgn(E.disc) + ' ، الورقتان: ' + Q31E.sgn(E.leaf), c: '#334155' }].concat(S.unk && Math.abs(d) > .05 ? [{ t: 'الجسم المجهول شحنته ' + (d > 0 ? 'سالبة (مشابهة)' : 'موجبة (مخالفة)') + ' ✓', c: '#15803d', w: 900 }] : []), { title: 'حالة الكتاب', y: 46, wd: 360 }); }
      Q31.banner(ctx, w, 'مختبر الكشاف: أسئلة الكتاب على الجهاز نفسه', '#0891b2');
    },
    drags(S) { if (!S.W || !S.E.tip) return []; const G = D.G(S), E = S.E; return [Q31E.rodDrag(E, G, S, { idle: 'قرّب الساق ✋' }), { id: 'finger', x: G.x, y: G.discY - 34 * G.s, r: 30 * G.s, tip: 'اضغط لتضع إصبعك على القرص أو ترفعه', click: S => { E.gnd = !E.gnd; } }]; },
    readings(S) { const E = S.E; return [rd('شحنة الكشاف الكلية', Q31E.sgn(E.Q)), rd('شحنة القرص', Q31E.sgn(E.disc)), rd('شحنة الورقتين', Q31E.sgn(E.leaf)), rd('الانفراج', Math.round(E.ang * 2 * 57.3) + '°'), rd('متصل بالأرض', E.gnd ? 'نعم' : 'لا')]; },
    explain(S) { const E = S.E, p = E.p || 0; let t = PR[S.p.pr][3]; if (Math.abs(p) > .3) t += '<br>الساق القريبة ' + (E.rq > 0 ? 'الموجبة تجذب الإلكترونات إلى القرص' : 'السالبة تدفع الإلكترونات من القرص إلى الورقتين') + (E.gnd ? '، والأرض تعطي/تأخذ إلكترونات فتبقى الورقتان منطبقتين.' : '.'); return t; }
  };
  M8.P[D.id] = D;
})();
/* ---- E4 part 5: «تذكّر» — مقارنة الكشاف المشحون بالتماس والمشحون بالحث (ص 18) ---- */
(() => {
  const D = { id: 'g9_es_compare', page: 18, fig: 'تذكّر (ص 18)',
    desc: 'تذكّر: الكشاف المشحون بطريقة التماس تنفرج ورقتاه لاكتسابهما شحنة مماثلة لشحنة الجسم الملامس، والكشاف المشحون بالحث تنفرج ورقتاه لاكتسابهما شحنة مخالفة لشحنة الجسم المقرب. نشاهد الحالتين جنباً إلى جنب بالمشط السالب نفسه.',
    tags: 'تذكر مقارنة تماس حث كشاف مماثلة مخالفة',
    tools: ['كشافان', 'مشطان مشحونان بالسالبة'],
    steps: ['اضغط «▶ شغّل» لتنفيذ الطريقتين معاً خطوة بخطوة.', 'لاحظ نوع الشحنة النهائية على كل كشاف.'],
    concl: ['التماس ⟸ شحنة مماثلة للجسم الملامس (المشط سالب ⟸ الكشاف سالب).', 'الحث ⟸ شحنة مخالفة للجسم المقرب (المشط سالب ⟸ الكشاف موجب).'],
    controls: [BT('', [{ t: '▶ شغّل', on: S => D.reset(S, 1) }, { t: '↺ أعد', on: S => D.reset(S, 0) }]), SEL('show', 'عرض الشحنات', [['diff', 'الفائض فقط'], ['none', 'لا شيء']], 'diff')],
    setup(S) { D.reset(S, 1); },
    reset(S, pl) { S.A = Q31E.mk({ rod: 'comb', rq: -6 }); S.B = Q31E.mk({ rod: 'comb', rq: -6 }); S.A.tip = null; S.B.tip = null; S.tt = 0; S.play = pl; },
    G(S, i) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 0 : 64, cw = (w - x0) / 2, s = Q31.sc(w, h) * (ph ? .62 : 1); return Q31E.geo(S, x0 + cw * (1 - i) + cw * .38, h * .82, s); },
    update(S, dt) { if (!S.W) return; const A = S.A, B = S.B, GA = D.G(S, 0), GB = D.G(S, 1); const far = G => [G.x + 140 * G.s, G.discY - 110 * G.s], near = G => [G.x + 34 * G.s, G.discY - 30 * G.s], touch = G => [G.x + 6 * G.s, G.discY - 6 * G.s];
      if (!A.tip) { A.tip = far(GA); B.tip = far(GB); } if (S.play) S.tt += dt; const t = S.tt; const mv = (E, P) => { E.tip = [E.tip[0] + (P[0] - E.tip[0]) * Math.min(1, dt * 4), E.tip[1] + (P[1] - E.tip[1]) * Math.min(1, dt * 4)]; };
      mv(A, t < 1 ? far(GA) : t < 3 ? touch(GA) : far(GA));
      mv(B, t < 1 ? far(GB) : t < 5.5 ? near(GB) : far(GB)); B.gnd = t > 2.5 && t < 4.5;
      Q31E.step(A, GA, dt, S); Q31E.step(B, GB, dt, S); },
    draw(ctx, w, h, S) {
      K.bg(ctx, w, h, { benchY: h * .82 }); const t = S.tt;
      [[S.A, 0, 'بالتماس'], [S.B, 1, 'بالحث']].forEach(([E, i, n]) => { const G = D.G(S, i); if (!E.tip) return; E.rodShow = false; Q31E.draw(ctx, E, G, { mode: S.p.show }); Q31.rod(ctx, E.tip[0], E.tip[1], E.tip[0] + 110 * G.s, E.tip[1] - 30 * G.s, 20 * G.s, 'comb', S.p.show !== 'none' ? { n: Math.min(6, Math.round(Math.abs(E.rq))), s: -1, from: .05, to: .5 } : null);
        Q31.T(ctx, 'الشحن ' + n, G.x, 78, { s: 15, w: 900, c: '#fff', bg: i ? '#7c3aed' : '#0891b2' });
        const fin = t > 6.2; if (fin) Q31.T(ctx, 'النتيجة: الكشاف ' + (E.Q < 0 ? 'سالب — مماثلة للمشط' : 'موجب — مخالفة للمشط'), G.x, G.yb + 18, { s: 12.5, w: 900, c: '#fff', bg: E.Q < 0 ? '#1d4ed8' : '#b91c1c' }); });
      const msg = t < 1 ? 'المشطان مشحونان بالسالبة' : t < 2.5 ? 'التماس: المشط يلمس القرص — الحث: المشط قريب فقط' : t < 4.5 ? 'الحث: نؤرّض القرص بالإصبع مع بقاء المشط قريباً' : t < 5.5 ? 'الحث: نرفع الإصبع أولاً' : 'نبعد المشطين';
      Q31.T(ctx, msg, Q31.cx(w), h * .9 + 10, { s: 12.5, w: 900, c: '#fff', bg: '#0f766e' });
      Q31.banner(ctx, w, 'تذكّر: التماس ⟸ شحنة مماثلة ، الحث ⟸ شحنة مخالفة', '#ca8a04');
    },
    readings(S) { return [rd('كشاف التماس', Q31E.sgn(S.A.Q)), rd('كشاف الحث', Q31E.sgn(S.B.Q))]; },
    explain(S) { return 'المشط نفسه (سالب) شحن الكشاف الأول <b>بالتماس</b> فصار <b>سالباً (مماثلاً)</b>، وشحن الكشاف الثاني <b>بالحث</b> فصار <b>موجباً (مخالفاً)</b>. في الحالتين تنفرج الورقتان لأنهما تحملان النوع نفسه من الشحنة.'; }
  };
  M8.P[D.id] = D;
})();
/* =============== E5 — تطبيقات الكهربائية الساكنة واختلاف المواد في التوصيل (6-1، 7-1، ص 18–20، س2) =============== */
(() => {
  const D = { id: 'g9_app_spray', page: 18, fig: 'الشكل 20',
    desc: 'المرذاذ (جهاز صبغ السيارات أو الكرسي): توصل فوهة المرذاذ بالقطب الموجب للمصدر فتخرج قطيرات الصبغ مشحونة بشحنة موجبة فتتباعد عن بعضها بسبب التنافر، ويوصل الجسم المراد صبغه بالقطب السالب أو بالأرض فتنجذب القطيرات إلى سطحه فيكون الصبغ متجانساً وجيداً.',
    tags: 'مرذاذ صبغ سيارات كرسي قطيرات مشحونة تنافر تجاذب تطبيقات',
    tools: ['مرذاذ صبغ', 'مصدر كهربائي', 'كرسي معدني أو سيارة'],
    steps: ['اضغط على زناد المرذاذ (اضغط المرذاذ أو «رشّ») لتخرج القطيرات.', 'لاحظ: القطيرات الموجبة تتباعد عن بعضها، وتنجذب إلى الكرسي الموصول بالقطب السالب/الأرض، حتى إلى ظهره.', 'افصل الشحن (أيقونة «وصل المرذاذ بالمصدر») وكرّر: قارن نسبة الصبغ الضائع وتجانس الطلاء.', 'اسحب المرذاذ لتغيير موضعه.'],
    concl: ['القطيرات المتشابهة الشحنة تتنافر فتنتشر بانتظام.', 'الجسم الموصل الموصول بالقطب السالب أو بالأرض يجذب القطيرات فيكون الصبغ متجانساً، ويقل الصبغ الضائع.'],
    laws: ['g9_rule'],
    controls: [SEL('obj', 'الجسم المراد صبغه', [['chair', 'كرسي (الشكل 20)'], ['car', 'باب سيارة']], 'chair', (v, S) => D.clear(S)), TG('on', 'وصل المرذاذ بالمصدر (شحن القطيرات)', true, (v, S) => D.clear(S), 'charges'), TG('spray', 'رشّ مستمر', true, null, 'wave'), TG('fl', 'خطوط المجال', false, null, 'efield'), BT('', [{ t: '🧽 امسح الطلاء', on: S => D.clear(S) }])],
    setup(S) { D.clear(S); S.gun = null; },
    clear(S) { S.d = []; S.hit = []; S.n = 0; S.ok = 0; S.back = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, u = Q31.sc(w, h) * (ph ? .9 : 1.2), cx = Q31.cx(w), by = h * .82; return { w, h, ph, u, cx, by, ox: ph ? w * .7 : cx + 150 * u, oy: by - 150 * u }; },
    shapes(S, g) { const u = g.u, x = g.ox, y = g.oy; if (S.p.obj === 'car') return [[x - 30 * u, y - 110 * u, 60 * u, 200 * u]]; return [[x - 70 * u, y - 10 * u, 120 * u, 14 * u], [x + 40 * u, y - 130 * u, 14 * u, 134 * u], [x - 66 * u, y + 4 * u, 8 * u, 120 * u], [x + 40 * u, y + 4 * u, 8 * u, 120 * u]]; },
    inS(S, g, x, y) { return D.shapes(S, g).some(r => x >= r[0] && x <= r[0] + r[2] && y >= r[1] && y <= r[1] + r[3]); },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), u = g.u; dt = Math.min(dt, .03); if (!S.gun) S.gun = [g.ph ? 60 : 130, g.oy - 30 * u]; const on = S.p.on !== false;
      if (S.p.spray !== false || S.burst > 0) { S.burst = (S.burst || 0) - dt; for (let k = 0; k < 2; k++) if (S.d.length < 160) { const a = (Math.random() - .5) * (on ? .5 : .3); S.d.push({ x: S.gun[0] + 50 * u, y: S.gun[1], vx: Math.cos(a) * 260 * u, vy: Math.sin(a) * 260 * u, t: 0 }); } }
      const cx = g.ox, cy = g.oy - 30 * u;
      S.d.forEach(p => { p.t += dt; let ax = 0, ay = 30 * u; if (on) { const dx = cx - p.x, dy = cy - p.y, d = Math.hypot(dx, dy) + 20; ax += dx / d * 52000 * u / d; ay += dy / d * 52000 * u / d; }
        p.vx += ax * dt; p.vy += ay * dt; p.vx *= .995; p.vy *= .995; p.x += p.vx * dt; p.y += p.vy * dt;
        if (D.inS(S, g, p.x, p.y)) { p.dead = 1; S.n++; S.ok++; if (p.x > cx + 10 * u) S.back++; if (S.hit.length < 900) S.hit.push([p.x, p.y]); } else if (p.x > g.w + 10 || p.y > g.by || p.y < 0 || p.t > 4) { p.dead = 1; S.n++; } });
      if (on && S.d.length < 220) { for (let i = 0; i < S.d.length; i += 2) for (let j = i + 1; j < Math.min(S.d.length, i + 12); j++) { const a = S.d[i], b = S.d[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy + 40; if (d2 < 3600) { const f = 900 * dt / d2 * u; a.vx += dx * f; a.vy += dy * f; b.vx -= dx * f; b.vy -= dy * f; } } }
      S.d = S.d.filter(p => !p.dead); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), u = g.u, on = S.p.on !== false; K.bg(ctx, w, h, { benchY: g.by }); if (!S.gun) S.gun = [g.ph ? 60 : 130, g.oy - 30 * u];
      if (S.p.fl && on) Q31.raw(ctx, () => { ctx.strokeStyle = 'rgba(234,88,12,.35)'; ctx.lineWidth = 1.2; for (let k = -4; k <= 4; k++) { ctx.beginPath(); ctx.moveTo(S.gun[0] + 50 * u, S.gun[1]); ctx.quadraticCurveTo((S.gun[0] + g.ox) / 2, S.gun[1] + k * 50 * u, g.ox - 20 * u + (Math.abs(k) > 2 ? 60 * u : 0), g.oy - 30 * u + k * 22 * u); ctx.stroke(); } });
      // object
      Q31.raw(ctx, () => { const mg = (x, y, ww, hh) => { const gg = ctx.createLinearGradient(x, 0, x + ww, 0); gg.addColorStop(0, '#94a3b8'); gg.addColorStop(.5, '#e2e8f0'); gg.addColorStop(1, '#64748b'); ctx.fillStyle = gg; ctx.fillRect(x, y, ww, hh); };
        if (S.p.obj === 'car') { const r = D.shapes(S, g)[0]; mg(r[0], r[1], r[2], r[3]); ctx.strokeStyle = '#475569'; ctx.strokeRect(r[0], r[1], r[2], r[3]); ctx.fillStyle = '#334155'; ctx.fillRect(r[0] + 6 * u, r[1] + 90 * u, 10 * u, 22 * u); } else D.shapes(S, g).forEach(r => mg(r[0], r[1], r[2], r[3]));
        ctx.fillStyle = '#e11d48'; S.hit.forEach(q => { ctx.beginPath(); ctx.arc(q[0], q[1], 2.6, 0, TAU); ctx.fill(); });
        // wires: chair to − / earth, gun to +
        ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(g.ox + 44 * u, g.oy + 120 * u); ctx.lineTo(g.ox + 44 * u, g.by + 20); ctx.lineTo((S.gun[0] + g.ox) / 2 + 30, g.by + 20); ctx.stroke();
        if (on) { ctx.strokeStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(S.gun[0] - 10 * u, S.gun[1] + 40 * u); ctx.lineTo(S.gun[0] - 10 * u, g.by + 20); ctx.lineTo((S.gun[0] + g.ox) / 2 - 30, g.by + 20); ctx.stroke(); }
        const bx = (S.gun[0] + g.ox) / 2; ctx.fillStyle = '#1f2937'; rr(ctx, bx - 40, g.by + 4, 80, 34, 6); ctx.fill(); });
      Q31.sg(ctx, (S.gun[0] + g.ox) / 2 - 22, g.by + 21, 1, 8); Q31.sg(ctx, (S.gun[0] + g.ox) / 2 + 22, g.by + 21, -1, 8); Q31.earth(ctx, g.ox + 44 * u, g.by + 26);
      // spray gun
      Q31.raw(ctx, () => { const x = S.gun[0], y = S.gun[1]; ctx.fillStyle = '#1e40af'; rr(ctx, x - 20 * u, y - 14 * u, 70 * u, 28 * u, 8); ctx.fill(); ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.moveTo(x - 10 * u, y + 10 * u); ctx.lineTo(x + 10 * u, y + 10 * u); ctx.lineTo(x + 4 * u, y + 50 * u); ctx.lineTo(x - 14 * u, y + 50 * u); ctx.fill(); ctx.fillStyle = '#d4d4d8'; ctx.fillRect(x + 46 * u, y - 5 * u, 10 * u, 10 * u); ctx.fillStyle = '#e5e7eb'; rr(ctx, x - 12 * u, y - 52 * u, 34 * u, 40 * u, 6); ctx.fill(); ctx.fillStyle = '#e11d48'; ctx.fillRect(x - 10 * u, y - 36 * u, 30 * u, 22 * u); });
      S.d.forEach((p, i) => { Q31.raw(ctx, () => { ctx.fillStyle = '#e11d48'; ctx.beginPath(); ctx.arc(p.x, p.y, 3.2, 0, TAU); ctx.fill(); }); if (on && i % 4 === 0) Q31.sg(ctx, p.x, p.y - 7, 1, 3.6); });
      if (S.p.lab !== false) { Q31.T(ctx, 'المرذاذ: فوهته موصولة بالقطب الموجب', S.gun[0] + 40 * u, S.gun[1] - 70 * u, { s: 11, w: 800, c: '#fff', bg: on ? '#b91c1c' : '#64748b' }); Q31.T(ctx, S.p.obj === 'car' ? 'جسم السيارة موصول بالأرض' : 'الكرسي موصول بالقطب السالب/الأرض', g.ox, g.oy - 160 * u, { s: 11, w: 800, c: '#fff', bg: '#1d4ed8' }); Q31.T(ctx, 'مصدر كهربائي', (S.gun[0] + g.ox) / 2, g.by + 50, { s: 10.5, w: 800, c: '#fff', bg: '#1f2937' }); }
      const eff = S.n ? Math.round(S.ok / S.n * 100) : 0; Q31.card(ctx, S, [{ t: 'نسبة الصبغ الذي وصل: ' + eff + '%', w: 900, c: eff > 70 ? '#15803d' : '#b45309' }, { t: 'الصبغ الضائع: ' + (S.n ? 100 - eff : 0) + '%' }, { t: 'وصل إلى الظهر: ' + S.back + ' قطيرة' }], { title: on ? 'القطيرات مشحونة (+)' : 'القطيرات غير مشحونة', y: 46, wd: 250 });
      Q31.banner(ctx, w, 'المرذاذ: صبغ متجانس بالكهربائية الساكنة', '#9333ea');
    },
    drags(S) { if (!S.W || !S.gun) return []; const g = D.geo(S), u = g.u; return [{ id: 'gun', x: S.gun[0] + 15 * u, y: S.gun[1], w: 80 * u, h: 60 * u, axis: 'xy', keep: true, tip: 'اسحب المرذاذ، أو اضغطه للرش', idle: 'حرّك المرذاذ ✋', click: S => { S.burst = 1; }, drag: (S, d) => { S.gun = [clamp(d.ox - 15 * u + d.x - d.sx, 50, g.ox - 160 * u), clamp(d.oy + d.y - d.sy, 90, g.by - 60)]; } }]; },
    readings(S) { const eff = S.n ? Math.round(S.ok / S.n * 100) : 0; return [rd('القطيرات', S.p.on !== false ? 'مشحونة بالموجبة' : 'غير مشحونة'), rd('نسبة الصبغ الواصل', eff + '%'), rd('الصبغ على الظهر', String(S.back))]; },
    explain(S) { return S.p.on !== false ? 'القطيرات كلها <b>موجبة</b> فتتنافر وتتباعد عن بعضها، فينتشر الرذاذ بانتظام. والكرسي الموصول بالقطب السالب (أو بالأرض) <b>يجذبها</b> فتلتف حتى إلى ظهره: صبغ متجانس وجيد وقليل الضياع.' : 'بدون شحن تسير القطيرات في خطوط شبه مستقيمة: كثير منها يضيع حول الكرسي، والصبغ غير متجانس ولا يصل إلى الظهر.'; }
  };
  M8.P[D.id] = D;
})();
/* ---- E5 part 2: تطبيقات أخرى: أجهزة الترسيب في معامل الإسمنت والاستنساخ (ص 19) ---- */
(() => {
  const CP = ['1) شحن الأسطوانة بالموجبة', '2) الضوء يفرّغ المناطق البيضاء', '3) الحبر (−) يلتصق بالصورة (+)', '4) الورقة (+ أقوى) تسحب الحبر', '5) الحرارة تثبّت الحبر'];
  const D = { id: 'g9_app_more', page: 19, fig: 'ص 19',
    desc: 'تستثمر الكهربائية الساكنة أيضاً في أجهزة الاستنساخ، وفي أجهزة الترسيب التي تستعمل في معامل صناعة الإسمنت للتقليل من التلوث البيئي، وفي تثبيت مواد التجميل والعدسات اللاصقة.',
    tags: 'ترسيب معمل إسمنت تلوث استنساخ طابعة تطبيقات',
    tools: ['مرسّب كهربائي', 'جهاز استنساخ'],
    steps: ['اختر «جهاز الترسيب» وشغّل/أطفئ الجهاز: قارن الدخان الخارج من المدخنة.', 'اضغط «انفض الألواح» لجمع الغبار المترسب.', 'اختر «جهاز الاستنساخ» وحرّك «مرحلة الاستنساخ» لترى كيف تُنسخ الصورة بالكهربائية الساكنة.'],
    concl: ['في جهاز الترسيب تُشحن دقائق الغبار فتنجذب إلى ألواح مشحونة بشحنة مخالفة (أو مؤرضة) فيخرج هواء نظيف.', 'في الاستنساخ يلتصق مسحوق الحبر المشحون بالمناطق المشحونة من الأسطوانة التي تمثل الصورة.'],
    controls: [SEL('sc', 'التطبيق', [['prec', 'جهاز الترسيب (معمل الإسمنت)'], ['copy', 'جهاز الاستنساخ']], 'prec'), TG('pw', 'تشغيل جهاز الترسيب', true, null, 'charges'), R('st', 'مرحلة الاستنساخ', 0, 4, 0, 1, ''), BT('', [{ t: '🔨 انفض الألواح', on: S => { S.stuck = []; S.hop = (S.hop || 0) + 1; } }, { t: '▶ استنسخ تلقائياً', on: S => { S.auto = 1; S.at = 0; } }])],
    setup(S) { S.pt = []; S.stuck = []; S.hop = 0; S.out = 0; S.auto = 0; },
    update(S, dt) { if (!S.W) return; const w = S.W, h = S.H, u = Q31.sc(w, h), cx = Q31.cx(w); if (S.auto) { S.at += dt; const k = Math.min(4, Math.floor(S.at / 1.4)); if (k !== S.p.st) setParam(S, 'st', k); if (S.at > 7) S.auto = 0; }
      if (S.p.sc !== 'prec') return; const L = cx - 70 * u, R = cx + 70 * u, top = h * .14, bot = h * .78;
      if (S.pt.length < 120) S.pt.push({ x: cx + (Math.random() - .5) * 100 * u, y: bot, vx: 0, ch: 0 });
      S.pt.forEach(p => { p.y -= 70 * u * dt; if (S.p.pw !== false && p.y < bot - 60 * u && p.y > top + 40 * u) { p.ch = 1; const side = p.x < cx ? -1 : 1; p.vx += side * 180 * u * dt; } p.x += p.vx * dt; if (p.x < L + 8 || p.x > R - 8) { p.dead = 1; if (S.stuck.length < 400) S.stuck.push([clamp(p.x, L + 8, R - 8), p.y]); } if (p.y < top) { p.dead = 1; S.out++; } });
      S.pt = S.pt.filter(p => !p.dead); },
    draw(ctx, w, h, S) {
      const u = Q31.sc(w, h), cx = Q31.cx(w), ph = w < 600; K.bg(ctx, w, h, { benchY: h * .86 });
      if (S.p.sc === 'prec') { const L = cx - 70 * u, R = cx + 70 * u, top = h * .14, bot = h * .78, on = S.p.pw !== false;
        Q31.raw(ctx, () => { ctx.fillStyle = '#d6d3d1'; ctx.fillRect(L - 14, top, 14, bot - top); ctx.fillRect(R, top, 14, bot - top); ctx.fillStyle = '#a8a29e'; ctx.fillRect(L - 40 * u, bot, R - L + 80 * u, h * .86 - bot); ctx.fillStyle = 'rgba(120,113,108,.8)'; for (let i = 0; i < Math.min(20, S.hop * 4); i++) { ctx.beginPath(); ctx.arc(cx + (i % 5 - 2) * 14, h * .84 - (i / 5 | 0) * 8, 6, 0, TAU); ctx.fill(); }
          ctx.strokeStyle = on ? '#2563eb' : '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, top + 30 * u); ctx.lineTo(cx, bot - 40 * u); ctx.stroke(); ctx.fillStyle = '#57534e'; S.stuck.forEach(q => { ctx.beginPath(); ctx.arc(q[0], q[1], 3, 0, TAU); ctx.fill(); });
          const sm = Math.min(1, S.pt.filter(p => p.y < top + 30).length / 10); ctx.fillStyle = on ? 'rgba(226,232,240,.5)' : 'rgba(87,83,78,.55)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(cx + Math.sin(S.t + i) * 30, top - 20 - ((S.t * 25 + i * 18) % 100), 18 + i * 3, 0, TAU); ctx.fill(); } });
        if (on) { for (let k = 0; k < 6; k++) { Q31.sg(ctx, L - 7, top + 40 + k * (bot - top - 60) / 5, 1, 6); Q31.sg(ctx, R + 7, top + 40 + k * (bot - top - 60) / 5, 1, 6); Q31.sg(ctx, cx, top + 50 + k * (bot - top - 120) / 5, -1, 5); } }
        S.pt.forEach(p => { if (p.ch && on) Q31.sg(ctx, p.x, p.y, -1, 3.6); else Q31.raw(ctx, () => { ctx.fillStyle = '#57534e'; ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, TAU); ctx.fill(); }); });
        Q31.T(ctx, 'غازات ودقائق غبار من الفرن', cx, bot + 22 * u, { s: 11, w: 800, c: '#fff', bg: '#57534e' }); Q31.T(ctx, on ? 'هواء نظيف ✓' : 'دخان ملوث ✗', cx, top - 60, { s: 13, w: 900, c: '#fff', bg: on ? '#15803d' : '#dc2626' });
        if (!ph) { Q31.T(ctx, 'سلك مشحون (−) يشحن الغبار', cx + 170 * u, top + 80, { s: 11, w: 800, c: '#fff', bg: '#1d4ed8' }); Q31.T(ctx, 'ألواح (+) تجذب الغبار', cx - 170 * u, top + 140, { s: 11, w: 800, c: '#fff', bg: '#b91c1c' }); }
        Q31.banner(ctx, w, 'جهاز الترسيب: تقليل التلوث في معامل الإسمنت', '#9333ea'); }
      else { const k = S.p.st, dx = cx - 40 * u, dy = h * .4, R = 90 * u;
        Q31.raw(ctx, () => { const gg = ctx.createRadialGradient(dx - 20, dy - 30, 5, dx, dy, R); gg.addColorStop(0, '#e2e8f0'); gg.addColorStop(1, '#475569'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(dx, dy, R, 0, TAU); ctx.fill(); });
        const img = a => { const x = Math.cos(a), y = Math.sin(a); return (a > -.6 && a < .9); };
        for (let i = 0; i < 28; i++) { const a = i / 28 * TAU - Math.PI, x = dx + Math.cos(a) * R * .88, y = dy + Math.sin(a) * R * .88, inImg = img(a); if (k >= 0 && (k === 0 || inImg)) Q31.sg(ctx, x, y, 1, 5); if (k >= 2 && inImg && k < 4) Q31.raw(ctx, () => { ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(dx + Math.cos(a) * R * 1.04, dy + Math.sin(a) * R * 1.04, 5, 0, TAU); ctx.fill(); }); }
        if (k === 1) Q31.raw(ctx, () => { ctx.fillStyle = 'rgba(253,224,71,.45)'; ctx.beginPath(); ctx.moveTo(dx - 220 * u, dy - 120 * u); ctx.lineTo(dx - R * .9, dy - 20); ctx.lineTo(dx - R * .6, dy + 70); ctx.lineTo(dx - 220 * u, dy + 60 * u); ctx.fill(); });
        if (k >= 3) { Q31.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#94a3b8'; ctx.fillRect(dx - 160 * u, dy + R + 26, 320 * u, 14); ctx.strokeRect(dx - 160 * u, dy + R + 26, 320 * u, 14); ctx.fillStyle = '#111827'; ctx.font = '900 ' + (14 * u | 0) + 'px Tajawal'; ctx.textAlign = 'center'; ctx.fillText('فيزياء', dx, dy + R + 22); }); for (let j = 0; j < 8; j++) Q31.sg(ctx, dx - 140 * u + j * 40 * u, dy + R + 50, 1, 5); }
        if (k === 4) Q31.raw(ctx, () => { ctx.fillStyle = 'rgba(249,115,22,.35)'; rr(ctx, dx - 170 * u, dy + R + 60, 340 * u, 30, 10); ctx.fill(); });
        Q31.strip(ctx, w, ph ? h - 92 : 50, CP, k, '#9333ea');
        Q31.T(ctx, 'أسطوانة حساسة للضوء', dx, dy - R - 18, { s: 11.5, w: 800, c: '#fff', bg: '#334155' });
        Q31.banner(ctx, w, 'جهاز الاستنساخ: الحبر يلتصق بالمناطق المشحونة', '#9333ea'); }
    },
    readings(S) { return S.p.sc === 'prec' ? [rd('الجهاز', S.p.pw !== false ? 'يعمل' : 'متوقف'), rd('دقائق خرجت من المدخنة', String(S.out)), rd('دقائق ترسبت', String(S.stuck.length))] : [rd('المرحلة', CP[S.p.st], 1)]; },
    explain(S) { return S.p.sc === 'prec' ? 'السلك المركزي المشحون يشحن دقائق الغبار بالسالبة، فتنجذب إلى الألواح الموجبة (أو المؤرضة) وتلتصق بها، فيخرج من المدخنة هواء نظيف. ننفض الألواح لجمع الغبار. هكذا تقلل معامل الإسمنت التلوث البيئي.' : ['تُشحن أسطوانة حساسة للضوء بشحنة موجبة.', 'ينعكس الضوء عن المناطق البيضاء من الورقة الأصلية فيفرّغ الشحنة فيها، وتبقى الشحنة في مكان الكتابة فقط (صورة مشحونة غير مرئية).', 'مسحوق الحبر مشحون بالسالبة فيلتصق بالمناطق الموجبة فقط.', 'الورقة تُشحن بشحنة موجبة أقوى فتسحب الحبر إليها.', 'الحرارة تذيب الحبر وتثبته على الورقة: نسخة جاهزة!'][S.p.st]; }
  };
  M8.P[D.id] = D;
})();
/* ---- E5 part 3: الموصلات والعوازل (الشكلان 21 و22) — side by side ---- */
(() => {
  const M = { copper: ['النحاس', 1, '#ea580c'], silver: ['الفضة', 1, '#cbd5e1'], alu: ['الألمنيوم', 1, '#94a3b8'], glass: ['الزجاج', 0, '#7dd3fc'], wool: ['الصوف', 0, '#eab308'], rubber: ['المطاط', 0, '#334155'], si: ['السيليكون (شبه موصل)', 2, '#64748b'] };
  const D = { id: 'g9_app_cond', page: 19, fig: 'الشكلان 21 و22',
    desc: 'تقسم المواد من حيث قابليتها على التوصيل الكهربائي إلى: موصلات تحتوي وفرة من الإلكترونات ضعيفة الارتباط بالنواة تتحرك خلالها بسهولة (النحاس، الفضة، الألمنيوم)، وعوازل لا تتحرك فيها الشحنات بحرية (الزجاج، الصوف، المطاط).',
    tags: 'موصلات عوازل نحاس فضة ألمنيوم زجاج صوف مطاط أشباه موصلات سيليكون جرمانيوم إلكترونات حرة',
    tools: ['ساق موصلة', 'ساق عازلة'],
    steps: ['اختر مادة للساق العليا ومادة للساق السفلى (موصل مقابل عازل).', 'اضغط «ضع شحنة على الطرف» لإضافة إلكترونات على الطرف الأيسر من الساقين معاً.', 'قارن: في الموصل تنتشر الإلكترونات على الساق كلها، وفي العازل تبقى مكانها.', 'هل تعلم: اختر السيليكون وغيّر درجة الحرارة.'],
    concl: ['الموصلات: الإلكترونات الخارجية ضعيفة الارتباط بالنواة (حرة) فتتحرك بسهولة وتنتشر الشحنة على الجسم كله.', 'العوازل: الإلكترونات مرتبطة بقوة بذراتها فلا تتحرك الشحنات بحرية وتبقى في مكانها.', 'أشباه الموصلات (السيليكون والجرمانيوم) توصل في ظروف معينة وتسلك سلوك العازل في ظروف أخرى.'],
    controls: [SEL('a', 'الساق العليا', Object.keys(M).map(k => [k, M[k][0]]), 'copper', (v, S) => D.reset(S)), SEL('b', 'الساق السفلى', Object.keys(M).map(k => [k, M[k][0]]), 'glass', (v, S) => D.reset(S)), R('T', 'درجة الحرارة (للسيليكون)', 0, 100, 20, 5, '°C'),
      BT('', [{ t: '⚡ ضع شحنة على الطرف', on: S => D.put(S) }, { t: '↺ أعد', on: S => D.reset(S) }]), TG('free', 'حركة الإلكترونات الحرة', true, null, 'electron')],
    setup(S) { D.reset(S); },
    reset(S) { S.x = [[], []]; S.bg = [0, 1].map(() => Array.from({ length: 26 }, (_, i) => ({ f: (i + .5) / 26, y: (i * 37 % 10) / 10, ph: i }))); },
    mob(S, k) { const m = M[k][1]; return m === 2 ? clamp((S.p.T - 30) / 70, 0, 1) : m; },
    put(S) { for (let i = 0; i < 2; i++) for (let k = 0; k < 6; k++) S.x[i].push({ f: .03 + Math.random() * .05, y: Math.random() }); },
    update(S, dt) { [S.p.a, S.p.b].forEach((k, i) => { const mo = D.mob(S, k); const L = S.x[i]; L.forEach(e => { let F = 0; L.forEach(o => { if (o !== e) { const d = e.f - o.f; F += Math.sign(d) / (Math.abs(d) * 40 + .4); } }); e.f = clamp(e.f + F * dt * 2 * mo + (Math.random() - .5) * .01 * mo, .02, .98); }); }); },
    draw(ctx, w, h, S) {
      const ph = w < 600, x0 = ph ? 14 : 90, x1 = w - (ph ? 14 : 30), bw = x1 - x0, bh = Math.min(70, h * .1); K.bg(ctx, w, h, { benchY: h * .9, tiles: false });
      [S.p.a, S.p.b].forEach((k, i) => { const y = h * (.3 + i * .36), m = M[k], mo = D.mob(S, k);
        Q31.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 8; const gg = ctx.createLinearGradient(0, y - bh / 2, 0, y + bh / 2); gg.addColorStop(0, shade(m[2], 40)); gg.addColorStop(.5, m[2]); gg.addColorStop(1, shade(m[2], -35)); ctx.fillStyle = gg; ctx.globalAlpha = k === 'glass' ? .7 : 1; rr(ctx, x0, y - bh / 2, bw, bh, bh / 2); ctx.fill(); ctx.restore(); });
        // lattice of atoms
        for (let j = 0; j < 22; j++) { const ax = x0 + 20 + j * (bw - 40) / 21; Q31.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(ax, y, 6, 0, TAU); ctx.fill(); }); }
        if (S.p.free !== false) S.bg[i].forEach(e => { const fx = mo > .5 || (M[k][1] === 2 && mo > .05) ? (e.f + S.t * .03 * (e.ph % 2 ? 1 : -1) * mo + 1) % 1 : e.f; const yy = y - bh * .3 + e.y * bh * .6 + (mo < .5 ? Math.sin(S.t * 6 + e.ph) * 2 : 0); Q31.el(ctx, x0 + 12 + fx * (bw - 24) + (mo < .5 ? Math.cos(S.t * 6 + e.ph) * 3 : 0), yy, 3.6, .55); });
        S.x[i].forEach(e => Q31.sg(ctx, x0 + 12 + e.f * (bw - 24), y - bh * .32 + e.y * bh * .64, -1, 6));
        const type = M[k][1] === 1 ? 'موصل جيد' : M[k][1] === 0 ? 'عازل' : (mo > .3 ? 'شبه موصل: يوصل الآن (ساخن)' : 'شبه موصل: يسلك كعازل (بارد)');
        Q31.T(ctx, m[0] + ' — ' + type, x0 + bw / 2, y - bh / 2 - 18, { s: 13, w: 900, c: '#fff', bg: M[k][1] === 1 || mo > .3 ? '#15803d' : '#b45309' });
        if (S.x[i].length) { const sp = Math.max(...S.x[i].map(e => e.f)) - Math.min(...S.x[i].map(e => e.f)); Q31.T(ctx, sp > .5 ? 'الشحنة انتشرت على الساق كلها' : 'الشحنة بقيت في مكانها', x0 + bw / 2, y + bh / 2 + 18, { s: 12, w: 800, c: sp > .5 ? '#15803d' : '#b45309' }); }
        Q31.T(ctx, 'الطرف المشحون', x0 + 40, y + bh / 2 + 18, { s: 10, w: 800, c: '#475569' }); });
      Q31.banner(ctx, w, 'مقارنة: الموصلات والعوازل', '#9333ea');
    },
    drags(S) { if (!S.W) return []; return [Q31.btn('put', { x: S.W < 600 ? 40 : 110, y: S.H * .3, w: 60, h: 60 }, S => D.put(S), { tip: 'ضع شحنة (إلكترونات) على الطرف' })]; },
    readings(S) { return [S.p.a, S.p.b].map((k, i) => rd(M[k][0], (M[k][1] === 1 ? 'موصل' : M[k][1] === 0 ? 'عازل' : 'شبه موصل') + ' — قابلية حركة الإلكترونات ' + Math.round(D.mob(S, k) * 100) + '%', 1)); },
    explain(S) { return 'في <b>الموصلات</b> (النحاس، الفضة، الألمنيوم) وفرة من الإلكترونات ضعيفة الارتباط بالنواة تتحرك بسهولة، فتتنافر الشحنات وتنتشر على الجسم كله. في <b>العوازل</b> (الزجاج، الصوف، المطاط) لا تتحرك الشحنات بحرية فتبقى حيث وُضعت.' + (S.p.a === 'si' || S.p.b === 'si' ? ' <b>هل تعلم:</b> السيليكون شبه موصل: عند تسخينه تتحرر بعض إلكتروناته فيوصل.' : ''); }
  };
  M8.P[D.id] = D;
})();
/* ---- E5 part 4: ساق النحاس المدلوكة: باليد أو بمقبض عازل (الشكل 23) ---- */
(() => {
  const D = { id: 'g9_app_copper', page: 19, fig: 'الشكل 23',
    desc: 'من المشاهدات التي تحتاج إلى تفسير: ساق نحاس ممسوكة باليد ومدلوكة بالصوف لا تجذب قصاصات الورق، لأن الشحنات تتسرب إلى الأرض عن طريق جسمك. أما إذا مسكتها بمقبض عازل (أو لبست كفاً من المطاط) فإنها تجذب القصاصات.',
    tags: 'ساق نحاس مقبض عازل كف مطاط تسرب الشحنات إلى الأرض قصاصات ورق موصل',
    tools: ['ساق من النحاس', 'مقبض من مادة عازلة أو كف من المطاط', 'قطعة صوف أو فرو', 'قصاصات ورق'],
    steps: ['اضغط «ادلك الساقين بالصوف» (تُدلك الساقان معاً).', 'لاحظ الساق اليمنى الممسوكة باليد مباشرة: الإلكترونات تتسرب عبر جسمك إلى الأرض.', 'لاحظ الساق اليسرى الممسوكة بمقبض عازل: تحتفظ بشحنتها فترة قصيرة.', 'اسحب كل ساق نحو قصاصات الورق وقارن.'],
    concl: ['ساق النحاس تُشحن بالدلك، لكن إذا مسكناها باليد تتسرب الشحنات مباشرة إلى الأرض عن طريق الجسم (لأن النحاس والجسم موصلان).', 'إذا كانت معزولة (مقبض عازل أو كف مطاط) تحتفظ بالشحنة لفترة قصيرة فتجذب القصاصات.'],
    controls: [BT('', [{ t: '🧽 ادلك الساقين بالصوف', on: S => { S.auto = 1.2; } }, { t: '↺ أعد', on: S => D.reset(S) }]), TG('chg', 'الشحنات', true, null, 'charges'), TG('flow', 'مسار تسرب الإلكترونات', true, null, 'electron')],
    setup(S) { D.reset(S); },
    reset(S) { S.q = [0, 0]; S.y = [0, 0]; S.bits = null; S._fly = []; S.auto = 0; },
    geo(S, i) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 0 : 64, cw = (w - x0) / 2, u = Q31.sc(w, h) * (ph ? .6 : .95); return { x: x0 + cw * (1 - i) + cw * .5, u, by: h * .82, h, w, cw }; },
    update(S, dt) { if (!S.W) return; if (S.auto > 0) { S.auto -= dt; S._a = (S._a || 0) + dt; if (S._a > .12) { S._a = 0; S.q = S.q.map((q, i) => Math.min(8, q + 1)); } }
      // hand-held (i=0): leaks quickly through body
      if (S.q[0] > 0) { S._l = (S._l || 0) + dt; if (S._l > .09) { S._l = 0; S.q[0] = Math.max(0, S.q[0] - 1); const g = D.geo(S, 0); if (S.p.flow !== false) Q31.fly(S, g.x + 70 * g.u, g.h * .32 + S.y[0], g.x + 150 * g.u, g.by, .6); } }
      if (!S.bits) S.bits = [0, 1].map(i => { const g = D.geo(S, i); return Array.from({ length: 10 }, (_, k) => ({ x: g.x - 70 * g.u + k * 14 * g.u, y: g.by - 3, b: g.by - 3 })); });
      [0, 1].forEach(i => { const g = D.geo(S, i), ry = g.h * .32 + S.y[i]; S.bits[i].forEach(b => { if (S.q[i] >= 2 && ry > g.by - 160 * g.u && Math.abs(b.x - g.x) < 120 * g.u) b.y += ((ry + 10) - b.y) * Math.min(1, dt * 6); else b.y += (b.b - b.y) * Math.min(1, dt * 8); }); }); },
    draw(ctx, w, h, S) {
      K.bg(ctx, w, h, { benchY: h * .82 });
      [0, 1].forEach(i => { const g = D.geo(S, i), u = g.u, ry = h * .32 + S.y[i];
        Q31.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.4)'; rr(ctx, g.x - g.cw / 2 + 8, 40, g.cw - 16, h * .76, 12); ctx.fill(); });
        Q31.rod(ctx, g.x - 110 * u, ry, g.x + 70 * u, ry, 18 * u, 'copper', S.p.chg !== false && S.q[i] ? { n: Math.round(S.q[i]), s: -1, from: .05, to: .9 } : null);
        if (i === 1) { Q31.raw(ctx, () => { const gg = ctx.createLinearGradient(0, ry - 14, 0, ry + 14); gg.addColorStop(0, '#fbbf24'); gg.addColorStop(1, '#92400e'); ctx.fillStyle = gg; rr(ctx, g.x + 70 * u, ry - 13 * u, 70 * u, 26 * u, 8); ctx.fill(); }); C2.hand(ctx, g.x + 120 * u, ry, -1, u * 1.1, { sleeve: '#0ea5e9' }); Q31.T(ctx, 'مقبض عازل', g.x + 105 * u, ry + 30 * u, { s: 11, w: 800, c: '#fff', bg: '#92400e' }); }
        else { C2.hand(ctx, g.x + 84 * u, ry, -1, u * 1.1, { sleeve: '#0ea5e9' }); Q31.raw(ctx, () => { if (S.p.flow !== false) { ctx.strokeStyle = 'rgba(37,99,235,.35)'; ctx.setLineDash([6, 6]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.x + 90 * u, ry); ctx.quadraticCurveTo(g.x + 170 * u, ry + 60, g.x + 150 * u, g.by); ctx.stroke(); ctx.setLineDash([]); } }); Q31.earth(ctx, g.x + 150 * u, g.by + 4); Q31.T(ctx, 'اليد مباشرة على النحاس', g.x + 60 * u, ry + 34 * u, { s: 11, w: 800, c: '#fff', bg: '#0369a1' }); }
        if (S.bits) Q31.raw(ctx, () => { S.bits[i].forEach((b, k) => { ctx.fillStyle = ['#fff', '#fde68a', '#bfdbfe'][k % 3]; ctx.strokeStyle = '#94a3b8'; ctx.fillRect(b.x - 6, b.y - 4, 12, 8); ctx.strokeRect(b.x - 6, b.y - 4, 12, 8); }); });
        Q31.T(ctx, i ? 'ممسوكة بمقبض عازل: تحتفظ بالشحنة' : 'ممسوكة باليد: الشحنة تتسرب إلى الأرض', g.x, 58, { s: 12, w: 900, c: '#fff', bg: i ? '#15803d' : '#b45309' }); });
      Q31.drawFly(ctx, S); Q31.banner(ctx, w, 'مقارنة: ساق النحاس باليد وبمقبض عازل (الشكل 23)', '#9333ea');
    },
    drags(S) { if (!S.W) return []; return [0, 1].map(i => { const g = D.geo(S, i); return { id: 'rod' + i, x: g.x - 20 * g.u, y: S.H * .32 + S.y[i], w: 180 * g.u, h: 40, axis: 'y', keep: true, tip: 'اسحب الساق نحو القصاصات', idle: i ? 'قرّب الساق ↓' : undefined, drag: (S, d) => { S.y[i] = clamp(d.oy - S.H * .32 + d.y - d.sy, -60, g.by - S.H * .32 - 40); } }; }); },
    readings(S) { return [rd('شحنة الساق الممسوكة باليد', S.q[0] ? '−' + S.q[0] : '0 (تسربت)'), rd('شحنة الساق ذات المقبض العازل', S.q[1] ? '−' + S.q[1] : '0')]; },
    explain(S) { return 'النحاس <b>موصل</b>، وجسم الإنسان موصل أيضاً. الساق الممسوكة باليد تُشحن بالدلك لكن الشحنات <b>تتسرب مباشرة إلى الأرض عن طريق جسمك</b>، فلا تجذب القصاصات وقد تعتقد أنها لم تُشحن. أما الساق المعزولة بمقبض عازل (أو كف مطاط) فتحتفظ بالشحنات فترة قصيرة فتجذب القصاصات.'; }
  };
  M8.P[D.id] = D;
})();
/* ---- E5 part 5: س2-1 سلاسل شاحنات الوقود + س2-2 التأريض يعادل الشحنة ---- */
(() => {
  const D = { id: 'g9_app_truck', page: 28, fig: 'س2 (1، 2)',
    desc: 'علّل: تجهز سيارات نقل الوقود بسلاسل معدنية في مؤخرتها تلامس الأرض (س2-1)، وتتعادل شحنة الجسم المشحون بالشحنة الموجبة أو السالبة عند إيصاله بالأرض (س2-2).',
    tags: 'شاحنة وقود سلسلة معدنية تأريض شرارة حريق تعادل الشحنة سؤال 2',
    tools: ['شاحنة وقود', 'سلسلة معدنية'],
    steps: ['شغّل الشاحنة: يحتك جسمها بالهواء وبالطريق فيُشحن.', 'أزل السلسلة المعدنية ولاحظ تجمع الشحنات، ثم اسحب الشاحنة إلى محطة الوقود: تحدث شرارة خطرة!', 'أعد السلسلة: تتسرب الشحنات باستمرار إلى الأرض فلا تتجمع.', 'س2-2: غيّر نوع شحنة الجسم إلى موجبة ولاحظ اتجاه حركة الإلكترونات عبر السلسلة.'],
    concl: ['س2-1: يُشحن جسم الشاحنة بالاحتكاك؛ والسلسلة المعدنية الملامسة للأرض تفرغ الشحنات أولاً بأول فلا تحدث شرارة تشعل الوقود.', 'س2-2: الأرض مستودع كبير للشحنات: الجسم السالب يعطيها إلكتروناته الزائدة، والجسم الموجب يأخذ منها إلكترونات، فيتعادل.'],
    controls: [TG('ch', 'السلسلة المعدنية', true, null, 'eye'), TG('run', 'تشغيل الشاحنة (احتكاك)', true, null, 'velocity'), SEL('sg', 'نوع الشحنة المتولدة (س2-2)', [['-', 'سالبة'], ['+', 'موجبة']], '-'), BT('', [{ t: '⛽ ادخل محطة الوقود', on: S => { S.st = 1; } }, { t: '↺ أعد', on: S => { S.q = 0; S.st = 0; S.fire = 0; } }])],
    setup(S) { S.q = 0; S.st = 0; S.fire = 0; S.off = 0; S.x = 0; },
    update(S, dt) { if (!S.W) return; const run = S.p.run !== false && !S.st; if (run) { S.off += dt * 260; S.q = Math.min(10, S.q + dt * 1.4); } if (S.p.ch !== false && S.q > 0) { S._l = (S._l || 0) + dt; if (S._l > .1) { S._l = 0; S.q = Math.max(0, S.q - .7); S.flow = .3; } }
      if (S.flow > 0) S.flow -= dt; if (S.st) { S.x = Math.min(1, S.x + dt * .6); if (S.x >= 1 && S.q > 2.5 && !S.fire) { S.fire = 1; S.spk = .5; C2.msg(S, 'شرارة! خطر اشتعال الوقود 🔥', 2.4); } } else S.x = Math.max(0, S.x - dt); if (S.spk > 0) S.spk -= dt; },
    draw(ctx, w, h, S) {
      const u = Q31.sc(w, h) * (w < 600 ? .75 : 1.1), cx = Q31.cx(w), gy = h * .74, tx = cx - 150 * u + S.x * 120 * u, ty = gy - 30 * u;
      Q31.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 0, 0, gy); sk.addColorStop(0, '#bae6fd'); sk.addColorStop(1, '#f0f9ff'); ctx.fillStyle = sk; ctx.fillRect(0, 0, w, gy); ctx.fillStyle = '#374151'; ctx.fillRect(0, gy, w, h - gy); ctx.strokeStyle = '#fde047'; ctx.lineWidth = 4; ctx.setLineDash([30, 24]); ctx.lineDashOffset = S.off; ctx.beginPath(); ctx.moveTo(0, gy + 40); ctx.lineTo(w, gy + 40); ctx.stroke(); ctx.setLineDash([]);
        // station pump
        const px = cx + 210 * u; ctx.fillStyle = '#dc2626'; rr(ctx, px, gy - 120 * u, 50 * u, 120 * u, 6); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(px + 8 * u, gy - 108 * u, 34 * u, 24 * u); ctx.strokeStyle = '#111827'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, gy - 70 * u); ctx.quadraticCurveTo(px - 30 * u, gy - 40 * u, px - 40 * u + (1 - S.x) * 20, gy - 60 * u); ctx.stroke();
        // truck
        ctx.fillStyle = '#e5e7eb'; rr(ctx, tx - 150 * u, ty - 70 * u, 210 * u, 70 * u, 30 * u); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#f97316'; ctx.fillRect(tx - 140 * u, ty - 40 * u, 190 * u, 10 * u);
        ctx.fillStyle = '#2563eb'; rr(ctx, tx + 64 * u, ty - 64 * u, 60 * u, 64 * u, 8); ctx.fill(); ctx.fillStyle = '#bfdbfe'; ctx.fillRect(tx + 92 * u, ty - 56 * u, 26 * u, 22 * u); ctx.fillStyle = '#4b5563'; ctx.fillRect(tx - 150 * u, ty - 4 * u, 274 * u, 10 * u);
        ctx.fillStyle = '#111827'; [tx - 120 * u, tx - 80 * u, tx + 96 * u].forEach(x => { ctx.beginPath(); ctx.arc(x, gy - 14 * u, 16 * u, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(x, gy - 14 * u, 6 * u, 0, TAU); ctx.fill(); ctx.fillStyle = '#111827'; });
        if (S.p.ch !== false) { ctx.strokeStyle = '#71717a'; ctx.lineWidth = 3; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(tx - 148 * u, ty + 4 * u); ctx.quadraticCurveTo(tx - 160 * u, gy - 10, tx - 176 * u, gy); ctx.stroke(); ctx.setLineDash([]); } });
      const n = Math.round(S.q), sg = S.p.sg === '+' ? 1 : -1; for (let k = 0; k < n; k++) Q31.sg(ctx, tx - 130 * u + k * 18 * u, ty - 56 * u, sg, 6);
      if (S.p.ch !== false && S.flow > 0) { const f = (S.t * 3) % 1; const a = [tx - 148 * u, ty + 4 * u], b = [tx - 176 * u, gy]; const p = sg < 0 ? f : 1 - f; Q31.el(ctx, a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p, 5); Q31.T(ctx, sg < 0 ? 'إلكترونات ⟵ إلى الأرض' : 'إلكترونات ⟵ من الأرض', tx - 190 * u, gy + 22, { s: 11, w: 800, c: '#fff', bg: '#1d4ed8' }); }
      if (S.spk > 0) Q31.spark(ctx, cx + 170 * u, gy - 60 * u, tx + 60 * u, ty - 30 * u, S.t); if (S.fire) Q31.raw(ctx, () => { for (let i = 0; i < 7; i++) { const fx = cx + 150 * u + (i - 3) * 12 * u, fh = (40 + 18 * Math.sin(S.t * 10 + i)) * u; const fg = ctx.createLinearGradient(0, gy - 60 * u - fh, 0, gy - 60 * u); fg.addColorStop(0, 'rgba(254,240,138,0)'); fg.addColorStop(1, '#ef4444'); ctx.fillStyle = fg; ctx.beginPath(); ctx.moveTo(fx - 9 * u, gy - 60 * u); ctx.quadraticCurveTo(fx, gy - 60 * u - fh * 1.2, fx + 9 * u, gy - 60 * u); ctx.fill(); } });
      Q31.T(ctx, S.p.ch !== false ? 'سلسلة معدنية تلامس الأرض ✓' : 'بلا سلسلة: الشحنات تتجمع ✗', tx - 60 * u, ty - 96 * u, { s: 12, w: 900, c: '#fff', bg: S.p.ch !== false ? '#15803d' : '#dc2626' });
      Q31.T(ctx, 'محطة وقود', cx + 235 * u, gy - 134 * u, { s: 11, w: 800, c: '#fff', bg: '#991b1b' }); C2.drawMsg(ctx, S, cx, h * .3);
      Q31.banner(ctx, w, 'س2: علّل — سلاسل شاحنات الوقود والتأريض', '#9333ea');
    },
    readings(S) { return [rd('شحنة جسم الشاحنة', (S.p.sg === '+' ? '+' : '−') + fmt(S.q, 2)), rd('السلسلة', S.p.ch !== false ? 'موجودة' : 'مزالة')]; },
    explain(S) { return 'يحتك جسم الشاحنة بالهواء وبالطريق أثناء السير فيُشحن بشحنات ساكنة. <b>السلسلة المعدنية</b> الملامسة للأرض تفرغ هذه الشحنات أولاً بأول، فلا تتجمع ولا تحدث <b>شرارة</b> قد تشعل الوقود. ' + (S.p.sg === '+' ? 'الجسم <b>موجب</b>: تصعد إلكترونات من الأرض فتعادله.' : 'الجسم <b>سالب</b>: تنزل إلكتروناته الزائدة إلى الأرض فيتعادل.') + ' (س2-2: الأرض مستودع كبير للشحنات).'; }
  };
  M8.P[D.id] = D;
})();
/* ---- E5 part 6: ➕ مولد فان دي غراف ---- */
(() => {
  const D = { id: 'g9_app_vdg', page: 18, fig: '➕ من المختبرات العالمية',
    desc: '➕ من المختبرات العالمية: مولد فان دي غراف — حزام مطاطي يحتك ببكرة فيحمل الشحنات إلى قبة معدنية كبيرة فتتجمع عليها شحنة كبيرة جداً. إذا لمس شخص معزول القبة انتصب شعره، وإذا قرّبنا كرة مؤرضة قفزت شرارة.',
    tags: 'فان دي غراف مولد شحنات قبة حزام شرارة شعر منتصب',
    tools: ['مولد فان دي غراف', 'كرة معدنية مؤرضة', 'شخص يقف على منصة عازلة'],
    steps: ['شغّل المحرك: يحمل الحزام الشحنات إلى القبة.', 'فعّل «الشخص يلمس القبة»: يُشحن جسمه كله فتتنافر شعراته وتنتصب.', 'اسحب الكرة المؤرضة نحو القبة: تقفز شرارة عندما تكفي الشحنة.'],
    concl: ['الشحنات المتشابهة تتنافر: لذلك تتوزع على السطح الخارجي للقبة وتنتصب الشعرات المشحونة بالشحنة نفسها.', 'الشحنة الكبيرة تتفرغ بشرارة إلى الجسم المؤرض القريب.'],
    controls: [TG('mot', 'تشغيل المحرك', true, null, 'velocity'), TG('pr', 'الشخص يلمس القبة', true, null, 'eye'), TG('chg', 'الشحنات', true, null, 'charges'), BT('', [{ t: '↺ فرّغ', on: S => { S.q = 0; } }])],
    setup(S) { S.q = 0; S.bx = null; S.ph = 0; },
    geo(S) { const w = S.W, h = S.H, u = Q31.sc(w, h) * (w < 600 ? .85 : 1.15), cx = Q31.cx(w); return { u, cx, by: h * .86, dx: cx - 60 * u, dy: h * .86 - 300 * u, R: 70 * u, w, h }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); if (S.bx == null) S.bx = g.dx + 260 * g.u; if (S.p.mot !== false) { S.ph += dt * 3; S.q = Math.min(12, S.q + dt * 1.6); } const d = S.bx - (g.dx + g.R); if (S.q > 2 && d < S.q * 9 * g.u) { S.spk = .25; S.q = 0; if (window.Sound && Sound.ok) Sound.ok(); } if (S.spk > 0) S.spk -= dt; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), u = g.u; K.bg(ctx, w, h, { benchY: g.by }); if (S.bx == null) S.bx = g.dx + 260 * u;
      Q31.raw(ctx, () => { ctx.fillStyle = '#1f2937'; rr(ctx, g.dx - 60 * u, g.by - 30 * u, 120 * u, 30 * u, 6); ctx.fill(); const cg = ctx.createLinearGradient(g.dx - 18 * u, 0, g.dx + 18 * u, 0); cg.addColorStop(0, 'rgba(203,213,225,.5)'); cg.addColorStop(.5, 'rgba(241,245,249,.8)'); cg.addColorStop(1, 'rgba(148,163,184,.5)'); ctx.fillStyle = cg; ctx.fillRect(g.dx - 20 * u, g.dy, 40 * u, g.by - 30 * u - g.dy);
        ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 5 * u; ctx.setLineDash([10, 6]); ctx.lineDashOffset = -S.ph * 30; ctx.beginPath(); ctx.moveTo(g.dx - 12 * u, g.by - 40 * u); ctx.lineTo(g.dx - 12 * u, g.dy + 20 * u); ctx.moveTo(g.dx + 12 * u, g.dy + 20 * u); ctx.lineTo(g.dx + 12 * u, g.by - 40 * u); ctx.stroke(); ctx.setLineDash([]);
        const dg = ctx.createRadialGradient(g.dx - g.R * .35, g.dy - g.R * .4, 4, g.dx, g.dy, g.R); dg.addColorStop(0, '#fff'); dg.addColorStop(.4, '#e2e8f0'); dg.addColorStop(1, '#64748b'); ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(g.dx, g.dy, g.R, 0, TAU); ctx.fill(); });
      if (S.p.chg !== false) { const n = Math.round(S.q * 1.5); for (let k = 0; k < n; k++) { const a = k / Math.max(n, 1) * TAU; Q31.sg(ctx, g.dx + Math.cos(a) * g.R * .85, g.dy + Math.sin(a) * g.R * .85, -1, 6); } for (let k = 0; k < 4; k++) { const f = ((S.ph * .3 + k / 4) % 1); Q31.sg(ctx, g.dx - 12 * u, g.by - 40 * u - f * (g.by - 60 * u - g.dy), -1, 4.5); } }
      // person on insulating stand touching dome
      if (S.p.pr !== false) { const px = g.dx - 125 * u, H = 170 * u, gy = g.by - 16 * u; Q31.raw(ctx, () => { ctx.fillStyle = '#92400e'; rr(ctx, px - 40 * u, gy, 80 * u, 16 * u, 4); ctx.fill(); });
        Q31.person(ctx, { H, f: 1, hip: [px, gy - H * .52], neck: [px + 3, gy - H * .85], hands: [[px - 10, gy - H * .45], [g.dx - g.R * .92, g.dy + 28 * u]], feet: [[px - 10, gy], [px + 14, gy]], shirt: '#db2777', pants: '#1e3a8a' });
        const hx = px + 3, hy = gy - H * .97, sp = clamp(S.q / 8, 0, 1); Q31.raw(ctx, () => { ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 2; for (let k = 0; k < 18; k++) { const a = -Math.PI / 2 + (k / 17 - .5) * (1.2 + 1.6 * sp), L = (16 + 18 * sp) * u; const droop = (1 - sp); ctx.beginPath(); ctx.moveTo(hx + Math.cos(a) * 8 * u, hy + Math.sin(a) * 8 * u); ctx.quadraticCurveTo(hx + Math.cos(a) * L * .8, hy + Math.sin(a) * L * .6 + droop * 16 * u, hx + Math.cos(a) * L + (k < 9 ? -1 : 1) * droop * 10 * u, hy + Math.sin(a) * L * (1 - droop) + droop * 26 * u); ctx.stroke(); } });
        Q31.T(ctx, 'منصة عازلة', px, g.by + 14, { s: 10.5, w: 800, c: '#fff', bg: '#92400e' }); }
      // grounded ball
      Q31.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(S.bx + 20 * u, g.dy + 10 * u); ctx.lineTo(S.bx + 60 * u, g.by); ctx.stroke(); }); Q31.ball(ctx, S.bx, g.dy, 26 * u, 0); Q31.earth(ctx, S.bx + 60 * u, g.by + 2);
      if (S.spk > 0) Q31.spark(ctx, g.dx + g.R, g.dy, S.bx - 26 * u, g.dy, S.t, 3);
      Q31.T(ctx, 'كرة مؤرضة — اسحبها', S.bx, g.dy - 44 * u, { s: 11, w: 800, c: '#fff', bg: '#334155' }); Q31.T(ctx, 'القبة المعدنية', g.dx, g.dy - g.R - 16, { s: 11.5, w: 900, c: '#fff', bg: '#475569' });
      Q31.banner(ctx, w, '➕ من المختبرات العالمية: مولد فان دي غراف', '#7c3aed');
    },
    drags(S) { if (!S.W || S.bx == null) return []; const g = D.geo(S); return [{ id: 'ball', x: S.bx, y: g.dy, r: 34, axis: 'x', keep: true, tip: 'قرّب الكرة المؤرضة من القبة', idle: 'قرّب الكرة ↔', drag: (S, d) => { S.bx = clamp(d.ox + d.x - d.sx, g.dx + g.R + 30 * g.u, S.W - 70); } }]; },
    readings(S) { return [rd('شحنة القبة (نسبية)', fmt(S.q, 2)), rd('طول الشرارة الممكن ≈', (S.q * 1.2).toFixed(1) + ' cm')]; },
    explain(S) { return 'الحزام المطاطي يحمل الشحنات (هنا سالبة) إلى القبة فتتجمع على <b>سطحها الخارجي</b> لأنها تتنافر. الشخص الواقف على منصة عازلة يُشحن عند لمسه القبة، فتحمل كل شعرة شحنة من النوع نفسه ف<b>تتنافر الشعرات وتنتصب</b>. وعندما تقترب كرة مؤرضة تقفز <b>شرارة</b> وتتفرغ القبة.'; }
  };
  M8.P[D.id] = D;
})();
/* =============== E6 — قانون كولوم (8-1، ص 20–22، س1-4 س1-5 س1-7، المسائل 1 و2) =============== */
(() => {
  const U = { uC: [1e-6, 'μC', -6], nC: [1e-9, 'nC', -9], e: [1.6e-19, 'e', 0] };
  const PRE = { free: ['حر', null], ex21: ['مثال ص21: +4μC و +9μC على بعد 0.06 m', [4, 'uC', 9, 'uC', 6]], p1: ['المسألة 1: أوجد q (F = 9×10⁻⁷ N ، r = 10 cm)', [1, 'nC', 1, 'nC', 10]], p2: ['المسألة 2: 3×10⁻⁹ C لكل منهما ، r = 5 cm', [3, 'nC', 3, 'nC', 5]],
    q14: ['س1-4: نستبدل إحدى الشحنتين بسالبة (r = 10 cm)', [2, 'uC', -2, 'uC', 10]], q15: ['س1-5: موجبة وسالبة ، 3 cm ثم 6 cm', [2, 'uC', -2, 'uC', 3]], q17: ['س1-7: A = +2μC ، B = +6μC', [2, 'uC', 6, 'uC', 8]] };
  const mk = (cfg) => { const D = { id: cfg.id, page: cfg.page, fig: cfg.fig, desc: cfg.desc, tags: cfg.tags, tools: cfg.tools, steps: cfg.steps, concl: cfg.concl, laws: ['g9_coul'],
    controls: [].concat(cfg.atom ? [] : [SEL('pre', 'مثال/سؤال الكتاب', Object.keys(PRE).filter(k => !cfg.only || cfg.only.includes(k)).map(k => [k, PRE[k][0]]), cfg.def || 'ex21', (v, S) => D.load(S))],
      [R('m1', cfg.atom ? 'q₁ (بعدد شحنات e)' : 'q₁ (المعامل)', -9.9, 9.9, 4, cfg.atom ? 1 : .1, ''), R('m2', cfg.atom ? 'q₂ (بعدد شحنات e)' : 'q₂ (المعامل)', -9.9, 9.9, 9, cfg.atom ? 1 : .1, '')],
      cfg.atom ? [] : [SEL('u', 'وحدة الشحنتين', [['uC', 'μC = 10⁻⁶ C'], ['nC', 'nC = 10⁻⁹ C']], 'uC')],
      [R('r', cfg.atom ? 'البعد r (pm)' : 'البعد r', cfg.atom ? 100 : 1, cfg.atom ? 1000 : 20, 6, cfg.atom ? 10 : .5, cfg.atom ? 'pm' : 'cm'), BT('', [{ t: '×2 البعد', on: S => setParam(S, 'r', S.p.r * 2) }, { t: '×2 الشحنة q₁', on: S => setParam(S, 'm1', S.p.m1 * 2) }, { t: '± اعكس q₂', on: S => setParam(S, 'm2', -S.p.m2) }]),
      TG('vec', 'أسهم القوتين F₁₂ و F₂₁', true, null, 'force'), TG('calc', 'خطوات الحل بالأسس', true, null, 'labels'), TG('gr', 'منحني القوة والبعد', !!cfg.graph, null, 'graph'), TG('ruler', 'المسطرة', true, null, 'grid')]),
    setup(S) { S.trail = []; if (cfg.atom) { S.p.m1 = 1; S.p.m2 = -1; S.p.r = 280; } else D.load(S); },
    load(S) { const P = PRE[S.p.pre]; if (!P || !P[1]) return; const v = P[1]; setParam(S, 'm1', v[0]); setParam(S, 'm2', v[2]); setParam(S, 'u', v[1]); setParam(S, 'r', v[4]); S.trail = []; },
    q(S, i) { const m = i ? S.p.m2 : S.p.m1; return cfg.atom ? m * 1.6e-19 : m * U[S.p.u || 'uC'][0]; },
    rm(S) { return cfg.atom ? S.p.r * 1e-12 : S.p.r / 100; },
    F(S) { const r = D.rm(S); return 9e9 * D.q(S, 0) * D.q(S, 1) / (r * r); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 20 : 90, x1 = w - (ph ? 20 : 40), y = h * .5; const L = x1 - x0, rmax = cfg.atom ? 1000 : 20; const px = (L - 60) / rmax; const c = (x0 + x1) / 2; return { w, h, ph, x0, x1, y, px, c }; },
    pos(S, g) { const d = S.p.r * g.px; return [g.c - d / 2, g.c + d / 2]; },
    update(S, dt) { if (!S.W) return; const k = S.p.r.toFixed(2); if (S._k !== k) { S._k = k; S.trail.push([S.p.r, Math.abs(D.F(S))]); if (S.trail.length > 40) S.trail.shift(); } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, P = D.pos(S, g), F = D.F(S), rep = F > 0, s1 = Math.sign(p.m1), s2 = Math.sign(p.m2); K.bg(ctx, w, h, { benchY: h + 10, bench: false });
      if (p.ruler !== false) Q31.raw(ctx, () => { const yy = g.y + 46; ctx.fillStyle = '#fde68a'; rr(ctx, g.c - 10 * g.px * (cfg.atom ? 50 : 1) - 12, yy, 20 * g.px * (cfg.atom ? 50 : 1) + 24, 26, 5); ctx.fill(); ctx.strokeStyle = '#a16207'; ctx.stroke(); ctx.fillStyle = '#422006'; ctx.font = '700 10px ui-monospace,monospace'; ctx.textAlign = 'center'; const n = cfg.atom ? 10 : 20, st = cfg.atom ? 100 : 1; for (let i = 0; i <= n; i++) { const x = g.c - n / 2 * st * g.px + i * st * g.px; ctx.fillRect(x - .6, yy, 1.2, i % (cfg.atom ? 1 : 5) ? 7 : 12); if (!(i % (cfg.atom ? 2 : 5))) ctx.fillText(String(i * st) , x, yy + 23); } ctx.fillText(cfg.atom ? 'pm' : 'cm', g.c + n / 2 * st * g.px + 18, yy + 23); });
      // r dimension
      Q31.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.4; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(P[0], g.y + 30); ctx.lineTo(P[1], g.y + 30); ctx.stroke(); ctx.setLineDash([]); });
      Q31.T(ctx, 'r = ' + (cfg.atom ? p.r + ' pm' : (p.r / 100) + ' m'), g.c, g.y + 30, { s: 12, w: 900, c: '#fff', bg: '#475569', mono: 1 });
      const rad = q => clamp(16 + 5 * Math.log10(1 + Math.abs(q) * 3), 16, 30);
      Q31.ball(ctx, P[0], g.y, rad(p.m1), s1); Q31.ball(ctx, P[1], g.y, rad(p.m2), s2);
      const qs = (m) => cfg.atom ? (m > 0 ? '+' : '') + m + 'e' : (m > 0 ? '+' : '−') + Math.abs(m) + '×10' + Q31.sup(U[p.u][2]) + ' C';
      Q31.T(ctx, 'q₁ = ' + qs(p.m1), P[0], g.y - 46, { s: 12.5, w: 900, c: '#fff', bg: s1 > 0 ? '#b91c1c' : '#1d4ed8', mono: 1 }); Q31.T(ctx, 'q₂ = ' + qs(p.m2), P[1], g.y - (P[1] - P[0] < 170 ? 70 : 46), { s: 12.5, w: 900, c: '#fff', bg: s2 > 0 ? '#b91c1c' : '#1d4ed8', mono: 1 });
      if (p.vec !== false && F) { const sep = P[1] - P[0]; let L = clamp(30 + 16 * Math.log10(Math.abs(F) / (cfg.atom ? 1e-12 : 1e-8) + 1), 26, g.ph ? 90 : 150); const col = rep ? '#dc2626' : '#16a34a';
        if (rep) { K.force(ctx, P[0] - 24, g.y, -L, 0, null, col, 4.5); K.force(ctx, P[1] + 24, g.y, L, 0, null, col, 4.5); Q31.T(ctx, 'F₂₁', P[0] - 24 - L / 2, g.y - 18, { s: 12, w: 900, c: col }); Q31.T(ctx, 'F₁₂', P[1] + 24 + L / 2, g.y - 18, { s: 12, w: 900, c: col }); }
        else { const yy = g.y + 0; L = Math.min(L, sep / 2 - 4); if (L > 10) { K.force(ctx, P[0], yy, L, 0, null, col, 4); K.force(ctx, P[1], yy, -L, 0, null, col, 4); } Q31.T(ctx, 'F₂₁ →', P[0] - 34, g.y + 22, { s: 12, w: 900, c: col }); Q31.T(ctx, '← F₁₂', P[1] + 34, g.y + 22, { s: 12, w: 900, c: col }); }
        Q31.T(ctx, (rep ? 'قوة تنافر' : 'قوة تجاذب') + ' : ' + Q31.sci(Math.abs(F), 3, 'N'), g.c, g.y - 104, { s: 14, w: 900, c: '#fff', bg: rep ? '#dc2626' : '#16a34a' });
        Q31.T(ctx, 'F₂₁ = − F₁₂ (متساويتان مقداراً ومتعاكستان اتجاهاً)', g.c + (p.gr ? 90 : 0), g.y + 96, { s: 11.5, w: 800, c: '#334155' }); }
      if (p.calc !== false && !cfg.atom) D.calc(ctx, S, g);
      if (cfg.atom && p.calc !== false) Q31.card(ctx, S, [{ t: 'F = 9×10⁹ × (' + p.m1 + '×1.6×10⁻¹⁹)(' + p.m2 + '×1.6×10⁻¹⁹) / (' + p.r + '×10⁻¹²)²', mono: 1 }, { t: 'F = ' + Q31.sci(F, 3, 'N') + ' = ' + Q31.sci(F / 1e-9, 3, 'nN'), w: 900, c: '#1d4ed8', mono: 1 }, { t: 'قوى صغيرة جداً لكنها هائلة بالنسبة لكتلة الإلكترون الصغيرة!' }], { title: 'المقياس الذري', y: 46, wd: 400 });
      if (p.gr) D.drawGraph(ctx, S, g);
      Q31.banner(ctx, w, cfg.banner, cfg.atom ? '#7c3aed' : '#2563eb');
    },
    calc(ctx, S, g) { const p = S.p, e = U[p.u][2], rc = p.r, F = D.F(S); const m = 9 * p.m1 * p.m2, ex = 9 + 2 * e; const r2 = +(rc * rc).toFixed(4);
      const L = [{ t: 'F = k q₁ q₂ / r²', mono: 1, w: 900 }, { t: '= 9×10⁹ × (' + p.m1 + '×10' + Q31.sup(e) + ')(' + p.m2 + '×10' + Q31.sup(e) + ') / (' + (rc / 100) + ')²', mono: 1 }, { t: '= ' + (+m.toFixed(3)) + '×10' + Q31.sup('(9' + e + e + ')') + ' / ' + r2 + '×10⁻⁴', mono: 1 }, { t: '= ' + (+(m / r2).toPrecision(4)) + '×10' + Q31.sup(ex + 4) + ' = ' + Q31.sci(F, 3, 'N'), mono: 1, c: '#1d4ed8', w: 900 }, { t: F > 0 ? 'بما أن القوة موجبة فهي قوة تنافر' : 'بما أن القوة سالبة فهي قوة تجاذب', c: F > 0 ? '#dc2626' : '#16a34a', w: 900 }];
      if (p.pre === 'p1') L.push({ t: 'عكسياً: q² = F r² / k = 9×10⁻⁷ × 10⁻² / 9×10⁹ = 10⁻¹⁸ ⟸ q = 1×10⁻⁹ C', c: '#7c3aed', w: 800 });
      if (p.pre === 'q14') L.push({ t: 'المقدار لم يتغير (d)، تغيّر النوع فقط: صارت قوة تجاذب', c: '#7c3aed', w: 800 });
      if (p.pre === 'q15') L.push({ t: 'اضغط «×2 البعد»: r → 2r ⟸ F₂ = ¼ F₁ (الجواب d)', c: '#7c3aed', w: 800 });
      if (p.pre === 'q17') L.push({ t: 'F_AB = − F_BA (الجواب c) — متساويتان رغم اختلاف الشحنتين', c: '#7c3aed', w: 800 });
      Q31.card(ctx, S, L, { title: 'الحل خطوة بخطوة (الأسس: نجمع عند الضرب ونطرح عند القسمة)', y: g.ph ? 56 : 44, wd: 420, lh: 20 }); },
    drawGraph(ctx, S, g) { const gw = g.ph ? g.w - 40 : Math.min(300, g.w / 2 - 160), gh = 130, gx = g.ph ? 20 : 80, gy = S.H - gh - 64; const rmax = cfg.atom ? 1000 : 20, F0 = Math.abs(9e9 * D.q(S, 0) * D.q(S, 1)) / Math.pow(D.rm(S) / S.p.r, 2); const Fmax = F0 / Math.pow(rmax / 8, 2);
      Q31.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, gx - 10, gy - 24, gw + 20, gh + 44, 10); ctx.fill(); ctx.strokeStyle = '#2563eb'; ctx.stroke(); ctx.strokeStyle = '#334155'; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
        ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 100; i++) { const r = rmax / 8 + (rmax - rmax / 8) * i / 100, F = F0 / (r * r); const x = gx + gw * r / rmax, y = gy + gh - gh * clamp(F / Fmax, 0, 1.05); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
        const r = S.p.r, F = F0 / (r * r), x = gx + gw * r / rmax, y = gy + gh - gh * clamp(F / Fmax, 0, 1.05); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill(); });
      Q31.T(ctx, 'F مقابل r: إذا تضاعف البعد قلّت القوة إلى الربع', gx + gw / 2, gy - 12, { s: 11, w: 900, c: '#1e3a8a' }); Q31.T(ctx, 'r', gx + gw + 4, gy + gh + 12, { s: 11, w: 900 }); Q31.T(ctx, '|F|', gx - 2, gy - 4, { s: 11, w: 900 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = D.pos(S, g); const set = (S, x, i) => { const d = Math.abs(x - (i ? P[0] : P[1])); setParam(S, 'r', d / g.px); };
      return [{ id: 'q2', x: P[1], y: g.y, r: 30, axis: 'x', keep: true, tip: 'اسحب الشحنة لتغيير البعد r', idle: 'غيّر البعد ↔', drag: (S, d) => { const r = clamp((d.x - g.c) * 2 / g.px, cfg.atom ? 100 : 1, cfg.atom ? 1000 : 20); setParam(S, 'r', r); }, wheel: (S, k) => setParam(S, 'm2', S.p.m2 + k) },
        { id: 'q1', x: P[0], y: g.y, r: 30, axis: 'x', keep: true, hint: false, tip: 'اسحب الشحنة الأولى، أو استعمل العجلة لتغيير مقدارها', drag: (S, d) => { const r = clamp((g.c - d.x) * 2 / g.px, cfg.atom ? 100 : 1, cfg.atom ? 1000 : 20); setParam(S, 'r', r); }, wheel: (S, k) => setParam(S, 'm1', S.p.m1 + k) }]; },
    readings(S) { const F = D.F(S); return [rd('q₁', Q31.sci(D.q(S, 0), 3, 'C')), rd('q₂', Q31.sci(D.q(S, 1), 3, 'C')), rd('r', Q31.sci(D.rm(S), 3, 'm')), rd('F', Q31.sci(F, 3, 'N')), rd('نوع القوة', F > 0 ? 'تنافر' : F < 0 ? 'تجاذب' : '—')]; },
    record(S) { return { r: +(D.rm(S)).toPrecision(3), F: +Math.abs(D.F(S)).toPrecision(3), t: D.F(S) > 0 ? 'تنافر' : 'تجاذب' }; },
    cols: [['r', 'البعد r (m)'], ['F', 'مقدار القوة |F| (N)'], ['t', 'النوع']],
    graph: { x: 'r', y: 'F', xl: 'r (m)', yl: '|F| (N)' },
    explain(S) { const F = D.F(S); return cfg.explainHead + ' الآن: <b>' + Q31.sci(Math.abs(F), 3, 'N') + '</b> ' + (F > 0 ? '(تنافر، الشحنتان متشابهتان)' : '(تجاذب، الشحنتان مختلفتان)') + '. القوة التي تؤثر بها الشحنة الأولى في الثانية تساوي القوة التي تؤثر بها الثانية في الأولى مقداراً وتعاكسها اتجاهاً (القانون الثالث لنيوتن).'; } };
    M8.P[D.id] = D; return D; };
  mk({ id: 'g9_cl_lab', page: 20, fig: 'الشكل 24 + مثال ص 21', def: 'ex21', banner: 'قانون كولوم: شحنتان نقطيتان على مسطرة', explainHead: 'القوة الكهربائية بين شحنتين نقطيتين تتناسب طردياً مع حاصل ضرب مقداريهما وعكسياً مع مربع البعد بينهما: F = k q₁q₂/r².',
    desc: 'وجد كولوم أن القوة الكهربائية المتبادلة بين شحنتين نقطيتين ساكنتين تتناسب طردياً مع حاصل ضرب مقداريهما وعكسياً مع مربع البعد بينهما، و k = 9×10⁹ N·m²/C². نحل مثال الكتاب والمسائل على الجهاز نفسه خطوة بخطوة بالأسس.',
    tags: 'قانون كولوم قوة كهربائية شحنتان نقطيتان ثابت كولوم مثال مسائل أسس تنافر تجاذب القانون الثالث لنيوتن',
    tools: ['شحنتان نقطيتان', 'مسطرة'],
    steps: ['اختر من «مثال/سؤال الكتاب»: تُضبط الشحنتان والبعد بقيم الكتاب.', 'اقرأ الحل خطوة بخطوة: نضرب المعاملات ونجمع الأسس، ثم نقسم على مربع البعد ونطرح الأسس.', 'اسحب الشحنة الثانية لتغيير البعد، أو غيّر المقادير والإشارات.', 'لاحظ أن F₁₂ = F₂₁ مقداراً ومتعاكستان اتجاهاً دائماً.'],
    concl: ['F = k q₁ q₂ / r² ، k = 9×10⁹ N·m²/C² في الفراغ.', 'مثال الكتاب: F = 9×10⁹ × 4×10⁻⁶ × 9×10⁻⁶ / (0.06)² = 90 N تنافر.', 'المسألة 1: q = 1×10⁻⁹ C ، المسألة 2: F = 3.24×10⁻⁵ N.', 'القوة الموجبة تنافر والسالبة تجاذب، و F₂₁ = −F₁₂.'] });
  mk({ id: 'g9_cl_inv', page: 26, fig: 'س1-4 ، س1-5', def: 'q15', only: ['q14', 'q15', 'ex21', 'free'], graph: true, banner: 'التناسب: F ∝ q₁q₂ و F ∝ 1/r²', explainHead: 'إذا تضاعف البعد قلت القوة إلى الربع، وإذا تضاعفت إحدى الشحنتين تضاعفت القوة، وتغيير إشارة شحنة يغيّر نوع القوة لا مقدارها.',
    desc: 'نستكشف التناسب في قانون كولوم: ضاعف البعد فتقل القوة إلى الربع (س1-5)، اعكس إشارة شحنة فيبقى المقدار نفسه ويتغير النوع (س1-4)، ضاعف شحنة فتتضاعف القوة. المنحني F–r يُرسم أمامك.',
    tags: 'تناسب عكسي مربع البعد منحني القوة البعد سؤال 4 سؤال 5',
    tools: ['شحنتان نقطيتان', 'مسطرة'],
    steps: ['اختر س1-5: موجبة وسالبة على بعد 3 cm، اقرأ F₁.', 'اضغط «×2 البعد»: صار البعد 6 cm. قارن F₂ بـ F₁ (ربعها).', 'اختر س1-4 واضغط «± اعكس q₂»: المقدار نفسه، النوع تغيّر.', 'اضغط «×2 الشحنة q₁» ولاحظ تضاعف القوة. سجّل القراءات (📋) وارسم F مقابل r.'],
    concl: ['F ∝ 1/r²: مضاعفة البعد تقلل القوة إلى الربع (س1-5: F₂ = ¼F₁).', 'استبدال شحنة بأخرى سالبة بالمقدار نفسه لا يغير مقدار القوة (س1-4: d).', 'F ∝ q₁q₂: مضاعفة إحدى الشحنتين تضاعف القوة.'] });
  mk({ id: 'g9_cl_atom', page: 20, fig: '➕ من المختبرات العالمية', atom: true, banner: '➕ من المختبرات العالمية: قانون كولوم بالمقياس الذري', explainHead: '➕ (فكرة PhET «قانون كولوم»: المقياس الذري) القانون نفسه يصف قوى الجذب بين النواة والإلكترونات وبين الأيونات.',
    desc: '➕ من المختبرات العالمية: القانون نفسه بالمقياس الذري — شحنات بوحدة e (1.6×10⁻¹⁹ C) وأبعاد بالبيكومتر (1 pm = 10⁻¹² m)، كقوة الجذب بين أيون الصوديوم الموجب وأيون الكلور السالب.',
    tags: 'قانون كولوم مقياس ذري أيونات بيكومتر PhET',
    tools: ['أيونان'], steps: ['غيّر الشحنتين بعدد شحنات e (موجبة أو سالبة).', 'اسحب الأيون لتغيير البعد بالبيكومتر.', 'لاحظ القوة بالنانونيوتن.'], concl: ['قانون كولوم يعمل في كل المقاييس، من الذرات إلى الأجسام الكبيرة.'] });
})();
/* =============== E7 — المجال الكهربائي (9-1، ص 22–24، س7، المسألة 3) =============== */
const Q31F = { // cached field-line drawing for a list of point charges [{x,y,q}]
  draw(ctx, S, chs, b, o = {}) { const key = chs.map(c => c.x.toFixed(0) + ',' + c.y.toFixed(0) + ',' + c.q).join('|') + '|' + b.x1 + 'x' + b.y1 + (o.per || 10); if (S._lk !== key) { S._lk = key; S._ln = Q31.lines(chs, b, o.per || 10, 16); } Q31.drawLines(ctx, S._ln, o.col || '#ea580c', 1.6, true); },
  grid(ctx, chs, b, step = 44, sc = 1) { for (let x = b.x0 + step / 2; x < b.x1; x += step) for (let y = b.y0 + step / 2; y < b.y1; y += step) { if (chs.some(c => Math.hypot(x - c.x, y - c.y) < 22)) continue; const [ex, ey] = Q31.E(chs, x, y); const m = Math.hypot(ex, ey); if (!m) continue; const a = clamp(Math.sqrt(m * sc) * 30, .08, 1), L = 16; Q31.raw(ctx, () => { ctx.globalAlpha = a; G.arrow(ctx, x - ex / m * L / 2, y - ey / m * L / 2, x + ex / m * L / 2, y + ey / m * L / 2, '#ea580c', 2, 6); ctx.globalAlpha = 1; }); } }
};
(() => {
  const D = { id: 'g9_f_test', page: 22, fig: 'الشكل 25 (a, b)',
    desc: 'الشحنة النقطية تحدث في الحيز المحيط بها تأثيراً يعرف بالمجال الكهربائي، ويُختبر المجال عند أي نقطة بشحنة صغيرة موجبة تسمى شحنة الاختبار q′ توضع فيها وتقاس القوة المؤثرة فيها: E = F / q′.',
    tags: 'مجال كهربائي شحنة اختبار شحنة نقطية خطوط القوى موجبة سالبة E=F/q',
    tools: ['شحنة نقطية (+q أو −q)', 'شحنة اختبار صغيرة موجبة q′'],
    steps: ['اختر الشحنة المولدة للمجال: موجبة (+q) كالشكل 25-a أو سالبة (−q) كالشكل 25-b.', 'اسحب شحنة الاختبار q′ إلى أي نقطة ولاحظ سهم القوة المؤثرة فيها.', 'قرّبها وأبعدها: كيف يتغير مقدار المجال؟', 'غيّر مقدار شحنة الاختبار q′: تتغير القوة F لكن المجال E = F/q′ يبقى ثابتاً عند النقطة نفسها.'],
    concl: ['المجال الكهربائي عند نقطة: القوة الكهربائية لوحدة الشحنة المؤثرة في شحنة اختبار صغيرة موجبة موضوعة فيها: E = F/q′ ووحدته N/C.', 'حول الشحنة الموجبة تتجه خطوط المجال إلى الخارج (مبتعدة)، وحول السالبة تتجه إلى الداخل (نحوها).', 'يقوى المجال قرب الشحنة ويضعف بالابتعاد عنها (تتقارب الخطوط قربها).'],
    laws: ['g9_E'],
    controls: [SEL('sg', 'الشحنة المولدة', [['+', '+q (الشكل 25-a)'], ['-', '−q (الشكل 25-b)']], '+'), R('Q', 'مقدار q', 1, 9, 4, 1, 'nC'), R('qt', 'شحنة الاختبار q′', .1, 1, .2, .1, 'nC'),
      TG('ln', 'خطوط المجال', true, null, 'efield'), TG('gr', 'شبكة متجهات المجال', false, null, 'vector'), TG('fv', 'سهم القوة على q′', true, null, 'force')],
    setup(S) { S.tp = null; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600; return { w, h, ph, cx: ph ? w / 2 : Q31.cx(w) - 40, cy: h * .52, pxcm: 22, b: { x0: ph ? 0 : 64, y0: 30, x1: w, y1: h } }; },
    phys(S, g) { const dx = S.tp[0] - g.cx, dy = S.tp[1] - g.cy, rcm = Math.max(Math.hypot(dx, dy) / g.pxcm, .5), r = rcm / 100; const q = S.p.Q * 1e-9 * (S.p.sg === '+' ? 1 : -1), qt = S.p.qt * 1e-9; const E = 9e9 * Math.abs(q) / (r * r), F = E * qt; return { r, rcm, E, F, ux: dx / (Math.hypot(dx, dy) || 1) * Math.sign(q), uy: dy / (Math.hypot(dx, dy) || 1) * Math.sign(q) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, sgn = p.sg === '+' ? 1 : -1; K.bg(ctx, w, h, { benchY: h + 10, bench: false }); if (!S.tp) S.tp = [g.cx + 150, g.cy - 90];
      const chs = [{ x: g.cx, y: g.cy, q: sgn }];
      if (p.gr) Q31F.grid(ctx, chs, g.b, 44, 400); if (p.ln !== false) Q31F.draw(ctx, S, chs, g.b, { per: 16, col: sgn > 0 ? '#dc2626' : '#2563eb' });
      Q31.ball(ctx, g.cx, g.cy, 24, sgn, (sgn > 0 ? '+' : '−') + p.Q + ' nC');
      const P = D.phys(S, g); Q31.ball(ctx, S.tp[0], S.tp[1], 11, 1); Q31.T(ctx, 'q′', S.tp[0] + 18, S.tp[1] - 16, { s: 13, w: 900, c: '#ca8a04' });
      if (p.fv !== false) { const L = clamp(20 * Math.log10(P.F / 1e-8 + 1) + 20, 22, 130); K.force(ctx, S.tp[0] + P.ux * 13, S.tp[1] + P.uy * 13, P.ux * L, P.uy * L, 'F', '#16a34a', 3.5); }
      Q31.card(ctx, S, [{ t: 'r = ' + P.rcm.toFixed(1) + ' cm', mono: 1 }, { t: 'F = ' + Q31.sci(P.F, 3, 'N'), mono: 1, c: '#16a34a' }, { t: 'E = F / q′ = ' + Q31.sci(P.F, 3) + ' / ' + Q31.sci(p.qt * 1e-9, 2) + ' = ' + Q31.sci(P.E, 3, 'N/C'), mono: 1, c: '#ea580c', w: 900 }, { t: 'اتجاه المجال: ' + (sgn > 0 ? 'مبتعداً عن الشحنة الموجبة' : 'نحو الشحنة السالبة') }], { title: 'شحنة الاختبار تقيس المجال', y: 44, wd: 360 });
      Q31.banner(ctx, w, 'المجال الكهربائي وشحنة الاختبار (الشكل 25)', '#ea580c');
    },
    drags(S) { if (!S.W || !S.tp) return []; const g = D.geo(S); return [{ id: 'test', x: S.tp[0], y: S.tp[1], r: 24, axis: 'xy', keep: true, tip: 'اسحب شحنة الاختبار', idle: 'حرّك شحنة الاختبار ✋', drag: (S, d) => { let x = clamp(d.ox + d.x - d.sx, (g.ph ? 10 : 74), S.W - 10), y = clamp(d.oy + d.y - d.sy, 40, S.H - 30); const dx = x - g.cx, dy = y - g.cy, L = Math.hypot(dx, dy); if (L < 40) { x = g.cx + dx / (L || 1) * 40; y = g.cy + dy / (L || 1) * 40; } S.tp = [x, y]; } }]; },
    readings(S) { if (!S.tp) return []; const P = D.phys(S, D.geo(S)); return [rd('البعد r', P.rcm.toFixed(1) + ' cm'), rd('القوة F على q′', Q31.sci(P.F, 3, 'N')), rd('المجال E = F/q′', Q31.sci(P.E, 3, 'N/C'))]; },
    explain(S) { return 'الشحنة ' + (S.p.sg === '+' ? 'الموجبة' : 'السالبة') + ' تولّد مجالاً حولها. نضع شحنة اختبار صغيرة <b>موجبة</b> q′ فتتأثر بقوة ' + (S.p.sg === '+' ? 'تنافر (مبتعدة)' : 'تجاذب (نحو الشحنة)') + '. اتجاه المجال هو اتجاه هذه القوة، ومقداره E = F/q′. جرّب تغيير q′: تتغير F لكن E لا يتغير، لأنه صفة للنقطة لا لشحنة الاختبار.'; }
  };
  M8.P[D.id] = D;
})();
(() => {
  const D = { id: 'g9_f_two', page: 23, fig: 'الشكل 26 (a, b)',
    desc: 'يمثل المجال الكهربائي بخطوط قوى (غير مرئية) تبدأ من الشحنة الموجبة وتنتهي بالشحنة السالبة. الشكل 26-a: المجال بين شحنتين نقطيتين متشابهتين، والشكل 26-b: بين شحنتين مختلفتين.',
    tags: 'خطوط المجال شحنتان متشابهتان مختلفتان تبدأ من الموجبة تنتهي بالسالبة',
    tools: ['شحنتان نقطيتان'],
    steps: ['اختر: شحنتان متشابهتان (26-a) أو مختلفتان (26-b).', 'اسحب الشحنتين وراقب خطوط المجال تتغير.', 'في المتشابهتين لاحظ منطقة بينهما بلا خطوط (المجال فيها ضعيف)، وفي المختلفتين لاحظ الخطوط تخرج من + وتدخل في −.', 'فعّل شبكة المتجهات وحرّك شحنة الاختبار لترى اتجاه المجال في كل نقطة.'],
    concl: ['خطوط المجال تبدأ من الشحنة الموجبة وتنتهي بالسالبة، ولا تتقاطع.', 'بين شحنتين متشابهتين تتنافر الخطوط وتوجد نقطة متعادلة بينهما.', 'بين شحنتين مختلفتين تتجه الخطوط من الموجبة إلى السالبة.'],
    laws: ['g9_E'],
    controls: [SEL('k', 'الشحنتان', [['same', 'متشابهتان (26-a)'], ['diff', 'مختلفتان (26-b)']], 'same'), SEL('s1', 'إشارة المتشابهتين', [['+', 'موجبتان'], ['-', 'سالبتان']], '+'), R('rat', 'نسبة q₂ إلى q₁', .5, 3, 1, .5, ''),
      TG('ln', 'خطوط المجال', true, null, 'efield'), TG('gr', 'شبكة متجهات المجال', false, null, 'vector'), TG('tst', 'شحنة اختبار', false, null, 'charges')],
    setup(S) { S.c = null; S.tp = null; },
    chs(S) { const s1 = S.p.k === 'diff' ? 1 : (S.p.s1 === '+' ? 1 : -1), s2 = S.p.k === 'diff' ? -1 : s1; return [{ x: S.c[0][0], y: S.c[0][1], q: s1 }, { x: S.c[1][0], y: S.c[1][1], q: s2 * S.p.rat }]; },
    draw(ctx, w, h, S) {
      const ph = w < 600, cx = ph ? w / 2 : Q31.cx(w), cy = h * .5, b = { x0: ph ? 0 : 64, y0: 30, x1: w, y1: h }; K.bg(ctx, w, h, { benchY: h + 10, bench: false });
      if (!S.c) S.c = [[cx - (ph ? 80 : 130), cy], [cx + (ph ? 80 : 130), cy]]; if (!S.tp) S.tp = [cx, cy - 120];
      const C = D.chs(S); if (S.p.gr) Q31F.grid(ctx, C, b, 40, 300); if (S.p.ln !== false) Q31F.draw(ctx, S, C, b, { per: 10, col: '#ea580c' });
      C.forEach((c, i) => Q31.ball(ctx, c.x, c.y, 22, Math.sign(c.q), 'q' + (i ? '₂' : '₁')));
      if (S.p.tst) { const [ex, ey] = Q31.E(C, S.tp[0], S.tp[1]), m = Math.hypot(ex, ey) || 1; Q31.ball(ctx, S.tp[0], S.tp[1], 9, 1); K.force(ctx, S.tp[0] + ex / m * 11, S.tp[1] + ey / m * 11, ex / m * clamp(Math.sqrt(m) * 900, 10, 90), ey / m * clamp(Math.sqrt(m) * 900, 10, 90), 'F', '#16a34a', 3); }
      Q31.banner(ctx, w, S.p.k === 'same' ? 'المجال بين شحنتين متشابهتين (الشكل 26-a)' : 'المجال بين شحنتين مختلفتين (الشكل 26-b)', '#ea580c');
      Q31.T(ctx, 'الخطوط تبدأ من + وتنتهي بـ −', cx, h - 80, { s: 12, w: 900, c: '#fff', bg: '#ea580c' });
    },
    drags(S) { if (!S.c) return []; const L = S.c.map((c, i) => ({ id: 'c' + i, x: c[0], y: c[1], r: 28, axis: 'xy', keep: true, tip: 'اسحب الشحنة', idle: i ? undefined : 'حرّك الشحنة ✋', drag: (S, d) => { S.c[i] = [clamp(d.ox + d.x - d.sx, S.W < 600 ? 20 : 90, S.W - 20), clamp(d.oy + d.y - d.sy, 60, S.H - 50)]; } }));
      if (S.p.tst) L.push({ id: 'tp', x: S.tp[0], y: S.tp[1], r: 20, axis: 'xy', keep: true, hint: false, tip: 'اسحب شحنة الاختبار', drag: (S, d) => { S.tp = [d.ox + d.x - d.sx, d.oy + d.y - d.sy]; } }); return L; },
    readings(S) { if (!S.c) return []; return [rd('الشحنتان', S.p.k === 'same' ? 'متشابهتان: تتنافران' : 'مختلفتان: تتجاذبان'), rd('البعد بينهما', (Math.hypot(S.c[0][0] - S.c[1][0], S.c[0][1] - S.c[1][1]) / 40).toFixed(1) + ' cm')]; },
    explain(S) { return S.p.k === 'same' ? 'الشحنتان المتشابهتان: الخطوط تخرج من كلتيهما (إذا كانتا موجبتين) أو تدخل فيهما (إذا كانتا سالبتين)، وتنحني مبتعدة عن بعضها، وفي منتصف المسافة نقطة يكون المجال فيها صفراً.' : 'الشحنتان المختلفتان: الخطوط تبدأ من الموجبة وتنتهي بالسالبة، وتتركز بينهما حيث المجال قوي.'; }
  };
  M8.P[D.id] = D;
})();
(() => {
  const PR = { free: ['حر', null], ex24: ['مثال ص24: q′ = +2×10⁻⁹ C ، F = 4×10⁻⁶ N', [2, -9, 2, 3]], p3: ['المسألة 3: q′ = +3 μC ، E = 4×10⁶ N/C', [3, -6, 4, 6]] };
  const D = { id: 'g9_f_plates', page: 24, fig: 'الشكل 27 + مثال ص 24 + المسألة 3',
    desc: 'المجال الكهربائي المنتظم: يتولد بين لوحين معدنيين مستويين متوازيين مشحونين بشحنتين متساويتين مقداراً ومختلفتين في النوع، فتكون خطوطه متوازية ومتساوية الأبعاد وعمودية على اللوحين (ثابت المقدار والاتجاه في جميع نقاطه).',
    tags: 'مجال منتظم لوحان متوازيان مثال مسألة E=F/q F=qE',
    tools: ['لوحان معدنيان متوازيان', 'شحنة اختبار'],
    steps: ['شاهد خطوط المجال بين اللوحين: متوازية ومتساوية الأبعاد ومن اللوح الموجب إلى السالب.', 'اسحب شحنة الاختبار إلى أي نقطة بين اللوحين: القوة نفسها في كل مكان!', 'اختر «مثال ص24»: احسب E = F/q′ خطوة بخطوة.', 'اختر «المسألة 3»: احسب F = q′E.'],
    concl: ['المجال بين لوحين متوازيين مشحونين منتظم: ثابت المقدار والاتجاه.', 'مثال ص24: E = 4×10⁻⁶ ÷ 2×10⁻⁹ = 2×10³ N/C.', 'المسألة 3: F = q′E = 3×10⁻⁶ × 4×10⁶ = 12 N.'],
    laws: ['g9_E'],
    controls: [SEL('pre', 'مثال/مسألة الكتاب', Object.keys(PR).map(k => [k, PR[k][0]]), 'ex24', (v, S) => D.load(S)), R('qm', 'q′ (المعامل)', 1, 9, 2, .5, ''), SEL('qe', 'أس q′', [['-9', '×10⁻⁹ C'], ['-6', '×10⁻⁶ C']], '-9'), R('Em', 'E (المعامل)', 1, 9, 2, .5, ''), SEL('Ee', 'أس E', [['3', '×10³ N/C'], ['6', '×10⁶ N/C']], '3'),
      TG('ln', 'خطوط المجال', true, null, 'efield'), TG('fv', 'سهم القوة', true, null, 'force'), TG('calc', 'خطوات الحل', true, null, 'labels')],
    setup(S) { S.tp = null; D.load(S); },
    load(S) { const P = PR[S.p.pre]; if (!P || !P[1]) return; setParam(S, 'qm', P[1][0]); setParam(S, 'qe', String(P[1][1])); setParam(S, 'Em', P[1][2]); setParam(S, 'Ee', String(P[1][3])); },
    vals(S) { const q = S.p.qm * Math.pow(10, +S.p.qe), E = S.p.Em * Math.pow(10, +S.p.Ee); return { q, E, F: q * E }; },
    draw(ctx, w, h, S) {
      const ph = w < 600, x0 = ph ? 40 : 120, x1 = ph ? w - 40 : Math.min(w - 60, x0 + 420), y0 = h * (ph ? .38 : .3), y1 = h * .86; K.bg(ctx, w, h, { benchY: h + 10, bench: false }); if (!S.tp) S.tp = [(x0 + x1) / 2, (y0 + y1) / 2];
      Q31.raw(ctx, () => { const pg = ctx.createLinearGradient(x0 - 16, 0, x0, 0); pg.addColorStop(0, '#991b1b'); pg.addColorStop(1, '#ef4444'); ctx.fillStyle = pg; ctx.fillRect(x0 - 16, y0, 16, y1 - y0); const ng = ctx.createLinearGradient(x1, 0, x1 + 16, 0); ng.addColorStop(0, '#3b82f6'); ng.addColorStop(1, '#1e3a8a'); ctx.fillStyle = ng; ctx.fillRect(x1, y0, 16, y1 - y0); });
      for (let k = 0; k < 9; k++) { const y = y0 + 14 + k * (y1 - y0 - 28) / 8; Q31.sg(ctx, x0 - 8, y, 1, 6); Q31.sg(ctx, x1 + 8, y, -1, 6); if (S.p.ln !== false) { Q31.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x0 + 4, y); ctx.lineTo(x1 - 4, y); ctx.stroke(); }); Q26.head(ctx, (x0 + x1) / 2 + 30, y, 0, '#334155', 8); } }
      Q31.T(ctx, 'لوح موجب الشحنة', x0 - 8, y0 - 16, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' }); Q31.T(ctx, 'لوح سالب الشحنة', x1 + 8, y0 - 16, { s: 11, w: 900, c: '#fff', bg: '#1d4ed8' });
      const V = D.vals(S), inside = S.tp[0] > x0 && S.tp[0] < x1 && S.tp[1] > y0 && S.tp[1] < y1; Q31.ball(ctx, S.tp[0], S.tp[1], 12, 1); Q31.T(ctx, 'q′', S.tp[0], S.tp[1] - 22, { s: 12, w: 900, c: '#ca8a04' });
      if (S.p.fv !== false && inside) { K.force(ctx, S.tp[0] + 13, S.tp[1], 70, 0, 'F', '#16a34a', 4); K.force(ctx, S.tp[0] + 13, S.tp[1] + 26, 50, 0, 'E', '#ea580c', 3); }
      if (S.p.calc !== false) { const qs = Q31.sci(V.q, 3, 'C'), Es = Q31.sci(V.E, 3, 'N/C'), Fs = Q31.sci(V.F, 3, 'N'); let L;
        if (S.p.pre === 'p3') L = [{ t: 'المعطيات: q′ = ' + qs + ' ، E = ' + Es }, { t: 'F = q′ E', mono: 1, w: 900 }, { t: '= ' + S.p.qm + '×10' + Q31.sup(S.p.qe) + ' × ' + S.p.Em + '×10' + Q31.sup(S.p.Ee), mono: 1 }, { t: '= ' + (S.p.qm * S.p.Em) + '×10' + Q31.sup('(' + S.p.qe + '+' + S.p.Ee + ')') + ' = ' + Fs, mono: 1, c: '#16a34a', w: 900 }, { t: 'عند الضرب نجمع الأسس', c: '#7c3aed' }];
        else L = [{ t: 'المعطيات: q′ = ' + qs + ' ، F = ' + Fs }, { t: 'E = F / q′', mono: 1, w: 900 }, { t: '= ' + Q31.sci(V.F, 3) + ' / ' + Q31.sci(V.q, 3), mono: 1 }, { t: '= ' + (+(V.F / V.q / Math.pow(10, Math.floor(Math.log10(V.F / V.q) + 1e-9))).toPrecision(3)) + '×10' + Q31.sup(Math.floor(Math.log10(V.F / V.q) + 1e-9)) + ' N/C', mono: 1, c: '#ea580c', w: 900 }, { t: 'عند القسمة نطرح الأسس', c: '#7c3aed' }];
        Q31.card(ctx, S, L, { title: PR[S.p.pre][0], y: 44, wd: 360 }); }
      Q31.T(ctx, inside ? 'داخل اللوحين: F = ' + Q31.sci(V.F, 3, 'N') + ' (ثابتة في كل النقاط)' : 'خارج اللوحين: المجال يكاد يكون صفراً', (x0 + x1) / 2, y1 + 24, { s: 12, w: 900, c: '#fff', bg: inside ? '#15803d' : '#64748b' });
      Q31.banner(ctx, w, 'المجال الكهربائي المنتظم (الشكل 27)', '#ea580c');
    },
    drags(S) { if (!S.tp) return []; return [{ id: 'test', x: S.tp[0], y: S.tp[1], r: 24, axis: 'xy', keep: true, tip: 'اسحب شحنة الاختبار بين اللوحين', idle: 'حرّك q′ ✋', drag: (S, d) => { S.tp = [clamp(d.ox + d.x - d.sx, 80, S.W - 20), clamp(d.oy + d.y - d.sy, 60, S.H - 30)]; } }]; },
    readings(S) { const V = D.vals(S); return [rd('q′', Q31.sci(V.q, 3, 'C')), rd('E', Q31.sci(V.E, 3, 'N/C')), rd('F = q′E', Q31.sci(V.F, 3, 'N'))]; },
    explain(S) { return 'بين اللوحين المتوازيين المشحونين بشحنتين متساويتين ومختلفتين: الخطوط <b>متوازية ومتساوية الأبعاد وعمودية على اللوحين</b>، فالمجال <b>منتظم</b>: القوة على شحنة الاختبار نفسها في كل مكان بين اللوحين. E = F/q′ و F = q′E.'; }
  };
  M8.P[D.id] = D;
})();
/* ---- E7 part 4: س7 — اكتب نوع الشحنة في الأشكال (ص 29) ---- */
(() => {
  const PICS = [[{ x: 0, y: 0, q: 1 }], [{ x: 0, y: 0, q: -1 }], [{ x: -.32, y: 0, q: 1 }, { x: .32, y: 0, q: -1 }], [{ x: -.32, y: 0, q: 1 }, { x: .32, y: 0, q: 1 }]]; // same arrangement as the book (p 29): top-right, top-left, bottom-right, bottom-left
  const D = { id: 'g9_f_q7', page: 29, fig: 'س7',
    desc: 'سؤال 7: اكتب نوع الشحنة في الأشكال التالية — نقرأ اتجاه أسهم خطوط المجال: الخارجة من الشحنة تعني موجبة، والداخلة إليها تعني سالبة.',
    tags: 'سؤال 7 نوع الشحنة خطوط المجال اختبار',
    tools: ['أربعة أشكال لخطوط المجال'],
    steps: ['انظر إلى اتجاه الأسهم على خطوط المجال حول كل شحنة «؟».', 'اضغط على كل شحنة لتختار: + أو −.', 'اضغط «تحقّق».'],
    concl: ['الخطوط تبدأ من الشحنة الموجبة (تخرج منها) وتنتهي بالسالبة (تدخل فيها).'],
    controls: [BT('', [{ t: '✓ تحقّق', on: S => { S.chk = 1; const ok = D.all(S); if (ok) K.cheer(S, S.W / 2, S.H * .4); } }, { t: '↺ امسح', on: S => { S.g = PICS.map(p => p.map(() => 0)); S.chk = 0; } }])],
    setup(S) { S.g = PICS.map(p => p.map(() => 0)); S.chk = 0; S.L = []; },
    all(S) { return PICS.every((p, i) => p.every((c, j) => S.g[i][j] === c.q)); },
    cell(S, i) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 6 : 70, cw = (w - x0 - 8) / 2, ch = (h - 90) / 2; const c = i % 2, r = i / 2 | 0; return { x: x0 + cw * (1 - c), y: 50 + ch * r, w: cw, h: ch }; },
    draw(ctx, w, h, S) {
      K.bg(ctx, w, h, { benchY: h + 10, bench: false });
      PICS.forEach((p, i) => { const C = D.cell(S, i), cx = C.x + C.w / 2, cy = C.y + C.h / 2, sc = Math.min(C.w, C.h) * .9; const chs = p.map(c => ({ x: cx + c.x * sc, y: cy + c.y * sc, q: c.q }));
        Q31.raw(ctx, () => { ctx.fillStyle = '#fffbeb'; rr(ctx, C.x + 4, C.y + 4, C.w - 8, C.h - 8, 10); ctx.fill(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.save(); ctx.beginPath(); rr(ctx, C.x + 4, C.y + 4, C.w - 8, C.h - 8, 10); ctx.clip(); });
        const key = i + '|' + w + 'x' + h; if (!S.L[i] || S.L[i].k !== key) S.L[i] = { k: key, l: Q31.lines(chs, { x0: C.x, y0: C.y, x1: C.x + C.w, y1: C.y + C.h }, 12, 14) };
        Q31.drawLines(ctx, S.L[i].l, '#f59e0b', 1.6, true); Q31.raw(ctx, () => ctx.restore());
        chs.forEach((c, j) => { const gs = S.g[i][j]; Q31.raw(ctx, () => { ctx.fillStyle = gs ? (gs > 0 ? '#ef4444' : '#2563eb') : '#93c5fd'; ctx.beginPath(); ctx.arc(c.x, c.y, 13, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); }); Q31.T(ctx, gs ? (gs > 0 ? '+' : '−') : '؟', c.x, c.y, { s: 15, w: 900, c: '#fff' });
          if (S.chk) Q31.T(ctx, gs === c.q ? '✓' : '✗', c.x + 18, c.y - 18, { s: 15, w: 900, c: gs === c.q ? '#15803d' : '#dc2626' }); });
        Q31.T(ctx, '(' + (i + 1) + ')', C.x + 22, C.y + 20, { s: 12, w: 900, c: '#92400e' }); });
      if (S.chk) Q31.T(ctx, D.all(S) ? 'أحسنت! كل الإجابات صحيحة 🎉' : 'راجع الأسهم: الخارجة ⟸ موجبة ، الداخلة ⟸ سالبة', Q31.cx(w), h - 24, { s: 13, w: 900, c: '#fff', bg: D.all(S) ? '#15803d' : '#dc2626' });
      Q31.banner(ctx, w, 'س7: اكتب نوع الشحنة (اضغط كل «؟»)', '#ea580c'); K.party(ctx, S);
    },
    drags(S) { if (!S.W) return []; const L = []; PICS.forEach((p, i) => { const C = D.cell(S, i), cx = C.x + C.w / 2, cy = C.y + C.h / 2, sc = Math.min(C.w, C.h) * .9; p.forEach((c, j) => L.push({ id: 'q' + i + j, x: cx + c.x * sc, y: cy + c.y * sc, r: 22, tip: 'اضغط لتغيير الإجابة (+ / −)', hint: i === 0 && j === 0, click: S => { S.g[i][j] = S.g[i][j] === 1 ? -1 : 1; S.chk = 0; } })); }); return L; },
    readings(S) { const n = PICS.reduce((a, p, i) => a + p.filter((c, j) => S.g[i][j] === c.q).length, 0); return [rd('إجابات صحيحة', n + ' / 6')]; },
    explain(S) { return 'القاعدة: خطوط المجال <b>تخرج من الموجبة</b> و<b>تدخل في السالبة</b>.' + (S.chk ? ' الأشكال مرتبة كما في الكتاب (ص 29): (1) أعلى اليمين: الأسهم خارجة ⟸ موجبة. (2) أعلى اليسار: داخلة ⟸ سالبة. (3) أسفل اليمين: الخطوط تخرج من اليسرى وتدخل في اليمنى ⟸ اليسرى موجبة واليمنى سالبة (مختلفتان تتجاذبان). (4) أسفل اليسار: الخطوط تخرج من كلتيهما وتتنافر ⟸ موجبتان متشابهتان.' : ' اضغط كل «؟» لتختار + أو −، ثم اضغط «تحقّق» لترى الجواب والتفسير.'); }
  };
  M8.P[D.id] = D;
})();
/* ---- E7 part 5: ➕ PhET-style «الشحنات والمجالات» sandbox ---- */
(() => {
  const D = { id: 'g9_f_phet', page: 22, fig: '➕ من المختبرات العالمية',
    desc: '➕ من المختبرات العالمية (فكرة PhET «الشحنات والمجالات»): اسحب شحنات موجبة وسالبة من الصندوقين إلى المسرح، شاهد متجهات المجال وخطوطه، واستعمل مجس المجال لقياس E عند أي نقطة.',
    tags: 'شحنات ومجالات PhET متجهات المجال مجس صندوق شحنات',
    tools: ['شحنات +1 nC و −1 nC', 'مجس المجال الكهربائي'],
    steps: ['اسحب شحنة من صندوق (+) أو (−) إلى المسرح.', 'أضف عدة شحنات وحرّكها؛ أعد أي شحنة إلى الصندوق لحذفها.', 'اسحب المجس (الدائرة الصفراء) لقياس مقدار المجال واتجاهه.', 'جرّب ترتيبات: ثنائي القطب، شحنتان متشابهتان، صف من الشحنات (يشبه اللوح).'],
    concl: ['المجال الكلي عند نقطة هو مجموع مجالات كل الشحنات (متجهياً).', 'صف من الشحنات الموجبة مقابل صف سالب يعطي مجالاً شبه منتظم بينهما.'],
    controls: [TG('gr', 'متجهات المجال', true, null, 'vector'), TG('ln', 'خطوط المجال', false, null, 'efield'), TG('vals', 'القيم', true, null, 'labels'), BT('', [{ t: '🗑 امسح الكل', on: S => { S.c = []; } }, { t: '⇆ ثنائي قطب', on: S => D.dip(S) }, { t: '▤ صفّان (لوحان)', on: S => D.rows(S) }])],
    setup(S) { S.c = []; S.probe = null; S.inited = 0; },
    dip(S) { const cx = Q31.cx(S.W), cy = S.H * .45; S.c = [{ x: cx - 100, y: cy, q: 1 }, { x: cx + 100, y: cy, q: -1 }]; },
    rows(S) { const cx = Q31.cx(S.W), cy = S.H * .45; S.c = []; for (let k = -3; k <= 3; k++) { S.c.push({ x: cx - 110, y: cy + k * 32, q: 1 }); S.c.push({ x: cx + 110, y: cy + k * 32, q: -1 }); } },
    bins(S) { const w = S.W, h = S.H, y = h - 72; return w < 600 ? [{ x: 70, y: y - 40, q: 1 }, { x: w - 70, y: y - 40, q: -1 }] : [{ x: Math.max(w / 2 + 150, w - 300), y, q: 1 }, { x: Math.max(w / 2 + 150, w - 300) + 128, y, q: -1 }]; },
    E(S, x, y) { const ch = S.c.map(c => ({ x: c.x, y: c.y, q: c.q })); return Q31.E(ch, x, y); },
    draw(ctx, w, h, S) {
      const ph = w < 600, b = { x0: ph ? 0 : 64, y0: 34, x1: w, y1: h - 110 }; Q31.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, w, h); }); if (!S.inited && S.W) { S.inited = 1; D.dip(S); } if (!S.probe) S.probe = [Q31.cx(w), h * .2];
      if (S.p.gr !== false && S.c.length) Q31F.grid(ctx, S.c, b, 36, 600); if (S.p.ln && S.c.length) Q31F.draw(ctx, S, S.c, b, { per: 8, col: '#fbbf24' });
      S.c.forEach(c => Q31.ball(ctx, c.x, c.y, 15, c.q));
      D.bins(S).forEach(B => { Q31.raw(ctx, () => { ctx.fillStyle = '#1e293b'; rr(ctx, B.x - 56, B.y - 26, 112, 52, 10); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.stroke(); }); for (let k = 0; k < 4; k++) Q31.ball(ctx, B.x - 36 + k * 24, B.y, 10, B.q); Q31.T(ctx, B.q > 0 ? '+1 nC' : '−1 nC', B.x, B.y + 38, { s: 11, w: 900, c: '#e2e8f0' }); });
      // probe
      const [ex, ey] = D.E(S, S.probe[0], S.probe[1]), m = Math.hypot(ex, ey); const Ev = m * 9e9 * 1e-9 * Math.pow(100 / 2.5, 2) * 1e-0; // px scale: 25 px = 1 cm
      Q31.raw(ctx, () => { ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(S.probe[0], S.probe[1], 14, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(S.probe[0] - 6, S.probe[1]); ctx.lineTo(S.probe[0] + 6, S.probe[1]); ctx.moveTo(S.probe[0], S.probe[1] - 6); ctx.lineTo(S.probe[0], S.probe[1] + 6); ctx.stroke(); if (m) G.arrow(ctx, S.probe[0], S.probe[1], S.probe[0] + ex / m * 50, S.probe[1] + ey / m * 50, '#facc15', 3, 10); });
      const Ereal = (() => { let sx = 0, sy = 0; S.c.forEach(c => { const dx = (S.probe[0] - c.x) / 2500, dy = (S.probe[1] - c.y) / 2500, r = Math.hypot(dx, dy) || 1e-3; const e = 9e9 * c.q * 1e-9 / (r * r); sx += e * dx / r; sy += e * dy / r; }); return Math.hypot(sx, sy); })();
      if (S.p.vals !== false) Q31.T(ctx, 'E = ' + Q31.sci(Ereal, 3, 'N/C'), S.probe[0], S.probe[1] - 30, { s: 12, w: 900, c: '#0f172a', bg: '#facc15', mono: 1 });
      Q31.banner(ctx, w, '➕ من المختبرات العالمية: الشحنات والمجالات', '#7c3aed');
      { const sx = w < 600 ? 20 : 84, sy = h - (w < 600 ? 150 : 96); Q31.raw(ctx, () => { ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx, sy - 5); ctx.lineTo(sx, sy + 5); ctx.moveTo(sx, sy); ctx.lineTo(sx + 25, sy); ctx.moveTo(sx + 25, sy - 5); ctx.lineTo(sx + 25, sy + 5); ctx.stroke(); }); Q31.T(ctx, '1 cm', sx + 12, sy + 14, { s: 10, w: 800, c: '#e2e8f0' }); }
    },
    drags(S) { if (!S.W) return []; const L = []; S.c.forEach((c, i) => L.push({ id: 'c' + i, x: c.x, y: c.y, r: 18, axis: 'xy', keep: true, hint: false, tip: 'اسحب الشحنة (أعدها إلى الصندوق لحذفها)', drag: (S2, d) => { c.x = clamp(d.ox + d.x - d.sx, 20, S.W - 20); c.y = clamp(d.oy + d.y - d.sy, 40, S.H - 20); }, up: S2 => { if (c.y > S.H - 100) S.c = S.c.filter(o => o !== c); } }));
      D.bins(S).forEach((B, k) => L.push({ id: 'bin' + k, x: B.x, y: B.y, w: 112, h: 52, axis: 'xy', keep: true, tip: 'اسحب شحنة جديدة إلى المسرح', idle: k ? undefined : 'اسحب شحنة ✋', down: S2 => { S._new = { x: B.x, y: B.y, q: B.q }; S.c.push(S._new); }, drag: (S2, d) => { if (S._new) { S._new.x = d.x; S._new.y = d.y; } }, up: S2 => { if (S._new && S._new.y > S.H - 100) S.c = S.c.filter(o => o !== S._new); S._new = null; } }));
      L.push({ id: 'probe', x: S.probe[0], y: S.probe[1], r: 20, axis: 'xy', keep: true, tip: 'مجس المجال: اسحبه', drag: (S2, d) => { S.probe = [d.ox + d.x - d.sx, d.oy + d.y - d.sy]; } }); return L; },
    readings(S) { return [rd('عدد الشحنات', String(S.c.length)), rd('موجبة / سالبة', S.c.filter(c => c.q > 0).length + ' / ' + S.c.filter(c => c.q < 0).length)]; },
    explain(S) { return 'كل شحنة تولّد مجالاً، والمجال عند أي نقطة هو <b>مجموع</b> مجالات كل الشحنات. متجهات المجال تشير إلى اتجاه القوة على شحنة اختبار موجبة: تبتعد عن + وتتجه نحو −، ولونها أوضح حيث المجال أقوى.'; }
  };
  M8.P[D.id] = D;
})();
/* ---- E7 part 6: ➕ تحدّي «هوكي المجال الكهربائي» ---- */
(() => {
  const LV = [{ n: 'المستوى 1', walls: [] }, { n: 'المستوى 2', walls: [[.5, .1, .04, .5]] }, { n: 'المستوى 3', walls: [[.38, 0, .04, .55], [.62, .45, .04, .55]] }];
  const D = { id: 'g9_f_hockey', page: 24, fig: '➕ من المختبرات العالمية',
    desc: '➕ من المختبرات العالمية (فكرة «هوكي المجال الكهربائي»): القرص مشحون بشحنة موجبة. ضع شحنات موجبة وسالبة في الملعب لتوجّه القرص بقوى الدفع والجذب حتى يدخل المرمى دون أن يصطدم بالجدران.',
    tags: 'هوكي مجال كهربائي تحدّي لعبة قوى تنافر تجاذب',
    tools: ['قرص موجب', 'شحنات موجبة وسالبة'],
    steps: ['اسحب شحنات من الصندوقين وضعها في الملعب.', 'اضغط «▶ انطلق»: يتحرك القرص الموجب مبتعداً عن + ومنجذباً نحو −.', 'إذا اصطدم بجدار أعد المحاولة وغيّر أماكن الشحنات.', 'انتقل إلى المستويات الأصعب.'],
    concl: ['القرص الموجب يُدفع بعيداً عن الشحنات الموجبة ويُجذب نحو السالبة؛ ومحصلة هذه القوى تحدد مساره.'],
    controls: [SEL('lv', 'المستوى', LV.map((l, i) => [String(i), l.n]), '0', (v, S) => D.reset(S, true)), BT('', [{ t: '▶ انطلق', on: S => { D.reset(S); S.run = 1; } }, { t: '↺ أعد القرص', on: S => D.reset(S) }, { t: '🗑 امسح الشحنات', on: S => { S.c = []; D.reset(S); } }]), TG('gr', 'متجهات المجال', false, null, 'vector'), TG('tr', 'أثر المسار', true, null, 'dot')],
    setup(S) { S.c = []; D.reset(S); },
    reset(S, clr) { if (clr) S.c = []; S.run = 0; S.pk = null; S.v = [0, 0]; S.tr = []; S.res = ''; },
    fld(S) { const w = S.W, h = S.H, x0 = w < 600 ? 8 : 74; return { x0, y0: 40, x1: w - 10, y1: h - 110 }; },
    walls(S) { const F = D.fld(S), W = F.x1 - F.x0, H = F.y1 - F.y0; return LV[+S.p.lv].walls.map(r => [F.x0 + r[0] * W, F.y0 + r[1] * H, r[2] * W, r[3] * H]); },
    goal(S) { const F = D.fld(S); return [F.x1 - 34, (F.y0 + F.y1) / 2 - 40, 30, 80]; },
    update(S, dt) { if (!S.W) return; const F = D.fld(S); if (!S.pk) S.pk = [F.x0 + 40, (F.y0 + F.y1) / 2]; if (!S.run) return; dt = Math.min(dt, .03);
      for (let k = 0; k < 4; k++) { const [ex, ey] = Q31.E(S.c, S.pk[0], S.pk[1]); S.v[0] += ex * 2.2e6 * dt / 4; S.v[1] += ey * 2.2e6 * dt / 4; S.pk[0] += S.v[0] * dt / 4; S.pk[1] += S.v[1] * dt / 4; }
      if (S.tr.length < 600) S.tr.push(S.pk.slice()); const g = D.goal(S); const hit = (r, x, y) => x > r[0] && x < r[0] + r[2] && y > r[1] && y < r[1] + r[3];
      if (hit(g, S.pk[0], S.pk[1])) { S.run = 0; S.res = 'هدف! 🎉'; K.cheer(S, S.pk[0], S.pk[1]); }
      else if (D.walls(S).some(r => hit(r, S.pk[0], S.pk[1])) || S.pk[0] < F.x0 || S.pk[0] > F.x1 || S.pk[1] < F.y0 || S.pk[1] > F.y1) { S.run = 0; S.res = 'اصطدم! غيّر أماكن الشحنات'; } },
    draw(ctx, w, h, S) {
      const F = D.fld(S); if (!S.pk) S.pk = [F.x0 + 40, (F.y0 + F.y1) / 2];
      Q31.raw(ctx, () => { ctx.fillStyle = '#e0f2fe'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#f8fafc'; rr(ctx, F.x0, F.y0, F.x1 - F.x0, F.y1 - F.y0, 14); ctx.fill(); ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 3; ctx.stroke(); ctx.strokeStyle = 'rgba(2,132,199,.3)'; ctx.beginPath(); ctx.moveTo((F.x0 + F.x1) / 2, F.y0); ctx.lineTo((F.x0 + F.x1) / 2, F.y1); ctx.stroke();
        ctx.fillStyle = '#475569'; D.walls(S).forEach(r => ctx.fillRect(r[0], r[1], r[2], r[3])); const g = D.goal(S); ctx.fillStyle = 'rgba(34,197,94,.35)'; ctx.fillRect(g[0], g[1], g[2], g[3]); ctx.strokeStyle = '#15803d'; ctx.strokeRect(g[0], g[1], g[2], g[3]);
        if (S.p.tr !== false && S.tr.length > 1) { ctx.strokeStyle = 'rgba(234,88,12,.6)'; ctx.lineWidth = 2; ctx.beginPath(); S.tr.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); } });
      if (S.p.gr && S.c.length) Q31F.grid(ctx, S.c, F, 40, 600);
      S.c.forEach(c => Q31.ball(ctx, c.x, c.y, 14, c.q)); Q31.raw(ctx, () => { ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.ellipse(S.pk[0], S.pk[1], 13, 13, 0, 0, TAU); ctx.fill(); }); Q31.sg(ctx, S.pk[0], S.pk[1], 1, 7);
      M8.P.g9_f_phet.bins(S).forEach(B => { Q31.raw(ctx, () => { ctx.fillStyle = '#cbd5e1'; rr(ctx, B.x - 56, B.y - 26, 112, 52, 10); ctx.fill(); }); for (let k = 0; k < 4; k++) Q31.ball(ctx, B.x - 36 + k * 24, B.y, 10, B.q); });
      Q31.T(ctx, 'المرمى', D.goal(S)[0] + 15, D.goal(S)[1] - 12, { s: 11, w: 900, c: '#fff', bg: '#15803d' });
      if (S.res) Q31.T(ctx, S.res, Q31.cx(w), h * .45, { s: 18, w: 900, c: '#fff', bg: S.res.startsWith('هدف') ? '#15803d' : '#dc2626' });
      Q31.banner(ctx, w, '➕ تحدّي: هوكي المجال الكهربائي — ' + LV[+S.p.lv].n, '#7c3aed'); K.party(ctx, S);
    },
    drags(S) { if (!S.W) return []; const L = []; S.c.forEach((c, i) => L.push({ id: 'c' + i, x: c.x, y: c.y, r: 18, axis: 'xy', keep: true, hint: false, tip: 'اسحب الشحنة', drag: (S2, d) => { c.x = d.ox + d.x - d.sx; c.y = d.oy + d.y - d.sy; }, up: S2 => { if (c.y > S.H - 100) S.c = S.c.filter(o => o !== c); } }));
      M8.P.g9_f_phet.bins(S).forEach((B, k) => L.push({ id: 'bin' + k, x: B.x, y: B.y, w: 112, h: 52, axis: 'xy', keep: true, tip: 'اسحب شحنة إلى الملعب', idle: k ? undefined : 'ضع شحنات ✋', down: S2 => { S._new = { x: B.x, y: B.y, q: B.q }; S.c.push(S._new); }, drag: (S2, d) => { if (S._new) { S._new.x = d.x; S._new.y = d.y; } }, up: S2 => { if (S._new && S._new.y > S.H - 100) S.c = S.c.filter(o => o !== S._new); S._new = null; } }));
      return L; },
    readings(S) { return [rd('عدد الشحنات المستعملة', String(S.c.length)), rd('النتيجة', S.res || (S.run ? 'يتحرك…' : '—'))]; },
    explain(S) { return 'القرص <b>موجب</b>: الشحنة الموجبة تدفعه بعيداً (تنافر)، والسالبة تجذبه (تجاذب). القوة أكبر كلما كان القرص أقرب إلى الشحنة. خطط مساره بوضع الشحنات بذكاء!'; }
  };
  M8.P[D.id] = D;
})();
/* interaction counter (lets the smoke test see that each drag/click handler ran) */
['g9_life_obs', 'g9_life_lightning', 'g9_life_balloons', 'g9_life_travolta', 'g9_ch_atom', 'g9_ch_quant', 'g9_ch_rods', 'g9_ch_tribo', 'g9_chg_rub', 'g9_chg_contact', 'g9_chg_induct', 'g9_chg_q5', 'g9_chg_compare', 'g9_es_parts', 'g9_es_contact', 'g9_es_induct', 'g9_es_compare', 'g9_es_lab', 'g9_app_spray', 'g9_app_more', 'g9_app_cond', 'g9_app_copper', 'g9_app_truck', 'g9_app_vdg', 'g9_cl_lab', 'g9_cl_inv', 'g9_cl_atom', 'g9_f_test', 'g9_f_two', 'g9_f_plates', 'g9_f_q7', 'g9_f_phet', 'g9_f_hockey'].forEach(id => { const D = M8.P[id]; if (!D || !D.drags) return; const od = D.drags;
  D.drags = S => (od.call(D, S) || []).map(o => { ['drag', 'click'].forEach(f => { if (o[f]) { const fn = o[f]; o[f] = (S2, ...a) => { S2.act = (S2.act || 0) + 1; return fn(S2, ...a); }; } }); return o; }); });
/* keep formulas & powers of ten left-to-right inside the Arabic explanation panel */
Q31.bidi = h => String(h).split(/(<[^>]+>)/).map(t => t[0] === '<' ? t : t.replace(/[−\-+]?[0-9qFEnrk][0-9.,×⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ +\-−÷=/()μ′₁₂NCme]*[0-9⁰¹²³⁴⁵⁶⁷⁸⁹NCm)]/g, m => /[×⁻÷=]/.test(m) && /[0-9]/.test(m) ? '<bdi dir="ltr">' + m + '</bdi>' : m)).join('');
Object.keys(M8.P).filter(id => id.indexOf('g9_') === 0 && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });
/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g9_static_life', ch: 31, reg: X9, sec: '1-1 الكهربائية الساكنة', page: 7, kind: 'نشاط',
  title: 'الكهربائية الساكنة من حولنا: المشط والبالون والصعقة والشرارة والبرق',
  desc: 'ملاحظات معروفة من حياتنا اليومية (الأشكال 1–10): أجسام تُشحن بالاحتكاك فتجذب الأجسام الخفيفة، وتتفرغ شحناتها بصعقة أو شرارة، وأقواها البرق. ثم ➕ مشاهد من المختبرات العالمية: البالونات والكنزة، وجون ترافولتاج.',
  tags: 'كهربائية ساكنة احتكاك دلك مشاهدات حياتية',
  fact: ['وجد الحكيم الإغريقي أرسطو طاليس أن مادة الكهرب (الكهرمان) عند دلكها بالصوف تجذب الأجسام الخفيفة، ومن اسمها الإغريقي Electron جاءت كلمة «الكهربائية» (ص 7).', 'وجد العالم الإنكليزي وليم كلبرت (عام 1600 م) أن كثيراً من المواد تشارك الكهرب في هذه الخاصية.', 'الهواء الرطب يساعد على تفريغ الشحنات بسرعة؛ لذلك يبقى البالون ملتصقاً بالجدار ساعات في الجو الجاف فقط.'],
  quiz: [
    { q: 'بعد سيرك على سجادة من الصوف ولمسك مقبض الباب تصاب بصعقة خفيفة. سبب ذلك أن الشحنات الكهربائية قد:', o: ['ولّدها جسمك', 'ولّدتها السجادة', 'تولدت نتيجة الاحتكاك بين جسمك والسجادة'], a: 2, why: 'س1-6 ص 26: الشحنات تتولد بالاحتكاك (الدلك) بين الجسم والسجادة.' },
    { q: 'لماذا تنجح تجارب الكهربائية الساكنة (البالون والجدار، المشط والشعر) في الجو الجاف أكثر من الرطب؟', o: ['لأن الهواء الرطب يساعد على تفريغ الشحنات بسرعة', 'لأن الرطوبة تزيد الشحنات', 'لأن الشحنات لا تتولد في الصيف'], a: 0, why: 'ص 8: الهواء الرطب يساعد على تفريغ الشحنات الكهربائية بسرعة.' },
    { q: 'البرق مثال على:', o: ['كهربائية ساكنة عالية الشدة جداً تتفرغ فجأة', 'تيار كهربائي من محطة الكهرباء', 'ضوء الشمس المنعكس'], a: 0, why: 'هل تعلم ص 10: قد تكون الكهربائية الساكنة ذات الشدة العالية جداً كالبرق، خطرة ومميتة.' }],
  parts: [{ id: 'g9_life_obs', n: 'مشاهدات الكتاب (الأشكال 1–8)' }, { id: 'g9_life_lightning', n: 'هل تعلم: البرق والصاعقة (الشكلان 9، 10)' }, { id: 'g9_life_balloons', n: '➕ البالونات والكنزة والجدار (PhET)' }, { id: 'g9_life_travolta', n: '➕ جون ترافولتاج: شرارة المقبض (PhET)' }] });
M8.merge({ id: 'g9_charge', ch: 31, reg: X9, sec: '2-1 الشحنة الكهربائية', page: 10, kind: 'نشاط',
  title: 'الشحنة الكهربائية: الذرة، مقدار الشحنة، والتجاذب والتنافر',
  desc: 'الذرة إلكترونات سالبة حول نواة فيها بروتونات موجبة ونيوترونات متعادلة. فقد الإلكترونات يعطي شحنة موجبة واكتسابها يعطي شحنة سالبة. شحنة الإلكترون 1.6×10⁻¹⁹ C أصغر شحنة. ونشاط الكتاب: الشحنات المتشابهة تتنافر والمختلفة تتجاذب.',
  tags: 'شحنة كهربائية ذرة أيون كولوم تجاذب تنافر نشاط',
  fact: ['شحنة البروتون موجبة ومقدارها يساوي مقدار شحنة الإلكترون (ص 11).', 'الكولوم الواحد يعادل شحنة 6.25×10¹⁸ إلكتروناً، لذلك نستعمل أجزاءه: μC = 10⁻⁶ C و nC = 10⁻⁹ C.', 'الإلكترونات وحدها تنتقل عند الشحن؛ البروتونات محبوسة في النواة.'],
  quiz: [
    { q: 'الذرة المتعادلة هي ذرة:', o: ['لا تحمل مكوناتها أية شحنة', 'عدد إلكتروناتها يساوي عدد بروتوناتها', 'عدد إلكتروناتها يساوي عدد نيوتروناتها'], a: 1, why: 'س1-1 ص 25 (b).' },
    { q: 'يصير الجسم مشحوناً بشحنة موجبة إذا كانت بعض ذراته تمتلك:', o: ['عدداً من الإلكترونات أكبر من عدد البروتونات', 'عدداً من الإلكترونات أقل من عدد البروتونات', 'عدداً من النيوترونات أكبر من عدد الإلكترونات'], a: 1, why: 'س1-2 ص 25 (b): نقص الإلكترونات ⟸ شحنة موجبة.' },
    { q: 'عند فقدان شحنة مقدارها 1.6×10⁻⁹ C من جسم موصل معزول متعادل فإن عدد الإلكترونات المفقودة:', o: ['10⁸ إلكتروناً', '10¹⁰ إلكتروناً', '10¹² إلكتروناً'], a: 1, why: 'س1-3: n = 1.6×10⁻⁹ ÷ 1.6×10⁻¹⁹ = 10¹⁰.' }],
  parts: [{ id: 'g9_ch_atom', n: 'الذرة ونوعا الشحنة (الشكلان 11، 12)' }, { id: 'g9_ch_quant', n: 'مقدار الشحنة والكولوم (س1-3)' }, { id: 'g9_ch_rods', n: 'نشاط: التنافر والتجاذب (الشكل 13)' }, { id: 'g9_ch_tribo', n: '➕ السلسلة الاحتكاكية' }] });
M8.merge({ id: 'g9_charging', ch: 31, reg: X9, sec: '3-1 شحن المادة بالكهربائية', page: 13, kind: 'نشاط',
  title: 'طرائق شحن الأجسام: الدلك والتماس والحث',
  desc: 'توجد ثلاث طرائق لشحن الأجسام بالكهربائية الساكنة: الدلك (البالون والصوف)، التماس (كرتا نخاع البيلسان)، والحث (الكرة المعدنية والتأريض). ثم حالات السؤال 5 على الجهاز نفسه ومقارنة الطرائق الثلاث.',
  tags: 'شحن دلك تماس حث تأريض بيلسان كرة معدنية',
  fact: ['هل تعلم (ص 13): الجسم المشحون المعزول يفقد شحنته عند تركه في الهواء، وتزداد سرعة التفريغ بزيادة رطوبة الجو.', 'الشحنات الطليقة تُدفع إلى الجهة البعيدة وتتسرب إلى الأرض، والشحنات المقيدة تبقى قرب الجسم المؤثر (ص 14).'],
  quiz: [
    { q: 'عدد طرائق شحن الأجسام بالكهربائية الساكنة (س4):', o: ['الدلك والتماس والحث', 'الدلك فقط', 'التسخين والتبريد'], a: 0, why: 'ص 13: ثلاث طرائق.' },
    { q: 'س5: ساق زجاج موجبة تلامس كرة معدنية معزولة متعادلة. ماذا يحصل لشحنة الساق؟', o: ['تقل الشحنة الموجبة على الساق', 'تزداد', 'لا تتغير'], a: 0, why: 'تنتقل إلكترونات من الكرة إلى الساق فتعادل جزءاً من شحنتها.' },
    { q: 'س5: ساق زجاج موجبة قريبة من كرة معدنية موصولة بالأرض. نوع الشحنة على الكرة:', o: ['موجبة', 'سالبة (تأتي إلكترونات من الأرض)', 'لا شحنة'], a: 1, why: 'الحث مع التأريض: شحنة مخالفة لشحنة المؤثر.' }],
  parts: [{ id: 'g9_chg_rub', n: 'الشحن بالدلك (الشكل 14)' }, { id: 'g9_chg_contact', n: 'الشحن بالتماس: كرتا البيلسان (الشكل 15)' }, { id: 'g9_chg_induct', n: 'الشحن بالحث: الكرة المعدنية (الشكل 16)' }, { id: 'g9_chg_q5', n: 'س5: ثلاث حالات على الجهاز نفسه' }, { id: 'g9_chg_compare', n: 'مقارنة الطرائق الثلاث (س4)' }] });
M8.merge({ id: 'g9_electroscope', ch: 31, reg: X9, sec: '4-1 الكشاف الكهربائي + 5-1 شحن الكشاف', page: 15, kind: 'نشاط',
  title: 'الكشاف الكهربائي: أجزاؤه وشحنه بالتماس والحث',
  desc: 'الكشاف الكهربائي يكشف عن وجود الشحنة ونوعها. أجزاؤه (الشكل 17)، ونشاطا الكتاب: (a) الشحن بالتماس بالمشط (الشكل 18) و(b) الشحن بالحث بساق الزجاج (الشكل 19)، ثم «تذكّر» ومختبر يجيب أسئلة الكتاب على الكشاف نفسه.',
  tags: 'كشاف كهربائي ورقتان انفراج تأريض تماس حث',
  fact: ['هل تعلم (ص 17): عند إيصال موصل مشحون بالأرض بسلك معدني يقال إنه مؤرَّض (grounded) فتتعادل شحنته، لأن الأرض مستودع كبير تنتقل منه وإليه الشحنات بسهولة.', 'الكشاف المشحون بالتماس شحنته مماثلة لشحنة الجسم الملامس، والمشحون بالحث شحنته مخالفة لشحنة الجسم المقرّب (تذكّر ص 18).'],
  quiz: [
    { q: 'عند تقريب جسم مشحون بشحنة موجبة من قرص كشاف ذي ورقتين مشحون بشحنة موجبة أيضاً:', o: ['يزداد انفراج الورقتين', 'يقل انفراج الورقتين', 'تنطبق الورقتان'], a: 0, why: 'س1-8 (a).' },
    { q: 'عند تقريب جسم سالب من قرص كشاف متصل بالأرض:', o: ['تنفرج الورقتان لظهور شحنة سالبة عليهما', 'تبقى الورقتان منطبقتين رغم ظهور شحنة موجبة على القرص', 'تبقى منطبقتين رغم ظهور شحنة سالبة على القرص'], a: 1, why: 'س1-9 (c).' },
    { q: 'س6: قرّب طالب ساق زجاج موجبة، ولمس القرص بإصبعه، ثم أبعد الساق، ثم رفع إصبعه. لماذا لم يُشحن الكشاف؟', o: ['لأنه أبعد الساق قبل رفع إصبعه فعادت الإلكترونات إلى الأرض', 'لأن الزجاج لا يشحن الكشاف', 'لأن إصبعه عازل'], a: 0, why: 'يجب قطع الاتصال بالأرض قبل إبعاد الساق.' }],
  parts: [{ id: 'g9_es_parts', n: 'أجزاء الكشاف وأشكاله (الشكل 17)' }, { id: 'g9_es_contact', n: 'نشاط (a): الشحن بالتماس (الشكل 18)' }, { id: 'g9_es_induct', n: 'نشاط (b): الشحن بالحث (الشكل 19)' }, { id: 'g9_es_compare', n: 'تذكّر: التماس مقابل الحث' }, { id: 'g9_es_lab', n: 'مختبر الكشاف: أسئلة الكتاب' }] });
M8.merge({ id: 'g9_apps', ch: 31, reg: X9, sec: '6-1 التطبيقات + 7-1 اختلاف المواد في التوصيل', page: 18, kind: 'نشاط',
  title: 'تطبيقات الكهربائية الساكنة، والموصلات والعوازل',
  desc: 'المرذاذ لصبغ السيارات والكرسي (الشكل 20)، أجهزة الترسيب والاستنساخ، الموصلات والعوازل (الشكلان 21، 22)، ساق النحاس باليد وبالمقبض العازل (الشكل 23)، سلاسل شاحنات الوقود (س2)، ثم ➕ مولد فان دي غراف.',
  tags: 'تطبيقات مرذاذ ترسيب استنساخ موصلات عوازل تأريض',
  fact: ['تستثمر الكهربائية الساكنة في تثبيت مواد التجميل والعدسات اللاصقة (ص 19).', 'هل تعلم (ص 19): أشباه الموصلات مثل السيليكون والجرمانيوم توصل في ظروف معينة وتسلك سلوك العازل في ظروف أخرى.'],
  quiz: [
    { q: 'علّل: تجهز سيارات نقل الوقود بسلاسل معدنية في مؤخرتها تلامس الأرض.', o: ['لتفريغ الشحنات المتولدة بالاحتكاك إلى الأرض فلا تحدث شرارة', 'لتزيين الشاحنة', 'لزيادة الاحتكاك بالطريق'], a: 0, why: 'س2-1 ص 28.' },
    { q: 'في المرذاذ، فوهة المرذاذ توصل بـ:', o: ['القطب الموجب، والجسم المراد صبغه بالسالب أو بالأرض', 'القطب السالب فقط', 'لا توصل بشيء'], a: 0, why: 'ص 18–19.' },
    { q: 'ساق نحاس ممسوكة باليد ومدلوكة بالصوف لا تجذب القصاصات لأن:', o: ['الشحنات تسربت إلى الأرض عن طريق الجسم', 'النحاس لا يُشحن أبداً', 'القصاصات مشحونة'], a: 0, why: 'ص 19–20.' }],
  parts: [{ id: 'g9_app_spray', n: 'المرذاذ: صبغ الكرسي والسيارة (الشكل 20)' }, { id: 'g9_app_more', n: 'الترسيب في معامل الإسمنت والاستنساخ' }, { id: 'g9_app_cond', n: 'الموصلات والعوازل (الشكلان 21، 22)' }, { id: 'g9_app_copper', n: 'ساق النحاس: باليد وبمقبض عازل (الشكل 23)' }, { id: 'g9_app_truck', n: 'س2: سلاسل شاحنات الوقود والتأريض' }, { id: 'g9_app_vdg', n: '➕ مولد فان دي غراف' }] });
M8.merge({ id: 'g9_coulomb', ch: 31, reg: X9, sec: '8-1 قانون كولوم', page: 20, kind: 'مثال',
  title: 'قانون كولوم: مثال الكتاب والمسائل على جهاز واحد',
  desc: 'F = k q₁q₂/r² مع k = 9×10⁹ N·m²/C². شحنتان نقطيتان على مسطرة: نحمّل مثال الكتاب (90 N) والمسائل وأسئلة الاختيار بقيمها، ونتابع الحل خطوة بخطوة بالأسس، ونستكشف التناسب مع مربع البعد، ثم ➕ المقياس الذري.',
  tags: 'قانون كولوم قوة كهربائية مثال مسائل أسس',
  fact: ['* يرجى توضيح طريقة ضرب وقسمة الأسس قبل حل المسائل: عند الضرب نجمع الأسس، وعند القسمة نطرحها (ص 30).', 'القوة الكهربائية بين شحنتين تخضع للقانون الثالث لنيوتن: F₂₁ = −F₁₂ (ص 22).'],
  quiz: [
    { q: 'شحنتان موجبتان البعد بينهما 10 cm، استبدلت إحداهما بأخرى سالبة بالمقدار نفسه. مقدار القوة بينهما:', o: ['صفر', 'أكبر مما كان', 'لا يتغير'], a: 2, why: 'س1-4 (d): يتغير النوع فقط (تجاذب).' },
    { q: 'كانت قوة التجاذب F₁ عندما البعد 3 cm، ثم صار البعد 6 cm. القوة F₂ تساوي:', o: ['2F₁', '¼ F₁', '4F₁'], a: 1, why: 'س1-5: F ∝ 1/r² ⟸ مضاعفة البعد تقلل القوة إلى الربع.' },
    { q: 'الجسم A شحنته +2μC والجسم B شحنته +6μC. القوة المتبادلة:', o: ['F_AB = −3F_BA', 'F_AB = −F_BA', 'F_AB = +F_BA'], a: 1, why: 'س1-7 (c): القانون الثالث لنيوتن.' }],
  parts: [{ id: 'g9_cl_lab', n: 'مختبر كولوم + مثال الكتاب والمسائل' }, { id: 'g9_cl_inv', n: 'التناسب: ضاعف البعد والشحنة (س1-4، س1-5)' }, { id: 'g9_cl_atom', n: '➕ المقياس الذري (PhET)' }] });
M8.merge({ id: 'g9_field', ch: 31, reg: X9, sec: '9-1 المجال الكهربائي', page: 22, kind: 'نشاط',
  title: 'المجال الكهربائي: شحنة الاختبار وخطوط المجال والمجال المنتظم',
  desc: 'المجال الكهربائي يُختبر بشحنة اختبار موجبة صغيرة: E = F/q′ (N/C). خطوطه تبدأ من الموجبة وتنتهي بالسالبة (الأشكال 25–27). المجال المنتظم بين لوحين متوازيين، مثال ص24 والمسألة 3، والسؤال 7، ثم ➕ صندوق الشحنات والمجالات وتحدّي الهوكي.',
  tags: 'مجال كهربائي خطوط المجال شحنة اختبار مجال منتظم',
  fact: ['خطوط المجال غير مرئية؛ نرسمها لنتخيل اتجاه القوة على شحنة اختبار موجبة.', 'الخطوط لا تتقاطع، وتتقارب حيث يكون المجال قوياً.'],
  quiz: [
    { q: 'خطوط المجال الكهربائي:', o: ['تبدأ من الشحنة الموجبة وتنتهي بالسالبة', 'تبدأ من السالبة وتنتهي بالموجبة', 'دوائر حول الشحنة'], a: 0, why: 'ص 23.' },
    { q: 'شحنة +2×10⁻⁹ C في مجال كهربائي تأثرت بقوة 4×10⁻⁶ N. مقدار المجال:', o: ['2×10³ N/C', '8×10⁻¹⁵ N/C', '2×10⁻³ N/C'], a: 0, why: 'مثال ص 24: E = F/q′.' },
    { q: 'شحنة +3μC عند نقطة مجالها 4×10⁶ N/C. القوة المؤثرة فيها:', o: ['12 N', '0.75 N', '1.33 N'], a: 0, why: 'المسألة 3 ص 30: F = q′E = 3×10⁻⁶ × 4×10⁶.' }],
  parts: [{ id: 'g9_f_test', n: 'شحنة الاختبار والمجال (الشكل 25)' }, { id: 'g9_f_two', n: 'خطوط المجال لشحنتين (الشكل 26)' }, { id: 'g9_f_plates', n: 'المجال المنتظم + مثال ص24 + المسألة 3 (الشكل 27)' }, { id: 'g9_f_q7', n: 'س7: اكتب نوع الشحنة' }, { id: 'g9_f_phet', n: '➕ الشحنات والمجالات (PhET)' }, { id: 'g9_f_hockey', n: '➕ تحدّي هوكي المجال' }] });
/* END */
