'use strict';
/* ====================== الخامس العلمي — الفصل السادس: الديناميكا الحرارية (ch 56, ص 119–130) ======================
   Merged experiments (book order): g11_c6_sys (6-1, 6-2) · g11_c6_first (6-3) · g11_c6_apps (6-4) · g11_c6_engine (6-5, 6-6)
   · g11_c6_review (أسئلة ومسائل ص 129–130).
   Local kit Q56 = Q42 + gas cylinders with moving molecules, flames, heat/work arrows, reservoirs, thermometers. */
const Q56 = Object.assign(Object.create(Q42), {
  ease(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  f(v, d = 1) { return Q52.f(v, d); },
  /* trim trailing zeros */
  n(v, d = 2) { const s = Q52.f(v, d); return s.indexOf('.') >= 0 ? s.replace(/\.?0+$/, '') : s; },
  sg(v) { return v > 1e-9 ? '+' : v < -1e-9 ? '−' : ''; },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#fff7ed'); g.addColorStop(1, '#e7e5e4'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  /* temperature tint: k = 0 cold (blue) … 1 hot (red) */
  tc(k, a = 1) { k = clamp(k, 0, 1); const c0 = [59, 130, 246], c1 = [239, 68, 68], m = [250, 204, 21]; const q = k < .5 ? c0.map((v, i) => v + (m[i] - v) * k * 2) : m.map((v, i) => v + (c1[i] - v) * (k - .5) * 2); return 'rgba(' + q.map(Math.round).join(',') + ',' + a + ')'; },
  /* gas molecules in normalised coordinates */
  gasInit(n, seed = 1) { const out = []; let s = seed * 9301 + 49297; const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; for (let i = 0; i < n; i++) out.push({ u: .05 + .9 * r(), v: .05 + .9 * r(), a: r() * TAU, s: .7 + .6 * r() }); return out; },
  gasStep(P, dt, spd, ax = 1, ay = 1) { P.forEach(p => { p.u += Math.cos(p.a) * spd * p.s * dt / ax; p.v += Math.sin(p.a) * spd * p.s * dt / ay;
    if (p.u < .03) { p.u = .03; p.a = Math.PI - p.a; } if (p.u > .97) { p.u = .97; p.a = Math.PI - p.a; } if (p.v < .03) { p.v = .03; p.a = -p.a; } if (p.v > .97) { p.v = .97; p.a = -p.a; } }); },
  gasDraw(ctx, P, x0, y0, x1, y1, col = '#2563eb', r = 3.4) { K.raw(ctx, () => { P.forEach(p => { const x = x0 + p.u * (x1 - x0), y = y0 + p.v * (y1 - y0); const g = ctx.createRadialGradient(x - r * .3, y - r * .3, .4, x, y, r); g.addColorStop(0, '#fff'); g.addColorStop(.45, col); g.addColorStop(1, shade(col, -50)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }); }); },
  /* vertical cylinder: walls x..x+w, top..bot, piston face at py (gas between py and bot) */
  cyl(ctx, x, top, w, bot, py, o = {}) {
    K.raw(ctx, () => {
      if (o.ins) { ctx.fillStyle = '#fde68a'; rr(ctx, x - 22, top - 4, w + 44, bot - top + 26, 10); ctx.fill(); ctx.strokeStyle = 'rgba(161,98,7,.55)'; ctx.lineWidth = 1.2; ctx.save(); ctx.beginPath(); rr(ctx, x - 22, top - 4, w + 44, bot - top + 26, 10); ctx.clip(); for (let k = -40; k < bot - top + 80; k += 9) { ctx.beginPath(); ctx.moveTo(x - 24, top + k); ctx.lineTo(x + w + 24, top + k - 30); ctx.stroke(); } ctx.restore(); }
      const gt = o.tint || 'rgba(147,197,253,.35)'; ctx.fillStyle = gt; ctx.fillRect(x, py, w, bot - py);
      const gl = ctx.createLinearGradient(x, 0, x + w, 0); gl.addColorStop(0, 'rgba(255,255,255,.28)'); gl.addColorStop(.2, 'rgba(255,255,255,0)'); gl.addColorStop(.85, 'rgba(15,23,42,0)'); gl.addColorStop(1, 'rgba(15,23,42,.12)'); ctx.fillStyle = gl; ctx.fillRect(x, top, w, bot - top);
      const wg = ctx.createLinearGradient(x - 9, 0, x, 0); wg.addColorStop(0, '#475569'); wg.addColorStop(.5, '#e2e8f0'); wg.addColorStop(1, '#64748b'); ctx.fillStyle = wg; ctx.fillRect(x - 9, top, 9, bot - top + 9);
      const wg2 = ctx.createLinearGradient(x + w, 0, x + w + 9, 0); wg2.addColorStop(0, '#64748b'); wg2.addColorStop(.5, '#e2e8f0'); wg2.addColorStop(1, '#475569'); ctx.fillStyle = wg2; ctx.fillRect(x + w, top, 9, bot - top + 9);
      const bg = ctx.createLinearGradient(0, bot, 0, bot + 9); bg.addColorStop(0, '#94a3b8'); bg.addColorStop(1, '#334155'); ctx.fillStyle = bg; ctx.fillRect(x - 9, bot, w + 18, 9);
    });
    if (o.parts) Q56.gasDraw(ctx, o.parts, x + 4, py + 2, x + w - 4, bot - 2, o.pc || '#2563eb', o.pr || 3.4);
    K.raw(ctx, () => {
      const ph = o.ph || 20, pg = ctx.createLinearGradient(0, py - ph, 0, py); pg.addColorStop(0, '#cbd5e1'); pg.addColorStop(.5, '#f8fafc'); pg.addColorStop(1, '#64748b'); ctx.fillStyle = pg; rr(ctx, x + 1, py - ph, w - 2, ph, 3); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.fillStyle = '#1e293b'; ctx.fillRect(x + 1, py - ph * .55, w - 2, 2); ctx.fillRect(x + 1, py - ph * .3, w - 2, 2);
      if (o.rod !== false) { const rg = ctx.createLinearGradient(x + w / 2 - 6, 0, x + w / 2 + 6, 0); rg.addColorStop(0, '#64748b'); rg.addColorStop(.5, '#f1f5f9'); rg.addColorStop(1, '#475569'); ctx.fillStyle = rg; const rt = o.rodTop != null ? o.rodTop : top - 40; ctx.fillRect(x + w / 2 - 6, rt, 12, py - ph - rt);
        ctx.fillStyle = '#b91c1c'; rr(ctx, x + w / 2 - 26, rt - 12, 52, 14, 6); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x + w / 2 - 22, rt - 10, 44, 3); }
      if (o.lock) { ctx.fillStyle = '#0f172a'; [x - 16, x + w + 4].forEach(px => { rr(ctx, px, py - ph * .7, 12, 9, 2); ctx.fill(); }); }
    });
  },
  /* ring of flames across [x0,x1] with tops at y; p 0..1, c = clock */
  flames(ctx, x0, x1, y, p, c) {
    if (p < .02) return; const n = Math.max(3, Math.round((x1 - x0) / 22));
    K.raw(ctx, () => { for (let i = 0; i < n; i++) { const x = x0 + (i + .5) * (x1 - x0) / n, f = 1 + .12 * Math.sin(c * 19 + i * 2.1) + .07 * Math.sin(c * 31 + i), H = (10 + 34 * p) * f;
      const g = ctx.createLinearGradient(0, y, 0, y - H); g.addColorStop(0, 'rgba(37,99,235,.95)'); g.addColorStop(.35, 'rgba(96,165,250,.85)'); g.addColorStop(.7, 'rgba(249,115,22,.75)'); g.addColorStop(1, 'rgba(250,204,21,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 7, y); ctx.quadraticCurveTo(x - 9, y - H * .5, x + Math.sin(c * 7 + i) * 2, y - H); ctx.quadraticCurveTo(x + 9, y - H * .5, x + 7, y); ctx.closePath(); ctx.fill(); } });
  },
  /* gas stove top with burner ring: centre x, top y */
  stove(ctx, x, y, wd, p, c) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + 70); g.addColorStop(0, '#e5e7eb'); g.addColorStop(1, '#9ca3af'); ctx.fillStyle = g; rr(ctx, x - wd / 2, y + 8, wd, 66, 8); ctx.fill(); ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#1f2937'; rr(ctx, x - wd / 2 + 10, y, wd - 20, 10, 3); ctx.fill(); ctx.fillStyle = '#374151'; rr(ctx, x - 60, y - 6, 120, 8, 3); ctx.fill(); });
    Q56.flames(ctx, x - 56, x + 56, y - 6, p, c);
  },
  /* control knob: x, y, value 0..1 */
  knob(ctx, x, y, v, lab) {
    K.raw(ctx, () => { const g = ctx.createRadialGradient(x - 5, y - 5, 2, x, y, 17); g.addColorStop(0, '#f8fafc'); g.addColorStop(1, '#475569'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 16, 0, TAU); ctx.fill(); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 1.5; ctx.stroke();
      const a = Math.PI * (.75 + 1.5 * clamp(v, 0, 1)); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * 12, y + Math.sin(a) * 12); ctx.stroke(); ctx.lineCap = 'butt'; });
    if (lab) Q42.T(ctx, lab, x, y + 28, { s: 10, w: 900, c: '#334155' });
  },
  /* simple thermometer: bulb at (x,yb), height h, fraction k, label text */
  therm(ctx, x, yb, h, k, lab, col = '#ef4444') {
    K.raw(ctx, () => { const top = yb - h, yT = yb - 12 - (h - 22) * clamp(k, 0, 1); ctx.fillStyle = 'rgba(248,250,252,.95)'; rr(ctx, x - 8, top, 16, h, 8); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, yb, 11, 0, TAU); ctx.fill(); ctx.fillRect(x - 3, yT, 6, yb - yT); ctx.strokeStyle = '#64748b'; ctx.beginPath(); ctx.arc(x, yb, 11, 0, TAU); ctx.stroke();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; for (let i = 0; i <= 10; i++) { const yy = yb - 12 - (h - 22) * i / 10; ctx.beginPath(); ctx.moveTo(x + 8, yy); ctx.lineTo(x + (i % 5 ? 12 : 15), yy); ctx.stroke(); }
      ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(x - 5, top + 6, 2.5, h - 22); });
    if (lab) Q42.T(ctx, lab, x, yb - h - 14, { s: 10.5, w: 900, c: '#fff', bg: col });
  },
  /* thick energy arrow from (x0,y0) to (x1,y1) of width wd */
  bar(ctx, x0, y0, x1, y1, wd, col, lab, o = {}) {
    const L = Math.hypot(x1 - x0, y1 - y0); if (L < 4 || wd < .5) return; const ux = (x1 - x0) / L, uy = (y1 - y0) / L, nx = -uy, ny = ux, hd = Math.min(L * .45, wd * .9 + 10), hw = wd / 2 + 7;
    K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = o.a ?? .92; const g = ctx.createLinearGradient(x0 + nx * wd / 2, y0 + ny * wd / 2, x0 - nx * wd / 2, y0 - ny * wd / 2); g.addColorStop(0, shade(col, 40)); g.addColorStop(.5, col); g.addColorStop(1, shade(col, -40)); ctx.fillStyle = g;
      const bx = x1 - ux * hd, by = y1 - uy * hd; ctx.beginPath(); ctx.moveTo(x0 + nx * wd / 2, y0 + ny * wd / 2); ctx.lineTo(bx + nx * wd / 2, by + ny * wd / 2); ctx.lineTo(bx + nx * hw, by + ny * hw); ctx.lineTo(x1, y1); ctx.lineTo(bx - nx * hw, by - ny * hw); ctx.lineTo(bx - nx * wd / 2, by - ny * wd / 2); ctx.lineTo(x0 - nx * wd / 2, y0 - ny * wd / 2); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = shade(col, -60); ctx.lineWidth = 1; ctx.stroke();
      if (o.flow != null) { ctx.clip(); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2; ctx.setLineDash([6, 10]); ctx.lineDashOffset = -o.flow * 40; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.setLineDash([]); }
      ctx.restore(); });
    if (lab) Q42.T(ctx, lab, (x0 + x1) / 2 + (o.lx || 0), (y0 + y1) / 2 + (o.ly || 0), { s: o.s || 11, w: 900, c: '#fff', bg: shade(col, -30) });
  },
  /* heat reservoir block */
  res(ctx, x, y, w, h, hot, lab, c = 0) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + h); if (hot) { g.addColorStop(0, '#fecaca'); g.addColorStop(1, '#dc2626'); } else { g.addColorStop(0, '#e0f2fe'); g.addColorStop(1, '#0284c7'); } ctx.fillStyle = g; rr(ctx, x, y, w, h, 12); ctx.fill(); ctx.strokeStyle = hot ? '#7f1d1d' : '#0c4a6e'; ctx.lineWidth = 2; ctx.stroke();
      if (hot) { ctx.save(); ctx.beginPath(); rr(ctx, x, y, w, h, 12); ctx.clip(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { const xx = x + (i + .5) * w / 6; ctx.beginPath(); for (let k = 0; k <= 10; k++) { const yy = y + h - k * h / 10; ctx.lineTo(xx + 4 * Math.sin(k + c * 4 + i), yy); } ctx.stroke(); } ctx.restore(); }
      else { ctx.fillStyle = 'rgba(255,255,255,.55)'; for (let i = 0; i < 5; i++) { const xx = x + 14 + i * (w - 28) / 4, yy = y + h * .3 + (i % 2) * 8; ctx.beginPath(); ctx.moveTo(xx, yy - 6); ctx.lineTo(xx + 6, yy); ctx.lineTo(xx, yy + 6); ctx.lineTo(xx - 6, yy); ctx.closePath(); ctx.fill(); } } });
    if (lab) Q42.T(ctx, lab, x + w / 2, y + h / 2 + (hot ? 0 : 6), { s: 12, w: 900, c: '#fff', bg: hot ? '#991b1b' : '#075985' });
  },
  /* red ✗ or green ✓ stamp */
  stamp(ctx, x, y, ok, r = 26) { K.raw(ctx, () => { ctx.fillStyle = ok ? 'rgba(22,163,74,.92)' : 'rgba(220,38,38,.92)'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = r * .18; ctx.lineCap = 'round'; ctx.beginPath();
    if (ok) { ctx.moveTo(x - r * .45, y); ctx.lineTo(x - r * .1, y + r * .35); ctx.lineTo(x + r * .48, y - r * .35); } else { ctx.moveTo(x - r * .38, y - r * .38); ctx.lineTo(x + r * .38, y + r * .38); ctx.moveTo(x + r * .38, y - r * .38); ctx.lineTo(x - r * .38, y + r * .38); } ctx.stroke(); ctx.lineCap = 'butt'; }); },
  panel(ctx, x, y, w, h, col = '#ea580c') { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.15)'; ctx.shadowBlur = 10; ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, x, y, w, h, 10); ctx.fill(); ctx.restore(); ctx.strokeStyle = col; ctx.lineWidth = 1.6; rr(ctx, x, y, w, h, 10); ctx.stroke(); }); },
  /* bidi isolation that also keeps °, Δ and Greek letters inside Latin runs */
  iso(s) { s = String(s); if (!/[\u0600-\u06FF]/.test(s)) return /[A-Za-z0-9]/.test(s) && s.indexOf('\u2066') < 0 ? '\u2066' + s + '\u2069' : s; return s.replace(/[(A-Za-zΔηθγπ°0-9\u2080-\u2089\u00B2\u00B3][A-Za-zΔηθγπ°0-9\u2080-\u2089\u00B2\u00B3 .=×÷+\-−\/√()·,:≈%⁻¹⁰⁴⁵⁶]*[A-Za-zΔηθγπ°0-9\u2080-\u2089\u00B2\u00B3)%⁻¹⁰⁴⁵⁶]|[0-9Δ]/g, m => '\u2066' + m + '\u2069'); },
  T(ctx, s, x, y, o) { Q42.T(ctx, Q56.iso(s), x, y, o); },
  isoL(L) { return L.map(q => typeof q === 'string' ? Q56.iso(q) : Object.assign({}, q, { t: Q56.iso(q.t) })); },
  card(ctx, S, L, o) { o = Object.assign({ bd: '#ea580c', y: 70, wd: 310 }, o || {}); if (o.title) o.title = Q56.iso(o.title); return Q42.card(ctx, S, Q56.isoL(L), o); },
  steps(ctx, S, st, o) { return Q42.steps(ctx, S, Object.assign({}, st, { q: Q56.iso(st.q), lines: st.lines.map(Q56.iso), title: Q56.iso(st.title || '') }), Object.assign({ y: 70, x: S.W - 12, wd: 320 }, o || {})); },
  stepChips(S, id, y, x0, lab, onEx, n = 9) { return Q43.stepChips(S, id, y, x0, lab, onEx, n); },
  drawSteps(ctx, list) { if (list[1]) list[1]._col = '#be185d'; Q42.drawChips(ctx, list); }
});

LW({ id: 'g11_l6_work', cat: 56, name: 'شغل الغاز عند ضغط ثابت', fx: 'Δ<i>W</i> = <i>F</i> Δ<i>x</i> = <i>P A</i> Δ<i>x</i> = <i>P</i> Δ<i>V</i>', sym: 'الشغل الذي يبذله الغاز عندما يدفع مكبساً مساحته A مسافة Δx بضغط ثابت P ، ويساوي المساحة تحت منحني الضغط − الحجم. موجب عند التمدد وسالب عند الانضغاط.', calc: { in: [['P', 'P', 'Pa', 100000], ['dV', 'ΔV', 'm³', 0.0005]], out: 'ΔW', u: 'J', f: v => v.P * v.dV } });
LW({ id: 'g11_l6_joule', cat: 56, name: 'المكافئ الميكانيكي للحرارة', fx: '1 cal = 4.2 J', sym: 'وجد جول أن الشغل الميكانيكي الذي يتحول إلى حرارة يتناسب مع كمية الحرارة الناتجة، وكل 4.2 J من الشغل تولد سعرة واحدة.', calc: { in: [['W', 'W', 'J', 4200]], out: 'Q', u: 'cal', f: v => v.W / 4.2 } });
LW({ id: 'g11_l6_first', cat: 56, name: 'القانون الأول للديناميكا الحرارية', fx: 'Δ<i>U</i> = Δ<i>Q</i> − Δ<i>W</i>', sym: 'التغير في الطاقة الداخلية للنظام = الحرارة المضافة إليه − الشغل الذي يبذله. ΔQ موجبة عند دخول الحرارة وسالبة عند خروجها، وΔW موجب عندما يبذل النظام شغلاً وسالب عندما يُبذل الشغل عليه.', calc: { in: [['Q', 'ΔQ', 'J', 1500], ['W', 'ΔW', 'J', 2200]], out: 'ΔU', u: 'J', f: v => v.Q - v.W } });
LW({ id: 'g11_l6_isoth', cat: 56, name: 'شغل الغاز في العملية الأيزوثرمية', fx: 'Δ<i>W</i> = <i>P</i><sub>i</sub><i>V</i><sub>i</sub> ln(' + FR('<i>V</i><sub>f</sub>', '<i>V</i><sub>i</sub>') + ') = <i>P</i><sub>i</sub><i>V</i><sub>i</sub> ln(' + FR('<i>P</i><sub>i</sub>', '<i>P</i><sub>f</sub>') + ')', sym: 'عند ثبوت درجة الحرارة لا تتغير الطاقة الداخلية ΔU = 0 فيكون ΔQ = ΔW. ونستعمل ln x = 2.303 log x.', calc: { in: [['P', 'Pi', 'Pa', 1000000], ['Vi', 'Vi', 'm³', 0.2], ['Vf', 'Vf', 'm³', 0.6]], out: 'ΔW', u: 'J', f: v => v.P * v.Vi * Math.log(v.Vf / v.Vi) } });
LW({ id: 'g11_l6_adiab', cat: 56, name: 'العملية الأديباتيكية', fx: 'Δ<i>Q</i> = 0 ⟹ Δ<i>W</i> = −Δ<i>U</i>', sym: 'لا تدخل الحرارة إلى النظام ولا تخرج منه (نظام معزول أو عملية سريعة جداً)، فالشغل المبذول على الغاز يزيد طاقته الداخلية ودرجة حرارته.' });
LW({ id: 'g11_l6_eff', cat: 56, name: 'كفاءة المحرك الحراري', fx: '<i>η</i> = ' + FR('<i>W</i>', '<i>Q</i><sub>H</sub>') + ' × 100% ، <i>W</i> = <i>Q</i><sub>H</sub> − <i>Q</i><sub>C</sub>', sym: 'المحرك يأخذ حرارة QH من المستودع الحار ويحول جزءاً منها إلى شغل W ويطرح الباقي QC إلى المستودع البارد.', calc: { in: [['QH', 'QH', 'J', 1200], ['W', 'W', 'J', 400]], out: 'η', u: '%', f: v => v.W / v.QH * 100 } });
LW({ id: 'g11_l6_second', cat: 56, name: 'القانون الثاني للديناميكا الحرارية', fx: 'Q تنساب تلقائياً من <i>T</i><sub>H</sub> إلى <i>T</i><sub>C</sub> فقط', sym: 'صيغة كلفن − بلانك: يستحيل بناء محرك يحول كل الحرارة المأخوذة من مستودع واحد إلى شغل. صيغة كلاوزيوس: يستحيل انتقال الحرارة من جسم بارد إلى جسم حار دون بذل شغل.' });

