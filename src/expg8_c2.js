'use strict';
/* ====================== الثاني المتوسط — الفصل الثاني: قوانين الحركة (ch 22, ص 23–33) ======================
   Five merged experiments (M8.merge, parts registered in M8.P, merged at the end):
   g8_inertia (coin · newton1) · g8_newton2 (newton2_lab · fma) · g8_newton3 (n3_push · n3_jet) · g8_gravity_weight (gravity · weight) · g8_fall (freefall · cog · weightless)
   Uses the grade-7 kits K (expg7_0kit.js) and C2 (expg7_c2.js). Local helpers in Q22 (realistic person Q22.man, scene-dependent controls Q22.V/Q22.vis). */
LW({ id: 'g8_n1', cat: 22, name: 'القانون الأول لنيوتن (القصور الذاتي)', fx: 'إذا كانت <i>F</i><sub>net</sub> = 0 ⟸ يبقى الساكن ساكناً، والمتحرك متحركاً بسرعة ثابتة وباتجاه ثابت', sym: 'القصور الذاتي: ميل الجسم إلى مقاومة أي تغيير في حالته الحركية، ومقياسه كتلة الجسم' });
LW({ id: 'g8_n2', cat: 22, name: 'القانون الثاني لنيوتن', fx: '<i>F</i> = <i>m</i> × <i>a</i>', sym: 'F القوة المحصلة (N)، m الكتلة (kg)، a التعجيل (m/s²). التعجيل يتناسب طردياً مع القوة وعكسياً مع الكتلة', calc: { in: [['m', 'الكتلة m', 'kg', 50], ['a', 'التعجيل a', 'm/s²', 2]], out: 'القوة F', u: 'N', f: v => v.m * v.a } });
LW({ id: 'g8_n2a', cat: 22, name: 'التعجيل من القانون الثاني', fx: '<i>a</i> = ' + FR('<i>F</i>', '<i>m</i>'), sym: 'كلما زادت القوة زاد التعجيل، وكلما زادت الكتلة قل التعجيل', calc: { in: [['F', 'القوة F', 'N', 100], ['m', 'الكتلة m', 'kg', 50]], out: 'التعجيل a', u: 'm/s²', f: v => v.F / v.m } });
LW({ id: 'g8_n3', cat: 22, name: 'القانون الثالث لنيوتن', fx: '<i>F</i><sub>الفعل</sub> = − <i>F</i><sub>رد الفعل</sub>', sym: 'لكل قوة فعل قوة رد فعل مساوية لها في المقدار ومعاكسة لها في الاتجاه، وتؤثران في جسمين مختلفين' });
LW({ id: 'g8_grav', cat: 22, name: 'قانون الجذب العام لنيوتن', fx: '<i>F</i> ∝ ' + FR('<i>m</i><sub>1</sub> × <i>m</i><sub>2</sub>', '<i>d</i>²'), sym: 'قوة التجاذب تتناسب طردياً مع حاصل ضرب الكتلتين وعكسياً مع مربع البعد بين مركزيهما' });
LW({ id: 'g8_w', cat: 22, name: 'الوزن', fx: '<i>w</i> = <i>m</i> × <i>g</i> , &nbsp; <i>g</i> = 9.8 N/kg', sym: 'w الوزن (N)، m الكتلة (kg)، g تعجيل الجاذبية الأرضية', calc: { in: [['m', 'الكتلة m', 'kg', 1500], ['g', 'g', 'N/kg', 9.8]], out: 'الوزن w', u: 'N', f: v => v.m * v.g } });
LW({ id: 'g8_ff', cat: 22, name: 'السقوط الحر', fx: 'جميع الأجسام في الفراغ تسقط بالتعجيل نفسه <i>g</i> ≈ 9.8 m/s²', sym: 'السقوط الحر: سقوط الجسم تحت تأثير الجاذبية الأرضية فقط (بإهمال مقاومة الهواء)' });
LW({ id: 'g8_cog', cat: 22, name: 'مركز الثقل', fx: 'مركز الثقل <i>C</i>: النقطة التي تمر بها محصلة قوى جذب الأرض لجميع أجزاء الجسم', sym: 'في الأجسام المنتظمة يقع في منتصف أبعادها، وقد يقع خارج مادة الجسم (الحلقة)' });

const Q22 = {
  T(ctx, s, x, y, o) { C2.T(ctx, s, x, y, o || {}); },
  F(ctx, x, y, dx, dy, label, col, w = 4) { C2.force(ctx, x, y, dx, dy, label, col, w); },
  now() { return performance.now() / 1000; },
  banner(ctx, w, s, col = '#0f766e', y = 22) { Q22.T(ctx, s, (w + 64) / 2, y, { s: 14, w: 900, c: '#fff', bg: col }); },
  /* outdoor background: sky + ground at gy */
  outdoor(ctx, w, h, gy, o = {}) {
    G.bg(ctx, w, h, false);
    K.raw(ctx, () => {
      const g = ctx.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, o.top || '#7dd3fc'); g.addColorStop(1, o.bot || '#e0f2fe'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, gy);
      const gg = ctx.createLinearGradient(0, gy, 0, h); gg.addColorStop(0, o.g1 || '#86efac'); gg.addColorStop(1, o.g2 || '#15803d'); ctx.fillStyle = gg; ctx.fillRect(0, gy, w, h - gy);
    });
  },
  road(ctx, w, y, hgt, off) {
    K.raw(ctx, () => {
      ctx.fillStyle = '#475569'; ctx.fillRect(0, y, w, hgt); ctx.fillStyle = '#94a3b8'; ctx.fillRect(0, y, w, 4);
      ctx.fillStyle = '#f8fafc'; const p = 90; let x0 = -((off % p) + p) % p; for (let x = x0; x < w; x += p) ctx.fillRect(x, y + hgt * .55, 46, 5);
    });
  },
  trees(ctx, w, y, off, s = 1) {
    K.raw(ctx, () => { const p = 260 * s; let x0 = -((off * .5 % p) + p) % p; for (let x = x0; x < w + p; x += p) { ctx.fillStyle = '#92400e'; ctx.fillRect(x + 40, y - 40 * s, 10 * s, 40 * s); ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(x + 45, y - 55 * s, 26 * s, 0, TAU); ctx.fill(); ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(x + 38, y - 62 * s, 14 * s, 0, TAU); ctx.fill(); } });
  },
  /* drinking glass: bottom centre (x, yb) */
  glass(ctx, x, yb, w, h, o = {}) {
    K.raw(ctx, () => {
      ctx.fillStyle = 'rgba(186,230,253,.35)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.moveTo(x - w / 2, yb - h); ctx.lineTo(x - w * .38, yb); ctx.lineTo(x + w * .38, yb); ctx.lineTo(x + w / 2, yb - h); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x, yb - h, w / 2, 5, 0, 0, TAU); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(x - w * .36, yb - h + 10, 5, h - 22);
      if (o.water) { ctx.fillStyle = 'rgba(56,189,248,.35)'; const lv = yb - h * o.water; const k = (yb - lv) / h; ctx.beginPath(); ctx.moveTo(x - w * .38 - w * .12 * k, lv); ctx.lineTo(x - w * .38, yb - 2); ctx.lineTo(x + w * .38, yb - 2); ctx.lineTo(x + w * .38 + w * .12 * k, lv); ctx.fill(); }
    });
  },
  coin(ctx, x, y, r, th = 6, col = '#facc15') { // y = bottom of coin, side view
    K.raw(ctx, () => { ctx.fillStyle = shade(col, -30); rr(ctx, x - r, y - th, 2 * r, th, 3); ctx.fill(); ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(x, y - th, r, r * .28, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = shade(col, -45); ctx.lineWidth = 1; ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, y - th, r * .62, r * .17, 0, 0, TAU); ctx.stroke(); });
  },
  star(ctx, x, y, r, col = '#fde047') { K.raw(ctx, () => { ctx.fillStyle = col; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2; ctx.beginPath(); for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, rr2 = k % 2 ? r * .45 : r; ctx.lineTo(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2); } ctx.closePath(); ctx.fill(); ctx.stroke(); }); },
  /* seated person (side view, facing +x). hip (x,y), lean rad (+ forward) */
  sit(ctx, x, y, s, lean, o = {}) {
    K.raw(ctx, () => {
      const sh = [x + Math.sin(lean) * 36 * s, y - Math.cos(lean) * 36 * s], hd = [x + Math.sin(lean) * 50 * s, y - Math.cos(lean) * 50 * s];
      const kn = [x + 30 * s, y - 2 * s], ft = [x + 38 * s, y + 30 * s];
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.strokeStyle = o.pants || '#1e3a8a'; ctx.lineWidth = 10 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(kn[0], kn[1]); ctx.lineTo(ft[0], ft[1]); ctx.stroke();
      ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.ellipse(ft[0] + 5 * s, ft[1] + 2 * s, 8 * s, 4 * s, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = o.shirt || '#f59e0b'; ctx.lineWidth = 15 * s; ctx.beginPath(); ctx.moveTo(x, y - 4 * s); ctx.lineTo(sh[0], sh[1]); ctx.stroke();
      const hand = o.hand || [sh[0] + 22 * s, sh[1] + 20 * s];
      ctx.strokeStyle = '#f2c29b'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(sh[0], sh[1] + 3 * s); ctx.lineTo((sh[0] + hand[0]) / 2 + 2 * s, (sh[1] + hand[1]) / 2 + 6 * s); ctx.lineTo(hand[0], hand[1]); ctx.stroke();
      ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(hd[0], hd[1], 10 * s, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = o.hair || '#3f2a1d'; ctx.beginPath(); ctx.arc(hd[0] - 1 * s, hd[1] - 2 * s, 10 * s, Math.PI * .95 + lean, Math.PI * 1.9 + lean); ctx.fill();
      ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(hd[0] + 5 * s * Math.cos(lean), hd[1] + 5 * s * Math.sin(lean) - 1, 1.5 * s, 0, TAU); ctx.fill();
      if (o.belt) { ctx.strokeStyle = '#111827'; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(o.belt[0], o.belt[1]); ctx.lineTo(sh[0] + 2 * s, sh[1] + 4 * s); ctx.lineTo(x + 8 * s, y - 2 * s); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 6 * s, y - 3 * s); ctx.lineTo(x + 12 * s, y - 3 * s); ctx.stroke(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(x + 6 * s, y - 6 * s, 7 * s, 6 * s); }
      ctx.lineCap = 'butt';
    });
    return { sh: [x + Math.sin(lean) * 36 * s, y - Math.cos(lean) * 36 * s], hd: [x + Math.sin(lean) * 50 * s, y - Math.cos(lean) * 50 * s] };
  },
  /* bicycle side view: ground contact centre (x, y), wheel radius r */
  bike(ctx, x, y, r, ang = 0, col = '#dc2626') {
    K.raw(ctx, () => {
      const b = [x - r * 1.25, y - r], f = [x + r * 1.25, y - r]; C2.wheel(ctx, b[0], b[1], r, ang); C2.wheel(ctx, f[0], f[1], r, ang);
      const seat = [x - r * .45, y - r * 2.15], pedal = [x - r * .05, y - r * .95], head = [x + r * .9, y - r * 2.2];
      ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(pedal[0], pedal[1]); ctx.lineTo(seat[0], seat[1]); ctx.lineTo(b[0], b[1]); ctx.moveTo(pedal[0], pedal[1]); ctx.lineTo(head[0] - r * .1, head[1] + r * .25); ctx.lineTo(seat[0] + r * .05, seat[1] + r * .2); ctx.moveTo(f[0], f[1]); ctx.lineTo(head[0], head[1]); ctx.stroke();
      ctx.strokeStyle = '#111827'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(seat[0] - 9, seat[1] - 3); ctx.lineTo(seat[0] + 9, seat[1] - 3); ctx.moveTo(head[0], head[1]); ctx.lineTo(head[0] - 8, head[1] - 6); ctx.stroke(); ctx.lineCap = 'butt';
    });
    return { seat: [x - r * .45, y - r * 2.2], bar: [x + r * .82, y - r * 2.4], pedal: [x - r * .05, y - r * .95] };
  },
  /* stick rider (generic person) rotated: centre of hips (x,y), angle rot */
  flyer(ctx, x, y, s, rot) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round';
      ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 8 * s; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-22 * s, 14 * s); ctx.moveTo(0, 0); ctx.lineTo(-26 * s, 2 * s); ctx.stroke();
      ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 13 * s; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(30 * s, -4 * s); ctx.stroke();
      ctx.strokeStyle = '#f2c29b'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(26 * s, -6 * s); ctx.lineTo(48 * s, -14 * s); ctx.moveTo(26 * s, -2 * s); ctx.lineTo(48 * s, 6 * s); ctx.stroke();
      ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(41 * s, -4 * s, 9 * s, 0, TAU); ctx.fill(); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(41 * s, -6 * s, 10 * s, Math.PI, TAU); ctx.fill();
      ctx.restore(); });
  },
  strobe(S, key, x, y, every = .06) { const a = S[key] || (S[key] = []); const t = S.t; if (!a.lt || t - a.lt >= every) { a.push([x, y]); a.lt = t; if (a.length > 40) a.shift(); } },
  drawStrobe(ctx, a, col = '#7c3aed', r = 4) { if (!a) return; K.raw(ctx, () => { a.forEach((p, i) => { ctx.globalAlpha = .25 + .6 * i / a.length; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, TAU); ctx.fill(); }); ctx.globalAlpha = 1; }); },
  btnObj(id, b, click, o = {}) { return Object.assign({ id, x: b.x, y: b.y, w: b.w, h: b.h, tip: o.tip || 'اضغط', hint: !!o.hint, click }, o.idle ? { idle: o.idle } : {}); },
  /* row of on-canvas buttons, right-to-left; returns rects */
  row(w, y, n, bw = 150, gap = 10) { const tot = n * bw + (n - 1) * gap, x0 = (w + 64) / 2 + tot / 2 - bw / 2; return Array.from({ length: n }, (_, i) => ({ x: x0 - i * (bw + gap), y, w: bw, h: 38 })); },
  /* two-bone IK: root A, target T, lengths, pref = direction the joint should bulge to */
  ik(A, T, l1, l2, pref) {
    const dx = T[0] - A[0], dy = T[1] - A[1], d = Math.hypot(dx, dy) || 1e-6, dm = clamp(d, Math.abs(l1 - l2) + .01, l1 + l2 - .01);
    const a = Math.atan2(dy, dx), al = Math.acos(clamp((l1 * l1 + dm * dm - l2 * l2) / (2 * l1 * dm), -1, 1));
    const J1 = [A[0] + l1 * Math.cos(a + al), A[1] + l1 * Math.sin(a + al)], J2 = [A[0] + l1 * Math.cos(a - al), A[1] + l1 * Math.sin(a - al)];
    const mx = A[0] + dx / 2, my = A[1] + dy / 2, s1 = (J1[0] - mx) * pref[0] + (J1[1] - my) * pref[1], s2 = (J2[0] - mx) * pref[0] + (J2[1] - my) * pref[1];
    const J = s1 >= s2 ? J1 : J2, ex = T[0] - J[0], ey = T[1] - J[1], el = Math.hypot(ex, ey) || 1;
    return [J, [J[0] + ex / el * l2, J[1] + ey / el * l2]];
  },
  limb(ctx, a, b, w, col, out) { ctx.lineCap = 'round'; ctx.strokeStyle = out || shade(col, -55); ctx.lineWidth = w + 2.2; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); },
  /* realistic side-view person. o: hip [x,y], dir ±1 (facing), s scale (s=1 ≈ 1.7 m tall ≈ 175 px), lean (rad, +forward),
     feet [[near],[far]] = sole points, hands [[near],[far]] (targets), shirt, pants, skin, hair, shoe, kid, sleeve:'long'|'short', mid(ctx) */
  man(ctx, o) {
    const s = o.s || 1, dir = o.dir || 1, lean = o.lean || 0, hx = o.hip[0], hy = o.hip[1];
    const TH = 45 * s, SH = 44 * s, TO = 54 * s, UA = 30 * s, FA = 28 * s, HR = 11.5 * s;
    const sh = [hx + dir * Math.sin(lean) * TO, hy - Math.cos(lean) * TO], hl = lean + (o.nod || 0);
    const hd = [sh[0] + dir * Math.sin(hl) * (HR + 7 * s) + dir * 2 * s, sh[1] - Math.cos(hl) * (HR + 7 * s)];
    const feet = o.feet || [[hx + dir * 6 * s, hy + TH + SH + 7 * s], [hx - dir * 5 * s, hy + TH + SH + 7 * s]];
    const legs = feet.map(f => Q22.ik([hx, hy], [f[0], f[1] - 7 * s], TH, SH, [dir, 0]));
    const hands = o.hands || [[sh[0] + dir * 5 * s, sh[1] + UA + FA - 3 * s], [sh[0] - dir * 3 * s, sh[1] + UA + FA - 3 * s]];
    const arms = hands.map(t => Q22.ik([sh[0], sh[1] + 3 * s], t, UA, FA, o.elb || [-dir, .6]));
    const skin = o.skin || '#f1c27d', shirt = o.shirt || '#2563eb', pants = o.pants || '#1e3a8a', shoe = o.shoe || '#3f3f46', hair = o.hair || '#3b2414';
    K.raw(ctx, () => {
      ctx.save(); ctx.lineJoin = 'round';
      const leg = (L, f, dark) => { const pc = dark ? shade(pants, -22) : pants; Q22.limb(ctx, [hx, hy], L[0], 15.5 * s, pc); Q22.limb(ctx, L[0], L[1], 13 * s, pc);
        const an = L[1]; ctx.fillStyle = dark ? shade(shoe, -15) : shoe; ctx.strokeStyle = '#18181b'; ctx.lineWidth = 1; ctx.beginPath();
        ctx.moveTo(an[0] - dir * 7 * s, an[1] - 3 * s); ctx.lineTo(an[0] - dir * 7 * s, an[1] + 7 * s); ctx.lineTo(an[0] + dir * 17 * s, an[1] + 7 * s); ctx.quadraticCurveTo(an[0] + dir * 19 * s, an[1] + 1 * s, an[0] + dir * 8 * s, an[1] - 1 * s); ctx.lineTo(an[0] + dir * 3 * s, an[1] - 5 * s); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e4e4e7'; ctx.fillRect(Math.min(an[0] - dir * 7 * s, an[0] + dir * 17 * s), an[1] + 5 * s, 24 * s, 2 * s); };
      const arm = (A, dark) => { const sc = dark ? shade(shirt, -25) : shirt, sk = dark ? shade(skin, -18) : skin, S0 = [sh[0], sh[1] + 3 * s];
        if (o.sleeve === 'long') { Q22.limb(ctx, S0, A[0], 11 * s, sc); Q22.limb(ctx, A[0], A[1], 9.6 * s, sc); }
        else { Q22.limb(ctx, S0, A[0], 10 * s, sk); Q22.limb(ctx, A[0], A[1], 8.6 * s, sk); Q22.limb(ctx, S0, [S0[0] + (A[0][0] - S0[0]) * .55, S0[1] + (A[0][1] - S0[1]) * .55], 12.5 * s, sc); }
        ctx.fillStyle = sk; ctx.strokeStyle = shade(skin, -60); ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(A[1][0], A[1][1], 5.6 * s, 4.8 * s, Math.atan2(A[1][1] - A[0][1], A[1][0] - A[0][0]), 0, TAU); ctx.fill(); ctx.stroke(); };
      leg(legs[1], feet[1], 1); arm(arms[1], 1);
      // torso
      const tg = ctx.createLinearGradient(hx - 14 * s, 0, hx + 14 * s, 0); tg.addColorStop(0, shade(shirt, dir > 0 ? -30 : 25)); tg.addColorStop(1, shade(shirt, dir > 0 ? 25 : -30));
      Q22.limb(ctx, [hx, hy + 3 * s], [hx, hy + 3 * s], 22 * s, pants);
      ctx.lineCap = 'round'; ctx.strokeStyle = shade(shirt, -60); ctx.lineWidth = 28.5 * s; ctx.beginPath(); ctx.moveTo(hx, hy - 2 * s); ctx.lineTo(sh[0], sh[1] + 5 * s); ctx.stroke();
      ctx.strokeStyle = tg; ctx.lineWidth = 26.5 * s; ctx.beginPath(); ctx.moveTo(hx, hy - 2 * s); ctx.lineTo(sh[0], sh[1] + 5 * s); ctx.stroke();
      ctx.strokeStyle = shade(pants, -35); ctx.lineWidth = 3.5 * s; ctx.beginPath(); ctx.moveTo(hx - 13 * s * Math.cos(lean), hy - 13 * s * Math.sin(lean) * dir); ctx.lineTo(hx + 13 * s * Math.cos(lean), hy + 13 * s * Math.sin(lean) * dir); ctx.stroke();
      leg(legs[0], feet[0], 0);
      // neck + head
      Q22.limb(ctx, [sh[0], sh[1]], [hd[0] - dir * 2 * s, hd[1] + 6 * s], 8.5 * s, skin);
      ctx.save(); ctx.translate(hd[0], hd[1]); ctx.rotate(dir * hl * .5); ctx.scale(dir, 1);
      ctx.fillStyle = skin; ctx.strokeStyle = shade(skin, -70); ctx.lineWidth = 1.1; ctx.beginPath(); ctx.ellipse(0, 0, HR, HR * 1.08, 0, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(HR * .85, -2 * s); ctx.quadraticCurveTo(HR + 4 * s, 2 * s, HR * .9, 4 * s); ctx.fill(); ctx.stroke();
      ctx.fillStyle = hair; ctx.beginPath(); ctx.moveTo(-HR * .95, HR * .45); ctx.quadraticCurveTo(-HR * 1.25, -HR * .9, 0, -HR * 1.18); ctx.quadraticCurveTo(HR * 1.05, -HR * 1.05, HR * 1.02, -HR * .25); ctx.quadraticCurveTo(HR * .3, -HR * .6, -HR * .1, -HR * .25); ctx.quadraticCurveTo(-HR * .4, HR * .1, -HR * .55, HR * .5); ctx.closePath(); ctx.fill();
      if (o.longHair) { ctx.beginPath(); ctx.moveTo(-HR * .9, 0); ctx.quadraticCurveTo(-HR * 1.4, HR * 1.4, -HR * .3, HR * 1.6); ctx.lineTo(-HR * .3, HR * .4); ctx.fill(); }
      ctx.fillStyle = shade(skin, -25); ctx.beginPath(); ctx.ellipse(-HR * .15, HR * .15, 2.6 * s, 3.4 * s, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(HR * .55, -HR * .12, 2.4 * s, 1.7 * s, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#1c1917'; ctx.beginPath(); ctx.arc(HR * .62, -HR * .12, 1.3 * s, 0, TAU); ctx.fill();
      ctx.strokeStyle = hair; ctx.lineWidth = 1.4 * s; ctx.beginPath(); ctx.moveTo(HR * .35, -HR * .38); ctx.lineTo(HR * .8, -HR * .36); ctx.stroke();
      ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 1.2 * s; ctx.beginPath(); if (o.strain) { ctx.moveTo(HR * .35, HR * .55); ctx.lineTo(HR * .75, HR * .5); } else { ctx.moveTo(HR * .4, HR * .5); ctx.quadraticCurveTo(HR * .6, HR * .62, HR * .78, HR * .48); } ctx.stroke();
      if (o.cap) { ctx.fillStyle = o.cap; ctx.beginPath(); ctx.ellipse(0, -HR * .55, HR * 1.05, HR * .62, 0, Math.PI, TAU); ctx.fill(); ctx.fillRect(0, -HR * .6, HR * 1.6, 3 * s); }
      ctx.restore();
      if (o.mid) o.mid(ctx);
      arm(arms[0], 0);
      ctx.restore();
    });
    return { sh, hd, hands: arms.map(a => a[1]), knees: legs.map(l => l[0]) };
  },
  /* walking feet + bob for a person whose hip x = x, ground gy, phase ph (rad) */
  walk(x, gy, ph, s, dir, stride = 1) {
    const A = 20 * s * stride, L = 96 * s;
    const f = k => { const p = ph + k * Math.PI; return [x + dir * A * Math.sin(p), gy - Math.max(0, Math.cos(p)) * 9 * s * stride]; };
    return { feet: [f(0), f(1)], hip: [x, gy - L + Math.abs(Math.sin(ph)) * 2.5 * s * stride], sw: Math.sin(ph) };
  },
  V(c, f) { c.vis = f; return c; },
  /* realistic replacement for C2.kid (same signature): feet centre (x,y), size s (s=1 ≈ 80 px tall), hands → (hx,hy) */
  kidR(ctx, x, y, s, col, dir, hx, hy, lean = 0, o = {}) {
    const m = s * .44, push = lean > .15;
    const hip = [x - dir * (push ? 16 : 0) * m, y - (push ? 89 : 95) * m];
    const feet = push ? [[x + dir * 12 * m, y], [x - dir * 44 * m, y]] : [[x + dir * 8 * m, y], [x - dir * 7 * m, y]];
    const hands = hx != null ? [[hx, hy], [hx - dir * 4 * m, hy + 5 * m]] : undefined;
    return Q22.man(ctx, { hip, dir, s: m, lean: push ? Math.min(.6, lean * .8 + .18) : lean * .5, feet, hands, elb: [-dir, .3], shirt: col, pants: o.pants || '#1e3a8a', hair: o.hair, longHair: o.longHair, strain: push, sleeve: o.sleeve });
  },
  /* hide controls that do not apply to the current scene (c.vis(s) === false) */
  vis(s) { const R0 = Runner.S; if (!R0 || !R0._subs || R0._subs[R0._part] !== s || !s.E) return; const box = document.getElementById('ctls'); if (!box) return;
    (s.E.controls || []).forEach((c, i) => { if (!c.vis) return; const on = !!c.vis(s), dsp = on ? '' : 'none'; const d = box.querySelector('.ctl[data-i="' + (i + 1) + '"]'); if (d && d.style.display !== dsp) d.style.display = dsp;
      if (c.type === 'toggle') document.querySelectorAll('#fxStrip .fxb').forEach(b => { if (b.dataset.tip === c.label && b.style.display !== dsp) b.style.display = dsp; }); }); },
  /* explanation block: what you see / why / daily life */
  ex(see, why, life) { return '<p style="margin:0 0 5px"><b>👀 ماذا ترى؟</b> ' + see + '</p><p style="margin:0 0 5px"><b>❓ لماذا؟</b> ' + why + '</p>' + (life ? '<p style="margin:0"><b>🏠 في حياتك:</b> ' + life + '</p>' : ''); }
};

/* =========================================================================================
   1) نشاط استهلالي (ص 23): القصور الذاتي والحركة — القدح والورقة والنقود
   ========================================================================================= */
(() => {
  const AMAX = 520; // px/s² — the largest acceleration friction can give to an object on the card
  const D = { id: 'g8_inertia_coin', ch: 22, sec: 'نشاط استهلالي', page: 23, kind: 'نشاط استهلالي',
    title: 'نشاط استهلالي: القصور الذاتي والحركة (القدح والورقة والنقود)',
    desc: 'نضع ورقة مقوّاة على فتحة قدح وفوقها قطعة نقود، ثم نسحب الورقة ببطء مرة وبسرعة مرة أخرى. لماذا تقع النقود في القدح عند السحب السريع؟',
    tags: 'قصور ذاتي نيوتن قدح نقود ورقة مفرش سحب سريع',
    tools: ['قدح زجاجي', 'نقود معدنية', 'ورق مقوّى'],
    steps: ['القدح على الطاولة، والورقة على فتحته، وقطعة النقود فوق الورقة (كما في الشكل).', 'اسحب طرف الورقة (من اليد) ببطء نحو اليمين. ماذا تلاحظ؟ — أو اضغط «🐢 اسحب ببطء».', 'أعد الترتيب، ثم اسحب الورقة بسرعة (حركة خاطفة) واتركها. ماذا تلاحظ؟', 'لماذا تقع قطعة النقود في القدح؟ فعّل «قوة الاحتكاك» و«آثار الحركة» وراقب.', 'جرّب مثال «مفرش المائدة» ومثال «عمود القطع النقدية»: الفكرة نفسها!', 'سجّل سرعة السحب ونتيجتها في الجدول. ماذا نسمّي هذه الخاصية؟'],
    concl: ['عند السحب البطيء تتحرك النقود مع الورقة لأن الاحتكاك يكفي ليحرّكها معها.', 'عند السحب السريع لا يكفي الزمن القصير لتحريك النقود، فتبقى في مكانها (تحاول الاحتفاظ بحالة السكون) ثم تسقط في القدح بفعل الجاذبية.', 'ميل الجسم إلى مقاومة أي تغيير في حالته الحركية يسمّى «القصور الذاتي» (الاستمرارية).'],
    laws: ['g8_n1'],
    fact: ['يستطيع بعض السحرة سحب مفرش المائدة بسرعة كبيرة من تحت الأطباق والكؤوس دون أن تسقط — إنه القصور الذاتي وليس سحراً!', 'كلما كانت كتلة الجسم أكبر كان قصوره الذاتي أكبر، لذلك يصعب تحريك المنضدة الكبيرة أكثر من الكرسي.'],
    controls: [SEL('sc', 'المثال', [['coin', '🥛 القدح والنقود'], ['cloth', '🍽️ مفرش المائدة'], ['stack', '🪙 عمود القطع النقدية']], 'coin', (v, S) => D.reset(S)),
      BT('', [{ t: '🐢 اسحب ببطء', on: S => D.auto(S, 1) }, { t: '⚡ اسحب بسرعة', on: S => D.auto(S, 2) }, { t: '↺ أعد الترتيب', on: S => D.reset(S) }]),
      TG('vel', 'أسهم السرعة', true, null, 'velocity'), TG('fr', 'قوة الاحتكاك على الأجسام', true, null, 'force'), TG('trail', 'آثار الحركة (صور متتابعة)', true, null, 'dot'), TG('lab', 'البطاقات والشرح', true, null, 'labels')],
    setup(S) { D.reset(S); S.rows = S.rows || []; },
    reset(S) { S.kx = 0; S.kv = 0; S.drag = 0; S.au = 0; S.vmax = 0; S.res = ''; S.done = 0; S.items = null; S.tr = []; S.st = null; S.pull = 0; S.sv = 0; S.hits = 0; },
    geo(S) {
      const w = S.W, h = S.H, sc = S.p.sc, by = h * .74;
      if (sc === 'coin') { const cw = clamp(w * .17, 90, 140), ch = cw * 1.35, cx = (w + 64) / 2 - 20, ty = by - ch, KL = cw * 2.6; return { w, h, by, cw, ch, cx, ty, KL, k0: cx - KL / 2, pxcm: cw / 8 }; }
      if (sc === 'cloth') { const tx0 = Math.max(90, w * .16), tx1 = w - Math.max(110, w * .2), ty = h * .5; return { w, h, by, tx0, tx1, ty, KL: tx1 - tx0, k0: tx0 - 14, pxcm: (tx1 - tx0) / 120 }; }
      const cr = clamp(w * .05, 26, 40); return { w, h, by, cr, sx: (w + 64) / 2 + 60, th: cr * .34, pxcm: cr / 1.3 };
    },
    mkItems(S, g) {
      if (S.p.sc === 'coin') return [{ x: g.cx, y: g.ty - 3, v: 0, vy: 0, st: 'on', k: 'coin', r: g.cw * .26 }];
      return [{ x: g.tx0 + g.KL * .22, k: 'plate', r: 46 }, { x: g.tx0 + g.KL * .5, k: 'cup', r: 18 }, { x: g.tx0 + g.KL * .76, k: 'vase', r: 20 }].map(o => Object.assign(o, { y: g.ty - 3, v: 0, vy: 0, st: 'on' }));
    },
    auto(S, m) { if (S.p.sc === 'stack') { S.pull = m === 2 ? 150 : 35; S.sv = S.pull * 15; S.st = S.st || null; return; } D.reset(S); S.au = m; S.kv = m === 2 ? 2600 : 110; },
    update(S, dt) {
      dt = Math.min(dt, .04); if (!S.W) return; const g = D.geo(S), p = S.p;
      if (p.sc === 'stack') return D.upStack(S, dt, g);
      if (!S.items) S.items = D.mkItems(S, g);
      if (S.drag) { const v = (S.kx - (S.kxp ?? S.kx)) / dt; S.kv = S.kv * .5 + v * .5; }
      else if (S.au) { S.kx += S.kv * dt; if (S.kx > g.KL * 1.7) { S.au = 0; S.kv = 0; } }
      else if (Math.abs(S.kv) > 300) { S.kx += S.kv * dt; } else S.kv = 0;
      S.kx = clamp(S.kx, -10, g.KL * 2.2); S.kxp = S.kx; S.vmax = Math.max(S.vmax, Math.abs(S.kv));
      const L = g.k0 + S.kx, Rr = L + g.KL + (p.sc === 'cloth' ? 60 : 0);
      S.items.forEach(o => {
        if (o.st === 'on') {
          const dv = S.kv - o.v; o.slip = Math.abs(dv) > 2 ? Math.sign(dv) : 0; o.v += clamp(dv, -AMAX * dt, AMAX * dt); o.x += o.v * dt;
          const edge = p.sc === 'cloth' ? g.tx1 : 1e9;
          if (o.x < L || o.x > Rr || o.x > edge + 6) { o.st = 'fall'; o.vy = 0; o.slip = 0; }
        } else if (o.st === 'fall') {
          o.vy += 1600 * dt; o.x += o.v * dt; o.y += o.vy * dt;
          if (p.sc === 'coin') { const inCup = Math.abs(o.x - g.cx) < g.cw * .38; const floor = inCup ? g.by - 4 : (Math.abs(o.x - g.cx) < g.cw * .5 ? g.ty : g.by);
            if (o.y >= floor) { o.y = floor; o.vy = 0; o.st = 'rest'; o.res = inCup ? 'in' : 'out'; } }
          else { const onT = o.x > g.tx0 && o.x < g.tx1; const floor = onT ? g.ty : g.by + 20; if (o.y >= floor && (onT || o.y >= floor)) { o.y = floor; o.vy = 0; o.st = onT ? 'rest' : 'broken'; } }
        } else { o.v -= Math.sign(o.v) * Math.min(Math.abs(o.v), AMAX * 2.5 * dt); o.x += o.v * dt; }
        if (p.trail !== false && o.st !== 'rest' && o.st !== 'broken' && (Math.abs(o.v) > 5 || o.st === 'fall')) Q22.strobe(S, 'tr', o.x, o.y - 8, .05);
      });
      const all = S.items.every(o => o.st === 'rest' || o.st === 'broken');
      const onHand = S.kx > g.KL * 1.05 && S.items.every(o => o.st === 'on');
      if (!S.done && (all || onHand)) {
        S.done = 1; const sp = S.vmax / g.pxcm;
        if (p.sc === 'coin') { const ok = S.items[0].res === 'in'; S.res = ok ? 'سقطت في القدح' : 'تحركت مع الورقة'; C2.msg(S, ok ? 'سقطت النقود في القدح!\nبقيت ساكنة بسبب قصورها الذاتي' : 'تحركت النقود مع الورقة\nلأن السحب بطيء فحرّكها الاحتكاك', 4); if (ok) K.cheer(S, g.cx, g.ty); }
        else { const br = S.items.filter(o => o.st === 'broken').length; S.res = br ? 'سقط ' + br + ' وانكسر' : 'بقيت الأطباق على المنضدة'; C2.msg(S, br ? 'سحبتَ ببطء فتحركت الأطباق مع المفرش وسقطت!' : 'رائع! بقيت الأطباق في مكانها\nبسبب القصور الذاتي', 4); if (!br) K.cheer(S, (g.tx0 + g.tx1) / 2, g.ty - 60); }
        S.lastSp = sp;
      }
    },
    upStack(S, dt, g) {
      if (!S.st) S.st = { c: Array.from({ length: 6 }, (_, i) => ({ x: g.sx, y: g.by - i * g.th, v: 0, vy: 0, i })), rx: 0, rv: 0, hit: 0 };
      const st = S.st;
      if (S.sv > 0 && !S.drag) { st.rv = S.sv; S.sv = 0; S.lastPull = S.pull; }
      if (st.rv > 0) { st.rx += st.rv * dt; st.rx = Math.min(st.rx, 0); if (st.rx >= 0 && !st.hit) { // hits the bottom coin
          st.hit = 1; const base = st.c.filter(c => !c.out).sort((a, b) => b.y - a.y)[0]; const v = st.rv;
          if (v > 900 && base) { base.v = v * 1.1; base.out = 1; S.hits++; S.res = 'خرجت السفلى وبقي العمود'; C2.msg(S, 'خرجت القطعة السفلى وحدها!\nوبقيت القطع الأخرى في مكانها (قصور ذاتي)', 3.5); }
          else { st.c.filter(c => !c.out).forEach(c => c.v = v * .35); S.res = 'تحرك العمود كله'; C2.msg(S, 'الضربة بطيئة: تحرك العمود كله معاً', 3); }
          S.vmax = v; S.done = 1; S.lastSp = v / g.pxcm; st.rv = 0; } }
      else if (!S.drag) st.rx = Math.min(0, st.rx + 160 * dt * (st.hit ? 1 : 0));
      if (st.hit && st.rx >= 0) { st.hit = 0; }
      st.c.forEach(c => { c.v -= Math.sign(c.v) * Math.min(Math.abs(c.v), (c.out ? 700 : 900) * dt); c.x += c.v * dt; });
      // drop the coins that lost their support
      const stay = st.c.filter(c => !c.out).sort((a, b) => b.y - a.y); stay.forEach((c, k) => { const ty = g.by - k * g.th; if (c.y < ty) { c.vy += 1600 * dt; c.y = Math.min(ty, c.y + c.vy * dt); if (c.y >= ty) c.vy = 0; } });
      if (S.p.trail !== false) st.c.forEach(c => { if (Math.abs(c.v) > 20 && c.out) Q22.strobe(S, 'tr', c.x, c.y - g.th / 2, .04); });
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.by });
      if (p.sc === 'coin') D.drawCoin(ctx, S, g); else if (p.sc === 'cloth') D.drawCloth(ctx, S, g); else D.drawStack(ctx, S, g);
      if (p.trail !== false) Q22.drawStrobe(ctx, S.tr, '#a855f7', 3.5);
      const cms = Math.abs(S.kv) / (g.pxcm || 1);
      if (p.lab !== false) {
        const L = [{ t: 'سرعة السحب الآن: ' + fmt(p.sc === 'stack' ? (S.st ? S.st.rv : 0) / g.pxcm : cms, 3) + ' cm/s', c: '#0f766e' }];
        if (S.lastSp) L.push({ t: 'آخر محاولة: ' + fmt(S.lastSp, 3) + ' cm/s ← ' + S.res, c: '#7c3aed' });
        L.push({ t: 'القصور الذاتي: الجسم يقاوم تغيير حالته الحركية', c: '#b45309' });
        C2.lines(ctx, L, w - 16, 44, Math.min(360, w * .5), { title: 'ماذا يحدث؟', bd: '#0f766e' });
      }
      Q22.banner(ctx, w, p.sc === 'stack' ? 'اسحب المسطرة إلى الخلف ثم اتركها لتضرب القطعة السفلى' : 'اسحب الورقة (من اليد) ببطء مرة، وبسرعة خاطفة مرة أخرى', '#0f766e', 20);
      C2.drawMsg(ctx, S, (w + 64) / 2, h * .3);
      K.party(ctx, S);
    },
    drawCoin(ctx, S, g) {
      const p = S.p, L = g.k0 + S.kx, o = (S.items || D.mkItems(S, g))[0];
      Q22.glass(ctx, g.cx, g.by, g.cw, g.ch);
      if (o.st === 'rest' && o.res === 'in') Q22.coin(ctx, o.x, o.y, o.r * .9, 5);
      // card
      K.raw(ctx, () => { ctx.fillStyle = '#a8a29e'; ctx.strokeStyle = '#57534e'; ctx.lineWidth = 1.5; const y = g.ty - 3; ctx.save(); if (S.kx > g.KL * .55) { const a = Math.min(.25, (S.kx - g.KL * .55) / g.KL * .4); ctx.translate(L + g.KL, y); ctx.rotate(-a); ctx.translate(-(L + g.KL), -y); } rr(ctx, L, y, g.KL, 5, 2); ctx.fill(); ctx.stroke(); ctx.restore(); });
      if (!(o.st === 'rest' && o.res === 'in')) Q22.coin(ctx, o.x, o.y, o.r, 6);
      C2.hand(ctx, L + g.KL + 4, g.ty - 1, -1, 1.15, { sleeve: '#0ea5e9' });
      D.arrows(ctx, S, g, [o], L + g.KL + 40, g.ty - 30);
      if (p.lab !== false) { Q22.T(ctx, 'قدح زجاجي', g.cx, g.by + 18, { s: 12, w: 800, c: '#fff', bg: 'rgba(30,41,59,.8)' }); Q22.T(ctx, 'ورق مقوّى', L + g.KL * .25, g.ty + 18, { s: 11.5, w: 800, c: '#57534e' }); }
    },
    drawCloth(ctx, S, g) {
      const p = S.p, L = g.k0 + S.kx, items = S.items || D.mkItems(S, g);
      K.raw(ctx, () => { // table
        ctx.fillStyle = '#92400e'; ctx.fillRect(g.tx0 + 10, g.ty + 12, 14, g.by - g.ty - 12); ctx.fillRect(g.tx1 - 24, g.ty + 12, 14, g.by - g.ty - 12);
        const tg = ctx.createLinearGradient(0, g.ty, 0, g.ty + 14); tg.addColorStop(0, '#d97706'); tg.addColorStop(1, '#92400e'); ctx.fillStyle = tg; rr(ctx, g.tx0 - 6, g.ty, g.KL + 12, 14, 4); ctx.fill();
        // cloth: top part + hanging part at right edge
        const cl = Math.max(L, g.tx0 - 14), cr = g.tx1 + 6; if (cr > cl) { ctx.fillStyle = '#ef4444'; ctx.fillRect(cl, g.ty - 3, cr - cl, 5); for (let x = cl; x < cr; x += 16) { ctx.fillStyle = '#fff'; ctx.fillRect(x, g.ty - 3, 8, 5); } }
        const hang = Math.max(0, L + g.KL + 60 - cr); const hx = cr; ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.moveTo(hx, g.ty - 3); ctx.lineTo(hx + 8 + hang * .3, g.ty - 3 + 6); ctx.lineTo(hx + 26 + hang * .9, g.ty + 70 - Math.min(40, hang * .3)); ctx.lineTo(hx + 4 + hang * .9, g.ty + 76 - Math.min(40, hang * .3)); ctx.closePath(); ctx.fill();
      });
      const hx = g.tx1 + 18 + Math.max(0, L + g.KL + 60 - g.tx1 - 6) * .9, hy = g.ty + 66 - Math.min(40, Math.max(0, L + g.KL + 60 - g.tx1 - 6) * .3);
      C2.hand(ctx, hx + 6, hy, -1, 1.1, { sleeve: '#0ea5e9', rot: -.5 });
      items.forEach(o => D.dish(ctx, o));
      D.arrows(ctx, S, g, items, hx + 40, hy - 30);
      if (p.lab !== false) Q22.T(ctx, 'مفرش المائدة', (g.tx0 + g.tx1) / 2, g.ty + 34, { s: 12, w: 800, c: '#fff', bg: 'rgba(185,28,28,.85)' });
      S._hand = [hx, hy];
    },
    dish(ctx, o) {
      K.raw(ctx, () => { const x = o.x, y = o.y;
        if (o.st === 'broken') { ctx.fillStyle = o.k === 'vase' ? '#2563eb' : '#e2e8f0'; ctx.strokeStyle = '#64748b'; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(x - 20 + k * 10, y); ctx.lineTo(x - 14 + k * 10, y - 8 - (k % 2) * 5); ctx.lineTo(x - 8 + k * 10, y); ctx.fill(); ctx.stroke(); } return; }
        if (o.k === 'plate') { ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x, y - 4, 44, 7, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.ellipse(x, y - 9, 18, 6, 0, 0, TAU); ctx.fill(); }
        if (o.k === 'cup') Q22.glass(ctx, x, y, 34, 48, { water: .6 });
        if (o.k === 'vase') { ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.moveTo(x - 8, y - 60); ctx.quadraticCurveTo(x - 26, y - 25, x - 12, y); ctx.lineTo(x + 12, y); ctx.quadraticCurveTo(x + 26, y - 25, x + 8, y - 60); ctx.fill(); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - 58); ctx.lineTo(x - 8, y - 88); ctx.moveTo(x, y - 58); ctx.lineTo(x + 10, y - 84); ctx.stroke(); ctx.fillStyle = '#f43f5e'; [[-8, -90], [10, -86]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(x + dx, y + dy, 7, 0, TAU); ctx.fill(); }); }
      });
    },
    arrows(ctx, S, g, items, hx, hy) {
      const p = S.p;
      if (p.vel !== false && Math.abs(S.kv) > 5) Q22.F(ctx, hx, hy, clamp(S.kv * .06, -110, 110), 0, 'سرعة الورقة', '#16a34a', 4);
      items.forEach(o => {
        if (p.vel !== false && Math.abs(o.v) > 5 && o.st !== 'broken') Q22.F(ctx, o.x, o.y - 40, clamp(o.v * .12, -90, 90), 0, '', '#16a34a', 3.5);
        if (p.fr !== false && o.st === 'on' && o.slip) Q22.F(ctx, o.x, o.y - 6, o.slip * 34, 0, 'الاحتكاك', '#dc2626', 3.5);
        if (p.fr !== false && o.st === 'fall') Q22.F(ctx, o.x + 18, o.y - 10, 0, 40, 'الوزن', '#2563eb', 3.5);
      });
    },
    drawStack(ctx, S, g) {
      const st = S.st, p = S.p; if (!st) return;
      K.raw(ctx, () => { // striker (ruler) lying on the bench
        const tip = g.sx - g.cr - 4 + st.rx; ctx.fillStyle = '#fde047'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1.2; rr(ctx, tip - 190, g.by - g.th * .9, 190, g.th * .8, 3); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#a16207'; for (let k = 0; k < 18; k++) { ctx.beginPath(); ctx.moveTo(tip - 186 + k * 10.5, g.by - g.th * .9); ctx.lineTo(tip - 186 + k * 10.5, g.by - g.th * (k % 5 ? .65 : .45)); ctx.stroke(); }
      });
      const tip = g.sx - g.cr - 4 + st.rx; C2.hand(ctx, tip - 150, g.by - g.th * .5, 1, 1, { sleeve: '#0ea5e9' });
      st.c.slice().sort((a, b) => b.y - a.y).forEach(c => Q22.coin(ctx, c.x, c.y, g.cr, g.th, c.i % 2 ? '#d4d4d8' : '#facc15'));
      if (p.vel !== false && st.rv > 0) Q22.F(ctx, tip - 40, g.by - 40, clamp(st.rv * .06, 10, 110), 0, 'سرعة المسطرة', '#16a34a', 4);
      st.c.forEach(c => { if (p.vel !== false && Math.abs(c.v) > 20) Q22.F(ctx, c.x, c.y - g.th - 20, clamp(c.v * .08, -90, 90), 0, '', '#16a34a', 3); });
      if (S.drag && p.lab !== false) Q22.T(ctx, 'قوة الضربة: ' + (S.pull > 90 ? 'كبيرة وسريعة ⚡' : 'صغيرة وبطيئة 🐢'), tip - 90, g.by - 60, { s: 12.5, w: 900, c: '#fff', bg: S.pull > 90 ? '#16a34a' : '#ea580c' });
      if (p.lab !== false) Q22.T(ctx, 'عدد القطع التي أخرجتها وحدها: ' + S.hits, g.sx, g.by + 30, { s: 12.5, w: 800, c: '#fff', bg: 'rgba(30,41,59,.8)' });
    },
    drags(S) {
      if (!S.W) return []; const g = D.geo(S), p = S.p;
      if (p.sc === 'stack') { const st = S.st; if (!st) return []; const tip = g.sx - g.cr - 4 + st.rx;
        return [{ id: 'striker', x: tip - 120, y: g.by - g.th * .5, w: 200, h: 46, axis: 'x', keep: true, tip: 'اسحب المسطرة إلى الخلف (يساراً) ثم اتركها', idle: 'اسحبها للخلف ثم اتركها ✋',
          down: S => { S.drag = 1; st.hit = 0; st.rv = 0; }, drag: (S, d) => { st.rx = clamp(d.x - d.sx, -170, 0); S.pull = -st.rx; }, up: S => { S.drag = 0; S.sv = S.pull * 15 + 1; S.pull = Math.round(S.pull); } }];
      }
      const L = g.k0 + S.kx;
      const hp = p.sc === 'coin' ? [L + g.KL + 4 + 30, g.ty] : (S._hand || [g.tx1 + 30, g.ty + 60]);
      return [{ id: 'card', x: hp[0], y: hp[1], r: 44, axis: 'x', keep: true, tip: p.sc === 'coin' ? 'اسحب الورقة نحو اليمين (ببطء أو بسرعة)' : 'اسحب طرف المفرش', idle: 'اسحب الورقة ✋',
        down: S => { if (S.done || S.kx > 5) { const k = S.kx; D.reset(S); } S.drag = 1; S.kx0 = S.kx; S.kxp = S.kx; S.au = 0; },
        drag: (S, d) => { S.kx = clamp(S.kx0 + (d.x - d.sx), -10, g.KL * 2); }, up: S => { S.drag = 0; } }];
    },
    readings(S) { const g = S.W ? D.geo(S) : { pxcm: 1 }; const o = S.items && S.items[0];
      return [rd('سرعة السحب الآن', fmt(Math.abs(S.kv) / g.pxcm, 3) + ' cm/s'), rd('أقصى سرعة سحب', fmt((S.vmax || 0) / g.pxcm, 3) + ' cm/s'), rd(S.p.sc === 'coin' ? 'سرعة النقود' : 'سرعة الأجسام', fmt(o ? Math.abs(o.v) / g.pxcm : 0, 3) + ' cm/s'), rd('النتيجة', S.res || '—', 1)]; },
    record(S) { if (!S.done) { Runner.toast('اسحب الورقة أولاً حتى تنتهي المحاولة', 'info'); return null; } return { sc: { coin: 'القدح والنقود', cloth: 'مفرش المائدة', stack: 'عمود النقود' }[S.p.sc], v: +(S.lastSp || 0).toFixed(0), k: (S.lastSp || 0) > 60 ? 'سريع' : 'بطيء', r: S.res }; },
    cols: [['sc', 'المثال'], ['v', 'سرعة السحب (cm/s)'], ['k', 'نوع السحب'], ['r', 'النتيجة']],
    explain(S) {
      if (S.p.sc === 'stack') return Q22.ex('بالضربة السريعة تخرج القطعة السفلى وحدها، وتبقى القطع الأخرى مكانها ثم تنزل.', 'الضربة سريعة جداً فلا يكفي زمنها القصير لتحريك القطع العليا؛ فهي <b>ساكنة وتبقى ساكنة</b> (قصور ذاتي)، ثم تسحبها الجاذبية إلى الأسفل.', 'لعبة «الجنغا»: نسحب القطعة بسرعة فلا يسقط البرج.');
      if (S.drag && Math.abs(S.kv) > 600) return Q22.ex('سحبت الورقة بسرعة كبيرة، والنقود لم تتحرك تقريباً.', 'الاحتكاك قوة صغيرة، وزمن السحب قصير جداً فلا يكفي لتحريك النقود؛ فتبقى <b>ساكنة</b> بسبب قصورها الذاتي.', 'سحب مفرش المائدة بسرعة من تحت الأطباق.');
      if (S.drag && Math.abs(S.kv) > 5) return Q22.ex('سحبت الورقة ببطء، فتحركت النقود معها.', 'الزمن طويل، فيكفي <b>الاحتكاك</b> بين الورقة والنقود ليحرّكها مع الورقة.', 'الكتاب فوق الدفتر يتحرك معه عندما تسحب الدفتر ببطء.');
      return Q22.ex(S.res ? 'النتيجة: ' + S.res + '.' : 'النقود ساكنة فوق الورقة، والقدح تحتها.', 'كل جسم يميل إلى البقاء على حالته: الساكن يبقى ساكناً. هذه الخاصية اسمها <b>القصور الذاتي</b> (الاستمرارية).', 'تشعر باندفاعك إلى الخلف عندما تنطلق الحافلة فجأة.');
    },
    quiz: [
      { q: 'عند سحب الورقة بسرعة من تحت قطعة النقود تقع النقود في القدح بسبب:', o: ['القصور الذاتي', 'قوة رد الفعل', 'التعجيل'], a: 0, why: 'النقود تحاول الاحتفاظ بحالة السكون (القصور الذاتي) ثم تسقط بفعل الجاذبية.' },
      { q: 'القصور الذاتي لجسم ما يعتمد على:', o: ['سرعته', 'كتلته', 'لونه'], a: 1, why: 'الكتلة مقياس للقصور الذاتي (ص 24).' },
      { q: 'من الصعوبة تحريك سيارة واقفة وذلك بسبب:', o: ['التعجيل', 'قوة الفعل', 'القصور الذاتي'], a: 2, why: 'مراجعة الفصل س1: السيارة كتلتها كبيرة فقصورها الذاتي كبير.' }
    ]
  };
  M8.P[D.id] = D;
})();

