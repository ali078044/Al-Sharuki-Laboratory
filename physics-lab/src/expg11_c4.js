'use strict';
/* ====================== الخامس العلمي — الفصل الرابع: الاتزان والعزوم (ch 54, ص 74–92) ======================
   Merged experiments (book order): g11_c4_eq (4-1 … 4-3) · g11_c4_torque (4-4 + نشاط المفتاح + مثال 2) · g11_c4_tvec (4-5, 4-6 + مثال 3)
   · g11_c4_ladder (مثال 4 + م3) · g11_c4_couple (4-7) · g11_c4_cm (4-8, 4-9) · g11_c4_review (أسئلة ومسائل ص 89–92).
   Local kit Q54 = Q42 + planks, pivots, walls, ropes, spanner, bolt, spring balance, curved rotation arrows, ⊙/⊗ symbols. */
const Q54 = Object.assign(Object.create(Q42), {
  G: 10,
  d2r(d) { return d * Math.PI / 180; },
  r2d(r) { return r * 180 / Math.PI; },
  ez(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  f(v, d = 2) { let r = +(+v).toFixed(d); if (Object.is(r, -0) || Math.abs(r) < Math.pow(10, -d) / 2) r = 0; return String(r).replace('-', '−'); },
  sgn(v, d = 2) { const s = Q54.f(v, d); return (v > 0 && s !== '0' ? '+' : '') + s; },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f0f9ff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  geo(S, o = {}) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 14, x1 = o.full ? w - 14 : w - (o.cw || 336), y0 = o.y0 || 58, y1 = h - (o.bot || 150); return { w, h, L, x0, x1, y0, y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 }; },
  vec(ctx, x0, y0, x1, y1, col, lab, o) { Q51.vec(ctx, x0, y0, x1, y1, col, lab, o); },
  /* force arrow from point (x,y) in math direction a (deg), length len px */
  fv(ctx, x, y, a, len, col, lab, o = {}) { const r = Q54.d2r(a); if (o.toward) Q51.vec(ctx, x - Math.cos(r) * len, y + Math.sin(r) * len, x, y, col, lab, o); else Q51.vec(ctx, x, y, x + Math.cos(r) * len, y - Math.sin(r) * len, col, lab, o); },
  /* wooden plank between two screen points, thickness th */
  plank(ctx, ax, ay, bx, by, th = 14, o = {}) {
    const a = Math.atan2(by - ay, bx - ax), L = Math.hypot(bx - ax, by - ay);
    K.raw(ctx, () => { ctx.save(); ctx.translate(ax, ay); ctx.rotate(a); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
      const g = ctx.createLinearGradient(0, -th / 2, 0, th / 2); const c = o.col || ['#fcd34d', '#d97706', '#92400e']; g.addColorStop(0, c[0]); g.addColorStop(.5, c[1]); g.addColorStop(1, c[2]); ctx.fillStyle = g; rr(ctx, 0, -th / 2, L, th, Math.min(4, th / 3)); ctx.fill(); ctx.shadowColor = 'transparent';
      if (!o.plain) { ctx.strokeStyle = 'rgba(120,53,15,.35)'; ctx.lineWidth = 1; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(4, -th / 2 + k * th / 4); for (let x = 4; x < L - 4; x += 18) ctx.lineTo(x, -th / 2 + k * th / 4 + Math.sin(x / 23 + k) * 1.2); ctx.stroke(); } }
      ctx.strokeStyle = 'rgba(69,26,3,.55)'; ctx.lineWidth = 1; rr(ctx, 0, -th / 2, L, th, Math.min(4, th / 3)); ctx.stroke(); ctx.restore(); });
  },
  /* metal rod (thin) */
  rod(ctx, ax, ay, bx, by, th = 8, col) { const a = Math.atan2(by - ay, bx - ax), L = Math.hypot(bx - ax, by - ay);
    K.raw(ctx, () => { ctx.save(); ctx.translate(ax, ay); ctx.rotate(a); const g = ctx.createLinearGradient(0, -th / 2, 0, th / 2); const c = col || ['#e5e7eb', '#9ca3af', '#4b5563']; g.addColorStop(0, c[0]); g.addColorStop(.45, c[1]); g.addColorStop(1, c[2]); ctx.fillStyle = g; rr(ctx, 0, -th / 2, L, th, th / 2); ctx.fill(); ctx.restore(); }); },
  /* triangular fulcrum, apex at (x,y) */
  pivot(ctx, x, y, s = 30, col = '#64748b') {
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2; const g = ctx.createLinearGradient(x - s / 2, 0, x + s / 2, 0); g.addColorStop(0, shade(col, 40)); g.addColorStop(.5, col); g.addColorStop(1, shade(col, -40)); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + s * .6, y + s); ctx.lineTo(x - s * .6, y + s); ctx.closePath(); ctx.fill(); ctx.restore(); });
  },
  /* hinge pin */
  pin(ctx, x, y, r = 6) { K.raw(ctx, () => { const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 1, x, y, r); g.addColorStop(0, '#f8fafc'); g.addColorStop(1, '#475569'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.2; ctx.stroke(); }); },
  /* brick wall: rectangle x,y,w,h */
  wall(ctx, x, y, w, h) {
    K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.fillStyle = '#b45309'; ctx.fillRect(x, y, w, h); ctx.strokeStyle = 'rgba(254,243,199,.75)'; ctx.lineWidth = 1.5;
      for (let j = 0; y + j * 12 < y + h; j++) { const yy = y + j * 12; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke(); for (let xx = x + (j % 2 ? 12 : 0); xx < x + w; xx += 24) { ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx, yy + 12); ctx.stroke(); } }
      const g = ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, 'rgba(0,0,0,.18)'); g.addColorStop(1, 'rgba(255,255,255,.08)'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h); ctx.restore(); });
  },
  /* floor / ground strip with hatch */
  ground(ctx, x0, x1, y, o = {}) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + 16); g.addColorStop(0, o.c1 || '#94a3b8'); g.addColorStop(1, o.c2 || '#cbd5e1'); ctx.fillStyle = g; ctx.fillRect(x0, y, x1 - x0, 16); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(71,85,105,.5)'; for (let x = x0 + 6; x < x1; x += 12) { ctx.beginPath(); ctx.moveTo(x, y + 2); ctx.lineTo(x - 8, y + 14); ctx.stroke(); } });
  },
  ceiling(ctx, x0, x1, y) { K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; ctx.fillRect(x0, y - 12, x1 - x0, 12); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(71,85,105,.6)'; for (let x = x0 + 4; x < x1; x += 10) { ctx.beginPath(); ctx.moveTo(x, y - 2); ctx.lineTo(x + 8, y - 11); ctx.stroke(); } }); },
  rope(ctx, pts, col = '#78350f', w = 2.2) { K.raw(ctx, () => { ctx.lineCap = 'round'; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = w * .35; ctx.setLineDash([3, 4]); ctx.stroke(); ctx.setLineDash([]); }); },
  /* shiny ball */
  ball(ctx, x, y, r, col = '#2563eb') { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const g = ctx.createRadialGradient(x - r * .35, y - r * .4, r * .1, x, y, r); g.addColorStop(0, '#ffffff'); g.addColorStop(.25, shade(col, 50)); g.addColorStop(1, shade(col, -40)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore(); }); },
  /* curved rotation arrow around (x,y): dir +1 = CCW (math positive), −1 = CW */
  rot(ctx, x, y, r, dir, col, lab, o = {}) {
    if (!dir) return; const a0 = o.a0 != null ? o.a0 : 200, span = o.span || 120, s = Q54.d2r(a0), e = Q54.d2r(a0 + span * dir);
    K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = o.al != null ? o.al : 1; ctx.strokeStyle = col; ctx.lineWidth = o.w || 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r, -s, -e, dir > 0); ctx.stroke();
      const ex = x + Math.cos(e) * r, ey = y - Math.sin(e) * r, tx = -Math.sin(e) * dir, ty = -Math.cos(e) * dir, hl = 11; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(ex + tx * hl * .6, ey + ty * hl * .6); ctx.lineTo(ex - tx * hl * .6 + ty * hl * .55, ey - ty * hl * .6 - tx * hl * .55); ctx.lineTo(ex - tx * hl * .6 - ty * hl * .55, ey - ty * hl * .6 + tx * hl * .55); ctx.closePath(); ctx.fill(); ctx.restore(); });
    if (lab) { const m = Q54.d2r(a0 + span * dir / 2); Q42.T(ctx, lab, x + Math.cos(m) * (r + 16), y - Math.sin(m) * (r + 16), { s: 11, w: 900, c: col, bg: 'rgba(255,255,255,.85)' }); }
  },
  /* ⊙ (out of page) / ⊗ (into page) */
  oio(ctx, x, y, r, out, col = '#7c3aed') { K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = col; if (out) { ctx.beginPath(); ctx.arc(x, y, r * .28, 0, TAU); ctx.fill(); } else { const q = r * .55; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - q, y - q); ctx.lineTo(x + q, y + q); ctx.moveTo(x + q, y - q); ctx.lineTo(x - q, y + q); ctx.stroke(); } }); },
  /* hexagonal bolt head at (x,y) rotated by a (rad) */
  bolt(ctx, x, y, r, a) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 6; const g = ctx.createLinearGradient(-r, -r, r, r); g.addColorStop(0, '#f1f5f9'); g.addColorStop(.5, '#94a3b8'); g.addColorStop(1, '#334155'); ctx.fillStyle = g; ctx.beginPath(); for (let k = 0; k < 6; k++) { const t = k * TAU / 6; k ? ctx.lineTo(Math.cos(t) * r, Math.sin(t) * r) : ctx.moveTo(Math.cos(t) * r, Math.sin(t) * r); } ctx.closePath(); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(r * .55, 0, r * .14, 0, TAU); ctx.fill(); ctx.restore(); }); },
  /* open-ended spanner from bolt centre (x,y), math angle a (deg), arm length L px */
  spanner(ctx, x, y, a, L, hr = 22) { const r = -Q54.d2r(a);
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4; const g = ctx.createLinearGradient(0, -14, 0, 14); g.addColorStop(0, '#f8fafc'); g.addColorStop(.35, '#cbd5e1'); g.addColorStop(.7, '#64748b'); g.addColorStop(1, '#334155'); ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, hr * 1.55, Q54.d2r(35), Q54.d2r(325)); ctx.lineTo(hr * .9, -hr * .62); ctx.lineTo(hr * .1, -hr * .62); ctx.lineTo(hr * .1, hr * .62); ctx.lineTo(hr * .9, hr * .62); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(hr * 1.2, -10); ctx.lineTo(L, -8); ctx.arc(L, 0, 8, -Math.PI / 2, Math.PI / 2); ctx.lineTo(hr * 1.2, 10); ctx.closePath(); ctx.fill(); ctx.shadowColor = 'transparent';
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(hr * 1.6, -6, L - hr * 2, 3); ctx.strokeStyle = 'rgba(15,23,42,.18)'; ctx.lineWidth = 1; for (let k = 0; k <= 6; k++) { const xx = hr * 1.6 + (L - hr * 1.6) * k / 6; ctx.beginPath(); ctx.moveTo(xx, 4); ctx.lineTo(xx, 8); ctx.stroke(); } ctx.restore(); }); },
  /* spring balance from hook point (x0,y0) to handle (x1,y1); reading F (N), max fmax */
  balance(ctx, x0, y0, x1, y1, F, fmax = 30) {
    const a = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0); if (L < 30) return;
    K.raw(ctx, () => { ctx.save(); ctx.translate(x0, y0); ctx.rotate(a); ctx.lineCap = 'round';
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(5, 0, 5, Math.PI * .5, Math.PI * 1.9); ctx.stroke(); ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(L * .3, 0); ctx.stroke();
      const b0 = L * .3, bl = Math.max(40, L * .55); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 6; const g = ctx.createLinearGradient(0, -9, 0, 9); g.addColorStop(0, '#fef3c7'); g.addColorStop(.5, '#fbbf24'); g.addColorStop(1, '#b45309'); ctx.fillStyle = g; rr(ctx, b0, -9, bl, 18, 5); ctx.fill(); ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#fff'; rr(ctx, b0 + 6, -5, bl - 12, 10, 3); ctx.fill(); ctx.strokeStyle = '#78350f'; ctx.lineWidth = .8; for (let k = 0; k <= 10; k++) { const xx = b0 + 8 + (bl - 16) * k / 10; ctx.beginPath(); ctx.moveTo(xx, -5); ctx.lineTo(xx, k % 5 ? -2 : 1); ctx.stroke(); }
      const t = clamp(F / fmax, 0, 1), px = b0 + 8 + (bl - 16) * t; ctx.fillStyle = '#dc2626'; ctx.fillRect(px - 1.5, -6, 3, 12);
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(b0 + bl, 0); ctx.lineTo(L - 12, 0); ctx.stroke(); ctx.fillStyle = '#1e293b'; rr(ctx, L - 14, -7, 14, 14, 7); ctx.fill(); ctx.restore(); });
  },
  /* small labelled box weight hanging at (x,y top) */
  load(ctx, x, y, wd, ht, lab, col = '#a16207') { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const g = ctx.createLinearGradient(x - wd / 2, y, x + wd / 2, y + ht); g.addColorStop(0, shade(col, 60)); g.addColorStop(1, shade(col, -30)); ctx.fillStyle = g; rr(ctx, x - wd / 2, y, wd, ht, 4); ctx.fill(); ctx.restore(); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; rr(ctx, x - wd / 2, y, wd, ht, 4); ctx.stroke(); }); if (lab) Q42.T(ctx, lab, x, y + ht / 2, { s: 11, w: 900, c: '#fff' }); },
  /* simple person (painter / child) standing with feet at (x,y), height hh */
  person(ctx, x, y, hh = 70, col = '#2563eb', o = {}) {
    const s = hh / 70; K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(-3, -26); ctx.moveTo(6, 0); ctx.lineTo(3, -26); ctx.stroke();
      ctx.fillStyle = col; rr(ctx, -10, -50, 20, 27, 6); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-8, -46); ctx.lineTo(o.armL || -16, -30); ctx.moveTo(8, -46); ctx.lineTo(o.armR || 16, -30); ctx.stroke();
      ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(0, -59, 9, 0, TAU); ctx.fill(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(0, -62, 9, Math.PI, TAU); ctx.fill(); ctx.restore(); });
  },
  /* lever arm / dimension marker between two points with a label */
  dim(ctx, ax, ay, bx, by, lab, col = '#0f766e', off = 0) { const a = Math.atan2(by - ay, bx - ax), nx = -Math.sin(a) * off, ny = Math.cos(a) * off; Q41.line(ctx, [[ax + nx, ay + ny], [bx + nx, by + ny]], col, 1.6, [5, 3]); Q41.dot(ctx, ax + nx, ay + ny, col, 3); Q41.dot(ctx, bx + nx, by + ny, col, 3); if (lab) Q42.T(ctx, lab, (ax + bx) / 2 + nx * 1.9, (ay + by) / 2 + ny * 1.9, { s: 11, w: 900, c: col, bg: 'rgba(255,255,255,.88)' }); },
  stepChips(S, id, y, x0, lab, onEx, n = 9, bw = 160) { return Q51.stepChips(S, id, y, x0, lab, onEx, n, bw); },
  drawSteps(ctx, list) { Q51.drawSteps(ctx, list); },
  /* torque status pill */
  pill(ctx, x, y, t, col) { Q42.T(ctx, t, x, y, { s: 12, w: 900, c: '#fff', bg: col }); }
});
const Q54C = { F: '#dc2626', W: '#16a34a', T: '#2563eb', N: '#7c3aed', f: '#d97706', R: '#0891b2', tau: '#be185d', arm: '#0f766e' };

/* ====================== laws ====================== */
LW({ id: 'g11_l4_eq', cat: 54, name: 'شرط الاتزان الانتقالي', fx: 'Σ<b>F</b> = 0 &nbsp;⇐&nbsp; Σ<i>F</i><sub>x</sub> = 0 ، Σ<i>F</i><sub>y</sub> = 0', sym: 'محصلة القوى الخارجية المؤثرة في الجسم صفر، فيبقى ساكناً (اتزان سكوني) أو يتحرك بسرعة ثابتة بخط مستقيم (اتزان حركي). مثال 1: T = F / cos53° = 15 / 0.6 = 25 N', calc: { in: [['F', 'القوة الأفقية F', 'N', 15], ['w', 'الوزن w', 'N', 20]], out: 'الشد T = √(F² + w²)', u: 'N', f: v => Math.hypot(v.F, v.w) } });
LW({ id: 'g11_l4_tau', cat: 54, name: 'عزم القوة', fx: 'τ = <i>F</i> ℓ sin θ = <i>F</i><sub>⊥</sub> ℓ', sym: 'τ العزم (N·m) ، F القوة ، ℓ بعد نقطة تأثير القوة عن محور الدوران ، θ الزاوية بين ذراع القوة واتجاهها. ℓ sinθ هو البعد العمودي لخط عمل القوة عن المحور. يكون العزم أعظمياً عندما θ = 90° وصفراً عندما θ = 0', calc: { in: [['F', 'القوة F', 'N', 20], ['l', 'الذراع ℓ', 'm', .2], ['th', 'الزاوية θ', '°', 37]], out: 'العزم τ', u: 'N·m', f: v => v.F * v.l * Math.sin(v.th * Math.PI / 180) } });
LW({ id: 'g11_l4_vec', cat: 54, name: 'العزم كمية متجهة', fx: '<b>τ</b> = <b>r</b> × <b>F</b> &nbsp; , &nbsp; τ<sub>net</sub> = τ<sub>1</sub> + τ<sub>2</sub> + τ<sub>3</sub> + …', sym: 'اتجاه العزم عمودي على المستوي الذي يحوي r و F ويُعيَّن بقاعدة الكف اليمنى. يكون العزم موجباً إذا سبب دوراناً بعكس عقارب الساعة وسالباً مع عقارب الساعة. والعزم يعتمد على النقطة التي يُحسب حولها', calc: { in: [['F1', 'F1 أفقية على الحافة', 'N', 5], ['R1', 'R1', 'm', 1], ['F2', 'F2 شاقولية', 'N', 6], ['R2', 'R2', 'm', .5]], out: 'Στ = −F1R1 + F2R2', u: 'N·m', f: v => -v.F1 * v.R1 + v.F2 * v.R2 } });
LW({ id: 'g11_l4_rot', cat: 54, name: 'شرط الاتزان الدوراني', fx: 'Σ<b>τ</b> = 0', sym: 'محصلة العزوم حول أي محور تساوي صفراً، فلا يدور الجسم أو يدور بسرعة زاوية ثابتة. الاتزان السكوني التام يتطلب ΣF = 0 و Στ = 0 معاً', calc: { in: [['w1', 'وزن الطرف الأول', 'N', 350], ['x1', 'بعده عن المرتكز', 'm', 2], ['w2', 'وزن الطرف الثاني', 'N', 800]], out: 'بعد الثاني ليتزن', u: 'm', f: v => v.w1 * v.x1 / v.w2 } });
LW({ id: 'g11_l4_ladder', cat: 54, name: 'اتزان السلم على جدار أملس', fx: 'tan θ = ' + FR('1', '2μ<sub>s</sub>'), sym: 'سلم منتظم يستند إلى جدار أملس وأرض خشنة: f = P و N = mg ، ومن العزوم حول قاعدته P ℓ sinθ = mg (ℓ/2) cosθ. أصغر زاوية مع الأرض لا ينزلق عندها السلم. مثال 4: μs = 0.4 فإن θ = 51°', calc: { in: [['mu', 'معامل الاحتكاك السكوني μs', '', .4]], out: 'أصغر زاوية θ', u: '°', f: v => Math.atan(1 / (2 * v.mu)) * 180 / Math.PI } });
LW({ id: 'g11_l4_couple', cat: 54, name: 'عزم المزدوج', fx: 'τ = <i>F</i> × <i>d</i>', sym: 'المزدوج قوتان متساويتان مقداراً متعاكستان اتجاهاً وخطا عملهما متوازيان. محصلتهما صفر فلا يتحرك الجسم انتقالياً، لكنه يدور. عزمه يساوي القوة × البعد العمودي بينهما ولا يعتمد على النقطة التي يحسب حولها', calc: { in: [['F', 'القوة F', 'N', 6], ['d', 'البعد العمودي d', 'm', 4]], out: 'عزم المزدوج', u: 'N·m', f: v => v.F * v.d } });
LW({ id: 'g11_l4_cm', cat: 54, name: 'مركز الكتلة', fx: '<i>x</i><sub>cm</sub> = ' + FR('<i>m</i><sub>1</sub><i>x</i><sub>1</sub> + <i>m</i><sub>2</sub><i>x</i><sub>2</sub>', '<i>m</i><sub>1</sub> + <i>m</i><sub>2</sub>'), sym: 'مركز الكتلة نقطة إذا مر بها خط عمل القوة تحرك الجسم انتقالياً دون دوران، ويقع أقرب إلى الكتلة الأكبر. ومركز الثقل نقطة يبدو أن وزن الجسم كله مركز فيها، ويُعيَّن بتعليق الجسم من نقطتين ورسم الشاقول', calc: { in: [['m1', 'm1', 'kg', 1], ['x1', 'x1', 'm', 0], ['m2', 'm2', 'kg', 3], ['x2', 'x2', 'm', 1]], out: 'موقع مركز الكتلة', u: 'm', f: v => (v.m1 * v.x1 + v.m2 * v.x2) / (v.m1 + v.m2) } });

