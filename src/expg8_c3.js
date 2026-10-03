'use strict';
/* ====================== الثاني المتوسط — الفصل الثالث: الشغل والقدرة والطاقة (ch 23, ص 34–44) ======================
   g8_work_lab · g8_work · g8_work_ex · g8_power_stairs · g8_power · g8_power_ex · g8_energy · g8_ke · g8_ke_mass · g8_pe · g8_conserve · g8_forms
   Uses the grade-7 kits K (expg7_0kit.js) and C2 (expg7_c2.js). Local helpers in Q23 (IK person, spring balance, stairs, energy bars…). */
LW({ id: 'g8_work', cat: 23, name: 'الشغل', fx: '<i>W</i> = <i>F</i> × <i>X</i>', sym: 'الشغل = القوة × الإزاحة التي يتحركها الجسم باتجاه القوة. W (J)، F (N)، X (m). الجول (J = N.m): الشغل الذي تنجزه قوة مقدارها نيوتن واحد تزيح جسماً بمقدار متر واحد باتجاهها. الشغل كمية قياسية', calc: { in: [['F', 'القوة F', 'N', 20], ['X', 'الإزاحة X', 'm', .5]], out: 'الشغل W', u: 'J', f: v => v.F * v.X } });
LW({ id: 'g8_work0', cat: 23, name: 'متى لا تنجز القوة شغلاً؟', fx: '<i>W</i> = 0 &nbsp; إذا كانت <i>X</i> = 0 ، أو كانت القوة عمودية على اتجاه الحركة', sym: 'القوة التي لا تسبب حركة الجسم في اتجاهها لا تنجز شغلاً (حمل صندوق والمشي به، دفع جدار أو خزانة لا تتحرك)' });
LW({ id: 'g8_power', cat: 23, name: 'القدرة', fx: '<i>P</i> = ' + FR('<i>W</i>', '<i>t</i>'), sym: 'القدرة = الشغل المنجز ÷ الزمن المستغرق لإنجازه (معدل الشغل المنجز خلال وحدة الزمن). تقاس بوحدة J/s وتسمى واط (watt)', calc: { in: [['W', 'الشغل W', 'J', 1000], ['t', 'الزمن t', 's', 120]], out: 'القدرة P', u: 'watt', f: v => v.W / v.t } });
LW({ id: 'g8_hp', cat: 23, name: 'القدرة الحصانية', fx: '1 hp = 746 watt', sym: 'القدرة الحصانية (hp) تستعمل لقياس قدرة الآلات، مثل قدرة المضخة ومحرك السيارة', calc: { in: [['hp', 'القدرة', 'hp', 1]], out: 'القدرة', u: 'watt', f: v => v.hp * 746 } });
LW({ id: 'g8_energy', cat: 23, name: 'الطاقة', fx: 'الطاقة = القابلية على إنجاز شغل', sym: 'كمية قياسية تقاس بوحدة قياس الشغل وهي الجول (J). من أشكالها: الميكانيكية، الحرارية، الضوئية، الكيميائية، الصوتية، الكهربائية، النووية' });
LW({ id: 'g8_ke', cat: 23, name: 'الطاقة الحركية', fx: '<i>K.E</i> = ' + FR('1', '2') + ' <i>m</i> <i>v</i>²', sym: 'الطاقة التي يمتلكها جسم متحرك؛ تتناسب طردياً مع الكتلة ومع مربع السرعة. m (kg)، v (m/s)، K.E (J)', calc: { in: [['m', 'الكتلة m', 'kg', .2], ['v', 'السرعة v', 'm/s', 2]], out: 'الطاقة الحركية K.E', u: 'J', f: v => .5 * v.m * v.v * v.v } });
LW({ id: 'g8_pe', cat: 23, name: 'الطاقة الكامنة', fx: '<i>P.E</i> = <i>m</i> × <i>g</i> × <i>h</i>', sym: 'الطاقة التي يختزنها الجسم بسبب موقعه بالنسبة لسطح الأرض؛ تزداد كلما زاد ارتفاعه. m الكتلة (kg)، g التعجيل الأرضي (9.8 m/s²)، h الارتفاع (m)', calc: { in: [['m', 'الكتلة m', 'kg', 20], ['g', 'g', 'm/s²', 9.8], ['h', 'الارتفاع h', 'm', 2.5]], out: 'الطاقة الكامنة P.E', u: 'J', f: v => v.m * v.g * v.h } });
LW({ id: 'g8_cons', cat: 23, name: 'قانون حفظ الطاقة', fx: '<i>E</i><sub>p</sub> + <i>E</i><sub>k</sub> = مقدار ثابت', sym: 'الطاقة لا تفنى ولا تستحدث وإنما تتحول من شكل إلى آخر، أي أن مقدار الطاقة الكلي يبقى ثابتاً' });

const Q23 = {
  G: 9.8,
  P: {},
  nf(v, d = 3, u) { v = +v; if (Math.abs(v) >= 1e5 && isFinite(v)) return Math.round(v) + (u ? ' ' + u : ''); return fmt(Math.abs(v) < 5e-4 ? 0 : v, d, u); },
  T(ctx, s, x, y, o) { C2.T(ctx, s, x, y, o || {}); },
  F(ctx, x, y, dx, dy, label, col, w = 4) { C2.force(ctx, x, y, dx, dy, label, col, w); },
  banner(ctx, w, s, col = '#0f766e', y = 22) { Q23.T(ctx, s, (w + 64) / 2, y, { s: 14, w: 900, c: '#fff', bg: col }); },
  btnObj(id, b, click, o = {}) { return Object.assign({ id, x: b.x, y: b.y, w: b.w, h: b.h, tip: o.tip || 'اضغط', hint: !!o.hint, click }, o.idle ? { idle: o.idle } : {}); },
  row(w, y, n, bw = 150, gap = 10) { bw = Math.min(bw, (w - 90) / n - gap); const tot = n * bw + (n - 1) * gap, x0 = (w + 64) / 2 + tot / 2 - bw / 2; return Array.from({ length: n }, (_, i) => ({ x: x0 - i * (bw + gap), y, w: bw, h: 40 })); },
  rowL(y, n, bw = 150, gap = 10) { const R0 = Runner.S; if (R0 && R0.W && R0.W < 600) { y = R0.H - 86; bw = (R0.W - 30) / n - gap; return Array.from({ length: n }, (_, i) => ({ x: 15 + bw / 2 + i * (bw + gap), y, w: bw, h: 40 })); } return Array.from({ length: n }, (_, i) => ({ x: 82 + bw / 2 + i * (bw + gap), y, w: bw, h: 40 })); },
  card(ctx, S, L, o = {}) { const w = S.W; if (w < 600) o = Object.assign({}, o, { wd: w - 24, f: 1 }); L = L.map(q => (typeof q === 'object' && q.mono && /[\u0600-\u06FF]/.test(q.t)) ? Object.assign({}, q, { mono: 0 }) : q); return C2.lines(ctx, L, w - 12, o.y || 44, Math.min(o.wd || 360, w * (o.f || .52)), o); },
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
    const legs = feet.map(f => Q23.ik([hx, hy], [f[0], f[1] - 7 * s], TH, SH, [dir, 0]));
    const hands = o.hands || [[sh[0] + dir * 5 * s, sh[1] + UA + FA - 3 * s], [sh[0] - dir * 3 * s, sh[1] + UA + FA - 3 * s]];
    const arms = hands.map(t => Q23.ik([sh[0], sh[1] + 3 * s], t, UA, FA, o.elb || [-dir, .6]));
    const skin = o.skin || '#f1c27d', shirt = o.shirt || '#2563eb', pants = o.pants || '#1e3a8a', shoe = o.shoe || '#3f3f46', hair = o.hair || '#3b2414';
    K.raw(ctx, () => {
      ctx.save(); ctx.lineJoin = 'round';
      const leg = (L, f, dark) => { const pc = dark ? shade(pants, -22) : pants; Q23.limb(ctx, [hx, hy], L[0], 15.5 * s, pc); Q23.limb(ctx, L[0], L[1], 13 * s, pc);
        const an = L[1]; ctx.fillStyle = dark ? shade(shoe, -15) : shoe; ctx.strokeStyle = '#18181b'; ctx.lineWidth = 1; ctx.beginPath();
        ctx.moveTo(an[0] - dir * 7 * s, an[1] - 3 * s); ctx.lineTo(an[0] - dir * 7 * s, an[1] + 7 * s); ctx.lineTo(an[0] + dir * 17 * s, an[1] + 7 * s); ctx.quadraticCurveTo(an[0] + dir * 19 * s, an[1] + 1 * s, an[0] + dir * 8 * s, an[1] - 1 * s); ctx.lineTo(an[0] + dir * 3 * s, an[1] - 5 * s); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e4e4e7'; ctx.fillRect(Math.min(an[0] - dir * 7 * s, an[0] + dir * 17 * s), an[1] + 5 * s, 24 * s, 2 * s); };
      const arm = (A, dark) => { const sc = dark ? shade(shirt, -25) : shirt, sk = dark ? shade(skin, -18) : skin, S0 = [sh[0], sh[1] + 3 * s];
        if (o.sleeve === 'long') { Q23.limb(ctx, S0, A[0], 11 * s, sc); Q23.limb(ctx, A[0], A[1], 9.6 * s, sc); }
        else { Q23.limb(ctx, S0, A[0], 10 * s, sk); Q23.limb(ctx, A[0], A[1], 8.6 * s, sk); Q23.limb(ctx, S0, [S0[0] + (A[0][0] - S0[0]) * .55, S0[1] + (A[0][1] - S0[1]) * .55], 12.5 * s, sc); }
        ctx.fillStyle = sk; ctx.strokeStyle = shade(skin, -60); ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(A[1][0], A[1][1], 5.6 * s, 4.8 * s, Math.atan2(A[1][1] - A[0][1], A[1][0] - A[0][0]), 0, TAU); ctx.fill(); ctx.stroke(); };
      leg(legs[1], feet[1], 1); arm(arms[1], 1);
      // torso
      const tg = ctx.createLinearGradient(hx - 14 * s, 0, hx + 14 * s, 0); tg.addColorStop(0, shade(shirt, dir > 0 ? -30 : 25)); tg.addColorStop(1, shade(shirt, dir > 0 ? 25 : -30));
      Q23.limb(ctx, [hx, hy + 3 * s], [hx, hy + 3 * s], 22 * s, pants);
      ctx.lineCap = 'round'; ctx.strokeStyle = shade(shirt, -60); ctx.lineWidth = 28.5 * s; ctx.beginPath(); ctx.moveTo(hx, hy - 2 * s); ctx.lineTo(sh[0], sh[1] + 5 * s); ctx.stroke();
      ctx.strokeStyle = tg; ctx.lineWidth = 26.5 * s; ctx.beginPath(); ctx.moveTo(hx, hy - 2 * s); ctx.lineTo(sh[0], sh[1] + 5 * s); ctx.stroke();
      ctx.strokeStyle = shade(pants, -35); ctx.lineWidth = 3.5 * s; ctx.beginPath(); ctx.moveTo(hx - 13 * s * Math.cos(lean), hy - 13 * s * Math.sin(lean) * dir); ctx.lineTo(hx + 13 * s * Math.cos(lean), hy + 13 * s * Math.sin(lean) * dir); ctx.stroke();
      leg(legs[0], feet[0], 0);
      // neck + head
      Q23.limb(ctx, [sh[0], sh[1]], [hd[0] - dir * 2 * s, hd[1] + 6 * s], 8.5 * s, skin);
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
  /* spring balance like the book: transparent tube with red caps. ring at (x,y); body extends towards angle ang; returns hook point */
  sbal(ctx, x, y, ang, F, Fmax, o = {}) {
    const Lt = o.Lt || 110, ext = clamp(F / Fmax, 0, 1.04) * (Lt - 26), tot = Lt + 56 + ext;
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2);
      ctx.strokeStyle = '#71717a'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(0, 0, 7, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 7); ctx.lineTo(0, 15); ctx.stroke();
      const red = ctx.createLinearGradient(-11, 0, 11, 0); red.addColorStop(0, '#991b1b'); red.addColorStop(.45, '#ef4444'); red.addColorStop(1, '#7f1d1d');
      ctx.fillStyle = red; rr(ctx, -11, 14, 22, 13, 3); ctx.fill();
      const tb = ctx.createLinearGradient(-9, 0, 9, 0); tb.addColorStop(0, 'rgba(203,213,225,.85)'); tb.addColorStop(.35, 'rgba(255,255,255,.95)'); tb.addColorStop(1, 'rgba(148,163,184,.85)');
      ctx.fillStyle = tb; ctx.fillRect(-9, 27, 18, Lt); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.strokeRect(-9, 27, 18, Lt);
      // scale ticks
      const n = 10; ctx.strokeStyle = '#334155'; for (let k = 0; k <= n; k++) { const yy = 31 + (Lt - 26) * k / n; ctx.lineWidth = k % 5 ? .8 : 1.4; ctx.beginPath(); ctx.moveTo(-9, yy); ctx.lineTo(k % 5 ? -4 : -1, yy); ctx.stroke(); }
      // spring
      const iy = 31 + ext; ctx.strokeStyle = '#a1a1aa'; ctx.lineWidth = 1.4; ctx.beginPath(); for (let k = 0; k <= 16; k++) { const yy = 27 + (iy - 27) * k / 16; ctx.lineTo(k % 2 ? 5 : -5, yy); } ctx.stroke();
      ctx.fillStyle = '#dc2626'; ctx.fillRect(-8, iy - 2, 16, 4);
      ctx.strokeStyle = '#a1a1aa'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(0, iy); ctx.lineTo(0, 27 + Lt + 10 + 8 + ext); ctx.stroke();
      ctx.fillStyle = red; rr(ctx, -10, 27 + Lt, 20, 10, 3); ctx.fill();
      // hook
      const hy = 27 + Lt + 18 + ext; ctx.strokeStyle = '#71717a'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(0, hy); ctx.arc(-4, hy + 6, 4.5, -Math.PI * .1, Math.PI * 1.1); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(-6, 30, 2.5, Lt - 8);
      ctx.restore();
    });
    if (o.label !== false) { const c = Math.cos(ang), sn = Math.sin(ang), mx = x + c * (Lt * .5 + 27), my = y + sn * (Lt * .5 + 27);
      Q23.T(ctx, Q23.nf(F, 3) + ' N', mx + (Math.abs(c) > .5 ? 0 : 38), my + (Math.abs(c) > .5 ? -24 : 0), { s: 13, w: 900, c: '#fff', bg: '#b91c1c', mono: 1 }); }
    return [x + Math.cos(ang) * (tot + 6), y + Math.sin(ang) * (tot + 6)];
  },
  /* stairs going up toward dir from (x0, gy): n steps, tread sw, riser sh (px) */
  stairs(ctx, x0, gy, n, sw, sh, dir, o = {}) {
    K.raw(ctx, () => {
      for (let k = 0; k < n; k++) {
        const xa = x0 + dir * k * sw, xb = xa + dir * sw, yt = gy - (k + 1) * sh, xl = Math.min(xa, x0 + dir * n * sw), xr = Math.max(xa, x0 + dir * n * sw);
        const g = ctx.createLinearGradient(0, yt, 0, gy); g.addColorStop(0, o.c1 || '#e7e5e4'); g.addColorStop(1, o.c2 || '#a8a29e'); ctx.fillStyle = g;
        ctx.fillRect(Math.min(xa, xb), yt, Math.abs(xb - xa) + 1, gy - yt);
        ctx.fillStyle = o.tread || '#78716c'; ctx.fillRect(Math.min(xa, xb) - (dir > 0 ? 4 : 0), yt - 3, Math.abs(xb - xa) + 4, 5);
        ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(Math.min(xa, xb), yt + 2, Math.abs(xb - xa), 2);
        ctx.strokeStyle = 'rgba(68,64,60,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(xa, yt); ctx.lineTo(xa, gy - k * sh); ctx.stroke();
      }
      if (o.rail !== false) { // railing
        const xa = x0 + dir * sw * .5, xb = x0 + dir * (n - .5) * sw, ya = gy - sh - 70, yb = gy - n * sh - 70;
        ctx.strokeStyle = o.railC || '#f9a8d4'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xb, yb); ctx.stroke();
        ctx.lineWidth = 2.5; for (let k = 0; k < n; k += 2) { const xx = x0 + dir * (k + .5) * sw, yy = gy - (k + 1) * sh; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx, yy - 70 + (k === 0 ? 0 : 0)); ctx.stroke(); }
        ctx.lineCap = 'butt';
      }
    });
  },
  /* cardboard box (side view): bottom centre (x,y), w,h */
  cbox(ctx, x, y, w, h, o = {}) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#c08a4b'); g.addColorStop(.5, '#e0b277'); g.addColorStop(1, '#b07a3c');
      ctx.fillStyle = g; ctx.strokeStyle = '#7c4a1c'; ctx.lineWidth = 1.4; rr(ctx, x - w / 2, y - h, w, h, 3); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(146,64,14,.35)'; ctx.fillRect(x - w / 2, y - h + h * .08, w, 3); ctx.fillStyle = 'rgba(253,230,138,.6)'; ctx.fillRect(x - 6, y - h, 12, h * .45);
      if (o.label) Q23.T(ctx, o.label, x, y - h * .45, { s: o.fs || 12, w: 900, c: '#451a03' }); });
  },
  /* wooden block (book style, dark wood) — x,y bottom-left of front face */
  block(ctx, x, y, w, h, o = {}) { K.box(ctx, x, y, w, h, o.d ?? w * .35, { c1: o.c1 || '#a0643a', c2: o.c2 || '#5c3317', grain: 1 }, { alpha: o.alpha }); },
  /* vertical energy bars card; items [{n, v, c}] ; x right edge */
  bars(ctx, x, y, wd, ht, items, vmax, title) { const R0 = Runner.S; if (R0 && R0.W && R0.W < 600) { wd = Math.min(wd, 40 + items.length * 46); ht = Math.min(ht, 140); x = wd + 10; y = Math.max(y, 215); }
    C2.card(ctx, x - wd, y, wd, ht, { bd: '#0f766e' }); Q23.T(ctx, title || 'الطاقة (J)', x - wd / 2, y + 14, { s: 12.5, w: 900, c: '#0f766e' });
    const n = items.length, bw = Math.min(46, (wd - 20) / n - 10), base = y + ht - 32, top = y + 44, H = base - top;
    K.raw(ctx, () => { ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - wd + 8, base); ctx.lineTo(x - 8, base); ctx.stroke(); });
    items.forEach((it, i) => { const cx = x - wd + 10 + (wd - 20) * (n - i - .5) / n, bh = clamp(it.v / (vmax || 1), 0, 1.08) * H;
      K.raw(ctx, () => { const g = ctx.createLinearGradient(cx - bw / 2, 0, cx + bw / 2, 0); g.addColorStop(0, shade(it.c, 30)); g.addColorStop(1, shade(it.c, -25)); ctx.fillStyle = g; rr(ctx, cx - bw / 2, base - bh, bw, Math.max(bh, .1), 4); ctx.fill(); });
      Q23.T(ctx, Q23.nf(it.v, 3), cx, base - bh - 10, { s: 11.5, w: 900, c: shade(it.c, -40), mono: 1 });
      Q23.T(ctx, it.n, cx, base + 14, { s: 11.5, w: 900, c: shade(it.c, -40) }); });
  },
  /* step-by-step solution card: L = lines; shows S.stp + 1 of them */
  wrap(t, n) { const out = []; let cur = ''; String(t).split(' ').forEach(wd => { if ((cur + ' ' + wd).trim().length > n && cur) { out.push(cur); cur = wd; } else cur = (cur + ' ' + wd).trim(); }); if (cur) out.push(cur); return out; },
  solve(ctx, S, L, title, o = {}) {
    const wd = Math.min(o.wd || 420, S.W * (o.f || .62)), pre = o.q ? Q23.wrap(o.q, Math.floor(wd / 6.4)).map(t => ({ t, c: '#0f172a', s: 11.5 })) : [];
    const shown = pre.concat(L.slice(0, Math.min(L.length, (S.stp || 0) + 1))); if ((S.stp || 0) < L.length - 1) shown.push({ t: 'اضغط «الخطوة التالية» لترى بقية الحل', c: '#7c3aed', s: 11.5 });
    return Q23.card(ctx, S, shown, Object.assign({ title, bd: '#7c3aed', lh: 22, wd: 420, f: .62 }, o));
  },
  sun(ctx, x, y, r, t = 0) { K.raw(ctx, () => { const g = ctx.createRadialGradient(x, y, r * .2, x, y, r * 2.2); g.addColorStop(0, 'rgba(253,224,71,1)'); g.addColorStop(.45, 'rgba(250,204,21,.5)'); g.addColorStop(1, 'rgba(250,204,21,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.2, 0, TAU); ctx.fill(); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }); },
  /* outdoor background: sky + ground */
  outdoor(ctx, w, h, gy, o = {}) {
    G.bg(ctx, w, h, false);
    K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, o.top || '#7dd3fc'); g.addColorStop(1, o.bot || '#e0f2fe'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, gy);
      const gg = ctx.createLinearGradient(0, gy, 0, h); gg.addColorStop(0, o.g1 || '#86efac'); gg.addColorStop(1, o.g2 || '#15803d'); ctx.fillStyle = gg; ctx.fillRect(0, gy, w, h - gy); });
  },
  verdict(ctx, x, y, ok, t) { Q23.T(ctx, (ok ? '✔ ' : '✘ ') + t, x, y, { s: 15, w: 900, c: '#fff', bg: ok ? '#15803d' : '#b91c1c' }); }
};

/* =========================================================================================
   1) نشاط استهلالي (ص 35): الشغل الفيزيائي — جسم على طاولة خشبية + ميزان نابضي + مسطرة
   ========================================================================================= */
(() => {
  const MUS = .42, MUK = .32, FMAX = 20;
  const D = { id: 'g8_work_lab', ch: 23, sec: 'نشاط استهلالي', page: 35, kind: 'نشاط استهلالي',
    title: 'نشاط استهلالي: الشغل الفيزيائي (الجسم والميزان النابضي والمسطرة)',
    desc: 'نسحب جسماً على طاولة أفقية بوساطة ميزان نابضي ونقيس القوة والإزاحة، ثم نرفعه عمودياً للأعلى ونقيس القوة والارتفاع. ماذا يمثل حاصل ضرب القوة في الإزاحة؟',
    tags: 'الشغل نشاط استهلالي ميزان نابضي مسطرة إزاحة قوة جول سحب رفع',
    tools: ['جسم على طاولة خشبية', 'ميزان نابضي', 'مسطرة'],
    steps: ['ضع الجسم على الطاولة الأفقية واربطه بميزان نابضي، وحدّد موضع الجسم على الطاولة (العلامة الخضراء) — الحالة «سحب أفقي».', 'اسحب الجسم على الطاولة من حلقة الميزان (من اليد) بسحب منتظم، وسجّل مقدار القوة المؤثرة (قراءة الميزان).', 'قِس الإزاحة التي قطعها الجسم بالمسطرة: الفرق بين قراءة المسطرة عند البداية وعند النهاية.', 'جِد حاصل ضرب القوة في الإزاحة. ماذا يمثل المقدار الذي حصلت عليه؟ اضغط «سجّل» لتدوينه في الجدول.', 'اختر الحالة «رفع عمودي»: المسطرة مثبتة عمودياً على الطاولة.', 'ارفع الجسم عمودياً للأعلى بوساطة الميزان (اسحب اليد للأعلى) وسجّل القوة المؤثرة.', 'قِس البعد العمودي بين سطح الطاولة والجسم، وجِد حاصل ضرب القوة والإزاحة العمودية.', 'غيّر كتلة الجسم وكرّر خطوات النشاط (كما يكرّرها زميلك).', 'استنتج مفهوم الشغل الفيزيائي.'],
    concl: ['عندما تؤثر قوة في جسم وتحركه إزاحة باتجاهها فإنها تنجز شغلاً: الشغل = القوة × الإزاحة (W = F × X).', 'عند السحب المنتظم على الطاولة تساوي قراءة الميزان قوة الاحتكاك تقريباً، وعند الرفع المنتظم تساوي وزن الجسم.', 'يقاس الشغل بوحدة الجول (J = N.m).', 'كلما زادت الإزاحة (أو القوة) زاد الشغل المنجز.'],
    laws: ['g8_work'],
    fact: ['وحدة الشغل «الجول» سمّيت باسم العالم الإنكليزي جيمس جول.', 'عند الرفع تحتاج قوة أكبر من السحب على الطاولة لأن قوة الرفع تساوي الوزن كله، أما قوة السحب فتساوي الاحتكاك فقط.'],
    controls: [SEL('mode', 'الحالة', [['pull', '↔ سحب أفقي على الطاولة'], ['lift', '↕ رفع عمودي للأعلى']], 'pull', (v, S) => D.reset(S)),
      R('m', 'كتلة الجسم m', .5, 1.5, 1, .25, 'kg', (v, S) => D.reset(S)),
      BT('', [{ t: '↺ أعد الجسم إلى موضعه', on: S => D.reset(S) }]),
      TG('frc', 'سهم القوة F', true, null, 'force'), TG('disp', 'سهم الإزاحة X', true, null, 'vector'), TG('mark', 'علامة موضع البداية', true, null, 'dot'), TG('lab', 'البطاقات والقيم', true, null, 'labels')],
    setup(S) { D.reset(S); S.rows = S.rows || []; },
    reset(S) { S.x = 0; S.v = 0; S.r = null; S.F = 0; S.Fs = 0; S.Wi = 0; S.drag = 0; S.mx = 0; },
    geo(S) {
      const w = S.W, h = S.H, ty = h * .66, x0 = 70, x1 = w - 20, pxm = clamp((x1 - x0) / 1.3, 300, 640), Lt = clamp(.2 * pxm, 80, 125);
      const bw = .12 * pxm, bh = .1 * pxm, Lb = (Lt + 56 + 6) / pxm, k = FMAX / ((Lt - 26) / pxm);
      const bx0 = x1 - 30 - bw; // initial left face (pull)
      const lx = (x0 + x1) / 2 + 60; // lift: block centre x
      return { w, h, ty, x0, x1, pxm, Lt, bw, bh, Lb, k, bx0, lx, rul0: bx0 + bw - 1.05 * pxm };
    },
    update(S, dt) {
      if (!S.W) return; dt = Math.min(dt, .04); const g = D.geo(S), m = S.p.m, G = Q23.G, lift = S.p.mode === 'lift';
      if (S.r == null) S.r = lift ? S.x + g.bh / g.pxm + g.Lb : S.x + g.Lb;
      const n = 12, h = dt / n, c = 2 * .6 * Math.sqrt(g.k * m);
      for (let i = 0; i < n; i++) {
        const ext = S.r - S.x - g.Lb - (lift ? g.bh / g.pxm : 0), F = Math.max(0, g.k * ext); S.F = F;
        const x0 = S.x;
        if (lift) {
          if (S.x <= 0 && F < m * G && S.v <= 0) { S.v = 0; S.x = 0; }
          else { const a = (F - m * G - c * S.v) / m; S.v += a * h; S.x += S.v * h; if (S.x < 0) { S.x = 0; S.v = 0; } }
        } else {
          if (Math.abs(S.v) < 1e-4 && F <= MUS * m * G) S.v = 0;
          else { const a = (F - MUK * m * G * Math.sign(S.v || 1) - c * .3 * S.v) / m; const nv = S.v + a * h; S.v = (S.v > 0 && nv < 0) ? 0 : nv; S.x += S.v * h; }
          S.x = clamp(S.x, 0, .85);
        }
        if (S.x > x0) S.Wi += F * (S.x - x0);
      }
      S.Fs += (S.F - S.Fs) * Math.min(1, dt * 6); S.mx = Math.max(S.mx, S.x);
      if (!S.drag && lift) { /* hand keeps its place */ }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, lift = p.mode === 'lift', m = p.m; K.bg(ctx, w, h, { benchY: g.ty });
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(92,51,23,.25)'; ctx.fillRect(0, g.ty + 2, w, 6); });
      const r = S.r ?? 0;
      if (!lift) {
        const bl = g.bx0 - S.x * g.pxm, by = g.ty + 2, hookY = by - g.bh * .45;
        K.ruler(ctx, g.rul0, g.ty + 16, 1.0 * g.pxm, 100);
        if (p.mark !== false) K.raw(ctx, () => { ctx.setLineDash([6, 4]); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.bx0, by - g.bh - 30); ctx.lineTo(g.bx0, g.ty + 40); ctx.stroke(); ctx.setLineDash([]); });
        if (p.mark !== false) { Q23.block(ctx, g.bx0, by, g.bw, g.bh, { alpha: .25 }); Q23.T(ctx, 'موضع البداية', g.bx0 + g.bw / 2, by - g.bh - 40, { s: 11.5, w: 800, c: '#15803d' }); }
        Q23.block(ctx, bl, by, g.bw, g.bh); Q23.T(ctx, m + ' kg', bl + g.bw / 2, by - g.bh / 2, { s: 12, w: 900, c: '#fff' });
        K.raw(ctx, () => { ctx.strokeStyle = '#71717a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(bl - 4, hookY, 4, 0, TAU); ctx.stroke(); });
        const ext = Math.max(0, S.F / FMAX) * (g.Lt - 26), ring = bl - (g.Lt + 56 + 6) - ext - 4;
        Q23.sbal(ctx, ring, hookY, 0, S.Fs, FMAX, { Lt: g.Lt });
        C2.hand(ctx, ring - 2, hookY, 1, 1.05, { sleeve: '#0ea5e9' });
        if (p.frc !== false && S.F > .05) Q23.F(ctx, bl - 2, by - g.bh - 22, -clamp(S.Fs * 9, 18, 150), 0, 'F', '#dc2626', 4);
        if (p.disp !== false && S.x > .005) { Q23.F(ctx, g.bx0, g.ty + 60, -S.x * g.pxm, 0, '', '#2563eb', 4); Q23.T(ctx, 'X = ' + Q23.nf(S.x, 3) + ' m', g.bx0 - S.x * g.pxm / 2, g.ty + 80, { s: 13, w: 900, c: '#1d4ed8' }); }
        if (p.lab !== false) { const rd0 = (g.bx0 - g.rul0) / g.pxm * 100, rd1 = (bl - g.rul0) / g.pxm * 100;
          Q23.T(ctx, 'قراءة المسطرة: البداية ' + Q23.nf(rd0, 3) + ' cm ← الآن ' + Q23.nf(rd1, 3) + ' cm', (g.x0 + g.x1) / 2 + 20, g.ty + 108, { s: 12.5, w: 800, c: '#fff', bg: 'rgba(30,41,59,.8)' }); }
        S._hand = [ring - 30, hookY];
      } else {
        const bx = g.lx - g.bw / 2, bb = g.ty + 2 - S.x * g.pxm, rx = bx - 60;
        // vertical ruler fixed on the table
        K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, rx - 18, g.ty - 6, 46, 12, 3); ctx.fill(); });
        K.ruler(ctx, rx, g.ty - 2, .7 * g.pxm, 70, { rot: -Math.PI / 2 });
        if (p.mark !== false) Q23.block(ctx, bx, g.ty + 2, g.bw, g.bh, { alpha: .22 });
        Q23.block(ctx, bx, bb, g.bw, g.bh); Q23.T(ctx, m + ' kg', bx + g.bw / 2, bb - g.bh / 2, { s: 12, w: 900, c: '#fff' });
        const topY = bb - g.bh - g.bw * .35 * .45; K.raw(ctx, () => { ctx.strokeStyle = '#71717a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.lx + 6, topY - 4, 4, 0, TAU); ctx.stroke(); });
        const ext = Math.max(0, S.F / FMAX) * (g.Lt - 26), ry = topY - 8 - (g.Lt + 56 + 6) - ext + 4;
        Q23.sbal(ctx, g.lx + 6, ry, Math.PI / 2, S.Fs, FMAX, { Lt: g.Lt });
        C2.hand(ctx, g.lx + 6, ry - 4, 1, 1.05, { sleeve: '#0ea5e9', rot: Math.PI / 2 });
        if (p.frc !== false && S.F > .05) Q23.F(ctx, bx + g.bw + 26, bb - g.bh / 2, 0, -clamp(S.Fs * 6, 18, 150), 'F', '#dc2626', 4);
        if (p.disp !== false && S.x > .005) { Q23.F(ctx, bx - 22, g.ty, 0, -S.x * g.pxm, '', '#2563eb', 4); Q23.T(ctx, 'X = ' + Q23.nf(S.x, 3) + ' m', bx - 22 - 60, g.ty - S.x * g.pxm / 2, { s: 13, w: 900, c: '#1d4ed8' }); }
        S._hand = [g.lx + 6, ry - 30];
      }
      if (p.lab !== false) { const d = S.x, Fb = d > .005 ? S.Wi / d : 0;
        Q23.card(ctx, S, [{ t: 'قراءة الميزان الآن: F = ' + Q23.nf(S.Fs, 3) + ' N', c: '#b91c1c' }, { t: 'متوسط القوة أثناء الحركة: ' + Q23.nf(Fb, 3) + ' N', c: '#b91c1c' }, { t: 'الإزاحة: X = ' + Q23.nf(d, 3) + ' m', c: '#1d4ed8' },
          { t: 'F × X = ' + Q23.nf(Fb, 3) + ' × ' + Q23.nf(d, 3) + ' = ' + Q23.nf(S.Wi, 3) + ' J', c: '#15803d', w: 900, s: 13.5 }, { t: lift ? 'الرفع المنتظم: F ≈ الوزن m g = ' + Q23.nf(m * Q23.G, 3) + ' N' : 'السحب المنتظم: F ≈ قوة الاحتكاك', c: '#475569', s: 11.5 }], { title: 'ماذا يمثل F × X ؟ ← الشغل', bd: '#15803d', y: 44 }); }
      Q23.banner(ctx, w, lift ? 'ارفع الجسم عمودياً للأعلى بوساطة الميزان النابضي (اسحب اليد للأعلى)' : 'اسحب الجسم على الطاولة بوساطة الميزان النابضي (اسحب اليد يساراً)', '#0f766e', 20);
      K.party(ctx, S);
    },
    drags(S) {
      if (!S.W) return []; const g = D.geo(S), lift = S.p.mode === 'lift', hp = S._hand || [g.bx0 - 200, g.ty - 40];
      return [{ id: 'hand', x: hp[0], y: hp[1], r: 46, axis: lift ? 'y' : 'x', keep: true, tip: lift ? 'اسحب اليد للأعلى لترفع الجسم' : 'اسحب اليد يساراً لتسحب الجسم', idle: 'اسحب الميزان ✋',
        down: S => { S.drag = 1; S.r0 = S.r; },
        drag: (S, d) => { const dm = lift ? -(d.y - d.sy) / g.pxm : -(d.x - d.sx) / g.pxm; const minR = S.x + g.Lb + (lift ? g.bh / g.pxm : 0) - .01; S.r = clamp(S.r0 + dm, minR, lift ? .62 + g.Lb + g.bh / g.pxm : 1.1 + g.Lb); },
        up: S => { S.drag = 0; if (S.x > .1) K.cheer(S, S.W * .6, S.H * .3); } }];
    },
    readings(S) { const d = S.x; return [rd('قراءة الميزان F', Q23.nf(S.Fs, 3) + ' N'), rd('الإزاحة X', Q23.nf(d, 3) + ' m'), rd('متوسط القوة', Q23.nf(d > .005 ? S.Wi / d : 0, 3) + ' N'), rd('الشغل W = F × X', Q23.nf(S.Wi, 3) + ' J')]; },
    record(S) { if (S.x < .02) { Runner.toast('حرّك الجسم أولاً بوساطة الميزان', 'info'); return null; } const d = S.x; return { md: S.p.mode === 'lift' ? 'رفع عمودي' : 'سحب أفقي', m: S.p.m, F: +(S.Wi / d).toFixed(2), X: +d.toFixed(3), W: +S.Wi.toFixed(2) }; },
    cols: [['md', 'الحالة'], ['m', 'm (kg)'], ['F', 'F (N)'], ['X', 'X (m)'], ['W', 'F × X (J)']],
    graph: { x: 'X', y: 'W', xl: 'الإزاحة X (m)', yl: 'F × X (J)', theory: (x, S) => (S.p.mode === 'lift' ? 1 : MUK) * S.p.m * Q23.G * x, xmin: 0, xmax: .9 },
    explain(S) { const lift = S.p.mode === 'lift';
      if (S.x < .005) return lift ? 'الجسم ساكن على الطاولة: قراءة الميزان أقل من وزنه فلا يرتفع. اسحب للأعلى حتى تصبح القراءة مساوية للوزن.' : 'الجسم ساكن: قوة السحب لم تتغلب بعد على الاحتكاك السكوني، فلا إزاحة ولا شغل.';
      return 'أثّرت قوة مقدارها نحو <b>' + Q23.nf(S.Wi / S.x, 3) + ' N</b> فتحرك الجسم إزاحة <b>' + Q23.nf(S.x, 3) + ' m</b> باتجاهها، فأنجزت شغلاً <b>W = F × X = ' + Q23.nf(S.Wi, 3) + ' J</b>.'; },
    quiz: [
      { q: 'ماذا نعني بالشغل الفيزيائي؟', o: ['أي مجهود عقلي أو عضلي', 'حاصل ضرب القوة في الإزاحة التي يتحركها الجسم باتجاهها', 'حاصل قسمة القوة على الزمن'], a: 1, why: 'مراجعة الدرس س1: الشغل = القوة × الإزاحة باتجاه القوة.' },
      { q: 'هل الشغل كمية قياسية أم اتجاهية؟', o: ['قياسية', 'اتجاهية', 'ليست كمية فيزيائية'], a: 0, why: 'التفكير الناقد س1: يعدّ الشغل من الكميات القياسية (ص 36).' },
      { q: 'ينجز الجسم ......... عندما تؤثر قوة على جسم وتزيحه باتجاهها.', o: ['قدرة', 'شغلاً', 'طاقة كامنة'], a: 1, why: 'مراجعة الفصل س1-1.' }
    ]
  };
  Q23.P[D.id] = D;
})();

