'use strict';
/* ====================== الرابع العلمي — الفصل الثامن: العدسات الرقيقة (ch 48, ص 133–155) ======================
   Merged experiments (book order): g10_lens_types (8-1) · g10_lens_images (8-2 … 8-4) · g10_lens_focus (نشاط 3)
   · g10_lens_law (8-5) · g10_lens_combo (عدستان + 8-6) · g10_lens_aberr (8-7, 8-8) · g10_lens_apps (8-9) · g10_lens_review (أسئلة ص 152–155).
   Book sign convention: light travels left → right; u > 0 real object on the left; v > 0 real image on the right; f > 0 convex, f < 0 concave.
   Local kit Q48 = Q42 + optical bench, glass lenses of six shapes, candle images with real blur, paraxial ray tracer, principal rays. */
LW({ id: 'g10_lenslaw', cat: 48, name: 'قانون العدسات الرقيقة', fx: FR('1', '<i>f</i>') + ' = ' + FR('1', '<i>u</i>') + ' + ' + FR('1', '<i>v</i>'), sym: 'u بعد الجسم و v بعد الصورة و f البعد البؤري. الضوء من اليسار إلى اليمين: u موجب للجسم الحقيقي، v موجب للصورة الحقيقية (يمين العدسة) وسالب للتقديرية، f موجب للمحدبة وسالب للمقعرة. وهو القانون العام للمرايا والعدسات', calc: { in: [['f', 'البعد البؤري f', 'cm', 10], ['u', 'بعد الجسم u', 'cm', 30]], out: 'بعد الصورة v', u: 'cm', f: v => 1 / (1 / v.f - 1 / v.u) } });
LW({ id: 'g10_lensmag', cat: 48, name: 'التكبير في العدسات', fx: '<i>M</i> = ' + FR('<i>h′</i>', '<i>h</i>') + ' = −' + FR('<i>v</i>', '<i>u</i>'), sym: 'M موجب: صورة تقديرية معتدلة، M سالب: صورة حقيقية مقلوبة. |M| > 1 مكبرة، |M| < 1 مصغرة، |M| = 1 مساوية للجسم', calc: { in: [['u', 'بعد الجسم u', 'cm', 30], ['v', 'بعد الصورة v', 'cm', 15]], out: 'التكبير M', u: '', f: v => -v.v / v.u } });
LW({ id: 'g10_lensarea', cat: 48, name: 'نسبة المساحتين', fx: FR('<i>A′</i>', '<i>A</i>') + ' = ' + FR('<i>v</i><sup>2</sup>', '<i>u</i><sup>2</sup>'), sym: 'النسبة بين مساحتي الصورة والجسم تساوي النسبة بين مربعي بعديهما عن المركز البصري للعدسة', calc: { in: [['u', 'بعد الجسم u', 'cm', 30], ['v', 'بعد الصورة v', 'cm', 15]], out: 'A′ / A', u: '', f: v => v.v * v.v / (v.u * v.u) } });
LW({ id: 'g10_lenscombo', cat: 48, name: 'نظام من عدستين', fx: FR('1', '<i>f</i>') + ' = ' + FR('1', '<i>f</i><sub>1</sub>') + ' + ' + FR('1', '<i>f</i><sub>2</sub>') + ' − ' + FR('<i>d</i>', '<i>f</i><sub>1</sub> <i>f</i><sub>2</sub>') + ' ، <i>M</i> = <i>M</i><sub>1</sub> × <i>M</i><sub>2</sub>', sym: 'd البعد بين المركزين البصريين للعدستين. للعدستين المتلاصقتين d = 0 فيصبح 1/f = 1/f₁ + 1/f₂. صورة العدسة الأولى تعد جسماً للعدسة الثانية', calc: { in: [['f1', 'f₁', 'cm', 10], ['f2', 'f₂', 'cm', 5], ['d', 'البعد بينهما d', 'cm', 0]], out: 'البعد البؤري للنظام f', u: 'cm', f: v => 1 / (1 / v.f1 + 1 / v.f2 - v.d / (v.f1 * v.f2)) } });
LW({ id: 'g10_lenspow', cat: 48, name: 'قدرة العدسة', fx: '<i>P</i> = ' + FR('1', '<i>f</i> (m)') + ' (D)', sym: 'قدرة العدسة مقلوب بعدها البؤري مقاساً بالمتر، ووحدتها الدايوبتر D. موجبة للعدسة اللامة وسالبة للمفرقة. f = 20 cm ⟸ P = +5 D ، f = −25 cm ⟸ P = −4 D', calc: { in: [['f', 'البعد البؤري f', 'm', .2]], out: 'القدرة P', u: 'D', f: v => 1 / v.f } });
LW({ id: 'g10_lensmaker', cat: 48, name: 'معادلة صانعي العدسات', fx: '<i>P</i> = (<i>n</i> − 1) (' + FR('1', '<i>R</i><sub>1</sub>') + ' − ' + FR('1', '<i>R</i><sub>2</sub>') + ')', sym: 'n معامل انكسار مادة العدسة، R₁ و R₂ نصفا قطري تكور وجهيها بالمتر. يكون R موجباً إذا كان مركز التكور على يمين الوجه. محدبة الوجهين: R₁ موجب و R₂ سالب', calc: { in: [['n', 'معامل الانكسار n', '', 1.5], ['R1', 'R₁', 'm', .2], ['R2', 'R₂', 'm', -.2]], out: 'القدرة P', u: 'D', f: v => (v.n - 1) * (1 / v.R1 - 1 / v.R2) } });

const Q48 = Object.assign(Object.create(Q42), {
  ink: '#047857',
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#047857', y); },
  n1(v, d = 1) { if (!isFinite(v)) return '∞'; const r = +v.toFixed(d); return (r < 0 ? '−' : '') + Math.abs(r); },
  vOf(u, f) { const den = u - f; return Math.abs(den) < 1e-9 ? Infinity : u * f / den; },
  ease(S, k, tk, dt, r = 9) { S[k] += (S[tk] - S[k]) * Math.min(1, dt * r); if (Math.abs(S[tk] - S[k]) < 1e-3) S[k] = S[tk]; },
  /* image properties (book): returns {v, M, lines[]} */
  props(u, f) {
    const v = Q48.vOf(u, f); if (!isFinite(v)) return { v, M: Infinity, real: false, L: ['الأشعة تنفذ متوازية', 'الصورة في اللانهاية'] };
    const M = -v / u, real = v > 0, a = Math.abs(M), L = [real ? 'حقيقية' : 'تقديرية خيالية', M < 0 ? 'مقلوبة' : 'معتدلة', a > 1.005 ? 'مكبرة' : a < .995 ? 'مصغرة' : 'مساوية للجسم'];
    if (f > 0 && real) L.push(u > 2 * f + 1e-6 ? 'تقع بين F′ و 2F′' : u > 2 * f - 1e-6 ? 'تقع عند 2F′' : 'تقع أبعد من 2F′');
    else L.push(f > 0 ? 'في جهة الجسم نفسها وخلفه' : 'في جهة الجسم نفسها وأمامه');
    return { v, M, real, L };
  },
  bgLight(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f8fafc'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(4,120,87,.06)'; ctx.lineWidth = 1; ctx.beginPath(); for (let x = 0; x < w; x += 24) { ctx.moveTo(x, 0); ctx.lineTo(x, h); } for (let y = 0; y < h; y += 24) { ctx.moveTo(0, y); ctx.lineTo(w, y); } ctx.stroke(); }); },
  /* ---------- lens of six shapes; s = bulge (px) ---------- */
  LT: { bx: ['محدبة الوجهين', 1], mx: ['مقعرة–محدبة', 1], px: ['مستوية–محدبة', 1], bc: ['مقعرة الوجهين', -1], mc: ['محدبة–مقعرة', -1], pc: ['مستوية–مقعرة', -1], xp: ['محدبة–مستوية', 1] },
  lensOff(type, s, e = 3) { switch (type) { case 'bx': return [-e, -e - s, e, e + s]; case 'px': return [-e, -e, e, e + 2 * s]; case 'xp': return [-e, -e - 2 * s, e, e]; case 'mx': return [-e, -e - 2 * s, e, e - s];
    case 'bc': return [-e - s, -e, e + s, e]; case 'pc': return [-e, -e, e + 2 * s, e]; case 'mc': return [-e, -e - s, e + s, e - s]; } return [-e, -e - s, e, e + s]; },
  lensPath(ctx, x, y, H, type, s) { const a = Q48.lensOff(type, s); ctx.beginPath(); ctx.moveTo(x + a[0], y - H); ctx.quadraticCurveTo(x + 2 * a[1] - a[0], y, x + a[0], y + H); ctx.lineTo(x + a[2], y + H); ctx.quadraticCurveTo(x + 2 * a[3] - a[2], y, x + a[2], y - H); ctx.closePath(); },
  lens(ctx, x, y, H, type, o = {}) {
    const s = o.s != null ? o.s : 9; K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = o.alpha ?? 1;
      const g = ctx.createLinearGradient(x - 20, 0, x + 20, 0), t = o.tint || [147, 197, 253]; g.addColorStop(0, `rgba(${t},.55)`); g.addColorStop(.45, 'rgba(240,249,255,.8)'); g.addColorStop(1, `rgba(${t.map(c => c - 50)},.6)`);
      ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = o.dark ? 0 : 6; ctx.shadowOffsetY = 2; Q48.lensPath(ctx, x, y, H, type, s); ctx.fillStyle = g; ctx.fill(); ctx.shadowColor = 'transparent';
      ctx.strokeStyle = o.bd || '#1d4ed8'; ctx.lineWidth = 1.6; ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 2; ctx.beginPath(); const a = Q48.lensOff(type, s); ctx.moveTo(x + a[1] * .55 + 2, y - H * .62); ctx.quadraticCurveTo(x + a[1] * .9 + 2, y - H * .2, x + a[1] * .8 + 2, y + H * .05); ctx.stroke(); ctx.restore(); });
  },
  /* lens mounted in a black ring holder (bench) */
  mount(ctx, x, y, H, type, ry, o = {}) {
    Q48.post(ctx, x, y + H + 4, ry);
    K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; rr(ctx, x - 7, y - H - 7, 14, 9, 3); ctx.fill(); rr(ctx, x - 7, y + H - 2, 14, 9, 3); ctx.fill(); });
    Q48.lens(ctx, x, y, H, type, o);
  },
  /* ---------- optical bench ---------- */
  rail(ctx, x0, x1, y, ppc, o = {}) {
    const n = o.n || Math.round((x1 - x0) / ppc);
    K.raw(ctx, () => { ctx.save(); const g = ctx.createLinearGradient(0, y, 0, y + 22); g.addColorStop(0, '#e5e7eb'); g.addColorStop(.35, '#9ca3af'); g.addColorStop(1, '#4b5563'); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4; ctx.fillStyle = g; rr(ctx, x0 - 16, y, x1 - x0 + 32, 22, 4); ctx.fill(); ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#374151'; [x0 - 6, x1 - 18].forEach(xx => { ctx.beginPath(); ctx.moveTo(xx, y + 22); ctx.lineTo(xx + 24, y + 22); ctx.lineTo(xx + 30, y + 44); ctx.lineTo(xx - 6, y + 44); ctx.closePath(); ctx.fill(); });
      ctx.fillStyle = '#fefce8'; ctx.fillRect(x0, y + 4, x1 - x0, 12); ctx.strokeStyle = '#713f12'; for (let k = 0; k <= n; k++) { const xx = x0 + k * ppc, L = k % 10 === 0 ? 11 : k % 5 === 0 ? 8 : 4; ctx.lineWidth = k % 10 ? .7 : 1.3; ctx.beginPath(); ctx.moveTo(xx, y + 4); ctx.lineTo(xx, y + 4 + L); ctx.stroke(); } ctx.restore(); });
    if (o.lab !== false) for (let k = 0; k <= n; k += 10) Q48.T(ctx, String(k), x0 + k * ppc, y + 31, { s: 9.5, w: 800, c: o.dark ? '#e2e8f0' : '#334155' });
  },
  post(ctx, x, ytop, ry) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(x - 3, 0, x + 3, 0); g.addColorStop(0, '#6b7280'); g.addColorStop(.5, '#f3f4f6'); g.addColorStop(1, '#4b5563'); ctx.fillStyle = g; ctx.fillRect(x - 3, ytop, 6, ry - ytop - 6);
      ctx.fillStyle = '#111827'; rr(ctx, x - 16, ry - 9, 32, 12, 3); ctx.fill(); ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.arc(x + 11, ry - 3, 3, 0, TAU); ctx.fill(); ctx.fillStyle = '#ef4444'; ctx.fillRect(x - 1, ry - 2, 2, 5); });
  },
  /* white screen seen slightly from the front; face rectangle returned */
  screen(ctx, x, yc, H, ry, o = {}) {
    const W = o.W || 34; Q48.post(ctx, x, yc + H / 2, ry);
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = 8; ctx.fillStyle = '#9ca3af'; ctx.fillRect(x - 5, yc - H / 2, 5, H); ctx.shadowColor = 'transparent';
      const g = ctx.createLinearGradient(x, 0, x + W, 0); g.addColorStop(0, o.dark ? '#cbd5e1' : '#f8fafc'); g.addColorStop(1, o.dark ? '#94a3b8' : '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(x, yc - H / 2, W, H); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.2; ctx.strokeRect(x, yc - H / 2, W, H); ctx.restore(); });
    return { x, y: yc - H / 2, w: W, h: H };
  },
  /* draw f(ctx) blurred by radius r (px) — works on every browser */
  blurred(ctx, r, a, f) {
    K.raw(ctx, () => { if (r < .7) { ctx.save(); ctx.globalAlpha *= a; f(); ctx.restore(); return; }
      const N = r < 3 ? 8 : 14; for (let i = 0; i < N; i++) { const ang = i * 2.399, rho = r * Math.sqrt((i + .5) / N); ctx.save(); ctx.globalAlpha *= a * Math.min(1, 2.2 / N * 1.35); ctx.translate(Math.cos(ang) * rho, Math.sin(ang) * rho); f(); ctx.restore(); } });
  },
  /* candle with its flame centre at (x, y); kx, ky scale (ky < 0 → inverted image) */
  candle(ctx, x, y, kx, ky, t, on = true) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(kx, ky); Q26.candle(ctx, 0, 64, 1, t, on); ctx.restore(); }); },
  /* ---------- paraxial tracing (screen px, y offset from axis, down = +) ---------- */
  trace(x0, y0, sl, lenses, xEnd) { const pts = [[x0, y0]]; let x = x0, y = y0, s = sl;
    lenses.forEach(L => { if (L.x <= x + 1e-6) return; y += s * (L.x - x); x = L.x; pts.push([x, y]); if (isFinite(L.f)) s = s - y / L.f; });
    if (xEnd > x) pts.push([xEnd, y + s * (xEnd - x)]); return { pts, s, y, x }; },
  shift(pts, ay) { return pts.map(p => [p[0], p[1] + ay]); },
  /* travelling light pulses along a polyline */
  flow(ctx, pts, col, ph, gap = 46) {
    let tot = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const L = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(L); tot += L; }
    K.raw(ctx, () => { ctx.fillStyle = col; for (let d = (ph * 60) % gap; d < tot; d += gap) { let r = d, i = 0; while (i < seg.length && r > seg[i]) { r -= seg[i]; i++; } if (i >= seg.length) break; const a = pts[i], b = pts[i + 1], f = r / (seg[i] || 1);
      ctx.globalAlpha = .9; ctx.beginPath(); ctx.arc(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, 3.2, 0, TAU); ctx.fill(); } ctx.globalAlpha = 1; });
  },
  /* the three principal rays of the book for an object arrow; f in px (signed), xo object x, ho height (px, up +) */
  RC: ['#dc2626', '#16a34a', '#2563eb'],
  rays3(ctx, o) {
    const { xl, ay, f, xo, ho, x1 } = o, u = xl - xo, show = o.show || [1, 1, 1], ph = o.ph || 0, out = [], yt = -ho;
    const v = Q48.vOf(u, f), xi = xl + v, virt = isFinite(v) && v < 0;
    const draw = (k, yl, sIn, sOut, guide) => { if (!show[k]) return; const col = Q48.RC[k];
      const p = [[xo, ay + yt], [xl, ay + yl], [x1, ay + yl + sOut * (x1 - xl)]]; let q = p;
      if (o.clipY) { const yy = p[2][1]; if (Math.abs(yy - ay) > o.clipY) { const lim = ay + Math.sign(yy - ay) * o.clipY, xx = xl + (lim - ay - yl) / (sOut || 1e-9); q = [p[0], p[1], [Math.min(x1, xx), lim]]; } }
      Q26.ray(ctx, q, col, { w: o.w || 2.4, glow: o.glow, hs: 8 });
      if (virt) Q26.ray(ctx, [[xl, ay + yl], [xi, ay + yl + sOut * (xi - xl)]], col, { dash: [6, 5], w: 2 });
      if (guide) Q26.ray(ctx, guide, col, { dash: [3, 5], w: 1.6, alpha: .7 });
      if (o.flow) Q48.flow(ctx, q, col, ph + k * .3); out.push(q); };
    // 1: parallel → through F′ (or away from it)
    draw(0, yt, 0, -yt / f, f < 0 ? [[xl, ay + yt], [xl + f, ay]] : null);
    // 2: through the optical centre, undeviated
    const s2 = -yt / u; draw(1, 0, s2, s2, null);
    // 3: toward F (front focus for convex, back focus for concave) → parallel
    const xa = xl - f; if (Math.abs(xa - xo) > 2) { const s3 = (0 - yt) / (xa - xo), yl = yt + s3 * (xl - xo); if (Math.abs(yl) < (o.ymax || 400)) draw(2, yl, s3, 0, (f > 0 && xo > xa) ? [[xa, ay], [xo, ay + yt]] : f < 0 ? [[xl, ay + yl], [xa, ay]] : null); }
    return { v, xi, hi: isFinite(v) ? ho * (-v / u) : 0 };
  },
  /* axis with F, F′, 2F, 2F′, C marks */
  marks(ctx, xl, ay, f, x0, x1, o = {}) {
    Q26.axis(ctx, x0, x1, ay, o.col || '#475569'); const af = Math.abs(f), fs = o.fs || 12;
    [[-2, '2F'], [-1, 'F'], [1, 'F′'], [2, '2F′']].forEach(q => { const x = xl + q[0] * af; if (x < x0 + 4 || x > x1 - 4) return; Q26.pt(ctx, x, ay, '', q[1] === 'F' || q[1] === 'F′' ? '#b45309' : '#7c3aed'); Q48.T(ctx, q[1], x, ay + 17, { s: fs, w: 900, c: q[1].length > 2 || q[1][0] === '2' ? '#6d28d9' : '#b45309' }); });
    Q26.pt(ctx, xl, ay, '', '#0f172a'); if (o.c !== false) Q48.T(ctx, 'C', xl + 10, ay + 15, { s: fs, w: 900, c: '#0f172a' });
  },
  /* white light colours with wavelengths (nm) */
  COL: [['#ef4444', 680], ['#f97316', 610], ['#facc15', 580], ['#22c55e', 530], ['#3b82f6', 470], ['#6366f1', 445], ['#a855f7', 410]],
  /* dimension arrow between x1 and x2 at height y with label */
  dim(ctx, x1, x2, y, lab, col = '#0f172a', o = {}) {
    if (Math.abs(x2 - x1) < 4) return; Q41.line(ctx, [[x1, y], [x2, y]], col, 1.5); const a = Math.sign(x2 - x1);
    Q26.head(ctx, x2, y, a > 0 ? 0 : Math.PI, col, 7); Q26.head(ctx, x1, y, a > 0 ? Math.PI : 0, col, 7);
    Q41.line(ctx, [[x1, y - 6], [x1, y + 6]], col, 1.2); Q41.line(ctx, [[x2, y - 6], [x2, y + 6]], col, 1.2);
    if (lab) Q48.T(ctx, lab, (x1 + x2) / 2, y + (o.dy || -12), { s: o.s || 11.5, w: 900, c: o.c || '#fff', bg: o.bg || col });
  }
});