/* =============== A1 — شرط الاتزان الانتقالي: كرة معلقة بخيط وقوة أفقية (4-1، 4-2، مثال 1 ص 75 + م6 ص 92) =============== */
(() => {
  const CS = { ex1: [15, 20], m6: [80, 60] };
  const EX = {
    ex1: { title: 'مثال 1 ص 75', q: 'كرة معلقة بخيط أثرت فيها قوة أفقية F = 15 N فاتزنت والخيط يصنع زاوية 53° مع السقف. جد الشد T ووزن الكرة w ، علماً أن cos53° = 0.6 و sin53° = 0.8', lines: ['ΣFx = 0 :  T cos53° − F = 0', 'T × 0.6 = 15', 'T = 15 / 0.6 = 25 N', 'ΣFy = 0 :  T sin53° − w = 0', 'w = 25 × 0.8', 'w = 20 N'] },
    m6: { title: 'م6 ص 92', q: 'أثرت قوة أفقية 80 N في جسم كتلته 6 kg معلق بحبل. ما مقدار الشد T واتجاهه ليبقى الجسم متزناً؟ g = 10 N/kg', lines: ['w = mg = 6 × 10 = 60 N', 'ΣFx = 0 :  T sinφ = 80', 'ΣFy = 0 :  T cosφ = 60', 'T = √(80² + 60²) = 100 N', 'tanφ = 80 / 60 = 1.33', 'الزاوية مع الشاقول φ = 53°'] } };
  const D = { id: 'g11_p_eqtrans', page: 74, fig: 'الشكلان 1 و 2 + مثال 1 + م6',
    desc: 'يكون الجسم في حالة اتزان انتقالي عندما تكون محصلة القوى الخارجية المؤثرة فيه صفراً: ΣF = 0 أي ΣFx = 0 و ΣFy = 0. فيبقى ساكناً (اتزان سكوني) أو يتحرك بسرعة ثابتة بخط مستقيم (اتزان حركي). نطبق الشرط على كرة معلقة بخيط تسحبها قوة أفقية.',
    tags: 'الاتزان الانتقالي محصلة القوى صفر ΣF=0 ΣFx ΣFy اتزان سكوني اتزان حركي الشد الوزن مثال 1 كرة معلقة 53 25N 20N م6 100N',
    tools: ['حامل وسقف', 'خيط', 'كرة', 'ميزان نابضي أفقي'],
    steps: ['اسحب مقبض الميزان النابضي أفقياً لتغيير القوة F ، وراقب ميل الخيط.', 'غيّر وزن الكرة w من اللوحة: كلما زاد الوزن قلّ ميل الخيط عن الشاقول.', 'لاحظ مضلع القوى: الأسهم الثلاثة رأساً لذيل تكوّن مثلثاً مغلقاً لأن ΣF = 0.', 'فعّل «داخل قطار» لترى أن الاتزان نفسه يتحقق والجسم يتحرك بسرعة ثابتة: اتزان حركي.', 'اضغط «حل المثال» لحل مثال 1 أو م6 خطوة خطوة.'],
    concl: ['شرط الاتزان الانتقالي: ΣF = 0 أي ΣFx = 0 و ΣFy = 0.', 'مثال 1: T cos53° = 15 فإن T = 25 N ، و w = T sin53° = 20 N.', 'م6: T = √(80² + 60²) = 100 N بزاوية 53° مع الشاقول.', 'الاتزان سكوني إذا كان الجسم ساكناً، وحركي إذا تحرك بسرعة ثابتة بخط مستقيم.'],
    laws: ['g11_l4_eq'],
    controls: [R('F', 'القوة الأفقية F', 0, 100, 15, 1, 'N'), R('w', 'وزن الكرة w', 5, 100, 20, 1, 'N'), TG('poly', 'مضلع القوى', true, null, 'vector'), TG('dyn', 'داخل قطار بسرعة ثابتة', false, null, 'trail')],
    setup(S) { S.cs = 'ex1'; S.al = 90 - Q54.r2d(Math.atan2(S.p.F, S.p.w)); S.sk = 3; S.off = 0; S.ex = 0; S.k = 0; },
    tgt(S) { return 90 - Q54.r2d(Math.atan2(S.p.F, S.p.w)); },
    update(S, dt) { const T = Math.hypot(S.p.F, S.p.w); S.al = Q54.ez(S.al, D.tgt(S), dt, 5); S.sk = Q54.ez(S.sk, 125 / Math.max(28, T), dt, 4); if (S.p.dyn) S.off += dt * 160; },
    geo(S) { const g = Q54.geo(S); g.cy0 = g.y0 + 40; g.Cx = g.x0 + 80; g.Ls = Math.min(220, (g.y1 - g.y0) * .42); return g; },
    pos(S, g) { const a = Q54.d2r(S.al); const bx = g.Cx + Math.cos(a) * g.Ls, by = g.cy0 + Math.sin(a) * g.Ls; return { bx, by, hx: bx + 110 + S.p.F * 1.3 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.pos(S, g), F = S.p.F, W = S.p.w, T = Math.hypot(F, W), k = S.sk, al = S.al, a = Q54.d2r(al);
      Q54.bg(ctx, w, h);
      if (S.p.dyn) K.raw(ctx, () => { ctx.save(); rr(ctx, g.x0, g.y0 - 6, g.x1 - g.x0, g.Ls + 150, 14); ctx.clip(); const gr = ctx.createLinearGradient(0, g.y0, 0, g.y0 + g.Ls + 140); gr.addColorStop(0, '#e0f2fe'); gr.addColorStop(1, '#f1f5f9'); ctx.fillStyle = gr; ctx.fillRect(g.x0, g.y0 - 6, g.x1 - g.x0, g.Ls + 150);
        ctx.fillStyle = 'rgba(34,197,94,.35)'; for (let i = -1; i < 8; i++) { const x = g.x1 - ((S.off + i * 90) % 720 + 720) % 720 * .6; ctx.beginPath(); ctx.arc(x, g.y0 + g.Ls + 120, 30, Math.PI, TAU); ctx.fill(); } ctx.restore(); });
      Q54.ceiling(ctx, g.x0 + 20, g.x1 - 20, g.cy0);
      Q54.rope(ctx, [[g.Cx, g.cy0], [P.bx, P.by]], '#475569', 2.2); Q54.pin(ctx, g.Cx, g.cy0, 5);
      Q51.arc(ctx, g.Cx, g.cy0, 42, -al, 0, '#be185d', Math.round(al) + '°', { lo: 20, fill: 'rgba(219,39,119,.08)' });
      Q51.dash(ctx, [[P.bx, P.by], [P.bx, P.by + 120]], '#94a3b8', 1.2);
      Q54.balance(ctx, P.bx + 16, P.by, P.hx, P.by, F, 100);
      Q54.ball(ctx, P.bx, P.by, 18, '#2563eb');
      Q54.fv(ctx, P.bx, P.by, 180 - al, T * k, Q54C.T, 'T', { side: -1 });
      Q54.fv(ctx, P.bx, P.by, 270, W * k, Q54C.W, 'w', { side: -1 });
      if (F > .5) Q54.fv(ctx, P.bx, P.by - 22, 0, F * k, Q54C.F, 'F', { side: -1, off: 14 });
      // force polygon
      if (S.p.poly) { const px0 = g.x0 + 40, py0 = g.cy0 + g.Ls + 130, kk = Math.min(k, 150 / Math.max(F, W, 1)), ax = px0 + F * kk, ay = py0 + W * kk;
        Q42.T(ctx, 'مضلع القوى: رأس لذيل', px0 + 200, py0 - 6, { s: 11.5, w: 900, c: '#334155' });
        Q54.vec(ctx, px0, py0, ax, py0, Q54C.F, 'F', { w: 3.5, side: -1 }); Q54.vec(ctx, ax, py0, ax, ay, Q54C.W, 'w', { w: 3.5, side: -1 }); Q54.vec(ctx, ax, ay, px0, py0, Q54C.T, 'T', { w: 3.5, side: -1 });
        Q42.T(ctx, 'مثلث مغلق', px0 + 50, Math.max(ay, py0) + 26, { s: 11.5, w: 900, c: '#fff', bg: '#16a34a' }); Q42.T(ctx, 'ΣF = 0', px0 + 130, Math.max(ay, py0) + 26, { s: 12, w: 900, c: '#fff', bg: '#16a34a' }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q54.drawSteps(ctx, C.e);
      if (S.ex) Q42.steps(ctx, S, Object.assign({}, EX[S.cs === 'm6' ? 'm6' : 'ex1'], { k: S.k }), { y: 64, x: w - 12, wd: 316 });
      else Q42.card(ctx, S, [{ t: 'ΣFx = T cosα − F = ' + Q54.f(T * Math.cos(Q54.d2r(D.tgt(S))) - F, 1), mono: 1, c: Q54C.F, w: 900 }, { t: 'ΣFy = T sinα − w = ' + Q54.f(T * Math.sin(Q54.d2r(D.tgt(S))) - W, 1), mono: 1, c: Q54C.W, w: 900 },
        { t: 'T = √(F² + w²) = ' + Q54.f(T, 1) + ' N', mono: 1, c: Q54C.T, w: 900 }, { t: 'الزاوية مع السقف: ' + Q54.f(D.tgt(S), 1) + '°', c: '#be185d', w: 800 }, { t: 'الزاوية مع الشاقول: ' + Q54.f(90 - D.tgt(S), 1) + '°', c: '#be185d', w: 800 },
        { t: S.p.dyn ? 'اتزان حركي: سرعة ثابتة بخط مستقيم' : 'اتزان سكوني: الكرة ساكنة', c: '#0f766e', w: 900 }], { title: 'شرط الاتزان الانتقالي', y: 64, wd: 316 });
      Q42.banner(ctx, w, 'اسحب مقبض الميزان النابضي أفقياً');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', [['ex1', 'مثال 1 ص 75'], ['m6', 'م6 ص 92'], ['free', 'حر']], g.h - 128, S.cs, (S2, k) => { S2.cs = k; S2.ex = 0; if (CS[k]) { setParam(S2, 'F', CS[k][0]); setParam(S2, 'w', CS[k][1]); } }, { bw: 130 }),
      e: Q54.stepChips(S, 'ex', g.h - 84, g.L, S.cs === 'm6' ? 'حل م6' : 'حل مثال 1', S2 => { const c = S2.cs === 'm6' ? 'm6' : 'ex1'; S2.cs = c; setParam(S2, 'F', CS[c][0]); setParam(S2, 'w', CS[c][1]); }, 6) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = D.pos(S, g), C = D.chips(S, g);
      return [{ id: 'hand', x: P.hx - 7, y: P.by, r: 20, axis: 'x', keep: true, tip: 'اسحب لتغيير القوة F', idle: 'اسحب ✋', drag: (S2, d) => { const P2 = D.pos(S2, g); setParam(S2, 'F', clamp(Math.round(S2.p.F + (d.x - P2.hx + 7) * .25), 0, 100)); S2.cs = 'free'; } },
        { id: 'ball', x: P.bx, y: P.by, r: 20, axis: 'none', hint: false, tip: 'اضغط: مضلع القوى', click: S2 => setParam(S2, 'poly', !S2.p.poly) }].concat(C.c, C.e); },
    readings(S) { const F = S.p.F, W = S.p.w, T = Math.hypot(F, W); return [rd('القوة الأفقية F', Q54.f(F, 1) + ' N'), rd('الوزن w', Q54.f(W, 1) + ' N'), rd('الشد T', Q54.f(T, 1) + ' N'), rd('الزاوية مع السقف', Q54.f(D.tgt(S), 1) + '°'), rd('محصلة القوى', '0 N')]; },
    record(S) { const F = S.p.F, W = S.p.w; return { F, w: W, T: +Math.hypot(F, W).toFixed(2), a: +D.tgt(S).toFixed(1) }; },
    cols: [['F', 'F (N)'], ['w', 'w (N)'], ['T', 'T (N)'], ['a', 'α (°)']],
    explain(S) { return Q26.ex('كلما زادت القوة الأفقية مال الخيط أكثر عن الشاقول وزاد الشد، والأسهم الثلاثة تكوّن مثلثاً مغلقاً.', 'الكرة متزنة فمحصلة القوى صفر: المركبة الأفقية للشد تعادل F والمركبة الشاقولية تعادل الوزن، لذا T = √(F² + w²).', 'المصباح المعلق في عربة قطار يسير بسرعة ثابتة يبقى في حالة اتزان حركي كما لو كان القطار ساكناً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — شرط الاتزان الدوراني: قوى متلاقية وغير متلاقية (4-3، الشكلان 3 و 4 ص 76) =============== */
(() => {
  const DIRS = [90, 210, 330];
  const D = { id: 'g11_p_eqrot', page: 76, fig: 'الشكلان 3 و 4',
    desc: 'قد تكون محصلة القوى صفراً ومع ذلك يدور الجسم. في الشكل 3 تتلاقى خطوط عمل القوى الثلاث في نقطة واحدة O فلا يدور الجسم، وفي الشكل 4 القوى نفسها لكنها غير متلاقية فيدور. لذا يلزم شرط ثانٍ للاتزان: محصلة العزوم صفر Στ = 0. والجسم في اتزان سكوني تام إذا تحقق الشرطان معاً.',
    tags: 'الاتزان الدوراني محصلة العزوم صفر Στ=0 قوى متلاقية غير متلاقية خط عمل القوة الشكل 3 الشكل 4 شرطا الاتزان',
    tools: ['لوح خفيف على منضدة هوائية', 'ثلاث نافثات هواء مثبتة على اللوح'],
    steps: ['ابدأ بالشكل 3: خطوط عمل القوى الثلاث تمر بالنقطة O ، فاللوح لا يدور.', 'اسحب نقطة تأثير القوة F3 جانباً، أو اختر الشكل 4: القوى نفسها والمحصلة صفر لكن اللوح يدور.', 'راقب Στ في البطاقة: كلما زادت الإزاحة زاد العزم وزادت سرعة الدوران.', 'فعّل «اتزان حركي» ليتحرك اللوح بسرعة ثابتة دون أن يدور.'],
    concl: ['ΣF = 0 وحده لا يكفي: الشرط الثاني للاتزان Στ = 0.', 'القوى المتلاقية في نقطة واحدة لا تولد محصلة عزوم حول تلك النقطة.', 'القوى نفسها إذا لم تتلاقَ تولد عزماً فيدور الجسم.', 'الاتزان السكوني التام: ΣF = 0 و Στ = 0 معاً.'],
    laws: ['g11_l4_eq', 'g11_l4_rot'],
    controls: [R('F', 'مقدار كل قوة', 2, 10, 6, .5, 'N'), R('d', 'إزاحة خط عمل F3', -40, 40, 0, 1, 'cm'), TG('lines', 'خطوط عمل القوى', true, null, 'lines'), TG('drift', 'اتزان حركي', false, null, 'trail')],
    setup(S) { S.ang = 0; S.om = 0; S.ox = 0; S.cs = 'f3'; },
    geo(S) { const g = Q54.geo(S); g.ocx = g.cx; g.ocy = g.y0 + (g.y1 - g.y0) * .42; g.u = 3.2; return g; },
    /* body-frame application points (px) */
    pts(S) { const d = S.p.d * 3.2 * .5; return DIRS.map((a, i) => { const r = Q54.d2r(a), L = i === 0 ? 90 : 104; let x = Math.cos(r) * L, y = -Math.sin(r) * L; if (i === 2) { x += Math.sin(r) * d; y += Math.cos(r) * d; } return [x, y]; }); },
    world(S, g) { const c = Math.cos(S.ang), s = Math.sin(S.ang), X = g.ocx + S.ox; return D.pts(S).map(p => [X + p[0] * c - p[1] * s, g.ocy + p[0] * s + p[1] * c]); },
    tau(S, g) { const W = D.world(S, g), X = g.ocx + S.ox; let t = 0; W.forEach((p, i) => { const r = Q54.d2r(DIRS[i]) - S.ang, fx = Math.cos(r) * S.p.F, fy = Math.sin(r) * S.p.F, rx = (p[0] - X) / 200, ry = -(p[1] - g.ocy) / 200; t += rx * fy - ry * fx; }); return t; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), t = D.tau(S, g); S.om += t * 4 * dt; S.om *= Math.max(0, 1 - dt * 2.2); S.ang -= S.om * dt;
      if (S.p.drift) { S.ox += 45 * dt; const span = (g.x1 - g.x0) / 2 - 90; if (S.ox > span) S.ox = -span; } else S.ox = Q54.ez(S.ox, 0, dt, 3); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), W = D.world(S, g), X = g.ocx + S.ox, Y = g.ocy, t = D.tau(S, g), c = Math.cos(S.ang), s = Math.sin(S.ang);
      Q54.bg(ctx, w, h);
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.y0, 0, g.y1); gr.addColorStop(0, '#e0e7ff'); gr.addColorStop(1, '#c7d2fe'); ctx.fillStyle = gr; rr(ctx, g.x0, g.y0 + 6, g.x1 - g.x0, g.y1 - g.y0 - 70, 16); ctx.fill(); ctx.fillStyle = 'rgba(79,70,229,.18)'; for (let x = g.x0 + 14; x < g.x1; x += 22) for (let y = g.y0 + 20; y < g.y1 - 70; y += 22) { ctx.beginPath(); ctx.arc(x, y, 1.6, 0, TAU); ctx.fill(); } });
      Q42.T(ctx, 'منضدة هوائية: منظر من الأعلى', g.cx, g.y1 - 50, { s: 11, w: 800, c: '#4338ca' });
      // plate
      K.raw(ctx, () => { ctx.save(); ctx.translate(X, Y); ctx.rotate(S.ang); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 5; const gr = ctx.createLinearGradient(-90, -90, 90, 90); gr.addColorStop(0, 'rgba(255,255,255,.95)'); gr.addColorStop(1, 'rgba(186,230,253,.9)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(0, -122); ctx.lineTo(122, 64); ctx.lineTo(38, 96); ctx.lineTo(-122, 70); ctx.closePath(); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2.5; ctx.stroke();
        ctx.strokeStyle = 'rgba(3,105,161,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(12, 0); ctx.moveTo(0, -12); ctx.lineTo(0, 12); ctx.stroke(); ctx.restore(); });
      Q42.T(ctx, 'O', X - 14, Y + 14, { s: 13, w: 900, c: '#0369a1' });
      const len = S.p.F * 11;
      if (S.p.lines) W.forEach((p, i) => { const r = Q54.d2r(DIRS[i]) - S.ang, ux = Math.cos(r), uy = -Math.sin(r); Q51.dash(ctx, [[p[0] - ux * 230, p[1] - uy * 230], [p[0] + ux * 60, p[1] + uy * 60]], i === 2 ? '#db2777' : '#94a3b8', 1.3); });
      W.forEach((p, i) => { const r = Q54.d2r(DIRS[i]) - S.ang, ux = Math.cos(r), uy = -Math.sin(r); Q54.vec(ctx, p[0], p[1], p[0] + ux * len, p[1] + uy * len, ['#dc2626', '#2563eb', '#db2777'][i], 'F' + (i + 1), { side: i === 1 ? 1 : -1 }); Q41.dot(ctx, p[0], p[1], '#0f172a', 4); });
      Q41.knob(ctx, W[2][0], W[2][1], '#db2777', 8);
      if (Math.abs(t) > .02) Q54.rot(ctx, X, Y, 150, t > 0 ? 1 : -1, '#be185d', t > 0 ? 'يدور عكس عقارب الساعة' : 'يدور مع عقارب الساعة', { a0: 60, span: 70 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      const rotating = Math.abs(S.om) > .05 || Math.abs(t) > .02;
      Q42.card(ctx, S, [{ t: 'ΣF = F1 + F2 + F3 = 0', mono: 1, c: '#16a34a', w: 900 }, { t: 'الشرط الأول متحقق دائماً هنا', c: '#16a34a', w: 800 }, { t: 'Στ = ' + Q54.f(t, 2) + ' N·m', mono: 1, c: '#be185d', w: 900 }, { t: Math.abs(S.p.d) < .5 ? 'القوى متلاقية في O: الشكل 3' : 'القوى غير متلاقية: الشكل 4', c: '#334155', w: 800 }, { t: rotating ? 'اللوح يدور' : 'اللوح لا يدور', c: rotating ? '#dc2626' : '#16a34a', w: 900 }, { t: S.p.drift ? 'اتزان حركي: يتحرك بسرعة ثابتة' : 'اتزان سكوني عند توقف الدوران', c: '#0f766e', w: 800 }], { title: 'الشرط الثاني للاتزان الدوراني', y: 64, wd: 300 });
      Q42.banner(ctx, w, 'اسحب نقطة تأثير F3 جانباً');
    },
    chips(S, g) { return Q42.chips(S, 'cs', [['f3', 'الشكل 3: متلاقية'], ['f4', 'الشكل 4: غير متلاقية'], ['st', '■ أوقف اللوح']], g.h - 84, S.cs, (S2, k) => { if (k === 'st') { S2.om = 0; S2.ang = 0; return; } S2.cs = k; setParam(S2, 'd', k === 'f3' ? 0 : 30); S2.ang = 0; S2.om = 0; }, { bw: 180 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), W = D.world(S, g), r = Q54.d2r(DIRS[2]), px = Math.sin(r), py = Math.cos(r), c = Math.cos(S.ang), s = Math.sin(S.ang), wx = px * c - py * s, wy = px * s + py * c;
      return [{ id: 'f3', x: W[2][0], y: W[2][1], r: 20, axis: 'xy', keep: true, tip: 'اسحب لإزاحة خط عمل F3', idle: 'اسحب ✋', drag: (S2, d) => { const X = g.ocx + S2.ox, base = [X + Math.cos(r) * 104 * c + Math.sin(r) * 104 * s, g.ocy + Math.cos(r) * 104 * s - Math.sin(r) * 104 * c]; const v = ((d.x - base[0]) * wx + (d.y - base[1]) * wy) / 1.6; setParam(S2, 'd', clamp(Math.round(v), -40, 40)); S2.cs = Math.abs(S2.p.d) < .5 ? 'f3' : 'f4'; } }].concat(D.chips(S, g)); },
    readings(S) { const t = S.W ? D.tau(S, D.geo(S)) : 0; return [rd('محصلة القوى ΣF', '0 N'), rd('محصلة العزوم Στ', Q54.f(t, 2) + ' N·m'), rd('إزاحة خط عمل F3', Q54.f(S.p.d, 0) + ' cm'), rd('الحالة', Math.abs(t) > .02 ? 'يدور' : 'متزن')]; },
    explain(S) { return Q26.ex('عندما تتلاقى خطوط عمل القوى في O يبقى اللوح دون دوران، وعندما تزاح القوة F3 يدور اللوح رغم أن محصلة القوى صفر.', 'القوة التي لا يمر خط عملها بالنقطة O تولد عزماً حولها، فإذا لم تُعادَل العزوم كانت Στ ≠ 0 فيدور الجسم. لذا يلزم الشرطان: ΣF = 0 و Στ = 0.', 'لوحة الإعلانات المعلقة بحبلين تبقى مستقرة فقط إذا تعادلت القوى والعزوم معاً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — نشاط: العوامل التي يعتمد عليها العزم بمفتاح ربط وميزان نابضي (4-4، الأشكال 6–8 و 13 + مثال 2 ص 77–82) =============== */
(() => {
  const T0 = 1.5;
  const CS = { a: [10, .2, 90, 'F عمودية على الذراع'], b: [20, .2, 90, 'ضعف القوة 2F'], c: [10, .1, 90, 'ذراع أقصر ℓ2 < ℓ1'], d: [10, .2, 37, 'القوة بزاوية θ'], e: [10, .2, 0, 'على امتداد الذراع'] };
  const EX = { title: 'مثال 2 ص 81', q: 'مفتاح ربط طوله 0.20 m أثرت في نهايته قوة 20 N تصنع زاوية 37° مع ذراع المفتاح. احسب عزم القوة، علماً أن sin37° = 0.6', lines: ['نحلل القوة إلى مركبتين:', 'المركبة الموازية للذراع عزمها صفر', 'F⊥ = F sin37° = 20 × 0.6 = 12 N', 'τ = F⊥ × ℓ', 'τ = 12 × 0.20', 'τ = 2.4 N·m'] };
  const D = { id: 'g11_p_spanner', page: 77, fig: 'الأشكال 6 و 7 و 8 و 13 + مثال 2',
    desc: 'العزم هو قابلية القوة على تدوير الجسم حول محور. في النشاط نثبت مفتاح ربط على صامولة ونسحبه بميزان نابضي: يزداد العزم بزيادة القوة F ، وبزيادة بعد نقطة تأثيرها عن المحور ℓ ، ويعتمد على الزاوية θ بين القوة والذراع: τ = F ℓ sinθ. ويكون أعظمياً عندما تكون القوة عمودية على الذراع، وصفراً عندما تؤثر على امتداده.',
    tags: 'العزم نشاط مفتاح ربط صامولة ميزان نابضي τ=Fℓsinθ ذراع القوة البعد العمودي الشكل 7 الشكل 8 الشكل 13 فكر مثال 2 2.4 N·m',
    tools: ['مفتاح ربط', 'صامولة مثبتة بلوح', 'ميزان نابضي'],
    steps: ['الشكل 7a: اسحب الميزان عمودياً على الذراع عند نهايته، واقرأ القوة اللازمة لتدوير الصامولة.', 'الشكل 7b: ضاعف القوة فيدور المفتاح أسرع: العزم يتناسب مع F.', 'الشكل 7c: انقل نقطة التأثير أقرب إلى الصامولة فيصعب التدوير: العزم يتناسب مع ℓ.', 'الشكل 7d و 7e: غيّر الزاوية θ ، وعند θ = 0 لا تدور الصامولة مهما كبرت القوة.', 'اسحب مقبض الميزان لتغيير القوة والزاوية، واسحب النقطة الصفراء على الذراع لتغيير ℓ.'],
    concl: ['العزم يتناسب طردياً مع مقدار القوة F.', 'العزم يتناسب طردياً مع بعد نقطة التأثير عن محور الدوران ℓ.', 'τ = F ℓ sinθ ، و ℓ sinθ هو البعد العمودي بين خط عمل القوة والمحور.', 'أعظم عزم عندما θ = 90° ، وصفر عندما تؤثر القوة على امتداد الذراع θ = 0.', 'مثال 2: τ = 20 × 0.6 × 0.20 = 2.4 N·m.'],
    laws: ['g11_l4_tau'],
    controls: [R('F', 'قراءة الميزان F', 0, 40, 10, .5, 'N'), R('l', 'بعد نقطة التأثير ℓ', .04, .3, .2, .01, 'm'), R('th', 'الزاوية θ مع الذراع', 0, 180, 90, 1, '°'), TG('arm', 'البعد العمودي ℓ sinθ', true, null, 'line'), TG('comp', 'مركبتا القوة', false, null, 'vector')],
    setup(S) { S.cs = 'a'; S.phi = 0; S.bang = 0; S.back = 0; S.turns = 0; S.ex = 0; S.k = 0; S.vF = S.p.F; S.vth = S.p.th; S.vl = S.p.l; },
    tau(S) { return S.p.F * S.p.l * Math.sin(Q54.d2r(S.p.th)); },
    update(S, dt) { S.vF = Q54.ez(S.vF, S.p.F, dt, 9); S.vth = Q54.ez(S.vth, S.p.th, dt, 9); S.vl = Q54.ez(S.vl, S.p.l, dt, 9); const t = D.tau(S);
      if (S.back) { S.phi = Math.max(0, S.phi - dt * 90); if (S.phi <= 0) S.back = 0; }
      else if (t > T0 + 1e-6) { const om = (t - T0) * 22 + 6; S.phi += om * dt; S.bang += om * dt; S.turns += om * dt / 360; if (S.phi >= 40) S.back = 1; }
      else S.phi = Math.max(0, S.phi - dt * 25); },
    geo(S) { const g = Q54.geo(S); g.bx = g.x0 + 70; g.by = g.y0 + (g.y1 - g.y0) * .5; g.u = Math.min(1050, (g.x1 - g.bx - 26) / .3); return g; },
    pts(S, g) { const ph = Q54.d2r(S.phi), ps = Q54.d2r(S.phi + S.vth), Gx = g.bx + Math.cos(ph) * S.vl * g.u, Gy = g.by - Math.sin(ph) * S.vl * g.u, L = 110 + S.vF * 4; return { ph, ps, Gx, Gy, Hx: Gx + Math.cos(ps) * L, Hy: Gy - Math.sin(ps) * L }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.pts(S, g), t = S.vF * S.vl * Math.sin(Q54.d2r(S.vth)), turning = !S.back && D.tau(S) > T0 + 1e-6;
      Q54.bg(ctx, w, h);
      // board with bolt
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 12; const gr = ctx.createLinearGradient(g.bx - 60, 0, g.bx + 60, 0); gr.addColorStop(0, '#a16207'); gr.addColorStop(.5, '#ca8a04'); gr.addColorStop(1, '#854d0e'); ctx.fillStyle = gr; rr(ctx, g.bx - 55, g.by - 150, 110, 300, 10); ctx.fill(); ctx.restore(); });
      Q54.bolt(ctx, g.bx, g.by, 20, -Q54.d2r(S.bang));
      Q54.spanner(ctx, g.bx, g.by, S.phi, .3 * g.u + 10);
      // lever arm / perpendicular distance (fig 8)
      if (S.p.arm && S.vF > .3) { const ux = Math.cos(P.ps), uy = -Math.sin(P.ps), k = (g.bx - P.Gx) * ux + (g.by - P.Gy) * uy, fx = P.Gx + ux * k, fy = P.Gy + uy * k;
        Q51.dash(ctx, [[P.Gx - ux * 260, P.Gy - uy * 260], [P.Hx + ux * 30, P.Hy + uy * 30]], '#94a3b8', 1.3);
        if (Math.abs(Math.sin(Q54.d2r(S.vth))) > .05) { Q41.line(ctx, [[g.bx, g.by], [fx, fy]], Q54C.arm, 3); Q42.T(ctx, 'ℓ sinθ = ' + Q54.f(S.vl * Math.abs(Math.sin(Q54.d2r(S.vth))), 3) + ' m', (g.bx + fx) / 2 - 8, (g.by + fy) / 2 + (fy > g.by ? 16 : -16), { s: 11, w: 900, c: Q54C.arm, bg: 'rgba(255,255,255,.9)' }); } }
      Q54.dim(ctx, g.bx, g.by, P.Gx, P.Gy, 'ℓ = ' + Q54.f(S.vl, 2) + ' m', '#7c3aed', 26);
      Q54.balance(ctx, P.Gx, P.Gy, P.Hx, P.Hy, S.vF, 40);
      if (S.vF > .3) { const ox = -Math.sin(P.ps) * 20, oy = -Math.cos(P.ps) * 20; Q54.fv(ctx, P.Gx + ox, P.Gy + oy, S.phi + S.vth, S.vF * 4, Q54C.F, 'F', { side: 1, w: 4 });
        if (S.p.comp) { const a = S.vth, fp = S.vF * Math.sin(Q54.d2r(a)) * 4, fa = S.vF * Math.cos(Q54.d2r(a)) * 4; if (Math.abs(fp) > 3) Q54.fv(ctx, P.Gx, P.Gy, S.phi + 90, fp, '#be185d', 'F⊥', { w: 3, side: -1 }); if (Math.abs(fa) > 3) Q54.fv(ctx, P.Gx, P.Gy, S.phi, fa, '#0891b2', 'F∥', { w: 3, side: 1 }); } }
      Q51.arc(ctx, P.Gx, P.Gy, 30, S.phi, S.phi + S.vth, '#be185d', 'θ = ' + Math.round(S.vth) + '°', { lo: 22, fill: 'rgba(219,39,119,.08)' });
      Q41.knob(ctx, P.Gx, P.Gy, '#f59e0b', 8);
      if (turning) Q54.rot(ctx, g.bx, g.by, 44, 1, '#16a34a', '', { a0: 120, span: 100 });
      Q54.pill(ctx, g.bx, g.by + 175, turning ? 'الصامولة تدور' : S.back ? 'إعادة مسك المفتاح' : 'الصامولة لا تدور', turning ? '#16a34a' : S.back ? '#64748b' : '#dc2626');
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q54.drawSteps(ctx, C.e);
      const sn = Math.sin(Q54.d2r(S.p.th)), Fmin = sn > .01 ? T0 / (S.p.l * sn) : Infinity;
      if (S.ex) Q42.steps(ctx, S, Object.assign({}, EX, { k: S.k }), { y: 64, x: w - 12, wd: 316 });
      else Q42.card(ctx, S, [{ t: 'τ = F ℓ sinθ', mono: 1, c: '#be185d', w: 900, s: 14 }, { t: 'τ = ' + Q54.f(S.p.F, 1) + ' × ' + Q54.f(S.p.l, 2) + ' × sin' + Math.round(S.p.th) + '°', mono: 1, c: '#334155' }, { t: 'τ = ' + Q54.f(D.tau(S), 2) + ' N·m', mono: 1, c: '#be185d', w: 900 },
        { t: 'عزم الشد اللازم لتدوير الصامولة 1.5 N·m', c: '#64748b', s: 11.5 }, { t: 'أقل قوة تدير الصامولة: ' + (isFinite(Fmin) ? Q54.f(Fmin, 1) + ' N' : 'لا توجد'), c: '#b45309', w: 900 },
        { t: CS[S.cs] ? 'الشكل 7' + S.cs + ': ' + CS[S.cs][3] : 'تجربة حرة', c: '#0f766e', w: 800 }], { title: 'نشاط: عزم القوة', y: 64, wd: 316 });
      Q42.banner(ctx, w, 'اسحب مقبض الميزان النابضي');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', Object.keys(CS).map(k => [k, 'الشكل 7' + k, CS[k][3]]), g.h - 128, S.cs, (S2, k) => { S2.cs = k; S2.ex = 0; setParam(S2, 'F', CS[k][0]); setParam(S2, 'l', CS[k][1]); setParam(S2, 'th', CS[k][2]); }, { bw: 118 }),
      e: Q54.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 2 ص 81', S2 => { S2.cs = 'x'; setParam(S2, 'F', 20); setParam(S2, 'l', .2); setParam(S2, 'th', 37); }, 6) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = D.pts(S, g), C = D.chips(S, g);
      return [{ id: 'hand', x: P.Hx, y: P.Hy, r: 20, axis: 'xy', keep: true, tip: 'اسحب: القوة والزاوية', idle: 'اسحب ✋', drag: (S2, d) => { const P2 = D.pts(S2, g), dx = d.x - P2.Gx, dy = P2.Gy - d.y; let a = Q54.r2d(Math.atan2(dy, dx)) - S2.phi; a = ((a % 360) + 360) % 360; if (a > 180) a = a > 270 ? 0 : 180; setParam(S2, 'th', Math.round(a)); setParam(S2, 'F', clamp(Math.round((Math.hypot(dx, dy) - 110) / 4 * 2) / 2, 0, 40)); S2.cs = 'x'; } },
        { id: 'grip', x: P.Gx, y: P.Gy, r: 16, axis: 'xy', keep: true, hint: false, tip: 'اسحب على الذراع: ℓ', drag: (S2, d) => { const ph = Q54.d2r(S2.phi), v = ((d.x - g.bx) * Math.cos(ph) - (d.y - g.by) * Math.sin(ph)) / g.u; setParam(S2, 'l', clamp(Math.round(v * 100) / 100, .04, .3)); S2.cs = 'x'; } }].concat(C.c, C.e); },
    readings(S) { const sn = Math.sin(Q54.d2r(S.p.th)); return [rd('القوة F', Q54.f(S.p.F, 1) + ' N'), rd('البعد ℓ', Q54.f(S.p.l, 2) + ' m'), rd('الزاوية θ', Math.round(S.p.th) + '°'), rd('البعد العمودي ℓ sinθ', Q54.f(S.p.l * sn, 3) + ' m'), rd('العزم τ', Q54.f(D.tau(S), 2) + ' N·m'), rd('دورات الصامولة', Q54.f(S.turns, 2))]; },
    record(S) { return { F: S.p.F, l: S.p.l, th: S.p.th, tau: +D.tau(S).toFixed(3) }; },
    cols: [['F', 'F (N)'], ['l', 'ℓ (m)'], ['th', 'θ (°)'], ['tau', 'τ (N·m)']],
    explain(S) { return Q26.ex('تدور الصامولة بسهولة عندما تكون القوة كبيرة وعمودية على الذراع وبعيدة عن الصامولة، ولا تدور إذا سحبنا على امتداد الذراع.', 'العزم τ = F ℓ sinθ : يزداد بزيادة القوة وبزيادة بعد نقطة تأثيرها عن المحور، وأعظمه عندما θ = 90° ، ويساوي صفراً عندما يمر خط عمل القوة بالمحور.', 'لهذا نمسك مفتاح الربط من طرفه البعيد، ونضع مقبض الباب بعيداً عن مفاصله.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — عزم القوة في فتح الباب + فكر: أي القوتين أقل عزماً؟ (الشكل 5 والشكل ص 81 + س1 فقرة 3) =============== */
(() => {
  const K0 = 7.6, DL = .9;
  const D = { id: 'g11_p_door', page: 76, fig: 'الشكل 5 + فكر ص 81 + س1 فقرة 3',
    desc: 'عندما ندفع باباً فإنه يدور حول محور يمر بمفاصله. يعتمد العزم على مقدار القوة وبعد نقطة تأثيرها عن المفاصل والزاوية بين القوة والباب. نقارن بين بابين متماثلين لنعرف أي القوتين تولد عزماً أقل كما في سؤال «فكر» ص 81.',
    tags: 'الباب المفاصل محور الدوران العزم البعد عن المحور القوة العمودية فكر أي القوتين أقل عزماً س1 فقرة 3 10N 80cm 8 N·m الشكل 5',
    tools: ['باب بمفاصل ونابض غلق', 'ميزان نابضي'],
    steps: ['اسحب النقطة الحمراء على الباب لتغيير بعد نقطة الدفع عن المفاصل r.', 'اسحب يد الدافع حول النقطة لتغيير الزاوية θ بين القوة والباب.', 'كلما كبر العزم انفتح الباب أكثر ضد نابض الغلق.', 'اختر «فكر a» أو «فكر b» لمقارنة بابين جنباً إلى جنب.', 'اختر «س1 فقرة 3»: قوة 10 N عمودية على بعد 80 cm تولد 8 N·m.'],
    concl: ['الدفع قرب المفاصل يولد عزماً صغيراً، لذا يوضع المقبض بعيداً عنها.', 'القوة الموازية للباب والمارة بالمفاصل عزمها صفر.', 'س1 فقرة 3: τ = 10 × 0.8 = 8 N·m.'],
    laws: ['g11_l4_tau'],
    controls: [R('F', 'قوة الدفع F', 0, 20, 10, .5, 'N'), R('r', 'بعد نقطة الدفع r', .1, .9, .8, .05, 'm'), R('th', 'الزاوية θ مع الباب', 0, 180, 90, 1, '°'), TG('cmp', 'مقارنة بابين', false, null, 'layers')],
    setup(S) { S.cs = 'q3'; S.b = [0, 0]; S.om = [0, 0]; S.r2 = .9; S.th2 = 90; S.F2 = 10; },
    tauOf(S, i) { return i ? S.F2 * S.r2 * Math.sin(Q54.d2r(S.th2)) : S.p.F * S.p.r * Math.sin(Q54.d2r(S.p.th)); },
    update(S, dt) { for (let i = 0; i < 2; i++) { const t = D.tauOf(S, i); const a = (t - K0 * S.b[i] - 3.2 * S.om[i]) * 1.6; S.om[i] += a * dt; S.b[i] += S.om[i] * dt; if (S.b[i] < 0) { S.b[i] = 0; S.om[i] = Math.max(0, S.om[i]); } if (S.b[i] > 2.4) { S.b[i] = 2.4; S.om[i] = Math.min(0, S.om[i]); } } },
    geo(S) { const g = Q54.geo(S), cmp = S.p.cmp; g.u = Math.min(cmp ? 190 / DL : 300, (g.x1 - g.x0 - 110) / DL); g.hx = g.x0 + 60; g.hy = cmp ? [g.y0 + 270, g.y1 - 14] : [g.y0 + (g.y1 - g.y0) * .62]; return g; },
    P(S, g, i) { const b = S.b[i], r = i ? S.r2 : S.p.r, th = i ? S.th2 : S.p.th, hy = g.hy[i], px = g.hx + Math.cos(b) * r * g.u, py = hy - Math.sin(b) * r * g.u, ps = b + Q54.d2r(th), L = 60 + (i ? S.F2 : S.p.F) * 5; return { px, py, tx: px - Math.cos(ps) * L, ty: py + Math.sin(ps) * L, ps, hy }; },
    drawDoor(ctx, S, g, i, col, lab) {
      const hy = g.hy[i], b = S.b[i], P = D.P(S, g, i), F = i ? S.F2 : S.p.F, t = D.tauOf(S, i), Lp = DL * g.u;
      K.raw(ctx, () => { ctx.fillStyle = '#cbd5e1'; ctx.fillRect(g.x0, hy, g.hx - g.x0 - 6, 16); ctx.fillRect(g.hx + Lp + 8, hy, g.x1 - g.hx - Lp - 8, 16); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.strokeRect(g.x0, hy, g.hx - g.x0 - 6, 16); ctx.strokeRect(g.hx + Lp + 8, hy, g.x1 - g.hx - Lp - 8, 16);
        ctx.strokeStyle = 'rgba(100,116,139,.35)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(g.hx, hy, Lp, -Math.PI * .85, 0); ctx.stroke(); ctx.setLineDash([]); });
      Q54.plank(ctx, g.hx, hy, g.hx + Math.cos(b) * Lp, hy - Math.sin(b) * Lp, 14, { col: ['#e0f2fe', '#7dd3fc', '#0369a1'], plain: 1 });
      const kx = g.hx + Math.cos(b) * Lp * .93, ky = hy - Math.sin(b) * Lp * .93; Q41.dot(ctx, kx, ky, '#334155', 5);
      Q54.pin(ctx, g.hx, hy, 8); Q42.T(ctx, 'المفاصل', g.hx - 6, hy + 28, { s: 10.5, w: 800, c: '#475569' });
      Q42.T(ctx, lab, g.hx + 4, hy - Lp * .9 + 10, { s: 13, w: 900, c: col, a: 'left' });
      if (F > .2) { const L = 60 + F * 5; Q54.vec(ctx, P.tx, P.ty, P.px, P.py, col, i ? 'Fb' : 'Fa', { side: -1 }); Q41.knob(ctx, P.tx, P.ty, '#f59e0b', 10); }
      Q51.arc(ctx, P.px, P.py, 26, Q54.r2d(b) + 180, Q54.r2d(P.ps) + 180, '#be185d', Math.round(i ? S.th2 : S.p.th) + '°', { lo: 18 });
      Q41.knob(ctx, P.px, P.py, col, 8);
      if (S.b[i] > .03) Q54.rot(ctx, g.hx, hy, 50, 1, '#16a34a', '', { a0: 10, span: 60 });
      Q42.T(ctx, 'τ = ' + Q54.f(t, 2) + ' N·m', g.hx + Lp + 30, hy - 26, { s: 12.5, w: 900, c: '#fff', bg: col, a: 'right' });
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q54.bg(ctx, w, h);
      Q42.T(ctx, 'منظر من الأعلى', g.x0 + 60, g.y0 + 14, { s: 11, w: 800, c: '#475569' });
      D.drawDoor(ctx, S, g, 0, '#dc2626', S.p.cmp ? 'الباب a' : 'الباب');
      if (S.p.cmp) D.drawDoor(ctx, S, g, 1, '#2563eb', 'الباب b');
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      const ta = D.tauOf(S, 0), tb = D.tauOf(S, 1);
      const L = [{ t: 'τ = F r sinθ', mono: 1, c: '#be185d', w: 900, s: 14 }, { t: 'τa = ' + Q54.f(S.p.F, 1) + ' × ' + Q54.f(S.p.r, 2) + ' × sin' + Math.round(S.p.th) + '° = ' + Q54.f(ta, 2) + ' N·m', mono: 1, c: '#dc2626', w: 800 }];
      if (S.p.cmp) L.push({ t: 'τb = ' + Q54.f(S.F2, 1) + ' × ' + Q54.f(S.r2, 2) + ' × sin' + Math.round(S.th2) + '° = ' + Q54.f(tb, 2) + ' N·m', mono: 1, c: '#2563eb', w: 800 }, { t: Math.abs(ta - tb) < .01 ? 'العزمان متساويان' : (ta < tb ? 'القوة Fa تولد العزم الأقل' : 'القوة Fb تولد العزم الأقل'), c: '#0f766e', w: 900 });
      if (S.cs === 'q3') L.push({ t: 'س1 فقرة 3: باب يدفع بقوة 10 N على بعد 80 cm', c: '#b45309', w: 900 }, { t: 'τ = 10 × 0.8 = 8 N·m', mono: 1, c: '#b45309', w: 900 });
      L.push({ t: 'نابض الغلق يعيد الباب، فكلما كبر العزم زادت زاوية الفتح', c: '#64748b', s: 11.5 });
      Q42.card(ctx, S, L, { title: S.p.cmp ? 'فكر: أي القوتين أقل عزماً؟' : 'عزم القوة على الباب', y: 64, wd: 316 });
      Q42.banner(ctx, w, 'اسحب نقطة الدفع أو يد الدافع');
    },
    chips(S, g) { return Q42.chips(S, 'cs', [['q3', 'س1 فقرة 3'], ['ta', 'فكر a'], ['tb', 'فكر b'], ['free', 'حر']], g.h - 84, S.cs, (S2, k) => { S2.cs = k;
      if (k === 'q3') { setParam(S2, 'cmp', false); setParam(S2, 'F', 10); setParam(S2, 'r', .8); setParam(S2, 'th', 90); }
      if (k === 'ta') { setParam(S2, 'cmp', true); setParam(S2, 'F', 10); setParam(S2, 'r', .9); setParam(S2, 'th', 90); S2.F2 = 10; S2.r2 = .9; S2.th2 = 0; }
      if (k === 'tb') { setParam(S2, 'cmp', true); setParam(S2, 'F', 10); setParam(S2, 'r', .3); setParam(S2, 'th', 90); S2.F2 = 10; S2.r2 = .9; S2.th2 = 90; } }, { bw: 140 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), out = [];
      for (let i = 0; i < (S.p.cmp ? 2 : 1); i++) { const P = D.P(S, g, i), hy = g.hy[i];
        out.push({ id: 'pt' + i, x: P.px, y: P.py, r: 16, axis: 'xy', keep: true, tip: 'اسحب على الباب: r', idle: i ? undefined : 'اسحب ✋', hint: i ? false : undefined, drag: (S2, d) => { const b = S2.b[i], v = ((d.x - g.hx) * Math.cos(b) - (d.y - hy) * Math.sin(b)) / g.u, r = clamp(Math.round(v * 20) / 20, .1, .9); if (i) S2.r2 = r; else setParam(S2, 'r', r); S2.cs = 'free'; } },
          { id: 'hd' + i, x: P.tx, y: P.ty, r: 18, axis: 'xy', keep: true, hint: false, tip: 'اسحب يد الدافع: الزاوية والقوة', drag: (S2, d) => { const P2 = D.P(S2, g, i), dx = P2.px - d.x, dy = d.y - P2.py; let a = Q54.r2d(Math.atan2(dy, dx) - S2.b[i]); a = ((a % 360) + 360) % 360; if (a > 180) a = a > 270 ? 0 : 180; const F = clamp(Math.round((Math.hypot(dx, dy) - 60) / 5 * 2) / 2, 0, 20); if (i) { S2.th2 = Math.round(a); S2.F2 = F; } else { setParam(S2, 'th', Math.round(a)); setParam(S2, 'F', F); } S2.cs = 'free'; } }); }
      return out.concat(D.chips(S, g)); },
    readings(S) { const r = [rd('عزم Fa', Q54.f(D.tauOf(S, 0), 2) + ' N·m'), rd('زاوية فتح الباب', Math.round(Q54.r2d(S.b[0])) + '°')]; if (S.p.cmp) r.push(rd('عزم Fb', Q54.f(D.tauOf(S, 1), 2) + ' N·m')); return r; },
    explain(S) { return Q26.ex('ينفتح الباب أكثر كلما دفعناه بقوة أكبر وأبعد عن المفاصل وبزاوية أقرب إلى 90°.', 'العزم τ = F r sinθ ، فالقوة القريبة من المفاصل أو الموازية للباب تولد عزماً صغيراً أو صفراً.', 'لهذا يركّب مقبض الباب في الطرف البعيد عن المفاصل.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — العزم كمية متجهة τ = r × F وقاعدة الكف اليمنى والنقطة المرجعية (4-5، الأشكال 9–12 ص 79–80) =============== */
(() => {
  const CS = { o: [0, 0, 2.5, 1.5, 6, 100], a: [2.5, 1.5, 2.5, 1.5, 6, 100], ccw: [0, 0, 3, 0, 5, 90], cw: [0, 0, 3, 0, 5, 270] };
  const D = { id: 'g11_p_rhr', page: 79, fig: 'الأشكال 9 و 10 و 11 و 12',
    desc: 'العزم كمية متجهة: τ = r × F ، حيث r متجه الموقع من النقطة المرجعية إلى نقطة تأثير القوة. اتجاه العزم عمودي على المستوي الذي يحوي r و F ويُعيَّن بقاعدة الكف اليمنى: نوجه الأصابع باتجاه r ونلفها نحو F فيشير الإبهام إلى اتجاه العزم. العزم موجب إذا سبب دوراناً عكس عقارب الساعة (خارج من الصفحة ⊙) وسالب مع عقارب الساعة (داخل في الصفحة ⊗)، ويعتمد على النقطة التي يُحسب حولها.',
    tags: 'العزم كمية متجهة الضرب الاتجاهي r×F قاعدة الكف اليمنى خارج الصفحة داخل الصفحة موجب سالب عقارب الساعة النقطة المرجعية الشكل 9 الشكل 10 الشكل 11 الشكل 12',
    tools: ['قرص يدور حول محور', 'ورق رسم بياني'],
    steps: ['اسحب رأس السهم F لتغيير مقدار القوة واتجاهها، واسحب نقطة التأثير P.', 'لاحظ الرسم المجسم أسفل اللوحة: τ عمودي على المستوي، للأعلى ⊙ أو للأسفل ⊗.', 'اسحب النقطة المرجعية O نحو P أو على خط عمل القوة: يصبح العزم صفراً، فالعزم يعتمد على النقطة المرجعية.', 'اختر الشكل 12: F1 تدير عكس عقارب الساعة فعزمها موجب، و F2 مع عقارب الساعة فعزمها سالب.'],
    concl: ['τ = r × F ومقداره τ = r F sinθ.', 'اتجاه العزم عمودي على مستوي r و F ويُعيَّن بقاعدة الكف اليمنى.', 'العزم موجب عكس عقارب الساعة وسالب مع عقارب الساعة.', 'العزم حول نقطة تقع على خط عمل القوة يساوي صفراً، لذا يجب تحديد النقطة المرجعية دائماً.'],
    laws: ['g11_l4_vec', 'g11_l4_tau'],
    controls: [R('F', 'مقدار القوة F', 0, 8, 6, .5, 'N'), R('a', 'اتجاه القوة مع x', 0, 359, 100, 1, '°'), TG('arm', 'البعد العمودي', true, null, 'line'), TG('d3', 'الرسم المجسم', true, null, 'layers')],
    setup(S) { S.cs = 'o'; S.O = [0, 0]; S.P = [2.5, 1.5]; S.vO = [0, 0]; S.vP = [2.5, 1.5]; S.va = S.p.a; S.vF = S.p.F; S.spin = 0; },
    tau(S) { const rx = S.P[0] - S.O[0], ry = S.P[1] - S.O[1], a = Q54.d2r(S.p.a); return rx * S.p.F * Math.sin(a) - ry * S.p.F * Math.cos(a); },
    update(S, dt) { [0, 1].forEach(i => { S.vO[i] = Q54.ez(S.vO[i], S.O[i], dt, 10); S.vP[i] = Q54.ez(S.vP[i], S.P[i], dt, 10); }); S.vF = Q54.ez(S.vF, S.p.F, dt, 10); let d = S.p.a - S.va; d = ((d + 540) % 360) - 180; S.va += d * Math.min(1, dt * 10); S.spin += D.tau(S) * dt * .25; },
    geo(S) { const g = Q54.geo(S), P = { x: g.x0, y: g.y0, w: g.x1 - g.x0, h: Math.min(360, (g.y1 - g.y0) * .62) }; P.u = Math.min(P.w, P.h) / 10; P.ox = P.x + P.w / 2; P.oy = P.y + P.h / 2; P.num = 1; g.P = P; g.d3y = P.y + P.h + 18; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = g.P, t = D.tau(S), [ox, oy] = Q51.px(P, S.vO[0], S.vO[1]), [px, py] = Q51.px(P, S.vP[0], S.vP[1]), a = Q54.d2r(S.va), fl = S.vF * P.u * .5, fx = px + Math.cos(a) * fl, fy = py - Math.sin(a) * fl;
      Q54.bg(ctx, w, h); Q51.plane(ctx, P, { xl: 'x', yl: 'y' });
      // disc (fig 9) rotating slowly with the torque
      K.raw(ctx, () => { ctx.save(); ctx.beginPath(); rr(ctx, P.x, P.y, P.w, P.h, 12); ctx.clip(); ctx.translate(P.ox, P.oy); ctx.rotate(-S.spin); const gr = ctx.createRadialGradient(-20, -20, 10, 0, 0, P.u * 3.6); gr.addColorStop(0, 'rgba(255,255,255,.6)'); gr.addColorStop(1, 'rgba(148,163,184,.35)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(0, 0, P.u * 3.6, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(71,85,105,.55)'; ctx.lineWidth = 2; ctx.stroke(); ctx.lineWidth = 1; for (let k = 0; k < 6; k++) { const q = k * TAU / 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(q) * P.u * 3.6, Math.sin(q) * P.u * 3.6); ctx.stroke(); } ctx.restore(); });
      if (S.p.arm && S.vF > .1) { const ux = Math.cos(a), uy = -Math.sin(a), k = (ox - px) * ux + (oy - py) * uy, qx = px + ux * k, qy = py + uy * k; Q51.dash(ctx, [[px - ux * 400, py - uy * 400], [px + ux * 400, py + uy * 400]], '#94a3b8', 1.2); if (Math.hypot(qx - ox, qy - oy) > 4) { Q41.line(ctx, [[ox, oy], [qx, qy]], Q54C.arm, 2.6); Q42.T(ctx, 'ℓ = ' + Q54.f(Math.abs(t) / Math.max(.01, S.p.F), 2) + ' m', (ox + qx) / 2, (oy + qy) / 2 - 14, { s: 10.5, w: 900, c: Q54C.arm, bg: 'rgba(255,255,255,.9)' }); } }
      if (Math.hypot(px - ox, py - oy) > 3) Q54.vec(ctx, ox, oy, px, py, '#7c3aed', 'r', { w: 3.5, side: -1 });
      if (S.vF > .05) Q54.vec(ctx, px, py, fx, fy, Q54C.F, 'F', { w: 4.5, side: 1 });
      // angle between r (extended) and F
      const ra = Q54.r2d(Math.atan2(oy - py, px - ox)); if (Math.hypot(px - ox, py - oy) > 10 && S.vF > .1) { Q51.dash(ctx, [[px, py], [px + (px - ox) / Math.hypot(px - ox, py - oy) * 50, py + (py - oy) / Math.hypot(px - ox, py - oy) * 50]], '#a78bfa', 1.4); let d = Q54.r2d(a) - ra; d = ((d + 540) % 360) - 180; Q51.arc(ctx, px, py, 24, ra, ra + d, '#be185d', 'θ', { lo: 12 }); }
      Q41.knob(ctx, ox, oy, '#0f766e', 9); Q42.T(ctx, 'O', ox - 16, oy + 16, { s: 13, w: 900, c: '#0f766e' }); Q41.knob(ctx, px, py, '#7c3aed', 8); Q42.T(ctx, 'P', px + 14, py + 16, { s: 13, w: 900, c: '#7c3aed' }); Q41.knob(ctx, fx, fy, Q54C.F, 7);
      if (Math.abs(t) > .01) { Q54.rot(ctx, ox, oy, 34, t > 0 ? 1 : -1, '#be185d', '', { a0: 30, span: 120, w: 2.5 }); Q54.oio(ctx, ox + 44, oy - 34, 10, t > 0, '#be185d'); }
      // 3D right-hand-rule view
      if (S.p.d3) { const cx = g.x0 + 120, cy = g.d3y + 70, sx = 1, k3 = 16, pr = (x, y, z) => [cx + x * k3 - y * k3 * .55, cy + y * k3 * .32 - z * k3];
        K.raw(ctx, () => { const q = [pr(-4, -4, 0), pr(4, -4, 0), pr(4, 4, 0), pr(-4, 4, 0)]; ctx.fillStyle = 'rgba(191,219,254,.55)'; ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 1; ctx.beginPath(); q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.stroke(); });
        const rx = S.vP[0] - S.vO[0], ry = S.vP[1] - S.vO[1], rl = Math.hypot(rx, ry) || 1, rs = Math.min(3.5, rl) / rl, Fx = Math.cos(a) * S.vF * .45, Fy = Math.sin(a) * S.vF * .45;
        const R0 = pr(0, 0, 0), R1 = pr(rx * rs, ry * rs, 0), F1 = pr(rx * rs + Fx, ry * rs + Fy, 0), Tz = clamp(t * .22, -3.4, 3.4), T1 = pr(0, 0, Tz);
        if (Tz < 0) Q54.vec(ctx, R0[0], R0[1], T1[0], T1[1], '#be185d', 'τ', { w: 4, side: -1 });
        Q54.vec(ctx, R0[0], R0[1], R1[0], R1[1], '#7c3aed', 'r', { w: 3, side: -1, ls: 13 }); if (S.vF > .1) Q54.vec(ctx, R1[0], R1[1], F1[0], F1[1], Q54C.F, 'F', { w: 3, ls: 13 });
        if (Tz > 0) Q54.vec(ctx, R0[0], R0[1], T1[0], T1[1], '#be185d', 'τ', { w: 4, side: -1 });
        Q42.T(ctx, 'قاعدة الكف اليمنى', cx + 150, g.d3y + 22, { s: 12, w: 900, c: '#334155' });
        Q42.T(ctx, 'τ = r × F', cx + 150, g.d3y + 50, { s: 14, w: 900, c: '#be185d', mono: 1 });
        Q42.T(ctx, Math.abs(t) < .01 ? 'العزم صفر' : t > 0 ? 'خارج من الصفحة: موجب' : 'داخل في الصفحة: سالب', cx + 150, g.d3y + 80, { s: 12, w: 900, c: '#fff', bg: Math.abs(t) < .01 ? '#64748b' : '#be185d' }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      const rr2 = Math.hypot(S.P[0] - S.O[0], S.P[1] - S.O[1]);
      Q42.card(ctx, S, [{ t: 'τ = r F sinθ', mono: 1, c: '#be185d', w: 900, s: 14 }, { t: 'r = ' + Q54.f(rr2, 2) + ' m   F = ' + Q54.f(S.p.F, 1) + ' N', mono: 1, c: '#334155' }, { t: 'τ = ' + Q54.sgn(t, 2) + ' N·m', mono: 1, c: '#be185d', w: 900 },
        { t: Math.abs(t) < .01 ? 'لا دوران حول O' : t > 0 ? 'دوران عكس عقارب الساعة: موجب ⊙' : 'دوران مع عقارب الساعة: سالب ⊗', c: Math.abs(t) < .01 ? '#64748b' : '#be185d', w: 900 },
        { t: 'العزم يعتمد على النقطة المرجعية O', c: '#0f766e', w: 800 }, { t: 'إذا وقعت O على خط عمل القوة فالعزم صفر', c: '#64748b', s: 11.5 }], { title: 'العزم كمية متجهة', y: 64, wd: 316 });
      Q42.banner(ctx, w, 'اسحب رأس القوة أو النقطة O أو P');
    },
    chips(S, g) { return Q42.chips(S, 'cs', [['o', 'حول المركز O'], ['a', 'حول نقطة التأثير'], ['ccw', 'الشكل 12: F1'], ['cw', 'الشكل 12: F2']], g.h - 84, S.cs, (S2, k) => { const c = CS[k]; S2.cs = k; S2.O = [c[0], c[1]]; S2.P = [c[2], c[3]]; setParam(S2, 'F', c[4]); setParam(S2, 'a', c[5]); }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = g.P, [ox, oy] = Q51.px(P, S.O[0], S.O[1]), [px, py] = Q51.px(P, S.P[0], S.P[1]), a = Q54.d2r(S.p.a), fl = S.p.F * P.u * .5, sn = v => clamp(Math.round(v * 2) / 2, -4.5, 4.5);
      return [{ id: 'ftip', x: px + Math.cos(a) * fl, y: py - Math.sin(a) * fl, r: 18, axis: 'xy', keep: true, tip: 'اسحب رأس القوة', idle: 'اسحب ✋', drag: (S2, d) => { const [u, v] = Q51.un(P, d.x, d.y), dx = u - S2.P[0], dy = v - S2.P[1]; setParam(S2, 'F', clamp(Math.round(Math.hypot(dx, dy) * 2 * 2) / 2, 0, 8)); setParam(S2, 'a', Math.round(((Q54.r2d(Math.atan2(dy, dx)) % 360) + 360) % 360)); S2.cs = ''; } },
        { id: 'pp', x: px, y: py, r: 16, axis: 'xy', keep: true, hint: false, tip: 'اسحب نقطة التأثير P', drag: (S2, d) => { const [u, v] = Q51.un(P, d.x, d.y); S2.P = [sn(u), sn(v)]; S2.cs = ''; } },
        { id: 'oo', x: ox, y: oy, r: 16, axis: 'xy', keep: true, hint: false, tip: 'اسحب النقطة المرجعية O', drag: (S2, d) => { const [u, v] = Q51.un(P, d.x, d.y); S2.O = [sn(u), sn(v)]; S2.cs = ''; } }].concat(D.chips(S, g)); },
    readings(S) { const t = D.tau(S); return [rd('العزم τ', Q54.sgn(t, 2) + ' N·m'), rd('اتجاه العزم', Math.abs(t) < .01 ? 'لا يوجد' : t > 0 ? 'خارج من الصفحة' : 'داخل في الصفحة'), rd('r', Q54.f(Math.hypot(S.P[0] - S.O[0], S.P[1] - S.O[1]), 2) + ' m'), rd('F', Q54.f(S.p.F, 1) + ' N')]; },
    explain(S) { return Q26.ex('العزم يظهر سهماً عمودياً على مستوي القرص: للأعلى عندما تدير القوة القرص عكس عقارب الساعة وللأسفل عندما تديره معها، ويصبح صفراً عندما تقع O على خط عمل القوة.', 'العزم ناتج ضرب اتجاهي τ = r × F ، فاتجاهه عمودي على r و F معاً ومقداره r F sinθ ، و r يقاس من النقطة المرجعية لذا يتغير العزم بتغييرها.', 'عند شد برغي باليد اليمنى: لف الأصابع باتجاه الدوران يجعل الإبهام يشير إلى اتجاه تقدم البرغي.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — محصلة العزوم: أسطوانة مدرجة وقوتان (4-6، الشكلان 16 و 17 + مثال 3 ص 82–83) =============== */
(() => {
  const EX = { title: 'مثال 3 ص 82', q: 'أسطوانة نصف قطرها الخارجي R1 = 1 m والداخلي R2 = 0.5 m ، تؤثر فيها القوة F1 = 5 N أفقياً عند حافتها العليا والقوة F2 = 6 N شاقولياً نحو الأسفل عند الحافة الداخلية. احسب محصلة العزوم واتجاه الدوران', lines: ['τ1 = −F1 R1 = −5 × 1', 'τ1 = −5 N·m', 'إشارته سالبة لأنه مع عقارب الساعة', 'τ2 = +F2 R2 = 6 × 0.5', 'τ2 = +3 N·m', 'إشارته موجبة لأنه عكس عقارب الساعة', 'Στ = τ1 + τ2 = −5 + 3', 'Στ = −2 N·m', 'تدور الأسطوانة مع عقارب الساعة'] };
  const D = { id: 'g11_p_cyl', page: 82, fig: 'الشكلان 16 و 17 + مثال 3',
    desc: 'إذا أثرت في الجسم عدة قوى فإن محصلة العزوم تساوي المجموع الجبري لعزوم القوى: τnet = τ1 + τ2 + τ3 + … مع مراعاة الإشارة: موجب عكس عقارب الساعة وسالب معها. في مثال 3 أسطوانة مدرجة يُلف على حافتها الخارجية حبل يُسحب أفقياً، وعلى حافتها الداخلية حبل يعلق به ثقل.',
    tags: 'محصلة العزوم المجموع الجبري τnet أسطوانة مدرجة مثال 3 R1 R2 F1 F2 −5 +3 −2 N·m مع عقارب الساعة الشكل 16 الشكل 17',
    tools: ['أسطوانة مدرجة على محور', 'حبلان', 'ميزان نابضي', 'ثقل معلق'],
    steps: ['اسحب الميزان النابضي يميناً أو يساراً لتغيير F1 ، واسحب الثقل للأسفل أو للأعلى لتغيير F2.', 'غيّر نصفي القطرين من اللوحة.', 'راقب τ1 و τ2 وإشارتيهما ومحصلة العزوم: تدور الأسطوانة باتجاه المحصلة.', 'اضغط «مثال 3» لحل مثال الكتاب خطوة خطوة.'],
    concl: ['τnet = τ1 + τ2 + τ3 + … جمعاً جبرياً.', 'مثال 3: τ1 = −5 N·m و τ2 = +3 N·m فإن Στ = −2 N·m.', 'إشارة المحصلة السالبة تعني أن الأسطوانة تدور مع عقارب الساعة.', 'إذا تساوى العزمان مقداراً وتعاكسا تكون الأسطوانة متزنة دورانياً.'],
    laws: ['g11_l4_vec', 'g11_l4_rot'],
    controls: [R('F1', 'القوة F1 على الحافة الخارجية', 0, 10, 5, .5, 'N'), R('F2', 'الثقل F2 على الحافة الداخلية', 0, 10, 6, .5, 'N'), R('R1', 'نصف القطر الخارجي R1', .6, 1.2, 1, .1, 'm'), R('R2', 'نصف القطر الداخلي R2', .2, .6, .5, .05, 'm')],
    setup(S) { S.ang = 0; S.om = 0; S.ex = 0; S.k = 0; S.vR1 = S.p.R1; S.vR2 = S.p.R2; S.cs = 'ex'; },
    net(S) { return -S.p.F1 * S.p.R1 + S.p.F2 * S.p.R2; },
    update(S, dt) { S.vR1 = Q54.ez(S.vR1, S.p.R1, dt, 8); S.vR2 = Q54.ez(S.vR2, S.p.R2, dt, 8); const t = D.net(S); S.om += (t * .9 - S.om * 1.6) * dt; S.ang += S.om * dt; },
    geo(S) { const g = Q54.geo(S); g.u = 125; g.cx0 = g.x0 + 150; g.cy0 = g.y0 + 210; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), cx = g.cx0, cy = g.cy0, R1 = S.vR1 * g.u, R2 = S.vR2 * g.u, t = D.net(S), F1 = S.p.F1, F2 = S.p.F2;
      Q54.bg(ctx, w, h);
      // stand
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(cx - 10, cy); ctx.lineTo(cx - 60, g.y1 - 40); ctx.lineTo(cx - 40, g.y1 - 40); ctx.lineTo(cx, cy + 20); ctx.lineTo(cx + 40, g.y1 - 40); ctx.lineTo(cx + 60, g.y1 - 40); ctx.lineTo(cx + 10, cy); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#334155'; rr(ctx, cx - 80, g.y1 - 42, 160, 10, 3); ctx.fill(); });
      // drums
      K.raw(ctx, () => { ctx.save(); ctx.translate(cx, cy); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 4; let gr = ctx.createRadialGradient(-R1 * .3, -R1 * .3, 10, 0, 0, R1); gr.addColorStop(0, '#e0f2fe'); gr.addColorStop(1, '#0284c7'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(0, 0, R1, 0, TAU); ctx.fill(); ctx.shadowColor = 'transparent';
        gr = ctx.createRadialGradient(-R2 * .3, -R2 * .3, 4, 0, 0, R2); gr.addColorStop(0, '#fef3c7'); gr.addColorStop(1, '#d97706'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(0, 0, R2, 0, TAU); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.rotate(-S.ang); ctx.strokeStyle = 'rgba(15,23,42,.45)'; ctx.lineWidth = 2; for (let k = 0; k < 8; k++) { const q = k * TAU / 8; ctx.beginPath(); ctx.moveTo(Math.cos(q) * (R2 + 4), Math.sin(q) * (R2 + 4)); ctx.lineTo(Math.cos(q) * (R1 - 6), Math.sin(q) * (R1 - 6)); ctx.stroke(); } ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(R1 - 14, 0, 6, 0, TAU); ctx.fill(); ctx.restore(); });
      Q54.pin(ctx, cx, cy, 9);
      // rope 1 from top of outer drum to the right, spring balance
      const yT = cy - R1, hx = cx + 120 + F1 * 14; Q54.rope(ctx, [[cx, yT], [cx + 40, yT]]); Q54.balance(ctx, cx + 40, yT, hx, yT, F1, 10);
      if (F1 > .1) Q54.fv(ctx, cx, yT - 18, 0, 30 + F1 * 12, Q54C.F, 'F1', { side: -1 });
      // rope 2 from left of inner drum down, hanging weight
      const xL = cx - R2, wy = cy + 70 + F2 * 4; Q54.rope(ctx, [[xL, cy], [xL, wy]]); Q54.load(ctx, xL, wy, 30 + F2 * 2.5, 22 + F2 * 2.2, Q54.f(F2, 1) + ' N', '#475569');
      if (F2 > .1) Q54.fv(ctx, xL - 26, cy + 8, 270, 30 + F2 * 12, '#2563eb', 'F2', { side: 1 });
      Q54.dim(ctx, cx, cy, cx, yT, 'R1', '#0284c7', -0); Q54.dim(ctx, cx, cy, xL, cy, 'R2', '#b45309', 0);
      if (Math.abs(t) > .01) Q54.rot(ctx, cx, cy, R1 + 26, t > 0 ? 1 : -1, '#be185d', t > 0 ? 'عكس عقارب الساعة' : 'مع عقارب الساعة', { a0: t > 0 ? 210 : 330, span: 70 });
      else Q54.pill(ctx, cx, cy + R1 + 30, 'متزنة دورانياً', '#16a34a');
      const C = D.chips(S, g); Q54.drawSteps(ctx, C);
      if (S.ex) Q42.steps(ctx, S, Object.assign({}, EX, { k: S.k }), { y: 64, x: w - 12, wd: 316 });
      else Q42.card(ctx, S, [{ t: 'τnet = τ1 + τ2', mono: 1, c: '#be185d', w: 900, s: 14 }, { t: 'τ1 = −F1 R1 = ' + Q54.sgn(-F1 * S.p.R1, 2) + ' N·m', mono: 1, c: Q54C.F, w: 800 }, { t: 'τ2 = +F2 R2 = ' + Q54.sgn(F2 * S.p.R2, 2) + ' N·m', mono: 1, c: '#2563eb', w: 800 }, { t: 'Στ = ' + Q54.sgn(t, 2) + ' N·m', mono: 1, c: '#be185d', w: 900 },
        { t: Math.abs(t) < .01 ? 'محصلة العزوم صفر: لا دوران' : t > 0 ? 'تدور عكس عقارب الساعة' : 'تدور مع عقارب الساعة', c: '#0f766e', w: 900 }, { t: 'الموجب عكس عقارب الساعة والسالب معها', c: '#64748b', s: 11.5 }], { title: 'محصلة العزوم', y: 64, wd: 316 });
      Q42.banner(ctx, w, 'اسحب الميزان النابضي أو الثقل');
    },
    chips(S, g) { return Q54.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 3 ص 82', S2 => { setParam(S2, 'F1', 5); setParam(S2, 'F2', 6); setParam(S2, 'R1', 1); setParam(S2, 'R2', .5); }, 9); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), cx = g.cx0, cy = g.cy0, R1 = S.vR1 * g.u, R2 = S.vR2 * g.u, F2 = S.p.F2;
      return [{ id: 'bal', x: cx + 120 + S.p.F1 * 14 - 7, y: cy - R1, r: 20, axis: 'x', keep: true, tip: 'اسحب: القوة F1', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'F1', clamp(Math.round((d.x + 7 - cx - 120) / 14 * 2) / 2, 0, 10)) },
        { id: 'wt', x: cx - R2, y: cy + 70 + F2 * 4 + (22 + F2 * 2.2) / 2, r: 22, axis: 'y', keep: true, hint: false, tip: 'اسحب: الثقل F2', drag: (S2, d) => setParam(S2, 'F2', clamp(Math.round((d.y - cy - 81) / 5.1 * 2) / 2, 0, 10)) }].concat(D.chips(S, g)); },
    readings(S) { return [rd('τ1', Q54.sgn(-S.p.F1 * S.p.R1, 2) + ' N·m'), rd('τ2', Q54.sgn(S.p.F2 * S.p.R2, 2) + ' N·m'), rd('محصلة العزوم', Q54.sgn(D.net(S), 2) + ' N·m'), rd('اتجاه الدوران', Math.abs(D.net(S)) < .01 ? 'لا دوران' : D.net(S) > 0 ? 'عكس عقارب الساعة' : 'مع عقارب الساعة')]; },
    record(S) { return { F1: S.p.F1, F2: S.p.F2, t: +D.net(S).toFixed(2) }; },
    cols: [['F1', 'F1 (N)'], ['F2', 'F2 (N)'], ['t', 'Στ (N·m)']],
    explain(S) { return Q26.ex('تدور الأسطوانة باتجاه العزم الأكبر، وتتوقف إذا تساوى العزمان.', 'F1 تدير الأسطوانة مع عقارب الساعة فعزمها سالب −F1R1 ، و F2 تديرها عكسها فعزمها موجب +F2R2 ، والمحصلة مجموعهما الجبري.', 'في الرافعة ذات البكرة المدرجة يرفع ثقل كبير بقوة صغيرة على البكرة الكبيرة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — مثال 4: سلم يستند إلى جدار أملس + م3 الصباغ على السلم (ص 83–84 و 91) =============== */
(() => {
  const WL = 120;
  const EX = {
    ex4: { title: 'مثال 4 ص 83', q: 'سلم منتظم طوله ℓ وكتلته m يستند بطرفه العلوي إلى جدار أملس وبطرفه السفلي إلى أرض معامل الاحتكاك السكوني بينهما 0.4. جد أصغر زاوية يصنعها السلم مع الأرض دون أن ينزلق', lines: ['ΣFx = 0 :  fs − P = 0', 'P = fs = μs N', 'ΣFy = 0 :  N − mg = 0', 'P / mg = μs', 'العزوم حول القاعدة O : Στ = 0', 'P ℓ sinθ − mg (ℓ/2) cosθ = 0', 'tanθ = mg / 2P = 1 / 2μs', 'tanθ = 1 / (2 × 0.4) = 1.25', 'θ = 51°'] },
    m3: { title: 'م3 ص 91', q: 'سلم منتظم طوله 5 m يستند طرفه العلوي إلى جدار أملس على ارتفاع 4.7 m ، ويقف عليه صباغ وزنه 680 N على ارتفاع 3 m ، ووزن السلم 120 N. جد قوة الاحتكاك بين الأرض والسلم', lines: ['بعد القاعدة عن الجدار:', 'x = √(5² − 4.7²) = 1.71 m', 'ذراع وزن الصباغ = 1.71 × 3 / 4.7 = 1.09 m', 'ذراع وزن السلم = 1.71 / 2 = 0.85 m', 'العزوم حول القاعدة: Στ = 0', 'P × 4.7 = 680 × 1.09 + 120 × 0.85', 'P = 843 / 4.7 = 179 N', 'f = P ≈ 179 N'] } };
  const D = { id: 'g11_p_ladder', page: 83, fig: 'الشكل 18 + مثال 4 + م3',
    desc: 'سلم منتظم يستند إلى جدار أملس وأرض خشنة. يؤثر فيه وزنه mg في منتصفه، وقوة الجدار P أفقية (لا احتكاك مع الجدار)، ورد فعل الأرض N والاحتكاك السكوني fs عند القاعدة. من الشرطين: fs = P و N = mg ، ومن العزوم حول القاعدة tanθ = 1 / 2μs. إذا قلت الزاوية عن هذه القيمة احتاج السلم احتكاكاً أكبر من μs N فينزلق.',
    tags: 'السلم جدار أملس احتكاك سكوني مثال 4 الشكل 18 tanθ=1/2μ 51° م3 صباغ 680N 120N 4.7m 179N شرطا الاتزان العزوم حول القاعدة',
    tools: ['سلم منتظم', 'جدار أملس', 'أرض خشنة', 'صباغ'],
    steps: ['اسحب الطرف العلوي للسلم على الجدار لتغيير الزاوية θ مع الأرض.', 'قلل معامل الاحتكاك μs من اللوحة: عند زاوية أصغر من الزاوية الحرجة ينزلق السلم.', 'أضف الصباغ واسحبه على السلم: كلما صعد زاد الاحتكاك اللازم.', 'اضغط «حل مثال 4» أو «حل م3» للحل خطوة خطوة.'],
    concl: ['ΣFx = 0 تعطي fs = P ، و ΣFy = 0 تعطي N = mg.', 'العزوم حول القاعدة: P ℓ sinθ = mg (ℓ/2) cosθ.', 'أصغر زاوية دون انزلاق tanθ = 1 / 2μs ، ولـ μs = 0.4 تكون θ = 51°.', 'م3: قوة الاحتكاك ≈ 179 N.'],
    laws: ['g11_l4_ladder', 'g11_l4_eq', 'g11_l4_rot'],
    controls: [R('th', 'زاوية السلم مع الأرض θ', 10, 85, 60, 1, '°'), R('mu', 'معامل الاحتكاك السكوني μs', 0, 1, .4, .05, ''), R('pw', 'وزن الصباغ', 0, 1000, 0, 10, 'N'), R('px', 'موقع الصباغ على السلم', 0, 1, .64, .01, '')],
    setup(S) { S.cs = 'ex4'; S.vth = S.p.th; S.fv = 0; S.ex = 0; S.k = 0; S.vpx = S.p.px; },
    fneed(S, th) { const t = Q54.d2r(Math.max(th, 1)); return (WL / 2 + S.p.pw * S.p.px) * Math.cos(t) / Math.sin(t); },
    thmin(S) { const N = WL + S.p.pw; return S.p.mu <= 0 ? 90 : Q54.r2d(Math.atan((WL / 2 + S.p.pw * S.p.px) / (S.p.mu * N))); },
    slip(S) { return D.fneed(S, S.p.th) > S.p.mu * (WL + S.p.pw) + 1e-6; },
    update(S, dt) { S.vpx = Q54.ez(S.vpx, S.p.px, dt, 10); if (D.slip(S)) { S.fv += dt * 70; S.vth = Math.max(5, S.vth - S.fv * dt); } else { S.fv = 0; S.vth = Q54.ez(S.vth, S.p.th, dt, 6); } },
    geo(S) { const g = Q54.geo(S, { full: 1 }); g.fy = g.y1 - 4; g.wx = g.x0 + 46; g.Lp = Math.min(400, g.fy - g.y0 - 40, g.w - 60 - g.wx); return g; },
    pts(S, g, th) { const t = Q54.d2r(th), bx = g.wx + g.Lp * Math.cos(t), tx = g.wx, ty = g.fy - g.Lp * Math.sin(t); return { bx, by: g.fy, tx, ty, qx: bx + (tx - bx) * S.vpx, qy: g.fy + (ty - g.fy) * S.vpx }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.pts(S, g, S.vth), N = WL + S.p.pw, sl = D.slip(S), fmax = S.p.mu * N, Pn = D.fneed(S, S.vth), f = sl ? fmax : Pn, k = 150 / Math.max(N, 220), cl = v => Math.min(220, v);
      Q54.bg(ctx, w, h); Q54.wall(ctx, g.x0, g.y0, g.wx - g.x0, g.fy - g.y0); Q54.ground(ctx, g.x0, w - 20, g.fy);
      Q42.T(ctx, 'جدار أملس', (g.x0 + g.wx) / 2, g.y0 + 14, { s: 10.5, w: 900, c: '#fff', bg: 'rgba(120,53,15,.8)' });
      const ux = (P.tx - P.bx) / g.Lp, uy = (P.ty - P.by) / g.Lp, nx = -uy * 6, ny = ux * 6;
      Q54.plank(ctx, P.bx + nx, P.by + ny, P.tx + nx, P.ty + ny, 6, { plain: 1 }); Q54.plank(ctx, P.bx - nx, P.by - ny, P.tx - nx, P.ty - ny, 6, { plain: 1 });
      for (let i = 1; i < 12; i++) { const x = P.bx + (P.tx - P.bx) * i / 12, y = P.by + (P.ty - P.by) * i / 12; Q41.line(ctx, [[x + nx, y + ny], [x - nx, y - ny]], '#92400e', 3); }
      Q51.arc(ctx, P.bx, P.by, 44, 180 - S.vth, 180, '#be185d', 'θ = ' + Math.round(S.vth) + '°', { lo: 22, fill: 'rgba(219,39,119,.08)' });
      if (S.p.pw > 0) { Q54.person(ctx, P.qx - 6, P.qy, 62, '#ea580c', { armL: -22 }); Q54.fv(ctx, P.qx + 16, P.qy - 30, 270, cl(S.p.pw * k), '#a16207', 'w', { side: -1 }); }
      const mx = (P.bx + P.tx) / 2, my = (P.by + P.ty) / 2;
      Q54.fv(ctx, mx, my, 270, cl(WL * k), Q54C.W, 'mg', { side: -1 }); Q41.dot(ctx, mx, my, '#0f172a', 4);
      Q54.fv(ctx, P.tx, P.ty, 0, cl(Pn * k), Q54C.R, 'P', { side: -1 });
      Q54.fv(ctx, P.bx, P.by, 90, cl(N * k), Q54C.N, 'N', { side: 1 });
      Q54.fv(ctx, P.bx, P.by - 6, 180, cl(f * k), Q54C.f, 'fs', { side: 1 });
      Q41.knob(ctx, P.tx + 12, P.ty, '#f59e0b', 9);
      if (sl) Q54.pill(ctx, P.bx + 60, P.by - 40, 'ينزلق السلم!', '#dc2626');
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q54.drawSteps(ctx, C.e);
      if (S.ex) Q42.steps(ctx, S, Object.assign({}, EX[S.cs === 'm3' ? 'm3' : 'ex4'], { k: S.k }), { y: 64, x: w - 12, wd: 316 });
      else Q42.card(ctx, S, [{ t: 'ΣFx = 0 :  fs = P', mono: 1, c: Q54C.f, w: 900 }, { t: 'ΣFy = 0 :  N = ' + Q54.f(N, 0) + ' N', mono: 1, c: Q54C.N, w: 900 },
        { t: 'P ℓ sinθ = mg (ℓ/2) cosθ + w d cosθ', mono: 1, c: '#be185d', s: 11.5 }, { t: 'الاحتكاك اللازم: ' + Q54.f(D.fneed(S, S.p.th), 1) + ' N', c: Q54C.f, w: 900 }, { t: 'أقصى احتكاك = ' + Q54.f(fmax, 1) + ' N', c: '#334155', w: 800 },
        { t: 'أصغر زاوية دون انزلاق: ' + Q54.f(D.thmin(S), 1) + '°', c: '#be185d', w: 900 }, { t: sl ? 'الاحتكاك غير كافٍ: ينزلق السلم' : 'السلم متزن: الشرطان متحققان', c: sl ? '#dc2626' : '#16a34a', w: 900 }], { title: 'اتزان السلم', y: 64, wd: 316 });
      Q42.banner(ctx, w, 'اسحب أعلى السلم على الجدار');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', [['ex4', 'مثال 4 ص 83'], ['m3', 'م3 ص 91'], ['rst', '↺ أعد السلم']], g.h - 128, S.cs, (S2, k) => { if (k === 'rst') { setParam(S2, 'th', Math.min(85, Math.ceil(D.thmin(S2) + 4))); S2.vth = S2.p.th; return; } S2.cs = k; S2.ex = 0; D.cas(S2, k); }, { bw: 140 }),
      e: Q54.stepChips(S, 'ex', g.h - 84, g.L, S.cs === 'm3' ? 'حل م3' : 'حل مثال 4', S2 => { D.cas(S2, S2.cs === 'm3' ? 'm3' : 'ex4'); }, 9) }; },
    cas(S, k) { if (k === 'm3') { setParam(S, 'mu', .4); setParam(S, 'pw', 680); setParam(S, 'px', .64); setParam(S, 'th', 70); } else { S.cs = 'ex4'; setParam(S, 'mu', .4); setParam(S, 'pw', 0); setParam(S, 'th', 52); } S.vth = Math.max(S.vth, 20); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = D.pts(S, g, S.vth), C = D.chips(S, g);
      const out = [{ id: 'top', x: P.tx + 12, y: P.ty, r: 20, axis: 'y', keep: true, tip: 'اسحب: زاوية السلم', idle: 'اسحب ✋', drag: (S2, d) => { const s = clamp((g.fy - d.y) / g.Lp, .17, .996); setParam(S2, 'th', Math.round(Q54.r2d(Math.asin(s)))); S2.vth = S2.p.th; } },
        { id: 'base', x: P.bx, y: P.by - 10, r: 18, axis: 'x', keep: true, hint: false, tip: 'اسحب قاعدة السلم', drag: (S2, d) => { const c = clamp((d.x - g.wx) / g.Lp, .09, .98); setParam(S2, 'th', Math.round(Q54.r2d(Math.acos(c)))); S2.vth = S2.p.th; } }];
      if (S.p.pw > 0) out.push({ id: 'man', x: P.qx, y: P.qy - 30, r: 20, axis: 'xy', keep: true, hint: false, tip: 'اسحب الصباغ على السلم', drag: (S2, d) => { const L2 = g.Lp * g.Lp, v = ((d.x - P.bx) * (P.tx - P.bx) + (d.y + 30 - P.by) * (P.ty - P.by)) / L2; setParam(S2, 'px', clamp(Math.round(v * 100) / 100, 0, 1)); } });
      return out.concat(C.c, C.e); },
    readings(S) { const N = WL + S.p.pw; return [rd('الزاوية θ', Math.round(S.p.th) + '°'), rd('رد فعل الأرض N', Q54.f(N, 0) + ' N'), rd('قوة الجدار P', Q54.f(D.fneed(S, S.p.th), 1) + ' N'), rd('أقصى احتكاك', Q54.f(S.p.mu * N, 1) + ' N'), rd('الزاوية الحرجة', Q54.f(D.thmin(S), 1) + '°'), rd('الحالة', D.slip(S) ? 'ينزلق' : 'متزن')]; },
    record(S) { return { th: S.p.th, mu: S.p.mu, f: +D.fneed(S, S.p.th).toFixed(1), m: +D.thmin(S).toFixed(1) }; },
    cols: [['th', 'θ (°)'], ['mu', 'μs'], ['f', 'f (N)'], ['m', 'θmin (°)']],
    explain(S) { return Q26.ex('كلما قلت زاوية السلم مع الأرض زادت قوة الجدار P والاحتكاك اللازم، فإذا تجاوز μs N انزلق السلم.', 'العزوم حول القاعدة: P ℓ sinθ = mg (ℓ/2) cosθ ، فعند الزوايا الصغيرة يكبر cotθ ويكبر P ، والاحتكاك يجب أن يساوي P.', 'لذلك يوضع السلم بزاوية كبيرة مع الأرض، وتوضع له قواعد مطاطية تزيد الاحتكاك.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — المزدوج: مقود السيارة والقضيب AB (4-7، الشكلان 19 و 20 ص 84–85) =============== */
(() => {
  const EX = { title: 'الشكل 20 ص 85', q: 'قضيب AB طوله 4 m تؤثر في طرفه A قوة 6 N نحو الأسفل وفي طرفه B قوة 6 N نحو الأعلى. احسب عزم المزدوج حول C في المنتصف و D و A', lines: ['حول C في المنتصف:', 'τ = 6 × 2 + 6 × 2 = 24 N·m', 'حول D على بعد 1 m من A:', 'τ = 6 × 1 + 6 × 3 = 24 N·m', 'حول A :', 'τ = 6 × 0 + 6 × 4 = 24 N·m', 'عزم المزدوج = F × AB = 24 N·m', 'لا يعتمد على موقع محور الدوران'] };
  const D = { id: 'g11_p_couple', page: 84, fig: 'الشكلان 19 و 20',
    desc: 'المزدوج قوتان متساويتان مقداراً ومتعاكستان اتجاهاً ومتوازيتان، وليس لهما خط عمل مشترك، كما عند تدوير مقود السيارة أو صنبور الماء. محصلتهما صفر فلا ينتقل الجسم لكنه يدور. عزم المزدوج يساوي إحدى القوتين × البعد العمودي بينهما، ولا يتغير بتغير موقع محور الدوران.',
    tags: 'المزدوج قوتان متساويتان متعاكستان متوازيتان مقود السيارة صنبور الماء الشكل 19 الشكل 20 عزم المزدوج F×AB 24 N·m محور الدوران C D A',
    tools: ['قضيب AB', 'مقود سيارة', 'ميزانان نابضيان'],
    steps: ['في الشكل 20 اسحب محور الدوران على القضيب أو اختر C أو D أو A.', 'لاحظ أن عزمي القوتين يتغيران لكن مجموعهما يبقى F × AB.', 'فعّل «حرر القضيب» ليدور حول المحور: يدور حتى يصبح عمودياً على القوتين.', 'اختر الشكل 19: يداك تؤثران بمزدوج في المقود فيدور دون أن ينتقل.'],
    concl: ['محصلة قوتي المزدوج صفر فلا حركة انتقالية.', 'عزم المزدوج τ = F × d حيث d البعد العمودي بين القوتين.', 'الشكل 20: τ = 6 × 4 = 24 N·m حول C و D و A.', 'عزم المزدوج لا يعتمد على موقع محور الدوران.'],
    laws: ['g11_l4_couple'],
    controls: [R('F', 'مقدار كل قوة F', 1, 10, 6, .5, 'N'), R('AB', 'طول القضيب AB', 1, 6, 4, .5, 'm'), R('ax', 'بعد المحور عن A', 0, 6, 2, .25, 'm'), TG('free', 'حرر القضيب ليدور', false, null, 'rotate')],
    setup(S) { S.cs = 'rod'; S.phi = 0; S.om = 0; S.wa = 0; S.wom = 0; S.vax = S.p.ax; S.vAB = S.p.AB; S.ex = 0; S.k = 0; },
    axv(S) { return Math.min(S.p.ax, S.p.AB); },
    update(S, dt) { S.vAB = Q54.ez(S.vAB, S.p.AB, dt, 8); S.vax = Q54.ez(S.vax, D.axv(S), dt, 8);
      if (S.cs === 'wheel') { const t = S.p.F * .4; S.wom += (t * 2 - 3 * S.wom) * dt; S.wa += S.wom * dt; }
      if (S.p.free && S.cs !== 'wheel') { const AB = S.p.AB, a = D.axv(S), I = AB * AB / 12 + Math.pow(AB / 2 - a, 2), t = S.p.F * AB * Math.cos(S.phi); S.om += (t / I * .35 - 1.2 * S.om) * dt; S.phi += S.om * dt; }
      else { S.om = 0; S.phi = Q54.ez(S.phi, 0, dt, 5); } },
    geo(S) { const g = Q54.geo(S, { full: 1 }); g.u = Math.min(80, (g.x1 - g.x0 - 60) / 6, 300 / S.vAB); g.ay = g.y0 + 330; g.axx = g.cx + (S.vax - S.vAB / 2) * g.u; return g; },
    rodPts(S, g) { const c = Math.cos(S.phi), s = Math.sin(S.phi), ua = S.vax * g.u, ub = (S.vAB - S.vax) * g.u; return { Ax: g.axx - c * ua, Ay: g.ay + s * ua, Bx: g.axx + c * ub, By: g.ay - s * ub }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), F = S.p.F; Q54.bg(ctx, w, h);
      if (S.cs === 'wheel') D.drawWheel(ctx, w, h, S);
      else { const P = D.rodPts(S, g), a = D.axv(S), AB = S.p.AB, len = 30 + F * 9;
        Q54.rod(ctx, P.Ax, P.Ay, P.Bx, P.By, 14, ['#bae6fd', '#38bdf8', '#0369a1']);
        Q54.fv(ctx, P.Ax, P.Ay, 270, len, Q54C.F, 'F', { side: 1 }); Q54.fv(ctx, P.Bx, P.By, 90, len, Q54C.F, 'F', { side: -1 });
        Q42.T(ctx, 'A', P.Ax - 16, P.Ay - 16, { s: 14, w: 900, c: '#0f172a' }); Q42.T(ctx, 'B', P.Bx + 16, P.By - 16, { s: 14, w: 900, c: '#0f172a' });
        if (Math.abs(S.phi) < .02) { if (a > .05) Q54.dim(ctx, P.Ax, P.Ay, g.axx, g.ay, Q54.f(a, 2) + ' m', '#7c3aed', 30); if (AB - a > .05) Q54.dim(ctx, g.axx, g.ay, P.Bx, P.By, Q54.f(AB - a, 2) + ' m', '#7c3aed', 30); }
        Q54.pin(ctx, g.axx, g.ay, 9); Q41.knob(ctx, g.axx, g.ay + 44, '#f59e0b', 9); Q41.line(ctx, [[g.axx, g.ay + 9], [g.axx, g.ay + 35]], '#f59e0b', 2);
        Q42.T(ctx, 'محور الدوران', g.axx, g.ay + 70, { s: 11, w: 800, c: '#b45309' });
        const t = F * AB * Math.cos(S.phi); if (Math.abs(t) > .05) Q54.rot(ctx, g.axx, g.ay, 56, 1, '#be185d', '', { a0: 100, span: 90 });
        const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q54.drawSteps(ctx, C.e);
        if (S.ex) Q42.steps(ctx, S, Object.assign({}, EX, { k: S.k }), { y: 64, x: w - 12, wd: 316 });
        else Q42.card(ctx, S, [{ t: 'ΣF = F − F = 0', mono: 1, c: '#16a34a', w: 900 }, { t: 'τA = F × ' + Q54.f(a, 2) + ' = ' + Q54.f(F * a, 2) + ' N·m', mono: 1, c: Q54C.F, w: 800 }, { t: 'τB = F × ' + Q54.f(AB - a, 2) + ' = ' + Q54.f(F * (AB - a), 2) + ' N·m', mono: 1, c: Q54C.F, w: 800 },
          { t: 'τ = F × AB = ' + Q54.f(F, 1) + ' × ' + Q54.f(AB, 1) + ' = ' + Q54.f(F * AB, 2) + ' N·m', mono: 1, c: '#be185d', w: 900 }, { t: 'المجموع ثابت أينما كان المحور', c: '#0f766e', w: 900 }, { t: S.p.free ? 'يدور حتى يصبح عمودياً على القوتين' : 'فعّل «حرر القضيب» ليدور', c: '#64748b', s: 11.5 }], { title: 'عزم المزدوج', y: 64, wd: 316 });
        Q42.banner(ctx, w, 'اسحب محور الدوران على القضيب'); }
    },
    drawWheel(ctx, w, h, S) {
      const g0 = Q54.geo(S), cx = g0.cx, cy = g0.y0 + 230, R = 130, a = S.wa, F = S.p.F;
      K.raw(ctx, () => { ctx.save(); ctx.translate(cx, cy); ctx.rotate(-a); ctx.shadowColor = 'rgba(15,23,42,.4)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 5; ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 22; ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.stroke(); ctx.shadowColor = 'transparent'; ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, R + 4, Math.PI * 1.1, Math.PI * 1.6); ctx.stroke();
        ctx.fillStyle = '#374151'; [0, 2.1, 4.2].forEach(q => { ctx.save(); ctx.rotate(q + Math.PI / 2); rr(ctx, -9, 0, 18, R - 6, 6); ctx.fill(); ctx.restore(); }); const gr = ctx.createRadialGradient(-8, -8, 4, 0, 0, 40); gr.addColorStop(0, '#6b7280'); gr.addColorStop(1, '#111827'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(0, 0, 38, 0, TAU); ctx.fill(); ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.arc(0, 0, 8, 0, TAU); ctx.fill(); ctx.restore(); });
      const hands = [[a, 90], [a + Math.PI, 270]]; hands.forEach(([q, dq], i) => { const x = cx + Math.cos(q) * R, y = cy - Math.sin(q) * R; K.raw(ctx, () => { ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x, y, 16, 20, -q, 0, TAU); ctx.fill(); ctx.stroke(); });
        Q54.fv(ctx, x, y, Q54.r2d(q) + dq, 30 + F * 8, Q54C.F, 'F', { side: i ? 1 : -1 }); });
      Q54.rot(ctx, cx, cy, R + 34, 1, '#be185d', 'يدور', { a0: 60, span: 60 });
      Q54.dim(ctx, cx - R, cy + R + 30, cx + R, cy + R + 30, 'd = 0.4 m', '#7c3aed');
      const C = D.chips(S, g0); Q42.drawChips(ctx, C.c);
      Q42.card(ctx, S, [{ t: 'قوتان متساويتان ومتعاكستان', c: '#334155', w: 800 }, { t: 'ΣF = 0 : لا ينتقل المقود', mono: 1, c: '#16a34a', w: 900 }, { t: 'τ = F × d = ' + Q54.f(F, 1) + ' × 0.4 = ' + Q54.f(F * .4, 2) + ' N·m', mono: 1, c: '#be185d', w: 900 }, { t: 'سرعة الدوران: ' + Q54.f(S.wom, 2) + ' rad/s', c: '#0f766e', w: 800 }, { t: 'ومثله تدوير صنبور الماء أو مفتاح تغيير الإطارات', c: '#64748b', s: 11.5 }], { title: 'الشكل 19: مقود السيارة', y: 64, wd: 316 });
      Q42.banner(ctx, w, 'غيّر القوة F من اللوحة');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', [['rod', 'الشكل 20: قضيب'], ['wheel', 'الشكل 19: مقود'], ['C', 'حول C'], ['D', 'حول D'], ['A', 'حول A']], g.h - 128, S.cs === 'wheel' ? 'wheel' : (S.cs === 'rod' ? 'rod' : S.cs), (S2, k) => { if (k === 'wheel') { S2.cs = 'wheel'; S2.ex = 0; return; } S2.cs = k === 'rod' ? 'rod' : k; if (k !== 'rod') { setParam(S2, 'AB', 4); setParam(S2, 'F', 6); setParam(S2, 'ax', k === 'C' ? 2 : k === 'D' ? 1 : 0); } }, { bw: 128 }),
      e: Q54.stepChips(S, 'ex', g.h - 84, g.L, 'حل الشكل 20', S2 => { S2.cs = 'C'; setParam(S2, 'AB', 4); setParam(S2, 'F', 6); setParam(S2, 'ax', 2); setParam(S2, 'free', false); }, 8) }; },
    drags(S) { if (!S.W) return []; if (S.cs === 'wheel') { const g0 = Q54.geo(S); return [{ id: 'whl', x: g0.cx, y: g0.y0 + 230, r: 40, axis: 'none', tip: 'اضغط: ضاعف القوة', idle: 'اضغط 👆', click: S2 => setParam(S2, 'F', S2.p.F >= 10 ? 3 : Math.min(10, S2.p.F * 2)) }].concat(D.chips(S, g0).c); }
      const g = D.geo(S), C = D.chips(S, g);
      return [{ id: 'axis', x: g.axx, y: g.ay + 44, r: 20, axis: 'x', keep: true, tip: 'اسحب محور الدوران', idle: 'اسحب ✋', drag: (S2, d) => { const g2 = D.geo(S2), A0 = g2.cx - S2.vAB / 2 * g2.u; setParam(S2, 'ax', clamp(Math.round((d.x - A0) / g2.u * 4) / 4, 0, S2.p.AB)); S2.cs = 'rod'; } }].concat(C.c, C.e); },
    readings(S) { const a = D.axv(S); return [rd('القوة F', Q54.f(S.p.F, 1) + ' N'), rd('AB', Q54.f(S.p.AB, 2) + ' m'), rd('عزم المزدوج', Q54.f(S.cs === 'wheel' ? S.p.F * .4 : S.p.F * S.p.AB, 2) + ' N·m'), rd('بعد المحور عن A', Q54.f(a, 2) + ' m'), rd('محصلة القوى', '0 N')]; },
    explain(S) { return Q26.ex('أينما وضعنا محور الدوران على القضيب يبقى مجموع العزمين F × AB ، والقضيب يدور ولا ينتقل.', 'القوتان متساويتان ومتعاكستان فمحصلتهما صفر، لكن خطي عملهما مختلفان فيتولد عزم: F × AC + F × CB = F × AB.', 'نستعمل المزدوج عند تدوير مقود السيارة وصنبور الماء ومفتاح فك الإطارات.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — مركز الكتلة: كتلتان على ساق خفيفة (4-8، الشكلان 21 و 22 ص 86–87) =============== */
(() => {
  const FF = 4;
  const D = { id: 'g11_p_cm', page: 86, fig: 'الأشكال 21 و 21a و 21b و 21c و 22',
    desc: 'مركز الكتلة نقطة نفترض أن كتلة الجسم كلها مركزة فيها. لمنظومة جسيمين على ساق خفيفة يقع مركز الكتلة على الخط الواصل بينهما وأقرب إلى الكتلة الأكبر. إذا أثرت قوة عند نقطة أقرب إلى الكتلة الأصغر دارت المنظومة مع عقارب الساعة، وإذا أثرت قرب الكتلة الأكبر دارت عكسها، وإذا مر خط عمل القوة بمركز الكتلة تحركت انتقالياً فقط بتعجيل a = F/m.',
    tags: 'مركز الكتلة Cm كتلتان ساق خفيفة الشكل 21 21a 21b 21c حركة انتقالية دوران a=F/m الأجسام المتناظرة المركز الهندسي الشكل 22',
    tools: ['منضدة هوائية', 'كرتان مختلفتا الكتلة', 'ساق خفيفة', 'قوة دفع قصيرة'],
    steps: ['غيّر الكتلتين m1 و m2 ولاحظ أن مركز الكتلة ⊕ يقترب من الكتلة الأكبر.', 'اسحب نقطة تأثير القوة على الساق، ثم اضغط «ادفع».', '21a: القوة قرب الكتلة الصغرى فتدور المنظومة مع عقارب الساعة.', '21b: القوة قرب الكتلة الكبرى فتدور عكس عقارب الساعة.', '21c: القوة عند Cm فتتحرك المنظومة انتقالياً دون دوران.'],
    concl: ['مركز الكتلة يقع أقرب إلى الكتلة الأكبر: xcm = (m1x1 + m2x2) / (m1 + m2).', 'القوة المؤثرة في Cm تسبب حركة انتقالية فقط: a = F / m.', 'القوة بعيداً عن Cm تسبب انتقالاً ودوراناً معاً.', 'مركز كتلة الأجسام المتجانسة المتناظرة في مركزها الهندسي.'],
    laws: ['g11_l4_cm'],
    controls: [R('m1', 'الكتلة الصغرى m1', .5, 5, 1, .5, 'kg'), R('m2', 'الكتلة الكبرى m2', .5, 5, 3, .5, 'kg'), R('sF', 'موقع القوة من m1', 0, 1, .15, .01, 'm'), TG('strobe', 'صور متعاقبة', true, null, 'layers')],
    setup(S) { S.cs = 'a'; D.reset(S); },
    reset(S) { S.run = 0; S.moved = 0; S.push = 0; S.cx = 0; S.cy = 0; S.vx = 0; S.A = 0; S.om = 0; S.snap = []; S.st = 0; S.vsF = S.p.sF; },
    sc(S) { return S.p.m2 / (S.p.m1 + S.p.m2); },
    update(S, dt) { S.vsF = Q54.ez(S.vsF, S.p.sF, dt, 10); const sc = D.sc(S); if (!S.moved) { S.cx = 0; S.cy = sc - .5; return; } if (!S.run) return;
      const M = S.p.m1 + S.p.m2, I = S.p.m1 * sc * sc + S.p.m2 * (1 - sc) * (1 - sc), n = 4, h2 = dt / n;
      for (let i = 0; i < n; i++) { if (S.push > 0) { const t = -(S.p.sF - sc) * Math.cos(S.A) * FF; S.vx += FF / M * h2; S.om += t / I * h2; S.push -= h2; } S.cx += S.vx * h2; S.A -= S.om * h2; }
      S.st += dt; if (S.st > .22) { S.st = 0; S.snap.push([S.cx, S.cy, S.A]); if (S.snap.length > 9) S.snap.shift(); }
      if (S.W) { const g = D.geo(S); if (g.X0 + S.cx * g.u > g.x1 - 30) S.run = 0; } },
    geo(S) { const g = Q54.geo(S); g.u = 170; g.X0 = g.x0 + 90; g.Y0 = g.y0 + (g.y1 - g.y0) * .46; return g; },
    body(S, g, cx, cy, A) { const sc = D.sc(S), dx = Math.sin(A), dy = Math.cos(A), p = s => [g.X0 + (cx + (s - sc) * dx) * g.u, g.Y0 + (cy + (s - sc) * dy) * g.u]; return { p, m1: p(0), m2: p(1), c: p(sc), F: p(S.vsF) }; },
    drawBody(ctx, S, B, al) { K.raw(ctx, () => { ctx.globalAlpha = al; }); Q41.line(ctx, [B.m1, B.m2], '#475569', 4); Q54.ball(ctx, B.m1[0], B.m1[1], 10 + S.p.m1 * 4, '#ea580c'); Q54.ball(ctx, B.m2[0], B.m2[1], 10 + S.p.m2 * 4, '#16a34a');
      K.raw(ctx, () => { const [x, y] = B.c; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(x, y, 8, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 8, y); ctx.lineTo(x + 8, y); ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8); ctx.stroke(); ctx.globalAlpha = 1; }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), sc = D.sc(S), B = D.body(S, g, S.cx, S.cy, S.A), I = S.p.m1 * sc * sc + S.p.m2 * (1 - sc) * (1 - sc), t = -(S.p.sF - sc) * FF;
      Q54.bg(ctx, w, h);
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.y0, 0, g.y1); gr.addColorStop(0, '#e0e7ff'); gr.addColorStop(1, '#c7d2fe'); ctx.fillStyle = gr; rr(ctx, g.x0, g.y0 + 6, g.x1 - g.x0, g.y1 - g.y0 - 10, 16); ctx.fill(); ctx.fillStyle = 'rgba(79,70,229,.16)'; for (let x = g.x0 + 14; x < g.x1; x += 22) for (let y = g.y0 + 20; y < g.y1 - 6; y += 22) { ctx.beginPath(); ctx.arc(x, y, 1.5, 0, TAU); ctx.fill(); } });
      Q42.T(ctx, 'منضدة هوائية: منظر من الأعلى', g.cx, g.y1 - 18, { s: 11, w: 800, c: '#4338ca' });
      if (S.p.strobe) S.snap.forEach(q => D.drawBody(ctx, S, D.body(S, g, q[0], q[1], q[2]), .28));
      if (S.moved) Q51.dash(ctx, [[g.X0, g.Y0 + S.cy * g.u], [B.c[0], B.c[1]]], '#2563eb', 1.6);
      D.drawBody(ctx, S, B, 1);
      Q42.T(ctx, 'm1', B.m1[0] + 34, B.m1[1], { s: 12, w: 900, c: '#c2410c' }); Q42.T(ctx, 'm2', B.m2[0] - 38, B.m2[1], { s: 12, w: 900, c: '#15803d' }); Q42.T(ctx, 'Cm', B.c[0] + 26, B.c[1], { s: 12, w: 900, c: '#2563eb' });
      if (!S.moved || S.push > 0) { Q54.vec(ctx, B.F[0] - 80, B.F[1], B.F[0] - 4, B.F[1], Q54C.F, 'F', { side: -1, w: 4.5 }); if (!S.moved) Q41.knob(ctx, B.F[0] - 80, B.F[1], '#f59e0b', 9); }
      if (S.moved && Math.abs(S.om) > .05) Q54.rot(ctx, B.c[0], B.c[1], 46, S.om > 0 ? -1 : 1, '#be185d', '', { a0: 20, span: 100 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      const dir = Math.abs(t) < .02 ? 'حركة انتقالية فقط دون دوران' : t > 0 ? 'تدور مع عقارب الساعة' : 'تدور عكس عقارب الساعة';
      Q42.card(ctx, S, [{ t: 'xcm = m2 L / (m1 + m2)', mono: 1, c: '#2563eb', w: 900 }, { t: 'بعد مركز الكتلة عن m1: ' + Q54.f(sc, 2) + ' m', c: '#2563eb', w: 800 }, { t: 'بعد القوة عن مركز الكتلة: ' + Q54.f(Math.abs(S.p.sF - sc), 2) + ' m', c: '#334155', w: 800 },
        { t: 'a = F / m = ' + Q54.f(FF, 0) + ' / ' + Q54.f(S.p.m1 + S.p.m2, 1) + ' = ' + Q54.f(FF / (S.p.m1 + S.p.m2), 2) + ' m/s²', mono: 1, c: Q54C.F, w: 800 }, { t: 'العزم حول مركز الكتلة: ' + Q54.f(Math.abs(t), 2) + ' N·m', c: '#be185d', w: 800 }, { t: dir, c: Math.abs(t) < .02 ? '#16a34a' : '#be185d', w: 900 }], { title: 'مركز الكتلة', y: 64, wd: 316 });
      Q42.banner(ctx, w, S.moved ? 'اضغط «أعد» ثم جرب موقعاً آخر' : 'اسحب نقطة تأثير القوة ثم ادفع');
    },
    chips(S, g) { return Q42.chips(S, 'cs', [['a', '21a قرب الصغرى'], ['b', '21b قرب الكبرى'], ['c', '21c عند Cm'], ['go', '▶ ادفع'], ['rs', '↺ أعد']], g.h - 84, S.cs, (S2, k) => { if (k === 'go') { if (!S2.moved) { S2.moved = 1; S2.run = 1; S2.push = .5; } return; } if (k === 'rs') { D.reset(S2); return; } S2.cs = k; D.reset(S2); setParam(S2, 'sF', k === 'a' ? .12 : k === 'b' ? .9 : +D.sc(S2).toFixed(2)); }, { bw: 128 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), B = D.body(S, g, S.cx, S.cy, S.A), out = [];
      out.push({ id: 'fp', x: B.F[0] - 80, y: B.F[1], r: 20, axis: 'y', keep: true, tip: 'اسحب: نقطة تأثير القوة', idle: 'اسحب ✋', drag: (S2, d) => { if (S2.moved) D.reset(S2); const sc = D.sc(S2), y0 = g.Y0 + (sc - .5 - sc) * g.u; setParam(S2, 'sF', clamp(Math.round((d.y - y0) / g.u * 100) / 100, 0, 1)); S2.cs = ''; } });
      out.push({ id: 'push', x: B.c[0], y: B.c[1], r: 18, axis: 'none', hint: false, tip: 'اضغط: ادفع', click: S2 => { if (!S2.moved) { S2.moved = 1; S2.run = 1; S2.push = .5; } else D.reset(S2); } });
      return out.concat(D.chips(S, g)); },
    readings(S) { const sc = D.sc(S); return [rd('بعد Cm عن m1', Q54.f(sc, 2) + ' m'), rd('التعجيل a = F/m', Q54.f(FF / (S.p.m1 + S.p.m2), 2) + ' m/s²'), rd('السرعة الزاوية', Q54.f(Math.abs(S.om), 2) + ' rad/s'), rd('سرعة Cm', Q54.f(S.vx, 2) + ' m/s')]; },
    explain(S) { return Q26.ex('عندما تمر القوة بمركز الكتلة تنزلق المنظومة دون دوران، وعندما تبتعد عنه تدور باتجاه يعتمد على جهة القوة.', 'القوة المؤثرة بعيداً عن Cm تولد عزماً حوله فتدور المنظومة، أما حركة Cm نفسه فتعجيلها F/m دائماً كأن الكتلة كلها مركزة فيه.', 'لاعب البلياردو يضرب الكرة في مركزها لتنزلق دون دوران جانبي.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — هل تعلم: المطرقة المقذوفة تدور حول مركز كتلتها (الشكل 23 ص 87) =============== */
(() => {
  const GG = 9.8;
  const D = { id: 'g11_p_throw', page: 87, fig: 'الشكل 23 هل تعلم',
    desc: 'عند قذف مطرقة أو عصا مرتدة في الهواء تبدو حركتها معقدة، لكن نقطة واحدة فقط فيها هي مركز الكتلة تسلك مساراً على شكل قطع مكافئ كأنها جسيم مقذوف، وبقية نقاط الجسم تدور حولها.',
    tags: 'مركز الكتلة المطرقة المقذوفة العصا المرتدة قطع مكافئ دوران حول Cm الشكل 23 هل تعلم صور متعاقبة',
    tools: ['مطرقة', 'آلة تصوير بصور متعاقبة'],
    steps: ['اسحب سهم القذف لتغيير السرعة وزاوية القذف، أو استعمل اللوحة.', 'اضغط «ارمِ المطرقة» وراقب الصور المتعاقبة.', 'مسار مركز الكتلة ⊕ قطع مكافئ منتظم، أما طرف المقبض فيرسم مساراً ملتوياً.', 'غيّر سرعة الدوران: يتغير مسار الطرف ولا يتغير مسار Cm.'],
    concl: ['مركز الكتلة يتحرك كجسيم مقذوف كتلته كتلة الجسم كلها.', 'بقية نقاط الجسم تدور حول مركز الكتلة أثناء الطيران.', 'الدوران لا يغير مسار مركز الكتلة.'],
    laws: ['g11_l4_cm'],
    controls: [R('v0', 'سرعة القذف v0', 4, 10, 7, .5, 'm/s'), R('a', 'زاوية القذف', 20, 75, 55, 1, '°'), R('spin', 'سرعة الدوران', 0, 3, 1.2, .1, 'rev/s'), TG('tr', 'مسار طرف المقبض', true, null, 'trail')],
    setup(S) { S.tt = 0; S.fly = 0; S.vu = 50; },
    T(S) { return 2 * S.p.v0 * Math.sin(Q54.d2r(S.p.a)) / GG; },
    update(S, dt) { if (S.W) S.vu = Q54.ez(S.vu, D.geo(S).ut, dt, 4); if (S.fly) { S.tt += dt * .8; if (S.tt >= D.T(S)) { S.tt = D.T(S); S.fly = 0; } } },
    geo(S) { const g = Q54.geo(S, { full: 1 }), a = Q54.d2r(S.p.a), v = S.p.v0, Rg = v * v * Math.sin(2 * a) / GG, H = Math.pow(v * Math.sin(a), 2) / (2 * GG); g.fy = g.y1 - 10; g.lx = g.x0 + 50; g.ut = Math.min(80, (g.x1 - g.lx - 60) / (Rg + .4), (g.fy - g.y0 - 60) / (H + .4)); g.u = S.vu || g.ut; return g; },
    at(S, g, t) { const a = Q54.d2r(S.p.a), v = S.p.v0; return [g.lx + v * Math.cos(a) * t * g.u, g.fy - 40 - (v * Math.sin(a) * t - GG * t * t / 2) * g.u, Math.PI / 2 + 0.3 - S.p.spin * TAU * t]; },
    hammer(ctx, x, y, q, al) { const c = Math.cos(q), s = Math.sin(q), P = d => [x + c * d, y - s * d]; K.raw(ctx, () => { ctx.globalAlpha = al; });
      const e = P(-52), hd = P(16); Q54.rod(ctx, e[0], e[1], hd[0], hd[1], 7, ['#fde68a', '#b45309', '#78350f']);
      K.raw(ctx, () => { ctx.save(); ctx.translate(hd[0], hd[1]); ctx.rotate(-q); const gr = ctx.createLinearGradient(0, -10, 0, 10); gr.addColorStop(0, '#e5e7eb'); gr.addColorStop(1, '#374151'); ctx.fillStyle = gr; rr(ctx, -4, -22, 16, 44, 3); ctx.fill(); ctx.restore(); ctx.globalAlpha = 1; }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), T = D.T(S), a = Q54.d2r(S.p.a);
      Q54.bg(ctx, w, h); Q54.ground(ctx, g.x0, w - 20, g.fy);
      const pth = []; for (let i = 0; i <= 60; i++) { const p = D.at(S, g, T * i / 60); pth.push([p[0], p[1]]); } Q51.dash(ctx, pth, 'rgba(37,99,235,.45)', 1.6);
      const tc = S.tt; if (tc > 0) { const tr = [], te = []; for (let t = 0; t <= tc + 1e-6; t += Math.max(.004, tc / 200)) { const p = D.at(S, g, t); tr.push([p[0], p[1]]); te.push([p[0] + Math.cos(p[2]) * -52, p[1] - Math.sin(p[2]) * -52]); } Q41.line(ctx, tr, '#2563eb', 3); if (S.p.tr) Q41.line(ctx, te, '#dc2626', 2); }
      for (let t = .1; t < tc; t += .1) { const p = D.at(S, g, t); D.hammer(ctx, p[0], p[1], p[2], .3); }
      const p = D.at(S, g, tc); D.hammer(ctx, p[0], p[1], p[2], 1);
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p[0], p[1], 6, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(p[0] - 6, p[1]); ctx.lineTo(p[0] + 6, p[1]); ctx.moveTo(p[0], p[1] - 6); ctx.lineTo(p[0], p[1] + 6); ctx.stroke(); });
      if (!S.fly && tc === 0) { const L = S.p.v0 * 12; Q54.vec(ctx, g.lx, g.fy - 40, g.lx + Math.cos(a) * L, g.fy - 40 - Math.sin(a) * L, Q54C.F, 'v0', { side: -1 }); Q41.knob(ctx, g.lx + Math.cos(a) * L, g.fy - 40 - Math.sin(a) * L, '#f59e0b', 9); Q51.arc(ctx, g.lx, g.fy - 40, 34, 0, S.p.a, '#be185d', Math.round(S.p.a) + '°', { lo: 30 }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      const Rg = S.p.v0 * S.p.v0 * Math.sin(2 * a) / GG;
      Q42.card(ctx, S, [{ t: 'مركز الكتلة يرسم قطعاً مكافئاً', c: '#2563eb', w: 900 }, { t: 'بقية النقاط تدور حول Cm', c: '#dc2626', w: 800 }, { t: 'R = v0² sin2θ / g = ' + Q54.f(Rg, 2) + ' m', mono: 1, c: '#334155', w: 800 }, { t: 'زمن الطيران = ' + Q54.f(T, 2) + ' s', c: '#334155', w: 800 }, { t: 'عدد الدورات = ' + Q54.f(S.p.spin * T, 2), c: '#be185d', w: 800 }], { title: 'هل تعلم: المطرقة المقذوفة', y: 64, wd: 300 });
      Q42.banner(ctx, w, 'اسحب سهم القذف ثم ارمِ المطرقة');
    },
    chips(S, g) { return Q42.chips(S, 'cs', [['go', '▶ ارمِ المطرقة'], ['rs', '↺ أعد']], g.h - 84, '', (S2, k) => { if (k === 'go') { S2.tt = 0; S2.fly = 1; } else { S2.tt = 0; S2.fly = 0; } }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), a = Q54.d2r(S.p.a), L = S.p.v0 * 12, out = [];
      if (!S.fly) out.push({ id: 'aim', x: g.lx + Math.cos(a) * L, y: g.fy - 40 - Math.sin(a) * L, r: 20, axis: 'xy', keep: true, tip: 'اسحب: السرعة والزاوية', idle: 'اسحب ✋', drag: (S2, d) => { const dx = d.x - g.lx, dy = g.fy - 40 - d.y; S2.tt = 0; setParam(S2, 'a', clamp(Math.round(Q54.r2d(Math.atan2(dy, dx))), 20, 75)); setParam(S2, 'v0', clamp(Math.round(Math.hypot(dx, dy) / 12 * 2) / 2, 4, 10)); } });
      return out.concat(D.chips(S, g)); },
    readings(S) { const a = Q54.d2r(S.p.a); return [rd('المدى الأفقي', Q54.f(S.p.v0 * S.p.v0 * Math.sin(2 * a) / GG, 2) + ' m'), rd('أقصى ارتفاع', Q54.f(Math.pow(S.p.v0 * Math.sin(a), 2) / (2 * GG), 2) + ' m'), rd('زمن الطيران', Q54.f(D.T(S), 2) + ' s'), rd('الزمن', Q54.f(S.tt, 2) + ' s')]; },
    explain(S) { return Q26.ex('المطرقة تتقلب في الهواء لكن مركز كتلتها يرسم قطعاً مكافئاً منتظماً.', 'القوة الخارجية الوحيدة هي الوزن، وهو يؤثر كأنه في مركز الكتلة، فيتحرك Cm حركة المقذوف، والدوران حوله لا يغير مساره.', 'لاعب الجمباز يدور في الهواء ومركز كتلته يرسم قطعاً مكافئاً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E3 — مركز الثقل: طريقة التعليق وخط الشاقول (4-9، الشكلان 24 و 25 ص 87–88) =============== */
(() => {
  const mkBlob = () => { const p = []; for (let i = 0; i < 48; i++) { const q = i * TAU / 48, r = 92 + 26 * Math.sin(2 * q + .5) + 16 * Math.sin(3 * q + 1.2); p.push([Math.cos(q) * r * 1.15, Math.sin(q) * r]); } return p; };
  const cen = P => { let A = 0, X = 0, Y = 0; P.forEach((a, i) => { const b = P[(i + 1) % P.length], c = a[0] * b[1] - b[0] * a[1]; A += c; X += (a[0] + b[0]) * c; Y += (a[1] + b[1]) * c; }); return [X / (3 * A), Y / (3 * A)]; };
  const sh = (P, H) => { const c = cen(P); return { poly: P.map(p => [p[0] - c[0], p[1] - c[1]]), holes: H.map(p => [p[0] - c[0], p[1] - c[1]]) }; };
  const blob = mkBlob();
  const SH = { irr: sh(blob, [-100, 15, 140].map(d => { const q = Q54.d2r(d), i = Math.round((q < 0 ? q + TAU : q) / TAU * 48) % 48; return [blob[i][0] * .88, blob[i][1] * .88]; })),
    L: sh([[-100, -110], [-40, -110], [-40, 40], [110, 40], [110, 100], [-100, 100]], [[-70, -90], [90, 70], [-80, 82]]),
    ring: { ring: 1, poly: [], holes: [-90, 30, 150].map(d => [Math.cos(Q54.d2r(d)) * 85, -Math.sin(Q54.d2r(d)) * 85]) } };
  const D = { id: 'g11_p_cg', page: 87, fig: 'الشكلان 24 و 25 + فكر ص 88',
    desc: 'مركز الثقل هو النقطة التي يبدو أن وزن الجسم كله مركز فيها، وإذا علق الجسم منها بقي متزناً في أي وضع. لتعيين مركز ثقل صفيحة غير منتظمة نعلقها من نقطة P1 ونرسم خط الشاقول المار بها، ثم نعلقها من P2 ونرسم خطاً ثانياً: نقطة تقاطع الخطين هي مركز الثقل. ومركز ثقل الأجسام المتجانسة المتناظرة في مركزها الهندسي، وقد يقع خارج مادة الجسم كما في الحلقة.',
    tags: 'مركز الثقل Cg طريقة التعليق خط الشاقول P1 P2 تقاطع الخطين صفيحة غير منتظمة الحلقة المركز الهندسي الشكل 24 الشكل 25 فكر',
    tools: ['صفيحة كارتون غير منتظمة', 'مسمار تعليق', 'خيط شاقول'],
    steps: ['علق الصفيحة من P1 وانتظر حتى تستقر: يُرسم خط الشاقول على الصفيحة تلقائياً.', 'علقها من P2 فيُرسم خط ثانٍ، وتقاطع الخطين يعين مركز الثقل.', 'علقها من P3 للتحقق: يمر الخط الثالث بالنقطة نفسها.', 'اسحب الصفيحة جانباً واتركها: تتأرجح ثم تستقر ومركز ثقلها تحت نقطة التعليق تماماً.', 'جرب الحلقة: مركز ثقلها في مركزها خارج مادتها.'],
    concl: ['عند الاستقرار يقع مركز الثقل على خط الشاقول المار بنقطة التعليق.', 'تقاطع خطي الشاقول من نقطتي تعليق مختلفتين يعين مركز الثقل.', 'مركز ثقل الجسم المتجانس المتناظر في مركزه الهندسي، وقد يقع خارج مادته.'],
    laws: ['g11_l4_cm', 'g11_l4_rot'],
    controls: [R('dmp', 'مقاومة الهواء والاحتكاك', .3, 3, 1.2, .1, ''), TG('w', 'سهم الوزن', true, null, 'vector'), TG('pl', 'خيط الشاقول', true, null, 'line'), TG('cg', 'أظهر مركز الثقل', false, null, 'target')],
    setup(S) { S.shp = 'irr'; D.hang(S, 0, true); },
    eq(h) { return Math.PI / 2 - Math.atan2(-h[1], -h[0]); },
    hang(S, k, fresh) { const B = SH[S.shp]; if (fresh) { S.lines = []; S.hole = k; S.phi = D.eq(B.holes[k]) + .55; S.om = 0; S.ox = 0; S.oy = -30; S.hold = 0; S.sett = 0; return; }
      const ho = B.holes[S.hole], hn = B.holes[k], c = Math.cos(S.phi), s = Math.sin(S.phi), dx = hn[0] - ho[0], dy = hn[1] - ho[1]; S.ox += dx * c - dy * s; S.oy += dx * s + dy * c; S.hole = k; S.om = 0; S.sett = 0; },
    rel(S) { const h = SH[S.shp].holes[S.hole], c = Math.cos(S.phi), s = Math.sin(S.phi); return [-(h[0] * c - h[1] * s), -(h[0] * s + h[1] * c)]; },
    update(S, dt) { S.ox = Q54.ez(S.ox, 0, dt, 3); S.oy = Q54.ez(S.oy, 0, dt, 3); const r = D.rel(S), L = Math.hypot(r[0], r[1]) || 1;
      if (!S.hold) { const n = 3; for (let i = 0; i < n; i++) { const r2 = D.rel(S); S.om += (30 * r2[0] / L - S.p.dmp * S.om) * dt / n; S.phi += S.om * dt / n; } }
      if (!S.hold && Math.abs(S.om) < .03 && Math.abs(r[0] / L) < .012 && Math.abs(S.ox) + Math.abs(S.oy) < 2) { S.sett += dt; if (S.sett > .4 && S.lines.indexOf(S.hole) < 0) S.lines.push(S.hole); } else S.sett = 0; },
    geo(S) { const g = Q54.geo(S); g.pvx = g.cx; g.pvy = g.y0 + 85; return g; },
    w2(S, g, q) { const h = SH[S.shp].holes[S.hole], c = Math.cos(S.phi), s = Math.sin(S.phi), x = q[0] - h[0], y = q[1] - h[1]; return [g.pvx + S.ox + x * c - y * s, g.pvy + S.oy + x * s + y * c]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), B = SH[S.shp], ho = B.holes[S.hole], cg = D.w2(S, g, [0, 0]), cols = ['#dc2626', '#2563eb', '#16a34a'];
      Q54.bg(ctx, w, h);
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.pvy - 30, 0, g.pvy - 14); gr.addColorStop(0, '#d97706'); gr.addColorStop(1, '#92400e'); ctx.fillStyle = gr; rr(ctx, g.pvx - 120, g.pvy - 34, 240, 18, 4); ctx.fill(); ctx.fillStyle = '#475569'; ctx.fillRect(g.pvx - 2, g.pvy - 18, 4, 18); });
      K.raw(ctx, () => { ctx.save(); ctx.translate(g.pvx + S.ox, g.pvy + S.oy); ctx.rotate(S.phi); ctx.translate(-ho[0], -ho[1]); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 4;
        const gr = ctx.createLinearGradient(-120, -120, 120, 120); gr.addColorStop(0, '#fef3c7'); gr.addColorStop(1, '#fbbf24'); ctx.fillStyle = gr; ctx.beginPath();
        if (B.ring) { ctx.arc(0, 0, 100, 0, TAU); ctx.moveTo(70, 0); ctx.arc(0, 0, 70, 0, TAU, true); } else B.poly.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
        ctx.closePath(); ctx.fill('evenodd'); ctx.shadowColor = 'transparent'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2; ctx.stroke();
        S.lines.forEach(k => { const q = B.holes[k], L = Math.hypot(q[0], q[1]); ctx.strokeStyle = cols[k]; ctx.lineWidth = 2.2; ctx.setLineDash([7, 4]); ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(-q[0] / L * (L + 110), -q[1] / L * (L + 110)); ctx.stroke(); ctx.setLineDash([]); });
        B.holes.forEach((q, k) => { ctx.fillStyle = '#fff'; ctx.strokeStyle = cols[k]; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(q[0], q[1], 7, 0, TAU); ctx.fill(); ctx.stroke(); }); ctx.restore(); });
      B.holes.forEach((q, k) => { const p = D.w2(S, g, q); if (k !== S.hole) Q42.T(ctx, 'P' + (k + 1), p[0] + 16, p[1] - 12, { s: 12, w: 900, c: cols[k], bg: 'rgba(255,255,255,.85)' }); });
      Q54.pin(ctx, g.pvx + S.ox, g.pvy + S.oy, 5);
      if (S.p.pl) { const by = g.pvy + 300; Q41.line(ctx, [[g.pvx, g.pvy], [g.pvx, by]], 'rgba(30,41,59,.75)', 1.4); K.raw(ctx, () => { const gr = ctx.createLinearGradient(g.pvx - 8, 0, g.pvx + 8, 0); gr.addColorStop(0, '#94a3b8'); gr.addColorStop(1, '#334155'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(g.pvx - 8, by); ctx.lineTo(g.pvx + 8, by); ctx.lineTo(g.pvx, by + 20); ctx.closePath(); ctx.fill(); }); Q42.T(ctx, 'خيط الشاقول', g.pvx + 50, by + 8, { s: 11, w: 800, c: '#334155' }); }
      const show = S.p.cg || S.lines.length >= 2;
      if (show) K.raw(ctx, () => { const [x, y] = cg; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, 8, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 8, y); ctx.lineTo(x + 8, y); ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8); ctx.stroke(); });
      if (show) Q42.T(ctx, 'Cg', cg[0] - 22, cg[1] - 14, { s: 12, w: 900, c: '#7c3aed', bg: 'rgba(255,255,255,.85)' });
      if (S.p.w) Q54.fv(ctx, cg[0], cg[1], 270, 70, Q54C.W, 'w', { side: -1 });
      Q41.knob(ctx, D.w2(S, g, [-ho[0] * 1.5, -ho[1] * 1.5])[0], D.w2(S, g, [-ho[0] * 1.5, -ho[1] * 1.5])[1], '#f59e0b', 9);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.s); Q42.drawChips(ctx, C.h);
      const r = D.rel(S), st = Math.abs(S.om) < .03 && Math.abs(r[0]) < 2;
      Q42.card(ctx, S, [{ t: st ? 'استقرت: مركز الثقل تحت نقطة التعليق' : 'تتأرجح: الوزن يولد عزماً حول نقطة التعليق', c: st ? '#16a34a' : '#be185d', w: 900 }, { t: 'ذراع الوزن حول نقطة التعليق: ' + Q54.f(Math.abs(r[0]) / 100, 2) + ' m', c: '#334155', w: 800 },
        { t: 'خطوط الشاقول المرسومة: ' + S.lines.length, c: '#0f766e', w: 900 }, { t: S.lines.length >= 2 ? 'تقاطع الخطين هو مركز الثقل Cg' : 'علق من نقطة ثانية لترسم خطاً آخر', c: S.lines.length >= 2 ? '#7c3aed' : '#64748b', w: 800 },
        { t: S.shp === 'ring' ? 'مركز ثقل الحلقة في مركزها خارج مادتها' : 'مركز الثقل نقطة يبدو أن الوزن كله مركز فيها', c: '#b45309', s: 11.5 }], { title: 'تعيين مركز الثقل بالتعليق', y: 64, wd: 300 });
      Q42.banner(ctx, w, 'علق من نقطة أو اسحب الصفيحة جانباً');
    },
    chips(S, g) { return { s: Q42.chips(S, 'shp', [['irr', 'صفيحة غير منتظمة'], ['L', 'صفيحة L'], ['ring', 'حلقة']], g.h - 128, S.shp, (S2, k) => { S2.shp = k; D.hang(S2, 0, true); }, { bw: 150 }),
      h: Q42.chips(S, 'hole', [['0', 'علق من P1'], ['1', 'علق من P2'], ['2', 'علق من P3'], ['clr', 'امسح الخطوط']], g.h - 84, String(S.hole), (S2, k) => { if (k === 'clr') { S2.lines = []; return; } if (+k !== S2.hole) D.hang(S2, +k, false); }, { bw: 130 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), ho = SH[S.shp].holes[S.hole], p = D.w2(S, g, [-ho[0] * 1.5, -ho[1] * 1.5]), C = D.chips(S, g);
      return [{ id: 'body', x: p[0], y: p[1], r: 22, axis: 'xy', keep: true, tip: 'اسحب الصفيحة جانباً واتركها', idle: 'اسحب ✋', drag: (S2, d) => { const h2 = SH[S2.shp].holes[S2.hole]; S2.hold = 1; S2.om = 0; S2.phi = Math.atan2(d.y - g.pvy, d.x - g.pvx) - Math.atan2(-h2[1], -h2[0]); }, up: S2 => { S2.hold = 0; } }].concat(C.s, C.h); },
    readings(S) { const r = D.rel(S); return [rd('نقطة التعليق', 'P' + (S.hole + 1)), rd('بعد Cg الأفقي عن نقطة التعليق', Q54.f(Math.abs(r[0]) / 100, 2) + ' m'), rd('خطوط الشاقول', String(S.lines.length)), rd('الحالة', Math.abs(S.om) < .03 && Math.abs(r[0]) < 2 ? 'مستقرة' : 'تتأرجح')]; },
    explain(S) { return Q26.ex('تتأرجح الصفيحة ثم تستقر دائماً ومركز ثقلها على خط الشاقول تحت نقطة التعليق، وتتقاطع الخطوط كلها في نقطة واحدة.', 'إذا لم يكن مركز الثقل تحت نقطة التعليق كان للوزن ذراع فيولد عزماً يديرها، ولا ينعدم العزم إلا عندما يمر خط عمل الوزن بنقطة التعليق.', 'يستعمل البناؤون خيط الشاقول لضبط استقامة الجدران، ويعلق الرسامون اللوحات من نقطة فوق مركز ثقلها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — مسائل الروافع: العتلة م1 ، لعبة التوازن م4 ، س1 فقرة 8 (ص 90–92) =============== */
(() => {
  const CS = { m1: { len: 4, F: 100, d: 2.4 }, m4: { len: 5, F: 800, d: .875 }, q8: { len: 2, F: 6, d: .4 } };
  const EX = {
    m1: { title: 'م1 ص 91', q: 'ما مقدار القوة F التي يجب أن يؤثر بها العامل في العتلة كي يستطيع رفع ثقل كتلته 20 kg ؟ ذراع الثقل 1.2 m وذراع القوة 2.4 m ، g = 10 N/kg', lines: ['وزن الصخرة w = mg = 20 × 10 = 200 N', 'العزوم حول نقطة الارتكاز: Στ = 0', 'F × 2.4 = 200 × 1.2', 'F = 240 / 2.4', 'F = 100 N'] },
    m4: { title: 'م4 ص 92', q: 'لوح متجانس وزنه 40 N مثبت من منتصفه بدعامة، يجلس عليه ولدان وزناهما 350 N على بعد 2.0 m و 800 N على بعد L. جد القوة العمودية للدعامة والبعد L كي يتزن اللوح أفقياً', lines: ['ΣFy = 0 :', 'F⊥ = 350 + 800 + 40', 'F⊥ = 1190 N', 'العزوم حول الدعامة: Στ = 0', '350 × 2.0 = 800 × L', 'L = 700 / 800', 'L = 0.875 m'] },
    q8: { title: 'س1 فقرة 8 ص 90', q: 'لوح متجانس وزنه 4 N وطوله 2 m علق في أحد طرفيه جسم وزنه 6 N. يتزن أفقياً عند نقطة ارتكاز تبعد x عن الطرف المعلق به الجسم. جد x', lines: ['وزن اللوح في منتصفه على بعد 1 − x من المرتكز', 'العزوم حول المرتكز: Στ = 0', '6 × x = 4 × (1 − x)', '10 x = 4', 'x = 0.4 m'] } };
  const D = { id: 'g11_p_lever', page: 90, fig: 'م1 و م4 + س1 فقرة 8',
    desc: 'نطبق شرطي الاتزان على ألواح ترتكز على دعامة: العتلة التي يرفع بها العامل صخرة (م1)، ولعبة التوازن التي يجلس عليها ولدان (م4)، ولوح متجانس يعلق في طرفه ثقل (س1 فقرة 8). يتزن اللوح أفقياً عندما تتساوى العزوم مع عقارب الساعة وعكسها حول المرتكز، وقوة المرتكز تساوي مجموع الأوزان.',
    tags: 'العتلة الرافعة نقطة الارتكاز لعبة التوازن م1 100N م4 1190N 0.875m س1 فقرة 8 0.4m عزم الوزن شرطا الاتزان',
    tools: ['لوح', 'دعامة مثلثة', 'أثقال'],
    steps: ['اختر المسألة من الأزرار.', 'اسحب العنصر المتحرك: يد العامل في م1 ، الولد الثاني في م4 ، المرتكز في فقرة 8.', 'غيّر القوة F من اللوحة وراقب ميل اللوح: يميل نحو العزم الأكبر.', 'عند الاتزان الأفقي تكون Στ = 0 ، واضغط «الحل خطوة خطوة» للمقارنة.'],
    concl: ['م1: F × 2.4 = 200 × 1.2 فإن F = 100 N.', 'م4: F⊥ = 1190 N و L = 0.875 m.', 'س1 فقرة 8: x = 0.4 m.', 'قوة المرتكز تساوي مجموع الأوزان لأن ΣFy = 0.'],
    laws: ['g11_l4_rot', 'g11_l4_tau'],
    controls: [R('F', 'القوة أو الوزن المتحرك F', 0, 1000, 100, 1, 'N'), R('d', 'المسافة x', .1, 2.8, 2.4, .025, 'm')],
    setup(S) { S.cs = 'm1'; S.beta = 0; S.ex = 0; S.k = 0; S.vd = S.p.d; },
    model(S) { const c = S.cs, F = S.p.F, d = S.p.d;
      if (c === 'm4') { const dd = clamp(d, .1, 2.5); return { len: 5, P: 2.5, Wb: 40, xb: 2.5, it: [{ x: .5, w: 350, k: 'boy', lab: 'الولد الأول' }, { x: 2.5 + dd, w: F, k: 'boy2', lab: 'الولد الثاني', mv: 1 }] }; }
      if (c === 'q8') { const dd = clamp(d, .1, 1.9); return { len: 2, P: 2 - dd, Wb: 4, xb: 1, it: [{ x: 2, w: F, k: 'box', lab: 'الجسم' }], mvP: 1 }; }
      const dd = clamp(d, .3, 2.8); return { len: 4, P: 1.2, Wb: 0, xb: 0, it: [{ x: 0, w: 200, k: 'rock', lab: 'الصخرة' }, { x: 1.2 + dd, w: F, k: 'hand', lab: 'قوة العامل', mv: 1 }] }; },
    tau(S, M) { let t = -M.Wb * (M.xb - M.P); M.it.forEach(o => { t += -o.w * (o.x - M.P); }); return t; },
    tabs(S, M) { let t = Math.abs(M.Wb * (M.xb - M.P)); M.it.forEach(o => { t += Math.abs(o.w * (o.x - M.P)); }); return t; },
    update(S, dt) { const M = D.model(S), t = D.tau(S, M), ta = D.tabs(S, M) || 1, tg = Q54.d2r(10) * Math.tanh(t / (.05 * ta)); S.beta = Q54.ez(S.beta, tg, dt, 4); },
    geo(S) { const g = Q54.geo(S, { full: 1 }); g.py = g.y1 - 70; return g; },
    sc(S, g, M) { const u = Math.min(150, (g.x1 - g.x0 - 120) / M.len), bx = g.cx - M.len * u / 2; return { u, bx, psx: bx + M.P * u }; },
    bp(S, g, M, Z, x, off = 0) { const c = Math.cos(S.beta), s = Math.sin(S.beta), r = (x - M.P) * Z.u; return [Z.psx + r * c + s * off, g.py - 14 - r * s + c * off]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), M = D.model(S), Z = D.sc(S, g, M), t = D.tau(S, M), A = D.bp(S, g, M, Z, 0), B = D.bp(S, g, M, Z, M.len), sumW = M.Wb + M.it.reduce((a, o) => a + o.w, 0), k = 110 / Math.max(200, ...M.it.map(o => o.w), M.Wb);
      Q54.bg(ctx, w, h); Q54.ground(ctx, g.x0, g.x1, g.py + 36);
      Q54.pivot(ctx, Z.psx, g.py - 6, 42, '#64748b');
      Q54.plank(ctx, A[0], A[1], B[0], B[1], 14);
      if (M.Wb > 0) { const p = D.bp(S, g, M, Z, M.xb); Q54.fv(ctx, p[0], p[1], 270, Math.max(26, M.Wb * k), Q54C.W, Q54.f(M.Wb, 0) + ' N', { side: -1 }); }
      M.it.forEach((o, i) => { const p = D.bp(S, g, M, Z, o.x, -7), lab = Q54.f(o.w, 0) + ' N';
        if (o.k === 'rock') K.raw(ctx, () => { const gr = ctx.createRadialGradient(p[0] - 10, p[1] - 40, 5, p[0], p[1] - 24, 44); gr.addColorStop(0, '#d6d3d1'); gr.addColorStop(1, '#57534e'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(p[0] - 36, p[1]); ctx.quadraticCurveTo(p[0] - 44, p[1] - 40, p[0] - 8, p[1] - 52); ctx.quadraticCurveTo(p[0] + 34, p[1] - 56, p[0] + 38, p[1] - 14); ctx.lineTo(p[0] + 30, p[1]); ctx.closePath(); ctx.fill(); });
        if (o.k === 'boy' || o.k === 'boy2') Q54.person(ctx, p[0], p[1], o.k === 'boy' ? 64 : 78, o.k === 'boy' ? '#ea580c' : '#16a34a');
        if (o.k === 'box') { const q = D.bp(S, g, M, Z, o.x, 0); Q54.rope(ctx, [q, [q[0], q[1] + 40]]); Q54.load(ctx, q[0], q[1] + 40, 34, 30, lab, '#475569'); }
        if (o.k === 'hand') { Q54.fv(ctx, p[0], p[1] - 70, 270, 62, Q54C.F, 'F', { side: 1, w: 5 }); Q41.knob(ctx, p[0], p[1] - 80, '#f59e0b', 10); }
        else { const q = D.bp(S, g, M, Z, o.x, 0), y0 = o.k === 'box' ? q[1] + 70 : q[1]; if (o.k === 'box') Q54.fv(ctx, q[0], y0, 270, Math.min(60, Math.max(26, o.w * k)), Q54C.W, '', { side: -1 }); else Q54.fv(ctx, q[0] + 30, q[1] - 4, 270, Math.min(80, Math.max(26, o.w * k * .7)), o.k === 'rock' ? '#57534e' : Q54C.W, '', { side: -1, toward: 1 }); }
        Q42.T(ctx, lab, p[0], (o.k === 'hand' ? p[1] - 100 : o.k === 'box' ? D.bp(S, g, M, Z, o.x, 0)[1] + 120 : p[1] - 92), { s: 12, w: 900, c: '#fff', bg: o.k === 'hand' ? Q54C.F : '#334155' }); });
      Q54.fv(ctx, Z.psx + 30, g.py + 30, 90, 60, Q54C.R, 'FN', { side: -1 });
      Q54.dim(ctx, Z.psx, g.py + 52, D.bp(S, g, M, Z, M.it[M.it.length - 1].x)[0], g.py + 52, 'x = ' + Q54.f(M.mvP ? 2 - M.P : M.it[M.it.length - 1].x - M.P, 3) + ' m', '#7c3aed');
      if (Math.abs(t) > .01 * (D.tabs(S, M) || 1)) Q54.rot(ctx, Z.psx, g.py - 14, 60, t > 0 ? 1 : -1, '#be185d', '', { a0: 60, span: 60 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q54.drawSteps(ctx, C.e);
      const L = [{ t: 'العزوم حول المرتكز:', c: '#334155', w: 900 }];
      if (M.Wb > 0 && Math.abs(M.xb - M.P) > 1e-6) L.push({ t: 'وزن اللوح: ' + Q54.sgn(-M.Wb * (M.xb - M.P), 2) + ' N·m', c: Q54C.W, w: 800 });
      M.it.forEach(o => L.push({ t: o.lab + ': ' + Q54.sgn(-o.w * (o.x - M.P), 2) + ' N·m', c: '#334155', w: 800 }));
      L.push({ t: 'Στ = ' + Q54.sgn(t, 2) + ' N·m', mono: 1, c: '#be185d', w: 900 }, { t: 'قوة المرتكز = مجموع الأوزان = ' + Q54.f(sumW, 0) + ' N', c: Q54C.R, w: 800 }, { t: Math.abs(t) < .01 * (D.tabs(S, M) || 1) ? 'اللوح متزن أفقياً' : 'يميل نحو العزم الأكبر', c: Math.abs(t) < .01 * (D.tabs(S, M) || 1) ? '#16a34a' : '#dc2626', w: 900 });
      if (S.ex) Q42.steps(ctx, S, Object.assign({}, EX[S.cs], { k: S.k }), { y: 64, x: w - 12, wd: 316 }); else Q42.card(ctx, S, L, { title: { m1: 'م1: العتلة', m4: 'م4: لعبة التوازن', q8: 'س1 فقرة 8: لوح وثقل' }[S.cs], y: 64, wd: 316 });
      Q42.banner(ctx, w, S.cs === 'q8' ? 'اسحب المرتكز تحت اللوح' : 'اسحب العنصر المتحرك على اللوح');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', [['m1', 'م1: العتلة'], ['m4', 'م4: لعبة التوازن'], ['q8', 'س1 فقرة 8']], g.h - 128, S.cs, (S2, k) => { S2.cs = k; S2.ex = 0; setParam(S2, 'F', CS[k].F); setParam(S2, 'd', k === 'm1' ? 1.6 : k === 'm4' ? 1.4 : .9); }, { bw: 160 }),
      e: Q54.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { setParam(S2, 'F', CS[S2.cs].F); setParam(S2, 'd', CS[S2.cs].d); }, EX[S.cs].lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), M = D.model(S), Z = D.sc(S, g, M), C = D.chips(S, g), out = [];
      if (M.mvP) out.push({ id: 'piv', x: Z.psx, y: g.py + 14, r: 22, axis: 'x', keep: true, tip: 'اسحب المرتكز', idle: 'اسحب ✋', drag: (S2, d) => { const bc = (d.x - Z.bx) / Z.u; setParam(S2, 'd', clamp(Math.round((2 - bc) * 40) / 40, .1, 1.9)); } });
      else { const o = M.it.find(q => q.mv), p = D.bp(S, g, M, Z, o.x, -7); out.push({ id: 'mv', x: p[0], y: o.k === 'hand' ? p[1] - 80 : p[1] - 40, r: 22, axis: 'x', keep: true, tip: 'اسحب على اللوح', idle: 'اسحب ✋', drag: (S2, d) => { const bc = M.P + (d.x - Z.psx) / (Z.u * Math.cos(S2.beta)); setParam(S2, 'd', clamp(Math.round((bc - M.P) * 40) / 40, S2.cs === 'm1' ? .3 : .1, S2.cs === 'm1' ? 2.8 : 2.5)); } }); }
      return out.concat(C.c, C.e); },
    readings(S) { const M = D.model(S), t = D.tau(S, M); return [rd('محصلة العزوم', Q54.sgn(t, 2) + ' N·m'), rd('قوة المرتكز', Q54.f(M.Wb + M.it.reduce((a, o) => a + o.w, 0), 0) + ' N'), rd('المسافة x', Q54.f(M.mvP ? 2 - M.P : M.it[M.it.length - 1].x - M.P, 3) + ' m'), rd('الحالة', Math.abs(t) < .01 * (D.tabs(S, M) || 1) ? 'متزن' : 'يميل')]; },
    explain(S) { return Q26.ex('يميل اللوح نحو الجهة ذات العزم الأكبر، ويتزن أفقياً عندما يتساوى مجموع العزوم مع عقارب الساعة وعكسها.', 'عزم كل وزن حول المرتكز = الوزن × بعده الأفقي عن المرتكز، والاتزان الدوراني يتطلب Στ = 0 ، والاتزان الانتقالي يجعل قوة المرتكز مساوية لمجموع الأوزان.', 'بالعتلة الطويلة نرفع صخرة ثقيلة بقوة صغيرة لأن ذراع القوة أطول من ذراع الثقل.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F2 — م2 الصباغ على لوح معلق بحبلين + م5 لوح أفقي مربوط بحبل إلى جدار (ص 91–92) =============== */
(() => {
  const EX = {
    m2: { title: 'م2 ص 91', q: 'صباغ كتلته 75 kg يقف على لوح منتظم كتلته 20 kg وطوله 5 m معلق من طرفيه بحبلين. إذا كان بعد الصباغ عن الطرف الأيسر d = 2 m ، جد FL و FR ، g = 10 N/kg', lines: ['الأوزان: 750 N للصباغ و 200 N للوح', 'العزوم حول الطرف الأيسر: Στ = 0', 'FR × 5 = 750 × 2 + 200 × 2.5', 'FR = 2000 / 5 = 400 N', 'ΣFy = 0 :  FL + FR = 950', 'FL = 950 − 400 = 550 N'] },
    m5: { title: 'م5 ص 92', q: 'لوح أفقي مهمل الوزن طوله 6 m يرتكز طرفه A على جدار، وطرفه B مربوط بحبل إلى الجدار يصنع 37° مع الأفق، وعلق في B ثقل 300 N. جد الشد T ورد فعل الجدار R ، علماً أن sin37° = 0.6', lines: ['العزوم حول A : Στ = 0', 'T sin37° × 6 = 300 × 6', 'T × 0.6 = 300', 'T = 500 N', 'ΣFx = 0 :  R = T cos37°', 'R = 500 × 0.8 = 400 N'] } };
  const D = { id: 'g11_p_plank', page: 91, fig: 'م2 و م5',
    desc: 'م2: صباغ يقف على لوح منتظم معلق من طرفيه بحبلين، فنجد شدي الحبلين من العزوم حول أحد الطرفين ومن ΣFy = 0. م5: لوح أفقي مهمل الوزن يرتكز على جدار ويمسكه حبل مائل، فنجد الشد ورد فعل الجدار.',
    tags: 'م2 صباغ لوح معلق حبلان FL FR 550N 400N م5 لوح أفقي حبل 37° شد 500N رد فعل الجدار 400N العزوم',
    tools: ['لوح', 'حبلان', 'ثقل', 'جدار'],
    steps: ['اختر م2 أو م5.', 'م2: اسحب الصباغ على اللوح وراقب شدي الحبلين: الحبل الأقرب إليه يحمل أكثر.', 'م5: اسحب الثقل على اللوح، واسحب نقطة ربط الحبل على الجدار لتغيير الزاوية.', 'اضغط «الحل خطوة خطوة» لحل المسألة.'],
    concl: ['م2: FR = 400 N و FL = 550 N.', 'م5: T = 500 N و R = 400 N.', 'نختار نقطة حساب العزوم عند قوة مجهولة فيختفي عزمها.'],
    laws: ['g11_l4_rot', 'g11_l4_eq'],
    controls: [R('wp', 'الوزن w', 0, 1000, 750, 10, 'N'), R('d', 'موقع الحمل d', 0, 6, 2, .1, 'm'), R('ang', 'زاوية الحبل مع الأفق', 20, 55, 37, 1, '°')],
    setup(S) { S.cs = 'm2'; S.ex = 0; S.k = 0; S.vd = S.p.d; S.va = S.p.ang; },
    update(S, dt) { S.vd = Q54.ez(S.vd, D.dd(S), dt, 10); S.va = Q54.ez(S.va, S.p.ang, dt, 10); },
    dd(S) { return S.cs === 'm2' ? Math.min(S.p.d, 5) : S.p.d; },
    m2(S) { const d = D.dd(S), FR = (S.p.wp * d + 200 * 2.5) / 5; return { FR, FL: S.p.wp + 200 - FR }; },
    m5(S) { const a = Q54.d2r(S.p.ang), b = Math.round(S.p.ang) === 37, sn = b ? .6 : Math.sin(a), cs = b ? .8 : Math.cos(a), T = S.p.wp * D.dd(S) / (6 * sn); return { T, Rx: T * cs, Ry: S.p.wp - T * sn }; },
    geo(S) { const g = Q54.geo(S); g.py = g.y1 - 80; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q54.bg(ctx, w, h);
      if (S.cs === 'm2') { const xL = g.x0 + 30, xR = g.x1 - 10, u = (xR - xL) / 5, r = D.m2(S), k = 95 / 950, top = g.y0 + 30, px = xL + S.vd * u;
        K.raw(ctx, () => { ctx.fillStyle = '#fde68a'; ctx.fillRect(g.x0, top, g.x1 - g.x0, 80); }); Q54.wall(ctx, g.x0, top + 80, g.x1 - g.x0, g.py - top - 80); Q54.ceiling(ctx, g.x0, g.x1, top);
        Q54.rope(ctx, [[xL + 6, top], [xL + 6, g.py]]); Q54.rope(ctx, [[xR - 6, top], [xR - 6, g.py]]);
        Q54.plank(ctx, xL, g.py, xR, g.py, 14);
        Q54.person(ctx, px, g.py - 7, 118, '#e2e8f0', { armR: 20 });
        Q54.fv(ctx, xL + 6, g.py - 10, 90, Math.max(20, r.FL * k), Q54C.T, 'FL', { side: -1 }); Q54.fv(ctx, xR - 6, g.py - 10, 90, Math.max(20, r.FR * k), Q54C.T, 'FR', { side: 1 });
        Q54.fv(ctx, (xL + xR) / 2, g.py + 7, 270, 200 * k + 10, Q54C.W, '200 N', { side: 1 }); Q54.fv(ctx, px + 26, g.py - 12, 270, S.p.wp * k + 10, '#a16207', Q54.f(S.p.wp, 0) + ' N', { side: -1, toward: 1 });
        Q54.dim(ctx, xL, g.py + 44, px, g.py + 44, 'd = ' + Q54.f(D.dd(S), 1) + ' m', '#7c3aed');
        Q42.T(ctx, 'FL = ' + Q54.f(r.FL, 0) + ' N', xL + 50, g.py - 150, { s: 12, w: 900, c: '#fff', bg: Q54C.T }); Q42.T(ctx, 'FR = ' + Q54.f(r.FR, 0) + ' N', xR - 50, g.py - 150, { s: 12, w: 900, c: '#fff', bg: Q54C.T }); }
      else { const ax = g.x0 + 40, u = (g.x1 - 30 - ax) / 6, bx = ax + 6 * u, a = Q54.d2r(S.va), ty = g.py - 6 * u * Math.tan(a), r = D.m5(S), k = 100 / Math.max(300, S.p.wp), lx = ax + S.vd * u;
        Q54.wall(ctx, g.x0, g.y0, ax - g.x0, g.py + 60 - g.y0); Q54.rope(ctx, [[ax, ty], [bx, g.py]], '#475569', 2);
        Q54.plank(ctx, ax, g.py, bx, g.py, 12, { col: ['#e5e7eb', '#9ca3af', '#4b5563'], plain: 1 }); Q54.pin(ctx, ax, g.py, 6); Q54.pin(ctx, ax, ty, 5);
        Q54.rope(ctx, [[lx, g.py + 6], [lx, g.py + 50]]); Q54.load(ctx, lx, g.py + 50, 56, 34, Q54.f(S.p.wp, 0) + ' N', '#a16207');
        Q54.fv(ctx, bx, g.py, 180 - S.va, Math.min(200, r.T * k), Q54C.T, 'T', { side: 1 }); Q51.arc(ctx, bx, g.py, 40, 180 - S.va, 180, '#be185d', Math.round(S.va) + '°', { lo: 18 });
        if (r.Rx > .5) Q54.fv(ctx, ax, g.py, 0, Math.min(180, r.Rx * k), Q54C.R, 'Rx', { side: 1 }); if (Math.abs(r.Ry) > .5) Q54.fv(ctx, ax + 4, g.py, r.Ry > 0 ? 90 : 270, Math.min(160, Math.abs(r.Ry) * k), Q54C.N, 'Ry', { side: -1 });
        Q42.T(ctx, 'A', ax + 14, g.py + 22, { s: 13, w: 900, c: '#0f172a' }); Q42.T(ctx, 'B', bx + 12, g.py + 22, { s: 13, w: 900, c: '#0f172a' }); Q41.knob(ctx, ax + 14, ty, '#f59e0b', 9); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q54.drawSteps(ctx, C.e);
      let L; if (S.cs === 'm2') { const r = D.m2(S); L = [{ t: 'العزوم حول الطرف الأيسر:', c: '#334155', w: 900 }, { t: 'FR × 5 = w d + 200 × 2.5', mono: 1, c: '#be185d', w: 800 }, { t: 'FR = ' + Q54.f(r.FR, 1) + ' N', mono: 1, c: Q54C.T, w: 900 }, { t: 'FL = ΣW − FR = ' + Q54.f(r.FL, 1) + ' N', mono: 1, c: Q54C.T, w: 900 }, { t: 'الحبل الأقرب إلى الصباغ يحمل أكثر', c: '#64748b', s: 11.5 }]; }
      else { const r = D.m5(S); L = [{ t: 'العزوم حول A :', c: '#334155', w: 900 }, { t: 'T sinθ × 6 = w × d', mono: 1, c: '#be185d', w: 800 }, { t: 'T = ' + Q54.f(r.T, 1) + ' N', mono: 1, c: Q54C.T, w: 900 }, { t: 'رد الفعل الأفقي: ' + Q54.f(r.Rx, 1) + ' N', c: Q54C.R, w: 800 }, { t: 'رد الفعل الشاقولي: ' + Q54.f(r.Ry, 1) + ' N', c: Q54C.N, w: 800 }, { t: 'إذا علق الثقل عند B ينعدم رد الفعل الشاقولي', c: '#64748b', s: 11.5 }]; }
      if (S.ex) Q42.steps(ctx, S, Object.assign({}, EX[S.cs], { k: S.k }), { y: 64, x: w - 12, wd: 316 }); else Q42.card(ctx, S, L, { title: S.cs === 'm2' ? 'م2: لوح الصباغ' : 'م5: لوح وحبل مائل', y: 64, wd: 316 });
      Q42.banner(ctx, w, S.cs === 'm2' ? 'اسحب الصباغ على اللوح' : 'اسحب الثقل أو نقطة ربط الحبل');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', [['m2', 'م2: الصباغ'], ['m5', 'م5: الحبل المائل']], g.h - 128, S.cs, (S2, k) => { S2.cs = k; S2.ex = 0; D.cas(S2); }, { bw: 160 }),
      e: Q54.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => D.cas(S2), 6) }; },
    cas(S) { if (S.cs === 'm2') { setParam(S, 'wp', 750); setParam(S, 'd', 2); } else { setParam(S, 'wp', 300); setParam(S, 'd', 6); setParam(S, 'ang', 37); } },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), out = [];
      if (S.cs === 'm2') { const xL = g.x0 + 30, u = (g.x1 - 10 - xL) / 5; out.push({ id: 'man', x: xL + S.vd * u, y: g.py - 60, r: 24, axis: 'x', keep: true, tip: 'اسحب الصباغ', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'd', clamp(Math.round((d.x - xL) / u * 10) / 10, 0, 5)) }); }
      else { const ax = g.x0 + 40, u = (g.x1 - 30 - ax) / 6, ty = g.py - 6 * u * Math.tan(Q54.d2r(S.va));
        out.push({ id: 'box', x: ax + S.vd * u, y: g.py + 67, r: 24, axis: 'x', keep: true, tip: 'اسحب الثقل', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'd', clamp(Math.round((d.x - ax) / u * 10) / 10, 0, 6)) },
          { id: 'tie', x: ax + 14, y: ty, r: 20, axis: 'y', keep: true, hint: false, tip: 'اسحب: زاوية الحبل', drag: (S2, d) => setParam(S2, 'ang', clamp(Math.round(Q54.r2d(Math.atan((g.py - d.y) / (6 * u)))), 20, 55)) }); }
      return out.concat(C.c, C.e); },
    readings(S) { if (S.cs === 'm2') { const r = D.m2(S); return [rd('FL', Q54.f(r.FL, 1) + ' N'), rd('FR', Q54.f(r.FR, 1) + ' N'), rd('d', Q54.f(D.dd(S), 1) + ' m')]; } const r = D.m5(S); return [rd('الشد T', Q54.f(r.T, 1) + ' N'), rd('Rx', Q54.f(r.Rx, 1) + ' N'), rd('Ry', Q54.f(r.Ry, 1) + ' N'), rd('الزاوية', Math.round(S.p.ang) + '°')]; },
    explain(S) { return Q26.ex('في م2 يزداد شد الحبل الأقرب إلى الصباغ ويقل شد الآخر، ومجموعهما ثابت يساوي الأوزان. وفي م5 يقل الشد كلما كبرت زاوية الحبل.', 'نحسب العزوم حول نقطة تمر بها قوة مجهولة فيختفي عزمها، ثم نكمل بشرط ΣF = 0.', 'سقالات الصباغين وأرفف الجدران المثبتة بحبال أو دعامات مائلة تصمم بهذه الطريقة.'); }
  };
  M8.P[D.id] = D;
})();

/* ====================== wrappers ====================== */
Object.keys(M8.P).filter(k => /^g11_p_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g11_p_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merges (book order) ====================== */
M8.merge({ id: 'g11_c4_eq', ch: 54, reg: X11, sec: '4-1 مفهوم الاتزان + 4-2 شرط الاتزان الانتقالي + 4-3 شرط الاتزان الدوراني', page: 74, kind: 'مثال', title: 'شرطا الاتزان: الانتقالي والدوراني',
  desc: 'الجسم المتزن محصلة القوى المؤثرة فيه صفر ΣF = 0 ، فيبقى ساكناً أو يتحرك بسرعة ثابتة. ومثال 1: كرة معلقة بخيط تسحبها قوة أفقية. ثم نرى أن القوى غير المتلاقية تدير الجسم رغم أن محصلتها صفر، فيلزم شرط ثانٍ Στ = 0.',
  tags: 'الاتزان الجسم الصلد اتزان سكوني اتزان حركي ΣF=0 Στ=0 مثال 1 م6 قوى متلاقية غير متلاقية',
  fact: ['الجسم الصلد جسم لا تتغير المسافات بين جسيماته مهما أثرت فيه قوى (ص 74).', 'الاتزان السكوني: الجسم ساكن. الاتزان الحركي: الجسم يتحرك بسرعة ثابتة بخط مستقيم (ص 74).', 'القوى المتلاقية في نقطة واحدة ومحصلتها صفر لا تسبب دوراناً، أما غير المتلاقية فقد تسببه (ص 76).'],
  quiz: [{ q: 'لكي يكون الجسم متزناً ويتحقق شرطا الاتزان فإن:', o: ['ΣF = 0 و Στ = 0', 'ΣF < 0 و Στ > 0', 'ΣF > 1 و Στ = 0', 'ΣF > 0 و Στ = 0'], a: 0, why: 'الاتزان التام يتطلب انعدام محصلة القوى ومحصلة العزوم معاً (س1 فقرة 2).' },
    { q: 'صندوق وزنه 60 N معلق بحبل، أثرت فيه قوة أفقية 80 N. الزاوية التي يصنعها الحبل مع الشاقول:', o: ['53°', '37°', '45°', '60°'], a: 0, why: 'tanθ = 80/60 = 1.33 فإن θ = 53° (س1 فقرة 7).' },
    { q: 'في مثال 1 إذا كان F = 15 N والخيط يصنع 53° مع السقف فإن الشد T يساوي:', o: ['25 N', '20 N', '15 N', '12 N'], a: 0, why: 'T cos53° = 15 فإن T = 15/0.6 = 25 N.' }],
  parts: [{ id: 'g11_p_eqtrans', n: 'الاتزان الانتقالي: مثال 1 و م6' }, { id: 'g11_p_eqrot', n: 'الاتزان الدوراني: الشكلان 3 و 4' }] });
M8.merge({ id: 'g11_c4_torque', ch: 54, reg: X11, sec: '4-4 العزم', page: 76, kind: 'نشاط', title: 'نشاط: العوامل التي يعتمد عليها العزم',
  desc: 'العزم قابلية القوة على تدوير الجسم حول محور. بمفتاح ربط وميزان نابضي نجد أن العزم يعتمد على مقدار القوة وبعد نقطة تأثيرها عن المحور والزاوية بينهما: τ = F ℓ sinθ. ثم نطبقه على فتح الباب وسؤال «فكر».',
  tags: 'العزم نشاط مفتاح ربط ميزان نابضي τ=Fℓsinθ الباب المفاصل مثال 2 فكر',
  fact: ['ℓ sinθ هو البعد العمودي بين خط عمل القوة ومحور الدوران ويسمى ذراع القوة (ص 79).', 'العزم أعظم ما يمكن عندما تكون القوة عمودية على الذراع، وصفر عندما تؤثر على امتداده (ص 81).', 'وحدة العزم N·m (ص 79).'],
  quiz: [{ q: 'يقاس العزم بوحدات:', o: ['N·m', 'N/m', 'kg·m', 'kg/m'], a: 0, why: 'العزم = قوة × بعد (س1 فقرة 1).' },
    { q: 'يدفع شخص باباً بقوة 10 N عمودياً عند نقطة تبعد 80 cm عن المفاصل. عزم القوة بوحدات N·m:', o: ['8', '0.08', '80', '800'], a: 0, why: 'τ = 10 × 0.8 = 8 N·m (س1 فقرة 3).' },
    { q: 'مفتاح ربط طوله 0.20 m أثرت فيه قوة 20 N بزاوية 37° مع الذراع. العزم:', o: ['2.4 N·m', '4 N·m', '3.2 N·m', '1.2 N·m'], a: 0, why: 'τ = 20 × 0.6 × 0.20 = 2.4 N·m (مثال 2).' }],
  parts: [{ id: 'g11_p_spanner', n: 'نشاط مفتاح الربط + مثال 2' }, { id: 'g11_p_door', n: 'عزم القوة على الباب + فكر' }] });
M8.merge({ id: 'g11_c4_tvec', ch: 54, reg: X11, sec: '4-5 العزم كمية متجهة + 4-6 محصلة العزوم', page: 79, kind: 'مثال', title: 'العزم كمية متجهة ومحصلة العزوم',
  desc: 'τ = r × F واتجاهه عمودي على مستوي r و F بقاعدة الكف اليمنى، موجب عكس عقارب الساعة وسالب معها، ويعتمد على النقطة المرجعية. محصلة العزوم مجموعها الجبري، ومثال 3 أسطوانة مدرجة.',
  tags: 'العزم متجه r×F قاعدة الكف اليمنى موجب سالب النقطة المرجعية محصلة العزوم مثال 3 أسطوانة',
  fact: ['العزم الذي يدير الجسم عكس عقارب الساعة يعد موجباً، ومع عقارب الساعة سالباً (ص 80).', 'عزم قوة حول نقطة تقع على خط عملها يساوي صفراً (ص 80).'],
  quiz: [{ q: 'في مثال 3: τ1 = −5 N·m و τ2 = +3 N·m. محصلة العزوم واتجاه الدوران:', o: ['−2 N·m مع عقارب الساعة', '+2 N·m عكس عقارب الساعة', '−8 N·m مع عقارب الساعة', '8 N·m عكس عقارب الساعة'], a: 0, why: 'Στ = −5 + 3 = −2 N·m والإشارة السالبة تعني مع عقارب الساعة.' },
    { q: 'اتجاه متجه العزم τ = r × F يكون:', o: ['عمودياً على المستوي الذي يحوي r و F', 'باتجاه F', 'باتجاه r', 'بين r و F'], a: 0, why: 'ناتج الضرب الاتجاهي عمودي على المتجهين ويعين بقاعدة الكف اليمنى.' }],
  parts: [{ id: 'g11_p_rhr', n: 'τ = r × F وقاعدة الكف اليمنى' }, { id: 'g11_p_cyl', n: 'محصلة العزوم: مثال 3' }] });
M8.merge({ id: 'g11_c4_ladder', ch: 54, reg: X11, sec: '4-6 تطبيق شرطي الاتزان: السلم', page: 83, kind: 'مثال', title: 'مثال 4: سلم يستند إلى جدار أملس',
  desc: 'نطبق شرطي الاتزان على سلم منتظم يستند إلى جدار أملس وأرض خشنة لنجد أصغر زاوية لا ينزلق عندها: tanθ = 1/2μs ، ثم م3 الصباغ على السلم.',
  tags: 'السلم جدار أملس احتكاك مثال 4 51° م3 179N',
  fact: ['عند حل مسائل الاتزان نختار نقطة حساب العزوم عند قوة مجهولة فيختفي عزمها (ص 84).', 'قاعدة السلم المطاطية تزيد معامل الاحتكاك فيمكن وضع السلم بزاوية أصغر.'],
  quiz: [{ q: 'سلم منتظم يستند إلى جدار أملس، ومعامل الاحتكاك السكوني مع الأرض 0.4. أصغر زاوية مع الأرض دون انزلاق:', o: ['51°', '39°', '22°', '68°'], a: 0, why: 'tanθ = 1/(2 × 0.4) = 1.25 فإن θ = 51°.' },
    { q: 'إذا صعد الصباغ على السلم إلى أعلى فإن الاحتكاك اللازم لاتزان السلم:', o: ['يزداد', 'يقل', 'لا يتغير', 'يصبح صفراً'], a: 0, why: 'يزداد عزم وزن الصباغ حول القاعدة فتزداد P ومعها الاحتكاك اللازم.' }],
  parts: [{ id: 'g11_p_ladder', n: 'السلم: مثال 4 و م3' }] });
M8.merge({ id: 'g11_c4_couple', ch: 54, reg: X11, sec: '4-7 المزدوج', page: 84, kind: 'مثال', title: 'المزدوج: مقود السيارة والقضيب AB',
  desc: 'قوتان متساويتان متعاكستان متوازيتان لا يجمعهما خط عمل واحد. عزمهما = F × البعد العمودي بينهما، ولا يعتمد على موقع محور الدوران.',
  tags: 'المزدوج مقود صنبور الشكل 19 الشكل 20 24 N·m',
  fact: ['تدوير مقود السيارة وصنبور الماء ومفتاح تغيير الإطارات أمثلة على المزدوج (ص 84).', 'عزم المزدوج = إحدى القوتين × البعد العمودي بينهما (ص 85).'],
  quiz: [{ q: 'يستقر ساق متجانس من منتصفه فوق دعامة، وأثرت قوتان متساويتان مقداراً ومتعاكستان اتجاهاً في طرفيه. محصلة القوى تساوي:', o: ['صفراً', '2F نحو الأعلى', '2F للأسفل', 'F/2 للأسفل'], a: 0, why: 'القوتان متساويتان ومتعاكستان فمحصلتهما صفر (س1 فقرة 4).' },
    { q: 'في السؤال السابق، نتيجة تأثير القوتين فإن الساق:', o: ['يدور', 'يبقى ساكناً', 'يتحرك انتقالياً', 'يتحرك حركة اهتزازية'], a: 0, why: 'القوتان تكونان مزدوجاً عزمه غير صفر فيدور الساق (س1 فقرة 5).' },
    { q: 'قوتا مزدوج 6 N والبعد بينهما 4 m. عزم المزدوج حول نقطة D تبعد 1 m عن A:', o: ['24 N·m', '18 N·m', '6 N·m', '12 N·m'], a: 0, why: 'τ = 6 × 1 + 6 × 3 = 24 N·m ، وهو لا يعتمد على المحور.' }],
  parts: [{ id: 'g11_p_couple', n: 'المزدوج: الشكلان 19 و 20' }] });
M8.merge({ id: 'g11_c4_cm', ch: 54, reg: X11, sec: '4-8 مركز الكتلة + 4-9 مركز الثقل', page: 86, kind: 'نشاط', title: 'مركز الكتلة ومركز الثقل',
  desc: 'مركز الكتلة نقطة إذا مر بها خط عمل القوة تحرك الجسم انتقالياً دون دوران، ويقع أقرب إلى الكتلة الأكبر. والمطرقة المقذوفة تدور حوله وهو يرسم قطعاً مكافئاً. ومركز الثقل نقطة يبدو أن وزن الجسم كله مركز فيها، ونعينه بالتعليق من نقطتين.',
  tags: 'مركز الكتلة مركز الثقل Cm Cg الشكل 21 الشكل 23 المطرقة الشكل 25 التعليق خط الشاقول',
  fact: ['هل تعلم: عند قذف مطرقة يسلك مركز كتلتها مساراً على شكل قطع مكافئ بينما تدور بقية نقاطها حوله (ص 87).', 'فكر: مركز الثقل نقطة يبدو أن وزن الجسم كله مركز فيها، ومركز الكتلة نقطة إذا مر بها خط عمل القوة لا تسبب دوران الجسم (ص 88).', 'مركز ثقل الأجسام المتجانسة المتناظرة يقع في مركزها الهندسي (ص 88).'],
  quiz: [{ q: 'أثرت قوة في ساق خفيفة تحمل كتلتين عند نقطة أقرب إلى الكتلة الأصغر. المنظومة:', o: ['تدور مع عقارب الساعة', 'تدور عكس عقارب الساعة', 'تتحرك انتقالياً فقط', 'تبقى ساكنة'], a: 0, why: 'الشكل 21a: القوة لا تمر بمركز الكتلة فتولد عزماً يدير المنظومة مع عقارب الساعة.' },
    { q: 'إذا أثرت القوة في مركز كتلة المنظومة فإنها:', o: ['تتحرك انتقالياً بتعجيل a = F/m', 'تدور فقط', 'تدور وتنتقل', 'لا تتحرك'], a: 0, why: 'الشكل 21c: لا عزم حول Cm فتكون الحركة انتقالية فقط.' },
    { q: 'لتعيين مركز ثقل صفيحة غير منتظمة نعلقها من نقطتين ونرسم خطي الشاقول، فمركز الثقل:', o: ['نقطة تقاطع الخطين', 'نقطة التعليق الأولى', 'منتصف المسافة بين نقطتي التعليق', 'أبعد نقطة عن التعليق'], a: 0, why: 'مركز الثقل يقع على كل خط شاقول يمر بنقطة التعليق، فهو تقاطعهما (الشكل 25).' }],
  parts: [{ id: 'g11_p_cm', n: 'مركز الكتلة: الشكل 21' }, { id: 'g11_p_throw', n: 'هل تعلم: المطرقة المقذوفة' }, { id: 'g11_p_cg', n: 'مركز الثقل بطريقة التعليق' }] });
M8.merge({ id: 'g11_c4_review', ch: 54, reg: X11, sec: 'أسئلة الفصل الرابع ومسائله', page: 89, kind: 'مثال', title: 'مسائل الفصل: الروافع والألواح والحبال',
  desc: 'حل تفاعلي لمسائل الفصل: العتلة م1 ، الصباغ على لوح معلق م2 ، لعبة التوازن م4 ، اللوح والحبل المائل م5 ، واللوح والثقل في س1 فقرة 8. (م3 في تجربة السلم و م6 في تجربة الكرة المعلقة).',
  tags: 'مسائل الفصل الرابع م1 م2 م4 م5 س1 فقرة 8 العتلة لعبة التوازن الصباغ حبل مائل',
  fact: ['قوة الدعامة في لعبة التوازن تساوي مجموع الأوزان: 350 + 800 + 40 = 1190 N (م4).', 'بعتلة ذراع قوتها ضعف ذراع الثقل نرفع الثقل بنصف وزنه (م1).'],
  quiz: [{ q: 'عتلة متجانسة كتلتها m معلقة من أعلاها عند O وتتحرك بحرية. أصغر قوة F عمودية على العتلة عند طرفها السفلي تجعلها متزنة بزاوية θ مع الشاقول:', o: ['(mg/2) sinθ', '2mg', '2mg sinθ', '2mg cosθ'], a: 0, why: 'F ℓ = mg (ℓ/2) sinθ فإن F = (mg/2) sinθ (س1 فقرة 6).' },
    { q: 'لوح متجانس وزنه 4 N وطوله 2 m علق في طرفه جسم 6 N. يتزن عند نقطة تبعد عن الطرف المعلق به الجسم:', o: ['0.4 m', '0.2 m', '0.6 m', '0.8 m'], a: 0, why: '6x = 4(1 − x) فإن x = 0.4 m (س1 فقرة 8).' },
    { q: 'م1: صخرة 20 kg ، ذراع الثقل 1.2 m وذراع القوة 2.4 m. القوة اللازمة (g = 10):', o: ['100 N', '200 N', '400 N', '50 N'], a: 0, why: 'F × 2.4 = 200 × 1.2 فإن F = 100 N.' },
    { q: 'م5: لوح مهمل الوزن 6 m وحبل يصنع 37° مع الأفق عند B وثقل 300 N عند B. الشد T:', o: ['500 N', '300 N', '400 N', '375 N'], a: 0, why: 'T sin37° × 6 = 300 × 6 فإن T = 300/0.6 = 500 N.' }],
  parts: [{ id: 'g11_p_lever', n: 'العتلة ولعبة التوازن: م1 و م4 وفقرة 8' }, { id: 'g11_p_plank', n: 'الصباغ والحبل المائل: م2 و م5' }] });