/* =========================================================================================
   2) ما الشغل؟ (ص 36–37): الشكل (1) سحب جسم بحبل، الشكل (2) رفع صندوق / حمله والمشي به، دفع خزانة، طرق مسمار، سقوط حجر
   ========================================================================================= */
(() => {
  const KID = { shirt: '#3b82f6', pants: '#3b5b9a', shoe: '#e7e5e4', skin: '#f1c27d', hair: '#7c4a1d' };
  const SC = { fig1: 'الشكل (1): سحب جسم بحبل', lift: 'الشكل (2): رفع صندوق — ينجز شغلاً', carry: 'الشكل (2): حمل الصندوق والمشي — لا ينجز شغلاً', push: 'دفع خزانة لا تتحرك', nail: 'طرق مسمار بمطرقة', stone: 'حجر يسقط باتجاه الأرض' };
  const FNAIL = 600, FWARD = 300;
  const D = { id: 'g8_work_when', ch: 23, sec: 'الدرس 1', page: 36, kind: 'نشاط', fig: 'الشكل 1، الشكل 2',
    title: 'ما الشغل؟ متى تنجز القوة شغلاً (الشكل 1 والشكل 2)',
    desc: 'إذا أثّرت قوة ثابتة (F) في جسم وتحرك الجسم إزاحة (X) بتأثيرها وباتجاهها فإن القوة أنجزت شغلاً W = F × X. أما القوة التي لا تسبب حركة الجسم في اتجاهها فلا تنجز شغلاً.',
    tags: 'الشغل قوة إزاحة جول رفع صندوق حمل المشي دفع خزانة مسمار مطرقة حجر يسقط عمودي',
    tools: ['جسم وحبل', 'صندوق', 'خزانة', 'مطرقة ومسمار', 'حجر'],
    steps: ['الشكل (1): اسحب طرف الحبل يساراً — القوة والإزاحة باتجاه واحد، فتنجز القوة شغلاً W = F × X. جرّب دفع الحبل نحو الجسم: هل يدفعه الحبل؟', 'الشكل (2) يمين: اسحب الصندوق للأعلى ليرفعه الطالب — القوة للأعلى والإزاحة للأعلى ← ينجز شغلاً.', 'الشكل (2) يسار: اسحب الطالب وهو يحمل الصندوق ويمشي أفقياً — القوة عمودية على اتجاه الحركة ← لا ينجز شغلاً (W = 0).', 'دفع الخزانة: اضغط مطولاً على الطفل ليدفع الخزانة. هل تحركت؟ هل أنجز شغلاً رغم تعبه؟ زد قوة الدفع حتى تتحرك.', 'طرق المسمار: اسحب المطرقة للأعلى واتركها لتطرق المسمار. هل أنجزت شغلاً؟', 'سقوط الحجر: اسحب الحجر لأعلى ثم اضغط «أفلت». أي قوة أنجزت شغلاً؟'],
    concl: ['الشغل = القوة × الإزاحة التي يتحركها الجسم باتجاه القوة: W = F × X ، ووحدته الجول (J = N.m).', 'الجول: الشغل الذي تنجزه قوة مقدارها نيوتن واحد عندما تؤثر في جسم وتسبب إزاحته باتجاهها بمقدار متر واحد.', 'عند دفع جسم على الأرض أو رفعه رأسياً للأعلى تنجز القوة شغلاً.', 'القوة التي لا تسبب حركة الجسم في اتجاهها لا تنجز شغلاً: حمل صندوق والمشي به (القوة عمودية على الحركة)، ودفع خزانة لا تتحرك (الإزاحة صفر).', 'ليس كل عمل متعب نقوم به يعدّ شغلاً بالمعنى الفيزيائي (حقيقة علمية).'],
    laws: ['g8_work', 'g8_work0'],
    fact: ['حقيقة علمية: ليس كل عمل متعب نقوم به يعدّ شغلاً بالمعنى الفيزيائي.', 'قراءة كتاب كامل مجهود عقلي متعب، لكنك لم تنجز شغلاً بالمعنى الفيزيائي!', 'عند سقوط الحجر تنجز قوة الجاذبية (وزن الحجر) شغلاً لأن الحجر يتحرك باتجاهها نحو الأسفل.'],
    controls: [SEL('sc', 'المثال', Object.entries(SC).map(([k, v]) => [k, v]), 'fig1', (v, S) => D.reset(S)),
      R('F', 'القوة F (أو وزن الجسم)', 10, 400, 50, 10, 'N', (v, S) => { S.W0 = 0; }),
      BT('', [{ t: '↺ أعد المشهد', on: S => D.reset(S) }]),
      TG('frc', 'سهم القوة F', true, null, 'force'), TG('disp', 'سهم الإزاحة X', true, null, 'vector'), TG('ghost', 'موضع البداية', true, null, 'dot'), TG('lab', 'بطاقة الشغل', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.X = 0; S.hb = 0; S.wx = 0; S.ph = 0; S.hold = 0; S.tp = 0; S.th = .9; S.om = 0; S.nd = 0; S.Wn = 0; S.hits = 0; S.sy = 2.5; S.sv = 0; S.fall = 0; S.sy0 = 2.5; S.rope = 0; S.lean = 0; },
    geo(S) { const w = S.W, h = S.H, gy = h * .8, s0 = clamp(Math.min(h / 800, w / 760), .7, 1.05), pxm = 122 * s0; return { w, h, gy, s0, pxm, ks: 1.5 * pxm / 175, cx: (w + 64) / 2 }; },
    update(S, dt) {
      dt = Math.min(dt, .04); if (!S.W) return; const p = S.p, g = D.geo(S);
      if (p.sc === 'push') { if (S.hold) { S.tp += dt * 60; S.lean = Math.min(.5, S.lean + dt * 2); if (p.F > FWARD) { S.X = Math.min(2.2, S.X + .35 * dt); } } else S.lean = Math.max(0, S.lean - dt * 2); }
      if (p.sc === 'nail' && !S.hold && S.th > 0) { S.om += 55 * dt; S.th -= S.om * dt; if (S.th <= 0) { S.th = 0; const v = S.om * .3, E = .5 * .5 * v * v, dd = Math.min(E / FNAIL, .06 - S.nd); if (dd > 1e-4) { S.nd += dd; S.Wn += FNAIL * dd; S.hits++; } S.om = 0; C2.msg(S, S.nd >= .0599 ? 'دخل المسمار كله في الخشب!' : 'طَق! دخل المسمار ' + Q23.nf(dd * 100, 2) + ' cm', 1.6); if (S.nd >= .0599) K.cheer(S, g.cx, g.gy - 80); } }
      if (p.sc === 'stone' && S.fall) { S.sv += Q23.G * dt; S.sy -= S.sv * dt; if (S.sy <= 0) { S.sy = 0; S.fall = 0; S.sv = 0; C2.msg(S, 'وصل الحجر إلى الأرض', 1.5); } }
    },
    work(S) { const p = S.p;
      if (p.sc === 'fig1') return { F: p.F, X: S.X, W: p.F * S.X, rel: 'القوة والإزاحة باتجاه واحد', ok: S.X > .005 };
      if (p.sc === 'lift') return { F: p.F, X: S.hb, W: p.F * S.hb, rel: 'القوة للأعلى والإزاحة للأعلى', ok: S.hb > .005 };
      if (p.sc === 'carry') return { F: p.F, X: Math.abs(S.wx), W: 0, rel: 'القوة للأعلى ⊥ الإزاحة أفقية (90°)', ok: false };
      if (p.sc === 'push') return { F: p.F, X: S.X, W: p.F * S.X, rel: S.X > 0 ? 'تحركت الخزانة باتجاه القوة' : 'الخزانة لم تتحرك: X = 0', ok: S.X > .005 };
      if (p.sc === 'nail') return { F: FNAIL, X: S.nd, W: S.Wn, rel: 'قوة المطرقة والإزاحة نحو الأسفل', ok: S.nd > 1e-4 };
      const d = Math.max(0, S.sy0 - S.sy); return { F: p.F, X: d, W: p.F * d, rel: 'الوزن للأسفل والإزاحة للأسفل', ok: d > .005, wf: 1 };
    },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S);
      if (p.sc === 'stone') Q23.outdoor(ctx, w, h, g.gy); else K.bg(ctx, w, h, { benchY: g.gy });
      D['d_' + p.sc](ctx, S, g);
      if (p.lab !== false) { const r = D.work(S);
        Q23.card(ctx, S, [{ t: (r.wf ? 'الوزن' : 'القوة') + ': F = ' + Q23.nf(r.F, 4) + ' N', c: '#b91c1c' }, { t: 'الإزاحة: X = ' + Q23.nf(r.X, 3) + ' m', c: '#1d4ed8' }, { t: r.rel, c: '#7c3aed' },
          { t: p.sc === 'carry' ? 'W = 0 (لا إزاحة باتجاه القوة)' : p.sc === 'nail' ? 'W = F × X = ' + FNAIL + ' × ' + Q23.nf(S.nd, 3) + ' = ' + Q23.nf(r.W, 3) + ' J' : 'W = F × X = ' + Q23.nf(r.F, 4) + ' × ' + Q23.nf(r.X, 3) + ' = ' + Q23.nf(r.W, 4) + ' J', c: '#15803d', w: 900, s: 14 }], { title: SC[p.sc], bd: '#15803d', wd: 380 });
        Q23.verdict(ctx, w - 12 - Math.min(380, w * .52) / 2, 44 + 26 + 4 * 21 + 30, r.ok, r.ok ? 'تنجز القوة شغلاً' : 'لا تنجز القوة شغلاً'); }
      Q23.banner(ctx, w, 'الشغل = القوة × الإزاحة   W = F × X', '#15803d', 20);
      C2.drawMsg(ctx, S, g.cx, h * .3); K.party(ctx, S);
    },
    d_fig1(ctx, S, g) {
      const p = S.p, bw = .55 * g.pxm, bh = .45 * g.pxm, bx0 = g.w - 60 - bw, bl = bx0 - S.X * g.pxm, y = g.gy + 2, ry = y - bh * .3, ropeL = 1.2 * g.pxm;
      if (p.ghost !== false) { Q23.block(ctx, bx0, y, bw, bh, { alpha: .3, c1: '#e7c9a0', c2: '#b88655' }); }
      Q23.block(ctx, bl, y, bw, bh, { c1: '#e7c9a0', c2: '#b88655' });
      const re = bl - ropeL + S.rope * g.pxm; // rope end
      K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bl, ry); if (S.rope > .02) ctx.quadraticCurveTo((bl + re) / 2, ry + S.rope * g.pxm * .5, re, ry); else ctx.lineTo(re, ry); ctx.stroke();
        ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(bl, ry); ctx.lineTo(re, ry); ctx.stroke(); ctx.setLineDash([]); ctx.lineCap = 'butt'; });
      C2.hand(ctx, re + 4, ry, 1, 1.15, { sleeve: '#0ea5e9' });
      if (p.frc !== false && S.rope < .02) { Q23.F(ctx, bl - 10, y - bh - 26, -80, 0, '', '#dc2626', 4); Q23.T(ctx, 'اتجاه القوة  F = ' + p.F + ' N', bl - 50, y - bh - 46, { s: 12, w: 900, c: '#b91c1c' }); }
      if (p.disp !== false && S.X > .01) { K.raw(ctx, () => { G.arrow(ctx, bx0 + bw, y + 40, bl + bw, y + 40, '#111827', 3, 12); G.arrow(ctx, bl + bw, y + 40, bx0 + bw, y + 40, '#111827', 3, 12); }); Q23.T(ctx, 'اتجاه الإزاحة  X = ' + Q23.nf(S.X, 3) + ' m', (bx0 + bl) / 2 + bw, y + 62, { s: 12.5, w: 900, c: '#111827' }); }
      S._h = [re - 26, ry];
    },
    kidLift(ctx, S, g, hb, fx, walk) {
      const s = g.ks, dir = 1, bw = .42 * g.pxm, bh = .36 * g.pxm, k = clamp(hb / .85, 0, 1);
      let hip, feet, lean;
      if (walk) { const W = Q23.walk(fx, g.gy, walk, s, dir, .9); hip = W.hip; feet = W.feet; lean = .04; }
      else { lean = .05 + .6 * (1 - k); const hy = g.gy - 96 * s * (.6 + .4 * k); hip = [fx - dir * 16 * s * (1 - k), hy]; feet = [[fx + dir * 8 * s, g.gy], [fx - dir * 6 * s, g.gy]]; }
      const bx = (walk ? hip[0] : fx) + dir * 46 * s, by = g.gy - hb * g.pxm;
      const hands = [[bx - dir * bw * .18, by - bh * .3], [bx + dir * bw * .05, by - bh * .32]];
      Q23.man(ctx, Object.assign({ hip, feet, dir, s, lean, hands, nod: walk ? 0 : -.2 * (1 - k), elb: [-dir, .9], mid: c => Q23.cbox(c, bx, by, bw, bh) }, KID));
      return { bx, by, bw, bh };
    },
    d_lift(ctx, S, g) {
      const p = S.p, fx = g.cx - 40; if (p.ghost !== false && S.hb > .02) K.raw(ctx, () => { ctx.globalAlpha = .25; ctx.setLineDash([5, 4]); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2; ctx.strokeRect(fx + 46 * g.ks - .21 * g.pxm, g.gy - .36 * g.pxm, .42 * g.pxm, .36 * g.pxm); ctx.setLineDash([]); ctx.globalAlpha = 1; });
      const B = D.kidLift(ctx, S, g, S.hb, fx, 0);
      if (p.frc !== false) { Q23.F(ctx, B.bx + B.bw / 2 + 34, B.by - B.bh * .2, 0, -90, '', '#2563eb', 7); Q23.T(ctx, 'اتجاه القوة', B.bx + B.bw / 2 + 34, B.by - B.bh * .2 - 104, { s: 12, w: 900, c: '#1d4ed8' }); }
      if (p.disp !== false) { Q23.F(ctx, B.bx + B.bw / 2 + 80, g.gy, 0, -Math.max(36, S.hb * g.pxm), '', '#2563eb', 7); Q23.T(ctx, 'اتجاه الإزاحة ' + (S.hb > .005 ? '(X = ' + Q23.nf(S.hb, 3) + ' m)' : ''), B.bx + B.bw / 2 + 92, g.gy + 18, { s: 12, w: 900, c: '#1d4ed8' }); }
      S._h = [B.bx, B.by - B.bh / 2];
    },
    d_carry(ctx, S, g) {
      const p = S.p, x0 = g.cx + 60, fx = x0 - S.wx * g.pxm;
      if (p.ghost !== false && S.wx > .05) K.raw(ctx, () => { ctx.setLineDash([5, 4]); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, g.gy - 170 * g.ks); ctx.lineTo(x0, g.gy); ctx.stroke(); ctx.setLineDash([]); });
      ctx.save(); ctx.translate(2 * fx, 0); ctx.scale(-1, 1); // walk to the left like the book (mirror)
      const B = D.kidLift(ctx, S, g, .82, fx, S.ph + .01);
      ctx.restore(); const bx = 2 * fx - B.bx;
      if (p.frc !== false) { Q23.F(ctx, bx, B.by - B.bh - 10, 0, -80, '', '#2563eb', 7); Q23.T(ctx, 'اتجاه القوة', bx, B.by - B.bh - 104, { s: 12, w: 900, c: '#1d4ed8' }); K.raw(ctx, () => { ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.strokeRect(bx, B.by - B.bh - 26, 14, 14); }); }
      if (p.disp !== false) { Q23.F(ctx, fx + 30, g.gy + 34, -Math.max(70, S.wx * g.pxm), 0, '', '#2563eb', 7); Q23.T(ctx, 'اتجاه الإزاحة', fx - 30, g.gy + 56, { s: 12, w: 900, c: '#1d4ed8' }); }
      S._h = [fx, g.gy - 90 * g.ks];
    },
    d_push(ctx, S, g) {
      const p = S.p, s = g.ks, ww = 1.0 * g.pxm, wh = 1.9 * g.pxm, wx = g.cx - 40 - S.X * g.pxm, y = g.gy;
      // wardrobe
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(wx - ww, 0, wx, 0); gr.addColorStop(0, '#7c2d12'); gr.addColorStop(.5, '#b45309'); gr.addColorStop(1, '#78350f'); ctx.fillStyle = gr; ctx.strokeStyle = '#431407'; ctx.lineWidth = 2; rr(ctx, wx - ww, y - wh, ww, wh, 4); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = 'rgba(67,20,7,.7)'; ctx.lineWidth = 2; ctx.strokeRect(wx - ww + 8, y - wh + 10, ww / 2 - 10, wh - 40); ctx.strokeRect(wx - ww / 2 + 2, y - wh + 10, ww / 2 - 10, wh - 40);
        ctx.fillStyle = '#fbbf24'; ctx.fillRect(wx - ww / 2 - 9, y - wh * .55, 4, 20); ctx.fillRect(wx - ww / 2 + 6, y - wh * .55, 4, 20); ctx.fillStyle = '#292524'; ctx.fillRect(wx - ww + 6, y - 8, 10, 8); ctx.fillRect(wx - 16, y - 8, 10, 8); });
      const lean = .12 + S.lean * .9, fx = wx + 95 * s + S.lean * 30 * s, hip = [fx - 22 * s * Math.sin(lean) * 0, y - 96 * s * (.97 - .1 * S.lean)];
      const ft = [[fx + 10 * s, y], [fx + 40 * s * (.4 + S.lean), y]];
      const sh = hip[0] - Math.sin(lean) * 54 * s, shy = hip[1] - Math.cos(lean) * 54 * s;
      Q23.man(ctx, Object.assign({ hip, feet: ft, dir: -1, s, lean, hands: [[wx + 2, shy + 8 * s], [wx + 2, shy + 2 * s]], elb: [1, .5], strain: S.hold }, KID));
      if (S.hold) K.raw(ctx, () => { const t = performance.now() / 300; ctx.fillStyle = '#38bdf8'; [0, 1, 2].forEach(i => { const a = (t + i * .7) % 2; ctx.globalAlpha = 1 - a / 2; ctx.beginPath(); ctx.arc(sh + 18 * s + i * 6, shy - 40 * s + a * 18, 3, 0, TAU); ctx.fill(); }); ctx.globalAlpha = 1; });
      if (p.frc !== false && S.hold) Q23.F(ctx, wx + 30, shy - 28 * s, -80, 0, 'F = ' + p.F + ' N', '#dc2626', 5);
      if (p.disp !== false && S.X > .01) Q23.F(ctx, g.cx - 40, y + 34, -S.X * g.pxm, 0, 'X', '#2563eb', 5);
      if (p.lab !== false) { Q23.T(ctx, 'زمن الدفع: ' + Q23.nf(S.tp / 60, 2) + ' دقيقة', fx, y + 34, { s: 12.5, w: 900, c: '#fff', bg: '#7c3aed' }); Q23.T(ctx, 'أقصى قوة احتكاك سكوني للخزانة ≈ ' + FWARD + ' N', wx - ww / 2, y - wh - 16, { s: 11.5, w: 800, c: '#7c2d12' }); }
      S._h = [hip[0], hip[1] - 20 * s];
    },
    d_nail(ctx, S, g) {
      const p = S.p, y = g.gy, px = 3.2 * g.pxm / 3.2, nx = g.cx - 20, L = .3 * g.pxm * 2.2, nl = .06 * g.pxm * 6, wood = y - 50;
      K.raw(ctx, () => { Q23.block(ctx, nx - 170, y, 300, 50, { c1: '#e7c9a0', c2: '#b88655', d: 40 });
        const top = wood - nl * (1 - S.nd / .06); ctx.fillStyle = '#9ca3af'; ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1; ctx.fillRect(nx - 2.5, top, 5, wood - top + 1); ctx.strokeRect(nx - 2.5, top, 5, wood - top + 1); ctx.fillRect(nx - 9, top - 4, 18, 4); ctx.strokeRect(nx - 9, top - 4, 18, 4); });
      const topN = wood - nl * (1 - S.nd / .06) - 4, piv = [nx + L + 6, topN - 14]; const th = S.th, hx = piv[0] - L * Math.cos(th), hy = piv[1] - L * Math.sin(th);
      K.raw(ctx, () => { ctx.strokeStyle = '#92400e'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(piv[0] + 26 * Math.cos(th), piv[1] + 26 * Math.sin(th)); ctx.lineTo(hx, hy); ctx.stroke(); ctx.lineCap = 'butt';
        ctx.save(); ctx.translate(hx, hy); ctx.rotate(th + Math.PI / 2); const hg = ctx.createLinearGradient(-12, 0, 12, 0); hg.addColorStop(0, '#475569'); hg.addColorStop(.5, '#cbd5e1'); hg.addColorStop(1, '#334155'); ctx.fillStyle = hg; rr(ctx, -13, -30, 26, 50, 4); ctx.fill(); ctx.restore(); });
      K.raw(ctx, () => { ctx.fillStyle = '#0ea5e9'; ctx.save(); ctx.translate(piv[0], piv[1]); ctx.rotate(th); rr(ctx, 14, -14, 70, 28, 8); ctx.fill(); ctx.fillStyle = '#f1c27d'; ctx.strokeStyle = '#9a3412'; ctx.beginPath(); ctx.ellipse(0, 0, 18, 15, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); });
      if (p.frc !== false && S.th < .25 && S.om > 0 || (p.frc !== false && S.hits && S.th < .05)) Q23.F(ctx, nx - 26, topN - 40, 0, 50, 'F', '#dc2626', 4);
      if (p.disp !== false && S.nd > 0) Q23.F(ctx, nx + 30, wood - nl, 0, S.nd / .06 * nl + 4, 'X', '#2563eb', 4);
      if (p.lab !== false) Q23.T(ctx, 'عدد الطرقات: ' + S.hits + ' — عمق المسمار: ' + Q23.nf(S.nd * 100, 3) + ' cm من 6 cm', nx, y + 40, { s: 12.5, w: 900, c: '#fff', bg: 'rgba(30,41,59,.8)' });
      S._h = [hx, hy]; S._hp = piv;
    },
    d_stone(ctx, S, g) {
      const p = S.p, x = g.cx - 40, pxm = Math.min(g.pxm, (g.gy - 110) / 4.2), y0 = g.gy;
      K.raw(ctx, () => { ctx.fillStyle = '#a16207'; ctx.fillRect(x - 120, y0 - 4.2 * pxm, 8, 4.2 * pxm); for (let k = 0; k <= 4; k++) { ctx.fillStyle = '#422006'; ctx.fillRect(x - 124, y0 - k * pxm - 1, 16, 2); } });
      for (let k = 0; k <= 4; k++) Q23.T(ctx, k + ' m', x - 140, y0 - k * pxm, { s: 11, w: 800, c: '#422006' });
      const sy = y0 - S.sy * pxm - 22;
      if (p.ghost !== false && S.sy0 > S.sy + .02) K.raw(ctx, () => { ctx.globalAlpha = .3; ctx.fillStyle = '#78716c'; ctx.beginPath(); ctx.ellipse(x, y0 - S.sy0 * pxm - 22, 26, 20, 0, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; });
      if (!S.fall && S.sy > 0 && S.sy === S.sy0) C2.hand(ctx, x - 4, sy - 17, 1, 1.05, { sleeve: '#16a34a', rot: Math.PI / 2 });
      K.raw(ctx, () => { const gr = ctx.createRadialGradient(x - 8, sy - 8, 3, x, sy, 28); gr.addColorStop(0, '#d6d3d1'); gr.addColorStop(1, '#57534e'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x - 26, sy + 4); ctx.quadraticCurveTo(x - 24, sy - 20, x, sy - 21); ctx.quadraticCurveTo(x + 28, sy - 16, x + 26, sy + 6); ctx.quadraticCurveTo(x + 10, sy + 22, x - 12, sy + 19); ctx.closePath(); ctx.fill(); });
      if (p.frc !== false) Q23.F(ctx, x + 40, sy, 0, 70, 'الوزن w = ' + p.F + ' N', '#dc2626', 5);
      if (p.disp !== false && S.sy0 - S.sy > .02) Q23.F(ctx, x + 120, y0 - S.sy0 * pxm - 22, 0, (S.sy0 - S.sy) * pxm, 'X', '#2563eb', 5);
      const B = D.btns(S); C2.btn(ctx, B[0].x, B[0].y, B[0].w, B[0].h, '✋ أفلت الحجر', { col: '#dc2626', on: S.fall });
      S._h = [x, sy];
    },
    btns(S) { return Q23.row(S.W, S.H * .8 + 70, 1, 170); },
    drags(S) {
      if (!S.W) return []; const g = D.geo(S), p = S.p, h = S._h || [g.cx, g.gy - 100];
      if (p.sc === 'fig1') return [{ id: 'rope', x: h[0], y: h[1], r: 44, axis: 'x', keep: true, tip: 'اسحب طرف الحبل يساراً', idle: 'اسحب الحبل ✋', down: S => { S.x0 = S.X - S.rope; },
        drag: (S, d) => { const u = -(d.x - d.sx) / g.pxm, want = S.x0 + u; if (want > S.X) { S.X = Math.min(want, 3.6); S.rope = 0; } else S.rope = Math.min(.9, S.X - want); }, up: S => { S.rope = 0; } }];
      if (p.sc === 'lift') return [{ id: 'box', x: h[0], y: h[1], r: 50, axis: 'y', keep: true, tip: 'اسحب الصندوق للأعلى أو للأسفل', idle: 'ارفع الصندوق ✋', down: S => { S.h0 = S.hb; }, drag: (S, d) => { S.hb = clamp(S.h0 - (d.y - d.sy) / g.pxm, 0, .95); } }];
      if (p.sc === 'carry') return [{ id: 'kid', x: h[0], y: h[1], r: 60, axis: 'x', keep: true, tip: 'اسحب الطالب ليمشي وهو يحمل الصندوق', idle: 'اسحبني لأمشي ✋', down: S => { S.w0 = S.wx; }, drag: (S, d) => { const n = clamp(S.w0 - (d.x - d.sx) / g.pxm, 0, (g.w - 200) / g.pxm); S.ph += Math.abs(n - S.wx) * 6; S.wx = n; } }];
      if (p.sc === 'push') return [{ id: 'kid', x: h[0], y: h[1], r: 64, axis: 'x', keep: true, tip: 'اضغط مطولاً (أو اسحب نحو الخزانة) ليدفع الطفل الخزانة', idle: 'اضغط لأدفع ✋', down: S => { S.hold = 1; }, drag: S => { S.hold = 1; }, up: S => { S.hold = 0; if (S.X < .005) C2.msg(S, 'تعب الطفل لكن الخزانة لم تتحرك\nفلم ينجز شغلاً (X = 0)', 3); } }];
      if (p.sc === 'nail') return [{ id: 'hammer', x: h[0], y: h[1], r: 40, cx: S._hp[0], cy: S._hp[1], keep: true, tip: 'اسحب المطرقة للأعلى ثم اتركها', idle: 'ارفع المطرقة ✋', down: S => { S.hold = 1; S.om = 0; },
        drag: (S, d) => { const P = S._hp; S.th = clamp(Math.atan2(P[1] - d.y, P[0] - d.x), 0, 1.4); }, up: S => { S.hold = 0; } }];
      const B = D.btns(S);
      return [{ id: 'stone', x: h[0], y: h[1], r: 40, axis: 'y', keep: true, tip: 'اسحب الحجر لأعلى أو أسفل', idle: 'ارفع الحجر ✋', down: S => { S.fall = 0; S.sv = 0; S.h0 = S.sy; }, drag: (S, d) => { const pxm = Math.min(g.pxm, (g.gy - 110) / 4.2); S.sy = clamp(S.h0 - (d.y - d.sy) / pxm, .3, 4); S.sy0 = S.sy; } },
        Q23.btnObj('drop', B[0], S => { if (S.sy > 0) { S.sy0 = S.sy; S.fall = 1; S.sv = 0; } }, { hint: true })];
    },
    readings(S) { const r = D.work(S); return [rd('القوة F', Q23.nf(r.F, 4) + ' N'), rd('الإزاحة X', Q23.nf(r.X, 3) + ' m'), rd('الشغل W', Q23.nf(r.W, 4) + ' J'), rd('النتيجة', r.ok ? 'تنجز القوة شغلاً' : 'لا تنجز شغلاً', 1)]; },
    record(S) { const r = D.work(S); return { sc: SC[S.p.sc], F: +r.F.toFixed(1), X: +r.X.toFixed(3), W: +r.W.toFixed(2), ok: r.ok ? 'نعم' : 'لا' }; },
    cols: [['sc', 'الحالة'], ['F', 'F (N)'], ['X', 'X (m)'], ['W', 'W (J)'], ['ok', 'شغل؟']],
    explain(S) { const p = S.p;
      return { fig1: 'الحبل يسحب الجسم بقوة <b>F</b> فيتحرك باتجاهها، فتنجز القوة شغلاً <b>W = F × X</b>. لاحظ أن الحبل لا يستطيع أن يدفع الجسم!',
        lift: 'الطالب يرفع الصندوق بقوة نحو الأعلى تساوي وزنه، والصندوق يتحرك للأعلى باتجاه القوة ← <b>ينجز شغلاً</b>.',
        carry: 'القوة المؤثرة في الصندوق نحو الأعلى (لحمله) والحركة أفقية؛ القوة <b>عمودية</b> على اتجاه الحركة، فلا إزاحة باتجاه القوة ← <b>الشغل = صفر</b>.',
        push: S.X > 0 ? 'قوة الدفع أكبر من أقصى احتكاك فتحركت الخزانة باتجاه القوة ← أنجز شغلاً.' : 'يتعب الطفل ويبذل مجهوداً لكن الخزانة لا تتحرك (X = 0) ← <b>لا ينجز شغلاً</b>، فليس كل عمل متعب شغلاً.',
        nail: 'المطرقة تؤثر بقوة كبيرة في المسمار نحو الأسفل فيتحرك داخل الخشب باتجاهها ← <b>تنجز شغلاً</b>.',
        stone: 'وزن الحجر (قوة الجاذبية) نحو الأسفل والحجر يتحرك نحو الأسفل باتجاهها ← تنجز الجاذبية شغلاً <b>W = w × h</b>.' }[p.sc]; },
    quiz: [
      { q: 'هل ينجز رافع الأثقال شغلاً في أثناء رفعه ثقلاً إلى الأعلى؟', o: ['نعم، لأن الثقل يتحرك باتجاه القوة', 'لا، لأن الثقل ساكن', 'لا، لأن القوة عمودية على الحركة'], a: 0, why: 'مراجعة الدرس س2: القوة للأعلى والإزاحة للأعلى.' },
      { q: 'أيّ الحالات الآتية لا تنجز شغلاً؟', o: ['طرق مسمار بمطرقة لإدخاله في قطعة خشب', 'طفل يدفع خزانة مدة عشر دقائق من دون أن يحركها', 'حجر يسقط باتجاه الأرض'], a: 1, why: 'مراجعة الفصل س3-3: الخزانة لم تتحرك فالإزاحة صفر.' },
      { q: 'تحركت كرة تحت تأثير قوة، فإذا ازدادت القوة إلى ثلاثة أمثالها وقطعت الإزاحة نفسها فإن الشغل:', o: ['يبقى نفسه', 'يزداد إلى ثلاثة أمثاله', 'يقل إلى الثلث'], a: 1, why: 'مراجعة الدرس س3: W = F × X يتناسب طردياً مع القوة.' }
    ]
  };
  Q23.P[D.id] = D;
})();