/* =========================================================================================
   2) القانون الأول لنيوتن (ص 24): حزام الأمان، راكب الدراجة، الكرة المتدحرجة، الكتلة والقصور
   ========================================================================================= */
(() => {
  const MU = { grass: 2.2, wood: .7, ice: .12, none: 0 }, MUN = { grass: 'عشب', wood: 'أرضية خشبية', ice: 'جليد', none: 'بلا احتكاك (مثالي)' };
  const D = { id: 'g8_newton1', ch: 22, sec: 'الدرس 1', page: 24, kind: 'نشاط',
    title: 'القانون الأول لنيوتن: القصور الذاتي (حزام الأمان والدراجة)',
    desc: 'الجسم الساكن يبقى ساكناً، والمتحرك يبقى متحركاً بالسرعة والاتجاه نفسيهما ما لم تؤثر فيه قوة تغيّر حالته الحركية. جرّب الفرملة المفاجئة مع حزام الأمان وبدونه، وتوقف الدراجة المفاجئ، والكرة على سطوح مختلفة.',
    tags: 'نيوتن القانون الأول قصور ذاتي حزام الأمان دراجة فرملة احتكاك كتلة',
    tools: ['سيارة وراكب', 'دراجة هوائية', 'كرة', 'كرسي ومنضدة'],
    steps: ['مشهد «السيارة»: اضغط «🛑 فرملة مفاجئة» والحزام مربوط، ثم انقر الحزام لفكّه وكرّر. ماذا يحدث للراكب؟', 'اضغط «🚀 انطلاق مفاجئ»: لماذا يندفع الراكب إلى الخلف نحو المقعد؟', 'مشهد «الدراجة»: اضغط «🧱 توقف مفاجئ» وراقب اندفاع الراكب إلى الأمام (كما في الشكل 1).', 'مشهد «الكرة»: اسحب الكرة واتركها لتركلها، وغيّر السطح (عشب، خشب، جليد، بلا احتكاك). متى تستمر الكرة بالحركة دون توقف؟', 'مشهد «الكتلة والقصور»: ادفع الكرسي والمنضدة الكبيرة بالقوة نفسها. أيهما أصعب تحريكاً؟ ولماذا؟'],
    concl: ['الجسم الساكن يبقى ساكناً، والمتحرك يبقى متحركاً بالسرعة والاتجاه نفسيهما ما لم تؤثر فيه قوة تغيّر حالته الحركية (القانون الأول لنيوتن).', 'يسمّى هذا القانون أيضاً قانون القصور الذاتي؛ وهو ميل الجسم إلى مقاومة أي تغيير في حالته الحركية.', 'حزام الأمان يمنع اندفاع الراكب إلى الأمام عند التوقف المفاجئ فيقيه من الضرر.', 'الكرة تتوقف بسبب قوة الاحتكاك؛ ولو انعدم الاحتكاك لاستمرت بالحركة بسرعة ثابتة.', 'الكتلة مقياس القصور الذاتي: تحريك المنضدة الكبيرة أصعب من تحريك الكرسي، وإيقاف السيارة أصعب من إيقاف الدراجة.'],
    laws: ['g8_n1'],
    fact: ['نشر نيوتن قوانين الحركة الثلاثة وربط بين القوة والحركة (الكتاب ص 24).', 'مسند الرأس في مقعد السيارة يحمي الرقبة عندما تُصدم السيارة من الخلف فيندفع الجسم إلى الأمام والرأس يبقى في مكانه!', 'المركبات الفضائية تتحرك في الفضاء مسافات هائلة دون محركات تعمل، لأن لا احتكاك هناك يوقفها.'],
    controls: [SEL('sc', 'المثال', [['car', '🚗 السيارة وحزام الأمان'], ['bike', '🚲 راكب الدراجة'], ['ball', '⚽ الكرة المتدحرجة'], ['mass', '🪑 الكتلة والقصور']], 'car', (v, S) => D.reset(S)),
      Q22.V(R('v', 'السرعة', 20, 80, 50, 5, 'km/h', (v, S) => D.reset(S)), s => s.p.sc === 'car' || s.p.sc === 'bike'), Q22.V(TG('belt', 'ربط حزام الأمان', true, (v, S) => { S.hit = 0; }, 'swap'), s => s.p.sc === 'car'),
      Q22.V(SEL('surf', 'سطح حركة الكرة', [['grass', 'عشب'], ['wood', 'خشب'], ['ice', 'جليد'], ['none', 'بلا احتكاك']], 'wood'), s => s.p.sc === 'ball'),
      TG('vel', 'أسهم السرعة', true, null, 'velocity'), TG('frc', 'أسهم القوى', true, null, 'force'), Q22.V(TG('trail', 'آثار الحركة', true, null, 'dot'), s => s.p.sc === 'bike' || s.p.sc === 'ball'), TG('lab', 'البطاقات والشرح', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.cv = S.p.v / 3.6; S.off = 0; S.brk = 0; S.go = 0; S.u = 0; S.uv = 0; S.hit = 0; S.acar = 0; S.bv = S.p.v / 3.6 * .4; S.bx = 0; S.fly = 0; S.rx = 0; S.ry = 0; S.rvx = 0; S.rvy = 0; S.rrot = 0;
      S.kb = 0; S.bvel = 0; S.dist = 0; S.laps = 0; S.drag = 0; S.tr = []; S.hv = []; S.hv2 = []; S.push = 0; S.m1 = 0; S.m2 = 0; S.v1 = 0; S.v2 = 0; S.pushT = 0; },
    update(S, dt) {
      dt = Math.min(dt, .04); const p = S.p;
      if (p.sc === 'car') {
        const vt = p.v / 3.6; let a = 0;
        if (S.brk) { a = S.cv > 0 ? -9 : 0; S.cv = Math.max(0, S.cv + a * dt); }
        else if (S.go) { a = S.cv < vt ? 4.5 : 0; S.cv = Math.min(vt, S.cv + a * dt); if (S.cv >= vt) S.go = 0; }
        S.acar = a; S.off += S.cv * dt * 40;
        const ar = -a; let acc;
        if (p.belt !== false) acc = ar - 260 * S.u - 22 * S.uv;
        else acc = ar - (S.u < 0 ? 600 * S.u : 0) - (a === 0 ? 5 * S.u + 4 * S.uv : 0);
        S.uv += acc * dt; S.u += S.uv * dt;
        const umax = p.belt !== false ? .12 : .5; if (S.u > umax) { if (p.belt === false && S.uv > 1.5 && !S.hit) { S.hit = 1; C2.msg(S, 'اصطدم الراكب بلوحة القيادة!\nاربط حزام الأمان 🔒', 3); } S.u = umax; S.uv = 0; }
        if (S.u < -.08) { S.u = -.08; S.uv = 0; }
        if (p.trail !== false && Math.abs(S.uv) > .2) S.trOn = 1;
      } else if (p.sc === 'bike') {
        if (!S.fly) { S.bx += S.bv * dt; S.off += S.bv * dt * 40; }
        else if (S.fly === 1) { S.rvy += 9.8 * dt; S.rx += S.rvx * dt; S.ry += S.rvy * dt; S.rrot = Math.min(1.4, S.rrot + 1.6 * dt); S.off += 0;
          if (S.ry >= .78) { S.ry = .78; S.rvy = 0; S.fly = 2; } Q22.strobe(S, 'tr', S.rx, S.ry, .05); }
        else { S.rvx = Math.max(0, S.rvx - 7 * dt); S.rx += S.rvx * dt; }
      } else if (p.sc === 'ball') {
        if (!S.drag) { const mu = MU[p.surf] || 0; const dv = mu * dt; S.bvel = Math.sign(S.bvel) * Math.max(0, Math.abs(S.bvel) - dv); S.kb += S.bvel * dt; S.dist += Math.abs(S.bvel) * dt; if (S.kb > 1) { S.kb -= 1; S.laps++; } if (S.kb < 0) { S.kb += 1; } }
      } else if (p.sc === 'mass') {
        if (S.pushT > 0) { S.pushT -= dt; const F = 60; S.v1 += F / 5 * dt; S.v2 += F / 40 * dt; }
        [['m1', 'v1'], ['m2', 'v2']].forEach(([m, v]) => { if (S.pushT <= 0) S[v] = Math.max(0, S[v] - 1.2 * dt); S[m] += S[v] * dt; if (S[m] > 3.2) { S[m] = 3.2; S[v] = 0; } });
      }
      if (S.W && p.sc === 'mass') hist(S, 'hv', S.v1 * 10, 300), hist(S, 'hv2', S.v2 * 10, 300);
      if (p.sc === 'car' || p.sc === 'ball') hist(S, 'hv', p.sc === 'car' ? S.cv * 3.6 : Math.abs(S.bvel) * 30, 300);
    },
    draw(ctx, w, h, S) { const p = S.p; Q22.vis(S); ({ car: D.dCar, bike: D.dBike, ball: D.dBall, mass: D.dMass })[p.sc](ctx, w, h, S); C2.drawMsg(ctx, S, (w + 64) / 2, h * .26); K.party(ctx, S); },
    btns(S) { const w = S.W, h = S.H, p = S.p; const n = { car: 3, bike: 2, ball: 4, mass: 2 }[p.sc]; return Q22.row(w, h - 96, n, Math.min(170, (w - 120) / n - 10)); },
    dCar(ctx, w, h, S) {
      const p = S.p, gy = h * .72; Q22.outdoor(ctx, w, h, gy); Q22.trees(ctx, w, gy, S.off); Q22.road(ctx, w, gy, h * .1, S.off);
      const cw = Math.min(w * .78, 640), s = cw / 560, cx = (w + 64) / 2, cb = gy + h * .06;
      // car body (cut-away): seat + passenger drawn first, then translucent body
      const hipX = cx - 40 * s + (p.belt !== false ? 0 : Math.max(0, S.u) * 100 * s), hipY = cb - 92 * s;
      const lean = p.belt !== false ? clamp(S.u * 4, -.25, .5) : clamp(S.u * 1.5, -.25, .75);
      K.raw(ctx, () => { ctx.fillStyle = '#7c2d12'; rr(ctx, cx - 74 * s, hipY - 6 * s, 50 * s, 18 * s, 6 * s); ctx.fill(); ctx.save(); ctx.translate(cx - 62 * s, hipY); ctx.rotate(-.12); rr(ctx, -10 * s, -80 * s, 18 * s, 84 * s, 7 * s); ctx.fill(); rr(ctx, -12 * s, -100 * s, 22 * s, 18 * s, 6 * s); ctx.fill(); ctx.restore(); });
      const anchor = [cx - 66 * s, hipY - 74 * s];
      const P = Q22.sit(ctx, hipX, hipY, 1.25 * s, lean, { belt: p.belt !== false ? anchor : null, shirt: '#f59e0b', hand: [hipX + 34 * s + Math.sin(lean) * 30 * s, hipY - 14 * s] });
      K.raw(ctx, () => { // translucent body + dashboard
        ctx.save(); ctx.translate(cx, cb);
        ctx.fillStyle = 'rgba(37,99,235,.22)'; ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(-260 * s, -40 * s); ctx.lineTo(-262 * s, -110 * s); ctx.quadraticCurveTo(-250 * s, -122 * s, -200 * s, -128 * s); ctx.lineTo(-150 * s, -132 * s); ctx.lineTo(-90 * s, -205 * s); ctx.lineTo(60 * s, -205 * s); ctx.lineTo(130 * s, -135 * s); ctx.lineTo(230 * s, -122 * s); ctx.quadraticCurveTo(262 * s, -112 * s, 262 * s, -80 * s); ctx.lineTo(262 * s, -40 * s); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(186,230,253,.25)'; ctx.beginPath(); ctx.moveTo(-138 * s, -134 * s); ctx.lineTo(-84 * s, -196 * s); ctx.lineTo(54 * s, -196 * s); ctx.lineTo(118 * s, -134 * s); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#334155'; rr(ctx, 70 * s, -128 * s, 90 * s, 40 * s, 10 * s); ctx.fill(); // dashboard
        ctx.fillStyle = '#1e293b'; ctx.fillRect(-262 * s, -48 * s, 524 * s, 12 * s);
        const rot = S.off / 30; [-170, 175].forEach(wx => C2.wheel(ctx, wx * s, -36 * s, 34 * s, rot)); [-170, 175].forEach(wx => { ctx.strokeStyle = '#111827'; ctx.lineWidth = 9 * s; ctx.beginPath(); ctx.arc(wx * s, -36 * s, 34 * s, 0, TAU); ctx.stroke(); });
        if (S.brk && S.cv > 0) { ctx.fillStyle = 'rgba(239,68,68,.6)'; ctx.beginPath(); ctx.arc(-262 * s, -100 * s, 12 * s, 0, TAU); ctx.fill(); }
        ctx.restore();
      });
      if (S.hit) Q22.star(ctx, cx + 70 * s, hipY - 48 * s, 18);
      // arrows
      if (p.vel !== false && S.cv > .1) Q22.F(ctx, cx - 20, cb - 240 * s, clamp(S.cv * 4, 14, 140), 0, 'سرعة السيارة', '#16a34a', 4);
      if (p.frc !== false && S.acar !== 0) Q22.F(ctx, cx + (S.acar < 0 ? 300 : -300) * s * .9, cb - 60 * s, S.acar < 0 ? -80 : 70, 0, S.acar < 0 ? 'قوة الفرامل' : 'قوة المحرك', '#dc2626', 5);
      if (p.vel !== false && Math.abs(S.acar) > 0 && S.cv > .1) Q22.F(ctx, P.hd[0], P.hd[1] - 30, S.acar < 0 ? 60 : -50, 0, S.acar < 0 ? 'الراكب يستمر بحركته' : 'الراكب يبقى في مكانه', '#7c3aed', 3.5);
      if (p.frc !== false && p.belt !== false && S.u > .02) Q22.F(ctx, P.sh[0] + 10, P.sh[1] + 10, -55, 0, 'قوة الحزام', '#ea580c', 3.5);
      if (p.lab !== false) C2.lines(ctx, [{ t: 'حزام الأمان: ' + (p.belt !== false ? 'مربوط 🔒 (انقر لفكّه)' : 'غير مربوط ⚠️ (انقر لربطه)'), c: p.belt !== false ? '#15803d' : '#dc2626' }, { t: 'السرعة: ' + fmt(S.cv * 3.6, 3) + ' km/h', c: '#0f172a', mono: 1 }], w - 16, 44, Math.min(320, w * .45), { title: 'السيارة', bd: '#2563eb' });
      Q22.banner(ctx, w, 'القانون الأول: الجسم المتحرك يبقى متحركاً ما لم تؤثر فيه قوة', '#1d4ed8', 20);
      S._beltHit = [hipX + 10 * s, hipY - 40 * s];
      D.dBtns(ctx, S, [['🛑 فرملة مفاجئة', '#dc2626', S.brk], ['🚀 انطلاق مفاجئ', '#16a34a', S.go], ['↺ من جديد', '#64748b', 0]]);
    },
    dBtns(ctx, S, L) { D.btns(S).forEach((b, i) => L[i] && C2.btn(ctx, b.x, b.y, b.w, b.h, L[i][0], { col: L[i][1], on: !!L[i][2], s: 13 })); },
    dBike(ctx, w, h, S) {
      const p = S.p, gy = h * .7; Q22.outdoor(ctx, w, h, gy); Q22.trees(ctx, w, gy, S.off); Q22.road(ctx, w, gy, h * .08, S.off);
      const r = clamp(w * .045, 26, 36), M = r * 2.4; // px per metre
      const bx = (w + 64) / 2 - 120 + (S.fly ? 0 : 0), by = gy + h * .05;
      if (S.fly) K.raw(ctx, () => { ctx.fillStyle = '#78716c'; rr(ctx, bx + r * 2.2, by - r * .9, r * .9, r * .9, 4); ctx.fill(); ctx.fillStyle = '#a8a29e'; ctx.fillRect(bx + r * 2.2, by - r * .9, r * .9, 5); });
      const B = Q22.bike(ctx, bx, by, r, S.off / r, '#dc2626');
      const s = r / 44, ca = S.off / r * .8, cr = r * .36, pc = B.pedal;
      K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(pc[0] - Math.cos(ca) * cr, pc[1] - Math.sin(ca) * cr); ctx.lineTo(pc[0], pc[1]); ctx.stroke(); ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(pc[0], pc[1], 6, 0, TAU); ctx.fill(); ctx.lineCap = 'butt'; });
      if (!S.fly) { // rider seated: hands on the handlebar, feet on the pedals
        Q22.man(ctx, { hip: [B.seat[0] + 2 * s, B.seat[1] - 7 * s], dir: 1, s, lean: .62, feet: [[pc[0] + Math.cos(ca) * cr, pc[1] + Math.sin(ca) * cr + 5 * s], [pc[0] - Math.cos(ca) * cr, pc[1] - Math.sin(ca) * cr + 5 * s]],
          hands: [[B.bar[0] + 2, B.bar[1] + 2], [B.bar[0] - 2, B.bar[1] + 3]], elb: [0, 1], shirt: '#2563eb', pants: '#1f2937', cap: '#facc15' });
        K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(pc[0], pc[1]); ctx.lineTo(pc[0] + Math.cos(ca) * cr, pc[1] + Math.sin(ca) * cr); ctx.stroke(); ctx.lineCap = 'butt'; });
      } else { // rider thrown forward over the handlebar (book fig. 1)
        const fx = B.seat[0] + S.rx * M, fy = B.seat[1] + S.ry * M;
        K.raw(ctx, () => { ctx.save(); ctx.translate(fx, fy); ctx.rotate(S.rrot); Q22.man(ctx, { hip: [0, 0], dir: 1, s, lean: .2, feet: [[-60 * s, 70 * s], [-74 * s, 58 * s]], hands: [[62 * s, -40 * s], [56 * s, -30 * s]], elb: [0, -1], shirt: '#2563eb', pants: '#1f2937', cap: '#facc15', strain: 1 }); ctx.restore(); });
      }
      if (p.trail !== false && S.tr) { const x0 = B.seat[0], y0 = B.seat[1]; Q22.drawStrobe(ctx, S.tr.map(q => [x0 + q[0] * M, y0 + q[1] * M]), '#a855f7', 3.5); }
      if (p.vel !== false && !S.fly) Q22.F(ctx, bx, by - r * 3.6, clamp(S.bv * 10, 20, 120), 0, 'السرعة', '#16a34a', 4);
      if (p.vel !== false && S.fly === 1) Q22.F(ctx, B.seat[0] + S.rx * M + 30, B.seat[1] + S.ry * M - 60, 70, 0, 'الراكب يستمر بالحركة إلى الأمام', '#7c3aed', 4);
      if (p.frc !== false && S.fly) Q22.F(ctx, bx + r * 2.1, by - r * .5, -60, 0, 'قوة توقف الدراجة', '#dc2626', 5);
      if (p.lab !== false) C2.lines(ctx, [{ t: S.fly ? 'توقفت الدراجة فجأة، لكن الراكب لم تؤثر فيه تلك القوة' : 'الدراجة والراكب يتحركان معاً بسرعة ' + fmt(S.bv * 3.6, 3) + ' km/h', c: '#0f172a' }, { t: S.fly ? '← فاندفع إلى الأمام بسبب قصوره الذاتي' : 'اضغط «توقف مفاجئ» لتصطدم الدراجة بحاجز', c: '#7c3aed' }], w - 16, 44, Math.min(380, w * .55), { title: 'راكب الدراجة', bd: '#dc2626' });
      Q22.banner(ctx, w, 'يندفع راكب الدراجة إلى الأمام عند توقفها بشكل مفاجئ', '#b91c1c', 20);
      D.dBtns(ctx, S, [['🧱 توقف مفاجئ', '#dc2626', S.fly], ['↺ من جديد', '#64748b', 0]]);
    },
    dBall(ctx, w, h, S) {
      const p = S.p, gy = h * .62, col = { grass: ['#86efac', '#15803d'], wood: ['#e8b77a', '#92400e'], ice: ['#e0f2fe', '#7dd3fc'], none: ['#e9d5ff', '#a78bfa'] }[p.surf];
      Q22.outdoor(ctx, w, h, gy, { g1: col[0], g2: col[1] });
      K.raw(ctx, () => { if (p.surf === 'wood') { ctx.strokeStyle = 'rgba(90,50,20,.35)'; for (let x = 0; x < w; x += 70) { ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x - 40, h); ctx.stroke(); } } if (p.surf === 'ice') { ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.moveTo(80 + k * 97 % w, gy + 20 + k * 13 % 60); ctx.lineTo(120 + k * 97 % w, gy + 26 + k * 13 % 60); ctx.stroke(); } } if (p.surf === 'grass') { ctx.strokeStyle = '#166534'; ctx.lineWidth = 1.5; for (let x = 0; x < w; x += 9) { ctx.beginPath(); ctx.moveTo(x, gy + 4); ctx.lineTo(x + 3, gy - 6); ctx.stroke(); } } });
      const x0 = 115, x1 = w - 30, R = 22, bx = x0 + (x1 - x0) * S.kb, by = gy - R;
      if (p.trail !== false && Math.abs(S.bvel) > .02) Q22.strobe(S, 'tr', bx, by, .08); if (S.tr && S.tr.length && Math.abs(S.tr[S.tr.length - 1][0] - bx) > 200) S.tr = [];
      if (p.trail !== false) Q22.drawStrobe(ctx, S.tr, '#7c3aed', 4);
      K.raw(ctx, () => { ctx.save(); ctx.translate(bx, by); ctx.rotate(S.dist * 8); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.fill(); ctx.strokeStyle = '#111'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#111'; for (let k = 0; k < 5; k++) { const a = k * TAU / 5; ctx.beginPath(); ctx.arc(Math.cos(a) * 12, Math.sin(a) * 12, 4.5, 0, TAU); ctx.fill(); } ctx.restore(); });
      const v = Math.abs(S.bvel) * 30;
      if (p.vel !== false && v > .05) Q22.F(ctx, bx, by - R - 26, clamp(S.bvel * 160, -130, 130), 0, 'السرعة ' + fmt(v, 2) + ' m/s', '#16a34a', 4);
      if (p.frc !== false && v > .05 && MU[p.surf] > 0) Q22.F(ctx, bx, gy + 14, -Math.sign(S.bvel) * clamp(MU[p.surf] * 26, 14, 70), 0, 'الاحتكاك', '#dc2626', 4);
      if (p.lab !== false) C2.lines(ctx, [{ t: 'السطح: ' + MUN[p.surf], c: '#0f172a' }, { t: 'المسافة المقطوعة: ' + fmt(S.dist * 30, 3) + ' m', c: '#0f766e', mono: 1 }, { t: MU[p.surf] ? 'الاحتكاك قوة تعاكس الحركة فتتوقف الكرة' : 'لا قوة تؤثر ← تستمر بسرعة ثابتة إلى الأبد!', c: MU[p.surf] ? '#dc2626' : '#7c3aed' }], w - 16, 44, Math.min(340, w * .5), { title: 'الكرة المتدحرجة', bd: '#16a34a' });
      Q22.banner(ctx, w, 'اسحب الكرة واتركها لتركلها — ثم غيّر السطح', '#15803d', 20);
      D.dBtns(ctx, S, [['عشب', '#15803d', p.surf === 'grass'], ['خشب', '#92400e', p.surf === 'wood'], ['جليد', '#0284c7', p.surf === 'ice'], ['بلا احتكاك', '#7c3aed', p.surf === 'none']]);
      S._ball = [bx, by, x0, x1];
    },
    dMass(ctx, w, h, S) {
      const p = S.p; K.bg(ctx, w, h, { benchY: h * .8, bench: false });
      K.raw(ctx, () => { ctx.fillStyle = '#e7d3b0'; ctx.fillRect(0, h * .42, w, h * .58); ctx.strokeStyle = 'rgba(120,80,40,.25)'; for (let y = h * .42; y < h; y += 26) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); } });
      const x0 = 120, M = (w - x0 - 200) / 3.2;
      [[S.m1, S.v1, 'كرسي 5 kg', h * .58, 0], [S.m2, S.v2, 'منضدة كبيرة 40 kg', h * .82, 1]].forEach(([m, v, n, y, k]) => {
        const ox = x0 + 60 + m * M;
        K.raw(ctx, () => { if (!k) { const cg = ctx.createLinearGradient(ox, 0, ox + 44, 0); cg.addColorStop(0, '#92400e'); cg.addColorStop(1, '#d97706'); ctx.fillStyle = cg; rr(ctx, ox, y - 52, 44, 9, 2); ctx.fill(); ctx.fillStyle = '#92400e'; rr(ctx, ox, y - 104, 7, 60, 2); ctx.fill(); rr(ctx, ox - 1, y - 106, 9, 22, 3); ctx.fill(); ctx.fillStyle = '#78350f'; ctx.fillRect(ox + 1, y - 44, 5, 44); ctx.fillRect(ox + 37, y - 44, 5, 44); }
          else { ctx.fillStyle = '#7c2d12'; rr(ctx, ox, y - 70, 170, 16, 4); ctx.fill(); ctx.fillRect(ox + 8, y - 56, 12, 56); ctx.fillRect(ox + 150, y - 56, 12, 56); } });
        const pushing = S.pushT > 0; const kx = ox - 8 - (pushing ? 0 : Math.min(30, S.m1 > 0 ? 30 : 0));
        Q22.kidR(ctx, ox - 34 - (pushing ? 0 : 24), y, 1.55, k ? '#16a34a' : '#ef4444', 1, pushing ? ox + (k ? 1 : 2) : ox - 30, y - (k ? 66 : 92), pushing ? .5 : .1);
        if (p.frc !== false && pushing) Q22.F(ctx, ox + 4, y - (k ? 92 : 78), 70, 0, 'F = 60 N', '#dc2626', 4);
        if (p.vel !== false && v > .02) Q22.F(ctx, ox + (k ? 85 : 20), y - (k ? 112 : 126), clamp(v * 30, 12, 140), 0, fmt(v, 2) + ' m/s', '#16a34a', 4);
        if (p.lab !== false) Q22.T(ctx, n, ox + (k ? 85 : 20), y + 16, { s: 12.5, w: 900, c: '#fff', bg: k ? '#7c2d12' : '#b45309' });
      });
      if (p.lab !== false) C2.lines(ctx, [{ t: 'نفس القوة (60 N) لنفس الزمن', c: '#dc2626' }, { t: 'الكرسي: ' + fmt(S.v1, 2) + ' m/s  |  المنضدة: ' + fmt(S.v2, 2) + ' m/s', c: '#0f172a' }, { t: 'الكتلة الأكبر ← قصور ذاتي أكبر ← أصعب تحريكاً', c: '#7c3aed' }], w - 16, 44, Math.min(370, w * .55), { title: 'الكتلة مقياس القصور الذاتي', bd: '#7c3aed' });
      Q22.banner(ctx, w, 'ادفع الكرسي والمنضدة بالقوة نفسها', '#6d28d9', 20);
      D.dBtns(ctx, S, [['👐 ادفع الاثنين', '#dc2626', S.pushT > 0], ['↺ من جديد', '#64748b', 0]]);
    },
    drags(S) {
      if (!S.W) return []; const p = S.p, B = D.btns(S), L = [];
      const act = {
        car: [S => { S.brk = 1; S.go = 0; S.hit = 0; }, S => { if (S.cv > p.v / 3.6 * .6) { S.cv = 0; } S.brk = 0; S.go = 1; S.hit = 0; }, S => D.reset(S)],
        bike: [S => { if (S.fly) return; S.fly = 1; S.rvx = S.bv; S.rvy = -1.2; S.rx = 0; S.ry = 0; S.tr = []; }, S => D.reset(S)],
        ball: ['grass', 'wood', 'ice', 'none'].map(k => S => setParam(S, 'surf', k)),
        mass: [S => { S.m1 = 0; S.m2 = 0; S.v1 = 0; S.v2 = 0; S.pushT = .5; }, S => D.reset(S)]
      }[p.sc];
      B.forEach((b, i) => act[i] && L.push(Q22.btnObj('b' + i, b, act[i], { hint: i === 0 && p.sc !== 'ball', idle: i === 0 ? 'اضغط ✋' : null })));
      if (p.sc === 'car' && S._beltHit) L.push({ id: 'belt', x: S._beltHit[0], y: S._beltHit[1], r: 34, tip: 'انقر لربط/فكّ حزام الأمان', hint: false, click: S => { setParam(S, 'belt', S.p.belt === false); S.hit = 0; } });
      if (p.sc === 'ball' && S._ball) { const [bx, by, x0, x1] = S._ball; L.push({ id: 'ball', x: bx, y: by, r: 34, axis: 'x', keep: true, tip: 'اسحب الكرة بسرعة ثم اتركها (ركلة)', idle: 'اسحب الكرة ثم اتركها ✋',
        down: S => { S.drag = 1; S.bvel = 0; S._k0 = S.kb; S._lt = Q22.now(); S._lx = S.kb; S.tr = []; },
        drag: (S, d) => { const nt = Q22.now(), ddt = Math.max(1 / 120, nt - S._lt); S.kb = clamp(S._k0 + (d.x - d.sx) / (x1 - x0), 0, .999); const v = (S.kb - S._lx) / ddt; S._vk = (S._vk || 0) * .5 + v * .5; S._lt = nt; S._lx = S.kb; },
        up: S => { S.drag = 0; S.bvel = clamp(S._vk || 0, -1.2, 1.2); S._vk = 0; } }); }
      return L;
    },
    readings(S) { const p = S.p;
      if (p.sc === 'car') return [rd('سرعة السيارة', fmt(S.cv * 3.6, 3) + ' km/h'), rd('حزام الأمان', p.belt !== false ? 'مربوط' : 'غير مربوط'), rd('اندفاع الراكب', fmt(Math.max(0, S.u) * 100, 2) + ' cm'), rd('الحالة', S.hit ? 'اصطدام!' : S.brk ? (S.cv > 0 ? 'فرملة' : 'متوقفة') : S.go ? 'انطلاق' : 'تسير', 1)];
      if (p.sc === 'bike') return [rd('سرعة الدراجة', fmt(S.fly ? 0 : S.bv * 3.6, 3) + ' km/h'), rd('سرعة الراكب', fmt((S.fly ? Math.hypot(S.rvx, S.rvy) : S.bv) * 3.6, 3) + ' km/h'), rd('مسافة اندفاع الراكب', fmt(S.rx, 2) + ' m')];
      if (p.sc === 'ball') return [rd('السطح', MUN[p.surf]), rd('سرعة الكرة', fmt(Math.abs(S.bvel) * 30, 3) + ' m/s'), rd('المسافة', fmt(S.dist * 30, 3) + ' m')];
      return [rd('سرعة الكرسي', fmt(S.v1, 2) + ' m/s'), rd('سرعة المنضدة', fmt(S.v2, 2) + ' m/s'), rd('القوة', '60 N لمدة 0.5 s')];
    },
    live: { title: 'السرعة مع الزمن', data: S => ({ series: S.p.sc === 'mass' ? [{ pts: S.hv || [], color: '#ef4444', name: 'الكرسي ×10' }, { pts: S.hv2 || [], color: '#16a34a', name: 'المنضدة ×10' }] : [{ pts: S.hv || [], color: '#16a34a', name: S.p.sc === 'car' ? 'v (km/h)' : 'v (m/s)' }], opts: { xl: 't (s)', ymin: 0 } }) },
    explain(S) { const p = S.p;
      if (p.sc === 'car') return p.belt !== false ? Q22.ex(S.brk ? 'توقفت السيارة فجأة، فمال الراكب قليلاً إلى الأمام ثم أمسكه الحزام.' : S.go ? 'انطلقت السيارة فجأة، فرجع الراكب إلى الخلف نحو المقعد.' : 'السيارة تسير والراكب يتحرك معها بالسرعة نفسها.', 'جسم الراكب يريد أن يبقى على حالته (<b>قصور ذاتي</b>): عند الفرملة يستمر بالحركة إلى الأمام، و<b>حزام الأمان</b> يؤثر فيه بقوة تمنعه من الاندفاع.', 'لهذا يجب ربط حزام الأمان دائماً، ولهذا يوجد مسند للرأس في المقعد.')
        : Q22.ex(S.hit ? 'اصطدم الراكب بلوحة القيادة!' : 'الحزام غير مربوط. اضغط «فرملة مفاجئة».', 'الفرامل توقف <b>السيارة</b> فقط؛ أما الراكب فلا توجد قوة توقفه، فيستمر بحركته إلى الأمام (القانون الأول) حتى يصطدم.', 'هذا سبب كثير من إصابات الحوادث — اربط الحزام!');
      if (p.sc === 'bike') return Q22.ex(S.fly ? 'توقفت الدراجة عند الحاجز، لكن الراكب طار إلى الأمام (كما في الشكل 1).' : 'الدراجة والراكب يتحركان معاً بالسرعة نفسها.', 'قوة الحاجز أثّرت في <b>الدراجة</b> فقط؛ والراكب لم تؤثر فيه قوة توقفه، فاستمر بحركته إلى الأمام بسبب <b>قصوره الذاتي</b>.', 'لهذا يجب لبس الخوذة والانتباه للحفر والحواجز.');
      if (p.sc === 'ball') return MU[p.surf] ? Q22.ex('الكرة تتباطأ ثم تتوقف. على الجليد تقطع مسافة أطول من العشب.', '<b>قوة الاحتكاك</b> تؤثر في الكرة بعكس حركتها فتوقفها. كلما قلّ الاحتكاك قطعت مسافة أطول.', 'الكرة على الجليد أو البلاط تتدحرج أبعد منها على العشب.')
        : Q22.ex('الكرة تستمر بالحركة بسرعة ثابتة ولا تتوقف أبداً!', 'لا توجد قوة تؤثر فيها، فتبقى متحركة <b>بسرعة ثابتة وباتجاه ثابت</b> — هذا هو القانون الأول لنيوتن.', 'المركبات الفضائية تتحرك في الفضاء مسافات هائلة دون محركات.');
      return Q22.ex('بالقوة نفسها تحرك الكرسي بسرعة، وتحركت المنضدة الكبيرة ببطء شديد.', 'المنضدة <b>كتلتها أكبر</b>، والكتلة مقياس <b>القصور الذاتي</b>؛ فهي تقاوم تغيير حالتها أكثر.', 'إيقاف سيارة مسرعة أصعب بكثير من إيقاف دراجة بالسرعة نفسها.'); },
    quiz: [
      { q: 'ما الفائدة العملية من استعمال السائق لحزام الأمان؟', o: ['يزيد سرعة السيارة', 'يمنع اندفاع السائق إلى الأمام عند التوقف المفاجئ', 'يقلل وزن السائق'], a: 1, why: 'مراجعة الدرس: الحزام يقي الراكب من الضرر بسبب قصوره الذاتي.' },
      { q: 'عندما تتغلب قوة على استمرارية جسم متحرك فإنها تعمل على:', o: ['تغيير كتلته', 'جعله ساكناً', 'جعله متحركاً بسرعة ثابتة'], a: 1, why: 'مراجعة الفصل س2: القوة تغيّر الحالة الحركية فتوقفه.' },
      { q: 'لو رمى رائد فضاء جسماً في الفضاء بعيداً عن تأثير الأجسام القريبة فإن الجسم:', o: ['يتوقف فوراً', 'يستمر بالحركة بسرعة ثابتة وباتجاه ثابت', 'يعود إلى الرائد'], a: 1, why: 'التفكير الناقد: لا قوة تؤثر فيه فيبقى متحركاً (القانون الأول).' }
    ]
  };
  M8.P[D.id] = D;
})();

