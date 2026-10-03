'use strict';
/* ====================== الثاني المتوسط — الفصل الرابع: الآلات البسيطة (ch 24, ص 45–55) ======================
   g8_levers (4 parts) · g8_incline_wheel (3) · g8_pulleys (3) · g8_efficiency (2) — parts registered in M8.P, merged at the end
   Uses the grade-7 kits K (expg7_0kit.js), C2 (expg7_c2.js), C1 (expg7_c1.js) and Q22 (expg8_c2.js). Local helpers in Q24. */
LW({ id: 'g8_lever', cat: 24, name: 'قانون العتلات', fx: '<i>F</i><sub>1</sub> × <i>d</i><sub>1</sub> = <i>F</i><sub>2</sub> × <i>d</i><sub>2</sub>', sym: 'القوة × ذراعها (بعد القوة عن المرتكز) = المقاومة × ذراعها (بعد المقاومة عن المرتكز)', calc: { in: [['F2', 'المقاومة F₂', 'N', 20], ['d2', 'ذراع المقاومة d₂', 'm', .25], ['d1', 'ذراع القوة d₁', 'm', .2]], out: 'القوة F₁', u: 'N', f: v => v.F2 * v.d2 / v.d1 } });
LW({ id: 'g8_ma', cat: 24, name: 'الفائدة الميكانيكية', fx: 'M.A = ' + FR('Load', 'Force') + ' = ' + FR('المقاومة', 'القوة') + ' = ' + FR('ذراع القوة', 'ذراع المقاومة'), sym: 'ليس لها وحدة (نسبة بين قوتين). أكبر من 1 ⟸ ربح قوة ، أصغر من 1 ⟸ ربح سرعة', calc: { in: [['L', 'المقاومة (Load)', 'N', 30], ['F', 'القوة (Force)', 'N', 10]], out: 'M.A', u: '', f: v => v.L / v.F } });
LW({ id: 'g8_gain', cat: 24, name: 'ربح القوة وربح السرعة', fx: 'ربح القوة = ' + FR('المقاومة', 'القوة') + ' = ' + FR('ذراع القوة', 'ذراع المقاومة') + ' ، ربح السرعة = ' + FR('القوة', 'المقاومة') + ' = ' + FR('ذراع المقاومة', 'ذراع القوة'), sym: 'لا يمكن الحصول على ربح قوة وربح سرعة من العتلة في آن واحد. النوع الأول: ربح قوة أو سرعة أو لا شيء، الثاني: ربح قوة فقط، الثالث: ربح سرعة فقط' });
LW({ id: 'g8_incl', cat: 24, name: 'الفائدة الميكانيكية للسطح المائل', fx: 'M.A = ' + FR('Load', 'Force') + ' = ' + FR('<i>L</i>', '<i>h</i>'), sym: 'L طول السطح المائل، h ارتفاعه. تزداد الفائدة كلما ازدادت نسبة طول السطح إلى ارتفاعه', calc: { in: [['L', 'الطول L', 'm', 20], ['h', 'الارتفاع h', 'm', 2]], out: 'M.A', u: '', f: v => v.L / v.h } });
LW({ id: 'g8_wedge', cat: 24, name: 'البريمة والأسفين', fx: 'البريمة: سطح مائل ملفوف حول أسطوانة ، الأسفين: سطحان مائلان متقابلان', sym: 'البريمة: كلما كان السطح الملفوف أطول من ارتفاع درجتها (درجة أصغر) كانت الفائدة أكبر. الأسفين: يعتمد ربح القوة على نسبة طوله إلى سمكه' });
LW({ id: 'g8_wheel', cat: 24, name: 'العجلة والمحور', fx: 'M.A = ' + FR('نصف قطر العجلة <i>R</i>', 'نصف قطر المحور <i>r</i>') + ' > 1', sym: 'نصف قطر العجلة أكبر من نصف قطر المحور فنحصل على ربح قوة دائماً (مقبض الباب، المفك، عجلة القيادة)', calc: { in: [['R', 'نصف قطر العجلة R', 'cm', 20], ['r', 'نصف قطر المحور r', 'cm', 2]], out: 'M.A', u: '', f: v => v.R / v.r } });
LW({ id: 'g8_pul', cat: 24, name: 'البكرات', fx: 'الثابتة: M.A = 1 (تغيّر اتجاه القوة) ، المتحركة: M.A = 2 ، <i>F</i> = ' + FR('<i>W</i>', '2'), sym: 'البكرة الثابتة عتلة من النوع الأول، والمتحركة عتلة من النوع الثاني ذراع القوة فيها ضعف ذراع المقاومة', calc: { in: [['W', 'الوزن W', 'N', 400], ['n', 'عدد الحبال الحاملة', '', 2]], out: 'القوة F (مثالية)', u: 'N', f: v => v.W / v.n } });
LW({ id: 'g8_eff', cat: 24, name: 'كفاءة الآلة', fx: 'كفاءة الآلة = ' + FR('الطاقة الخارجة', 'الطاقة الداخلة') + ' × 100% = ' + FR('الشغل الناتج', 'الشغل المنجز') + ' × 100%', sym: 'لا توجد آلة مثالية عملياً: جزء من الطاقة الداخلة يتحول إلى طاقة حرارية بسبب الاحتكاك', calc: { in: [['out', 'الطاقة الخارجة', 'J', 120], ['in', 'الطاقة الداخلة', 'J', 200]], out: 'الكفاءة', u: '%', f: v => v.out / v.in * 100 } });

const Q24 = {
  iso(s) { s = String(s); if (!/[\u0600-\u06FF]/.test(s)) return s; return '\u061C' + s.replace(/[(A-Za-z0-9₀-₉][A-Za-z0-9₀-₉ .=×÷+\-−\/²³√()·,:≈%?]*[A-Za-z0-9₀-₉)²³%?]|[0-9]/g, m => '\u2066' + m + '\u2069'); },
  T(ctx, s, x, y, o) { G.text(ctx, Q24.iso(s), x, y, Object.assign({ c: '#1e293b', raw: 1 }, o || {})); },
  F(ctx, x, y, dx, dy, label, col, w = 4) { K.force(ctx, x, y, dx, dy, label ? Q24.iso(label) : label, col, w); },
  lines(ctx, L, x, y, wd, o = {}) {
    const lh = o.lh || 21, hh = (o.title ? 26 : 8) + L.length * lh + 6;
    C2.card(ctx, x - wd, y, wd, hh, { bd: o.bd || '#9333ea' });
    if (o.title) Q24.T(ctx, o.title, x - wd / 2, y + 15, { s: 13, w: 900, c: o.bd || '#6d28d9' });
    L.forEach((q, i) => { const it = typeof q === 'string' ? { t: q } : q; const yy = y + (o.title ? 26 : 8) + lh * (i + .5);
      Q24.T(ctx, it.t, it.a === 'c' ? x - wd / 2 : x - 10, yy, { s: it.s || 12.5, w: it.w || 700, c: it.c || '#1e293b', a: it.a === 'c' ? 'center' : 'right', mono: it.mono }); });
    return hh;
  },
  banner(ctx, w, s, col = '#9333ea', y = 22) { Q24.T(ctx, s, (w + 64) / 2, y, { s: 14, w: 900, c: '#fff', bg: col }); },
  cx(w) { return (w + 64) / 2; },
  /* 2-bone IK: joint between a and b with segment lengths l1,l2; side = ±1 picks the bend */
  ik(a, b, l1, l2, side) { const dx = b[0] - a[0], dy = b[1] - a[1]; let d = Math.hypot(dx, dy); d = Math.min(d, l1 + l2 - .01); const t = (l1 * l1 - l2 * l2 + d * d) / (2 * d), hh = Math.sqrt(Math.max(0, l1 * l1 - t * t)); const ux = dx / (Math.hypot(dx, dy) || 1), uy = dy / (Math.hypot(dx, dy) || 1); return [a[0] + ux * t - uy * hh * side, a[1] + uy * t + ux * hh * side]; },
  /* realistic person from joints: hip, neck, hands[2], feet[2] (back limb first); H = body height px; f = facing ±1 */
  person(ctx, o) {
    const H = o.H, f = o.f || 1, hip = o.hip, nk = o.neck; const th = H * .25, sh = H * .24, ua = H * .18, fa = H * .17;
    const tor = [nk[0] - hip[0], nk[1] - hip[1]], tl = Math.hypot(tor[0], tor[1]) || 1, tu = [tor[0] / tl, tor[1] / tl];
    const head = [nk[0] + tu[0] * H * .075, nk[1] + tu[1] * H * .075], shp = [nk[0] - tu[0] * H * .02, nk[1] - tu[1] * H * .02];
    K.raw(ctx, () => {
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      const leg = (ft, back) => { const kn = Q24.ik(hip, ft, th, sh, -f * (o.kneeSide || 1)); ctx.strokeStyle = back ? shade(o.pants || '#1e3a8a', -25) : (o.pants || '#1e3a8a'); ctx.lineWidth = H * .075; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(kn[0], kn[1]); ctx.lineTo(ft[0], ft[1]); ctx.stroke();
        ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.ellipse(ft[0] + f * H * .03, ft[1] + H * .012, H * .055, H * .022, 0, 0, TAU); ctx.fill(); };
      const arm = (hd, back) => { const el = Q24.ik(shp, hd, ua, fa, f * (o.elbowSide || 1)); ctx.strokeStyle = back ? shade(o.shirt || '#0ea5e9', -30) : (o.shirt || '#0ea5e9'); ctx.lineWidth = H * .055; ctx.beginPath(); ctx.moveTo(shp[0], shp[1]); ctx.lineTo(el[0], el[1]); ctx.stroke();
        ctx.strokeStyle = back ? '#d9a47c' : '#f2c29b'; ctx.lineWidth = H * .04; ctx.beginPath(); ctx.moveTo(el[0], el[1]); ctx.lineTo(hd[0], hd[1]); ctx.stroke(); ctx.fillStyle = back ? '#d9a47c' : '#f2c29b'; ctx.beginPath(); ctx.arc(hd[0], hd[1], H * .026, 0, TAU); ctx.fill(); };
      leg(o.feet[0], 1); arm(o.hands[0], 1);
      // torso
      const g = ctx.createLinearGradient(hip[0] - 20, 0, hip[0] + 20, 0); g.addColorStop(0, shade(o.shirt || '#0ea5e9', -20)); g.addColorStop(1, o.shirt || '#0ea5e9');
      ctx.strokeStyle = g; ctx.lineWidth = H * .13; ctx.beginPath(); ctx.moveTo(hip[0], hip[1] - tu[1] * -2); ctx.lineTo(shp[0], shp[1]); ctx.stroke();
      ctx.strokeStyle = o.pants || '#1e3a8a'; ctx.lineWidth = H * .12; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(hip[0] + tu[0] * H * .04, hip[1] + tu[1] * H * .04); ctx.stroke();
      leg(o.feet[1], 0);
      // head
      ctx.fillStyle = '#f2c29b'; ctx.fillRect(nk[0] - H * .015, nk[1] - H * .03, H * .03, H * .04);
      ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(head[0], head[1], H * .055, H * .065, 0, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = o.hair || '#3f2a1d'; ctx.beginPath(); ctx.ellipse(head[0] - f * H * .008, head[1] - H * .02, H * .058, H * .05, 0, Math.PI, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(head[0] - f * H * .035, head[1] - H * .005, H * .025, H * .045, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(head[0] + f * H * .03, head[1] - H * .005, H * .007, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(head[0] + f * H * .022, head[1] + H * .03); ctx.lineTo(head[0] + f * H * .042, head[1] + H * .028); ctx.stroke();
      arm(o.hands[1], 0);
      ctx.lineCap = 'butt';
    });
  },
  /* lab stand like the book (green base, magenta block, copper rod) — rod from yb up to yt */
  stand(ctx, x, yb, yt, bw = 200) {
    K.raw(ctx, () => {
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(x, yb + 6, bw * .55, 9, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#2563eb'; [-1, 1].forEach(s => { ctx.fillRect(x + s * bw * .42 - 6, yb - 4, 12, 10); });
      const g = ctx.createLinearGradient(0, yb - 22, 0, yb - 2); g.addColorStop(0, '#34d399'); g.addColorStop(1, '#059669');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - bw / 2, yb - 4); ctx.lineTo(x + bw / 2, yb - 4); ctx.lineTo(x + bw / 2 - 26, yb - 22); ctx.lineTo(x - bw / 2 + 26, yb - 22); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#047857'; ctx.fillRect(x - bw / 2, yb - 5, bw, 4);
      ctx.fillStyle = '#c026d3'; ctx.fillRect(x - 13, yb - 18, 26, 9);
      const rg = ctx.createLinearGradient(x - 5, 0, x + 5, 0); rg.addColorStop(0, '#7c2d12'); rg.addColorStop(.45, '#f59e0b'); rg.addColorStop(1, '#7c2d12');
      ctx.fillStyle = rg; ctx.fillRect(x - 4, yt, 8, yb - 14 - yt); ctx.beginPath(); ctx.arc(x, yt, 4, Math.PI, TAU); ctx.fill();
    });
  },
  /* perforated metre rule (book): centre (x,y), half length Lh px, angle a; holes every 5 cm (100 cm) */
  holeRule(ctx, x, y, Lh, a, o = {}) {
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(a);
      const hh = o.th || 16; ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 3;
      const g = ctx.createLinearGradient(0, -hh / 2, 0, hh / 2); g.addColorStop(0, '#4b5563'); g.addColorStop(.35, '#1f2937'); g.addColorStop(1, '#030712');
      ctx.fillStyle = g; rr(ctx, -Lh - 8, -hh / 2, 2 * Lh + 16, hh, 5); ctx.fill(); ctx.restore();
      ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-Lh - 4, -hh / 2 + 2, 2 * Lh + 8, 2);
      for (let k = -10; k <= 10; k++) { const hx = k * Lh / 10; ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(hx, 0, hh * .26, 0, TAU); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.stroke();
        if (o.nums && k % 2 === 0) { ctx.fillStyle = '#334155'; ctx.font = '700 10px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; ctx.fillText(Math.abs(k * 5), hx, -hh / 2 - 5); } }
      ctx.restore();
    });
  },
  /* slotted masses on a hanger hooked at (x,y); n discs; returns bottom y */
  masses(ctx, x, y, n, o = {}) {
    const dw = o.dw || 34, dh = o.dh || 9, sl = o.sl || 22;
    K.raw(ctx, () => {
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y + 5, 5, Math.PI * 1.1, Math.PI * 2.4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y + 9); ctx.lineTo(x, y + sl + n * dh + 6); ctx.stroke();
      for (let k = 0; k < n; k++) { const yy = y + sl + k * dh; const g = ctx.createLinearGradient(x - dw / 2, 0, x + dw / 2, 0); g.addColorStop(0, '#c2410c'); g.addColorStop(.4, '#fb923c'); g.addColorStop(1, '#9a3412');
        ctx.fillStyle = g; rr(ctx, x - dw / 2, yy, dw, dh - 1, 2); ctx.fill(); ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = .8; ctx.stroke(); ctx.fillStyle = '#431407'; ctx.fillRect(x - 1.5, yy, 3, dh * .6); }
      ctx.fillStyle = '#475569'; rr(ctx, x - dw * .38, y + sl + n * dh, dw * .76, 5, 2); ctx.fill();
    });
    return y + sl + n * dh + 5;
  },
  /* spring balance like the book (red frame, clear tube): ring at (x,y); body length L; reading F of Fmax; returns hook tip y */
  sb(ctx, x, y, L, F, Fmax, o = {}) {
    const pxN = (L - 44) / Fmax, e = clamp(F, 0, Fmax * 1.05) * pxN; const top = y + 8, bot = top + L;
    K.raw(ctx, () => {
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(x, y, 6, 0, TAU); ctx.stroke();
      const g = ctx.createLinearGradient(x - 13, 0, x + 13, 0); g.addColorStop(0, '#991b1b'); g.addColorStop(.4, '#ef4444'); g.addColorStop(1, '#7f1d1d');
      ctx.fillStyle = g; rr(ctx, x - 12, top, 24, 12, 4); ctx.fill(); rr(ctx, x - 12, bot - 12, 24, 12, 4); ctx.fill();
      ctx.fillStyle = 'rgba(226,232,240,.75)'; rr(ctx, x - 10, top + 10, 20, L - 20, 3); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(x + 4, top + 12, 3, L - 24);
      ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 1.1; ctx.beginPath(); const s0 = top + 14, s1 = top + 20 + e; for (let k = 0; k <= 16; k++) { const yy = s0 + (s1 - s0) * k / 16; ctx.lineTo(x + (k % 2 ? 4 : -4), yy); } ctx.stroke();
      ctx.fillStyle = '#111827'; ctx.font = '700 8px ui-monospace,monospace'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
      const st = [1, 2, 5, 10, 20, 25, 50, 100].find(q => q * pxN >= 12) || 100; for (let v = 0; v <= Fmax + 1e-6; v += st / 2) { const yy = top + 20 + v * pxN, maj = Math.abs(v / st - Math.round(v / st)) < 1e-6; ctx.strokeStyle = '#111827'; ctx.lineWidth = maj ? 1 : .6; ctx.beginPath(); ctx.moveTo(x - 10, yy); ctx.lineTo(x - (maj ? 4 : 7), yy); ctx.stroke(); if (maj && o.nums !== false) ctx.fillText(String(v), x - 13, yy); }
      ctx.fillStyle = '#dc2626'; ctx.fillRect(x - 10, top + 19 + e, 14, 2.5);
      ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(x, top + 22 + e); ctx.lineTo(x, bot + 8 + e); ctx.stroke();
      ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + 4, bot + 13 + e, 5, -Math.PI / 2, Math.PI * .95); ctx.stroke();
      ctx.textBaseline = 'alphabetic';
    });
    if (o.read !== false) Q24.T(ctx, fmt(F, 3) + ' N', x + (o.rx ?? 34), top + L / 2, { s: 12.5, w: 900, c: '#fff', bg: '#b91c1c', mono: 1 });
    return bot + 18 + e;
  },
  /* rope polyline with twisted texture */
  rope(ctx, pts, o = {}) {
    K.raw(ctx, () => { ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = o.c2 || '#7c5a2b'; ctx.lineWidth = (o.w || 4.5) + 1.6; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      ctx.strokeStyle = o.c || '#d6a75c'; ctx.lineWidth = o.w || 4.5; ctx.stroke(); ctx.strokeStyle = 'rgba(92,60,20,.55)'; ctx.lineWidth = 1.2; ctx.setLineDash([3, 4]); ctx.lineDashOffset = o.off || 0; ctx.stroke(); ctx.setLineDash([]); ctx.lineCap = 'butt'; });
  },
  /* pulley wheel with a groove: centre (x,y), radius r, rotation ang */
  pulley(ctx, x, y, r, ang, o = {}) {
    K.raw(ctx, () => {
      const g = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r); g.addColorStop(0, o.c1 || '#e2e8f0'); g.addColorStop(.7, o.c2 || '#94a3b8'); g.addColorStop(1, o.c3 || '#475569');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.strokeStyle = 'rgba(30,41,59,.55)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, r - 4, 0, TAU); ctx.stroke(); // groove
      ctx.fillStyle = 'rgba(30,41,59,.18)'; for (let k = 0; k < 4; k++) { const a = ang + k * Math.PI / 2; ctx.beginPath(); ctx.arc(x + Math.cos(a) * r * .5, y + Math.sin(a) * r * .5, r * .16, 0, TAU); ctx.fill(); }
      ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(x, y, r * .17, 0, TAU); ctx.fill(); ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.arc(x - r * .04, y - r * .04, r * .07, 0, TAU); ctx.fill();
    });
  },
  /* pulley strap (bracket) from axle up/down to a hook point */
  strap(ctx, x, y, r, hx, hy) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(x - r, 0, x + r, 0); g.addColorStop(0, '#7e22ce'); g.addColorStop(.5, '#c084fc'); g.addColorStop(1, '#6b21a8'); ctx.fillStyle = g;
      const up = hy < y; ctx.beginPath(); ctx.moveTo(x - 7, y); ctx.lineTo(hx - 5, hy + (up ? 8 : -8)); ctx.lineTo(hx + 5, hy + (up ? 8 : -8)); ctx.lineTo(x + 7, y); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.4; ctx.beginPath(); if (up) ctx.arc(hx, hy + 2, 6, Math.PI * .1, Math.PI * .9, true); else ctx.arc(hx + 3, hy + 2, 6, -Math.PI / 2, Math.PI * .95); ctx.stroke(); });
  },
  ceiling(ctx, x0, x1, y) { K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y - 16, 0, y); g.addColorStop(0, '#78716c'); g.addColorStop(1, '#a8a29e'); ctx.fillStyle = g; ctx.fillRect(x0, y - 16, x1 - x0, 16); ctx.strokeStyle = '#57534e'; ctx.lineWidth = 1.2; ctx.beginPath(); for (let x = x0; x < x1; x += 12) { ctx.moveTo(x, y - 16); ctx.lineTo(x + 10, y - 2); } ctx.stroke(); ctx.fillStyle = '#44403c'; ctx.fillRect(x0, y - 2, x1 - x0, 3); }); },
  /* brass/iron block weight with hook on top at (x,y) top; width bw */
  block(ctx, x, y, bw, bh, label, o = {}) {
    K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(x, y + 5, 5, Math.PI * 1.1, Math.PI * 2.3); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y + 9); ctx.lineTo(x, y + 14); ctx.stroke();
      const g = ctx.createLinearGradient(x - bw / 2, 0, x + bw / 2, 0); g.addColorStop(0, o.c1 || '#78350f'); g.addColorStop(.35, o.c2 || '#d97706'); g.addColorStop(1, o.c3 || '#713f12');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - bw * .3, y + 14); ctx.lineTo(x + bw * .3, y + 14); ctx.lineTo(x + bw / 2, y + 14 + bh); ctx.lineTo(x - bw / 2, y + 14 + bh); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; ctx.stroke(); });
    if (label) Q24.T(ctx, label, x, y + 14 + bh * .6, { s: 11.5, w: 900, c: '#fff' });
    return y + 14 + bh;
  },
  /* dimension bracket with arrows between two points (along a line), label in the middle */
  dim(ctx, x1, y1, x2, y2, label, col, off = 0) {
    const L = Math.hypot(x2 - x1, y2 - y1); if (L < 4) return; const nx = -(y2 - y1) / L * off, ny = (x2 - x1) / L * off;
    K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 1.6; ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 + nx * 1.2, y1 + ny * 1.2); ctx.moveTo(x2, y2); ctx.lineTo(x2 + nx * 1.2, y2 + ny * 1.2); ctx.stroke();
      G.arrow(ctx, (x1 + x2) / 2 + nx, (y1 + y2) / 2 + ny, x1 + nx, y1 + ny, col, 1.6, 7); G.arrow(ctx, (x1 + x2) / 2 + nx, (y1 + y2) / 2 + ny, x2 + nx, y2 + ny, col, 1.6, 7); });
    if (label) Q24.T(ctx, label, (x1 + x2) / 2 + nx * 1.9, (y1 + y2) / 2 + ny * 1.9, { s: 11.5, w: 900, c: col, bg: 'rgba(255,255,255,.88)' });
  },
  fulc(ctx, x, y, s = 14, col = '#111827') { K.raw(ctx, () => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - s * .8, y + s * 1.25); ctx.lineTo(x + s * .8, y + s * 1.25); ctx.closePath(); ctx.fill(); }); },
  /* card of equation lines on the right; returns height */
  card(ctx, w, L, title, y = 44, wd) { return Q24.lines(ctx, L, w - 14, y, wd || Math.min(330, w * .46), { title, bd: '#9333ea' }); },
  btn(S, id, b, label, click, o = {}) { return Q22.btnObj(id, b, click, o); },
  wood(ctx, x, y, w, h, o = {}) { K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, o.c1 || '#e8b77a'); g.addColorStop(1, o.c2 || '#a8642f'); ctx.fillStyle = g; rr(ctx, x, y, w, h, o.r ?? 3); ctx.fill(); ctx.strokeStyle = 'rgba(120,60,20,.35)'; ctx.lineWidth = 1; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x + 2, y + h * k / 4); ctx.bezierCurveTo(x + w * .3, y + h * k / 4 - 2, x + w * .7, y + h * k / 4 + 2, x + w - 2, y + h * k / 4); ctx.stroke(); } ctx.strokeStyle = 'rgba(90,40,10,.5)'; rr(ctx, x, y, w, h, o.r ?? 3); ctx.stroke(); }); }
};

/* =========================================================================================
   1) نشاط استهلالي (ص 45): قانون العتلات — مسطرة فيها ثقوب، حامل، أثقال، ميزان نابضي
   ========================================================================================= */
(() => {
  const MG = 0.98, FMAX = 10; // weight of one 100 g slotted mass (N), spring-balance range
  const D = { id: 'g8_lever_law', ch: 24, sec: 'نشاط استهلالي', page: 45, kind: 'نشاط استهلالي',
    title: 'نشاط استهلالي: قانون العتلات (المسطرة والأثقال والميزان النابضي)',
    desc: 'نعلّق مسطرة فيها ثقوب من منتصفها في حامل، ونعلّق ثقلاً في إحدى جهتيها وميزاناً نابضياً في الجهة الأخرى، ونسحب النابض حتى تتزن المسطرة أفقياً. ماذا نلاحظ على حاصل ضرب كل قوة في بعدها عن المرتكز؟',
    tags: 'عتلة قانون العتلات مسطرة ثقوب حامل أثقال ميزان نابضي ذراع القوة ذراع المقاومة مرتكز عزم',
    tools: ['مسطرة فيها ثقوب', 'حامل', 'أثقال', 'ميزان نابضي'],
    steps: ['المسطرة معلّقة من منتصفها في الحامل (المرتكز) كما في الشكل.', 'علّق ثقلاً في الجهة اليمنى (المقاومة): اسحب حامل الأثقال إلى أي ثقب، واضغط «➕ ثقل» لزيادة الأثقال.', 'الميزان النابضي معلّق في الجهة اليسرى: اسحبه إلى أي ثقب، ثم اسحب يدك إلى الأسفل حتى تتزن المسطرة أفقياً (تظهر ✓).', 'قراءة الميزان النابضي تمثل القوة F، ووزن الثقل يمثل المقاومة W.', 'قِس بعد كل من الثقل والميزان عن نقطة المرتكز وسجّل القراءات في الجدول (📋).', 'كرّر الخطوة لأثقال وأبعاد مختلفة، واحسب (القوة × بعدها) و(المقاومة × بعدها) لكل مرة. ماذا تلاحظ؟', 'ماذا يمثل القانون الذي طبّقته؟'],
    concl: ['عندما تتزن المسطرة أفقياً يكون: القوة × بعدها عن المرتكز = المقاومة × بعدها عن المرتكز.', 'هذا هو قانون العتلات: F₁ × d₁ = F₂ × d₂ ، ويسمى بعد القوة عن المرتكز «ذراع القوة» وبعد المقاومة عن المرتكز «ذراع المقاومة».', 'كلما زاد ذراع القوة قلّت القوة اللازمة لموازنة المقاومة نفسها.'],
    laws: ['g8_lever', 'g8_ma'],
    fact: ['علّقنا المسطرة من منتصفها حتى يقع مركز ثقلها على المرتكز، فلا يؤثر وزنها في توازنها.', 'الثقل الذي كتلته 100 g وزنه 0.98 N تقريباً (w = m g = 0.1 × 9.8).'],
    controls: [R('n', 'عدد الأثقال (كل منها 100 g)', 1, 6, 2, 1, ''),
      BT('', [{ t: '⚖️ وازن المسطرة', on: S => D.autoBal(S) }, { t: '✋ اترك الميزان', on: S => { S.hy = 0; S.auto = 0; } }]),
      TG('arms', 'ذراع القوة وذراع المقاومة', true, null, 'vector'), TG('vec', 'أسهم القوة والمقاومة', true, null, 'force'), TG('eq', 'بطاقة القانون (الحساب)', true, null, 'labels'), TG('nums', 'أرقام المسطرة (cm)', true, null, 'grid')],
    setup(S) { S.dl = 20; S.df = 30; S.th = .2; S.om = 0; S.hy = 0; S.auto = 0; S.rows = S.rows || []; S.bal = 0; },
    geo(S) { const w = S.W, h = S.H, cx = Q24.cx(w), cy = h * .34, Lh = Math.min((w - 64) / 2 - 50, 330), pxcm = Lh / 50, by = h * .9, L = clamp(h * .21, 120, 170); return { w, h, cx, cy, Lh, pxcm, by, L, pxN: (L - 44) / FMAX }; },
    pt(g, s, th) { return [g.cx + s * g.pxcm * Math.cos(th), g.cy + s * g.pxcm * Math.sin(th)]; },
    W(S) { return S.p.n * MG; },
    hookNat(g, S) { const P = D.pt(g, -S.df, S.th); return P[1] + g.L + 26; },
    Fs(S, g) { if (!S.hy) return 0; return clamp((S.hy - D.hookNat(g, S)) / g.pxN, 0, FMAX * 1.05); },
    autoBal(S) { if (!S.W) return; const g = D.geo(S); const F = D.W(S) * S.dl / S.df; if (F > FMAX) { C2.msg(S, 'القوة اللازمة ' + fmt(F, 3) + ' N أكبر من مدى الميزان (10 N)\nقرّب الثقل أو أبعد الميزان', 3); return; } S.auto = 1; S.hyT = g.cy + g.L + 26 + F * g.pxN; if (!S.hy) S.hy = g.cy + g.L + 26 + 4; },
    update(S, dt) {
      if (!S.W) return; const g = D.geo(S); dt = Math.min(dt, .05); const W = D.W(S);
      if (S.auto && S.hy) { S.hy += (S.hyT - S.hy) * Math.min(1, dt * 5); if (Math.abs(S.hyT - S.hy) < .3) { S.hy = S.hyT; S.auto = 0; } }
      const n = 6, h = dt / n; for (let k = 0; k < n; k++) {
        if (S.hy) S.hy = Math.min(S.hy, D.hookNat(g, S) + FMAX * 1.05 * g.pxN);
        const F = D.Fs(S, g); const tau = (W * S.dl - F * S.df) * Math.cos(S.th);
        S.om += (tau / 22 - 7 * S.om) * h; S.th += S.om * h;
        if (S.th > .2) { S.th = .2; S.om = Math.min(0, S.om); } if (S.th < -.2) { S.th = -.2; S.om = Math.max(0, S.om); }
      }
      S.F = D.Fs(S, g); const was = S.bal; S.bal = Math.abs(S.th) < .012 && Math.abs(S.om) < .05 && S.F > 0 ? 1 : 0;
      if (S.bal && !was) { C2.msg(S, 'المسطرة أفقية ✓\n' + '\u2066F × d₁ = ' + (S.F * S.df).toFixed(1) + '    W × d₂ = ' + (W * S.dl).toFixed(1) + '\u2069', 2.6); if (window.Sound) Sound.ok && Sound.ok(); }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, W = D.W(S), F = S.F || 0; K.bg(ctx, w, h, { benchY: g.by });
      Q24.stand(ctx, g.cx, g.by, g.cy - 60, Math.min(260, w * .3));
      Q24.holeRule(ctx, g.cx, g.cy, g.Lh, S.th, { nums: p.nums !== false });
      K.raw(ctx, () => { ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.arc(g.cx, g.cy, 4.5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#111827'; ctx.lineWidth = 1.5; ctx.stroke(); });
      // load (right)
      const PL = D.pt(g, S.dl, S.th); const lb = Q24.masses(ctx, PL[0], PL[1] - 2, p.n, { dw: 42, dh: 11 });
      // spring balance (left) + hand
      const PF = D.pt(g, -S.df, S.th); const hook = S.hy ? Math.max(S.hy, D.hookNat(g, S)) : D.hookNat(g, S);
      Q24.sb(ctx, PF[0], PF[1] + 1, g.L, F, FMAX, { rx: 46 });
      const hy = S.hy || hook + 30; C2.hand(ctx, PF[0] + 4, hy + 8, 1, 1.05, { rot: -Math.PI / 2, sleeve: '#0ea5e9' });
      // tray of spare masses
      const tr = D.tray(g); K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, tr.x - 46, g.by - 10, 92, 10, 3); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.stroke(); });
      for (let k = 0; k < 6 - p.n; k++) K.raw(ctx, () => { const yy = g.by - 18 - k * 9; const gg = ctx.createLinearGradient(tr.x - 17, 0, tr.x + 17, 0); gg.addColorStop(0, '#c2410c'); gg.addColorStop(.4, '#fb923c'); gg.addColorStop(1, '#9a3412'); ctx.fillStyle = gg; rr(ctx, tr.x - 17, yy, 34, 8, 2); ctx.fill(); });
      Q24.T(ctx, 'أثقال (100 g)', tr.x, g.by + 14, { s: 11, w: 800, c: '#fff', bg: 'rgba(30,41,59,.8)' });
      const B = D.btns(g); C2.btn(ctx, B[0].x, B[0].y, B[0].w, B[0].h, '➕ ثقل', { col: '#ea580c', s: 12.5 }); C2.btn(ctx, B[1].x, B[1].y, B[1].w, B[1].h, '➖ ثقل', { col: '#64748b', s: 12.5 });
      // arms
      const up = -32; const c = Math.cos(S.th), s = Math.sin(S.th);
      if (p.arms !== false) { Q24.dim(ctx, g.cx, g.cy, PF[0], PF[1], 'ذراع القوة d₁ = ' + S.df + ' cm', '#dc2626', 30); Q24.dim(ctx, g.cx, g.cy, PL[0], PL[1], 'ذراع المقاومة d₂ = ' + S.dl + ' cm', '#15803d', -30); }
      if (p.vec !== false) { const k = 9; Q24.F(ctx, PF[0] - 26, PF[1] + 12, 0, Math.max(14, F * k), 'F = ' + fmt(F, 3) + ' N', '#dc2626', 4); Q24.F(ctx, PL[0] + 34, PL[1] + 12, 0, Math.max(14, W * k), 'W = ' + fmt(W, 3) + ' N', '#15803d', 4); }
      Q24.T(ctx, 'المرتكز', g.cx + 38, g.cy + 30, { s: 12, w: 900, c: '#fff', bg: '#111827' });
      // level indicator
      const lv = S.bal ? 'المسطرة أفقية ✓ (متزنة)' : (S.th > .01 ? 'تميل نحو الثقل ↘' : S.th < -.01 ? 'تميل نحو الميزان ↙' : 'تكاد تتزن…');
      Q24.T(ctx, lv, g.cx, g.cy - 78, { s: 13, w: 900, c: '#fff', bg: S.bal ? '#15803d' : '#b45309' });
      if (p.eq !== false) { const a = F * S.df, b = W * S.dl;
        Q24.card(ctx, w, [{ t: 'F × d₁ = ' + F.toFixed(2) + ' × ' + S.df + ' = ' + a.toFixed(1) + ' N·cm', c: '#dc2626', mono: 1 }, { t: 'W × d₂ = ' + W.toFixed(2) + ' × ' + S.dl + ' = ' + b.toFixed(1) + ' N·cm', c: '#15803d', mono: 1 }, { t: S.bal ? 'متساويان ⟸ قانون العتلات ✓' : 'اسحب يدك حتى تتزن المسطرة', c: S.bal ? '#15803d' : '#7c3aed', w: 900 }], 'القوة × ذراعها  ،  المقاومة × ذراعها', 50, Math.min(330, w * .44)); }
      Q24.banner(ctx, w, 'اسحب يدك إلى الأسفل حتى تتزن المسطرة أفقياً', '#9333ea', 20);
      if (W * S.dl / S.df > FMAX) Q24.T(ctx, '⚠ القوة اللازمة أكبر من مدى الميزان (10 N)', g.cx, g.by - 34, { s: 12.5, w: 900, c: '#fff', bg: '#dc2626' });
      C2.drawMsg(ctx, S, g.cx + g.Lh * .45, g.cy + 150);
      K.party(ctx, S);
    },
    tray(g) { return { x: Math.min(g.w - 80, g.cx + g.Lh + 10) }; },
    btns(g) { const x = D.tray(g).x; return [{ x: x - 2, y: g.by - 90, w: 92, h: 34 }, { x: x - 2, y: g.by - 130, w: 92, h: 34 }]; },
    drags(S) {
      if (!S.W) return []; const g = D.geo(S), PL = D.pt(g, S.dl, S.th), PF = D.pt(g, -S.df, S.th), B = D.btns(g);
      const hook = S.hy ? Math.max(S.hy, D.hookNat(g, S)) : D.hookNat(g, S), hy = S.hy || hook + 30;
      return [
        { id: 'load', x: PL[0], y: PL[1] + 40 + S.p.n * 4, w: 64, h: 60 + S.p.n * 9, axis: 'x', keep: true, tip: 'اسحب الأثقال إلى ثقب آخر (تغيير ذراع المقاومة)', idle: 'حرّك الثقل ✋', hint: false,
          drag: (S, d) => { S.dl = clamp(Math.round((d.x - g.cx) / g.pxcm / 5) * 5, 5, 45); } },
        { id: 'sbal', x: PF[0], y: PF[1] + g.L * .45, w: 56, h: g.L * .7, axis: 'x', keep: true, tip: 'اسحب الميزان النابضي إلى ثقب آخر (تغيير ذراع القوة)', hint: false,
          drag: (S, d) => { S.df = clamp(Math.round((g.cx - d.x) / g.pxcm / 5) * 5, 5, 45); } },
        { id: 'hand', x: PF[0], y: hy + 30, w: 70, h: 80, axis: 'y', keep: true, tip: 'اسحب يدك إلى الأسفل لتسحب النابض', idle: 'اسحب للأسفل ✋',
          down: S => { S.auto = 0; if (!S.hy) S.hy = hook + 2; S.hy0 = S.hy; }, drag: (S, d) => { S.hy = clamp(S.hy0 + d.y - d.sy, D.hookNat(g, S) - 40, g.by - 20); },
          wheel: (S, k) => { S.auto = 0; if (!S.hy) S.hy = hook; S.hy += k * 1; } },
        Q24.btn(S, 'plus', B[0], '', S => setParam(S, 'n', S.p.n + 1), { tip: 'أضف ثقلاً (100 g) إلى الحامل' }),
        Q24.btn(S, 'minus', B[1], '', S => setParam(S, 'n', S.p.n - 1), { tip: 'أنزل ثقلاً من الحامل' })];
    },
    readings(S) { const W = D.W(S), F = S.F || 0; return [rd('المقاومة W (وزن الأثقال)', fmt(W, 3) + ' N'), rd('ذراع المقاومة d₂', S.dl + ' cm'), rd('القوة F (قراءة الميزان)', fmt(F, 3) + ' N'), rd('ذراع القوة d₁', S.df + ' cm'), rd('F × d₁', fmt(F * S.df, 4) + ' N·cm'), rd('W × d₂', fmt(W * S.dl, 4) + ' N·cm'), rd('حالة المسطرة', S.bal ? 'أفقية (متزنة) ✓' : 'غير متزنة', 1)]; },
    record(S) { if (!S.bal) { Runner.toast('اجعل المسطرة أفقية أولاً (اسحب يدك أو اضغط «وازن المسطرة»)', 'info'); return null; } const W = D.W(S), F = S.F; if (S.rows && S.rows.length >= 2) K.cheer(S, S.W / 2, S.H * .3); return { W: +W.toFixed(2), d2: S.dl, F: +F.toFixed(2), d1: S.df, a: +(F * S.df).toFixed(1), b: +(W * S.dl).toFixed(1) }; },
    cols: [['W', 'المقاومة W (N)'], ['d2', 'ذراعها d₂ (cm)'], ['F', 'القوة F (N)'], ['d1', 'ذراعها d₁ (cm)'], ['a', 'F × d₁'], ['b', 'W × d₂']],
    graph: { x: 'd1', y: 'F', xl: 'ذراع القوة d₁ (cm)', yl: 'القوة F (N)', theory: (x, S) => D.W(S) * S.dl / x, xmin: 4, xmax: 46 },
    explain(S) { const W = D.W(S), F = S.F || 0; if (!S.F) return 'الميزان النابضي مرتخٍ فلا يؤثر بقوة، لذلك تميل المسطرة نحو الثقل. اسحب يدك إلى الأسفل.'; if (S.bal) return 'المسطرة متزنة أفقياً: <b>F × d₁ = ' + fmt(F * S.df, 4) + '</b> و <b>W × d₂ = ' + fmt(W * S.dl, 4) + '</b> (N·cm) — متساويان! هذا هو <b>قانون العتلات</b>.'; return S.th > 0 ? 'أثر المقاومة (W × d₂) أكبر من أثر القوة (F × d₁)، فتدور المسطرة نحو الثقل. زِد سحبك.' : 'أثر القوة (F × d₁) أكبر، فتدور المسطرة نحو الميزان. خفّف سحبك.'; },
    quiz: [
      { q: 'قانون العتلات هو:', o: ['القوة × ذراعها = المقاومة × ذراعها', 'القوة + ذراعها = المقاومة + ذراعها', 'القوة ÷ ذراعها = المقاومة × ذراعها'], a: 0, why: 'F₁ × d₁ = F₂ × d₂ (ص 46).' },
      { q: 'ذراع القوة هو:', o: ['بعد المقاومة عن المرتكز', 'بعد القوة عن المرتكز', 'طول العتلة كلها'], a: 1, why: 'يسمّى بعد القوة عن المرتكز ذراع القوة، وبعد المقاومة عن المرتكز ذراع المقاومة.' },
      { q: 'إذا ضاعفنا ذراع القوة مع بقاء المقاومة وذراعها، فإن القوة اللازمة للاتزان:', o: ['تتضاعف', 'تبقى ثابتة', 'تقل إلى النصف'], a: 2, why: 'F × d₁ ثابت، فإذا تضاعف d₁ تقل F إلى النصف.' }
    ]
  };
  M8.P[D.id] = D;
})();
/* =========================================================================================
   2) الدرس 1 (ص 46–48): العتلات — أجزاؤها وأنواعها الثلاثة، الفائدة الميكانيكية، ربح القوة وربح السرعة
   Shared lever library LV (also used by g8_lever_sort). Coordinates in cm, origin = fulcrum, y down.
   ========================================================================================= */