/* person carrying / lifting a cardboard box. o: {fx (feet x), gy, s, dir, hb (m, box bottom above floor), pxm, walk (phase or 0), bw, bh, style, label} */
Q23.lifter = (ctx, o) => {
  const s = o.s, dir = o.dir || 1, k = clamp(o.hb / .85, 0, 1), bw = o.bw, bh = o.bh; let hip, feet, lean;
  if (o.walk) { const W = Q23.walk(o.fx, o.gy, o.walk, s, dir, .9); hip = W.hip; feet = W.feet; lean = .04; }
  else { lean = .05 + .6 * (1 - k); hip = [o.fx - dir * 16 * s * (1 - k), o.gy - 96 * s * (.6 + .4 * k)]; feet = [[o.fx + dir * 8 * s, o.gy], [o.fx - dir * 6 * s, o.gy]]; }
  const bx = (o.walk ? hip[0] : o.fx) + dir * 46 * s, by = o.gy - o.hb * o.pxm;
  Q23.man(ctx, Object.assign({ hip, feet, dir, s, lean, hands: [[bx - dir * bw * .18, by - bh * .3], [bx + dir * bw * .05, by - bh * .32]], nod: o.walk ? 0 : -.2 * (1 - k), elb: [-dir, .9], mid: c => o.draw ? o.draw(c, bx, by) : Q23.cbox(c, bx, by, bw, bh, { label: o.label, fs: 13 }) }, o.style || {}));
  return { bx, by };
};
Q23.KID = { shirt: '#3b82f6', pants: '#3b5b9a', shoe: '#e7e5e4', skin: '#f1c27d', hair: '#7c4a1d' };
/* side-view wooden table: centre x, floor y, width w, height h */
Q23.table = (ctx, x, y, w, h) => K.raw(ctx, () => { const tg = ctx.createLinearGradient(0, y - h, 0, y - h + 12); tg.addColorStop(0, '#d97706'); tg.addColorStop(1, '#92400e'); ctx.fillStyle = '#92400e'; ctx.fillRect(x - w / 2 + 8, y - h + 10, 12, h - 10); ctx.fillRect(x + w / 2 - 20, y - h + 10, 12, h - 10); ctx.fillStyle = '#78350f'; ctx.fillRect(x - w / 2 + 12, y - h + 10, w - 24, 10); ctx.fillStyle = tg; rr(ctx, x - w / 2, y - h, w, 13, 3); ctx.fill(); });

/* =========================================================================================
   3) مثال 1 (ص 37): طالب يرفع صندوقاً وزنه 20N لارتفاع 0.5m ثم يمشي به 3m — ما الشغل الكلي؟  + مراجعة الفصل س2-1
   ========================================================================================= */
(() => {
  const D = { id: 'g8_work_ex', ch: 23, sec: 'الدرس 1', page: 37, kind: 'مثال',
    title: 'مثال 1: الشغل الكلي عند رفع صندوق ثم المشي به',
    desc: 'مثال الكتاب: يرفع طالب صندوقاً وزنه 20N لارتفاع 0.5m، ثم يمشي به مسافة 3m. ما الشغل الكلي المبذول على الصندوق؟ وسؤال المراجعة: قوة تدفع طاولة على سطح أملس فتنجز 40J لإزاحة 5m.',
    tags: 'مثال الشغل الكلي صندوق 20N رفع المشي جول حساب طاولة 40J',
    tools: ['طالب', 'صندوق وزنه 20 N', 'مسطرة مترية'],
    steps: ['المرحلة 1: اسحب الصندوق للأعلى ليرفعه الطالب حتى ارتفاع 0.5 m (أو اضغط «▶ نفّذ المثال»). راقب عدّاد الشغل.', 'المرحلة 2: اسحب الطالب ليمشي بالصندوق مسافة 3 m. هل يزداد الشغل؟ لماذا؟', 'اضغط «الخطوة التالية» لترى حل الكتاب خطوة بخطوة.', 'غيّر وزن الصندوق والارتفاع والمسافة وتحقق من أن المسافة الأفقية لا تغيّر الشغل.', 'اختر «س2-1: دفع طاولة» واحسب القوة من الشغل والإزاحة.'],
    concl: ['كي يرفع الطالب الصندوق يؤثر فيه بقوة نحو الأعلى تساوي وزنه: W = F × X = 20 N × 0.5 m = 10 J.', 'في أثناء المشي تكون القوة المؤثرة في الصندوق عمودية على اتجاه الحركة، أي ليس هناك إزاحة باتجاه القوة، لذلك فالشغل المبذول يساوي صفراً.', 'الشغل الكلي = 10 J + 0 = 10 J.', 'من W = F × X نجد F = W ÷ X: طاولة 40 J لإزاحة 5 m تحتاج قوة 8 N.'],
    laws: ['g8_work', 'g8_work0'],
    fact: ['الشغل لا يعتمد على المسافة التي تمشيها ما دامت القوة عمودية على الحركة.', 'لو صعد الطالب بالصندوق سلّماً لأنجز شغلاً على الصندوق لأنه يرتفع باتجاه القوة.'],
    controls: [SEL('ex', 'المثال', [['ex1', '📦 مثال 1: صندوق 20 N'], ['q21', '🪑 س2-1: دفع طاولة (40 J ، 5 m)']], 'ex1', (v, S) => D.pick(S)),
      R('w', 'وزن الصندوق F', 5, 100, 20, 5, 'N', (v, S) => D.reset(S)), R('hh', 'ارتفاع الرفع', .2, 1, .5, .1, 'm', (v, S) => D.reset(S)), R('dd', 'مسافة المشي', 1, 4, 3, .5, 'm', (v, S) => D.reset(S)),
      TG('frc', 'سهم القوة', true, null, 'force'), TG('disp', 'سهم الإزاحة', true, null, 'vector'), TG('ruler', 'مسطرة القياس', true, null, 'grid'), TG('lab', 'خطوات الحل والعدّاد', true, null, 'labels')],
    setup(S) { S.stp = 0; D.reset(S); },
    pick(S) { S.stp = 0; D.reset(S); },
    reset(S) { S.hb = 0; S.wx = 0; S.ph = 0; S.auto = 0; S.tx = 0; },
    geo(S) { const w = S.W, h = S.H, gy = h * .8, pxm = clamp(Math.min(h * .16, (w - 230) / 4.4), 70, 150); return { w, h, gy, pxm, s: 1.5 * pxm / 175, x0: w - 70, cx: (w + 64) / 2 }; },
    update(S, dt) { dt = Math.min(dt, .04); const p = S.p;
      if (S.auto && p.ex === 'ex1') { if (S.hb < p.hh) S.hb = Math.min(p.hh, S.hb + .35 * dt); else if (S.wx < p.dd) { S.wx = Math.min(p.dd, S.wx + .9 * dt); S.ph += .9 * dt * 6; } else { S.auto = 0; K.cheer(S, S.W * .5, S.H * .4); } }
      if (S.auto && p.ex === 'q21') { if (S.tx < 5) { S.tx = Math.min(5, S.tx + 1.2 * dt); S.ph += 1.2 * dt * 6; } else S.auto = 0; } },
    vals(S) { const p = S.p; return { W1: p.w * S.hb, W2: 0, Wt: p.w * S.hb }; },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S); K.bg(ctx, w, h, { benchY: g.gy });
      if (p.ex === 'ex1') {
        const fx = g.x0 - 60 - S.wx * g.pxm;
        if (p.ruler !== false) { K.ruler(ctx, g.x0 - 60 - p.dd * g.pxm - 10, g.gy + 14, p.dd * g.pxm + 20, Math.round(p.dd * 10) / 10 * 100 > 400 ? 400 : p.dd * 100); K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.x0 - 60 - p.dd * g.pxm - 70, g.gy - p.hh * g.pxm, 34, 3); }); Q23.T(ctx, p.hh + ' m', g.x0 - 60 - p.dd * g.pxm - 53, g.gy - p.hh * g.pxm - 12, { s: 11, w: 800 }); }
        ctx.save(); ctx.translate(2 * fx, 0); ctx.scale(-1, 1);
        const B = Q23.lifter(ctx, { fx, gy: g.gy, s: g.s, hb: S.hb, pxm: g.pxm, walk: S.wx > 0 ? S.ph + .01 : 0, bw: .42 * g.pxm, bh: .34 * g.pxm, style: Q23.KID });
        ctx.restore(); const bx = 2 * fx - B.bx;
        Q23.T(ctx, p.w + ' N', bx, B.by - .17 * g.pxm, { s: 12, w: 900, c: '#451a03' });
        if (p.frc !== false) Q23.F(ctx, bx, B.by - .34 * g.pxm - 6, 0, -70, 'F = ' + p.w + ' N', '#dc2626', 5);
        if (p.disp !== false && S.hb > .01) Q23.F(ctx, g.x0 - 10, g.gy, 0, -S.hb * g.pxm, 'X₁ = ' + Q23.nf(S.hb, 2) + ' m', '#2563eb', 5);
        if (p.disp !== false && S.wx > .01) Q23.F(ctx, g.x0 - 60, g.gy + 50, -S.wx * g.pxm, 0, 'X₂ = ' + Q23.nf(S.wx, 2) + ' m', '#7c3aed', 5);
        S._box = [bx, B.by - .17 * g.pxm]; S._kid = [fx, g.gy - 100 * g.s];
        if (p.lab !== false) { const V = D.vals(S);
          Q23.bars(ctx, 290, 100, 210, 170, [{ n: 'رفع', v: V.W1, c: '#16a34a' }, { n: 'مشي', v: 0, c: '#7c3aed' }, { n: 'الكلي', v: V.Wt, c: '#dc2626' }], Math.max(10, p.w * p.hh), 'عدّاد الشغل (J)');
          Q23.solve(ctx, S, [{ t: '1) المعطيات: F = ' + p.w + ' N ، X = ' + p.hh + ' m ، المشي ' + p.dd + ' m', c: '#0f172a' }, { t: '2) الرفع: القوة للأعلى = الوزن ← W = F × X', c: '#dc2626', mono: 1 },
            { t: '   W = ' + p.w + ' N × ' + p.hh + ' m = ' + Q23.nf(p.w * p.hh, 3) + ' J', c: '#1d4ed8', mono: 1 }, { t: '3) المشي: القوة عمودية على الحركة ← W = 0', c: '#7c3aed' }, { t: '4) الشغل الكلي = ' + Q23.nf(p.w * p.hh, 3) + ' + 0 = ' + Q23.nf(p.w * p.hh, 3) + ' J', c: '#15803d', w: 900, s: 14 }], 'مثال 1 — الحل خطوة بخطوة'); }
      } else {
        const tw = .9 * g.pxm, th = .75 * g.pxm, tx = g.x0 - 40 - tw / 2 - S.tx * (g.w - 330) / 5, s = g.s;
        if (p.ruler !== false) { K.ruler(ctx, g.x0 - 40 - tw / 2 - (g.w - 330) - 10, g.gy + 14, (g.w - 330) + 20, 5 * 100 > 500 ? 500 : 500); }
        Q23.table(ctx, tx, g.gy, tw, th);
        const lean = .35, hip = [tx + tw / 2 + 60 * s, g.gy - 92 * s];
        const W = Q23.walk(hip[0] + 6 * s, g.gy, S.ph, s, -1, .8);
        Q23.man(ctx, Object.assign({ hip: [hip[0], W.hip[1] + 4 * s], feet: W.feet.map(f => [f[0] + 14 * s, f[1]]), dir: -1, s, lean, hands: [[tx + tw / 2 + 2, g.gy - th + 6], [tx + tw / 2 + 2, g.gy - th + 2]], elb: [1, .6] }, Q23.KID));
        if (p.frc !== false) Q23.F(ctx, tx, g.gy - th - 30, -70, 0, 'F = ؟', '#dc2626', 5);
        if (p.disp !== false && S.tx > .02) Q23.F(ctx, g.x0 - 40, g.gy + 50, -S.tx * (g.w - 330) / 5, 0, 'X = ' + Q23.nf(S.tx, 2) + ' m', '#2563eb', 5);
        S._kid = [hip[0], g.gy - 80 * s];
        if (p.lab !== false) { Q23.T(ctx, 'الشغل المنجز حتى الآن: ' + Q23.nf(8 * S.tx, 3) + ' J من 40 J', g.cx, g.gy + 84, { s: 13, w: 900, c: '#fff', bg: '#15803d' });
          Q23.solve(ctx, S, [{ t: '1) المعطيات: W = 40 J ، X = 5 m (سطح أملس)', c: '#0f172a' }, { t: '2) القانون: W = F × X ⟸ F = W ÷ X', c: '#dc2626', mono: 1 }, { t: '3) التعويض: F = 40 J ÷ 5 m', c: '#1d4ed8', mono: 1 }, { t: '4) الناتج: F = 8 N  (الاختيار أ)', c: '#15803d', w: 900, s: 14 }], 'مراجعة الفصل س2-1 — الحل'); }
      }
      Q23.banner(ctx, w, p.ex === 'ex1' ? 'مثال 1: الشغل الكلي المبذول على الصندوق' : 'س2-1: ما مقدار القوة المؤثرة على الطاولة؟', '#7c3aed', 20);
      const B = D.btns(S); C2.btn(ctx, B[0].x, B[0].y, B[0].w, B[0].h, '▶ نفّذ المثال', { col: '#16a34a', on: S.auto }); C2.btn(ctx, B[1].x, B[1].y, B[1].w, B[1].h, (S.stp >= 4 || (p.ex === 'q21' && S.stp >= 3)) ? '↺ أخفِ الحل' : 'الخطوة التالية ⟵', { col: '#7c3aed' });
      K.party(ctx, S);
    },
    btns(S) { return Q23.rowL(64, 2, Math.min(150, (S.W * .45 - 90) / 2)); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), p = S.p, B = D.btns(S), n = p.ex === 'ex1' ? 4 : 3;
      const L = [Q23.btnObj('run', B[0], S => { D.reset(S); S.auto = 1; }, { hint: true, idle: 'نفّذ ✋' }), Q23.btnObj('step', B[1], S => { S.stp = S.stp >= n ? 0 : S.stp + 1; if (S.stp === n) K.cheer(S, S.W * .7, S.H * .3); })];
      if (p.ex === 'ex1') {
        if (S.wx < .01 && S._box) L.push({ id: 'box', x: S._box[0], y: S._box[1], r: 46, axis: 'y', keep: true, tip: 'اسحب الصندوق للأعلى', idle: 'ارفع الصندوق ✋', down: S => { S.h0 = S.hb; S.auto = 0; }, drag: (S, d) => { S.hb = clamp(S.h0 - (d.y - d.sy) / g.pxm, 0, p.hh); } });
        if (S.hb >= p.hh - 1e-6 && S._kid) L.push({ id: 'kid', x: S._kid[0], y: S._kid[1], r: 54, axis: 'x', keep: true, tip: 'اسحب الطالب ليمشي بالصندوق', idle: 'امشِ بالصندوق ✋', down: S => { S.w0 = S.wx; S.auto = 0; }, drag: (S, d) => { const v = clamp(S.w0 - (d.x - d.sx) / g.pxm, 0, p.dd); S.ph += Math.abs(v - S.wx) * 6; S.wx = v; } });
      } else if (S._kid) L.push({ id: 'kid', x: S._kid[0], y: S._kid[1], r: 56, axis: 'x', keep: true, tip: 'اسحب الطالب ليدفع الطاولة', idle: 'ادفع الطاولة ✋', down: S => { S.t0 = S.tx; S.auto = 0; }, drag: (S, d) => { const v = clamp(S.t0 - (d.x - d.sx) / ((g.w - 330) / 5), 0, 5); S.ph += Math.abs(v - S.tx) * 6; S.tx = v; } });
      return L; },
    readings(S) { const p = S.p; if (p.ex === 'q21') return [rd('الإزاحة X', Q23.nf(S.tx, 3) + ' m'), rd('القوة F = W ÷ X', '8 N'), rd('الشغل حتى الآن', Q23.nf(8 * S.tx, 3) + ' J')]; const V = D.vals(S); return [rd('ارتفاع الصندوق', Q23.nf(S.hb, 3) + ' m'), rd('مسافة المشي', Q23.nf(S.wx, 3) + ' m'), rd('شغل الرفع', Q23.nf(V.W1, 3) + ' J'), rd('شغل المشي', '0 J'), rd('الشغل الكلي', Q23.nf(V.Wt, 3) + ' J', 1)]; },
    record(S) { const p = S.p; if (p.ex !== 'ex1') { Runner.toast('الجدول لمثال الصندوق', 'info'); return null; } return { w: p.w, h: +S.hb.toFixed(2), d: +S.wx.toFixed(2), W: +(p.w * S.hb).toFixed(2) }; },
    cols: [['w', 'F (N)'], ['h', 'الارتفاع (m)'], ['d', 'المشي (m)'], ['W', 'الشغل الكلي (J)']],
    explain(S) { const p = S.p; if (p.ex === 'q21') return 'نعرف الشغل (40 J) والإزاحة (5 m)، فالقوة <b>F = W ÷ X = 8 N</b>.'; if (S.wx > .01) return 'الطالب يمشي: القوة على الصندوق <b>للأعلى</b> والحركة <b>أفقية</b> ← لا إزاحة باتجاه القوة، فلا يزداد الشغل. الشغل الكلي يبقى <b>' + Q23.nf(p.w * S.hb, 3) + ' J</b>.'; return 'عند الرفع: القوة للأعلى (= الوزن ' + p.w + ' N) والإزاحة للأعلى ← الشغل <b>' + Q23.nf(p.w * S.hb, 3) + ' J</b>.'; },
    quiz: [
      { q: 'ما مقدار القوة المؤثرة على طاولة على سطح أملس إذا أنجز طالب شغلاً 40J لإزاحتها 5m باتجاه القوة؟', o: ['8 N', '200 N', '100 N'], a: 0, why: 'مراجعة الفصل س2-1: F = W ÷ X = 40 ÷ 5 = 8 N.' },
      { q: 'يرفع طالب صندوقاً وزنه 20N لارتفاع 0.5m ثم يمشي به 3m. الشغل الكلي المبذول على الصندوق:', o: ['70 J', '10 J', '60 J'], a: 1, why: 'مثال 1: الرفع 10 J والمشي 0 J.' },
      { q: 'متى تنجز القوة شغلاً فيزيائياً؟', o: ['عندما يتحرك الجسم إزاحة باتجاه القوة', 'عندما يتعب الشخص', 'عندما تكون القوة عمودية على الحركة'], a: 0, why: 'سؤال ص 37.' }
    ]
  };
  Q23.P[D.id] = D;
})();

/* person climbing stairs: u = progress in steps (0 … n); returns hip */
Q23.climber = (ctx, o) => {
  const { x0, gy, sw, shp, n, dir, s } = o, u = clamp(o.u, 0, n);
  const fpos = st => st <= 0 ? [x0 - dir * sw * .55, gy] : [x0 + dir * (Math.min(st, n) - .5) * sw, gy - Math.min(st, n) * shp];
  const foot = i => { const q = (u + i) / 2, k = Math.floor(q), fr = q - k, a = 2 * k + i - 1; let st = a, lift = 0;
    if (fr > .5) { const e = (fr - .5) * 2, ee = e * e * (3 - 2 * e); const A = fpos(clamp(a, 0, n)), B = fpos(clamp(a + 2, 0, n)); return [lerp(A[0], B[0], ee), lerp(A[1], B[1], ee) - Math.sin(e * Math.PI) * shp * .9]; }
    return fpos(clamp(st, 0, n)); };
  const ft = [foot(0), foot(1)], hipx = (ft[0][0] + ft[1][0]) / 2 + dir * 6 * s, top = Math.min(ft[0][1], ft[1][1]), bot = Math.max(ft[0][1], ft[1][1]);
  const hip = [hipx, (top + bot) / 2 - 88 * s];
  const sw2 = Math.sin(u * Math.PI);
  Q23.man(ctx, Object.assign({ hip, feet: ft, dir, s, lean: u > 0 && u < n ? .2 : .03, hands: [[hip[0] + dir * 16 * s * sw2, hip[1] + 6 * s], [hip[0] - dir * 14 * s * sw2, hip[1] + 6 * s]] }, o.style || {}));
  return hip;
};
/* stopwatch dial */
Q23.watch = (ctx, x, y, r, t) => { K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, x - 7, y - r - 12, 14, 10, 3); ctx.fill(); const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 2, x, y, r); g.addColorStop(0, '#fff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.strokeStyle = '#334155'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke();
  ctx.lineWidth = 1.2; for (let k = 0; k < 60; k += 5) { const a = k / 60 * TAU - Math.PI / 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8); ctx.lineTo(x + Math.cos(a) * r * .92, y + Math.sin(a) * r * .92); ctx.stroke(); }
  const a = (t % 60) / 60 * TAU - Math.PI / 2; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r * .78, y + Math.sin(a) * r * .78); ctx.stroke(); });
  Q23.T(ctx, Q23.nf(t, 1) + ' s', x, y + r * .45, { s: 12, w: 900, c: '#0f172a', mono: 1 }); };

/* =========================================================================================
   4) نشاط (ص 37): حساب القدرة — صعود السلّم
   ========================================================================================= */
(() => {
  const WHO = { me: { n: 'أنا', st: Q23.KID }, mate: { n: 'زميلي', st: { shirt: '#16a34a', pants: '#44403c', shoe: '#1f2937', skin: '#e0ac69', hair: '#1c1917' } } };
  const D = { id: 'g8_power_stairs', ch: 23, sec: 'الدرس 1', page: 37, kind: 'نشاط',
    title: 'نشاط: حساب القدرة (صعود السلّم)',
    desc: 'أصعد السلّم ويسجل زميلي الزمن، وأقيس ارتفاع السلّم وأعرف كتلتي من الميزان، ثم أحسب الشغل الذي بذلته وقدرتي، وأقارن بين قدرتي وقدرة زميلي.',
    tags: 'القدرة نشاط سلم صعود زمن ساعة إيقاف واط ارتفاع كتلة وزن ميزان',
    tools: ['سلّم', 'ساعة إيقاف', 'ميزان (لقياس الكتلة)', 'مسطرة'],
    steps: ['قف على الميزان (أسفل السلّم) واقرأ كتلتك، ثم احسب وزنك: w = m × g.', 'قِس ارتفاع السلمة الواحدة وحدّد عدد السلّمات، ثم احسب ارتفاع السلّم h = عدد السلّمات × ارتفاع السلمة.', 'اصعد السلّم: اسحب الطالب على السلّم، أو اضغط «🚶 اصعد مشياً» أو «🏃 اصعد ركضاً». ساعة الإيقاف تسجل الزمن.', 'احسب الشغل الذي بذلته W = w × h ، ثم احسب قدرتك P = W ÷ t ، واضغط «سجّل».', 'اختر «زميلي» وكرّر الخطوات (غيّر الكتلة وطريقة الصعود)، وقارن بين قدرتك وقدرة زميلك في الجدول.'],
    concl: ['الشغل المبذول في صعود السلّم = الوزن × الارتفاع، ولا يعتمد على سرعة الصعود.', 'القدرة = الشغل ÷ الزمن: كلما قلّ زمن الصعود زادت القدرة.', 'من له وزن أكبر ينجز شغلاً أكبر لصعود السلّم نفسه.', 'وحدة القدرة J/s وتسمى واط (watt).'],
    laws: ['g8_power', 'g8_work'],
    fact: ['قدرة الإنسان العادي عند صعود السلّم ركضاً قد تصل إلى بضع مئات من الواط لثوانٍ قليلة.', 'قدرة الحصان الواحد (1 hp) تساوي 746 watt.'],
    controls: [SEL('who', 'من يصعد؟', [['me', '🧒 أنا'], ['mate', '👦 زميلي']], 'me', (v, S) => { setParam(S, 'm', v === 'me' ? 45 : 60); D.reset(S); }),
      R('m', 'الكتلة (قراءة الميزان) m', 30, 80, 45, 1, 'kg', (v, S) => D.reset(S)), R('n', 'عدد السلّمات', 6, 16, 12, 1, '', (v, S) => D.reset(S)), R('sh', 'ارتفاع السلمة الواحدة', 15, 20, 17, 1, 'cm', (v, S) => D.reset(S)),
      TG('frc', 'سهم الوزن', true, null, 'force'), TG('hgt', 'ارتفاع السلّم h', true, null, 'vector'), TG('watch', 'ساعة الإيقاف', true, null, 'stopwatch'), TG('lab', 'بطاقة الحساب', true, null, 'labels')],
    setup(S) { D.reset(S); S.rows = S.rows || []; },
    reset(S) { S.u = 0; S.tm = 0; S.go = 0; S.run = 0; S.done = 0; },
    geo(S) { const w = S.W, h = S.H, p = S.p, gy = h * .86, Hm = p.n * p.sh / 100, sw0 = .3, pxm = clamp(Math.min(h * .5 / Hm, (w - 330) / (p.n * sw0 + .6)), 60, 170);
      return { w, h, gy, pxm, sw: sw0 * pxm, shp: p.sh / 100 * pxm, x0: w - 120, dir: -1, s: 1.5 * pxm / 175, Hm }; },
    update(S, dt) { dt = Math.min(dt, .04); const p = S.p; if (S.go) { S.u += (S.run ? 3.6 : 1.7) * dt; } if (S.u > .02 && !S.done) S.tm += dt; if (S.u >= p.n && !S.done) { S.u = p.n; S.go = 0; S.done = 1; K.cheer(S, S.W * .3, S.H * .3); C2.msg(S, 'وصلت إلى أعلى السلّم!\nالزمن ' + Q23.nf(S.tm, 3) + ' s', 2.5); } },
    vals(S) { const p = S.p, wgt = p.m * Q23.G, H = p.n * p.sh / 100, W = wgt * H; return { wgt, H, W, P: S.done && S.tm > 0 ? W / S.tm : 0 }; },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S), V = D.vals(S); K.bg(ctx, w, h, { benchY: g.gy, top: '#f5f5f4', bottom: '#e7e5e4', tiles: false });
      K.raw(ctx, () => { ctx.fillStyle = '#d6d3d1'; ctx.fillRect(0, g.gy - 8, w, 8); });
      Q23.stairs(ctx, g.x0, g.gy, p.n, g.sw, g.shp, g.dir, { railC: '#f9a8d4' });
      // bathroom scale at the start
      const scx = g.x0 + g.sw * .55; K.raw(ctx, () => { ctx.fillStyle = '#e5e7eb'; ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 1.5; rr(ctx, scx - 34, g.gy - 9, 68, 9, 3); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#0f172a'; rr(ctx, scx - 13, g.gy - 8, 26, 6, 2); ctx.fill(); });
      const on = S.u < .02; Q23.T(ctx, (on ? p.m : 0) + ' kg', scx, g.gy + 16, { s: 12, w: 900, c: '#fff', bg: '#0f172a', mono: 1 });
      const hip = Q23.climber(ctx, { x0: g.x0, gy: g.gy, sw: g.sw, shp: g.shp, n: p.n, dir: g.dir, s: g.s, u: S.u, style: WHO[p.who].st });
      S._hip = hip;
      if (p.frc !== false) Q23.F(ctx, hip[0] + 30, hip[1], 0, 70, 'w = ' + Q23.nf(V.wgt, 4) + ' N', '#dc2626', 4);
      const xt = g.x0 + g.dir * p.n * g.sw;
      if (p.hgt !== false) { K.raw(ctx, () => { G.arrow(ctx, xt - 26, g.gy, xt - 26, g.gy - p.n * g.shp, '#2563eb', 3, 11); G.arrow(ctx, xt - 26, g.gy - p.n * g.shp, xt - 26, g.gy, '#2563eb', 3, 11); }); Q23.T(ctx, 'h = ' + p.n + ' × ' + p.sh + ' cm = ' + Q23.nf(V.H, 3) + ' m', xt - 30, g.gy - p.n * g.shp / 2, { s: 12.5, w: 900, c: '#fff', bg: '#2563eb', a: 'right' }); }
      if (p.watch !== false) Q23.watch(ctx, 120, g.gy - 60 - (p.n * g.shp > g.gy * .5 ? 0 : 0) + (xt - 26 < 220 ? -p.n * g.shp - 70 : 0), 34, S.tm);
      if (p.lab !== false) Q23.card(ctx, S, [{ t: 'الوزن: w = m g = ' + p.m + ' × 9.8 = ' + Q23.nf(V.wgt, 4) + ' N', c: '#b91c1c' }, { t: 'الارتفاع: h = ' + Q23.nf(V.H, 3) + ' m', c: '#1d4ed8' }, { t: 'الشغل: W = w × h = ' + Q23.nf(V.W, 4) + ' J', c: '#15803d' }, { t: 'الزمن: t = ' + Q23.nf(S.tm, 3) + ' s', c: '#7c3aed' },
        { t: S.done ? 'القدرة: P = W ÷ t = ' + Q23.nf(V.W, 4) + ' ÷ ' + Q23.nf(S.tm, 3) + ' = ' + Q23.nf(V.P, 4) + ' watt' : 'القدرة: اصعد حتى النهاية أولاً…', c: '#dc2626', w: 900, s: 13.5 }], { title: 'حساب القدرة — ' + WHO[p.who].n, bd: '#dc2626', wd: 390 });
      const B = D.btns(S); C2.btn(ctx, B[0].x, B[0].y, B[0].w, B[0].h, '🚶 اصعد مشياً', { col: '#16a34a', on: S.go && !S.run }); C2.btn(ctx, B[1].x, B[1].y, B[1].w, B[1].h, '🏃 اصعد ركضاً', { col: '#ea580c', on: S.go && S.run }); C2.btn(ctx, B[2].x, B[2].y, B[2].w, B[2].h, '↺ من جديد', { col: '#475569' });
      Q23.banner(ctx, w, 'القدرة = الشغل ÷ الزمن   P = W / t', '#dc2626', 20);
      C2.drawMsg(ctx, S, w * .45, h * .35); K.party(ctx, S);
    },
    btns(S) { return Q23.rowL(64, 3, Math.min(125, (S.W * .48 - 90) / 3)); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), B = D.btns(S), p = S.p;
      const L = [Q23.btnObj('walk', B[0], S => { if (S.done) D.reset(S); S.go = 1; S.run = 0; }, { hint: true }), Q23.btnObj('run', B[1], S => { if (S.done) D.reset(S); S.go = 1; S.run = 1; }), Q23.btnObj('again', B[2], S => D.reset(S))];
      if (S._hip) L.push({ id: 'climber', x: S._hip[0], y: S._hip[1] + 20, r: 56, dir: Math.atan2(-g.shp, -g.sw), keep: true, tip: 'اسحب الطالب على السلّم للأعلى', idle: 'اصعد السلّم ✋', down: S => { if (S.done) D.reset(S); S.go = 0; },
        drag: (S, d) => { if (S.done) return; const u = (g.x0 - d.x) / g.sw + .3; S.u = clamp(Math.max(S.u, Math.min(u, S.u + .6)), 0, p.n); } });
      return L; },
    readings(S) { const V = D.vals(S); return [rd('الوزن w', Q23.nf(V.wgt, 4) + ' N'), rd('الارتفاع h', Q23.nf(V.H, 3) + ' m'), rd('الشغل W', Q23.nf(V.W, 4) + ' J'), rd('الزمن t', Q23.nf(S.tm, 3) + ' s'), rd('القدرة P', S.done ? Q23.nf(V.P, 4) + ' watt' : '—', 1)]; },
    record(S) { if (!S.done) { Runner.toast('اصعد السلّم حتى النهاية أولاً', 'info'); return null; } const V = D.vals(S); return { who: WHO[S.p.who].n, m: S.p.m, h: +V.H.toFixed(2), t: +S.tm.toFixed(2), W: +V.W.toFixed(1), P: +V.P.toFixed(1) }; },
    cols: [['who', 'الطالب'], ['m', 'm (kg)'], ['h', 'h (m)'], ['t', 't (s)'], ['W', 'W (J)'], ['P', 'P (watt)']],
    explain(S) { const V = D.vals(S); if (!S.done) return 'اصعد السلّم وراقب ساعة الإيقاف. الشغل الذي ستنجزه = الوزن × الارتفاع = <b>' + Q23.nf(V.W, 4) + ' J</b> مهما كانت سرعتك.'; return 'أنجزت <b>' + Q23.nf(V.W, 4) + ' J</b> خلال <b>' + Q23.nf(S.tm, 3) + ' s</b> فقدرتك <b>' + Q23.nf(V.P, 4) + ' watt</b>. اصعد ركضاً: الشغل نفسه في زمن أقل ← قدرة أكبر.'; },
    quiz: [
      { q: 'أيهما أكبر قدرة: شخص يصعد السلّم في 2s أم يصعد السلّم نفسه في 5s؟', o: ['في 2s', 'في 5s', 'متساويتان'], a: 0, why: 'مراجعة الدرس س4: الشغل نفسه وزمن أقل ← قدرة أكبر.' },
      { q: 'صعد رجل كتلته 75kg سلّماً ارتفاعه الشاقولي 10m خلال 15s، قدرته تساوي:', o: ['490 watt', '50 watt', '7350 watt'], a: 0, why: 'مراجعة الدرس س5: P = 75 × 9.8 × 10 ÷ 15 = 490 watt.' },
      { q: 'الطالب الذي ينجز شغلاً وهو يصعد السلّم في 5s له قدرة ......... مما لو يصعد السلّم في 7s.', o: ['أكبر', 'أقل', 'تساوي'], a: 0, why: 'مراجعة الفصل س2-6.' }
    ]
  };
  Q23.P[D.id] = D;
})();

