'use strict';
/* ====================== الخامس العلمي — الفصل الأول: المتجهات (ch 51, ص 5–23) ======================
   Merged experiments (book order): g11_c1_coord (1-1, 1-2) · g11_c1_scalar (1-3) · g11_c1_prop (1-4)
   · g11_c1_add (1-5 بيانياً) · g11_c1_comp (1-5 تحليلياً) · g11_c1_mult (1-6) · g11_c1_review (أسئلة ص 20–23).
   Local kit Q51 = Q42 + graph paper, glossy vector arrows with over-arrow labels, angle arcs, compass rose, easing helpers. */
const Q51 = Object.assign(Object.create(Q42), {
  COL: { A: '#2563eb', B: '#16a34a', C: '#d97706', D: '#7c3aed', E: '#0891b2', R: '#dc2626', K: '#db2777', x: '#e11d48', y: '#0284c7', r: '#7c3aed' },
  d2r(d) { return d * Math.PI / 180; },
  r2d(r) { return r * 180 / Math.PI; },
  nd(a) { return ((a % 360) + 360) % 360; },
  ez(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  eza(a, b, dt, k = 10) { let d = Q51.nd(b - a); if (d > 180) d -= 360; return Q51.nd(a + d * Math.min(1, dt * k)); },
  f(v, d = 2) { let r = +(+v).toFixed(d); if (Object.is(r, -0) || Math.abs(r) < Math.pow(10, -d) / 2) r = 0; return String(r).replace('-', '−'); },
  /* polar angle of (x,y) in degrees 0..360 */
  ang(x, y) { return Math.hypot(x, y) < 1e-9 ? 0 : Q51.nd(Q51.r2d(Math.atan2(y, x))); },
  quad(x, y) { const e = 1e-9; if (Math.abs(x) < e && Math.abs(y) < e) return 'نقطة الأصل'; if (Math.abs(y) < e) return 'على المحور x'; if (Math.abs(x) < e) return 'على المحور y'; return x > 0 ? (y > 0 ? 'الربع الأول' : 'الربع الرابع') : (y > 0 ? 'الربع الثاني' : 'الربع الثالث'); },
  /* compass description of a math angle θ (0 = east, 90 = north) — always starts with Arabic */
  cdir(t) { t = Math.round(Q51.nd(t)) % 360; const M = { 0: 'باتجاه الشرق', 90: 'باتجاه الشمال', 180: 'باتجاه الغرب', 270: 'باتجاه الجنوب' }; if (M[t]) return M[t];
    if (t < 90) return 'باتجاه ' + t + '° شمال الشرق'; if (t < 180) return 'باتجاه ' + (t - 90) + '° غرب الشمال'; if (t < 270) return 'باتجاه ' + (t - 180) + '° جنوب الغرب'; return 'باتجاه ' + (360 - t) + '° جنوب الشرق'; },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f5f3ff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  /* graph paper: P = { x, y, w, h, ox, oy, u (px per unit), st (grid step, units), num (label step, units), noAxes } */
  plane(ctx, P, o = {}) {
    const st = P.st || 1, sp = P.u * st;
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.2)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 5; ctx.fillStyle = '#fff'; rr(ctx, P.x, P.y, P.w, P.h, 12); ctx.fill(); ctx.restore();
      ctx.save(); rr(ctx, P.x, P.y, P.w, P.h, 12); ctx.clip(); const g = ctx.createLinearGradient(P.x, P.y, P.x + P.w, P.y + P.h); g.addColorStop(0, '#fbfdff'); g.addColorStop(1, '#eef5ff'); ctx.fillStyle = g; ctx.fillRect(P.x, P.y, P.w, P.h);
      if (sp >= 6) { for (let pass = 0; pass < 2; pass++) { ctx.strokeStyle = pass ? 'rgba(37,99,235,.30)' : 'rgba(59,130,246,.14)'; ctx.lineWidth = pass ? 1.2 : 1; ctx.beginPath();
        const i0 = Math.ceil((P.x - P.ox) / sp), i1 = Math.floor((P.x + P.w - P.ox) / sp), j0 = Math.ceil((P.y - P.oy) / sp), j1 = Math.floor((P.y + P.h - P.oy) / sp);
        for (let i = i0; i <= i1; i++) if ((i % 5 === 0) === !!pass) { const x = P.ox + i * sp; ctx.moveTo(x, P.y); ctx.lineTo(x, P.y + P.h); }
        for (let j = j0; j <= j1; j++) if ((j % 5 === 0) === !!pass) { const y = P.oy + j * sp; ctx.moveTo(P.x, y); ctx.lineTo(P.x + P.w, y); } ctx.stroke(); } }
      if (!P.noAxes) { ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(P.x + 8, P.oy); ctx.lineTo(P.x + P.w - 10, P.oy); ctx.moveTo(P.ox, P.y + P.h - 8); ctx.lineTo(P.ox, P.y + 10); ctx.stroke();
        ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(P.x + P.w - 4, P.oy); ctx.lineTo(P.x + P.w - 14, P.oy - 5); ctx.lineTo(P.x + P.w - 14, P.oy + 5); ctx.fill(); ctx.beginPath(); ctx.moveTo(P.ox, P.y + 4); ctx.lineTo(P.ox - 5, P.y + 14); ctx.lineTo(P.ox + 5, P.y + 14); ctx.fill(); }
      ctx.restore(); });
    if (!P.noAxes) { Q42.T(ctx, o.xl || 'x', P.x + P.w - 14, P.oy + 14, { s: 13, w: 900, c: '#0f172a' }); Q42.T(ctx, o.yl || 'y', P.ox - 13, P.y + 14, { s: 13, w: 900, c: '#0f172a' });
      if (P.num) { const n = P.num, sp2 = P.u * n; for (let i = Math.ceil((P.x + 20 - P.ox) / sp2); i * sp2 <= P.x + P.w - 26 - P.ox; i++) if (i) Q42.T(ctx, Q51.f(i * n * (P.k || 1)), P.ox + i * sp2, P.oy + 11, { s: 9.5, w: 700, c: '#475569' });
        for (let j = Math.ceil((P.y + 26 - P.oy) / sp2); j * sp2 <= P.y + P.h - 16 - P.oy; j++) if (j) Q42.T(ctx, Q51.f(-j * n * (P.k || 1)), P.ox - 14, P.oy + j * sp2, { s: 9.5, w: 700, c: '#475569' }); }
      if (o.origin) Q42.T(ctx, '(0 , 0)', P.ox - 24, P.oy + 13, { s: 10, w: 800, c: '#be185d' }); }
  },
  px(P, x, y) { return [P.ox + x * P.u, P.oy - y * P.u]; },
  un(P, sx, sy) { return [(sx - P.ox) / P.u, (P.oy - sy) / P.u]; },
  /* glossy vector arrow (screen coords) with an over-arrow letter label */
  vec(ctx, x0, y0, x1, y1, col, lab, o = {}) {
    const L = Math.hypot(x1 - x0, y1 - y0); if (L < 1.5) { if (o.dot !== false) Q41.dot(ctx, x0, y0, col, 4); return; }
    const a = Math.atan2(y1 - y0, x1 - x0), w = o.w || 4.5, hl = Math.min(o.hs || 11 + w * 1.6, L * .7);
    K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = o.al != null ? o.al : 1; ctx.lineCap = 'round'; if (!o.flat) { ctx.shadowColor = 'rgba(15,23,42,.28)'; ctx.shadowBlur = 5; ctx.shadowOffsetY = 2; }
      if (o.dash) ctx.setLineDash(o.dash); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - Math.cos(a) * hl * .75, y1 - Math.sin(a) * hl * .75); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - hl * Math.cos(a - .36), y1 - hl * Math.sin(a - .36)); ctx.lineTo(x1 - hl * .7 * Math.cos(a), y1 - hl * .7 * Math.sin(a)); ctx.lineTo(x1 - hl * Math.cos(a + .36), y1 - hl * Math.sin(a + .36)); ctx.closePath(); ctx.fill();
      ctx.shadowColor = 'transparent'; if (!o.dash && L > 20) { ctx.strokeStyle = 'rgba(255,255,255,.42)'; ctx.lineWidth = Math.max(1, w * .28); ctx.beginPath(); ctx.moveTo(x0 + Math.sin(a) * w * .18, y0 - Math.cos(a) * w * .18); ctx.lineTo(x1 - Math.cos(a) * hl * 1.05 + Math.sin(a) * w * .18, y1 - Math.sin(a) * hl * 1.05 - Math.cos(a) * w * .18); ctx.stroke(); }
      if (o.tail) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x0, y0, w * .9, 0, TAU); ctx.fill(); }
      ctx.restore(); });
    if (lab) { const sd = o.side || 1, off = o.off != null ? o.off : 17, t = o.at != null ? o.at : .5; Q51.vl(ctx, lab, x0 + (x1 - x0) * t - Math.sin(a) * off * sd, y0 + (y1 - y0) * t + Math.cos(a) * off * sd, col, o.ls); }
  },
  /* letter with a small arrow over it (vector notation); s may hold a prefix like "−" or "3" and a subscript */
  vl(ctx, s, x, y, col, sz = 15) {
    s = String(s); Q42.T(ctx, s, x, y, { s: sz, w: 900, c: col, bg: 'rgba(255,255,255,.82)' });
    const m = s.match(/[A-Za-z]/); if (!m) return; const n = s.length, i = m.index, cw = sz * .58, xl = x - n * cw / 2 + i * cw + cw * .5, yy = y - sz * .78;
    K.raw(ctx, () => { ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(xl - cw * .5, yy); ctx.lineTo(xl + cw * .45, yy); ctx.stroke(); ctx.beginPath(); ctx.moveTo(xl + cw * .62, yy); ctx.lineTo(xl + cw * .3, yy - 2.8); ctx.lineTo(xl + cw * .3, yy + 2.8); ctx.fill(); });
  },
  /* angle arc at (x,y): math degrees, from a0 to a1 (counter-clockwise when a1 > a0) */
  arc(ctx, x, y, r, a0, a1, col, lab, o = {}) {
    if (Math.abs(a1 - a0) < .5) return;
    K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = o.w || 2; if (o.fill) { ctx.fillStyle = o.fill; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, -Q51.d2r(a0), -Q51.d2r(a1), a1 > a0); ctx.closePath(); ctx.fill(); } ctx.beginPath(); ctx.arc(x, y, r, -Q51.d2r(a0), -Q51.d2r(a1), a1 > a0); ctx.stroke(); });
    if (lab) { const m = Q51.d2r((a0 + a1) / 2), r2 = r + (o.lo || 16); Q42.T(ctx, lab, x + Math.cos(m) * r2, y - Math.sin(m) * r2, { s: o.s || 11.5, w: 900, c: col, bg: 'rgba(255,255,255,.85)' }); }
  },
  /* right-angle mark at corner (x,y) between unit screen directions u and v */
  rmark(ctx, x, y, ux, uy, vx, vy, s = 9, col = '#475569') { Q41.line(ctx, [[x + ux * s, y + uy * s], [x + ux * s + vx * s, y + uy * s + vy * s], [x + vx * s, y + vy * s]], col, 1.4); },
  dash(ctx, pts, col = '#64748b', w = 1.6) { Q41.line(ctx, pts, col, w, [6, 4]); },
  /* brass compass rose (top = north) */
  rose(ctx, x, y, r, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const g = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r); g.addColorStop(0, '#fde68a'); g.addColorStop(.7, '#d97706'); g.addColorStop(1, '#92400e'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#fffbeb'; ctx.beginPath(); ctx.arc(x, y, r * .84, 0, TAU); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; for (let k = 0; k < 36; k++) { const a = k * TAU / 36, l = k % 9 === 0 ? .2 : .1; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * .84, y + Math.sin(a) * r * .84); ctx.lineTo(x + Math.cos(a) * r * (.84 - l), y + Math.sin(a) * r * (.84 - l)); ctx.stroke(); }
      const nd = o.rot || 0; ctx.save(); ctx.translate(x, y); ctx.rotate(nd); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(0, -r * .6); ctx.lineTo(r * .1, 0); ctx.lineTo(-r * .1, 0); ctx.fill(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.moveTo(0, r * .6); ctx.lineTo(r * .1, 0); ctx.lineTo(-r * .1, 0); ctx.fill(); ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.arc(0, 0, r * .07, 0, TAU); ctx.fill(); ctx.restore(); });
    if (o.lab !== false) { const s = Math.max(9.5, r * .2); Q42.T(ctx, 'ش', x, y - r - 9, { s, w: 900, c: '#b91c1c' }); Q42.T(ctx, 'ج', x, y + r + 9, { s, w: 900, c: '#334155' }); Q42.T(ctx, 'ق', x + r + 9, y, { s, w: 900, c: '#334155' }); Q42.T(ctx, 'غ', x - r - 9, y, { s, w: 900, c: '#334155' }); }
  },
  stepChips(S, id, y, x0, lab, onEx, n = 9, bw = 160) { return Q42.chips(S, id, [['ex', lab || 'الحل خطوة خطوة'], ['nx', '⬇ الخطوة التالية']], y, '', (S2, k) => { if (k === 'ex' || !S2.ex) { S2.ex = 1; S2.k = 0; if (onEx) onEx(S2); if (k === 'ex') return; } S2.k = Math.min(S2.k + 1, n); }, { bw, x0 }); },
  drawSteps(ctx, list) { if (list[1]) list[1]._col = '#be185d'; Q42.drawChips(ctx, list); },
  /* standard geometry: drawing area left of the side card */
  geo(S, o = {}) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 14, x1 = o.full ? w - 14 : w - (o.cw || 328), y0 = o.y0 || 58, y1 = h - (o.bot || 150); return { w, h, L, x0, x1, y0, y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 }; }
});