const LV = (() => {
  const met = (ctx, x0, y0, x1, y1, c1 = '#f1f5f9', c2 = '#64748b') => { const g = ctx.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, c2); g.addColorStop(.45, c1); g.addColorStop(1, c2); return g; };
  const poly = (ctx, P, f, s, lw = 1) => { ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); if (f) { ctx.fillStyle = f; ctx.fill(); } if (s) { ctx.strokeStyle = s; ctx.lineWidth = lw; ctx.stroke(); } };
  const rot = (p, a) => [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)];
  const bar = (ctx, X, x0, x1, th) => { const a = X(x0, -th / 2), b = X(x1, th / 2); const g = ctx.createLinearGradient(0, a[1], 0, b[1]); g.addColorStop(0, '#3b82f6'); g.addColorStop(.5, '#1e3a8a'); g.addColorStop(1, '#172554'); ctx.fillStyle = g; rr(ctx, a[0], a[1], b[0] - a[0], b[1] - a[1], 3); ctx.fill(); };
  const finger = (ctx, x, y, dir, s) => { // fingertip pressing at (x,y) from direction dir (unit, pointing from finger to contact)
    const a = Math.atan2(dir[1], dir[0]); ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = '#f2c29b'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1; rr(ctx, -s * 3.4, -s * .55, s * 3.4, s * 1.1, s * .55); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fde2cf'; ctx.beginPath(); ctx.ellipse(-s * .55, -s * .15, s * .38, s * .3, 0, 0, TAU); ctx.fill(); ctx.restore(); };
  const E = {
    bar1: { n: 'مخطط الكتاب (النوع الأول)', cls: 1, book: 1, W: 60, bars: 1, box: [-10, 110, -30, 30],
      geo: S => ({ f: [S.f1, 0], L: { p: [0, 0], v: [0, 1] }, Ep: [100, 0], Ev: [0, 1] }), fd: [10, 90] },
    scissors: { n: 'المقص', cls: 1, book: 1, W: 15, box: [-9, 12.5, -5, 5], ld: [1.5, 10], ed: [4.2, 7.4], e0: 6.6, l0: 6,
      geo: (S, o) => { const f = .14, c = Math.cos(f), s = Math.sin(f); return { f: [0, 0], L: { p: [o.l * c, -o.l * s], v: [-s, -c] }, Ep: [-o.e * c, o.e * s], Ev: [-s, -c], eDrag: [[-4.2 * c, 4.2 * s], [-7.4 * c, 7.4 * s]], lDrag: [[1.5 * c, -1.5 * s], [10 * c, -10 * s]] }; },
      draw(ctx, X, u, o, G) { const f = .14;
        [1, -1].forEach(sg => { const a = sg * f; // sg=1: lower blade (blade down-right, handle up-left); drawn first
          const P = q => { const r = rot(q, a); return X(r[0], r[1]); };
          poly(ctx, [P([0, -.5]), P([11.5, -.05]), P([11.5, .1]), P([0, .55])], met(ctx, ...P([0, -.6]), ...P([0, .6])), '#334155', 1);
          const h0 = P([-1.2, 0]), h1 = P([-6.6, 0]); ctx.strokeStyle = sg > 0 ? '#ea580c' : '#f97316'; ctx.lineWidth = u * .9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(h0[0], h0[1]); ctx.lineTo(...P([-4.4, 0])); ctx.stroke(); ctx.lineCap = 'butt';
          const c = P([-6.4, sg * .9]); ctx.lineWidth = u * .75; ctx.beginPath(); ctx.ellipse(c[0], c[1], u * 1.9, u * 1.25, a, 0, TAU); ctx.stroke(); });
        // cardboard being cut
        const cp = X(o.l, 0); ctx.fillStyle = '#d6b88a'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; rr(ctx, cp[0] - u * .18, cp[1] - u * 4.2, u * .36, u * 8.4, 1); ctx.fill(); ctx.stroke();
        const pv = X(0, 0); ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(pv[0], pv[1], u * .42, 0, TAU); ctx.fill(); ctx.strokeStyle = '#1e293b'; ctx.stroke(); ctx.beginPath(); ctx.moveTo(pv[0] - u * .3, pv[1]); ctx.lineTo(pv[0] + u * .3, pv[1]); ctx.stroke();
        finger(ctx, ...G.Ep, [-Math.sin(f), -Math.cos(f)], u * .9); } },
    tin: { n: 'فتح علبة الطلاء بالمفك (شكل ص 46)', cls: 1, book: 1, W: 50, box: [-16, 24, -11, 15], ed: [7, 23], e0: 20,
      geo: (S, o) => { const d = [Math.cos(.38), -Math.sin(.38)], n = [Math.sin(.38), Math.cos(.38)]; return { f: [0, 0], L: { p: [-1.5 * d[0], -1.5 * d[1]], v: n, show: [0, -1] }, Ep: [o.e * d[0], o.e * d[1]], Ev: n, eDrag: [[7 * d[0], 7 * d[1]], [23 * d[0], 23 * d[1]]] }; },
      draw(ctx, X, u, o, G) { const tl = X(-14.6, 0), br = X(0, 14);
        const g = ctx.createLinearGradient(tl[0], 0, br[0], 0); g.addColorStop(0, '#1e40af'); g.addColorStop(.35, '#60a5fa'); g.addColorStop(.6, '#2563eb'); g.addColorStop(1, '#1e3a8a'); ctx.fillStyle = g; ctx.fillRect(tl[0], tl[1], br[0] - tl[0], br[1] - tl[1]);
        ctx.fillStyle = '#facc15'; ctx.fillRect(tl[0], tl[1] + u * 4, br[0] - tl[0], u * .8); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(tl[0] + u * 3, tl[1] + u * 1, u * 1, u * 12);
        ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.ellipse((tl[0] + br[0]) / 2, tl[1], (br[0] - tl[0]) / 2, u * 1.3, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.2; ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.ellipse((tl[0] + br[0]) / 2 - u * .3, tl[1] - u * .5, (br[0] - tl[0]) / 2 - u * 1.3, u * .9, -.03, 0, TAU); ctx.fill(); ctx.stroke(); // lid lifted a little
        const d = [Math.cos(.38), -Math.sin(.38)]; const A = X(-1.6 * d[0], -1.6 * d[1]), B = X(11 * d[0], 11 * d[1]), C = X(24 * d[0], 24 * d[1]);
        ctx.strokeStyle = met(ctx, A[0], A[1] - 3, A[0], A[1] + 3); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = u * .55; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
        ctx.strokeStyle = '#dc2626'; ctx.lineWidth = u * 2.2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...X(12 * d[0], 12 * d[1])); ctx.lineTo(C[0], C[1]); ctx.stroke(); ctx.strokeStyle = '#111827'; ctx.lineWidth = u * .7; ctx.beginPath(); ctx.moveTo(...X(14 * d[0], 14 * d[1])); ctx.lineTo(...X(22 * d[0], 22 * d[1])); ctx.stroke(); ctx.lineCap = 'butt';
        C2.hand(ctx, G.Ep[0], G.Ep[1] - u * .8, 1, Math.min(1.3, u / 16), { rot: Math.PI / 2 + .38, sleeve: '#0ea5e9' }); } },
    balance: { n: 'الميزان ذو الكفتين', cls: 1, book: 1, W: 2, box: [-22, 22, -4, 26], fixed: 1,
      geo: S => ({ f: [0, 0], L: { p: [-14, 6.5], v: [0, 1] }, Ep: [14, 6.5], Ev: [0, 1] }),
      draw(ctx, X, u, o, G) { const c = X(0, 0); const pans = K.twoPan(ctx, c[0], c[1], 14 * u, 0, { hang: 9 * u, base: c[1] + 24 * u });
        K.ball(ctx, pans[0][0], pans[0][1] - u * 2.6, u * 2.8, '#dc2626'); K.raw(ctx, () => { ctx.strokeStyle = '#166534'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(pans[0][0], pans[0][1] - u * 5.2); ctx.lineTo(pans[0][0] + u, pans[0][1] - u * 6.5); ctx.stroke(); });
        Q24.block(ctx, pans[1][0] - u * 1.6, pans[1][1] - u * 5.2, u * 2.4, u * 3); Q24.block(ctx, pans[1][0] + u * 1.6, pans[1][1] - u * 4, u * 1.8, u * 1.8); } },
    hammer: { n: 'قالعة المسامير', cls: 1, W: 300, box: [-8, 20, -30, 4], ed: [12, 30], e0: 27,
      geo: (S, o) => { const d = [.5, -.866], h0 = [-.8, -3]; return { f: [0, 0], L: { p: [-3, -2.2], v: [0, 1] }, Ep: [h0[0] + o.e * d[0], h0[1] + o.e * d[1]], Ev: [.866, .5], eDrag: [[h0[0] + 12 * d[0], h0[1] + 12 * d[1]], [h0[0] + 30 * d[0], h0[1] + 30 * d[1]]] }; },
      draw(ctx, X, u, o, G) { Q24.wood(ctx, ...X(-12, 0), u * 34, u * 4);
        const nl = X(-3, 0); ctx.fillStyle = '#9ca3af'; ctx.fillRect(nl[0] - u * .2, nl[1] - u * 2.6, u * .4, u * 2.6); ctx.fillRect(nl[0] - u * .6, nl[1] - u * 2.8, u * 1.2, u * .35);
        const d = [.5, -.866], h0 = [-.8, -3]; const A = X(h0[0], h0[1]), B = X(h0[0] + 32 * d[0], h0[1] + 32 * d[1]);
        ctx.strokeStyle = '#a16207'; ctx.lineWidth = u * 1.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.strokeStyle = '#111827'; ctx.lineWidth = u * 1.9; ctx.beginPath(); ctx.moveTo(...X(h0[0] + 20 * d[0], h0[1] + 20 * d[1])); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.lineCap = 'butt';
        // steel head with curved claw resting on the wood at the fulcrum
        ctx.fillStyle = met(ctx, ...X(0, -5), ...X(0, -1)); ctx.beginPath(); ctx.moveTo(...X(2.4, -5.6)); ctx.lineTo(...X(4.2, -2.6)); ctx.lineTo(...X(1.2, -1.1)); ctx.quadraticCurveTo(...X(.2, .1), ...X(-1.2, -.6)); ctx.quadraticCurveTo(...X(-2.6, -1.4), ...X(-3.9, -2.2)); ctx.lineTo(...X(-3.6, -2.9)); ctx.quadraticCurveTo(...X(-1.4, -2.4), ...X(-.4, -4.4)); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke();
        C2.hand(ctx, G.Ep[0] - u * 1.2, G.Ep[1] - u * .5, 1, Math.min(1.3, u / 16), { rot: .52, sleeve: '#0ea5e9' }); } },
    bar2: { n: 'مخطط الكتاب (النوع الثاني)', cls: 2, book: 1, W: 60, bars: 1, box: [-10, 110, -30, 30], ld: [8, 88], l0: 40,
      geo: (S, o) => ({ f: [0, 0], L: { p: [o.l, 0], v: [0, 1] }, Ep: [100, 0], Ev: [0, -1], lDrag: [[8, 0], [88, 0]] }) },
    opener: { n: 'مفتاح العلبة (فتّاحة القناني)', cls: 2, book: 1, W: 30, box: [-4, 14, -5, 12], ed: [5, 13.4], e0: 12,
      geo: (S, o) => ({ f: [0, 0], L: { p: [2.7, .7], v: [0, 1] }, Ep: [o.e, -.1], Ev: [0, -1], eDrag: [[5, -.1], [13.4, -.1]] }),
      draw(ctx, X, u, o, G) { // bottle + crown cap + opener
        const n0 = X(-.2, .9), n1 = X(2.9, 12); const g = ctx.createLinearGradient(n0[0], 0, n1[0], 0); g.addColorStop(0, '#14532d'); g.addColorStop(.4, '#4ade80'); g.addColorStop(1, '#14532d'); ctx.fillStyle = g;
        ctx.beginPath(); ctx.moveTo(...X(.1, .9)); ctx.lineTo(...X(2.6, .9)); ctx.lineTo(...X(2.6, 5)); ctx.quadraticCurveTo(...X(4.4, 7), ...X(4.6, 12)); ctx.lineTo(...X(-1.9, 12)); ctx.quadraticCurveTo(...X(-1.7, 7), ...X(.1, 5)); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#facc15'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1; const c0 = X(-.2, 0); ctx.beginPath(); ctx.moveTo(c0[0], c0[1]); ctx.lineTo(...X(2.9, 0)); for (let k = 0; k <= 8; k++) ctx.lineTo(...X(2.9 - k * 3.1 / 8, k % 2 ? 1.1 : .8)); ctx.closePath(); ctx.fill(); ctx.stroke();
        const A = X(-.6, -.35), B = X(13.8, -.35); ctx.fillStyle = met(ctx, A[0], A[1] - u * .5, A[0], A[1] + u * .5); rr(ctx, A[0], A[1] - u * .3, B[0] - A[0], u * .7, u * .3); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.stroke();
        ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.moveTo(...X(2.4, .3)); ctx.lineTo(...X(3.2, .3)); ctx.lineTo(...X(3.2, 1.25)); ctx.lineTo(...X(2.5, 1.25)); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#7c2d12'; const hh = X(8, -.65); rr(ctx, hh[0], hh[1], u * 6, u * 1.3, u * .5); ctx.fill();
        C2.hand(ctx, G.Ep[0], G.Ep[1] + u * .6, 1, Math.min(1.3, u / 14), { rot: -Math.PI / 2, sleeve: '#0ea5e9' }); } },
    nut: { n: 'كسارة البندق (الجوز)', cls: 2, book: 1, W: 120, box: [-3, 19, -6, 6], ld: [2.2, 6.5], l0: 3.4, ed: [8, 17], e0: 15,
      geo: (S, o) => ({ f: [0, 0], L: { p: [o.l, -.9], v: [0, -1] }, Ep: [o.e, -.9], Ev: [0, 1], lDrag: [[2.2, 0], [6.5, 0]], eDrag: [[8, -.9], [17, -.9]] }),
      draw(ctx, X, u, o, G) { const r = 1.15; const nc = X(o.l, 0);
        [-1, 1].forEach(sg => { const A = X(0, 0), B = X(18, sg * 1.6); ctx.strokeStyle = met(ctx, A[0], A[1] - 4, A[0], A[1] + 4); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = u * .75; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.quadraticCurveTo(...X(o.l, sg * (r + .35)), B[0], B[1]); ctx.stroke(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; ctx.stroke();
          ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = u * 1.1; ctx.beginPath(); ctx.moveTo(...X(10, sg * 1.25)); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.lineCap = 'butt'; });
        const g = ctx.createRadialGradient(nc[0] - u * .4, nc[1] - u * .4, u * .2, nc[0], nc[1], u * r); g.addColorStop(0, '#d6a26a'); g.addColorStop(1, '#78350f'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(nc[0], nc[1], u * r * 1.05, u * r, 0, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(69,26,3,.6)'; ctx.lineWidth = 1; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.ellipse(nc[0] + k * u * .35, nc[1], u * .25, u * r * .85, 0, 0, TAU); ctx.stroke(); }
        const pv = X(0, 0); ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(pv[0], pv[1], u * .6, 0, TAU); ctx.fill(); ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.arc(pv[0], pv[1], u * .25, 0, TAU); ctx.fill();
        C2.hand(ctx, G.Ep[0], G.Ep[1] - u * .5, 1, Math.min(1.3, u / 22), { rot: Math.PI / 2, sleeve: '#0ea5e9' }); } },
    clipper: { n: 'مقراض الأظافر', cls: 2, W: 30, box: [-2, 8, -2.5, 2.5], ed: [3, 6.6], e0: 5.9,
      geo: (S, o) => ({ f: [0, 0], L: { p: [1.15, .05], v: [0, 1] }, Ep: [o.e, -.62], Ev: [0, 1], eDrag: [[3, -.62], [6.6, -.62]], flipE: 1 }),
      draw(ctx, X, u, o, G) { const A = X(-.6, .4), B = X(6.4, 1.6);
        ctx.fillStyle = met(ctx, A[0], A[1], A[0], B[1]); ctx.beginPath(); ctx.moveTo(...X(-.7, .25)); ctx.lineTo(...X(6.4, .5)); ctx.quadraticCurveTo(...X(6.8, 1), ...X(6.4, 1.5)); ctx.lineTo(...X(-.7, 1.75)); ctx.quadraticCurveTo(...X(-1.1, 1), ...X(-.7, .25)); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke();
        ctx.strokeStyle = '#334155'; ctx.beginPath(); ctx.moveTo(...X(-.75, 1)); ctx.lineTo(...X(5.8, 1)); ctx.stroke();
        ctx.fillStyle = '#64748b'; const p0 = X(1, -.1); ctx.fillRect(p0[0], p0[1], u * .3, u * 1.2);
        ctx.fillStyle = met(ctx, ...X(0, -.6), ...X(0, -.1)); ctx.beginPath(); ctx.moveTo(...X(-.2, -.1)); ctx.quadraticCurveTo(...X(3, -.75), ...X(6.9, -.55)); ctx.lineTo(...X(6.9, -.25)); ctx.quadraticCurveTo(...X(3, -.35), ...X(-.2, .1)); ctx.closePath(); ctx.fill(); ctx.stroke();
        finger(ctx, G.Ep[0], G.Ep[1] - 2, [0, 1], u * .55); } },
    barrow: { n: 'عربة اليد', cls: 2, W: 600, box: [-25, 205, -178, 24], ed: [100, 150], e0: 140,
      geo: (S, o) => ({ f: [0, 0], L: { p: [55, -15], v: [0, 1] }, Ep: [o.e, -14 + (o.e - 100) * -.05], Ev: [0, -1], eDrag: [[100, -14], [150, -16.5]] }),
      draw(ctx, X, u, o, G) { const gy = X(0, 20)[1];
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(X(70, 20)[0], gy + 3, u * 80, u * 4, 0, 0, TAU); ctx.fill(); });
        const T = [X(15, -12), X(95, -12), X(80, -45), X(5, -45)].map(p => p); // tray (side view)
        ctx.fillStyle = '#16a34a'; poly(ctx, [X(18, -10), X(92, -10), X(100, -42), X(4, -42)], '#16a34a', '#14532d', 1.5);
        ctx.fillStyle = '#78350f'; ctx.beginPath(); ctx.moveTo(...X(8, -40)); ctx.quadraticCurveTo(...X(52, -58), ...X(97, -40)); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = u * 2.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...X(0, 0)); ctx.lineTo(...X(150, -16.5)); ctx.stroke(); ctx.lineCap = 'butt';
        ctx.strokeStyle = '#475569'; ctx.lineWidth = u * 1.6; ctx.beginPath(); ctx.moveTo(...X(80, -10)); ctx.lineTo(...X(84, 20)); ctx.stroke();
        const wc = X(0, 0); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(wc[0], wc[1], u * 20, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(wc[0], wc[1], u * 13, 0, TAU); ctx.fill(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(wc[0], wc[1], u * 3, 0, TAU); ctx.fill();
        const hd = G.Ep, H = u * 175; Q24.person(ctx, { H, f: -1, hip: [hd[0] + u * 40, gy - u * 92], neck: [hd[0] + u * 34, gy - u * 150], hands: [[hd[0] + 3, hd[1]], hd], feet: [[hd[0] + u * 28, gy], [hd[0] + u * 58, gy]], shirt: '#0ea5e9' }); } },
    bar3: { n: 'مخطط الكتاب (النوع الثالث)', cls: 3, book: 1, W: 20, bars: 1, box: [-10, 110, -30, 30], ed: [8, 88], e0: 40,
      geo: (S, o) => ({ f: [0, 0], L: { p: [100, 0], v: [0, 1] }, Ep: [o.e, 0], Ev: [0, -1], eDrag: [[8, 0], [88, 0]] }) },
    stapler: { n: 'الكابسة الورقية (الدبّاسة)', cls: 3, book: 1, W: 30, box: [-2, 19, -6, 3], ed: [3, 13.5], e0: 8,
      geo: (S, o) => ({ f: [0, 0], L: { p: [15.5, .4], v: [0, -1] }, Ep: [o.e, -.9], Ev: [0, 1], eDrag: [[3, -.9], [13.5, -.9]] }),
      draw(ctx, X, u, o, G) { const b0 = X(-1.5, 1.2); ctx.fillStyle = '#1f2937'; rr(ctx, b0[0], b0[1], u * 18.5, u * 1.3, u * .5); ctx.fill();
        ctx.fillStyle = '#f8fafc'; const pp = X(10, .6); ctx.fillRect(pp[0], pp[1], u * 9, u * .5); ctx.strokeStyle = '#94a3b8'; ctx.strokeRect(pp[0], pp[1], u * 9, u * .5);
        const g = ctx.createLinearGradient(0, X(0, -1.4)[1], 0, X(0, .4)[1]); g.addColorStop(0, '#f87171'); g.addColorStop(1, '#991b1b'); ctx.fillStyle = g;
        ctx.beginPath(); ctx.moveTo(...X(-1, .4)); ctx.quadraticCurveTo(...X(-1.6, -1.3), ...X(1, -1.4)); ctx.lineTo(...X(16, -1.2)); ctx.quadraticCurveTo(...X(17, -1), ...X(16.3, .5)); ctx.lineTo(...X(-1, .5)); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 1; ctx.stroke();
        const pv = X(0, 0); ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.arc(pv[0], pv[1], u * .4, 0, TAU); ctx.fill();
        finger(ctx, G.Ep[0], G.Ep[1] - 2, [0, 1], u * .7); } },
    tongs: { n: 'الملقط', cls: 3, book: 1, W: 4, box: [-2, 22, -4, 4], ed: [4, 16], e0: 9,
      geo: (S, o) => ({ f: [0, 0], L: { p: [19.6, -.85], v: [0, -1] }, Ep: [o.e, -1.05 - o.e * .02], Ev: [0, 1], eDrag: [[4, -1.1], [16, -1.35]] }),
      draw(ctx, X, u, o, G) { [-1, 1].forEach(sg => { ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = u * .55; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...X(0, 0)); ctx.quadraticCurveTo(...X(6, sg * 1.6), ...X(20, sg * .85)); ctx.stroke(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.stroke(); ctx.lineCap = 'butt'; });
        const cb = X(18.7, -.8); ctx.fillStyle = 'rgba(186,230,253,.85)'; ctx.strokeStyle = '#38bdf8'; rr(ctx, cb[0], cb[1], u * 1.6, u * 1.6, 3); ctx.fill(); ctx.stroke();
        const pv = X(0, 0); ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.arc(pv[0], pv[1], u * .55, 0, TAU); ctx.fill();
        finger(ctx, G.Ep[0], G.Ep[1] - 2, [0, 1], u * .6); } },
    arm: { n: 'ذراع الإنسان (الساعد)', cls: 3, W: 20, box: [-10, 42, -36, 8], ed: [3, 8], e0: 4,
      geo: (S, o) => ({ f: [0, 0], L: { p: [33, 0], v: [0, 1] }, Ep: [o.e, -1.2], Ev: [0, -1], eDrag: [[3, -1.2], [8, -1.2]] }),
      draw(ctx, X, u, o, G) { const sh = X(-3, -32), el = X(0, 0), hd = X(33, -.5);
        ctx.lineCap = 'round'; ctx.strokeStyle = '#0ea5e9'; ctx.lineWidth = u * 8; ctx.beginPath(); ctx.moveTo(sh[0], sh[1] - u * 4); ctx.lineTo(sh[0], sh[1] + u * 6); ctx.stroke();
        ctx.strokeStyle = '#f2c29b'; ctx.lineWidth = u * 6.5; ctx.beginPath(); ctx.moveTo(sh[0], sh[1] + u * 6); ctx.lineTo(el[0], el[1]); ctx.stroke(); ctx.lineWidth = u * 5; ctx.beginPath(); ctx.moveTo(el[0], el[1]); ctx.lineTo(hd[0], hd[1]); ctx.stroke(); ctx.lineCap = 'butt';
        const bp = X(o.e, -1.2); ctx.fillStyle = 'rgba(220,38,38,.55)'; ctx.beginPath(); ctx.moveTo(sh[0] + u * 1, sh[1] + u * 4); ctx.quadraticCurveTo(sh[0] + u * 9, (sh[1] + bp[1]) / 2, bp[0], bp[1]); ctx.quadraticCurveTo(sh[0] + u * 2, (sh[1] + bp[1]) / 2, sh[0] - u * 1, sh[1] + u * 4); ctx.fill(); Q24.T(ctx, 'العضلة', sh[0] + u * 9, (sh[1] + bp[1]) / 2, { s: 11, w: 800, c: '#991b1b' });
        ctx.fillStyle = '#e5e7eb'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(el[0], el[1], u * 1.6, 0, TAU); ctx.fill(); ctx.stroke();
        K.ball(ctx, hd[0] + u * 1.5, hd[1] - u * 4.2, u * 3.6, '#f97316'); ctx.fillStyle = '#f2c29b'; ctx.beginPath(); ctx.ellipse(hd[0] + u * 1, hd[1] - u * 1, u * 3, u * 2, 0, 0, TAU); ctx.fill(); } }
  };
  const ORDER = { 1: ['bar1', 'scissors', 'tin', 'balance', 'hammer'], 2: ['bar2', 'opener', 'nut', 'clipper', 'barrow'], 3: ['bar3', 'stapler', 'tongs', 'arm'] };
  const arm = (p, v, f) => Math.abs((p[0] - f[0]) * v[1] - (p[1] - f[1]) * v[0]);
  const foot = (p, v, f) => { const t = (f[0] - p[0]) * v[0] + (f[1] - p[1]) * v[1]; return [p[0] + v[0] * t, p[1] + v[1] * t]; };
  Object.keys(E).forEach(k => E[k].k = k);
  return { E, ORDER, arm, foot, met, poly, bar, finger };
})();
(() => {
  const CN = { 1: 'النوع الأول', 2: 'النوع الثاني', 3: 'النوع الثالث' };
  const CD = { 1: 'المرتكز بين القوة والمقاومة', 2: 'المقاومة بين المرتكز والقوة', 3: 'القوة بين المرتكز والمقاومة' };
  const exOpts = [1, 2, 3].flatMap(c => LV.ORDER[c].map(k => [k, (c === 1 ? '① ' : c === 2 ? '② ' : '③ ') + LV.E[k].n]));
  const D = { id: 'g8_lever_types', ch: 24, sec: 'الدرس 1: العتلات', page: 46, kind: 'نشاط',
    title: 'العتلات: أجزاؤها وأنواعها الثلاثة والفائدة الميكانيكية',
    desc: 'العتلة جسم صلب قابل للدوران حول مرتكز ثابت. تُصنَّف ثلاثة أنواع حسب موضع كل من المرتكز ونقطة تأثير القوة والمقاومة. حرّك المرتكز أو القوة على كل عتلة وشاهد كيف تتغير القوة اللازمة والفائدة الميكانيكية.',
    tags: 'عتلة مرتكز قوة مقاومة ذراع القوة ذراع المقاومة النوع الأول الثاني الثالث مقص كسارة بندق ملقط كابسة ميزان علبة طلاء مفك فائدة ميكانيكية ربح قوة ربح سرعة',
    tools: ['مقص', 'ميزان ذو كفتين', 'مفتاح علبة', 'كسارة البندق', 'كابسة ورق', 'ملقط', 'علبة طلاء ومفك'],
    steps: ['اختر نوع العتلة من الأزرار في الأعلى (الأول/الثاني/الثالث)، ثم اختر مثالاً. أول مثال هو مخطط الكتاب (شكل 1).', 'تعرّف على أجزاء العتلة: المرتكز ▲، القوة (السهم الأحمر)، المقاومة (السهم الأخضر)، ذراع القوة وذراع المقاومة.', 'في مخطط النوع الأول اسحب المرتكز: قرّبه من المقاومة (ربح قوة)، ثم من القوة (ربح سرعة)، ثم ضعه في المنتصف (لا نحصل على شيء).', 'في الأمثلة الحقيقية اسحب اليد/الإصبع على المقبض (أو الجسم بين الفكين) وراقب القوة اللازمة.', 'فعّل «حرّك العتلة» في المخططات: لاحظ أن الطرف ذا الذراع الأطول يقطع مسافة أكبر في الزمن نفسه.', 'قارن الفائدة الميكانيكية M.A = المقاومة ÷ القوة في الأنواع الثلاثة. أي نوع يعطي ربح قوة فقط؟ وأيها ربح سرعة فقط؟'],
    concl: ['العتلة جسم صلب قابل للدوران حول مرتكز ثابت. ذراع القوة: بعد القوة عن المرتكز، ذراع المقاومة: بعد المقاومة عن المرتكز.', 'النوع الأول: المرتكز بين القوة والمقاومة (المقص، الميزان ذو الكفتين) — قد نحصل على ربح قوة أو ربح سرعة أو لا نحصل عليهما.', 'النوع الثاني: المقاومة بين المرتكز والقوة (مفتاح العلبة، كسارة البندق) — القوة أصغر من المقاومة: ربح قوة فقط.', 'النوع الثالث: القوة بين المرتكز والمقاومة (الكابسة الورقية، الملقط) — القوة أكبر من المقاومة: ربح سرعة فقط.', 'الفائدة الميكانيكية = المقاومة ÷ القوة = ذراع القوة ÷ ذراع المقاومة. لا يمكن الحصول على ربح قوة وربح سرعة في آن واحد.'],
    laws: ['g8_lever', 'g8_ma', 'g8_gain'],
    fact: ['حقيقة علمية: لا يمكن الحصول على ربح قوة وربح سرعة من العتلة في آن واحد (ص 48).', 'الآلة لا تقلل مقدار الشغل، لكنها تجعلك تستخدم قوة أقل للتغلب على المقاومة (ص 47).', 'ساعد الإنسان عتلة من النوع الثالث: العضلة تبذل قوة كبيرة، لكن اليد تتحرك بسرعة ومسافة كبيرة.'],
    controls: [SEL('ex', 'المثال', exOpts, 'bar1', (v, S) => D.pick(S, v)),
      BT('مخطط النوع الأول (شكل 1)', [{ t: 'ربح قوة', on: S => D.preset(S, 25) }, { t: 'ربح سرعة', on: S => D.preset(S, 75) }, { t: 'لا شيء', on: S => D.preset(S, 50) }]),
      TG('arms', 'ذراع القوة وذراع المقاومة', true, null, 'vector'), TG('vec', 'أسهم القوة والمقاومة', true, null, 'force'), TG('sch', 'مخطط العتلة (كما في الكتاب)', true, null, 'schematic'), TG('mv', 'حرّك العتلة (المسافة والسرعة)', false, null, 'velocity'), TG('lab', 'الأسماء والقيم', true, null, 'labels')],
    setup(S) { S.f1 = 25; S.st = {}; D.pick(S, S.p.ex); },
    pick(S, k) { const e = LV.E[k]; if (!e) return; S.cls = e.cls; S.st = S.st || {}; if (!S.st[k]) S.st[k] = { e: e.e0 ?? 0, l: e.l0 ?? 0 }; S.ee = S.st[k].e; S.ll = S.st[k].l; },
    preset(S, f) { if (S.p.ex !== 'bar1') { setParam(S, 'ex', 'bar1'); } S.f1T = f; },
    ex(S) { return LV.E[S.p.ex] || LV.E.bar1; },
    G(S) { const e = D.ex(S), o = { e: S.ee, l: S.ll }; const g = e.geo(S, o); g.Lv = g.L.v; const aL = LV.arm(g.L.p, g.L.v, g.f), aE = LV.arm(g.Ep, g.Ev, g.f); const F = e.W * aL / Math.max(aE, 1e-6); return Object.assign(g, { aL, aE, F, MA: e.W / F, e, o }); },
    lay(S) { const w = S.W, h = S.H, e = D.ex(S), b = e.box, sch = S.p.sch !== false && !e.bars; const top = 150, bot = h * (sch ? .64 : .82), x0 = 76, x1 = w - 20;
      const u = Math.min((x1 - x0) / (b[1] - b[0]), (bot - top) / (b[3] - b[2])); const ox = (x0 + x1) / 2 - (b[0] + b[1]) / 2 * u, oy = (top + bot) / 2 - (b[2] + b[3]) / 2 * u;
      return { w, h, u, ox, oy, top, bot, sch, X: (x, y) => [ox + x * u, oy + y * u] }; },
    update(S, dt) { if (S.f1T != null) { S.f1 += (S.f1T - S.f1) * Math.min(1, dt * 6); if (Math.abs(S.f1 - S.f1T) < .2) { S.f1 = S.f1T; S.f1T = null; } } S.ph = (S.ph || 0) + dt; },
    draw(ctx, w, h, S) {
      const p = S.p, e = D.ex(S), L = D.lay(S), g = D.G(S), X = L.X, u = L.u;
      K.bg(ctx, w, h, { benchY: e.k === 'barrow' ? L.oy + 20 * u : h * .97, bench: true });
      // tabs + chips
      D.tabs(S).forEach(b => C2.btn(ctx, b.x, b.y, b.w, b.h, b.lab, { col: b.on ? '#9333ea' : '#94a3b8', s: 13, on: b.on }));
      D.chips(S).forEach(b => C2.btn(ctx, b.x, b.y, b.w, b.h, b.lab, { col: b.on ? '#0f766e' : '#64748b', s: 11.5, on: b.on }));
      Q24.T(ctx, CN[e.cls] + ': ' + CD[e.cls], Q24.cx(w), 20, { s: 13.5, w: 900, c: '#fff', bg: '#9333ea' });
      // animation angle for diagrams
      let phi = 0; if (e.bars && p.mv) phi = .09 * Math.sin(S.ph * 2.2);
      const P = q => { const dx = q[0] - g.f[0], dy = q[1] - g.f[1]; const c = Math.cos(phi), s = Math.sin(phi); return X(g.f[0] + dx * c - dy * s, g.f[1] + dx * s + dy * c); };
      K.raw(ctx, () => { if (e.bars) { // book-style bar + fulcrum
        const A = P([e.k === 'bar1' ? 0 : 0, 0]); const len = 100 * u; ctx.save(); ctx.translate(...P([0, 0])); ctx.rotate(phi); LV.bar(ctx, (x, y) => [x * u, y * u], 0, 100, 3.2); ctx.restore();
        const F = X(g.f[0], g.f[1] + 1.6); Q24.fulc(ctx, F[0], F[1], u * 4);
        if (p.mv) { [[g.L.p, '#15803d'], [g.Ep, '#dc2626']].forEach(([q, c]) => { const r = Math.hypot(q[0] - g.f[0], q[1] - g.f[1]) * u, C = X(...g.f), a0 = Math.atan2(q[1] - g.f[1], q[0] - g.f[0]); ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.arc(C[0], C[1], r, a0 - .09, a0 + .09); ctx.stroke(); ctx.setLineDash([]); Q24.T(ctx, 'مسافة ' + fmt(2 * .09 * r / u, 3) + ' cm', C[0] + Math.cos(a0) * r, C[1] + Math.sin(a0) * r + 40, { s: 11, w: 800, c: c }); }); }
      } else e.draw(ctx, X, u, g.o, { Ep: X(...g.Ep), L: X(...g.L.p) }); });
      // markers & arrows
      const fp = X(...g.f), lp = P(g.L.p), ep = P(g.Ep);
      if (p.arms !== false) { const fl = LV.foot(g.L.p, g.L.v, g.f), fe = LV.foot(g.Ep, g.Ev, g.f); const off = e.bars ? 9 * u : 0;
        Q24.dim(ctx, ...fp, ...P(fe), p.lab !== false ? 'ذراع القوة ' + fmt(g.aE, 3) + ' cm' : '', '#dc2626', e.bars ? 22 : 26); Q24.dim(ctx, ...fp, ...P(fl), p.lab !== false ? 'ذراع المقاومة ' + fmt(g.aL, 3) + ' cm' : '', '#15803d', e.bars ? -22 : -26); }
      K.raw(ctx, () => { ctx.fillStyle = '#fde047'; ctx.strokeStyle = '#111827'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(fp[0], fp[1], 6, 0, TAU); ctx.fill(); ctx.stroke(); });
      if (p.vec !== false) { const sc = Math.min(90, Math.max(40, h * .1)); const kF = sc / Math.max(g.F, e.W), lenE = clamp(g.F * kF, 22, 80), lenL = clamp(e.W * kF, 22, 80);
        const arr = (pt, v, len, lab, col) => { if (v[1] > 0 || (v[1] === 0 && v[0] > 0)) Q24.F(ctx, pt[0] - v[0] * len, pt[1] - v[1] * len, v[0] * (len - 4), v[1] * (len - 4), '', col, 4.5); else Q24.F(ctx, pt[0], pt[1], v[0] * len, v[1] * len, '', col, 4.5);
          if (p.lab !== false) { const tip = v[1] > 0 ? [pt[0] - v[0] * len, pt[1] - v[1] * len] : [pt[0] + v[0] * len, pt[1] + v[1] * len]; Q24.T(ctx, lab, tip[0], tip[1] + (tip[1] < pt[1] ? -12 : 14), { s: 12, w: 900, c: '#fff', bg: col }); } };
        arr(ep, g.Ev, lenE, 'القوة ' + fmt(g.F, 3) + ' N', '#dc2626'); arr(lp, g.L.show || g.L.v, lenL, 'المقاومة ' + fmt(e.W, 3) + ' N', '#15803d'); }
      if (p.lab !== false) Q24.T(ctx, 'المرتكز', fp[0], fp[1] + (e.k === 'balance' ? -18 : 22) + (e.bars ? 14 : 0), { s: 11.5, w: 900, c: '#fff', bg: '#111827' });
      // schematic + result card
      const gain = g.MA > 1.02 ? 'ربح قوة' : g.MA < .98 ? 'ربح سرعة' : 'لا نحصل على شيء', gc = g.MA > 1.02 ? '#0f766e' : g.MA < .98 ? '#b45309' : '#64748b';
      const cy = L.sch ? h * .70 : h * .86;
      if (L.sch) D.schem(ctx, S, g, 80, h * .69, Math.min(w * .5, 420), h * .16);
      const cw = Math.min(310, L.sch ? w - Math.min(w * .5, 420) - 110 : w * .5); const cx = w - 14;
      Q24.lines(ctx, [{ t: 'F × ' + fmt(g.aE, 3) + ' = ' + fmt(e.W, 3) + ' × ' + fmt(g.aL, 3), c: '#7c3aed', mono: 1 }, { t: 'القوة F = ' + fmt(g.F, 3) + ' N', c: '#dc2626', w: 900 }, { t: 'M.A = ' + fmt(e.W, 3) + ' ÷ ' + fmt(g.F, 3) + ' = ' + fmt(g.MA, 3), c: '#1e293b', mono: 1 }, { t: gain, c: gc, w: 900 }], cx, L.sch ? h * .67 : 128, cw, { title: 'قانون العتلات', bd: '#9333ea' });
    },
    schem(ctx, S, g, x0, y0, wd, ht) {
      const e = g.e, c = e.cls; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(ctx, x0 - 6, y0 - 10, wd + 12, ht + 26, 12); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.stroke(); });
      const tot = c === 1 ? g.aL + g.aE : Math.max(g.aL, g.aE); const k = (wd - 40) / tot; const yb = y0 + ht * .55;
      const fx = c === 1 ? x0 + 20 + g.aL * k : x0 + 20; const lx = c === 1 ? fx - g.aL * k : fx + g.aL * k, ex = fx + g.aE * k;
      K.raw(ctx, () => { const g2 = ctx.createLinearGradient(0, yb - 4, 0, yb + 4); g2.addColorStop(0, '#3b82f6'); g2.addColorStop(1, '#172554'); ctx.fillStyle = g2; ctx.fillRect(Math.min(lx, ex, fx) - 4, yb - 4, Math.abs(Math.max(lx, ex, fx) - Math.min(lx, ex, fx)) + 8, 8); });
      Q24.fulc(ctx, fx, yb + 4, 9);
      const dn = c === 1; G.arrow(ctx, ex, dn ? yb - 44 : yb - 4, ex, dn ? yb - 6 : yb - 44, '#dc2626', 3.5, 10); G.arrow(ctx, lx, yb - 44, lx, yb - 6, '#15803d', 3.5, 10);
      Q24.T(ctx, 'القوة', ex, yb - 54, { s: 11, w: 900, c: '#dc2626' }); Q24.T(ctx, 'المقاومة', lx, yb - 54, { s: 11, w: 900, c: '#15803d' });
      Q24.T(ctx, 'المرتكز', fx, yb + 26, { s: 10.5, w: 800, c: '#111827' }); Q24.T(ctx, 'مخطط ' + ({ 1: 'النوع الأول', 2: 'النوع الثاني', 3: 'النوع الثالث' })[c], x0 + wd / 2, y0 + ht + 8, { s: 11, w: 900, c: '#6b21a8' });
    },
    tabs(S) { const w = S.W, n = 3, bw = Math.min(150, (w - 100) / 3 - 8); return [3, 2, 1].map((c, i) => ({ x: Q24.cx(w) + (i - 1) * (bw + 8), y: 54, w: bw, h: 34, c, lab: CN[c], on: S.cls === c })); },
    chips(S) { const w = S.W, ks = LV.ORDER[S.cls] || LV.ORDER[1], n = ks.length, bw = Math.min(150, (w - 90) / n - 6); return ks.map((k, i) => ({ x: Q24.cx(w) + ((n - 1) / 2 - i) * (bw + 6), y: 96, w: bw, h: 32, k, lab: LV.E[k].n.replace(/ \(.*\)/, ''), on: S.p.ex === k })); },
    drags(S) {
      if (!S.W) return []; const e = D.ex(S), L = D.lay(S), g = D.G(S), X = L.X, u = L.u, k = S.p.ex; const out = [];
      D.tabs(S).forEach(b => out.push(Q24.btn(S, 'cls' + b.c, b, '', S => { if (S.cls !== b.c) setParam(S, 'ex', LV.ORDER[b.c][0]); }, { tip: 'اختر ' + CN[b.c] })));
      D.chips(S).forEach(b => out.push(Q24.btn(S, 'ex_' + b.k, b, '', S => setParam(S, 'ex', b.k), { tip: LV.E[b.k].n })));
      const along = (seg, x, y) => { const a = seg[0], b = seg[1], dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy; const px = (x - L.ox) / u, py = (y - L.oy) / u; return clamp(((px - a[0]) * dx + (py - a[1]) * dy) / l2, 0, 1); };
      if (k === 'bar1') { const fp = X(...g.f); out.push({ id: 'ful', x: fp[0], y: fp[1] + 4 * u, w: 56, h: 60, axis: 'x', keep: true, tip: 'اسحب المرتكز يميناً أو يساراً', idle: 'حرّك المرتكز ✋', drag: (S, d) => { S.f1T = null; S.f1 = clamp((d.x - L.ox) / u, 10, 90); } }); }
      if (g.eDrag) { const ep = X(...g.Ep), sg = g.eDrag, r0 = e.ed; out.push({ id: 'eff', x: ep[0], y: ep[1], r: 30, dir: Math.atan2(sg[1][1] - sg[0][1], sg[1][0] - sg[0][0]), keep: true, tip: 'اسحب نقطة تأثير القوة (اليد/الإصبع) على المقبض', idle: 'حرّك القوة ✋',
        drag: (S, d) => { const t = along(sg, d.x, d.y); S.ee = r0 ? r0[0] + (r0[1] - r0[0]) * t : 0; S.st[k].e = S.ee; } }); }
      if (g.lDrag) { const lp = X(...g.L.p), sg = g.lDrag, r0 = e.ld; out.push({ id: 'load', x: lp[0], y: lp[1], r: 28, dir: Math.atan2(sg[1][1] - sg[0][1], sg[1][0] - sg[0][0]), keep: true, tip: 'اسحب موضع المقاومة', hint: false,
        drag: (S, d) => { const t = along(sg, d.x, d.y); S.ll = r0[0] + (r0[1] - r0[0]) * t; S.st[k].l = S.ll; } }); }
      return out;
    },
    readings(S) { const g = D.G(S), e = g.e; return [rd('المثال', e.n, 1), rd('نوع العتلة', CN[e.cls]), rd('المقاومة', fmt(e.W, 3) + ' N'), rd('ذراع المقاومة', fmt(g.aL, 3) + ' cm'), rd('ذراع القوة', fmt(g.aE, 3) + ' cm'), rd('القوة اللازمة', fmt(g.F, 3) + ' N'), rd('الفائدة الميكانيكية', fmt(g.MA, 3)), rd('النتيجة', g.MA > 1.02 ? 'ربح قوة' : g.MA < .98 ? 'ربح سرعة' : 'لا ربح', 1)]; },
    record(S) { const g = D.G(S), e = g.e; return { n: e.n.replace(/ \(.*\)/, ''), c: CN[e.cls], dE: +g.aE.toFixed(1), dL: +g.aL.toFixed(1), F: +g.F.toFixed(2), W: e.W, MA: +g.MA.toFixed(2), r: g.MA > 1.02 ? 'ربح قوة' : g.MA < .98 ? 'ربح سرعة' : 'لا شيء' }; },
    cols: [['n', 'العتلة'], ['c', 'النوع'], ['dE', 'ذراع القوة (cm)'], ['dL', 'ذراع المقاومة (cm)'], ['W', 'المقاومة (N)'], ['F', 'القوة (N)'], ['MA', 'M.A'], ['r', 'النتيجة']],
    explain(S) { const g = D.G(S), e = g.e; const base = '<b>' + e.n + '</b> عتلة من <b>' + CN[e.cls] + '</b> (' + CD[e.cls] + '). ';
      if (g.MA > 1.02) return base + 'ذراع القوة (' + fmt(g.aE, 3) + ' cm) أطول من ذراع المقاومة (' + fmt(g.aL, 3) + ' cm)، فالقوة اللازمة <b>أصغر</b> من المقاومة: <b>ربح قوة</b>، M.A = ' + fmt(g.MA, 3) + '.';
      if (g.MA < .98) return base + 'ذراع القوة أقصر من ذراع المقاومة، فالقوة <b>أكبر</b> من المقاومة، لكن طرف المقاومة يتحرك مسافة أكبر وبسرعة أكبر: <b>ربح سرعة</b>، M.A = ' + fmt(g.MA, 3) + '.';
      return base + 'الذراعان متساويان، فالقوة تساوي المقاومة: لا نحصل على ربح قوة ولا ربح سرعة (M.A = 1).'; },
    quiz: [
      { q: 'لماذا تمثل كابسة الورق عتلة من النوع الثالث؟', o: ['لأن المرتكز بين القوة والمقاومة', 'لأن القوة تقع بين المرتكز والمقاومة', 'لأن المقاومة بين المرتكز والقوة'], a: 1, why: 'مراجعة الدرس س1: في الكابسة الإصبع (القوة) بين المفصل (المرتكز) ونقطة خروج الدبوس (المقاومة).' },
      { q: 'ما نوع العتلة التي تكون القوة المؤثرة فيها دائماً أقل من المقاومة؟', o: ['النوع الأول', 'النوع الثاني', 'النوع الثالث'], a: 1, why: 'مراجعة الدرس س3: في النوع الثاني ذراع القوة أطول دائماً، فالفائدة الميكانيكية أكبر من 1.' },
      { q: 'في العتلة من النوع الأول إذا كان المرتكز على بعد متساوٍ من المقاومة والقوة فإن:', o: ['ربح القوة = ربح السرعة = 1', 'ربح القوة = 2', 'ربح السرعة = 2'], a: 0, why: 'التفكير الناقد س1: الذراعان متساويان فالقوة = المقاومة، فلا نحصل على ربح قوة ولا ربح سرعة.' }
    ]
  };
  M8.P[D.id] = D;
})();
/* =========================================================================================
   3) أمثلة محلولة (ص 47–48) + مراجعة الفصل س6: قانون العتلات والفائدة الميكانيكية
   ========================================================================================= */