/* grooved pulley wheel */
Q23.pulley = (ctx, x, y, r, ang = 0) => K.raw(ctx, () => { const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 1, x, y, r); g.addColorStop(0, '#e5e7eb'); g.addColorStop(1, '#6b7280'); ctx.fillStyle = g; ctx.strokeStyle = '#374151'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r * .78, 0, TAU); ctx.stroke(); for (let k = 0; k < 3; k++) { const a = ang + k * TAU / 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r * .75, y + Math.sin(a) * r * .75); ctx.stroke(); } ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(x, y, r * .18, 0, TAU); ctx.fill(); });
/* bucket of building materials: bottom centre */
Q23.bucket = (ctx, x, y, s = 1, lab) => { K.raw(ctx, () => { const w1 = 34 * s, w2 = 26 * s, hh = 32 * s; const g = ctx.createLinearGradient(x - w1 / 2, 0, x + w1 / 2, 0); g.addColorStop(0, '#6b7280'); g.addColorStop(.4, '#d1d5db'); g.addColorStop(1, '#4b5563');
  ctx.fillStyle = '#b45309'; for (let k = 0; k < 5; k++) { rr(ctx, x - w1 / 2 + 2 + k * 6 * s, y - hh - 8 * s + (k % 2) * 3, 10 * s, 7 * s, 1); ctx.fill(); }
  ctx.fillStyle = g; ctx.strokeStyle = '#374151'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(x - w1 / 2, y - hh); ctx.lineTo(x - w2 / 2, y); ctx.lineTo(x + w2 / 2, y); ctx.lineTo(x + w1 / 2, y - hh); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y - hh, w1 / 2, Math.PI, TAU); ctx.stroke(); }); if (lab) Q23.T(ctx, lab, x, y - 14 * s, { s: 11, w: 900, c: '#fff', bg: 'rgba(30,41,59,.85)' }); };

/* =========================================================================================
   5) ما القدرة؟ (ص 37–38): عاملا بناء يرفعان مواد بناء وزنها 200N لمسافة 5m في 2min و 5min + القدرة الحصانية
   ========================================================================================= */
(() => {
  const FAST = 30; // time-lapse factor
  const D = { id: 'g8_power_def', ch: 23, sec: 'الدرس 1', page: 37, kind: 'نشاط',
    title: 'ما القدرة؟ عاملا البناء والقدرة الحصانية',
    desc: 'عاملا بناء يتسابقان في رفع مواد بناء وزنها 200N لمسافة 5m؛ الأول يحتاج 2min والثاني 5min. أيّ العاملين ذو قدرة أكبر؟ القدرة = الشغل المنجز ÷ الزمن المستغرق. ومقارنة آلتين قدرتهما 1500watt و 1000watt.',
    tags: 'القدرة واط عامل بناء رفع بكرة زمن القدرة الحصانية hp 746 آلة محرك',
    tools: ['سقالة وبكرتان', 'دلوا مواد بناء (200 N)', 'ساعة'],
    steps: ['اضغط «▶ ابدأ السباق»: يرفع كل عامل مواد البناء (200 N) إلى ارتفاع 5 m. الزمن مسرّع ×30 (الساعة تعرض الزمن الحقيقي).', 'أو اسحب يدي أيّ عامل نحو الأسفل لتسحب الحبل بنفسك وراقب ساعته.', 'قارن: هل أنجز العاملان الشغل نفسه؟ أيهما استغرق زمناً أقل؟ أيهما ذو قدرة أكبر؟', 'غيّر زمن كل عامل ولاحظ تغيّر القدرة P = W / t.', 'اختر «آلتان: 1500 watt و 1000 watt» لتقارن آلتين ترفعان الحمل نفسه، ولاحظ قدرتيهما بالقدرة الحصانية (hp = 746 watt).'],
    concl: ['القدرة: معدل الشغل المنجز خلال وحدة الزمن: P = W / t.', 'قدرة العامل الأول أكبر من قدرة العامل الثاني لأنه أنجز الشغل نفسه بوقت أقل.', 'تزداد القدرة بزيادة الشغل المنجز خلال زمن معين، أو عند إنجاز الشغل نفسه بوقت أقل.', 'تقاس القدرة بوحدة J/s وتسمى واط (watt)، ومن وحداتها القدرة الحصانية: hp = 746 watt (لقياس قدرة الآلات مثل المضخة ومحرك السيارة).', 'الآلة الأفضل هي ذات القدرة الأكبر (1500 watt) لأنها تنجز الشغل نفسه بزمن أقل.'],
    laws: ['g8_power', 'g8_hp'],
    fact: ['سمّيت وحدة القدرة «الواط» باسم العالم جيمس واط مخترع المحرك البخاري، وهو الذي اقترح «القدرة الحصانية» لمقارنة محركه بقدرة الحصان.', 'محرك سيارة صغيرة قد تبلغ قدرته نحو 100 hp ≈ 74600 watt.'],
    controls: [SEL('sc', 'المشهد', [['men', '👷 عاملا البناء (الكتاب)'], ['mach', '⚙️ آلتان: 1500 watt و 1000 watt']], 'men', (v, S) => D.reset(S)),
      R('t1', 'زمن العامل الأول', 1, 6, 2, .5, 'min', (v, S) => D.reset(S)), R('t2', 'زمن العامل الثاني', 1, 6, 5, .5, 'min', (v, S) => D.reset(S)),
      R('F', 'وزن مواد البناء F', 100, 400, 200, 50, 'N', (v, S) => D.reset(S)), R('h', 'الارتفاع', 2, 6, 5, 1, 'm', (v, S) => D.reset(S)),
      TG('frc', 'أسهم القوة', true, null, 'force'), TG('clock', 'الساعات', true, null, 'stopwatch'), TG('bar', 'مقارنة القدرة (أعمدة)', true, null, 'graph'), TG('lab', 'بطاقة الحساب', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.y = [0, 0]; S.tt = [0, 0]; S.go = 0; S.man = [0, 0]; S.fin = [0, 0]; },
    spec(S) { const p = S.p; if (p.sc === 'mach') return [{ n: 'الآلة 1', P: 1500, F: 3000, h: 10 }, { n: 'الآلة 2', P: 1000, F: 3000, h: 10 }].map(q => Object.assign(q, { W: q.F * q.h, t: q.F * q.h / q.P }));
      return [{ n: 'العامل الأول', t: p.t1 * 60 }, { n: 'العامل الثاني', t: p.t2 * 60 }].map(q => Object.assign(q, { F: p.F, h: p.h, W: p.F * p.h, P: p.F * p.h / q.t })); },
    geo(S) { const w = S.W, h = S.H, gy = h * .86, H = S.p.sc === 'mach' ? 10 : S.p.h, pxm = (gy - 150) / (H + .6); return { w, h, gy, pxm, H, xs: [(w + 64) / 2 + 20, (w + 64) / 2 - Math.min(210, w * .26)], s: 1.7 * Math.min(pxm, 95) / 175 }; },
    update(S, dt) { dt = Math.min(dt, .04); const sp = D.spec(S), f = S.p.sc === 'mach' ? 1 : FAST;
      [0, 1].forEach(i => { if (S.fin[i]) return; if (S.go && !S.man[i]) S.y[i] = Math.min(sp[i].h, S.y[i] + sp[i].h / sp[i].t * dt * f); if (S.go || S.man[i]) { if (S.y[i] > 0) S.tt[i] += dt * f; } if (S.y[i] >= sp[i].h - 1e-6) { S.y[i] = sp[i].h; S.fin[i] = 1; C2.msg(S, sp[i].n + ' أنهى الرفع في ' + Q23.nf(S.tt[i] / (S.p.sc === 'mach' ? 1 : 60), 3) + (S.p.sc === 'mach' ? ' s' : ' min'), 2); } });
      if (S.fin[0] && S.fin[1] && S.go) { S.go = 0; K.cheer(S, S.W * .5, S.H * .4); } },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S), sp = D.spec(S), mach = p.sc === 'mach';
      Q23.outdoor(ctx, w, h, g.gy, { g1: '#d6d3d1', g2: '#a8a29e' });
      const topY = g.gy - g.H * g.pxm - 30;
      // building (brick wall) behind
      K.raw(ctx, () => { const bx0 = Math.min(...g.xs) - 140, bx1 = Math.max(...g.xs) + 100; ctx.fillStyle = '#fca5a5'; ctx.fillRect(bx0, topY + 30, bx1 - bx0, g.gy - topY - 30); ctx.strokeStyle = 'rgba(127,29,29,.25)'; ctx.lineWidth = 1; for (let y = topY + 30; y < g.gy; y += 14) { ctx.beginPath(); ctx.moveTo(bx0, y); ctx.lineTo(bx1, y); ctx.stroke(); for (let x = bx0 + ((y / 14 | 0) % 2) * 15; x < bx1; x += 30) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 14); ctx.stroke(); } } ctx.fillStyle = '#78716c'; ctx.fillRect(bx0 - 6, topY + 22, bx1 - bx0 + 12, 10); });
      const scale = mach ? 10 : 1;
      sp.forEach((q, i) => {
        const x = g.xs[i], px = x, by = g.gy - S.y[i] * g.pxm;
        K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(px - 4, topY - 10, 8, g.gy - topY + 10); ctx.fillRect(px - 4, topY - 14, 70, 8); });
        Q23.pulley(ctx, px + 40, topY + 8, 15, -S.y[i] * 3);
        const rx1 = px + 55, rx2 = px + 25; // rope: right side to bucket, left side to puller
        let hy;
        if (!mach) { const ph = S.y[i] * 9; const s = g.s, hip = [rx2 - 26 * s, g.gy - 92 * s];
          const hn = [rx2, hip[1] - 70 * s + Math.sin(ph) * 14 * s], hf = [rx2, hip[1] - 70 * s - Math.sin(ph) * 14 * s]; hy = Math.min(hn[1], hf[1]);
          K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(rx2, topY + 8); ctx.lineTo(rx2, g.gy - 8); ctx.quadraticCurveTo(rx2 + 10, g.gy, rx2 + 30, g.gy - 2); ctx.stroke(); });
          Q23.man(ctx, Object.assign({ hip, dir: 1, s, lean: -.12, hands: [hn, hf], feet: [[hip[0] + 12 * s, g.gy], [hip[0] - 16 * s, g.gy]], elb: [-1, .3], cap: '#facc15', sleeve: 'long' }, i ? { shirt: '#ea580c', pants: '#3f3f46', skin: '#e0ac69', hair: '#1c1917' } : { shirt: '#0284c7', pants: '#1e3a8a', skin: '#f1c27d', hair: '#3b2414' }));
          S['_h' + i] = [rx2, hy + 20];
        } else { // electric winch
          K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(rx2, topY + 8); ctx.lineTo(rx2, g.gy - 40); ctx.stroke(); const mg = ctx.createLinearGradient(0, g.gy - 60, 0, g.gy); mg.addColorStop(0, i ? '#60a5fa' : '#f59e0b'); mg.addColorStop(1, i ? '#1d4ed8' : '#b45309'); ctx.fillStyle = mg; rr(ctx, rx2 - 70, g.gy - 58, 80, 58, 6); ctx.fill(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(rx2, g.gy - 40, 14, 0, TAU); ctx.fill(); ctx.strokeStyle = '#94a3b8'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(rx2 - 64, g.gy - 50 + k * 10); ctx.lineTo(rx2 - 26, g.gy - 50 + k * 10); ctx.stroke(); } });
          Q23.T(ctx, q.P + ' watt ≈ ' + Q23.nf(q.P / 746, 3) + ' hp', rx2 - 20, g.gy + 18, { s: 12, w: 900, c: '#fff', bg: i ? '#1d4ed8' : '#b45309' }); S['_h' + i] = [rx2 - 30, g.gy - 30]; }
        K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(rx1, topY + 8); ctx.lineTo(rx1, by - 40); ctx.stroke(); });
        Q23.bucket(ctx, rx1, by, mach ? 1.4 : 1, q.F + ' N');
        if (p.frc !== false) Q23.F(ctx, rx1 + 28, by - 30, 0, -50, 'F', '#dc2626', 4);
        if (p.clock !== false) Q23.watch(ctx, x + 120, g.gy - 46, 26, S.tt[i]);
        Q23.T(ctx, q.n, x - 44, topY + 44, { s: 12.5, w: 900, c: '#fff', bg: i ? '#ea580c' : '#0284c7' });
        if (!mach && p.clock !== false) Q23.T(ctx, Q23.nf(S.tt[i] / 60, 2) + ' min', x + 120, g.gy - 90, { s: 11.5, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.85)' });
      });
      K.raw(ctx, () => { ctx.setLineDash([6, 4]); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(80, g.gy - g.H * g.pxm - 4); ctx.lineTo(w - 20, g.gy - g.H * g.pxm - 4); ctx.stroke(); ctx.setLineDash([]); });
      Q23.T(ctx, 'h = ' + g.H + ' m', 110, g.gy - g.H * g.pxm - 16, { s: 12, w: 900, c: '#15803d' });
      if (!mach) Q23.T(ctx, '⏩ الزمن مسرّع ' + FAST + ' مرة', 140, g.gy + 26, { s: 11.5, w: 800, c: '#fff', bg: '#475569' });
      if (p.lab !== false) Q23.card(ctx, S, sp.map((q, i) => ({ t: q.n + ': W = ' + q.F + ' × ' + q.h + ' = ' + q.W + ' J ، t = ' + Q23.nf(q.t, 3) + ' s ← P = ' + Q23.nf(q.P, 3) + ' watt', c: i ? '#c2410c' : '#0369a1', s: 12 })).concat([{ t: sp[0].P > sp[1].P ? 'الشغل نفسه، و' + sp[0].n + ' أسرع ← قدرته أكبر' : sp[0].P < sp[1].P ? 'الشغل نفسه، و' + sp[1].n + ' أسرع ← قدرته أكبر' : 'الزمن نفسه ← القدرة نفسها', c: '#15803d', w: 900 }]), { title: 'القدرة = الشغل ÷ الزمن', bd: '#dc2626', wd: 470, f: .66, y: 44 });
      if (p.bar !== false) Q23.bars(ctx, w - 12, 160, 170, 140, sp.map((q, i) => ({ n: i ? '2' : '1', v: q.P, c: i ? '#ea580c' : '#0284c7' })), Math.max(sp[0].P, sp[1].P) * 1.1, 'القدرة (watt)');
      const B = D.btns(S); C2.btn(ctx, B[0].x, B[0].y, B[0].w, B[0].h, '▶ ابدأ السباق', { col: '#16a34a', on: S.go }); C2.btn(ctx, B[1].x, B[1].y, B[1].w, B[1].h, '↺ من جديد', { col: '#475569' });
      C2.drawMsg(ctx, S, (w + 64) / 2, h * .42); K.party(ctx, S);
    },
    btns(S) { return Q23.rowL(64, 2, 130); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), B = D.btns(S), sp = D.spec(S);
      const L = [Q23.btnObj('go', B[0], S => { D.reset(S); S.go = 1; }, { hint: true, idle: 'ابدأ ✋' }), Q23.btnObj('again', B[1], S => D.reset(S))];
      if (S.p.sc === 'men') [0, 1].forEach(i => { const hh = S['_h' + i]; if (hh) L.push({ id: 'pull' + i, x: hh[0], y: hh[1], r: 40, dir: Math.PI / 2, keep: true, hint: i === 0, tip: 'اسحب الحبل للأسفل لترفع المواد', idle: 'اسحب الحبل للأسفل ✋', down: S => { S.man[i] = 1; S.ly = null; },
        drag: (S, d) => { if (S.fin[i]) return; if (d.dy > 0) { S.y[i] = Math.min(sp[i].h, S.y[i] + d.dy / g.pxm * .5); S['y' + i] = S.y[i]; } }, up: S => { S.man[i] = 0; } }); });
      return L; },
    readings(S) { const sp = D.spec(S); return sp.map((q, i) => rd(q.n, 'W = ' + q.W + ' J ، P = ' + Q23.nf(q.P, 3) + ' watt ≈ ' + Q23.nf(q.P / 746, 3) + ' hp', 1)).concat([rd('الارتفاعان الآن', Q23.nf(S.y[0], 3) + ' m ، ' + Q23.nf(S.y[1], 3) + ' m', 1)]); },
    record(S) { const R2 = D.spec(S).map(q => ({ n: q.n, W: q.W, t: +q.t.toFixed(1), P: +q.P.toFixed(2), hp: +(q.P / 746).toFixed(4) })); S.rows.push(R2[0]); return R2[1]; },
    cols: [['n', 'المنجز'], ['W', 'W (J)'], ['t', 't (s)'], ['P', 'P (watt)'], ['hp', 'P (hp)']],
    explain(S) { const sp = D.spec(S); return 'كلٌّ منهما ينجز الشغل نفسه <b>' + sp[0].W + ' J</b>، لكن ' + sp[0].n + ' ينجزه في ' + Q23.nf(sp[0].t, 3) + ' s و' + sp[1].n + ' في ' + Q23.nf(sp[1].t, 3) + ' s؛ الأسرع قدرته أكبر لأن <b>P = W / t</b>.'; },
    quiz: [
      { q: 'أيهما أفضل ماكنة قدرتها 1500watt أم 1000watt؟', o: ['1500 watt', '1000 watt', 'متساويتان'], a: 0, why: 'التفكير الناقد س2: تنجز الشغل نفسه بزمن أقل.' },
      { q: 'تستعمل القدرة الحصانية لقياس قدرة المضخة ومحرك السيارة، وهي تساوي:', o: ['746 watt', '647 watt', '764 watt'], a: 0, why: 'مراجعة الفصل س2-3.' },
      { q: '......... هي معدل الشغل المنجز خلال وحدة الزمن.', o: ['الطاقة', 'القدرة', 'الجول'], a: 1, why: 'مراجعة الفصل س1-4.' }
    ]
  };
  Q23.P[D.id] = D;
})();

/* =========================================================================================
   6) مثال 2 (ص 38): رجل يرفع جسماً كتلته 30Kg لارتفاع مترين خلال دقيقة — ما قدرته؟  + أسئلة المراجعة (س5 ، س5 الفصل ، س6)
   ========================================================================================= */
(() => {
  const EX = {
    ex2: { n: 'مثال 2: رفع جسم 30 kg', m: 30, h: 2, t: 60, k: 'pulley', q: 'يرفع رجل جسماً كتلته 30Kg إلى ارتفاع مترين، ما قدرته إذا رفع الجسم خلال دقيقة واحدة؟' },
    q5: { n: 'س5 الدرس: رجل 75 kg يصعد سلّماً 10 m', m: 75, h: 10, t: 15, k: 'ladder', q: 'صعد رجل كتلته 75Kg سلماً ارتفاعه الشاقولي 10m خلال 15s، جِد قدرة الرجل.' },
    q5b: { n: 'س5 الفصل: رافع أثقال 500 N', w: 500, h: 2.5, t: 50, k: 'lifter', q: 'رافع أثقال يرفع ثقلاً وزنه 500N من الأرض إلى موقع أعلى من رأسه إزاحة 2.5m. احسب الشغل، وقدرته إذا أكمل رفع الثقل خلال 50s.' },
    q6: { n: 'س6 الفصل: أحمد يصعد السلّم 20 s', E: 10000, t: 20, k: 'stairs', q: 'يصعد أحمد السلّم في 20s، إذا كان يحوّل 10000J من الطاقة التي يمتلكها جسمه إلى طاقة حركية فما قدرته؟' }
  };
  const D = { id: 'g8_power_ex', ch: 23, sec: 'الدرس 1', page: 38, kind: 'مثال',
    title: 'مثال 2: حساب القدرة خطوة بخطوة (P = W / t)',
    desc: 'مثال الكتاب: يرفع رجل جسماً كتلته 30Kg إلى ارتفاع مترين خلال دقيقة واحدة، فقدرته 9.8 watt. ومسائل المراجعة: رجل 75Kg يصعد 10m في 15s، رافع أثقال 500N لإزاحة 2.5m في 50s، وأحمد يحوّل 10000J في 20s.',
    tags: 'مثال القدرة واط حساب رفع كتلة 30 kg سلم رافع أثقال 500N 10000J',
    tools: ['بكرة وحبل', 'سلّم', 'ثقل', 'ساعة'],
    steps: ['اختر المسألة: «مثال 2» (الكتاب) أو إحدى مسائل المراجعة.', 'اضغط «▶ نفّذ» لترى الحركة والساعة تعدّ الزمن (الزمن الطويل مسرّع، والساعة تعرض الزمن الحقيقي).', 'اضغط «الخطوة التالية» لترى الحل: المعطيات ← الشغل ← القانون ← التعويض ← الناتج.', 'غيّر الكتلة أو الارتفاع أو الزمن ولاحظ تغيّر القدرة.'],
    concl: ['القدرة P = W / t ، والشغل في الرفع W = m × g × h (أي الوزن × الارتفاع).', 'مثال 2: P = 30 × 9.8 × 2 ÷ 60 = 9.8 watt.', 'رجل 75 kg يصعد 10 m في 15 s: P = 7350 ÷ 15 = 490 watt.', 'رافع الأثقال: W = 500 × 2.5 = 1250 J و P = 1250 ÷ 50 = 25 watt.', 'أحمد: P = 10000 ÷ 20 = 500 watt.'],
    laws: ['g8_power', 'g8_work'],
    fact: ['قدرة 9.8 watt أقل من قدرة مصباح صغير! لكن الرجل يستطيع زيادتها إذا رفع الجسم بسرعة أكبر.'],
    controls: [SEL('ex', 'المسألة', Object.entries(EX).map(([k, v]) => [k, v.n]), 'ex2', (v, S) => D.pick(S)),
      R('m', 'الكتلة m', 10, 120, 30, 1, 'kg', (v, S) => D.reset(S)), R('h', 'الارتفاع h', 1, 10, 2, .5, 'm', (v, S) => D.reset(S)), R('t', 'الزمن t', 5, 120, 60, 1, 's', (v, S) => D.reset(S)),
      TG('frc', 'سهم القوة', true, null, 'force'), TG('clock', 'الساعة', true, null, 'stopwatch'), TG('lab', 'خطوات الحل', true, null, 'labels')],
    setup(S) { D.pick(S); },
    pick(S) { const e = EX[S.p.ex]; S.stp = 0; if (e.m) setParam(S, 'm', e.m, false); if (e.w) setParam(S, 'm', +(e.w / 9.8).toFixed(0), false); if (e.h) setParam(S, 'h', e.h, false); setParam(S, 't', e.t, false); D.reset(S); },
    reset(S) { S.k = 0; S.go = 0; S.tm = 0; },
    vals(S) { const p = S.p, e = EX[p.ex]; if (e.E) return { W: e.E, P: e.E / p.t, Fw: null }; const Fw = e.w && p.m === Math.round(e.w / 9.8) ? e.w : p.m * Q23.G; return { Fw, W: Fw * p.h, P: Fw * p.h / p.t }; },
    update(S, dt) { dt = Math.min(dt, .04); if (!S.go) return; const T = S.p.t, vis = Math.min(T, 8); S.k = Math.min(1, S.k + dt / vis); S.tm = S.k * T; if (S.k >= 1) { S.go = 0; K.cheer(S, S.W * .4, S.H * .35); } },
    draw(ctx, w, h, S) {
      const p = S.p, e = EX[p.ex], V = D.vals(S), gy = h * .86, x = (w + 64) / 2 - 60, H = e.k === 'stairs' ? 3 : p.h, pxm = clamp((gy - 200) / (H + 1.9), 40, 150), s = 1.7 * pxm / 175;
      Q23.outdoor(ctx, w, h, gy, { g1: '#d6d3d1', g2: '#a8a29e' });
      const k = S.k;
      if (e.k === 'pulley') {
        const top = gy - (p.h + 1.2) * pxm, px = x + 40; K.raw(ctx, () => { ctx.fillStyle = '#fca5a5'; ctx.fillRect(px + 30, top + 20, 220, gy - top - 20); ctx.fillStyle = '#78716c'; ctx.fillRect(px + 24, top + 14, 232, 10); ctx.fillStyle = '#475569'; ctx.fillRect(px - 4, top - 10, 8, gy - top + 10); ctx.fillRect(px - 4, top - 14, 70, 8); });
        Q23.pulley(ctx, px + 40, top + 8, 15, -k * 20); const rx1 = px + 55, rx2 = px + 25, by = gy - k * p.h * pxm, ph = k * p.h * 9;
        K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(rx1, top + 8); ctx.lineTo(rx1, by - .5 * pxm); ctx.moveTo(rx2, top + 8); ctx.lineTo(rx2, gy - 6); ctx.stroke(); });
        const hip = [rx2 - 26 * s, gy - 92 * s]; Q23.man(ctx, { hip, dir: 1, s, lean: -.12, feet: [[hip[0] + 12 * s, gy], [hip[0] - 16 * s, gy]], hands: [[rx2, hip[1] - 70 * s + Math.sin(ph) * 14 * s], [rx2, hip[1] - 70 * s - Math.sin(ph) * 14 * s]], elb: [-1, .3], shirt: '#0f766e', pants: '#334155', sleeve: 'long' });
        Q23.cbox(ctx, rx1, by, .5 * pxm, .45 * pxm, { label: p.m + ' kg' }); if (p.frc !== false) Q23.F(ctx, rx1 + .35 * pxm, by - .2 * pxm, 0, -60, 'F = ' + Q23.nf(V.Fw, 2) + ' N', '#dc2626', 4);
        D.hmark(ctx, rx1 + .55 * pxm + 40, gy, p.h * pxm, p.h);
      } else if (e.k === 'ladder') {
        const lx = x + 80, top = gy - (p.h + .6) * pxm; K.raw(ctx, () => { ctx.fillStyle = '#e7e5e4'; ctx.fillRect(lx + 20, top - 30, 200, gy - top + 30); ctx.strokeStyle = '#a8a29e'; ctx.strokeRect(lx + 20, top - 30, 200, gy - top + 30);
          ctx.strokeStyle = '#64748b'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(lx, gy); ctx.lineTo(lx, top); ctx.moveTo(lx + 14, gy); ctx.lineTo(lx + 14, top); ctx.stroke(); ctx.lineWidth = 3; for (let y = gy - .3 * pxm; y > top; y -= .3 * pxm) { ctx.beginPath(); ctx.moveTo(lx, y); ctx.lineTo(lx + 14, y); ctx.stroke(); } });
        const u = k * p.h, rung = .3 * pxm, step = q => gy - q * rung, fy = i => { const q = (u / .3 + i) / 2, kk = Math.floor(q), fr = q - kk, a = 2 * kk + i - 1; const ya = step(Math.max(0, a)), yb = step(Math.max(0, a + 2)); if (fr > .5) { const ee = (fr - .5) * 2; return lerp(ya, yb, ee * ee * (3 - 2 * ee)); } return ya; };
        const f0 = fy(0), f1 = fy(1), hipY = Math.min(f0, f1) - 82 * s, hip = [lx - 30 * s, hipY];
        Q23.man(ctx, { hip, dir: 1, s, lean: .08, feet: [[lx - 10 * s, f0], [lx - 12 * s, f1]], hands: [[lx + 4, Math.round((hipY - 70 * s - gy) / rung) * rung + gy], [lx + 4, Math.round((hipY - 50 * s - gy) / rung) * rung + gy]], elb: [-1, .8], shirt: '#7c3aed', pants: '#1f2937' });
        if (p.frc !== false) Q23.F(ctx, hip[0] - 40, hip[1], 0, 60, 'w = ' + Q23.nf(V.Fw, 1) + ' N', '#dc2626', 4);
        D.hmark(ctx, lx + 250, gy, p.h * pxm, p.h);
      } else if (e.k === 'lifter') {
        const bx = x + 40, low = .25, hiH = low + p.h, bh = low + k * p.h, by = gy - bh * pxm, kk = clamp((bh - low) / 1.2, 0, 1), up = bh > 1.5;
        const hipY = gy - 96 * s * (.62 + .38 * Math.min(1, kk * 1.3)), hip = [bx - 14 * s * (1 - kk), hipY];
        Q23.man(ctx, { hip, dir: 1, s, lean: .45 * (1 - kk), feet: [[bx + 2 * s, gy], [bx - 14 * s, gy]], hands: [[bx, by], [bx + 2 * s, by]], elb: up ? [-1, -.2] : [-1, .5], shirt: '#dc2626', pants: '#111827', sleeve: 'short',
          mid: c => K.raw(c, () => { c.strokeStyle = '#4b5563'; c.lineWidth = 4; c.beginPath(); c.moveTo(bx - 3, by); c.lineTo(bx + 3, by); c.stroke(); }) });
        K.raw(ctx, () => { const r = .22 * pxm; const g2 = ctx.createRadialGradient(bx - r * .3, by - r * .3, 2, bx, by, r); g2.addColorStop(0, '#6b7280'); g2.addColorStop(1, '#111827'); ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(bx, by, r, 0, TAU); ctx.fill(); ctx.fillStyle = '#d1d5db'; ctx.beginPath(); ctx.arc(bx, by, r * .18, 0, TAU); ctx.fill(); });
        if (p.frc !== false) Q23.F(ctx, bx + .3 * pxm, by, 0, -60, 'F = 500 N', '#dc2626', 4);
        D.hmark(ctx, bx + .3 * pxm + 70, gy - low * pxm, p.h * pxm, p.h);
      } else {
        const n = 12, sw = Math.min(42, (w - 330) / n), shp = 3 / n * pxm, x0 = w - 120;
        Q23.stairs(ctx, x0, gy, n, sw, shp, -1, { railC: '#94a3b8' });
        Q23.climber(ctx, { x0, gy, sw, shp, n, dir: -1, s: s * 1.05, u: k * n, style: { shirt: '#0891b2', pants: '#1e3a8a' } });
        if (p.lab !== false) Q23.T(ctx, 'الطاقة المحوَّلة: ' + Q23.nf(k * e.E, 0) + ' J', x0 - n * sw / 2, gy + 20, { s: 12.5, w: 900, c: '#fff', bg: '#ea580c' });
      }
      if (p.clock !== false) { Q23.watch(ctx, 130, gy - 70, 34, S.tm); if (p.t > 8) Q23.T(ctx, '⏩ مسرّع', 130, gy - 124, { s: 11, w: 800, c: '#fff', bg: '#475569' }); }
      if (p.lab !== false) { const L = [];
        if (e.E) L.push({ t: '1) المعطيات: W = ' + e.E + ' J ، t = ' + p.t + ' s', c: '#0f172a' }, { t: '2) القانون: P = W / t', c: '#dc2626', mono: 1 }, { t: '3) التعويض: P = ' + e.E + ' ÷ ' + p.t, c: '#1d4ed8', mono: 1 }, { t: '4) الناتج: P = ' + Q23.nf(V.P, 3) + ' watt', c: '#15803d', w: 900, s: 14 });
        else L.push({ t: '1) المعطيات: ' + (e.w ? 'w = ' + Q23.nf(V.Fw, 1) + ' N' : 'm = ' + p.m + ' kg') + ' ، h = ' + p.h + ' m ، t = ' + p.t + ' s', c: '#0f172a' }, { t: '2) القانون: P = W / t', c: '#dc2626', mono: 1 }, { t: '    الشغل: W = ' + (e.w ? 'w × h' : 'm × g × h'), c: '#dc2626', mono: 1 },
          { t: '3) W = ' + (e.w ? Q23.nf(V.Fw, 1) : p.m + ' × 9.8') + ' × ' + p.h + ' = ' + Q23.nf(V.W, 2) + ' J', c: '#1d4ed8', mono: 1 }, { t: '4) P = ' + Q23.nf(V.W, 2) + ' ÷ ' + p.t + ' = ' + Q23.nf(V.P, 3) + ' watt', c: '#15803d', w: 900, s: 14 });
        S._nst = L.length - 2; Q23.solve(ctx, S, L, e.n + ' — الحل', { wd: 470, f: .64, q: e.q }); }
      Q23.banner(ctx, w, 'P = W / t', '#dc2626', 20);
      const B = D.btns(S); C2.btn(ctx, B[0].x, B[0].y, B[0].w, B[0].h, '▶ نفّذ', { col: '#16a34a', on: S.go }); C2.btn(ctx, B[1].x, B[1].y, B[1].w, B[1].h, S.stp > (S._nst || 3) ? '↺ أخفِ الحل' : 'الخطوة التالية ⟵', { col: '#7c3aed' });
      K.party(ctx, S);
    },
    hmark(ctx, x, yb, hp, hm) { K.raw(ctx, () => { G.arrow(ctx, x, yb, x, yb - hp, '#2563eb', 3, 10); G.arrow(ctx, x, yb - hp, x, yb, '#2563eb', 3, 10); }); Q23.T(ctx, 'h = ' + hm + ' m', x + 8, yb - hp / 2, { s: 12.5, w: 900, c: '#fff', bg: '#2563eb', a: 'left' }); },
    btns(S) { return Q23.rowL(S.H * .86 + 40, 2, 140); },
    drags(S) { if (!S.W) return []; const B = D.btns(S); return [Q23.btnObj('run', B[0], S => { D.reset(S); S.go = 1; }, { hint: true, idle: 'نفّذ ✋' }), Q23.btnObj('step', B[1], S => { const n = (S._nst || 3) + 1; S.stp = S.stp >= n ? 0 : S.stp + 1; if (S.stp === n) K.cheer(S, S.W * .7, S.H * .3); })]; },
    readings(S) { const V = D.vals(S); return [rd('الشغل W', Q23.nf(V.W, 2) + ' J'), rd('الزمن t', S.p.t + ' s'), rd('القدرة P', Q23.nf(V.P, 3) + ' watt'), rd('بالقدرة الحصانية', Q23.nf(V.P / 746, 4) + ' hp')]; },
    record(S) { const V = D.vals(S); return { e: EX[S.p.ex].n, W: +V.W.toFixed(1), t: S.p.t, P: +V.P.toFixed(2) }; },
    cols: [['e', 'المسألة'], ['W', 'W (J)'], ['t', 't (s)'], ['P', 'P (watt)']],
    explain(S) { const V = D.vals(S); return 'الشغل المنجز <b>' + Q23.nf(V.W, 2) + ' J</b> خلال <b>' + S.p.t + ' s</b>، فالقدرة <b>P = W / t = ' + Q23.nf(V.P, 3) + ' watt</b>. لو أُنجز الشغل نفسه بنصف الزمن لتضاعفت القدرة.'; },
    quiz: [
      { q: 'يرفع رجل جسماً كتلته 30Kg إلى ارتفاع مترين خلال دقيقة واحدة، قدرته:', o: ['9.8 watt', '588 watt', '30 watt'], a: 0, why: 'مثال 2: P = 30 × 9.8 × 2 ÷ 60 = 9.8 watt.' },
      { q: 'رافع أثقال يرفع ثقلاً وزنه 500N إزاحة 2.5m خلال 50s. قدرته:', o: ['1250 watt', '25 watt', '200 watt'], a: 1, why: 'مراجعة الفصل س5: W = 1250 J ، P = 1250 ÷ 50 = 25 watt.' },
      { q: 'يصعد أحمد السلّم في 20s ويحوّل 10000J من طاقة جسمه إلى طاقة حركية. قدرته:', o: ['500 watt', '200000 watt', '50 watt'], a: 0, why: 'مراجعة الفصل س6: P = 10000 ÷ 20 = 500 watt.' }
    ]
  };
  Q23.P[D.id] = D;
})();