/* =========================================================================================
   3) نشاط (ص 25): القانون الثاني لنيوتن — العربة والميزان النابضي
   ========================================================================================= */
(() => {
  const L = 1.2; // table length (m)
  const D = { id: 'g8_newton2_lab', ch: 22, sec: 'الدرس 1', page: 25, kind: 'نشاط',
    title: 'نشاط: القانون الثاني لنيوتن (العربة والميزان النابضي)',
    desc: 'نسحب عربة صغيرة على سطح أملس بميزان نابضي بقوة 2N ثم نزيد القوة، ونلاحظ تغيّر سرعتها عند نهاية السطح. ما الذي يزداد بزيادة القوة بثبوت الكتلة؟',
    tags: 'نيوتن القانون الثاني تعجيل قوة كتلة عربة ميزان نابضي شريط مؤقت',
    tools: ['عربة صغيرة', 'ميزان نابضي', 'سطح أملس', 'أثقال (كتل)'],
    steps: ['العربة مربوطة بخطاف الميزان النابضي عند بداية السطح.', 'اضبط القوة على 2 N (بالمنزلق أو بعجلة الفأرة فوق الميزان)، ثم اسحب يدك نحو اليمين لتبدأ السحب (أو اضغط «▶ اسحب العربة»).', 'شاهد تغيّر سرعة العربة حتى تبلغ نهاية السطح، وسجّل الزمن والتعجيل في الجدول.', 'كرّر بزيادة القوة (4 N ثم 6 N ثم 8 N) وسجّل كل مرة. ارسم التعجيل مع القوة.', 'ثبّت القوة وزِد الكتلة بالنقر على صندوق الأثقال. ماذا يحدث للتعجيل؟'],
    concl: ['بثبوت الكتلة يزداد تعجيل العربة بزيادة القوة المؤثرة فيها (تناسب طردي).', 'بثبوت القوة يقل التعجيل بزيادة كتلة العربة (تناسب عكسي).', 'القانون الثاني لنيوتن: إذا أثّرت قوة محصلة في جسم أكسبته تعجيلاً يتناسب طردياً معها وباتجاهها وعكسياً مع كتلة الجسم: F = m a.'],
    laws: ['g8_n2', 'g8_n2a'],
    fact: ['النقاط على الشريط تُطبع كل 0.1 s: تباعدها المتزايد يعني أن السرعة تزداد (حركة بتعجيل).', 'تُزوَّد سيارات السباق بمحركات ذات قدرة عالية لتؤثر بقوة كبيرة فتكتسب تعجيلاً كبيراً.'],
    controls: [R('F', 'القوة (قراءة الميزان النابضي)', 1, 8, 2, 1, 'N', (v, S) => D.reset(S)), R('m', 'كتلة العربة مع الأثقال', .5, 3, 1, .5, 'kg', (v, S) => D.reset(S)),
      BT('', [{ t: '▶ اسحب العربة', on: S => D.go(S) }, { t: '↺ إلى البداية', on: S => D.reset(S) }]),
      TG('frc', 'سهم القوة', true, null, 'force'), TG('vel', 'سهم السرعة', true, null, 'velocity'), TG('tape', 'الشريط المؤقت (نقاط كل 0.1 s)', true, null, 'dot'), TG('lab', 'البطاقات والمعادلة', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.x = 0; S.v = 0; S.mv = 0; S.tt = 0; S.fin = 0; S.dots = []; S.hx = 0; S.hv = []; },
    go(S) { if (S.fin || S.x > 0) D.reset(S); S.mv = 1; },
    update(S, dt) { dt = Math.min(dt, .04); if (!S.mv) return; const a = S.p.F / S.p.m; const t0 = S.tt; S.tt += dt; S.v += a * dt; S.x += S.v * dt;
      for (let k = Math.floor(t0 / .1) + 1; k * .1 <= S.tt; k++) S.dots.push(.5 * a * (k * .1) ** 2);
      hist(S, 'hv', S.v, 200);
      if (S.x >= L) { const tf = Math.sqrt(2 * L / a); S.x = L; S.v = a * tf; S.tt = tf; S.mv = 0; S.fin = 1; S.dots = S.dots.filter(d => d <= L); C2.msg(S, 'وصلت العربة إلى نهاية السطح\nالزمن = ' + fmt(tf, 3) + ' s', 3); } },
    geo(S) { const w = S.W, h = S.H, ty = h * .56, x0 = Math.max(90, w * .1), x1 = w - 40, cw = clamp(w * .14, 80, 120), M = (x1 - x0 - cw - 150) / L; return { w, h, ty, x0, x1, cw, M, cx: x0 + 10 + S.x * M }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: h * .86 });
      K.raw(ctx, () => { // table (green top like the book)
        ctx.fillStyle = '#6b7280'; ctx.fillRect(g.x0 + 10, g.ty + 18, 14, h * .86 - g.ty - 18); ctx.fillRect(g.x1 - 30, g.ty + 18, 14, h * .86 - g.ty - 18);
        const tg = ctx.createLinearGradient(0, g.ty, 0, g.ty + 18); tg.addColorStop(0, '#86efac'); tg.addColorStop(1, '#16a34a'); ctx.fillStyle = tg; rr(ctx, g.x0, g.ty, g.x1 - g.x0, 18, 4); ctx.fill();
        // start / finish gates
        [[g.x0 + 10 + g.cw, 'البداية'], [g.x0 + 10 + g.cw + L * g.M, 'النهاية']].forEach(([x]) => { ctx.strokeStyle = '#0f172a'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, g.ty - 90); ctx.lineTo(x, g.ty); ctx.stroke(); ctx.setLineDash([]); });
      });
      [[g.x0 + 10 + g.cw, 'البداية'], [g.x0 + 10 + g.cw + L * g.M, 'النهاية (1.2 m)']].forEach(([x, t]) => Q22.T(ctx, t, x, g.ty - 100, { s: 11.5, w: 800, c: '#0f172a' }));
      // ticker tape dots
      if (p.tape !== false) { K.raw(ctx, () => { ctx.fillStyle = '#fef9c3'; ctx.fillRect(g.x0 + 4, g.ty - 6, g.cw + 6 + S.x * g.M, 6); ctx.fillStyle = '#0f172a'; S.dots.forEach(d => { ctx.beginPath(); ctx.arc(g.x0 + 10 + g.cw - 2 + d * g.M - S.x * g.M + S.x * g.M, g.ty - 3, 2.4, 0, TAU); ctx.fill(); }); }); }
      // cart
      const cx = g.cx, cw = g.cw, nb = Math.round((p.m - .5) / .5);
      K.raw(ctx, () => { // laboratory dynamics cart (book fig.): shaded body, hook, slotted masses, spoked wheels
        const bg = ctx.createLinearGradient(0, g.ty - 46, 0, g.ty - 16); bg.addColorStop(0, '#fde047'); bg.addColorStop(.5, '#facc15'); bg.addColorStop(1, '#ca8a04'); ctx.fillStyle = bg; ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 1.5;
        rr(ctx, cx, g.ty - 44, cw, 26, 5); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.45)'; rr(ctx, cx + 5, g.ty - 41, cw - 10, 5, 2); ctx.fill();
        ctx.fillStyle = '#334155'; ctx.fillRect(cx + 6, g.ty - 22, cw - 12, 5); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx + cw + 3, g.ty - 30, 4, -Math.PI / 2, Math.PI / 2); ctx.stroke();
        for (let k = 0; k < nb; k++) { const bx = cx + 6 + (k % 3) * (cw - 12) / 3, by = g.ty - 44 - 14 * (1 + Math.floor(k / 3)), mg = ctx.createLinearGradient(bx, 0, bx + (cw - 12) / 3, 0); mg.addColorStop(0, '#64748b'); mg.addColorStop(.5, '#e2e8f0'); mg.addColorStop(1, '#475569'); ctx.fillStyle = mg; rr(ctx, bx, by, (cw - 12) / 3 - 3, 13, 3); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke(); }
        const rot = S.x / .03; [cx + cw * .2, cx + cw * .8].forEach(x => { ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(x, g.ty - 10, 10, 0, TAU); ctx.fill(); ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.arc(x, g.ty - 10, 6, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.2; for (let k = 0; k < 3; k++) { const a = rot + k * Math.PI / 3; ctx.beginPath(); ctx.moveTo(x - Math.cos(a) * 6, g.ty - 10 - Math.sin(a) * 6); ctx.lineTo(x + Math.cos(a) * 6, g.ty - 10 + Math.sin(a) * 6); ctx.stroke(); } }); });
      // horizontal spring balance + hand
      const sx = cx + cw + 8, sy = g.ty - 30, SL = 120;
      K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + cw, sy); ctx.lineTo(sx, sy); ctx.stroke();
        ctx.fillStyle = '#f59e0b'; rr(ctx, sx, sy - 13, SL, 26, 7); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.stroke(); ctx.fillStyle = '#fff'; rr(ctx, sx + 8, sy - 8, SL - 16, 16, 3); ctx.fill();
        ctx.fillStyle = '#1e293b'; ctx.font = '700 8px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; for (let k = 0; k <= 8; k += 2) { const xx = sx + 12 + (SL - 24) * k / 8; ctx.fillRect(xx, sy - 8, 1, 5); ctx.fillText(k, xx, sy + 6); }
        const xr = sx + 12 + (SL - 24) * p.F / 8; ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(xr, sy - 2); ctx.lineTo(xr - 5, sy - 10); ctx.lineTo(xr + 5, sy - 10); ctx.fill(); });
      C2.hand(ctx, sx + SL + 4, sy, -1, 1.05, { sleeve: '#0ea5e9' });
      Q22.T(ctx, p.F + ' N', sx + SL / 2, sy - 26, { s: 13, w: 900, c: '#fff', bg: '#dc2626' });
      if (p.frc !== false && (S.mv || !S.fin)) Q22.F(ctx, cx + cw / 2, g.ty - 80 - nb * 4, 20 + p.F * 14, 0, 'F = ' + p.F + ' N', '#dc2626', 5);
      if (p.vel !== false && S.v > .02) Q22.F(ctx, cx + cw / 2, g.ty - 130, clamp(S.v * 50, 10, 160), 0, 'v = ' + fmt(S.v, 2) + ' m/s', '#16a34a', 4);
      // equation card
      const a = p.F / p.m;
      if (p.lab !== false) C2.lines(ctx, [{ t: 'F = m a  ⟸  a = F ÷ m', c: '#dc2626', mono: 1 }, { t: 'a = ' + p.F + ' ÷ ' + p.m + ' = ' + fmt(a, 3) + ' m/s²', c: '#0f172a', mono: 1 },
        { t: S.fin ? 'الزمن t = ' + fmt(S.tt, 3) + ' s  ،  السرعة النهائية v = ' + fmt(S.v, 3) + ' m/s' : 'الزمن: ' + fmt(S.tt, 3) + ' s', c: '#0f766e' }], w - 16, 44, Math.min(380, w * .55), { title: 'القانون الثاني لنيوتن', bd: '#dc2626' });
      // weights box (click to add mass)
      const wb = D.wbox(S); K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; rr(ctx, wb.x - wb.w / 2, wb.y - wb.h / 2, wb.w, wb.h, 8); ctx.fill(); ctx.stroke(); for (let k = 0; k < 4; k++) { ctx.fillStyle = '#facc15'; rr(ctx, wb.x - 40 + k * 21, wb.y - 6, 18, 12, 3); ctx.fill(); } });
      Q22.T(ctx, 'أثقال 0.5 kg (انقر لإضافة)', wb.x, wb.y + 30, { s: 11.5, w: 800, c: '#fff', bg: 'rgba(30,41,59,.82)' });
      Q22.banner(ctx, w, 'اسحب يدك (الميزان النابضي) نحو اليمين لتسحب العربة بقوة ثابتة', '#b91c1c', 20);
      C2.drawMsg(ctx, S, w * .55, g.ty - 150); K.party(ctx, S);
    },
    wbox(S) { return { x: Math.max(150, S.W * .22), y: S.H * .93 - 30, w: 110, h: 34 }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), sx = g.cx + g.cw + 8; const wb = D.wbox(S);
      return [{ id: 'hand', x: sx + 120 + 34, y: g.ty - 30, r: 36, axis: 'x', keep: true, tip: 'اسحب نحو اليمين لتبدأ السحب — عجلة الفأرة تغيّر القوة', idle: 'اسحب لتبدأ ✋',
          drag: (S, d) => { if (d.x - d.sx > 12 && !S.mv) D.go(S); }, wheel: (S, k) => setParam(S, 'F', S.p.F + k) },
        { id: 'weights', x: wb.x, y: wb.y, w: wb.w, h: wb.h, hint: false, tip: 'انقر لإضافة ثقل 0.5 kg إلى العربة', click: S => setParam(S, 'm', S.p.m >= 3 ? .5 : S.p.m + .5) }]; },
    readings(S) { const a = S.p.F / S.p.m; return [rd('القوة F', S.p.F + ' N'), rd('الكتلة m', S.p.m + ' kg'), rd('التعجيل a = F/m', fmt(a, 3) + ' m/s²'), rd('الزمن', fmt(S.tt, 3) + ' s'), rd('السرعة', fmt(S.v, 3) + ' m/s')]; },
    record(S) { if (!S.fin) { Runner.toast('اسحب العربة حتى تصل إلى نهاية السطح أولاً', 'info'); return null; } const am = 2 * L / S.tt ** 2; if (S.rows.length >= 3) K.cheer(S, S.W / 2, S.H * .3); return { F: S.p.F, m: S.p.m, t: +S.tt.toFixed(3), v: +S.v.toFixed(2), a: +am.toFixed(2) }; },
    cols: [['F', 'F (N)'], ['m', 'm (kg)'], ['t', 't (s)'], ['v', 'v النهائية (m/s)'], ['a', 'a = 2L/t² (m/s²)']],
    graph: { x: 'F', y: 'a', xl: 'القوة F (N)', yl: 'التعجيل a (m/s²)', theory: (x, S) => x / S.p.m, xmin: 0, xmax: 8.5 },
    live: { title: 'سرعة العربة مع الزمن', data: S => ({ series: [{ pts: S.hv || [], color: '#16a34a', name: 'v (m/s)' }], opts: { xl: 't (s)', ymin: 0 } }) },
    explain(S) { const a = S.p.F / S.p.m;
      return Q22.ex(S.mv ? 'العربة تتحرك وسرعتها تزداد، والنقاط على الشريط تتباعد أكثر فأكثر.' : S.fin ? 'وصلت العربة إلى نهاية السطح في ' + fmt(S.tt, 3) + ' s بسرعة ' + fmt(S.v, 3) + ' m/s.' : 'العربة عند بداية السطح، مربوطة بخطاف الميزان النابضي.',
        'الميزان يسحب العربة بقوة ثابتة <b>' + S.p.F + ' N</b>، فتكتسب تعجيلاً <b>a = F ÷ m = ' + S.p.F + ' ÷ ' + S.p.m + ' = ' + fmt(a, 3) + ' m/s²</b>. زِد القوة ← يزداد التعجيل. زِد الكتلة ← يقل التعجيل.',
        'العربة الفارغة في السوق تسرع بسهولة، والعربة الممتلئة تحتاج قوة أكبر.'); },
    quiz: [
      { q: 'ما العلاقة بين تعجيل الجسم ومحصلة القوى المؤثرة فيه (بثبوت الكتلة)؟', o: ['تناسب عكسي', 'تناسب طردي', 'لا علاقة بينهما'], a: 1, why: 'مراجعة الدرس: وتسمّى هذه العلاقة القانون الثاني لنيوتن.' },
      { q: 'ما تأثير زيادة الكتلة في الجسم المتحرك بتعجيل (بثبوت القوة)؟', o: ['يزداد التعجيل', 'يقل التعجيل', 'لا يتغير التعجيل'], a: 1, why: 'مراجعة الفصل س3: a = F/m.' },
      { q: 'لماذا تزوّد سيارات السباق بمحركات ذات قدرة عالية؟', o: ['لتقليل كتلتها', 'لتؤثر بقوة كبيرة فتكتسب تعجيلاً كبيراً', 'لزيادة قصورها الذاتي'], a: 1, why: 'التفكير الناقد: كلما زادت القوة زاد التعجيل.' }
    ]
  };
  M8.P[D.id] = D;
})();