(() => {
  const EX = {
    m1: { n: 'مثال 1 (ص 47)', L: 50, f: 25, xl: 50, xe: 5, W: 20, txt: 'ساق طوله 50 cm يرتكز في منتصفه على مسند، عُلّق ثقل مقداره 20 N في طرفه. احسب القوة اللازمة لرفعه والتي تؤثر على بعد 20 cm من المرتكز، والفائدة الميكانيكية.' },
    m2: { n: 'مثال 2 (ص 47)', L: 60, f: 0, xl: 20, xe: 60, W: 30, txt: 'ساق منتظمة طولها 60 cm ترتكز على أحد طرفيها، عُلّق على بعد 20 cm من المرتكز ثقل مقداره 30 N. ما مقدار القوة التي تؤثر في الطرف الآخر كي تتزن أفقياً؟ وما الفائدة الميكانيكية؟' },
    m3: { n: 'مثال 3 (ص 48)', L: 100, f: 0, xl: 100, xe: 50, W: 15, txt: 'عتلة مترية مرتكزها في أحد طرفيها، عُلّق ثقل 15 N في طرفها الآخر. ما مقدار القوة المؤثرة في منتصف العتلة كي تتزن أفقياً؟ وما الفائدة الميكانيكية؟' },
    q6: { n: 'س6 مراجعة الفصل (ص 55)', L: 80, f: 0, xl: 20, xe: 80, W: 60, txt: 'عتلة طولها 80 cm ترتكز على أحد طرفيها، عُلّق ثقل 60 N على بعد 20 cm من المرتكز. ما مقدار القوة اللازم تأثيرها في الطرف الآخر لكي تتزن العتلة أفقياً؟ وما الفائدة الميكانيكية؟' }
  };
  const D = { id: 'g8_lever_examples', ch: 24, sec: 'الدرس 1: العتلات', page: 47, kind: 'مثال',
    title: 'أمثلة محلولة: قانون العتلات والفائدة الميكانيكية (مثال 1، 2، 3)',
    desc: 'حلّ أمثلة الكتاب خطوة بخطوة على ساق حقيقية: الثقل (المقاومة) معلّق بخيط، والميزان النابضي يقيس القوة اللازمة لتتزن الساق أفقياً.',
    tags: 'مثال محلول قانون العتلات فائدة ميكانيكية ساق مسند ميزان نابضي ربح قوة ربح سرعة 1m = 100cm',
    tools: ['ساق (عتلة)', 'مسند', 'ثقل', 'ميزان نابضي'],
    steps: ['اختر المثال من الأزرار في الأعلى (مثال 1، 2، 3 أو س6 من مراجعة الفصل).', 'اقرأ نص المثال ولاحظ مواضع المرتكز والثقل والقوة على الساق.', 'اضغط «الخطوة التالية ▶» لترى الحل: المعطيات (مع تحويل cm إلى m)، القانون، التعويض، القوة، ثم الفائدة الميكانيكية.', 'تحقق من الجواب بقراءة الميزان النابضي.', 'اسحب الثقل أو الميزان على الساق (أو غيّر الثقل) وشاهد كيف يتغير الحل ونوع العتلة.'],
    concl: ['نطبّق قانون العتلات: F₁ × d₁ = F₂ × d₂ ، بعد تحويل الأطوال إلى المتر (1 m = 100 cm).', 'الفائدة الميكانيكية M.A = Load ÷ Force: إذا كانت أكبر من 1 نحصل على ربح قوة، وإذا كانت أصغر من 1 نحصل على ربح سرعة.', 'مثال 1: F = 25 N و M.A = 0.8 (ربح سرعة). مثال 2: F = 10 N و M.A = 3 (ربح قوة). مثال 3: F = 30 N و M.A = 0.5 (ربح سرعة).'],
    laws: ['g8_lever', 'g8_ma'],
    fact: ['نهمل وزن الساق في هذه الأمثلة (أو نعدّ الساق خفيفة جداً)، كما في الكتاب.', 'في مثال 3 العتلة من النوع الثالث: القوة (30 N) ضعف المقاومة (15 N)، لكن طرف العتلة يتحرك ضعف مسافة نقطة تأثير القوة.'],
    controls: [SEL('ex', 'المثال', Object.keys(EX).map(k => [k, EX[k].n]), 'm1', (v, S) => D.load(S)),
      R('W', 'المقاومة (الثقل)', 5, 100, 20, 1, 'N'),
      BT('', [{ t: '▶ الخطوة التالية', on: S => D.next(S) }, { t: '↺ قيم الكتاب', on: S => D.load(S) }]),
      TG('arms', 'ذراع القوة وذراع المقاومة', true, null, 'vector'), TG('vec', 'أسهم القوة والمقاومة', true, null, 'force'), TG('txt', 'نص المثال', true, null, 'labels')],
    setup(S) { D.load(S); },
    load(S) { const e = EX[S.p.ex] || EX.m1; S.xl = e.xl; S.xe = e.xe; S.step = 0; setParam(S, 'W', e.W, false); },
    next(S) { S.step = (S.step || 0) >= 5 ? 0 : (S.step || 0) + 1; },
    ex(S) { return EX[S.p.ex] || EX.m1; },
    calc(S) { const e = D.ex(S); const dL = Math.abs(S.xl - e.f), dE = Math.abs(S.xe - e.f); const F = S.p.W * dL / Math.max(dE, .01); const same = Math.sign(S.xl - e.f) === Math.sign(S.xe - e.f);
      const cls = !same ? 1 : dL < dE ? 2 : 3; return { dL, dE, F, MA: S.p.W / F, cls, up: same }; },
    geo(S) { const w = S.W, h = S.H, e = D.ex(S); const x0 = 110, x1 = w - 100, k = (x1 - x0) / e.L; const ry = h * .45; return { w, h, x0, x1, k, ry, by: h * .86, X: c => x0 + c * k }; },
    draw(ctx, w, h, S) {
      const p = S.p, e = D.ex(S), g = D.geo(S), c = D.calc(S), F = c.F; K.bg(ctx, w, h, { benchY: g.by });
      D.tabs(S).forEach(b => C2.btn(ctx, b.x, b.y, b.w, b.h, b.lab, { col: b.on ? '#9333ea' : '#94a3b8', s: 12.5, on: b.on }));
      if (p.txt !== false) { const lines = D.wrap(ctx, e.txt, Math.min(w - 110, 640)); K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.93)'; rr(ctx, Q24.cx(w) - Math.min(w - 110, 660) / 2, 70, Math.min(w - 110, 660), lines.length * 20 + 14, 10); ctx.fill(); ctx.strokeStyle = '#c4b5fd'; ctx.lineWidth = 1.5; ctx.stroke(); }); lines.forEach((l, i) => Q24.T(ctx, l, Q24.cx(w), 87 + i * 20, { s: 13, w: 700, c: '#3b0764' })); }
      // support
      const fx = g.X(e.f);
      if (e.f > 0 && e.f < e.L) { K.raw(ctx, () => { const gr = ctx.createLinearGradient(fx - 30, 0, fx + 30, 0); gr.addColorStop(0, '#57534e'); gr.addColorStop(.5, '#a8a29e'); gr.addColorStop(1, '#44403c'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(fx, g.ry + 8); ctx.lineTo(fx - 34, g.by); ctx.lineTo(fx + 34, g.by); ctx.closePath(); ctx.fill(); }); }
      else { K.raw(ctx, () => { const px = fx - (e.f === 0 ? 14 : -14); const gr = ctx.createLinearGradient(px - 12, 0, px + 12, 0); gr.addColorStop(0, '#78716c'); gr.addColorStop(.5, '#d6d3d1'); gr.addColorStop(1, '#57534e'); ctx.fillStyle = gr; ctx.fillRect(px - 10, g.ry - 50, 20, g.by - g.ry + 50); ctx.fillStyle = '#44403c'; ctx.fillRect(px - 40, g.by - 10, 80, 12); ctx.fillStyle = '#94a3b8'; rr(ctx, Math.min(px, fx) - 6, g.ry - 10, Math.abs(fx - px) + 12, 20, 4); ctx.fill(); }); }
      // rod (wood)
      Q24.wood(ctx, g.X(0) - 4, g.ry - 7, e.L * g.k + 8, 14, { r: 4 });
      K.raw(ctx, () => { ctx.fillStyle = '#422006'; ctx.font = '700 9px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; const st = e.L <= 60 ? 5 : 10; for (let q = 0; q <= e.L; q += st) { const x = g.X(q); ctx.fillRect(x - .5, g.ry - 7, 1, 5); if (q % (st * 2) === 0) ctx.fillText(q, x, g.ry + 4.5); } });
      K.raw(ctx, () => { ctx.fillStyle = '#e5e7eb'; ctx.strokeStyle = '#111827'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(fx, g.ry, 6, 0, TAU); ctx.fill(); ctx.stroke(); });
      // load
      const lx = g.X(S.xl); K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(lx, g.ry + 9, 5, Math.PI, TAU * .99); ctx.stroke(); ctx.strokeStyle = '#e7e5e4'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(lx, g.ry + 9); ctx.lineTo(lx, g.ry + 50); ctx.stroke(); });
      const bh = clamp(18 + p.W * .5, 22, 56); Q24.block(ctx, lx, g.ry + 46, bh * 1.05, bh, p.W + ' N');
      // effort through a spring balance
      const Fm = F <= 10 ? 10 : F <= 20 ? 20 : F <= 50 ? 50 : 100, L = clamp(h * .12, 80, 104), pxN = (L - 44) / Fm; const ex = g.X(S.xe);
      if (c.up) { const top = g.ry - 8 - (L + 26 + Math.min(F, Fm * 1.05) * pxN); Q24.sb(ctx, ex, top, L, F, Fm, { rx: 44 }); C2.hand(ctx, ex + 3, top - 6, 1, 1, { rot: Math.PI / 2, sleeve: '#0ea5e9' }); }
      else { Q24.sb(ctx, ex, g.ry + 10, L, F, Fm, { rx: -44 }); const ht = g.ry + 10 + L + 26 + Math.min(F, Fm * 1.05) * pxN; C2.hand(ctx, ex + 4, ht + 4, 1, 1, { rot: -Math.PI / 2, sleeve: '#0ea5e9' }); }
      if (p.arms !== false) { const side = (x2, o) => (c.up ? 1 : -1) * (x2 > fx ? o : -o); Q24.dim(ctx, fx, g.ry, ex, g.ry, 'ذراع القوة d₁ = ' + fmt(c.dE, 3) + ' cm', '#dc2626', side(ex, 30)); Q24.dim(ctx, fx, g.ry, lx, g.ry, 'ذراع المقاومة d₂ = ' + fmt(c.dL, 3) + ' cm', '#15803d', side(lx, c.up ? 62 : 62)); }
      if (p.vec !== false) { Q24.F(ctx, lx + 34, g.ry + 4, 0, 52, '', '#15803d', 4); Q24.T(ctx, 'F₂ = ' + p.W + ' N', lx + 34, g.ry + 74, { s: 12, w: 900, c: '#fff', bg: '#15803d' });
        if (c.up) Q24.F(ctx, ex - 30, g.ry - 6, 0, -52, '', '#dc2626', 4); else Q24.F(ctx, ex + 30, g.ry + 6, 0, 52, '', '#dc2626', 4); Q24.T(ctx, 'F₁ = ?', ex + (c.up ? -30 : 30) + (c.up ? -28 : 28), c.up ? g.ry - 40 : g.ry + 40, { s: 12, w: 900, c: '#fff', bg: '#dc2626' }); }
      Q24.T(ctx, 'المرتكز', fx, g.ry + (e.f > 0 && e.f < e.L ? 58 : -64), { s: 11.5, w: 900, c: '#fff', bg: '#111827' });
      D.solution(ctx, S, g, c);
      const nb = D.nbtn(S); C2.btn(ctx, nb.x, nb.y, nb.w, nb.h, (S.step || 0) >= 5 ? '↺ من جديد' : '▶ الخطوة التالية', { col: '#16a34a', s: 13 });
      K.party(ctx, S);
    },
    wrap(ctx, s, wd) { ctx.font = '700 13px Tajawal,sans-serif'; const words = s.split(' '), out = []; let cur = ''; words.forEach(wo => { const t = cur ? cur + ' ' + wo : wo; if (ctx.measureText(t).width > wd - 24 && cur) { out.push(cur); cur = wo; } else cur = t; }); if (cur) out.push(cur); return out; },
    solution(ctx, S, g, c) {
      const p = S.p, st = S.step || 0, m = v => +(v / 100).toFixed(3); const L = [];
      const Fs = (+c.F.toFixed(3)), MAs = +c.MA.toFixed(3);
      L.push({ t: 'المعطيات: F₂ = ' + p.W + ' N ، d₂ = ' + fmt(c.dL, 3) + ' cm = ' + m(c.dL) + ' m ، d₁ = ' + fmt(c.dE, 3) + ' cm = ' + m(c.dE) + ' m', c: '#1e293b' });
      if (st >= 1) L.push({ t: 'القانون: F₁ × d₁ = F₂ × d₂', c: '#7c3aed', w: 900 });
      if (st >= 2) L.push({ t: 'التعويض: F₁ × ' + m(c.dE) + ' = ' + p.W + ' × ' + m(c.dL), c: '#1e293b', mono: 1 });
      if (st >= 3) L.push({ t: 'F₁ = ' + Fs + ' N', c: '#dc2626', w: 900, mono: 1 });
      if (st >= 4) L.push({ t: 'M.A = Load ÷ Force = ' + p.W + ' ÷ ' + Fs + ' = ' + MAs, c: '#1e293b', mono: 1 });
      if (st >= 5) L.push({ t: (c.MA > 1.001 ? 'نحصل على ربح قوة' : c.MA < .999 ? 'نحصل على ربح سرعة' : 'لا نحصل على ربح') + ' — عتلة من النوع ' + ['', 'الأول', 'الثاني', 'الثالث'][c.cls], c: c.MA > 1.001 ? '#0f766e' : '#b45309', w: 900 });
      const wd = Math.min(g.w - 120, 540); Q24.lines(ctx, L, g.w - 14, g.by - 8 - (L.length * 21 + 34), wd, { title: 'الحل خطوة بخطوة (' + st + '/5)', bd: '#16a34a' });
      if (st === 5 && !S._ch) { S._ch = 1; K.cheer(S, Q24.cx(g.w), g.by - 120); } if (st < 5) S._ch = 0;
    },
    tabs(S) { const w = S.W, ks = Object.keys(EX), n = ks.length, bw = Math.min(160, (w - 90) / n - 6); return ks.map((k, i) => ({ x: Q24.cx(w) + ((n - 1) / 2 - i) * (bw + 6), y: 44, w: bw, h: 34, k, lab: EX[k].n.replace(/ \(.*\)/, ''), on: S.p.ex === k })); },
    nbtn(S) { return { x: S.W - 100, y: S.H * .86 + 36, w: 150, h: 36 }; },
    drags(S) {
      if (!S.W) return []; const g = D.geo(S), e = D.ex(S), c = D.calc(S), out = [];
      D.tabs(S).forEach(b => out.push(Q24.btn(S, 't_' + b.k, b, '', S => setParam(S, 'ex', b.k), { tip: EX[b.k].n })));
      out.push(Q24.btn(S, 'next', D.nbtn(S), '', S => D.next(S), { tip: 'اعرض الخطوة التالية من الحل', idle: 'الحل ▶', hint: true }));
      const snap = x => clamp(Math.round((x - g.x0) / g.k / (e.L <= 60 ? 1 : 2)) * (e.L <= 60 ? 1 : 2), 0, e.L);
      out.push({ id: 'load', x: g.X(S.xl), y: g.ry + 60, w: 60, h: 80, axis: 'x', keep: true, tip: 'اسحب الثقل على الساق', hint: false, drag: (S, d) => { let v = snap(d.x); if (Math.abs(v - e.f) < 2) v = e.f + (v >= e.f ? 2 : -2); S.xl = clamp(v, 0, e.L); S.step = Math.min(S.step || 0, 5); } });
      const ey = c.up ? g.ry - 90 : g.ry + 90; out.push({ id: 'eff', x: g.X(S.xe), y: ey, w: 60, h: 110, axis: 'x', keep: true, tip: 'اسحب الميزان النابضي (نقطة تأثير القوة) على الساق', idle: 'حرّك القوة ✋', drag: (S, d) => { let v = snap(d.x); if (Math.abs(v - e.f) < 2) v = e.f + (v >= e.f ? 2 : -2); S.xe = clamp(v, 0, e.L); } });
      return out;
    },
    readings(S) { const c = D.calc(S); return [rd('المقاومة F₂', S.p.W + ' N'), rd('ذراع المقاومة d₂', fmt(c.dL, 3) + ' cm'), rd('ذراع القوة d₁', fmt(c.dE, 3) + ' cm'), rd('القوة F₁', fmt(c.F, 4) + ' N'), rd('الفائدة الميكانيكية', fmt(c.MA, 3)), rd('نوع العتلة', ['', 'الأول', 'الثاني', 'الثالث'][c.cls])]; },
    record(S) { const c = D.calc(S); return { ex: D.ex(S).n.replace(/ \(.*\)/, ''), W: S.p.W, dL: +c.dL.toFixed(1), dE: +c.dE.toFixed(1), F: +c.F.toFixed(2), MA: +c.MA.toFixed(2), r: c.MA > 1.001 ? 'ربح قوة' : c.MA < .999 ? 'ربح سرعة' : '—' }; },
    cols: [['ex', 'المثال'], ['W', 'F₂ (N)'], ['dL', 'd₂ (cm)'], ['dE', 'd₁ (cm)'], ['F', 'F₁ (N)'], ['MA', 'M.A'], ['r', 'النتيجة']],
    explain(S) { const c = D.calc(S); return 'من قانون العتلات: <b>F₁ = F₂ × d₂ ÷ d₁ = ' + S.p.W + ' × ' + fmt(c.dL, 3) + ' ÷ ' + fmt(c.dE, 3) + ' = ' + fmt(c.F, 4) + ' N</b>. الفائدة الميكانيكية <b>' + fmt(c.MA, 3) + '</b> ⟸ ' + (c.MA > 1.001 ? 'ربح قوة (ذراع القوة أطول).' : c.MA < .999 ? 'ربح سرعة (ذراع القوة أقصر).' : 'لا ربح.'); },
    quiz: [
      { q: 'عتلة طولها 80 cm ترتكز على أحد طرفيها، عُلّق فيها ثقل 60 N على بعد 20 cm من المرتكز. القوة اللازمة في الطرف الآخر لتتزن أفقياً:', o: ['15 N', '240 N', '30 N'], a: 0, why: 'س6: F × 0.8 = 60 × 0.2 ⟸ F = 15 N ، والفائدة الميكانيكية = 60 ÷ 15 = 4.' },
      { q: 'ما وحدة قياس الفائدة الميكانيكية؟', o: ['N', 'N·m', 'ليس لها وحدة'], a: 2, why: 'مراجعة الفصل س3: لأنها نسبة بين قوتين (المقاومة ÷ القوة) فتختصر الوحدات.' },
      { q: 'ماذا نعني إن الفائدة الميكانيكية أصغر من 1؟', o: ['ربح قوة', 'ربح سرعة', 'لا ربح'], a: 1, why: 'مراجعة الدرس س5: القوة أكبر من المقاومة، فنحصل على ربح سرعة.' }
    ]
  };
  M8.P[D.id] = D;
})();
/* =========================================================================================
   4) نشاط (ص 48): أنواع العتلات — صنّف العتلات حسب أنواعها وسجّلها في جدول
   ========================================================================================= */
(() => {
  const TOOLS = [['nut', 'كسارة الجوز'], ['scissors', 'مقص'], ['stapler', 'كابسة ورق'], ['opener', 'مفتاح قناني زجاجية'], ['tongs', 'ملقط'], ['hammer', 'قالعة مسامير'], ['clipper', 'مقراض الأظافر']];
  const CN = ['', 'النوع الأول', 'النوع الثاني', 'النوع الثالث'], CD = ['', 'المرتكز في الوسط', 'المقاومة في الوسط', 'القوة في الوسط'];
  const WHY = { 1: 'المرتكز يقع بين القوة والمقاومة', 2: 'المقاومة تقع بين المرتكز والقوة', 3: 'القوة تقع بين المرتكز والمقاومة' };
  const D = { id: 'g8_lever_sort', ch: 24, sec: 'الدرس 1: العتلات', page: 48, kind: 'نشاط',
    title: 'نشاط: أنواع العتلات (صنّف العتلات في جدول)',
    desc: 'أحضر عتلات من حياتك اليومية: كسارة الجوز، مقص، كابسة ورق، مفتاح قناني زجاجية، ملقط، قالعة مسامير، مقراض الأظافر. صنّفها حسب أنواعها في جدول، وبيّن أيّها نحصل منها على ربح قوة وأيّها على ربح سرعة.',
    tags: 'نشاط أنواع العتلات تصنيف جدول كسارة الجوز مقص كابسة ورق مفتاح قناني ملقط قالعة مسامير مقراض الأظافر ربح قوة ربح سرعة',
    tools: ['كسارة الجوز', 'مقص', 'كابسة ورق', 'مفتاح قناني زجاجية', 'ملقط', 'قالعة مسامير', 'مقراض الأظافر'],
    steps: ['انظر إلى كل أداة: أين المرتكز (النقطة الصفراء)؟ أين تؤثر القوة (السهم الأحمر)؟ وأين المقاومة (السهم الأخضر)؟', 'اسحب كل أداة وأفلتها في عمود نوعها في الجدول (الأول، الثاني، الثالث).', 'إذا أخطأت تعود الأداة إلى مكانها مع تلميح — حاول مرة أخرى.', 'بعد التصنيف يظهر في الجدول هل نحصل منها على ربح قوة أم ربح سرعة.', 'سجّل الجدول (📋) وأجب: أي العتلات تحصل منها على ربح قوة وأيها على ربح سرعة؟'],
    concl: ['النوع الأول (المرتكز في الوسط): المقص، قالعة المسامير.', 'النوع الثاني (المقاومة في الوسط): كسارة الجوز، مفتاح القناني، مقراض الأظافر — ربح قوة.', 'النوع الثالث (القوة في الوسط): كابسة الورق، الملقط — ربح سرعة.'],
    laws: ['g8_gain', 'g8_ma'],
    fact: ['في مقراض الأظافر عتلتان: المقبض الذي نضغطه عتلة من النوع الثاني، وفكّا القطع يعملان كعتلة من النوع الثالث.', 'المقص الذي له مقابض طويلة وشفرات قصيرة (مقص قص المعادن) يعطي ربح قوة كبيراً، أما مقص الشعر ذو الشفرات الطويلة فيعطي ربح سرعة.'],
    controls: [BT('', [{ t: '↺ ابدأ من جديد', on: S => D.reset(S) }, { t: '💡 ساعدني', on: S => D.help(S) }]), TG('mk', 'إظهار المرتكز والقوة والمقاومة على الأدوات', true, null, 'force'), TG('gain', 'إظهار ربح القوة/السرعة في الجدول', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.pl = {}; S.hold = ''; S.nOk = 0; S.moves = 0; S.err = 0; S.done = 0; },
    help(S) { const t = TOOLS.find(q => !S.pl[q[0]]); if (!t) return; C2.msg(S, LV.E[t[0]].n.replace(/ \(.*\)/, '') + ': ' + WHY[LV.E[t[0]].cls], 3.5); },
    geo(S) { const w = S.W, h = S.H, x0 = 74, x1 = w - 16, cw = Math.min(170, (x1 - x0) / 4 - 10), ch = cw * .72, ty = 52; const cols = [1, 2, 3].map((c, i) => { const cwid = (x1 - x0 - 20) / 3; return { c, x: x1 - cwid / 2 - i * (cwid + 10), w: cwid, y: h * .52, h: h * .35 }; }); return { w, h, x0, x1, cw, ch, ty, cols }; },
    slot(g, i) { const r = i < 4 ? 0 : 1, k = r ? i - 4 : i, n = r ? 3 : 4; return [Q24.cx(g.w) + ((n - 1) / 2 - k) * (g.cw + 10), g.ty + g.ch / 2 + 10 + r * (g.ch + 12)]; },
    drawTool(ctx, S, k, x, y, cw, ch, o = {}) {
      const e = LV.E[k], b = e.box; const iw = cw - 10, ih = ch - 24; const u = Math.min(iw / (b[1] - b[0]), ih / (b[3] - b[2])); const ox = x - (b[0] + b[1]) / 2 * u, oy = y - 8 - (b[2] + b[3]) / 2 * u; const X = (a, c) => [ox + a * u, oy + c * u];
      const st = { e: e.e0 ?? 0, l: e.l0 ?? 0 }; const g = e.geo(S, st);
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = o.lift ? 18 : 6; ctx.shadowOffsetY = o.lift ? 8 : 2; ctx.fillStyle = '#fff'; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 10); ctx.fill(); ctx.restore(); ctx.strokeStyle = o.ok ? '#16a34a' : '#c4b5fd'; ctx.lineWidth = 2; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 10); ctx.stroke();
        ctx.save(); rr(ctx, x - cw / 2 + 2, y - ch / 2 + 2, cw - 4, ch - 22, 8); ctx.clip(); e.draw(ctx, X, u, st, { Ep: X(...g.Ep), L: X(...g.L.p) });
        if (S.p.mk !== false) { const f = X(...g.f), le = X(...g.L.p), ef = X(...g.Ep); const ar = (pt, v, c) => { const L = Math.min(26, ch * .25); if (v[1] > 0) G.arrow(ctx, pt[0] - v[0] * L, pt[1] - v[1] * L, pt[0], pt[1], c, 2.5, 7); else G.arrow(ctx, pt[0], pt[1], pt[0] + v[0] * L, pt[1] + v[1] * L, c, 2.5, 7); };
          ar(ef, g.Ev, '#dc2626'); ar(le, g.L.show || g.L.v, '#15803d'); ctx.fillStyle = '#fde047'; ctx.strokeStyle = '#111827'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(f[0], f[1], 4.5, 0, TAU); ctx.fill(); ctx.stroke(); }
        ctx.restore(); });
      Q24.T(ctx, o.name, x, y + ch / 2 - 10, { s: 12, w: 900, c: '#3b0764' });
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: h * .97 });
      Q24.banner(ctx, w, 'اسحب كل أداة إلى عمود نوعها في الجدول', '#9333ea', 20);
      // table
      const hd = S.hold ? D.colAt(g, S.hx, S.hy) : 0;
      g.cols.forEach(cl => { K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, cl.x - cl.w / 2, cl.y, cl.w, cl.h, 12); ctx.fill(); ctx.strokeStyle = '#9333ea'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#9333ea'; rr(ctx, cl.x - cl.w / 2, cl.y, cl.w, 46, 12); ctx.fill(); ctx.fillRect(cl.x - cl.w / 2, cl.y + 30, cl.w, 16); });
        Q24.T(ctx, CN[cl.c], cl.x, cl.y + 15, { s: 14, w: 900, c: '#fff' }); Q24.T(ctx, CD[cl.c], cl.x, cl.y + 35, { s: 11.5, w: 700, c: '#f3e8ff' });
        if (S.hold) C1.zone(ctx, cl.x, cl.y + cl.h / 2, cl.w - 6, cl.h - 6, hd === cl.c, false);
        let r = 0; TOOLS.forEach(([k, n]) => { if (S.pl[k] !== cl.c) return; const g2 = LV.E[k].geo(S, { e: LV.E[k].e0 ?? 0, l: LV.E[k].l0 ?? 0 }); const aL = LV.arm(g2.L.p, g2.L.v, g2.f), aE = LV.arm(g2.Ep, g2.Ev, g2.f), MA = aE / aL;
          const yy = cl.y + 66 + r * 30; Q24.T(ctx, '✓ ' + n, cl.x + cl.w / 2 - 10, yy, { s: 12.5, w: 900, c: '#15803d', a: 'right' });
          if (p.gain !== false) Q24.T(ctx, MA > 1.02 ? 'ربح قوة' : 'ربح سرعة', cl.x - cl.w / 2 + 10, yy, { s: 11.5, w: 900, c: '#fff', bg: MA > 1.02 ? '#0f766e' : '#b45309', a: 'left' }); r++; }); });
      // cards
      TOOLS.forEach(([k, n], i) => { if (S.pl[k] || S.hold === k) return; const [x, y] = D.cardPos(S, g, k, i); D.drawTool(ctx, S, k, x, y, g.cw, g.ch, { name: n }); });
      if (S.hold) { const i = TOOLS.findIndex(q => q[0] === S.hold); D.drawTool(ctx, S, S.hold, S.hx, S.hy, g.cw, g.ch, { name: TOOLS[i][1], lift: 1 }); }
      if (S.nOk === TOOLS.length) Q24.T(ctx, 'أحسنت! صنّفت جميع العتلات ✓ (أخطاء: ' + S.err + ')', Q24.cx(w), g.cols[0].y - 20, { s: 14, w: 900, c: '#fff', bg: '#15803d' });
      C2.drawMsg(ctx, S, Q24.cx(w), g.cols[0].y - 30);
      K.party(ctx, S);
    },
    cardPos(S, g, k, i) { const o = D._an || (D._an = {}); const q = o[k] || (o[k] = {}); const [tx, ty] = D.slot(g, i); return C1.ease(q, tx, ty); },
    colAt(g, x, y) { const c = g.cols.find(cl => Math.abs(x - cl.x) <= cl.w / 2 && y >= cl.y - 40 && y <= cl.y + cl.h); return c ? c.c : 0; },
    drags(S) {
      if (!S.W) return []; const g = D.geo(S); const out = [];
      TOOLS.forEach(([k, n], i) => { if (S.pl[k]) return; const [x, y] = S.hold === k ? [S.hx, S.hy] : D.slot(g, i);
        out.push({ id: 'tool_' + k, x, y, w: g.cw, h: g.ch, axis: 'xy', keep: true, tip: 'اسحب «' + n + '» إلى عمود نوعها', idle: i === 0 ? 'اسحبني إلى الجدول ✋' : undefined, hint: i === 0,
          down: (S, px, py) => { S.hold = k; S.hx = x; S.hy = y; S.dx0 = px - x; S.dy0 = py - y; }, drag: (S, d) => { S.hx = d.x - S.dx0; S.hy = d.y - S.dy0; },
          up: S => { const c = D.colAt(g, S.hx, S.hy); S.moves++; const e = LV.E[k];
            if (c) { if (c === e.cls) { S.pl[k] = c; S.nOk++; if (window.Sound) Sound.ok && Sound.ok(); if (S.nOk === TOOLS.length) K.cheer(S, Q24.cx(g.w), g.cols[0].y); }
              else { S.err++; C2.msg(S, 'ليس ' + CN[c] + '!\n' + n + ': ' + WHY[e.cls], 3.2); const q = (D._an || {})[k]; if (q) { q._ax = S.hx; q._ay = S.hy; } } }
            else { const q = (D._an || {})[k]; if (q) { q._ax = S.hx; q._ay = S.hy; } }
            S.hold = ''; } }); });
      return out;
    },
    readings(S) { return [rd('عدد العتلات المصنّفة', S.nOk + ' / ' + TOOLS.length), rd('عدد الأخطاء', S.err), rd('النوع الأول', TOOLS.filter(t => S.pl[t[0]] === 1).map(t => t[1]).join('، ') || '—', 1), rd('النوع الثاني', TOOLS.filter(t => S.pl[t[0]] === 2).map(t => t[1]).join('، ') || '—', 1), rd('النوع الثالث', TOOLS.filter(t => S.pl[t[0]] === 3).map(t => t[1]).join('، ') || '—', 1)]; },
    record(S) { if (S.nOk < TOOLS.length) { Runner.toast('صنّف جميع الأدوات أولاً', 'info'); return null; } const f = c => TOOLS.filter(t => S.pl[t[0]] === c).map(t => t[1]).join('، '); return { a: f(1), b: f(2), c: f(3), e: S.err }; },
    cols: [['a', 'النوع الأول'], ['b', 'النوع الثاني (ربح قوة)'], ['c', 'النوع الثالث (ربح سرعة)'], ['e', 'الأخطاء']],
    explain(S) { if (S.nOk === TOOLS.length) return 'صنّفت جميع العتلات! <b>النوع الثاني</b> يعطي دائماً <b>ربح قوة</b>، و<b>النوع الثالث</b> يعطي دائماً <b>ربح سرعة</b>، أما <b>النوع الأول</b> فقد يعطي ربح قوة أو ربح سرعة حسب موضع المرتكز.'; return 'لتعرف نوع العتلة اسأل: <b>ما الذي يقع في الوسط؟</b> المرتكز ⟸ النوع الأول، المقاومة ⟸ النوع الثاني، القوة ⟸ النوع الثالث.'; },
    quiz: [
      { q: 'لماذا نحصل على فائدة ميكانيكية أكبر من واحد في العتلة من النوع الثاني؟', o: ['لأن ذراع القوة أطول من ذراع المقاومة دائماً', 'لأن القوة أكبر من المقاومة', 'لأن المرتكز في الوسط'], a: 0, why: 'مراجعة الدرس س2: المقاومة بين المرتكز والقوة، فذراع القوة أطول دائماً.' },
      { q: 'لماذا نحصل على ربح سرعة في العتلة من النوع الثالث؟', o: ['لأن ذراع القوة أصغر من ذراع المقاومة', 'لأن ذراع القوة أكبر من ذراع المقاومة', 'لأن الذراعين متساويان'], a: 0, why: 'مراجعة الفصل س3-6 وس2-4: القوة بين المرتكز والمقاومة فذراعها أقصر.' },
      { q: 'نحصل على ربح قوة في العتلة من النوع الثاني، لأن ذراع القوة:', o: ['أكبر من ذراع المقاومة', 'أصغر من ذراع المقاومة', 'مساوٍ لذراع المقاومة'], a: 0, why: 'مراجعة الفصل س2-4.' }
    ]
  };
  M8.P[D.id] = D;
})();
/* =========================================================================================
   5) الدرس 2 (ص 49): السطح المائل — الفائدة الميكانيكية M.A = L/h ، مثال 1
   ========================================================================================= */
