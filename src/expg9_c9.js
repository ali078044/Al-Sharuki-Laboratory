'use strict';
/* ====================== الثالث المتوسط — الفصل التاسع: فيزياء الجو وتقنية الاتصالات الحديثة (ch 39, ص 161–172) ======================
   Merged experiments (book order): g9_c9_air (1-9) · g9_c9_layers (2-9) · g9_c9_waves (3-9) · g9_c9_mobile (4-9) · g9_c9_sat (5-9) · g9_c9_review (أسئلة الفصل).
   Local kit Q39 (blue theme): sky/space backgrounds, globe, earth arc, towers, satellites, clouds, sun, thermometer, signal bars, animated rays.
   Q41/Q42/Q43 (expg10_*) are used only inside functions. */
LW({ id: 'g9_l9_lapse', cat: 39, name: 'تناقص درجة الحرارة في التروبوسفير', fx: '<i>T</i> = <i>T</i><sub>0</sub> − 6.5 × <i>h</i>', sym: 'في طبقة التروبوسفير تتناقص درجة الحرارة بمعدل ثابت يسمى ثابت التناقص: تهبط حوالي 6.5 °C لكل كيلومتر واحد من الارتفاع. T₀ درجة الحرارة عند سطح الأرض (°C) و h الارتفاع (km).', calc: { in: [['T0', 'درجة حرارة سطح الأرض T₀', '°C', 30], ['h', 'الارتفاع h', 'km', 4]], out: 'درجة الحرارة T', u: '°C', f: v => v.T0 - 6.5 * v.h } });
LW({ id: 'g9_l9_ozone', cat: 39, name: 'تكوّن الأوزون', fx: 'O<sub>2</sub> + UV → O + O ، O + O<sub>2</sub> → O<sub>3</sub>', sym: 'تمتص جزيئة الأوكسجين O₂ الأشعة فوق البنفسجية نوع A و B القادمة من الشمس فتتفكك إلى ذرتي أوكسجين، ثم تندمج كل ذرة مع جزيئة أوكسجين مولدة جزيئة الأوزون O₃. طبقة الأوزون في الستراتوسفير تحجب الأشعة فوق البنفسجية الضارة نوع C.' });
LW({ id: 'g9_l9_orbit', cat: 39, name: 'زمن دورة القمر الصناعي', fx: '<i>T</i> = 2π ' + '√(' + FR('<i>r</i><sup>3</sup>', '<i>G M</i>') + ')' + ' ، <i>r</i> = <i>R</i><sub>E</sub> + <i>h</i>', sym: 'كلما زاد ارتفاع القمر الصناعي عن سطح الأرض زاد زمن دورته. عند ارتفاع 36000 km تقريباً يكون زمن الدورة 24 ساعة فيبقى القمر ثابتاً فوق النقطة نفسها (أقمار الاتصالات). R_E = 6371 km ، GM = 3.986×10⁵ km³/s²', calc: { in: [['h', 'ارتفاع القمر h', 'km', 36000]], out: 'زمن الدورة T', u: 'h', f: v => 2 * Math.PI * Math.sqrt(Math.pow(6371 + v.h, 3) / 398600) / 3600 } });
LW({ id: 'g9_l9_delay', cat: 39, name: 'زمن انتقال الإشارة اللاسلكية', fx: '<i>t</i> = ' + FR('<i>d</i>', '<i>c</i>') + ' ، <i>c</i> = 3×10<sup>5</sup> km/s', sym: 'الموجات اللاسلكية (الراديوية والمايكروية) موجات كهرومغناطيسية تنتشر بسرعة الضوء. الإشارة الذاهبة إلى قمر اتصالات على ارتفاع 36000 km والعائدة إلى الأرض تقطع أكثر من 72000 km فتتأخر ربع ثانية تقريباً.', calc: { in: [['d', 'المسافة d', 'km', 72000]], out: 'الزمن t', u: 's', f: v => v.d / 3e5 } });

const Q39 = {
  /* bidi helpers: keep "−60 °C" / "80 %" together; a pure Latin line is isolated LTR */
  bd(s) { s = String(s); if (!/[\u0600-\u06FF]/.test(s)) return /[A-Za-z0-9]/.test(s) ? '\u2066' + s + '\u2069' : s; return s.replace(/[−\-]?[0-9][0-9.,]*\s?(°C|%)/g, m => '\u2066' + m.replace(' ', '\u00A0') + '\u2069'); },
  T(ctx, s, x, y, o) { Q31.T(ctx, /[\u0600-\u06FF]/.test(String(s)) ? Q39.bd(s) : s, x, y, o); },
  card(ctx, S, L, o) { return Q31.card(ctx, S, L.map(q => typeof q === 'string' ? Q39.bd(q) : Object.assign({}, q, { t: Q39.bd(q.t) })), Object.assign({ bd: '#1d4ed8' }, o || {})); },
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#1d4ed8', y); },
  chips(S, id, list, y, cur, click, o = {}) { return Q33.chips(S, id, list, y, cur, click, Object.assign({ col: '#1d4ed8' }, o)); },
  drawChips(ctx, list) { list.forEach(b => Q33.drawBtn(ctx, b, b._lab, b._on ? (b._col || '#1d4ed8') : '#64748b', b._on)); },
  steps(ctx, S, st, o) { return Q42.steps(ctx, S, Object.assign({}, st, { q: Q39.bd(st.q), lines: st.lines.map(Q39.bd) }), o); },
  stepChips(S, id, y, x0, lab, onEx, n) { return Q43.stepChips(S, id, y, x0, lab, onEx, n); },
  L(S) { return S.W < 600 ? 12 : 76; },
  f(v, d = 1) { return isFinite(v) ? String(+(+v).toFixed(d)) : '∞'; },
  ez(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  rn(i) { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); },
  bg(ctx, w, h, a = '#dbeafe', b = '#f8fafc') { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, a); g.addColorStop(1, b); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  /* dark starry panel (rounded) */
  space(ctx, x, y, w, h, r = 16, seed = 1) { K.raw(ctx, () => { ctx.save(); const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#020617'); g.addColorStop(1, '#0b1a3a'); ctx.fillStyle = g; rr(ctx, x, y, w, h, r); ctx.fill(); ctx.clip(); for (let i = 0; i < 90; i++) { const sx = x + Q39.rn(i * 3 + seed) * w, sy = y + Q39.rn(i * 7 + seed + 1) * h, a = .3 + .7 * Q39.rn(i + seed * 5); ctx.fillStyle = 'rgba(255,255,255,' + a + ')'; ctx.fillRect(sx, sy, a > .8 ? 2 : 1.2, a > .8 ? 2 : 1.2); } ctx.restore(); }); },
  /* globe centred (cx,cy) radius r; o.atm atmosphere glow thickness (px); o.rot rotation phase */
  globe(ctx, cx, cy, r, o = {}) {
    K.raw(ctx, () => { ctx.save();
      if (o.atm !== 0) { const t = o.atm || r * .08, g = ctx.createRadialGradient(cx, cy, r * .98, cx, cy, r + t); g.addColorStop(0, 'rgba(125,211,252,.95)'); g.addColorStop(.5, 'rgba(56,189,248,.45)'); g.addColorStop(1, 'rgba(56,189,248,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r + t, 0, TAU); ctx.fill(); }
      const g = ctx.createRadialGradient(cx - r * .35, cy - r * .4, r * .1, cx, cy, r); g.addColorStop(0, '#60a5fa'); g.addColorStop(.6, '#1d4ed8'); g.addColorStop(1, '#0c1e5b'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fill(); ctx.clip();
      const rot = o.rot || 0; ctx.fillStyle = 'rgba(34,197,94,.85)';
      [[.1, -.2, .32, .22], [.9, .25, .25, .35], [1.9, -.35, .3, .2], [2.7, .3, .22, .3], [3.6, -.05, .35, .25], [4.6, .4, .2, .18], [5.4, -.3, .26, .2]].forEach(q => { const a = q[0] + rot, c = Math.cos(a); if (c < -.1) return; const x = cx + Math.sin(a) * r * .85, y = cy + q[1] * r; ctx.beginPath(); ctx.ellipse(x, y, r * q[2] * Math.max(.15, c), r * q[3], 0, 0, TAU); ctx.fill(); });
      if (r < 400) { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.ellipse(cx, cy - r * .99, r * .3, r * .07, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(cx, cy + r * .99, r * .35, r * .07, 0, 0, TAU); ctx.fill(); }
      const sh = ctx.createLinearGradient(cx - r, 0, cx + r, 0); sh.addColorStop(0, 'rgba(255,255,255,.12)'); sh.addColorStop(.6, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(2,6,23,.45)'); ctx.fillStyle = sh; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); ctx.restore(); });
  },
  /* big earth surface arc: circle centre (cx,cy) radius R, filled */
  arc(ctx, cx, cy, R) { K.raw(ctx, () => { ctx.save(); const g = ctx.createRadialGradient(cx, cy, R - 60, cx, cy, R); g.addColorStop(0, '#14532d'); g.addColorStop(.8, '#16a34a'); g.addColorStop(1, '#4ade80'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.strokeStyle = '#166534'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }); },
  pol(cx, cy, r, a) { return [cx + r * Math.sin(a), cy - r * Math.cos(a)]; },
  /* lattice antenna tower standing at (x,y) of height h, tilted by angle a (radians, 0 = upright) */
  tower(ctx, x, y, h, a = 0, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.strokeStyle = o.col || '#475569'; ctx.lineWidth = 2; const b = h * .16;
      ctx.beginPath(); ctx.moveTo(-b, 0); ctx.lineTo(0, -h); ctx.lineTo(b, 0); ctx.stroke(); ctx.lineWidth = 1; ctx.beginPath(); for (let k = 1; k < 6; k++) { const y1 = -h * k / 6, y0 = -h * (k - 1) / 6, w1 = b * (1 - k / 6), w0 = b * (1 - (k - 1) / 6); ctx.moveTo(-w0, y0); ctx.lineTo(w1, y1); ctx.moveTo(w0, y0); ctx.lineTo(-w1, y1); ctx.moveTo(-w1, y1); ctx.lineTo(w1, y1); } ctx.stroke();
      if (o.cell) { ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#334155'; [-1, 1].forEach(s => { ctx.fillRect(s * 6 - 2.5, -h + 4, 5, 13); ctx.strokeRect(s * 6 - 2.5, -h + 4, 5, 13); }); }
      ctx.fillStyle = (o.blink == null || o.blink) ? '#ef4444' : '#7f1d1d'; ctx.beginPath(); ctx.arc(0, -h - 3, 3.5, 0, TAU); ctx.fill(); ctx.restore(); });
    return Q39.rot2(x, y, 0, -h - 3, a);
  },
  rot2(x, y, dx, dy, a) { return [x + dx * Math.cos(a) - dy * Math.sin(a), y + dx * Math.sin(a) + dy * Math.cos(a)]; },
  /* satellite with solar panels at (x,y), scale s, rotation a */
  sat(ctx, x, y, s = 1, a = 0, hl) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); if (hl) { ctx.shadowColor = '#fde047'; ctx.shadowBlur = 16; }
      const pg = ctx.createLinearGradient(0, -7, 0, 7); pg.addColorStop(0, '#1e3a8a'); pg.addColorStop(.5, '#3b82f6'); pg.addColorStop(1, '#1e3a8a'); ctx.fillStyle = pg; ctx.fillRect(-30, -6, 18, 12); ctx.fillRect(12, -6, 18, 12); ctx.shadowBlur = 0;
      ctx.strokeStyle = '#bfdbfe'; ctx.lineWidth = .6; for (let k = 1; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-30 + k * 6, -6); ctx.lineTo(-30 + k * 6, 6); ctx.moveTo(12 + k * 6, -6); ctx.lineTo(12 + k * 6, 6); ctx.stroke(); }
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(12, 0); ctx.stroke();
      const bg = ctx.createLinearGradient(-8, 0, 8, 0); bg.addColorStop(0, '#a16207'); bg.addColorStop(.5, '#fde68a'); bg.addColorStop(1, '#a16207'); ctx.fillStyle = bg; rr(ctx, -8, -9, 16, 18, 3); ctx.fill();
      ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.arc(0, 12, 6, 0, Math.PI); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); });
  },
  cloud(ctx, x, y, s = 1, a = .95, dark) { K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = dark ? '#94a3b8' : '#fff'; [[-22, 4, 16], [0, -6, 20], [22, 4, 15], [8, 8, 16], [-10, 9, 14]].forEach(q => { ctx.beginPath(); ctx.arc(x + q[0] * s, y + q[1] * s, q[2] * s, 0, TAU); ctx.fill(); }); ctx.restore(); }); },
  sun(ctx, x, y, r, ph = 0) { K.raw(ctx, () => { ctx.save(); const g = ctx.createRadialGradient(x, y, r * .2, x, y, r * 2.2); g.addColorStop(0, 'rgba(254,240,138,1)'); g.addColorStop(.4, 'rgba(250,204,21,.6)'); g.addColorStop(1, 'rgba(250,204,21,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.2, 0, TAU); ctx.fill(); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2.5; for (let k = 0; k < 12; k++) { const a = k * TAU / 12 + ph; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * 1.2, y + Math.sin(a) * r * 1.2); ctx.lineTo(x + Math.cos(a) * r * 1.55, y + Math.sin(a) * r * 1.55); ctx.stroke(); } ctx.restore(); }); },
  /* thermometer: bulb at (x,y), tube height h, reading T in range [a,b] */
  thermo(ctx, x, y, h, T, a, b, lab = true) {
    const f = clamp((T - a) / (b - a), 0, 1);
    K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; rr(ctx, x - 6, y - h, 12, h, 6); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y + 4, 10, 0, TAU); ctx.fillStyle = '#dc2626'; ctx.fill(); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.fillRect(x - 3, y - 4 - (h - 10) * f, 6, (h - 10) * f + 6);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; for (let k = 0; k <= 10; k++) { const yy = y - 4 - (h - 10) * k / 10; ctx.beginPath(); ctx.moveTo(x + 6, yy); ctx.lineTo(x + (k % 5 ? 9 : 12), yy); ctx.stroke(); } ctx.restore(); });
    if (lab) Q39.T(ctx, Q39.f(T, 1) + ' °C', x, y + 26, { s: 11.5, w: 900, c: '#fff', bg: T < 0 ? '#1d4ed8' : '#dc2626' });
  },
  bars(ctx, x, y, q, col = '#16a34a') { K.raw(ctx, () => { for (let k = 0; k < 4; k++) { ctx.fillStyle = q > k / 4 + .02 ? col : 'rgba(100,116,139,.35)'; ctx.fillRect(x + k * 6, y - 5 - k * 4, 4, 5 + k * 4); } }); },
  /* point at distance s along polyline */
  along(P, s) { for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); if (s <= d) { const t = d ? s / d : 0; return [P[i - 1][0] + (P[i][0] - P[i - 1][0]) * t, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * t]; } s -= d; } return P[P.length - 1]; },
  plen(P) { let L = 0; for (let i = 1; i < P.length; i++) L += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); return L; },
  /* glowing ray along polyline with travelling pulses */
  ray(ctx, P, col, ph, o = {}) {
    if (P.length < 2) return; const L = Q39.plen(P), a = o.a == null ? 1 : o.a;
    K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.lineWidth = o.w || 2.5; if (o.dash) ctx.setLineDash(o.dash); ctx.shadowColor = col; ctx.shadowBlur = o.glow == null ? 6 : o.glow; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]); ctx.shadowBlur = 0;
      const gap = o.gap || 46; ctx.fillStyle = '#fff'; for (let s = ((ph * (o.sp || 120)) % gap); s < L; s += gap) { const q = Q39.along(P, s); ctx.beginPath(); ctx.arc(q[0], q[1], (o.w || 2.5) * .9 + 1, 0, TAU); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke(); }
      ctx.restore(); });
  },
  arrowHead(ctx, a, b, col, s = 9) { K.raw(ctx, () => { const ang = Math.atan2(b[1] - a[1], b[0] - a[0]); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(b[0] - s * Math.cos(ang - .4), b[1] - s * Math.sin(ang - .4)); ctx.lineTo(b[0] - s * Math.cos(ang + .4), b[1] - s * Math.sin(ang + .4)); ctx.closePath(); ctx.fill(); }); },
  /* simple mobile phone body (x,y centre) */
  phone(ctx, x, y, s = 1, col = '#0f172a', lit) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; rr(ctx, -9, -16, 18, 32, 4); ctx.fill(); ctx.fillStyle = lit ? '#7dd3fc' : '#334155'; ctx.fillRect(-7, -13, 14, 20); ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.arc(0, 11, 2, 0, TAU); ctx.fill(); ctx.restore(); }); },
  /* nonlinear altitude scale used by the layer column: 0..100 km sqrt, 100..1000 log */
  hy(hk) { return hk <= 100 ? Math.sqrt(Math.max(0, hk) / 100) * .75 : .75 + .25 * Math.log10(Math.min(hk, 1000) / 100); },
  yh(f) { return f <= .75 ? Math.pow(Math.max(0, f) / .75, 2) * 100 : 100 * Math.pow(10, (Math.min(f, 1) - .75) / .25); },
  /* temperature profile of the atmosphere (book figure 4) */
  Tz(h) { if (h < 11.54) return 15 - 6.5 * h; if (h < 14) return -60; if (h < 50) return -60 + 45 * (h - 14) / 36; if (h < 90) return -15 - 105 * (h - 50) / 40; if (h < 500) return -120 + 1120 * Math.pow((h - 90) / 410, .6); return 1000; },
  LAY: [['tropo', 'التروبوسفير', 'Troposphere', 0, 14, '#bae6fd'], ['strato', 'الستراتوسفير', 'Stratosphere', 14, 50, '#93c5fd'], ['meso', 'الميزوسفير', 'Mesosphere', 50, 90, '#818cf8'], ['thermo', 'الثرموسفير', 'Thermosphere', 90, 500, '#6d28d9'], ['exo', 'الإكسوسفير', 'Exosphere', 500, 1000, '#1e1b4b']],
  layer(h) { return Q39.LAY.find(q => h < q[4]) || Q39.LAY[4]; }
};