/* =========================================================================================
   4) مثال (ص 25): حساب القوة والتعجيل F = m a — صندوق، سيارة، عربة تسوق، جزازة عشب
   ========================================================================================= */
(() => {
  const EX = { box: { m: 50, a: 2, F: 100, n: 'صندوق' }, car: { m: 1000, a: .5, F: 500, n: 'سيارة' }, car4: { m: 1000, a: 4, F: 4000, n: 'سيارة' } };
  const D = { id: 'g8_fma', ch: 22, sec: 'الدرس 1', page: 25, kind: 'تطبيق',
    title: 'مثال: F = m a — احسب القوة والتعجيل خطوة بخطوة',
    desc: 'مثال الكتاب: ما القوة اللازمة لتحريك صندوق كتلته 50 kg بتعجيل خطي 2 m/s²؟ وسؤال الشكل: القوة اللازمة لتحريك سيارة 1000 kg بتعجيل 0.5 m/s². ومقارنة: عربة تسوق بقوة صغيرة وكبيرة، وجزازة عشب وسيارة بالقوة نفسها.',
    tags: 'مثال القانون الثاني قوة تعجيل كتلة صندوق سيارة عربة تسوق حساب',
    tools: ['شخص يدفع', 'صندوق 50 kg', 'سيارة 1000 kg', 'عربة تسوق'],
    steps: ['اختر المثال: «صندوق 50 kg» (مثال الكتاب) أو «سيارة 1000 kg» (سؤال الشكل) أو «س5».', 'اختر المطلوب (القوة F أو التعجيل a أو الكتلة m)، واضغط «الخطوة التالية» لترى الحل خطوة بخطوة: المعطيات ← القانون ← التعويض ← الناتج.', 'اضغط «▶ ادفع» لترى الجسم يتحرك بالتعجيل المحسوب (نقاط المواقع كل 0.5 s).', 'اسحب رأس سهم القوة لتغيّر القوة ولاحظ تغيّر التعجيل.', 'في «عربة التسوق»: قوة كبيرة ← سرعة أكبر. في «الجزازة والسيارة»: القوة نفسها، الكتلة الصغيرة تتحرك أسرع.'],
    concl: ['القوة = الكتلة × التعجيل: F (N) = m (kg) × a (m/s²).', 'صندوق 50 kg بتعجيل 2 m/s² يحتاج قوة F = 50 × 2 = 100 N.', 'عندما تدفع عربة بقوة كبيرة فإنها تتحرك بسرعة أكبر مما لو دفعتها بقوة صغيرة.', 'تتحرك السيارة الصغيرة (أو الجزازة) بسرعة أكبر من السيارة الكبيرة عندما تؤثر عليهما القوة نفسها.'],
    laws: ['g8_n2', 'g8_n2a'],
    fact: ['1 N هي القوة التي تكسب جسماً كتلته 1 kg تعجيلاً مقداره 1 m/s².', 'لدفع سيارة متعطلة يتعاون عدة أشخاص: كلما زادت القوة المحصلة زاد تعجيلها.'],
    controls: [SEL('ex', 'المثال', [['box', '📦 مثال: صندوق 50 kg'], ['car', '🚗 سؤال: سيارة 1000 kg'], ['car4', '🏎️ س5: سيارة بتعجيل 4 m/s²'], ['trolley', '🛒 عربة التسوق: قوتان'], ['mower', '🚜 جزازة وسيارة: كتلتان']], 'box', (v, S) => D.pick(S)),
      Q22.V(SEL('find', 'المطلوب', [['F', 'القوة F'], ['a', 'التعجيل a'], ['m', 'الكتلة m']], 'F', (v, S) => { S.stp = 0; D.reset(S); }), s => !!EX[s.p.ex]),
      Q22.V(R('m', 'الكتلة m', 10, 2000, 50, 10, 'kg', (v, S) => D.reset(S)), s => !!EX[s.p.ex] && s.p.find !== 'm'), Q22.V(R('a', 'التعجيل a', .5, 10, 2, .5, 'm/s²', (v, S) => D.reset(S)), s => !!EX[s.p.ex] && s.p.find !== 'a'), Q22.V(R('F', 'القوة F', 50, 8000, 100, 50, 'N', (v, S) => D.reset(S)), s => !!EX[s.p.ex] && s.p.find !== 'F'),
      TG('frc', 'سهم القوة', true, null, 'force'), TG('vel', 'سهم السرعة', true, null, 'velocity'), Q22.V(TG('strobe', 'مواقع الجسم كل 0.5 s', true, null, 'dot'), s => !!EX[s.p.ex]), TG('lab', 'خطوات الحل', true, null, 'labels')],
    setup(S) { S.stp = 0; D.reset(S); },
    pick(S) { const e = EX[S.p.ex]; S.stp = 0; if (e) { setParam(S, 'm', e.m, false); setParam(S, 'a', e.a, false); setParam(S, 'F', e.F, false); } D.reset(S); },
    reset(S) { S.x1 = 0; S.v1 = 0; S.x2 = 0; S.v2 = 0; S.mv = 0; S.tm = 0; S.pts = []; },
    vals(S) { const p = S.p; let m = p.m, a = p.a, F = p.F; if (p.find === 'F') F = m * a; else if (p.find === 'a') a = F / m; else m = F / a; return { m, a, F }; },
    pair(S) { return S.p.ex === 'trolley' ? [{ m: 20, F: 20, n: 'قوة صغيرة 20 N' }, { m: 20, F: 60, n: 'قوة كبيرة 60 N' }] : [{ m: 1000, F: 600, n: 'سيارة 1000 kg' }, { m: 40, F: 600, n: 'جزازة عشب 40 kg' }]; },
    update(S, dt) { dt = Math.min(dt, .04); if (!S.mv) return; S.tm += dt;
      if (EX[S.p.ex]) { const a = D.vals(S).a; S.v1 += a * dt; S.x1 += S.v1 * dt; if (Math.floor(S.tm / .5) > S.pts.length - 1) S.pts.push(S.x1); if (S.tm > 3) S.mv = 0; }
      else { const P = D.pair(S); S.v1 += P[0].F / P[0].m * dt; S.x1 += S.v1 * dt; S.v2 += P[1].F / P[1].m * dt; S.x2 += S.v2 * dt; if (S.x1 > 8.6) { S.x1 = 8.6; } if (S.x2 > 8.6) { S.x2 = 8.6; } if (S.tm > 3 || (S.x1 >= 8.6 && S.x2 >= 8.6)) S.mv = 0; } },
    geo(S) { const w = S.W, h = S.H, x0 = 110, x1 = w - 30; return { w, h, x0, x1 }; },
    obj(ctx, k, x, y, s) { // object whose back (pushed side) is at x, sitting on y
      if (k === 'box') { K.box(ctx, x, y, 90 * s, 80 * s, 30 * s, 'wood'); Q22.T(ctx, '50 kg', x + 45 * s, y - 40 * s, { s: 13, w: 900, c: '#fff', bg: 'rgba(120,53,15,.85)' }); return 90 * s; }
      if (k === 'car' || k === 'car4' || k === 'bigcar') { C2.car(ctx, x + 98 * s, y, s, k === 'car4' ? '#dc2626' : '#2563eb'); return 196 * s; }
      if (k === 'mower') { K.raw(ctx, () => { ctx.fillStyle = '#16a34a'; rr(ctx, x + 20 * s, y - 40 * s, 60 * s, 26 * s, 6); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(x + 22 * s, y - 34 * s); ctx.lineTo(x - 18 * s, y - 80 * s); ctx.stroke(); [x + 30 * s, x + 70 * s].forEach(wx => { ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(wx, y - 10 * s, 10 * s, 0, TAU); ctx.fill(); }); }); return 80 * s; }
      if (k === 'trolley') { K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 14 * s, y - 92 * s); ctx.lineTo(x, y - 80 * s); ctx.lineTo(x + 90 * s, y - 80 * s); ctx.lineTo(x + 80 * s, y - 30 * s); ctx.lineTo(x + 10 * s, y - 30 * s); ctx.closePath(); ctx.stroke(); for (let k2 = 1; k2 < 6; k2++) { ctx.beginPath(); ctx.moveTo(x + k2 * 15 * s, y - 80 * s); ctx.lineTo(x + 5 * s + k2 * 13 * s, y - 30 * s); ctx.stroke(); } ctx.fillStyle = '#111'; [x + 18 * s, x + 74 * s].forEach(wx => { ctx.beginPath(); ctx.arc(wx, y - 8 * s, 8 * s, 0, TAU); ctx.fill(); }); }); return 90 * s; }
      return 80;
    },
    draw(ctx, w, h, S) {
      Q22.vis(S); const p = S.p, g = D.geo(S); K.bg(ctx, w, h, { benchY: h * .62, top: '#e0f2fe', bottom: '#f8fafc' });
      K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; ctx.fillRect(0, h * .62, w, h * .38); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(0, h * .62, w, 5); });
      if (EX[p.ex]) {
        const V = D.vals(S), y = h * .62, s = p.ex === 'box' ? 1 : .8, M = (g.x1 - g.x0 - 260) / Math.max(.5 * V.a * 9, 1);
        const ox = g.x0 + 60 + S.x1 * M;
        if (p.strobe !== false) K.raw(ctx, () => { S.pts.forEach((q, i) => { const xx = g.x0 + 60 + q * M; ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(xx + 40, y + 16, 5, 0, TAU); ctx.fill(); }); });
        if (p.strobe !== false && S.pts.length > 1) Q22.T(ctx, 'مواقع الجسم كل 0.5 s: المسافات تزداد ← تعجيل', (g.x0 + g.x1) / 2, y + 40, { s: 11.5, w: 800, c: '#6d28d9' });
        const wd = D.obj(ctx, p.ex, ox, y, s);
        Q22.kidR(ctx, ox - 34, y, 1.15, '#0ea5e9', 1, ox + 2, y - (p.ex === 'box' ? 48 : 42) * s, .45);
        const FL = clamp(Math.log10(V.F) * 40 - 40, 30, 170);
        if (p.frc !== false) Q22.F(ctx, ox + wd / 2 - FL / 2, y - (p.ex === 'box' ? 110 : 100), FL, 0, 'F = ' + fmt(V.F, 4) + ' N', '#dc2626', 5);
        S._fh = [ox + wd / 2 + FL / 2, y - (p.ex === 'box' ? 110 : 100)];
        if (p.vel !== false && S.v1 > .01) Q22.F(ctx, ox + wd / 2, y - 150, clamp(S.v1 * 18, 10, 150), 0, 'v = ' + fmt(S.v1, 2) + ' m/s', '#16a34a', 4);
        if (p.lab !== false) D.sol(ctx, S, V, w);
      } else {
        const P = D.pair(S), Mx = (g.x1 - g.x0 - 260) / 9;
        P.forEach((q, i) => { const y = h * (.4 + i * .22) + (i ? h * .04 : 0), x = g.x0 + 60 + (i ? S.x2 : S.x1) * Mx, k = p.ex === 'trolley' ? 'trolley' : (i ? 'mower' : 'bigcar'), s = k === 'bigcar' ? .55 : .9;
          K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(g.x0, y + 2, g.x1 - g.x0, 4); });
          const wd = D.obj(ctx, k, x, y, s); Q22.kidR(ctx, x - 30, y, .95, i ? '#16a34a' : '#ef4444', 1, x + 1, y - 46, .4);
          const a = q.F / q.m; const FL = p.ex === 'trolley' ? q.F * 1.6 : 70;
          if (p.frc !== false) Q22.F(ctx, x + wd / 2 - FL / 2, y - 100 * s - 14, FL, 0, 'F = ' + q.F + ' N', '#dc2626', 4);
          if (p.vel !== false && (i ? S.v2 : S.v1) > .01) Q22.F(ctx, x + wd + 14, y - 30, clamp((i ? S.v2 : S.v1) * 9, 10, 120), 0, '', '#16a34a', 4);
          if (p.lab !== false) Q22.T(ctx, q.n + ' ← a = ' + q.F + ' ÷ ' + q.m + ' = ' + fmt(a, 3) + ' m/s²', (g.x0 + w) / 2, y + 22, { s: 12.5, w: 900, c: '#fff', bg: i ? '#15803d' : '#b91c1c' }); });
        if (p.lab !== false) C2.lines(ctx, [{ t: p.ex === 'trolley' ? 'الكتلة نفسها (20 kg): القوة الأكبر ← تعجيل أكبر' : 'القوة نفسها (600 N): الكتلة الأصغر ← تعجيل أكبر', c: '#7c3aed' }, { t: 'a = F ÷ m', c: '#dc2626', mono: 1 }], w - 16, 44, Math.min(380, w * .55), { title: p.ex === 'trolley' ? 'أثر مقدار القوة' : 'أثر كتلة الجسم', bd: '#7c3aed' });
      }
      Q22.banner(ctx, w, 'القوة = الكتلة × التعجيل   F = m a', '#b91c1c', 20);
      const B = D.btns(S); C2.btn(ctx, B[0].x, B[0].y, B[0].w, B[0].h, '▶ ادفع', { col: '#dc2626', on: S.mv }); if (EX[p.ex]) { C2.btn(ctx, B[1].x, B[1].y, B[1].w, B[1].h, S.stp >= 4 ? '↺ أخفِ الحل' : 'الخطوة التالية ⟵', { col: '#7c3aed' }); }
      K.party(ctx, S);
    },
    sol(ctx, S, V, w) {
      const p = S.p, e = EX[p.ex], u = { F: 'N', a: 'm/s²', m: 'kg' }, nm = { F: 'القوة F', a: 'التعجيل a', m: 'الكتلة m' };
      const giv = ['m', 'a', 'F'].filter(k => k !== p.find).map(k => k + ' = ' + fmt(V[k], 4) + ' ' + u[k]).join('  ،  ');
      const form = { F: 'F = m × a', a: 'a = F ÷ m', m: 'm = F ÷ a' }[p.find];
      const sub = { F: 'F = ' + fmt(V.m, 4) + ' kg × ' + fmt(V.a, 3) + ' m/s²', a: 'a = ' + fmt(V.F, 4) + ' N ÷ ' + fmt(V.m, 4) + ' kg', m: 'm = ' + fmt(V.F, 4) + ' N ÷ ' + fmt(V.a, 3) + ' m/s²' }[p.find];
      const L = [{ t: '1) المعطيات: ' + giv, c: '#0f172a' }, { t: '   المطلوب: ' + nm[p.find] + ' = ؟', c: '#475569' }, { t: '2) القانون: ' + form, c: '#dc2626', mono: 1 }, { t: '3) التعويض: ' + sub, c: '#1d4ed8', mono: 1 }, { t: '4) الناتج: ' + p.find + ' = ' + fmt(V[p.find], 4) + ' ' + u[p.find], c: '#15803d', w: 900, s: 14 }];
      const shown = L.slice(0, [1, 2, 3, 4, 5][S.stp] || 1); if (S.stp === 0) shown.push({ t: 'اضغط «الخطوة التالية» لترى الحل', c: '#7c3aed' });
      C2.lines(ctx, shown, w - 16, 44, Math.min(420, w * .6), { title: (p.ex === 'box' ? 'مثال الكتاب: صندوق' : p.ex === 'car' ? 'سؤال الشكل: سيارة' : 'مراجعة الفصل س5: سيارة') + ' — الحل خطوة بخطوة', bd: '#7c3aed', lh: 23 });
    },
    btns(S) { return Q22.row(S.W, S.H - 96, 2, 170); },
    drags(S) { if (!S.W) return []; const B = D.btns(S), L = [Q22.btnObj('push', B[0], S => { D.reset(S); S.mv = 1; }, { hint: true, idle: 'ادفع ✋' })];
      if (EX[S.p.ex]) { L.push(Q22.btnObj('step', B[1], S => { S.stp = S.stp >= 4 ? 0 : S.stp + 1; if (S.stp === 4) K.cheer(S, S.W * .7, S.H * .3); }));
        if (S._fh && S.p.find !== 'F') L.push({ id: 'fhead', x: S._fh[0], y: S._fh[1], r: 24, axis: 'x', keep: true, hint: false, tip: 'اسحب رأس السهم لتغيير القوة', drag: (S, d) => { setParam(S, 'F', S.p.F + d.dx * (S.p.F > 1000 ? 40 : 4)); } }); }
      return L; },
    readings(S) { if (!EX[S.p.ex]) { const P = D.pair(S); return P.map((q, i) => rd(q.n, 'a = ' + fmt(q.F / q.m, 3) + ' m/s² ، v = ' + fmt(i ? S.v2 : S.v1, 3) + ' m/s', 1)); } const V = D.vals(S); return [rd('الكتلة m', fmt(V.m, 4) + ' kg'), rd('التعجيل a', fmt(V.a, 3) + ' m/s²'), rd('القوة F', fmt(V.F, 4) + ' N'), rd('السرعة بعد ' + fmt(S.tm, 2) + ' s', fmt(S.v1, 3) + ' m/s')]; },
    record(S) { if (!EX[S.p.ex]) { Runner.toast('الجدول لأمثلة الحساب', 'info'); return null; } const V = D.vals(S); return { o: EX[S.p.ex].n, m: +V.m.toFixed(1), a: +V.a.toFixed(2), F: +V.F.toFixed(1) }; },
    cols: [['o', 'الجسم'], ['m', 'm (kg)'], ['a', 'a (m/s²)'], ['F', 'F (N)']],
    explain(S) { const V = D.vals(S);
      if (S.p.ex === 'trolley') return Q22.ex('عربتان متساويتان في الكتلة (20 kg): التي دفعناها بقوة أكبر (60 N) تسرع أكثر وتسبق الأخرى.', 'التعجيل يتناسب <b>طردياً</b> مع القوة: a = F ÷ m ؛ ثلاثة أضعاف القوة ← ثلاثة أضعاف التعجيل.', 'كلما دفعت عربة التسوق بقوة أكبر تحركت بسرعة أكبر (الشكل ص 25).');
      if (S.p.ex === 'mower') return Q22.ex('القوة نفسها (600 N) تؤثر في جزازة العشب وفي السيارة، فتسرع الجزازة كثيراً وتتحرك السيارة ببطء.', 'التعجيل يتناسب <b>عكسياً</b> مع الكتلة: الجزازة كتلتها 40 kg فتعجيلها كبير، والسيارة 1000 kg فتعجيلها صغير.', 'دفع دراجة أسهل بكثير من دفع سيارة متعطلة.');
      const u = { F: 'N', a: 'm/s²', m: 'kg' }[S.p.find];
      return Q22.ex('شخص يدفع ' + EX[S.p.ex].n + ' كتلته ' + fmt(V.m, 4) + ' kg فيتحرك بتعجيل ' + fmt(V.a, 3) + ' m/s² (المسافات بين النقاط البنفسجية تزداد).', 'القانون الثاني: <b>القوة = الكتلة × التعجيل</b>. نكتب المعطيات، ثم القانون، ثم نعوّض: ' + S.p.find + ' = <b>' + fmt(V[S.p.find], 4) + ' ' + u + '</b>.', '1 N هي القوة التي تكسب جسماً كتلته 1 kg تعجيلاً مقداره 1 m/s².'); },
    quiz: [
      { q: 'ما مقدار القوة التي تجعل سيارة كتلتها 1000 kg تتحرك بتعجيل منتظم مقداره 4 m/s²؟', o: ['250 N', '4000 N', '1004 N'], a: 1, why: 'مراجعة الفصل س5: F = m a = 1000 × 4 = 4000 N.' },
      { q: 'القوة اللازمة لتحريك صندوق كتلته 50 kg بتعجيل 2 m/s² هي:', o: ['25 N', '52 N', '100 N'], a: 2, why: 'مثال الكتاب: F = 50 × 2 = 100 N.' },
      { q: 'إذا أثرت القوة نفسها في سيارة صغيرة وسيارة كبيرة فإن:', o: ['الصغيرة تتحرك بسرعة أكبر', 'الكبيرة تتحرك بسرعة أكبر', 'تتحركان بالسرعة نفسها'], a: 0, why: 'كتلتها أصغر فتعجيلها أكبر (ص 25).' }
    ]
  };
  M8.P[D.id] = D;
})();

/* =========================================================================================
   5) القانون الثالث لنيوتن (ص 25–26): الفعل ورد الفعل
   ========================================================================================= */