(() => {
  const SC = { worker: { n: 'العامل والمنحدر (صورة الكتاب)', W: 500, L: 4, h: 1, Lr: [2, 5.5], hr: [.4, 1.4] }, lab: { n: 'قياس بالميزان النابضي', W: 5, L: 1, h: .25, Lr: [1, 1], hr: [.05, .8] }, ex1: { n: 'مثال 1: منحدر 20 m', W: 1000, L: 20, h: 2, Lr: [5, 25], hr: [1, 5] } };
  const D = { id: 'g8_incline', ch: 24, sec: 'الدرس 2: السطح المائل', page: 49, kind: 'نشاط',
    title: 'السطح المائل: القوة اللازمة والفائدة الميكانيكية (مثال 1)',
    desc: 'رفع الجسم رأسياً يحتاج قوة تساوي وزنه، أما سحبه على سطح مائل فيحتاج قوة أصغر من وزنه (المقاومة). الفائدة الميكانيكية للسطح المائل M.A = L ÷ h تزداد كلما ازدادت نسبة طول السطح إلى ارتفاعه.',
    tags: 'سطح مائل منحدر فائدة ميكانيكية طول ارتفاع L/h عامل عربة يد ميزان نابضي عربة مثال 20m 2m',
    tools: ['منحدر (سطح مائل)', 'عربة', 'ميزان نابضي', 'مسطرة'],
    steps: ['المشهد الأول مثل صورة الكتاب: عامل يدفع عربة يد عليها صناديق على منحدر.', 'اسحب العربة (أو العامل) على المنحدر إلى الأعلى ولاحظ القوة اللازمة F، وقارنها بالقوة اللازمة لرفع الصناديق رأسياً (وزنها).', 'اسحب أعلى المنحدر للأعلى أو للأسفل لتغيير الارتفاع h، واسحب أسفله لتغيير الطول L. كيف تتغير القوة؟', 'في مشهد «قياس بالميزان النابضي» اسحب العربة على اللوح بالميزان وسجّل قراءته لارتفاعات مختلفة.', 'في مشهد «مثال 1» احسب الفائدة الميكانيكية لمنحدر طوله 20 m وارتفاعه 2 m.', 'سجّل النتائج (📋) وقارن M.A = W ÷ F مع النسبة L ÷ h.'],
    concl: ['القوة اللازمة لسحب الجسم على السطح المائل أقل من وزنه، لذا يسهّل السطح المائل إنجاز الشغل.', 'الفائدة الميكانيكية = المقاومة ÷ القوة = طول السطح المائل ÷ ارتفاعه (M.A = L/h).', 'كلما ازدادت نسبة طول السطح إلى ارتفاعه (منحدر أقل ميلاً) قلّت القوة اللازمة وازدادت الفائدة الميكانيكية.', 'مثال 1: M.A = 20 ÷ 2 = 10.'],
    laws: ['g8_incl', 'g8_ma'],
    fact: ['الطرق الجبلية تُبنى متعرجة (طويلة) لتقليل ميلها، فتحتاج السيارات قوة أقل لصعودها.', 'لا يقلل السطح المائل الشغل: القوة الصغيرة × الطول الكبير = الوزن × الارتفاع (بإهمال الاحتكاك).'],
    controls: [SEL('sc', 'المشهد', Object.keys(SC).map(k => [k, SC[k].n]), 'worker', (v, S) => D.reset(S, 1)),
      R('L', 'طول السطح المائل L', 1, 25, 4, .1, 'm'), R('h', 'ارتفاع السطح المائل h', .05, 5, 1, .05, 'm'),
      BT('', [{ t: '⬆ اسحب إلى الأعلى', on: S => { S.auto = 1; } }, { t: '↺ إلى الأسفل', on: S => { S.pos = 0; S.auto = 0; S.done = 0; } }]),
      TG('vec', 'أسهم القوى (F و W)', true, null, 'force'), TG('dim', 'أبعاد السطح L و h', true, null, 'vector'), TG('vert', 'المقارنة بالرفع الرأسي', true, null, 'swap'), TG('fr', 'احتكاك العجلات (واقعي)', false, null, 'heat')],
    setup(S) { S.rows = S.rows || []; D.reset(S, 1); },
    reset(S, full) { const c = SC[S.p.sc] || SC.worker; if (full) { setParam(S, 'L', c.L, false); setParam(S, 'h', c.h, false); } S.pos = 0; S.auto = 0; S.done = 0; },
    sc(S) { return SC[S.p.sc] || SC.worker; },
    Lh(S) { const c = D.sc(S); const L = clamp(S.p.L, c.Lr[0], c.Lr[1]), h = clamp(S.p.h, c.hr[0], Math.min(c.hr[1], L * .9)); return [L, h]; },
    F(S) { const c = D.sc(S), [L, h] = D.Lh(S), W = c.W, sn = h / L, cs = Math.sqrt(1 - sn * sn); return W * sn + (S.p.fr ? .03 * W * cs : 0); },
    geo(S) { const w = S.W, hh = S.H, [L, h] = D.Lh(S), b = Math.sqrt(L * L - h * h), sc = S.p.sc; const gy = hh * (sc === 'lab' ? .78 : .8); const xr = w - (sc === 'ex1' ? 70 : sc === 'lab' ? 150 : 110), avail = xr - 120;
      const c = D.sc(S), bmax = Math.sqrt(c.Lr[1] ** 2 - c.hr[0] ** 2); const s = Math.min(avail / Math.max(bmax, 1), hh * .42 / c.hr[1]);
      const xb = xr, xa = xb - b * s, top = gy - h * s; return { w, hh, gy, s, xa, xb, top, ang: Math.atan2(h, b), L, h }; },
    update(S, dt) { if (S.auto) { const [L] = D.Lh(S); S.pos = Math.min(1, S.pos + dt * .9 / Math.max(L, 1) * (S.p.sc === 'ex1' ? 3 : 1)); if (S.pos >= 1) S.auto = 0; } if (S.pos >= .98 && !S.done) { S.done = 1; C2.msg(S, 'وصلت إلى الأعلى ✓ سجّل القراءة 📋', 2.2); } },
    at(g, t) { return [g.xa + (g.xb - g.xa) * t, g.gy + (g.top - g.gy) * t]; },
    draw(ctx, w, h, S) {
      const p = S.p, c = D.sc(S), g = D.geo(S), F = D.F(S), W = c.W, MA = W / F;
      if (p.sc === 'lab') K.bg(ctx, w, h, { benchY: g.gy }); else D.wall(ctx, w, h, g.gy);
      const ux = Math.cos(g.ang), uy = -Math.sin(g.ang);
      // platform / ramp
      K.raw(ctx, () => {
        if (p.sc !== 'lab') { const pg = ctx.createLinearGradient(0, g.top, 0, g.gy); pg.addColorStop(0, '#a8a29e'); pg.addColorStop(1, '#78716c'); ctx.fillStyle = pg; ctx.fillRect(g.xb, g.top, w - g.xb, g.gy - g.top); ctx.fillStyle = '#57534e'; ctx.fillRect(g.xb, g.top, w - g.xb, 5);
          const rg = ctx.createLinearGradient(0, g.top, 0, g.gy); rg.addColorStop(0, '#94a3b8'); rg.addColorStop(1, '#475569'); ctx.fillStyle = rg; ctx.beginPath(); ctx.moveTo(g.xa, g.gy); ctx.lineTo(g.xb, g.top); ctx.lineTo(g.xb, g.top + 9); ctx.lineTo(g.xa + 12, g.gy); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1; for (let t = .04; t < 1; t += .045) { const a = D.at(g, t); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + 3, a[1] + 8); ctx.stroke(); }
          ctx.fillStyle = 'rgba(16,185,129,.15)'; ctx.beginPath(); ctx.moveTo(g.xa, g.gy); ctx.lineTo(g.xb, g.top); ctx.lineTo(g.xb, g.gy); ctx.closePath(); ctx.fill(); }
        else { // lab: stand + clamp + wooden board
          ctx.fillStyle = '#334155'; ctx.fillRect(g.xb + 26, g.gy - g.hh * .45, 8, g.hh * .45); ctx.fillStyle = '#1f2937'; ctx.fillRect(g.xb - 10, g.gy - 8, 80, 8);
          ctx.fillStyle = '#64748b'; rr(ctx, g.xb + 14, g.top - 10, 32, 18, 4); ctx.fill(); ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.arc(g.xb + 46, g.top - 1, 5, 0, TAU); ctx.fill();
          ctx.save(); ctx.translate(g.xa, g.gy); ctx.rotate(-g.ang); Q24.wood(ctx, 0, -10, g.L * g.s + 14, 10, { r: 2 }); ctx.restore(); }
      });
      // dimensions
      if (p.dim !== false) { Q24.dim(ctx, g.xa, g.gy, g.xb, g.top, 'L = ' + fmt(g.L, 3) + ' m', '#7c3aed', p.sc === 'lab' ? 24 : 26); Q24.dim(ctx, g.xb + (p.sc === 'lab' ? -6 : 18), g.gy, g.xb + (p.sc === 'lab' ? -6 : 18), g.top, 'h = ' + fmt(g.h, 3) + ' m', '#0369a1', p.sc === 'lab' ? 34 : -6); }
      // load
      const P = D.at(g, .08 + S.pos * .8), a = -g.ang; let hand;
      if (p.sc === 'lab') hand = D.trolley(ctx, S, g, P, a, F); else hand = D.dolly(ctx, S, g, P, a, F);
      if (p.vec !== false) { const k = 70 / W; Q24.F(ctx, P[0], P[1] - 30, 0, W * k, 'W = ' + fmt(W, 4) + ' N', '#15803d', 4); Q24.F(ctx, P[0] + ux * 30, P[1] + uy * 30 - 30, ux * Math.max(18, F * k), uy * Math.max(18, F * k), 'F = ' + fmt(F, 3) + ' N', '#dc2626', 4.5); }
      if (p.vert !== false && p.sc !== 'ex1') { const vx = g.xa - 40, vy = g.gy; if (vx > 90) { Q24.F(ctx, vx, vy - 10, 0, -70, '', '#f97316', 4); Q24.T(ctx, 'رفع رأسي: F = W = ' + fmt(W, 4) + ' N', Math.max(200, vx), vy - 96, { s: 11.5, w: 900, c: '#fff', bg: '#f97316' }); } }
      // banner + card
      Q24.banner(ctx, w, p.sc === 'ex1' ? 'مثال 1: منحدر طوله 20 m وارتفاعه 2 m ، ما الفائدة الميكانيكية؟' : 'اسحب العربة على السطح المائل إلى الأعلى ✋', '#9333ea', 20);
      const L1 = [{ t: 'M.A = Load ÷ Force = ' + fmt(W, 4) + ' ÷ ' + fmt(F, 3) + ' = ' + fmt(MA, 3), c: '#1e293b', mono: 1 }, { t: 'M.A = L ÷ h = ' + fmt(g.L, 3) + ' ÷ ' + fmt(g.h, 3) + ' = ' + fmt(g.L / g.h, 3), c: '#7c3aed', mono: 1 }];
      if (p.sc === 'ex1') L1.push({ t: 'الفائدة الميكانيكية = 20 ÷ 2 = 10', c: '#15803d', w: 900 });
      L1.push({ t: 'الشغل: F × L = ' + fmt(F * g.L, 4) + ' J ، W × h = ' + fmt(W * g.h, 4) + ' J', c: '#b45309', s: 12 });
      Q24.lines(ctx, L1, w - 14, 44, Math.min(370, w * .5), { title: 'الفائدة الميكانيكية للسطح المائل', bd: '#9333ea' });
      C2.drawMsg(ctx, S, Q24.cx(w), g.gy - g.hh * .38);
      K.party(ctx, S);
    },
    wall(ctx, w, h, gy) { G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#c2410c'; ctx.fillRect(0, 0, w, gy); ctx.strokeStyle = 'rgba(254,215,170,.6)'; ctx.lineWidth = 2; const bh = 18, bw = 46; for (let y = 0, r = 0; y < gy; y += bh, r++) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); for (let x = (r % 2) * bw / 2; x < w; x += bw) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + bh); ctx.stroke(); } }
      const sh = ctx.createLinearGradient(0, 0, 0, gy); sh.addColorStop(0, 'rgba(255,255,255,.25)'); sh.addColorStop(1, 'rgba(0,0,0,.12)'); ctx.fillStyle = sh; ctx.fillRect(0, 0, w, gy);
      const fg = ctx.createLinearGradient(0, gy, 0, h); fg.addColorStop(0, '#9ca3af'); fg.addColorStop(1, '#6b7280'); ctx.fillStyle = fg; ctx.fillRect(0, gy, w, h - gy); }); },
    /* hand truck (dolly) with boxes + worker pushing; P = contact point on ramp, a = ramp angle */
    dolly(ctx, S, g, P, a, F) {
      const s = S.p.sc === 'ex1' ? clamp(g.s * .9, 14, 40) : clamp(g.s * .9, 26, 60), ux = Math.cos(a), uy = Math.sin(a), nx = Math.sin(a), ny = -Math.cos(a);
      const Q = (al, up) => [P[0] + ux * al * s + nx * up * s, P[1] + uy * al * s + ny * up * s];
      K.raw(ctx, () => { const tilt = a - .45; ctx.save(); const wc = Q(0, .14); ctx.translate(wc[0], wc[1]); ctx.rotate(tilt);
        // boxes on the nose plate
        [[0, .05], [.02, .5]].forEach(([dx, dy], i) => { const bx = (-.05 + dx) * s, by = (-.42 - dy) * s; const gg = ctx.createLinearGradient(bx, by, bx + .5 * s, by + .45 * s); gg.addColorStop(0, '#e7c08f'); gg.addColorStop(1, '#b7834a'); ctx.fillStyle = gg; ctx.fillRect(bx, by, .5 * s, .44 * s); ctx.strokeStyle = '#7c4a1e'; ctx.lineWidth = 1; ctx.strokeRect(bx, by, .5 * s, .44 * s); ctx.fillStyle = '#d6a76c'; ctx.fillRect(bx + .2 * s, by, .1 * s, .44 * s); ctx.fillStyle = '#dc2626'; ctx.font = `900 ${Math.max(8, .14 * s)}px sans-serif`; ctx.fillText('↑↑', bx + .06 * s, by + .2 * s); });
        ctx.strokeStyle = '#1f2937'; ctx.lineWidth = Math.max(2, .045 * s); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-.1 * s, -.02 * s); ctx.lineTo(-.1 * s, -1.25 * s); ctx.lineTo(-.28 * s, -1.38 * s); ctx.moveTo(-.1 * s, .02 * s); ctx.lineTo(.5 * s, .02 * s); ctx.stroke(); ctx.lineCap = 'butt';
        ctx.restore();
        ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(wc[0], wc[1], .14 * s, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(wc[0], wc[1], .06 * s, 0, TAU); ctx.fill(); });
      const tilt = a - .45, hx = Q(0, .14)[0] + (Math.cos(tilt) * -.28 - Math.sin(tilt) * -1.38) * s, hy = Q(0, .14)[1] + (Math.sin(tilt) * -.28 + Math.cos(tilt) * -1.38) * s;
      // worker behind (downhill), leaning into the push
      const H = 1.75 * s, f1 = Q(-.75, 0), f2 = Q(-1.15, 0); const hip = [f1[0] - .18 * s + ux * .0, Math.min(f1[1], f2[1]) - .86 * s], nk = [hip[0] + .38 * s, hip[1] - .5 * s];
      if (S.p.sc !== 'ex1' || true) Q24.person(ctx, { H, f: 1, hip, neck: nk, hands: [[hx - 3, hy + 2], [hx, hy]], feet: [f2, f1], shirt: '#a16207', pants: '#1e3a8a' });
      return [hx, hy];
    },
    trolley(ctx, S, g, P, a, F) {
      const s = g.s, ux = Math.cos(a), uy = Math.sin(a), nx = Math.sin(a), ny = -Math.cos(a), L = .16 * s;
      const Q = (al, up) => [P[0] + ux * al + nx * up, P[1] + uy * al + ny * up];
      K.raw(ctx, () => { ctx.save(); const c = Q(0, 0); ctx.translate(c[0], c[1]); ctx.rotate(a); const gg = ctx.createLinearGradient(0, -24, 0, -8); gg.addColorStop(0, '#60a5fa'); gg.addColorStop(1, '#1d4ed8'); ctx.fillStyle = gg; rr(ctx, -L / 2, -26, L, 16, 3); ctx.fill();
        ctx.fillStyle = '#ea580c'; for (let k = 0; k < 3; k++) { rr(ctx, -L * .25, -36 - k * 7 + 7, L * .5, 6, 2); ctx.fill(); }
        ctx.fillStyle = '#111827'; [-L * .32, L * .32].forEach(x => { ctx.beginPath(); ctx.arc(x, -6, 6, 0, TAU); ctx.fill(); }); ctx.fillStyle = '#9ca3af'; [-L * .32, L * .32].forEach(x => { ctx.beginPath(); ctx.arc(x, -6, 2.2, 0, TAU); ctx.fill(); }); ctx.restore(); });
      // spring balance along the board, pulled by the hand
      const sb0 = Q(L / 2 + 6, 17), len = 110, pxN = (len - 44) / 5, e = clamp(F, 0, 5.2) * pxN;
      K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(...Q(L / 2 - 2, 17)); ctx.lineTo(sb0[0], sb0[1]); ctx.stroke(); });
      const tip = [sb0[0] + ux * (len + 26 + e), sb0[1] + uy * (len + 26 + e)];
      ctx.save(); ctx.translate(tip[0], tip[1]); ctx.rotate(Math.atan2(ux, -uy)); Q24.sb(ctx, 0, 0, len, F, 5, { read: false }); ctx.restore();
      C2.hand(ctx, tip[0] + ux * 4, tip[1] + uy * 4, 1, 1, { rot: Math.atan2(-uy, -ux), sleeve: '#0ea5e9' });
      Q24.T(ctx, 'قراءة الميزان: ' + fmt(F, 3) + ' N', tip[0] - 40, tip[1] - 44, { s: 12.5, w: 900, c: '#fff', bg: '#b91c1c' });
      return tip;
    },
    drags(S) {
      if (!S.W) return []; const g = D.geo(S), c = D.sc(S); const P = D.at(g, .08 + S.pos * .8); const out = [];
      out.push({ id: 'load', x: P[0], y: P[1] - 30, r: 46, dir: -g.ang, keep: true, tip: 'اسحب العربة على السطح المائل', idle: 'اسحب إلى الأعلى ✋',
        down: S => { S.auto = 0; S.p0 = S.pos; }, drag: (S, d) => { const L = Math.hypot(g.xb - g.xa, g.gy - g.top) * .8; S.pos = clamp(S.p0 + ((d.x - d.sx) * Math.cos(g.ang) - (d.y - d.sy) * Math.sin(g.ang)) / L, 0, 1); if (S.pos < .95) S.done = 0; } });
      if (c.hr[1] > c.hr[0]) out.push({ id: 'top', x: g.xb + (S.p.sc === 'lab' ? 30 : 8), y: g.top, r: 26, axis: 'y', keep: true, tip: 'اسحب لأعلى/لأسفل لتغيير ارتفاع السطح h', hint: false,
        down: S => { S.h0 = S.p.h; }, drag: (S, d) => { const [L] = D.Lh(S); setParam(S, 'h', clamp(S.h0 - (d.y - d.sy) / g.s, c.hr[0], Math.min(c.hr[1], L * .9))); S.done = 0; } });
      if (c.Lr[1] > c.Lr[0]) out.push({ id: 'foot', x: g.xa, y: g.gy - 4, r: 26, axis: 'x', keep: true, tip: 'اسحب أسفل المنحدر لتغيير طوله L', hint: false,
        down: S => { S.b0 = Math.sqrt(D.Lh(S)[0] ** 2 - D.Lh(S)[1] ** 2); }, drag: (S, d) => { const b = Math.max(.2, S.b0 - (d.x - d.sx) / g.s), h = D.Lh(S)[1]; setParam(S, 'L', clamp(Math.sqrt(b * b + h * h), c.Lr[0], c.Lr[1])); S.done = 0; } });
      return out;
    },
    readings(S) { const c = D.sc(S), [L, h] = D.Lh(S), F = D.F(S); return [rd('وزن الجسم (المقاومة) W', fmt(c.W, 4) + ' N'), rd('طول السطح L', fmt(L, 3) + ' m'), rd('الارتفاع h', fmt(h, 3) + ' m'), rd('القوة اللازمة F', fmt(F, 4) + ' N'), rd('M.A = W ÷ F', fmt(c.W / F, 3)), rd('L ÷ h', fmt(L / h, 3)), rd('زاوية الميل', fmt(Math.asin(h / L) * 180 / Math.PI, 3) + '°')]; },
    record(S) { if (!S.done) { Runner.toast('اسحب العربة إلى أعلى السطح أولاً', 'info'); return null; } const c = D.sc(S), [L, h] = D.Lh(S), F = D.F(S); S.done = 0; S.pos = 0; return { sc: c.n.replace(/ \(.*\)/, ''), W: c.W, L: +L.toFixed(2), h: +h.toFixed(2), F: +F.toFixed(2), MA: +(c.W / F).toFixed(2), r: +(L / h).toFixed(2) }; },
    cols: [['sc', 'المشهد'], ['W', 'W (N)'], ['L', 'L (m)'], ['h', 'h (m)'], ['F', 'F (N)'], ['MA', 'M.A = W/F'], ['r', 'L/h']],
    graph: { x: 'r', y: 'MA', xl: 'نسبة الطول إلى الارتفاع L/h', yl: 'الفائدة الميكانيكية M.A', theory: x => x, xmin: 0, xmax: 22 },
    explain(S) { const c = D.sc(S), [L, h] = D.Lh(S), F = D.F(S); return 'لرفع الجسم رأسياً نحتاج قوة <b>' + fmt(c.W, 4) + ' N</b> (وزنه)، أما على السطح المائل فنحتاج <b>' + fmt(F, 4) + ' N</b> فقط. الفائدة الميكانيكية <b>M.A = L/h = ' + fmt(L / h, 3) + '</b>' + (S.p.fr ? ' (مع الاحتكاك تقل قليلاً: ' + fmt(c.W / F, 3) + ')' : '') + '. السطح الأطول (الأقل ميلاً) يحتاج قوة أقل لكن مسافة أكبر.'; },
    quiz: [
      { q: 'منحدر طوله 20 m وارتفاعه 2 m. الفائدة الميكانيكية للمنحدر:', o: ['40', '10', '0.1'], a: 1, why: 'مثال 1: M.A = L/h = 20/2 = 10.' },
      { q: 'سطح مائل طوله 20 m وارتفاعه 4 m. فائدته الميكانيكية:', o: ['5', '80', '16'], a: 0, why: 'مراجعة الفصل س5 (2): M.A = 20 ÷ 4 = 5.' },
      { q: 'يسهّل السطح المائل إنجاز الشغل لأنه:', o: ['يقلل مقدار الشغل', 'يمكننا من تحريك مقاومة كبيرة باستعمال قوة صغيرة', 'يزيد وزن الجسم'], a: 1, why: 'مراجعة الدرس س2-أ ومراجعة الفصل س1-6.' }
    ]
  };
  M8.P[D.id] = D;
})();
/* =========================================================================================
   6) الدرس 2 (ص 50): البريمة والأسفين — شكل 2 (البريمة) وشكل 3 (الأسفين)
   ========================================================================================= */
