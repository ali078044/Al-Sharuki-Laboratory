'use strict';
/* ====================== الخامس العلمي — الفصل الثاني: الحركة (ch 52, ص 24–50) ======================
   Merged experiments (book order): g11_c2_frame (2-1 … 2-3) · g11_c2_vel (2-4 … 2-6) · g11_c2_acc (2-7 … 2-9)
   · g11_c2_fall (2-10, 2-11) · g11_c2_proj (2-12) · g11_c2_review (أسئلة ومسائل ص 47–50).
   Local kit Q52 = Q42 + roads, cars, runner, stopwatch, speedometer, signed graph axes. */
const Q52 = Object.assign(Object.create(Q42), {
  G: 10,
  ease(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  md(a, n) { return ((a % n) + n) % n; },
  f(v, d = 1) { const s = (+v).toFixed(d); return (s.startsWith('-') ? '−' + s.slice(1) : s).replace(/^−(0\.?0*)$/, '$1'); },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#fff7ed'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  /* sky + far hills band from y0 to y1 */
  sky(ctx, x0, y0, x1, y1, off = 0) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#bae6fd'); g.addColorStop(1, '#f0f9ff'); ctx.fillStyle = g; rr(ctx, x0, y0, x1 - x0, y1 - y0, 10); ctx.fill();
      ctx.save(); ctx.beginPath(); rr(ctx, x0, y0, x1 - x0, y1 - y0, 10); ctx.clip(); ctx.fillStyle = 'rgba(132,204,22,.35)'; ctx.beginPath(); ctx.moveTo(x0, y1);
      for (let x = x0; x <= x1; x += 8) ctx.lineTo(x, y1 - 26 - 16 * Math.sin((x + off) / 70) - 9 * Math.sin((x + off) / 23)); ctx.lineTo(x1, y1); ctx.fill(); ctx.restore(); });
  },
  /* asphalt road: top edge at y, height hh, dashed centre line scrolling with off */
  road(ctx, x0, x1, y, hh = 34, off = 0) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + hh); g.addColorStop(0, '#52525b'); g.addColorStop(1, '#27272a'); ctx.fillStyle = g; ctx.fillRect(x0, y, x1 - x0, hh);
      ctx.fillStyle = '#a3a3a3'; ctx.fillRect(x0, y - 3, x1 - x0, 3); ctx.fillStyle = '#fafafa'; ctx.save(); ctx.beginPath(); ctx.rect(x0, y, x1 - x0, hh); ctx.clip();
      for (let x = x0 - 60 + Q52.md(-off, 60); x < x1; x += 60) ctx.fillRect(x, y + hh / 2 - 1.5, 30, 3); ctx.restore(); });
  },
  /* side-view car: x centre, yg ground, s scale, dir 1 → right, rot wheel angle */
  car(ctx, x, yg, s = 1, col = '#dc2626', rot = 0, dir = 1, a = 1) {
    K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, yg); ctx.scale(s * dir, s);
      ctx.fillStyle = 'rgba(15,23,42,.25)'; ctx.beginPath(); ctx.ellipse(0, 2, 46, 4, 0, 0, TAU); ctx.fill();
      const g = ctx.createLinearGradient(0, -40, 0, -8); g.addColorStop(0, shade(col, 30)); g.addColorStop(.5, col); g.addColorStop(1, shade(col, -35)); ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(-44, -10); ctx.lineTo(-44, -24); ctx.quadraticCurveTo(-40, -28, -28, -29); ctx.lineTo(-18, -41); ctx.quadraticCurveTo(-14, -44, -4, -44); ctx.lineTo(14, -44); ctx.quadraticCurveTo(20, -43, 26, -31); ctx.lineTo(40, -28); ctx.quadraticCurveTo(46, -26, 46, -18); ctx.lineTo(46, -10); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.lineWidth = 1; ctx.stroke();
      const gw = ctx.createLinearGradient(0, -42, 0, -29); gw.addColorStop(0, '#e0f2fe'); gw.addColorStop(1, '#7dd3fc'); ctx.fillStyle = gw;
      ctx.beginPath(); ctx.moveTo(-15, -30); ctx.lineTo(-7, -40); ctx.lineTo(3, -40); ctx.lineTo(3, -30); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(6, -30); ctx.lineTo(6, -40); ctx.lineTo(13, -40); ctx.quadraticCurveTo(18, -38, 22, -30); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#fde047'; rr(ctx, 41, -24, 5, 5, 2); ctx.fill(); ctx.fillStyle = '#ef4444'; rr(ctx, -45, -24, 4, 5, 1.5); ctx.fill();
      [-27, 28].forEach(wx => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(wx, -10, 10, 0, TAU); ctx.fill(); const gr = ctx.createRadialGradient(wx - 2, -12, 1, wx, -10, 6); gr.addColorStop(0, '#f1f5f9'); gr.addColorStop(1, '#64748b'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(wx, -10, 5.5, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.4; for (let k = 0; k < 3; k++) { const an = rot + k * TAU / 3; ctx.beginPath(); ctx.moveTo(wx, -10); ctx.lineTo(wx + Math.cos(an) * 5.5, -10 + Math.sin(an) * 5.5); ctx.stroke(); } });
      ctx.restore(); });
  },
  /* running person, feet at (x, yg), height H, phase ph, dir 1 → right */
  runner(ctx, x, yg, H = 60, ph = 0, dir = 1, col = '#2563eb', moving = true) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, yg); ctx.scale(dir, 1); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      const k = H / 60, sw = moving ? Math.sin(ph) : 0, hip = [0, -30 * k], nk = [3 * k * (moving ? 1 : 0), -48 * k];
      const leg = (s, c) => { const kx = hip[0] + 9 * k * s, ky = hip[1] + 13 * k, fx = kx + (s > 0 ? -2 : -8) * k, fy = moving ? -Math.max(0, s) * 6 * k : 0; ctx.strokeStyle = c; ctx.lineWidth = 4.2 * k; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(kx, ky); ctx.lineTo(fx + 4 * k * s, fy); ctx.stroke(); };
      const arm = (s, c) => { ctx.strokeStyle = c; ctx.lineWidth = 3.4 * k; ctx.beginPath(); ctx.moveTo(nk[0], nk[1] + 3 * k); ctx.lineTo(nk[0] - 8 * k * s, nk[1] + 12 * k); ctx.lineTo(nk[0] - 2 * k * s + 6 * k, nk[1] + 18 * k - 4 * k * Math.abs(s)); ctx.stroke(); };
      ctx.fillStyle = 'rgba(15,23,42,.2)'; ctx.beginPath(); ctx.ellipse(0, 1, 12 * k, 2.5 * k, 0, 0, TAU); ctx.fill();
      leg(-sw, '#1e3a8a'); arm(sw, '#b45309');
      ctx.strokeStyle = col; ctx.lineWidth = 7 * k; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(nk[0], nk[1]); ctx.stroke();
      leg(sw, '#1e40af'); arm(-sw, '#d97706');
      ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(nk[0] + 2 * k, nk[1] - 7 * k, 6.5 * k, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(nk[0] + 1 * k, nk[1] - 9.5 * k, 6.2 * k, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
      ctx.restore(); });
  },
  /* stopwatch: centre (x,y), radius r, reading sec (hand turns once per per) */
  watch(ctx, x, y, r, sec, lab, per = 60) {
    K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; rr(ctx, x - 4, y - r - 9, 8, 7, 2); ctx.fill(); ctx.fillStyle = '#64748b'; rr(ctx, x - 7, y - r - 13, 14, 5, 2); ctx.fill();
      const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 2, x, y, r); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke();
      const f = (sec % per) / per; if (f > 0) { ctx.fillStyle = 'rgba(249,115,22,.35)'; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * .8, -Math.PI / 2, -Math.PI / 2 + f * TAU); ctx.fill(); }
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; for (let k = 0; k < 12; k++) { const a = k * TAU / 12; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * .78, y + Math.sin(a) * r * .78); ctx.lineTo(x + Math.cos(a) * r * .92, y + Math.sin(a) * r * .92); ctx.stroke(); }
      const a = -Math.PI / 2 + f * TAU; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8); ctx.stroke(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(x, y, 2.5, 0, TAU); ctx.fill(); });
    if (lab) Q42.T(ctx, lab, x, y + r + 12, { s: 10.5, w: 900, c: '#334155' });
  },
  /* speedometer dial: v in 0..vmax */
  speedo(ctx, x, y, r, v, vmax, unit = 'm/s', lab) {
    K.raw(ctx, () => { const g = ctx.createRadialGradient(x, y, 2, x, y, r); g.addColorStop(0, '#1e293b'); g.addColorStop(1, '#0f172a'); ctx.fillStyle = g; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke();
      for (let k = 0; k <= 10; k++) { const a = Math.PI * (.75 + k * .15); ctx.strokeStyle = k > 7 ? '#f87171' : '#e2e8f0'; ctx.lineWidth = k % 2 ? 1 : 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * .72, y + Math.sin(a) * r * .72); ctx.lineTo(x + Math.cos(a) * r * .88, y + Math.sin(a) * r * .88); ctx.stroke(); }
      const a = Math.PI * (.75 + clamp(Math.abs(v) / vmax, 0, 1.03) * 1.5); ctx.strokeStyle = '#f97316'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r * .78, y + Math.sin(a) * r * .78); ctx.stroke(); ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(x, y, 4, 0, TAU); ctx.fill(); });
    for (let k = 0; k <= 10; k += 5) { const a = Math.PI * (.75 + k * .15); Q42.T(ctx, String(Math.round(vmax * k / 10)), x + Math.cos(a) * r * .55, y + Math.sin(a) * r * .55, { s: 9, w: 800, c: '#e2e8f0' }); }
    Q42.T(ctx, Q52.f(Math.abs(v), 1) + ' ' + unit, x, y + r * .74, { s: 10, w: 900, c: '#fde68a' });
    if (lab) Q42.T(ctx, lab, x, y + r + 13, { s: 10.5, w: 900, c: '#fff', bg: '#334155' });
  },
  /* graph frame with signed ranges: A {x,y,w,h,x0,x1,y0,y1,xs,ys,lx,ly,xl,yl,col} → {X,Y} */
  axes(ctx, A) {
    const x0 = A.x0 || 0, y0 = A.y0 || 0, X = v => A.x + (v - x0) / (A.x1 - x0) * A.w, Y = v => A.y + A.h - (v - y0) / (A.y1 - y0) * A.h, zy = clamp(Y(0), A.y, A.y + A.h);
    K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.94)'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; rr(ctx, A.x - 34, A.y - 20, A.w + 52, A.h + 44, 8); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = 'rgba(234,88,12,.13)'; for (let v = x0; v <= A.x1 + 1e-9; v += A.xs) { ctx.beginPath(); ctx.moveTo(X(v), A.y); ctx.lineTo(X(v), A.y + A.h); ctx.stroke(); } for (let v = Math.ceil(y0 / A.ys) * A.ys; v <= A.y1 + 1e-9; v += A.ys) { ctx.beginPath(); ctx.moveTo(A.x, Y(v)); ctx.lineTo(A.x + A.w, Y(v)); ctx.stroke(); }
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(A.x, A.y - 6); ctx.lineTo(A.x, A.y + A.h); ctx.moveTo(A.x, zy); ctx.lineTo(A.x + A.w + 6, zy); ctx.stroke(); });
    const lx = A.lx || A.xs * 2, ly = A.ly || A.ys * 2;
    for (let v = x0; v <= A.x1 + 1e-9; v += lx) Q42.T(ctx, String(+v.toFixed(2)), X(v), A.y + A.h + 10, { s: 9, w: 700, c: '#475569' });
    for (let v = Math.ceil(y0 / ly) * ly; v <= A.y1 + 1e-9; v += ly) Q42.T(ctx, Q52.f(v, ly < 1 ? 1 : 0), A.x - 15, Y(v), { s: 9, w: 700, c: '#475569' });
    if (A.xl) Q42.T(ctx, A.xl, A.x + A.w + 2, zy - 10, { s: 9.5, w: 900, c: '#0f172a', a: 'right', bg: 'rgba(255,255,255,.8)' });
    if (A.yl) Q42.T(ctx, A.yl, A.x + 6, A.y - 10, { s: 9.5, w: 900, c: A.col || '#0f172a', a: 'left' });
    return { X, Y };
  },
  plot(ctx, pts, c = '#ea580c', w = 2.6, dash) { if (pts.length > 1) Q41.line(ctx, pts, c, w, dash); },
  arrow(ctx, x, y, dx, dy, col = '#dc2626', lab, w = 3) { K.force(ctx, x, y, dx, dy, lab || '', col, w); },
  ball(ctx, x, y, r, col = '#f97316') { K.ball(ctx, x, y, r, col); },
  /* horizontal metre ruler along y from a to b (X maps metres → px) */
  ruler(ctx, X, a, b, y, step, o = {}) {
    K.raw(ctx, () => { ctx.fillStyle = o.bg || '#fef3c7'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; rr(ctx, X(a) - 8, y, X(b) - X(a) + 16, 24, 4); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#78350f';
      const sub = o.sub || 5; for (let v = a, i = 0; v <= b + 1e-9; v += step / sub, i++) { const L = i % sub === 0 ? 10 : 5; ctx.lineWidth = i % sub ? .7 : 1.3; ctx.beginPath(); ctx.moveTo(X(v), y); ctx.lineTo(X(v), y + L); ctx.stroke(); } });
    for (let v = a; v <= b + 1e-9; v += step * (o.lab || 1)) Q42.T(ctx, String(+v.toFixed(2)), X(v), y + 17, { s: 9, w: 800, c: '#78350f' });
    if (o.unit) Q42.T(ctx, o.unit, X(b) + 18, y + 12, { s: 10, w: 900, c: '#78350f' });
  },
  flag(ctx, x, yg, lab, col = '#16a34a') { K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, yg); ctx.lineTo(x, yg - 34); ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, yg - 34); ctx.lineTo(x + 16, yg - 29); ctx.lineTo(x, yg - 24); ctx.fill(); }); if (lab) Q42.T(ctx, lab, x, yg - 44, { s: 11, w: 900, c: '#fff', bg: col }); },
  tree(ctx, x, yg, s = 1) { K.raw(ctx, () => { ctx.fillStyle = '#78350f'; ctx.fillRect(x - 3 * s, yg - 22 * s, 6 * s, 22 * s); const g = ctx.createRadialGradient(x - 5 * s, yg - 40 * s, 2, x, yg - 34 * s, 20 * s); g.addColorStop(0, '#86efac'); g.addColorStop(1, '#15803d'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, yg - 36 * s, 17 * s, 0, TAU); ctx.arc(x - 11 * s, yg - 27 * s, 11 * s, 0, TAU); ctx.arc(x + 11 * s, yg - 28 * s, 11 * s, 0, TAU); ctx.fill(); }); },
  stepChips(S, id, y, x0, lab, onEx, n = 9) { return Q43.stepChips(S, id, y, x0, lab, onEx, n); },
  steps(ctx, S, st, o) { return Q42.steps(ctx, S, st, Object.assign({ y: 70, x: S.W - 12, wd: 320 }, o || {})); },
  card(ctx, S, L, o) { return Q42.card(ctx, S, L, Object.assign({ bd: '#ea580c', y: 70, wd: 310 }, o || {})); },
  play(S, id, y, run, onGo, onRe, o = {}) { return Q42.chips(S, id, [['go', run ? '⏸ أوقف' : (o.go || '▶ شغّل')], ['re', '↺ من البداية']].concat(o.more || []), y, '', (S2, k) => { if (k === 'go') onGo(S2); else if (k === 're') onRe(S2); else if (o.onMore) o.onMore(S2, k); }, { bw: o.bw || 150, x0: o.x0 }); }
});

LW({ id: 'g11_l2_disp', cat: 52, name: 'الإزاحة والمسافة', fx: 'Δ<i>x</i> = <i>x</i><sub>f</sub> − <i>x</i><sub>i</sub>', sym: 'الإزاحة كمية متجهة: الفرق بين الموقع النهائي والموقع الابتدائي، وإشارتها تبين الاتجاه. المسافة كمية قياسية: طول المسار الكلي المقطوع', calc: { in: [['xf', 'الموقع النهائي xf', 'm', 12], ['xi', 'الموقع الابتدائي xi', 'm', 5]], out: 'الإزاحة Δx', u: 'm', f: v => v.xf - v.xi } });
LW({ id: 'g11_l2_vavg', cat: 52, name: 'السرعة المتوسطة', fx: '<i>v</i><sub>avg</sub> = ' + FR('Δ<i>x</i>', 'Δ<i>t</i>') + ' = ' + FR('<i>x</i><sub>f</sub> − <i>x</i><sub>i</sub>', '<i>t</i><sub>f</sub> − <i>t</i><sub>i</sub>'), sym: 'السرعة المتوسطة كمية متجهة تأخذ إشارة الإزاحة، وهي ميل المستقيم الواصل بين نقطتين في مخطط الإزاحة − الزمن. وبتعجيل منتظم: v̄ = (vi + vf) / 2', calc: { in: [['xf', 'xf', 'm', 32], ['xi', 'xi', 'm', 2], ['tf', 'tf', 's', 4], ['ti', 'ti', 's', 1]], out: 'السرعة المتوسطة', u: 'm/s', f: v => (v.xf - v.xi) / (v.tf - v.ti) } });
LW({ id: 'g11_l2_savg', cat: 52, name: 'الانطلاق المتوسط', fx: 'الانطلاق المتوسط = ' + FR('المسافة الكلية', 'الزمن المستغرق'), sym: 'كمية قياسية. على مسار مستقيم باتجاه واحد يساوي مقدار السرعة المتوسطة. السرعة الآنية: ميل المماس لمنحني الإزاحة − الزمن، وعداد السيارة يقرأ الانطلاق الآني', calc: { in: [['d', 'المسافة المقطوعة', 'm', 130], ['t', 'الزمن', 's', 10]], out: 'الانطلاق المتوسط', u: 'm/s', f: v => v.d / v.t } });
LW({ id: 'g11_l2_acc', cat: 52, name: 'التعجيل', fx: '<i>a</i> = ' + FR('Δ<i>v</i>', 'Δ<i>t</i>') + ' = ' + FR('<i>v</i><sub>f</sub> − <i>v</i><sub>i</sub>', '<i>t</i><sub>f</sub> − <i>t</i><sub>i</sub>'), sym: 'المعدل الزمني للتغير في السرعة، كمية متجهة وحدتها m/s². يساوي ميل مخطط السرعة − الزمن. موجب عند التسارع وسالب عند التباطؤ وصفر عند ثبوت السرعة. تغير اتجاه السرعة بانطلاق ثابت يولد تعجيلاً مركزياً', calc: { in: [['vf', 'السرعة النهائية', 'm/s', 30], ['vi', 'السرعة الابتدائية', 'm/s', 20], ['t', 'الزمن Δt', 's', 10]], out: 'التعجيل', u: 'm/s²', f: v => (v.vf - v.vi) / v.t } });
LW({ id: 'g11_l2_eq1', cat: 52, name: 'معادلة السرعة والزمن', fx: '<i>v</i><sub>f</sub> = <i>v</i><sub>i</sub> + <i>a</i> Δ<i>t</i>', sym: 'معادلة الحركة الأولى بتعجيل منتظم', calc: { in: [['vi', 'vi', 'm/s', 30], ['a', 'a', 'm/s²', -6], ['t', 'Δt', 's', 2]], out: 'vf', u: 'm/s', f: v => v.vi + v.a * v.t } });
LW({ id: 'g11_l2_eq2', cat: 52, name: 'معادلة الإزاحة والزمن', fx: 'Δ<i>x</i> = <i>v</i><sub>i</sub> Δ<i>t</i> + ½ <i>a</i> (Δ<i>t</i>)²', sym: 'الإزاحة بتعجيل منتظم، وتساوي المساحة تحت مخطط السرعة − الزمن. وأيضاً Δx = (vi + vf) Δt / 2', calc: { in: [['vi', 'vi', 'm/s', 30], ['a', 'a', 'm/s²', -6], ['t', 'Δt', 's', 5]], out: 'Δx', u: 'm', f: v => v.vi * v.t + .5 * v.a * v.t * v.t } });
LW({ id: 'g11_l2_eq3', cat: 52, name: 'معادلة السرعة والإزاحة', fx: '<i>v</i><sub>f</sub>² = <i>v</i><sub>i</sub>² + 2 <i>a</i> Δ<i>x</i>', sym: 'لا تحتاج الزمن. ومن السكون: vf = √(2 a Δx)', calc: { in: [['vi', 'vi', 'm/s', 30], ['a', 'a', 'm/s²', -6], ['x', 'Δx', 'm', 75]], out: 'vf', u: 'm/s', f: v => Math.sqrt(Math.max(0, v.vi * v.vi + 2 * v.a * v.x)) } });
LW({ id: 'g11_l2_fall', cat: 52, name: 'معادلات السقوط الحر', fx: '<i>v</i><sub>f</sub> = <i>g t</i> ، Δ<i>y</i> = ½ <i>g t</i>² ، <i>v</i> = √(2<i>gy</i>)', sym: 'السقوط الحر من السكون vi = 0 بتعجيل الجاذبية g = 9.8 ≈ 10 m/s² نحو الأسفل (إشارة سالبة). جميع الأجسام تسقط بالتعجيل نفسه بإهمال مقاومة الهواء', calc: { in: [['g', 'g', 'm/s²', 10], ['t', 'الزمن t', 's', 3]], out: 'المسافة الساقطة ½gt²', u: 'm', f: v => .5 * v.g * v.t * v.t } });
LW({ id: 'g11_l2_proj', cat: 52, name: 'المقذوف بزاوية', fx: '<i>t</i><sub>total</sub> = ' + FR('2 <i>v</i><sub>i</sub> sin<i>θ</i>', '<i>g</i>') + ' ، <i>h</i><sub>max</sub> = ' + FR('<i>v</i><sub>i</sub>² sin²<i>θ</i>', '2<i>g</i>') + ' ، <i>R</i> = ' + FR('<i>v</i><sub>i</sub>²', '<i>g</i>') + ' sin2<i>θ</i>', sym: 'المركبة الأفقية vx = vi cosθ ثابتة، والمركبة الشاقولية vy = vi sinθ + g t تتغير بتعجيل الجاذبية. أعظم مدى Rmax = vi² / g عند θ = 45°', calc: { in: [['v', 'السرعة الابتدائية vi', 'm/s', 20], ['th', 'الزاوية θ', '°', 37], ['g', 'g', 'm/s²', 10]], out: 'المدى الأفقي R', u: 'm', f: v => v.v * v.v / v.g * Math.sin(2 * v.th * Math.PI / 180) } });
LW({ id: 'g11_l2_horiz', cat: 52, name: 'المقذوف الأفقي', fx: '<i>v</i><sub>f</sub>² = <i>v</i><sub>x</sub>² + <i>v</i><sub>y</sub>²', sym: 'المقذوف أفقياً: vx ثابتة وvy تبدأ من صفر وتزداد بتعجيل الجاذبية، فيصل الأرض مع جسم يسقط سقوطاً حراً من الارتفاع نفسه في اللحظة نفسها', calc: { in: [['vx', 'السرعة الأفقية vx', 'm/s', 40], ['h', 'الارتفاع h', 'm', 45], ['g', 'g', 'm/s²', 10]], out: 'سرعة الاصطدام', u: 'm/s', f: v => Math.sqrt(v.vx * v.vx + 2 * v.g * v.h) } });