(() => {
  const SC = [['skate', '🛼 متزلجان يدفع أحدهما الآخر'], ['wall', '🧱 دفع الجدار'], ['balloon', '🎈 البالون الصاروخي'], ['rocket', '🚀 انطلاق الصاروخ'], ['row', '🚣 التجذيف'], ['walk', '🚶 المشي']];
  const ACT = { skate: ['أحمد يدفع سارة', 'سارة تدفع أحمد'], wall: ['الطفل يدفع الجدار', 'الجدار يدفع الطفل'], balloon: ['البالون يدفع الهواء للخلف', 'الهواء يدفع البالون للأمام'], rocket: ['الصاروخ يدفع الغازات للأسفل', 'الغازات تدفع الصاروخ للأعلى'], row: ['المجداف يدفع الماء للخلف', 'الماء يدفع المجداف والزورق للأمام'], walk: ['القدم تدفع الأرض للخلف', 'الأرض تدفع القدم للأمام'] };
  const D = { id: 'g8_newton3', ch: 22, sec: 'الدرس 1', page: 26, kind: 'نشاط',
    title: 'القانون الثالث لنيوتن: لكل فعل رد فعل',
    desc: 'لكل قوة فعل قوة رد فعل مساوية لها في المقدار ومعاكسة لها في الاتجاه، وتؤثران في جسمين مختلفين: متزلجان، دفع الجدار، البالون، الصاروخ، التجذيف، والمشي.',
    tags: 'نيوتن القانون الثالث فعل رد فعل صاروخ تجذيف بالون متزلج مشي',
    tools: ['متزلجان', 'بالون وخيط وماصة', 'صاروخ', 'زورق ومجاذيف'],
    steps: ['مشهد «المتزلجان»: اضغط «👐 ادفع» أو اسحب يد أحمد نحو سارة. لاحظ السهمين: متساويان ومتعاكسان، كلٌّ منهما على جسم مختلف.', 'غيّر كتلتي المتزلجين: هل تبقى القوتان متساويتين؟ من يكتسب سرعة أكبر؟', 'مشهد «دفع الجدار»: لماذا يتحرك الطفل إلى الخلف عندما يدفع الجدار؟', 'مشهد «البالون»: انفخ البالون بالنقر عليه ثم أطلقه. اتجاه اندفاع الهواء واتجاه حركة البالون؟', 'شاهد الصاروخ والتجذيف والمشي، وحدّد في كل مرة قوة الفعل وقوة رد الفعل.'],
    concl: ['لكل قوة فعل قوة رد فعل مساوية لها في المقدار ومعاكسة لها في الاتجاه (القانون الثالث لنيوتن).', 'قوة الفعل تؤثر في أحد الجسمين، وقوة رد الفعل تؤثر في الجسم الآخر؛ لذلك لا تلغي إحداهما الأخرى.', 'ينطلق الصاروخ إلى الأعلى نتيجة انبعاث الغازات المتدفقة إلى الأسفل، ويندفع الزورق إلى الأمام لأن المجداف يدفع الماء إلى الخلف.', 'عند المشي تدفع قدمك الأرض إلى الخلف فتدفعك الأرض إلى الأمام.'],
    laws: ['g8_n3'],
    fact: ['الصاروخ لا يحتاج إلى هواء ليندفع، لذلك يعمل في الفضاء: الغازات التي يقذفها هي التي تدفعه.', 'عندما تدفع باباً مقفلاً فإنه يدفعك بقوة مساوية ومعاكسة، فلا يتحرك الباب وتشعر بقوته على يدك.', 'الحبّار والأخطبوط يسبحان بقذف الماء إلى الخلف — صاروخ طبيعي!'],
    controls: [SEL('sc', 'المثال', SC, 'skate', (v, S) => D.reset(S)), Q22.V(R('m1', 'كتلة أحمد', 30, 80, 60, 5, 'kg'), s => s.p.sc === 'skate' || s.p.sc === 'wall'), Q22.V(R('m2', 'كتلة سارة', 30, 80, 40, 5, 'kg'), s => s.p.sc === 'skate'), Q22.V(R('F', 'قوة الدفع (الفعل)', 50, 300, 150, 10, 'N'), s => s.p.sc !== 'balloon' && s.p.sc !== 'rocket'),
      TG('pair', 'قوتا الفعل ورد الفعل', true, null, 'force'), TG('vel', 'أسهم السرعة', true, null, 'velocity'), Q22.V(TG('pts', 'جسيمات الهواء/الغاز/الماء', true, null, 'wave'), s => ['balloon', 'rocket', 'row'].includes(s.p.sc)), TG('lab', 'البطاقات والشرح', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.x1 = 0; S.x2 = 0; S.v1 = 0; S.v2 = 0; S.pT = 0; S.air = 0; S.bx = 0; S.bv = 0; S.rel = 0; S.ry = 0; S.rv = 0; S.fire = 0; S.boat = 0; S.bvl = 0; S.stroke = 0; S.walk = 0; S.wx = 0; S.ph = 0; S.parts = []; S.Fnow = 0; },
    act(S) { const p = S.p; S.Fnow = 0;
      if (p.sc === 'skate' || p.sc === 'wall') { D.reset(S); S.pT = .35; }
      if (p.sc === 'balloon') { if (!S.rel && S.air > .05) S.rel = 1; else if (!S.rel) { S.air = Math.min(1, S.air + .35); } else D.reset(S); }
      if (p.sc === 'rocket') { if (!S.fire) { D.reset(S); S.fire = 1; } else D.reset(S); }
      if (p.sc === 'row') S.stroke = .8;
      if (p.sc === 'walk') S.walk = !S.walk;
    },
    update(S, dt) { dt = Math.min(dt, .04); const p = S.p, F = p.F; S.Fnow = 0;
      if (p.sc === 'skate' || p.sc === 'wall') { if (S.pT > 0) { S.pT -= dt; S.Fnow = F; S.v1 -= F / p.m1 * dt; if (p.sc === 'skate') S.v2 += F / p.m2 * dt; }
        S.v1 *= Math.pow(.85, dt); S.v2 *= Math.pow(.85, dt); S.x1 = clamp(S.x1 + S.v1 * dt, -3.2, 3); S.x2 = clamp(S.x2 + S.v2 * dt, -3, 3.2); }
      if (p.sc === 'balloon' && S.rel) { if (S.air > 0) { S.air = Math.max(0, S.air - .45 * dt); S.Fnow = 2 + 6 * S.air; S.bv += S.Fnow * 1.2 * dt; } S.bv *= Math.pow(.6, dt); S.bx = Math.min(1, S.bx + S.bv * dt * .25); if (S.air > 0) for (let k = 0; k < 2; k++) S.parts.push({ x: S.bx, y: (Math.random() - .5) * .3, vx: -.6 - Math.random() * .4, t: 0 }); }
      if (p.sc === 'rocket' && S.fire) { S.Fnow = F * 100; S.rv += 1.4 * dt; S.ry += S.rv * dt; for (let k = 0; k < 3; k++) S.parts.push({ x: (Math.random() - .5) * .4, y: S.ry, vy: -.8 - Math.random() * .6, t: 0 }); if (S.ry > 2.4) { S.ry = 0; S.rv = 0; S.fire = 0; } }
      if (p.sc === 'row') { if (S.stroke > 0) { S.stroke -= dt; S.Fnow = F; S.bvl += F / 400 * dt; if (Math.random() < .6) S.parts.push({ x: S.boat, y: 0, vx: -.5 - Math.random() * .3, t: 0 }); } S.bvl *= Math.pow(.7, dt); S.boat += S.bvl * dt; S.ph += dt * (S.stroke > 0 ? 4 : 0); }
      if (p.sc === 'walk' && S.walk) { S.ph += dt * 4.2; S.Fnow = F; S.wx += 1.3 * dt; }
      S.parts.forEach(q => { q.t += dt; q.x += (q.vx || 0) * dt; q.y += (q.vy || 0) * dt; }); S.parts = S.parts.filter(q => q.t < 1.2).slice(-160);
      hist(S, 'hf', S.Fnow, 300);
    },
    pairArrows(ctx, S, A, B, L, txt) { // A = point on body 1 (action), B = point on body 2 (reaction); L = signed length for action (x)
      if (S.p.pair === false) return; Q22.F(ctx, A[0], A[1], A[2] ?? L, A[3] || 0, txt[0], '#dc2626', 5); Q22.F(ctx, B[0], B[1], B[2] ?? -L, B[3] || 0, txt[1], '#2563eb', 5);
    },
    draw(ctx, w, h, S) {
      Q22.vis(S); const p = S.p, sc = p.sc, cx = (w + 64) / 2; const on = S.Fnow > 0;
      const LF = clamp(p.F * .35, 30, 110);
      if (sc === 'skate' || sc === 'wall') {
        const gy = h * .7; K.bg(ctx, w, h, { benchY: gy, top: '#e0f2fe', bottom: '#f1f5f9' }); K.raw(ctx, () => { ctx.fillStyle = '#cbd5e1'; ctx.fillRect(0, gy, w, h - gy); ctx.fillStyle = 'rgba(255,255,255,.6)'; for (let x = 0; x < w; x += 60) ctx.fillRect(x, gy + 20, 30, 3); });
        const M = (w - 140) / 9; const k1 = cx - 50 + S.x1 * M, k2 = cx + 50 + S.x2 * M;
        const board = (x) => K.raw(ctx, () => { ctx.fillStyle = '#f97316'; rr(ctx, x - 30, gy - 14, 60, 8, 4); ctx.fill(); ctx.fillStyle = '#111'; [x - 20, x + 20].forEach(xx => { ctx.beginPath(); ctx.arc(xx, gy - 4, 5, 0, TAU); ctx.fill(); }); });
        if (sc === 'wall') K.raw(ctx, () => { const wx = cx + 30; ctx.fillStyle = '#b45309'; ctx.fillRect(wx, h * .2, w - wx, gy - h * .2); ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 2; for (let y = h * .2; y < gy; y += 24) { ctx.beginPath(); ctx.moveTo(wx, y); ctx.lineTo(w, y); ctx.stroke(); for (let x = wx + ((y / 24 | 0) % 2) * 30; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 24); ctx.stroke(); } } });
        const s1 = .9 + (p.m1 - 30) / 100, s2 = .9 + (p.m2 - 30) / 100; const touching = S.pT > 0;
        board(k1); const hx1 = touching ? (sc === 'wall' ? cx + 30 : (k1 + k2) / 2) : k1 + 30; Q22.kidR(ctx, k1, gy - 14, s1 * 1.1, '#2563eb', 1, hx1, gy - 14 - 60 * s1, touching ? .25 : .05);
        if (sc === 'skate') { board(k2); Q22.kidR(ctx, k2, gy - 14, s2 * 1.1, '#db2777', -1, touching ? (k1 + k2) / 2 + 2 : k2 - 30, gy - 14 - 60 * s2, touching ? .25 : .05, { hair: '#1f2937', longHair: 1, pants: '#831843' }); }
        if (on) D.pairArrows(ctx, S, [hx1 + 4, gy - 105, LF, 0], [hx1 - 4, gy - 150, -LF, 0], LF, sc === 'wall' ? ['الفعل: الطفل يدفع الجدار', 'رد الفعل: الجدار يدفع الطفل'] : ['الفعل: أحمد يدفع سارة', 'رد الفعل: سارة تدفع أحمد']);
        if (p.vel !== false) { if (Math.abs(S.v1) > .05) Q22.F(ctx, k1, gy + 50, clamp(S.v1 * 40, -120, 120), 0, fmt(Math.abs(S.v1), 2) + ' m/s', '#16a34a', 4); if (sc === 'skate' && Math.abs(S.v2) > .05) Q22.F(ctx, k2, gy + 50, clamp(S.v2 * 40, -120, 120), 0, fmt(Math.abs(S.v2), 2) + ' m/s', '#16a34a', 4); }
        if (p.lab !== false) { Q22.T(ctx, 'أحمد ' + p.m1 + ' kg', k1, gy + 18, { s: 12, w: 900, c: '#fff', bg: '#2563eb' }); if (sc === 'skate') Q22.T(ctx, 'سارة ' + p.m2 + ' kg', k2, gy + 18, { s: 12, w: 900, c: '#fff', bg: '#db2777' }); }
        S._hand = [k1 + 30, gy - 14 - 60 * s1];
      } else if (sc === 'balloon') {
        K.bg(ctx, w, h, { benchY: h * .82 }); const y = h * .42, x0 = 100, x1 = w - 60; K.raw(ctx, () => { ctx.strokeStyle = '#78716c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 - 20, y - 50); ctx.lineTo(x1 + 20, y - 50); ctx.stroke(); ctx.fillStyle = '#57534e'; ctx.fillRect(x0 - 26, y - 60, 8, h * .82 - y + 60); ctx.fillRect(x1 + 18, y - 60, 8, h * .82 - y + 60); });
        const bx = x0 + 60 + S.bx * (x1 - x0 - 140), r = 22 + 34 * Math.max(S.air, .15);
        if (p.pts !== false) K.raw(ctx, () => { ctx.fillStyle = 'rgba(14,165,233,.6)'; S.parts.forEach(q => { const qx = x0 + 60 + q.x * (x1 - x0 - 140) - r * 1.1 + q.vx * q.t * 300 * 0 + (q.t * q.vx * 220); ctx.beginPath(); ctx.arc(qx, y + q.y * 60 + q.y * q.t * 80, 3, 0, TAU); ctx.fill(); }); });
        K.raw(ctx, () => { ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.ellipse(bx, y, r * 1.25, r, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.ellipse(bx + r * .4, y - r * .4, r * .3, r * .18, -.4, 0, TAU); ctx.fill(); ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.moveTo(bx - r * 1.2, y); ctx.lineTo(bx - r * 1.2 - 12, y - 7); ctx.lineTo(bx - r * 1.2 - 12, y + 7); ctx.fill();
          ctx.fillStyle = '#e2e8f0'; ctx.fillRect(bx - 22, y - r - 6 - (y - r - (y - 50)) , 44, 7); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx - 12, y - 46); ctx.lineTo(bx - 8, y - r + 2); ctx.moveTo(bx + 12, y - 46); ctx.lineTo(bx + 8, y - r + 2); ctx.stroke(); });
        if (!S.rel) C2.hand(ctx, bx - r * 1.25 - 14, y + 4, 1, 1, { sleeve: '#0ea5e9' });
        if (on) D.pairArrows(ctx, S, [bx - r * 1.3 - 10, y + r + 20, -LF * .8, 0], [bx, y - r - 70, LF * .8, 0], LF, ['الفعل: البالون يدفع الهواء للخلف', 'رد الفعل: الهواء يدفع البالون للأمام']);
        if (p.vel !== false && S.bv > .02) Q22.F(ctx, bx, y + r + 60, clamp(S.bv * 90, 10, 120), 0, 'السرعة', '#16a34a', 4);
        if (p.lab !== false) Q22.T(ctx, S.rel ? (S.air > 0 ? 'الهواء يندفع من الفوهة…' : 'فرغ الهواء — يتباطأ البالون') : 'كمية الهواء: ' + Math.round(S.air * 100) + '% — انقر البالون لتنفخه ثم «أطلق»', (w + 64) / 2, h * .72, { s: 13, w: 800, c: '#fff', bg: 'rgba(30,41,59,.85)' });
        S._bal = [bx, y, r];
      } else if (sc === 'rocket') {
        const gy = h * .8; Q22.outdoor(ctx, w, h, gy, { top: '#1e3a8a', bot: '#93c5fd', g1: '#a3a3a3', g2: '#525252' });
        const M = h * .3, ry = gy - 10 - S.ry * M, rx = cx;
        if (p.pts !== false) K.raw(ctx, () => { S.parts.forEach(q => { const yy = gy - 10 - q.y * M - q.vy * q.t * M; const yc = Math.min(yy, gy - 6); const r = 6 + q.t * 22; ctx.fillStyle = `rgba(${q.t < .3 ? '251,146,60' : '226,232,240'},${.75 - q.t * .55})`; ctx.beginPath(); ctx.arc(rx + q.x * 60 + (yy > gy - 6 ? q.x * q.t * 300 : 0), yc, r, 0, TAU); ctx.fill(); }); });
        K.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(rx, ry - 150); ctx.quadraticCurveTo(rx + 24, ry - 120, rx + 22, ry - 70); ctx.lineTo(rx + 22, ry); ctx.lineTo(rx - 22, ry); ctx.lineTo(rx - 22, ry - 70); ctx.quadraticCurveTo(rx - 24, ry - 120, rx, ry - 150); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#dc2626'; [[-1], [1]].forEach(([sg]) => { ctx.beginPath(); ctx.moveTo(rx + sg * 22, ry - 40); ctx.lineTo(rx + sg * 42, ry + 4); ctx.lineTo(rx + sg * 22, ry); ctx.fill(); }); ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.arc(rx, ry - 90, 9, 0, TAU); ctx.fill(); ctx.fillStyle = '#475569'; ctx.fillRect(rx - 14, ry, 28, 8);
          if (S.fire) { ctx.fillStyle = 'rgba(253,224,71,.9)'; ctx.beginPath(); ctx.moveTo(rx - 12, ry + 8); ctx.quadraticCurveTo(rx, ry + 70 + Math.random() * 20, rx + 12, ry + 8); ctx.fill(); } });
        if (S.fire) D.pairArrows(ctx, S, [rx + 70, ry + 20, 0, LF], [rx + 70, ry - 40, 0, -LF], LF, ['الفعل: الصاروخ يدفع الغازات للأسفل', 'رد الفعل: الغازات تدفع الصاروخ للأعلى']);
        if (p.vel !== false && S.rv > .05) Q22.F(ctx, rx - 70, ry - 60, 0, -clamp(S.rv * 60, 10, 120), 'السرعة', '#16a34a', 4);
        S._rk = [rx, ry - 70];
      } else if (sc === 'row') {
        const wy = h * .55; Q22.outdoor(ctx, w, h, wy, { g1: '#38bdf8', g2: '#0369a1' });
        K.raw(ctx, () => { ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 2; const o = S.boat * 120; for (let k = 0; k < 12; k++) { const x = ((k * 97 - o) % (w + 100) + w + 100) % (w + 100) - 50; ctx.beginPath(); ctx.moveTo(x, wy + 30 + (k * 37) % (h - wy - 60)); ctx.lineTo(x + 40, wy + 30 + (k * 37) % (h - wy - 60)); ctx.stroke(); } });
        const bx = cx, a = Math.sin(S.ph) * .5;
        if (p.pts !== false) K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.85)'; S.parts.forEach(q => { ctx.beginPath(); ctx.arc(bx - 120 + q.vx * q.t * 160 + (q.x - S.boat) * 120, wy + 22 + q.t * 10, 4 - q.t * 2, 0, TAU); ctx.fill(); }); });
        K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(bx - 170, wy - 14); ctx.lineTo(bx + 170, wy - 14); ctx.quadraticCurveTo(bx + 150, wy + 10, bx + 110, wy + 12); ctx.lineTo(bx - 140, wy + 12); ctx.quadraticCurveTo(bx - 165, wy + 4, bx - 170, wy - 14); ctx.fill();
          ctx.fillStyle = '#fef2f2'; ctx.fillRect(bx - 150, wy - 16, 290, 4); });
        for (let k = 0; k < 4; k++) { // rowers sit facing the stern (−x); the drive pulls the handle to the chest, the blade pushes the water backwards
          const px = bx - 80 + k * 64, s = .5, hip = [px, wy - 20], hd = [px - 30 + a * 40, wy - 30], pv = [px - 12, wy - 14], bl = [pv[0] + (pv[0] - hd[0]) * 2.5, pv[1] + (pv[1] - hd[1]) * 2.5];
          Q22.man(ctx, { hip, dir: -1, s, lean: .1 - a * .9, feet: [[px - 36, wy - 4], [px - 32, wy - 5]], hands: [hd, [hd[0] - 2, hd[1] + 2]], elb: [0, 1], shirt: ['#facc15', '#f97316', '#facc15', '#f97316'][k], pants: '#111827', cap: '#dc2626', mid: ctx2 => { ctx2.strokeStyle = '#78350f'; ctx2.lineWidth = 3; ctx2.beginPath(); ctx2.moveTo(hd[0] - 3, hd[1] - 1); ctx2.lineTo(bl[0], bl[1]); ctx2.stroke(); ctx2.fillStyle = '#f59e0b'; ctx2.beginPath(); ctx2.ellipse(bl[0] + 3, bl[1] + 3, 11, 4, -.9, 0, TAU); ctx2.fill(); } }); }
        K.raw(ctx, () => { ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.moveTo(bx - 168, wy - 12); ctx.lineTo(bx + 168, wy - 12); ctx.lineTo(bx + 160, wy - 4); ctx.lineTo(bx - 160, wy - 4); ctx.closePath(); ctx.fill(); });
        if (on) D.pairArrows(ctx, S, [bx - 150, wy + 46, -LF, 0], [bx - 20, wy - 100, LF, 0], LF, ['الفعل: المجداف يدفع الماء للخلف', 'رد الفعل: الماء يدفع الزورق للأمام']);
        if (p.vel !== false && S.bvl > .02) Q22.F(ctx, bx + 120, wy - 60, clamp(S.bvl * 120, 10, 120), 0, 'سرعة الزورق', '#16a34a', 4);
        S._boat = [bx, wy - 20];
      } else { // walk
        const gy = h * .72; Q22.outdoor(ctx, w, h, gy, { g1: '#d6d3d1', g2: '#78716c' }); Q22.trees(ctx, w, gy, S.wx * 120);
        const x = cx, s = clamp(h / 520, .8, 1.25), ph = S.ph, Wk = Q22.walk(x, gy, ph, s, 1, 1.1), sw = Wk.sw;
        Q22.man(ctx, { hip: Wk.hip, dir: 1, s, lean: .07, feet: Wk.feet, hands: [[x + 6 * s - 20 * s * sw, Wk.hip[1] - 2 * s], [x + 6 * s + 20 * s * sw, Wk.hip[1] - 4 * s]], shirt: '#16a34a', pants: '#1e3a8a' });
        const st = Wk.feet[0][1] >= Wk.feet[1][1] ? 0 : 1, fx = Wk.feet[st][0];
        if (on) D.pairArrows(ctx, S, [fx - 6, gy + 16, -LF, 0], [fx + 6, gy - 20, LF, 0], LF, ['الفعل: القدم تدفع الأرض للخلف', 'رد الفعل: الأرض تدفع القدم للأمام']);
        S._walker = [x, gy - 70];
      }
      if (p.lab !== false) { const A = ACT[sc]; C2.lines(ctx, [{ t: '🔴 الفعل: ' + A[0], c: '#dc2626' }, { t: '🔵 رد الفعل: ' + A[1], c: '#2563eb' }, { t: 'متساويتان مقداراً، متعاكستان اتجاهاً، على جسمين مختلفين', c: '#0f172a' }].concat(sc === 'skate' ? [{ t: 'a(أحمد) = ' + fmt(p.F / p.m1, 3) + '  ،  a(سارة) = ' + fmt(p.F / p.m2, 3) + ' m/s²', c: '#16a34a', mono: 1 }] : []), w - 16, 44, Math.min(400, w * .58), { title: 'القانون الثالث لنيوتن', bd: '#7c3aed' }); }
      const b = D.btn(S); C2.btn(ctx, b.x, b.y, b.w, b.h, D.btnLabel(S), { col: '#7c3aed' });
      Q22.banner(ctx, w, 'لكل قوة فعل قوة رد فعل مساوية لها في المقدار ومعاكسة لها في الاتجاه', '#6d28d9', 20);
    },
    btnLabel(S) { const sc = S.p.sc; return { skate: '👐 ادفع', wall: '👐 ادفع الجدار', balloon: S.rel ? '↺ من جديد' : S.air > .05 ? '🚀 أطلق البالون' : '💨 انفخ البالون', rocket: S.fire ? '↺ من جديد' : '🔥 أطلق الصاروخ', row: '🚣 جدّف', walk: S.walk ? '⏸ توقف' : '🚶 امشِ' }[sc]; },
    btn(S) { return { x: (S.W + 64) / 2, y: S.H - 96, w: 200, h: 40 }; },
    drags(S) { if (!S.W) return []; const p = S.p, L = [Q22.btnObj('act', D.btn(S), S => D.act(S), { hint: true, idle: 'اضغط ✋' })];
      if ((p.sc === 'skate' || p.sc === 'wall') && S._hand) L.push({ id: 'hand', x: S._hand[0], y: S._hand[1], r: 30, axis: 'x', keep: true, hint: false, tip: 'اسحب اليد للأمام لتدفع', drag: (S, d) => { if (d.x - d.sx > 15 && S.pT <= 0 && Math.abs(S.v1) < .05) { D.reset(S); S.pT = .35; } } });
      if (p.sc === 'balloon' && S._bal && !S.rel) L.push({ id: 'balloon', x: S._bal[0], y: S._bal[1], r: S._bal[2] + 10, hint: false, tip: 'انقر لتنفخ البالون', click: S => { S.air = Math.min(1, S.air + .25); }, wheel: (S, k) => { S.air = clamp(S.air + k * .1, 0, 1); } });
      if (p.sc === 'row' && S._boat) L.push({ id: 'boat', x: S._boat[0], y: S._boat[1], w: 300, h: 60, hint: false, tip: 'انقر لتجدّف', click: S => { S.stroke = .8; } });
      return L; },
    readings(S) { const p = S.p; const L = [rd('قوة الفعل', fmt(S.Fnow, 4) + ' N'), rd('قوة رد الفعل', fmt(S.Fnow, 4) + ' N (معاكسة)')];
      if (p.sc === 'skate') L.push(rd('سرعة أحمد', fmt(Math.abs(S.v1), 3) + ' m/s'), rd('سرعة سارة', fmt(Math.abs(S.v2), 3) + ' m/s'));
      if (p.sc === 'wall') L.push(rd('سرعة الطفل للخلف', fmt(Math.abs(S.v1), 3) + ' m/s'));
      if (p.sc === 'balloon') L.push(rd('الهواء داخل البالون', Math.round(S.air * 100) + ' %'));
      return L; },
    live: { title: 'قوة الفعل ورد الفعل مع الزمن', data: S => ({ series: [{ pts: S.hf || [], color: '#dc2626', name: 'الفعل' }, { pts: (S.hf || []).map(q => [q[0], -q[1]]), color: '#2563eb', name: 'رد الفعل' }], opts: { xl: 't (s)' } }) },
    explain(S) { const p = S.p, A = ACT[p.sc];
      const E3 = {
        walk: ['عندما يمشي الشخص تدفع قدمه الأرض إلى الخلف (السهم الأحمر)، فتدفعه الأرض إلى الأمام (السهم الأزرق).', 'القدم تؤثر في <b>الأرض</b> بقوة (فعل)، والأرض تؤثر في <b>القدم</b> بقوة مساوية ومعاكسة (رد فعل) هي التي تحرّكنا إلى الأمام.', 'لا نستطيع المشي على الجليد الأملس جيداً لأن القدم لا تستطيع دفع الأرض إلى الخلف.'],
        wall: ['الطفل يدفع الجدار، فيتحرك الطفل نفسه إلى الخلف!', 'الطفل يؤثر في <b>الجدار</b> بقوة (فعل)، فيؤثر الجدار في <b>الطفل</b> بقوة مساوية ومعاكسة (رد فعل) تدفعه إلى الخلف.', 'عندما تدفع باباً مقفلاً تشعر بأن الباب يدفع يدك.'],
        skate: ['أحمد يدفع سارة، فيتحرك الاثنان بعيداً كلٌّ في اتجاه، والأخف يتحرك أسرع.', 'القوتان متساويتان (' + p.F + ' N) ومتعاكستان، لكن كل قوة تؤثر في <b>جسم مختلف</b>؛ والأقل كتلة يكتسب تعجيلاً أكبر (a = F ÷ m).', 'عندما تقفز من قارب صغير إلى الشاطئ يتحرك القارب إلى الخلف.'],
        balloon: ['عندما تطلق البالون يندفع الهواء من فوهته إلى الخلف، ويتحرك البالون إلى الأمام على الخيط.', 'البالون يدفع <b>الهواء</b> إلى الخلف (فعل)، والهواء يدفع <b>البالون</b> إلى الأمام (رد فعل).', 'هذه فكرة عمل الصاروخ والطائرة النفاثة.'],
        rocket: ['الصاروخ يقذف الغازات الساخنة إلى الأسفل، فينطلق هو إلى الأعلى.', 'الصاروخ يدفع <b>الغازات</b> إلى الأسفل (فعل)، والغازات تدفع <b>الصاروخ</b> إلى الأعلى (رد فعل). لا يحتاج إلى هواء ليدفعه.', 'الحبّار والأخطبوط يسبحان بقذف الماء إلى الخلف.'],
        row: ['المجداف يدفع الماء إلى الخلف، فيندفع الزورق إلى الأمام.', 'المجداف يؤثر في <b>الماء</b> بقوة إلى الخلف (فعل)، والماء يؤثر في <b>المجداف والزورق</b> بقوة إلى الأمام (رد فعل).', 'السبّاح يدفع الماء بيديه إلى الخلف فيتقدم إلى الأمام.'] }[p.sc];
      return Q22.ex(E3[0], E3[1], E3[2]); },
    quiz: [
      { q: 'واحد من الخيارات التالية لا يصح أن توصف به قوتا الفعل ورد الفعل:', o: ['متساويتان بالمقدار', 'متعاكستان بالاتجاه', 'تؤثران على جسم واحد'], a: 2, why: 'مراجعة الفصل س2: الفعل ورد الفعل يؤثران في جسمين مختلفين.' },
      { q: 'لكل قوة فعل قوة ............ مساوية لها بالمقدار ومعاكسة لها بالاتجاه:', o: ['جذب', 'رد فعل', 'احتكاك'], a: 1, why: 'مراجعة الفصل س1: نص القانون الثالث لنيوتن.' },
      { q: 'ماذا يحصل عندما تدفع باباً مقفلاً؟', o: ['يدفعك الباب بقوة مساوية ومعاكسة', 'لا يؤثر الباب فيك بأي قوة', 'يدفعك الباب بقوة أكبر'], a: 0, why: 'التفكير الناقد: قوة رد الفعل من الباب تؤثر في يدك.' }
    ]
  };
  const mk = (id, keys, extra) => { const P = Object.assign({}, D, extra, { id }); P.controls = [SEL('sc', 'المثال', keys.map(k => SC.find(q => q[0] === k)), keys[0], (v, S) => D.reset(S))].concat(D.controls.slice(1)); P.setup = S => D.reset(S); return P; };
  M8.P.g8_n3_push = mk('g8_n3_push', ['walk', 'wall', 'skate'], { page: 25, desc: 'كيف نمشي؟ قدمك تدفع الأرض إلى الخلف فتدفعك الأرض إلى الأمام. والطفل الذي يدفع الجدار يرتد إلى الخلف، والمتزلجان يبتعدان عندما يدفع أحدهما الآخر.',
    steps: ['مشهد «المشي» (ص 25): اضغط «🚶 امشِ». السهم الأحمر: القدم تدفع الأرض للخلف. السهم الأزرق: الأرض تدفع القدم للأمام.', 'مشهد «دفع الجدار»: اضغط «👐 ادفع الجدار» أو اسحب يد الطفل. لماذا يتحرك الطفل إلى الخلف؟', 'مشهد «المتزلجان»: ادفع، ثم غيّر كتلتي أحمد وسارة وقوة الدفع. هل تبقى القوتان متساويتين؟ من يتحرك أسرع؟'],
    concl: ['عند المشي تدفع قدمك الأرض إلى الخلف فتدفعك الأرض إلى الأمام بقوة مساوية ومعاكسة.', 'قوتا الفعل ورد الفعل متساويتان مقداراً ومتعاكستان اتجاهاً وتؤثران في جسمين مختلفين؛ لذلك لا تلغي إحداهما الأخرى.', 'بالقوة نفسها يكتسب الجسم الأقل كتلة تعجيلاً أكبر (القانون الثاني).'] });
  M8.P.g8_n3_jet = mk('g8_n3_jet', ['rocket', 'row', 'balloon'], { page: 26, desc: 'ينطلق الصاروخ إلى الأعلى نتيجة انبعاث الغازات المتدفقة إلى الأسفل، ويندفع الزورق إلى الأمام لأن المجداف يدفع الماء إلى الخلف (الشكلان ص 26)، والبالون يندفع بعكس اتجاه الهواء الخارج منه.',
    steps: ['مشهد «الصاروخ»: اضغط «🔥 أطلق الصاروخ». حدّد قوة الفعل (على الغازات) وقوة رد الفعل (على الصاروخ).', 'مشهد «التجذيف»: اضغط «🚣 جدّف» أو انقر الزورق. لاحظ الماء المندفع إلى الخلف والزورق المندفع إلى الأمام.', 'مشهد «البالون»: انقر البالون لتنفخه ثم اضغط «أطلق». في أي اتجاه يخرج الهواء؟ وفي أي اتجاه يتحرك البالون؟', 'سؤال الكتاب: اذكر أمثلة أخرى لقوة الفعل وقوة رد الفعل.'],
    concl: ['لكل قوة فعل قوة رد فعل مساوية لها في المقدار ومعاكسة لها في الاتجاه (القانون الثالث لنيوتن).', 'ينطلق الصاروخ إلى الأعلى لأن الغازات المتدفقة إلى الأسفل تدفعه إلى الأعلى؛ لذلك يعمل في الفضاء حيث لا هواء.', 'يدفع المجداف الماء إلى الخلف، فيدفع الماء المجداف والزورق إلى الأمام.'] });
})();

/* =========================================================================================
   6) قانون الجذب العام (ص 27): التجاذب بين الكتل، القمر حول الأرض، الكواكب حول الشمس
   ========================================================================================= */