/* =============== A1 — الإحداثيات الكارتيزية والقطبية (الأشكال 1–4 + مثال 1، ص 5–6) =============== */
(() => {
  const EX = { q: 'إذا كانت المحاور الكارتيزية لنقطة كما يأتي فجد محاورها القطبية', lines: ['x = −3.5 m     y = −2.5 m', 'r = √(x² + y²)', 'r = √((−3.5)² + (−2.5)²)', 'r = 4.3 m', 'tan θ = y / x = −2.5 / −3.5 = 0.714', 'tan 35.53° = 0.714', 'النقطة في الربع الثالث لذا:', 'θ = 180° + 35.53° = 215.53°', '(r , θ) = (4.3 m , 215.53°)'] };
  const D = { id: 'g11_v_coord', page: 5, fig: 'الأشكال 1 و 2 و 3 و 4 + مثال 1',
    desc: 'لتحديد موقع جسم نستعين بالإحداثيات. في الإحداثيات الكارتيزية يتعامد المحوران x و y في نقطة الأصل (0,0) ويُكتب موقع النقطة (x,y). وفي الإحداثيات القطبية نحدد البعد r عن نقطة الأصل والزاوية θ مع المحور x الموجب: x = r cosθ ، y = r sinθ ، r = √(x² + y²) ، tanθ = y/x.',
    tags: 'الإحداثيات الكارتيزية القطبية نقطة الأصل r θ x=rcosθ y=rsinθ فيثاغورس الربع الثالث 215.53 4.3m مثال 1',
    tools: ['ورق رسم بياني', 'مسطرة', 'منقلة'],
    steps: ['اسحب النقطة الحمراء على ورقة الرسم: تتغير (x , y) و (r , θ) معاً.', 'لاحظ المثلث القائم: الضلع الأفقي x والشاقولي y والوتر r.', 'انقل النقطة إلى الأرباع الأربعة وراقب الزاوية θ تُقاس دائماً من المحور x الموجب.', 'اضغط «مثال 1 ص 6» ثم «الخطوة التالية» لحل مثال الكتاب.'],
    concl: ['الإحداثيات الكارتيزية (x , y) والقطبية (r , θ) تصفان الموقع نفسه.', 'x = r cosθ و y = r sinθ.', 'r = √(x² + y²) و tanθ = y / x مع مراعاة الربع الذي تقع فيه النقطة.', 'مثال 1: النقطة (−3.5 , −2.5) m تقابل (4.3 m , 215.53°).'],
    laws: ['g11_l1_polar'],
    controls: [R('x', 'الإحداثي الأفقي x', -6, 6, 3, .5, 'm'), R('y', 'الإحداثي الشاقولي y', -6, 6, 4, .5, 'm'), TG('tri', 'مثلث العلاقة', true, null, 'vector'), TG('pol', 'شبكة قطبية', false, null, 'compass')],
    setup(S) { S.vx = S.p.x; S.vy = S.p.y; S.view = 'both'; S.ex = 0; S.k = 0; },
    update(S, dt) { S.vx = Q51.ez(S.vx, S.p.x, dt, 9); S.vy = Q51.ez(S.vy, S.p.y, dt, 9); },
    geo(S) { const g = Q51.geo(S), P = { x: g.x0, y: g.y0, w: g.x1 - g.x0, h: g.y1 - g.y0 }; P.u = Math.min(P.w, P.h) / 13.6; P.ox = P.x + P.w / 2; P.oy = P.y + P.h / 2; P.num = 1; g.P = P; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = g.P, x = S.vx, y = S.vy, r = Math.hypot(x, y), th = Q51.ang(x, y), [px, py] = Q51.px(P, x, y), O = [P.ox, P.oy], cart = S.view !== 'pol', pol = S.view !== 'cart';
      Q51.bg(ctx, w, h); Q51.plane(ctx, P);
      if (S.p.pol) K.raw(ctx, () => { ctx.save(); rr(ctx, P.x, P.y, P.w, P.h, 12); ctx.clip(); ctx.strokeStyle = 'rgba(124,58,237,.22)'; ctx.lineWidth = 1; for (let k = 1; k <= 9; k++) { ctx.beginPath(); ctx.arc(P.ox, P.oy, k * P.u, 0, TAU); ctx.stroke(); } for (let a = 0; a < 360; a += 30) { ctx.beginPath(); ctx.moveTo(P.ox, P.oy); ctx.lineTo(P.ox + Math.cos(Q51.d2r(a)) * P.u * 9, P.oy - Math.sin(Q51.d2r(a)) * P.u * 9); ctx.stroke(); } ctx.restore(); });
      if (S.p.pol) for (let a = 30; a < 360; a += 30) if (a % 90) Q42.T(ctx, a + '°', P.ox + Math.cos(Q51.d2r(a)) * P.u * 5.6, P.oy - Math.sin(Q51.d2r(a)) * P.u * 5.6, { s: 9.5, w: 800, c: '#7c3aed' });
      if (cart) { Q51.dash(ctx, [[px, py], [px, P.oy]], '#e11d48'); Q51.dash(ctx, [[px, py], [P.ox, py]], '#0284c7');
        Q42.T(ctx, 'x = ' + Q51.f(x), px, P.oy + (y >= 0 ? 26 : -24), { s: 11.5, w: 900, c: '#fff', bg: '#e11d48' }); Q42.T(ctx, 'y = ' + Q51.f(y), P.ox + (x >= 0 ? -38 : 38), py, { s: 11.5, w: 900, c: '#fff', bg: '#0284c7' }); }
      if (S.p.tri && r > .2) { Q41.line(ctx, [O, [px, P.oy]], '#e11d48', 4); Q41.line(ctx, [[px, P.oy], [px, py]], '#0284c7', 4); if (Math.abs(x) > .3 && Math.abs(y) > .3) Q51.rmark(ctx, px, P.oy, -Math.sign(x), 0, 0, -Math.sign(y), 10); }
      if (pol && r > .05) { Q51.vec(ctx, P.ox, P.oy, px, py, '#7c3aed', 'r', { w: 4, side: x * y >= 0 ? -1 : 1, dot: false }); Q51.arc(ctx, P.ox, P.oy, Math.min(34, r * P.u * .45 + 14), 0, th, '#be185d', 'θ = ' + Q51.f(th, 1) + '°', { lo: 26, fill: 'rgba(219,39,119,.10)' }); }
      Q41.knob(ctx, px, py, '#dc2626', 9);
      const lbx = px + (x >= 0 ? 14 : -14), al = x >= 0 ? 'left' : 'right';
      if (cart) Q42.T(ctx, '(' + Q51.f(x) + ' , ' + Q51.f(y) + ')', lbx, py - 16, { s: 12, w: 900, c: '#0f172a', a: al, bg: 'rgba(255,255,255,.9)' });
      if (pol) Q42.T(ctx, '(' + Q51.f(r) + ' , ' + Q51.f(th, 1) + '°)', lbx, py + 16, { s: 12, w: 900, c: '#7c3aed', a: al, bg: 'rgba(255,255,255,.9)' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.v); Q51.drawSteps(ctx, C.e);
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: 'مثال 1 ص 6' }, EX, { k: S.k }), { y: 64, x: w - 12, wd: 304 });
      else Q42.card(ctx, S, [{ t: 'x = r cos θ = ' + Q51.f(x), mono: 1, c: '#e11d48', w: 900 }, { t: 'y = r sin θ = ' + Q51.f(y), mono: 1, c: '#0284c7', w: 900 }, { t: 'r = √(x² + y²) = ' + Q51.f(r) + ' m', mono: 1, c: '#7c3aed', w: 900 }, { t: 'tan θ = y / x = ' + (Math.abs(x) < 1e-6 ? '∞' : Q51.f(y / x, 3)), mono: 1 }, { t: 'θ = ' + Q51.f(th, 2) + '°', mono: 1, c: '#be185d', w: 900 }, { t: 'موقع النقطة: ' + Q51.quad(x, y), c: '#334155', w: 800 }, { t: 'الزاوية θ تقاس من المحور x الموجب عكس عقارب الساعة', c: '#64748b', s: 11.5 }], { title: 'كارتيزية ⟷ قطبية', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب النقطة الحمراء على ورقة الرسم');
    },
    chips(S, g) { return { v: Q42.chips(S, 'view', [['cart', 'الكارتيزية'], ['pol', 'القطبية'], ['both', 'كلاهما معاً']], g.h - 128, S.view, (S2, k) => { S2.view = k; }, { bw: 150 }), e: Q51.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 1 ص 6', S2 => { setParam(S2, 'x', -3.5); setParam(S2, 'y', -2.5); S2.view = 'both'; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = g.P, [px, py] = Q51.px(P, S.p.x, S.p.y), C = D.chips(S, g);
      return [{ id: 'pt', x: px, y: py, r: 20, axis: 'xy', keep: true, tip: 'اسحب النقطة', idle: 'اسحب ✋', drag: (S2, d) => { const [u, v] = Q51.un(P, d.x, d.y); setParam(S2, 'x', clamp(Math.round(u * 2) / 2, -6, 6)); setParam(S2, 'y', clamp(Math.round(v * 2) / 2, -6, 6)); } }].concat(C.v, C.e); },
    readings(S) { const x = S.p.x, y = S.p.y; return [rd('x', Q51.f(x) + ' m'), rd('y', Q51.f(y) + ' m'), rd('البعد r', Q51.f(Math.hypot(x, y)) + ' m'), rd('الزاوية θ', Q51.f(Q51.ang(x, y)) + '°'), rd('الموقع', Q51.quad(x, y))]; },
    record(S) { const x = S.p.x, y = S.p.y; return { x, y, r: +Math.hypot(x, y).toFixed(2), t: +Q51.ang(x, y).toFixed(2) }; },
    cols: [['x', 'x (m)'], ['y', 'y (m)'], ['r', 'r (m)'], ['t', 'θ (°)']],
    explain(S) { return Q26.ex('كلما حرّكت النقطة تغيّر الزوج (x , y) والزوج (r , θ) معاً، وهما يصفان الموقع نفسه.', 'x و y ضلعا مثلث قائم وتره r ، فمن فيثاغورس r = √(x² + y²) ومن تعريف الظل tanθ = y/x. والزاوية تقاس من المحور x الموجب عكس عقارب الساعة، لذا نضيف 180° في الربعين الثاني والثالث.', 'رادار المطار يحدد موقع الطائرة بالبعد والزاوية (قطبية)، وخريطة المدينة تستعمل شبكة متعامدة (كارتيزية).'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — الكميات القياسية والمتجهة: صنّف الكميات (ص 7–8 + سؤال ص 8) =============== */
(() => {
  const Q = [['len', 'الطول 165 cm', 's', 'L', 'عدد ووحدة فقط'], ['vol', 'حجم الصندوق', 's', 'V', 'لا معنى لاتجاه الحجم'], ['temp', 'درجة الحرارة', 's', 'T', 'لا اتجاه لها'], ['vel', 'سرعة 40 km/h شرقاً', 'v', 'v', 'ذُكر الاتجاه: شرقاً'],
    ['dist', 'المسافة', 's', 'd', 'طول المسار فقط'], ['force', 'القوة', 'v', 'F', 'نقول دفعاً نحو اليمين مثلاً'], ['cur', 'التيار الكهربائي', 's', 'I', 'يُجمع جمعاً جبرياً'], ['acc', 'التعجيل', 'v', 'a', 'له اتجاه تغير السرعة'],
    ['ef', 'المجال الكهربائي', 'v', 'E', 'اتجاه القوة على شحنة موجبة'], ['time', 'الزمن', 's', 't', 'لا اتجاه له'], ['chg', 'الشحنة الكهربائية', 's', 'q', 'موجبة أو سالبة لكن بلا اتجاه']];
  const D = { id: 'g11_v_classify', page: 7, fig: 'سؤال ص 8',
    desc: 'الكمية القياسية (المقدارية) تتحدد بمقدارها ووحدة قياسها فقط، كالطول 165 cm والحجم ودرجة الحرارة. أما الكمية المتجهة فلا يكتمل وصفها إلا بمقدارها ووحدتها واتجاهها، كسرعة سيارة 40 km/h باتجاه الشرق. ونرمز للكمية المتجهة بحرف فوقه سهم صغير.',
    tags: 'كمية قياسية مقدارية متجهة اتجاه المسافة القوة التيار التعجيل المجال الكهربائي الزمن الشحنة تصنيف سؤال ص 8',
    tools: ['بطاقات الكميات الفيزيائية', 'صندوقا التصنيف'],
    steps: ['اسحب بطاقة كمية فيزيائية إلى الصندوق المناسب، أو اضغطها ثم اضغط الصندوق.', 'اسأل نفسك: هل يكتمل وصفها بعدد ووحدة؟ أم تحتاج إلى اتجاه؟', 'البطاقة الخاطئة تهتز وتعود إلى مكانها. فعّل «التلميح» إذا احتجت.', 'عند وضع الكمية المتجهة يظهر رمزها بسهم فوق الحرف.'],
    concl: ['القياسية: مقدار + وحدة، مثل المسافة والزمن والشحنة والتيار ودرجة الحرارة.', 'المتجهة: مقدار + وحدة + اتجاه، مثل القوة والسرعة والتعجيل والمجال الكهربائي.', 'نرمز للمتجه بسهم فوق الحرف، ومقداره |A| كمية قياسية موجبة دائماً.'],
    laws: [],
    controls: [TG('hint', 'تلميح: هل لها اتجاه؟', false, null, 'labels'), TG('sym', 'إظهار الرموز', true, null, 'vector')],
    setup(S) { S.at = {}; S.sel = ''; S.pos = {}; S.bad = ''; S.bt = 0; S.err = 0; S.drag = ''; S.auto = 0; },
    geo(S) { const g = Q51.geo(S), cw = Math.min(140, (g.x1 - g.x0 - 16) / 3); g.cw = cw; g.ch = 40; g.by = 316; g.bh = g.y1 - g.by; g.bw = (g.x1 - g.x0 - 16) / 2; g.bins = { s: [g.x1 - g.bw, g.by], v: [g.x0, g.by] }; return g; },
    home(g, i) { return [g.x1 - g.cw / 2 - (i % 3) * (g.cw + 8), 92 + Math.floor(i / 3) * (g.ch + 12)]; },
    slot(g, S, k) { const q = Q.find(q => q[0] === k), list = Q.filter(z => S.at[z[0]] === q[2]).map(z => z[0]), j = Math.max(0, list.indexOf(k)), b = g.bins[q[2]]; return [b[0] + g.bw / 2, b[1] + 48 + j * 31]; },
    target(S, g, k, i) { return S.at[k] ? D.slot(g, S, k) : D.home(g, i); },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); if (S.bt > 0) S.bt -= dt;
      if (S.auto) { S.auto -= dt; if (S.auto <= 0) { const q = Q.find(q => !S.at[q[0]]); if (q) { S.at[q[0]] = q[2]; S.auto = .35; } else S.auto = 0; } }
      Q.forEach((q, i) => { const k = q[0]; if (S.drag === k) return; const t = D.target(S, g, k, i), p = S.pos[k] || (S.pos[k] = t.slice()); p[0] = Q51.ez(p[0], t[0], dt, 8); p[1] = Q51.ez(p[1], t[1], dt, 8); }); },
    drop(S, k, b) { const q = Q.find(q => q[0] === k); if (!q || S.at[k]) return; if (q[2] === b) { S.at[k] = b; S.sel = ''; } else { S.bad = b; S.bt = .7; S.err++; S.shake = k; S.sel = ''; } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), n = Object.keys(S.at).length; Q51.bg(ctx, w, h);
      // trays
      [['s', 'كميات قياسية', '#0f766e', 'مقدار + وحدة'], ['v', 'كميات متجهة', '#7c3aed', 'مقدار + وحدة + اتجاه']].forEach(([b, t, c, sub]) => { const [x, y] = g.bins[b], bad = S.bad === b && S.bt > 0;
        K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 4; const gr = ctx.createLinearGradient(0, y, 0, y + g.bh); gr.addColorStop(0, bad ? '#fee2e2' : '#ffffff'); gr.addColorStop(1, bad ? '#fecaca' : (b === 's' ? '#ccfbf1' : '#ede9fe')); ctx.fillStyle = gr; rr(ctx, x, y, g.bw, g.bh, 14); ctx.fill(); ctx.restore(); ctx.strokeStyle = bad ? '#dc2626' : c; ctx.lineWidth = 3; rr(ctx, x, y, g.bw, g.bh, 14); ctx.stroke(); ctx.fillStyle = c; rr(ctx, x, y, g.bw, 36, 14); ctx.fill(); ctx.fillRect(x, y + 20, g.bw, 16); });
        Q42.T(ctx, t, x + g.bw / 2, y + 18, { s: 14, w: 900, c: '#fff' }); Q42.T(ctx, sub, x + g.bw / 2, y + g.bh - 14, { s: 11, w: 800, c: c });
        if (b === 'v') Q51.vec(ctx, x + 18, y + g.bh - 34, x + 60, y + g.bh - 50, '#7c3aed', '', { w: 3 }); });
      // cards
      const drawCard = (q, i) => { const k = q[0], p = S.pos[k] || D.target(S, g, k, i), placed = !!S.at[k], sel = S.sel === k || S.drag === k, sh = S.shake === k && S.bt > 0 ? Math.sin(S.bt * 40) * 6 : 0, cw = placed ? g.bw - 24 : g.cw, ch = placed ? 27 : g.ch, x = p[0] + sh, y = p[1] - (sel ? 4 : 0), c = placed ? (q[2] === 's' ? '#0f766e' : '#7c3aed') : sel ? '#f59e0b' : '#475569';
        K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = sel ? 14 : 6; ctx.shadowOffsetY = sel ? 6 : 2; const gr = ctx.createLinearGradient(0, y - ch / 2, 0, y + ch / 2); gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#f1f5f9'); ctx.fillStyle = gr; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 8); ctx.fill(); ctx.restore(); ctx.strokeStyle = c; ctx.lineWidth = sel ? 3 : 2; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 8); ctx.stroke(); ctx.fillStyle = c; rr(ctx, x + cw / 2 - 7, y - ch / 2 + 4, 4, ch - 8, 2); ctx.fill(); });
        Q42.T(ctx, q[1], x + (S.p.sym && placed ? 14 : 0), y, { s: placed ? 11.5 : 12, w: 800, c: '#0f172a' });
        if (S.p.sym && placed) { if (q[2] === 'v') Q51.vl(ctx, q[3], x - cw / 2 + 18, y + 2, '#7c3aed', 14); else Q42.T(ctx, q[3], x - cw / 2 + 18, y, { s: 14, w: 900, c: '#0f766e' }); }
        if (S.p.hint && sel) Q42.T(ctx, q[4], x, y + ch / 2 + 12, { s: 10.5, w: 800, c: '#fff', bg: '#b45309' }); };
      Q.forEach((q, i) => { if (S.sel !== q[0] && S.drag !== q[0]) drawCard(q, i); }); Q.forEach((q, i) => { if (S.sel === q[0] || S.drag === q[0]) drawCard(q, i); });
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      Q42.card(ctx, S, [{ t: 'الكمية القياسية: مقدار ووحدة قياس فقط', c: '#0f766e', w: 900 }, { t: 'مثل الطول 165 cm: العدد 165 والوحدة cm', c: '#334155' }, { t: 'الكمية المتجهة: مقدار ووحدة واتجاه', c: '#7c3aed', w: 900 }, { t: 'مثل سرعة سيارة 40 km/h باتجاه الشرق', c: '#334155' }, { t: 'نرمز للمتجه بحرف فوقه سهم صغير', c: '#334155' }, { t: 'صُنّفت ' + n + ' من ' + Q.length + ' — الأخطاء: ' + S.err, c: n === Q.length ? '#16a34a' : '#b45309', w: 900 }].concat(n === Q.length ? [{ t: 'أحسنت! اكتمل التصنيف', c: '#16a34a', w: 900 }] : []), { title: 'سؤال ص 8: صنّف الكميات', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب كل بطاقة إلى صندوقها');
    },
    chips(S, g) { return Q42.chips(S, 'act', [['re', '↺ من جديد'], ['all', 'صنّف الكل ▶']], g.h - 84, '', (S2, k) => { if (k === 're') { S2.at = {}; S2.err = 0; S2.sel = ''; S2.auto = 0; } else S2.auto = .05; }, { bw: 150 }); },
    inBin(g, x, y) { for (const b in g.bins) { const [bx, by] = g.bins[b]; if (x > bx && x < bx + g.bw && y > by && y < by + g.bh) return b; } return ''; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), out = [];
      Q.forEach((q, i) => { if (S.at[q[0]]) return; const p = S.pos[q[0]] || D.home(g, i), k = q[0];
        out.push({ id: 'c_' + k, x: p[0], y: p[1], w: g.cw, h: g.ch, axis: 'xy', keep: true, tip: q[1], idle: out.length ? undefined : 'اسحب ✋', hint: out.length ? false : undefined,
          drag: (S2, d) => { S2.drag = k; const pp = S2.pos[k] || (S2.pos[k] = [d.x, d.y]); pp[0] = d.x; pp[1] = d.y; },
          up: (S2, x, y) => { S2.drag = ''; const pp = S2.pos[k], b = pp ? D.inBin(g, pp[0], pp[1]) : ''; if (b) D.drop(S2, k, b); },
          click: S2 => { S2.sel = S2.sel === k ? '' : k; } }); });
      ['s', 'v'].forEach(b => { const [x, y] = g.bins[b]; out.push({ id: 'bin_' + b, x: x + g.bw / 2, y: y + g.bh / 2, w: g.bw, h: g.bh, axis: 'none', hint: false, tip: b === 's' ? 'صندوق القياسية' : 'صندوق المتجهة', click: S2 => { if (S2.sel) D.drop(S2, S2.sel, b); } }); });
      return out.concat(D.chips(S, g)); },
    readings(S) { const n = Object.keys(S.at).length; return [rd('المصنّفة', n + ' / ' + Q.length), rd('القياسية', Q.filter(q => S.at[q[0]] === 's').length + ''), rd('المتجهة', Q.filter(q => S.at[q[0]] === 'v').length + ''), rd('الأخطاء', S.err + '')]; },
    explain(S) { return Q26.ex('البطاقات تستقر في صندوقين: القياسية والمتجهة، والرمز يظهر بسهم فوق حرف الكمية المتجهة.', 'القوة والسرعة والتعجيل والمجال الكهربائي لا يكتمل وصفها دون اتجاه، أما المسافة والزمن والشحنة والتيار ودرجة الحرارة فيكفيها العدد والوحدة.', 'الطيار يحتاج إلى سرعة الريح واتجاهها معاً، أما الطباخ فتكفيه درجة حرارة الفرن.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — تمثيل المتجه بسهم واتجاهه بالبوصلة (الأشكال 5–8 + مثال 2، ص 7–8) =============== */
(() => {
  const CS = { f5: ['الشكل 5', 'A', 10, 37, 'وحدات'], f6: ['الشكل 6', 'B', 3, 90, 'وحدات'], e2a: ['مثال 2: القوة', 'F', 3, 180, 'N'], e2b: ['مثال 2: السرعة', 'v', 5, 127, 'm/s'], free: ['حر', 'A', 6, 210, 'وحدات'] };
  const EX = { q: 'عبّر رياضياً وبيانياً: 1) قوة 3 N باتجاه الغرب. 2) سرعة 5 m/s باتجاه 37° غرب الشمال', lines: ['الفرع 1: F = 3 N أو |F| = 3 N', 'القوة غرباً أي باتجاه x السالب', 'الزاوية مع x الموجب: θ = 180°', 'الفرع 2: |v| = 5 m/s', 'الاتجاه 37° غرب الشمال أي 37° مع y الموجب', 'θ = 37° + 90° = 127°'] };
  const D = { id: 'g11_v_dir', page: 7, fig: 'الأشكال 5 و 6 و 7 و 8 + مثال 2',
    desc: 'تُمثَّل الكمية المتجهة بيانياً بسهم: يتناسب طوله مع مقدار الكمية بمقياس رسم معين، ويشير رأسه إلى اتجاهها، وذيله نقطة التأثير. ويحدَّد الاتجاه بالزاوية θ مع الاتجاه الموجب للمحور x ، أو بالجهات الجغرافية مثل 37° غرب الشمال.',
    tags: 'تمثيل المتجه سهم مقياس رسم اتجاه زاوية θ نقطة التأثير الشمال الغرب 37 غرب الشمال 127 مثال 2 الشكل 5 الشكل 6',
    tools: ['ورق رسم بياني', 'بوصلة', 'منقلة', 'مسطرة'],
    steps: ['اختر الشكل 5 أو 6 أو فرعي مثال 2 من الأزرار.', 'اسحب رأس السهم: طوله = المقدار، ودورانه يغيّر الاتجاه.', 'اقرأ الاتجاه بطريقتين: الزاوية θ مع x الموجب، والاتجاه الجغرافي من البوصلة.', 'اضغط «مثال 2 ص 8» لترى الحل خطوة خطوة.'],
    concl: ['طول السهم يتناسب مع مقدار المتجه، ورأسه يشير إلى اتجاهه.', 'قوة 3 N غرباً تصنع θ = 180° مع x الموجب.', 'سرعة 5 m/s باتجاه 37° غرب الشمال: θ = 37° + 90° = 127°.', 'مقدار المتجه |A| كمية قياسية موجبة دائماً.'],
    laws: [],
    controls: [R('mag', 'المقدار', 0, 10, 10, .5, ''), R('ang', 'الزاوية θ مع x الموجب', 0, 359, 37, 1, '°'), TG('rose', 'البوصلة', true, null, 'compass'), TG('geo', 'الزاوية الجغرافية', true, null, 'labels')],
    setup(S) { S.cs = 'f5'; S.vm = S.p.mag; S.va = S.p.ang; S.ex = 0; S.k = 0; },
    pick(S, k) { S.cs = k; const c = CS[k]; setParam(S, 'mag', c[2]); setParam(S, 'ang', c[3]); },
    update(S, dt) { if (S.ex && S.k >= 4 && S.cs !== 'e2b') D.pick(S, 'e2b'); S.vm = Q51.ez(S.vm, S.p.mag, dt, 8); S.va = Q51.eza(S.va, S.p.ang, dt, 8); },
    geo(S) { const g = Q51.geo(S), P = { x: g.x0, y: g.y0, w: g.x1 - g.x0, h: g.y1 - g.y0 }; P.u = Math.min(P.w, P.h) / 24; P.ox = P.x + P.w / 2; P.oy = P.y + P.h / 2; P.num = 2; g.P = P; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = g.P, c = CS[S.cs], m = S.vm, a = S.va, tx = P.ox + Math.cos(Q51.d2r(a)) * m * P.u, ty = P.oy - Math.sin(Q51.d2r(a)) * m * P.u, ai = Math.round(Q51.nd(S.p.ang));
      Q51.bg(ctx, w, h); Q51.plane(ctx, P);
      Q42.T(ctx, 'شرق', P.x + P.w - 30, P.oy - 14, { s: 11, w: 900, c: '#b45309' }); Q42.T(ctx, 'غرب', P.x + 24, P.oy - 14, { s: 11, w: 900, c: '#b45309' }); Q42.T(ctx, 'شمال', P.ox + 26, P.y + 14, { s: 11, w: 900, c: '#b45309' }); Q42.T(ctx, 'جنوب', P.ox + 26, P.y + P.h - 14, { s: 11, w: 900, c: '#b45309' });
      if (S.p.rose) Q51.rose(ctx, P.x + 46, P.y + 50, 30);
      Q51.arc(ctx, P.ox, P.oy, 30, 0, a, '#be185d', 'θ = ' + Math.round(a) + '°', { lo: 22, fill: 'rgba(219,39,119,.08)' });
      if (S.p.geo && ai % 90 && ai > 90) { const qa = ai < 90 ? [0, a] : ai < 180 ? [90, a] : ai < 270 ? [180, a] : [a, 360];
        Q51.arc(ctx, P.ox, P.oy, 58, qa[0], qa[1], '#d97706', Math.round(Math.abs(qa[1] - qa[0])) + '°', { lo: 16, w: 2.5 }); }
      Q51.vec(ctx, P.ox, P.oy, tx, ty, '#2563eb', c[1], { w: 5, tail: 1, side: -1 });
      Q42.T(ctx, 'نقطة التأثير', P.ox - 46, P.oy + 24, { s: 10, w: 800, c: '#334155', bg: 'rgba(255,255,255,.92)' });
      Q41.knob(ctx, tx, ty, '#dc2626', 9);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q51.drawSteps(ctx, C.e);
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: 'مثال 2 ص 8' }, EX, { k: S.k }), { y: 64, x: w - 12, wd: 304 });
      else Q42.card(ctx, S, [{ t: 'المقدار: |' + c[1] + '| = ' + Q51.f(S.p.mag, 1) + ' ' + c[4], c: '#2563eb', w: 900 }, { t: 'الزاوية مع x الموجب: θ = ' + ai + '°', c: '#be185d', w: 900 }, { t: 'الاتجاه الجغرافي: ' + Q51.cdir(ai), c: '#b45309', w: 900 }, { t: 'طول السهم ' + Q51.f(S.p.mag, 1) + ' مربع: كل مربع = 1 ' + (c[4] === 'وحدات' ? 'وحدة' : c[4]), c: '#334155' }, { t: 'ذيل السهم نقطة التأثير ورأسه يشير إلى الاتجاه', c: '#64748b', s: 11.5 }], { title: c[0], y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب رأس السهم لتغيير مقداره واتجاهه');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', Object.keys(CS).map(k => [k, CS[k][0]]), g.h - 128, S.cs, (S2, k) => { D.pick(S2, k); S2.ex = 0; }, { bw: 130 }), e: Q51.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 2 ص 8', S2 => D.pick(S2, 'e2a'), EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = g.P, C = D.chips(S, g), a = Q51.d2r(S.p.ang);
      return [{ id: 'tip', x: P.ox + Math.cos(a) * S.p.mag * P.u, y: P.oy - Math.sin(a) * S.p.mag * P.u, r: 20, axis: 'xy', keep: true, tip: 'اسحب رأس السهم', idle: 'اسحب ✋', drag: (S2, d) => { const [u, v] = Q51.un(P, d.x, d.y); setParam(S2, 'mag', clamp(Math.round(Math.hypot(u, v) * 2) / 2, 0, 10)); setParam(S2, 'ang', Math.round(Q51.ang(u, v)) % 360); } }].concat(C.c, C.e); },
    readings(S) { const c = CS[S.cs]; return [rd('المقدار', Q51.f(S.p.mag, 1) + ' ' + c[4]), rd('الزاوية θ', Math.round(S.p.ang) + '°'), rd('الاتجاه', Q51.cdir(S.p.ang))]; },
    explain(S) { return Q26.ex('السهم يطول بزيادة المقدار ويدور مع الاتجاه، والبوصلة تترجم الزاوية θ إلى جهة جغرافية.', 'الكمية المتجهة تحتاج إلى مقدار واتجاه، لذا نمثلها بسهم طوله بمقياس رسم ورأسه نحو الاتجاه. والزاوية 37° غرب الشمال تُقاس من الشمال نحو الغرب، فتساوي 127° من الشرق (x الموجب).', 'الملاحون والطيارون يصفون مسارهم بالاتجاه الجغرافي والزاوية معاً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — خصائص المتجهات: التساوي، السالب، الضرب بعدد + فكر ص 14 (الأشكال 9–12) =============== */
(() => {
  const TH = [['A', 30, 'باتجاه 30° شمال الشرق', [-5.6, -4.2]], ['B', 210, 'باتجاه 30° جنوب الغرب', [-1, 4.6]], ['C', 330, 'باتجاه 30° جنوب الشرق', [0.6, -0.4]], ['D', 30, 'باتجاه 60° شرق الشمال', [1.8, -4.6]], ['E', 210, 'باتجاه 60° غرب الجنوب', [5.6, 4.6]]];
  const MODES = [['eq', 'التساوي'], ['neg', 'سالب المتجه'], ['mul', 'الضرب بعدد k'], ['think', 'فكّر ص 14']];
  const D = { id: 'g11_v_props', page: 9, fig: 'الأشكال 9 و 10 و 11 و 12 + فكّر ص 14',
    desc: 'المتجهان متساويان إذا كان لهما المقدار نفسه والاتجاه نفسه بغض النظر عن نقطة بداية كل منهما. وسالب المتجه A هو المتجه −A: له المقدار نفسه واتجاه معاكس. وضرب المتجه بكمية قياسية k يعطي متجهاً مقداره |k| مرة من مقدار الأصل، وبالاتجاه نفسه إذا كان k موجباً، مثل F = m a و F = q E.',
    tags: 'تساوي المتجهات سالب المتجه ضرب المتجه بكمية قياسية 3A F=ma F=qE فكر جدول الإزاحة 100m شمال الشرق',
    tools: ['ورق رسم بياني', 'أسهم متجهات قابلة للسحب'],
    steps: ['التساوي: اسحب ذيل المتجه B لتنقله إلى أي مكان؛ يبقى مساوياً لـ A. ثم اسحب رأسه ولاحظ متى يختل التساوي.', 'سالب المتجه: اسحب −A ثم اضغط «A + (−A)» لترى أن المجموع صفر.', 'الضرب بعدد: غيّر k من المنزلق أو الأزرار، ولاحظ الطول والاتجاه.', 'فكّر ص 14: اختر متجهين من الجدول لتعرف هل هما متساويان.'],
    concl: ['A = B إذا تساويا مقداراً واتجاهاً، أينما كانت نقطة البداية.', 'المتجه وسالبه متساويان بالمقدار ومتعاكسان بالاتجاه: A + (−A) = 0.', 'k A مقداره |k| |A|، واتجاهه مع A إذا كان k موجباً وعكسه إذا كان سالباً.', 'في جدول فكّر: A = D و B = E.'],
    laws: [],
    controls: [R('a', 'مقدار A', 1, 5, 3, .5, ''), R('ta', 'اتجاه A', 0, 355, 30, 5, '°'), R('k', 'العدد k', -3, 3, 3, .5, ''), TG('copies', 'نسخ متساوية كالشكل 9', true, null, 'layers')],
    setup(S) { S.m = 'eq'; S.ea = S.p.a; S.eta = S.p.ta; S.ek = S.p.k; S.bt = [1, -3.5]; S.ebt = [1, -3.5]; S.bv = null; S.ebv = null; S.nt = [2, -1]; S.ent = [2, -1]; S.join = 0; S.ej = 0; S.sel = []; },
    A(S, e) { const a = e ? S.ea : S.p.a, t = Q51.d2r(e ? S.eta : S.p.ta); return [a * Math.cos(t), a * Math.sin(t)]; },
    BV(S) { return S.bv || D.A(S); },
    update(S, dt) { S.ea = Q51.ez(S.ea, S.p.a, dt, 9); S.eta = Q51.eza(S.eta, S.p.ta, dt, 9); S.ek = Q51.ez(S.ek, S.p.k, dt, 7); S.ej = Q51.ez(S.ej, S.join, dt, 5);
      [0, 1].forEach(i => { S.ebt[i] = Q51.ez(S.ebt[i], S.bt[i], dt, 10); S.ent[i] = Q51.ez(S.ent[i], S.nt[i], dt, 10); });
      const tv = D.BV(S); if (!S.ebv) S.ebv = tv.slice(); S.ebv[0] = Q51.ez(S.ebv[0], tv[0], dt, 9); S.ebv[1] = Q51.ez(S.ebv[1], tv[1], dt, 9); },
    geo(S) { const g = Q51.geo(S), P = { x: g.x0, y: g.y0, w: g.x1 - g.x0, h: g.y1 - g.y0 }; P.u = Math.min(P.w, P.h) / 14; P.ox = P.x + P.w / 2; P.oy = P.y + P.h / 2; g.P = P; g.at = [-5, -1.5]; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = g.P, A = D.A(S, 1), px = (x, y) => Q51.px(P, x, y), at = g.at; let lines = [], title = '';
      Q51.bg(ctx, w, h); Q51.plane(ctx, P); const clip = f => K.raw(ctx, () => { ctx.save(); rr(ctx, P.x, P.y, P.w, P.h, 12); ctx.clip(); f(); ctx.restore(); });
      const V = (t, v, col, lab, o) => { const p0 = px(t[0], t[1]), p1 = px(t[0] + v[0], t[1] + v[1]); Q51.vec(ctx, p0[0], p0[1], p1[0], p1[1], col, lab, o); return [p0, p1]; };
      if (S.m === 'eq') {
        if (S.p.copies) [[-1, 3], [3.2, 2.2]].forEach((t, i) => V(t, A, '#94a3b8', i ? 'D' : 'C', { w: 3.5, al: .7 }));
        V(at, A, '#2563eb', 'A', { tail: 1 }); const bv = S.ebv, b = V(S.ebt, bv, '#16a34a', 'B', { tail: 1 }); Q41.knob(ctx, b[0][0], b[0][1], '#16a34a', 8); Q41.knob(ctx, b[1][0], b[1][1], '#dc2626', 8);
        const tv = D.BV(S), Av = D.A(S), eq = Math.hypot(tv[0] - Av[0], tv[1] - Av[1]) < .05; title = 'تساوي المتجهين';
        lines = [{ t: '|A| = ' + Q51.f(Math.hypot(...Av)) + '     |B| = ' + Q51.f(Math.hypot(...tv)), mono: 1 }, { t: 'θA = ' + Q51.f(Q51.ang(...Av), 0) + '°     θB = ' + Q51.f(Q51.ang(...tv), 0) + '°', mono: 1, c: '#334155' }, eq ? { t: 'متساويان: A = B', c: '#16a34a', w: 900 } : { t: 'غير متساويين: A ≠ B', c: '#dc2626', w: 900 }, { t: 'نقطة البداية لا تؤثر في التساوي', c: '#64748b' }];
      } else if (S.m === 'neg') {
        const a = V(at, A, '#2563eb', 'A', { tail: 1 }), nv = [-A[0], -A[1]], al = Q51.d2r(S.eta), off = [-Math.sin(al) * .3 * S.ej, Math.cos(al) * .3 * S.ej], tail = [S.ent[0] * (1 - S.ej) + (at[0] + A[0]) * S.ej + off[0], S.ent[1] * (1 - S.ej) + (at[1] + A[1]) * S.ej + off[1]], n = V(tail, nv, '#db2777', '−A', { tail: 1, side: -1 });
        if (!S.join) Q41.knob(ctx, n[0][0], n[0][1], '#db2777', 8); if (S.ej > .95) { Q41.dot(ctx, a[0][0], a[0][1], '#dc2626', 9); Q42.T(ctx, 'المحصلة = 0', a[0][0], a[0][1] + 24, { s: 12, w: 900, c: '#fff', bg: '#dc2626' }); }
        title = 'سالب المتجه'; lines = [{ t: '|−A| = |A| = ' + Q51.f(S.p.a), mono: 1, c: '#db2777', w: 900 }, { t: 'θ(A) = ' + Q51.f(Q51.nd(S.p.ta), 0) + '°     θ(−A) = ' + Q51.f(Q51.nd(S.p.ta + 180), 0) + '°', mono: 1, c: '#334155' }, { t: 'المتجه وسالبه متساويان مقداراً ومتعاكسان اتجاهاً', c: '#334155' }, { t: 'A + (−A) = 0', mono: 1, c: '#dc2626', w: 900 }];
      } else if (S.m === 'mul') {
        const kA = [A[0] * S.ek, A[1] * S.ek], t0 = [-A[0] / 2, 3.2 - A[1] / 2], t1 = [-kA[0] / 2, -2.6 - kA[1] / 2]; clip(() => { V(t0, A, '#2563eb', 'A', { tail: 1 }); V(t1, kA, S.ek >= 0 ? '#7c3aed' : '#db2777', Q51.f(S.p.k, 1) + 'A', { tail: 1, w: 5 }); });
        const sy = P.y + P.h - 30; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(ctx, P.x + 30, sy - 30, P.w - 60, 46, 10); ctx.fill(); }); Q41.slider(ctx, P.x + 60, P.x + P.w - 60, sy, (S.p.k + 3) / 6, 'k = ' + Q51.f(S.p.k, 1), '#7c3aed');
        title = 'ضرب المتجه بكمية قياسية'; lines = [{ t: '|kA| = |k| × |A| = ' + Q51.f(Math.abs(S.p.k)) + ' × ' + Q51.f(S.p.a) + ' = ' + Q51.f(Math.abs(S.p.k * S.p.a)), mono: 1, c: '#7c3aed', w: 900 }, { t: S.p.k > 0 ? 'لأن k موجب يبقى الاتجاه نفسه' : S.p.k < 0 ? 'لأن k سالب ينعكس الاتجاه' : 'عندما k = 0 ينتج المتجه الصفري', c: '#334155', w: 800 }, { t: 'القانون الثاني لنيوتن: F = m a', c: '#0f766e' }, { t: 'القوة الكهربائية: F = q E', c: '#0f766e' }];
      } else {
        TH.forEach(q => { const v = [3 * Math.cos(Q51.d2r(q[1])), 3 * Math.sin(Q51.d2r(q[1]))], on = S.sel.includes(q[0]); V(q[3], v, on ? '#dc2626' : '#2563eb', q[0], { tail: 1, w: on ? 5.5 : 4 }); });
        Q51.rose(ctx, P.x + P.w - 46, P.y + P.h - 50, 28);
        title = 'فكّر ص 14: كل متجه 100 m'; lines = TH.map(q => ({ t: 'المتجه ' + q[0] + ': ' + q[2], c: S.sel.includes(q[0]) ? '#dc2626' : '#334155', s: 11.5, w: S.sel.includes(q[0]) ? 900 : 700 }));
        if (S.sel.length === 2) { const a = TH.find(q => q[0] === S.sel[0]), b = TH.find(q => q[0] === S.sel[1]), ok = a[1] === b[1]; lines.push({ t: ok ? 'متساويان: ' + a[0] + ' = ' + b[0] : 'غير متساويين: الاتجاه مختلف', c: ok ? '#16a34a' : '#dc2626', w: 900 }); } else lines.push({ t: 'اختر متجهين من الأزرار', c: '#0f766e', w: 800 });
      }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.a);
      Q42.card(ctx, S, lines, { title, y: 64, wd: 304 });
      Q42.banner(ctx, w, S.m === 'eq' ? 'اسحب ذيل B الأخضر لنقله، ورأسه الأحمر لتغييره' : S.m === 'neg' ? 'اسحب −A ثم اجمعه مع A' : S.m === 'mul' ? 'اسحب منزلق k أو رأس A' : 'اختر متجهين من الجدول');
    },
    chips(S, g) { const m = Q42.chips(S, 'm', MODES, g.h - 128, S.m, (S2, k) => { S2.m = k; S2.join = 0; }, { bw: 150 }); let a;
      if (S.m === 'eq') a = Q42.chips(S, 'eqa', [['re', 'أعِد B مساوياً لـ A'], ['mv', 'انقل B إلى مكان آخر']], g.h - 84, '', (S2, k) => { if (k === 're') S2.bv = null; else S2.bt = [S2.bt[0] > 0 ? -1.5 : 1.5, S2.bt[1] > -2 ? -4.5 : 3]; }, { bw: 180 });
      else if (S.m === 'neg') a = Q42.chips(S, 'nga', [['j', 'A + (−A)'], ['s', 'افصلهما']], g.h - 84, S.join ? 'j' : 's', (S2, k) => { S2.join = k === 'j' ? 1 : 0; }, { bw: 160 });
      else if (S.m === 'mul') a = Q42.chips(S, 'mk', [-2, -1, .5, 1, 2, 3].map(v => [String(v), 'k = ' + v]), g.h - 84, String(S.p.k), (S2, k) => setParam(S2, 'k', +k), { bw: 88 });
      else a = Q42.chips(S, 'th', TH.map(q => [q[0], 'المتجه ' + q[0]]), g.h - 84, '', (S2, k) => { const s = S2.sel.filter(x => x !== k); S2.sel = s.length < S2.sel.length ? s : s.concat(k).slice(-2); }, { bw: 100 }).map(b => { b._on = S.sel.includes(b.id.slice(3)); b._col = '#dc2626'; return b; });
      return { m, a }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = g.P, C = D.chips(S, g), A = D.A(S), px = (x, y) => Q51.px(P, x, y), out = [];
      const setA = (S2, t, d) => { const [u, v] = Q51.un(P, d.x, d.y), dx = u - t[0], dy = v - t[1]; setParam(S2, 'a', clamp(Math.round(Math.hypot(dx, dy) * 2) / 2, 1, 5)); setParam(S2, 'ta', Math.round(Q51.ang(dx, dy) / 5) * 5 % 360); };
      if (S.m === 'eq') { const bv = D.BV(S), t = S.bt, p0 = px(t[0], t[1]), p1 = px(t[0] + bv[0], t[1] + bv[1]), aT = px(g.at[0] + A[0], g.at[1] + A[1]);
        out.push({ id: 'btail', x: p0[0], y: p0[1], r: 18, axis: 'xy', keep: true, tip: 'اسحب ذيل B لنقله', idle: 'اسحب ✋', drag: (S2, d) => { const [u, v] = Q51.un(P, d.x, d.y); S2.bt = [clamp(Math.round(u * 2) / 2, -6.5, 6.5), clamp(Math.round(v * 2) / 2, -6.5, 6.5)]; } },
          { id: 'btip', x: p1[0], y: p1[1], r: 16, axis: 'xy', keep: true, hint: false, tip: 'اسحب رأس B', drag: (S2, d) => { const [u, v] = Q51.un(P, d.x, d.y); S2.bv = [Math.round((u - S2.bt[0]) * 2) / 2, Math.round((v - S2.bt[1]) * 2) / 2]; } },
          { id: 'atip', x: aT[0], y: aT[1], r: 16, axis: 'xy', keep: true, hint: false, tip: 'اسحب رأس A', drag: (S2, d) => setA(S2, g.at, d) }); }
      else if (S.m === 'neg') { const aT = px(g.at[0] + A[0], g.at[1] + A[1]); out.push({ id: 'atip', x: aT[0], y: aT[1], r: 16, axis: 'xy', keep: true, tip: 'اسحب رأس A', idle: 'اسحب ✋', drag: (S2, d) => setA(S2, g.at, d) });
        if (!S.join) { const p0 = px(S.nt[0], S.nt[1]); out.push({ id: 'ntail', x: p0[0], y: p0[1], r: 18, axis: 'xy', keep: true, hint: false, tip: 'اسحب −A', drag: (S2, d) => { const [u, v] = Q51.un(P, d.x, d.y); S2.nt = [clamp(Math.round(u * 2) / 2, -6, 6), clamp(Math.round(v * 2) / 2, -6, 6)]; } }); } }
      else if (S.m === 'mul') { const aT = px(A[0] / 2, 3.2 + A[1] / 2), sy = P.y + P.h - 30;
        out.push(Q41.sdrag('ks', P.x + 60, P.x + P.w - 60, sy, (S.p.k + 3) / 6, (S2, t) => setParam(S2, 'k', Math.round((t * 6 - 3) * 2) / 2), { tip: 'اسحب لتغيير k', extra: { idle: 'اسحب ✋' } }), { id: 'atip', x: aT[0], y: aT[1], r: 16, axis: 'xy', keep: true, hint: false, tip: 'اسحب رأس A', drag: (S2, d) => { const [u, v] = Q51.un(P, d.x, d.y); setA(S2, [0, 3.2], { x: P.ox + u * 2 * P.u, y: P.oy - (3.2 + (v - 3.2) * 2) * P.u }); } }); }
      if (!out.length && C.a[0]) { C.a[0].idle = 'اختر متجهين ⬇'; C.a[0].hint = true; }
      return out.concat(C.m, C.a); },
    readings(S) { return [rd('الوضع', MODES.find(q => q[0] === S.m)[1]), rd('|A|', Q51.f(S.p.a)), rd('اتجاه A', Math.round(S.p.ta) + '°'), rd('k', Q51.f(S.p.k, 1)), rd('|kA|', Q51.f(Math.abs(S.p.k * S.p.a)))]; },
    explain(S) { return Q26.ex('B يبقى مساوياً لـ A مهما نقلناه ما دام مقداره واتجاهه لم يتغيرا، و −A معاكس لـ A تماماً، و kA يطول أو يقصر أو ينقلب.', 'المتجه يتحدد بمقداره واتجاهه فقط، فنقله موازياً لنفسه لا يغيّره. وضربه بعدد يضرب مقداره، والإشارة السالبة تعكس اتجاهه.', 'سيارتان تسيران بالسرعة نفسها نحو الشمال في شارعين مختلفين لهما متجه سرعة واحد.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — جمع المتجهات بيانياً: الذيل على الرأس والإبدال والطرح (الأشكال 13a–15) =============== */
(() => {
  const MODES = [['ab', 'A + B'], ['ba', 'B + A'], ['par', 'متوازي الأضلاع'], ['sub', 'A − B'], ['aa', 'A + A']];
  const STG = [['0', '① منفصلان كالشكل 13a'], ['1', '② ذيل الثاني على رأس الأول'], ['2', '③ ارسم المحصلة R']];
  const D = { id: 'g11_v_graph', page: 10, fig: 'الأشكال 13a و 13b و 13c و 14 و 15',
    desc: 'لجمع متجهين بيانياً نرسم المتجه الأول A ثم نضع ذيل المتجه الثاني B عند رأس A، فالمستقيم الواصل من ذيل A إلى رأس B هو المتجه المحصل R = A + B. ويعطي B + A المحصلة نفسها (خاصية الإبدال). و A + A = 2A ، والطرح A − B = A + (−B).',
    tags: 'جمع المتجهات الطريقة البيانية الذيل على الرأس المتجه المحصل R=A+B خاصية الإبدال A+B=B+A متوازي الأضلاع A+A=2A الطرح A−B=A+(−B) مسطرة منقلة',
    tools: ['ورق رسم بياني', 'مسطرة', 'منقلة', 'أقلام ملونة'],
    steps: ['اضغط ① ثم ② ثم ③ لترى خطوات الرسم: B ينزلق حتى يلتصق ذيله برأس A ثم ترسم R.', 'اسحب رأسي A و B (النقطتين الحمراوين) وراقب المحصلة.', 'اختر «B + A» ثم «متوازي الأضلاع»: المحصلة نفسها (الإبدال).', 'اختر «A − B» و «A + A»، وفعّل المسطرة والمنقلة لقياس المحصلة بيانياً.'],
    concl: ['R = A + B يرسم من ذيل الأول إلى رأس الأخير.', 'A + B = B + A: جمع المتجهات إبدالي.', 'A + A = 2A باتجاه A نفسه وبضعف مقداره.', 'A − B = A + (−B).'],
    laws: ['g11_l1_cos'],
    controls: [R('a', 'مقدار A', 0, 6, 4, .5, ''), R('ta', 'اتجاه A', 0, 355, 70, 5, '°'), R('b', 'مقدار B', 0, 6, 3, .5, ''), R('tb', 'اتجاه B', 0, 355, 15, 5, '°'), TG('ruler', 'المسطرة والمنقلة', false, null, 'meter')],
    setup(S) { S.m = 'ab'; S.stg = 2; S.mv = 1; S.rv = 1; S.e = { a: S.p.a, ta: S.p.ta, b: S.p.b, tb: S.p.tb }; },
    update(S, dt) { ['a', 'b'].forEach(k => { S.e[k] = Q51.ez(S.e[k], S.p[k], dt, 9); }); ['ta', 'tb'].forEach(k => { S.e[k] = Q51.eza(S.e[k], S.p[k], dt, 9); });
      S.mv = Q51.ez(S.mv, S.stg >= 1 ? 1 : 0, dt, 3.2); S.rv = S.stg >= 2 && S.mv > .9 ? Math.min(1, S.rv + dt * 1.6) : S.stg >= 2 ? S.rv : 0; },
    V(S, e) { const s = e ? S.e : S.p, c = Q51.d2r; return { A: [s.a * Math.cos(c(s.ta)), s.a * Math.sin(c(s.ta))], B: [s.b * Math.cos(c(s.tb)), s.b * Math.sin(c(s.tb))] }; },
    chain(S, e) { const { A, B } = D.V(S, e), nB = [-B[0], -B[1]]; return { ab: [['A', A], ['B', B]], ba: [['B', B], ['A', A]], par: [['A', A], ['B', B]], sub: [['A', A], ['−B', nB]], aa: [['A', A], ['A', A]] }[S.m]; },
    geo(S) { const g = Q51.geo(S), P = { x: g.x0, y: g.y0, w: g.x1 - g.x0, h: g.y1 - g.y0 }; P.u = Math.min(P.w / 12, P.h / 13); P.ox = P.x + P.w * .42; P.oy = P.y + P.h * .62; g.P = P; g.loose = [2.6, -3.4]; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = g.P, ch = D.chain(S, 1), px = (x, y) => Q51.px(P, x, y), O = [P.ox, P.oy], col = { A: '#2563eb', B: '#16a34a', '−B': '#db2777' };
      Q51.bg(ctx, w, h); Q51.plane(ctx, P);
      const v1 = ch[0][1], v2 = ch[1][1], t2 = [g.loose[0] * (1 - S.mv) + v1[0] * S.mv, g.loose[1] * (1 - S.mv) + v1[1] * S.mv], Rv = [v1[0] + v2[0], v1[1] + v2[1]];
      const p1 = px(v1[0], v1[1]), q0 = px(t2[0], t2[1]), q1 = px(t2[0] + v2[0], t2[1] + v2[1]);
      if (S.m === 'par' && S.mv > .5) { const al = (S.mv - .5) * 1.6, b1 = px(v2[0], v2[1]); Q51.vec(ctx, O[0], O[1], b1[0], b1[1], '#16a34a', '', { w: 3, dash: [7, 5], al }); Q51.vec(ctx, b1[0], b1[1], q1[0], q1[1], '#2563eb', '', { w: 3, dash: [7, 5], al }); }
      if (S.m === 'sub') { const { B } = D.V(S, 1), b1 = px(B[0], B[1]); Q51.vec(ctx, O[0], O[1], b1[0], b1[1], '#16a34a', 'B', { w: 3, al: .55 }); }
      if (S.rv > 0) { const r1 = px(Rv[0] * S.rv, Rv[1] * S.rv); Q51.vec(ctx, O[0], O[1], r1[0], r1[1], '#dc2626', S.rv > .9 ? (S.m === 'aa' ? 'R = 2A' : 'R') : '', { w: 5.5, side: 1, off: 20, at: .55 }); }
      Q51.vec(ctx, O[0], O[1], p1[0], p1[1], col[ch[0][0]] || '#2563eb', ch[0][0], { tail: 1, side: -1 });
      Q51.vec(ctx, q0[0], q0[1], q1[0], q1[1], col[ch[1][0]] || '#16a34a', ch[1][0], { tail: 1, al: S.m === 'aa' ? .85 : 1 });
      Q41.knob(ctx, p1[0], p1[1], '#dc2626', 8); if (S.m !== 'aa') Q41.knob(ctx, q1[0], q1[1], '#dc2626', 8);
      const Rm = Math.hypot(...Rv), Rt = Q51.ang(...Rv);
      if (S.p.ruler && S.rv > .9 && Rm > .3) D.tools(ctx, P, O, Rm, Rt);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.s);
      const Rr = D.chain(S, 0), Rx = Rr[0][1][0] + Rr[1][1][0], Ry = Rr[0][1][1] + Rr[1][1][1];
      const L = [{ t: { ab: 'R = A + B', ba: 'R = B + A', par: 'A + B = B + A', sub: 'R = A + (−B) = A − B', aa: 'R = A + A = 2A' }[S.m], mono: 1, c: '#dc2626', w: 900 },
        { t: '|A| = ' + Q51.f(S.p.a) + '   θA = ' + Math.round(S.p.ta) + '°', mono: 1, c: '#2563eb' }, { t: '|B| = ' + Q51.f(S.p.b) + '   θB = ' + Math.round(S.p.tb) + '°', mono: 1, c: '#16a34a' },
        { t: '|R| = ' + Q51.f(Math.hypot(Rx, Ry)) + '   θR = ' + Q51.f(Q51.ang(Rx, Ry), 1) + '°', mono: 1, c: '#dc2626', w: 900 },
        { t: S.m === 'par' ? 'خاصية الإبدال: المحصلة قطر متوازي الأضلاع' : S.m === 'sub' ? 'نضيف سالب B إلى A' : S.m === 'aa' ? 'مقدار R ضعف مقدار A وباتجاهه' : 'R من ذيل الأول إلى رأس الثاني', c: '#334155', w: 800 }];
      Q42.card(ctx, S, L, { title: 'جمع المتجهات بيانياً', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب رأسي المتجهين، واضغط ① ② ③');
    },
    /* realistic ruler along R and a protractor at the origin */
    tools(ctx, P, O, Rm, Rt) { const a = -Q51.d2r(Rt), len = Rm * P.u;
      K.raw(ctx, () => { ctx.save(); ctx.translate(O[0], O[1]); ctx.rotate(a); ctx.translate(0, 8); const gr = ctx.createLinearGradient(0, 0, 0, 26); gr.addColorStop(0, 'rgba(254,243,199,.93)'); gr.addColorStop(1, 'rgba(253,230,138,.93)'); ctx.fillStyle = gr; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; rr(ctx, -8, 0, len + 30, 26, 3); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#78350f'; for (let k = 0; k <= Rm * 10 + 3; k++) { const x = k * P.u / 10, L = k % 10 === 0 ? 10 : k % 5 === 0 ? 7 : 4; if (x > len + 20) break; ctx.lineWidth = k % 10 ? .7 : 1.3; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, L); ctx.stroke(); }
        ctx.fillStyle = '#78350f'; ctx.font = '700 9px sans-serif'; ctx.textAlign = 'center'; for (let k = 0; k * P.u <= len + 20; k++) ctx.fillText(String(k), k * P.u, 20); ctx.restore();
        ctx.save(); ctx.fillStyle = 'rgba(219,234,254,.55)'; ctx.strokeStyle = 'rgba(30,64,175,.7)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(O[0], O[1], 66, Math.PI, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
        for (let d = 0; d <= 180; d += 5) { const r1 = d % 30 === 0 ? 52 : d % 10 === 0 ? 58 : 61, t = -Q51.d2r(d); ctx.lineWidth = d % 10 ? .6 : 1; ctx.beginPath(); ctx.moveTo(O[0] + Math.cos(t) * 66, O[1] + Math.sin(t) * 66); ctx.lineTo(O[0] + Math.cos(t) * r1, O[1] + Math.sin(t) * r1); ctx.stroke(); }
        ctx.fillStyle = '#1e3a8a'; ctx.font = '700 8px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; for (let d = 0; d <= 180; d += 30) { const t = -Q51.d2r(d); ctx.fillText(String(d), O[0] + Math.cos(t) * 44, O[1] + Math.sin(t) * 44); } ctx.restore(); });
      Q42.T(ctx, 'المسطرة: ' + Q51.f(Rm, 1) + ' وحدة', P.x + 12, P.y + P.h - 38, { s: 11.5, w: 900, c: '#fff', bg: '#92400e', a: 'left' }); Q42.T(ctx, 'المنقلة: ' + Math.round(Rt) + '°', P.x + 12, P.y + P.h - 14, { s: 11.5, w: 900, c: '#fff', bg: '#1e40af', a: 'left' }); },
    chips(S, g) { return { m: Q42.chips(S, 'm', MODES, g.h - 128, S.m, (S2, k) => { S2.m = k; S2.mv = 0; S2.rv = 0; S2.stg = 2; }, { bw: 118 }), s: Q42.chips(S, 'st', STG, g.h - 84, String(S.stg), (S2, k) => { S2.stg = +k; if (+k < 2) S2.rv = 0; }, { bw: 200 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = g.P, C = D.chips(S, g), ch = D.chain(S, 0), v1 = ch[0][1], v2 = ch[1][1], t2 = [g.loose[0] * (1 - S.mv) + v1[0] * S.mv, g.loose[1] * (1 - S.mv) + v1[1] * S.mv];
      const set = (S2, name, d, tail) => { const [u, v] = Q51.un(P, d.x, d.y), dx = u - tail[0], dy = v - tail[1], m = clamp(Math.round(Math.hypot(dx, dy) * 2) / 2, 0, 6), t = Math.round(Q51.ang(dx, dy) / 5) * 5 % 360;
        if (name === '−B') { setParam(S2, 'b', m); setParam(S2, 'tb', (t + 180) % 360); } else { setParam(S2, name === 'A' ? 'a' : 'b', m); setParam(S2, name === 'A' ? 'ta' : 'tb', t); } };
      const p1 = Q51.px(P, v1[0], v1[1]), q1 = Q51.px(P, t2[0] + v2[0], t2[1] + v2[1]), out = [{ id: 'tip1', x: p1[0], y: p1[1], r: 18, axis: 'xy', keep: true, tip: 'اسحب رأس ' + ch[0][0], idle: 'اسحب ✋', drag: (S2, d) => set(S2, ch[0][0], d, [0, 0]) }];
      if (S.m !== 'aa') out.push({ id: 'tip2', x: q1[0], y: q1[1], r: 18, axis: 'xy', keep: true, hint: false, tip: 'اسحب رأس ' + ch[1][0], drag: (S2, d) => set(S2, ch[1][0], d, t2) });
      return out.concat(C.m, C.s); },
    readings(S) { const ch = D.chain(S, 0), Rx = ch[0][1][0] + ch[1][1][0], Ry = ch[0][1][1] + ch[1][1][1]; return [rd('العملية', MODES.find(q => q[0] === S.m)[1]), rd('|A|', Q51.f(S.p.a)), rd('|B|', Q51.f(S.p.b)), rd('|R|', Q51.f(Math.hypot(Rx, Ry))), rd('اتجاه R', Q51.f(Q51.ang(Rx, Ry), 1) + '°')]; },
    record(S) { const ch = D.chain(S, 0), Rx = ch[0][1][0] + ch[1][1][0], Ry = ch[0][1][1] + ch[1][1][1]; return { m: MODES.find(q => q[0] === S.m)[1], a: S.p.a, b: S.p.b, r: +Math.hypot(Rx, Ry).toFixed(2), t: +Q51.ang(Rx, Ry).toFixed(1) }; },
    cols: [['m', 'العملية'], ['a', '|A|'], ['b', '|B|'], ['r', '|R|'], ['t', 'θR (°)']],
    explain(S) { return Q26.ex('بعد أن ينزلق ذيل المتجه الثاني إلى رأس الأول يُرسم المتجه المحصل من ذيل الأول إلى رأس الثاني، والترتيب المعاكس يعطي المحصلة نفسها.', 'المتجه يمكن نقله موازياً لنفسه دون أن يتغير، فنصل المتجهات ذيلاً برأس. ولأن المتجهات لها اتجاه فإن جمعها لا يخضع للجمع الجبري: 4 + 3 قد يعطي أي قيمة بين 1 و 7.', 'الطائرة التي تدفعها محركاتها شمالاً والريح شرقاً تتحرك باتجاه المحصلة بينهما.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — جمع ثلاثة متجهات أو أكثر: طريقة المضلع (الشكلان 16a و 16b) =============== */
(() => {
  const V0 = [['A', 180, 3, '#2563eb'], ['B', 310, 2.6, '#16a34a'], ['C', 40, 3.2, '#d97706'], ['D', 90, 2.2, '#7c3aed']];
  const ORD = [['0123', 'A + B + C + D'], ['2031', 'C + A + D + B'], ['3120', 'D + B + C + A']];
  const D = { id: 'g11_v_poly', page: 12, fig: 'الشكلان 16a و 16b',
    desc: 'لإيجاد محصلة ثلاثة متجهات أو أكثر تبدأ من نقطة التأثير نفسها نضع ذيل الثاني عند رأس الأول، ثم ذيل الثالث عند رأس الثاني وهكذا، ثم نرسم المتجه المحصل R من ذيل الأول إلى رأس الأخير. وترتيب الجمع لا يغيّر المحصلة.',
    tags: 'جمع ثلاثة متجهات أو أكثر طريقة المضلع ذيل رأس المتجه المحصل الشكل 16',
    tools: ['ورق رسم بياني', 'أسهم المتجهات', 'مسطرة'],
    steps: ['المتجهات الأربعة تبدأ من نقطة تأثير واحدة كالشكل 16a.', 'اضغط «▶ اجمع» فينزلق كل متجه بدوره حتى يلتصق ذيله برأس السابق.', 'غيّر ترتيب الجمع من الأزرار: يتغير شكل المضلع لكن المحصلة R تبقى نفسها.', 'اسحب رأس أي متجه، أو ألغِ المتجه D من اللوحة.'],
    concl: ['R = A + B + C + D من ذيل الأول إلى رأس الأخير.', 'ترتيب الجمع لا يغيّر المحصلة.', 'إذا انغلق المضلع فالمحصلة صفر.'],
    laws: [],
    controls: [TG('d4', 'المتجه الرابع D', true, null, 'vector'), TG('ghost', 'المتجهات من نقطة واحدة', true, null, 'layers')],
    setup(S) { S.v = V0.map(q => ({ n: q[0], t: q[1], m: q[2], c: q[3], et: q[1], em: q[2] })); S.ord = '0123'; S.go = 0; S.s = []; },
    update(S, dt) { S.v.forEach(v => { v.em = Q51.ez(v.em, v.m, dt, 9); v.et = Q51.eza(v.et, v.t, dt, 9); }); const n = D.list(S).length; if (S.s.length !== 4) S.s = [0, 0, 0, 0];
      for (let i = 0; i < 4; i++) { const tgt = S.go && i < n ? 1 : 0, prevDone = i === 0 || S.s[i - 1] > .92; S.s[i] = tgt && prevDone ? Math.min(1, S.s[i] + dt * 1.6) : tgt ? S.s[i] : Math.max(0, S.s[i] - dt * 3); } },
    list(S) { return S.ord.split('').map(Number).filter(i => S.p.d4 || i !== 3); },
    vv(v, e) { const t = Q51.d2r(e ? v.et : v.t), m = e ? v.em : v.m; return [m * Math.cos(t), m * Math.sin(t)]; },
    geo(S) { const g = Q51.geo(S), P = { x: g.x0, y: g.y0, w: g.x1 - g.x0, h: g.y1 - g.y0 }; P.u = Math.min(P.w / 10, P.h / 11); P.ox = P.x + P.w * .55; P.oy = P.y + P.h * .62; g.P = P; return g; },
    tails(S, e) { const L = D.list(S); let acc = [0, 0]; const T = {}; L.forEach((i, j) => { const s = e ? S.s[j] : (S.go ? 1 : 0); T[i] = [acc[0] * s, acc[1] * s]; const v = D.vv(S.v[i], e); acc = [acc[0] + v[0], acc[1] + v[1]]; }); return { T, R: acc }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = g.P, L = D.list(S), px = (x, y) => Q51.px(P, x, y), O = [P.ox, P.oy], { T, R: Rv } = D.tails(S, 1);
      Q51.bg(ctx, w, h); Q51.plane(ctx, P);
      if (S.p.ghost) L.forEach(i => { const v = D.vv(S.v[i], 1), p = px(v[0], v[1]); Q51.vec(ctx, O[0], O[1], p[0], p[1], S.v[i].c, '', { w: 2.5, al: .3, flat: 1 }); });
      const done = S.go && S.s[L.length - 1] > .98;
      if (done) { const r = px(Rv[0], Rv[1]); Q51.vec(ctx, O[0], O[1], r[0], r[1], '#dc2626', 'R', { w: 6, side: -1, off: 22 }); }
      L.forEach(i => { const v = S.v[i], vv = D.vv(v, 1), t = T[i], p0 = px(t[0], t[1]), p1 = px(t[0] + vv[0], t[1] + vv[1]); Q51.vec(ctx, p0[0], p0[1], p1[0], p1[1], v.c, v.n, { tail: 1 }); Q41.knob(ctx, p1[0], p1[1], '#dc2626', 7); });
      Q41.dot(ctx, O[0], O[1], '#0f172a', 6); Q42.T(ctx, 'نقطة التأثير', O[0] - 30, O[1] + 24, { s: 10.5, w: 800, c: '#334155', bg: 'rgba(255,255,255,.92)' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.o); Q42.drawChips(ctx, C.g);
      const Rr = D.tails(S, 0).R, nm = L.map(i => S.v[i].n).join(' + ');
      Q42.card(ctx, S, [{ t: 'R = ' + nm, mono: 1, c: '#dc2626', w: 900 }].concat(L.map(i => { const v = S.v[i]; return { t: '|' + v.n + '| = ' + Q51.f(v.m, 1) + '   θ = ' + Math.round(v.t) + '°', mono: 1, c: v.c, s: 11.5 }; }), [{ t: '|R| = ' + Q51.f(Math.hypot(...Rr)) + '   θR = ' + Q51.f(Q51.ang(...Rr), 1) + '°', mono: 1, c: '#dc2626', w: 900 }, { t: 'ترتيب الجمع لا يغيّر المحصلة', c: '#334155', w: 800 }]), { title: 'جمع أكثر من متجهين', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اضغط «▶ اجمع» ثم غيّر الترتيب');
    },
    chips(S, g) { return { o: Q42.chips(S, 'ord', ORD, g.h - 128, S.ord, (S2, k) => { S2.ord = k; S2.s = [0, 0, 0, 0]; }, { bw: 170 }), g: Q42.chips(S, 'go', [['go', '▶ اجمع'], ['back', '↺ من نقطة واحدة']], g.h - 84, S.go ? 'go' : 'back', (S2, k) => { S2.go = k === 'go' ? 1 : 0; }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = g.P, C = D.chips(S, g), { T } = D.tails(S, 0), out = [];
      D.list(S).forEach(i => { const v = S.v[i], vv = D.vv(v, 0), t = T[i], p1 = Q51.px(P, t[0] + vv[0], t[1] + vv[1]);
        out.push({ id: 'tip' + v.n, x: p1[0], y: p1[1], r: 16, axis: 'xy', keep: true, tip: 'اسحب رأس ' + v.n, idle: out.length ? undefined : 'اسحب ✋', hint: out.length ? false : undefined, drag: (S2, d) => { const tt = D.tails(S2, 0).T[i], [u, w2] = Q51.un(P, d.x, d.y), dx = u - tt[0], dy = w2 - tt[1], vv2 = S2.v[i]; vv2.m = clamp(Math.round(Math.hypot(dx, dy) * 2) / 2, .5, 4.5); vv2.t = Math.round(Q51.ang(dx, dy) / 5) * 5 % 360; } }); });
      return out.concat(C.o, C.g); },
    readings(S) { const Rr = D.tails(S, 0).R; return [rd('عدد المتجهات', D.list(S).length + ''), rd('الترتيب', ORD.find(q => q[0] === S.ord)[1]), rd('|R|', Q51.f(Math.hypot(...Rr))), rd('اتجاه R', Q51.f(Q51.ang(...Rr), 1) + '°')]; },
    explain(S) { return Q26.ex('المتجهات تنزلق واحداً بعد آخر فتكوّن مضلعاً، والمحصلة تصل نقطة البداية برأس آخر متجه، وتغيير الترتيب يغيّر شكل المضلع لا المحصلة.', 'الجمع الاتجاهي إبدالي وتجميعي، فمجموع المركبات الأفقية والشاقولية لا يعتمد على الترتيب.', 'سفينة تبحر عدة مراحل باتجاهات مختلفة: إزاحتها الكلية سهم واحد من الميناء إلى نقطة الوصول.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — تحليل المتجه إلى مركبتيه (الأشكال 17–19 + مثال 3 + مسألة 4 ص 23) =============== */
(() => {
  const CS = { ex3: ['مثال 3: A = 175 m', 'A', 25, 'm', 7, 50], p4: ['مسألة 4: F = 25 N', 'F', 5, 'N', 5, 127], free: ['جرّب بنفسك', 'R', 1, 'وحدة', 6, 35] };
  const EXL = { ex3: { q: 'متجه A مقداره 175 m ويميل بزاوية 50° عن المحور x. جد مركبتيه', lines: ['Ax = A cos θ', 'Ax = (175 m) × cos 50°', 'Ax = (175 m) × (0.643)', 'Ax = 112.53 m', 'Ay = A sin θ', 'Ay = (175 m) × sin 50°', 'Ay = (175 m) × (0.766)', 'Ay = 134 m'] },
    p4: { q: 'جد مركبتي القوة 25 N التي تميل بزاوية 127° عن المحور x علماً أن cos 37° = 0.8 و sin 37° = 0.6', lines: ['Fx = F cos 127° = −F sin 37°', 'Fx = −25 × 0.6 = −15 N', 'Fy = F sin 127° = F cos 37°', 'Fy = 25 × 0.8 = 20 N', 'المركبة الأفقية بالاتجاه السالب للمحور x'] } };
  const D = { id: 'g11_v_comp', page: 13, fig: 'الأشكال 17 و 18 و 19 + مثال 3 + مسألة 4 ص 23',
    desc: 'تحليل المتجه: نستبدل المتجه R بمركبتين متعامدتين، الأفقية Rx توازي المحور x والشاقولية Ry توازي المحور y. ولأنهما ضلعا مثلث قائم وتره R فإن Rx = R cosθ و Ry = R sinθ ، و R = √(Rx² + Ry²) و tanθ = Ry / Rx.',
    tags: 'تحليل المتجه مركبة أفقية شاقولية Rx=Rcosθ Ry=Rsinθ فيثاغورس المجاور المقابل مثال 3 175m 50 112.53 134 مسألة 4 25N 127',
    tools: ['ورق رسم بياني', 'منقلة', 'مسطرة', 'مصباحان لإسقاط ظل المتجه'],
    steps: ['اسحب رأس المتجه: ظلّه على المحور x هو المركبة الأفقية، وظلّه على المحور y هو الشاقولية.', 'لاحظ المثلث القائم: Rx الضلع المجاور و Ry الضلع المقابل للزاوية θ.', 'اختر مثال 3 أو مسألة 4 واضغط «الحل خطوة خطوة».', 'جرّب زوايا أكبر من 90°: تصبح المركبة الأفقية سالبة.'],
    concl: ['Rx = R cosθ و Ry = R sinθ.', 'R = √(Rx² + Ry²) و tanθ = Ry / Rx.', 'مثال 3: Ax = 112.53 m و Ay = 134 m.', 'مسألة 4: Fx = −15 N و Fy = 20 N.'],
    laws: ['g11_l1_comp', 'g11_l1_res'],
    controls: [R('mag', 'المقدار بمربعات الرسم', 0, 8, 7, .5, ''), R('ang', 'الزاوية θ', 0, 359, 50, 1, '°'), TG('tri', 'مثلث فيثاغورس', true, null, 'vector'), TG('lamp', 'ظل المتجه على المحورين', true, null, 'light')],
    setup(S) { S.cs = 'ex3'; S.em = S.p.mag; S.ea = S.p.ang; S.ex = 0; S.k = 0; },
    pick(S, k) { S.cs = k; setParam(S, 'mag', CS[k][4]); setParam(S, 'ang', CS[k][5]); },
    update(S, dt) { S.em = Q51.ez(S.em, S.p.mag, dt, 8); S.ea = Q51.eza(S.ea, S.p.ang, dt, 8); },
    geo(S) { const g = Q51.geo(S), P = { x: g.x0, y: g.y0, w: g.x1 - g.x0, h: g.y1 - g.y0 }; P.u = Math.min(P.w, P.h) / 18; P.ox = P.x + P.w / 2; P.oy = P.y + P.h / 2; P.num = 2; P.k = CS[S.cs][2]; g.P = P; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = g.P, c = CS[S.cs], k = c[2], t = Q51.d2r(S.ea), vx = S.em * Math.cos(t), vy = S.em * Math.sin(t), [tx, ty] = Q51.px(P, vx, vy), O = [P.ox, P.oy], L = c[1];
      Q51.bg(ctx, w, h); Q51.plane(ctx, P);
      if (S.p.lamp) K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(250,204,21,.18)'; ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.lineTo(tx, ty); ctx.lineTo(tx, O[1]); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(56,189,248,.16)'; ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.lineTo(tx, ty); ctx.lineTo(O[0], ty); ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(225,29,72,.28)'; ctx.fillRect(Math.min(O[0], tx), O[1] - 5, Math.abs(tx - O[0]), 10); ctx.fillStyle = 'rgba(2,132,199,.28)'; ctx.fillRect(O[0] - 5, Math.min(O[1], ty), 10, Math.abs(ty - O[1])); ctx.restore(); });
      Q51.dash(ctx, [[tx, ty], [tx, O[1]]], '#e11d48'); Q51.dash(ctx, [[tx, ty], [O[0], ty]], '#0284c7');
      if (S.p.tri && Math.abs(vx) > .4 && Math.abs(vy) > .4) { Q41.line(ctx, [[tx, O[1]], [tx, ty]], '#0284c7', 3.5); Q51.rmark(ctx, tx, O[1], -Math.sign(vx), 0, 0, -Math.sign(vy), 10);
        Q42.T(ctx, 'المقابل', tx + (vx > 0 ? 34 : -34), (O[1] + ty) / 2, { s: 11, w: 900, c: '#0284c7', bg: 'rgba(255,255,255,.85)' }); Q42.T(ctx, 'المجاور', (O[0] + tx) / 2, O[1] + (vy > 0 ? 34 : -34), { s: 11, w: 900, c: '#e11d48', bg: 'rgba(255,255,255,.85)' }); }
      Q51.vec(ctx, O[0], O[1], tx, O[1], '#e11d48', L + 'x', { w: 4.5, side: vy > 0 ? 1 : -1, off: 18 }); Q51.vec(ctx, O[0], O[1], O[0], ty, '#0284c7', L + 'y', { w: 4.5, side: vx > 0 ? 1 : -1, off: 20 });
      Q51.arc(ctx, O[0], O[1], 30, 0, S.ea, '#be185d', 'θ = ' + Math.round(S.ea) + '°', { lo: 22 });
      Q51.vec(ctx, O[0], O[1], tx, ty, '#7c3aed', L, { w: 5.5, side: -1, off: 20 }); Q41.knob(ctx, tx, ty, '#dc2626', 9);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q51.drawSteps(ctx, C.e);
      const m = S.p.mag * k, a = S.p.ang, cx = m * Math.cos(Q51.d2r(a)), cy = m * Math.sin(Q51.d2r(a)), u = c[3];
      if (S.ex) { const E = EXL[S.cs] || D.gen(S); Q42.steps(ctx, S, Object.assign({ title: c[0] }, E, { k: S.k }), { y: 64, x: w - 12, wd: 304 }); }
      else Q42.card(ctx, S, [{ t: L + ' = ' + Q51.f(m) + ' ' + u + '   θ = ' + Math.round(a) + '°', mono: 1, c: '#7c3aed', w: 900 }, { t: L + 'x = ' + L + ' cos θ = ' + Q51.f(m) + ' × ' + Q51.f(Math.cos(Q51.d2r(a)), 3), mono: 1, c: '#e11d48' }, { t: L + 'x = ' + Q51.f(cx) + ' ' + u, mono: 1, c: '#e11d48', w: 900 }, { t: L + 'y = ' + L + ' sin θ = ' + Q51.f(m) + ' × ' + Q51.f(Math.sin(Q51.d2r(a)), 3), mono: 1, c: '#0284c7' }, { t: L + 'y = ' + Q51.f(cy) + ' ' + u, mono: 1, c: '#0284c7', w: 900 }, { t: '√(' + L + 'x² + ' + L + 'y²) = ' + Q51.f(Math.hypot(cx, cy)) + ' ' + u, mono: 1, c: '#334155' }, { t: 'المركبة الأفقية ظل المتجه على x والشاقولية ظله على y', c: '#64748b', s: 11.5 }], { title: 'تحليل المتجه — ' + c[0], y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب رأس المتجه وراقب ظلّيه على المحورين');
    },
    gen(S) { const c = CS[S.cs], m = S.p.mag * c[2], a = Math.round(S.p.ang), L = c[1]; return { q: 'حلّل المتجه ' + L + ' = ' + Q51.f(m) + ' ' + c[3] + ' الذي يصنع ' + a + '° مع x', lines: [L + 'x = ' + L + ' cos θ = ' + Q51.f(m) + ' × cos ' + a + '°', L + 'x = ' + Q51.f(m * Math.cos(Q51.d2r(a))), L + 'y = ' + L + ' sin θ = ' + Q51.f(m) + ' × sin ' + a + '°', L + 'y = ' + Q51.f(m * Math.sin(Q51.d2r(a)))] }; },
    chips(S, g) { const n = (EXL[S.cs] || D.gen(S)).lines.length; return { c: Q42.chips(S, 'cs', Object.keys(CS).map(k => [k, CS[k][0]]), g.h - 128, S.cs, (S2, k) => { D.pick(S2, k); S2.ex = 0; }, { bw: 170 }), e: Q51.stepChips(S, 'ex', g.h - 84, g.L, S.cs === 'ex3' ? 'حل مثال 3 ص 13' : S.cs === 'p4' ? 'حل مسألة 4 ص 23' : 'الحل خطوة خطوة', S2 => { if (S2.cs !== 'free') D.pick(S2, S2.cs); }, n) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = g.P, C = D.chips(S, g), t = Q51.d2r(S.p.ang), [tx, ty] = Q51.px(P, S.p.mag * Math.cos(t), S.p.mag * Math.sin(t));
      return [{ id: 'tip', x: tx, y: ty, r: 20, axis: 'xy', keep: true, tip: 'اسحب رأس المتجه', idle: 'اسحب ✋', drag: (S2, d) => { const [u, v] = Q51.un(P, d.x, d.y); setParam(S2, 'mag', clamp(Math.round(Math.hypot(u, v) * 2) / 2, 0, 8)); setParam(S2, 'ang', Math.round(Q51.ang(u, v)) % 360); } }].concat(C.c, C.e); },
    readings(S) { const c = CS[S.cs], m = S.p.mag * c[2], a = Q51.d2r(S.p.ang); return [rd('المقدار', Q51.f(m) + ' ' + c[3]), rd('الزاوية θ', Math.round(S.p.ang) + '°'), rd('المركبة الأفقية', Q51.f(m * Math.cos(a)) + ' ' + c[3]), rd('المركبة الشاقولية', Q51.f(m * Math.sin(a)) + ' ' + c[3])]; },
    record(S) { const c = CS[S.cs], m = S.p.mag * c[2], a = Q51.d2r(S.p.ang); return { m, t: Math.round(S.p.ang), x: +(m * Math.cos(a)).toFixed(2), y: +(m * Math.sin(a)).toFixed(2) }; },
    cols: [['m', 'R'], ['t', 'θ (°)'], ['x', 'Rx'], ['y', 'Ry']],
    explain(S) { return Q26.ex('ظل المتجه على المحور x يطول كلما اقتربت الزاوية من الصفر، وظله على y يطول كلما اقتربت من 90°، وفي الربع الثاني تصبح المركبة الأفقية سالبة.', 'المتجه والمركبتان يكوّنون مثلثاً قائماً: المجاور = الوتر × cosθ والمقابل = الوتر × sinθ.', 'القوة التي تسحب بها حقيبة بزاوية تتحلل إلى جزء يحركها أفقياً وجزء يرفعها عن الأرض.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — إيجاد المحصلة بالتحليل المتعامد + قانونا جيب التمام والجيوب (الأشكال 20–22 + مثال 4) =============== */
(() => {
  const EX = { q: 'المتجه A طوله 14 cm ويصنع 60° مع x الموجب، والمتجه B طوله 20 cm ويصنع 20°. جد مقدار المحصلة واتجاهها', lines: ['Ax = 14 cm × cos 60° = 14 × 0.5 = 7 cm', 'Ay = 14 cm × sin 60° = 14 × 0.866 = 12.12 cm', 'Bx = 20 cm × cos 20° = 20 × 0.939 = 18.79 cm', 'By = 20 cm × sin 20° = 20 × 0.342 = 6.84 cm', 'Ry = Ay + By = 12.12 + 6.84 = 18.96 cm', 'Rx = Ax + Bx = 7 + 18.79 = 25.79 cm', 'R = √((25.79)² + (18.96)²)', 'R = 32 cm', 'tan θ = 18.96 / 25.79 = 0.735', 'θ = 36°'] };
  const MODES = [['comp', 'التحليل المتعامد'], ['cos', 'قانون جيب التمام'], ['sin', 'قانون الجيوب']];
  const D = { id: 'g11_v_analytic', page: 14, fig: 'الأشكال 20 و 21 و 22 + مثال 4 + فكّر ص 15',
    desc: 'لجمع متجهين أو أكثر حسابياً نحلل كل متجه إلى مركبتيه، ثم نجمع المركبات الأفقية Rx = Ax + Bx + Cx والشاقولية Ry = Ay + By + Cy ، فيكون R² = Rx² + Ry² و θ = tan⁻¹(Ry / Rx). وإذا كان بين المتجهين زاوية غير قائمة نستعمل أيضاً قانون جيب التمام R² = A² + B² − 2AB cosθ أو قانون الجيوب.',
    tags: 'التحليل المتعامد مجموع المركبات Rx Ry tan-1 قانون جيب التمام cosine قانون الجيوب sine مثال 4 14cm 20cm 32cm 36',
    tools: ['ورق رسم بياني', 'آلة حاسبة علمية'],
    steps: ['اسحب رأسي A و B: تظهر مركبات كل متجه على المحورين بلونه، ومجموعها يكوّن Rx و Ry.', 'فعّل «متجه ثالث C» من اللوحة لجمع ثلاثة متجهات.', 'اضغط «مثال 4 ص 16» ثم «الخطوة التالية».', 'اختر قانون جيب التمام أو قانون الجيوب: النتيجة نفسها.'],
    concl: ['Rx = Ax + Bx + … و Ry = Ay + By + …', 'R² = Rx² + Ry² و θ = tan⁻¹(Ry / Rx).', 'مثال 4: R = 32 cm باتجاه 36°.', 'قانون جيب التمام وقانون الجيوب يعطيان المحصلة نفسها.'],
    laws: ['g11_l1_res', 'g11_l1_cos', 'g11_l1_sin'],
    controls: [R('a', 'مقدار A', 0, 25, 14, 1, 'cm'), R('ta', 'اتجاه A', 0, 359, 60, 1, '°'), R('b', 'مقدار B', 0, 25, 20, 1, 'cm'), R('tb', 'اتجاه B', 0, 359, 20, 1, '°'), TG('c3', 'متجه ثالث C', false, null, 'vector')],
    setup(S) { S.m = 'comp'; S.c = [10, 150]; S.e = { a: S.p.a, ta: S.p.ta, b: S.p.b, tb: S.p.tb, c: 0, tc: 150 }; S.ex = 0; S.k = 0; },
    update(S, dt) { ['a', 'b'].forEach(k => { S.e[k] = Q51.ez(S.e[k], S.p[k], dt, 8); }); ['ta', 'tb'].forEach(k => { S.e[k] = Q51.eza(S.e[k], S.p[k], dt, 8); }); S.e.c = Q51.ez(S.e.c, S.p.c3 ? S.c[0] : 0, dt, 8); S.e.tc = Q51.eza(S.e.tc, S.c[1], dt, 8); },
    vecs(S, e) { const s = e ? S.e : { a: S.p.a, ta: S.p.ta, b: S.p.b, tb: S.p.tb, c: S.p.c3 ? S.c[0] : 0, tc: S.c[1] }, f = (m, t) => [m * Math.cos(Q51.d2r(t)), m * Math.sin(Q51.d2r(t))];
      const L = [['A', f(s.a, s.ta), '#2563eb'], ['B', f(s.b, s.tb), '#16a34a']]; if (s.c > .05) L.push(['C', f(s.c, s.tc), '#d97706']); return L; },
    geo(S) { const g = Q51.geo(S), P = { x: g.x0, y: g.y0, w: g.x1 - g.x0, h: g.y1 - g.y0 }; P.u = Math.min(P.w / 36, P.h / 40); P.ox = P.x + P.w * .26; P.oy = P.y + P.h * .7; P.st = 2; P.num = 10; g.P = P; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = g.P, V = D.vecs(S, 1), px = (x, y) => Q51.px(P, x, y), O = [P.ox, P.oy]; Q51.bg(ctx, w, h); Q51.plane(ctx, P);
      let acc = [0, 0]; const heads = [];
      V.forEach(([n, v, c], i) => { const h0 = acc.slice(); acc = [acc[0] + v[0], acc[1] + v[1]]; heads.push([n, h0, acc.slice(), c]); });
      const Rv = acc, Rp = px(Rv[0], Rv[1]);
      if (S.m === 'comp') { heads.forEach(([n, h0, h1, c], i) => { const a0 = px(h0[0], h0[1]), a1 = px(h1[0], h1[1]); Q51.dash(ctx, [[a1[0], a1[1]], [a1[0], O[1]]], 'rgba(100,116,139,.6)', 1.2); Q51.dash(ctx, [[a1[0], a1[1]], [O[0], a1[1]]], 'rgba(100,116,139,.6)', 1.2);
          Q51.vec(ctx, a0[0], O[1] + 10 + i * 9, a1[0], O[1] + 10 + i * 9, c, '', { w: 4, flat: 1, hs: 9 }); Q51.vec(ctx, O[0] - 10 - i * 9, a0[1], O[0] - 10 - i * 9, a1[1], c, '', { w: 4, flat: 1, hs: 9 }); });
        const yb = O[1] + 22 + V.length * 9; Q51.vec(ctx, O[0], yb, Rp[0], yb, '#dc2626', 'Rx', { w: 3.5, side: 1, off: 14, hs: 10 }); const xb = O[0] - 22 - V.length * 9; Q51.vec(ctx, xb, O[1], xb, Rp[1], '#dc2626', 'Ry', { w: 3.5, side: 1, off: 18, hs: 10 }); }
      Q51.vec(ctx, O[0], O[1], Rp[0], Rp[1], '#dc2626', 'R', { w: 5.5, side: 1, off: 22 });
      heads.forEach(([n, h0, h1, c]) => { const a0 = px(h0[0], h0[1]), a1 = px(h1[0], h1[1]); Q51.vec(ctx, a0[0], a0[1], a1[0], a1[1], c, n, { tail: 1, side: -1 }); Q41.knob(ctx, a1[0], a1[1], '#dc2626', 7); });
      const Rt = Q51.ang(...Rv); Q51.arc(ctx, O[0], O[1], 40, 0, Rt, '#dc2626', 'θ', { lo: 12 });
      const Vn = D.vecs(S, 0), Rx = Vn.reduce((s, q) => s + q[1][0], 0), Ry = Vn.reduce((s, q) => s + q[1][1], 0), Rm = Math.hypot(Rx, Ry), A = S.p.a, B = S.p.b, gam = 180 - Math.abs(((S.p.tb - S.p.ta) % 360 + 540) % 360 - 180);
      if (S.m !== 'comp' && !S.p.c3) { const j = px(heads[0][2][0], heads[0][2][1]); Q51.arc(ctx, j[0], j[1], 26, Q51.nd(S.p.ta + 180), Q51.nd(S.p.ta + 180) + (((S.p.tb - S.p.ta - 180) % 360 + 540) % 360 - 180), '#7c3aed', 'γ', { lo: 12 }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q51.drawSteps(ctx, C.e);
      if (S.ex) { Q42.steps(ctx, S, Object.assign({ title: 'مثال 4 ص 16' }, EX, { k: S.k }), { y: 64, x: w - 12, wd: 316 }); }
      else { let L; const f = Q51.f;
        if (S.m === 'comp') L = Vn.map(([n, v, c]) => ({ t: n + 'x = ' + f(v[0]) + '   ' + n + 'y = ' + f(v[1]), mono: 1, c, w: 800 })).concat([{ t: 'Rx = ' + Vn.map(q => q[0] + 'x').join(' + ') + ' = ' + f(Rx) + ' cm', mono: 1, c: '#dc2626' }, { t: 'Ry = ' + Vn.map(q => q[0] + 'y').join(' + ') + ' = ' + f(Ry) + ' cm', mono: 1, c: '#dc2626' }, { t: 'R = √(Rx² + Ry²) = ' + f(Rm) + ' cm', mono: 1, c: '#dc2626', w: 900 }, { t: 'θ = tan⁻¹(Ry / Rx) = ' + f(Q51.ang(Rx, Ry), 1) + '°', mono: 1, c: '#dc2626', w: 900 }]);
        else if (S.p.c3) L = [{ t: 'القانونان لمتجهين فقط: ألغِ المتجه C', c: '#b45309', w: 900 }];
        else if (S.m === 'cos') L = [{ t: 'R² = A² + B² − 2AB cos γ', mono: 1, c: '#7c3aed', w: 900 }, { t: 'الزاوية المقابلة لـ R: γ = ' + f(gam, 1) + '°', c: '#334155' }, { t: 'R² = ' + f(A) + '² + ' + f(B) + '² − 2×' + f(A) + '×' + f(B) + '×' + f(Math.cos(Q51.d2r(gam)), 3), mono: 1 }, { t: 'R = ' + f(Math.sqrt(Math.max(0, A * A + B * B - 2 * A * B * Math.cos(Q51.d2r(gam))))) + ' cm', mono: 1, c: '#dc2626', w: 900 }, { t: 'بالتحليل المتعامد: R = ' + f(Rm) + ' cm', c: '#16a34a', w: 800 }, { t: 'إذا كانت γ = 90° يصبح فيثاغورس', c: '#64748b' }];
        else { const al = Rm > 1e-6 ? Q51.r2d(Math.asin(clamp(A * Math.sin(Q51.d2r(gam)) / Rm, -1, 1))) : 0, be = 180 - gam - al; L = [{ t: 'R / sin γ = A / sin α = B / sin β', mono: 1, c: '#7c3aed', w: 900 }, { t: 'γ = ' + f(gam, 1) + '°   α = ' + f(al, 1) + '°   β = ' + f(be, 1) + '°', mono: 1 }, { t: 'R / sin γ = ' + f(Rm / Math.sin(Q51.d2r(gam || 1e-6)), 2), mono: 1, c: '#dc2626' }, { t: 'A / sin α = ' + f(A / Math.sin(Q51.d2r(al || 1e-6)), 2), mono: 1, c: '#2563eb' }, { t: 'B / sin β = ' + f(B / Math.sin(Q51.d2r(be || 1e-6)), 2), mono: 1, c: '#16a34a' }, { t: 'النسب الثلاث متساوية', c: '#334155', w: 800 }]; }
        Q42.card(ctx, S, L, { title: MODES.find(q => q[0] === S.m)[1], y: 64, wd: 316 }); }
      Q42.banner(ctx, w, 'اسحب رأسي A و B وراقب جمع المركبات');
    },
    chips(S, g) { return { m: Q42.chips(S, 'm', MODES, g.h - 128, S.m, (S2, k) => { S2.m = k; S2.ex = 0; }, { bw: 170 }), e: Q51.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 4 ص 16', S2 => { setParam(S2, 'a', 14); setParam(S2, 'ta', 60); setParam(S2, 'b', 20); setParam(S2, 'tb', 20); setParam(S2, 'c3', false); S2.m = 'comp'; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = g.P, C = D.chips(S, g), V = D.vecs(S, 0), out = []; let acc = [0, 0];
      V.forEach(([n, v], i) => { const tail = acc.slice(); acc = [acc[0] + v[0], acc[1] + v[1]]; const p = Q51.px(P, acc[0], acc[1]);
        out.push({ id: 'tip' + n, x: p[0], y: p[1], r: 16, axis: 'xy', keep: true, tip: 'اسحب رأس ' + n, idle: i ? undefined : 'اسحب ✋', hint: i ? false : undefined, drag: (S2, d) => { const [u, w2] = Q51.un(P, d.x, d.y), dx = u - tail[0], dy = w2 - tail[1], m = clamp(Math.round(Math.hypot(dx, dy)), 0, 25), t = Math.round(Q51.ang(dx, dy)) % 360;
          if (n === 'C') S2.c = [Math.max(1, m), t]; else { setParam(S2, n === 'A' ? 'a' : 'b', m); setParam(S2, n === 'A' ? 'ta' : 'tb', t); } } }); });
      return out.concat(C.m, C.e); },
    readings(S) { const V = D.vecs(S, 0), Rx = V.reduce((s, q) => s + q[1][0], 0), Ry = V.reduce((s, q) => s + q[1][1], 0); return [rd('Rx', Q51.f(Rx) + ' cm'), rd('Ry', Q51.f(Ry) + ' cm'), rd('|R|', Q51.f(Math.hypot(Rx, Ry)) + ' cm'), rd('اتجاه R', Q51.f(Q51.ang(Rx, Ry), 1) + '°')]; },
    record(S) { const V = D.vecs(S, 0), Rx = V.reduce((s, q) => s + q[1][0], 0), Ry = V.reduce((s, q) => s + q[1][1], 0); return { a: S.p.a, b: S.p.b, x: +Rx.toFixed(2), y: +Ry.toFixed(2), r: +Math.hypot(Rx, Ry).toFixed(2) }; },
    cols: [['a', '|A| cm'], ['b', '|B| cm'], ['x', 'Rx'], ['y', 'Ry'], ['r', '|R|']],
    explain(S) { return Q26.ex('مركبات المتجهات الأفقية تتراصف على المحور x ومركباتها الشاقولية على المحور y، ومجموع كل صف يعطي مركبة المحصلة.', 'المركبات على المحور نفسه تقع على خط واحد فتُجمع جمعاً جبرياً، ثم يعطي فيثاغورس مقدار المحصلة لأن Rx و Ry متعامدتان.', 'المهندسون يحسبون محصلة القوى على الجسور بتحليل كل قوة إلى مركبتين أفقية وشاقولية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E3 — تطبيق: قارب يعبر نهراً (جمع متجهي السرعة) =============== */
(() => {
  const WID = 40; // river width (m)
  const D = { id: 'g11_v_river', page: 14, fig: 'تطبيق على جمع المتجهات',
    desc: 'قارب سرعته بالنسبة للماء vb ومقدمته باتجاه معين، وماء النهر يجري بسرعة vw. السرعة الفعلية للقارب هي محصلة المتجهين v = vb + vw ، ونجدها بالتحليل المتعامد. المركبة العمودية على الضفة تحدد زمن العبور، والمركبة الموازية تحدد مقدار الانجراف.',
    tags: 'قارب نهر سرعة التيار محصلة السرعتين جمع المتجهات زمن العبور الانجراف تطبيق',
    tools: ['قارب', 'نهر عرضه 40 m', 'ساعة توقيت'],
    steps: ['اضغط «▶ أبحر»: يتحرك القارب باتجاه المحصلة لا باتجاه مقدمته.', 'غيّر سرعة التيار من اللوحة أو اسحب النقطة الصفراء أمام القارب لتغيير اتجاه مقدمته وسرعته.', 'اختر «المقدمة عكس التيار قليلاً» ليصل القارب إلى النقطة المقابلة تماماً.', 'قارن زمن العبور والانجراف في الحالتين.'],
    concl: ['السرعة الفعلية v = vb + vw محصلة متجهين.', 'زمن العبور = عرض النهر ÷ المركبة العمودية على الضفة.', 'لكي يعبر القارب مقابلاً تماماً توجَّه مقدمته عكس التيار بحيث تلغي مركبته الأفقية سرعة الماء.'],
    laws: ['g11_l1_res'],
    controls: [R('vb', 'سرعة القارب بالنسبة للماء', 1, 6, 4, .5, 'm/s'), R('vw', 'سرعة التيار', 0, 4, 3, .5, 'm/s'), R('hd', 'اتجاه مقدمة القارب', 30, 150, 90, 5, '°'), TG('tri', 'مثلث السرعات', true, null, 'vector')],
    setup(S) { S.bx = 0; S.by = 0; S.run = 0; S.trail = []; S.clk = 0; S.eh = S.p.hd; S.evb = S.p.vb; S.evw = S.p.vw; S.done = 0; },
    vel(S, e) { const t = Q51.d2r(e ? S.eh : S.p.hd), vb = e ? S.evb : S.p.vb, vw = e ? S.evw : S.p.vw; return [vb * Math.cos(t) + vw, vb * Math.sin(t)]; },
    update(S, dt) { S.clk += dt; S.eh = Q51.ez(S.eh, S.p.hd, dt, 8); S.evb = Q51.ez(S.evb, S.p.vb, dt, 8); S.evw = Q51.ez(S.evw, S.p.vw, dt, 8); if (!S.run || !S.W) return; const v = D.vel(S), k = 2.2, g = D.geo(S); S.bx += v[0] * dt * k; S.by += v[1] * dt * k;
      const lt = S.trail[S.trail.length - 1]; if (!lt || Math.hypot(S.bx - lt[0], S.by - lt[1]) > .8) S.trail.push([S.bx, S.by]); if (S.by >= WID) { S.by = WID; S.run = 0; S.done = 1; } const sx = D.sp(g, S.bx, S.by)[0]; if (sx > g.w - 40 || sx < g.x0 + 10) S.run = 0; },
    geo(S) { const g = Q51.geo(S), ry0 = 270, ry1 = g.y1 - 28; return Object.assign(g, { ry0, ry1, m: (ry1 - ry0) / WID, x0b: g.x0 + 90, rx1: g.w - 14, sc: 16, dg: [g.x0 + 170, 210], ds: 21 }); },
    sp(g, x, y) { return [g.x0b + x * g.m, g.ry1 - y * g.m]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), v = D.vel(S, 1), X0 = g.x0, X1 = g.rx1; Q51.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.save(); rr(ctx, X0, g.ry0 - 30, X1 - X0, g.y1 - g.ry0 + 30, 12); ctx.clip(); const gr = ctx.createLinearGradient(0, g.ry0 - 30, 0, g.ry0); gr.addColorStop(0, '#86efac'); gr.addColorStop(1, '#4ade80'); ctx.fillStyle = gr; ctx.fillRect(X0, g.ry0 - 30, X1 - X0, 30); ctx.fillStyle = '#4ade80'; ctx.fillRect(X0, g.ry1, X1 - X0, g.y1 - g.ry1);
        const wg = ctx.createLinearGradient(0, g.ry0, 0, g.ry1); wg.addColorStop(0, '#38bdf8'); wg.addColorStop(.5, '#0ea5e9'); wg.addColorStop(1, '#38bdf8'); ctx.fillStyle = wg; ctx.fillRect(X0, g.ry0, X1 - X0, g.ry1 - g.ry0);
        ctx.fillStyle = '#a16207'; ctx.fillRect(X0, g.ry0 - 4, X1 - X0, 4); ctx.fillRect(X0, g.ry1, X1 - X0, 4);
        ctx.beginPath(); ctx.rect(X0, g.ry0, X1 - X0, g.ry1 - g.ry0); ctx.clip(); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2; ctx.lineCap = 'round';
        for (let i = 0; i < 70; i++) { const yy = g.ry0 + 8 + ((i * 53) % 97) / 97 * (g.ry1 - g.ry0 - 16), prof = 1 - Math.pow((yy - (g.ry0 + g.ry1) / 2) / ((g.ry1 - g.ry0) / 2), 2) * .5, span = X1 - X0 + 60, xx = X0 - 30 + (((i * 97) % 389) / 389 * span + S.clk * S.evw * g.m * 2.2 * prof) % span; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + 10 + S.evw * 4, yy); ctx.stroke(); }
        ctx.restore(); });
      Q42.T(ctx, 'الضفة المقابلة', X0 + 60, g.ry0 - 16, { s: 11.5, w: 900, c: '#14532d' }); Q42.T(ctx, 'عرض النهر 40 m', X1 - 70, (g.ry0 + g.ry1) / 2, { s: 11, w: 900, c: '#fff', bg: 'rgba(3,105,161,.8)' });
      if (S.evw > .05) Q51.vec(ctx, X1 - 120, g.ry1 - 22, X1 - 120 + S.evw * 18, g.ry1 - 22, '#e0f2fe', '', { w: 3, flat: 1 }), Q42.T(ctx, 'التيار', X1 - 150, g.ry1 - 22, { s: 10.5, w: 900, c: '#fff' });
      const tgt = D.sp(g, 0, WID); Q41.line(ctx, [D.sp(g, 0, 0), tgt], 'rgba(255,255,255,.7)', 1.5, [5, 5]); Q41.dot(ctx, tgt[0], tgt[1] - 6, '#facc15', 6);
      if (S.trail.length > 1) Q41.line(ctx, S.trail.map(p => D.sp(g, p[0], p[1])).concat([D.sp(g, S.bx, S.by)]), 'rgba(255,255,255,.9)', 2.5, [3, 4]);
      const [bx, by] = D.sp(g, S.bx, S.by), hd = Q51.d2r(S.eh), sc = g.sc;
      Q51.vec(ctx, bx, by, bx + v[0] * sc * 1.6, by - v[1] * sc * 1.6, '#dc2626', '', { w: 4 });
      K.raw(ctx, () => { ctx.save(); ctx.translate(bx, by); ctx.rotate(-hd); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const gr = ctx.createLinearGradient(0, -12, 0, 12); gr.addColorStop(0, '#fb923c'); gr.addColorStop(.5, '#ea580c'); gr.addColorStop(1, '#9a3412'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(26, 0); ctx.quadraticCurveTo(14, -12, -18, -11); ctx.lineTo(-20, 11); ctx.quadraticCurveTo(14, 12, 26, 0); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.fillStyle = '#fef3c7'; ctx.beginPath(); ctx.moveTo(18, 0); ctx.quadraticCurveTo(10, -7, -13, -7); ctx.lineTo(-14, 7); ctx.quadraticCurveTo(10, 7, 18, 0); ctx.fill(); ctx.fillStyle = '#7c2d12'; ctx.fillRect(-6, -7, 4, 14); ctx.restore(); });
      const hx = bx + Math.cos(hd) * S.evb * sc * 1.6, hy = by - Math.sin(hd) * S.evb * sc * 1.6; Q41.line(ctx, [[bx + Math.cos(hd) * 28, by - Math.sin(hd) * 28], [hx, hy]], 'rgba(30,58,138,.7)', 2, [4, 3]); Q41.knob(ctx, hx, hy, '#facc15', 9);
      if (S.p.tri) { const o = g.dg, s = g.ds, p1 = [o[0] + Math.cos(hd) * S.evb * s, o[1] - Math.sin(hd) * S.evb * s], p2 = [p1[0] + S.evw * s, p1[1]], pr = [o[0] + v[0] * s, o[1] - v[1] * s];
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.88)'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, g.x0, g.y0 + 4, g.x1 - g.x0, 170, 12); ctx.fill(); ctx.stroke(); }); Q42.T(ctx, 'مثلث السرعات', g.x0 + 60, g.y0 + 22, { s: 12, w: 900, c: '#0f766e' });
        Q51.vec(ctx, o[0], o[1], p1[0], p1[1], '#1e3a8a', 'vb', { w: 4.5, side: -1, tail: 1 }); if (S.evw > .05) Q51.vec(ctx, p1[0], p1[1], p2[0], p2[1], '#0891b2', 'vw', { w: 4.5, side: -1 }); Q51.vec(ctx, o[0], o[1], pr[0], pr[1], '#dc2626', 'v', { w: 5, side: 1, at: .6 }); Q51.arc(ctx, o[0], o[1], 26, 0, Q51.ang(...v), '#dc2626', Q51.f(Q51.ang(...v), 0) + '°', { lo: 16 }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.h);
      const vr = D.vel(S), vm = Math.hypot(...vr), tt = vr[1] > 0 ? WID / vr[1] : Infinity, dr = vr[0] * tt;
      Q42.card(ctx, S, [{ t: 'v = vb + vw', mono: 1, c: '#dc2626', w: 900 }, { t: 'vx = vb cos θ + vw = ' + Q51.f(vr[0]) + ' m/s', mono: 1 }, { t: 'vy = vb sin θ = ' + Q51.f(vr[1]) + ' m/s', mono: 1 }, { t: '|v| = √(vx² + vy²) = ' + Q51.f(vm) + ' m/s', mono: 1, c: '#dc2626', w: 900 }, { t: 't = 40 ÷ vy = ' + Q51.f(tt, 1) + ' s', mono: 1, c: '#0f766e', w: 800 }, { t: 'الانجراف مع التيار = ' + Q51.f(dr, 1) + ' m', c: Math.abs(dr) < .5 ? '#16a34a' : '#b45309', w: 800 }].concat(S.done ? [{ t: 'وصل القارب بعد انجراف ' + Q51.f(S.bx, 1) + ' m', c: '#7c3aed', w: 900 }] : []), { title: 'قارب يعبر نهراً', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اضغط «▶ أبحر»، واسحب النقطة الصفراء لتوجيه المقدمة');
    },
    reset(S2) { S2.bx = 0; S2.by = 0; S2.trail = []; S2.done = 0; },
    chips(S, g) { return { a: Q42.chips(S, 'run', [['go', '▶ أبحر'], ['re', '↺ إلى الضفة']], g.h - 84, S.run ? 'go' : '', (S2, k) => { if (k === 'go') { if (S2.done || S2.by > 0) D.reset(S2); S2.run = 1; } else { S2.run = 0; D.reset(S2); } }, { bw: 150 }),
      h: Q42.chips(S, 'hd', [['90', 'المقدمة عمودية على الضفة'], ['up', 'المقدمة عكس التيار قليلاً']], g.h - 128, '', (S2, k) => { const a = k === '90' ? 90 : Math.min(150, Math.round(Q51.r2d(Math.acos(clamp(-S2.p.vw / S2.p.vb, -1, 1))) / 5) * 5); setParam(S2, 'hd', a); S2.run = 0; D.reset(S2); }, { bw: 220 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), [bx, by] = D.sp(g, S.bx, S.by), hd = Q51.d2r(S.p.hd), sc = g.sc * 1.6;
      return [{ id: 'head', x: bx + Math.cos(hd) * S.p.vb * sc, y: by - Math.sin(hd) * S.p.vb * sc, r: 18, axis: 'xy', keep: true, tip: 'اسحب لتوجيه مقدمة القارب', idle: 'اسحب ✋', drag: (S2, d) => { const dx = d.x - bx, dy = by - d.y; setParam(S2, 'hd', clamp(Math.round(Q51.ang(dx, dy) / 5) * 5, 30, 150)); setParam(S2, 'vb', clamp(Math.round(Math.hypot(dx, dy) / sc * 2) / 2, 1, 6)); } }].concat(C.a, C.h); },
    readings(S) { const v = D.vel(S); return [rd('السرعة الفعلية', Q51.f(Math.hypot(...v)) + ' m/s'), rd('اتجاهها', Q51.f(Q51.ang(...v), 1) + '°'), rd('زمن العبور', v[1] > 0 ? Q51.f(WID / v[1], 1) + ' s' : '∞'), rd('الانجراف', v[1] > 0 ? Q51.f(v[0] * WID / v[1], 1) + ' m' : '∞')]; },
    explain(S) { return Q26.ex('القارب لا يتحرك باتجاه مقدمته، بل ينجرف مع التيار ويسير على خط المحصلة الحمراء.', 'سرعة القارب الفعلية = سرعته بالنسبة للماء + سرعة الماء، وهما متجهان يُجمعان بالتحليل المتعامد. الزمن يعتمد فقط على المركبة العمودية على الضفة.', 'الطيار يوجّه مقدمة الطائرة بزاوية نحو الريح ليبقى على خط سيره، والسباح يميل عكس التيار ليعبر مقابلاً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — الضرب القياسي (النقطي) والشغل (الشكلان 23 و 24 + مثال 5) =============== */
(() => {
  const EX = { q: 'أثرت قوة مقدارها 40 N باتجاه 37° فوق الأفق في جسم فحركته إزاحة 10 m بالاتجاه الأفقي. احسب الشغل', lines: ['W = F · x', 'W = |F| |x| cos θ', 'W = 40 × 10 × cos 37°', 'W = 40 × 10 × 4/5', 'W = 320 Joule'] };
  const D = { id: 'g11_v_dot', page: 17, fig: 'الشكلان 23 و 24 + الشكل 26 ومثال 5',
    desc: 'الضرب القياسي (النقطي) لمتجهين: A · B = |A| |B| cosθ ، حيث θ الزاوية المحصورة بينهما من 0 إلى 180°. وناتجه كمية قياسية. ويمثل B cosθ مسقط B على اتجاه A (مركبته باتجاه A). ومن أمثلته الشغل W = F · x = F x cosθ.',
    tags: 'الضرب القياسي النقطي dot product A·B=ABcosθ مسقط Bcosθ الشغل W=F·x جول مثال 5 40N 37 10m 320J',
    tools: ['صندوق خشبي', 'حبل', 'ميزان نابضي لقياس القوة', 'شريط قياس'],
    steps: ['اسحب الكرة الصفراء (يد الحبل) أو رأس F في المخطط لتغيير الزاوية θ.', 'المصباح فوق المخطط يُسقط ظل F على اتجاه الإزاحة: طول الظل = F cosθ.', 'اضغط «▶ اسحب الصندوق» ليتحرك مسافة x ويُحسب الشغل.', 'اضغط «مثال 5 ص 19» للحل خطوة خطوة. جرّب θ = 90° و θ > 90°.'],
    concl: ['A · B = |A| |B| cosθ وناتجه كمية قياسية.', 'B cosθ مسقط B على اتجاه A.', 'مثال 5: W = 40 × 10 × 4/5 = 320 J.', 'عندما θ = 90° يكون A · B = 0 ، وعندما θ > 90° يكون سالباً.'],
    laws: ['g11_l1_dot'],
    controls: [R('F', 'القوة F', 0, 60, 40, 1, 'N'), R('th', 'الزاوية θ', 0, 180, 37, 1, '°'), R('x', 'الإزاحة x', 1, 12, 10, 1, 'm')],
    setup(S) { S.eF = S.p.F; S.eth = S.p.th; S.ex_ = S.p.x; S.d = 0; S.run = 0; S.ex = 0; S.k = 0; },
    update(S, dt) { S.eF = Q51.ez(S.eF, S.p.F, dt, 8); S.eth = Q51.ez(S.eth, S.p.th, dt, 8); S.ex_ = Q51.ez(S.ex_, S.p.x, dt, 8); if (S.run) { S.d = Math.min(S.p.x, S.d + dt * 2.5); if (S.d >= S.p.x) S.run = 0; } },
    geo(S) { const g = Q51.geo(S); g.O = [g.x0 + 40, 238]; g.pm = 24; g.pn = 3.4; g.fy = g.y1 - 84; g.sx0 = g.x0 + 50; g.sm = (g.w - 14 - 150 - g.sx0) / 12; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), O = g.O, t = Q51.d2r(S.eth), F = S.eF, X = S.ex_, Ft = [O[0] + Math.cos(t) * F * g.pn, O[1] - Math.sin(t) * F * g.pn], Xt = [O[0] + X * g.pm, O[1]], pr = O[0] + Math.cos(t) * F * g.pn;
      Q51.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.75)'; rr(ctx, g.x0, g.y0, g.x1 - g.x0, 236, 12); ctx.fill(); });
      // lamp + light cone + shadow (projection)
      K.raw(ctx, () => { const lx = Ft[0], ly = g.y0 + 22; ctx.fillStyle = '#334155'; rr(ctx, lx - 16, ly - 12, 32, 14, 4); ctx.fill(); const gl = ctx.createRadialGradient(lx, ly + 4, 2, lx, ly + 4, 14); gl.addColorStop(0, '#fffbeb'); gl.addColorStop(1, '#facc15'); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(lx, ly + 5, 9, 0, Math.PI); ctx.fill();
        ctx.fillStyle = 'rgba(253,224,71,.13)'; ctx.beginPath(); ctx.moveTo(lx - 10, ly + 6); ctx.lineTo(Math.min(O[0], pr) - 20, O[1]); ctx.lineTo(Math.max(O[0], pr) + 20, O[1]); ctx.lineTo(lx + 10, ly + 6); ctx.fill();
        ctx.fillStyle = 'rgba(15,23,42,.35)'; ctx.fillRect(Math.min(O[0], pr), O[1] + 3, Math.abs(pr - O[0]), 7); });
      Q51.dash(ctx, [Ft, [pr, O[1]]], '#db2777', 1.6);
      Q51.vec(ctx, O[0], O[1], Xt[0], Xt[1], '#2563eb', 'x', { w: 4.5, side: 1, at: .8 });
      Q51.vec(ctx, O[0], O[1], Ft[0], Ft[1], '#dc2626', 'F', { w: 4.5, side: -1 }); Q41.knob(ctx, Ft[0], Ft[1], '#dc2626', 8);
      Q51.arc(ctx, O[0], O[1], 34, 0, S.eth, '#7c3aed', 'θ', { lo: 12 });
      Q42.T(ctx, 'F cos θ = ' + Q51.f(S.p.F * Math.cos(Q51.d2r(S.p.th)), 1) + ' N', (O[0] + pr) / 2, O[1] + 26, { s: 11.5, w: 900, c: '#fff', bg: '#334155' });
      // floor + box + rope scene
      const fy = g.fy, bx = g.sx0 + S.d * g.sm, bw = 74, bh = 54, ax = bx + bw, ay = fy - bh * .6, rl = 120, hx = ax + Math.cos(t) * rl, hy = ay - Math.sin(t) * rl;
      K.raw(ctx, () => { const fg = ctx.createLinearGradient(0, fy, 0, fy + 26); fg.addColorStop(0, '#a8a29e'); fg.addColorStop(1, '#78716c'); ctx.fillStyle = fg; ctx.fillRect(g.x0, fy, g.w - 14 - g.x0, 26); ctx.strokeStyle = 'rgba(41,37,36,.35)'; for (let x = g.x0; x < g.w - 14; x += 28) { ctx.beginPath(); ctx.moveTo(x, fy + 4); ctx.lineTo(x + 14, fy + 22); ctx.stroke(); } });
      Q42.box(ctx, bx, fy - bh, bw, bh, 12, '#b45309');
      K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(hx, hy); ctx.stroke(); ctx.strokeStyle = 'rgba(254,243,199,.8)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(hx, hy); ctx.stroke(); ctx.setLineDash([]); });
      Q41.knob(ctx, hx, hy, '#facc15', 11); Q51.vec(ctx, ax, ay, ax + Math.cos(t) * F * 1.6, ay - Math.sin(t) * F * 1.6, '#dc2626', '', { w: 3.5 });
      Q41.dot(ctx, g.sx0 + bw / 2, fy + 34, '#2563eb', 4); Q51.vec(ctx, g.sx0 + bw / 2, fy + 34, g.sx0 + bw / 2 + S.p.x * g.sm, fy + 34, 'rgba(37,99,235,.45)', '', { w: 3, flat: 1 }); Q42.T(ctx, 'x = ' + S.p.x + ' m', g.sx0 + bw / 2 + S.p.x * g.sm / 2, fy + 50, { s: 11, w: 900, c: '#1d4ed8' });
      const Wd = S.p.F * Math.cos(Q51.d2r(S.p.th)) * S.d;
      Q42.T(ctx, 'الشغل المنجز حتى الآن = ' + Q51.f(Wd, 1) + ' J', g.x0 + 10, fy - 92, { s: 12, w: 900, c: '#fff', bg: '#7c3aed', a: 'left' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.r); Q51.drawSteps(ctx, C.e);
      const W = S.p.F * S.p.x * Math.cos(Q51.d2r(S.p.th));
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: 'مثال 5 ص 19' }, EX, { k: S.k }), { y: 64, x: w - 12, wd: 304 });
      else Q42.card(ctx, S, [{ t: 'A · B = |A| |B| cos θ', mono: 1, c: '#7c3aed', w: 900 }, { t: 'W = F · x = F x cos θ', mono: 1, c: '#0f766e', w: 900 }, { t: 'W = ' + S.p.F + ' × ' + S.p.x + ' × cos ' + Math.round(S.p.th) + '°', mono: 1 }, { t: 'W ≈ ' + Q51.f(W, 1) + ' J', mono: 1, c: '#dc2626', w: 900 }, { t: Math.abs(S.p.th - 90) < .5 ? 'القوة عمودية على الإزاحة: الشغل صفر' : S.p.th > 90 ? 'الزاوية منفرجة: الشغل سالب' : 'مسقط القوة باتجاه الإزاحة يبذل الشغل', c: '#334155', w: 800 }], { title: 'الضرب القياسي والشغل', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب الكرة الصفراء لتغيير زاوية الحبل');
    },
    chips(S, g) { return { r: Q42.chips(S, 'run', [['go', '▶ اسحب الصندوق'], ['re', '↺ أعِد الصندوق'], ['90', 'θ = 90°'], ['120', 'θ = 120°']], g.h - 128, S.run ? 'go' : '', (S2, k) => { if (k === 'go') { S2.d = 0; S2.run = 1; } else if (k === 're') { S2.d = 0; S2.run = 0; } else setParam(S2, 'th', +k); }, { bw: 150 }), e: Q51.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 5 ص 19', S2 => { setParam(S2, 'F', 40); setParam(S2, 'th', 37); setParam(S2, 'x', 10); S2.d = 0; S2.run = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), t = Q51.d2r(S.p.th), O = g.O, Ft = [O[0] + Math.cos(t) * S.p.F * g.pn, O[1] - Math.sin(t) * S.p.F * g.pn], fy = g.fy, bx = g.sx0 + S.d * g.sm, ax = bx + 74, ay = fy - 54 * .6;
      return [{ id: 'hand', x: ax + Math.cos(t) * 120, y: ay - Math.sin(t) * 120, r: 20, axis: 'xy', keep: true, tip: 'اسحب يد الحبل', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'th', clamp(Math.round(Q51.r2d(Math.atan2(ay - d.y, d.x - ax))), 0, 180)) },
        { id: 'ftip', x: Ft[0], y: Ft[1], r: 16, axis: 'xy', keep: true, hint: false, tip: 'اسحب رأس F', drag: (S2, d) => { const dx = d.x - O[0], dy = O[1] - d.y; setParam(S2, 'th', clamp(Math.round(Q51.r2d(Math.atan2(Math.max(dy, 0), dx))), 0, 180)); setParam(S2, 'F', clamp(Math.round(Math.hypot(dx, dy) / g.pn), 0, 60)); } }].concat(C.r, C.e); },
    readings(S) { const c = Math.cos(Q51.d2r(S.p.th)); return [rd('F', S.p.F + ' N'), rd('θ', Math.round(S.p.th) + '°'), rd('F cos θ', Q51.f(S.p.F * c, 2) + ' N'), rd('الشغل W', Q51.f(S.p.F * S.p.x * c, 1) + ' J')]; },
    record(S) { const c = Math.cos(Q51.d2r(S.p.th)); return { F: S.p.F, t: Math.round(S.p.th), x: S.p.x, W: +(S.p.F * S.p.x * c).toFixed(1) }; },
    cols: [['F', 'F (N)'], ['t', 'θ (°)'], ['x', 'x (m)'], ['W', 'W (J)']],
    explain(S) { return Q26.ex('ظل القوة على اتجاه الحركة يقصر كلما كبرت الزاوية، وينعدم عند 90°، ثم يصبح بالاتجاه المعاكس فيكون الشغل سالباً.', 'الشغل يبذله فقط جزء القوة الموازي للإزاحة F cosθ ، لذا W = F x cosθ ، وهو ضرب قياسي ناتجه عدد بلا اتجاه.', 'عندما تسحب حقيبة بمقبض مائل يضيع جزء من قوتك في رفعها، ولذلك يكون السحب الأفقي أكفأ.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F2 — الضرب الاتجاهي وقاعدة الكف اليمنى: مفتاح عزم (الشكلان 25 و 27 + مثال 6 + مسألة 3 + فكّر ص 19) =============== */
(() => {
  const EXS = { ex6: { t: 'مثال 6 ص 19', q: 'أثرت القوة F مقدارها 150 N في الذراع ab عند النقطة a التي تبعد 5 m عن محور الدوران b. جد مقدار المتجه المحصل واتجاهه', lines: ['|F × X| = |X| |F| sin θ', '|F × X| = 5 × 150 × sin 30°', '|F × X| = 5 × 150 × 1/2', '|F × X| = 375 N.m', 'الاتجاه نحو القارئ خارج الصفحة وفق قاعدة الكف اليمنى'] },
    p3: { t: 'مسألة 3 ص 23', q: 'مقدار A يساوي 6 units بالاتجاه الموجب للمحور x ومقدار B يساوي 4 units بزاوية 30° مع x. احسب مقدار A × B', lines: ['|A × B| = |A| |B| sin θ', '|A × B| = 6 × 4 × sin 30°', '|A × B| = 6 × 4 × 0.5', '|A × B| = 12 units', 'الاتجاه عمودي على المستوي xy خارج الصفحة'] },
    th: { t: 'فكّر ص 19', q: 'خواص الضرب القياسي والاتجاهي', lines: ['A · A = |A| |A| cos 0 = A²', '|A × A| = |A| |A| sin 0 = 0', 'A · B = B · A', 'A × B = −B × A', 'إذا كان A عمودياً على B فإن A · B = 0', 'cos 90° = 0     sin 90° = 1'] } };
  const D = { id: 'g11_v_cross', page: 18, fig: 'الشكلان 25 و 27 + مثال 6 + مسألة 3 ص 23',
    desc: 'الضرب الاتجاهي لمتجهين A × B ناتجه متجه C عمودي على المستوي الذي يحوي المتجهين، مقداره |C| = |A| |B| sinθ ، ويُعيَّن اتجاهه بقاعدة الكف اليمنى: تدوير أصابع الكف اليمنى من المتجه الأول نحو الثاني فيشير الإبهام إلى اتجاه C. ومن أمثلته عزم القوة على ذراع.',
    tags: 'الضرب الاتجاهي cross product A×B |C|=ABsinθ قاعدة الكف اليمنى عمودي على المستوي عزم مفتاح ذراع مثال 6 150N 5m 30 375N.m مسألة 3 12 units',
    tools: ['مفتاح عزم بذراع طوله حتى 6 m (نموذج)', 'صامولة', 'مقياس عزم'],
    steps: ['اسحب رأس القوة الحمراء حول طرف الذراع a: يتغير sinθ ومقدار |F × X|.', 'لاحظ الرمز عند المحور: ⊙ خارج الصفحة أو ⊗ داخل الصفحة.', 'اضغط «▶ أطلق» ليدور الذراع باتجاه العزم.', 'اختر مثال 6 أو مسألة 3 أو فكّر ص 19 للحل خطوة خطوة.'],
    concl: ['|A × B| = |A| |B| sinθ ، والناتج متجه عمودي على مستوي المتجهين.', 'مقداره يساوي مساحة متوازي الأضلاع المرسوم على المتجهين.', 'مثال 6: |F × X| = 375 N.m خارج الصفحة.', 'A × B = −B × A ، و A × A = 0.'],
    laws: ['g11_l1_cross'],
    controls: [R('F', 'القوة F', 0, 200, 150, 5, 'N'), R('x', 'طول الذراع x', 1, 6, 5, .5, 'm'), R('phi', 'اتجاه القوة', 0, 355, 330, 5, '°'), TG('area', 'متوازي الأضلاع والمتجه العمودي', true, null, 'layers')],
    setup(S) { S.eF = S.p.F; S.ex_ = S.p.x; S.ep = S.p.phi; S.rot = 0; S.w = 0; S.run = 0; S.cs = 'ex6'; S.ex = 0; S.k = 0; },
    tz(S) { return S.p.x * S.p.F * Math.sin(Q51.d2r(S.p.phi)); }, // (X × F)z
    update(S, dt) { S.eF = Q51.ez(S.eF, S.p.F, dt, 8); S.ex_ = Q51.ez(S.ex_, S.p.x, dt, 8); S.ep = Q51.eza(S.ep, S.p.phi, dt, 8);
      const tgt = S.run ? clamp(D.tz(S) / 600, -1.6, 1.6) : 0; S.w = Q51.ez(S.w, tgt, dt, 2.5); S.rot += S.w * dt; if (!S.run) S.rot = Q51.ez(S.rot, 0, dt, 3); },
    geo(S) { const g = Q51.geo(S); g.b = [g.x0 + 70, 250]; g.pm = 46; g.pf = .62; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), b = g.b, X = S.ex_ * g.pm, ph = Q51.d2r(S.ep), rt = S.rot, cr = Math.cos(rt), sr = Math.sin(rt), tf = (x, y) => [b[0] + x * cr - y * sr, b[1] - (x * sr + y * cr)];
      Q51.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.7)'; rr(ctx, g.x0, g.y0, g.x1 - g.x0, 330, 12); ctx.fill(); ctx.strokeStyle = 'rgba(148,163,184,.25)'; ctx.lineWidth = 1; for (let x = g.x0 + 12; x < g.x1; x += 24) { ctx.beginPath(); ctx.moveTo(x, g.y0); ctx.lineTo(x, g.y0 + 330); ctx.stroke(); } for (let y = g.y0 + 12; y < g.y0 + 330; y += 24) { ctx.beginPath(); ctx.moveTo(g.x0, y); ctx.lineTo(g.x1, y); ctx.stroke(); } });
      // wrench: steel bar from b to a (rotated by rt)
      K.raw(ctx, () => { ctx.save(); ctx.translate(b[0], b[1]); ctx.rotate(-rt); const gr = ctx.createLinearGradient(0, -9, 0, 9); gr.addColorStop(0, '#e5e7eb'); gr.addColorStop(.45, '#9ca3af'); gr.addColorStop(1, '#4b5563'); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; ctx.fillStyle = gr; rr(ctx, 0, -8, X + 6, 16, 6); ctx.fill(); ctx.shadowColor = 'transparent';
        const gg = ctx.createLinearGradient(0, -11, 0, 11); gg.addColorStop(0, '#1f2937'); gg.addColorStop(.5, '#374151'); gg.addColorStop(1, '#111827'); ctx.fillStyle = gg; rr(ctx, Math.max(30, X - 58), -11, 60, 22, 8); ctx.fill();
        ctx.fillStyle = '#6b7280'; ctx.beginPath(); ctx.arc(0, 0, 22, 0, TAU); ctx.fill(); ctx.fillStyle = '#d1d5db'; ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; ctx.lineTo(Math.cos(a) * 13, Math.sin(a) * 13); } ctx.closePath(); ctx.fill(); ctx.restore(); });
      const a = tf(X, 0), fl = S.eF * g.pf, fa = ph + rt, F1 = [a[0] + Math.cos(fa) * fl, a[1] - Math.sin(fa) * fl];
      Q51.dash(ctx, [a, tf(X + 70, 0)], '#64748b', 1.4);
      Q42.T(ctx, 'b', b[0] - 4, b[1] - 32, { s: 14, w: 900, c: '#dc2626' }); Q42.T(ctx, 'a', a[0] - 4, a[1] - 24, { s: 14, w: 900, c: '#dc2626' });
      Q51.vec(ctx, b[0], b[1] + 30, b[0] + X * cr, b[1] + 30 - X * sr, '#0891b2', 'X', { w: 3.5, side: 1, flat: 1 });
      Q51.vec(ctx, a[0], a[1], F1[0], F1[1], '#dc2626', 'F', { w: 5 }); Q41.knob(ctx, F1[0], F1[1], '#dc2626', 9);
      const thb = Math.abs(((S.ep % 360) + 540) % 360 - 180); Q51.arc(ctx, a[0], a[1], 30, Q51.r2d(rt), Q51.r2d(rt) + (Math.sin(Q51.d2r(S.ep)) >= 0 ? thb : -thb), '#7c3aed', 'θ = ' + Math.round(thb) + '°', { lo: 24 });
      const fx = -D.tz(S); // (F × X)z = −(X × F)z
      const sym = Math.abs(fx) < 1 ? '' : fx > 0 ? '⊙' : '⊗'; if (sym) { Q42.T(ctx, sym, b[0], b[1] + 64, { s: 30, w: 900, c: '#7c3aed' }); Q42.T(ctx, fx > 0 ? 'الناتج خارج الصفحة' : 'الناتج داخل الصفحة', b[0] + 56, b[1] + 92, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' }); }
      if (S.p.area) D.inset(ctx, g, S);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q51.drawSteps(ctx, C.e); Q42.drawChips(ctx, C.r);
      if (S.ex) { const E = EXS[S.cs]; Q42.steps(ctx, S, { title: E.t, q: E.q, lines: E.lines, k: S.k }, { y: 64, x: w - 12, wd: 304 }); }
      else Q42.card(ctx, S, [{ t: '|F × X| = |X| |F| sin θ', mono: 1, c: '#7c3aed', w: 900 }, { t: '= ' + Q51.f(S.p.x) + ' × ' + S.p.F + ' × sin ' + Math.round(thb) + '°', mono: 1 }, { t: '= ' + Q51.f(Math.abs(fx), 1) + ' N.m', mono: 1, c: '#dc2626', w: 900 }, { t: sym ? (fx > 0 ? 'الاتجاه: خارج الصفحة نحو القارئ' : 'الاتجاه: داخل الصفحة') : 'القوة على امتداد الذراع: الناتج صفر', c: '#334155', w: 800 }, { t: 'دوّر أصابع اليمنى من المتجه الأول إلى الثاني فيشير الإبهام إلى الاتجاه', c: '#64748b', s: 11.5 }], { title: 'الضرب الاتجاهي', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب رأس القوة حول طرف الذراع a');
    },
    /* pseudo-3D inset: parallelogram of two vectors in a tilted plane with the perpendicular product */
    inset(ctx, g, S) { const x0 = g.w - 324, y0 = 330, wd = 310, hh = g.h - 160 - y0; if (hh < 150) return; const p3 = S.cs === 'p3' && S.ex;
      const A = p3 ? [6, 0] : [S.p.x, 0], Bm = p3 ? 4 : S.p.F / 30, Ba = p3 ? 30 : S.p.phi, B = [Bm * Math.cos(Q51.d2r(Ba)), Bm * Math.sin(Q51.d2r(Ba))], cz = p3 ? A[0] * B[1] - A[1] * B[0] : -(A[0] * B[1] - A[1] * B[0]), sc = 19, o = [x0 + 100, y0 + hh * .6], pj = (x, y, z) => [o[0] + x * sc + y * sc * .5, o[1] - y * sc * .5 - z * sc * .6];
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.88)'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, x0, y0, wd, hh, 12); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(147,197,253,.45)'; ctx.strokeStyle = 'rgba(37,99,235,.5)'; const c = [pj(-3, -3, 0), pj(8, -3, 0), pj(8, 3.5, 0), pj(-3, 3.5, 0)]; ctx.beginPath(); c.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(124,58,237,.25)'; const q = [pj(0, 0, 0), pj(A[0], A[1], 0), pj(A[0] + B[0], A[1] + B[1], 0), pj(B[0], B[1], 0)]; ctx.beginPath(); q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); });
      const pa = pj(A[0], A[1], 0), pb = pj(B[0], B[1], 0), pc = pj(0, 0, clamp(cz / 4, -4, 4)), po = pj(0, 0, 0);
      Q51.vec(ctx, po[0], po[1], pa[0], pa[1], '#0891b2', p3 ? 'A' : 'X', { w: 3.5 }); Q51.vec(ctx, po[0], po[1], pb[0], pb[1], '#dc2626', p3 ? 'B' : 'F', { w: 3.5, side: -1 }); if (Math.abs(cz) > .05) Q51.vec(ctx, po[0], po[1], pc[0], pc[1], '#7c3aed', 'C', { w: 4.5, side: -1 });
      Q42.T(ctx, 'مساحة متوازي الأضلاع = |C|', x0 + wd / 2, y0 + 16, { s: 11.5, w: 900, c: '#7c3aed' }); Q42.T(ctx, p3 ? 'C = A × B عمودي على المستوي' : 'C = F × X عمودي على المستوي', x0 + wd / 2, y0 + hh - 14, { s: 10.5, w: 800, c: '#334155' }); },
    chips(S, g) { return { c: Q42.chips(S, 'cs', [['ex6', 'مثال 6 ص 19'], ['p3', 'مسألة 3 ص 23'], ['th', 'فكّر ص 19']], g.h - 128, S.cs, (S2, k) => { S2.cs = k; S2.ex = 1; S2.k = 0; if (k === 'ex6') { setParam(S2, 'F', 150); setParam(S2, 'x', 5); setParam(S2, 'phi', 330); } }, { bw: 150 }), e: Q51.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', null, EXS[S.cs].lines.length),
      r: Q42.chips(S, 'run', [['go', '▶ أطلق'], ['st', '■ أوقف']], g.h - 84, S.run ? 'go' : 'st', (S2, k) => { S2.run = k === 'go' ? 1 : 0; }, { bw: 110, x0: g.L + 340 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), b = g.b, X = S.p.x * g.pm, rt = S.rot, a = [b[0] + X * Math.cos(rt), b[1] - X * Math.sin(rt)], fa = Q51.d2r(S.p.phi) + rt, fl = S.p.F * g.pf;
      return [{ id: 'ftip', x: a[0] + Math.cos(fa) * fl, y: a[1] - Math.sin(fa) * fl, r: 18, axis: 'xy', keep: true, tip: 'اسحب رأس القوة', idle: 'اسحب ✋', drag: (S2, d) => { const dx = d.x - a[0], dy = a[1] - d.y; setParam(S2, 'phi', Math.round(Q51.nd(Q51.ang(dx, dy) - Q51.r2d(S2.rot)) / 5) * 5 % 360); setParam(S2, 'F', clamp(Math.round(Math.hypot(dx, dy) / g.pf / 5) * 5, 0, 200)); } },
        { id: 'arm', x: a[0], y: a[1], r: 14, axis: 'x', keep: true, hint: false, tip: 'اسحب لتغيير طول الذراع', drag: (S2, d) => setParam(S2, 'x', clamp(Math.round((d.x - b[0]) / g.pm * 2) / 2, 1, 6)) }].concat(C.c, C.e, C.r); },
    readings(S) { const th = Math.abs(((S.p.phi % 360) + 540) % 360 - 180), fx = -D.tz(S); return [rd('F', S.p.F + ' N'), rd('X', Q51.f(S.p.x) + ' m'), rd('θ', Math.round(th) + '°'), rd('|F × X|', Q51.f(Math.abs(fx), 1) + ' N.m'), rd('الاتجاه', Math.abs(fx) < 1 ? '—' : fx > 0 ? 'خارج الصفحة ⊙' : 'داخل الصفحة ⊗')]; },
    record(S) { const th = Math.abs(((S.p.phi % 360) + 540) % 360 - 180); return { F: S.p.F, x: S.p.x, t: Math.round(th), m: +Math.abs(D.tz(S)).toFixed(1) }; },
    cols: [['F', 'F (N)'], ['x', 'X (m)'], ['t', 'θ (°)'], ['m', '|F×X| (N.m)']],
    explain(S) { return Q26.ex('كلما اقتربت القوة من العمودية على الذراع كبر مقدار F × X وأسرع دوران المفتاح، وعندما تكون على امتداد الذراع لا يدور.', 'مقدار الضرب الاتجاهي |X| |F| sinθ ، و sinθ أكبر ما يمكن عند 90° وصفر عند 0° و 180°. والناتج متجه عمودي على مستوي المتجهين يعيّن بقاعدة الكف اليمنى.', 'مقبض الباب بعيد عن المفصلات وتدفعه عمودياً لتحصل على أكبر عزم بأقل قوة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G1 — أسئلة الاختيار من متعدد س1 (ص 20–22) بأشكالها =============== */
(() => {
  const V = Q51.vec, T = (ctx, s, x, y, o) => Q42.T(ctx, s, x, y, o || { s: 12, w: 900, c: '#0f172a' });
  /* mini panel helper: draws a frame and returns a mapper (u in units, y up) */
  const panel = (ctx, x, y, w, h, lab, st) => { K.raw(ctx, () => { ctx.fillStyle = st === 1 ? '#dcfce7' : st === -1 ? '#fee2e2' : '#ffffff'; ctx.strokeStyle = st === 1 ? '#16a34a' : st === -1 ? '#dc2626' : '#cbd5e1'; ctx.lineWidth = st ? 3 : 1.5; rr(ctx, x, y, w, h, 10); ctx.fill(); ctx.stroke(); }); if (lab) T(ctx, lab, x + 16, y + 16, { s: 14, w: 900, c: '#0891b2' }); };
  const ax = (ctx, ox, oy, L, U) => { Q41.line(ctx, [[ox - (L || 0), oy], [ox + (U || 70), oy]], '#334155', 1.5); };
  const QS = [
    { t: 'متجها الإزاحة A و B جُمعا سوية. أي الأشكال يوضح المتجه المحصل R بصورة صحيحة؟', fo: 1, ans: 3, why: 'المحصلة تُرسم من ذيل المتجه الأول A إلى رأس المتجه الأخير B.',
      fig(ctx, x, y, w, h, i) { const ox = x + 40, oy = y + h - 30, A = [ox, oy - (h - 80)], Bt = [ox + w * .45, oy - (h - 80) * .45]; Q41.line(ctx, [[ox - 10, oy], [x + w - 14, oy]], '#7c3aed', 1.5); V(ctx, ox, oy, A[0], A[1], '#dc2626', 'A', { w: 3, side: -1 }); V(ctx, A[0], A[1], Bt[0], Bt[1], '#16a34a', 'B', { w: 3 });
        const R = [[Bt[0], oy, Bt[0], Bt[1] + 30], [Bt[0], Bt[1], ox, oy], [ox, (A[1] + oy) / 2 + 10, Bt[0] + 2, (A[1] + oy) / 2 + 10], [ox, oy, Bt[0], Bt[1]]][i]; V(ctx, R[0], R[1], R[2], R[3], '#db2777', 'R', { w: 3, side: 1 }); } },
    { t: 'قطع شخص إزاحة A باتجاه الجنوب الشرقي. أي الأشكال يوضح المركبتين Ax و Ay بصورة صحيحة؟', fo: 1, ans: 2, why: 'الجنوب الشرقي: المركبة الأفقية نحو x الموجب والشاقولية نحو الأسفل، تبدأ من رأس Ax وتنتهي عند رأس A.',
      fig(ctx, x, y, w, h, i) { const ox = x + 40, oy = y + 48, ex = x + w - 50, ey = y + h - 24; Q41.line(ctx, [[ox, oy - 20], [ox, ey + 6]], '#334155', 1.2); Q41.line(ctx, [[ox, oy], [x + w - 10, oy]], '#334155', 1.2); T(ctx, '+x', x + w - 18, oy - 10, { s: 10, w: 800, c: '#334155' });
        V(ctx, ox, oy, ex, ey, '#ea580c', 'A', { w: 3, side: -1 }); const xr = i === 0 || i === 2; xr ? V(ctx, ox, oy, ex, oy, '#dc2626', 'Ax', { w: 3, side: -1, off: 12 }) : V(ctx, ex, oy, ox, oy, '#dc2626', 'Ax', { w: 3, side: 1, off: 12 }); const yd = i === 1 || i === 2; yd ? V(ctx, ex, oy, ex, ey, '#4f46e5', 'Ay', { w: 3, off: 18 }) : V(ctx, ex, ey, ex, oy, '#4f46e5', 'Ay', { w: 3, side: -1, off: 18 }); } },
    { t: 'أي زوج من المتجهات K و L و M و N في الشكل متساويان؟', o: ['K و L', 'K و M', 'L و M', 'N و L'], ans: 0, why: 'K و L لهما الطول نفسه والاتجاه نفسه نحو الأعلى واليسار.',
      fig(ctx, x, y, w, h) { const c = [x + w / 2, y + h / 2], s = Math.min(w, h) * .32, B = [c[0], c[1] + s], Rr = [c[0] + s, c[1]], Tp = [c[0], c[1] - s], Lf = [c[0] - s, c[1]]; V(ctx, B[0], B[1], Lf[0], Lf[1], '#ea580c', 'K', { w: 3.5, side: -1 }); V(ctx, B[0], B[1], Rr[0], Rr[1], '#16a34a', 'M', { w: 3.5 }); V(ctx, Rr[0], Rr[1], Tp[0], Tp[1], '#db2777', 'L', { w: 3.5 }); V(ctx, Tp[0], Tp[1], Lf[0], Lf[1], '#4f46e5', 'N', { w: 3.5, side: -1 }); } },
    { t: 'المتجهان K و L متساويان في المقدار، 5 وحدات لكل منهما، والزاوية كما في الشكل. أي المتجهات الآتية يمثل محصلتهما؟', fo: 1, ans: 3, why: 'الزاوية بين K و L تساوي 120°، فالمحصلة 5 وحدات باتجاه 60° مع الأفق.',
      head(ctx, x, y, w, h) { const o = [x + w * .45, y + h - 26], s = 64; Q41.line(ctx, [[x + 14, o[1]], [x + w - 14, o[1]]], '#94a3b8', 1.5, [2, 4]); V(ctx, o[0], o[1], o[0] + s, o[1], '#334155', 'L', { w: 3 }); V(ctx, o[0], o[1], o[0] - s * .5, o[1] - s * .866, '#334155', 'K', { w: 3, side: -1 }); Q51.arc(ctx, o[0], o[1], 22, 120, 180, '#db2777', '60°', { lo: 12 }); },
      fig(ctx, x, y, w, h, i) { const o = [x + w / 2 - (i === 0 ? -20 : 20), y + h - 30], s = Math.min(90, h - 70), a = [120, 30, 90, 60][i]; Q41.line(ctx, [[x + 12, o[1]], [x + w - 12, o[1]]], '#94a3b8', 1.5, [2, 4]); V(ctx, o[0], o[1], o[0] + Math.cos(Q51.d2r(a)) * s, o[1] - Math.sin(Q51.d2r(a)) * s, '#334155', '', { w: 3 }); Q51.arc(ctx, o[0], o[1], 22, a < 90 ? 0 : a, a < 90 ? a : 180, '#db2777', (a === 120 ? 60 : a) + '°', { lo: 12 }); T(ctx, '5 وحدات', o[0] + Math.cos(Q51.d2r(a)) * s * .5 + 30, o[1] - Math.sin(Q51.d2r(a)) * s * .5, { s: 10, w: 800, c: '#334155' }); } },
    { t: 'المتجهات K و L و N في الشكل. أي المعادلات الآتية غير صحيحة؟', eq: ['1)  K = N', '2)  K + L + N = L', '3)  K + N = 0'], o: ['المعادلة 1', 'المعادلة 2', 'المعادلتان 2 و 3', 'المعادلات 1 و 2 و 3'], ans: 0, why: 'N = −K لأنهما متساويان مقداراً ومتعاكسان اتجاهاً، فالمعادلة 1 خاطئة والمعادلتان 2 و 3 صحيحتان.',
      fig(ctx, x, y, w, h) { const s = Math.min(w, h) * .18; V(ctx, x + w * .2, y + h * .5, x + w * .2 + 2 * s, y + h * .5 - 2 * s, '#dc2626', 'K', { w: 3.5, side: -1 }); V(ctx, x + w * .55, y + h * .25, x + w * .55 + s, y + h * .25 + s, '#db2777', 'L', { w: 3.5, side: -1 }); V(ctx, x + w * .75, y + h * .55, x + w * .75 - 2 * s, y + h * .55 + 2 * s, '#16a34a', 'N', { w: 3.5, side: -1 }); } },
    { t: 'إذا كان المتجه المحصل للمتجهين K و L عمودياً على المتجه K ، والزاوية بينهما 135° و K = 8 وحدات، فإن مقدار L يساوي:', o: ['8 وحدات', '4√3 وحدات', '4√2 وحدات', '8√2 وحدات'], ans: 3, why: 'المحصلة عمودية على K إذن مركبة L على اتجاه K تلغي K: L cos 45° = 8 ، فإن L = 8√2.',
      fig(ctx, x, y, w, h) { const o = [x + w * .5, y + h * .72], s = 120; V(ctx, o[0], o[1], o[0] + s, o[1], '#2563eb', 'K', { w: 3.5 }); V(ctx, o[0], o[1], o[0] - s, o[1] - s, '#16a34a', 'L', { w: 3.5, side: -1 }); Q51.arc(ctx, o[0], o[1], 26, 0, 135, '#db2777', '135°', { lo: 14 }); V(ctx, o[0], o[1], o[0], o[1] - s, '#dc2626', 'R', { w: 3, dash: [6, 4], side: 1 }); Q51.rmark(ctx, o[0], o[1], 1, 0, 0, -1, 10); T(ctx, '8 وحدات', o[0] + s / 2, o[1] + 18, { s: 10.5, w: 800, c: '#2563eb' }); } },
    { t: 'أي المعادلات الآتية للمتجهات في المربع غير صحيحة؟', eq: ['1)  K + L + M + N = 2P', '2)  K + L + M + N = 0', '3)  N + M = P', '4)  −(K + L) = P'], o: ['المعادلة 1', 'المعادلتان 1 و 2', 'المعادلات 1 و 2 و 3', 'المعادلة 4'], ans: 0, why: 'أضلاع المربع المتتابعة تكوّن مضلعاً مغلقاً فمجموعها صفر وليس 2P ، أما بقية المعادلات فصحيحة.',
      fig(ctx, x, y, w, h) { const s = Math.min(w, h) * .62, x0 = x + (w - s) / 2, y0 = y + (h - s) / 2; V(ctx, x0, y0, x0 + s, y0, '#334155', 'K', { w: 3.5, side: -1 }); V(ctx, x0 + s, y0, x0 + s, y0 + s, '#334155', 'L', { w: 3.5, side: -1 }); V(ctx, x0 + s, y0 + s, x0, y0 + s, '#334155', 'M', { w: 3.5, side: -1 }); V(ctx, x0, y0 + s, x0, y0, '#334155', 'N', { w: 3.5, side: -1 }); V(ctx, x0 + s, y0 + s, x0, y0, '#dc2626', 'P', { w: 3, side: 1 }); } },
    { t: 'الشكل يبين مركبتي المتجهين A و B. أي الأشكال يعبّر عن حاصل جمع المتجهين A + B؟', fo: 1, ans: 0, why: 'المركبة الأفقية للمحصلة موجبة لأن Bx أطول من Ax ، والشاقولية سالبة لأن Ay أطول من By ، فالمحصلة نحو اليمين والأسفل.',
      head(ctx, x, y, w, h) { const o1 = [x + w * .3, y + h * .38], o2 = [x + w * .68, y + h * .38]; Q41.line(ctx, [[x + 14, o1[1]], [x + w - 14, o1[1]]], '#94a3b8', 1); V(ctx, o1[0], o1[1], o1[0] - 55, o1[1], '#4f46e5', 'Ax', { w: 3, side: -1, off: 12 }); V(ctx, o1[0], o1[1], o1[0], o1[1] + 70, '#4f46e5', 'Ay', { w: 3, side: -1, off: 16 }); V(ctx, o2[0], o2[1], o2[0] + 95, o2[1], '#16a34a', 'Bx', { w: 3, side: -1, off: 12 }); V(ctx, o2[0], o2[1], o2[0], o2[1] - 30, '#16a34a', 'By', { w: 3, off: 16 }); },
      fig(ctx, x, y, w, h, i) { const o = [x + w / 2, y + h / 2 + 6], d = [[1, -1.3], [-.8, 1.3], [-.8, -1.3], [.8, 1.3]][i]; Q41.line(ctx, [[x + 14, o[1]], [x + w - 14, o[1]]], '#94a3b8', 1.2); Q41.line(ctx, [[o[0], y + 26], [o[0], y + h - 10]], '#94a3b8', 1.2); V(ctx, o[0], o[1], o[0] + d[0] * 42, o[1] - d[1] * 42, '#4f46e5', 'R', { w: 3 }); } }
  ];
  const D = { id: 'g11_v_mcq', page: 20, fig: 'أسئلة الفصل الأول: س1 فقرة 1 إلى فقرة 8',
    desc: 'السؤال الأول من أسئلة الفصل: اختر العبارة الصحيحة. ثماني فقرات بأشكالها كما في الكتاب: المحصلة البيانية، المركبات، تساوي المتجهات، محصلة متجهين متساويين، المتجه وسالبه، المحصلة العمودية، المضلع المغلق، وجمع المركبات.',
    tags: 'أسئلة الفصل الأول اختر العبارة الصحيحة س1 محصلة مركبات تساوي متجهات مضلع مغلق',
    tools: ['أشكال الكتاب'],
    steps: ['اختر الفقرة من الأزرار العليا.', 'اقرأ السؤال في البطاقة وانظر إلى الشكل.', 'اضغط على شكل الإجابة أو على زر الخيار a أو b أو c أو d.', 'تظهر النتيجة مع التفسير؛ انتقل إلى الفقرة التالية.'],
    concl: ['الإجابات: فقرة 1 d ، فقرة 2 c ، فقرة 3 a ، فقرة 4 d ، فقرة 5 a ، فقرة 6 d ، فقرة 7 a ، فقرة 8 a.'],
    laws: [],
    controls: [TG('why', 'إظهار التفسير بعد الإجابة', true, null, 'labels')],
    setup(S) { S.q = 0; S.pick = {}; S.fl = 0; },
    update(S, dt) { if (S.fl > 0) S.fl = Math.max(0, S.fl - dt); },
    geo(S) { return Q51.geo(S, { y0: 60 }); },
    boxes(g, q) { const top = q.head ? g.y0 + 150 : g.y0, W = (g.x1 - g.x0 - 10) / 2, H = (g.y1 - top - 10) / 2; return [0, 1, 2, 3].map(i => ({ x: g.x0 + (i % 2 ? W + 10 : 0), y: top + Math.floor(i / 2) * (H + 10), w: W, h: H })); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), q = QS[S.q], pk = S.pick[S.q]; Q51.bg(ctx, w, h);
      if (q.fo) { if (q.head) { panel(ctx, g.x0, g.y0, g.x1 - g.x0, 140, '', 0); q.head(ctx, g.x0, g.y0, g.x1 - g.x0, 140); }
        D.boxes(g, q).forEach((b, i) => { const st = pk == null ? 0 : i === q.ans ? (pk === i ? 1 : (pk != null ? 1 : 0)) : pk === i ? -1 : 0; panel(ctx, b.x, b.y, b.w, b.h, 'abcd'[i], pk == null ? 0 : st); K.raw(ctx, () => { ctx.save(); rr(ctx, b.x, b.y, b.w, b.h, 10); ctx.clip(); q.fig(ctx, b.x, b.y, b.w, b.h, i); ctx.restore(); }); }); }
      else { panel(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, '', 0); q.fig(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.n); Q42.drawChips(ctx, C.o);
      const L = [{ t: q.t, c: '#0f172a', w: 800 }].concat((q.eq || []).map(e => ({ t: e, mono: 1, c: '#7c3aed', w: 800 }))); if (q.o) q.o.forEach((o, i) => L.push({ t: 'الخيار ' + 'abcd'[i] + ': ' + o, c: pk === i ? (i === q.ans ? '#16a34a' : '#dc2626') : pk != null && i === q.ans ? '#16a34a' : '#334155', w: pk === i || (pk != null && i === q.ans) ? 900 : 700 }));
      if (pk != null) { L.push({ t: pk === q.ans ? 'إجابة صحيحة ✓' : 'إجابة خاطئة ✗ والصحيح ' + 'abcd'[q.ans], c: pk === q.ans ? '#16a34a' : '#dc2626', w: 900 }); if (S.p.why) L.push({ t: q.why, c: '#7c3aed', w: 800 }); }
      else L.push({ t: 'اضغط الإجابة الصحيحة', c: '#0f766e', w: 800 });
      const n = Object.keys(S.pick).filter(k => S.pick[k] === QS[k].ans).length; Q42.card(ctx, S, L, { title: 'س1 فقرة ' + (S.q + 1) + ' — الصحيحة ' + n + ' من 8', y: 64, wd: 316 });
      Q42.banner(ctx, w, 'اختر العبارة الصحيحة لكل مما يأتي');
    },
    chips(S, g) { return { n: Q42.chips(S, 'q', QS.map((q, i) => [String(i), 'فقرة ' + (i + 1)]), g.h - 128, String(S.q), (S2, k) => { S2.q = +k; }, { bw: 82 }),
      o: Q42.chips(S, 'o', [['0', 'a'], ['1', 'b'], ['2', 'c'], ['3', 'd'], ['nx', 'الفقرة التالية ⬅']], g.h - 84, S.pick[S.q] != null ? String(S.pick[S.q]) : '', (S2, k) => { if (k === 'nx') S2.q = (S2.q + 1) % QS.length; else S2.pick[S2.q] = +k; }, { bw: 110 }).map(b => { if (b.id !== 'o_nx' && S.pick[S.q] != null) b._col = +b.id.slice(2) === QS[S.q].ans ? '#16a34a' : '#dc2626'; return b; }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), q = QS[S.q], C = D.chips(S, g), out = [];
      if (q.fo) { D.boxes(g, q).forEach((b, i) => out.push({ id: 'opt' + i, x: b.x + b.w / 2, y: b.y + b.h / 2, w: b.w, h: b.h, axis: 'none', tip: 'الخيار ' + 'abcd'[i], idle: i ? undefined : 'اضغط الشكل الصحيح 👆', hint: i ? false : undefined, click: S2 => { S2.pick[S2.q] = i; } })); return out.concat(C.n, C.o); }
      C.n[0].idle = 'اختر الإجابة ⬇'; C.n[0].hint = true; return C.n.concat(C.o); },
    readings(S) { const n = Object.keys(S.pick).filter(k => S.pick[k] === QS[k].ans).length; return [rd('الفقرة', (S.q + 1) + ' من 8'), rd('الإجابات الصحيحة', n + ''), rd('المجاب عنها', Object.keys(S.pick).length + '')]; },
    explain(S) { return Q26.ex('كل فقرة تختبر قاعدة واحدة من قواعد المتجهات، والشكل الصحيح يتلوّن بالأخضر.', 'المحصلة من ذيل الأول إلى رأس الأخير، والمتجهان المتساويان لهما المقدار والاتجاه نفسه، والمضلع المغلق محصلته صفر، والمركبات تُجمع كل محور على حدة.', 'هذه القواعد نفسها يستعملها الملاحون والمهندسون في حساب المسارات والقوى.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G2 — أسئلة س2–س8 ومسائل الفصل 1–4 (ص 22–23) خطوة خطوة =============== */
(() => {
  const PB = {
    q2: { t: 'س2', q: 'هل يمكن لمركبة متجه أن تساوي صفراً على الرغم من أن مقدار المتجه لا يساوي صفراً؟', lines: ['نعم.', 'إذا كان المتجه عمودياً على أحد المحورين تنعدم مركبته على ذلك المحور.', 'مثلاً عندما تكون الزاوية قائمة:', 'Ax = A cos 90° = 0', 'والمركبة الأخرى Ay = A تساوي مقدار المتجه.'], fig: 'one', a0: 90 },
    q3: { t: 'س3', q: 'هل يمكن لمتجه ما أن يمتلك مقداراً سالباً؟', lines: ['لا.', 'مقدار المتجه |A| كمية قياسية موجبة دائماً، فهو طول السهم.', 'الإشارة السالبة في −A تعني عكس الاتجاه لا مقداراً سالباً.'], fig: 'neg' },
    q4: { t: 'س4', q: 'إذا كان A + B = 0 فماذا يمكنك أن تقول عن المتجهين؟', lines: ['B = −A', 'المتجهان متساويان في المقدار ومتعاكسان في الاتجاه.'], fig: 'zero' },
    q5: { t: 'س5', q: 'تحت أية ظروف يمكن لمتجه أن يمتلك مركبتين متساويتين بالمقدار؟', lines: ['عندما |Ax| = |Ay| يكون |tan θ| = 1', 'أي أن المتجه يصنع زاوية 45° مع المحور x', 'وكذلك الزوايا 135 و 225 و 315 درجة'], fig: 'one', a0: 45 },
    q6: { t: 'س6', q: 'هل يمكن إضافة كمية متجهة إلى كمية قياسية؟ وضح ذلك.', lines: ['لا.', 'الجمع يكون بين كميات من النوع نفسه ولها الوحدة نفسها.', 'المتجه له اتجاه والكمية القياسية لا اتجاه لها، فلا معنى لجمعهما.'], fig: 'mix' },
    q7: { t: 'س7', q: 'مقدار المتجه A يساوي 12 m ومقدار B يساوي 9 m ومقدار محصلتهما 3 m. وضح ذلك مع الرسم', lines: ['أصغر محصلة عندما يتعاكس المتجهان:', 'Rmin = |A| − |B|', '12 − 9 = 3 m', 'إذن المتجهان على خط واحد ومتعاكسان: الزاوية بينهما 180°'], fig: 'two', a0: 180 },
    q8: { t: 'س8', q: 'إذا كانت مركبة المتجه A التي تقع باتجاه المتجه B تساوي صفراً فماذا تقول عن المتجهين؟', lines: ['مركبة A باتجاه B = A cos θ = 0', 'إذن cos θ = 0 و θ = 90 درجة', 'المتجهان متعامدان:', 'A · B = 0'], fig: 'proj', a0: 90 },
    m1: { t: 'مسألة 1', q: 'النقطة A في المستوي xy إحداثياتها x = −3 و y = 2. اكتب تعبيراً عن موقع المتجه rA لتلك النقطة بصيغة اتجاهية، وارسم مخططاً يوضح اتجاهه.', lines: ['rA = −3 x̂ + 2 ŷ', 'r = √((−3)² + (2)²) = √13 = 3.61', 'tan α = 2 / 3 = 0.667 ⟸ α = 33.7°', 'النقطة في الربع الثاني لذا:', 'θ = 180° − 33.7° = 146.3°'], fig: 'pt' },
    m2: { t: 'مسألة 2', q: 'احسب الضرب النقطي للمتجهين في الشكل، مقدار A يساوي 4 units ومقدار B يساوي 5 units', lines: ['الزاوية المحصورة بين المتجهين:', 'θ = 110° − 37° = 73°', 'A · B = |A| |B| cos θ', 'A · B = 4 × 5 × cos 73°', 'A · B = 20 × 0.292', 'A · B = 5.85 units²'], fig: 'dot' },
    m3: { t: 'مسألة 3', q: 'مقدار A يساوي 6 units بالاتجاه الموجب للمحور x ومقدار B يساوي 4 units بزاوية 30° مع x. احسب مقدار A × B', lines: ['|A × B| = |A| |B| sin θ', '|A × B| = 6 × 4 × sin 30°', '|A × B| = 24 × 0.5', '|A × B| = 12 units²', 'الاتجاه عمودي على المستوي خارج الصفحة'], fig: 'crs' },
    m4: { t: 'مسألة 4', q: 'جد مركبتي القوة 25 N التي تميل بزاوية 127° عن المحور x ، علماً أن cos 37° = 0.8 و sin 37° = 0.6', lines: ['Fx = 25 × cos 127° = −25 × sin 37°', 'Fx = −25 × 0.6 = −15 N', 'Fy = 25 × sin 127° = 25 × cos 37°', 'Fy = 25 × 0.8 = 20 N'], fig: 'one', a0: 127, m: 5 }
  };
  const KQ = ['q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'], KM = ['m1', 'm2', 'm3', 'm4'];
  const D = { id: 'g11_v_probs', page: 22, fig: 'س2 إلى س8 + المسائل 1 إلى 4 ص 23',
    desc: 'أسئلة الفصل المفاهيمية س2–س8 ومسائله الأربع، لكل منها شكل تفاعلي وحل خطوة خطوة: المركبة الصفرية، المقدار الموجب دائماً، المتجه وسالبه، المركبتان المتساويتان، جمع المتجه مع القياسي، أصغر محصلة، المتجهان المتعامدان، الصيغة الاتجاهية للموقع، والضربان النقطي والاتجاهي، وتحليل قوة.',
    tags: 'أسئلة الفصل س2 س3 س4 س5 س6 س7 س8 مسائل الفصل مسألة 1 مسألة 2 مسألة 3 مسألة 4 حل خطوة خطوة',
    tools: ['ورق رسم بياني', 'آلة حاسبة'],
    steps: ['اختر سؤالاً من الصف الأعلى أو مسألة من الصف الأسفل.', 'اضغط «⬇ الخطوة التالية» لكشف الحل سطراً سطراً.', 'في الأسئلة ذات الشكل الدوّار اسحب رأس المتجه الأحمر لتتحقق من الجواب بنفسك.'],
    concl: ['مقدار المتجه موجب دائماً، ومركبته قد تكون صفراً أو سالبة.', 'A + B = 0 يعني B = −A.', 'مسألة 2: A · B = 5.85 ، مسألة 3: |A × B| = 12 ، مسألة 4: Fx = −15 N و Fy = 20 N.'],
    laws: ['g11_l1_dot', 'g11_l1_cross', 'g11_l1_comp'],
    controls: [R('ang', 'زاوية المتجه في الشكل', 0, 359, 90, 1, '°')],
    setup(S) { S.pb = 'q2'; S.k = 0; S.ea = S.p.ang; },
    pick(S, k) { S.pb = k; S.k = 0; if (PB[k].a0 != null) setParam(S, 'ang', PB[k].a0); },
    update(S, dt) { S.ea = Q51.eza(S.ea, S.p.ang, dt, 8); },
    geo(S) { const g = Q51.geo(S), P = { x: g.x0, y: g.y0, w: g.x1 - g.x0, h: g.y1 - g.y0 }; P.u = Math.min(P.w, P.h) / 15; P.ox = P.x + P.w / 2; P.oy = P.y + P.h / 2; g.P = P; return g; },
    tip(S, g) { const P = g.P, f = PB[S.pb].fig, m = f === 'two' ? 0 : 5.5, base = f === 'two' ? [P.ox + 2 * P.u, P.oy] : [P.ox, P.oy]; if (f === 'two') return null; const a = Q51.d2r(S.p.ang); return [base[0] + Math.cos(a) * m * P.u, base[1] - Math.sin(a) * m * P.u]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = g.P, pb = PB[S.pb], px = (x, y) => Q51.px(P, x, y), O = [P.ox, P.oy], a = S.ea, ar = Q51.d2r(a), f = Q51.f; Q51.bg(ctx, w, h); Q51.plane(ctx, P);
      if (pb.fig === 'one') { const m = pb.m ? 5.5 : 5.5, t = px(m * Math.cos(ar), m * Math.sin(ar)), cx = 5.5 * Math.cos(ar), cy = 5.5 * Math.sin(ar), mul = pb.m ? 25 / 5.5 : 1;
        Q51.dash(ctx, [t, [t[0], O[1]]], '#e11d48'); Q51.dash(ctx, [t, [O[0], t[1]]], '#0284c7'); Q51.vec(ctx, O[0], O[1], t[0], O[1], '#e11d48', 'Ax', { w: 4, side: cy > 0 ? 1 : -1 }); Q51.vec(ctx, O[0], O[1], O[0], t[1], '#0284c7', 'Ay', { w: 4, side: cx > 0 ? 1 : -1, off: 20 });
        Q51.vec(ctx, O[0], O[1], t[0], t[1], '#7c3aed', pb.m ? 'F' : 'A', { w: 5, side: -1 }); Q41.knob(ctx, t[0], t[1], '#dc2626', 9); Q51.arc(ctx, O[0], O[1], 30, 0, a, '#be185d', Math.round(a) + '°', { lo: 18 });
        Q42.T(ctx, 'Ax = ' + f(cx * mul, 1) + '   Ay = ' + f(cy * mul, 1) + (pb.m ? '  N' : ''), P.x + P.w / 2, P.y + P.h - 22, { s: 12, w: 900, c: '#fff', bg: Math.abs(Math.abs(cx) - Math.abs(cy)) < .05 || Math.abs(cx) < .03 || Math.abs(cy) < .03 ? '#16a34a' : '#334155' }); }
      else if (pb.fig === 'neg') { const A = [4, 2]; Q51.vec(ctx, ...px(-5, -3), ...px(-5 + A[0], -3 + A[1]), '#2563eb', 'A'); Q51.vec(ctx, ...px(5, 3), ...px(5 - A[0], 3 - A[1]), '#db2777', '−A', { side: -1 }); Q42.T(ctx, '|A| = |−A| = 4.47', P.ox, P.y + P.h - 22, { s: 12, w: 900, c: '#fff', bg: '#334155' }); }
      else if (pb.fig === 'zero') { const A = [4, 3]; Q51.vec(ctx, ...px(-2, -1.5), ...px(2, 1.5), '#2563eb', 'A', { tail: 1 }); Q51.vec(ctx, ...px(2, 1.5), ...px(-2, -1.5), '#16a34a', 'B', { side: -1, w: 3.5 }); void A; Q42.T(ctx, 'A + B = 0', P.ox, P.y + P.h - 22, { s: 12, w: 900, c: '#fff', bg: '#dc2626' }); }
      else if (pb.fig === 'mix') { Q51.vec(ctx, ...px(-5, 1), ...px(-1, 1), '#2563eb', 'F'); Q42.T(ctx, '+', ...px(0, 1), { s: 26, w: 900, c: '#334155' }); Q42.box(ctx, ...px(1.5, 2), 60, 40, 10, '#64748b'); Q42.T(ctx, '5 kg', px(1.5, 1.4)[0] + 30, px(1.5, 1.4)[1] + 4, { s: 12, w: 900, c: '#fff' }); Q42.T(ctx, '✗', ...px(5.3, 1), { s: 34, w: 900, c: '#dc2626' }); }
      else if (pb.fig === 'two') { const b0 = px(-6, 0), A1 = px(6, 0), bt = [A1[0] + Math.cos(ar) * 9 / 12 * 12 * P.u * .5, A1[1] - Math.sin(ar) * 9 / 12 * 12 * P.u * .5]; Q51.vec(ctx, b0[0], b0[1], A1[0], A1[1], '#2563eb', 'A = 12', { tail: 1 }); Q51.vec(ctx, A1[0], A1[1], bt[0], bt[1], '#16a34a', 'B = 9', { side: -1 }); Q51.vec(ctx, b0[0], b0[1], bt[0], bt[1], '#dc2626', 'R', { w: 3.5, side: 1, off: 26 }); Q41.knob(ctx, bt[0], bt[1], '#dc2626', 9);
        const Rm = Math.sqrt(144 + 81 + 216 * Math.cos(ar)); Q42.T(ctx, 'المحصلة R = ' + f(Rm, 1) + ' m والزاوية بين A و B تساوي ' + Math.round(Math.abs(((a % 360) + 540) % 360 - 180)) + ' درجة', P.ox, P.y + P.h - 22, { s: 12, w: 900, c: '#fff', bg: Rm < 3.05 ? '#16a34a' : '#334155' }); }
      else if (pb.fig === 'proj') { const B = px(6, 0), t = px(5 * Math.cos(ar), 5 * Math.sin(ar)), pr = px(5 * Math.cos(ar), 0); Q51.vec(ctx, O[0], O[1], B[0], B[1], '#16a34a', 'B', { w: 4 }); Q51.dash(ctx, [t, pr], '#db2777'); K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.35)'; ctx.fillRect(Math.min(O[0], pr[0]), O[1] + 4, Math.abs(pr[0] - O[0]), 7); }); Q51.vec(ctx, O[0], O[1], t[0], t[1], '#2563eb', 'A', { side: -1 }); Q41.knob(ctx, t[0], t[1], '#dc2626', 9);
        Q42.T(ctx, 'A cos θ = ' + f(5 * Math.cos(ar), 2), P.ox, P.y + P.h - 22, { s: 12, w: 900, c: '#fff', bg: Math.abs(Math.cos(ar)) < .01 ? '#16a34a' : '#334155' }); }
      else if (pb.fig === 'pt') { const p = px(-3, 2); Q51.dash(ctx, [p, px(-3, 0)], '#e11d48'); Q51.dash(ctx, [p, px(0, 2)], '#0284c7'); Q51.vec(ctx, O[0], O[1], p[0], p[1], '#7c3aed', 'rA', { side: -1 }); Q41.knob(ctx, p[0], p[1], '#dc2626', 8); Q42.T(ctx, '(−3 , 2)', p[0] - 30, p[1] - 18, { s: 12, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.9)' }); Q51.arc(ctx, O[0], O[1], 30, 0, 146.3, '#be185d', '146.3°', { lo: 18 }); }
      else if (pb.fig === 'dot') { const A = px(4 * Math.cos(Q51.d2r(37)) * 1.3, 4 * Math.sin(Q51.d2r(37)) * 1.3), B = px(5 * Math.cos(Q51.d2r(110)) * 1.3, 5 * Math.sin(Q51.d2r(110)) * 1.3); Q51.vec(ctx, O[0], O[1], A[0], A[1], '#2563eb', 'A'); Q51.vec(ctx, O[0], O[1], B[0], B[1], '#dc2626', 'B', { side: -1 }); Q51.arc(ctx, O[0], O[1], 30, 0, 37, '#2563eb', '37°', { lo: 14 }); Q51.arc(ctx, O[0], O[1], 54, 0, 110, '#dc2626', '110°', { lo: 14 }); Q51.arc(ctx, O[0], O[1], 78, 37, 110, '#7c3aed', '73°', { lo: 14 }); }
      else if (pb.fig === 'crs') { const A = px(6, 0), B = px(4 * Math.cos(Q51.d2r(30)), 4 * Math.sin(Q51.d2r(30))); K.raw(ctx, () => { ctx.fillStyle = 'rgba(124,58,237,.18)'; const C4 = px(6 + 4 * Math.cos(Q51.d2r(30)), 4 * Math.sin(Q51.d2r(30))); ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.lineTo(A[0], A[1]); ctx.lineTo(C4[0], C4[1]); ctx.lineTo(B[0], B[1]); ctx.closePath(); ctx.fill(); }); Q51.vec(ctx, O[0], O[1], A[0], A[1], '#2563eb', 'A', { side: 1 }); Q51.vec(ctx, O[0], O[1], B[0], B[1], '#16a34a', 'B', { side: -1 }); Q51.arc(ctx, O[0], O[1], 36, 0, 30, '#be185d', '30°', { lo: 14 }); Q42.T(ctx, '⊙', O[0] - 26, O[1] - 26, { s: 26, w: 900, c: '#7c3aed' }); Q42.T(ctx, 'المساحة = 12', px(4.2, 1)[0], px(4.2, 1)[1], { s: 12, w: 900, c: '#7c3aed' }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.q); Q42.drawChips(ctx, C.m); C.n._lab = '⬇ الخطوة التالية'; C.n._col = '#be185d'; Q42.drawChips(ctx, [C.n]);
      Q42.steps(ctx, S, { title: pb.t + ' ص ' + (S.pb[0] === 'm' ? 23 : 22), q: pb.q, lines: pb.lines, k: S.k }, { y: 64, x: w - 12, wd: 316 });
      Q42.banner(ctx, w, D.tip(S, g) || pb.fig === 'two' ? 'اسحب الرأس الأحمر للتحقق، ثم اضغط «الخطوة التالية»' : 'اختر سؤالاً ثم اضغط «الخطوة التالية»');
    },
    chips(S, g) { const f = (S2, k) => D.pick(S2, k); return { q: Q42.chips(S, 'pq', KQ.map(k => [k, PB[k].t]), g.h - 128, S.pb, f, { bw: 80 }), m: Q42.chips(S, 'pm', KM.map(k => [k, PB[k].t]), g.h - 84, S.pb, f, { bw: 96 }), n: Q42.btn('nx', { x: g.w - 120, y: g.h - 84, w: 190, h: 34 }, S2 => { S2.k = Math.min(S2.k + 1, PB[S2.pb].lines.length); }, { tip: 'الخطوة التالية' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), P = g.P, f = PB[S.pb].fig, out = [];
      if (['one', 'proj'].includes(f)) { const m = f === 'proj' ? 5 : 5.5, a = Q51.d2r(S.p.ang), t = Q51.px(P, m * Math.cos(a), m * Math.sin(a)); out.push({ id: 'tip', x: t[0], y: t[1], r: 20, axis: 'xy', keep: true, tip: 'اسحب الرأس', idle: 'اسحب ✋', drag: (S2, d) => { const [u, v] = Q51.un(P, d.x, d.y); setParam(S2, 'ang', Math.round(Q51.ang(u, v)) % 360); } }); }
      if (f === 'two') { const A1 = Q51.px(P, 6, 0), a = Q51.d2r(S.p.ang), r = 9 / 12 * 12 * P.u * .5; out.push({ id: 'btip', x: A1[0] + Math.cos(a) * r, y: A1[1] - Math.sin(a) * r, r: 20, axis: 'xy', keep: true, tip: 'اسحب رأس B', idle: 'اسحب ✋', drag: (S2, d) => setParam(S2, 'ang', Math.round(Q51.ang(d.x - A1[0], A1[1] - d.y)) % 360) }); }
      if (!out.length) { C.q[0].idle = 'اختر سؤالاً ⬇'; C.q[0].hint = true; }
      return out.concat(C.q, C.m, [C.n]); },
    readings(S) { return [rd('السؤال', PB[S.pb].t), rd('الخطوات', S.k + ' / ' + PB[S.pb].lines.length), rd('زاوية الشكل', Math.round(S.p.ang) + '°')]; },
    explain(S) { return Q26.ex('كل سؤال يرافقه شكل يمكن تحريكه للتحقق من الجواب قبل كشف خطوات الحل.', 'الأسئلة كلها تعود إلى قواعد قليلة: المقدار موجب دائماً، المركبة = المقدار × cos أو sin الزاوية، والضرب النقطي يعتمد على cosθ والاتجاهي على sinθ.', 'حل المسائل بالرسم أولاً ثم بالحساب يقلل الأخطاء في امتحان الفيزياء.'); }
  };
  M8.P[D.id] = D;
})();

/* ====================== laws ====================== */
LW({ id: 'g11_l1_polar', cat: 51, name: 'الإحداثيات القطبية والكارتيزية', fx: '<i>x</i> = <i>r</i> cos<i>θ</i> ، <i>y</i> = <i>r</i> sin<i>θ</i> ، <i>r</i> = √(<i>x</i>² + <i>y</i>²) ، tan<i>θ</i> = ' + FR('<i>y</i>', '<i>x</i>'), sym: 'r بعد النقطة عن نقطة الأصل و θ الزاوية مع الاتجاه الموجب للمحور x ، ويراعى الربع الذي تقع فيه النقطة', calc: { in: [['x', 'الإحداثي x', 'm', -3.5], ['y', 'الإحداثي y', 'm', -2.5]], out: 'البعد r', u: 'm', f: v => Math.hypot(v.x, v.y) } });
LW({ id: 'g11_l1_comp', cat: 51, name: 'تحليل المتجه إلى مركبتيه', fx: '<i>R</i><sub>x</sub> = <i>R</i> cos<i>θ</i> ، <i>R</i><sub>y</sub> = <i>R</i> sin<i>θ</i>', sym: 'المركبة الأفقية توازي المحور x والشاقولية توازي المحور y ، و θ الزاوية مع الاتجاه الموجب للمحور x', calc: { in: [['R', 'مقدار المتجه R', 'm', 175], ['t', 'الزاوية θ', '°', 50]], out: 'المركبة الأفقية Rx', u: 'm', f: v => v.R * Math.cos(v.t * Math.PI / 180) } });
LW({ id: 'g11_l1_res', cat: 51, name: 'مقدار المحصلة واتجاهها', fx: '<i>R</i> = √(<i>R</i><sub>x</sub>² + <i>R</i><sub>y</sub>²) ، <i>θ</i> = tan<sup>−1</sup> ' + FR('<i>R</i><sub>y</sub>', '<i>R</i><sub>x</sub>'), sym: 'Rx مجموع المركبات الأفقية و Ry مجموع المركبات الشاقولية لكل المتجهات', calc: { in: [['x', 'Rx', 'cm', 25.79], ['y', 'Ry', 'cm', 18.96]], out: 'مقدار المحصلة R', u: 'cm', f: v => Math.hypot(v.x, v.y) } });
LW({ id: 'g11_l1_cos', cat: 51, name: 'قانون جيب التمام', fx: '<i>R</i>² = <i>A</i>² + <i>B</i>² − 2<i>AB</i> cos<i>θ</i>', sym: 'مربع مقدار المحصلة يساوي مجموع مربعي مقداري المتجهين مطروحاً منه ضعف حاصل ضربهما في جيب تمام الزاوية بينهما المقابلة لـ R في المثلث', calc: { in: [['A', 'A', '', 14], ['B', 'B', '', 20], ['t', 'الزاوية المقابلة لـ R', '°', 140]], out: 'R', u: '', f: v => Math.sqrt(Math.max(0, v.A * v.A + v.B * v.B - 2 * v.A * v.B * Math.cos(v.t * Math.PI / 180))) } });
LW({ id: 'g11_l1_sin', cat: 51, name: 'قانون الجيوب', fx: FR('<i>R</i>', 'sin<i>γ</i>') + ' = ' + FR('<i>A</i>', 'sin<i>α</i>') + ' = ' + FR('<i>B</i>', 'sin<i>β</i>'), sym: 'مقدار كل ضلع في مثلث المتجهات مقسوماً على جيب الزاوية المقابلة له يساوي مقداراً ثابتاً', calc: { in: [['R', 'R', '', 32], ['g', 'الزاوية γ', '°', 140], ['a', 'الزاوية α', '°', 24]], out: 'A', u: '', f: v => v.R * Math.sin(v.a * Math.PI / 180) / Math.sin(v.g * Math.PI / 180) } });
LW({ id: 'g11_l1_dot', cat: 51, name: 'الضرب القياسي (النقطي)', fx: '<i>A</i> · <i>B</i> = |<i>A</i>| |<i>B</i>| cos<i>θ</i> ، <i>W</i> = <i>F</i> · <i>x</i>', sym: 'ناتجه كمية قياسية، و θ الزاوية المحصورة بين المتجهين من 0 إلى 180°', calc: { in: [['A', 'F', 'N', 40], ['B', 'x', 'm', 10], ['t', 'θ', '°', 37]], out: 'الشغل W', u: 'J', f: v => v.A * v.B * Math.cos(v.t * Math.PI / 180) } });
LW({ id: 'g11_l1_cross', cat: 51, name: 'الضرب الاتجاهي', fx: '|<i>A</i> × <i>B</i>| = |<i>A</i>| |<i>B</i>| sin<i>θ</i>', sym: 'ناتجه متجه عمودي على المستوي الذي يحوي المتجهين، واتجاهه بقاعدة الكف اليمنى. A × B = −B × A', calc: { in: [['A', 'X', 'm', 5], ['B', 'F', 'N', 150], ['t', 'θ', '°', 30]], out: '|F × X|', u: 'N.m', f: v => v.A * v.B * Math.sin(v.t * Math.PI / 180) } });

/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g11_v_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f && !D._tap) { D._tap = 1; D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); } });
Object.keys(M8.P).filter(id => /^g11_v_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g11_c1_coord', ch: 51, reg: X11, sec: '1-1 أنظمة الإحداثيات + 1-2 العلاقة بين الكارتيزية والقطبية', page: 5, kind: 'مثال',
  title: 'الإحداثيات الكارتيزية والقطبية: (x , y) و (r , θ)',
  desc: 'نحرك نقطة على ورقة رسم بياني ونقرأ موقعها بطريقتين: الكارتيزية (x , y) والقطبية (r , θ)، ونرى المثلث القائم الذي يربطهما، ونحل مثال 1 للنقطة (−3.5 , −2.5) m.',
  tags: 'إحداثيات كارتيزية قطبية نقطة الأصل',
  fact: ['نحتاج في حياتنا العملية إلى تحديد موقع جسم ما ساكناً كان أو متحركاً، ولذلك نستعين بالإحداثيات (ص 5).', 'الزاوية θ في الإحداثيات القطبية هي الزاوية بين المستقيم المرسوم من نقطة الأصل إلى النقطة والمحور x الموجب (ص 5).'],
  quiz: [
    { q: 'نقطة إحداثياتها الكارتيزية x = −3.5 m و y = −2.5 m. بعدها r عن نقطة الأصل:', o: ['4.3 m', '6 m', '1 m', '3.5 m'], a: 0, why: 'مثال 1 ص 6: r = √(3.5² + 2.5²).' },
    { q: 'الزاوية القطبية للنقطة (−3.5 , −2.5) m:', o: ['215.53°', '35.53°', '144.47°', '324.47°'], a: 0, why: 'النقطة في الربع الثالث: 180° + 35.53°.' },
    { q: 'العلاقة الصحيحة بين الإحداثيات الكارتيزية والقطبية:', o: ['x = r cosθ و y = r sinθ', 'x = r sinθ و y = r cosθ', 'x = r tanθ', 'r = x + y'], a: 0, why: 'ص 6 الشكل 3.' }],
  parts: [{ id: 'g11_v_coord', n: 'الإحداثيات الكارتيزية والقطبية + مثال 1' }] });
M8.merge({ id: 'g11_c1_scalar', ch: 51, reg: X11, sec: '1-3 الكميات القياسية والكميات المتجهة', page: 7, kind: 'نشاط',
  title: 'الكميات القياسية والمتجهة وتمثيل المتجه بسهم',
  desc: 'نصنّف الكميات الفيزيائية إلى قياسية ومتجهة (سؤال ص 8)، ثم نمثل المتجه بسهم طوله بمقياس رسم واتجاهه بالزاوية θ أو بالجهات الجغرافية، ونحل مثال 2.',
  tags: 'كمية قياسية متجهة سهم اتجاه',
  fact: ['مقدار الكمية المتجهة |A| هو كمية قياسية، ويكون دائماً موجباً لأنه قيمة مطلقة (ص 7).', 'نرمز للكمية المتجهة برمز فوقه سهم صغير للدلالة على كونها متجهة، مثل القوة والسرعة والتعجيل (ص 7).'],
  quiz: [
    { q: 'أيّ الكميات الآتية متجهة؟', o: ['التعجيل', 'الزمن', 'الشحنة الكهربائية', 'المسافة'], a: 0, why: 'سؤال ص 8.' },
    { q: 'قوة 3 N باتجاه الغرب تصنع مع الاتجاه الموجب للمحور x زاوية:', o: ['180°', '90°', '0°', '270°'], a: 0, why: 'مثال 2 ص 8.' },
    { q: 'سرعة 5 m/s باتجاه 37° غرب الشمال تصنع مع x الموجب زاوية:', o: ['127°', '37°', '53°', '217°'], a: 0, why: 'θ = 37° + 90°.' },
    { q: 'مقدار المتجه |A|:', o: ['كمية قياسية موجبة دائماً', 'كمية متجهة', 'قد يكون سالباً', 'يساوي صفراً دائماً'], a: 0, why: 'التعريف ص 7.' }],
  parts: [{ id: 'g11_v_classify', n: 'صنّف الكميات: قياسية أم متجهة' }, { id: 'g11_v_dir', n: 'تمثيل المتجه بسهم واتجاهه + مثال 2' }] });
M8.merge({ id: 'g11_c1_prop', ch: 51, reg: X11, sec: '1-4 بعض خصائص المتجهات', page: 9, kind: 'نشاط',
  title: 'خصائص المتجهات: التساوي وسالب المتجه والضرب بكمية قياسية',
  desc: 'ننقل متجهاً موازياً لنفسه فيبقى مساوياً لأصله، ونرسم سالب المتجه ونجمعه معه فنحصل على الصفر، ونضرب المتجه بعدد k فيتغير طوله أو ينعكس، ونجيب عن سؤال فكّر ص 14.',
  tags: 'تساوي المتجهات سالب المتجه ضرب بكمية قياسية',
  fact: ['يقال عن متجهين إنهما متساويان إذا كان لهما المقدار نفسه والاتجاه نفسه بغض النظر عن نقطة بداية كل منهما (ص 9).', 'من أمثلة ضرب المتجه بكمية قياسية: القانون الثاني لنيوتن F = m a وعلاقة القوة الكهربائية بالمجال F = q E (ص 10).'],
  quiz: [
    { q: 'في جدول فكّر ص 14: المتجه A (100 m باتجاه 30° شمال الشرق) يساوي المتجه:', o: ['D: 100 m باتجاه 60° شرق الشمال', 'C: 100 m باتجاه 30° جنوب الشرق', 'B: 100 m باتجاه 30° جنوب الغرب', 'E: 100 m باتجاه 60° غرب الجنوب'], a: 0, why: '30° شمال الشرق هو نفسه 60° شرق الشمال.' },
    { q: 'المتجه وسالبه:', o: ['متساويان مقداراً ومتعاكسان اتجاهاً', 'متساويان مقداراً واتجاهاً', 'مختلفان مقداراً', 'متعامدان'], a: 0, why: 'ص 9 الشكل 11.' },
    { q: 'عند ضرب المتجه A بالعدد 3 فإن:', o: ['مقداره يصبح 3|A| ويبقى باتجاهه', 'ينعكس اتجاهه', 'يبقى مقداره نفسه', 'يصبح عمودياً عليه'], a: 0, why: 'ص 10 الشكل 12.' },
    { q: 'س1 فقرة 3: أي زوج من المتجهات K و L و M و N في الشكل متساويان؟', o: ['K و L', 'K و M', 'L و M', 'N و L'], a: 0, why: 'ص 20.' }],
  parts: [{ id: 'g11_v_props', n: 'التساوي والسالب والضرب بعدد + فكّر ص 14' }] });
M8.merge({ id: 'g11_c1_add', ch: 51, reg: X11, sec: '1-5 جمع المتجهات: الطريقة البيانية', page: 10, kind: 'نشاط',
  title: 'جمع المتجهات بيانياً: الذيل على الرأس والإبدال والطرح والمضلع',
  desc: 'نضع ذيل المتجه الثاني عند رأس الأول ونرسم المحصلة من ذيل الأول إلى رأس الثاني، ونتحقق من الإبدال A + B = B + A ، ونرسم A − B و A + A ، ونقيس المحصلة بالمسطرة والمنقلة، ثم نجمع أربعة متجهات بطريقة المضلع.',
  tags: 'جمع المتجهات بيانياً المحصلة الإبدال المضلع',
  fact: ['لأن للكمية المتجهة مقداراً واتجاهاً فإن جمع المتجهات لا يخضع لقاعدة الجمع الجبري كما في الكميات القياسية (ص 10).', 'جمع المتجهات يمتاز بخاصية الإبدال A + B = B + A (ص 11).'],
  quiz: [
    { q: 'س1 فقرة 1: المتجه المحصل لمتجهين A و B يُرسم:', o: ['من ذيل A إلى رأس B', 'من رأس B إلى ذيل A', 'من رأس A إلى رأس B', 'عمودياً على B'], a: 0, why: 'ص 11 الشكل 13b.' },
    { q: 'العلاقة A + B = B + A تسمى خاصية:', o: ['الإبدال', 'التوزيع', 'السالب', 'التساوي'], a: 0, why: 'ص 11.' },
    { q: 'حاصل طرح المتجهين A − B يساوي:', o: ['A + (−B)', 'B − A', 'B + A', '−A − B'], a: 0, why: 'ص 12 الشكل 15.' },
    { q: 'س7: متجهان مقداراهما 12 m و 9 m ومحصلتهما 3 m. الزاوية بينهما:', o: ['180°', '90°', '0°', '60°'], a: 0, why: 'أصغر محصلة عندما يتعاكسان: 12 − 9 = 3.' }],
  parts: [{ id: 'g11_v_graph', n: 'الذيل على الرأس، الإبدال، الطرح، A + A' }, { id: 'g11_v_poly', n: 'جمع ثلاثة متجهات أو أكثر: المضلع' }] });
M8.merge({ id: 'g11_c1_comp', ch: 51, reg: X11, sec: '1-5 تحليل المتجه وإيجاد المحصلة بالتحليل المتعامد', page: 13, kind: 'مثال',
  title: 'تحليل المتجه إلى مركبتيه وجمع المتجهات تحليلياً',
  desc: 'نحلل المتجه إلى مركبتين أفقية وشاقولية ونرى أنهما ظلّاه على المحورين، ونحل مثال 3 ومسألة 4، ثم نجمع متجهين أو ثلاثة بجمع المركبات (مثال 4) ونقارن بقانوني جيب التمام والجيوب، ونطبق ذلك على قارب يعبر نهراً.',
  tags: 'تحليل المتجه مركبات التحليل المتعامد جيب التمام الجيوب قارب نهر',
  fact: ['زاوية المتجه المحصل تساوي الظل العكسي لناتج قسمة المركبة y على المركبة x للمتجه المحصل (ص 15).', 'فكّر ص 15: نطبق نظرية فيثاغورس إذا كانت الزاوية بين المتجهين 90°، وإلا نستعمل قانون جيب التمام أو قانون الجيوب.'],
  quiz: [
    { q: 'متجه مقداره 175 m يميل 50° عن المحور x. مركبته الأفقية:', o: ['112.53 m', '134 m', '175 m', '87.5 m'], a: 0, why: 'مثال 3: 175 × 0.643.' },
    { q: 'مثال 4: محصلة المتجهين 14 cm بزاوية 60° و 20 cm بزاوية 20° تساوي:', o: ['32 cm', '34 cm', '6 cm', '25.79 cm'], a: 0, why: 'R = √(25.79² + 18.96²).' },
    { q: 'مسألة 4: المركبة الأفقية لقوة 25 N تميل 127° عن x:', o: ['−15 N', '15 N', '20 N', '−20 N'], a: 0, why: '−25 × sin 37° = −25 × 0.6.' },
    { q: 'س5: يكون للمتجه مركبتان متساويتان بالمقدار عندما يصنع مع x زاوية:', o: ['45°', '30°', '60°', '90°'], a: 0, why: 'tan 45° = 1.' },
    { q: 'س1 فقرة 2: إزاحة باتجاه الجنوب الشرقي مركبتاها:', o: ['Ax نحو x الموجب و Ay نحو الأسفل', 'Ax نحو x السالب و Ay نحو الأعلى', 'كلتاهما موجبتان', 'كلتاهما سالبتان'], a: 0, why: 'ص 20 الشكل c.' }],
  parts: [{ id: 'g11_v_comp', n: 'تحليل المتجه + مثال 3 + مسألة 4' }, { id: 'g11_v_analytic', n: 'التحليل المتعامد وجيب التمام والجيوب + مثال 4' }, { id: 'g11_v_river', n: 'تطبيق: قارب يعبر نهراً' }] });
M8.merge({ id: 'g11_c1_mult', ch: 51, reg: X11, sec: '1-6 ضرب المتجهات', page: 17, kind: 'مثال',
  title: 'ضرب المتجهات: الضرب القياسي (الشغل) والضرب الاتجاهي (العزم)',
  desc: 'نسحب صندوقاً بحبل مائل فنرى أن الشغل W = F x cosθ ضرب قياسي ونحل مثال 5، ثم ندير مفتاحاً بقوة مائلة فنرى أن |F × X| = X F sinθ متجه عمودي على الصفحة بقاعدة الكف اليمنى، ونحل مثال 6 ومسألة 3 وفكّر ص 19.',
  tags: 'ضرب قياسي نقطي اتجاهي الكف اليمنى شغل عزم',
  fact: ['يسمى الضرب القياسي بهذا الاسم لأن ناتجه كمية قياسية، ويسمى نقطياً لأن إشارة الضرب فيه هي النقطة (ص 17).', 'يسمى الضرب الاتجاهي بهذا الاسم لأن ناتجه كمية متجهة عمودية على المستوي الذي يحوي المتجهين (ص 18).', 'خاصية الإبدال تتحقق في الضرب القياسي A · B = B · A ولا تتحقق في الاتجاهي A × B = −B × A (فكّر ص 19).'],
  quiz: [
    { q: 'مثال 5: قوة 40 N بزاوية 37° فوق الأفق تحرك جسماً 10 m أفقياً. الشغل:', o: ['320 J', '400 J', '240 J', '0 J'], a: 0, why: 'W = 40 × 10 × 4/5.' },
    { q: 'مثال 6: قوة 150 N على ذراع 5 m بزاوية 30°. مقدار F × X:', o: ['375 N.m', '750 N.m', '650 N.m', '30 N.m'], a: 0, why: '5 × 150 × sin 30°.' },
    { q: 'إذا كان A عمودياً على B فإن:', o: ['A · B = 0', 'A × B = 0', 'A · B = AB', 'A = B'], a: 0, why: 'cos 90° = 0 ، فكّر ص 19.' },
    { q: 'العلاقة الصحيحة للضرب الاتجاهي:', o: ['A × B = −B × A', 'A × B = B × A', 'A × A = A²', 'A × B كمية قياسية'], a: 0, why: 'فكّر ص 19.' },
    { q: 'مسألة 2: |A| = 4 و |B| = 5 والزاوية بينهما 73°. الضرب النقطي تقريباً:', o: ['5.85', '19.1', '20', '0'], a: 0, why: '20 × cos 73°.' }],
  parts: [{ id: 'g11_v_dot', n: 'الضرب القياسي والشغل + مثال 5' }, { id: 'g11_v_cross', n: 'الضرب الاتجاهي ومفتاح العزم + مثال 6' }] });
M8.merge({ id: 'g11_c1_review', ch: 51, reg: X11, sec: 'أسئلة الفصل الأول ومسائله', page: 20, kind: 'مثال',
  title: 'أسئلة الفصل الأول ومسائله على الجهاز',
  desc: 'نحل السؤال الأول (ثماني فقرات اختيار من متعدد بأشكالها)، والأسئلة س2–س8، والمسائل الأربع خطوة خطوة مع أشكال تفاعلية للتحقق.',
  tags: 'أسئلة الفصل الأول مسائل',
  fact: ['أسئلة الفصل ومسائله في الصفحات 20–23 تغطي كل أفكار الفصل: الإحداثيات، الجمع، التحليل، والضربين.'],
  quiz: [
    { q: 'س1 فقرة 4: متجهان كل منهما 5 وحدات والزاوية بينهما 120°. محصلتهما:', o: ['5 وحدات', '10 وحدات', '0', '8.66 وحدات'], a: 0, why: 'R² = 25 + 25 + 2×25×cos 120° = 25.' },
    { q: 'س1 فقرة 6: المحصلة عمودية على K = 8 والزاوية بين K و L تساوي 135°. مقدار L:', o: ['8√2 وحدات', '8 وحدات', '4√2 وحدات', '4√3 وحدات'], a: 0, why: 'L cos 45° = 8.' },
    { q: 'س4: إذا كان A + B = 0 فإن:', o: ['B = −A', 'A = B', 'A عمودي على B', 'A = 2B'], a: 0, why: 'متساويان مقداراً ومتعاكسان اتجاهاً.' },
    { q: 'مسألة 3: |A| = 6 و |B| = 4 والزاوية 30°. مقدار A × B:', o: ['12', '24', '20.8', '6'], a: 0, why: '6 × 4 × sin 30°.' }],
  parts: [{ id: 'g11_v_mcq', n: 'س1: اختر العبارة الصحيحة، الفقرات 1 إلى 8' }, { id: 'g11_v_probs', n: 'س2–س8 والمسائل 1–4 خطوة خطوة' }] });
