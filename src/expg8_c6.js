'use strict';
/* ====================== الثاني المتوسط — الفصل السادس: الضوء (ch 26, ص 70–88) ======================
   Merged experiments (book order): g8_shadows · g8_light_what · g8_reflection · g8_curved · g8_refraction · g8_lenses · g8_dispersion
   Parts registered in M8.P (expg8_0kit.js). Local optics kit Q26: real ray tracing (reflection / Snell / circles), lasers, mirrors, lenses, eye… */
LW({ id: 'g8_light', cat: 26, name: 'الضوء وسرعته', fx: '<i>c</i> = <i>λ</i> × <i>f</i> &nbsp;،&nbsp; <i>c</i> = 3×10<sup>8</sup> m/s', sym: 'الضوء شكل من أشكال الطاقة، موجة كهرومغناطيسية (مجال كهربائي عمودي على مجال مغناطيسي). c سرعة الضوء في الفراغ، f التردد (Hz)، λ الطول الموجي (m). الطيف المرئي سبعة ألوان أطوالها الموجية بين 400 nm و 700 nm', calc: { in: [['l', 'الطول الموجي λ', 'nm', 600]], out: 'التردد f', u: '×10¹⁴ Hz', f: v => 3e8 / (v.l * 1e-9) / 1e14 } });
LW({ id: 'g8_straight', cat: 26, name: 'خصائص الضوء', fx: 'يسير بخطوط مستقيمة ، استقلالية الأشعة ، لا يحتاج إلى وسط ناقل', sym: '1) يسير الضوء في خطوط مستقيمة في الوسط المتجانس الواحد. 2) الأشعة الضوئية عندما تتقاطع لا يؤثر أي منها في الآخر. 3) ينتقل في الفراغ وفي الأوساط الشفافة. 4) سرعته ثابتة في الوسط الواحد' });
LW({ id: 'g8_shadow', cat: 26, name: 'الظل وشبه الظل', fx: 'مصدر نقطي ⟸ ظل تام فقط ، مصدر واسع ⟸ ظل تام + شبه ظل', sym: 'يتكون الظل عند وقوع جسم معتم في مسار الضوء. الظل التام منطقة مظلمة تماماً، وشبه الظل منطقة مضاءة قليلاً حولها. تكوّن الظلال دليل على انتشار الضوء بخطوط مستقيمة' });
LW({ id: 'g8_refl', cat: 26, name: 'قانونا الانعكاس', fx: 'زاوية السقوط = زاوية الانعكاس', sym: 'القانون الأول: زاوية السقوط = زاوية الانعكاس. القانون الثاني: الشعاع الساقط والشعاع المنعكس والعمود المقام من نقطة السقوط تقع جميعها في مستوٍ واحد عمودي على السطح العاكس', calc: { in: [['s', 'الزاوية بين الشعاع والسطح', '°', 40]], out: 'زاوية الانعكاس', u: '°', f: v => 90 - v.s } });
LW({ id: 'g8_plane', cat: 26, name: 'صفات الصورة في المرآة المستوية', fx: 'بعد الصورة = بعد الجسم', sym: 'الصورة بكبر الجسم، معتدلة ومعكوسة جانبياً، وهمية تبدو خلف المرآة، وبعد الجسم عن المرآة يساوي بعد الصورة عنها', calc: { in: [['d', 'بعد الجسم عن المرآة', 'cm', 100]], out: 'بعد الصورة عن المرآة', u: 'cm', f: v => v.d } });
LW({ id: 'g8_sph', cat: 26, name: 'المرايا الكروية', fx: '<i>f</i> = ' + FR('<i>R</i>', '2'), sym: 'البؤرة F تتوسط المسافة بين مركز التكور C وقطب المرآة P. المقعرة (لامّة): بؤرتها حقيقية. المحدبة (مفرّقة): بؤرتها وهمية وصورتها دائماً مصغرة معتدلة وهمية', calc: { in: [['R', 'نصف قطر التكور R', 'cm', 40]], out: 'البعد البؤري f', u: 'cm', f: v => v.R / 2 } });
LW({ id: 'g8_refr', cat: 26, name: 'انكسار الضوء', fx: 'أكثف ضوئياً ⟸ يقترب من العمود ، أقل كثافة ⟸ يبتعد عن العمود', sym: 'الانكسار: تغيّر مسار الشعاع الضوئي عند انتقاله بين وسطين شفافين مختلفين في الكثافة الضوئية إذا سقط بصورة مائلة. سرعة الضوء: الفراغ 3×10⁸ m/s، الماء 2.25×10⁸ m/s، الزجاج 2×10⁸ m/s' });
LW({ id: 'g8_crit', cat: 26, name: 'الزاوية الحرجة والانعكاس الكلي الداخلي', fx: 'زاوية السقوط > الزاوية الحرجة ⟸ انعكاس كلي داخلي', sym: 'الزاوية الحرجة: زاوية السقوط في الوسط الأكثف ضوئياً التي تقابلها زاوية انكسار قائمة (90°) في الوسط الأقل كثافة. الماء ≈ 48.6°، الزجاج ≈ 41.8°' });
LW({ id: 'g8_lens', cat: 26, name: 'العدسات', fx: 'المحدبة (اللامّة): بؤرة حقيقية ، المقعرة (المفرّقة): بؤرة وهمية', sym: 'العدسة جسم شفاف محدد بسطحين كرويين أو أحدهما كروي والآخر مستوٍ. البعد البؤري: المسافة بين البؤرة والمركز البصري. الجسم بين البؤرة والعدسة المحدبة ⟸ صورة معتدلة مكبرة وهمية (العدسة المكبرة)' });
LW({ id: 'g8_disp', cat: 26, name: 'تحليل الضوء الأبيض والألوان', fx: 'أحمر + أخضر + أزرق = أبيض', sym: 'الموشور يحلل الضوء الأبيض إلى سبعة ألوان لأن لكل لون سرعة انتشار خاصة في مادته فينكسر بزاوية مختلفة. الألوان الأساسية للضوء: الأحمر والأخضر والأزرق، والأصباغ الأساسية: الأصفر والأرجواني والفيروزي (مزجها ⟸ أسود)' });

const Q26 = {
  P: {},
  T(ctx, s, x, y, o) { C2.T(ctx, s, x, y, o || {}); },
  nf(v, d = 3, u) { v = +v; return fmt(Math.abs(v) < 5e-4 ? 0 : v, d, u); },
  r1(v) { return (Math.round(v * 10) / 10).toFixed(1).replace(/\.0$/, ''); },
  sc(w, h) { return clamp(Math.min(w / 820, h / 720), .5, 1.25); },
  ph(S) { return S && S.W && S.W < 600; },
  cx(w) { return w < 600 ? w / 2 : (w + 64) / 2; },
  banner(ctx, w, s, col = '#db2777', y = 20) { const ph = w < 600; Q26.T(ctx, s, ph ? Q26.cx(w) : 76, ph ? y + 22 : y, { s: ph ? 11 : 13.5, w: 900, c: '#fff', bg: col, a: ph ? 'center' : 'left' }); },
  card(ctx, S, L, o = {}) { const w = S.W; if (w < 600) o = Object.assign({}, o, { wd: w - 24, f: 1, lh: 18 }); L = L.map(q => (typeof q === 'object' && q.mono && /[؀-ۿ]/.test(q.t)) ? Object.assign({}, q, { mono: 0 }) : q);
    if (w < 600) L = L.map(q => typeof q === 'string' ? { t: q, s: 11 } : Object.assign({}, q, { s: Math.min(q.s || 12.5, 11) }));
    return C2.lines(ctx, L, (o.x != null && w >= 600) ? o.x : w - 12, o.y || 44, Math.min(o.wd || 340, w * (o.f || .46)), o); },
  wrap(t, n) { const out = []; let cur = ''; String(t).split(' ').forEach(wd => { if ((cur + ' ' + wd).trim().length > n && cur) { out.push(cur); cur = wd; } else cur = (cur + ' ' + wd).trim(); }); if (cur) out.push(cur); return out; },
  btn(id, b, click, o = {}) { return Object.assign({ id, x: b.x, y: b.y, w: b.w, h: b.h, tip: o.tip || 'اضغط', hint: !!o.hint, click }, o.idle ? { idle: o.idle } : {}); },
  /* ---------- vector math ---------- */
  dot(a, b) { return a[0] * b[0] + a[1] * b[1]; },
  nrm(a) { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; },
  dir(a) { return [Math.cos(a), Math.sin(a)]; },
  refl(d, n) { const k = 2 * Q26.dot(d, n); return [d[0] - k * n[0], d[1] - k * n[1]]; },
  /* Snell: d unit incident, n unit normal (any side), n1 → n2 ; returns refracted unit dir or null (total internal reflection) */
  refr(d, n, n1, n2) { let c = -Q26.dot(n, d); if (c < 0) { n = [-n[0], -n[1]]; c = -c; } const e = n1 / n2, k = 1 - e * e * (1 - c * c); if (k < 0) return null; const t = e * c - Math.sqrt(k); return [e * d[0] + t * n[0], e * d[1] + t * n[1]]; },
  /* ray p + t d (t>eps) against segment a-b */
  seg(p, d, a, b) { const ex = b[0] - a[0], ey = b[1] - a[1], den = d[0] * ey - d[1] * ex; if (Math.abs(den) < 1e-9) return null;
    const t = ((a[0] - p[0]) * ey - (a[1] - p[1]) * ex) / den, u = ((a[0] - p[0]) * d[1] - (a[1] - p[1]) * d[0]) / den; if (t <= 1e-6 || u < 0 || u > 1) return null; return { t, u, pt: [p[0] + t * d[0], p[1] + t * d[1]] }; },
  /* ray against circle: nearest t > eps */
  circ(p, d, c, r) { const fx = p[0] - c[0], fy = p[1] - c[1], b = fx * d[0] + fy * d[1], cc = fx * fx + fy * fy - r * r, D = b * b - cc; if (D < 0) return null; const s = Math.sqrt(D); let t = -b - s; if (t <= 1e-4) t = -b + s; if (t <= 1e-4) return null; return { t, pt: [p[0] + t * d[0], p[1] + t * d[1]] }; },
  lineX(a, b, x) { return a[1] + (b[1] - a[1]) * (x - a[0]) / ((b[0] - a[0]) || 1e-9); },
  /* ---------- drawing ---------- */
  raw(ctx, f) { K.raw(ctx, f); },
  head(ctx, x, y, a, col, sz = 8) { K.raw(ctx, () => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * sz, y + Math.sin(a) * sz); ctx.lineTo(x + Math.cos(a + 2.5) * sz * .9, y + Math.sin(a + 2.5) * sz * .9); ctx.lineTo(x + Math.cos(a - 2.5) * sz * .9, y + Math.sin(a - 2.5) * sz * .9); ctx.closePath(); ctx.fill(); }); },
  /* light ray along polyline pts. o: w, dash (virtual extension), arrows, glow, alpha */
  ray(ctx, pts, col, o = {}) {
    if (!pts || pts.length < 2) return; const w = o.w || 2.6;
    K.raw(ctx, () => {
      ctx.save(); ctx.globalAlpha = o.alpha ?? 1; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      if (o.dash) { ctx.setLineDash(o.dash === true ? [7, 6] : o.dash); ctx.strokeStyle = col; ctx.lineWidth = Math.max(1.4, w * .7); ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.restore(); return; }
      if (o.glow !== false) { ctx.globalAlpha = (o.alpha ?? 1) * .22; ctx.strokeStyle = col; ctx.lineWidth = w * 3.6; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.globalAlpha = o.alpha ?? 1; }
      ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
      ctx.restore();
    });
    if (o.arrows !== false) for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 26) continue; const f = o.at ?? .5; Q26.head(ctx, a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, Math.atan2(b[1] - a[1], b[0] - a[0]), col, (o.hs || 8) * (w > 3 ? 1.15 : 1)); }
  },
  /* trace a ray through a list of segment mirrors (reflect) ; returns points */
  bounce(p, d, segs, n = 8, far = 3000) { const pts = [p.slice()]; let P = p, D = d; for (let k = 0; k < n; k++) { let best = null; segs.forEach(s => { const r = Q26.seg(P, D, s[0], s[1]); if (r && (!best || r.t < best.t)) best = Object.assign(r, { s }); });
      if (!best) { pts.push([P[0] + D[0] * far, P[1] + D[1] * far]); return pts; } pts.push(best.pt); if (best.s[2] === 'stop') return pts; const s = best.s, nn = Q26.nrm([-(s[1][1] - s[0][1]), s[1][0] - s[0][0]]); D = Q26.refl(D, nn); P = best.pt; } return pts; },
  /* laser pen: emitting point (x,y), beam direction a */
  laser(ctx, x, y, a, s = 1, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); const L = 78 * s, R = 8 * s;
      ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 6 * s; ctx.shadowOffsetY = 3 * s;
      const g = ctx.createLinearGradient(0, -R, 0, R); g.addColorStop(0, '#9ca3af'); g.addColorStop(.35, '#f3f4f6'); g.addColorStop(.6, '#6b7280'); g.addColorStop(1, '#374151');
      ctx.fillStyle = g; rr(ctx, -L, -R, L - 6 * s, 2 * R, 3 * s); ctx.fill(); ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#111827'; rr(ctx, -9 * s, -R * .75, 9 * s, R * 1.5, 2 * s); ctx.fill();
      ctx.fillStyle = o.col || '#ef4444'; ctx.beginPath(); ctx.arc(0, 0, 2.6 * s, 0, TAU); ctx.fill();
      ctx.fillStyle = '#dc2626'; rr(ctx, -L * .55, -R - 2.5 * s, 12 * s, 4 * s, 2 * s); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(-L + 4 * s, -R * .55, L - 18 * s, 2 * s);
      ctx.restore(); });
  },
  /* ray box (صندوق ضوئي) */
  raybox(ctx, x, y, a, s = 1, HH) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); const L = 70 * s, H = HH || 34 * s;
      ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 6 * s; ctx.shadowOffsetY = 3 * s;
      const g = ctx.createLinearGradient(0, -H / 2, 0, H / 2); g.addColorStop(0, '#475569'); g.addColorStop(.5, '#1e293b'); g.addColorStop(1, '#0f172a'); ctx.fillStyle = g; rr(ctx, -L, -H / 2, L, H, 5 * s); ctx.fill(); ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#fde68a'; ctx.fillRect(-3 * s, -H / 2 + 4 * s, 3 * s, H - 8 * s); ctx.fillStyle = '#64748b'; for (let k = 0; k < 4; k++) ctx.fillRect(-L + 10 * s + k * 9 * s, -H / 2 + 5 * s, 4 * s, H - 10 * s);
      ctx.restore(); });
  },
  bulb(ctx, x, y, r, on = true, o = {}) {
    K.raw(ctx, () => {
      if (on) { const g = ctx.createRadialGradient(x, y, r * .3, x, y, r * 4); g.addColorStop(0, 'rgba(254,240,138,.95)'); g.addColorStop(.35, 'rgba(253,224,71,.35)'); g.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 4, 0, TAU); ctx.fill(); }
      const gg = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r); gg.addColorStop(0, on ? '#fffbeb' : '#f1f5f9'); gg.addColorStop(1, on ? '#fde047' : '#cbd5e1'); ctx.fillStyle = gg; ctx.strokeStyle = on ? '#ca8a04' : '#94a3b8'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = on ? '#b45309' : '#64748b'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x - r * .35, y + r * .8); ctx.lineTo(x - r * .2, y); ctx.lineTo(x, y - r * .25); ctx.lineTo(x + r * .2, y); ctx.lineTo(x + r * .35, y + r * .8); ctx.stroke();
      if (o.cap !== false) { const cy = y + r * .85, g3 = ctx.createLinearGradient(x - r * .5, 0, x + r * .5, 0); g3.addColorStop(0, '#71717a'); g3.addColorStop(.5, '#e4e4e7'); g3.addColorStop(1, '#52525b'); ctx.fillStyle = g3; rr(ctx, x - r * .5, cy, r, r * .75, 2); ctx.fill(); ctx.strokeStyle = '#3f3f46'; ctx.lineWidth = 1; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x - r * .5, cy + k * r * .18); ctx.lineTo(x + r * .5, cy + k * r * .18); ctx.stroke(); } }
    });
  },
  sun(ctx, x, y, r, t = 0, o = {}) {
    K.raw(ctx, () => { const g = ctx.createRadialGradient(x, y, r * .5, x, y, r * (o.halo || 1.8)); g.addColorStop(0, 'rgba(253,224,71,.9)'); g.addColorStop(.5, 'rgba(251,191,36,.3)'); g.addColorStop(1, 'rgba(251,191,36,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * (o.halo || 1.8), 0, TAU); ctx.fill();
      const g2 = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r); g2.addColorStop(0, '#fffbeb'); g2.addColorStop(.5, '#fde047'); g2.addColorStop(1, '#f59e0b'); ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      if (o.spots !== false && r > 25) { ctx.fillStyle = 'rgba(234,88,12,.18)'; for (let k = 0; k < 7; k++) { const a = k * 2.3 + t * .05, rr2 = r * (.25 + (k % 3) * .2); ctx.beginPath(); ctx.arc(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2, r * .12, 0, TAU); ctx.fill(); } } });
  },
  candle(ctx, x, y, s = 1, t = 0, on = true) { // y = base
    K.raw(ctx, () => { const W = 16 * s, H = 50 * s; const g = ctx.createLinearGradient(x - W / 2, 0, x + W / 2, 0); g.addColorStop(0, '#fde68a'); g.addColorStop(.5, '#fffbeb'); g.addColorStop(1, '#fcd34d'); ctx.fillStyle = g; rr(ctx, x - W / 2, y - H, W, H, 3 * s); ctx.fill();
      ctx.strokeStyle = '#1c1917'; ctx.lineWidth = 1.5 * s; ctx.beginPath(); ctx.moveTo(x, y - H); ctx.lineTo(x, y - H - 6 * s); ctx.stroke();
      if (on) { const f = 1 + .08 * Math.sin(t * 13) + .05 * Math.sin(t * 7.3), fy = y - H - 6 * s; const gl = ctx.createRadialGradient(x, fy - 8 * s, 2, x, fy - 8 * s, 40 * s); gl.addColorStop(0, 'rgba(254,215,170,.7)'); gl.addColorStop(1, 'rgba(254,215,170,0)'); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(x, fy - 8 * s, 40 * s, 0, TAU); ctx.fill();
        ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(x, fy - 22 * s * f); ctx.quadraticCurveTo(x + 7 * s, fy - 6 * s, x, fy + 2 * s); ctx.quadraticCurveTo(x - 7 * s, fy - 6 * s, x, fy - 22 * s * f); ctx.fill();
        ctx.fillStyle = '#fef08a'; ctx.beginPath(); ctx.moveTo(x, fy - 15 * s * f); ctx.quadraticCurveTo(x + 4 * s, fy - 5 * s, x, fy); ctx.quadraticCurveTo(x - 4 * s, fy - 5 * s, x, fy - 15 * s * f); ctx.fill(); } });
  },
  /* side-view eye looking along angle a; (x,y) = pupil */
  eye(ctx, x, y, s = 1, a = 0) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); const L = 26 * s;
      ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#c2410c'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-L * 1.25, -L * .8); ctx.quadraticCurveTo(L * .3, -L * 1.05, L * .25, 0); ctx.quadraticCurveTo(L * .3, L * 1.05, -L * 1.25, L * .8); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-L * .6, -L * .42); ctx.quadraticCurveTo(L * .15, -L * .5, L * .12, 0); ctx.quadraticCurveTo(L * .15, L * .5, -L * .6, L * .42); ctx.quadraticCurveTo(-L * .75, 0, -L * .6, -L * .42); ctx.fill(); ctx.strokeStyle = '#7c2d12'; ctx.stroke();
      ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.ellipse(-L * .02, 0, L * .12, L * .3, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.ellipse(L * .03, 0, L * .06, L * .16, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(-L * .55, -L * .62); ctx.quadraticCurveTo(0, -L * .78, L * .1, -L * .55); ctx.stroke();
      ctx.restore(); });
  },
  apple(ctx, x, y, r, o = {}) { // centre
    K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = o.alpha ?? 1; if (o.flip) { ctx.translate(x, y); ctx.scale(-1, 1); ctx.translate(-x, -y); }
      if (o.ghost) { ctx.setLineDash([5, 4]); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 1.6; }
      const g = ctx.createRadialGradient(x - r * .35, y - r * .3, r * .1, x, y, r * 1.1); g.addColorStop(0, '#fca5a5'); g.addColorStop(.45, '#dc2626'); g.addColorStop(1, '#7f1d1d'); ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(x, y - r * .7); ctx.bezierCurveTo(x + r * .6, y - r * 1.15, x + r * 1.15, y - r * .5, x + r * .95, y + r * .2); ctx.bezierCurveTo(x + r * .8, y + r * .95, x + r * .25, y + r * 1.05, x, y + r * .85); ctx.bezierCurveTo(x - r * .25, y + r * 1.05, x - r * .8, y + r * .95, x - r * .95, y + r * .2); ctx.bezierCurveTo(x - r * 1.15, y - r * .5, x - r * .6, y - r * 1.15, x, y - r * .7); ctx.closePath(); ctx.fill(); if (o.ghost) ctx.stroke();
      ctx.setLineDash([]); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2.4 * r / 22; ctx.beginPath(); ctx.moveTo(x, y - r * .65); ctx.quadraticCurveTo(x + r * .05, y - r * 1.05, x + r * .2, y - r * 1.2); ctx.stroke();
      ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.ellipse(x + r * .38, y - r * 1.02, r * .32, r * .14, -.5, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.ellipse(x - r * .45, y - r * .25, r * .14, r * .26, .4, 0, TAU); ctx.fill(); ctx.restore(); });
  },
  /* plane mirror segment a-b; back = unit normal pointing to the silvered (non-reflecting) side */
  mirror(ctx, a, b, back, o = {}) {
    K.raw(ctx, () => { const t = o.th || 7, bx = back[0] * t, by = back[1] * t; ctx.save();
      ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(b[0] + bx, b[1] + by); ctx.lineTo(a[0] + bx, a[1] + by); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(15,23,42,.55)'; ctx.lineWidth = 1; const L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.floor(L / 8); for (let k = 0; k <= n; k++) { const f = k / n, x = a[0] + (b[0] - a[0]) * f + bx, y = a[1] + (b[1] - a[1]) * f + by; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + bx * .9 + (b[0] - a[0]) / L * 5, y + by * .9 + (b[1] - a[1]) / L * 5); ctx.stroke(); }
      const g = ctx.createLinearGradient(a[0], a[1], b[0], b[1]); g.addColorStop(0, '#bae6fd'); g.addColorStop(.5, '#f0f9ff'); g.addColorStop(1, '#7dd3fc'); ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(a[0] + back[0] * 1.5, a[1] + back[1] * 1.5); ctx.lineTo(b[0] + back[0] * 1.5, b[1] + back[1] * 1.5); ctx.stroke();
      ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore(); });
  },
  /* angle arc between directions a1→a2 around (x,y) */
  arc(ctx, x, y, r, a1, a2, col, label, o = {}) {
    let d = a2 - a1; while (d > Math.PI) d -= TAU; while (d < -Math.PI) d += TAU;
    K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = o.w || 2.2; ctx.beginPath(); ctx.arc(x, y, r, a1, a1 + d, d < 0); ctx.stroke(); if (o.fill) { ctx.fillStyle = o.fill; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, a1, a1 + d, d < 0); ctx.closePath(); ctx.fill(); } });
    if (label) { const am = a1 + d / 2, rl = r + (o.lr || 22); Q26.T(ctx, label, x + Math.cos(am) * rl, y + Math.sin(am) * rl, { s: o.s || 12.5, w: 900, c: o.tc || '#fff', bg: o.bg || col }); }
  },
  /* dashed normal line */
  normal(ctx, x, y, a, L, col = '#334155', label) { K.raw(ctx, () => { ctx.save(); ctx.setLineDash([6, 5]); ctx.strokeStyle = col; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x - Math.cos(a) * L, y - Math.sin(a) * L); ctx.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); ctx.stroke(); ctx.restore(); });
    if (label) Q26.T(ctx, label, x + Math.cos(a) * (L + 12), y + Math.sin(a) * (L + 12), { s: 11.5, w: 800, c: col }); },
  /* dark optics room background (lasers visible) with a table top at ty */
  room(ctx, w, h, ty, o = {}) {
    G.bg(ctx, w, h, false);
    K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, ty); g.addColorStop(0, o.top || '#1e293b'); g.addColorStop(1, o.bot || '#334155'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, ty);
      if (ty < h) { const wg = ctx.createLinearGradient(0, ty, 0, h); wg.addColorStop(0, '#a87346'); wg.addColorStop(.1, '#8b5a33'); wg.addColorStop(1, '#5c3a1f'); ctx.fillStyle = wg; ctx.fillRect(0, ty, w, h - ty); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(0, ty, w, 2); } });
  },
  /* white paper sheet (top view) */
  paper(ctx, x, y, w, h, rot = 0) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 3; ctx.fillStyle = '#fafaf9'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.shadowColor = 'transparent'; ctx.strokeStyle = 'rgba(148,163,184,.25)'; ctx.lineWidth = 1; for (let yy = -h / 2 + 20; yy < h / 2; yy += 20) { ctx.beginPath(); ctx.moveTo(-w / 2, yy); ctx.lineTo(w / 2, yy); ctx.stroke(); } ctx.restore(); }); },
  /* semicircular protractor: centre (cx,cy), radius R, opening toward up (dir=-1) */
  protractor(ctx, cx, cy, R, up = -1) {
    K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(219,234,254,.55)'; ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, up < 0 ? Math.PI : 0, up < 0 ? TAU : Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, R * .62, up < 0 ? Math.PI : 0, up < 0 ? TAU : Math.PI); ctx.strokeStyle = 'rgba(29,78,216,.5)'; ctx.stroke();
      for (let d = 0; d <= 180; d++) { const a = (up < 0 ? Math.PI : 0) + d * Math.PI / 180, L = d % 10 === 0 ? 12 : d % 5 === 0 ? 8 : 4; ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = d % 10 === 0 ? 1.2 : .6; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.lineTo(cx + Math.cos(a) * (R - L), cy + Math.sin(a) * (R - L)); ctx.stroke(); }
      ctx.restore(); });
    for (let d = 0; d <= 180; d += 10) { const a = (up < 0 ? Math.PI : 0) + d * Math.PI / 180; const v = Math.abs(90 - d); Q26.T(ctx, String(v), cx + Math.cos(a) * (R - 22), cy + Math.sin(a) * (R - 22), { s: 9.5, w: 700, c: '#1e3a8a' }); }
  },
  /* arrow object (جسم) standing on axis at (x, y0) of height h (negative h = inverted) */
  obj(ctx, x, y0, h, col = '#2563eb', o = {}) {
    K.raw(ctx, () => { ctx.save(); if (o.dash) ctx.setLineDash([5, 4]); ctx.globalAlpha = o.alpha ?? 1; ctx.strokeStyle = col; ctx.lineWidth = o.w || 5; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y0 - h + Math.sign(h) * 10); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = o.dash ? 'rgba(255,255,255,0)' : col; ctx.beginPath(); const s = Math.sign(h) || 1, tip = y0 - h; ctx.moveTo(x, tip); ctx.lineTo(x - 9, tip + s * 14); ctx.lineTo(x + 9, tip + s * 14); ctx.closePath(); if (o.dash) { ctx.lineWidth = 2; ctx.stroke(); } else ctx.fill(); ctx.restore(); });
  },
  axis(ctx, x1, x2, y, col = '#16a34a') { K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); }); },
  pt(ctx, x, y, label, col = '#1d4ed8', dy = 18) { K.raw(ctx, () => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 4.5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2; ctx.stroke(); }); if (label) Q26.T(ctx, label, x, y + dy, { s: 13, w: 900, c: col }); },
  /* coloured photo-like frame card for galleries */
  frame(ctx, x, y, w, h, title, draw, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 3; ctx.fillStyle = '#fff'; rr(ctx, x, y, w, h, 12); ctx.fill(); ctx.restore();
      ctx.save(); rr(ctx, x + 5, y + 5, w - 10, h - 30, 9); ctx.clip(); draw(ctx, x + 5, y + 5, w - 10, h - 30); ctx.restore();
      if (o.sel) { ctx.strokeStyle = o.sel; ctx.lineWidth = 3.5; rr(ctx, x, y, w, h, 12); ctx.stroke(); } });
    Q26.T(ctx, title, x + w / 2, y + h - 13, { s: o.s || 11.5, w: 900, c: o.tc || '#be185d' });
  },
  /* wavy sine wave of wavelength lam px from x1 to x2 at y */
  wave(ctx, x1, x2, y, lam, A, col, ph = 0, w = 2.5) { K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); for (let x = x1; x <= x2; x += 2) { const yy = y - A * Math.sin(TAU * (x - x1) / lam - ph); x === x1 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); }); },
  /* spectrum colours of the book (7) */
  COL7: [['أحمر', 680], ['برتقالي', 610], ['أصفر', 580], ['أخضر', 530], ['أزرق', 470], ['نيلي', 445], ['بنفسجي', 410]],
  nGlass(nm) { return 1.5046 + 4200 / (nm * nm); },
  nWater(nm) { return 1.3199 + 3400 / (nm * nm); },
  verdict(ctx, x, y, ok, t) { Q26.T(ctx, (ok ? '✔ ' : '✘ ') + t, x, y, { s: 13.5, w: 900, c: '#fff', bg: ok ? '#15803d' : '#b91c1c' }); },
  /* explain helper: what you see / why / daily life */
  ex(see, why, life) { return '<b>👀 ماذا ترى؟</b> ' + see + '<br><b>💡 لماذا؟</b> ' + why + (life ? '<br><b>🏠 في حياتنا:</b> ' + life : ''); }
};

/* palm tree & street lamp & generic person (scene props) */
Q26.palm = (ctx, x, gy, H, o = {}) => {
  K.raw(ctx, () => { ctx.save(); if (o.flip) { ctx.translate(0, gy); ctx.scale(1, -1); ctx.translate(0, -gy); } ctx.globalAlpha = o.alpha ?? 1;
    const top = [x + H * .06, gy - H];
    if (o.shade) { ctx.fillStyle = o.shade; }
    const tw = H * .045; ctx.beginPath(); ctx.moveTo(x - tw, gy); ctx.quadraticCurveTo(x + H * .02, gy - H * .5, top[0] - tw * .6, top[1]); ctx.lineTo(top[0] + tw * .6, top[1]); ctx.quadraticCurveTo(x + H * .06, gy - H * .5, x + tw, gy); ctx.closePath();
    if (!o.shade) { const g = ctx.createLinearGradient(x - tw, 0, x + tw, 0); g.addColorStop(0, '#78350f'); g.addColorStop(.5, '#b45309'); g.addColorStop(1, '#6b3a12'); ctx.fillStyle = g; } ctx.fill();
    if (!o.shade) { ctx.strokeStyle = 'rgba(69,26,3,.5)'; ctx.lineWidth = 1; for (let k = 1; k < 12; k++) { const f = k / 12, yy = gy - H * f, xx = x + (top[0] - x) * f * f; ctx.beginPath(); ctx.moveTo(xx - tw * (1 - f * .4), yy); ctx.lineTo(xx + tw * (1 - f * .4), yy - 3); ctx.stroke(); } }
    for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * .38 + (k % 2 ? .05 : -.05), L = H * (.32 + (k % 3) * .04), ex = top[0] + Math.cos(a) * L, ey = top[1] + Math.sin(a) * L * .6 + L * .45 * Math.abs(Math.cos(a));
      ctx.strokeStyle = o.shade || (k % 2 ? '#15803d' : '#166534'); ctx.lineWidth = H * .028; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.quadraticCurveTo(top[0] + Math.cos(a) * L * .6, top[1] + Math.sin(a) * L * .6 - L * .12, ex, ey); ctx.stroke();
      ctx.lineWidth = 1.4; for (let j = 1; j < 8; j++) { const f = j / 8, px = top[0] + (ex - top[0]) * f, py = top[1] + (ey - top[1]) * f - Math.sin(f * Math.PI) * L * .12; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(a + 1.2) * L * .14, py + Math.sin(a + 1.2) * L * .14 + 4); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(a - 1.2) * L * .14, py + Math.sin(a - 1.2) * L * .14 + 4); ctx.stroke(); } }
    if (!o.shade) { ctx.fillStyle = '#92400e'; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(top[0] - 8 + k * 4, top[1] + 8 + (k % 2) * 3, 4, 0, TAU); ctx.fill(); } }
    ctx.restore(); });
};
Q26.streetLamp = (ctx, x, gy, H, on = true) => {
  K.raw(ctx, () => { const g = ctx.createLinearGradient(x - 5, 0, x + 5, 0); g.addColorStop(0, '#374151'); g.addColorStop(.5, '#9ca3af'); g.addColorStop(1, '#1f2937'); ctx.fillStyle = g; ctx.fillRect(x - 4, gy - H, 8, H); ctx.fillRect(x - 10, gy - 8, 20, 8);
    ctx.fillStyle = '#1f2937'; rr(ctx, x - 16, gy - H - 10, 32, 12, 4); ctx.fill(); });
  Q26.bulb(ctx, x, gy - H + 8, 7, on, { cap: false });
};
Q26.person = (ctx, x, gy, s, o = {}) => { // standing person, feet at gy; s=1 ≈ 175 px tall
  if (typeof Q23 !== 'undefined' && Q23.man) return Q23.man(ctx, Object.assign({ hip: [x, gy - 96 * s], dir: o.dir || 1, s, feet: [[x + 6 * s * (o.dir || 1), gy], [x - 5 * s * (o.dir || 1), gy]] }, o));
  K.raw(ctx, () => { ctx.fillStyle = o.shirt || '#2563eb'; rr(ctx, x - 12 * s, gy - 150 * s, 24 * s, 60 * s, 6); ctx.fill(); ctx.fillStyle = '#1e3a8a'; ctx.fillRect(x - 10 * s, gy - 92 * s, 20 * s, 92 * s); ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(x, gy - 162 * s, 12 * s, 0, TAU); ctx.fill(); });
};
/* shadow geometry of a ball (radius b at B) lit by a disc source (radius a at P) on a line x = X : top/bottom y of umbra & penumbra (canvas y) */
Q26.shade = (P, a, B, b, X) => {
  const st = [P[0], P[1] - a], sb = [P[0], P[1] + a], bt = [B[0], B[1] - b], bb = [B[0], B[1] + b];
  const uT = Q26.lineX(st, bt, X), uB = Q26.lineX(sb, bb, X), pT = Q26.lineX(sb, bt, X), pB = Q26.lineX(st, bb, X);
  const L = a > b ? (B[0] - P[0]) * b / (a - b) : 1e9; // umbra cone length behind the ball
  return { uT, uB, pT, pB, um: uB > uT, apex: [B[0] + L, B[1] + (B[1] - P[1]) * L / ((B[0] - P[0]) || 1)], st, sb, bt, bb };
};

/* =========================================================================================
   A1) نشاط استهلالي (ص 70): تكوّن الظل وشبه الظل — كرة معتمة، مصدر نقطي، مصباح اعتيادي، الشمس، شاشة
   ========================================================================================= */
(() => {
  const SRC = { point: 'مصدر ضوئي نقطي', lamp: 'مصباح كهربائي اعتيادي', sun: 'ضوء الشمس' };
  const D = { id: 'g8_sh_lab', page: 70, fig: 'نشاط استهلالي ص 70',
    desc: 'نضع جسماً معتماً (كرة) بين مصدر ضوئي وحاجز (شاشة)، ونغيّر نوع المصدر وبعده لنتعرف على الظل التام وشبه الظل.',
    tags: 'ظل شبه ظل ظل تام مصدر نقطي مصباح كرة معتمة شاشة نشاط استهلالي',
    tools: ['جسم معتم (كرة)', 'مصباح كهربائي اعتيادي', 'حاجز (شاشة)', 'مصدر ضوئي نقطي'],
    steps: ['ضع الجسم المعتم (الكرة) بين المصدر الضوئي النقطي والحاجز. ماذا تلاحظ على الشاشة؟', 'أبعد المصدر الضوئي عن الجسم المعتم ثم قرّبه منه (اسحب المصدر). ماذا تلاحظ؟', 'استبدل المصدر النقطي بمصباح ضوئي اعتيادي أو ضوء الشمس (من «المصدر»). ماذا تلاحظ؟', 'ماذا تسمي المنطقة المظلمة تماماً المتكونة للجسم المعتم (الكرة)؟', 'علامَ يعتمد مساحة الظل المتكون؟ (حرّك الكرة والشاشة وغيّر حجم المصباح، وسجّل القياسات)', 'ماذا تسمي المنطقة التي تزداد فيها شدة الاستضاءة تدريجياً كلما ابتعدنا عن منطقة الظل؟'],
    concl: ['المصدر النقطي يكوّن ظلاً تاماً فقط حدوده حادة.', 'المصباح الاعتيادي (مصدر واسع) يكوّن ظلاً تاماً في الوسط يحيط به شبه ظل تزداد استضاءته تدريجياً.', 'المنطقة المظلمة تماماً تسمى الظل التام، والمنطقة المضاءة قليلاً حولها تسمى شبه الظل.', 'تعتمد مساحة الظل على بعد المصدر عن الجسم وبعد الشاشة عن الجسم وحجم المصدر والجسم.', 'تكوّن الظلال دليل على انتشار الضوء بخطوط مستقيمة.'],
    laws: ['g8_shadow', 'g8_straight'],
    controls: [SEL('src', 'المصدر', Object.entries(SRC), 'point'), R('rs', 'نصف قطر المصباح', 1, 8, 4, .5, 'cm'), R('rb', 'نصف قطر الكرة', 2, 8, 4, .5, 'cm'),
      TG('rays', 'الأشعة الحدّية (المماسّة)', true, null, 'ray'), TG('zones', 'تلوين الظل وشبه الظل', true, null, 'eye'), TG('scr', 'منظر الشاشة من الأمام', true, null, 'real'), TG('lab', 'الأسماء والقياسات', true, null, 'labels')],
    setup(S) { S.xs = 15; S.xb = 52; S.yb = 0; S.xsc = 92; S.rows = S.rows || []; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 14 : 78, x1 = w - 18, pxcm = (x1 - x0) / 100, ty = h * (ph ? .62 : .66), ay = ty - Math.min(h * .2, 26 * pxcm);
      return { w, h, ph, x0, x1, pxcm, ty, ay, X: c => x0 + c * pxcm }; },
    src(S, g) { const p = S.p.src; if (p === 'sun') return { P: [g.X(-1400), g.ay], a: 7 * g.pxcm }; return { P: [g.X(S.xs), g.ay], a: (p === 'lamp' ? S.p.rs : 0) * g.pxcm }; },
    calc(S, g) { const s = D.src(S, g), B = [g.X(S.xb), g.ay + S.yb * g.pxcm], b = S.p.rb * g.pxcm, X = g.X(S.xsc); return Object.assign(Q26.shade(s.P, s.a, B, b, X), { s, B, b, X }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, C = D.calc(S, g), X = C.X, s = Q26.sc(w, h); Q26.room(ctx, w, h, g.ty);
      const scrH = Math.min(g.ay - 50, 26 * g.pxcm), sT = g.ay - scrH, sB = g.ay + scrH;
      // light region (from source to screen)
      K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#fde047';
        if (p.src === 'sun') { ctx.fillRect(g.x0 - 20, sT, X - g.x0 + 20, sB - sT); } else { ctx.beginPath(); ctx.moveTo(C.s.P[0], C.s.P[1] - C.s.a); ctx.lineTo(X, sT); ctx.lineTo(X, sB); ctx.lineTo(C.s.P[0], C.s.P[1] + C.s.a); ctx.closePath(); ctx.fill(); }
        ctx.restore();
        if (p.zones !== false) { // penumbra then umbra behind the ball
          ctx.fillStyle = 'rgba(15,23,42,.45)'; ctx.beginPath(); ctx.moveTo(C.bt[0], C.bt[1]); ctx.lineTo(X, C.pT); ctx.lineTo(X, C.pB); ctx.lineTo(C.bb[0], C.bb[1]); ctx.closePath(); ctx.fill();
          ctx.fillStyle = 'rgba(2,6,23,.85)'; ctx.beginPath(); ctx.moveTo(C.bt[0], C.bt[1]); if (C.um) { ctx.lineTo(X, C.uT); ctx.lineTo(X, C.uB); } else ctx.lineTo(C.apex[0], C.apex[1]); ctx.lineTo(C.bb[0], C.bb[1]); ctx.closePath(); ctx.fill(); } });
      // rays
      if (p.rays !== false && p.src !== 'sun') { const L = (a, b, c) => Q26.ray(ctx, [a, [X, Q26.lineX(a, b, X)]], c, { w: 1.4, arrows: false, glow: false, alpha: .9 });
        L(C.st, C.bt, '#fde047'); L(C.sb, C.bb, '#fde047'); if (C.s.a > 1) { L(C.sb, C.bt, '#fb923c'); L(C.st, C.bb, '#fb923c'); } }
      if (p.rays !== false && p.src === 'sun') { for (let k = -3; k <= 3; k++) Q26.ray(ctx, [[g.x0, g.ay + k * scrH / 3.5], [g.x0 + 60 * s, g.ay + k * scrH / 3.5]], '#fde047', { w: 1.6, glow: false }); }
      // stands on bench
      const stand = (x, top) => K.raw(ctx, () => { ctx.fillStyle = '#52525b'; ctx.fillRect(x - 2.5, top, 5, g.ty - top); ctx.fillStyle = '#27272a'; rr(ctx, x - 18, g.ty - 6, 36, 8, 3); ctx.fill(); });
      // source
      if (p.src === 'sun') { Q26.sun(ctx, g.x0 + 16, g.ay - scrH * .9, 22 * s, S.t); Q26.T(ctx, 'أشعة الشمس', g.x0 + 60 * s, g.ay - scrH * .9, { s: 11.5, w: 800, c: '#fde047' }); }
      else { stand(C.s.P[0], C.s.P[1] + Math.max(C.s.a, 6)); if (p.src === 'point') Q26.raw(ctx, () => { const gg = ctx.createRadialGradient(C.s.P[0], C.s.P[1], 1, C.s.P[0], C.s.P[1], 26); gg.addColorStop(0, 'rgba(255,255,255,1)'); gg.addColorStop(.25, 'rgba(253,224,71,.8)'); gg.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(C.s.P[0], C.s.P[1], 26, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fde047'; ctx.lineWidth = 1.5; for (let k = 0; k < 12; k++) { const a = k * TAU / 12; ctx.beginPath(); ctx.moveTo(C.s.P[0] + Math.cos(a) * 7, C.s.P[1] + Math.sin(a) * 7); ctx.lineTo(C.s.P[0] + Math.cos(a) * 15, C.s.P[1] + Math.sin(a) * 15); ctx.stroke(); } });
        else Q26.bulb(ctx, C.s.P[0], C.s.P[1], C.s.a, true, { cap: false }); }
      // ball
      stand(C.B[0], C.B[1] + C.b); K.ball(ctx, C.B[0], C.B[1], C.b, '#ea580c');
      // screen (side view board)
      K.raw(ctx, () => { ctx.fillStyle = '#e5e7eb'; ctx.fillRect(X, sT, 6, sB - sT); ctx.fillStyle = '#9ca3af'; ctx.fillRect(X + 6, sT, 3, sB - sT); }); stand(X + 4, sB);
      if (p.zones !== false) K.raw(ctx, () => { ctx.fillStyle = 'rgba(0,0,0,.5)'; const a = clamp(C.pT, sT, sB), b = clamp(C.pB, sT, sB); ctx.fillRect(X - 2, a, 4, b - a); ctx.fillStyle = '#000'; if (C.um) { const u1 = clamp(C.uT, sT, sB), u2 = clamp(C.uB, sT, sB); ctx.fillRect(X - 3, u1, 6, u2 - u1); } });
      // labels
      const fs = g.ph ? 10.5 : 12.5;
      if (p.lab !== false) { Q26.T(ctx, 'شاشة', X + 4, sT - 12, { s: fs, w: 900, c: '#fff', bg: '#475569' }); Q26.T(ctx, 'جسم معتم', C.B[0], C.B[1] - C.b - 16, { s: fs, w: 900, c: '#fff', bg: '#9a3412' });
        Q26.T(ctx, SRC[p.src], p.src === 'sun' ? g.x0 + 60 * s : C.s.P[0], (p.src === 'sun' ? g.ay - scrH * .9 + 22 : C.s.P[1] - Math.max(C.s.a, 10) - 16), { s: fs, w: 900, c: '#fff', bg: '#a16207' });
        if (p.zones !== false) { const mx = (C.B[0] + X) / 2; if (C.um) Q26.T(ctx, 'ظل تام', X - 70 * s, (C.uT + C.uB) / 2, { s: fs, w: 900, c: '#fff', bg: '#020617' }); if (C.s.a > 1) { Q26.T(ctx, 'شبه ظل', X - 70 * s, (C.pT + Math.max(C.uT, C.pT)) / 2 - 8, { s: fs - 1, w: 900, c: '#fff', bg: '#475569' }); Q26.T(ctx, 'شبه ظل', X - 70 * s, (C.pB + Math.min(C.uB, C.pB)) / 2 + 8, { s: fs - 1, w: 900, c: '#fff', bg: '#475569' }); } void mx; }
        // distances on bench
        if (p.src !== 'sun') { Q26.T(ctx, '↔ ' + Q26.r1(S.xb - S.xs) + ' cm', (C.s.P[0] + C.B[0]) / 2, g.ty + 18, { s: fs, w: 800, c: '#fff', bg: 'rgba(0,0,0,.45)' }); }
        Q26.T(ctx, '↔ ' + Q26.r1(S.xsc - S.xb) + ' cm', (C.B[0] + X) / 2, g.ty + 18, { s: fs, w: 800, c: '#fff', bg: 'rgba(0,0,0,.45)' }); }
      // screen front view (what you see on the screen)
      if (p.scr !== false) { const R0 = g.ph ? 46 : 70, bx = g.ph ? w - R0 - 14 : w - R0 - 22, by = g.ph ? g.ty + (h - g.ty) / 2 + 6 : g.ty + (h - g.ty) * .45, k = R0 / scrH;
        K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#fefce8'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.fillRect(bx - R0, by - R0, 2 * R0, 2 * R0); ctx.strokeRect(bx - R0, by - R0, 2 * R0, 2 * R0); ctx.beginPath(); ctx.rect(bx - R0, by - R0, 2 * R0, 2 * R0); ctx.clip();
          const cy = by + ((C.pT + C.pB) / 2 - g.ay) * k, rp = Math.max(1, (C.pB - C.pT) / 2 * k), ru = C.um ? Math.max(0, (C.uB - C.uT) / 2 * k) : 0;
          const gg = ctx.createRadialGradient(bx, cy, 0, bx, cy, rp); const f = clamp(ru / rp, 0, .999); gg.addColorStop(0, C.um ? '#000' : 'rgba(30,41,59,.7)'); gg.addColorStop(f, C.um ? '#000' : 'rgba(30,41,59,.7)'); gg.addColorStop(Math.min(1, f + .001), 'rgba(15,23,42,.8)'); gg.addColorStop(1, 'rgba(254,252,232,1)');
          ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(bx, cy, rp, 0, TAU); ctx.fill(); ctx.restore(); });
        Q26.T(ctx, 'ما يمكن رؤيته على الشاشة', bx, by - R0 - 11, { s: g.ph ? 10 : 11.5, w: 900, c: '#fff', bg: '#be185d' }); }
      // readings card
      if (p.lab !== false && !g.ph) { const um = C.um ? (C.uB - C.uT) / g.pxcm : 0, pw = C.s.a > 1 ? ((C.pB - C.pT) / g.pxcm - um) / 2 : 0;
        Q26.card(ctx, S, [{ t: 'قطر الظل التام = ' + Q26.r1(um) + ' cm', c: '#0f172a' }, { t: 'عرض حلقة شبه الظل = ' + Q26.r1(pw) + ' cm', c: '#475569' }, { t: C.s.a > 1 ? 'مصدر واسع ⟸ ظل تام + شبه ظل' : 'مصدر نقطي ⟸ ظل تام فقط (حدود حادة)', c: '#be185d', w: 900 }], { title: 'القياس على الشاشة', bd: '#be185d', x: 76 + 250, wd: 250, y: 44 }); }
      Q26.banner(ctx, w, 'اسحب المصدر والكرة والشاشة', '#be185d', 20);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.calc(S, g), L = [];
      if (S.p.src !== 'sun') L.push({ id: 'src', x: C.s.P[0], y: C.s.P[1], r: Math.max(26, C.s.a + 8), axis: 'x', keep: true, tip: 'اسحب المصدر لتقريبه أو إبعاده عن الكرة', idle: 'حرّك المصدر ✋', drag: (S, d) => { S.xs = clamp((d.x - g.x0) / g.pxcm, 0, S.xb - S.p.rb - 6); } });
      L.push({ id: 'ball', x: C.B[0], y: C.B[1], r: Math.max(26, C.b + 6), axis: 'xy', keep: true, tip: 'اسحب الكرة (الجسم المعتم)', drag: (S, d) => { S.xb = clamp((d.x - g.x0) / g.pxcm, (S.p.src === 'sun' ? 5 : S.xs + S.p.rb + 6), S.xsc - S.p.rb - 3); S.yb = clamp((d.y - g.ay) / g.pxcm, -8, 8); } });
      L.push({ id: 'screen', x: C.X + 4, y: g.ay, w: 40, h: 120, axis: 'x', keep: true, tip: 'اسحب الشاشة لتقريبها أو إبعادها', drag: (S, d) => { S.xsc = clamp((d.x - g.x0) / g.pxcm, S.xb + S.p.rb + 3, 100); } });
      return L; },
    meas(S) { const g = D.geo(S), C = D.calc(S, g), um = C.um ? (C.uB - C.uT) / g.pxcm : 0; return { um, pw: C.s.a > 1 ? ((C.pB - C.pT) / g.pxcm - um) / 2 : 0, pen: C.s.a > 1 }; },
    readings(S) { if (!S.W) return []; const m = D.meas(S); return [rd('المصدر', SRC[S.p.src]), rd('بعد المصدر عن الكرة', S.p.src === 'sun' ? 'بعيد جداً' : Q26.r1(S.xb - S.xs) + ' cm'), rd('بعد الشاشة عن الكرة', Q26.r1(S.xsc - S.xb) + ' cm'), rd('قطر الظل التام', Q26.r1(m.um) + ' cm'), rd('عرض شبه الظل', Q26.r1(m.pw) + ' cm')]; },
    record(S) { const m = D.meas(S); return { src: SRC[S.p.src], d1: S.p.src === 'sun' ? '∞' : +(S.xb - S.xs).toFixed(1), d2: +(S.xsc - S.xb).toFixed(1), um: +m.um.toFixed(1), pw: +m.pw.toFixed(1) }; },
    cols: [['src', 'المصدر'], ['d1', 'مصدر–كرة (cm)'], ['d2', 'كرة–شاشة (cm)'], ['um', 'قطر الظل التام (cm)'], ['pw', 'عرض شبه الظل (cm)']],
    explain(S) { const m = D.meas(S); const pt = S.p.src === 'point';
      return Q26.ex(pt ? 'على الشاشة دائرة سوداء حدودها حادة: <b>ظل تام</b> فقط.' : 'دائرة سوداء في الوسط (<b>ظل تام</b>) تحيط بها حلقة رمادية تزداد إضاءتها تدريجياً نحو الخارج (<b>شبه ظل</b>) عرضها ' + Q26.r1(m.pw) + ' cm.',
        pt ? 'كل نقطة خلف الكرة إما يصلها ضوء المصدر النقطي بخط مستقيم أو لا يصلها أبداً — فلا توجد منطقة وسطى.' : 'المصدر الواسع له نقاط كثيرة: خلف الكرة منطقة لا يصلها ضوء أي نقطة (ظل تام)، ومنطقة يصلها ضوء بعض نقاط المصدر فقط (شبه ظل). قرّب المصدر أو كبّره فيكبر شبه الظل.',
        'ظلك تحت مصباح الشارع حاد، أما ظلك تحت المصباح الكبير في الصف فأطرافه باهتة.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   A2) كيف يتكون الظل؟ (ص 73) — ظل النخلة عند سقوط ضوء الشمس + ظل الطالب تحت مصباح الشارع + مصباحان
   ========================================================================================= */
(() => {
  const SC = { palm: 'ظل النخلة وضوء الشمس (ص 73)', lamp: 'ظلك تحت مصباح الشارع', two: 'مصباحان: ظلان وظل تام' };
  const D = { id: 'g8_sh_life', page: 73, fig: 'صورة ظل الشجرة ص 73',
    desc: 'يتكون الظل عند وقوع أي جسم معتم في مسار الضوء فيحجب الضوء عن منطقة تأخذ شكل الجسم. نغيّر موضع الشمس أو المصباح ونرى كيف يتغير طول الظل واتجاهه.',
    tags: 'كيف يتكون الظل نخلة شمس مصباح شارع طول الظل خطوط مستقيمة',
    tools: ['نخلة وشمس', 'مصباح شارع', 'طالب'],
    steps: ['المشهد الأول: اسحب الشمس عبر السماء من الشروق إلى الغروب. متى يكون ظل النخلة أطول؟ ومتى يكون أقصر؟', 'لاحظ أن الظل يقع دائماً في الجهة المعاكسة للشمس، وأن الخط الواصل من الشمس إلى قمة النخلة يمر بطرف الظل (خط مستقيم).', 'المشهد الثاني: اسحب الطالب مبتعداً عن مصباح الشارع. ماذا يحدث لطول ظله؟', 'المشهد الثالث: مصباحان يضيئان الطالب: كم ظلاً يتكون؟ أين تكون المنطقة المظلمة تماماً (ظل تام) وأين شبه الظل؟'],
    concl: ['يتكون الظل عند وقوع جسم معتم في مسار الضوء، ويأخذ شكل الجسم.', 'يقع الظل في الجهة المعاكسة لمصدر الضوء، ويطول كلما انخفض المصدر (الشمس عند الشروق والغروب).', 'طرف الظل يقع على الخط المستقيم الواصل من المصدر إلى أعلى الجسم: تكوّن الظلال دليل على انتشار الضوء بخطوط مستقيمة.', 'عند وجود مصدرين: المنطقة التي لا يصلها ضوء أي منهما ظل تام، والتي يصلها ضوء أحدهما شبه ظل.'],
    laws: ['g8_shadow', 'g8_straight'],
    controls: [SEL('sc', 'المشهد', Object.entries(SC), 'palm'), TG('ray', 'الخط المستقيم من المصدر إلى أعلى الجسم', true, null, 'ray'), TG('lab', 'طول الظل والقيم', true, null, 'labels')],
    setup(S) { S.sa = 50; S.px = .45; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, gy = h * (ph ? .72 : .74), x0 = ph ? 10 : 70, s = Q26.sc(w, h); return { w, h, ph, gy, x0, s, cx: Q26.cx(w) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10.5 : 12.5;
      if (p.sc === 'palm') {
        const el = S.sa * Math.PI / 180, day = Math.sin(el); // sun elevation 5°..175° (0 = east horizon on the right)
        Q26.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 0, 0, g.gy); sk.addColorStop(0, day > .5 ? '#38bdf8' : '#fb923c'); sk.addColorStop(1, day > .5 ? '#e0f2fe' : '#fde68a'); ctx.fillStyle = sk; ctx.fillRect(0, 0, w, g.gy); const gg = ctx.createLinearGradient(0, g.gy, 0, h); gg.addColorStop(0, '#d9c08c'); gg.addColorStop(1, '#a3844f'); ctx.fillStyle = gg; ctx.fillRect(0, g.gy, w, h - g.gy); });
        const tx = g.cx, H = Math.min(g.gy * .55, 300 * g.s), R0 = Math.min(w * .42, g.gy * .85), sx = tx + Math.cos(el) * R0, sy = g.gy - Math.sin(el) * R0 * .95;
        Q26.sun(ctx, sx, sy, 24 * g.s, S.t);
        // shadow on ground: tip from tan
        const tip = [tx - H / Math.tan(el), g.gy]; const L = H / Math.tan(el);
        Q26.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(41,37,36,.55)'; ctx.beginPath(); ctx.moveTo(tx - 6, g.gy); ctx.lineTo(tip[0], g.gy + 6); ctx.lineTo(tip[0] - Math.sign(L) * 30 * g.s, g.gy + 14); ctx.lineTo(tip[0] + Math.sign(L) * 30 * g.s, g.gy + 18); ctx.lineTo(tx + 6, g.gy + 6); ctx.closePath(); ctx.fill();
          ctx.beginPath(); ctx.ellipse(tip[0] + Math.sign(L) * 22 * g.s, g.gy + 12, Math.min(Math.abs(L) * .18 + 18, 70) * g.s, 9 * g.s, 0, 0, TAU); ctx.fill(); ctx.restore(); });
        Q26.palm(ctx, tx, g.gy, H);
        if (p.ray !== false) { Q26.ray(ctx, [[sx, sy], [tx + H * .06, g.gy - H], tip], '#f59e0b', { w: 2, arrows: true, glow: false }); }
        if (p.lab !== false) { Q26.T(ctx, 'طول الظل = ' + Q26.nf(Math.abs(L) / H * 10, 3) + ' m (النخلة 10 m)', (tx + tip[0]) / 2, g.gy + 40, { s: fs + 1, w: 900, c: '#fff', bg: '#57534e' });
          Q26.T(ctx, 'ارتفاع الشمس ' + Math.round(S.sa > 90 ? 180 - S.sa : S.sa) + '°', sx, sy + 40 * g.s, { s: fs, w: 900, c: '#fff', bg: '#b45309' }); }
        S._drag = [sx, sy];
      } else {
        Q26.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 0, 0, g.gy); sk.addColorStop(0, '#0f172a'); sk.addColorStop(1, '#334155'); ctx.fillStyle = sk; ctx.fillRect(0, 0, w, g.gy); ctx.fillStyle = '#475569'; ctx.fillRect(0, g.gy, w, h - g.gy); ctx.fillStyle = 'rgba(255,255,255,.7)'; for (let k = 0; k < 30; k++) ctx.fillRect((k * 137) % w, (k * 71) % (g.gy * .5), 1.5, 1.5); });
        const pxm = Math.min((w - g.x0 - 30) / 12, g.gy / 7.5), HL = 5 * pxm, hb = 1.6 * pxm, two = p.sc === 'two';
        const L1 = g.x0 + 1.2 * pxm, L2 = L1 + 9.5 * pxm, bx = L1 + (two ? 4.75 : clamp(S.px, .05, 1) * 8.5 + .4) * pxm;
        const lamps = two ? [L1, L2] : [L1];
        // light pools
        Q26.raw(ctx, () => { lamps.forEach(lx => { const gg = ctx.createRadialGradient(lx, g.gy, 5, lx, g.gy, 6 * pxm); gg.addColorStop(0, 'rgba(253,224,71,.45)'); gg.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = gg; ctx.fillRect(lx - 6 * pxm, g.gy, 12 * pxm, h - g.gy); }); });
        // shadows: from each lamp, shadow from bx to tip
        const sh = lamps.map(lx => { const L = hb * (bx - lx) / (HL - hb); return [bx, bx + L]; });
        Q26.raw(ctx, () => { sh.forEach(q => { ctx.fillStyle = two ? 'rgba(2,6,23,.45)' : 'rgba(2,6,23,.75)'; const a = Math.min(q[0], q[1]), b = Math.max(q[0], q[1]); rr(ctx, a, g.gy + 2, b - a, 10, 5); ctx.fill(); }); });
        lamps.forEach(lx => Q26.streetLamp(ctx, lx, g.gy, HL, true));
        Q26.person(ctx, bx, g.gy, hb / 175, { dir: 1, shirt: '#0ea5e9', pants: '#1e3a8a' });
        if (p.ray !== false) lamps.forEach((lx, i) => Q26.ray(ctx, [[lx, g.gy - HL + 8], [bx, g.gy - hb], [bx + hb * (bx - lx) / (HL - hb), g.gy]], '#fde047', { w: 1.8, glow: false }));
        if (p.lab !== false) { if (!two) Q26.T(ctx, 'طول الظل = ' + Q26.nf(Math.abs(sh[0][1] - sh[0][0]) / pxm, 3) + ' m ، بعدك عن المصباح ' + Q26.nf((bx - L1) / pxm, 2) + ' m', g.cx, g.gy + 46, { s: fs + 1, w: 900, c: '#fff', bg: '#334155' });
          else { Q26.T(ctx, 'شبه ظل (يصله ضوء المصباح الأيسر فقط)', sh[0][1] - 20, g.gy + 34, { s: fs, w: 800, c: '#fff', bg: '#475569' }); Q26.T(ctx, 'شبه ظل (يصله ضوء الأيمن فقط)', sh[1][1] + 20, g.gy + 60, { s: fs, w: 800, c: '#fff', bg: '#475569' }); Q26.T(ctx, 'مصباح 5 m', L1, g.gy - HL - 22, { s: fs, w: 800, c: '#fde047' }); } }
        S._drag = [bx, g.gy - hb * .5];
      }
      Q26.banner(ctx, w, p.sc === 'palm' ? 'اسحب الشمس عبر السماء' : p.sc === 'lamp' ? 'اسحب الطالب لتبتعد عن المصباح' : 'مصباحان ⟸ ظلان', '#be185d', 20);
    },
    drags(S) { if (!S.W || !S._drag || S.p.sc === 'two') return []; const g = D.geo(S);
      if (S.p.sc === 'palm') { const tx = g.cx; return [{ id: 'sun', x: S._drag[0], y: S._drag[1], r: 34, cx: tx, cy: g.gy, keep: true, tip: 'اسحب الشمس عبر السماء', idle: 'حرّك الشمس ✋', drag: (S, d) => { const a = Math.atan2(g.gy - d.y, d.x - tx) * 180 / Math.PI; S.sa = clamp(a, 12, 168); } }]; }
      const pxm = Math.min((S.W - g.x0 - 30) / 12, g.gy / 7.5); return [{ id: 'kid', x: S._drag[0], y: S._drag[1], w: 50, h: 120, axis: 'x', keep: true, tip: 'اسحب الطالب', idle: 'حرّكني ✋', drag: (S, d) => { S.px = clamp((d.x - g.x0 - 1.6 * pxm) / (8.5 * pxm), .05, 1); } }]; },
    readings(S) { if (S.p.sc === 'palm') { const L = 10 / Math.tan(S.sa * Math.PI / 180); return [rd('ارتفاع الشمس', Math.round(S.sa > 90 ? 180 - S.sa : S.sa) + '°'), rd('طول ظل النخلة (10 m)', Q26.nf(Math.abs(L), 3) + ' m'), rd('اتجاه الظل', L > 0 ? 'نحو اليسار (الشمس يميناً)' : 'نحو اليمين (الشمس يساراً)')]; } return []; },
    explain(S) { const p = S.p.sc;
      if (p === 'palm') { const lo = S.sa < 30 || S.sa > 150; return Q26.ex(lo ? 'الشمس منخفضة فالظل <b>طويل</b> جداً.' : 'الشمس مرتفعة فالظل <b>قصير</b>.', 'النخلة جسم معتم يحجب أشعة الشمس، والأشعة تسير بخطوط مستقيمة: الخط المستقيم من الشمس يمر بقمة النخلة ثم يصل إلى طرف الظل.', 'عند الظهيرة في الصيف تكون الظلال قصيرة جداً، وعند العصر نحتمي بظل الجدران الطويل.'); }
      if (p === 'lamp') return Q26.ex('كلما ابتعدت عن المصباح <b>طال ظلك</b>.', 'الشعاع المار بقمة رأسك يصبح أكثر ميلاً كلما ابتعدت، فيصل الأرض بعيداً عنك.', 'في الليل يطول ظلك ويقصر وأنت تمشي بين مصابيح الشارع.');
      return Q26.ex('يتكون <b>ظلان</b>، أحدهما من كل مصباح.', 'كل مصباح يرسل أشعة مستقيمة يحجبها جسمك. المكان الذي لا يصله ضوء أي من المصباحين يكون مظلماً تماماً (ظل تام)، والذي يصله ضوء أحدهما شبه ظل.', 'في ملعب كرة القدم ليلاً ترى لكل لاعب عدة ظلال من الأضواء الكاشفة.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   A3) كسوف الشمس وخسوف القمر (ص 73–74، الشكل 6 والشكل 7) — مقارنة
   ========================================================================================= */
(() => {
  const FL = .3; // orbit drawn as ellipse (seen slightly from above)
  const D = { id: 'g8_eclipse', page: 73, fig: 'الشكل 6، الشكل 7',
    desc: 'ظاهرتان طبيعيتان تحدثان نتيجة تكوّن الظلال: كسوف الشمس (القمر بين الشمس والأرض) وخسوف القمر (الأرض بين الشمس والقمر). نحرّك القمر في مداره ونقارن بينهما.',
    tags: 'كسوف الشمس خسوف القمر ظل تام شبه ظل محاق بدر كسوف حلقي كلي جزئي',
    tools: ['الشمس', 'الأرض', 'القمر'],
    steps: ['اسحب القمر في مداره حول الأرض حتى يقع بين الشمس والأرض (أو اضغط «كسوف الشمس»): القمر في طور المحاق.', 'لاحظ ظل القمر وشبه ظله يسقطان على الأرض: من يقع في الظل التام يرى كسوفاً كلياً، ومن يقع في شبه الظل يرى كسوفاً جزئياً.', 'زد بعد القمر عن الأرض: لا يصل ظله التام إلى الأرض فنرى كسوفاً حلقياً (كالصورة في ص 73).', 'اسحب القمر إلى الجهة الأخرى حتى تقع الأرض بين الشمس والقمر (اضغط «خسوف القمر»): القمر بدر.', 'لاحظ القمر في الظل التام للأرض (خسوف كلي — يبدو أحمر داكناً) أو جزء منه في شبه الظل (خسوف جزئي).', 'قارن بين الظاهرتين في البطاقة.'],
    concl: ['كسوف الشمس: يقع القمر بين الشمس والأرض على استقامة واحدة (القمر محاق) فيسقط ظل القمر وشبه ظله على الأرض ويحجب ضوء الشمس عن جزء منها.', 'يكون الكسوف كلياً لمن في منطقة الظل التام وجزئياً لمن في شبه الظل، ويستغرق أكثر من 7.5 دقيقة بسبب صغر ظل القمر على الأرض.', 'خسوف القمر: تقع الأرض بين الشمس والقمر (القمر بدر) فيسقط ظل الأرض على القمر.', 'يكون الخسوف كلياً إذا وقع القمر كله في الظل التام، وجزئياً إذا كان جزء منه في شبه الظل، ويستمر من نصف ساعة إلى ساعتين ويحدث مرة أو مرتين كل سنة.'],
    laws: ['g8_shadow'],
    controls: [R('orb', 'بعد القمر عن الأرض (نسبي)', 1, 1.3, 1, .05, ''), BT('', [{ t: '🌑 كسوف الشمس', on: S => { S.th = Math.PI; S.auto = 0; } }, { t: '🌕 خسوف القمر', on: S => { S.th = 0; S.auto = 0; } }, { t: '▶/⏸ حرّك القمر', on: S => { S.auto = !S.auto; } }]),
      TG('cones', 'الظل التام وشبه الظل', true, null, 'eye'), TG('rays', 'الأشعة المماسّة', true, null, 'ray'), TG('view', 'ما يراه الناظر من الأرض', true, null, 'real'), TG('cmp', 'بطاقة المقارنة', true, null, 'labels')],
    setup(S) { S.th = Math.PI * .93; S.auto = 0; },
    update(S, dt) { if (S.auto) S.th = (S.th + dt * .35) % TAU; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 72, yc = h * (ph ? .4 : .42), Rs = clamp(Math.min(h * .12, w * .1), 30, 90), Re = Rs * .5, orb0 = 2.3 * Re, xS = x0 + Rs * .9, xE = w - (ph ? 10 : 24) - orb0 * 1.35, orb = orb0 * S.p.orb;
      const d0 = xE - orb0 - xS, k = 1.25 * (orb0 - Re), Rm = k * Rs / (d0 + k);
      const M = [xE + Math.cos(S.th) * orb, yc + Math.sin(S.th) * orb * FL];
      return { w, h, ph, x0, yc, Rs, Re, Rm, xS, xE, orb, M, Sc: [xS, yc], Ec: [xE, yc] }; },
    cone(Sc, Rs, Pc, r, Lp) { const u = Q26.nrm([Pc[0] - Sc[0], Pc[1] - Sc[1]]), v = [-u[1], u[0]], dist = Math.hypot(Pc[0] - Sc[0], Pc[1] - Sc[1]);
      const P1 = [Pc[0] + v[0] * r, Pc[1] + v[1] * r], P2 = [Pc[0] - v[0] * r, Pc[1] - v[1] * r], S1 = [Sc[0] + v[0] * Rs, Sc[1] + v[1] * Rs], S2 = [Sc[0] - v[0] * Rs, Sc[1] - v[1] * Rs];
      const L = dist * r / (Rs - r), apex = [Pc[0] + u[0] * L, Pc[1] + u[1] * L];
      const e1 = Q26.nrm([P1[0] - S2[0], P1[1] - S2[1]]), e2 = Q26.nrm([P2[0] - S1[0], P2[1] - S1[1]]);
      return { u, v, P1, P2, S1, S2, L, apex, pen: [P1, [P1[0] + e1[0] * Lp, P1[1] + e1[1] * Lp], [P2[0] + e2[0] * Lp, P2[1] + e2[1] * Lp], P2], dist,
        /* half widths at distance s behind P */ hw: s => ({ u: r * (1 - s / L), p: r + s * (Rs + r) / dist }) }; },
    state(S, g) { const solar = Math.cos(S.th) < 0;
      if (solar) { // observer on Earth facing the sun
        const u = Q26.nrm([g.Sc[0] - g.Ec[0], g.Sc[1] - g.Ec[1]]), O = [g.Ec[0] + u[0] * g.Re, g.Ec[1] + u[1] * g.Re];
        const ds = Math.hypot(g.Sc[0] - O[0], g.Sc[1] - O[1]), dm = Math.hypot(g.M[0] - O[0], g.M[1] - O[1]), as = g.Rs / ds, am = g.Rm / dm;
        const a1 = Math.atan2(g.Sc[1] - O[1], g.Sc[0] - O[0]), a2 = Math.atan2(g.M[1] - O[1], g.M[0] - O[0]); let dl = a2 - a1; while (dl > Math.PI) dl -= TAU; while (dl < -Math.PI) dl += TAU;
        const sep = Math.abs(dl); let kind = 'none'; if (sep < as + am) kind = (sep <= am - as) ? 'total' : (sep <= as - am) ? 'annular' : 'partial';
        // overlap fraction of the sun disc
        const r1 = as, r2 = am, d = sep; let ov = 0; if (d >= r1 + r2) ov = 0; else if (d <= Math.abs(r1 - r2)) ov = Math.min(r1, r2) ** 2 / (r1 * r1); else { const A = r1 * r1 * Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1)) + r2 * r2 * Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2)) - .5 * Math.sqrt((-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2)); ov = A / (Math.PI * r1 * r1); }
        return { solar, kind, as, am, dl, ov };
      }
      const C = D.cone(g.Sc, g.Rs, g.Ec, g.Re, 10), rel = [g.M[0] - g.Ec[0], g.M[1] - g.Ec[1]], s = Q26.dot(rel, C.u), off = rel[0] * C.v[0] + rel[1] * C.v[1], hw = C.hw(s);
      let kind = 'none'; if (s > 0) { if (Math.abs(off) + g.Rm <= hw.u) kind = 'total'; else if (Math.abs(off) - g.Rm < hw.u) kind = 'partial'; else if (Math.abs(off) - g.Rm < hw.p) kind = 'pen'; }
      return { solar, kind, off, hw, s };
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, st = D.state(S, g), fs = g.ph ? 10 : 12;
      G.bg(ctx, w, h, false); Q26.raw(ctx, () => { ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = 'rgba(255,255,255,.75)'; for (let k = 0; k < 70; k++) { const x = (k * 157.3) % w, y = (k * 83.7) % h; ctx.fillRect(x, y, k % 5 ? 1 : 2, k % 5 ? 1 : 2); } });
      // sunlight region
      Q26.raw(ctx, () => { ctx.save(); ctx.globalAlpha = .13; ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.moveTo(g.xS, g.yc - g.Rs); ctx.lineTo(w, g.yc - g.Rs * 1.6); ctx.lineTo(w, g.yc + g.Rs * 1.6); ctx.lineTo(g.xS, g.yc + g.Rs); ctx.closePath(); ctx.fill(); ctx.restore(); });
      // orbit (back half)
      const orbit = (front) => Q26.raw(ctx, () => { ctx.save(); ctx.strokeStyle = 'rgba(148,163,184,.55)'; ctx.setLineDash([4, 5]); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(g.xE, g.yc, g.orb, g.orb * FL, 0, front ? 0 : Math.PI, front ? Math.PI : TAU); ctx.stroke(); ctx.restore(); });
      orbit(false);
      Q26.sun(ctx, g.xS, g.yc, g.Rs, S.t, { halo: 1.3 });
      const moonBehind = Math.sin(S.th) < 0;
      const drawMoon = () => { const red = !st.solar && (st.kind === 'total'); Q26.raw(ctx, () => { const M = g.M, gg = ctx.createRadialGradient(M[0] - g.Rm * .4, M[1] - g.Rm * .4, 1, M[0], M[1], g.Rm); gg.addColorStop(0, red ? '#fca5a5' : '#f8fafc'); gg.addColorStop(1, red ? '#7f1d1d' : '#94a3b8'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(M[0], M[1], g.Rm, 0, TAU); ctx.fill();
        // night half (away from sun)
        const a = Math.atan2(M[1] - g.yc, M[0] - g.xS); ctx.fillStyle = 'rgba(2,6,23,.55)'; ctx.beginPath(); ctx.arc(M[0], M[1], g.Rm, a - Math.PI / 2, a + Math.PI / 2); ctx.closePath(); ctx.fill(); }); };
      const drawEarth = () => Q26.raw(ctx, () => { const E = g.Ec, gg = ctx.createRadialGradient(E[0] - g.Re * .4, E[1] - g.Re * .4, 2, E[0], E[1], g.Re); gg.addColorStop(0, '#93c5fd'); gg.addColorStop(.7, '#1d4ed8'); gg.addColorStop(1, '#1e3a8a'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(E[0], E[1], g.Re, 0, TAU); ctx.fill();
        ctx.save(); ctx.clip(); ctx.fillStyle = '#16a34a'; [[-.3, -.4, .35, .22], [.25, .1, .3, .4], [-.4, .35, .25, .18]].forEach(c => { ctx.beginPath(); ctx.ellipse(E[0] + c[0] * g.Re, E[1] + c[1] * g.Re, c[2] * g.Re, c[3] * g.Re, .5, 0, TAU); ctx.fill(); }); ctx.fillStyle = 'rgba(2,6,23,.6)'; ctx.fillRect(E[0], E[1] - g.Re, g.Re, 2 * g.Re); ctx.restore(); });
      if (moonBehind) drawMoon();
      drawEarth();
      // shadows
      if (p.cones !== false) {
        const CE = D.cone(g.Sc, g.Rs, g.Ec, g.Re, w);
        Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.22)'; ctx.beginPath(); CE.pen.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(15,23,42,.8)'; ctx.beginPath(); ctx.moveTo(CE.P1[0], CE.P1[1]); ctx.lineTo(CE.apex[0], CE.apex[1]); ctx.lineTo(CE.P2[0], CE.P2[1]); ctx.closePath(); ctx.fill(); });
        if (st.solar) { const CM = D.cone(g.Sc, g.Rs, g.M, g.Rm, g.orb * 1.6);
          Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.4)'; ctx.beginPath(); CM.pen.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(2,6,23,.92)'; ctx.beginPath(); ctx.moveTo(CM.P1[0], CM.P1[1]); ctx.lineTo(CM.apex[0], CM.apex[1]); ctx.lineTo(CM.P2[0], CM.P2[1]); ctx.closePath(); ctx.fill(); });
          if (p.rays !== false) { Q26.ray(ctx, [CM.S1, CM.P1, [CM.P1[0] + (CM.P1[0] - CM.S1[0]) * .25, CM.P1[1] + (CM.P1[1] - CM.S1[1]) * .25]], '#fde047', { w: 1.2, glow: false, at: .5 }); Q26.ray(ctx, [CM.S2, CM.P2, [CM.P2[0] + (CM.P2[0] - CM.S2[0]) * .25, CM.P2[1] + (CM.P2[1] - CM.S2[1]) * .25]], '#fde047', { w: 1.2, glow: false });
            Q26.ray(ctx, [CM.S2, CM.P1], '#fb923c', { w: 1, glow: false, arrows: false }); Q26.ray(ctx, [CM.S1, CM.P2], '#fb923c', { w: 1, glow: false, arrows: false }); }
        } else if (p.rays !== false) { Q26.ray(ctx, [CE.S1, CE.P1], '#fde047', { w: 1.2, glow: false }); Q26.ray(ctx, [CE.S2, CE.P2], '#fde047', { w: 1.2, glow: false }); }
      }
      if (!moonBehind) drawMoon();
      orbit(true);
      if (!st.solar && p.cones !== false && st.kind !== 'none') Q26.raw(ctx, () => { const CE = D.cone(g.Sc, g.Rs, g.Ec, g.Re, w); ctx.save(); ctx.beginPath(); ctx.arc(g.M[0], g.M[1], g.Rm, 0, TAU); ctx.clip(); ctx.fillStyle = st.kind === 'pen' ? 'rgba(15,23,42,.3)' : 'rgba(127,29,29,.75)'; ctx.beginPath(); ctx.moveTo(CE.P1[0], CE.P1[1]); ctx.lineTo(CE.apex[0], CE.apex[1]); ctx.lineTo(CE.P2[0], CE.P2[1]); ctx.closePath(); ctx.fill(); ctx.restore(); });
      Q26.T(ctx, 'الشمس', g.xS, g.yc, { s: fs + 2, w: 900, c: '#7c2d12' }); Q26.T(ctx, 'الأرض', g.xE, g.yc + g.Re + 14, { s: fs, w: 900, c: '#bfdbfe' }); Q26.T(ctx, 'القمر', g.M[0], g.M[1] - g.Rm - 12, { s: fs, w: 900, c: '#e2e8f0' });
      if (p.cones !== false && !g.ph) { if (st.solar) { Q26.T(ctx, 'ظل تام', g.xE - g.Re - 6, g.yc - 26, { s: 10.5, w: 800, c: '#e2e8f0', bg: 'rgba(2,6,23,.7)' }); } else { Q26.T(ctx, 'ظل تام', g.xE + g.Re + 50, g.yc - (g.ph ? 0 : 50), { s: 10.5, w: 800, c: '#e2e8f0', bg: 'rgba(2,6,23,.7)' }); Q26.T(ctx, 'شبه ظل', g.xE + g.Re + 50, g.yc + 70, { s: 10.5, w: 800, c: '#e2e8f0', bg: 'rgba(71,85,105,.7)' }); } }
      // result badge
      const NAME = st.solar ? { total: 'كسوف كلي للشمس', annular: 'كسوف حلقي للشمس', partial: 'كسوف جزئي للشمس', none: 'لا كسوف' } : { total: 'خسوف كلي للقمر', partial: 'خسوف جزئي للقمر', pen: 'القمر في شبه الظل', none: 'لا خسوف' };
      Q26.T(ctx, NAME[st.kind], g.ph ? Q26.cx(w) : Math.max(g.xS, g.x0 + 90), g.ph ? 44 : g.yc + g.Rs + 34, { s: g.ph ? 13 : 16, w: 900, c: '#fff', bg: st.kind === 'none' ? '#475569' : st.solar ? '#b45309' : '#9f1239' });
      // observer view inset
      if (p.view !== false) { const R0 = g.ph ? 30 : 46, bx = g.ph ? w - R0 - 14 : g.x0 + R0 + 20, by = h - R0 - (g.ph ? 70 : 96);
        Q26.raw(ctx, () => { ctx.save(); const sky = st.solar ? (st.ov > .9 ? '#0f172a' : st.ov > .5 ? '#1e3a8a' : '#38bdf8') : '#020617'; ctx.fillStyle = sky; rr(ctx, bx - R0 * 1.8, by - R0 * 1.6, R0 * 3.6, R0 * 3.2, 10); ctx.fill(); ctx.clip();
          if (st.solar) { const k = R0 * .75 / st.as; if (st.kind === 'total') { ctx.fillStyle = 'rgba(254,249,195,.55)'; ctx.beginPath(); ctx.arc(bx, by, R0 * 1.25, 0, TAU); ctx.fill(); } ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(bx, by, R0 * .75, 0, TAU); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(bx - st.dl * k, by, st.am * k, 0, TAU); ctx.fill(); }
          else { const k = R0 * .75 / g.Rm; ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(bx, by, R0 * .75, 0, TAU); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(bx, by, R0 * .75, 0, TAU); ctx.clip(); if (st.kind !== 'none') { ctx.fillStyle = 'rgba(71,85,105,.5)'; ctx.beginPath(); ctx.arc(bx - st.off * k, by, st.hw.p * k, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(127,29,29,.9)'; ctx.beginPath(); ctx.arc(bx - st.off * k, by, Math.max(0, st.hw.u) * k, 0, TAU); ctx.fill(); } ctx.restore(); }
          ctx.restore(); });
        Q26.T(ctx, st.solar ? 'ما يراه الناظر في منطقة الظل' : 'القمر كما نراه من الأرض', bx, by - R0 * 1.6 - 11, { s: 10.5, w: 900, c: '#fff', bg: '#be185d' }); }
      // comparison card
      if (p.cmp !== false && !g.ph) { const L = [{ t: 'كسوف الشمس: الشمس ← القمر ← الأرض (القمر محاق)', c: st.solar ? '#b45309' : '#64748b', w: st.solar ? 900 : 600 }, { t: 'ظل القمر يسقط على الأرض ، أكثر من 7.5 دقيقة', c: st.solar ? '#b45309' : '#64748b', s: 11.5 }, { t: 'خسوف القمر: الشمس ← الأرض ← القمر (القمر بدر)', c: !st.solar ? '#9f1239' : '#64748b', w: !st.solar ? 900 : 600 }, { t: 'ظل الأرض يسقط على القمر ، نصف ساعة إلى ساعتين', c: !st.solar ? '#9f1239' : '#64748b', s: 11.5 }];
        Q26.card(ctx, S, L, { title: 'المقارنة', bd: '#be185d', y: 70, wd: 340 }); }
      Q26.banner(ctx, w, 'اسحب القمر في مداره حول الأرض', '#be185d', 20);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'moon', x: g.M[0], y: g.M[1], r: Math.max(24, g.Rm + 12), cx: g.xE, cy: g.yc, keep: true, tip: 'اسحب القمر في مداره', idle: 'حرّك القمر ✋', down: S => { S.auto = 0; }, drag: (S, d) => { S.th = Math.atan2((d.y - g.yc) / FL, d.x - g.xE); if (S.th < 0) S.th += TAU; } }]; },
    readings(S) { if (!S.W) return []; const g = D.geo(S), st = D.state(S, g); const N = { total: 'كلي', annular: 'حلقي', partial: 'جزئي', pen: 'شبه ظلي', none: '—' };
      return [rd('الظاهرة', st.solar ? 'كسوف الشمس' : 'خسوف القمر'), rd('النوع', N[st.kind]), rd('طور القمر', Math.cos(S.th) < -.9 ? 'محاق' : Math.cos(S.th) > .9 ? 'بدر' : 'بين المحاق والبدر')].concat(st.solar ? [rd('نسبة قرص الشمس المحجوب', Math.round(st.ov * 100) + ' %')] : []); },
    explain(S) { if (!S.W) return ''; const g = D.geo(S), st = D.state(S, g);
      if (st.solar) return Q26.ex(st.kind === 'total' ? 'القمر يغطي قرص الشمس كله لمن يقف في منطقة الظل التام: <b>كسوف كلي</b>، والسماء مظلمة نهاراً.' : st.kind === 'annular' ? 'القمر أبعد من المعتاد فيبدو أصغر من الشمس، فتظهر حلقة مضيئة حوله: <b>كسوف حلقي</b>.' : st.kind === 'partial' ? 'القمر يغطي جزءاً من الشمس: <b>كسوف جزئي</b> (منطقة شبه الظل).' : 'القمر ليس على استقامة الشمس والأرض فلا يحدث كسوف.',
        'القمر جسم معتم يقع بين الشمس والأرض فيحجب ضوء الشمس، وظله صغير فلا يغطي إلا جزءاً صغيراً من سطح الأرض.', 'لا تنظر إلى الشمس مباشرة أثناء الكسوف، استعمل نظارات خاصة.');
      return Q26.ex(st.kind === 'total' ? 'القمر كله داخل الظل التام للأرض: <b>خسوف كلي</b>، ويبدو أحمر داكناً.' : st.kind === 'partial' ? 'جزء من القمر في الظل التام والباقي في شبه الظل: <b>خسوف جزئي</b>.' : st.kind === 'pen' ? 'القمر في شبه الظل فقط فيخفت ضوؤه قليلاً.' : 'القمر خارج ظل الأرض فلا خسوف.',
        'الأرض تقع بين الشمس والقمر فتحجب ضوء الشمس عن القمر، وظل الأرض كبير لذلك يستمر الخسوف وقتاً أطول من الكسوف.', 'يمكن رؤية خسوف القمر بالعين المجردة دون خطر، ويراه كل من في الجهة الليلية من الأرض.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

M8.merge({ id: 'g8_shadows', ch: 26, sec: 'نشاط استهلالي + الدرس 1: كيف يتكون الظل', page: 70, kind: 'نشاط استهلالي', fig: 'نشاط استهلالي، الشكل 6، الشكل 7',
  title: 'الظل وشبه الظل، وكسوف الشمس وخسوف القمر',
  desc: 'تجربة بثلاثة أجزاء: (1) النشاط الاستهلالي: تكوّن الظل وشبه الظل بمصدر نقطي ومصباح اعتيادي وضوء الشمس، (2) كيف يتكون الظل: ظل النخلة ومصباح الشارع، (3) مقارنة بين كسوف الشمس وخسوف القمر.',
  tags: 'ظل شبه ظل كسوف خسوف',
  fact: ['تكوّن الظلال دليل على انتشار الضوء بخطوط مستقيمة (ص 73).', 'يستغرق كسوف الشمس أكثر من 7.5 دقيقة، أما خسوف القمر فيستمر من نصف ساعة إلى ساعتين ويحدث مرة أو مرتين كل سنة (ص 74).', 'في الكسوف الحلقي يكون القمر بعيداً عن الأرض فيبدو أصغر من الشمس، فتظهر حلقة من نار حوله.'],
  quiz: [
    { q: 'ميّز بين منطقتي الظل التام وشبه الظل:', o: ['الظل التام مضاء قليلاً وشبه الظل مظلم تماماً', 'الظل التام مظلم تماماً، وشبه الظل مضاء قليلاً تزداد استضاءته تدريجياً', 'لا فرق بينهما'], a: 1, why: 'مراجعة الدرس س2 (ص 74).' },
    { q: 'تحدث ظاهرة ......... عند سقوط ظل القمر على الأرض وانحجاب جزء من ضوء الشمس أو كله عن جزء من سطح الأرض.', o: ['خسوف القمر', 'كسوف الشمس', 'انكسار الضوء'], a: 1, why: 'مراجعة الفصل س1-3 (ص 87).' },
    { q: 'ما خاصية الضوء التي تستدل عليها عند تكوّن الظل؟', o: ['انتشار الضوء بخطوط مستقيمة', 'انعكاس الضوء', 'تحلل الضوء'], a: 0, why: 'التفكير الناقد س2 (ص 74).' }],
  parts: [{ id: 'g8_sh_lab', n: 'نشاط استهلالي: الظل وشبه الظل' }, { id: 'g8_sh_life', n: 'كيف يتكون الظل؟ (أمثلة)' }, { id: 'g8_eclipse', n: 'كسوف الشمس وخسوف القمر' }] });

/* =========================================================================================
   B1) ما الضوء المرئي؟ (ص 71، الشكل 1 والشكل 2) — الأجسام المضيئة والأجسام المستضيئة
   ========================================================================================= */
(() => {
  const ITEMS = { sun: ['الشمس', 1], star: ['النجوم', 1], moon: ['القمر', 0], lamp: ['المصباح المضيء', 1], candle: ['الشمعة', 1], book: ['الكتاب', 0], tree: ['الشجرة', 0] };
  const D = { id: 'g8_lum', page: 71, fig: 'الشكل 1، الشكل 2',
    desc: 'الأجسام التي تبعث الضوء بذاتها (كالشمس والنجوم والمصباح المضيء والشمعة) أجسام مضيئة، أما التي تعكس الضوء الساقط عليها (كالقمر والكتاب والشجر) فأجسام مستضيئة. نرى الجسم عندما يدخل ضوء منه إلى العين.',
    tags: 'الضوء المرئي جسم مضيء جسم مستضيء الشمس النجوم المصباح الشمعة القمر الكتاب الشجر الإبصار',
    tools: ['مصباح مكتب', 'شمعة', 'كتاب', 'نافذة (الشمس / القمر والنجوم)'],
    steps: ['اضغط على كل جسم في المشهد لتعرف هل هو مضيء أم مستضيء (اكتشف السبعة كلها).', 'شغّل الأشعة: من الجسم المضيء يخرج الضوء مباشرة إلى العين، أما المستضيء فيصله الضوء أولاً ثم ينعكس إلى العين.', 'أطفئ المصباح (اضغط على مفتاحه في الجدار) وأطفئ الشمعة (اضغط عليها). هل ما زلت ترى الكتاب؟', 'بدّل بين الليل والنهار: ممّن يأخذ القمر ضوءه؟'],
    concl: ['الضوء شكل من أشكال الطاقة يؤثر في العين ويُحدث الإبصار.', 'الأجسام المضيئة تبعث الضوء بذاتها: الشمس، النجوم، المصباح المضيء، الشمعة.', 'الأجسام المستضيئة تعكس الضوء الساقط عليها: القمر، الكتاب، الشجر.', 'لا نرى الجسم المستضيء في الظلام التام لأنه لا يبعث ضوءاً بذاته.'],
    laws: ['g8_light'],
    controls: [SEL('time', 'الوقت', [['night', '🌙 ليل'], ['day', '☀ نهار']], 'night'), BT('', [{ t: '↺ أعد التصنيف', on: S => { S.seen = {}; } }]),
      TG('rays', 'مسار الضوء إلى العين', true, null, 'ray'), TG('lab', 'الأسماء', true, null, 'labels')],
    setup(S) { S.seen = {}; S.lamp = 1; S.cnd = 1; S.sel = ''; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, W = w - x0, ty = h * .7;
      const win = { x: x0 + W * .05, y: h * .1, w: W * .4, h: h * .34 };
      return { w, h, ph, x0, W, ty, win, sun: [win.x + win.w * .7, win.y + win.h * .3], moon: [win.x + win.w * .7, win.y + win.h * .3], star: [win.x + win.w * .25, win.y + win.h * .22], tree: [win.x + win.w * .25, win.y + win.h], lamp: [x0 + W * .58, h * .34], book: [x0 + W * .58, ty - 6], candle: [x0 + W * .3, ty], eye: [x0 + W * .9, h * .5], sw: [x0 + W * .76, h * .3], s: Q26.sc(w, h) }; },
    light(S) { const day = S.p.time === 'day'; return (day ? 1 : 0) * .7 + S.lamp * .9 + S.cnd * .35; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, day = p.time === 'day', L = D.light(S), dim = clamp(L, .08, 1), s = g.s, fs = g.ph ? 10 : 12;
      G.bg(ctx, w, h, false);
      Q26.raw(ctx, () => { // room
        const wall = ctx.createLinearGradient(0, 0, 0, g.ty); wall.addColorStop(0, shade('#fde7c8', 0)); wall.addColorStop(1, '#f5d0a9'); ctx.fillStyle = wall; ctx.fillRect(0, 0, w, g.ty);
        const fl = ctx.createLinearGradient(0, g.ty, 0, h); fl.addColorStop(0, '#a16207'); fl.addColorStop(1, '#713f12'); ctx.fillStyle = fl; ctx.fillRect(0, g.ty, w, h - g.ty);
        // window
        const wn = g.win; const sk = ctx.createLinearGradient(0, wn.y, 0, wn.y + wn.h); sk.addColorStop(0, day ? '#38bdf8' : '#020617'); sk.addColorStop(1, day ? '#bae6fd' : '#1e293b'); ctx.fillStyle = sk; ctx.fillRect(wn.x, wn.y, wn.w, wn.h);
        if (!day) { ctx.fillStyle = '#fff'; for (let k = 0; k < 18; k++) { const x = wn.x + (k * 53.7) % wn.w, y = wn.y + (k * 29.3) % (wn.h * .7); ctx.beginPath(); ctx.arc(x, y, k % 4 ? 1 : 1.8, 0, TAU); ctx.fill(); } }
      });
      if (day) Q26.sun(ctx, g.sun[0], g.sun[1], 18 * s, S.t); else Q26.raw(ctx, () => { const m = g.moon, r = 16 * s; const gg = ctx.createRadialGradient(m[0] - 5, m[1] - 5, 2, m[0], m[1], r); gg.addColorStop(0, '#f8fafc'); gg.addColorStop(1, '#94a3b8'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(m[0], m[1], r, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(100,116,139,.4)'; ctx.beginPath(); ctx.arc(m[0] + 4, m[1] - 3, 3, 0, TAU); ctx.arc(m[0] - 5, m[1] + 4, 2.4, 0, TAU); ctx.fill(); });
      Q26.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.win.x, g.win.y, g.win.w, g.win.h); ctx.clip(); ctx.fillStyle = day ? '#4d7c0f' : '#14532d'; ctx.fillRect(g.win.x, g.win.y + g.win.h * .85, g.win.w, g.win.h * .15); ctx.restore(); });
      Q26.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.win.x, g.win.y, g.win.w, g.win.h); ctx.clip(); const t = g.tree; ctx.fillStyle = day ? '#78350f' : '#291a0b'; ctx.fillRect(t[0] - 5, t[1] - g.win.h * .45, 10, g.win.h * .45); ctx.fillStyle = day ? '#16a34a' : '#0f2a17'; [[0, -.55, .2], [-.12, -.45, .15], [.12, -.45, .15]].forEach(c => { ctx.beginPath(); ctx.arc(t[0] + c[0] * g.win.w, t[1] + c[1] * g.win.h, c[2] * g.win.w, 0, TAU); ctx.fill(); }); ctx.restore();
        ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 8; ctx.strokeRect(g.win.x, g.win.y, g.win.w, g.win.h); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(g.win.x + g.win.w / 2, g.win.y); ctx.lineTo(g.win.x + g.win.w / 2, g.win.y + g.win.h); ctx.stroke(); });
      // table
      Q26.raw(ctx, () => { const tx = g.x0 + g.W * .18, tw = g.W * .6; ctx.fillStyle = '#92400e'; ctx.fillRect(tx, g.ty - 4, tw, 12); ctx.fillStyle = '#78350f'; ctx.fillRect(tx + 10, g.ty + 8, 10, h - g.ty - 8); ctx.fillRect(tx + tw - 20, g.ty + 8, 10, h - g.ty - 8); });
      // book (brightness depends on light)
      Q26.raw(ctx, () => { const b = g.book, bw = 70 * s, bh = 12 * s; ctx.save(); ctx.globalAlpha = 1; ctx.fillStyle = shade('#1d4ed8', Math.round(-120 * (1 - dim))); ctx.fillRect(b[0] - bw / 2, b[1] - bh, bw, bh); ctx.fillStyle = shade('#f5f5f4', Math.round(-200 * (1 - dim))); ctx.beginPath(); ctx.moveTo(b[0] - bw / 2, b[1] - bh); ctx.quadraticCurveTo(b[0] - bw / 4, b[1] - bh - 12 * s, b[0], b[1] - bh - 4 * s); ctx.quadraticCurveTo(b[0] + bw / 4, b[1] - bh - 12 * s, b[0] + bw / 2, b[1] - bh); ctx.closePath(); ctx.fill(); ctx.restore(); });
      // lamp (fig 2): cord from ceiling + shade + bulb
      Q26.raw(ctx, () => { const l = g.lamp; ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(l[0], 0); ctx.lineTo(l[0], l[1] - 22 * s); ctx.stroke(); const sh = ctx.createLinearGradient(l[0] - 34 * s, 0, l[0] + 34 * s, 0); sh.addColorStop(0, '#9a3412'); sh.addColorStop(.5, '#f97316'); sh.addColorStop(1, '#9a3412'); ctx.fillStyle = sh; ctx.beginPath(); ctx.moveTo(l[0] - 12 * s, l[1] - 24 * s); ctx.lineTo(l[0] + 12 * s, l[1] - 24 * s); ctx.lineTo(l[0] + 36 * s, l[1] + 2); ctx.lineTo(l[0] - 36 * s, l[1] + 2); ctx.closePath(); ctx.fill();
        if (S.lamp) { const cone = ctx.createLinearGradient(0, l[1], 0, g.ty); cone.addColorStop(0, 'rgba(254,240,138,.55)'); cone.addColorStop(1, 'rgba(254,240,138,0)'); ctx.fillStyle = cone; ctx.beginPath(); ctx.moveTo(l[0] - 34 * s, l[1]); ctx.lineTo(l[0] + 34 * s, l[1]); ctx.lineTo(l[0] + 110 * s, g.ty); ctx.lineTo(l[0] - 110 * s, g.ty); ctx.closePath(); ctx.fill(); } });
      Q26.bulb(ctx, g.lamp[0], g.lamp[1] + 4, 9 * s, !!S.lamp, { cap: false });
      // wall switch
      Q26.raw(ctx, () => { const q = g.sw; ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#94a3b8'; rr(ctx, q[0] - 12, q[1] - 18, 24, 36, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = S.lamp ? '#22c55e' : '#64748b'; rr(ctx, q[0] - 6, q[1] + (S.lamp ? -12 : 0), 12, 12, 2); ctx.fill(); });
      Q26.candle(ctx, g.candle[0], g.candle[1] - 2, s, S.t, !!S.cnd);
      // darkness overlay of the room
      Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(2,6,23,' + (1 - dim) * .78 + ')'; ctx.fillRect(0, 0, w, h); });
      // eye of the student
      Q26.raw(ctx, () => { const e = g.eye, r = 38 * s; ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.ellipse(e[0] + r * .55, e[1] + r * .1, r * .9, r * 1.1, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#3b2414'; ctx.beginPath(); ctx.ellipse(e[0] + r * .75, e[1] - r * .55, r * .85, r * .55, 0, Math.PI, TAU); ctx.fill(); });
      Q26.eye(ctx, g.eye[0], g.eye[1], s * .8, Math.PI);
      // rays to the eye
      if (p.rays !== false) {
        const E = g.eye, col = '#f59e0b', lum = [];
        if (day) lum.push(['sun', g.sun]); else lum.push(['star', g.star]);
        if (S.lamp) lum.push(['lamp', [g.lamp[0], g.lamp[1] + 6]]); if (S.cnd) lum.push(['candle', [g.candle[0], g.candle[1] - 62 * s]]);
        lum.forEach(q => Q26.ray(ctx, [q[1], E], col, { w: 2.2, alpha: .9 }));
        const bt = [g.book[0], g.book[1] - 16 * s];
        if (S.lamp) Q26.ray(ctx, [[g.lamp[0], g.lamp[1] + 6], bt], '#fde047', { w: 1.8, alpha: .8 }); if (S.cnd) Q26.ray(ctx, [[g.candle[0], g.candle[1] - 62 * s], bt], '#fde047', { w: 1.8, alpha: .8 });
        if (S.lamp || S.cnd || day) Q26.ray(ctx, [bt, E], '#60a5fa', { w: 2.2 });
        if (!day) { Q26.ray(ctx, [[g.win.x + g.win.w + 4, g.win.y + 6], g.moon], '#fde047', { w: 1.6, alpha: .8 }); Q26.ray(ctx, [g.moon, E], '#cbd5e1', { w: 2 }); Q26.T(ctx, 'ضوء الشمس ←', g.win.x + g.win.w + 40, g.win.y + 4, { s: fs - .5, w: 800, c: '#fde047', bg: 'rgba(2,6,23,.6)' }); }
        else { Q26.ray(ctx, [g.sun, [g.tree[0], g.tree[1] - g.win.h * .55]], '#fde047', { w: 1.6, alpha: .8 }); Q26.ray(ctx, [[g.tree[0], g.tree[1] - g.win.h * .55], E], '#22c55e', { w: 2 }); }
      }
      // labels / classification tags
      const pos = { sun: g.sun, star: g.star, moon: g.moon, lamp: [g.lamp[0], g.lamp[1] - 40 * s], candle: [g.candle[0], g.candle[1] - 90 * s], book: [g.book[0], g.book[1] - 40 * s], tree: [g.tree[0], g.tree[1] - g.win.h * .2] };
      Object.keys(ITEMS).forEach(k => { if ((k === 'sun' && !day) || ((k === 'moon' || k === 'star') && day)) return; const P = pos[k], it = ITEMS[k], sn = S.seen[k];
        if (sn) Q26.T(ctx, it[0] + ': ' + (it[1] ? 'مضيء ☀' : 'مستضيء ☾'), P[0], P[1] + (k === 'sun' || k === 'moon' ? 34 : 0) * s, { s: fs, w: 900, c: '#fff', bg: it[1] ? '#d97706' : '#2563eb' });
        else if (p.lab !== false) Q26.T(ctx, it[0] + ' ؟', P[0], P[1] + (k === 'sun' || k === 'moon' ? 34 : 0) * s, { s: fs, w: 800, c: '#1e293b', bg: 'rgba(255,255,255,.85)' }); });
      const n = Object.keys(S.seen).length; Q26.T(ctx, 'صنّفت ' + n + ' من 7', g.x0 + 60, g.ty + (h - g.ty) / 2, { s: fs + 1, w: 900, c: '#fff', bg: n >= 7 ? '#15803d' : '#475569' });
      if (!S.lamp && !S.cnd && !day) Q26.T(ctx, 'لا نرى الكتاب: لا يصله ضوء ليعكسه!', g.book[0], g.book[1] + 30, { s: fs + 1, w: 900, c: '#fff', bg: '#b91c1c' });
      Q26.banner(ctx, w, 'اضغط على الأجسام لتصنيفها', '#d97706', 20); K.party(ctx, S);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), day = S.p.time === 'day', s = g.s, L = [];
      const cl = (k, P, r) => L.push({ id: 'o_' + k, x: P[0], y: P[1], r, tip: 'اضغط لتعرف: مضيء أم مستضيء؟', hint: false, click: S => { const was = Object.keys(S.seen).length; S.seen[k] = 1; S.sel = k; S.nseen = Object.keys(S.seen).length; if (S.nseen >= 7 && was < 7) K.cheer(S, S.W / 2, S.H / 3); } });
      cl(day ? 'sun' : 'moon', day ? g.sun : g.moon, 26); if (!day) cl('star', g.star, 22); cl('tree', [g.tree[0], g.tree[1] - g.win.h * .45], 26); cl('book', [g.book[0], g.book[1] - 10 * s], 34);
      L.push({ id: 'lamp', x: g.lamp[0], y: g.lamp[1] - 6, r: 34, tip: 'اضغط: صنّف المصباح', click: S => { S.seen.lamp = 1; S.nseen = Object.keys(S.seen).length; } });
      L.push({ id: 'switch', x: g.sw[0], y: g.sw[1], w: 40, h: 50, tip: 'مفتاح المصباح: تشغيل/إطفاء', idle: 'أطفئ المصباح', click: S => { S.lamp = S.lamp ? 0 : 1; } });
      L.push({ id: 'candle', x: g.candle[0], y: g.candle[1] - 50 * s, w: 46, h: 110 * s, tip: 'اضغط على الشمعة: أطفئها / أشعلها', click: S => { S.seen.candle = 1; S.cnd = S.cnd ? 0 : 1; S.nseen = Object.keys(S.seen).length; } });
      return L; },
    readings(S) { return [rd('المصباح', S.lamp ? 'مضاء' : 'مطفأ'), rd('الشمعة', S.cnd ? 'مشتعلة' : 'مطفأة'), rd('الأجسام المصنّفة', Object.keys(S.seen).length + ' / 7')]; },
    explain(S) { const k = S.sel, it = ITEMS[k];
      if (!S.lamp && !S.cnd && S.p.time === 'night') return Q26.ex('الغرفة مظلمة: لا نرى الكتاب ولا الطاولة، لكننا نرى القمر والنجوم من النافذة.', 'الكتاب جسم <b>مستضيء</b> لا يبعث ضوءاً بذاته، وفي الظلام لا يصله ضوء ليعكسه إلى عينك. أما النجوم فمضيئة، والقمر يعكس ضوء الشمس.', 'لهذا نحتاج إلى مصباح لنقرأ ليلاً.');
      if (it) return Q26.ex('<b>' + it[0] + '</b> جسم ' + (it[1] ? '<b>مضيء</b>: يبعث الضوء بذاته فيدخل ضوؤه عينك مباشرة.' : '<b>مستضيء</b>: لا يبعث ضوءاً بذاته، بل يعكس الضوء الساقط عليه إلى عينك.'), 'نرى أي جسم عندما يدخل ضوء منه إلى العين فيؤثر فيها ويحدث الإبصار.', it[1] ? 'المصابيح والشموع والشمس مصادر للضوء.' : 'القمر يبدو مضيئاً لكنه في الحقيقة مرآة كبيرة لضوء الشمس!');
      return Q26.ex('أجسام كثيرة حولك؛ بعضها يبعث الضوء وبعضها يعكسه.', 'الضوء شكل من أشكال الطاقة يؤثر في العين ويحدث الإبصار.', 'اضغط على كل جسم لتصنيفه.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   B2) الطيف المرئي (الشكل 3) وسرعة الضوء c = λ f (ص 71–72)
   ========================================================================================= */
(() => {
  const NAME = nm => nm >= 645 ? 'أحمر' : nm >= 595 ? 'برتقالي' : nm >= 570 ? 'أصفر' : nm >= 495 ? 'أخضر' : nm >= 455 ? 'أزرق' : nm >= 430 ? 'نيلي' : 'بنفسجي';
  const TRIP = { none: '—', moon: 'من الأرض إلى القمر (3.84×10⁸ m)', sun: 'من الشمس إلى الأرض (1.5×10¹¹ m)', earth: 'حول الأرض (4×10⁷ m)' };
  const DIST = { moon: 3.84e8, sun: 1.5e11, earth: 4e7 };
  const D = { id: 'g8_spectrum', page: 71, fig: 'الشكل 3',
    desc: 'الضوء موجة كهرومغناطيسية (مجال كهربائي عمودي على مجال مغناطيسي)، والطيف المرئي جزء من الطيف الكهرومغناطيسي يتكون من سبعة ألوان أطوالها الموجية بين 400 nm و 700 nm. سرعة الضوء في الفراغ c = 3×10⁸ m/s و c = λ f.',
    tags: 'الطيف المرئي طول موجي تردد سرعة الضوء موجة كهرومغناطيسية nm c = λ f',
    tools: ['الطيف المرئي (الشكل 3)'],
    steps: ['اسحب المؤشر على الطيف المرئي (الشكل 3) من 400 nm إلى 700 nm ولاحظ اللون وطول الموجة.', 'لاحظ كيف يتغير التردد f = c ÷ λ: أي لون تردده أكبر؟', 'شغّل «المجالان E و B» لترى أن الضوء موجة كهرومغناطيسية: مجال كهربائي عمودي على مجال مغناطيسي.', 'اختر رحلة للضوء (إلى القمر، من الشمس) واضغط «أطلق نبضة ضوء» لترى كم يستغرق الضوء بسرعته 3×10⁸ m/s.'],
    concl: ['الطيف المرئي سبعة ألوان: الأحمر، البرتقالي، الأصفر، الأخضر، الأزرق، النيلي، البنفسجي، ولكل لون طول موجي خاص به (400–700 nm).', 'الضوء موجة كهرومغناطيسية لا تحتاج إلى وسط ناقل.', 'سرعة الضوء في الفراغ ثابتة: c = 3×10⁸ m/s، وترتبط مع الطول الموجي والتردد بالعلاقة c = λ f.', 'كلما قصر الطول الموجي زاد التردد (البنفسجي أعلى تردداً من الأحمر).'],
    laws: ['g8_light'],
    controls: [R('nm', 'الطول الموجي λ', 400, 700, 600, 5, 'nm'), SEL('trip', 'رحلة الضوء', Object.entries(TRIP), 'moon'), BT('', [{ t: '⚡ أطلق نبضة ضوء', on: S => { S.go = 1; S.tt = 0; } }]),
      TG('em', 'المجالان E و B (موجة كهرومغناطيسية)', false, null, 'efield'), TG('lab', 'الحساب c = λ f', true, null, 'labels')],
    setup(S) { S.go = 0; S.tt = 0; S.ph = 0; },
    update(S, dt) { S.ph += dt * 4; if (S.go) { S.tt += dt * (S.p.trip === 'sun' ? 60 : 1); const T = DIST[S.p.trip] / 3e8; if (S.p.trip === 'none' || S.tt >= T) { S.tt = Math.min(S.tt, T || 0); S.go = 0; } } },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 14 : 84, x1 = w - (ph ? 14 : 24), by = h * .2, bh = Math.min(70, h * .1); return { w, h, ph, x0, x1, by, bh, X: nm => x1 - (nm - 400) / 300 * (x1 - x0), N: x => 400 + (x1 - x) / (x1 - x0) * 300 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, nm = p.nm, fs = g.ph ? 10.5 : 12.5, col = wlColor(nm);
      G.bg(ctx, w, h, false); Q26.raw(ctx, () => { ctx.fillStyle = '#0b1120'; ctx.fillRect(0, 0, w, h); });
      // spectrum bar (book: violet at left 400 → red at right 700; here RTL page: we follow the book drawing left→right 400→700)
      Q26.raw(ctx, () => { for (let x = g.x0; x <= g.x1; x++) { const n = 400 + (x - g.x0) / (g.x1 - g.x0) * 300; ctx.fillStyle = wlColor(n); ctx.fillRect(x, g.by, 1.5, g.bh); } ctx.fillStyle = '#000'; ctx.fillRect(g.x0, g.by + g.bh, g.x1 - g.x0, 4); });
      const XB = n => g.x0 + (n - 400) / 300 * (g.x1 - g.x0);
      for (let n = 400; n <= 700; n += 50) { Q26.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.fillRect(XB(n) - 1, g.by + g.bh + 4, 2, n % 100 ? 6 : 10); }); if (n % 100 === 0) Q26.T(ctx, String(n), XB(n), g.by + g.bh + 24, { s: fs + 1, w: 800, c: '#e2e8f0' }); }
      Q26.T(ctx, 'الشكل (3) الطيف المرئي — الطول الموجي (nm)', (g.x0 + g.x1) / 2, g.by - 16, { s: fs, w: 800, c: '#f9a8d4' });
      Q26.COL7.forEach(c => Q26.T(ctx, c[0], XB(c[1]), g.by + g.bh / 2, { s: g.ph ? 8.5 : 10.5, w: 900, c: '#fff', bg: 'rgba(0,0,0,.35)' }));
      // marker
      const mx = XB(nm); Q26.raw(ctx, () => { ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(mx - 6, g.by - 6, 12, g.bh + 12); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(mx, g.by + g.bh + 8); ctx.lineTo(mx - 8, g.by + g.bh + 20); ctx.lineTo(mx + 8, g.by + g.bh + 20); ctx.fill(); });
      S._mx = mx;
      // the wave
      const wy = g.by + g.bh + (g.ph ? 90 : 120), lamPx = nm * (g.ph ? .14 : .2), A = g.ph ? 22 : 32;
      if (p.em) { // E vertical, B drawn obliquely (perpendicular)
        Q26.wave(ctx, g.x0, g.x1, wy, lamPx, A, col, S.ph, 2.6); Q26.raw(ctx, () => { ctx.strokeStyle = 'rgba(96,165,250,.9)'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = g.x0; x <= g.x1; x += 2) { const v = Math.sin(TAU * (x - g.x0) / lamPx - S.ph) * A * .7; x === g.x0 ? ctx.moveTo(x - v * .5, wy + v * .45) : ctx.lineTo(x - v * .5, wy + v * .45); } ctx.stroke(); });
        Q26.T(ctx, 'E مجال كهربائي', g.x1 - 50, wy - A - 14, { s: fs, w: 900, c: col }); Q26.T(ctx, 'B مجال مغناطيسي', g.x1 - 60, wy + A + 14, { s: fs, w: 900, c: '#60a5fa' });
      } else Q26.wave(ctx, g.x0, g.x1, wy, lamPx, A, col, S.ph, 3);
      // λ dimension
      Q26.raw(ctx, () => { const xa = g.x0 + lamPx * (.25 + S.ph / TAU % 1) % lamPx + lamPx * .0; void xa; });
      const xa = g.x0 + ((S.ph / TAU) % 1) * lamPx + lamPx / 4; if (xa + lamPx < g.x1) { Q26.raw(ctx, () => { ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.3; ctx.setLineDash([3, 3]); [xa, xa + lamPx].forEach(x => { ctx.beginPath(); ctx.moveTo(x, wy - A - 6); ctx.lineTo(x, wy - A - 26); ctx.stroke(); }); ctx.setLineDash([]); }); Q26.head(ctx, xa, wy - A - 18, Math.PI, '#fff', 7); Q26.head(ctx, xa + lamPx, wy - A - 18, 0, '#fff', 7); Q26.raw(ctx, () => { ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.moveTo(xa, wy - A - 18); ctx.lineTo(xa + lamPx, wy - A - 18); ctx.stroke(); }); Q26.T(ctx, 'λ = ' + nm + ' nm', xa + lamPx / 2, wy - A - 34, { s: fs, w: 900, c: '#fff', bg: 'rgba(0,0,0,.5)' }); }
      // calculation
      const f = 3e8 / (nm * 1e-9);
      if (p.lab !== false) Q26.card(ctx, S, [{ t: 'اللون: ' + NAME(nm), c: '#0f172a', w: 900 }, { t: 'c = λ × f  ⟸  f = c ÷ λ', c: '#7c3aed', mono: 1 }, { t: 'f = 3×10⁸ ÷ (' + nm + '×10⁻⁹)', c: '#334155', mono: 1 }, { t: 'f = ' + (f / 1e14).toFixed(2) + ' × 10¹⁴ Hz', c: '#be185d', w: 900, mono: 1 }], { title: 'الطول الموجي والتردد', bd: '#be185d', y: wy + A + (g.ph ? 30 : 46), x: g.ph ? null : Q26.cx(w) + 170, wd: 340 });
      // light trip
      if (p.trip !== 'none') { const ty = h - (g.ph ? 70 : 92), xa2 = g.x0 + 20, xb2 = g.x1 - 30, T = DIST[p.trip] / 3e8, fr = S.go || S.tt > 0 ? clamp(S.tt / T, 0, 1) : 0;
        const A1 = p.trip === 'sun' ? 'الشمس' : 'الأرض', B1 = p.trip === 'sun' ? 'الأرض' : p.trip === 'moon' ? 'القمر' : 'حول الأرض';
        if (p.trip === 'sun') Q26.sun(ctx, xa2, ty, 16, S.t); else Q26.raw(ctx, () => { ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(xa2, ty, 14, 0, TAU); ctx.fill(); ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.ellipse(xa2 - 3, ty - 3, 6, 4, .5, 0, TAU); ctx.fill(); });
        Q26.raw(ctx, () => { ctx.fillStyle = p.trip === 'sun' ? '#2563eb' : '#cbd5e1'; ctx.beginPath(); ctx.arc(xb2, ty, p.trip === 'sun' ? 10 : 8, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.setLineDash([4, 5]); ctx.beginPath(); ctx.moveTo(xa2 + 18, ty); ctx.lineTo(xb2 - 12, ty); ctx.stroke(); ctx.setLineDash([]); });
        if (fr > 0) { const px = xa2 + 18 + (xb2 - 30 - xa2) * fr; Q26.ray(ctx, [[xa2 + 18, ty], [px, ty]], '#fde047', { w: 3, arrows: false }); Q26.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(px, ty, 5, 0, TAU); ctx.fill(); }); }
        Q26.T(ctx, A1, xa2, ty + 26, { s: fs, w: 800, c: '#e2e8f0' }); Q26.T(ctx, B1, xb2, ty + 26, { s: fs, w: 800, c: '#e2e8f0' });
        Q26.T(ctx, 't = d ÷ c = ' + (p.trip === 'sun' ? '500 s (≈ 8.3 min)' : T.toFixed(2) + ' s') + (S.go || S.tt ? ' — الآن ' + S.tt.toFixed(p.trip === 'sun' ? 0 : 2) + ' s' : '') + (p.trip === 'sun' ? ' (العرض أسرع 60 مرة)' : ''), (xa2 + xb2) / 2, ty - 24, { s: fs, w: 800, c: '#fde047' }); }
      Q26.banner(ctx, w, 'اسحب المؤشر على الطيف المرئي', '#be185d', 20);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), XB = n => g.x0 + (n - 400) / 300 * (g.x1 - g.x0); return [{ id: 'marker', x: XB(S.p.nm), y: g.by + g.bh / 2, w: 40, h: g.bh + 30, axis: 'x', keep: true, tip: 'اسحب لتغيير الطول الموجي', idle: 'اختر لوناً ✋', drag: (S, d) => setParam(S, 'nm', 400 + (d.x - g.x0) / (g.x1 - g.x0) * 300) }]; },
    readings(S) { const nm = S.p.nm, f = 3e8 / (nm * 1e-9); return [rd('اللون', NAME(nm)), rd('الطول الموجي λ', nm + ' nm'), rd('التردد f', (f / 1e14).toFixed(2) + ' ×10¹⁴ Hz'), rd('سرعة الضوء c', '3×10⁸ m/s')]; },
    record(S) { const nm = S.p.nm; return { c: NAME(nm), l: nm, f: +(3e8 / (nm * 1e-9) / 1e14).toFixed(2) }; },
    cols: [['c', 'اللون'], ['l', 'λ (nm)'], ['f', 'f (×10¹⁴ Hz)']],
    explain(S) { const nm = S.p.nm; return Q26.ex('اللون الآن <b>' + NAME(nm) + '</b>، طوله الموجي ' + nm + ' nm وتردده ' + (3e8 / (nm * 1e-9) / 1e14).toFixed(2) + '×10¹⁴ Hz.', 'جميع ألوان الضوء تسير في الفراغ بالسرعة نفسها c = 3×10⁸ m/s، فإذا قصر الطول الموجي λ يجب أن يزداد التردد f حتى يبقى حاصل ضربهما c.', 'يصلنا ضوء الشمس بعد نحو 8 دقائق فقط رغم أنها تبعد 150 مليون كيلومتر!'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   B3) خصائص الضوء (ص 72): يسير بخطوط مستقيمة + مبدأ استقلالية الأشعة الضوئية
   ========================================================================================= */
(() => {
  const SC = { forest: 'أشعة الشمس بين الأشجار (خطوط مستقيمة)', cards: 'ثلاث بطاقات مثقوبة وشمعة', beams: 'أشعة متقاطعة (استقلالية الأشعة)' };
  const D = { id: 'g8_straight', page: 72, fig: 'صور ص 72',
    desc: 'الضوء يسير في خطوط مستقيمة في الوسط المتجانس الواحد. ويمتاز بمبدأ استقلالية الأشعة: عندما تتقاطع الأشعة الضوئية لا يؤثر أي منها في الآخر بل يواصل كل منها السير في اتجاهه.',
    tags: 'خطوط مستقيمة استقلالية الأشعة الضوئية تقاطع أشعة ليزر بطاقات مثقوبة غابة',
    tools: ['أشعة الشمس في غابة', 'ثلاث بطاقات مثقوبة وشمعة', 'ثلاثة مصادر ليزر ملونة'],
    steps: ['المشهد الأول (صورة الكتاب): اسحب الشمس ولاحظ حزم الضوء بين أغصان الأشجار: هل هي مستقيمة أم منحنية؟', 'المشهد الثاني: اسحب إحدى البطاقات قليلاً إلى الأعلى أو الأسفل. متى ترى العين لهب الشمعة؟', 'المشهد الثالث (صورة الكتاب): وجّه أشعة الليزر الثلاثة لتتقاطع (اسحب كل ليزر لتدويره).', 'أطفئ أحد الأشعة بالضغط على جهازه: هل تغيّر مسار الشعاعين الآخرين أو لونهما بعد التقاطع؟'],
    concl: ['الضوء يسير في خطوط مستقيمة في الوسط المتجانس الواحد.', 'لا ترى العين اللهب إلا إذا كانت ثقوب البطاقات الثلاث على خط مستقيم واحد.', 'مبدأ استقلالية الأشعة الضوئية: الأشعة المتقاطعة لا يؤثر أي منها في الآخر، ويواصل كل منها السير في اتجاهه.'],
    laws: ['g8_straight'],
    controls: [SEL('sc', 'المشهد', Object.entries(SC), 'forest'), TG('lab', 'الأسماء والتوضيحات', true, null, 'labels'), TG('str', 'خيط مشدود عبر الثقوب', false, null, 'ray')],
    setup(S) { S.sa = 62; S.cy = [0, 0, 0]; S.la = [0, 0, 0]; S.on = [1, 1, 1]; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 10 : 72; return { w, h, ph, x0, s: Q26.sc(w, h), cx: Q26.cx(w) }; },
    cards(S, g) { const y0 = g.h * .5, xs = [.36, .52, .68].map(f => g.x0 + (g.w - g.x0) * f); return { y0, xs, fl: [g.x0 + (g.w - g.x0) * .12, y0], eye: [g.x0 + (g.w - g.x0) * .9, y0], hr: 9 * g.s, H: 150 * g.s }; },
    lasers(S, g) { const cx = g.x0 + (g.w - g.x0) * .48, cy = g.h * .5; return [-.22, 0, .22].map((f, i) => { const P = [g.x0 + 40 * g.s + 50, cy + f * g.h], a0 = Math.atan2(cy - P[1], cx - P[0]); return { P, a0, a: a0 + S.la[i] }; }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10.5 : 12.5;
      if (p.sc === 'forest') {
        G.bg(ctx, w, h, false); const gy = h * .8, a = S.sa * Math.PI / 180, d = [-Math.cos(a), Math.sin(a)];
        Q26.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 0, 0, gy); sk.addColorStop(0, '#1e3a2f'); sk.addColorStop(1, '#4b5d3a'); ctx.fillStyle = sk; ctx.fillRect(0, 0, w, gy); const gg = ctx.createLinearGradient(0, gy, 0, h); gg.addColorStop(0, '#3f6212'); gg.addColorStop(1, '#1a2e05'); ctx.fillStyle = gg; ctx.fillRect(0, gy, w, h - gy);
          // trunks
          for (let k = 0; k < 9; k++) { const x = g.x0 + (w - g.x0) * (k + .5) / 9 + ((k * 37) % 23 - 11), tw = 10 + (k * 7) % 14; ctx.fillStyle = k % 2 ? '#1c1917' : '#292524'; ctx.fillRect(x - tw / 2, h * .12, tw, gy - h * .12 + 6); } });
        // canopy with gaps
        const gaps = [.2, .37, .55, .71, .86].map(f => g.x0 + (w - g.x0) * f), cy = h * .22;
        Q26.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; gaps.forEach((x, i) => { const wd = (14 + (i % 3) * 8) * g.s, L = (gy - cy) / Math.max(.2, d[1]); const gr = ctx.createLinearGradient(x, cy, x + d[0] * L, cy + d[1] * L); gr.addColorStop(0, 'rgba(254,240,138,.55)'); gr.addColorStop(1, 'rgba(254,240,138,.12)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x - wd, cy); ctx.lineTo(x + wd, cy); ctx.lineTo(x + wd + d[0] * L, cy + d[1] * L); ctx.lineTo(x - wd + d[0] * L, cy + d[1] * L); ctx.closePath(); ctx.fill();
            ctx.fillStyle = 'rgba(254,249,195,.5)'; ctx.beginPath(); ctx.ellipse(x + d[0] * L, gy + 4, wd * 1.6, 6, 0, 0, TAU); ctx.fill();
            for (let k = 0; k < 10; k++) { const f = ((k * .137 + S.t * .03 * (1 + k % 3)) % 1), px = x + d[0] * L * f + Math.sin(k * 3 + S.t) * wd * .6, py = cy + d[1] * L * f; ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(px, py, 1.6, 1.6); } }); ctx.restore();
          ctx.fillStyle = '#14532d'; ctx.fillRect(0, cy - 34, w, 24); for (let x = 0; x < w; x += 22) { if (gaps.some(gx => Math.abs(gx - x) < 18 * g.s)) continue; ctx.fillStyle = (x / 22) % 2 ? '#166534' : '#15803d'; ctx.beginPath(); ctx.arc(x, cy - 6, 20, 0, TAU); ctx.fill(); } });
        const sx = g.cx - Math.cos(a) * -1 * 0 + (-d[0]) * 0; void sx;
        const sunP = [g.cx - d[0] * h * .09 / Math.max(.2, d[1]) * 0 + (S.sa - 90) * -3.2 * g.s, 34]; Q26.raw(ctx, () => { ctx.fillStyle = '#bae6fd'; ctx.fillRect(0, 0, w, cy - 30); }); Q26.sun(ctx, clamp(sunP[0], g.x0 + 20, w - 30), h * .1, 16 * g.s, S.t, { spots: false });
        if (p.lab !== false) { Q26.T(ctx, 'حزم الضوء خطوط مستقيمة ✓', g.cx, gy + (h - gy) / 2, { s: fs + 1, w: 900, c: '#fff', bg: 'rgba(161,98,7,.9)' }); }
        S._sun = [clamp(sunP[0], g.x0 + 20, w - 30), h * .1];
      } else if (p.sc === 'cards') {
        Q26.room(ctx, w, h, h * .78); const C = D.cards(S, g);
        const flame = [C.fl[0], C.y0];
        Q26.candle(ctx, C.fl[0], C.y0 + 72 * g.s, g.s * 1.1, S.t, true);
        // propagate along straight line flame → eye; blocked at first misaligned card
        let blocked = -1; C.xs.forEach((x, i) => { const hy = C.y0 + S.cy[i]; if (blocked < 0 && Math.abs(hy - C.y0) > C.hr) blocked = i; });
        const endX = blocked < 0 ? C.eye[0] : C.xs[blocked];
        Q26.ray(ctx, [flame, [endX, C.y0]], '#fde047', { w: 3 });
        C.xs.forEach((x, i) => { const hy = C.y0 + S.cy[i]; Q26.raw(ctx, () => { const gr = ctx.createLinearGradient(x - 5, 0, x + 5, 0); gr.addColorStop(0, '#d6d3d1'); gr.addColorStop(1, '#a8a29e'); ctx.fillStyle = gr; ctx.fillRect(x - 4, hy - C.H / 2, 8, C.H); ctx.fillStyle = '#1e293b'; ctx.fillRect(x - 5, hy - C.hr, 10, 2 * C.hr); ctx.fillStyle = '#57534e'; ctx.fillRect(x - 14, hy + C.H / 2, 28, 6); }); if (p.lab !== false) Q26.T(ctx, 'بطاقة ' + (i + 1), x, hy - C.H / 2 - 12, { s: fs, w: 800, c: '#fff', bg: i === blocked ? '#b91c1c' : '#475569' }); });
        if (p.str) Q26.raw(ctx, () => { ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(flame[0], C.y0); C.xs.forEach((x, i) => ctx.lineTo(x, C.y0 + S.cy[i])); ctx.lineTo(C.eye[0], C.y0); ctx.stroke(); });
        Q26.eye(ctx, C.eye[0], C.y0, g.s, Math.PI);
        Q26.verdict(ctx, C.eye[0] - 30, C.y0 + 60 * g.s, blocked < 0, blocked < 0 ? 'العين ترى اللهب' : 'لا ترى اللهب');
        if (p.lab !== false) Q26.T(ctx, 'الثقوب على خط مستقيم واحد ⟸ يصل الضوء', g.cx, h * .78 + 30, { s: fs, w: 800, c: '#fff', bg: 'rgba(0,0,0,.5)' });
      } else {
        Q26.room(ctx, w, h, h * .9, { top: '#020617', bot: '#0f172a' }); const L = D.lasers(S, g), cols = ['#ef4444', '#22c55e', '#3b82f6'], X1 = w - 30 * g.s;
        Q26.raw(ctx, () => { ctx.fillStyle = '#1e293b'; ctx.fillRect(X1, h * .12, 10, h * .76); });
        L.forEach((q, i) => { if (!S.on[i]) return; const dd = Q26.dir(q.a), r = Q26.seg(q.P, dd, [X1, 0], [X1, h]); const end = r ? r.pt : [q.P[0] + dd[0] * 2000, q.P[1] + dd[1] * 2000]; Q26.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; }); Q26.ray(ctx, [q.P, end], cols[i], { w: 3 }); Q26.raw(ctx, () => { ctx.restore(); const gl = ctx.createRadialGradient(end[0], end[1], 1, end[0], end[1], 16); gl.addColorStop(0, cols[i]); gl.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(end[0], end[1], 16, 0, TAU); ctx.fill(); }); });
        L.forEach((q, i) => { Q26.laser(ctx, q.P[0], q.P[1], q.a, g.s, { col: S.on[i] ? cols[i] : '#475569' }); });
        if (p.lab !== false) Q26.T(ctx, 'كل شعاع يواصل سيره في اتجاهه بعد التقاطع', g.cx, h * .9 + 22, { s: fs, w: 800, c: '#fff', bg: 'rgba(30,41,59,.85)' });
      }
      Q26.banner(ctx, w, p.sc === 'forest' ? 'اسحب الشمس' : p.sc === 'cards' ? 'اسحب البطاقات للأعلى أو الأسفل' : 'اسحب الليزر لتدويره، واضغط عليه لإطفائه', '#be185d', 20);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), p = S.p;
      if (p.sc === 'forest') { if (!S._sun) return []; return [{ id: 'sun', x: S._sun[0], y: S._sun[1], r: 30, axis: 'x', keep: true, tip: 'اسحب الشمس', idle: 'حرّك الشمس ✋', drag: (S, d) => { S.sa = clamp(90 - (d.x - g.cx) / (3.2 * g.s), 35, 145); } }]; }
      if (p.sc === 'cards') { const C = D.cards(S, g); return C.xs.map((x, i) => ({ id: 'card' + i, x, y: C.y0 + S.cy[i], w: 40, h: C.H, axis: 'y', keep: true, tip: 'اسحب البطاقة للأعلى أو للأسفل', idle: i === 1 ? 'حرّك البطاقة ✋' : undefined, hint: i === 1, drag: (S, d) => { let v = d.y - C.y0; if (Math.abs(v) < 5) v = 0; S.cy = S.cy.slice(); S.cy[i] = clamp(v, -60, 60); S['c' + i] = S.cy[i]; } })); }
      const L = D.lasers(S, g); return L.map((q, i) => ({ id: 'las' + i, x: q.P[0] - Math.cos(q.a) * 40 * g.s, y: q.P[1] - Math.sin(q.a) * 40 * g.s, r: 30, cx: q.P[0], cy: q.P[1], keep: true, tip: 'اسحب لتدوير الليزر، واضغط لتشغيله/إطفائه', hint: i === 0,
        drag: (S, d) => { const a = Math.atan2(q.P[1] - d.y, q.P[0] - d.x); S.la = S.la.slice(); S.la[i] = clamp(a - q.a0, -.9, .9); S['a' + i] = S.la[i]; },
        click: S => { S.on = S.on.slice(); S.on[i] = S.on[i] ? 0 : 1; S['o' + i] = S.on[i]; } })); },
    readings(S) { if (S.p.sc === 'beams') return [rd('الأشعة المشغّلة', S.on.reduce((a, b) => a + b, 0) + ' من 3')]; if (S.p.sc === 'cards') { const ok = S.cy.every(v => Math.abs(v) <= 9); return [rd('الثقوب', ok ? 'على خط مستقيم' : 'غير مستقيمة'), rd('العين', ok ? 'ترى اللهب' : 'لا ترى اللهب')]; } return [rd('اتجاه أشعة الشمس', Math.round(S.sa) + '°')]; },
    explain(S) { const p = S.p.sc;
      if (p === 'forest') return Q26.ex('حزم ضوء مستقيمة تماماً تخترق الفراغات بين الأغصان وتصل إلى الأرض.', 'الضوء يسير في خطوط مستقيمة في الوسط المتجانس الواحد (الهواء). ذرات الغبار في الهواء تجعل مسار الضوء مرئياً.', 'حزمة ضوء المصباح اليدوي في الظلام مستقيمة.');
      if (p === 'cards') { const ok = S.cy.every(v => Math.abs(v) <= 9); return Q26.ex(ok ? 'الثقوب الثلاثة على خط واحد فترى العين لهب الشمعة.' : 'إحدى البطاقات أُزيحت فاختفى اللهب عن العين.', 'الضوء لا ينحني حول البطاقة: إنه يسير بخط مستقيم، فلا يمر إلا إذا كانت الثقوب على استقامة واحدة.', 'لا نستطيع أن نرى ما خلف الجدار أو حول زاوية الممر.'); }
      return Q26.ex('الأشعة الثلاثة تتقاطع ثم يصل كل منها إلى الحاجز بلونه نفسه وفي موضعه نفسه، حتى لو أطفأنا غيره.', 'مبدأ استقلالية الأشعة الضوئية: الأشعة المتقاطعة لا يؤثر أي منها في الآخر.', 'أضواء المسرح والحفلات تتقاطع في كل اتجاه ويواصل كل منها طريقه.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   B4) نشاط: الضوء لا يحتاج إلى وسط ناقل (ص 72) — جرس كهربائي ومصباح داخل ناقوس زجاجي ومفرغة هواء
   ========================================================================================= */
(() => {
  const D = { id: 'g8_vacuum', page: 72, fig: 'شكل نشاط ص 72',
    desc: 'نضع جرساً كهربائياً ومصباحاً داخل ناقوس زجاجي ونفرغ الهواء منه تدريجياً بالمفرغة: يخفت صوت الجرس حتى لا نسمعه، بينما يبقى ضوء المصباح مرئياً.',
    tags: 'الضوء لا يحتاج وسط ناقل ناقوس زجاجي مفرغة هواء جرس كهربائي مصباح فراغ صوت',
    tools: ['جرس كهربائي', 'مصباح كهربائي', 'أسلاك توصيل', 'مصدر كهربائي', 'ناقوس زجاجي', 'مفرغة هواء'],
    steps: ['أحضر جرساً كهربائياً ومصباحاً كهربائياً وأسلاك توصيل ومصدراً كهربائياً وناقوساً زجاجياً ومفرغة هواء.', 'ضع الجرس والمصباح داخل الناقوس الزجاجي، واربطهما بالمصدر الكهربائي (اضغط على المفتاح). ماذا تلاحظ؟', 'اربط مفرغة الهواء بالمصدر لتفريغ الناقوس من الهواء تدريجياً (اسحب ذراع المفرغة إلى الأسفل مرات عدة). ماذا تلاحظ؟', 'لماذا أرى الضوء بالرغم من تفريغ الناقوس من الهواء بينما لا أسمع صوت الجرس؟'],
    concl: ['عند تفريغ الهواء يضعف صوت الجرس تدريجياً حتى ينعدم، لأن الصوت يحتاج إلى وسط مادي ينتقل فيه.', 'يبقى المصباح مرئياً بالشدة نفسها: الضوء لا يحتاج إلى وسط مادي لانتقاله، فهو ينتقل في الفراغ.', 'الدليل في الطبيعة: وصول ضوء الشمس إلى الأرض عبر الفضاء الخالي من الهواء.'],
    laws: ['g8_straight', 'g8_light'],
    controls: [BT('', [{ t: '🔌 تشغيل / إيقاف', on: S => { S.on = S.on ? 0 : 1; } }, { t: '💨 أدخل الهواء', on: S => { S.P = 1; } }]), TG('mol', 'جزيئات الهواء', true, null, 'dot'), TG('snd', 'موجات الصوت', true, null, 'wave'), TG('ray', 'أشعة الضوء', true, null, 'ray'), TG('lab', 'الأسماء والقراءات', true, null, 'labels')],
    setup(S) { S.on = 0; S.P = 1; S.hy = .5; S.mol = Array.from({ length: 70 }, (_, i) => ({ x: Math.random(), y: Math.random(), vx: Math.random() - .5, vy: Math.random() - .5, k: i / 70 })); },
    update(S, dt) { (S.mol || []).forEach(m => { m.x += m.vx * dt * .6; m.y += m.vy * dt * .6; if (m.x < 0 || m.x > 1) m.vx *= -1; if (m.y < 0 || m.y > 1) m.vy *= -1; m.x = clamp(m.x, 0, 1); m.y = clamp(m.y, 0, 1); }); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, s = Q26.sc(w, h), by = h * .72, cx = ph ? w * .42 : (w + 64) / 2 - 40 * s, R = Math.min(150 * s, w * .28); return { w, h, ph, s, by, cx, R, pump: [Math.min(w - 60 * s, cx + R + 150 * s), by], psu: [Math.max(ph ? 40 : 110, cx - R - 110 * s), by] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, s = g.s, fs = g.ph ? 10 : 12, P = S.P, ring = S.on ? Math.sin(S.t * 60) : 0;
      Q26.room(ctx, w, h, g.by + 18 * s, { top: '#e2e8f0', bot: '#cbd5e1' });
      // base plate
      Q26.raw(ctx, () => { const gp = ctx.createLinearGradient(0, g.by, 0, g.by + 18 * s); gp.addColorStop(0, '#9ca3af'); gp.addColorStop(1, '#4b5563'); ctx.fillStyle = gp; rr(ctx, g.cx - g.R - 20 * s, g.by, 2 * g.R + 40 * s, 18 * s, 4); ctx.fill(); });
      // bell on stand
      const bx = g.cx - g.R * .38, bly = g.by - g.R * .55;
      Q26.raw(ctx, () => { ctx.fillStyle = '#57534e'; ctx.fillRect(bx - 3, bly, 6, g.by - bly); const gg = ctx.createRadialGradient(bx - 8 * s, bly - 10 * s, 2, bx, bly, 30 * s); gg.addColorStop(0, '#fef3c7'); gg.addColorStop(.5, '#f59e0b'); gg.addColorStop(1, '#92400e'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(bx, bly, 28 * s, Math.PI, TAU); ctx.lineTo(bx + 28 * s, bly + 4 * s); ctx.lineTo(bx - 28 * s, bly + 4 * s); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#334155'; rr(ctx, bx - 18 * s, bly + 8 * s, 36 * s, 16 * s, 3); ctx.fill(); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(bx + 10 * s, bly + 10 * s); ctx.lineTo(bx + 22 * s + ring * 4 * s, bly - 16 * s); ctx.stroke(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(bx + 22 * s + ring * 4 * s, bly - 16 * s, 4.5 * s, 0, TAU); ctx.fill(); });
      // lamp on stand
      const lx = g.cx + g.R * .38, ly = g.by - g.R * .6; Q26.raw(ctx, () => { ctx.fillStyle = '#57534e'; ctx.fillRect(lx - 3, ly + 12 * s, 6, g.by - ly - 12 * s); });
      Q26.bulb(ctx, lx, ly, 16 * s, !!S.on);
      // wires through the base to the power supply
      Q26.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(g.psu[0] + 30 * s, g.by - 20 * s); ctx.lineTo(g.cx - g.R - 30 * s, g.by + 9 * s); ctx.lineTo(bx, g.by + 9 * s); ctx.lineTo(bx, g.by); ctx.moveTo(bx, g.by + 9 * s); ctx.lineTo(lx, g.by + 9 * s); ctx.lineTo(lx, g.by); ctx.stroke(); ctx.strokeStyle = '#2563eb'; ctx.beginPath(); ctx.moveTo(g.psu[0] + 30 * s, g.by - 10 * s); ctx.lineTo(g.cx - g.R - 30 * s, g.by + 14 * s); ctx.lineTo(lx + 6, g.by + 14 * s); ctx.stroke(); });
      // power supply with switch
      Q26.raw(ctx, () => { const q = g.psu; const gb = ctx.createLinearGradient(0, q[1] - 70 * s, 0, q[1]); gb.addColorStop(0, '#475569'); gb.addColorStop(1, '#1e293b'); ctx.fillStyle = gb; rr(ctx, q[0] - 45 * s, q[1] - 70 * s, 90 * s, 70 * s, 6); ctx.fill(); ctx.fillStyle = '#0f172a'; rr(ctx, q[0] - 32 * s, q[1] - 58 * s, 64 * s, 22 * s, 3); ctx.fill(); ctx.fillStyle = S.on ? '#22c55e' : '#64748b'; ctx.beginPath(); ctx.arc(q[0], q[1] - 18 * s, 12 * s, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(q[0] - 2, q[1] - 26 * s, 4, 9 * s); });
      Q26.T(ctx, S.on ? 'ON' : 'OFF', g.psu[0], g.psu[1] - 47 * s, { s: 11, w: 900, c: S.on ? '#4ade80' : '#94a3b8', mono: 1 });
      // air molecules inside the jar
      const inJar = (x, y) => { const dx = (x - g.cx) / g.R, dy = (y - (g.by - g.R * .55)) / (g.R * 1.1); return dy > 0 ? Math.abs(dx) < 1 && y < g.by : dx * dx + dy * dy < 1; };
      if (p.mol !== false) Q26.raw(ctx, () => { ctx.fillStyle = '#0284c7'; (S.mol || []).forEach(m => { if (m.k > P) return; const x = g.cx - g.R + m.x * 2 * g.R, y = g.by - g.R * 1.6 + m.y * g.R * 1.55; if (inJar(x, y)) { ctx.beginPath(); ctx.arc(x, y, 2.6 * s, 0, TAU); ctx.fill(); } }); });
      // glass bell jar
      Q26.raw(ctx, () => { const top = g.by - g.R * 1.65; ctx.save(); ctx.fillStyle = 'rgba(186,230,253,.18)'; ctx.strokeStyle = 'rgba(14,116,144,.75)'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(g.cx - g.R, g.by); ctx.lineTo(g.cx - g.R, g.by - g.R * .55); ctx.bezierCurveTo(g.cx - g.R, top, g.cx + g.R, top, g.cx + g.R, g.by - g.R * .55); ctx.lineTo(g.cx + g.R, g.by); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#0e7490'; rr(ctx, g.cx - 12 * s, top + g.R * .2 - 22 * s, 24 * s, 16 * s, 4); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.cx - g.R * .82, g.by - g.R * .5); ctx.bezierCurveTo(g.cx - g.R * .82, g.by - g.R * 1.2, g.cx - g.R * .4, top + g.R * .32, g.cx - g.R * .2, top + g.R * .27); ctx.stroke(); ctx.restore(); });
      // pump and hose
      Q26.raw(ctx, () => { const q = g.pump; ctx.strokeStyle = '#334155'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(g.cx + g.R + 10 * s, g.by + 9 * s); ctx.bezierCurveTo(q[0] - 70 * s, g.by + 40 * s, q[0] - 50 * s, q[1] - 10 * s, q[0] - 30 * s, q[1] - 20 * s); ctx.stroke();
        const gb = ctx.createLinearGradient(q[0] - 30 * s, 0, q[0] + 30 * s, 0); gb.addColorStop(0, '#991b1b'); gb.addColorStop(.5, '#ef4444'); gb.addColorStop(1, '#7f1d1d'); ctx.fillStyle = gb; rr(ctx, q[0] - 30 * s, q[1] - 100 * s, 60 * s, 100 * s, 8); ctx.fill();
        const hy = q[1] - 100 * s - 50 * s + S.hy * 46 * s; ctx.fillStyle = '#9ca3af'; ctx.fillRect(q[0] - 4 * s, hy, 8 * s, q[1] - 100 * s - hy); ctx.fillStyle = '#1f2937'; rr(ctx, q[0] - 34 * s, hy - 10 * s, 68 * s, 14 * s, 6); ctx.fill(); });
      // pressure gauge
      Q26.raw(ctx, () => { const gx = g.pump[0], gy2 = g.pump[1] - 60 * s, r = 20 * s; ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(gx, gy2, r, 0, TAU); ctx.fill(); ctx.stroke(); const a = Math.PI * .75 + P * Math.PI * 1.5; ctx.strokeStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(gx, gy2); ctx.lineTo(gx + Math.cos(a) * r * .8, gy2 + Math.sin(a) * r * .8); ctx.stroke(); });
      // sound waves outside the jar (amplitude ∝ air pressure)
      const loud = S.on ? P : 0;
      if (p.snd !== false && loud > .02) Q26.raw(ctx, () => { ctx.save(); ctx.strokeStyle = 'rgba(124,58,237,' + (.8 * loud) + ')'; ctx.lineWidth = 2.5; for (let k = 0; k < 4; k++) { const r = g.R * 1.1 + ((S.t * 60 + k * 25) % 100) * s; ctx.globalAlpha = (1 - ((S.t * 60 + k * 25) % 100) / 100) * loud; ctx.beginPath(); ctx.arc(g.cx, g.by - g.R * .5, r, Math.PI * 1.05, Math.PI * 1.35); ctx.stroke(); } ctx.restore(); });
      if (p.ray !== false && S.on) { for (let k = -2; k <= 2; k++) { const a = -Math.PI / 2 + .3 + k * .32; Q26.ray(ctx, [[lx + Math.cos(a) * 18 * s, ly + Math.sin(a) * 18 * s], [lx + Math.cos(a) * g.R * 2.4, ly + Math.sin(a) * g.R * 2.4]], '#facc15', { w: 2, alpha: .9 }); } }
      // meters
      if (p.lab !== false) { const L = [{ t: 'ضغط الهواء داخل الناقوس: ' + Math.round(P * 100) + ' %', c: '#0369a1', w: 900 }, { t: 'شدة صوت الجرس: ' + (S.on ? Math.round(loud * 100) + ' %' : 'مطفأ'), c: '#7c3aed', w: 900 }, { t: 'إضاءة المصباح: ' + (S.on ? '100 % (لا تتغير)' : 'مطفأ'), c: '#b45309', w: 900 }];
        Q26.card(ctx, S, L, { title: S.on && P < .05 ? 'فراغ: نرى الضوء ولا نسمع الصوت!' : 'القراءات', bd: '#be185d', y: 44, wd: 300 });
        Q26.T(ctx, 'مفرغة الهواء', g.pump[0], g.pump[1] + 18 * s, { s: fs, w: 800, c: '#1e293b' }); Q26.T(ctx, 'مصدر كهربائي', g.psu[0], g.psu[1] + 18 * s, { s: fs, w: 800, c: '#1e293b' }); Q26.T(ctx, 'ناقوس زجاجي', g.cx, g.by + 32 * s, { s: fs, w: 800, c: '#1e293b' }); Q26.T(ctx, 'الجرس', bx, bly + 36 * s, { s: fs, w: 800, c: '#fff', bg: '#78350f' }); Q26.T(ctx, 'المصباح', lx, ly + 40 * s, { s: fs, w: 800, c: '#fff', bg: '#78350f' }); }
      Q26.banner(ctx, w, S.on ? 'حرّك ذراع المفرغة للأعلى والأسفل لتفريغ الهواء' : 'اضغط مفتاح المصدر الكهربائي', '#be185d', 20); K.party(ctx, S);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), s = g.s, q = g.pump, hy = q[1] - 150 * s + S.hy * 46 * s;
      return [{ id: 'switch', x: g.psu[0], y: g.psu[1] - 18 * s, r: 26, tip: 'مفتاح المصدر: تشغيل/إيقاف', idle: 'شغّل ✋', click: S => { S.on = S.on ? 0 : 1; } },
        { id: 'pump', x: q[0], y: hy - 3 * s, w: 90, h: 40, axis: 'y', keep: true, tip: 'حرّك ذراع المفرغة للأعلى والأسفل مرات عدة لتفريغ الهواء', idle: 'حرّك المضخة ✋',
          drag: (S, d) => { const nv = clamp((d.y - (q[1] - 150 * s)) / (46 * s), 0, 1); S.P = Math.max(0, S.P * Math.pow(.55, Math.abs(nv - S.hy))); if (S.P < .015) S.P = 0; S.hy = nv; },
          up: S => { if (S.P === 0 && S.on && !S.done) { S.done = 1; K.cheer(S, S.W / 2, S.H / 3); } } }]; },
    readings(S) { return [rd('ضغط الهواء في الناقوس', Math.round(S.P * 100) + ' %'), rd('صوت الجرس', S.on ? Math.round(S.P * 100) + ' %' : 'مطفأ'), rd('ضوء المصباح', S.on ? 'مرئي 100 %' : 'مطفأ')]; },
    record(S) { return { P: Math.round(S.P * 100), snd: S.on ? Math.round(S.P * 100) : 0, lt: S.on ? 100 : 0 }; },
    cols: [['P', 'ضغط الهواء %'], ['snd', 'شدة الصوت %'], ['lt', 'الإضاءة %']],
    explain(S) { if (!S.on) return Q26.ex('الدائرة مفتوحة: الجرس صامت والمصباح مطفأ.', 'شغّل المصدر الكهربائي لتبدأ التجربة.', ''); const P = S.P;
      return Q26.ex(P > .9 ? 'نسمع رنين الجرس ونرى ضوء المصباح.' : P > .05 ? 'كلما فرّغنا الهواء ضعف صوت الجرس، أما ضوء المصباح فلم يتغير.' : 'الناقوس شبه فارغ: نرى الجرس يهتز والمصباح مضيئاً، لكننا <b>لا نسمع أي صوت</b>!',
        'الصوت موجة ميكانيكية تحتاج إلى جزيئات الهواء لتنقلها، أما الضوء فموجة كهرومغناطيسية تنتقل في الفراغ دون حاجة إلى وسط مادي.', 'يصلنا ضوء الشمس والنجوم عبر الفضاء الخالي، لكن لا يصلنا صوت انفجاراتها.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   B5) ما سلوك الضوء في الأوساط المختلفة؟ (ص 72–73، الشكل 4 والشكل 5) — شفافة، شبه شفافة، معتمة
   ========================================================================================= */
(() => {
  const MAT = { air: ['الهواء', 'شفاف', 0, .0002, '#e0f2fe'], glass: ['زجاج رقيق مصقول', 'شفاف', .08, .01, '#bae6fd'], water: ['ماء نقي', 'شفاف', .02, .004, '#7dd3fc'], frost: ['زجاج محبب', 'شبه شفاف', .12, .25, '#e2e8f0'], wood: ['خشب', 'معتم', .25, 99, '#a16207'], iron: ['حديد', 'معتم', .55, 99, '#64748b'], book: ['كتاب', 'معتم', .35, 99, '#be123c'] };
  const SC = { slab: 'الشكل 4: الضوء يسقط على المادة', fig5: 'الشكل 5: صنّف أجسام الغرفة', sea: 'قاع البحر: سمك الوسط الشفاف' };
  const F5 = { up: ['زجاج النافذة العلوي', 'شفاف'], low: ['الستارة المزخرفة (أسفل النافذة)', 'شبه شفاف'], chair: ['الكرسي', 'معتم'], table: ['الطاولة', 'معتم'], vase: ['المزهرية الزجاجية', 'شفاف'], cup: ['الكوب', 'معتم'], book: ['الكتاب', 'معتم'] };
  const D = { id: 'g8_media', page: 72, fig: 'الشكل 4، الشكل 5',
    desc: 'عندما يسقط الضوء على زجاج النافذة ينفذ جزء منه وينعكس جزء آخر ويمتص المتبقي. تقسم المواد من ناحية سماحيتها للضوء بالنفاذ إلى: شفافة وشبه شفافة ومعتمة، ويتناقص الضوء النافذ بزيادة سمك الوسط الشفاف.',
    tags: 'شفاف شبه شفاف معتم نفاذ انعكاس امتصاص زجاج مزهرية قاع البحر سمك',
    tools: ['زجاج رقيق مصقول', 'زجاج محبب', 'ماء نقي', 'خشب', 'حديد', 'كتاب'],
    steps: ['الشكل 4: اختر المادة ولاحظ نسب الضوء المنعكس والنافذ والممتص، وانظر إلى المزهرية خلفها.', 'جرّب المواد الشفافة (الهواء، الماء النقي، الزجاج الرقيق) وشبه الشفافة (الزجاج المحبب) والمعتمة (الخشب، الحديد، الكتاب).', 'زد سمك المادة الشفافة: ماذا يحدث لمقدار الضوء النافذ؟', 'الشكل 5: اضغط على أجسام الغرفة وصنّفها (سؤال ص 73).', 'قاع البحر: اسحب الغواص إلى الأعمق. لماذا نرى قاع البحر مظلماً؟'],
    concl: ['المواد الشفافة تسمح للضوء بالنفاذ من خلالها فنرى الأجسام خلفها بوضوح: الهواء، الماء النقي، الزجاج الرقيق المصقول.', 'المواد شبه الشفافة تسمح بنفاذ قسم قليل من الضوء وتمتص وتعكس الباقي، فلا نرى الأجسام خلفها بوضوح (الزجاج المحبب).', 'المواد المعتمة لا تسمح للضوء بالنفاذ فلا نرى الأجسام خلفها: الحديد، الخشب، الكتاب.', 'يتناقص مقدار الضوء النافذ من الوسط الشفاف بزيادة سمكه لأن الوسط السميك يمتص الضوء، ولذلك نرى قاع البحر مظلماً.'],
    laws: ['g8_straight'],
    controls: [SEL('sc', 'المشهد', Object.entries(SC), 'slab'), SEL('m', 'المادة', Object.entries(MAT).map(([k, v]) => [k, v[0] + ' (' + v[1] + ')']), 'glass'), R('th', 'سمك المادة', .5, 60, 1, .5, 'cm'), R('dep', 'عمق الغواص', 0, 80, 10, 1, 'm'),
      TG('bars', 'نسب الضوء (منعكس/نافذ/ممتص)', true, null, 'meter'), TG('ray', 'الأشعة', true, null, 'ray'), TG('lab', 'الأسماء', true, null, 'labels')],
    setup(S) { S.seen = {}; S.sel = ''; },
    frac(S) { const m = MAT[S.p.m], th = S.p.th; const R0 = m[2]; if (m[1] === 'معتم') return { R: R0, T: 0, A: 1 - R0 }; const T = (1 - R0) * Math.exp(-m[3] * th), A = 1 - R0 - T; return { R: R0, T, A }; },
    draw(ctx, w, h, S) {
      const p = S.p, ph = w < 600, s = Q26.sc(w, h), fs = ph ? 10 : 12, x0 = ph ? 8 : 70, cx = Q26.cx(w);
      if (p.sc === 'slab') {
        Q26.room(ctx, w, h, h * .86, { top: '#f1f5f9', bot: '#e2e8f0' });
        const m = MAT[p.m], F = D.frac(S), sx = x0 + (w - x0) * (ph ? .5 : .42), sy = h * .5, thPx = clamp(14 + p.th * 3 * s, 14, 160 * s), sh = h * .52, mx = sx - thPx / 2;
        // the object behind (vase with flowers) seen through the material
        const vx = sx + thPx / 2 + (ph ? 70 : 140) * s, vy = sy + 70 * s;
        const vase = () => Q26.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.moveTo(vx - 20 * s, vy); ctx.quadraticCurveTo(vx - 34 * s, vy - 40 * s, vx - 12 * s, vy - 70 * s); ctx.lineTo(vx + 12 * s, vy - 70 * s); ctx.quadraticCurveTo(vx + 34 * s, vy - 40 * s, vx + 20 * s, vy); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#15803d'; ctx.lineWidth = 3; [-.5, -.15, .2, .5].forEach((a, i) => { const tx = vx + Math.sin(a) * 60 * s, ty = vy - 70 * s - Math.cos(a) * 70 * s; ctx.beginPath(); ctx.moveTo(vx, vy - 66 * s); ctx.lineTo(tx, ty); ctx.stroke(); ctx.fillStyle = ['#f59e0b', '#ef4444', '#facc15', '#f97316'][i]; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(tx + Math.cos(k) * 8 * s, ty + Math.sin(k) * 8 * s, 6 * s, 0, TAU); ctx.fill(); } ctx.fillStyle = '#7c2d12'; ctx.beginPath(); ctx.arc(tx, ty, 5 * s, 0, TAU); ctx.fill(); }); ctx.restore(); });
        vase();
        // material slab
        Q26.raw(ctx, () => { ctx.save(); const op = m[1] === 'معتم', tr = m[1] === 'شفاف';
          if (!op && !tr) { ctx.save(); ctx.beginPath(); ctx.rect(sx + thPx / 2, sy - sh / 2, w, sh); ctx.clip(); ctx.filter = 'blur(' + (5 + p.th * .6) + 'px)'; ctx.globalAlpha = .9; ctx.restore(); }
          const gg = ctx.createLinearGradient(mx, 0, mx + thPx, 0); if (op) { gg.addColorStop(0, shade(m[4], -30)); gg.addColorStop(.5, m[4]); gg.addColorStop(1, shade(m[4], -40)); } else { gg.addColorStop(0, 'rgba(255,255,255,' + (tr ? .25 : .75) + ')'); gg.addColorStop(1, 'rgba(203,213,225,' + (tr ? .35 : .85) + ')'); }
          ctx.fillStyle = gg; ctx.fillRect(mx, sy - sh / 2, thPx, sh); ctx.strokeStyle = 'rgba(51,65,85,.6)'; ctx.lineWidth = 1.5; ctx.strokeRect(mx, sy - sh / 2, thPx, sh);
          if (p.m === 'wood') { ctx.strokeStyle = 'rgba(69,26,3,.4)'; for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.moveTo(mx + thPx * (k + .5) / 8, sy - sh / 2); ctx.bezierCurveTo(mx + thPx * (k + .2) / 8, sy - sh / 6, mx + thPx * (k + .8) / 8, sy + sh / 6, mx + thPx * (k + .5) / 8, sy + sh / 2); ctx.stroke(); } }
          if (p.m === 'frost') { ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let k = 0; k < 80; k++) { ctx.fillRect(mx + (k * 13.7) % thPx, sy - sh / 2 + (k * 37.1) % sh, 2, 2); } }
          ctx.restore(); });
        // what you see behind: blur/hide
        if (m[1] === 'شبه شفاف') Q26.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(241,245,249,.55)'; ctx.fillRect(sx + thPx / 2 + 2, sy - sh / 2, w, sh); ctx.restore(); });
        if (m[1] === 'معتم') Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(30,41,59,.92)'; ctx.fillRect(sx + thPx / 2 + 2, sy - sh / 2, w - sx - thPx / 2, sh); });
        if (m[1] === 'شفاف' && F.T < .6) Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,' + (.85 * (1 - F.T / .6)) + ')'; ctx.fillRect(sx + thPx / 2 + 2, sy - sh / 2, w, sh); });
        // eye on the light side looking through
        Q26.eye(ctx, x0 + 40 * s, sy + 40 * s, s * .9, 0);
        // rays: incident from a lamp upper-left → reflected, transmitted (refracted), absorbed
        if (p.ray !== false) { const P0 = [mx - (ph ? 120 : 220) * s, sy - 150 * s], H = [mx, sy - 20 * s], d0 = Q26.nrm([H[0] - P0[0], H[1] - P0[1]]);
          Q26.bulb(ctx, P0[0], P0[1], 12 * s, true);
          Q26.ray(ctx, [P0, H], '#ef4444', { w: 3 });
          if (F.R > .01) Q26.ray(ctx, [H, [H[0] - d0[0] * 140 * s, H[1] + d0[1] * 140 * s]], '#ef4444', { w: 1 + F.R * 6, alpha: .4 + F.R });
          if (F.T > .005) { const n = MAT[p.m] && p.m !== 'air' ? 1.5 : 1, r1 = Q26.refr(d0, [1, 0], 1, n) || d0, E = [mx + thPx, H[1] + r1[1] / r1[0] * thPx]; Q26.ray(ctx, [H, E, [E[0] + d0[0] * 150 * s, E[1] + d0[1] * 150 * s]], '#ef4444', { w: 1 + F.T * 3, alpha: .3 + .7 * F.T }); }
          if (F.A > .02) Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(234,88,12,.8)'; for (let k = 0; k < Math.round(F.A * 14); k++) { const a = k * 2.4 + S.t * 2; ctx.beginPath(); ctx.arc(mx + thPx / 2 + Math.cos(a) * thPx * .35, H[1] + 10 * s + Math.sin(a * 1.3) * 18 * s, 2.4, 0, TAU); ctx.fill(); } });
          if (p.lab !== false) { Q26.T(ctx, 'الضوء الساقط', (P0[0] + H[0]) / 2 - 10, (P0[1] + H[1]) / 2 - 16, { s: fs, w: 800, c: '#b91c1c' }); if (F.R > .01) Q26.T(ctx, 'الضوء المنعكس', H[0] - 90 * s, H[1] + 120 * s, { s: fs, w: 800, c: '#b91c1c' }); if (F.T > .005) Q26.T(ctx, 'الضوء النافذ (المنكسر)', mx + thPx + 90 * s, H[1] + 110 * s, { s: fs, w: 800, c: '#b91c1c', bg: 'rgba(255,255,255,.8)' }); }
        }
        if (p.lab !== false) Q26.T(ctx, m[0] + ' — ' + m[1], sx, sy - sh / 2 - 16, { s: fs + 1.5, w: 900, c: '#fff', bg: m[1] === 'شفاف' ? '#0284c7' : m[1] === 'معتم' ? '#334155' : '#7c3aed' });
        if (p.bars !== false) { const bx = ph ? 14 : x0 + 14, by = h - (ph ? 62 : 140), bw = ph ? w - 28 : Math.min(360, w * .45);
          C2.card(ctx, bx - 6, by - 22, bw + 12, 64, { bd: '#be185d' });
          let xx = bx; [['منعكس', F.R, '#ef4444'], ['نافذ', F.T, '#0ea5e9'], ['ممتص', F.A, '#ea580c']].forEach(q => { const ww = q[1] * bw; Q26.raw(ctx, () => { ctx.fillStyle = q[2]; ctx.fillRect(xx, by, Math.max(0, ww), 18); }); if (q[1] > .07) Q26.T(ctx, q[0] + ' ' + Math.round(q[1] * 100) + '%', xx + ww / 2, by + 30, { s: 10.5, w: 900, c: q[2] }); xx += ww; });
          Q26.T(ctx, 'توزيع الضوء الساقط (100%)', bx + bw / 2, by - 10, { s: 11, w: 900, c: '#be185d' }); }
      } else if (p.sc === 'fig5') {
        G.bg(ctx, w, h, false); const W = w - x0, X = f => x0 + W * f, Y = f => h * f;
        Q26.raw(ctx, () => { ctx.fillStyle = '#f5f5f4'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#d6d3d1'; ctx.fillRect(0, Y(.78), w, h); // window
          const wx = X(.1), wy = Y(.08), ww = W * .8, wh = Y(.62); const sk = ctx.createLinearGradient(0, wy, 0, wy + wh); sk.addColorStop(0, '#bae6fd'); sk.addColorStop(1, '#ecfccb'); ctx.fillStyle = sk; ctx.fillRect(wx, wy, ww, wh); ctx.fillStyle = '#86efac'; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.arc(wx + ww * (k + .5) / 7, wy + wh * .55, 34 * s, 0, TAU); ctx.fill(); }
          // lower decorated translucent curtain
          ctx.fillStyle = 'rgba(255,255,255,.82)'; ctx.fillRect(wx, wy + wh * .45, ww, wh * .55); ctx.strokeStyle = 'rgba(148,163,184,.6)'; ctx.lineWidth = 1.2; for (let i = 0; i < 18; i++) for (let j = 0; j < 7; j++) { ctx.beginPath(); ctx.arc(wx + ww * (i + .5) / 18, wy + wh * .45 + wh * .55 * (j + .5) / 7, 6, 0, TAU); ctx.stroke(); }
          ctx.strokeStyle = '#fafaf9'; ctx.lineWidth = 9; ctx.strokeRect(wx, wy, ww, wh); });
        // table, vase, cup, book, chair
        Q26.raw(ctx, () => { const tx = X(.3), ty = Y(.66); ctx.fillStyle = '#c2410c'; ctx.beginPath(); ctx.ellipse(tx, ty, 80 * s, 18 * s, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#9a3412'; ctx.fillRect(tx - 6, ty, 12, Y(.95) - ty); ctx.beginPath(); ctx.ellipse(tx, Y(.95), 40 * s, 8 * s, 0, 0, TAU); ctx.fill();
          ctx.fillStyle = 'rgba(186,230,253,.55)'; ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(tx - 40 * s, ty - 6); ctx.lineTo(tx - 46 * s, ty - 60 * s); ctx.lineTo(tx - 14 * s, ty - 60 * s); ctx.lineTo(tx - 20 * s, ty - 6); ctx.closePath(); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#facc15'; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(tx - 30 * s + Math.cos(k * 1.3) * 18 * s, ty - 78 * s + Math.sin(k * 1.3) * 12 * s, 9 * s, 0, TAU); ctx.fill(); }
          ctx.fillStyle = '#fafaf9'; ctx.strokeStyle = '#a8a29e'; rr(ctx, tx + 10 * s, ty - 26 * s, 24 * s, 22 * s, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#1e3a8a'; ctx.fillRect(tx + 40 * s, ty - 14 * s, 44 * s, 9 * s);
          const cx2 = X(.7), cy2 = Y(.62); ctx.fillStyle = '#fafaf9'; ctx.strokeStyle = '#d6d3d1'; rr(ctx, cx2 - 70 * s, cy2 - 90 * s, 140 * s, 110 * s, 30 * s); ctx.fill(); ctx.stroke(); rr(ctx, cx2 - 85 * s, cy2 - 10 * s, 170 * s, 60 * s, 18 * s); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#f9a8d4'; ctx.beginPath(); ctx.ellipse(cx2 + 20 * s, cy2 - 20 * s, 30 * s, 18 * s, 0, 0, TAU); ctx.fill(); });
        const pos = D.f5pos(S, w, h, x0, s);
        Object.keys(F5).forEach(k => { const P = pos[k], it = F5[k], sn = S.seen[k]; Q26.T(ctx, sn ? it[0] + ': ' + it[1] : it[0] + ' ؟', P[0], P[1], { s: fs, w: 900, c: sn ? '#fff' : '#1e293b', bg: sn ? (it[1] === 'شفاف' ? '#0284c7' : it[1] === 'معتم' ? '#334155' : '#7c3aed') : 'rgba(255,255,255,.9)' }); });
        Q26.T(ctx, 'صنّفت ' + Object.keys(S.seen).length + ' من ' + Object.keys(F5).length, cx, h - 30, { s: fs + 1, w: 900, c: '#fff', bg: '#be185d' });
      } else {
        G.bg(ctx, w, h, false); const sy = h * .16, dep = p.dep, I = Math.exp(-dep / 15), dy = sy + (h * .8 - sy) * dep / 80;
        Q26.raw(ctx, () => { ctx.fillStyle = '#7dd3fc'; ctx.fillRect(0, 0, w, sy); const gg = ctx.createLinearGradient(0, sy, 0, h); gg.addColorStop(0, '#0ea5e9'); gg.addColorStop(.35, '#0369a1'); gg.addColorStop(.7, '#082f49'); gg.addColorStop(1, '#020617'); ctx.fillStyle = gg; ctx.fillRect(0, sy, w, h - sy); ctx.fillStyle = '#1c1917'; ctx.fillRect(0, h * .93, w, h * .07); });
        Q26.sun(ctx, x0 + 50, sy * .5, 18 * s, S.t);
        if (p.ray !== false) Q26.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let k = 0; k < 6; k++) { const x = x0 + (w - x0) * (k + .5) / 6; const gr = ctx.createLinearGradient(0, sy, 0, h); gr.addColorStop(0, 'rgba(254,249,195,.35)'); gr.addColorStop(.5, 'rgba(254,249,195,.06)'); gr.addColorStop(1, 'rgba(254,249,195,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x - 10, sy); ctx.lineTo(x + 10, sy); ctx.lineTo(x + 50, h); ctx.lineTo(x + 20, h); ctx.closePath(); ctx.fill(); } ctx.restore(); });
        // diver
        const dx = cx; Q26.raw(ctx, () => { ctx.save(); ctx.translate(dx, dy); ctx.fillStyle = shade('#facc15', Math.round(-170 * (1 - I))); rr(ctx, -30 * s, -10 * s, 60 * s, 20 * s, 10 * s); ctx.fill(); ctx.fillStyle = shade('#1f2937', 0); ctx.beginPath(); ctx.arc(36 * s, -2 * s, 11 * s, 0, TAU); ctx.fill(); ctx.fillStyle = shade('#64748b', Math.round(-60 * (1 - I))); rr(ctx, -24 * s, -22 * s, 36 * s, 12 * s, 5); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(-30 * s, -4 * s); ctx.lineTo(-58 * s, -14 * s); ctx.lineTo(-58 * s, 10 * s); ctx.closePath(); ctx.fill(); ctx.restore(); });
        Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(2,6,23,' + (1 - I) * .6 + ')'; ctx.fillRect(0, sy, w, h - sy); });
        if (p.lab !== false) { Q26.T(ctx, 'العمق ' + dep + ' m — الضوء الواصل ≈ ' + Math.round(I * 100) + ' %', dx, dy - 44 * s, { s: fs + 1, w: 900, c: '#fff', bg: 'rgba(3,105,161,.9)' }); Q26.T(ctx, 'سطح البحر', w - 70, sy - 12, { s: fs, w: 800, c: '#0c4a6e' }); }
        S._dv = [dx, dy];
      }
      Q26.banner(ctx, w, p.sc === 'slab' ? 'غيّر المادة وسمكها' : p.sc === 'fig5' ? 'اضغط على الأجسام لتصنيفها' : 'اسحب الغواص إلى الأعمق', '#be185d', 20); K.party(ctx, S);
    },
    f5pos(S, w, h, x0, s) { const W = w - x0, X = f => x0 + W * f, Y = f => h * f; return { up: [X(.5), Y(.18)], low: [X(.5), Y(.48)], chair: [X(.7), Y(.6)], table: [X(.3), Y(.74)], vase: [X(.3) - 30 * s, Y(.66) - 100 * s], cup: [X(.3) + 22 * s, Y(.66) - 44 * s], book: [X(.3) + 62 * s, Y(.66) + 10 * s] }; },
    drags(S) { if (!S.W) return []; const w = S.W, h = S.H, p = S.p, ph = w < 600, s = Q26.sc(w, h), x0 = ph ? 8 : 70;
      if (p.sc === 'fig5') { const pos = D.f5pos(S, w, h, x0, s); return Object.keys(F5).map(k => ({ id: 'f5' + k, x: pos[k][0], y: pos[k][1], w: 110, h: 34, tip: 'اضغط لتصنيف الجسم', hint: k === 'up', click: S => { const was = Object.keys(S.seen).length; S.seen = Object.assign({}, S.seen, { [k]: 1 }); S.sel = k; S.ns = Object.keys(S.seen).length; if (S.ns === 7 && was < 7) K.cheer(S, S.W / 2, S.H / 3); } })); }
      if (p.sc === 'sea' && S._dv) { const sy = h * .16; return [{ id: 'diver', x: S._dv[0], y: S._dv[1], w: 130, h: 60, axis: 'y', keep: true, tip: 'اسحب الغواص إلى الأعمق', idle: 'اسحب للأسفل ✋', drag: (S, d) => setParam(S, 'dep', Math.round((d.y - sy) / (h * .8 - sy) * 80)) }]; }
      if (p.sc === 'slab') { const sx = x0 + (w - x0) * (ph ? .5 : .42), thPx = clamp(14 + p.th * 3 * s, 14, 160 * s); return [{ id: 'slab', x: sx + thPx / 2, y: h * .5 + h * .2, w: 40, h: 60, axis: 'x', keep: true, tip: 'اسحب حافة المادة لتغيير سمكها', idle: 'غيّر السمك ✋', drag: (S, d) => setParam(S, 'th', Math.round(((d.x - sx) * 2 - 14) / (3 * s) * 2) / 2) }]; }
      return []; },
    readings(S) { if (S.p.sc === 'slab') { const F = D.frac(S), m = MAT[S.p.m]; return [rd('المادة', m[0]), rd('النوع', m[1]), rd('المنعكس', Math.round(F.R * 100) + ' %'), rd('النافذ', Math.round(F.T * 100) + ' %'), rd('الممتص', Math.round(F.A * 100) + ' %')]; } if (S.p.sc === 'sea') return [rd('العمق', S.p.dep + ' m'), rd('الضوء الواصل', Math.round(Math.exp(-S.p.dep / 15) * 100) + ' %')]; return [rd('المصنّفة', Object.keys(S.seen).length + ' / 7')]; },
    record(S) { if (S.p.sc !== 'slab') return null; const F = D.frac(S); return { m: MAT[S.p.m][0], th: S.p.th, R: Math.round(F.R * 100), T: Math.round(F.T * 100), A: Math.round(F.A * 100) }; },
    cols: [['m', 'المادة'], ['th', 'السمك (cm)'], ['R', 'منعكس %'], ['T', 'نافذ %'], ['A', 'ممتص %']],
    explain(S) { const p = S.p;
      if (p.sc === 'fig5') { const it = F5[S.sel]; return Q26.ex(it ? '<b>' + it[0] + '</b>: ' + it[1] + '.' : 'نافذة علوية شفافة، وستارة سفلية مزخرفة، وأثاث.', 'الشفاف يسمح بنفاذ الضوء فنرى ما خلفه بوضوح، وشبه الشفاف ينفذ قليلاً منه فنرى ما خلفه بغير وضوح، والمعتم لا ينفذ منه الضوء.', 'زجاج الحمّام محبب (شبه شفاف) ليدخل الضوء دون أن يرى الآخرون ما في الداخل.'); }
      if (p.sc === 'sea') return Q26.ex('كلما نزل الغواص أعمق أصبح المكان أكثر ظلمة.', 'الماء وسط شفاف لكنه يمتص جزءاً من الضوء في كل متر، فيتناقص الضوء النافذ بزيادة سمك الماء، ولذلك نرى قاع البحر مظلماً.', 'يحمل الغواصون مصابيح قوية في الأعماق.');
      const m = MAT[p.m], F = D.frac(S); return Q26.ex(m[1] === 'شفاف' ? 'نرى المزهرية خلف ' + m[0] + ' بوضوح، والضوء النافذ ' + Math.round(F.T * 100) + '%.' : m[1] === 'معتم' ? 'لا نرى المزهرية أبداً: لا ينفذ أي ضوء من ' + m[0] + '.' : 'نرى المزهرية ضبابية غير واضحة.',
        'عندما يسقط الضوء على مادة ينعكس جزء منه وينفذ جزء ويمتص المتبقي. المادة الشفافة تنفذ معظمه، وشبه الشفافة تنفذ قليلاً، والمعتمة لا تنفذ شيئاً. وكلما زاد السمك قلّ النافذ.', 'زجاج النافذة يدخل الضوء إلى الغرفة، والستارة السميكة المعتمة تحجبه.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

M8.merge({ id: 'g8_light_what', ch: 26, sec: 'الدرس 1: الضوء وخصائصه', page: 71, kind: 'نشاط', fig: 'الشكل 1 – الشكل 5',
  title: 'الضوء: مصادره وطيفه وخصائصه وسلوكه في الأوساط',
  desc: 'تجربة بخمسة أجزاء: (1) الأجسام المضيئة والمستضيئة، (2) الطيف المرئي وسرعة الضوء c = λ f، (3) الضوء يسير بخطوط مستقيمة واستقلالية الأشعة، (4) نشاط: الضوء لا يحتاج إلى وسط ناقل، (5) المواد الشفافة وشبه الشفافة والمعتمة.',
  tags: 'الضوء خصائص الضوء طيف مرئي',
  fact: ['الضوء أسرع شيء في الكون: 3×10⁸ m/s، أي أنه يدور حول الأرض 7.5 مرات في الثانية الواحدة!', 'يختلف الضوء عن الصوت: الضوء موجة كهرومغناطيسية تنتقل في الفراغ، والصوت موجة ميكانيكية تحتاج إلى وسط مادي.'],
  quiz: [
    { q: 'الأجسام التي تبعث الضوء بذاتها نسمّيها أجساماً .........', o: ['مستضيئة', 'مضيئة', 'معتمة'], a: 1, why: 'مراجعة الفصل س1-6: الأجسام المضيئة كالشمس والنجوم والمصباح.' },
    { q: 'المواد التي لا يمكن رؤية الأشياء خلفها تسمى .........', o: ['المواد الشفافة', 'المواد شبه الشفافة', 'المواد المعتمة'], a: 2, why: 'مراجعة الفصل س1-2 (ص 87).' },
    { q: 'يحافظ كل شعاع على مساره عند تقاطع الأشعة الضوئية، ماذا تسمى هذه الخاصية؟', o: ['مبدأ استقلالية الأشعة الضوئية', 'انعكاس الضوء', 'انكسار الضوء'], a: 0, why: 'مراجعة الدرس س5 (ص 74).' }],
  parts: [{ id: 'g8_lum', n: 'الأجسام المضيئة والمستضيئة' }, { id: 'g8_spectrum', n: 'الطيف المرئي وسرعة الضوء' }, { id: 'g8_straight', n: 'خطوط مستقيمة واستقلالية الأشعة' }, { id: 'g8_vacuum', n: 'نشاط: الضوء لا يحتاج إلى وسط ناقل' }, { id: 'g8_media', n: 'الشفافة وشبه الشفافة والمعتمة' }] });

/* =========================================================================================
   C1) نشاط: إثبات القانون الأول للانعكاس (ص 76) + المفاهيم المتعلقة بانعكاس الضوء (ص 75، الشكل 1)
   ========================================================================================= */
(() => {
  const D = { id: 'g8_refl_law', page: 75, fig: 'الشكل 1 + نشاط ص 76',
    desc: 'انعكاس الضوء: ارتداد الشعاع الضوئي الساقط على سطح صقيل إلى الوسط نفسه الذي قدم منه. بالورقة والمنقلة والمرآة المستوية وضوء الليزر نقيس زاوية السقوط وزاوية الانعكاس ونثبت القانون الأول.',
    tags: 'انعكاس الضوء القانون الأول للانعكاس زاوية السقوط زاوية الانعكاس العمود المقام الشعاع المنعكس منقلة مرآة مستوية ليزر',
    tools: ['ورقة', 'منقلة', 'مرآة مستوية', 'ضوء ليزر', 'نظارات واقية'],
    steps: ['أحضر ورقة ومنقلة ومرآة مستوية وضوء ليزر (استعمل نظارات لأحمي عيني من ضوء الليزر).', 'ضع الورقة على سطح المنضدة، وضع عليها المنقلة، وثبّت المرآة المستوية بوضع عمودي مع المنضدة.', 'وجّه ضوء الليزر على سطح المرآة بحيث يصنع زاوية 40° (اضغط «40°» أو اسحب الليزر). ماذا ألاحظ؟ اضغط «سجّل».', 'كرّر الخطوة 3 ولكن بزاوية أخرى (اسحب الليزر) وسجّل. ماذا ألاحظ؟', 'ما مقدار كل من زاوية السقوط وزاوية الانعكاس؟ قارن بينهما في الجدول.'],
    concl: ['القانون الأول للانعكاس: زاوية السقوط = زاوية الانعكاس.', 'القانون الثاني للانعكاس: الشعاع الضوئي الساقط والشعاع المنعكس والعمود المقام من نقطة السقوط تقع جميعها في مستوٍ واحد عمودي على السطح العاكس (مستوى الورقة).', 'زاوية السقوط: الزاوية المحصورة بين الشعاع الساقط والعمود المقام. زاوية الانعكاس: المحصورة بين الشعاع المنعكس والعمود المقام.', 'إذا صنع الشعاع زاوية 40° مع سطح المرآة فإن زاوية السقوط = 90° − 40° = 50° = زاوية الانعكاس.'],
    laws: ['g8_refl'],
    controls: [BT('', [{ t: '40°', on: S => { S.th = 40; } }, { t: '40° مع السطح (س5)', on: S => { S.th = 50; } }, { t: '0° (عمودي)', on: S => { S.th = 0; } }]),
      TG('nm', 'العمود المقام', true, null, 'vector'), TG('ang', 'زاويتا السقوط والانعكاس', true, null, 'labels'), TG('surf', 'الزاوية مع سطح المرآة', false, null, 'dot'), TG('names', 'أسماء الأشعة (الشكل 1)', true, null, 'labels'), TG('pl', 'القانون الثاني: المستوي الواحد', false, null, 'eye')],
    setup(S) { S.th = 40; S.rows = S.rows || []; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, s = Q26.sc(w, h), cx = Q26.cx(w), my = h * (ph ? .66 : .7), Rp = Math.min((w - (ph ? 20 : 90)) * .32, h * .4, 240), Rl = Rp * 1.45; return { w, h, ph, s, cx, my, Rp, Rl, O: [cx, my] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, th = S.th * Math.PI / 180, fs = g.ph ? 10.5 : 12.5, O = g.O;
      Q26.room(ctx, w, h, 0, { top: '#78350f', bot: '#78350f' }); Q26.raw(ctx, () => { const wg = ctx.createLinearGradient(0, 0, w, h); wg.addColorStop(0, '#a16207'); wg.addColorStop(1, '#713f12'); ctx.fillStyle = wg; ctx.fillRect(0, 0, w, h); });
      Q26.paper(ctx, g.cx, g.my - g.Rl * .42, Math.min(w - 20, g.Rl * 2.3), g.Rl * 1.25);
      Q26.protractor(ctx, O[0], O[1], g.Rp, -1);
      const Lp = [O[0] - Math.sin(th) * g.Rl, O[1] - Math.cos(th) * g.Rl], Rf = [O[0] + Math.sin(th) * g.Rl * 1.05, O[1] - Math.cos(th) * g.Rl * 1.05];
      if (p.nm !== false) Q26.normal(ctx, O[0], O[1] - g.Rl * .55, -Math.PI / 2, g.Rl * .55, '#0f172a', p.names !== false ? 'العمود المقام' : '');
      Q26.ray(ctx, [Lp, O, Rf], '#ef4444', { w: 3 });
      Q26.mirror(ctx, [O[0] - g.Rp * 1.25, O[1] + 1], [O[0] + g.Rp * 1.25, O[1] + 1], [0, 1], { th: 10 });
      Q26.laser(ctx, Lp[0], Lp[1], Math.atan2(O[1] - Lp[1], O[0] - Lp[0]), g.s);
      // angles
      if (p.ang !== false && Math.abs(S.th) > .5) { const up = -Math.PI / 2, ai = Math.atan2(Lp[1] - O[1], Lp[0] - O[0]), ar = Math.atan2(Rf[1] - O[1], Rf[0] - O[0]);
        Q26.arc(ctx, O[0], O[1], g.Rp * .4, up, ai, '#2563eb', 'i = ' + Math.round(Math.abs(S.th)) + '°', { fill: 'rgba(37,99,235,.15)', s: fs });
        Q26.arc(ctx, O[0], O[1], g.Rp * .4 + 8, up, ar, '#16a34a', 'r = ' + Math.round(Math.abs(S.th)) + '°', { fill: 'rgba(22,163,74,.15)', s: fs }); }
      if (p.surf) { const ai = Math.atan2(Lp[1] - O[1], Lp[0] - O[0]), base = S.th >= 0 ? Math.PI : 0; Q26.arc(ctx, O[0], O[1], g.Rp * .24, base, ai, '#9333ea', (90 - Math.round(Math.abs(S.th))) + '° مع السطح', { s: fs - 1, lr: 34 }); }
      if (p.names !== false) { Q26.T(ctx, 'الشعاع الساقط', (Lp[0] * .45 + O[0] * .55) - 40 * Math.sign(S.th || 1), (Lp[1] * .45 + O[1] * .55) - 14, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' }); Q26.T(ctx, 'الشعاع المنعكس', (Rf[0] * .55 + O[0] * .45) + 44 * Math.sign(S.th || 1), (Rf[1] * .55 + O[1] * .45) - 14, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' }); Q26.T(ctx, 'مرآة مستوية', O[0] + g.Rp * .95, O[1] + 24, { s: fs, w: 900, c: '#fff', bg: '#0369a1' }); Q26.T(ctx, 'نقطة السقوط', O[0], O[1] + 24, { s: fs - 1, w: 800, c: '#fff', bg: 'rgba(0,0,0,.5)' }); }
      // plane inset (second law)
      if (p.pl) { const bx = g.ph ? 12 : 80, by = g.ph ? h - 140 : h - 200, W = 170, H = 110; C2.card(ctx, bx - 6, by - 26, W + 12, H + 40, { bd: '#7c3aed' }); Q26.T(ctx, 'منظر جانبي: المستوي الواحد', bx + W / 2, by - 12, { s: 11, w: 900, c: '#6d28d9' });
        Q26.raw(ctx, () => { const P = (x, y, z) => [bx + 20 + x + y * .55, by + H - 10 - z - y * .35]; const q = [P(0, 0, 0), P(130, 0, 0), P(130, 80, 0), P(0, 80, 0)]; ctx.fillStyle = 'rgba(250,250,249,.95)'; ctx.strokeStyle = '#94a3b8'; ctx.beginPath(); q.forEach((v, i) => i ? ctx.lineTo(v[0], v[1]) : ctx.moveTo(v[0], v[1])); ctx.closePath(); ctx.fill(); ctx.stroke();
          const m = [P(0, 10, 0), P(130, 10, 0), P(130, 10, 55), P(0, 10, 55)]; ctx.fillStyle = 'rgba(125,211,252,.6)'; ctx.beginPath(); m.forEach((v, i) => i ? ctx.lineTo(v[0], v[1]) : ctx.moveTo(v[0], v[1])); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#0369a1'; ctx.stroke();
          const Oo = P(65, 10, 0), A = P(65 - Math.sin(th) * 60, 10 + Math.cos(th) * 60, 0), B = P(65 + Math.sin(th) * 60, 10 + Math.cos(th) * 60, 0), N = P(65, 75, 0); ctx.setLineDash([4, 3]); ctx.strokeStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(Oo[0], Oo[1]); ctx.lineTo(N[0], N[1]); ctx.stroke(); ctx.setLineDash([]); ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(Oo[0], Oo[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); }); }
      if (!g.ph) Q26.card(ctx, S, [{ t: 'زاوية السقوط i = ' + Math.round(Math.abs(S.th)) + '°', c: '#1d4ed8', w: 900 }, { t: 'زاوية الانعكاس r = ' + Math.round(Math.abs(S.th)) + '°', c: '#15803d', w: 900 }, { t: 'i = r ⟸ القانون الأول للانعكاس ✓', c: '#b91c1c', w: 900 }], { title: 'القياس بالمنقلة', bd: '#b91c1c', y: 44, wd: 250 });
      Q26.banner(ctx, w, 'اسحب الليزر حول المنقلة', '#be185d', 20);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), th = S.th * Math.PI / 180, Lp = [g.O[0] - Math.sin(th) * g.Rl, g.O[1] - Math.cos(th) * g.Rl], a = Math.atan2(g.O[1] - Lp[1], g.O[0] - Lp[0]);
      return [{ id: 'laser', x: Lp[0] - Math.cos(a) * 36 * g.s, y: Lp[1] - Math.sin(a) * 36 * g.s, r: 36, cx: g.O[0], cy: g.O[1], keep: true, tip: 'اسحب الليزر لتغيير زاوية السقوط', idle: 'حرّك الليزر ✋', drag: (S, d) => { const v = Math.atan2(-(d.x - g.O[0]), -(d.y - g.O[1])) * 180 / Math.PI; S.th = Math.round(clamp(v, -85, 85)); } }]; },
    readings(S) { const t = Math.round(Math.abs(S.th)); return [rd('زاوية السقوط i', t + '°'), rd('زاوية الانعكاس r', t + '°'), rd('الزاوية مع سطح المرآة', (90 - t) + '°')]; },
    record(S) { const t = Math.round(Math.abs(S.th)); if (S.rows && S.rows.length >= 2) K.cheer(S, S.W / 2, S.H / 3); return { i: t, r: t, s: 90 - t }; },
    cols: [['i', 'زاوية السقوط i (°)'], ['r', 'زاوية الانعكاس r (°)'], ['s', 'الزاوية مع السطح (°)']],
    graph: { x: 'i', y: 'r', xl: 'زاوية السقوط (°)', yl: 'زاوية الانعكاس (°)', theory: x => x, xmin: 0, xmax: 90 },
    explain(S) { const t = Math.round(Math.abs(S.th)); return Q26.ex('الشعاع يرتد عن المرآة في الجهة الأخرى من العمود المقام، وزاوية الانعكاس ' + t + '° تساوي زاوية السقوط ' + t + '°.' + (t === 0 ? ' الشعاع العمودي يرتد على نفسه.' : ''),
      'المرآة سطح صقيل ناعم، فيرتد الضوء عنه بانتظام بالزاوية نفسها التي سقط بها، والشعاعان والعمود كلها على مستوى الورقة (القانون الثاني).', 'لاعب البلياردو يستعمل القانون نفسه عندما ترتد الكرة عن حافة الطاولة.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   C2) الانعكاس المنتظم والانعكاس غير المنتظم (ص 75) — مقارنة جنباً إلى جنب
   ========================================================================================= */
(() => {
  const SM = { mir: ['سطح المرآة', '#bae6fd'], al: ['الألمنيوم', '#d4d4d8'], wat: ['سطح ماء ساكن', '#38bdf8'] };
  const RO = { wool: ['الصوف', '#e7e5e4'], leaf: ['ورق الشجر', '#4d7c0f'], wood: ['سطح طاولة خشبية', '#a16207'] };
  const D = { id: 'g8_refl_types', page: 75, fig: 'انعكاس منتظم / انعكاس غير منتظم ص 75',
    desc: 'يصنف انعكاس الضوء حسب السطح العاكس إلى: انعكاس منتظم (الأشعة ترتد في اتجاه واحد عند سقوطها على سطح صقيل) وانعكاس غير منتظم (الأشعة ترتد في اتجاهات متعددة عند سقوطها على سطح خشن).',
    tags: 'انعكاس منتظم غير منتظم سطح صقيل خشن مرآة ألمنيوم ماء صوف ورق شجر خشب مقارنة',
    tools: ['حزمة أشعة متوازية', 'سطح صقيل', 'سطح خشن'],
    steps: ['حزمة الأشعة المتوازية نفسها تسقط على سطحين: صقيل (يساراً) وخشن (يميناً).', 'اسحب مصدر الأشعة لتغيير زاوية السقوط ولاحظ اتجاهات الأشعة المنعكسة في كل سطح.', 'زد خشونة السطح الخشن، وجرّب سطح الماء بعد أن تحركه الريح (خشونة أكبر).', 'شغّل «الأعمدة المقامة»: هل يتحقق قانون الانعكاس لكل شعاع حتى على السطح الخشن؟ (التفكير الناقد س1)'],
    concl: ['الانعكاس المنتظم: ترتد الأشعة في اتجاه واحد بالزاوية نفسها عند سقوطها على سطح صقيل (المرآة، الألمنيوم، سطح ماء ساكن).', 'الانعكاس غير المنتظم: ترتد الأشعة في اتجاهات متعددة وبزوايا مختلفة عند سقوطها على سطح خشن (الصوف، ورق الشجر، سطح الطاولة الخشبية).', 'قانونا الانعكاس يتحققان لكل شعاع في الحالتين، لكن الأعمدة المقامة في السطح الخشن باتجاهات مختلفة.', 'بفضل الانعكاس غير المنتظم نرى الأجسام من جميع الاتجاهات.'],
    laws: ['g8_refl'],
    controls: [SEL('sm', 'السطح الصقيل', Object.entries(SM).map(([k, v]) => [k, v[0]]), 'mir'), SEL('ro', 'السطح الخشن', Object.entries(RO).map(([k, v]) => [k, v[0]]), 'wood'), R('rough', 'خشونة السطح الخشن', .1, 1, .7, .05, ''),
      TG('nm', 'الأعمدة المقامة عند كل نقطة', false, null, 'vector'), TG('lab', 'الأسماء', true, null, 'labels')],
    setup(S) { S.th = 35; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 6 : 70, mid = (x0 + w) / 2, sy = h * .72; return { w, h, ph, x0, mid, sy, s: Q26.sc(w, h), pw: (w - x0) / 2 }; },
    prof(S, xa, xb, y, rough) { const n = 26, pts = []; for (let k = 0; k <= n; k++) { const f = k / n, j = Math.sin(k * 12.9898 + 78.233) * 43758.5453, rnd = j - Math.floor(j); pts.push([xa + (xb - xa) * f, y + (k % 2 ? -1 : 1) * rough * (6 + rnd * 12) - rough * rnd * 6]); } return pts; },
    panel(ctx, S, g, xa, xb, smooth) {
      const p = S.p, th = S.th * Math.PI / 180, s = g.s, fs = g.ph ? 9.5 : 12, cxp = (xa + xb) / 2;
      const prof = smooth ? (p.sm === 'wat' && false ? [] : [[xa + 6, g.sy], [xb - 6, g.sy]]) : D.prof(S, xa + 6, xb - 6, g.sy, p.rough);
      // surface body
      Q26.raw(ctx, () => { ctx.save(); const col = smooth ? SM[p.sm][1] : RO[p.ro][1]; ctx.beginPath(); ctx.moveTo(prof[0][0], g.h); prof.forEach(q => ctx.lineTo(q[0], q[1])); ctx.lineTo(prof[prof.length - 1][0], g.h); ctx.closePath(); const gg = ctx.createLinearGradient(0, g.sy - 20, 0, g.h); gg.addColorStop(0, col); gg.addColorStop(1, shade(col, -70)); ctx.fillStyle = gg; ctx.fill(); ctx.strokeStyle = smooth ? '#f8fafc' : shade(col, -50); ctx.lineWidth = smooth ? 3 : 1.5; ctx.beginPath(); prof.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.restore(); });
      // rays: parallel bundle, direction d
      const d = [Math.sin(th), Math.cos(th)], perp = [d[1], -d[0]], n = 7, sp = 13 * s;
      const C = [cxp, g.sy], src = [C[0] - d[0] * g.sy * .62, C[1] - d[1] * g.sy * .62];
      const segs = []; for (let k = 0; k < prof.length - 1; k++) segs.push([prof[k], prof[k + 1]]);
      Q26.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(xa, 40, xb - xa, g.h); ctx.clip(); });
      for (let k = 0; k < n; k++) { const o = (k - (n - 1) / 2) * sp, col = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6'][k]; let P = [src[0] + perp[0] * o, src[1] + perp[1] * o], dd = d; const pts = [P];
        for (let b = 0; b < 4; b++) { let best = null; segs.forEach(sg => { const r = Q26.seg(P, dd, sg[0], sg[1]); if (r && r.t > .5 && (!best || r.t < best.t)) best = Object.assign(r, { sg }); });
          if (!best) { pts.push([P[0] + dd[0] * g.sy, P[1] + dd[1] * g.sy]); break; } let nn = Q26.nrm([-(best.sg[1][1] - best.sg[0][1]), best.sg[1][0] - best.sg[0][0]]); if (nn[1] > 0) nn = [-nn[0], -nn[1]];
          pts.push(best.pt); if (p.nm && b === 0) Q26.normal(ctx, best.pt[0] + nn[0] * 22, best.pt[1] + nn[1] * 22, Math.atan2(nn[1], nn[0]), 22, '#e2e8f0'); dd = Q26.refl(dd, nn); P = best.pt; }
        Q26.ray(ctx, pts, col, { w: 2, glow: false }); }
      Q26.raw(ctx, () => { ctx.restore(); });
      Q26.raybox(ctx, src[0], src[1], Math.atan2(d[1], d[0]), s, (n - 1) * sp + 22 * s);
      if (p.lab !== false) { Q26.T(ctx, smooth ? 'انعكاس منتظم' : 'انعكاس غير منتظم', cxp, g.sy + 34, { s: fs + 2, w: 900, c: '#fff', bg: smooth ? '#0369a1' : '#9a3412' }); Q26.T(ctx, smooth ? SM[p.sm][0] + ' (صقيل)' : RO[p.ro][0] + ' (خشن)', cxp, g.sy + 62, { s: fs, w: 800, c: '#1e293b', bg: 'rgba(255,255,255,.85)' }); }
      return src;
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q26.room(ctx, w, h, h, { top: '#0f172a', bot: '#1e293b' });
      Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(g.mid - 1, 40, 2, h - 40); });
      const s1 = D.panel(ctx, S, g, g.x0, g.mid, true); D.panel(ctx, S, g, g.mid, w, false); S._src = s1;
      Q26.T(ctx, 'زاوية السقوط ' + Math.round(S.th) + '°', (g.x0 + g.mid) / 2, 56, { s: 12, w: 900, c: '#fde047' });
      Q26.banner(ctx, w, 'اسحب مصدر الأشعة (يساراً) لتغيير الزاوية', '#be185d', 20);
    },
    drags(S) { if (!S.W || !S._src) return []; const g = D.geo(S), C = [(g.x0 + g.mid) / 2, g.sy]; return [{ id: 'box', x: S._src[0], y: S._src[1], r: 34, cx: C[0], cy: C[1], keep: true, tip: 'اسحب لتغيير زاوية سقوط الأشعة', idle: 'حرّك المصدر ✋', drag: (S, d) => { S.th = Math.round(clamp(Math.atan2(C[0] - d.x, C[1] - d.y) * 180 / Math.PI, -70, 70)); } }]; },
    readings(S) { return [rd('زاوية سقوط الحزمة', Math.round(S.th) + '°'), rd('الصقيل', 'الأشعة المنعكسة متوازية'), rd('الخشن', 'الأشعة المنعكسة مبعثرة')]; },
    explain(S) { return Q26.ex('على السطح الصقيل بقيت الأشعة المنعكسة متوازية في اتجاه واحد، أما على السطح الخشن فتبعثرت في اتجاهات كثيرة.', 'في كل نقطة يتحقق قانون الانعكاس (زاوية السقوط = زاوية الانعكاس)، لكن السطح الخشن مكوّن من أجزاء صغيرة مائلة باتجاهات مختلفة، فلكل شعاع عمود مقام مختلف.', 'نرى صورتنا في سطح الماء الساكن، ولا نراها على سطح الطاولة الخشبية، لكننا نرى الطاولة نفسها من كل مكان في الغرفة.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   C3) صفات الصورة المتكونة في المرآة المستوية (ص 76، الشكل 2) — التفاحة والعين، معكوسة جانبياً، كلمة إسعاف
   ========================================================================================= */
(() => {
  const SC = { apple: 'الشكل 2: التفاحة والعين', person: 'معتدلة ومعكوسة جانبياً', amb: 'كلمة «إسعاف» المعكوسة' };
  const D = { id: 'g8_plane_img', page: 76, fig: 'الشكل 2 + صورة الشخص أمام المرآة',
    desc: 'عند وضع جسم أمام مرآة مستوية نشاهد له صورة: بكبر الجسم، معتدلة ومعكوسة جانبياً، وهمية تبدو خلف المرآة (تكونت من تلاقي امتدادات الأشعة المنعكسة)، وبعد الجسم عن المرآة يساوي بعد الصورة عنها.',
    tags: 'المرآة المستوية صفات الصورة وهمية معتدلة معكوسة جانبياً بعد الجسم بعد الصورة إسعاف تفاحة عين',
    tools: ['مرآة مستوية', 'تفاحة', 'عين الناظر'],
    steps: ['الشكل (2): اسحب التفاحة نحو المرآة وبعيداً عنها، ولاحظ أن بعد الصورة يساوي بعد الجسم دائماً.', 'اسحب العين: الشعاعان المنعكسان يدخلان العين، وامتداداهما (الخطوط المتقطعة) يتلاقيان خلف المرآة في موضع الصورة الوهمية.', 'سؤال ص 76: لو وقفت على بعد 100 cm من مرآة مستوية فما بعد الصورة عنها؟ ضع التفاحة على 100 cm.', 'المشهد الثاني: ارفع يدك اليمنى: أي يد ترفع الصورة؟', 'المشهد الثالث: لماذا تكتب كلمة «إسعاف» معكوسة على مقدمة سيارة الإسعاف؟ انظر إليها في مرآة السيارة الأمامية.'],
    concl: ['صفات الصورة في المرآة المستوية: 1) بكبر الجسم. 2) معتدلة ومعكوسة جانبياً. 3) وهمية تبدو خلف المرآة. 4) بعد الجسم عن المرآة يساوي بعد الصورة عنها.', 'الصورة وهمية لأنها تكونت من تلاقي امتدادات الأشعة المنعكسة خلف المرآة ولا يمكن إسقاطها على حاجز.', 'تكتب كلمة إسعاف معكوسة على مقدمة سيارة الإسعاف حتى يراها سائق السيارة الأمامية معتدلة من خلال المرآة المستوية.'],
    laws: ['g8_plane', 'g8_refl'],
    controls: [SEL('sc', 'المشهد', Object.entries(SC), 'apple'), BT('', [{ t: '100 cm', on: S => { S.d = 100; } }, { t: '50 cm', on: S => { S.d = 50; } }, { t: '✋ ارفع اليد اليمنى', on: S => { S.hand = S.hand === 'R' ? '' : 'R'; } }, { t: '🚑 انظر في المرآة', on: S => { S.look = !S.look; } }]),
      TG('rays', 'الأشعة وامتداداتها', true, null, 'ray'), TG('dist', 'بعد الجسم وبعد الصورة', true, null, 'vector'), TG('img', 'الصورة', true, null, 'eye'), TG('lab', 'الأسماء', true, null, 'labels')],
    setup(S) { S.d = 70; S.ay = 0; S.ex = .25; S.ey = .8; S.hand = ''; S.look = false; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, mx = ph ? w * .5 : x0 + (w - x0) * .5, pxcm = (mx - x0 - 20) / 135; return { w, h, ph, x0, mx, pxcm, y1: h * .2, y2: h * .7, s: Q26.sc(w, h), cy: h * .42 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10 : 12.5;
      if (p.sc === 'apple') {
        Q26.room(ctx, w, h, h, { top: '#f8fafc', bot: '#e2e8f0' });
        const A = [g.mx - S.d * g.pxcm, g.cy + S.ay], I = [g.mx + S.d * g.pxcm, A[1]], E = [g.x0 + (g.mx - g.x0) * S.ex, g.h * S.ey], r = 22 * g.s;
        Q26.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(g.mx - 3, g.y1, 6, g.y2 - g.y1); });
        Q26.mirror(ctx, [g.mx, g.y1], [g.mx, g.y2], [1, 0], { th: 8 });
        Q26.apple(ctx, A[0], A[1], r);
        if (p.img !== false) Q26.apple(ctx, I[0], I[1], r, { alpha: .55 });
        let ok = 0;
        if (p.rays !== false) { [[0, -9], [0, 9]].forEach((o, k) => { const Ee = [E[0] + o[0], E[1] + o[1]], t = (g.mx - Ee[0]) / (I[0] - Ee[0]), M = [g.mx, Ee[1] + (I[1] - Ee[1]) * t]; if (M[1] < g.y1 || M[1] > g.y2) return; ok++; const col = k ? '#16a34a' : '#dc2626';
            Q26.ray(ctx, [A, M, Ee], col, { w: 2.4 }); Q26.ray(ctx, [M, I], col, { dash: true, w: 2 }); }); }
        Q26.eye(ctx, E[0], E[1], g.s, Math.atan2(g.cy - E[1], g.mx - E[0]));
        if (p.rays !== false && !ok) Q26.T(ctx, 'لا تصل أشعة منعكسة إلى العين: حرّكها', E[0] + 40, E[1] - 40, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' });
        if (p.dist !== false) { const yy = g.y1 - 22; Q26.raw(ctx, () => { ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.4; ctx.setLineDash([3, 3]); [A[0], I[0]].forEach(x => { ctx.beginPath(); ctx.moveTo(x, A[1] - r); ctx.lineTo(x, yy - 6); ctx.stroke(); }); ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(A[0], yy); ctx.lineTo(I[0], yy); ctx.stroke(); }); Q26.head(ctx, A[0], yy, Math.PI, '#1e293b', 7); Q26.head(ctx, I[0], yy, 0, '#1e293b', 7); Q26.head(ctx, g.mx - 4, yy, 0, '#1e293b', 7); Q26.head(ctx, g.mx + 4, yy, Math.PI, '#1e293b', 7);
          Q26.T(ctx, 'بعد الجسم ' + Math.round(S.d) + ' cm', (A[0] + g.mx) / 2, yy - 14, { s: fs, w: 900, c: '#b91c1c' }); Q26.T(ctx, 'بعد الصورة ' + Math.round(S.d) + ' cm', (I[0] + g.mx) / 2, yy - 14, { s: fs, w: 900, c: '#1d4ed8' }); }
        if (p.lab !== false) { Q26.T(ctx, 'الجسم', A[0], A[1] + r + 18, { s: fs, w: 900, c: '#fff', bg: '#b91c1c' }); Q26.T(ctx, 'الصورة (وهمية)', I[0], I[1] + r + 18, { s: fs, w: 900, c: '#fff', bg: '#1d4ed8' }); Q26.T(ctx, 'مرآة مستوية', g.mx, g.y2 + 18, { s: fs, w: 900, c: '#0369a1' }); }
        if (!g.ph) Q26.card(ctx, S, [{ t: '1) بكبر الجسم ✓', c: '#0f172a' }, { t: '2) معتدلة ومعكوسة جانبياً ✓', c: '#0f172a' }, { t: '3) وهمية تبدو خلف المرآة ✓', c: '#0f172a' }, { t: '4) بعد الجسم = بعد الصورة = ' + Math.round(S.d) + ' cm', c: '#be185d', w: 900 }], { title: 'صفات الصورة', bd: '#be185d', y: h - 160, wd: 280 });
        S._A = A; S._E = E;
      } else if (p.sc === 'person') {
        Q26.room(ctx, w, h, h * .82, { top: '#f1f5f9', bot: '#e2e8f0' });
        const s = g.s, mxl = g.x0 + (w - g.x0) * .08, mw = (w - g.x0) * .4, my1 = h * .1, my2 = h * .82;
        // mirror on the wall (left), with the image inside
        Q26.raw(ctx, () => { ctx.fillStyle = '#e5e7eb'; ctx.fillRect(mxl - 10, my1 - 10, mw + 20, my2 - my1 + 10); const gg = ctx.createLinearGradient(mxl, my1, mxl + mw, my2); gg.addColorStop(0, '#e0f2fe'); gg.addColorStop(1, '#bae6fd'); ctx.fillStyle = gg; ctx.fillRect(mxl, my1, mw, my2 - my1); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.moveTo(mxl + mw * .1, my1); ctx.lineTo(mxl + mw * .3, my1); ctx.lineTo(mxl + mw * .05, my2); ctx.lineTo(mxl - 0, my2); ctx.closePath(); ctx.fill(); });
        const fig = (x, gy, sc, back, raiseSide) => Q26.raw(ctx, () => { // front/back view person; raiseSide = 'vR' (viewer's right) or 'vL' or ''
          const H = 300 * sc; ctx.save(); ctx.translate(x, gy);
          ctx.fillStyle = '#1e3a8a'; ctx.fillRect(-18 * sc, -H * .45, 15 * sc, H * .45); ctx.fillRect(3 * sc, -H * .45, 15 * sc, H * .45); ctx.fillStyle = '#111827'; ctx.fillRect(-22 * sc, -8 * sc, 19 * sc, 8 * sc); ctx.fillRect(3 * sc, -8 * sc, 19 * sc, 8 * sc);
          ctx.fillStyle = '#f8fafc'; rr(ctx, -26 * sc, -H * .8, 52 * sc, H * .38, 10 * sc); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.stroke();
          const arm = (side, up) => { ctx.strokeStyle = '#f1c27d'; ctx.lineWidth = 11 * sc; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(side * 24 * sc, -H * .76); if (up) { ctx.lineTo(side * 40 * sc, -H * .9); ctx.lineTo(side * 44 * sc, -H * 1.04); } else { ctx.lineTo(side * 32 * sc, -H * .6); ctx.lineTo(side * 33 * sc, -H * .46); } ctx.stroke(); ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 14 * sc; ctx.beginPath(); ctx.moveTo(side * 24 * sc, -H * .76); ctx.lineTo(side * (up ? 32 : 28) * sc, -H * (up ? .83 : .68)); ctx.stroke(); };
          arm(1, raiseSide === 'vR'); arm(-1, raiseSide === 'vL');
          ctx.fillStyle = '#f1c27d'; ctx.fillRect(-6 * sc, -H * .85, 12 * sc, 10 * sc); ctx.beginPath(); ctx.ellipse(0, -H * .92, 22 * sc, 26 * sc, 0, 0, TAU); ctx.fill();
          ctx.fillStyle = '#3b2414'; if (back) { ctx.beginPath(); ctx.ellipse(0, -H * .93, 23 * sc, 26 * sc, 0, 0, TAU); ctx.fill(); } else { ctx.beginPath(); ctx.ellipse(0, -H * .99, 23 * sc, 14 * sc, 0, Math.PI, TAU); ctx.fill(); ctx.fillStyle = '#1c1917'; ctx.beginPath(); ctx.arc(-8 * sc, -H * .93, 2.5 * sc, 0, TAU); ctx.arc(8 * sc, -H * .93, 2.5 * sc, 0, TAU); ctx.fill(); ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, -H * .9, 8 * sc, .3, Math.PI - .3); ctx.stroke(); }
          // watch on the real right hand (to see inversion)
          ctx.restore(); });
        const bxp = g.x0 + (w - g.x0) * .7, gy = h * .9, sc = Math.min(1.1, h / 520) * s;
        // image in the mirror: front view, the raised hand is on the viewer's right side too (same side as the boy's right hand seen from behind)
        Q26.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(mxl, my1, mw, my2 - my1); ctx.clip(); }); fig(mxl + mw / 2, my2 - 10, sc * .78, false, S.hand === 'R' ? 'vR' : ''); Q26.raw(ctx, () => { ctx.restore(); });
        fig(bxp, gy, sc, true, S.hand === 'R' ? 'vR' : '');
        if (p.lab !== false) { Q26.T(ctx, 'الجهة اليمنى', bxp + 70 * sc, gy - 300 * sc * .7, { s: fs + 1, w: 900, c: '#fff', bg: '#b91c1c' }); Q26.T(ctx, 'الجهة اليسرى', mxl + mw / 2 + 60 * sc, my1 + 26, { s: fs + 1, w: 900, c: '#fff', bg: '#1d4ed8' });
          Q26.T(ctx, S.hand === 'R' ? 'رفعتَ يدك اليمنى ⟸ الصورة ترفع يدها اليسرى!' : 'اضغط «ارفع اليد اليمنى» أو انقر على الطالب', Q26.cx(w), h - 24, { s: fs + 1, w: 900, c: '#fff', bg: '#be185d' }); }
        S._P = [bxp, gy - 150 * sc];
      } else {
        Q26.room(ctx, w, h, h * .86, { top: '#94a3b8', bot: '#cbd5e1' }); const s = g.s, cx = Q26.cx(w);
        // ambulance front
        const ax = g.ph ? cx : g.x0 + (w - g.x0) * .3, ay = h * .55, AW = Math.min(240 * s, (w - g.x0) * .4), AH = AW * .75;
        Q26.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; rr(ctx, ax - AW / 2, ay - AH / 2, AW, AH, 18); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#1e293b'; rr(ctx, ax - AW * .42, ay - AH * .45, AW * .84, AH * .32, 8); ctx.fill(); ctx.fillStyle = '#dc2626'; ctx.fillRect(ax - AW / 2, ay + AH * .02, AW, AH * .2); ctx.fillStyle = '#fef9c3'; ctx.beginPath(); ctx.arc(ax - AW * .36, ay + AH * .34, AW * .07, 0, TAU); ctx.arc(ax + AW * .36, ay + AH * .34, AW * .07, 0, TAU); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.fillRect(ax - AW * .45, ay + AH / 2, AW * .16, AH * .12); ctx.fillRect(ax + AW * .29, ay + AH / 2, AW * .16, AH * .12); ctx.fillStyle = S.t % 1 < .5 ? '#ef4444' : '#3b82f6'; rr(ctx, ax - 20, ay - AH / 2 - 14, 40, 14, 4); ctx.fill(); });
        const word = (x, y, mir, sz) => { Q26.raw(ctx, () => { ctx.save(); ctx.translate(x, y); if (mir) ctx.scale(-1, 1); ctx.font = '900 ' + sz + 'px system-ui, sans-serif'; ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'rtl'; ctx.fillText('إسعاف', 0, 0); ctx.restore(); }); };
        word(ax, ay + AH * .12, true, AH * .17);
        if (p.lab !== false) Q26.T(ctx, 'مقدمة سيارة الإسعاف (مكتوبة معكوسة)', ax, ay - AH / 2 - 34, { s: fs, w: 900, c: '#fff', bg: '#334155' });
        // rear-view mirror of the car ahead
        const rx = g.ph ? cx : g.x0 + (w - g.x0) * .76, ry = g.ph ? h * .2 : h * .32, RW = Math.min(230 * s, (w - g.x0) * .38), RH = RW * .36;
        Q26.raw(ctx, () => { ctx.fillStyle = '#111827'; rr(ctx, rx - RW / 2 - 8, ry - RH / 2 - 8, RW + 16, RH + 16, 16); ctx.fill(); ctx.fillStyle = '#334155'; ctx.fillRect(rx - 4, ry - RH / 2 - 40, 8, 34); const gg = ctx.createLinearGradient(0, ry - RH / 2, 0, ry + RH / 2); gg.addColorStop(0, '#cbd5e1'); gg.addColorStop(1, '#94a3b8'); ctx.fillStyle = gg; rr(ctx, rx - RW / 2, ry - RH / 2, RW, RH, 12); ctx.fill(); });
        if (S.look) { Q26.raw(ctx, () => { ctx.save(); rr(ctx, rx - RW / 2, ry - RH / 2, RW, RH, 12); ctx.clip(); ctx.translate(rx, ry); ctx.scale(-.45, .45); ctx.translate(-ax, -ay); ctx.fillStyle = '#f8fafc'; rr(ctx, ax - AW / 2, ay - AH / 2, AW, AH, 18); ctx.fill(); ctx.fillStyle = '#1e293b'; rr(ctx, ax - AW * .42, ay - AH * .45, AW * .84, AH * .32, 8); ctx.fill(); ctx.fillStyle = '#dc2626'; ctx.fillRect(ax - AW / 2, ay + AH * .02, AW, AH * .2); ctx.restore(); });
          // mirrored twice → reads correctly
          Q26.raw(ctx, () => { ctx.save(); ctx.translate(rx, ry + AH * .12 * .45); ctx.font = '900 ' + (AH * .17 * .45) + 'px system-ui, sans-serif'; ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'rtl'; ctx.fillText('إسعاف', 0, 0); ctx.restore(); });
          Q26.ray(ctx, [[ax + AW / 2, ay - AH * .1], [rx - RW / 2, ry]], '#facc15', { w: 2, glow: false }); }
        if (p.lab !== false) Q26.T(ctx, S.look ? 'في المرآة: «إسعاف» تُقرأ معتدلة ✓' : 'مرآة السيارة الأمامية — اضغط عليها لتنظر', rx, ry + RH / 2 + 26, { s: fs, w: 900, c: '#fff', bg: S.look ? '#15803d' : '#475569' });
        S._R = [rx, ry, RW, RH];
      }
      Q26.banner(ctx, w, p.sc === 'apple' ? 'اسحب التفاحة والعين' : p.sc === 'person' ? 'ارفع يدك اليمنى أمام المرآة' : 'انظر في مرآة السيارة الأمامية', '#be185d', 20);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), p = S.p;
      if (p.sc === 'apple' && S._A) return [{ id: 'apple', x: S._A[0], y: S._A[1], r: 30, axis: 'xy', keep: true, tip: 'اسحب التفاحة', idle: 'حرّك التفاحة ✋', drag: (S, d) => { S.d = Math.round(clamp((g.mx - d.x) / g.pxcm, 15, 130)); S.ay = clamp(d.y - g.cy, -g.h * .15, g.h * .2); } },
        { id: 'eye', x: S._E[0], y: S._E[1], r: 30, axis: 'xy', keep: true, tip: 'اسحب العين', hint: false, drag: (S, d) => { S.ex = clamp((d.x - g.x0) / (g.mx - g.x0), .08, .85); S.ey = clamp(d.y / g.h, .25, .92); } }];
      if (p.sc === 'person' && S._P) return [{ id: 'boy', x: S._P[0], y: S._P[1], w: 100, h: 200, tip: 'انقر لترفع يدك اليمنى', idle: 'ارفع يدك ✋', click: S => { S.hand = S.hand === 'R' ? '' : 'R'; } }];
      if (p.sc === 'amb' && S._R) return [{ id: 'mirror', x: S._R[0], y: S._R[1], w: S._R[2], h: S._R[3] + 20, tip: 'انقر لتنظر في المرآة', idle: 'انظر هنا ✋', click: S => { S.look = !S.look; } }];
      return []; },
    readings(S) { if (S.p.sc === 'apple') return [rd('بعد الجسم عن المرآة', Math.round(S.d) + ' cm'), rd('بعد الصورة عن المرآة', Math.round(S.d) + ' cm'), rd('البعد بين الجسم وصورته', Math.round(2 * S.d) + ' cm'), rd('نوع الصورة', 'وهمية معتدلة بكبر الجسم')]; return [rd('الصورة', 'معتدلة ومعكوسة جانبياً')]; },
    record(S) { if (S.p.sc !== 'apple') return null; return { d: Math.round(S.d), di: Math.round(S.d), dd: Math.round(2 * S.d) }; },
    cols: [['d', 'بعد الجسم (cm)'], ['di', 'بعد الصورة (cm)'], ['dd', 'البعد بين الجسم والصورة (cm)']],
    explain(S) { const p = S.p.sc;
      if (p === 'apple') return Q26.ex('صورة التفاحة تبدو خلف المرآة على بعد ' + Math.round(S.d) + ' cm، أي بالبعد نفسه الذي تبعده التفاحة أمامها.', 'الأشعة الخارجة من التفاحة تنعكس عن المرآة وتدخل العين، والعين تظن أن الضوء جاء بخط مستقيم من خلف المرآة؛ فامتدادات الأشعة المنعكسة (المتقطعة) تتلاقى هناك. لا يوجد ضوء حقيقي خلف المرآة، لذلك الصورة <b>وهمية</b>.', 'إذا وقفت على بعد 50 cm من المرآة فالمسافة بينك وبين صورتك 100 cm.');
      if (p === 'person') return Q26.ex(S.hand === 'R' ? 'رفعت يدك اليمنى، فرفعت صورتك اليد المقابلة لها، وهي يدها اليسرى.' : 'الصورة معتدلة (رأسها للأعلى) وبكبر الجسم.', 'المرآة تعكس الجهات الأمامية والخلفية فتبدو الصورة <b>معكوسة جانبياً</b>: يمينك يصبح يسار الصورة.', 'لهذا يصعب عليك أن تقص شعرك وأنت تنظر في المرآة!');
      return Q26.ex(S.look ? 'في المرآة تُقرأ كلمة «إسعاف» بشكل صحيح.' : 'الكلمة على مقدمة السيارة مكتوبة بأحرف معكوسة.', 'المرآة تعكس الكلمة جانبياً، والكلمة مكتوبة معكوسة أصلاً، فالعكس مرتين يعيدها معتدلة يقرؤها السائق في المرآة الأمامية فيفسح الطريق.', 'سيارات الإطفاء والشرطة في بعض البلدان تفعل الشيء نفسه.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   C4) تطبيقات المرايا المستوية (ص 77): منظار الغواصة (البيرسكوب) — مرآتان مستويتان بزاوية 45°
   ========================================================================================= */
(() => {
  const D = { id: 'g8_periscope', page: 77, fig: 'منظار الغواصة (البيرسكوب) ص 77',
    desc: 'تستعمل المرايا المستوية في المنازل وصالونات الحلاقة والمحلات والمعارض والمرآة الأمامية داخل السيارة، وفي صناعة منظار الغواصة (البيرسكوب): أنبوب فيه مرآتان مستويتان توضعان بزاوية 45° للرؤية فوق سطح الماء.',
    tags: 'البيرسكوب منظار الغواصة مرآتان مستويتان 45 درجة تطبيقات المرايا المستوية',
    tools: ['أنبوب', 'مرآتان مستويتان', 'غواصة', 'سفينة'],
    steps: ['الأشعة القادمة من السفينة تدخل من الفتحة العليا للمنظار.', 'تنعكس عن المرآة العليا (45°) إلى الأسفل، ثم عن المرآة السفلى (45°) إلى عين البحار داخل الغواصة.', 'اسحب المرآة العليا لتغيير ميلها: ماذا يحدث للأشعة إذا لم تكن الزاوية 45°؟', 'اسحب المنظار للأعلى والأسفل: متى يرى البحار السفينة؟'],
    concl: ['يتكون البيرسكوب من أنبوب يحتوي مرآتين مستويتين متوازيتين بزاوية 45°.', 'كل مرآة تغيّر اتجاه الأشعة 90°، فيرى البحار الأجسام فوق سطح الماء وهو تحت الماء.', 'الصورة النهائية معتدلة لأنها تنعكس مرتين.'],
    laws: ['g8_refl', 'g8_plane'],
    controls: [BT('', [{ t: '↺ 45°', on: S => { S.ma = 45; } }]), TG('rays', 'مسار الأشعة', true, null, 'ray'), TG('lab', 'الأسماء', true, null, 'labels')],
    setup(S) { S.ma = 45; S.up = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, s = Q26.sc(w, h), wl = h * .42, tx = ph ? w * .62 : (w + 64) / 2 + 60 * s, tw = 46 * s, top = wl - 150 * s - S.up * 60 * s, bot = h * .78; return { w, h, ph, s, wl, tx, tw, top, bot }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, s = g.s, fs = g.ph ? 10 : 12;
      G.bg(ctx, w, h, false); Q26.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 0, 0, g.wl); sk.addColorStop(0, '#7dd3fc'); sk.addColorStop(1, '#e0f2fe'); ctx.fillStyle = sk; ctx.fillRect(0, 0, w, g.wl); const sea = ctx.createLinearGradient(0, g.wl, 0, h); sea.addColorStop(0, '#0284c7'); sea.addColorStop(1, '#0c4a6e'); ctx.fillStyle = sea; ctx.fillRect(0, g.wl, w, h - g.wl); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x < w; x += 4) ctx.lineTo(x, g.wl + Math.sin(x * .05 + S.t * 2) * 3); ctx.stroke(); });
      // ship on the left
      const sx = (g.ph ? 10 : 80) + 70 * s, yA = g.top + g.tw / 2;
      Q26.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.moveTo(sx - 60 * s, g.wl - 30 * s); ctx.lineTo(sx + 70 * s, g.wl - 30 * s); ctx.lineTo(sx + 50 * s, g.wl + 5); ctx.lineTo(sx - 45 * s, g.wl + 5); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#f8fafc'; ctx.fillRect(sx - 30 * s, g.wl - 62 * s, 60 * s, 32 * s); ctx.fillStyle = '#dc2626'; ctx.fillRect(sx + 6 * s, g.wl - 92 * s, 16 * s, 30 * s); });
      // submarine under water
      const subY = g.bot + 20 * s;
      Q26.raw(ctx, () => { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.ellipse(g.tx - 40 * s, subY, 190 * s, 46 * s, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#eab308'; rr(ctx, g.tx - 80 * s, subY - 76 * s, 110 * s, 40 * s, 10); ctx.fill(); ctx.fillStyle = '#1e3a8a'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(g.tx - 180 * s + k * 50 * s, subY, 9 * s, 0, TAU); ctx.fill(); } });
      // periscope tube (L shape both ends open toward left at top and right at bottom)
      const L = g.tx - g.tw / 2, R = g.tx + g.tw / 2, T = g.top, B = g.bot;
      Q26.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(L - 6, T - g.tw * .1, 6, B - T + g.tw * .1); ctx.fillRect(R, T - g.tw * .1, 6, B - T - g.tw); ctx.fillRect(L - 6, T - g.tw * .1 - 6, g.tw + 12, 6); ctx.fillRect(L - 6, B, g.tw + 12 + 30 * s, 6); ctx.fillStyle = 'rgba(148,163,184,.25)'; ctx.fillRect(L, T, g.tw, B - T); });
      // mirrors: top centre (tx, T + tw/2) angle ma; bottom centre (tx, B - tw/2) fixed 45°
      const m1c = [g.tx, T + g.tw / 2], a1 = S.ma * Math.PI / 180, hl = g.tw * .72, m1 = [[m1c[0] - Math.cos(a1) * hl, m1c[1] - Math.sin(a1) * hl], [m1c[0] + Math.cos(a1) * hl, m1c[1] + Math.sin(a1) * hl]];
      const m2c = [g.tx, B - g.tw / 2], a2 = Math.PI / 4, m2 = [[m2c[0] - Math.cos(a2) * hl, m2c[1] - Math.sin(a2) * hl], [m2c[0] + Math.cos(a2) * hl, m2c[1] + Math.sin(a2) * hl]];
      const walls = [[[L, T + g.tw * 1.05], [L, B + 2], 'stop'], [[R, T - 2], [R, B - g.tw], 'stop'], [[L - 2, T - g.tw * .1], [R + 2, T - g.tw * .1], 'stop']];
      const eye = [R + 40 * s, B - g.tw / 2];
      if (p.rays !== false) { let hit = 0; [-.28, 0, .28].forEach((o, k) => { const P = [sx + 75 * s, yA + o * g.tw], pts = Q26.bounce(P, [1, 0], [[m1[0], m1[1]], [m2[0], m2[1]]].concat(walls), 5, 400); const last = pts[pts.length - 1]; if (last[0] > R && Math.abs(last[1] - eye[1]) < g.tw) { hit++; pts[pts.length - 1] = [eye[0] - 12 * s, last[1]]; } Q26.ray(ctx, pts, ['#ef4444', '#f59e0b', '#ef4444'][k], { w: 2.2 }); }); S.ok = hit === 3 ? 1 : 0; }
      Q26.mirror(ctx, m1[0], m1[1], Q26.nrm([Math.sin(a1), -Math.cos(a1)]), { th: 6 }); Q26.mirror(ctx, m2[0], m2[1], Q26.nrm([-Math.sin(a2), Math.cos(a2)]), { th: 6 });
      Q26.eye(ctx, eye[0], eye[1], s * .8, Math.PI);
      if (p.lab !== false) { Q26.T(ctx, 'مرآة مستوية ' + Math.round(S.ma) + '°', g.tx + g.tw + 60 * s, T + g.tw * .3, { s: fs, w: 900, c: '#fff', bg: Math.round(S.ma) === 45 ? '#15803d' : '#b91c1c' }); Q26.T(ctx, 'مرآة مستوية 45°', g.tx - g.tw - 60 * s, B - g.tw / 2, { s: fs, w: 900, c: '#fff', bg: '#15803d' }); Q26.T(ctx, 'عين البحار', eye[0] + 40 * s, eye[1] + 30 * s, { s: fs, w: 800, c: '#fff' }); Q26.T(ctx, 'سفينة', sx, g.wl - 108 * s, { s: fs, w: 900, c: '#0f172a' });
        Q26.verdict(ctx, Math.min(w - 110, g.tx + 160 * s), g.wl + 40 * s, !!S.ok, S.ok ? 'يرى البحار السفينة' : 'الأشعة لا تصل إلى العين'); }
      Q26.banner(ctx, w, 'اسحب المرآة العليا لتغيير ميلها', '#be185d', 20);
      S._m1 = m1c;
    },
    drags(S) { if (!S.W || !S._m1) return []; const g = D.geo(S); return [{ id: 'm1', x: S._m1[0] + Math.cos(S.ma * Math.PI / 180) * g.tw * .6, y: S._m1[1] + Math.sin(S.ma * Math.PI / 180) * g.tw * .6, r: 24, cx: S._m1[0], cy: S._m1[1], keep: true, tip: 'اسحب لتدوير المرآة العليا', idle: 'دوّر المرآة ✋', drag: (S, d) => { S.ma = Math.round(clamp(Math.atan2(d.y - S._m1[1], d.x - S._m1[0]) * 180 / Math.PI, 20, 70)); } },
      { id: 'tube', x: g.tx, y: (g.top + g.wl) / 2, w: g.tw + 20, h: 60, axis: 'y', keep: true, hint: false, tip: 'اسحب المنظار للأعلى أو الأسفل', drag: (S, d) => { S.up = clamp((g.wl - 150 * g.s - d.y + 0) / (60 * g.s), -1, 1); } }]; },
    readings(S) { return [rd('ميل المرآة العليا', Math.round(S.ma) + '°'), rd('ميل المرآة السفلى', '45°'), rd('النتيجة', S.ok ? 'يرى البحار السفينة' : 'لا يرى')]; },
    explain(S) { return Q26.ex(S.ok ? 'الأشعة القادمة من السفينة تنعكس مرتين وتصل إلى عين البحار تحت الماء.' : 'المرآة العليا ليست بزاوية 45° فتنعكس الأشعة نحو جدار الأنبوب ولا تصل إلى العين.', 'كل مرآة مائلة 45° تجعل الشعاع ينعطف 90° (زاوية السقوط 45° = زاوية الانعكاس 45°)، فينزل الشعاع عمودياً في الأنبوب ثم يخرج أفقياً إلى العين.', 'المرآة الأمامية داخل السيارة ومرايا صالونات الحلاقة والمحلات كلها مرايا مستوية.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

M8.merge({ id: 'g8_reflection', ch: 26, sec: 'الدرس 2: انعكاس الضوء والمرآة المستوية', page: 75, kind: 'نشاط', fig: 'الشكل 1، الشكل 2، نشاط ص 76',
  title: 'انعكاس الضوء: قانونا الانعكاس والمرآة المستوية',
  desc: 'تجربة بأربعة أجزاء: (1) نشاط إثبات القانون الأول للانعكاس بالمنقلة والليزر مع مفاهيم الشكل (1)، (2) مقارنة الانعكاس المنتظم وغير المنتظم، (3) صفات الصورة في المرآة المستوية (الشكل 2، المعكوسة جانبياً، كلمة إسعاف)، (4) منظار الغواصة.',
  tags: 'انعكاس الضوء مرآة مستوية',
  fact: ['نرى معظم الأشياء حولنا بفضل الانعكاس غير المنتظم: الضوء يرتد عنها في كل الاتجاهات فيصل إلى عيوننا أينما كنا.', 'استعمل نظارات واقية وابتعد عن توجيه ضوء الليزر إلى العين.'],
  quiz: [
    { q: 'إذا سقط شعاع ضوئي على سطح مرآة مستوية بحيث تصنع زاوية قياسها 40° مع سطحها، ما مقدار زاوية الانعكاس؟', o: ['40°', '50°', '90°'], a: 1, why: 'مراجعة الدرس س5: زاوية السقوط = 90° − 40° = 50° = زاوية الانعكاس.' },
    { q: 'في حالة الانعكاس غير المنتظم تكون زاوية السقوط ......... زاوية الانعكاس.', o: ['أكبر من', 'أقل من', 'تساوي'], a: 2, why: 'مراجعة الفصل س2-2: قانون الانعكاس يتحقق لكل شعاع.' },
    { q: 'إذا وقفت على بعد 50 cm من مرآة مستوية فإن المسافة بين صورتك والمرآة تكون .........', o: ['100 cm', '25 cm', '50 cm'], a: 2, why: 'مراجعة الفصل س2-3: بعد الصورة = بعد الجسم (والمسافة بينك وبين صورتك 100 cm).' }],
  parts: [{ id: 'g8_refl_law', n: 'نشاط: القانون الأول للانعكاس' }, { id: 'g8_refl_types', n: 'الانعكاس المنتظم وغير المنتظم' }, { id: 'g8_plane_img', n: 'صفات الصورة في المرآة المستوية' }, { id: 'g8_periscope', n: 'تطبيقات: منظار الغواصة' }] });

/* spherical mirror helpers: arc of circle (C, R) around the direction ang0 (0 = surface to the right of C), half-angle al */
Q26.sphHit = (P, d, C, R, ang0, al) => {
  const fx = P[0] - C[0], fy = P[1] - C[1], b = fx * d[0] + fy * d[1], cc = fx * fx + fy * fy - R * R, D = b * b - cc; if (D < 0) return null; const sq = Math.sqrt(D);
  const T = [-b - sq, -b + sq].filter(t => t > 1e-3).sort((a, b2) => a - b2);
  for (const t of T) { const pt = [P[0] + t * d[0], P[1] + t * d[1]]; let a = Math.atan2(pt[1] - C[1], pt[0] - C[0]) - ang0; while (a > Math.PI) a -= TAU; while (a < -Math.PI) a += TAU; if (Math.abs(a) <= al) return { t, pt, n: [(pt[0] - C[0]) / R, (pt[1] - C[1]) / R] }; }
  return null;
};
Q26.sphMirror = (ctx, C, R, ang0, al, o = {}) => {
  K.raw(ctx, () => { ctx.save(); const back = o.back || 1; // +1: hatch outside the circle, -1 inside
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; const n = Math.max(8, Math.round(R * al * 2 / 8));
    for (let k = 0; k <= n; k++) { const a = ang0 - al + 2 * al * k / n, x = C[0] + Math.cos(a) * R, y = C[1] + Math.sin(a) * R, x2 = C[0] + Math.cos(a) * (R + back * 9), y2 = C[1] + Math.sin(a) * (R + back * 9); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2 + Math.cos(a + Math.PI / 2) * 4, y2 + Math.sin(a + Math.PI / 2) * 4); ctx.stroke(); }
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(C[0], C[1], R + back * 3, ang0 - al, ang0 + al); ctx.stroke();
    const g = ctx.createLinearGradient(C[0] + Math.cos(ang0 - al) * R, C[1] + Math.sin(ang0 - al) * R, C[0] + Math.cos(ang0 + al) * R, C[1] + Math.sin(ang0 + al) * R); g.addColorStop(0, '#93c5fd'); g.addColorStop(.5, '#eff6ff'); g.addColorStop(1, '#60a5fa');
    ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(C[0], C[1], R, ang0 - al, ang0 + al); ctx.stroke(); ctx.restore(); });
};
/* dimension arrow between two x on a line y */
Q26.dimx = (ctx, xa, xb, y, label, col, fs = 12) => { Q26.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(xa, y); ctx.lineTo(xb, y); ctx.stroke(); }); Q26.head(ctx, xa, y, xa < xb ? Math.PI : 0, col, 7); Q26.head(ctx, xb, y, xa < xb ? 0 : Math.PI, col, 7); if (label) Q26.T(ctx, label, (xa + xb) / 2, y + 13, { s: fs, w: 900, c: col }); };

/* =========================================================================================
   D1) المرايا الكروية: المقعرة والمحدبة، المصطلحات، البؤرة الحقيقية والوهمية (ص 77–78) — مقارنة
   ========================================================================================= */
(() => {
  const TERMS = [['P', 'قطب المرآة'], ['f', 'البعد البؤري'], ['F', 'البؤرة'], ['C', 'مركز التكور'], ['ax', 'المحور الرئيس']];
  const D = { id: 'g8_curve_terms', page: 77, fig: 'مصطلحات المرايا ص 77 + تكون البؤرة ص 78',
    desc: 'المرآة الكروية مرآة سطحها العاكس جزء من سطح كروي. المقعرة سطحها الداخلي هو العاكس فتجمع الأشعة الموازية للمحور الرئيس في بؤرة حقيقية (مرآة لامّة)، والمحدبة سطحها الخارجي هو العاكس فتفرّق الأشعة فتلتقي امتداداتها في بؤرة وهمية (مرآة مفرّقة).',
    tags: 'المرآة المقعرة المرآة المحدبة قطب المرآة مركز التكور المحور الرئيس البؤرة البعد البؤري نصف قطر التكور بؤرة حقيقية بؤرة وهمية لامة مفرقة',
    tools: ['مرآة مقعرة', 'مرآة محدبة', 'حزمة أشعة متوازية'],
    steps: ['قارن بين المرآتين: حزمة الأشعة نفسها موازية للمحور الرئيس تسقط على مرآة مقعرة (أعلى) ومرآة محدبة (أسفل).', 'المقعرة: الأشعة المنعكسة تتجمع في نقطة أمام المرآة: البؤرة الحقيقية (F).', 'المحدبة: الأشعة المنعكسة تتفرق، وامتداداتها (المتقطعة) تلتقي خلف المرآة في البؤرة الوهمية.', 'اسحب مركز التكور C لتغيير نصف قطر التكور R، ولاحظ أن البؤرة تبقى في منتصف المسافة بين C و P (f = R/2).', 'اختبر نفسك (مراجعة الفصل س4 – الشكل 2): شغّل «الأرقام بدل المصطلحات» واضغط على كل رقم لترى المصطلح.'],
    concl: ['قطب المرآة (P): نقطة تتوسط سطح المرآة. مركز التكور (C): مركز الكرة التي تكون المرآة جزءاً منها. المحور الرئيس: المستقيم المار بمركز التكور وقطب المرآة.', 'البؤرة (F): نقطة تتوسط المسافة بين مركز التكور وقطب المرآة. البعد البؤري: المسافة بين البؤرة والقطب. نصف قطر التكور: المسافة بين مركز التكور وأي نقطة على سطح المرآة (f = R/2).', 'المقعرة مرآة لامّة: تجمع الأشعة الموازية للمحور الرئيس بعد انعكاسها في البؤرة الحقيقية (تلاقي الأشعة المنعكسة).', 'المحدبة مرآة مفرّقة: تفرّق الأشعة، وتتكون البؤرة الوهمية من التقاء امتدادات الأشعة المنعكسة.'],
    laws: ['g8_sph', 'g8_refl'],
    controls: [SEL('view', 'العرض', [['both', 'مقارنة: المقعرة والمحدبة'], ['cc', 'المقعرة فقط'], ['cv', 'المحدبة فقط']], 'both'), R('R', 'نصف قطر التكور R', 20, 60, 40, 2, 'cm'), R('n', 'عدد الأشعة', 3, 11, 7, 1, ''),
      TG('ext', 'امتدادات الأشعة (البؤرة الوهمية)', true, null, 'ray'), TG('nm', 'العمود المقام (نصف القطر) عند نقطة السقوط', false, null, 'vector'), TG('lab', 'المصطلحات', true, null, 'labels'), TG('q4', 'اختبر نفسك: أرقام بدل المصطلحات (س4)', false, null, 'eye')],
    setup(S) { S.rev = {}; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, pxcm = Math.min((w - x0 - 60) / 85, h / 70), both = S.p.view === 'both'; return { w, h, ph, x0, pxcm, both, s: Q26.sc(w, h) }; },
    panel(ctx, S, g, ay, ph2, concave, key) {
      const p = S.p, R = p.R * g.pxcm, f = R / 2, fs = g.ph ? 10 : 12.5, ap = Math.min(ph2 * .36, R * .62), al = Math.asin(ap / R);
      const Px = concave ? g.w - 60 : g.x0 + (g.w - g.x0) * .48, C = concave ? [Px - R, ay] : [Px + R, ay], F = concave ? [Px - f, ay] : [Px + f, ay], ang0 = concave ? 0 : Math.PI;
      Q26.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.x0, ay - ph2 / 2, g.w - g.x0, ph2); ctx.clip(); });
      Q26.axis(ctx, g.x0 + 4, g.w - 6, ay, '#16a34a');
      // rays
      const n = p.n, x1 = g.x0 + 10;
      for (let k = 0; k < n; k++) { const y = ay - ap * .9 + (2 * ap * .9) * k / (n - 1); if (Math.abs(y - ay) < 1 && n % 2) {} const P0 = [x1, y], d = [1, 0], hit = Q26.sphHit(P0, d, C, R, ang0, al); if (!hit) continue;
        let nn = hit.n; if (Q26.dot(nn, d) > 0) nn = [-nn[0], -nn[1]]; const r = Q26.refl(d, nn), L = concave ? (hit.pt[0] - g.x0) * 1.15 : 220 * g.s;
        Q26.ray(ctx, [P0, hit.pt, [hit.pt[0] + r[0] * L, hit.pt[1] + r[1] * L]], '#ef4444', { w: 2, glow: false });
        if (!concave && p.ext !== false) { const t = (F[0] - hit.pt[0]) / (-r[0] || 1e-9) * 1.08; Q26.ray(ctx, [hit.pt, [hit.pt[0] - r[0] * t, hit.pt[1] - r[1] * t]], '#ef4444', { dash: [5, 4], w: 1.6 }); }
        if (p.nm) { Q26.raw(ctx, () => { ctx.save(); ctx.setLineDash([2, 4]); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(C[0], C[1]); ctx.lineTo(hit.pt[0], hit.pt[1]); ctx.stroke(); ctx.restore(); }); } }
      Q26.raw(ctx, () => { ctx.restore(); });
      Q26.sphMirror(ctx, C, R, ang0, al, { back: 1 });
      if (!g.ph && !g.both) { Q26.raw(ctx, () => { ctx.save(); ctx.setLineDash([3, 5]); ctx.strokeStyle = 'rgba(100,116,139,.45)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(C[0], C[1], R, 0, TAU); ctx.stroke(); ctx.restore(); }); }
      // points & labels
      const q4 = p.q4, lab = p.lab !== false;
      Q26.pt(ctx, Px, ay, '', '#1d4ed8'); Q26.pt(ctx, C[0], ay, '', '#1d4ed8'); Q26.pt(ctx, F[0], ay, '', '#dc2626');
      const pos = { P: [Px + (concave ? 14 : -14), ay - 16], C: [C[0], ay + 20], F: [F[0], ay + 20], f: [(F[0] + Px) / 2, ay - 18], ax: [g.x0 + 60, ay - 14] };
      if (q4 && concave) { TERMS.forEach((t, i) => { const P2 = pos[t[0]]; Q26.T(ctx, S.rev[t[0]] ? (i + 1) + ': ' + t[1] : String(i + 1), P2[0], P2[1], { s: fs + 1, w: 900, c: '#fff', bg: S.rev[t[0]] ? '#15803d' : '#7c3aed' }); }); Q26.dimx(ctx, F[0], Px, ay + 40, '', '#7c3aed'); }
      else if (lab) { Q26.T(ctx, 'P', pos.P[0], pos.P[1], { s: fs + 2, w: 900, c: '#1d4ed8' }); Q26.T(ctx, 'C', C[0], ay + 20, { s: fs + 2, w: 900, c: '#1d4ed8' }); Q26.T(ctx, 'F', F[0], ay + 20, { s: fs + 2, w: 900, c: '#dc2626' });
        Q26.T(ctx, concave ? 'بؤرة حقيقية' : 'بؤرة وهمية', F[0], ay + 40, { s: fs, w: 900, c: '#fff', bg: concave ? '#dc2626' : '#9333ea' });
        Q26.dimx(ctx, F[0], Px, ay + (concave ? 64 : 64), 'البعد البؤري f = ' + Q26.r1(p.R / 2) + ' cm', '#be185d', fs);
        Q26.dimx(ctx, C[0], Px, ay + 92, 'نصف قطر التكور R = ' + p.R + ' cm', '#1d4ed8', fs);
        Q26.T(ctx, 'المحور الرئيس', g.x0 + 64, ay - 12, { s: fs, w: 800, c: '#15803d' });
        Q26.T(ctx, concave ? 'مرآة مقعرة (لامّة): السطح الداخلي عاكس' : 'مرآة محدبة (مفرّقة): السطح الخارجي عاكس', concave ? Px - 150 : Px + 40, ay - ap - 18, { s: fs + 1, w: 900, c: '#fff', bg: concave ? '#0369a1' : '#7c3aed' }); }
      return { C, F, Px };
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; Q26.room(ctx, w, h, h, { top: '#f8fafc', bot: '#f1f5f9' });
      if (g.both) { const a = D.panel(ctx, S, g, h * .3, h * .5, true); const b = D.panel(ctx, S, g, h * .74, h * .44, false); Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.4)'; ctx.fillRect(g.x0, h * .53, w - g.x0, 2); }); S._C = a.C; S._C2 = b.C; }
      else { const r = D.panel(ctx, S, g, h * .5, h * .8, p.view === 'cc'); S._C = r.C; S._C2 = null; }
      Q26.banner(ctx, w, 'اسحب مركز التكور C', '#be185d', 20);
    },
    drags(S) { if (!S.W || !S._C) return []; const g = D.geo(S), L = [];
      const cc = S.p.view !== 'cv', Ca = S._C; L.push({ id: 'C', x: Ca[0], y: Ca[1], r: 22, axis: 'x', keep: true, tip: 'اسحب مركز التكور لتغيير نصف القطر', idle: 'اسحب C ✋', drag: (S, d) => { const Px = cc ? g.w - 60 : g.x0 + (g.w - g.x0) * .48; setParam(S, 'R', Math.abs(Px - d.x) / g.pxcm); } });
      if (S.p.q4 && cc) { const R = S.p.R * g.pxcm, ay = g.both ? g.h * .3 : g.h * .5, Px = g.w - 60, F = Px - R / 2, pos = { P: [Px + 14, ay - 16], C: [Px - R, ay + 20], F: [F, ay + 20], f: [(F + Px) / 2, ay - 18], ax: [g.x0 + 60, ay - 14] };
        TERMS.forEach(t => L.push({ id: 'q' + t[0], x: pos[t[0]][0], y: pos[t[0]][1], r: 18, hint: false, tip: 'اضغط لترى المصطلح', click: S => { S.rev = Object.assign({}, S.rev, { [t[0]]: 1 }); S.nrev = Object.keys(S.rev).length; } })); }
      return L; },
    readings(S) { return [rd('نصف قطر التكور R', S.p.R + ' cm'), rd('البعد البؤري f = R/2', Q26.r1(S.p.R / 2) + ' cm'), rd('بؤرة المقعرة', 'حقيقية (أمام المرآة)'), rd('بؤرة المحدبة', 'وهمية (خلف المرآة)')]; },
    explain(S) { return Q26.ex('في المقعرة تتجمع الأشعة المنعكسة في نقطة حقيقية أمام المرآة، وفي المحدبة تتفرق الأشعة وكأنها خارجة من نقطة خلف المرآة.', 'كل شعاع ينعكس وفق قانون الانعكاس، والعمود المقام عند كل نقطة هو نصف القطر المار بمركز التكور C؛ وبما أن الأعمدة تختلف من نقطة لأخرى فإن المقعرة تحني الأشعة نحو المحور والمحدبة تبعدها عنه. والبؤرة تقع في منتصف المسافة بين C و P.', 'ملعقة الطعام: جهتها الداخلية مرآة مقعرة وجهتها الخارجية مرآة محدبة!'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   D2) مسار الأشعة الساقطة على المرايا الكروية (ص 78) — المرآة المقعرة: ثلاثة أشعة + صورة جسم
   ========================================================================================= */
(() => {
  const RAY = { r1: '1) موازٍ للمحور ← يمر بالبؤرة', r2: '2) مارّ بالبؤرة ← موازٍ للمحور', r3: '3) مارّ بمركز التكور ← على نفسه', all: 'الأشعة الثلاثة معاً' };
  const D = { id: 'g8_curve_rays', page: 78, fig: 'مسار الأشعة الساقطة على المرايا الكروية ص 78',
    desc: 'مسار الأشعة الساقطة على المرآة المقعرة: 1) الشعاع الموازي للمحور الرئيس ينعكس ماراً بالبؤرة. 2) الشعاع المار بالبؤرة الحقيقية ينعكس موازياً للمحور الرئيس. 3) الشعاع المار بمركز التكور ينعكس على نفسه. وبهذه الأشعة نحدد صورة أي جسم.',
    tags: 'مسار الأشعة المرآة المقعرة البؤرة مركز التكور موازي للمحور ينعكس على نفسه صورة حقيقية',
    tools: ['مرآة مقعرة', 'جسم (سهم)'],
    steps: ['اختر الشعاع الأول: يسقط موازياً للمحور الرئيس فينعكس ماراً بالبؤرة F.', 'اختر الشعاع الثاني: يمر بالبؤرة الحقيقية فينعكس موازياً للمحور الرئيس.', 'اختر الشعاع الثالث: يمر بمركز التكور C فينعكس على نفسه.', 'اختر «الأشعة الثلاثة معاً» وشغّل «الجسم وصورته»، ثم اسحب الجسم: أين تلتقي الأشعة المنعكسة؟', 'سؤال ص 78: ما البؤرة الحقيقية؟'],
    concl: ['الشعاع الساقط موازياً للمحور الرئيس ينعكس ماراً بالبؤرة.', 'الشعاع الساقط ماراً بالبؤرة الحقيقية ينعكس موازياً للمحور الرئيس.', 'الشعاع المار بمركز التكور ينعكس على نفسه لأنه يسقط عمودياً على سطح المرآة.', 'البؤرة الحقيقية: النقطة التي تتلاقى فيها الأشعة المنعكسة الفعلية.'],
    laws: ['g8_sph'],
    controls: [SEL('ray', 'الشعاع', Object.entries(RAY), 'all'), TG('obj', 'الجسم وصورته', false, null, 'eye'), TG('ext', 'الامتدادات (الصورة الوهمية)', true, null, 'ray'), TG('lab', 'الأسماء', true, null, 'labels')],
    setup(S) { S.u = 60; S.hy = .5; S.ry = .7; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, Px = w - 50, ay = h * .55, pxcm = Math.min((Px - x0 - 20) / 90, h / 60), f = 20 * pxcm, R = 40 * pxcm; return { w, h, ph, x0, Px, ay, pxcm, f, R, C: [Px - R, ay], F: [Px - f, ay], ap: Math.min(h * .34, R * .66) }; },
    xArc(g, y) { return g.C[0] + Math.sqrt(Math.max(0, g.R * g.R - (y - g.ay) ** 2)); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10 : 12.5, al = Math.asin(g.ap / g.R), x1 = g.x0 + 10;
      Q26.room(ctx, w, h, h, { top: '#f8fafc', bot: '#f1f5f9' }); Q26.axis(ctx, g.x0 + 4, w - 6, g.ay, '#16a34a');
      const show = k => p.ray === 'all' || p.ray === k;
      if (!p.obj) { // book figure: three rays from the left
        const y1 = g.ay - g.ap * S.ry; S._r1 = [x1 + 20, y1];
        if (show('r1')) { const H = [D.xArc(g, y1), y1], dir = Q26.nrm([g.F[0] - H[0], g.F[1] - H[1]]); Q26.ray(ctx, [[x1, y1], H, [H[0] + dir[0] * (H[0] - x1) * 1.1, H[1] + dir[1] * (H[0] - x1) * 1.1]], '#dc2626', { w: 2.6 }); }
        if (show('r2')) { const S0 = [x1 + 40, g.ay - g.ap * .32], d0 = Q26.nrm([g.F[0] - S0[0], g.F[1] - S0[1]]), t = (g.ap * .6) / d0[1], yH = g.F[1] + d0[1] * (Math.abs(t) * 0 + 1) * 0; void yH; // extend beyond F to the mirror
          const yy = S0[1] + d0[1] * ((g.Px - S0[0]) / d0[0]), H = [D.xArc(g, yy), yy]; Q26.ray(ctx, [S0, g.F, H, [x1, yy]], '#2563eb', { w: 2.6 }); }
        if (show('r3')) { const S0 = [x1 + 30, g.ay + g.ap * .55], d0 = Q26.nrm([g.C[0] - S0[0], g.C[1] - S0[1]]), hit = Q26.sphHit(S0, d0, g.C, g.R, 0, al); if (hit) { Q26.ray(ctx, [S0, hit.pt], '#16a34a', { w: 2.6 }); Q26.ray(ctx, [hit.pt, [S0[0] + 30, S0[1] + 30 * d0[1] / d0[0]]], '#16a34a', { w: 1.6, at: .3 }); } }
      } else { // object + image (ideal mirror equation 1/f = 1/u + 1/v)
        const u = S.u, f = 20, v = (u === f) ? Infinity : 1 / (1 / f - 1 / u), m = -v / u, ho = g.ap * .55 * S.hy + 18, Ox = g.Px - u * g.pxcm, top = [Ox, g.ay - ho];
        Q26.obj(ctx, Ox, g.ay, ho, '#2563eb');
        const real = isFinite(v) && v > 0, Ix = g.Px - (isFinite(v) ? v : 1e4) * g.pxcm, hi = m * ho, itop = [Ix, g.ay - hi];
        const col = ['#dc2626', '#2563eb', '#16a34a'];
        // ray 1
        if (show('r1')) { const H = [D.xArc(g, top[1]), top[1]]; let dir = Q26.nrm([g.F[0] - H[0], g.F[1] - H[1]]); Q26.ray(ctx, [top, H, [H[0] + dir[0] * 900, H[1] + dir[1] * 900]], col[0], { w: 2.3 }); if (!real && isFinite(v) && p.ext !== false) Q26.ray(ctx, [H, itop], col[0], { dash: true }); }
        // ray 2 (through F, or from F direction)
        if (show('r2') && Math.abs(u - f) > .5) { const d0 = Q26.nrm([top[0] - g.F[0], top[1] - g.F[1]]), dd = u > f ? [-d0[0], -d0[1]] : d0; const yy = top[1] + dd[1] * ((g.Px - top[0]) / dd[0]); if (Math.abs(yy - g.ay) < g.ap) { const H = [D.xArc(g, yy), yy]; Q26.ray(ctx, [top, H, [g.x0, yy]], col[1], { w: 2.3 }); if (!real && p.ext !== false) Q26.ray(ctx, [H, [Math.max(itop[0], g.Px + 200), yy]], col[1], { dash: true }); } }
        // ray 3 through C
        if (show('r3') && Math.abs(u - 40) > .5) { const d0 = Q26.nrm([g.C[0] - top[0], g.C[1] - top[1]]), dd = u > 40 ? d0 : [-d0[0], -d0[1]], hit = Q26.sphHit(top, dd, g.C, g.R, 0, al); if (hit) { Q26.ray(ctx, [top, hit.pt], col[2], { w: 2.3 }); Q26.ray(ctx, [hit.pt, [hit.pt[0] - dd[0] * 900, hit.pt[1] - dd[1] * 900]], col[2], { w: 1.6, at: .15 }); if (!real && p.ext !== false) Q26.ray(ctx, [hit.pt, itop], col[2], { dash: true }); } }
        if (isFinite(v) && Math.abs(Ix) < 1e4 && Ix > g.x0 - 50 && Ix < w + 400) Q26.obj(ctx, Ix, g.ay, hi, real ? '#ea580c' : '#9333ea', { dash: !real, alpha: .9 });
        const txt = !isFinite(v) ? 'الجسم في البؤرة: الأشعة المنعكسة متوازية ⟸ لا تتكون صورة' : (real ? 'صورة حقيقية مقلوبة ' : 'صورة وهمية معتدلة ') + (Math.abs(m) > 1.02 ? 'مكبرة' : Math.abs(m) < .98 ? 'مصغرة' : 'بحجم الجسم') + (real ? ' (أمام المرآة)' : ' (خلف المرآة)');
        Q26.T(ctx, txt, Q26.cx(w), 56, { s: fs + 1, w: 900, c: '#fff', bg: real ? '#ea580c' : '#9333ea' });
        if (p.lab !== false) Q26.T(ctx, 'u = ' + Math.round(u) + ' cm ، v = ' + (isFinite(v) ? Math.round(v) + ' cm' : '∞') + ' ، f = 20 cm', Q26.cx(w), 82, { s: fs, w: 800, c: '#334155' });
        S._top = top;
      }
      Q26.sphMirror(ctx, g.C, g.R, 0, al);
      Q26.pt(ctx, g.C[0], g.ay, 'C', '#1d4ed8', 20); Q26.pt(ctx, g.F[0], g.ay, 'F', '#dc2626', 20); Q26.pt(ctx, g.Px, g.ay, '', '#1d4ed8'); Q26.T(ctx, 'P', g.Px + 14, g.ay - 14, { s: fs + 2, w: 900, c: '#1d4ed8' });
      if (p.lab !== false && !g.ph) Q26.card(ctx, S, [{ t: '1) موازٍ للمحور ⟸ يمر بالبؤرة', c: '#dc2626', w: 900 }, { t: '2) يمر بالبؤرة ⟸ موازٍ للمحور', c: '#2563eb', w: 900 }, { t: '3) يمر بمركز التكور ⟸ على نفسه', c: '#16a34a', w: 900 }], { title: 'مسار الأشعة في المرآة المقعرة', bd: '#be185d', x: 76 + 290, wd: 290, y: 44 });
      Q26.banner(ctx, w, p.obj ? 'اسحب الجسم على المحور' : 'اختر الشعاع', '#be185d', 20);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); if (!S.p.obj) return S._r1 && (S.p.ray === 'all' || S.p.ray === 'r1') ? [{ id: 'ray1', x: S._r1[0], y: S._r1[1], r: 24, axis: 'y', keep: true, tip: 'اسحب لتغيير ارتفاع الشعاع الموازي', idle: 'حرّك الشعاع ✋', drag: (S, d) => { S.ry = clamp((g.ay - d.y) / g.ap, .15, .95); } }] : []; if (!S._top) return []; return [{ id: 'obj', x: S._top[0], y: S._top[1] + 10, w: 40, h: 60, axis: 'xy', keep: true, tip: 'اسحب الجسم على المحور الرئيس', idle: 'حرّك الجسم ✋', drag: (S, d) => { S.u = Math.round(clamp((g.Px - d.x) / g.pxcm, 6, 85)); S.hy = clamp((g.ay - d.y - 18) / (g.ap * .55), .2, 1); } }]; },
    readings(S) { if (!S.p.obj) return [rd('البعد البؤري f', '20 cm'), rd('نصف قطر التكور R', '40 cm')]; const u = S.u, v = u === 20 ? Infinity : 1 / (1 / 20 - 1 / u); return [rd('بعد الجسم u', u + ' cm'), rd('بعد الصورة v', isFinite(v) ? Math.round(v) + ' cm' + (v < 0 ? ' (خلف المرآة)' : '') : '∞'), rd('التكبير', isFinite(v) ? Q26.nf(Math.abs(v / u), 2) : '—')]; },
    explain(S) { return Q26.ex(S.p.obj ? 'الأشعة المنعكسة من رأس الجسم تتلاقى (أو تتلاقى امتداداتها) في نقطة واحدة هي رأس الصورة.' : 'لكل شعاع من الأشعة الثلاثة مسار نعرفه مسبقاً بعد الانعكاس.', 'الشعاع المار بمركز التكور يسقط عمودياً على المرآة (لأنه نصف قطر) فيرتد على نفسه، والموازي للمحور يتجه إلى البؤرة، والمار بالبؤرة يعود موازياً — مثل طريق ذهاب وإياب.', 'أضواء السيارة الأمامية: المصباح في بؤرة مرآة مقعرة فتخرج الأشعة متوازية وتضيء الطريق بعيداً.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   D3) الصورة المتكونة في المرآة المحدبة (ص 78): مصغرة معتدلة وهمية بين البؤرة والمرآة
   ========================================================================================= */
(() => {
  const D = { id: 'g8_convex_img', page: 78, fig: 'الصورة في المرآة المحدبة ص 78',
    desc: 'للصورة المتكونة في المرآة المحدبة حالة واحدة فقط أينما كان موضع الجسم: صورة مصغرة معتدلة وهمية تقع خلف المرآة بين البؤرة والمرآة.',
    tags: 'المرآة المحدبة صورة مصغرة معتدلة وهمية بين البؤرة والمرآة حالة واحدة',
    tools: ['مرآة محدبة', 'جسم (سهم)'],
    steps: ['اسحب الجسم بعيداً عن المرآة ثم قرّبه منها.', 'الشعاع الموازي للمحور ينعكس وكأنه صادر من البؤرة الوهمية F (امتداده المتقطع يمر بها).', 'الشعاع المتجه نحو مركز التكور C ينعكس على نفسه.', 'امتدادا الشعاعين يلتقيان خلف المرآة في رأس الصورة: لاحظ أنها دائماً مصغرة معتدلة وهمية بين F والمرآة.'],
    concl: ['الصورة في المرآة المحدبة دائماً: مصغرة، معتدلة، وهمية، تقع خلف المرآة بين البؤرة والمرآة.', 'كلما ابتعد الجسم صغرت صورته واقتربت من البؤرة.', 'لذلك تعطينا المرآة المحدبة مجال رؤية واسعاً وتظهر الأجسام فيها أبعد مما هي في الحقيقة.'],
    laws: ['g8_sph'],
    controls: [TG('ext', 'الامتدادات خلف المرآة', true, null, 'ray'), TG('lab', 'الأسماء والقيم', true, null, 'labels')],
    setup(S) { S.u = 50; S.hy = .7; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, Px = x0 + (w - x0) * .66, ay = h * .58, pxcm = Math.min((Px - x0 - 20) / 75, h / 55), R = 40 * pxcm; return { w, h, ph, x0, Px, ay, pxcm, R, C: [Px + R, ay], F: [Px + R / 2, ay], ap: Math.min(h * .3, R * .7) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10 : 12.5, al = Math.asin(g.ap / g.R), u = S.u, f = -20, v = 1 / (1 / f - 1 / u), m = -v / u, ho = g.ap * .75 * S.hy + 14;
      Q26.room(ctx, w, h, h, { top: '#f8fafc', bot: '#f1f5f9' }); Q26.axis(ctx, g.x0 + 4, w - 6, g.ay, '#16a34a');
      const Ox = g.Px - u * g.pxcm, top = [Ox, g.ay - ho], Ix = g.Px - v * g.pxcm, itop = [Ix, g.ay - m * ho];
      const xArc = y => g.C[0] - Math.sqrt(Math.max(0, g.R * g.R - (y - g.ay) ** 2));
      // ray 1: parallel → reflects as if from F
      const H1 = [xArc(top[1]), top[1]], d1 = Q26.nrm([H1[0] - g.F[0], H1[1] - g.F[1]]); Q26.ray(ctx, [top, H1, [H1[0] + d1[0] * 900, H1[1] + d1[1] * 900]], '#dc2626', { w: 2.4 }); if (p.ext !== false) Q26.ray(ctx, [H1, g.F], '#dc2626', { dash: true });
      // ray 2: toward C → back on itself
      const d2 = Q26.nrm([g.C[0] - top[0], g.C[1] - top[1]]), h2 = Q26.sphHit(top, d2, g.C, g.R, Math.PI, al);
      if (h2) { Q26.ray(ctx, [top, h2.pt], '#16a34a', { w: 2.4 }); Q26.ray(ctx, [h2.pt, [h2.pt[0] - d2[0] * 260, h2.pt[1] - d2[1] * 260]], '#16a34a', { w: 1.5, at: .4 }); if (p.ext !== false) Q26.ray(ctx, [h2.pt, g.C], '#16a34a', { dash: true }); }
      Q26.obj(ctx, Ox, g.ay, ho, '#2563eb'); Q26.obj(ctx, Ix, g.ay, m * ho, '#9333ea', { dash: true });
      Q26.sphMirror(ctx, g.C, g.R, Math.PI, al);
      Q26.pt(ctx, g.F[0], g.ay, 'F', '#dc2626', 20); Q26.pt(ctx, g.C[0], g.ay, 'C', '#1d4ed8', 20); Q26.T(ctx, 'P', g.Px - 12, g.ay + 18, { s: fs + 2, w: 900, c: '#1d4ed8' });
      if (p.lab !== false) { Q26.T(ctx, 'الجسم', Ox, g.ay + 22, { s: fs, w: 900, c: '#fff', bg: '#2563eb' }); Q26.T(ctx, 'الصورة', Ix, g.ay - m * ho - 16, { s: fs, w: 900, c: '#fff', bg: '#9333ea' });
        Q26.T(ctx, 'صورة مصغرة (×' + Q26.nf(m, 2) + ') معتدلة وهمية بين F والمرآة', Q26.cx(w), h - 90, { s: fs + 1, w: 900, c: '#fff', bg: '#9333ea' }); Q26.T(ctx, 'u = ' + u + ' cm ، v = ' + Q26.nf(-v, 3) + ' cm خلف المرآة ، f = 20 cm', Q26.cx(w), 82, { s: fs, w: 800, c: '#334155' }); }
      Q26.banner(ctx, w, 'اسحب الجسم', '#be185d', 20); S._top = top;
    },
    drags(S) { if (!S.W || !S._top) return []; const g = D.geo(S); return [{ id: 'obj', x: S._top[0], y: S._top[1] + 10, w: 40, h: 60, axis: 'xy', keep: true, tip: 'اسحب الجسم', idle: 'حرّك الجسم ✋', drag: (S, d) => { S.u = Math.round(clamp((g.Px - d.x) / g.pxcm, 5, 72)); S.hy = clamp((g.ay - d.y - 14) / (g.ap * .75), .2, 1); } }]; },
    readings(S) { const u = S.u, v = 1 / (1 / -20 - 1 / u); return [rd('بعد الجسم', u + ' cm'), rd('بعد الصورة (خلف المرآة)', Q26.nf(-v, 3) + ' cm'), rd('التكبير', Q26.nf(-v / u, 2)), rd('الصفات', 'مصغرة معتدلة وهمية')]; },
    record(S) { const u = S.u, v = 1 / (1 / -20 - 1 / u); return { u, v: +(-v).toFixed(1), m: +(-v / u).toFixed(2) }; },
    cols: [['u', 'بعد الجسم (cm)'], ['v', 'بعد الصورة (cm)'], ['m', 'التكبير']],
    explain(S) { return Q26.ex('أينما حرّكت الجسم تبقى الصورة صغيرة ومعتدلة وخلف المرآة بين البؤرة والقطب.', 'المرآة المحدبة تفرّق الأشعة، فلا تتلاقى الأشعة المنعكسة الحقيقية أبداً، وإنما تتلاقى امتداداتها خلف المرآة؛ لذلك الصورة وهمية دائماً.', 'مرآة السيارة الجانبية محدبة: تريك شارعاً واسعاً في مرآة صغيرة.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   D4) تطبيقات المرايا الكروية (ص 79) + التفكير الناقد (إشعال النار، مجال الرؤية، «الصورة أبعد منها في الحقيقة»)
   ========================================================================================= */
(() => {
  const SC = { fire: 'إشعال ورقة بالمرآة المقعرة (التفكير الناقد س2)', wide: 'مرآة محدبة: مجال رؤية واسع (س3)', dent: 'مرآة طبيب الأسنان (مقعرة للتكبير)', tele: 'المرقاب (التلسكوب) العاكس' };
  const D = { id: 'g8_curve_uses', page: 79, fig: 'تطبيقات المرايا الكروية ص 79',
    desc: 'تستثمر المرايا الكروية في تطبيقات متعددة: المرآة المقعرة لتكبير أسنان المريض وفي المرقاب العاكس، والمرآة المحدبة تزودنا بمجال رؤية واسع (المرآة الأمنية، مرآة السيارة الجانبية، المرايا في المحلات).',
    tags: 'تطبيقات المرايا الكروية طبيب الأسنان المرآة الأمنية مرآة السيارة مجال رؤية واسع المرقاب العاكس تلسكوب إشعال النار',
    tools: ['مرآة مقعرة', 'مرآة محدبة', 'ورقة', 'سيارات', 'تلسكوب'],
    steps: ['إشعال الورقة: اسحب الورقة على المحور حتى تصل إلى بؤرة المرآة المقعرة وراقب درجة حرارتها. ثم بدّل إلى المرآة المحدبة: هل تشتعل؟', 'مجال الرؤية: قارن ما يراه السائق في مرآة مستوية ومرآة محدبة بالحجم نفسه. كم سيارة يرى في كل منهما؟', 'مرآة الأسنان: قرّب المرآة المقعرة من السن (داخل البعد البؤري) فتظهر صورته مكبرة معتدلة.', 'المرقاب العاكس: تتبع الأشعة من نجم بعيد: المرآة المقعرة تجمعها، ومرآة مستوية صغيرة توجهها إلى العدسة العينية.'],
    concl: ['المرآة المقعرة تجمع أشعة الشمس في بؤرتها الحقيقية فتتركز الطاقة وتشتعل الورقة، أما المحدبة فتفرّق الأشعة فلا يمكن إشعال النار بها.', 'المرآة المحدبة تعطي مجال رؤية أوسع من المستوية، لكن صورها مصغرة فتبدو الأجسام أبعد مما هي في الحقيقة؛ لذلك يكتب عليها «الصورة في المرآة أبعد منها في الحقيقة» وتوضع في منعطفات الطرق الخطرة.', 'مرآة طبيب الأسنان مقعرة: عندما يكون السن بين البؤرة والمرآة تتكون له صورة معتدلة مكبرة.', 'المرقاب العاكس يستعمل مرآة مقعرة كبيرة لجمع الضوء الضعيف القادم من النجوم.'],
    laws: ['g8_sph'],
    controls: [SEL('sc', 'التطبيق', Object.entries(SC), 'fire'), SEL('mt', 'نوع المرآة (إشعال الورقة)', [['cc', 'مقعرة'], ['cv', 'محدبة']], 'cc'), BT('', [{ t: '↺ ورقة جديدة', on: S => { S.T = 30; S.burn = 0; } }]), TG('rays', 'الأشعة', true, null, 'ray'), TG('lab', 'الأسماء والقيم', true, null, 'labels')],
    setup(S) { S.px = .35; S.T = 30; S.burn = 0; S.dz = .3; S.cvx = 0; },
    update(S, dt) { if (S.p.sc !== 'fire' || !S.W) return; const g = D.gf(S), conc = S.p.mt === 'cc' ? D.conc(S, g) : .2; const target = 30 + 260 * conc; S.T += (target - S.T) * Math.min(1, dt * .5); if (S.T > 233 && !S.burn) { S.burn = 1; K.cheer(S, g.paperX, g.ay - 40); } },
    gf(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, Px = w - 40, ay = h * .52, R = Math.min((Px - x0) * .8, h * 1.1), ap = Math.min(h * .3, R * .4); const f = R / 2; return { w, h, ph, x0, Px, ay, R, f, ap, F: Px - f, paperX: x0 + 40 + S.px * (Px - x0 - 80) }; },
    conc(S, g) { const d = Math.abs(g.paperX - g.F), spot = Math.max(3, 2 * g.ap * d / g.f); return clamp(6 / spot, 0, 1); },
    draw(ctx, w, h, S) {
      const p = S.p, fs = w < 600 ? 10 : 12.5;
      if (p.sc === 'fire') {
        const g = D.gf(S); G.bg(ctx, w, h, false); Q26.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 0, 0, h); sk.addColorStop(0, '#7dd3fc'); sk.addColorStop(1, '#fef3c7'); ctx.fillStyle = sk; ctx.fillRect(0, 0, w, h); });
        const cc = p.mt === 'cc', C = cc ? [g.Px - g.R, g.ay] : [g.Px + g.R, g.ay], ang0 = cc ? 0 : Math.PI, al = Math.asin(g.ap / g.R);
        Q26.sun(ctx, g.x0 + 34, h * .14, 18, S.t);
        if (p.rays !== false) for (let k = 0; k < 9; k++) { const y = g.ay - g.ap * .92 + 2 * g.ap * .92 * k / 8, hit = Q26.sphHit([g.x0, y], [1, 0], C, g.R, ang0, al); if (!hit) continue; let nn = hit.n; if (nn[0] > 0) nn = [-nn[0], -nn[1]]; const r = Q26.refl([1, 0], nn);
          // stop at the paper plane if crossing it
          let end = [hit.pt[0] + r[0] * 2000, hit.pt[1] + r[1] * 2000]; const tP = (g.paperX - hit.pt[0]) / r[0]; let pre = [g.x0, y]; if (g.paperX < hit.pt[0] && Math.abs(y - g.ay) < 46 && g.x0 < g.paperX) pre = null;
          if (tP > 0 && Math.abs(hit.pt[1] + r[1] * tP - g.ay) < 46) end = [g.paperX, hit.pt[1] + r[1] * tP];
          if (pre) Q26.ray(ctx, [pre, hit.pt, end], '#f59e0b', { w: 1.8, glow: false }); }
        Q26.sphMirror(ctx, C, g.R, ang0, al);
        // paper on a stand
        const T = S.T, burnt = S.burn; Q26.raw(ctx, () => { const x = g.paperX; ctx.fillStyle = '#57534e'; ctx.fillRect(x - 2, g.ay + 46, 4, h - g.ay - 46); ctx.fillStyle = burnt ? '#292524' : shade('#fafaf9', -Math.round(clamp((T - 30) / 200, 0, 1) * 90)); ctx.fillRect(x - 4, g.ay - 46, 8, 92);
          if (burnt) { for (let k = 0; k < 3; k++) { const fl = 1 + .2 * Math.sin(S.t * 12 + k); ctx.fillStyle = k % 2 ? '#f97316' : '#facc15'; ctx.beginPath(); ctx.moveTo(x - 10 + k * 8, g.ay - 30); ctx.quadraticCurveTo(x - 4 + k * 8, g.ay - 70 * fl, x + 2 + k * 6, g.ay - 30); ctx.fill(); } ctx.fillStyle = 'rgba(120,113,108,.4)'; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(x + Math.sin(S.t + k) * 10, g.ay - 80 - ((S.t * 30 + k * 25) % 150), 8 + k, 0, TAU); ctx.fill(); } } });
        if (cc) Q26.pt(ctx, g.F, g.ay, 'F', '#dc2626', 64); else Q26.pt(ctx, g.Px + g.f, g.ay, 'F', '#9333ea', 64);
        if (p.lab !== false) { C2.dial(ctx, g.x0 + 70, h - 150, 46, T, 300, 'درجة حرارة الورقة', '°C'); Q26.T(ctx, burnt ? '🔥 اشتعلت الورقة!' : cc ? 'قرّب الورقة من البؤرة' : 'المرآة المحدبة تفرّق الأشعة: لن تشتعل', Q26.cx(w), 56, { s: fs + 1, w: 900, c: '#fff', bg: burnt ? '#dc2626' : '#475569' }); }
        S._pp = [g.paperX, g.ay];
      } else if (p.sc === 'wide') {
        G.bg(ctx, w, h, false); const x0 = w < 600 ? 8 : 70, lane = [h * .25, h * .5, h * .75];
        Q26.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(0, h * .12, w, h * .76); ctx.fillStyle = '#65a30d'; ctx.fillRect(0, 0, w, h * .12); ctx.fillRect(0, h * .88, w, h * .12); ctx.strokeStyle = '#fde047'; ctx.setLineDash([24, 18]); ctx.lineWidth = 3; [h * .375, h * .625].forEach(y => { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }); ctx.setLineDash([]); });
        const car = (x, y, col, me) => Q26.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = 6; ctx.fillStyle = col; rr(ctx, x - 44, y - 21, 88, 42, 12); ctx.fill(); ctx.restore(); ctx.fillStyle = 'rgba(15,23,42,.65)'; rr(ctx, x + 6, y - 16, 20, 32, 5); ctx.fill(); rr(ctx, x - 30, y - 15, 14, 30, 4); ctx.fill(); if (me) { ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(x + 44, y - 13, 4, 0, TAU); ctx.arc(x + 44, y + 13, 4, 0, TAU); ctx.fill(); } });
        const cx0 = w - 110, cy0 = lane[1], E = [cx0 + 4, cy0 - 6], M = [cx0 + 30, cy0 - 30], cv = !!S.cvx, half = 15;
        const dn = Q26.nrm([M[0] - E[0], M[1] - E[1]]), rc = Q26.nrm([-1, -.12]), n0 = Q26.nrm([rc[0] - dn[0], rc[1] - dn[1]]), md = [-n0[1], n0[0]], A = [M[0] - md[0] * half, M[1] - md[1] * half], B = [M[0] + md[0] * half, M[1] + md[1] * half];
        const edge = (P, sg) => { const k = cv ? .36 : 0, n = Q26.nrm([n0[0] + k * sg * md[0], n0[1] + k * sg * md[1]]), d = Q26.nrm([P[0] - E[0], P[1] - E[1]]); return Q26.refl(d, n); };
        const rA = edge(A, -1), rB = edge(B, 1), cr = (a, b) => a[0] * b[1] - a[1] * b[0];
        const cars = [[x0 + 80, lane[0]], [x0 + 230, lane[1]], [x0 + 150, lane[2]], [x0 + 360, lane[0]], [x0 + 420, lane[2]], [x0 + 520, lane[1]]].filter(c => c[0] < cx0 - 120);
        const inside = c => { const v = [c[0] - M[0], c[1] - M[1]]; return cr(rA, v) * cr(rB, v) < 0 && Q26.dot(v, [rA[0] + rB[0], rA[1] + rB[1]]) > 0; };
        if (p.rays !== false) Q26.raw(ctx, () => { ctx.fillStyle = cv ? 'rgba(196,181,253,.22)' : 'rgba(147,197,253,.22)'; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(A[0] + rA[0] * 1500, A[1] + rA[1] * 1500); ctx.lineTo(B[0] + rB[0] * 1500, B[1] + rB[1] * 1500); ctx.lineTo(B[0], B[1]); ctx.closePath(); ctx.fill(); });
        let seen = 0; cars.forEach((c, i) => { const ok = inside(c); if (ok) seen++; car(c[0], c[1], ok ? ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#14b8a6'][i] : '#64748b'); });
        car(cx0, cy0, '#f8fafc', true);
        if (p.rays !== false) { Q26.ray(ctx, [E, A, [A[0] + rA[0] * 1500, A[1] + rA[1] * 1500]], '#fde047', { w: 1.6, glow: false }); Q26.ray(ctx, [E, B, [B[0] + rB[0] * 1500, B[1] + rB[1] * 1500]], '#fde047', { w: 1.6, glow: false }); }
        Q26.raw(ctx, () => { ctx.strokeStyle = cv ? '#a78bfa' : '#60a5fa'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(A[0], A[1]); if (cv) ctx.quadraticCurveTo(M[0] - n0[0] * 9, M[1] - n0[1] * 9, B[0], B[1]); else ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.lineCap = 'butt'; });
        Q26.T(ctx, (cv ? 'مرآة محدبة' : 'مرآة مستوية') + ': يرى السائق ' + seen + ' من ' + cars.length + ' سيارات', Q26.cx(w), h * .06 + 4, { s: fs + 1, w: 900, c: '#fff', bg: cv ? '#7c3aed' : '#1d4ed8' });
        const bx = x0 + 120, by = h * .94; C2.btn(ctx, bx, by, 200, 34, cv ? 'بدّل إلى مرآة مستوية' : 'بدّل إلى مرآة محدبة', { col: '#be185d', s: 12 }); S._wb = [bx, by];
        if (cv && p.lab !== false) Q26.T(ctx, 'السيارات تبدو أصغر ⟸ «الصورة في المرآة أبعد منها في الحقيقة»', Q26.cx(w), h * .06 + 30, { s: fs, w: 900, c: '#fff', bg: 'rgba(124,58,237,.9)' });
      } else if (p.sc === 'dent') {
        G.bg(ctx, w, h, false); const x0 = w < 600 ? 8 : 70, ay = h * .5, pxcm = Math.min((w - x0) / 14, 55), f = 3 * pxcm;
        Q26.raw(ctx, () => { const gg = ctx.createLinearGradient(0, 0, 0, h); gg.addColorStop(0, '#fee2e2'); gg.addColorStop(1, '#fecaca'); ctx.fillStyle = gg; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.ellipse(x0 + (w - x0) * .3, ay + 110, (w - x0) * .3, 70, 0, Math.PI, TAU); ctx.fill(); });
        const tooth = (x, y, sc, a = 1) => Q26.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(sc, sc); ctx.fillStyle = '#fefce8'; ctx.strokeStyle = '#a8a29e'; ctx.lineWidth = 1.5 / sc; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.quadraticCurveTo(-18, -26, -8, -34); ctx.quadraticCurveTo(0, -30, 8, -34); ctx.quadraticCurveTo(18, -26, 14, 0); ctx.quadraticCurveTo(8, 18, 4, 30); ctx.lineTo(0, 10); ctx.lineTo(-4, 30); ctx.quadraticCurveTo(-8, 18, -14, 0); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#78350f'; ctx.beginPath(); ctx.arc(4, -18, 4, 0, TAU); ctx.fill(); ctx.restore(); });
        const teeth = [-2, -1, 0, 1, 2].map(k => x0 + (w - x0) * .3 + k * 44); teeth.forEach(x => tooth(x, ay + 76, 1.1)); const Tx = teeth[4], Ty = ay + 50;
        const Mx = Tx + (1 + S.dz * 4) * pxcm, u = Mx - Tx, v = 1 / (1 / f - 1 / u), m = -v / u;
        Q26.raw(ctx, () => { ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(Mx + 6, Ty + 30); ctx.lineTo(Mx + 140, h * .95); ctx.stroke(); ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.ellipse(Mx, Ty, 8, 36, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(Mx - 2, Ty, 6, 32, 0, Math.PI / 2, Math.PI * 1.5); ctx.stroke(); });
        Q26.pt(ctx, Mx - f, Ty + 60, 'F', '#b91c1c', 18); Q26.dimx(ctx, Tx, Mx, Ty - 60, 'u = ' + Q26.nf(u / pxcm, 2) + ' cm', '#334155', fs);
        // what the dentist sees (inset)
        const ix = w - 130, iy = h * .3, ir = 90; Q26.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#e0f2fe'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(ix, iy, ir, 0, TAU); ctx.fill(); ctx.stroke(); ctx.clip(); });
        if (v < 0) tooth(ix, iy + 10, clamp(1.1 * m * .6, 1, 2.6)); else { tooth(ix, iy + 10, 1.1 * clamp(Math.abs(m), .3, 3) * -1 < 0 ? 1 : 1, .25); }
        Q26.raw(ctx, () => { ctx.restore(); }); Q26.T(ctx, 'ما يراه الطبيب في المرآة', ix, iy - ir - 14, { s: fs, w: 900, c: '#fff', bg: '#be185d' });
        Q26.T(ctx, v < 0 ? 'السن بين البؤرة والمرآة ⟸ صورة معتدلة مكبرة ×' + Q26.nf(m, 2) : 'السن أبعد من البؤرة ⟸ الصورة مقلوبة وغير واضحة في المرآة', Q26.cx(w), 56, { s: fs + 1, w: 900, c: '#fff', bg: v < 0 ? '#15803d' : '#b91c1c' });
        S._tx = [Mx, Ty]; S._tpx = [Tx, pxcm];
      } else {
        G.bg(ctx, w, h, false); Q26.raw(ctx, () => { ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#fff'; for (let k = 0; k < 50; k++) ctx.fillRect((k * 97) % w, (k * 53) % h, 1.4, 1.4); });
        const x0 = w < 600 ? 8 : 70, ay = h * .55, tL = x0 + 40, tR = w - 50, rad = Math.min(h * .16, 90), Rm = (tR - tL) * 1.6, C = [tR - Rm, ay], al = Math.asin(rad * .95 / Rm), fpt = tR - Rm / 2 + 0;
        Q26.raw(ctx, () => { const tg = ctx.createLinearGradient(0, ay - rad, 0, ay + rad); tg.addColorStop(0, '#e5e7eb'); tg.addColorStop(.5, '#f9fafb'); tg.addColorStop(1, '#9ca3af'); ctx.fillStyle = tg; ctx.globalAlpha = .25; ctx.fillRect(tL, ay - rad, tR - tL, 2 * rad); ctx.globalAlpha = 1; ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 3; ctx.strokeRect(tL, ay - rad, tR - tL, 2 * rad); });
        const sm = [fpt, ay], half = rad * .28, m1 = [sm[0] - half * .707, sm[1] - half * .707], m2 = [sm[0] + half * .707, sm[1] + half * .707];
        for (let k = 0; k < 5; k++) { const y = ay - rad * .8 + rad * 1.6 * k / 4; if (Math.abs(y - ay) < half * .8) continue; const hit = Q26.sphHit([tL - 30, y], [1, 0], C, Rm, 0, al); if (!hit) continue; let nn = hit.n; if (nn[0] > 0) nn = [-nn[0], -nn[1]]; const r = Q26.refl([1, 0], nn); const hm = Q26.seg(hit.pt, r, m1, m2); if (!hm) { Q26.ray(ctx, [[tL - 30, y], hit.pt, [hit.pt[0] + r[0] * 400, hit.pt[1] + r[1] * 400]], '#fde047', { w: 1.6, glow: false }); continue; } const r2 = Q26.refl(r, Q26.nrm([-.707, .707])), end = [hm.pt[0] + r2[0] * (rad + 50), hm.pt[1] + r2[1] * (rad + 50)]; Q26.ray(ctx, [[tL - 30, y], hit.pt, hm.pt, end], '#fde047', { w: 1.6, glow: false }); }
        Q26.sphMirror(ctx, C, Rm, 0, al); Q26.mirror(ctx, m1, m2, Q26.nrm([.707, -.707]), { th: 5 });
        Q26.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, sm[0] - 14, ay - rad - 40, 28, 40, 4); ctx.fill(); });
        Q26.eye(ctx, sm[0], ay - rad - 70, .7, Math.PI / 2);
        if (p.lab !== false) { Q26.T(ctx, 'مرآة مقعرة كبيرة', tR - 60, ay + rad + 20, { s: fs, w: 900, c: '#fde047' }); Q26.T(ctx, 'مرآة مستوية صغيرة', sm[0] + 40, ay + rad * .45, { s: fs, w: 900, c: '#bae6fd' }); Q26.T(ctx, 'العدسة العينية', sm[0] + 70, ay - rad - 24, { s: fs, w: 900, c: '#e2e8f0' }); Q26.T(ctx, 'ضوء نجم بعيد (أشعة متوازية)', tL + 90, ay + rad + 20, { s: fs, w: 900, c: '#fde047' }); }
      }
      Q26.banner(ctx, w, p.sc === 'fire' ? 'اسحب الورقة إلى البؤرة' : p.sc === 'wide' ? 'اضغط لتبديل نوع المرآة' : p.sc === 'dent' ? 'اسحب مرآة الطبيب' : 'تتبع مسار الضوء في المرقاب العاكس', '#be185d', 20); K.party(ctx, S);
    },
    drags(S) { if (!S.W) return []; const p = S.p;
      if (p.sc === 'fire' && S._pp) { const g = D.gf(S); return [{ id: 'paper', x: S._pp[0], y: S._pp[1], w: 40, h: 100, axis: 'x', keep: true, tip: 'اسحب الورقة على المحور', idle: 'حرّك الورقة ✋', drag: (S, d) => { S.px = clamp((d.x - g.x0 - 40) / (g.Px - g.x0 - 80), 0, .97); } }]; }
      if (p.sc === 'wide' && S._wb) return [{ id: 'swap', x: S._wb[0], y: S._wb[1], w: 200, h: 40, tip: 'بدّل بين المرآة المستوية والمحدبة', click: S => { S.cvx = S.cvx ? 0 : 1; } }];
      if (p.sc === 'dent' && S._tx) return [{ id: 'dmirror', x: S._tx[0], y: S._tx[1], r: 36, axis: 'x', keep: true, tip: 'اسحب مرآة الطبيب نحو السن أو بعيداً عنه', idle: 'حرّك المرآة ✋', drag: (S, d) => { S.dz = clamp(((d.x - S._tpx[0]) / S._tpx[1] - 1) / 4, 0, 1); } }];
      return []; },
    readings(S) { const p = S.p; if (p.sc === 'fire') return [rd('نوع المرآة', p.mt === 'cc' ? 'مقعرة' : 'محدبة'), rd('درجة حرارة الورقة', Math.round(S.T) + ' °C'), rd('الحالة', S.burn ? 'اشتعلت' : 'لم تشتعل')]; return []; },
    explain(S) { const p = S.p.sc;
      if (p === 'fire') return Q26.ex(S.p.mt === 'cc' ? 'عندما تصل الورقة إلى البؤرة تتجمع عليها أشعة الشمس في نقطة صغيرة فترتفع حرارتها حتى تشتعل.' : 'الأشعة تتفرق بعد الانعكاس عن المحدبة فلا تتجمع على الورقة.', 'المرآة المقعرة لامّة تجمع الطاقة الضوئية في البؤرة الحقيقية، أما المحدبة فمفرّقة بؤرتها وهمية لا يصلها ضوء حقيقي (التفكير الناقد س2).', 'الأفران الشمسية تطبخ الطعام بمرايا مقعرة كبيرة.');
      if (p === 'wide') return Q26.ex('المرآة المحدبة تري السائق سيارات أكثر من المستوية بالحجم نفسه.', 'سطحها المحدب يجعل الأعمدة المقامة عند الحافتين مائلة للخارج، فترتد الأشعة بزاوية أوسع. لكن الصورة مصغرة فتبدو السيارات أبعد مما هي (س3).', 'المرآة الأمنية في المحلات ومنعطفات الطرق الخطرة محدبة.');
      if (p === 'dent') return Q26.ex('صورة السن في مرآة الطبيب كبيرة ومعتدلة.', 'السن قريب جداً من المرآة المقعرة (بين البؤرة والمرآة) فتتكون صورة وهمية معتدلة مكبرة.', 'مرآة الحلاقة ومرآة التجميل مقعرة للسبب نفسه.');
      return Q26.ex('أشعة النجم المتوازية تنعكس عن المرآة المقعرة الكبيرة وتتجمع، ثم توجهها مرآة مستوية صغيرة إلى العين.', 'كلما كبرت المرآة المقعرة جمعت ضوءاً أكثر، فنرى نجوماً خافتة جداً.', 'أكبر المراقب في العالم مراقب عاكسة بمرايا قطرها أمتار.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

M8.merge({ id: 'g8_curved', ch: 26, sec: 'الدرس 2: المرايا الكروية', page: 77, kind: 'نشاط', fig: 'المرايا الكروية ص 77–79',
  title: 'المرايا الكروية: المقعرة والمحدبة ومسار الأشعة وتطبيقاتها',
  desc: 'تجربة بأربعة أجزاء: (1) مقارنة المرآة المقعرة والمحدبة ومصطلحاتهما والبؤرة الحقيقية والوهمية، (2) مسار الأشعة الثلاثة على المرآة المقعرة، (3) صورة المرآة المحدبة، (4) تطبيقات المرايا الكروية والتفكير الناقد.',
  tags: 'مرايا كروية مقعرة محدبة',
  fact: ['تكتب على المرآة المحدبة في السيارات عبارة «الصورة في المرآة أبعد منها في الحقيقة» لأن صورها مصغرة (التفكير الناقد س3).', 'يقال إن أرخميدس أحرق سفن الأعداء بتركيز أشعة الشمس بمرايا مقعرة.'],
  quiz: [
    { q: 'لماذا يسمّى مركز الكرة التي تكون المرآة جزءاً منها بمركز التكور؟', o: ['لأنه نقطة تتوسط سطح المرآة', 'لأنه مركز الكرة التي اقتطعت منها المرآة', 'لأنه تتجمع فيه الأشعة المنعكسة'], a: 1, why: 'مراجعة الدرس س3 (ص 79).' },
    { q: 'ماذا يحدث للشعاع الضوئي عند سقوطه على مرآة مقعرة ماراً بالبؤرة؟', o: ['ينعكس على نفسه', 'ينعكس موازياً للمحور الرئيس', 'ينعكس ماراً بمركز التكور'], a: 1, why: 'مراجعة الفصل س3-2 (ص 88).' },
    { q: 'توضع المرآة المحدبة في منعطفات الطرق الخطرة لأنها:', o: ['تكبر الصور', 'تعطي مجال رؤية واسعاً', 'تجمع الأشعة في البؤرة'], a: 1, why: 'مراجعة الفصل س3-8 (ص 88).' }],
  parts: [{ id: 'g8_curve_terms', n: 'المقعرة والمحدبة: المصطلحات والبؤرة' }, { id: 'g8_curve_rays', n: 'مسار الأشعة على المرآة المقعرة' }, { id: 'g8_convex_img', n: 'الصورة في المرآة المحدبة' }, { id: 'g8_curve_uses', n: 'تطبيقات المرايا الكروية' }] });

/* refraction helpers */
Q26.N = { air: 1, water: 4 / 3, glass: 1.5 };
Q26.V = { air: '3×10⁸', water: '2.25×10⁸', glass: '2×10⁸' };
Q26.fresnel = (i, n1, n2) => { const si = Math.sin(i), st = n1 / n2 * si; if (st >= 1) return 1; const ci = Math.cos(i), ct = Math.sqrt(1 - st * st), rs = (n1 * ci - n2 * ct) / (n1 * ci + n2 * ct), rp = (n1 * ct - n2 * ci) / (n1 * ct + n2 * ci); return (rs * rs + rp * rp) / 2; };
/* Fermat path P (index nP) → E (index nE) across horizontal surface y = sy : returns surface point */
Q26.fermat = (P, E, sy, nP, nE) => { let a = Math.min(P[0], E[0]) - 400, b = Math.max(P[0], E[0]) + 400; const f = x => nP * Math.hypot(x - P[0], sy - P[1]) + nE * Math.hypot(E[0] - x, E[1] - sy);
  for (let k = 0; k < 80; k++) { const m1 = a + (b - a) * .382, m2 = a + (b - a) * .618; if (f(m1) < f(m2)) b = m2; else a = m1; } return [(a + b) / 2, sy]; };
/* apparent position of P seen from E (two close pupils) */
Q26.apparent = (P, E, sy, nP, nE, dp = 6) => { const v = Q26.nrm([P[0] - E[0], P[1] - E[1]]), q = [-v[1], v[0]], E1 = [E[0] + q[0] * dp, E[1] + q[1] * dp], E2 = [E[0] - q[0] * dp, E[1] - q[1] * dp];
  const S1 = Q26.fermat(P, E1, sy, nP, nE), S2 = Q26.fermat(P, E2, sy, nP, nE); const d1 = Q26.nrm([S1[0] - E1[0], S1[1] - E1[1]]), d2 = Q26.nrm([S2[0] - E2[0], S2[1] - E2[1]]);
  const den = d1[0] * d2[1] - d1[1] * d2[0]; if (Math.abs(den) < 1e-9) return { A: P, S: Q26.fermat(P, E, sy, nP, nE) }; const t = ((E2[0] - E1[0]) * d2[1] - (E2[1] - E1[1]) * d2[0]) / den; return { A: [E1[0] + d1[0] * t, E1[1] + d1[1] * t], S: Q26.fermat(P, E, sy, nP, nE) }; };
Q26.waterBody = (ctx, x, y, w, h, o = {}) => K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, o.c1 || 'rgba(56,189,248,.55)'); g.addColorStop(1, o.c2 || 'rgba(3,105,161,.7)'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke(); });

/* =========================================================================================
   E1) ما انكسار الضوء؟ (ص 80، الشكل 1) — من الهواء إلى الماء ومن الماء إلى الهواء
   ========================================================================================= */
(() => {
  const D = { id: 'g8_refr', page: 80, fig: 'الشكل 1',
    desc: 'انكسار الضوء: تغيّر مسار الشعاع الضوئي عند انتقاله بين وسطين شفافين مختلفين في الكثافة الضوئية إذا سقط بصورة مائلة على السطح الفاصل. الكثافة الضوئية صفة طبيعية للوسط تحدد سرعة الضوء فيه.',
    tags: 'انكسار الضوء الكثافة الضوئية زاوية السقوط زاوية الانكسار يقترب من العمود يبتعد عن العمود سرعة الضوء الماء الزجاج',
    tools: ['حوض ماء', 'ضوء ليزر', 'قطعة زجاج'],
    steps: ['الشكل 1 (يمين): وجّه الليزر من الهواء نحو الماء بصورة مائلة (اسحب الليزر). لاحظ أن الشعاع المنكسر يقترب من العمود المقام.', 'وجّه الليزر عمودياً على السطح: هل ينكسر؟', 'الشكل 1 (يسار): اختر «من الماء إلى الهواء»: الشعاع المنكسر يبتعد عن العمود المقام.', 'شغّل «نبضات الضوء» لترى أن الضوء يتباطأ في الماء (2.25×10⁸ m/s) وفي الزجاج (2×10⁸ m/s).', 'سجّل زاوية السقوط وزاوية الانكسار لزوايا مختلفة.', 'سؤال ص 80: لماذا ينكسر الضوء مقترباً من العمود المقام عندما ينتقل من الهواء إلى الماء؟'],
    concl: ['ينكسر الضوء عند انتقاله بصورة مائلة بين وسطين شفافين مختلفين في الكثافة الضوئية.', 'من وسط أقل كثافة ضوئية إلى أكثر (هواء ← ماء): ينكسر مقترباً من العمود المقام وتكون زاوية السقوط أكبر من زاوية الانكسار.', 'من وسط أكثر كثافة ضوئية إلى أقل (ماء ← هواء): ينكسر مبتعداً عن العمود المقام وتكون زاوية السقوط أصغر من زاوية الانكسار.', 'سبب الانكسار تغيّر سرعة الضوء: 3×10⁸ m/s في الفراغ، 2.25×10⁸ m/s في الماء، 2×10⁸ m/s في الزجاج.', 'الشعاع الساقط عمودياً لا ينكسر.'],
    laws: ['g8_refr', 'g8_light'],
    controls: [SEL('dir', 'الاتجاه', [['aw', 'من الهواء إلى الوسط'], ['wa', 'من الوسط إلى الهواء']], 'aw'), SEL('med', 'الوسط', [['water', 'الماء'], ['glass', 'الزجاج']], 'water'),
      TG('nm', 'العمود المقام', true, null, 'vector'), TG('ang', 'الزوايا', true, null, 'labels'), TG('pul', 'نبضات الضوء (السرعة)', true, null, 'velocity'), TG('refl', 'الشعاع المنعكس جزئياً', true, null, 'ray')],
    setup(S) { S.th = 40; S.rows = S.rows || []; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, cx = Q26.cx(w), sy = h * .5, R = Math.min(h * .4, (w - (ph ? 20 : 80)) * .42); return { w, h, ph, cx, sy, R, O: [cx, sy], x0: ph ? 0 : 64 }; },
    calc(S) { const p = S.p, n2 = Q26.N[p.med], aw = p.dir === 'aw', n1 = aw ? 1 : n2, nb = aw ? n2 : 1, i = S.th * Math.PI / 180, st = n1 / nb * Math.sin(i); return { n1, nb, i, tir: st >= 1, r: st >= 1 ? null : Math.asin(st), R: Q26.fresnel(i, n1, nb), aw }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, c = D.calc(S), fs = g.ph ? 10.5 : 12.5, O = g.O, sgn = c.aw ? 1 : -1; // +1: incident from top
      G.bg(ctx, w, h, false); Q26.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, w, g.sy); });
      if (p.med === 'water') Q26.waterBody(ctx, 0, g.sy, w, h - g.sy); else Q26.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.sy, 0, h); gg.addColorStop(0, 'rgba(203,213,225,.55)'); gg.addColorStop(1, 'rgba(148,163,184,.75)'); ctx.fillStyle = gg; ctx.fillRect(0, g.sy, w, h - g.sy); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, g.sy); ctx.lineTo(w, g.sy); ctx.stroke(); });
      Q26.T(ctx, 'هواء', g.x0 + 40, g.sy - 20, { s: fs + 1, w: 900, c: '#e2e8f0' }); Q26.T(ctx, p.med === 'water' ? 'ماء' : 'زجاج', g.x0 + 40, g.sy + 22, { s: fs + 1, w: 900, c: '#fff' });
      const L = g.R, inc = [O[0] - Math.sin(c.i) * L, O[1] - sgn * Math.cos(c.i) * L];
      if (p.nm !== false) Q26.normal(ctx, O[0], O[1], Math.PI / 2, L * .95, '#e2e8f0', 'العمود المقام');
      Q26.ray(ctx, [inc, O], '#ef4444', { w: 3 });
      const refl = [O[0] + Math.sin(c.i) * L, O[1] - sgn * Math.cos(c.i) * L];
      if (p.refl !== false || c.tir) Q26.ray(ctx, [O, refl], '#ef4444', { w: c.tir ? 3 : 1.2 + 4 * c.R, alpha: c.tir ? 1 : .35 + c.R });
      let out = null; if (!c.tir) { out = [O[0] + Math.sin(c.r) * L, O[1] + sgn * Math.cos(c.r) * L]; Q26.ray(ctx, [O, out], '#ef4444', { w: 3 * (1 - c.R) + .5 }); }
      Q26.laser(ctx, inc[0], inc[1], Math.atan2(O[1] - inc[1], O[0] - inc[0]), Q26.sc(w, h));
      if (p.pul !== false) { const vin = 1 / c.n1, vout = 1 / c.nb, sp = 160, ph = (S.t * sp) % 60; Q26.raw(ctx, () => { ctx.fillStyle = '#fde047'; for (let k = 0; k < 12; k++) { const dIn = (ph * vin + k * 60 * vin); if (dIn < L) { const f = 1 - dIn / L; ctx.beginPath(); ctx.arc(O[0] + (inc[0] - O[0]) * f, O[1] + (inc[1] - O[1]) * f, 4, 0, TAU); ctx.fill(); } if (out) { const dO = ph * vout + k * 60 * vout; if (dO < L) { const f = dO / L; ctx.beginPath(); ctx.arc(O[0] + (out[0] - O[0]) * f, O[1] + (out[1] - O[1]) * f, 4, 0, TAU); ctx.fill(); } } } }); }
      if (p.ang !== false && S.th > .5) { const nUp = sgn > 0 ? -Math.PI / 2 : Math.PI / 2, nDn = -nUp; Q26.arc(ctx, O[0], O[1], L * .3, nUp, Math.atan2(inc[1] - O[1], inc[0] - O[0]), '#f87171', 'زاوية السقوط ' + Math.round(S.th) + '°', { s: fs - .5, lr: 40, fill: 'rgba(248,113,113,.15)' });
        if (out) Q26.arc(ctx, O[0], O[1], L * .3, nDn, Math.atan2(out[1] - O[1], out[0] - O[0]), '#4ade80', 'زاوية الانكسار ' + Math.round(c.r * 180 / Math.PI) + '°', { s: fs - .5, lr: 40, fill: 'rgba(74,222,128,.15)', tc: '#052e16' }); }
      if (!g.ph) Q26.card(ctx, S, [{ t: 'سرعة الضوء في الهواء ≈ 3×10⁸ m/s', c: '#0f172a' }, { t: 'سرعته في ' + (p.med === 'water' ? 'الماء' : 'الزجاج') + ' = ' + Q26.V[p.med] + ' m/s', c: '#0369a1' }, { t: c.tir ? 'انعكاس كلي داخلي (لا انكسار)' : c.aw ? 'إلى وسط أكثف ⟸ يقترب من العمود (i > r)' : 'إلى وسط أقل كثافة ⟸ يبتعد عن العمود (i < r)', c: '#be185d', w: 900 }], { title: 'لماذا ينكسر الضوء؟', bd: '#be185d', y: 44, wd: 330 });
      Q26.T(ctx, 'شعاع ضوئي ساقط', inc[0] + (c.aw ? 0 : 0), inc[1] + (sgn > 0 ? -22 : 26), { s: fs, w: 900, c: '#fff', bg: '#b91c1c' }); if (out) Q26.T(ctx, 'شعاع ضوئي منكسر', out[0], out[1] + (sgn > 0 ? 18 : -18), { s: fs, w: 900, c: '#fff', bg: '#b91c1c' });
      Q26.banner(ctx, w, 'اسحب الليزر لتغيير زاوية السقوط', '#be185d', 20);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), c = D.calc(S), sgn = c.aw ? 1 : -1, inc = [g.O[0] - Math.sin(c.i) * g.R, g.O[1] - sgn * Math.cos(c.i) * g.R];
      return [{ id: 'laser', x: inc[0] - Math.sin(c.i) * 30, y: inc[1] - sgn * Math.cos(c.i) * 30, r: 34, cx: g.O[0], cy: g.O[1], keep: true, tip: 'اسحب الليزر', idle: 'حرّك الليزر ✋', drag: (S, d) => { const v = Math.atan2(g.O[0] - d.x, sgn * (g.O[1] - d.y)) * 180 / Math.PI; S.th = Math.round(clamp(v, 0, 85)); } }]; },
    readings(S) { const c = D.calc(S); return [rd('زاوية السقوط i', Math.round(S.th) + '°'), rd('زاوية الانكسار r', c.tir ? 'انعكاس كلي' : Math.round(c.r * 180 / Math.PI) + '°'), rd('سرعة الضوء في الوسط', Q26.V[S.p.med] + ' m/s'), rd('الضوء المنعكس جزئياً', Math.round(c.R * 100) + ' %')]; },
    record(S) { const c = D.calc(S); return { dir: c.aw ? 'هواء ← ' + (S.p.med === 'water' ? 'ماء' : 'زجاج') : (S.p.med === 'water' ? 'ماء' : 'زجاج') + ' ← هواء', i: Math.round(S.th), r: c.tir ? '—' : Math.round(c.r * 180 / Math.PI) }; },
    cols: [['dir', 'الاتجاه'], ['i', 'زاوية السقوط (°)'], ['r', 'زاوية الانكسار (°)']],
    explain(S) { const c = D.calc(S); if (S.th < .5) return Q26.ex('الشعاع الساقط عمودياً يدخل الوسط دون أن يغيّر اتجاهه.', 'لا ينكسر الضوء إلا إذا سقط بصورة مائلة على السطح الفاصل، لكن سرعته تتغير.', '');
      return Q26.ex(c.tir ? 'لا يخرج الضوء إلى الهواء بل ينعكس كله داخل الوسط.' : c.aw ? 'الشعاع انحرف <b>مقترباً من العمود المقام</b>: زاوية الانكسار أصغر من زاوية السقوط.' : 'الشعاع انحرف <b>مبتعداً عن العمود المقام</b>: زاوية الانكسار أكبر من زاوية السقوط.',
        'سرعة الضوء في ' + (S.p.med === 'water' ? 'الماء' : 'الزجاج') + ' أقل منها في الهواء. تخيّل عربة تنتقل مائلة من الطريق المعبّد إلى الرمل: العجلة التي تدخل الرمل أولاً تتباطأ فتنعطف العربة نحو العمود.', 'لهذا يبدو قاع حوض السباحة أقرب مما هو في الحقيقة.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   E2) الزاوية الحرجة والانعكاس الكلي الداخلي (ص 80–81، الشكل 2 a, b, c) + الألياف البصرية (ص 82، 86)
   ========================================================================================= */
(() => {
  const D = { id: 'g8_tir', page: 80, fig: 'الشكل 2 (a, b, c) + الألياف البصرية',
    desc: 'إذا انتقل الضوء من وسط أكثف ضوئياً إلى وسط أقل كثافة وكبرت زاوية السقوط تكبر زاوية الانكسار حتى تصبح قائمة (90°): تسمى زاوية السقوط عندها الزاوية الحرجة. وإذا سقط الضوء بزاوية أكبر منها لا ينفذ بل ينعكس كله داخل الوسط: الانعكاس الكلي الداخلي.',
    tags: 'الزاوية الحرجة الانعكاس الكلي الداخلي الألياف البصرية ماء زجاج تقنية الألياف المنظار الطبي',
    tools: ['حوض ماء', 'ضوء ليزر', 'ليف بصري'],
    steps: ['الشكل 2-a: الليزر في الماء يسقط بزاوية صغيرة: ينكسر جزء منه إلى الهواء وينعكس جزء.', 'زد زاوية السقوط تدريجياً (اسحب الليزر): لاحظ أن زاوية الانكسار تكبر ويضعف الشعاع المنكسر.', 'الشكل 2-b: عند الزاوية الحرجة (اضغط «الزاوية الحرجة») ينطبق الشعاع المنكسر على السطح الفاصل.', 'الشكل 2-c: بزاوية أكبر من الحرجة ينعكس الضوء كلياً (انعكاس كلي داخلي).', 'سؤال ص 81: ما شروط حدوث الانعكاس الكلي الداخلي؟', 'المشهد الثاني: الليف البصري — وجّه الليزر في الليف المنحني، وزد انحناءه: متى يتسرب الضوء؟'],
    concl: ['الزاوية الحرجة: زاوية السقوط في الوسط الأكثف ضوئياً التي تقابلها زاوية انكسار قائمة (90°) في الوسط الأقل كثافة (الماء ≈ 48.6°، الزجاج ≈ 41.8°).', 'شرطا الانعكاس الكلي الداخلي: 1) أن ينتقل الضوء من وسط أكثر كثافة ضوئية إلى وسط أقل كثافة. 2) أن تكون زاوية السقوط أكبر من الزاوية الحرجة.', 'في الانعكاس الكلي تكون زاوية السقوط = زاوية الانعكاس وفقاً لقانون الانعكاس.', 'الألياف البصرية أنابيب رفيعة يسقط فيها الضوء على جدرانها بزاوية أكبر من الحرجة فينتقل داخلها بالانعكاس الكلي، وتستعمل في الاتصالات والإنترنت والمنظار الطبي.'],
    laws: ['g8_crit', 'g8_refr'],
    controls: [SEL('sc', 'المشهد', [['tank', 'حوض ماء (الشكل 2)'], ['fib', 'الليف البصري']], 'tank'), SEL('med', 'الوسط الأكثف', [['water', 'الماء'], ['glass', 'الزجاج']], 'water'), BT('', [{ t: 'a) أصغر من الحرجة', on: S => { S.th = 30; } }, { t: 'b) الزاوية الحرجة', on: S => { S.th = Math.asin(1 / Q26.N[S.p.med]) * 180 / Math.PI; } }, { t: 'c) أكبر من الحرجة', on: S => { S.th = 62; } }]),
      R('bend', 'انحناء الليف', 0, 1, .4, .05, ''), TG('nm', 'العمود المقام', true, null, 'vector'), TG('ang', 'الزوايا', true, null, 'labels')],
    setup(S) { S.th = 30; S.fa = .12; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, cx = Q26.cx(w), sy = h * .4, R = Math.min(h * .45, (w - (ph ? 20 : 80)) * .4); return { w, h, ph, cx, sy, R, O: [cx, sy] }; },
    fibre(S, w, h) { const ph = w < 600, x0 = ph ? 80 : 160, y0 = h * .35, L1 = (w - x0) * .3, Rb = lerp((w - x0) * .9, (w - x0) * .16, S.p.bend), th = 34 * 0 + 8, half = 16, pts = [];
      // centre-line: straight then arc bending downward
      const ang = Math.min(Math.PI * .6, ((w - x0) * .62) / Rb); for (let k = 0; k <= 10; k++) pts.push([x0 + L1 * k / 10, y0]); const C = [x0 + L1, y0 + Rb]; for (let k = 1; k <= 60; k++) { const a = -Math.PI / 2 + ang * k / 60; pts.push([C[0] + Math.cos(a) * Rb, C[1] + Math.sin(a) * Rb]); }
      const off = sg => pts.map((q, i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)], t = Q26.nrm([b[0] - a[0], b[1] - a[1]]); return [q[0] - t[1] * half * sg, q[1] + t[0] * half * sg]; });
      void th; return { pts, top: off(1), bot: off(-1), x0, y0, half }; },
    draw(ctx, w, h, S) {
      const p = S.p, fs = w < 600 ? 10.5 : 12.5, n1 = Q26.N[p.med], crit = Math.asin(1 / n1);
      if (p.sc === 'tank') {
        const g = D.geo(S), O = g.O, i = S.th * Math.PI / 180, st = n1 * Math.sin(i), tir = st >= 1 - 1e-9, Rf = Q26.fresnel(i, n1, 1);
        G.bg(ctx, w, h, false); Q26.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, w, g.sy); });
        if (p.med === 'water') Q26.waterBody(ctx, 0, g.sy, w, h - g.sy); else Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.fillRect(0, g.sy, w, h - g.sy); });
        const L = g.R, inc = [O[0] - Math.sin(i) * L, O[1] + Math.cos(i) * L], refl = [O[0] + Math.sin(i) * L, O[1] + Math.cos(i) * L];
        if (p.nm !== false) Q26.normal(ctx, O[0], O[1], Math.PI / 2, L * .9, '#e2e8f0', 'العمود المقام');
        Q26.ray(ctx, [inc, O], '#ef4444', { w: 3 }); Q26.ray(ctx, [O, refl], '#ef4444', { w: tir ? 3 : 1 + 3 * Rf, alpha: tir ? 1 : .3 + .7 * Rf });
        let out = null; if (!tir) { const r = Math.asin(Math.min(1, st)); out = [O[0] + Math.sin(r) * L, O[1] - Math.cos(r) * L]; Q26.ray(ctx, [O, out], '#ef4444', { w: Math.max(.6, 3 * (1 - Rf)) }); }
        Q26.laser(ctx, inc[0], inc[1], Math.atan2(O[1] - inc[1], O[0] - inc[0]), Q26.sc(w, h));
        if (p.ang !== false) { Q26.arc(ctx, O[0], O[1], L * .28, Math.PI / 2, Math.atan2(inc[1] - O[1], inc[0] - O[0]), '#f87171', Math.round(S.th) + '°', { s: fs, fill: 'rgba(248,113,113,.15)' }); if (out) Q26.arc(ctx, O[0], O[1], L * .28, -Math.PI / 2, Math.atan2(out[1] - O[1], out[0] - O[0]), '#4ade80', Math.round(Math.asin(Math.min(1, st)) * 180 / Math.PI) + '°', { s: fs, tc: '#052e16' }); }
        const stage = Math.abs(i - crit) < .006 ? 'b' : i < crit ? 'a' : 'c';
        const T = { a: 'a) زاوية السقوط أقل من الحرجة: ينكسر جزء وينعكس جزء', b: 'b) زاوية السقوط = الحرجة (' + Q26.nf(crit * 180 / Math.PI, 3) + '°): الانكسار 90° على السطح الفاصل', c: 'c) أكبر من الحرجة: انعكاس كلي داخلي' };
        Q26.T(ctx, T[stage], g.cx, h - 96, { s: fs + 1, w: 900, c: '#fff', bg: stage === 'c' ? '#7c3aed' : stage === 'b' ? '#ea580c' : '#0369a1' });
        Q26.T(ctx, 'هواء', (w < 600 ? 10 : 70) + 40, g.sy - 20, { s: fs + 1, w: 900, c: '#e2e8f0' }); Q26.T(ctx, p.med === 'water' ? 'ماء' : 'زجاج', (w < 600 ? 10 : 70) + 40, g.sy + 22, { s: fs + 1, w: 900, c: '#fff' });
        Q26.T(ctx, 'شعاع منعكس', refl[0], refl[1] - 18, { s: fs, w: 900, c: '#fff', bg: 'rgba(185,28,28,.85)' }); if (out) Q26.T(ctx, 'شعاع منكسر', out[0], out[1] - 16, { s: fs, w: 900, c: '#fff', bg: 'rgba(185,28,28,.85)' });
        Q26.banner(ctx, w, 'اسحب الليزر داخل الماء', '#be185d', 20); S._inc = inc;
      } else {
        const F = D.fibre(S, w, h); G.bg(ctx, w, h, false); Q26.raw(ctx, () => { ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, w, h); });
        Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(125,211,252,.22)'; ctx.beginPath(); F.top.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); for (let k = F.bot.length - 1; k >= 0; k--) ctx.lineTo(F.bot[k][0], F.bot[k][1]); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(186,230,253,.7)'; ctx.lineWidth = 1.5; [F.top, F.bot].forEach(L => { ctx.beginPath(); L.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); }); });
        // trace
        const segs = []; [F.top, F.bot].forEach(L => { for (let k = 0; k < L.length - 1; k++) segs.push([L[k], L[k + 1]]); });
        const endA = F.top[F.top.length - 1], endB = F.bot[F.bot.length - 1];
        let P = [F.x0 + 2, F.y0], d = Q26.dir(S.fa), pts = [[F.x0 - 60, F.y0 - Math.tan(S.fa) * 60], P], leaks = [], ok = 0;
        for (let k = 0; k < 120; k++) { let best = null; segs.forEach(sg => { const r = Q26.seg(P, d, sg[0], sg[1]); if (r && r.t > .3 && (!best || r.t < best.t)) best = Object.assign(r, { sg }); }); const ex = Q26.seg(P, d, endA, endB);
          if (ex && (!best || ex.t < best.t)) { pts.push(ex.pt); ok = 1; pts.push([ex.pt[0] + d[0] * 60, ex.pt[1] + d[1] * 60]); break; } if (!best) { pts.push([P[0] + d[0] * 50, P[1] + d[1] * 50]); break; }
          let nn = Q26.nrm([-(best.sg[1][1] - best.sg[0][1]), best.sg[1][0] - best.sg[0][0]]); const ci = Math.abs(Q26.dot(nn, d)), ai = Math.acos(ci); pts.push(best.pt);
          if (ai < Math.asin(1 / 1.5)) { const o = Q26.refr(d, nn, 1.5, 1); if (o) leaks.push([best.pt, [best.pt[0] + o[0] * 120, best.pt[1] + o[1] * 120]]); d = Q26.refl(d, nn); if (leaks.length > 3) break; } else d = Q26.refl(d, nn); P = best.pt; }
        Q26.ray(ctx, pts, '#f43f5e', { w: 2.2, arrows: false });
        leaks.forEach(l => Q26.ray(ctx, l, '#fb7185', { w: 1.6, alpha: .7 }));
        Q26.laser(ctx, F.x0 - 60, F.y0 - Math.tan(S.fa) * 60, S.fa, Q26.sc(w, h), { col: '#f43f5e' });
        if (ok) Q26.raw(ctx, () => { const e = [(endA[0] + endB[0]) / 2, (endA[1] + endB[1]) / 2], gl = ctx.createRadialGradient(e[0], e[1], 1, e[0], e[1], 30); gl.addColorStop(0, 'rgba(244,63,94,.9)'); gl.addColorStop(1, 'rgba(244,63,94,0)'); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(e[0], e[1], 30, 0, TAU); ctx.fill(); });
        Q26.T(ctx, leaks.length ? 'يتسرب جزء من الضوء: زاوية السقوط على الجدار أصبحت أقل من الحرجة' : 'الضوء محبوس داخل الليف بالانعكاس الكلي الداخلي ✓', Q26.cx(w), h - 96, { s: fs + 1, w: 900, c: '#fff', bg: leaks.length ? '#b91c1c' : '#15803d' });
        Q26.T(ctx, 'ليف بصري (زجاج رفيع)', F.x0 + 120, F.y0 - 36, { s: fs, w: 900, c: '#bae6fd' });
        Q26.banner(ctx, w, 'اسحب الليزر لتغيير زاوية دخوله وغيّر انحناء الليف', '#be185d', 20); S._fl = [F.x0 - 60, F.y0 - Math.tan(S.fa) * 60, F.x0, F.y0];
      }
    },
    drags(S) { if (!S.W) return []; const p = S.p;
      if (p.sc === 'tank' && S._inc) { const g = D.geo(S); return [{ id: 'laser', x: S._inc[0], y: S._inc[1], r: 34, cx: g.O[0], cy: g.O[1], keep: true, tip: 'اسحب الليزر لتغيير زاوية السقوط', idle: 'حرّك الليزر ✋', drag: (S, d) => { S.th = Math.round(clamp(Math.atan2(g.O[0] - d.x, d.y - g.O[1]) * 180 / Math.PI, 0, 85) * 2) / 2; } }]; }
      if (p.sc === 'fib' && S._fl) return [{ id: 'flaser', x: S._fl[0], y: S._fl[1], r: 30, cx: S._fl[2], cy: S._fl[3], keep: true, tip: 'اسحب لتغيير زاوية دخول الضوء', drag: (S, d) => { S.fa = clamp(Math.atan2(S._fl[3] - d.y, S._fl[2] - d.x), -.6, .6); } }];
      return []; },
    readings(S) { const n1 = Q26.N[S.p.med], crit = Math.asin(1 / n1) * 180 / Math.PI; if (S.p.sc === 'fib') return [rd('الزاوية الحرجة للزجاج', Q26.nf(crit, 3) + '°')]; const st = n1 * Math.sin(S.th * Math.PI / 180); return [rd('زاوية السقوط', Q26.nf(S.th, 3) + '°'), rd('الزاوية الحرجة', Q26.nf(crit, 3) + '°'), rd('زاوية الانكسار', st >= 1 ? 'لا يوجد (انعكاس كلي)' : Q26.nf(Math.asin(st) * 180 / Math.PI, 3) + '°')]; },
    record(S) { if (S.p.sc !== 'tank') return null; const n1 = Q26.N[S.p.med], st = n1 * Math.sin(S.th * Math.PI / 180); return { i: +S.th.toFixed(1), r: st >= 1 ? '—' : +(Math.asin(st) * 180 / Math.PI).toFixed(1), k: st >= 1 ? 'انعكاس كلي' : 'انكسار + انعكاس جزئي' }; },
    cols: [['i', 'زاوية السقوط (°)'], ['r', 'زاوية الانكسار (°)'], ['k', 'ما يحدث']],
    explain(S) { const n1 = Q26.N[S.p.med], crit = Math.asin(1 / n1) * 180 / Math.PI;
      if (S.p.sc === 'fib') return Q26.ex('الضوء يسير داخل الليف المنحني بانعكاسات كثيرة دون أن يخرج.', 'في كل مرة يسقط الضوء على جدار الليف بزاوية أكبر من الزاوية الحرجة للزجاج (' + Q26.nf(crit, 3) + '°) فينعكس كله. إذا انحنى الليف كثيراً قلت زاوية السقوط فيتسرب الضوء.', 'الألياف البصرية تنقل الإنترنت بسرعة الضوء، والمنظار الطبي يري الطبيب داخل جسم المريض.');
      return Q26.ex(S.th < crit - .3 ? 'جزء من الضوء ينكسر إلى الهواء مبتعداً عن العمود، وجزء ينعكس.' : S.th <= crit + .3 ? 'الشعاع المنكسر يسير على السطح الفاصل تماماً (زاوية انكسار 90°).' : 'لا يخرج أي ضوء إلى الهواء: <b>انعكاس كلي داخلي</b>.', 'عند الانتقال من الوسط الأكثف إلى الأقل كثافة تكون زاوية الانكسار أكبر من زاوية السقوط، فتصل إلى 90° قبل أن تصل زاوية السقوط إليها؛ وبعدها لا يستطيع الضوء الخروج.', 'لمعان الماس سببه الانعكاس الكلي الداخلي (زاويته الحرجة صغيرة جداً).'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   E3) نشاط: العمق الحقيقي والعمق الظاهري (ص 81) + القصبة في الماء + رؤية الأجسام في غير موقعها (ص 81–82)
   ========================================================================================= */
(() => {
  const SC = { coin: 'نشاط: قطعة النقود في الكأس', straw: 'القصبة في الماء تبدو مكسورة', fish: 'صياد السمك والسمكة', diver: 'الغواص يرى الطائر' };
  const NW = 4 / 3;
  const D = { id: 'g8_depth', page: 81, fig: 'نشاط ص 81 + صور ص 81–82',
    desc: 'نضع قطعة نقود في قاع كأس زجاجي مدرج ونسكب الماء تدريجياً: تبدو القطعة أقرب إلى سطح الماء من موقعها الحقيقي. يسمى بعد الصورة الوهمية عن سطح الماء العمق الظاهري، ويحدث ذلك بسبب انكسار الأشعة الضوئية.',
    tags: 'العمق الحقيقي العمق الظاهري قطعة نقود كأس مدرج قصبة مكسورة صياد سمكة غواص رؤية الأجسام في غير موقعها',
    tools: ['كأس زجاجي مدرج', 'ماء', 'قطعة نقود معدنية'],
    steps: ['أحضر كأساً زجاجياً مدرجاً وماءً وقطعة نقود معدنية.', 'ضع قطعة النقود في قاع الكأس، واسكب الماء تدريجياً (اسحب الإبريق أو مستوى الماء).', 'انظر إلى قطعة النقود من أعلى سطح الماء (العين فوق الكأس)، وحدّد موقع صورة القطعة بعد ملء الكأس بالماء. ماذا تلاحظ؟', 'انظر إلى قطعة النقود بصورة مائلة من خلال الماء (اسحب العين). أين تقع صورة القطعة المعدنية؟ فسّر ذلك.', 'المشاهد الأخرى: القصبة في الماء، والصياد والسمكة، والغواص والطائر.'],
    concl: ['تبدو قطعة النقود أقرب إلى سطح الماء من موقعها الحقيقي: العمق الظاهري أقل من العمق الحقيقي (للنظر العمودي: العمق الظاهري ≈ العمق الحقيقي ÷ 1.33).', 'السبب: الأشعة الصادرة من القطعة تنكسر مبتعدة عن العمود المقام عند خروجها من الماء إلى الهواء، فترى العين الصورة في موقع تقاطع امتدادات الأشعة المنكسرة.', 'القصبة في الماء تبدو مكسورة لأن كل نقطة من جزئها المغمور تبدو أقرب إلى السطح.', 'الناظر خارج الماء يرى الجسم المغمور أقرب من موقعه الحقيقي، أما الغواص داخل الماء فيرى الأجسام في الهواء في موقع أبعد من موقعها الحقيقي.'],
    laws: ['g8_refr'],
    controls: [SEL('sc', 'المشهد', Object.entries(SC), 'coin'), R('lvl', 'ارتفاع الماء في الكأس', 0, 12, 10, .5, 'cm'), TG('rays', 'الأشعة وامتداداتها', true, null, 'ray'), TG('real', 'الموقع الحقيقي (للمقارنة)', true, null, 'eye'), TG('lab', 'القياسات', true, null, 'labels')],
    setup(S) { S.ex = .7; S.ey = .12; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, s = Q26.sc(w, h); return { w, h, ph, x0, s, cx: Q26.cx(w) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10 : 12.5;
      if (p.sc === 'coin' || p.sc === 'straw') {
        Q26.room(ctx, w, h, h * .86, { top: '#f1f5f9', bot: '#e2e8f0' });
        const pxcm = Math.min(h * .55 / 16, (w - g.x0) * .5 / 12), cw = 9 * pxcm, bx = g.x0 + (w - g.x0) * .38, by = h * .86, top = by - 15 * pxcm, sy = by - p.lvl * pxcm;
        // water + glass
        if (p.lvl > 0) Q26.waterBody(ctx, bx - cw / 2 + 3, sy, cw - 6, by - sy - 3, { c1: 'rgba(125,211,252,.45)', c2: 'rgba(14,165,233,.55)' });
        Q26.raw(ctx, () => { ctx.strokeStyle = 'rgba(100,116,139,.9)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx - cw / 2, top); ctx.lineTo(bx - cw / 2, by); ctx.lineTo(bx + cw / 2, by); ctx.lineTo(bx + cw / 2, top); ctx.stroke(); ctx.fillStyle = 'rgba(226,232,240,.25)'; ctx.fillRect(bx - cw / 2, top, cw, by - top); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; for (let k = 1; k <= 14; k++) { const y = by - k * pxcm; ctx.beginPath(); ctx.moveTo(bx - cw / 2, y); ctx.lineTo(bx - cw / 2 + (k % 2 ? 6 : 12), y); ctx.stroke(); } });
        for (let k = 2; k <= 14; k += 2) Q26.T(ctx, String(k), bx - cw / 2 + 22, by - k * pxcm, { s: 9.5, w: 700, c: '#334155' });
        const E = [g.x0 + (w - g.x0) * S.ex, h * S.ey + 40];
        if (p.sc === 'coin') {
          const C = [bx, by - 6]; const coin = (x, y, a, dash) => Q26.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; const gg = ctx.createLinearGradient(x - 18, 0, x + 18, 0); gg.addColorStop(0, '#a16207'); gg.addColorStop(.5, '#fde68a'); gg.addColorStop(1, '#a16207'); ctx.fillStyle = gg; if (dash) { ctx.setLineDash([3, 3]); ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.5; } ctx.beginPath(); ctx.ellipse(x, y, 18, 5, 0, 0, TAU); ctx.fill(); if (dash) ctx.stroke(); ctx.restore(); });
          let A = C; if (p.lvl > 0 && E[1] < sy) { const ap = Q26.apparent(C, E, sy, NW, 1); A = ap.A; if (p.rays !== false) { [[-8, 0], [8, 0]].forEach((o, k) => { const Ee = [E[0] + o[0], E[1]], Sp = Q26.fermat(C, Ee, sy, NW, 1); Q26.ray(ctx, [C, Sp, Ee], k ? '#16a34a' : '#dc2626', { w: 2 }); Q26.ray(ctx, [Sp, A], k ? '#16a34a' : '#dc2626', { dash: true, w: 1.6 }); }); Q26.normal(ctx, ap.S[0], sy, Math.PI / 2, 40, '#475569'); } }
          else if (p.rays !== false) Q26.ray(ctx, [C, E], '#dc2626', { w: 2 });
          coin(C[0], C[1], p.real !== false || p.lvl === 0 ? 1 : .15); if (p.lvl > 0 && E[1] < sy) coin(A[0], A[1], .85, true);
          if (p.lab !== false && p.lvl > 0) { const rd0 = (sy - C[1]) / -pxcm, ad = (sy - A[1]) / -pxcm; Q26.card(ctx, S, [{ t: 'العمق الحقيقي = ' + Q26.nf(Math.abs(rd0), 3) + ' cm', c: '#b45309', w: 900 }, { t: 'العمق الظاهري = ' + Q26.nf(Math.abs(ad), 3) + ' cm', c: '#7c3aed', w: 900 }, { t: 'النسبة = ' + Q26.nf(Math.abs(rd0 / ad), 3) + ' (للنظر العمودي 1.33)', c: '#334155' }], { title: 'العمق الحقيقي والظاهري', bd: '#be185d', y: 44, wd: 290, x: 76 + 290 });
            Q26.T(ctx, 'الصورة (العمق الظاهري)', A[0] + 90, A[1] - 12, { s: fs, w: 900, c: '#fff', bg: '#7c3aed' }); Q26.T(ctx, 'القطعة (الموقع الحقيقي)', C[0] + 90, C[1] + 16, { s: fs, w: 900, c: '#fff', bg: '#b45309' }); }
        } else {
          // straw from rim into water, inclined
          const P0 = [bx + cw * .62, top - 40], P1 = [bx - cw * .38, by - 8], col = '#ef4444';
          const real = (f) => [P0[0] + (P1[0] - P0[0]) * f, P0[1] + (P1[1] - P0[1]) * f]; const fs0 = (sy - P0[1]) / (P1[1] - P0[1]);
          if (p.real !== false || p.lvl === 0) Q26.raw(ctx, () => { ctx.strokeStyle = p.lvl > 0 ? 'rgba(239,68,68,.35)' : col; ctx.lineWidth = 9; ctx.lineCap = 'round'; if (p.lvl > 0) ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(P0[0], P0[1]); ctx.lineTo(P1[0], P1[1]); ctx.stroke(); ctx.setLineDash([]); });
          Q26.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(P0[0], P0[1]); const Wp = real(clamp(fs0, 0, 1)); ctx.lineTo(Wp[0], Wp[1]); if (p.lvl > 0 && E[1] < sy) { for (let k = 1; k <= 12; k++) { const f = fs0 + (1 - fs0) * k / 12, A = Q26.apparent(real(f), E, sy, NW, 1).A; ctx.lineTo(A[0], A[1]); } } ctx.stroke(); });
          if (p.rays !== false && p.lvl > 0 && E[1] < sy) { const Pt = real(1), Sp = Q26.fermat(Pt, E, sy, NW, 1), A = Q26.apparent(Pt, E, sy, NW, 1).A; Q26.ray(ctx, [Pt, Sp, E], '#16a34a', { w: 2 }); Q26.ray(ctx, [Sp, A], '#16a34a', { dash: true }); }
          if (p.lab !== false) Q26.T(ctx, 'القصبة تبدو مكسورة عند سطح الماء', bx, top - 70, { s: fs + 1, w: 900, c: '#fff', bg: '#be185d' });
        }
        Q26.eye(ctx, E[0], E[1], g.s, Math.atan2(sy - E[1], bx - E[0]));
        // jug to pour
        const jx = bx + cw / 2 + 70 * g.s, jy = top - 20 - (12 - p.lvl) * 2; Q26.raw(ctx, () => { ctx.save(); ctx.translate(jx, jy); ctx.rotate(-.5); ctx.fillStyle = 'rgba(186,230,253,.8)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-26, -40); ctx.lineTo(26, -40); ctx.lineTo(22, 30); ctx.lineTo(-22, 30); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-26, -40); ctx.lineTo(-38, -48); ctx.stroke(); ctx.restore(); });
        Q26.T(ctx, 'اسكب الماء', jx + 10, jy + 46, { s: fs, w: 800, c: '#0369a1' });
        S._E = E; S._jug = [jx, jy]; S._lv = [by, pxcm];
      } else {
        G.bg(ctx, w, h, false); const sy = h * .45; Q26.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 0, 0, sy); sk.addColorStop(0, '#7dd3fc'); sk.addColorStop(1, '#e0f2fe'); ctx.fillStyle = sk; ctx.fillRect(0, 0, w, sy); }); Q26.waterBody(ctx, 0, sy, w, h - sy);
        const diver = p.sc === 'diver', pxm = Math.min(h / (diver ? 6.5 : 4.5), 160);
        if (!diver) { const E = [g.x0 + (w - g.x0) * .7, sy - 1.55 * pxm], F = [g.x0 + (w - g.x0) * (.25 + S.ex * .1), sy + 1.2 * pxm], ap = Q26.apparent(F, E, sy, NW, 1), Sp = ap.S;
          Q26.person(ctx, E[0] + 10, sy - 2, pxm * 1.75 / 175, { dir: -1, shirt: '#f8fafc', pants: '#1e3a8a' });
          Q26.raw(ctx, () => { ctx.strokeStyle = '#92400e'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(E[0] + 30, E[1] + 40); ctx.lineTo(Sp[0] + (E[0] - Sp[0]) * .3, Sp[1] + (E[1] - Sp[1]) * .3 + 40); ctx.stroke(); });
          const fish = (x, y, a, dash) => Q26.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.fillStyle = dash ? 'rgba(148,163,184,.6)' : '#f97316'; if (dash) { ctx.setLineDash([4, 3]); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; } ctx.beginPath(); ctx.ellipse(0, 0, 30, 13, 0, 0, TAU); ctx.fill(); if (dash) ctx.stroke(); ctx.beginPath(); ctx.moveTo(26, 0); ctx.lineTo(44, -12); ctx.lineTo(44, 12); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(-18, -3, 2.5, 0, TAU); ctx.fill(); ctx.restore(); });
          fish(F[0], F[1], p.real !== false ? 1 : .2); fish(ap.A[0], ap.A[1], .9, true);
          if (p.rays !== false) { Q26.ray(ctx, [F, Sp, [E[0] - 6, E[1] + 4]], '#dc2626', { w: 2 }); Q26.ray(ctx, [Sp, ap.A], '#dc2626', { dash: true }); }
          if (p.lab !== false) { Q26.T(ctx, 'الموقع الحقيقي', F[0], F[1] + 30, { s: fs, w: 900, c: '#fff', bg: '#c2410c' }); Q26.T(ctx, 'الموقع الظاهري (أقرب إلى السطح)', ap.A[0], ap.A[1] - 26, { s: fs, w: 900, c: '#fff', bg: '#475569' }); Q26.T(ctx, 'هواء', g.x0 + 30, sy - 16, { s: fs, w: 900, c: '#0c4a6e' }); Q26.T(ctx, 'ماء', g.x0 + 30, sy + 18, { s: fs, w: 900, c: '#fff' }); }
          S._F = F;
        } else { const E = [g.x0 + (w - g.x0) * .62, sy + 1.9 * pxm], B = [g.x0 + (w - g.x0) * (.36 + S.ex * .06), sy - .9 * pxm], ap = Q26.apparent(B, E, sy, 1, NW), Sp = ap.S;
          const bird = (x, y, a, dash) => Q26.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.strokeStyle = dash ? '#64748b' : '#0f172a'; ctx.lineWidth = 3; if (dash) ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(-22, -6); ctx.quadraticCurveTo(-10, -18, 0, 0); ctx.quadraticCurveTo(10, -18, 22, -6); ctx.stroke(); ctx.restore(); });
          bird(B[0], B[1], p.real !== false ? 1 : .2); bird(ap.A[0], ap.A[1], .9, true);
          Q26.raw(ctx, () => { ctx.save(); ctx.translate(E[0] + 40, E[1] + 10); ctx.fillStyle = '#facc15'; rr(ctx, -10, -12, 80, 24, 12); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(-16, -4, 14, 0, TAU); ctx.fill(); ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.arc(-22, -6, 7, 0, TAU); ctx.fill(); ctx.restore(); });
          if (p.rays !== false) { Q26.ray(ctx, [B, Sp, E], '#dc2626', { w: 2 }); Q26.ray(ctx, [Sp, ap.A], '#dc2626', { dash: true }); }
          if (p.lab !== false) { Q26.T(ctx, 'الموقع الحقيقي', B[0], B[1] + 22, { s: fs, w: 900, c: '#fff', bg: '#0f172a' }); Q26.T(ctx, 'يراه الغواص أبعد (أعلى)', ap.A[0], ap.A[1] - 22, { s: fs, w: 900, c: '#fff', bg: '#475569' }); }
          S._F = B; }
      }
      Q26.banner(ctx, w, p.sc === 'coin' ? 'اسكب الماء ثم اسحب العين' : p.sc === 'straw' ? 'اسحب العين' : 'اسحب ' + (p.sc === 'fish' ? 'السمكة' : 'الطائر'), '#be185d', 20);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), p = S.p;
      if ((p.sc === 'coin' || p.sc === 'straw') && S._E) return [{ id: 'eye', x: S._E[0], y: S._E[1], r: 30, axis: 'xy', keep: true, tip: 'اسحب العين لتنظر من أعلى أو بصورة مائلة', idle: 'حرّك العين ✋', drag: (S, d) => { S.ex = clamp((d.x - g.x0) / (g.w - g.x0), .05, .95); S.ey = clamp((d.y - 40) / g.h, .02, .35); } },
        { id: 'jug', x: S._jug[0], y: S._jug[1], r: 34, axis: 'y', keep: true, hint: false, tip: 'اسحب الإبريق للأسفل لتسكب الماء (للأعلى لتفريغه)', down: S => { S.l0 = S.p.lvl; }, drag: (S, d) => setParam(S, 'lvl', Math.round(clamp((S.l0 || 0) + (d.y - d.sy) / 8, 0, 12) * 2) / 2) }];
      if (S._F) return [{ id: 'obj', x: S._F[0], y: S._F[1], r: 36, axis: 'x', keep: true, tip: 'اسحب', idle: 'حرّكني ✋', drag: (S, d) => { S.ex = clamp(((d.x - g.x0) / (g.w - g.x0) - .25) / .1, -2, 3); } }];
      return []; },
    readings(S) { const p = S.p; if (p.sc === 'coin') return [rd('ارتفاع الماء (العمق الحقيقي)', p.lvl + ' cm'), rd('العمق الظاهري (نظر عمودي)', Q26.nf(p.lvl / NW, 3) + ' cm')]; return [rd('معامل الانكسار للماء', '1.33')]; },
    record(S) { if (S.p.sc !== 'coin') return null; return { d: S.p.lvl, a: +(S.p.lvl / NW).toFixed(2) }; },
    cols: [['d', 'العمق الحقيقي (cm)'], ['a', 'العمق الظاهري للنظر العمودي (cm)']],
    graph: { x: 'd', y: 'a', xl: 'العمق الحقيقي (cm)', yl: 'العمق الظاهري (cm)', theory: x => x / NW, xmin: 0, xmax: 12 },
    explain(S) { const p = S.p.sc;
      if (p === 'coin') return S.p.lvl ? Q26.ex('تبدو قطعة النقود مرتفعة نحو سطح الماء.', 'الأشعة الخارجة من القطعة تنكسر عند السطح مبتعدة عن العمود المقام (من الماء إلى الهواء)، والعين تظن أن الضوء جاء بخط مستقيم فترى القطعة في موقع تقاطع امتدادات الأشعة المنكسرة، وهو أقرب إلى السطح.', 'لا تقفز في بركة تظنها ضحلة: عمقها الحقيقي أكبر مما يبدو!') : Q26.ex('الكأس فارغ: نرى القطعة في موقعها الحقيقي.', 'لا يوجد وسطان مختلفان فلا انكسار.', 'اسكب الماء ولاحظ.');
      if (p === 'straw') return Q26.ex('القصبة تبدو مكسورة عند سطح الماء.', 'كل نقطة من الجزء المغمور تبدو أقرب إلى السطح بسبب الانكسار، أما الجزء الذي في الهواء فيبدو في موقعه، فيظهر انكسار عند السطح.', 'رؤية الأجسام في غير أشكالها الحقيقية من تطبيقات الانكسار.');
      if (p === 'fish') return Q26.ex('يرى الصياد السمكة أقرب إلى سطح الماء من موقعها الحقيقي.', 'الشخص في الهواء (أقل كثافة ضوئية)، والأشعة الصادرة من السمكة تنكسر مبتعدة عن العمود عند خروجها، فيرى صورتها في موقع تقاطع الامتدادات.', 'الصياد الماهر يصوب رمحه أسفل الموقع الذي يرى فيه السمكة.');
      return Q26.ex('يرى الغواص الطائر أعلى (أبعد) من موقعه الحقيقي.', 'الأشعة القادمة من الهواء إلى الماء تنكسر مقتربة من العمود، فتبدو امتداداتها قادمة من موقع أبعد.', 'الأسماك ترى الصياد أطول مما هو!'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   E4) ظاهرة السراب (ص 81) — طبقات هواء حار قرب الأرض: انكسارات متتالية ثم انعكاس كلي
   ========================================================================================= */
(() => {
  const D = { id: 'g8_mirage', page: 81, fig: 'شكل السراب ص 81',
    desc: 'ظاهرة السراب: في الظهيرة في الطرق الصحراوية ترتفع حرارة الأرض فترتفع حرارة الهواء القريب منها. الأشعة الصادرة من جسم بعيد (كالنخلة) تنكسر انكسارات متتالية في طبقات الهواء، ثم ينتج انعكاس كلي عند طبقة الهواء القريبة من الأرض، فتتكون صورة وهمية مقلوبة.',
    tags: 'السراب هواء حار هواء بارد طبقات انكسارات متتالية انعكاس كلي صورة وهمية مقلوبة نخلة طريق صحراوي',
    tools: ['نخلة بعيدة', 'طبقات هواء', 'عين الناظر'],
    steps: ['ارفع درجة حرارة الأرض (اسحب الشمس للأعلى): لاحظ طبقات الهواء الحار قرب الأرض.', 'تتبع الشعاع من قمة النخلة: ينكسر في كل طبقة مبتعداً عن العمود حتى ينعكس كلياً ويرتفع نحو العين.', 'امتداد الشعاع الواصل إلى العين يبدو قادماً من تحت الأرض: صورة وهمية مقلوبة للنخلة.', 'اخفض درجة الحرارة: ماذا يحدث للسراب؟', 'سؤال س3-12: فسّر سبب تكوّن صور مقلوبة للأجسام في الطرق الصحراوية في أثناء الصيف.'],
    concl: ['الهواء الحار أقل كثافة ضوئية من الهواء البارد، فالأشعة النازلة نحو الأرض تنتقل من وسط أكثف إلى أقل كثافة فتنكسر مبتعدة عن العمود في كل طبقة.', 'عندما تصبح زاوية السقوط أكبر من الزاوية الحرجة عند طبقة قريبة من الأرض يحدث انعكاس كلي فيرتفع الشعاع نحو العين.', 'ترى العين صورة وهمية مقلوبة تحت سطح الأرض فتظن أن هناك ماءً يعكس صورة النخلة.', 'السراب من تطبيقات انكسار الضوء والانعكاس الكلي.'],
    laws: ['g8_refr', 'g8_crit'],
    controls: [R('T', 'درجة حرارة الأرض', 25, 65, 55, 1, '°C'), TG('lay', 'طبقات الهواء', true, null, 'heat'), TG('rays', 'مسار الأشعة', true, null, 'ray'), TG('ext', 'الامتدادات والصورة الوهمية', true, null, 'eye'), TG('lab', 'الأسماء', true, null, 'labels')],
    setup(S) { S.ex = .82; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, gy = h * .62, pxH = Math.min(h * .3, (w - x0) * .27); return { w, h, ph, x0, gy, pxH, s: Q26.sc(w, h), px: x0 + (w - x0) * .14, ex: x0 + (w - x0) * S.ex, ey: gy - pxH * .25, ph2: pxH * .55 }; },
    /* n(y) with y = height above ground (px). exaggerated so the effect is visible */
    nf(S, g) { const dn = Math.max(0, (S.p.T - 25) / 30) * .14, H = g.pxH * .12; return { n: y => 1 + dn * (1 - Math.exp(-Math.max(0, y) / H)), dny: y => dn / H * Math.exp(-Math.max(0, y) / H) }; },
    trace(S, g, P, a, xEnd) { const N = D.nf(S, g), ds = 3; let X = P[0], Y = P[1], ux = Math.cos(a), uy = Math.sin(a), ymin = Y; const pts = [[X, g.gy - Y]];
      for (let k = 0; k < 3000 && X < xEnd; k++) { const n = N.n(Y), px = n * ux, py = n * uy + N.dny(Y) * ds, l = Math.hypot(px, py); ux = px / l; uy = py / l; X += ux * ds; Y += uy * ds; if (Y < 0) return null; ymin = Math.min(ymin, Y); if (k % 4 === 0) pts.push([X, g.gy - Y]); }
      pts.push([X, g.gy - Y]); return { pts, y: g.gy - Y, ymin, dir: [ux, -uy] }; },
    solve(S, g, P) { const A = [], n = 300; for (let k = 0; k <= n; k++) { const a = -.01 - .6 * k / n, r = D.trace(S, g, P, a, g.ex); A.push({ a, r: r && r.ymin < g.pxH * .25 && r.dir[1] < 0 ? r : null }); }
      for (let k = 0; k < n; k++) { const u = A[k], v = A[k + 1]; if (!u.r || !v.r) continue; const fu = u.r.y - g.ey, fv = v.r.y - g.ey; if (fu * fv > 0) continue; let lo = u.a, hi = v.a, flo = fu;
        for (let j = 0; j < 25; j++) { const m = (lo + hi) / 2, r = D.trace(S, g, P, m, g.ex); if (!r || r.dir[1] >= 0) { hi = m; continue; } const fm = r.y - g.ey; if (fm * flo > 0) { lo = m; flo = fm; } else hi = m; } return D.trace(S, g, P, (lo + hi) / 2, g.ex); }
      return null; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10 : 12.5, T = p.T;
      G.bg(ctx, w, h, false); Q26.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 0, 0, g.gy); sk.addColorStop(0, '#38bdf8'); sk.addColorStop(1, '#e0f2fe'); ctx.fillStyle = sk; ctx.fillRect(0, 0, w, g.gy); const gg = ctx.createLinearGradient(0, g.gy, 0, h); gg.addColorStop(0, '#d6b77a'); gg.addColorStop(1, '#a3844f'); ctx.fillStyle = gg; ctx.fillRect(0, g.gy, w, h - g.gy); ctx.fillStyle = '#3f3f46'; ctx.fillRect(g.x0, g.gy, w - g.x0, 10); });
      Q26.sun(ctx, w - 80, 70, 24, S.t);
      if (p.lay !== false) Q26.raw(ctx, () => { const N = D.nf(S, g); for (let k = 0; k < 7; k++) { const y0 = k * g.pxH * .07, hot = (T - 25) / 40 * Math.exp(-y0 / (g.pxH * .16)); ctx.fillStyle = 'rgba(239,68,68,' + clamp(hot * .35, 0, .35) + ')'; ctx.fillRect(g.x0, g.gy - y0 - g.pxH * .07, w - g.x0, g.pxH * .07); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.x0, g.gy - y0); ctx.lineTo(w, g.gy - y0); ctx.stroke(); } void N; });
      Q26.palm(ctx, g.px, g.gy, g.ph2);
      const E = [g.ex, g.ey], top = [g.px + g.ph2 * .06, g.ph2 * .92], mid = [g.px + 4, g.ph2 * .45];
      const r1 = D.solve(S, g, top), r2 = D.solve(S, g, mid);
      if (r1) { const I1 = [g.px, E[1] + (r1.dir[1] / r1.dir[0]) * (g.px - E[0])];
        if (p.ext !== false) { // inverted virtual image: scale palm drawn upside down between I1 (top→ lower) and ground
          Q26.palm(ctx, g.px, g.gy + 10, clamp(I1[1] - g.gy - 10, 20, g.ph2), { flip: true, alpha: .45 });
          Q26.ray(ctx, [E, I1], '#7c3aed', { dash: true }); }
        if (p.rays !== false) { Q26.ray(ctx, r1.pts.concat([E]), '#dc2626', { w: 2.2, at: .3 }); if (r2) Q26.ray(ctx, r2.pts.concat([E]), '#f97316', { w: 1.6, at: .3 }); }
        if (p.lab !== false) { Q26.T(ctx, 'الصورة (وهمية مقلوبة)', g.px + 70, Math.min(h - 20, (I1[1] + g.gy) / 2 + 10), { s: fs, w: 900, c: '#fff', bg: '#7c3aed' }); }
      } else if (p.lab !== false) Q26.T(ctx, 'الأرض ليست حارة بما يكفي: لا يتكون سراب', Q26.cx(w), g.gy + 40, { s: fs + 1, w: 900, c: '#fff', bg: '#475569' });
      // direct ray (straight line, always)
      if (p.rays !== false) Q26.ray(ctx, [[top[0], g.gy - top[1]], E], '#16a34a', { w: 1.6, at: .5 });
      Q26.eye(ctx, E[0] + 14, E[1], g.s * .8, Math.PI + .05);
      if (p.lab !== false) { Q26.T(ctx, 'هواء بارد', g.x0 + 60, g.gy - g.pxH * 1.1, { s: fs, w: 900, c: '#0c4a6e' }); Q26.T(ctx, 'هواء حار', w - 90, g.gy - 14, { s: fs, w: 900, c: '#fff', bg: '#dc2626' }); Q26.T(ctx, 'الجسم', g.px - 34, g.gy - g.ph2 * .5, { s: fs, w: 900, c: '#fff', bg: '#15803d' }); Q26.T(ctx, 'درجة حرارة الأرض ' + T + ' °C', w - 80, 110, { s: fs, w: 900, c: '#9a3412' }); }
      Q26.banner(ctx, w, 'غيّر حرارة الأرض (اسحب الشمس) أو حرّك العين', '#be185d', 20); S._E = E;
    },
    drags(S) { if (!S.W || !S._E) return []; const g = D.geo(S); return [{ id: 'sun', x: S.W - 80, y: 70, r: 34, axis: 'y', keep: true, tip: 'اسحب الشمس للأعلى لرفع حرارة الأرض', idle: 'ارفع الحرارة ✋', drag: (S, d) => setParam(S, 'T', Math.round(65 - clamp((d.y - 20) / 160, 0, 1) * 40)) },
      { id: 'eye', x: S._E[0] + 14, y: S._E[1], r: 28, axis: 'x', keep: true, hint: false, tip: 'اسحب العين', drag: (S, d) => { S.ex = clamp((d.x - g.x0) / (g.w - g.x0), .55, .95); } }]; },
    readings(S) { return [rd('درجة حرارة الأرض', S.p.T + ' °C'), rd('فرق الكثافة الضوئية بين الطبقات', S.p.T > 30 ? 'كبير' : 'صغير')]; },
    explain(S) { return Q26.ex('ترى العين صورة مقلوبة للنخلة تحت سطح الطريق كأنها منعكسة على ماء.', 'الهواء قرب الأرض الحارة أقل كثافة ضوئية، فالشعاع النازل من النخلة ينكسر مبتعداً عن العمود في كل طبقة حتى يحدث له انعكاس كلي فيرتفع إلى العين. والعين تمد الشعاع بخط مستقيم إلى الخلف فترى الصورة تحت الأرض.', 'في الصيف ترى «بركة ماء» على الطريق السريع تختفي كلما اقتربت منها.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

M8.merge({ id: 'g8_refraction', ch: 26, sec: 'الدرس 3: انكسار الضوء', page: 80, kind: 'نشاط', fig: 'الشكل 1، الشكل 2، نشاط ص 81',
  title: 'انكسار الضوء: الزاوية الحرجة والانعكاس الكلي والعمق الظاهري والسراب',
  desc: 'تجربة بأربعة أجزاء: (1) انكسار الضوء بين الهواء والماء/الزجاج (الشكل 1)، (2) الزاوية الحرجة والانعكاس الكلي الداخلي والألياف البصرية (الشكل 2)، (3) نشاط العمق الحقيقي والعمق الظاهري مع القصبة والصياد والغواص، (4) ظاهرة السراب.',
  tags: 'انكسار الضوء',
  fact: ['الألياف البصرية: أنابيب ضوئية رفيعة جداً يسقط فيها الضوء على جدرانها بزاوية أكبر من الحرجة، تنقل الإشارة بسرعة وأمان ومن دون ضياع (الفيزياء والحياة ص 86).', 'الضوء والنبات: وجود الضوء شرط رئيس لنمو النباتات الخضراء لدوره في عملية البناء الضوئي (ص 86).'],
  quiz: [
    { q: 'ماذا يحدث للشعاع الضوئي عند انتقاله من وسط شفاف كثيف ضوئياً إلى وسط شفاف أقل كثافة ضوئية؟', o: ['ينكسر مقترباً من العمود المقام', 'ينكسر مبتعداً عن العمود المقام', 'لا ينكسر أبداً'], a: 1, why: 'مراجعة الفصل س3-10 (ص 88).' },
    { q: 'يشاهد الناظر خارج الماء موقع جسم مغمور في الماء في عمق أقرب إلى سطح الماء من عمقه الحقيقي، ماذا يسمى موقع الصورة غير الحقيقي؟', o: ['العمق الظاهري', 'البعد البؤري', 'الزاوية الحرجة'], a: 0, why: 'مراجعة الفصل س3-6 (ص 88).' },
    { q: 'تعد ظاهرة السراب إحدى تطبيقات .........', o: ['الانعكاس المنتظم', 'الانكسار (والانعكاس الكلي)', 'التحلل'], a: 1, why: 'مراجعة الفصل س2-4 (ص 87).' }],
  parts: [{ id: 'g8_refr', n: 'ما انكسار الضوء؟ (الشكل 1)' }, { id: 'g8_tir', n: 'الزاوية الحرجة والانعكاس الكلي' }, { id: 'g8_depth', n: 'نشاط: العمق الحقيقي والظاهري' }, { id: 'g8_mirage', n: 'ظاهرة السراب' }] });

/* lens drawing: type 'bx' (biconvex), 'px' (plano-convex, flat on the left), 'bc' (biconcave), 'pc' (plano-concave, flat on left); x centre, y axis, H half height, t = bulge */
Q26.lensShape = (ctx, x, y, H, type, t = 16, o = {}) => {
  K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = o.alpha ?? 1; const g = ctx.createLinearGradient(x - 30, 0, x + 30, 0); g.addColorStop(0, 'rgba(147,197,253,.55)'); g.addColorStop(.5, 'rgba(239,246,255,.75)'); g.addColorStop(1, 'rgba(96,165,250,.55)'); ctx.fillStyle = g; ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 1.6;
    const e = 3; ctx.beginPath();
    if (type === 'bx') { ctx.moveTo(x, y - H); ctx.quadraticCurveTo(x + 2 * t, y, x, y + H); ctx.quadraticCurveTo(x - 2 * t, y, x, y - H); }
    else if (type === 'px') { ctx.moveTo(x - e, y - H); ctx.lineTo(x - e, y + H); ctx.quadraticCurveTo(x + 2 * t, y, x - e, y - H); }
    else if (type === 'bc') { ctx.moveTo(x - t - e, y - H); ctx.quadraticCurveTo(x - e + t * .2, y, x - t - e, y + H); ctx.lineTo(x + t + e, y + H); ctx.quadraticCurveTo(x + e - t * .2, y, x + t + e, y - H); ctx.closePath(); }
    else { ctx.moveTo(x - t * .6, y - H); ctx.lineTo(x - t * .6, y + H); ctx.lineTo(x + t + e, y + H); ctx.quadraticCurveTo(x + e - t * .2, y, x + t + e, y - H); ctx.closePath(); }
    ctx.fill(); ctx.stroke(); ctx.restore(); });
};
/* thick lens surfaces for real ray tracing: returns list of surfaces [{type:'c', C, R, vx} | {type:'p', x}] */
Q26.lensSurf = (x, y, f, type, H) => { const n = 1.5, S = (vx, R, sgn) => ({ type: 'c', vx, R, C: [vx + sgn * R, y] });
  if (type === 'bx') { const R = 2 * (n - 1) * f, sag = R - Math.sqrt(Math.max(1, R * R - H * H)), tc = 2 * sag + 4; return [S(x - tc / 2, R, 1), S(x + tc / 2, R, -1)]; }
  if (type === 'px') { const R = (n - 1) * f, sag = R - Math.sqrt(Math.max(1, R * R - H * H)), tc = sag + 4; return [{ type: 'p', x: x - tc / 2 }, S(x + tc / 2, R, -1)]; }
  if (type === 'bc') { const R = 2 * (n - 1) * f; return [S(x - 2, R, -1), S(x + 2, R, 1)]; }
  const R = (n - 1) * f; return [{ type: 'p', x: x - 2 }, S(x + 2, R, 1)];
};
Q26.traceLens = (P, d, surfs, H, ay, n = 1.5) => { const pts = [P.slice()]; let Pc = P, D = d, ni = 1;
  for (let k = 0; k < surfs.length; k++) { const s = surfs[k], no = k === surfs.length - 1 ? 1 : n; let hit, nn;
    if (s.type === 'p') { const t = (s.x - Pc[0]) / D[0]; if (t <= 0) return { pts, D: null }; hit = [Pc[0] + D[0] * t, Pc[1] + D[1] * t]; nn = [-1, 0]; }
    else { const fx = Pc[0] - s.C[0], fy = Pc[1] - s.C[1], b = fx * D[0] + fy * D[1], cc = fx * fx + fy * fy - s.R * s.R, Dd = b * b - cc; if (Dd < 0) return { pts, D: null }; const sq = Math.sqrt(Dd);
      const c = [-b - sq, -b + sq].filter(t => t > 1e-3).map(t => [Pc[0] + D[0] * t, Pc[1] + D[1] * t]); if (!c.length) return { pts, D: null };
      hit = c.reduce((a, b2) => Math.abs(b2[0] - s.vx) < Math.abs(a[0] - s.vx) ? b2 : a); nn = Q26.nrm([hit[0] - s.C[0], hit[1] - s.C[1]]); }
    if (Math.abs(hit[1] - ay) > H + 1) return { pts, D: null, blocked: true };
    pts.push(hit); const r = Q26.refr(D, nn, ni, no); if (!r) return { pts, D: null }; D = r; Pc = hit; ni = no; }
  return { pts, D };
};

/* =========================================================================================
   F1) ما العدسات؟ (ص 82–83) — العدسة المحدبة (اللامة) والمقعرة (المفرقة) — مقارنة + أشكال العدسات + المصطلحات
   ========================================================================================= */
(() => {
  const TERMS = [['ax', 'المحور الرئيس'], ['F1', 'البؤرة'], ['F2', 'البؤرة'], ['O', 'المركز البصري'], ['f', 'البعد البؤري']];
  const D = { id: 'g8_lens_types', page: 82, fig: 'عدسة محدبة / عدسة مقعرة ص 82 + أشكال العدسات ص 83',
    desc: 'العدسة جسم شفاف من الزجاج أو البلاستك محدد بسطحين كرويين، وقد يكون أحدهما كروياً والآخر مستوياً. المحدبة (اللامة) سميكة من الوسط رفيعة من الأطراف تجمع الأشعة في بؤرة حقيقية، والمقعرة (المفرقة) رفيعة من الوسط سميكة من الأطراف تفرق الأشعة فتلتقي امتداداتها في بؤرة وهمية.',
    tags: 'العدسات العدسة المحدبة اللامة العدسة المقعرة المفرقة المركز البصري البؤرة الحقيقية البؤرة الوهمية البعد البؤري المحور الرئيس 2F أشكال العدسات',
    tools: ['عدسة محدبة', 'عدسة مقعرة', 'حزمة أشعة متوازية'],
    steps: ['حزمة الأشعة نفسها الموازية للمحور الرئيس تسقط على عدسة محدبة (أعلى) وعدسة مقعرة (أسفل) — كما في شكلي ص 82.', 'المحدبة: تنكسر الأشعة عند السطحين وتتجمع في نقطة خلف العدسة: البؤرة الحقيقية.', 'المقعرة: تتفرق الأشعة، وامتداداتها (المتقطعة) تلتقي أمام العدسة في البؤرة الوهمية.', 'غيّر شكل العدسة (أشكال العدسات ص 83) والبعد البؤري، ولاحظ أن الشعاع المار بالمركز البصري لا ينكسر.', 'اختبر نفسك (مراجعة الفصل س4 – الشكل 1): شغّل «الأرقام» واضغط على كل رقم.'],
    concl: ['المحدبة (اللامة): سميكة من الوسط رفيعة من الأطراف، تجمع الأشعة في نقطة تسمى البؤرة الحقيقية.', 'المقعرة (المفرقة): رفيعة من الوسط سميكة من الأطراف، تفرق الأشعة فتلتقي امتداداتها في البؤرة الوهمية.', 'المركز البصري (O): نقطة تتوسط سطح العدسة، والشعاع المار بها لا ينكسر. للعدسة بؤرتان (F) ومركزا تكور.', 'المحور الرئيس: الخط الواصل بين مركزي التكور ماراً بالمركز البصري. البعد البؤري: المسافة بين البؤرة والمركز البصري.'],
    laws: ['g8_lens', 'g8_refr'],
    controls: [SEL('view', 'العرض', [['both', 'مقارنة: المحدبة والمقعرة'], ['cx', 'المحدبة فقط'], ['cc', 'المقعرة فقط']], 'both'), SEL('shape', 'شكل العدسة', [['pl', 'مستوية–محدبة / مستوية–مقعرة (ص 82)'], ['bi', 'محدبة الوجهين / مقعرة الوجهين']], 'pl'), R('f', 'البعد البؤري f', 8, 20, 12, 1, 'cm'), R('n', 'عدد الأشعة', 3, 9, 5, 1, ''),
      TG('ext', 'الامتدادات (البؤرة الوهمية)', true, null, 'ray'), TG('cen', 'شعاع يمر بالمركز البصري', true, null, 'vector'), TG('lab', 'المصطلحات', true, null, 'labels'), TG('q4', 'اختبر نفسك: الأرقام (س4)', false, null, 'eye')],
    setup(S) { S.rev = {}; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, pxcm = Math.min((w - x0 - 40) / 64, 26), both = S.p.view === 'both'; return { w, h, ph, x0, pxcm, both, cx: x0 + (w - x0) * .45 }; },
    panel(ctx, S, g, ay, ph2, convex) {
      const p = S.p, f = p.f * g.pxcm, H = Math.min(ph2 * .36, f * .55), type = convex ? (p.shape === 'pl' ? 'px' : 'bx') : (p.shape === 'pl' ? 'pc' : 'bc'), fs = g.ph ? 10 : 12.5, x = g.cx;
      Q26.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.x0, ay - ph2 / 2, g.w - g.x0, ph2); ctx.clip(); });
      Q26.axis(ctx, g.x0 + 4, g.w - 6, ay, '#16a34a');
      const surfs = Q26.lensSurf(x, ay, f, type, H);
      for (let k = 0; k < p.n; k++) { const y = ay - H * .85 + 2 * H * .85 * k / (p.n - 1), r = Q26.traceLens([g.x0 + 6, y], [1, 0], surfs, H, ay); if (!r.D) continue; const last = r.pts[r.pts.length - 1], end = [last[0] + r.D[0] * 900, last[1] + r.D[1] * 900];
        Q26.ray(ctx, r.pts.concat([end]), '#ef4444', { w: 2, glow: false, at: .5 }); if (!convex && p.ext !== false && Math.abs(r.D[1]) > 1e-3) { const t = (last[0] - (x - f)) / r.D[0] * 1.05; Q26.ray(ctx, [last, [last[0] - r.D[0] * t, last[1] - r.D[1] * t]], '#ef4444', { dash: [5, 4], w: 1.4 }); } }
      if (p.cen !== false) { const P0 = [g.x0 + 6, ay - H * .5], d = Q26.nrm([x - P0[0], ay - P0[1]]); Q26.ray(ctx, [P0, [x + d[0] * 900, ay + d[1] * 900]], '#f59e0b', { w: 1.8, glow: false }); }
      Q26.raw(ctx, () => { ctx.restore(); });
      Q26.lensShape(ctx, x, ay, H, type, Math.max(8, H * H / (2 * f * (convex ? 1.1 : 1.6))));
      const F1 = [x - f, ay], F2 = [x + f, ay], F1b = [x - 2 * f, ay], F2b = [x + 2 * f, ay];
      [F1, F2].forEach(q => Q26.pt(ctx, q[0], ay, '', '#dc2626')); [F1b, F2b].forEach(q => { if (q[0] > g.x0 && q[0] < g.w) Q26.pt(ctx, q[0], ay, '', '#1d4ed8'); }); Q26.pt(ctx, x, ay, '', '#0f172a');
      const pos = { ax: [g.x0 + 30, ay - 14], F1: [F1[0], ay + 22], F2: [F2[0], ay + 22], O: [x - 18, ay + 26], f: [(x + F2[0]) / 2, ay + 50] };
      if (p.q4 && convex) { TERMS.forEach((t, i) => { const P2 = pos[t[0]]; Q26.T(ctx, S.rev[t[0]] ? (i + 1) + ': ' + t[1] : String(i + 1), P2[0], P2[1], { s: fs + 1, w: 900, c: '#fff', bg: S.rev[t[0]] ? '#15803d' : '#7c3aed' }); }); Q26.dimx(ctx, x, F2[0], ay + 36, '', '#7c3aed'); }
      else if (p.lab !== false) { Q26.T(ctx, 'F', F1[0], ay + 20, { s: fs + 2, w: 900, c: '#dc2626' }); Q26.T(ctx, 'F', F2[0], ay + 20, { s: fs + 2, w: 900, c: '#dc2626' }); if (F1b[0] > g.x0) Q26.T(ctx, '2F', F1b[0], ay + 20, { s: fs + 1, w: 900, c: '#1d4ed8' }); if (F2b[0] < g.w) Q26.T(ctx, '2F', F2b[0], ay + 20, { s: fs + 1, w: 900, c: '#1d4ed8' }); Q26.T(ctx, 'O', x - 14, ay + 18, { s: fs + 2, w: 900, c: '#0f172a' });
        Q26.T(ctx, convex ? 'بؤرة حقيقية' : 'بؤرة وهمية', convex ? F2[0] : F1[0], ay - 22, { s: fs, w: 900, c: '#fff', bg: convex ? '#dc2626' : '#9333ea' });
        Q26.dimx(ctx, x, convex ? F2[0] : F1[0], ay + 44, 'البعد البؤري f = ' + p.f + ' cm', '#be185d', fs);
        Q26.T(ctx, convex ? 'عدسة محدبة (لامّة): سميكة الوسط' : 'عدسة مقعرة (مفرّقة): رفيعة الوسط', x, ay - H - 16, { s: fs + 1, w: 900, c: '#fff', bg: convex ? '#0369a1' : '#7c3aed' }); }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; Q26.room(ctx, w, h, h, { top: '#f8fafc', bot: '#f1f5f9' });
      if (g.both) { D.panel(ctx, S, g, h * .3, h * .5, true); D.panel(ctx, S, g, h * .76, h * .44, false); Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.4)'; ctx.fillRect(g.x0, h * .54, w - g.x0, 2); }); }
      else D.panel(ctx, S, g, h * .5, h * .8, p.view === 'cx');
      Q26.banner(ctx, w, 'غيّر البعد البؤري أو اسحب البؤرة F', '#be185d', 20);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), cxv = S.p.view !== 'cc', ay = g.both ? g.h * .3 : g.h * .5, f = S.p.f * g.pxcm, L = [];
      L.push({ id: 'F', x: g.cx + (cxv ? f : -f), y: ay, r: 22, axis: 'x', keep: true, tip: 'اسحب البؤرة لتغيير البعد البؤري', idle: 'اسحب F ✋', drag: (S, d) => setParam(S, 'f', Math.abs(d.x - g.cx) / g.pxcm) });
      if (S.p.q4 && cxv) { const pos = { ax: [g.x0 + 30, ay - 14], F1: [g.cx - f, ay + 22], F2: [g.cx + f, ay + 22], O: [g.cx - 18, ay + 26], f: [g.cx + f / 2, ay + 50] }; TERMS.forEach(t => L.push({ id: 'q' + t[0], x: pos[t[0]][0], y: pos[t[0]][1], r: 18, hint: false, tip: 'اضغط لترى المصطلح', click: S => { S.rev = Object.assign({}, S.rev, { [t[0]]: 1 }); S.nrev = Object.keys(S.rev).length; } })); }
      return L; },
    readings(S) { return [rd('البعد البؤري f', S.p.f + ' cm'), rd('المحدبة', 'بؤرة حقيقية خلف العدسة'), rd('المقعرة', 'بؤرة وهمية أمام العدسة')]; },
    explain(S) { return Q26.ex('المحدبة تجمع الأشعة المتوازية في البؤرة الحقيقية خلفها، والمقعرة تفرقها وكأنها خارجة من البؤرة الوهمية أمامها. الشعاع المار بالمركز البصري يمر دون انكسار.', 'الضوء ينكسر مرتين: عند دخوله الزجاج وعند خروجه. في المحدبة يميل السطحان بحيث تنحني الأشعة نحو المحور، وفي المقعرة بعيداً عنه.', 'العدسة المكبرة والنظارات الطبية والكاميرا كلها عدسات.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   F2) الصورة في العدسة المحدبة: الحالات الست والعدسة المكبرة (ص 83) + العدسة المقعرة للمقارنة
   ========================================================================================= */
(() => {
  const CASES = [['inf', 'بعيد جداً (اللانهاية)', 300], ['b2f', 'أبعد من 2F', 32], ['a2f', 'في 2F', 20], ['f2f', 'بين F و 2F', 14], ['atf', 'في البؤرة F', 10], ['inF', 'بين F والعدسة (المكبرة)', 6]];
  const D = { id: 'g8_lens_image', page: 83, fig: 'تستعمل العدسة المحدبة لتكبير الصورة ص 83',
    desc: 'تعتمد خصائص الصورة المتكونة في العدسة المحدبة على موقع الجسم منها، فهناك ست حالات لتكوّن الصورة (مكبرة أو مصغرة أو بكبر الجسم، مقلوبة أو معتدلة). عند وضع الجسم بين البؤرة والعدسة تتكون صورة معتدلة مكبرة وهمية في جهة الجسم وأبعد منه: العدسة المكبرة.',
    tags: 'العدسة المحدبة الحالات الست تكون الصور العدسة المكبرة صورة معتدلة مكبرة وهمية مقلوبة حقيقية 2F',
    tools: ['عدسة محدبة', 'جسم (سهم)', 'عين'],
    steps: ['الحالة السادسة (الكتاب): الجسم بين البؤرة والعدسة: تتكون صورة معتدلة مكبرة وهمية في جهة الجسم وأبعد منه.', 'اسحب الجسم على المحور أو اختر الحالات الست واحدة واحدة، وسجّل خصائص الصورة في الجدول.', 'لاحظ الأشعة الثلاثة: الموازي ينكسر ماراً بالبؤرة، والمار بالمركز البصري لا ينكسر، والمار بالبؤرة ينكسر موازياً.', 'بدّل إلى العدسة المقعرة: هل تتغير خصائص الصورة مع موقع الجسم؟', 'س3-11: كيف نحصل على صورة مكبرة لجسم من خلال العدسة اللامة؟'],
    concl: ['أبعد من 2F: صورة حقيقية مقلوبة مصغرة بين F و 2F. في 2F: حقيقية مقلوبة بكبر الجسم في 2F. بين F و 2F: حقيقية مقلوبة مكبرة أبعد من 2F.', 'في البؤرة: لا تتكون صورة (الأشعة المنكسرة متوازية). في اللانهاية: صورة نقطية في البؤرة.', 'بين البؤرة والعدسة: صورة وهمية معتدلة مكبرة في جهة الجسم وأبعد منه — تستعمل العدسة المحدبة في هذه الحالة لتكبير الصورة (العدسة المكبرة).', 'العدسة المقعرة تعطي دائماً صورة وهمية معتدلة مصغرة.'],
    laws: ['g8_lens'],
    controls: [SEL('lens', 'العدسة', [['cx', 'محدبة (لامّة)'], ['cc', 'مقعرة (مفرّقة)']], 'cx'), SEL('case', 'الحالة', CASES.map(c => [c[0], c[1]]), 'inF', (v, S) => { const c = CASES.find(q => q[0] === v); if (c) S.u = c[2]; }),
      TG('ext', 'الامتدادات (الصورة الوهمية)', true, null, 'ray'), TG('eye', 'عين الناظر', true, null, 'eye'), TG('lab', 'الخصائص والقيم', true, null, 'labels')],
    setup(S) { S.u = 6; S.hy = .7; S.rows = S.rows || []; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, cx = x0 + (w - x0) * .5, ay = h * .56, pxcm = Math.min((w - x0) / 72, 22); return { w, h, ph, x0, cx, ay, pxcm, f: 10 * pxcm, H: Math.min(h * .3, 150) }; },
    img(S) { const f = S.p.lens === 'cx' ? 10 : -10, u = S.u; if (Math.abs(u - f) < .05) return { v: Infinity, m: Infinity }; const v = 1 / (1 / f - 1 / u); return { v, m: -v / u }; },
    props(S) { const r = D.img(S); if (!isFinite(r.v)) return 'لا تتكون صورة: الأشعة المنكسرة متوازية'; if (S.u >= 200) return 'صورة حقيقية نقطية في البؤرة'; const real = r.v > 0, mm = Math.abs(r.m); return (real ? 'حقيقية مقلوبة ' : 'وهمية معتدلة ') + (mm > 1.03 ? 'مكبرة' : mm < .97 ? 'مصغرة' : 'بكبر الجسم'); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10 : 12.5, cv = p.lens === 'cx', r = D.img(S), far = S.u >= 200, ho = (far ? .45 : S.hy) * g.H * .6 + 14;
      Q26.room(ctx, w, h, h, { top: '#f8fafc', bot: '#f1f5f9' }); Q26.axis(ctx, g.x0 + 4, w - 6, g.ay, '#16a34a');
      const Ox = far ? g.x0 + 30 : g.cx - S.u * g.pxcm, top = [Ox, g.ay - ho], F = g.f * (cv ? 1 : -1), Fr = [g.cx + F, g.ay], Fl = [g.cx - F, g.ay];
      const real = isFinite(r.v) && r.v > 0, Ix = g.cx + (isFinite(r.v) ? r.v : 0) * g.pxcm, hi = isFinite(r.m) ? r.m * ho : 0, itop = [Ix, g.ay - hi];
      Q26.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.x0, 40, w - g.x0, h - 40); ctx.clip(); });
      if (far) { for (let k = 0; k < 3; k++) { const y = g.ay - g.H * .55 + k * g.H * .25, d = Q26.nrm([1, .12]), yl = y + d[1] * (g.cx - g.x0); const P0 = [g.x0, y], L = [g.cx, yl], fy = g.ay + F * .12; Q26.ray(ctx, [P0, L, [g.cx + F, fy], [g.cx + F * 2.6, fy + (fy - yl) * 1.6]], '#ef4444', { w: 2 }); } }
      else {
        // ray 1: parallel → through F (right) or as from F (left, concave)
        const L1 = [g.cx, top[1]], d1 = cv ? Q26.nrm([Fr[0] - L1[0], Fr[1] - L1[1]]) : Q26.nrm([L1[0] - (g.cx - g.f), L1[1] - g.ay]);
        Q26.ray(ctx, [top, L1, [L1[0] + d1[0] * 1200, L1[1] + d1[1] * 1200]], '#dc2626', { w: 2.3 }); if ((!real || !cv) && p.ext !== false && isFinite(r.v)) Q26.ray(ctx, [L1, cv ? itop : [g.cx - g.f, g.ay]], '#dc2626', { dash: true });
        // ray 2: through O
        const d2 = Q26.nrm([g.cx - top[0], g.ay - top[1]]); Q26.ray(ctx, [top, [g.cx + d2[0] * 1400, g.ay + d2[1] * 1400]], '#2563eb', { w: 2.3 }); if (!real && p.ext !== false && isFinite(r.v)) Q26.ray(ctx, [[g.cx, g.ay], itop], '#2563eb', { dash: true });
        // ray 3: through near focus → parallel (convex, object outside F)
        if (cv && S.u > 10.3) { const d3 = Q26.nrm([g.cx - g.f - top[0], g.ay - top[1]]), y3 = top[1] + d3[1] * (g.cx - top[0]) / d3[0]; if (Math.abs(y3 - g.ay) < g.H * 1.1) Q26.ray(ctx, [top, [g.cx, y3], [w, y3]], '#16a34a', { w: 2.3 }); }
        if (cv && S.u < 9.7) { const d3 = Q26.nrm([top[0] - (g.cx - g.f), top[1] - g.ay]), y3 = top[1] + d3[1] * (g.cx - top[0]) / d3[0]; if (Math.abs(y3 - g.ay) < g.H * 1.4) { Q26.ray(ctx, [top, [g.cx, y3], [w, y3]], '#16a34a', { w: 2.3 }); if (p.ext !== false) Q26.ray(ctx, [[g.cx, y3], [itop[0], y3]], '#16a34a', { dash: true }); } }
      }
      Q26.raw(ctx, () => { ctx.restore(); });
      Q26.lensShape(ctx, g.cx, g.ay, g.H, cv ? 'bx' : 'bc', cv ? 16 : 12);
      [[g.cx - g.f, 'F'], [g.cx + g.f, 'F'], [g.cx - 2 * g.f, '2F'], [g.cx + 2 * g.f, '2F']].forEach(q => { Q26.pt(ctx, q[0], g.ay, '', q[1] === 'F' ? '#dc2626' : '#1d4ed8'); Q26.T(ctx, q[1], q[0], g.ay + 20, { s: fs + 1, w: 900, c: q[1] === 'F' ? '#dc2626' : '#1d4ed8' }); });
      Q26.T(ctx, 'O', g.cx - 12, g.ay + 18, { s: fs + 1, w: 900, c: '#0f172a' });
      if (!far) Q26.obj(ctx, Ox, g.ay, ho, '#2563eb'); else Q26.T(ctx, 'جسم بعيد جداً ←', g.x0 + 70, g.ay - g.H * .7, { s: fs, w: 900, c: '#2563eb' });
      if (isFinite(r.v) && !far && Math.abs(Ix - g.cx) < 2000) Q26.obj(ctx, Ix, g.ay, hi, real ? '#ea580c' : '#9333ea', { dash: !real, alpha: .9 });
      if (far && cv) Q26.T(ctx, 'صورة نقطية في البؤرة', g.cx + g.f, g.ay - 30, { s: fs, w: 900, c: '#fff', bg: '#ea580c' });
      if (p.eye !== false && (!real || !cv)) Q26.eye(ctx, Math.min(w - 40, g.cx + g.f * 2.6), g.ay - 10, Q26.sc(w, h) * .8, Math.PI);
      if (p.eye !== false && real && cv && !far) Q26.raw(ctx, () => { if (Ix < w - 10) { ctx.fillStyle = 'rgba(241,245,249,.9)'; ctx.strokeStyle = '#64748b'; ctx.fillRect(Ix + 2, g.ay - g.H * 1.1, 6, g.H * 2.2); } });
      if (p.lab !== false) { Q26.T(ctx, D.props(S), Q26.cx(w), 56, { s: fs + 1.5, w: 900, c: '#fff', bg: real ? '#ea580c' : isFinite(r.v) ? '#9333ea' : '#475569' }); Q26.T(ctx, far ? 'u → ∞ ، v = f = 10 cm' : 'u = ' + Q26.nf(S.u, 3) + ' cm ، v = ' + (isFinite(r.v) ? Q26.nf(r.v, 3) + ' cm' : '∞') + ' ، f = ' + (cv ? '' : '−') + '10 cm', Q26.cx(w), 84, { s: fs, w: 800, c: '#334155' }); }
      Q26.banner(ctx, w, 'اسحب الجسم على المحور', '#be185d', 20); S._top = far ? null : top;
    },
    drags(S) { if (!S.W || !S._top) return []; const g = D.geo(S); return [{ id: 'obj', x: S._top[0], y: S._top[1] + 10, w: 40, h: 60, axis: 'xy', keep: true, tip: 'اسحب الجسم على المحور الرئيس', idle: 'حرّك الجسم ✋', drag: (S, d) => { S.u = Math.round(clamp((g.cx - d.x) / g.pxcm, 2, 34) * 2) / 2; S.hy = clamp((g.ay - d.y - 14) / (g.H * .6), .2, 1); } }]; },
    readings(S) { const r = D.img(S); return [rd('بعد الجسم u', S.u >= 200 ? '∞' : S.u + ' cm'), rd('بعد الصورة v', isFinite(r.v) ? Q26.nf(r.v, 3) + ' cm' : '∞'), rd('التكبير', isFinite(r.m) ? Q26.nf(Math.abs(r.m), 2) : '—'), rd('الخصائص', D.props(S))]; },
    record(S) { const r = D.img(S); return { lens: S.p.lens === 'cx' ? 'محدبة' : 'مقعرة', u: S.u >= 200 ? '∞' : S.u, v: isFinite(r.v) ? +r.v.toFixed(1) : '∞', p: D.props(S) }; },
    cols: [['lens', 'العدسة'], ['u', 'بعد الجسم (cm)'], ['v', 'بعد الصورة (cm)'], ['p', 'خصائص الصورة']],
    explain(S) { const r = D.img(S), cv = S.p.lens === 'cx';
      if (cv && S.u < 10) return Q26.ex('ترى العين صورة <b>معتدلة مكبرة</b> للجسم في جهته وأبعد منه.', 'الجسم بين البؤرة والعدسة، فالأشعة الخارجة من العدسة متفرقة لا تتلاقى، لكن امتداداتها تتلاقى خلف الجسم فتتكون صورة وهمية مكبرة. هذه هي العدسة المكبرة.', 'الساعاتي وعالم الأحياء يستعملون العدسة المكبرة.');
      if (!cv) return Q26.ex('الصورة وهمية معتدلة مصغرة أينما كان الجسم.', 'العدسة المقعرة تفرّق الأشعة دائماً فلا تتلاقى إلا امتداداتها.', 'عدسات نظارات قصر النظر مقعرة.');
      if (!isFinite(r.v)) return Q26.ex('الأشعة المنكسرة تخرج متوازية فلا تتكون صورة.', 'الجسم في البؤرة: كل شعاع منه يخرج موازياً للمحور.', 'المصباح في بؤرة عدسة الفانوس يعطي حزمة متوازية.');
      return Q26.ex('تتكون صورة <b>حقيقية مقلوبة</b> يمكن استلامها على حاجز (الشاشة البيضاء).', 'الأشعة المنكسرة تتلاقى فعلاً خلف العدسة. كلما اقترب الجسم من البؤرة ابتعدت الصورة وكبرت.', 'آلة التصوير والعين وجهاز العرض تكوّن صوراً حقيقية مقلوبة.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   F3) نشاط: قياس البعد البؤري لعدسة لامّة (ص 83)
   ========================================================================================= */
(() => {
  const D = { id: 'g8_focal', page: 83, fig: 'نشاط ص 83',
    desc: 'نضع العدسة على حامل ونسقط عليها حزمة ضوئية ضيقة متوازية من مصدر ضوئي بعيد، ونستلم الأشعة النافذة على حاجز نغيّر موقعه حتى نحصل على أصغر وأوضح صورة شديدة اللمعان، ثم نقيس البعد بين المركز البصري والحاجز: البعد البؤري.',
    tags: 'نشاط قياس البعد البؤري عدسة لامة حامل حاجز حزمة متوازية مصدر بعيد',
    tools: ['عدسة لامّة على حامل', 'مصدر ضوئي بعيد', 'حاجز', 'مسطرة (مصطبة بصرية)'],
    steps: ['ضع العدسة على حامل، وأسقط عليها حزمة ضوئية ضيقة متوازية من مصدر ضوئي بعيد إذ تكون موازية للمحور الرئيس وقريبة منه.', 'أسقط الأشعة النافذة من العدسة على حاجز، وغيّر موقعه (اسحب الحاجز) حتى تستلم أصغر وأوضح صورة شديدة اللمعان.', 'قِس البعد بين المركز البصري للعدسة والحاجز. ماذا يسمى هذا البعد؟ اضغط «سجّل».', 'كرّر النشاط بعدسة أخرى (غيّر العدسة).'],
    concl: ['أصغر وألمع بقعة تتكون عندما يكون الحاجز في البؤرة الحقيقية للعدسة.', 'البعد بين المركز البصري والحاجز عندئذ هو البعد البؤري (f) للعدسة.', 'العدسة الأكثر تحدباً لها بعد بؤري أقصر.'],
    laws: ['g8_lens'],
    controls: [SEL('L', 'العدسة', [['10', 'العدسة A'], ['15', 'العدسة B'], ['20', 'العدسة C']], '15'), TG('rays', 'الأشعة', true, null, 'ray'), TG('spot', 'الحاجز من الأمام', true, null, 'real'), TG('lab', 'القياس', true, null, 'labels')],
    setup(S) { S.xs = 24; S.rows = S.rows || []; S.found = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, ty = h * .72, ay = h * .45, lx = x0 + (w - x0) * .3, pxcm = Math.min((w - lx - 30) / 32, 26); return { w, h, ph, x0, ty, ay, lx, pxcm }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10 : 12.5, f = +p.L, fx = f * g.pxcm, X = g.lx + S.xs * g.pxcm, Dw = 1.6 * g.pxcm, spot = Math.max(.12, 2 * 1.6 * Math.abs(S.xs - f) / f), H = 3 * g.pxcm;
      Q26.room(ctx, w, h, g.ty, { top: '#0f172a', bot: '#1e293b' });
      // optical bench + ruler
      K.ruler(ctx, g.lx, g.ty + 14, 32 * g.pxcm, 32);
      // distant source (window with sun) at left
      Q26.sun(ctx, g.x0 + 30, g.ay - 90, 18, S.t); Q26.T(ctx, 'مصدر ضوئي بعيد', g.x0 + 50, g.ay - 54, { s: fs, w: 800, c: '#fde047' });
      // rays: narrow parallel beam near the axis
      if (p.rays !== false) for (let k = -2; k <= 2; k++) { const y = g.ay + k * Dw / 2, Lp = [g.lx, y], d = Q26.nrm([fx, g.ay - y]), t = (X - g.lx) / d[0]; Q26.ray(ctx, [[g.x0 + 10, y], Lp, [X, y + d[1] * t]], '#fde047', { w: 1.6, glow: false, at: .5 }); }
      Q26.raw(ctx, () => { ctx.fillStyle = '#52525b'; ctx.fillRect(g.lx - 3, g.ay + H, 6, g.ty - g.ay - H); ctx.fillRect(X - 3, g.ay + 50, 6, g.ty - g.ay - 50); ctx.fillStyle = '#27272a'; rr(ctx, g.lx - 18, g.ty - 6, 36, 8, 3); ctx.fill(); rr(ctx, X - 18, g.ty - 6, 36, 8, 3); ctx.fill(); });
      Q26.lensShape(ctx, g.lx, g.ay, H, 'bx', Math.max(5, 120 / f));
      // screen side view + spot
      Q26.raw(ctx, () => { ctx.fillStyle = '#f1f5f9'; ctx.fillRect(X, g.ay - 50, 6, 100); ctx.fillStyle = '#fde047'; ctx.fillRect(X - 2, g.ay - spot * g.pxcm / 2, 4, Math.max(2, spot * g.pxcm)); });
      // front view inset
      if (p.spot !== false) { const ix = w - 80, iy = 220, R0 = 52; Q26.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.fillRect(ix - R0, iy - R0, 2 * R0, 2 * R0); ctx.strokeRect(ix - R0, iy - R0, 2 * R0, 2 * R0); const r0 = Math.max(1.5, spot * 12), I = clamp(1.2 / (r0 * r0) * 20, .15, 1); const gg = ctx.createRadialGradient(ix, iy, 0, ix, iy, r0); gg.addColorStop(0, 'rgba(250,204,21,' + I + ')'); gg.addColorStop(1, 'rgba(250,204,21,' + I * .4 + ')'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(ix, iy, Math.min(r0, R0), 0, TAU); ctx.fill(); if (I > .8) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ix, iy, r0 * .5, 0, TAU); ctx.fill(); } }); Q26.T(ctx, 'الحاجز من الأمام', ix, iy + R0 + 14, { s: fs, w: 900, c: '#fff' }); }
      const ok = Math.abs(S.xs - f) < .26;
      if (p.lab !== false) { Q26.dimx(ctx, g.lx, X, g.ay + 70, 'البعد بين العدسة والحاجز = ' + Q26.nf(S.xs, 3) + ' cm', '#fde047', fs); Q26.T(ctx, ok ? 'أصغر وأوضح بقعة شديدة اللمعان ⟸ البعد البؤري f = ' + f + ' cm ✓' : 'حرّك الحاجز حتى تصغر البقعة الضوئية', Q26.cx(w), g.ty + 52, { s: fs + 1, w: 900, c: '#fff', bg: ok ? '#15803d' : '#475569' }); Q26.T(ctx, 'عدسة لامّة', g.lx, g.ay - H - 14, { s: fs, w: 900, c: '#93c5fd' }); Q26.T(ctx, 'حاجز', X + 3, g.ay - 64, { s: fs, w: 900, c: '#e2e8f0' }); }
      if (ok && !S.found) { S.found = 1; K.cheer(S, X, g.ay); } if (!ok) S.found = 0;
      Q26.banner(ctx, w, 'اسحب الحاجز على المصطبة', '#be185d', 20); K.party(ctx, S); S._X = [X, g.ay];
    },
    drags(S) { if (!S.W || !S._X) return []; const g = D.geo(S); return [{ id: 'screen', x: S._X[0] + 3, y: S._X[1] + 40, w: 44, h: 140, axis: 'x', keep: true, tip: 'اسحب الحاجز', idle: 'حرّك الحاجز ✋', drag: (S, d) => { S.xs = Math.round(clamp((d.x - g.lx) / g.pxcm, 4, 31) * 10) / 10; } }]; },
    readings(S) { const f = +S.p.L, spot = Math.max(.12, 2 * 1.6 * Math.abs(S.xs - f) / f); return [rd('البعد بين العدسة والحاجز', Q26.nf(S.xs, 3) + ' cm'), rd('قطر البقعة الضوئية', Q26.nf(spot * 10, 2) + ' mm')]; },
    record(S) { const f = +S.p.L, spot = Math.max(.12, 2 * 1.6 * Math.abs(S.xs - f) / f); return { L: { 10: 'A', 15: 'B', 20: 'C' }[S.p.L], x: S.xs, d: +(spot * 10).toFixed(1) }; },
    cols: [['L', 'العدسة'], ['x', 'البعد عن الحاجز (cm)'], ['d', 'قطر البقعة (mm)']],
    explain(S) { const f = +S.p.L, ok = Math.abs(S.xs - f) < .26; return Q26.ex(ok ? 'تجمعت الأشعة في بقعة صغيرة جداً شديدة اللمعان.' : 'البقعة على الحاجز كبيرة وباهتة.', 'الأشعة المتوازية القادمة من مصدر بعيد تتجمع بعد العدسة اللامة في البؤرة؛ فإذا وقع الحاجز في البؤرة كانت البقعة أصغر وألمع ما يمكن، والبعد عندها هو البعد البؤري.', 'بالطريقة نفسها نجمع ضوء الشمس بالعدسة المكبرة على ورقة.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   F4) طول النظر وقصر النظر (ص 84) + تطبيقات العدسات
   ========================================================================================= */
(() => {
  const COND = { norm: ['عين سليمة', 17], far: ['طول النظر (كرة العين قصيرة)', 16], near: ['قصر النظر (كرة العين طويلة)', 18.2] };
  const PMIN = 1000 / 17, AMP = 6; // dioptres (reduced eye)
  const D = { id: 'g8_eye', page: 84, fig: 'طول النظر وقصر النظر ص 84',
    desc: 'طول النظر: صغر قطر تكور العين يجعل الأشعة تتجمع خلف الشبكية، فيرى الأجسام البعيدة بوضوح والقريبة غير واضحة، ويعالج بنظارات ذات عدسات محدبة. قصر النظر: كبر قطر تكور العين يجعل الأشعة تتجمع أمام الشبكية، فيرى القريبة بوضوح والبعيدة غير واضحة، ويعالج بعدسات مقعرة.',
    tags: 'طول النظر قصر النظر العين الشبكية نظارات طبية عدسة محدبة عدسة مقعرة',
    tools: ['نموذج العين', 'نظارة بعدسة محدبة', 'نظارة بعدسة مقعرة'],
    steps: ['اختر «عين سليمة» وانظر إلى جسم بعيد ثم قريب: تتجمع الأشعة على الشبكية دائماً (العدسة تغيّر تحدبها).', 'اختر «طول النظر» وانظر إلى جسم قريب: أين تتجمع الأشعة؟ ضع النظارة المناسبة (محدبة).', 'اختر «قصر النظر» وانظر إلى جسم بعيد: أين تتجمع الأشعة؟ ضع النظارة المناسبة (مقعرة).', 'جرّب النظارة الخطأ: ماذا يحدث؟'],
    concl: ['طول النظر: الأشعة القادمة من الأجسام القريبة تتجمع خلف الشبكية بسبب صغر قطر تكور العين، ويعالج بالعدسات المحدبة التي تقوم بتجميع الأشعة على الشبكية.', 'قصر النظر: الأشعة القادمة من الأجسام البعيدة تتجمع أمام الشبكية بسبب كبر قطر تكور العين، ويعالج بالعدسات المقعرة.', 'تستثمر العدسات في النظارات الطبية والعدسة المكبرة والمجهر البسيط والمركب والمنظار وآلة التصوير والعدسات اللاصقة والمرقاب الكاسر والناظور الطبي.'],
    laws: ['g8_lens'],
    controls: [SEL('cond', 'العين', Object.entries(COND).map(([k, v]) => [k, v[0]]), 'far'), SEL('obj', 'الجسم', [['near', 'قريب (كتاب على 25 cm)'], ['far', 'بعيد (شخص في الشارع)']], 'near'), SEL('gl', 'النظارة', [['none', 'بلا نظارة'], ['cx', 'عدسة محدبة'], ['cc', 'عدسة مقعرة']], 'none'),
      TG('rays', 'الأشعة', true, null, 'ray'), TG('lab', 'الأسماء والنتيجة', true, null, 'labels')],
    setup(S) { },
    calc(S) { const L = COND[S.p.cond][1], Pg = S.p.gl === 'cx' ? 2.2 : S.p.gl === 'cc' ? -4 : 0, u = S.p.obj === 'near' ? .25 : 1e9, need = 1000 / L + 1 / u - Pg, Pe = clamp(need, PMIN, PMIN + AMP), Pt = Pe + Pg, v = 1000 / (Pt - 1 / u); return { L, v, Pe, blur: Math.abs(v - L) / v, front: v < L - .05, behind: v > L + .05 }; },
    draw(ctx, w, h, S) {
      const p = S.p, ph = w < 600, x0 = ph ? 8 : 70, fs = ph ? 10 : 12.5, c = D.calc(S), ay = h * .5, k = Math.min((w - x0) * .33 / 22, h * .36 / 24), ex = x0 + (w - x0) * .5, R = 12 * k * c.L / 17;
      G.bg(ctx, w, h, false); Q26.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, w, h); });
      // eyeball: cornea/lens at ex, retina at ex + L*k
      const retX = ex + c.L * k, cxE = (ex + retX) / 2 - 4 * k, ry = 11.5 * k;
      Q26.raw(ctx, () => { ctx.fillStyle = '#fef3c7'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cxE + 2 * k, ay, (retX - ex) / 2 + 4 * k, ry, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(cxE + 2 * k, ay, (retX - ex) / 2 + 4 * k, ry, 0, -1.1, 1.1); ctx.stroke(); ctx.fillStyle = '#c2410c'; ctx.beginPath(); ctx.moveTo(retX + 1 * k, ay - 1.5 * k); ctx.lineTo(retX + 6 * k, ay + 2 * k); ctx.lineTo(retX + 5 * k, ay + 3.5 * k); ctx.lineTo(retX, ay + 1.5 * k); ctx.fill(); ctx.strokeStyle = '#1e40af'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ex + 9 * k, ay, 9.5 * k, Math.PI * .83, Math.PI * 1.17); ctx.stroke(); });
      void R;
      const lensT = 2 + (c.Pe - PMIN) * 1.2; Q26.lensShape(ctx, ex, ay, 3.2 * k, 'bx', lensT * k * .35);
      // glasses
      const gx = ex - 4.5 * k; if (p.gl !== 'none') { Q26.lensShape(ctx, gx, ay, 4.4 * k, p.gl === 'cx' ? 'bx' : 'bc', p.gl === 'cx' ? 5 : 4); Q26.raw(ctx, () => { ctx.strokeStyle = '#111827'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, ay - 4.4 * k); ctx.lineTo(gx + 6 * k, ay - 6 * k); ctx.stroke(); }); }
      // rays: from object (left) through pupil edges, converge at v
      const pr = 2.6 * k, vX = retX + (c.v - c.L) * k * 6, objX = x0 + 30;
      if (p.rays !== false) [-1, 1].forEach(sg => { const yP = ay + sg * pr, start = p.obj === 'near' ? [objX, ay] : [x0 + 8, yP], pre = p.gl !== 'none' ? [gx, p.obj === 'near' ? ay + sg * pr * (gx - objX) / (ex - objX) : yP] : null, end = [Math.min(w - 10, retX + 6 * k), yP + (ay - yP) * (Math.min(w - 10, retX + 6 * k) - ex) / (vX - ex)];
        Q26.ray(ctx, (pre ? [start, pre] : [start]).concat([[ex, yP], [Math.min(vX, end[0]), Math.min(vX, end[0]) === vX ? ay : end[1]]]).concat(vX < end[0] ? [end] : []), '#16a34a', { w: 2, glow: false }); });
      if (p.obj === 'near') Q26.raw(ctx, () => { ctx.fillStyle = '#1d4ed8'; ctx.fillRect(objX - 10, ay - 18, 20, 30); ctx.fillStyle = '#fff'; ctx.fillRect(objX - 7, ay - 14, 14, 3); ctx.fillRect(objX - 7, ay - 8, 14, 3); }); else Q26.person(ctx, x0 + 30, ay + 30, .35, { dir: 1, shirt: '#0f172a' });
      // focus point & retina image
      const fxp = clamp(vX, ex + 4, w - 10); Q26.raw(ctx, () => { ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(fxp, ay, 4, 0, TAU); ctx.fill(); const bl = clamp(c.blur * pr * 2.2, 2, 30); ctx.fillStyle = c.blur < .01 ? 'rgba(22,163,74,.9)' : 'rgba(220,38,38,.6)'; ctx.fillRect(retX - 3, ay - bl, 6, 2 * bl); });
      const okk = c.blur < .012;
      if (p.lab !== false) { Q26.T(ctx, 'الشبكية', retX + 2, ay - ry - 14, { s: fs, w: 900, c: '#dc2626' }); Q26.T(ctx, 'عدسة العين', ex, ay + ry + 14, { s: fs, w: 900, c: '#1d4ed8' }); if (p.gl !== 'none') Q26.T(ctx, p.gl === 'cx' ? 'نظارة محدبة' : 'نظارة مقعرة', gx, ay - 6 * k - 14, { s: fs, w: 900, c: '#fff', bg: '#334155' });
        Q26.T(ctx, okk ? 'الصورة واضحة: تتجمع الأشعة على الشبكية ✓' : c.front ? 'غير واضحة: الأشعة تتجمع أمام الشبكية' : 'غير واضحة: الأشعة تتجمع خلف الشبكية', Q26.cx(w), h - 96, { s: fs + 1.5, w: 900, c: '#fff', bg: okk ? '#15803d' : '#b91c1c' }); }
      if (okk && !S.okk) { S.okk = 1; if (p.gl !== 'none') K.cheer(S, w / 2, h / 3); } if (!okk) S.okk = 0;
      const bx = (ph ? 10 : 76) + 80; C2.btn(ctx, bx, h - 150, 150, 34, 'النظارة: ' + { none: 'بلا', cx: 'محدبة', cc: 'مقعرة' }[p.gl], { col: '#334155', s: 12 }); C2.btn(ctx, bx, h - 196, 150, 34, p.obj === 'near' ? 'الجسم: قريب' : 'الجسم: بعيد', { col: '#0369a1', s: 12 }); S._eb = bx;
      Q26.banner(ctx, w, 'اختر العين والجسم والنظارة', '#be185d', 20); K.party(ctx, S);
    },
    drags(S) { if (!S.W || !S._eb) return []; const h = S.H; return [{ id: 'glasses', x: S._eb, y: h - 150, w: 150, h: 36, tip: 'اضغط لتبديل النظارة', idle: 'جرّب نظارة ✋', click: S => { const o = ['none', 'cx', 'cc']; setParam(S, 'gl', o[(o.indexOf(S.p.gl) + 1) % 3]); } }, { id: 'objbtn', x: S._eb, y: h - 196, w: 150, h: 36, hint: false, tip: 'اضغط لتبديل الجسم: قريب/بعيد', click: S => setParam(S, 'obj', S.p.obj === 'near' ? 'far' : 'near') }]; },
    readings(S) { const c = D.calc(S); return [rd('طول كرة العين', c.L + ' mm'), rd('بعد الصورة خلف العدسة', Q26.nf(c.v, 3) + ' mm'), rd('موقع التجمع', c.blur < .012 ? 'على الشبكية' : c.front ? 'أمام الشبكية' : 'خلف الشبكية')]; },
    explain(S) { const c = D.calc(S), p = S.p, okk = c.blur < .012;
      return Q26.ex(okk ? 'الصورة واضحة لأن الأشعة تتجمع على الشبكية.' : 'الصورة مشوشة: الأشعة تتجمع ' + (c.front ? 'أمام' : 'خلف') + ' الشبكية.',
        p.cond === 'far' ? 'في طول النظر كرة العين قصيرة (قطر تكورها صغير)، فلا تستطيع عدسة العين أن تجمع أشعة الجسم القريب على الشبكية؛ العدسة المحدبة في النظارة تساعدها على التجميع.' : p.cond === 'near' ? 'في قصر النظر كرة العين طويلة (قطر تكورها كبير)، فتتجمع أشعة الجسم البعيد أمام الشبكية؛ العدسة المقعرة تفرق الأشعة قليلاً فتتجمع على الشبكية.' : 'العين السليمة تغيّر تحدب عدستها فترى البعيد والقريب بوضوح.',
        'النظارات الطبية والعدسات اللاصقة تصحح عيوب الإبصار.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

M8.merge({ id: 'g8_lenses', ch: 26, sec: 'الدرس 3: العدسات', page: 82, kind: 'نشاط', fig: 'العدسات ص 82–85',
  title: 'العدسات: المحدبة والمقعرة، تكوّن الصور، قياس البعد البؤري، وعيوب الإبصار',
  desc: 'تجربة بأربعة أجزاء: (1) مقارنة العدسة المحدبة والمقعرة وأشكال العدسات ومصطلحاتها، (2) الصورة في العدسة المحدبة بحالاتها الست والعدسة المكبرة، (3) نشاط قياس البعد البؤري لعدسة لامّة، (4) طول النظر وقصر النظر وتطبيقات العدسات.',
  tags: 'عدسات عدسة محدبة مقعرة',
  fact: ['تستثمر العدسات في المنظار وآلة التصوير والعدسات اللاصقة والمرقاب الكاسر والمجهر البسيط والمركب والناظور الطبي (ص 84–85).', 'عين الإنسان فيها عدسة محدبة مرنة تغيّر تحدبها لترى البعيد والقريب.'],
  quiz: [
    { q: 'لماذا تسمى بؤرة العدسة المحدبة بالبؤرة الحقيقية؟', o: ['لأنها تتكون من تلاقي امتدادات الأشعة', 'لأنها تتكون من تلاقي الأشعة المنكسرة نفسها', 'لأنها تقع أمام العدسة'], a: 1, why: 'مراجعة الدرس س4 (ص 85).' },
    { q: 'ما سبب تسمية بؤرة العدسة المقعرة بالبؤرة الوهمية؟', o: ['لأنها تتكون من التقاء امتدادات الأشعة المنكسرة', 'لأنها تتكون خلف العدسة', 'لأن الأشعة تتلاقى فيها فعلاً'], a: 0, why: 'مراجعة الفصل س3-3 (ص 88).' },
    { q: 'كيف نحصل على صورة مكبرة لجسم من خلال العدسة اللامة؟', o: ['نضع الجسم بين البؤرة والعدسة', 'نضع الجسم في البؤرة', 'نضع الجسم بعيداً جداً'], a: 0, why: 'مراجعة الفصل س3-11: صورة معتدلة مكبرة وهمية (ص 83).' }],
  parts: [{ id: 'g8_lens_types', n: 'المحدبة والمقعرة: المصطلحات والبؤرة' }, { id: 'g8_lens_image', n: 'تكوّن الصور والعدسة المكبرة' }, { id: 'g8_focal', n: 'نشاط: قياس البعد البؤري' }, { id: 'g8_eye', n: 'طول النظر وقصر النظر' }] });

/* polygon optics: trace a ray through several glass polygons (index fn of wavelength) */
Q26.tracePolys = (P, d, polys, nm, maxN = 10, far = 2000) => {
  const pts = [P.slice()]; let Pc = P, D = d, inside = -1;
  for (let k = 0; k < maxN; k++) { let best = null;
    polys.forEach((pg, pi) => { const v = pg.v; for (let i = 0; i < v.length; i++) { const a = v[i], b = v[(i + 1) % v.length], r = Q26.seg(Pc, D, a, b); if (r && r.t > .05 && (!best || r.t < best.t)) best = Object.assign(r, { pi, a, b }); } });
    if (!best) { pts.push([Pc[0] + D[0] * far, Pc[1] + D[1] * far]); return pts; }
    pts.push(best.pt); const nn = Q26.nrm([-(best.b[1] - best.a[1]), best.b[0] - best.a[0]]), n1 = inside >= 0 ? polys[inside].n(nm) : 1, toIn = inside >= 0 ? -1 : best.pi, n2 = toIn >= 0 ? polys[toIn].n(nm) : 1;
    const r = Q26.refr(D, nn, n1, n2); if (!r) D = Q26.refl(D, nn); else { D = r; inside = toIn; } Pc = best.pt; }
  return pts;
};

/* =========================================================================================
   G1) كيف يحصل تفريق الضوء الأبيض؟ الموشور (ص 84) + التفكير الناقد: تركيب ألوان الطيف (ص 85)
   ========================================================================================= */
(() => {
  const LIGHT = { white: 'ضوء أبيض', red: 'ضوء أحمر', green: 'ضوء أخضر' };
  const nG = nm => 1.48 + 14000 / (nm * nm);
  const D = { id: 'g8_prism', page: 84, fig: 'الموشور يحلل الضوء الأبيض إلى ألوانه السبعة ص 84',
    desc: 'الموشور جسم شفاف يحلل الضوء الأبيض الساقط عليه إلى مكوناته الأصلية، إلى سبعة ألوان: الأحمر والبرتقالي والأصفر والأخضر والأزرق والنيلي والبنفسجي، لأن لكل لون سرعة انتشار خاصة في مادة الموشور فينفذ من السطح الثاني بزاوية انكسار تختلف عن بقية الألوان.',
    tags: 'الموشور تحليل الضوء الأبيض تفريق الضوء ألوان الطيف السبعة انكسار سرعة انتشار تركيب الألوان',
    tools: ['موشور زجاجي', 'صندوق ضوئي', 'حاجز أبيض'],
    steps: ['أسقط حزمة ضوء أبيض على أحد وجهي الموشور (اسحب الصندوق الضوئي لتغيير زاوية السقوط).', 'لاحظ الألوان السبعة على الحاجز: أي لون ينحرف أكثر؟ وأيها أقل؟', 'استعمل ضوءاً أحمر أو أخضر فقط: هل يتحلل؟', 'التفكير الناقد (ص 85): كيف يمكن تركيب ألوان الطيف السبعة للحصول على الضوء الأبيض؟ أضف موشوراً ثانياً مقلوباً.'],
    concl: ['الضوء الأبيض مزيج من سبعة ألوان: الأحمر، البرتقالي، الأصفر، الأخضر، الأزرق، النيلي، البنفسجي.', 'لكل لون سرعة انتشار خاصة في مادة الموشور فينكسر بزاوية مختلفة: البنفسجي أكثر انحرافاً والأحمر أقل انحرافاً.', 'الضوء ذو اللون الواحد (الأحمر مثلاً) ينكسر ولا يتحلل.', 'موشور ثانٍ مقلوب يعيد تجميع الألوان فنحصل على الضوء الأبيض من جديد.'],
    laws: ['g8_disp', 'g8_refr'],
    controls: [SEL('light', 'الضوء', Object.entries(LIGHT), 'white'), TG('p2', 'موشور ثانٍ مقلوب (تركيب الألوان)', false, null, 'swap'), TG('inside', 'الأشعة داخل الموشور', true, null, 'ray'), TG('lab', 'أسماء الألوان', true, null, 'labels')],
    setup(S) { S.pa = -.16; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, cx = x0 + (w - x0) * (ph ? .42 : .4), cy = h * .5, Ls = Math.min((w - x0) * .3, h * .42); const A = [cx, cy - Ls / Math.sqrt(3)], B = [cx - Ls / 2, cy + Ls / (2 * Math.sqrt(3))], C = [cx + Ls / 2, cy + Ls / (2 * Math.sqrt(3))]; const M = [(A[0] + B[0]) / 2 + 4, (A[1] + B[1]) / 2]; return { w, h, ph, x0, cx, cy, Ls, A, B, C, M, sx: w - 26 }; },
    polys(S, g) { const L = [{ v: [g.A, g.B, g.C], n: nG }]; if (S.p.p2) { const nAC = Q26.nrm([g.C[1] - g.A[1], -(g.C[0] - g.A[0])]), Q = [(g.A[0] + g.C[0]) / 2 + nAC[0] * 3, (g.A[1] + g.C[1]) / 2 + nAC[1] * 3]; const R = p => [2 * Q[0] - p[0], 2 * Q[1] - p[1]]; L.push({ v: [R(g.A), R(g.B), R(g.C)], n: nG }); } return L; },
    cols(S) { return S.p.light === 'white' ? Q26.COL7 : S.p.light === 'red' ? [['أحمر', 680]] : [['أخضر', 530]]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10 : 12, d = Q26.dir(S.pa), src = [g.M[0] - d[0] * (g.M[0] - g.x0 - 40), g.M[1] - d[1] * (g.M[0] - g.x0 - 40)];
      G.bg(ctx, w, h, false); Q26.raw(ctx, () => { ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, w, h); });
      const polys = D.polys(S, g), screenSeg = [[g.sx, 30], [g.sx, h - 30]];
      Q26.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.fillRect(g.sx, 40, 8, h - 80); });
      const hits = [];
      Q26.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; });
      D.cols(S).forEach(c => { const pts = Q26.tracePolys(src, d, polys, c[1]); // clip at the screen
        const out = [pts[0]]; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; if (b[0] > g.sx) { const t = (g.sx - a[0]) / (b[0] - a[0]); const q = [g.sx, a[1] + (b[1] - a[1]) * t]; out.push(q); hits.push([q[1], c]); break; } out.push(b); }
        const col = wlColor(c[1]); Q26.ray(ctx, out.slice(1), col, { w: 2.4, arrows: false, alpha: p.inside !== false ? .9 : .9 }); });
      Q26.raw(ctx, () => { ctx.restore(); });
      // incident white beam
      Q26.ray(ctx, [src, D.cols(S).length > 1 ? Q26.tracePolys(src, d, polys, 550)[1] : Q26.tracePolys(src, d, polys, D.cols(S)[0][1])[1]], p.light === 'white' ? '#ffffff' : wlColor(D.cols(S)[0][1]), { w: 4 });
      polys.forEach(pg => Q26.raw(ctx, () => { const gg = ctx.createLinearGradient(pg.v[1][0], pg.v[0][1], pg.v[2][0], pg.v[1][1]); gg.addColorStop(0, 'rgba(186,230,253,.28)'); gg.addColorStop(1, 'rgba(224,242,254,.12)'); ctx.fillStyle = gg; ctx.strokeStyle = 'rgba(186,230,253,.9)'; ctx.lineWidth = 2; ctx.beginPath(); pg.v.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill(); ctx.stroke(); }));
      if (p.inside === false) Q26.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.85)'; polys.forEach(pg => { ctx.beginPath(); pg.v.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill(); }); });
      Q26.raybox(ctx, src[0], src[1], S.pa, Q26.sc(w, h));
      // spots on the screen
      Q26.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; hits.forEach(hh => { const gg = ctx.createRadialGradient(g.sx + 4, hh[0], 1, g.sx + 4, hh[0], 10); gg.addColorStop(0, wlColor(hh[1][1])); gg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gg; ctx.fillRect(g.sx - 8, hh[0] - 10, 24, 20); }); ctx.restore(); });
      if (p.lab !== false && hits.length > 1 && !p.p2) { const sorted = hits.slice().sort((a, b) => a[0] - b[0]); let last = -99; sorted.forEach(hh => { const y = Math.max(hh[0], last + 15); last = y; Q26.T(ctx, hh[1][0], g.sx - 40, y, { s: fs - .5, w: 900, c: wlColor(hh[1][1]) }); }); }
      if (p.p2 && p.lab !== false) Q26.T(ctx, 'الموشور الثاني يعيد تجميع الألوان ⟸ ضوء أبيض', Q26.cx(w), h - 80, { s: fs + 1, w: 900, c: '#0f172a', bg: '#f8fafc' });
      if (p.lab !== false) Q26.T(ctx, 'موشور زجاجي', g.cx, g.A[1] - 16, { s: fs, w: 900, c: '#bae6fd' });
      Q26.banner(ctx, w, 'اسحب الصندوق الضوئي لتغيير زاوية السقوط', '#be185d', 20); S._src = src;
    },
    drags(S) { if (!S.W || !S._src) return []; const g = D.geo(S); return [{ id: 'box', x: S._src[0] - Math.cos(S.pa) * 30, y: S._src[1] - Math.sin(S.pa) * 30, r: 34, cx: g.M[0], cy: g.M[1], keep: true, tip: 'اسحب لتدوير الصندوق الضوئي', idle: 'دوّر الضوء ✋', drag: (S, d) => { S.pa = clamp(Math.atan2(g.M[1] - d.y, g.M[0] - d.x), -.75, .45); } }]; },
    readings(S) { if (!S.W) return []; const g = D.geo(S), d = Q26.dir(S.pa), src = [g.M[0] - d[0] * 200, g.M[1] - d[1] * 200], one = nm => { const pts = Q26.tracePolys(src, d, D.polys(S, g), nm); const a = pts[pts.length - 2], b = pts[pts.length - 1]; return Math.atan2(b[1] - a[1], b[0] - a[0]) - S.pa; };
      return [rd('انحراف الأحمر', Q26.nf(one(680) * 180 / Math.PI, 3) + '°'), rd('انحراف البنفسجي', Q26.nf(one(410) * 180 / Math.PI, 3) + '°'), rd('n للأحمر / للبنفسجي', nG(680).toFixed(3) + ' / ' + nG(410).toFixed(3))]; },
    explain(S) { if (S.p.light !== 'white') return Q26.ex('الضوء ذو اللون الواحد ينحرف ولكنه لا يتحلل إلى ألوان.', 'لا يحتوي إلا على لون واحد، فكل أشعته تنكسر بالزاوية نفسها.', 'ضوء الليزر أحادي اللون.'); if (S.p.p2) return Q26.ex('الألوان التي فرّقها الموشور الأول اجتمعت من جديد بعد الموشور الثاني المقلوب فظهر الضوء أبيض.', 'الموشور الثاني يحرف كل لون بمقدار معاكس تماماً، فتعود الألوان متوازية ومتداخلة.', 'هكذا أثبت نيوتن أن الضوء الأبيض مزيج من الألوان.');
      return Q26.ex('خرج من الموشور طيف من سبعة ألوان: الأحمر في الأعلى (أقل انحرافاً) والبنفسجي في الأسفل (أكثر انحرافاً).', 'سرعة كل لون داخل الزجاج مختلفة: البنفسجي أبطأ فينكسر أكثر، والأحمر أسرع فينكسر أقل؛ فتنفصل الألوان.', 'الثريات الزجاجية تلوّن الجدران بألوان الطيف.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   G2) قوس المطر (ص 82): قطرات المطر تعمل عمل الموشور
   ========================================================================================= */
(() => {
  const D = { id: 'g8_rainbow', page: 82, fig: 'صورة قوس المطر ص 82',
    desc: 'يتكوّن قوس المطر حين ينكسر ضوء الشمس الأبيض بوساطة قطرات المطر التي تعمل عمل الموشور الذي يحلل الضوء إلى ألوانه السبعة: ينكسر الضوء عند دخوله القطرة، وينعكس عن سطحها الخلفي، ثم ينكسر عند خروجه.',
    tags: 'قوس المطر قطرات المطر موشور تحليل الضوء انكسار انعكاس 42 درجة',
    tools: ['قطرة مطر (مكبرة)', 'ضوء الشمس'],
    steps: ['المشهد الأول: قطرة مطر مكبرة. اسحب نقطة دخول شعاع الشمس إلى القطرة.', 'تتبع الشعاع: ينكسر عند الدخول (ويتحلل)، ثم ينعكس عن الجهة الخلفية للقطرة، ثم ينكسر عند الخروج.', 'لاحظ زاوية خروج كل لون: الأحمر نحو 42° والبنفسجي نحو 40°.', 'المشهد الثاني: قف وظهرك للشمس بعد المطر، وغيّر ارتفاع الشمس: متى يختفي قوس المطر؟'],
    concl: ['يتكون قوس المطر بعد سقوط المطر مباشرة حين ينكسر ضوء الشمس الأبيض بوساطة قطرات المطر.', 'تعمل قطرات المطر عمل الموشور فتحلل الضوء إلى ألوانه السبعة (انكسار + انعكاس داخلي + انكسار).', 'نرى قوس المطر عندما تكون الشمس خلفنا، واللون الأحمر في أعلى القوس والبنفسجي في أسفله.'],
    laws: ['g8_disp', 'g8_refr'],
    controls: [SEL('view', 'المشهد', [['drop', 'قطرة مطر مكبرة'], ['sky', 'قوس المطر في السماء']], 'drop'), R('el', 'ارتفاع الشمس', 0, 50, 15, 1, '°'), TG('all', 'الألوان السبعة', true, null, 'ray'), TG('nm', 'الأعمدة المقامة', false, null, 'vector'), TG('lab', 'الأسماء والزوايا', true, null, 'labels')],
    setup(S) { S.b = .86; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70; return { w, h, ph, x0, cx: x0 + (w - x0) * .55, cy: h * .5, R: Math.min(h * .34, (w - x0) * .3) }; },
    dropTrace(g, b, nm) { const n = Q26.nWater(nm), C = [g.cx, g.cy], P0 = [g.x0, g.cy - b * g.R], d0 = [1, 0]; const h1 = Q26.circ(P0, d0, C, g.R); if (!h1) return null; const n1 = Q26.nrm([h1.pt[0] - C[0], h1.pt[1] - C[1]]), d1 = Q26.refr(d0, n1, 1, n);
      const fx = h1.pt[0] - C[0], fy = h1.pt[1] - C[1], bb = fx * d1[0] + fy * d1[1], t2 = -2 * bb, p2 = [h1.pt[0] + d1[0] * t2, h1.pt[1] + d1[1] * t2]; const n2 = Q26.nrm([p2[0] - C[0], p2[1] - C[1]]), d2 = Q26.refl(d1, n2);
      const gx = p2[0] - C[0], gy = p2[1] - C[1], b2 = gx * d2[0] + gy * d2[1], t3 = -2 * b2, p3 = [p2[0] + d2[0] * t3, p2[1] + d2[1] * t3]; const n3 = Q26.nrm([p3[0] - C[0], p3[1] - C[1]]), d3 = Q26.refr(d2, n3, n, 1) || d2;
      const dev = Math.acos(clamp(Q26.dot(d3, [-1, 0]), -1, 1)); return { pts: [P0, h1.pt, p2, p3, [p3[0] + d3[0] * g.R * 2.2, p3[1] + d3[1] * g.R * 2.2]], dev, n: [n1, n2, n3] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10 : 12;
      if (p.view === 'drop') {
        G.bg(ctx, w, h, false); Q26.raw(ctx, () => { ctx.fillStyle = '#0b1120'; ctx.fillRect(0, 0, w, h); const gg = ctx.createRadialGradient(g.cx - g.R * .3, g.cy - g.R * .3, g.R * .1, g.cx, g.cy, g.R); gg.addColorStop(0, 'rgba(224,242,254,.35)'); gg.addColorStop(1, 'rgba(56,189,248,.25)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(186,230,253,.8)'; ctx.lineWidth = 2; ctx.stroke(); });
        const cols = p.all !== false ? Q26.COL7 : [['أحمر', 680], ['بنفسجي', 410]]; let devs = [];
        Q26.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; });
        cols.forEach(c => { const r = D.dropTrace(g, S.b, c[1]); if (!r) return; devs.push([c, r.dev]); Q26.ray(ctx, r.pts.slice(1), wlColor(c[1]), { w: 1.8, arrows: false, glow: false }); });
        Q26.raw(ctx, () => { ctx.restore(); });
        const r0 = D.dropTrace(g, S.b, 550); if (r0) { Q26.ray(ctx, [r0.pts[0], r0.pts[1]], '#ffffff', { w: 3.5 }); if (p.nm) r0.n.forEach((nn, i) => { const P = r0.pts[i + 1]; Q26.normal(ctx, P[0], P[1], Math.atan2(nn[1], nn[0]), 34, '#94a3b8'); }); Q26.T(ctx, 'ضوء الشمس الأبيض', g.x0 + 70, r0.pts[0][1] - 16, { s: fs, w: 900, c: '#fde047' }); }
        if (p.lab !== false && devs.length) { const red = devs.find(q => q[0][1] === 680), vio = devs.find(q => q[0][1] === 410); Q26.card(ctx, S, [{ t: 'زاوية خروج الأحمر = ' + Q26.nf(red[1] * 180 / Math.PI, 3) + '°', c: '#dc2626', w: 900 }, { t: 'زاوية خروج البنفسجي = ' + Q26.nf(vio[1] * 180 / Math.PI, 3) + '°', c: '#7c3aed', w: 900 }, { t: '1) انكسار ← 2) انعكاس ← 3) انكسار', c: '#0f172a' }], { title: 'القطرة تعمل عمل الموشور', bd: '#be185d', y: 44, wd: 300 });
          if (r0) { Q26.T(ctx, '1) انكسار', r0.pts[1][0] - 40, r0.pts[1][1] - 16, { s: fs, w: 900, c: '#fff', bg: '#0369a1' }); Q26.T(ctx, '2) انعكاس', r0.pts[2][0] + 40, r0.pts[2][1], { s: fs, w: 900, c: '#fff', bg: '#0369a1' }); Q26.T(ctx, '3) انكسار', r0.pts[3][0] - 20, r0.pts[3][1] + 22, { s: fs, w: 900, c: '#fff', bg: '#0369a1' }); } }
        S._bh = [g.x0 + 20, g.cy - S.b * g.R];
      } else {
        G.bg(ctx, w, h, false); const gy = h * .78, el = p.el, sk = gy;
        Q26.raw(ctx, () => { const s1 = ctx.createLinearGradient(0, 0, 0, sk); s1.addColorStop(0, '#475569'); s1.addColorStop(1, '#cbd5e1'); ctx.fillStyle = s1; ctx.fillRect(0, 0, w, sk); const g2 = ctx.createLinearGradient(0, gy, 0, h); g2.addColorStop(0, '#65a30d'); g2.addColorStop(1, '#365314'); ctx.fillStyle = g2; ctx.fillRect(0, gy, w, h - gy); ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.lineWidth = 1; for (let k = 0; k < 80; k++) { const x = (k * 97.3) % w, y = (k * 41.7) % sk; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 3, y + 10); ctx.stroke(); } });
        const ox = g.x0 + (w - g.x0) * .3, pxd = Math.min((w - g.x0) * .6, h * .9) / 50, ay = gy + el * pxd, ax = ox + (w - ox) * .45; // antisolar point (horizontal distance arbitrary)
        Q26.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, gy); ctx.clip(); ctx.globalAlpha = .55; for (let k = 0; k < 7; k++) { const c = Q26.COL7[k], r = (42.3 - k * .3) * pxd; ctx.strokeStyle = wlColor(c[1]); ctx.lineWidth = .32 * pxd + 2; ctx.beginPath(); ctx.arc(ax, ay, r, Math.PI, TAU); ctx.stroke(); } ctx.restore(); });
        Q26.sun(ctx, g.x0 + 30, gy - el * pxd * .9 - 20, 20, S.t, { spots: false });
        Q26.person(ctx, ox, gy, .5, { dir: 1, shirt: '#be185d', pants: '#1e3a8a' });
        if (p.lab !== false) { Q26.T(ctx, el > 42 ? 'الشمس مرتفعة جداً (أكثر من 42°): لا نرى قوس المطر' : 'الشمس خلفك: الأحمر في أعلى القوس والبنفسجي في أسفله', Q26.cx(w), 56, { s: fs + 1, w: 900, c: '#fff', bg: el > 42 ? '#b91c1c' : '#15803d' }); Q26.T(ctx, 'ارتفاع الشمس ' + el + '°', g.x0 + 60, gy - el * pxd * .9 + 14, { s: fs, w: 900, c: '#fde047', bg: 'rgba(0,0,0,.4)' }); }
      }
      Q26.banner(ctx, w, p.view === 'drop' ? 'اسحب نقطة دخول الشعاع' : 'غيّر ارتفاع الشمس', '#be185d', 20);
    },
    drags(S) { if (!S.W || S.p.view !== 'drop' || !S._bh) return []; const g = D.geo(S); return [{ id: 'ray', x: S._bh[0], y: S._bh[1], r: 28, axis: 'y', keep: true, tip: 'اسحب لتغيير نقطة دخول الشعاع إلى القطرة', idle: 'حرّكني ✋', drag: (S, d) => { S.b = clamp((g.cy - d.y) / g.R, .05, .98); } }]; },
    readings(S) { if (!S.W || S.p.view !== 'drop') return [rd('ارتفاع الشمس', S.p.el + '°')]; const g = D.geo(S), r = D.dropTrace(g, S.b, 680), v = D.dropTrace(g, S.b, 410); return [rd('زاوية الأحمر', r ? Q26.nf(r.dev * 180 / Math.PI, 3) + '°' : '—'), rd('زاوية البنفسجي', v ? Q26.nf(v.dev * 180 / Math.PI, 3) + '°' : '—')]; },
    explain(S) { return Q26.ex(S.p.view === 'drop' ? 'شعاع الشمس الأبيض يدخل القطرة فيتحلل إلى ألوان تخرج بزوايا مختلفة قليلاً.' : 'يظهر قوس ملون مقابل الشمس، الأحمر في أعلاه.', 'قطرة الماء تعمل عمل الموشور: لكل لون معامل انكسار مختلف في الماء، فينكسر بزاوية مختلفة، وبعد الانعكاس عن خلف القطرة يخرج الأحمر بزاوية نحو 42° والبنفسجي بنحو 40°.', 'يمكنك صنع قوس مطر صغير برش الماء بالخرطوم وظهرك للشمس.'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

/* =========================================================================================
   G3) استثمار الألوان (الفيزياء والحياة ص 86): الألوان الأساسية للضوء والأصباغ الأساسية
   ========================================================================================= */
(() => {
  const D = { id: 'g8_colors', page: 86, fig: 'الألوان الأساسية والأصباغ الأساسية ص 86',
    desc: 'أثبت نيوتن أن الألوان الأساسية للضوء هي الأحمر والأخضر والأزرق؛ بمزجها بنسب مختلفة نحصل على جميع الألوان، وبنسب ثابتة نحصل على الضوء الأبيض (شاشات الحواسيب والهاتف والتلفاز). والأصباغ الأساسية الصفراء والأرجوانية والفيروزية؛ مزجها بنسب متساوية يعطي الأسود (أحبار الطباعة).',
    tags: 'الألوان الأساسية أحمر أخضر أزرق مزج الألوان الأصباغ الأساسية أصفر أرجواني فيروزي أسود أبيض نيوتن شاشات طباعة',
    tools: ['ثلاثة مصابيح ملونة (أحمر، أخضر، أزرق)', 'أصباغ: صفراء، أرجوانية، فيروزية'],
    steps: ['اسحب دوائر الضوء الثلاث (الأحمر والأخضر والأزرق) لتتداخل على الشاشة.', 'ما لون منطقة تداخل الأحمر والأخضر؟ (أصفر) وما لون تداخل الثلاثة؟ (أبيض)', 'غيّر شدة كل لون لتحصل على ألوان أخرى (برتقالي، وردي…).', 'بدّل إلى «الأصباغ»: امزج الأصفر والأرجواني والفيروزي. ما لون الوسط؟'],
    concl: ['الألوان الأساسية للضوء: الأحمر والأخضر والأزرق. الأحمر + الأخضر = أصفر، الأحمر + الأزرق = أرجواني، الأخضر + الأزرق = فيروزي، والثلاثة بنسب ثابتة = أبيض.', 'تستعمل الألوان الأساسية في شاشات الحواسيب والهاتف المحمول وآلات التصوير التلفزيوني والماسح الضوئي.', 'الأصباغ الأساسية: الصفراء والأرجوانية والفيروزية؛ مزجها بنسب متساوية يعطي صبغة سوداء، وتستعمل في أحبار الطباعة للكتب.'],
    laws: ['g8_disp'],
    controls: [SEL('mode', 'النوع', [['light', 'ألوان الضوء (جمع)'], ['paint', 'الأصباغ (طرح)']], 'light'), R('r', 'شدة الأحمر', 0, 255, 255, 5, ''), R('g', 'شدة الأخضر', 0, 255, 255, 5, ''), R('b', 'شدة الأزرق', 0, 255, 255, 5, ''), TG('lab', 'أسماء الألوان', true, null, 'labels')],
    setup(S) { S.pos = null; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 8 : 70, cx = Q26.cx(w), cy = h * .5, R = Math.min(h * .2, (w - x0) * .17); return { w, h, ph, x0, cx, cy, R }; },
    init(S, g) { if (!S.pos) S.pos = [[g.cx, g.cy - g.R * .6], [g.cx - g.R * .55, g.cy + g.R * .35], [g.cx + g.R * .55, g.cy + g.R * .35]].map(q => [(q[0] - g.cx) / g.R, (q[1] - g.cy) / g.R]); },
    P(S, g, i) { return [g.cx + S.pos[i][0] * g.R, g.cy + S.pos[i][1] * g.R]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, fs = g.ph ? 10 : 12.5, light = p.mode === 'light'; D.init(S, g);
      G.bg(ctx, w, h, false); Q26.raw(ctx, () => { ctx.fillStyle = light ? '#020617' : '#ffffff'; ctx.fillRect(0, 0, w, h); });
      const cols = light ? ['rgb(' + p.r + ',0,0)', 'rgb(0,' + p.g + ',0)', 'rgb(0,0,' + p.b + ')'] : ['rgb(0,255,255)', 'rgb(255,0,255)', 'rgb(255,255,0)'];
      Q26.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = light ? 'lighter' : 'multiply'; for (let i = 0; i < 3; i++) { const P = D.P(S, g, i); ctx.fillStyle = cols[i]; ctx.beginPath(); ctx.arc(P[0], P[1], g.R, 0, TAU); ctx.fill(); } ctx.restore(); });
      if (light) { // projectors
        const pr = [[g.x0 + 40, 80], [g.x0 + 40, h - 80], [w - 40, h * .5]]; for (let i = 0; i < 3; i++) { const P = D.P(S, g, i); Q26.raw(ctx, () => { ctx.save(); ctx.globalAlpha = .12; ctx.fillStyle = ['#ef4444', '#22c55e', '#3b82f6'][i]; ctx.beginPath(); ctx.moveTo(pr[i][0], pr[i][1]); ctx.lineTo(P[0] - g.R * .7, P[1]); ctx.lineTo(P[0] + g.R * .7, P[1]); ctx.closePath(); ctx.fill(); ctx.restore(); ctx.fillStyle = '#334155'; rr(ctx, pr[i][0] - 16, pr[i][1] - 12, 32, 24, 5); ctx.fill(); ctx.fillStyle = ['#ef4444', '#22c55e', '#3b82f6'][i]; ctx.beginPath(); ctx.arc(pr[i][0], pr[i][1], 7, 0, TAU); ctx.fill(); }); } }
      if (p.lab !== false) { const N = light ? ['أحمر', 'أخضر', 'أزرق'] : ['فيروزي', 'أرجواني', 'أصفر'], M = light ? [['أصفر', 0, 1], ['أرجواني', 0, 2], ['فيروزي', 1, 2]] : [['أزرق', 0, 1], ['أخضر', 0, 2], ['أحمر', 1, 2]];
        for (let i = 0; i < 3; i++) { const P = D.P(S, g, i), d = Q26.nrm([P[0] - g.cx, P[1] - g.cy + .01]); Q26.T(ctx, N[i], P[0] + d[0] * g.R * .55, P[1] + d[1] * g.R * .55, { s: fs, w: 900, c: light ? '#fff' : '#0f172a', bg: light ? 'rgba(0,0,0,.45)' : 'rgba(255,255,255,.7)' }); }
        M.forEach(m => { const a = D.P(S, g, m[1]), b = D.P(S, g, m[2]), c3 = D.P(S, g, 3 - m[1] - m[2]); if (Math.hypot(a[0] - b[0], a[1] - b[1]) > 2 * g.R) return; const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], away = Q26.nrm([mid[0] - c3[0], mid[1] - c3[1]]); Q26.T(ctx, m[0], mid[0] + away[0] * g.R * .35, mid[1] + away[1] * g.R * .35, { s: fs - .5, w: 900, c: light ? '#0f172a' : '#fff', bg: light ? 'rgba(255,255,255,.75)' : 'rgba(0,0,0,.55)' }); });
        const all = [0, 1, 2].map(i => D.P(S, g, i)), ok = all.every(q => all.every(r => Math.hypot(q[0] - r[0], q[1] - r[1]) < 1.6 * g.R));
        if (ok) { const c = [(all[0][0] + all[1][0] + all[2][0]) / 3, (all[0][1] + all[1][1] + all[2][1]) / 3]; Q26.T(ctx, light ? 'أبيض' : 'أسود', c[0], c[1], { s: fs + 1, w: 900, c: light ? '#0f172a' : '#fff', bg: light ? '#fff' : '#000' }); }
        Q26.card(ctx, S, light ? [{ t: 'أحمر + أخضر = أصفر', c: '#ca8a04', w: 900 }, { t: 'أحمر + أزرق = أرجواني', c: '#c026d3', w: 900 }, { t: 'أخضر + أزرق = فيروزي', c: '#0891b2', w: 900 }, { t: 'أحمر + أخضر + أزرق = أبيض', c: '#0f172a', w: 900 }] : [{ t: 'أصفر + أرجواني + فيروزي = أسود', c: '#0f172a', w: 900 }, { t: 'تستعمل في أحبار الطباعة', c: '#475569' }], { title: light ? 'الألوان الأساسية للضوء' : 'الأصباغ الأساسية', bd: '#be185d', y: 44, wd: 250 }); }
      Q26.banner(ctx, w, 'اسحب الدوائر الملونة لتتداخل', '#be185d', 20);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); D.init(S, g); return [0, 1, 2].map(i => { const P = D.P(S, g, i); return { id: 'c' + i, x: P[0], y: P[1], r: Math.min(g.R * .7, 60), axis: 'xy', keep: true, hint: i === 0, tip: 'اسحب الدائرة', idle: 'اسحبني ✋', drag: (S, d) => { S.pos = S.pos.map(q => q.slice()); S.pos[i] = [clamp((d.x - g.cx) / g.R, -2.2, 2.2), clamp((d.y - g.cy) / g.R, -1.6, 1.6)]; S['m' + i] = S.pos[i][0] + S.pos[i][1]; } }; }); },
    readings(S) { const p = S.p; return p.mode === 'light' ? [rd('الأحمر R', p.r), rd('الأخضر G', p.g), rd('الأزرق B', p.b), rd('لون المزيج (الوسط)', 'rgb(' + p.r + ', ' + p.g + ', ' + p.b + ')')] : [rd('المزيج', 'أسود')]; },
    explain(S) { return S.p.mode === 'light' ? Q26.ex('حيث يتداخل ضوء الأحمر والأخضر يظهر الأصفر، وحيث تتداخل الثلاثة يظهر الأبيض.', 'عند جمع أضواء ملونة تضاف الطاقات الضوئية التي تصل إلى العين، فالأحمر والأخضر والأزرق معاً بنسب ثابتة تكوّن الضوء الأبيض.', 'لو نظرت إلى شاشة الهاتف بعدسة مكبرة لرأيت نقاطاً صغيرة حمراء وخضراء وزرقاء فقط!') : Q26.ex('في وسط الأصباغ الثلاثة يظهر الأسود.', 'كل صبغة تمتص بعض ألوان الضوء الأبيض وتعكس الباقي؛ فإذا مزجنا الأصباغ الثلاثة امتصت جميع الألوان فلا ينعكس شيء: أسود.', 'طابعة الحبر الملونة فيها أحبار صفراء وأرجوانية وفيروزية (وسوداء).'); },
    quiz: []
  };
  Q26.P[D.id] = D; M8.P[D.id] = D;
})();

M8.merge({ id: 'g8_dispersion', ch: 26, sec: 'الدرس 3: تفريق الضوء الأبيض + الفيزياء والحياة', page: 84, kind: 'نشاط', fig: 'الموشور ص 84، قوس المطر ص 82، الألوان ص 86',
  title: 'تحليل الضوء الأبيض: الموشور وقوس المطر واستثمار الألوان',
  desc: 'تجربة بثلاثة أجزاء: (1) الموشور يحلل الضوء الأبيض إلى سبعة ألوان، وتركيبها من جديد، (2) قوس المطر: قطرات المطر تعمل عمل الموشور، (3) الألوان الأساسية للضوء والأصباغ الأساسية (الفيزياء والحياة).',
  tags: 'موشور تحليل الضوء قوس المطر ألوان',
  fact: ['استطاع نيوتن إثبات أن الألوان الأساسية هي الأزرق والأحمر والأخضر من خلال تجاربه بالموشور (ص 86).', 'الضوء والنبات: الضوء شرط رئيس لنمو النباتات الخضراء، وتخزن الطاقة الضوئية في الأزهار لتكوين الصبغات الملونة (ص 86).'],
  quiz: [
    { q: 'يتكون قوس المطر حين ينكسر ضوء الشمس الأبيض بوساطة قطرات المطر و......... إلى ألوانه السبعة.', o: ['يتحلل', 'ينعكس', 'يتداخل'], a: 0, why: 'مراجعة الفصل س2-1 (ص 87).' },
    { q: 'ما سبب تحلل الضوء الأبيض داخل الموشور؟', o: ['لأن لكل لون سرعة انتشار خاصة في مادة الموشور فينكسر بزاوية مختلفة', 'لأن الموشور يلوّن الضوء', 'لأن الضوء ينعكس داخل الموشور'], a: 0, why: 'مراجعة الفصل س3-1 (ص 88).' },
    { q: 'كيف يمكن تركيب ألوان الطيف السبعة للحصول على الضوء الأبيض؟', o: ['بإمرارها في موشور ثانٍ مقلوب', 'بإمرارها في مرآة مستوية', 'لا يمكن ذلك'], a: 0, why: 'التفكير الناقد س2 (ص 85).' }],
  parts: [{ id: 'g8_prism', n: 'الموشور: تحليل الضوء الأبيض' }, { id: 'g8_rainbow', n: 'قوس المطر' }, { id: 'g8_colors', n: 'الألوان الأساسية والأصباغ' }] });