(() => {
  const D = { id: 'g8_gravity', ch: 22, sec: 'الدرس 2', page: 27, kind: 'نشاط',
    title: 'قانون الجذب العام لنيوتن',
    desc: 'أي جسمين في الكون يجذب أحدهما الآخر بقوة متبادلة تتناسب طردياً مع حاصل ضرب كتلتيهما وعكسياً مع مربع البعد بين مركزيهما. شاهد ذلك بين كرتين، وبين الأرض والقمر، وفي دوران الكواكب حول الشمس.',
    tags: 'جاذبية قانون الجذب العام نيوتن كتلة بعد قمر أرض شمس كواكب مدار',
    tools: ['كرتان', 'الأرض والقمر', 'الشمس والكواكب'],
    steps: ['مشهد «كرتان»: اسحب الكرتين لتغيّر البعد بينهما، وغيّر كتلتيهما. لاحظ أن سهمي القوة متساويان دائماً ومتعاكسان.', 'ضاعف البعد: كم تصبح القوة؟ (ربع ما كانت). ضاعف إحدى الكتلتين: كم تصبح؟ (الضعف). سجّل القراءات وارسم القوة مع البعد.', 'مشهد «الأرض والقمر»: ما الذي يُبقي القمر على مداره؟ أطفئ «قوة الجاذبية» وراقب ماذا يحدث!', 'مشهد «الشمس والكواكب»: غيّر كتلة الشمس ولاحظ تأثيرها في حركة الكواكب.'],
    concl: ['أي جسمين في الكون يجذب أحدهما الآخر بقوة متبادلة تتناسب طردياً مع حاصل ضرب كتلتيهما وعكسياً مع مربع البعد بين مركزيهما.', 'تقل قوة الجاذبية بين جسمين إذا ازداد البعد بين مركزيهما؛ فإذا تضاعف البعد قلّت القوة إلى الربع.', 'قوة التجاذب بين الأجسام الصغيرة صغيرة جداً لا يظهر أثرها، أما بين الكتل الكبيرة (الأرض والقمر، الشمس والكواكب) فيكون أثرها ظاهراً.', 'قوة جذب الأرض للقمر هي التي تُبقيه على مداره حولها، ولو زالت لانطلق القمر بخط مستقيم (القانون الأول).'],
    laws: ['g8_grav'],
    fact: ['قوة الجاذبية الأرضية هي أحدى أكبر أربع قوى في الكون (حقيقة علمية ص 27).', 'عرف العلماء العرب الجاذبية وبحثوا في سقوط الأجسام وانجذابها لبعضها، وأول من صاغ قانون الجذب العام هو العالم إسحاق نيوتن.', 'جذب القمر لمياه البحار يسبب ظاهرة المد والجزر.'],
    controls: [SEL('sc', 'المثال', [['two', '⚪⚪ كرتان'], ['moon', '🌍🌙 الأرض والقمر'], ['sun', '☀️ الشمس والكواكب']], 'two', (v, S) => D.reset(S)),
      Q22.V(R('m1', 'الكتلة الأولى m₁', 1, 10, 4, 1, '×'), s => s.p.sc === 'two'), Q22.V(R('m2', 'الكتلة الثانية m₂', 1, 10, 4, 1, '×'), s => s.p.sc === 'two'), Q22.V(R('d', 'البعد بين المركزين d', 1, 6, 2, .5, 'm'), s => s.p.sc === 'two'), Q22.V(R('ms', 'كتلة الشمس', .5, 2, 1, .25, '×', (v, S) => { }), s => s.p.sc === 'sun'),
      TG('grav', 'قوة الجاذبية', true, null, 'force'), Q22.V(TG('vel', 'سهم السرعة', true, null, 'velocity'), s => s.p.sc === 'moon'), Q22.V(TG('orb', 'المسار', true, null, 'dot'), s => s.p.sc !== 'two'), TG('lab', 'البطاقات والقيم', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.mx = 0; S.my = 0; S.mvx = 0; S.mvy = 0; S.pl = null; S.trM = []; S.lost = 0; S.tt = 0; S.xc = 0; },
    F(S) { const p = S.p; return p.m1 * p.m2 / (p.d * p.d); },
    update(S, dt) { dt = Math.min(dt, .03); const p = S.p; if (!S.W) return; const w = S.W, h = S.H, cx = (w + 64) / 2, cy = h * .52;
      if (p.sc === 'moon') { const R0 = Math.min(w - 120, h - 120) * .36, GM = R0 * (TAU / 6) ** 2 * R0 * R0;
        if (!S.mx && !S.my) { S.mx = R0; S.my = 0; S.mvx = 0; S.mvy = -TAU / 6 * R0; S.trM = []; }
        for (let k = 0; k < 4; k++) { const d = dt / 4, r = Math.hypot(S.mx, S.my); if (p.grav !== false) { const a = GM / (r * r); S.mvx -= a * S.mx / r * d; S.mvy -= a * S.my / r * d; } S.mx += S.mvx * d; S.my += S.mvy * d; }
        Q22.strobe(S, 'trM', cx + S.mx, cy + S.my, .12); if (Math.hypot(S.mx, S.my) > Math.max(w, h)) { S.lost = 1; } }
      if (p.sc === 'sun') { const R = Math.min(w - 120, h - 120) * .45; if (!S.pl) S.pl = [.32, .55, .8, 1].map((f, i) => { const r = R * f, v = Math.sqrt(R * R * 60 / r); return { x: r, y: 0, vx: 0, vy: -v * (i % 2 ? 1 : 1), c: ['#a8a29e', '#f59e0b', '#3b82f6', '#ef4444'][i], tr: [] }; });
        const GM = R * R * 60 * p.ms; S.pl.forEach(q => { for (let k = 0; k < 4; k++) { const d = dt / 4, r = Math.max(10, Math.hypot(q.x, q.y)); if (p.grav !== false) { const a = GM / (r * r); q.vx -= a * q.x / r * d; q.vy -= a * q.y / r * d; } q.x += q.vx * d; q.y += q.vy * d; } q.tr.push([q.x, q.y]); if (q.tr.length > 90) q.tr.shift(); }); }
    },
    draw(ctx, w, h, S) {
      Q22.vis(S); const p = S.p, cx = (w + 64) / 2, cy = h * .52; G.bg(ctx, w, h, false);
      K.raw(ctx, () => { ctx.fillStyle = '#0b1026'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#fff'; for (let k = 0; k < 90; k++) { ctx.globalAlpha = .3 + (k * 37 % 10) / 14; ctx.fillRect((k * 173) % w, (k * 97) % h, 1.6, 1.6); } ctx.globalAlpha = 1; });
      const sph = (x, y, r, c1, c2) => K.raw(ctx, () => { const g = ctx.createRadialGradient(x - r * .35, y - r * .35, r * .1, x, y, r); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); });
      if (p.sc === 'two') {
        const M = Math.min(110, (w - 200) / 6.4), xm = cx + clamp(S.xc || 0, -(w - 140) / 2 + p.d * M / 2, (w - 140) / 2 - p.d * M / 2), x1 = xm - p.d * M / 2, x2 = xm + p.d * M / 2, r1 = 12 + p.m1 * 3.4, r2 = 12 + p.m2 * 3.4, F = D.F(S);
        sph(x1, cy, r1, '#bfdbfe', '#1d4ed8'); sph(x2, cy, r2, '#fecaca', '#b91c1c');
        K.raw(ctx, () => { ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(x1, cy + 70); ctx.lineTo(x2, cy + 70); ctx.stroke(); ctx.setLineDash([]); });
        Q22.T(ctx, 'd = ' + fmt(p.d, 2) + ' m', xm, cy + 86, { s: 13, w: 900, c: '#fff', bg: '#475569' });
        const L = clamp(F * 10, 10, 190);
        if (p.grav !== false) { Q22.F(ctx, x1 + r1 + 4, cy - 0, L, 0, '', '#facc15', 5); Q22.F(ctx, x2 - r2 - 4, cy, -L, 0, '', '#facc15', 5); Q22.T(ctx, 'F', x1 + r1 + L / 2, cy - 18, { s: 13, w: 900, c: '#0f172a', bg: '#facc15' }); Q22.T(ctx, 'F', x2 - r2 - L / 2, cy - 18, { s: 13, w: 900, c: '#0f172a', bg: '#facc15' }); }
        Q22.T(ctx, 'm₁ = ' + p.m1, x1, cy - r1 - 22, { s: 13, w: 900, c: '#fff', bg: '#1d4ed8' }); Q22.T(ctx, 'm₂ = ' + p.m2, x2, cy - r2 - 22, { s: 13, w: 900, c: '#fff', bg: '#b91c1c' });
        if (p.lab !== false) C2.lines(ctx, [{ t: 'F ∝ (m₁ × m₂) ÷ d²', c: '#b45309', mono: 1 }, { t: 'F ∝ (' + p.m1 + ' × ' + p.m2 + ') ÷ ' + fmt(p.d, 2) + '² = ' + fmt(F, 3), c: '#0f172a', mono: 1 }, { t: 'مقارنة بالحالة d = 2 m: القوة × ' + fmt(4 / (p.d * p.d), 3), c: '#7c3aed' }], w - 16, 44, Math.min(360, w * .5), { title: 'قانون الجذب العام', bd: '#f59e0b' });
        S._b = [x1, x2, cy, r1, r2, M];
      } else if (p.sc === 'moon') {
        if (p.orb !== false) Q22.drawStrobe(ctx, S.trM, '#94a3b8', 2.2);
        sph(cx, cy, 48, '#93c5fd', '#1e40af'); K.raw(ctx, () => { ctx.fillStyle = 'rgba(34,197,94,.7)'; ctx.beginPath(); ctx.ellipse(cx - 12, cy - 10, 16, 10, .6, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(cx + 16, cy + 14, 12, 8, -.4, 0, TAU); ctx.fill(); });
        const mx = cx + S.mx, my = cy + S.my; sph(mx, my, 15, '#f1f5f9', '#64748b');
        const r = Math.hypot(S.mx, S.my) || 1, sp = Math.hypot(S.mvx, S.mvy) || 1;
        if (p.grav !== false) Q22.F(ctx, mx, my, -S.mx / r * 60, -S.my / r * 60, 'جذب الأرض', '#facc15', 4);
        if (p.vel !== false) Q22.F(ctx, mx, my, S.mvx / sp * 60, S.mvy / sp * 60, 'السرعة', '#22c55e', 4);
        if (p.lab !== false) C2.lines(ctx, [{ t: p.grav !== false ? 'جذب الأرض يغيّر اتجاه حركة القمر باستمرار فيبقى على مداره' : 'لا جاذبية ← ينطلق القمر بخط مستقيم (القانون الأول)!', c: p.grav !== false ? '#0f172a' : '#dc2626' }, { t: 'أطفئ/شغّل «قوة الجاذبية» من التأثيرات أو انقر الأرض', c: '#7c3aed' }], w - 16, 44, Math.min(400, w * .58), { title: 'ما الذي يُبقي القمر على مداره؟', bd: '#3b82f6' });
        if (S.lost) Q22.T(ctx, 'ابتعد القمر! اضغط «↺» (إعادة) أو انقر الأرض', cx, h - 130, { s: 13, w: 900, c: '#fff', bg: '#dc2626' });
      } else {
        sph(cx, cy, 26 * Math.sqrt(p.ms), '#fef08a', '#ea580c');
        (S.pl || []).forEach(q => { if (p.orb !== false) K.raw(ctx, () => { ctx.strokeStyle = q.c; ctx.globalAlpha = .45; ctx.lineWidth = 1.5; ctx.beginPath(); q.tr.forEach((t, i) => i ? ctx.lineTo(cx + t[0], cy + t[1]) : ctx.moveTo(cx + t[0], cy + t[1])); ctx.stroke(); ctx.globalAlpha = 1; });
          sph(cx + q.x, cy + q.y, 8, '#fff', q.c); const r = Math.hypot(q.x, q.y) || 1; if (p.grav !== false) Q22.F(ctx, cx + q.x, cy + q.y, -q.x / r * 34, -q.y / r * 34, '', '#facc15', 3); });
        if (p.lab !== false) C2.lines(ctx, [{ t: 'جذب الشمس يُبقي الكواكب تدور حولها', c: '#0f172a' }, { t: 'كتلة الشمس × ' + p.ms + ' ← ' + (p.ms > 1 ? 'جذب أقوى: تقترب الكواكب' : p.ms < 1 ? 'جذب أضعف: تبتعد الكواكب' : 'المدارات دائرية'), c: '#b45309' }], w - 16, 44, Math.min(380, w * .55), { title: 'الشمس والكواكب (الشكل 1)', bd: '#f59e0b' });
      }
      Q22.banner(ctx, w, 'أي جسمين في الكون يجذب أحدهما الآخر بقوة متبادلة', '#b45309', 20);
    },
    drags(S) { if (!S.W) return []; const p = S.p;
      if (p.sc === 'two' && S._b) { const [x1, x2, cy, r1, r2, M] = S._b; const cx = (S.W + 64) / 2;
        const mv = (S, keep, nx, left) => { const dd = setParam(S, 'd', clamp(left ? (keep - nx) / M : (nx - keep) / M, 1, 6)); S.xc = (left ? keep - dd * M / 2 : keep + dd * M / 2) - cx; };
        return [{ id: 'b1', x: x1, y: cy, r: r1 + 12, axis: 'x', keep: true, tip: 'اسحب الكرة الأولى لتغيّر البعد — عجلة الفأرة تغيّر كتلتها', idle: 'اسحب الكرة ✋', down: S => { S._k = x2; }, drag: (S, d) => mv(S, S._k, d.ox + d.x - d.sx, 1), wheel: (S, k) => setParam(S, 'm1', S.p.m1 + k) },
          { id: 'b2', x: x2, y: cy, r: r2 + 12, axis: 'x', keep: true, tip: 'اسحب الكرة الثانية لتغيّر البعد — عجلة الفأرة تغيّر كتلتها', idle: 'اسحبني أيضاً ✋', down: S => { S._k = x1; }, drag: (S, d) => mv(S, S._k, d.ox + d.x - d.sx, 0), wheel: (S, k) => setParam(S, 'm2', S.p.m2 + k) }]; }
      return [{ id: 'center', x: (S.W + 64) / 2, y: S.H * .52, r: 46, tip: 'انقر لإطفاء/تشغيل الجاذبية', idle: 'انقر لإطفاء الجاذبية', click: S => { if (S.lost) { D.reset(S); setParam(S, 'grav', true); return; } setParam(S, 'grav', S.p.grav === false); }, wheel: (S, k) => setParam(S, 'ms', S.p.ms + k * .25) }]; },
    readings(S) { const p = S.p; if (p.sc === 'two') return [rd('m₁ × m₂', p.m1 * p.m2), rd('d²', fmt(p.d * p.d, 3) + ' m²'), rd('F (نسبية) = m₁m₂/d²', fmt(D.F(S), 3)), rd('F مقارنة بـ d = 2 m', '× ' + fmt(4 / (p.d * p.d), 3))];
      return [rd('الجاذبية', p.grav !== false ? 'تعمل' : 'مُطفأة'), rd(p.sc === 'moon' ? 'بعد القمر' : 'كتلة الشمس', p.sc === 'moon' ? fmt(Math.hypot(S.mx, S.my) / (Math.min(S.W - 120, S.H - 120) * .36) * 384000, 3) + ' km' : '× ' + p.ms)]; },
    record(S) { if (S.p.sc !== 'two') { Runner.toast('الجدول لمشهد «كرتان»', 'info'); return null; } return { m1: S.p.m1, m2: S.p.m2, d: S.p.d, F: +D.F(S).toFixed(3) }; },
    cols: [['m1', 'm₁'], ['m2', 'm₂'], ['d', 'd (m)'], ['F', 'F (نسبية)']],
    graph: { x: 'd', y: 'F', xl: 'البعد d (m)', yl: 'قوة التجاذب (نسبية)', theory: (x, S) => S.p.m1 * S.p.m2 / (x * x), xmin: .8, xmax: 6.2 },
    explain(S) { const p = S.p;
      if (p.sc === 'two') return Q22.ex('سهما القوة (الأصفران) متساويان دائماً ومتعاكسان: كل كرة تجذب الأخرى. عند إبعاد الكرتين يصغر السهمان كثيراً.', 'قوة الجذب تتناسب <b>طردياً</b> مع حاصل ضرب الكتلتين و<b>عكسياً</b> مع مربع البعد: ضاعف البعد ← تصبح القوة الربع. الآن القوة × ' + fmt(4 / (p.d * p.d), 3) + ' مقارنة بالبعد 2 m.', 'أنت وصديقك تتجاذبان أيضاً! لكن الكتل صغيرة فالقوة صغيرة جداً لا نشعر بها.');
      if (p.sc === 'moon') return p.grav !== false ? Q22.ex('القمر يدور حول الأرض في مدار شبه دائري.', 'جذب الأرض (السهم الأصفر) يسحب القمر نحو مركزها باستمرار، فيغيّر اتجاه حركته فيدور حولها بدل أن يتحرك بخط مستقيم.', 'جذب القمر لمياه البحار يسبب المد والجزر.')
        : Q22.ex('أطفأتَ الجاذبية فانطلق القمر بخط مستقيم مبتعداً عن الأرض!', 'لا توجد قوة تغيّر اتجاه حركته، فيتحرك <b>بسرعة ثابتة وباتجاه ثابت</b> (القانون الأول).', 'الحجر في المقلاع ينطلق بخط مستقيم عندما تفلت الخيط.');
      return Q22.ex('الكواكب تدور حول الشمس، والأقرب يدور أسرع (الشكل 1).', 'كتلة الشمس كبيرة جداً، لذلك يظهر أثر جاذبيتها بوضوح فتُبقي الكواكب في مداراتها. غيّر كتلة الشمس: الجذب الأقوى يقرّب الكواكب.', 'الأرض تكمل دورة حول الشمس كل سنة بسبب هذه الجاذبية.'); },
    quiz: [
      { q: 'ما الذي يُبقي القمر على مداره حول الأرض؟', o: ['قوة جذب الأرض للقمر', 'الرياح الشمسية', 'القصور الذاتي فقط'], a: 0, why: 'مراجعة الدرس: الجاذبية بين الأرض والقمر.' },
      { q: 'تقل قوة الجاذبية بين جسمين إذا .......... البعد بين مركزيهما:', o: ['قلّ', 'ازداد', 'بقي ثابتاً'], a: 1, why: 'مراجعة الفصل س1: القوة تتناسب عكسياً مع مربع البعد.' },
      { q: 'على ماذا تعتمد قوة الجذب المتبادلة بين جسمين؟', o: ['على لونيهما', 'على كتلتيهما والبعد بين مركزيهما', 'على سرعتيهما'], a: 1, why: 'نص قانون الجذب العام لنيوتن.' }
    ]
  };
  M8.P[D.id] = D;
})();

/* =========================================================================================
   7) الوزن والكتلة (ص 27): w = m g على الأرض والقمر والكواكب
   ========================================================================================= */
(() => {
  const PL = { earth: { n: 'الأرض', g: 9.8, c: ['#e0f2fe', '#f0f9ff'], b: ['#3b82f6', '#16a34a'] }, moon: { n: 'القمر', g: 1.6, c: ['#cbd5e1', '#e2e8f0'], b: ['#e5e7eb', '#9ca3af'] }, mars: { n: 'المريخ', g: 3.7, c: ['#fed7aa', '#ffedd5'], b: ['#f97316', '#9a3412'] }, jup: { n: 'المشتري', g: 24.8, c: ['#fde68a', '#fef3c7'], b: ['#f59e0b', '#92400e'] }, space: { n: 'الفضاء البعيد', g: 0, c: ['#1e293b', '#334155'], b: ['#0f172a', '#0f172a'] } };
  const OB = [{ k: 'apple', n: 'تفاحة', m: .2 }, { k: 'book', n: 'كتاب', m: 1 }, { k: 'bag', n: 'حقيبة', m: 2.5 }, { k: 'mass', n: 'ثقل حديدي', m: 5 }, { k: 'car', n: 'سيارة', m: 1500 }];
  const D = { id: 'g8_weight', ch: 22, sec: 'الدرس 2', page: 27, kind: 'نشاط',
    title: 'الوزن والكتلة: w = m g (على الأرض والقمر والكواكب)',
    desc: 'وزن الجسم هو قوة جذب الأرض له، يقاس بالنيوتن (N) بالميزان النابضي ويحسب بالعلاقة w = m g. علّق أجساماً على الميزان النابضي، ثم انتقل إلى القمر والمريخ والمشتري: هل تتغير الكتلة؟ هل يتغير الوزن؟',
    tags: 'وزن كتلة جاذبية ميزان نابضي نيوتن قمر مشتري تعجيل الجاذبية w=mg',
    tools: ['ميزان نابضي', 'أجسام مختلفة الكتل', 'قبّان (ميزان سيارات)'],
    steps: ['اسحب جسماً (تفاحة، كتاب، حقيبة، ثقل) وعلّقه بخطاف الميزان النابضي. اقرأ الوزن بالنيوتن.', 'تحقق من الحساب: w = m × g = الكتلة × 9.8 N/kg (البطاقة تعوّض القيم).', 'انقر «🚗 السيارة» لوضع سيارة كتلتها 1500 kg على القبّان (مراجعة الفصل س6).', 'غيّر المكان إلى القمر ثم المريخ ثم المشتري، وسجّل الوزن في كل مرة. ماذا يتغير؟ وماذا يبقى ثابتاً؟', 'ارسم الوزن مع الكتلة على الأرض: ما ميل الخط؟'],
    concl: ['وزن الجسم هو قوة جذب الأرض له، وهو مقدار اتجاهي نحو مركز الأرض، ويقاس بالنيوتن (N) بالميزان النابضي.', 'يحسب الوزن بالعلاقة w = m g حيث g تعجيل الجاذبية الأرضية ومعدل مقداره 9.8 N/kg.', 'كتلة الجسم ثابتة في كل مكان، أما وزنه فيتغير بتغير الجاذبية: على القمر أقل بنحو 6 مرات، وعلى المشتري أكبر.', 'وزن الجسم يزداد بزيادة كتلته (تناسب طردي) في المكان نفسه.'],
    laws: ['g8_w'],
    fact: ['تعجيل الجاذبية على سطح القمر نحو 1.6 m/s²، لذلك يقفز رواد الفضاء على سطحه عالياً بسهولة.', 'تختلف قيمة g اختلافاً طفيفاً من مكان إلى آخر على الأرض حسب البعد عن مركزها.', 'في الفضاء البعيد عن الكواكب يكون الوزن صفراً تقريباً لكن الكتلة تبقى كما هي!'],
    controls: [SEL('pl', 'المكان', [['earth', '🌍 الأرض'], ['moon', '🌙 القمر'], ['mars', '🔴 المريخ'], ['jup', '🪐 المشتري'], ['space', '🌌 الفضاء البعيد']], 'earth'),
      BT('', [{ t: '🚗 السيارة على القبّان', on: S => { S.hung = 4; } }, { t: '↺ أنزل الجسم', on: S => { S.hung = -1; } }]),
      TG('frc', 'سهم الوزن', true, null, 'force'), TG('eq', 'التعويض في w = m g', true, null, 'labels'), TG('mass', 'بطاقة الكتلة', true, null, 'dot')],
    setup(S) { S.hung = -1; S.di = -1; S.dx = 0; S.dy = 0; S.ext = 0; },
    update(S, dt) { const w = D.w(S); S.ext += (w - S.ext) * Math.min(1, dt * 6); },
    w(S) { return S.hung >= 0 ? OB[S.hung].m * PL[S.p.pl].g : 0; },
    geo(S) { const w = S.W, h = S.H, by = h * .8, sx = Math.min(w - 150, Math.max(w * .62, 380)), sy = Math.max(h * .3, 200); return { w, h, by, sx, sy, shy: h * .56, shelf: OB.slice(0, 4).map((o, i) => [110 + i * Math.min(88, (sx - 200) / 4), h * .56]) }; },
    Fmax(S) { const w = D.w(S); return [10, 20, 50, 100, 200].find(v => v >= w) || 200; },
    obj(ctx, k, x, y, s = 1) { // y = bottom
      K.raw(ctx, () => {
        if (k === 'apple') { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(x - 6 * s, y - 14 * s, 13 * s, 0, TAU); ctx.arc(x + 6 * s, y - 14 * s, 13 * s, 0, TAU); ctx.fill(); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 26 * s); ctx.lineTo(x + 2, y - 34 * s); ctx.stroke(); ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.ellipse(x + 8, y - 32 * s, 6, 3, -.4, 0, TAU); ctx.fill(); }
        if (k === 'book') { ctx.fillStyle = '#2563eb'; rr(ctx, x - 26 * s, y - 34 * s, 52 * s, 34 * s, 3); ctx.fill(); ctx.fillStyle = '#f8fafc'; ctx.fillRect(x - 24 * s, y - 8 * s, 48 * s, 5 * s); ctx.fillStyle = '#facc15'; ctx.fillRect(x - 14 * s, y - 26 * s, 28 * s, 6 * s); }
        if (k === 'bag') { ctx.fillStyle = '#16a34a'; rr(ctx, x - 24 * s, y - 50 * s, 48 * s, 50 * s, 10 * s); ctx.fill(); ctx.fillStyle = '#15803d'; rr(ctx, x - 16 * s, y - 28 * s, 32 * s, 20 * s, 5 * s); ctx.fill(); ctx.strokeStyle = '#14532d'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y - 50 * s, 10 * s, Math.PI, TAU); ctx.stroke(); }
        if (k === 'mass') { const g = ctx.createLinearGradient(x - 20, 0, x + 20, 0); g.addColorStop(0, '#475569'); g.addColorStop(.5, '#cbd5e1'); g.addColorStop(1, '#334155'); ctx.fillStyle = g; rr(ctx, x - 22 * s, y - 42 * s, 44 * s, 42 * s, 5); ctx.fill(); ctx.fillRect(x - 6 * s, y - 52 * s, 12 * s, 12 * s); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y - 56 * s, 6 * s, 0, TAU); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.font = `900 ${12 * s}px ui-monospace`; ctx.textAlign = 'center'; ctx.direction = 'ltr'; ctx.fillText('5kg', x, y - 16 * s); }
      });
    },
    draw(ctx, w, h, S) {
      const p = S.p, P = PL[p.pl], g = D.geo(S); K.bg(ctx, w, h, { benchY: g.by, top: P.c[0], bottom: P.c[1], tiles: p.pl === 'earth' });
      K.raw(ctx, () => { if (p.pl === 'space' || p.pl === 'moon') { ctx.fillStyle = '#fff'; for (let k = 0; k < 40; k++) ctx.fillRect((k * 173) % w, (k * 89) % (g.by * .6), 2, 2); } // planet badge
        const bx = 120, by = 92, r = 34; const gr = ctx.createRadialGradient(bx - 10, by - 10, 4, bx, by, r); gr.addColorStop(0, '#fff'); gr.addColorStop(.3, P.b[0]); gr.addColorStop(1, P.b[1]); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(bx, by, r, 0, TAU); ctx.fill(); if (p.pl === 'jup') { ctx.strokeStyle = 'rgba(146,64,14,.5)'; ctx.lineWidth = 4; [-12, 0, 12].forEach(dy => { ctx.beginPath(); ctx.moveTo(bx - 30, by + dy); ctx.lineTo(bx + 30, by + dy); ctx.stroke(); }); } });
      Q22.T(ctx, P.n + ' : g = ' + P.g + ' N/kg', 120, 142, { s: 13, w: 900, c: '#fff', bg: 'rgba(15,23,42,.85)' });
      // stand + spring balance
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.sx + 70, g.sy - 40, 10, g.by - g.sy + 40); ctx.fillRect(g.sx - 10, g.sy - 46, 90, 10); rr(ctx, g.sx + 30, g.by - 12, 90, 12, 4); ctx.fill(); });
      const Fm = D.Fmax(S), car = S.hung === 4;
      const hook = K.springBalance(ctx, g.sx, g.sy - 18, car ? 0 : S.ext, Fm, { len: Math.min(190, g.by - g.sy - 150) });
      // shelf objects
      K.raw(ctx, () => { ctx.fillStyle = '#a16207'; rr(ctx, 70, g.shy, g.shelf[3][0] - 30, 10, 3); ctx.fill(); ctx.fillStyle = '#78350f'; ctx.fillRect(84, g.shy + 10, 8, 18); ctx.fillRect(g.shelf[3][0] + 24, g.shy + 10, 8, 18); });
      OB.slice(0, 4).forEach((o, i) => { if (S.hung === i || S.di === i) return; const [x, y] = g.shelf[i]; D.obj(ctx, o.k, x, y); Q22.T(ctx, o.n + ' ' + o.m + ' kg', x, y + 26 + (i % 2) * 16, { s: 11, w: 800, c: '#fff', bg: 'rgba(30,41,59,.8)' }); });
      if (S.di >= 0) D.obj(ctx, OB[S.di].k, S.dx, S.dy);
      if (S.hung >= 0 && S.hung < 4) { const o = OB[S.hung], yb = hook.hy + 6 + (o.k === 'mass' ? 56 : o.k === 'bag' ? 60 : 40); K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(hook.hx, hook.hy - 4); ctx.lineTo(hook.hx, yb - (o.k === 'mass' ? 56 : o.k === 'bag' ? 56 : 34)); ctx.stroke(); }); D.obj(ctx, o.k, hook.hx, yb);
        if (p.frc !== false && S.ext > .01) Q22.F(ctx, hook.hx + 46, yb - 20, 0, clamp(S.ext * 9, 14, 140), 'w = ' + fmt(S.ext, 3) + ' N', '#2563eb', 5); S._hb = [hook.hx, yb - 20]; } else S._hb = null;
      // weighbridge for the car
      const wbx = Math.max(200, (g.sx - 40) / 2 + 40), wby = g.by;
      K.raw(ctx, () => { ctx.fillStyle = '#64748b'; rr(ctx, wbx - 120, wby - 10, 240, 12, 3); ctx.fill(); ctx.fillStyle = '#0f172a'; rr(ctx, wbx + 128, wby - 60, 96, 32, 6); ctx.fill(); ctx.fillStyle = '#a3e635'; ctx.font = '800 14px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; ctx.fillText((car ? Math.round(S.ext) : 0) + ' N', wbx + 176, wby - 39); });
      if (car) { C2.car(ctx, wbx, wby - 10, .9, '#dc2626'); if (p.frc !== false) Q22.F(ctx, wbx, wby - 100, 0, 70, 'w = ' + Math.round(S.ext) + ' N', '#2563eb', 5); }
      Q22.T(ctx, 'قبّان السيارات', wbx, wby + 18, { s: 11, w: 800, c: '#fff', bg: 'rgba(30,41,59,.8)' });
      // equation & mass cards
      const L = []; if (S.hung >= 0) { const o = OB[S.hung];
        if (p.mass !== false) L.push({ t: 'الكتلة m = ' + o.m + ' kg (لا تتغير بتغير المكان)', c: '#7c3aed' });
        if (p.eq !== false) L.push({ t: 'w = m × g', c: '#dc2626', mono: 1 }, { t: 'w = ' + o.m + ' kg × ' + P.g + ' N/kg = ' + fmt(o.m * P.g, 5) + ' N', c: '#1d4ed8', mono: 1 }); }
      else L.push({ t: 'اسحب جسماً وعلّقه بالميزان النابضي', c: '#475569' });
      if (p.pl === 'space' && S.hung >= 0) L.push({ t: 'بعيداً عن الكواكب: الوزن ≈ صفر، والكتلة كما هي!', c: '#dc2626' });
      C2.lines(ctx, L, w - 16, 44, Math.min(380, w * .52), { title: 'الوزن = الكتلة × تعجيل الجاذبية', bd: '#2563eb' });
      Q22.banner(ctx, w, 'الوزن قوة جذب الكوكب للجسم: w = m g', '#1d4ed8', 20);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      OB.slice(0, 4).forEach((o, i) => { if (S.hung === i) return; const [x, y] = g.shelf[i]; L.push({ id: 'o' + i, x, y: y - 24, r: 30, axis: 'xy', keep: true, hint: i === 1, idle: 'اسحبه إلى الخطاف ✋', tip: 'اسحب ' + o.n + ' وعلّقه بخطاف الميزان',
        down: S => { S.di = i; S.dx = x; S.dy = y; }, drag: (S, d) => { S.dx = d.ox + d.x - d.sx; S.dy = d.oy + d.y - d.sy + 24; }, up: S => { const hx = g.sx + 4, hy = g.sy + Math.min(190, g.by - g.sy - 150) + 20; if (Math.hypot(S.dx - hx, S.dy - 40 - hy) < 110) { S.hung = i; } S.di = -1; } }); });
      if (S._hb) L.push({ id: 'hung', x: S._hb[0], y: S._hb[1], r: 32, axis: 'xy', hint: false, tip: 'انقر لإنزال الجسم', click: S => { S.hung = -1; } });
      const wbx = Math.max(200, (g.sx - 40) / 2 + 40); L.push({ id: 'car', x: wbx, y: g.by - 40, w: 220, h: 70, hint: false, tip: 'انقر لوضع السيارة (1500 kg) على القبّان', click: S => { S.hung = S.hung === 4 ? -1 : 4; } });
      return L; },
    readings(S) { const P = PL[S.p.pl], o = OB[S.hung]; return [rd('المكان', P.n), rd('g', P.g + ' N/kg'), rd('الكتلة m', o ? o.m + ' kg' : '—'), rd('الوزن w', o ? fmt(o.m * P.g, 5) + ' N' : '—')]; },
    record(S) { if (S.hung < 0) { Runner.toast('علّق جسماً أولاً', 'info'); return null; } const P = PL[S.p.pl], o = OB[S.hung]; return { pl: P.n, o: o.n, m: o.m, g: P.g, w: +(o.m * P.g).toFixed(2) }; },
    cols: [['pl', 'المكان'], ['o', 'الجسم'], ['m', 'm (kg)'], ['g', 'g (N/kg)'], ['w', 'w (N)']],
    graph: { x: 'm', y: 'w', xl: 'الكتلة m (kg)', yl: 'الوزن w (N)', theory: (x, S) => x * PL[S.p.pl].g, xmin: 0, xmax: 5.5 },
    explain(S) { const P = PL[S.p.pl]; if (S.hung < 0) return Q22.ex('ميزان نابضي فارغ، وعلى الرف أجسام مختلفة الكتل.', 'الوزن <b>قوة</b> جذب الأرض للجسم، لذلك يُقاس بالنيوتن (N) بالميزان النابضي، لا بالكيلوغرام.', 'الميزان في البيت يعرض الكتلة بالكيلوغرام، لكنه في الحقيقة يتأثر بالوزن.');
      const o = OB[S.hung]; return Q22.ex('الميزان يقرأ وزن ' + o.n + ' على ' + P.n + ': <b>' + fmt(o.m * P.g, 5) + ' N</b>.', 'w = m × g = ' + o.m + ' × ' + P.g + '. <b>الكتلة ' + o.m + ' kg ثابتة في كل مكان</b>، أما الوزن فيتغير لأن g تختلف من كوكب إلى آخر.', P.g < 5 ? 'رواد الفضاء يقفزون عالياً بسهولة على سطح القمر لأن وزنهم أقل.' : 'وزنك على المشتري أكبر بنحو 2.5 مرة من وزنك على الأرض!'); },
    quiz: [
      { q: 'ما مقدار وزن سيارة كتلتها 1500 kg؟ (g = 9.8 N/kg)', o: ['1500 N', '14700 N', '153 N'], a: 1, why: 'مراجعة الفصل س6: w = m g = 1500 × 9.8 = 14700 N.' },
      { q: 'قارن بين كتلة جسم على سطح الأرض وكتلته على كوكب المشتري:', o: ['كتلته على المشتري أكبر', 'الكتلة نفسها، أما الوزن فيختلف', 'كتلته على المشتري أصغر'], a: 1, why: 'مراجعة الفصل س3: الكتلة ثابتة والوزن يتغير بتغير الجاذبية.' },
      { q: 'ناقش العبارة: «وزن الجسم يزداد بزيادة كتلته»:', o: ['صحيحة لأن w = m g', 'خاطئة، الوزن لا يعتمد على الكتلة', 'صحيحة فقط على القمر'], a: 0, why: 'مراجعة الدرس: الوزن يتناسب طردياً مع الكتلة.' }
    ]
  };
  M8.P[D.id] = D;
})();

/* =========================================================================================
   8) السقوط الحر (ص 28–29، 31): نشاط الكرتين، الريشة والكرة في الفراغ، الورقة، برج بيزا
   ========================================================================================= */
(() => {
  const SC = {
    balls: { n: 'نشاط: كرتا الخشب والرصاص', H: 1.5, O: [{ n: 'كرة خشب', m: .02, k: .00035, c: '#d6a574' }, { n: 'كرة رصاص', m: .38, k: .00035, c: '#64748b' }] },
    tube: { n: 'الريشة والكرة في الأنبوب', H: 1, O: [{ n: 'ريشة', m: .003, k: .015, c: '#f8fafc', f: 1 }, { n: 'كرة', m: .05, k: .0004, c: '#b91c1c' }] },
    paper: { n: 'ورقة مضغوطة وورقة مسطحة', H: 1.5, O: [{ n: 'ورقة مسطحة', m: .005, k: .012, c: '#f8fafc', fl: 1 }, { n: 'ورقة مضغوطة', m: .005, k: .0004, c: '#e2e8f0', cr: 1 }] },
    pisa: { n: 'تجربة غاليليو (برج بيزا)', H: 56, O: [{ n: 'كرة 1 kg', m: 1, k: .0005, c: '#dc2626' }, { n: 'كرة 10 kg', m: 10, k: .0011, c: '#1d4ed8' }] }
  };
  const D = { id: 'g8_freefall', ch: 22, sec: 'الدرس 2', page: 29, kind: 'نشاط',
    title: 'نشاط: السقوط الحر ومقاومة الهواء',
    desc: 'نُسقط كرتين متساويتين في الحجم (خشب ورصاص) من ارتفاع 1.5 m ونسجّل زمن وصولهما. ونقارن سقوط الريشة والكرة في الهواء وفي أنبوب مفرّغ، والورقة المسطحة والمضغوطة على الأرض والقمر، وتجربة غاليليو من برج بيزا.',
    tags: 'سقوط حر جاذبية مقاومة الهواء فراغ ريشة غاليليو برج بيزا تعجيل الجاذبية',
    tools: ['كرتان متساويتان في الحجم (خشب ورصاص)', 'ساعة توقيت', 'شريط قياس', 'أنبوب مفرّغ من الهواء'],
    steps: ['في «النشاط»: اضغط «⬇ أفلت الكرتين» من ارتفاع 1.5 m (أو اسحب اليد للأسفل). ماذا تلاحظ؟', 'اقرأ زمن وصول كل كرة إلى الأرض من الساعة، وسجّله في الجدول.', 'استنتج نوع القوة التي جعلت الجسمين يسقطان في الوقت نفسه، وماذا يسمّى هذا النوع من السقوط.', 'في «الأنبوب»: أفلت الريشة والكرة والأنبوب مملوء بالهواء، ثم اضغط «🫧 فرّغ الهواء» وأعد التجربة.', 'في «الورقتين»: قارن سقوطهما على الأرض، ثم على سطح القمر (لا هواء). وشاهد تجربة غاليليو من برج بيزا.'],
    concl: ['تسقط الأجسام الثقيلة والخفيفة (المتساوية في الحجم) معاً تقريباً لأن الجاذبية الأرضية تكسبها التعجيل نفسه.', 'سبب الاختلاف الظاهر في سرعة سقوط الأجسام في الهواء هو مقاومة الهواء، وتأثيرها في الأجسام الخفيفة (الريشة، الورقة المسطحة) أكبر.', 'في الفراغ تسقط الريشة والكرة معاً وتصلان بالسرعة نفسها بفعل الجاذبية الأرضية فقط.', 'السقوط الحر: حركة الجسم بمسار خطي نحو مركز الأرض بتأثير الجاذبية الأرضية فقط وبتعجيل منتظم g ≈ 9.8 m/s².'],
    laws: ['g8_ff', 'g8_w'],
    fact: ['في عام 2014 أُسقطت كرة وريشة في غرفة ضخمة مفرغة من الهواء فوصلتا إلى أرضيتها معاً (الشكل 2).', 'أسقط غاليليو جسمين مختلفين في الكتلة من قمة برج بيزا بين عامي 1589 و1592 ليثبت أن السقوط الحر لا يعتمد على الكتلة.', 'على سطح القمر لا يوجد هواء، لذلك تسقط الورقة المسطحة والمضغوطة معاً!'],
    controls: [SEL('sc', 'التجربة', Object.keys(SC).map(k => [k, SC[k].n]), 'balls', (v, S) => D.reset(S)), Q22.V(R('H', 'ارتفاع الإسقاط', .5, 3, 1.5, .1, 'm', (v, S) => D.reset(S)), s => s.p.sc === 'balls'),
      Q22.V(SEL('where', 'المكان', [['earth', 'الأرض (هواء)'], ['moon', 'القمر (بلا هواء)']], 'earth', (v, S) => D.reset(S)), s => s.p.sc === 'paper'),
      BT('', [{ t: '⬇ أفلت', on: S => D.drop(S) }, { t: '↺ أعد', on: S => D.reset(S) }]), Q22.V(BT('', [{ t: '🫧 فرّغ/املأ الأنبوب', on: S => { S.pump = S.air > .5 ? 1 : -1; } }]), s => s.p.sc === 'tube'),
      TG('frc', 'الوزن ومقاومة الهواء', true, null, 'force'), TG('strobe', 'صور متتابعة كل 0.05 s', true, null, 'dot'), TG('vel', 'سهم السرعة', false, null, 'velocity'), TG('lab', 'الساعات والبطاقات', true, null, 'stopwatch')],
    setup(S) { S.air = 1; S.pump = 0; D.reset(S); },
    reset(S) { S.go = 0; S.tt = 0; S.y = [0, 0]; S.v = [0, 0]; S.tf = [0, 0]; S.tr = [[], []]; S.hv = []; S.hv2 = []; S.ok = 0; },
    H(S) { return S.p.sc === 'balls' ? S.p.H : SC[S.p.sc].H; },
    gAir(S) { const p = S.p; if (p.sc === 'paper' && p.where === 'moon') return [1.6, 0]; if (p.sc === 'tube') return [9.8, S.air]; return [9.8, 1]; },
    drop(S) { if (S.go || S.tt > 0) D.reset(S); S.go = 1; },
    update(S, dt) { dt = Math.min(dt, .03); const p = S.p;
      if (S.pump) { S.air = clamp(S.air - S.pump * dt * .6, 0, 1); if (S.air <= 0 || S.air >= 1) S.pump = 0; }
      if (!S.go) return; const H = D.H(S), [g, air] = D.gAir(S), O = SC[p.sc].O; const sub = p.sc === 'pisa' ? 1 : 4;
      for (let s = 0; s < sub; s++) { const d = dt / sub; S.tt += d;
        O.forEach((o, i) => { if (S.tf[i]) return; const a = g - air * o.k / o.m * S.v[i] * S.v[i]; S.v[i] += a * d; S.y[i] += S.v[i] * d; if (S.y[i] >= H) { S.y[i] = H; S.tf[i] = S.tt; } }); }
      O.forEach((o, i) => { if (!S.tf[i] && (!S.tr[i].lt || S.tt - S.tr[i].lt >= (p.sc === 'pisa' ? .25 : .05))) { S.tr[i].push(S.y[i]); S.tr[i].lt = S.tt; } });
      hist(S, 'hv', S.v[0], 300); hist(S, 'hv2', S.v[1], 300);
      if (S.tf[0] && S.tf[1]) { S.go = 0; if (!S.ok) { S.ok = 1; const dd = Math.abs(S.tf[0] - S.tf[1]); C2.msg(S, dd < .02 ? 'وصلا معاً تقريباً! (فرق ' + fmt(dd * 1000, 2) + ' ms)' : 'وصل «' + O[S.tf[0] < S.tf[1] ? 0 : 1].n + '» أولاً\nبفارق ' + fmt(dd, 3) + ' s — بسبب مقاومة الهواء', 4); if (dd < .02) K.cheer(S, S.W * .55, S.H * .5); } } },
    draw(ctx, w, h, S) {
      Q22.vis(S); const p = S.p, sc = p.sc, O = SC[sc].O, H = D.H(S), [g, air] = D.gAir(S);
      const moon = sc === 'paper' && p.where === 'moon';
      if (moon) { Q22.outdoor(ctx, w, h, h * .84, { top: '#020617', bot: '#1e293b', g1: '#d4d4d8', g2: '#71717a' }); K.raw(ctx, () => { ctx.fillStyle = '#fff'; for (let k = 0; k < 40; k++) ctx.fillRect((k * 173) % w, (k * 89) % (h * .6), 2, 2); ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.arc(w - 90, h * .3, 22, 0, TAU); ctx.fill(); }); }
      else if (sc === 'pisa') Q22.outdoor(ctx, w, h, h * .86);
      else K.bg(ctx, w, h, { benchY: h * .84 });
      const yT = Math.max(h * .17, 180), yB = h * .84 - 4, M = (yB - yT) / H, cx = (w + 64) / 2;
      const xs = sc === 'pisa' ? [cx + 30, cx + 90] : [cx - 70, cx + 70];
      if (sc === 'pisa') K.raw(ctx, () => { const tx = cx - 110, tw = 110; ctx.save(); ctx.translate(tx + tw / 2, yB); ctx.rotate(.07); for (let k = 0; k < 8; k++) { const y0 = -(k + 1) * (yB - yT + 20) / 8; ctx.fillStyle = k % 2 ? '#f5f5f4' : '#e7e5e4'; ctx.fillRect(-tw / 2, y0, tw, (yB - yT + 20) / 8); ctx.strokeStyle = '#a8a29e'; ctx.strokeRect(-tw / 2, y0, tw, (yB - yT + 20) / 8); for (let a = 0; a < 5; a++) { ctx.fillStyle = '#78716c'; rr(ctx, -tw / 2 + 8 + a * 21, y0 + 8, 10, (yB - yT) / 8 - 14, 5); ctx.fill(); } } ctx.restore(); ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(cx - 40, yT); ctx.lineTo(xs[1] + 20, yT); ctx.stroke(); ctx.setLineDash([]); });
      if (sc === 'tube') K.raw(ctx, () => { const tw = 230; ctx.fillStyle = 'rgba(186,230,253,.25)'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; rr(ctx, cx - tw / 2, yT - 30, tw, yB - yT + 34, 18); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.fillRect(cx - tw / 2 - 10, yT - 40, tw + 20, 12); ctx.fillRect(cx - tw / 2 - 10, yB + 2, tw + 20, 12);
        ctx.fillStyle = 'rgba(59,130,246,.55)'; const n = Math.round(70 * S.air); for (let k = 0; k < n; k++) { const t = S.t * .7 + k; ctx.beginPath(); ctx.arc(cx - tw / 2 + 12 + ((k * 53 + Math.sin(t) * 20) % (tw - 24) + tw) % (tw - 24), yT - 18 + ((k * 97 + Math.cos(t * 1.3) * 20) % (yB - yT + 10) + (yB - yT)) % (yB - yT + 10), 2.6, 0, TAU); ctx.fill(); }
        ctx.fillStyle = '#64748b'; ctx.fillRect(cx + tw / 2 + 10, yT - 36, 60, 8); rr(ctx, cx + tw / 2 + 66, yT - 60, 40, 56, 8); ctx.fill(); });
      if (sc === 'tube') Q22.T(ctx, S.air > .9 ? 'في الهواء' : S.air < .05 ? 'في الفراغ (بلا هواء)' : 'يُفرّغ الهواء… ' + Math.round(S.air * 100) + '%', cx - 115 - 60, yT + 30, { s: 13, w: 900, c: '#fff', bg: S.air < .05 ? '#7c3aed' : '#0284c7' });
      // height ruler
      if (sc !== 'tube') K.raw(ctx, () => { const rx = xs[1] + 60; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(rx, yT); ctx.lineTo(rx, yB); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.font = '700 10px ui-monospace'; ctx.textAlign = 'left'; ctx.direction = 'ltr'; const st = H > 10 ? 10 : H > 2 ? .5 : .25; for (let y = 0; y <= H + 1e-6; y += st) { const yy = yB - y * M; ctx.beginPath(); ctx.moveTo(rx, yy); ctx.lineTo(rx + 8, yy); ctx.stroke(); ctx.fillText(fmt(y, 3) + ' m', rx + 10, yy + 3); } });
      // hand holding (before release)
      if (!S.go && !S.tt) C2.hand(ctx, xs[0] - 50, yT - 26, 1, 1, { sleeve: '#0ea5e9', rot: .3 });
      O.forEach((o, i) => { const x = xs[i];
        if (p.strobe !== false) K.raw(ctx, () => { S.tr[i].forEach(y => { ctx.globalAlpha = .3; ctx.fillStyle = o.c === '#f8fafc' ? '#94a3b8' : o.c; ctx.beginPath(); ctx.arc(x, yT + y * M, 5, 0, TAU); ctx.fill(); }); ctx.globalAlpha = 1; });
        const y = yT + S.y[i] * M; D.body(ctx, o, x, y, S);
        const W = o.m * g, Fa = air * o.k * S.v[i] ** 2, sc2 = 60 / (o.m * g);
        if (p.frc !== false && !S.tf[i]) { Q22.F(ctx, x + 26, y, 0, 60, 'الوزن', '#2563eb', 4); if (Fa > W * .03) Q22.F(ctx, x - 26, y, 0, -clamp(Fa * sc2, 6, 60), 'مقاومة الهواء', '#dc2626', 4); }
        if (p.vel !== false && S.v[i] > .05 && !S.tf[i]) Q22.F(ctx, x, y + 20, 0, clamp(S.v[i] * (sc === 'pisa' ? 3 : 20), 8, 100), '', '#16a34a', 3.5);
        if (p.lab !== false) { Q22.T(ctx, o.n, x, yB + 22, { s: 12, w: 900, c: '#fff', bg: 'rgba(30,41,59,.85)' }); Q22.T(ctx, '⏱ ' + fmt(S.tf[i] || S.tt, 3) + ' s', x, yB + 46, { s: 13, w: 900, c: S.tf[i] ? '#fff' : '#0f172a', bg: S.tf[i] ? '#16a34a' : 'rgba(255,255,255,.9)', mono: 1 }); }
      });
      if (p.lab !== false) C2.lines(ctx, [{ t: 'الارتفاع: ' + fmt(H, 3) + ' m   g = ' + g + ' m/s²', c: '#0f172a', mono: 1 }, { t: air > .05 ? 'يوجد هواء: مقاومته تؤثر أكثر في الأجسام الخفيفة العريضة' : 'لا هواء: سقوط حر بفعل الجاذبية فقط', c: air > .05 ? '#dc2626' : '#7c3aed' }, { t: 'الزمن النظري للسقوط الحر = ' + fmt(Math.sqrt(2 * H / g), 3) + ' s', c: '#15803d' }], w - 16, 44, Math.min(360, w * .5), { title: SC[sc].n, bd: '#0f766e' });
      Q22.banner(ctx, w, 'السقوط الحر: سقوط الجسم بتأثير الجاذبية الأرضية فقط', '#0f766e', 20);
      const b = D.btn(S); C2.btn(ctx, b.x, b.y, b.w, b.h, S.go ? '… يسقط' : '⬇ أفلت', { col: '#0f766e', on: S.go }); if (sc === 'tube') { const b2 = D.btn2(S); C2.btn(ctx, b2.x, b2.y, b2.w, b2.h, S.air > .5 ? '🫧 فرّغ الهواء' : '💨 أدخل الهواء', { col: '#7c3aed', on: !!S.pump }); }
      C2.drawMsg(ctx, S, cx, h * .4); K.party(ctx, S);
    },
    body(ctx, o, x, y, S) { K.raw(ctx, () => {
      if (o.f) { const sw = S.go && !S.tf[0] ? Math.sin(S.tt * 7) * .5 : .2; ctx.save(); ctx.translate(x + Math.sin(S.tt * 4) * 8 * (S.go ? 1 : 0) * (S.air || 0), y); ctx.rotate(.9 + sw); ctx.strokeStyle = '#78716c'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.stroke(); ctx.fillStyle = '#e7e5e4'; ctx.beginPath(); ctx.moveTo(-22, 0); ctx.quadraticCurveTo(0, -14, 24, 0); ctx.quadraticCurveTo(0, 12, -22, 0); ctx.fill(); ctx.fillStyle = '#44403c'; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.quadraticCurveTo(-14, -6, -8, 0); ctx.quadraticCurveTo(-14, 6, -26, 0); ctx.fill(); ctx.restore(); return; }
      if (o.fl) { ctx.save(); ctx.translate(x + (S.go ? Math.sin(S.tt * 5) * 16 * (S.p.where === 'moon' ? 0 : 1) : 0), y); ctx.rotate(S.go && S.p.where !== 'moon' ? Math.sin(S.tt * 5) * .35 : 0); ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.2; ctx.fillRect(-32, -2, 64, 4); ctx.strokeRect(-32, -2, 64, 4); ctx.restore(); return; }
      if (o.cr) { ctx.fillStyle = '#f1f5f9'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.2; ctx.beginPath(); for (let k = 0; k < 12; k++) { const a = k * TAU / 12, r = 12 + (k % 3) * 2; ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 6, y - 4); ctx.lineTo(x + 4, y + 2); ctx.moveTo(x - 2, y + 6); ctx.lineTo(x + 6, y - 6); ctx.stroke(); return; }
      K.ball(ctx, x, y, 15, o.c); }); },
    btn(S) { return { x: 160, y: S.H * .55, w: 170, h: 40 }; },
    btn2(S) { return { x: 160, y: S.H * .55 + 52, w: 170, h: 40 }; },
    drags(S) { if (!S.W) return []; const L = [Q22.btnObj('drop', D.btn(S), S => D.drop(S), { hint: true, idle: 'أفلت ✋' })]; if (S.p.sc === 'tube') L.push(Q22.btnObj('pump', D.btn2(S), S => { S.pump = S.air > .5 ? 1 : -1; })); return L; },
    readings(S) { const O = SC[S.p.sc].O; return [rd('الزمن', fmt(S.tt, 3) + ' s'), rd('سرعة ' + O[0].n, fmt(S.v[0], 3) + ' m/s'), rd('سرعة ' + O[1].n, fmt(S.v[1], 3) + ' m/s'), rd('زمن وصول ' + O[0].n, S.tf[0] ? fmt(S.tf[0], 3) + ' s' : '—'), rd('زمن وصول ' + O[1].n, S.tf[1] ? fmt(S.tf[1], 3) + ' s' : '—')]; },
    record(S) { if (!S.ok) { Runner.toast('أفلت الجسمين وانتظر حتى يصلا إلى الأرض', 'info'); return null; } const O = SC[S.p.sc].O, [g, air] = D.gAir(S); return { e: SC[S.p.sc].n, H: D.H(S), air: air > .05 ? 'نعم' : 'لا', t1: O[0].n + ': ' + S.tf[0].toFixed(3), t2: O[1].n + ': ' + S.tf[1].toFixed(3) }; },
    cols: [['e', 'التجربة'], ['H', 'الارتفاع (m)'], ['air', 'هواء؟'], ['t1', 'الزمن 1 (s)'], ['t2', 'الزمن 2 (s)']],
    live: { title: 'السرعة مع الزمن للجسمين', data: S => ({ series: [{ pts: S.hv || [], color: '#d97706', name: SC[S.p.sc].O[0].n }, { pts: S.hv2 || [], color: '#2563eb', name: SC[S.p.sc].O[1].n }], opts: { xl: 't (s)', ymin: 0 } }) },
    explain(S) { const [g, air] = D.gAir(S), sc = S.p.sc;
      if (sc === 'balls') return Q22.ex('كرة الخشب وكرة الرصاص (متساويتان في الحجم) تصلان إلى الأرض معاً تقريباً، مع أن الرصاص أثقل بكثير.', 'قوة <b>الجاذبية الأرضية</b> تكسب الأجسام كلها <b>التعجيل نفسه</b> g = 9.8 m/s²، ومقاومة الهواء هنا صغيرة جداً. هذا هو <b>السقوط الحر</b>.', 'لو أسقطت قلماً وممحاة معاً من يدك لوصلا إلى الأرض معاً.');
      if (sc === 'pisa') return Q22.ex('كرتا غاليليو (1 kg و 10 kg) تسقطان من قمة برج بيزا وتصلان معاً تقريباً.', 'أثبت غاليليو أن السقوط الحر <b>لا يعتمد على الكتلة</b>؛ والفرق الصغير سببه مقاومة الهواء (ص 31).', 'كان الناس قبل غاليليو يظنون أن الجسم الأثقل يسقط أسرع!');
      if (air < .05) return Q22.ex(sc === 'tube' ? 'في الأنبوب المفرّغ تسقط الريشة والكرة معاً تماماً (الشكل 2).' : 'على القمر تسقط الورقة المسطحة والمضغوطة معاً.', 'لا يوجد هواء، فلا مقاومة للهواء: الجسمان يسقطان <b>سقوطاً حراً</b> بتأثير الجاذبية فقط وبالتعجيل نفسه.', 'في عام 2014 أُسقطت كرة وريشة في غرفة ضخمة مفرغة من الهواء فوصلتا معاً.');
      return Q22.ex(sc === 'tube' ? 'في الهواء تصل الكرة أولاً، والريشة تتمايل وتتأخر.' : 'الورقة المضغوطة تصل أولاً، والمسطحة تتمايل وتتأخر.', '<b>مقاومة الهواء</b> (السهم الأحمر) تؤثر في الجسم الخفيف العريض أكثر؛ جزيئات الهواء تصطدم به فتبطئه.', 'المظلة (الباراشوت) عريضة جداً لتزيد مقاومة الهواء فينزل المظلي ببطء.'); },
    quiz: [
      { q: 'ما سبب الاختلاف الظاهر في سرعة الأجسام عند سقوطها في الهواء؟', o: ['اختلاف كتلها', 'مقاومة الهواء', 'اختلاف ألوانها'], a: 1, why: 'مراجعة الدرس: الهواء يصطدم بالجسم ويؤثر في الخفيف أكثر.' },
      { q: 'السقوط الحر يحصل تحت تأثير ............ فقط:', o: ['الجاذبية الأرضية', 'مقاومة الهواء', 'رد الفعل'], a: 0, why: 'مراجعة الفصل س1: السقوط الحر بفعل الجاذبية الأرضية فقط.' },
      { q: 'إذا أسقطنا ورقة مضغوطة وأخرى مسطحة على سطح القمر في الوقت نفسه:', o: ['تصل المضغوطة أولاً', 'تصل المسطحة أولاً', 'تصلان معاً'], a: 2, why: 'التفكير الناقد: لا هواء على القمر فلا مقاومة للهواء.' }
    ]
  };
  M8.P[D.id] = D;
})();