(() => {
  const D = { id: 'g8_screw_wedge', ch: 24, sec: 'الدرس 2: البريمة والأسفين', page: 50, kind: 'نشاط',
    title: 'البريمة والأسفين: سطوح مائلة في أدوات حياتنا',
    desc: 'البريمة (اللولب) سطح مائل ملفوف حول أسطوانة، والمسافة بين لفتين متتاليتين تسمّى درجة البريمة. الأسفين (الوتد) سطحان مائلان متقابلان يُستعمل لشق الخشب وفصل الأجسام، ويعتمد ربح القوة فيه على نسبة طوله إلى سمكه.',
    tags: 'بريمة لولب برغي مسمار محوري درجة البريمة سطح مائل ملفوف أسفين وتد فأس سكين شق الخشب طول سمك',
    tools: ['ورقة على شكل مثلث قائم', 'قلم (أسطوانة)', 'برغي ومفك', 'قطعة خشب', 'أسفين ومطرقة'],
    steps: ['مشهد «البريمة سطح مائل ملفوف»: اسحب المقبض (أو المنزلق) لتلفّ ورقة على شكل سطح مائل حول القلم، ولاحظ كيف يصبح وترها خطاً حلزونياً (سنّ البريمة).', 'مشهد «البريمة (شكل 2)»: أدر مقبض المفك بالسحب يميناً ويساراً ليدخل البرغي في الخشب. كل دورة كاملة يتقدم البرغي مسافة تساوي درجة البريمة.', 'غيّر درجة البريمة: كلما قلّت (لفات متقاربة) احتجت دورات أكثر لكن بقوة أقل — الفائدة الميكانيكية أكبر.', 'مشهد «الأسفين (شكل 3)»: اضغط المطرقة لتطرق الأسفين في الخشب. لاحظ القوتين الجانبيتين (الحمراوين) اللتين تشقّان الخشب.', 'غيّر طول الأسفين وسمكه: الأسفين الأطول والأرقّ يحتاج قوة أقل (عدد طرقات أقل). جرّب «السكين الحادة والكليلة».'],
    concl: ['البريمة سطح مائل ملفوف حول أسطوانة، وتعمل على تغيير اتجاه القوة المبذولة.', 'درجة البريمة: البعد بين لفتين متتاليتين. كلما كان السطح الملفوف أطول من ارتفاعه (درجة أصغر) كانت الفائدة الميكانيكية أكبر.', 'الأسفين سطحان مائلان متقابلان، يحوّل القوة النازلة إلى قوتين جانبيتين كبيرتين تفصلان الجسم.', 'كلما كان الأسفين أرقّ وأطول احتجنا قوة أقل للتغلب على المقاومة؛ لذلك تقطع الفؤوس والسكاكين أفضل كلما كانت حافتها أرقّ.'],
    laws: ['g8_wedge', 'g8_incl'],
    fact: ['رأس المسمار المدبب أسفين صغير يجعل دخوله في الخشب أسهل (ص 50).', 'غطاء قنينة الماء ومقعد الكرسي الدوّار وملزمة النجار كلها تعمل بالبريمة.'],
    controls: [SEL('sc', 'المشهد', [['wrap', '📄 البريمة سطح مائل ملفوف'], ['screw', '🔩 البريمة (شكل 2)'], ['wedge', '🪓 الأسفين (شكل 3)'], ['knife', '🔪 السكين: حادة وكليلة']], 'wrap', (v, S) => D.reset(S)),
      R('wrap', 'لفّ الورقة حول القلم', 0, 1, 0, .01, ''), R('pitch', 'درجة البريمة', 1, 5, 2.5, .5, 'mm'),
      R('wl', 'طول الأسفين', 6, 20, 12, 1, 'cm'), R('wt', 'سمك الأسفين', 1, 6, 3, .5, 'cm'), R('edge', 'سمك حافة السكين', .1, 2, .2, .1, 'mm'),
      BT('', [{ t: '🔨 اطرق / اضغط', on: S => D.hit(S) }, { t: '↺ من جديد', on: S => D.reset(S) }]),
      TG('vec', 'أسهم القوى', true, null, 'force'), TG('dim', 'الأبعاد والتسميات', true, null, 'vector'), TG('cut', 'مقطع داخل الخشب', true, null, 'eye')],
    setup(S) { D.reset(S); },
    reset(S) { S.turn = 0; S.depth = 0; S.hits = 0; S.split = 0; S.swing = 0; S.cut = 0; S.kd = 0; S.press = 0; },
    hit(S) { const p = S.p; if (p.sc === 'wrap') { setParam(S, 'wrap', p.wrap > .5 ? 0 : 1); return; } if (p.sc === 'screw') { S.auto = 2 * Math.PI * 3; return; } if (S.swing > 0) return; S.swing = 1; },
    update(S, dt) {
      const p = S.p;
      if (p.sc === 'screw' && S.auto > 0) { const d = Math.min(S.auto, dt * 6); S.auto -= d; S.turn += d; }
      if (p.sc === 'screw') S.depth = Math.min(30, S.turn / (2 * Math.PI) * p.pitch);
      if ((p.sc === 'wedge' || p.sc === 'knife') && S.swing > 0) { S.swing -= dt * 3.2; if (S.swing <= 0) { S.swing = 0; D.impact(S); } }
    },
    impact(S) { const p = S.p; S.hits++; if (Sound && Sound.click) Sound.click();
      if (p.sc === 'wedge') { const MA = p.wl / p.wt; S.depth = Math.min(p.wl * .95, S.depth + .45 * MA); if (!S.split && S.depth >= Math.min(p.wl * .6, 8)) { S.split = 1; C2.msg(S, 'انشقّ الخشب بعد ' + S.hits + ' طرقات ✓', 2.5); K.cheer(S, Q24.cx(S.W), S.H * .5); } }
      else { const need = 4 + 22 * p.edge; S.kd = Math.min(1, S.kd + 1 / Math.max(1, need / 5)); if (S.kd >= 1 && !S.cut) { S.cut = 1; C2.msg(S, 'قُطعت الجزرة بعد ' + S.hits + ' ضغطات ✓', 2.5); } } },
    draw(ctx, w, h, S) { const sc = S.p.sc; K.bg(ctx, w, h, { benchY: h * .84 }); if (sc === 'wrap') D.dWrap(ctx, w, h, S); else if (sc === 'screw') D.dScrew(ctx, w, h, S); else D.dWedge(ctx, w, h, S); C2.drawMsg(ctx, S, Q24.cx(w), h * .3); K.party(ctx, S); },
    /* ---- paper triangle wrapped around a pencil ---- */
    wg(S) { const w = S.W, h = S.H, r = clamp(w * .035, 18, 30), H = h * .46, turns = 4, Lb = turns * TAU * r, cx = 70 + (w - 70) * .3, yb = h * .74; const k = Math.min(1, (w - cx - r - 40) / Lb); return { w, h, r, H, turns, Lb, cx, yb, k }; },
    dWrap(ctx, w, h, S) {
      const g = D.wg(S), f = S.p.wrap, Lw = f * g.Lb; const yAt = s => g.yb - g.H * s / g.Lb;
      Q24.banner(ctx, w, 'لفّ الورقة (المثلث القائم = سطح مائل) حول القلم ✋', '#9333ea', 20);
      // pencil
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(g.cx - g.r, 0, g.cx + g.r, 0); gg.addColorStop(0, '#b45309'); gg.addColorStop(.45, '#fde047'); gg.addColorStop(1, '#a16207'); ctx.fillStyle = gg; ctx.fillRect(g.cx - g.r, g.yb - g.H - 50, 2 * g.r, g.H + 60);
        ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.moveTo(g.cx - g.r, g.yb + 10); ctx.lineTo(g.cx + g.r, g.yb + 10); ctx.lineTo(g.cx, g.yb + 46); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.moveTo(g.cx - 6, g.yb + 37); ctx.lineTo(g.cx + 6, g.yb + 37); ctx.lineTo(g.cx, g.yb + 46); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#f472b6'; ctx.fillRect(g.cx - g.r, g.yb - g.H - 72, 2 * g.r, 22); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(g.cx - g.r, g.yb - g.H - 52, 2 * g.r, 6); });
      // wrapped part: back (dashed) then paper band then front helix
      const pts = (a0, a1, front) => { const P = []; for (let s = a0; s <= a1; s += 2) { const th = s / g.r; const c = Math.cos(th); if ((c > 0) !== front) { if (P.length) { D._seg(ctx, P, front); P.length = 0; } continue; } P.push([g.cx - g.r * Math.sin(th) * -1, yAt(s)]); } if (P.length) D._seg(ctx, P, front); };
      K.raw(ctx, () => { if (Lw > 1) { ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(g.cx - g.r, yAt(Lw), 2 * g.r, g.yb - yAt(Lw)); } pts(0, Lw, false); pts(0, Lw, true); });
      // flat part: from the tangent point to the right
      const x0 = g.cx + g.r; K.raw(ctx, () => { if (Lw < g.Lb - 1) { const xs = s => x0 + (s - Lw) * g.k; ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x0, g.yb); ctx.lineTo(xs(g.Lb), g.yb); ctx.lineTo(xs(g.Lb), yAt(g.Lb)); ctx.lineTo(x0, yAt(Lw)); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, yAt(Lw)); ctx.lineTo(xs(g.Lb), yAt(g.Lb)); ctx.stroke();
        if (S.p.dim !== false) { Q24.T(ctx, 'السطح المائل (وتر المثلث)', (x0 + xs(g.Lb)) / 2 - 30, (yAt(Lw) + yAt(g.Lb)) / 2 - 24, { s: 12, w: 900, c: '#dc2626', bg: 'rgba(255,255,255,.85)' }); Q24.dim(ctx, xs(g.Lb) + 18, g.yb, xs(g.Lb) + 18, yAt(g.Lb), 'الارتفاع', '#0369a1', 0); } } });
      if (S.p.dim !== false && f > .3) { const s1 = Lw - TAU * g.r * (Math.floor(Lw / (TAU * g.r)) > 1 ? 1 : 0); const yA = yAt(TAU * g.r * Math.max(0, Math.floor(Lw / (TAU * g.r)) - 1)), yB = yAt(TAU * g.r * Math.max(1, Math.floor(Lw / (TAU * g.r))));
        if (Lw >= TAU * g.r) { Q24.dim(ctx, g.cx - g.r - 16, yA, g.cx - g.r - 16, yB, 'درجة البريمة', '#7c3aed', 0); } }
      Q24.lines(ctx, [{ t: 'نسبة اللفّ: ' + Math.round(f * 100) + '%', c: '#1e293b', w: 900 }, { t: 'الوتر الأحمر يلتف حول القلم على شكل خط حلزوني', c: '#dc2626' }, { t: 'هذا هو سنّ البريمة (اللولب)!', c: '#7c3aed', w: 900 }], w - 14, 44, Math.min(320, w * .44), { title: 'البريمة = سطح مائل ملفوف', bd: '#9333ea' });
      const sl = D.slider(S); K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, sl.x0, sl.y - 5, sl.x1 - sl.x0, 10, 5); ctx.fill(); ctx.fillStyle = '#a855f7'; rr(ctx, sl.x0, sl.y - 5, (sl.x1 - sl.x0) * f, 10, 5); ctx.fill(); });
      K.ball(ctx, sl.x0 + (sl.x1 - sl.x0) * f, sl.y, 14, '#9333ea'); Q24.T(ctx, 'اسحب لتلفّ الورقة', (sl.x0 + sl.x1) / 2, sl.y + 26, { s: 12, w: 800, c: '#6b21a8' });
    },
    _seg(ctx, P, front) { ctx.strokeStyle = front ? '#dc2626' : 'rgba(220,38,38,.45)'; ctx.lineWidth = front ? 4 : 2.5; ctx.setLineDash(front ? [] : [6, 5]); ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]); },
    slider(S) { const w = S.W, h = S.H; return { x0: 110, x1: Math.min(w - 120, 520), y: h * .9 }; },
    /* ---- screw + screwdriver into wood (book fig 2) ---- */
    sg(S) { const w = S.W, h = S.H, cx = 70 + (w - 70) * .36, wy = h * .6, ppm = h * .26 / 40, rs = 3.2 * ppm, Ls = 40; return { w, h, cx, wy, ppm, rs, Ls, bl: h * .1, hl: h * .11 }; },
    dScrew(ctx, w, h, S) {
      const g = D.sg(S), p = S.p, pp = p.pitch * g.ppm, dep = S.depth * g.ppm; const tipY = g.wy + 2 + dep, headY = tipY - g.Ls * g.ppm;
      Q24.banner(ctx, w, 'أدر مقبض المفك (اسحبه يميناً ويساراً) ليدخل البرغي في الخشب ✋', '#9333ea', 20);
      // wood block with cut-away
      Q24.wood(ctx, g.cx - 150, g.wy, 300, h * .84 - g.wy, { c1: '#e7b47a', c2: '#b7793f', r: 4 });
      if (p.cut !== false) K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,237,213,.55)'; ctx.fillRect(g.cx - g.rs * 1.6, g.wy, g.rs * 3.2, h * .84 - g.wy); ctx.strokeStyle = 'rgba(146,64,14,.4)'; ctx.setLineDash([4, 4]); ctx.strokeRect(g.cx - g.rs * 1.6, g.wy, g.rs * 3.2, h * .84 - g.wy); ctx.setLineDash([]); });
      // screw: shank + thread (phase from rotation)
      const ph = ((S.turn / TAU) % 1 + 1) % 1;
      const drawScrew = () => K.raw(ctx, () => {
        const gr = ctx.createLinearGradient(g.cx - g.rs, 0, g.cx + g.rs, 0); gr.addColorStop(0, '#64748b'); gr.addColorStop(.45, '#f1f5f9'); gr.addColorStop(1, '#475569');
        ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(g.cx - g.rs * .62, headY + 8); ctx.lineTo(g.cx - g.rs * .62, tipY - g.rs * 1.6); ctx.lineTo(g.cx, tipY); ctx.lineTo(g.cx + g.rs * .62, tipY - g.rs * 1.6); ctx.lineTo(g.cx + g.rs * .62, headY + 8); ctx.closePath(); ctx.fill();
        // thread crests: zig-zag outline + slanted crest lines
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.4; ctx.fillStyle = gr;
        for (let y = headY + g.rs * 2.2 + (1 - ph) * pp; y < tipY - 4; y += pp) { const taper = clamp((tipY - y) / (g.rs * 1.8), 0, 1); const R = g.rs * (.62 + .38 * taper);
          ctx.beginPath(); ctx.moveTo(g.cx - R, y); ctx.lineTo(g.cx - g.rs * .62 * taper, y - pp * .45); ctx.lineTo(g.cx + g.rs * .62 * taper, y + pp * .05); ctx.lineTo(g.cx + R, y + pp * .5); ctx.lineTo(g.cx + g.rs * .62 * taper, y + pp * .5 + 2); ctx.lineTo(g.cx - g.rs * .62 * taper, y + 2); ctx.closePath(); ctx.fill(); ctx.stroke(); }
        // countersunk head with slot
        const hg = ctx.createLinearGradient(g.cx - g.rs * 2, 0, g.cx + g.rs * 2, 0); hg.addColorStop(0, '#64748b'); hg.addColorStop(.5, '#e2e8f0'); hg.addColorStop(1, '#475569'); ctx.fillStyle = hg;
        ctx.beginPath(); ctx.moveTo(g.cx - g.rs * 2, headY); ctx.lineTo(g.cx + g.rs * 2, headY); ctx.lineTo(g.cx + g.rs * .62, headY + 10); ctx.lineTo(g.cx - g.rs * .62, headY + 10); ctx.closePath(); ctx.fill(); ctx.stroke();
      });
      drawScrew();
      if (p.cut === false) Q24.wood(ctx, g.cx - g.rs * 1.6, g.wy + 1, g.rs * 3.2, Math.max(0, Math.min(tipY, h * .84) - g.wy), { r: 0 });
      // screwdriver
      const bladeTop = headY - g.bl; K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; ctx.fillRect(g.cx - 4, bladeTop, 8, headY - bladeTop - 1); ctx.fillStyle = '#475569'; ctx.fillRect(g.cx - 5, headY - 6, 10, 6);
        const hw = 36, hh = g.hl, ht = bladeTop - hh; const hg = ctx.createLinearGradient(g.cx - hw / 2, 0, g.cx + hw / 2, 0); hg.addColorStop(0, '#7f1d1d'); hg.addColorStop(.4, '#ef4444'); hg.addColorStop(1, '#7f1d1d'); ctx.fillStyle = hg; rr(ctx, g.cx - hw / 2, ht, hw, hh, 12); ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 2; for (let k = 0; k < 6; k++) { const x = g.cx + Math.sin(S.turn + k * Math.PI / 3) * hw * .42; if (Math.cos(S.turn + k * Math.PI / 3) > 0) { ctx.beginPath(); ctx.moveTo(x, ht + 10); ctx.lineTo(x, ht + hh - 10); ctx.stroke(); } }
        ctx.fillStyle = '#111827'; rr(ctx, g.cx - hw / 2 - 2, bladeTop - 16, hw + 4, 16, 4); ctx.fill(); });
      C2.hand(ctx, g.cx - 14, bladeTop - g.hl * .5, 1, 1.1, { sleeve: '#0ea5e9' });
      if (p.vec !== false) { const a = S.turn % TAU; G.arrow(ctx, g.cx + 30, bladeTop - g.hl * .75, g.cx + 110, bladeTop - g.hl * .75, '#dc2626', 3.5, 11); Q24.T(ctx, 'قوة صغيرة تُدير المقبض', g.cx + 90, bladeTop - g.hl * .75 - 20, { s: 12, w: 900, c: '#fff', bg: '#dc2626' });
        Q24.F(ctx, g.cx + g.rs * 2 + 20, g.wy + 6, 0, 50, 'يتقدم البرغي', '#15803d', 4); }
      if (p.dim !== false) { const y1 = headY + g.rs * 2.2 + (1 - ph) * pp + pp * 2; Q24.dim(ctx, g.cx - g.rs - 10, y1, g.cx - g.rs - 10, y1 + pp, '', '#7c3aed', 0); Q24.T(ctx, 'درجة البريمة ' + p.pitch + ' mm', g.cx - g.rs - 70, y1 + pp / 2, { s: 11.5, w: 900, c: '#7c3aed', bg: 'rgba(255,255,255,.9)' }); }
      const turns = S.turn / TAU, C = 2 * Math.PI * 3.2; D.tri(ctx, w - 190, h * .5, 150, S);
      Q24.lines(ctx, [{ t: 'عدد الدورات: ' + fmt(turns, 3), c: '#1e293b' }, { t: 'العمق = الدورات × الدرجة = ' + fmt(S.depth, 3) + ' mm', c: '#15803d', w: 900 }, { t: 'طول اللفة ÷ الدرجة = ' + fmt(C, 3) + ' ÷ ' + p.pitch + ' ≈ ' + fmt(C / p.pitch, 3), c: '#7c3aed', mono: 1 }, { t: 'درجة أصغر ⟸ فائدة ميكانيكية أكبر', c: '#b45309', w: 900 }], w - 14, 44, Math.min(330, w * .45), { title: 'البريمة', bd: '#9333ea' });
    },
    tri(ctx, x, y, wd, S) { const p = S.p, C = 2 * Math.PI * 3.2, hh = wd * p.pitch / C * 2.2; K.raw(ctx, () => { ctx.fillStyle = 'rgba(34,197,94,.85)'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + wd, y); ctx.lineTo(x + wd, y - hh); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#14532d'; ctx.lineWidth = 1.5; ctx.stroke(); });
      Q24.T(ctx, 'لفة واحدة مفرودة', x + wd / 2, y + 16, { s: 11, w: 800, c: '#14532d' }); Q24.T(ctx, p.pitch + ' mm', x + wd + 26, y - hh / 2, { s: 11, w: 900, c: '#7c3aed' }); },
    /* ---- wedge into wood (fig 3) or knife ---- */
    dWedge(ctx, w, h, S) {
      const p = S.p, kn = p.sc === 'knife', cx = 70 + (w - 70) * .42, wy = h * .58, by = h * .84, pxc = clamp(h / 34, 14, 24);
      Q24.banner(ctx, w, kn ? 'اضغط السكين على الجزرة: الحادة أم الكليلة أسهل؟ ✋' : 'اضغط المطرقة لتطرق الأسفين في الخشب ✋', '#9333ea', 20);
      if (!kn) {
        const L = p.wl * pxc, T = p.wt * pxc, dep = S.depth * pxc, gap = S.split ? Math.min(T * .6, 26) : clamp(S.depth / p.wl, 0, 1) * T * .25;
        // wood log (two halves separating)
        [-1, 1].forEach(sg => { const x0 = sg < 0 ? cx - 170 - gap / 2 : cx + gap / 2; Q24.wood(ctx, x0, wy, 170, by - wy, { c1: '#deb887', c2: '#a0522d', r: 4 }); });
        K.raw(ctx, () => { if (dep > 2 && !S.split) { ctx.fillStyle = '#3f2a1d'; ctx.beginPath(); ctx.moveTo(cx - gap / 2 - 2, wy); ctx.lineTo(cx, wy + dep + 30); ctx.lineTo(cx + gap / 2 + 2, wy); ctx.closePath(); ctx.fill(); } });
        const tipY = wy + dep, topY = tipY - L; K.raw(ctx, () => { const gg = ctx.createLinearGradient(cx - T / 2, 0, cx + T / 2, 0); gg.addColorStop(0, '#475569'); gg.addColorStop(.5, '#e2e8f0'); gg.addColorStop(1, '#334155'); ctx.fillStyle = gg; ctx.beginPath(); ctx.moveTo(cx - T / 2, topY); ctx.lineTo(cx + T / 2, topY); ctx.lineTo(cx, tipY); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.5; ctx.stroke(); });
        // hammer
        const sw = S.swing, raise = sw > 0 ? Math.sin(sw * Math.PI) * 70 : 0, hy = topY - 4 - raise; K.raw(ctx, () => { ctx.save(); ctx.translate(cx + 120, hy - 12); ctx.rotate(-raise / 300); ctx.fillStyle = '#92400e'; rr(ctx, 0, -6, 170, 12, 5); ctx.fill(); ctx.restore(); const hg = ctx.createLinearGradient(0, hy - 34, 0, hy); hg.addColorStop(0, '#94a3b8'); hg.addColorStop(1, '#334155'); ctx.fillStyle = hg; rr(ctx, cx - 30, hy - 34, 150, 34, 6); ctx.fill(); ctx.fillStyle = '#1e293b'; rr(ctx, cx - 34, hy - 30, 12, 26, 3); ctx.fill(); });
        C2.hand(ctx, cx + 250, hy - 10, -1, 1.1, { sleeve: '#0ea5e9' });
        if (p.vec !== false) { Q24.F(ctx, cx, topY - 120 - raise, 0, 70, 'القوة', '#2563eb', 4.5); if (dep > 1) { const sF = clamp(14 * p.wl / p.wt, 18, 110); Q24.F(ctx, cx - 6, tipY - L * .35, -sF, 0, '', '#dc2626', 4.5); Q24.F(ctx, cx + 6, tipY - L * .35, sF, 0, '', '#dc2626', 4.5); Q24.T(ctx, 'قوتان جانبيتان تشقّان الخشب', cx, tipY - L * .35 + 30, { s: 12, w: 900, c: '#fff', bg: '#dc2626' }); } }
        if (p.dim !== false) { Q24.dim(ctx, cx - T / 2 - 14, topY, cx - T / 2 - 14 - 0, tipY, 'طول الأسفين ' + p.wl + ' cm', '#7c3aed', 0); Q24.dim(ctx, cx - T / 2, topY - 12, cx + T / 2, topY - 12, '', '#0369a1', 0); Q24.T(ctx, 'سمك الأسفين ' + p.wt + ' cm', cx - T / 2 - 70, topY - 14, { s: 11.5, w: 900, c: '#0369a1', bg: 'rgba(255,255,255,.9)' }); }
        Q24.lines(ctx, [{ t: 'ربح القوة يعتمد على: الطول ÷ السمك = ' + p.wl + ' ÷ ' + p.wt + ' = ' + fmt(p.wl / p.wt, 3), c: '#7c3aed', mono: 1 }, { t: 'عدد الطرقات: ' + S.hits, c: '#1e293b' }, { t: S.split ? 'انشقّ الخشب ✓' : 'العمق: ' + fmt(S.depth, 3) + ' cm', c: S.split ? '#15803d' : '#b45309', w: 900 }], w - 14, 44, Math.min(330, w * .45), { title: 'الأسفين (الوتد)', bd: '#9333ea' });
      } else {
        // chopping board + carrot + knife pressed by a hand
        const bx = cx - 170; Q24.wood(ctx, bx, by - 22, 340, 22, { c1: '#f5deb3', c2: '#c8a165' });
        const cr = 30, cyc = by - 22 - cr; const cutD = S.kd * cr * 2; K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, cyc - cr, 0, cyc + cr); gg.addColorStop(0, '#fdba74'); gg.addColorStop(1, '#c2410c'); ctx.fillStyle = gg; const sep = S.cut ? 10 : 0; rr(ctx, bx + 30, cyc - cr, cx - bx - 30 - sep / 2, 2 * cr, cr); ctx.fill(); rr(ctx, cx + sep / 2, cyc - cr, 130, 2 * cr, cr * .6); ctx.fill(); ctx.strokeStyle = 'rgba(124,45,18,.35)'; for (let x = bx + 60; x < cx + 120; x += 26) { ctx.beginPath(); ctx.moveTo(x, cyc - cr + 6); ctx.lineTo(x + 6, cyc - cr + 12); ctx.stroke(); } });
        const press = S.swing > 0 ? Math.sin(S.swing * Math.PI) * 14 : 0, ky = cyc - cr + cutD + press, et = p.edge;
        K.raw(ctx, () => { const bl = ctx.createLinearGradient(0, ky - 60, 0, ky); bl.addColorStop(0, '#94a3b8'); bl.addColorStop(1, '#f8fafc'); ctx.fillStyle = bl; ctx.beginPath(); ctx.moveTo(cx - 150, ky - 60); ctx.lineTo(cx + 40, ky - 60); ctx.lineTo(cx + 40, ky - et * 3); ctx.quadraticCurveTo(cx - 40, ky + 2, cx - 150, ky - 18); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1 + et * 2.5; ctx.beginPath(); ctx.moveTo(cx + 40, ky - et * 3); ctx.quadraticCurveTo(cx - 40, ky + 2, cx - 150, ky - 18); ctx.stroke();
          ctx.fillStyle = '#1f2937'; rr(ctx, cx + 40, ky - 58, 130, 26, 10); ctx.fill(); ctx.fillStyle = '#cbd5e1'; [70, 100, 130].forEach(d => { ctx.beginPath(); ctx.arc(cx + 40 + d, ky - 45, 3, 0, TAU); ctx.fill(); }); });
        C2.hand(ctx, cx + 110, ky - 62, 1, 1.1, { rot: Math.PI / 2, sleeve: '#0ea5e9' });
        // zoomed edge profile
        const zx = w - 120, zy = h * .52; K.lens(ctx, zx, zy, 56, () => { K.raw(ctx, () => { ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.moveTo(zx - 6 - et * 14, zy - 70); ctx.lineTo(zx + 6 + et * 14, zy - 70); ctx.lineTo(zx + et * 12, zy + 30); ctx.lineTo(zx - et * 12, zy + 30); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.stroke(); }); });
        Q24.T(ctx, et <= .4 ? 'حافة رقيقة (حادة)' : 'حافة سميكة (كليلة)', zx, zy + 72, { s: 12, w: 900, c: '#fff', bg: et <= .4 ? '#15803d' : '#b45309' });
        if (p.vec !== false) { Q24.F(ctx, cx + 110, ky - 150, 0, 70, 'قوة الضغط', '#2563eb', 4.5); }
        const need = 4 + 22 * et; Q24.lines(ctx, [{ t: 'سمك الحافة: ' + et + ' mm', c: '#1e293b' }, { t: 'عدد الضغطات اللازمة ≈ ' + Math.ceil(need / 5), c: '#7c3aed', w: 900 }, { t: S.cut ? 'قُطعت ✓ (ضغطات: ' + S.hits + ')' : 'ضغطات: ' + S.hits, c: S.cut ? '#15803d' : '#b45309', w: 900 }], w - 14, 44, Math.min(300, w * .42), { title: 'السكين أسفين', bd: '#9333ea' });
      }
      const B = D.hbtn(S); C2.btn(ctx, B.x, B.y, B.w, B.h, kn ? '🔪 اضغط' : '🔨 اطرق', { col: '#ea580c', s: 14, on: S.swing > 0 });
    },
    hbtn(S) { return { x: 150, y: S.H * .85, w: 140, h: 40 }; },
    drags(S) {
      if (!S.W) return []; const p = S.p;
      if (p.sc === 'wrap') { const sl = D.slider(S); return [{ id: 'wrapS', x: sl.x0 + (sl.x1 - sl.x0) * p.wrap, y: sl.y, r: 26, axis: 'x', keep: true, tip: 'اسحب لتلفّ الورقة حول القلم', idle: 'اسحبني ✋', drag: (S, d) => setParam(S, 'wrap', clamp((d.x - sl.x0) / (sl.x1 - sl.x0), 0, 1)) },
        { id: 'paper', x: Math.min(S.W - 80, D.wg(S).cx + 140), y: D.wg(S).yb - 30, w: 160, h: 70, axis: 'x', keep: true, tip: 'اسحب الورقة نحو القلم لتلفّها', hint: false, down: S => { S.w0 = p.wrap; }, drag: (S, d) => setParam(S, 'wrap', clamp(S.w0 - (d.x - d.sx) / (D.wg(S).Lb * D.wg(S).k), 0, 1)) }]; }
      if (p.sc === 'screw') { const g = D.sg(S), dep = S.depth * g.ppm, headY = g.wy + 2 + dep - g.Ls * g.ppm, ht = headY - g.bl - g.hl;
        return [{ id: 'handle', x: g.cx, y: ht + g.hl / 2, w: 100, h: g.hl + 20, axis: 'x', keep: true, tip: 'اسحب يميناً ويساراً لتدير المقبض', idle: 'أدِر المقبض ✋', drag: (S, d) => { S.turn = Math.max(0, S.turn + d.dx / 18); } }]; }
      const B = D.hbtn(S), out = [Q24.btn(S, 'hit', B, '', S => D.hit(S), { tip: 'اطرق', idle: 'اضغط ✋', hint: true })];
      if (p.sc === 'wedge') { const cx = 70 + (S.W - 70) * .42, pxc = clamp(S.H / 34, 14, 24), topY = S.H * .58 + S.depth * pxc - p.wl * pxc; out.push({ id: 'hammer', x: cx + 60, y: topY - 22, w: 170, h: 50, click: S => D.hit(S), tip: 'اضغط المطرقة لتطرق الأسفين', hint: false }); }
      else { const cx = 70 + (S.W - 70) * .42; out.push({ id: 'knife', x: cx + 100, y: S.H * .84 - 22 - 60 - 40, w: 140, h: 60, click: S => D.hit(S), tip: 'اضغط السكين', hint: false }); }
      return out;
    },
    readings(S) { const p = S.p; if (p.sc === 'wrap') return [rd('نسبة اللفّ', Math.round(p.wrap * 100) + '%')]; if (p.sc === 'screw') return [rd('درجة البريمة', p.pitch + ' mm'), rd('عدد الدورات', fmt(S.turn / TAU, 3)), rd('عمق البرغي', fmt(S.depth, 3) + ' mm'), rd('طول اللفة ÷ الدرجة', fmt(2 * Math.PI * 3.2 / p.pitch, 3))];
      if (p.sc === 'wedge') return [rd('طول الأسفين', p.wl + ' cm'), rd('سمك الأسفين', p.wt + ' cm'), rd('الطول ÷ السمك', fmt(p.wl / p.wt, 3)), rd('عدد الطرقات', S.hits), rd('الحالة', S.split ? 'انشقّ الخشب' : 'لم ينشق بعد')]; return [rd('سمك حافة السكين', p.edge + ' mm'), rd('عدد الضغطات', S.hits), rd('الحالة', S.cut ? 'قُطعت' : 'لم تُقطع')]; },
    record(S) { const p = S.p; if (p.sc === 'wedge') { if (!S.split) { Runner.toast('اطرق حتى ينشق الخشب', 'info'); return null; } return { t: 'أسفين', a: p.wl + ' cm / ' + p.wt + ' cm', r: +(p.wl / p.wt).toFixed(2), n: S.hits }; }
      if (p.sc === 'knife') { if (!S.cut) { Runner.toast('اضغط حتى تُقطع الجزرة', 'info'); return null; } return { t: 'سكين', a: 'حافة ' + p.edge + ' mm', r: '—', n: S.hits }; }
      if (p.sc === 'screw') return { t: 'بريمة', a: 'درجة ' + p.pitch + ' mm', r: +(2 * Math.PI * 3.2 / p.pitch).toFixed(2), n: +(S.turn / TAU).toFixed(1) + ' دورة' }; Runner.toast('الجدول لمشاهد البريمة والأسفين والسكين', 'info'); return null; },
    cols: [['t', 'الأداة'], ['a', 'الأبعاد'], ['r', 'النسبة (ربح القوة)'], ['n', 'الطرقات/الدورات']],
    explain(S) { const p = S.p; if (p.sc === 'wrap') return 'المثلث القائم سطح مائل. عندما نلفّه حول القلم يتحول وتره إلى <b>خط حلزوني</b> مثل سنّ البرغي: <b>البريمة سطح مائل ملفوف حول أسطوانة</b>.';
      if (p.sc === 'screw') return 'كل دورة كاملة للمقبض تُدخل البرغي مسافة تساوي <b>درجة البريمة (' + p.pitch + ' mm)</b>. القوة الدائرية الصغيرة تتحول إلى قوة كبيرة تدفع البرغي داخل الخشب (البريمة تغيّر اتجاه القوة). الدرجة الأصغر تعطي فائدة ميكانيكية أكبر.';
      if (p.sc === 'wedge') return 'قوة المطرقة النازلة تتحول عند سطحي الأسفين المائلين إلى <b>قوتين جانبيتين كبيرتين</b> تشقّان الخشب. ربح القوة يعتمد على <b>نسبة الطول إلى السمك = ' + fmt(p.wl / p.wt, 3) + '</b>: الأسفين الأطول والأرقّ أفضل.';
      return 'السكين أسفين: كلما كانت حافتها <b>أرقّ</b> قلّت القوة اللازمة للقطع، لذلك نشحذ السكاكين والفؤوس.'; },
    quiz: [
      { q: 'تسمّى المسافة بين لفتين متتاليتين في البريمة بـ:', o: ['ذراع المقاومة', 'درجة البريمة', 'المحور'], a: 1, why: 'مراجعة الفصل س2-1.' },
      { q: 'آلة بسيطة تتكوّن من مستويين مائلين متقابلين من الخلف تستخدم لشق أو اختراق المواد:', o: ['البريمة', 'البكرة', 'الأسفين'], a: 2, why: 'مراجعة الفصل س1-4.' },
      { q: 'تكون الفائدة الميكانيكية أكبر في البريمة كلما كان السطح الملفوف حول الأسطوانة:', o: ['أطول نسبةً إلى ارتفاعه', 'أقصر نسبةً إلى ارتفاعه', 'أسمك'], a: 0, why: 'مراجعة الفصل س1-5 (ص 50).' }
    ]
  };
  M8.P[D.id] = D;
})();
/* =========================================================================================
   7) الدرس 2 (ص 50): العجلة والمحور — شكل 4: مقبض الباب، المفك، عجلة قيادة السيارة
   ========================================================================================= */