/* bowling pin (side view): bottom centre, height hh, rotation rot about bottom */
Q23.pin = (ctx, x, y, hh, rot = 0) => K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const w = hh * .2;
  ctx.fillStyle = '#fafafa'; ctx.strokeStyle = '#a1a1aa'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-w * .5, 0); ctx.bezierCurveTo(-w * 1.25, -hh * .35, -w * .2, -hh * .55, -w * .35, -hh * .78); ctx.bezierCurveTo(-w * .7, -hh * .95, w * .7, -hh * .95, w * .35, -hh * .78); ctx.bezierCurveTo(w * .2, -hh * .55, w * 1.25, -hh * .35, w * .5, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#dc2626'; ctx.fillRect(-w * .42, -hh * .7, w * .84, hh * .035); ctx.fillRect(-w * .38, -hh * .655, w * .76, hh * .035); ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fillRect(-w * .3, -hh * .45, w * .15, hh * .3); ctx.restore(); });

/* =========================================================================================
   7) ما الطاقة؟ (ص 39): كرة البولنك والقناني، النابض المسحوب
   ========================================================================================= */
(() => {
  const MB = 6, KS = 40, MC = .5;
  const D = { id: 'g8_energy_def', ch: 23, sec: 'الدرس 2', page: 39, kind: 'نشاط',
    title: 'ما الطاقة؟ كرة البولنك والنابض',
    desc: 'عند دفع كرة البولنك فإن قوة الدفع تنجز شغلاً على الكرة، وعندما تصطدم الكرة بالقناني الخشبية فإنها تحركها إزاحة أي تنجز شغلاً؛ لأن شيئاً ما انتقل إليها يسمى طاقة. وعند سحب نابض يُنجز عليه شغل فيكتسب طاقة تخزن فيه وتتحول إلى حركة عند تحريره.',
    tags: 'الطاقة القابلية على إنجاز شغل بولنك كرة قناني نابض جول أشكال الطاقة',
    tools: ['كرة بولنك', 'قنانٍ خشبية', 'نابض'],
    steps: ['مشهد «البولنك»: اسحب الكرة إلى الخلف (يميناً) لتحدد مسافة الدفع، ثم اتركها: اليد تدفعها بقوة F فتنجز عليها شغلاً.', 'راقب الكرة وهي تتدحرج: انتقل إليها شيء من الشغل… إنه الطاقة! (عمود «طاقة الكرة»).', 'عند اصطدام الكرة بالقناني تحرّكها إزاحة، أي أن الكرة تنجز شغلاً: لأنها تمتلك طاقة.', 'زد القوة أو مسافة الدفع: كيف يتغير ما يحدث للقناني؟', 'مشهد «النابض»: اسحب السيارة اللعبة المربوطة بالنابض لتمطه (تنجز عليه شغلاً)، ثم اتركها: تتحول الطاقة المخزونة إلى حركة.'],
    concl: ['الطاقة: القابلية على إنجاز شغل ما.', 'الطاقة كمية قياسية تقاس بوحدة قياس الشغل وهي الجول (J).', 'الجسم الذي لديه قابلية لإنجاز شغل ما — أيّاً كان مقدار هذا الشغل — فهو يمتلك طاقة.', 'الشغل والطاقة مصطلحان متداخلان: الشغل المنجز على الكرة أو النابض يتحول إلى طاقة فيها.', 'للطاقة أشكال منها: الميكانيكية، الحرارية، الضوئية، الكيميائية، الصوتية.'],
    laws: ['g8_energy', 'g8_work'],
    fact: ['الطاقة لا تفنى ولا تستحدث وإنما تتحول من شكل إلى آخر (الفكرة الرئيسة للدرس).', 'لاعب البولنك المحترف يرمي الكرة بسرعة تقارب 8 m/s.'],
    controls: [SEL('sc', 'المثال', [['bowl', '🎳 كرة البولنك'], ['spring', '🌀 النابض المسحوب']], 'bowl', (v, S) => D.reset(S)),
      R('F', 'قوة الدفع F', 20, 120, 60, 10, 'N', (v, S) => D.reset(S)),
      TG('frc', 'أسهم القوة', true, null, 'force'), TG('vel', 'سهم السرعة', true, null, 'velocity'), TG('bars', 'أعمدة الشغل والطاقة', true, null, 'energy'), TG('lab', 'البطاقات', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.bx = 0; S.d = 0; S.v = 0; S.ph = 0; S.Wp = 0; S.Wpin = 0; S.pins = null; S.x = 0; S.sv = 0; S.st = 0; S.bk = 0; S.bkv = 0; S.E = 0; S.Ebk = 0; },
    geo(S) { const w = S.W, h = S.H, gy = h * .66, x0 = 100, rel = w - 230, pxm = (rel - x0 - 40) / 5.5; return { w, h, gy, x0, rel, pxm, cx: (w + 64) / 2 }; },
    update(S, dt) {
      dt = Math.min(dt, .04); if (!S.W) return; const g = D.geo(S), p = S.p;
      if (p.sc === 'bowl') {
        if (!S.pins) S.pins = [0, 1, 2, 3].map(i => ({ x: .35 + i * .22, y: 0, vx: 0, vy: 0, r: 0, w: 0, hit: 0 }));
        if (S.ph === 1) { const a = p.F / MB; S.v += a * dt; S.bx -= S.v * dt; S.Wp = p.F * (S.d - Math.max(0, S.bx)); if (S.bx <= 0) { S.Wp = p.F * S.d; S.ph = 2; } }
        else if (S.ph === 2) { S.bx -= S.v * dt; }
        const bxm = 5.5 + S.bx; // ball position (m from lane start x0) ; pins near 0.25..
        if (S.ph === 2) S.pins.forEach(pn => { if (!pn.hit && bxm - .11 <= pn.x + .06 && S.v > 0) { pn.hit = 1; const e = .5 * MB * S.v * S.v * .22; const vp = Math.sqrt(2 * e / 1.5); pn.vx = -vp * (.8 + .4 * Math.random()); pn.vy = vp * (.4 + .3 * Math.random()); pn.w = -(4 + 6 * Math.random()); S.Wpin += e; S.v *= .88; } });
        S.pins.forEach(pn => { if (pn.hit) { pn.x += pn.vx * dt; pn.y += pn.vy * dt; pn.vy -= 9.8 * dt; pn.r += pn.w * dt; if (pn.y < 0) { pn.y = 0; pn.vy = 0; pn.vx *= .9; pn.w *= .9; pn.r = Math.max(pn.r, -1.57); } } });
        if (S.ph === 2 && bxm < -.4) { S.ph = 3; S.v = 0; if (S.Wpin > 0) K.cheer(S, g.x0 + 60, g.gy - 60); }
        S.E = S.ph >= 1 && S.ph < 3 ? .5 * MB * S.v * S.v : 0;
      } else {
        if (S.st === 2) { const a = (-KS * S.x - .25 * S.sv) / MC; S.sv += a * dt; S.x += S.sv * dt; S.x = Math.max(S.x, -.12); }
        S.E = .5 * KS * S.x * S.x;
      }
    },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S);
      if (p.sc === 'bowl') D.dBowl(ctx, S, g); else D.dSpring(ctx, S, g);
      Q23.banner(ctx, w, 'الطاقة: القابلية على إنجاز شغل ما — وتقاس بالجول (J)', '#ea580c', 20);
      K.party(ctx, S);
    },
    dBowl(ctx, S, g) {
      const p = S.p, w = g.w, h = g.h; G.bg(ctx, w, h, false);
      K.raw(ctx, () => { const bg = ctx.createLinearGradient(0, 0, 0, g.gy); bg.addColorStop(0, '#1e1b4b'); bg.addColorStop(1, '#4338ca'); ctx.fillStyle = bg; ctx.fillRect(0, 0, w, g.gy);
        const lg = ctx.createLinearGradient(0, g.gy, 0, h); lg.addColorStop(0, '#f3d19c'); lg.addColorStop(.25, '#d6a35c'); lg.addColorStop(1, '#8b5a2b'); ctx.fillStyle = lg; ctx.fillRect(0, g.gy, w, h - g.gy);
        ctx.strokeStyle = 'rgba(120,70,20,.35)'; for (let x = 0; x < w; x += 28) { ctx.beginPath(); ctx.moveTo(x, g.gy); ctx.lineTo(x - 30, h); ctx.stroke(); }
        ctx.fillStyle = '#111827'; ctx.fillRect(0, g.gy - 3, w, 3); ctx.fillStyle = '#e11d48'; ctx.fillRect(g.rel - 2, g.gy, 4, 30);
        for (let k = 0; k < 6; k++) { ctx.fillStyle = 'rgba(253,224,71,.12)'; ctx.beginPath(); ctx.arc(120 + k * (w / 6), 40, 30, 0, TAU); ctx.fill(); } });
      Q23.T(ctx, 'خط الرمي', g.rel, g.gy + 42, { s: 11, w: 800, c: '#7f1d1d' });
      const X = m => g.x0 + m * g.pxm, br = .11 * g.pxm * 1.6, bxm = 5.5 + S.bx, bx = X(bxm), by = g.gy - br;
      (S.pins || [0, 1, 2, 3].map(i => ({ x: .35 + i * .22, y: 0, r: 0 }))).forEach(pn => Q23.pin(ctx, X(pn.x), g.gy - pn.y * g.pxm, .38 * g.pxm * 1.4, pn.r));
      // bowler (follow-through) at the throw line
      const s = clamp(g.pxm / 90, .6, 1.1) * 1.05, pushing = S.ph <= 1, hx = pushing ? bx + br * .9 : g.rel + 70 * s;
      const hip = [g.rel + 50 * s + (pushing ? Math.max(0, bx - g.rel) * .5 : 0), g.gy - 80 * s];
      Q23.man(ctx, { hip, dir: -1, s, lean: .55, feet: [[hip[0] - 34 * s, g.gy], [hip[0] + 30 * s, g.gy - 6 * s]], hands: [pushing ? [bx + br * .7, by + br * .2] : [hip[0] - 70 * s, hip[1] - 60 * s], [hip[0] + 40 * s, hip[1] - 10 * s]], elb: [1, .2], shirt: '#f97316', pants: '#1f2937', shoe: '#e11d48', sleeve: 'short' });
      K.ball(ctx, bx, by, br, '#1d4ed8'); K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; const a = -S.bx / .11; [0, 1, 2].forEach(k => { ctx.beginPath(); ctx.arc(bx + Math.cos(a + k * .5) * br * .5, by + Math.sin(a + k * .5) * br * .5, br * .1, 0, TAU); ctx.fill(); }); });
      if (p.frc !== false && S.ph <= 1 && (S.ph === 1 || S.d > 0)) Q23.F(ctx, bx - br - 6, by - br - 14, -clamp(p.F, 30, 120), 0, 'قوة الدفع F', '#dc2626', 5);
      if (p.vel !== false && S.v > .05) Q23.F(ctx, bx, by - br - 36, -clamp(S.v * 18, 15, 140), 0, 'v = ' + Q23.nf(S.v, 2) + ' m/s', '#16a34a', 4);
      if (S.ph === 0 && S.d > 0) { K.raw(ctx, () => { G.arrow(ctx, g.rel, g.gy + 64, g.rel + S.d * g.pxm, g.gy + 64, '#1d4ed8', 3, 10); }); Q23.T(ctx, 'مسافة الدفع d = ' + Q23.nf(S.d, 2) + ' m', g.rel + S.d * g.pxm / 2, g.gy + 82, { s: 12, w: 900, c: '#1d4ed8' }); }
      if (p.bars !== false) Q23.bars(ctx, g.w - 12, 44, 260, 190, [{ n: 'شغل الدفع', v: S.Wp, c: '#dc2626' }, { n: 'طاقة الكرة', v: S.E, c: '#16a34a' }, { n: 'شغل على القناني', v: S.Wpin, c: '#7c3aed' }], Math.max(10, p.F * 1.05), 'الشغل والطاقة (J)');
      if (p.lab !== false) Q23.T(ctx, S.ph === 0 ? 'اسحب الكرة إلى الخلف ثم اتركها' : S.ph === 1 ? 'اليد تدفع الكرة: تنجز عليها شغلاً W = F × d' : S.ph === 2 ? 'الكرة تمتلك طاقة (اكتسبتها من الشغل)' : 'الكرة أنجزت شغلاً على القناني فحرّكتها', g.cx - 60, g.h - 120, { s: 13.5, w: 900, c: '#fff', bg: 'rgba(30,41,59,.85)' });
      S._ball = [bx, by];
    },
    dSpring(ctx, S, g) {
      const p = S.p, w = g.w, h = g.h, by = h * .7; K.bg(ctx, w, h, { benchY: by });
      const y = by - 26, xL = g.cx - 230, L0 = 200, pxm = 650, xR = xL + L0 + S.x * pxm;
      K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); const n = 22; for (let k = 0; k <= n; k++) { const xx = xL + (xR - xL) * k / n; ctx.lineTo(xx, y + (k % 2 ? -14 : 14) * (k === 0 || k === n ? 0 : 1)); } ctx.stroke(); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.stroke(); });
      C2.hand(ctx, xL - 4, y, 1, 1.25, { sleeve: '#f97316' });
      C2.car(ctx, xR + 33, by, .33, '#dc2626');
      if (S.st < 2 && S.x > .003) C2.hand(ctx, xR + 108, y - 6, -1, 1.15, { sleeve: '#0ea5e9' });
      K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(xL + L0, y - 60); ctx.lineTo(xL + L0, by); ctx.stroke(); ctx.setLineDash([]); });
      if (p.frc !== false && Math.abs(S.x) > .003) Q23.F(ctx, xR + 33, y - 50, clamp(-KS * S.x * 6, -120, 120), 0, 'قوة النابض ' + Q23.nf(Math.abs(KS * S.x), 1) + ' N', '#dc2626', 4);
      if (p.vel !== false && Math.abs(S.sv) > .05) Q23.F(ctx, xR + 33, y - 90, clamp(S.sv * 40, -120, 120), 0, 'v', '#16a34a', 4);
      if (Math.abs(S.x) > .003) Q23.T(ctx, 'الاستطالة x = ' + Q23.nf(S.x * 100, 1) + ' cm', xL + L0, by + 30, { s: 12, w: 900, c: '#1d4ed8' });
      const Ek = .5 * MC * S.sv * S.sv;
      if (p.bars !== false) Q23.bars(ctx, g.w - 12, 44, 240, 190, [{ n: 'شغل السحب', v: S.st >= 2 ? S.Wst : S.E, c: '#dc2626' }, { n: 'طاقة النابض', v: S.E, c: '#ea580c' }, { n: 'حركة اللعبة', v: Ek, c: '#16a34a' }], Math.max(.3, S.Wst || S.E), 'الشغل والطاقة (J)');
      if (p.lab !== false) Q23.T(ctx, S.st < 2 ? (S.x > .003 ? 'تنجز شغلاً على النابض فيكتسب طاقة تُخزن فيه' : 'اسحب السيارة اللعبة لتمط النابض ثم اتركها') : 'تحرر النابض: تحولت طاقته المخزونة إلى حركة', g.cx, by + 70, { s: 13.5, w: 900, c: '#fff', bg: 'rgba(30,41,59,.85)' });
      S._fing = [xR + 33, by - 22];
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), p = S.p;
      if (p.sc === 'bowl') { const b = S._ball || [g.rel, g.gy - 20]; if (S.ph !== 0 && S.ph !== 3) return [];
        return [{ id: 'ball', x: b[0], y: b[1], r: 40, axis: 'x', keep: true, tip: 'اسحب الكرة إلى الخلف (يميناً) ثم اتركها', idle: 'اسحب الكرة للخلف ✋', down: S => { if (S.ph === 3) D.reset(S); }, drag: (S, d) => { S.d = clamp((d.x - g.rel) / g.pxm, 0, 1); S.bx = S.d; }, up: S => { if (S.d > .05) { S.ph = 1; S.v = 0; } else { S.d = 0; S.bx = 0; } } }]; }
      const f = S._fing || [g.cx, S.H * .6];
      return [{ id: 'car', x: f[0], y: f[1], r: 44, axis: 'x', keep: true, tip: 'اسحب السيارة لتمط النابض ثم اتركها', idle: 'اسحب لتمط النابض ✋', down: S => { S.st = 1; S.sv = 0; S.x0 = S.x; }, drag: (S, d) => { S.x = clamp(S.x0 + (d.x - d.sx) / 650, -.05, .3); }, up: S => { if (S.x > .01) { S.Wst = .5 * KS * S.x * S.x; S.st = 2; S.sv = 0; } else S.st = 0; } }]; },
    readings(S) { if (S.p.sc === 'bowl') return [rd('شغل الدفع W = F × d', Q23.nf(S.Wp, 2) + ' J'), rd('طاقة الكرة', Q23.nf(S.E, 2) + ' J'), rd('سرعة الكرة', Q23.nf(S.v, 2) + ' m/s'), rd('الشغل على القناني', Q23.nf(S.Wpin, 2) + ' J')];
      return [rd('استطالة النابض', Q23.nf(S.x * 100, 2) + ' cm'), rd('الطاقة المخزونة', Q23.nf(S.E, 3) + ' J'), rd('طاقة حركة اللعبة', Q23.nf(.5 * MC * S.sv * S.sv, 3) + ' J')]; },
    explain(S) { if (S.p.sc === 'bowl') return S.ph < 2 ? 'قوة الدفع تنجز شغلاً على الكرة <b>W = F × d</b>، وهذا الشغل ينتقل إلى الكرة على شكل <b>طاقة</b>.' : 'الكرة المتحركة تمتلك <b>طاقة</b>، أي قابلية على إنجاز شغل: لذلك استطاعت أن تزيح القناني.';
      return S.st < 2 ? 'عند سحب النابض ننجز عليه شغلاً فيكتسب طاقة <b>تُخزن فيه</b>.' : 'عند تحرير النابض تتحول طاقته المخزونة إلى <b>حركة</b> فيحرك السيارة اللعبة (ينجز عليها شغلاً)، ثم تتحول الحركة إلى طاقة نابض وهكذا…'; },
    quiz: [
      { q: 'تعرف ......... بأنها القابلية على إنجاز شغل ما.', o: ['القدرة', 'الطاقة', 'الشغل'], a: 1, why: 'مراجعة الفصل س1-2.' },
      { q: 'إذا كان الشغل المنجز على جسم 200J فكم تكون طاقته المبذولة في أثناء إنجاز الشغل عليه؟', o: ['200 J', '100 J', '400 J'], a: 0, why: 'مراجعة الدرس س2: الشغل المنجز يتحول إلى طاقة مساوية له.' },
      { q: 'قارن بين الشغل والطاقة: وحدة قياس الطاقة هي:', o: ['الواط', 'الجول', 'النيوتن'], a: 1, why: 'الطاقة تقاس بوحدة قياس الشغل وهي الجول (ص 39).' }
    ]
  };
  Q23.P[D.id] = D;
})();

/* =========================================================================================
   8) الطاقة الحركية (ص 39–40): K.E = ½ m v² — السيارة، مثال 1 (0.2Kg ، 2m/s)، سؤال 5m/s و 10m/s، س7 راكب الدراجة
   ========================================================================================= */
(() => {
  const SC = { car: '🚗 السيارة المتحركة (الكتاب)', ex1: '⚽ مثال 1: جسم 0.2 kg بسرعة 2 m/s', q: '🏃 سؤال: شخص بسرعة 5 m/s و 10 m/s', q7: '🚲 س7: راكب دراجة 40 kg' };
  const PRE = { car: { m: 1500, v: 20 }, ex1: { m: .2, v: 2 }, q: { m: 60, v: 5 }, q7: { m: 40, v: 4 } };
  const D = { id: 'g8_ke', ch: 23, sec: 'الدرس 2', page: 39, kind: 'نشاط',
    title: 'الطاقة الحركية K.E = ½ m v²',
    desc: 'جميع الأجسام المتحركة تمتلك طاقة تسمى الطاقة الحركية، وتعتمد على كتلة الجسم وسرعته: تتناسب طردياً مع الكتلة ومع مربع السرعة. السيارة التي تسير بسرعة عالية تمتلك طاقة حركية أكبر من طاقتها عندما تتحرك بسرعة قليلة.',
    tags: 'الطاقة الحركية كتلة سرعة مربع السرعة سيارة مثال 0.2 kg دراجة جول',
    tools: ['سيارة', 'كرة', 'راكب دراجة'],
    steps: ['مشهد «السيارة»: اسحب مؤشر عدّاد السرعة (أو استعمل المنزلقة) لتغيّر السرعة، ولاحظ عمود الطاقة الحركية.', 'اختر المقارنة «سرعة مضاعفة»: بكم مرة تزداد الطاقة الحركية؟ ثم «كتلة مضاعفة».', 'اختر «مثال 1» واضغط «الخطوة التالية» لترى الحل: K.E = ½ × 0.2 × (2)² = 0.4 J.', 'اختر «سؤال»: في أيّ الحالتين يمتلك الشخص طاقة حركية أكبر: 5 m/s أم 10 m/s؟ ولماذا؟', 'اختر «س7»: احسب سرعة راكب الدراجة أولاً (v = d / t) ثم طاقته الحركية.', 'سجّل قراءات بسرعات مختلفة وارسم العلاقة بين K.E والسرعة.'],
    concl: ['الطاقة الحركية: الطاقة التي يمتلكها جسم متحرك.', 'K.E = ½ m v² : تتناسب الطاقة الحركية طردياً مع الكتلة ومع مربع السرعة.', 'كلما كانت سرعة الجسم أكبر كانت طاقته الحركية أكبر، وكلما كانت كتلته أكبر كانت طاقته الحركية أكبر.', 'مضاعفة السرعة تجعل الطاقة الحركية أربعة أمثالها، ومضاعفة الكتلة تجعلها مثليها.'],
    laws: ['g8_ke'],
    fact: ['لهذا السبب تكون حوادث السيارات المسرعة خطيرة جداً: السرعة المضاعفة تعني طاقة أكبر بأربعة أضعاف!', 'الجسم الساكن (v = 0) لا يمتلك طاقة حركية، لكنه قد يمتلك أشكالاً أخرى من الطاقة.'],
    controls: [SEL('sc', 'المثال', Object.entries(SC), 'car', (v, S) => D.pick(S)),
      R('m', 'الكتلة m', .1, 2000, 1500, .1, 'kg', (v, S) => { S.stp = 0; }), R('v', 'السرعة v', 0, 40, 20, .5, 'm/s', (v, S) => { S.stp = 0; }),
      SEL('cmp', 'المقارنة', [['none', 'بدون'], ['v2', 'سرعة مضاعفة 2v'], ['m2', 'كتلة مضاعفة 2m']], 'none'),
      TG('vel', 'أسهم السرعة', true, null, 'velocity'), TG('bars', 'أعمدة الطاقة الحركية', true, null, 'energy'), TG('meter', 'عدّاد السرعة', true, null, 'meter'), TG('lab', 'المعادلة والحل', true, null, 'labels')],
    setup(S) { D.pick(S); S.rows = S.rows || []; },
    pick(S) { const q = PRE[S.p.sc]; setParam(S, 'm', q.m, false); setParam(S, 'v', q.v, false); S.stp = 0; S.x = [0, 0]; S.off = 0; if (S.p.sc === 'q') setParam(S, 'cmp', 'v2', false); else if (S.p.sc !== 'car') setParam(S, 'cmp', 'none', false); },
    pair(S) { const p = S.p, A = { m: p.m, v: p.v }; if (p.sc === 'q') return [A, { m: p.m, v: p.v * 2 }]; if (p.cmp === 'v2') return [A, { m: p.m, v: p.v * 2 }]; if (p.cmp === 'm2') return [A, { m: p.m * 2, v: p.v }]; return [A]; },
    ke(o) { return .5 * o.m * o.v * o.v; },
    pxm(S) { return { car: 18, ex1: 150, q: 30, q7: 40 }[S.p.sc]; },
    update(S, dt) { dt = Math.min(dt, .04); if (!S.W) return; const P = D.pair(S), k = D.pxm(S), span = S.W - 140; S.x = S.x || [0, 0]; P.forEach((o, i) => { S.x[i] = ((S.x[i] + o.v * k * dt) % span + span) % span; }); S.ph = (S.ph || 0) + P[0].v * dt * 2; },
    draw(ctx, w, h, S) {
      const p = S.p, P = D.pair(S), sc = p.sc, n = P.length, gy = h * .82, k = D.pxm(S);
      Q23.outdoor(ctx, w, h, gy - (n > 1 ? 150 : 0) - 70, { g1: '#86efac', g2: '#16a34a' });
      P.forEach((o, i) => {
        const ly = gy - (n - 1 - i) * 150, x = 80 + S.x[i];
        K.raw(ctx, () => { ctx.fillStyle = sc === 'ex1' ? '#d6d3d1' : '#475569'; ctx.fillRect(0, ly - 6, w, 52); ctx.fillStyle = '#f8fafc'; if (sc !== 'ex1') for (let xx = 0; xx < w; xx += 70) ctx.fillRect(xx, ly + 22, 34, 4); });
        if (sc === 'car') C2.car(ctx, x, ly + 8, .55 * (i && p.cmp === 'm2' ? 1.15 : 1), i ? '#2563eb' : '#dc2626', { rot: S.x[i] / 10 });
        else if (sc === 'ex1') { K.ball(ctx, x, ly - 6 - 16, 16, '#f97316'); }
        else if (sc === 'q') { const s = .75, W = Q23.walk(x, ly + 6, S.x[i] / 14, s, 1, 1.8); Q23.man(ctx, { hip: W.hip, feet: W.feet, dir: 1, s, lean: .2, hands: [[W.hip[0] + 22 * s * W.sw, W.hip[1] - 20 * s], [W.hip[0] - 22 * s * W.sw, W.hip[1] - 20 * s]], elb: [-1, 1.5], shirt: i ? '#2563eb' : '#dc2626', pants: '#1f2937', sleeve: 'short' }); }
        else { const r = 26, B = typeof Q22 !== 'undefined' ? Q22.bike(ctx, x, ly + 6, r, S.x[i] / r, '#16a34a') : null; if (B) { const s = .62; Q23.man(ctx, { hip: B.seat, dir: 1, s, lean: .45, feet: [[B.pedal[0] + Math.cos(S.x[i] / r) * 10, B.pedal[1] + Math.sin(S.x[i] / r) * 10 + 7 * s], [B.pedal[0] - Math.cos(S.x[i] / r) * 10, B.pedal[1] - Math.sin(S.x[i] / r) * 10 + 7 * s]], hands: [B.bar, B.bar], elb: [-1, .5], shirt: '#f59e0b', pants: '#1e3a8a', cap: '#dc2626' }); } }
        const yl = ly - (sc === 'ex1' ? 70 : sc === 'car' ? 50 : 150);
        if (p.vel !== false && o.v > 0) Q23.F(ctx, x + 10, yl, clamp(o.v * (sc === 'ex1' ? 30 : 4), 14, 160), 0, 'v = ' + Q23.nf(o.v, 2) + ' m/s', '#16a34a', 4);
        Q23.T(ctx, 'm = ' + Q23.nf(o.m, 2) + ' kg ، K.E = ' + Q23.nf(D.ke(o), 2) + ' J', w - 20, ly + 62, { s: 12.5, w: 900, c: '#fff', bg: i ? '#1d4ed8' : '#b91c1c', a: 'right' });
      });
      if (p.bars !== false) Q23.bars(ctx, 300, 100, 210, 170, P.map((o, i) => ({ n: n > 1 ? (i ? (p.sc === 'q' || p.cmp === 'v2' ? '2v' : '2m') : 'الأصلي') : 'K.E', v: D.ke(o), c: i ? '#2563eb' : '#dc2626' })), Math.max(...P.map(D.ke)) * 1.1 || 1, 'الطاقة الحركية (J)');
      if (p.meter !== false && sc === 'car') { C2.dial(ctx, w * .5 + 40, h * .36, 46, p.v, 40, 'اسحب المؤشر', 'm/s'); S._dial = [w * .5 + 40, h * .36]; } else S._dial = null;
      if (p.lab !== false) {
        const L = sc === 'ex1' ? [{ t: '1) المعطيات: m = 0.2 kg ، v = 2 m/s', c: '#0f172a' }, { t: 'K.E = ½ m v²', c: '#dc2626', mono: 1 }, { t: '= ½ × (0.2) × (2)²', c: '#1d4ed8', mono: 1 }, { t: '= 0.4 J  مقدار الطاقة الحركية', c: '#15803d', w: 900, s: 14 }]
          : sc === 'q' ? [{ t: 'نفرض كتلة الشخص m = ' + p.m + ' kg', c: '#0f172a' }, { t: 'K.E₁ = ½ × ' + p.m + ' × (' + p.v + ')² = ' + Q23.nf(D.ke(P[0]), 1) + ' J', c: '#b91c1c', mono: 1 }, { t: 'K.E₂ = ½ × ' + p.m + ' × (' + p.v * 2 + ')² = ' + Q23.nf(D.ke(P[1]), 1) + ' J', c: '#1d4ed8', mono: 1 }, { t: 'السرعة الضعف ← الطاقة الحركية 4 أمثال', c: '#15803d', w: 900, s: 14 }]
          : sc === 'q7' ? [{ t: '1) المعطيات: m = 40 kg ، d = 800 m ، t = 200 s', c: '#0f172a' }, { t: '2) v = d / t = 800 ÷ 200 = 4 m/s', c: '#7c3aed', mono: 1 }, { t: '3) K.E = ½ m v² = ½ × 40 × (4)²', c: '#1d4ed8', mono: 1 }, { t: '4) K.E = 320 J', c: '#15803d', w: 900, s: 14 }]
          : null;
        if (L) Q23.solve(ctx, S, L, SC[sc].slice(2) + ' — الحل', { wd: 400 });
        else Q23.card(ctx, S, [{ t: 'K.E = ½ m v²', c: '#dc2626', mono: 1, s: 14 }, { t: '= ½ × ' + Q23.nf(p.m, 1) + ' × (' + Q23.nf(p.v, 1) + ')²', c: '#1d4ed8', mono: 1 }, { t: '= ' + Q23.nf(D.ke(P[0]), 1) + ' J', c: '#15803d', w: 900, s: 14 }].concat(n > 1 ? [{ t: 'النسبة: ' + Q23.nf(D.ke(P[1]) / Math.max(1e-9, D.ke(P[0])), 2) + ' مرة', c: '#7c3aed', w: 900 }] : []), { title: 'الطاقة الحركية الآن', bd: '#dc2626', wd: 300 });
      }
      if (sc !== 'car') { const B = D.btns(S); C2.btn(ctx, B[0].x, B[0].y, B[0].w, B[0].h, S.stp >= 3 ? '↺ أخفِ الحل' : 'الخطوة التالية ⟵', { col: '#7c3aed' }); }
      Q23.banner(ctx, w, 'الطاقة الحركية K.E = (1/2) m v²', '#dc2626', 20);
      K.party(ctx, S);
    },
    btns(S) { return Q23.rowL(64, 1, 160); },
    drags(S) { if (!S.W) return []; const L = [];
      if (S.p.sc !== 'car') L.push(Q23.btnObj('step', D.btns(S)[0], S => { S.stp = S.stp >= 3 ? 0 : S.stp + 1; if (S.stp === 3) K.cheer(S, S.W * .6, S.H * .3); }, { hint: true, idle: 'الحل ✋' }));
      if (S._dial) { const [cx, cy] = S._dial; L.push({ id: 'needle', x: cx, y: cy, r: 46, cx, cy, keep: true, tip: 'اسحب المؤشر لتغيير السرعة', idle: 'غيّر السرعة ✋', drag: (S, d) => { let a = Math.atan2(d.y - cy, d.x - cx); if (a < Math.PI * .5) a += TAU; setParam(S, 'v', clamp((a - Math.PI * .75) / (Math.PI * 1.5), 0, 1) * 40); } }); }
      return L; },
    readings(S) { return D.pair(S).map((o, i) => rd(i ? 'الجسم الثاني' : 'الجسم', 'm = ' + Q23.nf(o.m, 2) + ' kg ، v = ' + Q23.nf(o.v, 2) + ' m/s ← K.E = ' + Q23.nf(D.ke(o), 2) + ' J', 1)); },
    record(S) { const o = D.pair(S)[0]; return { m: +o.m.toFixed(2), v: +o.v.toFixed(2), v2: +(o.v * o.v).toFixed(2), KE: +D.ke(o).toFixed(2) }; },
    cols: [['m', 'm (kg)'], ['v', 'v (m/s)'], ['v2', 'v² (m²/s²)'], ['KE', 'K.E (J)']],
    graph: { x: 'v', y: 'KE', xl: 'السرعة v (m/s)', yl: 'الطاقة الحركية K.E (J)', theory: (x, S) => .5 * S.p.m * x * x, xmin: 0, xmax: 40 },
    explain(S) { const P = D.pair(S); if (P.length > 1) return 'الجسم الثاني طاقته الحركية <b>' + Q23.nf(D.ke(P[1]) / Math.max(1e-9, D.ke(P[0])), 2) + '</b> مرة من طاقة الأول: مضاعفة السرعة ← 4 أمثال (مربع السرعة)، ومضاعفة الكتلة ← مثلان.'; return 'جسم كتلته <b>' + Q23.nf(S.p.m, 2) + ' kg</b> يتحرك بسرعة <b>' + Q23.nf(S.p.v, 2) + ' m/s</b> يمتلك طاقة حركية <b>K.E = ½ m v² = ' + Q23.nf(D.ke(P[0]), 2) + ' J</b>.'; },
    quiz: [
      { q: 'تتناسب الطاقة الحركية طردياً مع:', o: ['v', 'v²', 'v³'], a: 1, why: 'مراجعة الفصل س2-2: K.E = ½ m v².' },
      { q: 'ماذا يحدث للطاقة الحركية إذا تضاعف مقدار الكتلة؟', o: ['تتضاعف', 'تصبح أربعة أمثالها', 'تبقى ثابتة'], a: 0, why: 'مراجعة الفصل س3-1-ب: K.E تتناسب طردياً مع الكتلة.' },
      { q: 'راكب دراجة كتلته 40Kg قطع 800m في 200s بسرعة ثابتة. طاقته الحركية:', o: ['160 J', '320 J', '640 J'], a: 1, why: 'س7: v = 4 m/s ، K.E = ½ × 40 × 16 = 320 J.' }
    ]
  };
  Q23.P[D.id] = D;
})();