/* =========================================================================================
   9) مركز الثقل (ص 29–30): المسطرة على الإصبع، الأجسام المنتظمة، الجسم غير المنتظم (التعليق)
   ========================================================================================= */
(() => {
  const POLY = [[0, -150], [95, -40], [70, -10], [120, 40], [60, 105], [-10, 40], [-55, 95], [-120, 70], [-130, -20], [-60, -60]]; // irregular plate (book fig. 5 like)
  const HOLES = [0, 3, 7, 8];
  const cent = (P) => { let A = 0, cx = 0, cy = 0; P.forEach((p, i) => { const q = P[(i + 1) % P.length], c = p[0] * q[1] - q[0] * p[1]; A += c; cx += (p[0] + q[0]) * c; cy += (p[1] + q[1]) * c; }); A /= 2; return [cx / (6 * A), cy / (6 * A)]; };
  const CG = cent(POLY);
  const SH = [['circle', 'قرص دائري'], ['tri', 'مثلث'], ['sq', 'مربع'], ['rect', 'مستطيل'], ['cyl', 'أسطوانة'], ['ring', 'حلقة']];
  const D = { id: 'g8_cog', ch: 22, sec: 'الدرس 2', page: 29, kind: 'نشاط',
    title: 'مركز الثقل: توازن المسطرة وتعيين مركز ثقل الأجسام',
    desc: 'حاول أن تجعل مسطرة تتزن أفقياً على رأس إصبعك، ثم اكتشف مركز ثقل الأجسام المنتظمة (منتصف أبعادها)، وعيّن مركز ثقل جسم غير منتظم بتعليقه من عدة نقاط واستعمال خيط الشاقول.',
    tags: 'مركز الثقل توازن مسطرة إصبع شاقول تعليق حلقة أجسام منتظمة غير منتظمة',
    tools: ['مسطرة', 'قطع نقدية', 'أشكال منتظمة من الورق المقوى', 'صفيحة غير منتظمة', 'خيط في نهايته ثقل (شاقول)'],
    steps: ['مشهد «المسطرة»: اسحب إصبعك تحت المسطرة واتركه. متى تتزن المسطرة أفقياً؟ (الشكل 3)', 'انقر طرف المسطرة لتضع قطعة نقود عليه: أين أصبحت نقطة الاتزان الآن؟', 'مشهد «الأجسام المنتظمة»: انقر كل شكل لترى خطوط التنصيف ومركز ثقله C (الشكل 4). لاحظ مركز ثقل الحلقة (الشكل 5)!', 'مشهد «الجسم غير المنتظم»: انقر ثقباً لتعلّق الصفيحة منه، ولاحظ خط الشاقول. علّقها من ثقب آخر.', 'نقطة تلاقي خطي الشاقول هي مركز ثقل الجسم. تحقق بوضع الإصبع تحتها.'],
    concl: ['توجد نقطة واحدة فقط تجعل المسطرة تتزن بوضع أفقي، وهي واقعة في منتصف المسطرة وتدعى مركز ثقل المسطرة.', 'مركز الثقل C: النقطة التي تمر بها محصلة قوى جذب الأرض لجميع أجزاء الجسم مهما تغير وضعه، أو النقطة التي يبدو كأن وزن الجسم متمركز فيها.', 'في الأجسام المنتظمة الشكل يقع مركز الثقل في منتصف أبعاد الجسم، ويمكن أن يقع خارج مادة الجسم كما في الحلقة.', 'لتعيين مركز ثقل جسم غير منتظم نعلّقه تعليقاً حراً من عدة نقاط ونرسم الخط الرأسي المار بنقطة التعليق؛ نقطة تلاقي الخطوط هي مركز الثقل.'],
    laws: ['g8_cog'],
    fact: ['البهلوان على الحبل يحمل عصا طويلة ليتحكم بموضع مركز ثقله فوق الحبل.', 'تُصنع الشاحنات والحافلات بحيث يكون مركز ثقلها منخفضاً لكي لا تنقلب بسهولة عند الانعطاف.'],
    controls: [SEL('sc', 'المثال', [['ruler', '📏 المسطرة على الإصبع'], ['shapes', '🔷 الأجسام المنتظمة'], ['irr', '🧩 الجسم غير المنتظم']], 'ruler', (v, S) => D.reset(S)),
      Q22.V(R('coins', 'قطع نقود على الطرف الأيسر', 0, 3, 0, 1, '', (v, S) => { S.th = 0; S.om = 0; S.fall = 0; }), s => s.p.sc === 'ruler'),
      TG('w', 'سهم الوزن عند مركز الثقل', true, null, 'force'), TG('guide', 'خطوط التنصيف / الشاقول', true, null, 'vector'), TG('cg', 'إظهار مركز الثقل C', true, null, 'dot'), TG('lab', 'البطاقات', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.f = .3; S.hold = 1; S.th = 0; S.om = 0; S.fall = 0; S.fy = 0; S.rev = {}; S.nrev = 0; S.hole = -1; S.lines = []; S.phi = 0; S.phv = 0; S.tested = 0; },
    // ruler model: length 30 cm, mass 20 g; coin 6 g at x = 1 cm
    cgx(S) { const m = 20, mc = 6 * S.p.coins; return (m * 15 + mc * 1) / (m + mc); },
    update(S, dt) { dt = Math.min(dt, .03); const p = S.p;
      if (p.sc === 'ruler') { if (S.drag || S.hold) { S.th *= .8; S.om = 0; S.fall = 0; S.fy = 0; return; }
        const d = D.cgx(S) - S.f * 30; // cm; + => CG right of finger
        if (!S.fall) { S.om += (Math.abs(d) < .35 ? -S.th * 30 - S.om * 3 : d * 2.2 * Math.cos(S.th)) * dt; S.th += S.om * dt; if (Math.abs(S.th) > .55) S.fall = 1; }
        else { S.fy += dt * 500 * S.fy / 60 + dt * 200; S.th += S.om * dt; if (S.fy > S.H * .3) S.fy = S.H * .3; }
        if (Math.abs(d) < .35 && !S.fall && !S.ok1) { S.ok1 = 1; C2.msg(S, 'اتزنت المسطرة! الإصبع تحت مركز الثقل', 3); K.cheer(S, S.W / 2, S.H * .4); } if (Math.abs(d) >= .35) S.ok1 = 0; }
      if (p.sc === 'irr' && S.hole >= 0) { const tgt = D.phiT(S.hole); let e = S.phi - tgt; e = Math.atan2(Math.sin(e), Math.cos(e)); S.phv += (-14 * Math.sin(e) - 1.6 * S.phv) * dt; S.phi += S.phv * dt; }
    },
    phiT(i) { const h = POLY[HOLES[i]]; const v = [CG[0] - h[0], CG[1] - h[1]]; return Math.PI / 2 - Math.atan2(v[1], v[0]); }, // rotation making CG straight below the hole
    draw(ctx, w, h, S) { Q22.vis(S); const p = S.p; K.bg(ctx, w, h, { benchY: h * .84 }); ({ ruler: D.dRuler, shapes: D.dShapes, irr: D.dIrr })[p.sc](ctx, w, h, S); C2.drawMsg(ctx, S, (w + 64) / 2, h * .3); K.party(ctx, S); },
    rg(S) { const w = S.W, h = S.H, L = Math.min(w - 200, 560), x0 = (w + 64) / 2 - L / 2, y = h * .52; return { L, x0, y, fx: x0 + S.f * L }; },
    dRuler(ctx, w, h, S) { const p = S.p, g = D.rg(S), fx = g.fx;
      // finger from below
      K.raw(ctx, () => { // hand from below: sleeve, forearm, fist and the index finger pointing up (book fig. 3)
        const yb = h * .84, sk = ctx.createLinearGradient(fx - 22, 0, fx + 22, 0); sk.addColorStop(0, '#e0a676'); sk.addColorStop(.5, '#f6cfa6'); sk.addColorStop(1, '#d99a6c');
        ctx.fillStyle = '#0369a1'; rr(ctx, fx - 27, yb - 70, 54, 70, 8); ctx.fill(); ctx.fillStyle = '#0284c7'; rr(ctx, fx - 29, yb - 76, 58, 14, 6); ctx.fill();
        ctx.fillStyle = sk; ctx.strokeStyle = '#a5643a'; ctx.lineWidth = 1.3; rr(ctx, fx - 19, g.y + 70, 38, yb - 74 - g.y - 66, 12); ctx.fill(); ctx.stroke();
        rr(ctx, fx - 25, g.y + 40, 48, 46, 15); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = 'rgba(165,100,58,.6)'; [g.y + 52, g.y + 63, g.y + 74].forEach(y => { ctx.beginPath(); ctx.moveTo(fx - 22, y); ctx.quadraticCurveTo(fx - 6, y + 3, fx + 8, y); ctx.stroke(); });
        ctx.fillStyle = sk; ctx.strokeStyle = '#a5643a'; rr(ctx, fx - 7, g.y + 6, 14, 44, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#fde7d4'; ctx.beginPath(); ctx.ellipse(fx, g.y + 11, 4.5, 3.5, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = sk; ctx.beginPath(); ctx.ellipse(fx + 22, g.y + 58, 8, 15, -.35, 0, TAU); ctx.fill(); ctx.stroke(); });
      const by = g.y + S.fy; K.raw(ctx, () => { ctx.save(); ctx.translate(fx, by); ctx.rotate(S.th); ctx.translate(-fx, -by);
        ctx.fillStyle = '#86efac'; ctx.strokeStyle = '#15803d'; ctx.lineWidth = 1.5; rr(ctx, g.x0, by - 4, g.L, 18, 3); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#14532d'; ctx.font = '700 9px ui-monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr';
        for (let c = 0; c <= 30; c++) { const x = g.x0 + c * g.L / 30; ctx.fillRect(x, by - 4, 1, c % 5 ? 4 : 8); if (c % 5 === 0) ctx.fillText(c, x, by + 12); }
        for (let k = 0; k < p.coins; k++) Q22.coin(ctx, g.x0 + g.L / 30, by - 4 - k * 6, 13, 6);
        const cx = g.x0 + D.cgx(S) / 30 * g.L; if (p.cg !== false) { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(cx, by + 5, 5, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '900 8px sans-serif'; ctx.fillText('C', cx, by + 8); }
        if (p.w !== false) G.arrow(ctx, cx, by + 14, cx, by + 80, '#2563eb', 4, 14);
        ctx.restore(); });
      if (p.lab !== false) C2.lines(ctx, [{ t: 'مركز ثقل المسطرة عند ' + fmt(D.cgx(S), 3) + ' cm', c: '#dc2626' }, { t: 'الإصبع عند ' + fmt(S.f * 30, 3) + ' cm', c: '#c2410c' }, { t: S.hold ? 'يدك الأخرى تمسك المسطرة — حرّك إصبعك ثم اتركه' : S.fall ? 'سقطت! الإصبع ليس تحت مركز الثقل' : Math.abs(D.cgx(S) - S.f * 30) < .35 ? '✔ متزنة: الإصبع تحت مركز الثقل تماماً' : 'تميل نحو جهة مركز الثقل…', c: S.fall ? '#dc2626' : '#15803d' }], w - 16, 44, Math.min(360, w * .5), { title: 'المسطرة على رأس الإصبع (الشكل 3)', bd: '#16a34a' });
      Q22.banner(ctx, w, 'اسحب إصبعك تحت المسطرة لتجعلها تتزن أفقياً — وانقر طرفها لتضع قطعة نقود', '#15803d', 20);
    },
    sg(S) { const w = S.W, h = S.H, cols = w > 700 ? 3 : 2, x0 = 80, cw = (w - x0 - 20) / cols, ch = (h * .78 - 70) / Math.ceil(6 / cols); return SH.map((s, i) => ({ k: s[0], n: s[1], x: x0 + (i % cols + .5) * cw, y: 70 + (Math.floor(i / cols) + .5) * ch, r: Math.min(cw, ch) * .32 })); },
    dShapes(ctx, w, h, S) { const p = S.p;
      D.sg(S).forEach(o => { const on = S.rev[o.k], x = o.x, y = o.y, r = o.r;
        K.raw(ctx, () => { ctx.lineWidth = 2; ctx.strokeStyle = '#334155';
          const col = { circle: '#fde047', tri: '#f0abfc', sq: '#fca5a5', rect: '#93c5fd', cyl: '#86efac', ring: '#ef4444' }[o.k]; ctx.fillStyle = col;
          if (o.k === 'circle') { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); }
          if (o.k === 'tri') { ctx.beginPath(); ctx.moveTo(x, y - r * 1.1); ctx.lineTo(x + r * 1.05, y + r * .75); ctx.lineTo(x - r * 1.05, y + r * .75); ctx.closePath(); ctx.fill(); ctx.stroke(); }
          if (o.k === 'sq') { ctx.fillRect(x - r * .85, y - r * .85, r * 1.7, r * 1.7); ctx.strokeRect(x - r * .85, y - r * .85, r * 1.7, r * 1.7); }
          if (o.k === 'rect') { ctx.fillRect(x - r * 1.3, y - r * .55, r * 2.6, r * 1.1); ctx.strokeRect(x - r * 1.3, y - r * .55, r * 2.6, r * 1.1); }
          if (o.k === 'cyl') { ctx.fillRect(x - r, y - r * .55, r * 2, r * 1.1); ctx.strokeRect(x - r, y - r * .55, r * 2, r * 1.1); ctx.beginPath(); ctx.ellipse(x - r, y, r * .25, r * .55, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + r, y, r * .25, r * .55, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke(); }
          if (o.k === 'ring') { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = r * .22; ctx.beginPath(); ctx.arc(x, y, r * .9, 0, TAU); ctx.stroke(); }
          if (on && p.guide !== false) { ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.4; ctx.setLineDash([5, 4]); ctx.beginPath();
            if (o.k === 'circle' || o.k === 'ring') { ctx.moveTo(x - r, y); ctx.lineTo(x + r, y); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); }
            if (o.k === 'tri') { const A = [x, y - r * 1.1], B = [x + r * 1.05, y + r * .75], C = [x - r * 1.05, y + r * .75]; [[A, B, C], [B, C, A], [C, A, B]].forEach(([P, Q, R2]) => { ctx.moveTo(P[0], P[1]); ctx.lineTo((Q[0] + R2[0]) / 2, (Q[1] + R2[1]) / 2); }); }
            if (o.k === 'sq') { ctx.moveTo(x - r * .85, y - r * .85); ctx.lineTo(x + r * .85, y + r * .85); ctx.moveTo(x + r * .85, y - r * .85); ctx.lineTo(x - r * .85, y + r * .85); }
            if (o.k === 'rect') { ctx.moveTo(x - r * 1.3, y - r * .55); ctx.lineTo(x + r * 1.3, y + r * .55); ctx.moveTo(x + r * 1.3, y - r * .55); ctx.lineTo(x - r * 1.3, y + r * .55); }
            if (o.k === 'cyl') { ctx.moveTo(x - r * 1.4, y); ctx.lineTo(x + r * 1.4, y); ctx.moveTo(x, y - r * .8); ctx.lineTo(x, y + r * .8); }
            ctx.stroke(); ctx.setLineDash([]); }
          const cy = o.k === 'tri' ? y - r * 1.1 / 3 + r * .75 * 2 / 3 - r * .25 * 0 : y; const ccy = o.k === 'tri' ? (y - r * 1.1 + 2 * (y + r * .75)) / 3 : y;
          if (on && p.cg !== false) { ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.arc(x, ccy, 6, 0, TAU); ctx.fill(); }
          if (on && p.w !== false) G.arrow(ctx, x, ccy + 6, x, ccy + r * .8, '#2563eb', 3, 10); });
        const ccy = o.k === 'tri' ? (y - r * 1.1 + 2 * (y + r * .75)) / 3 : y;
        if (on && p.cg !== false) Q22.T(ctx, 'C', x + 13, ccy - 12, { s: 13, w: 900, c: '#1d4ed8' });
        Q22.T(ctx, o.n, x, y + r * 1.25 + 10, { s: 12.5, w: 800, c: '#fff', bg: on ? '#1d4ed8' : 'rgba(30,41,59,.8)' });
        if (on && o.k === 'ring' && p.lab !== false) Q22.T(ctx, 'C لا يقع على مادتها!', x, y - r * 1.25, { s: 12, w: 900, c: '#fff', bg: '#dc2626' }); });
      Q22.banner(ctx, w, 'انقر كل شكل منتظم لترى مركز ثقله C (منتصف أبعاده) — ' + S.nrev + '/6', '#1d4ed8', 20);
    },
    ig(S) { const w = S.W, h = S.H; return { px: (w + 64) / 2 - 40, py: h * .2, s: Math.min(1.25, h / 560) }; },
    toWorld(S, pt) { const g = D.ig(S); if (S.hole < 0) { return [g.px + pt[0] * g.s, g.py + 190 * g.s + pt[1] * g.s]; } const hp = POLY[HOLES[S.hole]], c = Math.cos(S.phi), s = Math.sin(S.phi), dx = (pt[0] - hp[0]) * g.s, dy = (pt[1] - hp[1]) * g.s; return [g.px + dx * c - dy * s, g.py + dx * s + dy * c]; },
    dIrr(ctx, w, h, S) { const p = S.p, g = D.ig(S);
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.px - 70, g.py - 46, 140, 10); ctx.fillRect(g.px - 4, g.py - 36, 8, 26);
        const P = POLY.map(q => D.toWorld(S, q)); ctx.fillStyle = 'rgba(96,165,250,.85)'; ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 2; ctx.beginPath(); P.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill(); ctx.stroke();
        // stored plumb lines (in body coordinates)
        if (p.guide !== false) S.lines.forEach(i => { const a = POLY[HOLES[i]], d = [CG[0] - a[0], CG[1] - a[1]], L = Math.hypot(...d); const e = [a[0] + d[0] / L * 320, a[1] + d[1] / L * 320]; const A = D.toWorld(S, a), B = D.toWorld(S, e); ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); });
        HOLES.forEach((hi, i) => { const q = D.toWorld(S, POLY[hi]); const qi = [q[0] + (POLY[hi][0] > 0 ? -1 : 1) * 0, q[1]]; ctx.fillStyle = '#fff'; ctx.strokeStyle = S.hole === i ? '#dc2626' : '#ef4444'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(qi[0], qi[1], 7, 0, TAU); ctx.fill(); ctx.stroke(); });
        if (S.hole >= 0 && p.guide !== false) { ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(g.px, g.py); ctx.lineTo(g.px, g.py + 330 * g.s); ctx.stroke(); ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(g.px - 8, g.py + 330 * g.s); ctx.lineTo(g.px + 8, g.py + 330 * g.s); ctx.lineTo(g.px, g.py + 350 * g.s); ctx.closePath(); ctx.fill(); }
        const C = D.toWorld(S, CG); const found = new Set(S.lines).size >= 2;
        if (found && p.cg !== false) { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(C[0], C[1], 7, 0, TAU); ctx.fill(); }
        if (found && p.w !== false) G.arrow(ctx, C[0], C[1] + 8, C[0], C[1] + 70, '#dc2626', 4, 12); });
      const found = new Set(S.lines).size >= 2; if (found && p.cg !== false) { const C = D.toWorld(S, CG); Q22.T(ctx, 'مركز الثقل C', C[0] + 52, C[1] - 12, { s: 12, w: 900, c: '#fff', bg: '#0f172a' }); }
      if (p.lab !== false) C2.lines(ctx, [{ t: 'عدد خطوط الشاقول المرسومة: ' + new Set(S.lines).size, c: '#1d4ed8' }, { t: found ? '✔ نقطة تلاقي الخطوط = مركز الثقل' : 'انقر ثقباً (دائرة حمراء) لتعلّق الصفيحة منه', c: found ? '#15803d' : '#475569' }], w - 16, 44, Math.min(340, w * .48), { title: 'تعيين مركز ثقل جسم غير منتظم', bd: '#1d4ed8' });
      Q22.banner(ctx, w, 'علّق الصفيحة من ثقوب مختلفة وارسم خط الشاقول في كل مرة', '#1e40af', 20);
    },
    drags(S) { if (!S.W) return []; const p = S.p;
      if (p.sc === 'ruler') { const g = D.rg(S); return [{ id: 'finger', x: g.fx, y: g.y + 70, w: 50, h: 110, axis: 'x', keep: true, tip: 'اسحب إصبعك تحت المسطرة واتركه', idle: 'حرّك إصبعك ✋', down: S => { S.drag = 1; S.hold = 0; S.fall = 0; S.fy = 0; S.th = 0; S.om = 0; }, drag: (S, d) => { S.f = clamp((d.ox + d.x - d.sx - g.x0) / g.L, .03, .97); }, up: S => { S.drag = 0; S.tested++; } },
        { id: 'end', x: g.x0 + 20, y: g.y - 10, r: 26, hint: false, tip: 'انقر لإضافة قطعة نقود على الطرف', click: S => { setParam(S, 'coins', (S.p.coins + 1) % 4); S.th = 0; S.om = 0; S.fall = 0; S.fy = 0; } }]; }
      if (p.sc === 'shapes') return D.sg(S).map((o, i) => ({ id: 's' + i, x: o.x, y: o.y, r: o.r * 1.1, hint: i === 0, tip: 'انقر لإظهار مركز الثقل', click: S => { if (!S.rev[o.k]) { S.rev[o.k] = 1; S.nrev++; if (S.nrev === 6) K.cheer(S, S.W / 2, S.H / 2); } } }));
      return HOLES.map((hi, i) => { const q = D.toWorld(S, POLY[hi]); return { id: 'h' + i, x: q[0], y: q[1], r: 18, hint: i === 1, idle: 'علّقها من هنا', tip: 'انقر لتعليق الصفيحة من هذا الثقب', click: S => { const C0 = D.toWorld(S, POLY[hi]); S.hole = i; S.phi = D.phiT(i) + .6; S.phv = 0; if (!S.lines.includes(i)) S.lines.push(i); if (new Set(S.lines).size === 2) { C2.msg(S, 'تلاقى الخطان في مركز الثقل!', 3); K.cheer(S, S.W / 2, S.H / 2); } } }; }); },
    readings(S) { const p = S.p; if (p.sc === 'ruler') return [rd('مركز الثقل', fmt(D.cgx(S), 3) + ' cm'), rd('موضع الإصبع', fmt(S.f * 30, 3) + ' cm'), rd('الحالة', S.fall ? 'سقطت' : Math.abs(D.cgx(S) - S.f * 30) < .35 ? 'متزنة' : 'تميل')];
      if (p.sc === 'shapes') return [rd('الأشكال المكتشفة', S.nrev + ' / 6')]; return [rd('خطوط الشاقول', new Set(S.lines).size), rd('التعليق من', S.hole >= 0 ? 'الثقب ' + (S.hole + 1) : '—')]; },
    record(S) { if (S.p.sc !== 'ruler') { Runner.toast('الجدول لمشهد المسطرة', 'info'); return null; } return { n: S.p.coins, c: +D.cgx(S).toFixed(2), f: +(S.f * 30).toFixed(2), st: S.fall ? 'سقطت' : Math.abs(D.cgx(S) - S.f * 30) < .35 ? 'متزنة' : 'تميل' }; },
    cols: [['n', 'عدد قطع النقود'], ['c', 'مركز الثقل (cm)'], ['f', 'الإصبع (cm)'], ['st', 'الحالة']],
    explain(S) { const p = S.p;
      if (p.sc === 'ruler') return Q22.ex(Math.abs(D.cgx(S) - S.f * 30) < .35 && !S.hold ? 'المسطرة متزنة أفقياً على رأس إصبعك.' : 'المسطرة تميل نحو الجهة التي فيها مركز الثقل (النقطة الحمراء C) ثم تسقط.', 'المسطرة مكوّنة من أجزاء صغيرة كثيرة، لكل جزء وزن؛ ومحصلة هذه الأوزان تؤثر في نقطة واحدة هي <b>مركز الثقل</b>. إذا كان الإصبع تحتها تماماً تتزن المسطرة. قطعة النقود تنقل مركز الثقل نحوها.', 'النادل يحمل الصينية من منتصفها حتى لا تميل.');
      if (p.sc === 'shapes') return Q22.ex('عند النقر على الشكل تظهر خطوط التنصيف، ونقطة تلاقيها هي مركز الثقل C (الشكل 4).', 'في الأجسام <b>المنتظمة</b> يقع مركز الثقل في <b>منتصف أبعادها</b>. وفي الحلقة يقع في مركزها، أي <b>خارج مادتها</b> (الشكل 5).', 'إطار الدراجة (العجلة) مركز ثقله في وسطه حيث لا توجد مادة.');
      return Q22.ex('الصفيحة المعلقة تتأرجح ثم تستقر، وخط الشاقول يمر بنقطة التعليق.', 'الجسم المعلق تعليقاً حراً يستقر بحيث يكون <b>مركز ثقله تحت نقطة التعليق تماماً</b> على الخط الرأسي؛ لذلك تتلاقى خطوط الشاقول في مركز الثقل (الشكل 5 ص 30).', 'تُصنع الحافلات بحيث يكون مركز ثقلها منخفضاً فلا تنقلب بسهولة.'); },
    quiz: [
      { q: 'مركز ثقل الحلقة يقع:', o: ['على مادتها', 'في مركزها خارج مادتها', 'عند أعلى نقطة فيها'], a: 1, why: 'الشكل (5): مركز ثقل الحلقة C لا يقع على مادتها.' },
      { q: 'يقع مركز ثقل المسطرة المنتظمة:', o: ['في منتصفها', 'عند أحد طرفيها', 'في أي نقطة'], a: 0, why: 'ص 29: النقطة الوحيدة التي تتزن عندها المسطرة في منتصفها.' },
      { q: 'لتعيين مركز ثقل جسم غير منتظم الشكل عملياً:', o: ['نقيس طوله ونقسمه على 2', 'نعلّقه من عدة نقاط ونرسم الخط الرأسي في كل مرة', 'نزن الجسم بالميزان النابضي'], a: 1, why: 'ص 30: نقطة تلاقي الخطوط هي مركز الثقل.' }
    ]
  };
  M8.P[D.id] = D;
})();

/* =========================================================================================
   10) الفيزياء والتكنولوجيا (ص 31): انعدام الوزن — المصعد الساقط، الطائرة، المركبة الفضائية
   ========================================================================================= */