(() => {
  const SC = { knob: { n: 'مقبض الباب', R: 3, r: .6, F2: 40, Rr: [1.5, 5], rr: [.4, 1.2], F2r: [10, 80] }, driver: { n: 'المفك', R: 1.8, r: .3, F2: 60, Rr: [.8, 3], rr: [.2, .6], F2r: [10, 150] }, wheel: { n: 'عجلة قيادة السيارة', R: 19, r: 2, F2: 200, Rr: [10, 25], rr: [1, 4], F2r: [50, 500] } };
  const D = { id: 'g8_wheel_axle', ch: 24, sec: 'الدرس 2: العجلة والمحور', page: 50, kind: 'نشاط',
    title: 'العجلة والمحور: مقبض الباب والمفك وعجلة القيادة',
    desc: 'العجلة والمحور آلة تتكوّن من جسمين دائريين مختلفين في نصف القطر يدوران معاً. عندما تدور العجلة يدور المحور، ولأن نصف قطر العجلة أكبر من نصف قطر المحور نحصل على ربح قوة: قوة صغيرة على العجلة تتغلب على مقاومة كبيرة على المحور.',
    tags: 'عجلة محور مقبض الباب مفك عجلة القيادة نصف قطر ربح قوة فائدة ميكانيكية R/r تدوير',
    tools: ['مقبض باب', 'مفك براغي', 'عجلة قيادة'],
    steps: ['اختر المثال: مقبض الباب، المفك، أو عجلة قيادة السيارة (شكل 4).', 'لاحظ الدائرتين: العجلة (الكبيرة، نصف قطرها R) والمحور (الصغير، نصف قطره r).', 'أمسك العجلة من الحافة (النقطة الحمراء) وأدرها بالسحب حول المركز. ماذا يحدث للمحور؟', 'قارن القوة على العجلة F₁ بالمقاومة على المحور F₂. فعّل «أدر المحور مباشرة» لترى القوة اللازمة بدون العجلة.', 'غيّر نصف قطر العجلة R: كيف تتغير القوة اللازمة؟ سجّل النتائج.'],
    concl: ['العجلة والمحور جسمان دائريان مختلفان في نصف القطر يدوران معاً حول المركز نفسه.', 'نصف قطر العجلة أكبر من نصف قطر المحور، فنحصل دائماً على ربح قوة (فائدة ميكانيكية أكبر من واحد).', 'F₁ × R = F₂ × r ⟸ الفائدة الميكانيكية = R ÷ r: كلما كبرت العجلة قلّت القوة اللازمة.'],
    laws: ['g8_wheel', 'g8_lever', 'g8_ma'],
    fact: ['عجلة القيادة الكبيرة في الشاحنات والحافلات تجعل تدوير العجلات الثقيلة ممكناً بقوة يد السائق.', 'العجلة والمحور تشبه عتلة من النوع الأول تدور دورة كاملة: المرتكز هو المركز، وذراع القوة R وذراع المقاومة r.'],
    controls: [SEL('sc', 'المثال', Object.keys(SC).map(k => [k, SC[k].n]), 'knob', (v, S) => D.reset(S)),
      R('R', 'نصف قطر العجلة R', .8, 25, 3, .1, 'cm'), R('r', 'نصف قطر المحور r', .2, 4, .6, .1, 'cm'), R('F2', 'المقاومة على المحور F₂', 10, 500, 40, 1, 'N'),
      BT('', [{ t: '↻ أدر', on: S => { S.auto = 1.2; } }, { t: '↺ قيم المثال', on: S => D.reset(S) }]),
      TG('vec', 'أسهم القوة والمقاومة', true, null, 'force'), TG('rad', 'نصفا القطرين R و r', true, null, 'vector'), TG('cmp', 'أدر المحور مباشرة (مقارنة)', false, null, 'swap'), TG('side', 'المنظر الجانبي (ماذا يحدث)', true, null, 'eye')],
    setup(S) { S.rows = S.rows || []; D.reset(S); },
    reset(S) { const c = SC[S.p.sc] || SC.knob; setParam(S, 'R', c.R, false); setParam(S, 'r', c.r, false); setParam(S, 'F2', c.F2, false); S.ang = 0; S.tot = 0; S.auto = 0; S.hold = 0; },
    sc(S) { return SC[S.p.sc] || SC.knob; },
    vals(S) { const c = D.sc(S); const R = clamp(S.p.R, c.Rr[0], c.Rr[1]), r = clamp(S.p.r, c.rr[0], Math.min(c.rr[1], R * .5)), F2 = clamp(S.p.F2, c.F2r[0], c.F2r[1]); return { R, r, F2, F1: F2 * r / R, MA: R / r }; },
    geo(S) { const w = S.W, h = S.H, c = D.sc(S); const side = S.p.side !== false; const cx = 70 + (w - 70) * (side ? .34 : .48), cy = h * .48; const Rmax = Math.min(h * .28, (w - 70) * (side ? .2 : .3)); return { w, h, cx, cy, Rp: Math.max(40, Rmax * D.vals(S).R / c.Rr[1]) }; },
    update(S, dt) { const p = S.p, lim = p.sc === 'knob' ? 1.25 : p.sc === 'wheel' ? 2.5 * Math.PI : 1e9;
      if (S.auto > 0) { const d = Math.min(S.auto, dt * 1.6); S.auto -= d; S.ang += d; S.tot += d; }
      else if (!S.hold && p.sc === 'knob' && S.ang > 0) S.ang = Math.max(0, S.ang - dt * 2.5);
      S.ang = clamp(S.ang, p.sc === 'wheel' ? -lim : 0, lim); },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S), v = D.vals(S), sc = p.sc; const rp = Math.max(6, g.Rp * v.r / v.R), a = S.ang;
      K.bg(ctx, w, h, { benchY: h * .97, bench: false });
      Q24.banner(ctx, w, 'أمسك العجلة من الحافة (النقطة الحمراء) وأدرها ✋', '#9333ea', 20);
      if (sc === 'knob') D.knob(ctx, g, rp, a); else if (sc === 'driver') D.driver(ctx, g, rp, a); else D.steer(ctx, g, rp, a);
      const ga = -Math.PI / 2 + a + (sc === 'wheel' ? -Math.PI / 2 : 0); const gx = g.cx + Math.cos(ga) * g.Rp, gy = g.cy + Math.sin(ga) * g.Rp;
      if (p.rad !== false) { K.raw(ctx, () => { ctx.setLineDash([6, 4]); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.lineTo(gx, gy); ctx.stroke(); ctx.strokeStyle = '#15803d'; const aa = ga + Math.PI; ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.lineTo(g.cx + Math.cos(aa) * rp, g.cy + Math.sin(aa) * rp); ctx.stroke(); ctx.setLineDash([]); });
        Q24.T(ctx, 'R = ' + fmt(v.R, 3) + ' cm', g.cx + Math.cos(ga) * g.Rp * .55 + 14, g.cy + Math.sin(ga) * g.Rp * .55 - 12, { s: 12, w: 900, c: '#fff', bg: '#dc2626' });
        Q24.T(ctx, 'r = ' + fmt(v.r, 3) + ' cm', g.cx + Math.cos(ga + Math.PI) * (rp + 40), g.cy + Math.sin(ga + Math.PI) * (rp + 40), { s: 12, w: 900, c: '#fff', bg: '#15803d' }); }
      K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(gx, gy, 11, 0, TAU); ctx.fill(); ctx.stroke(); });
      if (p.vec !== false) { const t = [-Math.sin(ga), Math.cos(ga)], L1 = clamp(30 + v.F1 / v.F2 * 120, 34, 110); Q24.F(ctx, gx, gy, t[0] * L1, t[1] * L1, 'F₁ = ' + fmt(v.F1, 3) + ' N', '#dc2626', 5);
        const aa = ga + Math.PI, ax = g.cx + Math.cos(aa) * rp, ay = g.cy + Math.sin(aa) * rp; Q24.F(ctx, ax, ay, t[0] * 80, t[1] * 80, 'F₂ = ' + fmt(v.F2, 4) + ' N', '#15803d', 5);
        K.raw(ctx, () => { ctx.strokeStyle = 'rgba(220,38,38,.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.Rp + 26, ga + .15, ga + .9); ctx.stroke(); const e = ga + .9; G.arrow(ctx, g.cx + Math.cos(e - .05) * (g.Rp + 26), g.cy + Math.sin(e - .05) * (g.Rp + 26), g.cx + Math.cos(e) * (g.Rp + 26), g.cy + Math.sin(e) * (g.Rp + 26), '#dc2626', 3, 12); }); }
      if (p.cmp) Q24.T(ctx, 'لو أدرنا المحور مباشرة: القوة = ' + fmt(v.F2, 4) + ' N (أكبر ' + fmt(v.MA, 3) + ' مرة!)', g.cx, g.cy + g.Rp + 58, { s: 12.5, w: 900, c: '#fff', bg: '#f97316' });
      Q24.T(ctx, 'العجلة', g.cx - g.Rp * .72, g.cy - g.Rp * .78, { s: 13, w: 900, c: '#fff', bg: '#7c3aed' }); Q24.T(ctx, 'المحور', g.cx + 4, g.cy + rp + 22, { s: 12, w: 900, c: '#fff', bg: '#334155' });
      if (p.side !== false) D.side(ctx, S, g, v);
      Q24.lines(ctx, [{ t: 'F₁ × R = F₂ × r', c: '#7c3aed', mono: 1, w: 900 }, { t: 'F₁ = ' + fmt(v.F2, 4) + ' × ' + fmt(v.r, 3) + ' ÷ ' + fmt(v.R, 3) + ' = ' + fmt(v.F1, 3) + ' N', c: '#dc2626', mono: 1 }, { t: 'M.A = R ÷ r = ' + fmt(v.MA, 3) + ' (ربح قوة)', c: '#0f766e', w: 900 }, { t: 'زاوية الدوران: ' + Math.round(a * 180 / Math.PI) + '°', c: '#1e293b' }], w - 14, 44, Math.min(320, w * .42), { title: 'العجلة والمحور', bd: '#9333ea' });
    },
    knob(ctx, g, rp, a) { K.raw(ctx, () => { const dg = ctx.createLinearGradient(g.cx - g.Rp * 2.6, 0, g.cx + g.Rp * 2.6, 0); dg.addColorStop(0, '#f5f5f4'); dg.addColorStop(1, '#d6d3d1'); ctx.fillStyle = dg; ctx.fillRect(g.cx - g.Rp * 2.2, 60, g.Rp * 4.4, g.h - 80); ctx.strokeStyle = '#a8a29e'; ctx.lineWidth = 2; ctx.strokeRect(g.cx - g.Rp * 2.2, 60, g.Rp * 4.4, g.h - 80);
        ctx.fillStyle = '#d4d4d8'; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.Rp * 1.18, 0, TAU); ctx.fill(); ctx.strokeStyle = '#a1a1aa'; ctx.stroke();
        const kg = ctx.createRadialGradient(g.cx - g.Rp * .35, g.cy - g.Rp * .35, g.Rp * .1, g.cx, g.cy, g.Rp); kg.addColorStop(0, '#fef9c3'); kg.addColorStop(.5, '#facc15'); kg.addColorStop(1, '#a16207'); ctx.fillStyle = kg; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.Rp, 0, TAU); ctx.fill(); ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; ctx.stroke();
        ctx.save(); ctx.translate(g.cx, g.cy); ctx.rotate(a); ctx.fillStyle = '#854d0e'; ctx.fillRect(-rp * .25, -g.Rp * .6, rp * .5, g.Rp * .3); ctx.fillStyle = '#3f3f46'; ctx.fillRect(-rp, -rp, 2 * rp, 2 * rp); ctx.fillStyle = '#a1a1aa'; ctx.fillRect(-rp * .6, -rp * .6, rp * 1.2, rp * 1.2); ctx.restore(); }); },
    driver(ctx, g, rp, a) { K.raw(ctx, () => { ctx.save(); ctx.translate(g.cx, g.cy); ctx.rotate(a); const hg = ctx.createRadialGradient(-g.Rp * .3, -g.Rp * .3, 4, 0, 0, g.Rp); hg.addColorStop(0, '#fca5a5'); hg.addColorStop(.6, '#dc2626'); hg.addColorStop(1, '#7f1d1d'); ctx.fillStyle = hg; ctx.beginPath(); for (let k = 0; k < 12; k++) { const t0 = k * Math.PI / 6, rr2 = k % 2 ? g.Rp * .92 : g.Rp; ctx.arc(0, 0, rr2, t0, t0 + Math.PI / 6); } ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#450a0a'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(0, 0, g.Rp * .55, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(0, 0, rp * 1.25, 0, TAU); ctx.fill(); ctx.fillStyle = '#e5e7eb'; ctx.fillRect(-rp, -rp * .28, 2 * rp, rp * .56); ctx.restore(); }); },
    steer(ctx, g, rp, a) { K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; rr(ctx, g.cx - g.Rp * 1.5, g.cy + g.Rp * .95, g.Rp * 3, g.Rp * .6, 16); ctx.fill(); ctx.save(); ctx.translate(g.cx, g.cy); ctx.rotate(a);
        ctx.strokeStyle = '#111827'; ctx.lineWidth = g.Rp * .14; ctx.beginPath(); ctx.arc(0, 0, g.Rp, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#4b5563'; ctx.lineWidth = g.Rp * .04; ctx.beginPath(); ctx.arc(0, 0, g.Rp - g.Rp * .03, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
        ctx.fillStyle = '#4b5563'; [Math.PI * .5, Math.PI * 1.15, Math.PI * 1.85].forEach(t => { ctx.save(); ctx.rotate(t); ctx.fillRect(0, -g.Rp * .07, g.Rp * .95, g.Rp * .14); ctx.restore(); });
        const hg = ctx.createRadialGradient(-6, -6, 3, 0, 0, g.Rp * .32); hg.addColorStop(0, '#6b7280'); hg.addColorStop(1, '#1f2937'); ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(0, 0, g.Rp * .3, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(0, 0, rp, 0, TAU); ctx.fill(); ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 2; ctx.stroke();
        [Math.PI, 0].forEach(t => { const x = Math.cos(t) * g.Rp, y = Math.sin(t) * g.Rp; ctx.fillStyle = '#f2c29b'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(x, y, g.Rp * .12, g.Rp * .2, 0, 0, TAU); ctx.fill(); ctx.stroke(); });
        ctx.restore(); }); },
    side(ctx, S, g, v) { const sc = S.p.sc, x = g.w - 140, y = g.h * .64, a = S.ang; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.94)'; rr(ctx, x - 115, y - 90, 230, 190, 14); ctx.fill(); ctx.strokeStyle = '#c4b5fd'; ctx.lineWidth = 2; ctx.stroke(); });
      if (sc === 'knob') { const ret = clamp(a / 1.25, 0, 1) * 34; K.raw(ctx, () => { ctx.fillStyle = '#e7e5e4'; ctx.fillRect(x - 100, y - 50, 120, 100); ctx.fillStyle = '#78716c'; ctx.fillRect(x + 20, y - 50, 70, 100); ctx.fillStyle = '#a8a29e'; ctx.fillRect(x + 30, y - 14, 40, 28); const lg = ctx.createLinearGradient(0, y - 10, 0, y + 10); lg.addColorStop(0, '#fde68a'); lg.addColorStop(1, '#a16207'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(x - 30 - ret, y - 10); ctx.lineTo(x + 50 - ret, y - 10); ctx.lineTo(x + 66 - ret, y + 10); ctx.lineTo(x - 30 - ret, y + 10); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#854d0e'; ctx.stroke(); });
        Q24.T(ctx, ret > 30 ? 'انسحب لسان القفل ✓ يُفتح الباب' : 'لسان القفل', x - 10, y + 70, { s: 12, w: 900, c: ret > 30 ? '#15803d' : '#334155' }); Q24.T(ctx, 'الباب', x - 60, y - 64, { s: 11, w: 800, c: '#57534e' }); Q24.T(ctx, 'الإطار', x + 55, y - 64, { s: 11, w: 800, c: '#57534e' }); }
      else if (sc === 'driver') { const dep = Math.min(40, S.tot * 2.2); K.raw(ctx, () => { Q24.wood(ctx, x - 100, y, 200, 70); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(x - 6, y - 40 + dep, 12, 52); ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.moveTo(x - 16, y - 40 + dep); ctx.lineTo(x + 16, y - 40 + dep); ctx.lineTo(x + 6, y - 32 + dep); ctx.lineTo(x - 6, y - 32 + dep); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#475569'; for (let k = 0; k < 6; k++) { const yy = y - 28 + dep + k * 8 + (((a * 4) % 8) + 8) % 8; ctx.beginPath(); ctx.moveTo(x - 7, yy); ctx.lineTo(x + 7, yy + 4); ctx.stroke(); } ctx.fillStyle = '#9ca3af'; ctx.fillRect(x - 3, y - 85, 6, 45 + dep); });
        Q24.T(ctx, 'البرغي يدخل الخشب', x, y + 84, { s: 12, w: 900, c: '#334155' }); }
      else { const st = clamp(a / (2.5 * Math.PI), -1, 1) * .55; K.raw(ctx, () => { ctx.fillStyle = '#2563eb'; rr(ctx, x - 50, y - 70, 100, 150, 22); ctx.fill(); ctx.fillStyle = '#bfdbfe'; rr(ctx, x - 38, y - 40, 76, 34, 8); ctx.fill(); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => { ctx.save(); ctx.translate(x + sx * 54, y + sy * 44 + 5); if (sy < 0) ctx.rotate(st); ctx.fillStyle = '#111827'; rr(ctx, -8, -16, 16, 32, 4); ctx.fill(); ctx.restore(); }); });
        Q24.T(ctx, 'العجلتان الأماميتان تدوران', x, y + 92, { s: 12, w: 900, c: '#334155' }); }
      Q24.T(ctx, 'ماذا يحدث؟', x, y - 76, { s: 12, w: 900, c: '#6d28d9' }); },
    drags(S) {
      if (!S.W) return []; const g = D.geo(S), sc = S.p.sc, ga = -Math.PI / 2 + S.ang + (sc === 'wheel' ? -Math.PI / 2 : 0);
      return [{ id: 'grip', x: g.cx + Math.cos(ga) * g.Rp, y: g.cy + Math.sin(ga) * g.Rp, r: 34, cx: g.cx, cy: g.cy, keep: true, tip: 'اسحب حول المركز لتدير العجلة', idle: 'أدِرني ✋',
        down: S => { S.hold = 1; S.auto = 0; }, drag: (S, d) => { S.ang += d.dang; if (d.dang > 0) S.tot += d.dang; }, up: S => { S.hold = 0; } },
        { id: 'rim', x: g.cx, y: g.cy, r: g.Rp * .6, hint: false, tip: 'غيّر نصف قطر العجلة (عجلة الفأرة)', wheel: (S, k) => { const c = D.sc(S); setParam(S, 'R', clamp(S.p.R + k * (c.Rr[1] - c.Rr[0]) / 20, c.Rr[0], c.Rr[1])); } }];
    },
    readings(S) { const v = D.vals(S); return [rd('نصف قطر العجلة R', fmt(v.R, 3) + ' cm'), rd('نصف قطر المحور r', fmt(v.r, 3) + ' cm'), rd('المقاومة على المحور F₂', fmt(v.F2, 4) + ' N'), rd('القوة على العجلة F₁', fmt(v.F1, 3) + ' N'), rd('الفائدة الميكانيكية R/r', fmt(v.MA, 3)), rd('زاوية الدوران', Math.round(S.ang * 180 / Math.PI) + '°')]; },
    record(S) { const v = D.vals(S); return { sc: D.sc(S).n, R: v.R, r: v.r, F2: v.F2, F1: +v.F1.toFixed(2), MA: +v.MA.toFixed(2) }; },
    cols: [['sc', 'المثال'], ['R', 'R (cm)'], ['r', 'r (cm)'], ['F2', 'F₂ (N)'], ['F1', 'F₁ (N)'], ['MA', 'M.A']],
    graph: { x: 'R', y: 'F1', xl: 'نصف قطر العجلة R (cm)', yl: 'القوة على العجلة F₁ (N)', theory: (x, S) => { const v = D.vals(S); return v.F2 * v.r / x; } },
    explain(S) { const v = D.vals(S); return 'العجلة (R = ' + fmt(v.R, 3) + ' cm) والمحور (r = ' + fmt(v.r, 3) + ' cm) يدوران معاً. لأن R أكبر من r تكفي قوة صغيرة <b>F₁ = ' + fmt(v.F1, 3) + ' N</b> على العجلة للتغلب على مقاومة <b>' + fmt(v.F2, 4) + ' N</b> على المحور: ربح قوة، <b>M.A = ' + fmt(v.MA, 3) + '</b>.'; },
    quiz: [
      { q: 'نحصل على ربح قوة في العجلة والمحور لأن:', o: ['نصف قطر العجلة أكبر من نصف قطر المحور', 'نصف قطر المحور أكبر من نصف قطر العجلة', 'العجلة والمحور متساويان'], a: 0, why: 'مراجعة الدرس س2-ب (ص 50).' },
      { q: 'أيٌّ مما يأتي مثال على العجلة والمحور؟', o: ['الملقط', 'مقبض الباب', 'الأسفين'], a: 1, why: 'شكل 4: مقبض الباب وعجلة قيادة السيارة والمفك.' },
      { q: 'الفائدة الميكانيكية للعجلة والمحور تكون دائماً:', o: ['أصغر من واحد', 'تساوي واحداً', 'أكبر من واحد'], a: 2, why: 'ص 50: نحصل على فائدة ميكانيكية أكبر من واحد دائماً.' }
    ]
  };
  M8.P[D.id] = D;
})();
/* =========================================================================================
   8) الدرس 2 (ص 51): البكرة — الثابتة (شكل 5)، المتحركة، ونظام من البكرة الثابتة والمتحركة معاً
   ========================================================================================= */
(() => {
  const INFO = {
    fixed: { n: 'البكرة الثابتة', page: 51, nr: 1, desc: 'البكرة الثابتة يبقى محورها ثابت الموضع. نسحب الحبل إلى الأسفل فيرتفع الثقل إلى الأعلى: تغيّر اتجاه القوة فقط، والقوة تساوي المقاومة (M.A = 1).',
      steps: ['البكرة معلّقة بالسقف (ثابتة)، والثقل معلّق في أحد طرفي الحبل (شكل 5).', 'اسحب اليد (والميزان النابضي) إلى الأسفل ببطء. إلى أين يتحرك الثقل؟', 'قارن قراءة الميزان (القوة) بوزن الثقل (المقاومة).', 'قارن المسافة التي سحبتها بالمسافة التي ارتفعها الثقل.', 'غيّر كتلة الثقل وسجّل النتائج.'],
      concl: ['في البكرة الثابتة نسحب إلى الأسفل فيرتفع الثقل إلى الأعلى: تُستخدم لتغيير اتجاه القوة.', 'عند الاتزان القوة تساوي المقاومة، والفائدة الميكانيكية تساوي 1.', 'البكرة الثابتة تمثل عتلة من النوع الأول، ذراع القوة فيها يساوي ذراع المقاومة (نصف قطر البكرة).'],
      ex: 'نستعملها لرفع العلم على السارية ولسحب الماء من البئر: من الأسهل أن نسحب إلى الأسفل مستعينين بوزننا.' },
    movable: { n: 'البكرة المتحركة', page: 51, nr: 2, desc: 'البكرة المتحركة يتحرك محورها مع الثقل. الثقل يتوزع على حبلين، فتكفي قوة تساوي نصف المقاومة تقريباً (M.A = 2).',
      steps: ['طرف الحبل مثبت في السقف، والبكرة تحمل الثقل وتتحرك معه.', 'اسحب اليد إلى الأعلى. ماذا يحدث للبكرة والثقل؟', 'لاحظ الحبلين اللذين يحملان البكرة (مرقّمان 1 و 2).', 'قارن قراءة الميزان بوزن الثقل، وقارن المسافتين.', 'جرّب كتلاً مختلفة وسجّل النتائج.'],
      concl: ['في البكرة المتحركة تتحرك البكرة والثقل معاً عند سحب طرف الحبل.', 'نحتاج قوة تساوي نصف المقاومة تقريباً: ربح قوة يساوي 2.', 'لكن نسحب الحبل مسافة تساوي ضعف المسافة التي يرتفعها الثقل.', 'البكرة المتحركة تمثل عتلة من النوع الثاني ذراع القوة فيها ضعف ذراع المقاومة.'],
      ex: 'تستعمل في الرافعات لرفع الأثقال الكبيرة بقوة أصغر.' },
    system: { n: 'نظام البكرة الثابتة والمتحركة', page: 51, nr: 2, desc: 'نستعمل البكرة الثابتة والمتحركة معاً: المتحركة تعطي ربح قوة، والثابتة تجعلنا نسحب إلى الأسفل. كلما زاد عدد الحبال التي تحمل الثقل قلّت القوة اللازمة.',
      steps: ['النظام في الكتاب: بكرة ثابتة في الأعلى وبكرة متحركة تحمل الثقل.', 'اسحب اليد إلى الأسفل: يرتفع الثقل. عدّ الحبال التي تحمل البكرة المتحركة.', 'اختر «رافعة الأثقال (4 حبال)» وكرّر. كيف تتغير القوة؟', 'قارن القوة بوزن الثقل في الحالتين، وسجّل النتائج.'],
      concl: ['نستعمل البكرة الثابتة والمتحركة معاً لنكوّن نظاماً لزيادة ربح القوة، كما في رافعات الأثقال في البنايات العالية.', 'في النظام المثالي: القوة = الوزن ÷ عدد الحبال التي تحمل الثقل.', 'كلما زاد ربح القوة زادت المسافة التي نسحب بها الحبل.'],
      ex: 'رافعات البناء (الكرين) تستعمل مجموعات من البكرات فيستطيع محرك صغير رفع أطنان من الحديد والإسمنت.' }
  };
  const mk = K0 => {
    const I = INFO[K0];
    const D = { id: 'g8_pul_' + K0, ch: 24, page: I.page, desc: I.desc, tags: 'بكرة ثابتة متحركة حبل أخدود رافعة أثقال ميزان نابضي فائدة ميكانيكية', tools: ['بكرة', 'حبل', 'ثقل', 'ميزان نابضي', 'حامل'],
      steps: I.steps, concl: I.concl, laws: ['g8_pul', 'g8_ma'],
      controls: [R('m', 'كتلة الثقل m', 1, 200, K0 === 'movable' ? 20 : 10, 1, 'kg'), SEL('g', 'تعجيل الجاذبية g', [['9.8', '9.8 N/kg'], ['10', '10 N/kg']], '9.8'),
        ...(K0 === 'system' ? [SEL('sys', 'النظام', [['two', 'الكتاب: ثابتة + متحركة'], ['four', 'رافعة الأثقال (4 حبال)']], 'two', (v, S) => { S.pull = 0; })] : []),
        BT('', [{ t: K0 === 'movable' ? '⬆ اسحب' : '⬇ اسحب', on: S => { S.auto = 1; } }, { t: '↺ أنزل الثقل', on: S => { S.pull = 0; S.auto = 0; } }]),
        TG('vec', 'أسهم القوة والمقاومة', true, null, 'force'), TG('sup', 'ترقيم الحبال الحاملة', true, null, 'labels'), TG('dist', 'المسافات (الحبل والثقل)', true, null, 'vector'), TG('real', 'احتكاك البكرات (واقعي)', false, null, 'heat')],
      setup(S) { S.pull = 0; S.auto = 0; S.rows = S.rows || []; },
      n(S) { return K0 === 'fixed' ? 1 : K0 === 'movable' ? 2 : S.p.sys === 'four' ? 4 : 2; },
      np(S) { return K0 === 'fixed' ? 1 : K0 === 'movable' ? 1 : S.p.sys === 'four' ? 4 : 2; },
      W(S) { return S.p.m * +S.p.g; },
      F(S) { const n = D.n(S); return D.W(S) / n / (S.p.real ? Math.pow(.93, D.np(S)) : 1); },
      geo(S) { const w = S.W, h = S.H, r = clamp(h * .05, 24, 38), y0 = 78, cx = 70 + (w - 70) * .36; const pxcm = r / 6; const max = h * .26; return { w, h, r, y0, cx, pxcm, max }; },
      update(S, dt) { if (S.auto) { const g = D.geo(S); S.pull = Math.min(g.max * D.n(S), S.pull + dt * 120); if (S.pull >= g.max * D.n(S)) S.auto = 0; } },
      draw(ctx, w, h, S) {
        const g = D.geo(S), p = S.p, n = D.n(S), W = D.W(S), F = D.F(S), r = g.r, lift = S.pull / n; K.bg(ctx, w, h, { benchY: h * .9 });
        Q24.ceiling(ctx, 70, w - 10, g.y0 - 8);
        Q24.banner(ctx, w, K0 === 'movable' ? 'اسحب اليد إلى الأعلى ✋' : 'اسحب اليد إلى الأسفل ✋', '#9333ea', 20);
        const Fm = [5, 10, 20, 50, 100, 200, 500, 1000, 2000].find(q => q >= F * 1.05) || 2000, L = 96;
        const off = -S.pull * .9; let hand, loadTop, sup = [];
        const hl = (x1, y1, x2, y2, k) => sup.push([x1, y1, x2, y2, k]);
        if (K0 === 'fixed') {
          const px = g.cx, py = g.y0 + 70; Q24.strap(ctx, px, py, r, px, g.y0 - 6);
          const ly = h * .62 - lift, hy = h * .34 + S.pull;
          Q24.rope(ctx, [[px + r, py], [px + r, ly]], { off }); Q24.rope(ctx, [[px - r, py], [px - r, hy]], { off: -off }); Q24.rope(ctx, [[px - r, py], ...D.arc(px, py, r, Math.PI, TAU)], { off });
          Q24.pulley(ctx, px, py, r, S.pull / r);
          loadTop = [px + r, ly]; hl(px + r, py + 6, px + r, ly - 4, 1);
          const hk = Q24.sb(ctx, px - r, hy, L, F, Fm, { rx: -46 }); hand = [px - r + 4, hk]; C2.hand(ctx, hand[0], hand[1] + 6, 1, 1.05, { rot: -Math.PI / 2, sleeve: '#0ea5e9' });
        } else if (K0 === 'movable') {
          const mx = g.cx, my = h * .6 - lift, ax = mx - r; Q24.rope(ctx, [[ax, g.y0 - 6], [ax, my]], {}); Q24.rope(ctx, [...D.arc(mx, my, r, Math.PI, 0, true)], { off });
          const hy = h * .3 - S.pull; Q24.rope(ctx, [[mx + r, my], [mx + r, hy + L + 30]], { off: -off });
          K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(ax - 8, g.y0 - 8, 16, 8); });
          Q24.pulley(ctx, mx, my, r, -lift / r); Q24.strap(ctx, mx, my, r, mx, my + r + 18);
          loadTop = [mx, my + r + 22]; hl(ax, g.y0 + 4, ax, my - 4, 1); hl(mx + r, my - 4, mx + r, hy + L + 40, 2);
          Q24.sb(ctx, mx + r, hy, L, F, Fm, { rx: 46 }); hand = [mx + r, hy]; C2.hand(ctx, mx + r + 3, hy - 4, 1, 1.05, { rot: Math.PI / 2, sleeve: '#0ea5e9' });
        } else if (p.sys !== 'four') {
          const px = g.cx - r * 1.5, py = g.y0 + 70, mx = px + 2 * r, my = h * .6 - lift, ax = mx + r; Q24.strap(ctx, px, py, r, px, g.y0 - 6);
          const hy = h * .34 + S.pull;
          Q24.rope(ctx, [[px - r, hy], [px - r, py], ...D.arc(px, py, r, Math.PI, TAU), [px + r, my], ...D.arc(mx, my, r, Math.PI, 0, true), [ax, g.y0 - 6]], { off });
          K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(ax - 8, g.y0 - 8, 16, 8); });
          Q24.pulley(ctx, px, py, r, S.pull / r); Q24.pulley(ctx, mx, my, r, -lift / r); Q24.strap(ctx, mx, my, r, mx, my + r + 18);
          loadTop = [mx, my + r + 22]; hl(px + r, py + 6, px + r, my - 4, 1); hl(ax, g.y0 + 4, ax, my - 4, 2);
          const hk = Q24.sb(ctx, px - r, hy, L, F, Fm, { rx: -46 }); hand = [px - r + 4, hk]; C2.hand(ctx, hand[0], hand[1] + 6, 1, 1.05, { rot: -Math.PI / 2, sleeve: '#0ea5e9' });
        } else {
          const rr2 = r * .8, a = g.cx - rr2 * 3.5, py = g.y0 + 66, ly = h * .6 - lift, U = [a, a + 4 * rr2], Lw = [a + 2 * rr2, a + 6 * rr2], ax = a + 7 * rr2, hy = h * .34 + S.pull;
          K.raw(ctx, () => { ctx.fillStyle = '#7e22ce'; rr(ctx, a - rr2 * 1.2, py - 6, 5.4 * rr2 + rr2 * 2.6, 12, 4); ctx.fill(); ctx.fillRect(g.cx - 4, g.y0 - 8, 8, py - g.y0 + 4); ctx.fillStyle = '#6b21a8'; rr(ctx, Lw[0] - rr2 * 1.2, ly - 6, 4 * rr2 + rr2 * 2.4, 12, 4); ctx.fill(); });
          Q24.rope(ctx, [[a - rr2, hy], [a - rr2, py], ...D.arc(U[0], py, rr2, Math.PI, TAU), [a + rr2, ly], ...D.arc(Lw[0], ly, rr2, Math.PI, 0, true), [a + 3 * rr2, py], ...D.arc(U[1], py, rr2, Math.PI, TAU), [a + 5 * rr2, ly], ...D.arc(Lw[1], ly, rr2, Math.PI, 0, true), [ax, py + 6]], { off });
          U.forEach(x => Q24.pulley(ctx, x, py, rr2, S.pull / rr2)); Lw.forEach(x => Q24.pulley(ctx, x, ly, rr2, -lift / rr2));
          K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.cx, ly + 6); ctx.lineTo(g.cx, ly + 30); ctx.stroke(); });
          loadTop = [g.cx, ly + 30]; [a + rr2, a + 3 * rr2, a + 5 * rr2, ax].forEach((x, i) => hl(x, py + 10, x, ly - 6, i + 1));
          const hk = Q24.sb(ctx, a - rr2, hy, L, F, Fm, { rx: -46 }); hand = [a - rr2 + 4, hk]; C2.hand(ctx, hand[0], hand[1] + 6, 1, 1.05, { rot: -Math.PI / 2, sleeve: '#0ea5e9' });
        }
        const bw = clamp(30 + Math.sqrt(p.m) * 5, 36, 100), bh = bw * .7; const lb = Q24.block(ctx, loadTop[0], loadTop[1] - 4, bw, bh, p.m + ' kg', { c1: '#1f2937', c2: '#6b7280', c3: '#111827' });
        if (p.sup !== false) sup.forEach(([x1, y1, x2, y2, k]) => { K.raw(ctx, () => { ctx.strokeStyle = 'rgba(250,204,21,.55)'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }); Q24.T(ctx, String(k), x1, (y1 + y2) / 2, { s: 13, w: 900, c: '#fff', bg: '#ca8a04' }); });
        if (p.vec !== false) { const up = K0 === 'movable'; Q24.F(ctx, hand[0] - 34, hand[1] + (up ? 20 : 0), 0, (up ? -1 : 1) * clamp(F / W * 110, 30, 110), 'F = ' + fmt(F, 4) + ' N', '#dc2626', 4.5); Q24.F(ctx, loadTop[0] + bw / 2 + 22, lb - bh / 2, 0, 90, 'W = ' + fmt(W, 4) + ' N', '#15803d', 4.5); }
        if (p.dist !== false) Q24.lines(ctx, [{ t: 'سحبتَ الحبل: ' + fmt(S.pull / g.pxcm, 3) + ' cm', c: '#dc2626', w: 900 }, { t: 'ارتفع الثقل: ' + fmt(lift / g.pxcm, 3) + ' cm', c: '#15803d', w: 900 }], w - 14, h * .58, Math.min(250, w * .36), { title: 'المسافات', bd: '#0f766e' });
        Q24.lines(ctx, [{ t: 'عدد الحبال الحاملة: ' + n, c: '#ca8a04', w: 900 }, { t: 'F = W ÷ ' + n + ' = ' + fmt(W, 4) + ' ÷ ' + n + (p.real ? ' (+ احتكاك)' : '') + ' = ' + fmt(F, 4) + ' N', c: '#dc2626', mono: 1 }, { t: 'M.A = W ÷ F = ' + fmt(W / F, 3), c: '#1e293b', mono: 1 }, { t: K0 === 'fixed' ? 'تغيّر اتجاه القوة فقط' : 'ربح قوة', c: '#0f766e', w: 900 }], w - 14, 44, Math.min(320, w * .44), { title: I.n, bd: '#9333ea' });
        K.party(ctx, S);
      },
      arc(cx, cy, r, a0, a1, ccw) { const P = [], N = 12; for (let k = 0; k <= N; k++) { const a = ccw ? a0 - (a0 - a1 + (a1 > a0 ? TAU : 0)) * k / N : a0 + (a1 - a0) * k / N; P.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } return P; },
      handPos(S) { const g = D.geo(S), h = S.H, r = g.r; if (K0 === 'movable') return [g.cx + r, h * .3 - S.pull]; if (K0 === 'fixed') return [g.cx - r, h * .34 + S.pull + 96 + 30]; if (S.p.sys === 'four') return [g.cx - r * .8 * 3.5 - r * .8, h * .34 + S.pull + 96 + 30]; return [g.cx - r * 2.5, h * .34 + S.pull + 96 + 30]; },
      drags(S) { if (!S.W) return []; const g = D.geo(S), [x, y] = D.handPos(S), up = K0 === 'movable', mx = g.max * D.n(S);
        return [{ id: 'hand', x, y: y + (up ? -20 : 20), w: 70, h: 90, axis: 'y', keep: true, tip: up ? 'اسحب إلى الأعلى لترفع الثقل' : 'اسحب إلى الأسفل لترفع الثقل', idle: up ? 'اسحب للأعلى ✋' : 'اسحب للأسفل ✋',
          down: S => { S.auto = 0; S.p0 = S.pull; }, drag: (S, d) => { S.pull = clamp(S.p0 + (up ? -1 : 1) * (d.y - d.sy), 0, mx); } }]; },
      readings(S) { const g = D.geo(S), n = D.n(S); return [rd('وزن الثقل W', fmt(D.W(S), 4) + ' N'), rd('القوة F (الميزان)', fmt(D.F(S), 4) + ' N'), rd('عدد الحبال الحاملة', n), rd('الفائدة الميكانيكية W/F', fmt(D.W(S) / D.F(S), 3)), rd('المسافة التي سُحب بها الحبل', fmt(S.pull / g.pxcm, 3) + ' cm'), rd('ارتفاع الثقل', fmt(S.pull / n / g.pxcm, 3) + ' cm')]; },
      record(S) { const g = D.geo(S), n = D.n(S); return { t: K0 === 'system' && S.p.sys === 'four' ? 'رافعة 4 حبال' : I.n, W: +D.W(S).toFixed(1), F: +D.F(S).toFixed(1), n, MA: +(D.W(S) / D.F(S)).toFixed(2), s: +(S.pull / g.pxcm).toFixed(1), hh: +(S.pull / n / g.pxcm).toFixed(1) }; },
      cols: [['t', 'البكرة'], ['W', 'W (N)'], ['F', 'F (N)'], ['n', 'الحبال'], ['MA', 'M.A'], ['s', 'سحب الحبل (cm)'], ['hh', 'ارتفاع الثقل (cm)']],
      explain(S) { const n = D.n(S); return '<b>ماذا ترى؟</b> ' + (K0 === 'fixed' ? 'تسحب إلى الأسفل فيرتفع الثقل، وقراءة الميزان تساوي وزن الثقل.' : 'قراءة الميزان أصغر من وزن الثقل.') + '<br><b>لماذا؟</b> ' + (K0 === 'fixed' ? 'حبل واحد يحمل الثقل، فالبكرة الثابتة تغيّر اتجاه القوة فقط (M.A = 1).' : 'الثقل معلّق بـ ' + n + ' حبال، كل حبل يحمل جزءاً منه، فالقوة = الوزن ÷ ' + n + '. لكنك تسحب الحبل مسافة أكبر ' + n + ' مرات.') + '<br><b>في حياتنا:</b> ' + I.ex; },
      quiz: []
    };
    M8.P[D.id] = D;
  };
  ['fixed', 'movable', 'system'].forEach(mk);
})();
/* =========================================================================================
   9) الدرس 2 (ص 52): كفاءة الآلة + مراجعة الدرس س7 — والفيزياء والمجتمع (ص 53): تقليل الاحتكاك
   ========================================================================================= */