/* =============== A1 — جو الأرض: غلاف رقيق من الغازات مرتبط بالأرض بالجاذبية (ص 163، الشكل 1) =============== */
(() => {
  const D = { id: 'g9_at_earth', page: 163, fig: 'الشكل 1',
    desc: 'تطلق عبارة جو الأرض على غلاف الهواء المحيط بالكرة الأرضية إحاطة تامة، وسمك الغلاف الجوي يعد صغيراً جداً مقارنة بقطر الأرض، فيرى من الفضاء كأنه طبقة رقيقة من الضوء الأزرق الغامق في الأفق (الشكل 1). الغلاف الجوي طبقة مكونة من خليط من الغازات تحيط بالكرة الأرضية مرتبطة بها بفعل الجاذبية الأرضية.',
    tags: 'جو الأرض الغلاف الجوي غلاف الهواء طبقة رقيقة قطر الأرض الجاذبية الأرضية خليط من الغازات الشكل 1',
    tools: ['نافذة مركبة فضائية', 'مكبّر (تكبير الصورة)'],
    steps: ['انظر إلى الأرض من الفضاء: هل ترى الغلاف الجوي؟', 'اسحب مقبض التكبير (أو المنزلق) لتقترب من حافة الأرض: يظهر الغلاف الجوي خطاً أزرق رقيقاً في الأفق.', 'أطفئ «الجاذبية الأرضية»: ماذا يحدث لجزيئات الهواء؟ ثم أعدها.'],
    concl: ['الغلاف الجوي خليط من الغازات يحيط بالأرض إحاطة تامة.', 'سمكه صغير جداً مقارنة بقطر الأرض (12742 km) فيرى من الفضاء طبقة زرقاء رقيقة في الأفق.', 'الجاذبية الأرضية هي التي تربط الغلاف الجوي بالأرض.'],
    laws: [],
    controls: [R('zm', 'التكبير', 1, 40, 1, 1, '×'), TG('grav', 'الجاذبية الأرضية', true, null, 'magnet')],
    setup(S) { S.z = 1; S.esc = 0; S.ph = 0; },
    update(S, dt) { S.z = Q39.ez(S.z, S.p.zm, dt, 6); S.esc = Q39.ez(S.esc, S.p.grav ? 0 : 1, dt, S.p.grav ? 3 : .6); S.ph += dt; },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), x0 = L + 30, x1 = w - 350, y0 = 70, y1 = h - 175; return { w, h, L, x0, x1, y0, y1, cx: (x0 + x1) / 2, sx: x0 - 30, sy0: y0 + 30, sy1: y1 - 30 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q39.bg(ctx, w, h, '#e0e7ff', '#f8fafc');
      Q39.space(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, 22, 3);
      const r0 = 120, r = r0 * S.z, cy = (g.y0 + g.y1) / 2 + 20 + (r - r0), atm = r * 100 / 6371 * 1.2, cx = g.cx;
      K.raw(ctx, () => { ctx.save(); rr(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, 22); ctx.clip(); });
      Q39.globe(ctx, cx, cy, r, { atm: Math.max(2, atm), rot: S.ph * .05 });
      // air molecules held by gravity (exaggerated scale)
      K.raw(ctx, () => { for (let i = 0; i < 70; i++) { const a = -1.2 + 2.4 * Q39.rn(i), hh = (2 + 8 * Q39.rn(i + 50)) * Math.min(1, S.z / 4 + .3), fl = S.esc * (60 + 260 * Q39.rn(i + 9)) * (1 + .3 * Math.sin(S.ph + i)), p = Q39.pol(cx, cy, r + hh + fl, a); ctx.fillStyle = Q39.rn(i + 3) < .78 ? 'rgba(96,165,250,.95)' : 'rgba(248,113,113,.95)'; ctx.globalAlpha = 1 - S.esc * .5; ctx.beginPath(); ctx.arc(p[0], p[1], 2.2, 0, TAU); ctx.fill(); } ctx.globalAlpha = 1; });
      K.raw(ctx, () => { ctx.restore(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 6; rr(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, 22); ctx.stroke(); });
      if (S.z > 6) { const ty = cy - r - atm / 2; Q39.T(ctx, 'الغلاف الجوي: طبقة زرقاء رقيقة', g.cx, Math.max(g.y0 + 40, ty - 34), { s: 12, w: 900, c: '#fff', bg: '#0369a1' }); }
      else Q39.T(ctx, 'كرة الأرض من الفضاء', g.cx, g.y0 + 26, { s: 12, w: 900, c: '#fff', bg: 'rgba(15,23,42,.7)' });
      if (S.esc > .2) Q39.T(ctx, 'بلا جاذبية تفلت الغازات إلى الفضاء!', g.cx, g.y1 - 30, { s: 12, w: 900, c: '#fff', bg: '#b91c1c' });
      // zoom slider on the left edge
      const t = (S.p.zm - 1) / 39, ky = g.sy1 - (g.sy1 - g.sy0) * t;
      K.raw(ctx, () => { ctx.lineCap = 'round'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(g.sx, g.sy0); ctx.lineTo(g.sx, g.sy1); ctx.stroke(); ctx.strokeStyle = '#1d4ed8'; ctx.beginPath(); ctx.moveTo(g.sx, g.sy1); ctx.lineTo(g.sx, ky); ctx.stroke(); });
      Q41.knob(ctx, g.sx, ky, '#1d4ed8', 12); Q39.T(ctx, '🔍', g.sx, g.sy0 - 18, { s: 16 }); Q39.T(ctx, S.p.zm + '×', g.sx, g.sy1 + 18, { s: 11, w: 900, c: '#1d4ed8' });
      Q39.card(ctx, S, [{ t: 'قطر الأرض ≈ 12742 km', c: '#0f172a', w: 900 }, { t: 'معظم هواء الغلاف الجوي في أول 100 km تقريباً', c: '#0f172a', w: 800 }, { t: '100 ÷ 12742 ≈ 0.008', c: '#1d4ed8', w: 900, mono: 1 }, { t: 'أي أقل من واحد في المئة من قطر الأرض', c: '#1d4ed8', w: 800 }, { t: 'لذا يرى من الفضاء كأنه طبقة رقيقة من الضوء الأزرق الغامق في الأفق.', c: '#334155' }, { t: 'الغازات مرتبطة بالأرض بفعل الجاذبية الأرضية.', c: '#15803d', w: 800 }], { title: 'سمك الغلاف الجوي', wd: 310, y: 70 });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'اسحب مقبض التكبير لتقترب من أفق الأرض');
    },
    chips(S, g) { return Q39.chips(S, 'zq', [['1', 'من الفضاء 1×'], ['12', 'اقتراب 12×'], ['40', 'الأفق 40×']], g.h - 84, String(S.p.zm), (S2, k) => { setParam(S2, 'zm', +k); }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), t = (S.p.zm - 1) / 39;
      return [{ id: 'zoom', x: g.sx, y: g.sy1 - (g.sy1 - g.sy0) * t, r: 20, axis: 'y', keep: true, tip: 'اسحب للتكبير', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'zm', Math.round(1 + 39 * clamp((g.sy1 - d.y) / (g.sy1 - g.sy0), 0, 1))); } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('التكبير', S.p.zm + '×'), rd('قطر الأرض', '12742 km'), rd('سمك الطبقة الكثيفة من الهواء', '≈ 100 km'), rd('الجاذبية', S.p.grav ? 'تربط الغازات بالأرض' : 'مطفأة: الغازات تفلت')]; },
    explain(S) { return Q26.ex(S.p.zm > 6 ? 'يظهر الغلاف الجوي خطاً أزرق رقيقاً عند حافة الأرض.' : 'من بعيد لا يكاد يُرى الغلاف الجوي.', 'سمك الطبقة الكثيفة من الهواء نحو 100 km بينما قطر الأرض 12742 km، أي أقل من 1 %. والغازات مرتبطة بالأرض بفعل الجاذبية الأرضية، ولولاها لتسربت إلى الفضاء.', 'رواد الفضاء يرون الغلاف الجوي كأنه هالة زرقاء رقيقة في الأفق.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — مكونات الهواء الجاف (ص 163، الجدول 1) =============== */
(() => {
  const GS = [['N2', 'النتروجين', 'N₂', 78.08, '#3b82f6'], ['O2', 'الأوكسجين', 'O₂', 20.94, '#ef4444'], ['Ar', 'الأركون', 'Ar', .9325, '#a855f7'], ['CO2', 'ثنائي أوكسيد الكاربون', 'CO₂', .036, '#475569'], ['Ne', 'النيون', 'Ne', .0018, '#f97316'], ['He', 'الهليوم', 'He', .0005, '#eab308'], ['CH4', 'الميثان', 'CH₄', .00017, '#16a34a'], ['Kr', 'الكريبتون', 'Kr', .0001, '#0d9488'], ['H2', 'الهيدروجين', 'H₂', .00005, '#ec4899'], ['N2O', 'ثنائي أوكسيد النتروجين', 'N₂O', .00003, '#64748b'], ['Xe', 'الزينون', 'Xe', .000009, '#7c3aed'], ['O3', 'الأوزون', 'O₃', .000004, '#0ea5e9']];
  const NM = 200; // molecules drawn in the jar
  const D = { id: 'g9_at_comp', page: 163, fig: 'الجدول 1',
    desc: 'الغلاف الجوي يتألف من خليط من الغازات موجود بعضها بنسب ثابتة مثل الهواء الجاف الذي تكون مكوناته على سطح الأرض بنسبة مئوية ثابتة (الجدول 1): النتروجين 78.08 % ، الأوكسجين 20.94 % ، الأركون 0.9325 % ، ثنائي أوكسيد الكاربون 0.036 % وغازات أخرى بنسب ضئيلة جداً (النيون، الهليوم، الكريبتون، الميثان، الهيدروجين، ثنائي أوكسيد النتروجين، الأوزون، الزينون).',
    tags: 'مكونات الهواء الجاف الجدول 1 نتروجين أوكسجين أركون ثنائي أوكسيد الكاربون نيون هليوم ميثان أوزون نسب ثابتة',
    tools: ['قنينة زجاجية فيها عينة من الهواء الجاف', 'عدسة مكبرة'],
    steps: ['اسحب العدسة المكبرة فوق القنينة وعدّ الجزيئات تحتها: أيها الأكثر؟', 'اضغط على اسم غاز في الجدول لتمييز جزيئاته في القنينة.', 'لاحظ أن النتروجين والأوكسجين معاً نحو 99 % من الهواء الجاف.'],
    concl: ['الهواء الجاف خليط من الغازات بنسب ثابتة.', 'النتروجين 78 % تقريباً والأوكسجين 21 % تقريباً والأركون أقل من 1 %.', 'ثنائي أوكسيد الكاربون والغازات الأخرى بنسب ضئيلة جداً.'],
    laws: [],
    controls: [TG('mov', 'حركة الجزيئات', true, null, 'particles')],
    setup(S) { S.sel = 'N2'; S.lx = 0; S.ly = 0; S.ltx = 0; S.lty = 0; S.ph = 0; S.cnt = '';
      S.m = []; for (let i = 0; i < NM; i++) { const r = Q39.rn(i * 11 + 2), t = r < .7808 ? 0 : r < .9902 ? 1 : 2; S.m.push({ t, x: Q39.rn(i + 1), y: Q39.rn(i + 77), vx: Q39.rn(i + 5) - .5, vy: Q39.rn(i + 9) - .5, a: Q39.rn(i) * TAU }); }
      S.m[NM - 1].t = 3; },
    update(S, dt) { S.ph += dt; if (S.p.mov) S.m.forEach(q => { q.x += q.vx * dt * .25; q.y += q.vy * dt * .25; q.a += dt * 2 * q.vx; if (q.x < 0 || q.x > 1) { q.vx = -q.vx; q.x = clamp(q.x, 0, 1); } if (q.y < 0 || q.y > 1) { q.vy = -q.vy; q.y = clamp(q.y, 0, 1); } });
      S.lx = Q39.ez(S.lx, S.ltx, dt, 12); S.ly = Q39.ez(S.ly, S.lty, dt, 12); },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), jx = L + 40, jw = Math.min(300, w - 420 - L), jy = 120, jh = 330; return { w, h, L, jx, jw, jy, jh, tx: w - 12, tw: 330 }; },
    mp(g, q) { return [g.jx + 18 + q.x * (g.jw - 36), g.jy + 50 + q.y * (g.jh - 70)]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q39.bg(ctx, w, h);
      // glass jar
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(224,242,254,.55)'; ctx.strokeStyle = 'rgba(71,85,105,.8)'; ctx.lineWidth = 3; rr(ctx, g.jx, g.jy + 30, g.jw, g.jh - 30, 26); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#94a3b8'; rr(ctx, g.jx + g.jw * .3, g.jy, g.jw * .4, 34, 6); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(g.jx + 12, g.jy + 50, 8, g.jh - 90); ctx.restore(); });
      if (!S.lx) { S.lx = S.ltx = g.jx + g.jw / 2; S.ly = S.lty = g.jy + g.jh / 2; }
      const selT = ['N2', 'O2', 'Ar', 'CO2'].indexOf(S.sel), cnt = [0, 0, 0, 0];
      K.raw(ctx, () => { S.m.forEach(q => { const p = D.mp(g, q), c = ['#3b82f6', '#ef4444', '#a855f7', '#475569'][q.t], dim = selT >= 0 && q.t !== selT ? .25 : 1; if (Math.hypot(p[0] - S.lx, p[1] - S.ly) < 55) cnt[q.t]++; ctx.globalAlpha = dim; ctx.fillStyle = c;
        if (q.t === 2) { ctx.beginPath(); ctx.arc(p[0], p[1], 4.5, 0, TAU); ctx.fill(); } else { const dx = Math.cos(q.a) * 3.6, dy = Math.sin(q.a) * 3.6; ctx.beginPath(); ctx.arc(p[0] - dx, p[1] - dy, 3.6, 0, TAU); ctx.arc(p[0] + dx, p[1] + dy, 3.6, 0, TAU); ctx.fill(); if (q.t === 3) { ctx.beginPath(); ctx.arc(p[0], p[1], 3, 0, TAU); ctx.fillStyle = '#111827'; ctx.fill(); } } }); ctx.globalAlpha = 1; });
      // magnifier
      K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(S.lx, S.ly, 55, 0, TAU); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fill(); ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(S.lx + 40, S.ly + 40); ctx.lineTo(S.lx + 68, S.ly + 68); ctx.stroke(); ctx.restore(); });
      const tot = cnt[0] + cnt[1] + cnt[2] + cnt[3]; S.cnt = cnt.join(',');
      Q39.T(ctx, 'تحت العدسة: ' + tot + ' جزيئة', g.jx + g.jw / 2, g.jy + g.jh + 22, { s: 12, w: 900, c: '#fff', bg: '#334155' });
      [['نتروجين', cnt[0], '#3b82f6'], ['أوكسجين', cnt[1], '#ef4444'], ['أركون', cnt[2], '#a855f7']].forEach((q, i) => Q39.T(ctx, q[0] + ' ' + q[1], g.jx + g.jw / 2 + (i - 1) * 100, g.jy + g.jh + 52, { s: 11.5, w: 900, c: '#fff', bg: q[2] }));
      Q39.T(ctx, 'عينة من الهواء الجاف', g.jx + g.jw / 2, g.jy - 16, { s: 12, w: 900, c: '#0f172a' });
      // table
      const rh = 30, x0 = g.tx - g.tw, ty = 64;
      K.raw(ctx, () => { ctx.fillStyle = '#1d4ed8'; rr(ctx, x0, ty, g.tw, rh, 6); ctx.fill(); });
      Q39.T(ctx, 'الغاز', g.tx - 70, ty + rh / 2, { s: 12, w: 900, c: '#fff' }); Q39.T(ctx, 'الصيغة', x0 + 150, ty + rh / 2, { s: 12, w: 900, c: '#fff' }); Q39.T(ctx, 'النسبة %', x0 + 55, ty + rh / 2, { s: 12, w: 900, c: '#fff' });
      GS.forEach((q, i) => { const y = ty + rh * (i + 1), on = S.sel === q[0];
        K.raw(ctx, () => { ctx.fillStyle = on ? '#dbeafe' : i % 2 ? '#f8fafc' : '#fff'; ctx.fillRect(x0, y, g.tw, rh); ctx.strokeStyle = on ? '#1d4ed8' : '#e2e8f0'; ctx.lineWidth = on ? 2 : 1; ctx.strokeRect(x0, y, g.tw, rh); ctx.fillStyle = q[4]; ctx.beginPath(); ctx.arc(g.tx - 12, y + rh / 2, 5, 0, TAU); ctx.fill(); });
        Q39.T(ctx, q[1], g.tx - 22, y + rh / 2, { s: 11, w: on ? 900 : 700, c: '#0f172a', a: 'right' }); Q39.T(ctx, q[2], x0 + 150, y + rh / 2, { s: 12, w: 800, c: '#334155' }); Q39.T(ctx, String(q[3]), x0 + 55, y + rh / 2, { s: 11.5, w: 800, c: '#0f172a' }); });
      const yb = ty + rh * 13 + 30, sel = GS.find(q => q[0] === S.sel);
      Q39.T(ctx, sel[1] + ': ' + sel[3] + ' %', x0 + g.tw / 2, yb, { s: 13, w: 900, c: '#fff', bg: sel[4] });
      Q39.T(ctx, sel[3] >= 1 ? 'في كل 100 جزيئة نحو ' + Math.round(sel[3]) + ' جزيئة' : 'في كل 100 جزيئة أقل من جزيئة واحدة', x0 + g.tw / 2, yb + 30, { s: 11.5, w: 800, c: '#334155' });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'اسحب العدسة فوق القنينة، واضغط على غاز في الجدول');
    },
    chips(S, g) { return Q39.chips(S, 'gs', [['N2', 'النتروجين'], ['O2', 'الأوكسجين'], ['Ar', 'الأركون'], ['CO2', 'CO₂']], g.h - 84, S.sel, (S2, k) => { S2.sel = k; }, { bw: 140 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), rh = 30, x0 = g.tx - g.tw;
      return [{ id: 'lens', x: S.lx || g.jx + g.jw / 2, y: S.ly || g.jy + g.jh / 2, r: 45, axis: 'xy', keep: true, tip: 'اسحب العدسة', idle: 'اسحب ✋', drag: (S2, d) => { S2.ltx = clamp(d.x, g.jx + 20, g.jx + g.jw - 20); S2.lty = clamp(d.y, g.jy + 60, g.jy + g.jh - 20); } }]
        .concat(GS.map((q, i) => ({ id: 'row' + q[0], x: x0 + g.tw / 2, y: 64 + rh * (i + 1.5), w: g.tw, h: rh - 2, hint: false, tip: q[1], click: S2 => { S2.sel = q[0]; } })), D.chips(S, g)); },
    readings(S) { const c = (S.cnt || '0,0,0,0').split(',').map(Number), t = c.reduce((a, b) => a + b, 0) || 1; const sel = GS.find(q => q[0] === S.sel);
      return [rd('الغاز المختار', sel[1] + ' — ' + sel[3] + ' %'), rd('نتروجين تحت العدسة', c[0] + ' ⟸ ' + Math.round(c[0] / t * 100) + ' %'), rd('أوكسجين تحت العدسة', c[1] + ' ⟸ ' + Math.round(c[1] / t * 100) + ' %'), rd('أركون تحت العدسة', c[2])]; },
    explain(S) { return Q26.ex('معظم الجزيئات في القنينة نتروجين (أزرق) ثم أوكسجين (أحمر).', 'الهواء الجاف خليط من الغازات بنسب ثابتة: النتروجين 78.08 % والأوكسجين 20.94 % والأركون 0.9325 % و CO₂ نحو 0.036 %، والبقية غازات بنسب ضئيلة جداً.', 'الأوكسجين ضروري لتنفس الكائنات الحية، و CO₂ ضروري لعملية البناء الضوئي في النبات.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A3 — الاحتباس الحراري وزيادة CO₂ (ص 163، الشكل 2 + هل تعلم) =============== */
(() => {
  const D = { id: 'g9_at_green', page: 163, fig: 'الشكل 2 + هل تعلم',
    desc: 'ينتج عن النشاط البشري غير المتوازن إفساد للغلاف الجوي بتغيير نسب مكوناته عن حالتها الطبيعية، مما أدى إلى تزايد الاحتباس الحراري، فترتب عنه تغيرات مناخية وفيضانات وانصهار نسب من الجليد في القطبين وأعاصير غير مألوفة (الشكل 2). هل تعلم: الاحترار العالمي هو ظاهرة ازدياد معدل الحرارة في جو الأرض أكثر من المعدل الطبيعي وعدم تسربها إلى خارج الغلاف الجوي نتيجة امتصاص غاز ثنائي أوكسيد الكاربون المنبعث من المصانع والأنشطة البشرية المختلفة.',
    tags: 'الاحتباس الحراري الاحترار العالمي ثنائي أوكسيد الكاربون CO2 المصانع ذوبان الجليد الفيضانات تغيرات مناخية الشكل 2',
    tools: ['أرض ومصنع', 'شمس', 'جليد القطب', 'محرار'],
    steps: ['اضغط على المصنع لتشغيله: يزداد CO₂ في الجو تدريجياً.', 'راقب أشعة الحرارة الحمراء الصاعدة من الأرض: كم منها يرتد إلى الأرض؟', 'لاحظ المحرار وجليد القطب ومستوى البحر، ثم أطفئ المصنع أو اسحب منزلق CO₂.'],
    concl: ['زيادة CO₂ في الجو تحبس الحرارة فلا تتسرب خارج الغلاف الجوي.', 'يرتفع معدل الحرارة (الاحترار العالمي) فينصهر الجليد وتحدث فيضانات وتغيرات مناخية.', 'تقليل الانبعاثات من المصانع يحمي الغلاف الجوي.'],
    laws: [],
    controls: [R('co2', 'نسبة CO₂ في الجو', .028, .1, .036, .001, '%')],
    setup(S) { S.fac = 0; S.T = 15; S.ice = 1; S.sea = 0; S.ph = 0; },
    Teq(S) { return 14 + 3.2 * Math.log2(S.p.co2 / .028); },
    update(S, dt) { S.ph += dt; if (S.fac && S.p.co2 < .1) setParam(S, 'co2', Math.min(.1, S.p.co2 + dt * .004)); S.T = Q39.ez(S.T, D.Teq(S), dt, 1.2); const m = clamp((S.T - 14.6) / 5.5, 0, 1); S.ice = Q39.ez(S.ice, 1 - m * .85, dt, 1); S.sea = Q39.ez(S.sea, m, dt, 1); },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), x0 = L + 16, x1 = w - 345, yg = h - 230, ya = 150; return { w, h, L, x0, x1, yg, ya, fx: x0 + 70, ix: x1 - 80 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = (S.p.co2 - .028) / .072; Q39.bg(ctx, w, h, '#bfdbfe', '#f0f9ff');
      K.raw(ctx, () => { ctx.save(); const sky = ctx.createLinearGradient(0, 60, 0, g.yg); sky.addColorStop(0, '#60a5fa'); sky.addColorStop(1, 'rgba(254,215,170,' + (.3 + .5 * S.sea) + ')'); ctx.fillStyle = sky; rr(ctx, g.x0, 60, g.x1 - g.x0, g.yg - 60 + 60, 18); ctx.fill(); ctx.restore(); });
      // CO2 blanket
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(71,85,105,' + (.12 + .45 * c) + ')'; ctx.fillRect(g.x0, g.ya - 16, g.x1 - g.x0, 32 + 20 * c); ctx.restore(); });
      Q39.T(ctx, 'غازات الغلاف الجوي و CO₂', g.x1 - 140, g.ya - 28, { s: 11, w: 900, c: '#fff', bg: 'rgba(51,65,85,.85)' });
      Q39.sun(ctx, g.x0 + 50, 100, 22, S.ph * .3);
      // sunlight rays (yellow) in
      const sp = (g.x1 - g.x0 - 200) / 4; for (let k = 0; k < 4; k++) { const x = g.x0 + 120 + k * sp; Q39.ray(ctx, [[g.x0 + 60, 110], [x, g.yg]], '#facc15', S.ph + k * .2, { w: 2, gap: 40, sp: 90, glow: 4 }); }
      // heat (IR) rays out — some return
      const nb = Math.round(1 + c * 4);
      for (let k = 0; k < 5; k++) { const x = g.x0 + 130 + k * (g.x1 - g.x0 - 220) / 4, back = k < nb; const P = back ? [[x, g.yg], [x + 18, g.ya + 8], [x + 36, g.yg]] : [[x, g.yg], [x + 18, g.ya], [x + 30, 70]]; Q39.ray(ctx, P, back ? '#dc2626' : '#f97316', S.ph + k * .3, { w: 2, gap: 30, sp: 70, dash: [6, 4], glow: 3 }); }
      // ground + sea + ice
      const sy = g.yg - 6 * S.sea;
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#65a30d'; ctx.fillRect(g.x0, g.yg, (g.x1 - g.x0) * .55, 60); ctx.fillStyle = '#0284c7'; ctx.fillRect(g.x0 + (g.x1 - g.x0) * .55 - 30 * S.sea, sy, (g.x1 - g.x0) * .45 + 30 * S.sea, 60 + g.yg - sy);
        const iw = 90 * S.ice, ih = 60 * S.ice; ctx.fillStyle = '#f0f9ff'; ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.ix - iw / 2, sy + 4); ctx.lineTo(g.ix - iw / 3, sy - ih * .8); ctx.lineTo(g.ix, sy - ih); ctx.lineTo(g.ix + iw / 3, sy - ih * .6); ctx.lineTo(g.ix + iw / 2, sy + 4); ctx.closePath(); ctx.fill(); ctx.stroke();
        if (S.ice < .9) { ctx.fillStyle = 'rgba(255,255,255,.8)'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(g.ix + 60 + k * 14, sy + 10 + (k % 2) * 6, 3 + 2 * (1 - S.ice), 0, TAU); ctx.fill(); } }
        // factory
        const fx = g.fx, fy = g.yg; ctx.fillStyle = '#78716c'; ctx.fillRect(fx - 40, fy - 44, 80, 44); ctx.fillStyle = '#57534e'; ctx.fillRect(fx + 14, fy - 92, 16, 50); ctx.fillRect(fx - 26, fy - 78, 14, 36); ctx.fillStyle = '#fde68a'; for (let k = 0; k < 3; k++) ctx.fillRect(fx - 32 + k * 24, fy - 30, 12, 12);
        ctx.restore(); });
      if (S.fac) for (let k = 0; k < 7; k++) { const tt = (S.ph * .5 + k / 7) % 1; Q39.cloud(ctx, g.fx + 22 + tt * 40, g.yg - 100 - tt * (g.yg - 120 - g.ya), .35 + tt * .4, .8 * (1 - tt), true); }
      Q39.T(ctx, S.fac ? 'المصنع يعمل: CO₂ يزداد' : 'اضغط على المصنع', g.fx, g.yg + 26, { s: 11, w: 900, c: '#fff', bg: S.fac ? '#b91c1c' : '#475569' });
      Q39.T(ctx, 'جليد القطب', g.ix, g.yg + 26, { s: 11, w: 900, c: '#fff', bg: '#0369a1' });
      Q39.thermo(ctx, g.x1 - 30, g.ya + 140, 110, S.T, 10, 22);
      Q39.T(ctx, 'معدل الحرارة', g.x1 - 30, g.ya + 2, { s: 10.5, w: 900, c: '#0f172a' });
      if (S.sea > .45) Q39.T(ctx, '⚠ فيضانات وذوبان الجليد', (g.x0 + g.x1) / 2 + 40, g.yg - 150, { s: 12.5, w: 900, c: '#fff', bg: '#b91c1c' });
      Q39.card(ctx, S, [{ t: 'النسبة الطبيعية لغاز CO₂ في الجدول 1 هي 0.036 %', c: '#0f172a', w: 800 }, { t: 'الأشعة الصفراء: ضوء الشمس يسخن الأرض.', c: '#a16207', w: 800 }, { t: 'الأشعة الحمراء: حرارة صاعدة من الأرض، ويعيدها CO₂ إلى الأرض فلا تتسرب.', c: '#b91c1c', w: 800 }, { t: 'النتيجة: احترار عالمي، انصهار الجليد في القطبين، فيضانات وأعاصير غير مألوفة.', c: '#334155' }], { title: 'هل تعلم — الاحترار العالمي', wd: 310, y: 70 });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'شغّل المصنع وراقب الحرارة والجليد');
    },
    chips(S, g) { return Q39.chips(S, 'fc', [['on', S.fac ? '⏸ إطفاء المصنع' : '🏭 تشغيل المصنع'], ['nat', '↺ النسبة الطبيعية 0.036 %']], g.h - 84, S.fac ? 'on' : '', (S2, k) => { if (k === 'on') S2.fac = S2.fac ? 0 : 1; else { S2.fac = 0; setParam(S2, 'co2', .036); } }, { bw: 220 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'fac', x: g.fx, y: g.yg - 46, w: 90, h: 96, tip: 'اضغط لتشغيل المصنع', idle: 'اضغط على المصنع ✋', click: S2 => { S2.fac = S2.fac ? 0 : 1; } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('نسبة CO₂', Q39.f(S.p.co2, 3) + ' %'), rd('معدل حرارة الجو', Q39.f(S.T, 1) + ' °C'), rd('الجليد المتبقي', Math.round(S.ice * 100) + ' %'), rd('ارتفاع مستوى البحر', S.sea > .05 ? 'يرتفع' : 'طبيعي')]; },
    record(S) { return { c: +S.p.co2.toFixed(3), T: +S.T.toFixed(1) }; },
    cols: [['c', 'CO₂ (%)'], ['T', 'T (°C)']],
    graph: { x: 'c', y: 'T', xl: 'نسبة CO₂ (%)', yl: 'معدل الحرارة (°C)' },
    explain(S) { return Q26.ex(S.p.co2 > .045 ? 'ارتفع معدل الحرارة وبدأ الجليد يذوب.' : 'الحرارة قريبة من معدلها الطبيعي.', 'ثنائي أوكسيد الكاربون المنبعث من المصانع والأنشطة البشرية يمتص الحرارة الصاعدة من الأرض ويمنع تسربها إلى خارج الغلاف الجوي، فيزداد معدل الحرارة أكثر من المعدل الطبيعي (الاحترار العالمي).', 'لذلك تسعى الدول إلى تقليل انبعاث الغازات وزراعة الأشجار.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — طبقات الغلاف الجوي ودرجة الحرارة مع الارتفاع (ص 164–167، الشكل 4) =============== */
(() => {
  const INFO = {
    tropo: ['من سطح الأرض حتى 14 km تقريباً', 'تشكل 80 % من الغلاف الجوي', 'أكثر الطبقات اضطراباً: تحدث فيها جميع الظواهر المناخية', 'يتناقص الضغط والكثافة، وتهبط الحرارة 6.5 °C لكل 1 km'],
    strato: ['من 14 km حتى 50 km', 'تحتوي طبقة الأوزون وأكبر تركيز لها عند 25 km', 'تزداد الحرارة مع الارتفاع من −60 °C إلى −15 °C'],
    meso: ['من 50 km حتى 90 km في منتصف الغلاف الجوي', 'مكوناتها الهليوم والهيدروجين، ضغطها منخفض وكثافتها قليلة', 'تقل الحرارة مع الارتفاع حتى نحو −120 °C'],
    thermo: ['من 90 km حتى 500 km وتعرف بالطبقة الحرارية', 'تحتوي إلكترونات حرة وأيونات: الأيونوسفير', 'تزداد الحرارة حتى نحو 1000 °C عند حافتها العليا', 'تعكس الموجات الراديوية ذوات الترددات الأقل من 300 kHz'],
    exo: ['أعلى طبقة: فوق 500 km', 'تمثل الغلاف الغازي الخارجي', 'جزيئاتها سريعة جداً فتفلت من جذب الأرض إلى الفضاء الخارجي']
  };
  const MID = { tropo: 8, strato: 30, meso: 70, thermo: 250, exo: 750 };
  const D = { id: 'g9_at_layers', page: 164, fig: 'الشكل 4',
    desc: 'الغلاف الجوي للأرض كتلة غير متجانسة تتكون من طبقات بعضها فوق بعض، وتحدد هذه الطبقات حسب ما تحتويه كل طبقة من غازات اعتماداً على ضغطها ودرجة حرارتها التي تتغير مع الارتفاع عن سطح الأرض. ويتكون من خمس طبقات رئيسة: التروبوسفير، الستراتوسفير، الميزوسفير، الثرموسفير، الإكسوسفير (الشكل 4).',
    tags: 'طبقات الغلاف الجوي التروبوسفير الستراتوسفير الميزوسفير الثرموسفير الإكسوسفير الأيونوسفير درجة الحرارة الارتفاع الضغط الكثافة الشكل 4',
    tools: ['مجس يحمل محراراً ومقياس ضغط', 'مخطط درجة الحرارة مع الارتفاع'],
    steps: ['اسحب المجس الأحمر إلى الأعلى ببطء وراقب منحني درجة الحرارة.', 'لاحظ أين تقل الحرارة مع الارتفاع وأين تزداد.', 'اضغط على أسماء الطبقات في الأسفل للانتقال إليها، واقرأ صفاتها في البطاقة.', 'اضغط «تسجيل» عند عدة ارتفاعات لترسم المنحني في جدول البيانات.'],
    concl: ['الغلاف الجوي غير متجانس ويتكون من خمس طبقات رئيسة.', 'الحرارة تقل مع الارتفاع في التروبوسفير والميزوسفير، وتزداد في الستراتوسفير والثرموسفير.', 'الضغط والكثافة يتناقصان مع الارتفاع.', 'أبرد منطقة في أعلى الميزوسفير نحو −120 °C.'],
    laws: ['g9_l9_lapse'],
    controls: [R('alt', 'ارتفاع المجس', 0, 1000, 5, 1, 'km'), TG('oz', 'طبقة الأوزون', true, null, 'layers'), TG('ion', 'الأيونوسفير', true, null, 'particles')],
    setup(S) { S.f = Q39.hy(5); S.ph = 0; },
    update(S, dt) { S.ph += dt; S.f = Q39.ez(S.f, Q39.hy(S.p.alt), dt, 7); S.hk = Q39.yh(S.f); },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), c0 = L + 44, c1 = c0 + 190, top = 80, bot = h - 185, g0 = c1 + 50, g1 = w - 270; return { w, h, L, c0, c1, top, bot, g0, g1 }; },
    Y(g, hk) { return g.bot - (g.bot - g.top) * Q39.hy(hk); },
    TX(g, T) { return g.g0 + (clamp(T, -130, 60) + 130) / 190 * (g.g1 - g.g0); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), hk = S.hk == null ? 5 : S.hk, T = Q39.Tz(hk), ly = Q39.layer(hk); Q39.bg(ctx, w, h, '#e0e7ff', '#f8fafc');
      // column bands
      Q39.LAY.forEach(q => { const ya = D.Y(g, q[4]), yb = D.Y(g, q[3]), on = q === ly; K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, ya, 0, yb); gr.addColorStop(0, shade(q[5], -18)); gr.addColorStop(1, q[5]); ctx.fillStyle = gr; ctx.fillRect(g.c0, ya, g.c1 - g.c0, yb - ya); if (on) { ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.strokeRect(g.c0 + 1.5, ya + 1.5, g.c1 - g.c0 - 3, yb - ya - 3); } ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(g.c0, ya); ctx.lineTo(g.g1, ya); ctx.stroke(); ctx.setLineDash([]); });
        const dark = q[3] >= 50; Q39.T(ctx, q[1], g.c0 + 70, (ya + yb) / 2 - (yb - ya > 50 ? 8 : 0), { s: 12.5, w: 900, c: dark ? '#fff' : '#0f172a' }); if (yb - ya > 50) Q39.T(ctx, q[2], g.c0 + 70, (ya + yb) / 2 + 10, { s: 9.5, w: 700, c: dark ? '#e0e7ff' : '#334155' }); });
      // decorations
      const yg = g.bot; K.raw(ctx, () => { ctx.fillStyle = '#16a34a'; ctx.fillRect(g.c0 - 4, yg, g.g1 - g.c0 + 8, 8); ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(g.c0, yg); ctx.lineTo(g.c0 + 30, D.Y(g, 8.8)); ctx.lineTo(g.c0 + 60, yg); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(g.c0 + 22, D.Y(g, 6.5)); ctx.lineTo(g.c0 + 30, D.Y(g, 8.8)); ctx.lineTo(g.c0 + 38, D.Y(g, 6.5)); ctx.fill(); });
      Q39.cloud(ctx, g.c0 + 150, D.Y(g, 3), .55); Q39.cloud(ctx, g.c0 + 120, D.Y(g, 5.5), .4);
      Q39.T(ctx, '✈', g.c0 + 160, D.Y(g, 10.5), { s: 16, c: '#334155' }); Q39.T(ctx, '🎈', g.c0 + 160, D.Y(g, 32), { s: 15 });
      K.raw(ctx, () => { ctx.strokeStyle = 'rgba(254,240,138,.9)'; ctx.lineWidth = 2; [[.3, 76], [.7, 80]].forEach(q => { const x = g.c0 + 190 * q[0], y = D.Y(g, q[1]); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 18, y + 10); ctx.stroke(); }); });
      Q39.sat(ctx, g.c0 + 150, D.Y(g, 400), .55, .3); Q39.sat(ctx, g.c0 + 150, D.Y(g, 800), .5, -.2);
      if (S.p.oz) { const ya = D.Y(g, 35), yb = D.Y(g, 15), yc = D.Y(g, 25); K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, ya, 0, yb); gr.addColorStop(0, 'rgba(251,146,60,0)'); gr.addColorStop((yc - ya) / (yb - ya), 'rgba(251,146,60,.75)'); gr.addColorStop(1, 'rgba(251,146,60,0)'); ctx.fillStyle = gr; ctx.fillRect(g.c0 + 110, ya, 80, yb - ya); }); Q39.T(ctx, 'الأوزون', g.c0 + 150, yc, { s: 10, w: 900, c: '#7c2d12' }); }
      if (S.p.ion) K.raw(ctx, () => { for (let i = 0; i < 40; i++) { const hh = 90 + 400 * Q39.rn(i + 4), x = g.c0 + 8 + 174 * Q39.rn(i + 40) + 3 * Math.sin(S.ph * 2 + i), y = D.Y(g, hh); ctx.fillStyle = i % 2 ? '#fbbf24' : '#93c5fd'; ctx.beginPath(); ctx.arc(x, y, i % 2 ? 2.6 : 1.6, 0, TAU); ctx.fill(); } });
      // altitude ticks
      [0, 5, 10, 14, 20, 30, 50, 70, 90, 200, 500, 1000].forEach(v => { const y = D.Y(g, v); K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.c0 - 6, y); ctx.lineTo(g.c0, y); ctx.stroke(); }); Q39.T(ctx, String(v), g.c0 - 18, y, { s: 9.5, w: 800, c: '#334155' }); });
      Q39.T(ctx, 'km', g.c0 - 18, g.top - 16, { s: 10, w: 900, c: '#334155' });
      // graph: temperature vs altitude
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.88)'; ctx.fillRect(g.g0, g.top, g.g1 - g.g0, g.bot - g.top); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; for (let T2 = -120; T2 <= 60; T2 += 30) { const x = D.TX(g, T2); ctx.beginPath(); ctx.moveTo(x, g.top); ctx.lineTo(x, g.bot); ctx.stroke(); } ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.strokeRect(g.g0, g.top, g.g1 - g.g0, g.bot - g.top);
        ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); let first = 1; for (let f = 0; f <= 1.0001; f += .004) { const hh = Q39.yh(f), x = D.TX(g, Q39.Tz(hh)), y = g.bot - (g.bot - g.top) * f; if (Q39.Tz(hh) > 60) break; first ? ctx.moveTo(x, y) : ctx.lineTo(x, y); first = 0; } ctx.stroke(); });
      for (let T2 = -120; T2 <= 60; T2 += 60) Q39.T(ctx, String(T2), D.TX(g, T2), g.bot + 14, { s: 9.5, w: 800, c: '#334155' });
      Q39.T(ctx, 'درجة الحرارة °C', (g.g0 + g.g1) / 2, g.bot + 32, { s: 10.5, w: 900, c: '#0f172a' });
      Q39.T(ctx, '→ حتى 1000 °C', g.g1 - 46, D.Y(g, 150), { s: 10, w: 900, c: '#fff', bg: '#dc2626' });
      // probe line + marker
      const py = D.Y(g, hk), px = D.TX(g, T);
      K.raw(ctx, () => { ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(g.c0, py); ctx.lineTo(g.g1, py); ctx.stroke(); ctx.setLineDash([]); });
      if (T <= 60) Q41.dot(ctx, px, py, '#dc2626', 6);
      // probe capsule at the right edge of the column
      K.raw(ctx, () => { ctx.save(); ctx.translate(g.c1 + 18, py); ctx.fillStyle = '#e5e7eb'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; rr(ctx, -9, -16, 18, 32, 8); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(-9, -10); ctx.lineTo(0, -24); ctx.lineTo(9, -10); ctx.fill(); ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.arc(0, 0, 4, 0, TAU); ctx.fill(); ctx.restore(); });
      Q39.T(ctx, Q39.f(hk, hk < 20 ? 1 : 0) + ' km  |  ' + Q39.f(T, 0) + ' °C', (g.g0 + g.g1) / 2, py - 14 < g.top + 10 ? py + 16 : py - 14, { s: 11.5, w: 900, c: '#fff', bg: '#0f172a' });
      Q39.card(ctx, S, [{ t: ly[1] + ' ' + ly[2], c: '#1d4ed8', w: 900, s: 13 }].concat(INFO[ly[0]].map((t, i) => ({ t: '• ' + t, c: i ? '#334155' : '#0f172a', w: i ? 700 : 800 }))), { title: 'الطبقة الحالية', wd: 245, y: 70 });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'اسحب المجس إلى الأعلى وراقب درجة الحرارة');
    },
    chips(S, g) { return Q39.chips(S, 'ly', Q39.LAY.map(q => [q[0], q[1]]), g.h - 84, Q39.layer(S.hk == null ? 5 : S.hk)[0], (S2, k) => { setParam(S2, 'alt', MID[k]); }, { bw: 140 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), hk = S.hk == null ? 5 : S.hk;
      return [{ id: 'probe', x: g.c1 + 18, y: D.Y(g, hk), r: 22, axis: 'y', keep: true, tip: 'اسحب المجس', idle: 'اسحب ✋', drag: (S2, d) => { const f = clamp((g.bot - d.y) / (g.bot - g.top), 0, 1), v = Q39.yh(f); setParam(S2, 'alt', Math.round(v < 20 ? v * 2 : v) / (v < 20 ? 2 : 1)); } }].concat(D.chips(S, g)); },
    readings(S) { const hk = S.hk || 0, ly = Q39.layer(hk); return [rd('الارتفاع', Q39.f(hk, 1) + ' km'), rd('الطبقة', ly[1]), rd('درجة الحرارة', Q39.f(Q39.Tz(hk), 0) + ' °C'), rd('الضغط الجوي', Q39.sci(1013 * Math.exp(-hk / 7.6), 3) + ' hPa'), rd('الكثافة نسبةً إلى سطح الأرض', Q39.sci(100 * Math.exp(-hk / 8.5), 2) + ' %')]; },
    record(S) { const hk = S.hk || 0; return { h: +hk.toFixed(1), T: Math.round(Q39.Tz(hk)) }; },
    cols: [['h', 'الارتفاع (km)'], ['T', 'T (°C)']],
    graph: { x: 'T', y: 'h', xl: 'درجة الحرارة (°C)', yl: 'الارتفاع (km)' },
    explain(S) { const hk = S.hk || 0, ly = Q39.layer(hk); return Q26.ex('المجس في طبقة ' + ly[1] + ' على ارتفاع ' + Q39.f(hk, 0) + ' km ودرجة الحرارة ' + Q39.f(Q39.Tz(hk), 0) + ' °C.', 'تحدد طبقات الغلاف الجوي حسب غازاتها وضغطها ودرجة حرارتها. في التروبوسفير تهبط الحرارة 6.5 °C لكل km، وفي الستراتوسفير ترتفع لأن الأوزون يمتص الأشعة فوق البنفسجية، ثم تهبط في الميزوسفير حتى −120 °C، وترتفع في الثرموسفير حتى 1000 °C.', 'الطائرات تطير في أعلى التروبوسفير، والبالونات الجوية في الستراتوسفير، والأقمار الصناعية في الثرموسفير وما فوقه.'); }
  };
  D.sci = Q31.sci; Q39.sci = (v, d) => Q31.sci(v, d);
  M8.P[D.id] = D;
})();