(() => {
  const D = { id: 'g8_weightless', ch: 22, sec: 'الفيزياء والتكنولوجيا', page: 31, kind: 'تطبيق',
    title: 'الفيزياء والتكنولوجيا: انعدام الوزن',
    desc: 'انعدام الوزن في المركبات الفضائية ليس ناتجاً عن انعدام الجاذبية بل عن مرور الجسم بحالة سقوط حر مستمر. جرّبه في مصعد يسقط سقوطاً حراً، وفي طائرة انعدام الجاذبية، وفي «مدفع نيوتن» حول الأرض.',
    tags: 'انعدام الوزن سقوط حر مصعد طائرة رواد فضاء مدار مركبة فضائية',
    tools: ['مصعد وميزان', 'طائرة تدريب رواد الفضاء', 'مركبة فضائية'],
    steps: ['مشهد «المصعد»: الشخص يقف على ميزان داخل المصعد. اضغط «⬆ صعود» ثم «⬇ نزول» ولاحظ قراءة الميزان.', 'اضغط «✂ اقطع الحبل»: يسقط المصعد سقوطاً حراً. ماذا تصبح قراءة الميزان؟ ماذا يحدث للكرة والكوب؟', 'مشهد «الطائرة»: شاهد الطائرة تصعد بزاوية 45° ثم تتبع مساراً منحنياً: يطفو الركاب نحو 25 ثانية.', 'مشهد «المركبة حول الأرض»: زِد سرعة الإطلاق حتى تدور المركبة حول الأرض: إنها تسقط باستمرار ولا تصل إلى الأرض!'],
    concl: ['انعدام الوزن في المركبات الفضائية التي تدور حول الأرض ليس ناتجاً عن انعدام الجاذبية، بل ناتج عن مرور الجسم بحالة سقوط حر مستمر نحو الأرض.', 'في السقوط الحر يسقط الجسم والميزان الذي تحته معاً بالتعجيل نفسه، فلا يضغط الجسم على الميزان وتصبح قراءته صفراً.', 'تُستعمل الطائرات في مناورة سريعة (صعود بزاوية 45° ثم سقوط حر) لتدريب رواد الفضاء على انعدام الوزن مدة لا تزيد على 25 ثانية.'],
    laws: ['g8_ff', 'g8_w'],
    fact: ['في المحطة الفضائية الدولية تبلغ الجاذبية نحو 90% من قيمتها على سطح الأرض، ومع ذلك يطفو الرواد لأنهم في سقوط حر مستمر!', 'يكرر قائد طائرة انعدام الجاذبية المناورة مرات عديدة في الرحلة الواحدة.'],
    controls: [SEL('sc', 'المثال', [['elev', '🛗 المصعد والميزان'], ['plane', '✈️ طائرة انعدام الوزن'], ['orbit', '🛰️ المركبة حول الأرض']], 'elev', (v, S) => D.reset(S)),
      Q22.V(R('v0', 'سرعة إطلاق المركبة', 3, 9, 5, .5, 'km/s', (v, S) => { S.ox = null; }), s => s.p.sc === 'orbit'),
      TG('frc', 'أسهم القوى (الوزن وقوة الميزان)', true, null, 'force'), TG('vel', 'سهم التعجيل/السرعة', true, null, 'velocity'), Q22.V(TG('path', 'المسار', true, null, 'dot'), s => s.p.sc !== 'elev'), TG('lab', 'البطاقات', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.ey = .5; S.ev = 0; S.ea = 0; S.mode = 0; S.cut = 0; S.fl = 0; S.pt = 0; S.ox = null; S.otr = []; S.lnd = 0; S.hN = []; },
    update(S, dt) { dt = Math.min(dt, .03); const p = S.p;
      if (p.sc === 'elev') { let a = 0;
        if (S.cut) { a = -9.8; if (S.ey <= .02) { S.ey = .02; S.ev = 0; S.cut = 0; S.mode = 0; C2.msg(S, 'فرامل الطوارئ أوقفت المصعد بأمان', 2.5); } }
        else if (S.mode === 1) { a = S.ev < 2 ? 2 : 0; if (S.ey > .9) { S.mode = 0; } } else if (S.mode === -1) { a = S.ev > -2 ? -2 : 0; if (S.ey < .1) S.mode = 0; }
        else { a = clamp(-S.ev * 3, -3, 3); }
        S.ea = a; S.ev += a * dt; S.ey = clamp(S.ey + S.ev * dt * .08, .02, .95); if (S.ey >= .95) S.ev = Math.min(0, S.ev);
        S.fl = S.cut ? Math.min(1, S.fl + dt * 3) : Math.max(0, S.fl - dt * 3); hist(S, 'hN', 50 * (9.8 + S.ea), 300); }
      if (p.sc === 'plane') { S.pt = (S.pt + dt) % 16; }
      if (p.sc === 'orbit') { if (!S.ox) { S.ox = [0, -1.12]; S.ov = [p.v0 / 7.9 / Math.sqrt(1.12), 0]; S.otr = []; S.lnd = 0; }
        if (!S.lnd) for (let k = 0; k < 6; k++) { const d = dt / 6 * 1.6, r = Math.hypot(...S.ox), a = 1 / (r * r); S.ov[0] -= a * S.ox[0] / r * d; S.ov[1] -= a * S.ox[1] / r * d; S.ox[0] += S.ov[0] * d; S.ox[1] += S.ov[1] * d; if (Math.hypot(...S.ox) < 1) { S.lnd = 1; break; } }
        S.otr.push(S.ox.slice()); if (S.otr.length > 600) S.otr.shift(); } },
    plane(S) { const t = S.pt; // phases: 0-3 level, 3-5 climb 45°, 5-11 parabola (free fall), 11-13 dive/pull-out, 13-16 level
      const ph = t < 3 ? 0 : t < 5 ? 1 : t < 11 ? 2 : t < 13 ? 3 : 0; return { ph, ff: ph === 2 }; },
    draw(ctx, w, h, S) { Q22.vis(S); const p = S.p; ({ elev: D.dElev, plane: D.dPlane, orbit: D.dOrbit })[p.sc](ctx, w, h, S); C2.drawMsg(ctx, S, (w + 64) / 2, h * .3); },
    dElev(ctx, w, h, S) { const p = S.p; K.bg(ctx, w, h, { bench: false, top: '#e2e8f0', bottom: '#f1f5f9' });
      const sx = 100, sw = 200, top = 70, bot = h - 40, eh = Math.min(300, (bot - top) * .5), ey = bot - eh - (bot - top - eh) * S.ey;
      K.raw(ctx, () => { ctx.fillStyle = '#cbd5e1'; ctx.fillRect(sx - 10, top, sw + 20, bot - top); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.strokeRect(sx - 10, top, sw + 20, bot - top);
        if (!S.cut) { ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx + sw / 2, top); ctx.lineTo(sx + sw / 2, ey); ctx.stroke(); } else { ctx.strokeStyle = '#334155'; ctx.beginPath(); ctx.moveTo(sx + sw / 2, top); ctx.lineTo(sx + sw / 2, top + 40); ctx.moveTo(sx + sw / 2, ey - 30); ctx.lineTo(sx + sw / 2, ey); ctx.stroke(); }
        ctx.fillStyle = '#fef3c7'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 3; rr(ctx, sx, ey, sw, eh, 6); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#334155'; rr(ctx, sx + 50, ey + eh - 18, 80, 14, 4); ctx.fill(); }); // scale
      const N = Math.max(0, 50 * (9.8 + S.ea)), fl = S.fl;
      // person on scale (floats when fl>0)
      const px = sx + 90, py = ey + eh - 18 - fl * 40; Q22.kidR(ctx, px, py, 1.6, '#16a34a', 1, px + 30 + fl * 20, py - 90 - fl * 50, 0);
      K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; rr(ctx, sx + 70, ey + eh - 16, 40, 10, 2); ctx.fill(); ctx.fillStyle = '#a3e635'; ctx.font = '800 9px ui-monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; ctx.fillText(Math.round(N) + ' N', sx + 90, ey + eh - 8); });
      K.ball(ctx, sx + 165, ey + eh - 12 - fl * 90, 10, '#ef4444'); Q22.glass(ctx, sx + 30, ey + eh - 4 - fl * 120, 22, 30, { water: .5 });
      if (p.frc !== false) { Q22.F(ctx, px - 40, py - 60, 0, 70, 'الوزن 490 N', '#2563eb', 4); if (N > 5) Q22.F(ctx, px + 46, ey + eh - 20, 0, -clamp(N / 7, 6, 120), 'قوة الميزان ' + Math.round(N) + ' N', '#dc2626', 4); }
      if (p.vel !== false && Math.abs(S.ea) > .1) Q22.F(ctx, sx + sw + 50, ey + eh / 2, 0, -S.ea * 9, 'a = ' + fmt(S.ea, 2) + ' m/s²', '#16a34a', 4);
      // big scale display
      K.raw(ctx, () => { const dx = sx + sw + 110, dy = 120; ctx.fillStyle = '#0f172a'; rr(ctx, dx, dy, 170, 60, 10); ctx.fill(); ctx.fillStyle = N < 5 ? '#f87171' : '#a3e635'; ctx.font = '800 26px ui-monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; ctx.fillText(Math.round(N) + ' N', dx + 85, dy + 40); });
      Q22.T(ctx, 'قراءة الميزان (كتلة الشخص 50 kg)', sx + sw + 195, 102, { s: 12, w: 800, c: '#0f172a' });
      if (p.lab !== false) C2.lines(ctx, [{ t: S.cut ? 'سقوط حر: الشخص والميزان يسقطان معاً ← القراءة صفر' : S.ea > .1 ? 'تعجيل للأعلى: القراءة أكبر من الوزن' : S.ea < -.1 ? 'تعجيل للأسفل: القراءة أقل من الوزن' : 'سكون أو سرعة ثابتة: القراءة = الوزن', c: S.cut ? '#dc2626' : '#0f172a' }, { t: 'الجاذبية لم تنعدم! الوزن الحقيقي ما زال 490 N', c: '#7c3aed' }], w - 16, 205, Math.min(330, w - sx - sw - 40), { title: 'انعدام الوزن', bd: '#dc2626' });
      Q22.banner(ctx, w, 'انعدام الوزن ناتج عن السقوط الحر وليس عن انعدام الجاذبية', '#b91c1c', 20);
      D.btnRow(ctx, S, [['⬆ صعود', '#16a34a', S.mode === 1], ['⬇ نزول', '#2563eb', S.mode === -1], ['✂ اقطع الحبل', '#dc2626', S.cut]]);
    },
    bts(S, n) { const w = S.W, x = w - 100; return Array.from({ length: n }, (_, i) => ({ x, y: S.H * .52 + i * 52, w: 160, h: 40 })); },
    btnRow(ctx, S, L) { D.bts(S, L.length).forEach((b, i) => C2.btn(ctx, b.x, b.y, b.w, b.h, L[i][0], { col: L[i][1], on: !!L[i][2] })); },
    dPlane(ctx, w, h, S) { const p = S.p; Q22.outdoor(ctx, w, h, h * .9, { top: '#38bdf8', bot: '#e0f2fe' }); const P = D.plane(S), t = S.pt;
      // flight path (screen): x maps time, y altitude
      const X = tt => 90 + (w - 140) * tt / 16, alt = tt => tt < 3 ? 0 : tt < 5 ? (tt - 3) * .5 : tt < 11 ? 1 + 1.5 * ((tt - 5) * (11 - tt)) / 9 - 0 * 0 + 0 : tt < 13 ? 1 - (tt - 11) * .5 : 0, Y = tt => h * .6 - alt(tt) * h * .15;
      if (p.path !== false) K.raw(ctx, () => { ctx.lineWidth = 4; for (let k = 0; k < 160; k++) { const a = k / 10, b = (k + 1) / 10; ctx.strokeStyle = a >= 5 && a < 11 ? '#a855f7' : '#94a3b8'; ctx.beginPath(); ctx.moveTo(X(a), Y(a)); ctx.lineTo(X(b), Y(b)); ctx.stroke(); } });
      Q22.T(ctx, 'صعود بزاوية 45°', X(4), Y(4) + 30, { s: 11.5, w: 800, c: '#fff', bg: '#475569' }); Q22.T(ctx, 'سقوط حر ≈ 25 s: انعدام الوزن', X(8), Y(8) - 30, { s: 12, w: 900, c: '#fff', bg: '#7c3aed' });
      const ang = Math.atan2(Y(t + .05) - Y(t), X(t + .05) - X(t)); const x = X(t), y = Y(t);
      K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; rr(ctx, -40, -9, 80, 18, 9); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(-22, 26); ctx.lineTo(-12, 26); ctx.lineTo(10, 0); ctx.fill(); ctx.beginPath(); ctx.moveTo(-34, -6); ctx.lineTo(-44, -22); ctx.lineTo(-36, -22); ctx.lineTo(-24, -6); ctx.fill(); ctx.restore(); });
      // cabin inset
      const cx0 = (w + 64) / 2 - 170, cy0 = h * .66, cw = 340, chh = h * .2; const ff = P.ff;
      K.raw(ctx, () => { ctx.fillStyle = '#f1f5f9'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; rr(ctx, cx0, cy0, cw, chh, 30); ctx.fill(); ctx.stroke(); });
      const fl = ff ? (.5 + .5 * Math.sin(S.t * 1.3)) : 0; [0, 1, 2].forEach(i => { const bx = cx0 + 70 + i * 100, by = cy0 + chh - 10 - (ff ? chh * .3 + fl * 20 + i * 8 : 0); Q22.kidR(ctx, bx, by, .85, ['#2563eb', '#ea580c', '#16a34a'][i], i % 2 ? -1 : 1, bx + (i % 2 ? -20 : 20), by - 60 - (ff ? 20 : 0), ff ? (i - 1) * .5 : 0); });
      Q22.T(ctx, ff ? 'داخل الطائرة: الركاب يطفون!' : 'داخل الطائرة: الركاب على الأرضية', cx0 + cw / 2, cy0 - 14, { s: 12.5, w: 900, c: '#fff', bg: ff ? '#7c3aed' : '#475569' });
      if (p.lab !== false) C2.lines(ctx, [{ t: ['طيران أفقي', 'صعود سريع بزاوية 45°', 'سقوط حر: الطائرة والركاب يسقطون معاً', 'خروج من المناورة'][P.ph], c: P.ff ? '#7c3aed' : '#0f172a' }, { t: 'الزمن في المناورة: ' + (P.ff ? fmt((t - 5) / 6 * 25, 2) + ' s من 25 s' : '—'), c: '#475569' }], w - 16, 44, Math.min(330, w * .46), { title: 'طائرة انعدام الوزن', bd: '#7c3aed' });
      Q22.banner(ctx, w, 'الطائرة تتبع مسار السقوط الحر فيطفو الركاب', '#6d28d9', 20);
    },
    dOrbit(ctx, w, h, S) { const p = S.p; G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#0b1026'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#fff'; for (let k = 0; k < 80; k++) ctx.fillRect((k * 173) % w, (k * 97) % h, 1.5, 1.5); });
      const cx = (w + 64) / 2, cy = h * .55, R = Math.min(w - 120, h - 140) * .3;
      K.raw(ctx, () => { const g = ctx.createRadialGradient(cx - R * .3, cy - R * .3, R * .1, cx, cy, R); g.addColorStop(0, '#93c5fd'); g.addColorStop(1, '#1e3a8a'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(34,197,94,.7)'; ctx.beginPath(); ctx.ellipse(cx - R * .2, cy - R * .2, R * .35, R * .2, .5, 0, TAU); ctx.fill(); ctx.fillStyle = '#78350f'; ctx.fillRect(cx - 6, cy - R * 1.12 - 6, 12, R * .12); });
      if (p.path !== false && S.otr) K.raw(ctx, () => { ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.beginPath(); S.otr.forEach((q, i) => i ? ctx.lineTo(cx + q[0] * R, cy + q[1] * R) : ctx.moveTo(cx + q[0] * R, cy + q[1] * R)); ctx.stroke(); });
      if (S.ox) { const x = cx + S.ox[0] * R, y = cy + S.ox[1] * R; K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(x, y, 9, 0, TAU); ctx.fill(); ctx.fillStyle = '#3b82f6'; ctx.fillRect(x - 20, y - 3, 10, 6); ctx.fillRect(x + 10, y - 3, 10, 6); });
        const r = Math.hypot(...S.ox); if (p.frc !== false && !S.lnd) Q22.F(ctx, x, y, -S.ox[0] / r * 50, -S.ox[1] / r * 50, 'الجاذبية', '#facc15', 4); const v = Math.hypot(...S.ov); if (p.vel !== false && !S.lnd) Q22.F(ctx, x, y, S.ov[0] / v * 50, S.ov[1] / v * 50, 'السرعة', '#22c55e', 4); }
      const orb = p.v0 >= 7.5;
      if (p.lab !== false) C2.lines(ctx, [{ t: 'سرعة الإطلاق: ' + p.v0 + ' km/s', c: '#0f172a', mono: 1 }, { t: S.lnd ? 'سقطت المركبة على الأرض' : orb ? 'تسقط باستمرار حول الأرض ولا تصل إليها ← مدار!' : 'تسقط نحو الأرض…', c: orb ? '#7c3aed' : '#dc2626' }, { t: 'زِد السرعة إلى نحو 8 km/s لتدور حول الأرض', c: '#475569' }], w - 16, 44, Math.min(340, w * .48), { title: 'المركبة الفضائية: سقوط حر مستمر', bd: '#f59e0b' });
      if (orb && !S.lnd) { K.raw(ctx, () => { const ix = 90, iy = h - 190; ctx.fillStyle = '#e2e8f0'; rr(ctx, ix, iy, 150, 90, 14); ctx.fill(); }); Q22.kidR(ctx, 150, h - 120 - 8 * Math.sin(S.t * 1.5), .7, '#2563eb', 1, 170, h - 168 - 8 * Math.sin(S.t * 1.5), .6 + .2 * Math.sin(S.t)); Q22.T(ctx, 'رائد الفضاء يطفو', 165, h - 82, { s: 11.5, w: 800, c: '#fff', bg: '#7c3aed' }); }
      Q22.banner(ctx, w, 'المركبة التي تدور حول الأرض في حالة سقوط حر مستمر', '#b45309', 20);
      D.btnRow(ctx, S, [['🚀 أطلق من جديد', '#f59e0b', 0], ['⚡ سرعة المدار 8 km/s', '#7c3aed', 0]]);
    },
    drags(S) { if (!S.W) return []; const p = S.p;
      if (p.sc === 'elev') { const B = D.bts(S, 3); return [Q22.btnObj('up', B[0], S => { if (!S.cut) S.mode = 1; }), Q22.btnObj('down', B[1], S => { if (!S.cut) S.mode = -1; }), Q22.btnObj('cut', B[2], S => { if (S.ey < .3) { S.ey = .9; S.ev = 0; } S.cut = 1; S.mode = 0; }, { hint: true, idle: 'اقطع الحبل ✂' })]; }
      if (p.sc === 'orbit') { const B = D.bts(S, 2); return [Q22.btnObj('launch', B[0], S => { S.ox = null; }, { hint: true, idle: 'أطلق ✋' }), Q22.btnObj('v8', B[1], S => { setParam(S, 'v0', 8); S.ox = null; })]; }
      return [{ id: 'plane', x: (S.W + 64) / 2, y: S.H * .5, r: 60, hint: false, tip: 'انقر لبدء المناورة من جديد', click: S => { S.pt = 2.5; } }]; },
    readings(S) { const p = S.p; if (p.sc === 'elev') return [rd('تعجيل المصعد', fmt(S.ea, 2) + ' m/s²'), rd('قراءة الميزان', Math.round(Math.max(0, 50 * (9.8 + S.ea))) + ' N'), rd('الوزن الحقيقي', '490 N'), rd('الحالة', S.cut ? 'سقوط حر — انعدام وزن' : 'عادي', 1)];
      if (p.sc === 'plane') { const P = D.plane(S); return [rd('المرحلة', ['طيران أفقي', 'صعود 45°', 'سقوط حر', 'خروج'][P.ph]), rd('الركاب', P.ff ? 'يطفون' : 'على الأرضية')]; }
      return [rd('سرعة الإطلاق', S.p.v0 + ' km/s'), rd('النتيجة', S.lnd ? 'سقطت على الأرض' : S.p.v0 >= 7.5 ? 'تدور في مدار' : 'تسقط')]; },
    live: { title: 'قراءة ميزان المصعد مع الزمن', data: S => ({ series: [{ pts: S.hN || [], color: '#dc2626', name: 'N' }], opts: { xl: 't (s)', ymin: 0, ymax: 700 } }) },
    explain(S) { const p = S.p;
      if (p.sc === 'elev') return S.cut ? Q22.ex('قُطع الحبل: قراءة الميزان صارت صفراً، والشخص والكرة والكوب يطفون داخل المصعد!', 'المصعد والشخص والميزان يسقطون معاً بالتعجيل نفسه g، فلا يضغط الشخص على الميزان: هذا <b>انعدام الوزن</b>. الجاذبية لم تنعدم، فالوزن الحقيقي ما زال 490 N.', 'تشعر بشيء يشبه ذلك في الأرجوحة أو في لعبة السقوط بمدينة الألعاب.')
        : Q22.ex('الميزان يقرأ ' + Math.round(Math.max(0, 50 * (9.8 + S.ea))) + ' N.', 'عندما يكون المصعد ساكناً أو بسرعة ثابتة تساوي القراءة الوزن (490 N). عند التعجيل للأعلى تزداد القراءة، وللأسفل تقل.', 'تشعر بأنك أثقل لحظة انطلاق المصعد إلى الأعلى.');
      if (p.sc === 'plane') return Q22.ex('الطائرة تصعد بزاوية 45° ثم تتبع مساراً منحنياً، فيطفو الركاب في داخلها.', 'في الجزء المنحني تتحرك الطائرة كجسم يسقط <b>سقوطاً حراً</b>، والركاب يسقطون معها بالتعجيل نفسه، فيشعرون بانعدام الوزن مدة لا تزيد على <b>25 ثانية</b>.', 'بهذه الطريقة يتدرب رواد الفضاء على الأرض قبل الذهاب إلى الفضاء.');
      return Q22.ex(p.v0 >= 7.5 ? 'المركبة تدور حول الأرض ولا تسقط عليها، ورائد الفضاء يطفو داخلها.' : 'المركبة تنحني نحو الأرض حتى تسقط عليها.', 'المركبة <b>تسقط باستمرار</b> نحو الأرض، لكن سرعتها الأفقية الكبيرة (نحو 8 km/s) تجعلها تدور حولها؛ فهي ومن فيها في <b>سقوط حر مستمر</b>، لذلك يطفو الرواد.', 'محطة الفضاء الدولية تدور حول الأرض مرة كل 90 دقيقة تقريباً.'); },
    quiz: [
      { q: 'ما انعدام الوزن؟', o: ['انعدام الجاذبية في الفضاء', 'حالة يكون فيها الجسم في سقوط حر فلا يضغط على ما تحته', 'نقصان كتلة الجسم'], a: 1, why: 'مراجعة الفصل س3-7 وص 31.' },
      { q: 'رواد الفضاء في مركبة تدور حول الأرض يطفون لأن:', o: ['الجاذبية تنعدم هناك', 'المركبة ومن فيها في حالة سقوط حر مستمر', 'كتلتهم تصبح صفراً'], a: 1, why: 'ص 31: ليس ناتجاً عن انعدام الجاذبية.' },
      { q: 'ماذا تتوقع أن يحصل لو قلّت الجاذبية الأرضية؟', o: ['يقل وزن الأجسام ويسهل القفز عالياً', 'تزداد كتل الأجسام', 'لا يتغير شيء'], a: 0, why: 'مراجعة الفصل س7: w = m g، فإذا قلّت g قلّ الوزن.' }
    ]
  };
  M8.P[D.id] = D;
})();

/* ============================ merged experiments (book order) ============================ */
/* parts may define a live graph: route it to the current part's sub-state (only for this file's experiments) */
{ const m0 = M8.mPart; M8.mPart = (E, parts, partCtl, S, id, ui) => { if (E._q22) { const P = parts.find(q => q.id === id) || parts[0], L = P.D.live; E.live = L ? { title: L.title, data: S2 => L.data(S2._subs && S2._subs[S2._part] ? S2._subs[S2._part] : S2) } : null; } return m0(E, parts, partCtl, S, id, ui); }; }
const Q22M = M => { const E = M8.merge(Object.assign({ ch: 22 }, M)); E._q22 = 1; const P0 = M8.P[M.parts[0].id]; if (P0.live) E.live = { title: P0.live.title, data: S2 => P0.live.data(S2._subs && S2._subs[S2._part] ? S2._subs[S2._part] : S2) }; return E; };
Q22M({ id: 'g8_inertia', sec: 'نشاط استهلالي + الدرس 1', page: 23, kind: 'نشاط', title: 'القصور الذاتي والقانون الأول لنيوتن',
  desc: 'تجربة واحدة بجزأين: (1) النشاط الاستهلالي: القدح والورقة والنقود ومفرش المائدة وعمود النقود، (2) القانون الأول لنيوتن: حزام الأمان، راكب الدراجة، الكرة والاحتكاك، والكتلة مقياس القصور الذاتي.',
  tags: 'القصور الذاتي القانون الأول لنيوتن الاستمرارية', parts: [{ id: 'g8_inertia_coin', n: 'نشاط استهلالي: القدح والورقة والنقود' }, { id: 'g8_newton1', n: 'القانون الأول: حزام الأمان والدراجة والكرة والكتلة' }],
  fact: ['يستطيع بعض السحرة سحب مفرش المائدة بسرعة كبيرة من تحت الأطباق دون أن تسقط — إنه القصور الذاتي وليس سحراً!', 'نشر نيوتن قوانين الحركة الثلاثة وربط بين القوة والحركة (ص 24).', 'المركبات الفضائية تتحرك في الفضاء مسافات هائلة دون محركات تعمل، لأن لا احتكاك هناك يوقفها.'],
  quiz: [
    { q: 'عند سحب الورقة بسرعة من تحت قطعة النقود تقع النقود في القدح بسبب:', o: ['القصور الذاتي', 'قوة رد الفعل', 'التعجيل'], a: 0, why: 'النقود تحاول الاحتفاظ بحالة السكون ثم تسقط بفعل الجاذبية.' },
    { q: 'ما الفائدة العملية من استعمال السائق لحزام الأمان؟', o: ['يزيد سرعة السيارة', 'يمنع اندفاع السائق إلى الأمام عند التوقف المفاجئ', 'يقلل وزن السائق'], a: 1, why: 'مراجعة الدرس: الحزام يقي الراكب من الضرر بسبب قصوره الذاتي.' },
    { q: 'القصور الذاتي لجسم ما يعتمد على:', o: ['سرعته', 'كتلته', 'لونه'], a: 1, why: 'الكتلة مقياس للقصور الذاتي (ص 24).' }] });
Q22M({ id: 'g8_newton2', sec: 'الدرس 1', page: 25, kind: 'نشاط', title: 'القانون الثاني لنيوتن: القوة = الكتلة × التعجيل',
  desc: 'تجربة واحدة بجزأين: (1) نشاط العربة والميزان النابضي: نزيد القوة بثبوت الكتلة ونقيس التعجيل، (2) مثال الكتاب (صندوق 50 kg) وسؤال السيارة 1000 kg، ومقارنة عربتي التسوق والجزازة والسيارة.',
  tags: 'القانون الثاني لنيوتن F=ma تعجيل قوة كتلة', parts: [{ id: 'g8_newton2_lab', n: 'نشاط: العربة والميزان النابضي' }, { id: 'g8_fma', n: 'مثال: F = m a وأثر القوة والكتلة' }],
  fact: ['1 N هي القوة التي تكسب جسماً كتلته 1 kg تعجيلاً مقداره 1 m/s².', 'تُزوَّد سيارات السباق بمحركات ذات قدرة عالية لتؤثر بقوة كبيرة فتكتسب تعجيلاً كبيراً.'],
  quiz: [
    { q: 'ما العلاقة بين تعجيل الجسم ومحصلة القوى المؤثرة فيه (بثبوت الكتلة)؟', o: ['تناسب عكسي', 'تناسب طردي', 'لا علاقة بينهما'], a: 1, why: 'مراجعة الدرس: القانون الثاني لنيوتن.' },
    { q: 'القوة اللازمة لتحريك صندوق كتلته 50 kg بتعجيل 2 m/s² هي:', o: ['25 N', '52 N', '100 N'], a: 2, why: 'مثال الكتاب: F = 50 × 2 = 100 N.' },
    { q: 'ما مقدار القوة التي تجعل سيارة كتلتها 1000 kg تتحرك بتعجيل منتظم مقداره 4 m/s²؟', o: ['250 N', '4000 N', '1004 N'], a: 1, why: 'مراجعة الفصل س5: F = m a = 1000 × 4 = 4000 N.' }] });
Q22M({ id: 'g8_newton3', sec: 'الدرس 1', page: 25, kind: 'نشاط', title: 'القانون الثالث لنيوتن: لكل فعل رد فعل',
  desc: 'تجربة واحدة بجزأين: (1) المشي ودفع الجدار والمتزلجان: قوتان متساويتان ومتعاكستان على جسمين مختلفين، (2) الصاروخ والتجذيف والبالون: الاندفاع بقذف الغاز أو الماء أو الهواء إلى الخلف.',
  tags: 'القانون الثالث لنيوتن فعل رد فعل', parts: [{ id: 'g8_n3_push', n: 'المشي ودفع الجدار والمتزلجان' }, { id: 'g8_n3_jet', n: 'الصاروخ والتجذيف والبالون' }],
  fact: ['الصاروخ لا يحتاج إلى هواء ليندفع، لذلك يعمل في الفضاء: الغازات التي يقذفها هي التي تدفعه.', 'عندما تدفع باباً مقفلاً فإنه يدفعك بقوة مساوية ومعاكسة.', 'الحبّار والأخطبوط يسبحان بقذف الماء إلى الخلف — صاروخ طبيعي!'],
  quiz: [
    { q: 'واحد من الخيارات التالية لا يصح أن توصف به قوتا الفعل ورد الفعل:', o: ['متساويتان بالمقدار', 'متعاكستان بالاتجاه', 'تؤثران على جسم واحد'], a: 2, why: 'مراجعة الفصل س2: الفعل ورد الفعل يؤثران في جسمين مختلفين.' },
    { q: 'عند المشي، القوة التي تدفعنا إلى الأمام هي:', o: ['دفع القدم للأرض إلى الخلف', 'دفع الأرض للقدم إلى الأمام', 'وزن الجسم'], a: 1, why: 'ص 25: الأرض تدفع القدم إلى الأمام (رد الفعل).' },
    { q: 'ينطلق الصاروخ إلى الأعلى نتيجة:', o: ['دفع الهواء له من الأسفل', 'انبعاث الغازات المتدفقة إلى الأسفل', 'قلة وزنه'], a: 1, why: 'ص 26: الصاروخ يدفع الغازات إلى الأسفل فتدفعه إلى الأعلى.' }] });
Q22M({ id: 'g8_gravity_weight', sec: 'الدرس 2', page: 27, kind: 'نشاط', title: 'الجاذبية والوزن',
  desc: 'تجربة واحدة بجزأين: (1) قانون الجذب العام: كرتان، الأرض والقمر، الشمس والكواكب، (2) الوزن قوة جذب الأرض للجسم w = m g: الميزان النابضي، قبّان السيارات، والوزن على القمر والمريخ والمشتري.',
  tags: 'الجاذبية قانون الجذب العام الوزن w=mg', parts: [{ id: 'g8_gravity', n: 'قانون الجذب العام' }, { id: 'g8_weight', n: 'الوزن w = m g' }],
  fact: ['قوة الجاذبية الأرضية هي إحدى أكبر أربع قوى في الكون (حقيقة علمية ص 27).', 'عرف العلماء العرب الجاذبية وبحثوا في سقوط الأجسام، وأول من صاغ قانون الجذب العام هو إسحاق نيوتن.', 'في الفضاء البعيد عن الكواكب يكون الوزن صفراً تقريباً لكن الكتلة تبقى كما هي!'],
  quiz: [
    { q: 'تقل قوة الجاذبية بين جسمين إذا .......... البعد بين مركزيهما:', o: ['قلّ', 'ازداد', 'بقي ثابتاً'], a: 1, why: 'مراجعة الفصل س1: القوة تتناسب عكسياً مع مربع البعد.' },
    { q: 'ما الذي يُبقي القمر على مداره حول الأرض؟', o: ['قوة جذب الأرض للقمر', 'الرياح الشمسية', 'القصور الذاتي فقط'], a: 0, why: 'مراجعة الدرس: الجاذبية بين الأرض والقمر.' },
    { q: 'ما مقدار وزن سيارة كتلتها 1500 kg؟ (g = 9.8 N/kg)', o: ['1500 N', '14700 N', '153 N'], a: 1, why: 'مراجعة الفصل س6: w = m g = 1500 × 9.8 = 14700 N.' }] });
Q22M({ id: 'g8_fall', sec: 'الدرس 2 + الفيزياء والتكنولوجيا', page: 28, kind: 'نشاط', title: 'السقوط الحر ومركز الثقل وانعدام الوزن',
  desc: 'تجربة واحدة بثلاثة أجزاء: (1) نشاط السقوط الحر ومقاومة الهواء (الكرتان، الريشة في الأنبوب المفرّغ، الورقتان، برج بيزا)، (2) مركز الثقل (المسطرة، الأجسام المنتظمة، الجسم غير المنتظم)، (3) انعدام الوزن (المصعد، الطائرة، المركبة الفضائية).',
  tags: 'السقوط الحر مقاومة الهواء مركز الثقل انعدام الوزن', parts: [{ id: 'g8_freefall', n: 'نشاط: السقوط الحر ومقاومة الهواء' }, { id: 'g8_cog', n: 'مركز الثقل' }, { id: 'g8_weightless', n: 'الفيزياء والتكنولوجيا: انعدام الوزن' }],
  fact: ['أسقط غاليليو جسمين مختلفين في الكتلة من قمة برج بيزا بين عامي 1589 و1592 ليثبت أن السقوط الحر لا يعتمد على الكتلة.', 'في عام 2014 أُسقطت كرة وريشة في غرفة ضخمة مفرغة من الهواء فوصلتا إلى أرضيتها معاً (الشكل 2).', 'في المحطة الفضائية الدولية تبلغ الجاذبية نحو 90% من قيمتها على سطح الأرض، ومع ذلك يطفو الرواد لأنهم في سقوط حر مستمر!'],
  quiz: [
    { q: 'ما سبب الاختلاف الظاهر في سرعة الأجسام عند سقوطها في الهواء؟', o: ['اختلاف كتلها', 'مقاومة الهواء', 'اختلاف ألوانها'], a: 1, why: 'مراجعة الدرس: الهواء يصطدم بالجسم ويؤثر في الخفيف أكثر.' },
    { q: 'مركز ثقل الحلقة يقع:', o: ['على مادتها', 'في مركزها خارج مادتها', 'عند أعلى نقطة فيها'], a: 1, why: 'الشكل (5): مركز ثقل الحلقة C لا يقع على مادتها.' },
    { q: 'رواد الفضاء في مركبة تدور حول الأرض يطفون لأن:', o: ['الجاذبية تنعدم هناك', 'المركبة ومن فيها في حالة سقوط حر مستمر', 'كتلتهم تصبح صفراً'], a: 1, why: 'ص 31: ليس ناتجاً عن انعدام الجاذبية.' }] });
/* END */