/* =============== A1 — النظام والوسط المحيط: قدر الضغط (6-1، الشكل 1، ص 119) =============== */
(() => {
  const C = 4.2; // kJ per °C (≈ 1 kg of water)
  const D = { id: 'g11_th_system', page: 119, fig: 'الشكل 1',
    desc: 'النظام هو الجزء من الكون الذي نوجه إليه اهتمامنا، وكل ما يحيط به يسمى الوسط المحيط. في قدر الضغط يكون الماء والبخار داخله هما النظام، واللهب والهواء والغطاء الثقيل من الوسط المحيط. تنتقل الحرارة من اللهب إلى النظام فترتفع درجة حرارته وضغطه، وعندما يرفع البخار ثقل الصمام يبذل النظام شغلاً على الوسط المحيط.',
    tags: 'النظام الوسط المحيط قدر الضغط حرارة شغل طاقة داخلية بخار صمام الديناميكا الحرارية',
    tools: ['قدر ضغط فيه ماء', 'موقد غازي', 'صمام بثقل', 'محرار', 'مقياس ضغط'],
    steps: ['أدر مفتاح الموقد (اسحب المفتاح أو استعمل اللوحة) وراقب انتقال الحرارة ΔQ من اللهب إلى النظام.', 'راقب ارتفاع درجة حرارة الماء ثم ضغط البخار في المقياس.', 'عندما يزيد الضغط يرفع البخار ثقل الصمام: النظام يبذل شغلاً على الوسط المحيط.', 'اختر «النظام» أو «الوسط المحيط» لتمييز كل منهما.', 'زد ثقل الصمام: يرتفع الضغط ودرجة الحرارة أكثر قبل أن يفتح.'],
    concl: ['النظام: الماء والبخار داخل القدر، والوسط المحيط: كل ما هو خارج حدود النظام.', 'تتبادل الأنظمة الطاقة مع الوسط المحيط بطريقتين: الحرارة ΔQ والشغل ΔW.', 'الحرارة التي تدخل النظام تزيد طاقته الداخلية فترتفع درجة حرارته وضغطه.', 'عندما يرفع البخار الغطاء أو الثقل يبذل النظام شغلاً على الوسط المحيط.'],
    laws: ['g11_l6_first'],
    controls: [R('pw', 'قدرة اللهب', 0, 1, .6, .05, ''), R('mv', 'ثقل صمام الغطاء', 1, 3, 2, .5, '×'), TG('bd', 'حدود النظام', true, null, 'eye')],
    setup(S) { S.T = 25; S.Pa = 1; S.lift = 0; S.Qin = 0; S.Wout = 0; S.clk = 0; S.hl = 'all'; S.vent = 0; S.pwd = 0; S.bub = []; S.stm = []; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 210, top: 300, bot: 452, pw: 118 }; },
    Popen(S) { return 1 + .4 * S.p.mv; },
    update(S, dt) {
      if (!S.W) return; dt = Math.min(dt, .05); S.clk += dt; S.pwd = Q56.ease(S.pwd, S.p.pw, dt, 5);
      const Pin = 40 * S.pwd, loss = .25 * (S.T - 25), Po = D.Popen(S), Tcap = 100 + 28.8 * Math.log(Po);
      S.Qin += Pin * dt; let net = Pin - loss;
      S.vent = Math.max(0, S.vent - dt);
      if (S.vent > 0) { S.T -= 6 * dt; S.Wout += 3 * dt; }
      if (S.T >= Tcap - .05 && net > 0) { S.Wout += net * dt; net = 0; S.T = Tcap; }
      S.T = clamp(S.T + net * dt / C, 20, Tcap); S.Pa = S.T < 100 ? 1 : Math.exp((S.T - 100) / 28.8);
      const open = S.T >= Tcap - .3 && S.pwd > .05 || S.vent > 0; S.lift = Q56.ease(S.lift, open ? 1 : 0, dt, 8);
      if (S.T > 80 && Math.random() < dt * (S.T - 80) * .5) S.bub.push({ x: Math.random(), y: 1, r: 2 + Math.random() * 3 });
      S.bub.forEach(b => { b.y -= dt * (.6 + b.r * .1); }); S.bub = S.bub.filter(b => b.y > 0);
      if (S.lift > .3 && Math.random() < dt * 30) S.stm.push({ x: (Math.random() - .5) * 8, y: 0, a: 1, r: 4 + Math.random() * 4 });
      S.stm.forEach(p => { p.y -= dt * 80; p.x += dt * (Math.random() - .5) * 40; p.a -= dt * .7; p.r += dt * 10; }); S.stm = S.stm.filter(p => p.a > 0);
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), cx = g.cx, pw = g.pw, c = S.clk; Q56.bg(ctx, w, h);
      // surroundings tint
      if (S.p.bd && S.hl === 'sur') K.raw(ctx, () => { ctx.fillStyle = 'rgba(16,185,129,.12)'; rr(ctx, g.L + 8, 64, w - g.L - 360, h - 228, 14); ctx.fill(); });
      Q56.stove(ctx, cx, g.bot + 18, 320, S.pwd, c);
      // pot body
      K.raw(ctx, () => { const gb = ctx.createLinearGradient(cx - pw, 0, cx + pw, 0); gb.addColorStop(0, '#6b7280'); gb.addColorStop(.25, '#f3f4f6'); gb.addColorStop(.6, '#d1d5db'); gb.addColorStop(1, '#4b5563'); ctx.fillStyle = gb; rr(ctx, cx - pw, g.top, 2 * pw, g.bot - g.top, 14); ctx.fill(); ctx.strokeStyle = '#374151'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#1f2937'; rr(ctx, cx - pw - 50, g.top + 14, 50, 12, 6); ctx.fill(); rr(ctx, cx + pw, g.top + 14, 46, 12, 6); ctx.fill(); });
      // cut-away window showing water and steam
      const wx0 = cx - pw + 26, wx1 = cx + pw - 26, wy0 = g.top + 30, wy1 = g.bot - 16, lv = wy0 + (wy1 - wy0) * .45;
      K.raw(ctx, () => { ctx.save(); rr(ctx, wx0, wy0, wx1 - wx0, wy1 - wy0, 10); ctx.clip(); const k = (S.T - 25) / 100; ctx.fillStyle = 'rgba(241,245,249,.95)'; ctx.fillRect(wx0, wy0, wx1 - wx0, wy1 - wy0);
        ctx.fillStyle = 'rgba(203,213,225,' + clamp((S.T - 60) / 60, 0, .8) + ')'; ctx.fillRect(wx0, wy0, wx1 - wx0, lv - wy0);
        const gw = ctx.createLinearGradient(0, lv, 0, wy1); gw.addColorStop(0, Q56.tc(k, .55)); gw.addColorStop(1, Q56.tc(k, .85)); ctx.fillStyle = gw; ctx.fillRect(wx0, lv, wx1 - wx0, wy1 - lv);
        ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1.5; ctx.beginPath(); for (let x = wx0; x <= wx1; x += 6) ctx.lineTo(x, lv + 1.5 * Math.sin(x / 9 + c * 5)); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,.85)'; S.bub.forEach(b => { ctx.beginPath(); ctx.arc(wx0 + 8 + b.x * (wx1 - wx0 - 16), lv + (wy1 - lv) * b.y, b.r, 0, TAU); ctx.stroke(); });
        ctx.restore(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; rr(ctx, wx0, wy0, wx1 - wx0, wy1 - wy0, 10); ctx.stroke(); });
      // heat arrows from flame into pot
      if (S.pwd > .05) [-60, 0, 60].forEach((o, i) => Q56.bar(ctx, cx + o, g.bot + 6, cx + o, wy1 - 6, 6 + 10 * S.pwd, '#f97316', i === 1 ? 'ΔQ' : '', { flow: c }));
      // lid + valve
      const lift = S.lift * 16 + Math.sin(c * 30) * 1.5 * S.lift;
      K.raw(ctx, () => { const gl = ctx.createLinearGradient(0, g.top - 34, 0, g.top); gl.addColorStop(0, '#f9fafb'); gl.addColorStop(1, '#9ca3af'); ctx.fillStyle = gl; ctx.beginPath(); ctx.moveTo(cx - pw - 6, g.top + 2); ctx.quadraticCurveTo(cx, g.top - 50, cx + pw + 6, g.top + 2); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#374151'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#4b5563'; ctx.fillRect(cx - 5, g.top - 44, 10, 18);
        const vy = g.top - 46 - lift, m = 10 + S.p.mv * 5; const gv = ctx.createLinearGradient(cx - m, 0, cx + m, 0); gv.addColorStop(0, '#1f2937'); gv.addColorStop(.5, '#9ca3af'); gv.addColorStop(1, '#111827'); ctx.fillStyle = gv; rr(ctx, cx - m, vy - 20, 2 * m, 20, 5); ctx.fill(); });
      K.raw(ctx, () => { S.stm.forEach(p => { ctx.fillStyle = 'rgba(226,232,240,' + p.a * .8 + ')'; ctx.beginPath(); ctx.arc(cx + p.x, g.top - 60 - lift + p.y, p.r, 0, TAU); ctx.fill(); }); });
      if (S.lift > .3) { Q56.bar(ctx, cx + 34, g.top - 70, cx + 34, g.top - 130, 12, '#16a34a', ''); Q42.T(ctx, 'ΔW', cx + 58, g.top - 104, { s: 12, w: 900, c: '#fff', bg: '#15803d' }); Q42.T(ctx, 'البخار يرفع الثقل: النظام يبذل شغلاً', cx, g.top - 152, { s: 11, w: 900, c: '#fff', bg: '#16a34a' }); }
      // gauge + thermometer
      Q43.gauge(ctx, cx + pw + 52, g.top - 34, 28, (S.Pa - 1) / 1.6, 'P = ' + Q56.f(S.Pa, 2) + ' atm', '#7c2d12');
      Q56.therm(ctx, cx - pw - 40, g.bot - 20, 170, (S.T - 0) / 140, Q56.f(S.T, 0) + ' °C');
      // system boundary
      if (S.p.bd) { K.raw(ctx, () => { ctx.strokeStyle = S.hl === 'sur' ? 'rgba(234,88,12,.5)' : '#ea580c'; ctx.lineWidth = S.hl === 'sys' ? 3.5 : 2.2; ctx.setLineDash([8, 6]); ctx.lineDashOffset = -c * 20; rr(ctx, wx0 - 6, wy0 - 6, wx1 - wx0 + 12, wy1 - wy0 + 12, 12); ctx.stroke(); ctx.setLineDash([]);
          if (S.hl === 'sys') { ctx.fillStyle = 'rgba(234,88,12,.12)'; rr(ctx, wx0 - 6, wy0 - 6, wx1 - wx0 + 12, wy1 - wy0 + 12, 12); ctx.fill(); } });
        Q42.T(ctx, 'النظام: الماء والبخار', cx, wy0 + 16, { s: 11, w: 900, c: '#fff', bg: '#ea580c' });
        Q42.T(ctx, 'الوسط المحيط', g.L + 64, 96, { s: 11.5, w: 900, c: '#fff', bg: '#059669' }); }
      Q56.knob(ctx, cx + 120, g.bot + 64, S.p.pw, 'مفتاح الموقد');
      // energy panel
      const px = w - 336, py = 352; Q56.panel(ctx, px, py, 320, 200);
      Q42.T(ctx, 'تبادل الطاقة مع الوسط المحيط', px + 160, py + 18, { s: 12, w: 900, c: '#7c2d12' });
      const mx = Math.max(400, S.Qin), bars = [['ΔQ', S.Qin, '#f97316'], ['ΔW', S.Wout, '#16a34a'], ['ΔU', C * (S.T - 25), '#7c3aed']];
      bars.forEach((b, i) => { const by = py + 52 + i * 46, bw = 210 * clamp(b[1] / mx, 0, 1); K.raw(ctx, () => { ctx.fillStyle = '#f1f5f9'; rr(ctx, px + 70, by - 12, 210, 24, 6); ctx.fill(); ctx.fillStyle = b[2]; if (bw > 1) { rr(ctx, px + 70, by - 12, bw, 24, 6); ctx.fill(); } });
        Q42.T(ctx, b[0], px + 40, by, { s: 13, w: 900, c: b[2] }); Q42.T(ctx, Q56.f(b[1], 0) + ' kJ', px + 250, by, { s: 10.5, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.8)' }); });
      Q42.T(ctx, 'زمن مسرَّع للمشاهدة', px + 160, py + 186, { s: 9.5, w: 700, c: '#64748b' });
      const st = S.lift > .3 ? 'الصمام مفتوح: البخار يخرج' : S.T >= 99.5 ? 'الضغط يرتفع والصمام مغلق' : S.pwd > .05 ? 'الماء يسخن' : 'الموقد مطفأ';
      Q56.card(ctx, S, [{ t: 'درجة الحرارة: ' + Q56.f(S.T, 1) + ' °C' }, { t: 'الضغط: ' + Q56.f(S.Pa, 2) + ' atm' }, { t: 'يفتح الصمام عند ' + Q56.f(D.Popen(S), 1) + ' atm', c: '#64748b' }, { t: st, c: '#ea580c', w: 900 }, { t: 'الحرارة تدخل النظام، والشغل يخرج منه', c: '#7c2d12', w: 800 }], { title: 'قدر الضغط: النظام والوسط' });
      const Cc = D.chips(S, g); Q42.drawChips(ctx, Cc.a); Q42.drawChips(ctx, Cc.b);
      Q42.banner(ctx, w, 'أدر مفتاح الموقد وراقب الحرارة والشغل', '#ea580c');
    },
    chips(S, g) { return { a: Q42.chips(S, 'hl', [['sys', 'النظام'], ['sur', 'الوسط المحيط'], ['all', 'الكل']], g.h - 84, S.hl, (S2, k) => { S2.hl = k; if (!S2.p.bd) setParam(S2, 'bd', true); }, { bw: 150, col: '#ea580c' }),
      b: Q42.chips(S, 'act', [['vent', 'افتح الصمام يدوياً'], ['re', '↺ ماء بارد من جديد']], g.h - 128, '', (S2, k) => { if (k === 'vent') S2.vent = 1.2; else { S2.T = 25; S2.Qin = 0; S2.Wout = 0; S2.bub = []; } }, { bw: 190 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Cc = D.chips(S, g);
      return [{ id: 'knob', x: g.cx + 120, y: g.bot + 64, r: 22, axis: 'x', keep: true, tip: 'اسحب لتغيير قدرة اللهب', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'pw', clamp(+(S2.p.pw + (d.dx || 0) / 150).toFixed(2), 0, 1)) },
        { id: 'valve', x: g.cx, y: g.top - 56, r: 22, axis: 'none', hint: false, tip: 'اضغط: افتح الصمام', click: S2 => { S2.vent = 1.2; } },
        { id: 'pot', x: g.cx, y: (g.top + g.bot) / 2, w: 2 * g.pw - 60, h: 90, axis: 'none', hint: false, tip: 'اضغط: ميّز النظام', click: S2 => { S2.hl = S2.hl === 'sys' ? 'sur' : 'sys'; if (!S2.p.bd) setParam(S2, 'bd', true); } }].concat(Cc.a, Cc.b); },
    readings(S) { return [rd('درجة حرارة النظام', Q56.f(S.T, 1) + ' °C'), rd('ضغط البخار', Q56.f(S.Pa, 2) + ' atm'), rd('الحرارة الداخلة ΔQ', Q56.f(S.Qin, 0) + ' kJ'), rd('الشغل على الوسط ΔW', Q56.f(S.Wout, 0) + ' kJ')]; },
    explain(S) { return Q26.ex('الماء يسخن ثم يرتفع الضغط داخل القدر حتى يرفع البخار ثقل الصمام ويخرج.', 'الحرارة ΔQ تنتقل من اللهب (الوسط المحيط) إلى النظام فتزيد طاقته الداخلية، وعندما يرفع البخار الثقل يبذل النظام شغلاً ΔW على الوسط المحيط.', 'قدر الضغط يطبخ أسرع لأن الماء يغلي فيه بدرجة حرارة أعلى من 100 °C.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — الشغل والحرارة: المكبس ومنحني الضغط − الحجم والعمليات الأربع (6-2، الأشكال 2 و 3 و 4، ص 120) =============== */
(() => {
  const V0 = 1.5, P0 = 2, T0 = 300, nR = P0 * V0 / T0, GM = 5 / 3;
  const PR = { isobar: ['ثابت الضغط', 'العملية الأيزوبارية: الضغط ثابت', '#ea580c', .6, 3], isochor: ['ثابت الحجم', 'العملية الأيزوكورية: الحجم ثابت', '#2563eb', 1.5, 1.5], isoth: ['ثابت درجة الحرارة', 'العملية الأيزوثرمية: T ثابتة', '#16a34a', .6, 3], adiab: ['أديباتيكية', 'العملية الأديباتيكية: ΔQ = 0', '#9333ea', .9, 3] };
  const ORD = ['isobar', 'isochor', 'isoth', 'adiab'];
  const Pof = (pr, V, T) => pr === 'isobar' ? P0 : pr === 'isoth' ? P0 * V0 / V : pr === 'adiab' ? P0 * Math.pow(V0 / V, GM) : nR * T / V0;
  const D = { id: 'g11_th_pv', page: 120, fig: 'الأشكال 2 و 3 و 4',
    desc: 'غاز محصور في أسطوانة ذات مكبس. عندما يتمدد الغاز ويدفع المكبس مسافة dy يبذل شغلاً على الوسط المحيط، والشغل يساوي المساحة تحت منحني الضغط − الحجم (الشكل 3). تتغير حالة الغاز بعمليات منها: ثبوت الضغط، ثبوت الحجم، ثبوت درجة الحرارة، والعملية الأديباتيكية التي لا تدخل فيها الحرارة ولا تخرج (الشكل 4).',
    tags: 'الشغل والحرارة المكبس منحني الضغط الحجم P-V المساحة تحت المنحني أيزوبارية أيزوكورية أيزوثرمية أديباتيكية',
    tools: ['أسطوانة فيها غاز محصور', 'مكبس قابل للحركة', 'مقياس ضغط', 'محرار', 'مصدر حراري'],
    steps: ['اختر نوع العملية من الأزرار في الأسفل.', 'اسحب المكبس للأعلى (تمدد) أو للأسفل (انضغاط)، أو اسحب النقطة على المنحني.', 'راقب المساحة المظللة تحت منحني الضغط − الحجم: إنها الشغل ΔW.', 'في العملية ثابتة الحجم المكبس مثبت: اسحب النقطة للأعلى لتسخين الغاز، ولاحظ أن الشغل صفر.', 'قارن ميل منحني الأيزوثرمية والأديباتيكية.'],
    concl: ['الشغل الذي يبذله الغاز يساوي المساحة تحت منحني الضغط − الحجم.', 'عند التمدد يكون الشغل موجباً وعند الانضغاط سالباً، وفي العملية ثابتة الحجم الشغل صفر.', 'العمليات الأربع: ثبوت الضغط، ثبوت الحجم، ثبوت درجة الحرارة، والأديباتيكية ΔQ = 0.', 'منحني الأديباتيكية أشد انحداراً من منحني الأيزوثرمية.'],
    laws: ['g11_l6_work', 'g11_l6_first'],
    controls: [R('V', 'حجم الغاز V', .6, 3, 1.5, .05, 'L'), R('Tq', 'درجة الحرارة في العملية ثابتة الحجم', 150, 600, 300, 10, 'K'), TG('area', 'تظليل الشغل', true, null, 'chart'), TG('mol', 'جزيئات الغاز', true, null, 'eye')],
    setup(S) { S.pr = 'isobar'; S.Vd = V0; S.Td = T0; S.clk = 0; S.qr = 0; S.lq = 0; S.gp = Q56.gasInit(34, 3); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 44, cw: 140, top: 200, bot: 540, A: { x: w - 300, y: 360, w: 268, h: 190 } }; },
    py(g, V) { return g.bot - V / 3.2 * (g.bot - g.top - 20); },
    st(S) { const pr = S.pr, V = pr === 'isochor' ? V0 : S.Vd, T = pr === 'isochor' ? S.Td : null, P = Pof(pr, V, T), TT = P * V / nR;
      const W = pr === 'isobar' ? 100 * P0 * (V - V0) : pr === 'isoth' ? 100 * P0 * V0 * Math.log(V / V0) : pr === 'adiab' ? 100 * (P0 * V0 - P * V) / (GM - 1) : 0, dU = 150 * (P * V - P0 * V0);
      return { V, P, T: TT, W, dU, Q: pr === 'adiab' ? 0 : dU + W }; },
    update(S, dt) {
      if (!S.W) return; dt = Math.min(dt, .05); S.clk += dt; const q = PR[S.pr];
      S.Vd = Q56.ease(S.Vd, clamp(S.p.V, q[3], q[4]), dt, 6); S.Td = Q56.ease(S.Td, S.pr === 'isochor' ? S.p.Tq : T0, dt, 6);
      const s = D.st(S); S.qr = Q56.ease(S.qr, (s.Q - S.lq) / Math.max(dt, 1e-3), dt, 8); S.lq = s.Q;
      const g = D.geo(S), hg = g.bot - D.py(g, s.V); Q56.gasStep(S.gp, dt, .55 * Math.sqrt(s.T / 300), 1, Math.max(.2, hg / g.cw));
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), s = D.st(S), q = PR[S.pr], py = D.py(g, s.V), c = S.clk, x = g.cx; Q56.bg(ctx, w, h);
      if (S.pr === 'isoth') K.raw(ctx, () => { const gb = ctx.createLinearGradient(0, g.top + 120, 0, g.bot + 30); gb.addColorStop(0, 'rgba(125,211,252,.35)'); gb.addColorStop(1, 'rgba(3,105,161,.45)'); ctx.fillStyle = gb; rr(ctx, x - 34, g.top + 150, g.cw + 68, g.bot - g.top - 120, 10); ctx.fill(); ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; ctx.stroke(); });
      Q56.cyl(ctx, x, g.top, g.cw, g.bot, py, { tint: Q56.tc((s.T - 150) / 450, .3), parts: S.p.mol ? S.gp : null, pc: Q56.tc((s.T - 150) / 450), lock: S.pr === 'isochor', ins: S.pr === 'adiab', rodTop: py - 110 });
      if (S.pr === 'isoth') Q56.T(ctx, 'حوض ماء كبير 300 K', x + g.cw / 2, g.bot + 40, { s: 10.5, w: 900, c: '#fff', bg: '#0369a1' });
      if (S.pr === 'adiab') Q56.T(ctx, 'عازل حراري: ΔQ = 0', x + g.cw / 2, g.bot + 40, { s: 10.5, w: 900, c: '#78350f', bg: '#fde68a' });
      // heat flow
      const qa = clamp(Math.abs(S.qr) / 400, 0, 1);
      if (S.pr !== 'adiab' && qa > .04) { if (S.qr > 0) { if (S.pr !== 'isoth') Q56.flames(ctx, x + 10, x + g.cw - 10, g.bot + 62, qa, c); Q56.bar(ctx, x + g.cw / 2, g.bot + 64, x + g.cw / 2, g.bot + 12, 6 + 12 * qa, '#f97316', 'ΔQ +', { flow: c, lx: 44 }); }
        else Q56.bar(ctx, x + g.cw / 2, g.bot + 12, x + g.cw / 2, g.bot + 64, 6 + 12 * qa, '#0ea5e9', 'ΔQ −', { flow: c, lx: 44 }); }
      // displacement dy
      const p0 = D.py(g, V0); if (Math.abs(py - p0) > 4) { K.raw(ctx, () => { ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x - 30, p0); ctx.lineTo(x + g.cw + 30, p0); ctx.stroke(); ctx.setLineDash([]); }); Q56.bar(ctx, x - 22, p0, x - 22, py, 4, s.V > V0 ? '#16a34a' : '#dc2626', ''); Q56.T(ctx, 'dy', x - 40, (p0 + py) / 2, { s: 11, w: 900, c: '#0f172a' }); }
      // gauge + thermometer
      Q43.gauge(ctx, x + g.cw + 80, g.top + 10, 32, s.P / 6, 'P = ' + Q56.f(s.P, 2), '#7c2d12');
      Q56.therm(ctx, x + g.cw + 80, g.bot - 10, 230, (s.T - 100) / 600, Math.round(s.T) + ' K', Q56.tc((s.T - 150) / 450) === '' ? '#ef4444' : '#ef4444');
      // P–V graph with the four processes (fig 4)
      const A = Q52.axes(ctx, Object.assign({ x1: 3.2, y1: 6, xs: .2, ys: .5, lx: 1, ly: 1, xl: 'V (L)', yl: 'P ×10⁵ Pa' }, g.A));
      ORD.forEach((k, i) => { const r = PR[k], on = k === S.pr, pts = []; if (k === 'isochor') { pts.push([A.X(V0), A.Y(1)], [A.X(V0), A.Y(4)]); } else for (let V = r[3]; V <= r[4] + 1e-9; V += .02) pts.push([A.X(V), A.Y(Pof(k, V))]);
        Q41.line(ctx, pts, on ? r[2] : 'rgba(100,116,139,.35)', on ? 2.2 : 1.4, on ? [6, 4] : null); const e = pts[k === 'isochor' ? 1 : pts.length - 1]; Q42.T(ctx, String(i + 1), e[0] + 8 + (k === 'adiab' ? 16 : 0), e[1] - 6, { s: 10, w: 900, c: '#fff', bg: on ? r[2] : '#94a3b8' }); });
      const path = []; if (S.pr === 'isochor') { path.push([V0, P0], [V0, s.P]); } else { const n = 40; for (let i = 0; i <= n; i++) { const V = V0 + (s.V - V0) * i / n; path.push([V, Pof(S.pr, V)]); } }
      if (S.p.area && S.pr !== 'isochor' && Math.abs(s.V - V0) > .01) K.raw(ctx, () => { ctx.fillStyle = s.V > V0 ? 'rgba(22,163,74,.28)' : 'rgba(220,38,38,.25)'; ctx.beginPath(); ctx.moveTo(A.X(V0), A.Y(0)); path.forEach(p => ctx.lineTo(A.X(p[0]), A.Y(p[1]))); ctx.lineTo(A.X(s.V), A.Y(0)); ctx.closePath(); ctx.fill(); });
      Q41.line(ctx, path.map(p => [A.X(p[0]), A.Y(p[1])]), q[2], 3.2); Q41.dot(ctx, A.X(V0), A.Y(P0), '#0f172a', 4.5); Q42.T(ctx, 'A', A.X(V0) - 10, A.Y(P0) - 10, { s: 11, w: 900, c: '#0f172a' });
      Q41.knob(ctx, A.X(s.V), A.Y(s.P), q[2], 8);
      if (S.p.area && S.pr !== 'isochor' && Math.abs(s.V - V0) > .15) Q56.T(ctx, 'ΔW = ' + Math.round(s.W) + ' J', A.X((V0 + s.V) / 2), A.Y(Math.min(P0, s.P) / 2), { s: 10.5, w: 900, c: '#fff', bg: s.V > V0 ? '#15803d' : '#b91c1c' });
      const L = [{ t: q[1], c: q[2], w: 900 }, { t: 'P = ' + Q56.f(s.P, 2) + ' ×10⁵ Pa' }, { t: 'V = ' + Q56.f(s.V, 2) + ' L' }, { t: 'T = ' + Math.round(s.T) + ' K' }, { t: 'ΔW = ' + Math.round(s.W) + ' J', c: '#15803d', w: 900 }, { t: 'ΔU = ' + Math.round(s.dU) + ' J', c: '#7c3aed' }, { t: 'ΔQ = ' + Math.round(s.Q) + ' J', c: '#c2410c' }, { t: 'الشغل = المساحة تحت منحني P − V', c: '#64748b' }];
      Q56.card(ctx, S, L, { title: 'الشغل والحرارة' });
      const Cc = D.chips(S, g); Q42.drawChips(ctx, Cc.p); Q42.drawChips(ctx, Cc.r);
      Q42.banner(ctx, w, S.pr === 'isochor' ? 'المكبس مثبت: اسحب النقطة للأعلى لتسخين الغاز' : 'اسحب المكبس أو النقطة على المنحني', '#ea580c');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pr', ORD.map((k, i) => [k, (i + 1) + ' ' + PR[k][0]]), g.h - 128, S.pr, (S2, k) => { S2.pr = k; setParam(S2, 'V', V0); setParam(S2, 'Tq', T0); }, { bw: 170, col: '#ea580c' }),
      r: Q42.chips(S, 're', [['A', '↺ ارجع إلى الحالة A'], ['ex', 'تمدد إلى 3 L'], ['co', 'انضغاط إلى 0.9 L']], g.h - 84, '', (S2, k) => { if (k === 'A') { setParam(S2, 'V', V0); setParam(S2, 'Tq', T0); } else if (S2.pr === 'isochor') setParam(S2, 'Tq', k === 'ex' ? 600 : 150); else setParam(S2, 'V', k === 'ex' ? 3 : .9); }, { bw: 190 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), s = D.st(S), Cc = D.chips(S, g), A = g.A, X = V => A.x + V / 3.2 * A.w, Y = P => A.y + A.h - P / 6 * A.h;
      return [{ id: 'piston', x: g.cx + g.cw / 2, y: D.py(g, s.V) - 10, w: g.cw, h: 30, axis: 'y', keep: true, tip: 'اسحب المكبس', idle: 'اسحب ✋', drag: (S2, d) => { if (S2.pr === 'isochor') return; setParam(S2, 'V', clamp(+((g.bot - d.y - 10) / (g.bot - g.top - 20) * 3.2).toFixed(2), PR[S2.pr][3], PR[S2.pr][4])); } },
        { id: 'pt', x: X(s.V), y: Y(s.P), r: 18, axis: 'xy', keep: true, hint: false, tip: 'اسحب النقطة على المنحني', drag: (S2, d) => { if (S2.pr === 'isochor') setParam(S2, 'Tq', clamp(Math.round((A.y + A.h - d.y) / A.h * 6 * V0 / nR / 10) * 10, 150, 600)); else setParam(S2, 'V', clamp(+((d.x - A.x) / A.w * 3.2).toFixed(2), PR[S2.pr][3], PR[S2.pr][4])); } }].concat(Cc.p, Cc.r); },
    readings(S) { const s = D.st(S); return [rd('العملية', PR[S.pr][0]), rd('الضغط P', Q56.f(s.P, 2) + ' ×10⁵ Pa'), rd('الحجم V', Q56.f(s.V, 2) + ' L'), rd('درجة الحرارة T', Math.round(s.T) + ' K'), rd('الشغل ΔW', Math.round(s.W) + ' J'), rd('ΔU', Math.round(s.dU) + ' J'), rd('ΔQ', Math.round(s.Q) + ' J')]; },
    explain(S) { return Q26.ex('عندما يدفع الغاز المكبس إلى الأعلى تظهر مساحة خضراء تحت المنحني تساوي الشغل، وفي العملية ثابتة الحجم لا تظهر مساحة.', 'الشغل ΔW = F dy = P A dy = P ΔV ، وهو يساوي المساحة تحت منحني الضغط − الحجم. في العملية الأديباتيكية لا تدخل حرارة فيأتي الشغل من الطاقة الداخلية فتنخفض درجة الحرارة عند التمدد.', 'الغاز المتمدد في أسطوانات محرك السيارة يدفع المكابس فيبذل شغلاً يحرك السيارة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — المكافئ الميكانيكي للحرارة: جهاز جول (6-3، ص 121) =============== */
(() => {
  const g9 = 9.8;
  const D = { id: 'g11_th_joule', page: 121, fig: 'جهاز جول',
    desc: 'بيّن العالم جول أن الحرارة صورة من صور الطاقة: ثقلان يسقطان فيديران مجذافاً داخل ماء في إناء معزول، فيتحول الشغل الميكانيكي إلى حرارة ترفع درجة حرارة الماء. وجد جول أن كل 4.2 J من الشغل تعطي سعرة واحدة: المكافئ الميكانيكي للحرارة 4.2 J/cal.',
    tags: 'المكافئ الميكانيكي للحرارة جول 4.2 J/cal سعرة شغل حرارة مجذاف ثقلان ماء إناء معزول',
    tools: ['إناء معزول فيه ماء', 'مجذاف دوار', 'ثقلان وبكرتان', 'محرار حساس'],
    steps: ['اضغط «أسقط الثقلين» أو اسحب أحد الثقلين إلى الأسفل: يدور المجذاف ويحتك بالماء.', 'بعد كل سقوط يُرفع الثقلان دون أن يدور المجذاف.', 'كرر السقوط 10 مرات وراقب ارتفاع درجة حرارة الماء ونقاط المخطط.', 'اضغط «الحل خطوة خطوة» لتحسب الشغل والحرارة والنسبة بينهما.', 'غيّر كتلة الثقلين أو كتلة الماء: تتغير الأرقام لكن النسبة تبقى 4.2 J/cal.'],
    concl: ['الشغل الميكانيكي المبذول = عدد مرات السقوط × 2mgh.', 'الحرارة التي يكتسبها الماء Q = m c ΔT.', 'النسبة بين الشغل والحرارة ثابتة دائماً: 4.2 J لكل سعرة.', 'الحرارة والشغل صورتان لانتقال الطاقة.'],
    laws: ['g11_l6_joule'],
    controls: [R('m', 'كتلة كل ثقل', 2, 20, 10, 1, 'kg'), R('hh', 'مسافة السقوط', .5, 2, 1.5, .1, 'm'), R('mw', 'كتلة الماء', .2, 1, .5, .05, 'kg'), TG('auto', 'رفع الثقلين تلقائياً', true, null, 'refresh')],
    setup(S) { S.yf = 0; S.run = 0; S.rw = 0; S.n = 0; S.ang = 0; S.Tw = 20; S.Td = 20; S.Wt = 0; S.pts = [[0, 0]]; S.left = 0; S.ex = 0; S.k = 0; S.clk = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), cx = L + 210; return { w, h, L, cx, vx0: cx - 92, vx1: cx + 92, vy0: 392, vy1: 566, py: 236, pl: cx - 168, pr: cx + 168, wy0: 262, wy1: 540, A: { x: w - 300, y: 380, w: 268, h: 170 } }; },
    per(S) { return 2 * S.p.m * g9 * S.p.hh; },
    adv(S, dy) { if (dy <= 0) return; S.ang += dy * 14 * Math.PI; S.Wt += dy * D.per(S); S.Tw += dy * D.per(S) / (S.p.mw * 4200); },
    update(S, dt) {
      if (!S.W) return; dt = Math.min(dt, .05); S.clk += dt;
      if (S.run && !S.rw) { const ny = Math.min(1, S.yf + dt * .55); D.adv(S, ny - S.yf); S.yf = ny; }
      if (S.yf >= 1 && !S.rw) { S.n++; S.rw = 1; S.run = 0; S.pts.push([S.Wt, S.Tw - 20]); if (S.left > 0) S.left--; }
      if (S.rw) { S.yf = Q56.ease(S.yf, 0, dt, 4); if (S.yf < .01) { S.yf = 0; S.rw = 0; if (S.left > 0 || (S.p.auto && S.left > 0)) S.run = 1; } }
      S.Td = Q56.ease(S.Td, S.Tw, dt, 2.5);
    },
    ex(S) { const W = S.Wt, dT = S.Tw - 20, Qc = S.p.mw * 1000 * dT; return { title: 'المكافئ الميكانيكي للحرارة', q: 'سقط الثقلان ' + S.n + ' مرة. احسب الشغل والحرارة والنسبة بينهما.',
      lines: ['الشغل لسقطة واحدة = 2 m g h', '2 × ' + S.p.m + ' × 9.8 × ' + S.p.hh + ' = ' + Q56.n(D.per(S), 1) + ' J', 'W = ' + S.n + ' × ' + Q56.n(D.per(S), 1) + ' = ' + Q56.n(W, 0) + ' J', 'ارتفاع درجة الحرارة ΔT = ' + Q56.n(dT, 3) + ' °C', 'Q = m c ΔT = ' + (S.p.mw * 1000) + ' × 1 × ' + Q56.n(dT, 3) + ' = ' + Q56.n(Qc, 1) + ' cal', 'W ÷ Q = ' + (Qc > 0 ? Q56.n(W / Qc, 2) : '—') + ' J/cal'] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), cx = g.cx, c = S.clk, drop = S.yf * (g.wy1 - g.wy0); Q56.bg(ctx, w, h);
      // frame / bench
      K.raw(ctx, () => { const gw = ctx.createLinearGradient(0, g.vy1, 0, g.vy1 + 18); gw.addColorStop(0, '#a16207'); gw.addColorStop(1, '#713f12'); ctx.fillStyle = gw; rr(ctx, g.pl - 40, g.vy1, g.pr - g.pl + 80, 16, 4); ctx.fill();
        ctx.fillStyle = '#78350f'; [g.pl, g.pr].forEach(px => { ctx.fillRect(px - 4, g.py + 10, 8, g.vy1 - g.py - 10); }); ctx.fillRect(g.pl - 4, g.py - 4, g.pr - g.pl + 8, 8); });
      // vessel (insulated calorimeter) with cut-away water
      K.raw(ctx, () => { const gv = ctx.createLinearGradient(g.vx0 - 14, 0, g.vx1 + 14, 0); gv.addColorStop(0, '#92400e'); gv.addColorStop(.3, '#d97706'); gv.addColorStop(.7, '#b45309'); gv.addColorStop(1, '#78350f'); ctx.fillStyle = gv; rr(ctx, g.vx0 - 14, g.vy0 - 10, g.vx1 - g.vx0 + 28, g.vy1 - g.vy0 + 10, 10); ctx.fill();
        const k = (S.Td - 20) / 6; ctx.fillStyle = Q56.tc(clamp(.15 + k * .6, 0, 1), .55); rr(ctx, g.vx0, g.vy0 + 14, g.vx1 - g.vx0, g.vy1 - g.vy0 - 24, 6); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.5; ctx.beginPath(); for (let x = g.vx0; x <= g.vx1; x += 5) ctx.lineTo(x, g.vy0 + 16 + 2 * Math.sin(x / 8 + S.ang)); ctx.stroke();
        ctx.fillStyle = '#57534e'; rr(ctx, g.vx0 - 18, g.vy0 - 18, g.vx1 - g.vx0 + 36, 12, 4); ctx.fill(); });
      // shaft + paddles (rotating)
      K.raw(ctx, () => { const sg = ctx.createLinearGradient(cx - 4, 0, cx + 4, 0); sg.addColorStop(0, '#6b7280'); sg.addColorStop(.5, '#f9fafb'); sg.addColorStop(1, '#4b5563'); ctx.fillStyle = sg; ctx.fillRect(cx - 4, g.py - 30, 8, g.vy1 - 30 - g.py + 30);
        for (let r = 0; r < 3; r++) { const yy = g.vy0 + 40 + r * 40; for (let k = 0; k < 4; k++) { const a = S.ang + k * Math.PI / 2 + r * .4, cw = Math.cos(a), sn = Math.sin(a); ctx.fillStyle = 'rgba(71,85,105,' + (.45 + .35 * (sn + 1) / 2) + ')'; const x0 = cx, x1 = cx + cw * 70; ctx.fillRect(Math.min(x0, x1), yy - 8 + sn * 2, Math.abs(x1 - x0) + 1, 16); } }
        // drum
        const dg = ctx.createLinearGradient(0, g.py - 18, 0, g.py + 18); dg.addColorStop(0, '#fef3c7'); dg.addColorStop(.5, '#d97706'); dg.addColorStop(1, '#78350f'); ctx.fillStyle = dg; rr(ctx, cx - 26, g.py - 16, 52, 32, 6); ctx.fill(); ctx.strokeStyle = 'rgba(120,53,15,.6)'; ctx.lineWidth = 1; for (let i = 0; i < 6; i++) { const yy = g.py - 12 + i * 5; ctx.beginPath(); ctx.moveTo(cx - 24, yy + Math.sin(S.ang + i) * 1); ctx.lineTo(cx + 24, yy); ctx.stroke(); } });
      // strings and pulleys, falling weights
      const wy = g.wy0 + drop;
      [g.pl, g.pr].forEach((px, i) => { K.raw(ctx, () => { ctx.strokeStyle = '#44403c'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(i ? cx + 22 : cx - 22, g.py - 8); ctx.lineTo(px, g.py - 16); ctx.moveTo(px + (i ? 14 : -14), g.py); ctx.lineTo(px + (i ? 14 : -14), wy); ctx.stroke();
          ctx.save(); ctx.translate(px, g.py); ctx.rotate(S.ang * (i ? 1 : -1) * .3); const pg = ctx.createRadialGradient(-4, -4, 2, 0, 0, 16); pg.addColorStop(0, '#f3f4f6'); pg.addColorStop(1, '#4b5563'); ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(0, 0, 16, 0, TAU); ctx.fill(); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.moveTo(0, -14); ctx.lineTo(0, 14); ctx.stroke(); ctx.restore(); });
        Q42.weight(ctx, px + (i ? 14 : -14), wy + 18, 40, 30, null, ['#6b7280', '#e5e7eb', '#374151']); Q56.T(ctx, S.p.m + ' kg', px + (i ? 14 : -14), wy + 18, { s: 10, w: 900, c: '#0f172a' }); });
      if (S.yf > .02 && !S.rw) [g.pl - 14, g.pr + 14].forEach(x => Q56.bar(ctx, x + (x < cx ? -30 : 30), g.wy0 + 20, x + (x < cx ? -30 : 30), g.wy0 + 70, 5, '#dc2626', ''));
      Q56.T(ctx, 'h = ' + S.p.hh + ' m', g.pl + 46, g.wy0 + 40, { s: 10, w: 900, c: '#fff', bg: '#dc2626' });
      // thermometer into the water
      Q56.therm(ctx, cx + 56, g.vy0 + 120, 250, (S.Td - 20) / 6, Q56.f(S.Td, 2) + ' °C');
      // graph ΔT vs W
      const xm = Math.max(4000, Math.ceil(S.Wt * 1.15 / 2000) * 2000), ym = Math.max(2, Math.ceil((S.Tw - 20) * 1.15));
      const A = Q52.axes(ctx, Object.assign({ x1: xm, y1: ym, xs: xm / 10, ys: ym / 8, lx: xm / 2, ly: ym / 4 > 1 ? Math.round(ym / 4) : ym / 4, xl: 'W (J)', yl: 'ΔT (°C)' }, g.A));
      if (S.pts.length > 1) Q41.line(ctx, [[A.X(0), A.Y(0)], [A.X(xm), A.Y(xm / (S.p.mw * 4200))]], 'rgba(234,88,12,.35)', 1.5, [5, 4]);
      S.pts.forEach(p => Q41.dot(ctx, A.X(p[0]), A.Y(p[1]), '#ea580c', 4)); Q41.dot(ctx, A.X(S.Wt), A.Y(S.Tw - 20), '#dc2626', 3);
      const Qc = S.p.mw * 1000 * (S.Tw - 20);
      if (S.ex) Q56.steps(ctx, S, Object.assign(D.ex(S), { k: S.k }), { wd: 330 });
      else Q56.card(ctx, S, [{ t: 'عدد مرات السقوط: ' + S.n }, { t: 'W = ' + Q56.n(S.Wt, 0) + ' J', c: '#dc2626', w: 900 }, { t: 'ΔT = ' + Q56.f(S.Tw - 20, 3) + ' °C' }, { t: 'Q = ' + Q56.n(Qc, 1) + ' cal', c: '#ea580c', w: 900 }, { t: 'W ÷ Q = ' + (Qc > 0 ? Q56.f(S.Wt / Qc, 2) : '—') + ' J/cal', c: '#7c2d12', w: 900 }], { title: 'جهاز جول' });
      const Cc = D.chips(S, g); Q42.drawChips(ctx, Cc.a); Q56.drawSteps(ctx, Cc.e);
      Q42.banner(ctx, w, 'أسقط الثقلين: الشغل يتحول إلى حرارة في الماء', '#ea580c');
    },
    chips(S, g) { return { a: Q42.chips(S, 'go', [['one', '▶ أسقط الثقلين'], ['ten', 'أسقط 10 مرات'], ['re', '↺ ماء جديد']], g.h - 128, '', (S2, k) => { if (k === 're') { D.setup(S2); return; } if (k === 'ten') S2.left = 10; if (!S2.rw) S2.run = 1; }, { bw: 170, col: '#ea580c' }),
      e: Q56.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, 6) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Cc = D.chips(S, g), wy = g.wy0 + S.yf * (g.wy1 - g.wy0) + 18;
      return [{ id: 'wt', x: g.pr + 14, y: wy, r: 24, axis: 'y', keep: true, tip: 'اسحب الثقل إلى الأسفل', idle: 'اسحب ✋', drag: (S2, d) => { if (S2.rw) return; const ny = clamp((d.y - 18 - g.wy0) / (g.wy1 - g.wy0), 0, 1); if (ny > S2.yf) { D.adv(S2, ny - S2.yf); S2.yf = ny; } if (S2.yf >= 1) S2.yf = 1; } }].concat(Cc.a, Cc.e); },
    readings(S) { const Qc = S.p.mw * 1000 * (S.Tw - 20); return [rd('عدد مرات السقوط', S.n), rd('الشغل W', Q56.n(S.Wt, 0) + ' J'), rd('ΔT', Q56.f(S.Tw - 20, 3) + ' °C'), rd('الحرارة Q', Q56.n(Qc, 1) + ' cal'), rd('W ÷ Q', Qc > 0 ? Q56.f(S.Wt / Qc, 2) + ' J/cal' : '—')]; },
    record(S) { const Qc = S.p.mw * 1000 * (S.Tw - 20); return [S.n, Math.round(S.Wt), +(S.Tw - 20).toFixed(3), +Qc.toFixed(1), Qc > 0 ? +(S.Wt / Qc).toFixed(2) : '—']; },
    cols: ['n', 'W (J)', 'ΔT (°C)', 'Q (cal)', 'W/Q'],
    explain(S) { return Q26.ex('كلما سقط الثقلان دار المجذاف وارتفعت درجة حرارة الماء قليلاً، ونقاط المخطط تقع على خط مستقيم.', 'المجذاف يحتك بالماء فيتحول الشغل الميكانيكي 2mgh في كل سقطة إلى طاقة داخلية للماء. النسبة بين الشغل بالجول والحرارة بالسعرة ثابتة 4.2 J/cal وتسمى المكافئ الميكانيكي للحرارة.', 'عند فرك يديك ببعضهما تسخنان: الشغل يتحول إلى حرارة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — القانون الأول للديناميكا الحرارية ΔU = ΔQ − ΔW (6-3، الشكل 5، مثال 3 الشكل 8، ص 121–124) =============== */
(() => {
  const PRE = { a5: ['الشكل 5a', 1000, 600], b5: ['الشكل 5b', 1000, -600], e3a: ['مثال 3 فقرة a', 1500, 2200], e3b: ['مثال 3 فقرة b', 1500, -2200] };
  const D = { id: 'g11_th_first', page: 121, fig: 'الشكلان 5 و 8 + مثال 3',
    desc: 'القانون الأول للديناميكا الحرارية صيغة لقانون حفظ الطاقة: التغير في الطاقة الداخلية للنظام ΔU يساوي الحرارة المضافة إليه ΔQ مطروحاً منها الشغل الذي يبذله ΔW. ΔQ موجبة عندما تدخل الحرارة النظام وسالبة عندما تخرج منه، وΔW موجب عندما يبذل النظام شغلاً (يتمدد الغاز) وسالب عندما يُبذل الشغل عليه.',
    tags: 'القانون الأول الطاقة الداخلية ΔU=ΔQ-ΔW إشارة الحرارة إشارة الشغل حفظ الطاقة مثال 3 1500 2200 -700 3700',
    tools: ['غاز محصور في أسطوانة ذات مكبس', 'مصدر حراري', 'خزان يمثل الطاقة الداخلية'],
    steps: ['اسحب سهم الحرارة (البرتقالي) للأعلى لإدخال حرارة أو للأسفل لإخراجها.', 'اسحب سهم الشغل (الأخضر): للأعلى يبذل النظام شغلاً، وللأسفل يُبذل الشغل عليه.', 'راقب خزان الطاقة الداخلية U ومعادلة القانون الأول تتغير.', 'اختر مثال 3 فقرة a ثم فقرة b واضغط «الحل خطوة خطوة».'],
    concl: ['ΔU = ΔQ − ΔW ، وهو صيغة لقانون حفظ الطاقة.', 'مثال 3 a: النظام اكتسب 1500 J وبذل شغلاً 2200 J فنقصت طاقته الداخلية: ΔU = −700 J.', 'مثال 3 b: اكتسب 1500 J وبُذل عليه شغل 2200 J فزادت طاقته الداخلية: ΔU = +3700 J.', 'المكافئ الميكانيكي للحرارة 4.2 J/cal يربط وحدتي الحرارة والشغل.'],
    laws: ['g11_l6_first'],
    controls: [R('Q', 'الحرارة ΔQ', -3000, 3000, 1500, 100, 'J'), R('Wk', 'الشغل ΔW', -3000, 3000, 2200, 100, 'J'), TG('mol', 'جزيئات الغاز', true, null, 'eye')],
    setup(S) { S.pre = 'e3a'; S.Qd = 0; S.Wd = 0; S.ex = 0; S.k = 0; S.clk = 0; S.gp = Q56.gasInit(30, 7); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 120, cw: 150, top: 230, bot: 500, ux: L + 330 }; },
    update(S, dt) { if (!S.W) return; dt = Math.min(dt, .05); S.clk += dt; S.Qd = Q56.ease(S.Qd, S.p.Q, dt, 5); S.Wd = Q56.ease(S.Wd, S.p.Wk, dt, 5); const dU = S.Qd - S.Wd; Q56.gasStep(S.gp, dt, .5 * Math.sqrt(clamp(1 + dU / 5000, .3, 2)), 1, 1.2); },
    ex(S) { const Q = S.p.Q, W = S.p.Wk, dU = Q - W, P = x => x < 0 ? '(' + x + ')' : String(x); return { title: 'القانون الأول', q: 'نظام ' + (Q >= 0 ? 'اكتسب ' + Q : 'فقد ' + (-Q)) + ' J من الحرارة، ' + (W >= 0 ? 'وبذل شغلاً ' + W + ' J' : 'وبُذل عليه شغل ' + (-W) + ' J') + '. احسب ΔU.',
      lines: [(Q >= 0 ? 'الحرارة تدخل النظام' : 'الحرارة تخرج من النظام') + ': ΔQ = ' + (Q > 0 ? '+' : '') + Q + ' J', (W >= 0 ? 'النظام يبذل الشغل' : 'الشغل مبذول على النظام') + ': ΔW = ' + (W > 0 ? '+' : '') + W + ' J', 'ΔU = ΔQ − ΔW', 'ΔU = ' + P(Q) + ' − ' + P(W), 'ΔU = ' + (dU > 0 ? '+' : '') + dU + ' J', dU >= 0 ? 'الطاقة الداخلية ازدادت' : 'الطاقة الداخلية نقصت'] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), Q = S.Qd, W = S.Wd, dU = Q - W, c = S.clk, x = g.cx; Q56.bg(ctx, w, h);
      const py = g.top + 120 - W / 3000 * 70;
      // surroundings / system boundary
      K.raw(ctx, () => { ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 2.2; ctx.setLineDash([8, 6]); ctx.lineDashOffset = -c * 20; rr(ctx, x - 22, py - 30, g.cw + 44, g.bot - py + 48, 14); ctx.stroke(); ctx.setLineDash([]); });
      Q56.T(ctx, 'النظام', x - 10, py - 30, { s: 11, w: 900, c: '#fff', bg: '#ea580c' }); Q56.T(ctx, 'الوسط المحيط', g.L + 70, 100, { s: 11, w: 900, c: '#fff', bg: '#059669' });
      Q56.cyl(ctx, x, g.top - 40, g.cw, g.bot, py, { tint: Q56.tc(.5 + dU / 6000, .32), parts: S.p.mol ? S.gp : null, pc: Q56.tc(.5 + dU / 6000), rodTop: py - 70 });
      // heat arrow (below)
      const qa = Math.abs(Q) / 3000, qw = 6 + 22 * qa;
      if (Q > 20) { Q56.flames(ctx, x + 20, x + g.cw - 20, g.bot + 84, qa, c); Q56.bar(ctx, x + g.cw / 2, g.bot + 88, x + g.cw / 2, g.bot + 14, qw, '#f97316', 'ΔQ = +' + Math.round(Q), { flow: c, lx: 92 }); }
      else if (Q < -20) Q56.bar(ctx, x + g.cw / 2, g.bot + 14, x + g.cw / 2, g.bot + 88, qw, '#0ea5e9', 'ΔQ = ' + Math.round(Q), { flow: c, lx: 92 });
      // work arrow at the rod
      const wa = Math.abs(W) / 3000, ww = 6 + 22 * wa, rx = x + g.cw / 2, ry = py - 84;
      if (W > 20) { Q56.bar(ctx, rx, ry, rx, ry - 70, ww, '#16a34a', '', { flow: c }); Q56.T(ctx, 'ΔW = +' + Math.round(W), rx + 72, ry - 36, { s: 11, w: 900, c: '#fff', bg: '#15803d' }); Q56.T(ctx, 'النظام يبذل شغلاً', rx, ry - 86, { s: 10.5, w: 900, c: '#15803d' }); }
      else if (W < -20) { Q56.bar(ctx, rx, ry - 70, rx, ry, ww, '#dc2626', '', { flow: c }); Q56.T(ctx, 'ΔW = ' + Math.round(W), rx + 72, ry - 36, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' }); Q56.T(ctx, 'شغل مبذول على النظام', rx, ry - 86, { s: 10.5, w: 900, c: '#b91c1c' }); }
      // internal-energy tank
      const ux = g.ux, ut = 230, ub = 520, U0 = 4000, lv = clamp((U0 + dU) / 8000, 0, 1);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, ux, ut, 54, ub - ut, 10); ctx.fill(); const gu = ctx.createLinearGradient(0, ub - (ub - ut) * lv, 0, ub); gu.addColorStop(0, '#c4b5fd'); gu.addColorStop(1, '#6d28d9'); ctx.fillStyle = gu; rr(ctx, ux + 4, ub - (ub - ut - 8) * lv - 4, 46, (ub - ut - 8) * lv, 7); ctx.fill();
        ctx.strokeStyle = '#4c1d95'; ctx.lineWidth = 2; rr(ctx, ux, ut, 54, ub - ut, 10); ctx.stroke(); const y0 = ub - (ub - ut - 8) * .5 - 4; ctx.setLineDash([5, 4]); ctx.strokeStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(ux - 8, y0); ctx.lineTo(ux + 62, y0); ctx.stroke(); ctx.setLineDash([]); });
      Q56.T(ctx, 'U', ux + 27, ut - 14, { s: 14, w: 900, c: '#6d28d9' }); Q56.T(ctx, 'ΔU = ' + (dU > 0 ? '+' : '') + Math.round(dU) + ' J', ux + 27, ub + 22, { s: 11, w: 900, c: '#fff', bg: '#6d28d9' });
      // sign convention panel
      const px = w - 336, pY = 360; Q56.panel(ctx, px, pY, 320, 196);
      Q56.T(ctx, 'قاعدة الإشارات', px + 160, pY + 18, { s: 12, w: 900, c: '#7c2d12' });
      [['ΔQ +', 'حرارة تدخل النظام', '#f97316', Q > 20], ['ΔQ −', 'حرارة تخرج من النظام', '#0ea5e9', Q < -20], ['ΔW +', 'النظام يبذل شغلاً: يتمدد', '#16a34a', W > 20], ['ΔW −', 'شغل يُبذل على النظام: ينضغط', '#dc2626', W < -20]].forEach((r, i) => { const yy = pY + 52 + i * 36;
        K.raw(ctx, () => { ctx.fillStyle = r[3] ? 'rgba(254,215,170,.6)' : 'rgba(241,245,249,.8)'; rr(ctx, px + 10, yy - 15, 300, 30, 7); ctx.fill(); });
        Q56.T(ctx, r[0], px + 280, yy, { s: 12, w: 900, c: r[2] }); Q56.T(ctx, r[1], px + 240, yy, { s: 11, w: 800, c: '#1e293b', a: 'right' }); });
      if (S.ex) Q56.steps(ctx, S, Object.assign(D.ex(S), { k: S.k }), { wd: 330 });
      else { const P = v => v < 0 ? '(' + Math.round(v) + ')' : String(Math.round(v)); Q56.card(ctx, S, [{ t: 'ΔU = ΔQ − ΔW', s: 14, w: 900, c: '#7c2d12' }, { t: 'ΔU = ' + P(S.p.Q) + ' − ' + P(S.p.Wk) }, { t: 'ΔU = ' + (S.p.Q - S.p.Wk) + ' J', c: '#6d28d9', w: 900, s: 14 }, { t: S.p.Q - S.p.Wk > 0 ? 'الطاقة الداخلية تزداد: يسخن الغاز' : S.p.Q - S.p.Wk < 0 ? 'الطاقة الداخلية تنقص: يبرد الغاز' : 'الطاقة الداخلية لا تتغير', c: '#334155', w: 800 }], { title: 'القانون الأول للديناميكا الحرارية' }); }
      const Cc = D.chips(S, g); Q42.drawChips(ctx, Cc.p); Q56.drawSteps(ctx, Cc.e);
      Q42.banner(ctx, w, 'اسحب سهم الحرارة وسهم الشغل وراقب ΔU', '#ea580c');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pre', Object.keys(PRE).map(k => [k, PRE[k][0]]), g.h - 128, S.pre, (S2, k) => { S2.pre = k; S2.ex = 0; setParam(S2, 'Q', PRE[k][1]); setParam(S2, 'Wk', PRE[k][2]); }, { bw: 160, col: '#ea580c' }),
      e: Q56.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, 6) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Cc = D.chips(S, g), py = g.top + 120 - S.Wd / 3000 * 70;
      return [{ id: 'heat', x: g.cx + g.cw / 2, y: g.bot + 52, r: 26, axis: 'y', keep: true, tip: 'اسحب: للأعلى حرارة تدخل', idle: 'اسحب ✋', drag: (S2, d) => { S2.pre = ''; setParam(S2, 'Q', clamp(Math.round((S2.p.Q - (d.dy || 0) * 30) / 100) * 100, -3000, 3000)); } },
        { id: 'work', x: g.cx + g.cw / 2, y: py - 120, r: 26, axis: 'y', keep: true, hint: false, tip: 'اسحب: للأعلى النظام يبذل شغلاً', drag: (S2, d) => { S2.pre = ''; setParam(S2, 'Wk', clamp(Math.round((S2.p.Wk - (d.dy || 0) * 30) / 100) * 100, -3000, 3000)); } }].concat(Cc.p, Cc.e); },
    readings(S) { return [rd('ΔQ', S.p.Q + ' J'), rd('ΔW', S.p.Wk + ' J'), rd('ΔU = ΔQ − ΔW', (S.p.Q - S.p.Wk) + ' J')]; },
    explain(S) { return Q26.ex('عندما تدخل حرارة أكثر من الشغل الذي يبذله النظام يرتفع مستوى خزان الطاقة الداخلية ويسخن الغاز، والعكس صحيح.', 'الطاقة لا تفنى ولا تستحدث: الطاقة التي تدخل النظام بالحرارة إما أن تخرج منه بالشغل أو تبقى فيه زيادة في طاقته الداخلية، فيكون ΔU = ΔQ − ΔW.', 'عند نفخ إطار الدراجة بسرعة يسخن المنفاخ لأن الشغل المبذول على الهواء يزيد طاقته الداخلية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — العملية ثابتة الضغط: الشغل P ΔV والرئتان (6-4، الشكلان 6 و 7a، مثال 1، ص 122–123) =============== */
(() => {
  const X0 = 10, XM = 22; // gas column (cm)
  const D = { id: 'g11_th_isobar', page: 122, fig: 'الشكلان 6 و 7a + مثال 1',
    desc: 'غاز محصور في أسطوانة ذات مكبس مساحته A يؤثر فيه بقوة F = P A. عندما يتمدد الغاز بضغط ثابت ويدفع المكبس مسافة Δx يبذل شغلاً ΔW = F Δx = P A Δx = P ΔV ، وهو المساحة المستطيلة تحت منحني الضغط − الحجم (الشكل 7a). مثال 1: يزداد حجم رئتي إنسان 500 cm³ في كل شهيق والضغط 10⁵ Pa ، فالشغل المبذول في كل نفس 50 J.',
    tags: 'العملية الأيزوبارية ثبوت الضغط الشغل W=PΔV F=PA مكبس الرئتان التنفس مثال 1 500 cm3 50 J',
    tools: ['أسطوانة ذات مكبس عليه أثقال', 'مصدر حراري', 'مسطرة', 'نموذج الرئتين'],
    steps: ['في وضع «المكبس» اضغط «سخّن» أو اسحب المكبس: يتمدد الغاز بضغط ثابت.', 'راقب القوة F = P A ، والإزاحة Δx ، والتغير في الحجم ΔV = A Δx.', 'لاحظ المساحة المستطيلة في المخطط: إنها الشغل P ΔV.', 'اختر «الرئتان: مثال 1» واضغط «تنفّس» ثم «الحل خطوة خطوة».'],
    concl: ['عند ثبوت الضغط: ΔW = P ΔV.', 'الشغل يساوي مساحة المستطيل تحت الخط الأفقي في مخطط الضغط − الحجم.', 'مثال 1: ΔW = 10⁵ × 500 × 10⁻⁶ = 50 J في كل نفس.', 'يجب تحويل الحجم من cm³ إلى m³ بالضرب في 10⁻⁶.'],
    laws: ['g11_l6_work'],
    controls: [R('P', 'الضغط P', 1, 3, 1, .5, '×10⁵ Pa'), R('A', 'مساحة المكبس A', 50, 200, 100, 10, 'cm²'), R('dV', 'زيادة حجم الرئتين في الشهيق', 100, 1000, 500, 50, 'cm³')],
    setup(S) { S.md = 'pis'; S.x = X0; S.tx = X0; S.heat = 0; S.br = 0; S.bph = 0; S.nb = 0; S.Wb = 0; S.ex = 0; S.k = 0; S.clk = 0; S.gp = Q56.gasInit(28, 5); S.inh = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 60, cw: 150, top: 200, bot: 540, A: { x: w - 300, y: 380, w: 268, h: 170 } }; },
    update(S, dt) {
      if (!S.W) return; dt = Math.min(dt, .05); S.clk += dt;
      if (S.md === 'pis') { if (S.heat) S.tx = clamp(S.tx + S.heat * 2.2 * dt, X0 - 4, XM); if (S.tx >= XM || S.tx <= X0 - 4) S.heat = 0; S.x = Q56.ease(S.x, S.tx, dt, 8); Q56.gasStep(S.gp, dt, .45 * Math.sqrt(S.x / X0), 1, 1); }
      else { if (S.br) { const o = S.bph; S.bph += dt / 3.2; if (o < .5 && S.bph >= .5) { S.nb++; S.Wb += S.p.dV * 1e-6 * S.p.P * 1e5; } if (S.bph >= 1) { S.bph = 0; } } S.inh = Q56.ease(S.inh, S.br ? (S.bph < .5 ? 1 : 0) : 0, dt, 3); }
    },
    W(S) { return S.p.P * S.p.A * (S.x - X0) * .1; },
    ex(S) { const v = S.p.dV, P = S.p.P, W = P * 1e5 * v * 1e-6; return { title: 'مثال 1 ص 123', q: 'يزداد حجم رئتي إنسان ' + v + ' cm³ في كل نفس، والضغط ' + (P === 1 ? '10⁵' : P + ' × 10⁵') + ' Pa. احسب الشغل في كل نفس.',
      lines: ['ΔV = ' + v + ' cm³ = ' + v + ' × 10⁻⁶ m³', 'العملية بضغط ثابت: ΔW = P ΔV', 'ΔW = ' + (P === 1 ? '10⁵' : P + ' × 10⁵') + ' × ' + v + ' × 10⁻⁶', 'ΔW = ' + Q56.n(W, 1) + ' J'] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = S.clk; Q56.bg(ctx, w, h);
      if (S.md === 'pis') {
        const x = g.cx, sc = 12, py = g.bot - S.x * sc, p0 = g.bot - X0 * sc, W = D.W(S), F = S.p.P * 1e5 * S.p.A * 1e-4;
        Q56.cyl(ctx, x, g.top - 20, g.cw, g.bot, py, { tint: Q56.tc(.25 + (S.x - X0) / 20, .3), parts: S.gp, pc: Q56.tc(.25 + (S.x - X0) / 20), rod: false });
        const nW = Math.round(S.p.P * 2); for (let i = 0; i < nW; i++) Q42.weight(ctx, x + g.cw / 2, py - 26 - i * 13, 110 - i * 6, 12, null);
        if (S.heat > 0 || S.heat < 0) { if (S.heat > 0) { Q56.flames(ctx, x + 14, x + g.cw - 14, g.bot + 64, .8, c); Q56.bar(ctx, x + g.cw / 2, g.bot + 66, x + g.cw / 2, g.bot + 14, 14, '#f97316', 'ΔQ', { flow: c, lx: 34 }); } else Q56.bar(ctx, x + g.cw / 2, g.bot + 14, x + g.cw / 2, g.bot + 66, 14, '#0ea5e9', 'ΔQ', { flow: c, lx: 34 }); }
        Q56.bar(ctx, x + g.cw + 40, py + 60, x + g.cw + 40, py - 10, 10, '#7c3aed', ''); Q56.T(ctx, 'F = P A = ' + Q56.n(F, 0) + ' N', x + g.cw + 110, py + 24, { s: 10.5, w: 900, c: '#fff', bg: '#6d28d9' });
        K.raw(ctx, () => { ctx.strokeStyle = 'rgba(15,23,42,.4)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x - 30, p0); ctx.lineTo(x + g.cw + 10, p0); ctx.stroke(); ctx.setLineDash([]); });
        if (Math.abs(S.x - X0) > .3) { Q56.bar(ctx, x - 24, p0, x - 24, py, 4, S.x > X0 ? '#16a34a' : '#dc2626', ''); Q56.T(ctx, 'Δx = ' + Q56.f(S.x - X0, 1) + ' cm', x + g.cw / 2, p0 + 14, { s: 10, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.85)' }); }
        // P–V rectangle (fig 7a)
        const Vm = S.p.A * XM / 1000 * 1.1, Vi = S.p.A * X0 / 1000, Vf = S.p.A * S.x / 1000;
        const A = Q52.axes(ctx, Object.assign({ x1: +Vm.toFixed(1), y1: 4, xs: Vm > 3 ? .5 : .25, ys: .5, lx: Vm > 3 ? 1 : .5, ly: 1, xl: 'V (L)', yl: 'P ×10⁵ Pa' }, g.A));
        K.raw(ctx, () => { ctx.fillStyle = Vf > Vi ? 'rgba(22,163,74,.3)' : 'rgba(220,38,38,.28)'; ctx.fillRect(A.X(Math.min(Vi, Vf)), A.Y(S.p.P), Math.abs(A.X(Vf) - A.X(Vi)), A.Y(0) - A.Y(S.p.P)); });
        Q41.line(ctx, [[A.X(Vi), A.Y(S.p.P)], [A.X(Vf), A.Y(S.p.P)]], '#ea580c', 3); Q41.dot(ctx, A.X(Vi), A.Y(S.p.P), '#0f172a', 4); Q41.knob(ctx, A.X(Vf), A.Y(S.p.P), '#ea580c', 7);
        Q56.T(ctx, 'ΔW = P ΔV', A.X((Vi + Vf) / 2), A.Y(S.p.P / 2), { s: 10, w: 900, c: '#14532d' });
        Q56.card(ctx, S, [{ t: 'F = P A = ' + Q56.n(F, 0) + ' N' }, { t: 'Δx = ' + Q56.f(S.x - X0, 1) + ' cm' }, { t: 'ΔV = A Δx = ' + Q56.n(S.p.A * (S.x - X0), 0) + ' cm³' }, { t: 'ΔW = F Δx = P ΔV', c: '#7c2d12', w: 900 }, { t: 'ΔW = ' + Q56.n(W, 1) + ' J', c: W >= 0 ? '#15803d' : '#b91c1c', w: 900, s: 14 }], { title: 'الشغل بضغط ثابت' });
      } else {
        // torso and lungs (example 1)
        const cx = g.L + 190, cy = 380, k = 1 + S.inh * S.p.dV / 2500;
        K.raw(ctx, () => { const gs = ctx.createLinearGradient(cx - 150, 0, cx + 150, 0); gs.addColorStop(0, '#fcd9b6'); gs.addColorStop(.5, '#fde7d0'); gs.addColorStop(1, '#f2c49b'); ctx.fillStyle = gs; ctx.beginPath(); ctx.moveTo(cx - 60, 170); ctx.quadraticCurveTo(cx - 150 * k, 200, cx - 140 * k, 330); ctx.lineTo(cx - 120, 560); ctx.lineTo(cx + 120, 560); ctx.lineTo(cx + 140 * k, 330); ctx.quadraticCurveTo(cx + 150 * k, 200, cx + 60, 170); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#c2410c'; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(cx, 120, 46, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#e5e7eb'; ctx.fillRect(cx - 7, 180, 14, 70);
          [-1, 1].forEach(sd => { const gl = ctx.createRadialGradient(cx + sd * 58 - 10, 320, 10, cx + sd * 58, 340, 90 * k); gl.addColorStop(0, '#fecdd3'); gl.addColorStop(1, '#e11d48'); ctx.fillStyle = gl; ctx.beginPath(); ctx.ellipse(cx + sd * 62 * k, 345, 50 * k, 92 * Math.sqrt(k), sd * .12, 0, TAU); ctx.fill(); ctx.strokeStyle = '#9f1239'; ctx.lineWidth = 1.2; ctx.stroke();
            ctx.strokeStyle = 'rgba(159,18,57,.45)'; ctx.beginPath(); ctx.moveTo(cx + sd * 6, 250); ctx.quadraticCurveTo(cx + sd * 40, 290, cx + sd * 60 * k, 330); ctx.moveTo(cx + sd * 40, 290); ctx.lineTo(cx + sd * 70 * k, 290); ctx.stroke(); });
          ctx.strokeStyle = '#b45309'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 120 * k, 470); ctx.quadraticCurveTo(cx, 430 + 30 * S.inh, cx + 120 * k, 470); ctx.stroke(); });
        Q56.T(ctx, 'الحجاب الحاجز', cx + 120, 492, { s: 10, w: 800, c: '#92400e' });
        if (S.br) { const inh = S.bph < .5; Q56.bar(ctx, cx + 80, inh ? 96 : 140, cx + 56, inh ? 140 : 96, 10, inh ? '#0ea5e9' : '#94a3b8', '', { flow: c }); Q56.T(ctx, inh ? 'شهيق: الرئتان تتمددان' : 'زفير', cx + 92, 66, { s: 11, w: 900, c: '#fff', bg: inh ? '#0284c7' : '#64748b' }); }
        // one-breath P–V rectangle
        const Vm = 1.2, A = Q52.axes(ctx, Object.assign({ x1: Vm, y1: 4, xs: .1, ys: .5, lx: .4, ly: 1, xl: 'ΔV (L)', yl: 'P ×10⁵ Pa' }, g.A)), dv = S.inh * S.p.dV / 1000;
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(22,163,74,.3)'; ctx.fillRect(A.X(0), A.Y(S.p.P), A.X(dv) - A.X(0), A.Y(0) - A.Y(S.p.P)); }); Q41.line(ctx, [[A.X(0), A.Y(S.p.P)], [A.X(dv), A.Y(S.p.P)]], '#e11d48', 3);
        if (S.ex) Q56.steps(ctx, S, Object.assign(D.ex(S), { k: S.k }), { wd: 330 });
        else Q56.card(ctx, S, [{ t: 'زيادة الحجم في الشهيق ΔV = ' + S.p.dV + ' cm³' }, { t: 'P = ' + (S.p.P === 1 ? '10⁵' : S.p.P + ' × 10⁵') + ' Pa' }, { t: 'ΔW = P ΔV = ' + Q56.n(S.p.P * S.p.dV * .1, 1) + ' J', c: '#15803d', w: 900, s: 14 }, { t: 'عدد الأنفاس: ' + S.nb }, { t: 'الشغل الكلي: ' + Q56.n(S.Wb, 0) + ' J', c: '#7c2d12', w: 900 }], { title: 'مثال 1: الرئتان' });
      }
      const Cc = D.chips(S, g); Q42.drawChips(ctx, Cc.m); Q42.drawChips(ctx, Cc.a); if (Cc.e) Q56.drawSteps(ctx, Cc.e);
      Q42.banner(ctx, w, S.md === 'pis' ? 'سخّن الغاز أو اسحب المكبس: الضغط ثابت' : 'اضغط «تنفّس» وراقب تمدد الرئتين', '#ea580c');
    },
    chips(S, g) { const m = Q42.chips(S, 'md', [['pis', 'المكبس: الشكل 6'], ['lung', 'الرئتان: مثال 1']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.ex = 0; }, { bw: 170, col: '#ea580c', x1: g.L + 360 });
      if (S.md === 'pis') return { m, a: Q42.chips(S, 'h', [['up', 'سخّن'], ['dn', 'برّد'], ['re', '↺']], g.h - 128, S.heat > 0 ? 'up' : S.heat < 0 ? 'dn' : '', (S2, k) => { if (k === 're') { S2.tx = X0; S2.heat = 0; } else S2.heat = k === 'up' ? (S2.heat > 0 ? 0 : 1) : (S2.heat < 0 ? 0 : -1); }, { bw: 110, x0: g.L + 370 }) };
      return { m, a: Q42.chips(S, 'b', [['go', S.br ? '⏸ أوقف' : '▶ تنفّس'], ['re', '↺']], g.h - 128, '', (S2, k) => { if (k === 're') { S2.nb = 0; S2.Wb = 0; S2.br = 0; S2.bph = 0; } else S2.br = S2.br ? 0 : 1; }, { bw: 130, x0: g.L + 370 }),
        e: Q56.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, 4) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Cc = D.chips(S, g), out = [];
      if (S.md === 'pis') out.push({ id: 'pis', x: g.cx + g.cw / 2, y: g.bot - S.x * 12 - 30, w: 120, h: 40, axis: 'y', keep: true, tip: 'اسحب المكبس', idle: 'اسحب ✋', drag: (S2, d) => { S2.heat = 0; S2.tx = clamp((g.bot - d.y - 30) / 12, X0 - 4, XM); } });
      else out.push({ id: 'chest', x: g.L + 190, y: 345, r: 60, axis: 'none', tip: 'اضغط: تنفّس', idle: 'اضغط ✋', click: S2 => { S2.br = S2.br ? 0 : 1; } });
      return out.concat(Cc.m, Cc.a, Cc.e || []); },
    readings(S) { return S.md === 'pis' ? [rd('الضغط P', S.p.P + ' ×10⁵ Pa'), rd('Δx', Q56.f(S.x - X0, 1) + ' cm'), rd('ΔV', Q56.n(S.p.A * (S.x - X0), 0) + ' cm³'), rd('ΔW = P ΔV', Q56.n(D.W(S), 1) + ' J')] : [rd('ΔV في كل نفس', S.p.dV + ' cm³'), rd('الشغل في كل نفس', Q56.n(S.p.P * S.p.dV * .1, 1) + ' J'), rd('عدد الأنفاس', S.nb), rd('الشغل الكلي', Q56.n(S.Wb, 0) + ' J')]; },
    explain(S) { return Q26.ex('عند التسخين يرتفع المكبس والأثقال عليه دون أن يتغير الضغط، وتظهر في المخطط مساحة مستطيلة.', 'الغاز يؤثر في المكبس بقوة F = P A ، فإذا تحرك المكبس Δx كان الشغل F Δx = P A Δx = P ΔV. وفي الرئتين يكون الضغط ثابتاً تقريباً (الضغط الجوي) فالشغل في كل نفس 10⁵ × 500 × 10⁻⁶ = 50 J.', 'عضلات الحجاب الحاجز تبذل شغلاً في كل نفس تأخذه.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — العملية الأيزوثرمية: مثال 2 (6-4، الشكل 7b، ص 123–124) =============== */
(() => {
  const D = { id: 'g11_th_isoth', page: 123, fig: 'الشكل 7b + مثال 2',
    desc: 'في العملية الأيزوثرمية تبقى درجة حرارة الغاز ثابتة (الأسطوانة في حوض ماء كبير والتمدد بطيء)، فلا تتغير الطاقة الداخلية ΔU = 0 ويكون ΔQ = ΔW = Pi Vi ln(Vf / Vi). مثال 2: هواء حجمه 0.2 m³ وضغطه 10⁶ N/m² تمدد حتى أصبح حجمه 0.6 m³ عند 300 K ، فالشغل ΔW = 0.2 × 10⁶ × 2.303 log 3 ≈ 2.197 × 10⁵ J.',
    tags: 'العملية الأيزوثرمية ثبوت درجة الحرارة ln 2.303 log مثال 2 0.2 m3 0.6 m3 10^6 300K شغل منحني',
    tools: ['أسطوانة ذات مكبس فيها هواء', 'حوض ماء كبير بدرجة 300 K', 'مقياس ضغط', 'محرار'],
    steps: ['اسحب المكبس ببطء إلى الأعلى: يبقى المحرار عند 300 K.', 'اسحبه بسرعة: تنخفض درجة الحرارة لحظياً ثم تعود بعد أن تنتقل الحرارة من الحوض.', 'راقب منحني P − V (القطع الزائد) والمساحة تحته = الشغل.', 'اضغط «تمدد بطيء إلى Vf» ثم «الحل خطوة خطوة» لمثال 2.'],
    concl: ['عند ثبوت درجة الحرارة PV ثابت فيقل الضغط كلما زاد الحجم.', 'ΔU = 0 لذلك الحرارة الممتصة من الحوض تساوي الشغل: ΔQ = ΔW.', 'ΔW = Pi Vi ln(Vf/Vi) = Pi Vi ln(Pi/Pf).', 'مثال 2: ΔW = 0.4606 × 10⁶ × 0.477 ≈ 2.197 × 10⁵ J.'],
    laws: ['g11_l6_isoth', 'g11_l6_first'],
    controls: [R('Vi', 'الحجم الابتدائي Vi', .1, .4, .2, .05, 'm³'), R('Vf', 'الحجم النهائي Vf', .3, 1, .6, .05, 'm³'), R('Pi', 'الضغط الابتدائي Pi', .5, 2, 1, .1, '×10⁶ Pa')],
    setup(S) { S.V = .2; S.tV = .2; S.Tg = 300; S.Wn = 0; S.auto = 0; S.ex = 0; S.k = 0; S.clk = 0; S.gp = Q56.gasInit(30, 11); S.lastVi = .2; S.lastPi = 1; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 60, cw: 140, top: 200, bot: 540, A: { x: w - 300, y: 380, w: 268, h: 170 } }; },
    reset(S) { S.V = S.p.Vi; S.tV = S.p.Vi; S.Tg = 300; S.Wn = 0; S.auto = 0; S.lastVi = S.p.Vi; S.lastPi = S.p.Pi; },
    P(S) { return S.p.Pi * S.p.Vi / S.V * S.Tg / 300; },
    update(S, dt) {
      if (!S.W) return; dt = Math.min(dt, .05); S.clk += dt;
      if (S.p.Vi !== S.lastVi || S.p.Pi !== S.lastPi) D.reset(S);
      const vmax = Math.max(S.p.Vf, S.p.Vi + .05); if (S.auto) { S.tV = Math.min(vmax, S.tV + dt * .05); if (S.tV >= vmax) S.auto = 0; }
      S.tV = clamp(S.tV, S.p.Vi * .6, 1.05);
      const ov = S.V; S.V = Q56.ease(S.V, S.tV, dt, 6); const dV = S.V - ov;
      S.Wn += D.P(S) * 1e6 * dV; S.Tg += -(2 / 3) * S.Tg * dV / S.V + (300 - S.Tg) * Math.min(1, dt * 1.6);
      Q56.gasStep(S.gp, dt, .45 * Math.sqrt(S.Tg / 300), 1, 1);
    },
    ex(S) { const Vi = S.p.Vi, Vf = S.p.Vf, Pi = S.p.Pi, r = Vf / Vi, PV = Pi * Vi; const ps = Pi === 1 ? '10⁶' : Pi + ' × 10⁶'; return { title: 'مثال 2 ص 124', q: 'هواء حجمه ' + Vi + ' m³ وضغطه ' + ps + ' N/m² تمدد إلى ' + Vf + ' m³ عند 300 K. احسب الشغل.',
      lines: ['درجة الحرارة ثابتة: عملية أيزوثرمية', 'ΔW = Pi Vi ln(Vf / Vi)', 'ΔW = ' + ps + ' × ' + Vi + ' × ln(' + Vf + ' / ' + Vi + ')', 'ΔW = ' + Q56.n(PV, 3) + ' × 10⁶ × 2.303 log ' + Q56.n(r, 3), 'ΔW = ' + Q56.n(PV * 2.303, 4) + ' × 10⁶ × ' + Q56.n(Math.log10(r), 3), 'ΔW ≈ ' + Q56.n(PV * 2.303 * Math.log10(r) * 10, 3) + ' × 10⁵ J'] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), x = g.cx, c = S.clk, sc = (g.bot - g.top - 40) / 1.05, py = g.bot - S.V * sc, P = D.P(S); Q56.bg(ctx, w, h);
      K.raw(ctx, () => { const gb = ctx.createLinearGradient(0, 300, 0, g.bot + 30); gb.addColorStop(0, 'rgba(125,211,252,.4)'); gb.addColorStop(1, 'rgba(3,105,161,.5)'); ctx.fillStyle = gb; rr(ctx, x - 40, 300, g.cw + 80, g.bot - 270, 12); ctx.fill(); ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); for (let xx = x - 40; xx <= x + g.cw + 40; xx += 6) ctx.lineTo(xx, 302 + 2 * Math.sin(xx / 9 + c * 3)); ctx.stroke(); });
      Q56.cyl(ctx, x, g.top - 30, g.cw, g.bot, py, { tint: Q56.tc((S.Tg - 260) / 80, .3), parts: S.gp, pc: Q56.tc((S.Tg - 260) / 80), rodTop: py - 70 });
      Q56.T(ctx, 'حوض ماء 300 K', x + g.cw / 2, g.bot + 42, { s: 10.5, w: 900, c: '#fff', bg: '#0369a1' });
      if (S.Tg < 299.5) { [x - 30, x + g.cw + 30].forEach(xx => Q56.bar(ctx, xx + (xx < x ? -0 : 0), 440, xx + (xx < x ? 22 : -22), 440, 8, '#f97316', '')); Q56.T(ctx, 'حرارة تدخل من الحوض', x + g.cw / 2, 470, { s: 10, w: 900, c: '#fff', bg: '#ea580c' }); }
      Q43.gauge(ctx, x + g.cw + 90, g.top + 10, 32, P / (S.p.Pi * 1.3), 'P = ' + Q56.f(P, 2) + ' ×10⁶', '#7c2d12');
      Q56.therm(ctx, x + g.cw + 90, g.bot - 40, 170, (S.Tg - 260) / 60, Q56.f(S.Tg, 1) + ' K', S.Tg < 298 ? '#0284c7' : '#ef4444');
      if (S.Tg < 297) Q56.T(ctx, 'اسحب ببطء', x + g.cw + 90, g.bot - 4, { s: 11, w: 900, c: '#fff', bg: '#dc2626' });
      // graph
      const vm = 1.1, pm = Math.ceil(S.p.Pi * 1.2 * 2) / 2, A = Q52.axes(ctx, Object.assign({ x1: vm, y1: pm, xs: .1, ys: pm / 8, lx: .2, ly: pm / 4, xl: 'V (m³)', yl: 'P ×10⁶ Pa' }, g.A));
      const iso = []; for (let V = Math.max(.08, S.p.Pi * S.p.Vi / pm); V <= vm; V += .01) iso.push([A.X(V), A.Y(S.p.Pi * S.p.Vi / V)]); Q41.line(ctx, iso, 'rgba(22,163,74,.5)', 1.6, [6, 4]);
      const v0 = S.p.Vi, v1 = S.V, pts = []; for (let i = 0; i <= 40; i++) { const V = v0 + (v1 - v0) * i / 40; pts.push([A.X(V), A.Y(S.p.Pi * S.p.Vi / V)]); }
      if (Math.abs(v1 - v0) > .005) K.raw(ctx, () => { ctx.fillStyle = v1 > v0 ? 'rgba(22,163,74,.28)' : 'rgba(220,38,38,.25)'; ctx.beginPath(); ctx.moveTo(A.X(v0), A.Y(0)); pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(A.X(v1), A.Y(0)); ctx.closePath(); ctx.fill(); });
      Q41.line(ctx, pts, '#16a34a', 3); Q41.dot(ctx, A.X(v0), A.Y(S.p.Pi), '#0f172a', 4); Q41.knob(ctx, A.X(v1), A.Y(P), '#16a34a', 7);
      K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(A.X(S.p.Vf), A.Y(0)); ctx.lineTo(A.X(S.p.Vf), A.Y(pm)); ctx.stroke(); ctx.setLineDash([]); }); Q42.T(ctx, 'Vf', A.X(S.p.Vf) + 10, A.Y(pm) + 8, { s: 10, w: 900, c: '#dc2626' });
      const Wth = S.p.Pi * 1e6 * S.p.Vi * Math.log(S.V / S.p.Vi);
      if (S.ex) Q56.steps(ctx, S, Object.assign(D.ex(S), { k: S.k }), { wd: 330 });
      else Q56.card(ctx, S, [{ t: 'V = ' + Q56.f(S.V, 3) + ' m³' }, { t: 'P = ' + Q56.f(P, 3) + ' ×10⁶ Pa' }, { t: 'PV = ' + Q56.f(P * S.V, 3) + ' ×10⁶ J' }, { t: 'ΔW = Pi Vi ln(V/Vi)', c: '#7c2d12' }, { t: 'ΔW = ' + Q56.f(Wth / 1e5, 3) + ' ×10⁵ J', c: '#15803d', w: 900, s: 14 }, { t: 'الطاقة الداخلية ثابتة: ΔQ = ΔW', c: '#64748b' }], { title: 'العملية الأيزوثرمية' });
      const Cc = D.chips(S, g); Q42.drawChips(ctx, Cc.a); Q56.drawSteps(ctx, Cc.e);
      Q42.banner(ctx, w, 'اسحب المكبس ببطء: درجة الحرارة ثابتة', '#ea580c');
    },
    chips(S, g) { return { a: Q42.chips(S, 'go', [['slow', '▶ تمدد بطيء إلى Vf'], ['fast', 'تمدد سريع'], ['re', '↺ ارجع إلى Vi']], g.h - 128, '', (S2, k) => { if (k === 're') D.reset(S2); else if (k === 'slow') S2.auto = 1; else { S2.auto = 0; S2.tV = Math.max(S2.p.Vf, S2.p.Vi + .05); } }, { bw: 180, col: '#ea580c' }),
      e: Q56.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة: مثال 2', S2 => { setParam(S2, 'Vi', .2); setParam(S2, 'Vf', .6); setParam(S2, 'Pi', 1); }, 6) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Cc = D.chips(S, g), sc = (g.bot - g.top - 40) / 1.05;
      return [{ id: 'pis', x: g.cx + g.cw / 2, y: g.bot - S.V * sc - 60, w: 80, h: 70, axis: 'y', keep: true, tip: 'اسحب المكبس ببطء', idle: 'اسحب ✋', drag: (S2, d) => { S2.auto = 0; S2.tV = clamp((g.bot - d.y - 60) / sc, S2.p.Vi * .6, 1.05); } }].concat(Cc.a, Cc.e); },
    readings(S) { return [rd('الحجم V', Q56.f(S.V, 3) + ' m³'), rd('الضغط P', Q56.f(D.P(S), 3) + ' ×10⁶ Pa'), rd('درجة الحرارة', Q56.f(S.Tg, 1) + ' K'), rd('ΔW', Q56.f(S.p.Pi * 10 * S.p.Vi * Math.log(S.V / S.p.Vi), 3) + ' ×10⁵ J')]; },
    explain(S) { return Q26.ex('كلما زاد الحجم قل الضغط بحيث يبقى حاصل ضربهما ثابتاً، ويبقى المحرار عند 300 K إذا كان التمدد بطيئاً.', 'الغاز يبذل شغلاً عند التمدد فيفقد طاقة، لكن الحوض الكبير يعوضه بحرارة مساوية، فلا تتغير الطاقة الداخلية: ΔU = 0 و ΔQ = ΔW = Pi Vi ln(Vf/Vi).', 'تتمدد فقاعات الهواء ببطء وهي تصعد في بحيرة عميقة درجة حرارتها ثابتة تقريباً.'); }
  };
  M8.P[D.id] = D;
})();

/* ---- kit extras: gear and heat-engine diagram (figs 10, 11, 12) ---- */
Object.assign(Q56, {
  gear(ctx, x, y, r, a, col = '#64748b') {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); const n = 10; ctx.beginPath();
      for (let i = 0; i < n * 2; i++) { const ang = i * Math.PI / n, rr2 = i % 2 ? r * .82 : r; ctx.lineTo(Math.cos(ang - .12) * rr2, Math.sin(ang - .12) * rr2); ctx.lineTo(Math.cos(ang + .12) * rr2, Math.sin(ang + .12) * rr2); }
      ctx.closePath(); const g = ctx.createRadialGradient(-r * .3, -r * .3, 2, 0, 0, r); g.addColorStop(0, '#f1f5f9'); g.addColorStop(1, col); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(0, 0, r * .25, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.5)'; ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(Math.cos(i * Math.PI / 2) * r * .28, Math.sin(i * Math.PI / 2) * r * .28); ctx.lineTo(Math.cos(i * Math.PI / 2) * r * .7, Math.sin(i * Math.PI / 2) * r * .7); ctx.stroke(); }
      ctx.restore(); });
  },
  /* heat engine diagram. o: {sc (max value), noCold, noHot, rev (refrigerator), u (unit), noW, lab:{QH,QC,W}} */
  engineDiag(ctx, cx, top, bot, QH, QC, W, c, o = {}) {
    const ey = (top + bot) / 2, er = 44, sc = o.sc || Math.max(QH, 1), wd = v => 4 + 30 * clamp(Math.abs(v) / sc, 0, 1), u = o.u || 'J', fl = o.still ? null : c;
    if (!o.noHot) Q56.res(ctx, cx - 120, top, 240, 62, true, o.hl || 'المستودع الحار TH', c);
    if (!o.noCold) Q56.res(ctx, cx - 120, bot - 62, 240, 62, false, o.cl || 'المستودع البارد TC', c);
    const L = o.lab || {};
    if (!o.rev) {
      if (QH > 0) Q56.bar(ctx, cx, top + 64, cx, ey - er - 2, wd(QH), '#ef4444', L.QH || 'QH = ' + Q56.n(QH, 1) + ' ' + u, { flow: fl, lx: 96 });
      if (!o.noCold && QC > 0) Q56.bar(ctx, cx, ey + er + 2, cx, bot - 64, wd(QC), '#0ea5e9', L.QC || 'QC = ' + Q56.n(QC, 1) + ' ' + u, { flow: fl, lx: 96 });
      if (!o.noW && W > 0) Q56.bar(ctx, cx + er + 2, ey, cx + er + 120, ey, wd(W), '#16a34a', '', { flow: fl });
    } else {
      if (QC > 0) Q56.bar(ctx, cx, bot - 64, cx, ey + er + 2, wd(QC), '#0ea5e9', L.QC || 'QC', { flow: fl, lx: 70 });
      if (QH > 0) Q56.bar(ctx, cx, ey - er - 2, cx, top + 64, wd(QH), '#ef4444', L.QH || 'QH', { flow: fl, lx: 70 });
      if (!o.noW && W > 0) Q56.bar(ctx, cx + er + 120, ey, cx + er + 2, ey, wd(W), '#16a34a', '', { flow: fl });
    }
    if (!o.noW && W > 0) Q56.T(ctx, L.W || 'W = ' + Q56.n(W, 1) + ' ' + u, cx + er + 62, ey - wd(W) / 2 - 16, { s: 11, w: 900, c: '#fff', bg: '#15803d' });
    K.raw(ctx, () => { const g = ctx.createRadialGradient(cx - 12, ey - 12, 4, cx, ey, er); g.addColorStop(0, '#f8fafc'); g.addColorStop(1, '#94a3b8'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, ey, er, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 2.4; ctx.stroke(); });
    Q56.gear(ctx, cx, ey, er * .62, (o.ang != null ? o.ang : c), '#94a3b8');
    Q56.T(ctx, o.en || (o.rev ? 'ثلاجة' : 'المحرك'), cx - er - 34, ey, { s: 11, w: 900, c: '#fff', bg: '#334155' });
  }
});

/* =============== C3 — العملية الأديباتيكية: المنفاخ المعزول (6-4، الشكل 7c، ص 123) =============== */
(() => {
  const T0 = 300, nR = 1e5 * 1e-3 / 300, CV = 2.5 * nR, VMIN = .3, VMAX = 1.6;
  const D = { id: 'g11_th_adiab', page: 123, fig: 'الشكل 7c',
    desc: 'في العملية الأديباتيكية لا تدخل الحرارة إلى النظام ولا تخرج منه ΔQ = 0 ، إما لأن النظام معزول حرارياً أو لأن العملية سريعة جداً لا تسمح بانتقال الحرارة. من القانون الأول ΔU = −ΔW: الشغل المبذول على الغاز عند ضغطه بسرعة يزيد طاقته الداخلية فترتفع درجة حرارته، وعند تمدده بسرعة يبذل شغلاً على حساب طاقته الداخلية فيبرد.',
    tags: 'العملية الأديباتيكية الكظمية عزل حراري ΔQ=0 ΔW=-ΔU منفاخ الدراجة ضغط سريع تمدد سريع تبريد تسخين',
    tools: ['منفاخ دراجة (أسطوانة ومكبس)', 'غلاف عازل للحرارة', 'محرار', 'مقياس ضغط'],
    steps: ['اسحب المكبس إلى الأسفل بسرعة أو اضغط «ضغط سريع»: يسخن الهواء دون أن تدخله حرارة.', 'اسحب المكبس إلى الأعلى بسرعة: يبرد الهواء.', 'قارن المسار في المخطط بالمنحني الأيزوثرمي المتقطع.', 'ألغِ «العزل الحراري» من اللوحة وقلّل سرعة المكبس: تقترب العملية من الأيزوثرمية.'],
    concl: ['في العملية الأديباتيكية ΔQ = 0 فيكون ΔW = −ΔU.', 'الضغط السريع يزيد الطاقة الداخلية فيسخن الغاز، كما يسخن منفاخ الدراجة.', 'التمدد السريع يُنقص الطاقة الداخلية فيبرد الغاز.', 'منحني العملية الأديباتيكية أشد انحداراً من منحني العملية الأيزوثرمية.'],
    laws: ['g11_l6_adiab', 'g11_l6_first'],
    controls: [TG('ins', 'عزل حراري تام', true, null, 'eye'), R('spd', 'سرعة حركة المكبس', 1, 10, 8, 1, ''), R('k', 'سرعة تسرب الحرارة دون عزل', .2, 3, 1, .2, ''), TG('mol', 'جزيئات الغاز', true, null, 'eye')],
    setup(S) { S.V = 1; S.tV = 1; S.Tg = T0; S.Wc = 0; S.Qc = 0; S.tr = [[1, 1]]; S.clk = 0; S.gp = Q56.gasInit(30, 3); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 70, cw: 130, top: 150, bot: 560, sc: 230, A: { x: w - 300, y: 390, w: 268, h: 170 } }; },
    reset(S) { S.V = 1; S.tV = 1; S.Tg = T0; S.Wc = 0; S.Qc = 0; S.tr = [[1, 1]]; },
    P(S) { return nR * S.Tg / (S.V * 1e-3) / 1e5; },
    update(S, dt) {
      if (!S.W) return; dt = Math.min(dt, .05); S.clk += dt;
      const ov = S.V; S.V = Q56.ease(S.V, S.tV, dt, S.p.spd * .9); const dV = (S.V - ov) * 1e-3, P = nR * S.Tg / (S.V * 1e-3), dW = P * dV;
      S.Wc += dW; S.Tg -= dW / CV;
      if (!S.p.ins) { const o = S.Tg; S.Tg += (T0 - S.Tg) * Math.min(1, S.p.k * dt); S.Qc += CV * (S.Tg - o); }
      const l = S.tr[S.tr.length - 1], p = D.P(S); if (Math.abs(l[0] - S.V) > .004 || Math.abs(l[1] - p) > .01) { S.tr.push([S.V, p]); if (S.tr.length > 500) S.tr.shift(); }
      Q56.gasStep(S.gp, dt, .5 * Math.sqrt(S.Tg / T0), 1, 1 / clamp(S.V, .3, 1.6));
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = S.clk, x = g.cx, py = g.bot - S.V * g.sc, k = (S.Tg - 200) / 300, dU = CV * (S.Tg - T0);
      Q56.bg(ctx, w, h);
      // tyre and hose (bicycle pump)
      K.raw(ctx, () => { ctx.strokeStyle = '#111827'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x + g.cw + 9, g.bot - 10); ctx.bezierCurveTo(x + g.cw + 70, g.bot - 10, x + g.cw + 60, g.bot - 110, x + g.cw + 108, g.bot - 110); ctx.stroke(); });
      Q56.cyl(ctx, x, g.top, g.cw, g.bot, py, { ins: S.p.ins, tint: Q56.tc(k, .35), parts: S.p.mol ? S.gp : null, pc: Q56.tc(k), rodTop: py - 90 });
      if (!S.p.ins && Math.abs(S.Tg - T0) > 3) { const out = S.Tg > T0; [0, 1].forEach(i => { const yy = g.bot - 60 - i * 70; if (yy < py + 10) return; Q56.bar(ctx, out ? x - 12 : x - 70, yy, out ? x - 70 : x - 12, yy, 6 + Math.min(14, Math.abs(S.Tg - T0) / 8), out ? '#f97316' : '#0ea5e9', '', { flow: c }); }); Q56.T(ctx, S.Tg > T0 ? 'حرارة تتسرب للخارج' : 'حرارة تدخل من الخارج', x + g.cw / 2, g.bot + 40, { s: 10.5, w: 900, c: '#fff', bg: S.Tg > T0 ? '#c2410c' : '#0369a1' }); }
      else if (S.p.ins) Q56.T(ctx, 'عازل حراري: ΔQ = 0', x + g.cw / 2, g.bot + 40, { s: 10.5, w: 900, c: '#78350f', bg: '#fde68a' });
      Q56.therm(ctx, x + g.cw + 70, g.bot - 170, 220, k, Q56.f(S.Tg, 0) + ' K', S.Tg > T0 + 2 ? '#ef4444' : S.Tg < T0 - 2 ? '#3b82f6' : '#f59e0b');
      // tyre
      K.raw(ctx, () => { const tx = x + g.cw + 150, ty = g.bot - 110; ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(tx, ty, 42, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 1.5; for (let i = 0; i < 12; i++) { const a = i * TAU / 12; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + Math.cos(a) * 36, ty + Math.sin(a) * 36); ctx.stroke(); } ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(tx, ty, 6, 0, TAU); ctx.fill(); });
      // P–V graph: isotherm dashed + adiabat + trace
      const A = Q52.axes(ctx, Object.assign({ x1: 1.7, y1: 6, xs: .1, ys: 1, lx: .5, ly: 1, xl: 'V (L)', yl: 'P ×10⁵ Pa' }, g.A));
      const iso = [], adi = []; for (let v = .28; v <= 1.7; v += .02) { iso.push([A.X(v), A.Y(Math.min(6.2, 1 / v))]); adi.push([A.X(v), A.Y(Math.min(6.2, Math.pow(1 / v, 1.4)))]); }
      Q41.line(ctx, iso, '#0ea5e9', 1.6, [5, 4]); Q41.line(ctx, adi, 'rgba(234,88,12,.45)', 1.6);
      Q41.line(ctx, S.tr.map(q => [A.X(q[0]), A.Y(Math.min(6.2, q[1]))]), '#dc2626', 3); Q41.knob(ctx, A.X(S.V), A.Y(Math.min(6.2, D.P(S))), '#dc2626', 7);
      Q56.T(ctx, 'أيزوثرمي', A.X(1.45), A.Y(1 / 1.45) - 14, { s: 9.5, w: 900, c: '#0369a1' }); Q56.T(ctx, 'أديباتيكي', A.X(.55), A.Y(Math.pow(1 / .55, 1.4)) - 6, { s: 9.5, w: 900, c: '#c2410c', a: 'left' });
      const P = v => v < 0 ? '(' + Q56.n(v, 1) + ')' : Q56.n(v, 1);
      Q56.card(ctx, S, [{ t: 'ΔQ = ' + Q56.n(S.Qc, 1) + ' J', c: '#c2410c' }, { t: 'ΔW = ' + Q56.n(S.Wc, 1) + ' J', c: '#15803d' }, { t: 'ΔU = ΔQ − ΔW = ' + P(S.Qc) + ' − ' + P(S.Wc) }, { t: 'ΔU = ' + Q56.n(dU, 1) + ' J', c: '#6d28d9', w: 900, s: 14 }, { t: S.p.ins ? 'معزول حرارياً فلا تنتقل حرارة' : 'غير معزول: تتسرب الحرارة فيقترب من الأيزوثرمي', c: '#334155', w: 800 }].concat(S.p.ins ? [{ t: 'ΔQ = 0 ⟹ ΔW = −ΔU', c: '#7c2d12', w: 900 }] : []), { title: 'العملية الأديباتيكية' });
      const Cc = D.chips(S, g); Q42.drawChips(ctx, Cc.a);
      Q42.banner(ctx, w, 'اضغط المكبس بسرعة: يسخن الهواء دون حرارة', '#ea580c');
    },
    chips(S, g) { return { a: Q42.chips(S, 'go', [['cmp', '⬇ ضغط سريع'], ['exp', '⬆ تمدد سريع'], ['re', '↺ من جديد']], g.h - 128, '', (S2, k) => { if (k === 're') D.reset(S2); else S2.tV = k === 'cmp' ? .35 : 1.55; }, { bw: 170, col: '#ea580c' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Cc = D.chips(S, g), py = g.bot - S.V * g.sc;
      return [{ id: 'pis', x: g.cx + g.cw / 2, y: py - 40, w: 110, h: 70, axis: 'y', keep: true, tip: 'اسحب المكبس بسرعة', idle: 'اسحب ✋', drag: (S2, d) => { S2.tV = clamp((g.bot - d.y - 40) / g.sc, VMIN, VMAX); } }].concat(Cc.a); },
    readings(S) { return [rd('الحجم V', Q56.f(S.V, 2) + ' L'), rd('الضغط P', Q56.f(D.P(S), 2) + ' ×10⁵ Pa'), rd('درجة الحرارة', Q56.f(S.Tg, 0) + ' K'), rd('ΔQ', Q56.n(S.Qc, 1) + ' J'), rd('ΔW', Q56.n(S.Wc, 1) + ' J'), rd('ΔU', Q56.n(CV * (S.Tg - T0), 1) + ' J')]; },
    explain(S) { return Q26.ex('عند ضغط المكبس بسرعة في الأسطوانة المعزولة ترتفع درجة حرارة الهواء مع أنه لم يأخذ أي حرارة، وعند سحبه بسرعة تنخفض.', 'لا تدخل الحرارة ولا تخرج ΔQ = 0 ، فمن القانون الأول ΔU = −ΔW: الشغل المبذول على الغاز (ΔW سالب) يزيد طاقته الداخلية فيسخن.', 'يسخن منفاخ الدراجة عند النفخ السريع، ويبرد الهواء الخارج بسرعة من صمام الإطار أو من علبة رذاذ.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C4 — سؤال ص 125: إشارات ΔQ و ΔW و ΔU لثلاث عمليات =============== */
(() => {
  const SY = ['?', '+', '−', '0'];
  const SC = [{ n: 'نفخ سريع لإطار دراجة', s: 'النظام: الهواء في المضخة', a: [3, 2, 1], why: 'سريع فلا حرارة، شغل على الهواء، يسخن' },
    { n: 'ماء على موقد ساخن', s: 'النظام: الماء في القدر', a: [1, 3, 1], why: 'حرارة تدخل، الحجم ثابت، يسخن' },
    { n: 'هواء يتسرب من بالونة', s: 'النظام: الهواء داخل البالونة', a: [3, 1, 2], why: 'سريع فلا حرارة، الهواء يبذل شغلاً، يبرد' }];
  const RW = ['ΔQ', 'ΔW', 'ΔU'];
  const D = { id: 'g11_th_signs', page: 125, fig: 'سؤال ص 125',
    desc: 'سؤال الكتاب ص 125: لكل عملية من العمليات الآتية حدد النظام ثم بيّن هل كل من ΔQ و ΔW و ΔU موجب أم سالب أم صفر: (a) نفخ سريع لإطار دراجة، النظام الهواء في المضخة. (b) ماء بدرجة حرارة الغرفة على موقد ساخن، النظام الماء في القدر. (c) هواء يتسرب بسرعة خارج بالونة، النظام الهواء داخل البالونة.',
    tags: 'سؤال إشارات موجب سالب صفر نفخ إطار دراجة مضخة موقد قدر ماء بالونة تسرب هواء ΔQ ΔW ΔU',
    tools: ['منفاخ وإطار دراجة', 'قدر ماء على موقد', 'بالونة منفوخة'],
    steps: ['شاهد كل عملية متحركة وحدد النظام.', 'اضغط على كل خانة في الجدول لتختار + أو − أو 0.', 'اضغط «تحقق» لترى الإجابات الصحيحة والخاطئة.', 'اضغط «أظهر الإجابة» لمقارنة إجابتك بإجابة الكتاب.'],
    concl: ['النفخ السريع: ΔQ = 0 ، ΔW سالب ، ΔU موجب.', 'الماء على الموقد: ΔQ موجب ، ΔW = 0 ، ΔU موجب.', 'تسرب الهواء من البالونة: ΔQ = 0 ، ΔW موجب ، ΔU سالب.', 'العملية السريعة جداً أديباتيكية لأن الحرارة لا تجد وقتاً لتنتقل.'],
    laws: ['g11_l6_first', 'g11_l6_adiab'],
    controls: [TG('anim', 'تشغيل الحركة', true, null, 'eye'), TG('ans', 'إظهار إجابة الكتاب', false, null, 'eye')],
    setup(S) { S.cell = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; S.chk = 0; S.clk = 0; S.a = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), gap = 12, pw = (w - L - 32 - gap * 2) / 3; return { w, h, L, gap, pw, x0: L + 20, top: 62, ay: 120, tb: 390 }; },
    px(g, i) { return g.x0 + i * (g.pw + g.gap); },
    update(S, dt) { if (!S.W) return; dt = Math.min(dt, .05); if (S.p.anim) { S.clk += dt; } },
    score(S) { let n = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (S.cell[i][j] === SC[i].a[j]) n++; return n; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = S.clk; Q56.bg(ctx, w, h);
      SC.forEach((sc, i) => { const x = D.px(g, i), cx = x + g.pw / 2, ph = (c * .5 + i * .3) % 1;
        Q56.panel(ctx, x, g.top, g.pw, h - 160 - g.top, ['#ea580c', '#dc2626', '#0284c7'][i]);
        Q56.T(ctx, ['a', 'b', 'c'][i], x + g.pw - 16, g.top + 18, { s: 12, w: 900, c: '#fff', bg: '#7c2d12' });
        Q56.T(ctx, sc.n, cx, g.top + 20, { s: 12, w: 900, c: '#1e293b' }); Q56.T(ctx, sc.s, cx, g.top + 42, { s: 10.5, w: 800, c: '#64748b' });
        const ay = g.ay, ab = g.tb - 30;
        if (i === 0) { // pump compressing fast
          const st = .5 + .5 * Math.cos(c * 6), cw = 60, top = ay + 20, bot = ab - 10, py = top + 30 + st * (bot - top - 70), heat = Math.min(1, .3 + c * .03 % .7);
          Q56.cyl(ctx, cx - cw / 2 - 30, top, cw, bot, py, { tint: Q56.tc(.3 + .5 * (1 - st), .4), rodTop: py - 50, ph: 12 });
          K.raw(ctx, () => { ctx.strokeStyle = '#111827'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx - 30 + cw / 2 + 9, bot - 6); ctx.quadraticCurveTo(cx + 40, bot, cx + 50, bot - 60); ctx.stroke(); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(cx + 58, bot - 100, 36, 0, TAU); ctx.stroke(); });
          if (heat) Q56.bar(ctx, cx - 30, py - 70, cx - 30, py - 20, 10, '#dc2626', '', { flow: c });
        } else if (i === 1) { // pot on stove
          const sy = ab - 72; Q56.stove(ctx, cx, sy, Math.min(190, g.pw - 20), .8, c);
          K.raw(ctx, () => { const pw2 = 120, pt = sy - 100; const gp = ctx.createLinearGradient(cx - pw2 / 2, 0, cx + pw2 / 2, 0); gp.addColorStop(0, '#6b7280'); gp.addColorStop(.4, '#e5e7eb'); gp.addColorStop(1, '#4b5563'); ctx.fillStyle = gp; rr(ctx, cx - pw2 / 2, pt, pw2, 92, 8); ctx.fill();
            ctx.fillStyle = Q56.tc(.2 + .5 * Math.min(1, (c % 20) / 20), .75); ctx.fillRect(cx - pw2 / 2 + 6, pt + 18, pw2 - 12, 68);
            ctx.fillStyle = 'rgba(255,255,255,.75)'; for (let b = 0; b < 7; b++) { const bx = cx - 45 + b * 15, by = pt + 82 - ((c * 30 + b * 13) % 60); ctx.beginPath(); ctx.arc(bx, by, 2.5 + (b % 3), 0, TAU); ctx.fill(); }
            ctx.strokeStyle = '#374151'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx - pw2 / 2 - 18, pt + 10); ctx.lineTo(cx - pw2 / 2, pt + 10); ctx.moveTo(cx + pw2 / 2, pt + 10); ctx.lineTo(cx + pw2 / 2 + 18, pt + 10); ctx.stroke(); });
          Q56.bar(ctx, cx + 70, sy + 4, cx + 70, sy - 60, 10, '#f97316', '', { flow: c });
          Q56.T(ctx, 'الحجم ثابت', cx, ay + 10, { s: 10, w: 800, c: '#7c2d12' });
        } else { // balloon leaking fast
          const k2 = 1 - .55 * ph, by = ay + 110;
          K.raw(ctx, () => { const gb = ctx.createRadialGradient(cx - 20 * k2, by - 25 * k2, 5, cx, by, 70 * k2); gb.addColorStop(0, '#fecdd3'); gb.addColorStop(1, Q56.tc(.5 - .4 * ph) ); ctx.fillStyle = gb; ctx.beginPath(); ctx.ellipse(cx, by, 58 * k2, 70 * k2, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#9f1239'; ctx.lineWidth = 1.4; ctx.stroke();
            const ny = by + 70 * k2; ctx.fillStyle = '#be123c'; ctx.beginPath(); ctx.moveTo(cx - 6, ny - 2); ctx.lineTo(cx + 6, ny - 2); ctx.lineTo(cx + 4, ny + 10); ctx.lineTo(cx - 4, ny + 10); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = 'rgba(56,189,248,.8)'; ctx.lineWidth = 2; for (let s = 0; s < 5; s++) { const d = (c * 120 + s * 18) % 90; ctx.beginPath(); ctx.moveTo(cx - 8 + s * 4, ny + 12 + d); ctx.lineTo(cx - 10 + s * 5, ny + 22 + d); ctx.stroke(); } });
          Q56.T(ctx, 'الهواء الخارج يبرد', cx, ab - 6, { s: 10, w: 800, c: '#0369a1' });
        }
        // table
        RW.forEach((r, j) => { const yy = g.tb + 22 + j * 56, cell = S.cell[i][j], show = S.p.ans, right = SC[i].a[j];
          Q56.T(ctx, r, x + g.pw - 40, yy, { s: 15, w: 900, c: '#7c2d12' });
          K.raw(ctx, () => { ctx.fillStyle = cell ? '#fff7ed' : '#f1f5f9'; ctx.strokeStyle = S.chk && cell ? (cell === right ? '#16a34a' : '#dc2626') : '#94a3b8'; ctx.lineWidth = 2; rr(ctx, x + 26, yy - 20, 80, 40, 9); ctx.fill(); ctx.stroke(); });
          Q56.T(ctx, SY[cell], x + 66, yy, { s: 22, w: 900, c: cell ? '#0f172a' : '#94a3b8' });
          if (S.chk && cell) Q56.stamp(ctx, x + 124, yy, cell === right, 12);
          if (show) Q56.T(ctx, SY[right], x + g.pw - 82, yy, { s: 15, w: 900, c: '#fff', bg: '#15803d' }); });
        if (S.p.ans) Q56.T(ctx, sc.why, cx, g.tb - 10, { s: 10, w: 800, c: '#15803d', bg: 'rgba(255,255,255,.9)' });
      });
      const Cc = D.chips(S, g); Q42.drawChips(ctx, Cc.a);
      if (S.chk) Q56.T(ctx, 'النتيجة: ' + D.score(S) + ' من 9', w - 120, h - 84, { s: 13, w: 900, c: '#fff', bg: D.score(S) === 9 ? '#15803d' : '#b45309' });
      Q42.banner(ctx, w, 'اضغط كل خانة لتختار + أو − أو 0', '#ea580c');
    },
    chips(S, g) { return { a: Q42.chips(S, 'q', [['chk', '✔ تحقق'], ['ans', S.p.ans ? 'أخفِ الإجابة' : 'أظهر الإجابة'], ['clr', '↺ امسح']], g.h - 128, S.chk ? 'chk' : '', (S2, k) => { if (k === 'chk') S2.chk = 1; else if (k === 'ans') setParam(S2, 'ans', !S2.p.ans); else { S2.cell = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; S2.chk = 0; setParam(S2, 'ans', false); } }, { bw: 170, col: '#ea580c' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Cc = D.chips(S, g), out = [];
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const ii = i, jj = j; out.push(Object.assign({ id: 'c' + i + j, x: D.px(g, i) + 66, y: g.tb + 22 + j * 56, w: 80, h: 40, axis: 'none', tip: 'اضغط لتغيير الإشارة', click: S2 => { S2.cell[ii][jj] = S2.cell[ii][jj] % 3 + 1; } }, i || j ? { hint: false } : { idle: 'اضغط ✋' })); }
      return out.concat(Cc.a); },
    readings(S) { return [rd('الخانات المملوءة', S.cell.flat().filter(v => v).length + ' من 9'), rd('الإجابات الصحيحة', S.chk ? D.score(S) + ' من 9' : '—')]; },
    explain(S) { return Q26.ex('في النفخ السريع وتسرب الهواء السريع لا تنتقل حرارة، أما الماء على الموقد فيأخذ حرارة دون أن يتغير حجمه.', 'نطبق ΔU = ΔQ − ΔW: (a) ΔQ = 0 و ΔW سالب فـ ΔU موجب. (b) ΔW = 0 و ΔQ موجب فـ ΔU موجب. (c) ΔQ = 0 و ΔW موجب فـ ΔU سالب.', 'لهذا يبرد فم البالونة أو علبة الرذاذ عند خروج الغاز منها بسرعة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — هل تعلم: القانون الأول وجسم الإنسان (الشكل 9، ص 126) =============== */
(() => {
  // [name, hours, Q (×10⁶ J), W (×10⁶ J), kind]
  const ACT = [['الفطور', 1, 5.0, .7, 'm'], ['عمل الصباح', 4, 0, 4.3, 'w'], ['الغداء', 1, 5.0, .7, 'm'], ['عمل ما بعد الظهيرة', 4, 0, 4.3, 'w'], ['العشاء', 1, 6.5, .7, 'm'], ['التمارين', 1, 0, 2.1, 'x'], ['الدراسة والتلفزيون', 4, 0, 1.7, 'w'], ['النوم', 8, 0, 2.0, 's']];
  const D = { id: 'g11_th_body', page: 126, fig: 'الشكل 9 + هل تعلم',
    desc: 'هل تعلم ص 126: يمكن تطبيق القانون الأول للديناميكا الحرارية على جسم الإنسان. الطعام يزود الجسم بالطاقة ΔQ ، والجسم يبذل شغلاً ΔW في العمل والتمارين وحتى في النوم. في يوم نموذجي (الشكل 9) مجموع الطاقة المكتسبة 16.5 × 10⁶ J ومجموع الطاقة المبذولة 16.5 × 10⁶ J فيكون ΔU = 0 ولا يتغير وزن الشخص.',
    tags: 'هل تعلم جسم الإنسان الطعام الطاقة الفطور الغداء العشاء التمارين النوم 16.5 مليون جول القانون الأول الوزن',
    tools: ['جدول أنشطة يوم كامل (الشكل 9)', 'ساعة', 'مخطط الطاقة مع الزمن'],
    steps: ['اضغط «ابدأ اليوم» وراقب الساعة تمر على أنشطة اليوم.', 'لاحظ أن الطاقة تدخل الجسم في الوجبات فقط، والشغل يُبذل طوال اليوم.', 'اسحب مؤشر الزمن على المخطط لتنتقل إلى أي ساعة.', 'غيّر «ساعات التمارين» أو «طاقة العشاء» من اللوحة وانظر إلى ΔU في نهاية اليوم.'],
    concl: ['الطاقة المكتسبة من الطعام في اليوم 16.5 × 10⁶ J.', 'الطاقة المبذولة في اليوم 16.5 × 10⁶ J.', 'ΔU = ΔQ − ΔW = 0 فلا يتغير وزن الشخص.', 'إذا زادت التمارين أو قل الطعام صار ΔU سالباً فيستهلك الجسم مخزونه وينقص وزنه.'],
    laws: ['g11_l6_first'],
    controls: [R('ex', 'ساعات التمارين', 0, 3, 1, .5, 'h'), R('din', 'طاقة العشاء', 0, 10, 6.5, .5, '×10⁶ J'), R('spd', 'سرعة مرور الوقت', .5, 6, 2, .5, 'h/s')],
    setup(S) { S.hr = 0; S.run = 0; S.ex = 0; S.k = 0; S.clk = 0; S.hd = 0; },
    acts(S) { return ACT.map(a => a[0] === 'التمارين' ? [a[0], S.p.ex, 0, 2.1 * S.p.ex, a[4]] : a[0] === 'العشاء' ? [a[0], a[1], S.p.din, a[3], a[4]] : a); },
    tot(S) { return D.acts(S).reduce((s, a) => s + a[1], 0); },
    at(S, t) { let Q = 0, W = 0, cur = -1, h0 = 0; D.acts(S).forEach((a, i) => { const f = a[1] > 0 ? clamp((t - h0) / a[1], 0, 1) : (t >= h0 ? 1 : 0); Q += a[2] * f; W += a[3] * f; if (t >= h0 && t < h0 + a[1]) cur = i; h0 += a[1]; }); return { Q, W, cur }; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, fx: L + 130, A: { x: L + 56, y: 390, w: Math.max(200, w - L - 56 - 372), h: 200 } }; },
    update(S, dt) { if (!S.W) return; dt = Math.min(dt, .05); S.clk += dt; const T = D.tot(S); if (S.run) { S.hr = Math.min(T, S.hr + S.p.spd * dt); if (S.hr >= T) S.run = 0; } S.hr = Math.min(S.hr, T); S.hd = Q56.ease(S.hd, S.hr, dt, 10); },
    ex(S) { const A = D.acts(S), Q = A.reduce((s, a) => s + a[2], 0), W = A.reduce((s, a) => s + a[3], 0), f = v => Q56.n(v, 1); return { title: 'حساب طاقة اليوم', q: 'احسب مجموع الطاقة المكتسبة والمبذولة في اليوم ثم ΔU.',
      lines: ['ΔQ = ' + A.filter(a => a[2]).map(a => f(a[2])).join(' + ') + ' = ' + f(Q) + ' ×10⁶ J', 'ΔW = ' + A.filter(a => a[3]).map(a => f(a[3])).join(' + '), 'ΔW = ' + f(W) + ' ×10⁶ J', 'ΔU = ΔQ − ΔW = ' + f(Q) + ' − ' + f(W), 'ΔU = ' + f(Q - W) + ' ×10⁶ J', Math.abs(Q - W) < .05 ? 'لا يتغير وزن الشخص' : Q > W ? 'يخزن الجسم الزيادة فيزداد الوزن' : 'يستهلك الجسم مخزونه فينقص الوزن'] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = S.clk, A0 = D.acts(S), T = D.tot(S), now = D.at(S, S.hd), cur = now.cur >= 0 ? A0[now.cur] : null, dU = now.Q - now.W;
      Q56.bg(ctx, w, h);
      // clock
      const ox = g.L + 290, oy = 150; K.raw(ctx, () => { const gc = ctx.createRadialGradient(ox - 10, oy - 10, 4, ox, oy, 52); gc.addColorStop(0, '#fff'); gc.addColorStop(1, '#e2e8f0'); ctx.fillStyle = gc; ctx.beginPath(); ctx.arc(ox, oy, 50, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.stroke();
        for (let i = 0; i < 12; i++) { const a = i * TAU / 12; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ox + Math.cos(a) * 42, oy + Math.sin(a) * 42); ctx.lineTo(ox + Math.cos(a) * 48, oy + Math.sin(a) * 48); ctx.stroke(); }
        const hh = (7 + S.hd) % 12, ah = hh / 12 * TAU - Math.PI / 2, am = (S.hd % 1) * TAU - Math.PI / 2; ctx.strokeStyle = '#0f172a'; ctx.lineCap = 'round'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + Math.cos(ah) * 26, oy + Math.sin(ah) * 26); ctx.stroke(); ctx.lineWidth = 2.5; ctx.strokeStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + Math.cos(am) * 38, oy + Math.sin(am) * 38); ctx.stroke(); ctx.lineCap = 'butt'; });
      Q56.T(ctx, 'الساعة ' + Q56.f(S.hd, 1) + ' من بداية اليوم', ox, oy + 68, { s: 10.5, w: 800, c: '#334155' });
      // person
      const fx = g.fx, sleep = cur && cur[4] === 's', bob = cur && cur[4] === 'x' ? Math.sin(c * 9) * 6 : 0;
      K.raw(ctx, () => { ctx.save(); ctx.translate(fx, 190 + bob); if (sleep) { ctx.rotate(-Math.PI / 2); ctx.translate(-60, 0); }
        const gs = ctx.createLinearGradient(-50, 0, 50, 0); gs.addColorStop(0, '#fdba74'); gs.addColorStop(.5, '#fed7aa'); gs.addColorStop(1, '#fb923c'); ctx.fillStyle = '#fde3c8'; ctx.beginPath(); ctx.arc(0, -72, 30, 0, TAU); ctx.fill(); ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#2563eb'; rr(ctx, -44, -38, 88, 120, 22); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#1e3a8a'; ctx.fillRect(-36, 82, 30, 60); ctx.fillRect(6, 82, 30, 60);
        // internal energy store in the torso
        const lv = clamp(.5 + dU / 12, 0, 1); ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, -20, -26, 40, 96, 8); ctx.fill(); const gu = ctx.createLinearGradient(0, 70, 0, -26); gu.addColorStop(0, '#6d28d9'); gu.addColorStop(1, '#c4b5fd'); ctx.fillStyle = gu; rr(ctx, -16, 66 - 88 * lv, 32, 88 * lv, 6); ctx.fill(); ctx.strokeStyle = '#4c1d95'; ctx.lineWidth = 1.6; rr(ctx, -20, -26, 40, 96, 8); ctx.stroke();
        ctx.restore(); });
      if (sleep) Q56.T(ctx, 'z z z', fx + 70, 120 + Math.sin(c * 2) * 4, { s: 14, w: 900, c: '#64748b' });
      Q56.T(ctx, 'U', fx, 136 + bob, { s: 11, w: 900, c: '#fff', bg: '#6d28d9' });
      if (cur) { Q56.T(ctx, cur[0], fx, 72, { s: 13, w: 900, c: '#fff', bg: cur[2] ? '#c2410c' : '#15803d' });
        if (cur[2] > 0 && S.run) Q56.bar(ctx, fx - 120, 118, fx - 34, 118, 16, '#f97316', 'ΔQ', { flow: c, ly: -22 });
        if (cur[3] > 0 && S.run) Q56.bar(ctx, fx + 48, 230, fx + 48 + 30 + 40 * cur[3] / cur[1] / 2.1, 230, 6 + 10 * Math.min(1, cur[3] / cur[1] / 2.1), '#16a34a', 'ΔW', { flow: c, ly: -20 }); }
      else if (S.hd >= T - 1e-6) Q56.T(ctx, 'انتهى اليوم', fx, 72, { s: 13, w: 900, c: '#fff', bg: '#6d28d9' });
      // energy graph
      const xm = Math.max(24, Math.ceil(T / 4) * 4), ymax = Math.max(18, Math.ceil(Math.max(now.Q, now.W, A0.reduce((s, a) => s + a[2], 0), A0.reduce((s, a) => s + a[3], 0)) / 3) * 3);
      const AX = Q52.axes(ctx, Object.assign({ x1: xm, y0: -6, y1: ymax, xs: 2, ys: 3, lx: 4, ly: 6, xl: 't (h)', yl: '×10⁶ J' }, g.A));
      // activity bands
      let h0 = 0; A0.forEach((a, i) => { if (a[1] > 0) K.raw(ctx, () => { ctx.fillStyle = a[2] ? 'rgba(249,115,22,.12)' : 'rgba(22,163,74,.06)'; ctx.fillRect(AX.X(h0), g.A.y, AX.X(h0 + a[1]) - AX.X(h0), g.A.h); }); h0 += a[1]; });
      const ser = [[], [], []]; for (let t = 0; t <= S.hd + 1e-6; t += .1) { const v = D.at(S, Math.min(t, S.hd)); ser[0].push([AX.X(t), AX.Y(v.Q)]); ser[1].push([AX.X(t), AX.Y(v.W)]); ser[2].push([AX.X(t), AX.Y(v.Q - v.W)]); }
      { const v = D.at(S, S.hd); ser[0].push([AX.X(S.hd), AX.Y(v.Q)]); ser[1].push([AX.X(S.hd), AX.Y(v.W)]); ser[2].push([AX.X(S.hd), AX.Y(v.Q - v.W)]); }
      Q41.line(ctx, ser[0], '#ea580c', 2.6); Q41.line(ctx, ser[1], '#16a34a', 2.6); Q41.line(ctx, ser[2], '#7c3aed', 2.6);
      K.raw(ctx, () => { ctx.strokeStyle = '#0f172a'; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(AX.X(S.hd), g.A.y); ctx.lineTo(AX.X(S.hd), g.A.y + g.A.h); ctx.stroke(); ctx.setLineDash([]); });
      Q41.knob(ctx, AX.X(S.hd), g.A.y - 6, '#0f172a', 7);
      [['ΔQ', '#ea580c'], ['ΔW', '#16a34a'], ['ΔU', '#7c3aed']].forEach((q, i) => Q56.T(ctx, q[0], g.A.x + 30 + i * 52, g.A.y + 14, { s: 11, w: 900, c: '#fff', bg: q[1] }));
      // table (fig 9) or step solution
      if (S.ex) Q56.steps(ctx, S, Object.assign(D.ex(S), { k: S.k }), { wd: 340 });
      else { const px = w - 352, pY = 64, rh = 31, pw = 340; Q56.panel(ctx, px, pY, pw, 66 + A0.length * rh + 66);
        Q56.T(ctx, 'النشاط', px + pw - 70, pY + 20, { s: 11, w: 900, c: '#7c2d12' }); Q56.T(ctx, 'الزمن h', px + 150, pY + 20, { s: 10.5, w: 900, c: '#7c2d12' }); Q56.T(ctx, 'ΔQ', px + 92, pY + 20, { s: 11, w: 900, c: '#c2410c' }); Q56.T(ctx, 'ΔW', px + 38, pY + 20, { s: 11, w: 900, c: '#15803d' });
        Q56.T(ctx, '×10⁶ J', px + 65, pY + 38, { s: 9, w: 800, c: '#64748b' });
        A0.forEach((a, i) => { const yy = pY + 60 + i * rh, on = now.cur === i; if (on) K.raw(ctx, () => { ctx.fillStyle = 'rgba(253,186,116,.55)'; rr(ctx, px + 6, yy - 13, pw - 12, 26, 6); ctx.fill(); });
          Q56.T(ctx, a[0], px + pw - 14, yy, { s: 11, w: on ? 900 : 700, c: '#1e293b', a: 'right' }); Q56.T(ctx, Q56.n(a[1], 1), px + 150, yy, { s: 11, w: 800, c: '#334155' }); Q56.T(ctx, a[2] ? Q56.f(a[2], 1) : '—', px + 92, yy, { s: 11, w: 800, c: '#c2410c' }); Q56.T(ctx, Q56.f(a[3], 1), px + 38, yy, { s: 11, w: 800, c: '#15803d' }); });
        const yT = pY + 60 + A0.length * rh + 4, Qt = A0.reduce((s, a) => s + a[2], 0), Wt = A0.reduce((s, a) => s + a[3], 0);
        K.raw(ctx, () => { ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(px + 10, yT - 14); ctx.lineTo(px + pw - 10, yT - 14); ctx.stroke(); });
        Q56.T(ctx, 'المجموع', px + pw - 14, yT + 4, { s: 11.5, w: 900, c: '#7c2d12', a: 'right' }); Q56.T(ctx, Q56.n(T, 1), px + 150, yT + 4, { s: 11, w: 900, c: '#334155' }); Q56.T(ctx, Q56.f(Qt, 1), px + 92, yT + 4, { s: 11.5, w: 900, c: '#c2410c' }); Q56.T(ctx, Q56.f(Wt, 1), px + 38, yT + 4, { s: 11.5, w: 900, c: '#15803d' });
        Q56.T(ctx, 'ΔU = ' + Q56.f(Qt - Wt, 1) + ' ×10⁶ J', px + pw / 2, yT + 36, { s: 13, w: 900, c: '#fff', bg: Math.abs(Qt - Wt) < .05 ? '#6d28d9' : Qt > Wt ? '#c2410c' : '#0369a1' }); }
      const Cc = D.chips(S, g); Q42.drawChips(ctx, Cc.a); Q56.drawSteps(ctx, Cc.e);
      Q42.banner(ctx, w, 'ابدأ اليوم وراقب طاقة الجسم', '#ea580c');
    },
    chips(S, g) { return { a: Q42.chips(S, 'go', [['go', S.run ? '⏸ أوقف' : '▶ ابدأ اليوم'], ['re', '↺ من جديد'], ['end', '⏭ نهاية اليوم']], g.h - 128, S.run ? 'go' : '', (S2, k) => { if (k === 'go') { if (S2.hr >= D.tot(S2) - 1e-6) S2.hr = S2.hd = 0; S2.run = S2.run ? 0 : 1; } else if (k === 're') { S2.hr = 0; S2.hd = 0; S2.run = 0; } else { S2.hr = D.tot(S2); S2.run = 0; } }, { bw: 170, col: '#ea580c' }),
      e: Q56.stepChips(S, 'ex', g.h - 84, g.L, 'حساب طاقة اليوم', S2 => { S2.hr = D.tot(S2); }, 6) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Cc = D.chips(S, g), T = D.tot(S), xm = Math.max(24, Math.ceil(T / 4) * 4), X = t => g.A.x + t / xm * g.A.w;
      return [{ id: 'tm', x: X(S.hd), y: g.A.y - 6, r: 18, axis: 'x', keep: true, tip: 'اسحب لتغيير الوقت', idle: 'اسحب ✋', drag: (S2, d) => { S2.run = 0; S2.hr = clamp((d.x - g.A.x) / g.A.w * xm, 0, T); } },
        { id: 'man', x: g.fx, y: 210, w: 100, h: 200, axis: 'none', hint: false, tip: 'اضغط: ابدأ أو أوقف', click: S2 => { S2.run = S2.run ? 0 : 1; } }].concat(Cc.a, Cc.e); },
    readings(S) { const v = D.at(S, S.hd), a = v.cur >= 0 ? D.acts(S)[v.cur][0] : '—'; return [rd('الوقت', Q56.f(S.hd, 1) + ' h'), rd('النشاط', a), rd('ΔQ حتى الآن', Q56.f(v.Q, 2) + ' ×10⁶ J'), rd('ΔW حتى الآن', Q56.f(v.W, 2) + ' ×10⁶ J'), rd('ΔU', Q56.f(v.Q - v.W, 2) + ' ×10⁶ J')]; },
    explain(S) { return Q26.ex('يرتفع مخزون الطاقة في الجسم بعد كل وجبة ثم ينخفض تدريجياً مع العمل والدراسة وحتى في أثناء النوم.', 'الجسم نظام يطبق عليه القانون الأول: الطعام حرارة مضافة ΔQ والعمل والحركة شغل مبذول ΔW. في يوم الشكل 9 يتساوى المجموعان 16.5 × 10⁶ J فيكون ΔU = 0.', 'لإنقاص الوزن نزيد التمارين أو نقلل الطعام فيصبح ΔU سالباً ويستهلك الجسم الدهون المخزونة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — المحرك الحراري وكفاءته (6-5، الشكل 10، مثال 4، ص 126–127) =============== */
(() => {
  const PRE = { e4: ['مثال 4', 1200, 400, 'J', 'W'], p3: ['مسألة 3', 2000, 500, 'J', 'C'], p4: ['مسألة 4', 3000, 2100, 'kJ', 'C'] };
  const D = { id: 'g11_th_engine', page: 126, fig: 'الشكل 10 + مثال 4',
    desc: 'المحرك الحراري جهاز يحول جزءاً من الطاقة الحرارية إلى شغل ميكانيكي. يأخذ المحرك كمية من الحرارة QH من المستودع الحار ذي درجة الحرارة العالية TH ، ويحول جزءاً منها إلى شغل W ، ويطرح الباقي QC إلى المستودع البارد ذي درجة الحرارة الواطئة TC (الشكل 10). W = QH − QC ، والكفاءة η = W / QH × 100%. مثال 4: محرك يأخذ 1200 J ويبذل 400 J فكفاءته 33% ويطرح 800 J.',
    tags: 'المحرك الحراري الكفاءة η المستودع الحار المستودع البارد QH QC W=QH-QC مثال 4 1200 400 33% 800 مسألة 3 25% مسألة 4 70%',
    tools: ['مستودع حار TH', 'محرك حراري', 'مستودع بارد TC', 'دولاب يرفع ثقلاً'],
    steps: ['اسحب مقبض سهم QH أفقياً لتغيير الحرارة الداخلة.', 'اسحب مقبض سهم الشغل W: يتغير عرض سهم QC تلقائياً لأن W = QH − QC.', 'راقب الدولاب يدور ويرفع الثقل بسرعة تتناسب مع الشغل.', 'اختر مثال 4 أو مسألة 3 أو 4 واضغط «الحل خطوة خطوة».'],
    concl: ['W = QH − QC.', 'η = W / QH × 100% ، وهي دائماً أقل من 100%.', 'مثال 4: η = 400 / 1200 × 100% = 33% و QC = 800 J.', 'مسألة 3: η = 25%. مسألة 4: W = 2100 kJ و η = 70%.'],
    laws: ['g11_l6_eff'],
    controls: [R('QH', 'الحرارة الداخلة QH', 200, 3000, 1200, 100, ''), R('W', 'الشغل الناتج W', 0, 3000, 400, 50, ''), TG('anim', 'تشغيل المحرك', true, null, 'eye')],
    setup(S) { S.pre = 'e4'; S.u = 'J'; S.qh = 1200; S.wd = 400; S.ang = 0; S.lift = 0; S.clk = 0; S.ex = 0; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 170, top: 66, bot: 560 }; },
    Wv(S) { return Math.min(S.p.W, S.p.QH); },
    update(S, dt) { if (!S.W) return; dt = Math.min(dt, .05); S.qh = Q56.ease(S.qh, S.p.QH, dt, 6); S.wd = Q56.ease(S.wd, D.Wv(S), dt, 6); if (S.p.anim) { S.clk += dt; const sp = S.wd / 3000 * 6 + .2; S.ang += sp * dt; S.lift = (S.lift + sp * dt * 14) % 120; } },
    ex(S) { const QH = S.p.QH, W = D.Wv(S), QC = QH - W, u = S.u, f = v => Q56.n(v, 1), md = PRE[S.pre] ? PRE[S.pre][4] : 'W';
      if (md === 'C') return { title: PRE[S.pre][0] + ' ص 130', q: 'ماكنة تأخذ ' + f(QH) + ' ' + u + ' من المستودع الحار وتطرح ' + f(QC) + ' ' + u + ' إلى المستودع البارد. احسب الشغل والكفاءة.',
        lines: ['W = QH − QC', 'W = ' + f(QH) + ' − ' + f(QC) + ' = ' + f(W) + ' ' + u, 'η = W / QH × 100%', 'η = ' + f(W) + ' / ' + f(QH) + ' × 100%', 'η = ' + Q56.n(W / QH * 100, 1) + '%'] };
      return { title: (PRE[S.pre] ? PRE[S.pre][0] : 'محرك') + ' ص 127', q: 'محرك حراري يأخذ ' + f(QH) + ' ' + u + ' من المستودع الحار ويبذل شغلاً ' + f(W) + ' ' + u + '. احسب كفاءته والحرارة المطروحة.',
        lines: ['η = W / QH × 100%', 'η = ' + f(W) + ' / ' + f(QH) + ' × 100%', 'η = ' + Q56.n(W / QH * 100, 1) + '%', 'QC = QH − W', 'QC = ' + f(QH) + ' − ' + f(W) + ' = ' + f(QC) + ' ' + u] }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = S.clk, QH = S.qh, W = Math.min(S.wd, QH), QC = Math.max(0, QH - W), cx = g.cx, ey = (g.top + g.bot) / 2;
      Q56.bg(ctx, w, h);
      Q56.engineDiag(ctx, cx, g.top, g.bot, QH, QC, W, c, { sc: 3000, u: S.u, ang: S.ang * 2, still: !S.p.anim });
      // flywheel lifting a weight
      const fx = cx + 44 + 150, fr = 34; Q56.gear(ctx, fx, ey, fr, S.ang * 3, '#a8a29e');
      const ly = ey + 40 + 120 - S.lift; K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(fx + fr - 4, ey); ctx.lineTo(fx + fr - 4, ly); ctx.stroke(); }); Q42.weight(ctx, fx + fr - 4, ly + 14, 40, 26, null);
      // handles
      Q41.knob(ctx, cx - 70, g.top + 110, '#dc2626', 9); Q56.T(ctx, '⟷', cx - 70, g.top + 132, { s: 12, w: 900, c: '#991b1b' });
      Q41.knob(ctx, cx + 44 + 120, ey + 30, '#16a34a', 9); Q56.T(ctx, '⟷', cx + 44 + 120, ey + 52, { s: 12, w: 900, c: '#15803d' });
      const eta = QH > 0 ? W / QH * 100 : 0;
      // efficiency gauge
      const gx = w - 170, gy = g.bot - 50; K.raw(ctx, () => { ctx.lineWidth = 14; ctx.strokeStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(gx, gy, 46, Math.PI, TAU); ctx.stroke(); ctx.strokeStyle = eta > 99 ? '#dc2626' : '#16a34a'; ctx.beginPath(); ctx.arc(gx, gy, 46, Math.PI, Math.PI + Math.PI * clamp(eta / 100, 0, 1)); ctx.stroke(); });
      Q56.T(ctx, 'η = ' + Q56.n(eta, 1) + '%', gx, gy - 8, { s: 13, w: 900, c: '#0f172a' }); Q56.T(ctx, 'الكفاءة', gx, gy + 14, { s: 10, w: 800, c: '#64748b' });
      if (S.p.W > S.p.QH) Q56.T(ctx, 'لا يمكن أن يزيد W على QH', cx, ey + 70, { s: 11, w: 900, c: '#fff', bg: '#dc2626' });
      if (S.ex) Q56.steps(ctx, S, Object.assign(D.ex(S), { k: S.k }), { wd: 330 });
      else Q56.card(ctx, S, [{ t: 'QH = ' + Q56.n(S.p.QH, 1) + ' ' + S.u, c: '#b91c1c' }, { t: 'W = ' + Q56.n(D.Wv(S), 1) + ' ' + S.u, c: '#15803d' }, { t: 'QC = QH − W = ' + Q56.n(S.p.QH - D.Wv(S), 1) + ' ' + S.u, c: '#0369a1' }, { t: 'η = W / QH × 100%', c: '#7c2d12', w: 900 }, { t: 'η = ' + Q56.n(D.Wv(S) / S.p.QH * 100, 1) + '%', s: 15, w: 900, c: '#15803d' }, { t: 'يطرح المحرك دائماً جزءاً من الحرارة إلى المستودع البارد', c: '#64748b', w: 700 }], { title: 'المحرك الحراري' });
      const Cc = D.chips(S, g); Q42.drawChips(ctx, Cc.p); Q56.drawSteps(ctx, Cc.e);
      Q42.banner(ctx, w, 'اسحب مقبضي QH و W وراقب الكفاءة', '#ea580c');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pre', Object.keys(PRE).map(k => [k, PRE[k][0]]), g.h - 128, S.pre, (S2, k) => { S2.pre = k; S2.ex = 0; S2.u = PRE[k][3]; setParam(S2, 'QH', PRE[k][1]); setParam(S2, 'W', PRE[k][2]); }, { bw: 150, col: '#ea580c' }),
      e: Q56.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, 5) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Cc = D.chips(S, g), ey = (g.top + g.bot) / 2;
      return [{ id: 'qh', x: g.cx - 70, y: g.top + 110, r: 22, axis: 'x', keep: true, tip: 'اسحب أفقياً: QH', idle: 'اسحب ✋', drag: (S2, d) => { S2.pre = ''; setParam(S2, 'QH', clamp(Math.round((S2.p.QH + (d.dx || 0) * 12) / 100) * 100, 200, 3000)); } },
        { id: 'w', x: g.cx + 164, y: ey + 30, r: 22, axis: 'x', keep: true, hint: false, tip: 'اسحب أفقياً: W', drag: (S2, d) => { S2.pre = ''; setParam(S2, 'W', clamp(Math.round((S2.p.W + (d.dx || 0) * 12) / 50) * 50, 0, S2.p.QH)); } }].concat(Cc.p, Cc.e); },
    readings(S) { const W = D.Wv(S); return [rd('QH', Q56.n(S.p.QH, 1) + ' ' + S.u), rd('W', Q56.n(W, 1) + ' ' + S.u), rd('QC', Q56.n(S.p.QH - W, 1) + ' ' + S.u), rd('الكفاءة η', Q56.n(W / S.p.QH * 100, 1) + '%')]; },
    explain(S) { return Q26.ex('كلما زاد الشغل من الكمية نفسها من الحرارة الداخلة دار الدولاب أسرع وضاق سهم الحرارة المطروحة QC وزادت الكفاءة.', 'الطاقة محفوظة: QH = W + QC ، فالكفاءة نسبة الشغل المفيد إلى الحرارة الداخلة η = W / QH × 100%. ولا يمكن أن تصل إلى 100% لأن المحرك يحتاج إلى طرح حرارة إلى مستودع بارد.', 'محرك السيارة يطرح جزءاً كبيراً من الحرارة مع غازات العادم وماء التبريد.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — القانون الثاني: الاتجاه الطبيعي، كلفن − بلانك، كلاوزيوس (6-6، الشكلان 11 و 12، ص 128) =============== */
(() => {
  const TR = 25;
  const D = { id: 'g11_th_second', page: 128, fig: 'الشكلان 11 و 12',
    desc: 'القانون الثاني للديناميكا الحرارية يحدد اتجاه انتقال الحرارة: الشاي الساخن يبرد والمثلجات تسخن حتى تصل كل منهما إلى درجة حرارة الغرفة، ولا يحدث العكس تلقائياً. صيغة كلفن − بلانك: يستحيل بناء محرك حراري يحول كل الحرارة المأخوذة من مستودع واحد إلى شغل (الشكل 11). صيغة كلاوزيوس: يستحيل انتقال الحرارة من جسم بارد إلى جسم حار دون بذل شغل (الشكل 12).',
    tags: 'القانون الثاني اتجاه انتقال الحرارة كلفن بلانك كلاوزيوس مستودع واحد كفاءة 100% مستحيل ثلاجة شاي مثلجات',
    tools: ['كوب شاي ساخن ومثلجات', 'مستودع حار ومستودع بارد', 'محرك حراري', 'ثلاجة'],
    steps: ['في «الاتجاه الطبيعي» راقب الشاي يبرد والمثلجات تذوب، ثم اضغط «اعكس الاتجاه».', 'في «كلفن − بلانك» شغّل المحرك بمستودع واحد، ثم أضف المستودع البارد بالضغط على مكانه.', 'في «كلاوزيوس» حاول نقل الحرارة من البارد إلى الحار، ثم اضغط على مكان الشغل لتبذل شغلاً.', 'غيّر درجات الحرارة من اللوحة.'],
    concl: ['الحرارة تنساب تلقائياً من الجسم الحار إلى الجسم البارد فقط.', 'كلفن − بلانك: لا يوجد محرك كفاءته 100% ؛ يجب وجود مستودعين.', 'كلاوزيوس: نقل الحرارة من البارد إلى الحار يحتاج إلى شغل خارجي كما في الثلاجة.', 'القانون الأول لا يمنع هذه العمليات، لكن القانون الثاني يمنعها.'],
    laws: ['g11_l6_second', 'g11_l6_eff'],
    controls: [R('Th', 'درجة حرارة الشاي', 40, 100, 80, 5, '°C'), R('Tc', 'درجة حرارة المثلجات', -20, 10, -10, 5, '°C'), TG('cold', 'مستودع بارد للمحرك', false, null, 'eye'), TG('work', 'بذل شغل خارجي: ثلاجة', false, null, 'eye')],
    setup(S) { S.md = 'nat'; S.Ta = 80; S.Tb = -10; S.rev = 0; S.clk = 0; S.ang = 0; S.lTh = 80; S.lTc = -10; S.st = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 170, top: 70, bot: 540 }; },
    update(S, dt) { if (!S.W) return; dt = Math.min(dt, .05); S.clk += dt;
      if (S.p.Th !== S.lTh || S.p.Tc !== S.lTc) { S.Ta = S.lTh = S.p.Th; S.Tb = S.lTc = S.p.Tc; S.rev = 0; }
      if (S.md === 'nat' && !S.rev) { S.Ta += (TR - S.Ta) * Math.min(1, dt * .12); S.Tb += (TR - S.Tb) * Math.min(1, dt * .12); }
      const ok = S.md === 'kp' ? S.p.cold : S.md === 'cl' ? S.p.work : 1; S.st = Q56.ease(S.st, ok ? 1 : 0, dt, 4); if (ok) S.ang += dt * 2; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = S.clk, cx = g.cx; Q56.bg(ctx, w, h); let card = [], tit = '';
      if (S.md === 'nat') {
        // room scene: table with tea cup and ice cream
        const ty = 430; K.raw(ctx, () => { const gt = ctx.createLinearGradient(0, ty, 0, ty + 24); gt.addColorStop(0, '#b45309'); gt.addColorStop(1, '#78350f'); ctx.fillStyle = gt; rr(ctx, g.L + 20, ty, w - g.L - 370, 22, 6); ctx.fill(); ctx.fillRect(g.L + 50, ty + 22, 14, 110); ctx.fillRect(w - 390, ty + 22, 14, 110); });
        const ax = g.L + 110, bx = g.L + 310, ka = (S.Ta - TR) / 75, kb = (TR - S.Tb) / 45;
        // cup
        K.raw(ctx, () => { const gc = ctx.createLinearGradient(ax - 40, 0, ax + 40, 0); gc.addColorStop(0, '#e5e7eb'); gc.addColorStop(.5, '#fff'); gc.addColorStop(1, '#d1d5db'); ctx.fillStyle = gc; ctx.beginPath(); ctx.moveTo(ax - 42, ty - 90); ctx.lineTo(ax + 42, ty - 90); ctx.lineTo(ax + 32, ty - 4); ctx.lineTo(ax - 32, ty - 4); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(ax + 46, ty - 54, 18, -Math.PI / 2, Math.PI / 2); ctx.stroke(); ctx.fillStyle = '#92400e'; ctx.beginPath(); ctx.ellipse(ax, ty - 84, 38, 6, 0, 0, TAU); ctx.fill();
          if (ka > .05) { ctx.strokeStyle = 'rgba(148,163,184,' + (.7 * clamp(ka, 0, 1)) + ')'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); for (let k = 0; k < 20; k++) { const yy = ty - 96 - k * 4, xx = ax - 16 + i * 16 + Math.sin(k * .5 + c * 3 + i) * 5; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } } });
        // ice cream cone
        K.raw(ctx, () => { const melt = clamp(1 - kb, 0, 1); ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.moveTo(bx - 30, ty - 80); ctx.lineTo(bx + 30, ty - 80); ctx.lineTo(bx, ty - 4); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(bx + i * 12, ty - 80); ctx.lineTo(bx - i * 4, ty - 10); ctx.stroke(); }
          const gi = ctx.createRadialGradient(bx - 10, ty - 110, 4, bx, ty - 96, 40); gi.addColorStop(0, '#fff'); gi.addColorStop(1, '#f9a8d4'); ctx.fillStyle = gi; ctx.beginPath(); ctx.ellipse(bx, ty - 96 + melt * 10, 36, 30 - melt * 14, 0, 0, TAU); ctx.fill();
          if (melt > .2) { ctx.fillStyle = '#f9a8d4'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(bx - 24 + i * 22, ty - 76 + melt * 26 * (1 + i % 2) / 2, 5, 9 * melt, 0, 0, TAU); ctx.fill(); } } });
        Q56.therm(ctx, ax - 70, ty - 20, 170, (S.Ta + 20) / 120, Q56.f(S.Ta, 0) + ' °C', '#ef4444'); Q56.therm(ctx, bx + 70, ty - 20, 170, (S.Tb + 20) / 120, Q56.f(S.Tb, 0) + ' °C', '#3b82f6');
        if (!S.rev) { if (S.Ta - TR > 2) Q56.bar(ctx, ax, ty - 150, ax, ty - 230, 6 + 14 * clamp(ka, 0, 1), '#f97316', '', { flow: c }); if (TR - S.Tb > 2) Q56.bar(ctx, bx, ty - 230, bx, ty - 150, 6 + 14 * clamp(kb, 0, 1), '#f97316', '', { flow: c }); }
        Q56.T(ctx, 'هواء الغرفة ' + TR + ' °C', (ax + bx) / 2, 110, { s: 12, w: 900, c: '#fff', bg: '#b45309' });
        if (S.rev) { Q56.stamp(ctx, (ax + bx) / 2, ty - 160, false, 34); Q56.T(ctx, 'لا يحدث تلقائياً أبداً', (ax + bx) / 2, ty - 108, { s: 13, w: 900, c: '#fff', bg: '#dc2626' }); }
        tit = 'الاتجاه الطبيعي لانتقال الحرارة'; card = [{ t: 'الشاي الساخن يبرد', c: '#b91c1c', w: 800 }, { t: 'المثلجات تسخن وتذوب', c: '#1d4ed8', w: 800 }, { t: 'الحرارة تنساب من الحار إلى البارد', w: 900, c: '#7c2d12' }, { t: 'العكس لا يحدث تلقائياً حتى لو كانت الطاقة محفوظة', c: '#64748b' }];
      } else if (S.md === 'kp') {
        const ok = S.p.cold, QH = 1000, W = ok ? 600 : 1000, QC = ok ? 400 : 0;
        Q56.engineDiag(ctx, cx, g.top, g.bot, QH, QC, W, c, { sc: 1000, noCold: !ok, ang: S.ang, still: !ok, lab: { QH: 'QH', QC: 'QC', W: ok ? 'W < QH' : 'W = QH' } });
        if (!ok) { K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([6, 5]); ctx.lineWidth = 2; rr(ctx, cx - 120, g.bot - 62, 240, 62, 12); ctx.stroke(); ctx.setLineDash([]); }); Q56.T(ctx, 'اضغط هنا لإضافة مستودع بارد', cx, g.bot - 31, { s: 11, w: 800, c: '#64748b' }); }
        Q56.stamp(ctx, cx + 200, (g.top + g.bot) / 2 + 80, ok, 30);
        Q56.T(ctx, ok ? 'ممكن: η أقل من 100%' : 'مستحيل: η = 100%', cx + 200, (g.top + g.bot) / 2 + 128, { s: 12, w: 900, c: '#fff', bg: ok ? '#15803d' : '#dc2626' });
        tit = 'صيغة كلفن − بلانك'; card = [{ t: 'يستحيل بناء محرك حراري يحول كل الحرارة المأخوذة من مستودع واحد إلى شغل', w: 800, c: '#7c2d12' }, { t: ok ? 'مع مستودعين: جزء يتحول إلى شغل والباقي يطرح إلى المستودع البارد' : 'مستودع واحد فقط: المحرك لا يعمل', c: ok ? '#15803d' : '#b91c1c', w: 800 }];
      } else {
        const ok = S.p.work, QC = 600, W = ok ? 400 : 0, QH = ok ? 1000 : 600;
        Q56.engineDiag(ctx, cx, g.top, g.bot, QH, QC, W, c, { sc: 1000, rev: 1, ang: -S.ang, still: !ok, noW: !ok, en: 'جهاز', lab: { QH: ok ? 'QH = QC + W' : 'Q', QC: 'QC', W: 'W' } });
        if (!ok) { K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([6, 5]); ctx.lineWidth = 2; rr(ctx, cx + 60, (g.top + g.bot) / 2 - 24, 120, 48, 10); ctx.stroke(); ctx.setLineDash([]); }); Q56.T(ctx, 'اضغط: ابذل شغلاً', cx + 120, (g.top + g.bot) / 2, { s: 10.5, w: 800, c: '#64748b' }); }
        Q56.stamp(ctx, cx + 200, (g.top + g.bot) / 2 + 90, ok, 30);
        Q56.T(ctx, ok ? 'ممكن: ثلاجة تستهلك شغلاً' : 'مستحيل دون شغل', cx + 200, (g.top + g.bot) / 2 + 138, { s: 12, w: 900, c: '#fff', bg: ok ? '#15803d' : '#dc2626' });
        tit = 'صيغة كلاوزيوس'; card = [{ t: 'يستحيل انتقال الحرارة من جسم بارد إلى جسم حار دون بذل شغل', w: 800, c: '#7c2d12' }, { t: ok ? 'الثلاجة تسحب الحرارة من داخلها البارد وتطرحها إلى الغرفة باستهلاك شغل' : 'بلا شغل لا تنتقل الحرارة من البارد إلى الحار', c: ok ? '#15803d' : '#b91c1c', w: 800 }];
      }
      Q56.card(ctx, S, card, { title: tit, wd: 320 });
      const Cc = D.chips(S, g); Q42.drawChips(ctx, Cc.m); if (Cc.a) Q42.drawChips(ctx, Cc.a);
      Q42.banner(ctx, w, S.md === 'nat' ? 'راقب انتقال الحرارة ثم اعكس الاتجاه' : S.md === 'kp' ? 'هل يعمل المحرك بمستودع واحد؟' : 'هل تنتقل الحرارة من البارد إلى الحار وحدها؟', '#ea580c');
    },
    chips(S, g) { const m = Q42.chips(S, 'md', [['nat', 'الاتجاه الطبيعي'], ['kp', 'كلفن − بلانك: الشكل 11'], ['cl', 'كلاوزيوس: الشكل 12']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.rev = 0; }, { bw: 200, col: '#ea580c' });
      let a = null; if (S.md === 'nat') a = Q42.chips(S, 'n', [['rev', '⏪ اعكس الاتجاه'], ['re', '↺ من جديد']], g.h - 84, S.rev ? 'rev' : '', (S2, k) => { if (k === 'rev') S2.rev = 1; else { S2.rev = 0; S2.Ta = S2.p.Th; S2.Tb = S2.p.Tc; } }, { bw: 200, col: '#dc2626' });
      else a = Q42.chips(S, 't', [['tg', S.md === 'kp' ? (S.p.cold ? 'أزل المستودع البارد' : 'أضف مستودعاً بارداً') : (S.p.work ? 'أوقف الشغل' : 'ابذل شغلاً')]], g.h - 84, '', (S2) => { if (S2.md === 'kp') setParam(S2, 'cold', !S2.p.cold); else setParam(S2, 'work', !S2.p.work); }, { bw: 220 });
      return { m, a }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Cc = D.chips(S, g), out = [], ey = (g.top + g.bot) / 2;
      if (S.md === 'nat') out.push({ id: 'cup', x: g.L + 110, y: 380, w: 90, h: 100, axis: 'none', tip: 'اضغط: سخّن الشاي من جديد', idle: 'اضغط ✋', click: S2 => { S2.Ta = S2.p.Th; S2.Tb = S2.p.Tc; S2.rev = 0; } });
      else if (S.md === 'kp') out.push({ id: 'cres', x: g.cx, y: g.bot - 31, w: 240, h: 62, axis: 'none', tip: 'اضغط: مستودع بارد', idle: 'اضغط ✋', click: S2 => setParam(S2, 'cold', !S2.p.cold) });
      else out.push({ id: 'wk', x: g.cx + 120, y: ey, w: 120, h: 48, axis: 'none', tip: 'اضغط: شغل خارجي', idle: 'اضغط ✋', click: S2 => setParam(S2, 'work', !S2.p.work) });
      return out.concat(Cc.m, Cc.a || []); },
    readings(S) { if (S.md === 'nat') return [rd('الشاي', Q56.f(S.Ta, 1) + ' °C'), rd('المثلجات', Q56.f(S.Tb, 1) + ' °C'), rd('الغرفة', TR + ' °C')]; if (S.md === 'kp') return [rd('عدد المستودعات', S.p.cold ? 2 : 1), rd('الكفاءة', S.p.cold ? '60%' : '100% مستحيل')]; return [rd('الشغل الخارجي', S.p.work ? 'يُبذل' : 'لا يوجد'), rd('اتجاه الحرارة', 'من البارد إلى الحار'), rd('النتيجة', S.p.work ? 'ممكن' : 'مستحيل')]; },
    explain(S) { return Q26.ex('الشاي يبرد والمثلجات تذوب حتى تبلغ درجة حرارة الغرفة، والمحرك لا يعمل بمستودع واحد، والحرارة لا تصعد من البارد إلى الحار إلا بشغل.', 'القانون الثاني للديناميكا الحرارية يحدد الاتجاه الطبيعي لانتقال الحرارة: من الحار إلى البارد فقط، بصرف النظر عن كمية الحرارة في كل جسم. لذا يجب أن يطرح كل محرك جزءاً من الحرارة إلى مستودع بارد، وتحتاج الثلاجة إلى شغل.', 'الثلاجة ومكيف الهواء يستهلكان طاقة كهربائية لنقل الحرارة من المكان البارد إلى الأحر.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — مسائل الفصل السادس (ص 130) =============== */
(() => {
  const PB = {
    p1: { n: 'مسألة 1', a: [5e5, .002], la: ['P', 'ΔV'] },
    p2: { n: 'مسألة 2', a: [135, 0], la: ['W'] },
    p3: { n: 'مسألة 3', a: [2000, 1500], la: ['QH', 'QC'] },
    p4: { n: 'مسألة 4', a: [3000, 900], la: ['QH', 'QC'] },
    p5: { n: 'مسألة 5', a: [400, 250], la: ['ΔU', 'W'] } };
  const D = { id: 'g11_th_review', page: 130, fig: 'مسائل ص 130',
    desc: 'مسائل الفصل السادس ص 130: (1) غاز في أسطوانة ذات مكبس يتمدد من 0.02 m³ إلى 0.022 m³ عند ضغط ثابت 5 × 10⁵ Pa. (2) إناء معزول فيه غاز، الشغل الخارجي المبذول على الغاز 135 J. (3) ماكنة تأخذ 2 × 10³ J وتطرح 1.5 × 10³ J. (4) ماكنة تستقبل 3000 kJ وتطرح 900 kJ. (5) ماكنة تنقص طاقتها الداخلية 400 J وتنجز شغلاً 250 J.',
    tags: 'مسائل الفصل السادس شغل الغاز 1000 J إناء معزول 135 J كفاءة 25% 70% 2100 kJ سريان الحرارة -150 J',
    tools: ['أسطوانة ذات مكبس', 'إناء معزول', 'مخطط المحرك الحراري'],
    steps: ['اختر المسألة من الأزرار السفلية.', 'اقرأ المعطيات في البطاقة وراقب الرسم.', 'اضغط «الحل خطوة خطوة» ثم «الخطوة التالية».', 'غيّر المعطيات بنسبة مئوية من اللوحة لتتدرب على أرقام جديدة.'],
    concl: ['مسألة 1: ΔW = P ΔV = 5 × 10⁵ × 0.002 = 1000 J.', 'مسألة 2: ΔQ = 0 و ΔW = −135 J فـ ΔU = +135 J.', 'مسألة 3: W = 500 J و η = 25%.', 'مسألة 4: W = 2100 kJ و η = 70%.', 'مسألة 5: ΔQ = ΔU + ΔW = −400 + 250 = −150 J (الحرارة تخرج).'],
    laws: ['g11_l6_work', 'g11_l6_first', 'g11_l6_eff'],
    controls: [R('m1', 'تغيير المعطى الأول', 50, 150, 100, 10, '%'), R('m2', 'تغيير المعطى الثاني', 50, 150, 100, 10, '%')],
    setup(S) { S.pb = 'p1'; S.ex = 0; S.k = 0; S.clk = 0; S.ph = 0; S.gp = Q56.gasInit(24, 13); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 170, top: 70, bot: 560 }; },
    v(S) { const a = PB[S.pb].a, r = v => +(v).toPrecision(4); let x = r(a[0] * S.p.m1 / 100), y = r(a[1] * S.p.m2 / 100); if ((S.pb === 'p3' || S.pb === 'p4') && y > x) y = x; return [x, y]; },
    update(S, dt) { if (!S.W) return; dt = Math.min(dt, .05); S.clk += dt; S.ph = (S.ph + dt / 4) % 1; Q56.gasStep(S.gp, dt, .5, 1, 1); },
    ex(S) { const [x, y] = D.v(S), f = (v, d = 1) => Q56.n(v, d);
      switch (S.pb) {
        case 'p1': return { title: 'مسألة 1', q: 'غاز يتمدد عند ضغط ثابت ' + f(x / 1e5, 2) + ' × 10⁵ Pa من 0.02 m³ إلى ' + f(.02 + y, 4) + ' m³. جد الشغل الذي يبذله.', lines: ['ΔV = Vf − Vi = ' + f(.02 + y, 4) + ' − 0.02 = ' + f(y, 4) + ' m³', 'العملية بضغط ثابت: ΔW = P ΔV', 'ΔW = ' + f(x / 1e5, 2) + ' × 10⁵ × ' + f(y, 4), 'ΔW = ' + f(x * y, 1) + ' J'] };
        case 'p2': return { title: 'مسألة 2', q: 'إناء معزول فيه غاز، بُذل على الغاز شغل خارجي ' + f(x) + ' J. جد التغير في طاقته الداخلية.', lines: ['الإناء معزول: ΔQ = 0', 'الشغل مبذول على الغاز: ΔW = −' + f(x) + ' J', 'ΔU = ΔQ − ΔW = 0 − (−' + f(x) + ')', 'ΔU = +' + f(x) + ' J'] };
        case 'p3': case 'p4': { const u = S.pb === 'p4' ? 'kJ' : 'J'; return { title: PB[S.pb].n, q: 'ماكنة تأخذ ' + f(x) + ' ' + u + ' من المستودع الحار وتطرح ' + f(y) + ' ' + u + ' إلى المستودع البارد. جد الشغل والكفاءة.', lines: ['W = QH − QC = ' + f(x) + ' − ' + f(y), 'W = ' + f(x - y) + ' ' + u, 'η = W / QH × 100%', 'η = ' + f(x - y) + ' / ' + f(x) + ' × 100%', 'η = ' + f((x - y) / x * 100, 1) + '%'] }; }
        default: return { title: 'مسألة 5', q: 'ماكنة تنقص طاقتها الداخلية ' + f(x) + ' J وتنجز شغلاً ' + f(y) + ' J ، احسب سريان الحرارة ΔQ', lines: ['الطاقة الداخلية تنقص: ΔU = −' + f(x) + ' J', 'الماكنة تنجز الشغل: ΔW = +' + f(y) + ' J', 'ΔQ = ΔU + ΔW', 'ΔQ = −' + f(x) + ' + ' + f(y), 'ΔQ = ' + f(y - x) + ' J', y - x < 0 ? 'الإشارة سالبة: الحرارة تخرج من الماكنة' : 'الإشارة موجبة: الحرارة تدخل الماكنة'] };
      } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = S.clk, cx = g.cx, [x, y] = D.v(S), ph = .5 - .5 * Math.cos(S.ph * TAU); Q56.bg(ctx, w, h);
      if (S.pb === 'p1' || S.pb === 'p2') {
        const cw = 150, cl = cx - cw / 2, top = 150, bot = 520, ins = S.pb === 'p2', py = ins ? 260 + ph * 90 : 300 - ph * 40;
        Q56.cyl(ctx, cl, top, cw, bot, py, { ins, parts: S.gp, tint: Q56.tc(ins ? .3 + ph * .5 : .4, .3), pc: Q56.tc(ins ? .3 + ph * .5 : .4), rodTop: py - 80 });
        if (ins) { Q56.bar(ctx, cx, py - 150, cx, py - 96, 14, '#dc2626', '', { flow: c }); Q56.T(ctx, 'شغل خارجي ' + Q56.n(x) + ' J', cx + 110, py - 124, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' }); Q56.T(ctx, 'إناء معزول: ΔQ = 0', cx, bot + 44, { s: 11, w: 900, c: '#78350f', bg: '#fde68a' }); }
        else { Q56.flames(ctx, cl + 20, cl + cw - 20, bot + 70, .6, c); Q56.T(ctx, 'P = ' + Q56.n(x / 1e5, 2) + ' ×10⁵ Pa ثابت', cx + 140, 330, { s: 11, w: 900, c: '#fff', bg: '#6d28d9' }); Q56.T(ctx, 'ΔV = ' + Q56.n(y, 4) + ' m³', cx + 140, 300 - 40 * ph, { s: 11, w: 900, c: '#fff', bg: '#15803d' }); }
      } else if (S.pb === 'p3' || S.pb === 'p4') {
        const u = S.pb === 'p4' ? 'kJ' : 'J'; Q56.engineDiag(ctx, cx, g.top, g.bot, x, y, x - y, c, { sc: Math.max(x, 1), u, ang: c * 2, lab: { W: 'W = ?' } });
      } else {
        Q56.engineDiag(ctx, cx, g.top, g.bot, 0, y > x ? y - x : 0, y, c, { sc: 600, noHot: true, noCold: true, ang: c * 2, lab: { W: 'W = ' + Q56.n(y) + ' J', QC: 'ΔQ = ?' } });
        if (x > y) Q56.bar(ctx, cx - 50, (g.top + g.bot) / 2 + 30, cx - 150, (g.top + g.bot) / 2 + 110, 6 + 20 * (x - y) / 600, '#0ea5e9', 'ΔQ = ?', { flow: c, ly: 26 });
        const ux = cx - 140, ut = g.top + 40, ub = g.top + 190, lv = .9 - .5 * x / 600 * ph; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, ux, ut, 44, ub - ut, 8); ctx.fill(); const gu = ctx.createLinearGradient(0, ub, 0, ut); gu.addColorStop(0, '#6d28d9'); gu.addColorStop(1, '#c4b5fd'); ctx.fillStyle = gu; rr(ctx, ux + 4, ub - 4 - (ub - ut - 8) * lv, 36, (ub - ut - 8) * lv, 6); ctx.fill(); ctx.strokeStyle = '#4c1d95'; ctx.lineWidth = 2; rr(ctx, ux, ut, 44, ub - ut, 8); ctx.stroke(); });
        Q56.T(ctx, 'ΔU = −' + Q56.n(x) + ' J', ux + 22, ub + 18, { s: 11, w: 900, c: '#fff', bg: '#6d28d9' });
      }
      if (S.ex) Q56.steps(ctx, S, Object.assign(D.ex(S), { k: S.k }), { wd: 330 });
      else { const e = D.ex(S); Q56.card(ctx, S, [{ t: e.q, w: 800, c: '#1e293b' }, { t: 'اضغط «الحل خطوة خطوة»', c: '#be185d', w: 800 }], { title: PB[S.pb].n + ' ص 130', wd: 320 }); }
      const Cc = D.chips(S, g); Q42.drawChips(ctx, Cc.p); Q56.drawSteps(ctx, Cc.e);
      Q42.banner(ctx, w, 'اختر المسألة ثم حلّها خطوة خطوة', '#ea580c');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pb', Object.keys(PB).map(k => [k, PB[k].n]), g.h - 128, S.pb, (S2, k) => { S2.pb = k; S2.ex = 0; S2.k = 0; }, { bw: 120, col: '#ea580c' }),
      e: Q56.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, 6) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Cc = D.chips(S, g);
      return [{ id: 'fig', x: g.cx, y: (g.top + g.bot) / 2, w: 200, h: 200, axis: 'none', tip: 'اضغط: المسألة التالية', idle: 'اضغط ✋', click: S2 => { const ks = Object.keys(PB); S2.pb = ks[(ks.indexOf(S2.pb) + 1) % ks.length]; S2.ex = 0; S2.k = 0; } }].concat(Cc.p, Cc.e); },
    readings(S) { const [x, y] = D.v(S), r = { p1: ['ΔW', Q56.n(x * y, 1) + ' J'], p2: ['ΔU', '+' + Q56.n(x) + ' J'], p3: ['η', Q56.n((x - y) / x * 100, 1) + '%'], p4: ['η', Q56.n((x - y) / x * 100, 1) + '%'], p5: ['ΔQ', Q56.n(y - x) + ' J'] }[S.pb]; return [rd('المسألة', PB[S.pb].n), rd(r[0], S.ex && S.k >= D.ex(S).lines.length ? r[1] : 'حلّها أولاً')]; },
    explain(S) { return Q26.ex('كل مسألة تطبيق مباشر لقانون من قوانين الفصل.', 'الشغل بضغط ثابت ΔW = P ΔV ، والقانون الأول ΔU = ΔQ − ΔW مع قاعدة الإشارات، وكفاءة المحرك η = W / QH × 100% حيث W = QH − QC.', 'المهندسون يستعملون هذه الحسابات لتقدير الوقود اللازم لمحركات السيارات والطائرات.'); }
  };
  M8.P[D.id] = D;
})();

/* __PARTS__ */

/* ====================== wrappers ====================== */
Object.keys(M8.P).filter(k => /^g11_th_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g11_th_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g11_c6_sys', ch: 56, reg: X11, sec: '6-1 النظام والوسط المحيط + 6-2 الشغل والحرارة', page: 119, kind: 'نشاط',
  title: 'النظام والوسط المحيط، والشغل والحرارة في منحني الضغط − الحجم',
  desc: 'نحدد النظام والوسط المحيط في قدر الضغط، ثم نحرك مكبس أسطوانة غاز لنرى أن الشغل يساوي المساحة تحت منحني الضغط − الحجم، ونقارن العمليات الأربع: ثابتة الضغط وثابتة الحجم وثابتة درجة الحرارة والأديباتيكية.',
  tags: 'الديناميكا الحرارية النظام الوسط المحيط قدر الضغط الشغل الحرارة منحني P-V العمليات الأربع',
  fact: ['الديناميكا الحرارية تدرس العلاقة بين الحرارة والشغل وتحولات الطاقة (ص 119).', 'الشغل الذي يبذله الغاز يساوي المساحة تحت منحني الضغط − الحجم، ويعتمد على المسار بين الحالتين (ص 120).'],
  quiz: [
    { q: 'في قدر الضغط على الموقد، النظام هو:', o: ['الماء والبخار داخل القدر', 'اللهب', 'هواء المطبخ', 'غطاء القدر وحده'], a: 0, why: 'ص 119: النظام هو الجزء الذي ندرسه، وما حوله هو الوسط المحيط.' },
    { q: 'العملية التي يبقى فيها الحجم ثابتاً تسمى:', o: ['أيزوكورية', 'أيزوبارية', 'أيزوثرمية', 'أديباتيكية'], a: 0, why: 'الشكل 4 ص 120: ثبوت الحجم أيزوكورية، فلا يبذل الغاز شغلاً.' },
    { q: 'الشغل الذي يبذله الغاز في مخطط P − V يساوي:', o: ['المساحة تحت المنحني', 'ميل المنحني', 'الضغط النهائي', 'الحجم الابتدائي'], a: 0, why: 'الشكل 3 ص 120.' }],
  parts: [{ id: 'g11_th_system', n: 'النظام والوسط المحيط: قدر الضغط' }, { id: 'g11_th_pv', n: 'الشغل والحرارة: المكبس ومنحني P − V والعمليات الأربع' }] });
M8.merge({ id: 'g11_c6_first', ch: 56, reg: X11, sec: '6-3 القانون الأول للديناميكا الحرارية', page: 121, kind: 'نشاط',
  title: 'المكافئ الميكانيكي للحرارة والقانون الأول ΔU = ΔQ − ΔW',
  desc: 'نسقط أثقال جهاز جول فتدير المروحة في الماء وترتفع درجة حرارته لنجد أن 4.2 J تكافئ سعرة واحدة، ثم نسحب سهمي الحرارة والشغل لنرى القانون الأول وقاعدة الإشارات ونحل مثال 3.',
  tags: 'جول المكافئ الميكانيكي 4.2 القانون الأول الطاقة الداخلية الإشارات مثال 3',
  fact: ['وجد جول أن كل 4.2 J من الشغل الميكانيكي تولد سعرة واحدة من الحرارة (ص 121).', 'القانون الأول للديناميكا الحرارية صيغة من صيغ قانون حفظ الطاقة (ص 121).'],
  quiz: [
    { q: 'نظام اكتسب 1500 J من الحرارة وبذل شغلاً 2200 J. التغير في طاقته الداخلية:', o: ['−700 J', '+3700 J', '+700 J', '−3700 J'], a: 0, why: 'مثال 3 فقرة a ص 124: ΔU = 1500 − 2200.' },
    { q: 'نظام اكتسب 1500 J وبُذل عليه شغل 2200 J. التغير في طاقته الداخلية:', o: ['+3700 J', '−700 J', '+700 J', 'صفر'], a: 0, why: 'مثال 3 فقرة b: ΔU = 1500 − (−2200).' },
    { q: 'تكون ΔW موجبة عندما:', o: ['يبذل النظام شغلاً فيتمدد الغاز', 'يُبذل الشغل على النظام', 'تدخل الحرارة النظام', 'يبقى الحجم ثابتاً'], a: 0, why: 'ص 122.' }],
  parts: [{ id: 'g11_th_joule', n: 'المكافئ الميكانيكي للحرارة: جهاز جول' }, { id: 'g11_th_first', n: 'القانون الأول وقاعدة الإشارات + مثال 3' }] });
M8.merge({ id: 'g11_c6_apps', ch: 56, reg: X11, sec: '6-4 تطبيقات القانون الأول', page: 122, kind: 'مثال',
  title: 'تطبيقات القانون الأول: ثبوت الضغط والأيزوثرمية والأديباتيكية',
  desc: 'نحسب الشغل P ΔV لغاز يدفع مكبساً بضغط ثابت ولرئتي إنسان (مثال 1)، ونمدد هواء ببطء في حوض بدرجة ثابتة (مثال 2)، ونضغط منفاخاً معزولاً بسرعة فيسخن الهواء دون حرارة.',
  tags: 'العملية الأيزوبارية الأيزوثرمية الأديباتيكية P ΔV الرئتان مثال 1 مثال 2 ln منفاخ',
  fact: ['تتمدد رئتا الإنسان نحو 500 cm³ في كل شهيق فتبذل عضلات التنفس شغلاً نحو 50 J (مثال 1 ص 123).', 'ln x = 2.303 log x (ص 124).', 'العملية السريعة جداً أديباتيكية لأن الحرارة لا تجد وقتاً لتنتقل (ص 123).'],
  quiz: [
    { q: 'يزداد حجم الرئتين 500 cm³ في كل نفس والضغط 10⁵ Pa. الشغل في كل نفس:', o: ['50 J', '5 J', '500 J', '5 × 10⁷ J'], a: 0, why: 'مثال 1: 10⁵ × 500 × 10⁻⁶ = 50 J.' },
    { q: 'هواء 0.2 m³ بضغط 10⁶ Pa تمدد إلى 0.6 m³ بدرجة ثابتة. الشغل تقريباً:', o: ['2.2 × 10⁵ J', '4 × 10⁵ J', '1.2 × 10⁵ J', 'صفر'], a: 0, why: 'مثال 2: 0.2 × 10⁶ × ln 3 ≈ 2.197 × 10⁵ J.' },
    { q: 'في العملية الأيزوثرمية يكون:', o: ['ΔU = 0 و ΔQ = ΔW', 'ΔQ = 0', 'ΔW = 0', 'ΔU = ΔQ'], a: 0, why: 'ص 123.' },
    { q: 'العملية الأديباتيكية هي واحدة من العمليات التي تكون فيها:', o: ['الحرارة لا تدخل ولا تخرج من النظام', 'النظام لا ينجز شغلاً ولا شغل ينجز عليه', 'درجة حرارة النظام تبقى ثابتة', 'ضغط النظام يبقى ثابتاً'], a: 0, why: 'س1 فقرة 3 ص 129.' }],
  parts: [{ id: 'g11_th_isobar', n: 'ثبوت الضغط: الشغل P ΔV + الرئتان مثال 1' }, { id: 'g11_th_isoth', n: 'العملية الأيزوثرمية + مثال 2' }, { id: 'g11_th_adiab', n: 'العملية الأديباتيكية: المنفاخ المعزول' }] });
M8.merge({ id: 'g11_c6_signs', ch: 56, reg: X11, sec: '6-4 سؤال ص 125 + هل تعلم ص 126', page: 125, kind: 'نشاط',
  title: 'إشارات ΔQ و ΔW و ΔU، والقانون الأول في جسم الإنسان',
  desc: 'نملأ جدول سؤال ص 125 لثلاث عمليات: نفخ إطار دراجة، وماء على موقد، وهواء يتسرب من بالونة، ثم نتابع طاقة جسم الإنسان خلال يوم كامل (الشكل 9).',
  tags: 'سؤال الإشارات نفخ الإطار الموقد البالونة جسم الإنسان الطعام الطاقة هل تعلم',
  fact: ['في يوم نموذجي يكتسب الإنسان من الطعام نحو 16.5 × 10⁶ J ويبذل الكمية نفسها تقريباً، فلا يتغير وزنه (هل تعلم ص 126).', 'حتى في أثناء النوم يبذل الجسم نحو 2.0 × 10⁶ J (الشكل 9 ص 126).'],
  quiz: [
    { q: 'عند نفخ إطار دراجة بسرعة، النظام الهواء في المضخة:', o: ['ΔQ = 0 ، ΔW سالب ، ΔU موجب', 'ΔQ موجب ، ΔW = 0 ، ΔU موجب', 'ΔQ = 0 ، ΔW موجب ، ΔU سالب'], a: 0, why: 'سؤال ص 125 فقرة a.' },
    { q: 'ماء بدرجة حرارة الغرفة على موقد ساخن، النظام الماء في القدر:', o: ['ΔQ موجب ، ΔW = 0 ، ΔU موجب', 'ΔQ = 0 ، ΔW سالب ، ΔU موجب', 'ΔQ سالب ، ΔW = 0 ، ΔU سالب'], a: 0, why: 'سؤال ص 125 فقرة b.' },
    { q: 'هواء يتسرب بسرعة خارج بالونة، النظام الهواء داخلها:', o: ['ΔQ = 0 ، ΔW موجب ، ΔU سالب', 'ΔQ = 0 ، ΔW سالب ، ΔU موجب', 'ΔQ موجب ، ΔW = 0 ، ΔU موجب'], a: 0, why: 'سؤال ص 125 فقرة c.' },
    { q: 'إذا تساوت الطاقة التي يكتسبها الجسم من الطعام والطاقة التي يبذلها في اليوم فإن:', o: ['ΔU = 0 ولا يتغير الوزن', 'يزداد الوزن', 'ينقص الوزن'], a: 0, why: 'هل تعلم ص 126.' }],
  parts: [{ id: 'g11_th_signs', n: 'سؤال ص 125: جدول الإشارات' }, { id: 'g11_th_body', n: 'هل تعلم: طاقة جسم الإنسان في يوم' }] });
M8.merge({ id: 'g11_c6_engine', ch: 56, reg: X11, sec: '6-5 المحرك الحراري + 6-6 القانون الثاني', page: 126, kind: 'نشاط',
  title: 'المحرك الحراري وكفاءته، والقانون الثاني للديناميكا الحرارية',
  desc: 'نسحب مقبضي الحرارة الداخلة والشغل في محرك حراري بين مستودعين لنحسب الكفاءة (مثال 4)، ثم نرى الاتجاه الطبيعي لانتقال الحرارة وصيغتي كلفن − بلانك وكلاوزيوس.',
  tags: 'المحرك الحراري الكفاءة مثال 4 المستودع الحار البارد القانون الثاني كلفن بلانك كلاوزيوس ثلاجة',
  fact: ['لا يوجد محرك حراري كفاءته 100% ، فلا بد أن يطرح جزءاً من الحرارة إلى مستودع بارد (ص 128).', 'الثلاجة تنقل الحرارة من داخلها البارد إلى الغرفة الأحر لكنها تستهلك شغلاً (ص 128).'],
  quiz: [
    { q: 'محرك يأخذ 1200 J ويبذل شغلاً 400 J. كفاءته:', o: ['33%', '67%', '25%', '300%'], a: 0, why: 'مثال 4 ص 127: 400 / 1200 × 100%.' },
    { q: 'ماكنة حرارية تعمل بوساطة كمية من الحرارة داخلة إليها عند درجة حرارة معينة وتعمل على:', o: ['تحويل قسم منها إلى شغل وطرح المتبقي عند درجة حرارة أوطأ', 'تحويلها جميعاً إلى شغل', 'تحويل قسم منها إلى شغل وطرح المتبقي عند درجة الحرارة نفسها', 'تحويل جزء منها إلى شغل وطرح الباقي عند درجة حرارة أعلى'], a: 0, why: 'س1 فقرة 1 ص 129.' },
    { q: 'الاتجاه الطبيعي للسريان الحراري من الخزان الأعلى درجة حرارة TH إلى الأوطأ TC دون الأخذ بنظر الاعتبار كمية الحرارة في كل خزان، هذه الحقيقة تمثل:', o: ['القانون الثاني للديناميكا الحرارية', 'القانون الأول للديناميكا الحرارية', 'قانون حفظ الطاقة', 'قانون حفظ الزخم الخطي'], a: 0, why: 'س1 فقرة 2 ص 129.' },
    { q: 'ماكنة حرارية عديمة الاحتكاك يمكن أن تكون كفاءتها 100% فقط عندما تكون درجة حرارة الخروج TC:', o: ['تساوي 0 K', 'مساوية لدرجة حرارة الدخول TH', 'أقل من درجة حرارة الدخول TH', 'تساوي 0 °C'], a: 0, why: 'س1 فقرة 4 ص 130.' }],
  parts: [{ id: 'g11_th_engine', n: 'المحرك الحراري وكفاءته + مثال 4' }, { id: 'g11_th_second', n: 'القانون الثاني: كلفن − بلانك وكلاوزيوس' }] });
M8.merge({ id: 'g11_c6_review', ch: 56, reg: X11, sec: 'أسئلة ومسائل الفصل السادس', page: 129, kind: 'مثال',
  title: 'مسائل الفصل السادس خطوة خطوة',
  desc: 'نحل مسائل ص 130 الخمس: شغل غاز يتمدد بضغط ثابت، وغاز في إناء معزول، وكفاءة ماكنتين حراريتين، وسريان الحرارة في ماكنة تنقص طاقتها الداخلية، مع رسم لكل مسألة.',
  tags: 'مسائل الفصل السادس حلول خطوة خطوة الشغل الكفاءة الطاقة الداخلية',
  fact: ['انتبه للإشارات: الشغل المبذول على الغاز سالب، والحرارة الخارجة من النظام سالبة (ص 122).'],
  quiz: [
    { q: 'غاز يتمدد من 0.02 m³ إلى 0.022 m³ عند ضغط ثابت 5 × 10⁵ Pa. الشغل:', o: ['1000 J', '100 J', '10000 J', '11000 J'], a: 0, why: 'مسألة 1: 5 × 10⁵ × 0.002.' },
    { q: 'إناء معزول فيه غاز بُذل عليه شغل خارجي 135 J. التغير في الطاقة الداخلية:', o: ['+135 J', '−135 J', 'صفر', '+270 J'], a: 0, why: 'مسألة 2: ΔQ = 0 و ΔW = −135 J.' },
    { q: 'ماكنة تأخذ 2 × 10³ J وتطرح 1.5 × 10³ J. كفاءتها:', o: ['25%', '75%', '33%', '50%'], a: 0, why: 'مسألة 3: W = 500 J.' },
    { q: 'ماكنة تستقبل 3000 kJ وتطرح 900 kJ. الشغل والكفاءة:', o: ['2100 kJ و 70%', '3900 kJ و 130%', '900 kJ و 30%', '2100 kJ و 30%'], a: 0, why: 'مسألة 4.' },
    { q: 'ماكنة تنقص طاقتها الداخلية 400 J وتنجز شغلاً 250 J. سريان الحرارة ΔQ:', o: ['−150 J', '+150 J', '−650 J', '+650 J'], a: 0, why: 'مسألة 5: ΔQ = ΔU + ΔW = −400 + 250.' }],
  parts: [{ id: 'g11_th_review', n: 'مسائل ص 130 خطوة خطوة' }] });
/* __MERGES__ */