/* =============== B2 — التروبوسفير: ثابت التناقص 6.5 °C لكل km (ص 164، الشكل 3) =============== */
(() => {
  const D = { id: 'g9_at_tropo', page: 164, fig: 'الشكل 3',
    desc: 'التروبوسفير هي الطبقة الأولى من الغلاف الجوي القريبة من سطح الأرض وتمتد إلى ارتفاع 14 km تقريباً، وتشكل 80 % من الغلاف الجوي، وتمتاز بأنها أكثر الطبقات اضطراباً ففيها تحدث جميع الظواهر المناخية والتغيرات الجوية. وفيها يتناقص سريعاً كل من الضغط والكثافة مع الارتفاع، كما تتناقص درجة الحرارة بمعدل ثابت يسمى ثابت التناقص: تهبط درجة الحرارة حوالي 6.5 °C لكل كيلومتر واحد (الشكل 3).',
    tags: 'التروبوسفير ثابت التناقص 6.5 درجة لكل كيلومتر الضغط الكثافة الظواهر المناخية 80 % 14 km الشكل 3 بالون جوي',
    tools: ['بالون جوي', 'محرار', 'مقياس ضغط (بارومتر)'],
    steps: ['اسحب البالون إلى الأعلى وراقب المحرار ومقياس الضغط.', 'غيّر درجة حرارة سطح الأرض T₀ من المنزلق: هل يتغير معدل التناقص؟', 'اضغط «تدريب» ثم «الخطوة التالية» لحساب درجة الحرارة على ارتفاع 4 km.'],
    concl: ['في التروبوسفير تهبط درجة الحرارة 6.5 °C لكل 1 km: T = T₀ − 6.5 h.', 'الضغط والكثافة يتناقصان سريعاً مع الارتفاع.', 'تحدث في التروبوسفير جميع الظواهر المناخية (الغيوم والأمطار والرياح).'],
    laws: ['g9_l9_lapse'],
    controls: [R('T0', 'حرارة سطح الأرض T₀', -10, 45, 15, 1, '°C'), R('hb', 'ارتفاع البالون', 0, 14, 0, .1, 'km')],
    setup(S) { S.hv = 0; S.ph = 0; S.ex = 0; S.k = 0; },
    update(S, dt) { S.ph += dt; S.hv = Q39.ez(S.hv, S.p.hb, dt, 6); },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), x0 = L + 40, x1 = w - 345, top = 80, yg = h - 200; return { w, h, L, x0, x1, top, yg, bx: x1 - 120 }; },
    Y(g, k) { return g.yg - (g.yg - g.top - 20) * k / 14.5; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), T = S.p.T0 - 6.5 * S.hv, P = 1013 * Math.exp(-S.hv / 7.6); Q39.bg(ctx, w, h, '#e0f2fe', '#f8fafc');
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.top, 0, g.yg); gr.addColorStop(0, '#1e3a8a'); gr.addColorStop(1, '#7dd3fc'); ctx.fillStyle = gr; rr(ctx, g.x0, g.top - 10, g.x1 - g.x0, g.yg - g.top + 10, 14); ctx.fill();
        // air molecules: density decreases with height
        ctx.fillStyle = 'rgba(255,255,255,.55)'; for (let r = 0; r < 28; r++) { const k = r / 28 * 14.5, n = Math.round(22 * Math.exp(-k / 8)); for (let j = 0; j < n; j++) { const x = g.x0 + 8 + (g.x1 - g.x0 - 16) * Q39.rn(r * 31 + j), y = D.Y(g, k + .5 * Q39.rn(j + r)); ctx.beginPath(); ctx.arc(x + 2 * Math.sin(S.ph * 3 + j), y, 1.6, 0, TAU); ctx.fill(); } }
        // mountain (8.8 km)
        ctx.fillStyle = '#57534e'; ctx.beginPath(); ctx.moveTo(g.x0, g.yg); ctx.lineTo(g.x0 + 90, D.Y(g, 8.8)); ctx.lineTo(g.x0 + 200, g.yg); ctx.fill(); ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.moveTo(g.x0 + 64, D.Y(g, 6.3)); ctx.lineTo(g.x0 + 90, D.Y(g, 8.8)); ctx.lineTo(g.x0 + 122, D.Y(g, 6)); ctx.lineTo(g.x0 + 100, D.Y(g, 6.6)); ctx.fill();
        ctx.fillStyle = '#16a34a'; ctx.fillRect(g.x0, g.yg, g.x1 - g.x0, 12);
        ctx.strokeStyle = '#fde047'; ctx.setLineDash([7, 5]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.x0, D.Y(g, 14)); ctx.lineTo(g.x1, D.Y(g, 14)); ctx.stroke(); ctx.setLineDash([]); });
      Q39.T(ctx, 'نهاية التروبوسفير 14 km', g.x0 + 110, D.Y(g, 14) - 12, { s: 10.5, w: 900, c: '#fff', bg: '#a16207' });
      Q39.T(ctx, 'قمة جبل 8.8 km', g.x0 + 90, D.Y(g, 8.8) - 14, { s: 10, w: 900, c: '#fff', bg: 'rgba(15,23,42,.6)' });
      Q39.cloud(ctx, g.x0 + 240, D.Y(g, 2.5), .8, .95, true); Q39.cloud(ctx, g.x0 + 160, D.Y(g, 5), .6); Q39.T(ctx, '✈', g.x0 + 260, D.Y(g, 11), { s: 20, c: '#e2e8f0' });
      K.raw(ctx, () => { ctx.strokeStyle = 'rgba(147,197,253,.9)'; ctx.lineWidth = 1.5; for (let k = 0; k < 8; k++) { const x = g.x0 + 222 + k * 7, y0 = D.Y(g, 2.2) + 12, yy = y0 + ((S.ph * 60 + k * 13) % 40); ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x - 2, yy + 7); ctx.stroke(); } });
      // km scale
      for (let k = 0; k <= 14; k += 2) Q39.T(ctx, k + ' km', g.x0 - 30, D.Y(g, k), { s: 9.5, w: 800, c: '#334155' });
      // balloon + instruments
      const by = D.Y(g, S.hv), bx = g.bx;
      K.raw(ctx, () => { ctx.save(); const sc = 1 + S.hv * .04; const gr = ctx.createRadialGradient(bx - 8, by - 62, 4, bx, by - 52, 26 * sc); gr.addColorStop(0, '#fff'); gr.addColorStop(1, '#e2e8f0'); ctx.fillStyle = gr; ctx.beginPath(); ctx.ellipse(bx, by - 52, 22 * sc, 26 * sc, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.stroke(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx, by - 52 + 26 * sc); ctx.lineTo(bx, by - 8); ctx.stroke(); ctx.fillStyle = '#f59e0b'; rr(ctx, bx - 14, by - 10, 28, 18, 4); ctx.fill(); ctx.restore(); });
      Q39.thermo(ctx, bx + 52, by + 4, 70, T, -80, 45);
      Q43.gauge(ctx, bx - 56, by - 20, 24, P / 1013, '', '#0f766e');
      Q39.T(ctx, Q39.f(P, 0) + ' hPa', bx - 56, by + 16, { s: 10.5, w: 900, c: '#fff', bg: '#0f766e' });
      // side card or step solution
      if (S.ex) Q39.steps(ctx, S, { title: 'تدريب', q: 'درجة حرارة سطح الأرض 30 °C. احسب درجة الحرارة على ارتفاع 4 km.', lines: ['ΔT = 6.5 × h', 'ΔT = 6.5 × 4 = 26 °C', 'T = T₀ − ΔT', 'T = 30 − 26 = 4 °C'], k: S.k }, { y: 70, wd: 310 });
      else Q39.card(ctx, S, [{ t: 'ثابت التناقص', c: '#1d4ed8', w: 900, s: 13.5 }, { t: 'تهبط درجة الحرارة 6.5 °C لكل 1 km', c: '#0f172a', w: 800 }, { t: 'T = T₀ − 6.5 × h', c: '#b91c1c', w: 900, s: 14, mono: 1 }, { t: 'T = ' + S.p.T0 + ' − 6.5 × ' + Q39.f(S.hv, 1) + ' = ' + Q39.f(T, 1) + ' °C', c: '#0f172a', w: 800, mono: 1 }, { t: 'وفيها يتناقص الضغط والكثافة سريعاً، وتشكل 80 % من الغلاف الجوي.', c: '#334155' }], { title: 'التروبوسفير', wd: 310, y: 70 });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'اسحب البالون إلى الأعلى وراقب المحرار ومقياس الضغط');
    },
    chips(S, g) { return Q39.stepChips(S, 'st', g.h - 84, null, 'تدريب: 4 km', S2 => { setParam(S2, 'T0', 30); setParam(S2, 'hb', 4); }, 4).concat(Q39.chips(S, 'jp', [['0', 'سطح الأرض'], ['8.8', 'قمة الجبل'], ['14', '14 km']], g.h - 128, String(S.p.hb), (S2, k) => { setParam(S2, 'hb', +k); }, { bw: 140, col: '#0f766e' })); },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      return [{ id: 'ball', x: g.bx, y: D.Y(g, S.hv) - 40, r: 30, axis: 'y', keep: true, tip: 'اسحب البالون', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'hb', Math.round(clamp((g.yg - d.y - 40) / (g.yg - g.top - 20) * 14.5, 0, 14) * 10) / 10); } }].concat(D.chips(S, g)); },
    readings(S) { const T = S.p.T0 - 6.5 * S.hv; return [rd('الارتفاع h', Q39.f(S.hv, 1) + ' km'), rd('حرارة السطح T₀', S.p.T0 + ' °C'), rd('درجة الحرارة T', Q39.f(T, 1) + ' °C'), rd('الانخفاض ΔT', Q39.f(6.5 * S.hv, 1) + ' °C'), rd('الضغط', Q39.f(1013 * Math.exp(-S.hv / 7.6), 0) + ' hPa')]; },
    record(S) { return { h: +S.hv.toFixed(1), T: +(S.p.T0 - 6.5 * S.hv).toFixed(1) }; },
    cols: [['h', 'h (km)'], ['T', 'T (°C)']],
    graph: { x: 'h', y: 'T', xl: 'الارتفاع (km)', yl: 'درجة الحرارة (°C)' },
    explain(S) { return Q26.ex('كلما ارتفع البالون انخفضت درجة الحرارة وقراءة الضغط.', 'في التروبوسفير تهبط درجة الحرارة بمعدل ثابت يسمى ثابت التناقص 6.5 °C لكل 1 km، ويتناقص الضغط والكثافة لأن كمية الهواء فوق البالون تقل.', 'لهذا تكون قمم الجبال العالية مغطاة بالثلج حتى في الصيف.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B3 — طبقة الأوزون تحجب الأشعة فوق البنفسجية نوع C (ص 166، الشكل 5 + هل تعلم) =============== */
(() => {
  const UV = [['A', 'UV-A', '315–400 nm', '#a78bfa'], ['B', 'UV-B', '280–315 nm', '#8b5cf6'], ['C', 'UV-C', '100–280 nm', '#6d28d9']];
  const D = { id: 'g9_at_ozone', page: 166, fig: 'الشكل 5',
    desc: 'تصنف الأشعة فوق البنفسجية القادمة من الشمس إلى ثلاثة أنواع A و B و C (الشكل 5). والتأثير السلبي لهذه الأشعة يكمن في النوع C إذ يؤثر في الأحياء الموجودة على سطح الأرض، وطبقة الأوزون مظلة واقية لكل كائن حي على سطح الأرض إذ تحجب الإشعاع المؤذي نوع C من الوصول إلى سطح الأرض. والتعرض للأشعة فوق البنفسجية نوع B لفترة طويلة يؤدي إلى حروق الجلد وقد يسبب سرطان الجلد. هل تعلم: ثقب الأوزون يدل على انخفاض في تركيز الأوزون، ويتضح في المنطقة المحيطة بالقطبين الجنوبي والشمالي.',
    tags: 'طبقة الأوزون الأشعة فوق البنفسجية UV-A UV-B UV-C ثقب الأوزون الستراتوسفير مظلة واقية حروق الجلد الشكل 5',
    tools: ['الشمس', 'طبقة الأوزون (15–50 km)', 'كاشف الأشعة فوق البنفسجية'],
    steps: ['لاحظ الأشعة الثلاث A و B و C وهي تعبر طبقة الأوزون: أيها يصل إلى الأرض؟', 'اسحب مقبض كمية الأوزون إلى اليسار (أو اضغط «ثقب الأوزون»): ماذا يحدث للأشعة C؟', 'راقب مؤشر الخطر على الجلد عند سطح الأرض.'],
    concl: ['طبقة الأوزون في الستراتوسفير تحجب الأشعة فوق البنفسجية الضارة نوع C.', 'النوع A يصل إلى الأرض، والنوع B يصل جزء منه ويسبب حروق الجلد عند التعرض الطويل.', 'ثقب الأوزون: انخفاض تركيز الأوزون فوق القطبين.'],
    laws: ['g9_l9_ozone'],
    controls: [R('oz', 'كمية الأوزون', 0, 100, 100, 1, '%')],
    setup(S) { S.o = 1; S.ph = 0; },
    update(S, dt) { S.ph += dt; S.o = Q39.ez(S.o, S.p.oz / 100, dt, 5); },
    pass(S, t) { const o = S.o; return t === 'A' ? .95 : t === 'B' ? .1 + .9 * Math.pow(1 - o, 1.3) : Math.pow(1 - o, 2.2); },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), x0 = L + 30, x1 = w - 345, top = 70, yg = h - 210; return { w, h, L, x0, x1, top, yg, sx0: x0 + 110, sx1: x1 - 30, sy: top + 22 }; },
    Y(g, k) { return g.yg - (g.yg - g.top - 140) * k / 60; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q39.bg(ctx, w, h, '#ede9fe', '#f8fafc');
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.top, 0, g.yg); gr.addColorStop(0, '#0f172a'); gr.addColorStop(.5, '#1e40af'); gr.addColorStop(1, '#93c5fd'); ctx.fillStyle = gr; rr(ctx, g.x0, g.top, g.x1 - g.x0, g.yg - g.top + 40, 16); ctx.fill(); });
      Q39.sun(ctx, g.x0 + 46, g.top + 52, 20, S.ph * .3);
      // ozone band
      const ya = D.Y(g, 50), yb = D.Y(g, 15);
      K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = .15 + .6 * S.o; const gr = ctx.createLinearGradient(0, ya, 0, yb); gr.addColorStop(0, 'rgba(56,189,248,.2)'); gr.addColorStop(.4, 'rgba(14,165,233,.9)'); gr.addColorStop(1, 'rgba(56,189,248,.2)'); ctx.fillStyle = gr; ctx.fillRect(g.x0, ya, g.x1 - g.x0, yb - ya); ctx.restore();
        ctx.fillStyle = 'rgba(255,255,255,.75)'; const n = Math.round(40 * S.o); for (let i = 0; i < n; i++) { const x = g.x0 + 10 + (g.x1 - g.x0 - 20) * Q39.rn(i + 7), y = ya + (yb - ya) * (.15 + .7 * Q39.rn(i + 70)); [-3, 3, 0].forEach((d, j) => { ctx.beginPath(); ctx.arc(x + d, y + (j === 2 ? -4 : 1), 2, 0, TAU); ctx.fill(); }); } });
      Q39.T(ctx, 'طبقة الأوزون O₃', g.x0 + 70, (ya + yb) / 2, { s: 11.5, w: 900, c: '#fff', bg: 'rgba(3,105,161,.85)' });
      Q39.T(ctx, '50 km', g.x1 - 26, ya, { s: 10, w: 800, c: '#e0f2fe' }); Q39.T(ctx, '15 km', g.x1 - 26, yb, { s: 10, w: 800, c: '#0f172a' });
      // three UV beams
      const sp = (g.x1 - g.x0 - 160) / 2;
      UV.forEach((u, i) => { const x = g.x0 + 130 + i * sp, ps = D.pass(S, u[0]), y0 = g.top + 100;
        Q39.T(ctx, u[1], x, y0 - 14, { s: 11, w: 900, c: '#fff', bg: u[3] }); Q39.T(ctx, u[2], x, y0 + 6, { s: 9, w: 700, c: '#e9d5ff' });
        const P1 = [], P2 = []; for (let y = y0 + 16; y <= g.yg; y += 3) { const p = [x + 7 * Math.sin((y - S.ph * 120) / 9), y]; (y < (ya + yb) / 2 ? P1 : P2).push(p); }
        K.raw(ctx, () => { ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = u[3]; ctx.shadowColor = u[3]; ctx.shadowBlur = 8; ctx.beginPath(); P1.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); if (ps > .03) { ctx.globalAlpha = Math.min(1, ps + .1); ctx.lineWidth = 1 + 2 * ps; ctx.beginPath(); P2.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); } ctx.restore(); });
        if (ps < .05) Q39.T(ctx, '✖ حُجبت', x, (ya + yb) / 2 + 30, { s: 11, w: 900, c: '#fff', bg: '#15803d' });
        Q39.T(ctx, Math.round(ps * 100) + ' %', x, g.yg + 14, { s: 11, w: 900, c: '#fff', bg: ps > .3 && u[0] !== 'A' ? '#b91c1c' : '#334155' }); });
      // ground: person and plants
      K.raw(ctx, () => { ctx.fillStyle = '#65a30d'; ctx.fillRect(g.x0, g.yg + 26, g.x1 - g.x0, 14); });
      const risk = D.pass(S, 'C') * 8 + D.pass(S, 'B') * 3; Q39.T(ctx, risk > 2 ? '🥵' : '🙂', g.x1 - 40, g.yg - 20, { s: 26 }); Q39.T(ctx, '🌱', g.x0 + 40, g.yg + 8, { s: 22 });
      // ozone slider (drag)
      const t = S.p.oz / 100; Q41.slider(ctx, g.sx0, g.sx1, g.sy, t, '', '#0ea5e9');
      Q39.T(ctx, 'كمية الأوزون ' + S.p.oz + ' %', (g.sx0 + g.sx1) / 2, g.sy + 24, { s: 11, w: 900, c: '#fff', bg: 'rgba(3,105,161,.85)' });
      Q39.card(ctx, S, [{ t: 'UV-C: الأخطر، تحجبه طبقة الأوزون', c: '#6d28d9', w: 900 }, { t: 'UV-B: يصل جزء منه؛ التعرض الطويل له يسبب حروق الجلد وقد يسبب سرطان الجلد', c: '#7c3aed', w: 800 }, { t: 'UV-A: يصل إلى الأرض', c: '#8b5cf6', w: 800 }, { t: 'مؤشر الخطر على الجلد: ' + Q39.f(risk, 1), c: risk > 2 ? '#b91c1c' : '#15803d', w: 900, s: 13.5 }, { t: 'هل تعلم: ثقب الأوزون انخفاض في تركيز الأوزون فوق القطبين الجنوبي والشمالي.', c: '#334155' }], { title: 'الأشعة فوق البنفسجية', wd: 310, y: 70 });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'اسحب مقبض كمية الأوزون ولاحظ الأشعة C');
    },
    chips(S, g) { return Q39.chips(S, 'oz', [['100', 'طبقة سليمة'], ['35', 'ثقب الأوزون'], ['0', 'بلا أوزون']], g.h - 84, String(S.p.oz), (S2, k) => { setParam(S2, 'oz', +k); }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [Q41.sdrag('ozk', g.sx0, g.sx1, g.sy, S.p.oz / 100, (S2, v) => setParam(S2, 'oz', Math.round(v * 100)), { tip: 'اسحب لتغيير كمية الأوزون', extra: { idle: 'اسحب ✋' } })].concat(D.chips(S, g)); },
    readings(S) { return [rd('كمية الأوزون', S.p.oz + ' %'), rd('UV-A الواصلة', Math.round(D.pass(S, 'A') * 100) + ' %'), rd('UV-B الواصلة', Math.round(D.pass(S, 'B') * 100) + ' %'), rd('UV-C الواصلة', Math.round(D.pass(S, 'C') * 100) + ' %')]; },
    explain(S) { return Q26.ex(S.p.oz > 60 ? 'الأشعة C لا تصل إلى الأرض.' : 'مع نقص الأوزون تصل الأشعة الضارة C و B إلى الأرض.', 'جزيئات الأوزون O₃ في الستراتوسفير تمتص الأشعة فوق البنفسجية الضارة نوع C فتحجبها عن سطح الأرض، لذا تعد طبقة الأوزون مظلة واقية لكل كائن حي.', 'استعمل واقي الشمس ولا تتعرض للشمس طويلاً وقت الظهيرة لتجنب حروق الجلد من UV-B.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B4 — تكوّن الأوزون: O₂ + UV → O + O ، O + O₂ → O₃ (ص 166) =============== */
(() => {
  const N0 = 16;
  const D = { id: 'g9_at_o3', page: 166, fig: 'معادلة تكوّن الأوزون',
    desc: 'يتولد الأوزون الموجود في طبقة الستراتوسفير بوساطة الأشعة فوق البنفسجية التي مصدرها الشمس. نوعا الأشعة فوق البنفسجية (A و B) لهما دور في توليد الأوزون O₃ حيث تمتص الأشعة من قبل جزيئة الأوكسجين O₂ الموجودة في الجو فتتفكك إلى ذرتي أوكسجين (O + O)، وبعدها تندمج كل ذرة واحدة مع جزيئة الأوكسجين O₂ مولدة جزيئة الأوزون O₃.',
    tags: 'تكون الأوزون O2 UV ذرة أوكسجين جزيئة أوكسجين جزيئة الأوزون O3 معادلة تفكك اندماج',
    tools: ['جزيئات أوكسجين O₂', 'فوتونات أشعة فوق بنفسجية A و B'],
    steps: ['اضغط على أي جزيئة O₂ لتطلق نحوها فوتون أشعة فوق بنفسجية.', 'لاحظ تفكك O₂ إلى ذرتي أوكسجين، ثم اندماج كل ذرة مع جزيئة O₂ لتكوين O₃.', 'شغّل «إطلاق تلقائي» وراقب عدد جزيئات الأوزون يزداد.'],
    concl: ['O₂ + UV → O + O', 'O + O₂ → O₃', 'جزيئة O₂ واحدة تمتص فوتوناً فتعطي ذرتين تكونان جزيئتي أوزون.'],
    laws: ['g9_l9_ozone'],
    controls: [TG('auto', 'إطلاق تلقائي للأشعة', false, null, 'sun')],
    setup(S) { S.M = []; for (let i = 0; i < N0; i++) S.M.push({ t: 2, x: .08 + .84 * Q39.rn(i + 3), y: .1 + .8 * Q39.rn(i + 33), vx: (Q39.rn(i + 5) - .5) * .06, vy: (Q39.rn(i + 8) - .5) * .06, a: Q39.rn(i) * TAU }); S.F = []; S.ac = 0; S.n2 = N0; S.n1 = 0; S.n3 = 0; S.st = 0; S.ph = 0; },
    fire(S, tgt) { const c = S.M.filter(q => q.t === 2 && !q.hit); if (!c.length) return; const m = tgt || c[Math.floor(Q39.rn(S.ph * 13) * c.length)]; m.hit = 1; S.F.push({ x: .5, y: -.08, m }); },
    update(S, dt) { S.ph += dt; if (S.p.auto) { S.ac += dt; if (S.ac > 1.1) { S.ac = 0; D.fire(S); } }
      S.F = S.F.filter(f => { const dx = f.m.x - f.x, dy = f.m.y - f.y, d = Math.hypot(dx, dy); if (d < .03) { const m = f.m; m.t = 1; m.hit = 0; m.vx = .25; m.vy = -.1; S.M.push({ t: 1, x: m.x, y: m.y, vx: -.25, vy: .1, a: 0 }); S.st = 1; return false; } f.x += dx / d * dt * .9; f.y += dy / d * dt * .9; return true; });
      S.M.forEach(q => { if (q.t === 1) { let best = null, bd = 9; S.M.forEach(o => { if (o.t === 2 && !o.hit && !o.tg) { const d = Math.hypot(o.x - q.x, o.y - q.y); if (d < bd) { bd = d; best = o; } } }); if (best) { const ax = best.x - q.x, ay = best.y - q.y; q.vx = Q39.ez(q.vx, ax / bd * .3, dt, 3); q.vy = Q39.ez(q.vy, ay / bd * .3, dt, 3); if (bd < .035) { best.t = 3; q.dead = 1; S.st = 2; } } }
        q.x += q.vx * dt; q.y += q.vy * dt; q.a += dt; if (q.x < .04 || q.x > .96) q.vx = -q.vx; if (q.y < .06 || q.y > .94) q.vy = -q.vy; q.x = clamp(q.x, .04, .96); q.y = clamp(q.y, .06, .94); });
      S.M = S.M.filter(q => !q.dead); S.n2 = S.M.filter(q => q.t === 2).length; S.n1 = S.M.filter(q => q.t === 1).length; S.n3 = S.M.filter(q => q.t === 3).length; },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), x0 = L + 30, x1 = w - 345, y0 = 150, y1 = h - 200; return { w, h, L, x0, x1, y0, y1 }; },
    P(g, q) { return [g.x0 + q.x * (g.x1 - g.x0), g.y0 + q.y * (g.y1 - g.y0)]; },
    atom(ctx, x, y, r = 8) { K.raw(ctx, () => { const gr = ctx.createRadialGradient(x - r * .3, y - r * .3, 1, x, y, r); gr.addColorStop(0, '#fecaca'); gr.addColorStop(1, '#dc2626'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 1; ctx.stroke(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q39.bg(ctx, w, h, '#ede9fe', '#f8fafc');
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.y0, 0, g.y1); gr.addColorStop(0, '#1e3a8a'); gr.addColorStop(1, '#3b82f6'); ctx.fillStyle = gr; rr(ctx, g.x0, g.y0 - 70, g.x1 - g.x0, g.y1 - g.y0 + 70, 16); ctx.fill(); });
      Q39.sun(ctx, (g.x0 + g.x1) / 2, g.y0 - 30, 18, S.ph * .3);
      Q39.T(ctx, 'الستراتوسفير', g.x0 + 60, g.y0 - 50, { s: 11, w: 900, c: '#fff', bg: 'rgba(15,23,42,.6)' });
      S.F.forEach(f => { const p = D.P(g, f), m = D.P(g, f.m); K.raw(ctx, () => { ctx.strokeStyle = '#c084fc'; ctx.lineWidth = 2.5; ctx.shadowColor = '#c084fc'; ctx.shadowBlur = 8; ctx.beginPath(); const d = Math.hypot(m[0] - p[0], m[1] - p[1]) || 1, ux = (m[0] - p[0]) / d, uy = (m[1] - p[1]) / d; for (let s = -40; s <= 0; s += 2) { const x = p[0] + ux * s - uy * 5 * Math.sin(s / 4 + S.ph * 20), y = p[1] + uy * s + ux * 5 * Math.sin(s / 4 + S.ph * 20); s === -40 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.shadowBlur = 0; }); Q39.T(ctx, 'UV', p[0] + 14, p[1] - 10, { s: 10, w: 900, c: '#e9d5ff' }); });
      S.M.forEach(q => { const p = D.P(g, q); if (q.t === 1) { D.atom(ctx, p[0], p[1], 8); Q39.T(ctx, 'O', p[0], p[1], { s: 9.5, w: 900, c: '#fff' }); return; }
        const n = q.t, r = 8; for (let j = 0; j < n; j++) { const a = q.a + j * TAU / n, d = n === 2 ? 6 : 8; D.atom(ctx, p[0] + Math.cos(a) * d, p[1] + Math.sin(a) * d, r); }
        if (q.t === 3) K.raw(ctx, () => { ctx.strokeStyle = '#fde047'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p[0], p[1], 20, 0, TAU); ctx.stroke(); });
        Q39.T(ctx, q.t === 3 ? 'O₃' : 'O₂', p[0], p[1] + 24, { s: 9.5, w: 900, c: q.t === 3 ? '#fde047' : '#e0f2fe' }); });
      const c = ['O₂ ' + S.n2, 'O ' + S.n1, 'O₃ ' + S.n3];
      c.forEach((t, i) => Q39.T(ctx, t, g.x0 + 60 + i * 100, g.y1 + 24, { s: 13, w: 900, c: '#fff', bg: ['#2563eb', '#dc2626', '#ca8a04'][i] }));
      Q39.card(ctx, S, [{ t: '1. تفكك جزيئة الأوكسجين:', c: '#334155', w: 800 }, { t: 'O₂ + UV → O + O', c: S.st === 1 ? '#b91c1c' : '#0f172a', w: 900, s: 14 }, { t: '2. اندماج ذرة مع جزيئة أوكسجين:', c: '#334155', w: 800 }, { t: 'O + O₂ → O₃', c: S.st === 2 ? '#b91c1c' : '#0f172a', w: 900, s: 14 }, { t: 'الأشعة فوق البنفسجية نوع A و B هي التي تفكك جزيئة الأوكسجين.', c: '#6d28d9' }], { title: 'معادلة تكوّن الأوزون', wd: 310, y: 70 });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'اضغط على جزيئة O₂ لتطلق نحوها أشعة فوق بنفسجية');
    },
    chips(S, g) { return Q39.chips(S, 'fz', [['f', '☀ أطلق UV'], ['r', '↺ من جديد']], g.h - 84, '', (S2, k) => { if (k === 'f') D.fire(S2); else D.setup(S2); }, { bw: 160 }); },
    drags(S) { if (!S.W || !S.M) return []; const g = D.geo(S); return S.M.filter(q => q.t === 2).slice(0, 12).map((q, i) => { const p = D.P(g, q); return { id: 'm' + i, x: p[0], y: p[1], r: 16, tip: 'اضغط لتطلق أشعة نحو الجزيئة', idle: 'اضغط على O₂ ✋', hint: i ? false : undefined, click: S2 => { if (!q.hit && q.t === 2) { q.hit = 1; S2.F.push({ x: .5, y: -.08, m: q }); } } }; }).concat(D.chips(S, g)); },
    readings(S) { return [rd('جزيئات أوكسجين O₂', S.n2), rd('ذرات أوكسجين O', S.n1), rd('جزيئات أوزون O₃', S.n3)]; },
    explain(S) { return Q26.ex('جزيئات الأوزون (المحاطة بحلقة صفراء) تزداد كلما أطلقت أشعة فوق بنفسجية.', 'تمتص جزيئة الأوكسجين O₂ الأشعة فوق البنفسجية نوع A و B فتتفكك إلى ذرتي أوكسجين، ثم تندمج كل ذرة مع جزيئة O₂ لتكوّن جزيئة أوزون O₃.', 'هكذا تتجدد طبقة الأوزون في الستراتوسفير باستمرار بفعل أشعة الشمس.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B5 — الثرموسفير (الأيونوسفير) والإكسوسفير (ص 167، الشكلان 6 و 7) =============== */
(() => {
  const GAS = [['H', 'الهيدروجين', 1, '#ec4899'], ['He', 'الهليوم', 4, '#eab308'], ['O', 'الأوكسجين', 16, '#ef4444']];
  const D = { id: 'g9_at_exo', page: 167, fig: 'الشكلان 6 و 7',
    desc: 'الثرموسفير طبقة ساخنة فوق الميزوسفير تعرف بالطبقة الحرارية وترتفع من 90 km حتى 500 km، وتحتوي على إلكترونات حرة وأيونات وتعرف أيضاً بالطبقة المتأينة الأيونوسفير، وتزداد درجة حرارتها مع الارتفاع حتى نحو 1000 °C عند حافتها العليا، وتمتاز بخاصية عكس الموجات الراديوية (الشكل 6). الإكسوسفير أعلى طبقة وتقع على ارتفاع يزيد على 500 km وتمثل الغلاف الغازي الخارجي، وجزيئات الغاز فيها تتحرك بسرعة كبيرة جداً بحيث تمتلك طاقة حركية كافية للإفلات من قوة جذب الأرض والهروب إلى الفضاء الخارجي (الشكل 7).',
    tags: 'الثرموسفير الأيونوسفير الإكسوسفير إلكترونات حرة أيونات تأين عكس الموجات الراديوية سرعة الإفلات طاقة حركية الشكل 6 الشكل 7',
    tools: ['أشعة الشمس', 'ذرات غاز', 'جهاز إرسال راديوي'],
    steps: ['في «الأيونوسفير»: لاحظ أشعة الشمس تنتزع الإلكترونات من الذرات فتتكون أيونات وإلكترونات حرة.', 'أطفئ «النهار» وراقب عدد الإلكترونات الحرة، وهل تعكس الطبقة موجة الراديو؟', 'في «الإكسوسفير»: اختر الغاز ودرجة الحرارة وعدّ الجزيئات التي تفلت إلى الفضاء.'],
    concl: ['الثرموسفير تحتوي إلكترونات حرة وأيونات لذا تسمى الأيونوسفير.', 'الأيونوسفير تعكس الموجات الراديوية فتصل إلى مسافات بعيدة.', 'جزيئات الإكسوسفير سريعة جداً، والخفيفة منها تفلت من جذب الأرض إلى الفضاء.'],
    laws: [],
    controls: [TG('day', 'النهار (أشعة الشمس)', true, null, 'sun'), R('T', 'درجة حرارة الإكسوسفير', 300, 1500, 1000, 50, '°C')],
    setup(S) { S.md = 'ion'; S.gas = 'H'; S.A = []; for (let i = 0; i < 34; i++) S.A.push({ x: .06 + .88 * Q39.rn(i + 1), y: .1 + .8 * Q39.rn(i + 50), ion: 0, ex: 0, ey: 0 }); S.ne = 0; S.ph = 0; S.pc = 0; S.Pm = []; S.esc = 0; S.ret = 0; S.sp = 0; },
    vth(S) { const m = GAS.find(q => q[0] === S.gas)[2]; return Math.sqrt(2 * 1.38e-23 * (S.p.T + 273) / (m * 1.67e-27)) / 1000; },
    update(S, dt) { S.ph += dt;
      if (S.md === 'ion') { S.pc += dt; if (S.p.day && S.pc > .25) { S.pc = 0; const c = S.A.filter(a => !a.ion); if (c.length) { const a = c[Math.floor(Q39.rn(S.ph * 7) * c.length)]; a.ion = 1; a.ex = a.x; a.ey = a.y; } }
        S.A.forEach((a, i) => { if (a.ion) { a.ex += (Q39.rn(i + Math.floor(S.ph * 4)) - .5) * dt * .5; a.ey += (Q39.rn(i * 3 + Math.floor(S.ph * 4)) - .5) * dt * .5; a.ex = clamp(a.ex, .02, .98); a.ey = clamp(a.ey, .05, .95); if (!S.p.day && Q39.rn(i + S.ph * 9) < dt * .7) a.ion = 0; } }); S.ne = S.A.filter(a => a.ion).length; }
      else { S.sp += dt; const vt = D.vth(S); if (S.sp > .12) { S.sp = 0; const u = Q39.rn(S.ph * 31), v = vt * Math.sqrt(-Math.log(1 - u * .999)) * 1.9, an = Math.PI * (.3 + .4 * Q39.rn(S.ph * 17)); S.Pm.push({ x: .05 + .9 * Q39.rn(S.ph * 5), y: 0, vx: Math.cos(an) * v, vy: Math.sin(an) * v, v }); }
        const k = .1, gg = (k * 10.8) * (k * 10.8) / 2; S.Pm.forEach(p => { p.x += p.vx * dt * .03; p.y += p.vy * k * dt; p.vy -= gg / k * dt; }); S.Pm = S.Pm.filter(p => { if (p.y > 1) { S.esc++; return false; } if (p.y < 0) { S.ret++; return false; } return p.x > -.1 && p.x < 1.1; }); } },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), x0 = L + 30, x1 = w - 345, y0 = 90, y1 = h - 230; return { w, h, L, x0, x1, y0, y1 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q39.bg(ctx, w, h, '#e0e7ff', '#f8fafc');
      if (S.md === 'ion') {
        K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.y0, 0, g.y1); gr.addColorStop(0, S.p.day ? '#4c1d95' : '#0f0a2e'); gr.addColorStop(1, S.p.day ? '#6d28d9' : '#1e1b4b'); ctx.fillStyle = gr; rr(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, 14); ctx.fill(); });
        if (S.p.day) Q39.sun(ctx, g.x0 + 30, g.y0 + 30, 16, S.ph * .3); else Q39.T(ctx, '🌙', g.x0 + 30, g.y0 + 30, { s: 22 });
        const X = a => g.x0 + a * (g.x1 - g.x0), Yv = a => g.y0 + a * (g.y1 - g.y0 - 90);
        S.A.forEach(a => { const x = X(a.x), y = Yv(a.y); K.raw(ctx, () => { ctx.fillStyle = a.ion ? '#f59e0b' : '#94a3b8'; ctx.beginPath(); ctx.arc(x, y, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke(); if (a.ion) { ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x + 4, y); ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 4); ctx.stroke(); const ex = X(a.ex) + 14, ey = Yv(a.ey) - 10; ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(ex, ey, 3.5, 0, TAU); ctx.fill(); } }); });
        // radio wave from the ground
        const gy = g.y1 - 20, refl = S.ne >= 12, tx = g.x0 + 60, top = Yv(.55);
        K.raw(ctx, () => { ctx.fillStyle = '#15803d'; ctx.fillRect(g.x0, g.y1 - 22, g.x1 - g.x0, 22); });
        const tp = Q39.tower(ctx, tx, gy, 40); const P = refl ? [tp, [(tx + g.x1 - 60) / 2, top], [g.x1 - 60, gy - 30]] : [tp, [tx + 140, g.y0 + 4]];
        Q39.ray(ctx, P, refl ? '#22c55e' : '#f87171', S.ph, { w: 2.5, gap: 40 });
        Q39.T(ctx, refl ? 'انعكست موجة الراديو إلى الأرض' : 'إلكترونات قليلة: نفذت الموجة', (g.x0 + g.x1) / 2, g.y1 - 50, { s: 11.5, w: 900, c: '#fff', bg: refl ? '#15803d' : '#b91c1c' });
        Q39.T(ctx, '📻', g.x1 - 60, gy - 14, { s: 18 });
        Q39.card(ctx, S, [{ t: 'الثرموسفير: من 90 km حتى 500 km', c: '#6d28d9', w: 900 }, { t: 'الأشعة الشمسية تنتزع إلكترونات من الذرات ⟸ أيونات موجبة + إلكترونات حرة', c: '#0f172a', w: 800 }, { t: 'لذا تسمى الطبقة المتأينة الأيونوسفير.', c: '#0f172a' }, { t: 'الإلكترونات الحرة: ' + S.ne, c: '#0369a1', w: 900, s: 13.5 }, { t: 'تعكس الأيونوسفير الموجات الراديوية فتصل إلى مسافات بعيدة (الشكل 6).', c: '#15803d', w: 800 }], { title: 'الأيونوسفير', wd: 310, y: 70 });
      } else {
        K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.y0, 0, g.y1); gr.addColorStop(0, '#020617'); gr.addColorStop(1, '#312e81'); ctx.fillStyle = gr; rr(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, 14); ctx.fill(); ctx.strokeStyle = '#a5b4fc'; ctx.setLineDash([6, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.x0, g.y1 - 40); ctx.lineTo(g.x1, g.y1 - 40); ctx.stroke(); ctx.setLineDash([]); });
        K.raw(ctx, () => { ctx.save(); rr(ctx, g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0, 14); ctx.clip(); }); Q39.globe(ctx, (g.x0 + g.x1) / 2, g.y1 + 250, 280, { atm: 18 }); K.raw(ctx, () => ctx.restore());
        Q39.T(ctx, 'بداية الإكسوسفير 500 km', g.x0 + 100, g.y1 - 54, { s: 10.5, w: 900, c: '#fff', bg: 'rgba(67,56,202,.85)' });
        Q39.T(ctx, '↑ إلى الفضاء الخارجي', (g.x0 + g.x1) / 2, g.y0 + 16, { s: 11, w: 900, c: '#fde047' });
        const gc = GAS.find(q => q[0] === S.gas), H0 = g.y1 - 40 - (g.y0 + 30);
        S.Pm.forEach(p => { const x = g.x0 + p.x * (g.x1 - g.x0), y = g.y1 - 40 - p.y * H0; K.raw(ctx, () => { ctx.fillStyle = gc[3]; ctx.beginPath(); ctx.arc(x, y, p.v > 10.8 ? 4.5 : 3.5, 0, TAU); ctx.fill(); if (p.v > 10.8) { ctx.strokeStyle = '#fde047'; ctx.lineWidth = 1.5; ctx.stroke(); } }); });
        Q39.T(ctx, 'أفلتت: ' + S.esc, g.x0 + 80, g.y0 + 46, { s: 12.5, w: 900, c: '#fff', bg: '#b91c1c' }); Q39.T(ctx, 'عادت: ' + S.ret, g.x1 - 80, g.y0 + 46, { s: 12.5, w: 900, c: '#fff', bg: '#334155' });
        const vt = D.vth(S);
        Q39.card(ctx, S, [{ t: 'الإكسوسفير: أعلى طبقة فوق 500 km', c: '#4338ca', w: 900 }, { t: 'الغلاف الغازي الخارجي، وجزيئاته سريعة جداً.', c: '#0f172a' }, { t: 'سرعة الإفلات من جذب الأرض ≈ 10.8 km/s', c: '#b91c1c', w: 900 }, { t: 'السرعة المميزة لجزيئات ' + gc[1] + ' ≈ ' + Q39.f(vt, 1) + ' km/s', c: '#0f172a', w: 800 }, { t: 'الجزيئة التي طاقتها الحركية كافية تفلت إلى الفضاء الخارجي، والخفيفة أسرع.', c: '#334155' }], { title: 'الإكسوسفير', wd: 310, y: 70 });
      }
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, S.md === 'ion' ? 'راقب تأين الذرات بأشعة الشمس، ثم أطفئ النهار' : 'اختر الغاز وعدّ الجزيئات التي تفلت إلى الفضاء');
    },
    chips(S, g) { const a = Q39.chips(S, 'md', [['ion', 'الثرموسفير: الأيونوسفير'], ['esc', 'الإكسوسفير: الإفلات']], g.h - 84, S.md, (S2, k) => { S2.md = k; S2.esc = 0; S2.ret = 0; S2.Pm = []; }, { bw: 230 });
      if (S.md !== 'esc') return a; return a.concat(Q39.chips(S, 'gs', GAS.map(q => [q[0], q[1]]), g.h - 128, S.gas, (S2, k) => { S2.gas = k; S2.esc = 0; S2.ret = 0; S2.Pm = []; }, { bw: 150, col: '#7c3aed' })); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); const L = S.md === 'ion' ? [{ id: 'sunt', x: g.x0 + 30, y: g.y0 + 30, r: 24, tip: 'اضغط للتبديل بين النهار والليل', idle: 'اضغط ✋', click: S2 => { setParam(S2, 'day', !S2.p.day); } }] : []; return L.concat(D.chips(S, g)); },
    readings(S) { return S.md === 'ion' ? [rd('الوقت', S.p.day ? 'نهار' : 'ليل'), rd('الإلكترونات الحرة', S.ne), rd('موجة الراديو', S.ne >= 12 ? 'تنعكس' : 'تنفذ')] : [rd('الغاز', GAS.find(q => q[0] === S.gas)[1]), rd('درجة الحرارة', S.p.T + ' °C'), rd('السرعة المميزة', Q39.f(D.vth(S), 2) + ' km/s'), rd('أفلتت / عادت', S.esc + ' / ' + S.ret)]; },
    explain(S) { return S.md === 'ion' ? Q26.ex(S.p.day ? 'تتأين الذرات وتزداد الإلكترونات الحرة.' : 'ليلاً تتحد الإلكترونات بالأيونات فيقل عددها.', 'الأشعة الشمسية ذات الطاقة العالية تنتزع إلكترونات من ذرات الغاز في الثرموسفير فتتكون أيونات وإلكترونات حرة، ولذلك تسمى الأيونوسفير، وهي التي تعكس الموجات الراديوية إلى الأرض.', 'بفضل الأيونوسفير يصل بث الراديو إلى مسافات بعيدة.') : Q26.ex('بعض الجزيئات تفلت إلى الفضاء والبقية تعود.', 'جزيئات الغاز في الإكسوسفير تتحرك بسرعة كبيرة جداً، والجزيئة التي سرعتها أكبر من سرعة الإفلات (10.8 km/s تقريباً) تمتلك طاقة حركية كافية للإفلات من جذب الأرض. الغازات الخفيفة كالهيدروجين أسرع فتفلت أكثر.', 'لهذا يقل الهيدروجين والهليوم في جو الأرض.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — الموجات الأرضية (السطحية) قصيرة المدى (ص 168، الشكل 8-a) =============== */
(() => {
  const RP = 1100;
  const D = { id: 'g9_at_ground', page: 168, fig: 'الشكل 8-a',
    desc: 'الموجات اللاسلكية تنتشر في الجو بطريقتين هما الموجات الأرضية والموجات السماوية. الموجات الأرضية: موجات راديوية تنتقل قريبة من سطح الأرض لذا يشار لها أحياناً بالموجات السطحية، وتكون قصيرة المدى بسبب انتشارها بخطوط مستقيمة، لذا فهي غير قادرة على تأمين الاتصالات إلا لمسافات قصيرة نسبياً نتيجة لتحدب سطح الأرض، وتعتمد على طبيعة الهوائي وتردد الموجات الناقلة وقدرة جهاز الإرسال، ويكون ترددها أقل من 200 MHz.',
    tags: 'الموجات الأرضية الموجات السطحية قصيرة المدى تحدب سطح الأرض الهوائي التردد قدرة جهاز الإرسال 200 MHz الشكل 8-a',
    tools: ['برج إرسال (هوائي)', 'جهاز استقبال في سيارة', 'مقياس شدة الإشارة'],
    steps: ['اسحب السيارة مبتعدة عن برج الإرسال وراقب شدة الإشارة.', 'غيّر قدرة جهاز الإرسال والتردد وارتفاع الهوائي: كيف يتغير مدى الموجة الأرضية؟', 'لاحظ الخط المتقطع المستقيم: لماذا لا يصل إلى السيارة البعيدة؟ (تحدب سطح الأرض)'],
    concl: ['الموجات الأرضية تنتقل قريبة من سطح الأرض وتسمى السطحية.', 'مداها قصير نسبياً بسبب تحدب سطح الأرض.', 'يعتمد مداها على طبيعة الهوائي (ارتفاعه) وتردد الموجة وقدرة جهاز الإرسال، وترددها أقل من 200 MHz.'],
    laws: ['g9_l9_delay'],
    controls: [R('P', 'قدرة جهاز الإرسال', 1, 100, 20, 1, 'kW'), R('f', 'تردد الموجة', .1, 200, 1, .1, 'MHz'), R('ht', 'ارتفاع الهوائي', 10, 300, 100, 10, 'm')],
    setup(S) { S.ar = .12; S.art = .12; S.ph = 0; S.hv = 100; },
    rng(S) { const Rg = 30 * Math.sqrt(S.p.P) * Math.pow(S.p.f, -.4), los = 3.57 * (Math.sqrt(S.p.ht) + Math.sqrt(2)); return { Rg, los, R: Math.max(Rg, los) }; },
    update(S, dt) { S.ph += dt; S.ar = Q39.ez(S.ar, S.art, dt, 10); S.hv = Q39.ez(S.hv, S.p.ht, dt, 8); },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), cx = (L + w) / 2, top = h - 300, cy = top + RP; const aT = Math.asin((L + 60 - cx) / RP); return { w, h, L, cx, cy, top, aT }; },
    km(a) { return a * RP * .5; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), r = D.rng(S), d = D.km(S.ar), q = Math.pow(clamp(1 - d / r.R, 0, 1), .7);
      Q39.bg(ctx, w, h, '#bae6fd', '#f0f9ff');
      K.raw(ctx, () => { ctx.save(); const gr = ctx.createLinearGradient(0, 60, 0, g.top); gr.addColorStop(0, '#38bdf8'); gr.addColorStop(1, '#e0f2fe'); ctx.fillStyle = gr; ctx.fillRect(g.L, 60, w - g.L, g.top + 60); ctx.restore(); });
      Q39.arc(ctx, g.cx, g.cy, RP);
      // ground-wave band hugging the surface
      const aR = r.R / (RP * .5);
      for (let k = 100; k <= 300; k += 100) { const p = Q39.pol(g.cx, g.cy, RP - 4, g.aT + k / (RP * .5)), p2 = Q39.pol(g.cx, g.cy, RP + 6, g.aT + k / (RP * .5)); Q41.line(ctx, [p, p2], '#14532d', 2); Q39.T(ctx, k + ' km', p[0], p[1] + 16, { s: 10, w: 800, c: '#dcfce7' }); }
      K.raw(ctx, () => { ctx.save(); for (let k = 0; k < 26; k++) { const a0 = g.aT + aR * k / 26, a1 = g.aT + aR * (k + 1) / 26, al = .45 * (1 - k / 26); ctx.strokeStyle = 'rgba(234,88,12,' + al + ')'; ctx.lineWidth = 18; ctx.beginPath(); ctx.arc(g.cx, g.cy, RP + 9, a0 - Math.PI / 2, a1 - Math.PI / 2); ctx.stroke(); }
        ctx.strokeStyle = 'rgba(194,65,12,.9)'; ctx.lineWidth = 2.5; for (let k = 0; k < 7; k++) { const fr = ((S.ph * .25 + k / 7) % 1), a = g.aT + aR * fr, p1 = Q39.pol(g.cx, g.cy, RP + 2, a), p2 = Q39.pol(g.cx, g.cy, RP + 30 * (1 - fr) + 8, a); ctx.globalAlpha = 1 - fr; ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke(); } ctx.restore(); });
      // tower
      const tb = Q39.pol(g.cx, g.cy, RP, g.aT), th = 40 + S.hv * .45, tp = Q39.tower(ctx, tb[0], tb[1], th, g.aT, { blink: Math.sin(S.ph * 5) > 0 });
      Q39.T(ctx, 'ارتفاع الهوائي ' + Math.round(S.hv) + ' m', tp[0] + 4, tp[1] - 20, { s: 10.5, w: 900, c: '#fff', bg: '#334155' });
      // straight line of sight: tangent from tower top
      const dd = Math.hypot(tp[0] - g.cx, tp[1] - g.cy), ang = Math.atan2(tp[1] - g.cy, tp[0] - g.cx), tg = ang + Math.acos(RP / dd), T1 = [g.cx + RP * Math.cos(tg), g.cy + RP * Math.sin(tg)], dir = [T1[0] - tp[0], T1[1] - tp[1]], dl = Math.hypot(dir[0], dir[1]);
      Q41.line(ctx, [tp, T1, [T1[0] + dir[0] / dl * 420, T1[1] + dir[1] / dl * 420]], 'rgba(30,64,175,.8)', 2, [8, 6]);
      Q39.T(ctx, 'خط مستقيم يترك سطح الأرض', Math.min(w - 100, T1[0] + dir[0] / dl * 90), T1[1] + dir[1] / dl * 90 - 18, { s: 10.5, w: 900, c: '#fff', bg: 'rgba(30,64,175,.85)' });
      // receiver car
      const ca = g.aT + S.ar, cp = Q39.pol(g.cx, g.cy, RP, ca);
      K.raw(ctx, () => { ctx.save(); ctx.translate(cp[0], cp[1]); ctx.rotate(ca); ctx.fillStyle = '#dc2626'; rr(ctx, -22, -18, 44, 13, 4); ctx.fill(); ctx.fillStyle = '#b91c1c'; rr(ctx, -12, -28, 24, 12, 4); ctx.fill(); ctx.fillStyle = '#bae6fd'; ctx.fillRect(-9, -26, 8, 8); ctx.fillRect(1, -26, 8, 8); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(-12, -4, 5, 0, TAU); ctx.arc(12, -4, 5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(14, -18); ctx.lineTo(18, -40); ctx.stroke(); ctx.restore(); });
      Q39.bars(ctx, cp[0] - 12, cp[1] - 50, q, q > .05 ? '#16a34a' : '#dc2626');
      Q39.T(ctx, Math.round(d) + ' km', cp[0], cp[1] + 22, { s: 11, w: 900, c: '#fff', bg: '#0f172a' });
      Q39.T(ctx, q > .05 ? 'تُستقبل الإشارة' : 'لا إشارة', cp[0], cp[1] - 70, { s: 11, w: 900, c: '#fff', bg: q > .05 ? '#15803d' : '#b91c1c' });
      Q39.T(ctx, 'مدى الموجة الأرضية ≈ ' + Math.round(r.R) + ' km', g.cx - 60, g.top - 90, { s: 13, w: 900, c: '#fff', bg: '#c2410c' });
      Q39.card(ctx, S, [{ t: 'الموجات الأرضية = السطحية', c: '#c2410c', w: 900 }, { t: 'تنتقل قريبة من سطح الأرض بخطوط مستقيمة، فتحدب الأرض يجعل مداها قصيراً نسبياً.', c: '#0f172a', w: 800 }, { t: 'يعتمد مداها على: الهوائي، والتردد، وقدرة جهاز الإرسال.', c: '#334155' }, { t: 'ترددها أقل من 200 MHz.', c: '#1d4ed8', w: 900 }], { title: 'الشكل 8-a', wd: 300, y: 70 });
      Q39.T(ctx, 'تحدب الأرض مكبَّر للتوضيح', g.L + 90, h - 168, { s: 10, w: 800, c: '#fff', bg: 'rgba(20,83,45,.8)' });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'اسحب السيارة بعيداً عن البرج وراقب الإشارة');
    },
    chips(S, g) { return Q39.chips(S, 'fq', [['.5', '0.5 MHz'], ['5', '5 MHz'], ['50', '50 MHz'], ['150', '150 MHz']], g.h - 84, String(S.p.f), (S2, k) => { setParam(S2, 'f', +k); }, { bw: 140 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), cp = Q39.pol(g.cx, g.cy, RP, g.aT + S.ar), tb = Q39.pol(g.cx, g.cy, RP, g.aT), th = 40 + S.hv * .45;
      return [{ id: 'car', x: cp[0], y: cp[1] - 16, r: 26, axis: 'x', keep: true, tip: 'اسحب السيارة', idle: 'اسحب ✋', drag: (S2, d) => { S2.art = clamp(Math.asin(clamp((d.x - g.cx) / RP, -1, 1)) - g.aT, .02, .62); } },
        { id: 'ant', x: tb[0] + Math.sin(g.aT) * th, y: tb[1] - Math.cos(g.aT) * th, r: 18, axis: 'y', keep: true, hint: false, tip: 'اسحب لتغيير ارتفاع الهوائي', drag: (S2, d) => { setParam(S2, 'ht', Math.round(clamp((tb[1] - d.y - 40) / .45, 10, 300) / 10) * 10); } }].concat(D.chips(S, g)); },
    readings(S) { const r = D.rng(S), d = D.km(S.ar); return [rd('بُعد السيارة', Math.round(d) + ' km'), rd('مدى الموجة الأرضية', Math.round(r.R) + ' km'), rd('شدة الإشارة', Math.round(Math.pow(clamp(1 - d / r.R, 0, 1), .7) * 100) + ' %'), rd('التردد', S.p.f + ' MHz')]; },
    record(S) { return { P: S.p.P, f: S.p.f, R: Math.round(D.rng(S).R) }; },
    cols: [['P', 'P (kW)'], ['f', 'f (MHz)'], ['R', 'المدى (km)']],
    graph: { x: 'P', y: 'R', xl: 'قدرة جهاز الإرسال (kW)', yl: 'المدى (km)' },
    explain(S) { return Q26.ex('مدى الموجة الأرضية ' + Math.round(D.rng(S).R) + ' km فقط.', 'الموجات الأرضية تنتشر بخطوط مستقيمة قريبة من سطح الأرض، ولأن سطح الأرض محدب فإنها لا تصل إلا لمسافات قصيرة نسبياً. يزداد مداها بزيادة قدرة جهاز الإرسال وارتفاع الهوائي وبتقليل التردد.', 'لهذا تُنصب هوائيات الإرسال على أبراج عالية وقمم الجبال.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — الموجات السماوية تنعكس عن الأيونوسفير (ص 168–169، الشكلان 8-a و 8-b) =============== */
(() => {
  const RP = 1000, LYR = [['D', 60, 34], ['E', 100, 64], ['F', 300, 150]], RE = 6371;
  const fOf = k => Math.pow(10, -1 + 4.5 * k / 100);
  const fs = f => f >= 1000 ? Q39.f(f / 1000, 1) + ' GHz' : f >= 1 ? Q39.f(f, f < 10 ? 1 : 0) + ' MHz' : Math.round(f * 1000) + ' kHz';
  const band = f => f < .3 ? 'LF' : f < 3 ? 'MF' : f < 30 ? 'HF' : f < 300 ? 'VHF' : 'Microwave';
  const D = { id: 'g9_at_sky', page: 168, fig: 'الشكلان 8-a و 8-b',
    desc: 'الموجات السماوية تستعمل في الاتصالات بعيدة المدى وتسلك أنماطاً مختلفة تبعاً لتردداتها، فالموجات عالية التردد HF (High Frequency) لها القابلية على الانعكاس عن طبقة الأيونوسفير مما يمكنها الانتقال خلال مسافات بعيدة لآلاف الكيلومترات. أما الموجات ذات التردد الأعلى من HF فهي الموجات المايكروية إذ تتمكن من اختراق طبقة الأيونوسفير وتنفذ إلى الفضاء الخارجي (الشكلان 8-a و 8-b). في الشكل 8-b طبقات الأيونوسفير: D على ارتفاع 60 km و E على 100 km و F على 300 km.',
    tags: 'الموجات السماوية الأيونوسفير انعكاس HF عالية التردد بعيدة المدى المايكروية اختراق طبقات D E F زاوية الإطلاق الليل والنهار الشكل 8-b',
    tools: ['هوائي إرسال قابل للتوجيه', 'طبقات الأيونوسفير D و E و F', 'أجهزة راديو للاستقبال'],
    steps: ['اسحب المقبض الأحمر لتغيير زاوية إطلاق الموجة، وراقب انعكاسها عن الأيونوسفير.', 'اختر التردد من الأزرار أو المنزلق: HF تنعكس، والمايكروية تخترق الأيونوسفير.', 'شغّل «الليل»: ماذا يحدث لموجات AM (1 MHz)؟'],
    concl: ['الموجات السماوية تنعكس عن الأيونوسفير فتصل إلى آلاف الكيلومترات (اتصالات بعيدة المدى).', 'نمط انتقالها يعتمد على ترددها.', 'الموجات ذات التردد الأعلى من HF (المايكروية) تخترق الأيونوسفير وتنفذ إلى الفضاء.'],
    laws: [],
    controls: [R('fk', 'تردد الموجة', 0, 100, 44, 1, '', null, v => fs(fOf(v))), R('el', 'زاوية الإطلاق', 5, 80, 25, 1, '°'), TG('night', 'الليل', false, null, 'moon')],
    setup(S) { S.e = 25; S.ph = 0; },
    update(S, dt) { S.ph += dt; S.e = Q39.ez(S.e, S.p.el, dt, 8); },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), cx = (L + w) / 2, top = h - 215, cy = top + RP, aT = Math.asin((L + 70 - cx) / RP); return { w, h, L, cx, cy, top, aT }; },
    /* which layer reflects: returns {k: layer index or -1 (penetrate) , abs: absorbed at D} */
    fate(S, e) { const f = fOf(S.p.fk), N = S.p.night, er = e * Math.PI / 180;
      const inc = hk => Math.asin(RE * Math.cos(er) / (RE + hk));
      if (!N && f < .3) return { k: 0 }; if (!N && f < 2) return { k: 0, abs: 1 };
      const foE = N ? .6 : 3, foF = N ? 6 : 9;
      if (f < .3 || f <= foE / Math.cos(inc(100))) return { k: 1 }; if (f <= foF / Math.cos(inc(300))) return { k: 2 }; return { k: -1 }; },
    hopKm(e, hk) { const er = e * Math.PI / 180; return 2 * (Math.acos(RE * Math.cos(er) / (RE + hk)) - er) * RE; },
    path(S, g) { const e = S.e * Math.PI / 180, F = D.fate(S, S.e), P = [Q39.pol(g.cx, g.cy, RP, g.aT)], pts = { land: [] };
      if (F.k < 0) { const up = [Math.sin(g.aT), -Math.cos(g.aT)], fw = [Math.cos(g.aT), Math.sin(g.aT)], d = [fw[0] * Math.cos(e) + up[0] * Math.sin(e), fw[1] * Math.cos(e) + up[1] * Math.sin(e)]; P.push([P[0][0] + d[0] * 900, P[0][1] + d[1] * 900]); return { P, F, land: [] }; }
      const hl = LYR[F.k][2], th = 2 * (Math.acos(RP * Math.cos(e) / (RP + hl)) - e); let a = g.aT;
      if (F.abs) { P.push(Q39.pol(g.cx, g.cy, RP + hl, a + th / 2)); return { P, F, land: [] }; }
      for (let i = 0; i < 6 && a < .62; i++) { P.push(Q39.pol(g.cx, g.cy, RP + hl, a + th / 2)); a += th; P.push(Q39.pol(g.cx, g.cy, RP, a)); pts.land.push(a); }
      return { P, F, land: pts.land }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), f = fOf(S.p.fk), N = S.p.night; Q39.bg(ctx, w, h, N ? '#1e1b4b' : '#bfdbfe', N ? '#312e81' : '#f0f9ff');
      K.raw(ctx, () => { ctx.save(); const gr = ctx.createRadialGradient(g.cx, g.cy, RP, g.cx, g.cy, RP + 420); gr.addColorStop(0, N ? '#1e3a8a' : '#7dd3fc'); gr.addColorStop(1, N ? '#020617' : '#1e3a8a'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.cx, g.cy, RP + 420, 0, TAU); ctx.fill(); ctx.restore(); });
      LYR.forEach((q, i) => { if (N && i === 0) return; const r = RP + q[2]; K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = ['rgba(250,204,21,.35)', 'rgba(251,146,60,.4)', 'rgba(244,114,182,.45)'][i]; ctx.lineWidth = i === 2 ? 22 : 12; ctx.beginPath(); ctx.arc(g.cx, g.cy, r, -Math.PI / 2 - .75, -Math.PI / 2 + .75); ctx.stroke(); ctx.restore(); }); const p = Q39.pol(g.cx, g.cy, r, .27); Q39.T(ctx, q[0] + ' ' + q[1] + ' km', p[0], p[1], { s: 10.5, w: 900, c: '#fff', bg: 'rgba(15,23,42,.65)' }); });
      Q39.T(ctx, 'الأيونوسفير', g.cx + 20, g.top - 175, { s: 11.5, w: 900, c: '#fff', bg: 'rgba(190,24,93,.85)' });
      Q39.arc(ctx, g.cx, g.cy, RP);
      if (f < 200) K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = 'rgba(234,88,12,.5)'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(g.cx, g.cy, RP + 6, g.aT - Math.PI / 2, g.aT + .06 - Math.PI / 2); ctx.stroke(); ctx.restore(); });
      const pa = D.path(S, g), col = pa.F.k < 0 ? '#a855f7' : pa.F.abs ? '#ef4444' : '#22c55e';
      Q39.ray(ctx, pa.P, col, S.ph, { w: 3, gap: 50, sp: 150 });
      pa.land.forEach((a, i) => { if (a > .58) return; const p = Q39.pol(g.cx, g.cy, RP, a); Q39.T(ctx, '📻', p[0], p[1] - 12, { s: 16 }); if (i === 0) Q39.T(ctx, Math.round(D.hopKm(S.e, LYR[pa.F.k][1])) + ' km', p[0], p[1] + 18, { s: 10.5, w: 900, c: '#fff', bg: '#15803d' }); });
      if (pa.F.abs) { const p = pa.P[1]; Q39.T(ctx, '✖ امتصتها الطبقة D نهاراً', p[0] + 90, p[1] - 56, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' }); }
      if (pa.F.k < 0) { const p = Q39.along(pa.P, 250); Q39.T(ctx, 'نفذت إلى الفضاء الخارجي', p[0] + 90, p[1] + 10, { s: 11, w: 900, c: '#fff', bg: '#7e22ce' }); }
      // antenna + aim handle
      const b = Q39.pol(g.cx, g.cy, RP, g.aT); Q39.tower(ctx, b[0], b[1], 34, g.aT); const hd = D.hd(S, g);
      Q41.line(ctx, [b, hd], 'rgba(220,38,38,.6)', 2, [4, 3]); Q41.knob(ctx, hd[0], hd[1], '#dc2626', 11);
      Q39.T(ctx, Math.round(S.e) + '°', hd[0] + 22, hd[1] - 4, { s: 11, w: 900, c: '#fff', bg: '#dc2626' });
      const res = pa.F.k < 0 ? 'تخترق الأيونوسفير' : pa.F.abs ? 'تُمتص' : 'تنعكس عن الطبقة ' + LYR[pa.F.k][0];
      Q39.card(ctx, S, [{ t: fs(f) + '  ' + band(f), c: '#0f172a', w: 900, s: 14 }, { t: 'النتيجة: ' + res, c: col === '#22c55e' ? '#15803d' : col, w: 900, s: 13 }, { t: 'HF تنعكس عن الأيونوسفير فتصل إلى آلاف الكيلومترات.', c: '#334155' }, { t: 'التردد الأعلى من HF (المايكروية) يخترق الأيونوسفير إلى الفضاء.', c: '#334155' }], { title: 'الموجات السماوية', wd: 300, y: 70 });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'اسحب المقبض الأحمر لتغيير زاوية الإطلاق، واختر التردد');
    },
    hd(S, g) { const e = S.e * Math.PI / 180, b = Q39.pol(g.cx, g.cy, RP, g.aT), up = [Math.sin(g.aT), -Math.cos(g.aT)], fw = [Math.cos(g.aT), Math.sin(g.aT)]; return [b[0] + (fw[0] * Math.cos(e) + up[0] * Math.sin(e)) * 95, b[1] + (fw[1] * Math.cos(e) + up[1] * Math.sin(e)) * 95]; },
    chips(S, g) { const L = [['16', 'LF 0.2 MHz'], ['22', 'AM 1 MHz'], ['44', 'HF 10 MHz'], ['67', 'VHF 100 MHz'], ['100', 'مايكروية 3 GHz']]; return Q39.chips(S, 'bd', L, g.h - 84, String(S.p.fk), (S2, k) => { setParam(S2, 'fk', +k); }, { bw: 140 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), hd = D.hd(S, g), b = Q39.pol(g.cx, g.cy, RP, g.aT);
      return [{ id: 'aim', x: hd[0], y: hd[1], r: 20, axis: 'xy', keep: true, tip: 'اسحب لتوجيه الهوائي', idle: 'اسحب ✋', drag: (S2, d) => { const vx = d.x - b[0], vy = d.y - b[1], fwx = Math.cos(g.aT), fwy = Math.sin(g.aT), upx = Math.sin(g.aT), upy = -Math.cos(g.aT); const a = Math.atan2(vx * upx + vy * upy, vx * fwx + vy * fwy) * 180 / Math.PI; setParam(S2, 'el', Math.round(clamp(a, 5, 80))); } }].concat(D.chips(S, g)); },
    readings(S) { const f = fOf(S.p.fk), F = D.fate(S, S.e); return [rd('التردد', fs(f) + ' — ' + band(f)), rd('زاوية الإطلاق', Math.round(S.e) + '°'), rd('النتيجة', F.k < 0 ? 'تخترق الأيونوسفير إلى الفضاء' : F.abs ? 'تمتصها الطبقة D' : 'تنعكس عن الطبقة ' + LYR[F.k][0]), rd('طول القفزة الواحدة', F.k >= 0 && !F.abs ? Math.round(D.hopKm(S.e, LYR[F.k][1])) + ' km' : '—')]; },
    record(S) { const F = D.fate(S, S.e); return { e: Math.round(S.e), d: F.k >= 0 && !F.abs ? Math.round(D.hopKm(S.e, LYR[F.k][1])) : 0 }; },
    cols: [['e', 'الزاوية (°)'], ['d', 'طول القفزة (km)']],
    graph: { x: 'e', y: 'd', xl: 'زاوية الإطلاق (°)', yl: 'طول القفزة (km)' },
    explain(S) { const F = D.fate(S, S.e); return Q26.ex(F.k < 0 ? 'الموجة تخترق الأيونوسفير وتنفذ إلى الفضاء.' : F.abs ? 'الموجة تُمتص نهاراً في الطبقة D.' : 'الموجة تنعكس عن الأيونوسفير وتعود إلى الأرض بعيداً.', 'الإلكترونات الحرة في الأيونوسفير تعكس الموجات الراديوية ذات الترددات المنخفضة والعالية HF فتنتقل لآلاف الكيلومترات بقفزات متتالية بين الأيونوسفير والأرض. أما الموجات الأعلى تردداً من HF (المايكروية) فتخترق الأيونوسفير، لذا تستعمل مع الأقمار الصناعية.', 'ليلاً تختفي الطبقة D فتسمع محطات راديو AM بعيدة جداً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C3 — الموجات المايكروية والأقمار الصناعية (ص 169، الشكل 8-b) =============== */
(() => {
  const RE = 6371, RG = 42164, LA = -40, LB = 40;
  const D = { id: 'g9_at_space', page: 169, fig: 'الشكل 8-b',
    desc: 'الموجات ذات التردد الأعلى من HF هي الموجات المايكروية إذ تتمكن من اختراق طبقة الأيونوسفير وتنفذ إلى الفضاء الخارجي، لذا تستعمل في اتصالات الأقمار الصناعية حيث يعمل القمر الصناعي على تسلم هذه الموجات وتقويتها وإعادة بثها إلى الأرض كما في الشكل 8-b، وتستعمل أيضاً في الهواتف النقالة.',
    tags: 'الموجات المايكروية اختراق الأيونوسفير القمر الصناعي تسلم تقوية إعادة بث محطة أرضية صحن لاقط الهاتف النقال الشكل 8-b',
    tools: ['محطة إرسال أرضية A', 'قمر صناعي للاتصالات', 'محطة استقبال B (صحن لاقط)'],
    steps: ['اختر «موجات مايكروية»: تخترق الأيونوسفير وتصل إلى القمر الصناعي ثم إلى المحطة B.', 'اختر «موجات HF»: ماذا يحدث عند الأيونوسفير؟', 'اسحب القمر على مداره: متى يرى المحطتين معاً؟ أطفئ «تقوية الإشارة» وراقب الاستقبال.'],
    concl: ['الموجات المايكروية تخترق الأيونوسفير إلى الفضاء الخارجي.', 'القمر الصناعي يتسلم الموجات ويقويها ويعيد بثها إلى الأرض.', 'تستعمل الموجات المايكروية في اتصالات الأقمار الصناعية والهواتف النقالة.'],
    laws: ['g9_l9_delay'],
    controls: [R('lon', 'موقع القمر على المدار', -70, 70, 0, 1, '°'), TG('amp', 'تقوية الإشارة في القمر', true, null, 'bolt')],
    setup(S) { S.md = 'mw'; S.u = 0; S.ph = 0; },
    update(S, dt) { S.ph += dt; S.u = Q39.ez(S.u, S.p.lon, dt, 8); },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), cx = (L + w - 330) / 2 + 10, cy = h - 250, r = 120, ro = 340; return { w, h, L, cx, cy, r, ro }; },
    vis(u, s) { return Math.cos((u - s) * Math.PI / 180) > RE / RG; },
    dist(u, s) { const a = (u - s) * Math.PI / 180; return Math.sqrt(RE * RE + RG * RG - 2 * RE * RG * Math.cos(a)); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), A = Q39.pol(g.cx, g.cy, g.r, LA * Math.PI / 180), B = Q39.pol(g.cx, g.cy, g.r, LB * Math.PI / 180), sp = Q39.pol(g.cx, g.cy, g.ro, S.u * Math.PI / 180);
      Q39.bg(ctx, w, h, '#0b1a3a', '#1e293b'); Q39.space(ctx, g.L + 10, 60, w - g.L - 20, h - 200, 18, 9);
      K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.setLineDash([4, 6]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.ro, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke(); ctx.setLineDash([]); ctx.strokeStyle = 'rgba(244,114,182,.55)'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.r + 34, Math.PI, TAU); ctx.stroke(); ctx.restore(); });
      Q39.globe(ctx, g.cx, g.cy, g.r, { atm: 12, rot: .4 });
      K.raw(ctx, () => { ctx.fillStyle = '#0b1a3a'; ctx.fillRect(g.L + 10, g.cy + 60, w - g.L - 20, 400); });
      Q39.T(ctx, 'الأيونوسفير', g.cx - g.r - 40, g.cy - 40, { s: 10.5, w: 900, c: '#fff', bg: 'rgba(190,24,93,.85)' });
      Q39.T(ctx, 'مدار القمر 36000 km', g.cx + g.ro * .74, g.cy - g.ro * .74 - 10, { s: 10.5, w: 900, c: '#e2e8f0' });
      [[A, 'A', LA], [B, 'B', LB]].forEach(q => { const a = q[2] * Math.PI / 180; K.raw(ctx, () => { ctx.save(); ctx.translate(q[0][0], q[0][1]); ctx.rotate(a); ctx.fillStyle = '#e5e7eb'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(0, -10, 12, 6, 0, Math.PI, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(0, 0); ctx.stroke(); ctx.restore(); }); const lp = Q39.pol(g.cx, g.cy, g.r - 22, a); Q39.T(ctx, q[1], lp[0], lp[1], { s: 12, w: 900, c: '#fff', bg: '#0f172a' }); });
      const vA = D.vis(S.u, LA), vB = D.vis(S.u, LB);
      let ok = 0;
      if (S.md === 'mw') {
        const amp = S.p.amp; Q39.ray(ctx, [A, sp], vA ? '#a855f7' : 'rgba(239,68,68,.5)', S.ph, { w: 2.5, gap: 44, dash: vA ? null : [6, 6] });
        if (vA) Q39.ray(ctx, [sp, B], vB ? (amp ? '#c084fc' : 'rgba(192,132,252,.35)') : 'rgba(239,68,68,.5)', S.ph, { w: amp ? 3.5 : 1.2, gap: 44, dash: vB ? null : [6, 6] });
        ok = vA && vB; if (ok && amp) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(253,224,71,.8)'; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { const rr2 = 16 + ((S.ph * 30 + k * 10) % 30); ctx.globalAlpha = 1 - (rr2 - 16) / 30; ctx.beginPath(); ctx.arc(sp[0], sp[1], rr2, 0, TAU); ctx.stroke(); } ctx.globalAlpha = 1; });
      } else {
        const up = [Math.sin(LA * Math.PI / 180), -Math.cos(LA * Math.PI / 180)], d = [sp[0] - A[0], sp[1] - A[1]], dl = Math.hypot(d[0], d[1]);
        // intersect ray with ionosphere circle
        const ox = A[0] - g.cx, oy = A[1] - g.cy, dx = d[0] / dl, dy = d[1] / dl, bq = ox * dx + oy * dy, cq = ox * ox + oy * oy - (g.r + 34) * (g.r + 34), t = -bq + Math.sqrt(bq * bq - cq), M = [A[0] + dx * t, A[1] + dy * t], n = Q26.nrm([M[0] - g.cx, M[1] - g.cy]), rf = Q26.refl([dx, dy], n);
        const ox2 = M[0] - g.cx, oy2 = M[1] - g.cy, b2 = ox2 * rf[0] + oy2 * rf[1], c2 = ox2 * ox2 + oy2 * oy2 - g.r * g.r, disc = b2 * b2 - c2, t2 = disc > 0 ? -b2 - Math.sqrt(disc) : 120; void up;
        Q39.ray(ctx, [A, M, [M[0] + rf[0] * t2, M[1] + rf[1] * t2]], '#22c55e', S.ph, { w: 2.5, gap: 40 });
        Q39.T(ctx, 'HF انعكست عن الأيونوسفير', M[0], M[1] - 22, { s: 11, w: 900, c: '#fff', bg: '#15803d' });
      }
      Q39.sat(ctx, sp[0], sp[1], 1.1, S.u * Math.PI / 180, S.md === 'mw' && ok);
      const t = (D.dist(S.u, LA) + D.dist(S.u, LB)) / 3e5;
      const msg = S.md === 'hf' ? 'موجات HF لا تصل إلى القمر الصناعي' : !vA ? 'القمر لا يرى المحطة A' : !vB ? 'القمر لا يرى المحطة B' : S.p.amp ? '✔ المحطة B تستقبل إشارة قوية' : 'الإشارة ضعيفة جداً بلا تقوية';
      Q39.T(ctx, msg, g.cx, g.cy + 90, { s: 12.5, w: 900, c: '#fff', bg: S.md === 'mw' && ok && S.p.amp ? '#15803d' : '#b91c1c' });
      Q39.card(ctx, S, [{ t: 'الموجات المايكروية', c: '#7e22ce', w: 900, s: 13.5 }, { t: 'ترددها أعلى من HF فتخترق الأيونوسفير.', c: '#0f172a', w: 800 }, { t: 'القمر الصناعي: يتسلم الموجات ← يقويها ← يعيد بثها إلى الأرض.', c: '#0f172a' }, { t: 'زمن وصول الإشارة من A إلى B ≈ ' + Q39.f(t, 2) + ' s', c: '#1d4ed8', w: 900 }, { t: 'الرسم ليس بمقياس رسم.', c: '#64748b', s: 11 }], { title: 'الشكل 8-b', wd: 300, y: 70 });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'اسحب القمر الصناعي على مداره، وقارن المايكروية بـ HF');
    },
    chips(S, g) { return Q39.chips(S, 'md', [['mw', 'موجات مايكروية'], ['hf', 'موجات HF']], g.h - 84, S.md, (S2, k) => { S2.md = k; }, { bw: 180 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), sp = Q39.pol(g.cx, g.cy, g.ro, S.u * Math.PI / 180);
      return [{ id: 'sat', x: sp[0], y: sp[1], r: 26, axis: 'x', keep: true, tip: 'اسحب القمر على مداره', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'lon', Math.round(clamp(Math.atan2(d.x - g.cx, g.cy - d.y) * 180 / Math.PI, -70, 70))); } }].concat(D.chips(S, g)); },
    readings(S) { const dA = D.dist(S.u, LA), dB = D.dist(S.u, LB); return [rd('بعد القمر عن A', Math.round(dA) + ' km'), rd('بعد القمر عن B', Math.round(dB) + ' km'), rd('زمن وصول الإشارة t = d / c', Q39.f((dA + dB) / 3e5, 3) + ' s'), rd('الاتصال', S.md === 'hf' ? 'لا يصل إلى القمر' : D.vis(S.u, LA) && D.vis(S.u, LB) ? 'ممكن' : 'غير ممكن')]; },
    explain(S) { return Q26.ex(S.md === 'mw' ? 'الموجات المايكروية تخترق الأيونوسفير وتصل إلى القمر ثم إلى المحطة B.' : 'موجات HF تنعكس عن الأيونوسفير ولا تصل إلى القمر.', 'القمر الصناعي يتسلم الموجات المايكروية القادمة من المحطة الأرضية ويقويها ثم يعيد بثها إلى الأرض فتصل إلى أماكن بعيدة جداً. الإشارة تقطع أكثر من 72000 km فتتأخر نحو ربع ثانية.', 'لهذا نلاحظ تأخراً بسيطاً في البث المباشر عبر الأقمار الصناعية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — المكونات الأساسية للهاتف النقال (ص 169، الشكلان 9 و 10) =============== */
(() => {
  const CP = [['board', 'دائرة إلكترونية', 'تحتوي رقائق المعالج والذاكرة: تعالج الإشارات وتخزن الأرقام والرسائل', '#15803d'], ['ant', 'الهوائي', 'يرسل ويستقبل الموجات المايكروية من برج الاتصالات', '#b45309'], ['scr', 'شاشة العرض', 'تعرض الأرقام والرسائل والصور', '#0284c7'], ['key', 'لوحة المفاتيح', 'لإدخال الأرقام والحروف', '#475569'], ['mic', 'لاقطة الصوت', 'تحول صوتك إلى إشارة كهربائية', '#7c3aed'], ['spk', 'السماعة', 'تحول الإشارة الكهربائية إلى صوت تسمعه', '#db2777'], ['bat', 'البطارية', 'مصدر الطاقة الكهربائية للهاتف', '#ca8a04']];
  const QO = [6, 1, 4, 0, 2, 5, 3];
  const D = { id: 'g9_at_phone', page: 169, fig: 'الشكلان 9 و 10',
    desc: 'يعد جهاز الهاتف النقال من الأجهزة التقنية المعقدة بسبب تكدس الدوائر الإلكترونية على مساحة صغيرة (الشكل 9)، وهو وسيلة اتصال لاسلكية. المكونات الأساسية للهاتف النقال (الشكل 10): 1- دائرة إلكترونية تحتوي رقائق المعالج والذاكرة. 2- هوائي. 3- شاشة العرض. 4- لوحة مفاتيح. 5- لاقطة الصوت. 6- السماعة. 7- البطارية.',
    tags: 'الهاتف النقال مكونات دائرة إلكترونية معالج ذاكرة هوائي شاشة العرض لوحة مفاتيح لاقطة الصوت السماعة البطارية اتصال لاسلكي الشكل 9 الشكل 10',
    tools: ['هاتف نقال', 'مفك صغير لتفكيكه'],
    steps: ['اسحب المقبض (أو المنزلق) لتفكيك الهاتف إلى أجزائه كما في الشكل 10.', 'اضغط على كل جزء لتعرف اسمه ووظيفته.', 'اضغط «اختبر نفسك» وابحث عن الجزء المطلوب.', 'شغّل «محاكاة مكالمة» لترى مسار الصوت داخل الهاتف.'],
    concl: ['الهاتف النقال وسيلة اتصال لاسلكية فيها دوائر إلكترونية كثيفة على مساحة صغيرة.', 'مكوناته الأساسية سبعة: الدائرة الإلكترونية (المعالج والذاكرة)، الهوائي، شاشة العرض، لوحة المفاتيح، لاقطة الصوت، السماعة، البطارية.'],
    laws: [],
    controls: [R('ex', 'تفكيك الهاتف', 0, 100, 0, 1, '%'), TG('call', 'محاكاة مكالمة', false, null, 'wave')],
    setup(S) { S.e = 0; S.sel = ''; S.md = 'exp'; S.qi = 0; S.sc = 0; S.fb = ''; S.fbt = 0; S.ph = 0; },
    update(S, dt) { S.ph += dt; S.e = Q39.ez(S.e, S.p.ex / 100, dt, 6); if (S.fbt > 0) S.fbt -= dt; },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), cx = (L + w - 330) / 2 + 40, cy = 340; return { w, h, L, cx, cy, kx: L + 22, ky0: 120, ky1: 520 }; },
    /* assembled offset (relative to phone centre) and exploded position */
    pos(g, i, e) { const A = [[0, 0], [30, -138], [0, -55], [0, 60], [0, 118], [0, -112], [0, 6]], a = -Math.PI / 2 + i * TAU / 7, Ex = [Math.cos(a) * 168, Math.sin(a) * 170]; return [g.cx + A[i][0] + (Ex[0] - A[i][0]) * e, g.cy + A[i][1] + (Ex[1] - A[i][1]) * e]; },
    part(ctx, i, x, y, hl) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); if (hl) { ctx.shadowColor = '#facc15'; ctx.shadowBlur = 18; } const c = CP[i][3];
      if (i === 0) { ctx.fillStyle = '#166534'; rr(ctx, -44, -60, 88, 120, 6); ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1; for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.moveTo(-40, -52 + k * 13); ctx.lineTo(40, -52 + k * 13 + (k % 2 ? 6 : -4)); ctx.stroke(); } ctx.fillStyle = '#111827'; ctx.fillRect(-18, -24, 36, 30); ctx.fillRect(-30, 20, 22, 16); ctx.fillRect(8, 20, 22, 16); ctx.fillStyle = '#9ca3af'; ctx.fillText ? 0 : 0; }
      else if (i === 1) { ctx.fillStyle = '#334155'; rr(ctx, -6, -26, 12, 52, 5); ctx.fill(); ctx.fillStyle = c; ctx.beginPath(); ctx.arc(0, -26, 6, 0, TAU); ctx.fill(); }
      else if (i === 2) { const gr = ctx.createLinearGradient(-40, -36, 40, 36); gr.addColorStop(0, '#7dd3fc'); gr.addColorStop(1, '#0369a1'); ctx.fillStyle = '#0f172a'; rr(ctx, -46, -40, 92, 80, 6); ctx.fill(); ctx.shadowBlur = 0; ctx.fillStyle = gr; ctx.fillRect(-40, -34, 80, 68); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(-40, -34); ctx.lineTo(0, -34); ctx.lineTo(-40, 10); ctx.fill(); }
      else if (i === 3) { ctx.fillStyle = '#cbd5e1'; rr(ctx, -46, -40, 92, 80, 8); ctx.fill(); ctx.shadowBlur = 0; ctx.fillStyle = '#475569'; for (let r = 0; r < 4; r++) for (let k = 0; k < 3; k++) { rr(ctx, -36 + k * 26, -33 + r * 18, 20, 13, 4); ctx.fill(); } }
      else if (i === 4) { ctx.fillStyle = '#4c1d95'; ctx.beginPath(); ctx.arc(0, 0, 11, 0, TAU); ctx.fill(); ctx.fillStyle = '#c4b5fd'; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.arc(k * 4, 0, 1.6, 0, TAU); ctx.fill(); } }
      else if (i === 5) { ctx.fillStyle = '#831843'; rr(ctx, -20, -8, 40, 16, 8); ctx.fill(); ctx.strokeStyle = '#fbcfe8'; ctx.lineWidth = 1.2; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(k * 6, -4); ctx.lineTo(k * 6, 4); ctx.stroke(); } }
      else { const gr = ctx.createLinearGradient(-40, 0, 40, 0); gr.addColorStop(0, '#854d0e'); gr.addColorStop(.5, '#facc15'); gr.addColorStop(1, '#854d0e'); ctx.fillStyle = gr; rr(ctx, -38, -50, 76, 100, 6); ctx.fill(); ctx.shadowBlur = 0; ctx.fillStyle = '#1f2937'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; ctx.fillText('3.7 V', 0, 4); ctx.fillStyle = '#d4d4d8'; ctx.fillRect(-12, -54, 24, 5); }
      ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), e = S.e; Q39.bg(ctx, w, h, '#e0e7ff', '#f8fafc');
      // phone body (fades when exploded)
      K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = 1 - e * .85; ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 18; ctx.fillStyle = '#1f2937'; rr(ctx, g.cx - 58, g.cy - 140, 116, 280, 22); ctx.fill(); ctx.restore(); });
      const order = e < .35 ? [6, 0, 1, 5, 2, 3, 4] : [0, 1, 2, 3, 4, 5, 6];
      order.forEach(i => { const p = D.pos(g, i, e), hl = S.sel === CP[i][0] || (S.md === 'quiz' && S.fb === 'ok' && S.fbt > 0 && QO[(S.qi + 6) % 7] === i); D.part(ctx, i, p[0], p[1], hl); if (e > .5) Q39.T(ctx, (i + 1) + '. ' + CP[i][1], p[0], p[1] + (i === 0 ? 76 : i === 6 ? 66 : i === 2 || i === 3 ? 56 : 32), { s: 11, w: 900, c: '#fff', bg: S.sel === CP[i][0] ? '#ca8a04' : CP[i][3] }); });
      if (S.p.call && e > .5) { const P = i => D.pos(g, i, e); Q39.ray(ctx, [P(4), P(0), P(1)], '#7c3aed', S.ph, { w: 2.5, gap: 34, sp: 90, dash: [6, 4] }); Q39.ray(ctx, [P(1), [P(1)[0] + 30, P(1)[1] - 40]], '#a855f7', S.ph, { w: 2, gap: 20 }); Q39.ray(ctx, [P(0), P(5)], '#db2777', S.ph, { w: 2.5, gap: 34, sp: 90 }); Q39.T(ctx, '🗣', P(4)[0] - 40, P(4)[1], { s: 20 }); Q39.T(ctx, '👂', P(5)[0] + 40, P(5)[1], { s: 20 }); }
      // explode slider (left, vertical)
      const t = S.p.ex / 100, ky = g.ky1 - (g.ky1 - g.ky0) * t;
      K.raw(ctx, () => { ctx.lineCap = 'round'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(g.kx, g.ky0); ctx.lineTo(g.kx, g.ky1); ctx.stroke(); ctx.strokeStyle = '#1d4ed8'; ctx.beginPath(); ctx.moveTo(g.kx, g.ky1); ctx.lineTo(g.kx, ky); ctx.stroke(); });
      Q41.knob(ctx, g.kx, ky, '#1d4ed8', 12); Q39.T(ctx, '🔧', g.kx, g.ky0 - 18, { s: 16 }); Q39.T(ctx, 'تفكيك', g.kx, g.ky1 + 18, { s: 10.5, w: 900, c: '#1d4ed8' });
      const L = [];
      if (S.md === 'quiz') { const tg = CP[QO[S.qi % 7]]; L.push({ t: 'أين ' + tg[1] + '؟', c: '#1d4ed8', w: 900, s: 15 }, { t: 'اضغط على الجزء الصحيح في الهاتف المفكك.', c: '#334155' }, { t: 'النتيجة: ' + S.sc + ' / ' + Math.min(S.qi, 7), c: '#0f172a', w: 900 }); if (S.fbt > 0) L.push({ t: S.fb === 'ok' ? '✔ أحسنت!' : '✖ حاول مرة أخرى', c: S.fb === 'ok' ? '#15803d' : '#b91c1c', w: 900, s: 14 }); if (S.qi >= 7) L.push({ t: 'انتهى الاختبار: تعرفت على المكونات السبعة.', c: '#15803d', w: 900 }); }
      else { const c = CP.find(q => q[0] === S.sel); if (c) L.push({ t: c[1], c: c[3], w: 900, s: 15 }, { t: c[2], c: '#0f172a', w: 800 }); else L.push({ t: 'فكّك الهاتف ثم اضغط على أي جزء.', c: '#334155', w: 800 }); L.push({ t: 'الهاتف النقال جهاز تقني معقد بسبب تكدس الدوائر الإلكترونية على مساحة صغيرة، وهو وسيلة اتصال لاسلكية.', c: '#475569' }); }
      Q39.card(ctx, S, L, { title: S.md === 'quiz' ? 'اختبر نفسك' : 'الشكل 10', wd: 290, y: 70 });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, e < .5 ? 'اسحب مقبض التفكيك لترى أجزاء الهاتف' : 'اضغط على أي جزء لتعرف وظيفته');
    },
    chips(S, g) { return Q39.chips(S, 'md', [['exp', 'استكشف الأجزاء'], ['quiz', 'اختبر نفسك'], ['asm', S.p.ex > 50 ? 'تجميع الهاتف' : 'تفكيك الهاتف']], g.h - 84, S.md, (S2, k) => { if (k === 'asm') { setParam(S2, 'ex', S2.p.ex > 50 ? 0 : 100); return; } S2.md = k; S2.sel = ''; if (k === 'quiz') { S2.qi = 0; S2.sc = 0; S2.fbt = 0; setParam(S2, 'ex', 100); } }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), t = S.p.ex / 100;
      const L = [{ id: 'exk', x: g.kx, y: g.ky1 - (g.ky1 - g.ky0) * t, r: 20, axis: 'y', keep: true, tip: 'اسحب لتفكيك الهاتف', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'ex', Math.round(clamp((g.ky1 - d.y) / (g.ky1 - g.ky0), 0, 1) * 100)); } }];
      if (S.e > .5) CP.forEach((c, i) => { const p = D.pos(g, i, S.e); L.push({ id: 'cp_' + c[0], x: p[0], y: p[1], w: i === 0 || i === 2 || i === 3 || i === 6 ? 90 : 46, h: i === 0 ? 120 : i === 6 ? 100 : i === 2 || i === 3 ? 80 : 50, hint: false, tip: c[1], click: S2 => { if (S2.md === 'quiz') { if (S2.qi >= 7) return; if (QO[S2.qi] === i) { S2.sc++; S2.qi++; S2.fb = 'ok'; } else S2.fb = 'no'; S2.fbt = 1.2; } else S2.sel = c[0]; } }); });
      return L.concat(D.chips(S, g)); },
    readings(S) { const c = CP.find(q => q[0] === S.sel); return S.md === 'quiz' ? [rd('السؤال', Math.min(S.qi + 1, 7) + ' / 7'), rd('الإجابات الصحيحة', S.sc)] : [rd('التفكيك', S.p.ex + ' %'), rd('الجزء المختار', c ? c[1] : '—')]; },
    explain(S) { return Q26.ex('يتكون الهاتف النقال من سبعة أجزاء أساسية.', 'عند الكلام تحول لاقطة الصوت صوتك إلى إشارة كهربائية تعالجها الدائرة الإلكترونية (المعالج والذاكرة) ثم يرسلها الهوائي موجات مايكروية إلى البرج، وعند الاستقبال يحدث العكس فتحول السماعة الإشارة إلى صوت. البطارية تزود الأجزاء بالطاقة، والشاشة ولوحة المفاتيح للعرض والإدخال.', 'الهاتف النقال وسيلة اتصال لاسلكية تعمل بالموجات المايكروية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — شبكة الهاتف النقال: الخلايا والأبراج (ص 169) =============== */
(() => {
  const SZ = 58;
  const D = { id: 'g9_at_cells', page: 169, fig: 'شبكة الهاتف النقال',
    desc: 'يعمل الهاتف النقال لاسلكياً بالموجات المايكروية (ص 169). تقسم المدينة إلى مناطق صغيرة تسمى خلايا، في وسط كل خلية برج اتصالات. يتصل الهاتف بأقرب برج، ثم تنتقل المكالمة عبر مركز التحويل إلى البرج القريب من الطرف الآخر. وعندما يتحرك المستخدم من خلية إلى أخرى تنتقل المكالمة تلقائياً إلى البرج الجديد دون أن تنقطع.',
    tags: 'شبكة الهاتف النقال خلية برج اتصالات الموجات المايكروية مركز التحويل انتقال المكالمة شدة الإشارة',
    tools: ['هاتفان نقالان', 'أبراج اتصالات في مراكز الخلايا', 'مركز التحويل'],
    steps: ['اسحب الهاتف الأحمر بين الخلايا وراقب البرج الذي يتصل به وشدة الإشارة.', 'لاحظ مسار المكالمة: هاتف ← برج ← مركز التحويل ← برج ← الهاتف الآخر.', 'اضغط «قيادة تلقائية» وعدّ مرات انتقال المكالمة بين الأبراج.'],
    concl: ['يتصل الهاتف النقال بأقرب برج بالموجات المايكروية.', 'تقسم المنطقة إلى خلايا لكل منها برج.', 'تنتقل المكالمة من برج إلى آخر عند الحركة دون أن تنقطع.'],
    laws: [],
    controls: [TG('call', 'مكالمة جارية', true, null, 'wave'), TG('cov', 'حدود الخلايا', true, null, 'grid')],
    setup(S) { S.px = .2; S.py = .3; S.tx = .2; S.ty = .3; S.ho = 0; S.cur = -1; S.ph = 0; S.drv = 0; S.dt = 0; S.flash = 0; },
    cells(g) { const C = []; const hw = Math.sqrt(3) * SZ; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const x = g.x0 + hw * (c + .5) + (r % 2 ? hw / 2 : 0), y = g.y0 + SZ + r * SZ * 1.5; if (x + hw / 2 < g.x1 + 4) C.push([x, y]); } return C; },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), x0 = L + 16, y0 = 70, x1 = w - 300; return { w, h, L, x0, y0, x1, y1: y0 + SZ * 2 + 3 * SZ * 1.5, mx: (x0 + x1) / 2, my: h - 190 }; },
    P(g, u, v) { return [g.x0 + u * (g.x1 - g.x0), g.y0 + v * (g.y1 - g.y0)]; },
    near(C, p) { let b = 0, bd = 1e9; C.forEach((c, i) => { const d = Math.hypot(c[0] - p[0], c[1] - p[1]); if (d < bd) { bd = d; b = i; } }); return [b, bd]; },
    update(S, dt) { S.ph += dt; if (S.drv) { S.dt += dt * .07; const t = S.dt % 1; S.tx = .1 + .8 * t; S.ty = .5 + .32 * Math.sin(t * TAU * 1.5); }
      S.px = Q39.ez(S.px, S.tx, dt, 10); S.py = Q39.ez(S.py, S.ty, dt, 10); if (S.flash > 0) S.flash -= dt;
      if (S.W) { const g = D.geo(S), C = D.cells(g), n = D.near(C, D.P(g, S.px, S.py))[0]; if (S.cur >= 0 && n !== S.cur) { S.ho++; S.flash = 1.2; } S.cur = n; } },
    hex(ctx, x, y, s) { ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; k ? ctx.lineTo(x + s * Math.cos(a), y + s * Math.sin(a)) : ctx.moveTo(x + s * Math.cos(a), y + s * Math.sin(a)); } ctx.closePath(); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), C = D.cells(g), pA = D.P(g, S.px, S.py), nA = D.near(C, pA), pB = C[C.length - 1].map((v, i) => v + (i ? 18 : -14)), nB = D.near(C, pB), q = clamp(1.15 - nA[1] / SZ, 0, 1);
      Q39.bg(ctx, w, h, '#ecfeff', '#f8fafc');
      K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#dcfce7'; rr(ctx, g.x0 - 6, g.y0 - 6, g.x1 - g.x0 + 12, g.y1 - g.y0 + 12, 14); ctx.fill(); ctx.fillStyle = 'rgba(148,163,184,.35)'; for (let k = 0; k < 5; k++) { ctx.fillRect(g.x0, g.y0 + 40 + k * 80, g.x1 - g.x0, 8); ctx.fillRect(g.x0 + 60 + k * 95, g.y0, 8, g.y1 - g.y0); } 
        C.forEach((c, i) => { D.hex(ctx, c[0], c[1], SZ); ctx.fillStyle = i === nA[0] ? 'rgba(59,130,246,.25)' : i === nB[0] ? 'rgba(236,72,153,.18)' : 'rgba(255,255,255,.25)'; ctx.fill(); if (S.p.cov) { ctx.strokeStyle = i === nA[0] ? '#1d4ed8' : 'rgba(30,64,175,.45)'; ctx.lineWidth = i === nA[0] ? 3 : 1.5; ctx.stroke(); } });
        // backhaul cables to the switching centre
        ctx.strokeStyle = 'rgba(71,85,105,.35)'; ctx.lineWidth = 1.2; ctx.setLineDash([3, 4]); C.forEach(c => { ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(g.mx, g.my); ctx.stroke(); }); ctx.setLineDash([]); ctx.restore(); });
      C.forEach((c, i) => Q39.tower(ctx, c[0], c[1] + 14, 30, 0, { cell: 1, blink: i === nA[0] ? Math.sin(S.ph * 8) > 0 : false }));
      // switching centre
      K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, g.mx - 60, g.my - 18, 120, 36, 8); ctx.fill(); });
      Q39.T(ctx, 'مركز التحويل', g.mx, g.my, { s: 11.5, w: 900, c: '#fff' });
      if (S.p.call) { const tA = [C[nA[0]][0], C[nA[0]][1] - 18], tB = [C[nB[0]][0], C[nB[0]][1] - 18];
        if (q > .02) Q39.ray(ctx, [pA, tA], '#2563eb', S.ph, { w: 2.5, gap: 22, sp: 70, dash: [5, 4] });
        Q39.ray(ctx, [tA, [C[nA[0]][0], C[nA[0]][1] + 14], [g.mx, g.my], [C[nB[0]][0], C[nB[0]][1] + 14], tB], '#64748b', S.ph, { w: 2, gap: 40, sp: 120, glow: 0 });
        Q39.ray(ctx, [tB, pB], '#db2777', S.ph, { w: 2.5, gap: 22, sp: 70, dash: [5, 4] }); }
      Q39.phone(ctx, pB[0], pB[1], 1.1, '#9d174d', S.p.call); Q39.T(ctx, 'صديقك', pB[0], pB[1] + 26, { s: 10.5, w: 900, c: '#fff', bg: '#9d174d' });
      Q39.phone(ctx, pA[0], pA[1], 1.3, '#b91c1c', S.p.call && q > .02); Q39.bars(ctx, pA[0] + 16, pA[1] - 14, q);
      if (S.flash > 0) Q39.T(ctx, 'انتقلت المكالمة إلى برج جديد', pA[0], pA[1] - 40, { s: 11, w: 900, c: '#fff', bg: '#15803d' });
      Q39.card(ctx, S, [{ t: 'البرج المتصل: ' + (nA[0] + 1), c: '#1d4ed8', w: 900, s: 14 }, { t: 'شدة الإشارة: ' + Math.round(q * 100) + ' %', c: q > .4 ? '#15803d' : '#b91c1c', w: 900 }, { t: 'مرات انتقال المكالمة: ' + S.ho, c: '#0f172a', w: 800 }, { t: 'يتصل الهاتف بأقرب برج بالموجات المايكروية، والأبراج مربوطة بمركز التحويل.', c: '#334155' }], { title: 'شبكة الخلايا', wd: 270, y: 70 });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'اسحب الهاتف الأحمر بين الخلايا وراقب البرج والإشارة');
    },
    chips(S, g) { return Q39.chips(S, 'dv', [['drv', S.drv ? '⏸ إيقاف القيادة' : '🚗 قيادة تلقائية'], ['rs', '↺ تصفير العداد']], g.h - 84, S.drv ? 'drv' : '', (S2, k) => { if (k === 'drv') S2.drv = S2.drv ? 0 : 1; else S2.ho = 0; }, { bw: 190 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), p = D.P(g, S.px, S.py);
      return [{ id: 'ph', x: p[0], y: p[1], r: 24, axis: 'xy', keep: true, tip: 'اسحب الهاتف', idle: 'اسحب ✋', drag: (S2, d) => { S2.drv = 0; S2.tx = clamp((d.x - g.x0) / (g.x1 - g.x0), 0, 1); S2.ty = clamp((d.y - g.y0) / (g.y1 - g.y0), 0, 1); } }].concat(D.chips(S, g)); },
    readings(S) { if (!S.W) return []; const g = D.geo(S), C = D.cells(g), n = D.near(C, D.P(g, S.px, S.py)); return [rd('البرج المتصل', n[0] + 1), rd('شدة الإشارة', Math.round(clamp(1.15 - n[1] / SZ, 0, 1) * 100) + ' %'), rd('مرات انتقال المكالمة', S.ho)]; },
    explain(S) { return Q26.ex('الهاتف يتصل دائماً بأقرب برج، وتنتقل المكالمة إلى برج جديد عند عبور حدود الخلية.', 'الهاتف النقال يرسل ويستقبل موجات مايكروية مع برج الخلية، والأبراج مربوطة بمركز تحويل يوصل المكالمة إلى برج الطرف الآخر. كلما ابتعدت عن البرج ضعفت الإشارة.', 'لهذا تنتشر أبراج الاتصالات في كل مكان من المدينة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — الأقمار الصناعية: المدارات واستعمالاتها (ص 170، الأشكال 11–13) =============== */
(() => {
  const RE = 6371, GM = 398600, TYP = [['mil', 'عسكري', 500, '#dc2626'], ['sci', 'علمي GPS', 20200, '#16a34a'], ['com', 'اتصالات', 36000, '#2563eb']];
  const Tp = alt => 2 * Math.PI * Math.sqrt(Math.pow(RE + alt, 3) / GM) / 3600, Vs = alt => Math.sqrt(GM / (RE + alt));
  const D = { id: 'g9_at_orbits', page: 170, fig: 'الأشكال 11 و 12 و 13',
    desc: 'القمر الصناعي تابع يدور حول الأرض يحمل أجهزة ومعدات إلكترونية تستعمل في الاتصالات والأغراض العلمية (الشكل 11). من استعمالاتها: 1- أقمار صناعية للاتصالات: مخصصة لأغراض الاتصالات الهاتفية والقنوات الفضائية التلفازية ونقل المعلومات، وتكون على ارتفاعات عالية جداً بحدود 36000 km عن سطح الأرض وهي أعلى من بقية الأقمار (الشكل 12). 2- أقمار صناعية علمية: الغاية منها مراقبة الطقس والأنواء الجوية والنشاط الشمسي وأقمار منظومة تحديد المواقع العالمية GPS وتكون على ارتفاعات متوسطة (الشكل 13). 3- أقمار صناعية للأغراض العسكرية: تدور في مدارات خاصة وبارتفاعات واطئة نسبياً لمسح وتصوير المواقع.',
    tags: 'الأقمار الصناعية مدار أقمار الاتصالات 36000 km أقمار علمية الطقس GPS ارتفاعات متوسطة أقمار عسكرية ارتفاعات واطئة زمن الدورة ثابت فوق نقطة الشكل 11 الشكل 12 الشكل 13',
    tools: ['كرة أرضية تدور', 'أقمار صناعية على مدارات مختلفة'],
    steps: ['اسحب القمر الأصفر مبتعداً عن الأرض أو مقترباً منها، وراقب زمن دورته وسرعته.', 'اختر نوع القمر من الأزرار: عسكري (واطئ)، علمي (متوسط)، اتصالات (36000 km).', 'لاحظ قمر الاتصالات: يبقى فوق مدينة بغداد دائماً لأن زمن دورته 24 ساعة.', 'اضغط «الحل خطوة خطوة» لحساب زمن دورة قمر الاتصالات.'],
    concl: ['أقمار الاتصالات على ارتفاع 36000 km تقريباً وهي أعلى الأقمار، وزمن دورتها 24 h فتبقى فوق النقطة نفسها.', 'الأقمار العلمية (الطقس و GPS) على ارتفاعات متوسطة.', 'الأقمار العسكرية على ارتفاعات واطئة نسبياً وتدور بسرعة كبيرة.', 'كلما زاد ارتفاع القمر زاد زمن دورته وقلت سرعته.'],
    laws: ['g9_l9_orbit'],
    controls: [R('alt', 'ارتفاع القمر', 300, 40000, 36000, 100, 'km'), TG('ref', 'الأقمار الثلاثة للمقارنة', true, null, 'orbit')],
    setup(S) { S.hr = 0; S.ra = 36000; S.th = 0; S.k = 0; S.ex = 0; S.th3 = [0, 1, 2]; },
    update(S, dt) { const dh = dt * 2; S.hr += dh; S.ra = Q39.ez(S.ra, S.p.alt, dt, 5); S.th += TAU * dh / Tp(S.ra); S.th3 = S.th3.map((a, i) => a + TAU * dh / Tp(TYP[i][2])); },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), cx = (L + w - 330) / 2 + 5, cy = 335; return { w, h, L, cx, cy, re: 52 }; },
    rp(g, alt) { return g.re + 160 * Math.sqrt(alt / 36000); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), er = S.hr / 24 * TAU; Q39.bg(ctx, w, h, '#0b1a3a', '#1e293b'); Q39.space(ctx, g.L + 10, 60, w - g.L - 20, h - 200, 18, 4);
      if (S.p.ref) TYP.forEach((q, i) => { const r = D.rp(g, q[2]); K.raw(ctx, () => { ctx.strokeStyle = q[3]; ctx.globalAlpha = .55; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.cx, g.cy, r, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; }); const p = Q39.pol(g.cx, g.cy, r, S.th3[i]); Q39.sat(ctx, p[0], p[1], .5, S.th3[i]); const lp = Q39.pol(g.cx, g.cy, r, [3.0, -2.3, 2.45][i]); Q39.T(ctx, q[1], lp[0], lp[1], { s: 10, w: 900, c: '#fff', bg: q[3] }); });
      Q39.globe(ctx, g.cx, g.cy, g.re, { atm: 6, rot: er });
      const cityP = Q39.pol(g.cx, g.cy, g.re, er); K.raw(ctx, () => { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(cityP[0], cityP[1], 4, 0, TAU); ctx.fill(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1; ctx.stroke(); });
      Q39.T(ctx, 'بغداد', cityP[0] + (cityP[0] - g.cx) * .35, cityP[1] + (cityP[1] - g.cy) * .35, { s: 9.5, w: 900, c: '#fde047' });
      // main satellite
      const r = D.rp(g, S.ra), sp = Q39.pol(g.cx, g.cy, r, S.th), T = Tp(S.ra), sync = Math.abs(T - 23.93) < .5;
      K.raw(ctx, () => { ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.cx, g.cy, r, 0, TAU); ctx.stroke(); });
      if (sync) Q41.line(ctx, [cityP, sp], 'rgba(250,204,21,.7)', 1.5, [4, 4]);
      Q39.sat(ctx, sp[0], sp[1], 1, S.th, true);
      const ty = S.ra >= 30000 ? 2 : S.ra >= 2000 ? 1 : 0, tn = TYP[ty];
      Q39.T(ctx, Math.round(S.ra) + ' km', sp[0], sp[1] - 26, { s: 10.5, w: 900, c: '#0f172a', bg: '#fde047' });
      Q39.T(ctx, sync ? '✔ ثابت فوق بغداد: يدور مع الأرض' : 'الأرض تدور والقمر يسبقها أو يتأخر عنها', g.cx, h - 168, { s: 11.5, w: 900, c: '#fff', bg: sync ? '#15803d' : '#475569' });
      if (S.ex) Q39.steps(ctx, S, { title: 'زمن دورة قمر الاتصالات', q: 'قمر اتصالات على ارتفاع 36000 km. احسب زمن دورته.', lines: ['r = 6371 + 36000 = 42371 km', 'T = 2π √(r³ / GM)', 'T = 2π √(42371³ / 398600)', 'T ≈ 86800 s ≈ 24 h', 'زمن دورته يساوي زمن دوران الأرض فيبقى فوق النقطة نفسها'], k: S.k }, { y: 70, wd: 300 });
      else Q39.card(ctx, S, [{ t: 'قمر ' + tn[1], c: tn[3], w: 900, s: 14 }, { t: ['ارتفاعات واطئة نسبياً، مدارات خاصة: مسح وتصوير المواقع.', 'ارتفاعات متوسطة: مراقبة الطقس والأنواء الجوية والنشاط الشمسي و GPS.', 'نحو 36000 km وهي أعلى الأقمار: الاتصالات الهاتفية والقنوات التلفازية ونقل المعلومات.'][ty], c: '#0f172a', w: 800 }, { t: 'زمن الدورة T ≈ ' + Q39.f(T, 1) + ' h', c: '#1d4ed8', w: 900 }, { t: 'السرعة v ≈ ' + Q39.f(Vs(S.ra), 2) + ' km/s', c: '#1d4ed8', w: 900 }, { t: 'الرسم ليس بمقياس رسم.', c: '#64748b', s: 11 }], { title: 'القمر الأصفر', wd: 300, y: 70 });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'اسحب القمر الأصفر لتغيير ارتفاعه، أو اختر نوعه');
    },
    chips(S, g) { return Q39.chips(S, 'ty', TYP.map(q => [String(q[2]), q[1]]), g.h - 84, String(S.p.alt), (S2, k) => { setParam(S2, 'alt', +k); }, { bw: 150 }).concat(Q39.stepChips(S, 'st', g.h - 128, null, 'الحل خطوة خطوة', S2 => { setParam(S2, 'alt', 36000); }, 5)); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), sp = Q39.pol(g.cx, g.cy, D.rp(g, S.ra), S.th);
      return [{ id: 'sat', x: sp[0], y: sp[1], r: 24, axis: 'xy', keep: true, tip: 'اسحب لتغيير ارتفاع القمر', idle: 'اسحب ✋', drag: (S2, d) => { const rr2 = Math.hypot(d.x - g.cx, d.y - g.cy), a = Math.pow(clamp((rr2 - g.re) / 160, 0, 1.06), 2) * 36000; setParam(S2, 'alt', Math.round(clamp(a, 300, 40000) / 100) * 100); } }].concat(D.chips(S, g)); },
    readings(S) { const T = Tp(S.ra); return [rd('ارتفاع القمر', Math.round(S.ra) + ' km'), rd('زمن الدورة', Q39.f(T, 2) + ' h'), rd('السرعة', Q39.f(Vs(S.ra), 2) + ' km/s'), rd('نوعه حسب الارتفاع', TYP[S.ra >= 30000 ? 2 : S.ra >= 2000 ? 1 : 0][1])]; },
    record(S) { return { h: Math.round(S.ra), T: +Tp(S.ra).toFixed(2) }; },
    cols: [['h', 'الارتفاع (km)'], ['T', 'زمن الدورة (h)']],
    graph: { x: 'h', y: 'T', xl: 'الارتفاع (km)', yl: 'زمن الدورة (h)' },
    explain(S) { return Q26.ex('على ارتفاع ' + Math.round(S.ra) + ' km يكمل القمر دورته في ' + Q39.f(Tp(S.ra), 1) + ' ساعة.', 'كلما ارتفع القمر الصناعي عن الأرض قلت سرعته وطال زمن دورته. على ارتفاع 36000 km تقريباً يصبح زمن الدورة 24 ساعة مثل دوران الأرض فيبقى القمر ثابتاً فوق المكان نفسه، لذا تستعمل هذه الارتفاعات لأقمار الاتصالات.', 'نوجه صحن الاستقبال إلى اتجاه ثابت في السماء لأن قمر القنوات الفضائية ثابت بالنسبة لنا.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — ثلاثة أقمار اتصالات تغطي الأرض (ص 170، الشكلان 11 و 12) =============== */
(() => {
  const RAT = (6371 + 36000) / 6371, HALF = Math.acos(1 / RAT), COL = ['#f59e0b', '#22c55e', '#ec4899'];
  const D = { id: 'g9_at_geo3', page: 170, fig: 'الشكلان 11 و 12',
    desc: 'أقمار الاتصالات تكون على ارتفاعات عالية جداً بحدود 36000 km عن سطح الأرض (الشكل 12)، ومن هذا الارتفاع يرى القمر الواحد نحو ثلث سطح الأرض، لذا تكفي ثلاثة أقمار موزعة على المدار لتغطي معظم سطح الأرض كما في الشكل 11 (المثلث الذي رؤوسه الأقمار الثلاثة).',
    tags: 'أقمار الاتصالات تغطية الأرض ثلاثة أقمار 36000 km المدار الثابت الشكل 11 الشكل 12 اتصالات هاتفية قنوات فضائية',
    tools: ['ثلاثة أقمار اتصالات', 'مدار على ارتفاع 36000 km'],
    steps: ['اسحب كل قمر على المدار ولاحظ الجزء الذي يغطيه من سطح الأرض (القوس الملون).', 'اختر عدد الأقمار 1 أو 2 أو 3: كم نسبة التغطية؟', 'اضغط «توزيع منتظم» لترى المثلث كما في الشكل 11.'],
    concl: ['القمر الواحد على ارتفاع 36000 km يغطي نحو ثلث محيط الأرض.', 'ثلاثة أقمار اتصالات موزعة بانتظام تغطي سطح الأرض تقريباً.', 'لهذا ترتفع أقمار الاتصالات كثيراً عن سطح الأرض.'],
    laws: ['g9_l9_orbit'],
    controls: [TG('cone', 'خطوط الرؤية', true, null, 'eye')],
    setup(S) { S.n = 3; S.a = [0, 2.2, 4.1]; S.at = [0, 2.2, 4.1]; S.cov = 0; },
    update(S, dt) { S.a = S.a.map((a, i) => { let d = S.at[i] - a; d = Math.atan2(Math.sin(d), Math.cos(d)); return a + d * Math.min(1, dt * 10); }); let c = 0; for (let k = 0; k < 360; k++) { const t = k * TAU / 360; if (S.a.slice(0, S.n).some(a => Math.cos(t - a) >= Math.cos(HALF))) c++; } S.cov = c / 3.6; },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), cx = (L + w - 320) / 2 + 20, cy = 340, ro = 228; return { w, h, L, cx, cy, ro, re: ro / RAT }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q39.bg(ctx, w, h, '#0b1a3a', '#1e293b'); Q39.space(ctx, g.L + 10, 60, w - g.L - 20, h - 200, 18, 6);
      K.raw(ctx, () => { ctx.strokeStyle = 'rgba(203,213,225,.5)'; ctx.setLineDash([4, 6]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.ro, 0, TAU); ctx.stroke(); ctx.setLineDash([]); });
      const P = S.a.slice(0, S.n).map(a => Q39.pol(g.cx, g.cy, g.ro, a));
      if (S.n === 3) Q41.line(ctx, [P[0], P[1], P[2], P[0]], 'rgba(250,204,21,.85)', 2.5);
      if (S.p.cone) P.forEach((p, i) => { const a = S.a[i]; [a - HALF, a + HALF].forEach(b => Q41.line(ctx, [p, Q39.pol(g.cx, g.cy, g.re, b)], COL[i], 1.5, [5, 4])); });
      // coverage band around the earth
      K.raw(ctx, () => { ctx.save(); ctx.lineWidth = 9; ctx.strokeStyle = 'rgba(239,68,68,.75)'; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.re + 10, 0, TAU); ctx.stroke(); S.a.slice(0, S.n).forEach((a, i) => { ctx.strokeStyle = COL[i]; ctx.lineWidth = 9 - i * 2; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.re + 10 + i * 0, a - HALF - Math.PI / 2, a + HALF - Math.PI / 2); ctx.stroke(); }); ctx.restore(); });
      Q39.globe(ctx, g.cx, g.cy, g.re, { atm: 4 });
      P.forEach((p, i) => { Q39.sat(ctx, p[0], p[1], .8, S.a[i]); Q39.T(ctx, String(i + 1), p[0], p[1] - 24, { s: 11, w: 900, c: '#0f172a', bg: COL[i] }); });
      Q39.T(ctx, 'التغطية ' + Math.round(S.cov) + ' %', g.cx, g.cy + g.ro + 30 > h - 160 ? h - 168 : g.cy + g.ro + 30, { s: 13, w: 900, c: '#fff', bg: S.cov > 99 ? '#15803d' : '#b91c1c' });
      Q39.card(ctx, S, [{ t: 'كل قمر على ارتفاع 36000 km يرى قوساً من سطح الأرض زاويته نحو 163°', c: '#0f172a', w: 800 }, { t: 'القوس الأحمر: منطقة بلا تغطية.', c: '#b91c1c', w: 800 }, { t: 'ثلاثة أقمار موزعة بانتظام بزاوية 120° بينها تغطي الأرض كلها تقريباً، كما في الشكل 11.', c: '#15803d', w: 800 }, { t: 'الرسم بمقياس رسم صحيح.', c: '#64748b', s: 11 }], { title: 'تغطية أقمار الاتصالات', wd: 290, y: 70 });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'اسحب الأقمار على المدار وراقب التغطية');
    },
    chips(S, g) { return Q39.chips(S, 'n', [['1', 'قمر واحد'], ['2', 'قمران'], ['3', 'ثلاثة أقمار'], ['eq', 'توزيع منتظم']], g.h - 84, String(S.n), (S2, k) => { if (k === 'eq') { S2.at = [S2.at[0], S2.at[0] + TAU / 3, S2.at[0] + 2 * TAU / 3]; S2.n = 3; S2.eq = (S2.eq || 0) + 1; } else S2.n = +k; S2.nn = S2.n; }, { bw: 150 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      return S.a.slice(0, S.n).map((a, i) => { const p = Q39.pol(g.cx, g.cy, g.ro, a); return { id: 's' + i, x: p[0], y: p[1], r: 24, axis: 'xy', keep: true, tip: 'اسحب القمر على مداره', idle: 'اسحب ✋', hint: i ? false : undefined, drag: (S2, d) => { const A = S2.at.slice(); A[i] = Math.atan2(d.x - g.cx, g.cy - d.y); S2.at = A; S2.ang = +A[i].toFixed(3); } }; }).concat(D.chips(S, g)); },
    readings(S) { return [rd('عدد الأقمار', S.n), rd('نسبة تغطية محيط الأرض', Math.round(S.cov) + ' %'), rd('ما يراه القمر الواحد', '≈ ' + Math.round(2 * HALF * 180 / Math.PI) + '°')]; },
    explain(S) { return Q26.ex('التغطية ' + Math.round(S.cov) + ' % من محيط الأرض.', 'من ارتفاع 36000 km يرى قمر الاتصالات قوساً من سطح الأرض زاويته نحو 163° أي قرابة نصف المحيط مع الأطراف، فإذا وزعنا ثلاثة أقمار بزاوية 120° بينها تتداخل مناطقها وتغطي الأرض كلها تقريباً.', 'بفضل أقمار الاتصالات نشاهد البث المباشر من أي مكان في العالم.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — س2: صحّح العبارات (ص 172) =============== */
(() => {
  const ST = [['يتألف الغلاف الجوي من خليط من غازات جميعها متغير النسب.', 0, 'بعضها بنسب ثابتة مثل مكونات الهواء الجاف.'], ['الغلاف الجوي للأرض كتلة متجانسة ومن طبقات بعضها فوق بعض.', 0, 'الغلاف الجوي كتلة غير متجانسة.'], ['في التروبوسفير يزداد الضغط والكثافة ودرجة الحرارة مع الارتفاع.', 0, 'تتناقص الضغط والكثافة ودرجة الحرارة مع الارتفاع.'], ['تمتاز الستراتوسفير باحتوائها على إلكترونات حرة وأيونات.', 0, 'تمتاز الستراتوسفير باحتوائها على طبقة الأوزون؛ الأيونات في الثرموسفير.'], ['بتأثير الأشعة فوق البنفسجية نوع A و B في الأوكسجين يتولد الأوزون.', 1, 'عبارة صحيحة.'], ['طبقة الستراتوسفير توجد في منتصف الغلاف الجوي.', 0, 'الميزوسفير هي التي توجد في منتصف الغلاف الجوي.'], ['تمتاز طبقة الثرموسفير بقابليتها في عكس الموجات الراديوية.', 1, 'عبارة صحيحة: الأيونوسفير.'], ['يطلق أحياناً على الموجات الراديوية السطحية بالموجات السماوية.', 0, 'يطلق عليها الموجات الأرضية.'], ['ارتفاعات الأقمار الصناعية للاتصالات عالية جداً عن سطح الأرض.', 1, 'عبارة صحيحة: نحو 36000 km.']];
  const D = { id: 'g9_at_fix', page: 172, fig: 'أسئلة الفصل — س2',
    desc: 'س2: صحح العبارات الآتية إذا كانت خاطئة دون تغيير ما تحته خط. لكل عبارة اختر ✔ إذا كانت صحيحة أو ✘ إذا كانت خاطئة، ثم اضغط «تحقق» لترى التصحيح.',
    tags: 'أسئلة الفصل التاسع صحح العبارات الغلاف الجوي التروبوسفير الستراتوسفير الأوزون الثرموسفير الموجات السطحية الأقمار الصناعية',
    tools: ['بطاقات العبارات'],
    steps: ['اقرأ كل عبارة واضغط ✔ (صحيحة) أو ✘ (خاطئة).', 'اضغط «تحقق»: الإجابة الصحيحة خضراء والخاطئة حمراء مع التصحيح.', 'ارجع إلى التجارب السابقة لتتأكد من كل عبارة.'],
    concl: ['العبارات الصحيحة: 5 و 7 و 9.', 'العبارات الخاطئة: 1 و 2 و 3 و 4 و 6 و 8.'],
    laws: [],
    controls: [],
    setup(S) { S.ans = ST.map(() => -1); S.chk = 0; S.sc = 0; S.ak = ''; },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), x0 = L + 10, x1 = w - 14, y0 = 62, rh = Math.min(56, (h - 230 - y0) / ST.length); return { w, h, L, x0, x1, y0, rh }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q39.bg(ctx, w, h, '#eef2ff', '#f8fafc');
      ST.forEach((q, i) => { const y = g.y0 + i * g.rh, a = S.ans[i], good = S.chk && a === q[1], bad = S.chk && a !== q[1];
        K.raw(ctx, () => { ctx.fillStyle = good ? '#dcfce7' : bad ? '#fee2e2' : '#fff'; ctx.strokeStyle = good ? '#16a34a' : bad ? '#dc2626' : '#c7d2fe'; ctx.lineWidth = 1.5; rr(ctx, g.x0, y + 3, g.x1 - g.x0, g.rh - 6, 10); ctx.fill(); ctx.stroke(); });
        Q39.T(ctx, (i + 1) + '. ' + q[0], g.x1 - 12, y + (S.chk ? g.rh * .34 : g.rh / 2), { s: 12.5, w: 800, c: '#0f172a', a: 'right' });
        if (S.chk) Q39.T(ctx, (q[1] ? '✔ ' : '✘ ') + q[2], g.x1 - 12, y + g.rh * .7, { s: 11, w: 800, c: q[1] ? '#15803d' : '#b91c1c', a: 'right' });
        [[1, '✔', '#16a34a'], [0, '✘', '#dc2626']].forEach((b, j) => { const bx = g.x0 + 28 + j * 50, on = a === b[0]; K.raw(ctx, () => { ctx.fillStyle = on ? b[2] : '#f1f5f9'; ctx.strokeStyle = b[2]; ctx.lineWidth = 2; rr(ctx, bx - 20, y + g.rh / 2 - 15, 40, 30, 8); ctx.fill(); ctx.stroke(); }); Q39.T(ctx, b[1], bx, y + g.rh / 2, { s: 16, w: 900, c: on ? '#fff' : b[2] }); }); });
      if (S.chk) Q39.T(ctx, 'النتيجة: ' + S.sc + ' من ' + ST.length, (g.x0 + g.x1) / 2, g.y0 + ST.length * g.rh + 18, { s: 13.5, w: 900, c: '#fff', bg: S.sc === ST.length ? '#15803d' : '#1d4ed8' });
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, 'س2: اختر ✔ أو ✘ لكل عبارة ثم اضغط «تحقق»');
    },
    chips(S, g) { return Q39.chips(S, 'ck', [['chk', '✔ تحقق'], ['sol', 'إظهار الحل'], ['rs', '↺ إعادة']], g.h - 84, S.chk ? 'chk' : '', (S2, k) => { if (k === 'rs') { D.setup(S2); return; } if (k === 'sol') S2.ans = ST.map(q => q[1]); S2.chk = 1; S2.sc = ST.filter((q, i) => S2.ans[i] === q[1]).length; S2.ak = S2.ans.join(''); }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = []; ST.forEach((q, i) => { const y = g.y0 + i * g.rh + g.rh / 2; [1, 0].forEach((v, j) => L.push({ id: 'a' + i + '_' + v, x: g.x0 + 28 + j * 50, y, w: 42, h: 32, hint: i || j ? false : undefined, idle: 'اضغط ✋', tip: v ? 'صحيحة' : 'خاطئة', click: S2 => { const A = S2.ans.slice(); A[i] = v; S2.ans = A; S2.chk = 0; S2.ak = A.join(''); } })); }); return L.concat(D.chips(S, g)); },
    readings(S) { return [rd('أجبت عن', S.ans.filter(a => a >= 0).length + ' من ' + ST.length), rd('النتيجة', S.chk ? S.sc + ' / ' + ST.length : '—')]; },
    explain(S) { return Q26.ex('العبارات الصحيحة هي 5 و 7 و 9.', 'الغلاف الجوي غير متجانس وبعض غازاته بنسب ثابتة، وفي التروبوسفير يتناقص الضغط والكثافة والحرارة مع الارتفاع، والأوزون في الستراتوسفير، والميزوسفير في منتصف الغلاف الجوي، والأيونات والإلكترونات الحرة في الثرموسفير التي تعكس موجات الراديو، والموجات السطحية هي الأرضية.', ''); }
  };
  M8.P[D.id] = D;
})();

/* =============== F2 — س4 و س5: رتّب الطبقات وصِل كل طبقة بميزتها (ص 172) =============== */
(() => {
  const SH = [3, 0, 4, 2, 1], FT = ['تحدث فيها الظواهر المناخية وتهبط حرارتها 6.5 °C لكل km', 'تحتوي طبقة الأوزون وتزداد حرارتها مع الارتفاع', 'في منتصف الغلاف الجوي، أبرد طبقة تصل −120 °C', 'تحتوي إلكترونات حرة وأيونات وتعكس موجات الراديو', 'أعلى طبقة، جزيئاتها تفلت من جذب الأرض'], FO = [2, 4, 0, 3, 1];
  const D = { id: 'g9_at_order', page: 172, fig: 'أسئلة الفصل — س4 و س5',
    desc: 'س4: اذكر طبقات الغلاف الجوي الرئيسة (رتبها من سطح الأرض إلى الأعلى). س5: اذكر ميزات الطبقات الجوية: التروبوسفير، الستراتوسفير، الميزوسفير (وأكملنا الثرموسفير والإكسوسفير).',
    tags: 'أسئلة الفصل ترتيب طبقات الغلاف الجوي ميزات الطبقات التروبوسفير الستراتوسفير الميزوسفير الثرموسفير الإكسوسفير',
    tools: ['بطاقات أسماء الطبقات', 'بطاقات الميزات'],
    steps: ['«رتّب الطبقات»: اضغط أسماء الطبقات بالترتيب من سطح الأرض إلى الأعلى.', '«ميزات الطبقات»: اضغط ميزة ثم اضغط اسم الطبقة التي تناسبها.', 'الإجابة الصحيحة تثبت باللون الأخضر، والخاطئة تومض بالأحمر.'],
    concl: ['الترتيب من الأسفل: التروبوسفير، الستراتوسفير، الميزوسفير، الثرموسفير، الإكسوسفير.', 'لكل طبقة ميزة تحددها حرارتها وغازاتها وضغطها.'],
    laws: [],
    controls: [],
    setup(S) { S.md = 'ord'; S.k = 0; S.bad = -1; S.bt = 0; S.sel = -1; S.ok = [0, 0, 0, 0, 0]; S.ok2 = ''; },
    update(S, dt) { if (S.bt > 0) S.bt -= dt; },
    geo(S) { const w = S.W, h = S.H, L = Q39.L(S), x0 = L + 30, x1 = w - 20, y0 = 90, y1 = h - 200; return { w, h, L, x0, x1, y0, y1, sh: (y1 - y0) / 5 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q39.bg(ctx, w, h, '#eef2ff', '#f8fafc');
      if (S.md === 'ord') {
        const cw = 260; for (let i = 0; i < 5; i++) { const y = g.y1 - (i + 1) * g.sh, f = i < S.k, q = Q39.LAY[i]; K.raw(ctx, () => { ctx.fillStyle = f ? q[5] : '#fff'; ctx.strokeStyle = f ? shade(q[5], -30) : '#94a3b8'; ctx.lineWidth = 2; ctx.setLineDash(f ? [] : [6, 4]); rr(ctx, g.x0, y + 3, cw, g.sh - 6, 8); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); }); Q39.T(ctx, f ? (i + 1) + '. ' + q[1] : '؟', g.x0 + cw / 2, y + g.sh / 2, { s: 14, w: 900, c: f && i >= 2 ? '#fff' : '#0f172a' }); }
        K.raw(ctx, () => { ctx.fillStyle = '#16a34a'; ctx.fillRect(g.x0 - 6, g.y1, 272, 10); }); Q39.T(ctx, 'سطح الأرض', g.x0 + cw / 2, g.y1 + 24, { s: 11, w: 900, c: '#166534' });
        D.btns(S, g).forEach(b => { const i = b._i, used = i < S.k, bad = S.bad === i && S.bt > 0; Q33.drawBtn(ctx, b, Q39.LAY[i][1], bad ? '#dc2626' : used ? '#16a34a' : '#1d4ed8', used || bad); });
        if (S.k >= 5) Q39.T(ctx, '✔ أحسنت! هذا هو ترتيب الطبقات الخمس', (g.x0 + g.x1) / 2 + 100, g.y0 - 16, { s: 13, w: 900, c: '#fff', bg: '#15803d' });
      } else {
        const fx1 = g.x1, fw = 380, lx = g.x0 + 90;
        D.fbtns(S, g).forEach((b, j) => { const i = b._i, done = S.ok[i], on = S.sel === i; K.raw(ctx, () => { ctx.fillStyle = done ? '#dcfce7' : on ? '#fef3c7' : '#fff'; ctx.strokeStyle = done ? '#16a34a' : on ? '#f59e0b' : '#a5b4fc'; ctx.lineWidth = 2; rr(ctx, b.x - b.w / 2, b.y - b.h / 2, b.w, b.h, 10); ctx.fill(); ctx.stroke(); }); Q39.T(ctx, FT[i], fx1 - 12, b.y, { s: 11.5, w: 800, c: '#0f172a', a: 'right' }); void j; });
        D.lbtns(S, g).forEach(b => { const i = b._i, bad = S.bad === i && S.bt > 0, done = S.ok[i]; Q33.drawBtn(ctx, b, Q39.LAY[i][1], bad ? '#dc2626' : done ? '#16a34a' : '#1d4ed8', bad || done); if (done) { const f = D.fbtns(S, g).find(q => q._i === i); Q41.line(ctx, [[b.x + b.w / 2, b.y], [f.x - f.w / 2, f.y]], '#16a34a', 2.5); } });
        void fw; void lx;
        if (S.ok.every(Boolean)) Q39.T(ctx, '✔ أحسنت! وصلت كل طبقة بميزتها', (g.x0 + g.x1) / 2, g.y1 + 20, { s: 13, w: 900, c: '#fff', bg: '#15803d' });
      }
      Q39.drawChips(ctx, D.chips(S, g)); Q39.banner(ctx, w, S.md === 'ord' ? 'س4: اضغط الطبقات بالترتيب من سطح الأرض إلى الأعلى' : 'س5: اضغط ميزة ثم اضغط الطبقة المناسبة');
    },
    btns(S, g) { return SH.map((i, j) => { const b = Q42.btn('o' + i, { x: g.x1 - 130, y: g.y0 + 30 + j * 66, w: 220, h: 46 }, S2 => { if (S2.k >= 5) return; if (i === S2.k) { S2.k++; } else { S2.bad = i; S2.bt = .8; } }, { tip: Q39.LAY[i][1], hint: j ? false : undefined }); b._i = i; return b; }); },
    fbtns(S, g) { return FO.map((i, j) => { const b = Q42.btn('f' + i, { x: g.x1 - 200, y: g.y0 + 30 + j * 70, w: 400, h: 54 }, S2 => { if (!S2.ok[i]) S2.sel = i; }, { tip: 'اختر الميزة', hint: j ? false : undefined }); b._i = i; return b; }); },
    lbtns(S, g) { return [0, 1, 2, 3, 4].map(i => { const b = Q42.btn('l' + i, { x: g.x0 + 90, y: g.y0 + 30 + i * 70, w: 170, h: 44 }, S2 => { if (S2.sel < 0) return; if (S2.sel === i) { const O = S2.ok.slice(); O[i] = 1; S2.ok = O; S2.ok2 = O.join(''); S2.sel = -1; } else { S2.bad = i; S2.bt = .8; } }, { tip: Q39.LAY[i][1], hint: false }); b._i = i; return b; }); },
    chips(S, g) { return Q39.chips(S, 'md', [['ord', 'س4: رتّب الطبقات'], ['feat', 'س5: ميزات الطبقات'], ['rs', '↺ إعادة']], g.h - 84, S.md, (S2, k) => { if (k === 'rs') { const m = S2.md; D.setup(S2); S2.md = m; } else S2.md = k; }, { bw: 190 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return (S.md === 'ord' ? D.btns(S, g) : D.fbtns(S, g).concat(D.lbtns(S, g))).concat(D.chips(S, g)); },
    readings(S) { return S.md === 'ord' ? [rd('الطبقات المرتبة', S.k + ' / 5')] : [rd('الميزات الموصولة', S.ok.filter(Boolean).length + ' / 5')]; },
    explain(S) { return Q26.ex('الترتيب من سطح الأرض: التروبوسفير ثم الستراتوسفير ثم الميزوسفير ثم الثرموسفير ثم الإكسوسفير.', 'التروبوسفير تحدث فيها الظواهر المناخية وتهبط حرارتها 6.5 °C لكل km، والستراتوسفير تحتوي الأوزون وتزداد حرارتها، والميزوسفير في المنتصف وهي الأبرد، والثرموسفير متأينة تعكس موجات الراديو، والإكسوسفير أعلاها وتفلت جزيئاتها.', ''); }
  };
  M8.P[D.id] = D;
})();

/* ==MERGES== */
/* عناصر الضغط فقط (بلا سحب) لا تُظهر أسهم السحب */
Object.keys(M8.P).filter(k => /^g9_at_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g9_at_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* =============== تجارب الفصل التاسع (فيزياء الجو وتقنية الاتصالات الحديثة) =============== */
const M99 = M => M8.merge(Object.assign({ ch: 39, reg: X9 }, M));
M99({ id: 'g9_c9_air', sec: '1-9 جو الأرض ومكوناته', page: 163, kind: 'نشاط', fig: 'الشكلان 1 و 2 والجدول 1',
  title: 'جو الأرض ومكوناته: غلاف رقيق من خليط غازات بنسب ثابتة',
  desc: 'نرى الغلاف الجوي من الفضاء طبقة زرقاء رقيقة مرتبطة بالأرض بالجاذبية، ونفحص عينة من الهواء الجاف بعدسة مكبرة ونقارنها بالجدول 1، ثم نشغل مصنعاً ونرى كيف يسبب CO₂ الاحتباس الحراري.',
  tags: 'جو الأرض الغلاف الجوي مكونات الهواء نتروجين أوكسجين الاحتباس الحراري',
  fact: ['الغلاف الجوي مرتبط بالأرض بفعل الجاذبية الأرضية (ص 163).', 'الهواء الجاف: نتروجين 78.08 % وأوكسجين 20.94 % وأركون 0.9325 % (الجدول 1، ص 163).', 'هل تعلم: الاحترار العالمي سببه امتصاص CO₂ المنبعث من المصانع للحرارة (ص 163).'],
  quiz: [
    { q: 'يتألف الغلاف الجوي من خليط من عدة غازات موجودة مع بعضها بنسبة:', o: ['ثابتة', 'متغيرة', 'متساوية', 'متعادلة'], a: 0, why: 'س1-1 ص 171: مكونات الهواء الجاف على سطح الأرض بنسب مئوية ثابتة.' },
    { q: 'الغاز الأكثر نسبة في الهواء الجاف:', o: ['النتروجين', 'الأوكسجين', 'الأركون', 'ثنائي أوكسيد الكاربون'], a: 0, why: 'الجدول 1: النتروجين 78.08 %.' },
    { q: 'سبب ظاهرة الاحترار العالمي:', o: ['امتصاص CO₂ المنبعث من المصانع للحرارة', 'زيادة الأوكسجين', 'نقصان النتروجين'], a: 0, why: 'هل تعلم ص 163.' },
    { q: 'س3: أربعة غازات من مكونات الغلاف الجوي هي:', o: ['النتروجين والأوكسجين والأركون و CO₂', 'الكلور والنتروجين والأمونيا والأوكسجين', 'بخار الزئبق والهليوم والأوزون والكلور'], a: 0, why: 'الجدول 1 ص 163.' }
  ],
  parts: [{ id: 'g9_at_earth', n: 'الغلاف الجوي من الفضاء' }, { id: 'g9_at_comp', n: 'مكونات الهواء الجاف' }, { id: 'g9_at_green', n: 'الاحتباس الحراري' }] });
M99({ id: 'g9_c9_layers', sec: '2-9 طبقات الغلاف الجوي', page: 164, kind: 'نشاط', fig: 'الأشكال 3–7',
  title: 'طبقات الغلاف الجوي الخمس ودرجة الحرارة مع الارتفاع وطبقة الأوزون',
  desc: 'نصعد بمجس عبر الطبقات الخمس ونرسم درجة الحرارة مع الارتفاع، ونقيس ثابت التناقص في التروبوسفير ببالون جوي، ونرى طبقة الأوزون تحجب الأشعة C وكيف يتكون الأوزون، ثم نرى تأين الأيونوسفير وإفلات جزيئات الإكسوسفير.',
  tags: 'طبقات الغلاف الجوي التروبوسفير الستراتوسفير الأوزون الميزوسفير الثرموسفير الأيونوسفير الإكسوسفير',
  fact: ['التروبوسفير حتى 14 km وتشكل 80 % من الغلاف الجوي، وتهبط فيها الحرارة 6.5 °C لكل km (ص 164).', 'أكبر تركيز للأوزون على ارتفاع 25 km في منتصف الستراتوسفير (ص 165).', 'هل تعلم: ثقب الأوزون انخفاض في تركيز الأوزون فوق القطبين (ص 166).', 'الأيونوسفير تعكس موجات الراديو فيصل البث إلى مسافات بعيدة (ص 167).'],
  quiz: [
    { q: 'تسمى طبقة الغلاف الجوي التي تحتوي طبقة الأوزون:', o: ['الستراتوسفير', 'الميزوسفير', 'التروبوسفير', 'الإكسوسفير'], a: 0, why: 'س1-2 ص 171.' },
    { q: 'أعلى طبقة من طبقات الغلاف الجوي هي:', o: ['الإكسوسفير', 'الستراتوسفير', 'الثرموسفير', 'الميزوسفير'], a: 0, why: 'س1-3 ص 171: فوق 500 km.' },
    { q: 'في التروبوسفير عند الارتفاع عن سطح الأرض:', o: ['يتناقص الضغط والكثافة ودرجة الحرارة', 'يزداد الضغط والكثافة ودرجة الحرارة', 'تزداد درجة الحرارة فقط'], a: 0, why: 'س2-3 ص 172.' },
    { q: 'الطبقة التي تحتوي إلكترونات حرة وأيونات:', o: ['الثرموسفير (الأيونوسفير)', 'الستراتوسفير', 'التروبوسفير'], a: 0, why: 'س2-4 ص 172.' },
    { q: 'يتولد الأوزون بتأثير الأشعة فوق البنفسجية نوع:', o: ['A و B', 'C فقط', 'تحت الحمراء'], a: 0, why: 'ص 166 وس2-5.' },
    { q: 'الطبقة الموجودة في منتصف الغلاف الجوي:', o: ['الميزوسفير', 'الستراتوسفير', 'الإكسوسفير'], a: 0, why: 'س2-6 ص 172.' }
  ],
  parts: [{ id: 'g9_at_layers', n: 'الطبقات الخمس ودرجة الحرارة' }, { id: 'g9_at_tropo', n: 'التروبوسفير وثابت التناقص' }, { id: 'g9_at_ozone', n: 'طبقة الأوزون والأشعة فوق البنفسجية' }, { id: 'g9_at_o3', n: 'كيف يتكون الأوزون' }, { id: 'g9_at_exo', n: 'الأيونوسفير والإكسوسفير' }] });
M99({ id: 'g9_c9_waves', sec: '3-9 انتشار الموجات اللاسلكية', page: 168, kind: 'نشاط', fig: 'الشكلان 8-a و 8-b',
  title: 'انتشار الموجات اللاسلكية: الأرضية والسماوية والمايكروية',
  desc: 'نبتعد بسيارة عن برج إرسال لنرى قصر مدى الموجة الأرضية، ونوجه هوائياً نحو الأيونوسفير لنرى انعكاس الموجات السماوية، ثم نرسل موجات مايكروية عبر قمر صناعي يقويها ويعيد بثها.',
  tags: 'الموجات اللاسلكية الموجات الأرضية الموجات السماوية الأيونوسفير HF المايكروية القمر الصناعي',
  fact: ['الموجات الأرضية تسمى السطحية وترددها أقل من 200 MHz (ص 168).', 'الموجات HF تنعكس عن الأيونوسفير وتنتقل آلاف الكيلومترات (ص 168).', 'الموجات المايكروية تخترق الأيونوسفير وتستعمل في الأقمار الصناعية والهواتف النقالة (ص 169).'],
  quiz: [
    { q: 'تستعمل الموجات السماوية للاتصالات:', o: ['بعيدة المدى', 'قصيرة المدى', 'متوسطة المدى', 'بعيدة المدى ومتوسطة المدى'], a: 0, why: 'س1-4 ص 171.' },
    { q: 'يطلق أحياناً على الموجات الراديوية الأرضية اسم الموجات:', o: ['السطحية', 'السماوية', 'المايكروية'], a: 0, why: 'س2-8 ص 172.' },
    { q: 'مدى الموجات الأرضية قصير نسبياً بسبب:', o: ['تحدب سطح الأرض', 'انعكاسها عن الأيونوسفير', 'ترددها العالي جداً'], a: 0, why: 'ص 168.' },
    { q: 'الموجات التي تخترق الأيونوسفير وتستعمل في اتصالات الأقمار الصناعية:', o: ['المايكروية', 'HF', 'الأرضية'], a: 0, why: 'ص 169.' },
    { q: 'الطبقة التي تعكس الموجات الراديوية:', o: ['الثرموسفير (الأيونوسفير)', 'التروبوسفير', 'الستراتوسفير'], a: 0, why: 'س2-7 ص 172.' }
  ],
  parts: [{ id: 'g9_at_ground', n: 'الموجات الأرضية (السطحية)' }, { id: 'g9_at_sky', n: 'الموجات السماوية والأيونوسفير' }, { id: 'g9_at_space', n: 'الموجات المايكروية والقمر الصناعي' }] });
M99({ id: 'g9_c9_mobile', sec: '4-9 الهاتف النقال', page: 169, kind: 'نشاط', fig: 'الشكلان 9 و 10',
  title: 'الهاتف النقال: مكوناته السبعة وشبكة الخلايا والأبراج',
  desc: 'نفكك هاتفاً نقالاً ونتعرف على مكوناته الأساسية ووظيفة كل منها ونختبر أنفسنا، ثم نتنقل بهاتف بين خلايا الشبكة ونرى اتصاله بأقرب برج وانتقال المكالمة بين الأبراج.',
  tags: 'الهاتف النقال مكونات الهاتف شبكة الخلايا أبراج الاتصالات الموجات المايكروية',
  fact: ['الهاتف النقال من الأجهزة التقنية المعقدة بسبب تكدس الدوائر الإلكترونية على مساحة صغيرة (ص 169).', 'الهاتف النقال وسيلة اتصال لاسلكية تستعمل الموجات المايكروية (ص 169).'],
  quiz: [
    { q: 'س7: المكونات الرئيسة للهاتف النقال:', o: ['دائرة إلكترونية، هوائي، شاشة، لوحة مفاتيح، لاقطة صوت، سماعة، بطارية', 'محرك، مولد، محولة، بطارية', 'عدسة، مرآة، فلم، بطارية'], a: 0, why: 'ص 169، الشكل 10.' },
    { q: 'الدائرة الإلكترونية في الهاتف النقال تحتوي رقائق:', o: ['المعالج والذاكرة', 'البطارية', 'الهوائي'], a: 0, why: 'ص 169.' },
    { q: 'يتصل الهاتف النقال بالبرج بواسطة:', o: ['الموجات المايكروية', 'الأسلاك', 'الموجات الصوتية'], a: 0, why: 'ص 169: تستعمل الموجات المايكروية في الهواتف النقالة.' }
  ],
  parts: [{ id: 'g9_at_phone', n: 'مكونات الهاتف النقال' }, { id: 'g9_at_cells', n: 'شبكة الخلايا والأبراج' }] });
M99({ id: 'g9_c9_sat', sec: '5-9 الأقمار الصناعية', page: 170, kind: 'نشاط', fig: 'الأشكال 11–13',
  title: 'الأقمار الصناعية: المدارات والارتفاعات والاستعمالات وتغطية الأرض',
  desc: 'نغير ارتفاع قمر صناعي ونقيس زمن دورته وسرعته ونقارن الأقمار العسكرية والعلمية وأقمار الاتصالات، ونرى قمر الاتصالات ثابتاً فوق بغداد، ثم نوزع ثلاثة أقمار اتصالات لتغطية الأرض كما في الشكل 11.',
  tags: 'الأقمار الصناعية أقمار الاتصالات 36000 km الأقمار العلمية GPS الطقس الأقمار العسكرية المدار التغطية',
  fact: ['أقمار الاتصالات على ارتفاع 36000 km تقريباً وهي أعلى من بقية الأقمار (ص 170).', 'الأقمار العلمية لمراقبة الطقس والنشاط الشمسي و GPS على ارتفاعات متوسطة (ص 170).', 'الأقمار العسكرية بارتفاعات واطئة نسبياً لمسح وتصوير المواقع (ص 170).'],
  quiz: [
    { q: 'الغاية من الأقمار الصناعية العلمية:', o: ['مراقبة الطقس والأنواء الجوية', 'تصوير المواقع الأرضية', 'لأغراض الاتصالات', 'للأغراض العسكرية'], a: 0, why: 'س1-5 ص 171.' },
    { q: 'ارتفاع أقمار الاتصالات عن سطح الأرض بحدود:', o: ['36000 km', '500 km', '14 km'], a: 0, why: 'ص 170.' },
    { q: 'س8: ثلاثة استعمالات للأقمار الصناعية:', o: ['الاتصالات، والأغراض العلمية، والأغراض العسكرية', 'التدفئة، والإنارة، والطبخ', 'توليد الكهرباء فقط'], a: 0, why: 'ص 170.' },
    { q: 'الأقمار التي تدور بارتفاعات واطئة نسبياً:', o: ['العسكرية', 'أقمار الاتصالات', 'جميع الأقمار'], a: 0, why: 'ص 170.' }
  ],
  parts: [{ id: 'g9_at_orbits', n: 'المدارات واستعمالات الأقمار' }, { id: 'g9_at_geo3', n: 'ثلاثة أقمار تغطي الأرض' }] });
M99({ id: 'g9_c9_review', sec: 'أسئلة الفصل التاسع', page: 171, kind: 'نشاط', fig: 'أسئلة ص 171–172',
  title: 'أسئلة الفصل التاسع: صحح العبارات ورتب الطبقات وميزاتها',
  desc: 'نحل س2 (صحح العبارات) تفاعلياً، ونرتب طبقات الغلاف الجوي (س4) ونصل كل طبقة بميزتها (س5). أسئلة الاختيار من متعدد (س1) في الاختبار القصير.',
  tags: 'أسئلة الفصل التاسع اختر صحح رتب ميزات طبقات الغلاف الجوي الأوزون الهاتف النقال الأقمار الصناعية',
  fact: ['س6: الأوزون O₃ يوجد في الستراتوسفير، ويتكون من O₂ + UV → O + O ثم O + O₂ → O₃ (ص 166).', 'س7: مكونات الهاتف النقال سبعة (ص 169).', 'س8: الأقمار للاتصالات والأغراض العلمية والعسكرية (ص 170).'],
  quiz: [
    { q: 'س1-1: يتألف الغلاف الجوي من خليط من عدة غازات موجودة مع بعضها بنسبة:', o: ['ثابتة', 'متغيرة', 'متساوية', 'متعادلة'], a: 0, why: 'ص 163.' },
    { q: 'س1-2: تسمى طبقة الغلاف الجوي التي تحتوي طبقة الأوزون:', o: ['الستراتوسفير', 'الميزوسفير', 'التروبوسفير', 'الإكسوسفير'], a: 0, why: 'ص 165.' },
    { q: 'س1-3: أعلى طبقة من طبقات الغلاف الجوي هي:', o: ['الإكسوسفير', 'الستراتوسفير', 'الثرموسفير', 'الميزوسفير'], a: 0, why: 'ص 167.' },
    { q: 'س1-4: تستعمل الموجات السماوية للاتصالات:', o: ['بعيدة المدى', 'قصيرة المدى', 'متوسطة المدى', 'بعيدة المدى ومتوسطة المدى'], a: 0, why: 'ص 168.' },
    { q: 'س1-5: الغاية من الأقمار الصناعية العلمية:', o: ['مراقبة الطقس والأنواء الجوية', 'تصوير المواقع الأرضية', 'لأغراض الاتصالات', 'للأغراض العسكرية'], a: 0, why: 'ص 170.' },
    { q: 'س6: أين يوجد الأوزون؟', o: ['في طبقة الستراتوسفير', 'في التروبوسفير', 'في الإكسوسفير'], a: 0, why: 'ص 165–166.' }
  ],
  parts: [{ id: 'g9_at_fix', n: 'س2: صحّح العبارات' }, { id: 'g9_at_order', n: 'س4 و س5: الطبقات وميزاتها' }] });
