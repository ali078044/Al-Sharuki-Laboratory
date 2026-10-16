'use strict';
/* ====================== الخامس العلمي — الفصل العاشر: المغناطيسية (ch 60, ص 229–248) ======================
   Merged experiments (book order): g11_c10_field (10-1 أورستد والمجال) · g11_c10_flux (10-2 الفيض + جدول 1 + مثال 1)
   · g11_c10_earth (10-3، 10-4) · g11_c10_charge (10-5، 10-7 + مثالان 2) · g11_c10_wire (10-6 + مثال 3)
   · g11_c10_biot (10-8، 10-9 + مثال 4) · g11_c10_sol (10-10 + مثال 5) · g11_c10_torque (10-11 + مثال 6)
   · g11_c10_hyst (10-12) · g11_c10_review (أسئلة ومسائل ص 245–248).
   Local kit Q60 = Q42 + uniform-field grids (× / •), wire cross-sections, pole blocks, glossy vectors (Q51), easing. MAG9/MF9 (expg9_c2) for magnets. */
const Q60 = Object.assign(Object.create(Q42), {
  MU: 4 * Math.PI * 1e-7,
  f(v, d = 2) { return Q51.f(v, d); },
  sci(v, d = 3, u = '') { return Q31.sci(v, d, u); },
  ez(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  d2r(d) { return d * Math.PI / 180; },
  geo(S, o) { return Q51.geo(S, o); },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#fdf2f8'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  /* light panel (lab sheet) behind a drawing */
  panel(ctx, x, y, w, h, col) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.18)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 5; const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#ffffff'); g.addColorStop(1, col || '#f1f5f9'); ctx.fillStyle = g; rr(ctx, x, y, w, h, 14); ctx.fill(); ctx.restore(); ctx.strokeStyle = 'rgba(100,116,139,.35)'; ctx.lineWidth = 1.2; rr(ctx, x, y, w, h, 14); ctx.stroke(); }); },
  /* wooden table top */
  wood(ctx, x, y, w, h) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 6; const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, '#d6a46c'); g.addColorStop(.5, '#c08a50'); g.addColorStop(1, '#a8713a'); ctx.fillStyle = g; rr(ctx, x, y, w, h, 12); ctx.fill(); ctx.restore();
    ctx.save(); rr(ctx, x, y, w, h, 12); ctx.clip(); ctx.strokeStyle = 'rgba(120,63,4,.18)'; ctx.lineWidth = 1.4; for (let k = 0; k < 14; k++) { const yy = y + (k + .5) * h / 14; ctx.beginPath(); ctx.moveTo(x, yy); for (let xx = x; xx <= x + w; xx += 20) ctx.lineTo(xx, yy + Math.sin(xx * .02 + k * 1.7) * 3); ctx.stroke(); } ctx.restore(); }); },
  /* field perpendicular to the page: out = • (dot) else × */
  perp(ctx, x, y, r, out, col = '#7c3aed', al = 1) { K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = al; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = Math.max(1.3, r * .28); ctx.lineCap = 'round';
    if (out) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, r * .32, 0, TAU); ctx.fill(); } else { const q = r * .72; ctx.beginPath(); ctx.moveTo(x - q, y - q); ctx.lineTo(x + q, y + q); ctx.moveTo(x + q, y - q); ctx.lineTo(x - q, y + q); ctx.stroke(); } ctx.restore(); }); },
  pgrid(ctx, rc, out, sp, col, al = .55, r = 6) { const nx = Math.floor((rc[2] - rc[0]) / sp), ny = Math.floor((rc[3] - rc[1]) / sp), ox = rc[0] + ((rc[2] - rc[0]) - (nx - 1) * sp) / 2, oy = rc[1] + ((rc[3] - rc[1]) - (ny - 1) * sp) / 2;
    for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) Q60.perp(ctx, ox + i * sp, oy + j * sp, r, out, col, al); },
  /* uniform in-plane field lines inside rect rc, direction ang (screen rad), spacing sp; moving chevrons with phase ph */
  ulines(ctx, rc, ang, sp, col = '#2563eb', ph = 0, al = .8) { K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(rc[0], rc[1], rc[2] - rc[0], rc[3] - rc[1]); ctx.clip(); const cx = (rc[0] + rc[2]) / 2, cy = (rc[1] + rc[3]) / 2, R = Math.hypot(rc[2] - rc[0], rc[3] - rc[1]) / 2 + 10, c = Math.cos(ang), s = Math.sin(ang);
    ctx.globalAlpha = al; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.8; const n = Math.floor(R / sp);
    for (let k = -n; k <= n; k++) { const ox = cx - s * k * sp, oy = cy + c * k * sp; ctx.beginPath(); ctx.moveTo(ox - c * R, oy - s * R); ctx.lineTo(ox + c * R, oy + s * R); ctx.stroke();
      for (let t = -R + ((ph % 90) + 90) % 90; t < R; t += 90) { const x = ox + c * t, y = oy + s * t; ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(-5, -5); ctx.lineTo(-2, 0); ctx.lineTo(-5, 5); ctx.closePath(); ctx.fill(); ctx.restore(); } }
    ctx.restore(); }); },
  /* copper wire seen end-on; dir>0 current out of page (•), dir<0 into page (×) */
  wend(ctx, x, y, r, dir, lab) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const g = ctx.createRadialGradient(x - r * .35, y - r * .35, r * .1, x, y, r); g.addColorStop(0, '#fde7c8'); g.addColorStop(.45, '#e08a3c'); g.addColorStop(1, '#7c2d12'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore(); });
    if (dir) Q60.perp(ctx, x, y, r * .55, dir > 0, '#1e293b', 1); if (lab) Q42.T(ctx, lab, x, y + r + 13, { s: 11.5, w: 900, c: '#7c2d12', bg: 'rgba(255,255,255,.85)' }); },
  /* magnet pole block (N red / S blue) */
  pole(ctx, x, y, w, h, lab) { const col = lab === 'N' ? '#dc2626' : '#2563eb'; K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4; const g = w > h ? ctx.createLinearGradient(0, y, 0, y + h) : ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, shade(col, 50)); g.addColorStop(.5, col); g.addColorStop(1, shade(col, -60)); ctx.fillStyle = g; rr(ctx, x, y, w, h, 6); ctx.fill(); ctx.restore(); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(x + 4, y + 4, w > h ? w - 8 : 4, w > h ? 4 : h - 8); });
    Q42.T(ctx, lab, x + w / 2, y + h / 2, { s: Math.min(22, Math.min(w, h) * .55), w: 900, c: '#fff' }); },
  vec(ctx, x0, y0, x1, y1, col, lab, o) { Q51.vec(ctx, x0, y0, x1, y1, col, lab, o); },
  arc(ctx, x, y, r, a0, a1, col, lab, o) { Q51.arc(ctx, x, y, r, a0, a1, col, lab, o); },
  stepChips(S, id, y, x0, lab, onEx, n, bw) { return Q51.stepChips(S, id, y, x0, lab, onEx, n, bw); },
  drawSteps(ctx, list) { Q51.drawSteps(ctx, list); },
  /* small vector-product legend: F = q v × B */
  /* magnitude bar for a reading */
  bar(ctx, x, y, w, t, col, lab) { K.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.35)'; rr(ctx, x, y - 6, w, 12, 6); ctx.fill(); ctx.fillStyle = col; rr(ctx, x, y - 6, Math.max(6, w * clamp(t, 0, 1)), 12, 6); ctx.fill(); }); if (lab) Q42.T(ctx, lab, x + w / 2, y - 16, { s: 10.5, w: 800, c: '#334155' }); }
});

/* ====================== laws ====================== */
LW({ id: 'g11_l10_flux', cat: 60, name: 'الفيض المغناطيسي', fx: '<i>Φ</i><sub>B</sub> = <i>B</i> <i>A</i> cos<i>θ</i> ، <i>B</i> = ' + FR('<i>Φ</i>', '<i>A</i>'), sym: 'θ الزاوية بين المجال B ومتجه المساحة A العمودي على السطح. وحدة الفيض الويبر Wb = T.m² ، و 1 Wb = 10⁸ ماكسويل. وحدة كثافة الفيض التسلا T = Wb/m²', calc: { in: [['B', 'المجال B', 'T', 5.31e-5], ['A', 'المساحة A', 'm²', .0602], ['t', 'الزاوية θ', '°', 53]], out: 'الفيض Φ', u: 'Wb', f: v => v.B * v.A * Math.cos(v.t * Math.PI / 180) } });
LW({ id: 'g11_l10_qvb', cat: 60, name: 'القوة المغناطيسية على شحنة متحركة', fx: '<i>F</i> = |<i>q</i>| <i>v</i> <i>B</i> sin<i>θ</i> ، <i>F</i> = <i>q</i> <i>v</i> × <i>B</i>', sym: 'θ الزاوية بين السرعة والمجال. القوة عظمى عند θ = 90° وصفر عندما تتحرك الشحنة موازية للمجال. اتجاهها بقاعدة الكف اليمنى للشحنة الموجبة وبعكسه للسالبة', calc: { in: [['q', 'الشحنة |q|', 'C', 1.6e-19], ['v', 'السرعة v', 'm/s', 5e6], ['B', 'المجال B', 'T', .4], ['t', 'الزاوية θ', '°', 30]], out: 'القوة F', u: 'N', f: v => v.q * v.v * v.B * Math.sin(v.t * Math.PI / 180) } });
LW({ id: 'g11_l10_ilb', cat: 60, name: 'القوة المغناطيسية على سلك يحمل تياراً', fx: '<i>F</i> = <i>I</i> <i>L</i> <i>B</i> sin<i>θ</i>', sym: 'θ الزاوية بين السلك والمجال. F = ILB عندما يكون السلك عمودياً على المجال، وصفر عندما يوازيه', calc: { in: [['I', 'التيار I', 'A', 20], ['L', 'طول السلك L', 'm', .5], ['B', 'المجال B', 'T', .3], ['t', 'الزاوية θ', '°', 90]], out: 'القوة F', u: 'N', f: v => v.I * v.L * v.B * Math.sin(v.t * Math.PI / 180) } });
LW({ id: 'g11_l10_r', cat: 60, name: 'نصف قطر مسار شحنة في مجال منتظم', fx: '<i>q</i><i>v</i><i>B</i> = ' + FR('<i>m</i><i>v</i>²', '<i>r</i>') + ' ⟸ <i>r</i> = ' + FR('<i>m</i><i>v</i>', '<i>q</i><i>B</i>'), sym: 'عندما تدخل الشحنة عمودياً على مجال منتظم تؤدي القوة المغناطيسية دور القوة المركزية فتتحرك في دائرة', calc: { in: [['m', 'الكتلة m', 'kg', 1.67e-27], ['v', 'السرعة v', 'm/s', 4.69e6], ['q', 'الشحنة q', 'C', 1.6e-19], ['B', 'المجال B', 'T', .35]], out: 'نصف القطر r', u: 'm', f: v => v.m * v.v / (v.q * v.B) } });
LW({ id: 'g11_l10_wire', cat: 60, name: 'قانون بايوت وسافارت لسلك مستقيم', fx: '<i>B</i> = ' + FR('<i>μ</i><sub>0</sub> <i>I</i>', '2π<i>r</i>') + ' ، <i>μ</i><sub>0</sub> = 4π×10<sup>−7</sup> Wb/A.m', sym: 'المجال حول سلك مستقيم طويل يتناسب طردياً مع التيار وعكسياً مع البعد r عن السلك، واتجاهه بقاعدة قبضة اليد اليمنى', calc: { in: [['I', 'التيار I', 'A', 15], ['r', 'البعد r', 'm', 3]], out: 'المجال B', u: 'T', f: v => 2e-7 * v.I / v.r } });
LW({ id: 'g11_l10_two', cat: 60, name: 'القوة بين سلكين متوازيين', fx: FR('<i>F</i>', '<i>L</i>') + ' = ' + FR('<i>μ</i><sub>0</sub> <i>I</i><sub>1</sub> <i>I</i><sub>2</sub>', '2π<i>r</i>'), sym: 'يتجاذب السلكان إذا كان التياران بالاتجاه نفسه ويتنافران إذا تعاكسا. الأمبير: التيار الذي إذا سرى في سلكين متوازيين بينهما 1 m ولّد قوة 2×10⁻⁷ N لكل متر', calc: { in: [['a', 'التيار I₁', 'A', 500], ['b', 'التيار I₂', 'A', 500], ['r', 'البعد r', 'm', .05]], out: 'القوة لوحدة الطول F/L', u: 'N/m', f: v => 2e-7 * v.a * v.b / v.r } });
LW({ id: 'g11_l10_sol', cat: 60, name: 'المجال داخل ملف لولبي', fx: '<i>B</i> = ' + FR('<i>μ</i><sub>0</sub> <i>N</i> <i>I</i>', '<i>L</i>') + ' = <i>μ</i><sub>0</sub> <i>n</i> <i>I</i>', sym: 'n = N/L عدد اللفات لوحدة الطول. المجال داخل الملف منتظم تقريباً، والعلاقة صحيحة قرب المحور وبعيداً عن الطرفين', calc: { in: [['N', 'عدد اللفات N', '', 100], ['L', 'طول الملف L', 'm', .2], ['I', 'التيار I', 'A', 4]], out: 'المجال B', u: 'T', f: v => 4 * Math.PI * 1e-7 * v.N * v.I / v.L } });
LW({ id: 'g11_l10_tau', cat: 60, name: 'عزم الازدواج على ملف في مجال منتظم', fx: '<i>τ</i> = <i>B</i> <i>I</i> <i>A</i> <i>N</i> sin<i>θ</i> ، <i>μ</i> = <i>N</i> <i>I</i> <i>A</i>', sym: 'θ الزاوية بين العمود على مستوي الملف (متجه العزم المغناطيسي μ) والمجال. العزم أعظم عندما يوازي مستوي الملف المجال، وصفر عندما يكون عمودياً عليه', calc: { in: [['B', 'المجال B', 'T', .15], ['I', 'التيار I', 'A', .045], ['A', 'المساحة A', 'm²', 2e-4], ['N', 'عدد اللفات N', '', 100], ['t', 'الزاوية θ', '°', 90]], out: 'العزم τ', u: 'N.m', f: v => v.B * v.I * v.A * v.N * Math.sin(v.t * Math.PI / 180) } });