(() => {
  const LUB = { dry: { n: 'محور جاف (بلا تشحيم)', e: .65 }, oil: { n: 'محور مُشحَّم', e: .85 }, ball: { n: 'محمل كريات + تشحيم', e: .95 } };
  const D = { id: 'g8_eff_main', ch: 24, page: 52, desc: 'الآلة تحوّل الطاقة الداخلة إليها إلى شكل آخر، لكن جزءاً منها يتحول إلى طاقة حرارية غير مفيدة بسبب الاحتكاك. كفاءة الآلة = الطاقة الخارجة ÷ الطاقة الداخلة × 100%.',
    tags: 'كفاءة الآلة طاقة داخلة خارجة مفقودة حرارية احتكاك شغل ناتج منجز تشحيم محمل كريات', tools: ['بكرات', 'حبل', 'ثقل', 'ميزان نابضي', 'شحم'],
    steps: ['مشهد «مخطط الطاقة» (ص 52): الطاقة الداخلة تدخل الآلة، فيخرج جزء منها طاقة مفيدة ويضيع جزء طاقةً حرارية.', 'غيّر الطاقة الداخلة والخارجة (س7: 200 J و 120 J) واحسب الكفاءة والطاقة الضائعة.', 'مشهد «رفع ثقل بالبكرات»: اسحب الحبل لترفع الثقل وقارن الشغل المنجز (F × d) بالشغل الناتج (W × h).', 'غيّر نوع المحور: جاف، مُشحَّم، محمل كريات (ص 53). لاحظ الحرارة عند المحاور والكفاءة.'],
    concl: ['لا توجد آلة مثالية عملياً: الطاقة الخارجة دائماً أقل من الطاقة الداخلة بسبب الاحتكاك.', 'كفاءة الآلة = الطاقة الخارجة ÷ الطاقة الداخلة × 100% = الشغل الناتج ÷ الشغل المنجز × 100%.', 'الطاقة الضائعة = الطاقة الداخلة − الطاقة الخارجة (تتحول إلى حرارة).', 'التشحيم ومحمل الكريات يقللان الاحتكاك فتزداد الكفاءة.'],
    laws: ['g8_eff'],
    controls: [SEL('sc', 'المشهد', [['q7', '⚡ مخطط الطاقة (س7)'], ['lift', '🏗️ رفع ثقل بالبكرات']], 'q7', (v, S) => { S.pull = 0; }),
      R('Ein', 'الطاقة الداخلة', 20, 500, 200, 10, 'J'), R('Eout', 'الطاقة الخارجة', 10, 500, 120, 10, 'J'), SEL('lub', 'المحاور', Object.keys(LUB).map(k => [k, LUB[k].n]), 'dry'),
      BT('', [{ t: '⬇ اسحب الحبل', on: S => { S.auto = 1; } }, { t: '↺ من جديد', on: S => { S.pull = 0; S.auto = 0; } }]),
      TG('flow', 'جسيمات الطاقة', true, null, 'energy'), TG('heat', 'الحرارة الناتجة عن الاحتكاك', true, null, 'heat'), TG('bars', 'أعمدة الشغل', true, null, 'graph')],
    setup(S) { S.pull = 0; S.auto = 0; S.pts = []; S.rows = S.rows || []; },
    eff(S) { return S.p.sc === 'q7' ? Math.min(S.p.Eout, S.p.Ein) / S.p.Ein : LUB[S.p.lub].e; },
    update(S, dt) { if (S.auto) { S.pull = Math.min(S.H * .5, S.pull + dt * 110); if (S.pull >= S.H * .5) S.auto = 0; }
      if (S.p.flow !== false) { const e = D.eff(S); if (Math.random() < dt * 30) S.pts.push({ t: 0, out: Math.random() < e, j: Math.random() }); S.pts.forEach(q => q.t += dt * .5); S.pts = S.pts.filter(q => q.t < 1); } },
    draw(ctx, w, h, S) { K.bg(ctx, w, h, { benchY: h * .92 }); if (S.p.sc === 'q7') D.dQ7(ctx, w, h, S); else D.dLift(ctx, w, h, S); K.party(ctx, S); },
    dQ7(ctx, w, h, S) {
      const p = S.p, Ein = p.Ein, Eo = Math.min(p.Eout, Ein), e = Eo / Ein, lost = Ein - Eo; const cy = h * .4, x0 = w - 120, xm = Q24.cx(w) + 20, x1 = 140, r = clamp(w * .07, 44, 62), ly = h * .7;
      Q24.banner(ctx, w, 'مخطط لتحولات الطاقة للآلة (ص 52)', '#9333ea', 20);
      K.raw(ctx, () => { [[x0, xm + 70], [xm - 70, x1 + r]].forEach(([a, b]) => { G.arrow(ctx, a - r - 4, cy, b + 6, cy, '#dc2626', 4, 14); }); G.arrow(ctx, xm, cy + 40, xm, ly - r - 6, '#dc2626', 4, 14); });
      const circ = (x, y, s1, s2) => { K.raw(ctx, () => { const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 4, x, y, r); g.addColorStop(0, '#fef9c3'); g.addColorStop(1, '#eab308'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }); Q24.T(ctx, s1, x, y - 8, { s: 12.5, w: 900, c: '#713f12' }); Q24.T(ctx, s2, x, y + 12, { s: 13, w: 900, c: '#1e293b' }); };
      circ(x0, cy, 'الطاقة الداخلة', Ein + ' J'); circ(x1, cy, 'الطاقة الخارجة', Eo + ' J'); circ(xm, ly, 'المفقودة (الحرارية)', lost + ' J');
      K.raw(ctx, () => { const g = ctx.createLinearGradient(0, cy - 34, 0, cy + 34); g.addColorStop(0, '#bbf7d0'); g.addColorStop(1, '#4ade80'); ctx.fillStyle = g; rr(ctx, xm - 66, cy - 36, 132, 72, 12); ctx.fill(); ctx.strokeStyle = '#15803d'; ctx.lineWidth = 2; ctx.stroke(); });
      Q24.T(ctx, 'الآلة', xm, cy, { s: 18, w: 900, c: '#14532d' });
      if (p.flow !== false) K.raw(ctx, () => { S.pts.forEach(q => { let x, y; if (q.t < .5) { const k = q.t / .5; x = x0 - r + (xm + 66 - (x0 - r)) * k; y = cy - 14 + q.j * 28; } else if (q.out) { const k = (q.t - .5) / .5; x = xm - 66 + (x1 + r - (xm - 66)) * k; y = cy - 14 + q.j * 28; } else { const k = (q.t - .5) / .5; x = xm - 14 + q.j * 28; y = cy + 36 + (ly - r - cy - 36) * k; } ctx.fillStyle = q.t >= .5 && !q.out ? '#ef4444' : '#f59e0b'; ctx.beginPath(); ctx.arc(x, y, 4, 0, TAU); ctx.fill(); }); });
      Q24.lines(ctx, [{ t: 'الكفاءة = ' + Eo + ' ÷ ' + Ein + ' × 100% = ' + fmt(e * 100, 3) + '%', c: '#7c3aed', mono: 1, w: 900 }, { t: 'الطاقة الضائعة = ' + Ein + ' − ' + Eo + ' = ' + lost + ' J', c: '#dc2626', mono: 1 }], w - 14, h * .78, Math.min(360, w * .5), { title: 'الحساب (س7)', bd: '#9333ea' });
      if (Eo >= Ein) Q24.T(ctx, 'لا توجد آلة كفاءتها 100% عملياً!', xm, h * .17, { s: 13, w: 900, c: '#fff', bg: '#dc2626' });
    },
    dLift(ctx, w, h, S) {
      const p = S.p, e = D.eff(S), m = 20, W = m * 9.8, F = W / 2 / e, r = clamp(h * .05, 24, 36), y0 = 78, px = 70 + (w - 70) * .3, py = y0 + 66, mx = px + 2 * r, lift = S.pull / 2, my = h * .62 - lift, ax = mx + r, hy = h * .32 + S.pull;
      Q24.banner(ctx, w, 'اسحب الحبل لترفع الثقل، وقارن الشغل المنجز بالشغل الناتج ✋', '#9333ea', 20);
      Q24.ceiling(ctx, 70, w - 10, y0 - 8); Q24.strap(ctx, px, py, r, px, y0 - 6);
      const A = (cx, cy, a0, a1, ccw) => { const P = []; for (let k = 0; k <= 12; k++) { const a = ccw ? a0 - (a0 - a1) * k / 12 : a0 + (a1 - a0) * k / 12; P.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } return P; };
      Q24.rope(ctx, [[px - r, hy], [px - r, py], ...A(px, py, Math.PI, TAU), [px + r, my], ...A(mx, my, Math.PI, 0, true), [ax, y0 - 6]], { off: -S.pull });
      Q24.pulley(ctx, px, py, r, S.pull / r); Q24.pulley(ctx, mx, my, r, -lift / r); Q24.strap(ctx, mx, my, r, mx, my + r + 18);
      if (p.heat !== false && S.pull > 2) K.raw(ctx, () => { [[px, py], [mx, my]].forEach(([x, y]) => { const g = ctx.createRadialGradient(x, y, 2, x, y, r * (1.6 - e)); g.addColorStop(0, `rgba(239,68,68,${(1 - e) * 1.4})`); g.addColorStop(1, 'rgba(239,68,68,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.8, 0, TAU); ctx.fill(); }); });
      Q24.block(ctx, mx, my + r + 18, 64, 46, '20 kg', { c1: '#1f2937', c2: '#6b7280', c3: '#111827' });
      const hk = Q24.sb(ctx, px - r, hy, 96, F, 200, { rx: -46 }); C2.hand(ctx, px - r + 4, hk + 6, 1, 1.05, { rot: -Math.PI / 2, sleeve: '#0ea5e9' });
      const pxm = h * .5 / 1.0, d = S.pull / pxm, hh = d / 2, Win = F * d, Wout = W * hh, ef = Win > 0 ? Wout / Win : e;
      if (p.bars !== false) { const bx = w - 230, by = h * .8, sc = (h * .35) / (W / 2 / .6 * 1); [[Win, 'الشغل المنجز F×d', '#dc2626'], [Wout, 'الشغل الناتج W×h', '#15803d'], [Win - Wout, 'المفقود (حرارة)', '#f97316']].forEach(([v, l, c], i) => { const x = bx + i * 72, hh2 = Math.max(0, v) * sc; K.raw(ctx, () => { ctx.fillStyle = c; rr(ctx, x, by - hh2, 46, hh2, 4); ctx.fill(); }); Q24.T(ctx, fmt(v, 3) + ' J', x + 23, by - hh2 - 12, { s: 11, w: 900, c }); Q24.T(ctx, l, x + 23, by + 14, { s: 10, w: 800, c: '#334155' }); }); }
      Q24.lines(ctx, [{ t: 'W = 20 × 9.8 = 196 N ، F = ' + fmt(F, 4) + ' N', c: '#1e293b', mono: 1 }, { t: 'الحبل: d = ' + fmt(d, 3) + ' m ، الثقل: h = ' + fmt(hh, 3) + ' m', c: '#1e293b', mono: 1 }, { t: 'الكفاءة = W×h ÷ F×d × 100% = ' + fmt(ef * 100, 3) + '%', c: '#7c3aed', w: 900 }, { t: LUB[p.lub].n, c: '#b45309', w: 900 }], w - 14, 44, Math.min(340, w * .46), { title: 'كفاءة نظام البكرات', bd: '#9333ea' });
    },
    drags(S) { if (!S.W || S.p.sc !== 'lift') return []; const h = S.H, r = clamp(h * .05, 24, 36), px = 70 + (S.W - 70) * .3; const y = h * .32 + S.pull + 96 + 30;
      return [{ id: 'hand', x: px - r, y: y + 20, w: 70, h: 90, axis: 'y', keep: true, tip: 'اسحب إلى الأسفل', idle: 'اسحب للأسفل ✋', down: S => { S.auto = 0; S.p0 = S.pull; }, drag: (S, d) => { S.pull = clamp(S.p0 + d.y - d.sy, 0, S.H * .5); } }]; },
    readings(S) { const p = S.p; if (p.sc === 'q7') { const Eo = Math.min(p.Eout, p.Ein); return [rd('الطاقة الداخلة', p.Ein + ' J'), rd('الطاقة الخارجة', Eo + ' J'), rd('الطاقة الضائعة', (p.Ein - Eo) + ' J'), rd('الكفاءة', fmt(Eo / p.Ein * 100, 3) + '%')]; }
      const e = D.eff(S), F = 196 / 2 / e, d = S.pull / (S.H * .5); return [rd('القوة F', fmt(F, 4) + ' N'), rd('سحب الحبل d', fmt(d, 3) + ' m'), rd('ارتفاع الثقل h', fmt(d / 2, 3) + ' m'), rd('الشغل المنجز', fmt(F * d, 4) + ' J'), rd('الشغل الناتج', fmt(196 * d / 2, 4) + ' J'), rd('الكفاءة', fmt(e * 100, 3) + '%')]; },
    record(S) { const p = S.p; if (p.sc === 'q7') { const Eo = Math.min(p.Eout, p.Ein); return { k: 'مخطط', a: p.Ein, b: Eo, c: p.Ein - Eo, e: +(Eo / p.Ein * 100).toFixed(1) }; } const e = D.eff(S), d = S.pull / (S.H * .5); if (d < .1) { Runner.toast('اسحب الحبل أولاً', 'info'); return null; } return { k: LUB[p.lub].n, a: +(196 / 2 / e * d).toFixed(1), b: +(98 * d).toFixed(1), c: +(196 / 2 / e * d - 98 * d).toFixed(1), e: +(e * 100).toFixed(1) }; },
    cols: [['k', 'الحالة'], ['a', 'الداخلة (J)'], ['b', 'الخارجة (J)'], ['c', 'الضائعة (J)'], ['e', 'الكفاءة %']],
    explain(S) { const e = D.eff(S); return '<b>ماذا ترى؟</b> جزء فقط من الطاقة يخرج مفيداً، والباقي يصبح حرارة.<br><b>لماذا؟</b> الأجزاء المتحركة تحتك ببعضها، والاحتكاك يحوّل جزءاً من الطاقة إلى حرارة. الكفاءة الآن <b>' + fmt(e * 100, 3) + '%</b>.<br><b>في حياتنا:</b> نضع الزيت في محرك السيارة ونستعمل محامل الكريات في الدراجة لتقليل الاحتكاك وزيادة الكفاءة.'; }
  };
  M8.P[D.id] = D;
})();
/* =========================================================================================
   10) نشاط (ص 51): الآلات البسيطة في حياتنا + الآلات المركبة (ص 53) + مخطط المفاهيم (س8 ص 55)
   ========================================================================================= */
(() => {
  const TY = [['lever', 'العتلة'], ['incline', 'السطح المائل'], ['screw', 'البريمة'], ['wedge', 'الأسفين'], ['wheel', 'العجلة والمحور'], ['pulley', 'البكرة']];
  const CARDS = [['🛝', 'زحليقة الأطفال', 'incline'], ['♿', 'منحدر الكراسي', 'incline'], ['🔩', 'برغي', 'screw'], ['🫙', 'غطاء القنينة', 'screw'], ['🪓', 'الفأس', 'wedge'], ['🔪', 'السكين', 'wedge'], ['🚪', 'مقبض الباب', 'wheel'], ['🛞', 'عجلة القيادة', 'wheel'], ['🏗️', 'رافعة البناء', 'pulley'], ['🚩', 'سارية العلم', 'pulley'], ['✂️', 'المقص', 'lever'], ['⚖️', 'الميزان ذو الكفتين', 'lever']];
  const BIKE = [['pedal', 'الدواسة وذراعها', 'عجلة ومحور: ذراع الدواسة الطويل (العجلة) يدير المسنن (المحور) بقوة صغيرة.'], ['brake', 'ذراع الفرامل', 'عتلة: تضغط بأصابعك على ذراع طويل فيشدّ السلك بقوة أكبر.'], ['bar', 'المقود', 'عجلة ومحور: المقود العريض يدير العجلة الأمامية بسهولة.'], ['hub', 'محور العجلة', 'محمل الكريات + الشحم يقللان الاحتكاك فتزداد الكفاءة (ص 53).'], ['gear', 'المسننات والسلسلة', 'عجلات مسننة متصلة بسلسلة تنقل الحركة من الدواسة إلى العجلة الخلفية.']];
  const MAP = { slots: [['t2', 'النوع الثاني'], ['t3', 'النوع الثالث'], ['g1', 'ربح قوة أو ربح سرعة'], ['g3', 'ربح سرعة']], chips: ['النوع الثاني', 'ربح سرعة', 'النوع الثالث', 'ربح قوة وسرعة معاً', 'ربح قوة أو ربح سرعة'] };
  const D = { id: 'g8_life_main', ch: 24, page: 51, desc: 'ابحث عن الآلات البسيطة التي نستخدمها في حياتنا اليومية ونظّمها في جدول على قطعة كارتونية. ثم تعرّف على الآلات المركبة مثل الدراجة، وأكمل مخطط المفاهيم.',
    tags: 'الآلات البسيطة في حياتنا لوحة جدول آلات مركبة دراجة محمل كريات تشحيم مخطط مفاهيم', tools: ['قطعة كارتونية', 'صور الآلات'],
    steps: ['مشهد «لوحة الآلات البسيطة» (نشاط ص 51): اسحب كل بطاقة إلى عمود نوع الآلة على اللوحة الكارتونية.', 'مشهد «الدراجة آلة مركبة» (ص 53): اضغط على أجزاء الدراجة لتكتشف الآلات البسيطة فيها.', 'مشهد «مخطط المفاهيم» (س8 ص 55): اسحب البطاقات إلى المربعات الفارغة.'],
    concl: ['الآلات البسيطة ستة أنواع: العتلة، السطح المائل، البريمة، الأسفين، العجلة والمحور، البكرة.', 'الآلة المركبة تتكوّن من آلتين بسيطتين أو أكثر تعمل معاً، وفائدتها الميكانيكية أكبر بكثير (حاصل ضرب فوائد أجزائها).', 'محمل الكريات والتشحيم يقللان الاحتكاك بين الأجزاء المتحركة فتزداد الكفاءة وتقل الحرارة والتلف.'],
    laws: ['g8_ma', 'g8_eff'],
    controls: [SEL('sc', 'المشهد', [['poster', '🗂️ لوحة الآلات البسيطة'], ['bike', '🚲 الدراجة آلة مركبة'], ['map', '🧩 مخطط المفاهيم (س8)']], 'poster'), BT('', [{ t: '↺ من جديد', on: S => D.reset(S) }]), TG('hint', 'تلميحات', true, null, 'labels')],
    setup(S) { D.reset(S); },
    reset(S) { S.pl = {}; S.nOk = 0; S.err = 0; S.hold = ''; S.found = {}; S.nF = 0; S.sel = ''; S.mp = {}; S.nM = 0; },
    geo(S) { const w = S.W, h = S.H; return { w, h }; },
    cardRects(S) { const w = S.W, n = CARDS.length, per = Math.min(6, Math.floor((w - 90) / 100)), cw = Math.min(118, (w - 90) / per - 8), ch = 56; return CARDS.map((c, i) => ({ x: Q24.cx(w) + ((per - 1) / 2 - i % per) * (cw + 8), y: 66 + Math.floor(i / per) * (ch + 8) + ch / 2, w: cw, h: ch })); },
    colsR(S) { const w = S.W, h = S.H, x0 = 74, x1 = w - 14, cw = (x1 - x0) / 6; return TY.map((t, i) => ({ k: t[0], n: t[1], x: x1 - cw / 2 - i * cw, y: h * .42, w: cw - 6, h: h * .48 })); },
    draw(ctx, w, h, S) { K.bg(ctx, w, h, { benchY: h * .97 }); const sc = S.p.sc; if (sc === 'poster') D.dPoster(ctx, w, h, S); else if (sc === 'bike') D.dBike(ctx, w, h, S); else D.dMap(ctx, w, h, S); C2.drawMsg(ctx, S, Q24.cx(w), h * .4); K.party(ctx, S); },
    dPoster(ctx, w, h, S) {
      const C = D.colsR(S); K.raw(ctx, () => { ctx.fillStyle = '#d6b88a'; rr(ctx, 70, h * .4 - 30, w - 80, h * .52 + 34, 10); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 2; ctx.stroke(); });
      Q24.T(ctx, 'لوحة: الآلات البسيطة في حياتنا', Q24.cx(w), h * .4 - 14, { s: 13, w: 900, c: '#78350f' });
      const hot = S.hold ? D.colAt(S, S.hx, S.hy) : '';
      C.forEach(c => { K.raw(ctx, () => { ctx.fillStyle = hot === c.k ? 'rgba(220,252,231,.95)' : 'rgba(255,251,235,.92)'; rr(ctx, c.x - c.w / 2, c.y, c.w, c.h, 8); ctx.fill(); ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.2; ctx.stroke(); }); Q24.T(ctx, c.n, c.x, c.y + 14, { s: c.w < 90 ? 10.5 : 12, w: 900, c: '#7c2d12' });
        let r = 0; CARDS.forEach((cd, i) => { if (S.pl[i] !== c.k) return; Q24.T(ctx, cd[0] + ' ' + cd[1], c.x, c.y + 40 + r * 24, { s: c.w < 90 ? 10 : 11.5, w: 800, c: '#15803d' }); r++; }); });
      const R0 = D.cardRects(S); CARDS.forEach((cd, i) => { if (S.pl[i]) return; const r = S.hold === 'c' + i ? { x: S.hx, y: S.hy, w: R0[i].w, h: R0[i].h } : R0[i]; D.card(ctx, r, cd, S.hold === 'c' + i); });
      if (S.nOk === CARDS.length) Q24.T(ctx, 'رائع! اكتملت اللوحة ✓', Q24.cx(w), h * .36, { s: 14, w: 900, c: '#fff', bg: '#15803d' });
    },
    card(ctx, r, cd, lift) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = lift ? 14 : 4; ctx.fillStyle = '#fff'; rr(ctx, r.x - r.w / 2, r.y - r.h / 2, r.w, r.h, 9); ctx.fill(); ctx.restore(); ctx.strokeStyle = '#c4b5fd'; ctx.lineWidth = 1.5; rr(ctx, r.x - r.w / 2, r.y - r.h / 2, r.w, r.h, 9); ctx.stroke(); ctx.font = '24px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(cd[0], r.x, r.y - 9); ctx.textBaseline = 'alphabetic'; }); Q24.T(ctx, cd[1], r.x, r.y + 17, { s: 10.5, w: 900, c: '#3b0764' }); },
    colAt(S, x, y) { const c = D.colsR(S).find(c => Math.abs(x - c.x) <= c.w / 2 && y >= c.y - 30 && y <= c.y + c.h); return c ? c.k : ''; },
    bikeGeo(S) { const w = S.W, h = S.H, r = clamp(Math.min(w * .1, h * .13), 44, 90), x = 70 + (w - 70) * .42, y = h * .78; const b = [x - r * 1.25, y - r], f = [x + r * 1.25, y - r]; return { r, x, y, spots: { pedal: [x - r * .05, y - r * .95], brake: [x + r * .82, y - r * 2.3], bar: [x + r * .7, y - r * 2.28], hub: b, gear: [x - r * .6, y - r * .97] } }; },
    dBike(ctx, w, h, S) { const g = D.bikeGeo(S); Q24.banner(ctx, w, 'اضغط على أجزاء الدراجة لتكتشف الآلات البسيطة فيها ✋', '#9333ea', 20);
      K.raw(ctx, () => { ctx.fillStyle = '#d1d5db'; ctx.fillRect(0, g.y, w, h - g.y); }); Q22.bike(ctx, g.x, g.y, g.r, S.t * 1.5, '#dc2626');
      K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; const pd = g.spots.pedal; ctx.beginPath(); ctx.arc(pd[0], pd[1], g.r * .22, 0, TAU); ctx.stroke(); const a = S.t * 1.5; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(pd[0], pd[1]); ctx.lineTo(pd[0] + Math.cos(a) * g.r * .45, pd[1] + Math.sin(a) * g.r * .45); ctx.stroke(); ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(pd[0], pd[1] - g.r * .22); ctx.lineTo(g.spots.hub[0], g.spots.hub[1] - g.r * .1); ctx.moveTo(pd[0], pd[1] + g.r * .22); ctx.lineTo(g.spots.hub[0], g.spots.hub[1] + g.r * .1); ctx.stroke(); ctx.setLineDash([]); });
      const t = performance.now() / 1000; BIKE.forEach(([k, n]) => { const [x, y] = g.spots[k]; const f = S.found[k]; K.raw(ctx, () => { ctx.strokeStyle = f ? '#16a34a' : '#f59e0b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 16 + (f ? 0 : 3 * Math.sin(t * 4)), 0, TAU); ctx.stroke(); }); if (f || S.p.hint !== false) Q24.T(ctx, f ? '✓ ' + n : '؟', x, y - 28, { s: 11.5, w: 900, c: '#fff', bg: f ? '#16a34a' : '#f59e0b' }); });
      if (S.sel) { const it = BIKE.find(q => q[0] === S.sel); Q24.lines(ctx, [{ t: it[2], c: '#1e293b', s: 12 }], w - 14, 44, Math.min(w - 90, 520), { title: it[1], bd: '#16a34a' }); }
      Q24.T(ctx, 'اكتشفت ' + S.nF + ' من ' + BIKE.length, 140, h * .3, { s: 13, w: 900, c: '#fff', bg: '#7c3aed' });
      if (S.nF === BIKE.length) Q24.T(ctx, 'الدراجة آلة مركبة: عدة آلات بسيطة تعمل معاً ✓', Q24.cx(w), h * .22, { s: 13, w: 900, c: '#fff', bg: '#15803d' }); },
    mapGeo(S) { const w = S.W, h = S.H, cx = Q24.cx(w), bw = Math.min(150, (w - 110) / 3 - 10), dx = bw + 20; const top = [cx, h * .2]; const row = [h * .38, h * .55]; const cols = [cx + dx, cx, cx - dx];
      return { bw, top, row, cols, boxes: { t1: [cols[0], row[0], 'النوع الأول'], t2: [cols[1], row[0]], t3: [cols[2], row[0]], g1: [cols[0], row[1]], g2: [cols[1], row[1], 'ربح قوة'], g3: [cols[2], row[1]] }, chipY: h * .78 }; },
    chipRects(S) { const g = D.mapGeo(S), n = MAP.chips.length, cw = Math.min(150, (S.W - 90) / n - 8); return MAP.chips.map((c, i) => ({ x: Q24.cx(S.W) + ((n - 1) / 2 - i) * (cw + 8), y: g.chipY, w: cw, h: 38 })); },
    dMap(ctx, w, h, S) { const g = D.mapGeo(S); Q24.banner(ctx, w, 'أكمل مخطط المفاهيم: اسحب البطاقات إلى المربعات الفارغة ✋', '#9333ea', 20);
      K.raw(ctx, () => { ctx.strokeStyle = '#86efac'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.top[0], g.top[1] + 20); ctx.lineTo(g.top[0], g.top[1] + 45); ctx.moveTo(g.cols[2], g.top[1] + 45); ctx.lineTo(g.cols[0], g.top[1] + 45); g.cols.forEach(x => { ctx.moveTo(x, g.top[1] + 45); ctx.lineTo(x, g.row[0] - 18); ctx.moveTo(x, g.row[0] + 18); ctx.lineTo(x, g.row[1] - 18); }); ctx.stroke(); });
      const box = (x, y, s, fill, hot) => { K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, y - 18, 0, y + 18); gr.addColorStop(0, fill ? '#dcfce7' : '#f0fdf4'); gr.addColorStop(1, fill ? '#86efac' : '#dcfce7'); ctx.fillStyle = gr; rr(ctx, x - g.bw / 2, y - 18, g.bw, 36, 10); ctx.fill(); ctx.strokeStyle = hot ? '#15803d' : '#4ade80'; ctx.lineWidth = hot ? 3 : 1.5; ctx.setLineDash(fill ? [] : [6, 4]); ctx.stroke(); ctx.setLineDash([]); }); if (s) Q24.T(ctx, s, x, y, { s: 12, w: 900, c: '#14532d' }); };
      box(g.top[0], g.top[1], 'العتلات', 1);
      const hot = S.hold ? D.slotAt(S, S.hx, S.hy) : ''; Object.entries(g.boxes).forEach(([k, b]) => box(b[0], b[1], b[2] || S.mp[k] || '', !!(b[2] || S.mp[k]), hot === k));
      const R0 = D.chipRects(S); MAP.chips.forEach((c, i) => { if (Object.values(S.mp).includes(c)) return; const r = S.hold === 'm' + i ? { x: S.hx, y: S.hy, w: R0[i].w, h: 38 } : R0[i]; C2.btn(ctx, r.x, r.y, r.w, 36, c, { col: '#0f766e', s: 11.5 }); });
      if (S.nM === MAP.slots.length) Q24.T(ctx, 'اكتمل المخطط ✓', Q24.cx(w), h * .68, { s: 14, w: 900, c: '#fff', bg: '#15803d' }); },
    slotAt(S, x, y) { const g = D.mapGeo(S); const k = MAP.slots.map(q => q[0]).find(k => { const b = g.boxes[k]; return Math.abs(x - b[0]) <= g.bw / 2 + 10 && Math.abs(y - b[1]) <= 30; }); return k || ''; },
    drags(S) {
      if (!S.W) return []; const sc = S.p.sc, out = [];
      if (sc === 'poster') { const R0 = D.cardRects(S); CARDS.forEach((cd, i) => { if (S.pl[i]) return; const r = S.hold === 'c' + i ? { x: S.hx, y: S.hy } : R0[i]; out.push({ id: 'card' + i, x: r.x, y: r.y, w: R0[i].w, h: R0[i].h, axis: 'xy', keep: true, tip: 'اسحب «' + cd[1] + '» إلى عمود نوعها', hint: i === 0, idle: i === 0 ? 'اسحبني إلى اللوحة ✋' : undefined,
        down: (S, px, py) => { S.hold = 'c' + i; S.hx = r.x; S.hy = r.y; S.ox = px - r.x; S.oy = py - r.y; }, drag: (S, d) => { S.hx = d.x - S.ox; S.hy = d.y - S.oy; },
        up: S => { const k = D.colAt(S, S.hx, S.hy); if (k) { if (k === cd[2]) { S.pl[i] = k; S.nOk++; if (S.nOk === CARDS.length) K.cheer(S, Q24.cx(S.W), S.H * .4); } else { S.err++; C2.msg(S, cd[1] + ' ليس ' + TY.find(t => t[0] === k)[1] + '\nفكّر: كيف يعمل؟', 2.5); } } S.hold = ''; } }); }); }
      else if (sc === 'bike') { const g = D.bikeGeo(S); BIKE.forEach(([k, n]) => { const [x, y] = g.spots[k]; out.push({ id: 'b_' + k, x, y, r: 24, tip: n, hint: k === 'pedal', idle: k === 'pedal' ? 'اضغطني ✋' : undefined, click: S => { S.sel = k; if (!S.found[k]) { S.found[k] = 1; S.nF++; if (S.nF === BIKE.length) K.cheer(S, Q24.cx(S.W), S.H * .3); } } }); }); }
      else { const R0 = D.chipRects(S); MAP.chips.forEach((c, i) => { if (Object.values(S.mp).includes(c)) return; const r = S.hold === 'm' + i ? { x: S.hx, y: S.hy } : R0[i]; out.push({ id: 'chip' + i, x: r.x, y: r.y, w: R0[i].w, h: 40, axis: 'xy', keep: true, tip: 'اسحب البطاقة إلى مربع', hint: i === 0, idle: i === 0 ? 'اسحبني ✋' : undefined,
        down: (S, px, py) => { S.hold = 'm' + i; S.hx = r.x; S.hy = r.y; S.ox = px - r.x; S.oy = py - r.y; }, drag: (S, d) => { S.hx = d.x - S.ox; S.hy = d.y - S.oy; },
        up: S => { const k = D.slotAt(S, S.hx, S.hy); if (k && !S.mp[k]) { const want = MAP.slots.find(q => q[0] === k)[1]; if (want === c) { S.mp[k] = c; S.nM++; if (S.nM === MAP.slots.length) K.cheer(S, Q24.cx(S.W), S.H * .5); } else { S.err++; C2.msg(S, 'ليس هنا! تذكّر: النوع الثاني ربح قوة فقط، والنوع الثالث ربح سرعة فقط', 3); } } S.hold = ''; } }); }); }
      return out;
    },
    readings(S) { const sc = S.p.sc; if (sc === 'poster') return [rd('البطاقات المصنّفة', S.nOk + ' / ' + CARDS.length), rd('الأخطاء', S.err)]; if (sc === 'bike') return [rd('الأجزاء المكتشفة', S.nF + ' / ' + BIKE.length)]; return [rd('المربعات المكتملة', S.nM + ' / ' + MAP.slots.length), rd('الأخطاء', S.err)]; },
    record(S) { if (S.p.sc !== 'poster' || S.nOk < CARDS.length) { Runner.toast('أكمل لوحة الآلات البسيطة أولاً', 'info'); return null; } const o = {}; TY.forEach(t => o[t[0]] = CARDS.filter((c, i) => S.pl[i] === t[0]).map(c => c[1]).join('، ')); return o; },
    cols: TY.map(t => [t[0], t[1]]),
    explain(S) { const sc = S.p.sc; if (sc === 'poster') return '<b>ماذا تفعل؟</b> تصنّف أدوات من حياتك حسب نوع الآلة البسيطة.<br><b>كيف تعرف؟</b> اسأل: هل تدور حول مرتكز (عتلة)؟ هل هي سطح منحدر (سطح مائل)؟ هل هي سطح ملفوف (بريمة)؟ هل لها حافة رقيقة تشق (أسفين)؟ هل فيها دائرتان تدوران معاً (عجلة ومحور)؟ هل فيها حبل على عجلة (بكرة)؟';
      if (sc === 'bike') return '<b>الدراجة آلة مركبة:</b> فيها عتلات (الفرامل)، وعجلات ومحاور (الدواسة والمقود)، ومحامل كريات تقلل الاحتكاك. الآلة المركبة تجمع عدة آلات بسيطة فتصبح فائدتها أكبر.';
      return 'في <b>النوع الأول</b> قد نحصل على ربح قوة أو ربح سرعة، و<b>النوع الثاني</b> يعطي ربح قوة فقط، و<b>النوع الثالث</b> يعطي ربح سرعة فقط. لا يمكن الحصول على ربح القوة والسرعة معاً!'; }
  };
  M8.P[D.id] = D;
})();
/* simple daily-life line appended to each part's explanation (teacher: explain for a 13-year-old) */
(() => { const LIFE = {
  g8_lever_law: 'الأرجوحة (السيسو) تتزن عندما يجلس الطفل الأثقل أقرب إلى المرتكز: الوزن × البعد متساوٍ في الجهتين.',
  g8_lever_types: 'المقص والميزان (النوع الأول)، فتّاحة القناني وكسارة البندق (النوع الثاني)، الملقط والكابسة وساعدك (النوع الثالث).',
  g8_lever_examples: 'هكذا يحسب المهندسون القوة اللازمة لرفع الأثقال بالعتلات: نحوّل الأطوال إلى المتر ثم نطبّق القانون.',
  g8_lever_sort: 'ابحث في مطبخ بيتك: الملعقة التي تفتح بها علبة، الملقط، فتّاحة القناني… كلها عتلات!',
  g8_incline: 'منحدر الكراسي المتحركة عند المستشفى، والطرق الجبلية المتعرجة، ولوح تحميل البضائع في الشاحنات.',
  g8_screw_wedge: 'غطاء القنينة والبرغي (بريمة)، والفأس والسكين ورأس المسمار (أسفين).',
  g8_wheel_axle: 'مقبض الباب، المفك، عجلة القيادة، ومقبض صنبور الماء: كلها عجلة ومحور.' };
  Object.keys(LIFE).forEach(k => { const D = M8.P[k]; if (!D) return; const ex = D.explain; D.explain = S => (ex ? ex(S) : '') + '<br><b>في حياتنا:</b> ' + LIFE[k]; }); })();
/* =========================================================================================
   Merged experiments (teacher feedback: one lesson → one or two rich experiments with parts)
   ========================================================================================= */
M8.merge({ id: 'g8_levers', ch: 24, sec: 'نشاط استهلالي + الدرس 1: العتلات', page: 45, kind: 'نشاط',
  title: 'العتلات: قانون العتلات، أنواعها الثلاثة، والفائدة الميكانيكية',
  desc: 'العتلة جسم صلب يدور حول مرتكز ثابت. نكتشف قانون العتلات بالمسطرة والأثقال والميزان النابضي، ثم نتعرف على الأنواع الثلاثة بأمثلة حقيقية، ونحل أمثلة الكتاب، ونصنّف عتلات من حياتنا.',
  tags: 'عتلات قانون العتلات أنواع العتلات فائدة ميكانيكية',
  fact: ['حقيقة علمية: لا يمكن الحصول على ربح قوة وربح سرعة من العتلة في آن واحد (ص 48).', 'قال أرخميدس: «أعطوني مكاناً أقف عليه وعتلة طويلة بما يكفي وسأحرّك الأرض».', 'ساعدك عتلة من النوع الثالث: المرفق مرتكز، والعضلة تسحب قرب المرفق، واليد تحمل الثقل بعيداً.'],
  quiz: [
    { q: 'لماذا تمثل كابسة الورق عتلة من النوع الثالث؟', o: ['لأن المرتكز بين القوة والمقاومة', 'لأن القوة تقع بين المرتكز والمقاومة', 'لأن المقاومة بين المرتكز والقوة'], a: 1, why: 'مراجعة الدرس س1.' },
    { q: 'عتلة طولها 80 cm ترتكز على أحد طرفيها، عُلّق فيها ثقل 60 N على بعد 20 cm من المرتكز. القوة اللازمة في الطرف الآخر لتتزن أفقياً:', o: ['15 N', '240 N', '30 N'], a: 0, why: 'س6: F × 0.8 = 60 × 0.2 ⟸ F = 15 N ، M.A = 4.' },
    { q: 'ما نوع العتلة التي تكون القوة المؤثرة فيها دائماً أقل من المقاومة؟', o: ['النوع الأول', 'النوع الثاني', 'النوع الثالث'], a: 1, why: 'مراجعة الدرس س3: النوع الثاني ربح قوة دائماً.' }
  ],
  parts: [{ id: 'g8_lever_law', n: 'قانون العتلات (نشاط استهلالي)' }, { id: 'g8_lever_types', n: 'أنواع العتلات الثلاثة' }, { id: 'g8_lever_examples', n: 'أمثلة محلولة (مثال 1، 2، 3)' }, { id: 'g8_lever_sort', n: 'نشاط: صنّف العتلات' }] });
M8.merge({ id: 'g8_incline_wheel', ch: 24, sec: 'الدرس 2: السطح المائل والبريمة والأسفين والعجلة والمحور', page: 49, kind: 'نشاط',
  title: 'السطح المائل والبريمة والأسفين والعجلة والمحور',
  desc: 'آلات بسيطة نحصل منها على ربح قوة: السطح المائل (M.A = L/h)، البريمة (سطح مائل ملفوف)، الأسفين (سطحان مائلان متقابلان)، والعجلة والمحور (M.A = R/r).',
  tags: 'سطح مائل بريمة أسفين عجلة محور',
  fact: ['الطرق الجبلية المتعرجة سطوح مائلة طويلة تقلل القوة اللازمة لصعود السيارات.', 'رأس المسمار المدبب أسفين صغير يجعل دخوله في الخشب أسهل (ص 50).', 'عجلة القيادة الكبيرة في الشاحنات تجعل تدوير العجلات الثقيلة ممكناً بقوة اليد.'],
  quiz: [
    { q: 'منحدر طوله 20 m وارتفاعه 4 m. فائدته الميكانيكية:', o: ['5', '80', '16'], a: 0, why: 'مراجعة الفصل س5 (2): M.A = L/h = 20 ÷ 4 = 5.' },
    { q: 'تسمّى المسافة بين لفتين متتاليتين في البريمة بـ:', o: ['ذراع المقاومة', 'درجة البريمة', 'المحور'], a: 1, why: 'مراجعة الفصل س2-1.' },
    { q: 'نحصل على ربح قوة في العجلة والمحور لأن:', o: ['نصف قطر العجلة أكبر من نصف قطر المحور', 'نصف قطر المحور أكبر', 'العجلة أثقل من المحور'], a: 0, why: 'مراجعة الدرس س2-ب.' }
  ],
  parts: [{ id: 'g8_incline', n: 'السطح المائل (مثال 1)' }, { id: 'g8_screw_wedge', n: 'البريمة والأسفين' }, { id: 'g8_wheel_axle', n: 'العجلة والمحور' }] });
M8.merge({ id: 'g8_pulleys', ch: 24, sec: 'الدرس 2: البكرة', page: 51, kind: 'نشاط',
  title: 'البكرات: الثابتة والمتحركة ونظام البكرات',
  desc: 'البكرة عجلة تدور حول محور، فيها أخدود يمر فيه حبل. البكرة الثابتة تغيّر اتجاه القوة (M.A = 1)، والمتحركة تعطي ربح قوة يساوي 2، ونجمعهما معاً لزيادة ربح القوة.',
  tags: 'بكرات بكرة ثابتة متحركة',
  fact: ['تستعمل البكرة الثابتة في رفع العلم على السارية وسحب الدلو من البئر.', 'رافعات البناء تستعمل مجموعات بكرات فترفع أطناناً بمحرك صغير.'],
  quiz: [
    { q: 'تُستعمل البكرة الثابتة لـ:', o: ['تغيير اتجاه القوة فقط', 'تغيير مقدار القوة واتجاهها', 'الحصول على فائدة ميكانيكية أكبر من واحد'], a: 0, why: 'مراجعة الفصل س2-2.' },
    { q: 'تمثل البكرة المتحركة:', o: ['عتلة من النوع الأول', 'عتلة من النوع الثاني', 'عتلة من النوع الثالث'], a: 1, why: 'مراجعة الفصل س2-3: ذراع القوة ضعف ذراع المقاومة.' },
    { q: 'استُعملت بكرة لرفع جسم كتلته 200 kg بقوة تساوي نصف وزنه (g = 10 N/kg). نوع البكرة وفائدتها الميكانيكية:', o: ['ثابتة، 1', 'متحركة، 2', 'متحركة، 0.5'], a: 1, why: 'س4: W = 2000 N ، F = 1000 N ⟸ M.A = 2 ⟸ بكرة متحركة.' }
  ],
  parts: [{ id: 'g8_pul_fixed', n: 'البكرة الثابتة (شكل 5)' }, { id: 'g8_pul_movable', n: 'البكرة المتحركة' }, { id: 'g8_pul_system', n: 'نظام البكرة الثابتة والمتحركة' }] });
M8.merge({ id: 'g8_efficiency', ch: 24, sec: 'الدرس 2: كفاءة الآلة + الفيزياء والمجتمع', page: 51, kind: 'نشاط',
  title: 'كفاءة الآلة، والآلات البسيطة والمركبة في حياتنا',
  desc: 'لا توجد آلة مثالية: جزء من الطاقة يضيع حرارةً بسبب الاحتكاك، وكفاءة الآلة = الطاقة الخارجة ÷ الطاقة الداخلة × 100%. ثم نبحث عن الآلات البسيطة في حياتنا، ونكتشف الآلات المركبة كالدراجة، ونكمل مخطط المفاهيم.',
  tags: 'كفاءة الآلة آلات مركبة نشاط مراجعة',
  fact: ['القطار المغناطيسي المعلق (ماجليف) يُرفع بالمغانط فيقل الاحتكاك جداً، فكفاءته عالية (ص 53).', 'الآلة المثالية كفاءتها 100% ويستحيل صنعها، لأن الأجزاء المتحركة تحتك دائماً.'],
  quiz: [
    { q: 'احسب كفاءة آلة إذا كانت الطاقة الداخلة 200 J لتنتج طاقة 120 J:', o: ['60%', '40%', '166%'], a: 0, why: 'س7: 120 ÷ 200 × 100% = 60% ، والطاقة الضائعة 80 J.' },
    { q: 'لماذا تكون الطاقة الداخلة إلى الآلة أكبر من الطاقة الخارجة؟', o: ['لأن جزءاً منها يتحول إلى حرارة بسبب الاحتكاك', 'لأن الآلة تصنع طاقة', 'لأن الآلة تقلل الشغل'], a: 0, why: 'مراجعة الدرس س3.' },
    { q: 'لماذا الشغل الناتج دائماً أقل من الشغل المنجز في الآلة؟', o: ['بسبب الاحتكاك', 'بسبب الجاذبية', 'لأن الآلة صغيرة'], a: 0, why: 'مراجعة الفصل س3-3.' }
  ],
  parts: [{ id: 'g8_eff_main', n: 'كفاءة الآلة (س7)' }, { id: 'g8_life_main', n: 'الآلات في حياتنا والآلات المركبة' }] });
/* END */