/* =========================================================================================
   9) نشاط (ص 40): العلاقة بين الكتلة والطاقة الحركية — مستوٍ مائل وصندوق كارتون وكرتان خفيفة وثقيلة
   ========================================================================================= */
(() => {
  const TH = 20 * Math.PI / 180, MBOX = .15, MU = .4, GAP = .06, RB = .033;
  const BALL = { light: { n: 'الكرة الخفيفة', m: .05, c: '#facc15' }, heavy: { n: 'الكرة الثقيلة', m: .4, c: '#64748b' } };
  const D = { id: 'g8_ke_mass', ch: 23, sec: 'الدرس 2', page: 40, kind: 'نشاط',
    title: 'نشاط: العلاقة بين الكتلة والطاقة الحركية',
    desc: 'نضع صندوق الكارتون عند نهاية المستوي المائل، ونترك كرة خفيفة تتحرك من السكون من أعلى المستوي حتى تدخل في الصندوق، ونقيس المسافة الأفقية التي يقطعها الصندوق. ثم نكرر مع كرة ثقيلة. لماذا يتحرك الصندوق لمسافة أكبر مع الكرة الثقيلة؟',
    tags: 'نشاط الطاقة الحركية الكتلة مستوي مائل صندوق كارتون كرة خفيفة ثقيلة مسافة',
    tools: ['مستوٍ مائل', 'صندوق كارتون', 'كرة خفيفة', 'كرة ثقيلة', 'مسطرة'],
    steps: ['صندوق الكارتون موضوع عند نهاية المستوي المائل.', 'ضع الكرة الخفيفة عند أعلى المستوي (اسحبها على المستوي إلى العلامة) واتركها تتحرك من السكون حتى تدخل في الصندوق.', 'قِس المسافة الأفقية التي سيقطعها الصندوق بالمسطرة وسجّلها (اضغط «سجّل»).', 'أعد الصندوق، وكرّر الخطوتين 2 و 3 بوضع الكرة الثقيلة (انقر الكرة الثقيلة في الصينية) من الموضع نفسه. ماذا تلاحظ؟', 'لماذا يتحرك الصندوق لمسافة أكبر عندما تصطدم به الكرة الثقيلة مقارنة بالكرة الخفيفة؟'],
    concl: ['الكرتان تصلان إلى أسفل المستوي بالسرعة نفسها تقريباً (تُركتا من الموضع نفسه).', 'الكرة الثقيلة تمتلك طاقة حركية أكبر لأن كتلتها أكبر (K.E = ½ m v²)، فتنجز شغلاً أكبر على الصندوق وتحركه مسافة أكبر.', 'تزداد الطاقة الحركية للجسم بزيادة كتلته عند ثبوت السرعة.'],
    laws: ['g8_ke', 'g8_work'],
    fact: ['لهذا تكون الشاحنة الثقيلة أكثر خطراً من السيارة الصغيرة عند السرعة نفسها: طاقتها الحركية أكبر بكثير.'],
    controls: [SEL('ball', 'الكرة', [['light', '🟡 الكرة الخفيفة (50 g)'], ['heavy', '⚫ الكرة الثقيلة (400 g)']], 'light', (v, S) => D.reset(S)),
      R('L', 'موضع الترك على المستوي', .3, 1, .8, .1, 'm', (v, S) => D.reset(S)),
      BT('', [{ t: '▶ اترك الكرة', on: S => D.go(S) }, { t: '↺ أعد الصندوق', on: S => D.reset(S) }]),
      TG('vel', 'سهم السرعة', true, null, 'velocity'), TG('ruler', 'المسطرة', true, null, 'grid'), TG('mark', 'علامة موضع الترك', true, null, 'dot'), TG('lab', 'البطاقات والطاقة', true, null, 'labels')],
    setup(S) { D.reset(S); S.rows = S.rows || []; },
    reset(S) { S.s = S.p.L; S.ph = 0; S.v = 0; S.fx = 0; S.bx = 0; S.V = 0; S.ang = 0; S.KE = 0; S.done = 0; },
    go(S) { if (S.ph === 0) { S.s = S.p.L; S.ph = 1; S.v = 0; } else { D.reset(S); S.ph = 1; } },
    geo(S) { const w = S.W, h = S.H, gy = h * .72, pxm = clamp((w - 160) / 1.75, 250, 520), xb = 100 + .55 * pxm; return { w, h, gy, pxm, xb, cx: (w + 64) / 2 }; },
    update(S, dt) { dt = Math.min(dt, .03); const m = BALL[S.p.ball].m, a = 5 / 7 * Q23.G * Math.sin(TH);
      for (let i = 0; i < 4; i++) { const h2 = dt / 4;
        if (S.ph === 1) { S.v += a * h2; S.s -= S.v * h2; S.ang -= S.v * h2 / RB; if (S.s <= 0) { S.s = 0; S.ph = 2; S.fx = 0; S.KE = .5 * m * S.v * S.v; } }
        else if (S.ph === 2) { S.fx += S.v * h2; S.ang -= S.v * h2 / RB; if (S.fx >= GAP) { S.ph = 3; S.V = m * S.v / (m + MBOX); } }
        else if (S.ph === 3) { S.V = Math.max(0, S.V - MU * Q23.G * h2); S.bx += S.V * h2; if (S.V <= 0) { S.ph = 4; S.done = 1; C2.msg(S, 'تحرك الصندوق ' + Q23.nf(S.bx * 100, 1) + ' cm', 2.5); if (S.p.ball === 'heavy') K.cheer(S, S.W * .3, S.H * .4); } } } },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S), B = BALL[p.ball], rpx = RB * g.pxm; K.bg(ctx, w, h, { benchY: g.gy });
      // incline: bottom at xb (right of box), rising to the right
      const xb = g.xb + .25 * g.pxm, Lr = 1.05, xt = xb + Lr * Math.cos(TH) * g.pxm, yt = g.gy - Lr * Math.sin(TH) * g.pxm;
      K.raw(ctx, () => { ctx.fillStyle = '#92400e'; ctx.beginPath(); ctx.moveTo(xt - 30, yt + 6); ctx.lineTo(xt + 10, yt + 6); ctx.lineTo(xt + 10, g.gy); ctx.lineTo(xt - 30, g.gy); ctx.fill();
        const pg = ctx.createLinearGradient(0, yt, 0, g.gy); pg.addColorStop(0, '#f3d19c'); pg.addColorStop(1, '#c08552'); ctx.fillStyle = pg; ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(xb, g.gy); ctx.lineTo(xt + 10, yt - 2); ctx.lineTo(xt + 10, yt + 10); ctx.lineTo(xb + 26, g.gy); ctx.closePath(); ctx.fill(); ctx.stroke(); });
      const P = s => [xb + s * Math.cos(TH) * g.pxm, g.gy - s * Math.sin(TH) * g.pxm];
      if (p.mark !== false) { const q = P(p.L); K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(q[0] - Math.sin(TH) * 14, q[1] - Math.cos(TH) * 14 - 20); ctx.lineTo(q[0] + Math.sin(TH) * 6, q[1] + Math.cos(TH) * 6 - 4); ctx.stroke(); }); Q23.T(ctx, 'موضع الترك', q[0] + 20, q[1] + 26, { s: 11.5, w: 800, c: '#b91c1c' }); }
      // box (opening faces the incline, on the right side)
      const bw = .22 * g.pxm, bh = .14 * g.pxm, bR = xb - GAP * g.pxm + 2 - 0 + (S.bx) * -g.pxm, bL = bR - bw;
      if (p.ruler !== false) { K.ruler(ctx, xb - .55 * g.pxm, g.gy + 12, .5 * g.pxm, 50); K.raw(ctx, () => { ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); const x0 = xb - GAP * g.pxm + 2; ctx.beginPath(); ctx.moveTo(x0, g.gy - bh - 10); ctx.lineTo(x0, g.gy + 40); ctx.stroke(); ctx.setLineDash([]); }); }
      K.raw(ctx, () => { const bg = ctx.createLinearGradient(bL, 0, bR, 0); bg.addColorStop(0, '#b07a3c'); bg.addColorStop(1, '#e0b277'); ctx.fillStyle = '#8b5a2b'; ctx.fillRect(bL, g.gy - bh, bw, bh); });
      // ball
      let bxp, byp; if (S.ph <= 1) { const q = P(S.ph === 0 ? (S.dragS ?? p.L) : S.s); bxp = q[0] - Math.sin(TH) * rpx; byp = q[1] - Math.cos(TH) * rpx; } else if (S.ph === 2) { bxp = xb - S.fx * g.pxm; byp = g.gy - rpx; } else { bxp = bL + rpx + 6; byp = g.gy - rpx; }
      K.ball(ctx, bxp, byp, rpx, B.c); K.raw(ctx, () => { ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(bxp, byp); ctx.lineTo(bxp + Math.cos(S.ang) * rpx, byp + Math.sin(S.ang) * rpx); ctx.stroke(); });
      K.raw(ctx, () => { const bg = ctx.createLinearGradient(bL, 0, bR, 0); bg.addColorStop(0, '#c08a4b'); bg.addColorStop(1, '#e8bf86'); ctx.fillStyle = bg; ctx.strokeStyle = '#7c4a1c'; ctx.lineWidth = 1.5; ctx.fillRect(bL, g.gy - bh, 8, bh); ctx.strokeRect(bL, g.gy - bh, 8, bh); ctx.fillRect(bL, g.gy - bh, bw, 7); ctx.strokeRect(bL, g.gy - bh, bw, 7); ctx.fillRect(bL, g.gy - 5, bw, 5); ctx.fillRect(bR - 4, g.gy - bh, 4, bh * .25); });
      Q23.T(ctx, 'صندوق كارتون', (bL + bR) / 2, g.gy - bh - 16, { s: 11.5, w: 800, c: '#7c2d12' });
      if (p.vel !== false && (S.ph === 1 || S.ph === 2) && S.v > .05) Q23.F(ctx, bxp, byp - 40, -clamp(S.v * 50, 12, 120), 0, 'v = ' + Q23.nf(S.v, 2) + ' m/s', '#16a34a', 4);
      if (p.vel !== false && S.ph === 3 && S.V > .02) Q23.F(ctx, (bL + bR) / 2, g.gy - bh - 40, -clamp(S.V * 80, 12, 120), 0, '', '#16a34a', 4);
      if (S.bx > .002) { K.raw(ctx, () => { G.arrow(ctx, xb - GAP * g.pxm + 2, g.gy + 48, bR, g.gy + 48, '#1d4ed8', 3, 10); }); Q23.T(ctx, 'd = ' + Q23.nf(S.bx * 100, 1) + ' cm', (bR + xb - GAP * g.pxm) / 2, g.gy + 66, { s: 13, w: 900, c: '#1d4ed8' }); }
      // tray with two balls (click to choose)
      const ty = yt - 34; K.raw(ctx, () => { ctx.fillStyle = '#475569'; rr(ctx, xt - 100, ty, 90, 8, 4); ctx.fill(); });
      ['light', 'heavy'].forEach((k, i) => { const x = xt - 80 + i * 50, sel = p.ball === k; if (!(sel && true)) K.ball(ctx, x, ty - rpx, rpx, BALL[k].c); else K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(x, ty - rpx, rpx, 0, TAU); ctx.stroke(); ctx.setLineDash([]); }); Q23.T(ctx, i ? 'ثقيلة' : 'خفيفة', x, ty + 18, { s: 11, w: 800, c: '#334155' }); });
      S._tray = [xt - 80, xt - 30, ty - rpx]; S._ball = [bxp, byp]; S._P = P;
      if (p.lab !== false) { const m = B.m; Q23.card(ctx, S, [{ t: B.n + ': m = ' + m * 1000 + ' g', c: '#0f172a' }, { t: 'السرعة أسفل المستوي: v = ' + Q23.nf(S.ph >= 2 ? (S.ph === 2 ? S.v : Math.sqrt(2 * S.KE / m)) : S.v, 2) + ' m/s', c: '#16a34a' }, { t: 'K.E = ½ m v² = ' + Q23.nf(S.KE || .5 * m * S.v * S.v, 4) + ' J', c: '#dc2626' }, { t: 'مسافة الصندوق: d = ' + Q23.nf(S.bx * 100, 2) + ' cm', c: '#1d4ed8', w: 900 }], { title: 'القياسات', bd: '#0f766e', wd: 300 }); }
      Q23.banner(ctx, w, 'العلاقة بين الكتلة والطاقة الحركية', '#0f766e', 20);
      C2.drawMsg(ctx, S, g.cx, h * .3); K.party(ctx, S);
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = []; const t = S._tray;
      if (t) [['light', t[0]], ['heavy', t[1]]].forEach(([k, x]) => L.push({ id: 'pick_' + k, x, y: t[2], r: 24, hint: false, tip: 'انقر لاختيار ' + BALL[k].n, click: S => setParam(S, 'ball', k) }));
      if (S._ball && (S.ph === 0 || S.ph === 4)) { const xb = g.xb + .25 * g.pxm; L.push({ id: 'ball', x: S._ball[0], y: S._ball[1], r: 34, dir: Math.PI + TH, keep: true, tip: 'اسحب الكرة على المستوي ثم اتركها', idle: 'ضع الكرة واتركها ✋', down: S => { if (S.ph === 4) D.reset(S); S.dragS = S.p.L; },
        drag: (S, d) => { const sx = ((d.x - xb) * Math.cos(TH) - (d.y - g.gy) * Math.sin(TH)) / g.pxm; S.dragS = clamp(sx, .1, 1); setParam(S, 'L', Math.round(S.dragS * 10) / 10, false); S.s = S.dragS; }, up: S => { S.dragS = null; S.s = S.p.L; S.ph = 1; S.v = 0; } }); }
      return L; },
    readings(S) { const B = BALL[S.p.ball]; return [rd('الكرة', B.n + ' (' + B.m * 1000 + ' g)'), rd('السرعة أسفل المستوي', Q23.nf(S.KE ? Math.sqrt(2 * S.KE / B.m) : S.v, 2) + ' m/s'), rd('الطاقة الحركية', Q23.nf(S.KE, 4) + ' J'), rd('مسافة الصندوق', Q23.nf(S.bx * 100, 2) + ' cm')]; },
    record(S) { if (!S.done) { Runner.toast('اترك الكرة وانتظر حتى يتوقف الصندوق', 'info'); return null; } const B = BALL[S.p.ball]; return { b: B.n, m: B.m * 1000, L: S.p.L, KE: +S.KE.toFixed(3), d: +(S.bx * 100).toFixed(1) }; },
    cols: [['b', 'الكرة'], ['m', 'الكتلة (g)'], ['L', 'موضع الترك (m)'], ['KE', 'K.E (J)'], ['d', 'مسافة الصندوق (cm)']],
    graph: { x: 'KE', y: 'd', xl: 'الطاقة الحركية للكرة (J)', yl: 'مسافة الصندوق (cm)' },
    explain(S) { if (!S.done) return 'الكرة تتدحرج من السكون فتكتسب سرعة؛ الكرتان تصلان إلى أسفل المستوي بالسرعة نفسها تقريباً لأنهما تُركتا من الموضع نفسه.'; return S.p.ball === 'heavy' ? 'الكرة الثقيلة لها السرعة نفسها لكن كتلتها أكبر، فطاقتها الحركية <b>أكبر</b> ← أنجزت شغلاً أكبر وحرّكت الصندوق <b>' + Q23.nf(S.bx * 100, 1) + ' cm</b>.' : 'الكرة الخفيفة طاقتها الحركية صغيرة فحرّكت الصندوق مسافة صغيرة <b>' + Q23.nf(S.bx * 100, 1) + ' cm</b>. جرّب الكرة الثقيلة!'; },
    quiz: [
      { q: 'لماذا يتحرك الصندوق لمسافة أكبر عندما تصطدم به الكرة الثقيلة؟', o: ['لأن طاقتها الحركية أكبر لكبر كتلتها', 'لأن سرعتها أقل', 'لأن الصندوق أخف'], a: 0, why: 'K.E = ½ m v²: بالسرعة نفسها، الكتلة الأكبر طاقتها أكبر.' },
      { q: 'ماذا يحدث للطاقة الحركية إذا تضاعف مقدار الكتلة؟', o: ['تتضاعف', 'تقل للنصف', 'لا تتغير'], a: 0, why: 'مراجعة الفصل س3-1-ب.' },
      { q: 'اذكر القانون الرياضي للطاقة الحركية:', o: ['K.E = m g h', 'K.E = ½ m v²', 'K.E = F × X'], a: 1, why: 'مراجعة الدرس س3.' }
    ]
  };
  Q23.P[D.id] = D;
})();

/* =========================================================================================
   10) الطاقة الكامنة (ص 40–41): P.E = m g h — رفع كرة، مثال 2 (صندوق 20Kg على سلّم 2.5m)، الشلال، رفّان 70cm و 150cm
   ========================================================================================= */
(() => {
  const SC = { hold: '🏐 رفع كرة عن الأرض (الكتاب)', ex2: '📦 مثال 2: صندوق 20 kg إلى 2.5 m', fall: '🏞️ مياه الشلال', shelf: '📚 ارتفاع 70 cm أم 150 cm؟' };
  const D = { id: 'g8_pe_def', ch: 23, sec: 'الدرس 2', page: 40, kind: 'نشاط',
    title: 'الطاقة الكامنة P.E = m g h',
    desc: 'عندما نرفع جسماً فوق سطح الأرض ننجز شغلاً ضد الجاذبية الأرضية فيكتسب الجسم طاقة تساوي هذا الشغل وتُختزن فيه بسبب موقعه بالنسبة لسطح الأرض، وتسمى الطاقة الكامنة، وتزداد كلما زاد ارتفاعه.',
    tags: 'الطاقة الكامنة ارتفاع كتلة التعجيل الأرضي m g h مثال صندوق 20 kg سلم 2.5 m شلال',
    tools: ['كرة', 'صندوق 20 kg', 'سلّم', 'شلال'],
    steps: ['مشهد «رفع كرة»: اسحب الكرة للأعلى أو للأسفل ولاحظ الارتفاع h والطاقة الكامنة P.E = m g h.', 'غيّر كتلة الكرة: كيف تتغير الطاقة الكامنة؟', 'اضغط «✋ أفلت»: ماذا يحدث للطاقة الكامنة وهي تسقط؟', 'مثال 2: اسحب الرجل ليصعد بالصندوق إلى نهاية السلّم (2.5 m)، واضغط «الخطوة التالية» لترى الحل: 490 J.', 'مشهد «الشلال»: غيّر ارتفاع الشلال ولاحظ الطاقة الكامنة للماء وكيف تدير العجلة في الأسفل.', 'مشهد «الرفّين»: في أي الحالتين يمتلك الجسم طاقة كامنة أكبر؟ ولماذا؟'],
    concl: ['الطاقة الكامنة: الطاقة التي يختزنها الجسم بسبب موقعه بالنسبة لسطح الأرض.', 'P.E = m × g × h ، حيث m كتلة الجسم و g التعجيل الأرضي و h ارتفاع الجسم عن سطح الأرض.', 'تزداد الطاقة الكامنة بزيادة الارتفاع وبزيادة الكتلة.', 'مثال 2: P.E = 20 × 9.8 × 2.5 = 490 J.', 'الجسم على سطح الأرض (h = 0) طاقته الكامنة صفر، فإذا رفعناه اكتسب طاقة كامنة تساوي الشغل المنجز في رفعه.'],
    laws: ['g8_pe', 'g8_work'],
    fact: ['تمتلك مياه الشلال طاقة كامنة كبيرة بسبب ارتفاعها العالي عن سطح الأرض، وتستعمل السدود هذه الطاقة لتوليد الكهرباء.', 'الكرة على ارتفاع 150 cm تمتلك طاقة كامنة أكبر من الكرة نفسها على ارتفاع 70 cm.'],
    controls: [SEL('sc', 'المثال', Object.entries(SC), 'hold', (v, S) => D.pick(S)),
      R('m', 'الكتلة m', .5, 30, 2, .5, 'kg', (v, S) => { S.fallE = 0; }), R('hw', 'ارتفاع الشلال', 5, 40, 20, 5, 'm'),
      TG('frc', 'سهم الوزن', true, null, 'force'), TG('hgt', 'سهم الارتفاع h', true, null, 'vector'), TG('bars', 'أعمدة الطاقة', true, null, 'energy'), TG('lab', 'المعادلة والحل', true, null, 'labels')],
    setup(S) { D.pick(S); },
    pick(S) { S.stp = 0; S.h = 1.2; S.fall = 0; S.v = 0; S.y = 1.2; S.u = 0; S.t2 = 0; if (S.p.sc === 'ex2') setParam(S, 'm', 20, false); else if (S.p.sc === 'hold' || S.p.sc === 'shelf') setParam(S, 'm', 2, false); },
    geo(S) { const w = S.W, h = S.H, gy = h * .84, pxm = clamp((gy - 140) / 2.8, 80, 190); return { w, h, gy, pxm, s: 1.75 * pxm / 175, cx: (w + 64) / 2 }; },
    update(S, dt) { dt = Math.min(dt, .04); const p = S.p; if (p.sc === 'hold' && S.fall === 1) { S.v += Q23.G * dt; S.y -= S.v * dt; if (S.y <= 0) { S.y = 0; S.v = 0; S.fall = 2; C2.msg(S, 'تحولت الطاقة الكامنة إلى حركية\nثم إلى صوت وحرارة عند الاصطدام', 2.5); } }
      S.t2 += dt; },
    draw(ctx, w, h, S) { const p = S.p, g = D.geo(S); D['d_' + p.sc](ctx, S, g); Q23.banner(ctx, w, 'الطاقة الكامنة P.E = m × g × h', '#7c3aed', 20); C2.drawMsg(ctx, S, g.cx, h * .3); K.party(ctx, S); },
    d_hold(ctx, S, g) {
      const p = S.p, gy = g.gy; K.bg(ctx, g.w, g.h, { benchY: gy, top: '#f8fafc', bottom: '#f1f5f9' });
      const fx = g.w < 600 ? g.w * .55 : g.cx - 80, held = !S.fall, br = .12 * g.pxm, ballY = gy - S.y * g.pxm;
      const drawBall = (c, x, y) => { if (held) K.ball(c, x, y - br, br, '#9ca3af'); };
      const B = Q23.lifter(ctx, { fx, gy, s: g.s, hb: Math.min(S.h, 1.55) - .02, pxm: g.pxm, bw: br * 2, bh: br * 2, style: { shirt: '#86efac', pants: '#1d4ed8', shoe: '#78350f', sleeve: 'long' }, draw: drawBall });
      const bx = B.bx; if (!held) K.ball(ctx, bx, ballY - br, br, '#9ca3af');
      const yb = held ? gy - S.h * g.pxm : ballY; S._ball = [bx, yb - br];
      if (p.hgt !== false) { K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(bx + br + 4, yb); ctx.lineTo(bx + br + 70, yb); ctx.stroke(); G.arrow(ctx, bx + br + 56, gy, bx + br + 56, yb, '#2563eb', 3, 10); G.arrow(ctx, bx + br + 56, yb, bx + br + 56, gy, '#2563eb', 3, 10); }); Q23.T(ctx, 'h = ' + Q23.nf((gy - yb) / g.pxm, 2) + ' m', bx + br + 64, (gy + yb) / 2, { s: 13, w: 900, c: '#fff', bg: '#2563eb', a: 'left' }); }
      if (p.frc !== false) Q23.F(ctx, bx - br - 20, yb - br, 0, 60, 'w = m g', '#dc2626', 4);
      const hh = (gy - yb) / g.pxm, Ep = p.m * Q23.G * hh, Ek = S.fall === 1 ? .5 * p.m * S.v * S.v : 0, E0 = p.m * Q23.G * S.h, Eh = S.fall === 2 ? E0 : 0;
      if (p.bars !== false) Q23.bars(ctx, 320, 100, 230, 170, [{ n: 'كامنة', v: Ep, c: '#7c3aed' }, { n: 'حركية', v: Ek, c: '#16a34a' }, { n: 'صوت وحرارة', v: Eh, c: '#ea580c' }], Math.max(E0, 1) * 1.05, 'الطاقة (J)');
      if (p.lab !== false) Q23.card(ctx, S, [{ t: 'P.E = m × g × h', c: '#7c3aed', mono: 1, s: 14 }, { t: '= ' + p.m + ' × 9.8 × ' + Q23.nf(hh, 2), c: '#1d4ed8', mono: 1 }, { t: '= ' + Q23.nf(Ep, 2) + ' J', c: '#15803d', w: 900, s: 14 }], { title: 'تمتلك الكرة طاقة كامنة عند رفعها', bd: '#7c3aed', wd: 300 });
      const Bt = D.btns(S); C2.btn(ctx, Bt[0].x, Bt[0].y, Bt[0].w, Bt[0].h, S.fall ? '↺ أعد الكرة' : '✋ أفلت الكرة', { col: S.fall ? '#475569' : '#dc2626' });
    },
    d_ex2(ctx, S, g) {
      const p = S.p, gy = g.gy, n = 10, Hm = 2.5, pxm = Math.min(g.pxm, (gy - 160) / 3.6), sw = Math.min(46, (g.w - 340) / n), shp = Hm / n * pxm, x0 = g.w - 110, s = 1.75 * pxm / 175;
      K.bg(ctx, g.w, g.h, { benchY: gy, top: '#f5f5f4', bottom: '#e7e5e4', tiles: false });
      Q23.stairs(ctx, x0, gy, n, sw, shp, -1, { railC: '#a8a29e' });
      K.raw(ctx, () => { ctx.fillStyle = '#d6d3d1'; ctx.fillRect(40, gy - n * shp, x0 - n * sw - 40, n * shp); ctx.fillStyle = '#78716c'; ctx.fillRect(40, gy - n * shp - 4, x0 - n * sw - 38, 5); });
      const u = S.u, bw = .4 * pxm, bh = .32 * pxm;
      const hip = Q23.climber(ctx, { x0, gy, sw, shp, n, dir: -1, s, u, style: { shirt: '#0d9488', pants: '#334155', sleeve: 'long' } });
      const hbox = Math.min(n, u) * Hm / n, bx = hip[0] - 30 * s, by = hip[1] - 4 * s; Q23.cbox(ctx, bx, by, bw, bh, { label: '20 kg' });
      K.raw(ctx, () => { ctx.fillStyle = '#f1c27d'; [[bx + bw / 2 - 2, by - bh * .4], [bx - bw / 2 + 2, by - bh * .4]].forEach(q => { ctx.beginPath(); ctx.arc(q[0], q[1], 5 * s, 0, TAU); ctx.fill(); }); });
      S._kid = [hip[0], hip[1] + 20];
      if (p.hgt !== false) { const xt = x0 - n * sw - 30; K.raw(ctx, () => { G.arrow(ctx, xt, gy, xt, gy - n * shp, '#2563eb', 3, 10); G.arrow(ctx, xt, gy - n * shp, xt, gy, '#2563eb', 3, 10); }); Q23.T(ctx, 'h = 2.5 m', xt - 8, gy - n * shp / 2, { s: 13, w: 900, c: '#fff', bg: '#2563eb', a: 'right' }); }
      if (p.bars !== false) Q23.bars(ctx, 270, 110, 170, 170, [{ n: 'P.E', v: 20 * 9.8 * hbox, c: '#7c3aed' }], 490 * 1.05, 'طاقة الصندوق (J)');
      if (p.lab !== false) Q23.solve(ctx, S, [{ t: '1) المعطيات: m = 20 kg ، h = 2.5 m ، g = 9.8 m/s²', c: '#0f172a' }, { t: 'P.E = m × g × h', c: '#dc2626', mono: 1 }, { t: '= 20 × 9.8 × 2.5', c: '#1d4ed8', mono: 1 }, { t: '= 490 J  الطاقة الكامنة للصندوق', c: '#15803d', w: 900, s: 14 }], 'مثال 2 — الحل', { q: 'يقوم رجل بنقل صندوق كتلته 20Kg من أسفل سلّم ارتفاعه 2.5m إلى نهايته، احسب الطاقة الكامنة للصندوق.' });
      Q23.T(ctx, 'ارتفاع الصندوق الآن: ' + Q23.nf(hbox, 2) + ' m ← P.E = ' + Q23.nf(20 * 9.8 * hbox, 1) + ' J', (g.w + 64) / 2, gy + 30, { s: 13, w: 900, c: '#fff', bg: '#7c3aed' });
      const Bt = D.btns(S); C2.btn(ctx, Bt[0].x, Bt[0].y, Bt[0].w, Bt[0].h, S.stp >= 3 ? '↺ أخفِ الحل' : 'الخطوة التالية ⟵', { col: '#7c3aed' });
    },
    d_fall(ctx, S, g) {
      const p = S.p, gy = g.gy, top = 120, H = gy - top - 40, cx = g.cx - 40; Q23.outdoor(ctx, g.w, g.h, gy, { g1: '#4ade80', g2: '#166534' });
      const hp = H * p.hw / 40, ty = gy - hp;
      K.raw(ctx, () => { const rg = ctx.createLinearGradient(cx - 200, 0, cx, 0); rg.addColorStop(0, '#78716c'); rg.addColorStop(1, '#a8a29e'); ctx.fillStyle = rg; ctx.beginPath(); ctx.moveTo(70, gy); ctx.lineTo(70, ty - 10); ctx.lineTo(cx - 10, ty - 6); ctx.lineTo(cx, ty + 14); ctx.lineTo(cx - 6, gy); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(68,64,60,.35)'; ctx.lineWidth = 1; for (let y = ty + 10; y < gy; y += 18) { ctx.beginPath(); ctx.moveTo(72, y); ctx.lineTo(cx - 8, y + 4); ctx.stroke(); }
        ctx.fillStyle = '#22c55e'; ctx.fillRect(70, ty - 16, cx - 80, 8); ctx.fillStyle = '#38bdf8'; ctx.fillRect(70, ty - 8, cx - 70, 8);
        const wg = ctx.createLinearGradient(cx, 0, cx + 50, 0); wg.addColorStop(0, 'rgba(186,230,253,.95)'); wg.addColorStop(1, 'rgba(56,189,248,.8)'); ctx.fillStyle = wg; ctx.beginPath(); ctx.moveTo(cx - 2, ty - 8); ctx.quadraticCurveTo(cx + 22, ty, cx + 26, ty + 30); ctx.lineTo(cx + 40, gy - 8); ctx.lineTo(cx + 4, gy - 8); ctx.lineTo(cx + 2, ty + 20); ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.8)'; for (let k = 0; k < 18; k++) { const f = ((S.t2 * 1.3 + k / 18) % 1), yy = ty + f * f * hp, xx = cx + 8 + f * 26 + (k % 3) * 4; ctx.fillRect(xx, yy, 2.5, 10); }
        ctx.fillStyle = '#0ea5e9'; ctx.fillRect(cx - 20, gy - 10, g.w - cx + 20, 12); ctx.fillStyle = 'rgba(255,255,255,.7)'; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(cx + 22 + k * 6, gy - 10, 6 - k * .6, Math.PI, TAU); ctx.fill(); } });
      const wx = cx + 120, wy = gy - 46, wr = 40, ang = S.t2 * Math.sqrt(2 * 9.8 * p.hw) * .25; K.raw(ctx, () => { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(wx, wy, wr, 0, TAU); ctx.stroke(); for (let k = 0; k < 8; k++) { const a = ang + k * Math.PI / 4; ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + Math.cos(a) * (wr + 10), wy + Math.sin(a) * (wr + 10)); ctx.stroke(); ctx.fillStyle = '#a16207'; ctx.fillRect(wx + Math.cos(a) * (wr + 6) - 6, wy + Math.sin(a) * (wr + 6) - 6, 12, 12); } });
      if (p.hgt !== false) { K.raw(ctx, () => { G.arrow(ctx, cx - 40, gy, cx - 40, ty, '#fff', 3, 10); G.arrow(ctx, cx - 40, ty, cx - 40, gy, '#fff', 3, 10); }); Q23.T(ctx, 'h = ' + p.hw + ' m', cx - 46, (gy + ty) / 2, { s: 13, w: 900, c: '#fff', bg: '#2563eb', a: 'right' }); }
      const E = 9.8 * p.hw, v = Math.sqrt(2 * 9.8 * p.hw);
      if (p.bars !== false) Q23.bars(ctx, g.w - 12, 170, 220, 160, [{ n: 'كامنة أعلاه', v: E, c: '#7c3aed' }, { n: 'حركية أسفله', v: E, c: '#16a34a' }], 400, 'طاقة 1 kg من الماء (J)');
      if (p.lab !== false) Q23.card(ctx, S, [{ t: 'لكل 1 kg من الماء في أعلى الشلال:', c: '#0f172a' }, { t: 'P.E = 1 × 9.8 × ' + p.hw + ' = ' + Q23.nf(E, 1) + ' J', c: '#7c3aed', mono: 1 }, { t: 'تتحول إلى حركية: سرعة الماء في الأسفل ≈ ' + Q23.nf(v, 1) + ' m/s', c: '#16a34a' }], { title: 'تمتلك مياه الشلال طاقة كامنة كبيرة', bd: '#7c3aed', wd: 380, y: 44 });
    },
    d_shelf(ctx, S, g) {
      const p = S.p, gy = g.gy; K.bg(ctx, g.w, g.h, { benchY: gy, top: '#fefce8', bottom: '#fef9c3' });
      [.7, 1.5].forEach((hm, i) => { const x = g.cx - 150 + i * 240, y = gy - hm * g.pxm * .9;
        K.raw(ctx, () => { ctx.fillStyle = '#92400e'; ctx.fillRect(x - 70, y, 140, 10); ctx.fillRect(x - 64, y + 10, 8, gy - y - 10); ctx.fillRect(x + 56, y + 10, 8, gy - y - 10); });
        K.ball(ctx, x, y - 22, 22, '#ef4444');
        K.raw(ctx, () => { G.arrow(ctx, x + 90, gy, x + 90, y, '#2563eb', 3, 10); G.arrow(ctx, x + 90, y, x + 90, gy, '#2563eb', 3, 10); }); Q23.T(ctx, hm * 100 + ' cm', x + 98, (gy + y) / 2, { s: 13, w: 900, c: '#fff', bg: '#2563eb', a: 'left' });
        Q23.T(ctx, 'P.E = ' + p.m + ' × 9.8 × ' + hm + ' = ' + Q23.nf(p.m * 9.8 * hm, 2) + ' J', x, y - 64, { s: 12.5, w: 900, c: '#fff', bg: i ? '#7c3aed' : '#a855f7' }); });
      if (p.lab !== false) Q23.card(ctx, S, [{ t: 'الجسم نفسه (الكتلة نفسها):', c: '#0f172a' }, { t: 'على ارتفاع 150 cm طاقته الكامنة أكبر', c: '#7c3aed', w: 900 }, { t: 'لأن الطاقة الكامنة تزداد بزيادة الارتفاع', c: '#15803d' }], { title: 'في أي الحالتين P.E أكبر؟', bd: '#7c3aed', wd: 330 });
    },
    btns(S) { return Q23.rowL(64, 1, 160); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), p = S.p, B = D.btns(S), L = [];
      if (p.sc === 'hold') { L.push(Q23.btnObj('drop', B[0], S => { if (S.fall) { S.fall = 0; S.v = 0; } else { S.fall = 1; S.y = S.h; S.v = 0; } }, { hint: true }));
        if (!S.fall && S._ball) L.push({ id: 'ball', x: S._ball[0], y: S._ball[1], r: 40, axis: 'y', keep: true, tip: 'اسحب الكرة للأعلى أو للأسفل', idle: 'ارفع الكرة ✋', down: S => { S.h0 = S.h; }, drag: (S, d) => { S.h = clamp(S.h0 - (d.y - d.sy) / g.pxm, .25, 1.75); } }); }
      if (p.sc === 'ex2') { L.push(Q23.btnObj('step', B[0], S => { S.stp = S.stp >= 3 ? 0 : S.stp + 1; if (S.stp === 3) K.cheer(S, S.W * .6, S.H * .3); }, { hint: true }));
        if (S._kid) { const n = 10, sw = Math.min(46, (g.w - 340) / n), x0 = g.w - 110; L.push({ id: 'man', x: S._kid[0], y: S._kid[1], r: 56, axis: 'xy', keep: true, tip: 'اسحب الرجل ليصعد السلّم بالصندوق', idle: 'اصعد بالصندوق ✋', drag: (S, d) => { S.u = clamp((x0 - d.x) / sw + .3, 0, n); } }); } }
      return L; },
    readings(S) { const p = S.p; if (p.sc === 'ex2') { const hb = Math.min(10, S.u) * .25; return [rd('ارتفاع الصندوق', Q23.nf(hb, 2) + ' m'), rd('P.E', Q23.nf(20 * 9.8 * hb, 1) + ' J')]; } if (p.sc === 'fall') return [rd('ارتفاع الشلال', p.hw + ' m'), rd('P.E لكل 1 kg', Q23.nf(9.8 * p.hw, 1) + ' J')];
      if (p.sc === 'shelf') return [rd('على 70 cm', Q23.nf(p.m * 9.8 * .7, 2) + ' J'), rd('على 150 cm', Q23.nf(p.m * 9.8 * 1.5, 2) + ' J')]; const hh = S.fall ? S.y : S.h; return [rd('الارتفاع h', Q23.nf(hh, 2) + ' m'), rd('الطاقة الكامنة', Q23.nf(p.m * 9.8 * hh, 2) + ' J'), rd('الطاقة الحركية', Q23.nf(.5 * p.m * S.v * S.v, 2) + ' J')]; },
    record(S) { if (S.p.sc !== 'hold' || S.fall) { Runner.toast('الجدول لمشهد رفع الكرة (قبل الإفلات)', 'info'); return null; } return { m: S.p.m, h: +S.h.toFixed(2), PE: +(S.p.m * 9.8 * S.h).toFixed(2) }; },
    cols: [['m', 'm (kg)'], ['h', 'h (m)'], ['PE', 'P.E (J)']],
    graph: { x: 'h', y: 'PE', xl: 'الارتفاع h (m)', yl: 'الطاقة الكامنة P.E (J)', theory: (x, S) => S.p.m * 9.8 * x, xmin: 0, xmax: 1.8 },
    explain(S) { const p = S.p; if (p.sc === 'ex2') return 'كلما صعد الرجل ازداد ارتفاع الصندوق فازدادت طاقته الكامنة، وفي نهاية السلّم <b>P.E = 20 × 9.8 × 2.5 = 490 J</b>.'; if (p.sc === 'fall') return 'مياه الشلال تمتلك طاقة كامنة كبيرة بسبب ارتفاعها العالي، وعند سقوطها تتحول إلى طاقة حركية تدير العجلة.'; if (p.sc === 'shelf') return 'الطاقة الكامنة تعتمد على الارتفاع: الجسم على ارتفاع <b>150 cm</b> طاقته الكامنة أكبر.';
      return S.fall ? 'في أثناء السقوط يقل الارتفاع فتقل الطاقة الكامنة وتزداد الطاقة الحركية، ومجموعهما ثابت؛ وعند الاصطدام تتحول إلى صوت وحرارة.' : 'رفعنا الكرة إلى ارتفاع <b>' + Q23.nf(S.h, 2) + ' m</b> فأنجزنا شغلاً ضد الجاذبية، وهو مختزن فيها طاقةً كامنة <b>' + Q23.nf(p.m * 9.8 * S.h, 2) + ' J</b>.'; },
    quiz: [
      { q: 'في أي الحالات يمتلك الجسم طاقة كامنة أكبر: على ارتفاع 70cm أم على ارتفاع 150cm؟', o: ['70 cm', '150 cm', 'متساويتان'], a: 1, why: 'مراجعة الدرس س1: تزداد الطاقة الكامنة بزيادة الارتفاع.' },
      { q: 'عند رفع مواد بناء كتلتها 30Kg إلى أعلى بناية ارتفاعها 10m، ما مقدار الطاقة التي اكتسبتها؟', o: ['300 J', '2940 J', '29.4 J'], a: 1, why: 'مراجعة الفصل س4: P.E = 30 × 9.8 × 10 = 2940 J.' },
      { q: 'يختزن جسم طاقة كامنة 100J على ارتفاع 5m، فإن الارتفاع الذي تصبح فيه طاقته الكامنة 60J هو (g = 10 m/s²):', o: ['2 m', '3 m', '4 m'], a: 1, why: 'مراجعة الفصل س2-4: m g = 20 N ، h = 60 ÷ 20 = 3 m.' }
    ]
  };
  Q23.P[D.id] = D;
})();