/* =============== A1 — تجربة أورستد (الشكل 1، ص 229) =============== */
(() => {
  const BE = 3e-5;
  const D = { id: 'g11_b_oersted', page: 229, fig: 'الشكل 1',
    desc: 'لاحظ العالم أورستد سنة 1820 أن إبرة البوصلة تنحرف عن اتجاه الشمال عند وضعها قرب سلك يسري فيه تيار كهربائي، فاستنتج أن التيار الكهربائي يولّد مجالاً مغناطيسياً في الحيز المحيط به. ينحرف اتجاه الإبرة أكثر كلما كبر التيار أو قرب السلك.',
    tags: 'أورستد 1820 بوصلة سلك تيار انحراف الإبرة مجال مغناطيسي حول التيار الشكل 1',
    tools: ['بوصلة', 'سلك نحاسي مستقيم', 'بطارية', 'مفتاح'],
    steps: ['السلك ممدود فوق البوصلة باتجاه شمال–جنوب والإبرة تشير إلى الشمال.', 'أغلق المفتاح: تنحرف الإبرة. زد التيار أو قرّب السلك فيزداد الانحراف.', 'اعكس اتجاه التيار: تنحرف الإبرة إلى الجهة المعاكسة.', 'اجعل السلك شرق–غرب ولاحظ أن الإبرة لا تنحرف لأن مجال السلك يوازي اتجاه الشمال.'],
    concl: ['التيار الكهربائي يولّد مجالاً مغناطيسياً حوله، وهذا ما اكتشفه أورستد سنة 1820.', 'يزداد مجال السلك بزيادة التيار ويقل بزيادة البعد عنه.', 'يعتمد اتجاه انحراف الإبرة على اتجاه التيار.'],
    laws: ['g11_l10_wire'],
    controls: [R('I', 'التيار I', 0, 10, 4, .5, 'A'), R('d', 'بعد السلك عن الإبرة d', 1, 5, 2, .5, 'cm'), TG('sw', 'غلق المفتاح', false, null, 'power'), TG('rev', 'عكس اتجاه التيار', false, null, 'swap'), TG('vec', 'متجهات المجال', true, null, 'vector')],
    setup(S) { S.nd = { a: -Math.PI / 2, w: 0 }; S.dirn = 'ns'; S.Iv = 0; S.ph = 0; },
    bw(S, I) { return 2e-7 * I / (S.p.d / 100); },
    field(S, I) { const u = S.dirn === 'ns' ? [0, 1] : [1, 0], sg = S.p.rev ? -1 : 1, b = D.bw(S, I) * sg; return { wx: -u[1] * b, wy: -(u[0] * b), ex: 0, ey: -BE }; },
    update(S, dt) { S.Iv = Q60.ez(S.Iv, S.p.sw ? S.p.I : 0, dt, 5); S.ph += S.Iv * dt * 22 * (S.p.rev ? -1 : 1); const F = D.field(S, S.Iv); MAG9.turn(S.nd, Math.atan2(F.wy + F.ey, F.wx + F.ex), dt, 40, 4.5); },
    geo(S) { const g = Q60.geo(S); g.cx = (g.x0 + g.x1) / 2; g.cy = g.y0 + (g.y1 - g.y0) * .42; g.R = Math.min(84, (g.x1 - g.x0) * .22); return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), ns = S.dirn === 'ns', on = S.p.sw, sg = S.p.rev ? -1 : 1; Q60.bg(ctx, w, h); Q60.wood(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0);
      Q42.T(ctx, 'الشمال ↑', g.x0 + 44, g.y0 + 18, { s: 11.5, w: 900, c: '#fff', bg: '#b91c1c' });
      MAG9.compass(ctx, g.cx, g.cy, g.R, S.nd.a, {});
      const yb = g.y1 - 46, xr = g.x1 - 30;
      // circuit path (conventional direction from + terminal)
      let path; if (ns) path = [[g.cx, yb], [g.cx, g.y0 + 26], [xr, g.y0 + 26], [xr, yb]]; else path = [[g.x0 + 24, g.cy], [g.x1 - 24, g.cy], [g.x1 - 24, yb], [g.x0 + 24, yb], [g.x0 + 24, g.cy]];
      K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = .25; ctx.strokeStyle = '#000'; ctx.lineWidth = 9; ctx.beginPath(); path.forEach((p, i) => i ? ctx.lineTo(p[0] + 7, p[1] + 9) : ctx.moveTo(p[0] + 7, p[1] + 9)); ctx.stroke(); ctx.restore(); });
      Q33.wire(ctx, path, { thick: 1 });
      const bx = ns ? (g.cx + xr) / 2 : (g.x0 + g.x1) / 2; K.raw(ctx, () => { ctx.fillStyle = '#c08a50'; ctx.fillRect(bx - 70, yb - 22, 140, 44); });
      Q33.cell(ctx, bx - 18, yb, { w: 70, h: 26, pos: ns ? -sg : sg, V: 6, label: '6 V' }); Q33.sw(ctx, bx + 32, bx + 62, yb, on, { label: '' });
      if (S.Iv > .05) { const fp = sg > 0 ? path : path.slice().reverse(); Q33.flow(ctx, fp, S.ph, 'c', { sp: 34 }); }
      const F = D.field(S, S.Iv), mag = Math.hypot(F.wx, F.wy);
      if (S.p.vec) { const k = g.R * .9 / BE / 1.6, cy = g.cy; Q60.vec(ctx, g.cx, cy, g.cx, cy + F.ey * k, '#2563eb', '', { w: 3.5 });
        if (mag > 1e-7) Q60.vec(ctx, g.cx, cy, g.cx + clamp(F.wx * k, -g.R * 1.6, g.R * 1.6), cy + clamp(F.wy * k, -g.R * 1.6, g.R * 1.6), '#16a34a', '', { w: 3.5 });
        Q42.T(ctx, 'مجال الأرض', g.cx + 46, cy + F.ey * k + 4, { s: 10.5, w: 900, c: '#fff', bg: '#2563eb' }); if (mag > 1e-7) { const tx = g.cx + clamp(F.wx * k, -g.R * 1.6, g.R * 1.6), ty = cy + clamp(F.wy * k, -g.R * 1.6, g.R * 1.6); Q42.T(ctx, 'مجال السلك', tx + (Math.abs(F.wx) > Math.abs(F.wy) ? 0 : 46), ty + (Math.abs(F.wx) > Math.abs(F.wy) ? 20 : 0), { s: 10.5, w: 900, c: '#fff', bg: '#16a34a' }); } }
      const dev = Math.round(Math.abs(((S.nd.a + Math.PI / 2) * 180 / Math.PI + 540) % 360 - 180));
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      Q42.card(ctx, S, [{ t: 'سنة 1820 لاحظ أورستد انحراف إبرة البوصلة قرب سلك يحمل تياراً', c: '#334155', w: 800 }, { t: on ? 'المفتاح مغلق: يسري التيار' : 'المفتاح مفتوح: لا تيار', c: on ? '#15803d' : '#b91c1c', w: 900 },
        { t: 'B = μ₀I / 2πd = ' + Q60.sci(D.bw(S, S.Iv)) + ' T', mono: 1, c: '#16a34a', w: 900 }, { t: 'B(earth) ≈ 3×10⁻⁵ T', mono: 1, c: '#2563eb', w: 800 }, { t: 'انحراف الإبرة عن الشمال: ' + dev + '°', c: '#be123c', w: 900 },
        { t: ns ? 'السلك شمال–جنوب: مجاله عمودي على مجال الأرض فتنحرف الإبرة' : 'السلك شرق–غرب: مجاله يوازي مجال الأرض فلا تنحرف الإبرة جانبياً', c: '#64748b', s: 11.5 }], { title: 'تجربة أورستد', y: 64, wd: 304 });
      Q42.banner(ctx, w, on ? 'غيّر التيار أو اعكسه وراقب الإبرة' : 'اضغط المفتاح لإغلاق الدائرة');
    },
    chips(S, g) { return Q42.chips(S, 'dir', [['ns', 'السلك شمال–جنوب'], ['ew', 'السلك شرق–غرب']], g.h - 84, S.dirn, (S2, k) => { S2.dirn = k; }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), ns = S.dirn === 'ns', yb = g.y1 - 46, xr = g.x1 - 30, bx = ns ? (g.cx + xr) / 2 : (g.x0 + g.x1) / 2;
      return [{ id: 'sw', x: bx + 47, y: yb, w: 60, h: 40, axis: 'none', idle: 'اضغط ✋', tip: 'المفتاح', click: S2 => setParam(S2, 'sw', !S2.p.sw) },
        { id: 'dd', x: ns ? g.cx : g.x0 + 60, y: ns ? g.y0 + 60 : g.cy, r: 22, axis: ns ? 'x' : 'y', hint: false, tip: 'اسحب لتغيير التيار', drag: (S2, d) => { const t = ns ? (d.x - g.x0) / (g.x1 - g.x0) : 1 - (d.y - g.y0) / (g.y1 - g.y0); setParam(S2, 'I', clamp(Math.round(t * 20) / 2, 0, 10)); if (!S2.p.sw) setParam(S2, 'sw', true); } }].concat(D.chips(S, g)); },
    readings(S) { const F = D.field(S, S.Iv), dev = Math.round(Math.abs(((S.nd.a + Math.PI / 2) * 180 / Math.PI + 540) % 360 - 180)); return [rd('التيار', Q60.f(S.p.sw ? S.p.I : 0, 1) + ' A'), rd('مجال السلك', Q60.sci(Math.hypot(F.wx, F.wy)) + ' T'), rd('انحراف الإبرة', dev + '°')]; },
    explain(S) { return Q26.ex('عند إغلاق الدائرة تدور إبرة البوصلة عن اتجاه الشمال، وتنحرف بالعكس عند عكس التيار.', 'التيار يولّد مجالاً مغناطيسياً حول السلك، فتستقر الإبرة باتجاه محصلة مجال الأرض ومجال السلك. وكلما كبر التيار أو قلّ البعد كبر مجال السلك وزاد الانحراف.', 'المحرك الكهربائي والجرس والسماعة كلها تعمل لأن التيار يولّد مجالاً مغناطيسياً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — المجال المغناطيسي وخطوطه حول مغناطيس (الشكل 2، 10-1 و 10-2) =============== */
(() => {
  const D = { id: 'g11_b_bar', page: 229, fig: 'الشكل 2',
    desc: 'المجال المغناطيسي هو الحيز المحيط بالمغناطيس الذي تظهر فيه آثار قوته على شحنة متحركة أو على مغناطيس آخر. واتجاه المجال عند أي نقطة هو اتجاه القطب الشمالي لإبرة بوصلة صغيرة موضوعة فيها. خطوط المجال مقفلة تخرج من القطب الشمالي وتدخل القطب الجنوبي وتكمل مسارها داخل المغناطيس، ولا يوجد قطب مغناطيسي منفرد.',
    tags: 'المجال المغناطيسي خطوط المجال بوصلات حول مغناطيس ساق اتجاه المجال القطب الشمالي الجنوبي خطوط مقفلة الشكل 2',
    tools: ['مغناطيس ساق', 'بوصلات صغيرة', 'ورقة بيضاء'],
    steps: ['اسحب المغناطيس أو أدره من المقبض الأخضر: تدور البوصلات المحيطة به.', 'اسحب بوصلة الاختبار الكبيرة: يشير قطبها الشمالي (الأحمر) إلى اتجاه المجال.', 'لاحظ أن الخطوط تخرج من N وتدخل S وتتقارب قرب القطبين حيث المجال أقوى.', 'فعّل «الخطوط داخل المغناطيس» لترى أن الخطوط مقفلة.'],
    concl: ['اتجاه المجال عند نقطة هو اتجاه القطب الشمالي لإبرة البوصلة فيها.', 'الخطوط تخرج من القطب الشمالي وتدخل الجنوبي وتكمل داخل المغناطيس من S إلى N فهي مقفلة.', 'تقارب الخطوط يدل على قوة المجال، ولا تتقاطع خطوط المجال أبداً.'],
    laws: [],
    controls: [R('str', 'قوة المغناطيس', .4, 1.6, 1, .1, ''), TG('lines', 'خطوط المجال', true, null, 'bfield'), TG('ring', 'بوصلات حول المغناطيس', true, null, 'compass'), TG('inner', 'الخطوط داخل المغناطيس', false, null, 'layers')],
    setup(S) { S.m = null; S.pr = null; S.nd = { a: 0, w: 0 }; S.rg = []; },
    geo(S) { const g = Q60.geo(S); g.rc = [g.x0, g.y0, g.x1, g.y1]; if (!S.m) S.m = MAG9.bar((g.x0 + g.x1) / 2, g.y0 + (g.y1 - g.y0) * .42, 0, 150, 34, 1); if (!S.pr) S.pr = { x: (g.x0 + g.x1) / 2 + 30, y: g.y1 - 70, tx: 0, ty: 0 }; return g; },
    ringPts(S) { const m = S.m, out = []; for (let k = 0; k < 12; k++) { const a = k * TAU / 12, ca = Math.cos(a), sa = Math.sin(a), u = [ca * 125, sa * 70], c = Math.cos(m.a), s = Math.sin(m.a); out.push([m.x + u[0] * c - u[1] * s, m.y + u[0] * s + u[1] * c]); } return out; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); S.m.str = Q60.ez(S.m.str, S.p.str, dt, 6); const P = MAG9.prep([S.m]);
      const b = MAG9.Bp(P, S.pr.x, S.pr.y); MAG9.turn(S.nd, Math.atan2(b[1], b[0]), dt, 50, 6);
      D.ringPts(S).forEach((p, i) => { const r = S.rg[i] || (S.rg[i] = { a: 0, w: 0 }); const bb = MAG9.Bp(P, p[0], p[1]); MAG9.turn(r, Math.atan2(bb[1], bb[0]), dt, 60, 6); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), m = S.m; Q60.bg(ctx, w, h); Q60.panel(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, '#eef2ff');
      MF9.draw(ctx, S, 'bar', [m], g.rc, { lines: S.p.lines, n: Math.round(14 * clamp(m.str, .4, 1.6)), inner: S.p.inner, col: '#0e7490' });
      if (S.p.ring) D.ringPts(S).forEach((p, i) => { if (p[0] > g.x0 + 12 && p[0] < g.x1 - 12 && p[1] > g.y0 + 12 && p[1] < g.y1 - 12) MAG9.miniCompass(ctx, p[0], p[1], 13, (S.rg[i] || { a: 0 }).a); });
      MAG9.compass(ctx, S.pr.x, S.pr.y, 30, S.nd.a, {});
      const RD = MF9.rotDrag('rot', m); MF9.knob(ctx, RD);
      const b = MAG9.B([m], S.pr.x, S.pr.y), T = MAG9.tesla(b), Bm = Math.hypot(T[0], T[1]);
      Q42.card(ctx, S, [{ t: 'المجال المغناطيسي: الحيز المحيط بالمغناطيس الذي تظهر فيه قوته على شحنة متحركة أو مغناطيس آخر', c: '#334155', w: 800 }, { t: 'اتجاه المجال = اتجاه القطب الشمالي لإبرة البوصلة', c: '#be123c', w: 900 },
        { t: 'الخطوط تخرج من N وتدخل S وتكتمل داخل المغناطيس: مقفلة', c: '#0e7490', w: 800 }, { t: 'لا يوجد قطب مغناطيسي منفرد', c: '#7c3aed', w: 800 }, { t: 'المجال عند بوصلة الاختبار:', c: '#0f172a', w: 800 }, { t: 'B ≈ ' + Q60.sci(Bm, 2) + ' T', mono: 1, c: '#0f172a', w: 900 }], { title: 'المجال المغناطيسي', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب المغناطيس أو بوصلة الاختبار');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), b = [g.x0 + 80, g.y0 + 40, g.x1 - 80, g.y1 - 40];
      return [Object.assign(MF9.magDrag('mag', S.m, b, { idle: 'اسحب ✋' }), {}), MF9.rotDrag('rot', S.m),
        { id: 'pr', x: S.pr.x, y: S.pr.y, r: 30, axis: 'xy', keep: true, hint: false, tip: 'بوصلة الاختبار', drag: (S2, d) => { S2.pr.x = clamp(d.x, g.x0 + 30, g.x1 - 30); S2.pr.y = clamp(d.y, g.y0 + 30, g.y1 - 30); } }]; },
    readings(S) { if (!S.m) return []; const b = MAG9.B([S.m], S.pr.x, S.pr.y), T = MAG9.tesla(b); return [rd('المجال عند البوصلة', Q60.sci(Math.hypot(T[0], T[1]), 2) + ' T'), rd('اتجاه الإبرة', Math.round(((-S.nd.a * 180 / Math.PI) % 360 + 360) % 360) + '°')]; },
    explain(S) { return Q26.ex('البوصلات الصغيرة تصطف على خطوط منحنية تخرج من القطب الشمالي وتدخل الجنوبي.', 'كل إبرة مغناطيس صغير يدور حتى يوازي المجال عند موضعه، فاتجاه قطبها الشمالي هو اتجاه المجال. والخطوط تتقارب قرب القطبين لأن المجال هناك أقوى.', 'يستعمل المستكشفون البوصلة لتحديد الاتجاهات لأن إبرتها تتبع خطوط مجال الأرض.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — الفيض المغناطيسي وكثافته + جدول 1 + مثال 1 (الشكل 3، ص 230–231) =============== */
(() => {
  const SRC = { ex1: ['مثال 1', 5.31e-5], earth: ['سطح الأرض', .5e-4], bar: ['مغناطيس ساق', 1e-2], mri: ['جهاز MRI', 2], sc: ['مغناطيس فائق', 30] };
  const EX = { q: 'ورقة أبعادها 21.5 cm × 28 cm على منضدة أفقية، والمجال الأرضي 5.31×10⁻⁵ T يصنع 37° مع الأفق نحو الأسفل. احسب الفيض خلالها', lines: ['A = 0.215 × 0.28 = 6.02×10⁻² m²', 'متجه المساحة عمودي على الورقة نحو الأسفل', 'المجال يصنع 37° مع الأفق إذن:', 'θ = 90° − 37° = 53°', 'Φ = B A cos θ', 'Φ = 5.31×10⁻⁵ × 6.02×10⁻² × cos 53°', 'Φ = 5.31×10⁻⁵ × 6.02×10⁻² × 0.6', 'Φ = 1.92×10⁻⁶ T.m²'] };
  const D = { id: 'g11_b_flux', page: 230, fig: 'الشكل 3 + الجدول 1 + مثال 1',
    desc: 'الفيض المغناطيسي Φ خلال سطح يتناسب مع عدد خطوط المجال التي تخترقه: Φ = B A cosθ حيث θ الزاوية بين المجال ومتجه المساحة العمودي على السطح. يكون الفيض صفراً عندما يوازي السطح الخطوط، وأعظم ما يمكن عندما يكون عمودياً عليها. وحدة الفيض الويبر (Wb = T.m²) وكثافة الفيض B = Φ/A بوحدة التسلا (T = Wb/m²).',
    tags: 'الفيض المغناطيسي كثافة الفيض ويبر تسلا ماكسويل متجه المساحة Φ=BAcosθ الجدول 1 مثال 1 ورقة 21.5 28 الشكل 3',
    tools: ['خطوط مجال منتظم', 'لوح مستطيل (ورقة)', 'منقلة'],
    steps: ['أدر الورقة بمنزلق الزاوية θ أو من اللوحة الجانبية.', 'الخطوط البرتقالية هي التي تخترق الورقة: عدّها وقارنها بقيمة Φ.', 'عند θ = 90° تصبح الورقة موازية للخطوط فلا يخترقها خط: Φ = 0.', 'اختر مصدراً من الجدول 1 فتتغير كثافة الخطوط، ثم حل مثال 1 خطوة خطوة.'],
    concl: ['Φ = B A cosθ ، و θ بين المجال ومتجه المساحة.', 'الفيض أعظم عندما يكون السطح عمودياً على الخطوط وصفر عندما يوازيها.', 'B = Φ / A ووحدتها T = Wb/m² ، و 1 Wb = 10⁸ ماكسويل.', 'مثال 1: Φ = 1.92×10⁻⁶ T.m².'],
    laws: ['g11_l10_flux'],
    controls: [R('th', 'الزاوية θ بين B ومتجه المساحة', 0, 180, 0, 1, '°'), R('a', 'عرض الورقة', 5, 30, 21.5, .5, 'cm'), R('b', 'طول الورقة', 5, 30, 28, .5, 'cm'), TG('nv', 'متجه المساحة A', true, null, 'vector')],
    setup(S) { S.src = 'ex1'; S.vt = S.p.th; S.va = S.p.a; S.vb = S.p.b; S.sp = 40; S.ph = 0; S.ex = 0; S.k = 0; },
    B(S) { return SRC[S.src][1]; },
    spx(S) { return clamp(24 - 4 * Math.log10(D.B(S) / 1e-5), 10, 24); },
    update(S, dt) { S.vt = Q60.ez(S.vt, S.p.th, dt, 8); S.va = Q60.ez(S.va, S.p.a, dt, 8); S.vb = Q60.ez(S.vb, S.p.b, dt, 8); S.sp = Q60.ez(S.sp, D.spx(S), dt, 5); S.ph += dt * 40; },
    geo(S) { const g = Q60.geo(S); g.cx = (g.x0 + g.x1) / 2 + 10; g.cy = g.y0 + (g.y1 - g.y0) * .43; g.sy = g.y1 - 40; return g; },
    P(g, X, Y, Z) { return [g.cx + X, g.cy + Z - Y * .42]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), th = Q60.d2r(S.vt), k = 5.4, a = S.va * k / 2, b = S.vb * k / 2, sp = S.sp, ct = Math.cos(th), st = Math.sin(th), Wl = (g.x1 - g.x0) / 2 + 40;
      Q60.bg(ctx, w, h); Q60.panel(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, '#eff6ff');
      const rc = [g.x0 + 2, g.y0 + 2, g.x1 - 2, g.y1 - 2], nz = Math.floor(Math.min(g.cy - g.y0 - 20, g.sy - 40 - g.cy) / sp), L = [];
      for (let q = -nz; q <= nz; q++) L.push(q * sp);
      const thru = L.filter(Z => Math.abs(Z) <= a * Math.abs(ct) + .01), rowsY = Math.floor(2 * b / sp) + 1;
      K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(rc[0], rc[1], rc[2] - rc[0], rc[3] - rc[1]); ctx.clip();
        L.forEach(Z => { const p0 = D.P(g, -Wl, 0, Z), p1 = D.P(g, Wl, 0, Z); ctx.strokeStyle = 'rgba(37,99,235,.75)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke(); });
        const cn = [[-a, -b], [a, -b], [a, b], [-a, b]].map(([s, t]) => D.P(g, -s * st, t, s * ct));
        ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 10; const gr = ctx.createLinearGradient(cn[0][0], cn[0][1], cn[2][0], cn[2][1]); gr.addColorStop(0, 'rgba(254,249,195,.82)'); gr.addColorStop(1, 'rgba(253,224,71,.7)'); ctx.fillStyle = gr; ctx.beginPath(); cn.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.restore(); ctx.strokeStyle = '#a16207'; ctx.lineWidth = 2; ctx.beginPath(); cn.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke();
        thru.forEach(Z => { const s = Math.abs(ct) > 1e-3 ? Z / ct : 0, Xi = -s * st, pi = D.P(g, Xi, 0, Z), p1 = D.P(g, Wl, 0, Z); ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(pi[0], pi[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke(); ctx.fillStyle = '#c2410c'; ctx.beginPath(); ctx.arc(pi[0], pi[1], 3.4, 0, TAU); ctx.fill(); });
        L.forEach(Z => { const on = thru.includes(Z); ctx.fillStyle = on ? '#ea580c' : '#1d4ed8'; for (let X = -Wl + (S.ph % 70); X < Wl; X += 70) { const p = D.P(g, X, 0, Z); ctx.save(); ctx.translate(p[0], p[1]); ctx.beginPath(); ctx.moveTo(7, 0); ctx.lineTo(-5, -5); ctx.lineTo(-2, 0); ctx.lineTo(-5, 5); ctx.closePath(); ctx.fill(); ctx.restore(); } });
        ctx.restore(); });
      if (S.p.nv) { const o = D.P(g, 0, 0, 0), e = D.P(g, ct * 95, 0, st * 95); Q60.vec(ctx, o[0], o[1], e[0], e[1], '#16a34a', 'A', { w: 4 }); }
      Q42.T(ctx, 'B →', g.x1 - 30, g.y0 + 18, { s: 14, w: 900, c: '#2563eb' });
      Q42.T(ctx, 'θ = ' + Math.round(S.vt) + '°', g.x0 + 50, g.y0 + 20, { s: 13, w: 900, c: '#be123c', bg: 'rgba(255,255,255,.9)' });
      Q41.slider(ctx, g.x0 + 40, g.x1 - 40, g.sy, S.p.th / 180, 'أدر الورقة: θ من 0° إلى 180°', '#be123c');
      const B = D.B(S), A = S.p.a * S.p.b * 1e-4, phi = B * A * Math.cos(Q60.d2r(S.p.th));
      const C = D.chips(S, g); Q42.drawChips(ctx, C.s); Q60.drawSteps(ctx, C.e);
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: 'مثال 1 ص 231' }, EX, { k: S.k }), { y: 64, x: w - 12, wd: 312 });
      else Q42.card(ctx, S, [{ t: 'Φ = B A cos θ', mono: 1, c: '#0f172a', w: 900 }, { t: 'B = ' + Q60.sci(B) + ' T', mono: 1, c: '#2563eb', w: 800 }, { t: 'A = ' + Q60.sci(A) + ' m²', mono: 1, c: '#a16207', w: 800 }, { t: 'Φ = ' + Q60.sci(phi) + ' Wb', mono: 1, c: '#ea580c', w: 900 },
        { t: 'الخطوط المخترقة في هذا المستوي: ' + thru.length, c: '#ea580c', w: 900 }, { t: 'الجدول 1: قيم تقريبية للمجال', c: '#be123c', w: 900 }, { t: 'مغناطيس فائق التوصيل: 30 T', c: '#334155', s: 11.5 }, { t: 'جهاز الرنين المغناطيسي: 2 T', c: '#334155', s: 11.5 }, { t: 'مغناطيس ساق وسطح الشمس: 10⁻² T', c: '#334155', s: 11.5 }, { t: 'سطح الأرض: 0.5×10⁻⁴ T', c: '#334155', s: 11.5 }, { t: 'دماغ الإنسان: 10⁻¹³ T', c: '#334155', s: 11.5 }], { title: 'الفيض المغناطيسي', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'أدر الورقة وعدّ الخطوط المخترقة');
    },
    chips(S, g) { return { s: Q42.chips(S, 'src', Object.keys(SRC).map(k => [k, SRC[k][0]]), g.h - 128, S.src, (S2, k) => { S2.src = k; }, { bw: 130 }), e: Q60.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 1 ص 231', S2 => { S2.src = 'ex1'; setParam(S2, 'th', 53); setParam(S2, 'a', 21.5); setParam(S2, 'b', 28); }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); return [Q41.sdrag('th', g.x0 + 40, g.x1 - 40, g.sy, S.p.th / 180, (S2, t) => setParam(S2, 'th', Math.round(t * 180)), { tip: 'اسحب لتدوير الورقة', extra: { idle: 'اسحب ✋' } })].concat(C.s, C.e); },
    readings(S) { const B = D.B(S), A = S.p.a * S.p.b * 1e-4; return [rd('المجال B', Q60.sci(B) + ' T'), rd('المساحة A', Q60.sci(A) + ' m²'), rd('الزاوية θ', S.p.th + '°'), rd('الفيض Φ', Q60.sci(B * A * Math.cos(Q60.d2r(S.p.th))) + ' Wb')]; },
    record(S) { const B = D.B(S), A = S.p.a * S.p.b * 1e-4; return { t: S.p.th, f: +(B * A * Math.cos(Q60.d2r(S.p.th))).toExponential(3) }; },
    cols: [['t', 'θ (°)'], ['f', 'Φ (Wb)']],
    explain(S) { return Q26.ex('كلما دارت الورقة نحو موازاة الخطوط قلّ عدد الخطوط المخترقة لها حتى ينعدم عند θ = 90°، ثم يعود ويكبر لكن بإشارة سالبة.', 'الفيض يعتمد على مسقط المساحة العمودي على المجال A cosθ ، فالمساحة نفسها تستقبل خطوطاً أكثر كلما واجهت المجال.', 'الخلايا الشمسية تواجه الشمس عمودياً لتستقبل أكبر قدر من الضوء، بالفكرة نفسها نوجّه الملف عمودياً على المجال لأكبر فيض.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — المجال المغناطيسي الأرضي وزاويتا الميل والانحراف (الشكلان 4 و 5، ص 232) =============== */
(() => {
  const TL = Q60.d2r(11);
  const D = { id: 'g11_b_earth', page: 232, fig: 'الشكلان 4 و 5',
    desc: 'تسلك الأرض سلوك مغناطيس ساق كبير قطبه الجنوبي قرب القطب الجغرافي الشمالي، ومحوره المغناطيسي يميل نحو 11° عن محور دوران الأرض. زاوية الميل هي الزاوية بين اتجاه المجال الأرضي والأفق وتتراوح بين 0° عند خط الاستواء المغناطيسي و 90° عند القطبين المغناطيسيين. وزاوية الانحراف هي الزاوية بين خط الزوال المغناطيسي وخط الزوال الجغرافي، وتنعدم على خط انعدام الانحراف.',
    tags: 'المجال المغناطيسي الأرضي زاوية الميل زاوية الانحراف خط الاستواء المغناطيسي القطب المغناطيسي 11 درجة خط انعدام الانحراف إبرة الميل',
    tools: ['كرة أرضية', 'إبرة الميل', 'بوصلة'],
    steps: ['اسحب إبرة الميل على سطح الأرض من الاستواء نحو القطبين وراقب زاوية الميل.', 'لاحظ أن القطب المغناطيسي الجنوبي للمغناطيس الأرضي يقع قرب القطب الجغرافي الشمالي.', 'اختر «زاوية الانحراف» واسحب الراصد على الخريطة: البوصلة تشير إلى القطب المغناطيسي لا الجغرافي.', 'ضع الراصد على الخط الأخضر: تنعدم زاوية الانحراف.'],
    concl: ['الأرض كمغناطيس ساق يميل محوره نحو 11° عن محور دورانها.', 'زاوية الميل: بين المجال الأرضي والأفق، من 0° عند الاستواء المغناطيسي إلى 90° عند القطبين.', 'زاوية الانحراف: بين خط الزوال المغناطيسي والجغرافي، وتتراوح بين 0° و 180°.', 'خط انعدام الانحراف: الخط الذي تنعدم عليه زاوية الانحراف.'],
    laws: [],
    controls: [R('lat', 'موقع إبرة الميل: خط العرض', -90, 90, 35, 1, '°'), TG('lines', 'خطوط المجال', true, null, 'bfield'), TG('mag', 'المغناطيس الأرضي', true, null, 'magnet'), TG('ax', 'المحوران', true, null, 'labels')],
    setup(S) { S.view = 'dip'; S.vl = S.p.lat; S.nd = { a: 0, w: 0 }; S.ob = { x: .6, y: .3 }; S.cn = { a: 0, w: 0 }; },
    geo(S) { const g = Q60.geo(S); g.cx = (g.x0 + g.x1) / 2; g.cy = g.y0 + (g.y1 - g.y0) * .47; g.R = Math.min(108, (g.x1 - g.x0) * .26); return g; },
    mh() { return [-Math.sin(TL), Math.cos(TL)]; },   // dipole moment direction (screen): toward geographic south, tilted
    Bd(g, x, y) { const m = D.mh(), dx = x - g.cx, dy = y - g.cy, r = Math.hypot(dx, dy) || 1, ux = dx / r, uy = dy / r, md = m[0] * ux + m[1] * uy, k = 1 / (r * r * r); return [(3 * md * ux - m[0]) * k, (3 * md * uy - m[1]) * k]; },
    surf(g, lat) { const a = Q60.d2r(lat); return [g.cx + g.R * Math.cos(a), g.cy - g.R * Math.sin(a)]; },
    dip(g, lat) { const p = D.surf(g, lat), b = D.Bd(g, p[0], p[1]), r = [(p[0] - g.cx) / g.R, (p[1] - g.cy) / g.R], bm = Math.hypot(b[0], b[1]); return { p, b, I: Math.asin(clamp(Math.abs(b[0] * r[0] + b[1] * r[1]) / bm, 0, 1)) * 180 / Math.PI }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); S.vl = Q60.ez(S.vl, S.p.lat, dt, 7); const d = D.dip(g, S.vl); MAG9.turn(S.nd, Math.atan2(d.b[1], d.b[0]), dt, 45, 5.5);
      if (S.view === 'decl') { const M = D.mapG(g), ox = M.cx + S.ob.x * M.r, oy = M.cy + S.ob.y * M.r; MAG9.turn(S.cn, Math.atan2(M.my - oy, M.mx - ox), dt, 40, 5); } },
    mapG(g) { const r = Math.min((g.x1 - g.x0) / 2 - 20, (g.y1 - g.y0) / 2 - 30), cx = (g.x0 + g.x1) / 2, cy = g.y0 + (g.y1 - g.y0) / 2 + 6; return { cx, cy, r, mx: cx + r * .26 * Math.cos(Q60.d2r(60)), my: cy - r * .26 * Math.sin(Q60.d2r(60)) }; },
    globe(ctx, g) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 18; const gr = ctx.createRadialGradient(g.cx - g.R * .35, g.cy - g.R * .4, g.R * .1, g.cx, g.cy, g.R); gr.addColorStop(0, '#7dd3fc'); gr.addColorStop(.6, '#0284c7'); gr.addColorStop(1, '#0c4a6e'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.fill(); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.clip(); ctx.fillStyle = 'rgba(74,222,128,.75)'; const R = g.R; [[-.35, -.45, .32, .22], [.25, -.25, .28, .34], [-.1, .3, .2, .3], [.45, .35, .2, .14], [-.55, .1, .14, .2]].forEach(([x, y, a, b]) => { ctx.beginPath(); ctx.ellipse(g.cx + x * R, g.cy + y * R, a * R, b * R, x, 0, TAU); ctx.fill(); });
      ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.ellipse(g.cx, g.cy - R * .97, R * .42, R * .12, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(g.cx, g.cy + R * .97, R * .42, R * .12, 0, 0, TAU); ctx.fill(); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q60.bg(ctx, w, h); K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.y0, 0, g.y1); gr.addColorStop(0, '#0f172a'); gr.addColorStop(1, '#1e293b'); ctx.fillStyle = gr; rr(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, 14); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.6)'; for (let k = 0; k < 40; k++) { const x = g.x0 + ((k * 97) % (g.x1 - g.x0)), y = g.y0 + ((k * 61) % (g.y1 - g.y0)); ctx.fillRect(x, y, 1.5, 1.5); } });
      const C = D.chips(S, g); Q42.drawChips(ctx, C);
      if (S.view === 'decl') return D.drawDecl(ctx, w, h, S, g);
      const m = D.mh(), ax = [-m[0], -m[1]], pe = [-m[1], m[0]];
      if (S.p.lines) K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0); ctx.clip(); ctx.strokeStyle = 'rgba(56,189,248,.75)'; ctx.fillStyle = '#7dd3fc'; ctx.lineWidth = 1.5;
        [1.35, 1.8, 2.5, 3.6, 5.5].forEach(Lk => [1, -1].forEach(sd => { const L = Lk * g.R, p0 = Math.asin(Math.sqrt(1 / Lk)), pts = []; for (let i = 0; i <= 60; i++) { const ps = p0 + (Math.PI - 2 * p0) * i / 60, r = L * Math.sin(ps) ** 2; pts.push([g.cx + r * (Math.cos(ps) * ax[0] + Math.sin(ps) * sd * pe[0]), g.cy + r * (Math.cos(ps) * ax[1] + Math.sin(ps) * sd * pe[1])]); }
          ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); const q = pts[30], b = D.Bd(g, q[0], q[1]); ctx.save(); ctx.translate(q[0], q[1]); ctx.rotate(Math.atan2(b[1], b[0])); ctx.beginPath(); ctx.moveTo(7, 0); ctx.lineTo(-5, -5); ctx.lineTo(-2, 0); ctx.lineTo(-5, 5); ctx.closePath(); ctx.fill(); ctx.restore(); })); ctx.restore(); });
      D.globe(ctx, g);
      if (S.p.mag) { const mm = MAG9.bar(g.cx, g.cy, Math.atan2(m[1], m[0]), g.R * 1.1, 20, 1); K.raw(ctx, () => { ctx.globalAlpha = .82; }); MAG9.drawMag(ctx, mm, { shadow: false }); K.raw(ctx, () => { ctx.globalAlpha = 1; }); }
      if (S.p.ax) { Q41.line(ctx, [[g.cx, g.cy - g.R * 1.55], [g.cx, g.cy + g.R * 1.55]], '#e2e8f0', 1.6, [6, 5]); Q41.line(ctx, [[g.cx + ax[0] * g.R * 1.5, g.cy + ax[1] * g.R * 1.5], [g.cx - ax[0] * g.R * 1.5, g.cy - ax[1] * g.R * 1.5]], '#fca5a5', 1.6, [6, 5]);
        Q42.T(ctx, 'القطب الجغرافي الشمالي', g.cx - 70, g.cy - g.R * 1.55 + 4, { s: 11, w: 900, c: '#0f172a', bg: '#e2e8f0' }); Q42.T(ctx, 'المحور المغناطيسي', g.cx + ax[0] * g.R * 1.5 + 58, g.cy + ax[1] * g.R * 1.5 + 4, { s: 10.5, w: 900, c: '#fff', bg: '#b91c1c' });
        Q60.arc(ctx, g.cx, g.cy, g.R * 1.3, 90, 90 + 11, '#fca5a5', '11°', { lo: 14, s: 11 }); }
      // dip needle at observer
      const d = D.dip(g, S.vl), nx = d.p[0] + (d.p[0] - g.cx) / g.R * 30, ny = d.p[1] + (d.p[1] - g.cy) / g.R * 30;
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(nx, ny, 24, 0, TAU); ctx.fill(); ctx.stroke(); const ta = Math.atan2(d.p[1] - g.cy, d.p[0] - g.cx) + Math.PI / 2; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.2; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(nx - Math.cos(ta) * 24, ny - Math.sin(ta) * 24); ctx.lineTo(nx + Math.cos(ta) * 24, ny + Math.sin(ta) * 24); ctx.stroke(); ctx.setLineDash([]); MAG9.needle(ctx, nx, ny, S.nd.a, 20, 1, { w: 3.6 }); ctx.restore(); });
      Q41.knob(ctx, d.p[0], d.p[1], '#facc15', 8);
      Q42.card(ctx, S, [{ t: 'الأرض مغناطيس ساق كبير: قطبه الجنوبي قرب القطب الجغرافي الشمالي', c: '#334155', w: 800 }, { t: 'المحور المغناطيسي يميل 11° تقريباً عن محور الدوران', c: '#b91c1c', w: 800 },
        { t: 'خط العرض الجغرافي: ' + Math.round(S.vl) + '°', c: '#0f172a', w: 800 }, { t: 'زاوية الميل: ' + Math.round(d.I) + '°', c: '#be123c', w: 900 }, { t: 'الميل 90° عند القطبين المغناطيسيين و 0° عند الاستواء المغناطيسي', c: '#64748b', s: 11.5 }], { title: 'زاوية الميل', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب إبرة الميل الصفراء على سطح الأرض');
    },
    drawDecl(ctx, w, h, S, g) {
      const M = D.mapG(g), ox = M.cx + S.ob.x * M.r, oy = M.cy + S.ob.y * M.r;
      K.raw(ctx, () => { const gr = ctx.createRadialGradient(M.cx, M.cy, 10, M.cx, M.cy, M.r); gr.addColorStop(0, '#e0f2fe'); gr.addColorStop(1, '#0284c7'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(M.cx, M.cy, M.r, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(74,222,128,.55)'; [[-.4, -.3, .3, .2], [.3, .35, .35, .22], [-.3, .45, .2, .15], [.45, -.4, .18, .25]].forEach(([x, y, a, b]) => { ctx.beginPath(); ctx.ellipse(M.cx + x * M.r, M.cy + y * M.r, a * M.r, b * M.r, x * 2, 0, TAU); ctx.fill(); });
        ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1; for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.arc(M.cx, M.cy, M.r * k / 3.2, 0, TAU); ctx.stroke(); } for (let k = 0; k < 12; k++) { const a = k * TAU / 12; ctx.beginPath(); ctx.moveTo(M.cx, M.cy); ctx.lineTo(M.cx + Math.cos(a) * M.r, M.cy + Math.sin(a) * M.r); ctx.stroke(); }
        ctx.save(); ctx.beginPath(); ctx.arc(M.cx, M.cy, M.r, 0, TAU); ctx.clip(); const ux = M.mx - M.cx, uy = M.my - M.cy, ul = Math.hypot(ux, uy); ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 3; ctx.setLineDash([9, 6]); ctx.beginPath(); ctx.moveTo(M.cx - ux / ul * M.r * 1.2, M.cy - uy / ul * M.r * 1.2); ctx.lineTo(M.cx + ux / ul * M.r * 1.2, M.cy + uy / ul * M.r * 1.2); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); });
      Q41.dot(ctx, M.cx, M.cy, '#0f172a', 7); Q42.T(ctx, 'القطب الجغرافي', M.cx - 4, M.cy + 18, { s: 10.5, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.85)' }); Q41.dot(ctx, M.mx, M.my, '#dc2626', 7); Q42.T(ctx, 'القطب المغناطيسي', M.mx + 10, M.my - 18, { s: 10.5, w: 900, c: '#fff', bg: '#b91c1c' });
      const ag = M.cx - (M.mx - M.cx) / Math.hypot(M.mx - M.cx, M.my - M.cy) * M.r * .7, agy = M.cy - (M.my - M.cy) / Math.hypot(M.mx - M.cx, M.my - M.cy) * M.r * .7; Q42.T(ctx, 'خط انعدام الانحراف', ag, agy + 16, { s: 10.5, w: 900, c: '#fff', bg: '#15803d' });
      Q41.line(ctx, [[ox, oy], [M.cx, M.cy]], '#0f172a', 2, [5, 4]); Q41.line(ctx, [[ox, oy], [M.mx, M.my]], '#dc2626', 2, [5, 4]);
      const aG = Math.atan2(M.cy - oy, M.cx - ox), aM = Math.atan2(M.my - oy, M.mx - ox); let dd = Math.abs((aM - aG) * 180 / Math.PI); if (dd > 180) dd = 360 - dd;
      MAG9.compass(ctx, ox, oy, 26, S.cn.a, { rot: aG + Math.PI / 2 });
      Q42.card(ctx, S, [{ t: 'زاوية الانحراف: الزاوية بين خط الزوال المغناطيسي وخط الزوال الجغرافي', c: '#334155', w: 800 }, { t: 'الخط الأسود: نحو الشمال الجغرافي', c: '#0f172a', s: 11.5 }, { t: 'الخط الأحمر: اتجاه إبرة البوصلة', c: '#dc2626', s: 11.5 },
        { t: 'زاوية الانحراف هنا: ' + Math.round(dd) + '°', c: '#be123c', w: 900 }, { t: 'تتراوح بين 0° و 180° وتنعدم على الخط الأخضر', c: '#15803d', w: 800 }, { t: 'بُعد القطب المغناطيسي مكبّر في الرسم للتوضيح', c: '#64748b', s: 11 }], { title: 'زاوية الانحراف', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب البوصلة على الخريطة');
    },
    chips(S, g) { return Q42.chips(S, 'view', [['dip', 'زاوية الميل'], ['decl', 'زاوية الانحراف']], g.h - 84, S.view, (S2, k) => { S2.view = k; }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      if (S.view === 'decl') { const M = D.mapG(g); return [{ id: 'ob', x: M.cx + S.ob.x * M.r, y: M.cy + S.ob.y * M.r, r: 26, axis: 'xy', keep: true, idle: 'اسحب ✋', tip: 'الراصد', drag: (S2, d) => { let x = (d.x - M.cx) / M.r, y = (d.y - M.cy) / M.r; const l = Math.hypot(x, y); if (l > .92) { x *= .92 / l; y *= .92 / l; } S2.ob.x = x; S2.ob.y = y; } }].concat(C); }
      const p = D.surf(g, S.vl); return [{ id: 'dip', x: p[0], y: p[1], r: 22, axis: 'xy', keep: true, idle: 'اسحب ✋', tip: 'إبرة الميل', drag: (S2, d) => { let a = Math.atan2(g.cy - d.y, d.x - g.cx) * 180 / Math.PI; if (a > 90) a = 180 - a; if (a < -90) a = -180 - a; setParam(S2, 'lat', Math.round(a)); } }].concat(C); },
    readings(S) { if (!S.W) return []; const g = D.geo(S), d = D.dip(g, S.p.lat); return [rd('خط العرض', S.p.lat + '°'), rd('زاوية الميل', Math.round(d.I) + '°')]; },
    explain(S) { return Q26.ex('إبرة الميل تكون أفقية تقريباً قرب الاستواء المغناطيسي، وتقترب من الوضع الشاقولي كلما اقتربنا من القطب المغناطيسي.', 'المجال الأرضي يشبه مجال مغناطيس ساق داخل الأرض: خطوطه أفقية فوق الاستواء المغناطيسي وشاقولية تقريباً عند القطبين. ولأن القطب المغناطيسي لا ينطبق على الجغرافي تنحرف البوصلة عن الشمال الجغرافي بزاوية الانحراف.', 'بعض الطيور تستعين بالمجال المغناطيسي الأرضي في أثناء هجرتها، والملاحون يصححون قراءة البوصلة بزاوية الانحراف.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — القوة المغناطيسية على شحنة متحركة + مثال 2 + س4 (الشكلان 6 و 7، ص 233–234) =============== */
(() => {
  const BD = { right: [1, 0, 0], up: [0, 1, 0], in: [0, 0, -1], out: [0, 0, 1] };
  const CASES = { a: ['الحالة أ', 'in', 0, 0], b: ['الحالة ب', 'up', 180, 1], c: ['الحالة ج', 'out', 0, 1], d: ['الحالة د', 'right', 180, 0] };
  const EX = { q: 'بروتون يتحرك بسرعة 5×10⁶ m/s في مجال 0.4 T باتجاه يصنع 30° مع المجال. احسب القوة والتعجيل علماً أن q = 1.6×10⁻¹⁹ C و m = 1.67×10⁻²⁷ kg', lines: ['F = q v B sin θ', 'F = 1.6×10⁻¹⁹ × 5×10⁶ × 0.4 × sin 30°', 'F = 1.6×10⁻¹⁹ × 5×10⁶ × 0.4 × 0.5', 'F = 1.6×10⁻¹³ N', 'اتجاهها عمودي على v و B بقاعدة الكف اليمنى', 'a = F / m', 'a = 1.6×10⁻¹³ / 1.67×10⁻²⁷', 'a = 9.6×10¹³ m/s²'] };
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const D = { id: 'g11_b_force', page: 233, fig: 'الشكلان 6 و 7 + مثال 2 + الشكل 19',
    desc: 'الشحنة المتحركة في مجال مغناطيسي تتأثر بقوة F = |q| v B sinθ حيث θ الزاوية بين السرعة والمجال. تكون القوة عظمى عندما تتحرك الشحنة عمودياً على المجال، وصفراً عندما تتحرك موازية له. اتجاه القوة عمودي على كل من v و B ويحدد بقاعدة الكف اليمنى للشحنة الموجبة، ويكون معاكساً للشحنة السالبة.',
    tags: 'القوة المغناطيسية شحنة متحركة F=qvBsinθ قاعدة الكف اليمنى بروتون مثال 2 5×10⁶ 0.4 T 30 1.6×10⁻¹³ تعجيل 9.6×10¹³ الشكل 7 الشكل 19 س4',
    tools: ['مجال منتظم', 'شحنة اختبار', 'قاعدة الكف اليمنى'],
    steps: ['اسحب رأس سهم السرعة الأحمر: يتغير اتجاه حركة الشحنة ومقدار سرعتها.', 'اختر اتجاه المجال: يمين أو أعلى في مستوي الصفحة، أو داخل الصفحة ×، أو خارجها •.', 'لاحظ أن القوة عمودية دائماً على v و B ، وتنعدم عندما توازي السرعة المجال.', 'بدّل إشارة الشحنة فتنعكس القوة، ثم جرّب حالات س4 وحل مثال 2.'],
    concl: ['F = |q| v B sinθ ، عظمى عند θ = 90° وصفر عند θ = 0° أو 180°.', 'القوة عمودية على السرعة وعلى المجال معاً، واتجاهها بقاعدة الكف اليمنى للشحنة الموجبة.', 'تنعكس القوة إذا كانت الشحنة سالبة.', 'مثال 2: F = 1.6×10⁻¹³ N و a = 9.6×10¹³ m/s².'],
    laws: ['g11_l10_qvb'],
    controls: [R('v', 'السرعة v بوحدة 10⁶ m/s', 0, 10, 5, .5, ''), R('B', 'المجال B', 0, 1, .4, .05, 'T'), R('ph', 'اتجاه السرعة', 0, 359, 30, 1, '°'), TG('neg', 'شحنة سالبة', false, null, 'charges')],
    setup(S) { S.bd = 'right'; S.vp = S.p.ph; S.vv = S.p.v; S.fz = 0; S.fx = 0; S.fy = 0; S.pulse = 0; S.ex = 0; S.k = 0; S.cs = ''; },
    F(S, ph, v) { const a = Q60.d2r(ph), vv = [Math.cos(a), Math.sin(a), 0], b = BD[S.bd], c = cross(vv, b), q = S.p.neg ? -1 : 1, k = 1.6e-19 * v * 1e6 * S.p.B; return [c[0] * q * k, c[1] * q * k, c[2] * q * k]; },
    theta(S) { const a = Q60.d2r(S.p.ph), b = BD[S.bd]; return Math.acos(clamp(Math.cos(a) * b[0] + Math.sin(a) * b[1], -1, 1)) * 180 / Math.PI; },
    update(S, dt) { S.vp = Q51.eza(S.vp, S.p.ph, dt, 9); S.vv = Q60.ez(S.vv, S.p.v, dt, 9); const F = D.F(S, S.vp, S.vv), Fm = 1.6e-19 * 10e6 * 1; S.fx = Q60.ez(S.fx, F[0] / Fm, dt, 8); S.fy = Q60.ez(S.fy, F[1] / Fm, dt, 8); S.fz = Q60.ez(S.fz, F[2] / Fm, dt, 8); S.pulse += dt; },
    geo(S) { const g = Q60.geo(S, { bot: 194 }); g.cx = (g.x0 + g.x1) / 2; g.cy = g.y0 + (g.y1 - g.y0) * .45; g.vk = 19; return g; },
    dname(F) { const m = Math.hypot(F[0], F[1], F[2]); if (m < 1e-30) return 'لا قوة'; if (Math.abs(F[2]) > m * .7) return F[2] > 0 ? 'خارج الصفحة •' : 'داخل الصفحة ×'; const a = Math.round(Q51.ang(F[0], F[1])); return a === 0 ? 'نحو اليمين' : a === 90 ? 'نحو الأعلى' : a === 180 ? 'نحو اليسار' : a === 270 ? 'نحو الأسفل' : 'باتجاه ' + a + '°'; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), b = BD[S.bd], neg = S.p.neg; Q60.bg(ctx, w, h); Q60.panel(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, '#f5f3ff');
      const rc = [g.x0 + 6, g.y0 + 6, g.x1 - 6, g.y1 - 6];
      if (b[2]) Q60.pgrid(ctx, rc, b[2] > 0, 44, '#7c3aed', .45 + .4 * S.p.B, 7); else Q60.ulines(ctx, rc, Math.atan2(-b[1], b[0]), 44, '#7c3aed', S.pulse * 30, .35 + .5 * S.p.B);
      Q42.T(ctx, b[2] ? (b[2] > 0 ? 'المجال خارج الصفحة •' : 'المجال داخل الصفحة ×') : 'المجال B في مستوي الصفحة', g.x0 + 110, g.y0 + 20, { s: 11.5, w: 900, c: '#fff', bg: '#7c3aed' });
      const a = Q60.d2r(S.vp), L = S.vv * g.vk, tx = g.cx + Math.cos(a) * L, ty = g.cy - Math.sin(a) * L;
      // ghost trail along velocity
      K.raw(ctx, () => { for (let i = 1; i <= 5; i++) { ctx.fillStyle = (S.p.neg ? 'rgba(37,99,235,' : 'rgba(239,68,68,') + (.32 - i * .055) + ')'; ctx.beginPath(); ctx.arc(g.cx - Math.cos(a) * i * 20, g.cy + Math.sin(a) * i * 20, 16 - i * 1.6, 0, TAU); ctx.fill(); } });
      if (!b[2] && S.p.B > 0) Q60.arc(ctx, g.cx, g.cy, 34, Q51.nd(Math.atan2(b[1], b[0]) * 180 / Math.PI), Q51.nd(Math.atan2(b[1], b[0]) * 180 / Math.PI) + ((Q51.nd(S.vp - Math.atan2(b[1], b[0]) * 180 / Math.PI) + 180) % 360 - 180), '#be123c', 'θ', { lo: 12 });
      Q31.ball(ctx, g.cx, g.cy, 17, neg ? -1 : 1, null);
      Q60.vec(ctx, g.cx, g.cy, tx, ty, '#dc2626', 'v', { w: 4.5, off: 16 }); Q41.knob(ctx, tx, ty, '#dc2626', 8);
      const fm = Math.hypot(S.fx, S.fy), fz = S.fz;
      if (fm > .01) { const kf = 150 * Math.sqrt(fm) / fm; Q60.vec(ctx, g.cx, g.cy, g.cx + S.fx * kf, g.cy - S.fy * kf, '#16a34a', 'F', { w: 5, side: -1 }); }
      if (Math.abs(fz) > .01) { const r = 10 + Math.sqrt(Math.abs(fz)) * 22; Q60.perp(ctx, g.cx + 70, g.cy + 70, r, fz > 0, '#16a34a', 1); Q42.T(ctx, fz > 0 ? 'القوة خارج الصفحة' : 'القوة داخل الصفحة', g.cx + 70, g.cy + 70 + r + 14, { s: 11, w: 900, c: '#fff', bg: '#16a34a' }); }
      const F = D.F(S, S.p.ph, S.p.v), Fm = Math.hypot(F[0], F[1], F[2]), th = D.theta(S);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.b); Q42.drawChips(ctx, C.c); Q60.drawSteps(ctx, C.e);
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: 'مثال 2 ص 234' }, EX, { k: S.k }), { y: 64, x: w - 12, wd: 312 });
      else Q42.card(ctx, S, [{ t: 'F = |q| v B sin θ', mono: 1, c: '#0f172a', w: 900 }, { t: 'θ = ' + Math.round(th) + '°', mono: 1, c: '#be123c', w: 900 }, { t: 'F = ' + Q60.sci(Fm) + ' N', mono: 1, c: '#16a34a', w: 900 }, { t: 'اتجاه القوة: ' + D.dname(F), c: '#16a34a', w: 900 },
        { t: 'الشحنة: ' + (neg ? 'سالبة فالقوة عكس قاعدة الكف اليمنى' : 'موجبة: قاعدة الكف اليمنى'), c: neg ? '#1d4ed8' : '#b91c1c', w: 800 }, { t: 'قاعدة الكف اليمنى: الأصابع باتجاه B والإبهام باتجاه v فتخرج القوة من باطن الكف', c: '#64748b', s: 11.5 }, { t: 'شحنة البروتون 1.6×10⁻¹⁹ C', c: '#64748b', s: 11.5 }].concat(S.cs === 'd' ? [{ t: 'س4 الحالة د: الحركة موازية للمجال فلا قوة', c: '#be123c', w: 900 }] : []), { title: 'القوة على شحنة متحركة', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب رأس سهم السرعة');
    },
    chips(S, g) { return { b: Q42.chips(S, 'bd', [['right', 'المجال يميناً →'], ['up', 'المجال للأعلى ↑'], ['in', 'المجال داخل ×'], ['out', 'المجال خارج •']], g.h - 172, S.bd, (S2, k) => { S2.bd = k; S2.cs = ''; }, { bw: 140 }),
      c: Q42.chips(S, 'cs', Object.keys(CASES).map(k => [k, 'س4 ' + CASES[k][0]]), g.h - 128, S.cs, (S2, k) => { const c = CASES[k]; S2.cs = k; S2.bd = c[1]; setParam(S2, 'ph', c[2]); setParam(S2, 'neg', !!c[3]); S2.ex = 0; }, { bw: 140 }),
      e: Q60.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 2 ص 234', S2 => { S2.bd = 'right'; S2.cs = ''; setParam(S2, 'ph', 30); setParam(S2, 'v', 5); setParam(S2, 'B', .4); setParam(S2, 'neg', false); }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), a = Q60.d2r(S.p.ph), L = S.p.v * g.vk, C = D.chips(S, g);
      return [{ id: 'v', x: g.cx + Math.cos(a) * L, y: g.cy - Math.sin(a) * L, r: 20, axis: 'xy', keep: true, idle: 'اسحب ✋', tip: 'رأس سهم السرعة', drag: (S2, d) => { const dx = d.x - g.cx, dy = g.cy - d.y; setParam(S2, 'ph', Math.round(Q51.ang(dx, dy)) % 360); setParam(S2, 'v', clamp(Math.round(Math.hypot(dx, dy) / g.vk * 2) / 2, 0, 10)); S2.cs = ''; } },
        { id: 'q', x: g.cx, y: g.cy, r: 18, axis: 'none', hint: false, tip: 'اضغط لتبديل إشارة الشحنة', click: S2 => setParam(S2, 'neg', !S2.p.neg) }].concat(C.b, C.c, C.e); },
    readings(S) { const F = D.F(S, S.p.ph, S.p.v), Fm = Math.hypot(F[0], F[1], F[2]); return [rd('الزاوية θ', Math.round(D.theta(S)) + '°'), rd('القوة F', Q60.sci(Fm) + ' N'), rd('الاتجاه', D.dname(F)), rd('تعجيل البروتون', Q60.sci(Fm / 1.67e-27) + ' m/s²')]; },
    explain(S) { return Q26.ex('سهم القوة الأخضر عمودي دائماً على سهم السرعة وعلى المجال، ويختفي عندما توازي السرعة المجال.', 'القوة المغناطيسية حاصل ضرب اتجاهي F = q v × B ، فمقدارها يتناسب مع sinθ واتجاهها عمودي على المستوي الذي يحوي v و B ، وتنعكس مع إشارة الشحنة.', 'شاشات التلفاز القديمة كانت توجّه حزمة الإلكترونات بملفات مغناطيسية لترسم الصورة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — حركة شحنة في مجال منتظم: المسار الدائري (الشكل 10، ص 236 + مسائل 2 و 5 و 6) =============== */
(() => {
  const PT = { p: ['بروتون', 1.67e-27, 1], e: ['إلكترون', 9.11e-31, -1] };
  const PB = { p2: { t: 'مسألة 2 و 5', set: S => { S.pt = 'p'; setParam(S, 'v', 4.69); setParam(S, 'B', .35); setParam(S, 'out', false); }, q: 'بروتون يتحرك في دائرة نصف قطرها 14 cm في مجال 0.35 T عمودي على سرعته. جد سرعته، ثم نصف قطر مسار إلكترون له السرعة نفسها', lines: ['qvB = m v² / r  ⟸  v = q B r / m', 'v = 1.6×10⁻¹⁹ × 0.35 × 0.14 / 1.67×10⁻²⁷', 'v = 4.69×10⁶ m/s', 'للإلكترون: r = m v / q B', 'r = 9.11×10⁻³¹ × 4.69×10⁶ / (1.6×10⁻¹⁹ × 0.35)', 'r = 7.6×10⁻⁵ m'] },
    p6: { t: 'مسألة 6', set: S => { S.pt = 'e'; setParam(S, 'v', 1); setParam(S, 'B', 5); setParam(S, 'out', true); }, q: 'إلكترون يتحرك بسرعة 10⁶ m/s عمودياً على مجال 5 T خارج من الصفحة. جد القوة المؤثرة فيه ونصف قطر مساره', lines: ['F = q v B', 'F = 1.6×10⁻¹⁹ × 10⁶ × 5', 'F = 8×10⁻¹³ N', 'r = m v / q B', 'r = 9×10⁻³¹ × 10⁶ / (1.6×10⁻¹⁹ × 5)', 'r = 1.1×10⁻⁶ m'] } };
  const D = { id: 'g11_b_circle', page: 236, fig: 'الشكل 10 + المسائل 2 و 5 و 6',
    desc: 'عندما تدخل شحنة مجالاً منتظماً عمودياً على سرعتها تكون القوة المغناطيسية عمودية دائماً على السرعة فلا تغير مقدارها بل اتجاهها فقط، وتؤدي دور القوة المركزية: q v B = m v² / r ، فتتحرك الشحنة في دائرة نصف قطرها r = m v / (q B). والشحنة الموجبة في مجال داخل الصفحة تدور عكس عقارب الساعة.',
    tags: 'حركة دائرية شحنة مجال منتظم r=mv/qB قوة مركزية بروتون إلكترون 14 cm 0.35 T 4.69×10⁶ الشكل 10 مسألة 2 مسألة 5 مسألة 6',
    tools: ['مجال منتظم', 'بروتون', 'إلكترون'],
    steps: ['اختر الجسيم وغيّر سرعته والمجال: يتغير نصف قطر المسار r = m v / q B.', 'لاحظ أن سهم القوة الأخضر يتجه دائماً نحو المركز، وسهم السرعة مماس للمسار.', 'اعكس اتجاه المجال أو بدّل الجسيم فينعكس اتجاه الدوران.', 'اختر مسألة واضغط «الحل خطوة خطوة».'],
    concl: ['القوة المغناطيسية عمودية على السرعة فلا تبذل شغلاً ولا تغير الطاقة الحركية.', 'r = m v / q B : يزداد مع الكتلة والسرعة ويقل بزيادة المجال.', 'مسار الإلكترون أصغر بكثير من مسار البروتون بالسرعة نفسها لأن كتلته أصغر.'],
    laws: ['g11_l10_r'],
    controls: [R('v', 'السرعة v بوحدة 10⁶ m/s', .5, 10, 4.69, .01, ''), R('B', 'المجال B', .05, 5, .35, .05, 'T'), TG('out', 'المجال خارج الصفحة', false, null, 'bfield'), TG('trail', 'أثر المسار', true, null, 'trail')],
    setup(S) { S.pt = 'p'; S.pb = 'p2'; S.ang = Math.PI; S.lr = 0; S.tr = []; S.ex = 0; S.k = 0; S.zoom = 1; },
    r(S) { const P = PT[S.pt]; return P[1] * S.p.v * 1e6 / (1.6e-19 * S.p.B); },
    zoomOf(r) { let z = 1; while (r * 1000 * z < 30) z *= 10; while (r * 1000 * z > 175) z /= 10; return z; },
    sense(S) { return PT[S.pt][2] * (S.p.out ? -1 : 1); },   // +1: counter-clockwise on screen
    geo(S) { const g = Q60.geo(S); g.cx = (g.x0 + g.x1) / 2; g.cy = g.y0 + (g.y1 - g.y0) * .45; return g; },
    update(S, dt) { const r = D.r(S), z = D.zoomOf(r); S.zoom = z; const tl = Math.log(r * 1000 * z); S.lr = S.lr ? Q60.ez(S.lr, tl, dt, 6) : tl; S.ang += D.sense(S) * dt * 1.6;
      if (S.W) { const g = D.geo(S), R = Math.exp(S.lr); S.tr.push([g.cx + Math.cos(S.ang) * R, g.cy - Math.sin(S.ang) * R]); if (S.tr.length > 90) S.tr.shift(); } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), R = Math.exp(S.lr || 4), P = PT[S.pt], sn = D.sense(S); Q60.bg(ctx, w, h); Q60.panel(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, '#f5f3ff');
      Q60.pgrid(ctx, [g.x0 + 6, g.y0 + 6, g.x1 - 6, g.y1 - 6], S.p.out, 40, '#7c3aed', .5, 6);
      Q42.T(ctx, S.p.out ? 'المجال خارج الصفحة •' : 'المجال داخل الصفحة ×', g.x0 + 100, g.y0 + 20, { s: 11.5, w: 900, c: '#fff', bg: '#7c3aed' });
      Q41.line(ctx, Array.from({ length: 73 }, (_, i) => [g.cx + Math.cos(i * TAU / 72) * R, g.cy + Math.sin(i * TAU / 72) * R]), 'rgba(15,23,42,.45)', 1.6, [6, 5]);
      if (S.p.trail && S.tr.length > 2) K.raw(ctx, () => { ctx.lineCap = 'round'; for (let i = 1; i < S.tr.length; i++) { ctx.strokeStyle = 'rgba(234,88,12,' + (i / S.tr.length) + ')'; ctx.lineWidth = 4 * i / S.tr.length + 1; ctx.beginPath(); ctx.moveTo(S.tr[i - 1][0], S.tr[i - 1][1]); ctx.lineTo(S.tr[i][0], S.tr[i][1]); ctx.stroke(); } });
      Q41.dot(ctx, g.cx, g.cy, '#0f172a', 4); Q41.line(ctx, [[g.cx, g.cy], [g.cx + R * .707, g.cy - R * .707]], '#0f172a', 1.4); Q42.T(ctx, 'r', g.cx + R * .38, g.cy - R * .38 - 12, { s: 14, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.85)' });
      const px = g.cx + Math.cos(S.ang) * R, py = g.cy - Math.sin(S.ang) * R, tvx = -Math.sin(S.ang) * sn, tvy = -Math.cos(S.ang) * sn;
      Q60.vec(ctx, px, py, px + tvx * 64, py + tvy * 64, '#dc2626', 'v', { w: 4 }); Q60.vec(ctx, px, py, px + (g.cx - px) / R * 52, py + (g.cy - py) / R * 52, '#16a34a', 'F', { w: 4, side: -1 });
      Q31.ball(ctx, px, py, S.pt === 'p' ? 13 : 9, P[2], null);
      const r = D.r(S), F = 1.6e-19 * S.p.v * 1e6 * S.p.B, T = 2 * Math.PI * P[1] / (1.6e-19 * S.p.B);
      if (S.zoom !== 1) Q42.T(ctx, S.zoom > 1 ? 'الرسم مكبّر ' + Q60.sci(S.zoom) + ' مرة' : 'الرسم مصغّر ' + Q60.sci(1 / S.zoom) + ' مرة', g.x0 + 100, g.y1 - 22, { s: 11.5, w: 900, c: '#fff', bg: '#be123c' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.b); Q60.drawSteps(ctx, C.e);
      const pb = PB[S.pb];
      if (S.ex) Q42.steps(ctx, S, { title: pb.t, q: pb.q, lines: pb.lines, k: S.k }, { y: 64, x: w - 12, wd: 312 });
      else Q42.card(ctx, S, [{ t: 'q v B = m v² / r', mono: 1, c: '#0f172a', w: 900 }, { t: 'r = m v / q B', mono: 1, c: '#0f172a', w: 900 }, { t: 'r = ' + Q60.sci(r) + ' m', mono: 1, c: '#ea580c', w: 900 }, { t: 'F = ' + Q60.sci(F) + ' N', mono: 1, c: '#16a34a', w: 800 }, { t: 'T = ' + Q60.sci(T) + ' s', mono: 1, c: '#334155', w: 800 },
        { t: 'الجسيم: ' + P[0] + ' يدور ' + (sn > 0 ? 'عكس عقارب الساعة' : 'مع عقارب الساعة'), c: '#be123c', w: 900 }, { t: 'القوة نحو المركز دائماً فتغير اتجاه السرعة لا مقدارها', c: '#64748b', s: 11.5 }], { title: 'المسار الدائري', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'غيّر السرعة والمجال وراقب نصف القطر');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pt', [['p', 'بروتون +'], ['e', 'إلكترون −']], g.h - 172, S.pt, (S2, k) => { S2.pt = k; S2.tr = []; }, { bw: 150 }),
      b: Q42.chips(S, 'pb', Object.keys(PB).map(k => [k, PB[k].t]), g.h - 128, S.pb, (S2, k) => { S2.pb = k; PB[k].set(S2); S2.ex = 0; S2.k = 0; S2.tr = []; }, { bw: 150 }),
      e: Q60.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { PB[S2.pb].set(S2); S2.tr = []; }, 6) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), R = Math.exp(S.lr || 4);
      return [{ id: 'rr', x: g.cx + R * .707, y: g.cy - R * .707, r: 18, axis: 'xy', keep: true, idle: 'اسحب ✋', tip: 'اسحب لتغيير السرعة', drag: (S2, d) => { const R2 = Math.hypot(d.x - g.cx, d.y - g.cy), f = R2 / Math.max(5, Math.exp(S2.lr)); setParam(S2, 'v', clamp(Math.round(S2.p.v * f * 100) / 100, .5, 10)); } }].concat(C.p, C.b, C.e); },
    readings(S) { const r = D.r(S); return [rd('الجسيم', PT[S.pt][0]), rd('نصف القطر r', Q60.sci(r) + ' m'), rd('القوة F', Q60.sci(1.6e-19 * S.p.v * 1e6 * S.p.B) + ' N')]; },
    explain(S) { return Q26.ex('الجسيم يدور في دائرة، ويكبر نصف قطرها بزيادة السرعة ويصغر بزيادة المجال، ومسار الإلكترون أصغر جداً من مسار البروتون.', 'القوة المغناطيسية عمودية على السرعة فتؤدي دور القوة المركزية q v B = m v² / r فنحصل على r = m v / q B.', 'مطياف الكتلة يفصل النظائر لأن الأثقل يسلك دائرة أكبر، والسيكلوترون يسرّع الجسيمات بالفكرة نفسها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — القوة على سلك يحمل تياراً + مثال 3 (الشكلان 8 و 9، ص 235–236) =============== */
(() => {
  const EX = { q: 'سلك طوله 0.5 m عمودي على مجال مغناطيسي منتظم، يسري فيه تيار 20 A فيتأثر بقوة 3 N. احسب كثافة الفيض B', lines: ['السلك عمودي على المجال: θ = 90°', 'F = I L B sin 90° = I L B', 'B = F / I L', 'B = 3 / (20 × 0.5)', 'B = 0.3 T'] };
  const PRE = { ex: ['مثال 3', S => { setParam(S, 'I', 20); setParam(S, 'L', .5); setParam(S, 'B', .3); setParam(S, 'th', 90); S.perp = 0; }],
    par: ['سلك يوازي المجال', S => { setParam(S, 'th', 0); S.perp = 0; }],
    ang: ['سلك مائل 45°', S => { setParam(S, 'th', 45); S.perp = 0; }],
    pp: ['سلك عمودي على الصفحة', S => { S.perp = 1; }] };
  const M = .5, GR = 9.8;
  const D = { id: 'g11_b_wire', page: 235, fig: 'الشكلان 8 و 9 + مثال 3',
    desc: 'عندما يوضع سلك طوله L يسري فيه تيار I في مجال مغناطيسي B تتأثر الشحنات المنجرفة داخله بقوة، فيتأثر السلك كله بقوة F = I L B sinθ حيث θ الزاوية بين السلك والمجال. تكون القوة عظمى F = I L B عندما يكون السلك عمودياً على المجال، وتنعدم عندما يوازيه. ويحدد اتجاهها بقاعدة الكف اليمنى، فهي عمودية على السلك وعلى المجال.',
    tags: 'القوة على سلك يحمل تيار F=ILBsinθ سرعة الانجراف مغناطيس على شكل حرف U أرجوحة مثال 3 0.5 m 20 A 3 N 0.3 T الشكل 8 الشكل 9',
    tools: ['مغناطيس على شكل حرف U', 'ساق نحاسية معلقة', 'بطارية', 'أسلاك توصيل'],
    steps: ['اسحب طرف الساق النحاسية لتغيير الزاوية θ بينها وبين المجال.', 'غيّر التيار والمجال والطول من اللوحة الجانبية، وراقب ابتعاد الساق في المنظر الجانبي.', 'اجعل الساق موازية للمجال: تنعدم القوة ولا تتحرك الساق.', 'اعكس التيار فتنعكس القوة، ثم حل مثال 3.'],
    concl: ['F = I L B sinθ ، و θ الزاوية بين السلك والمجال.', 'القوة عظمى F = I L B عندما يكون السلك عمودياً على المجال، وصفر عندما يوازيه.', 'القوة عمودية على السلك وعلى المجال وتنعكس بعكس التيار أو المجال.', 'مثال 3: B = 0.3 T.'],
    laws: ['g11_l10_ilb'],
    controls: [R('I', 'التيار I', 0, 25, 20, .5, 'A'), R('B', 'المجال B', 0, 1, .3, .01, 'T'), R('L', 'طول السلك داخل المجال L', .1, 1, .5, .05, 'm'), R('th', 'الزاوية θ بين السلك والمجال', 0, 180, 90, 1, '°')],
    setup(S) { S.perp = 0; S.rev = false; S.vt = 90; S.vf = 0; S.sw = 0; S.ph = 0; S.pl = 0; S.ex = 0; S.k = 0; S.pre = ''; },
    th(S) { return S.p.th; },
    F(S) { const s = S.perp ? 1 : Math.sin(Q60.d2r(D.th(S))); return S.p.I * S.p.L * S.p.B * s; },
    sgn(S) { return S.rev ? -1 : 1; },
    update(S, dt) { S.vt = Q60.ez(S.vt, D.th(S), dt, 9); const f = D.F(S) * D.sgn(S); S.vf = Q60.ez(S.vf, f, dt, 6); const tgt = Math.atan2(S.vf, M * GR); S.sw = Q60.ez(S.sw, tgt, dt, 4); S.ph += S.p.I * dt * 4 * D.sgn(S); S.pl += dt * 40; },
    geo(S) { const g = Q60.geo(S); g.cx = (g.x0 + g.x1) / 2; g.cy = g.y0 + (g.y1 - g.y0) * .45; g.pt = g.y0 + 14; g.pb = g.y1 - 64; return g; },
    tip(S, g) { const a = Q60.d2r(S.vt), Lp = 70 + S.p.L * 150; return [g.cx + Math.sin(a) * Lp / 2, g.cy - Math.cos(a) * Lp / 2, Lp]; },
    rod(ctx, x0, y0, x1, y1, w) { K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4; ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = w + 3; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore();
      ctx.lineCap = 'round'; ctx.strokeStyle = '#e08a3c'; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const a = Math.atan2(y1 - y0, x1 - x0), ox = Math.sin(a) * w * .22, oy = -Math.cos(a) * w * .22; ctx.strokeStyle = 'rgba(255,237,213,.85)'; ctx.lineWidth = w * .25; ctx.beginPath(); ctx.moveTo(x0 + ox, y0 + oy); ctx.lineTo(x1 + ox, y1 + oy); ctx.stroke(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), sg = D.sgn(S); Q60.bg(ctx, w, h); Q60.panel(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, '#f8fafc');
      const px0 = g.x0 + 30, px1 = g.x1 - 30, rc = [px0, g.pt + 46, px1, g.pb];
      Q60.ulines(ctx, rc, -Math.PI / 2, 46, '#be185d', S.pl, .25 + .6 * S.p.B);
      Q60.pole(ctx, px0, g.pt, px1 - px0, 46, 'S'); Q60.pole(ctx, px0, g.pb, px1 - px0, 46, 'N');
      Q42.T(ctx, 'B ↑', px1 - 24, g.pt + 66, { s: 14, w: 900, c: '#be185d', bg: 'rgba(255,255,255,.85)' });
      const off = Math.sin(S.sw) * 46;           // displacement toward the viewer (out of page = down-left in perspective)
      if (!S.perp) {
        const [tx, ty, Lp] = D.tip(S, g), a = Q60.d2r(S.vt), bx = g.cx - Math.sin(a) * Lp / 2, by = g.cy + Math.cos(a) * Lp / 2, dx = -off * .55, dy = off * .42, sc = 1 + off / 300;
        Q41.line(ctx, [[bx, by], [tx, ty]], 'rgba(100,116,139,.6)', 2, [6, 5]);
        // leads to the battery
        const cbx = g.x0 + 70, cby = g.pb - 26;
        K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(bx + dx, by + dy); ctx.quadraticCurveTo(cbx - 70, by + 40, cbx - 34, cby); ctx.moveTo(tx + dx, ty + dy); ctx.quadraticCurveTo(g.x0 + 20, ty, cbx + 34, cby); ctx.stroke(); });
        Q33.cell(ctx, cbx, cby, { w: 68, h: 24, pos: sg, V: 12, label: '' });
        D.rod(ctx, bx + dx, by + dy, tx + dx, ty + dy, 11 * sc);
        if (S.p.I > .1) Q33.flow(ctx, sg > 0 ? [[bx + dx, by + dy], [tx + dx, ty + dy]] : [[tx + dx, ty + dy], [bx + dx, by + dy]], S.ph * 8 * sg, 'c', { sp: 30 });
        Q42.T(ctx, 'I', tx + dx + 14, ty + dy - 8, { s: 14, w: 900, c: '#a16207', bg: 'rgba(255,255,255,.85)' });
        Q41.knob(ctx, tx, ty, '#0f766e', 9);
        if (S.vt > 1 && S.vt < 179) Q60.arc(ctx, g.cx, g.cy, 40, 90, 90 - S.vt, '#0f766e', 'θ', { lo: 12 });
        const fz = S.vf; if (Math.abs(fz) > .02) { const r = 9 + Math.min(20, Math.sqrt(Math.abs(fz)) * 5); Q60.perp(ctx, g.cx + dx + 70, g.cy + dy + 60, r, fz > 0, '#16a34a', 1); Q42.T(ctx, fz > 0 ? 'القوة خارج الصفحة' : 'القوة داخل الصفحة', g.cx + dx + 70, g.cy + dy + 60 + r + 14, { s: 11, w: 900, c: '#fff', bg: '#16a34a' }); }
      } else {
        const x = g.cx - Math.sin(S.sw) * 120, y = g.cy;
        Q41.line(ctx, [[g.cx, g.cy - 30], [g.cx, g.cy + 30]], 'rgba(100,116,139,.5)', 1.5, [5, 4]);
        Q60.wend(ctx, x, y, 20, sg, ''); Q42.T(ctx, sg > 0 ? 'التيار خارج الصفحة' : 'التيار داخل الصفحة', x, y + 36, { s: 11, w: 900, c: '#7c2d12', bg: 'rgba(255,255,255,.85)' });
        const Fm = D.F(S); if (Fm > .05) Q60.vec(ctx, x, y - 34, x - sg * Math.min(130, 22 + Fm * 14), y - 34, '#16a34a', 'F', { w: 4.5 });
      }
      // side view inset: the hanging rod swings
      const ix = w - 320, iy = 360, iw = 150, ih = 170; Q60.panel(ctx, ix, iy, iw, ih, '#f1f5f9'); Q42.T(ctx, 'منظر جانبي', ix + iw / 2, iy + 14, { s: 11, w: 900, c: '#334155' });
      const hx = ix + iw / 2, hy = iy + 34, Ls = 100, ang = S.perp ? 0 : -S.sw, bxx = hx + Math.sin(ang) * Ls, byy = hy + Math.cos(ang) * Ls;
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(hx - 40, hy - 6, 80, 6); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(bxx, byy); ctx.stroke(); });
      Q60.wend(ctx, bxx, byy, 9, 0, ''); Q41.line(ctx, [[hx, hy], [hx, hy + Ls + 14]], 'rgba(100,116,139,.45)', 1.2, [4, 4]);
      Q42.T(ctx, 'φ = ' + Math.round(Math.abs(S.perp ? 0 : S.sw) * 180 / Math.PI) + '°', hx, iy + ih - 14, { s: 11.5, w: 900, c: '#0f766e' });
      const Fm = D.F(S), C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q60.drawSteps(ctx, C.e); Q42.drawChips(ctx, C.r);
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: 'مثال 3 ص 236' }, EX, { k: S.k }), { y: 64, x: w - 12, wd: 312 });
      else Q42.card(ctx, S, [{ t: 'F = I L B sin θ', mono: 1, c: '#0f172a', w: 900 }, { t: 'θ = ' + (S.perp ? 90 : Math.round(D.th(S))) + '°', mono: 1, c: '#0f766e', w: 900 }, { t: 'F = ' + Q60.f(Fm, 3) + ' N', mono: 1, c: '#16a34a', w: 900 },
        { t: Fm < 1e-3 ? 'السلك يوازي المجال: لا قوة' : (Math.abs(Fm - S.p.I * S.p.L * S.p.B) < 1e-6 ? 'السلك عمودي على المجال: القوة عظمى' : 'القوة أصغر من القيمة العظمى'), c: '#be123c', w: 900 },
        { t: 'قاعدة الكف اليمنى: الأصابع باتجاه B والإبهام باتجاه I فتخرج القوة من باطن الكف', c: '#64748b', s: 11.5 }], { title: 'القوة على سلك', y: 64, wd: 304 });
      Q42.banner(ctx, w, S.perp ? 'غيّر التيار أو اعكسه' : 'اسحب طرف الساق لتغيير θ');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pre', Object.keys(PRE).map(k => [k, PRE[k][0]]), g.h - 128, S.pre, (S2, k) => { S2.pre = k; PRE[k][1](S2); S2.ex = 0; }, { bw: 162 }),
      e: Q60.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 3 ص 236', S2 => { S2.pre = 'ex'; PRE.ex[1](S2); }, EX.lines.length),
      r: Q42.chips(S, 'rv', [['rv', 'عكس اتجاه التيار ⇄']], g.h - 84, S.rev ? 'rv' : '', S2 => { S2.rev = !S2.rev; }, { bw: 170, x0: g.L + 350 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), out = [];
      if (!S.perp) { const t = D.tip(S, g); out.push({ id: 'tip', x: t[0], y: t[1], r: 22, axis: 'xy', keep: true, idle: 'اسحب ✋', tip: 'طرف الساق', drag: (S2, d) => { let a = Math.atan2(d.x - g.cx, g.cy - d.y) * 180 / Math.PI; if (a < 0) a = -a; setParam(S2, 'th', clamp(Math.round(a), 0, 180)); S2.pre = ''; } }); }
      else out.push({ id: 'wr', x: g.cx, y: g.cy, r: 26, axis: 'none', idle: 'اضغط ✋', tip: 'اضغط لعكس التيار', click: S2 => { S2.rev = !S2.rev; } });
      return out.concat(C.p, C.e, C.r); },
    readings(S) { return [rd('الزاوية θ', (S.perp ? 90 : Math.round(D.th(S))) + '°'), rd('القوة F', Q60.f(D.F(S), 3) + ' N'), rd('القيمة العظمى I L B', Q60.f(S.p.I * S.p.L * S.p.B, 3) + ' N')]; },
    record(S) { return { t: S.perp ? 90 : Math.round(D.th(S)), f: +D.F(S).toFixed(3) }; },
    cols: [['t', 'θ (°)'], ['f', 'F (N)']],
    explain(S) { return Q26.ex('تندفع الساق النحاسية إلى الأمام أو الخلف حين يسري التيار، وتكون أبعد ما يمكن حين تكون عمودية على المجال، ولا تتحرك حين توازيه.', 'كل شحنة منجرفة في السلك تتأثر بقوة q v B sinθ ، ومجموع القوى على الشحنات NAL يعطي F = I L B sinθ.', 'المحرك الكهربائي ومكبر الصوت يعملان بالقوة المغناطيسية على سلك يحمل تياراً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — المجال حول سلك مستقيم: بايوت وسافارت + مثال 4 + مسألة 8 (الشكل 11، ص 237–238) =============== */
(() => {
  const PB = { ex4: { t: 'مثال 4 ص 238', set: S => { setParam(S, 'I', 15); setParam(S, 'r', 3); }, q: 'سلك مستقيم طويل يسري فيه تيار 15 A. احسب كثافة الفيض المغناطيسي عند نقطة تبعد 3 m عنه', lines: ['B = μ₀ I / 2π r', 'B = 4π×10⁻⁷ × 15 / (2π × 3)', 'B = 2×10⁻⁷ × 15 / 3', 'B = 1×10⁻⁶ T'] },
    p8: { t: 'مسألة 8 ص 248', set: S => { setParam(S, 'I', 1.5); setParam(S, 'r', .1); }, q: 'إلكترون يتحرك موازياً لسلك يحمل تياراً 1.5 A وعلى بعد 10 cm منه بسرعة 5×10⁴ m/s. جد المجال عند موضعه والقوة المؤثرة فيه', lines: ['B = 2×10⁻⁷ × I / r', 'B = 2×10⁻⁷ × 1.5 / 0.1', 'B = 3×10⁻⁶ T', 'السرعة عمودية على المجال: θ = 90°', 'F = q v B', 'F = 1.6×10⁻¹⁹ × 5×10⁴ × 3×10⁻⁶', 'F = 2.4×10⁻²⁰ N'] } };
  const RS = [[.02, '2 cm'], [.05, '5 cm'], [.1, '10 cm'], [.3, '30 cm'], [1, '1 m'], [3, '3 m']];
  const px = r => 30 + 145 * Math.log(r / .01) / Math.log(500), rv = p => .01 * Math.pow(500, (p - 30) / 145);
  const D = { id: 'g11_b_biot', page: 237, fig: 'الشكل 11 + مثال 4 + مسألة 8',
    desc: 'السلك المستقيم الطويل الذي يسري فيه تيار يولّد حوله مجالاً مغناطيسياً خطوطه دوائر متحدة المركز حول السلك. كثافة الفيض عند نقطة تبعد r عن السلك تعطى بقانون بايوت وسافارت B = μ₀ I / 2π r ، حيث μ₀ = 4π×10⁻⁷ Wb/A.m نفاذية الفراغ. ويحدد اتجاه المجال بقاعدة قبضة اليد اليمنى: الإبهام باتجاه التيار والأصابع الملتفة تشير إلى اتجاه المجال.',
    tags: 'بايوت سافارت مجال سلك مستقيم B=μ0I/2πr نفاذية الفراغ قبضة اليد اليمنى دوائر متحدة المركز برادة الحديد مثال 4 15 A 3 m مسألة 8 الشكل 11',
    tools: ['سلك مستقيم عمودي على لوح', 'برادة حديد', 'بوصلة صغيرة', 'مصدر تيار'],
    steps: ['السلك عمودي على الصفحة والتيار خارج منها •. لاحظ الدوائر التي ترسمها برادة الحديد.', 'اسحب البوصلة حول السلك: تكون إبرتها مماسة للدائرة دائماً.', 'قرّب البوصلة أو أبعدها: يقل المجال كلما زاد البعد r ، ولاحظ المنحني B مع r.', 'اعكس التيار فينعكس اتجاه المجال، ثم حل مثال 4 والمسألة 8.'],
    concl: ['خطوط المجال حول سلك مستقيم دوائر متحدة المركز مركزها السلك.', 'B = μ₀ I / 2π r : يتناسب طردياً مع التيار وعكسياً مع البعد.', 'اتجاه المجال بقاعدة قبضة اليد اليمنى.', 'مثال 4: B = 1×10⁻⁶ T.'],
    laws: ['g11_l10_wire'],
    controls: [R('I', 'التيار I', 0, 20, 15, .5, 'A'), R('r', 'البعد عن السلك r', .01, 5, 3, .01, 'm'), TG('fil', 'برادة الحديد', true, null, 'dots')],
    setup(S) { S.pb = 'ex4'; S.pa = -.6; S.vr = px(S.p.r); S.rev = false; S.ph = 0; S.nd = { a: 0, w: 0 }; S.gx = 6; S.ex = 0; S.k = 0;
      let z = 7; const rnd = () => { z = (z * 16807) % 2147483647; return z / 2147483647; }; S.fl = Array.from({ length: 520 }, () => [rnd() * TAU, 24 + 158 * Math.pow(rnd(), 1.5)]); },
    sg(S) { return S.rev ? -1 : 1; },
    B(S, r) { return 2e-7 * S.p.I / r; },
    nice(v) { const e = Math.pow(10, Math.floor(Math.log10(v))), m = v / e; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * e; },
    geo(S) { const g = Q60.geo(S); g.cx = (g.x0 + g.x1) / 2; g.cy = g.y0 + (g.y1 - g.y0) * .36; g.gy1 = g.y1 - 22; g.gy0 = g.y1 - 140; return g; },
    update(S, dt) { S.vr = Q60.ez(S.vr, px(S.p.r), dt, 9); S.ph += dt * (8 + S.p.I * 3) * D.sg(S); S.gx = Q60.ez(S.gx, D.nice(S.p.r * 2.2), dt, 5);
      const tg = Math.atan2(-Math.cos(S.pa), Math.sin(S.pa)) + (D.sg(S) < 0 ? Math.PI : 0); MAG9.turn(S.nd, S.p.I > .05 ? tg : -Math.PI / 2, dt, 50, 6); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), sg = D.sg(S); Q60.bg(ctx, w, h); Q60.panel(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, '#f8fafc');
      K.raw(ctx, () => { const gr = ctx.createRadialGradient(g.cx, g.cy, 10, g.cx, g.cy, 190); gr.addColorStop(0, '#fffbeb'); gr.addColorStop(1, 'rgba(254,243,199,.2)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.cx, g.cy, 186, 0, TAU); ctx.fill(); });
      if (S.p.fil && S.p.I > .2) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(51,65,85,' + clamp(.25 + S.p.I / 30, .25, .85) + ')'; ctx.lineWidth = 1.3; S.fl.forEach(([a, r]) => { const x = g.cx + Math.cos(a) * r, y = g.cy + Math.sin(a) * r, tx = -Math.sin(a) * 3.2, ty = Math.cos(a) * 3.2; ctx.beginPath(); ctx.moveTo(x - tx, y - ty); ctx.lineTo(x + tx, y + ty); ctx.stroke(); }); });
      RS.forEach(([r, lab]) => { const R0 = px(r), b = D.B(S, r), al = S.p.I > .05 ? clamp(.25 + .12 * Math.log10(b / 1e-8), .2, .95) : .15;
        K.raw(ctx, () => { ctx.strokeStyle = 'rgba(37,99,235,' + al + ')'; ctx.lineWidth = 1 + al * 2.4; ctx.beginPath(); ctx.arc(g.cx, g.cy, R0, 0, TAU); ctx.stroke();
          if (S.p.I > .05) { ctx.fillStyle = 'rgba(29,78,216,' + al + ')'; for (let k = 0; k < 4; k++) { const a = (S.ph / R0 * 6 + k * TAU / 4) * -1, x = g.cx + Math.cos(a) * R0, y = g.cy + Math.sin(a) * R0; ctx.save(); ctx.translate(x, y); ctx.rotate(a - Math.PI / 2 * sg); ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(-5, -5); ctx.lineTo(-2, 0); ctx.lineTo(-5, 5); ctx.closePath(); ctx.fill(); ctx.restore(); } } });
        Q42.T(ctx, lab, g.cx + R0 * .72, g.cy + R0 * .72 + 4, { s: 10, w: 800, c: '#1e40af', bg: 'rgba(255,255,255,.8)' }); });
      Q60.wend(ctx, g.cx, g.cy, 17, sg, '');
      Q42.T(ctx, sg > 0 ? 'التيار خارج الصفحة' : 'التيار داخل الصفحة', g.cx, g.cy - 30, { s: 10.5, w: 900, c: '#fff', bg: '#7c2d12' });
      Q42.T(ctx, 'مقياس لوغاريتمي للبعد', g.x0 + 82, g.y0 + 18, { s: 10.5, w: 800, c: '#475569', bg: 'rgba(255,255,255,.85)' });
      const R1 = S.vr, prx = g.cx + Math.cos(S.pa) * R1, pry = g.cy + Math.sin(S.pa) * R1;
      Q41.line(ctx, [[g.cx, g.cy], [prx, pry]], 'rgba(15,23,42,.5)', 1.3, [5, 4]);
      if (S.pb === 'p8' && S.ex) { Q31.ball(ctx, prx, pry, 13, -1, null); Q42.T(ctx, 'إلكترون يوازي السلك', prx, pry + 26, { s: 10.5, w: 900, c: '#fff', bg: '#1d4ed8' }); }
      else MAG9.compass(ctx, prx, pry, 24, S.nd.a, {});
      const bt = D.B(S, S.p.r); if (S.p.I > .05) { const L = 26 + clamp(10 * Math.log10(bt / 1e-8), 0, 50), tx = -Math.sin(S.pa) * sg, ty = Math.cos(S.pa) * sg; Q60.vec(ctx, prx, pry, prx + tx * -L, pry + ty * -L, '#16a34a', 'B', { w: 4 }); }
      // B–r graph
      const gx0 = g.x0 + 46, gx1 = g.x1 - 22, gy0 = g.gy0, gy1 = g.gy1, rM = S.gx, bM = 2e-7 * Math.max(S.p.I, .5) / (rM / 10);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(ctx, gx0 - 36, gy0 - 12, gx1 - gx0 + 50, gy1 - gy0 + 30, 10); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; rr(ctx, gx0 - 36, gy0 - 12, gx1 - gx0 + 50, gy1 - gy0 + 30, 10); ctx.stroke(); });
      Q41.line(ctx, [[gx0, gy0], [gx0, gy1], [gx1, gy1]], '#334155', 1.6);
      const pts = []; for (let i = 0; i <= 60; i++) { const r = rM / 10 + (rM - rM / 10) * i / 60; pts.push([gx0 + (gx1 - gx0) * r / rM, gy1 - (gy1 - gy0) * clamp(D.B(S, r) / bM, 0, 1.05)]); } Q41.line(ctx, pts, '#2563eb', 2.6);
      const dx = gx0 + (gx1 - gx0) * clamp(S.p.r / rM, 0, 1), dy = gy1 - (gy1 - gy0) * clamp(bt / bM, 0, 1.05); Q41.dot(ctx, dx, dy, '#dc2626', 6);
      Q42.T(ctx, 'r (m)', gx1 - 8, gy1 + 12, { s: 10.5, w: 800, c: '#334155' }); Q42.T(ctx, 'B', gx0 - 16, gy0 + 4, { s: 12, w: 900, c: '#2563eb' }); Q42.T(ctx, Q60.sci(rM, 2), gx1 - 52, gy1 + 12, { s: 10, w: 700, c: '#64748b' }); Q42.T(ctx, '0', gx0 - 8, gy1 + 10, { s: 10, w: 700, c: '#64748b' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q60.drawSteps(ctx, C.e); Q42.drawChips(ctx, C.r);
      const pb = PB[S.pb];
      if (S.ex) Q42.steps(ctx, S, { title: pb.t, q: pb.q, lines: pb.lines, k: S.k }, { y: 64, x: w - 12, wd: 312 });
      else Q42.card(ctx, S, [{ t: 'B = μ₀ I / 2π r', mono: 1, c: '#0f172a', w: 900 }, { t: 'μ₀ = 4π×10⁻⁷ Wb/A.m', mono: 1, c: '#475569', w: 800 }, { t: 'I = ' + Q60.f(S.p.I, 2) + ' A', mono: 1, c: '#7c2d12', w: 800 }, { t: 'r = ' + Q60.f(S.p.r, 2) + ' m', mono: 1, c: '#0f172a', w: 800 }, { t: 'B = ' + Q60.sci(bt) + ' T', mono: 1, c: '#16a34a', w: 900 },
        { t: 'قاعدة قبضة اليد اليمنى: الإبهام باتجاه التيار والأصابع تلتف باتجاه المجال', c: '#be123c', w: 800 }, { t: 'ضاعف البعد r فيقل المجال إلى النصف', c: '#64748b', s: 11.5 }], { title: 'المجال حول سلك مستقيم', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب البوصلة حول السلك');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pb', Object.keys(PB).map(k => [k, PB[k].t]), g.h - 128, S.pb, (S2, k) => { S2.pb = k; PB[k].set(S2); S2.ex = 0; S2.k = 0; }, { bw: 160 }),
      e: Q60.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => PB[S2.pb].set(S2), 7),
      r: Q42.chips(S, 'rv', [['rv', 'عكس اتجاه التيار ⇄']], g.h - 84, S.rev ? 'rv' : '', S2 => { S2.rev = !S2.rev; }, { bw: 170, x0: g.L + 350 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), R1 = px(S.p.r);
      return [{ id: 'pr', x: g.cx + Math.cos(S.pa) * R1, y: g.cy + Math.sin(S.pa) * R1, r: 26, axis: 'xy', keep: true, idle: 'اسحب ✋', tip: 'البوصلة', drag: (S2, d) => { const dx = d.x - g.cx, dy = d.y - g.cy; S2.pa = Math.atan2(dy, dx); setParam(S2, 'r', clamp(Math.round(rv(clamp(Math.hypot(dx, dy), 30, 175)) * 100) / 100, .01, 5)); } },
        { id: 'wr', x: g.cx, y: g.cy, r: 20, axis: 'none', hint: false, tip: 'اضغط لعكس التيار', click: S2 => { S2.rev = !S2.rev; } }].concat(C.p, C.e, C.r); },
    readings(S) { return [rd('التيار I', Q60.f(S.p.I, 2) + ' A'), rd('البعد r', Q60.f(S.p.r, 2) + ' m'), rd('المجال B', Q60.sci(D.B(S, S.p.r)) + ' T')]; },
    record(S) { return { r: S.p.r, b: +D.B(S, S.p.r).toExponential(3) }; },
    cols: [['r', 'r (m)'], ['b', 'B (T)']],
    explain(S) { return Q26.ex('تصطف برادة الحديد على دوائر حول السلك، وتبقى إبرة البوصلة مماسة لهذه الدوائر، ويضعف المجال بالابتعاد عن السلك.', 'كل جزء من السلك يولّد مجالاً عند النقطة، ومجموعها لسلك طويل يعطي B = μ₀ I / 2π r ، فالمجال يتناسب عكسياً مع البعد.', 'تُبعد أسلاك الضغط العالي عن البيوت، وتُلف أسلاك الأجهزة الحساسة معاً ليلغي مجالُ الذهاب مجالَ الإياب.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — القوة بين سلكين متوازيين + مسألة 4 + تعريف الأمبير + فكر (الشكلان 12 و 13، ص 238–239) =============== */
(() => {
  const PB = { p4: { t: 'مسألة 4', set: S => { setParam(S, 'a', 500); setParam(S, 'b', 500); setParam(S, 'r', .05); S.opp = false; }, q: 'سلكان متوازيان طويلان البعد بينهما 5 cm ، يسري في كل منهما تيار 500 A بالاتجاه نفسه. جد المجال الذي يولده أحدهما عند الآخر والقوة لكل متر', lines: ['B = 2×10⁻⁷ × I / r', 'B = 2×10⁻⁷ × 500 / 0.05', 'B = 2×10⁻³ T', 'F / L = B I', 'F / L = 2×10⁻³ × 500', 'F / L = 1 N/m', 'التياران بالاتجاه نفسه: تجاذب'] },
    amp: { t: 'تعريف الأمبير', set: S => { setParam(S, 'a', 1); setParam(S, 'b', 1); setParam(S, 'r', 1); S.opp = false; }, q: 'سلكان متوازيان البعد بينهما 1 m يسري في كل منهما 1 A. احسب القوة لكل متر', lines: ['F / L = μ₀ I₁ I₂ / 2π r', 'F / L = 2×10⁻⁷ × 1 × 1 / 1', 'F / L = 2×10⁻⁷ N/m', 'وهذا هو تعريف الأمبير'] },
    th: { t: 'فكر ص 239', set: S => { setParam(S, 'a', 2); setParam(S, 'b', 6); setParam(S, 'r', .1); S.opp = false; }, q: 'سلكان متوازيان: I₁ = 2 A و I₂ = 6 A. أي العلاقات صحيحة: F₁ = 3F₂ أم F₁ = F₂ أم F₁ = F₂/3 ؟', lines: ['F₁ = I₁ L B₂ = μ₀ I₁ I₂ L / 2π r', 'F₂ = I₂ L B₁ = μ₀ I₂ I₁ L / 2π r', 'إذن F₁ = F₂', 'الجواب c وهذا يتفق مع القانون الثالث لنيوتن'] } };
  const px = r => 70 + 230 * Math.log(r / .01) / Math.log(100), rv = p => .01 * Math.pow(100, (p - 70) / 230);
  const D = { id: 'g11_b_two', page: 238, fig: 'الشكلان 12 و 13 + مسألة 4',
    desc: 'كل سلك من سلكين متوازيين يحملان تيارين يقع في مجال السلك الآخر فيتأثر بقوة. المجال الذي يولده السلك 2 عند السلك 1 هو B₂ = μ₀ I₂ / 2π r فتكون القوة F₁ = B₂ I₁ L ، والقوة لوحدة الطول F/L = μ₀ I₁ I₂ / 2π r. يتجاذب السلكان إذا كان التياران بالاتجاه نفسه ويتنافران إذا تعاكسا. ومنها عُرّف الأمبير.',
    tags: 'سلكان متوازيان قوة تجاذب تنافر تعريف الأمبير 2×10⁻⁷ N/m مسألة 4 500 A 5 cm فكر الشكل 12',
    tools: ['سلكان متوازيان طويلان', 'مصدرا تيار'],
    steps: ['السلكان عموديان على الصفحة. اسحب السلك الأيمن لتغيير البعد r بينهما.', 'غيّر التيارين من اللوحة الجانبية وراقب سهمي القوة: متساويان دائماً ومتعاكسان.', 'اعكس التيار الثاني: يتحول التجاذب إلى تنافر.', 'جرّب تعريف الأمبير و«فكر»، ثم حل المسألة 4.'],
    concl: ['F/L = μ₀ I₁ I₂ / 2π r.', 'التياران بالاتجاه نفسه يتجاذبان، والمتعاكسان يتنافران.', 'القوتان متساويتان مقداراً ومتعاكستان اتجاهاً حتى لو اختلف التياران: F₁ = F₂.', 'الأمبير: التيار الذي إذا سرى في سلكين متوازيين بينهما 1 m ولّد قوة 2×10⁻⁷ N لكل متر من طولهما.'],
    laws: ['g11_l10_two', 'g11_l10_wire'],
    controls: [R('a', 'التيار في السلك الأول I₁', 0, 600, 500, 1, 'A'), R('b', 'التيار في السلك الثاني I₂', 0, 600, 500, 1, 'A'), R('r', 'البعد بين السلكين r', .01, 1, .05, .01, 'm'), TG('vf', 'أسهم المجال المحصل', true, null, 'vector')],
    setup(S) { S.pb = 'p4'; S.opp = false; S.vd = px(S.p.r); S.jg = 0; S.ex = 0; S.k = 0; S.ph = 0; },
    FL(S) { return 2e-7 * S.p.a * S.p.b / S.p.r; },
    geo(S) { const g = Q60.geo(S); g.cx = (g.x0 + g.x1) / 2; g.cy = g.y0 + (g.y1 - g.y0) * .4; return g; },
    update(S, dt) { S.vd = Q60.ez(S.vd, px(S.p.r), dt, 9); const att = S.opp ? -1 : 1, f = D.FL(S); S.jg = Q60.ez(S.jg, f > 1e-9 ? att * clamp(2 + Math.log10(f / 1e-7), 0, 9) : 0, dt, 5); S.ph += dt; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), d = S.vd, s2 = S.opp ? -1 : 1, x1 = g.cx - d / 2 + S.jg, x2 = g.cx + d / 2 - S.jg, y = g.cy; Q60.bg(ctx, w, h); Q60.panel(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, '#f8fafc');
      const k1 = S.p.a, k2 = S.p.b * s2, rpx = S.p.r / Math.max(1, d);    // metres per pixel
      if (S.p.vf && (k1 || k2)) { const sp = 36; for (let gx = g.x0 + 24; gx < g.x1 - 10; gx += sp) for (let gy = g.y0 + 30; gy < g.y1 - 30; gy += sp) {
        let bx = 0, by = 0; [[x1, k1], [x2, k2]].forEach(([wx, I]) => { const dx = (gx - wx) * rpx, dy = (gy - y) * rpx, q = dx * dx + dy * dy; if (q < 1e-12) return; bx += 2e-7 * I * (dy) / q; by += 2e-7 * I * (-dx) / q; });
        const m = Math.hypot(bx, by); if (m < 1e-12 || Math.hypot(gx - x1, gy - y) < 26 || Math.hypot(gx - x2, gy - y) < 26) continue; const L = clamp(6 + 3 * Math.log10(m / 1e-6), 5, 15), al = clamp(.3 + .1 * Math.log10(m / 1e-6), .25, .85);
        Q60.vec(ctx, gx - bx / m * L, gy - by / m * L, gx + bx / m * L, gy + by / m * L, 'rgba(37,99,235,' + al + ')', '', { w: 2, hs: 7, flat: 1 }); } }
      Q41.line(ctx, [[x1, y + 40], [x2, y + 40]], '#475569', 1.4, [5, 4]); Q42.T(ctx, 'r = ' + Q60.f(S.p.r * 100, 1) + ' cm', (x1 + x2) / 2, y + 54, { s: 12, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.9)' });
      Q60.wend(ctx, x1, y, 18, 1, ''); Q60.wend(ctx, x2, y, 18, s2, '');
      Q42.T(ctx, 'السلك 1', x1, y - 32, { s: 11, w: 900, c: '#fff', bg: '#7c2d12' }); Q42.T(ctx, 'السلك 2', x2, y - 32, { s: 11, w: 900, c: '#fff', bg: '#7c2d12' });
      const f = D.FL(S), fl = f > 1e-12 ? clamp(30 + 10 * Math.log10(f / 1e-7), 18, 110) : 0, att = !S.opp;
      if (fl) { const dir = att ? 1 : -1, fl2 = att ? Math.min(fl, Math.max(28, (x2 - x1) / 2 - 16)) : fl; Q60.vec(ctx, x1, y - 60, x1 + dir * fl2, y - 60, '#16a34a', 'F₁', { w: 4.5 }); Q60.vec(ctx, x2, y - 60, x2 - dir * fl2, y - 60, '#16a34a', 'F₂', { w: 4.5, side: -1 });
        Q42.T(ctx, att ? 'تجاذب' : 'تنافر', g.cx, y - 112, { s: 14, w: 900, c: '#fff', bg: att ? '#16a34a' : '#dc2626' }); }
      // B2 at wire 1 (vertical arrow)
      if (S.p.b > 0) Q60.vec(ctx, x1, y + 76, x1, y + 76 + s2 * 46, '#7c3aed', 'B₂', { w: 3.5, side: -1 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q60.drawSteps(ctx, C.e); Q42.drawChips(ctx, C.r);
      const pb = PB[S.pb], B2 = 2e-7 * S.p.b / S.p.r, B1 = 2e-7 * S.p.a / S.p.r;
      if (S.ex) Q42.steps(ctx, S, { title: pb.t, q: pb.q, lines: pb.lines, k: S.k }, { y: 64, x: w - 12, wd: 312 });
      else Q42.card(ctx, S, [{ t: 'F / L = μ₀ I₁ I₂ / 2π r', mono: 1, c: '#0f172a', w: 900 }, { t: 'B₂ = ' + Q60.sci(B2) + ' T', mono: 1, c: '#7c3aed', w: 800 }, { t: 'B₁ = ' + Q60.sci(B1) + ' T', mono: 1, c: '#7c3aed', w: 800 }, { t: 'F / L = ' + Q60.sci(f) + ' N/m', mono: 1, c: '#16a34a', w: 900 },
        { t: att ? 'التياران بالاتجاه نفسه: يتجاذبان' : 'التياران متعاكسان: يتنافران', c: att ? '#15803d' : '#b91c1c', w: 900 }, { t: 'القوتان متساويتان دائماً F₁ = F₂ حتى لو اختلف التياران', c: '#64748b', s: 11.5 }], { title: 'سلكان متوازيان', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب السلك 2 أو اعكس تياره');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pb', Object.keys(PB).map(k => [k, PB[k].t]), g.h - 128, S.pb, (S2, k) => { S2.pb = k; PB[k].set(S2); S2.ex = 0; S2.k = 0; }, { bw: 150 }),
      e: Q60.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => PB[S2.pb].set(S2), 7),
      r: Q42.chips(S, 'rv', [['rv', 'عكس تيار السلك 2 ⇄']], g.h - 84, S.opp ? 'rv' : '', S2 => { S2.opp = !S2.opp; }, { bw: 180, x0: g.L + 350 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), d = px(S.p.r);
      return [{ id: 'w2', x: g.cx + d / 2, y: g.cy, r: 24, axis: 'x', keep: true, idle: 'اسحب ✋', tip: 'السلك 2', drag: (S2, q) => { const dd = clamp(2 * (q.x - g.cx), 70, 300); setParam(S2, 'r', clamp(Math.round(rv(dd) * 100) / 100, .01, 1)); } },
        { id: 'w1', x: g.cx - d / 2, y: g.cy, r: 20, axis: 'none', hint: false, tip: 'اضغط لعكس تيار السلك 2', click: S2 => { S2.opp = !S2.opp; } }].concat(C.p, C.e, C.r); },
    readings(S) { return [rd('القوة لكل متر', Q60.sci(D.FL(S)) + ' N/m'), rd('نوع التأثير', S.opp ? 'تنافر' : 'تجاذب'), rd('مجال السلك 2 عند 1', Q60.sci(2e-7 * S.p.b / S.p.r) + ' T')]; },
    explain(S) { return Q26.ex('يندفع السلكان نحو بعضهما عندما يكون التياران بالاتجاه نفسه، ويتباعدان عند عكس أحدهما، وسهما القوة متساويان دائماً.', 'السلك 1 يقع في مجال السلك 2 الذي يكون عمودياً عليه، فيتأثر بقوة I₁ L B₂ ، وبالمثل السلك 2. وحاصل الضرب I₁ I₂ نفسه في القوتين لذا تتساويان.', 'يُعرَّف الأمبير في النظام الدولي بهذه القوة بين سلكين متوازيين.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — المجال داخل ملف لولبي + مثال 5 + سؤال النابض (الشكل 14، ص 240–241) =============== */
(() => {
  const EX = { q: 'ملف لولبي عدد لفاته 100 لفة وطوله 20 cm يحمل تياراً 4 A. ما كثافة الفيض المغناطيسي عند محوره؟', lines: ['B = μ₀ N I / L', 'μ₀ = 4π×10⁻⁷ Wb/A.m', 'B = 4π×10⁻⁷ × 100 × 4 / 0.2', 'B = 2.5×10⁻³ Wb/m²', 'B = 2.5×10⁻³ T'] };
  const D = { id: 'g11_b_sol', page: 240, fig: 'الشكل 14 + مثال 5',
    desc: 'الملف اللولبي سلك ملفوف على شكل حلزون. عندما يسري فيه تيار تتجمع مجالات لفاته فيكون المجال داخله قوياً ومنتظماً تقريباً خطوطه مستقيمة متوازية، وخارجه يشبه مجال مغناطيس ساق. كثافة الفيض داخله B = μ₀ N I / L = μ₀ n I حيث n عدد اللفات لوحدة الطول، والعلاقة صحيحة للنقاط القريبة من المحور والبعيدة عن الطرفين.',
    tags: 'ملف لولبي حلزوني B=μ0NI/L n عدد اللفات لوحدة الطول مجال منتظم مغناطيس ساق نابض معلق مثال 5 100 لفة 20 cm 4 A 2.5×10⁻³ T الشكل 14',
    tools: ['ملف لولبي', 'مصدر تيار', 'نابض خفيف', 'مسطرة'],
    steps: ['غيّر عدد اللفات والطول والتيار وراقب كثافة الفيض داخل الملف.', 'لاحظ أن الخطوط داخل الملف مستقيمة متوازية، وخارجه تشبه خطوط مغناطيس ساق.', 'اسحب طرف الملف لتغيير طوله: إطالته مع بقاء N تقلل n فيقل المجال.', 'اختر «نابض معلق» لترى سؤال الكتاب، ثم حل مثال 5.'],
    concl: ['B = μ₀ N I / L = μ₀ n I.', 'المجال داخل الملف منتظم تقريباً، خطوطه مستقيمة متوازية.', 'الملف الذي يحمل تياراً يسلك سلوك مغناطيس ساق له قطب شمالي وقطب جنوبي.', 'النابض المعلق يحمل تياراً كبيراً فينكمش لأن لفاته تحمل تيارات بالاتجاه نفسه فتتجاذب.', 'مثال 5: B = 2.5×10⁻³ T.'],
    laws: ['g11_l10_sol'],
    controls: [R('N', 'عدد اللفات N', 10, 500, 100, 10, ''), R('L', 'طول الملف L', 5, 50, 20, 1, 'cm'), R('I', 'التيار I', 0, 10, 4, .1, 'A'), TG('sec', 'مقطع اللفات • ×', true, null, 'layers')],
    setup(S) { S.view = 'sol'; S.rev = false; S.vL = S.p.L; S.vI = S.p.I; S.ph = 0; S.ex = 0; S.k = 0; S.ls = 1; S._fc = null; },
    sg(S) { return S.rev ? -1 : 1; },
    Bv(S) { return 4 * Math.PI * 1e-7 * S.p.N * S.p.I / (S.p.L / 100); },
    geo(S) { const g = Q60.geo(S); g.cx = (g.x0 + g.x1) / 2; g.cy = g.y0 + (g.y1 - g.y0) * .38; g.Rc = 50; g.sy = g.y1 - 26; return g; },
    lp(L) { return clamp(L * 7, 50, 330); },
    nd(S) { return clamp(Math.round(S.p.N / 10), 3, 40); },
    update(S, dt) { S.vL = Q60.ez(S.vL, S.p.L, dt, 9); S.vI = Q60.ez(S.vI, S.p.I, dt, 6); S.ph += dt * (20 + S.vI * 12) * D.sg(S); S.ls = Q60.ez(S.ls, 1 - .32 * Math.pow(S.p.I / 10, 2), dt, 4); },
    wires(S, g) { const Lp = D.lp(S.vL), n = D.nd(S), out = []; for (let i = 0; i < n; i++) out.push(g.cx - Lp / 2 + (i + .5) * Lp / n); return out; },
    lines(S, g) { const Lp = D.lp(Math.round(S.vL)), n = D.nd(S), sg = D.sg(S), key = [Lp, n, sg, g.x0, g.y0, g.x1, g.y1].join('|'); if (S._fc && S._fc.key === key) return S._fc.L;
      const xs = []; for (let i = 0; i < n; i++) xs.push(g.cx - Lp / 2 + (i + .5) * Lp / n);
      const F = (x, y) => { let bx = 0, by = 0; xs.forEach(wx => { let dx = x - wx, dy = y - (g.cy - g.Rc), q = dx * dx + dy * dy + 4; bx += sg * dy / q; by += sg * -dx / q; dy = y - (g.cy + g.Rc); q = dx * dx + dy * dy + 4; bx -= sg * dy / q; by -= sg * -dx / q; }); return [bx, by]; };
      const rc = [g.x0 + 4, g.y0 + 4, g.x1 - 4, g.sy - 30], L = [];
      [-.78, -.5, -.2, .2, .5, .78].forEach(f => { const x0 = g.cx, y0 = g.cy + g.Rc * f, run = dir => { const P = [[x0, y0]]; let x = x0, y = y0; for (let k = 0; k < 1400; k++) { let b = F(x, y), m = Math.hypot(b[0], b[1]) || 1; const mx = x + dir * b[0] / m * 2, my = y + dir * b[1] / m * 2; b = F(mx, my); m = Math.hypot(b[0], b[1]) || 1; x += dir * b[0] / m * 4; y += dir * b[1] / m * 4; P.push([x, y]);
          if (x < rc[0] || x > rc[2] || y < rc[1] || y > rc[3]) return { P, open: 1 }; if (k > 40 && Math.hypot(x - x0, y - y0) < 4) { P.push([x0, y0]); return { P, open: 0 }; } } return { P, open: 1 }; };
        const a = run(1); if (a.open) { const b = run(-1); L.push(b.P.reverse().concat(a.P)); } else L.push(a.P); });
      S._fc = { key, L }; return L; },
    turnArc(ctx, x, cy, R, front, al) { K.raw(ctx, () => { ctx.lineCap = 'round'; ctx.strokeStyle = front ? '#7c2d12' : 'rgba(124,45,18,' + (.5 * al) + ')'; ctx.lineWidth = front ? 7 : 5; ctx.beginPath(); ctx.ellipse(x, cy, 8, R, .12, front ? Math.PI / 2 : -Math.PI / 2, front ? Math.PI * 1.5 : Math.PI / 2); ctx.stroke();
      if (front) { ctx.strokeStyle = '#e08a3c'; ctx.lineWidth = 4.2; ctx.beginPath(); ctx.ellipse(x, cy, 8, R, .12, Math.PI / 2, Math.PI * 1.5); ctx.stroke(); ctx.strokeStyle = 'rgba(255,237,213,.8)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(x - 1, cy, 8, R, .12, Math.PI * .7, Math.PI * 1.3); ctx.stroke(); } }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), sg = D.sg(S); Q60.bg(ctx, w, h); Q60.panel(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, '#f8fafc');
      if (S.view === 'sol') {
        const xs = D.wires(S, g), Lp = D.lp(S.vL), on = S.vI > .05, al = clamp(.25 + S.vI / 6, .25, 1);
        xs.forEach(x => D.turnArc(ctx, x, g.cy, g.Rc, 0, 1));
        if (on) D.lines(S, g).forEach(P => { K.raw(ctx, () => { ctx.strokeStyle = 'rgba(37,99,235,' + al * .8 + ')'; ctx.lineWidth = 1.8; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }); MAG9.arrowsOn(ctx, P, 'rgba(29,78,216,' + al + ')', 6, 120, S.ph); });
        xs.forEach(x => D.turnArc(ctx, x, g.cy, g.Rc, 1, 1));
        if (on) xs.forEach((x, i) => { if (i % 2 === 0) K.raw(ctx, () => { const y = g.cy + 8, a = sg > 0 ? Math.PI / 2 : -Math.PI / 2; ctx.save(); ctx.translate(x - 8, y); ctx.rotate(a); ctx.fillStyle = '#facc15'; ctx.strokeStyle = '#a16207'; ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(-4, -4.5); ctx.lineTo(-2, 0); ctx.lineTo(-4, 4.5); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }); });
        if (on) { const xa = g.cx - sg * (Lp / 2 - 6), xb = g.cx + sg * (Lp / 2 - 6); Q60.vec(ctx, xa, g.cy, xb, g.cy, 'rgba(29,78,216,.85)', 'B', { w: 5, off: -14 }); }
        if (S.p.sec) xs.forEach(x => { Q60.perp(ctx, x, g.cy - g.Rc - 16, 5, sg > 0, '#1e293b', .9); Q60.perp(ctx, x, g.cy + g.Rc + 16, 5, sg < 0, '#1e293b', .9); });
        if (on) { Q42.T(ctx, sg > 0 ? 'N' : 'S', g.cx + Lp / 2 + 26, g.cy, { s: 20, w: 900, c: sg > 0 ? '#dc2626' : '#2563eb' }); Q42.T(ctx, sg > 0 ? 'S' : 'N', g.cx - Lp / 2 - 26, g.cy, { s: 20, w: 900, c: sg > 0 ? '#2563eb' : '#dc2626' }); }
        // leads + battery
        const by = g.cy + g.Rc + 80, xl = xs[0], xr = xs[xs.length - 1];
        Q33.wire(ctx, [[xl, g.cy + g.Rc - 4], [xl - 12, by], [g.cx - 40, by]], {}); Q33.wire(ctx, [[xr, g.cy + g.Rc - 4], [xr + 12, by], [g.cx + 40, by]], {});
        Q33.cell(ctx, g.cx, by, { w: 74, h: 26, pos: sg, V: 12, label: '' });
        Q41.line(ctx, [[g.cx - Lp / 2, g.cy + g.Rc + 40], [g.cx + Lp / 2, g.cy + g.Rc + 40]], '#475569', 1.4); Q42.T(ctx, 'L = ' + Math.round(S.p.L) + ' cm', g.cx, g.cy + g.Rc + 54, { s: 11.5, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.9)' });
        Q41.knob(ctx, g.cx + Lp / 2, g.cy - g.Rc - 34, '#0f766e', 9); Q42.T(ctx, 'N = ' + S.p.N + ' لفة', g.x0 + 70, g.y0 + 20, { s: 11.5, w: 900, c: '#7c2d12', bg: 'rgba(255,255,255,.9)' });
      } else {
        const tx = g.cx, ty = g.y0 + 30, L0 = 250, Ls = L0 * S.ls, nT = 14, R = 30, on = S.vI > .3;
        K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, ty - 20, 0, ty); gr.addColorStop(0, '#94a3b8'); gr.addColorStop(1, '#475569'); ctx.fillStyle = gr; ctx.fillRect(g.x0 + 30, ty - 18, g.x1 - g.x0 - 60, 18); });
        Q41.line(ctx, [[tx, ty], [tx, ty + 18]], '#334155', 3); const y0 = ty + 18, dy = Ls / nT;
        for (let i = 0; i < nT; i++) { const yc = y0 + (i + .5) * dy; K.raw(ctx, () => { ctx.strokeStyle = 'rgba(124,45,18,.45)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(tx, yc, R, Math.max(3, dy * .45), 0, Math.PI, TAU); ctx.stroke(); }); }
        for (let i = 0; i < nT; i++) { const yc = y0 + (i + .5) * dy; K.raw(ctx, () => { ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(tx, yc, R, Math.max(3, dy * .45), 0, 0, Math.PI); ctx.stroke(); ctx.strokeStyle = '#e08a3c'; ctx.lineWidth = 3.6; ctx.beginPath(); ctx.ellipse(tx, yc, R, Math.max(3, dy * .45), 0, 0, Math.PI); ctx.stroke(); });
          if (on && i < nT - 1 && i % 3 === 1) { Q60.vec(ctx, tx + R + 16, yc + dy * .1, tx + R + 16, yc + dy * .1 + Math.min(14, dy * .5), '#16a34a', '', { w: 2.5, hs: 7 }); Q60.vec(ctx, tx + R + 16, yc + dy * 1.4, tx + R + 16, yc + dy * 1.4 - Math.min(14, dy * .5), '#16a34a', '', { w: 2.5, hs: 7 }); } }
        const yb = y0 + Ls; Q41.line(ctx, [[tx, yb], [tx, yb + 14]], '#334155', 3);
        K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; const gr = ctx.createLinearGradient(tx - 30, 0, tx + 30, 0); gr.addColorStop(0, '#64748b'); gr.addColorStop(.5, '#cbd5e1'); gr.addColorStop(1, '#475569'); ctx.fillStyle = gr; rr(ctx, tx - 28, yb + 14, 56, 44, 6); ctx.fill(); ctx.restore(); });
        Q42.T(ctx, '1 kg', tx, yb + 36, { s: 12, w: 900, c: '#0f172a' });
        Q33.wire(ctx, [[tx, ty + 6], [g.x0 + 40, ty + 6], [g.x0 + 40, yb + 120]], {}); Q33.wire(ctx, [[tx - 28, yb + 4], [g.x0 + 70, yb + 4], [g.x0 + 70, yb + 120]], {});
        Q33.cell(ctx, g.x0 + 56, yb + 120, { w: 50, h: 22, pos: 1, V: 12, label: '' });
        Q41.line(ctx, [[tx + R + 60, y0], [tx + R + 60, yb]], '#475569', 1.4); Q42.T(ctx, Math.round(S.ls * 100) + '%', tx + R + 84, (y0 + yb) / 2, { s: 12, w: 900, c: '#0f766e', bg: 'rgba(255,255,255,.9)' });
        if (on) Q42.T(ctx, 'اللفات تتجاذب', tx + R + 70, y0 - 6, { s: 11, w: 900, c: '#fff', bg: '#16a34a' });
      }
      Q41.slider(ctx, g.x0 + 40, g.x1 - 40, g.sy, S.p.I / 10, 'اسحب لتغيير التيار في الملف', '#ca8a04');
      const C = D.chips(S, g); Q42.drawChips(ctx, C.v); Q60.drawSteps(ctx, C.e); Q42.drawChips(ctx, C.r);
      const B = D.Bv(S), n = S.p.N / (S.p.L / 100);
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: 'مثال 5 ص 241' }, EX, { k: S.k }), { y: 64, x: w - 12, wd: 312 });
      else if (S.view === 'sol') Q42.card(ctx, S, [{ t: 'B = μ₀ N I / L = μ₀ n I', mono: 1, c: '#0f172a', w: 900 }, { t: 'n = ' + Q60.f(n, 0) + ' turn/m', mono: 1, c: '#7c2d12', w: 800 }, { t: 'B = ' + Q60.sci(B) + ' T', mono: 1, c: '#2563eb', w: 900 },
        { t: 'داخل الملف: خطوط مستقيمة متوازية والمجال منتظم', c: '#15803d', w: 800 }, { t: 'خارج الملف: يشبه مجال مغناطيس ساق', c: '#be123c', w: 800 }, { t: 'العلاقة صحيحة قرب المحور وبعيداً عن الطرفين', c: '#64748b', s: 11.5 }], { title: 'الملف اللولبي', y: 64, wd: 304 });
      else Q42.card(ctx, S, [{ t: 'سؤال ص 240: نابض خفيف معلق من السقف يمر فيه تيار كبير. ماذا يحدث له؟', c: '#334155', w: 800 }, { t: 'الجواب: ينكمش النابض', c: '#be123c', w: 900 }, { t: 'لأن لفاته المتجاورة تحمل تيارات بالاتجاه نفسه فتتجاذب كالسلكين المتوازيين', c: '#15803d', w: 800 }, { t: 'زد التيار فيزداد الانكماش', c: '#64748b', s: 11.5 }], { title: 'نابض يحمل تياراً', y: 64, wd: 304 });
      Q42.banner(ctx, w, S.view === 'sol' ? 'اسحب طرف الملف أو غيّر التيار' : 'زد التيار وراقب النابض');
    },
    chips(S, g) { return { v: Q42.chips(S, 'view', [['sol', 'الملف اللولبي'], ['spr', 'نابض معلق']], g.h - 128, S.view, (S2, k) => { S2.view = k; }, { bw: 160 }),
      e: Q60.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 5 ص 241', S2 => { S2.view = 'sol'; setParam(S2, 'N', 100); setParam(S2, 'L', 20); setParam(S2, 'I', 4); }, EX.lines.length),
      r: Q42.chips(S, 'rv', [['rv', 'عكس اتجاه التيار ⇄']], g.h - 84, S.rev ? 'rv' : '', S2 => { S2.rev = !S2.rev; }, { bw: 170, x0: g.L + 350 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), out = [Q41.sdrag('I', g.x0 + 40, g.x1 - 40, g.sy, S.p.I / 10, (S2, t) => setParam(S2, 'I', Math.round(t * 100) / 10), { tip: 'اسحب لتغيير التيار', extra: { idle: 'اسحب ✋' } })];
      if (S.view === 'sol') out.push({ id: 'end', x: g.cx + D.lp(S.p.L) / 2, y: g.cy - g.Rc - 34, r: 20, axis: 'x', keep: true, hint: false, tip: 'طرف الملف: غيّر الطول', drag: (S2, d) => setParam(S2, 'L', clamp(Math.round(2 * (d.x - g.cx) / 7), 5, 47)) });
      return out.concat(C.v, C.e, C.r); },
    readings(S) { return [rd('عدد اللفات لوحدة الطول n', Q60.f(S.p.N / (S.p.L / 100), 0) + ' لفة/m'), rd('المجال داخل الملف B', Q60.sci(D.Bv(S)) + ' T')]; },
    record(S) { return { n: S.p.N, l: S.p.L, i: S.p.I, b: +D.Bv(S).toExponential(3) }; },
    cols: [['n', 'N'], ['l', 'L (cm)'], ['i', 'I (A)'], ['b', 'B (T)']],
    explain(S) { return S.view === 'spr' ? Q26.ex('ينكمش النابض المعلق عند مرور تيار كبير فيه.', 'كل لفتين متجاورتين تشبهان سلكين متوازيين يحملان تيارين بالاتجاه نفسه، فتتجاذبان وتقترب اللفات.', 'تستعمل قوى التجاذب بين اللفات في تصميم بعض المفاتيح والمرحلات الكهربائية.') : Q26.ex('خطوط المجال داخل الملف مستقيمة ومتوازية، وتخرج من أحد طرفيه وتدخل الطرف الآخر كمغناطيس ساق.', 'مجالات اللفات المتجاورة تتجمع داخل الملف وتتلاشى تقريباً خارجه، فيصبح المجال داخله منتظماً B = μ₀ n I.', 'الجرس الكهربائي والمرحل وأجهزة الرنين المغناطيسي تعتمد على المجال القوي داخل الملفات.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G1 — عزم الازدواج على ملف يحمل تياراً + مثال 6 + المسألتان 3 و 7 + س6 (الشكلان 15 و 16، ص 241–243) =============== */
(() => {
  const PB = { ex6: { t: 'مثال 6', a: 1.414, b: 1.414, set: S => { setParam(S, 'I', .045); setParam(S, 'B', .15); setParam(S, 'N', 100); setParam(S, 'th', 90); }, q: 'ملف مساحته 2.0×10⁻⁴ m² وعدد لفاته 100 لفة يحمل تياراً 0.045 A في مجال 0.15 T. احسب أقصى عزم يؤثر فيه', lines: ['τ = B I A N sin θ', 'العزم أعظم عند θ = 90°', 'μ = N I A = 100 × 0.045 × 2×10⁻⁴', 'μ = 9×10⁻⁴ A.m²', 'τ = μ B = 9×10⁻⁴ × 0.15', 'τ = 1.35×10⁻⁴ N.m'] },
    p3: { t: 'مسألة 3', a: 12, b: 10, set: S => { setParam(S, 'I', 2); setParam(S, 'B', .25); setParam(S, 'N', 40); setParam(S, 'th', 90); }, q: 'ملف مستطيل 12 cm × 10 cm من 40 لفة يحمل 2 A ، مستويه يوازي مجالاً 0.25 T وضلعاه 10 cm يوازيان المجال. جد العزم والقوة على كل ضلع', lines: ['A = 0.12 × 0.10 = 1.2×10⁻² m²', 'τ = B I A N', 'τ = 0.25 × 2 × 1.2×10⁻² × 40', 'τ = 0.24 N.m', 'على كل ضلع طوله 12 cm:', 'F = N I L B = 40 × 2 × 0.12 × 0.25', 'F = 2.4 N بعكس اتجاه الأخرى', 'الضلعان 10 cm يوازيان المجال: F = 0'] },
    p7: { t: 'مسألة 7', a: 8, b: 5, set: S => { setParam(S, 'I', 10); setParam(S, 'B', .15); setParam(S, 'N', 1); setParam(S, 'th', 90); }, q: 'لفة واحدة أبعادها 5 cm × 8 cm مستويها يوازي مجالاً 0.15 T وتحمل 10 A. جد العزم المؤثر فيها', lines: ['A = 0.05 × 0.08 = 4×10⁻³ m²', 'τ = B I A N', 'τ = 0.15 × 10 × 4×10⁻³ × 1', 'τ = 6×10⁻³ N.m'] } };
  const PS = .3, YW = -.38;
  const D = { id: 'g11_b_torque', page: 241, fig: 'الشكلان 15 و 16 + مثال 6',
    desc: 'ملف مستطيل يحمل تياراً في مجال منتظم: الضلعان الموازيان للمجال لا تؤثر فيهما قوة، والضلعان العموديان عليه يتأثران بقوتين متساويتين متعاكستين F = I a B تكوّنان ازدواجاً يدير الملف. عزم الازدواج τ = B I A N sinθ حيث θ الزاوية بين العمود على مستوي الملف (متجه العزم المغناطيسي μ = N I A) والمجال. العزم أعظم عندما يوازي مستوي الملف المجال وصفر عندما يكون عمودياً عليه.',
    tags: 'عزم الازدواج ملف مستطيل τ=BIANsinθ العزم المغناطيسي μ=NIA ثنائي القطب المحرك الكهربائي مثال 6 مسألة 3 مسألة 7 س6 الشكل 15 الشكل 16',
    tools: ['ملف مستطيل على محور', 'قطبا مغناطيس', 'مصدر تيار'],
    steps: ['أدر الملف بسحب متجه العمود في المنظر العلوي، أو بمنزلق الزاوية θ.', 'لاحظ القوتين الحمراوين على الضلعين العموديين: متساويتان متعاكستان تكوّنان ازدواجاً.', 'عندما يوازي مستوي الملف المجال يكون العزم أعظم، وعندما يتعامد عليه ينعدم.', 'حرّر الملف فيدور حتى يصطف μ مع المجال، ثم حل مثال 6 والمسألتين.'],
    concl: ['τ = B I A N sinθ ، و θ بين العمود على مستوي الملف والمجال.', 'μ = N I A متجه العزم المغناطيسي عمودي على مستوي الملف.', 'العزم أعظم عندما يوازي مستوي الملف المجال، وصفر عندما يكون مستويه عمودياً على المجال.', 'مثال 6: τ = 1.35×10⁻⁴ N.m.'],
    laws: ['g11_l10_tau'],
    controls: [R('I', 'التيار I', 0, 10, .045, .005, 'A'), R('B', 'المجال B', 0, 1, .15, .01, 'T'), R('N', 'عدد اللفات N', 1, 200, 100, 1, ''), R('th', 'الزاوية θ بين μ و B', 0, 180, 90, 1, '°')],
    setup(S) { S.pb = 'ex6'; S.bt = 0; S.om = 0; S.free = false; S.ph = 0; S.ex = 0; S.k = 0; S.va = 1; S.vb = 1; },
    dims(S) { const P = PB[S.pb]; return [P.a, P.b]; },
    A(S) { const d = D.dims(S); return d[0] * d[1] * 1e-4; },
    tmax(S) { return S.p.B * S.p.I * D.A(S) * S.p.N; },
    theta(S) { return Math.acos(clamp(Math.sin(S.bt), -1, 1)) * 180 / Math.PI; },
    geo(S) { const g = Q60.geo(S); g.cx = (g.x0 + g.x1) / 2; g.cy = g.y0 + (g.y1 - g.y0) * .34; g.dx = g.x0 + 70; g.dy = g.y1 - 84; return g; },
    P(g, X, Y, Z) { const c = Math.cos(YW), s = Math.sin(YW), x1 = X * c + Z * s, z1 = -X * s + Z * c, y2 = Y * Math.cos(PS) - z1 * Math.sin(PS), z2 = Y * Math.sin(PS) + z1 * Math.cos(PS); return [g.cx + x1 * .9, g.cy - y2 * .9, z2]; },
    update(S, dt) { const d = D.dims(S), m = Math.max(d[0], d[1]); S.va = Q60.ez(S.va, d[0] / m, dt, 6); S.vb = Q60.ez(S.vb, d[1] / m, dt, 6);
      if (S.free && S.p.I > 0 && S.p.B > 0) { const acc = 10 * Math.cos(S.bt) - 1.6 * S.om; S.om += acc * dt; S.bt += S.om * dt; }
      else { const tg = Q60.d2r(90 - S.p.th); let df = tg - S.bt; df = Math.atan2(Math.sin(df), Math.cos(df)); S.bt += df * Math.min(1, dt * 8); S.om = 0; }
      S.ph += dt * (10 + S.p.I * 8); },
    box(ctx, g, x0, x1, lab) { const C = []; [-95, 95].forEach(Y => [-45, 45].forEach(Z => [x0, x1].forEach(X => C.push([X, Y, Z])))); const F = [[0, 1, 3, 2], [4, 5, 7, 6], [0, 1, 5, 4], [2, 3, 7, 6], [0, 2, 6, 4], [1, 3, 7, 5]].map(f => ({ f, z: f.reduce((s, i) => s + D.P(g, ...C[i])[2], 0) / 4 })).sort((a, b) => a.z - b.z);
      const col = lab === 'N' ? '#dc2626' : '#2563eb';
      F.forEach((q, k) => { const pts = q.f.map(i => D.P(g, ...C[i])); K.raw(ctx, () => { ctx.fillStyle = shade(col, -50 + k * 18); ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.lineWidth = 1; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.stroke(); }); });
      const c = D.P(g, (x0 + x1) / 2, 0, 45); Q42.T(ctx, lab, c[0], c[1], { s: 22, w: 900, c: '#fff' }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), b = S.bt, u = [Math.cos(b), 0, -Math.sin(b)], n = [Math.sin(b), 0, Math.cos(b)], hb = 78 * S.vb, ha = 78 * S.va, th = D.theta(S), tm = D.tmax(S), tau = tm * Math.sin(Q60.d2r(th));
      Q60.bg(ctx, w, h); Q60.panel(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, '#f8fafc');
      D.box(ctx, g, -200, -150, 'N');
      // field lines N → S
      [-70, -25, 25, 70].forEach(Y => [-30, 30].forEach(Z => { const a = D.P(g, -150, Y, Z), c = D.P(g, 150, Y, Z); Q41.line(ctx, [a, c], 'rgba(190,24,93,.45)', 1.6); const L = Math.hypot(c[0] - a[0], c[1] - a[1]), an = Math.atan2(c[1] - a[1], c[0] - a[0]); for (let t = (S.ph * 3) % 60; t < L; t += 60) MAG9.arrowHead(ctx, a[0] + Math.cos(an) * t, a[1] + Math.sin(an) * t, an, 5, 'rgba(190,24,93,.7)'); }));
      // axle
      const ax0 = D.P(g, 0, -ha - 40, 0), ax1 = D.P(g, 0, ha + 40, 0); Q41.line(ctx, [ax0, ax1], '#475569', 3, [7, 5]);
      const cn = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([s, t]) => D.P(g, s * hb * u[0], t * ha, s * hb * u[2]));
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(254,243,199,.35)'; ctx.beginPath(); cn.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); });
      Q33.wire(ctx, cn.concat([cn[0]]), { thick: 1 });
      if (S.p.I > 0) Q33.flow(ctx, cn.concat([cn[0]]), S.ph * 4, 'c', { sp: 34 });
      ['1', '2', '3', '4'].forEach((lab, i) => { const a = cn[i], c = cn[(i + 1) % 4]; Q42.T(ctx, lab, (a[0] + c[0]) / 2 + (i === 1 ? 14 : i === 3 ? -14 : 0), (a[1] + c[1]) / 2 + (i === 0 ? 14 : i === 2 ? -14 : 0), { s: 11, w: 900, c: '#fff', bg: '#0f766e' }); });
      // forces on sides 2 and 4 (along ∓Z) and 1, 3 (along ∓Y)
      if (S.p.I > 0 && S.p.B > 0) { const fL = 95; [[1, -1], [-1, 1]].forEach(([s, fz]) => { const m = D.P(g, s * hb * u[0], 0, s * hb * u[2]), e = D.P(g, s * hb * u[0], 0, s * hb * u[2] + fz * fL); Q60.vec(ctx, m[0], m[1], e[0], e[1], '#dc2626', 'F', { w: 4.5 }); });
        const fy = Math.sin(b) * 40; if (Math.abs(fy) > 4) [-1, 1].forEach(t => { const m = D.P(g, 0, t * ha, 0), e = D.P(g, 0, t * ha + t * fy, 0); Q60.vec(ctx, m[0], m[1], e[0], e[1], '#ea580c', '', { w: 3 }); }); }
      const o = D.P(g, 0, 0, 0), mu = D.P(g, n[0] * 80, 0, n[2] * 80); Q60.vec(ctx, o[0], o[1], mu[0], mu[1], '#16a34a', 'μ', { w: 4.5 });
      D.box(ctx, g, 150, 200, 'S');
      // top view dial
      const dx = g.dx, dy = g.dy, R0 = 46; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(dx, dy, R0 + 10, 0, TAU); ctx.fill(); ctx.stroke(); });
      Q60.vec(ctx, dx - R0, dy - R0 * .72, dx + R0, dy - R0 * .72, 'rgba(190,24,93,.8)', '', { w: 2.4, hs: 8, flat: 1 }); Q42.T(ctx, 'B', dx + R0 + 4, dy - R0 * .72 - 10, { s: 11, w: 900, c: '#be185d' });
      Q41.line(ctx, [[dx - u[0] * R0 * .8, dy - u[2] * R0 * .8], [dx + u[0] * R0 * .8, dy + u[2] * R0 * .8]], '#c2410c', 6);
      Q60.vec(ctx, dx, dy, dx + n[0] * R0, dy + n[2] * R0, '#16a34a', '', { w: 3.5 }); Q41.knob(ctx, dx + n[0] * R0, dy + n[2] * R0, '#16a34a', 8);
      Q42.T(ctx, 'منظر علوي', dx, dy + R0 + 18, { s: 10.5, w: 900, c: '#334155' });
      // τ–θ graph
      const gx0 = dx + 90, gx1 = g.x1 - 18, gy0 = g.y1 - 132, gy1 = g.y1 - 30;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, gx0 - 14, gy0 - 14, gx1 - gx0 + 24, gy1 - gy0 + 34, 10); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.stroke(); });
      Q41.line(ctx, [[gx0, gy0], [gx0, gy1], [gx1, gy1]], '#334155', 1.5);
      Q41.line(ctx, Array.from({ length: 61 }, (_, i) => [gx0 + (gx1 - gx0) * i / 60, gy1 - (gy1 - gy0) * Math.sin(Math.PI * i / 60)]), '#7c3aed', 2.4);
      Q41.dot(ctx, gx0 + (gx1 - gx0) * th / 180, gy1 - (gy1 - gy0) * Math.sin(Q60.d2r(th)), '#dc2626', 6);
      Q42.T(ctx, 'τ', gx0 - 6, gy0 - 4, { s: 12, w: 900, c: '#7c3aed' }); Q42.T(ctx, 'θ', gx1 + 2, gy1 + 12, { s: 12, w: 900, c: '#334155' }); Q42.T(ctx, '90°', (gx0 + gx1) / 2, gy1 + 12, { s: 10, w: 700, c: '#64748b' }); Q42.T(ctx, '180°', gx1 - 14, gy1 + 12, { s: 10, w: 700, c: '#64748b' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q60.drawSteps(ctx, C.e); Q42.drawChips(ctx, C.f);
      const pb = PB[S.pb], dm = D.dims(S);
      if (S.ex) Q42.steps(ctx, S, { title: pb.t, q: pb.q, lines: pb.lines, k: S.k }, { y: 64, x: w - 12, wd: 312 });
      else Q42.card(ctx, S, [{ t: 'τ = B I A N sin θ', mono: 1, c: '#0f172a', w: 900 }, { t: 'μ = N I A = ' + Q60.sci(S.p.N * S.p.I * D.A(S)) + ' A.m²', mono: 1, c: '#16a34a', w: 800 }, { t: 'A = ' + Q60.sci(D.A(S)) + ' m²', mono: 1, c: '#a16207', w: 800 }, { t: 'θ = ' + Math.round(th) + '°', mono: 1, c: '#0f766e', w: 900 }, { t: 'τ = ' + Q60.sci(tau) + ' N.m', mono: 1, c: '#7c3aed', w: 900 },
        { t: th > 88 && th < 92 ? 'مستوي الملف يوازي المجال: العزم أعظم' : (th < 2 || th > 178) ? 'مستوي الملف عمودي على المجال: لا عزم' : 'العزم بين الصفر والقيمة العظمى', c: '#be123c', w: 900 }, { t: 'الضلعان 1 و 3 لا يولّدان عزماً حول المحور', c: '#64748b', s: 11.5 }], { title: 'عزم الازدواج على ملف', y: 64, wd: 304 });
      Q42.banner(ctx, w, S.free ? 'الملف حر: يدور حتى يصطف μ مع B' : 'اسحب متجه العمود في المنظر العلوي');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pb', Object.keys(PB).map(k => [k, PB[k].t]), g.h - 128, S.pb, (S2, k) => { S2.pb = k; PB[k].set(S2); S2.free = false; S2.ex = 0; S2.k = 0; }, { bw: 150 }),
      e: Q60.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { PB[S2.pb].set(S2); S2.free = false; }, 8),
      f: Q42.chips(S, 'fr', [['fr', 'حرّر الملف ↻']], g.h - 84, S.free ? 'fr' : '', S2 => { S2.free = !S2.free; S2.om = 0; if (!S2.free) setParam(S2, 'th', Math.round(D.theta(S2))); }, { bw: 160, x0: g.L + 350 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), b = Q60.d2r(90 - S.p.th);
      return [{ id: 'dial', x: g.dx + Math.sin(S.free ? S.bt : b) * 46, y: g.dy + Math.cos(S.free ? S.bt : b) * 46, r: 18, axis: 'xy', keep: true, idle: 'اسحب ✋', tip: 'أدر الملف', drag: (S2, d) => { S2.free = false; const bb = Math.atan2(d.x - g.dx, d.y - g.dy); setParam(S2, 'th', Math.round(Math.acos(clamp(Math.sin(bb), -1, 1)) * 180 / Math.PI)); } }].concat(C.p, C.e, C.f); },
    readings(S) { const th = D.theta(S); return [rd('الزاوية θ', Math.round(th) + '°'), rd('العزم τ', Q60.sci(D.tmax(S) * Math.sin(Q60.d2r(th))) + ' N.m'), rd('العزم الأعظم', Q60.sci(D.tmax(S)) + ' N.m')]; },
    record(S) { const th = D.theta(S); return { t: Math.round(th), q: +(D.tmax(S) * Math.sin(Q60.d2r(th))).toExponential(3) }; },
    cols: [['t', 'θ (°)'], ['q', 'τ (N.m)']],
    explain(S) { return Q26.ex('القوتان على الضلعين العموديين على المجال متساويتان ومتعاكستان فتديران الملف حتى يصبح مستويه عمودياً على المجال.', 'القوتان F = N I a B بينهما ذراع b sinθ فيكون العزم τ = N I a b B sinθ = B I A N sinθ ، وينعدم عندما يصطف μ مع B.', 'هذا هو مبدأ عمل المحرك الكهربائي والكلفانوميتر.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== H1 — الهسترة المغناطيسية: المناطق المغناطيسية وحلقة الهسترة (الشكلان 17 و 18، ص 243–244) =============== */
(() => {
  const MAT = { soft: { n: 'حديد مطاوع', c: .08, u: .34, col: '#64748b' }, hard: { n: 'فولاذ صلب', c: .42, u: .22, col: '#334155' } };
  const NH = 288, NX = 16, NY = 3;
  const mk = k => { const m = MAT[k]; let z = 11; const rnd = () => { z = (z * 16807) % 2147483647; return z / 2147483647; };
    const H = Array.from({ length: NH }, (_, j) => { const c = m.c * (.5 + rnd()), u = (rnd() - .5) * 2 * m.u, a = u + c, b = u - c; return { a, b, s: a < 0 ? 1 : b > 0 ? -1 : (j % 2 ? 1 : -1) }; }); return H; };
  const step = (H, x) => { let s = 0; H.forEach(q => { if (x > q.a) q.s = 1; else if (x < q.b) q.s = -1; s += q.s; }); return s / H.length; };
  const Bof = (M, x) => .8 * M + .2 * Math.tanh(x / .3);
  const D = { id: 'g11_b_hyst', page: 243, fig: 'الشكلان 17 و 18',
    desc: 'عند وضع ساق حديد غير ممغنطة داخل ملف لولبي تكون مناطقها المغناطيسية عشوائية الاتجاه (B = 0). بزيادة التيار يزداد المجال الخارجي B₀ فتصطف المناطق تدريجياً ويزداد B في المادة حتى التشبع عند b. وعند إنقاص التيار إلى الصفر يبقى في المادة مجال متخلف عند c ، ولإزالته نعكس التيار حتى d ، ثم التشبع المعاكس عند e وهكذا حتى تكتمل حلقة الهسترة. حلقة الفولاذ الصلب عريضة كبيرة المساحة فهو يحتفظ بمغناطيسيته، وحلقة الحديد المطاوع رفيعة صغيرة المساحة فيفقدها بسرعة.',
    tags: 'الهسترة المغناطيسية التخلف المغناطيسي حلقة الهسترة المناطق المغناطيسية التشبع المغناطيسية المتخلفة الحديد المطاوع الفولاذ الصلب الطاقة المبددة حرارة الشكل 17 الشكل 18',
    tools: ['ملف لولبي', 'ساق حديد مطاوع', 'ساق فولاذ', 'مقاومة متغيرة لتغيير التيار'],
    steps: ['ابدأ من a: الساق غير ممغنطة ومناطقها عشوائية. اسحب منزلق التيار نحو اليمين ببطء.', 'راقب اصطفاف المناطق حتى التشبع عند b ، ثم أرجع التيار إلى الصفر: يبقى مجال متخلف عند c.', 'اعكس التيار حتى ينعدم B عند d ثم إلى التشبع المعاكس e ، ثم عُد لتكمل الحلقة عبر f و g.', 'قارن بين حلقة الحديد المطاوع وحلقة الفولاذ الصلب، أو شغّل الدورة التلقائية.'],
    concl: ['المادة غير الممغنطة مناطقها عشوائية فمحصلة مجالها صفر.', 'بزيادة المجال الخارجي تصطف المناطق حتى التشبع.', 'يتخلف B عن B₀ فيبقى في المادة مجال عندما B₀ = 0 ، وهذه هي الهسترة.', 'الفولاذ الصلب حلقته عريضة فيحتفظ بالمغناطيسية، والحديد المطاوع حلقته رفيعة فيفقدها بسرعة.', 'مساحة حلقة الهسترة تمثل الطاقة المبددة بشكل حرارة في القلب الحديدي.'],
    laws: ['g11_l10_sol'],
    controls: [R('H', 'التيار في الملف', -100, 100, 0, 1, '%'), TG('ref', 'الحلقة الكاملة', true, null, 'chart'), TG('lab', 'النقاط a … g', true, null, 'labels')],
    setup(S) { S.mat = 'soft'; D.reset(S); },
    reset(S) { S.hy = mk(S.mat); S.hx = 0; S.M = 0; S.tr = [[0, 0]]; S.auto = false; S.at = 0; S.ht = 0; S.lst = S.p.H;
      let z = 5; const rnd = () => { z = (z * 16807) % 2147483647; return z / 2147483647; }; S.cells = Array.from({ length: NX * NY }, () => { const r = rnd() * TAU; return { a: r, r }; }); D.refLoop(S); },
    refLoop(S) { const H = mk(S.mat), P = []; step(H, 0); const go = (x0, x1) => { for (let i = 0; i <= 80; i++) { const x = x0 + (x1 - x0) * i / 80; P.push([x, Bof(step(H, x), x)]); } };
      go(0, 1); const iB = P.length - 1; go(1, -1); go(-1, 1); S.ref = P.slice(iB);
      const at = (i0, i1, f) => { for (let i = i0; i < i1; i++) if (f(P[i], P[i + 1])) return P[i + 1]; return P[i1]; };
      S.pts = { a: [0, 0], b: P[iB], c: at(iB, iB + 81, (p, q) => p[0] > 0 && q[0] <= 1e-9), d: at(iB, iB + 81, (p, q) => p[1] > 0 && q[1] <= 0), e: P[iB + 81], f: at(iB + 81, P.length - 1, (p, q) => p[0] < 0 && q[0] >= -1e-9), g: at(iB + 81, P.length - 1, (p, q) => p[1] < 0 && q[1] >= 0) }; },
    update(S, dt) { if (S.p.H !== S.lst) { S.lst = S.p.H; if (S.auto) S.auto = false; }
      if (S.auto) { S.at += dt * .9; S.ht = Math.sin(S.at); } else S.ht = S.p.H / 100;
      const nx = Q60.ez(S.hx, S.ht, dt, 4); if (Math.abs(nx - S.hx) > 1e-5) { S.hx = nx; S.M = step(S.hy, S.hx); const B = Bof(S.M, S.hx), L = S.tr[S.tr.length - 1]; if (Math.hypot(L[0] - S.hx, L[1] - B) > .006) { S.tr.push([S.hx, B]); if (S.tr.length > 1600) S.tr.shift(); } }
      const B = Bof(S.M, S.hx), ord = clamp(Math.abs(B), 0, 1), base = B >= 0 ? 0 : Math.PI;
      S.cells.forEach((c, i) => { const own = S.hy.slice(i * 6, i * 6 + 6).reduce((s, q) => s + q.s, 0), bs = own > 0 ? 0 : own < 0 ? Math.PI : base, tg = Math.abs(S.M) < .08 && Math.abs(S.hx) < .05 && S.tr.length < 3 ? c.r : bs + Math.sin(c.r) * (1 - ord) * 1.1; let df = tg - c.a; df = Math.atan2(Math.sin(df), Math.cos(df)); c.a += df * Math.min(1, dt * 6); }); },
    geo(S) { const g = Q60.geo(S); g.cx = (g.x0 + g.x1) / 2; g.ry = g.y0 + 120; g.sy = g.y0 + 270; return g; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), B = Bof(S.M, S.hx), m = MAT[S.mat]; Q60.bg(ctx, w, h); Q60.panel(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, '#f8fafc');
      const rl = 330, rt = 64, rx = g.cx - rl / 2, ry = g.ry - rt / 2;
      // rod
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, ry, 0, ry + rt); gr.addColorStop(0, '#e2e8f0'); gr.addColorStop(.5, m.col); gr.addColorStop(1, '#1e293b'); ctx.fillStyle = gr; rr(ctx, rx, ry, rl, rt, 8); ctx.fill(); });
      MAG9.domains(ctx, rx + 6, ry + 4, rl - 12, rt - 8, S.cells, NX, NY, { cells: true });
      // coil turns over rod
      for (let i = 0; i < 18; i++) { const x = rx - 6 + (i + .5) * (rl + 12) / 18; K.raw(ctx, () => { ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 5.5; ctx.beginPath(); ctx.ellipse(x, g.ry, 6, rt / 2 + 10, .14, Math.PI / 2, Math.PI * 1.5); ctx.stroke(); ctx.strokeStyle = '#e08a3c'; ctx.lineWidth = 3.2; ctx.beginPath(); ctx.ellipse(x, g.ry, 6, rt / 2 + 10, .14, Math.PI / 2, Math.PI * 1.5); ctx.stroke(); }); }
      if (Math.abs(S.hx) > .03) Q60.vec(ctx, g.cx - Math.sign(S.hx) * 80, g.ry - rt / 2 - 34, g.cx + Math.sign(S.hx) * (40 + 60 * Math.abs(S.hx)), g.ry - rt / 2 - 34, '#2563eb', 'B₀', { w: 4 });
      if (Math.abs(B) > .15) { Q42.T(ctx, B > 0 ? 'N' : 'S', rx + rl + 24, g.ry, { s: 20, w: 900, c: B > 0 ? '#dc2626' : '#2563eb' }); Q42.T(ctx, B > 0 ? 'S' : 'N', rx - 24, g.ry, { s: 20, w: 900, c: B > 0 ? '#2563eb' : '#dc2626' }); }
      Q42.T(ctx, Math.abs(B) < .06 ? 'المناطق عشوائية: B ≈ 0' : Math.abs(B) > .9 ? 'المناطق مصطفة: تشبع' : 'المناطق مصطفة جزئياً', g.cx, g.ry + rt / 2 + 26, { s: 12, w: 900, c: '#fff', bg: Math.abs(B) > .9 ? '#be123c' : '#0f766e' });
      Q41.slider(ctx, g.x0 + 40, g.x1 - 40, g.sy, (S.p.H + 100) / 200, 'التيار: يسار سالب ويمين موجب', '#ca8a04'); Q41.line(ctx, [[g.cx, g.sy - 12], [g.cx, g.sy + 12]], '#475569', 1.5);
      // B–B0 graph
      const gx0 = g.x0 + 30, gx1 = g.x1 - 30, gy0 = g.sy + 40, gy1 = g.y1 - 24, ox = (gx0 + gx1) / 2, oy = (gy0 + gy1) / 2, sx = (gx1 - gx0) / 2 / 1.08, sy = (gy1 - gy0) / 2 / 1.08, T = p => [ox + p[0] * sx, oy - p[1] * sy];
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, gx0 - 12, gy0 - 14, gx1 - gx0 + 24, gy1 - gy0 + 28, 10); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.stroke(); });
      Q41.line(ctx, [[gx0, oy], [gx1, oy]], '#334155', 1.4); Q41.line(ctx, [[ox, gy0], [ox, gy1]], '#334155', 1.4);
      Q42.T(ctx, 'B₀', gx1 - 8, oy - 10, { s: 12, w: 900, c: '#2563eb' }); Q42.T(ctx, 'B', ox + 12, gy0 + 2, { s: 12, w: 900, c: '#be123c' });
      if (S.p.ref) { K.raw(ctx, () => { ctx.fillStyle = 'rgba(250,204,21,.28)'; ctx.beginPath(); S.ref.forEach((p, i) => { const q = T(p); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath(); ctx.fill(); }); Q41.line(ctx, S.ref.map(T), 'rgba(161,98,7,.55)', 1.6, [5, 4]); }
      if (S.tr.length > 1) Q41.line(ctx, S.tr.map(T), '#be123c', 2.6);
      if (S.p.lab) Object.keys(S.pts).forEach(k => { const q = T(S.pts[k]); Q41.dot(ctx, q[0], q[1], '#0f172a', 3.5); Q42.T(ctx, k, q[0] + (k === 'd' || k === 'e' || k === 'f' ? -11 : 11), q[1] + (k === 'b' || k === 'c' ? -10 : 10), { s: 12, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.8)' }); });
      const cur = T([S.hx, B]); Q41.dot(ctx, cur[0], cur[1], '#dc2626', 6.5);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.a);
      Q42.card(ctx, S, [{ t: 'المادة: ' + m.n, c: '#0f172a', w: 900 }, { t: 'المجال الخارجي النسبي B₀ = ' + Q60.f(S.hx, 2), c: '#2563eb', w: 800 }, { t: 'المجال النسبي في المادة B = ' + Q60.f(B, 2), c: '#be123c', w: 800 },
        { t: S.mat === 'hard' ? 'حلقة عريضة: يحتفظ بالمغناطيسية' : 'حلقة رفيعة: يفقد المغناطيسية بسرعة', c: '#15803d', w: 900 }, { t: 'النقطة c مغناطيسية متخلفة، والنقطة d إزالتها بمجال معاكس', c: '#334155', s: 11.5 }, { t: 'فكر: مساحة الحلقة تمثل الطاقة المبددة حرارةً في القلب', c: '#a16207', w: 800, s: 11.5 }], { title: 'الهسترة المغناطيسية', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب منزلق التيار ذهاباً وإياباً');
    },
    chips(S, g) { return { m: Q42.chips(S, 'mat', Object.keys(MAT).map(k => [k, MAT[k].n]), g.h - 128, S.mat, (S2, k) => { S2.mat = k; setParam(S2, 'H', 0); D.reset(S2); }, { bw: 160 }),
      a: Q42.chips(S, 'act', [['auto', 'دورة كاملة تلقائية'], ['dm', 'ساق جديدة غير ممغنطة']], g.h - 84, S.auto ? 'auto' : '', (S2, k) => { if (k === 'auto') { S2.auto = !S2.auto; S2.at = Math.asin(clamp(S2.hx, -1, 1)); } else { setParam(S2, 'H', 0); D.reset(S2); } }, { bw: 190 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); return [Q41.sdrag('H', g.x0 + 40, g.x1 - 40, g.sy, (S.p.H + 100) / 200, (S2, t) => { setParam(S2, 'H', Math.round(t * 200 - 100)); S2.auto = false; }, { tip: 'اسحب لتغيير التيار', extra: { idle: 'اسحب ✋' } })].concat(C.m, C.a); },
    readings(S) { const B = Bof(S.M, S.hx); return [rd('المادة', MAT[S.mat].n), rd('المجال الخارجي B₀', Q60.f(S.hx, 2)), rd('المجال في المادة B', Q60.f(B, 2))]; },
    record(S) { return { h: +S.hx.toFixed(2), b: +Bof(S.M, S.hx).toFixed(2) }; },
    cols: [['h', 'B₀'], ['b', 'B']],
    explain(S) { return Q26.ex('عند إرجاع التيار إلى الصفر لا يعود B إلى الصفر بل يبقى في الساق مجال متخلف، ويحتاج إلى تيار معاكس لإزالته.', 'المناطق المغناطيسية التي اصطفت لا تعود كلها إلى العشوائية عند زوال المجال الخارجي، فيتخلف B عن B₀ وهذه هي الهسترة. وفي كل دورة يُبذل شغل لتدوير المناطق يظهر حرارةً.', 'يصنع قلب المحولات من الحديد المطاوع لأن حلقته رفيعة فيقل الضياع الحراري، وتصنع المغانط الدائمة من الفولاذ الصلب.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== I1 — مراجعة: س7 ترتيب القوى (الشكل 20) + مسألة 1 (الشكل 21، ص 247) =============== */
(() => {
  const EX = { q: 'إلكترون يتحرك بسرعة 8×10⁶ m/s باتجاه المحور x في مجال 0.025 T يصنع 60° مع المحور x. جد القوة المؤثرة فيه وتعجيله', lines: ['F = q v B sin θ', 'F = 1.6×10⁻¹⁹ × 8×10⁶ × 0.025 × sin 60°', 'F = 1.6×10⁻¹⁹ × 8×10⁶ × 0.025 × 0.866', 'F = 2.77×10⁻¹⁴ N', 'a = F / m', 'a = 2.77×10⁻¹⁴ / 9.11×10⁻³¹', 'a = 3.04×10¹⁶ m/s²'] };
  const KS = ['a', 'b', 'c', 'd'];
  const D = { id: 'g11_b_rank', page: 247, fig: 'الشكل 20 + الشكل 21',
    desc: 'السؤال 7: سلك يسري فيه التيار نفسه ويوضع في المجال نفسه بأربعة أوضاع: مائلاً على المجال (a)، وعمودياً عليه في مستوي الصفحة (b)، وموازياً له (c)، وعمودياً على الصفحة (d). نقارن القوى F = I L B sinθ ونرتبها من الأكبر إلى الأصغر: b = d > a > c. ونحل المسألة 1 لإلكترون في أنبوبة التلفاز.',
    tags: 'س7 ترتيب القوى الشكل 20 سلك في مجال مسألة 1 إلكترون أنبوبة التلفاز 8×10⁶ 0.025 T 60 2.77×10⁻¹⁴ 3.04×10¹⁶ الشكل 21',
    tools: ['مجال منتظم', 'أربعة أسلاك متماثلة'],
    steps: ['قارن أسهم القوة وأشرطتها في الأوضاع الأربعة.', 'اسحب طرف السلك a لتغيير ميله، وراقب تغير ترتيبه.', 'لاحظ أن الوضعين b و d يعطيان القوة نفسها لأن السلك عمودي على المجال في الحالتين.', 'اضغط حل المسألة 1 خطوة خطوة.'],
    concl: ['الترتيب: b = d > a > c.', 'القوة عظمى عندما يكون السلك عمودياً على المجال، سواء في مستوي الصفحة أو عمودياً عليها.', 'السلك الموازي للمجال لا يتأثر بقوة.', 'مسألة 1: F = 2.77×10⁻¹⁴ N و a = 3.04×10¹⁶ m/s².'],
    laws: ['g11_l10_ilb', 'g11_l10_qvb'],
    controls: [R('I', 'التيار I', 0, 10, 5, .5, 'A'), R('B', 'المجال B', 0, 1, .5, .05, 'T'), R('L', 'طول السلك L', .1, 1, .4, .05, 'm'), R('aa', 'ميل السلك a عن المجال', 0, 90, 40, 1, '°')],
    setup(S) { S.va = S.p.aa; S.ph = 0; S.ex = 0; S.k = 0; S.vf = { a: 0, b: 0, c: 0, d: 0 }; },
    th(S, k) { return k === 'a' ? S.p.aa : k === 'b' ? 90 : k === 'c' ? 0 : 90; },
    F(S, k) { return S.p.I * S.p.L * S.p.B * Math.sin(Q60.d2r(D.th(S, k))); },
    geo(S) { const g = Q60.geo(S); g.cw = (g.x1 - g.x0 - 30) / 2; g.chh = (g.y1 - g.y0 - 30) / 2; return g; },
    cell(g, i) { const c = i % 2, r = Math.floor(i / 2); return [g.x0 + 10 + c * (g.cw + 10), g.y0 + 10 + r * (g.chh + 10)]; },
    update(S, dt) { S.va = Q60.ez(S.va, S.p.aa, dt, 9); S.ph += dt * 30; KS.forEach(k => { S.vf[k] = Q60.ez(S.vf[k], D.F(S, k), dt, 6); }); },
    rank(S) { const v = KS.map(k => [k, +D.F(S, k).toFixed(4)]).sort((p, q) => q[1] - p[1]); let s = v[0][0]; for (let i = 1; i < 4; i++) s += (Math.abs(v[i][1] - v[i - 1][1]) < 1e-4 ? ' = ' : ' > ') + v[i][0]; return s; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), Fm = Math.max(1e-6, S.p.I * S.p.L * S.p.B); Q60.bg(ctx, w, h);
      KS.forEach((k, i) => { const [x, y] = D.cell(g, i), cw = g.cw, ch = g.chh, cx = x + cw / 2, cy = y + ch / 2 - 14, Lp = 60 + S.p.L * 80;
        Q60.panel(ctx, x, y, cw, ch, '#f8fafc'); Q60.ulines(ctx, [x + 4, y + 4, x + cw - 4, y + ch - 40], -Math.PI / 2, 34, '#be185d', S.ph, .3 + .5 * S.p.B);
        Q42.T(ctx, k, x + 18, y + 18, { s: 15, w: 900, c: '#fff', bg: '#0f766e' }); Q42.T(ctx, 'B ↑', x + cw - 24, y + 18, { s: 12, w: 900, c: '#be185d', bg: 'rgba(255,255,255,.85)' });
        if (k === 'd') { Q60.wend(ctx, cx, cy, 16, -1, ''); const f = S.vf.d / Fm; if (f > .02) Q60.vec(ctx, cx + 20, cy, cx + 20 + 60 * f, cy, '#16a34a', 'F', { w: 4 }); }
        else { const a = Q60.d2r(k === 'a' ? S.va : D.th(S, k)), ux = Math.sin(a), uy = -Math.cos(a), p0 = [cx - ux * Lp / 2, cy - uy * Lp / 2], p1 = [cx + ux * Lp / 2, cy + uy * Lp / 2];
          Q41.line(ctx, [p0, p1], '#7c2d12', 10); Q41.line(ctx, [p0, p1], '#e08a3c', 6.5); if (S.p.I > 0) Q33.flow(ctx, [p0, p1], S.ph * 2, 'c', { sp: 26 });
          if (k === 'a') Q41.knob(ctx, p1[0], p1[1], '#0f766e', 8);
          const f = S.vf[k] / Fm; if (f > .02) { Q60.perp(ctx, cx + 34, cy + 34, 7 + 9 * f, true, '#16a34a', 1); } }
        const F = D.F(S, k); Q60.bar(ctx, x + 20, y + ch - 18, cw - 40, F / Fm, '#16a34a', ''); Q42.T(ctx, 'F = ' + Q60.f(F, 2) + ' N', cx, y + ch - 36, { s: 11.5, w: 900, c: '#15803d', bg: 'rgba(255,255,255,.9)' }); });
      const C = Q60.stepChips(S, 'ex', g.h - 84, g.L, 'حل المسألة 1', null, EX.lines.length); Q60.drawSteps(ctx, C);
      if (S.ex) Q42.steps(ctx, S, Object.assign({ title: 'مسألة 1 ص 247' }, EX, { k: S.k }), { y: 64, x: w - 12, wd: 312 });
      else Q42.card(ctx, S, [{ t: 'F = I L B sin θ', mono: 1, c: '#0f172a', w: 900 }, { t: 'الترتيب من الأكبر إلى الأصغر:', c: '#334155', w: 800 }, { t: D.rank(S), mono: 1, c: '#be123c', w: 900 }, { t: 'في b و d السلك عمودي على المجال فالقوة عظمى', c: '#15803d', w: 800 }, { t: 'في c السلك يوازي المجال فلا قوة', c: '#64748b', s: 11.5 }], { title: 'س7: ترتيب القوى', y: 64, wd: 304 });
      Q42.banner(ctx, w, 'اسحب طرف السلك a');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), [x, y] = D.cell(g, 0), cx = x + g.cw / 2, cy = y + g.chh / 2 - 14, Lp = 60 + S.p.L * 80, a = Q60.d2r(S.p.aa);
      return [{ id: 'aa', x: cx + Math.sin(a) * Lp / 2, y: cy - Math.cos(a) * Lp / 2, r: 18, axis: 'xy', keep: true, idle: 'اسحب ✋', tip: 'طرف السلك a', drag: (S2, d) => setParam(S2, 'aa', clamp(Math.round(Math.atan2(Math.abs(d.x - cx), cy - d.y) * 180 / Math.PI), 0, 90)) }].concat(Q60.stepChips(S, 'ex', g.h - 84, g.L, 'حل المسألة 1', null, EX.lines.length)); },
    readings(S) { return KS.map(k => rd('القوة في ' + k, Q60.f(D.F(S, k), 3) + ' N')).concat([rd('الترتيب', D.rank(S))]); },
    explain(S) { return Q26.ex('أكبر قوة في b و d ، وأصغر منها في a ، ولا قوة في c.', 'القوة تعتمد على sinθ حيث θ بين السلك والمجال: 90° في b و d ، وأقل من 90° في a ، وصفر في c.', 'لهذا توضع أسلاك المحرك عمودية على مجال المغناطيس لتحصل على أكبر قوة.'); }
  };
  M8.P[D.id] = D;
})();

/*@@PARTS_END@@*/
/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g11_b_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f && !D._tap) { D._tap = 1; D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); } });
Object.keys(M8.P).filter(id => /^g11_b_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g11_c10_field', ch: 60, reg: X11, sec: '10-1 المجال المغناطيسي', page: 229, kind: 'نشاط',
  title: 'تجربة أورستد والمجال المغناطيسي حول مغناطيس',
  desc: 'نكرر تجربة أورستد: سلك يحمل تياراً فوق بوصلة فتنحرف إبرتها، ثم نستكشف المجال حول مغناطيس ساق ببوصلات صغيرة وخطوط مجال مقفلة.',
  tags: 'أورستد مجال مغناطيسي بوصلة خطوط المجال',
  fact: ['لاحظ العالم أورستد سنة 1820 أن إبرة البوصلة تنحرف عند وضعها بالقرب من سلك يحمل تياراً، فكان أول ربط بين الكهربائية والمغناطيسية (ص 229).', 'اتجاه المجال المغناطيسي عند أي نقطة هو الاتجاه الذي يشير إليه القطب الشمالي لإبرة البوصلة الموضوعة فيها (ص 229).'],
  quiz: [
    { q: 'المجال المغناطيسي ينشأ عن:', o: ['الشحنات المتحركة', 'ذرات الحديد', 'الشحنات الساكنة', 'المواد الدايامغناطيسية'], a: 0, why: 'س1 فقرة 1 ص 245.' },
    { q: 'اتجاه المجال المغناطيسي عند نقطة هو اتجاه:', o: ['القطب الشمالي لإبرة بوصلة عندها', 'القطب الجنوبي لإبرة البوصلة', 'العمود على خطوط المجال', 'حركة الشحنة الموجبة'], a: 0, why: 'ص 229.' },
    { q: 'يكون المجال المغناطيسي أقوى حيث:', o: ['تتقارب خطوط المجال', 'تتباعد خطوط المجال', 'تنعدم الخطوط', 'تتقاطع الخطوط'], a: 0, why: 'س1 فقرة 3.' }],
  parts: [{ id: 'g11_b_oersted', n: 'تجربة أورستد: سلك فوق بوصلة' }, { id: 'g11_b_bar', n: 'المجال وخطوطه حول مغناطيس ساق' }] });
M8.merge({ id: 'g11_c10_flux', ch: 60, reg: X11, sec: '10-2 الفيض المغناطيسي وكثافة الفيض', page: 230, kind: 'مثال',
  title: 'الفيض المغناطيسي: Φ = B A cosθ + الجدول 1 + مثال 1',
  desc: 'ندير ورقة داخل مجال منتظم ونعد خطوط المجال المخترقة لها، ونرى أن الفيض أعظم عندما تكون عمودية على الخطوط وصفر عندما توازيها، ونقارن قيم المجال في الجدول 1، ونحل مثال 1.',
  tags: 'الفيض المغناطيسي كثافة الفيض ويبر تسلا',
  fact: ['وحدة الفيض المغناطيسي الويبر Wb ، والويبر يساوي 10⁸ ماكسويل (ص 230).', 'وحدة كثافة الفيض المغناطيسي التسلا T = Wb/m² ، ومجال الأرض عند سطحها نحو 0.5×10⁻⁴ T بينما يصل المغناطيس فائق التوصيل إلى 30 T (الجدول 1 ص 231).'],
  quiz: [
    { q: 'يكون الفيض المغناطيسي خلال سطح صفراً عندما يكون السطح:', o: ['موازياً لخطوط المجال', 'عمودياً على خطوط المجال', 'مائلاً بزاوية 45°', 'كبير المساحة'], a: 0, why: 'الشكل 3a ص 230.' },
    { q: 'وحدة كثافة الفيض المغناطيسي التسلا تكافئ:', o: ['Wb/m²', 'Wb.m²', 'N.m', 'A/m'], a: 0, why: 'B = Φ/A.' },
    { q: 'مثال 1: الفيض خلال الورقة يساوي:', o: ['1.92×10⁻⁶ T.m²', '3.2×10⁻⁶ T.m²', '2.55×10⁻⁶ T.m²', 'صفر'], a: 0, why: 'Φ = 5.31×10⁻⁵ × 6.02×10⁻² × cos 53°.' }],
  parts: [{ id: 'g11_b_flux', n: 'الفيض خلال ورقة دوّارة + الجدول 1 + مثال 1' }] });
M8.merge({ id: 'g11_c10_earth', ch: 60, reg: X11, sec: '10-3 المجال المغناطيسي الأرضي + 10-4 زاويتا الميل والانحراف', page: 232, kind: 'نشاط',
  title: 'المجال المغناطيسي الأرضي وزاويتا الميل والانحراف',
  desc: 'نرى الأرض مغناطيساً كبيراً يميل محوره 11° عن محور دورانها، ونسحب إبرة الميل من الاستواء إلى القطب فتتغير زاوية الميل من 0° إلى 90°، ثم نقيس زاوية الانحراف على خريطة قطبية.',
  tags: 'المجال الأرضي زاوية الميل زاوية الانحراف',
  fact: ['هل تعلم: إن بعض الطيور تستعين بالمجال المغناطيسي الأرضي في أثناء هجرتها (ص 232).', 'يقع القطب المغناطيسي الجنوبي للأرض قرب قطبها الجغرافي الشمالي، لذلك ينجذب إليه القطب الشمالي لإبرة البوصلة (ص 232).'],
  quiz: [
    { q: 'زاوية الميل عند القطب المغناطيسي تساوي:', o: ['90°', '0°', '45°', '11°'], a: 0, why: 'ص 232.' },
    { q: 'الزاوية بين خط الزوال المغناطيسي وخط الزوال الجغرافي هي:', o: ['زاوية الانحراف', 'زاوية الميل', 'الزاوية الحرجة', 'زاوية السقوط'], a: 0, why: 'ص 232.' },
    { q: 'يميل المحور المغناطيسي للأرض عن محور دورانها بنحو:', o: ['11°', '23.5°', '45°', '90°'], a: 0, why: 'ص 232.' }],
  parts: [{ id: 'g11_b_earth', n: 'الأرض مغناطيس: زاويتا الميل والانحراف' }] });
M8.merge({ id: 'g11_c10_charge', ch: 60, reg: X11, sec: '10-5 القوة المغناطيسية على شحنة متحركة + 10-7 حركة الشحنة في مجال منتظم', page: 233, kind: 'مثال',
  title: 'القوة على شحنة متحركة والمسار الدائري',
  desc: 'نحرك شحنة في مجال منتظم بأي اتجاه فنرى أن القوة F = |q| v B sinθ عمودية على السرعة والمجال، ونجرب حالات س4 ونحل مثال 2، ثم نطلق بروتوناً أو إلكتروناً عمودياً على المجال فيدور في دائرة r = m v / q B ونحل المسائل 2 و 5 و 6.',
  tags: 'قوة مغناطيسية شحنة متحركة قاعدة الكف اليمنى مسار دائري',
  fact: ['تكون القوة المغناطيسية أعظم ما يمكن عندما تتحرك الشحنة عمودياً على المجال، وصفراً عندما تتحرك موازية له (ص 233).', 'الشغل الذي تبذله القوة المغناطيسية على شحنة تتحرك عمودياً على المجال يساوي صفراً لأنها عمودية على الإزاحة (س2 ص 245).'],
  quiz: [
    { q: 'مثال 2: بروتون 5×10⁶ m/s في مجال 0.4 T بزاوية 30°. القوة المؤثرة فيه:', o: ['1.6×10⁻¹³ N', '3.2×10⁻¹³ N', '8×10⁻¹⁴ N', 'صفر'], a: 0, why: 'F = qvB sin30°.' },
    { q: 'شحنة تتحرك عمودياً على مجال منتظم. المجال يغيّر:', o: ['اتجاه سرعتها', 'شحنتها', 'كتلتها', 'طاقتها الحركية'], a: 0, why: 'س1 فقرة 7.' },
    { q: 'هل يؤثر المجال المغناطيسي في شحنة ساكنة؟', o: ['لا، لأن v = 0', 'نعم دائماً', 'فقط إذا كانت موجبة', 'فقط في المجال القوي'], a: 0, why: 'س5 ص 247.' },
    { q: 'مسألة 2: بروتون يدور بنصف قطر 14 cm في مجال 0.35 T. سرعته:', o: ['4.69×10⁶ m/s', '2.9×10⁶ m/s', '7.6×10⁻⁵ m/s', '8×10⁶ m/s'], a: 0, why: 'v = qBr/m.' }],
  parts: [{ id: 'g11_b_force', n: 'القوة على شحنة متحركة + مثال 2 + س4' }, { id: 'g11_b_circle', n: 'المسار الدائري + المسائل 2 و 5 و 6' }] });
M8.merge({ id: 'g11_c10_wire', ch: 60, reg: X11, sec: '10-6 تأثير المجال المغناطيسي في سلك يحمل تياراً', page: 235, kind: 'مثال',
  title: 'القوة على سلك يحمل تياراً: F = I L B sinθ + مثال 3',
  desc: 'ساق نحاسية يسري فيها تيار بين قطبي مغناطيس، نغير الزاوية والتيار والمجال والطول فنراها تندفع، ونحل مثال 3.',
  tags: 'قوة على سلك تيار مغناطيس حرف U سرعة الانجراف س7 مسألة 1',
  fact: ['الشحنات داخل السلك تتحرك بسرعة صغيرة تسمى سرعة الانجراف v_d = I / NqA ، ومجموع القوى عليها يعطي F = I L B sinθ (ص 235).', 'تنعدم القوة على السلك عندما يكون التيار موازياً للمجال (ص 235).'],
  quiz: [
    { q: 'مثال 3: سلك طوله 0.5 m عمودي على مجال، يحمل 20 A ويتأثر بقوة 3 N. كثافة الفيض:', o: ['0.3 T', '30 T', '3.3 T', '0.03 T'], a: 0, why: 'B = F / I L = 3 / 10.' },
    { q: 'سلك يحمل تياراً موضوع على امتداد خطوط مجال مغناطيسي:', o: ['لا يتأثر بقوة ولا بعزم', 'يتأثر بقوة عظمى', 'يتأثر بعزم فقط', 'يتأثر بقوة نحو الأعلى'], a: 0, why: 'س1 فقرة 8.' },
    { q: 'س7 الشكل 20: ترتيب القوى من الأكبر إلى الأصغر:', o: ['b = d > a > c', 'a > b > c > d', 'c > a > b = d', 'b > a > d > c'], a: 0, why: 'القوة تتناسب مع sinθ.' },
    { q: 'مسألة 1: القوة على الإلكترون 8×10⁶ m/s في مجال 0.025 T بزاوية 60°:', o: ['2.77×10⁻¹⁴ N', '3.2×10⁻¹⁴ N', '1.6×10⁻¹⁴ N', '3.04×10¹⁶ N'], a: 0, why: 'F = qvB sin60°.' }],
  parts: [{ id: 'g11_b_wire', n: 'ساق نحاسية في مجال مغناطيسي + مثال 3' }] });
M8.merge({ id: 'g11_c10_biot', ch: 60, reg: X11, sec: '10-8 قانون بايوت وسافارت + 10-9 القوة بين سلكين متوازيين', page: 237, kind: 'مثال',
  title: 'المجال حول سلك مستقيم والقوة بين سلكين متوازيين',
  desc: 'نرسم المجال حول سلك مستقيم ببرادة الحديد وبوصلة متحركة ونتحقق من B = μ₀ I / 2π r ونحل مثال 4 والمسألة 8، ثم نقرّب سلكين متوازيين ونرى تجاذبهما أو تنافرهما ونحل المسألة 4.',
  tags: 'بايوت سافارت قبضة اليد اليمنى سلكان متوازيان الأمبير',
  fact: ['نفاذية الفراغ μ₀ = 4π×10⁻⁷ Wb/A.m (ص 237).', 'الأمبير هو التيار الذي إذا سرى في كل من سلكين متوازيين طويلين البعد بينهما 1 m ولّد بينهما قوة 2×10⁻⁷ N لكل متر من طولهما (ص 239).'],
  quiz: [
    { q: 'مثال 4: سلك يحمل 15 A. المجال على بعد 3 m منه:', o: ['1×10⁻⁶ T', '1×10⁻⁵ T', '3×10⁻⁶ T', '5×10⁻⁷ T'], a: 0, why: 'B = 2×10⁻⁷ × 15 / 3.' },
    { q: 'يتناسب المجال حول سلك مستقيم طويل مع البعد r عنه:', o: ['عكسياً مع r', 'طردياً مع r', 'عكسياً مع r²', 'لا يعتمد على r'], a: 0, why: 'س1 فقرة 5.' },
    { q: 'سلك أفقي يسري فيه تيار نحو الشرق. اتجاه المجال تحت السلك:', o: ['نحو الشمال', 'نحو الجنوب', 'نحو الشرق', 'نحو الأعلى'], a: 0, why: 'س1 فقرة 4: قاعدة قبضة اليد اليمنى.' },
    { q: 'سلكان متوازيان يحملان تيارين بالاتجاه نفسه:', o: ['يتجاذبان', 'يتنافران', 'لا يتأثران', 'يدوران'], a: 0, why: 'ص 239.' },
    { q: 'فكر: I₁ = 2 A و I₂ = 6 A. العلاقة بين القوتين:', o: ['F₁ = F₂', 'F₁ = 3F₂', 'F₁ = F₂ / 3', 'F₁ = 9F₂'], a: 0, why: 'كلتاهما μ₀ I₁ I₂ L / 2π r.' },
    { q: 'مسألة 4: سلكان بينهما 5 cm يحمل كل منهما 500 A بالاتجاه نفسه. القوة لكل متر:', o: ['1 N/m تجاذب', '1 N/m تنافر', '2×10⁻³ N/m تجاذب', '10 N/m تجاذب'], a: 0, why: 'F/L = 2×10⁻⁷ × 500 × 500 / 0.05.' }],
  parts: [{ id: 'g11_b_biot', n: 'المجال حول سلك مستقيم + مثال 4 + مسألة 8' }, { id: 'g11_b_two', n: 'سلكان متوازيان + مسألة 4 + تعريف الأمبير' }] });
M8.merge({ id: 'g11_c10_sol', ch: 60, reg: X11, sec: '10-10 المجال المغناطيسي لملف لولبي', page: 240, kind: 'مثال',
  title: 'الملف اللولبي: B = μ₀ N I / L + مثال 5',
  desc: 'نغير عدد لفات الملف وطوله والتيار فيه ونرى المجال المنتظم داخله وشبهه بمغناطيس ساق خارجه، ونجيب عن سؤال النابض المعلق، ونحل مثال 5.',
  tags: 'ملف لولبي مجال منتظم نابض',
  fact: ['المجال داخل الملف اللولبي منتظم تقريباً، والعلاقة B = μ₀ n I صحيحة للنقاط القريبة من المحور والبعيدة عن طرفي الملف (ص 240).'],
  quiz: [
    { q: 'خطوط المجال المغناطيسي داخل ملف لولبي:', o: ['مستقيمة متوازية منتظمة', 'تساوي صفراً', 'تزداد بالابتعاد عن المحور', 'تتناقص بالابتعاد عن المحور'], a: 0, why: 'س1 فقرة 6.' },
    { q: 'مثال 5: ملف 100 لفة طوله 20 cm يحمل 4 A. المجال عند محوره:', o: ['2.5×10⁻³ T', '2.5×10⁻⁵ T', '8×10⁻⁴ T', '0.25 T'], a: 0, why: 'B = 4π×10⁻⁷ × 100 × 4 / 0.2.' },
    { q: 'نابض خفيف معلق من السقف يمر فيه تيار كبير:', o: ['ينكمش', 'يستطيل', 'لا يتغير', 'يدور'], a: 0, why: 'لفاته تحمل تيارات بالاتجاه نفسه فتتجاذب.' }],
  parts: [{ id: 'g11_b_sol', n: 'الملف اللولبي + النابض المعلق + مثال 5' }] });
M8.merge({ id: 'g11_c10_torque', ch: 60, reg: X11, sec: '10-11 العزم المؤثر في ملف يحمل تياراً في مجال مغناطيسي', page: 241, kind: 'مثال',
  title: 'عزم الازدواج على ملف: τ = B I A N sinθ + مثال 6',
  desc: 'ملف مستطيل على محور بين قطبي مغناطيس: نديره ونرى القوتين على ضلعيه تكوّنان ازدواجاً، ونرسم τ مع θ، ونحرره فيدور حتى يصطف عزمه المغناطيسي مع المجال، ونحل مثال 6 والمسألتين 3 و 7.',
  tags: 'عزم الازدواج ملف العزم المغناطيسي محرك',
  fact: ['العزم المغناطيسي μ = N I A متجه عمودي على مستوي الملف، ويسلك الملف سلوك ثنائي قطب مغناطيسي (ص 242).'],
  quiz: [
    { q: 'مثال 6: أقصى عزم على ملف A = 2×10⁻⁴ m² و N = 100 و I = 0.045 A و B = 0.15 T:', o: ['1.35×10⁻⁴ N.m', '9×10⁻⁴ N.m', '1.35×10⁻² N.m', '6.75×10⁻⁵ N.m'], a: 0, why: 'τ = N I A B.' },
    { q: 'س6: يؤثر المجال في حلقة تحمل تياراً بأعظم عزم عندما يكون مستويها:', o: ['موازياً للمجال', 'عمودياً على المجال', 'بزاوية 45°', 'بأي وضع'], a: 0, why: 'θ بين العمود والمجال = 90°.' },
    { q: 'س6: لا يؤثر المجال في الحلقة بعزم عندما يكون مستويها:', o: ['عمودياً على المجال', 'موازياً للمجال', 'بزاوية 30°', 'بزاوية 60°'], a: 0, why: 'θ = 0 فـ sinθ = 0.' },
    { q: 'مسألة 7: لفة 5 cm × 8 cm تحمل 10 A ومستويها يوازي مجالاً 0.15 T. العزم:', o: ['6×10⁻³ N.m', '6×10⁻² N.m', '1.5 N.m', '4×10⁻³ N.m'], a: 0, why: 'τ = 0.15 × 10 × 4×10⁻³.' }],
  parts: [{ id: 'g11_b_torque', n: 'عزم الازدواج على ملف + مثال 6 + المسألتان 3 و 7' }] });
M8.merge({ id: 'g11_c10_hyst', ch: 60, reg: X11, sec: '10-12 الهسترة المغناطيسية', page: 243, kind: 'نشاط',
  title: 'الهسترة المغناطيسية: المناطق وحلقة التخلف',
  desc: 'نضع ساق حديد في ملف ونغير التيار ذهاباً وإياباً فنرى المناطق المغناطيسية تصطف ونرسم حلقة الهسترة بنقاطها a إلى g ، ونقارن الحديد المطاوع بالفولاذ الصلب.',
  tags: 'هسترة تخلف مغناطيسي مناطق مغناطيسية حديد مطاوع فولاذ',
  fact: ['فكر: إن مساحة المنحني المغلق لحلقة الهسترة يمثل مقدار الطاقة المتبددة (الضائعة) التي تظهر بشكل حرارة في القلب الحديدي (ص 244).', 'الفولاذ الصلب يحتفظ بالمغناطيسية المكتسبة لأمد أطول، أما الحديد المطاوع فيكتسبها بسرعة ويفقدها بسرعة (ص 244).'],
  quiz: [
    { q: 'المادة التي حلقة هسترتها عريضة كبيرة المساحة:', o: ['الفولاذ الصلب', 'الحديد المطاوع', 'النحاس', 'الألمنيوم'], a: 0, why: 'ص 244.' },
    { q: 'النقطة c على حلقة الهسترة تمثل:', o: ['مجالاً متخلفاً في المادة عندما B₀ = 0', 'التشبع', 'المادة غير ممغنطة', 'التشبع المعاكس'], a: 0, why: 'الشكل 18.' },
    { q: 'مساحة حلقة الهسترة تمثل:', o: ['الطاقة المبددة حرارةً في القلب', 'شدة التيار', 'المجال الأعظم', 'عدد المناطق'], a: 0, why: 'فكر ص 244.' }],
  parts: [{ id: 'g11_b_hyst', n: 'المناطق المغناطيسية وحلقة الهسترة' }] });
M8.merge({ id: 'g11_c10_review', ch: 60, reg: X11, sec: 'أسئلة الفصل العاشر', page: 245, kind: 'نشاط',
  title: 'أسئلة الفصل العاشر ومسائله',
  desc: 'مراجعة: نرتب القوى على سلك في أوضاع الشكل 20 ونحل المسألة 1، مع أسئلة الاختيار من متعدد في نهاية الفصل.',
  tags: 'أسئلة الفصل مسائل مراجعة المغناطيسية',
  fact: ['الشغل الذي يبذله المجال المغناطيسي على شحنة تتحرك عمودياً عليه يساوي صفراً (س2 ص 245).', 'لا يتأثر بالون مشحون ساكن بالقطب الشمالي لمغناطيس، لأن المجال لا يؤثر في شحنة ساكنة (س3 و س5).'],
  quiz: [
    { q: 'لرسم خطوط المجال المغناطيسي يجب أن نعرف:', o: ['مقداره واتجاهه', 'مقداره فقط', 'اتجاهه فقط', 'مصدره فقط'], a: 0, why: 'س1 فقرة 2.' },
    { q: 'يكون المجال المغناطيسي أقوى حيث:', o: ['تتقارب الخطوط', 'تتباعد الخطوط', 'تنحني الخطوط', 'تنعدم الخطوط'], a: 0, why: 'س1 فقرة 3.' },
    { q: 'الشغل الذي تبذله القوة المغناطيسية على شحنة تتحرك عمودياً على المجال:', o: ['صفر', 'q v B', 'q v B r', 'm v²'], a: 0, why: 'س2: القوة عمودية على الإزاحة.' },
    { q: 'مسألة 5: إلكترون بسرعة 4.69×10⁶ m/s في مجال 0.35 T. نصف قطر مساره:', o: ['7.6×10⁻⁵ m', '0.14 m', '1.1×10⁻⁶ m', '4.69×10⁻³ m'], a: 0, why: 'r = m v / q B.' },
    { q: 'مسألة 3: ملف 40 لفة 12 cm × 10 cm يحمل 2 A في 0.25 T ومستويه يوازي المجال. العزم:', o: ['0.24 N.m', '2.4 N.m', '0.024 N.m', '0.48 N.m'], a: 0, why: 'τ = B I A N.' }],
  parts: [{ id: 'g11_b_rank', n: 'س7 ترتيب القوى + مسألة 1' }] });