/* =============== A1 — أنواع العدسات: صندوق ضوئي وتتبع حقيقي للأشعة (الشكلان 1-8 و 2-8 + تذكر ص 134) =============== */
(() => {
  const RB = 260, PPC = 13; // base radius px, px per cm
  // signed curvatures (1/R, px⁻¹) of the two faces; R > 0 when the centre is on the right
  const SH = { bx: [1 / RB, -1 / RB], mx: [2.5 / RB, .5 / RB], px: [0, -2 / RB], bc: [-1 / RB, 1 / RB], mc: [.5 / RB, 2.5 / RB], pc: [0, 2 / RB] };
  const NAME = { bx: 'محدبة الوجهين — a', mx: 'مقعرة–محدبة — b', px: 'مستوية–محدبة — c', bc: 'مقعرة الوجهين — a', mc: 'محدبة–مقعرة — b', pc: 'مستوية–مقعرة — c' };
  const sag = (c, y) => c === 0 ? 0 : (1 / c) - Math.sign(c) * Math.sqrt(Math.max(0, 1 / (c * c) - y * y)); // x offset of face at height y
  const D = { id: 'g10_ln_types', page: 133, fig: 'الشكلان 1-8 و 2-8 + تذكر ص 134',
    desc: 'العدسات أجسام شفافة محددة بسطحين كرويين أو بسطح كروي وآخر مستوٍ، تصنع من الزجاج للضوء المرئي ومن الكوارتز للأشعة فوق البنفسجية ومن الجرمانيوم للأشعة تحت الحمراء البعيدة. العدسة المحدبة (اللامة) وسطها أسمك من حافتها فتجمع الأشعة، والمقعرة (المفرقة) وسطها أقل سمكاً من حافتها فتفرق الأشعة، عندما يكون معامل انكسار مادتها أكبر من معامل انكسار الوسط المحيط.',
    tags: 'أنواع العدسات محدبة لامة مقعرة مفرقة محدبة الوجهين مستوية محدبة مقعرة محدبة مقعرة الوجهين موشوران كوارتز جرمانيوم معامل انكسار الوسط الماء',
    tools: ['صندوق ضوئي يعطي حزمة أشعة متوازية', 'ست عدسات زجاجية مختلفة الأشكال', 'حوض ماء'],
    steps: ['اختر شكل العدسة من الأزرار: ثلاث محدبة (الصف الأعلى) وثلاث مقعرة (الصف الأسفل).', 'لاحظ: كل عدسة وسطها أسمك من حافتها تجمع الأشعة في البؤرة F′، وكل عدسة وسطها أرق تفرقها.', 'اسحب الصندوق الضوئي للأعلى والأسفل: الأشعة البعيدة عن المحور تنحرف أكثر.', 'فعّل «موشوران» لترى لماذا تجمع اللامة الأشعة، ثم غيّر n أو اغمر العدسة في الماء وراقب البعد البؤري.'],
    concl: ['العدسة اللامة (المحدبة) سميكة الوسط: تعمل عمل موشورين قاعدتاهما مشتركتان عند المركز البصري، فتجمع الأشعة.', 'العدسة المفرقة (المقعرة) رقيقة الوسط: تعمل عمل موشورين يلتقي رأساهما عند المركز البصري، فتفرق الأشعة.', 'كلما زاد معامل انكسار مادة العدسة قصر بعدها البؤري.', 'في الماء يقل الفرق بين معاملي الانكسار فيزداد البعد البؤري للعدسة (علل ب ص 154).'],
    laws: ['g10_lensmaker', 'g10_lenspow'],
    controls: [R('n', 'معامل انكسار مادة العدسة n', 1.3, 1.9, 1.5, .01, ''), TG('wat', 'العدسة مغمورة في الماء', false, null, 'water'), TG('pr', 'العدسة موشوران (تذكر)', false, null, 'prism')],
    setup(S) { S.sh = 'bx'; S.c1 = SH.bx[0]; S.c2 = SH.bx[1]; S.by = 0; S.byT = 0; S.nm = 1; S.clk = 0; },
    update(S, dt) { S.clk += dt; const T = SH[S.sh]; S.c1 += (T[0] - S.c1) * Math.min(1, dt * 7); S.c2 += (T[1] - S.c2) * Math.min(1, dt * 7); Q48.ease(S, 'by', 'byT', dt, 10); S.nm += ((S.p.wat ? 1.33 : 1) - S.nm) * Math.min(1, dt * 4); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, xl: L + 250, ay: 430, H: 82, ty: h - 150 }; },
    surf(S, g) { const s1 = sag(S.c1, g.H), s2 = sag(S.c2, g.H), tc = Math.max(5, 5 - s2 + s1); return [{ c: S.c1, vx: g.xl - tc / 2 }, { c: S.c2, vx: g.xl + tc / 2 }]; },
    f(S) { const k = (S.p.n / S.nm - 1) * (S.c1 - S.c2); return Math.abs(k) < 1e-7 ? Infinity : 1 / k; },
    tr(S, g, y0, surfs) { // real Snell trace of a horizontal ray at height y0 (screen offset)
      let P = [g.L + 70, g.ay + y0], Dd = [1, 0]; const pts = [P]; const n = S.p.n, ns = [S.nm, n, S.nm];
      for (let i = 0; i < 2; i++) { const s = surfs[i]; let hit, nn;
        if (Math.abs(s.c) < 1e-7) { const t = (s.vx - P[0]) / Dd[0]; hit = [P[0] + Dd[0] * t, P[1] + Dd[1] * t]; nn = [-1, 0]; }
        else { const R = 1 / s.c, C = [s.vx + R, g.ay], r = Q26.circ(P, Dd, C, Math.abs(R)); const fx = P[0] - C[0], fy = P[1] - C[1], b = fx * Dd[0] + fy * Dd[1], cc = fx * fx + fy * fy - R * R, Dsc = b * b - cc; if (Dsc < 0 || !r) return pts;
          const sq = Math.sqrt(Dsc), cand = [-b - sq, -b + sq].filter(t => t > 1e-3).map(t => [P[0] + Dd[0] * t, P[1] + Dd[1] * t]); hit = cand.reduce((a, b2) => Math.abs(b2[0] - s.vx) < Math.abs(a[0] - s.vx) ? b2 : a); nn = Q26.nrm([hit[0] - C[0], hit[1] - C[1]]); }
        pts.push(hit); const r2 = Q26.refr(Dd, nn, ns[i], ns[i + 1]); if (!r2) return pts; Dd = r2; P = hit; }
      const xe = g.w - 14, t = (xe - P[0]) / Dd[0]; pts.push([xe, P[1] + Dd[1] * t]); return pts;
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), surfs = D.surf(S, g), f = D.f(S), cx = S.c1 - S.c2 > 0, fcm = f / PPC;
      Q26.room(ctx, w, h, g.ty, { top: '#0b1220', bot: '#1e293b' });
      if (S.p.wat) K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, 250, 0, g.ty); gg.addColorStop(0, 'rgba(56,189,248,.18)'); gg.addColorStop(1, 'rgba(14,116,144,.38)'); ctx.fillStyle = gg; ctx.fillRect(g.L + 10, 270, w - g.L - 24, g.ty - 270); ctx.strokeStyle = 'rgba(186,230,253,.7)'; ctx.lineWidth = 2; ctx.strokeRect(g.L + 10, 270, w - g.L - 24, g.ty - 270); });
      Q26.axis(ctx, g.L + 70, w - 14, g.ay, 'rgba(148,163,184,.55)'); Q48.T(ctx, 'المحور الأساس', g.L + 150, g.ay + 104, { s: 11, w: 800, c: '#94a3b8' });
      // rays
      const ys = [-.86, -.6, -.32, 0, .32, .6, .86].map(k => k * 60 + S.by);
      ys.forEach((y0, i) => { const pts = D.tr(S, g, y0, surfs); const hit = Math.abs(y0) <= g.H - 2; Q26.ray(ctx, hit ? pts : [pts[0], [w - 14, g.ay + y0]], i === 3 ? '#fde047' : '#fbbf24', { w: 2.2, hs: 7 }); if (hit && !cx && pts.length > 3) { const a = pts[pts.length - 2], b = pts[pts.length - 1], sl = (b[1] - a[1]) / (b[0] - a[0]); Q26.ray(ctx, [a, [g.xl + f, a[1] + sl * (g.xl + f - a[0])]], '#fbbf24', { dash: [5, 5], w: 1.4, alpha: .6 }); } });
      // glass lens drawn from the real faces
      K.raw(ctx, () => { ctx.save(); const gg = ctx.createLinearGradient(g.xl - 40, 0, g.xl + 40, 0); gg.addColorStop(0, 'rgba(147,197,253,.35)'); gg.addColorStop(.5, 'rgba(224,242,254,.55)'); gg.addColorStop(1, 'rgba(96,165,250,.35)'); ctx.fillStyle = gg; ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 1.8; ctx.beginPath();
        for (let k = 0; k <= 40; k++) { const y = -g.H + 2 * g.H * k / 40; const x = surfs[0].vx + sag(S.c1, y); k ? ctx.lineTo(x, g.ay + y) : ctx.moveTo(x, g.ay + y); }
        for (let k = 40; k >= 0; k--) { const y = -g.H + 2 * g.H * k / 40; ctx.lineTo(surfs[1].vx + sag(S.c2, y), g.ay + y); } ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(surfs[0].vx + sag(S.c1, -g.H * .6) + 4, g.ay - g.H * .6); ctx.lineTo(surfs[0].vx + sag(S.c1, -g.H * .1) + 4, g.ay - g.H * .1); ctx.stroke(); ctx.restore(); });
      if (S.p.pr) K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 2.2; ctx.setLineDash([6, 4]); const H = g.H, x = g.xl, d = 26; ctx.beginPath();
        if (cx) { ctx.moveTo(x, g.ay - H); ctx.lineTo(x - d, g.ay); ctx.lineTo(x + d, g.ay); ctx.closePath(); ctx.moveTo(x, g.ay + H); ctx.lineTo(x - d, g.ay); ctx.lineTo(x + d, g.ay); ctx.closePath(); }
        else { ctx.moveTo(x, g.ay); ctx.lineTo(x - d, g.ay - H); ctx.lineTo(x + d, g.ay - H); ctx.closePath(); ctx.moveTo(x, g.ay); ctx.lineTo(x - d, g.ay + H); ctx.lineTo(x + d, g.ay + H); ctx.closePath(); } ctx.stroke(); ctx.restore(); });
      if (S.p.pr) Q48.T(ctx, cx ? 'موشوران قاعدتاهما عند المركز البصري' : 'موشوران رأساهما عند المركز البصري', g.xl, g.ay + g.H + 24, { s: 11.5, w: 900, c: '#fff', bg: '#be185d' });
      // focus marks
      if (isFinite(f) && Math.abs(f) < w) { const xf = g.xl + f; if (xf > g.L + 70 && xf < w - 14) { Q26.pt(ctx, xf, g.ay, '', '#f59e0b'); Q48.T(ctx, cx ? 'F′ البؤرة' : 'F البؤرة', xf, g.ay + 20, { s: 12, w: 900, c: '#fde68a' }); } const xf2 = g.xl - f; if (xf2 > g.L + 70 && xf2 < w - 14) { Q26.pt(ctx, xf2, g.ay, '', '#f59e0b'); Q48.T(ctx, cx ? 'F' : 'F′', xf2, g.ay + 20, { s: 12, w: 900, c: '#fde68a' }); } }
      if (isFinite(f) && Math.abs(f) >= w - g.xl - 20 && cx) Q48.T(ctx, 'البؤرة أبعد من حافة الشاشة ⟵', w - 120, g.ay + 46, { s: 11.5, w: 900, c: '#fff', bg: '#0369a1' });
      Q26.pt(ctx, g.xl, g.ay, '', '#e2e8f0'); Q48.T(ctx, 'C', g.xl + 12, g.ay - 12, { s: 12, w: 900, c: '#e2e8f0' });
      Q26.raybox(ctx, g.L + 70, g.ay + S.by, 0, 1, 120);
      Q48.T(ctx, NAME[S.sh], g.xl, g.ay - g.H - 22, { s: 13, w: 900, c: '#fff', bg: cx ? '#0369a1' : '#7c3aed' });
      const P = isFinite(f) ? 100 / fcm : 0;
      Q48.card(ctx, S, [{ t: cx ? 'وسطها أسمك من حافتها: لامة' : 'وسطها أرق من حافتها: مفرقة', c: cx ? '#0369a1' : '#7c3aed', w: 900 }, { t: 'معامل انكسار العدسة n = ' + S.p.n.toFixed(2) }, { t: 'معامل انكسار الوسط = ' + S.nm.toFixed(2) + (S.p.wat ? ' ماء' : ' هواء') }, { t: 'f = ' + (isFinite(f) ? (fcm > 0 ? '+' : '') + fcm.toFixed(1) + ' cm' : '∞'), mono: 1, c: '#b91c1c', w: 900 }, { t: 'P = 1 / f = ' + (P > 0 ? '+' : '') + P.toFixed(2) + ' D', mono: 1 }, { t: S.p.wat ? 'في الماء: f أطول لأن n/n(وسط) أصغر' : 'زجاج للمرئي، كوارتز للفوق البنفسجية', c: '#475569', s: 11.5 }], { title: 'العدسة: ' + Q48.LT[S.sh][0], y: 70, wd: 300 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); C.b.forEach(b => b._col = '#7c3aed'); Q42.drawChips(ctx, C.b);
      Q48.banner(ctx, w, 'اختر شكل العدسة، واسحب الصندوق الضوئي');
    },
    chips(S, g) { const set = (S2, k) => { S2.sh = k; }; return { a: Q42.chips(S, 'sx', ['bx', 'mx', 'px'].map(k => [k, NAME[k]]), g.h - 128, S.sh, set, { bw: 190 }), b: Q42.chips(S, 'sc', ['bc', 'mc', 'pc'].map(k => [k, NAME[k]]), g.h - 84, S.sh, set, { bw: 190 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'box', x: g.L + 40, y: g.ay + S.by, w: 70, h: 120, axis: 'y', keep: true, tip: 'اسحب الصندوق الضوئي للأعلى أو الأسفل', idle: 'اسحب ✋', drag: (S2, d) => { S2.byT = clamp(d.y - g.ay, -40, 40); } },
        { id: 'lens', x: g.xl, y: g.ay, w: 50, h: 2 * g.H, axis: 'none', hint: false, tip: 'اضغط لتبديل شكل العدسة', click: S2 => { const k = Object.keys(SH), i = k.indexOf(S2.sh); S2.sh = k[(i + 1) % k.length]; } }].concat(C.a, C.b); },
    readings(S) { const f = D.f(S) / PPC; return [rd('شكل العدسة', Q48.LT[S.sh][0]), rd('نوعها', S.c1 - S.c2 > 0 ? 'لامة (محدبة)' : 'مفرقة (مقعرة)'), rd('البعد البؤري f', isFinite(f) ? f.toFixed(1) + ' cm' : '∞'), rd('القدرة P', isFinite(f) ? (100 / f).toFixed(2) + ' D' : '0')]; },
    explain(S) { const cx = S.c1 - S.c2 > 0; return Q26.ex(cx ? 'الأشعة المتوازية تنكسر مرتين عند وجهي العدسة فتتجمع في نقطة واحدة F′ خلفها.' : 'الأشعة المتوازية تتفرق بعد نفاذها وكأنها صادرة من نقطة أمام العدسة هي البؤرة F.', 'كل جزء صغير من العدسة يعمل كموشور ينحرف فيه الشعاع نحو قاعدته. في اللامة القواعد نحو المركز فتتجمع الأشعة، وفي المفرقة القواعد نحو الحافة فتتفرق. وكلما قل الفرق بين معاملي انكسار العدسة والوسط قلّ الانحراف وطال البعد البؤري.', 'النظارات الطبية وعدسات الكاميرا والمجهر، وعدسات الجرمانيوم في كاميرات التصوير الحراري.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — المفاهيم الأساسية والأشعة الرئيسة وصفات الصورة (الأشكال 3-8 … 10-8 + فكر ص 138) =============== */
(() => {
  const PPC = 9;
  const CASES = [['inf', 'في اللانهاية', 0], ['g2', 'أبعد من 2F', 2.6], ['a2', 'عند 2F', 2], ['b2', 'بين F و 2F', 1.5], ['af', 'عند F', 1], ['in', 'أقل من F', .6]];
  const D = { id: 'g10_ln_rays', page: 134, fig: 'الأشكال 3-8 إلى 10-8 + فكر ص 138',
    desc: 'المركز البصري C نقطة في مركز العدسة ينفذ منها الشعاع دون انحراف. المحور الأساس يمر بالمركز البصري والبؤرتين، والمحور الثانوي أي مستقيم آخر يمر بالمركز البصري. البؤرة F نقطة على المحور الأساس كل شعاع صادر منها أو متجه نحوها ينفذ موازياً للمحور. لتحديد الصورة نرسم شعاعين من رأس الجسم والثالث للتأكد: (1) الموازي للمحور ينفذ ماراً بالبؤرة F′، (2) المار بالمركز البصري ينفذ دون انحراف، (3) المار بالبؤرة F ينفذ موازياً للمحور.',
    tags: 'المركز البصري المحور الأساس المحور الثانوي البؤرة البعد البؤري الأشعة الرئيسة رسم الصورة حقيقية تقديرية مقلوبة معتدلة مكبرة مصغرة 2F عدسة لامة مفرقة صفات الصورة',
    tools: ['عدسة لامة', 'عدسة مفرقة', 'جسم سهم مضيء', 'مسطرة'],
    steps: ['اسحب رأس الجسم (السهم الأزرق) يميناً ويساراً وللأعلى: الأشعة الثلاثة تُرسم من رأسه وتلتقي في رأس الصورة.', 'اضغط حالات الصف الأعلى (في اللانهاية، أبعد من 2F، عند 2F، …) وسجّل صفات الصورة لكل حالة (فكر ص 138).', 'اضغط «مقعرة» في الصف الأسفل أو فعّل «المقارنة» لترى العدستين معاً: صورة المفرقة دائماً تقديرية معتدلة مصغرة.', 'غيّر البعد البؤري f من اللوحة وراقب كيف تتحرك الصورة.'],
    concl: ['الشعاع الموازي للمحور ينفذ ماراً بالبؤرة F′ ، والمار بالمركز البصري لا ينحرف، والمار بالبؤرة ينفذ موازياً للمحور.', 'جسم أبعد من 2F: صورة حقيقية مقلوبة مصغرة بين F′ و 2F′ (الشكل 7-8). جسم بين F و 2F: حقيقية مقلوبة مكبرة (الشكل 8-8).', 'جسم عند 2F: حقيقية مقلوبة مساوية عند 2F′ ، جسم عند F: الصورة في اللانهاية ، جسم في اللانهاية: الصورة في البؤرة F′.', 'جسم بين F والعدسة: صورة تقديرية معتدلة مكبرة في جهة الجسم نفسها (الشكل 9-8).', 'العدسة المفرقة: الصورة دائماً تقديرية معتدلة مصغرة في جهة الجسم وأمامه مهما كان موقعه (الشكل 10-8).'],
    laws: ['g10_lenslaw'],
    controls: [R('f', 'البعد البؤري |f|', 6, 14, 10, 1, 'cm'), TG('r3', 'الشعاع الثالث (المار بالبؤرة)', true, null, 'rays'), TG('cmp', 'مقارنة: المحدبة والمقعرة معاً', false, null, 'compare'), TG('fl', 'نبضات ضوئية متحركة', true, null, 'particles')],
    setup(S) { S.typ = 'cx'; S.u = 25; S.uT = 25; S.ho = 4; S.hoT = 4; S.cs = 'g2'; S.inf = 0; S.clk = 0; },
    update(S, dt) { S.clk += dt; Q48.ease(S, 'u', 'uT', dt, 7); Q48.ease(S, 'ho', 'hoT', dt, 9); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), xl = L + 330, cmp = !!S.p.cmp; return { w, h, L, xl, cmp, ays: cmp ? [385, 565] : [455], H: cmp ? 62 : 92 }; },
    one(ctx, S, g, ay, typ) {
      const f = (typ === 'cx' ? 1 : -1) * S.p.f * PPC, xl = g.xl, ho = Math.min(S.ho * PPC, g.cmp ? 48 : 70), xo = xl - S.u * PPC, x1 = g.w - 14;
      Q48.marks(ctx, xl, ay, f, g.L + 8, x1); Q41.line(ctx, [[xl, ay - g.H - 14], [xl, ay + g.H + 14]], 'rgba(15,23,42,.25)', 1, [3, 4]);
      Q48.lens(ctx, xl, ay, g.H, typ === 'cx' ? 'bx' : 'bc', { s: 6 });
      if (S.inf) { // distant object: parallel inclined rays
        const a = .1, yf = f * a, out = [];
        [-40, 0, 40].forEach((yl, k) => { if (!S.p.r3 && k === 2) return; const col = Q48.RC[k], x0 = g.L + 20, p = [[x0, ay + yl - a * (xl - x0)], [xl, ay + yl]]; const sl = a - yl / f; p.push([x1, ay + yl + sl * (x1 - xl)]); Q26.ray(ctx, p, col, { w: 2.3, hs: 8 }); if (f < 0) Q26.ray(ctx, [[xl, ay + yl], [xl + f, ay + yf]], col, { dash: [6, 5], w: 1.8 }); if (S.p.fl) Q48.flow(ctx, p, col, S.clk + k * .3); });
        Q26.pt(ctx, xl + f, ay + yf, '', '#ea580c'); Q48.T(ctx, 'صورة نقطية', xl + f + (f > 0 ? 34 : -34), ay + yf + 16, { s: 11, w: 900, c: '#fff', bg: '#ea580c' });
        Q48.T(ctx, 'أشعة من جسم بعيد جداً', g.L + 90, ay - g.H - 6, { s: 11, w: 800, c: '#334155' });
        return { v: f, M: 0 };
      }
      const r = Q48.rays3(ctx, { xl, ay, f, xo, ho, x1, show: [1, 1, S.p.r3 ? 1 : 0], flow: S.p.fl, ph: S.clk, clipY: g.cmp ? 150 : 210, w: 2.3 });
      Q26.obj(ctx, xo, ay, ho, '#2563eb'); Q48.T(ctx, 'الجسم', xo, ay + 34, { s: 11, w: 900, c: '#1d4ed8' });
      if (isFinite(r.v)) { const virt = r.v < 0, hi = r.hi, show = Math.abs(hi) < (g.cmp ? 150 : 210) && r.xi < x1 && r.xi > g.L;
        if (show) { Q26.obj(ctx, r.xi, ay, hi, '#ea580c', { dash: virt, w: 4 }); Q48.T(ctx, virt ? 'صورة تقديرية' : 'صورة حقيقية', r.xi, ay + (hi > 0 ? 34 : -hi + 16), { s: 11, w: 900, c: '#fff', bg: '#ea580c' }); }
        else Q48.T(ctx, 'الصورة بعيدة جداً', x1 - 70, ay - 20, { s: 11, w: 900, c: '#fff', bg: '#ea580c' });
        if (virt) Q26.eye(ctx, x1 - 24, ay, .8, Math.PI); }
      else Q48.T(ctx, 'أشعة متوازية: الصورة في اللانهاية', x1 - 120, ay - g.H, { s: 11, w: 900, c: '#fff', bg: '#ea580c' });
      return r;
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q48.bgLight(ctx, w, h);
      const types = g.cmp ? ['cx', 'cc'] : [S.typ];
      types.forEach((t, i) => { D.one(ctx, S, g, g.ays[i], t); if (g.cmp) Q48.T(ctx, t === 'cx' ? 'عدسة لامة' : 'عدسة مفرقة', g.L + 50, g.ays[i] - g.H, { s: 12, w: 900, c: '#fff', bg: t === 'cx' ? '#0369a1' : '#7c3aed' }); });
      // card: image properties
      const L = []; types.forEach(t => { const f = (t === 'cx' ? 1 : -1) * S.p.f, P = S.inf ? { L: t === 'cx' ? ['حقيقية', 'نقطية في البؤرة F′'] : ['تقديرية', 'نقطية في البؤرة F'] } : Q48.props(S.u, f);
        if (g.cmp) L.push({ t: (t === 'cx' ? 'اللامة: ' : 'المفرقة: ') + P.L.join('، '), c: t === 'cx' ? '#0369a1' : '#7c3aed', w: 800 }); else P.L.forEach(q => L.push({ t: '• ' + q, w: 800, c: '#0f172a' }));
        if (!S.inf && isFinite(P.v)) L.push({ t: (g.cmp ? (t === 'cx' ? 'لامة' : 'مفرقة') + ': ' : '') + 'v = ' + Q48.n1(P.v) + ' cm   M = ' + Q48.n1(P.M, 2), mono: g.cmp ? 0 : 1, c: '#b91c1c', w: 900 }); });
      Q48.card(ctx, S, L, { title: S.inf ? 'الجسم في اللانهاية' : 'صفات الصورة: u = ' + S.u.toFixed(1) + ' cm', y: 70, wd: 300 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); C.t.forEach(b => b._col = b._lab.indexOf('مقعرة') >= 0 ? '#7c3aed' : '#0369a1'); Q42.drawChips(ctx, C.t);
      Q48.banner(ctx, w, 'اسحب رأس الجسم الأزرق، أو اختر الحالة');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', CASES.map(q => [q[0], q[1]]), g.h - 128, S.inf ? 'inf' : S.cs, (S2, k) => { const q = CASES.find(c => c[0] === k); S2.cs = k; if (k === 'inf') { S2.inf = 1; return; } S2.inf = 0; S2.uT = q[2] * S2.p.f; }, { bw: 120 }),
      t: Q42.chips(S, 'typ', [['cx', 'عدسة محدبة (لامة)'], ['cc', 'عدسة مقعرة (مفرقة)']], g.h - 84, g.cmp ? '' : S.typ, (S2, k) => { S2.typ = k; if (S2.p.cmp) setParam(S2, 'cmp', false); }, { bw: 200 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), ay = g.ays[0], ho = Math.min(S.ho * PPC, g.cmp ? 48 : 70);
      return [{ id: 'obj', x: g.xl - S.u * PPC, y: ay - ho, r: 20, axis: 'xy', keep: true, tip: 'اسحب رأس الجسم', idle: 'اسحب ✋', drag: (S2, d) => { S2.inf = 0; S2.cs = ''; S2.uT = S2.u = clamp((g.xl - d.x) / PPC, 2, (g.xl - g.L - 20) / PPC); S2.hoT = S2.ho = clamp((ay - d.y) / PPC, 1, g.cmp ? 5 : 7.5); } }].concat(C.c, C.t); },
    readings(S) { const f = (S.typ === 'cx' ? 1 : -1) * S.p.f, P = Q48.props(S.u, f); return [rd('بعد الجسم u', S.inf ? '∞' : S.u.toFixed(1) + ' cm'), rd('بعد الصورة v', S.inf ? Q48.n1(f) + ' cm' : Q48.n1(P.v) + ' cm'), rd('التكبير M', S.inf ? '≈ 0' : Q48.n1(P.M, 2)), rd('صفات الصورة', S.inf ? 'في البؤرة' : P.L.slice(0, 3).join('، '), 1)]; },
    explain(S) { return Q26.ex('الشعاع الأحمر الموازي للمحور ينفذ ماراً بالبؤرة، والأخضر يمر بالمركز البصري على استقامته، والأزرق المار بالبؤرة ينفذ موازياً، وتلتقي الثلاثة في رأس الصورة.', 'جانبا العدسة عند المركز البصري متوازيان تقريباً فلا ينحرف الشعاع (علل ج ص 154). والصورة الحقيقية تتكون من تلاقي الأشعة نفسها فيمكن استلامها على حاجز، أما التقديرية فتتكون من تلاقي امتدادات الأشعة.', 'العدسة المكبرة تعطي صورة تقديرية معتدلة مكبرة لجسم داخل بؤرتها، والكاميرا تعطي صورة حقيقية مقلوبة مصغرة لجسم أبعد من 2F.'); }
  };
  M8.P[D.id] = D;
})();

/* ---------- shared optical-bench scene: candle (u), lens at xl, screen at distance sc; f signed cm, D aperture cm ---------- */
Q48.CK = .9; // candle drawing scale (total height 78·CK px)
Q48.bench = (ctx, S, g, o = {}) => {
  const f = o.f, u = S.u, sc = S.sc, v = Q48.vOf(u, f), M = isFinite(v) ? -v / u : Infinity, xo = g.xl - u * g.ppc, xs = g.xl + sc * g.ppc, Hl = 46, k = Q48.CK, ay = g.ay;
  const B = o.D * Math.abs(1 - sc / v); // blur-circle diameter on the screen (cm)
  Q48.rail(ctx, g.x0, g.x1, g.ry, g.ppc, { dark: true });
  // light cone from the flame through the lens to the screen
  if (o.cone !== false) K.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const yv = x => { const t = (x - g.xl) / g.ppc; return isFinite(v) ? Hl * (1 - t / v) : Hl; };
    const gr = ctx.createLinearGradient(xo, 0, xs, 0); gr.addColorStop(0, 'rgba(253,224,71,.32)'); gr.addColorStop(1, 'rgba(253,224,71,.14)'); ctx.fillStyle = gr;
    ctx.beginPath(); ctx.moveTo(xo, ay - 2); ctx.lineTo(g.xl, ay - Hl); ctx.lineTo(g.xl, ay + Hl); ctx.closePath(); ctx.fill();
    const N = 24; ctx.beginPath(); ctx.moveTo(g.xl, ay - Hl); for (let i = 1; i <= N; i++) { const x = g.xl + (xs - g.xl) * i / N; ctx.lineTo(x, ay - yv(x)); } for (let i = N; i >= 0; i--) { const x = g.xl + (xs - g.xl) * i / N; ctx.lineTo(x, ay + yv(x)); } ctx.closePath(); ctx.fill();
    ctx.globalAlpha = .55; ctx.strokeStyle = 'rgba(253,224,71,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.xl, ay - Hl); for (let i = 1; i <= N; i++) { const x = g.xl + (xs - g.xl) * i / N; ctx.lineTo(x, ay - yv(x)); } ctx.moveTo(g.xl, ay + Hl); for (let i = 1; i <= N; i++) { const x = g.xl + (xs - g.xl) * i / N; ctx.lineTo(x, ay + yv(x)); } ctx.stroke(); ctx.restore(); });
  // candle on its holder
  Q48.post(ctx, xo, ay + 64 * k, g.ry); K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, xo - 16, ay + 64 * k - 3, 32, 7, 3); ctx.fill(); });
  Q48.candle(ctx, xo, ay, k, k, S.clk || 0);
  Q48.mount(ctx, g.xl, ay, Hl, f > 0 ? 'bx' : 'bc', g.ry, { s: 8 });
  // principal rays from the candle base (book construction)
  if (o.rays) { const yb = 64 * k; Q41.line(ctx, [[g.xl, ay - 120], [g.xl, ay + 120]], 'rgba(226,232,240,.35)', 1, [3, 4]); Q48.rays3(ctx, { xl: g.xl, ay, f: f * g.ppc, xo, ho: -yb, x1: Math.max(xs, g.xl + 40), w: 1.8, glow: false, show: [1, 1, 0], clipY: 140 }); }
  // screen and the light on it
  const fr = Q48.screen(ctx, xs, ay, g.SH || 150, g.ry, { W: 30, dark: true });
  K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(fr.x, fr.y, fr.w, fr.h); ctx.clip(); ctx.translate(fr.x + fr.w / 2, ay);
    const pr = B * g.ppc, a = clamp(1.2 / (.2 + Math.abs(isFinite(M) ? M : 50) * .6), .2, 1) * clamp(2.4 / (1 + B), .25, 1); const gl = ctx.createRadialGradient(0, 0, 1, 0, 0, Math.max(6, pr / 2 + 6)); gl.addColorStop(0, `rgba(254,240,138,${.55 * clamp(3 / (1 + B), .15, 1)})`); gl.addColorStop(1, 'rgba(254,240,138,0)'); ctx.fillStyle = gl; ctx.fillRect(-fr.w, -fr.h, 2 * fr.w, 2 * fr.h);
    if (v > 0 && isFinite(v)) Q48.blurred(ctx, pr * .5, a, () => Q48.candle(ctx, 0, 0, .4 * k * Math.abs(M), k * M, S.clk || 0)); ctx.restore(); });
  // virtual image seen through the lens
  if (o.look && isFinite(v) && v < 0) { const xi = g.xl + v * g.ppc; if (xi > g.x0 - 30) { K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.x0 - 20, 0, g.xl - g.x0 + 20, g.ry - 2); ctx.clip(); Q48.blurred(ctx, 0, .32, () => Q48.candle(ctx, xi, ay, k * M, k * M, S.clk || 0)); ctx.restore(); }); Q48.T(ctx, 'صورة تقديرية معتدلة مكبرة', Math.max(g.x0 + 60, xi), ay - 22 * k * M - 18, { s: 11, w: 900, c: '#fff', bg: '#ea580c' }); }
    Q26.eye(ctx, g.xl + 70, ay, .9, Math.PI); Q41.line(ctx, [[g.xl + 50, ay], [xi, ay]], 'rgba(251,146,60,.6)', 1.4, [5, 5]); }
  // distance arrows
  Q48.dim(ctx, xo, g.xl, g.ry - 16, 'u = ' + u.toFixed(1) + ' cm', '#1d4ed8');
  Q48.dim(ctx, g.xl, xs, g.ry - 16, 's = ' + sc.toFixed(1) + ' cm', '#0f766e');
  return { v, M, B, xo, xs };
};
/* face-on view of the screen: shows exactly what a student sees */
Q48.inset = (ctx, S, x, y, w, h, r, o = {}) => {
  const q = o.q || 6, k = Q48.CK; // px per cm in the inset
  K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 10; ctx.fillStyle = '#475569'; rr(ctx, x - 6, y - 6, w + 12, h + 12, 6); ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#e5e7eb'; ctx.fillRect(x, y, w, h); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.translate(x + w / 2, y + h / 2);
    const pr = r.B * q, ok = r.v > 0 && isFinite(r.v); const amb = clamp(3.2 / (1 + r.B), .12, 1);
    const gl = ctx.createRadialGradient(0, 0, 1, 0, 0, Math.max(10, pr / 2 + 18)); gl.addColorStop(0, `rgba(253,224,71,${.65 * amb})`); gl.addColorStop(.7, `rgba(253,224,71,${.3 * amb})`); gl.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = gl; ctx.fillRect(-w, -h, 2 * w, 2 * h);
    if (ok) { const sc = q / (S.ppc || 7) * k, a = clamp(1.3 / (.3 + Math.abs(r.M) * .5), .3, 1); Q48.blurred(ctx, pr * .5, a, () => { if (o.draw) o.draw(ctx, r.M); else Q48.candle(ctx, 0, 0, sc * Math.abs(r.M), sc * r.M, S.clk || 0); }); }
    ctx.restore(); });
  Q48.T(ctx, o.title || 'ما يظهر على الحاجز', x + w / 2, y - 16, { s: 11.5, w: 900, c: '#fff', bg: '#334155' });
  const sharp = r.v > 0 && isFinite(r.v) && r.B < (o.tol || .15);
  Q48.T(ctx, sharp ? '✔ صورة واضحة' : r.v > 0 && isFinite(r.v) ? 'صورة مشوشة' : 'بقعة ضوء فقط', x + w / 2, y + h + 18, { s: 11.5, w: 900, c: '#fff', bg: sharp ? '#15803d' : '#b45309' });
  return sharp;
};