/* =========================================================================================
   11) تحولات الطاقة وقانون حفظ الطاقة (ص 41): لعبة التزحلق (الشكل)، البندول، المتزلج (س8)، الكرة الساقطة والمطرقة
   ========================================================================================= */
(() => {
  const SC = { slide: '🛝 الطفل ولعبة التزحلق (الكتاب)', pend: '🕰️ البندول', ski: '⛷️ المتزلج على المنحدر (س8)', ball: '⚽ كرة تسقط وترتد' };
  const TRK = { slide: [[0, 1.7], [.35, 1.7], [.6, 1.62], [1.0, 1.25], [1.5, .78], [2.0, .42], [2.4, .3], [2.7, .28], [3.3, .28]],
    ski: [[0, 3.2], [.6, 3.15], [1.5, 2.7], [3, 1.6], [4.5, .7], [6, .3], [7.5, .3], [8.6, .7], [9.6, 1.5]] };
  const prep = pts => { const s = [0]; for (let i = 1; i < pts.length; i++) s.push(s[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return { pts, s, L: s[s.length - 1] }; };
  const T = { slide: prep(TRK.slide), ski: prep(TRK.ski) };
  const at = (tr, s) => { s = clamp(s, 0, tr.L); let i = 1; while (i < tr.s.length - 1 && tr.s[i] < s) i++; const a = tr.pts[i - 1], b = tr.pts[i], f = (s - tr.s[i - 1]) / (tr.s[i] - tr.s[i - 1] || 1); const dx = (b[0] - a[0]) / (tr.s[i] - tr.s[i - 1]), dy = (b[1] - a[1]) / (tr.s[i] - tr.s[i - 1]); return { x: lerp(a[0], b[0], f), y: lerp(a[1], b[1], f), tx: dx, ty: dy }; };
  const MU = { slide: .12, ski: .06 };
  const D = { id: 'g8_conserve', ch: 23, sec: 'الدرس 2', page: 41, kind: 'نشاط', fig: 'لعبة التزحلق',
    title: 'تحولات الطاقة وقانون حفظ الطاقة',
    desc: 'قد تمتلك الأجسام طاقة كامنة أو طاقة حركية، ويمكن للجسم أن يمتلك الاثنتين في الوقت نفسه. الطفل في أعلى لعبة التزحلق يمتلك طاقة كامنة، وعندما يبدأ بالتزحلق تتحول الطاقة الكامنة إلى طاقة حركية، ومقدار الطاقة الكلي يبقى ثابتاً: الطاقة لا تفنى ولا تستحدث وإنما تتحول من شكل إلى آخر.',
    tags: 'تحولات الطاقة حفظ الطاقة لعبة التزحلق كامنة حركية بندول متزلج كرة مطرقة حرارة احتكاك',
    tools: ['لعبة تزحلق', 'بندول', 'منحدر ثلجي', 'كرة'],
    steps: ['مشهد «لعبة التزحلق»: اسحب الطفل إلى أعلى اللعبة (أو أي نقطة عليها) واتركه. راقب أعمدة الطاقة: E_p في الأعلى، E_p + E_k في المنتصف، E_k في الأسفل (كما في الشكل).', 'لاحظ عمود «الطاقة الكلية»: هل يتغير؟', 'فعّل «الاحتكاك»: أين تذهب الطاقة؟ (تتحول إلى حرارة) — هل يبقى المجموع ثابتاً؟', 'مشهد «البندول»: اسحب الثقل جانباً واتركه، ولاحظ تبادل الطاقة الكامنة والحركية.', 'مشهد «المتزلج» (س8): أي شكل للطاقة يكون لدى المتزلج وهو أعلى المنحدر؟ وماذا يحدث لها عند منتصف المنحدر؟', 'مشهد «الكرة»: اسحب الكرة للأعلى وأفلتها. لماذا يقل ارتفاع الارتداد في كل مرة؟ أين تذهب الطاقة؟'],
    concl: ['الطفل في أعلى لعبة التزحلق يمتلك طاقة كامنة، تتحول إلى طاقة حركية باستمرار التزحلق.', 'في منتصف المنحدر يمتلك الجسم طاقة كامنة وطاقة حركية معاً (E_p + E_k).', 'مقدار الطاقة الكلي يبقى ثابتاً: الطاقة لا تفنى ولا تستحدث وإنما تتحول من شكل إلى آخر، وتسمى هذه الحقيقة قانون حفظ الطاقة.', 'عند وجود الاحتكاك يتحول جزء من الطاقة إلى طاقة حرارية (وصوتية)، ويبقى المجموع ثابتاً.', 'عندما تتوقف الكرة المتحركة على أرض أفقية تتحول طاقتها الحركية إلى حرارة (وصوت) بسبب الاحتكاك.'],
    laws: ['g8_cons', 'g8_pe', 'g8_ke'],
    fact: ['عند الطرق بالمطرقة تتحول طاقتها الكامنة إلى طاقة حركية ثم إلى طاقة حرارية وصوتية (مراجعة الفصل س2-5).', 'لو لم يوجد احتكاك ولا مقاومة هواء لاستمر البندول بالتأرجح إلى الأبد!'],
    controls: [SEL('sc', 'المثال', Object.entries(SC), 'slide', (v, S) => D.reset(S)),
      R('m', 'الكتلة m', 10, 80, 30, 5, 'kg', (v, S) => D.reset(S)),
      TG('fric', 'الاحتكاك ومقاومة الهواء', false, (v, S) => D.reset(S), 'heat'),
      BT('', [{ t: '▶ اترك الجسم', on: S => { S.go = 1; S.v = 0; } }, { t: '↺ أعد', on: S => D.reset(S) }]),
      TG('bars', 'أعمدة الطاقة', true, null, 'energy'), TG('vel', 'سهم السرعة', true, null, 'velocity'), TG('trail', 'صور متتابعة', true, null, 'dot'), TG('lab', 'التسميات E_p و E_k', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { const sc = S.p.sc; S.go = 0; S.v = 0; S.Q = 0; S.tr = []; S.done = 0; S.s = sc === 'slide' ? .2 : sc === 'ski' ? .3 : 0; S.th = .9; S.om = 0; S.y = 2; S.y0 = 2; S.bn = 0; D.E0(S); },
    E0(S) { S.Etot = D.en(S).Ep + D.en(S).Ek; S.Q = 0; },
    en(S) { const m = S.p.m, g = Q23.G, sc = S.p.sc;
      if (sc === 'pend') { const L = 2; return { Ep: m * g * L * (1 - Math.cos(S.th)), Ek: .5 * m * (S.om * L) ** 2, h: L * (1 - Math.cos(S.th)), v: Math.abs(S.om * L) }; }
      if (sc === 'ball') return { Ep: m * g * S.y, Ek: .5 * m * S.v * S.v, h: S.y, v: Math.abs(S.v) };
      const q = at(T[sc], S.s), y0 = sc === 'slide' ? .28 : .3; return { Ep: m * g * (q.y - y0), Ek: .5 * m * S.v * S.v, h: q.y - y0, v: Math.abs(S.v) }; },
    update(S, dt) {
      dt = Math.min(dt, .04); if (!S.W || !S.go) return; const p = S.p, g = Q23.G, n = 20, h = dt / n, sc = p.sc;
      for (let i = 0; i < n; i++) {
        if (sc === 'pend') { const L = 2, a = -g / L * Math.sin(S.th) - (p.fric ? .25 * S.om : 0); S.om += a * h; S.th += S.om * h; }
        else if (sc === 'ball') { S.v -= g * h; S.y += S.v * h; if (p.fric) S.v -= .02 * S.v * h; if (S.y <= 0) { S.y = 0; if (Math.abs(S.v) < .4) { S.v = 0; S.go = 0; S.done = 1; break; } const e = p.fric ? .75 : 1; S.v = -S.v * e; S.bn++; if (p.fric) C2.msg(S, 'طَق! جزء من الطاقة تحول إلى صوت وحرارة', 1.2); } }
        else { const tr = T[sc], q = at(tr, S.s), mu = p.fric ? MU[sc] : 0, cos = Math.abs(q.tx); let a = -g * q.ty; const fr = mu * g * cos; if (Math.abs(S.v) > 1e-3) a -= fr * Math.sign(S.v); else if (Math.abs(a) <= fr) a = 0;
          S.v += a * h; S.s += S.v * h; if (S.s <= 0) { S.s = 0; S.v = Math.max(0, S.v); } if (S.s >= tr.L) { S.s = tr.L; if (sc === 'slide') { S.Q += .5 * p.m * S.v * S.v; S.v = 0; S.go = 0; S.done = 1; C2.msg(S, 'وصل الطفل إلى الأرض: تحولت طاقته الحركية\nإلى حرارة وصوت عند التوقف', 2.5); K.cheer(S, S.W * .6, S.H * .5); break; } S.v = Math.min(0, S.v); }
          if (p.fric && Math.abs(S.v) < .02 && Math.abs(-g * q.ty) <= fr && S.Etot - D.en(S).Ep - D.en(S).Ek > .5) { S.v = 0; } }
      }
      const E = D.en(S); if (!(sc === 'slide' && S.done)) S.Q = Math.max(0, S.Etot - E.Ep - E.Ek);
      if (p.trail !== false) { const P = D.pos(S); if (P) Q23strobe(S, P); }
    },
    view(S) { const w = S.W, h = S.H, sc = S.p.sc, gy = h * .86;
      if (sc === 'slide') { const pxm = clamp(Math.min((w - (w > 700 ? 420 : 110)) / 3.4, (gy - 170) / 2.0), 50, 400); return { gy, pxm, ox: Math.max(w > 700 ? 300 : 90, w - 40 - 3.4 * pxm), oy: gy }; }
      if (sc === 'ski') { const pxm = Math.max(20, Math.min((w - 130) / 9.8, (gy - 150) / 3.4)); return { gy, pxm, ox: 80, oy: gy }; }
      if (sc === 'pend') { const pxm = Math.min((gy - 190) / 2.2, 150); return { gy, pxm, ox: (w + 64) / 2 - 40, oy: gy - 2.35 * pxm }; }
      const pxm = (gy - 170) / 2.6; return { gy, pxm, ox: (w + 64) / 2 - 20, oy: gy }; },
    pos(S) { const V = D.view(S), sc = S.p.sc; if (sc === 'pend') return [V.ox + Math.sin(S.th) * 2 * V.pxm, V.oy + Math.cos(S.th) * 2 * V.pxm]; if (sc === 'ball') return [V.ox, V.oy - S.y * V.pxm - .15 * V.pxm]; const q = at(T[sc], S.s); return [V.ox + q.x * V.pxm, V.oy - q.y * V.pxm]; },
    draw(ctx, w, h, S) {
      const p = S.p, sc = p.sc, V = D.view(S), X = x => V.ox + x * V.pxm, Y = y => V.oy - y * V.pxm, E = D.en(S);
      if (sc === 'ski') Q23.outdoor(ctx, w, h, V.gy, { top: '#93c5fd', bot: '#e0f2fe', g1: '#f8fafc', g2: '#e2e8f0' }); else if (sc === 'slide') Q23.outdoor(ctx, w, h, V.gy); else K.bg(ctx, w, h, { benchY: V.gy });
      if (p.trail !== false) K.raw(ctx, () => { (S.tr || []).forEach((q, i, a) => { ctx.globalAlpha = .15 + .5 * i / a.length; ctx.fillStyle = '#a855f7'; ctx.beginPath(); ctx.arc(q[0], q[1], 4, 0, TAU); ctx.fill(); }); ctx.globalAlpha = 1; });
      if (sc === 'slide') D.dSlide(ctx, S, V, X, Y); else if (sc === 'ski') D.dSki(ctx, S, V, X, Y); else if (sc === 'pend') D.dPend(ctx, S, V); else D.dBall(ctx, S, V);
      const P = D.pos(S);
      if (p.vel !== false && E.v > .05 && P) { let dx = 1, dy = 0; if (sc === 'pend') { dx = Math.cos(S.th) * Math.sign(S.om); dy = -Math.sin(S.th) * Math.sign(S.om); } else if (sc === 'ball') { dx = 0; dy = -Math.sign(S.v); } else { const q = at(T[sc], S.s); dx = q.tx * Math.sign(S.v); dy = -q.ty * Math.sign(S.v); } const L = clamp(E.v * 14, 12, 110); Q23.F(ctx, P[0] + (sc === 'ball' ? 40 : 0), P[1] - (sc === 'ball' ? 0 : 50), dx * L, dy * L, 'v', '#16a34a', 4); }
      if (p.lab !== false && P) { const lab = E.Ek < .03 * S.Etot ? 'E_p' : E.Ep < .03 * S.Etot ? 'E_k' : 'E_p + E_k'; Q23.T(ctx, lab, P[0] + 46, P[1] - 70, { s: 15, w: 900, c: '#fff', bg: '#0f172a', mono: 1 }); }
      if (p.bars !== false) Q23.bars(ctx, w - 12, 44, 300, 200, [{ n: 'كامنة E_p', v: E.Ep, c: '#7c3aed' }, { n: 'حركية E_k', v: E.Ek, c: '#16a34a' }, { n: 'حرارة وصوت', v: S.Q, c: '#ea580c' }, { n: 'الكلية', v: E.Ep + E.Ek + S.Q, c: '#0f172a' }], Math.max(1, S.Etot) * 1.05, 'الطاقة (J) — المجموع ثابت');
      Q23.banner(ctx, w, 'قانون حفظ الطاقة: الطاقة لا تفنى ولا تستحدث', '#0f766e', 20);
      C2.drawMsg(ctx, S, (w + 64) / 2, h * .42); K.party(ctx, S);
      S._P = P;
    },
    dSlide(ctx, S, V, X, Y) { const tr = T.slide, s = 1.25 * V.pxm / 175;
      K.raw(ctx, () => { // ladder + platform (orange), slide (blue) like the book
        ctx.strokeStyle = '#f97316'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(-.15), V.gy); ctx.lineTo(X(.05), Y(1.75)); ctx.moveTo(X(.45), V.gy); ctx.lineTo(X(.4), Y(1.7)); ctx.stroke();
        ctx.lineWidth = 4; for (let k = 1; k < 6; k++) { const f = k / 6; ctx.beginPath(); ctx.moveTo(X(-.15 + .2 * f), V.gy - f * (V.gy - Y(1.75))); ctx.lineTo(X(.45 - .05 * f), V.gy - f * (V.gy - Y(1.7))); ctx.stroke(); }
        ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(X(.05), Y(2.05)); ctx.quadraticCurveTo(X(.2), Y(2.15), X(.4), Y(2.0)); ctx.lineTo(X(.42), Y(1.72)); ctx.stroke();
        ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 16; ctx.lineJoin = 'round'; ctx.beginPath(); tr.pts.forEach((q, i) => i ? ctx.lineTo(X(q[0]), Y(q[1]) + 8) : ctx.moveTo(X(q[0]), Y(q[1]) + 8)); ctx.stroke();
        ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 6; ctx.beginPath(); tr.pts.forEach((q, i) => i ? ctx.lineTo(X(q[0]), Y(q[1]) + 2) : ctx.moveTo(X(q[0]), Y(q[1]) + 2)); ctx.stroke();
        ctx.strokeStyle = '#1e40af'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(X(2.7), Y(.28) + 14); ctx.lineTo(X(2.7), V.gy); ctx.moveTo(X(1.1), Y(1.15) + 14); ctx.lineTo(X(1.1), V.gy); ctx.stroke(); ctx.lineCap = 'butt'; });
      const q = at(tr, S.s), x = X(q.x), y = Y(q.y), ang = Math.atan2(-q.ty, q.tx), nx = Math.sin(ang), ny = -Math.cos(ang);
      const hip = [x + nx * 12 * s, y + ny * 12 * s], ft = [hip[0] + Math.cos(ang) * 78 * s, hip[1] + Math.sin(ang) * 78 * s];
      Q23.man(ctx, { hip, dir: 1, s, lean: ang * .5, feet: [ft, [ft[0] - 4, ft[1] - 2]], hands: S.s < .5 ? [[hip[0] + 20 * s, hip[1] - 100 * s], [hip[0] + 10 * s, hip[1] - 96 * s]] : [[hip[0] + 30 * s, hip[1] + 8 * s], [hip[0] + 26 * s, hip[1] + 4 * s]], elb: [-1, .3], shirt: '#ef4444', pants: '#1e3a8a', shoe: '#f8fafc', hair: '#a16207' });
    },
    dSki(ctx, S, V, X, Y) { const tr = T.ski;
      K.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(0), V.gy); tr.pts.forEach(q => ctx.lineTo(X(q[0]), Y(q[1]))); ctx.lineTo(X(9.6), V.gy); ctx.closePath(); ctx.fill(); ctx.beginPath(); tr.pts.forEach((q, i) => i ? ctx.lineTo(X(q[0]), Y(q[1])) : ctx.moveTo(X(q[0]), Y(q[1]))); ctx.stroke();
        ctx.fillStyle = '#166534'; [[.3, 3.2], [8.9, .95]].forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(X(a), Y(b) - 50); ctx.lineTo(X(a) - 16, Y(b) + 2); ctx.lineTo(X(a) + 16, Y(b) + 2); ctx.fill(); }); });
      const q = at(tr, S.s), x = X(q.x), y = Y(q.y), ang = Math.atan2(-q.ty, q.tx), s = .55, nx = Math.sin(ang), ny = -Math.cos(ang);
      K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-34, -3); ctx.lineTo(38, -3); ctx.quadraticCurveTo(46, -3, 46, -10); ctx.stroke(); ctx.restore(); });
      const hip = [x + nx * 52 * s - Math.cos(ang) * 8, y + ny * 52 * s], sh = [hip[0] + 20 * s, hip[1] - 40 * s];
      Q23.man(ctx, { hip, dir: 1, s, lean: .55, feet: [[x + 6, y - 2], [x - 4, y - 2]], hands: [[sh[0] + 26 * s, sh[1] + 30 * s], [sh[0] + 20 * s, sh[1] + 28 * s]], elb: [-1, .5], shirt: '#f97316', pants: '#facc15', sleeve: 'long', cap: '#1d4ed8', shoe: '#111827' });
      K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sh[0] + 26 * s, sh[1] + 30 * s); ctx.lineTo(sh[0] - 30 * s, y + 4); ctx.stroke(); });
    },
    dPend(ctx, S, V) { const P = D.pos(S), L = 2;
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(V.ox - 120, V.oy - 12, 240, 12); ctx.fillRect(V.ox + 110, V.oy - 12, 10, V.gy - V.oy + 12); ctx.fillRect(V.ox - 120, V.oy - 12, 10, V.gy - V.oy + 12);
        ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(V.ox, V.oy); ctx.lineTo(V.ox, V.oy + L * V.pxm + 20); ctx.stroke(); ctx.setLineDash([]); ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(V.ox, V.oy); ctx.lineTo(P[0], P[1]); ctx.stroke(); });
      K.ball(ctx, P[0], P[1], 20, '#b45309'); Q23.T(ctx, 'أدنى نقطة', V.ox, V.oy + L * V.pxm + 34, { s: 11, w: 800, c: '#475569' });
    },
    dBall(ctx, S, V) { const P = D.pos(S), r = .15 * V.pxm;
      K.raw(ctx, () => { ctx.fillStyle = '#a16207'; ctx.fillRect(V.ox - 150, V.gy - 2.6 * V.pxm, 6, 2.6 * V.pxm); for (let k = 0; k <= 2; k++) { ctx.fillStyle = '#422006'; ctx.fillRect(V.ox - 156, V.gy - k * V.pxm - 1, 18, 2); } });
      for (let k = 0; k <= 2; k++) Q23.T(ctx, k + ' m', V.ox - 172, V.gy - k * V.pxm, { s: 11, w: 800, c: '#422006' });
      K.ball(ctx, P[0], P[1] + r * .0, r, '#f97316'); if (!S.go && !S.done) C2.hand(ctx, P[0] - 4, P[1] - r + 2, 1, 1, { sleeve: '#16a34a', rot: Math.PI / 2 });
      if (S.bn) Q23.T(ctx, 'عدد الارتدادات: ' + S.bn, V.ox + 120, V.gy + 26, { s: 12, w: 800, c: '#fff', bg: 'rgba(30,41,59,.8)' });
    },
    drags(S) { if (!S.W || !S._P) return []; const sc = S.p.sc, V = D.view(S), P = S._P;
      const o = { id: 'body', x: P[0], y: P[1] - (sc === 'slide' || sc === 'ski' ? 30 : 0), r: 46, keep: true, tip: 'اسحب الجسم إلى موضع البداية ثم اتركه', idle: 'اسحبني ثم اتركني ✋', down: S => { S.go = 0; S.v = 0; S.om = 0; S.done = 0; S.tr = []; }, up: S => { D.E0(S); S.go = 1; } };
      if (sc === 'pend') return [Object.assign(o, { cx: V.ox, cy: V.oy, drag: (S, d) => { S.th = clamp(Math.atan2(d.x - V.ox, d.y - V.oy), -1.3, 1.3); } })];
      if (sc === 'ball') return [Object.assign(o, { axis: 'y', drag: (S, d) => { S.y = clamp((V.gy - d.y) / V.pxm - .15, 0, 2.5); } })];
      const tr = T[sc]; return [Object.assign(o, { axis: 'xy', drag: (S, d) => { let best = 0, bd = 1e9; for (let s = 0; s <= tr.L; s += .02) { const q = at(tr, s), dd = (V.ox + q.x * V.pxm - d.x) ** 2 + (V.oy - q.y * V.pxm - d.y + 30) ** 2; if (dd < bd) { bd = dd; best = s; } } S.s = best; } })]; },
    readings(S) { const E = D.en(S); return [rd('الارتفاع h', Q23.nf(E.h, 2) + ' m'), rd('السرعة v', Q23.nf(E.v, 2) + ' m/s'), rd('الطاقة الكامنة E_p', Q23.nf(E.Ep, 1) + ' J'), rd('الطاقة الحركية E_k', Q23.nf(E.Ek, 1) + ' J'), rd('حرارة وصوت', Q23.nf(S.Q, 1) + ' J'), rd('الطاقة الكلية', Q23.nf(E.Ep + E.Ek + S.Q, 1) + ' J')]; },
    record(S) { const E = D.en(S); return { h: +E.h.toFixed(2), v: +E.v.toFixed(2), Ep: +E.Ep.toFixed(1), Ek: +E.Ek.toFixed(1), Q: +S.Q.toFixed(1), T: +(E.Ep + E.Ek + S.Q).toFixed(1) }; },
    cols: [['h', 'h (m)'], ['v', 'v (m/s)'], ['Ep', 'E_p (J)'], ['Ek', 'E_k (J)'], ['Q', 'حرارة (J)'], ['T', 'المجموع (J)']],
    graph: { x: 'h', y: 'Ek', xl: 'الارتفاع h (m)', yl: 'الطاقة الحركية E_k (J)' },
    explain(S) { const E = D.en(S), sc = S.p.sc; if (!S.go && !S.done) return 'ضع الجسم في موضع مرتفع: يمتلك <b>طاقة كامنة</b> فقط (' + Q23.nf(E.Ep, 1) + ' J). ثم اتركه وراقب تحولها.';
      if (sc === 'ball' && S.p.fric) return 'عند كل اصطدام بالأرض يتحول جزء من الطاقة إلى <b>صوت وحرارة</b>، لذلك يقل ارتفاع الارتداد، والمجموع يبقى ثابتاً.';
      return 'كلما نزل الجسم قلّت طاقته الكامنة وزادت طاقته الحركية، والطاقة الكلية ثابتة (<b>' + Q23.nf(S.Etot, 1) + ' J</b>)' + (S.p.fric ? '، وجزء منها يتحول إلى <b>حرارة</b> بسبب الاحتكاك.' : '.'); },
    quiz: [
      { q: 'على ماذا ينص قانون حفظ الطاقة؟', o: ['الطاقة تفنى عند توقف الجسم', 'الطاقة لا تفنى ولا تستحدث وإنما تتحول من شكل إلى آخر', 'الطاقة الكامنة تساوي الحركية دائماً'], a: 1, why: 'مراجعة الدرس س4.' },
      { q: 'أي شكل للطاقة يكون لدى المتزلج وهو أعلى المنحدر؟', o: ['طاقة كامنة', 'طاقة حركية فقط', 'طاقة ضوئية'], a: 0, why: 'مراجعة الفصل س8-أ، وعند منتصف المنحدر تتحول جزئياً إلى حركية.' },
      { q: 'تتحول الطاقة الكامنة في المطرقة إلى:', o: ['طاقة صوتية', 'طاقة حركية وحرارية وصوتية', 'طاقة حرارية'], a: 1, why: 'مراجعة الفصل س2-5.' }
    ]
  };
  const Q23strobe = (S, P) => { const a = S.tr || (S.tr = []); if (!a.lt || S.t - a.lt > .08) { a.push(P); a.lt = S.t; if (a.length > 40) a.shift(); } };
  Q23.P[D.id] = D;
})();