/* =============== A1 — أطر الإسناد: الزورق والشاطئ وأنواع الحركة (2-1، 2-2، الأشكال 1–3، ص 24–25) =============== */
(() => {
  const PX = 22, BH = 3.2; // px per m, half boat length (m)
  const D = { id: 'g11_m_frame', page: 24, fig: 'الأشكال 1 و 2 و 3',
    desc: 'الحركة تغير مستمر في موقع الجسم بالنسبة إلى نقطة تُعد ثابتة تسمى نقطة الإسناد. الأطفال في الزورق (الشكل 2) ساكنون بالنسبة للزورق لكنهم متحركون بالنسبة للشاطئ. ومن أنواع الحركة: الانتقالية (سيارة على طريق أفقي) والدورانية (الأرض حول محورها) والاهتزازية (البندول).',
    tags: 'وصف الحركة الكاينماتيك الداينمك إطار الإسناد نقطة الإسناد ساكن متحرك زورق شاطئ حركة انتقالية دورانية اهتزازية بندول',
    tools: ['زورق فيه أطفال', 'شاطئ عليه شجرة ومراقب', 'نماذج لأنواع الحركة'],
    steps: ['اختر «إطار الشاطئ»: الشجرة ساكنة والزورق يتحرك.', 'اختر «إطار الزورق» (أو اضغط على الزورق): الأطفال ساكنون والشاطئ يتحرك نحو الخلف.', 'اسحب الطفل الواقف على الزورق، أو اجعله يمشي من الأزرار، وقارن سرعته في الإطارين.', 'غيّر سرعة الزورق من اللوحة وراقب أثر حركة الطفل.'],
    concl: ['الحكم على جسم بأنه ساكن أو متحرك يعتمد على نقطة الإسناد التي نختارها.', 'الأطفال الجالسون ساكنون بالنسبة للزورق ومتحركون بالنسبة للشاطئ (الشكل 2).', 'أنواع الحركة: انتقالية ودورانية واهتزازية.', 'الكاينماتيك يصف الحركة دون النظر إلى مسبباتها، والداينمك يهتم بمسبباتها كالقوة والطاقة.'],
    laws: ['g11_l2_disp'],
    controls: [R('vb', 'سرعة الزورق بالنسبة للشاطئ', 0, 5, 2, .5, 'm/s'), R('vc', 'سرعة الطفل على الزورق', -1.5, 1.5, 0, .5, 'm/s'), TG('trail', 'أثر حركة الطفل', true, null, 'trail')],
    setup(S) { S.fr = 'shore'; S.xb = 4; S.xc = 1.2; S.cam = 0; S.trl = []; S.tk = 0; S.clk = 0; S.vbd = 0; S.xcd = 1.2; S.drg = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 20, x1 = w - 20; return { w, h, L, x0, x1, span: (x1 - x0) / PX, sy: 336, wy: 426, by: 508 }; },
    update(S, dt) {
      if (!S.W) return; const g = D.geo(S); S.clk += dt; S.vbd = Q52.ease(S.vbd, S.p.vb, dt, 3);
      S.xb += S.vbd * dt; if (!S.drg) { S.xc = clamp(S.xc + S.p.vc * dt, -BH + .5, BH - .5); } S.xcd = Q52.ease(S.xcd, S.xc, dt, 12);
      if (S.fr === 'shore' && S.xb > g.span + BH + 1) { S.xb -= g.span + 2 * BH + 2; S.trl = []; }
      const tgt = S.fr === 'boat' ? S.xb - g.span / 2 : 0; S.cam = Q52.ease(S.cam, tgt, dt, 4);
      S.tk += dt; if (S.tk > .3) { S.tk = 0; S.trl.push([S.xb + S.xcd, S.xcd]); if (S.trl.length > 36) S.trl.shift(); }
    },
    setFr(S, f) { if (S.fr === f) return; if (f === 'shore') { const g = D.geo(S), nx = Q52.md(S.xb, g.span); S.cam -= S.xb - nx; S.trl = S.trl.map(q => [q[0] - (S.xb - nx), q[1]]); S.xb = nx; } S.fr = f; },
    types(ctx, S, g) { // three mini animations: translational, rotational, oscillatory
      const y0 = 82, bw = 118, x = g.L + 20, c = S.clk;
      [['انتقالية', '#2563eb'], ['دورانية', '#16a34a'], ['اهتزازية', '#9333ea']].forEach((q, i) => { const bx = x + i * (bw + 8);
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.strokeStyle = q[1]; ctx.lineWidth = 2; rr(ctx, bx, y0, bw, 150, 10); ctx.fill(); ctx.stroke(); });
        Q42.T(ctx, 'حركة ' + q[0], bx + bw / 2, y0 + 16, { s: 11, w: 900, c: '#fff', bg: q[1] });
        if (i === 0) { const u = Q52.md(c * 30, bw + 40) - 20; Q52.road(ctx, bx + 6, bx + bw - 6, y0 + 112, 16, c * 30); K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(bx + 4, y0 + 30, bw - 8, 110); ctx.clip(); }); Q52.car(ctx, bx + u, y0 + 112, .5, '#2563eb', c * 6); K.raw(ctx, () => ctx.restore()); }
        if (i === 1) { const cx = bx + bw / 2, cy = y0 + 86, r = 36; K.raw(ctx, () => { const gr = ctx.createRadialGradient(cx - 10, cy - 10, 4, cx, cy, r); gr.addColorStop(0, '#93c5fd'); gr.addColorStop(1, '#1d4ed8'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.clip(); ctx.fillStyle = '#16a34a';
          for (let k = 0; k < 3; k++) { const ph = Q52.md(c * .9 + k * 2.1, TAU), px = cx + Math.cos(ph) * r * .9; if (Math.sin(ph) > -0.2) { ctx.beginPath(); ctx.ellipse(px, cy - 12 + k * 12, 9 * Math.max(.2, Math.sin(ph) + .2), 7, 0, 0, TAU); ctx.fill(); } } ctx.restore();
          ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(cx, cy - r - 10); ctx.lineTo(cx, cy + r + 10); ctx.stroke(); ctx.setLineDash([]); }); Q42.T(ctx, 'الأرض حول محورها', cx, y0 + 140, { s: 9.5, w: 800, c: '#334155' }); }
        if (i === 2) { const px = bx + bw / 2, py = y0 + 34, Lp = 80, th = .5 * Math.sin(c * 2.6); K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(px - 26, py - 4, 52, 5); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.sin(th) * Lp, py + Math.cos(th) * Lp); ctx.stroke(); ctx.strokeStyle = 'rgba(147,51,234,.35)'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(px, py, Lp, Math.PI / 2 - .5, Math.PI / 2 + .5); ctx.stroke(); ctx.setLineDash([]); });
          Q52.ball(ctx, px + Math.sin(th) * Lp, py + Math.cos(th) * Lp, 9, '#9333ea'); Q42.T(ctx, 'البندول', px, y0 + 140, { s: 9.5, w: 800, c: '#334155' }); }
      });
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), X = xm => g.x0 + (xm - S.cam) * PX; Q52.bg(ctx, w, h); D.types(ctx, S, g);
      Q52.sky(ctx, g.x0, g.sy - 30, g.x1, g.wy, -S.cam * PX * .3);
      K.raw(ctx, () => { ctx.fillStyle = '#65a30d'; ctx.fillRect(g.x0, g.wy - 22, g.x1 - g.x0, 22); const gw = ctx.createLinearGradient(0, g.wy, 0, g.by + 50); gw.addColorStop(0, '#38bdf8'); gw.addColorStop(1, '#0369a1'); ctx.fillStyle = gw; ctx.fillRect(g.x0, g.wy, g.x1 - g.x0, g.by + 52 - g.wy);
        ctx.save(); ctx.beginPath(); ctx.rect(g.x0, g.wy, g.x1 - g.x0, g.by + 52 - g.wy); ctx.clip(); ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 1.5;
        for (let k = Math.floor(S.cam / 3) - 1; k < S.cam / 3 + g.span / 3 + 2; k++) for (let r = 0; r < 4; r++) { const xx = X(k * 3 + (r % 2) * 1.5), yy = g.wy + 14 + r * 18; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + 8, yy - 4, xx + 16, yy); ctx.stroke(); } ctx.restore(); });
      // shore objects (fixed in the shore frame)
      K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.x0, g.sy - 40, g.x1 - g.x0, g.by + 100 - g.sy); ctx.clip(); });
      for (let k = Math.floor(S.cam / 9) - 1; k < S.cam / 9 + g.span / 9 + 2; k++) Q52.tree(ctx, X(k * 9 + 3), g.wy - 12, .95);
      const ox = 10; Q52.runner(ctx, X(ox), g.wy - 14, 46, 0, 1, '#16a34a', false); Q42.T(ctx, 'مراقب', X(ox), g.wy - 72, { s: 10, w: 900, c: '#fff', bg: '#16a34a' });
      // trail of the standing child
      if (S.p.trail) S.trl.forEach((q, i) => { const xm = S.fr === 'boat' ? S.xb + q[1] : q[0]; Q41.dot(ctx, X(xm), g.by - 64, 'rgba(220,38,38,' + (.15 + .7 * i / S.trl.length) + ')', 3.5); });
      // boat with seated children + one standing child
      const bx = X(S.xb), by = g.by;
      K.raw(ctx, () => { const gh = ctx.createLinearGradient(0, by - 22, 0, by + 14); gh.addColorStop(0, '#fb923c'); gh.addColorStop(1, '#9a3412'); ctx.fillStyle = gh; ctx.beginPath(); ctx.moveTo(bx - BH * PX - 10, by - 20); ctx.lineTo(bx + BH * PX + 16, by - 20); ctx.quadraticCurveTo(bx + BH * PX + 4, by + 12, bx + BH * PX - 14, by + 12); ctx.lineTo(bx - BH * PX + 4, by + 12); ctx.quadraticCurveTo(bx - BH * PX - 8, by + 4, bx - BH * PX - 10, by - 20); ctx.fill(); ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(bx - BH * PX - 6, by - 18, 2 * BH * PX + 16, 3);
        ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 1.5; if (S.vbd > .2) for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.arc(bx - BH * PX - 6 - k * 12, by + 6, 6 + k * 2, -1, 1); ctx.stroke(); } });
      [-2.2, -.9].forEach((o, i) => { const kx = bx + o * PX; K.raw(ctx, () => { ctx.fillStyle = '#f97316'; rr(ctx, kx - 8, by - 44, 16, 24, 5); ctx.fill(); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(kx, by - 51, 7, 0, TAU); ctx.fill(); ctx.fillStyle = i ? '#7c2d12' : '#1f2937'; ctx.beginPath(); ctx.arc(kx, by - 54, 7, Math.PI, TAU); ctx.fill(); }); });
      const cxp = bx + S.xcd * PX; Q52.runner(ctx, cxp, by - 20, 44, S.clk * 9, S.p.vc < 0 ? -1 : 1, '#dc2626', Math.abs(S.p.vc) > .01 && !S.drg);
      K.raw(ctx, () => ctx.restore());
      Q42.T(ctx, S.fr === 'boat' ? 'الكاميرا مثبتة على الزورق' : 'الكاميرا مثبتة على الشاطئ', g.x0 + 110, g.sy - 16, { s: 10.5, w: 900, c: '#fff', bg: S.fr === 'boat' ? '#ea580c' : '#16a34a' });
      const vC = S.p.vb + S.p.vc, dirW = v => Math.abs(v) < .01 ? 'ساكن' : 'يتحرك ' + Q52.f(Math.abs(v), 1) + ' m/s ' + (v > 0 ? 'للأمام' : 'للخلف');
      const L = S.fr === 'shore' ? [{ t: 'الشجرة والمراقب: ساكنان', c: '#16a34a', w: 900 }, { t: 'الزورق: ' + dirW(S.p.vb) }, { t: 'الأطفال الجالسون: ' + dirW(S.p.vb) }, { t: 'الطفل الواقف: ' + dirW(vC), c: '#dc2626', w: 800 }]
        : [{ t: 'الزورق والأطفال الجالسون: ساكنون', c: '#ea580c', w: 900 }, { t: 'الشاطئ والشجرة: ' + dirW(-S.p.vb) }, { t: 'الطفل الواقف: ' + dirW(S.p.vc), c: '#dc2626', w: 800 }];
      Q52.card(ctx, S, L.concat([{ t: 'الحركة تعتمد على نقطة الإسناد', c: '#7c2d12', w: 900 }]), { title: S.fr === 'shore' ? 'إطار الإسناد: الشاطئ' : 'إطار الإسناد: الزورق' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.f); Q42.drawChips(ctx, C.k);
      Q42.banner(ctx, w, 'بدّل إطار الإسناد، واسحب الطفل الأحمر على الزورق', '#ea580c');
    },
    chips(S, g) { return { f: Q42.chips(S, 'fr', [['shore', 'إطار الشاطئ'], ['boat', 'إطار الزورق']], g.h - 84, S.fr, (S2, k) => D.setFr(S2, k), { bw: 170, col: '#ea580c' }),
      k: Q42.chips(S, 'kid', [['0', 'الطفل واقف'], ['1', 'يمشي للأمام'], ['-1', 'يمشي للخلف']], g.h - 128, String(Math.sign(S.p.vc)), (S2, k) => setParam(S2, 'vc', +k), { bw: 150 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), X = xm => g.x0 + (xm - S.cam) * PX;
      return [{ id: 'kid', x: X(S.xb + S.xcd), y: g.by - 44, r: 22, axis: 'x', keep: true, tip: 'اسحب الطفل على الزورق', idle: 'اسحب ✋', drag: (S2, d) => { S2.drg = 1; S2.xc = clamp((d.x - g.x0) / PX + S2.cam - S2.xb, -BH + .5, BH - .5); }, up: S2 => { S2.drg = 0; } },
        { id: 'boat', x: X(S.xb), y: g.by, w: 2 * BH * PX, h: 30, axis: 'none', hint: false, tip: 'اضغط: إطار الزورق', click: S2 => D.setFr(S2, 'boat') },
        { id: 'obs', x: X(10), y: g.wy - 40, r: 24, axis: 'none', hint: false, tip: 'اضغط: إطار الشاطئ', click: S2 => D.setFr(S2, 'shore') }].concat(C.f, C.k); },
    readings(S) { return [rd('إطار الإسناد', S.fr === 'boat' ? 'الزورق' : 'الشاطئ'), rd('سرعة الزورق بالنسبة للشاطئ', Q52.f(S.p.vb) + ' m/s'), rd('سرعة الطفل بالنسبة للزورق', Q52.f(S.p.vc) + ' m/s'), rd('سرعة الطفل بالنسبة للشاطئ', Q52.f(S.p.vb + S.p.vc) + ' m/s')]; },
    explain(S) { return Q26.ex('في إطار الزورق يبقى الأطفال في أماكنهم ويتحرك الشاطئ إلى الخلف، وفي إطار الشاطئ يتحرك الزورق ومن فيه.', 'الحركة تغير موقع الجسم بالنسبة إلى نقطة إسناد نعدها ثابتة. موقع الأطفال لا يتغير بالنسبة للزورق لكنه يتغير بالنسبة للشجرة.', 'عندما تجلس في سيارة متحركة يبدو لك أن الأشجار تتحرك إلى الخلف، وأنت ساكن بالنسبة لمقعدك.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — الموقع والإزاحة والمسافة: العداء على المحور x (2-3، الشكل 4، ص 25–26) =============== */
(() => {
  const CASES = { c1: ['من 5 إلى 12', [5, 12]], c2: ['من 5 إلى 1', [5, 1]], c3: ['من 5 إلى 20 ثم 5', [5, 20, 5]], free: ['حر: اسحب العداء', [5]] };
  const EX = { c1: { q: 'عداء موقعه الابتدائي xi = +5 m وموقعه النهائي xf = +12 m. احسب إزاحته.', lines: ['Δx = xf − xi', 'Δx = 12 − 5', 'الإشارة الموجبة: نحو يمين المحور x', 'Δx = +7 m'] },
    c2: { q: 'تحرك العداء من xi = +5 m باتجاه معاكس إلى xf = +1 m. احسب إزاحته.', lines: ['Δx = xf − xi', 'Δx = 1 − 5', 'الإشارة السالبة: نحو يسار المحور x', 'Δx = −4 m'] },
    c3: { q: 'تحرك العداء من xi = +5 m إلى الموقع 20 m ثم رجع إلى xf = +5 m. احسب إزاحته والمسافة الكلية.', lines: ['Δx = xf − xi = 15 − 15 = 0', 'في الذهاب: d₁ = 20 − 5 = 15 m', 'في الرجوع: d₂ = 15 m', 'المسافة d = 15 + 15 = 30 m'] } };
  const D = { id: 'g11_m_disp', page: 25, fig: 'الشكل 4 + أمثلة ص 26',
    desc: 'الموقع كمية متجهة لها مقدار واتجاه بالنسبة إلى نقطة الأصل. التغير في متجه موقع الجسم يسمى الإزاحة Δx = xf − xi ، وإشارتها تدل على الاتجاه. أما المسافة فهي طول المسار الكلي المقطوع وهي كمية قياسية.',
    tags: 'الموقع الإزاحة المسافة Δx=xf-xi كمية متجهة كمية قياسية العداء +7m -4m صفر 30m نقطة الأصل',
    tools: ['مضمار مدرج بالأمتار', 'عداء', 'ساعات توقيت'],
    steps: ['اختر حالة من أمثلة الكتاب في الأسفل وراقب العداء ومتجه الإزاحة الأحمر.', 'قارن الإزاحة Δx بالمسافة d في الحالة الثالثة: الإزاحة صفر والمسافة 30 m.', 'في الوضع الحر اسحب العداء ذهاباً وإياباً، واسحب العلم الأخضر لتغيير الموقع الابتدائي.', 'اضغط «الحل خطوة خطوة» لحل مثال الحالة المختارة.'],
    concl: ['الإزاحة Δx = xf − xi كمية متجهة: موجبة نحو يمين المحور وسالبة نحو يساره.', 'المسافة طول المسار المقطوع، كمية قياسية موجبة دائماً.', 'من 5 إلى 12: Δx = +7 m. من 5 إلى 1: Δx = −4 m.', 'ذهاب وإياب من 5 إلى 20 ثم 5: الإزاحة صفر والمسافة 30 m.'],
    laws: ['g11_l2_disp'],
    controls: [R('v', 'سرعة العداء', 1, 8, 4, .5, 'm/s'), TG('graph', 'مخطط الموقع − الزمن', true, null, 'chart')],
    setup(S) { S.cs = 'c1'; S.ex = 0; S.k = 0; D.reset(S); },
    reset(S) { const W = CASES[S.cs][1]; S.xi = W[0]; S.x = W[0]; S.tx = W[0]; S.wp = W.slice(1); S.dist = 0; S.tt = 0; S.hist = [[0, S.x]]; S.ph = 0; S.mv = 0; S.dir = 1; S.go = 0; S.wait = .6; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 40, x1 = w - 40; return { w, h, L, x0, x1, ty: 520, X: m => x0 + (m + 5) / 30 * (x1 - x0) }; },
    update(S, dt) {
      if (S.wait > 0) { S.wait -= dt; if (S.wait <= 0 && S.wp.length) S.go = 1; }
      if (S.go && S.wp.length) { const t = S.wp[0], st = S.p.v * dt; if (Math.abs(t - S.tx) <= st) { S.tx = t; S.wp.shift(); if (!S.wp.length) S.go = 0; } else S.tx += Math.sign(t - S.tx) * st; }
      const ox = S.x; S.x = Q52.ease(S.x, S.tx, dt, 9); const dx = S.x - ox; S.dist += Math.abs(dx); S.mv = Q52.ease(S.mv, Math.abs(dx) / Math.max(dt, 1e-3), dt, 8); if (Math.abs(dx) > 1e-4) S.dir = Math.sign(dx);
      S.ph += S.mv * dt * 2.2; if (S.mv > .05 || S.tt > 0) { if (S.tt < 20) { S.tt += dt; const lst = S.hist[S.hist.length - 1]; if (S.tt - lst[0] > .08) S.hist.push([S.tt, S.x]); } }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), X = g.X, Dx = S.x - S.xi; Q52.bg(ctx, w, h);
      if (S.p.graph) { const tm = Math.max(8, Math.ceil(S.tt / 2) * 2), A = Q52.axes(ctx, { x: g.L + 52, y: 92, w: 330, h: 190, x0: 0, x1: tm, y0: -5, y1: 25, xs: 1, ys: 5, lx: 2, ly: 5, xl: 't (s)', yl: 'x (m)' });
        Q41.line(ctx, [[A.X(0), A.Y(S.xi)], [A.X(tm), A.Y(S.xi)]], '#16a34a', 1.2, [5, 4]); Q52.plot(ctx, S.hist.map(q => [A.X(q[0]), A.Y(q[1])]), '#ea580c', 2.6); Q41.dot(ctx, A.X(S.tt), A.Y(S.x), '#dc2626', 4.5); }
      // ground + track + ruler
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.ty - 120, 0, g.ty); gg.addColorStop(0, 'rgba(254,215,170,.0)'); gg.addColorStop(1, 'rgba(254,215,170,.7)'); ctx.fillStyle = gg; ctx.fillRect(g.x0 - 20, g.ty - 120, g.x1 - g.x0 + 40, 120); ctx.fillStyle = '#c2410c'; ctx.fillRect(g.x0 - 20, g.ty, g.x1 - g.x0 + 40, 8); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(g.x0 - 20, g.ty + 3, g.x1 - g.x0 + 40, 1.5); });
      Q52.ruler(ctx, X, -5, 25, g.ty + 12, 5, { sub: 5, unit: 'x (m)' });
      Q42.T(ctx, 'O', X(0), g.ty + 46, { s: 11, w: 900, c: '#0f172a' });
      // displacement arrow + distance path
      if (Math.abs(Dx) > .05) Q52.arrow(ctx, X(S.xi), g.ty + 62, (X(S.x) - X(S.xi)), 0, '#dc2626', '', 3); Q42.T(ctx, 'Δx = ' + Q52.f(Dx, 1) + ' m', (X(S.xi) + X(S.x)) / 2, g.ty + 80, { s: 11, w: 900, c: '#fff', bg: '#dc2626' });
      Q52.flag(ctx, X(S.xi), g.ty, 'xi', '#16a34a'); Q52.watch(ctx, X(S.xi) - 30, g.ty - 100, 15, 0, 't = 0', 20);
      Q52.runner(ctx, X(S.x), g.ty, 64, S.ph, S.dir, '#2563eb', S.mv > .1); Q52.watch(ctx, X(S.x), g.ty - 100, 15, S.tt, 't = ' + Q52.f(S.tt, 1) + ' s', 20);
      Q41.line(ctx, [[X(S.x), g.ty - 80], [X(S.x), g.ty - 70]], '#334155', 1.2);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); if (C.e) { C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e); }
      if (S.ex && EX[S.cs]) Q52.steps(ctx, S, Object.assign({ title: 'أمثلة ص 26' }, EX[S.cs], { k: S.k }));
      else Q52.card(ctx, S, [{ t: 'xi = ' + Q52.f(S.xi, 1) + ' m', mono: 1 }, { t: 'xf = ' + Q52.f(S.x, 1) + ' m', mono: 1 }, { t: 'Δx = xf − xi = ' + Q52.f(Dx, 1) + ' m', mono: 1, c: '#dc2626', w: 900 }, { t: Math.abs(Dx) < .05 ? 'الإزاحة صفر' : Dx > 0 ? 'الإزاحة نحو يمين المحور x' : 'الإزاحة نحو يسار المحور x', c: '#334155' }, { t: 'المسافة المقطوعة d = ' + Q52.f(S.dist, 1) + ' m', c: '#ea580c', w: 900 }, { t: 'الإزاحة متجهة والمسافة قياسية', c: '#64748b' }], { title: 'الموقع والإزاحة والمسافة' });
      Q42.banner(ctx, w, S.cs === 'free' ? 'اسحب العداء، واسحب العلم الأخضر' : 'اختر مثالاً، ثم راقب الإزاحة والمسافة', '#ea580c');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', Object.keys(CASES).map(k => [k, CASES[k][0]]), g.h - 128, S.cs, (S2, k) => { S2.cs = k; S2.ex = 0; D.reset(S2); }, { bw: 170, col: '#ea580c' }),
      e: S.cs === 'free' ? null : Q52.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => D.reset(S2), EX[S.cs].lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), toM = px => Math.round(clamp((px - g.x0) / (g.x1 - g.x0) * 30 - 5, -5, 25) * 2) / 2;
      return [{ id: 'run', x: g.X(S.x), y: g.ty - 32, r: 24, axis: 'x', keep: true, tip: 'اسحب العداء', idle: 'اسحب ✋', drag: (S2, d) => { if (S2.cs !== 'free') { S2.cs = 'free'; S2.ex = 0; S2.wp = []; S2.go = 0; } S2.tx = toM(d.x); } },
        { id: 'xi', x: g.X(S.xi) + 6, y: g.ty - 28, r: 16, axis: 'x', keep: true, hint: false, tip: 'اسحب الموقع الابتدائي', drag: (S2, d) => { S2.cs = 'free'; S2.ex = 0; S2.wp = []; S2.go = 0; S2.xi = toM(d.x); S2.x = S2.tx = S2.xi; S2.dist = 0; S2.tt = 0; S2.hist = [[0, S2.xi]]; } }].concat(C.c, C.e || []); },
    readings(S) { return [rd('الموقع الابتدائي xi', Q52.f(S.xi, 1) + ' m'), rd('الموقع الحالي xf', Q52.f(S.x, 1) + ' m'), rd('الإزاحة Δx', Q52.f(S.x - S.xi, 1) + ' m'), rd('المسافة d', Q52.f(S.dist, 1) + ' m')]; },
    record(S) { return { xi: Q52.f(S.xi, 1), xf: Q52.f(S.x, 1), dx: Q52.f(S.x - S.xi, 1), d: Q52.f(S.dist, 1) }; },
    cols: [['xi', 'xi (m)'], ['xf', 'xf (m)'], ['dx', 'Δx (m)'], ['d', 'd (m)']],
    explain(S) { return Q26.ex('في الذهاب والإياب تعود الإزاحة إلى الصفر بينما تبقى المسافة تتزايد.', 'الإزاحة تعتمد على الموقعين الابتدائي والنهائي فقط ولها اتجاه (إشارة)، أما المسافة فتجمع أطوال كل أجزاء المسار.', 'من يركض حول ملعب دورة كاملة يقطع مسافة 400 m لكن إزاحته صفر.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — السرعة المتوسطة والسرعة الآنية: السيارة x = 2t² (2-4، 2-6، الأشكال 5 و 6 و 9 و 10، ص 26–32) =============== */
(() => {
  const xf = t => 2 * t * t, vf = t => 4 * t;
  const EX = { q: 'سيارة موقعها xi = 2 m عند ti = 1 s ، ووصلت xf = 32 m عند tf = 4 s كما في الشكل 5. احسب سرعتها المتوسطة.', lines: ['Δx = xf − xi = 32 − 2 = 30 m', 'Δt = tf − ti = 4 − 1 = 3 s', 'v_avg = Δx / Δt = 30 / 3', 'v_avg = 10 m/s'] };
  const D = { id: 'g11_m_avg', page: 26, fig: 'الأشكال 5 و 6 و 9 و 10',
    desc: 'السرعة المتوسطة = الإزاحة ÷ الزمن المستغرق، وهي ميل المستقيم (القاطع) الواصل بين نقطتين على مخطط الإزاحة − الزمن. وعند تقريب النقطة B من A يصغر Δx و Δt حتى يصبح القاطع مماساً للمنحني عند A، وميل المماس يعطي السرعة الآنية. عداد السيارة يقرأ الانطلاق الآني ولا يعين الاتجاه.',
    tags: 'السرعة المتوسطة ميل القاطع مخطط الإزاحة الزمن x-t السرعة الآنية المماس عداد السيارة الانطلاق الآني 10m/s 32m 2m',
    tools: ['سيارة على طريق مستقيم', 'ساعة توقيت', 'مخطط الإزاحة − الزمن', 'عداد السرعة'],
    steps: ['اضغط «▶ شغّل»: تتحرك السيارة ويُرسم مخطط الإزاحة − الزمن، والعداد يقرأ الانطلاق الآني.', 'اسحب النقطتين A و B على المنحني: ميل القاطع الأحمر = السرعة المتوسطة بينهما.', 'اضغط «B تقترب من A»: يتحول القاطع إلى مماس وميله السرعة الآنية عند A (الشكل 9).', 'اضغط «الحل خطوة خطوة» لحل مثال الكتاب: 10 m/s.'],
    concl: ['السرعة المتوسطة v_avg = Δx / Δt = ميل القاطع في مخطط الإزاحة − الزمن.', 'إشارة السرعة المتوسطة هي إشارة الإزاحة.', 'السرعة الآنية = ميل المماس للمنحني عند تلك اللحظة.', 'عداد السيارة يقرأ الانطلاق الآني ولا يعين الاتجاه (الشكل 10).', 'مثال الكتاب: (32 − 2) / (4 − 1) = 10 m/s.'],
    laws: ['g11_l2_vavg', 'g11_l2_savg'],
    controls: [R('t1', 'زمن النقطة A', 0, 4.5, 1, .05, 's'), R('t2', 'زمن النقطة B', .5, 5, 4, .05, 's'), TG('tan', 'المماس عند A', false, null, 'line')],
    setup(S) { S.tc = 0; S.run = 0; S.ta = 1; S.tb = 4; S.anim = 0; S.ex = 0; S.k = 0; S.rot = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 60, x1 = w - 70; return { w, h, L, x0, x1, ry: 540, X: m => x0 + m / 50 * (x1 - x0) }; },
    update(S, dt) {
      if (S.run) { S.tc += dt; if (S.tc >= 5) { S.tc = 5; S.run = 0; } } S.rot = xf(S.tc) / .3;
      S.ta = Q52.ease(S.ta, S.p.t1, dt, 10);
      if (S.anim) { S.tb += (S.ta - S.tb) * Math.min(1, dt * 1.1); if (Math.abs(S.tb - S.ta) < .02) { S.anim = 0; setParam(S, 't2', clamp(S.p.t1 + .05, .5, 5)); setParam(S, 'tan', true); } }
      else S.tb = Q52.ease(S.tb, S.p.t2, dt, 10);
    },
    slope(S) { const d = S.tb - S.ta; return Math.abs(d) < .03 ? vf(S.ta) : (xf(S.tb) - xf(S.ta)) / d; },
    graph(ctx, S, g) {
      const A = Q52.axes(ctx, { x: g.L + 56, y: 92, w: 330, h: 196, x1: 5, y1: 50, xs: .5, ys: 5, lx: 1, ly: 10, xl: 't (s)', yl: 'x (m)' }), P = t => [A.X(t), A.Y(xf(t))], C = []; for (let t = 0; t <= 5.001; t += .05) C.push(P(t));
      Q52.plot(ctx, C, 'rgba(234,88,12,.35)', 2, [5, 4]); Q52.plot(ctx, C.filter((p, i) => i * .05 <= S.tc + 1e-6), '#ea580c', 3);
      const ta = S.ta, tb = S.tb, m = D.slope(S);
      K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(A.X(0), A.Y(50), A.X(5) - A.X(0), A.Y(0) - A.Y(50)); ctx.clip(); });
      const ln = (t0, x0, sl, col, wd) => Q41.line(ctx, [[A.X(t0 - 2), A.Y(x0 - 2 * sl)], [A.X(t0 + 3), A.Y(x0 + 3 * sl)]], col, wd);
      if (Math.abs(tb - ta) >= .03) { ln(ta, xf(ta), m, '#dc2626', 2.2); Q41.line(ctx, [[A.X(ta), A.Y(xf(ta))], [A.X(tb), A.Y(xf(ta))], [A.X(tb), A.Y(xf(tb))]], '#7c3aed', 1.6, [4, 3]); }
      if (S.p.tan || Math.abs(tb - ta) < .03) ln(ta, xf(ta), vf(ta), '#16a34a', 2.4);
      K.raw(ctx, () => ctx.restore());
      if (Math.abs(tb - ta) >= .3) { Q42.T(ctx, 'Δt', (A.X(ta) + A.X(tb)) / 2, A.Y(xf(ta)) + 10, { s: 10, w: 900, c: '#7c3aed' }); Q42.T(ctx, 'Δx', A.X(tb) + 14, (A.Y(xf(ta)) + A.Y(xf(tb))) / 2, { s: 10, w: 900, c: '#7c3aed' }); }
      Q41.knob(ctx, A.X(ta), A.Y(xf(ta)), '#2563eb', 8); Q42.T(ctx, 'A', A.X(ta) - 14, A.Y(xf(ta)) - 10, { s: 11, w: 900, c: '#2563eb' });
      Q41.knob(ctx, A.X(tb), A.Y(xf(tb)), '#dc2626', 8); Q42.T(ctx, 'B', A.X(tb) - 14, A.Y(xf(tb)) - 10, { s: 11, w: 900, c: '#dc2626' });
      if (S.tc > 0) Q41.dot(ctx, A.X(S.tc), A.Y(xf(S.tc)), '#f97316', 4);
      return A;
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), X = g.X; Q52.bg(ctx, w, h); D.graph(ctx, S, g);
      Q52.sky(ctx, g.L + 10, g.ry - 110, w - 12, g.ry, 0); Q52.road(ctx, g.L + 10, w - 12, g.ry, 32, 0); Q52.ruler(ctx, X, 0, 50, g.ry + 36, 5, { sub: 5, lab: 2, unit: 'm' });
      Q42.T(ctx, 'O', X(0), g.ry - 8, { s: 11, w: 900, c: '#0f172a' });
      [[S.ta, 'A', '#2563eb'], [S.tb, 'B', '#dc2626']].forEach(q => { Q52.car(ctx, X(xf(q[0])), g.ry + 18, .62, '#94a3b8', 0, 1, .55); Q42.T(ctx, q[1] + ': t = ' + Q52.f(q[0], 2) + ' s', X(xf(q[0])), g.ry - 44, { s: 10, w: 900, c: '#fff', bg: q[2] }); });
      Q52.car(ctx, X(xf(S.tc)), g.ry + 18, .7, '#dc2626', S.rot);
      Q52.arrow(ctx, X(0), g.ry - 66, X(xf(S.ta)) - X(0), 0, '#2563eb', '', 2.4); Q52.arrow(ctx, X(0), g.ry - 88, X(xf(S.tb)) - X(0), 0, '#dc2626', '', 2.4);
      Q42.T(ctx, 'xi = ' + Q52.f(xf(S.ta), 1) + ' m', X(0) + 4, g.ry - 66, { s: 10, w: 900, c: '#2563eb', a: 'left', bg: 'rgba(255,255,255,.85)' }); Q42.T(ctx, 'xf = ' + Q52.f(xf(S.tb), 1) + ' m', X(0) + 4, g.ry - 88, { s: 10, w: 900, c: '#dc2626', a: 'left', bg: 'rgba(255,255,255,.85)' });
      Q52.speedo(ctx, w - 82, 372, 42, vf(S.tc), 20, 'm/s', 'الانطلاق الآني');
      Q52.watch(ctx, w - 190, 372, 20, S.tc, 't = ' + Q52.f(S.tc, 2) + ' s', 5);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      const m = D.slope(S), near = Math.abs(S.tb - S.ta) < .03;
      if (S.ex) Q52.steps(ctx, S, Object.assign({ title: 'السرعة المتوسطة ص 27' }, EX, { k: S.k }));
      else Q52.card(ctx, S, [{ t: 'A: t₁ = ' + Q52.f(S.ta, 2) + ' s , x₁ = ' + Q52.f(xf(S.ta), 1) + ' m', mono: 1, c: '#2563eb' }, { t: 'B: t₂ = ' + Q52.f(S.tb, 2) + ' s , x₂ = ' + Q52.f(xf(S.tb), 1) + ' m', mono: 1, c: '#dc2626' },
        near ? { t: 'القاطع أصبح مماساً عند A', c: '#16a34a', w: 900 } : { t: 'v_avg = Δx / Δt = ' + Q52.f(xf(S.tb) - xf(S.ta), 1) + ' / ' + Q52.f(S.tb - S.ta, 2), mono: 1 },
        { t: (near ? 'السرعة الآنية' : 'السرعة المتوسطة') + ' = ' + Q52.f(m, 2) + ' m/s', c: near ? '#16a34a' : '#dc2626', w: 900 }, { t: 'السرعة الآنية عند A = ' + Q52.f(vf(S.ta), 2) + ' m/s', c: '#16a34a' }, { t: 'slope = tanθ = Δx / Δt', mono: 1, c: '#64748b' }], { title: 'الميل في مخطط الإزاحة − الزمن' });
      Q42.banner(ctx, w, 'اسحب النقطتين A و B على المنحني، ثم قرّب B من A', '#ea580c');
    },
    chips(S, g) { return { p: Q52.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.tc >= 5) S2.tc = 0; S2.run = S2.run ? 0 : 1; }, S2 => { S2.tc = 0; S2.run = 0; }, { bw: 150, more: [['ba', 'قرّب B من A']], onMore: S2 => { S2.anim = 1; S2.ex = 0; } }),
      e: Q52.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { setParam(S2, 't1', 1); setParam(S2, 't2', 4); setParam(S2, 'tan', false); S2.anim = 0; S2.tc = 0; S2.run = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), gx = g.L + 56, toT = x => clamp((x - gx) / 330 * 5, 0, 5), Y = t => 92 + 196 - xf(t) / 50 * 196;
      return [{ id: 'B', x: gx + S.tb / 5 * 330, y: Y(S.tb), r: 16, axis: 'x', keep: true, tip: 'اسحب النقطة B', idle: 'اسحب ✋', drag: (S2, d) => { S2.anim = 0; setParam(S2, 't2', toT(d.x)); } },
        { id: 'A', x: gx + S.ta / 5 * 330, y: Y(S.ta), r: 16, axis: 'x', keep: true, hint: false, tip: 'اسحب النقطة A', drag: (S2, d) => { setParam(S2, 't1', toT(d.x)); } },
        { id: 'car', x: g.X(xf(S.tc)), y: g.ry - 4, r: 26, axis: 'x', keep: true, hint: false, tip: 'اسحب السيارة', drag: (S2, d) => { S2.run = 0; S2.tc = Math.sqrt(clamp((d.x - g.x0) / (g.x1 - g.x0) * 50, 0, 50) / 2); } }].concat(C.p, C.e); },
    readings(S) { return [rd('A: t₁ ، x₁', Q52.f(S.ta, 2) + ' s ، ' + Q52.f(xf(S.ta), 1) + ' m'), rd('B: t₂ ، x₂', Q52.f(S.tb, 2) + ' s ، ' + Q52.f(xf(S.tb), 1) + ' m'), rd('السرعة المتوسطة بين A و B', Q52.f(D.slope(S), 2) + ' m/s'), rd('السرعة الآنية عند A', Q52.f(vf(S.ta), 2) + ' m/s')]; },
    record(S) { return { t1: Q52.f(S.ta, 2), t2: Q52.f(S.tb, 2), va: Q52.f(D.slope(S), 2), vi: Q52.f(vf(S.ta), 2) }; },
    cols: [['t1', 't₁ (s)'], ['t2', 't₂ (s)'], ['va', 'v_avg (m/s)'], ['vi', 'v عند A']],
    explain(S) { return Q26.ex('كلما قرّبنا B من A دار القاطع الأحمر حتى انطبق على المماس الأخضر.', 'السرعة المتوسطة ميل القاطع Δx / Δt على فترة زمنية، وعندما تقترب الفترة من الصفر يصبح القاطع مماساً وميله هو السرعة الآنية عند تلك اللحظة.', 'عداد السيارة يقرأ الانطلاق الآني، أما الانطلاق المتوسط للرحلة فيحسب من المسافة الكلية ÷ الزمن الكلي.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — الانطلاق المتوسط والسرعة المتوسطة: الشاحنتان K و M (2-5، الشكل 7، ص 28–29) =============== */
(() => {
  const NV = 3; // valleys of the mountain road
  const D = { id: 'g11_m_trucks', page: 28, fig: 'الشكل 7',
    desc: 'الانطلاق المتوسط = المسافة الكلية المقطوعة ÷ الزمن المستغرق، وهو كمية قياسية. الشاحنة K تسلك الطريق المستقيم AB طوله 100 m والشاحنة M تسلك الطريق الجبلي طوله 130 m ، وتصلان B في الزمن نفسه 10 s. انطلاق K = 10 m/s وانطلاق M = 13 m/s ، لكن مقدار السرعة المتوسطة لكل منهما 10 m/s لأن إزاحتيهما متساويتان.',
    tags: 'الانطلاق المتوسط السرعة المتوسطة المسافة الإزاحة شاحنة K M 100m 130m 10s 13m/s 10m/s كمية قياسية',
    tools: ['شاحنتان', 'طريق مستقيم وطريق جبلي', 'عداد مسافة'],
    steps: ['اضغط «▶ انطلق»: تتحرك الشاحنتان من A وتصلان B معاً.', 'راقب الأعمدة: المسافتان مختلفتان لكن الإزاحتين متساويتان.', 'اسحب مؤشر الزمن أسفل الطريق لترى أي لحظة.', 'غيّر طول الطريق الجبلي وزمن الرحلة من اللوحة وقارن.'],
    concl: ['الانطلاق المتوسط للشاحنة K = 100 / 10 = 10 m/s.', 'الانطلاق المتوسط للشاحنة M = 130 / 10 = 13 m/s.', 'مقدار السرعة المتوسطة لكل منهما = 100 / 10 = 10 m/s.', 'على مسار مستقيم باتجاه واحد: مقدار السرعة المتوسطة = الانطلاق المتوسط.'],
    laws: ['g11_l2_savg', 'g11_l2_vavg'],
    controls: [R('LM', 'طول الطريق الجبلي', 100, 200, 130, 5, 'm'), R('T', 'زمن الرحلة', 5, 20, 10, 1, 's'), TG('disp', 'متجه الإزاحة', true, null, 'arrow')],
    setup(S) { S.tt = 0; S.run = 0; S.bars = [0, 0, 0, 0, 0, 0, 0, 0]; S._amp = null; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), ax = L + 70, bx = w - 70, y = 392; return { w, h, L, ax, bx, y, sc: (bx - ax) / 100 }; },
    amp(S, g) { // depth (px) of the valleys so that the mountain road is LM metres long
      const key = S.p.LM + '|' + g.ax + '|' + g.bx; if (S._amp && S._amp.k === key) return S._amp.a;
      const len = a => { let L = 0, px = g.ax, py = g.y; for (let i = 1; i <= 400; i++) { const u = i / 400, x = g.ax + u * (g.bx - g.ax), y = g.y + a * (1 - Math.cos(2 * Math.PI * NV * u)) / 2; L += Math.hypot(x - px, y - py); px = x; py = y; } return L / g.sc; };
      let lo = 0, hi = 400; for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if (len(m) < S.p.LM) lo = m; else hi = m; } S._amp = { k: key, a: lo }; return lo; },
    path(S, g) { const a = D.amp(S, g), P = [[g.ax, g.y]]; let L = 0; const cum = [0]; for (let i = 1; i <= 400; i++) { const u = i / 400, x = g.ax + u * (g.bx - g.ax), y = g.y + 26 + a * (1 - Math.cos(2 * Math.PI * NV * u)) / 2 - 26 * (u < .03 ? 1 - u / .03 : u > .97 ? 1 - (1 - u) / .03 : 0); L += Math.hypot(x - P[i - 1][0], y - P[i - 1][1]); P.push([x, y]); cum.push(L); } return { P, cum, L }; },
    at(pp, f) { const s = f * pp.L; let i = 1; while (i < pp.cum.length - 1 && pp.cum[i] < s) i++; const u = (s - pp.cum[i - 1]) / Math.max(1e-6, pp.cum[i] - pp.cum[i - 1]), a = pp.P[i - 1], b = pp.P[i]; return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, Math.atan2(b[1] - a[1], b[0] - a[0])]; },
    update(S, dt) { if (S.run) { S.tt += dt * S.p.T / 6; if (S.tt >= S.p.T) { S.tt = S.p.T; S.run = 0; } } S.tt = Math.min(S.tt, S.p.T);
      const f = S.tt / S.p.T, v = [100 * f, S.p.LM * f, 100 * f, 100 * f, S.tt > 0 ? 100 / S.p.T : 0, S.tt > 0 ? S.p.LM / S.p.T : 0, S.tt > 0 ? 100 / S.p.T : 0, S.tt > 0 ? 100 / S.p.T : 0]; S.bars = S.bars.map((b, i) => Q52.ease(b, v[i], dt, 8)); },
    truck(ctx, x, y, an, col, lab) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = 'rgba(15,23,42,.3)'; rr(ctx, -15, -7, 32, 16, 3); ctx.fill(); const gr = ctx.createLinearGradient(0, -8, 0, 8); gr.addColorStop(0, shade(col, 30)); gr.addColorStop(1, shade(col, -25)); ctx.fillStyle = gr; rr(ctx, -16, -8, 22, 16, 2); ctx.fill(); ctx.fillStyle = shade(col, -40); rr(ctx, 7, -7, 10, 14, 3); ctx.fill(); ctx.fillStyle = '#bae6fd'; ctx.fillRect(13, -5, 3, 10); ctx.restore(); }); Q42.T(ctx, lab, x, y - 20, { s: 11, w: 900, c: '#fff', bg: col }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), pp = D.path(S, g), f = S.tt / S.p.T; Q52.bg(ctx, w, h);
      // bars panel (top-left)
      const rows = [['المسافة', 'm', 220], ['الإزاحة', 'm', 220], ['الانطلاق المتوسط', 'm/s', 40], ['مقدار السرعة المتوسطة', 'm/s', 40]], bx0 = g.L + 168, bw = 210;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, g.L + 10, 72, bw + 182, 228, 10); ctx.fill(); ctx.stroke(); });
      rows.forEach((r, i) => { const y = 96 + i * 54; Q42.T(ctx, r[0], bx0 - 10, y + 8, { s: 11, w: 900, c: '#334155', a: 'right' });
        [[S.bars[i * 2], '#2563eb', 'K'], [S.bars[i * 2 + 1], '#dc2626', 'M']].forEach((q, j) => { const yy = y + j * 17, L = clamp(q[0] / r[2], 0, 1) * bw; K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, bx0, yy - 6, bw, 12, 4); ctx.fill(); ctx.fillStyle = q[1]; if (L > 1) { rr(ctx, bx0, yy - 6, L, 12, 4); ctx.fill(); } });
          Q42.T(ctx, q[2] + ': ' + Q52.f(q[0], 1) + ' ' + r[1], bx0 + Math.min(L, bw - 70) + 38, yy, { s: 9.5, w: 900, c: q[1] }); }); });
      // map
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.y - 50, 0, g.y + 230); gg.addColorStop(0, '#d9f99d'); gg.addColorStop(1, '#a3a37a'); ctx.fillStyle = gg; rr(ctx, g.L + 10, g.y - 52, w - g.L - 22, 238, 12); ctx.fill();
        ctx.lineCap = 'round'; ctx.lineJoin = 'round'; [[14, '#57534e'], [2, '#fde68a']].forEach((q, i) => { ctx.strokeStyle = q[1]; ctx.lineWidth = q[0]; if (i) ctx.setLineDash([8, 8]); ctx.beginPath(); pp.P.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.beginPath(); ctx.moveTo(g.ax, g.y); ctx.lineTo(g.bx, g.y); ctx.stroke(); ctx.setLineDash([]); });
        ctx.fillStyle = 'rgba(120,113,108,.5)'; for (let k = 0; k < NV; k++) { const cx = g.ax + (k + .5) / NV * (g.bx - g.ax); ctx.beginPath(); ctx.moveTo(cx - 60, g.y + 184); ctx.lineTo(cx, g.y + 60); ctx.lineTo(cx + 60, g.y + 184); ctx.fill(); } });
      Q42.T(ctx, 'طريق مستقيم 100 m', (g.ax + g.bx) / 2, g.y - 18, { s: 10.5, w: 900, c: '#1e3a8a', bg: 'rgba(255,255,255,.8)' }); Q42.T(ctx, 'طريق جبلي ' + S.p.LM + ' m', (g.ax + g.bx) / 2 + 120, g.y + 172, { s: 10.5, w: 900, c: '#7f1d1d', bg: 'rgba(255,255,255,.8)' });
      Q52.flag(ctx, g.ax, g.y - 8, 'A', '#16a34a'); Q52.flag(ctx, g.bx, g.y - 8, 'B', '#7c3aed');
      const pK = [g.ax + f * (g.bx - g.ax), g.y], pM = D.at(pp, f);
      if (S.p.disp && f > .01) { Q52.arrow(ctx, g.ax, g.y, pK[0] - g.ax, 0, 'rgba(37,99,235,.85)', '', 2.4); Q52.arrow(ctx, g.ax, g.y, pM[0] - g.ax, pM[1] - g.y, 'rgba(220,38,38,.85)', '', 2.4); }
      D.truck(ctx, pK[0], pK[1], 0, '#2563eb', 'K'); D.truck(ctx, pM[0], pM[1], pM[2], '#dc2626', 'M');
      // time scrubber
      const sy = g.h - 172, s0 = g.L + 120, s1 = w - 120; Q41.slider(ctx, s0, s1, sy, f, '', '#ea580c'); Q42.T(ctx, 't = ' + Q52.f(S.tt, 1) + ' s', s1 + 50, sy, { s: 11, w: 900, c: '#fff', bg: '#ea580c' }); Q42.T(ctx, 'الزمن', s0 - 40, sy, { s: 11, w: 900, c: '#334155' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      const T = S.p.T; Q52.card(ctx, S, [{ t: 'الشاحنة K: انطلاق ' + Q52.f(100 / T, 1) + ' m/s', c: '#2563eb', w: 900 }, { t: '100 / ' + T + ' = ' + Q52.f(100 / T, 2) + ' m/s', mono: 1, c: '#2563eb' }, { t: 'الشاحنة M: انطلاق ' + Q52.f(S.p.LM / T, 1) + ' m/s', c: '#dc2626', w: 900 }, { t: S.p.LM + ' / ' + T + ' = ' + Q52.f(S.p.LM / T, 2) + ' m/s', mono: 1, c: '#dc2626' }, { t: 'السرعة المتوسطة لكليهما ' + Q52.f(100 / T, 1) + ' m/s', c: '#7c3aed', w: 900 }, { t: 'الإزاحة نفسها AB = 100 m', c: '#64748b' }], { title: 'الانطلاق المتوسط والسرعة المتوسطة' });
      Q42.banner(ctx, w, 'اضغط «▶ انطلق» أو اسحب مؤشر الزمن', '#ea580c');
    },
    chips(S, g) { return Q52.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.tt >= S2.p.T) S2.tt = 0; S2.run = S2.run ? 0 : 1; }, S2 => { S2.tt = 0; S2.run = 0; }, { go: '▶ انطلق', bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), s0 = g.L + 120, s1 = S.W - 120;
      return [Q41.sdrag('tm', s0, s1, g.h - 172, S.tt / S.p.T, (S2, t) => { S2.run = 0; S2.tt = t * S2.p.T; }, { tip: 'اسحب لتغيير الزمن', extra: { idle: 'اسحب ✋' } })].concat(D.chips(S, g)); },
    readings(S) { const T = S.p.T; return [rd('انطلاق K المتوسط', Q52.f(100 / T, 2) + ' m/s'), rd('انطلاق M المتوسط', Q52.f(S.p.LM / T, 2) + ' m/s'), rd('مقدار السرعة المتوسطة لكليهما', Q52.f(100 / T, 2) + ' m/s'), rd('الزمن', Q52.f(S.tt, 1) + ' s')]; },
    record(S) { return { lm: S.p.LM, t: S.p.T, sk: Q52.f(100 / S.p.T, 2), sm: Q52.f(S.p.LM / S.p.T, 2), v: Q52.f(100 / S.p.T, 2) }; },
    cols: [['lm', 'طول طريق M (m)'], ['t', 'T (s)'], ['sk', 'انطلاق K'], ['sm', 'انطلاق M'], ['v', 'السرعة المتوسطة']],
    explain(S) { return Q26.ex('الشاحنتان تصلان B معاً، لكن عداد مسافة M يقرأ أكثر من عداد K.', 'الانطلاق المتوسط يعتمد على المسافة (طول المسار) فيكون للشاحنة M أكبر، أما السرعة المتوسطة فتعتمد على الإزاحة من A إلى B وهي نفسها للشاحنتين.', 'الطريق الجبلي الملتوي أطول من الطريق المستقيم، لذا تحتاج السيارة فيه انطلاقاً أكبر لتصل في الوقت نفسه.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B3 — مثال 1: سيارة تذهب إلى C ثم ترجع إلى B (الشكل 8، ص 30–31) =============== */
(() => {
  const sm = u => u - Math.sin(TAU * u) / TAU, QS = [['q1', 'الانطلاق: الفترة الأولى'], ['q2', 'السرعة: الفترة الأولى'], ['q3', 'الانطلاق: الرحلة كلها'], ['q4', 'السرعة: الرحلة كلها']];
  const D = { id: 'g11_m_ex1', page: 30, fig: 'الشكل 8 + مثال 1',
    desc: 'مثال 1: سيارة بدأت الحركة من السكون عند النقطة A بالاتجاه الموجب للمحور x فوصلت النقطة C بعد 80 s ، ثم استدارت وتحركت بالاتجاه المعاكس حتى توقفت عند B خلال 20 s. AC = 600 m و CB = 200 m. احسب الانطلاق المتوسط والسرعة المتوسطة للفترة الأولى وللرحلة كلها.',
    tags: 'مثال 1 الانطلاق المتوسط السرعة المتوسطة 7.5m/s 8m/s 4m/s 600m 200m 80s 20s ذهاب وإياب مسافة إزاحة',
    tools: ['سيارة', 'طريق مستقيم مدرج', 'ساعة توقيت', 'عداد مسافة'],
    steps: ['اضغط «▶ شغّل» وراقب السيارة تذهب إلى C ثم ترجع إلى B، ومخطط الموقع − الزمن يُرسم.', 'اختر سؤالاً من الأسئلة الأربعة ثم اضغط «الحل خطوة خطوة».', 'لاحظ أن المسافة 800 m والإزاحة 400 m للرحلة كلها.', 'غيّر المسافتين والزمنين من اللوحة لتصنع مسألة جديدة.'],
    concl: ['الانطلاق المتوسط للفترة الأولى = 600 / 80 = 7.5 m/s ، والسرعة المتوسطة نفسها 7.5 m/s لأن الحركة باتجاه واحد.', 'الانطلاق المتوسط للرحلة كلها = (600 + 200) / (80 + 20) = 8 m/s.', 'السرعة المتوسطة للرحلة كلها = (600 − 200) / 100 = 4 m/s.', 'عند تغير اتجاه الحركة يختلف الانطلاق المتوسط عن مقدار السرعة المتوسطة.'],
    laws: ['g11_l2_savg', 'g11_l2_vavg'],
    controls: [R('AC', 'المسافة AC', 100, 700, 600, 50, 'm'), R('CB', 'المسافة CB', 0, 600, 200, 50, 'm'), R('t1', 'زمن الذهاب إلى C', 20, 120, 80, 5, 's'), R('t2', 'زمن الرجوع إلى B', 5, 60, 20, 5, 's')],
    setup(S) { S.tt = 0; S.run = 0; S.q = 'q1'; S.ex = 0; S.k = 0; S.hist = [[0, 0]]; },
    P(S) { const AC = S.p.AC, CB = Math.min(S.p.CB, AC), t1 = S.p.t1, t2 = S.p.t2; return { AC, CB, t1, t2, T: t1 + t2 }; },
    x(S, t) { const p = D.P(S); if (t <= p.t1) return p.AC * sm(clamp(t / p.t1, 0, 1)); return p.AC - p.CB * sm(clamp((t - p.t1) / p.t2, 0, 1)); },
    dist(S, t) { const p = D.P(S); return t <= p.t1 ? D.x(S, t) : p.AC + (p.AC - D.x(S, t)); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 60, x1 = w - 60, xm = Math.ceil(D.P(S).AC / 100) * 100; return { w, h, L, x0, x1, xm, ry: 500, X: m => x0 + m / xm * (x1 - x0) }; },
    update(S, dt) { const p = D.P(S); if (S.run) { S.tt += dt * p.T / 8; if (S.tt >= p.T) { S.tt = p.T; S.run = 0; } const l = S.hist[S.hist.length - 1]; if (S.tt - l[0] > p.T / 200) S.hist.push([S.tt, D.x(S, S.tt)]); } },
    ex(S) { const p = D.P(S), f = v => Q52.f(v, 2).replace(/\.?0+$/, ''); return {
      q1: { q: 'احسب الانطلاق المتوسط خلال الفترة الأولى: ' + p.t1 + ' s', lines: ['من A إلى C: المسافة = ' + p.AC + ' m', 'الانطلاق = المسافة ÷ الزمن', p.AC + ' / ' + p.t1 + ' = ' + f(p.AC / p.t1) + ' m/s'] },
      q2: { q: 'احسب السرعة المتوسطة خلال الفترة الأولى: ' + p.t1 + ' s', lines: ['الإزاحة = المسافة لأن الحركة باتجاه واحد', 'Δx = ' + p.AC + ' m', 'v_avg = ' + p.AC + ' / ' + p.t1 + ' = ' + f(p.AC / p.t1) + ' m/s'] },
      q3: { q: 'احسب الانطلاق المتوسط خلال الرحلة كلها: ' + p.T + ' s', lines: ['المسافة الكلية = ' + p.AC + ' + ' + p.CB + ' = ' + (p.AC + p.CB) + ' m', 'الزمن الكلي = ' + p.t1 + ' + ' + p.t2 + ' = ' + p.T + ' s', (p.AC + p.CB) + ' / ' + p.T + ' = ' + f((p.AC + p.CB) / p.T) + ' m/s'] },
      q4: { q: 'احسب السرعة المتوسطة خلال الرحلة كلها: ' + p.T + ' s', lines: ['Δx = xf − xi = ' + p.AC + ' − ' + p.CB + ' = ' + (p.AC - p.CB) + ' m', 'Δt = ' + p.t1 + ' + ' + p.t2 + ' = ' + p.T + ' s', 'v_avg = ' + (p.AC - p.CB) + ' / ' + p.T + ' = ' + f((p.AC - p.CB) / p.T) + ' m/s'] } }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), X = g.X, p = D.P(S), x = D.x(S, S.tt), back = S.tt > p.t1, tm = Math.ceil(p.T / 20) * 20; Q52.bg(ctx, w, h);
      const A = Q52.axes(ctx, { x: g.L + 56, y: 92, w: 330, h: 190, x1: tm, y1: g.xm, xs: tm / 10, ys: g.xm / 7 > 90 ? 100 : 50, lx: tm / 5, ly: g.xm > 400 ? 200 : 100, xl: 't (s)', yl: 'x (m)' });
      const qi = S.q === 'q1' || S.q === 'q2' ? p.t1 : p.T; K.raw(ctx, () => { ctx.fillStyle = 'rgba(234,88,12,.1)'; ctx.fillRect(A.X(0), A.Y(g.xm), A.X(qi) - A.X(0), A.Y(0) - A.Y(g.xm)); });
      const C2 = []; for (let i = 0; i <= 120; i++) C2.push([A.X(p.T * i / 120), A.Y(D.x(S, p.T * i / 120))]); Q52.plot(ctx, C2, 'rgba(234,88,12,.3)', 2, [5, 4]); Q52.plot(ctx, S.hist.map(q => [A.X(q[0]), A.Y(q[1])]), '#ea580c', 3); Q41.dot(ctx, A.X(S.tt), A.Y(x), '#dc2626', 4.5);
      Q41.line(ctx, [[A.X(0), A.Y(0)], [A.X(qi), A.Y(D.x(S, qi))]], '#7c3aed', 1.8, [6, 4]);
      Q52.sky(ctx, g.L + 10, g.ry - 120, w - 12, g.ry, 0); Q52.road(ctx, g.L + 10, w - 12, g.ry, 32, 0); Q52.ruler(ctx, X, 0, g.xm, g.ry + 36, 100, { sub: 5, unit: 'm' });
      Q52.flag(ctx, X(0), g.ry - 4, 'A', '#16a34a'); Q52.flag(ctx, X(p.AC), g.ry - 4, 'C', '#7c3aed'); if (p.CB > 0) Q52.flag(ctx, X(p.AC - p.CB), g.ry - 4, 'B', '#dc2626');
      Q52.car(ctx, X(x), g.ry + 20, .62, '#f59e0b', D.dist(S, S.tt) / 3, back ? -1 : 1);
      if (x > 2) { Q52.arrow(ctx, X(0), g.ry - 74, X(x) - X(0), 0, '#dc2626', '', 2.6); Q42.T(ctx, 'الإزاحة ' + Math.round(x) + ' m', X(0) + 6, g.ry - 92, { s: 10, w: 900, c: '#dc2626', a: 'left', bg: 'rgba(255,255,255,.85)' }); }
      Q42.T(ctx, 'المسافة ' + Math.round(D.dist(S, S.tt)) + ' m', X(x), g.ry - 56, { s: 10, w: 900, c: '#fff', bg: '#ea580c' });
      Q52.watch(ctx, w - 70, g.ry - 150, 20, S.tt, 't = ' + Math.round(S.tt) + ' s', p.T);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.q); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      if (S.ex) Q52.steps(ctx, S, Object.assign({ title: 'مثال 1 ص 30' }, D.ex(S)[S.q], { k: S.k }));
      else Q52.card(ctx, S, [{ t: 'الزمن t = ' + Q52.f(S.tt, 1) + ' s', c: '#334155' }, { t: 'المسافة المقطوعة d = ' + Math.round(D.dist(S, S.tt)) + ' m', c: '#ea580c', w: 900 }, { t: 'الإزاحة = ' + Math.round(x) + ' m', c: '#dc2626', w: 900 }, { t: 'الانطلاق المتوسط للرحلة: ' + Q52.f((p.AC + p.CB) / p.T, 2) + ' m/s', c: '#334155' }, { t: 'السرعة المتوسطة للرحلة: ' + Q52.f((p.AC - p.CB) / p.T, 2) + ' m/s', c: '#334155' }], { title: 'مثال 1: من A إلى C ثم إلى B' });
      Q42.banner(ctx, w, 'شغّل الرحلة، ثم اختر سؤالاً واضغط «الحل خطوة خطوة»', '#ea580c');
    },
    chips(S, g) { return { p: Q52.play(S, 'pl', g.h - 172, S.run, S2 => { if (S2.tt >= D.P(S2).T) { S2.tt = 0; S2.hist = [[0, 0]]; } S2.run = S2.run ? 0 : 1; }, S2 => { S2.tt = 0; S2.run = 0; S2.hist = [[0, 0]]; }),
      q: Q42.chips(S, 'q', QS, g.h - 128, S.q, (S2, k) => { S2.q = k; S2.ex = 0; }, { bw: 170, col: '#ea580c' }),
      e: Q52.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, 3) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), p = D.P(S);
      return [{ id: 'car', x: g.X(D.x(S, S.tt)), y: g.ry - 6, r: 26, axis: 'x', keep: true, tip: 'اسحب لتغيير الزمن', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.tt = clamp(S2.tt + (d.dx || 0) / (g.x1 - g.x0) * p.T * .6, 0, p.T); S2.hist = S2.hist.filter(q => q[0] <= S2.tt); S2.hist.push([S2.tt, D.x(S2, S2.tt)]); } }].concat(C.p, C.q, C.e); },
    readings(S) { const p = D.P(S); return [rd('الانطلاق المتوسط للفترة الأولى', Q52.f(p.AC / p.t1, 2) + ' m/s'), rd('السرعة المتوسطة للفترة الأولى', Q52.f(p.AC / p.t1, 2) + ' m/s'), rd('الانطلاق المتوسط للرحلة', Q52.f((p.AC + p.CB) / p.T, 2) + ' m/s'), rd('السرعة المتوسطة للرحلة', Q52.f((p.AC - p.CB) / p.T, 2) + ' m/s')]; },
    explain(S) { return Q26.ex('بعد رجوع السيارة تستمر المسافة في الزيادة بينما تنقص الإزاحة.', 'الانطلاق المتوسط يقسم المسافة الكلية (800 m) على الزمن، والسرعة المتوسطة تقسم الإزاحة (400 m) على الزمن نفسه، فيكون 8 m/s مقابل 4 m/s.', 'سائق التاكسي يحاسبك على المسافة التي قطعها لا على الإزاحة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — الحركة بسرعة ثابتة والتعجيل ومعادلات الحركة (2-7، 2-8، 2-9، الأشكال 11–14، ص 32–34) =============== */
(() => {
  const TM = 45, MODES = { c: ['سرعة ثابتة', 10, 0], up: ['تسارع منتظم', 4, .6], dn: ['تباطؤ منتظم', 20, -.5] };
  const nice = (m, n = 5) => { const r = m / n, p = Math.pow(10, Math.floor(Math.log10(r))), q = r / p; return (q <= 1 ? 1 : q <= 2 ? 2 : q <= 5 ? 5 : 10) * p; };
  const D = { id: 'g11_m_const', page: 32, fig: 'الأشكال 11 و 12 و 13 و 14',
    desc: 'إذا قطع جسم إزاحات متساوية في فترات زمنية متساوية على خط مستقيم كانت سرعته ثابتة: السيارة تقطع 150 m كل 15 s أي 10 m/s ، ومخطط الإزاحة − الزمن خط مستقيم ميله السرعة، ومخطط السرعة − الزمن خط أفقي. وإذا تغيرت السرعة كان للجسم تعجيل a = Δv / Δt. وبتعجيل منتظم تنطبق معادلات الحركة: vf = vi + aΔt ، Δx = viΔt + ½a(Δt)² ، vf² = vi² + 2aΔx ، Δx = (vi + vf)Δt / 2.',
    tags: 'الحركة بسرعة ثابتة 150m 15s 10m/s مخطط x-t v-t a-t التعجيل تسارع تباطؤ معادلات الحركة بتعجيل منتظم المساحة تحت المخطط الإزاحة مخطط حركي',
    tools: ['سيارة على طريق مستقيم', 'ساعات توقيت كل 15 s', 'مخططات x−t و v−t و a−t'],
    steps: ['اختر «سرعة ثابتة» واضغط «▶ شغّل»: السيارة تقطع 150 m كل 15 s ، ومخطط x−t مستقيم ومخطط v−t أفقي.', 'اختر «تسارع» ثم «تباطؤ»: لاحظ صور السيارة كل 5 s تتباعد أو تتقارب (الشكل 14).', 'غيّر vi و a من اللوحة، واسحب السيارة على الطريق لتتحرك في الزمن.', 'قارن المساحة تحت مخطط v−t بالإزاحة، وتحقق من المعادلات الأربع في البطاقة.'],
    concl: ['بسرعة ثابتة: إزاحات متساوية في أزمنة متساوية، x−t خط مستقيم و v−t خط أفقي و a = 0.', 'التعجيل a = Δv / Δt كمية متجهة: موجب عند التسارع وسالب عند التباطؤ.', 'معادلات الحركة بتعجيل منتظم: vf = vi + aΔt ، Δx = viΔt + ½a(Δt)² ، vf² = vi² + 2aΔx.', 'المساحة تحت مخطط السرعة − الزمن تساوي الإزاحة.'],
    laws: ['g11_l2_acc', 'g11_l2_eq1', 'g11_l2_eq2', 'g11_l2_eq3'],
    controls: [R('vi', 'السرعة الابتدائية vi', 0, 30, 10, 1, 'm/s'), R('a', 'التعجيل a', -2, 2, 0, .1, 'm/s²'), TG('strobe', 'صور السيارة كل 5 s', true, null, 'camera')],
    setup(S) { S.tt = 0; S.run = 0; S.md = 'c'; S.xm = 500; S.vm = 30; },
    ts(S) { return S.p.a < 0 ? Math.min(TM, S.p.vi / -S.p.a) : TM; },
    x(S, t) { const tt = Math.min(t, D.ts(S)); return S.p.vi * tt + .5 * S.p.a * tt * tt; },
    v(S, t) { return t >= D.ts(S) && S.p.a < 0 ? 0 : S.p.vi + S.p.a * t; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 60, x1 = w - 60; return { w, h, L, x0, x1, ry: 528, X: m => x0 + m / S.xm * (x1 - x0) }; },
    update(S, dt) { if (S.run) { S.tt += dt * TM / 9; if (S.tt >= TM) { S.tt = TM; S.run = 0; } }
      const xmx = Math.max(10, D.x(S, TM)), st = nice(xmx, 4); S.xm = Q52.ease(S.xm, Math.ceil(xmx / st) * st, dt, 4); const vmx = Math.max(10, S.p.vi, S.p.vi + S.p.a * TM); S.vm = Q52.ease(S.vm, Math.ceil(vmx / 5) * 5, dt, 4); },
    tAt(S, xm) { let lo = 0, hi = D.ts(S); if (xm >= D.x(S, hi)) return hi; for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if (D.x(S, m) < xm) lo = m; else hi = m; } return lo; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), X = g.X, t = S.tt, x = D.x(S, t), v = D.v(S, t), a = t >= D.ts(S) && S.p.a < 0 ? 0 : S.p.a; Q52.bg(ctx, w, h);
      const gx = g.L + 52, gw = 310, xs = nice(S.xm, 4), vs = nice(S.vm, 3), am = 2;
      const A1 = Q52.axes(ctx, { x: gx, y: 86, w: gw, h: 56, x1: TM, y1: S.xm, xs: 5, ys: xs, lx: 15, ly: xs * 2, xl: 't (s)', yl: 'x (m)', col: '#ea580c' });
      const A2 = Q52.axes(ctx, { x: gx, y: 190, w: gw, h: 56, x1: TM, y1: S.vm, xs: 5, ys: vs, lx: 15, ly: vs, xl: 't (s)', yl: 'v (m/s)', col: '#2563eb' });
      const A3 = Q52.axes(ctx, { x: gx, y: 292, w: gw, h: 40, x1: TM, y0: -am, y1: am, xs: 5, ys: 1, lx: 15, ly: 2, xl: 't (s)', yl: 'a (m/s²)', col: '#16a34a' });
      const P1 = [], P2 = [], F1 = [], F2 = []; for (let i = 0; i <= 90; i++) { const tk = TM * i / 90; F1.push([A1.X(tk), A1.Y(D.x(S, tk))]); F2.push([A2.X(tk), A2.Y(D.v(S, tk))]); if (tk <= t + 1e-6) { P1.push(F1[i]); P2.push(F2[i]); } }
      if (P2.length > 1) K.raw(ctx, () => { ctx.fillStyle = 'rgba(37,99,235,.18)'; ctx.beginPath(); ctx.moveTo(A2.X(0), A2.Y(0)); P2.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(P2[P2.length - 1][0], A2.Y(0)); ctx.fill(); });
      Q52.plot(ctx, F1, 'rgba(234,88,12,.25)', 1.6, [4, 4]); Q52.plot(ctx, F2, 'rgba(37,99,235,.25)', 1.6, [4, 4]); Q52.plot(ctx, P1, '#ea580c', 2.6); Q52.plot(ctx, P2, '#2563eb', 2.6);
      const aT = []; for (let i = 0; i <= 90; i++) { const tk = TM * i / 90; if (tk > t + 1e-6) break; aT.push([A3.X(tk), A3.Y(tk >= D.ts(S) && S.p.a < 0 ? 0 : S.p.a)]); } Q52.plot(ctx, aT, '#16a34a', 2.6);
      Q41.dot(ctx, A1.X(t), A1.Y(x), '#ea580c', 4); Q41.dot(ctx, A2.X(t), A2.Y(v), '#2563eb', 4);
      if (t > 3) Q42.T(ctx, 'المساحة = الإزاحة', A2.X(t / 2), A2.Y(v / 3) + 2, { s: 9, w: 900, c: '#1e3a8a', bg: 'rgba(255,255,255,.8)' });
      // road scene
      Q52.sky(ctx, g.L + 10, g.ry - 150, w - 12, g.ry, 0); Q52.road(ctx, g.L + 10, w - 12, g.ry, 32, 0); Q52.ruler(ctx, X, 0, S.xm, g.ry + 36, xs, { sub: 5, unit: 'm' });
      if (S.p.strobe) for (let tk = 0; tk <= t + 1e-6; tk += 5) { const xk = X(D.x(S, tk)), vk = D.v(S, tk); Q52.car(ctx, xk, g.ry + 18, .42, '#94a3b8', 0, 1, .45); if (vk > .2) Q52.arrow(ctx, xk - 10, g.ry - 36, vk * 2.2, 0, 'rgba(37,99,235,.8)', '', 2); }
      [0, 15, 30, 45].forEach(tk => { if (tk <= t + 1e-6) { Q52.watch(ctx, X(D.x(S, tk)), g.ry - 112, 13, tk, tk + ' s', 60); } });
      Q52.car(ctx, X(x), g.ry + 18, .62, '#dc2626', x / .4); if (v > .2) Q52.arrow(ctx, X(x) - 12, g.ry - 50, v * 2.6, 0, '#2563eb', 'v', 3);
      if (Math.abs(a) > .01 && t < TM) Q52.arrow(ctx, X(x) + (a > 0 ? 30 : -30), g.ry - 74, a * 26, 0, '#16a34a', 'a', 3);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p);
      const vf2 = S.p.vi * S.p.vi + 2 * S.p.a * x;
      Q52.card(ctx, S, [{ t: 't = ' + Q52.f(t, 1) + ' s , a = ' + Q52.f(a, 1) + ' m/s²', mono: 1, c: '#334155' }, { t: 'vf = vi + a t', mono: 1, c: '#2563eb', w: 900 }, { t: '= ' + S.p.vi + ' + ' + Q52.f(S.p.a, 1) + ' × ' + Q52.f(Math.min(t, D.ts(S)), 1) + ' = ' + Q52.f(v, 1) + ' m/s', mono: 1 },
        { t: 'Δx = vi t + ½ a t²', mono: 1, c: '#ea580c', w: 900 }, { t: '= ' + Q52.f(x, 1) + ' m', mono: 1 }, { t: 'vf² = vi² + 2 a Δx', mono: 1, c: '#7c3aed', w: 900 }, { t: '= ' + Q52.f(vf2, 1) + ' → vf = ' + Q52.f(Math.sqrt(Math.max(0, vf2)), 1) + ' m/s', mono: 1 }, { t: 'Δx = (vi + vf) t / 2 = ' + Q52.f((S.p.vi + v) * Math.min(t, D.ts(S)) / 2, 1) + ' m', mono: 1, c: '#0f766e' },
        { t: Math.abs(S.p.a) < .01 ? 'سرعة ثابتة: إزاحات متساوية في أزمنة متساوية' : S.p.a > 0 ? 'تسارع: الصور تتباعد' : 'تباطؤ: الصور تتقارب', c: '#b91c1c', w: 900 }], { title: 'معادلات الحركة بتعجيل منتظم', wd: 320 });
      Q42.banner(ctx, w, 'اختر نوع الحركة واضغط «▶ شغّل»، أو اسحب السيارة', '#ea580c');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', Object.keys(MODES).map(k => [k, MODES[k][0]]), g.h - 128, S.md, (S2, k) => { S2.md = k; setParam(S2, 'vi', MODES[k][1]); setParam(S2, 'a', MODES[k][2]); S2.tt = 0; S2.run = 1; }, { bw: 170, col: '#ea580c' }),
      p: Q52.play(S, 'pl', g.h - 84, S.run, S2 => { if (S2.tt >= TM) S2.tt = 0; S2.run = S2.run ? 0 : 1; }, S2 => { S2.tt = 0; S2.run = 0; }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'car', x: g.X(D.x(S, S.tt)), y: g.ry - 4, r: 26, axis: 'x', keep: true, tip: 'اسحب السيارة', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.tt = D.tAt(S2, clamp((d.x - g.x0) / (g.x1 - g.x0), 0, 1) * S2.xm); } }].concat(C.m, C.p); },
    readings(S) { const t = S.tt; return [rd('الزمن t', Q52.f(t, 1) + ' s'), rd('الموقع x', Q52.f(D.x(S, t), 1) + ' m'), rd('السرعة v', Q52.f(D.v(S, t), 1) + ' m/s'), rd('التعجيل a', Q52.f(S.p.a, 1) + ' m/s²')]; },
    record(S) { return { t: Q52.f(S.tt, 1), x: Q52.f(D.x(S, S.tt), 1), v: Q52.f(D.v(S, S.tt), 1), a: S.p.a }; },
    cols: [['t', 't (s)'], ['x', 'x (m)'], ['v', 'v (m/s)'], ['a', 'a (m/s²)']],
    explain(S) { return Q26.ex('بسرعة ثابتة تكون صور السيارة متباعدة بمسافات متساوية، ومع التسارع تتباعد ومع التباطؤ تتقارب.', 'السرعة الثابتة تعني إزاحات متساوية في أزمنة متساوية فيكون ميل x−t ثابتاً. والتعجيل هو معدل تغير السرعة، ويساوي ميل مخطط v−t ، والمساحة تحته تساوي الإزاحة.', 'مثبت السرعة في السيارات يحافظ على سرعة ثابتة على الطريق السريع.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — مثال 2: حساب التعجيل من مخطط السرعة − الزمن (الشكل 16، ص 35) =============== */
(() => {
  const IV = [['KL', 'من K إلى L', 0, 10], ['LM', 'من L إلى M', 10, 15], ['MN', 'من M إلى N', 15, 20], ['KN', 'من K إلى N', 0, 20]], TN = ['K', 'L', 'M', 'N'], TT = [0, 10, 15, 20];
  const D = { id: 'g11_m_ex2', page: 35, fig: 'الشكل 16 + مثال 2',
    desc: 'مثال 2: سيارة سرعاتها عند النقاط vK = 20 m/s ، vL = 30 m/s ، vM = 30 m/s ، vN = 25 m/s عند الأزمنة 0 و 10 و 15 و 20 s. ميل المستقيم في مخطط السرعة − الزمن يساوي التعجيل: a(KL) = 1 m/s² ، a(LM) = 0 ، a(MN) = −1 m/s² ، a(KN) = 0.25 m/s².',
    tags: 'مثال 2 التعجيل ميل مخطط السرعة الزمن v-t 1m/s2 صفر -1m/s2 0.25m/s2 تسارع تباطؤ K L M N',
    tools: ['سيارة', 'عداد سرعة', 'مخطط السرعة − الزمن'],
    steps: ['اختر فترة من أزرار الكتاب (K L ، L M ، M N ، K N) أو اسحب النقطتين على المخطط.', 'ميل الوتر الأحمر = التعجيل المتوسط Δv / Δt بين النقطتين.', 'اضغط «▶ شغّل» لترى السيارة تمر بالنقاط K و L و M و N والعداد يتغير.', 'اضغط «الحل خطوة خطوة» لحل الفترة المختارة.'],
    concl: ['a(KL) = (30 − 20) / (10 − 0) = 1 m/s²: موجب عند التسارع.', 'a(LM) = (30 − 30) / (15 − 10) = 0: السرعة ثابتة.', 'a(MN) = (25 − 30) / (20 − 15) = −1 m/s²: سالب لأنه تباطؤ.', 'a(KN) = (25 − 20) / (20 − 0) = 0.25 m/s².'],
    laws: ['g11_l2_acc'],
    controls: [R('vK', 'السرعة عند K', 0, 40, 20, 1, 'm/s'), R('vL', 'السرعة عند L و M', 0, 40, 30, 1, 'm/s'), R('vN', 'السرعة عند N', 0, 40, 25, 1, 'm/s')],
    setup(S) { S.iv = 'KL'; S.t1 = 0; S.t2 = 10; S.d1 = 0; S.d2 = 10; S.tc = 0; S.run = 0; S.ex = 0; S.k = 0; },
    v(S, t) { const p = S.p; if (t <= 10) { const u = t / 10; return p.vK + (p.vL - p.vK) * u * u; } if (t <= 15) return p.vL; const u = clamp((t - 15) / 5, 0, 1); return p.vL + (p.vN - p.vL) * (1 - (1 - u) * (1 - u)); },
    x(S, t) { let s = 0; const n = 80; for (let i = 0; i < n; i++) s += D.v(S, (i + .5) * t / n) * t / n; return s; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 60, x1 = w - 60, xm = Math.max(100, Math.ceil(D.x(S, 20) / 100) * 100); return { w, h, L, x0, x1, xm, ry: 520, X: m => x0 + m / xm * (x1 - x0) }; },
    update(S, dt) { S.d1 = Q52.ease(S.d1, S.t1, dt, 9); S.d2 = Q52.ease(S.d2, S.t2, dt, 9); if (S.run) { S.tc += dt * 20 / 8; if (S.tc >= 20) { S.tc = 20; S.run = 0; } } },
    A(S, g) { return { x: g.L + 60, y: 92, w: 330, h: 196, x1: 20, y1: 40, xs: 1, ys: 5, lx: 5, ly: 10, xl: 't (s)', yl: 'v (m/s)', col: '#2563eb' }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), X = g.X; Q52.bg(ctx, w, h); const AA = D.A(S, g), A = Q52.axes(ctx, AA), P = t => [A.X(t), A.Y(D.v(S, t))], C2 = []; for (let i = 0; i <= 200; i++) C2.push(P(20 * i / 200));
      Q52.plot(ctx, C2, '#dc2626', 3); TT.forEach((t, i) => { Q41.line(ctx, [[A.X(t), A.Y(0)], [A.X(t), A.Y(D.v(S, t))]], 'rgba(15,23,42,.35)', 1, [3, 3]); Q42.T(ctx, TN[i], A.X(t) + 9, A.Y(D.v(S, t)) - 11, { s: 11, w: 900, c: '#0f172a' }); });
      const a1 = S.d1, a2 = S.d2, v1 = D.v(S, a1), v2 = D.v(S, a2), sl = Math.abs(a2 - a1) > .05 ? (v2 - v1) / (a2 - a1) : 0;
      Q41.line(ctx, [P(a1), P(a2)], '#7c3aed', 2.6); Q41.line(ctx, [P(a1), [A.X(a2), A.Y(v1)], P(a2)], '#0f766e', 1.5, [4, 3]);
      if (Math.abs(a2 - a1) > 1.5) Q42.T(ctx, 'Δt', (A.X(a1) + A.X(a2)) / 2, A.Y(v1) + (v2 >= v1 ? 11 : -11), { s: 10, w: 900, c: '#0f766e' }); if (Math.abs(v2 - v1) > 1.5) Q42.T(ctx, 'Δv', A.X(a2) + 14, (A.Y(v1) + A.Y(v2)) / 2, { s: 10, w: 900, c: '#0f766e' });
      Q41.knob(ctx, P(a1)[0], P(a1)[1], '#7c3aed', 8); Q41.knob(ctx, P(a2)[0], P(a2)[1], '#7c3aed', 8); if (S.tc > 0) Q41.dot(ctx, A.X(S.tc), A.Y(D.v(S, S.tc)), '#f97316', 5);
      // road
      Q52.sky(ctx, g.L + 10, g.ry - 130, w - 12, g.ry, 0); Q52.road(ctx, g.L + 10, w - 12, g.ry, 32, 0); Q52.ruler(ctx, X, 0, g.xm, g.ry + 36, g.xm > 400 ? 100 : 50, { sub: 5, unit: 'm' });
      TT.forEach((t, i) => Q52.flag(ctx, X(D.x(S, t)), g.ry - 4, TN[i] + ': ' + t + ' s', ['#16a34a', '#2563eb', '#7c3aed', '#dc2626'][i]));
      Q52.car(ctx, X(D.x(S, S.tc)), g.ry + 20, .55, '#dc2626', D.x(S, S.tc) / .35); Q52.speedo(ctx, w - 82, 372, 40, D.v(S, S.tc), 40, 'm/s', 'السرعة');
      const C = D.chips(S, g); Q42.drawChips(ctx, C.i); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      const iv = IV.find(q => q[0] === S.iv), p = S.p, vv = t => (t === 0 ? p.vK : t === 20 ? p.vN : p.vL), n1 = TN[TT.indexOf(iv[2])], n2 = TN[TT.indexOf(iv[3])], aa = (vv(iv[3]) - vv(iv[2])) / (iv[3] - iv[2]);
      const word = Math.abs(aa) < 1e-9 ? 'التعجيل صفر لأن السرعة ثابتة' : aa > 0 ? 'التعجيل موجب عند التسارع' : 'التعجيل سالب لأنه تباطؤ';
      if (S.ex) Q52.steps(ctx, S, { title: 'مثال 2 ص 35: ' + iv[1], q: 'احسب التعجيل بين النقطتين ' + n1 + ' و ' + n2 + '.', lines: ['a = Δv / Δt = (v' + n2 + ' − v' + n1 + ') / (t' + n2 + ' − t' + n1 + ')', '= (' + vv(iv[3]) + ' − ' + vv(iv[2]) + ') / (' + iv[3] + ' − ' + iv[2] + ')', 'a = ' + Q52.f(aa, 2).replace(/\.00$/, '') + ' m/s²', word], k: S.k });
      else Q52.card(ctx, S, [{ t: 't₁ = ' + Q52.f(a1, 1) + ' s , v₁ = ' + Q52.f(v1, 1) + ' m/s', mono: 1 }, { t: 't₂ = ' + Q52.f(a2, 1) + ' s , v₂ = ' + Q52.f(v2, 1) + ' m/s', mono: 1 }, { t: 'a = Δv / Δt = ' + Q52.f(sl, 2) + ' m/s²', mono: 1, c: '#7c3aed', w: 900 }, { t: Math.abs(sl) < .005 ? 'سرعة ثابتة: لا تعجيل' : sl > 0 ? 'تسارع: التعجيل موجب' : 'تباطؤ: التعجيل سالب', c: '#b91c1c', w: 900 }, { t: 'التعجيل = ميل مخطط السرعة − الزمن', c: '#64748b' }], { title: 'التعجيل من مخطط v − t' });
      Q42.banner(ctx, w, 'اختر فترة أو اسحب النقطتين البنفسجيتين على المخطط', '#ea580c');
    },
    chips(S, g) { return { i: Q42.chips(S, 'iv', IV.map(q => [q[0], q[1]]), g.h - 128, S.iv, (S2, k) => { const q = IV.find(z => z[0] === k); S2.iv = k; S2.t1 = q[2]; S2.t2 = q[3]; S2.ex = 0; }, { bw: 150, col: '#7c3aed' }),
      p: Q52.play(S, 'pl', g.h - 172, S.run, S2 => { if (S2.tc >= 20) S2.tc = 0; S2.run = S2.run ? 0 : 1; }, S2 => { S2.tc = 0; S2.run = 0; }),
      e: Q52.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { const q = IV.find(z => z[0] === S2.iv); S2.t1 = q[2]; S2.t2 = q[3]; }, 4) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), A = D.A(S, g), toT = x => Math.round(clamp((x - A.x) / A.w * 20, 0, 20) * 2) / 2, Y = t => A.y + A.h - D.v(S, t) / 40 * A.h;
      return [{ id: 'p2', x: A.x + S.d2 / 20 * A.w, y: Y(S.d2), r: 16, axis: 'x', keep: true, tip: 'اسحب النقطة', idle: 'اسحب ✋', drag: (S2, d) => { S2.t2 = toT(d.x); S2.ex = 0; } },
        { id: 'p1', x: A.x + S.d1 / 20 * A.w, y: Y(S.d1), r: 16, axis: 'x', keep: true, hint: false, tip: 'اسحب النقطة', drag: (S2, d) => { S2.t1 = toT(d.x); S2.ex = 0; } }].concat(C.i, C.p, C.e); },
    readings(S) { const v1 = D.v(S, S.t1), v2 = D.v(S, S.t2), dt = S.t2 - S.t1; return [rd('t₁ ، v₁', S.t1 + ' s ، ' + Q52.f(v1, 1) + ' m/s'), rd('t₂ ، v₂', S.t2 + ' s ، ' + Q52.f(v2, 1) + ' m/s'), rd('التعجيل المتوسط', (Math.abs(dt) > .01 ? Q52.f((v2 - v1) / dt, 2) : '—') + ' m/s²'), rd('السرعة الآن', Q52.f(D.v(S, S.tc), 1) + ' m/s')]; },
    record(S) { const v1 = D.v(S, S.t1), v2 = D.v(S, S.t2); return { t: S.t1 + '→' + S.t2, a: Math.abs(S.t2 - S.t1) > .01 ? Q52.f((v2 - v1) / (S.t2 - S.t1), 2) : '—' }; },
    cols: [['t', 'الفترة (s)'], ['a', 'a (m/s²)']],
    explain(S) { return Q26.ex('الوتر بين النقطتين يميل للأعلى في التسارع ويكون أفقياً عند ثبوت السرعة ويميل للأسفل في التباطؤ.', 'التعجيل المتوسط = التغير في السرعة ÷ الزمن، وهو ميل الوتر في مخطط السرعة − الزمن. إشارته تبين هل تزداد السرعة أم تقل.', 'عند الضغط على دواسة الوقود تتسارع السيارة، وعند الكبح تتباطأ بتعجيل سالب.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C3 — التعجيل الخطي والتعجيل المركزي: المنعطف (الشكل 15، س5 ص 49) =============== */
(() => {
  const CS = [['st', 'طريق مستقيم'], ['acc', 'تسارع على مستقيم'], ['cur', 'منعطف دائري'], ['u', 'انعطاف ورجوع']], PXM = 2;
  const D = { id: 'g11_m_turn', page: 33, fig: 'الشكل 15 + س5 ص 49',
    desc: 'يحصل التعجيل من تغير مقدار السرعة (تعجيل خطي) أو من تغير اتجاهها. المركبة التي تسير على منعطف أفقي بانطلاق ثابت تتغير سرعتها في الاتجاه فيكون لها تعجيل يسمى التعجيل المركزي ac ، متجه نحو مركز المنعطف.',
    tags: 'التعجيل المركزي ac التعجيل الخطي منعطف أفقي انطلاق ثابت تغير الاتجاه دراجة س5 Δv سباق',
    tools: ['دراجة أو سيارة سباق', 'طريق مستقيم ومنعطف', 'متجها السرعة والتعجيل'],
    steps: ['اختر «طريق مستقيم»: انطلاق ثابت واتجاه ثابت، لا تعجيل.', 'اختر «تسارع على مستقيم»: يتغير المقدار فيظهر تعجيل خطي باتجاه الحركة.', 'اختر «منعطف دائري»: الانطلاق ثابت لكن الاتجاه يتغير، فيظهر تعجيل مركزي نحو المركز.', 'راقب لوحة Δv في الأعلى، واسحب المقبض الأزرق لتغيير نصف قطر المنعطف.'],
    concl: ['التعجيل ينتج من تغير مقدار السرعة أو اتجاهها أو كليهما.', 'على طريق مستقيم بانطلاق ثابت: لا تعجيل.', 'على منعطف أفقي بانطلاق ثابت: تعجيل مركزي نحو مركز المنعطف.', 'س5: الدراجة التي تنعطف ثم تعود بالاتجاه المعاكس تمتلك تعجيلاً مركزياً أثناء الانعطاف فقط.'],
    laws: ['g11_l2_acc'],
    controls: [R('v', 'الانطلاق', 4, 20, 10, 1, 'm/s'), R('r', 'نصف قطر المنعطف', 20, 60, 35, 5, 'm'), TG('vec', 'متجها السرعة والتعجيل', true, null, 'arrow')],
    setup(S) { S.cs = 'cur'; S.s = 0; S.va = 4; S.hist = []; S.clk = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 24, x1: w - 24, cy: 478, cx: (L + 24 + w - 24) / 2 }; },
    speed(S) { return S.cs === 'acc' ? S.va : S.p.v; },
    pose(S, g, s) { // position (px), heading, curvature sign info
      const r = S.p.r * PXM, W = g.x1 - g.x0 - 40;
      if (S.cs === 'st' || S.cs === 'acc') { const u = Q52.md(s * PXM, W); return { x: g.x0 + 20 + u, y: g.cy, h: 0, k: 0 }; }
      if (S.cs === 'cur') { const th = s / S.p.r; return { x: g.cx + r * Math.sin(th), y: g.cy + r * Math.cos(th) * -1 * -1, h: Math.PI / 2 + th - Math.PI / 2 + 0, k: 1, c: [g.cx, g.cy], th }; }
      const Ls = Math.max(40, (W - 2 * r - 20) / PXM), per = 2 * Ls + 2 * Math.PI * S.p.r, q = Q52.md(s, per), xl = g.cx - Ls * PXM / 2, xr = g.cx + Ls * PXM / 2;
      if (q < Ls) return { x: xl + q * PXM, y: g.cy + r, h: 0, k: 0 };
      if (q < Ls + Math.PI * S.p.r) { const a = (q - Ls) / S.p.r; return { x: xr + r * Math.sin(a), y: g.cy + r * Math.cos(a), h: -a, k: 1, c: [xr, g.cy] }; }
      if (q < 2 * Ls + Math.PI * S.p.r) return { x: xr - (q - Ls - Math.PI * S.p.r) * PXM, y: g.cy - r, h: Math.PI, k: 0 };
      const a = (q - 2 * Ls - Math.PI * S.p.r) / S.p.r; return { x: xl - r * Math.sin(a), y: g.cy - r * Math.cos(a), h: Math.PI - a, k: 1, c: [xl, g.cy] }; },
    update(S, dt) { if (!S.W) return; S.clk += dt; if (S.cs === 'acc') { S.va += 3 * dt; if (S.va > 20) S.va = 4; } S.s += D.speed(S) * dt;
      const g = D.geo(S), P = D.pose(S, g, S.s), v = D.speed(S); S.hist.push([S.clk, v * Math.cos(P.h), v * Math.sin(P.h)]); while (S.hist.length && S.clk - S.hist[0][0] > 1.5) S.hist.shift(); },
    car(ctx, x, y, an) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = 'rgba(15,23,42,.3)'; rr(ctx, -17, -9, 36, 20, 6); ctx.fill(); const gr = ctx.createLinearGradient(0, -9, 0, 9); gr.addColorStop(0, '#f87171'); gr.addColorStop(.5, '#dc2626'); gr.addColorStop(1, '#7f1d1d'); ctx.fillStyle = gr; rr(ctx, -18, -9, 36, 18, 7); ctx.fill(); ctx.fillStyle = '#bae6fd'; rr(ctx, 2, -7, 8, 14, 3); ctx.fill(); ctx.fillStyle = '#0f172a'; [[-12, -11], [10, -11], [-12, 9], [10, 9]].forEach(p => ctx.fillRect(p[0], p[1], 7, 3)); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.pose(S, g, S.s), v = D.speed(S), r = S.p.r * PXM; Q52.bg(ctx, w, h);
      // track (top view)
      K.raw(ctx, () => { ctx.fillStyle = '#bbf7d0'; rr(ctx, g.x0, g.cy - 150, g.x1 - g.x0, 300, 14); ctx.fill(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        const path = () => { ctx.beginPath(); if (S.cs === 'st' || S.cs === 'acc') { ctx.moveTo(g.x0 + 10, g.cy); ctx.lineTo(g.x1 - 10, g.cy); } else if (S.cs === 'cur') ctx.arc(g.cx, g.cy, r, 0, TAU); else { const W = g.x1 - g.x0 - 40, Ls = Math.max(40, (W - 2 * r - 20) / PXM) * PXM, xl = g.cx - Ls / 2, xr = g.cx + Ls / 2; ctx.moveTo(xl, g.cy + r); ctx.lineTo(xr, g.cy + r); ctx.arc(xr, g.cy, r, Math.PI / 2, -Math.PI / 2, true); ctx.lineTo(xl, g.cy - r); ctx.arc(xl, g.cy, r, -Math.PI / 2, Math.PI / 2, true); } };
        ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 34; ctx.setLineDash([10, 10]); path(); ctx.stroke(); ctx.setLineDash([]); ctx.strokeStyle = '#52525b'; ctx.lineWidth = 28; path(); ctx.stroke(); ctx.strokeStyle = '#fafafa'; ctx.lineWidth = 2; ctx.setLineDash([10, 10]); path(); ctx.stroke(); ctx.setLineDash([]); });
      if (P.c) { Q41.dot(ctx, P.c[0], P.c[1], '#0f172a', 4); Q41.line(ctx, [[P.c[0], P.c[1]], [P.x, P.y]], 'rgba(15,23,42,.35)', 1.2, [4, 4]); Q42.T(ctx, 'المركز', P.c[0], P.c[1] - 14, { s: 9.5, w: 900, c: '#0f172a' }); }
      if (S.cs === 'cur') Q41.knob(ctx, g.cx + r, g.cy, '#2563eb', 9);
      D.car(ctx, P.x, P.y, P.h);
      const ac = P.k ? v * v / S.p.r : 0, at = S.cs === 'acc' ? 3 : 0;
      if (S.p.vec) { Q52.arrow(ctx, P.x, P.y, Math.cos(P.h) * v * 4.2, Math.sin(P.h) * v * 4.2, '#16a34a', 'v', 3); if (ac > .05) Q52.arrow(ctx, P.x, P.y, (P.c[0] - P.x) / r * Math.min(70, ac * 9), (P.c[1] - P.y) / r * Math.min(70, ac * 9), '#dc2626', 'ac', 3); if (at) Q52.arrow(ctx, P.x + 22, P.y + 18, at * 12, 0, '#f59e0b', 'a', 3); }
      // Δv panel
      const px = g.L + 30, py = 82, pw = 230, ph = 220, ox = px + pw / 2, oy = py + ph / 2 + 10, o = S.hist[0], n = S.hist[S.hist.length - 1];
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.94)'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, px, py, pw, ph, 10); ctx.fill(); ctx.stroke(); });
      Q42.T(ctx, 'السرعة الآن وقبل 1.5 s', ox, py + 16, { s: 10.5, w: 900, c: '#334155' });
      if (o && n) { const k = 6.5; Q52.arrow(ctx, ox, oy, o[1] * k, o[2] * k, 'rgba(22,163,74,.45)', 'v₁', 2.6); Q52.arrow(ctx, ox, oy, n[1] * k, n[2] * k, '#16a34a', 'v₂', 3); const dvx = n[1] - o[1], dvy = n[2] - o[2]; if (Math.hypot(dvx, dvy) > .3) Q52.arrow(ctx, ox + o[1] * k, oy + o[2] * k, dvx * k, dvy * k, '#dc2626', 'Δv', 2.6); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      const ang = !!P.k, spd = S.cs === 'acc';
      Q52.card(ctx, S, [{ t: 'الانطلاق: ' + Q52.f(v, 1) + ' m/s ' + (spd ? 'يتزايد' : 'ثابت'), c: '#334155', w: 800 }, { t: 'اتجاه السرعة: ' + (ang ? 'يتغير' : 'ثابت'), c: '#334155', w: 800 }, { t: 'التعجيل الخطي: ' + (spd ? 'موجود باتجاه الحركة' : 'لا يوجد'), c: spd ? '#d97706' : '#64748b', w: 900 }, { t: 'التعجيل المركزي: ' + (ang ? 'نحو المركز' : 'لا يوجد'), c: ang ? '#dc2626' : '#64748b', w: 900 }, ang ? { t: 'ac = v² / r = ' + Q52.f(ac, 2) + ' m/s²', mono: 1, c: '#dc2626' } : { t: !spd ? 'لا تعجيل: السرعة ثابتة مقداراً واتجاهاً' : 'a = Δv / Δt = 3 m/s²', c: '#16a34a', w: 800 }], { title: 'هل يوجد تعجيل؟' });
      Q42.banner(ctx, w, 'اختر نوع المسار، وراقب متجه التغير في السرعة Δv', '#ea580c');
    },
    chips(S, g) { return Q42.chips(S, 'cs', CS, g.h - 84, S.cs, (S2, k) => { S2.cs = k; S2.s = 0; S2.va = 4; S2.hist = []; }, { bw: 160, col: '#ea580c' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), out = [];
      if (S.cs === 'cur') out.push({ id: 'rad', x: g.cx + S.p.r * PXM, y: g.cy, r: 16, axis: 'x', keep: true, tip: 'اسحب لتغيير نصف القطر', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'r', clamp(Math.round((d.x - g.cx) / PXM / 5) * 5, 20, 60)) });
      const P = D.pose(S, g, S.s); out.push({ id: 'veh', x: P.x, y: P.y, r: 22, axis: 'none', hint: false, tip: 'اضغط لتغيير المسار', click: S2 => { const i = CS.findIndex(q => q[0] === S2.cs); S2.cs = CS[(i + 1) % CS.length][0]; S2.s = 0; S2.va = 4; S2.hist = []; } });
      return out.concat(D.chips(S, g)); },
    readings(S) { const g = S.W ? D.geo(S) : null, P = g ? D.pose(S, g, S.s) : { k: 0 }, v = D.speed(S); return [rd('الانطلاق', Q52.f(v, 1) + ' m/s'), rd('التعجيل الخطي', S.cs === 'acc' ? '3 m/s²' : '0'), rd('التعجيل المركزي', P.k ? Q52.f(v * v / S.p.r, 2) + ' m/s²' : '0')]; },
    explain(S) { return Q26.ex('على المنعطف يبقى عداد السرعة ثابتاً لكن سهم السرعة يدور، ويظهر سهم أحمر نحو المركز.', 'التعجيل هو التغير في السرعة ÷ الزمن، والسرعة متجه: تغير اتجاهها وحده يعني وجود تعجيل. عند الانعطاف يتجه التغير Δv نحو مركز المنعطف فيسمى تعجيلاً مركزياً.', 'تشعر بأنك تندفع نحو جانب السيارة عند المنعطفات حتى لو لم تتغير قراءة العداد.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — تعجيل الجاذبية: برج بيزا والأنبوب المفرغ (2-10، الأشكال 17 و 18 و 20، ص 36–37) =============== */
(() => {
  const MODES = { pisa: ['برج بيزا: حجر وريشة', [['حجر', '#78716c', .002, 9], ['ريشة', '#f8fafc', 2.2, 0]]], balls: ['كرتان: الوزن ضعف الآخر', [['كرة 2 kg', '#475569', .0025, 10], ['كرة 1 kg', '#f97316', .005, 10]]], tube: ['الأنبوب: تفاحة وريشة', [['تفاحة', '#dc2626', .01, 9], ['ريشة', '#f8fafc', 60, 0]]] };
  const TUBE = 1.2, SLOW = 4;
  const D = { id: 'g11_m_galileo', page: 36, fig: 'الأشكال 17 و 18 و 20',
    desc: 'أي الكرتين تسقط أسرع: الثقيلة أم الخفيفة؟ اعتقد أرسطو أن الثقيلة أسرع، وفي القرن السادس عشر أسقط غاليلو حجراً وريشة من برج بيزا المائل فوصل الحجر أولاً بسبب احتكاك الريشة بالهواء. أما الأجسام المتساوية الحجم المختلفة الوزن فتصل معاً، وفي الأنبوب المفرغ تسقط التفاحة والريشة معاً. جميع الأجسام تسقط بتعجيل الجاذبية نفسه g ≈ 9.8 m/s² بإهمال مقاومة الهواء.',
    tags: 'تعجيل الجاذبية g 9.8 9.81 أرسطو غاليلو برج بيزا المائل ريشة حجر تفاحة أنبوب مفرغ مقاومة الهواء السقوط الحر صور ومضية',
    tools: ['برج بيزا المائل', 'حجر وريشة', 'كرتان متساويتان حجماً', 'أنبوب زجاجي ومضخة تفريغ'],
    steps: ['اختر «برج بيزا» واضغط «⬇ أفلت»: الحجر يصل قبل الريشة بسبب مقاومة الهواء.', 'اختر «كرتان»: الكرتان المتساويتان حجماً تصلان معاً تقريباً رغم أن وزن إحداهما ضعف الأخرى.', 'اختر «الأنبوب» وأطفئ «مقاومة الهواء» (فرّغ الأنبوب): التفاحة والريشة تسقطان معاً.', 'اسحب اليد للأعلى أو للأسفل لتغيير ارتفاع الإسقاط، وراقب الصور الومضية.'],
    concl: ['بإهمال مقاومة الهواء تسقط جميع الأجسام من الارتفاع نفسه بالتعجيل نفسه وتصل معاً.', 'الريشة تتأخر في الهواء بسبب مقاومة الهواء لا بسبب خفة وزنها.', 'تعجيل الجاذبية الأرضية قرب سطح الأرض g ≈ 9.8 m/s² ≈ 10 m/s² نحو الأسفل.', 'الصور الومضية للجسم الساقط تتباعد لأن سرعته تزداد بانتظام (الشكل 20).'],
    laws: ['g11_l2_fall'],
    controls: [R('H', 'ارتفاع الإسقاط من البرج', 10, 55, 45, 5, 'm'), TG('air', 'مقاومة الهواء', true, null, 'wind'), TG('strobe', 'صور ومضية', true, null, 'camera')],
    setup(S) { S.md = 'pisa'; D.reset(S); },
    reset(S) { S.run = 0; S.tt = 0; S.ob = [0, 1].map(() => ({ y: 0, v: 0, land: null, tr: [] })); S.tk = 0; },
    Hm(S) { return S.md === 'tube' ? TUBE : S.p.H; },
    update(S, dt) { if (!S.run) return; const sd = S.md === 'tube' ? dt / SLOW : dt, H = D.Hm(S), O = MODES[S.md][1]; S.tt += sd; S.tk += sd;
      const per = S.md === 'tube' ? .05 : .3, snap = S.tk >= per; if (snap) S.tk = 0;
      S.ob.forEach((o, i) => { if (o.land != null) return; const kk = S.p.air ? O[i][2] : 0, n = 6, h = sd / n; for (let k = 0; k < n; k++) { o.v += (9.8 - kk * o.v * o.v) * h; o.y += o.v * h; } if (o.y >= H) { o.y = H; o.land = S.tt; } if (snap) o.tr.push(o.y); });
      if (S.ob.every(o => o.land != null)) S.run = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), gy = h - 180; return { w, h, L, gy, tx: L + 150, pm: (gy - 150) / 55 }; },
    pisa(ctx, x, gy, H, pm) { const top = gy - H * pm - 14, tw = 92; K.raw(ctx, () => { ctx.save(); ctx.translate(x, gy); ctx.rotate(-.06); const hh = gy - top, n = 7;
      for (let i = 0; i < n; i++) { const y0 = -hh * (i + 1) / n, y1 = -hh * i / n, wd = i === n - 1 ? tw * .72 : tw; const g = ctx.createLinearGradient(-wd / 2, 0, wd / 2, 0); g.addColorStop(0, '#d6d3d1'); g.addColorStop(.45, '#fafaf9'); g.addColorStop(1, '#a8a29e'); ctx.fillStyle = g; ctx.fillRect(-wd / 2, y0, wd, y1 - y0); ctx.fillStyle = 'rgba(87,83,78,.45)';
        const na = 5; for (let k = 0; k < na; k++) { const ax = -wd / 2 + (k + .5) * wd / na; ctx.beginPath(); ctx.moveTo(ax - 5, y1 - 4); ctx.lineTo(ax - 5, y0 + 10); ctx.arc(ax, y0 + 10, 5, Math.PI, 0); ctx.lineTo(ax + 5, y1 - 4); ctx.fill(); } ctx.fillStyle = '#e7e5e4'; ctx.fillRect(-wd / 2 - 4, y0 - 2, wd + 8, 4); }
      ctx.restore(); }); return top; },
    feather(ctx, x, y, s = 1, a = 1) { K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.rotate(.5); ctx.fillStyle = '#f1f5f9'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(0, 0, 5 * s, 14 * s, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -14 * s); ctx.lineTo(0, 18 * s); ctx.stroke(); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), O = MODES[S.md][1], tube = S.md === 'tube'; Q52.bg(ctx, w, h);
      K.raw(ctx, () => { const sg = ctx.createLinearGradient(0, 60, 0, g.gy); sg.addColorStop(0, '#bfdbfe'); sg.addColorStop(1, '#f0f9ff'); ctx.fillStyle = sg; rr(ctx, g.L + 10, 60, 430, g.gy - 60, 12); ctx.fill(); ctx.fillStyle = '#86efac'; ctx.fillRect(g.L + 10, g.gy, 430, 14); ctx.fillStyle = '#a16207'; ctx.fillRect(g.L + 10, g.gy + 14, 430, 6); });
      let x0, top, pm, H = D.Hm(S);
      if (!tube) { pm = g.pm; top = D.pisa(ctx, g.tx, g.gy, H, pm); x0 = g.tx + 70; Q52.runner(ctx, g.tx - (g.gy - top) * Math.sin(.06) + 18, top + 2 - (g.gy - top) * (1 - Math.cos(.06)), 30, 0, 1, '#7c3aed', false); K.raw(ctx, () => { ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(x0 + 20, top - 8, 7, 0, TAU); ctx.fill(); }); Q42.T(ctx, 'H = ' + H + ' m', g.tx - 70, (top + g.gy) / 2, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' }); Q41.line(ctx, [[g.tx - 70, top], [g.tx - 70, g.gy]], '#7c3aed', 1.5, [4, 3]); }
      else { const tx = g.tx + 70, t0 = 110, t1 = g.gy - 30; pm = (t1 - t0 - 40) / TUBE; top = t0 + 20; x0 = tx - 28;
        K.raw(ctx, () => { const gl = ctx.createLinearGradient(tx - 70, 0, tx + 70, 0); gl.addColorStop(0, 'rgba(186,230,253,.55)'); gl.addColorStop(.3, 'rgba(255,255,255,.25)'); gl.addColorStop(.7, 'rgba(255,255,255,.12)'); gl.addColorStop(1, 'rgba(125,211,252,.5)'); ctx.fillStyle = gl; rr(ctx, tx - 70, t0, 140, t1 - t0, 26); ctx.fill(); ctx.strokeStyle = 'rgba(14,116,144,.7)'; ctx.lineWidth = 3; ctx.stroke();
          if (S.p.air) { ctx.fillStyle = 'rgba(148,163,184,.18)'; rr(ctx, tx - 66, t0 + 4, 132, t1 - t0 - 8, 22); ctx.fill(); ctx.fillStyle = 'rgba(100,116,139,.35)'; for (let k = 0; k < 40; k++) { ctx.beginPath(); ctx.arc(tx - 58 + (k * 37) % 116, t0 + 14 + (k * 61) % (t1 - t0 - 28), 1.6, 0, TAU); ctx.fill(); } }
          ctx.fillStyle = '#334155'; rr(ctx, tx - 78, t0 - 12, 156, 14, 4); ctx.fill(); rr(ctx, tx - 78, t1 - 2, 156, 14, 4); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(tx + 60, t1 + 12); ctx.quadraticCurveTo(tx + 120, t1 + 40, tx + 170, t1 + 8); ctx.stroke();
          ctx.fillStyle = '#1e40af'; rr(ctx, tx + 160, t1 - 40, 54, 48, 8); ctx.fill(); ctx.fillStyle = '#93c5fd'; rr(ctx, tx + 168, t1 - 32, 38, 14, 3); ctx.fill(); });
        Q42.T(ctx, S.p.air ? 'فيه هواء' : 'مفرغ من الهواء', tx + 187, t1 - 54, { s: 10.5, w: 900, c: '#fff', bg: S.p.air ? '#64748b' : '#16a34a' }); Q42.T(ctx, 'حركة بطيئة ×4', tx, t0 - 26, { s: 10, w: 900, c: '#fff', bg: '#0e7490' }); }
      const Y = m => top + m * pm, sp = tube ? 56 : 52;
      S.ob.forEach((o, i) => { const x = x0 + 20 + i * sp, q = O[i]; if (S.p.strobe) o.tr.forEach((yy, k) => { if (q[3]) { K.raw(ctx, () => { ctx.globalAlpha = .3; }); Q52.ball(ctx, x, Y(yy), q[3], q[1]); K.raw(ctx, () => { ctx.globalAlpha = 1; }); } else D.feather(ctx, x, Y(yy), .8, .35); });
        if (q[3]) Q52.ball(ctx, x, Y(o.y), q[3] + (i === 0 && S.md === 'pisa' ? 0 : 0), q[1]); else D.feather(ctx, x, Y(o.y), 1);
        Q42.T(ctx, q[0], x, top - 30 - i * 18, { s: 10, w: 900, c: '#fff', bg: i ? '#ea580c' : '#334155' });
        if (o.land != null) Q42.T(ctx, Q52.f(o.land, 2) + ' s', x, g.gy + 32 + i * 0, { s: 10, w: 900, c: '#fff', bg: '#16a34a' }); });
      // hand (drag to set height)
      if (!tube) { const hy = top - 8; Q41.knob(ctx, x0 + 20, hy, '#7c3aed', 6); }
      // v-t graph of both objects
      const A = Q52.axes(ctx, { x: g.L + 520 - 40, y: 350, w: 250, h: 150, x1: tube ? .6 : 6, y1: tube ? 6 : 40, xs: tube ? .1 : 1, ys: tube ? 1 : 5, lx: tube ? .2 : 2, ly: tube ? 2 : 10, xl: 't (s)', yl: 'v (m/s)', col: '#2563eb' });
      const g98 = []; for (let t = 0; t <= (tube ? .6 : 6) + 1e-9; t += .05) g98.push([A.X(t), A.Y(9.8 * t)]); Q52.plot(ctx, g98.filter(p => p[1] >= A.Y(tube ? 6 : 40)), 'rgba(15,23,42,.25)', 1.4, [4, 4]);
      S.ob.forEach((o, i) => { const tn = o.land != null ? o.land : S.tt; if (tn > 0) Q41.dot(ctx, A.X(Math.min(tn, tube ? .6 : 6)), A.Y(Math.min(o.v, tube ? 6 : 40)), i ? '#ea580c' : '#334155', 5); });
      Q42.T(ctx, 'الخط المتقطع: سقوط حر v = g t', A.X(tube ? .3 : 3), 350 + 150 + 26, { s: 9.5, w: 800, c: '#475569' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p);
      Q52.card(ctx, S, [{ t: (S.p.air ? 'مع مقاومة الهواء' : 'بإهمال مقاومة الهواء'), c: S.p.air ? '#64748b' : '#16a34a', w: 900 }].concat(S.ob.map((o, i) => ({ t: O[i][0] + ': ' + (o.land != null ? 'وصل بعد ' + Q52.f(o.land, 2) + ' s' : 'v = ' + Q52.f(o.v, 1) + ' m/s'), c: i ? '#ea580c' : '#334155', w: 800 }))).concat([{ t: S.p.air ? (S.md === 'balls' ? 'الفرق صغير جداً: يصلان معاً تقريباً' : 'الريشة تتأخر بسبب مقاومة الهواء') : 'يسقطان معاً بتعجيل g', c: '#b91c1c', w: 900 }, { t: 'g = 9.8 m/s² ≈ 10 m/s²', mono: 1, c: '#0f766e' }]), { title: MODES[S.md][0] });
      Q42.banner(ctx, w, 'اختر التجربة واضغط «⬇ أفلت»، ثم أطفئ مقاومة الهواء', '#ea580c');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', Object.keys(MODES).map(k => [k, MODES[k][0]]), g.h - 128, S.md, (S2, k) => { S2.md = k; D.reset(S2); }, { bw: 200, col: '#ea580c' }),
      p: Q52.play(S, 'pl', g.h - 84, 0, S2 => { D.reset(S2); S2.run = 1; }, S2 => D.reset(S2), { go: '⬇ أفلت' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), out = [];
      if (S.md !== 'tube') { const top = g.gy - S.p.H * g.pm - 14; out.push({ id: 'hand', x: g.tx + 90, y: top - 8, r: 18, axis: 'y', keep: true, tip: 'اسحب لتغيير الارتفاع', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'H', clamp(Math.round((g.gy - 14 - d.y) / g.pm / 5) * 5, 10, 55)); D.reset(S2); } }); }
      else out.push({ id: 'pump', x: g.tx + 257, y: g.gy - 46, w: 60, h: 52, axis: 'none', tip: 'اضغط لتفريغ الأنبوب أو إدخال الهواء', idle: 'اضغط 👆', click: S2 => { setParam(S2, 'air', !S2.p.air); D.reset(S2); } });
      return out.concat(C.m, C.p); },
    readings(S) { const O = MODES[S.md][1]; return [rd('مقاومة الهواء', S.p.air ? 'موجودة' : 'مهملة')].concat(S.ob.map((o, i) => rd('زمن وصول ' + O[i][0], o.land != null ? Q52.f(o.land, 2) + ' s' : '—'))); },
    record(S) { const O = MODES[S.md][1]; return { m: MODES[S.md][0], air: S.p.air ? 'نعم' : 'لا', a: S.ob[0].land != null ? Q52.f(S.ob[0].land, 2) : '—', b: S.ob[1].land != null ? Q52.f(S.ob[1].land, 2) : '—' }; },
    cols: [['m', 'التجربة'], ['air', 'هواء'], ['a', 'زمن الأول (s)'], ['b', 'زمن الثاني (s)']],
    explain(S) { return Q26.ex('في الهواء تتأخر الريشة كثيراً، وفي الأنبوب المفرغ تسقط مع التفاحة جنباً إلى جنب.', 'قوة الجاذبية تعطي كل الأجسام التعجيل نفسه g. مقاومة الهواء هي التي تبطئ الأجسام الخفيفة ذات السطح الكبير كالريشة، فإذا أزلنا الهواء سقطت كل الأجسام معاً.', 'المظلي يفتح مظلته ليزيد مقاومة الهواء فيهبط ببطء (الشكل 19).'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — معادلات السقوط الحر: مثال 3 ومثال 4 (2-11، الأشكال 21 و 22، ص 37–40) =============== */
(() => {
  const EX = { f: { t: 'مثال 3 ص 38', q: 'سقطت كرة سقوطاً حراً من سطح بناية فوصلت سطح الأرض بعد 3 s. احسب ارتفاع البناية، وسرعة الكرة لحظة اصطدامها، وسرعتها وارتفاعها بعد 1 s. خذ g = −10 m/s²', lines: ['y = ½ g t² = ½ (−10)(3)²', 'y = −45 m ⟸ h = 45 m', 'vf = vi + g t = 0 + (−10)(3)', 'vf = −30 m/s', 'الإشارة السالبة: السرعة نحو الأسفل', 'بعد 1 s: vf = 0 + (−10)(1) = −10 m/s', 'y = ½ (−10)(1)² = −5 m', 'الارتفاع بعد 1 s: 45 − 5 = 40 m'] },
    u: { t: 'مثال 4 ص 39', q: 'من نقطة على سطح الأرض قذفت كرة بانطلاق 40 m/s شاقولياً نحو الأعلى. احسب أعلى ارتفاع، وزمن الصعود، وسرعتها وارتفاعها عند t = 2 s ، وسرعتها لحظة اصطدامها بالأرض.', lines: ['vf² = vi² + 2 g Δy ⟸ 0 = 40² + 2 (−10) h', 'h = 80 m', 'vf = vi + g t ⟸ 0 = 40 + (−10) t₁', 't₁ = 4 s', 'عند 2 s: vf = 40 + (−10)(2) = 20 m/s', 'Δy = 40 × 2 + ½ (−10)(2)² = 60 m', '80 = ½ (10) t₂² ⟸ t₂ = 4 s', 'الزمن الكلي 8 s', 'vf = 40 + (−10)(8) = −40 m/s'] } };
  const D = { id: 'g11_m_fall', page: 37, fig: 'الأشكال 21 و 22 + المثالان 3 و 4',
    desc: 'معادلات الحركة في السقوط الحر نحصل عليها بالتعويض عن vi = 0 وعن a بتعجيل الجاذبية g = −10 m/s²: vf = g t ، Δy = ½ g t² ، v = √(2 g y). والجسم المقذوف شاقولياً نحو الأعلى يتباطأ بانتظام حتى تصبح سرعته صفراً في أعلى نقطة ثم يسقط سقوطاً حراً، وزمن صعوده يساوي زمن نزوله.',
    tags: 'السقوط الحر معادلات vf=gt Δy=½gt² v=√2gy مثال 3 بناية 45m 3s -30m/s مثال 4 قذف للأعلى 40m/s 80m 4s 60m 20m/s -40m/s صور ومضية',
    tools: ['بناية', 'كرة', 'مسطرة شاقولية', 'كاميرا ومضية'],
    steps: ['اختر «مثال 3» واضغط «⬇ أفلت»: الكرة تسقط من 45 m وتصل الأرض بعد 3 s.', 'اختر «مثال 4» واضغط «⬆ اقذف»: الكرة تصعد 80 m في 4 s ثم تنزل في 4 s أخرى.', 'اسحب الكرة (أو سهم القذف) لتغيير الارتفاع أو سرعة القذف، وراقب المخططين.', 'اضغط «الحل خطوة خطوة» لحل المثال المختار.'],
    concl: ['السقوط الحر: vf = g t و Δy = ½ g t² و v = √(2 g y) حيث g = −10 m/s².', 'مثال 3: h = 45 m ، vf = −30 m/s ، وبعد 1 s: v = −10 m/s والارتفاع 40 m.', 'مثال 4: أعلى ارتفاع 80 m ، زمن الصعود 4 s ، عند 2 s: v = 20 m/s والارتفاع 60 m ، وسرعة الاصطدام −40 m/s.', 'في أعلى نقطة السرعة صفر لكن التعجيل يبقى g نحو الأسفل.'],
    laws: ['g11_l2_fall', 'g11_l2_eq1', 'g11_l2_eq3'],
    controls: [R('h', 'ارتفاع البناية (مثال 3)', 10, 80, 45, 5, 'm'), R('vi', 'سرعة القذف للأعلى (مثال 4)', 10, 40, 40, 5, 'm/s'), TG('strobe', 'صور ومضية كل 1 s', true, null, 'camera')],
    setup(S) { S.md = 'f'; S.ex = 0; S.k = 0; D.reset(S); },
    reset(S) { S.tt = 0; S.run = 0; S.done = 0; },
    T(S) { return S.md === 'f' ? Math.sqrt(2 * S.p.h / 10) : 2 * S.p.vi / 10; },
    y(S, t) { t = Math.min(t, D.T(S)); return S.md === 'f' ? S.p.h - 5 * t * t : S.p.vi * t - 5 * t * t; },
    v(S, t) { t = Math.min(t, D.T(S)); return S.md === 'f' ? -10 * t : S.p.vi - 10 * t; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), gy = h - 205; return { w, h, L, gy, pm: (gy - 120) / 85, bx: L + 70, bw: 120, x: L + 230 }; },
    update(S, dt) { if (S.run) { S.tt += dt; if (S.tt >= D.T(S)) { S.tt = D.T(S); S.run = 0; S.done = 1; } } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), Y = m => g.gy - m * g.pm, t = S.tt, y = D.y(S, t), v = D.v(S, t), fm = S.md === 'f'; Q52.bg(ctx, w, h);
      K.raw(ctx, () => { const sg = ctx.createLinearGradient(0, 70, 0, g.gy); sg.addColorStop(0, '#bfdbfe'); sg.addColorStop(1, '#f0f9ff'); ctx.fillStyle = sg; rr(ctx, g.L + 10, 70, 380, g.gy - 70, 12); ctx.fill(); ctx.fillStyle = '#86efac'; ctx.fillRect(g.L + 10, g.gy, 380, 12); ctx.fillStyle = '#92400e'; ctx.fillRect(g.L + 10, g.gy + 12, 380, 6); });
      // vertical metre scale
      for (let m = 0; m <= 80; m += 10) { Q41.line(ctx, [[g.L + 14, Y(m)], [g.L + 24, Y(m)]], '#334155', 1.3); Q42.T(ctx, m + ' m', g.L + 40, Y(m), { s: 9, w: 800, c: '#334155' }); }
      if (fm) { const top = Y(S.p.h); K.raw(ctx, () => { const bg = ctx.createLinearGradient(g.bx, 0, g.bx + g.bw, 0); bg.addColorStop(0, '#a16207'); bg.addColorStop(.5, '#d6a46b'); bg.addColorStop(1, '#78350f'); ctx.fillStyle = bg; ctx.fillRect(g.bx, top, g.bw, g.gy - top); ctx.fillStyle = '#57534e'; ctx.fillRect(g.bx - 6, top - 8, g.bw + 12, 8);
          ctx.fillStyle = '#bae6fd'; for (let yy = top + 12; yy < g.gy - 34; yy += 26) for (let k = 0; k < 3; k++) ctx.fillRect(g.bx + 12 + k * 36, yy, 24, 15); ctx.fillStyle = '#78350f'; ctx.fillRect(g.bx + g.bw / 2 - 12, g.gy - 30, 24, 30); });
        Q41.line(ctx, [[g.x + 40, top], [g.x + 40, g.gy]], '#7c3aed', 1.4, [4, 3]); Q42.T(ctx, 'h = ' + S.p.h + ' m', g.x + 40, (top + g.gy) / 2, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' }); }
      else { Q41.line(ctx, [[g.x + 40, Y(S.p.vi * S.p.vi / 20)], [g.x + 40, g.gy]], '#7c3aed', 1.4, [4, 3]); Q42.T(ctx, 'hmax = ' + Q52.f(S.p.vi * S.p.vi / 20, 0) + ' m', g.x + 44, Y(S.p.vi * S.p.vi / 20) - 12, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' }); Q41.line(ctx, [[g.x - 40, Y(S.p.vi * S.p.vi / 20)], [g.x + 40, Y(S.p.vi * S.p.vi / 20)]], '#7c3aed', 1.4, [4, 3]); }
      // strobe images every 1 s
      if (S.p.strobe) for (let k = 1; k <= Math.floor(t + 1e-6); k++) { const yk = D.y(S, k), vk = D.v(S, k), dx = fm ? 0 : (vk >= 0 ? -16 : 16); K.raw(ctx, () => { ctx.globalAlpha = .45; }); Q52.ball(ctx, g.x + dx, Y(yk), 8, '#f97316'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); if (Math.abs(vk) > .5) Q52.arrow(ctx, g.x + dx + (fm ? 14 : dx * 1.4), Y(yk), 0, -vk * 1.3, 'rgba(37,99,235,.65)', '', 2); Q42.T(ctx, k + ' s', g.x + dx + (dx < 0 ? -26 : 26) + (fm ? 30 : 0), Y(yk), { s: 9, w: 800, c: '#475569' }); }
      const bxp = g.x + (fm ? 0 : (t > 0 && v < 0 ? 16 : t > 0 ? -16 : 0)); Q52.ball(ctx, bxp, Y(y) - 9, 9, '#ea580c');
      if (Math.abs(v) > .3) Q52.arrow(ctx, bxp + 18, Y(y) - 9, 0, -v * 1.6, '#2563eb', 'v', 3); Q52.arrow(ctx, bxp - 22, Y(y) - 20, 0, 26, '#16a34a', 'g', 2.4);
      if (!fm && !S.run && t === 0) { Q41.knob(ctx, g.x, Y(0) - 18 - S.p.vi * 2.2, '#2563eb', 8); Q52.arrow(ctx, g.x, Y(0) - 18, 0, -S.p.vi * 2.2 + 8, '#2563eb', '', 3); }
      Q52.watch(ctx, g.x + 120, 120, 18, t, 't = ' + Q52.f(t, 2) + ' s', 10);
      if (!S.ex) { const tm = Math.max(4, Math.ceil(D.T(S))), A1 = Q52.axes(ctx, { x: w - 270, y: 352, w: 230, h: 80, x1: tm, y1: 80, xs: 1, ys: 20, lx: 2, ly: 40, xl: 't (s)', yl: 'y (m)', col: '#ea580c' }), A2 = Q52.axes(ctx, { x: w - 270, y: 486, w: 230, h: 80, x1: tm, y0: -40, y1: 40, xs: 1, ys: 10, lx: 2, ly: 40, xl: 't (s)', yl: 'v (m/s)', col: '#2563eb' });
        const P1 = [], P2 = []; for (let i = 0; i <= 80; i++) { const tk = D.T(S) * i / 80; if (tk > t + 1e-6) break; P1.push([A1.X(tk), A1.Y(D.y(S, tk))]); P2.push([A2.X(tk), A2.Y(D.v(S, tk))]); } Q52.plot(ctx, P1, '#ea580c', 2.6); Q52.plot(ctx, P2, '#2563eb', 2.6); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      if (S.ex) Q52.steps(ctx, S, Object.assign({ title: EX[S.md].t }, EX[S.md], { k: S.k }), { wd: 330 });
      else Q52.card(ctx, S, [{ t: 't = ' + Q52.f(t, 2) + ' s', mono: 1 }, { t: 'v = vi + g t = ' + Q52.f(v, 1) + ' m/s', mono: 1, c: '#2563eb', w: 900 }, { t: 'y = ' + Q52.f(y, 1) + ' m', mono: 1, c: '#ea580c', w: 900 }, { t: fm ? 'Δy = ½ g t² = ' + Q52.f(-5 * t * t, 1) + ' m' : 'Δy = vi t + ½ g t² = ' + Q52.f(y, 1) + ' m', mono: 1 }, { t: fm ? 'زمن السقوط = ' + Q52.f(D.T(S), 2) + ' s' : 'زمن الصعود = زمن النزول = ' + Q52.f(D.T(S) / 2, 1) + ' s', c: '#7c3aed', w: 800 }, { t: 'التعجيل دائماً g = −10 m/s²', c: '#16a34a', w: 800 }], { title: fm ? 'السقوط الحر من سطح بناية' : 'القذف الشاقولي نحو الأعلى' });
      Q42.banner(ctx, w, fm ? 'اسحب الكرة لتغيير الارتفاع، ثم اضغط «⬇ أفلت»' : 'اسحب سهم القذف الأزرق، ثم اضغط «⬆ اقذف»', '#ea580c');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['f', 'مثال 3: سقوط حر'], ['u', 'مثال 4: قذف للأعلى']], g.h - 172, S.md, (S2, k) => { S2.md = k; S2.ex = 0; D.reset(S2); }, { bw: 200, col: '#ea580c' }),
      p: Q52.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.done || S2.tt >= D.T(S2)) { D.reset(S2); } S2.run = S2.run ? 0 : 1; }, S2 => D.reset(S2), { go: S.md === 'f' ? '⬇ أفلت' : '⬆ اقذف' }),
      e: Q52.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { if (S2.md === 'f') setParam(S2, 'h', 45); else setParam(S2, 'vi', 40); D.reset(S2); S2.run = 1; }, EX[S.md].lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), Y = m => g.gy - m * g.pm, out = [];
      if (S.md === 'f') out.push({ id: 'ball', x: g.x, y: Y(D.y(S, S.tt)) - 9, r: 20, axis: 'y', keep: true, tip: 'اسحب لتغيير الارتفاع', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'h', clamp(Math.round((g.gy - d.y) / g.pm / 5) * 5, 10, 80)); D.reset(S2); } });
      else out.push({ id: 'vi', x: g.x, y: Y(0) - 18 - S.p.vi * 2.2, r: 18, axis: 'y', keep: true, tip: 'اسحب لتغيير سرعة القذف', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'vi', clamp(Math.round((Y(0) - 18 - d.y) / 2.2 / 5) * 5, 10, 40)); D.reset(S2); } });
      return out.concat(C.m, C.p, C.e); },
    readings(S) { return [rd('الزمن t', Q52.f(S.tt, 2) + ' s'), rd('الارتفاع y', Q52.f(D.y(S, S.tt), 1) + ' m'), rd('السرعة v', Q52.f(D.v(S, S.tt), 1) + ' m/s'), rd('التعجيل', '−10 m/s²')]; },
    record(S) { return { t: Q52.f(S.tt, 2), y: Q52.f(D.y(S, S.tt), 1), v: Q52.f(D.v(S, S.tt), 1) }; },
    cols: [['t', 't (s)'], ['y', 'y (m)'], ['v', 'v (m/s)']],
    explain(S) { return Q26.ex('الصور الومضية للكرة تتباعد في أثناء السقوط وتتقارب في أثناء الصعود، والكرة المقذوفة للأعلى تعود بالسرعة نفسها.', 'تعجيل الجاذبية ثابت نحو الأسفل: يزيد مقدار السرعة 10 m/s كل ثانية عند النزول وينقصه 10 m/s كل ثانية عند الصعود. لذلك زمن الصعود يساوي زمن النزول.', 'لاعب كرة السلة يقضي في الجزء العلوي من قفزته وقتاً أطول لأن سرعته هناك صغيرة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — المقذوف الأفقي: مثال 5 (2-12، الشكلان 25 و 26، ص 40–42) =============== */
(() => {
  const EX = { q: 'قذفت الكرة k بسرعة أفقية 40 m/s من ارتفاع h فضربت الأرض بسرعة 50 m/s ، ومن الارتفاع نفسه قذفت الكرة L شاقولياً نحو الأسفل بسرعة v₀ فضربت الأرض بسرعة 50 m/s أيضاً. احسب h و v₀.', lines: ['vxf = vxi = 40 m/s', 'vf² = vxf² + vyf²', '50² = 40² + vyf²', 'vyf = −30 m/s', '(−30)² = 0 + 2 (−10) Δy', 'Δy = −45 m ⟸ h = 45 m', 'للكرة L: 50² = vyi² + 2 (−10)(−45)', '2500 = vyi² + 900 ⟸ vyi² = 1600', 'vyi = −40 m/s'] };
  const D = { id: 'g11_m_horiz', page: 41, fig: 'الشكلان 25 و 26 + مثال 5',
    desc: 'حركة المقذوف الأفقي محصلة نوعين من الحركة: حركة شاقولية تتغير فيها السرعة vy بالمقدار بسبب الجاذبية، وحركة أفقية تبقى فيها السرعة vx ثابتة لعدم تأثير الجاذبية فيها. والسرعة المحصلة vf² = vx² + vy². الكرة المقذوفة أفقياً والكرة الساقطة حراً من الارتفاع نفسه تصلان الأرض في اللحظة نفسها.',
    tags: 'المقذوف الأفقي vx ثابتة vy متغيرة vf²=vx²+vy² مثال 5 40m/s 50m/s 45m -30m/s -40m/s الحركة في بعدين مستوي',
    tools: ['حافة مرتفعة', 'كرتان k و L', 'كاميرا ومضية'],
    steps: ['اضغط «▶ اقذف»: الكرة k تقذف أفقياً والكرة L تسقط شاقولياً من الارتفاع نفسه.', 'اختر «L تسقط حراً»: لاحظ الخطوط الأفقية المتقطعة، فالكرتان على الارتفاع نفسه في كل لحظة وتصلان معاً.', 'راقب الأسهم: المركبة الأفقية الخضراء ثابتة والمركبة الشاقولية الحمراء تكبر.', 'اختر «L تقذف للأسفل 40 m/s» واضغط «الحل خطوة خطوة» لحل مثال 5.'],
    concl: ['في المقذوف الأفقي: vx ثابتة ، و vy تزداد بتعجيل الجاذبية.', 'السرعة المحصلة: vf² = vx² + vy² (الشكل 25).', 'المقذوف أفقياً والساقط حراً من الارتفاع نفسه يصلان الأرض معاً، لكن انطلاق المقذوف أفقياً أكبر لحظة الوصول.', 'مثال 5: vyf = −30 m/s ، h = 45 m ، v₀ = −40 m/s.'],
    laws: ['g11_l2_horiz', 'g11_l2_fall'],
    controls: [R('vx', 'السرعة الأفقية للكرة k', 5, 60, 40, 5, 'm/s'), R('h', 'الارتفاع h', 10, 60, 45, 5, 'm'), R('v0', 'سرعة الكرة L نحو الأسفل', 0, 50, 40, 5, 'm/s'), TG('vec', 'مركبتا السرعة', true, null, 'arrow')],
    setup(S) { S.tt = 0; S.run = 0; S.ex = 0; S.k = 0; S.sc = 5; S.lm = 'down'; },
    Tk(S) { return Math.sqrt(2 * S.p.h / 10); },
    TL(S) { const v0 = S.lm === 'down' ? S.p.v0 : 0; return (-v0 + Math.sqrt(v0 * v0 + 20 * S.p.h)) / 10; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), gy = h - 205, cx = L + 80; return { w, h, L, gy, cx, rx: w - 70 }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), R = S.p.vx * D.Tk(S), sc = Math.min((g.rx - 60 - g.cx) / Math.max(20, R + 10), 230 / (S.p.h + 4)); S.sc = Q52.ease(S.sc, sc, dt, 5);
      if (S.run) { S.tt += dt * .8; if (S.tt >= Math.max(D.Tk(S), D.TL(S))) { S.tt = Math.max(D.Tk(S), D.TL(S)); S.run = 0; } } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), s = S.sc, top = g.gy - S.p.h * s, Xk = t => g.cx + S.p.vx * t * s, Yk = t => top + 5 * t * t * s, v0 = S.lm === 'down' ? S.p.v0 : 0, YL = t => top + (v0 * t + 5 * t * t) * s;
      const tk = Math.min(S.tt, D.Tk(S)), tl = Math.min(S.tt, D.TL(S)); Q52.bg(ctx, w, h);
      K.raw(ctx, () => { const sg = ctx.createLinearGradient(0, 320, 0, g.gy); sg.addColorStop(0, '#dbeafe'); sg.addColorStop(1, '#f0f9ff'); ctx.fillStyle = sg; rr(ctx, g.L + 10, Math.min(320, top - 40), w - g.L - 22, g.gy - Math.min(320, top - 40), 10); ctx.fill();
        ctx.fillStyle = '#4d7c0f'; ctx.fillRect(g.L + 10, g.gy, w - g.L - 22, 10); ctx.fillStyle = '#78350f'; ctx.fillRect(g.L + 10, g.gy + 10, w - g.L - 22, 8);
        const rg = ctx.createLinearGradient(g.L + 10, 0, g.cx, 0); rg.addColorStop(0, '#57534e'); rg.addColorStop(1, '#a8a29e'); ctx.fillStyle = rg; ctx.beginPath(); ctx.moveTo(g.L + 10, top); ctx.lineTo(g.cx, top); ctx.lineTo(g.cx + 4, top + 30); ctx.lineTo(g.cx - 6, g.gy); ctx.lineTo(g.L + 10, g.gy); ctx.fill();
        ctx.fillStyle = '#64748b'; ctx.fillRect(g.rx - 8, top + 10, 16, g.gy - top - 10); ctx.fillRect(g.rx - 30, top + 2, 30, 8); });
      Q41.line(ctx, [[g.cx - 30, top], [g.cx - 30, g.gy]], '#7c3aed', 1.4, [4, 3]); Q42.T(ctx, 'h = ' + S.p.h + ' m', g.cx - 30, (top + g.gy) / 2, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' });
      // path + strobe
      const P = []; for (let i = 0; i <= 60; i++) { const t = D.Tk(S) * i / 60; P.push([Xk(t), Yk(t)]); } Q52.plot(ctx, P, 'rgba(220,38,38,.35)', 1.6, [5, 4]);
      const dtS = .5; for (let t = 0; t <= tk + 1e-6; t += dtS) { K.raw(ctx, () => { ctx.globalAlpha = .4; }); Q52.ball(ctx, Xk(t), Yk(t), 7, '#dc2626'); K.raw(ctx, () => { ctx.globalAlpha = 1; });
        if (S.p.vec && t > 0) { const q = 1.1; Q52.arrow(ctx, Xk(t), Yk(t), S.p.vx * q, 0, '#16a34a', '', 2); Q52.arrow(ctx, Xk(t), Yk(t), 0, 10 * t * q, '#dc2626', '', 2); Q52.arrow(ctx, Xk(t), Yk(t), S.p.vx * q, 10 * t * q, 'rgba(37,99,235,.85)', '', 2); } }
      for (let t = 0; t <= tl + 1e-6; t += dtS) { K.raw(ctx, () => { ctx.globalAlpha = .4; }); Q52.ball(ctx, g.rx, YL(t), 7, '#16a34a'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); if (S.lm === 'free' && t <= tk + 1e-6) Q41.line(ctx, [[Xk(t), Yk(t)], [g.rx, YL(t)]], 'rgba(15,23,42,.25)', 1, [3, 4]); }
      Q52.ball(ctx, Xk(tk), Yk(tk), 9, '#dc2626'); Q52.ball(ctx, g.rx, YL(tl), 9, '#16a34a'); Q42.T(ctx, 'k', g.cx - 4, top - 18, { s: 12, w: 900, c: '#fff', bg: '#dc2626' }); Q42.T(ctx, 'L', g.rx, top - 18, { s: 12, w: 900, c: '#fff', bg: '#16a34a' });
      if (S.p.vec && tk > 0) { Q52.arrow(ctx, Xk(tk), Yk(tk), S.p.vx * 1.4, 0, '#16a34a', 'vx', 3); Q52.arrow(ctx, Xk(tk), Yk(tk), 0, 10 * tk * 1.4, '#dc2626', 'vy', 3); }
      if (S.tt === 0 && !S.run) Q52.arrow(ctx, g.cx + 8, top - 8, S.p.vx * 1.4, 0, '#16a34a', 'vx', 3);
      // impact velocity triangle (top-left)
      const vy = 10 * D.Tk(S), vf = Math.hypot(S.p.vx, vy), bx = g.L + 40, by = 92, k = 150 / Math.max(S.p.vx, vy, 1);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.94)'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, bx - 20, by - 18, 300, 222, 10); ctx.fill(); ctx.stroke(); });
      Q42.T(ctx, 'سرعة k لحظة اصطدامها بالأرض', bx + 130, by, { s: 10.5, w: 900, c: '#334155' });
      const ox = bx + 20, oy = by + 22; Q52.arrow(ctx, ox, oy, S.p.vx * k, 0, '#16a34a', '', 3); Q52.arrow(ctx, ox, oy, S.p.vx * k, vy * k, '#2563eb', '', 3); Q41.line(ctx, [[ox + S.p.vx * k, oy], [ox + S.p.vx * k, oy + vy * k]], '#dc2626', 2.4, [5, 3]);
      Q42.T(ctx, 'vx = ' + S.p.vx + ' m/s', ox + S.p.vx * k / 2, oy - 10, { s: 10, w: 900, c: '#16a34a' }); Q42.T(ctx, 'vy = −' + Q52.f(vy, 1), ox + S.p.vx * k + 34, oy + vy * k / 2, { s: 10, w: 900, c: '#dc2626' }); Q42.T(ctx, 'v = ' + Q52.f(vf, 1) + ' m/s', ox + S.p.vx * k / 2 - 30, oy + vy * k / 2 + 14, { s: 10, w: 900, c: '#2563eb' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.l); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      const vL = Math.sqrt(v0 * v0 + 20 * S.p.h);
      if (S.ex) Q52.steps(ctx, S, Object.assign({ title: 'مثال 5 ص 41' }, EX, { k: S.k }), { wd: 330 });
      else Q52.card(ctx, S, [{ t: 'الكرة k: زمن الوصول ' + Q52.f(D.Tk(S), 2) + ' s', c: '#dc2626', w: 900 }, { t: 'vf = √(vx² + vy²) = ' + Q52.f(vf, 1) + ' m/s', mono: 1, c: '#dc2626' }, { t: 'المدى الأفقي = ' + Q52.f(S.p.vx * D.Tk(S), 1) + ' m', c: '#334155' }, { t: 'الكرة L: زمن الوصول ' + Q52.f(D.TL(S), 2) + ' s', c: '#16a34a', w: 900 }, { t: 'vf = √(v₀² + 2 g h) = ' + Q52.f(vL, 1) + ' m/s', mono: 1, c: '#16a34a' }, { t: S.lm === 'free' ? 'تصلان معاً لكن انطلاق k أكبر' : 'الكرة L أسرع وصولاً لأنها قذفت للأسفل', c: '#7c3aed', w: 900 }], { title: 'المقذوف الأفقي' });
      Q42.banner(ctx, w, 'اضغط «▶ اقذف» وقارن الكرة k بالكرة L', '#ea580c');
    },
    chips(S, g) { return { l: Q42.chips(S, 'lm', [['free', 'الكرة L تسقط حراً'], ['down', 'الكرة L تقذف للأسفل']], g.h - 172, S.lm, (S2, k) => { S2.lm = k; S2.tt = 0; S2.run = 0; }, { bw: 170, col: '#16a34a' }),
      p: Q52.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.tt > 0 && !S2.run) S2.tt = 0; S2.run = S2.run ? 0 : 1; }, S2 => { S2.tt = 0; S2.run = 0; }, { go: '▶ اقذف' }),
      e: Q52.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { setParam(S2, 'vx', 40); setParam(S2, 'h', 45); setParam(S2, 'v0', 40); S2.lm = 'down'; S2.tt = 0; S2.run = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), top = g.gy - S.p.h * S.sc;
      return [{ id: 'vx', x: g.cx + 8 + S.p.vx * 1.4, y: top - 8, r: 16, axis: 'x', keep: true, tip: 'اسحب لتغيير السرعة الأفقية', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'vx', clamp(Math.round((d.x - g.cx - 8) / 1.4 / 5) * 5, 5, 60)); S2.tt = 0; S2.run = 0; } },
        { id: 'cliff', x: g.cx - 30, y: top + 4, r: 16, axis: 'y', keep: true, hint: false, tip: 'اسحب لتغيير الارتفاع', drag: (S2, d) => { setParam(S2, 'h', clamp(Math.round((g.gy - d.y) / S2.sc / 5) * 5, 10, 60)); S2.tt = 0; S2.run = 0; } }].concat(C.l, C.p, C.e); },
    readings(S) { const vy = 10 * D.Tk(S); return [rd('زمن وصول k', Q52.f(D.Tk(S), 2) + ' s'), rd('vx ، vy لحظة الاصطدام', S.p.vx + ' ، −' + Q52.f(vy, 1) + ' m/s'), rd('سرعة اصطدام k', Q52.f(Math.hypot(S.p.vx, vy), 1) + ' m/s'), rd('زمن وصول L', Q52.f(D.TL(S), 2) + ' s')]; },
    record(S) { const vy = 10 * D.Tk(S); return { vx: S.p.vx, h: S.p.h, t: Q52.f(D.Tk(S), 2), v: Q52.f(Math.hypot(S.p.vx, vy), 1) }; },
    cols: [['vx', 'vx (m/s)'], ['h', 'h (m)'], ['t', 't (s)'], ['v', 'v (m/s)']],
    explain(S) { return Q26.ex('الكرة المقذوفة أفقياً تتقدم مسافات أفقية متساوية بين الصور، وتنزل مسافات شاقولية متزايدة، وتصل الأرض مع الكرة الساقطة حراً.', 'الحركتان الأفقية والشاقولية مستقلتان: الجاذبية لا تؤثر أفقياً فتبقى vx ثابتة، وتؤثر شاقولياً فتزيد vy كما في السقوط الحر تماماً.', 'الحقيبة التي تسقط من طائرة تبقى تحت الطائرة طوال سقوطها بإهمال مقاومة الهواء.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — المقذوف بزاوية: ركلة كرة القدم مثال 6 (الشكلان 27 و 28، ص 42–46) =============== */
(() => {
  const EX = { q: 'ركل لاعب كرة القدم الكرة الموضوعة على سطح الأرض بسرعة ابتدائية 20 m/s وبزاوية 37 درجة فوق الأفق. احسب أعلى ارتفاع، وزمن الصعود والزمن الكلي، والمدى الأفقي، وسرعتها قبيل اصطدامها بالأرض واتجاهها، وأعظم مدى أفقي.', lines: ['vxi = 20 cos37° = 20 × 0.8 = 16 m/s', 'vyi = 20 sin37° = 20 × 0.6 = 12 m/s', '0 = 12² + 2 (−10) Δy ⟸ hmax = 7.2 m', '0 = 12 + (−10) t₁ ⟸ t₁ = 1.2 s', '−7.2 = ½ (−10) t₂² ⟸ t₂ = 1.2 s', 'ttotal = 1.2 + 1.2 = 2.4 s', 'R = vx ttotal = 16 × 2.4 = 38.4 m', 'vyf = 0 + (−10)(1.2) = −12 m/s', 'v² = 16² + (−12)² = 400 ⟸ v = 20 m/s', 'tanθ = −12 / 16 = −3/4 ⟸ θ = −37°', 'Rmax = vi² / g = 20² / 10 = 40 m'] };
  const rad = d => d * Math.PI / 180;
  const D = { id: 'g11_m_angle', page: 42, fig: 'الشكلان 27 و 28 + مثال 6',
    desc: 'المقذوف بزاوية فوق الأفق يتخذ مساراً بشكل قطع مكافئ: مركبته الأفقية vx = vi cosθ ثابتة، ومركبته الشاقولية vy = vi sinθ + g t تتباطأ في الصعود وتتسارع في النزول. زمن الصعود t = vi sinθ / g والزمن الكلي 2 vi sinθ / g ، وأعلى ارتفاع hmax = vi² sin²θ / 2g ، والمدى الأفقي R = vi² sin2θ / g ، وأعظم مدى Rmax = vi² / g عند θ = 45°.',
    tags: 'المقذوف بزاوية قطع مكافئ vx=vicosθ vy=visinθ+gt زمن الصعود الزمن الكلي أعلى ارتفاع المدى الأفقي R=vi²sin2θ/g أعظم مدى 45 مثال 6 كرة قدم 20m/s 37 7.2m 2.4s 38.4m 40m',
    tools: ['لاعب وكرة قدم', 'منقلة للزاوية', 'شريط قياس للمدى', 'كاميرا ومضية'],
    steps: ['اسحب رأس السهم الأزرق لتغيير السرعة الابتدائية والزاوية، ثم اضغط «▶ اركل».', 'راقب مركبتي السرعة: الخضراء الأفقية ثابتة، والحمراء الشاقولية تصغر حتى الصفر في القمة ثم تكبر للأسفل.', 'اضغط «الزاوية المتممة» لترى أن الزاويتين θ و 90° − θ تعطيان المدى نفسه، وأن 45° تعطي أعظم مدى.', 'اضغط «الحل خطوة خطوة» لحل مثال 6.'],
    concl: ['vx = vi cosθ ثابتة طوال المسار، و vy = vi sinθ + g t.', 'في القمة vy = 0 والسرعة = vx فقط.', 'R = vi² sin2θ / g وأعظم مدى vi² / g عند الزاوية 45°.', 'مثال 6: hmax = 7.2 m ، ttotal = 2.4 s ، R = 38.4 m ، v = 20 m/s بزاوية 37° تحت الأفق ، Rmax = 40 m.'],
    laws: ['g11_l2_proj'],
    controls: [R('vi', 'السرعة الابتدائية vi', 5, 30, 20, 1, 'm/s'), R('th', 'زاوية الإطلاق θ', 5, 85, 37, 1, '°'), TG('vec', 'مركبات السرعة', true, null, 'arrow'), TG('keep', 'إبقاء المسارات للمقارنة', true, null, 'trail')],
    setup(S) { S.tt = 0; S.run = 0; S.trs = []; S.sc = 7; S.ex = 0; S.k = 0; S.ph = 0; },
    k(S) { const v = S.p.vi, a = rad(S.p.th); return { vx: v * Math.cos(a), vy: v * Math.sin(a), T: 2 * v * Math.sin(a) / 10, H: (v * Math.sin(a)) ** 2 / 20, R: v * v * Math.sin(2 * a) / 10 }; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), gy = h - 180, x0 = L + 70; return { w, h, L, gy, x0 }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), q = D.k(S); let mR = q.R, mH = q.H; S.trs.forEach(t => { mR = Math.max(mR, t.R); mH = Math.max(mH, t.H); }); mR = Math.max(mR, S.p.vi * S.p.vi / 10 * .6); S.sc = Q52.ease(S.sc, Math.min((g.w - 40 - g.x0) / (mR * 1.06 + 4), 270 / (mH + 2)), dt, 5);
      if (S.run) { S.tt += dt * .9; S.ph += dt * 10; if (S.tt >= q.T) { S.tt = q.T; S.run = 0; if (S.p.keep) { S.trs.push({ vi: S.p.vi, th: S.p.th, R: q.R, H: q.H }); if (S.trs.length > 6) S.trs.shift(); } } } },
    shoot(S) { S.tt = 0; S.run = 1; S.ex = S.ex && S.p.vi === 20 && S.p.th === 37 ? S.ex : 0; if (!S.p.keep) S.trs = []; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), s = S.sc, q = D.k(S), X = m => g.x0 + m * s, Y = m => g.gy - m * s, t = S.tt, x = q.vx * t, y = q.vy * t - 5 * t * t, vy = q.vy - 10 * t; Q52.bg(ctx, w, h);
      K.raw(ctx, () => { const sg = ctx.createLinearGradient(0, 300, 0, g.gy); sg.addColorStop(0, 'rgba(219,234,254,.0)'); sg.addColorStop(1, '#dbeafe'); ctx.fillStyle = sg; ctx.fillRect(g.L + 10, 300, w - g.L - 22, g.gy - 300); const gg = ctx.createLinearGradient(0, g.gy, 0, g.gy + 22); gg.addColorStop(0, '#22c55e'); gg.addColorStop(1, '#15803d'); ctx.fillStyle = gg; ctx.fillRect(g.L + 10, g.gy, w - g.L - 22, 22); ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.L + 10, g.gy + 4); ctx.lineTo(w - 12, g.gy + 4); ctx.stroke(); });
      for (let m = 0; m * s < w - 50 - g.x0; m += (s > 8 ? 5 : 10)) { Q41.line(ctx, [[X(m), g.gy + 6], [X(m), g.gy + 14]], '#f0fdf4', 1.4); if (m % (s > 8 ? 10 : 20) === 0) Q42.T(ctx, m + ' m', X(m), g.gy + 30, { s: 9, w: 800, c: '#14532d' }); }
      // stored traces
      const path = (vi, th, col, wd, dash) => { const a = rad(th), vx = vi * Math.cos(a), v0 = vi * Math.sin(a), T = 2 * v0 / 10, P = []; for (let i = 0; i <= 60; i++) { const tt = T * i / 60; P.push([X(vx * tt), Y(v0 * tt - 5 * tt * tt)]); } Q52.plot(ctx, P, col, wd, dash); };
      S.trs.forEach((tr, i) => { path(tr.vi, tr.th, 'rgba(100,116,139,.55)', 1.8, [5, 4]); Q42.T(ctx, tr.th + '°', X(tr.R / 2), Y(tr.H) - 10, { s: 9.5, w: 900, c: '#475569' }); });
      path(S.p.vi, S.p.th, 'rgba(234,88,12,.4)', 1.6, [3, 4]);
      // traced part + strobe with components
      const P = []; for (let i = 0; i <= 80; i++) { const tt = q.T * i / 80; if (tt > t + 1e-6) break; P.push([X(q.vx * tt), Y(q.vy * tt - 5 * tt * tt)]); } Q52.plot(ctx, P, '#ea580c', 3);
      if (S.p.vec) for (let i = 0; i <= 8; i++) { const tt = q.T * i / 8; if (tt > t + 1e-6 || tt === 0) continue; const xx = X(q.vx * tt), yy = Y(q.vy * tt - 5 * tt * tt), vv = q.vy - 10 * tt, kk = 2.4; K.raw(ctx, () => { ctx.globalAlpha = .45; }); Q52.ball(ctx, xx, yy, 6, '#f8fafc'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); Q52.arrow(ctx, xx, yy, q.vx * kk, 0, 'rgba(22,163,74,.8)', '', 1.8); if (Math.abs(vv) > .4) Q52.arrow(ctx, xx, yy, 0, -vv * kk, 'rgba(220,38,38,.8)', '', 1.8); }
      // apex + range marks
      if (t >= q.T / 2) { Q41.line(ctx, [[X(q.R / 2), Y(q.H)], [X(q.R / 2), g.gy]], '#7c3aed', 1.3, [4, 3]); Q42.T(ctx, 'hmax = ' + Q52.f(q.H, 1) + ' m', X(q.R / 2) + 46, Y(q.H / 2), { s: 10, w: 900, c: '#fff', bg: '#7c3aed' }); }
      if (t >= q.T - 1e-6 && q.T > 0) { Q52.arrow(ctx, X(0), g.gy - 14, X(q.R) - X(0), 0, '#0f766e', '', 2); Q42.T(ctx, 'R = ' + Q52.f(q.R, 1) + ' m', X(q.R / 2), g.gy - 26, { s: 10.5, w: 900, c: '#fff', bg: '#0f766e' }); }
      // player + ball + launch arrow
      Q52.runner(ctx, g.x0 - 26, g.gy, 54, S.run ? 1.2 : -.6, 1, '#dc2626', true);
      const bxp = X(x), byp = Y(y) - 7; K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(bxp, byp, 7, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#0f172a'; ctx.save(); ctx.translate(bxp, byp); ctx.rotate(S.ph); ctx.beginPath(); for (let k = 0; k < 5; k++) { const a = k * TAU / 5; ctx.lineTo(Math.cos(a) * 3, Math.sin(a) * 3); } ctx.fill(); ctx.restore(); });
      if (S.p.vec && t > 0) { Q52.arrow(ctx, bxp, byp, q.vx * 3.2, 0, '#16a34a', 'vx', 3); if (Math.abs(vy) > .4) Q52.arrow(ctx, bxp, byp, 0, -vy * 3.2, '#dc2626', 'vy', 3); }
      const L0 = 3.6, a0 = rad(S.p.th), tipx = X(0) + Math.cos(a0) * S.p.vi * L0, tipy = g.gy - 7 - Math.sin(a0) * S.p.vi * L0;
      if (!S.run) { Q52.arrow(ctx, X(0), g.gy - 7, tipx - X(0), tipy - g.gy + 7, '#2563eb', '', 3.2); Q41.knob(ctx, tipx, tipy, '#2563eb', 8); Q41.line(ctx, [[X(0), g.gy - 7], [X(0) + 60, g.gy - 7]], '#64748b', 1, [3, 3]); K.raw(ctx, () => { ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(0), g.gy - 7, 30, -a0, 0); ctx.stroke(); }); Q42.T(ctx, 'θ = ' + S.p.th + '°', X(0) + 56, g.gy - 22, { s: 10, w: 900, c: '#2563eb' }); Q42.T(ctx, 'vi = ' + S.p.vi + ' m/s', tipx + 10, tipy - 14, { s: 10, w: 900, c: '#fff', bg: '#2563eb' }); }
      // R(θ) mini graph
      const A = Q52.axes(ctx, { x: g.L + 56, y: 90, w: 250, h: 110, x1: 90, y1: Math.max(10, Math.ceil(S.p.vi * S.p.vi / 10 / 10) * 10), xs: 15, ys: 10, lx: 45, ly: Math.max(10, Math.ceil(S.p.vi * S.p.vi / 10 / 20) * 10), xl: 'θ (°)', yl: 'R (m)', col: '#0f766e' }), RC = []; for (let d = 0; d <= 90; d += 2) RC.push([A.X(d), A.Y(S.p.vi * S.p.vi / 10 * Math.sin(rad(2 * d)))]);
      Q52.plot(ctx, RC, '#0f766e', 2.2); Q41.dot(ctx, A.X(S.p.th), A.Y(q.R), '#ea580c', 5); Q41.dot(ctx, A.X(90 - S.p.th), A.Y(q.R), 'rgba(234,88,12,.45)', 4); Q41.line(ctx, [[A.X(45), A.Y(0)], [A.X(45), A.Y(S.p.vi * S.p.vi / 10)]], 'rgba(124,58,237,.6)', 1.2, [3, 3]);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      if (S.ex) Q52.steps(ctx, S, Object.assign({ title: 'مثال 6 ص 44' }, EX, { k: S.k }), { wd: 330 });
      else Q52.card(ctx, S, [{ t: 'vx = vi cosθ = ' + Q52.f(q.vx, 1) + ' m/s', mono: 1, c: '#16a34a' }, { t: 'vy = vi sinθ + g t = ' + Q52.f(vy, 1) + ' m/s', mono: 1, c: '#dc2626' }, { t: 'trise = vi sinθ / g = ' + Q52.f(q.T / 2, 2) + ' s', mono: 1 }, { t: 'hmax = vi² sin²θ / 2g = ' + Q52.f(q.H, 2) + ' m', mono: 1, c: '#7c3aed' }, { t: 'R = vi² sin2θ / g = ' + Q52.f(q.R, 2) + ' m', mono: 1, c: '#0f766e', w: 900 }, { t: 'Rmax = vi² / g = ' + Q52.f(S.p.vi * S.p.vi / 10, 1) + ' m', mono: 1 }, { t: 'أعظم مدى عند الزاوية 45 درجة', c: '#b91c1c', w: 900 }], { title: 'المقذوف بزاوية فوق الأفق' });
      Q42.banner(ctx, w, 'اسحب رأس السهم الأزرق، ثم اضغط «▶ اركل»', '#ea580c');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pl', [['go', S.run ? '⏸ أوقف' : '▶ اركل'], ['cl', '↺ امسح المسارات'], ['cm', 'الزاوية المتممة'], ['45', 'جرّب الزاوية 45']], g.h - 128, '', (S2, k) => { if (k === 'go') { if (S2.run) S2.run = 0; else D.shoot(S2); } else if (k === 'cl') { S2.trs = []; S2.tt = 0; S2.run = 0; } else if (k === 'cm') { setParam(S2, 'th', 90 - S2.p.th); D.shoot(S2); } else { setParam(S2, 'th', 45); D.shoot(S2); } }, { bw: 160 }),
      e: Q52.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { setParam(S2, 'vi', 20); setParam(S2, 'th', 37); S2.tt = 0; S2.run = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), a0 = rad(S.p.th), L0 = 3.6, x0 = g.x0, y0 = g.gy - 7;
      return [{ id: 'tip', x: x0 + Math.cos(a0) * S.p.vi * L0, y: y0 - Math.sin(a0) * S.p.vi * L0, r: 16, axis: 'xy', keep: true, tip: 'اسحب لتغيير السرعة والزاوية', idle: 'اسحب ✋', drag: (S2, d) => { const dx = d.x - x0, dy = y0 - d.y; setParam(S2, 'th', clamp(Math.round(Math.atan2(dy, Math.max(dx, .1)) * 180 / Math.PI), 5, 85)); setParam(S2, 'vi', clamp(Math.round(Math.hypot(dx, dy) / L0), 5, 30)); S2.run = 0; S2.tt = 0; S2.ex = 0; } }].concat(C.p, C.e); },
    readings(S) { const q = D.k(S); return [rd('vx ، vy الابتدائيتان', Q52.f(q.vx, 1) + ' ، ' + Q52.f(q.vy, 1) + ' m/s'), rd('زمن الصعود ، الزمن الكلي', Q52.f(q.T / 2, 2) + ' ، ' + Q52.f(q.T, 2) + ' s'), rd('أعلى ارتفاع hmax', Q52.f(q.H, 2) + ' m'), rd('المدى الأفقي R', Q52.f(q.R, 2) + ' m')]; },
    record(S) { const q = D.k(S); return { vi: S.p.vi, th: S.p.th, T: Q52.f(q.T, 2), H: Q52.f(q.H, 2), R: Q52.f(q.R, 2) }; },
    cols: [['vi', 'vi (m/s)'], ['th', 'θ (°)'], ['T', 'T (s)'], ['H', 'hmax (m)'], ['R', 'R (m)']],
    explain(S) { return Q26.ex('السهم الأخضر الأفقي لا يتغير طوال المسار، والسهم الأحمر الشاقولي يقصر حتى يختفي في القمة ثم يطول نحو الأسفل.', 'الجاذبية تؤثر شاقولياً فقط، فتبقى vx = vi cosθ ثابتة وتتغير vy بمعدل 10 m/s كل ثانية. المدى vi² sin2θ / g أكبر ما يكون عندما sin2θ = 1 أي θ = 45°.', 'لاعب رمي الرمح يطلقه بزاوية قريبة من 45° ليصل أبعد مسافة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — مسائل الفصل الثاني م1–م4 (ص 50) =============== */
(() => {
  const PR = {
    p1: { n: 'م1 الكوابح', T: 5, rate: 1, q: 'سيارة تتحرك بسرعة 30 m/s ، ضغط سائقها على الكوابح فتحركت بتباطؤ 6 m/s². احسب سرعتها بعد 2 s ، والزمن حتى تتوقف، والإزاحة حتى تتوقف.', lines: ['vf = vi + a t = 30 + (−6)(2)', 'vf = 18 m/s', '0 = 30 + (−6) t ⟸ t = 5 s', 'vf² = vi² + 2 a Δx', '0 = 30² + 2 (−6) Δx', 'Δx = 900 / 12 = 75 m'] },
    p2: { n: 'م2 الجسر', T: 2, rate: .6, q: 'سقط حجر سقوطاً حراً من جسر فاصطدم بسطح الماء بعد 2 s. احسب ارتفاع الجسر، وارتفاع الحجر فوق الماء بعد 1 s ، وسرعته لحظة اصطدامه بالماء.', lines: ['Δy = ½ g t² = ½ (−10)(2)² = −20 m', 'ارتفاع الجسر h = 20 m', 'بعد 1 s: Δy = ½ (−10)(1)² = −5 m', 'الارتفاع = 20 − 5 = 15 m', 'vf = g t = (−10)(2) = −20 m/s', 'السرعة 20 m/s نحو الأسفل'] },
    p3: { n: 'م3 الطائرة', T: 20, rate: 3, q: 'طائرة تحلق أفقياً بسرعة 150 m/s على ارتفاع 2000 m ، سقطت منها حقيبة. احسب البعد الأفقي لنقطة اصطدامها عن نقطة سقوطها، ومقدار سرعة الاصطدام واتجاهها.', lines: ['−2000 = ½ (−10) t² ⟸ t² = 400', 't = 20 s', 'x = vx t = 150 × 20 = 3000 m', 'vy = g t = (−10)(20) = −200 m/s', 'v² = 150² + 200² ⟸ v = 250 m/s', 'tanθ = −200 / 150 ⟸ θ = −53°', 'الاتجاه تحت الأفق'] },
    p4: { n: 'م4 القذف للأعلى', T: 6, rate: 1, q: 'من نقطة على سطح الأرض قذف حجر شاقولياً نحو الأعلى فوصل قمة مساره بعد 3 s. احسب سرعة القذف، وأعلى ارتفاع، والإزاحة الكلية والزمن الكلي.', lines: ['0 = vi + (−10)(3) ⟸ vi = 30 m/s', '0 = 30² + 2 (−10) h', 'h = 900 / 20 = 45 m', 'الحجر يعود إلى نقطة القذف', 'الإزاحة الكلية = صفر', 'الزمن الكلي = 3 + 3 = 6 s'] } };
  const D = { id: 'g11_m_prob', page: 50, fig: 'مسائل ص 50',
    desc: 'مسائل الفصل الثاني على الجهاز: سيارة تكبح بتباطؤ 6 m/s² ، حجر يسقط من جسر، حقيبة تسقط من طائرة تحلق أفقياً، وحجر يقذف شاقولياً نحو الأعلى. كل مسألة تُعرض متحركة مع مخطط السرعة − الزمن والحل خطوة خطوة.',
    tags: 'مسائل الفصل الثاني الكوابح تباطؤ 6 75m 5s 18m/s جسر 20m 15m طائرة 150m/s 2000m 3000m 250m/s قذف للأعلى 30m/s 45m 6s',
    tools: ['سيارة', 'جسر وحجر', 'طائرة وحقيبة', 'حجر يقذف للأعلى'],
    steps: ['اختر مسألة من الأزرار.', 'اضغط «▶ شغّل» أو اسحب مؤشر الزمن لتتابع الحركة ومخطط السرعة.', 'اضغط «الحل خطوة خطوة» ثم «الخطوة التالية» لترى الحل.', 'قارن القيم على الشاشة بنتائج الحل.'],
    concl: ['م1: vf = 18 m/s بعد 2 s ، تتوقف بعد 5 s ، الإزاحة 75 m.', 'م2: ارتفاع الجسر 20 m ، بعد 1 s يكون 15 m فوق الماء ، سرعة الاصطدام 20 m/s نحو الأسفل.', 'م3: البعد الأفقي 3000 m ، سرعة الاصطدام 250 m/s بزاوية 53° تقريباً تحت الأفق.', 'م4: vi = 30 m/s ، أعلى ارتفاع 45 m ، الإزاحة الكلية صفر والزمن الكلي 6 s.'],
    laws: ['g11_l2_eq1', 'g11_l2_eq3', 'g11_l2_fall', 'g11_l2_horiz'],
    controls: [R('rate', 'سرعة العرض', .25, 2, 1, .25, '×'), TG('graph', 'مخطط السرعة − الزمن', true, null, 'chart')],
    setup(S) { S.pr = 'p1'; S.tt = 0; S.run = 0; S.ex = 0; S.k = 0; },
    st(S, t) { // state of the problem at time t
      t = clamp(t, 0, PR[S.pr].T);
      if (S.pr === 'p1') return { x: 30 * t - 3 * t * t, v: 30 - 6 * t };
      if (S.pr === 'p2') return { y: 20 - 5 * t * t, v: -10 * t };
      if (S.pr === 'p3') return { x: 150 * t, y: 2000 - 5 * t * t, v: -10 * t, px: 150 * t };
      return { y: 30 * t - 5 * t * t, v: 30 - 10 * t }; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, gy: h - 200, x0: L + 40, x1: w - 30 }; },
    update(S, dt) { if (S.run) { S.tt += dt * PR[S.pr].rate * S.p.rate; if (S.tt >= PR[S.pr].T) { S.tt = PR[S.pr].T; S.run = 0; } } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = PR[S.pr], t = S.tt, q = D.st(S, t); Q52.bg(ctx, w, h);
      K.raw(ctx, () => { const sg = ctx.createLinearGradient(0, 250, 0, g.gy); sg.addColorStop(0, '#dbeafe'); sg.addColorStop(1, '#f0f9ff'); ctx.fillStyle = sg; rr(ctx, g.L + 10, 236, w - g.L - 22, g.gy - 236, 12); ctx.fill(); });
      if (S.pr === 'p1') { const X = m => g.x0 + 30 + m / 90 * (g.x1 - g.x0 - 60), yr = g.gy - 80; Q52.road(ctx, g.L + 10, w - 12, yr, 34, 0); Q52.ruler(ctx, X, 0, 90, yr + 38, 10, { sub: 5, unit: 'm' });
        for (let k = 0; k <= Math.floor(t + 1e-6); k++) { const qk = D.st(S, k); Q52.car(ctx, X(qk.x), yr + 20, .5, '#94a3b8', 0, 1, .4); Q42.T(ctx, k + ' s', X(qk.x), yr - 40, { s: 9, w: 800, c: '#475569' }); }
        Q52.car(ctx, X(q.x), yr + 20, .7, '#dc2626', q.x / .4); if (q.v > .3) { Q52.arrow(ctx, X(q.x) - 10, yr - 64, q.v * 3, 0, '#2563eb', 'v', 3); Q52.arrow(ctx, X(q.x) + 10, yr - 88, -24, 0, '#16a34a', 'a', 2.6); }
        Q52.speedo(ctx, w - 90, 300, 36, q.v, 30, 'm/s'); }
      if (S.pr === 'p2') { const pm = 12, Y = m => g.gy - 20 - m * pm, bx = g.L + 260; K.raw(ctx, () => { const wg = ctx.createLinearGradient(0, g.gy - 30, 0, g.gy); wg.addColorStop(0, '#38bdf8'); wg.addColorStop(1, '#0369a1'); ctx.fillStyle = wg; ctx.fillRect(g.L + 10, g.gy - 26, w - g.L - 22, 26); ctx.fillStyle = '#a8a29e'; ctx.fillRect(g.L + 60, Y(20), 360, 14); ctx.strokeStyle = '#78716c'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(g.L + 80, g.gy - 20); ctx.quadraticCurveTo(g.L + 240, Y(20) - 40, g.L + 400, g.gy - 20); ctx.stroke(); ctx.fillStyle = '#57534e'; ctx.fillRect(g.L + 60, Y(20) + 14, 14, g.gy - Y(20) - 34); ctx.fillRect(g.L + 406, Y(20) + 14, 14, g.gy - Y(20) - 34); });
        for (let m = 0; m <= 20; m += 5) { Q41.line(ctx, [[g.L + 450, Y(m)], [g.L + 462, Y(m)]], '#334155', 1.3); Q42.T(ctx, m + ' m', g.L + 484, Y(m), { s: 9, w: 800, c: '#334155' }); }
        for (let k = .5; k <= t + 1e-6; k += .5) { K.raw(ctx, () => { ctx.globalAlpha = .4; }); Q52.ball(ctx, bx, Y(D.st(S, k).y), 7, '#78716c'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); }
        Q52.ball(ctx, bx, Y(q.y) - 2, 8, '#57534e'); if (t > 0) Q52.arrow(ctx, bx + 16, Y(q.y), 0, -q.v * 3, '#2563eb', 'v', 3); Q42.T(ctx, 'الارتفاع ' + Q52.f(q.y, 1) + ' m', bx - 80, Y(q.y), { s: 10, w: 900, c: '#fff', bg: '#7c3aed' }); }
      if (S.pr === 'p3') { const s = .15, X = m => g.x0 + 20 + m * s, Y = m => g.gy - m * s; K.raw(ctx, () => { ctx.fillStyle = '#65a30d'; ctx.fillRect(g.L + 10, g.gy, w - g.L - 22, 10); });
        for (let m = 0; m <= 3000; m += 500) Q42.T(ctx, m + ' m', X(m), g.gy - 10, { s: 9, w: 800, c: '#14532d' });
        const PP = []; for (let i = 0; i <= 50; i++) { const tk = 20 * i / 50; if (tk > t) break; PP.push([X(150 * tk), Y(2000 - 5 * tk * tk)]); } Q52.plot(ctx, PP, '#ea580c', 2.4);
        for (let k = 0; k <= t + 1e-6; k += 4) { const qk = D.st(S, k); K.raw(ctx, () => { ctx.globalAlpha = .35; }); Q52.ball(ctx, X(qk.x), Y(qk.y), 5, '#92400e'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); Q41.line(ctx, [[X(qk.x), Y(2000) + 8], [X(qk.x), Y(qk.y)]], 'rgba(15,23,42,.15)', 1, [3, 4]); }
        K.raw(ctx, () => { const px = X(q.px), py = Y(2000); ctx.save(); ctx.translate(px, py); ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(0, 0, 30, 6, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.moveTo(-4, 0); ctx.lineTo(-12, -16); ctx.lineTo(4, 0); ctx.fill(); ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(-32, -11); ctx.lineTo(-20, 0); ctx.fill(); ctx.fillStyle = '#38bdf8'; ctx.fillRect(18, -3, 8, 3); ctx.restore(); });
        K.raw(ctx, () => { ctx.fillStyle = '#92400e'; rr(ctx, X(q.x) - 6, Y(q.y) - 5, 12, 10, 2); ctx.fill(); });
        if (t > 0) { Q52.arrow(ctx, X(q.x), Y(q.y), 150 * .25, 0, '#16a34a', 'vx', 2.4); Q52.arrow(ctx, X(q.x), Y(q.y), 0, -q.v * .25, '#dc2626', 'vy', 2.4); }
        Q42.T(ctx, '2000 m', X(0) - 2, Y(1000), { s: 10, w: 900, c: '#fff', bg: '#7c3aed' }); Q41.line(ctx, [[X(0) - 18, Y(2000)], [X(0) - 18, g.gy]], '#7c3aed', 1.3, [4, 3]);
        Q42.T(ctx, 'الحقيبة تبقى تحت الطائرة', X(2300), 252, { s: 10, w: 900, c: '#334155', bg: 'rgba(255,255,255,.85)' }); }
      if (S.pr === 'p4') { const pm = 7, Y = m => g.gy - m * pm, bx = g.L + 260; K.raw(ctx, () => { ctx.fillStyle = '#65a30d'; ctx.fillRect(g.L + 10, g.gy, w - g.L - 22, 10); });
        for (let m = 0; m <= 45; m += 15) { Q41.line(ctx, [[g.L + 40, Y(m)], [g.L + 52, Y(m)]], '#334155', 1.3); Q42.T(ctx, m + ' m', g.L + 72, Y(m), { s: 9, w: 800, c: '#334155' }); }
        Q41.line(ctx, [[bx - 60, Y(45)], [bx + 60, Y(45)]], '#7c3aed', 1.3, [4, 3]);
        for (let k = 1; k <= t + 1e-6; k += 1) { const qk = D.st(S, k), dx = k <= 3 ? -14 : 14; K.raw(ctx, () => { ctx.globalAlpha = .4; }); Q52.ball(ctx, bx + dx, Y(qk.y), 7, '#78716c'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); Q42.T(ctx, k + ' s', bx + dx * 3, Y(qk.y), { s: 9, w: 800, c: '#475569' }); }
        const dx = t <= 3 ? -14 : 14; Q52.ball(ctx, bx + (t > 0 ? dx : 0), Y(q.y) - 7, 8, '#57534e'); if (Math.abs(q.v) > .3) Q52.arrow(ctx, bx + dx * 2.4, Y(q.y) - 7, 0, -q.v * 2.4, '#2563eb', 'v', 3); Q42.T(ctx, 'y = ' + Q52.f(q.y, 1) + ' m', bx + 100, Y(q.y) - 7, { s: 10, w: 900, c: '#fff', bg: '#7c3aed' }); }
      // v-t graph (top-left)
      if (S.p.graph) { const T = P.T, vr = { p1: [0, 30, 5, 10], p2: [-20, 0, 5, 10], p3: [-200, 0, 25, 50], p4: [-30, 30, 10, 30] }[S.pr];
        const A = Q52.axes(ctx, { x: g.L + 56, y: 86, w: 300, h: 110, x1: T, y0: vr[0], y1: vr[1], xs: T / 10, ys: vr[2], lx: T / 5, ly: vr[3], xl: 't (s)', yl: S.pr === 'p3' ? 'vy (m/s)' : 'v (m/s)', col: '#2563eb' });
        const F = [], PP = []; for (let i = 0; i <= 60; i++) { const tk = T * i / 60; F.push([A.X(tk), A.Y(D.st(S, tk).v)]); if (tk <= t + 1e-6) PP.push(F[i]); } Q52.plot(ctx, F, 'rgba(37,99,235,.25)', 1.6, [4, 4]); Q52.plot(ctx, PP, '#2563eb', 2.8); Q41.dot(ctx, A.X(t), A.Y(q.v), '#dc2626', 4.5); }
      // time scrubber
      const s0 = g.L + 340, s1 = w - 110, sy = g.h - 172; Q41.slider(ctx, s0, s1, sy, t / P.T, '', '#ea580c'); Q42.T(ctx, 't = ' + Q52.f(t, 2) + ' s', s1 + 52, sy, { s: 10.5, w: 900, c: '#fff', bg: '#ea580c' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.q); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      if (S.ex) Q52.steps(ctx, S, { title: P.n + ' ص 50', q: P.q, lines: P.lines, k: S.k }, { wd: 330 });
      else Q52.card(ctx, S, [{ t: 't = ' + Q52.f(t, 2) + ' s', mono: 1 }, { t: (S.pr === 'p3' ? 'vy = ' : 'v = ') + Q52.f(q.v, 1) + ' m/s', mono: 1, c: '#2563eb', w: 900 }].concat(q.x != null ? [{ t: 'x = ' + Q52.f(q.x, 1) + ' m', mono: 1, c: '#ea580c' }] : []).concat(q.y != null ? [{ t: 'y = ' + Q52.f(q.y, 1) + ' m', mono: 1, c: '#7c3aed' }] : []).concat(S.pr === 'p3' ? [{ t: 'v = ' + Q52.f(Math.hypot(150, q.v), 1) + ' m/s', mono: 1, c: '#dc2626' }] : []).concat([{ t: 'اضغط «الحل خطوة خطوة» للحل', c: '#be185d', w: 800 }]), { title: P.n });
      Q42.banner(ctx, w, 'اختر مسألة، شغّلها أو اسحب مؤشر الزمن، ثم تابع الحل', '#ea580c');
    },
    chips(S, g) { return { p: Q52.play(S, 'pl', g.h - 172, S.run, S2 => { if (S2.tt >= PR[S2.pr].T) S2.tt = 0; S2.run = S2.run ? 0 : 1; }, S2 => { S2.tt = 0; S2.run = 0; }, { bw: 125 }),
      q: Q42.chips(S, 'pr', Object.keys(PR).map(k => [k, PR[k].n]), g.h - 128, S.pr, (S2, k) => { S2.pr = k; S2.tt = 0; S2.run = 1; S2.ex = 0; }, { bw: 170, col: '#ea580c' }),
      e: Q52.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { S2.tt = 0; S2.run = 1; }, 7) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), s0 = g.L + 340, s1 = S.W - 110;
      return [Q41.sdrag('tm', s0, s1, g.h - 172, S.tt / PR[S.pr].T, (S2, f) => { S2.run = 0; S2.tt = f * PR[S2.pr].T; }, { tip: 'اسحب مؤشر الزمن', extra: { idle: 'اسحب ✋' } })].concat(C.p, C.q, C.e); },
    readings(S) { const q = D.st(S, S.tt); return [rd('المسألة', PR[S.pr].n), rd('الزمن', Q52.f(S.tt, 2) + ' s'), rd('السرعة', Q52.f(q.v, 1) + ' m/s')].concat(q.x != null ? [rd('الإزاحة الأفقية', Q52.f(q.x, 1) + ' m')] : []).concat(q.y != null ? [rd('الارتفاع', Q52.f(q.y, 1) + ' m')] : []); },
    explain(S) { return Q26.ex('كل مسألة تتحرك أمامك ومخطط السرعة − الزمن يُرسم معها، فتقرأ النتائج من الشاشة وتقارنها بالحل.', 'نختار المعادلة التي تحتوي على المجهول وعلى المعطيات: vf = vi + at للسرعة والزمن، و vf² = vi² + 2aΔx عند غياب الزمن، ونعامل المقذوف الأفقي كحركتين مستقلتين.', 'مسافة التوقف للسيارة تزداد مع مربع سرعتها، لذلك تحدد سرعات قصوى قرب المدارس.'); }
  };
  M8.P[D.id] = D;
})();

/* ====================== wrappers ====================== */
/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g11_m_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g11_m_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g11_c2_frame', ch: 52, reg: X11, sec: '2-1 وصف الحركة + 2-2 أطر الإسناد + 2-3 الموقع والإزاحة والمسافة', page: 24, kind: 'نشاط',
  title: 'أطر الإسناد والموقع والإزاحة والمسافة',
  desc: 'نراقب زورقاً فيه أطفال من إطار الشاطئ ومن إطار الزورق لنرى أن الحركة نسبية، ونتعرف أنواع الحركة، ثم نحرك عداءً على محور x ونقارن الإزاحة بالمسافة في أمثلة الكتاب.',
  tags: 'إطار الإسناد نقطة الإسناد الموقع الإزاحة المسافة حركة انتقالية دورانية اهتزازية',
  fact: ['الميكانيك فرع من الفيزياء يدرس الحركة، ويقسم إلى الكاينماتيك (وصف الحركة دون النظر إلى مسبباتها) والداينمك (مسببات الحركة كالقوة والطاقة) (ص 24).', 'في حياتنا المألوفة نتخذ الأرض وما عليها من أشجار وطرق ومنازل أطر إسناد على فرض أنها ساكنة (ص 24).', 'لتحديد موقع صديقك نحتاج ثلاثة أشياء: المقدار 20 m ، والاتجاه نحو الشرق، ونقطة الإسناد باب المدرسة (ص 25).'],
  quiz: [
    { q: 'الحركة تعبير يعود إلى التغير في موقع الجسم نسبة إلى:', o: ['إطار إسناد معين', 'أحد النجوم', 'السحب', 'الشمس'], a: 0, why: 'س1 فقرة 1 ص 47.' },
    { q: 'الأطفال الجالسون في زورق متحرك يكونون:', o: ['ساكنين بالنسبة للزورق ومتحركين بالنسبة للشاطئ', 'متحركين بالنسبة للزورق', 'ساكنين بالنسبة للشاطئ'], a: 0, why: 'الشكل 2 ص 24.' },
    { q: 'عداء تحرك من xi = +5 m إلى xf = +1 m. إزاحته:', o: ['−4 m', '+4 m', '+6 m', '−6 m'], a: 0, why: 'ص 26: Δx = 1 − 5.' },
    { q: 'عداء تحرك من 5 m إلى 20 m ثم رجع إلى 5 m. إزاحته والمسافة التي قطعها:', o: ['صفر و 30 m', '30 m و صفر', '15 m و 30 m'], a: 0, why: 'ص 26.' },
    { q: 'حركة البندول حركة:', o: ['اهتزازية', 'دورانية', 'انتقالية'], a: 0, why: 'ص 24.' }],
  parts: [{ id: 'g11_m_frame', n: 'أطر الإسناد: الزورق والشاطئ وأنواع الحركة' }, { id: 'g11_m_disp', n: 'الموقع والإزاحة والمسافة: العداء' }] });
M8.merge({ id: 'g11_c2_vel', ch: 52, reg: X11, sec: '2-4 السرعة المتوسطة + 2-5 الانطلاق المتوسط + 2-6 السرعة الآنية', page: 26, kind: 'مثال',
  title: 'السرعة المتوسطة والانطلاق المتوسط والسرعة الآنية',
  desc: 'نرسم مخطط الإزاحة − الزمن لسيارة ونحسب السرعة المتوسطة من ميل القاطع ثم نقرّب النقطتين لنصل إلى المماس والسرعة الآنية، ونقارن انطلاق شاحنتين على طريقين مختلفين، ونحل مثال 1 خطوة خطوة.',
  tags: 'السرعة المتوسطة الانطلاق المتوسط السرعة الآنية الميل المماس مثال 1',
  fact: ['الرقم الذي نقرؤه على اللوحة أمام سائق السيارة يشير إلى الانطلاق الآني للسيارة ولا يعين اتجاهها (هل تعلم ص 32).', 'إشارة السرعة المتوسطة تتخذ إشارة الإزاحة نفسها، وبتعجيل منتظم v̄ = (vi + vf) / 2 (فكر ص 27).', 'إذا انتقل جسم ما على مسار مستقيم فإن مقدار سرعته المتوسطة يساوي انطلاقه المتوسط (فكر ص 29).'],
  quiz: [
    { q: 'سيارة موقعها 2 m عند 1 s و 32 m عند 4 s. سرعتها المتوسطة:', o: ['10 m/s', '8 m/s', '30 m/s', '11 m/s'], a: 0, why: 'ص 27: 30 / 3.' },
    { q: 'ميل المستقيم الواصل بين نقطتين في مخطط الإزاحة − الزمن يمثل:', o: ['السرعة المتوسطة', 'التعجيل', 'المسافة', 'الانطلاق الآني'], a: 0, why: 'ص 28.' },
    { q: 'الشاحنة M قطعت 130 m في 10 s والإزاحة 100 m. انطلاقها المتوسط:', o: ['13 m/s', '10 m/s', '23 m/s'], a: 0, why: 'ص 29.' },
    { q: 'في مثال 1: السرعة المتوسطة للرحلة كلها (600 m ذهاباً و 200 m رجوعاً في 100 s):', o: ['4 m/s', '8 m/s', '7.5 m/s', '6 m/s'], a: 0, why: 'ص 31: 400 / 100.' },
    { q: 'حجر قذف شاقولياً نحو الأعلى فوصل أعلى ارتفاع y ثم رجع إلى نقطة القذف. سرعته المتوسطة:', o: ['صفر', '2y / t', 'y / t', '½ (y / t)'], a: 0, why: 'س1 فقرة 9: الإزاحة صفر.' },
    { q: 'في أي نوع من الحركة يكون مقدار السرعة المتوسطة مساوياً لمقدار السرعة الآنية؟', o: ['الحركة بسرعة ثابتة', 'الحركة بتعجيل منتظم', 'السقوط الحر'], a: 0, why: 'س2 ص 49.' }],
  parts: [{ id: 'g11_m_avg', n: 'السرعة المتوسطة والآنية: ميل القاطع والمماس' }, { id: 'g11_m_trucks', n: 'الانطلاق المتوسط: الشاحنتان K و M' }, { id: 'g11_m_ex1', n: 'مثال 1: الذهاب إلى C والرجوع إلى B' }] });
M8.merge({ id: 'g11_c2_acc', ch: 52, reg: X11, sec: '2-7 الحركة بسرعة ثابتة + 2-8 التعجيل + 2-9 معادلات الحركة بتعجيل منتظم', page: 32, kind: 'مثال',
  title: 'السرعة الثابتة والتعجيل ومعادلات الحركة',
  desc: 'نشغّل سيارة بسرعة ثابتة ثم بتسارع وتباطؤ ونراقب مخططات x−t و v−t و a−t تُرسم مع معادلات الحركة الأربع، ونحسب التعجيل من مخطط السرعة − الزمن في مثال 2، ونفرّق بين التعجيل الخطي والمركزي على المنعطف.',
  tags: 'سرعة ثابتة تعجيل معادلات الحركة مثال 2 تعجيل مركزي مخطط السرعة الزمن',
  fact: ['السيارة في الشكل 11 تقطع 150 m كل 15 s فسرعتها ثابتة 10 m/s ، ومخطط الإزاحة − الزمن لها خط مستقيم (ص 32).', 'عندما تسير المركبة على منعطف أفقي بانطلاق ثابت يتغير اتجاه سرعتها فيكون لها تعجيل يسمى التعجيل المركزي ac (ص 33).', 'عندما يبدأ الجسم بالحركة من السكون vi = 0 تصبح المعادلة الأخيرة vf = √(2aΔx) (ص 34).'],
  quiz: [
    { q: 'عند رسم مخطط السرعة − الزمن يكون الخط المستقيم الأفقي معبراً عن جسم:', o: ['سرعته ثابتة في المقدار والاتجاه', 'سرعته تساوي صفراً', 'سرعته متزايدة بانتظام', 'سرعته متناقصة بانتظام'], a: 0, why: 'س1 فقرة 6.' },
    { q: 'في مخطط الإزاحة − الزمن يكون الخط المستقيم المائل للأعلى نحو اليمين معبراً عن جسم:', o: ['سرعته ثابتة في المقدار والاتجاه', 'سرعته تساوي صفراً', 'سرعته متزايدة بانتظام', 'سرعته متناقصة بانتظام'], a: 0, why: 'س1 فقرة 7.' },
    { q: 'دراجة تتحرك في شارع مستقيم بتباطؤ منتظم. مخطط السرعة − الزمن لها:', o: ['خط مستقيم يميل إلى الأسفل نحو اليمين', 'خط مستقيم يميل إلى الأعلى نحو اليمين', 'خط مستقيم أفقي', 'خط منحني يميل إلى الأعلى'], a: 0, why: 'س1 فقرة 8.' },
    { q: 'أي من الأمثلة الآتية لا تمتلك فيه السيارة تعجيلاً؟', o: ['سيارة على طريق مستقيمة بانطلاق ثابت 70 km/h', 'سيارة على منعطف أفقي بانطلاق ثابت 50 km/h', 'تناقصت سرعتها من 70 إلى 30 km/h خلال 20 s', 'انطلقت من السكون فبلغت 40 m/s بعد 60 s'], a: 0, why: 'س1 فقرة 5.' },
    { q: 'مثال 2: سرعة السيارة 30 m/s عند 15 s و 25 m/s عند 20 s. تعجيلها:', o: ['−1 m/s²', '1 m/s²', '0.25 m/s²', 'صفر'], a: 0, why: 'ص 35: تباطؤ.' },
    { q: 'سيارة تسير باتجاه −x وتعجيلها باتجاه −x. حركتها:', o: ['تسارع', 'تباطؤ', 'سرعة ثابتة'], a: 0, why: 'فكر ص 37: السرعة والتعجيل بالاتجاه نفسه.' },
    { q: 'دراجة تسير بانطلاق ثابت على منعطف أفقي تمتلك:', o: ['تعجيلاً مركزياً', 'تعجيلاً خطياً', 'لا تعجيل'], a: 0, why: 'س5 فقرة b ص 49.' }],
  parts: [{ id: 'g11_m_const', n: 'السرعة الثابتة والتعجيل: المخططات والمعادلات' }, { id: 'g11_m_ex2', n: 'مثال 2: التعجيل من مخطط السرعة − الزمن' }, { id: 'g11_m_turn', n: 'التعجيل الخطي والمركزي: المنعطف' }] });
M8.merge({ id: 'g11_c2_fall', ch: 52, reg: X11, sec: '2-10 تعجيل الجاذبية + 2-11 معادلات الحركة في السقوط الحر', page: 36, kind: 'مثال',
  title: 'تعجيل الجاذبية والسقوط الحر: برج بيزا ومثالا البناية والقذف للأعلى',
  desc: 'نكرر تجربة غاليلو من برج بيزا ونسقط التفاحة والريشة في أنبوب مفرغ، ثم نسقط كرة من سطح بناية ونقذف أخرى للأعلى مع الصور الومضية ومخططي الموقع والسرعة، ونحل المثالين 3 و 4 خطوة خطوة.',
  tags: 'تعجيل الجاذبية السقوط الحر غاليلو برج بيزا مثال 3 مثال 4',
  fact: ['تعجيل الجاذبية الأرضية قرب سطح الأرض يساوي تقريباً 9.81 m/s² أو 981 cm/s² ، ويختلف من مكان إلى آخر (ص 36).', 'اعتقد أرسطو قبل الميلاد أن الأجسام الثقيلة تسقط أسرع من الخفيفة، وفي القرن السادس عشر أثبت غاليلو بتجاربه خطأ ذلك (ص 36).', 'عند قذف كرة شاقولياً نحو الأعلى تكون سرعتها صفراً لحظة وصولها أعلى نقطة، لكن تعجيلها لا يساوي صفراً بل يبقى g (فكر ص 37).'],
  quiz: [
    { q: 'جسمان متماثلان في الشكل والحجم وزن أحدهما ضعف الآخر سقطا سوية من قمة برج بإهمال مقاومة الهواء:', o: ['يصلان باللحظة نفسها وبالانطلاق نفسه ويمتلكان التعجيل نفسه', 'الأثقل يصل أولاً ولهما التعجيل نفسه', 'يصلان معاً لكن الأثقل انطلاقه أكبر', 'يصلان معاً لكن الأثقل تعجيله أكبر'], a: 0, why: 'س1 فقرة 2.' },
    { q: 'تعجيل الجسم المقذوف شاقولياً نحو الأعلى بإهمال مقاومة الهواء:', o: ['يساوي تعجيل الجسم المقذوف شاقولياً نحو الأسفل', 'أكبر منه', 'أقل منه', 'أكبر من تعجيل الساقط سقوطاً حراً'], a: 0, why: 'س1 فقرة 3.' },
    { q: 'ما مقدار سرعة وتعجيل الجسم المقذوف نحو الأعلى وهو في قمة مساره؟', o: ['v = 0 و a = g نحو الأسفل', 'v = 0 و a = 0', 'v = g و a = 0'], a: 0, why: 'س3 ص 49.' },
    { q: 'سقطت كرة من سطح بناية فوصلت الأرض بعد 3 s (g = 10). ارتفاع البناية:', o: ['45 m', '30 m', '90 m', '15 m'], a: 0, why: 'مثال 3 ص 38.' },
    { q: 'قذفت كرة للأعلى بانطلاق 40 m/s. أعلى ارتفاع تصله:', o: ['80 m', '40 m', '160 m', '8 m'], a: 0, why: 'مثال 4 ص 39.' },
    { q: 'وصلت الريشة الأرض بعد الحجر في تجربة برج بيزا بسبب:', o: ['مقاومة الهواء', 'خفة وزنها', 'كبر تعجيلها'], a: 0, why: 'ص 36.' }],
  parts: [{ id: 'g11_m_galileo', n: 'تعجيل الجاذبية: برج بيزا والأنبوب المفرغ' }, { id: 'g11_m_fall', n: 'السقوط الحر والقذف للأعلى: المثالان 3 و 4' }] });
M8.merge({ id: 'g11_c2_proj', ch: 52, reg: X11, sec: '2-12 الحركة في بعدين: المقذوف الأفقي والمقذوف بزاوية', page: 40, kind: 'مثال',
  title: 'المقذوفات: القذف الأفقي من حافة وركلة كرة القدم',
  desc: 'نحلل حركة المقذوف إلى حركة أفقية بسرعة ثابتة وحركة شاقولية بتعجيل الجاذبية: نقذف كرة أفقياً ونقارنها بكرة ساقطة، ثم نركل كرة قدم بزوايا مختلفة ونقيس أعلى ارتفاع والزمن والمدى، ونحل المثالين 5 و 6.',
  tags: 'المقذوفات الحركة في بعدين المقذوف الأفقي المقذوف بزاوية المدى الأفقي مثال 5 مثال 6',
  fact: ['من أمثلة الحركة في بعدين: حركة جسم مقذوف بزاوية في مجال الجاذبية، وجزيئات الماء الساقطة من الشلال، وحركة الشرارات الكهربائية (ص 40).', 'المسار الذي يتخذه المقذوف بزاوية فوق الأفق بشكل القطع المكافئ (ص 42).', 'أكبر مدى تقطعه القذيفة يكون عندما تكون زاوية إطلاقها 45° ، وعندها Rmax = vi² / g (ص 44).'],
  quiz: [
    { q: 'شخص على سطح بناية يحمل كرتين متماثلتين، قذف الحمراء أفقياً وأفلت الخضراء سقوطاً حراً في اللحظة نفسها:', o: ['تصلان الأرض في آن واحد لكن انطلاق الحمراء أكبر لحظة الوصول', 'الحمراء تصل قبل الخضراء وبانطلاق أكبر', 'الخضراء تصل قبل الحمراء وبانطلاق أكبر', 'تصلان في آن واحد وبانطلاق متساوٍ'], a: 0, why: 'س1 فقرة 10.' },
    { q: 'راكب دراجة يتحرك بانطلاق ثابت بخط مستقيم قذف كرة شاقولياً نحو الأعلى بإهمال مقاومة الهواء. الكرة ستسقط:', o: ['بيده', 'أمامه', 'خلفه', 'أي من الاحتمالات حسب انطلاق الكرة'], a: 0, why: 'س1 فقرة 4: للكرة سرعة الدراجة الأفقية نفسها.' },
    { q: 'المركبة الأفقية لسرعة المقذوف بإهمال مقاومة الهواء:', o: ['ثابتة طوال المسار', 'تزداد', 'تقل', 'صفر في القمة'], a: 0, why: 'ص 42.' },
    { q: 'مثال 6: ركلت كرة بسرعة 20 m/s وبزاوية 37°. مداها الأفقي:', o: ['38.4 m', '40 m', '7.2 m', '24 m'], a: 0, why: 'ص 45: 16 × 2.4.' },
    { q: 'أعظم مدى أفقي لمقذوف سرعته الابتدائية 20 m/s (g = 10):', o: ['40 m', '20 m', '80 m', '38.4 m'], a: 0, why: 'ص 46: vi² / g.' },
    { q: 'قذفت كرة أفقياً بسرعة 40 m/s فضربت الأرض بسرعة 50 m/s. المركبة الشاقولية لسرعة الاصطدام:', o: ['−30 m/s', '−10 m/s', '−50 m/s', '−90 m/s'], a: 0, why: 'مثال 5 ص 41.' }],
  parts: [{ id: 'g11_m_horiz', n: 'المقذوف الأفقي: مثال 5' }, { id: 'g11_m_angle', n: 'المقذوف بزاوية: ركلة كرة القدم مثال 6' }] });
M8.merge({ id: 'g11_c2_review', ch: 52, reg: X11, sec: 'أسئلة الفصل الثاني ومسائله', page: 47, kind: 'مثال',
  title: 'مسائل الفصل الثاني على الجهاز: الكوابح والجسر والطائرة والقذف للأعلى',
  desc: 'نشاهد كل مسألة من مسائل الكتاب متحركة مع مخطط السرعة − الزمن، ونحلها خطوة خطوة، مع أسئلة الاختيار من متعدد في نهاية الفصل.',
  tags: 'أسئلة الفصل الثاني مسائل الحركة',
  fact: ['العداد أمام السائق يقرأ 70 km/h خلال مدة: هذا يعني أن انطلاقها ثابت، ولا يكفي لنعرف أن سرعتها ثابتة لأن الاتجاه قد يتغير (س4 ص 49).', 'الدراجة التي تسير بانطلاق ثابت على طريق مستقيم لا تمتلك تعجيلاً، وعلى منعطف أفقي تمتلك تعجيلاً مركزياً (س5 ص 49).'],
  quiz: [
    { q: 'سيارة سرعتها 30 m/s تباطأت بمقدار 6 m/s². الإزاحة حتى تتوقف:', o: ['75 m', '150 m', '30 m', '5 m'], a: 0, why: 'م1 ص 50.' },
    { q: 'حجر سقط من جسر فوصل الماء بعد 2 s (g = 10). ارتفاع الجسر:', o: ['20 m', '10 m', '40 m', '5 m'], a: 0, why: 'م2 ص 50.' },
    { q: 'طائرة تحلق أفقياً بسرعة 150 m/s على ارتفاع 2000 m سقطت منها حقيبة. البعد الأفقي لنقطة الاصطدام:', o: ['3000 m', '2000 m', '1500 m', '300 m'], a: 0, why: 'م3: t = 20 s.' },
    { q: 'حجر قذف للأعلى فوصل قمة مساره بعد 3 s. سرعة قذفه:', o: ['30 m/s', '15 m/s', '45 m/s', '10 m/s'], a: 0, why: 'م4 ص 50.' },
    { q: 'عداد سيارة يشير إلى 70 km/h طوال مدة زمنية. السيارة تتحرك حتماً:', o: ['بانطلاق ثابت', 'بسرعة ثابتة', 'بتعجيل ثابت لا يساوي صفراً'], a: 0, why: 'س4 ص 49: العداد يقرأ الانطلاق فقط.' }],
  parts: [{ id: 'g11_m_prob', n: 'المسائل م1–م4 ص 50' }] });