/* =============== B1 — المصطبة البصرية: الشمعة والعدسة والحاجز (الأشكال 7-8 … 10-8 حقيقة في المختبر) =============== */
(() => {
  const CASES = [['g2', 'أبعد من 2F', 2.5], ['a2', 'عند 2F', 2], ['b2', 'بين F و 2F', 1.5], ['af', 'عند F', 1], ['in', 'أقل من F', .6]];
  const D = { id: 'g10_ln_bench', page: 136, fig: 'الأشكال 7-8 إلى 10-8 على المصطبة البصرية',
    desc: 'نضع شمعة مشتعلة وعدسة وحاجزاً أبيض على مصطبة بصرية مدرجة. نحرك الحاجز حتى تظهر على الحاجز أوضح صورة للهب: الصورة الحقيقية تتكون من تلاقي الأشعة نفسها فيمكن استلامها على حاجز، أما الصورة التقديرية فلا تظهر على الحاجز بل نراها بالنظر خلال العدسة.',
    tags: 'المصطبة البصرية شمعة حاجز صورة حقيقية صورة تقديرية أوضح صورة مقلوبة مكبرة مصغرة عدسة لامة مفرقة تجربة',
    tools: ['مصطبة بصرية مدرجة 100 cm', 'شمعة', 'عدسة لامة وعدسة مفرقة على حاملين', 'حاجز أبيض'],
    steps: ['اسحب الشمعة لتغيير بعد الجسم u ، ثم اسحب الحاجز حتى تظهر أوضح صورة للهب (الإطار الأيسر يريك ما يظهر على الحاجز).', 'جرّب حالات الصف الأعلى: أبعد من 2F ، عند 2F ، بين F و 2F ، وقارن حجم الصورة واتجاهها، وسجّل u و v في الجدول.', 'ضع الشمعة أقرب من F: لا تظهر صورة على الحاجز مهما حركته، اضغط «انظر خلال العدسة» لترى الصورة التقديرية.', 'بدّل إلى العدسة المقعرة: بقعة ضوء فقط على الحاجز، والصورة تقديرية معتدلة مصغرة.'],
    concl: ['الصورة الحقيقية تُستلم على حاجز وتكون مقلوبة دائماً.', 'كلما اقتربت الشمعة من البؤرة ابتعدت صورتها وكبرت، وعند البؤرة تذهب الصورة إلى اللانهاية.', 'الجسم داخل البؤرة يعطي صورة تقديرية معتدلة مكبرة لا تُستلم على حاجز.', 'العدسة المفرقة لا تعطي صورة حقيقية لجسم حقيقي أبداً.'],
    laws: ['g10_lenslaw', 'g10_lensmag'],
    controls: [R('f', 'البعد البؤري للعدسة |f|', 6, 16, 10, .5, 'cm'), R('D', 'قطر فتحة العدسة', 1, 6, 3, .5, 'cm'), TG('cone', 'حزمة الضوء', true, null, 'rays'), TG('rays', 'الأشعة الرئيسة', false, null, 'rays')],
    setup(S) { S.typ = 'cx'; S.u = 25; S.uT = 25; S.sc = 30; S.scT = 30; S.look = 0; S.clk = 0; S.cs = 'g2'; },
    update(S, dt) { S.clk += dt; Q48.ease(S, 'u', 'uT', dt, 8); Q48.ease(S, 'sc', 'scT', dt, 6); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 24, ppc = (x1 - x0) / 100; return { w, h, L, x0, x1, ppc, xl: x0 + 40 * ppc, ay: 410, ry: 520, SH: 150 }; },
    f(S) { return (S.typ === 'cx' ? 1 : -1) * S.p.f; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), f = D.f(S); S.ppc = g.ppc;
      Q26.room(ctx, w, h, h - 150, { top: '#0f172a', bot: '#1e293b' });
      const r = Q48.bench(ctx, S, g, { f, D: S.p.D, cone: S.p.cone, rays: S.p.rays, look: S.look });
      const sharp = Q48.inset(ctx, S, g.L + 20, 66, 200, 170, r, { q: 8 });
      const P = Q48.props(S.u, f), far = isFinite(r.v) && r.v > 60.5;
      const st = !isFinite(r.v) ? 'الجسم في البؤرة: الأشعة تنفذ متوازية' : r.v < 0 ? 'لا تتكون صورة على الحاجز: الصورة تقديرية' : far ? 'الصورة أبعد من نهاية المصطبة' : sharp ? '✔ أوضح صورة: s = v' : 'حرّك الحاجز حتى تتضح الصورة';
      Q48.card(ctx, S, [{ t: 'بعد الجسم u = ' + S.u.toFixed(1) + ' cm' }, { t: 'بعد الحاجز s = ' + S.sc.toFixed(1) + ' cm' }, { t: 'من القانون v = ' + Q48.n1(r.v) + ' cm', c: '#b91c1c', w: 900 }, { t: st, c: sharp ? '#15803d' : '#b45309', w: 900 }, { t: 'الصورة: ' + P.L.slice(0, 3).join('، '), c: '#334155' }], { title: (S.typ === 'cx' ? 'عدسة لامة' : 'عدسة مفرقة') + ' f = ' + Q48.n1(f) + ' cm', y: 70, wd: 300 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q42.drawChips(ctx, C.t);
      Q48.banner(ctx, w, 'اسحب الشمعة، ثم اسحب الحاجز حتى تتضح الصورة');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', CASES.map(q => [q[0], q[1]]), g.h - 128, S.cs, (S2, k) => { S2.cs = k; S2.uT = CASES.find(q => q[0] === k)[2] * S2.p.f; }, { bw: 140 }),
      t: Q42.chips(S, 'tl', [['cx', 'عدسة لامة'], ['cc', 'عدسة مفرقة'], ['af', 'اضبط الحاجز ⇆'], ['lk', 'انظر خلال العدسة 👁']], g.h - 84, S.typ, (S2, k) => { if (k === 'cx' || k === 'cc') { S2.typ = k; return; } if (k === 'lk') { S2.look = S2.look ? 0 : 1; return; } const v = Q48.vOf(S2.u, D.f(S2)); if (isFinite(v) && v > 0) S2.scT = clamp(v, 2, 60); }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'candle', x: g.xl - S.u * g.ppc, y: g.ay + 20, w: 40, h: 110, axis: 'x', keep: true, tip: 'اسحب الشمعة على المصطبة', idle: 'اسحب ✋', drag: (S2, d) => { S2.cs = ''; S2.uT = S2.u = Math.round(clamp((g.xl - d.x) / g.ppc, 2, 39) * 2) / 2; } },
        { id: 'screen', x: g.xl + S.sc * g.ppc + 15, y: g.ay, w: 44, h: 150, axis: 'x', keep: true, hint: false, tip: 'اسحب الحاجز', drag: (S2, d) => { S2.scT = S2.sc = Math.round(clamp((d.x - 15 - g.xl) / g.ppc, 2, 60) * 10) / 10; } }].concat(C.c, C.t); },
    readings(S) { const f = D.f(S), v = Q48.vOf(S.u, f), B = S.p.D * Math.abs(1 - S.sc / v); return [rd('بعد الجسم u', S.u.toFixed(1) + ' cm'), rd('بعد الحاجز s', S.sc.toFixed(1) + ' cm'), rd('بعد الصورة v (القانون)', Q48.n1(v) + ' cm'), rd('قطر بقعة التشويش', B.toFixed(2) + ' cm'), rd('التكبير M', Q48.n1(-v / S.u, 2))]; },
    record(S) { return { u: S.u, s: +S.sc.toFixed(1), v: +Q48.vOf(S.u, D.f(S)).toFixed(1) }; },
    cols: [['u', 'u (cm)'], ['s', 's الحاجز (cm)'], ['v', 'v القانون (cm)']],
    explain(S) { return Q26.ex('عندما يكون الحاجز في موضع الصورة تماماً تلتقي أشعة كل نقطة من اللهب في نقطة واحدة فتظهر صورة واضحة مقلوبة، وإذا قربته أو أبعدته تصبح كل نقطة بقعة فتتشوش الصورة.', 'قطر بقعة التشويش = قطر فتحة العدسة × |1 − s / v| ، فيصبح صفراً عندما s = v. والصورة التقديرية تتكون من امتدادات الأشعة فلا تصل إلى الحاجز أي طاقة ضوئية لتكوينها.', 'ضبط وضوح الكاميرا يعني تحريك العدسة حتى تقع الصورة على الحساس تماماً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — نشاط 3: تعيين البعد البؤري بصورة تقريبية (الشمس / جسم بعيد) ص 138–139 =============== */
(() => {
  const D = { id: 'g10_ln_sun', page: 138, fig: 'نشاط 3 ص 138–139',
    desc: 'نشاط: تعيين البعد البؤري لعدسة لامة بصورة تقريبية وسريعة. خارج المختبر: نوجه العدسة إلى قرص الشمس ونستلم صورته على ورقة، ونغير موقع العدسة حتى نحصل على أصغر نقطة شديدة الإضاءة فهي البؤرة. داخل المختبر: نوجه العدسة نحو جسم بعيد كشجرة من شباك المختبر ونستلم صورته على حاجز. في الحالتين الأشعة القادمة من الجسم البعيد موازية للمحور فتتجمع في البؤرة، فالمسافة بين العدسة والحاجز = البعد البؤري تقريباً.',
    tags: 'نشاط 3 تعيين البعد البؤري الشمس بؤرة نقطة شديدة الإضاءة احتراق الورقة جسم بعيد شجرة شباك المختبر حاجز',
    tools: ['عدسة لامة', 'حاجز (ورقة أو جدار)', 'مسطرة', 'شمس أو جسم بعيد'],
    steps: ['خارج المختبر: اسحب العدسة (المكبرة) يميناً ويساراً حتى تصغر البقعة على الورقة إلى أصغر نقطة شديدة الإضاءة.', 'انتظر قليلاً عند البؤرة: ترتفع حرارة الورقة حتى تحترق! اقرأ المسافة على المسطرة.', 'داخل المختبر: اضغط «جسم بعيد» واسحب الحاجز حتى تظهر صورة الشجرة واضحة مقلوبة.', 'قارن المسافتين بالبعد البؤري الحقيقي (ألغِ «عدسة مجهولة» من اللوحة).'],
    concl: ['أشعة الشمس أو الجسم البعيد تصل إلى العدسة متوازية فتتجمع في بؤرتها.', 'المسافة بين العدسة وأصغر بقعة (أو أوضح صورة لجسم بعيد) = البعد البؤري تقريباً.', 'الطريقة تقريبية لأن الجسم البعيد ليس في اللانهاية تماماً: v أكبر قليلاً من f.'],
    laws: ['g10_lenslaw'],
    controls: [R('f', 'البعد البؤري الحقيقي للعدسة', 8, 25, 15, .5, 'cm'), R('D', 'قطر العدسة', 2, 8, 5, .5, 'cm'), TG('hide', 'عدسة مجهولة: أخفِ f', true, null, 'eye')],
    setup(S) { S.sc = 'sun'; S.d = 25; S.dT = 25; S.s = 25; S.sT = 25; S.T = 30; S.burn = 0; S.clk = 0; S.smk = []; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), ppc = 14, xp = L + 600; return { w, h, L, ppc, xp, ay: 420, ty: h - 150 }; },
    spot(S) { const f = S.p.f, d = S.d; return Math.max(f * .0093, S.p.D * Math.abs(1 - d / f)); },
    update(S, dt) { S.clk += dt; Q48.ease(S, 'd', 'dT', dt, 8); Q48.ease(S, 's', 'sT', dt, 8);
      if (S.sc === 'sun') { const I = Math.pow(S.p.D / D.spot(S), 2), Tt = Math.min(520, 30 + .55 * I); S.T += (Tt - S.T) * Math.min(1, dt * (Tt > S.T ? .8 : 1.5)); if (S.T > 233) S.burn = Math.min(1, S.burn + dt * (S.T - 233) / 500);
        if (S.T > 180 && Math.random() < dt * 14) S.smk.push({ x: 0, y: 0, a: 1, vx: (Math.random() - .5) * 14, vy: -30 - Math.random() * 20 }); }
      S.smk.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; p.a -= dt * .45; }); S.smk = S.smk.filter(p => p.a > 0).slice(-60); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), f = S.p.f, hide = S.p.hide, ay = g.ay; G.bg(ctx, w, h, false);
      if (S.sc === 'sun') {
        K.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 0, 0, g.ty); sk.addColorStop(0, '#38bdf8'); sk.addColorStop(1, '#e0f2fe'); ctx.fillStyle = sk; ctx.fillRect(0, 0, w, g.ty); const gr = ctx.createLinearGradient(0, g.ty, 0, h); gr.addColorStop(0, '#65a30d'); gr.addColorStop(1, '#3f6212'); ctx.fillStyle = gr; ctx.fillRect(0, g.ty, w, h - g.ty); });
        Q26.sun(ctx, g.L + 40, ay - 40, 34, S.clk);
        const xl = g.xp - S.d * g.ppc, Hl = S.p.D / 2 * g.ppc, sp = D.spot(S) * g.ppc;
        // parallel sunlight → lens → spot on the paper
        K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(254,249,195,.35)'; ctx.fillRect(g.L + 70, ay - Hl, xl - g.L - 70, 2 * Hl); const y2 = sp / 2; ctx.fillStyle = 'rgba(253,224,71,.5)'; ctx.beginPath(); ctx.moveTo(xl, ay - Hl); ctx.lineTo(xl + Math.min(S.d, f) * g.ppc, ay - (S.d > f ? 0 : y2)); if (S.d > f) ctx.lineTo(g.xp, ay - y2); ctx.lineTo(g.xp, ay + y2); if (S.d > f) ctx.lineTo(xl + f * g.ppc, ay); ctx.lineTo(xl, ay + Hl); ctx.closePath(); ctx.fill(); ctx.restore(); });
        for (let k = -2; k <= 2; k++) { const y0 = k / 2.2 * Hl; Q26.ray(ctx, [[g.L + 80, ay + y0], [xl, ay + y0], [xl + S.d * g.ppc, ay + y0 * (1 - S.d / f)]], '#f59e0b', { w: 1.6, glow: false, hs: 7 }); }
        // magnifying glass with handle
        Q48.lens(ctx, xl, ay, Hl, 'bx', { s: Math.max(4, Hl * .12) }); K.raw(ctx, () => { ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(xl, ay, 5, Hl + 3, 0, 0, TAU); ctx.stroke(); const g2 = ctx.createLinearGradient(xl - 7, 0, xl + 7, 0); g2.addColorStop(0, '#7c2d12'); g2.addColorStop(.5, '#c2410c'); g2.addColorStop(1, '#7c2d12'); ctx.fillStyle = g2; rr(ctx, xl - 7, ay + Hl + 3, 14, 70, 6); ctx.fill(); });
        // paper on a stand
        K.raw(ctx, () => { ctx.fillStyle = '#78350f'; ctx.fillRect(g.xp + 6, ay + 70, 6, g.ty - ay - 70); ctx.fillStyle = '#fafaf9'; ctx.fillRect(g.xp, ay - 70, 8, 140); ctx.fillStyle = 'rgba(254,240,138,.95)'; ctx.fillRect(g.xp - 1, ay - sp / 2, 4, Math.max(2, sp)); if (S.burn > 0) { ctx.fillStyle = `rgba(28,25,23,${.3 + .7 * S.burn})`; ctx.fillRect(g.xp - 1, ay - 2 - 6 * S.burn, 9, 4 + 12 * S.burn); } });
        S.smk.forEach(p => K.raw(ctx, () => { ctx.fillStyle = `rgba(120,113,108,${p.a * .5})`; ctx.beginPath(); ctx.arc(g.xp - 6 + p.x, ay + p.y, 6 + (1 - p.a) * 14, 0, TAU); ctx.fill(); }));
        Q48.rail(ctx, xl, g.xp, g.ty - 40, g.ppc, { n: Math.floor(S.d) });
        Q48.dim(ctx, xl, g.xp, ay + 110, 'المسافة = ' + S.d.toFixed(1) + ' cm', '#1d4ed8');
        // face-on paper inset with spot
        const ix = g.L + 20, iy = 70, iw = 190, ih = 150; K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#fafaf9'; ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = 8; ctx.fillRect(ix, iy, iw, ih); ctx.shadowColor = 'transparent'; ctx.beginPath(); ctx.rect(ix, iy, iw, ih); ctx.clip();
          const r0 = Math.max(1.5, D.spot(S) * 9 / 2), I = Math.pow(S.p.D / D.spot(S), 2), gg = ctx.createRadialGradient(ix + iw / 2, iy + ih / 2, 0, ix + iw / 2, iy + ih / 2, r0 + 6); gg.addColorStop(0, 'rgba(255,255,255,1)'); gg.addColorStop(.6, `rgba(253,224,71,${clamp(.25 + I / 300, .25, 1)})`); gg.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(ix + iw / 2, iy + ih / 2, r0 + 6, 0, TAU); ctx.fill();
          if (S.burn > 0) { ctx.fillStyle = `rgba(41,37,36,${.4 + .6 * S.burn})`; ctx.beginPath(); ctx.arc(ix + iw / 2, iy + ih / 2, 3 + 16 * S.burn, 0, TAU); ctx.fill(); ctx.strokeStyle = `rgba(234,88,12,${S.burn})`; ctx.lineWidth = 2; ctx.stroke(); } ctx.restore(); });
        Q48.T(ctx, 'الورقة من الأمام', ix + iw / 2, iy - 14, { s: 11.5, w: 900, c: '#fff', bg: '#334155' });
        Q42.T(ctx, 'حرارة الورقة ' + Math.round(S.T) + ' °C', ix + iw / 2, iy + ih + 16, { s: 12, w: 900, c: '#fff', bg: S.T > 233 ? '#b91c1c' : '#b45309' });
        const best = Math.abs(S.d - f) < .6;
        Q48.card(ctx, S, [{ t: 'قطر البقعة = ' + D.spot(S).toFixed(2) + ' cm' }, { t: best ? '✔ أصغر بقعة: الورقة في البؤرة' : 'حرّك العدسة لتصغير البقعة', c: best ? '#15803d' : '#b45309', w: 900 }, { t: 'إذن f ≈ ' + S.d.toFixed(1) + ' cm', c: '#b91c1c', w: 900 }, { t: hide ? 'البعد البؤري الحقيقي مخفي' : 'البعد البؤري الحقيقي = ' + f + ' cm', c: '#475569' }, { t: S.burn > .05 ? 'احترقت الورقة! الطاقة مركزة في البؤرة' : 'لا تنظر إلى الشمس مباشرة', c: S.burn > .05 ? '#b91c1c' : '#334155', w: 800 }], { title: 'خارج المختبر: صورة الشمس', y: 70, wd: 300 });
      } else {
        // inside the lab: window with a far tree, lens on a holder, screen
        Q26.room(ctx, w, h, g.ty, { top: '#1e293b', bot: '#334155' });
        const wx = g.L + 14, wy = 300, ww = 92, wh = 170, xl = g.L + 230, xs = xl + S.s * g.ppc, u = 2000, v = Q48.vOf(u, f), M = -v / u, B = S.p.D * Math.abs(1 - S.s / v);
        const tree = (c, sc) => { c.fillStyle = '#7c2d12'; c.fillRect(-4 * sc, -10 * sc, 8 * sc, 60 * sc); c.fillStyle = '#15803d'; c.beginPath(); c.arc(0, -30 * sc, 30 * sc, 0, TAU); c.arc(-20 * sc, -10 * sc, 20 * sc, 0, TAU); c.arc(20 * sc, -12 * sc, 20 * sc, 0, TAU); c.fill(); };
        K.raw(ctx, () => { ctx.save(); const sk = ctx.createLinearGradient(0, wy, 0, wy + wh); sk.addColorStop(0, '#7dd3fc'); sk.addColorStop(1, '#bbf7d0'); ctx.fillStyle = sk; ctx.fillRect(wx, wy, ww, wh); ctx.translate(wx + ww / 2, wy + wh - 50); tree(ctx, .9); ctx.restore(); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 6; ctx.strokeRect(wx, wy, ww, wh); ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh); ctx.moveTo(wx, wy + wh / 2); ctx.lineTo(wx + ww, wy + wh / 2); ctx.lineWidth = 3; ctx.stroke(); });
        Q48.T(ctx, 'شباك: شجرة بعيدة', wx + ww / 2, wy - 14, { s: 11, w: 900, c: '#e2e8f0' });
        K.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(186,230,253,.13)'; ctx.fillRect(wx + ww, ay - 40, xl - wx - ww, 80); ctx.beginPath(); ctx.moveTo(xl, ay - 40); ctx.lineTo(xl + Math.min(S.s, v) * g.ppc, ay); ctx.lineTo(xl, ay + 40); ctx.fill(); ctx.restore(); });
        const ry = ay + 100, nn = Math.floor((w - 24 - xl) / g.ppc); Q48.rail(ctx, xl, xl + nn * g.ppc, ry, g.ppc, { n: nn, dark: true });
        Q48.mount(ctx, xl, ay, 40, 'bx', ry, { s: 6 }); const fr = Q48.screen(ctx, xs, ay, 120, ry, { W: 28, dark: true });
        K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(fr.x, fr.y, fr.w, fr.h); ctx.clip(); ctx.translate(fr.x + fr.w / 2, ay); Q48.blurred(ctx, B * g.ppc * .5, .8, () => { ctx.save(); ctx.scale(.4 * 24 * Math.abs(M) * 2, 24 * M * 2); tree(ctx, 1 / 24); ctx.restore(); }); ctx.restore(); });
        Q48.dim(ctx, xl, xs, ry - 14, 's = ' + S.s.toFixed(1) + ' cm', '#0f766e');
        const sharp = Q48.inset(ctx, S, g.L + 20, 70, 190, 150, { v, M, B }, { title: 'الحاجز من الأمام', tol: .12, q: 10, draw: (c, m) => Q48.tree(c, 600 * m * 10) });
        Q48.card(ctx, S, [{ t: 'بعد الحاجز s = ' + S.s.toFixed(1) + ' cm' }, { t: sharp ? '✔ أوضح صورة للشجرة: مقلوبة مصغرة' : 'اسحب الحاجز حتى تتضح الصورة', c: sharp ? '#15803d' : '#b45309', w: 900 }, { t: 'إذن f ≈ ' + S.s.toFixed(1) + ' cm', c: '#b91c1c', w: 900 }, { t: hide ? 'البعد البؤري الحقيقي مخفي' : 'f الحقيقي = ' + f + ' cm وأدق صورة عند v = ' + v.toFixed(2) + ' cm', c: '#475569' }], { title: 'داخل المختبر: جسم بعيد 20 m', y: 70, wd: 300 });
      }
      Q42.drawChips(ctx, D.chips(S, g));
      Q48.banner(ctx, w, S.sc === 'sun' ? 'اسحب العدسة حتى تصغر البقعة' : 'اسحب الحاجز حتى تتضح صورة الشجرة');
    },
    chips(S, g) { return Q42.chips(S, 'sc', [['sun', 'خارج المختبر: الشمس ☀'], ['far', 'داخل المختبر: جسم بعيد 🌳'], ['nw', '↺ ورقة جديدة']], g.h - 84, S.sc, (S2, k) => { if (k === 'nw') { S2.burn = 0; S2.T = 30; S2.smk = []; return; } S2.sc = k; }, { bw: 220 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      if (S.sc === 'sun') return [{ id: 'lens', x: g.xp - S.d * g.ppc, y: g.ay, w: 40, h: 2 * S.p.D / 2 * g.ppc + 60, axis: 'x', keep: true, tip: 'اسحب العدسة', idle: 'اسحب ✋', drag: (S2, d) => { S2.dT = S2.d = Math.round(clamp((g.xp - d.x) / g.ppc, 3, 36) * 10) / 10; } }].concat(C);
      const xl = g.L + 230; return [{ id: 'scr', x: xl + S.s * g.ppc + 14, y: g.ay, w: 40, h: 120, axis: 'x', keep: true, tip: 'اسحب الحاجز', idle: 'اسحب ✋', drag: (S2, d) => { S2.sT = S2.s = Math.round(clamp((d.x - 14 - xl) / g.ppc, 3, Math.floor((g.w - 24 - xl) / g.ppc) - 1) * 10) / 10; } }].concat(C); },
    readings(S) { return S.sc === 'sun' ? [rd('المسافة عدسة–ورقة', S.d.toFixed(1) + ' cm'), rd('قطر البقعة', D.spot(S).toFixed(2) + ' cm'), rd('حرارة الورقة', Math.round(S.T) + ' °C'), rd('البعد البؤري', S.p.hide ? '؟' : S.p.f + ' cm')] : [rd('بعد الحاجز s', S.s.toFixed(1) + ' cm'), rd('البعد البؤري', S.p.hide ? '؟' : S.p.f + ' cm')]; },
    record(S) { return { m: S.sc === 'sun' ? 'الشمس' : 'جسم بعيد', d: S.sc === 'sun' ? S.d : S.s }; },
    cols: [['m', 'الطريقة'], ['d', 'f التقريبي (cm)']],
    explain(S) { return Q26.ex('عند مسافة معينة تصبح بقعة الضوء أصغر ما يمكن وشديدة اللمعان حتى تحترق الورقة، وصورة الشجرة البعيدة تتضح عند المسافة نفسها تقريباً.', 'الأشعة القادمة من جسم بعيد جداً متوازية تقريباً، والأشعة المتوازية للمحور تتجمع بعد نفاذها في البؤرة، فالمسافة من العدسة إلى أصغر بقعة هي البعد البؤري. وتركيز طاقة الشمس على مساحة صغيرة يرفع الحرارة.', 'لا تترك قنينة ماء أو عدسة في الشمس داخل السيارة أو قرب الأعشاب الجافة، فقد تعمل عمل عدسة لامة وتسبب حريقاً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — طريقة بعد الجسم وبعد الصورة مع الرسم البياني (تطبيق على قانون العدسات) =============== */
(() => {
  const LENS = [['A', 'العدسة A', 10], ['B', 'العدسة B', 12.5], ['C', 'العدسة C', 15]];
  const D = { id: 'g10_ln_uv', page: 139, fig: 'تطبيق مختبري على قانون العدسات ص 139',
    desc: 'طريقة أدق لإيجاد البعد البؤري: نضع الشمعة على أبعاد مختلفة u من العدسة، ونحرك الحاجز في كل مرة حتى تظهر أوضح صورة ونقيس v. نرسم 1/v مقابل 1/u فنحصل على خط مستقيم يقطع المحورين عند 1/f لأن 1/u + 1/v = 1/f.',
    tags: 'طريقة u v البعد البؤري رسم بياني 1/u 1/v خط مستقيم مقطع مصطبة بصرية قياس تجربة',
    tools: ['مصطبة بصرية', 'شمعة', 'عدسة لامة مجهولة البعد البؤري', 'حاجز'],
    steps: ['اسحب الشمعة إلى بعد u (أكبر من f)، ثم اسحب الحاجز حتى يظهر «✔ صورة واضحة».', 'اضغط «سجّل النقطة»: تظهر النقطة (1/u , 1/v) على الرسم وتُحسب f = uv / (u + v).', 'كرر لخمسة أبعاد مختلفة على الأقل، ولاحظ أن النقاط تقع على خط مستقيم يقطع المحورين عند 1/f.', 'بدّل إلى عدسة أخرى وأعد التجربة.'],
    concl: ['1/u + 1/v = 1/f: رسم 1/v مقابل 1/u خط مستقيم ميله −1.', 'مقطع الخط على كل من المحورين = 1/f ، ومنه البعد البؤري.', 'أخذ معدل عدة قراءات يقلل الخطأ في تحديد أوضح صورة.'],
    laws: ['g10_lenslaw'],
    controls: [TG('cone', 'حزمة الضوء', true, null, 'rays'), TG('hint', 'أظهر الموضع الصحيح للصورة', false, null, 'eye')],
    setup(S) { S.ln = 'A'; S.u = 20; S.uT = 20; S.sc = 30; S.scT = 30; S.pts = []; S.clk = 0; },
    update(S, dt) { S.clk += dt; Q48.ease(S, 'u', 'uT', dt, 8); Q48.ease(S, 'sc', 'scT', dt, 8); },
    f(S) { return LENS.find(q => q[0] === S.ln)[2]; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 24, ppc = (x1 - x0) / 100; return { w, h, L, x0, x1, ppc, xl: x0 + 40 * ppc, ay: 425, ry: 530, SH: 130 }; },
    fit(S) { if (!S.pts.length) return null; return S.pts.length / S.pts.reduce((a, p) => a + 1 / p.u + 1 / p.v, 0); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), f = D.f(S); S.ppc = g.ppc; Q26.room(ctx, w, h, h - 150, { top: '#0f172a', bot: '#1e293b' });
      const r = Q48.bench(ctx, S, g, { f, D: 3, cone: S.p.cone });
      if (S.p.hint && r.v > 0 && r.v < 61) { const xi = g.xl + r.v * g.ppc; Q41.line(ctx, [[xi, g.ay - 80], [xi, g.ry - 26]], '#f472b6', 1.6, [4, 4]); Q48.T(ctx, 'v', xi, g.ay - 90, { s: 12, w: 900, c: '#fff', bg: '#be185d' }); }
      const sharp = Q48.inset(ctx, S, g.L + 354, 72, 100, 100, r, { q: 3.5, title: 'الحاجز' });
      // graph 1/v against 1/u
      const A = { x: g.L + 60, y: 74, w: 260, h: 190, xmax: .12, ymax: .12, xs: .01, ys: .01, lxs: .04, lys: .04, xl: '1/u (cm⁻¹)', yl: '1/v (cm⁻¹)' }, ax = Q41.axes(ctx, A);
      const fe = D.fit(S); if (fe) { Q41.line(ctx, [[ax.X(1 / fe), ax.Y(0)], [ax.X(0), ax.Y(1 / fe)]], '#0f766e', 2); Q41.dot(ctx, ax.X(1 / fe), ax.Y(0), '#be185d', 6); Q41.dot(ctx, ax.X(0), ax.Y(1 / fe), '#be185d', 6); }
      S.pts.forEach(p => Q41.dot(ctx, ax.X(1 / p.u), ax.Y(Math.min(.12, 1 / p.v)), '#dc2626', 5));
      const L = S.pts.slice(-4).map(p => ({ t: 'u = ' + p.u.toFixed(1) + '  v = ' + p.v.toFixed(1) + '  f = ' + (p.u * p.v / (p.u + p.v)).toFixed(2), mono: 1, s: 11.5 }));
      if (!L.length) L.push({ t: 'لا توجد قراءات بعد', c: '#64748b' });
      L.push({ t: sharp ? '✔ الصورة واضحة: سجّل النقطة' : 'اسحب الحاجز حتى تتضح الصورة', c: sharp ? '#15803d' : '#b45309', w: 900 });
      if (fe) L.push({ t: 'المقطع 1/f = ' + (1 / fe).toFixed(4) + ' ⟸ f = ' + fe.toFixed(2) + ' cm', c: '#b91c1c', w: 900 });
      Q48.card(ctx, S, L, { title: 'عدد القراءات: ' + S.pts.length, y: 70, wd: 255 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.l); C.a[0]._col = '#15803d'; Q42.drawChips(ctx, C.a);
      Q48.banner(ctx, w, 'حرّك الشمعة ثم الحاجز، وسجّل كل نقطة');
    },
    chips(S, g) { return { l: Q42.chips(S, 'ln', LENS.map(q => [q[0], q[1]]), g.h - 128, S.ln, (S2, k) => { if (S2.ln !== k) S2.pts = []; S2.ln = k; }, { bw: 200 }),
      a: Q42.chips(S, 'ac', [['rec', '📌 سجّل النقطة'], ['clr', '🗑 امسح النقاط']], g.h - 84, 'rec', (S2, k) => { if (k === 'clr') { S2.pts = []; return; } S2.pts.push({ u: S2.u, v: S2.sc }); if (S2.pts.length > 12) S2.pts.shift(); }, { bw: 200 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'candle', x: g.xl - S.u * g.ppc, y: g.ay + 20, w: 40, h: 110, axis: 'x', keep: true, tip: 'اسحب الشمعة', idle: 'اسحب ✋', drag: (S2, d) => { S2.uT = S2.u = Math.round(clamp((g.xl - d.x) / g.ppc, 2, 39) * 2) / 2; } },
        { id: 'screen', x: g.xl + S.sc * g.ppc + 15, y: g.ay, w: 44, h: 130, axis: 'x', keep: true, hint: false, tip: 'اسحب الحاجز', drag: (S2, d) => { S2.scT = S2.sc = Math.round(clamp((d.x - 15 - g.xl) / g.ppc, 2, 60) * 10) / 10; } }].concat(C.l, C.a); },
    readings(S) { const fe = D.fit(S); return [rd('u', S.u.toFixed(1) + ' cm'), rd('v المقاس (الحاجز)', S.sc.toFixed(1) + ' cm'), rd('عدد النقاط', S.pts.length), rd('f من الرسم', fe ? fe.toFixed(2) + ' cm' : '—')]; },
    record(S) { return { u: S.u, v: +S.sc.toFixed(1), iu: +(1 / S.u).toFixed(4), iv: +(1 / S.sc).toFixed(4), f: +(S.u * S.sc / (S.u + S.sc)).toFixed(2) }; },
    cols: [['u', 'u (cm)'], ['v', 'v (cm)'], ['iu', '1/u'], ['iv', '1/v'], ['f', 'f (cm)']],
    explain(S) { return Q26.ex('النقاط الحمراء تقع تقريباً على خط مستقيم مائل يقطع المحورين عند القيمة نفسها.', 'من قانون العدسات 1/v = 1/f − 1/u ، وهي معادلة خط مستقيم ميله −1 ومقطعه 1/f. وكل قراءة تعطي f = uv / (u + v) ، ومعدلها أدق من قراءة واحدة.', 'يستعمل صانعو النظارات أجهزة تقيس البعد البؤري (قدرة العدسة) بالمبدأ نفسه.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — قانون العدسات والتكبير وإشاراتهما + المثالان 1 و 2 + فكر ص 140 =============== */
(() => {
  const PPC = 8;
  const EX = {
    a: { n: 'مثال 1 — أ', f: 10, u: 30, cc: false, q: 'عدسة لامة بعدها البؤري 10 cm وجسم على بعد 30 cm منها. جد بعد الصورة وصفاتها والتكبير.', lines: ['1/f = 1/u + 1/v', '1/10 = 1/30 + 1/v', '1/v = 1/10 − 1/30 = 2/30 = 1/15', 'v = +15 cm', 'الإشارة الموجبة: صورة حقيقية على يمين العدسة', 'M = −v/u = −15/30 = −0.5', 'التكبير سالب: مقلوبة، وأقل من واحد: مصغرة'] },
    b: { n: 'مثال 1 — ب', f: 10, u: 10, cc: false, q: 'العدسة نفسها f = 10 cm والجسم على بعد 10 cm منها.', lines: ['الجسم في البؤرة لأن u = f', '1/v = 1/10 − 1/10 = 0', 'الصورة في اللانهاية: v = ∞'] },
    c: { n: 'مثال 1 — ج', f: 10, u: 5, cc: false, q: 'العدسة نفسها f = 10 cm والجسم على بعد 5 cm منها.', lines: ['1/10 = 1/5 + 1/v', '1/v = 1/10 − 2/10 = −1/10', 'v = −10 cm', 'الإشارة السالبة: الصورة تقديرية', 'M = −v/u = −(−10)/5 = +2', 'موجب: معتدلة، والرقم 2: مكبرة مرتين'] },
    e2: { n: 'مثال 2 — مفرقة', f: 6, u: 12, cc: true, q: 'وضع جسم على بعد 12 cm أمام عدسة مفرقة بعدها البؤري 6 cm. ما صفات الصورة المتكونة؟', lines: ['المفرقة: f = −6 cm', '1/(−6) = 1/12 + 1/v', '1/v = −1/6 − 1/12 = −1/4', 'v = −4 cm', 'السالبة: تقديرية في جهة الجسم وأمامه', 'M = −v/u = −(−4)/12 = +1/3', 'معتدلة تقديرية طولها ثلث طول الجسم'] },
    th: { n: 'فكر: معنى M', f: 10, u: 30, cc: false, q: 'ما معنى التكبير M = 1 و M = 2 و M = −0.5 ؟', lines: ['عندما M = 1: الصورة معتدلة مساوية للجسم', 'عندما M = 2: معتدلة تقديرية مكبرة مرتين', 'عندما M = −0.5: حقيقية مقلوبة طولها نصف طول الجسم', 'ونسبة المساحتين A′/A = M² = 0.25'] }
  };
  const D = { id: 'g10_ln_law', page: 139, fig: 'الشكل 11-8 + المثالان 1 و 2 ص 141–142',
    desc: 'قانون العدسات الرقيقة: 1/f = 1/u + 1/v ، وهو القانون العام للمرايا والعدسات. التكبير M = h′/h = −v/u. عندما ينتقل الضوء من اليسار إلى اليمين: u موجب للجسم الحقيقي على يسار العدسة، v موجب للصورة الحقيقية على يمينها وسالب للتقديرية على يسارها، f موجب للمحدبة وسالب للمقعرة، والطول موجب للمعتدل وسالب للمقلوب. ونسبة مساحتي الصورة والجسم A′/A = v²/u².',
    tags: 'قانون العدسات 1/f=1/u+1/v التكبير M=-v/u h′/h إشارات الكميات تقديرية حقيقية نسبة المساحتين مثال 1 مثال 2 فكر',
    tools: ['عدسة لامة f = 10 cm', 'عدسة مفرقة f = 6 cm', 'جسم سهم', 'مسطرة مترية'],
    steps: ['اسحب رأس الجسم: تتغير u و v والتكبير، ولاحظ إشارة v (موجبة يمين العدسة، سالبة يسارها).', 'اختر مثال 1 بحالاته الثلاث ثم مثال 2، واضغط «الخطوة التالية» لترى الحل خطوة خطوة على الرسم.', 'فعّل «عدسة مقعرة» من اللوحة: f سالبة و v سالبة دائماً.', 'اقرأ في البطاقة نسبة المساحتين A′/A = (v/u)².'],
    concl: ['1/f = 1/u + 1/v مع مراعاة الإشارات.', 'M = −v/u: سالب ⟸ حقيقية مقلوبة ، موجب ⟸ تقديرية معتدلة.', '|M| > 1 مكبرة ، |M| < 1 مصغرة ، |M| = 1 مساوية.', 'مثال 1: v = +15 cm و M = −0.5 ، ثم v = ∞ ، ثم v = −10 cm و M = +2. مثال 2: v = −4 cm و M = +1/3.'],
    laws: ['g10_lenslaw', 'g10_lensmag', 'g10_lensarea'],
    controls: [R('f', 'البعد البؤري |f|', 4, 15, 10, .5, 'cm'), TG('cc', 'عدسة مقعرة: f سالب', false, null, 'lens'), TG('rays', 'الأشعة الرئيسة', true, null, 'rays')],
    setup(S) { S.u = 30; S.uT = 30; S.ho = 3; S.ex = ''; S.k = 0; S.clk = 0; },
    update(S, dt) { S.clk += dt; Q48.ease(S, 'u', 'uT', dt, 7); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, xl: L + 330, ay: 480 }; },
    f(S) { return (S.p.cc ? -1 : 1) * S.p.f; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), f = D.f(S), u = S.u, P = Q48.props(u, f), v = P.v, ay = g.ay, xl = g.xl, x0 = g.L + 8, x1 = w - 12, xo = xl - u * PPC, ho = S.ho * PPC;
      Q48.bgLight(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(234,88,12,.07)'; ctx.fillRect(x0, ay - 150, xl - x0, 270); ctx.fillStyle = 'rgba(22,163,74,.08)'; ctx.fillRect(xl, ay - 150, x1 - xl, 270); });
      Q48.T(ctx, 'صورة تقديرية: v سالب', (x0 + xl) / 2, ay + 108, { s: 11.5, w: 900, c: '#c2410c' }); Q48.T(ctx, 'صورة حقيقية: v موجب', (xl + x1) / 2, ay + 108, { s: 11.5, w: 900, c: '#15803d' });
      Q26.ray(ctx, [[xl - 70, ay - 168], [xl + 70, ay - 168]], '#0f766e', { w: 2, glow: false }); Q48.T(ctx, 'اتجاه الضوء', xl, ay - 184, { s: 11, w: 900, c: '#0f766e' });
      // signed ruler
      K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; for (let c = -Math.floor((xl - x0) / PPC); c <= (x1 - xl) / PPC; c++) { const x = xl + c * PPC, L = c % 10 === 0 ? 9 : c % 5 === 0 ? 6 : 3; ctx.lineWidth = c % 10 ? .7 : 1.3; ctx.beginPath(); ctx.moveTo(x, ay); ctx.lineTo(x, ay + L); ctx.stroke(); } });
      for (let c = -40; c <= 50; c += 10) { const x = xl + c * PPC; if (x > x0 + 4 && x < x1 - 4 && c) Q48.T(ctx, (c > 0 ? '+' : '−') + Math.abs(c), x, ay + 34, { s: 9.5, w: 800, c: '#475569' }); }
      Q48.marks(ctx, xl, ay, f * PPC, x0, x1, { fs: 11 }); Q48.lens(ctx, xl, ay, 110, f > 0 ? 'bx' : 'bc', { s: 6 });
      let r = { v }; if (S.p.rays) r = Q48.rays3(ctx, { xl, ay, f: f * PPC, xo, ho, x1, w: 1.8, glow: false, clipY: 145, show: [1, 1, 1] });
      Q26.obj(ctx, xo, ay, ho, '#2563eb');
      if (isFinite(v)) { const xi = xl + v * PPC, hi = ho * P.M; if (xi > x0 && xi < x1 && Math.abs(hi) < 145) Q26.obj(ctx, xi, ay, hi, '#ea580c', { dash: v < 0, w: 4 });
        Q48.dim(ctx, xl, clamp(xi, x0, x1), ay + 70, 'v = ' + (v > 0 ? '+' : '') + Q48.n1(v) + ' cm', v > 0 ? '#15803d' : '#c2410c'); }
      Q48.dim(ctx, xo, xl, ay - 130, 'u = +' + u.toFixed(1) + ' cm', '#1d4ed8');
      // card
      if (S.ex) { const e = EX[S.ex]; Q42.steps(ctx, S, { title: e.n, q: e.q, lines: e.lines, k: S.k }, { y: 70, x: w - 12, wd: 330 }); }
      else { const M = P.M; Q48.card(ctx, S, [{ t: '1/v = 1/f − 1/u', mono: 1, c: '#0f766e', w: 900 }, { t: '= 1/' + Q48.n1(f) + ' − 1/' + u.toFixed(1), mono: 1 }, { t: 'v = ' + (v > 0 ? '+' : '') + Q48.n1(v) + ' cm', mono: 1, c: '#b91c1c', w: 900 }, { t: 'M = −v/u = ' + (isFinite(M) ? Q48.n1(M, 2) : '∞'), mono: 1, c: '#b91c1c', w: 900 }, { t: "A′/A = v²/u² = " + (isFinite(M) ? (M * M).toFixed(2) : '∞'), mono: 1 }, { t: 'الصورة: ' + P.L.slice(0, 3).join('، '), c: '#334155', w: 800 }], { title: (f > 0 ? 'عدسة لامة' : 'عدسة مفرقة') + ': f = ' + Q48.n1(f) + ' cm', y: 70, wd: 300 }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.e); C.s[0]._col = '#be185d'; Q42.drawChips(ctx, C.s);
      Q48.banner(ctx, w, 'اسحب رأس الجسم، أو اختر مثالاً من الكتاب');
    },
    chips(S, g) { return { e: Q42.chips(S, 'ex', Object.keys(EX).map(k => [k, EX[k].n]), g.h - 128, S.ex, (S2, k) => { const e = EX[k]; S2.ex = k; S2.k = 0; setParam(S2, 'f', e.f); setParam(S2, 'cc', e.cc); S2.uT = e.u; S2.ho = 3; }, { bw: 140 }),
      s: Q42.chips(S, 'st', [['nx', '⬇ الخطوة التالية'], ['all', 'الحل كاملاً'], ['fr', '↺ تجربة حرة']], g.h - 84, '', (S2, k) => { if (k === 'fr') { S2.ex = ''; return; } if (!S2.ex) { S2.ex = 'a'; S2.k = 0; setParam(S2, 'f', 10); setParam(S2, 'cc', false); S2.uT = 30; } const n = EX[S2.ex].lines.length; S2.k = k === 'all' ? n : Math.min(S2.k + 1, n); }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'obj', x: g.xl - S.u * PPC, y: g.ay - S.ho * PPC, r: 20, axis: 'xy', keep: true, tip: 'اسحب رأس الجسم', idle: 'اسحب ✋', drag: (S2, d) => { S2.ex = ''; S2.uT = S2.u = Math.round(clamp((g.xl - d.x) / PPC, 1, (g.xl - g.L - 20) / PPC) * 2) / 2; S2.ho = clamp((g.ay - d.y) / PPC, 1, 8); } }].concat(C.e, C.s); },
    readings(S) { const P = Q48.props(S.u, D.f(S)); return [rd('f', Q48.n1(D.f(S)) + ' cm'), rd('u', S.u.toFixed(1) + ' cm'), rd('v', Q48.n1(P.v) + ' cm'), rd('M', Q48.n1(P.M, 2)), rd('A′/A', isFinite(P.M) ? (P.M * P.M).toFixed(3) : '∞')]; },
    record(S) { const P = Q48.props(S.u, D.f(S)); return { f: D.f(S), u: S.u, v: +Q48.n1(P.v).replace('−', '-'), M: +Q48.n1(P.M, 2).replace('−', '-') }; },
    cols: [['f', 'f (cm)'], ['u', 'u (cm)'], ['v', 'v (cm)'], ['M', 'M']],
    explain(S) { return Q26.ex('عندما يكون الجسم أبعد من البؤرة تكون v موجبة والتكبير سالباً (صورة حقيقية مقلوبة)، وعندما يكون داخل البؤرة أو مع عدسة مفرقة تكون v سالبة والتكبير موجباً.', 'الإشارات تجعل قانوناً واحداً 1/f = 1/u + 1/v يصلح لكل الحالات وللعدستين، و M = −v/u يخبرنا بالاتجاه (الإشارة) وبالحجم (المقدار).', 'تكبير −0.5 في الكاميرا يعني صورة مقلوبة طولها نصف طول الجسم، وتكبير +2 في المكبرة يعني صورة معتدلة مضاعفة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — نظام من عدستين رقيقتين + مثال 3 (الشكل 12-8 ص 143–145) =============== */
(() => {
  const PPC = 7;
  const EX = { q: 'عدستان محدبتان f₁ = 10 cm و f₂ = 5 cm والبعد بينهما 40 cm. وضع جسم على بعد 15 cm يسار الأولى. جد موقع الصورة النهائية وتكبيرها.', lines: ['1/10 = 1/15 + 1/v₁', 'v₁ = 30 cm', 'M₁ = −v₁/u₁ = −30/15 = −2', 'صورة الأولى حقيقية أمام الثانية: u₂ = 40 − 30 = 10 cm', '1/5 = 1/10 + 1/v₂', 'v₂ = 10 cm', 'M₂ = −v₂/u₂ = −10/10 = −1', 'M = M₁ × M₂ = −2 × −1 = +2', 'الإشارة الموجبة: الصورة النهائية معتدلة'] };
  const D = { id: 'g10_ln_combo', page: 143, fig: 'الشكل 12-8 + مثال 3 ص 145',
    desc: 'كثير من الأجهزة البصرية تحتوي على عدستين أو أكثر. نعامل العدسة الأولى كأنها مفردة ونجد صورتها، ثم نعد هذه الصورة جسماً للعدسة الثانية ونجد الصورة النهائية. التكبير الكلي M = M₁ × M₂. والبعد البؤري للنظام: 1/f = 1/f₁ + 1/f₂ − d/(f₁f₂) ، وللعدستين المتلاصقتين (d = 0): 1/f = 1/f₁ + 1/f₂.',
    tags: 'نظام عدستين عدستان متلاصقتان التكبير الكلي M1×M2 البعد البؤري للنظام d مثال 3 الصورة النهائية صورة العدسة الأولى جسم للثانية',
    tools: ['مصطبة بصرية', 'عدستان لامتان', 'جسم مضيء', 'حاجز'],
    steps: ['اسحب الجسم الأزرق، واسحب العدسة الثانية لتغيير البعد d بينهما.', 'لاحظ الصورة الأولى I₁ (بالخط الباهت): هي جسم العدسة الثانية.', 'اضغط «مثال 3» ثم «الخطوة التالية» لترى الحل على الرسم.', 'اضغط «متلاصقتان» لترى أن 1/f = 1/f₁ + 1/f₂.'],
    concl: ['صورة العدسة الأولى تصبح جسماً للعدسة الثانية: u₂ = d − v₁.', 'التكبير الكلي = حاصل ضرب التكبيرين: M = M₁ × M₂.', 'مثال 3: v₁ = 30 cm ، u₂ = 10 cm ، v₂ = 10 cm ، M = +2 (معتدلة).', 'للمتلاصقتين: 1/f = 1/f₁ + 1/f₂.'],
    laws: ['g10_lenscombo', 'g10_lensmag'],
    controls: [R('f1', 'البعد البؤري للأولى f₁', 3, 20, 10, .5, 'cm'), R('f2', 'البعد البؤري للثانية f₂', 3, 20, 5, .5, 'cm'), R('d', 'البعد بين العدستين d', 0, 60, 40, 1, 'cm')],
    setup(S) { S.u1 = 15; S.u1T = 15; S.dd = 40; S.ex = 0; S.k = 0; S.clk = 0; },
    update(S, dt) { S.clk += dt; Q48.ease(S, 'u1', 'u1T', dt, 8); S.dd += (S.p.d - S.dd) * Math.min(1, dt * 8); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x1 = L + 30 + 31 * PPC; return { w, h, L, x1, x2: x1 + S.dd * PPC, ay: 470 }; },
    calc(S) { const f1 = S.p.f1, f2 = S.p.f2, d = S.dd, u1 = S.u1, v1 = Q48.vOf(u1, f1), u2 = isFinite(v1) ? d - v1 : -Infinity, v2 = isFinite(u2) ? Q48.vOf(u2, f2) : f2, M1 = -v1 / u1, M2 = isFinite(u2) ? -v2 / u2 : 0, fs = 1 / (1 / f1 + 1 / f2 - d / (f1 * f2)); return { f1, f2, d, u1, v1, u2, v2, M1, M2, M: M1 * M2, fs }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = D.calc(S), ay = g.ay, xo = g.x1 - c.u1 * PPC, ho = 3 * PPC, xe = w - 12, Ls = [{ x: g.x1, f: c.f1 * PPC }, { x: g.x2, f: c.f2 * PPC }];
      Q48.bgLight(ctx, w, h); Q26.axis(ctx, g.L + 8, xe, ay, '#475569');
      [[g.x1, c.f1, '₁'], [g.x2, c.f2, '₂']].forEach(q => [-1, 1].forEach(sg => { const x = q[0] + sg * q[1] * PPC; if (x > g.L + 8 && x < xe) { Q26.pt(ctx, x, ay, '', '#b45309'); Q48.T(ctx, (sg < 0 ? 'F' : 'F′') + q[2], x, ay + 16, { s: 10.5, w: 900, c: '#b45309' }); } }));
      Q48.lens(ctx, g.x1, ay, 100, 'bx', { s: 6 }); Q48.lens(ctx, g.x2, ay, 100, 'bx', { s: 6 });
      Q48.T(ctx, 'العدسة الأولى', g.x1, ay - 118, { s: 11, w: 900, c: '#fff', bg: '#0369a1' }); Q48.T(ctx, 'العدسة الثانية', g.x2, ay - 118, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' });
      // three rays from the tip, traced through both lenses
      const sl = [0, ho / (g.x1 - xo), -(-ho) / ((g.x1 - c.f1 * PPC) - xo)];
      sl.forEach((s, k) => { const t = Q48.trace(xo, -ho, s, Ls, xe), pts = Q48.shift(t.pts, ay).map(p => [p[0], clamp(p[1], ay - 200, ay + 200)]); Q26.ray(ctx, pts, Q48.RC[k], { w: 2, glow: false, hs: 7 }); Q48.flow(ctx, pts, Q48.RC[k], S.clk + k * .3);
        if (isFinite(c.v2) && c.v2 < 0) { const yl = t.pts[t.pts.length - 2][1], xi = g.x2 + c.v2 * PPC; Q26.ray(ctx, [[g.x2, ay + yl], [xi, ay + yl + t.s * (xi - g.x2)]], Q48.RC[k], { dash: [5, 5], w: 1.5 }); } });
      Q26.obj(ctx, xo, ay, ho, '#2563eb'); Q48.T(ctx, 'الجسم', xo, ay + 30, { s: 11, w: 900, c: '#1d4ed8' });
      if (isFinite(c.v1)) { const xi = g.x1 + c.v1 * PPC, hi = ho * c.M1; if (xi > g.L && xi < xe && Math.abs(hi) < 190) { Q26.obj(ctx, xi, ay, hi, '#a855f7', { dash: true, w: 3, alpha: .8 }); Q48.T(ctx, 'I₁', xi + 14, ay - hi / 2, { s: 12, w: 900, c: '#7c3aed' }); } }
      if (isFinite(c.v2)) { const xi = g.x2 + c.v2 * PPC, hi = ho * c.M; if (xi > g.L && xi < xe && Math.abs(hi) < 190) { Q26.obj(ctx, xi, ay, hi, '#ea580c', { dash: c.v2 < 0, w: 4 }); Q48.T(ctx, 'الصورة النهائية', xi, ay + (hi > 0 ? 28 : -hi + 16), { s: 11, w: 900, c: '#fff', bg: '#ea580c' }); } }
      Q48.dim(ctx, g.x1, g.x2, ay + 130, 'd = ' + c.d.toFixed(0) + ' cm', '#334155');
      if (S.ex) Q42.steps(ctx, S, { title: 'مثال 3 ص 145', q: EX.q, lines: EX.lines, k: S.k }, { y: 70, x: w - 12, wd: 340 });
      else Q48.card(ctx, S, [{ t: 'v₁ = ' + Q48.n1(c.v1) + ' cm   M₁ = ' + Q48.n1(c.M1, 2), mono: 1 }, { t: 'u₂ = d − v₁ = ' + Q48.n1(c.u2) + ' cm', mono: 1 }, { t: c.u2 < 0 ? 'جسم تقديري للعدسة الثانية' : 'جسم حقيقي للعدسة الثانية', c: '#7c3aed', w: 800 }, { t: 'v₂ = ' + Q48.n1(c.v2) + ' cm   M₂ = ' + Q48.n1(c.M2, 2), mono: 1 }, { t: 'M = M₁ × M₂ = ' + Q48.n1(c.M, 2), mono: 1, c: '#b91c1c', w: 900 }, { t: 'البعد البؤري للنظام f = ' + Q48.n1(c.fs) + ' cm', c: '#0f766e', w: 900 }], { title: 'نظام من عدستين', y: 70, wd: 300 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.e); C.s[0]._col = '#be185d'; Q42.drawChips(ctx, C.s);
      Q48.banner(ctx, w, 'اسحب الجسم والعدسة الثانية');
    },
    chips(S, g) { return { e: Q42.chips(S, 'mo', [['ex', 'مثال 3'], ['ct', 'متلاصقتان d = 0'], ['fr', '↺ تجربة حرة']], g.h - 128, S.ex ? 'ex' : S.p.d === 0 ? 'ct' : '', (S2, k) => { if (k === 'ex') { S2.ex = 1; S2.k = 0; setParam(S2, 'f1', 10); setParam(S2, 'f2', 5); setParam(S2, 'd', 40); S2.u1T = 15; } else if (k === 'ct') { S2.ex = 0; setParam(S2, 'd', 0); S2.u1T = 25; } else { S2.ex = 0; setParam(S2, 'd', 40); } }, { bw: 170 }),
      s: Q42.chips(S, 'st', [['nx', '⬇ الخطوة التالية'], ['all', 'الحل كاملاً']], g.h - 84, '', (S2, k) => { if (!S2.ex) { S2.ex = 1; S2.k = 0; setParam(S2, 'f1', 10); setParam(S2, 'f2', 5); setParam(S2, 'd', 40); S2.u1T = 15; } S2.k = k === 'all' ? EX.lines.length : Math.min(S2.k + 1, EX.lines.length); }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'obj', x: g.x1 - S.u1 * PPC, y: g.ay - 21, r: 20, axis: 'x', keep: true, tip: 'اسحب الجسم', idle: 'اسحب ✋', drag: (S2, d) => { S2.u1T = S2.u1 = Math.round(clamp((g.x1 - d.x) / PPC, 2, 30) * 2) / 2; } },
        { id: 'l2', x: g.x2, y: g.ay - 60, w: 40, h: 80, axis: 'x', keep: true, hint: false, tip: 'اسحب العدسة الثانية', drag: (S2, d) => { setParam(S2, 'd', Math.round(clamp((d.x - g.x1) / PPC, 0, 60))); S2.dd = S2.p.d; } }].concat(C.e, C.s); },
    readings(S) { const c = D.calc(S); return [rd('v₁', Q48.n1(c.v1) + ' cm'), rd('u₂', Q48.n1(c.u2) + ' cm'), rd('v₂', Q48.n1(c.v2) + ' cm'), rd('M = M₁M₂', Q48.n1(c.M, 2)), rd('f النظام', Q48.n1(c.fs) + ' cm')]; },
    explain(S) { return Q26.ex('الأشعة تنكسر في العدسة الأولى فتكوّن الصورة I₁ ، ثم تكمل طريقها إلى العدسة الثانية التي تكوّن الصورة النهائية.', 'العدسة الثانية «لا تعرف» من أين جاءت الأشعة؛ إنها ترى أشعة تنطلق من I₁ فتعامله جسماً لها. ولذلك يتضاعف التكبير: M = M₁ × M₂.', 'المجهر المركب والتلسكوب ونظام عدسات الكاميرا كلها أنظمة من عدستين أو أكثر.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — قدرة العدسة بالدايوبتر: صندوق العدسات التجريبية ومعادلة صانعي العدسات (8-6 ص 144) =============== */
(() => {
  const PPC = 5;
  const EX = {
    p5: { n: 'لامة f = 20 cm', P1: 5, P2: 0, q: 'عدسة لامة بعدها البؤري 20 cm. احسب قدرتها.', lines: ['f = 20 cm = 0.2 m', 'P = 1/f = 1/0.2', 'P = +5 D'] },
    m4: { n: 'مفرقة f = 25 cm', P1: -4, P2: 0, q: 'عدسة مفرقة بعدها البؤري 25 cm. احسب قدرتها.', lines: ['المفرقة: f = −25 cm = −0.25 m', 'P = 1/f = 1/(−0.25)', 'P = −4 D'] },
    lm: { n: 'صانع العدسات', P1: 5, P2: 0, q: 'عدسة محدبة الوجهين من زجاج n = 1.5 ونصفا قطريها 20 cm. احسب قدرتها.', lines: ['R₁ = +0.2 m و R₂ = −0.2 m', 'P = (n − 1)(1/R₁ − 1/R₂)', 'P = 0.5 × (5 + 5)', 'P = +5 D ⟸ f = 20 cm'] },
    q11: { n: 'س11 ص 154', P1: -5, P2: 0, q: 'عدسة مفرقة، جسم على بعد 80 cm يسارها، وصورته تقديرية على بعد 16 cm يسارها أيضاً. قدرة العدسة؟', lines: ['u = 80 cm و v = −16 cm', '1/f = 1/80 − 1/16 = −4/80', 'f = −20 cm = −0.2 m', 'P = 1/f = −5 D ⟸ الجواب a'] },
    ct: { n: 'عدستان متلاصقتان', P1: 5, P2: -4, q: 'عدسة +5 D تلامس عدسة −4 D. ما قدرة المجموعة وبعدها البؤري؟', lines: ['1/f = 1/f₁ + 1/f₂ ⟸ P = P₁ + P₂', 'P = 5 + (−4) = +1 D', 'f = 1/P = 1 m = 100 cm'] }
  };
  const D = { id: 'g10_ln_power', page: 144, fig: 'قدرة العدسة ص 144 + س11 ص 154',
    desc: 'يستعمل فاحصو البصر وأطباء العيون وحدة الدايوبتر D لقياس قدرة العدسة، وهي مقلوب البعد البؤري مقاساً بالمتر: P = 1/f. القدرة موجبة للعدسة اللامة وسالبة للمفرقة. ويحسب صانعو العدسات القدرة من معامل الانكسار ونصفي قطري الوجهين: P = (n − 1)(1/R₁ − 1/R₂). وقدرة عدستين متلاصقتين = مجموع قدرتيهما.',
    tags: 'قدرة العدسة دايوبتر D P=1/f فاحص البصر صندوق العدسات التجريبية معادلة صانعي العدسات n R1 R2 عدستان متلاصقتان س11 −5D',
    tools: ['صندوق ضوئي', 'صندوق العدسات التجريبية (عدسات +D و −D)', 'إطار تجريبي'],
    steps: ['اسحب مقبضي القدرة في الأسفل (أو من اللوحة) لاختيار عدستين من صندوق فاحص البصر.', 'لاحظ: العدسة الموجبة تجمع الأشعة في بؤرة حقيقية، والسالبة تفرقها، وكلما زادت القدرة قصر البعد البؤري.', 'ضع عدستين معاً: القدرة الكلية = P₁ + P₂.', 'اختر مثالاً واضغط «الخطوة التالية».'],
    concl: ['P = 1/f (f بالمتر) ووحدتها الدايوبتر D.', 'f = 20 cm ⟸ P = +5 D ، و f = −25 cm ⟸ P = −4 D.', 'P = (n − 1)(1/R₁ − 1/R₂).', 'للعدسات المتلاصقة تجمع القدرات: P = P₁ + P₂.'],
    laws: ['g10_lenspow', 'g10_lensmaker', 'g10_lenscombo'],
    controls: [R('P1', 'قدرة العدسة الأولى P₁', -10, 10, 5, .25, 'D'), R('P2', 'قدرة العدسة الثانية P₂', -10, 10, 0, .25, 'D')],
    setup(S) { S.e1 = 5; S.e2 = 0; S.ex = ''; S.k = 0; S.clk = 0; },
    update(S, dt) { S.clk += dt; S.e1 += (S.p.P1 - S.e1) * Math.min(1, dt * 8); S.e2 += (S.p.P2 - S.e2) * Math.min(1, dt * 8); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, xl: L + 250, ay: 400, ty: h - 150, sx0: L + 60, sx1: L + 360 }; },
    trial(ctx, x, y, P, up) { const H = 62, tp = P > .01 ? 'bx' : P < -.01 ? 'bc' : 'bx'; Q48.lens(ctx, x, y, H, tp, { s: Math.abs(P) * 1.1 + (Math.abs(P) < .01 ? 0 : 1), dark: true, bd: '#93c5fd' });
      K.raw(ctx, () => { const g = ctx.createLinearGradient(x - 6, 0, x + 6, 0); g.addColorStop(0, '#71717a'); g.addColorStop(.5, '#e4e4e7'); g.addColorStop(1, '#52525b'); ctx.fillStyle = g; rr(ctx, x - 7, y - H - 8, 14, 10, 3); ctx.fill(); rr(ctx, x - 7, y + H - 2, 14, 10, 3); ctx.fill(); ctx.fillRect(x - 3, y - H - 60 - up, 6, 54 + up); ctx.fillStyle = P >= 0 ? '#dc2626' : '#1d4ed8'; rr(ctx, x - 22, y - H - 84 - up, 44, 26, 5); ctx.fill(); });
      Q48.T(ctx, (P > 0 ? '+' : P < 0 ? '−' : '') + Math.abs(P).toFixed(2), x, y - H - 71 - up, { s: 11, w: 900, c: '#fff' }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = S.e1 + S.e2, f = Math.abs(P) < .01 ? Infinity : 100 / P, ay = g.ay, xe = w - 14;
      Q26.room(ctx, w, h, g.ty, { top: '#0b1220', bot: '#1e293b' }); Q26.axis(ctx, g.L + 70, xe, ay, 'rgba(148,163,184,.5)');
      [-50, -25, 0, 25, 50].forEach(y0 => { const t = Q48.trace(g.L + 70, y0, 0, [{ x: g.xl, f: f * PPC }], xe), pts = Q48.shift(t.pts, ay); Q26.ray(ctx, pts, '#fde047', { w: 2, hs: 7 }); if (f < 0 && isFinite(f)) Q26.ray(ctx, [[g.xl, ay + y0], [g.xl + f * PPC, ay]], '#fde047', { dash: [5, 5], w: 1.3, alpha: .6 }); Q48.flow(ctx, pts, '#fef9c3', S.clk); });
      Q26.raybox(ctx, g.L + 70, ay, 0, 1, 130);
      D.trial(ctx, g.xl + 9, ay, S.e2, 34); D.trial(ctx, g.xl - 9, ay, S.e1, 0); Q48.T(ctx, 'عدستان في الإطار التجريبي', g.xl, ay - 196, { s: 11, w: 900, c: '#cbd5e1' });
      if (isFinite(f)) { const xf = g.xl + f * PPC; if (xf > g.L + 70 && xf < xe) { Q26.pt(ctx, xf, ay, '', '#f59e0b'); Q48.T(ctx, f > 0 ? 'بؤرة حقيقية' : 'بؤرة تقديرية', xf, ay + 22, { s: 11.5, w: 900, c: '#fde68a' }); Q48.dim(ctx, g.xl, xf, ay + 92, 'f = ' + Q48.n1(f) + ' cm', f > 0 ? '#15803d' : '#c2410c'); } else Q48.T(ctx, 'البؤرة خارج الشاشة', xe - 80, ay + 40, { s: 11, w: 900, c: '#fff', bg: '#0369a1' }); }
      // two power sliders
      const ts = v => (v + 10) / 20; Q41.slider(ctx, g.sx0, g.sx1, g.ty - 56, ts(S.p.P1), '', '#dc2626'); Q41.slider(ctx, g.sx0, g.sx1, g.ty - 14, ts(S.p.P2), '', '#2563eb'); Q48.T(ctx, 'قدرة العدسة الأولى ذات المقبض القصير', (g.sx0 + g.sx1) / 2, g.ty - 74, { s: 11, w: 800, c: '#fecaca' }); Q48.T(ctx, 'قدرة العدسة الثانية', (g.sx0 + g.sx1) / 2, g.ty - 32, { s: 11, w: 800, c: '#bfdbfe' });
      Q48.T(ctx, (S.p.P1 > 0 ? '+' : '') + S.p.P1.toFixed(2) + ' D', g.sx1 + 50, g.ty - 56, { s: 12, w: 900, c: '#fecaca' }); Q48.T(ctx, (S.p.P2 > 0 ? '+' : '') + S.p.P2.toFixed(2) + ' D', g.sx1 + 50, g.ty - 14, { s: 12, w: 900, c: '#bfdbfe' });
      if (S.ex) { const e = EX[S.ex]; Q42.steps(ctx, S, { title: e.n, q: e.q, lines: e.lines, k: S.k }, { y: 70, x: w - 12, wd: 320 }); }
      else Q48.card(ctx, S, [{ t: 'P = P₁ + P₂ = ' + Q48.n1(S.p.P1, 2) + ' + ' + Q48.n1(S.p.P2, 2), mono: 1 }, { t: 'P = ' + (P > 0 ? '+' : '') + Q48.n1(P, 2) + ' D', mono: 1, c: '#b91c1c', w: 900 }, { t: 'f = 1/P = ' + (isFinite(f) ? Q48.n1(f / 100, 3) + ' m' : '∞'), mono: 1, c: '#0f766e', w: 900 }, { t: P > .01 ? 'المجموعة لامة: قدرة موجبة' : P < -.01 ? 'المجموعة مفرقة: قدرة سالبة' : 'القدرة صفر: لوح زجاجي لا يغير الأشعة', c: '#334155', w: 800 }], { title: 'قدرة العدسة بالدايوبتر', y: 70, wd: 300 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.e); C.s[0]._col = '#be185d'; Q42.drawChips(ctx, C.s);
      Q48.banner(ctx, w, 'اسحب مقبضي القدرة في الأسفل');
    },
    chips(S, g) { return { e: Q42.chips(S, 'ex', Object.keys(EX).map(k => [k, EX[k].n]), g.h - 128, S.ex, (S2, k) => { S2.ex = k; S2.k = 0; setParam(S2, 'P1', EX[k].P1); setParam(S2, 'P2', EX[k].P2); }, { bw: 140 }),
      s: Q42.chips(S, 'st', [['nx', '⬇ الخطوة التالية'], ['all', 'الحل كاملاً'], ['fr', '↺ تجربة حرة']], g.h - 84, '', (S2, k) => { if (k === 'fr') { S2.ex = ''; return; } if (!S2.ex) { S2.ex = 'p5'; S2.k = 0; setParam(S2, 'P1', 5); setParam(S2, 'P2', 0); } const n = EX[S2.ex].lines.length; S2.k = k === 'all' ? n : Math.min(S2.k + 1, n); }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), set = k => (S2, t) => { S2.ex = ''; setParam(S2, k, Math.round((t * 20 - 10) * 4) / 4); };
      return [Q41.sdrag('p1', g.sx0, g.sx1, g.ty - 56, (S.p.P1 + 10) / 20, set('P1'), { tip: 'اسحب لتغيير قدرة العدسة الأولى', extra: { idle: 'اسحب ✋' } }), Q41.sdrag('p2', g.sx0, g.sx1, g.ty - 14, (S.p.P2 + 10) / 20, set('P2'), { tip: 'اسحب لتغيير قدرة العدسة الثانية', extra: { hint: false } })].concat(C.e, C.s); },
    readings(S) { const P = S.p.P1 + S.p.P2; return [rd('P₁', S.p.P1 + ' D'), rd('P₂', S.p.P2 + ' D'), rd('P الكلية', P.toFixed(2) + ' D'), rd('f', Math.abs(P) < .01 ? '∞' : (100 / P).toFixed(1) + ' cm')]; },
    record(S) { const P = S.p.P1 + S.p.P2; return { p: +P.toFixed(2), f: Math.abs(P) < .01 ? '∞' : +(100 / P).toFixed(1) }; },
    cols: [['p', 'P (D)'], ['f', 'f (cm)']],
    explain(S) { return Q26.ex('كلما زادت قدرة العدسة الموجبة اقتربت البؤرة منها، والعدسة السالبة تفرق الأشعة، وعدستان +D و −D متساويتان تلغي إحداهما الأخرى.', 'القدرة مقياس لمقدار انحراف الأشعة، وهي مقلوب البعد البؤري. وللعدسات المتلاصقة 1/f = 1/f₁ + 1/f₂ أي أن القدرات تجمع جمعاً جبرياً.', 'يضع فاحص البصر عدسات من صندوق العدسات التجريبية أمام عينك ويجمع قدراتها حتى ترى بوضوح، ثم يكتب الوصفة بالدايوبتر مثل −1.25 D.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — الزيغ الكروي: تتبع حقيقي بقانون سنيل (الشكل 13-8 ص 145) =============== */
(() => {
  const PPC = 10, n = 1.5;
  const SHP = { bx: ['محدبة الوجهين', 250], xp: ['محدبة–مستوية: المحدب نحو الضوء', 125], px: ['مستوية–محدبة: المستوي نحو الضوء', 125] };
  const D = { id: 'g10_ln_sph', page: 145, fig: 'الشكل 13-8',
    desc: 'الزيغ الكروي من عيوب العدسات: الأشعة الساقطة موازية للمحور لا تتجمع في نقطة واحدة؛ فالأشعة البعيدة عن المحور تتجمع في نقطة I₁ أقرب إلى العدسة من النقطة I₂ التي تتجمع فيها الأشعة القريبة من المحور، فتكون الصورة غير محددة المعالم. يقلل باستعمال حاجز أمام حافة العدسة يمنع الأشعة البعيدة عن المحور، أو باستعمال عدسة محدبة–مستوية.',
    tags: 'الزيغ الكروي I1 I2 الأشعة البعيدة عن المحور القريبة من المحور حاجز حافة العدسة محدبة مستوية تلسكوب نظارات عيوب العدسات',
    tools: ['صندوق ضوئي عريض الحزمة', 'عدسة لامة كبيرة الفتحة', 'حاجز ذو فتحة دائرية', 'شاشة'],
    steps: ['لاحظ الأشعة الحمراء البعيدة عن المحور: تقطع المحور في I₁ قبل الأشعة الصفراء القريبة منه (I₂).', 'اسحب الشاشة لتجد أصغر بقعة ضوئية؛ الإطار الأيسر يريك شكل البقعة على الشاشة.', 'فعّل «حاجز أمام حافة العدسة»: تختفي الأشعة البعيدة وتصغر البقعة.', 'بدّل شكل العدسة: المحدبة–المستوية ووجهها المحدب نحو الضوء تعطي أقل زيغ.'],
    concl: ['الأشعة البعيدة عن المحور تتجمع أقرب إلى العدسة (I₁) من القريبة منه (I₂).', 'الزيغ الكروي يجعل الصورة غير واضحة المعالم والتفاصيل.', 'العلاج: حاجز يمنع الأشعة البعيدة عن المحور، أو عدسة محدبة–مستوية (كما في شيئية التلسكوب والنظارات الطبية).'],
    laws: [],
    controls: [R('hb', 'نصف عرض الحزمة الساقطة', 2, 8.5, 8, .5, 'cm'), TG('stop', 'حاجز أمام حافة العدسة', false, null, 'block')],
    setup(S) { S.sh = 'bx'; S.xs = 22; S.xsT = 22; S.hbe = 8; S.clk = 0; },
    update(S, dt) { S.clk += dt; Q48.ease(S, 'xs', 'xsT', dt, 8); S.hbe += ((S.p.stop ? Math.min(S.p.hb, 3) : S.p.hb) - S.hbe) * Math.min(1, dt * 6); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, xl: L + 190, ay: 420, H: 90, ty: h - 150 }; },
    surfs(S, g) { const R = SHP[S.sh][1], sag = R - Math.sqrt(R * R - g.H * g.H), C = (vx, sg) => ({ type: 'c', vx, R, C: [vx + sg * R, g.ay] });
      if (S.sh === 'bx') { const tc = 2 * sag + 4; return { tc, s: [C(g.xl - tc / 2, 1), C(g.xl + tc / 2, -1)] }; }
      const tc = sag + 4; return S.sh === 'xp' ? { tc, s: [C(g.xl - tc / 2, 1), { type: 'p', x: g.xl + tc / 2 }] } : { tc, s: [{ type: 'p', x: g.xl - tc / 2 }, C(g.xl + tc / 2, -1)] }; },
    rays(S, g) { const sf = D.surfs(S, g), out = [], N = 17; for (let i = 0; i < N; i++) { const hpx = (-1 + 2 * i / (N - 1)) * S.hbe * PPC; if (Math.abs(hpx) < .5) continue; const r = Q26.traceLens([g.L + 60, g.ay + hpx], [1, 0], sf.s, g.H, g.ay, n); if (!r.D) continue; const P = r.pts[r.pts.length - 1], xc = P[0] + (g.ay - P[1]) / r.D[1] * r.D[0]; out.push({ h: hpx, pts: r.pts, P, Dd: r.D, xc }); } return out; },
    par(S, g) { const sf = D.surfs(S, g), r = Q26.traceLens([g.L + 60, g.ay + 1], [1, 0], sf.s, g.H, g.ay, n), P = r.pts[r.pts.length - 1]; return P[0] + (g.ay - P[1]) / r.D[1] * r.D[0]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), sf = D.surfs(S, g), R = D.rays(S, g), xe = w - 14, xs = g.xl + S.xs * PPC, I2 = D.par(S, g), I1 = R.length ? Math.min(...R.map(q => q.xc)) : I2;
      Q26.room(ctx, w, h, g.ty, { top: '#0b1220', bot: '#1e293b' }); Q26.axis(ctx, g.L + 60, xe, g.ay, 'rgba(148,163,184,.45)');
      let spot = 0; R.forEach(q => { const t = (xs - q.P[0]) / q.Dd[0], ys = q.P[1] + q.Dd[1] * t, far = Math.abs(q.h) / (g.H); spot = Math.max(spot, Math.abs(ys - g.ay)); const col = far > .6 ? '#f87171' : far > .3 ? '#fb923c' : '#fde047';
        Q26.ray(ctx, q.pts.concat([[xs, ys]]), col, { w: 1.7, hs: 6 }); Q26.ray(ctx, [[xs, ys], [xe, q.P[1] + q.Dd[1] * (xe - q.P[0]) / q.Dd[0]]], col, { w: 1.2, alpha: .35, arrows: false, glow: false }); });
      if (S.p.stop) K.raw(ctx, () => { const hh = 3 * PPC; ctx.fillStyle = '#111827'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; [[g.ay - g.H - 30, g.ay - hh], [g.ay + hh, g.ay + g.H + 30]].forEach(q => { ctx.fillRect(g.xl - sf.tc / 2 - 22, q[0], 7, q[1] - q[0]); ctx.strokeRect(g.xl - sf.tc / 2 - 22, q[0], 7, q[1] - q[0]); }); });
      K.raw(ctx, () => { ctx.save(); const gg = ctx.createLinearGradient(g.xl - 40, 0, g.xl + 40, 0); gg.addColorStop(0, 'rgba(147,197,253,.32)'); gg.addColorStop(.5, 'rgba(224,242,254,.5)'); gg.addColorStop(1, 'rgba(96,165,250,.32)'); ctx.fillStyle = gg; ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 1.8; ctx.beginPath();
        const face = (s, y) => s.type === 'p' ? s.x : s.C[0] - Math.sign(s.C[0] - s.vx) * Math.sqrt(s.R * s.R - y * y);
        for (let k = 0; k <= 40; k++) { const y = -g.H + 2 * g.H * k / 40, x = face(sf.s[0], y); k ? ctx.lineTo(x, g.ay + y) : ctx.moveTo(x, g.ay + y); } for (let k = 40; k >= 0; k--) { const y = -g.H + 2 * g.H * k / 40; ctx.lineTo(face(sf.s[1], y), g.ay + y); } ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); });
      Q26.raybox(ctx, g.L + 60, g.ay, 0, .9, 190);
      if (I2 < xe) { Q26.pt(ctx, I2, g.ay, '', '#fde047'); Q48.T(ctx, 'I₂', I2 + 4, g.ay + 22, { s: 13, w: 900, c: '#fde047' }); }
      if (I1 < xe && I2 - I1 > 6) { Q26.pt(ctx, I1, g.ay, '', '#f87171'); Q48.T(ctx, 'I₁', I1 - 4, g.ay + 22, { s: 13, w: 900, c: '#f87171' }); Q48.dim(ctx, I1, I2, g.ay + 54, '', '#f472b6'); }
      // screen
      K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.fillRect(xs, g.ay - 110, 6, 220); ctx.fillStyle = '#64748b'; ctx.fillRect(xs + 1, g.ay + 110, 4, g.ty - g.ay - 110); });
      // inset: the spot on the screen (rings of the rotationally symmetric beam)
      const ix = g.L + 20, iy = 74, iw = 170, ih = 150; K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#e5e7eb'; ctx.fillRect(ix, iy, iw, ih); ctx.beginPath(); ctx.rect(ix, iy, iw, ih); ctx.clip(); ctx.translate(ix + iw / 2, iy + ih / 2); ctx.globalCompositeOperation = 'multiply';
        R.forEach(q => { const t = (xs - q.P[0]) / q.Dd[0], r0 = Math.abs(q.P[1] + q.Dd[1] * t - g.ay) * 3.5; const far = Math.abs(q.h) / g.H; ctx.strokeStyle = far > .6 ? 'rgba(239,68,68,.55)' : far > .3 ? 'rgba(249,115,22,.55)' : 'rgba(202,138,4,.6)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(0, 0, Math.max(1, r0), 0, TAU); ctx.stroke(); }); ctx.restore(); });
      Q48.T(ctx, 'البقعة على الشاشة', ix + iw / 2, iy - 14, { s: 11.5, w: 900, c: '#fff', bg: '#334155' });
      const sp = 2 * spot / PPC; Q48.T(ctx, 'قطر البقعة ' + sp.toFixed(2) + ' cm', ix + iw / 2, iy + ih + 16, { s: 11.5, w: 900, c: '#fff', bg: sp < .25 ? '#15803d' : '#b45309' });
      Q48.card(ctx, S, [{ t: 'بؤرة الأشعة القريبة من المحور I₂ = ' + ((I2 - g.xl) / PPC).toFixed(1) + ' cm' }, { t: 'بؤرة الأشعة البعيدة عن المحور I₁ = ' + ((I1 - g.xl) / PPC).toFixed(1) + ' cm' }, { t: 'الفرق I₂ − I₁ = ' + ((I2 - I1) / PPC).toFixed(2) + ' cm', c: '#b91c1c', w: 900 }, { t: S.p.stop ? 'الحاجز منع الأشعة البعيدة: زيغ أقل' : 'الأشعة لا تتجمع في بؤرة واحدة', c: S.p.stop ? '#15803d' : '#b45309', w: 800 }], { title: 'الزيغ الكروي: ' + SHP[S.sh][0], y: 70, wd: 330 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q48.banner(ctx, w, 'اسحب الشاشة لتجد أصغر بقعة');
    },
    chips(S, g) { return Q42.chips(S, 'sh', Object.keys(SHP).map(k => [k, SHP[k][0]]), g.h - 84, S.sh, (S2, k) => { S2.sh = k; }, { bw: 230 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      return [{ id: 'scr', x: g.xl + S.xs * PPC + 3, y: g.ay - 80, w: 36, h: 70, axis: 'x', keep: true, tip: 'اسحب الشاشة', idle: 'اسحب ✋', drag: (S2, d) => { S2.xsT = S2.xs = clamp((d.x - 3 - g.xl) / PPC, 8, (g.w - 30 - g.xl) / PPC); } }].concat(D.chips(S, g)); },
    readings(S) { const g = D.geo(S), I2 = D.par(S, g), R = D.rays(S, g), I1 = Math.min(...R.map(q => q.xc)); return [rd('I₂ القريبة من المحور', ((I2 - g.xl) / PPC).toFixed(1) + ' cm'), rd('I₁ البعيدة عن المحور', ((I1 - g.xl) / PPC).toFixed(1) + ' cm'), rd('الزيغ الطولي', ((I2 - I1) / PPC).toFixed(2) + ' cm')]; },
    explain(S) { return Q26.ex('الأشعة الحمراء القريبة من حافة العدسة تقطع المحور أقرب إلى العدسة من الأشعة الصفراء القريبة من المركز، فلا توجد بؤرة واحدة بل بقعة.', 'سطح العدسة كروي، وزاوية سقوط الشعاع على السطح تكبر كلما ابتعد عن المحور فينحرف انحرافاً أكبر من المطلوب. توزيع الانكسار على الوجهين (المحدب نحو الضوء) يقلل ذلك.', 'تصنع عدسات الكاميرات الحديثة بأسطح غير كروية (أسفيرية) للتخلص من الزيغ الكروي.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F2 — الزيغ اللوني والعدسة اللالونية (الأشكال 14-8 و 15-8 و 16-8 ص 146–147) =============== */
(() => {
  const PPC = 10, F0 = 260;
  const nc = (l, X) => 1.5046 + X * 4200 / (l * l), nf = (l, X) => 1.62 + X * 9000 / (l * l);
  const D = { id: 'g10_ln_chrom', page: 146, fig: 'الأشكال 14-8 و 15-8 و 16-8',
    desc: 'الضوء الأبيض يتحلل في الموشور لأن معامل انكسار الزجاج يختلف باختلاف الطول الموجي: البنفسجي ينحرف أكثر والأحمر أقل. والعدسة اللامة مجموعة مواشير، فيلاقي البنفسجي المحور في نقطة أقرب إلى العدسة والأحمر في نقطة أبعد: هذا هو الزيغ اللوني. يزال بعدسة لا لونية: لامة من زجاج الكراون (قدرة موجبة أكبر) ملصقة بمفرقة من زجاج الفلنت (قدرة سالبة أصغر)، فيلغي تشتيت إحداهما تشتيت الأخرى، و 1/f = 1/f₁ + 1/f₂.',
    tags: 'الزيغ اللوني تحلل الضوء الأبيض موشور بنفسجي أحمر الطول الموجي معامل الانكسار عدسة لا لونية كراون فلنت achromatic تشتيت',
    tools: ['مصدر ضوء أبيض', 'عدسة لامة', 'عدسة لا لونية (كراون + فلنت)', 'شاشة بيضاء'],
    steps: ['لاحظ الألوان بعد العدسة: البنفسجي يقطع المحور أولاً والأحمر أخيراً.', 'اسحب الشاشة إلى بؤرة البنفسجي: البقعة وسطها بنفسجي وحافتها حمراء، وعند بؤرة الأحمر يحدث العكس.', 'فعّل «عدسة لا لونية»: تلتصق بالعدسة مفرقة من زجاج الفلنت فتلتقي الألوان في نقطة واحدة تقريباً.', 'ألغِ «تكبير التشتت» لترى المقدار الحقيقي الصغير للزيغ.'],
    concl: ['معامل انكسار الزجاج للبنفسجي أكبر منه للأحمر فيكون البعد البؤري للبنفسجي أقصر.', 'الزيغ اللوني: اختلاف مواقع تجمع الألوان على المحور الأساس.', 'العدسة اللالونية: لامة من الكراون + مفرقة من الفلنت متلاصقتان، 1/f = 1/f₁ + 1/f₂.'],
    laws: ['g10_lenscombo'],
    controls: [TG('ach', 'عدسة لا لونية: كراون + فلنت', false, null, 'lens'), TG('ex', 'تكبير التشتت ×3 للتوضيح', true, null, 'zoom')],
    setup(S) { S.xs = 24.5; S.xsT = 24.5; S.mix = 0; S.clk = 0; },
    update(S, dt) { S.clk += dt; Q48.ease(S, 'xs', 'xsT', dt, 8); S.mix += ((S.p.ach ? 1 : 0) - S.mix) * Math.min(1, dt * 4); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, xl: L + 200, ay: 430, H: 70, ty: h - 150 }; },
    fl(S, l) { const X = S.p.ex ? 3 : 1, K1 = 1 / (F0 * (nc(550, X) - 1)), K1a = 1 / (F0 * (.5046 - 4200 / 9000 * .62)), P0 = K1 * (nc(l, X) - 1), P1 = K1a * (nc(l, X) - 1) - K1a * 4200 / 9000 * (nf(l, X) - 1); return 1 / (P0 + (P1 - P0) * S.mix); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), xe = w - 14, xs = g.xl + S.xs * PPC, ay = g.ay, hs = [-56, -30, 30, 56];
      Q26.room(ctx, w, h, g.ty, { top: '#05070d', bot: '#111827' }); Q26.axis(ctx, g.L + 60, xe, ay, 'rgba(148,163,184,.35)');
      hs.forEach(y0 => Q26.ray(ctx, [[g.L + 60, ay + y0], [g.xl, ay + y0]], '#f8fafc', { w: 2.2, hs: 7 }));
      K.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; Q48.COL.forEach(c => { const f = D.fl(S, c[1]); hs.forEach(y0 => { const yS = y0 * (1 - (xs - g.xl) / f), yE = y0 * (1 - (xe - g.xl) / f); ctx.strokeStyle = c[0]; ctx.globalAlpha = .75; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(g.xl, ay + y0); ctx.lineTo(xs, ay + yS); ctx.stroke(); ctx.globalAlpha = .18; ctx.beginPath(); ctx.moveTo(xs, ay + yS); ctx.lineTo(xe, ay + yE); ctx.stroke(); }); }); ctx.restore(); });
      // lens(es)
      if (S.mix > .02) Q48.lens(ctx, g.xl + 10, ay, g.H, 'pc', { s: 5, alpha: S.mix, tint: [253, 230, 138], bd: '#ca8a04', dark: true });
      Q48.lens(ctx, g.xl - (S.mix > .02 ? 6 * S.mix : 0), ay, g.H, 'bx', { s: 9, dark: true, bd: '#93c5fd' });
      if (S.mix > .5) { Q48.T(ctx, 'كراون', g.xl - 22, ay - g.H - 14, { s: 11, w: 900, c: '#93c5fd' }); Q48.T(ctx, 'فلنت', g.xl + 26, ay - g.H - 14, { s: 11, w: 900, c: '#fde68a' }); }
      const fv = D.fl(S, 410), fr = D.fl(S, 680);
      if (Math.abs(fr - fv) > 5) { Q26.pt(ctx, g.xl + fv, ay, '', '#a855f7'); Q48.T(ctx, 'بنفسجي', g.xl + fv - 10, ay + 22, { s: 11, w: 900, c: '#d8b4fe' }); Q26.pt(ctx, g.xl + fr, ay, '', '#ef4444'); Q48.T(ctx, 'أحمر', g.xl + fr + 10, ay - 20, { s: 11, w: 900, c: '#fca5a5' }); }
      else { Q26.pt(ctx, g.xl + fv, ay, '', '#f8fafc'); Q48.T(ctx, 'الألوان تلتقي في نقطة واحدة', g.xl + fv, ay + 24, { s: 11, w: 900, c: '#fff', bg: '#15803d' }); }
      K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.fillRect(xs, ay - 90, 6, 180); ctx.fillStyle = '#64748b'; ctx.fillRect(xs + 1, ay + 90, 4, g.ty - ay - 90); });
      Q26.bulb(ctx, g.L + 40, ay, 14, true);
      // inset: coloured spot on the screen
      const ix = g.L + 20, iy = 74, iw = 160, ih = 140; K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#0f172a'; ctx.fillRect(ix, iy, iw, ih); ctx.beginPath(); ctx.rect(ix, iy, iw, ih); ctx.clip(); ctx.translate(ix + iw / 2, iy + ih / 2); ctx.globalCompositeOperation = 'lighter';
        Q48.COL.slice().forEach(c => { const f = D.fl(S, c[1]), r0 = Math.max(1.5, 56 * Math.abs(1 - (xs - g.xl) / f) * 3); ctx.fillStyle = c[0]; ctx.globalAlpha = clamp(10 / r0, .08, .55); ctx.beginPath(); ctx.arc(0, 0, r0, 0, TAU); ctx.fill(); }); ctx.restore(); });
      Q48.T(ctx, 'البقعة على الشاشة', ix + iw / 2, iy - 14, { s: 11.5, w: 900, c: '#fff', bg: '#334155' });
      // prism (fig 14-8)
      const px = g.L + 275, py = 150; K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(186,230,253,.25)'; ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, py - 50); ctx.lineTo(px - 40, py + 30); ctx.lineTo(px + 40, py + 30); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px - 100, py + 4); ctx.lineTo(px - 20, py - 4); ctx.stroke(); ctx.globalCompositeOperation = 'lighter';
        Q48.COL.forEach((c, i) => { ctx.strokeStyle = c[0]; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(px - 20, py - 4); ctx.lineTo(px + 20, py + 2 + i * 1.2); ctx.lineTo(px + 110, py + 20 + i * 7); ctx.stroke(); }); ctx.restore(); });
      Q48.T(ctx, 'الموشور: البنفسجي أكثر انحرافاً', px, py + 50, { s: 11, w: 800, c: '#cbd5e1' });
      const f1 = 1 / (1 / (F0 * (.5046 - 4200 / 9000 * .62)) * (nc(550, 1) - 1)) / PPC, f2 = -1 / (1 / (F0 * (.5046 - 4200 / 9000 * .62)) * 4200 / 9000 * (nf(550, 1) - 1)) / PPC;
      Q48.card(ctx, S, S.p.ach ? [{ t: 'عدسة الكراون: f₁ = +' + f1.toFixed(1) + ' cm' }, { t: 'عدسة الفلنت: f₂ = ' + Q48.n1(f2) + ' cm' }, { t: '1/f = 1/f₁ + 1/f₂', mono: 1, c: '#0f766e', w: 900 }, { t: 'f = ' + (1 / (1 / f1 + 1 / f2)).toFixed(1) + ' cm لكل الألوان', c: '#b91c1c', w: 900 }] : [{ t: 'بؤرة البنفسجي = ' + (fv / PPC).toFixed(1) + ' cm' }, { t: 'بؤرة الأحمر = ' + (fr / PPC).toFixed(1) + ' cm' }, { t: 'الفرق = ' + ((fr - fv) / PPC).toFixed(2) + ' cm', c: '#b91c1c', w: 900 }, { t: 'معامل الانكسار للبنفسجي أكبر فبعده البؤري أقصر', c: '#334155', w: 800 }], { title: S.p.ach ? 'العدسة اللالونية' : 'الزيغ اللوني', y: 70, wd: 300 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q48.banner(ctx, w, 'اسحب الشاشة بين بؤرتي البنفسجي والأحمر');
    },
    chips(S, g) { return Q42.chips(S, 'go', [['one', 'عدسة عادية'], ['ach', 'عدسة لا لونية'], ['v', 'الشاشة عند البنفسجي'], ['r', 'الشاشة عند الأحمر']], g.h - 84, S.p.ach ? 'ach' : 'one', (S2, k) => { if (k === 'one' || k === 'ach') { setParam(S2, 'ach', k === 'ach'); return; } S2.xsT = D.fl(S2, k === 'v' ? 410 : 680) / PPC; }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      return [{ id: 'scr', x: g.xl + S.xs * PPC + 3, y: g.ay - 60, w: 36, h: 70, axis: 'x', keep: true, tip: 'اسحب الشاشة', idle: 'اسحب ✋', drag: (S2, d) => { S2.xsT = S2.xs = clamp((d.x - 3 - g.xl) / PPC, 10, (g.w - 30 - g.xl) / PPC); } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('بؤرة البنفسجي', (D.fl(S, 410) / PPC).toFixed(2) + ' cm'), rd('بؤرة الأحمر', (D.fl(S, 680) / PPC).toFixed(2) + ' cm'), rd('العدسة', S.p.ach ? 'لا لونية' : 'عادية')]; },
    explain(S) { return Q26.ex('حول بقعة الضوء على الشاشة هالة ملونة: إذا كانت الشاشة عند بؤرة البنفسجي ترى حافة حمراء، وعند بؤرة الأحمر ترى حافة بنفسجية.', 'معامل انكسار الزجاج يزداد كلما قصر الطول الموجي، فينحرف البنفسجي أكثر ويتجمع أقرب. مفرقة الفلنت تفرق الألوان بعكس اتجاه لامة الكراون فيلغي تشتيت إحداهما الآخر مع بقاء المجموعة لامة.', 'عدسات الكاميرات والمجاهر والتلسكوبات الجيدة لا لونية حتى لا تظهر حواف ملونة حول الأجسام.'); }
  };
  M8.P[D.id] = D;
})();

/* small pictures used as objects (local coords, size ≈ 1 unit tall, centred) */
Q48.tree = (c, k) => { c.save(); c.scale(k, k); c.fillStyle = '#7c2d12'; c.fillRect(-.05, -.1, .1, .6); c.fillStyle = '#15803d'; c.beginPath(); c.arc(0, -.25, .28, 0, TAU); c.arc(-.18, -.08, .18, 0, TAU); c.arc(.18, -.1, .18, 0, TAU); c.fill(); c.fillStyle = '#22c55e'; c.beginPath(); c.arc(-.07, -.32, .1, 0, TAU); c.fill(); c.restore(); };
Q48.house = (c, k) => { c.save(); c.scale(k, k); c.fillStyle = '#fde68a'; c.fillRect(-.6, -.5, 1.2, 1); c.fillStyle = '#facc15'; c.beginPath(); c.arc(.38, -.3, .1, 0, TAU); c.fill(); c.fillStyle = '#ef4444'; c.beginPath(); c.moveTo(-.4, -.05); c.lineTo(-.05, -.32); c.lineTo(.3, -.05); c.fill(); c.fillStyle = '#2563eb'; c.fillRect(-.33, -.05, .56, .4); c.fillStyle = '#78350f'; c.fillRect(-.1, .12, .12, .23); c.fillStyle = '#16a34a'; c.fillRect(-.6, .35, 1.2, .15); c.restore(); };
Q48.bug = (c, k) => { c.save(); c.scale(k, k); c.fillStyle = '#16a34a'; c.beginPath(); c.ellipse(0, .3, .7, .14, 0, 0, TAU); c.fill(); c.fillStyle = '#0f172a'; c.beginPath(); c.arc(.32, -.02, .12, 0, TAU); c.fill(); c.fillStyle = '#dc2626'; c.beginPath(); c.ellipse(0, 0, .32, .26, 0, Math.PI, 0); c.lineTo(.32, .1); c.lineTo(-.32, .1); c.fill(); c.fillStyle = '#0f172a'; [[-.15, -.08], [.05, -.15], [.12, 0], [-.05, .02]].forEach(p => { c.beginPath(); c.arc(p[0], p[1], .05, 0, TAU); c.fill(); }); c.restore(); };

/* =============== G1 — العين وعيوب البصر والنظارات الطبية (الأشكال 17-8 … 20-8 ص 147–148) =============== */
(() => {
  const PX = 98; // px per cm inside the eye (lens → retina = 2 cm)
  const DEF = [['ok', 'عين سليمة'], ['my', 'قصر البصر'], ['hy', 'طول البصر'], ['as', 'الاستكماتزم']];
  const D = { id: 'g10_ln_eye', page: 147, fig: 'الأشكال 17-8 و 18-8 و 19-8 و 20-8',
    desc: 'العين السليمة ترى الأجسام بوضوح فتتكون على الشبكية صورة حقيقية مقلوبة مصغرة. قصر البصر: لا ترى العين الأجسام البعيدة بوضوح لأن صورها تتكون أمام الشبكية، ويعالج بعدسة مفرقة. طول البصر: لا ترى الأجسام القريبة بوضوح لأن صورها تتكون خلف الشبكية، ويعالج بعدسة لامة. الاستكماتزم: صور الأجسام النقطية تتكون خطوطاً لعدم انتظام تحدب القرنية أو العدسة باتجاهات مختلفة، ويعالج بعدسة أسطوانية.',
    tags: 'العين عيوب البصر قصر البصر myopia طول البصر hyperopia الاستكماتزم astigmatism الشبكية عدسة مفرقة عدسة لامة عدسة أسطوانية نظارات طبية تكيف العين',
    tools: ['نموذج للعين', 'نظارة بعدسة مفرقة', 'نظارة بعدسة لامة', 'عدسة أسطوانية', 'لوحة خطوط'],
    steps: ['اختر نوع العين من الصف الأعلى، ثم اختر جسماً بعيداً أو قريباً من الصف الأسفل.', 'لاحظ أين تتجمع الأشعة: على الشبكية أم أمامها أم خلفها، وانظر في الإطار الأيسر إلى ما تراه العين.', 'اضغط «ضع النظارة»: المفرقة تعالج قصر البصر واللامة تعالج طول البصر، والأسطوانية تعالج الاستكماتزم.', 'غيّر من اللوحة النقطة البعيدة لقصير البصر أو النقطة القريبة لطويل البصر وراقب قدرة النظارة المطلوبة.'],
    concl: ['العين السليمة تغير سمك عدستها (التكيف) فتجمع الأشعة على الشبكية للأجسام البعيدة والقريبة.', 'قصر البصر: الصورة أمام الشبكية للجسم البعيد ⟸ نظارة بعدسة مفرقة.', 'طول البصر: الصورة خلف الشبكية للجسم القريب ⟸ نظارة بعدسة لامة.', 'الاستكماتزم: الخطوط الأفقية والشاقولية لا تتجمع في البؤرة بالتزامن ⟸ عدسة أسطوانية.'],
    laws: ['g10_lenspow'],
    controls: [R('fp', 'النقطة البعيدة لقصير البصر', 25, 200, 50, 5, 'cm'), R('np', 'النقطة القريبة لطويل البصر', 40, 200, 100, 5, 'cm'), TG('gl', 'النظارة الطبية', false, null, 'eye')],
    setup(S) { S.df = 'my'; S.ob = 'far'; S.pe = 50; S.clk = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), xc = L + 420, R = 112, xe0 = xc + R; return { w, h, L, ay: 440, xc, R, xe0, xk: xc + 26, xg: xc - 48, xr: xe0 + R }; },
    model(S) { const p = S.p, df = S.df, d = S.ob === 'far' ? Infinity : 25, V = isFinite(d) ? -100 / d : 0;
      let Pmin = 50, Pmax = 54, Pg = 0, cyl = 0, ast = 0;
      if (df === 'my') { Pmin = 50 + 100 / p.fp; Pmax = Pmin + 2.5; Pg = -100 / p.fp; } else if (df === 'hy') { Pmin = 49; Pmax = 50 + 100 / p.np; Pg = 4 - 100 / p.np; } else if (df === 'as') { ast = 1.5; cyl = -1.5; }
      const on = !!p.gl && df !== 'ok', V1 = V + (on ? Pg : 0), Pe = clamp(50 - V1, Pmin, Pmax), Vh = V1 + Pe, Vv = V1 + (on ? cyl : 0) + Pe + ast;
      const vh = 100 / Vh, vv = 100 / Vv, bh = 4 * Math.abs(1 - 2 / vh), bv = 4 * Math.abs(1 - 2 / vv);
      return { V, Pg, cyl, on, Pe, vh, vv, bh, bv, ast }; },
    update(S, dt) { S.clk += dt; S.pe += (D.model(S).Pe - S.pe) * Math.min(1, dt * 3); },
    eye(ctx, g, S) {
      const ay = g.ay, R = g.R; K.raw(ctx, () => { ctx.save(); const sg = ctx.createRadialGradient(g.xe0 - 30, ay - 30, 10, g.xe0, ay, R); sg.addColorStop(0, '#ffffff'); sg.addColorStop(1, '#e2e8f0'); ctx.fillStyle = sg; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(g.xe0, ay, R, 0, TAU); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(g.xe0, ay, R - 5, -1.05, 1.05); ctx.stroke(); ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(g.xr - 5, ay, 4, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#facc15'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(g.xr - 8, ay + 22); ctx.quadraticCurveTo(g.xr + 30, ay + 40, g.xr + 60, ay + 70); ctx.stroke();
        ctx.fillStyle = 'rgba(186,230,253,.7)'; ctx.strokeStyle = '#0ea5e9'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.xc + 14, ay - 52); ctx.quadraticCurveTo(g.xc - 14, ay, g.xc + 14, ay + 52); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#1e3a8a'; ctx.fillRect(g.xk - 10, ay - 46, 6, 24); ctx.fillRect(g.xk - 10, ay + 22, 6, 24);
        const rx = 9 + (S.pe - 49) * 2.2, lg = ctx.createLinearGradient(g.xk - rx, 0, g.xk + rx, 0); lg.addColorStop(0, 'rgba(165,180,252,.9)'); lg.addColorStop(.5, 'rgba(238,242,255,.95)'); lg.addColorStop(1, 'rgba(129,140,248,.9)'); ctx.fillStyle = lg; ctx.strokeStyle = '#6366f1'; ctx.beginPath(); ctx.ellipse(g.xk + 4, ay, rx, 32, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); });
      Q48.T(ctx, 'القرنية', g.xc - 6, ay - 66, { s: 10.5, w: 800, c: '#0369a1' }); Q48.T(ctx, 'عدسة العين', g.xk + 10, ay + 62, { s: 10.5, w: 800, c: '#4338ca' }); Q48.T(ctx, 'الشبكية', g.xr + 10, ay - 104, { s: 10.5, w: 800, c: '#be185d' });
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), m = D.model(S), ay = g.ay, far = S.ob === 'far', xo = g.L + 110; Q48.bgLight(ctx, w, h);
      // object
      if (far) { K.raw(ctx, () => { ctx.save(); ctx.translate(g.L + 60, ay - 10); Q48.tree(ctx, 120); ctx.restore(); }); Q48.T(ctx, 'جسم بعيد', g.L + 60, ay + 70, { s: 11, w: 900, c: '#15803d' }); }
      else { Q26.obj(ctx, xo, ay, 34, '#2563eb'); Q48.T(ctx, 'جسم قريب 25 cm', xo, ay + 30, { s: 11, w: 900, c: '#1d4ed8' }); }
      D.eye(ctx, g, S);
      // glasses
      if (m.on) { const tp = S.df === 'my' ? 'bc' : S.df === 'hy' ? 'bx' : 'pc'; Q48.lens(ctx, g.xg, ay, 62, tp, { s: S.df === 'as' ? 4 : 7 }); K.raw(ctx, () => { ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(g.xg, ay, 7, 65, 0, 0, TAU); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.xg, ay - 64); ctx.lineTo(g.xe0 + 40, ay - 120); ctx.stroke(); });
        Q48.T(ctx, S.df === 'as' ? 'عدسة أسطوانية' : 'نظارة ' + (m.Pg > 0 ? '+' : '−') + Math.abs(m.Pg).toFixed(2) + ' D', g.xg, ay + 84, { s: 11, w: 900, c: '#fff', bg: m.Pg > 0 ? '#0369a1' : '#7c3aed' }); }
      // rays: vertical meridian (solid) and, for astigmatism, horizontal meridian (dashed)
      const sets = S.df === 'as' ? [[m.vv, '#dc2626', 0], [m.vh, '#2563eb', 1]] : [[m.vh, '#ea580c', 0]];
      sets.forEach(st => [-38, 0, 38].forEach(hg => { if (st[2] && !hg) return; const s0 = far ? 0 : hg / (g.xg - xo), x0 = far ? g.L + 140 : xo, y0 = far ? hg : 0, Pg = m.on ? (st[2] ? m.Pg : m.Pg + m.cyl) : 0, s1 = s0 - hg * Pg * .0024 * (S.df === 'as' && st[2] ? 0 : 1), hk = hg + s1 * (g.xk - g.xg);
        const xi = g.xk + (2 + 5 * (st[0] - 2)) * PX, sl = (0 - hk) / (xi - g.xk); let xr = g.xr - 6; for (let k = 0; k < 3; k++) { const yy = hk + sl * (xr - g.xk); xr = g.xe0 + Math.sqrt(Math.max(0, (g.R - 6) ** 2 - yy * yy)); }
        Q26.ray(ctx, [[x0, ay + y0], [g.xg, ay + hg], [g.xk, ay + hk], [xr, ay + hk + sl * (xr - g.xk)]], st[1], { w: 1.8, glow: false, hs: 6, dash: st[2] ? [6, 4] : null }); }));
      sets.forEach(st => { const xi = g.xk + (2 + 5 * (st[0] - 2)) * PX; if (xi < g.xr + 120) { Q26.pt(ctx, Math.min(xi, g.xr + 110), ay, '', st[1]); } });
      // what the eye sees
      const ix = g.L + 16, iy = 70, iw = 190, ih = 160, bl = Math.max(m.bh, m.bv);
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.fillRect(ix, iy, iw, ih); ctx.strokeRect(ix, iy, iw, ih); ctx.beginPath(); ctx.rect(ix, iy, iw, ih); ctx.clip(); ctx.translate(ix + iw / 2, iy + ih / 2);
        if (S.df === 'as') { for (let k = 0; k < 12; k++) { const a = k * Math.PI / 12, b = m.bv * Math.abs(Math.cos(a)) + m.bh * Math.abs(Math.sin(a)); Q48.blurred(ctx, Math.min(14, b * 60), 1, () => { ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 18, Math.sin(a) * 18); ctx.lineTo(Math.cos(a) * 70, Math.sin(a) * 70); ctx.moveTo(-Math.cos(a) * 18, -Math.sin(a) * 18); ctx.lineTo(-Math.cos(a) * 70, -Math.sin(a) * 70); ctx.stroke(); }); } }
        else Q48.blurred(ctx, Math.min(14, bl * 45), 1, () => { ctx.fillStyle = '#0f172a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '900 46px sans-serif'; ctx.fillText('E', 0, -42); ctx.font = '900 26px sans-serif'; ctx.fillText('F  P', 0, 6); ctx.font = '900 16px sans-serif'; ctx.fillText('T  O  Z', 0, 40); ctx.font = '900 11px sans-serif'; ctx.fillText('L P E D', 0, 62); });
        ctx.restore(); });
      Q48.T(ctx, 'ما تراه العين', ix + iw / 2, iy - 14, { s: 11.5, w: 900, c: '#fff', bg: '#334155' });
      const ok = bl < .03; Q48.T(ctx, ok ? '✔ رؤية واضحة' : 'رؤية مشوشة', ix + iw / 2, iy + ih + 16, { s: 11.5, w: 900, c: '#fff', bg: ok ? '#15803d' : '#b91c1c' });
      // card
      const where = v => Math.abs(v - 2) < .004 ? 'على الشبكية' : v < 2 ? 'أمام الشبكية' : 'خلف الشبكية';
      const L = S.df === 'as' ? [{ t: 'الخطوط الشاقولية: البؤرة ' + where(m.vv), c: '#dc2626', w: 800 }, { t: 'الخطوط الأفقية: البؤرة ' + where(m.vh), c: '#2563eb', w: 800 }, { t: 'السبب: تحدب القرنية غير منتظم', c: '#334155' }, { t: m.on ? '✔ العدسة الأسطوانية صححت العيب' : 'العلاج: عدسة أسطوانية', c: m.on ? '#15803d' : '#7c3aed', w: 900 }]
        : [{ t: 'الصورة تتكون ' + where(m.vh), c: Math.abs(m.vh - 2) < .004 ? '#15803d' : '#b91c1c', w: 900 }, { t: 'قدرة عدسة العين الآن ' + S.pe.toFixed(1) + ' D' }, S.df === 'my' ? { t: 'العلاج: عدسة مفرقة f = −' + S.p.fp + ' cm', c: '#7c3aed', w: 800 } : S.df === 'hy' ? { t: 'العلاج: عدسة لامة قدرتها ' + (4 - 100 / S.p.np).toFixed(2) + ' D', c: '#0369a1', w: 800 } : { t: 'العين تتكيف بتغيير سمك عدستها', c: '#0f766e', w: 800 }, { t: m.on ? 'النظارة موضوعة' : 'بدون نظارة', c: '#475569' }];
      Q48.card(ctx, S, L, { title: DEF.find(q => q[0] === S.df)[1] + (far ? ': جسم بعيد' : ': جسم قريب'), y: 70, wd: 300 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.d); Q42.drawChips(ctx, C.o);
      Q48.banner(ctx, w, 'اختر العيب والجسم، ثم ضع النظارة');
    },
    chips(S, g) { return { d: Q42.chips(S, 'df', DEF, g.h - 128, S.df, (S2, k) => { S2.df = k; S2.ob = k === 'hy' ? 'near' : 'far'; }, { bw: 160 }),
      o: Q42.chips(S, 'ob', [['far', 'جسم بعيد'], ['near', 'جسم قريب 25 cm'], ['gl', S.p.gl ? 'انزع النظارة 👓' : 'ضع النظارة 👓']], g.h - 84, S.ob, (S2, k) => { if (k === 'gl') setParam(S2, 'gl', !S2.p.gl); else S2.ob = k; }, { bw: 180 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'gls', x: g.xg, y: g.ay, w: 40, h: 140, axis: 'none', tip: 'اضغط لوضع النظارة أو نزعها', idle: 'اضغط 👆', click: S2 => setParam(S2, 'gl', !S2.p.gl) }].concat(C.d, C.o); },
    readings(S) { const m = D.model(S); return [rd('العيب', DEF.find(q => q[0] === S.df)[1]), rd('بعد الصورة خلف العدسة', m.vh.toFixed(2) + ' cm'), rd('بعد الشبكية', '2.00 cm'), rd('قدرة عدسة العين', S.pe.toFixed(2) + ' D'), rd('قدرة النظارة', S.df === 'as' ? 'أسطوانية −1.5 D' : m.Pg.toFixed(2) + ' D')]; },
    explain(S) { return Q26.ex('في قصر البصر تتجمع أشعة الجسم البعيد قبل الشبكية، وفي طول البصر تصل أشعة الجسم القريب إلى الشبكية قبل أن تتجمع، فترى العين صورة مشوشة.', 'العدسة المفرقة تفرق الأشعة قليلاً فتبعد نقطة تجمعها إلى الشبكية، واللامة تجمعها قليلاً فتقربها. وفي الاستكماتزم يختلف تحدب القرنية في المقطع الأفقي عن الشاقولي فتصحح عدسة أسطوانية تعمل في اتجاه واحد فقط.', 'وصفة النظارة مثل −2.00 D لقصر البصر أو +1.50 D لطول البصر، ويكتب للاستكماتزم قدرة أسطوانية ومحورها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G2 — آلة التصوير وعارضة الصور (الشكل 21-8 + مسألة 3 ص 155) =============== */
(() => {
  const FC = 5, PC = 12, FP = 600 * 20 / 620; // camera lens f (cm), px/cm in the camera, projector lens f = 19.35 cm
  const EX = { q: 'عارضة سلايدات تكوّن صورة على حاجز يبعد 6 m. ارتفاع الصورة 1.5 m وارتفاع السلايد 5 cm. ما البعد البؤري لعدسة العارض؟', lines: ['M = h′/h = 150/5 = 30', 'v = 6 m = 600 cm', 'u = v/M = 600/30 = 20 cm', '1/f = 1/u + 1/v = 1/20 + 1/600', '1/f = 31/600', 'f = 19.4 cm'] };
  const D = { id: 'g10_ln_cam', page: 149, fig: 'الشكل 21-8 + أجهزة العرض ص 150 + مسألة 3',
    desc: 'آلة التصوير صندوق في مقدمته عدسة لامة وفي جداره الخلفي الفلم الحساس (يماثل شبكية العين)، ولها فتحة أمام العدسة (الحجاب) يتحكم بسعتها في كمية الضوء، ونتحكم ببعد العدسة عن الفلم لتكوين صورة حقيقية مقلوبة واضحة مصغرة لجسم أبعد من ضعف البعد البؤري. ولتصوير الحشرات مكبرة نقرب العدسة بحيث تقع الحشرة بين البؤرة وضعف البعد البؤري. وفي أجهزة العرض (السلايدات، فوق الرأس، السينما، الداتا شو) يقع الجسم بين F و 2F فتكون الصورة حقيقية مقلوبة مكبرة.',
    tags: 'آلة التصوير كاميرا فلم الحجاب diaphragm فتحة ضبط الوضوح تصوير الحشرات عارضة الصور سلايدات داتا شو مسألة 3 19.4cm',
    tools: ['آلة تصوير بمنفاخ', 'عارضة سلايدات', 'حاجز عرض'],
    steps: ['آلة التصوير: اسحب العدسة (حلقة الضبط) حتى تتضح الصورة على الفلم (الإطار الأيسر).', 'غيّر بعد الجسم u من اللوحة، أو سعة الحجاب: فتحة أوسع = صورة أسطع.', 'اختر «تصوير حشرة»: الحشرة بين F و 2F فتطول المسافة بين العدسة والفلم والصورة مكبرة.', 'اختر «عارضة الصور»: اسحب عدسة العارض حتى تتضح الصورة على الحاجز البعيد، ثم حل مسألة 3.'],
    concl: ['الكاميرا: جسم أبعد من 2F ⟸ صورة حقيقية مقلوبة مصغرة على الفلم.', 'نضبط الوضوح بتغيير بعد العدسة عن الفلم، والحجاب يتحكم بكمية الضوء.', 'لتصوير الحشرات مكبرة: الحشرة بين F و 2F.', 'أجهزة العرض: الجسم بين F و 2F ⟸ صورة حقيقية مقلوبة مكبرة، لذلك يوضع السلايد مقلوباً. مسألة 3: f = 19.4 cm.'],
    laws: ['g10_lenslaw', 'g10_lensmag'],
    controls: [R('u', 'بعد الجسم عن الكاميرا u', 20, 600, 300, 10, 'cm'), R('ap', 'قطر فتحة الحجاب', .3, 2.5, 1.2, .1, 'cm')],
    setup(S) { S.md = 'cam'; S.s = 6; S.sT = 6; S.up = 24; S.upT = 24; S.ex = 0; S.k = 0; S.clk = 0; },
    update(S, dt) { S.clk += dt; Q48.ease(S, 's', 'sT', dt, 8); Q48.ease(S, 'up', 'upT', dt, 8); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, ay: 440, xf: w - 70 }; },
    u(S) { return S.md === 'mac' ? 7.5 : S.p.u; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), ay = g.ay; Q48.bgLight(ctx, w, h);
      if (S.md !== 'proj') {
        const u = D.u(S), v = Q48.vOf(u, FC), M = -v / u, xl = g.xf - S.s * PC, B = S.p.ap * Math.abs(1 - S.s / v), mac = S.md === 'mac', hObj = mac ? 1 : 100;
        // camera: back box + bellows + lens board
        K.raw(ctx, () => { ctx.save(); const bg = ctx.createLinearGradient(0, ay - 80, 0, ay + 80); bg.addColorStop(0, '#374151'); bg.addColorStop(1, '#111827'); ctx.fillStyle = bg; rr(ctx, g.xf - 44, ay - 80, 64, 160, 8); ctx.fill();
          ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.moveTo(xl + 8, ay - 50); ctx.lineTo(g.xf - 44, ay - 72); ctx.lineTo(g.xf - 44, ay + 72); ctx.lineTo(xl + 8, ay + 50); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1.2; const n = Math.max(2, Math.floor((g.xf - 52 - xl) / 9)); for (let i = 1; i < n; i++) { const x = xl + 8 + (g.xf - 52 - xl) * i / n, f = (x - xl) / (g.xf - 44 - xl); ctx.beginPath(); ctx.moveTo(x, ay - 50 - 22 * f); ctx.lineTo(x, ay + 50 + 22 * f); ctx.stroke(); }
          ctx.fillStyle = '#7c2d12'; ctx.fillRect(g.xf - 2, ay - 60, 6, 120); ctx.fillStyle = '#111827'; rr(ctx, xl - 6, ay - 56, 16, 112, 4); ctx.fill(); ctx.restore(); });
        Q48.T(ctx, 'الفلم', g.xf + 2, ay - 94, { s: 11, w: 900, c: '#7c2d12' });
        // light from the object top through the aperture to its image
        const yo = mac ? -PC : -120, xo = mac ? xl - u * PC : g.L + 110, xi = xl + v * PC, ap = S.p.ap / 2.5 * 34, tgt = [xi, ay - hObj * M * PC];
        (mac ? [-ap, 0, ap] : [-ap, ap]).forEach((yl, k) => { const a = [xo, ay + yo], b = [xl, ay + yl], sl = (tgt[1] - b[1]) / (tgt[0] - b[0]), c = [g.xf, b[1] + sl * (g.xf - xl)]; Q26.ray(ctx, [a, b, c], yl === 0 ? '#16a34a' : '#ea580c', { w: 1.6, glow: false, hs: 6 }); });
        Q48.lens(ctx, xl, ay, 34, 'bx', { s: 5 }); K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.fillRect(xl - 14, ay - 46, 5, 46 - ap); ctx.fillRect(xl - 14, ay + ap, 5, 46 - ap); });
        Q48.T(ctx, 'الحجاب', xl - 20, ay - 60, { s: 10.5, w: 800, c: '#334155' });
        if (mac) K.raw(ctx, () => { ctx.save(); ctx.translate(xo, ay - 2); Q48.bug(ctx, 12); ctx.restore(); }); else { K.raw(ctx, () => { ctx.save(); ctx.translate(xo, ay - 40); Q48.tree(ctx, 170); ctx.restore(); }); Q48.T(ctx, '≈', (xo + xl) / 2 - 40, ay, { s: 30, w: 900, c: '#64748b' }); Q48.T(ctx, 'u = ' + u + ' cm', (xo + xl) / 2 - 40, ay + 34, { s: 12, w: 900, c: '#fff', bg: '#1d4ed8' }); }
        if (mac) Q48.dim(ctx, xo, xl, ay + 70, 'u = ' + u + ' cm', '#1d4ed8');
        Q48.dim(ctx, xl, g.xf, ay + 100, 's = ' + S.s.toFixed(2) + ' cm', '#0f766e');
        // film view
        Q48.inset(ctx, S, g.L + 20, 72, 200, 140, { v, M, B }, { title: 'الصورة على الفلم', tol: .03, q: 60, draw: (c, m) => { c.save(); c.globalAlpha = clamp(Math.pow(S.p.ap / 1.2, 2), .15, 1); if (mac) Q48.bug(c, m * 60); else Q48.tree(c, hObj * m * 60); c.restore(); } });
        const P = Q48.props(u, FC);
        Q48.card(ctx, S, [{ t: 'u = ' + u + ' cm   f = ' + FC + ' cm', mono: 1 }, { t: 'من القانون v = ' + v.toFixed(2) + ' cm', c: '#b91c1c', w: 900 }, { t: 'بعد العدسة عن الفلم s = ' + S.s.toFixed(2) + ' cm' }, { t: 'التكبير M = ' + Q48.n1(M, 3), mono: 0 }, { t: 'الصورة: ' + P.L.slice(0, 3).join('، '), c: '#334155', w: 800 }, { t: 'سطوع الصورة ∝ مساحة الفتحة', c: '#475569', s: 11.5 }], { title: mac ? 'تصوير حشرة: مكبرة' : 'آلة التصوير', y: 70, wd: 300 });
      } else {
        // slide projector: lamp, reflector, condenser, slide, projection lens → far screen
        const xs = g.L + 150, xpl = xs + S.up * 6, v = Q48.vOf(S.up, FP), M = -v / S.up, B = 4 * Math.abs(1 - 600 / v), sx = g.w - 250, sw = 230;
        K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#334155'; rr(ctx, g.L + 20, ay - 70, xs - g.L - 10, 140, 10); ctx.fill(); ctx.restore(); });
        K.raw(ctx, () => { ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(g.L + 80, ay, 40, Math.PI * .65, Math.PI * 1.35); ctx.stroke(); });
        Q26.bulb(ctx, g.L + 70, ay, 13, true); Q48.lens(ctx, g.L + 112, ay, 44, 'px', { s: 6 }); Q48.lens(ctx, g.L + 128, ay, 44, 'xp', { s: 6 });
        K.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(254,240,138,.35)'; ctx.beginPath(); ctx.moveTo(xpl, ay - 20); ctx.lineTo(sx, ay - 150); ctx.lineTo(sx, ay + 150); ctx.lineTo(xpl, ay + 20); ctx.closePath(); ctx.fill(); ctx.restore(); });
        K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.fillRect(xs - 3, ay - 22, 6, 44); ctx.strokeRect(xs - 3, ay - 22, 6, 44); ctx.translate(xs + 22, ay - 60); Q48.house(ctx, -20); ctx.restore(); });
        Q48.T(ctx, 'السلايد مقلوباً', xs + 22, ay - 92, { s: 10.5, w: 800, c: '#334155' });
        K.raw(ctx, () => { ctx.fillStyle = '#111827'; rr(ctx, xpl - 14, ay - 34, 28, 68, 6); ctx.fill(); }); Q48.lens(ctx, xpl, ay, 26, 'bx', { s: 5 });
        Q48.T(ctx, '≈ 6 m', (xpl + sx) / 2, ay + 40, { s: 14, w: 900, c: '#334155' });
        K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#f8fafc'; ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = 10; ctx.fillRect(sx, ay - 160, sw, 320); ctx.shadowColor = 'transparent'; ctx.beginPath(); ctx.rect(sx, ay - 160, sw, 320); ctx.clip(); ctx.translate(sx + sw / 2, ay); Q48.blurred(ctx, B * .8, .9, () => Q48.house(ctx, -M * 5 * 1.6)); ctx.restore(); });
        const ok = B < .6; Q48.T(ctx, ok ? '✔ صورة واضحة مكبرة' : 'حرّك عدسة العارض', sx + sw / 2, ay + 176, { s: 12, w: 900, c: '#fff', bg: ok ? '#15803d' : '#b45309' });
        Q48.dim(ctx, xs, xpl, ay + 70, 'u = ' + S.up.toFixed(1) + ' cm', '#1d4ed8');
        if (S.ex) Q42.steps(ctx, S, { title: 'مسألة 3 ص 155', q: EX.q, lines: EX.lines, k: S.k }, { y: 70, x: w - 12, wd: 330 });
        else Q48.card(ctx, S, [{ t: 'f = 19.4 cm   v = 600 cm', mono: 1 }, { t: 'من القانون يلزم v = ' + v.toFixed(0) + ' cm', c: '#b91c1c', w: 900 }, { t: 'التكبير |M| = ' + Math.abs(M).toFixed(1), c: '#0f766e', w: 900 }, { t: 'الصورة حقيقية مقلوبة مكبرة', c: '#334155', w: 800 }], { title: 'عارضة الصور', y: 70, wd: 280 });
      }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); C.s.forEach(b => b._col = '#be185d'); Q42.drawChips(ctx, C.s);
      Q48.banner(ctx, w, S.md === 'proj' ? 'اسحب عدسة العارض حتى تتضح الصورة' : 'اسحب العدسة حتى تتضح الصورة على الفلم');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['cam', 'آلة التصوير 📷'], ['mac', 'تصوير حشرة مكبرة 🐞'], ['proj', 'عارضة الصور: مسألة 3']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.ex = 0; if (k === 'mac') S2.sT = 12; if (k === 'cam') S2.sT = 6; }, { bw: 210 }),
      s: Q42.chips(S, 'st', S.md === 'proj' ? [['nx', '⬇ الخطوة التالية'], ['all', 'الحل كاملاً'], ['af', 'ضبط تلقائي ⇆']] : [['af', 'ضبط تلقائي للوضوح ⇆']], g.h - 84, S.ex ? 'nx' : '', (S2, k) => {
        if (k === 'af') { if (S2.md === 'proj') S2.upT = 20; else S2.sT = clamp(Q48.vOf(D.u(S2), FC), 4, 16); return; }
        if (!S2.ex) { S2.ex = 1; S2.k = 0; } S2.k = k === 'all' ? EX.lines.length : Math.min(S2.k + 1, EX.lines.length); }, { bw: 190 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      if (S.md === 'proj') { const xs = g.L + 150; return [{ id: 'pl', x: xs + S.up * 6, y: g.ay, w: 36, h: 70, axis: 'x', keep: true, tip: 'اسحب عدسة العارض', idle: 'اسحب ✋', drag: (S2, d) => { S2.upT = S2.up = Math.round(clamp((d.x - xs) / 6, 19.6, 30) * 10) / 10; } }].concat(C.m, C.s); }
      return [{ id: 'lens', x: g.xf - S.s * PC, y: g.ay, w: 36, h: 90, axis: 'x', keep: true, tip: 'اسحب العدسة لضبط الوضوح', idle: 'اسحب ✋', drag: (S2, d) => { S2.sT = S2.s = Math.round(clamp((g.xf - d.x) / PC, 4, 16) * 100) / 100; } }].concat(C.m, C.s); },
    readings(S) { if (S.md === 'proj') { const v = Q48.vOf(S.up, FP); return [rd('بعد السلايد u', S.up.toFixed(1) + ' cm'), rd('بعد الصورة اللازم v', v.toFixed(0) + ' cm'), rd('بعد الحاجز', '600 cm'), rd('التكبير', (v / S.up).toFixed(1))]; }
      const u = D.u(S), v = Q48.vOf(u, FC); return [rd('بعد الجسم u', u + ' cm'), rd('بعد الصورة v', v.toFixed(2) + ' cm'), rd('بعد العدسة عن الفلم', S.s.toFixed(2) + ' cm'), rd('التكبير M', Q48.n1(-v / u, 3)), rd('فتحة الحجاب', S.p.ap + ' cm')]; },
    explain(S) { return Q26.ex('كلما ابتعد الجسم اقتربت صورته من البؤرة فنقرب العدسة من الفلم، وفي تصوير الحشرة نبعد العدسة كثيراً عن الفلم فتكبر الصورة. وفي العارضة نقرب العدسة من السلايد قليلاً فتتكون صورة مكبرة جداً على الحاجز البعيد.', 'قانون العدسات: بعد الصورة v يعتمد على بعد الجسم u ، فلا بد أن يساوي بعد الفلم (أو الحاجز) v حتى تتضح الصورة. والحجاب الأوسع يدخل ضوءاً أكثر لكنه يكبر بقعة التشويش.', 'كاميرا الهاتف تحرك عدستها بمحرك صغير لضبط الوضوح تلقائياً، وجهاز الداتا شو يعمل كعارضة الصور.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G3 — الآلات البصرية: المكبر البسيط، المجهر المركب، التلسكوب الكاسر، منظار غاليلو، التلسكوب العاكس (الأشكال 22-8 … 26-8) =============== */
(() => {
  const MODES = [['mag', 'المجهر البسيط'], ['mic', 'المجهر المركب'], ['ast', 'التلسكوب الكاسر'], ['gal', 'منظار غاليلو'], ['ref', 'التلسكوب العاكس']];
  const DEF = { mag: [15, 5], mic: [2, 5], ast: [40, 8], gal: [40, 8], ref: [40, 6] };
  const EX = { q: 'عدسة مكبرة بعدها البؤري 15 cm. على أي بعد يوضع جسم عنها للحصول على صورة معتدلة مكبرة ثلاث مرات؟', lines: ['معتدلة مكبرة 3 مرات: M = +3', 'M = −v/u ⟸ v = −3u', '1/15 = 1/u + 1/(−3u)', '1/15 = 2/(3u)', 'u = 10 cm'] };
  const D = { id: 'g10_ln_inst', page: 149, fig: 'الأشكال 22-8 و 23-8 و 24-8 و 25-8 و 26-8 + مسألة 2',
    desc: 'الآلات البصرية المكبرة: المجهر البسيط (العدسة المكبرة) عدسة لامة قصيرة البعد البؤري يوضع الجسم ضمن بعدها البؤري فتعطي صورة تقديرية معتدلة مكبرة. المجهر المركب: شيئية قصيرة البعد البؤري يوضع الجسم على بعد أكبر قليلاً من بعدها البؤري فتعطي صورة حقيقية مكبرة مقلوبة، تقع ضمن البعد البؤري للعينية فتعطي صورة تقديرية مكبرة. أجهزة الرصد: التلسكوب الكاسر (شيئية واسعة طويلة البعد البؤري وعينية صغيرة قصيرة البعد البؤري)، ومنظار غاليلو بصورة معتدلة وطول أقصر، والتلسكوب العاكس بمرآة مقعرة بدل الشيئية.',
    tags: 'المجهر البسيط العدسة المكبرة المجهر المركب شيئية عينية التلسكوب الكاسر المنظار الفلكي منظار غاليلو التلسكوب العاكس مرآة مقعرة مسألة 2 أجهزة الرصد',
    tools: ['عدسة مكبرة', 'مجهر مركب', 'تلسكوب كاسر', 'منظار غاليلو', 'تلسكوب عاكس'],
    steps: ['اختر الجهاز من الصف الأعلى.', 'المكبرة والمجهر: اسحب الجسم الأزرق ولاحظ الصورة التقديرية المكبرة (الخط المتقطع).', 'التلسكوبات: اسحب النجمة للأعلى لتغيير زاوية الأشعة القادمة من الجسم البعيد، وقارن زاوية الخروج.', 'غيّر البعدين البؤريين للشيئية والعينية من اللوحة، وحل مسألة 2 على المكبرة.'],
    concl: ['المكبرة: الجسم ضمن البعد البؤري ⟸ صورة تقديرية معتدلة مكبرة (مسألة 2: u = 10 cm).', 'المجهر المركب: التكبير الكلي = تكبير الشيئية × تكبير العينية.', 'التلسكوب الكاسر: شيئية طويلة البعد البؤري وعينية قصيرة، والصورة مقلوبة بالنسبة للجسم.', 'منظار غاليلو: عينية مفرقة فالصورة معتدلة والمنظار أقصر. التلسكوب العاكس: مرآة مقعرة تجمع ضوءاً أكثر.'],
    laws: ['g10_lensmag', 'g10_lenscombo'],
    controls: [R('fo', 'البعد البؤري للشيئية أو للمكبرة', 1, 50, 15, .5, 'cm'), R('fe', 'البعد البؤري للعينية', 2, 12, 5, .5, 'cm')],
    setup(S) { S.md = 'mag'; S.u = 10; S.uT = 10; S.al = .06; S.ex = 0; S.k = 0; S.clk = 0; },
    update(S, dt) { S.clk += dt; Q48.ease(S, 'u', 'uT', dt, 8); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, ay: 450, xe: w - 14 }; },
    F(S) { const fo = S.p.fo, fe = S.p.fe; switch (S.md) { case 'mag': return [clamp(fo, 5, 20), fe]; case 'mic': return [clamp(fo, 1, 4), clamp(fe, 3, 8)]; default: return [clamp(fo, 20, 50), clamp(fe, 3, 12)]; } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), ay = g.ay, [fo, fe] = D.F(S), md = S.md; Q48.bgLight(ctx, w, h); let L = [];
      if (md === 'mag') {
        const ppc = 10, xl = g.L + 500, xo = xl - S.u * ppc, ho = 22; Q48.marks(ctx, xl, ay, fo * ppc, g.L + 8, g.xe); Q48.lens(ctx, xl, ay, 100, 'bx', { s: 7 });
        const r = Q48.rays3(ctx, { xl, ay, f: fo * ppc, xo, ho, x1: g.xe, w: 2, glow: false, clipY: 220, flow: true, ph: S.clk }); Q26.obj(ctx, xo, ay, ho, '#2563eb');
        if (isFinite(r.v) && r.v < 0 && Math.abs(r.hi) < 220 && r.xi > g.L) Q26.obj(ctx, r.xi, ay, r.hi, '#ea580c', { dash: true, w: 4 }); Q26.eye(ctx, xl + 70, ay, .9, Math.PI);
        const P = Q48.props(S.u, fo); L = [{ t: 'u = ' + S.u.toFixed(1) + ' cm   v = ' + Q48.n1(P.v) + ' cm', mono: 1 }, { t: 'M = −v/u = ' + Q48.n1(P.M, 2), mono: 1, c: '#b91c1c', w: 900 }, { t: S.u < fo ? 'صورة تقديرية معتدلة مكبرة' : 'الجسم ليس ضمن البعد البؤري!', c: S.u < fo ? '#15803d' : '#b91c1c', w: 900 }, { t: 'ضع الجسم ضمن البعد البؤري للعدسة', c: '#334155' }];
      } else if (md === 'mic') {
        const ppc = 12, x1 = g.L + 170, x2 = x1 + 16 * ppc, xo = x1 - S.u * ppc, ho = 6, Ls = [{ x: x1, f: fo * ppc }, { x: x2, f: fe * ppc }];
        Q26.axis(ctx, g.L + 8, g.xe, ay, '#475569'); [[x1, fo, 'o'], [x2, fe, 'e']].forEach(q => [-1, 1].forEach(sg => { const x = q[0] + sg * q[1] * ppc; Q26.pt(ctx, x, ay, '', '#b45309'); Q48.T(ctx, (sg < 0 ? 'F' : 'F′') + (q[2] === 'o' ? '₀' : 'ₑ'), x, ay + 16, { s: 10, w: 900, c: '#b45309' }); }));
        Q48.lens(ctx, x1, ay, 46, 'bx', { s: 9 }); Q48.lens(ctx, x2, ay, 70, 'bx', { s: 6 }); Q48.T(ctx, 'عدسة شيئية', x1 + 30, ay - 92, { s: 11, w: 900, c: '#fff', bg: '#0369a1' }); Q48.T(ctx, 'عدسة عينية', x2, ay - 90, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' });
        const v1 = Q48.vOf(S.u, fo), u2 = 16 - v1, v2 = Q48.vOf(u2, fe), M1 = -v1 / S.u, M2 = -v2 / u2;
        [0, ho / (x1 - xo), ho / ((x1 - fo * ppc) - xo)].forEach((s, k) => { if (!isFinite(s)) return; const t = Q48.trace(xo, -ho, s, Ls, g.xe), pts = Q48.shift(t.pts, ay).map(p => [p[0], clamp(p[1], ay - 230, ay + 230)]); Q26.ray(ctx, pts, Q48.RC[k], { w: 1.8, glow: false, hs: 6 }); if (isFinite(v2) && v2 < 0) { const yl = t.pts[t.pts.length - 2][1], xi = x2 + v2 * ppc; Q26.ray(ctx, [[x2, ay + yl], [xi, ay + clamp(yl + t.s * (xi - x2), -230, 230)]], Q48.RC[k], { dash: [5, 5], w: 1.3 }); } });
        Q26.obj(ctx, xo, ay, ho, '#2563eb', { w: 3 });
        if (isFinite(v1)) { const xi = x1 + v1 * ppc; if (xi < g.xe && xi > g.L) Q26.obj(ctx, xi, ay, ho * M1, '#a855f7', { dash: true, w: 3 }); }
        if (isFinite(v2) && v2 < 0) { const xi = x2 + v2 * ppc, hi = ho * M1 * M2; if (xi > g.L && Math.abs(hi) < 230) Q26.obj(ctx, xi, ay, hi, '#ea580c', { dash: true, w: 4 }); }
        Q26.eye(ctx, x2 + 60, ay, .8, Math.PI);
        L = [{ t: 'الشيئية: M₁ = ' + Q48.n1(M1, 2), c: '#0369a1', w: 800 }, { t: 'العينية: M₂ = ' + Q48.n1(M2, 2), c: '#7c3aed', w: 800 }, { t: 'M = M₁ × M₂ = ' + Q48.n1(M1 * M2, 1), mono: 1, c: '#b91c1c', w: 900 }, { t: u2 > 0 && u2 < fe ? 'الصورة الأولى ضمن البعد البؤري للعينية ✔' : 'حرّك الجسم: الصورة الأولى خارج بؤرة العينية', c: u2 > 0 && u2 < fe ? '#15803d' : '#b45309', w: 800 }, { t: 'مرآة مقعرة أسفل الجسم تركز الضوء عليه', c: '#475569', s: 11.5 }];
      } else if (md === 'ref') {
        const ppc = 8, xm = g.L + 600, Rm = 2 * fo * ppc, xF = xm - fo * ppc, xp = xF + 50, ye = ay - 50 - fe * ppc;
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(253,230,138,.35)'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 2; ctx.fillRect(g.L + 90, ay - 75, xm - g.L - 80, 150); ctx.strokeRect(g.L + 90, ay - 75, xm - g.L - 80, 150); ctx.fillRect(xp - 16, ye - 10, 32, ay - 75 - ye + 10); ctx.strokeRect(xp - 16, ye - 10, 32, ay - 75 - ye + 10);
          ctx.strokeStyle = '#334155'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(xm - Rm + 4, ay, Rm, -.12, .12); ctx.stroke(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(xp - 12, ay - 12); ctx.lineTo(xp + 12, ay + 12); ctx.stroke(); });
        [-55, -30, 30, 55].forEach((h0, k) => { const xh = xm - h0 * h0 / (2 * Rm), sl = -h0 / (xF - xh), xq = (sl * xh - h0 - xp) / (sl - 1), yq = xq - xp, xo2 = xq - sl * (ay + yq - ye);
          Q26.ray(ctx, [[g.L + 20, ay + h0], [xh, ay + h0], [xq, ay + yq], [xo2, ye], [xo2, ye - 60]], k % 2 ? '#2563eb' : '#dc2626', { w: 1.8, glow: false, hs: 6 }); });
        K.raw(ctx, () => { ctx.save(); ctx.translate(xp, ye); ctx.rotate(Math.PI / 2); Q48.lens(ctx, 0, 0, 22, 'bx', { s: 5 }); ctx.restore(); });
        Q48.T(ctx, 'مرآة مقعرة', xm - 10, ay + 96, { s: 11, w: 900, c: '#fff', bg: '#334155' }); Q48.T(ctx, 'مرآة مستوية', xp - 60, ay + 30, { s: 11, w: 900, c: '#fff', bg: '#64748b' }); Q48.T(ctx, 'عدسة عينية', xp + 70, ye, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' }); Q26.eye(ctx, xp, ye - 80, .8, Math.PI / 2);
        L = [{ t: 'مرآة مقعرة بدل العدسة الشيئية', c: '#0f766e', w: 900 }, { t: 'شدة الضوء المنعكس عن المرآة أكبر من شدة الضوء المار خلال العدسة', c: '#334155' }, { t: 'من أكبر المناظير في العالم', c: '#b91c1c', w: 800 }];
      } else {
        const ppc = 6, gal = md === 'gal', x1 = g.L + 150, x2 = x1 + (gal ? fo - fe : fo + fe) * ppc, Ls = [{ x: x1, f: fo * ppc }, { x: x2, f: (gal ? -fe : fe) * ppc }], al = S.al, x0 = g.L + 20;
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(226,232,240,.8)'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x1 - 10, ay - 80); ctx.lineTo(x2 + 10, ay - 40); ctx.lineTo(x2 + 10, ay + 40); ctx.lineTo(x1 - 10, ay + 80); ctx.closePath(); ctx.fill(); ctx.stroke(); });
        Q26.axis(ctx, g.L + 8, g.xe, ay, '#475569'); Q48.lens(ctx, x1, ay, 76, 'bx', { s: 7 }); Q48.lens(ctx, x2, ay, 34, gal ? 'bc' : 'bx', { s: 6 });
        Q48.T(ctx, 'عدسة شيئية', x1, ay - 96, { s: 11, w: 900, c: '#fff', bg: '#0369a1' }); Q48.T(ctx, gal ? 'عينية مفرقة' : 'عدسة عينية', x2, ay - 60, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' });
        [-55, 0, 55].forEach((h0, k) => { const y0 = h0 - al * (x1 - x0), t = Q48.trace(x0, y0, al, Ls, g.xe), pts = Q48.shift(t.pts, ay).map(p => [p[0], clamp(p[1], ay - 240, ay + 240)]); Q26.ray(ctx, pts, Q48.RC[k], { w: 1.8, glow: false, hs: 6 }); Q48.flow(ctx, pts, Q48.RC[k], S.clk + k * .3); });
        const xF = x1 + fo * ppc, yF = ay + al * fo * ppc; Q26.pt(ctx, xF, yF, '', '#a855f7'); Q48.T(ctx, gal ? 'I₁ تقديرية' : 'I₁', xF + 12, yF + 16, { s: 11, w: 900, c: '#7c3aed' });
        Q26.eye(ctx, x2 + 60, ay, .8, Math.PI);
        K.raw(ctx, () => { ctx.fillStyle = '#facc15'; ctx.save(); ctx.translate(g.L + 30, ay - al * 1500); ctx.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 6 : 14, a = i * Math.PI / 5 - Math.PI / 2; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fill(); ctx.restore(); });
        const ang = al * fo / fe; L = [{ t: 'زاوية الدخول = ' + (al * 180 / Math.PI).toFixed(1) + '°' }, { t: 'زاوية الخروج = ' + (ang * 180 / Math.PI).toFixed(1) + '° ' + (gal ? 'معتدلة' : 'مقلوبة'), c: '#b91c1c', w: 900 }, { t: 'التكبير الزاوي = fo/fe = ' + (fo / fe).toFixed(1), c: '#0f766e', w: 800 }, { t: 'طول المنظار = ' + (gal ? fo - fe : fo + fe) + ' cm', c: '#334155' }, { t: gal ? 'الصورة معتدلة والمنظار أقصر' : 'الصورة مقلوبة بالنسبة للجسم', c: '#7c3aed', w: 800 }];
      }
      if (S.ex && md === 'mag') Q42.steps(ctx, S, { title: 'مسألة 2 ص 155', q: EX.q, lines: EX.lines, k: S.k }, { y: 70, x: w - 12, wd: 320 });
      else Q48.card(ctx, S, L, { title: MODES.find(q => q[0] === md)[1] + (md === 'ref' ? '' : ': fo = ' + fo + ' cm'), y: 70, wd: 300 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); if (C.s.length) { C.s.forEach(b => b._col = '#be185d'); Q42.drawChips(ctx, C.s); }
      Q48.banner(ctx, w, md === 'mag' || md === 'mic' ? 'اسحب الجسم الأزرق' : md === 'ref' ? 'التلسكوب العاكس: تتبع الأشعة' : 'اسحب النجمة لتغيير زاوية الأشعة');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', MODES, g.h - 128, S.md, (S2, k) => { S2.md = k; S2.ex = 0; setParam(S2, 'fo', DEF[k][0]); setParam(S2, 'fe', DEF[k][1]); S2.uT = k === 'mag' ? 10 : 2.4; }, { bw: 140 }),
      s: S.md === 'mag' ? Q42.chips(S, 'st', [['ex', 'مسألة 2'], ['nx', '⬇ الخطوة التالية'], ['all', 'الحل كاملاً']], g.h - 84, S.ex ? 'ex' : '', (S2, k) => { if (k === 'ex' || !S2.ex) { S2.ex = 1; S2.k = 0; setParam(S2, 'fo', 15); S2.uT = 10; if (k === 'ex') return; } S2.k = k === 'all' ? EX.lines.length : Math.min(S2.k + 1, EX.lines.length); }, { bw: 170 }) : [] }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), [fo] = D.F(S); let L = [];
      if (S.md === 'mag') { const xl = g.L + 500; L = [{ id: 'obj', x: xl - S.u * 10, y: g.ay - 22, r: 20, axis: 'x', keep: true, tip: 'اسحب الجسم', idle: 'اسحب ✋', drag: (S2, d) => { S2.ex = 0; S2.uT = S2.u = Math.round(clamp((xl - d.x) / 10, 1, 40) * 2) / 2; } }]; }
      else if (S.md === 'mic') { const x1 = g.L + 170; L = [{ id: 'obj', x: x1 - S.u * 12, y: g.ay - 6, r: 18, axis: 'x', keep: true, tip: 'اسحب الجسم', idle: 'اسحب ✋', drag: (S2, d) => { S2.uT = S2.u = Math.round(clamp((x1 - d.x) / 12, fo * 1.02, 8) * 20) / 20; } }]; }
      else if (S.md !== 'ref') L = [{ id: 'star', x: g.L + 30, y: g.ay - S.al * 1500, r: 20, axis: 'y', keep: true, tip: 'اسحب النجمة', idle: 'اسحب ✋', drag: (S2, d) => { S2.al = clamp((g.ay - d.y) / 1500, 0, .12); } }];
      return L.concat(C.m, C.s); },
    readings(S) { const [fo, fe] = D.F(S); return [rd('الجهاز', MODES.find(q => q[0] === S.md)[1]), rd('fo', fo + ' cm'), rd('fe', fe + ' cm'), S.md === 'mag' || S.md === 'mic' ? rd('بعد الجسم u', S.u.toFixed(2) + ' cm') : rd('التكبير الزاوي fo/fe', (fo / fe).toFixed(1))]; },
    explain(S) { return Q26.ex('في المكبرة والمجهر نرى صورة تقديرية كبيرة خلف العدسة، وفي التلسكوب تخرج الأشعة من العينية بزاوية أكبر من زاوية دخولها فيبدو الجسم البعيد أكبر.', 'العدسة الأولى (الشيئية أو المرآة المقعرة) تكوّن صورة حقيقية، والعينية تعمل كمكبرة لهذه الصورة؛ والتكبير الكلي حاصل ضرب التكبيرين. الشيئية الواسعة تجمع كمية أكبر من الضوء.', 'تُستعمل المناظير في رصد الأجرام السماوية وفي الرقابة العسكرية وحلبات سباق الخيل، والمجاهر في المختبرات الطبية لرؤية البكتيريا.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== H1 — مسائل الفصل وأسئلة «علل» (ص 152–155) =============== */
(() => {
  const PB = {
    m1: { n: 'م1', t: 'مسألة 1', q: 'وضع جسم أمام عدسة مفرقة بعدها البؤري 12 cm فتكونت له صورة طولها ثلث طول الجسم. ما بعد الجسم عن العدسة وما بعد صورته؟', lines: ['المفرقة: f = −12 cm والصورة معتدلة M = +1/3', 'M = −v/u ⟸ v = −u/3', '1/(−12) = 1/u − 3/u = −2/u', 'u = 24 cm', 'v = −24/3 = −8 cm'], d: { f: -12, u: 24, ppc: 11, xl: 430 } },
    m2: { n: 'م2', t: 'مسألة 2', q: 'عدسة مكبرة بعدها البؤري 15 cm. على أي بعد يوضع جسم عنها للحصول على صورة معتدلة مكبرة ثلاث مرات؟', lines: ['M = +3 ⟸ v = −3u', '1/15 = 1/u − 1/(3u) = 2/(3u)', 'u = 10 cm', 'v = −30 cm: صورة تقديرية'], d: { f: 15, u: 10, ppc: 10, xl: 460 } },
    m3: { n: 'م3', t: 'مسألة 3', q: 'عارضة سلايدات تكوّن صورة على حاجز يبعد 6 m. ارتفاع الصورة 1.5 m وارتفاع السلايد 5 cm. ما البعد البؤري لعدسة العارض؟', lines: ['M = 150/5 = 30', 'u = v/M = 600/30 = 20 cm', '1/f = 1/20 + 1/600 = 31/600', 'f = 19.4 cm'] },
    m4: { n: 'م4', t: 'مسألة 4', q: 'قلم رصاص طوله 10 cm وضع على بعد 70 cm يسار عدسة بعدها البؤري +50 cm. جد صفات الصورة.', lines: ['1/50 = 1/70 + 1/v', '1/v = 1/50 − 1/70 = 2/350', 'v = +175 cm', 'M = −v/u = −175/70 = −2.5', 'h′ = M h = −2.5 × 10 = −25 cm', 'الصورة حقيقية مكبرة مقلوبة'], d: { f: 50, u: 70, ppc: 2.4, xl: 260 } },
    wa: { n: 'علل أ', t: 'علل أ', q: 'البعد البؤري لعدسة يختلف باختلاف لون الضوء الساقط عليها.', lines: ['لأن معامل انكسار مادة العدسة يختلف باختلاف الطول الموجي', 'البنفسجي قصير الطول الموجي ينحرف أكثر', 'فيكون بعده البؤري أقصر من بعد الأحمر'] },
    wb: { n: 'علل ب', t: 'علل ب', q: 'يتغير البعد البؤري للعدسة اللامة عند نقلها من الهواء إلى الماء.', lines: ['البعد البؤري يعتمد على الفرق بين معامل انكسار العدسة ومعامل انكسار الوسط', 'في الماء يقل هذا الفرق فتنحرف الأشعة أقل', 'فيزداد البعد البؤري: زجاج 1.5 في ماء 1.33 يطول f نحو 3.9 مرة'] },
    wc: { n: 'علل ج', t: 'علل ج', q: 'الأشعة التي تمر بالمركز البصري للعدسات الرقيقة تنفذ بنفس الاتجاه.', lines: ['جانبا العدسة عند المركز البصري متوازيان تقريباً', 'فتعمل عمل لوح زجاجي رقيق: ينزاح الشعاع انزياحاً صغيراً جداً', 'ويهمل الانزياح لأن العدسة رقيقة'] },
    q3: { n: 'س3', t: 'س3: الزيغ اللوني', q: 'ما سبب الزيغ اللوني في العدسات؟ وكيف يعالج؟', lines: ['السبب: اختلاف معامل الانكسار باختلاف الطول الموجي', 'فتتجمع الألوان في نقاط مختلفة: البنفسجي أقرب والأحمر أبعد', 'العلاج: عدسة لا لونية: لامة من زجاج الكراون ملصقة بمفرقة من زجاج الفلنت', 'تشتيت إحداهما يلغي الأخرى: 1/f = 1/f₁ + 1/f₂'] },
    q4: { n: 'س4', t: 'س4: الزيغ الكروي', q: 'ما سبب الزيغ الكروي في العدسات؟ وكيف يعالج؟', lines: ['السبب: الأشعة البعيدة عن المحور تتجمع أقرب إلى العدسة من القريبة منه', 'فلا تتجمع الأشعة المتوازية في بؤرة واحدة', 'العلاج: حاجز أمام حافة العدسة يمنع الأشعة البعيدة عن المحور', 'أو استعمال عدسة محدبة–مستوية'] }
  };
  const D = { id: 'g10_ln_problems', page: 152, fig: 'أسئلة الفصل الثامن ومسائله ص 152–155',
    desc: 'حل مسائل الفصل الأربع خطوة خطوة مع رسم الأشعة لكل منها، وأسئلة «علل» الثلاث، وسؤالي الزيغ اللوني والزيغ الكروي.',
    tags: 'مسائل الفصل الثامن علل الزيغ اللوني الزيغ الكروي مسألة 1 مسألة 2 مسألة 3 مسألة 4 24cm −8cm 10cm 19.4cm −25cm',
    tools: ['عدسات لامة ومفرقة', 'مسطرة', 'حاسبة'],
    steps: ['اختر سؤالاً من الصف الأعلى: م1 إلى م4 للمسائل، وعلل أ ب ج ، وس3 وس4.', 'اضغط «الخطوة التالية» لترى الحل خطوة خطوة، أو «الحل كاملاً».', 'لاحظ الرسم: الأشعة الرئيسة تؤكد الجواب الحسابي.'],
    concl: ['م1: u = 24 cm ، v = −8 cm.', 'م2: u = 10 cm.', 'م3: f = 19.4 cm.', 'م4: v = +175 cm ، h′ = −25 cm (حقيقية مكبرة مقلوبة).'],
    laws: ['g10_lenslaw', 'g10_lensmag'],
    controls: [TG('rays', 'الأشعة الرئيسة في المسائل', true, null, 'rays')],
    setup(S) { S.pb = 'm1'; S.k = 0; S.clk = 0; },
    update(S, dt) { S.clk += dt; },
    pic(ctx, S, w, h) {
      const L = Q42.L(S), ay = 470, P = PB[S.pb], x0 = L + 8, x1 = w - 12;
      if (P.d) { const d = P.d, xl = L + d.xl, f = d.f * d.ppc, xo = xl - d.u * d.ppc, ho = 30, v = Q48.vOf(d.u, d.f), xi = xl + v * d.ppc, hi = ho * (-v / d.u);
        Q48.marks(ctx, xl, ay, f, x0, x1, { fs: 11 }); Q48.lens(ctx, xl, ay, 105, f > 0 ? 'bx' : 'bc', { s: 6 });
        if (S.p.rays) Q48.rays3(ctx, { xl, ay, f, xo, ho, x1, w: 1.8, glow: false, clipY: 150, flow: true, ph: S.clk });
        Q26.obj(ctx, xo, ay, ho, '#2563eb'); if (Math.abs(hi) < 150) Q26.obj(ctx, xi, ay, hi, '#ea580c', { dash: v < 0, w: 4 });
        if (S.k >= P.lines.length - 1) { Q48.dim(ctx, xo, xl, ay - 125, 'u = ' + d.u + ' cm', '#1d4ed8'); Q48.dim(ctx, xl, xi, ay + 125, 'v = ' + Q48.n1(v) + ' cm', v > 0 ? '#15803d' : '#c2410c'); }
        return; }
      if (S.pb === 'm3') { const xs = L + 60, xpl = xs + 110, sx = w - 70; Q26.axis(ctx, x0, x1, ay, '#94a3b8');
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(254,240,138,.45)'; ctx.beginPath(); ctx.moveTo(xpl, ay - 18); ctx.lineTo(sx, ay - 150); ctx.lineTo(sx, ay + 150); ctx.lineTo(xpl, ay + 18); ctx.fill(); ctx.fillStyle = '#e2e8f0'; ctx.fillRect(sx, ay - 160, 12, 320); });
        Q26.obj(ctx, xs, ay, -20, '#2563eb'); Q48.lens(ctx, xpl, ay, 40, 'bx', { s: 6 }); Q26.obj(ctx, sx - 8, ay, 150, '#ea580c', { w: 5 });
        Q48.T(ctx, 'السلايد 5 cm', xs, ay + 44, { s: 11, w: 900, c: '#1d4ed8' }); Q48.T(ctx, 'الصورة 1.5 m', sx - 50, ay - 170, { s: 11, w: 900, c: '#ea580c' }); Q48.dim(ctx, xs, xpl, ay + 80, 'u = 20 cm', '#1d4ed8'); Q48.dim(ctx, xpl, sx, ay + 120, 'v = 6 m', '#15803d'); return; }
      if (S.pb === 'wa' || S.pb === 'q3') { const ach = S.pb === 'q3' && S.k >= 3, xl = L + 200; Q26.axis(ctx, x0, x1, ay, '#94a3b8'); Q48.lens(ctx, xl, ay, 80, 'bx', { s: 9 }); if (ach) Q48.lens(ctx, xl + 12, ay, 80, 'pc', { s: 5, tint: [253, 230, 138], bd: '#ca8a04' });
        [['#a855f7', 230], ['#22c55e', 260], ['#ef4444', 290]].forEach(c => { const f = ach ? 262 : c[1]; [-60, 60].forEach(y0 => Q26.ray(ctx, [[x0 + 10, ay + y0], [xl, ay + y0], [xl + f, ay], [x1, ay + y0 * (1 - (x1 - xl) / f)]], c[0], { w: 1.8, glow: false, hs: 6 })); Q26.pt(ctx, xl + f, ay, '', c[0]); });
        if (!ach) { Q48.T(ctx, 'بنفسجي', xl + 230, ay + 22, { s: 11, w: 900, c: '#7e22ce' }); Q48.T(ctx, 'أحمر', xl + 290, ay - 22, { s: 11, w: 900, c: '#b91c1c' }); } else Q48.T(ctx, 'عدسة لا لونية: الألوان في نقطة واحدة', xl + 262, ay + 26, { s: 11, w: 900, c: '#fff', bg: '#15803d' }); return; }
      if (S.pb === 'wb') { [[ay - 80, 1, 'في الهواء', 'rgba(255,255,255,0)'], [ay + 80, 3.9, 'في الماء', 'rgba(56,189,248,.22)']].forEach(q => { const y = q[0], xl = L + 150, f = 100 * q[1]; K.raw(ctx, () => { ctx.fillStyle = q[3]; ctx.fillRect(x0, y - 70, x1 - x0, 140); }); Q26.axis(ctx, x0, x1, y, '#94a3b8'); Q48.lens(ctx, xl, y, 50, 'bx', { s: 6 });
        [-35, 35].forEach(y0 => Q26.ray(ctx, [[x0 + 10, y + y0], [xl, y + y0], [x1, y + y0 * (1 - (x1 - xl) / f)]], '#ea580c', { w: 1.8, glow: false, hs: 6 })); if (xl + f < x1) Q26.pt(ctx, xl + f, y, '', '#b45309'); Q48.T(ctx, q[2] + ': f = ' + (10 * q[1]).toFixed(0) + ' cm', x0 + 70, y - 52, { s: 11.5, w: 900, c: '#0f172a' }); }); return; }
      if (S.pb === 'wc') { const xl = L + 330; Q26.axis(ctx, x0, x1, ay, '#94a3b8'); K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(147,197,253,.45)'; ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(xl, ay - 120); ctx.quadraticCurveTo(xl + 70, ay, xl, ay + 120); ctx.quadraticCurveTo(xl - 70, ay, xl, ay - 120); ctx.fill(); ctx.stroke(); ctx.setLineDash([4, 4]); ctx.strokeStyle = '#be185d'; ctx.beginPath(); ctx.moveTo(xl - 35, ay - 70); ctx.lineTo(xl - 35, ay + 70); ctx.moveTo(xl + 35, ay - 70); ctx.lineTo(xl + 35, ay + 70); ctx.stroke(); ctx.restore(); });
        const a = .32, yin = -a * 35, p0 = [x0 + 20, ay + yin - a * (xl - 35 - x0 - 20)], p1 = [xl - 35, ay + yin], p2 = [xl + 35, ay - yin * .4], p3 = [x1, ay - yin * .4 + a * (x1 - xl - 35)];
        Q26.ray(ctx, [p0, p1, p2, p3], '#ea580c', { w: 2.2, hs: 7 }); Q26.ray(ctx, [p1, [xl + 35, ay + yin + a * 70]], '#94a3b8', { dash: [4, 4], w: 1.4 }); Q48.T(ctx, 'وجهان متوازيان تقريباً عند المركز', xl, ay - 140, { s: 11.5, w: 900, c: '#be185d' }); Q48.T(ctx, 'انزياح صغير جداً يهمل', xl + 150, ay + 70, { s: 11, w: 900, c: '#fff', bg: '#475569' }); return; }
      if (S.pb === 'q4') { const xl = L + 220, f0 = 300; Q26.axis(ctx, x0, x1, ay, '#94a3b8'); Q48.lens(ctx, xl, ay, 110, 'bx', { s: 14 }); const stop = S.k >= 2; if (stop) K.raw(ctx, () => { ctx.fillStyle = '#111827'; ctx.fillRect(xl - 30, ay - 125, 8, 80); ctx.fillRect(xl - 30, ay + 45, 8, 80); });
        [-100, -75, -50, -25, 25, 50, 75, 100].forEach(h0 => { if (stop && Math.abs(h0) > 40) { Q26.ray(ctx, [[x0 + 10, ay + h0], [xl - 30, ay + h0]], '#f87171', { w: 1.6, glow: false, arrows: false }); return; } const f = f0 * (1 - .28 * (h0 / 110) ** 2); Q26.ray(ctx, [[x0 + 10, ay + h0], [xl, ay + h0], [x1, ay + h0 * (1 - (x1 - xl) / f)]], Math.abs(h0) > 60 ? '#dc2626' : '#ca8a04', { w: 1.6, glow: false, hs: 6 }); });
        Q26.pt(ctx, xl + f0 * (1 - .28 * (100 / 110) ** 2), ay, '', '#dc2626'); Q48.T(ctx, 'I₁', xl + f0 * (1 - .28 * (100 / 110) ** 2) - 8, ay + 20, { s: 13, w: 900, c: '#dc2626' }); Q26.pt(ctx, xl + f0, ay, '', '#ca8a04'); Q48.T(ctx, 'I₂', xl + f0 + 8, ay + 20, { s: 13, w: 900, c: '#a16207' }); }
    },
    draw(ctx, w, h, S) {
      const P = PB[S.pb]; Q48.bgLight(ctx, w, h); D.pic(ctx, S, w, h);
      Q42.steps(ctx, S, { title: P.t, q: P.q, lines: P.lines, k: S.k }, { y: 62, x: w - 12, wd: 360 });
      const C = D.chips(S); Q42.drawChips(ctx, C.p); C.s[0]._col = '#be185d'; Q42.drawChips(ctx, C.s);
      Q48.banner(ctx, w, 'اختر سؤالاً واضغط «الخطوة التالية»');
    },
    chips(S) { return { p: Q42.chips(S, 'pb', Object.keys(PB).map(k => [k, PB[k].n]), S.H - 128, S.pb, (S2, k) => { S2.pb = k; S2.k = 0; }, { bw: 82 }),
      s: Q42.chips(S, 'st', [['nx', '⬇ الخطوة التالية'], ['all', 'الحل كاملاً'], ['rs', '↺ من البداية']], S.H - 84, '', (S2, k) => { const n = PB[S2.pb].lines.length; S2.k = k === 'rs' ? 0 : k === 'all' ? n : Math.min(S2.k + 1, n); }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const C = D.chips(S); C.p[0].idle = 'اضغط 👆'; return C.p.concat(C.s); },
    readings(S) { return [rd('السؤال', PB[S.pb].t), rd('الخطوة', S.k + ' / ' + PB[S.pb].lines.length)]; },
    explain(S) { return Q26.ex('لكل مسألة رسم دقيق بمقياس: الأشعة الرئيسة تلتقي في الموضع نفسه الذي يعطيه القانون.', 'نطبق 1/f = 1/u + 1/v و M = −v/u مع الإشارات: f سالب للمفرقة، v سالب للصورة التقديرية، M موجب للمعتدلة.', 'هذه الحسابات نفسها يستعملها مصممو الكاميرات وأجهزة العرض والنظارات.'); }
  };
  M8.P[D.id] = D;
})();

/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g10_ln_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g10_ln_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g10_lens_types', ch: 48, reg: X10, sec: '8-1 العدسات الرقيقة', page: 133, kind: 'نشاط',
  title: 'أنواع العدسات الرقيقة: اللامة والمفرقة بأشكالها الستة',
  desc: 'نسلط حزمة أشعة متوازية من صندوق ضوئي على ست عدسات زجاجية حقيقية (ثلاث محدبة وثلاث مقعرة) ونتتبع الأشعة بقانون سنيل عند كل وجه، فنرى أن العدسة السميكة الوسط تجمع الأشعة والرقيقة الوسط تفرقها، ونرى العدسة موشورين، وأثر معامل الانكسار ووسط الماء.',
  tags: 'العدسات الرقيقة لامة مفرقة محدبة مقعرة',
  fact: ['تصنع العدسات من الزجاج أو مواد لدنة شفافة للضوء المرئي، ومن الكوارتز للأشعة فوق البنفسجية، ومن الجرمانيوم للأشعة تحت الحمراء البعيدة (ص 133).', 'العدسة اللامة تعمل عمل موشورين بقاعدة مشتركة عند المركز البصري، والمفرقة موشوران يلتقي رأساهما عند المركز البصري (تذكر ص 134).', 'العدسة الرقيقة: سمك مادتها صغير مقارنة ببعدها البؤري (ص 133).'],
  quiz: [
    { q: 'البعد البؤري لعدسة رقيقة لا يعتمد على:', o: ['قطر العدسة', 'معامل انكسار مادة العدسة', 'معامل انكسار الوسط المحيط بالعدسة', 'نصفي قطري تكور العدسة'], a: 0, why: 'س1-1 ص 152.' },
    { q: 'العدسة التي وسطها أسمك من حافتها:', o: ['لامة (محدبة)', 'مفرقة (مقعرة)', 'لا تغير مسار الأشعة'], a: 0, why: 'ص 133.' },
    { q: 'العدسة المستوية–المقعرة عدسة:', o: ['مفرقة', 'لامة', 'لامة في الهواء فقط'], a: 0, why: 'الشكل 2-8 ص 133.' }],
  parts: [{ id: 'g10_ln_types', n: 'الصندوق الضوئي والعدسات الست: تتبع حقيقي للأشعة' }] });
M8.merge({ id: 'g10_lens_images', ch: 48, reg: X10, sec: '8-2 المفاهيم الأساسية + 8-3 و 8-4 الصور في العدسات', page: 134, kind: 'نشاط',
  title: 'المركز البصري والبؤرة والأشعة الرئيسة: صور العدسة اللامة والمفرقة',
  desc: 'نرسم الأشعة الثلاثة من رأس الجسم (الموازي، المار بالمركز البصري، المار بالبؤرة) ونحدد صفات الصورة لكل موقع للجسم، ونقارن العدسة اللامة بالمفرقة. ثم ننتقل إلى المصطبة البصرية فنستلم صورة لهب شمعة على حاجز ونرى الفرق العملي بين الصورة الحقيقية والتقديرية.',
  tags: 'المركز البصري البؤرة المحور الأساس المحور الثانوي الأشعة الرئيسة صفات الصورة المصطبة البصرية',
  fact: ['يكفي شعاعان لتحديد موقع الصورة، والثالث للتأكد منه (ص 135).', 'F البؤرة الابتدائية و F′ البؤرة الثانوية (ص 136).', 'صورة العدسة المفرقة لجسم حقيقي دائماً تقديرية معتدلة مصغرة في جهة الجسم وأمامه (ص 138).'],
  quiz: [
    { q: 'للحصول على صورة حقيقية مقلوبة أكبر من الجسم بعدسة لامة يوضع الجسم:', o: ['بين البؤرة وضعف البعد البؤري', 'أكبر من ضعف بعدها البؤري', 'أقل من بعدها البؤري', 'بقدر ضعف بعدها البؤري'], a: 0, why: 'س1-2 ص 152.' },
    { q: 'للحصول على صورة معتدلة تقديرية أكبر من الجسم بعدسة لامة يوضع الجسم:', o: ['على مسافة أقل من بعدها البؤري', 'بقدر بعدها البؤري', 'بقدر ضعف بعدها البؤري', 'أكثر من ضعف بعدها البؤري'], a: 0, why: 'س1-3 ص 152.' },
    { q: 'للحصول على صورة معتدلة تقديرية مكبرة يجب استعمال:', o: ['عدسة لامة يوضع الجسم ضمن بعدها البؤري', 'عدسة مفرقة مقعرة الوجهين', 'عدسة مفرقة مقعرة مستوية', 'عدسة لامة والجسم أبعد من بعدها البؤري'], a: 0, why: 'س1-4 ص 152.' },
    { q: 'للحصول على صورة مصغرة تقديرية بعدسة مفرقة يوضع الجسم:', o: ['على أي بعد كان من العدسة', 'أقل من بعدها البؤري', 'أكثر من بعدها البؤري', 'بقدر ضعف بعدها البؤري'], a: 0, why: 'س1-5 ص 153.' },
    { q: 'جسم على مسافة لا نهائية من عدسة لامة تتكون له صورة:', o: ['حقيقية', 'تقديرية', 'معتدلة', 'أكبر من الجسم'], a: 0, why: 'س1-6 ص 153: في البؤرة F′.' }],
  parts: [{ id: 'g10_ln_rays', n: 'الأشعة الرئيسة وصفات الصورة: لامة ومفرقة' }, { id: 'g10_ln_bench', n: 'المصطبة البصرية: الشمعة والعدسة والحاجز' }] });
M8.merge({ id: 'g10_lens_focus', ch: 48, reg: X10, sec: 'نشاط 3: تعيين البعد البؤري لعدسة لامة', page: 138, kind: 'نشاط',
  title: 'تعيين البعد البؤري لعدسة لامة: الشمس والجسم البعيد وطريقة u و v',
  desc: 'نجد البعد البؤري تقريبياً بتجميع أشعة الشمس في أصغر نقطة شديدة الإضاءة (حتى تحترق الورقة!) أو باستلام صورة شجرة بعيدة على حاجز، ثم نجده بدقة بقياس u و v لعدة مواقع للشمعة ورسم 1/v مقابل 1/u.',
  tags: 'نشاط 3 البعد البؤري الشمس جسم بعيد طريقة u v رسم بياني',
  fact: ['الأشعة القادمة من الشمس أو من جسم بعيد موازية لمحور العدسة فتتجمع في بؤرتها (ص 138–139).', 'لا تنظر إلى الشمس مباشرة ولا من خلال العدسة.'],
  quiz: [
    { q: 'عند توجيه عدسة لامة نحو الشمس، المسافة بين العدسة وأصغر بقعة مضيئة تساوي:', o: ['البعد البؤري تقريباً', 'ضعف البعد البؤري', 'نصف البعد البؤري'], a: 0, why: 'نشاط 3 ص 138.' },
    { q: 'رسم 1/v مقابل 1/u لعدسة لامة يعطي خطاً مستقيماً مقطعه على كل محور:', o: ['1/f', 'f', '2f'], a: 0, why: '1/u + 1/v = 1/f.' }],
  parts: [{ id: 'g10_ln_sun', n: 'نشاط 3: صورة الشمس وصورة جسم بعيد' }, { id: 'g10_ln_uv', n: 'طريقة u و v والرسم البياني' }] });
M8.merge({ id: 'g10_lens_law', ch: 48, reg: X10, sec: '8-5 قانون العدسات والتكبير', page: 139, kind: 'مثال',
  title: 'قانون العدسات 1/f = 1/u + 1/v والتكبير M = −v/u: المثالان 1 و 2',
  desc: 'نسحب الجسم أمام العدسة ونقرأ u و v والتكبير بإشاراتها على مسطرة موجبة وسالبة، ونحل مثال 1 بحالاته الثلاث ومثال 2 للعدسة المفرقة خطوة خطوة، ونفسر معنى التكبير ونسبة المساحتين.',
  tags: 'قانون العدسات التكبير إشارات مثال 1 مثال 2 نسبة المساحتين',
  fact: ['قانون العدسات هو القانون العام للمرايا والعدسات (ص 139).', 'M موجب: صورة تقديرية معتدلة، M سالب: صورة حقيقية مقلوبة (ص 140).', 'النسبة بين مساحتي الصورة والجسم تساوي النسبة بين مربعي بعديهما عن المركز البصري (ص 140).'],
  quiz: [
    { q: 'عدسة لامة f = 15 cm. بعد الصورة المتكونة لجسم فيها يعتمد على:', o: ['بعد الجسم عن هذه العدسة', 'ارتفاع الجسم', 'كون الجسم معتدلاً أم مقلوباً', 'كل الاحتمالات السابقة'], a: 0, why: 'س1-7 ص 153.' },
    { q: 'عدسة مفرقة بعدها البؤري 10 cm وجسم على بعد 40 cm منها. موقع الصورة:', o: ['−8 cm', '+16 cm', '−10 cm', '+20 cm'], a: 0, why: 'س1-8 ص 153: 1/v = −1/10 − 1/40 = −5/40.' },
    { q: 'جسم على بعد 40 cm من عدسة لامة بعدها البؤري 20 cm. صورته على بعد:', o: ['40 cm', '30 cm', '20 cm', '15 cm'], a: 0, why: 'س1-9 ص 153: الجسم عند 2F.' },
    { q: 'تكبير عدسة لامة −3 يعني أن الصورة:', o: ['حقيقية مقلوبة طولها ثلاثة أمثال طول الجسم', 'تقديرية معتدلة طولها ثلاثة أمثال', 'تقديرية مقلوبة طولها ثلاثة أمثال', 'حقيقية مقلوبة طولها ثلث طول الجسم'], a: 0, why: 'س1-10 ص 154.' },
    { q: 'مثال 1: عدسة لامة f = 10 cm وجسم على بعد 30 cm. بعد الصورة والتكبير:', o: ['v = +15 cm و M = −0.5', 'v = −15 cm و M = +0.5', 'v = +30 cm و M = −1'], a: 0, why: 'مثال 1 ص 141.' }],
  parts: [{ id: 'g10_ln_law', n: 'قانون العدسات والتكبير + المثالان 1 و 2' }] });
M8.merge({ id: 'g10_lens_combo', ch: 48, reg: X10, sec: 'نظام من عدستين + 8-6 قدرة العدسة', page: 143, kind: 'مثال',
  title: 'نظام من عدستين رقيقتين وقدرة العدسة بالدايوبتر: مثال 3',
  desc: 'نضع عدستين على المحور نفسه: صورة الأولى جسم للثانية والتكبير الكلي M₁ × M₂ (مثال 3). ثم نستعمل صندوق العدسات التجريبية لفاحص البصر لنقيس قدرة العدسة P = 1/f بالدايوبتر ونجمع قدرات العدسات المتلاصقة، ونطبق معادلة صانعي العدسات.',
  tags: 'نظام عدستين مثال 3 قدرة العدسة دايوبتر صانعي العدسات',
  fact: ['يستعمل فاحصو البصر وأطباء العيون وحدة الدايوبتر لقياس قدرة عدسة العين (ص 144).', 'قدرة العدسة اللامة موجبة والمفرقة سالبة: f = 20 cm ⟸ +5 D ، f = −25 cm ⟸ −4 D (ص 144).', 'للعدستين المتلاصقتين d = 0: 1/f = 1/f₁ + 1/f₂ (ص 144).'],
  quiz: [
    { q: 'عدسة مفرقة، جسم على بعد 80 cm يسارها وصورته التقديرية على بعد 16 cm يسارها. قدرة العدسة:', o: ['−5 D', '−4 D', '−2 D', '−1.25 D'], a: 0, why: 'س1-11 ص 154: f = −20 cm.' },
    { q: 'مثال 3: f₁ = 10 cm و f₂ = 5 cm و d = 40 cm و u₁ = 15 cm. التكبير الكلي:', o: ['+2', '−2', '−1'], a: 0, why: 'M = (−2) × (−1) = +2 ص 145.' },
    { q: 'وحدة قدرة العدسة:', o: ['الدايوبتر D', 'السنتيمتر', 'الواط'], a: 0, why: 'ص 144.' }],
  parts: [{ id: 'g10_ln_combo', n: 'نظام من عدستين + مثال 3' }, { id: 'g10_ln_power', n: 'قدرة العدسة: صندوق العدسات التجريبية' }] });
M8.merge({ id: 'g10_lens_aberr', ch: 48, reg: X10, sec: '8-7 الزيغ الكروي + 8-8 الزيغ اللوني', page: 145, kind: 'نشاط',
  title: 'عيوب العدسات: الزيغ الكروي والزيغ اللوني والعدسة اللالونية',
  desc: 'نتتبع أشعة حزمة عريضة خلال عدسة كبيرة بقانون سنيل فنرى أن الأشعة البعيدة عن المحور تتجمع أقرب، ونعالج ذلك بحاجز أو بعدسة محدبة–مستوية. ثم نمرر ضوءاً أبيض فنرى البنفسجي يتجمع قبل الأحمر، ونعالجه بعدسة لا لونية من الكراون والفلنت.',
  tags: 'الزيغ الكروي الزيغ اللوني عدسة لا لونية كراون فلنت',
  fact: ['استعملت العدسات المحدبة–المستوية كعدسة شيئية في التلسكوب وفي النظارات الطبية لتقليل الزيغ الكروي (ص 146).', 'العدسة اللالونية: لامة من الكراون بقدرة موجبة أكبر ملصقة بمفرقة من الفلنت بقدرة سالبة أصغر (ص 146–147).'],
  quiz: [
    { q: 'سبب الزيغ اللوني:', o: ['اختلاف معامل انكسار مادة العدسة باختلاف الطول الموجي', 'كروية سطح العدسة', 'سمك العدسة'], a: 0, why: 'س3 ص 154.' },
    { q: 'يقل الزيغ الكروي باستعمال:', o: ['حاجز أمام حافة العدسة', 'عدسة أكبر قطراً', 'ضوء أبيض'], a: 0, why: 'ص 146.' },
    { q: 'في الزيغ اللوني يلاقي المحور الأساس أقرب إلى العدسة اللون:', o: ['البنفسجي', 'الأحمر', 'الأخضر'], a: 0, why: 'الشكل 15-8.' }],
  parts: [{ id: 'g10_ln_sph', n: 'الزيغ الكروي: تتبع حقيقي للأشعة' }, { id: 'g10_ln_chrom', n: 'الزيغ اللوني والعدسة اللالونية' }] });
M8.merge({ id: 'g10_lens_apps', ch: 48, reg: X10, sec: '8-9 تطبيقات على العدسات', page: 147, kind: 'نشاط',
  title: 'تطبيقات العدسات: العين والنظارات، آلة التصوير والعارضة، المجهر والتلسكوب',
  desc: 'نصحح قصر البصر وطول البصر والاستكماتزم بالنظارات المناسبة، ونضبط وضوح آلة التصوير ونصور حشرة مكبرة ونشغل عارضة السلايدات (مسألة 3)، ونرسم الأشعة في المكبرة والمجهر المركب والتلسكوب الكاسر ومنظار غاليلو والتلسكوب العاكس.',
  tags: 'تطبيقات العدسات عيوب البصر نظارات آلة التصوير عارضة الصور مجهر تلسكوب',
  fact: ['العين السليمة ترى الأجسام بوضوح إذا كانت أبعد من ضعف البعد البؤري لعدستها فتتكون على الشبكية صورة حقيقية مقلوبة مصغرة (ص 147).', 'الفلم في آلة التصوير يماثل شبكية العين (ص 149).', 'في أجهزة العرض يقع الجسم بين البؤرة وضعف البعد البؤري فتكون الصورة مقلوبة مكبرة حقيقية دائماً (ص 150).', 'المجهر الحديث يحمل عدة عدسات شيئية يمكن اختيار أي منها، ويمكن ربطه بكاميرا رقمية (ص 150).'],
  quiz: [
    { q: 'يعالج قصر البصر باستعمال:', o: ['عدسات مفرقة', 'عدسات لامة', 'عدسات أسطوانية'], a: 0, why: 'الشكل 17-8.' },
    { q: 'العين المصابة بطول البصر تتكون فيها صورة الجسم القريب:', o: ['خلف الشبكية', 'أمام الشبكية', 'على الشبكية'], a: 0, why: 'الشكل 18-8.' },
    { q: 'يصحح الاستكماتزم باستعمال:', o: ['عدسات أسطوانية', 'عدسات مفرقة فقط', 'مرآة مقعرة'], a: 0, why: 'الشكل 20-8.' },
    { q: 'يوضع الجسم في المجهر المركب على مسافة من الشيئية:', o: ['أكبر قليلاً من بعدها البؤري', 'أقل من بعدها البؤري', 'ضعف بعدها البؤري تماماً'], a: 0, why: 'ص 149.' },
    { q: 'منظار غاليلو يمتاز عن المنظار الفلكي بأن صورته:', o: ['معتدلة وطوله أقصر', 'مقلوبة وطوله أطول', 'حقيقية على حاجز'], a: 0, why: 'ص 151.' }],
  parts: [{ id: 'g10_ln_eye', n: 'العين وعيوب البصر والنظارات' }, { id: 'g10_ln_cam', n: 'آلة التصوير وعارضة الصور' }, { id: 'g10_ln_inst', n: 'المكبرة والمجهر والتلسكوبات' }] });
M8.merge({ id: 'g10_lens_review', ch: 48, reg: X10, sec: 'أسئلة الفصل الثامن ومسائله', page: 152, kind: 'مثال',
  title: 'مسائل الفصل الثامن وأسئلة «علل» خطوة خطوة',
  desc: 'نحل مسائل الكتاب الأربع (العدسة المفرقة، المكبرة، عارضة السلايدات، القلم أمام العدسة) مع رسم الأشعة، وأسئلة «علل» الثلاث، وسببي الزيغ اللوني والكروي وعلاجهما.',
  tags: 'مسائل الفصل الثامن علل',
  fact: ['أجوبة المسائل في الكتاب: م1 u = 24 cm و v = −8 cm ، م2 u = 10 cm ، م3 f = 19.4 cm ، م4 h′ = −25 cm (ص 155).'],
  quiz: [
    { q: 'قلم طوله 10 cm على بعد 70 cm من عدسة f = +50 cm. طول صورته:', o: ['−25 cm', '+25 cm', '−4 cm'], a: 0, why: 'مسألة 4 ص 155.' },
    { q: 'عدسة مكبرة f = 15 cm. بعد الجسم لصورة معتدلة مكبرة 3 مرات:', o: ['10 cm', '20 cm', '45 cm'], a: 0, why: 'مسألة 2 ص 155.' },
    { q: 'الأشعة المارة بالمركز البصري لعدسة رقيقة تنفذ بنفس الاتجاه لأن:', o: ['جانبي العدسة عند المركز البصري متوازيان تقريباً', 'العدسة لا تكسر الضوء', 'المركز البصري بؤرة'], a: 0, why: 'علل ج ص 154.' }],
  parts: [{ id: 'g10_ln_problems', n: 'المسائل م1–م4 وأسئلة علل وس3 وس4' }] });