/* =========================================================================================
   12) الفيزياء والمجتمع (ص 42): أشكال الطاقة وتحولاتها — محولات الطاقة
   ========================================================================================= */
(() => {
  const F = { chem: ['كيميائية', '#16a34a'], heat: ['حرارية', '#dc2626'], nuc: ['نووية', '#7c3aed'], elec: ['كهربائية', '#d97706'], light: ['ضوئية', '#ca8a04'], mech: ['ميكانيكية (حركية)', '#2563eb'], sound: ['صوتية', '#db2777'] };
  const DEV = { gen: { n: 'المولد الكهربائي', i: ['mech'], o: ['elec'], t: 'يحول الطاقة الميكانيكية إلى طاقة كهربائية.' }, lamp: { n: 'المصباح الكهربائي', i: ['elec'], o: ['light', 'heat'], t: 'يحول الطاقة الكهربائية إلى طاقة ضوئية وطاقة حرارية.' },
    solar: { n: 'الخلايا الشمسية', i: ['light'], o: ['elec'], t: 'تحول الطاقة الضوئية إلى طاقة كهربائية.' }, phones: { n: 'السماعة الكهربائية', i: ['elec'], o: ['sound'], t: 'تحول الطاقة الكهربائية إلى طاقة صوتية.' },
    battery: { n: 'البطارية', i: ['chem'], o: ['elec'], t: 'تحول الطاقة الكيميائية إلى طاقة كهربائية.' }, fan: { n: 'المروحة الكهربائية', i: ['elec'], o: ['mech'], t: 'تحول الطاقة الكهربائية إلى طاقة ميكانيكية حركية.' } };
  const D = { id: 'g8_forms', ch: 23, sec: 'الفيزياء والمجتمع', page: 42, kind: 'تطبيق',
    title: 'أشكال الطاقة وتحولاتها (محولات الطاقة)',
    desc: 'الطاقة على أنواع مختلفة حسب مصادرها: الكيميائية، الحرارية، النووية، الكهربائية، الضوئية، الميكانيكية الحركية. ويمكن للطاقة أن تتحول من شكل لآخر عن طريق محولات الطاقة وهي أجهزة كهربائية أو إلكترونية: المولد الكهربائي، المصباح الكهربائي، الخلايا الشمسية، السماعة الكهربائية.',
    tags: 'أشكال الطاقة تحولات الطاقة محولات مولد مصباح خلايا شمسية سماعة بطارية مروحة كيميائية حرارية نووية كهربائية ضوئية ميكانيكية',
    tools: ['مولد كهربائي', 'مصباح كهربائي', 'خلايا شمسية', 'سماعة', 'بطارية', 'مروحة'],
    steps: ['اختر جهازاً من أجهزة الكتاب (المولد، المصباح، الخلايا الشمسية، السماعة) أو من أمثلة النص (البطارية، المروحة).', 'اسحب بطاقة شكل الطاقة الصحيح إلى خانة «الطاقة الداخلة» (يمين الجهاز) وإلى خانة «الطاقة الخارجة» (يساره).', 'إذا كانت إجابتك صحيحة يعمل الجهاز وترى تحول الطاقة! وإذا أخطأت ترجع البطاقة.', 'اضغط «💡 أظهر الإجابة» إن احتجت، ثم انتقل إلى جهاز آخر.'],
    concl: ['الطاقة الكيميائية: تنتج من التفاعلات الكيميائية. الحرارية: من الشمس والمياه الجوفية وحرق الوقود. النووية: تربط مكونات النواة.', 'الكهربائية: تنتج من تحويل أنواع أخرى من الطاقة (المولد، البطارية). الضوئية: موجات كهرومغناطيسية وأهم مصدر طبيعي لها الشمس.', 'الميكانيكية الحركية: الناتجة عن حركة الأجسام، مثل حركة الرياح وظاهرة المد والجزر، والمروحة.', 'تتحول الطاقة من شكل إلى آخر باستعمال أجهزة كهربائية أو إلكترونية هي محولات الطاقة.'],
    laws: ['g8_energy', 'g8_cons'],
    fact: ['المصباح التقليدي يحول جزءاً صغيراً فقط من الطاقة الكهربائية إلى ضوء، والباقي يتحول إلى حرارة — لذلك يسخن!', 'تتحول طاقة الشمس الضوئية في أوراق النبات إلى طاقة كيميائية مخزونة في الغذاء.'],
    controls: [SEL('dev', 'الجهاز', Object.entries(DEV).map(([k, v]) => [k, v.n]), 'gen', (v, S) => D.reset(S)),
      BT('', [{ t: '💡 أظهر الإجابة', on: S => D.answer(S) }, { t: '↺ أعد البطاقات', on: S => D.reset(S) }]),
      TG('run', 'تشغيل الجهاز دائماً', false, null, 'energy'), TG('flow', 'أسهم تدفق الطاقة', true, null, 'vector'), TG('lab', 'الشرح', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { const d = DEV[S.p.dev]; S.slot = { i: d.i.map(() => null), o: d.o.map(() => null) }; S.chip = Object.keys(F).map(k => ({ k, dx: 0, dy: 0, home: 1 })); S.ok = 0; S.ang = 0; S.score = S.score || 0; },
    answer(S) { const d = DEV[S.p.dev]; S.slot = { i: d.i.slice(), o: d.o.slice() }; S.ok = 1; },
    geo(S) { const w = S.W, h = S.H, nar = w < 600, cx = nar ? w / 2 + 10 : (w + 64) / 2, cy = h * (nar ? .48 : .45), n = Object.keys(F).length, cw = nar ? (w - 50) / 3 - 8 : Math.min(118, (w - 90) / 4 - 8); return { w, h, cx, cy, cw, n, nar }; },
    slots(S) { const g = D.geo(S), d = DEV[S.p.dev], L = []; if (g.nar) { d.i.forEach((k, j) => L.push({ t: 'i', j, x: g.cx + g.w * .24, y: g.cy - 150 + j * 48 })); d.o.forEach((k, j) => L.push({ t: 'o', j, x: g.cx - g.w * .24, y: g.cy - 150 + j * 48 })); return L; } d.i.forEach((k, j) => L.push({ t: 'i', j, x: g.cx + 230 * Math.min(1, g.w / 820), y: g.cy - 30 + j * 78 })); d.o.forEach((k, j) => L.push({ t: 'o', j, x: g.cx - 230 * Math.min(1, g.w / 820), y: g.cy - 30 + j * 78 - (d.o.length - 1) * 39 })); return L; },
    chipPos(S, i) { const g = D.geo(S), per = g.nar ? 3 : Math.min(4, Math.floor((g.w - 80) / (g.cw + 8))), r = Math.floor(i / per), c = i % per, rowN = Math.min(per, g.n - r * per), x0 = g.cx + (rowN - 1) * (g.cw + 8) / 2; return [x0 - c * (g.cw + 8), g.h * .78 + r * 44]; },
    update(S, dt) { const d = DEV[S.p.dev]; const ok = d.i.every((k, j) => S.slot.i[j] === k) && d.o.every((k, j) => S.slot.o[j] === k); if (ok && !S.ok) { S.ok = 1; K.cheer(S, S.W / 2, S.H * .4); C2.msg(S, 'أحسنت! ' + d.n + '\n' + d.t, 3); } S.ok = ok ? 1 : S.ok && ok; S.ang += dt * ((S.ok || S.p.run) ? 8 : 0); },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S), d = DEV[p.dev], on = S.ok || p.run, t = S.ang;
      K.bg(ctx, w, h, { benchY: h * .66, top: '#f0f9ff', bottom: '#e0f2fe' });
      D.device(ctx, p.dev, g.cx, g.cy, on, t);
      Q23.T(ctx, d.n, g.cx, g.cy + 98, { s: 15, w: 900, c: '#fff', bg: '#0f766e' });
      D.slots(S).forEach(sl => { const k = S.slot[sl.t][sl.j], col = k ? F[k][1] : '#94a3b8';
        if (p.flow !== false) { const ex = sl.t === 'i' ? g.cx + 90 : g.cx - 90; if (sl.t === 'i') Q23.F(ctx, sl.x - g.cw / 2 - 4, sl.y, ex - (sl.x - g.cw / 2 - 4), g.cy - sl.y, '', col, on ? 6 : 3); else Q23.F(ctx, ex, g.cy, sl.x + g.cw / 2 + 4 - ex, sl.y - g.cy, '', col, on ? 6 : 3); }
        K.raw(ctx, () => { ctx.setLineDash(k ? [] : [6, 4]); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.fillStyle = k ? shade(col, 90) : 'rgba(255,255,255,.7)'; rr(ctx, sl.x - g.cw / 2 - 6, sl.y - 20, g.cw + 12, 40, 10); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); });
        Q23.T(ctx, k ? F[k][0] : '؟', sl.x, sl.y, { s: 13, w: 900, c: k ? shade(col, -30) : '#64748b' });
        if (sl.j === 0) Q23.T(ctx, sl.t === 'i' ? 'الطاقة الداخلة' : 'الطاقة الخارجة', sl.x, sl.y - 34, { s: 11.5, w: 800, c: '#334155' }); });
      S.chip.forEach((c, i) => { if (!c.home && !c.drag) return; const [x, y] = c.drag ? [c.x, c.y] : D.chipPos(S, i); if (Object.values(S.slot).some(a => a.includes(c.k)) && !c.drag) { K.raw(ctx, () => { ctx.globalAlpha = .35; }); }
        K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = c.drag ? 12 : 4; ctx.fillStyle = F[c.k][1]; rr(ctx, x - g.cw / 2, y - 17, g.cw, 34, 9); ctx.fill(); ctx.restore(); });
        Q23.T(ctx, F[c.k][0], x, y, { s: 12, w: 900, c: '#fff' }); K.raw(ctx, () => { ctx.globalAlpha = 1; }); });
      Q23.T(ctx, 'بطاقات أشكال الطاقة — اسحبها إلى الخانات', g.cx, h * .78 - 30, { s: 12, w: 800, c: '#334155' });
      if (p.lab !== false && S.ok) Q23.T(ctx, d.t, g.cx, g.cy - 120, { s: 13.5, w: 900, c: '#fff', bg: '#15803d' });
      Q23.banner(ctx, w, 'تتحول الطاقة من شكل إلى آخر باستعمال أجهزة هي محولات الطاقة', '#0f766e', 20);
      C2.drawMsg(ctx, S, g.cx, h * .2); K.party(ctx, S);
    },
    device(ctx, k, x, y, on, t) { K.raw(ctx, () => {
      if (k === 'gen') { const g = ctx.createLinearGradient(0, y - 60, 0, y + 50); g.addColorStop(0, '#facc15'); g.addColorStop(1, '#ca8a04'); ctx.fillStyle = g; rr(ctx, x - 90, y - 55, 180, 105, 8); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.fillRect(x - 90, y + 50, 180, 8); ctx.fillRect(x - 60, y - 40, 50, 36); ctx.fillStyle = on ? '#22c55e' : '#475569'; ctx.beginPath(); ctx.arc(x - 48, y - 22, 5, 0, TAU); ctx.fill(); ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.arc(x - 26, y - 22, 6, 0, TAU); ctx.fill();
        ctx.fillStyle = '#374151'; for (let i = 0; i < 6; i++) ctx.fillRect(x + 10 + i * 12, y - 40, 6, 70); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(x - 70, y + 62, 9, 0, TAU); ctx.arc(x + 70, y + 62, 9, 0, TAU); ctx.fill();
        if (on) { ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 90, y + 10); for (let i = 0; i < 6; i++) ctx.lineTo(x - 100 - i * 8, y + 10 + (i % 2 ? -8 : 8)); ctx.stroke(); ctx.fillStyle = 'rgba(148,163,184,.5)'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + 70 + Math.sin(t + i) * 4, y - 70 - ((t * 20 + i * 15) % 45), 7 + i * 2, 0, TAU); ctx.fill(); } } }
      if (k === 'lamp') { if (on) { const g = ctx.createRadialGradient(x, y - 20, 5, x, y - 20, 110); g.addColorStop(0, 'rgba(253,224,71,.95)'); g.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y - 20, 110, 0, TAU); ctx.fill(); }
        ctx.fillStyle = on ? '#fef9c3' : 'rgba(226,232,240,.8)'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y - 25, 45, Math.PI * .8, Math.PI * 2.2); ctx.lineTo(x + 18, y + 30); ctx.lineTo(x - 18, y + 30); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = on ? '#f97316' : '#78716c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 10, y + 28); ctx.lineTo(x - 8, y - 20); for (let i = 0; i < 6; i++) ctx.lineTo(x - 8 + i * 3.2, y - 20 + (i % 2 ? -6 : 0)); ctx.lineTo(x + 10, y + 28); ctx.stroke();
        ctx.fillStyle = '#9ca3af'; for (let i = 0; i < 4; i++) { ctx.fillRect(x - 19, y + 30 + i * 8, 38, 6); } ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(x, y + 66, 6, 0, TAU); ctx.fill();
        if (on) { ctx.strokeStyle = 'rgba(239,68,68,.6)'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { const yy = y - 90 - ((t * 15 + i * 12) % 30); ctx.beginPath(); ctx.moveTo(x - 20 + i * 20, yy + 20); ctx.quadraticCurveTo(x - 26 + i * 20, yy + 10, x - 20 + i * 20, yy); ctx.stroke(); } } }
      if (k === 'solar') { Q23.sun(ctx, x + 110, y - 110, 26); if (on) { ctx.strokeStyle = 'rgba(250,204,21,.8)'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { const f = (t * .3 + i / 5) % 1; ctx.beginPath(); ctx.moveTo(x + 90 - f * 70 + i * 6, y - 90 + f * 60); ctx.lineTo(x + 80 - f * 70 + i * 6, y - 80 + f * 60); ctx.stroke(); } }
        ctx.save(); ctx.translate(x, y); ctx.transform(1, 0, -.35, .8, 0, 0); ctx.fillStyle = '#1e3a8a'; ctx.fillRect(-90, -50, 180, 100); ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 1; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-90 + i * 30, -50); ctx.lineTo(-90 + i * 30, 50); ctx.stroke(); } for (let j = 1; j < 4; j++) { ctx.beginPath(); ctx.moveTo(-90, -50 + j * 25); ctx.lineTo(90, -50 + j * 25); ctx.stroke(); } ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 4; ctx.strokeRect(-90, -50, 180, 100); ctx.restore();
        ctx.fillStyle = '#64748b'; ctx.fillRect(x - 6, y + 40, 12, 40); if (on) { ctx.strokeStyle = '#d97706'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 60, y + 30); ctx.lineTo(x - 100, y + 30); ctx.stroke(); } }
      if (k === 'phones') { ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y + 10, 70, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.lineCap = 'butt'; [-1, 1].forEach(sg => { ctx.fillStyle = '#f472b6'; ctx.beginPath(); ctx.ellipse(x + sg * 66, y + 30, 22, 32, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.ellipse(x + sg * 60, y + 30, 13, 22, 0, 0, TAU); ctx.fill(); });
        if (on) { ctx.strokeStyle = '#db2777'; ctx.lineWidth = 2.5; for (let i = 0; i < 3; i++) { const r = 20 + ((t * 12 + i * 14) % 42); ctx.globalAlpha = 1 - r / 62; [-1, 1].forEach(sg => { ctx.beginPath(); ctx.arc(x + sg * 66, y + 30, r + 20, sg > 0 ? -.6 : Math.PI - .6, sg > 0 ? .6 : Math.PI + .6); ctx.stroke(); }); } ctx.globalAlpha = 1; } }
      if (k === 'battery') { const g = ctx.createLinearGradient(x - 40, 0, x + 40, 0); g.addColorStop(0, '#111827'); g.addColorStop(.5, '#4b5563'); g.addColorStop(1, '#111827'); ctx.fillStyle = g; rr(ctx, x - 40, y - 70, 80, 140, 10); ctx.fill(); ctx.fillStyle = '#ca8a04'; ctx.fillRect(x - 40, y - 70, 80, 40); ctx.fillStyle = '#9ca3af'; ctx.fillRect(x - 12, y - 80, 24, 10);
        ctx.fillStyle = '#fff'; ctx.font = '900 22px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('+', x, y - 42); ctx.fillText('1.5 V', x, y + 20);
        if (on) { ctx.fillStyle = '#facc15'; for (let i = 0; i < 6; i++) { const f = (t * .15 + i / 6) % 1; ctx.beginPath(); ctx.arc(x - 60 - f * 50, y - 75 + f * 20, 4, 0, TAU); ctx.fill(); } ctx.strokeStyle = '#d97706'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 12, y - 78); ctx.lineTo(x - 110, y - 60); ctx.stroke(); } }
      if (k === 'fan') { ctx.fillStyle = '#334155'; ctx.fillRect(x - 6, y, 12, 70); ctx.fillStyle = '#475569'; rr(ctx, x - 50, y + 66, 100, 14, 6); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y - 20, 62, 0, TAU); ctx.stroke(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(x, y - 20); ctx.lineTo(x + Math.cos(a) * 62, y - 20 + Math.sin(a) * 62); ctx.stroke(); }
        ctx.fillStyle = 'rgba(59,130,246,.85)'; for (let i = 0; i < 3; i++) { const a = t * (on ? 2 : 0) + i * TAU / 3; ctx.save(); ctx.translate(x, y - 20); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(30, 0, 28, 12, 0, 0, TAU); ctx.fill(); ctx.restore(); } ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(x, y - 20, 9, 0, TAU); ctx.fill();
        if (on) { ctx.strokeStyle = 'rgba(59,130,246,.5)'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { const xx = x - 80 - ((t * 20 + i * 18) % 50); ctx.beginPath(); ctx.moveTo(xx, y - 40 + i * 20); ctx.quadraticCurveTo(xx - 10, y - 46 + i * 20, xx - 22, y - 40 + i * 20); ctx.stroke(); } } }
    }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return S.chip.map((c, i) => { const [x, y] = D.chipPos(S, i); return { id: 'chip_' + c.k, x, y, w: g.cw, h: 36, axis: 'xy', keep: true, hint: i === 0, tip: 'اسحب البطاقة إلى خانة مناسبة', idle: 'اسحب البطاقة ✋',
      down: S => { c.drag = 1; c.x = x; c.y = y; S.moves = (S.moves || 0) + 1; }, drag: (S, d) => { c.x = d.x; c.y = d.y; }, up: S => { c.drag = 0; const sl = D.slots(S).map(q => Object.assign(q, { d: Math.hypot(q.x - c.x, q.y - c.y) })).sort((a, b) => a.d - b.d)[0]; const dv = DEV[S.p.dev];
        if (sl && sl.d < 80) { const want = dv[sl.t][sl.j]; if (want === c.k) { S.slot[sl.t][sl.j] = c.k; S.score++; } else C2.msg(S, F[c.k][0] + '؟ ليست الإجابة الصحيحة\nفكّر: ماذا ' + (sl.t === 'i' ? 'يدخل إلى' : 'يخرج من') + ' ' + dv.n + '؟', 2.4); } } }; }); },
    readings(S) { const d = DEV[S.p.dev]; return [rd('الجهاز', d.n), rd('الطاقة الداخلة', S.ok ? d.i.map(k => F[k][0]).join(' + ') : '؟'), rd('الطاقة الخارجة', S.ok ? d.o.map(k => F[k][0]).join(' + ') : '؟'), rd('الإجابات الصحيحة', String(S.score))]; },
    record(S) { if (!S.ok) { Runner.toast('أكمل الخانات بشكل صحيح أولاً', 'info'); return null; } const d = DEV[S.p.dev]; return { d: d.n, i: d.i.map(k => F[k][0]).join(' + '), o: d.o.map(k => F[k][0]).join(' + ') }; },
    cols: [['d', 'الجهاز (محول الطاقة)'], ['i', 'الطاقة الداخلة'], ['o', 'الطاقة الخارجة']],
    explain(S) { const d = DEV[S.p.dev]; return S.ok ? '<b>' + d.n + '</b>: ' + d.t + ' هذا الجهاز من <b>محولات الطاقة</b>.' : 'ما شكل الطاقة الذي يحتاجه <b>' + d.n + '</b> ليعمل؟ وما الشكل الذي ينتجه؟ اسحب البطاقات إلى الخانات.'; },
    quiz: [
      { q: 'المصباح الكهربائي يحول الطاقة الكهربائية إلى:', o: ['طاقة ضوئية وطاقة حرارية', 'طاقة كيميائية', 'طاقة صوتية فقط'], a: 0, why: 'ص 42.' },
      { q: 'الخلايا الشمسية تحول:', o: ['الطاقة الكهربائية إلى ضوئية', 'الطاقة الضوئية إلى كهربائية', 'الطاقة الحرارية إلى صوتية'], a: 1, why: 'ص 42.' },
      { q: 'يسمى شكل الطاقة الذي ينتج عن تغير موقع الجسم بالنسبة للأرض بـ:', o: ['الطاقة الحركية', 'الطاقة الكامنة', 'الطاقة الضوئية'], a: 1, why: 'مراجعة الفصل س1-6.' }
    ]
  };
  Q23.P[D.id] = D;
})();

/* =========================================================================================
   دمج الأنشطة: كل تجربة تضم عدة أجزاء (الجزء 1، 2، 3…) — لكل جزء مشهده وشرحه وقراءاته وجدوله وصفحته في الكتاب.
   Each part keeps its own sub-state (own S.p, rows); the meta experiment swaps controls/info/data panels on part change.
   ========================================================================================= */
Q23.cur = () => { const S = Runner.S; return S && S._subs ? S._subs[S._part] : null; };
Q23.merge = M => {
  const parts = M.parts.map(q => Object.assign({ D: Q23.P[q.id] }, q));
  const cs = () => Q23.cur();
  const wrapC = c => { if (c.type === 'buttons') return Object.assign({}, c, { btns: c.btns.map(b => Object.assign({}, b, { on: () => { const s = cs(); s && b.on(s); } })) });
    return Object.assign({}, c, { on: c.on ? (v, _S, init) => { const s = cs(); s && c.on(v, s, init); } : undefined }); };
  parts.forEach(P => { P.W = P.D.controls.map(wrapC); });
  const E = { id: M.id, ch: 23, sec: M.sec, page: M.page, kind: M.kind || 'نشاط', fig: M.fig, title: M.title, desc: M.desc, tags: M.tags + ' ' + parts.map(P => P.D.tags).join(' '), quiz: M.quiz, fact: M.fact,
    tools: [...new Set(parts.flatMap(P => P.D.tools || []))], laws: [...new Set(parts.flatMap(P => P.D.laws || []))], controls: [], steps: [], concl: [], cols: [['x', '—']], record: () => null, graph: null };
  const partCtl = SEL('part', 'الجزء', parts.map((P, i) => [P.id, (i + 1) + ') ' + P.n]), parts[0].id, (v, S, init) => { if (v !== S._part) Q23.mPart(E, parts, partCtl, S, v, true); });
  E.controls = [partCtl].concat(parts[0].W);
  const mirror = (S, s) => { for (const k in s) { const v = s[k]; if (k[0] !== '_' && k !== 'W' && k !== 'H' && k !== 't' && (typeof v === 'number' || typeof v === 'boolean' || typeof v === 'string')) S['s_' + k] = v; } };
  const sync = S => { const s = S._subs[S._part]; s.W = S.W; s.H = S.H; s.t = S.t; mirror(S, s); return s; };
  E.setup = S => { const keep = S._part && S._subs; if (!keep) S._subs = {}; else S._subs[S._part] = null; Q23.mPart(E, parts, partCtl, S, S._part || (parts.some(q => q.id === S.p.part) ? S.p.part : parts[0].id), !!keep); };
  E.update = (S, dt) => { const s = sync(S), P = parts.find(q => q.id === S._part); P.D.update && P.D.update(s, dt); };
  E.draw = (ctx, w, h, S) => { if (w < 80 || h < 80) { G.bg(ctx, w, h, false); return; } const s = sync(S), P = parts.find(q => q.id === S._part); s.W = w; s.H = h; P.D.draw(ctx, w, h, s);
    const i = parts.indexOf(P); Q23.T(ctx, 'الجزء ' + (i + 1) + ' من ' + parts.length + ': ' + P.n + ' — ص ' + P.D.page, 76, h - 22, { s: 11.5, w: 900, c: '#fff', bg: 'rgba(15,118,110,.9)', a: 'left' }); };
  E.drags = S => { if (!S._subs) return []; const s = sync(S), P = parts.find(q => q.id === S._part); if (!P.D.drags) return [];
    return (P.D.drags(s) || []).map(o => { const n = Object.assign({}, o); ['down', 'drag', 'up', 'click', 'wheel'].forEach(f => { if (o[f]) n[f] = (_S, ...a) => { const r = o[f](s, ...a); mirror(_S, s); return r; }; }); return n; }); };
  E.readings = S => { const s = S._subs && S._subs[S._part]; const P = parts.find(q => q.id === S._part); return s && P.D.readings ? P.D.readings(s) : []; };
  E.explain = S => { const s = S._subs && S._subs[S._part]; const P = parts.find(q => q.id === S._part); if (!s) return ''; return '<div style="font-size:.85em;color:#0f766e;margin-bottom:4px"><b>' + P.n + '</b> (ص ' + P.D.page + ')</div>' + (P.D.explain ? P.D.explain(s) : ''); };
  X8(E); return E;
};
{ const F0 = Q23.P.g8_forms, d0 = F0.draw; F0.draw = (ctx, w, h, S) => { if (w < 80 || h < 80) { G.bg(ctx, w, h, false); return; } d0(ctx, w, h, S); }; }
Q23.mPart = (E, parts, partCtl, S, id, ui) => {
  const P = parts.find(q => q.id === id) || parts[0]; S._part = P.id;
  let s = S._subs[P.id];
  if (!s) { s = { p: {}, t: S.t || 0, rows: [], W: S.W, H: S.H, E: { controls: P.W } }; P.D.controls.forEach(c => { if (c.k) s.p[c.k] = c.val; }); S._subs[P.id] = s; P.D.setup && P.D.setup(s); }
  s.p.part = P.id; S.p = s.p; S.rows = s.rows;
  const D = P.D; E.controls = [partCtl].concat(P.W); E.steps = D.steps; E.concl = D.concl; E.desc = P.n + ' (ص ' + D.page + '): ' + D.desc; E.cols = D.cols || [['x', '—']];
  E.record = D.record ? (S2 => D.record(S2._subs[S2._part])) : null; E.graph = D.graph || null; E.fig = D.fig;
  if (ui && Runner.S === S) { try { Runner.info(E); Runner.dataPanel(E, S); Runner.controls(E, S); } catch (e) { console.warn(e); } }
};

Q23.merge({ id: 'g8_work', sec: 'نشاط استهلالي + الدرس 1', page: 35, title: 'الشغل الفيزيائي',
  desc: 'تجربة واحدة بثلاثة أجزاء: (1) نقيس الشغل بالميزان النابضي والمسطرة (سحباً ورفعاً)، (2) نكتشف متى تنجز القوة شغلاً ومتى لا تنجز، (3) نحل مثال الكتاب.',
  tags: 'الشغل', parts: [{ id: 'g8_work_lab', n: 'نشاط استهلالي: قياس الشغل' }, { id: 'g8_work_when', n: 'متى تنجز القوة شغلاً؟' }, { id: 'g8_work_ex', n: 'مثال 1: الشغل الكلي' }],
  fact: ['حقيقة علمية: ليس كل عمل متعب نقوم به يعدّ شغلاً بالمعنى الفيزيائي.', 'وحدة الشغل «الجول» سمّيت باسم العالم جيمس جول.'],
  quiz: [
    { q: 'هل ينجز رافع الأثقال شغلاً في أثناء رفعه ثقلاً إلى الأعلى؟', o: ['نعم، لأن الثقل يتحرك باتجاه القوة', 'لا، لأن الثقل ساكن', 'لا، لأن القوة عمودية على الحركة'], a: 0, why: 'مراجعة الدرس س2.' },
    { q: 'أيّ الحالات الآتية لا تنجز شغلاً؟', o: ['طرق مسمار بمطرقة', 'طفل يدفع خزانة مدة عشر دقائق دون أن يحركها', 'حجر يسقط باتجاه الأرض'], a: 1, why: 'مراجعة الفصل س3-3: الإزاحة صفر.' },
    { q: 'ما مقدار القوة المؤثرة على طاولة أنجز طالب لدفعها شغلاً 40J فقطعت إزاحة 5m باتجاه القوة؟', o: ['8 N', '200 N', '100 N'], a: 0, why: 'مراجعة الفصل س2-1: F = W ÷ X.' }] });
Q23.merge({ id: 'g8_power', sec: 'الدرس 1', page: 37, title: 'القدرة',
  desc: 'تجربة واحدة بثلاثة أجزاء: (1) ما القدرة؟ الشغل نفسه في زمن أقل يعني قدرة أكبر، والواط والقدرة الحصانية، (2) نشاط: احسب قدرتك وأنت تصعد السلّم، (3) مثال 2 ومسائل المراجعة خطوة بخطوة.',
  tags: 'القدرة', parts: [{ id: 'g8_power_def', n: 'ما القدرة؟ (عاملا البناء)' }, { id: 'g8_power_stairs', n: 'نشاط: حساب القدرة (السلّم)' }, { id: 'g8_power_ex', n: 'مثال 2 ومسائل القدرة' }],
  fact: ['قدرة الحصان الواحد (1 hp) تساوي 746 watt.', 'الواط سمّي باسم جيمس واط مخترع المحرك البخاري.'],
  quiz: [
    { q: 'أيهما أكبر قدرة: شخص يصعد السلّم في 2s أم يصعد السلّم نفسه في 5s؟', o: ['في 2s', 'في 5s', 'متساويتان'], a: 0, why: 'مراجعة الدرس س4.' },
    { q: 'تستعمل القدرة الحصانية لقياس قدرة المضخة ومحرك السيارة، وهي تساوي:', o: ['746 watt', '647 watt', '764 watt'], a: 0, why: 'مراجعة الفصل س2-3.' },
    { q: 'صعد رجل كتلته 75kg سلّماً ارتفاعه الشاقولي 10m خلال 15s، قدرته:', o: ['490 watt', '50 watt', '7350 watt'], a: 0, why: 'مراجعة الدرس س5.' }] });
Q23.merge({ id: 'g8_energy', sec: 'الدرس 2', page: 39, title: 'الطاقة والطاقة الحركية',
  desc: 'تجربة واحدة بثلاثة أجزاء: (1) ما الطاقة؟ الشغل المنجز على الجسم يصبح طاقة فيه، (2) الطاقة الحركية وعلاقتها بالكتلة والسرعة مع مثال 1، (3) نشاط: العلاقة بين الكتلة والطاقة الحركية.',
  tags: 'الطاقة الحركية', parts: [{ id: 'g8_energy_def', n: 'ما الطاقة؟' }, { id: 'g8_ke', n: 'الطاقة الحركية ومثال 1' }, { id: 'g8_ke_mass', n: 'نشاط: الكتلة والطاقة الحركية' }],
  fact: ['السرعة المضاعفة تعني طاقة حركية أكبر بأربعة أضعاف — لذلك السرعة خطرة!'],
  quiz: [
    { q: 'تعرف ......... بأنها القابلية على إنجاز شغل ما.', o: ['القدرة', 'الطاقة', 'الشغل'], a: 1, why: 'مراجعة الفصل س1-2.' },
    { q: 'تتناسب الطاقة الحركية طردياً مع:', o: ['v', 'v²', 'v³'], a: 1, why: 'مراجعة الفصل س2-2.' },
    { q: 'راكب دراجة كتلته 40Kg قطع 800m في 200s بسرعة ثابتة. طاقته الحركية:', o: ['160 J', '320 J', '640 J'], a: 1, why: 'س7: v = 4 m/s.' }] });
Q23.merge({ id: 'g8_pe', sec: 'الدرس 2', page: 40, title: 'الطاقة الكامنة وحفظ الطاقة',
  desc: 'تجربة واحدة بجزأين: (1) الطاقة الكامنة P.E = m g h مع مثال 2 والشلال، (2) تحولات الطاقة وقانون حفظ الطاقة: لعبة التزحلق والبندول والمتزلج والكرة.',
  tags: 'الطاقة الكامنة حفظ الطاقة', parts: [{ id: 'g8_pe_def', n: 'الطاقة الكامنة ومثال 2' }, { id: 'g8_conserve', n: 'تحولات الطاقة وحفظها' }],
  fact: ['تمتلك مياه الشلال طاقة كامنة كبيرة بسبب ارتفاعها، وتستعمل السدود هذه الطاقة لتوليد الكهرباء.', 'لو لم يوجد احتكاك لاستمر البندول بالتأرجح إلى الأبد!'],
  quiz: [
    { q: 'يختزن جسم طاقة كامنة 100J على ارتفاع 5m، فإن الارتفاع الذي تصبح فيه طاقته الكامنة 60J هو (g = 10 m/s²):', o: ['2 m', '3 m', '4 m'], a: 1, why: 'مراجعة الفصل س2-4.' },
    { q: 'على ماذا ينص قانون حفظ الطاقة؟', o: ['الطاقة تفنى عند توقف الجسم', 'الطاقة لا تفنى ولا تستحدث وإنما تتحول من شكل إلى آخر', 'الطاقة الكامنة تساوي الحركية دائماً'], a: 1, why: 'مراجعة الدرس س4.' },
    { q: 'أي شكل للطاقة يكون لدى المتزلج وهو أعلى المنحدر؟', o: ['طاقة كامنة', 'طاقة حركية فقط', 'طاقة ضوئية'], a: 0, why: 'مراجعة الفصل س8.' }] });
X8(Q23.P.g8_forms);
