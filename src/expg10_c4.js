'use strict';
/* ====================== الرابع العلمي — الفصل الرابع: الخصائص الحرارية للمادة (ch 44, ص 52–83) ======================
   Merged experiments (book order): g10_th_heat (4-1, 4-2) · g10_th_calor (4-3) · g10_th_solid (4-4 a) · g10_th_liquid (4-4 b, c)
   · g10_th_phase (4-5) · g10_th_transfer (4-6) · g10_th_review (4-7 + أسئلة ص 79–83).
   Parts g10_t_*. Local kit Q44 = Q43 + materials table, thermometers, burners, hot plates, metal blocks, rods, molecules. */
const Q44 = Object.assign(Object.create(Q43), {
  /* key: [name, Cp J/kg°C (table 1), colours [hi, mid, dark], α 1/°C (table 2), k W/m°C (table 6), ρ kg/m³] */
  M: {
    w: ['ماء', 4186, ['#e0f2fe', '#38bdf8', '#0369a1'], 0, .61, 1000],
    al: ['ألمنيوم', 900, ['#f8fafc', '#cbd5e1', '#64748b'], 24e-6, 210, 2700],
    cu: ['نحاس', 387, ['#fed7aa', '#ea580c', '#7c2d12'], 17e-6, 385, 8900],
    fe: ['حديد', 448, ['#e5e7eb', '#6b7280', '#1f2937'], 12e-6, 79, 7870],
    st: ['فولاذ', 500, ['#f1f5f9', '#94a3b8', '#334155'], 12e-6, 46, 7850],
    ag: ['فضة', 234, ['#ffffff', '#d4d4d8', '#71717a'], 19e-6, 406, 10500],
    gl: ['زجاج', 837, ['#f0f9ff', '#bae6fd', '#0284c7'], 9e-6, .8, 2500],
    wd: ['خشب', 1750, ['#fde68a', '#b45309', '#78350f'], 5e-6, .15, 600],
    pb: ['رصاص', 128, ['#e2e8f0', '#64748b', '#1e293b'], 29e-6, 35, 11300],
    au: ['ذهب', 129, ['#fef9c3', '#eab308', '#854d0e'], 14e-6, 293, 19300],
    br: ['نحاس أصفر', 380, ['#fef08a', '#ca8a04', '#713f12'], 19e-6, 109, 8500],
    con: ['إسمنت', 880, ['#f5f5f4', '#a8a29e', '#57534e'], 12e-6, .3, 2400],
    brk: ['طابوق', 840, ['#fecaca', '#b91c1c', '#7f1d1d'], 9e-6, .63, 1800],
    air: ['هواء', 1000, ['#f8fafc', '#e2e8f0', '#94a3b8'], 0, .025, 1.2]
  },
  nm(k) { return Q44.M[k][0]; },
  ease(a, b, dt, k) { return a + (b - a) * Math.min(1, dt * k); },
  /* temperature → colour (cold blue … warm orange … red hot … white hot) */
  tcol(T, a = 1) { const S = [[-20, [37, 99, 235]], [5, [125, 211, 252]], [25, [203, 213, 225]], [60, [251, 191, 36]], [120, [249, 115, 22]], [300, [220, 38, 38]], [700, [254, 240, 138]]];
    let i = 0; while (i < S.length - 2 && T > S[i + 1][0]) i++; const u = clamp((T - S[i][0]) / (S[i + 1][0] - S[i][0]), 0, 1), c = S[i][1].map((v, j) => Math.round(v + (S[i + 1][1][j] - v) * u)); return 'rgba(' + c.join(',') + ',' + a + ')'; },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#fff7ed'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  /* lab bench top at y */
  bench(ctx, x0, x1, y) { K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + 16); g.addColorStop(0, '#a16207'); g.addColorStop(1, '#713f12'); ctx.fillStyle = g; ctx.fillRect(x0, y, x1 - x0, 16); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(x0, y, x1 - x0, 3); }); },
  /* thermometer with value badge */
  thermo(ctx, x, yb, h, T, t0 = 0, t1 = 120, o = {}) { K.thermo(ctx, x, yb, h, T, t0, t1, { show: false, step: o.step || 20, liq: o.liq }); if (o.lab !== false) Q42.T(ctx, T.toFixed(o.d != null ? o.d : 1) + ' °C', x, yb - h - 13, { s: o.s || 11.5, w: 900, c: '#fff', bg: o.col || '#b91c1c' }); },
  burner(ctx, x, y, p, t) { K.burner(ctx, x, y, p, t); },
  /* electric hot plate: top surface at y, width w, power p 0..1; label drawn on its front */
  hotplate(ctx, x, y, w, p, lab) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + 40); g.addColorStop(0, '#475569'); g.addColorStop(1, '#1e293b'); ctx.fillStyle = g; rr(ctx, x - w / 2, y + 6, w, 36, 6); ctx.fill();
      const gc = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); const hot = clamp(p, 0, 1); gc.addColorStop(0, '#334155'); gc.addColorStop(.5, hot > .02 ? 'rgba(239,68,68,' + (.35 + .6 * hot) + ')' : '#475569'); gc.addColorStop(1, '#334155');
      ctx.fillStyle = gc; rr(ctx, x - w / 2 + 6, y, w - 12, 8, 3); ctx.fill(); if (hot > .02) { ctx.save(); ctx.shadowColor = 'rgba(248,113,113,.9)'; ctx.shadowBlur = 14 * hot; ctx.fillStyle = 'rgba(248,113,113,' + (.5 * hot) + ')'; ctx.fillRect(x - w / 2 + 12, y + 1, w - 24, 4); ctx.restore(); }
      ctx.fillStyle = hot > .02 ? '#22c55e' : '#64748b'; ctx.beginPath(); ctx.arc(x + w / 2 - 14, y + 24, 4, 0, TAU); ctx.fill(); });
    if (lab) Q42.T(ctx, lab, x - 6, y + 24, { s: 10.5, w: 900, c: '#fde68a' });
  },
  /* metal block with heat glow */
  block(ctx, x, y, w, h, mk, T = 20, d = 10) {
    const c = Q44.M[mk][2]; K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
      ctx.fillStyle = shade(c[1], 20); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + d, y - d * .6); ctx.lineTo(x + w + d, y - d * .6); ctx.lineTo(x + w, y); ctx.closePath(); ctx.fill(); ctx.restore();
      ctx.fillStyle = shade(c[1], -30); ctx.beginPath(); ctx.moveTo(x + w, y); ctx.lineTo(x + w + d, y - d * .6); ctx.lineTo(x + w + d, y + h - d * .6); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fill();
      const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, c[0]); g.addColorStop(.45, c[1]); g.addColorStop(1, c[2]); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
      const a = clamp((T - 45) / 260, 0, .75); if (a > 0) { ctx.fillStyle = Q44.tcol(T, a); ctx.fillRect(x, y, w, h); }
      ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, h); });
  },
  /* horizontal rod; Tf(u) gives temperature along it (u 0..1) for the glow */
  rod(ctx, x, y, len, th, mk, Tf) {
    const c = Q44.M[mk][2]; K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y - th / 2, 0, y + th / 2); g.addColorStop(0, c[0]); g.addColorStop(.4, c[1]); g.addColorStop(1, c[2]); ctx.fillStyle = g; ctx.fillRect(x, y - th / 2, len, th);
      if (Tf) { const n = 40; for (let i = 0; i < n; i++) { const T = Tf((i + .5) / n), a = clamp((T - 35) / 220, 0, .8); if (a > 0) { ctx.fillStyle = Q44.tcol(T, a); ctx.fillRect(x + i * len / n, y - th / 2, len / n + .6, th); } } }
      ctx.strokeStyle = 'rgba(15,23,42,.4)'; ctx.lineWidth = 1; ctx.strokeRect(x, y - th / 2, len, th); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x, y - th / 2 + 1, len, Math.max(1.5, th * .15)); });
  },
  /* jiggling molecules in a box (amp grows with temperature); mode 's' lattice, 'l' liquid, 'g' gas */
  mols(ctx, x, y, w, h, T, t, mode = 's', col = '#2563eb', n = 30) {
    K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); const cols = Math.round(Math.sqrt(n * w / h)), rows = Math.ceil(n / cols), amp = 1 + clamp((T + 20) / 40, 0, 6);
      for (let i = 0; i < n; i++) { const c = i % cols, r = (i / cols) | 0; let px = x + (c + .5) * w / cols, py = y + (r + .5) * h / rows;
        if (mode === 'l') { px += Math.sin(t * .9 + i * 2.1) * w / cols * .6; py += Math.cos(t * .7 + i * 1.3) * h / rows * .4; }
        if (mode === 'g') { const fx = (Math.sin(i * 12.9898) * 43758.5) % 1, fy = (Math.sin(i * 78.233) * 12345.6) % 1; px = x + Math.abs((Math.abs(fx) * w + t * 40 * (1 + i % 3)) % (2 * w) - w); py = y + Math.abs((Math.abs(fy) * h + t * 33 * (1 + i % 2)) % (2 * h) - h); }
        px += Math.sin(t * 23 + i * 7) * amp; py += Math.cos(t * 19 + i * 5) * amp;
        const g = ctx.createRadialGradient(px - 2, py - 2, .5, px, py, 6); g.addColorStop(0, '#fff'); g.addColorStop(.4, col); g.addColorStop(1, shade(col, -40)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, 5.5, 0, TAU); ctx.fill(); }
      ctx.restore(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.strokeRect(x, y, w, h); });
  },
  /* wavy heat arrow (red) from (x,y) by (dx,dy) */
  heat(ctx, x, y, dx, dy, t, col = '#ef4444', w = 3) { K.raw(ctx, () => { const L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); for (let s = 0; s <= L - 10; s += 2) { const o = Math.sin(s / 7 - t * 8) * 4; const px = x + ux * s - uy * o, py = y + uy * s + ux * o; s ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x + dx, y + dy); ctx.lineTo(x + dx - ux * 11 - uy * 6, y + dy - uy * 11 + ux * 6); ctx.lineTo(x + dx - ux * 11 + uy * 6, y + dy - uy * 11 - ux * 6); ctx.closePath(); ctx.fill(); }); },
  /* steam / smoke wisps above (x,y) */
  steam(ctx, x, y, a, t, n = 4, wd = 40) { if (a <= .02) return; K.raw(ctx, () => { for (let i = 0; i < n; i++) { const ph = (t * .6 + i / n) % 1, xx = x + (i - (n - 1) / 2) * wd / n + Math.sin(t * 2 + i) * 6, yy = y - ph * 70; ctx.fillStyle = 'rgba(203,213,225,' + (a * (1 - ph) * .7) + ')'; ctx.beginPath(); ctx.arc(xx, yy, 7 + ph * 12, 0, TAU); ctx.fill(); } }); },
  /* digital meter */
  meter(ctx, x, y, w, val, lab, col = '#16a34a') { K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; rr(ctx, x - w / 2, y - 15, w, 30, 6); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke(); }); Q42.T(ctx, val, x, y, { s: 13, w: 900, c: col, mono: 1 }); if (lab) Q42.T(ctx, lab, x, y - 25, { s: 10.5, w: 800, c: '#334155' }); },
  stepChips(S, id, y, x0, lab, onEx, n = 9) { return Q43.stepChips(S, id, y, x0, lab, onEx, n); },
  /* bidi: isolate Latin/number runs (incl. ° Δ α β γ ρ) inside Arabic strings */
  iso(s) { s = String(s).replace(/(\d) (°C|kg|g|L|J|W|m|cm|mm|kJ|s|J\/°C|J\/kg\.°C|m²|cm²|cm³|mm²|mm³)(?![A-Za-z])/g, '$1\u00A0$2'); if (!/[\u0600-\u06FF]/.test(s)) return s; const A = 'A-Za-zμ0-9ΔαβγρθπΣ°\u2080-\u2089\u2070-\u207E\u00B9\u00B2\u00B3'; return '\u061C' + s.replace(new RegExp('[(−\\-' + A + '][' + A + ' .=×÷+\\-−\\/√()·,:≈%′\'⟸⟹→\u00A0]*[' + A + ')%′]|[0-9]', 'g'), m => '\u2066' + m + '\u2069'); },
  T(ctx, s, x, y, o) { Q42.T(ctx, Q44.iso(s), x, y, o); },
  /* graph frame with y0 support: returns X(v), Y(v) */
  axes(ctx, A) { const x0 = A.x0 || 0, y0 = A.y0 || 0, X = v => A.x + (v - x0) / (A.xmax - x0) * A.w, Y = v => A.y + A.h - (v - y0) / (A.ymax - y0) * A.h;
    K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, A.x - 40, A.y - 22, A.w + 60, A.h + 56, 8); ctx.fill(); ctx.stroke(); ctx.strokeStyle = 'rgba(15,118,110,.14)'; ctx.lineWidth = 1;
      for (let v = x0; v <= A.xmax + 1e-9; v += A.xs) { ctx.beginPath(); ctx.moveTo(X(v), A.y); ctx.lineTo(X(v), A.y + A.h); ctx.stroke(); } for (let v = y0; v <= A.ymax + 1e-9; v += A.ys) { ctx.beginPath(); ctx.moveTo(A.x, Y(v)); ctx.lineTo(A.x + A.w, Y(v)); ctx.stroke(); }
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(A.x, A.y - 8); ctx.lineTo(A.x, A.y + A.h); ctx.lineTo(A.x + A.w + 8, A.y + A.h); ctx.stroke(); });
    const f = v => String(+v.toFixed(3)); for (let v = x0; v <= A.xmax + 1e-9; v += (A.lxs || A.xs * 2)) Q42.T(ctx, f(v), X(v), A.y + A.h + 11, { s: 9.5, w: 700, c: '#334155' }); for (let v = y0; v <= A.ymax + 1e-9; v += (A.lys || A.ys * 2)) Q42.T(ctx, f(v), A.x - 18, Y(v), { s: 9.5, w: 700, c: '#334155' });
    Q42.T(ctx, A.xl, A.x + A.w - 14, A.y + A.h + 26, { s: 10, w: 800, c: '#0f172a' }); Q42.T(ctx, A.yl, A.x + 8, A.y - 12, { s: 10, w: 800, c: '#0f172a', a: 'left' }); return { X, Y }; },
  slider(ctx, x0, x1, y, t, lab, c) { Q41.slider(ctx, x0, x1, y, t, '', c); if (lab) Q44.T(ctx, lab, (x0 + x1) / 2, y - 18, { s: 10.5, w: 800, c: '#334155' }); },
  card(ctx, S, L, o) { return Q42.card(ctx, S, L.map(q => typeof q === 'string' ? Q44.iso(q) : Object.assign({}, q, { t: Q44.iso(q.t) })), Object.assign({}, o || {}, o && o.title ? { title: Q44.iso(o.title) } : {})); },
  steps(ctx, S, st, o) { return Q42.steps(ctx, S, Object.assign({}, st, { q: Q44.iso(st.q), title: Q44.iso(st.title), lines: st.lines.map(t => Q44.iso(t)) }), o); }
});

LW({ id: 'g10_h4_q', cat: 44, name: 'كمية الحرارة', fx: '<i>Q</i> = <i>m</i> <i>C</i><sub>p</sub> Δ<i>T</i> = <i>m</i> <i>C</i><sub>p</sub> (<i>T</i><sub>2</sub> − <i>T</i><sub>1</sub>)', sym: 'كمية الحرارة = الكتلة × الحرارة النوعية × التغير في درجة الحرارة. Cp الحرارة النوعية: كمية الحرارة اللازمة لرفع درجة حرارة 1 kg من المادة درجة سيليزية واحدة (J/kg.°C). Q موجبة عند الاكتساب وسالبة عند الفقدان. 1 سعرة = 4.2 J', calc: { in: [['m', 'الكتلة m', 'kg', 3], ['c', 'الحرارة النوعية Cp', 'J/kg.°C', 900], ['T1', 'الدرجة الابتدائية T₁', '°C', 15], ['T2', 'الدرجة النهائية T₂', '°C', 25]], out: 'كمية الحرارة Q', u: 'J', f: v => v.m * v.c * (v.T2 - v.T1) } });
LW({ id: 'g10_h4_cap', cat: 44, name: 'السعة الحرارية', fx: '<i>C</i> = <i>m</i> <i>C</i><sub>p</sub> ، <i>Q</i> = <i>C</i> Δ<i>T</i>', sym: 'كمية الحرارة اللازمة لرفع درجة حرارة الجسم بكامله درجة سيليزية واحدة، ووحدتها J/°C. تعتمد على كتلة الجسم وحرارته النوعية، أما الحرارة النوعية فتعتمد على نوع المادة فقط', calc: { in: [['m', 'الكتلة m', 'kg', 4], ['c', 'الحرارة النوعية Cp', 'J/kg.°C', 448]], out: 'السعة الحرارية C', u: 'J/°C', f: v => v.m * v.c } });
LW({ id: 'g10_h4_mix', cat: 44, name: 'الاتزان الحراري (طريقة المزج)', fx: 'الحرارة المفقودة = الحرارة المكتسبة ⟸ <i>m</i><sub>1</sub><i>c</i><sub>1</sub>(<i>T</i><sub>f</sub> − <i>T</i><sub>1</sub>) = <i>m</i><sub>2</sub><i>c</i><sub>2</sub>(<i>T</i><sub>2</sub> − <i>T</i><sub>f</sub>)', sym: 'في النظام المعزول تنتقل الحرارة من الجسم الساخن إلى البارد حتى تتساوى درجتا حرارتيهما. يستعمل المسعر (وعاء نحاسي معزول بغطاء فيه فتحتان للمحرار والمحرك) لقياس الحرارة النوعية', calc: { in: [['m1', 'كتلة الماء m₁', 'kg', 1], ['c1', 'الحرارة النوعية للماء', 'J/kg.°C', 4200], ['T1', 'درجة حرارة الماء', '°C', 20], ['m2', 'كتلة الجسم الساخن m₂', 'kg', .5], ['c2', 'حرارته النوعية', 'J/kg.°C', 900], ['T2', 'درجة حرارته', '°C', 100]], out: 'درجة الحرارة النهائية Tf', u: '°C', f: v => (v.m1 * v.c1 * v.T1 + v.m2 * v.c2 * v.T2) / (v.m1 * v.c1 + v.m2 * v.c2) } });
LW({ id: 'g10_h4_lin', cat: 44, name: 'التمدد الطولي', fx: 'Δ<i>L</i> = <i>α</i> <i>L</i> Δ<i>T</i> ، <i>α</i> = ' + FR('Δ<i>L</i>', '<i>L</i> Δ<i>T</i>'), sym: 'α معامل التمدد الطولي: مقدار الزيادة في وحدة الأطوال من المادة عند تسخينها درجة سيليزية واحدة (1/°C). الألمنيوم 24×10⁻⁶ ، النحاس 17×10⁻⁶ ، الفولاذ 12×10⁻⁶ ، الزجاج 9×10⁻⁶', calc: { in: [['a', 'معامل التمدد α', '1/°C', 24e-6], ['L', 'الطول الأصلي L', 'm', 1], ['dT', 'التغير في درجة الحرارة ΔT', '°C', 100]], out: 'التغير في الطول ΔL', u: 'm', f: v => v.a * v.L * v.dT } });
LW({ id: 'g10_h4_area', cat: 44, name: 'التمدد السطحي', fx: 'Δ<i>A</i> = <i>γ</i> <i>A</i> Δ<i>T</i> ، <i>γ</i> = 2<i>α</i>', sym: 'γ (كاما) معامل التمدد السطحي: مقدار الزيادة في وحدة المساحة عند ارتفاع درجة الحرارة درجة سيليزية واحدة، ويساوي ضعف معامل التمدد الطولي', calc: { in: [['a', 'معامل التمدد الطولي α', '1/°C', 12e-6], ['A', 'المساحة الأصلية A', 'm²', 1], ['dT', 'ΔT', '°C', 100]], out: 'التغير في المساحة ΔA', u: 'm²', f: v => 2 * v.a * v.A * v.dT } });
LW({ id: 'g10_h4_vol', cat: 44, name: 'التمدد الحجمي', fx: 'Δ<i>V</i> = <i>β</i> <i>V</i> Δ<i>T</i> ، <i>β</i> = 3<i>α</i>', sym: 'β معامل التمدد الحجمي: مقدار الزيادة في وحدة الحجم عند ارتفاع درجة الحرارة درجة سيليزية واحدة. للأجسام الصلبة β = 3α ، وللغازات بثبوت الضغط β = 1/273 لكل °C', calc: { in: [['b', 'معامل التمدد الحجمي β', '1/°C', 9.6e-4], ['V', 'الحجم الأصلي V', 'L', 60], ['dT', 'ΔT', '°C', 20]], out: 'التغير في الحجم ΔV', u: 'L', f: v => v.b * v.V * v.dT } });
LW({ id: 'g10_h4_real', cat: 44, name: 'التمدد الحقيقي والظاهري للسائل', fx: '<i>β</i><sub>r</sub> = <i>β</i><sub>v</sub> + 3<i>α</i>', sym: 'معامل التمدد الحقيقي للسائل = معامل التمدد الظاهري + معامل التمدد الحجمي للإناء (α معامل التمدد الطولي للإناء). التمدد الذي نشاهده أقل من الحقيقي لأن الإناء يتمدد أيضاً', calc: { in: [['bv', 'معامل التمدد الظاهري βv', '1/°C', 1.8e-4], ['a', 'معامل التمدد الطولي للإناء α', '1/°C', 9e-6]], out: 'معامل التمدد الحقيقي βr', u: '1/°C', f: v => v.bv + 3 * v.a } });
LW({ id: 'g10_h4_lf', cat: 44, name: 'الحرارة الكامنة للانصهار', fx: '<i>Q</i> = <i>m</i> <i>L</i><sub>f</sub>', sym: 'كمية الحرارة اللازمة لتحويل وحدة الكتل من الحالة الصلبة إلى السائلة بدرجة الحرارة نفسها (درجة الانصهار) وبثبوت الضغط. للجليد Lf = 335 kJ/kg', calc: { in: [['m', 'الكتلة m', 'kg', .025], ['L', 'الحرارة الكامنة للانصهار Lf', 'J/kg', 335000]], out: 'كمية الحرارة Q', u: 'J', f: v => v.m * v.L } });
LW({ id: 'g10_h4_lv', cat: 44, name: 'الحرارة الكامنة للتبخر', fx: '<i>Q</i> = <i>m</i> <i>L</i><sub>v</sub>', sym: 'كمية الحرارة اللازمة لتحويل وحدة الكتل من السائل إلى الغاز عند درجة الغليان دون تغير درجة حرارتها. للماء Lv = 2260 kJ/kg', calc: { in: [['m', 'الكتلة m', 'kg', 3], ['L', 'الحرارة الكامنة للتبخر Lv', 'J/kg', 2260000]], out: 'كمية الحرارة Q', u: 'J', f: v => v.m * v.L } });
LW({ id: 'g10_h4_cond', cat: 44, name: 'التوصيل الحراري', fx: '<i>H</i> = <i>K</i> <i>A</i> ' + FR('Δ<i>T</i>', '<i>L</i>'), sym: 'H المعدل الزمني لانتقال الطاقة الحرارية بالتوصيل (W)، K معامل التوصيل الحراري (W/m.°C)، A مساحة المقطع، ΔT/L الانحدار الحراري (°C/m). المقاومة الحرارية لطبقة = سمكها ÷ معامل توصيلها', calc: { in: [['K', 'معامل التوصيل K', 'W/m.°C', 79], ['A', 'مساحة المقطع A', 'm²', 1e-4], ['dT', 'فرق درجات الحرارة ΔT', '°C', 200], ['L', 'الطول (السمك) L', 'm', .5]], out: 'المعدل الزمني H', u: 'W', f: v => v.K * v.A * v.dT / v.L } });

/* =============== A1 — كمية الحرارة Q = m Cp ΔT: جسمان على مسخنين متماثلين (4-1، الشكل 1-4، مثال 1 ص 54) =============== */
(() => {
  const MATS = ['w', 'al', 'fe', 'cu', 'gl'], SPD = 8;
  const EX = { q: 'ما الطاقة الحرارية اللازمة لرفع درجة حرارة 3 kg من الألمنيوم من 15 °C إلى 25 °C؟ الحرارة النوعية للألمنيوم 900 J/kg.°C', lines: ['m = 3 kg ، T₁ = 15 °C ، T₂ = 25 °C', 'Cp = 900 J/kg.°C', 'Q = m Cp (T₂ − T₁)', 'Q = 3 × 900 × (25 − 15)', 'Q = 27000 J'] };
  const D = { id: 'g10_t_q', page: 52, fig: 'الشكل 1-4 + الجدول 1 + مثال 1 ص 54',
    desc: 'كمية الحرارة اللازمة لتسخين جسم تعتمد على: كتلته، والتغير في درجة حرارته، ونوع مادته: Q = m Cp ΔT. الحرارة النوعية Cp هي كمية الحرارة اللازمة لرفع درجة حرارة 1 kg من المادة درجة سيليزية واحدة (J/kg.°C). نضع جسمين على مسخنين كهربائيين متماثلين فيأخذ كل منهما كمية الحرارة نفسها، ونقارن ارتفاع درجة حرارتيهما.',
    tags: 'كمية الحرارة Q=mCpΔT الحرارة النوعية Cp الطاقة الداخلية الجول السعرة 4.2 ماء ألمنيوم حديد نحاس زجاج مسخن 27000',
    tools: ['مسخنان كهربائيان متماثلان مع عداد طاقة', 'دورق ماء وقطع معدنية', 'محراران'],
    steps: ['اختر مادة كل جسم من الأزرار (أو اضغط على الجسم)، واسحب المقبض تحت كل مسخن لتغيير الكتلة.', 'اضغط «▶ سخّن»: يأخذ الجسمان كمية الحرارة نفسها Q = P × t.', 'قارن ΔT: للكتلة نفسها يسخن الجسم ذو الحرارة النوعية الأصغر أسرع، وللمادة نفسها يسخن الأصغر كتلة أسرع.', 'اضغط «مثال 1» لترى الألمنيوم 3 kg يسخن من 15 إلى 25 °C ثم تابع الحل.'],
    concl: ['Q = m Cp ΔT: كمية الحرارة تتناسب مع الكتلة ومع التغير في درجة الحرارة وتعتمد على نوع المادة.', 'للماء أكبر حرارة نوعية بين المواد الشائعة (4186 J/kg.°C)، لذا يسخن ببطء ويبرد ببطء.', 'وعاء الألمنيوم يسخن أسرع من الماء الذي فيه رغم تساوي كتلتيهما.', 'مثال 1: Q = 27000 J.'],
    laws: ['g10_h4_q'],
    controls: [R('mA', 'كتلة الجسم A', .1, 3, 1, .1, 'kg'), R('mB', 'كتلة الجسم B', .1, 3, 1, .1, 'kg'), R('P', 'قدرة كل مسخن', 200, 2000, 1000, 50, 'W'), TG('mol', 'الجزيئات (مكبّرة)', false, null, 'particles')],
    setup(S) { S.a = 'w'; S.b = 'al'; S.T0 = 20; S.ex = 0; S.k = 0; S.stop = 0; D.reset(S); },
    reset(S) { S.TA = S.TB = S.dA = S.dB = S.T0; S.Q = 0; S.tt = 0; S.run = 0; S.clk = 0; S.lmA = S.p.mA; S.lmB = S.p.mB; S.msg = ''; },
    update(S, dt) {
      S.clk += dt; if (S.lmA !== S.p.mA || S.lmB !== S.p.mB) { S.ex = 0; D.reset(S); }
      if (S.run) { const ds = dt * SPD, P = S.p.P, q = P * ds; S.Q += q; S.tt += ds; S.TA += q / (S.p.mA * Q44.M[S.a][1]); S.TB += q / (S.p.mB * Q44.M[S.b][1]);
        if (S.stop && S.TA >= S.stop) { const over = (S.TA - S.stop) * S.p.mA * Q44.M[S.a][1]; S.Q -= over; S.TB -= over / (S.p.mB * Q44.M[S.b][1]); S.TA = S.stop; S.run = 0; S.msg = 'وصل A إلى ' + S.stop + ' °C'; }
        if (Math.max(S.TA, S.TB) >= 100) { S.run = 0; S.msg = 'توقف التسخين عند 100 °C'; } }
      S.dA = Q44.ease(S.dA, S.TA, dt, 2.5); S.dB = Q44.ease(S.dB, S.TB, dt, 2.5);
    },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), py = h * .6; return { w, h, L, py, xa: L + 112, xb: L + 322, sy: py + 112 }; },
    sample(ctx, S, x, py, mk, m, T, Td) {
      if (mk === 'w') { const bh = 150, lv = clamp(m / 3.3, .08, 1); K.beaker(ctx, x, py, 116, bh, lv * .95, { liq: '#38bdf8', liqA: .5 }); K.raw(ctx, () => { const a = clamp((T - 30) / 90, 0, .45); if (a > 0) { ctx.fillStyle = 'rgba(249,115,22,' + a + ')'; ctx.fillRect(x - 56, py - bh * lv * .95, 112, bh * lv * .95 - 2); } }); Q44.steam(ctx, x, py - bh * lv * .95 - 6, clamp((T - 55) / 45, 0, 1), S.clk); Q44.thermo(ctx, x + 30, py - 18, 190, Td, 0, 120, { col: '#0369a1' }); return py - bh * lv; }
      const s = 44 + 64 * Math.cbrt(m / 3) * Math.cbrt(2700 / Q44.M[mk][5]) * 1.2; Q44.block(ctx, x - s / 2, py - s, s, s, mk, T); Q44.thermo(ctx, x + s * .15, py - s * .35, 190, Td, 0, 120, { col: '#0369a1' }); return py - s;
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = S.p.P; Q44.bg(ctx, w, h); Q44.bench(ctx, g.L, g.xb + 140, g.py + 44);
      [[g.xa, S.a, S.p.mA, S.TA, S.dA, 'A', '#0f766e'], [g.xb, S.b, S.p.mB, S.TB, S.dB, 'B', '#c2410c']].forEach(q => {
        Q44.hotplate(ctx, q[0], g.py, 150, S.run ? P / 2000 : 0, 'Q = ' + (S.Q / 1000).toFixed(1) + ' kJ');
        const top = D.sample(ctx, S, q[0], g.py, q[1], q[2], q[3], q[4]);
        if (S.run) Q44.heat(ctx, q[0] - 40, g.py + 2, 0, -30, S.clk, '#ef4444', 2.5);
        Q44.T(ctx, 'الجسم ' + q[5] + ': ' + Q44.nm(q[1]), q[0], Math.min(top, g.py - 200) - 36, { s: 12, w: 900, c: '#fff', bg: q[6] });
        Q44.T(ctx, 'ΔT = ' + (q[3] - S.T0).toFixed(1) + ' °C', q[0], g.py + 74, { s: 12.5, w: 900, c: '#fff', bg: q[6] });
        Q44.slider(ctx, q[0] - 62, q[0] + 62, g.sy, (q[2] - .1) / 2.9, 'الكتلة ' + q[2].toFixed(1) + ' kg', q[6]);
        if (S.p.mol) { const bx = q[0] - 52, by = Math.min(top, g.py - 200) - 132; Q44.mols(ctx, bx, by, 104, 70, q[3], S.clk, q[1] === 'w' ? 'l' : 's', q[1] === 'w' ? '#0284c7' : shade(Q44.M[q[1]][2][1], -10), q[1] === 'w' ? 14 : 18); }
      });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.b); Q42.drawChips(ctx, C.r); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      if (S.ex) Q44.steps(ctx, S, Object.assign({ title: 'مثال 1 ص 54' }, EX, { k: S.k }), { y: 70, x: w - 12, wd: 312 });
      else { const cA = Q44.M[S.a][1], cB = Q44.M[S.b][1]; Q44.card(ctx, S, [{ t: 'الحرارة نفسها لكل جسم', c: '#334155', w: 800 }, { t: 'Q = P t = ' + P + ' × ' + Math.round(S.tt) + ' s = ' + Math.round(S.Q) + ' J', mono: 1 }, { t: 'بالسعرات: ' + Math.round(S.Q / 4.2) + ' سعرة', c: '#64748b' },
        { t: 'الجسم A: ' + Q44.nm(S.a), c: '#0f766e', w: 900 }, { t: 'Cp = ' + cA + ' J/kg.°C', mono: 1, c: '#0f766e' }, { t: 'ΔT = Q / (m Cp) = ' + (S.TA - S.T0).toFixed(1) + ' °C', mono: 1 },
        { t: 'الجسم B: ' + Q44.nm(S.b), c: '#c2410c', w: 900 }, { t: 'Cp = ' + cB + ' J/kg.°C', mono: 1, c: '#c2410c' }, { t: 'ΔT = Q / (m Cp) = ' + (S.TB - S.T0).toFixed(1) + ' °C', mono: 1 },
        { t: S.msg || 'الأقل m × Cp يسخن أسرع', c: '#b91c1c', w: 900 }], { title: 'Q = m Cp ΔT', y: 70, wd: 312 }); }
      Q42.banner(ctx, w, 'اختر المادتين واسحب مقبضي الكتلة، ثم اضغط «▶ سخّن»');
    },
    chips(S, g) {
      const mid = g.L + (g.w - 12 - g.L) / 2;
      return { a: Q42.chips(S, 'ma', MATS.map(k => [k, Q44.nm(k)]), g.h - 172, S.a, (S2, k) => { S2.a = k; S2.ex = 0; D.reset(S2); }, { x1: mid - 6, col: '#0f766e' }),
        b: Q42.chips(S, 'mb', MATS.map(k => [k, Q44.nm(k)]), g.h - 172, S.b, (S2, k) => { S2.b = k; S2.ex = 0; D.reset(S2); }, { x0: mid + 6, col: '#c2410c' }),
        r: Q42.chips(S, 'run', [['go', S.run ? '⏸ أوقف' : '▶ سخّن'], ['re', '↺ أعد']], g.h - 128, '', (S2, k) => { if (k === 're') { S2.stop = 0; D.reset(S2); } else { if (Math.max(S2.TA, S2.TB) >= 100 || (S2.stop && S2.TA >= S2.stop)) return; S2.run = S2.run ? 0 : 1; S2.msg = ''; } }, { bw: 160 }),
        e: Q44.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 1: الألمنيوم', S2 => { S2.a = 'al'; S2.b = 'w'; setParam(S2, 'mA', 3); setParam(S2, 'mB', 3); S2.T0 = 15; S2.stop = 25; D.reset(S2); S2.run = 1; }, EX.lines.length) };
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      const sl = (id, x, k, tip) => Q41.sdrag(id, x - 62, x + 62, g.sy, (S.p[k] - .1) / 2.9, (S2, t) => setParam(S2, k, Math.round((.1 + t * 2.9) * 10) / 10), { tip, extra: id === 'mA' ? { idle: 'اسحب ✋' } : { hint: false } });
      const cyc = (id, x, k) => ({ id, x, y: g.py - 60, w: 110, h: 110, axis: 'none', hint: false, tip: 'اضغط لتغيير المادة', click: S2 => { S2[k] = MATS[(MATS.indexOf(S2[k]) + 1) % MATS.length]; S2.ex = 0; D.reset(S2); } });
      return [sl('mA', g.xa, 'mA', 'اسحب لتغيير كتلة A'), sl('mB', g.xb, 'mB', 'اسحب لتغيير كتلة B'), cyc('sa', g.xa, 'a'), cyc('sb', g.xb, 'b')].concat(C.a, C.b, C.r, C.e); },
    readings(S) { return [rd('كمية الحرارة لكل جسم Q', Math.round(S.Q) + ' J'), rd('الجسم A: ' + Q44.nm(S.a), 'ΔT = ' + (S.TA - S.T0).toFixed(1) + ' °C'), rd('الجسم B: ' + Q44.nm(S.b), 'ΔT = ' + (S.TB - S.T0).toFixed(1) + ' °C'), rd('قدرة المسخن', S.p.P + ' W')]; },
    record(S) { return { a: Q44.nm(S.a) + ' ' + S.p.mA + ' kg', b: Q44.nm(S.b) + ' ' + S.p.mB + ' kg', q: Math.round(S.Q), da: (S.TA - S.T0).toFixed(1), db: (S.TB - S.T0).toFixed(1) }; },
    cols: [['a', 'A'], ['b', 'B'], ['q', 'Q (J)'], ['da', 'ΔT A'], ['db', 'ΔT B']],
    explain(S) { return Q26.ex('الجسمان أخذا كمية الحرارة نفسها، لكن ارتفاع درجة حرارتيهما مختلف.', 'ΔT = Q / (m Cp): كلما صغرت الكتلة أو الحرارة النوعية كبر الارتفاع في درجة الحرارة. الحرارة تزيد الطاقة الحركية لجزيئات المادة فترتفع درجة حرارتها.', 'قدر الألمنيوم يسخن قبل الماء الذي فيه، والماء يستعمل لتبريد محركات السيارات لكبر حرارته النوعية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — السعة الحرارية C = m Cp (4-2، مثال 2 ص 55، سؤال ص 56) =============== */
(() => {
  const QS = [['al', .2], ['fe', .2232], ['st', .6]]; // C = 180, 100, 300 J/°C → ΔT = 5, 9, 3 for Q = 900 J
  const FREE = [['al', 1], ['fe', 1], ['cu', 1]], MATS = ['al', 'fe', 'cu', 'st', 'ag', 'gl', 'w'];
  const EX = { q: 'ما السعة الحرارية لقطعة من الحديد كتلتها 4 kg وحرارتها النوعية 448 J/kg.°C؟', lines: ['السعة الحرارية = الكتلة × الحرارة النوعية', 'C = m Cp', 'C = 4 × 448', 'C = 1792 J/°C'] };
  const D = { id: 'g10_t_cap', page: 53, fig: 'مثال 2 ص 55 + سؤال ص 56',
    desc: 'السعة الحرارية C لجسم: كمية الحرارة اللازمة لرفع درجة حرارة الجسم بكامله درجة سيليزية واحدة، C = m Cp ووحدتها J/°C، و Q = C ΔT. نزود ثلاث قطع معدنية بكمية الحرارة نفسها (بملف تسخين داخل كل قطعة) ونقرأ ارتفاع درجة حرارة كل منها: الأقل ارتفاعاً سعته الحرارية أكبر.',
    tags: 'السعة الحرارية C=mCp J/°C Q=CΔT الحرارة النوعية تعتمد على نوع المادة فقط حديد 4kg 1792 سؤال ثلاث قطع ΔT=5 9 3',
    tools: ['ثلاث قطع معدنية', 'ملفات تسخين متماثلة', 'محارير'],
    steps: ['اضغط «▶ زوّد الحرارة»: تأخذ كل قطعة كمية الحرارة نفسها Q.', 'اقرأ ΔT لكل قطعة (5 و 9 و 3 °C في سؤال الكتاب)، ثم اضغط على القطعة التي تظنها الأكبر سعة حرارية.', 'في الوضع الحر اضغط على القطعة لتغيير مادتها وغيّر الكتل من اللوحة.', 'اضغط «مثال 2» لحساب سعة قطعة الحديد 4 kg.'],
    concl: ['C = m Cp و Q = C ΔT: الجسم الأكبر سعة حرارية يرتفع أقل عند تزويده بالحرارة نفسها.', 'الحرارة النوعية تعتمد على نوع المادة فقط، أما السعة الحرارية فتعتمد على الكتلة والحرارة النوعية.', 'سؤال ص 56: القطعة التي ΔT = 3 °C سعتها الحرارية أكبر.', 'مثال 2: C = 1792 J/°C.'],
    laws: ['g10_h4_cap', 'g10_h4_q'],
    controls: [R('Q', 'كمية الحرارة المجهزة Q', 100, 3000, 900, 50, 'J'), TG('bars', 'أعمدة السعة الحرارية', true, null, 'chart')],
    setup(S) { S.md = 'q'; S.ex = 0; S.k = 0; S.pick = -1; D.load(S); },
    load(S) { const L = S.md === 'q' ? QS : S.md === 'ex' ? [['fe', 4]] : FREE; S.pc = L.map(q => ({ mk: q[0], m: q[1] })); S.q = 0; S.go = 0; S.T = S.pc.map(() => 20); S.pick = -1; S.clk = S.clk || 0; },
    C(p) { return p.m * Q44.M[p.mk][1]; },
    update(S, dt) { S.clk = (S.clk || 0) + dt; if (S.go) { S.q = Math.min(S.p.Q, S.q + S.p.Q * dt / 2); if (S.q >= S.p.Q) S.go = 0; } if (S.lq !== S.p.Q) { S.lq = S.p.Q; S.q = Math.min(S.q, S.p.Q); }
      S.pc.forEach((p, i) => { S.T[i] = Q44.ease(S.T[i], 20 + S.q / D.C(p), dt, 3); }); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), by = h * .52; const n = S.pc.length, x0 = L + 40, sp = n === 1 ? 0 : 140; return { w, h, L, by, x0, sp, n }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q44.bg(ctx, w, h); Q44.bench(ctx, g.L, g.L + 470, g.by + 2);
      const mx = Math.max(...S.pc.map(p => D.C(p)));
      S.pc.forEach((p, i) => { const x = g.n === 1 ? g.L + 200 : g.x0 + 40 + i * g.sp, s = g.n === 1 ? 130 : 90, C = D.C(p), dT = S.T[i] - 20;
        Q44.block(ctx, x - s / 2, g.by - s, s, s, p.mk, S.T[i] + (S.go ? 40 : 0));
        K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - s / 2 - 4, g.by - s * .5); ctx.lineTo(x - s / 2 - 22, g.by - s * .5); ctx.lineTo(x - s / 2 - 22, g.by + 30); ctx.stroke(); ctx.strokeStyle = '#1e293b'; ctx.beginPath(); ctx.moveTo(x - s / 2 - 4, g.by - s * .3); ctx.lineTo(x - s / 2 - 14, g.by - s * .3); ctx.lineTo(x - s / 2 - 14, g.by + 30); ctx.stroke(); });
        if (S.go) Q44.heat(ctx, x - s / 2 - 30, g.by + 20, 22, -40, S.clk, '#ef4444', 2);
        Q44.thermo(ctx, x + s * .2, g.by - s * .4, 160, S.T[i], 0, 60, { step: 10, col: '#0369a1' });
        Q44.T(ctx, Q44.nm(p.mk) + ' ' + p.m + ' kg', x, g.by + 32, { s: 11.5, w: 900, c: '#334155' });
        Q44.T(ctx, 'ΔT = ' + dT.toFixed(1) + ' °C', x, g.by + 56, { s: 12.5, w: 900, c: '#fff', bg: S.pick === i ? (D.best(S) === i ? '#16a34a' : '#dc2626') : '#0f766e' });
        if (S.p.bars) { const bh = 120 * C / mx; K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.by + 180 - bh, 0, g.by + 180); gg.addColorStop(0, '#a78bfa'); gg.addColorStop(1, '#6d28d9'); ctx.fillStyle = gg; rr(ctx, x - 22, g.by + 182 - bh, 44, bh, 4); ctx.fill(); }); Q44.T(ctx, 'C = ' + Math.round(C) + ' J/°C', x, g.by + 194, { s: 10.5, w: 900, c: '#6d28d9' }); }
      });
      if (S.pick >= 0) Q44.T(ctx, S.pick === D.best(S) ? 'صحيح: أقل ΔT ⟸ أكبر سعة حرارية' : 'حاول ثانية: ابحث عن أقل ΔT', g.L + 230, g.by - 230, { s: 12.5, w: 900, c: '#fff', bg: S.pick === D.best(S) ? '#16a34a' : '#dc2626' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.r); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      if (S.ex) Q44.steps(ctx, S, Object.assign({ title: 'مثال 2 ص 55' }, EX, { k: S.k }), { y: 70, x: w - 12, wd: 300 });
      else Q44.card(ctx, S, [{ t: 'C = m Cp', mono: 1, w: 900, c: '#6d28d9' }, { t: 'Q = C ΔT = ' + Math.round(S.q) + ' J', mono: 1 }].concat(S.pc.map(p => ({ t: Q44.nm(p.mk) + ': C = ' + p.m + ' × ' + Q44.M[p.mk][1] + ' = ' + Math.round(D.C(p)) + ' J/°C', c: '#334155' }))).concat([{ t: 'الحرارة نفسها ⟸ ΔT أقل للسعة الأكبر', c: '#b91c1c', w: 900 }, { t: 'تذكر: Cp تعتمد على نوع المادة فقط', c: '#0f766e', w: 800 }]), { title: S.md === 'q' ? 'سؤال ص 56: أي القطع سعتها أكبر؟' : 'السعة الحرارية', y: 70, wd: 300 });
      Q42.banner(ctx, w, S.md === 'q' ? 'اضغط «▶ زوّد الحرارة» ثم اضغط على القطعة الأكبر سعة' : 'اضغط على القطعة لتغيير مادتها، ثم زوّدها بالحرارة');
    },
    best(S) { let b = 0; S.pc.forEach((p, i) => { if (D.C(p) > D.C(S.pc[b])) b = i; }); return b; },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['q', 'سؤال ص 56'], ['free', 'وضع حر']], g.h - 128, S.ex ? '' : S.md, (S2, k) => { S2.md = k; S2.ex = 0; D.load(S2); }, { bw: 150 }),
      r: Q42.chips(S, 'go', [['go', '▶ زوّد الحرارة'], ['re', '↺']], g.h - 128, '', (S2, k) => { if (k === 're') { S2.q = 0; S2.go = 0; S2.pick = -1; } else { S2.q = 0; S2.go = 1; } }, { bw: 150, x0: g.L + 320 }),
      e: Q44.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 2: الحديد', S2 => { S2.md = 'ex'; D.load(S2); S2.go = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return S.pc.map((p, i) => { const x = g.n === 1 ? g.L + 200 : g.x0 + 40 + i * g.sp, s = g.n === 1 ? 130 : 90; return { id: 'pc' + i, x, y: g.by - s / 2, w: s, h: s, axis: 'none', hint: i ? false : undefined, idle: i ? undefined : 'اضغط ✋', tip: S.md === 'q' ? 'اضغط إذا كانت هذه الأكبر سعة' : 'اضغط لتغيير المادة', click: S2 => { if (S2.md === 'q') { S2.pick = i; if (S2.q < S2.p.Q) S2.go = 1; } else if (S2.md === 'free') { const pp = S2.pc[i]; pp.mk = MATS[(MATS.indexOf(pp.mk) + 1) % MATS.length]; S2.q = 0; S2.go = 0; } } }; }).concat(C.m, C.r, C.e); },
    readings(S) { return [rd('كمية الحرارة Q', Math.round(S.q) + ' J')].concat(S.pc.map(p => rd(Q44.nm(p.mk) + ' ' + p.m + ' kg', 'C = ' + Math.round(D.C(p)) + ' J/°C'))); },
    explain(S) { return Q26.ex('القطع أخذت الحرارة نفسها، فارتفعت درجة حرارة بعضها أكثر من غيرها.', 'ΔT = Q / C: القطعة ذات السعة الحرارية الأكبر (كتلة أكبر أو حرارة نوعية أكبر) تحتاج حرارة أكثر لكل درجة، فيكون ارتفاعها أقل.', 'عود الثقاب المحترق ينتج قرابة 2000 J فقط، لذا لا يكفي لتسخين قدر كبير من الماء.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — الاتزان الحراري: المسعر بالمحرك والمحرار (4-3، الشكلان 3-4 و 4-4، المثالان ص 57–58 ، مسألة 3) =============== */
(() => {
  const CW = 4200, HOT = [['al', 'ألمنيوم'], ['cu', 'نحاس'], ['fe', 'حديد'], ['w', 'ماء ساخن']];
  const PR = {
    e1: { t: 'مثال 1 ص 57', m1: 1, T1: 20, mk: 'al', m2: .5, T2: 100, Cc: 0, q: 'مكعب ألمنيوم 0.5 kg بدرجة 100 °C وضع في 1 kg ماء بدرجة 20 °C. احسب درجة الحرارة النهائية (Cw = 4200 ، CA = 900 J/kg.°C)',
      lines: ['نفرض درجة الحرارة النهائية Tf', 'الحرارة المفقودة من الألمنيوم = الحرارة المكتسبة للماء', 'mw Cw (Tf − 20) = mA CA (100 − Tf)', '1 × 4200 (Tf − 20) = 0.5 × 900 (100 − Tf)', '4200 Tf − 84000 = 45000 − 450 Tf', 'Tf = 129000 / 4650', 'Tf = 27.7 °C'] },
    e2: { t: 'مثال 2 ص 58', m1: .1, T1: 10, mk: 'w', m2: .1, T2: 80, Cc: 210, q: 'مسعر نحاس فيه 100 g ماء بدرجة 10 °C أضيف إليه 100 g ماء بدرجة 80 °C فأصبحت درجة الخليط 38 °C. احسب السعة الحرارية للمسعر',
      lines: ['الحرارة المكتسبة: الماء البارد والمسعر', 'Q₁ = 0.1 × 4200 × (38 − 10) = 11760 J', 'Q₂ = C (38 − 10) = 28 C', 'الحرارة المفقودة: الماء الساخن', 'Q₃ = 0.1 × 4200 × (38 − 80) = −17640 J', '17640 = 11760 + 28 C', 'C = 5880 / 28', 'C = 210 J/°C'] },
    p3: { t: 'مسألة 3 ص 82', m1: .5, T1: 10, mk: 'w', m2: 1, T2: 80, Cc: 50, q: 'إناء سعته الحرارية 50 J/°C فيه 0.5 kg ماء بدرجة 10 °C أضيف إليه 1 kg ماء بدرجة 80 °C. كم تصبح درجة حرارة الخليط؟',
      lines: ['الحرارة المكتسبة = الحرارة المفقودة', '0.5 × 4200 (Tf − 10) + 50 (Tf − 10) = 1 × 4200 (80 − Tf)', '2150 (Tf − 10) = 4200 (80 − Tf)', '6350 Tf = 21500 + 336000', 'Tf = 357500 / 6350', 'Tf = 56.3 °C'] } };
  const D = { id: 'g10_t_calor', page: 56, fig: 'الشكلان 3-4 و 4-4 + المثالان ص 57–58',
    desc: 'الحرارة لا تفنى ولا تستحدث بل تنتقل من الجسم الساخن إلى البارد حتى تتساوى درجتا حرارتيهما (اتزان حراري)، وفي النظام المعزول: الحرارة المفقودة = الحرارة المكتسبة. المسعر وعاء رقيق من النحاس داخل وعاء آخر من الفلز نفسه بينهما مادة عازلة (لباد أو نشارة خشب)، وله غطاء فيه فتحتان: الأولى للمحرار والثانية للمحرك.',
    tags: 'الاتزان الحراري المسعر طريقة المزج الحرارة المفقودة = المكتسبة محرك محرار لباد عازل 27.7 210 56.3 السعة الحرارية للمسعر',
    tools: ['مسعر نحاسي معزول بلباد', 'محرك ومحرار', 'مكعب ألمنيوم في ماء يغلي', 'ماء ساخن وماء بارد'],
    steps: ['اختر مثالاً أو الوضع الحر. اسحب الجسم الساخن (أو دورق الماء الساخن) وأفلته فوق فتحة المسعر.', 'حرّك المحرك الأحمر إلى الأعلى والأسفل: يتسارع تبادل الحرارة.', 'راقب منحني درجتي الحرارة: يقتربان حتى يتساويا عند Tf (اتزان حراري).', 'أطفئ «عزل المسعر» لترى أن ضياع الحرارة إلى المحيط يجعل Tf أقل من المحسوبة.', 'اضغط «الحل خطوة خطوة» وقارن النتيجة بقراءة المحرار.'],
    concl: ['عند الاتزان الحراري تتساوى درجتا حرارة الجسمين.', 'في النظام المعزول: الحرارة المفقودة = الحرارة المكتسبة.', 'مثال 1: Tf = 27.7 °C. مثال 2: سعة المسعر 210 J/°C. مسألة 3: Tf = 56.3 °C.', 'المحرك يسرّع الوصول إلى الاتزان والعزل يمنع ضياع الحرارة إلى المحيط.'],
    laws: ['g10_h4_mix', 'g10_h4_q', 'g10_h4_cap'],
    controls: [R('m1', 'كتلة الماء البارد m₁', .1, 1.5, 1, .05, 'kg'), R('T1', 'درجة حرارة الماء البارد', 0, 40, 20, 1, '°C'), R('m2', 'كتلة الجسم الساخن m₂', .1, 1.5, .5, .05, 'kg'), R('T2', 'درجة حرارة الجسم الساخن', 40, 100, 100, 1, '°C'), R('Cc', 'السعة الحرارية للمسعر', 0, 400, 0, 10, 'J/°C'), TG('ins', 'عزل المسعر (بدون ضياع)', true, null, 'shield')],
    setup(S) { S.pr = 'e1'; S.ex = 0; S.k = 0; S.mk = 'al'; S.clk = 0; D.load(S, 'e1'); },
    load(S, k) { S.pr = k; const P = PR[k]; if (P) { ['m1', 'T1', 'm2', 'T2', 'Cc'].forEach(q => setParam(S, q, P[q])); S.mk = P.mk; } D.reset(S); },
    reset(S) { S.Th = S.p.T2; S.Tc = S.p.T1; S.dT = S.p.T1; S.st = 0; S.in = 0; S.pour = 0; S.stir = 0; S.sy = 0; S.hx = 0; S.hy = 0; S.hist = []; S.ht = 0; S.sig = D.sig(S); },
    sig(S) { return [S.p.m1, S.p.T1, S.p.m2, S.p.T2, S.p.Cc, S.mk].join(','); },
    c2(S) { return S.mk === 'w' ? CW : Q44.M[S.mk][1]; },
    Tf(S) { const a = S.p.m1 * CW + S.p.Cc, b = S.p.m2 * D.c2(S); return (a * S.p.T1 + b * S.p.T2) / (a + b); },
    update(S, dt) {
      S.clk += dt; if (S.sig !== D.sig(S)) { if (PR[S.pr] && D.sig(S) !== [PR[S.pr].m1, PR[S.pr].T1, PR[S.pr].m2, PR[S.pr].T2, PR[S.pr].Cc, PR[S.pr].mk].join(',')) { S.pr = 'free'; S.ex = 0; } D.reset(S); }
      if (S.st === 1) { S.in = Math.min(1, S.in + dt * 1.6); S.pour = S.mk === 'w' ? S.in : 0; if (S.in >= 1) S.st = 2; }
      const H = S.p.m2 * D.c2(S), Cc = S.p.m1 * CW + S.p.Cc;
      if (S.st >= 1) { const k = (S.mk === 'w' ? .9 : .45) * (S.st === 1 ? S.in : 1) + 2.4 * S.stir, n = 4; for (let i = 0; i < n; i++) { const q = k * (S.Th - S.Tc) * Math.min(H, Cc) * dt / n; S.Th -= q / H; S.Tc += q / Cc; } }
      if (!S.p.ins) { const l = .05 * dt; S.Tc -= l * (S.Tc - 22); if (S.st >= 1) S.Th -= l * (S.Th - 22) * .3; } else if (S.st === 0) { S.Th = S.p.T2; }
      S.stir = Math.max(0, S.stir - dt * .8); S.dT = Q44.ease(S.dT, S.Tc, dt, 2);
      if (S.st >= 1) { S.ht += dt; if (!S.hist.length || S.ht - S.hist[S.hist.length - 1][0] > .12) { S.hist.push([S.ht, S.Th, S.Tc]); if (S.hist.length > 400) S.hist.shift(); } }
    },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), cb = h * .62, cx = L + 285, bx = L + 70; return { w, h, L, cb, cx, bx, top: cb - 190 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), mw = S.mk === 'w', Tf = D.Tf(S), m1 = S.p.m1, m2 = S.p.m2; Q44.bg(ctx, w, h); Q44.bench(ctx, g.L, g.cx + 120, g.cb + 8);
      // hot source: bath with burner (metal) or beaker of hot water on burner
      Q44.burner(ctx, g.bx, g.cb - 34, .8, S.clk); K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(g.bx - 48, g.cb - 104, 96, 6); ctx.fillRect(g.bx - 46, g.cb - 104, 5, 112); ctx.fillRect(g.bx + 41, g.cb - 104, 5, 112); });
      const bY = g.cb - 104; if (!mw) K.beaker(ctx, g.bx, bY, 84, 110, .7, { liq: '#38bdf8', liqA: .5 });
      if (!mw) { for (let i = 0; i < 6; i++) { const ph = (S.clk * 1.3 + i / 6) % 1; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.arc(g.bx - 30 + i * 12, bY - 6 - ph * 64, 2.5 + ph * 2, 0, TAU); ctx.fill(); }); } Q44.T(ctx, 'ماء يغلي 100 °C', g.bx, g.cb + 30, { s: 10.5, w: 900, c: '#fff', bg: '#0369a1' }); }
      // calorimeter cross-section
      const ow = 200, oh = 190, iw = 148, ih = 160, ix = g.cx - iw / 2, iy = g.cb - 10 - ih;
      K.raw(ctx, () => { const go = ctx.createLinearGradient(g.cx - ow / 2, 0, g.cx + ow / 2, 0); go.addColorStop(0, '#9a3412'); go.addColorStop(.35, '#fb923c'); go.addColorStop(1, '#7c2d12'); ctx.fillStyle = go; rr(ctx, g.cx - ow / 2, g.cb - oh, ow, oh, 8); ctx.fill();
        ctx.fillStyle = '#d6c7a1'; ctx.fillRect(g.cx - ow / 2 + 7, g.cb - oh + 6, ow - 14, oh - 12); ctx.strokeStyle = 'rgba(120,53,15,.35)'; ctx.lineWidth = 1; for (let k = 0; k < 26; k++) { const yy = g.cb - oh + 10 + k * 7; ctx.beginPath(); ctx.moveTo(g.cx - ow / 2 + 8, yy); ctx.lineTo(g.cx - ow / 2 + 22, yy + 5); ctx.moveTo(g.cx + ow / 2 - 22, yy); ctx.lineTo(g.cx + ow / 2 - 8, yy + 5); ctx.stroke(); }
        ctx.fillStyle = '#fff7ed'; ctx.fillRect(ix, iy, iw, ih); });
      const lv = clamp((m1 + (mw ? m2 * S.pour : 0)) / 2.2, .06, .9), wy = iy + ih - ih * lv;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(56,189,248,.5)'; ctx.fillRect(ix + 3, wy, iw - 6, iy + ih - wy - 3); const a = clamp((S.Tc - 25) / 90, 0, .4); if (a > 0) { ctx.fillStyle = 'rgba(249,115,22,' + a + ')'; ctx.fillRect(ix + 3, wy, iw - 6, iy + ih - wy - 3); }
        if (mw && S.st >= 1) { ctx.save(); ctx.beginPath(); ctx.rect(ix + 3, wy, iw - 6, iy + ih - wy - 3); ctx.clip(); const d = clamp((S.Th - S.Tc) / Math.max(1, S.p.T2 - S.p.T1), 0, 1); ctx.fillStyle = 'rgba(239,68,68,' + (.45 * d) + ')'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(g.cx - 40 + i * 20 + Math.sin(S.clk * 2 + i) * 8, wy + 12 + i * 7, 26, 9, Math.sin(S.clk + i), 0, TAU); ctx.fill(); } ctx.restore(); }
        const gi = ctx.createLinearGradient(ix - 6, 0, ix + iw + 6, 0); gi.addColorStop(0, '#b45309'); gi.addColorStop(.4, '#fdba74'); gi.addColorStop(1, '#9a3412'); ctx.strokeStyle = gi; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ix, iy - 4); ctx.lineTo(ix, iy + ih); ctx.lineTo(ix + iw, iy + ih); ctx.lineTo(ix + iw, iy - 4); ctx.stroke();
        ctx.fillStyle = '#7c2d12'; rr(ctx, g.cx - ow / 2 - 6, g.cb - oh - 12, ow + 12, 12, 4); ctx.fill(); ctx.fillStyle = '#fff7ed'; ctx.fillRect(g.cx - 52, g.cb - oh - 12, 22, 12); ctx.fillRect(g.cx + 30, g.cb - oh - 12, 20, 12); ctx.fillRect(g.cx - 14, g.cb - oh - 12, 34, 12); });
      // stirrer (ring + rod)
      const sy = S.sy * 50, ry = clamp(wy + 30 + sy, iy + 20, iy + ih - 14);
      K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.cx - 41, ry); ctx.lineTo(g.cx - 41, g.cb - oh - 70 + sy); ctx.stroke(); ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(g.cx - 10, ry, 56, 6, 0, 0, TAU); ctx.stroke(); ctx.fillStyle = '#dc2626'; rr(ctx, g.cx - 58, g.cb - oh - 84 + sy, 34, 16, 5); ctx.fill(); });
      Q44.thermo(ctx, g.cx + 40, iy + ih - 22, 250, S.dT, 0, 100, { col: '#0369a1' });
      // hot body
      const hp = D.hpos(S, g);
      if (!mw) { if (S.st === 0) K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(hp.x, hp.y - 30); ctx.lineTo(hp.x, hp.y - 120); ctx.stroke(); }); const s = 26 + 26 * Math.cbrt(m2); Q44.block(ctx, hp.x - s / 2, hp.y - s / 2, s, s, S.mk, S.Th, 6); if (S.st === 0) Q44.T(ctx, Q44.nm(S.mk) + ' ' + S.Th.toFixed(0) + ' °C', hp.x, hp.y - 100, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' }); }
      else if (S.st < 2) { const lvh = (.25 + m2 * .45) * (1 - S.pour); K.raw(ctx, () => { ctx.save(); ctx.translate(hp.x, hp.y); const a = S.in * 1.5; ctx.rotate(a); K.beaker(ctx, 0, 55, 84, 110, Math.max(0, lvh), { liq: '#f97316', liqA: .5 }); ctx.restore(); if (S.st === 1 && S.in > .35) { const lx = hp.x + 46 * Math.cos(a) + 55 * Math.sin(a), ly = hp.y + 46 * Math.sin(a) - 55 * Math.cos(a); ctx.strokeStyle = 'rgba(249,115,22,.75)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.quadraticCurveTo(lx + 14, ly + 10, lx + 12, wy); ctx.stroke(); } }); if (S.st === 0) Q44.T(ctx, 'ماء ساخن ' + S.p.T2 + ' °C', hp.x, hp.y - 74, { s: 11, w: 900, c: '#fff', bg: '#c2410c' }); }
      Q44.T(ctx, 'مقطع المسعر: نحاس + لباد عازل', g.cx, g.cb + 30, { s: 10.5, w: 800, c: '#7c2d12' });
      if (S.st >= 1 && Math.abs(S.Th - S.Tc) < .08) Q44.T(ctx, 'اتزان حراري: Tf = ' + S.Tc.toFixed(1) + ' °C', g.cx, g.top - 74, { s: 13, w: 900, c: '#fff', bg: '#16a34a' });
      // graph of both temperatures (fig 3-4)
      const A = { x: w - 300, y: 372, w: 270, h: 170, xmax: Math.max(10, Math.ceil(S.ht / 5) * 5 || 10), xs: 1, ymax: 100, ys: 10, lxs: 5, lys: 20, xl: 't (s)', yl: 'T (°C)' };
      const ax = Q41.axes(ctx, A); if (S.hist.length > 1) { Q41.line(ctx, S.hist.map(q => [ax.X(q[0]), ax.Y(q[1])]), '#dc2626', 2.4); Q41.line(ctx, S.hist.map(q => [ax.X(q[0]), ax.Y(q[2])]), '#0284c7', 2.4); }
      Q41.line(ctx, [[A.x, ax.Y(Tf)], [A.x + A.w, ax.Y(Tf)]], '#16a34a', 1.2, [5, 4]); Q44.T(ctx, 'Tf', A.x + A.w - 10, ax.Y(Tf) - 9, { s: 10, w: 900, c: '#16a34a' });
      Q44.T(ctx, 'الساخن', A.x + 40, A.y - 4, { s: 10, w: 900, c: '#dc2626' }); Q44.T(ctx, 'البارد', A.x + 100, A.y - 4, { s: 10, w: 900, c: '#0284c7' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.a); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      const P = PR[S.pr];
      if (S.ex && P) Q44.steps(ctx, S, { title: P.t, q: P.q, lines: P.lines, k: S.k }, { y: 70, x: w - 12, wd: 320 });
      else { const H = m2 * D.c2(S), Cc = m1 * CW + S.p.Cc; Q44.card(ctx, S, [{ t: 'الحرارة المفقودة = الحرارة المكتسبة', w: 900, c: '#0f766e' }, { t: 'الساخن: m₂ c₂ = ' + Math.round(H) + ' J/°C', c: '#dc2626' }, { t: 'البارد: m₁ cw + C = ' + Math.round(Cc) + ' J/°C', c: '#0284c7' }, { t: 'Tf = ' + Tf.toFixed(1) + ' °C', mono: 1, w: 900, c: '#16a34a' }, { t: 'قراءة المحرار: ' + S.dT.toFixed(1) + ' °C', c: '#334155', w: 800 }].concat(S.p.ins ? [] : [{ t: 'تضيع حرارة إلى المحيط!', c: '#b91c1c', w: 900 }]), { title: P ? P.t : 'المسعر: طريقة المزج', y: 70, wd: 320 }); }
      Q42.banner(ctx, w, S.st ? 'حرّك المحرك الأحمر لأعلى وأسفل وراقب المحرار' : (mw ? 'اسحب دورق الماء الساخن فوق المسعر لتسكبه' : 'اسحب المكعب الساخن وأفلته فوق فتحة المسعر'));
    },
    hpos(S, g) { if (S.st >= 1 && S.mk !== 'w') { const y0 = g.top - 40, y1 = g.cb - 50; return { x: g.cx, y: y0 + (y1 - y0) * S.in }; } if (S.st >= 1) return { x: g.cx - 110, y: g.top - 40 }; return { x: g.bx + S.hx, y: (S.mk === 'w' ? g.cb - 159 : g.cb - 150) + S.hy }; },
    drop(S) { if (S.st === 0) { S.st = 1; S.in = 0; S.hist = []; S.ht = 0; } },
    chips(S, g) { return { p: Q42.chips(S, 'pr', [['e1', 'مثال 1: مكعب ألمنيوم'], ['e2', 'مثال 2: سعة المسعر'], ['p3', 'مسألة 3: الإناء'], ['free', 'حر']], g.h - 128, S.pr, (S2, k) => { S2.ex = 0; if (k === 'free') { S2.pr = 'free'; D.reset(S2); } else D.load(S2, k); }, { bw: 170 }),
      a: Q42.chips(S, 'act', [['in', S.mk === 'w' ? '⬇ اسكب الماء الساخن' : '⬇ أدخل المكعب'], ['re', '↺ أعد']], g.h - 84, '', (S2, k) => { if (k === 're') D.reset(S2); else D.drop(S2); }, { bw: 170, x0: g.L + 340 }),
      e: Q44.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { if (!PR[S2.pr]) D.load(S2, 'e1'); }, 9) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), hp = D.hpos(S, g), mw = S.mk === 'w', oh = 190;
      const L = [];
      if (S.st === 0) L.push({ id: 'hot', x: hp.x, y: hp.y, r: 38, axis: 'xy', keep: true, tip: mw ? 'اسحب الدورق فوق المسعر' : 'اسحب المكعب فوق المسعر', idle: 'اسحب ✋', drag: (S2, d) => { S2.hx = clamp(d.x - g.bx, -40, g.cx - g.bx + 40); S2.hy = clamp(d.y - (mw ? g.cb - 159 : g.cb - 150), -160, 20); if (Math.abs(g.bx + S2.hx - g.cx) < 60) D.drop(S2); }, up: S2 => { if (S2.st === 0) { S2.hx = 0; S2.hy = 0; } }, click: S2 => { if (S2.st === 0) { const i = HOT.findIndex(q => q[0] === S2.mk); S2.mk = HOT[(i + 1) % HOT.length][0]; } } });
      L.push({ id: 'stir', x: g.cx - 41, y: g.cb - oh - 76 + S.sy * 50, r: 20, axis: 'y', keep: true, hint: S.st === 0 ? false : undefined, idle: S.st ? 'حرّك ✋' : undefined, tip: 'حرّك المحرك لأعلى وأسفل', drag: (S2, d) => { const ny = clamp((d.y - (g.cb - oh - 76)) / 50, -.6, .6); S2.stir = Math.min(1, S2.stir + Math.abs(ny - S2.sy) * .8); S2.sy = ny; } });
      return L.concat(C.p, C.a, C.e); },
    readings(S) { return [rd('درجة حرارة الجسم الساخن', S.Th.toFixed(1) + ' °C'), rd('درجة حرارة الماء (المحرار)', S.dT.toFixed(1) + ' °C'), rd('Tf المحسوبة', D.Tf(S).toFixed(1) + ' °C'), rd('السعة الحرارية للمسعر', S.p.Cc + ' J/°C')]; },
    record(S) { return { m1: S.p.m1, T1: S.p.T1, b: Q44.nm(S.mk) + ' ' + S.p.m2 + ' kg', T2: S.p.T2, Tf: S.dT.toFixed(1) }; },
    cols: [['m1', 'm₁ (kg)'], ['T1', 'T₁ (°C)'], ['b', 'الجسم الساخن'], ['T2', 'T₂ (°C)'], ['Tf', 'Tf (°C)']],
    explain(S) { return Q26.ex('درجة حرارة الجسم الساخن تنخفض ودرجة حرارة الماء ترتفع حتى تتساويا، والتحريك يسرّع ذلك.', 'تنتقل الحرارة من الساخن إلى البارد ما دام بينهما فرق في درجة الحرارة، وفي النظام المعزول لا تضيع حرارة فتكون الحرارة المفقودة مساوية للمكتسبة.', 'نضيف ماءً بارداً إلى الشاي الساخن ليبرد، والترموس يعزل السائل عن المحيط.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — التمدد الطولي: ثلاث سيقان في فرن ومؤشرات مكبّرة (4-4 a، الأشكال 5-4 و 6-4، الجدول 2، س2-1 ص 81) =============== */
(() => {
  const OPT = [['al', 'ألمنيوم'], ['cu', 'نحاس'], ['st', 'فولاذ'], ['gl', 'زجاج'], ['pb', 'رصاص'], ['con', 'إسمنت']];
  const EX = { q: 'ثلاث قضبان من النحاس والفولاذ والألمنيوم متساوية في الطول عند 0 °C. أيها يكون أطول عند 250 °C؟', lines: ['ΔL = α L ΔT ، و L و ΔT متساويان للقضبان الثلاثة', 'إذن ΔL يتناسب مع α', 'α للألمنيوم 24×10⁻⁶ ، للنحاس 17×10⁻⁶ ، للفولاذ 12×10⁻⁶', 'الألمنيوم أطولها عند 250 °C'] };
  const D = { id: 'g10_t_lin', page: 59, fig: 'الأشكال 5-4 و 6-4 + الجدول 2 + س2-1 ص 81',
    desc: 'عند تسخين ساق يزداد طولها: التغير في الطول يتناسب طردياً مع الطول الأصلي ومع التغير في درجة الحرارة ويعتمد على نوع المادة: ΔL = α L ΔT. معامل التمدد الطولي α مقدار الزيادة في وحدة الأطوال عند التسخين درجة سيليزية واحدة (1/°C). نضع ثلاث سيقان مختلفة في فرن، طرف كل منها مثبت والطرف الآخر يدير مؤشراً يكبّر التمدد.',
    tags: 'التمدد الطولي ΔL=αLΔT معامل التمدد الطولي α ألمنيوم نحاس فولاذ زجاج رصاص إسمنت الجدول 2 γ=2α β=3α مؤشر فرن',
    tools: ['ثلاث سيقان متساوية الطول من مواد مختلفة', 'فرن كهربائي بمحرار', 'مؤشرات مكبّرة على تدريج بالمليمتر'],
    steps: ['اسحب مقبض الفرن لرفع درجة الحرارة: تتحرك المؤشرات ببطء مع تمدد السيقان.', 'قارن المؤشرات: الساق ذات α الأكبر تتمدد أكثر (الجدول 2).', 'اضغط على أي ساق لتغيير مادتها، وغيّر الطول الأصلي L من اللوحة: يتضاعف ΔL بمضاعفة L.', 'اضغط «س1 ص 81» لحل سؤال القضبان الثلاثة عند 250 °C.'],
    concl: ['ΔL = α L ΔT: التمدد الطولي يتناسب مع الطول الأصلي ومع ΔT ويعتمد على نوع المادة.', 'α للألمنيوم 24×10⁻⁶ وللنحاس 17×10⁻⁶ وللفولاذ والإسمنت 12×10⁻⁶ وللزجاج 9×10⁻⁶ /°C.', 'معامل التمدد السطحي γ = 2α ومعامل التمدد الحجمي β = 3α.', 'الفولاذ والإسمنت لهما α نفسه، لذا يتمددان معاً في الإسمنت المسلح.'],
    laws: ['g10_h4_lin', 'g10_h4_area', 'g10_h4_vol'],
    controls: [SEL('r0', 'الساق 1', OPT, 'al'), SEL('r1', 'الساق 2', OPT, 'cu'), SEL('r2', 'الساق 3', OPT, 'st'), R('L0', 'الطول الأصلي L', .5, 2, 1, .1, 'm')],
    setup(S) { S.Tt = 20; S.T = 20; S.Tr = 20; S.ex = 0; S.k = 0; S.clk = 0; S.d = [0, 0, 0]; },
    dL(S, i, T) { return Q44.M[S.p['r' + i]][3] * S.p.L0 * (T - S.Tr) * 1000; }, // mm
    update(S, dt) { S.clk += dt; S.T = Q44.ease(S.T, S.Tt, dt, .6); if (Math.abs(S.T - S.Tt) < .05) S.T = S.Tt; for (let i = 0; i < 3; i++) S.d[i] = Q44.ease(S.d[i], D.dL(S, i, S.T), dt, 4); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 46, len: 300, ys: [178, 268, 358], ox0: L + 86, ox1: L + 316, oy0: 128, oy1: 402, dx: L + 398, sy: 470 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), T = S.T; Q44.bg(ctx, w, h);
      // oven
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.oy0, 0, g.oy1); gg.addColorStop(0, '#334155'); gg.addColorStop(1, '#0f172a'); ctx.fillStyle = gg; rr(ctx, g.ox0, g.oy0, g.ox1 - g.ox0, g.oy1 - g.oy0, 10); ctx.fill();
        ctx.fillStyle = 'rgba(15,23,42,.65)'; ctx.fillRect(g.ox0 + 10, g.oy0 + 10, g.ox1 - g.ox0 - 20, g.oy1 - g.oy0 - 20); const a = clamp((T - 30) / 280, 0, 1);
        ctx.strokeStyle = 'rgba(248,113,113,' + (.25 + .75 * a) + ')'; ctx.lineWidth = 3; ctx.save(); ctx.shadowColor = '#f87171'; ctx.shadowBlur = 12 * a; [g.oy0 + 22, g.oy1 - 22].forEach(y => { ctx.beginPath(); for (let x = g.ox0 + 20; x <= g.ox1 - 20; x += 2) ctx.lineTo(x, y + Math.sin(x / 4) * 4); ctx.stroke(); }); ctx.restore();
        if (a > 0) { ctx.fillStyle = 'rgba(249,115,22,' + (.18 * a) + ')'; ctx.fillRect(g.ox0 + 10, g.oy0 + 10, g.ox1 - g.ox0 - 20, g.oy1 - g.oy0 - 20); } });
      Q44.meter(ctx, (g.ox0 + g.ox1) / 2, g.oy0 - 20, 110, T.toFixed(0) + ' °C', '', '#f97316');
      // stand + rods + pointers
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.x0 - 18, g.oy0 - 10, 14, g.oy1 - g.oy0 + 20); });
      g.ys.forEach((y, i) => { const mk = S.p['r' + i], ex = S.d[i], ext = ex * 2.2; // px exaggeration for the free end
        Q44.rod(ctx, g.x0, y, g.len + ext, 14, mk, () => T);
        K.raw(ctx, () => { ctx.fillStyle = '#1e293b'; ctx.fillRect(g.x0 - 8, y - 12, 12, 24); ctx.fillStyle = '#94a3b8'; ctx.fillRect(g.x0 - 6, y - 4, 8, 8); });
        const px = g.dx, rr0 = 7, ang = -Math.PI / 2 + clamp(ex / 15, -.25, 1.15) * Math.PI * .85;
        K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(px, y, 34, -Math.PI / 2 - .25, -Math.PI / 2 + Math.PI * .85 + .05); ctx.stroke();
          for (let m = 0; m <= 15; m++) { const a = -Math.PI / 2 + m / 15 * Math.PI * .85, L2 = m % 5 ? 4 : 8; ctx.beginPath(); ctx.moveTo(px + Math.cos(a) * 34, y + Math.sin(a) * 34); ctx.lineTo(px + Math.cos(a) * (34 - L2), y + Math.sin(a) * (34 - L2)); ctx.stroke(); }
          ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(px, y + 12, rr0, 0, TAU); ctx.fill(); ctx.fillStyle = '#334155'; ctx.fillRect(px - 2, y + 18, 4, 18);
          ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(px, y + 2); ctx.lineTo(px + Math.cos(ang) * 30, y + 2 + Math.sin(ang) * 30); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(px, y + 2, 3, 0, TAU); ctx.fill(); });
        Q44.T(ctx, '0', px, y - 42, { s: 8.5, w: 800, c: '#334155' }); Q44.T(ctx, '15', px + 22, y + 40, { s: 8.5, w: 800, c: '#334155' });
        Q44.T(ctx, 'الساق ' + (i + 1) + ': ' + Q44.nm(mk), g.x0 + 50, y - 20, { s: 11, w: 900, c: '#fff', bg: shade(Q44.M[mk][2][1], -25) });
        Q44.T(ctx, 'ΔL = ' + ex.toFixed(2) + ' mm', px - 70, y + 24, { s: 10.5, w: 900, c: '#b91c1c' });
      });
      Q44.slider(ctx, g.ox0, g.ox1 + 60, g.sy, T >= 0 ? S.Tt / 300 : 0, 'مقبض الفرن: ' + Math.round(S.Tt) + ' °C', '#ea580c');
      Q44.T(ctx, 'L = ' + S.p.L0.toFixed(1) + ' m', (g.ox0 + g.ox1) / 2, g.oy1 + 22, { s: 11.5, w: 900, c: '#334155' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.t); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      if (S.ex) Q44.steps(ctx, S, Object.assign({ title: 'س2-1 ص 81' }, EX, { k: S.k }), { y: 70, x: w - 12, wd: 292 });
      else Q44.card(ctx, S, [{ t: 'ΔL = α L ΔT', mono: 1, w: 900, c: '#0f766e' }, { t: 'ΔT = ' + (T - S.Tr).toFixed(0) + ' °C ، L = ' + S.p.L0.toFixed(1) + ' m', mono: 1 }].concat([].concat(...[0, 1, 2].map(i => [{ t: Q44.nm(S.p['r' + i]) + ': α = ' + Math.round(Q44.M[S.p['r' + i]][3] * 1e6) + '×10⁻⁶ /°C', c: '#334155', w: 800 }, { t: 'ΔL = ' + D.dL(S, i, T).toFixed(2) + ' mm', mono: 1, c: '#b91c1c' }]))).concat([{ t: 'γ = 2α ، β = 3α', mono: 1, c: '#7c3aed', w: 900 }, { t: 'الأكبر α يتمدد أكثر', c: '#b91c1c', w: 900 }]), { title: 'التمدد الطولي — الجدول 2', y: 70, wd: 292 });
      Q42.banner(ctx, w, 'اسحب مقبض الفرن، واضغط على أي ساق لتغيير مادتها');
    },
    chips(S, g) { return { t: Q42.chips(S, 'tt', [['0', Q44.iso('برّد إلى 0 °C')], ['100', Q44.iso('سخّن إلى 100 °C')], ['250', Q44.iso('سخّن إلى 250 °C')]], g.h - 128, String(S.Tt), (S2, k) => { S2.Tt = +k; S2.ex = 0; }, { bw: 160 }),
      e: Q44.stepChips(S, 'ex', g.h - 84, g.L, 'س1 ص 81: أيها أطول؟', S2 => { setParam(S2, 'r0', 'cu'); setParam(S2, 'r1', 'st'); setParam(S2, 'r2', 'al'); S2.Tr = 0; S2.T = 0; S2.Tt = 250; S2.d = [0, 0, 0]; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [Q41.sdrag('oven', g.ox0, g.ox1 + 60, g.sy, S.Tt / 300, (S2, t) => { S2.Tt = Math.round(t * 300 / 5) * 5; }, { tip: 'اسحب لتسخين الفرن', extra: { idle: 'اسحب ✋' } })]
        .concat(g.ys.map((y, i) => ({ id: 'rod' + i, x: g.x0 + g.len / 2 + 40, y, w: 160, h: 26, axis: 'none', hint: false, tip: 'اضغط لتغيير المادة', click: S2 => { const j = OPT.findIndex(q => q[0] === S2.p['r' + i]); setParam(S2, 'r' + i, OPT[(j + 1) % OPT.length][0]); } }))).concat(C.t, C.e); },
    readings(S) { return [rd('درجة حرارة الفرن', S.T.toFixed(0) + ' °C'), rd('الطول الأصلي', S.p.L0 + ' m')].concat([0, 1, 2].map(i => rd('ΔL ' + Q44.nm(S.p['r' + i]), D.dL(S, i, S.T).toFixed(3) + ' mm'))); },
    record(S) { return { T: S.T.toFixed(0), a: D.dL(S, 0, S.T).toFixed(2), b: D.dL(S, 1, S.T).toFixed(2), c: D.dL(S, 2, S.T).toFixed(2) }; },
    cols: [['T', 'T (°C)'], ['a', 'ΔL₁ (mm)'], ['b', 'ΔL₂ (mm)'], ['c', 'ΔL₃ (mm)']],
    explain(S) { return Q26.ex('كلما ارتفعت درجة حرارة الفرن تحركت المؤشرات، ومؤشر الألمنيوم يتحرك أكثر من الفولاذ والزجاج.', 'التسخين يزيد الطاقة الحركية للجزيئات فيزداد التباعد بينها فتتمدد الساق. ΔL = α L ΔT ، و α يختلف باختلاف المادة.', 'تترك فواصل في الجسور وسكك الحديد، ويُصنع الإسمنت المسلح من الفولاذ لأن لهما معامل التمدد نفسه تقريباً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — الكرة والحلقة: التمدد السطحي والحجمي (الشكلان 7-4 و 8-4، γ = 2α ، β = 3α) =============== */
(() => {
  const AL = 19e-6, D0 = 25.0, d0 = 25.04, RB = 22; // brass ball and ring (mm), ball radius px
  const D = { id: 'g10_t_ball', page: 60, fig: 'الشكلان 7-4 و 8-4',
    desc: 'تجربة الكرة والحلقة: كرة نحاسية تمر بالكاد خلال حلقة عند درجة حرارة الغرفة. عند تسخين الكرة يزداد حجمها (تمدد حجمي ΔV = β V ΔT) فلا تمر، وعند تسخين الحلقة تزداد مساحة فتحتها (تمدد سطحي ΔA = γ A ΔT) فتمر الكرة الساخنة. γ = 2α و β = 3α.',
    tags: 'الكرة والحلقة التمدد السطحي ΔA=γAΔT γ=2α التمدد الحجمي ΔV=βVΔT β=3α فتحة الحلقة تتسع نحاس أصفر',
    tools: ['كرة نحاسية بمقبض عازل وسلسلة', 'حلقة نحاسية على حامل', 'مصباحان بنزن', 'كأس ماء بارد'],
    steps: ['اسحب الكرة إلى الأسفل خلال الحلقة: تمر بالكاد.', 'اسحب الكرة فوق لهب المصباح وانتظر حتى تسخن، ثم حاول إمرارها: لا تمر!', 'شغّل «تسخين الحلقة»: تتسع فتحتها فتمر الكرة الساخنة.', 'اغمس الكرة في الماء البارد لتبرد بسرعة. راقب الأقطار في العرض المكبّر.'],
    concl: ['الكرة الساخنة لا تمر لأن حجمها ازداد: ΔV = β V ΔT ، β = 3α.', 'فتحة الحلقة تتسع بالتسخين كأنها مصنوعة من مادة الحلقة نفسها: ΔA = γ A ΔT ، γ = 2α.', 'التبريد يعيد الأبعاد إلى ما كانت عليه.'],
    laws: ['g10_h4_area', 'g10_h4_vol', 'g10_h4_lin'],
    controls: [TG('rf', 'تسخين الحلقة', false, null, 'fire'), TG('mag', 'عرض مكبّر للأقطار', true, null, 'zoom')],
    setup(S) { S.bx = 0; S.by = 0; S.Tb = 20; S.Tg = 20; S.clk = 0; S.msg = ''; S.mt = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, rx: L + 215, ry: 300, fx: L + 60, fy: h * .62, wx: L + 410, wy: h * .62, hx: L + 215, hy: 160 }; },
    Db(S) { return D0 * (1 + AL * (S.Tb - 20)); }, dr(S) { return d0 * (1 + AL * (S.Tg - 20)); },
    pos(S, g) { return { x: g.hx + S.bx, y: g.hy + 40 + S.by }; },
    update(S, dt) { S.clk += dt; const g = D.geo(S); if (!S.W) return; const p = D.pos(S, g);
      const inF = Math.abs(p.x - g.fx) < 40 && p.y > g.fy - 120 && p.y < g.fy - 20, inW = Math.abs(p.x - g.wx) < 34 && p.y > g.wy - 70;
      S.Tb += ((inF ? 450 : inW ? 15 : 20) - S.Tb) * Math.min(1, dt * (inF ? .35 : inW ? 2.2 : .03));
      S.Tg += ((S.p.rf ? 420 : 20) - S.Tg) * Math.min(1, dt * (S.p.rf ? .3 : .04)); S.mt = Math.max(0, S.mt - dt); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = D.pos(S, g), Db = D.Db(S), dr = D.dr(S); Q44.bg(ctx, w, h); Q44.bench(ctx, g.L, g.wx + 60, g.fy + 8);
      // stand + ring
      K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(g.rx + 110, g.ry - 40, 8, g.fy - g.ry + 48); ctx.fillRect(g.rx + 60, g.ry - 3, 58, 6); rr(ctx, g.rx + 80, g.fy, 70, 8, 3); ctx.fill(); });
      const rw = RB * dr / D0, col = Q44.tcol(S.Tg); K.raw(ctx, () => { ctx.lineWidth = 9; const gg = ctx.createLinearGradient(0, g.ry - 6, 0, g.ry + 6); gg.addColorStop(0, '#fde68a'); gg.addColorStop(1, '#a16207'); ctx.strokeStyle = gg; ctx.beginPath(); ctx.ellipse(g.rx, g.ry, rw + 5, 8, 0, 0, TAU); ctx.stroke(); if (S.Tg > 60) { ctx.strokeStyle = Q44.tcol(S.Tg, clamp((S.Tg - 60) / 300, 0, .7)); ctx.stroke(); } ctx.fillStyle = '#ca8a04'; ctx.fillRect(g.rx + rw + 8, g.ry - 3, 52, 6); });
      if (S.p.rf) Q44.burner(ctx, g.rx, g.ry + 70, 1, S.clk);
      Q44.burner(ctx, g.fx, g.fy - 34, 1, S.clk + 1);
      K.beaker(ctx, g.wx, g.fy + 6, 70, 80, .65, { liq: '#38bdf8', liqA: .5 }); Q44.T(ctx, 'ماء بارد', g.wx, g.fy + 26, { s: 10.5, w: 800, c: '#0369a1' });
      // chain + handle + ball
      K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(p.x, p.y - 70); ctx.lineTo(p.x, p.y - RB); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#78350f'; rr(ctx, p.x - 8, p.y - 104, 16, 36, 5); ctx.fill(); });
      const br = RB * Db / D0; Q31.ball(ctx, p.x, p.y, br, 0); K.raw(ctx, () => { ctx.fillStyle = 'rgba(234,179,8,.55)'; ctx.beginPath(); ctx.arc(p.x, p.y, br, 0, TAU); ctx.fill(); if (S.Tb > 60) { ctx.fillStyle = Q44.tcol(S.Tb, clamp((S.Tb - 60) / 300, 0, .75)); ctx.fill(); } });
      // ring front half over the ball
      if (p.y > g.ry - br && p.y < g.ry + br) K.raw(ctx, () => { ctx.lineWidth = 9; ctx.strokeStyle = '#ca8a04'; ctx.beginPath(); ctx.ellipse(g.rx, g.ry, rw + 5, 8, 0, 0, Math.PI); ctx.stroke(); });
      Q44.T(ctx, 'الكرة ' + S.Tb.toFixed(0) + ' °C', p.x, p.y - 118, { s: 11, w: 900, c: '#fff', bg: '#b45309' }); Q44.T(ctx, 'الحلقة ' + S.Tg.toFixed(0) + ' °C', g.rx - rw - 54, g.ry, { s: 11, w: 900, c: '#fff', bg: '#a16207' });
      if (S.mt > 0) Q44.T(ctx, S.msg, g.rx, g.ry + 36, { s: 12, w: 900, c: '#fff', bg: '#dc2626' });
      if (S.p.mag) { const mx = g.L + 120, my = h - 196; K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; rr(ctx, mx - 100, my - 46, 380, 84, 10); ctx.fill(); ctx.stroke(); const k = 2600; const a = (Db - 25) * k, b = (dr - 25) * k; ctx.fillStyle = '#eab308'; ctx.fillRect(mx - 60, my - 8 - 6, 120 + a, 12); ctx.fillStyle = '#a16207'; ctx.fillRect(mx - 60, my + 12, 120 + b, 12); }); Q44.T(ctx, 'قطر الكرة D = ' + Db.toFixed(3) + ' mm', mx + 200, my - 30, { s: 10.5, w: 900, c: '#a16207' }); Q44.T(ctx, 'قطر الفتحة d = ' + dr.toFixed(3) + ' mm', mx + 200, my + 28, { s: 10.5, w: 900, c: '#713f12' }); Q44.T(ctx, Db < dr ? 'تمر: D < d' : 'لا تمر: D > d', mx - 60, my - 30, { s: 11, w: 900, c: '#fff', bg: Db < dr ? '#16a34a' : '#dc2626' }); }
      const A0 = Math.PI * d0 * d0 / 4, dA = Math.PI * dr * dr / 4 - A0, V0 = Math.PI * D0 ** 3 / 6, dV = Math.PI * Db ** 3 / 6 - V0;
      Q44.card(ctx, S, [{ t: 'α للنحاس الأصفر = 19×10⁻⁶ /°C', c: '#334155' }, { t: 'فتحة الحلقة: ΔA = γ A ΔT', c: '#a16207', w: 900 }, { t: 'γ = 2α ⟹ ΔA = ' + dA.toFixed(2) + ' mm²', mono: 1 }, { t: 'الكرة: ΔV = β V ΔT', c: '#b45309', w: 900 }, { t: 'β = 3α ⟹ ΔV = ' + dV.toFixed(1) + ' mm³', mono: 1 }, { t: Db < dr ? 'تمر الكرة خلال الحلقة' : 'لا تمر: الكرة أكبر من الفتحة', c: Db < dr ? '#16a34a' : '#dc2626', w: 900 }], { title: 'الكرة والحلقة', y: 70, wd: 290 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, 'اسحب الكرة فوق اللهب ثم حاول إمرارها خلال الحلقة');
    },
    chips(S, g) { return Q42.chips(S, 'act', [['rf', S.p.rf ? '❄ أطفئ لهب الحلقة' : '🔥 سخّن الحلقة'], ['hb', '🔥 الكرة فوق اللهب'], ['dip', '💧 اغمس الكرة'], ['re', '↺ أعد']], g.h - 84, '', (S2, k) => { const g2 = D.geo(S2); if (k === 'rf') setParam(S2, 'rf', !S2.p.rf); else if (k === 'hb') { S2.bx = g2.fx - g2.hx; S2.by = g2.fy - 80 - g2.hy - 40; } else if (k === 'dip') { S2.bx = g2.wx - g2.hx; S2.by = g2.wy - 20 - g2.hy - 40; } else { S2.bx = 0; S2.by = 0; S2.Tb = 20; S2.Tg = 20; setParam(S2, 'rf', false); } }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), p = D.pos(S, g);
      return [{ id: 'ball', x: p.x, y: p.y, r: 30, axis: 'xy', keep: true, tip: 'اسحب الكرة', idle: 'اسحب ✋', drag: (S2, d) => { const g2 = D.geo(S2), o = D.pos(S2, g2), br = RB * D.Db(S2) / D0; let nx = clamp(d.x, g2.L + 30, g2.wx + 30), ny = clamp(d.y, 90, g2.fy - 30);
        const near = Math.abs(nx - g2.rx) < RB + 40, fits = D.Db(S2) < D.dr(S2), block = !(fits && Math.abs(nx - g2.rx) < 18);
        if (near && block) { if (o.y <= g2.ry - br + 1 && ny > g2.ry - br) { ny = g2.ry - br; if (D.Db(S2) > D.dr(S2)) { S2.msg = 'الكرة الساخنة لا تمر!'; S2.mt = 1.5; } } else if (o.y >= g2.ry + br - 1 && ny < g2.ry + br) ny = g2.ry + br; }
        if (!block && Math.abs(ny - g2.ry) < br + 6) nx = g2.rx;
        S2.bx = nx - g2.hx; S2.by = ny - g2.hy - 40; } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('درجة حرارة الكرة', S.Tb.toFixed(0) + ' °C'), rd('درجة حرارة الحلقة', S.Tg.toFixed(0) + ' °C'), rd('قطر الكرة D', D.Db(S).toFixed(3) + ' mm'), rd('قطر الفتحة d', D.dr(S).toFixed(3) + ' mm')]; },
    explain(S) { return Q26.ex('الكرة الباردة تمر خلال الحلقة، والساخنة تعلق فوقها، وعند تسخين الحلقة تمر من جديد.', 'التسخين يزيد أبعاد الجسم في الاتجاهات كلها: حجم الكرة يزداد (β = 3α) ومساحة فتحة الحلقة تزداد أيضاً (γ = 2α) كأن الفتحة مملوءة بمادة الحلقة.', 'يُسخّن الإطار المعدني لعجلة القطار قبل تركيبه فيتسع، ثم يبرد فيضغط على العجلة بإحكام.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C3 — الشريط ثنائي المعدن والمنظم الحراري وإنذار الحريق وفواصل الجسور (الأشكال 9-4 إلى 12-4) =============== */
(() => {
  const MODES = [['strip', 'الشريط ثنائي المعدن'], ['thermo', 'منظم حراري: مكواة'], ['alarm', 'إنذار الحريق'], ['gap', 'فواصل الجسور والسكك']];
  const D = { id: 'g10_t_bimetal', page: 62, fig: 'الأشكال 9-4 و 10-4 و 11-4 و 12-4',
    desc: 'الشريط ثنائي المعدن: شريطان من النحاس الأصفر والحديد مثبتان معاً. عند التسخين يتمدد النحاس الأصفر (معامله أكبر) أكثر فينحني الشريط حول الحديد، وعند التبريد ينحني بالعكس. يستعمل في الضابط الأوتوماتيكي الحراري (الثلاجة والمكواة والمجمدة) وفي إنذار الحريق لفتح الدائرة الكهربائية وغلقها. وتترك فواصل في الجسور وسكك الحديد لتتمدد بأمان.',
    tags: 'الشريط ثنائي المعدن bimetallic strip منظم حراري ثرموستات مكواة ثلاجة إنذار الحريق فواصل الجسور سكك الحديد المصباح زجاج البايركس',
    tools: ['شريط ثنائي المعدن (نحاس أصفر + حديد)', 'مصباح بنزن وثلج', 'دائرة كهربائية بمصباح وجرس', 'نموذج جسر وسكة'],
    steps: ['اسحب مقبض الحرارة إلى اليمين: ينحني الشريط نحو الحديد. اسحبه تحت 20 °C: ينحني بالعكس.', 'في «منظم حراري» شغّل المكواة واضبط درجة الحرارة: تفتح الدائرة وتغلق تلقائياً.', 'في «إنذار الحريق» كبّر النار: ينحني الشريط فيغلق الدائرة ويرن الجرس.', 'في «فواصل الجسور» غيّر درجة حرارة الجو، ثم أزل الفاصل لترى ما يحدث للسكة.'],
    concl: ['المعدن ذو معامل التمدد الأكبر ينحني حول المعدن ذي المعامل الأقل عند التسخين.', 'الشريط ثنائي المعدن يفتح الدائرة عند الارتفاع ويغلقها عند الانخفاض، لذا يستعمل منظماً حرارياً.', 'تترك فواصل في الجسور وبين قضبان السكك تجنباً لتشوهها بالتمدد.', 'زجاج المصباح وسلكه لهما معامل التمدد نفسه فلا ينكسر الزجاج.'],
    laws: ['g10_h4_lin'],
    controls: [R('set', 'درجة ضبط المنظم', 40, 220, 120, 5, '°C'), TG('swap', 'الحديد في الأعلى', false, null, 'flip'), TG('nogap', 'إزالة الفاصل', false, null, 'warn')],
    setup(S) { S.md = 'strip'; S.T = 20; S.Tt = 20; S.on = 0; S.Ti = 20; S.clk = 0; S.hist = []; S.ht = 0; S.closed = 1; },
    update(S, dt) { S.clk += dt; S.T = Q44.ease(S.T, S.Tt, dt, 1.2);
      if (S.md === 'thermo') { if (S.closed && S.Ti > S.p.set + 2) S.closed = 0; else if (!S.closed && S.Ti < S.p.set - 2) S.closed = 1; const heat = S.on && S.closed ? 38 : 0; S.Ti += (heat - .12 * (S.Ti - 20)) * dt; S.ht += dt; if (!S.hist.length || S.ht - S.hist[S.hist.length - 1][0] > .15) { S.hist.push([S.ht, S.Ti]); if (S.hist.length > 240) S.hist.shift(); } } },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 70, y0: 260, Ls: 280, sy: h - 196 }; },
    /* bimetal strip from (x0,y0) length Ls, curvature k (1/px, +down); top colour first */
    strip(ctx, x0, y0, Ls, k, top, bot) {
      const P = (s, o) => { if (Math.abs(k) < 1e-6) return [x0 + s, y0 + o]; const a = k * s; return [x0 + Math.sin(a) / k - Math.sin(a) * o, y0 + (1 - Math.cos(a)) / k + Math.cos(a) * o]; };
      K.raw(ctx, () => { ctx.lineCap = 'butt'; [[-4, top], [4, bot]].forEach(q => { ctx.strokeStyle = q[1]; ctx.lineWidth = 8; ctx.beginPath(); for (let s = 0; s <= Ls; s += 4) { const p = P(s, q[0]); s ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); });
        ctx.fillStyle = '#334155'; for (let s = 30; s < Ls; s += 60) { const p = P(s, 0); ctx.beginPath(); ctx.arc(p[0], p[1], 2, 0, TAU); ctx.fill(); } ctx.fillStyle = '#1e293b'; ctx.fillRect(x0 - 26, y0 - 22, 26, 44); });
      return P(Ls, 0);
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q44.bg(ctx, w, h); const BR = '#eab308', FE = '#6b7280';
      if (S.md === 'strip') { const T = S.T, k = (T - 20) / (300 * g.Ls) * (S.p.swap ? -1 : 1); const tip = D.strip(ctx, g.x0, g.y0, g.Ls, k, S.p.swap ? FE : BR, S.p.swap ? BR : FE);
        K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.x0, g.y0); ctx.lineTo(g.x0 + g.Ls, g.y0); ctx.stroke(); ctx.setLineDash([]); });
        if (T > 25) Q44.burner(ctx, g.x0 + 150, g.y0 + 130, clamp((T - 20) / 250, .15, 1), S.clk);
        if (T < 15) K.raw(ctx, () => { for (let i = 0; i < 5; i++) { ctx.fillStyle = 'rgba(186,230,253,.85)'; ctx.strokeStyle = '#7dd3fc'; rr(ctx, g.x0 + 80 + i * 34, g.y0 + 90 + (i % 2) * 8, 26, 22, 4); ctx.fill(); ctx.stroke(); } });
        Q44.T(ctx, S.p.swap ? 'حديد' : 'نحاس أصفر', g.x0 + 40, g.y0 - 24, { s: 11, w: 900, c: '#fff', bg: S.p.swap ? FE : '#a16207' }); Q44.T(ctx, S.p.swap ? 'نحاس أصفر' : 'حديد', g.x0 + 40, g.y0 + 26, { s: 11, w: 900, c: '#fff', bg: S.p.swap ? '#a16207' : FE });
        Q44.T(ctx, 'T = ' + T.toFixed(0) + ' °C', tip[0] + 10, tip[1] + (k >= 0 ? 24 : -24), { s: 12, w: 900, c: '#fff', bg: '#b91c1c' });
        Q44.slider(ctx, g.L + 30, g.L + 400, g.sy, (S.Tt + 40) / 340, 'مقبض الحرارة: ' + S.Tt.toFixed(0) + ' °C', '#ea580c');
        Q44.card(ctx, S, [{ t: 'α النحاس الأصفر = 19×10⁻⁶ /°C', c: '#a16207', w: 800 }, { t: 'α الحديد = 12×10⁻⁶ /°C', c: '#475569', w: 800 }, { t: T >= 20 ? 'التسخين: النحاس الأصفر يتمدد أكثر' : 'التبريد: النحاس الأصفر يتقلص أكثر', c: '#334155' }, { t: T >= 20 ? 'فينحني الشريط حول الحديد' : 'فينحني الشريط نحو النحاس الأصفر', c: '#b91c1c', w: 900 }], { title: 'الشريط ثنائي المعدن', y: 70, wd: 300 }); }
      else if (S.md === 'thermo' || S.md === 'alarm') { const th = S.md === 'thermo', T = th ? S.Ti : S.T, c = .55, yN = g.y0 - c * (T - 20), yC = th ? g.y0 - c * (S.p.set - 20) : g.y0 - 70, cl = th ? S.closed : yN <= yC + 1;
        const yTip = th ? (cl ? Math.min(yN, yC) : yN) : (cl ? yC : yN), Ls = 220, x0 = g.x0 + 40, k = 2 * (g.y0 - yTip) / (Ls * Ls) * -1; D.strip(ctx, x0, g.y0, Ls, k, FE, BR); const tx = x0 + Ls;
        // contact + circuit
        K.raw(ctx, () => { ctx.fillStyle = '#facc15'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1.5; if (th) { rr(ctx, tx - 8, yC + 4, 16, 10, 2); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#64748b'; ctx.fillRect(tx - 4, yC + 14, 8, 40 + (g.y0 - yC)); ctx.fillStyle = '#334155'; rr(ctx, tx - 14, g.y0 + 60, 28, 12, 3); ctx.fill(); } else { rr(ctx, tx - 8, yC - 14, 16, 10, 2); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#64748b'; ctx.fillRect(tx - 4, yC - 60, 8, 46); }
          ctx.strokeStyle = cl ? '#dc2626' : '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 - 26, g.y0); ctx.lineTo(x0 - 60, g.y0); ctx.lineTo(x0 - 60, g.y0 + 150); ctx.lineTo(tx + 60, g.y0 + 150); ctx.lineTo(tx + 60, th ? g.y0 + 72 : yC - 60); ctx.lineTo(tx, th ? g.y0 + 72 : yC - 60); ctx.stroke(); if (th) { ctx.beginPath(); ctx.moveTo(x0 + 130, g.y0 + 150); ctx.lineTo(x0 + 130, g.y0 + 168); ctx.moveTo(x0 + 210, g.y0 + 150); ctx.lineTo(x0 + 210, g.y0 + 168); ctx.stroke(); } });
        const on = cl && (!th || S.on); K.raw(ctx, () => { const lx = x0 + 60, ly = g.y0 + 150; ctx.fillStyle = on ? (th ? '#fde047' : '#ef4444') : '#e2e8f0'; ctx.save(); if (on) { ctx.shadowColor = th ? '#fde047' : '#ef4444'; ctx.shadowBlur = 22; } ctx.beginPath(); ctx.arc(lx, ly - 16, 14, 0, TAU); ctx.fill(); ctx.restore(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke(); });
        Q44.T(ctx, 'المصدر', x0 - 60, g.y0 + 172, { s: 10.5, w: 800, c: '#334155' });
        if (th) { const ix = x0 + 170, iy = g.y0 + 210; K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(ix - 90, iy); ctx.lineTo(ix + 70, iy); ctx.quadraticCurveTo(ix + 110, iy, ix + 90, iy - 30); ctx.lineTo(ix - 70, iy - 30); ctx.closePath(); ctx.fill(); ctx.fillStyle = Q44.tcol(T, clamp((T - 30) / 200, .1, .9)); ctx.fillRect(ix - 86, iy - 8, 170, 8); ctx.fillStyle = '#1e293b'; rr(ctx, ix - 50, iy - 62, 110, 22, 8); ctx.fill(); });
          if (S.on && cl) Q44.heat(ctx, ix, iy + 10, 0, 28, S.clk, '#ef4444', 2); Q44.T(ctx, 'المكواة ' + T.toFixed(0) + ' °C', ix, iy + 54, { s: 11.5, w: 900, c: '#fff', bg: '#b91c1c' });
          const A = { x: w - 300, y: 352, w: 270, h: 150, xmax: Math.max(20, Math.ceil(S.ht / 10) * 10), xs: 5, lxs: 10, ymax: 250, ys: 25, lys: 50, xl: 't (s)', yl: 'T (°C)' }; const ax = Q41.axes(ctx, A); if (S.hist.length > 1) Q41.line(ctx, S.hist.map(q => [ax.X(q[0]), ax.Y(q[1])]), '#dc2626', 2.2); Q41.line(ctx, [[A.x, ax.Y(S.p.set)], [A.x + A.w, ax.Y(S.p.set)]], '#16a34a', 1.2, [5, 4]); }
        else { Q44.burner(ctx, x0 + 120, g.y0 + 70, clamp((S.T - 20) / 200, 0, 1), S.clk); if (on) { K.raw(ctx, () => { const bx = tx + 60, by = g.y0 + 30; ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.arc(bx, by, 22, Math.PI, 0); ctx.lineTo(bx + 22, by + 6); ctx.lineTo(bx - 22, by + 6); ctx.fill(); ctx.strokeStyle = 'rgba(220,38,38,.6)'; ctx.lineWidth = 2.5; for (let i = 1; i <= 3; i++) { const r = 26 + i * 9 + (S.clk * 30) % 9; ctx.beginPath(); ctx.arc(bx, by - 4, r, -2.5, -.6); ctx.stroke(); } }); Q44.T(ctx, 'حريق! الجرس يرن', tx + 40, g.y0 + 62, { s: 13, w: 900, c: '#fff', bg: '#dc2626' }); }
          Q44.slider(ctx, g.L + 30, g.L + 400, g.sy, (S.Tt + 40) / 340, 'حجم النار: ' + S.Tt.toFixed(0) + ' °C', '#ea580c'); }
        Q44.T(ctx, cl ? 'الدائرة مغلقة' : 'الدائرة مفتوحة', tx, th ? yC - 34 : yC + 40, { s: 11.5, w: 900, c: '#fff', bg: cl ? '#16a34a' : '#64748b' });
        Q44.card(ctx, S, th ? [{ t: 'الحديد في الأعلى والنحاس الأصفر في الأسفل', c: '#334155' }, { t: 'عند السخونة ينحني الشريط إلى الأعلى', c: '#334155' }, { t: 'فيبتعد عن نقطة التماس وتنفتح الدائرة', c: '#b91c1c', w: 900 }, { t: 'وعند البرودة يستقيم فتنغلق الدائرة', c: '#16a34a', w: 900 }, { t: 'درجة الضبط = ' + S.p.set + ' °C', c: '#0f766e', w: 800 }] : [{ t: 'النار تسخن الشريط فينحني للأعلى', c: '#334155' }, { t: 'يلمس نقطة التماس فتنغلق الدائرة', c: '#b91c1c', w: 900 }, { t: 'فيرن الجرس ويضيء المصباح الأحمر', c: '#b91c1c' }], { title: th ? 'الضابط الأوتوماتيكي الحراري' : 'جهاز إنذار الحريق', y: 70, wd: 300 }); }
      else { const T = S.T, gap = 18 - (T - 20) * .5, by = 230; // bridge with expansion joint + rails
        K.raw(ctx, () => { ctx.fillStyle = '#bae6fd'; ctx.fillRect(g.L + 20, by + 40, 400, 70); ctx.fillStyle = '#78716c'; [[g.L + 40, 60], [g.L + 380, 60]].forEach(q => ctx.fillRect(q[0], by + 14, q[1] - 30, 96)); ctx.fillRect(g.L + 200, by + 14, 30, 96);
          const half = (400 - Math.max(0, gap)) / 2, dx = S.p.nogap ? 0 : Math.max(0, gap); const bend = S.p.nogap ? Math.max(0, T - 20) * .9 : 0; ctx.fillStyle = '#a8a29e'; ctx.strokeStyle = '#44403c'; ctx.lineWidth = 1.5;
          if (S.p.nogap) { ctx.beginPath(); ctx.moveTo(g.L + 20, by); for (let x = 0; x <= 400; x += 5) ctx.lineTo(g.L + 20 + x, by - Math.sin(x / 400 * Math.PI) * bend); for (let x = 400; x >= 0; x -= 5) ctx.lineTo(g.L + 20 + x, by + 14 - Math.sin(x / 400 * Math.PI) * bend); ctx.closePath(); ctx.fill(); ctx.stroke(); }
          else { ctx.fillRect(g.L + 20, by, half, 14); ctx.strokeRect(g.L + 20, by, half, 14); ctx.fillRect(g.L + 20 + half + dx, by, 400 - half - dx, 14); ctx.strokeRect(g.L + 20 + half + dx, by, 400 - half - dx, 14); ctx.fillStyle = '#1e293b'; for (let i = 0; i < 4; i++) ctx.fillRect(g.L + 20 + half - 2, by + 2 + i * 3, dx + 4, 1); } });
        Q44.T(ctx, S.p.nogap ? 'بلا فاصل: الجسر يتقوس!' : 'الفاصل ' + Math.max(0, gap / 3).toFixed(1) + ' cm', g.L + 220, by - 30 - (S.p.nogap ? Math.max(0, T - 20) * .9 : 0), { s: 11.5, w: 900, c: '#fff', bg: S.p.nogap ? '#dc2626' : '#0f766e' });
        const ry = 420; K.raw(ctx, () => { ctx.fillStyle = '#92400e'; for (let x = g.L + 30; x < g.L + 420; x += 26) ctx.fillRect(x, ry - 6, 12, 30); const bend = S.p.nogap ? Math.max(0, T - 20) * .7 : 0; ctx.strokeStyle = '#475569'; ctx.lineWidth = 6; const gp = S.p.nogap ? 0 : Math.max(1, gap * .5);
          [ry, ry + 18].forEach(y => { ctx.beginPath(); for (let x = 0; x <= 390; x += 5) { const yy = y - Math.sin(x / 390 * TAU) * bend * (x > 130 && x < 260 ? 1 : .4); if (!S.p.nogap && x > 195 - gp / 2 && x < 195 + gp / 2) { ctx.stroke(); ctx.beginPath(); continue; } x && !(x - 5 > 195 - gp / 2 && x - 5 < 195 + gp / 2) ? ctx.lineTo(g.L + 30 + x, yy) : ctx.moveTo(g.L + 30 + x, yy); } ctx.stroke(); }); });
        Q44.T(ctx, 'سكة الحديد', g.L + 225, ry + 46, { s: 11, w: 800, c: '#334155' });
        Q44.slider(ctx, g.L + 30, g.L + 400, g.sy, (S.Tt + 10) / 60, 'درجة حرارة الجو: ' + S.Tt.toFixed(0) + ' °C', '#ea580c');
        const dL = 12e-6 * 12 * (T - 20) * 1000; Q44.card(ctx, S, [{ t: 'قضيب سكة فولاذ طوله 12 m', c: '#334155' }, { t: 'ΔL = α L ΔT = ' + dL.toFixed(2) + ' mm', mono: 1, c: '#b91c1c', w: 900 }, { t: 'الفاصل يسمح بالتمدد دون تشوه', c: '#0f766e', w: 900 }, { t: 'زجاج المصباح وسلكه لهما α نفسه', c: '#7c3aed' }, { t: 'زجاج البايركس α صغير فلا ينكسر', c: '#7c3aed' }], { title: 'تطبيقات التمدد', y: 70, wd: 300 }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); if (C.a) Q42.drawChips(ctx, C.a);
      Q42.banner(ctx, w, S.md === 'thermo' ? 'شغّل المكواة واضبط درجة الحرارة من اللوحة' : 'اسحب مقبض درجة الحرارة');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', MODES, g.h - 128, S.md, (S2, k) => { S2.md = k; S2.Tt = 20; S2.T = 20; S2.hist = []; S2.ht = 0; }, { bw: 175 }),
      a: S.md === 'thermo' ? Q42.chips(S, 'on', [['on', S.on ? '⏻ أطفئ المكواة' : '⏻ شغّل المكواة'], ['lo', Q44.iso('ضبط 80 °C')], ['hi', Q44.iso('ضبط 180 °C')]], g.h - 84, '', (S2, k) => { if (k === 'on') S2.on = S2.on ? 0 : 1; else setParam(S2, 'set', k === 'lo' ? 80 : 180); }, { bw: 175 })
        : S.md === 'gap' ? Q42.chips(S, 'ng', [['ng', S.p.nogap ? '✓ أعد الفاصل' : '✗ أزل الفاصل'], ['hot', Q44.iso('صيف 50 °C')], ['cold', Q44.iso('شتاء −10 °C')]], g.h - 84, '', (S2, k) => { if (k === 'ng') setParam(S2, 'nogap', !S2.p.nogap); else S2.Tt = k === 'hot' ? 50 : -10; }, { bw: 175 })
        : Q42.chips(S, 'q', [['hot', '🔥 سخّن'], ['cold', '❄ برّد بالثلج'], ['sw', 'اقلب الشريط']], g.h - 84, '', (S2, k) => { if (k === 'sw') setParam(S2, 'swap', !S2.p.swap); else S2.Tt = k === 'hot' ? (S2.md === 'alarm' ? 200 : 250) : -30; }, { bw: 175 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); const L = [];
      if (S.md === 'thermo') { C.a[0].idle = 'اضغط ✋'; return C.a.concat(C.m); }
      if (S.md !== 'thermo') { const lo = S.md === 'gap' ? -10 : -40, span = S.md === 'gap' ? 60 : 340; L.push(Q41.sdrag('temp', g.L + 30, g.L + 400, g.sy, (S.Tt - lo) / span, (S2, t) => { S2.Tt = Math.round(lo + t * span); }, { tip: 'اسحب لتغيير درجة الحرارة', extra: { idle: 'اسحب ✋' } })); }
      return L.concat(C.m, C.a); },
    readings(S) { return S.md === 'thermo' ? [rd('درجة حرارة المكواة', S.Ti.toFixed(0) + ' °C'), rd('درجة الضبط', S.p.set + ' °C'), rd('الدائرة', S.closed ? 'مغلقة' : 'مفتوحة')] : [rd('درجة الحرارة', S.T.toFixed(0) + ' °C')]; },
    explain(S) { return Q26.ex('الشريط المستقيم ينحني عند تسخينه أو تبريده، فيفتح الدائرة أو يغلقها.', 'النحاس الأصفر معامل تمدده أكبر من الحديد، فعند التسخين يصبح أطول قليلاً فيكون في الجهة الخارجية للانحناء.', 'منظم الحرارة في الثلاجة والمكواة والمجمدة، وجهاز إنذار الحريق، وفواصل الجسور وسكك الحديد.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — تمدد السوائل: الدورق والأنبوب في حوض ساخن (نشاط ص 63–64، الشكل 13-4، الجدول 3، مثال الخزان ص 65، تمدد الغازات ص 66) =============== */
(() => {
  const LQ = { w: ['ماء ملون', 2.1e-4, 'rgba(239,68,68,.55)'], alc: ['كحول', 1.12e-4, 'rgba(244,114,182,.45)'], bz: ['بنزين', 9.6e-4, 'rgba(250,204,21,.5)'], gly: ['غليسرين', 4.85e-4, 'rgba(203,213,225,.75)'], hg: ['زئبق', 1.85e-4, 'rgba(148,163,184,.95)'] };
  const V0 = 100, AT = .25, AG = 9e-6, PXC = 9, TL = 16; // cm³, tube cm², glass α, px per cm
  const EX = { q: 'ملئ خزان بنزين سيارة حجمه 60 L تماماً عند 25 °C ثم ترك تحت الشمس حتى أصبحت درجة حرارته 45 °C. احسب حجم البنزين المنسكب (أهمل تمدد الخزان)', lines: ['من الجدول 3: β = 9.6×10⁻⁴ /°C', 'ΔT = 45 − 25 = 20 °C', 'ΔV = V β ΔT', 'ΔV = 60 × 9.6×10⁻⁴ × 20', 'ΔV = 1.152 L'] };
  const D = { id: 'g10_t_liq', page: 63, fig: 'الشكل 13-4 + الجدول 3 + مثال ص 65',
    desc: 'نشاط تمدد السوائل: دورق زجاجي مملوء بماء ملون ومغلق بسدادة ينفذ منها أنبوب رفيع، نضعه في وعاء ماء ساخن. عند بدء التسخين ينخفض سطح الماء في الأنبوب قليلاً لأن زجاج الدورق يسخن ويتمدد أولاً، ثم يرتفع عندما تصل الحرارة إلى الماء. التمدد الذي نشاهده هو التمدد الظاهري، والتمدد الحقيقي للسائل = الظاهري + تمدد الإناء: βr = βv + 3α.',
    tags: 'تمدد السوائل التمدد الظاهري التمدد الحقيقي βr=βv+3α دورق أنبوب ماء ملون الجدول 3 كحول بنزين غليسرين زئبق خزان البنزين 60 L 1.152 تمدد الغازات 1/273 بالون',
    tools: ['دورق زجاج', 'وعاء كبير فيه ماء', 'أنبوب زجاج رفيع مفتوح الطرفين', 'سدادة مطاط', 'ماء ملون', 'مصدر حراري (مسخن كهربائي)'],
    steps: ['شغّل المسخن ليسخن ماء الوعاء، ثم اسحب الدورق إلى الأسفل ليغطس في الماء الساخن.', 'راقب سطح السائل في الأنبوب: ينخفض قليلاً عن العلامة أولاً ثم يرتفع.', 'غيّر السائل من الأزرار وقارن الارتفاع (الجدول 3).', 'جرّب «تمدد الغازات»: الهواء يتمدد أكثر بكثير فينتفخ البالون، ثم حل «مثال الخزان».'],
    concl: ['ينخفض السائل أولاً لأن الإناء يتمدد قبل السائل، ثم يرتفع لأن تمدد السائل أكبر.', 'التمدد الحقيقي للسائل أكبر من الظاهري: βr = βv + 3α.', 'تمدد الغازات أكبر من السوائل، والسوائل أكبر من الصلبة. للغازات بثبوت الضغط β = 1/273 لكل °C.', 'مثال الخزان: ينسكب 1.152 L من البنزين.'],
    laws: ['g10_h4_real', 'g10_h4_vol'],
    controls: [R('Tb', 'درجة حرارة ماء الوعاء', 20, 90, 70, 1, '°C'), TG('heat', 'تشغيل المسخن', true, null, 'fire')],
    setup(S) { S.md = 'flask'; S.lq = 'w'; S.ex = 0; S.k = 0; D.reset(S); },
    reset(S) { S.Tw = 20; S.Tg = 20; S.Tl = 20; S.inb = 0; S.go = 0; S.clk = S.clk || 0; S.tk = 25; S.tkt = 25; S.sp = 0; S.minh = 0; },
    h(S) { return V0 * (LQ[S.lq][1] * (S.Tl - 20) - 3 * AG * (S.Tg - 20)) / AT; },
    update(S, dt) { S.clk += dt;
      if (S.md === 'tank') { S.tk = Q44.ease(S.tk, S.tkt, dt, .5); S.sp = Math.max(0, 60 * 9.6e-4 * (S.tk - 25)); return; }
      S.Tw = Q44.ease(S.Tw, S.p.heat ? S.p.Tb : 20, dt, S.p.heat ? .45 : .08); S.inb = Q44.ease(S.inb, S.go, dt, 2.2);
      const inn = S.inb > .85, gas = S.md === 'gas'; S.Tg = Q44.ease(S.Tg, inn ? S.Tw : 20, dt, inn ? 1.1 : .1); S.Tl = Q44.ease(S.Tl, inn ? S.Tw : 20, dt, inn ? (gas ? .6 : .13) : .05); S.minh = Math.min(S.minh, D.h(S)); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), by = h * .6; return { w, h, L, by: h * .66, bx: L + 175, fx: L + 175, fy0: 300, dy: 130 }; },
    flask(ctx, S, g, x, y, col, lev) { // round flask centre (x,y), r 52; returns stopper top y
      K.raw(ctx, () => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 50, 0, TAU); ctx.fill(); ctx.fillRect(x - 10, y - 92, 20, 50);
        ctx.strokeStyle = 'rgba(100,116,139,.9)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, 52, -Math.PI / 2 + .2, Math.PI * 1.5 - .2); ctx.moveTo(x - 11, y - 51); ctx.lineTo(x - 11, y - 92); ctx.moveTo(x + 11, y - 51); ctx.lineTo(x + 11, y - 92); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(x - 22, y - 18, 9, 20, .5, 0, TAU); ctx.fill(); ctx.fillStyle = '#1f2937'; rr(ctx, x - 14, y - 112, 28, 22, 4); ctx.fill(); });
      return y - 112;
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q44.bg(ctx, w, h);
      if (S.md === 'tank') return D.drawTank(ctx, w, h, S, g);
      const gas = S.md === 'gas', Lq = LQ[S.lq]; Q44.bench(ctx, g.L, g.L + 430, g.by + 44);
      Q44.hotplate(ctx, g.bx, g.by, 230, S.p.heat ? (S.p.Tb - 20) / 70 : 0);
      K.beaker(ctx, g.bx, g.by, 216, 150, .78, { liq: '#38bdf8', liqA: .4 }); K.raw(ctx, () => { const a = clamp((S.Tw - 25) / 200, 0, .2); if (a > 0) { ctx.fillStyle = 'rgba(249,115,22,' + a + ')'; ctx.fillRect(g.bx - 106, g.by - 117, 212, 115); } });
      if (S.Tw > 45) for (let i = 0; i < 7; i++) { const ph = (S.clk * .8 + i / 7) % 1; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.arc(g.bx - 90 + i * 30, g.by - 8 - ph * 105, 2 + ph * 2, 0, TAU); ctx.fill(); }); }
      Q44.thermo(ctx, g.bx + 88, g.by - 20, 200, S.Tw, 0, 100, { col: '#0369a1', d: 0 });
      // clamp stand
      const fy = g.fy0 + S.inb * g.dy, x = g.fx - 20; K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.L + 6, 90, 8, g.by + 40 - 90); ctx.fillRect(g.L + 10, fy - 100, x - g.L - 10, 6); ctx.fillStyle = '#1e293b'; ctx.fillRect(x - 18, fy - 106, 10, 18); });
      const top = D.flask(ctx, S, g, x, fy, gas ? 'rgba(226,232,240,.35)' : Lq[2]);
      if (!gas) { const hh = D.h(S), h0 = 3, tl = TL, t0 = top - 4, tt = t0 - tl * PXC, yl = t0 - (h0 + hh) * PXC;
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(241,245,249,.8)'; ctx.fillRect(x - 3.5, tt, 7, t0 - tt); ctx.fillStyle = Lq[2].replace(/[\d.]+\)$/, '.9)'); ctx.fillRect(x - 2.5, Math.max(tt, yl), 5, t0 - Math.max(tt, yl)); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.2; ctx.strokeRect(x - 3.5, tt, 7, t0 - tt);
          ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 8, t0 - h0 * PXC); ctx.lineTo(x + 8, t0 - h0 * PXC); ctx.stroke();
          if (yl < tt) { ctx.fillStyle = Lq[2]; for (let i = 0; i < 3; i++) { const ph = (S.clk * 1.5 + i / 3) % 1; ctx.beginPath(); ctx.arc(x + 6 + ph * 6, tt + ph * 60, 3, 0, TAU); ctx.fill(); } } });
        K.raw(ctx, () => { ctx.fillStyle = '#fef3c7'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; rr(ctx, x + 8, tt - 4, 20, t0 - tt + 8, 3); ctx.fill(); ctx.stroke(); for (let c = 0; c <= tl; c++) { const yy = t0 - c * PXC; ctx.beginPath(); ctx.moveTo(x + 8, yy); ctx.lineTo(x + (c % 4 ? 13 : 18), yy); ctx.stroke(); } }); for (let c = 0; c <= tl; c += 4) Q44.T(ctx, String(c), x + 36, t0 - c * PXC, { s: 9, w: 800, c: '#78350f' }); Q44.T(ctx, 'cm', x + 18, tt - 14, { s: 9.5, w: 900, c: '#78350f' });
        Q44.T(ctx, 'العلامة', x - 40, t0 - h0 * PXC, { s: 10.5, w: 900, c: '#dc2626' });
        const dh = D.h(S), dVa = dh * AT, dVg = 3 * AG * V0 * (S.Tg - 20), dT = S.Tl - 20;
        Q44.card(ctx, S, [{ t: Lq[0] + ': β = ' + (Lq[1] * 1e4).toFixed(2) + '×10⁻⁴ /°C', c: '#334155', w: 800 }, { t: 'زجاج: Tg = ' + S.Tg.toFixed(1) + ' °C', c: '#0369a1' }, { t: 'السائل: Tl = ' + S.Tl.toFixed(1) + ' °C', c: '#b91c1c' }, { t: 'Δh = ' + dh.toFixed(2) + ' cm', mono: 1, w: 900, c: dh < 0 ? '#0369a1' : '#b91c1c' },
          { t: dh < -.02 ? 'انخفض أولاً: الدورق تمدد قبل السائل' : 'يرتفع: تمدد السائل أكبر', c: '#7c3aed', w: 900 }, { t: 'الظاهري ΔVv = A Δh = ' + dVa.toFixed(2) + ' cm³', c: '#334155' }, { t: 'تمدد الدورق 3αVΔT = ' + dVg.toFixed(2) + ' cm³', c: '#334155' }, { t: 'الحقيقي = الظاهري + تمدد الإناء', c: '#0f766e', w: 800 }, { t: 'βr = βv + 3α', mono: 1, c: '#0f766e', w: 900 }].concat(dT > 5 ? [{ t: 'βv = ' + (dVa / V0 / dT * 1e4).toFixed(2) + '×10⁻⁴ ، βr = ' + ((dVa + dVg) / V0 / dT * 1e4).toFixed(2) + '×10⁻⁴', mono: 1, c: '#b91c1c' }] : []), { title: 'التمدد الظاهري والحقيقي', y: 70, wd: 316 }); }
      else { const dV = V0 * 2.5 * (S.Tl - 20) / 273, r = 6 + 9 * Math.cbrt(Math.max(0, dV)); K.raw(ctx, () => { const gb = ctx.createRadialGradient(x - r * .3, top - r * .9, 2, x, top - r * .6, r * 1.2); gb.addColorStop(0, '#fecaca'); gb.addColorStop(1, '#dc2626'); ctx.fillStyle = gb; ctx.beginPath(); ctx.ellipse(x, top - r * .8, r * .85, r, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#b91c1c'; ctx.fillRect(x - 7, top - 4, 14, 6); });
        for (let i = 0; i < 14; i++) K.raw(ctx, () => { const a = i * 2.4 + S.clk * (1 + (S.Tl - 20) / 40), rr2 = 14 + (i * 13) % 30; ctx.fillStyle = 'rgba(100,116,139,.7)'; ctx.beginPath(); ctx.arc(x + Math.cos(a) * rr2, fy + Math.sin(a * 1.3) * rr2, 3, 0, TAU); ctx.fill(); });
        Q44.card(ctx, S, [{ t: 'هواء حجمه 250 cm³', c: '#334155' }, { t: 'للغازات بثبوت الضغط: β = 1/273 /°C', c: '#0f766e', w: 900 }, { t: 'ΔV = V ΔT / 273 = ' + dV.toFixed(1) + ' cm³', mono: 1, c: '#b91c1c', w: 900 }, { t: 'تمدد الإناء صغير جداً فيهمل', c: '#334155' }, { t: 'التمدد الظاهري للغاز = الحقيقي', c: '#7c3aed', w: 900 }, { t: 'الغاز يتمدد أكثر من السائل والصلب', c: '#b91c1c' }], { title: 'تمدد الغازات', y: 70, wd: 316 }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); if (C.l) Q42.drawChips(ctx, C.l); Q42.drawChips(ctx, C.a);
      Q42.banner(ctx, w, S.go ? 'راقب سطح السائل في الأنبوب' : 'اسحب الدورق إلى الأسفل ليغطس في الماء الساخن');
    },
    drawTank(ctx, w, h, S, g) {
      const cx = g.L + 200, cy = 330, T = S.tk; Q44.bench(ctx, g.L, g.L + 430, cy + 92);
      K.raw(ctx, () => { const sx = g.L + 40 + (T - 25) * 4, sun = ctx.createRadialGradient(sx, 110, 4, sx, 110, 60); sun.addColorStop(0, 'rgba(253,224,71,1)'); sun.addColorStop(.4, 'rgba(250,204,21,.7)'); sun.addColorStop(1, 'rgba(250,204,21,0)'); ctx.fillStyle = sun; ctx.beginPath(); ctx.arc(sx, 110, 60, 0, TAU); ctx.fill();
        ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.moveTo(cx - 170, cy + 50); ctx.lineTo(cx - 160, cy - 10); ctx.lineTo(cx - 90, cy - 20); ctx.lineTo(cx - 50, cy - 70); ctx.lineTo(cx + 70, cy - 70); ctx.lineTo(cx + 120, cy - 20); ctx.lineTo(cx + 175, cy - 10); ctx.lineTo(cx + 180, cy + 50); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#bfdbfe'; ctx.fillRect(cx - 40, cy - 62, 50, 38); ctx.fillRect(cx + 16, cy - 62, 46, 38);
        ctx.fillStyle = '#111827'; [cx - 105, cx + 115].forEach(xx => { ctx.beginPath(); ctx.arc(xx, cy + 52, 30, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(xx, cy + 52, 12, 0, TAU); ctx.fill(); ctx.fillStyle = '#111827'; });
        ctx.fillStyle = '#fef3c7'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 2; rr(ctx, cx + 60, cy + 2, 100, 40, 6); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(250,204,21,.8)'; rr(ctx, cx + 62, cy + 4, 96, 36, 5); ctx.fill();
        ctx.fillStyle = '#334155'; ctx.fillRect(cx + 150, cy - 18, 10, 22); ctx.fillRect(cx + 150, cy - 22, 40, 6);
        if (S.sp > 0 && S.tk < S.tkt - .05) { ctx.fillStyle = 'rgba(234,179,8,.9)'; for (let i = 0; i < 3; i++) { const ph = (S.clk * 1.6 + i / 3) % 1; ctx.beginPath(); ctx.arc(cx + 196, cy - 14 + ph * 80, 3, 0, TAU); ctx.fill(); } } });
      K.beaker(ctx, cx + 200, cy + 92, 54, 70, clamp(S.sp / 1.6, 0, 1), { liq: '#eab308', liqA: .7 });
      Q44.T(ctx, 'المنسكب ' + S.sp.toFixed(3) + ' L', cx + 200, cy + 108, { s: 11, w: 900, c: '#fff', bg: '#a16207' }); Q44.T(ctx, 'خزان 60 L', cx + 110, cy + 22, { s: 10.5, w: 900, c: '#713f12' });
      Q44.slider(ctx, g.L + 40, g.L + 400, h - 190, (S.tkt - 25) / 20, 'أشعة الشمس: درجة حرارة الخزان ' + S.tk.toFixed(1) + ' °C', '#f59e0b');
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); C.a[1]._col = '#be185d'; Q42.drawChips(ctx, C.a);
      if (S.ex) Q44.steps(ctx, S, Object.assign({ title: 'مثال ص 65' }, EX, { k: S.k }), { y: 70, x: w - 12, wd: 316 });
      else Q44.card(ctx, S, [{ t: 'ΔV = V β ΔT', mono: 1, w: 900, c: '#0f766e' }, { t: 'V = 60 L ، β = 9.6×10⁻⁴ /°C', mono: 1 }, { t: 'ΔT = ' + (T - 25).toFixed(1) + ' °C', mono: 1 }, { t: 'ΔV = ' + S.sp.toFixed(3) + ' L', mono: 1, c: '#b91c1c', w: 900 }, { t: 'لا تملأ الخزان حتى حافته صيفاً', c: '#7c3aed', w: 800 }], { title: 'خزان البنزين تحت الشمس', y: 70, wd: 316 });
      Q42.banner(ctx, w, 'اسحب مقبض الشمس لتسخين الخزان');
    },
    chips(S, g) { const m = Q42.chips(S, 'md', [['flask', 'نشاط: الدورق والأنبوب'], ['gas', 'تمدد الغازات'], ['tank', 'مثال: خزان البنزين']], g.h - 128, S.md, (S2, k) => { S2.md = k; S2.ex = 0; D.reset(S2); }, { bw: 200 });
      if (S.md === 'tank') return { m, a: Q44.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { S2.tkt = 45; }, EX.lines.length) };
      return { m, l: S.md === 'flask' ? Q42.chips(S, 'lq', Object.keys(LQ).map(k => [k, LQ[k][0]]), g.h - 172, S.lq, (S2, k) => { S2.lq = k; D.reset(S2); }, { bw: 120 }) : null,
        a: Q42.chips(S, 'go', [['go', S.go ? '⬆ ارفع الدورق' : '⬇ اغمس الدورق'], ['re', '↺ أعد']], g.h - 84, '', (S2, k) => { if (k === 're') D.reset(S2); else S2.go = S2.go ? 0 : 1; }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      if (S.md === 'tank') return [Q41.sdrag('sun', g.L + 40, g.L + 400, g.h - 190, (S.tkt - 25) / 20, (S2, t) => { S2.tkt = Math.round((25 + t * 20) * 2) / 2; }, { tip: 'اسحب لتسخين الخزان', extra: { idle: 'اسحب ✋' } })].concat(C.m, C.a);
      const fy = g.fy0 + S.inb * g.dy;
      return [{ id: 'flask', x: g.fx - 20, y: fy, r: 52, axis: 'y', keep: true, tip: 'اسحب الدورق إلى الأسفل', idle: 'اسحب ✋', drag: (S2, d) => { S2.go = d.y > g.fy0 + g.dy * .5 ? 1 : 0; } }].concat(C.m, C.l || [], C.a); },
    readings(S) { if (S.md === 'tank') return [rd('درجة حرارة الخزان', S.tk.toFixed(1) + ' °C'), rd('حجم البنزين المنسكب', S.sp.toFixed(3) + ' L')]; return [rd('درجة حرارة ماء الوعاء', S.Tw.toFixed(1) + ' °C'), rd('درجة حرارة الزجاج', S.Tg.toFixed(1) + ' °C'), rd('درجة حرارة السائل', S.Tl.toFixed(1) + ' °C'), rd('تغير المستوى Δh', D.h(S).toFixed(2) + ' cm')]; },
    record(S) { return { l: S.md === 'gas' ? 'هواء' : LQ[S.lq][0], T: S.Tl.toFixed(1), h: D.h(S).toFixed(2) }; },
    cols: [['l', 'المادة'], ['T', 'T (°C)'], ['h', 'Δh (cm)']],
    explain(S) { return Q26.ex('عند غمس الدورق في الماء الساخن ينخفض السائل في الأنبوب قليلاً ثم يرتفع فوق العلامة.', 'الزجاج يسخن أولاً فيتسع الدورق فينخفض السائل، ثم تصل الحرارة إلى السائل فيتمدد أكثر من الزجاج. ما نقيسه هو التمدد الظاهري، والحقيقي = الظاهري + تمدد الإناء.', 'فكر ص 65: المحرار الزئبقي في سائل ساخن ينخفض قليلاً أولاً ثم يرتفع للسبب نفسه. ولا يملأ خزان الوقود إلى حافته في الصيف.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — الشذوذ في تمدد الماء: أقل حجم عند 4 °C (إثراء) =============== */
(() => {
  const Vr = T => T >= 0 ? 8.5e-6 * (T - 4) ** 2 : .09; // relative extra volume of water
  const D = { id: 'g10_t_anom', page: 64, fig: 'إثراء: الشذوذ في تمدد الماء',
    desc: 'الماء يشذ عن بقية السوائل: عند تبريده من 12 °C ينكمش حتى 4 °C ثم يتمدد عند تبريده من 4 °C إلى 0 °C، فتكون كثافته أكبر ما يمكن عند 4 °C. وعند تجمده يزداد حجمه نحو 9% فيطفو الجليد. لهذا يتجمد سطح البحيرات أولاً ويبقى الماء في القاع بدرجة 4 °C فتعيش الأسماك.',
    tags: 'شذوذ الماء 4 درجات أكبر كثافة أقل حجم الجليد يطفو البحيرة الأسماك تجمد السطح انفجار الأنابيب',
    tools: ['دورق ماء بأنبوب رفيع', 'حوض ثلج وملح', 'محرار'],
    steps: ['اضغط «❄ برّد تدريجياً» أو اسحب مقبض درجة حرارة الماء من 12 إلى 0 °C.', 'راقب سطح الماء في الأنبوب والمنحني: ينخفض حتى 4 °C ثم يرتفع.', 'اسحب مقبض درجة حرارة الهواء فوق البحيرة تحت الصفر: يتجمد السطح ويبقى القاع 4 °C.'],
    concl: ['للماء أقل حجم وأكبر كثافة عند 4 °C.', 'بين 4 و 0 °C يتمدد الماء عند التبريد (شذوذ الماء).', 'الجليد أقل كثافة من الماء فيطفو ويعزل الماء تحته، فتبقى الأحياء المائية حية في الشتاء.'],
    laws: ['g10_h4_vol'],
    controls: [R('Tw', 'درجة حرارة ماء الدورق', 0, 12, 12, .1, '°C'), R('Ta', 'درجة حرارة الهواء فوق البحيرة', -10, 15, 10, 1, '°C')],
    setup(S) { S.T = 12; S.cool = 0; S.clk = 0; S.ice = 0; },
    update(S, dt) { S.clk += dt; if (S.cool) { S.tw = Math.max(0, (S.tw == null ? S.p.Tw : S.tw) - dt * .9); setParam(S, 'Tw', Math.round(S.tw * 10) / 10); if (S.tw <= 0) S.cool = 0; } else S.tw = S.p.Tw; S.T = Q44.ease(S.T, S.p.Tw, dt, 2.5); S.ice = Q44.ease(S.ice, S.p.Ta < 0 ? clamp(-S.p.Ta / 10, .15, 1) : 0, dt, .8); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, fx: L + 70, fy: 300 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), T = S.T; Q44.bg(ctx, w, h);
      // ice bath + flask
      K.beaker(ctx, g.fx, g.fy + 70, 130, 110, .8, { liq: '#bae6fd', liqA: .6 }); K.raw(ctx, () => { for (let i = 0; i < 7; i++) { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.strokeStyle = '#7dd3fc'; rr(ctx, g.fx - 56 + (i % 4) * 30 + (i > 3 ? 14 : 0), g.fy - 2 + ((i * 7) % 3) * 14 + (i > 3 ? 30 : 0), 16, 14, 3); ctx.fill(); ctx.stroke(); } });
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(56,189,248,.65)'; ctx.beginPath(); ctx.arc(g.fx, g.fy + 10, 34, 0, TAU); ctx.fill(); ctx.fillRect(g.fx - 7, g.fy - 50, 14, 30); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.fx, g.fy + 10, 35, -1.37, 4.51); ctx.stroke(); ctx.fillStyle = '#1f2937'; rr(ctx, g.fx - 10, g.fy - 62, 20, 14, 3); ctx.fill(); });
      const t0 = g.fy - 62, PX = 12, hh = 2 + Vr(T) * 500 / .02, yl = t0 - hh * PX; // cm³ → cm with A = 0.02 cm² (scaled)
      K.raw(ctx, () => { ctx.fillStyle = '#f1f5f9'; ctx.fillRect(g.fx - 3, t0 - 200, 6, 200); ctx.fillStyle = '#0284c7'; ctx.fillRect(g.fx - 2, yl, 4, t0 - yl); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.strokeRect(g.fx - 3, t0 - 200, 6, 200); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; const y4 = t0 - (2) * PX; ctx.beginPath(); ctx.moveTo(g.fx - 9, y4); ctx.lineTo(g.fx + 9, y4); ctx.stroke(); });
      Q44.T(ctx, 'عند 4 °C', g.fx - 40, t0 - 2 * PX, { s: 10, w: 900, c: '#dc2626' });
      Q44.thermo(ctx, g.fx + 52, g.fy + 50, 190, T, 0, 12, { step: 2, col: '#0369a1' });
      // graph V(T)
      const A = { x: g.L + 200, y: 110, w: 210, h: 150, x0: 0, xmax: 12, xs: 1, lxs: 2, ymax: 1.4, ys: .2, lys: .4, xl: 'T (°C)', yl: 'ΔV (×10⁻³ cm³/cm³)' }; const ax = Q41.axes(ctx, A);
      const pts = []; for (let t = 0; t <= 12.001; t += .2) pts.push([ax.X(t), ax.Y(Vr(t) * 1e3)]); Q41.line(ctx, pts, '#0284c7', 2.4); Q41.dot(ctx, ax.X(T), ax.Y(Vr(T) * 1e3), '#dc2626', 6); Q41.line(ctx, [[ax.X(4), A.y], [ax.X(4), A.y + A.h]], '#16a34a', 1.2, [4, 4]);
      Q44.T(ctx, 'أقل حجم', ax.X(4), A.y + A.h - 14, { s: 10, w: 900, c: '#16a34a' });
      // pond
      const px0 = g.L + 20, px1 = g.L + 420, py0 = 412, py1 = h - 215, ice = S.ice, Ta = S.p.Ta;
      K.raw(ctx, () => { ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.moveTo(px0 - 10, py0 - 8); ctx.lineTo(px0 + 30, py1 + 10); ctx.lineTo(px1 - 30, py1 + 10); ctx.lineTo(px1 + 10, py0 - 8); ctx.lineTo(px1 + 10, py1 + 24); ctx.lineTo(px0 - 10, py1 + 24); ctx.closePath(); ctx.fill();
        const n = 5; for (let i = 0; i < n; i++) { const y = py0 + (py1 - py0) * i / n, t = Ta >= 4 ? Ta - i * (Ta - 4) / n * .6 : Math.max(0, Ta) + (4 - Math.max(0, Ta)) * i / (n - 1); ctx.fillStyle = Q44.tcol(t * 4 - 10, .55); ctx.fillRect(px0 + 30 * i / n, y, px1 - px0 - 60 * i / n, (py1 - py0) / n + 1); }
        if (ice > .02) { ctx.fillStyle = 'rgba(240,249,255,.95)'; ctx.fillRect(px0, py0 - 2, px1 - px0, 8 + ice * 18); ctx.strokeStyle = '#7dd3fc'; ctx.strokeRect(px0, py0 - 2, px1 - px0, 8 + ice * 18); }
        for (let i = 0; i < 3; i++) { const fx = px0 + 120 + i * 90 + Math.sin(S.clk * .7 + i * 2) * 30, fy = py1 - 22 - i * 8; ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.ellipse(fx, fy, 14, 6, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(fx - 12, fy); ctx.lineTo(fx - 22, fy - 6); ctx.lineTo(fx - 22, fy + 6); ctx.fill(); } });
      Q44.T(ctx, ice > .1 ? 'جليد يطفو على السطح' : 'سطح البحيرة', (px0 + px1) / 2, py0 - 18, { s: 11, w: 900, c: '#fff', bg: '#0369a1' }); Q44.T(ctx, 'القاع 4 °C', px1 - 70, py1 - 14, { s: 10.5, w: 900, c: '#fff', bg: '#16a34a' });
      Q44.slider(ctx, g.L + 30, g.L + 410, h - 160, (S.p.Ta + 10) / 25, 'الهواء فوق البحيرة: ' + Ta + ' °C', '#0284c7');
      Q44.card(ctx, S, [{ t: 'ماء الدورق: ' + T.toFixed(1) + ' °C', c: '#0369a1', w: 900 }, { t: T > 4.05 ? 'التبريد فوق 4 °C: الماء ينكمش' : T < 3.95 ? 'التبريد تحت 4 °C: الماء يتمدد!' : 'عند 4 °C أقل حجم وأكبر كثافة', c: T < 3.95 ? '#dc2626' : '#16a34a', w: 900 }, { t: 'الجليد أكبر حجماً بنحو 9% فيطفو', c: '#334155' }, { t: 'الجليد عازل: يبقى القاع 4 °C', c: '#334155' }, { t: 'لذلك تنفجر أنابيب الماء في الشتاء', c: '#7c3aed', w: 800 }], { title: 'شذوذ الماء', y: 70, wd: 300 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, 'برّد الماء تدريجياً وراقب الأنبوب والمنحني');
    },
    chips(S, g) { return Q42.chips(S, 'c', [['cool', S.cool ? '⏸ أوقف التبريد' : '❄ برّد تدريجياً'], ['re', '↺ أعد']], g.h - 84, '', (S2, k) => { if (k === 'cool') { if (S2.p.Tw <= 0) setParam(S2, 'Tw', 12); S2.cool = S2.cool ? 0 : 1; } else { S2.cool = 0; setParam(S2, 'Tw', 12); } }, { bw: 180 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      return [{ id: 'tw', x: g.fx + 52, y: g.fy + 50 - 14 - (190 - 26) * S.p.Tw / 12, r: 18, axis: 'y', keep: true, tip: 'اسحب لتغيير درجة حرارة الماء', idle: 'اسحب ✋', drag: (S2, d) => { S2.cool = 0; setParam(S2, 'Tw', Math.round(clamp((g.fy + 50 - 14 - d.y) / (190 - 26) * 12, 0, 12) * 10) / 10); } },
        Q41.sdrag('ta', g.L + 30, g.L + 410, g.h - 160, (S.p.Ta + 10) / 25, (S2, t) => setParam(S2, 'Ta', Math.round(-10 + t * 25)), { tip: 'اسحب لتغيير درجة حرارة الهواء', extra: { hint: false } })].concat(D.chips(S, g)); },
    readings(S) { return [rd('درجة حرارة الماء', S.T.toFixed(1) + ' °C'), rd('الزيادة النسبية في الحجم', (Vr(S.T) * 1e6).toFixed(0) + ' ×10⁻⁶'), rd('الهواء فوق البحيرة', S.p.Ta + ' °C')]; },
    explain(S) { return Q26.ex('سطح الماء في الأنبوب ينخفض حتى 4 °C ثم يرتفع، والبحيرة تتجمد من سطحها.', 'جزيئات الماء قرب الانجماد تبدأ بالترتيب في بنية مفتوحة تشغل حجماً أكبر، لذا يتمدد الماء تحت 4 °C ويكون أكثف ما يمكن عند 4 °C فيهبط إلى القاع.', 'تبقى الأسماك حية تحت الجليد، وتنفجر أنابيب الماء وقناني الماء المجمدة في الشتاء.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — تغير حالة المادة: منحني التسخين جليد ← ماء ← بخار (4-5، الأشكال 14-4 إلى 16-4، الجدولان 4 و 5، الأمثلة ص 67–70) =============== */
(() => {
  const CI = 2093, CW = 4200, CS = 2010, LF = 335e3, LV = 2260e3, TMAX = 120;
  const PR = {
    e1: { t: 'مثال 1 ص 67', m: .025, T0: 0, end: { ph: 'melt' }, q: 'احسب كمية الحرارة اللازمة لتحويل قطعة جليد كتلتها 25 g بدرجة 0 °C إلى ماء عند الدرجة نفسها',
      lines: ['كمية الحرارة = الكتلة × الحرارة الكامنة للانصهار', 'Q = m Lf', 'Q = (25 / 1000) × 335', 'Q = 8.375 kJ'] },
    e2: { t: 'مثال 2 ص 68', m: 2, T0: -15, end: { T: 25 }, q: 'احسب كمية الحرارة اللازمة لتحويل 2 kg من الجليد بدرجة −15 °C إلى ماء بدرجة 25 °C. الحرارة النوعية للماء 4200 وللجليد 2093 J/kg.°C والحرارة الكامنة للانصهار 335 kJ/kg',
      lines: ['تسخين الجليد إلى 0 °C:', 'Q₁ = m cice ΔT = 2 × 2093 × 15 = 62790 J', 'صهر الجليد عند 0 °C:', 'Q₂ = m Lf = 2 × 335000 = 670000 J', 'تسخين الماء إلى 25 °C:', 'Q₃ = m cw ΔT = 2 × 4200 × 25 = 210000 J', 'Qtotal = Q₁ + Q₂ + Q₃', 'Qtotal = 942790 J'] },
    e3: { t: 'مثال ص 70', m: 3, T0: 20, end: { T: 110 }, q: 'احسب كمية الحرارة اللازمة لتحويل 3 kg من الماء بدرجة 20 °C إلى بخار بدرجة 110 °C. الحرارة النوعية للماء 4200 وللبخار 2010 J/kg.°C والحرارة الكامنة للتبخر 2260 kJ/kg',
      lines: ['تسخين الماء إلى 100 °C:', 'Q₁ = 3 × 4200 × (100 − 20) = 1008000 J', 'تبخير الماء عند 100 °C:', 'Q₂ = m Lv = 3 × 2260×10³ = 6780000 J', 'تسخين البخار إلى 110 °C:', 'Q₃ = 3 × 2010 × (110 − 100) = 60300 J', 'Qtotal = 7848300 J'] } };
  const NM = { ice: 'تسخين الجليد', melt: 'انصهار عند 0 °C', water: 'تسخين الماء', boil: 'غليان عند 100 °C', steam: 'تسخين البخار' };
  const D = { id: 'g10_t_curve', page: 66, fig: 'الأشكال 14-4 و 15-4 و 16-4 + الجدولان 4 و 5 + الأمثلة ص 67–70',
    desc: 'الحرارة الكامنة للانصهار Lf: كمية الحرارة اللازمة لتحويل وحدة الكتل من الحالة الصلبة إلى السائلة بدرجة الحرارة نفسها (Q = m Lf). والحرارة الكامنة للتبخر Lv: كمية الحرارة اللازمة لتحويل وحدة الكتل من السائل إلى الغاز عند درجة الغليان (Q = m Lv). نسخّن جليداً بلهب نتحكم بقدرته ونرسم منحني التسخين: تبقى درجة الحرارة ثابتة أثناء الانصهار والغليان.',
    tags: 'تغير الحالة الحرارة الكامنة للانصهار Lf=335 kJ/kg الحرارة الكامنة للتبخر Lv=2260 kJ/kg منحني التسخين جليد ماء بخار انصهار غليان تبخر 8.375 942790 7848300 الجدول 4 الجدول 5 التكثف',
    tools: ['دورق على حامل ثلاثي', 'مصباح بنزن بصمام', 'جليد', 'محرار'],
    steps: ['اضغط «▶ سخّن» وتحكم بقدرة اللهب من المقبض: ارسم منحني التسخين.', 'لاحظ أن درجة الحرارة تبقى 0 °C أثناء الانصهار و 100 °C أثناء الغليان رغم استمرار التسخين.', 'غيّر الكتلة والدرجة الابتدائية من اللوحة، أو اختر مثالاً من الكتاب وتابع الحل خطوة خطوة.', 'فعّل «تبريد» لترى أن التكثف والانجماد يحرران الحرارة نفسها.'],
    concl: ['أثناء تغير الحالة تبقى درجة الحرارة ثابتة حتى تتحول الكمية جميعها.', 'Q = m Lf للانصهار و Q = m Lv للتبخر، و Lv للماء (2260 kJ/kg) أكبر بكثير من Lf (335 kJ/kg).', 'مثال 1: 8.375 kJ. مثال 2: 942790 J. مثال ص 70: 7848300 J.', 'التبخر يحدث عند السطح بأي درجة، أما الغليان فيحدث في السائل كله عند درجة الغليان.'],
    laws: ['g10_h4_lf', 'g10_h4_lv', 'g10_h4_q'],
    controls: [R('m', 'الكتلة m', .025, 3, 1, .005, 'kg'), R('T0', 'درجة الحرارة الابتدائية', -20, 30, -15, 1, '°C'), R('P', 'قدرة اللهب', 200, 3000, 1500, 50, 'W'), TG('cool', 'تبريد (سحب الحرارة)', false, null, 'snow'), TG('mol', 'الجزيئات', true, null, 'particles')],
    setup(S) { S.pr = 'free'; S.ex = 0; S.k = 0; S.clk = 0; D.reset(S); },
    reset(S) { S.Q = 0; S.run = 0; S.sig = S.p.m + ',' + S.p.T0; S.dT = D.st(S, 0).T; S.done = 0; },
    segs(S) { const m = S.p.m, T0 = S.p.T0, L = []; if (T0 <= 0) { L.push(['ice', m * CI * (0 - T0), T0, 0]); L.push(['melt', m * LF, 0, 0]); L.push(['water', m * CW * 100, 0, 100]); } else L.push(['water', m * CW * (100 - T0), T0, 100]); L.push(['boil', m * LV, 100, 100]); L.push(['steam', m * CS * (TMAX - 100), 100, TMAX]); return L; },
    st(S, Q) { const L = D.segs(S); let q = Q; for (const s of L) { if (q <= s[1] + 1e-9 || s === L[L.length - 1]) { const f = s[1] > 0 ? clamp(q / s[1], 0, 1) : 1, T = s[2] + (s[3] - s[2]) * f; const o = { seg: s[0], f, T }; o.fi = s[0] === 'ice' ? 1 : s[0] === 'melt' ? 1 - f : 0; o.fs = s[0] === 'boil' ? f : s[0] === 'steam' ? 1 : 0; o.fw = 1 - o.fi - o.fs; return o; } q -= s[1]; } },
    Qend(S) { const P = PR[S.pr], L = D.segs(S); let tot = 0; if (!P) return L.reduce((a, s) => a + s[1], 0);
      for (const s of L) { if (P.end.ph === s[0]) return tot + s[1]; if (P.end.T != null && P.end.T >= Math.min(s[2], s[3]) && P.end.T <= Math.max(s[2], s[3]) && s[2] !== s[3]) return tot + s[1] * (P.end.T - s[2]) / (s[3] - s[2]); tot += s[1]; } return tot; },
    update(S, dt) { S.clk += dt; if (S.sig !== S.p.m + ',' + S.p.T0) { if (PR[S.pr] && (S.p.m !== PR[S.pr].m || S.p.T0 !== PR[S.pr].T0)) { S.pr = 'free'; S.ex = 0; } D.reset(S); }
      if (S.run) { const spd = 80 * S.p.m, qe = D.Qend(S); S.Q += (S.p.cool ? -1 : 1) * S.p.P * spd * dt; if (S.Q >= qe) { S.Q = qe; S.run = 0; S.done = 1; } if (S.Q <= 0) { S.Q = 0; S.run = 0; } }
      S.dT = Q44.ease(S.dT, D.st(S, S.Q).T, dt, 4); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), by = 380; return { w, h, L, by, bx: L + 110 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), m = S.p.m, s = D.st(S, S.Q), on = S.run && !S.p.cool; Q44.bg(ctx, w, h); Q44.bench(ctx, g.L, g.L + 250, g.by + 96);
      // tripod, burner, beaker
      Q44.burner(ctx, g.bx, g.by + 54, on ? S.p.P / 3000 : 0, S.clk); K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(g.bx - 62, g.by - 4, 124, 6); ctx.fillRect(g.bx - 58, g.by - 4, 5, 100); ctx.fillRect(g.bx + 53, g.by - 4, 5, 100); });
      if (S.p.cool && S.run) K.raw(ctx, () => { ctx.fillStyle = 'rgba(186,230,253,.7)'; rr(ctx, g.bx - 70, g.by - 200, 140, 196, 14); ctx.fill(); });
      const sc = .15 + .6 * Math.sqrt(m / 3), bh = 170, wl = clamp(s.fw * sc + s.fi * sc * .35, 0, .95);
      K.beaker(ctx, g.bx, g.by - 8, 120, bh, wl, { liq: '#38bdf8', liqA: .45 });
      const nIce = Math.round(s.fi * (2 + 9 * Math.sqrt(m / 3))), lev = g.by - 8 - bh * wl;
      K.raw(ctx, () => { for (let i = 0; i < nIce; i++) { const sz = 20 * (s.seg === 'melt' ? .55 + .45 * (1 - s.f) : 1), x = g.bx - 46 + (i % 4) * 26, y = g.by - 30 - Math.floor(i / 4) * 24 - (i % 2) * 4; ctx.save(); ctx.translate(x, y); ctx.rotate((i * 37 % 10 - 5) / 20); ctx.fillStyle = 'rgba(240,249,255,.92)'; ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.5; rr(ctx, -sz / 2, -sz / 2, sz, sz, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fillRect(-sz / 2 + 3, -sz / 2 + 3, sz * .3, 3); ctx.restore(); }
        if (s.seg === 'boil' && S.run && !S.p.cool) for (let i = 0; i < 14; i++) { const ph = (S.clk * 1.4 + i * .137) % 1, x = g.bx - 50 + (i * 23) % 100, y = g.by - 12 - ph * (g.by - 12 - lev); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(x, y, 2 + ph * 4, 0, TAU); ctx.fill(); }
        else if (s.T > 40 && s.fw > .05) for (let i = 0; i < 4; i++) { const ph = (S.clk * .7 + i / 4) % 1; ctx.fillStyle = 'rgba(56,189,248,.8)'; ctx.beginPath(); ctx.arc(g.bx - 40 + i * 26, lev - ph * 30, 2.5, 0, TAU); ctx.fill(); } });
      Q44.steam(ctx, g.bx, g.by - 8 - bh - 4, s.seg === 'boil' ? .9 : s.seg === 'steam' ? .6 : clamp((s.T - 60) / 80, 0, .4), S.clk, 5, 90);
      Q44.thermo(ctx, g.bx + 34, g.by - 26, 240, S.dT, -20, 120, { col: '#b91c1c' });
      Q44.T(ctx, NM[s.seg], g.bx, g.by + 124, { s: 12, w: 900, c: '#fff', bg: s.seg === 'melt' || s.seg === 'boil' ? '#7c3aed' : '#0f766e' });
      Q44.slider(ctx, g.L + 10, g.L + 220, g.by + 172, (S.p.P - 200) / 2800, 'صمام اللهب: ' + S.p.P + ' W', '#ea580c');
      if (S.p.mol) { const mode = s.seg === 'ice' || (s.seg === 'melt' && s.f < .5) ? 's' : (s.seg === 'steam' || (s.seg === 'boil' && s.f > .5)) ? 'g' : 'l'; Q44.mols(ctx, g.L + 250, 96, 110, 76, s.T, S.clk, mode, '#0284c7', mode === 'g' ? 10 : 20); Q44.T(ctx, mode === 's' ? 'جزيئات مترابطة' : mode === 'l' ? 'جزيئات تنزلق' : 'جزيئات حرة', g.L + 305, 186, { s: 10.5, w: 900, c: '#0369a1' }); }
      // heating curve
      const L = D.segs(S), qe = D.Qend(S), xm = qe / 1000, nst = (v => { const p = Math.pow(10, Math.floor(Math.log10(v))); return (v / p >= 5 ? 5 : v / p >= 2 ? 2 : 1) * p; })(xm / 5), A = { x: g.L + 280, y: 440, w: g.w - g.L - 330, h: 130, x0: 0, xmax: xm, xs: nst / 2, lxs: nst, ymax: TMAX + 20, ys: 20, lys: 40, xl: 'Q (kJ)', yl: 'T (°C)' };
      const ax = Q44.axes(ctx, { x: A.x, y: A.y, w: A.w, h: A.h, x0: 0, xmax: A.xmax, xs: A.xs, lxs: A.lxs, y0: -20, ymax: TMAX, ys: 20, lys: 20, xl: A.xl, yl: A.yl });
      const Yc = ax.Y; let q = 0; const full = [[ax.X(0), Yc(L[0][2])]], done = [[ax.X(0), Yc(L[0][2])]];
      L.forEach(sg => { const q1 = q + sg[1]; if (q1 / 1000 <= xm + 1e-9) full.push([ax.X(q1 / 1000), Yc(sg[3])]); else if (q / 1000 < xm) full.push([ax.X(xm), Yc(sg[2] + (sg[3] - sg[2]) * (qe - q) / sg[1])]);
        if (S.Q >= q1) done.push([ax.X(q1 / 1000), Yc(sg[3])]); else if (S.Q > q) done.push([ax.X(S.Q / 1000), Yc(sg[2] + (sg[3] - sg[2]) * (S.Q - q) / sg[1])]);
        if (sg[1] > 0 && q / 1000 < xm) { const mx = ax.X(Math.min(xm, (q + q1) / 2000)); Q44.T(ctx, sg[0] === 'melt' ? 'mLf' : sg[0] === 'boil' ? 'mLv' : 'mcΔT', mx, Yc((sg[2] + sg[3]) / 2) - 12, { s: 9, w: 900, c: sg[0] === 'melt' || sg[0] === 'boil' ? '#7c3aed' : '#0f766e' }); } q = q1; });
      Q41.line(ctx, full, 'rgba(100,116,139,.45)', 2, [5, 4]); Q41.line(ctx, done, '#dc2626', 3); Q41.dot(ctx, ax.X(S.Q / 1000), Yc(s.T), '#dc2626', 6);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.r); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      const P = PR[S.pr];
      if (S.ex && P) Q44.steps(ctx, S, { title: P.t, q: P.q, lines: P.lines, k: S.k }, { y: 70, x: w - 12, wd: 340 });
      else { let q2 = 0; Q44.card(ctx, S, [{ t: 'الحرارة المجهزة Q = ' + Math.round(S.Q) + ' J', c: '#b91c1c', w: 900 }].concat(L.filter(sg => sg[1] > 0).map(sg => { const a = q2; q2 += sg[1]; const act = s.seg === sg[0]; return { t: NM[sg[0]] + ': ' + Math.round(sg[1]) + ' J', c: act ? '#7c3aed' : S.Q >= q2 ? '#16a34a' : '#64748b', w: act ? 900 : 700 }; })).concat([{ t: 'Lf = 335 kJ/kg ، Lv = 2260 kJ/kg', mono: 1, c: '#0f766e' }, { t: s.seg === 'melt' || s.seg === 'boil' ? 'تغير حالة: درجة الحرارة ثابتة' : 'الحرارة ترفع درجة الحرارة', c: s.seg === 'melt' || s.seg === 'boil' ? '#7c3aed' : '#334155', w: 900 }]), { title: P ? P.t : 'منحني التسخين: ' + m + ' kg', y: 70, wd: 340 }); }
      Q42.banner(ctx, w, S.p.cool ? 'التبريد: البخار يتكثف والماء يتجمد ويحرر الحرارة' : 'اضغط «▶ سخّن» وتحكم بصمام اللهب');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pr', [['free', 'حر'], ['e1', 'مثال 1: صهر 25 g'], ['e2', 'مثال 2: جليد إلى ماء'], ['e3', 'مثال ص 70: ماء إلى بخار']], g.h - 128, S.pr, (S2, k) => { S2.ex = 0; S2.pr = k; if (PR[k]) { setParam(S2, 'm', PR[k].m); setParam(S2, 'T0', PR[k].T0); setParam(S2, 'cool', false); if (k === 'e1') setParam(S2, 'P', 400); } D.reset(S2); S2.pr = k; }, { bw: 185 }),
      r: Q42.chips(S, 'run', [['go', S.run ? '⏸ أوقف' : (S.p.cool ? '▶ برّد' : '▶ سخّن')], ['re', '↺']], g.h - 84, '', (S2, k) => { if (k === 're') D.reset(S2); else { if (S2.done && !S2.p.cool) D.reset(S2); S2.run = S2.run ? 0 : 1; } }, { bw: 120, x0: g.L + 340 }),
      e: Q44.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { if (!PR[S2.pr]) { S2.pr = 'e2'; setParam(S2, 'm', 2); setParam(S2, 'T0', -15); D.reset(S2); S2.pr = 'e2'; } S2.run = 1; }, 9) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      return [Q41.sdrag('valve', g.L + 10, g.L + 220, g.by + 172, (S.p.P - 200) / 2800, (S2, t) => setParam(S2, 'P', Math.round((200 + t * 2800) / 50) * 50), { tip: 'اسحب لتغيير قدرة اللهب', extra: { idle: 'اسحب ✋' } })].concat(C.r, C.p, C.e); },
    readings(S) { const s = D.st(S, S.Q); return [rd('كمية الحرارة المجهزة', Math.round(S.Q) + ' J'), rd('درجة الحرارة', s.T.toFixed(1) + ' °C'), rd('المرحلة', NM[s.seg]), rd('جليد / ماء / بخار', Math.round(s.fi * 100) + '% / ' + Math.round(s.fw * 100) + '% / ' + Math.round(s.fs * 100) + '%')]; },
    record(S) { const s = D.st(S, S.Q); return { q: (S.Q / 1000).toFixed(1), T: s.T.toFixed(1), st: NM[s.seg] }; },
    cols: [['q', 'Q (kJ)'], ['T', 'T (°C)'], ['st', 'المرحلة']],
    explain(S) { return Q26.ex('أثناء الانصهار وأثناء الغليان يستمر التسخين لكن المحرار يبقى ثابتاً على 0 °C ثم على 100 °C.', 'الحرارة المجهزة أثناء تغير الحالة تستهلك في التغلب على القوى بين الجزيئات (حرارة كامنة) لا في زيادة طاقتها الحركية، لذا لا ترتفع درجة الحرارة حتى تتحول الكمية جميعها.', 'حروق البخار أشد من حروق الماء المغلي لأن البخار يحرر حرارته الكامنة عند تكثفه على الجلد.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — التوصيل الحراري: ساقان بين لهب وجليد مجروش ودبابيس شمع (4-6، الأشكال 17-4 إلى 20-4، الجدول 6، مثال 1 ص 73) =============== */
(() => {
  const OPT = [['cu', 'نحاس أحمر'], ['ag', 'فضة'], ['al', 'ألمنيوم'], ['br', 'نحاس أصفر'], ['fe', 'حديد'], ['st', 'فولاذ'], ['gl', 'زجاج'], ['wd', 'خشب']], N = 26, SP = 300, NP = 7;
  const nm = k => OPT.find(q => q[0] === k)[1];
  const EX = { q: 'ساق حديد طوله 50 cm ومساحة مقطعه 1 cm² وضع أحد طرفيه على لهب 200 °C والآخر في جليد مجروش 0 °C ، وهو مغلف بعازل. احسب الانحدار الحراري والمعدل الزمني لانسياب الطاقة (K = 79 W/m.°C)', lines: ['الانحدار الحراري = ΔT / L', '= (200 − 0) / 50×10⁻²', '= 4×10² °C/m', 'H = K A ΔT / L', 'H = 79 × (1×10⁻⁴) × (200 − 0) / 50×10⁻²', 'H = 3.16 W'] };
  const D = { id: 'g10_t_cond', page: 71, fig: 'الأشكال 17-4 إلى 20-4 + الجدول 6 + مثال 1 ص 73',
    desc: 'التوصيل: انتقال الحرارة في المواد الصلبة دون انتقال جزيئاتها. الفلزات جيدة التوصيل لاحتوائها على إلكترونات حرة وتقارب ذراتها، والخشب والمطاط رديئة التوصيل. نضع طرف ساق معزولة على لهب وطرفها الآخر في جليد مجروش 0 °C: الانحدار الحراري ΔT/L، والمعدل الزمني لانتقال الطاقة H = K A ΔT / L. نعلّق دبابيس بالشمع على ساقين ونقارن سرعة سقوطها.',
    tags: 'التوصيل الحراري التوصيلية الحرارية معامل التوصيل K الانحدار الحراري ΔT/L H=KAΔT/L واط دبابيس شمع لهب جليد مجروش نحاس حديد فضة زجاج خشب الجدول 6 3.16 W 400 °C/m خوذة رجال الإطفاء',
    tools: ['ساقان من مادتين مختلفتين مغلفتان بعازل', 'مصدر حراري (لهب) ثابت الدرجة', 'وعاء جليد مجروش 0 °C', 'دبابيس مثبتة بالشمع'],
    steps: ['اضغط «🔥 أشعل اللهب»: تنتقل الحرارة على طول الساقين فيذوب الشمع وتسقط الدبابيس واحداً بعد الآخر.', 'قارن: دبابيس الساق ذات K الأكبر تسقط أسرع، والمخطط تحت الساقين يبين درجة الحرارة على طولهما.', 'غيّر المادة والطول ومساحة المقطع ودرجة اللهب من اللوحة، أو اضغط على الساق لتغيير مادتها.', 'أطفئ «عزل الساق» لترى ضياع الحرارة من سطحها. اضغط «مثال 1» لحل مسألة ساق الحديد.'],
    concl: ['H = K A ΔT / L: المعدل الزمني يتناسب مع K ومع المساحة ومع الانحدار الحراري ΔT/L.', 'كلما زاد الانحدار الحراري زاد انسياب الطاقة الحرارية.', 'الفلزات (الفضة 406 والنحاس 385 W/m.°C) جيدة التوصيل، والخشب (0.15) والهواء (0.025) رديئة.', 'مثال 1: الانحدار 400 °C/m و H = 3.16 W.'],
    laws: ['g10_h4_cond'],
    controls: [SEL('a', 'الساق العليا', OPT, 'cu'), SEL('b', 'الساق السفلى', OPT, 'fe'), R('L', 'طول الساق L', .2, 1, .5, .05, 'm'), R('A', 'مساحة المقطع A', .5, 4, 1, .5, 'cm²'), R('Th', 'درجة حرارة الطرف الساخن', 50, 300, 200, 10, '°C'), TG('ins', 'عزل الساق', true, null, 'shield')],
    setup(S) { S.ex = 0; S.k = 0; S.clk = 0; D.reset(S); },
    reset(S) { S.on = 0; S.T = [0, 1].map(() => new Array(N).fill(20)); S.T.forEach(a => { a[N - 1] = 0; }); S.pin = [0, 1].map(() => new Array(NP).fill(0)); S.pt = [0, 1].map(() => new Array(NP).fill(0)); S.melt = [0, 0]; S.tim = 0; S.sig = D.sig(S); },
    sig(S) { return [S.p.a, S.p.b, S.p.L].join(','); },
    H(S, i) { const M = Q44.M[i ? S.p.b : S.p.a]; return M[4] * S.p.A * 1e-4 * (S.p.Th - 0) / S.p.L; },
    update(S, dt) { S.clk += dt; if (S.sig !== D.sig(S)) D.reset(S);
      [S.p.a, S.p.b].forEach((mk, r) => { const M = Q44.M[mk], Dd = M[4] / (M[5] * M[1]), dx = S.p.L / (N - 1), T = S.T[r]; let ts = S.on ? dt * SP : 0; const hmax = .4 * dx * dx / Dd, n = Math.min(400, Math.ceil(ts / hmax)); const h = n ? ts / n : 0, hl = S.p.ins ? 0 : .004;
        T[0] = S.on ? S.p.Th : Q44.ease(T[0], 20, dt, .3); T[N - 1] = 0;
        for (let s = 0; s < n; s++) { const o = T.slice(); for (let i = 1; i < N - 1; i++) T[i] = o[i] + h * (Dd * (o[i + 1] - 2 * o[i] + o[i - 1]) / (dx * dx) - hl * (o[i] - 20)); }
        if (S.on) { const Hc = M[4] * S.p.A * 1e-4 * (T[N - 2] - T[N - 1]) / dx; S.melt[r] += Math.max(0, Hc) * dt * SP / 335; }
        for (let j = 0; j < NP; j++) { const u = (j + 1) / (NP + 1), Tu = T[Math.round(u * (N - 1))]; if (!S.pin[r][j] && Tu > 55) S.pin[r][j] = 1; if (S.pin[r][j]) S.pt[r][j] = Math.min(1, S.pt[r][j] + dt * 2.2); } });
      if (S.on) S.tim += dt * SP; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 84, x1: L + 318, ys: [180, 300], ix: L + 318 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), len = g.x1 - g.x0; Q44.bg(ctx, w, h);
      // heater block + flame
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(g.x0 - 40, 0, g.x0, 0); gg.addColorStop(0, '#7c2d12'); gg.addColorStop(1, S.on ? '#f97316' : '#78716c'); ctx.fillStyle = gg; rr(ctx, g.x0 - 44, g.ys[0] - 40, 44, g.ys[1] - g.ys[0] + 80, 6); ctx.fill(); });
      Q44.burner(ctx, g.x0 - 22, g.ys[1] + 84, S.on ? .9 : 0, S.clk); K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(g.x0 - 30, g.ys[1] + 40, 16, 46); });
      // ice box
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(224,242,254,.9)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.5; ctx.fillRect(g.ix, g.ys[0] - 50, 78, g.ys[1] - g.ys[0] + 110); ctx.strokeRect(g.ix, g.ys[0] - 50, 78, g.ys[1] - g.ys[0] + 110);
        for (let i = 0; i < 30; i++) { ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.strokeStyle = '#bae6fd'; ctx.lineWidth = 1; const x = g.ix + 6 + (i * 23) % 64, y = g.ys[0] - 40 + Math.floor(i / 3) * 20 + (i % 3) * 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 10, y + 3); ctx.lineTo(x + 7, y + 12); ctx.lineTo(x - 2, y + 9); ctx.closePath(); ctx.fill(); ctx.stroke(); }
        const mw = clamp((S.melt[0] + S.melt[1]) / 60, 0, 1) * 40; ctx.fillStyle = 'rgba(56,189,248,.6)'; ctx.fillRect(g.ix + 2, g.ys[1] + 58 - mw, 74, mw); });
      Q44.T(ctx, 'جليد مجروش 0 °C', g.ix + 39, g.ys[0] - 64, { s: 10.5, w: 900, c: '#fff', bg: '#0369a1' });
      g.ys.forEach((y, r) => { const mk = r ? S.p.b : S.p.a, T = S.T[r], th = 8 + S.p.A * 3; Q44.rod(ctx, g.x0, y, len + 20, th, mk, u => T[Math.min(N - 1, Math.round(u * (N - 1)))]);
        if (S.p.ins) K.raw(ctx, () => { ctx.fillStyle = 'rgba(253,230,138,.35)'; ctx.strokeStyle = 'rgba(180,83,9,.45)'; ctx.lineWidth = 1; rr(ctx, g.x0 + 4, y - th / 2 - 6, len - 8, th + 12, 6); ctx.fill(); ctx.stroke(); });
        for (let j = 0; j < NP; j++) { const x = g.x0 + len * (j + 1) / (NP + 1), f = S.pt[r][j], yy = y + th / 2 + 4 + f * f * 46; K.raw(ctx, () => { ctx.globalAlpha = Math.max(0, 1 - f); if (f < .02) { ctx.fillStyle = '#fef3c7'; ctx.beginPath(); ctx.ellipse(x, y + th / 2 + 3, 6, 4, 0, 0, TAU); ctx.fill(); } ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x, yy + 18); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(x, yy, 3, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; }); }
        const fallen = S.pin[r].filter(v => v).length; Q44.T(ctx, nm(mk) + ' K = ' + Q44.M[mk][4], g.x0 + 60, y - th / 2 - 18, { s: 11, w: 900, c: '#fff', bg: shade(Q44.M[mk][2][1], -30) }); Q44.T(ctx, 'سقط ' + fallen + ' من ' + NP, g.x1 - 50, y - th / 2 - 18, { s: 10.5, w: 900, c: '#b91c1c' }); });
      // temperature profile under the rods
      const A = { x: g.x0, y: 446, w: len, h: 100, x0: 0, xmax: S.p.L, xs: S.p.L / 10, lxs: S.p.L / 5, y0: 0, ymax: 300, ys: 50, lys: 100, xl: 'x (m)', yl: 'T (°C)' }; const ax = Q44.axes(ctx, A);
      Q41.line(ctx, [[ax.X(0), ax.Y(S.p.Th)], [ax.X(S.p.L), ax.Y(0)]], 'rgba(100,116,139,.6)', 1.5, [5, 4]);
      [['#dc2626', 0], ['#2563eb', 1]].forEach(q => Q41.line(ctx, S.T[q[1]].map((T, i) => [ax.X(i / (N - 1) * S.p.L), ax.Y(clamp(T, 0, 300))]), q[0], 2.4));
      const C = D.chips(S, g); Q42.drawChips(ctx, C.r); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      if (S.ex) Q44.steps(ctx, S, Object.assign({ title: 'مثال 1 ص 73' }, EX, { k: S.k }), { y: 70, x: w - 12, wd: 310 });
      else Q44.card(ctx, S, [{ t: 'الانحدار الحراري ΔT / L = ' + Math.round(S.p.Th / S.p.L) + ' °C/m', c: '#334155', w: 800 }, { t: 'H = K A ΔT / L', mono: 1, w: 900, c: '#0f766e' }, { t: 'العليا: H = ' + D.H(S, 0).toFixed(2) + ' W', c: '#dc2626', w: 900 }, { t: 'السفلى: H = ' + D.H(S, 1).toFixed(2) + ' W', c: '#2563eb', w: 900 }, { t: 'الزمن ' + Math.round(S.tim / 60) + ' min ، الجليد المنصهر ' + (S.melt[0] + S.melt[1]).toFixed(1) + ' g', c: '#334155' }, { t: S.p.ins ? 'الساقان معزولتان' : 'بلا عزل: تضيع حرارة من السطح', c: S.p.ins ? '#16a34a' : '#b91c1c', w: 800 }], { title: 'التوصيل الحراري', y: 70, wd: 310 });
      Q42.banner(ctx, w, 'اضغط «🔥 أشعل اللهب» وراقب سقوط الدبابيس');
    },
    chips(S, g) { return { r: Q42.chips(S, 'on', [['on', S.on ? '⏻ أطفئ اللهب' : '🔥 أشعل اللهب'], ['re', '↺ أعد الدبابيس'], ['cmp', 'نحاس أحمر وأصفر']], g.h - 128, '', (S2, k) => { if (k === 'on') S2.on = S2.on ? 0 : 1; else if (k === 'cmp') { setParam(S2, 'a', 'cu'); setParam(S2, 'b', 'br'); D.reset(S2); S2.on = 1; } else D.reset(S2); }, { bw: 180 }),
      e: Q44.stepChips(S, 'ex', g.h - 84, g.L, 'مثال 1: ساق الحديد', S2 => { setParam(S2, 'a', 'fe'); setParam(S2, 'b', 'cu'); setParam(S2, 'L', .5); setParam(S2, 'A', 1); setParam(S2, 'Th', 200); setParam(S2, 'ins', true); D.reset(S2); S2.on = 1; }, EX.lines.length) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); C.r[0].idle = 'اضغط ✋';
      return C.r.concat(g.ys.map((y, r) => ({ id: 'rod' + r, x: (g.x0 + g.x1) / 2, y, w: g.x1 - g.x0, h: 30, axis: 'none', hint: false, tip: 'اضغط لتغيير المادة', click: S2 => { const k = r ? 'b' : 'a', j = OPT.findIndex(q => q[0] === S2.p[k]); setParam(S2, k, OPT[(j + 1) % OPT.length][0]); } })), C.e); },
    readings(S) { return [rd('الانحدار الحراري', Math.round(S.p.Th / S.p.L) + ' °C/m'), rd('H للساق العليا ' + nm(S.p.a), D.H(S, 0).toFixed(3) + ' W'), rd('H للساق السفلى ' + nm(S.p.b), D.H(S, 1).toFixed(3) + ' W'), rd('الجليد المنصهر', (S.melt[0] + S.melt[1]).toFixed(1) + ' g')]; },
    record(S) { return { a: nm(S.p.a), b: nm(S.p.b), L: S.p.L, Ha: D.H(S, 0).toFixed(2), Hb: D.H(S, 1).toFixed(2) }; },
    cols: [['a', 'العليا'], ['b', 'السفلى'], ['L', 'L (m)'], ['Ha', 'H₁ (W)'], ['Hb', 'H₂ (W)']],
    explain(S) { return Q26.ex('الدبابيس على الساق الجيدة التوصيل تسقط أسرع وأبعد، وعلى الزجاج والخشب لا تكاد تسقط.', 'الحرارة تنتقل بالتوصيل من الجزيئات الأسخن إلى المجاورة دون انتقالها، والإلكترونات الحرة في الفلزات تنقل الطاقة بسرعة. H = K A ΔT / L.', 'أواني الطبخ من المعادن ومقابضها من مواد عازلة، وخوذة الإطفائي من النحاس الأصفر لأن توصيله (109) أقل من النحاس الأحمر (385).'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F2 — التوصيل خلال الطبقات: النافذة والحائط والجدار ذو الطبقتين (مثال 2 ص 74، الشكل 21-4، مسألة 4 ص 82، س1-3) =============== */
(() => {
  const OPT = [['gl', 'زجاج'], ['brk', 'طابوق'], ['con', 'إسمنت'], ['wd', 'خشب'], ['air', 'هواء'], ['st', 'فولاذ']];
  const PR = {
    win: { t: 'مثال 2 ص 74', m1: 'gl', L: .5, A: 2.64, T1: 22, T2: 3, two: 0, q: 'نافذة زجاجية طولها 2.2 m وعرضها 1.2 m وسمكها 5 mm ، درجة سطحها الداخلي 22 °C والخارجي 3 °C. احسب المعدل الزمني لانتقال الطاقة (K = 0.8 W/m.°C)', lines: ['H = K A (T₁ − T₂) / L', 'A = 2.2 × 1.2 = 2.64 m²', 'H = 0.8 × 2.64 × (22 − 3) / 0.005', 'H = 8026 W'] },
    wall: { t: 'مسألة 4 ص 82', m1: 'brk', L: 15, A: 10, T1: 20, T2: 10, two: 0, q: 'حائط من الطابوق مساحته 10 m² وسمكه 15 cm ، درجتا حرارة جانبيه 20 °C و 10 °C. احسب المعدل الزمني لانتقال الطاقة (K = 0.63 W/m.°C)', lines: ['H = K A ΔT / L', 'H = 0.63 × 10 × (20 − 10) / 0.15', 'H = 420 W'] },
    two: { t: 'جدار من طبقتين', m1: 'brk', L: 15, A: 10, T1: 20, T2: 0, two: 1, m2: 'wd', L2: 4 } };
  const D = { id: 'g10_t_wall', page: 74, fig: 'مثال 2 ص 74 + الشكل 21-4 + مسألة 4 ص 82',
    desc: 'تتسرب الحرارة من الغرفة الدافئة إلى الخارج بالتوصيل خلال الزجاج والجدران: H = K A ΔT / L. ويستعمل المهندسون العزل الحراري بجدار من طبقتين لهما سمكان L₁ و L₂ ومعاملا توصيل K₁ و K₂: في حالة الاستقرار يمر المعدل نفسه من الطبقتين. والمقاومة الحرارية لطبقة = سمكها ÷ معامل توصيلها.',
    tags: 'العزل الحراري نافذة زجاج 8026 W حائط طابوق 420 W جدار طبقتين المقاومة الحرارية L/K الترموس حالة الاستقرار نصف المساحة ونصف السمك',
    tools: ['نموذج غرفة بمدفأة', 'نافذة أو حائط بسمك متغير', 'محارير على السطحين'],
    steps: ['اختر مثال النافذة أو مسألة الحائط، وتابع الحل خطوة خطوة.', 'اسحب حافة الطبقة لتغيير سمكها، وغيّر المساحة ودرجتي الحرارة من اللوحة: لاحظ عرض سهم الحرارة.', 'اختر «جدار من طبقتين» وأضف طبقة خشب أو هواء: يقل H وتظهر درجة حرارة السطح الفاصل.', 'اضغط «س1-3» لترى ما يحدث عند تنصيف المساحة والسمك معاً.'],
    concl: ['H = K A ΔT / L: الطبقة الأسمك والأقل توصيلاً تقلل تسرب الحرارة.', 'مثال 2: H = 8026 W. مسألة 4: H = 420 W.', 'عند تنصيف المساحة والسمك معاً يبقى H كما هو.', 'في الجدار المركب: H = A ΔT / (L₁/K₁ + L₂/K₂)، والهواء والبوليسترين عوازل ممتازة.'],
    laws: ['g10_h4_cond'],
    controls: [SEL('m1', 'مادة الطبقة الأولى', OPT, 'gl'), R('L', 'سمك الطبقة الأولى', .2, 40, .5, .1, 'cm'), SEL('m2', 'مادة الطبقة الثانية', OPT, 'wd'), R('L2', 'سمك الطبقة الثانية', .2, 20, 4, .1, 'cm'), R('A', 'المساحة A', .5, 12, 2.64, .01, 'm²'), R('T1', 'درجة الحرارة في الداخل', -10, 40, 22, 1, '°C'), R('T2', 'درجة الحرارة في الخارج', -10, 40, 3, 1, '°C')],
    setup(S) { S.pr = 'win'; S.ex = 0; S.k = 0; S.half = 0; S.clk = 0; S.two = 0; D.load(S, 'win'); S.Hd = D.H(S); },
    load(S, k) { const P = PR[k]; S.pr = k; S.half = 0; if (!P) return; setParam(S, 'm1', P.m1); setParam(S, 'L', P.L); setParam(S, 'A', P.A); setParam(S, 'T1', P.T1); setParam(S, 'T2', P.T2); S.two = P.two; if (P.two) { setParam(S, 'm2', P.m2); setParam(S, 'L2', P.L2); } },
    R(S) { const f = S.half ? .5 : 1, r1 = S.p.L * f / 100 / Q44.M[S.p.m1][4], r2 = S.two ? S.p.L2 * f / 100 / Q44.M[S.p.m2][4] : 0; return [r1, r2]; },
    H(S) { const [r1, r2] = D.R(S), A = S.p.A * (S.half ? .5 : 1); return A * (S.p.T1 - S.p.T2) / (r1 + r2); },
    update(S, dt) { S.clk += dt; S.Hd = Q44.ease(S.Hd == null ? D.H(S) : S.Hd, D.H(S), dt, 3); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), y0 = 120, y1 = 470, sx = L + 200; const px = c => 14 + 70 * Math.sqrt(c / 40); return { w, h, L, y0, y1, sx, w1: px(S.p.L), w2: S.two ? px(S.p.L2) : 0 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), H = S.Hd, T1 = S.p.T1, T2 = S.p.T2, [r1, r2] = D.R(S), Tm = T1 - (T1 - T2) * r1 / (r1 + r2), xa = g.sx, xb = g.sx + g.w1, xc = xb + g.w2; Q44.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = Q44.tcol(T1 * 2, .25); ctx.fillRect(g.L + 10, g.y0, xa - g.L - 10, g.y1 - g.y0); ctx.fillStyle = Q44.tcol(T2 * 2 - 10, .3); ctx.fillRect(xc, g.y0, g.L + 400 - xc, g.y1 - g.y0);
        const lay = (x, wd, mk) => { const c = Q44.M[mk][2], gr = ctx.createLinearGradient(x, 0, x + wd, 0); gr.addColorStop(0, c[0]); gr.addColorStop(.5, c[1]); gr.addColorStop(1, c[2]); ctx.fillStyle = gr; ctx.globalAlpha = mk === 'gl' || mk === 'air' ? .6 : 1; ctx.fillRect(x, g.y0, wd, g.y1 - g.y0); ctx.globalAlpha = 1; ctx.strokeStyle = 'rgba(15,23,42,.4)'; ctx.strokeRect(x, g.y0, wd, g.y1 - g.y0);
          if (mk === 'brk') { ctx.strokeStyle = 'rgba(255,255,255,.55)'; for (let y = g.y0 + 18; y < g.y1; y += 18) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + wd, y); ctx.stroke(); } } };
        lay(xa, g.w1, S.p.m1); if (S.two) lay(xb, g.w2, S.p.m2);
        // heater inside + snow outside
        ctx.fillStyle = '#7f1d1d'; rr(ctx, g.L + 30, g.y1 - 70, 70, 60, 6); ctx.fill(); ctx.strokeStyle = '#f97316'; ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(g.L + 40 + i * 16, g.y1 - 60); ctx.lineTo(g.L + 40 + i * 16, g.y1 - 20); ctx.stroke(); }
        if (T2 < 5) { ctx.fillStyle = 'rgba(255,255,255,.95)'; for (let i = 0; i < 26; i++) { const x = xc + 10 + (i * 37) % (g.L + 390 - xc), y = g.y0 + ((i * 53 + S.clk * 40 * (1 + i % 3)) % (g.y1 - g.y0)); ctx.beginPath(); ctx.arc(x, y, 2.5, 0, TAU); ctx.fill(); } } });
      // heat flow arrows (width ∝ H) and temperature profile
      const lw = clamp(2 + Math.log10(Math.max(1, Math.abs(H))) * 3, 2, 14), my = (g.y0 + g.y1) / 2; for (let k = -1; k <= 1; k++) Q44.heat(ctx, g.L + 110, my + k * 70, xc - g.L - 60 + 40, 0, S.clk, 'rgba(220,38,38,.75)', lw * (k ? .6 : 1));
      const Ty = T => g.y0 + 40 + (40 - T) / 50 * 110; Q41.line(ctx, [[g.L + 20, Ty(T1)], [xa, Ty(T1)], [xb, Ty(S.two ? Tm : T2)]].concat(S.two ? [[xc, Ty(T2)]] : []).concat([[g.L + 395, Ty(T2)]]), '#7c3aed', 2.6);
      Q44.T(ctx, 'T₁ = ' + T1 + ' °C', g.L + 70, Ty(T1) - 14, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' }); Q44.T(ctx, 'T₂ = ' + T2 + ' °C', xc + 60, Ty(T2) + 16, { s: 11, w: 900, c: '#fff', bg: '#0369a1' });
      if (S.two) Q44.T(ctx, Tm.toFixed(1) + ' °C', xb, Ty(Tm) + 18, { s: 10.5, w: 900, c: '#fff', bg: '#7c3aed' });
      Q44.T(ctx, Q44.nm(S.p.m1) + ' ' + (S.p.L * (S.half ? .5 : 1)).toFixed(1) + ' cm', xa + g.w1 / 2, g.y1 + 16, { s: 10.5, w: 900, c: '#334155' }); if (S.two) Q44.T(ctx, Q44.nm(S.p.m2) + ' ' + S.p.L2.toFixed(1) + ' cm', xb + g.w2 / 2, g.y1 + 36, { s: 10.5, w: 900, c: '#334155' });
      Q44.T(ctx, 'الداخل', g.L + 60, g.y0 + 16, { s: 11, w: 900, c: '#b91c1c' }); Q44.T(ctx, 'الخارج', g.L + 360, g.y0 + 16, { s: 11, w: 900, c: '#0369a1' });
      Q44.T(ctx, 'H = ' + Math.round(H) + ' W', (g.L + 110 + xa) / 2 - 4, my + 112, { s: 14, w: 900, c: '#fff', bg: '#dc2626' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.h); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      const P = PR[S.pr];
      if (S.ex && P && P.lines) Q44.steps(ctx, S, { title: P.t, q: P.q, lines: P.lines, k: S.k }, { y: 70, x: w - 12, wd: 310 });
      else Q44.card(ctx, S, [{ t: S.two ? 'H = A ΔT / (L₁/K₁ + L₂/K₂)' : 'H = K A ΔT / L', mono: 1, w: 900, c: '#0f766e' }, { t: 'K₁ = ' + Q44.M[S.p.m1][4] + ' W/m.°C', mono: 1 }].concat(S.two ? [{ t: 'K₂ = ' + Q44.M[S.p.m2][4] + ' W/m.°C', mono: 1 }] : []).concat([{ t: 'المقاومة الحرارية L/K = ' + (r1 + r2).toFixed(4), c: '#7c3aed', w: 800 }, { t: 'A = ' + (S.p.A * (S.half ? .5 : 1)).toFixed(2) + ' m² ، ΔT = ' + (T1 - T2) + ' °C', mono: 1 }, { t: 'H = ' + Math.round(D.H(S)) + ' W', mono: 1, c: '#b91c1c', w: 900 }]).concat(S.half ? [{ t: 'نصف A ونصف L ⟸ H لا يتغير', c: '#16a34a', w: 900 }] : []).concat(S.two ? [{ t: 'المعدل نفسه يمر في الطبقتين', c: '#334155' }] : []), { title: P ? P.t : 'تسرب الحرارة بالتوصيل', y: 70, wd: 310 });
      Q42.banner(ctx, w, 'اسحب حافة الطبقة لتغيير سمكها');
    },
    chips(S, g) { return { p: Q42.chips(S, 'pr', [['win', 'مثال 2: النافذة'], ['wall', 'مسألة 4: الحائط'], ['two', 'جدار من طبقتين'], ['free', 'حر']], g.h - 128, S.pr, (S2, k) => { S2.ex = 0; if (k === 'free') { S2.pr = 'free'; S2.half = 0; } else D.load(S2, k); }, { bw: 170 }),
      h: Q42.chips(S, 'half', [['half', S.half ? '↺ الأبعاد الأصلية' : 'س1-3: نصف A ونصف L']], g.h - 84, '', S2 => { S2.half = S2.half ? 0 : 1; }, { bw: 200, x0: g.L + 340 }),
      e: Q44.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { if (!PR[S2.pr] || !PR[S2.pr].lines) D.load(S2, 'win'); }, 4) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), L = [{ id: 'th1', x: g.sx + g.w1, y: g.y0 + 60, w: 22, h: 60, axis: 'x', keep: true, tip: 'اسحب لتغيير السمك', idle: 'اسحب ✋', drag: (S2, d) => { const t = clamp((d.x - g.sx - 14) / 70, 0, 1); S2.half = 0; setParam(S2, 'L', Math.max(.2, Math.round(t * t * 40 * 10) / 10)); } }];
      if (S.two) L.push({ id: 'th2', x: g.sx + g.w1 + g.w2, y: g.y0 + 130, w: 22, h: 60, axis: 'x', keep: true, hint: false, tip: 'اسحب لتغيير سمك الطبقة الثانية', drag: (S2, d) => { const t = clamp((d.x - g.sx - g.w1 - 14) / 70, 0, 1); setParam(S2, 'L2', Math.max(.2, Math.round(t * t * 40 * 10) / 10)); } });
      return L.concat(C.p, C.h, C.e); },
    readings(S) { return [rd('المعدل الزمني H', Math.round(D.H(S)) + ' W'), rd('المقاومة الحرارية L/K', D.R(S).reduce((a, b) => a + b, 0).toFixed(4) + ' m².°C/W'), rd('فرق درجات الحرارة', (S.p.T1 - S.p.T2) + ' °C')]; },
    explain(S) { return Q26.ex('كلما زاد سمك الطبقة أو قل معامل توصيلها ضاق سهم الحرارة وقل H.', 'H = K A ΔT / L: الحرارة تنساب خلال الطبقة بالتوصيل، والطبقة الثانية تضيف مقاومة حرارية L/K فيقل المعدل، وفي حالة الاستقرار يمر المعدل نفسه من الطبقتين.', 'النوافذ المزدوجة بينها هواء، والجدران المعزولة بالبوليسترين، وقنينة الترموس.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F3 — الحمل الحراري: الإناء والغرفة ونسيم البر والبحر ومحرك السيارة (الأشكال 2-4 و 22-4 إلى 25-4) =============== */
(() => {
  const MODES = [['pot', 'إناء ماء على لهب'], ['room', 'مدفأة في غرفة'], ['breeze', 'نسيم البر والبحر'], ['car', 'تبريد محرك السيارة']];
  const D = { id: 'g10_t_conv', page: 75, fig: 'الأشكال 2-4 و 22-4 و 23-4 و 24-4 و 25-4',
    desc: 'الحمل الحراري: انتقال الحرارة بحركة جزيئات المائع نفسها من مكان إلى آخر، ويحصل في الموائع (السوائل والغازات) فقط. الماء القريب من المصدر يسخن ويتمدد فتقل كثافته فيرتفع حاملاً الطاقة ويحل محله ماء أبرد (حمل طبيعي حر بتأثير الجاذبية). وفي الحمل القسري تدفع مضخة أو مروحة المائع كما في التدفئة المركزية وتبريد محرك السيارة.',
    tags: 'الحمل الحراري تيارات الحمل الحمل الطبيعي الحر الحمل القسري الاضطراري مضخة مروحة مدفأة إبريق نسيم البر والبحر الحرارة النوعية للماء محرك السيارة المشع الحراري radiator التدفئة المركزية',
    tools: ['إناء زجاجي فيه ماء وبلورات صبغة', 'مصباح بنزن', 'مدفأة', 'نموذج محرك ومشع ومضخة'],
    steps: ['في «إناء ماء» اسحب اللهب تحت الإناء وراقب حركة جزيئات الصبغة: تصعد فوق اللهب وتهبط بعيداً عنه.', 'في «مدفأة في غرفة» يصعد الهواء الساخن ويهبط البارد فتدفأ الغرفة كلها.', 'في «نسيم البر والبحر» بدّل بين النهار والليل: اليابسة تسخن وتبرد أسرع من البحر.', 'في «تبريد المحرك» أطفئ المضخة والمروحة وراقب ارتفاع درجة حرارة المحرك.'],
    concl: ['الحمل يحصل في الموائع فقط بانتقال جزيئات المائع الساخنة الأقل كثافة إلى الأعلى.', 'الحمل الطبيعي يتولد بتأثير الجاذبية، والقسري تولده مضخة أو مروحة.', 'نهاراً يهب النسيم من البحر إلى البر وليلاً من البر إلى البحر، لأن الحرارة النوعية للماء كبيرة.', 'تبريد محرك السيارة: توصيل من المحرك إلى الماء، وحمل قسري بالمضخة، ثم حمل وإشعاع من المشع بمساعدة المروحة.'],
    laws: ['g10_h4_q'],
    controls: [R('P', 'شدة التسخين', 0, 100, 70, 1, '%'), TG('pump', 'المضخة والمروحة', true, null, 'fan'), TG('dots', 'جسيمات ملونة', true, null, 'particles')],
    setup(S) { S.md = 'pot'; S.fx = .5; S.day = 1; S.clk = 0; S.Te = 85; S.Tl = 30; S.Ts = 24; S.ph = 0; D.seed(S); },
    seed(S) { S.pt = []; for (let i = 0; i < 140; i++) S.pt.push({ u: Math.random(), v: Math.random(), T: 0 }); },
    box(S, g) { if (S.md === 'pot') return { x: g.L + 60, y: 150, w: 320, h: 260 }; if (S.md === 'room') return { x: g.L + 30, y: 110, w: 370, h: 330 }; if (S.md === 'breeze') return { x: g.L + 10, y: 100, w: 392, h: 230 }; return null; },
    /* source position u (0..1) of the rising column */
    src(S) { return S.md === 'pot' ? S.fx : S.md === 'room' ? .06 : S.day ? .27 : .73; },
    /* two counter-rotating cells split at the source xs (one cell when the source is at a wall): stream function ψ = ±A sin(πa) sin(πv) — divergence-free, rising over xs */
    vel(S, u, v) { let xs = D.src(S); if (xs < .1) xs = 0; const A = .12 * ((S.md === 'breeze' ? .35 : .5) * (S.md === 'breeze' ? 1 : S.p.P / 100) + .03), PI = Math.PI;
      if (u < xs) { const W = xs, a = u / W; return [-A * PI * Math.sin(PI * a) * Math.cos(PI * v), A * PI / W * Math.cos(PI * a) * Math.sin(PI * v), xs / 2]; }
      const W = 1 - xs, a = (u - xs) / W; return [A * PI * Math.sin(PI * a) * Math.cos(PI * v), -A * PI / W * Math.cos(PI * a) * Math.sin(PI * v), xs + W / 2]; },
    update(S, dt) { S.clk += dt;
      if (S.md === 'car') { S.ph = (S.ph + dt * (S.p.pump ? 1 : 0)) % 1000; const cool = S.p.pump ? .35 : .03; S.Te += (1.6 * S.p.P / 100 * 6 - cool * (S.Te - 30)) * dt * .4; S.Te = clamp(S.Te, 20, 130); return; }
      if (S.md === 'breeze') { const tl = S.day ? 34 : 14, ts = S.day ? 24 : 21; S.Tl = Q44.ease(S.Tl, tl, dt, .6); S.Ts = Q44.ease(S.Ts, ts, dt, .12); }
      if (!S.pt) D.seed(S); const xs = D.src(S);
      const h = Math.min(dt, .05) / 2; S.pt.forEach(p => { for (let k = 0; k < 2; k++) { const v1 = D.vel(S, p.u, p.v), v2 = D.vel(S, p.u + v1[0] * h / 2, p.v + v1[1] * h / 2); p.u += v2[0] * h + (Math.random() - .5) * .004; p.v += v2[1] * h + (Math.random() - .5) * .004; } p.u = clamp(p.u, .03, .97); p.v = clamp(p.v, .03, .97);
        const near = Math.abs(p.u - xs) < .12 && (S.md === 'breeze' ? p.v > .8 : p.v > .78); if (near) p.T = Math.min(1, p.T + dt * 1.8 * (S.md === 'breeze' ? 1 : S.p.P / 100)); else p.T = Math.max(0, p.T - dt * (p.v < .2 ? .6 : .22)); }); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L }; },
    flow(ctx, S, b, col) { if (!S.p.dots) return; K.raw(ctx, () => { S.pt.forEach(p => { const x = b.x + p.u * b.w, y = b.y + p.v * b.h; ctx.fillStyle = col ? col(p) : 'rgb(' + Math.round(37 + 183 * p.T) + ',' + Math.round(99 - 61 * p.T) + ',' + Math.round(235 - 197 * p.T) + ')'; ctx.beginPath(); ctx.arc(x, y, 3.2, 0, TAU); ctx.fill(); }); }); },
    arrows(ctx, S, b) { const xs = D.src(S); const c = '#dc2626', d = '#2563eb'; Q44.heat(ctx, b.x + xs * b.w, b.y + b.h * .8, 0, -b.h * .55, S.clk, c, 3); const far = xs < .5 ? .88 : .12; Q44.heat(ctx, b.x + far * b.w, b.y + b.h * .2, 0, b.h * .55, S.clk, d, 3); },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q44.bg(ctx, w, h); const b = D.box(S, g);
      if (S.md === 'pot') { K.raw(ctx, () => { ctx.fillStyle = 'rgba(186,230,253,.55)'; ctx.fillRect(b.x, b.y, b.w, b.h); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(b.x - 4, b.y - 30); ctx.lineTo(b.x - 4, b.y + b.h + 4); ctx.lineTo(b.x + b.w + 4, b.y + b.h + 4); ctx.lineTo(b.x + b.w + 4, b.y - 30); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.fillRect(b.x - 20, b.y + b.h + 8, b.w + 40, 8); });
        D.flow(ctx, S, b, p => 'rgba(' + Math.round(124 + p.T * 100) + ',' + Math.round(58 - p.T * 30) + ',' + Math.round(237 - p.T * 180) + ',.85)'); D.arrows(ctx, S, b);
        Q44.burner(ctx, b.x + S.fx * b.w, b.y + b.h + 18, S.p.P / 100, S.clk); Q44.bench(ctx, g.L, g.L + 404, b.y + b.h + 60);
        Q44.card(ctx, S, [{ t: 'الماء فوق اللهب يسخن ويتمدد', c: '#b91c1c', w: 800 }, { t: 'تقل كثافته فيرتفع حاملاً الطاقة', c: '#b91c1c' }, { t: 'ويهبط الماء الأبرد ليحل محله', c: '#2563eb', w: 800 }, { t: 'تيار حمل: حمل طبيعي حر', c: '#0f766e', w: 900 }], { title: 'الحمل في السوائل — الشكل 23-4', y: 70, wd: 300 }); }
      else if (S.md === 'room') { K.raw(ctx, () => { ctx.fillStyle = '#fefce8'; ctx.fillRect(b.x, b.y, b.w, b.h); ctx.strokeStyle = '#78716c'; ctx.lineWidth = 6; ctx.strokeRect(b.x, b.y, b.w, b.h); ctx.fillStyle = '#bae6fd'; ctx.fillRect(b.x + b.w - 6, b.y + 60, 8, 110); ctx.fillStyle = '#7f1d1d'; rr(ctx, b.x + 6, b.y + b.h - 70, 44, 64, 6); ctx.fill(); ctx.strokeStyle = 'rgba(249,115,22,' + (.3 + .7 * S.p.P / 100) + ')'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(b.x + 16 + i * 12, b.y + b.h - 60); ctx.lineTo(b.x + 16 + i * 12, b.y + b.h - 16); ctx.stroke(); } });
        D.flow(ctx, S, b); D.arrows(ctx, S, b); Q44.T(ctx, 'مدفأة', b.x + 28, b.y + b.h + 16, { s: 11, w: 900, c: '#7f1d1d' }); Q44.T(ctx, 'نافذة باردة', b.x + b.w - 50, b.y + 46, { s: 10.5, w: 900, c: '#0369a1' });
        Q44.card(ctx, S, [{ t: 'الهواء الساخن أقل كثافة', c: '#b91c1c', w: 800 }, { t: 'القوة الصعودية أكبر من وزنه فيرتفع', c: '#b91c1c' }, { t: 'الهواء البارد أكبر كثافة فيهبط', c: '#2563eb', w: 800 }, { t: 'فتدفأ الغرفة كلها بالحمل', c: '#0f766e', w: 900 }, { t: 'في التدفئة المركزية تدفع مروحة الهواء أو تضخ مضخة الماء الساخن: حمل قسري', c: '#7c3aed' }], { title: 'الحمل في الغازات — الشكلان 22-4 و 24-4', y: 70, wd: 300 }); }
      else if (S.md === 'breeze') { const day = S.day; K.raw(ctx, () => { const sky = ctx.createLinearGradient(0, b.y, 0, b.y + b.h); sky.addColorStop(0, day ? '#7dd3fc' : '#1e1b4b'); sky.addColorStop(1, day ? '#e0f2fe' : '#4338ca'); ctx.fillStyle = sky; ctx.fillRect(b.x, b.y - 10, b.w, b.h + 10);
          ctx.fillStyle = Q44.tcol(S.Tl * 2 - 20, 1); ctx.fillRect(b.x, b.y + b.h, b.w * .5, 70); ctx.fillStyle = '#a16207'; ctx.globalAlpha = .55; ctx.fillRect(b.x, b.y + b.h, b.w * .5, 70); ctx.globalAlpha = 1; ctx.fillStyle = '#0369a1'; ctx.fillRect(b.x + b.w * .5, b.y + b.h + 8, b.w * .5, 62); ctx.fillStyle = 'rgba(255,255,255,.4)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(b.x + b.w * .55 + i * 34 + Math.sin(S.clk + i) * 4, b.y + b.h + 12, 8, Math.PI, 0); ctx.fill(); }
          ctx.fillStyle = day ? '#fde047' : '#e2e8f0'; ctx.beginPath(); ctx.arc(b.x + (day ? 60 : b.w - 60), b.y + 30, 20, 0, TAU); ctx.fill(); if (!day) { ctx.fillStyle = '#1e1b4b'; ctx.beginPath(); ctx.arc(b.x + b.w - 52, b.y + 24, 18, 0, TAU); ctx.fill(); } });
        D.flow(ctx, S, b, p => 'rgba(255,' + Math.round(255 - 100 * p.T) + ',' + Math.round(255 - 200 * p.T) + ',.92)'); D.arrows(ctx, S, b);
        Q44.T(ctx, 'اليابسة ' + S.Tl.toFixed(1) + ' °C', b.x + b.w * .25, b.y + b.h + 40, { s: 11.5, w: 900, c: '#fff', bg: '#92400e' }); Q44.T(ctx, 'البحر ' + S.Ts.toFixed(1) + ' °C', b.x + b.w * .75, b.y + b.h + 40, { s: 11.5, w: 900, c: '#fff', bg: '#075985' });
        Q44.T(ctx, day ? 'نسيم البحر: من البحر إلى البر' : 'نسيم البر: من البر إلى البحر', b.x + b.w / 2, b.y + b.h - 16, { s: 12, w: 900, c: '#fff', bg: day ? '#0f766e' : '#4338ca' });
        Q44.card(ctx, S, [{ t: 'الحرارة النوعية للماء كبيرة', c: '#0369a1', w: 900 }, { t: 'اليابسة تسخن نهاراً وتبرد ليلاً أسرع', c: '#92400e' }, { t: day ? 'نهاراً: الهواء فوق اليابسة يسخن ويرتفع' : 'ليلاً: البحر أدفأ فيرتفع الهواء فوقه', c: '#b91c1c', w: 800 }, { t: day ? 'فيهب هواء البحر الأبرد نحو البر' : 'فيهب هواء البر الأبرد نحو البحر', c: '#2563eb', w: 800 }], { title: 'نسيم البر والبحر — الشكل 2-4', y: 70, wd: 300 }); }
      else { const ex = g.L + 110, ey = 300, rx = g.L + 290, ry = 300; // engine + radiator + loop
        K.raw(ctx, () => { ctx.fillStyle = Q44.tcol(S.Te, 1); ctx.globalAlpha = .35; rr(ctx, ex - 80, ey - 70, 160, 140, 12); ctx.fill(); ctx.globalAlpha = 1; ctx.fillStyle = '#475569'; rr(ctx, ex - 70, ey - 60, 140, 120, 10); ctx.fill(); ctx.fillStyle = '#64748b'; for (let i = 0; i < 4; i++) { rr(ctx, ex - 56 + i * 32, ey - 82, 22, 30, 4); ctx.fill(); }
          ctx.fillStyle = '#1e293b'; rr(ctx, rx - 40, ry - 100, 80, 200, 6); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; for (let y = ry - 92; y < ry + 96; y += 8) { ctx.beginPath(); ctx.moveTo(rx - 36, y); ctx.lineTo(rx + 36, y); ctx.stroke(); }
          const pth = [[ex + 70, ey - 30], [rx - 40, ry - 80], [rx - 40, ry + 80], [ex + 70, ey + 30]]; ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(pth[0][0], pth[0][1]); ctx.lineTo(pth[1][0], pth[0][1]); ctx.moveTo(pth[2][0], pth[3][1] + 50); ctx.lineTo(pth[3][0], pth[3][1] + 50); ctx.lineTo(pth[3][0], pth[3][1]); ctx.stroke();
          ctx.fillStyle = '#0f766e'; ctx.beginPath(); ctx.arc(ex + 110, ey + 80, 16, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; const a = S.ph * 12; ctx.beginPath(); ctx.moveTo(ex + 110 + Math.cos(a) * 12, ey + 80 + Math.sin(a) * 12); ctx.lineTo(ex + 110 - Math.cos(a) * 12, ey + 80 - Math.sin(a) * 12); ctx.stroke();
          ctx.save(); ctx.translate(rx + 70, ry); ctx.fillStyle = '#334155'; for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(S.ph * 20 + i * Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, -22, 8, 22, 0, 0, TAU); ctx.fill(); ctx.restore(); } ctx.restore();
          if (S.p.dots) for (let i = 0; i < 14; i++) { const f = (i / 14 + S.ph * .4) % 1, L1 = rx - 40 - (ex + 70), seg = f * 2; let x, y, T; if (seg < 1) { x = ex + 70 + L1 * seg; y = ey - 30; T = S.Te; } else { x = rx - 40 - L1 * (seg - 1); y = ey + 80; T = 40; } ctx.fillStyle = Q44.tcol(T, .95); ctx.beginPath(); ctx.arc(x, y, 4, 0, TAU); ctx.fill(); } });
        Q44.heat(ctx, rx + 40, ry - 60, 50, -30, S.clk, '#f97316', 2.5); Q44.T(ctx, 'المحرك ' + S.Te.toFixed(0) + ' °C', ex, ey + 100, { s: 12, w: 900, c: '#fff', bg: S.Te > 105 ? '#dc2626' : '#0f766e' }); Q44.T(ctx, 'المشع', rx, ry + 118, { s: 11, w: 900, c: '#334155' }); Q44.T(ctx, 'مضخة', ex + 110, ey + 110, { s: 10.5, w: 900, c: '#0f766e' });
        if (S.Te > 105) Q44.T(ctx, 'المحرك يسخن جداً!', ex, ey - 110, { s: 12.5, w: 900, c: '#fff', bg: '#dc2626' });
        Q44.card(ctx, S, [{ t: 'فكر ص 76: طرائق انتقال الحرارة', c: '#7c3aed', w: 900 }, { t: 'من المحرك إلى الماء: توصيل', c: '#334155' }, { t: 'دوران الماء بالمضخة: حمل قسري', c: '#0284c7', w: 800 }, { t: 'من المشع إلى الهواء: حمل بالمروحة وإشعاع', c: '#f97316', w: 800 }, { t: 'لا تفتح غطاء المشع والمحرك ساخن: الماء المضغوط يغلي ويندفع', c: '#b91c1c' }], { title: 'التبريد في محرك السيارة — الشكل 25-4', y: 70, wd: 300 }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); if (C.a) Q42.drawChips(ctx, C.a);
      Q42.banner(ctx, w, S.md === 'pot' ? 'اسحب اللهب تحت الإناء وراقب تيار الحمل' : S.md === 'breeze' ? 'بدّل بين النهار والليل' : S.md === 'car' ? 'أطفئ المضخة والمروحة وراقب المحرك' : 'راقب حركة الهواء في الغرفة');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', MODES, g.h - 128, S.md, (S2, k) => { S2.md = k; D.seed(S2); }, { bw: 175 }),
      a: S.md === 'breeze' ? Q42.chips(S, 'day', [['1', '☀ النهار'], ['0', '☾ الليل']], g.h - 84, String(S.day), (S2, k) => { S2.day = +k; }, { bw: 150 })
        : S.md === 'car' ? Q42.chips(S, 'pump', [['p', S.p.pump ? '⏻ أطفئ المضخة والمروحة' : '⏻ شغّل المضخة والمروحة']], g.h - 84, '', S2 => setParam(S2, 'pump', !S2.p.pump), { bw: 260 }) : null }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), b = D.box(S, g), L = [];
      if (S.md === 'pot') L.push({ id: 'flame', x: b.x + S.fx * b.w, y: b.y + b.h + 40, r: 26, axis: 'x', keep: true, tip: 'اسحب اللهب', idle: 'اسحب ✋', drag: (S2, d) => { S2.fx = clamp((d.x - b.x) / b.w, .12, .88); } });
      if (S.md === 'breeze') L.push({ id: 'sun', x: b.x + (S.day ? 60 : b.w - 60), y: b.y + 30, r: 26, axis: 'none', tip: 'اضغط للتبديل بين النهار والليل', idle: 'اضغط ✋', click: S2 => { S2.day = S2.day ? 0 : 1; } });
      if (S.md === 'room') L.push({ id: 'heater', x: b.x + 28, y: b.y + b.h - 38, r: 34, axis: 'none', tip: 'اضغط لتغيير شدة المدفأة', idle: 'اضغط ✋', click: S2 => setParam(S2, 'P', S2.p.P > 60 ? 30 : 100) });
      if (S.md === 'car') L.push({ id: 'pumpT', x: g.L + 220, y: 380, r: 26, axis: 'none', tip: 'اضغط لتشغيل المضخة أو إطفائها', idle: 'اضغط ✋', click: S2 => setParam(S2, 'pump', !S2.p.pump) });
      const ch = C.a ? C.a.concat(C.m) : C.m; if (!L.length) ch[0].idle = 'اضغط ✋'; return L.concat(ch); },
    readings(S) { return S.md === 'car' ? [rd('درجة حرارة المحرك', S.Te.toFixed(0) + ' °C'), rd('المضخة والمروحة', S.p.pump ? 'تعمل' : 'متوقفة')] : S.md === 'breeze' ? [rd('اليابسة', S.Tl.toFixed(1) + ' °C'), rd('البحر', S.Ts.toFixed(1) + ' °C'), rd('الوقت', S.day ? 'نهار' : 'ليل')] : [rd('شدة التسخين', S.p.P + ' %')]; },
    explain(S) { return Q26.ex('الجسيمات تصعد فوق مصدر الحرارة وتهبط في الجهة الباردة في دورة مستمرة.', 'المائع الساخن يتمدد فتقل كثافته فتصبح القوة الصعودية أكبر من وزنه فيرتفع، والبارد الأكثر كثافة يهبط ليحل محله، فتنتقل الطاقة بحركة المائع نفسه.', 'تدفئة الغرف بالمدافئ، ونسيم البر والبحر، وتبريد محركات السيارات بالماء والمضخة والمروحة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F4 — الإشعاع: امتصاص وانبعاث الأسطح وتوهج الأجسام والسخان الشمسي (ص 77، الشكلان 26-4 و 27-4) =============== */
(() => {
  const SURF = [['blk', 'أسود خشن', .95, '#111827'], ['dark', 'داكن', .7, '#57534e'], ['wht', 'أبيض', .3, '#f8fafc'], ['shy', 'فضي لامع', .08, '#e5e7eb']];
  const sf = k => SURF.find(q => q[0] === k);
  const MODES = [['abs', 'الامتصاص'], ['emit', 'الانبعاث'], ['glow', 'توهج ساق ساخنة'], ['solar', 'السخان الشمسي']];
  const D = { id: 'g10_t_rad', page: 77, fig: 'الشكلان 26-4 و 27-4 + ص 77',
    desc: 'الإشعاع: انتقال الحرارة بشكل موجات كهرومغناطيسية بسرعة الضوء، ولا يحتاج إلى وسط مادي، لذا تصل حرارة الشمس إلى الأرض عبر الفراغ. الطاقة المنبعثة تعتمد على طبيعة السطح (مساحته ولونه) وعلى درجة حرارته، والأجسام جيدة الإشعاع جيدة الامتصاص: السطح الأسود الخشن يمتص ويشع أكثر من الفاتح المصقول.',
    tags: 'الإشعاع الحراري موجات كهرومغناطيسية الأشعة تحت الحمراء الفراغ السطح الأسود اللامع الامتصاص الانبعاث توهج البيوت البلاستيكية السخان الشمسي التصوير الليلي طلاء أسود',
    tools: ['علبتان متماثلتان سوداء وفضية لامعة', 'مصباح أشعة تحت حمراء', 'محراران', 'ساق حديد ومصباح بنزن', 'نموذج سخان شمسي'],
    steps: ['في «الامتصاص» شغّل المصباح: أي العلبتين تسخن أسرع؟ غيّر لون العلبة الثانية من الأزرار.', 'في «الانبعاث» العلبتان مملوءتان بماء 80 °C: السوداء تبرد أسرع لأنها تشع أكثر.', 'في «توهج ساق» ارفع درجة الحرارة: الإشعاع غير مرئي في البداية ثم يحمر ثم يبيض.', 'في «السخان الشمسي» قارن الأنابيب السوداء بغير المطلية.'],
    concl: ['الإشعاع لا يحتاج إلى وسط مادي وينتقل بسرعة الضوء.', 'السطح الأسود الخشن جيد الامتصاص وجيد الإشعاع، والفاتح المصقول ضعيف الامتصاص والإشعاع.', 'تزداد الطاقة المشعة بزيادة مساحة السطح ودرجة حرارته، وتصبح مرئية عند درجات الحرارة العالية.', 'تطبيقات: البيوت البلاستيكية، السخان الشمسي (أنابيب مطلية بالأسود)، التدفئة المركزية، التصوير الليلي بالأشعة تحت الحمراء.'],
    laws: [],
    controls: [R('I', 'شدة الإشعاع (المصباح أو الشمس)', 0, 100, 80, 1, '%'), TG('waves', 'إظهار الموجات', true, null, 'rays')],
    setup(S) { S.md = 'abs'; S.b = 'shy'; S.clk = 0; D.reset(S); },
    reset(S) { S.on = 0; S.T = S.md === 'emit' ? [80, 80] : [20, 20]; S.Tr = 20; S.Trt = 20; S.paint = 1; S.tk = [20, 20]; S.hist = []; S.ht = 0; },
    update(S, dt) { S.clk += dt; const a = [.95, sf(S.b)[2]], I = S.p.I / 100;
      if (S.md === 'abs') { if (S.on) for (let i = 0; i < 2; i++) S.T[i] += (a[i] * I * 2.2 - .045 * (S.T[i] - 20)) * dt; else for (let i = 0; i < 2; i++) S.T[i] += -.045 * (S.T[i] - 20) * dt; }
      if (S.md === 'emit') for (let i = 0; i < 2; i++) S.T[i] += -(.012 + .06 * a[i]) * (S.T[i] - 20) * dt;
      if (S.md === 'abs' || S.md === 'emit') { S.ht += dt; if (!S.hist.length || S.ht - S.hist[S.hist.length - 1][0] > .2) { S.hist.push([S.ht, S.T[0], S.T[1]]); if (S.hist.length > 300) S.hist.shift(); } }
      if (S.md === 'glow') S.Tr = Q44.ease(S.Tr, S.Trt, dt, .6);
      if (S.md === 'solar') { [.95, .3].forEach((ab, i) => { S.tk[i] += (ab * I * 1.6 - .03 * (S.tk[i] - 20)) * dt; }); } },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L }; },
    can(ctx, x, yb, k, T, lab) { const c = sf(k); K.raw(ctx, () => { const g = ctx.createLinearGradient(x - 36, 0, x + 36, 0); if (k === 'shy') { g.addColorStop(0, '#9ca3af'); g.addColorStop(.3, '#ffffff'); g.addColorStop(.6, '#d1d5db'); g.addColorStop(1, '#6b7280'); } else { g.addColorStop(0, shade(c[3], -20)); g.addColorStop(.35, shade(c[3], 25)); g.addColorStop(1, shade(c[3], -35)); } ctx.fillStyle = g; rr(ctx, x - 36, yb - 120, 72, 120, 6); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.ellipse(x, yb - 120, 36, 6, 0, 0, TAU); ctx.fill(); });
      Q44.thermo(ctx, x + 10, yb - 60, 150, T, 0, 100, { col: '#b91c1c' }); Q44.T(ctx, lab, x, yb + 34, { s: 11.5, w: 900, c: '#334155' }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), I = S.p.I / 100; Q44.bg(ctx, w, h);
      if (S.md === 'abs' || S.md === 'emit') { const yb = 430, xa = g.L + 120, xb = g.L + 320; Q44.bench(ctx, g.L, g.L + 440, yb);
        if (S.md === 'abs') { const lx = (xa + xb) / 2, ly = 130; K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.moveTo(lx - 40, ly - 30); ctx.lineTo(lx + 40, ly - 30); ctx.lineTo(lx + 24, ly); ctx.lineTo(lx - 24, ly); ctx.closePath(); ctx.fill(); if (S.on) { const gl = ctx.createRadialGradient(lx, ly, 4, lx, ly, 70); gl.addColorStop(0, 'rgba(254,202,202,' + (.4 + .6 * I) + ')'); gl.addColorStop(1, 'rgba(248,113,113,0)'); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(lx, ly, 70, 0, TAU); ctx.fill(); } ctx.fillStyle = S.on ? '#fecaca' : '#cbd5e1'; ctx.beginPath(); ctx.arc(lx, ly + 4, 14, 0, Math.PI); ctx.fill(); });
          if (S.on && S.p.waves) [xa, xb].forEach(x => { const dx = x - lx, dy = yb - 140 - 130; for (let k = 0; k < 2; k++) Q44.heat(ctx, lx + dx * .1 + (k ? 12 : -12), 150, dx * .8, dy * .85, S.clk, 'rgba(220,38,38,' + (.35 + .5 * I) + ')', 2); }); }
        else if (S.p.waves) [[xa, 0], [xb, 1]].forEach(q => { const a = q[1] ? sf(S.b)[2] : .95, n = Math.round(1 + a * 3); for (let k = 0; k < n; k++) { const ang = -Math.PI / 2 + (k - (n - 1) / 2) * .5; Q44.heat(ctx, q[0] + Math.cos(ang) * 40, yb - 60 + Math.sin(ang) * 70, Math.cos(ang) * 50, Math.sin(ang) * 40, S.clk, 'rgba(220,38,38,' + clamp((S.T[q[1]] - 20) / 80, .1, .8) + ')', 2); } });
        D.can(ctx, xa, yb, 'blk', S.T[0], 'أسود خشن'); D.can(ctx, xb, yb, S.b, S.T[1], sf(S.b)[1]);
        const A = { x: g.w - 300, y: 372, w: 270, h: 150, xmax: Math.max(20, Math.ceil(S.ht / 10) * 10), xs: 5, lxs: 10, ymax: 100, ys: 10, lys: 20, xl: 't (s)', yl: 'T (°C)' }; const ax = Q41.axes(ctx, A); if (S.hist.length > 1) { Q41.line(ctx, S.hist.map(q => [ax.X(q[0]), ax.Y(q[1])]), '#111827', 2.2); Q41.line(ctx, S.hist.map(q => [ax.X(q[0]), ax.Y(q[2])]), '#94a3b8', 2.2); }
        Q44.card(ctx, S, S.md === 'abs' ? [{ t: 'الأسود الخشن يمتص 95% تقريباً', c: '#111827', w: 900 }, { t: sf(S.b)[1] + ' يمتص ' + Math.round(sf(S.b)[2] * 100) + '% تقريباً', c: '#475569', w: 800 }, { t: 'الأجسام الفاتحة والمصقولة تمتص طاقة أقل', c: '#b91c1c' }, { t: 'الامتصاص يعتمد على نوع المادة ولونها ومدى صقلها', c: '#0f766e', w: 800 }] : [{ t: 'جيد الامتصاص جيد الإشعاع', c: '#b91c1c', w: 900 }, { t: 'العلبة السوداء تشع أكثر فتبرد أسرع', c: '#111827', w: 800 }, { t: 'الإبريق الفضي اللامع يحفظ الشاي ساخناً', c: '#475569' }, { t: 'المساحة الأكبر تشع طاقة أكثر', c: '#0f766e' }], { title: S.md === 'abs' ? 'امتصاص الإشعاع' : 'انبعاث الإشعاع', y: 70, wd: 300 }); }
      else if (S.md === 'glow') { const T = S.Tr, y = 260, x0 = g.L + 60, x1 = g.L + 400; Q44.burner(ctx, x0 + 260, y + 40, clamp((S.Trt - 20) / 1200, .1, 1), S.clk); K.raw(ctx, () => { const vis = clamp((T - 500) / 700, 0, 1), col = T < 500 ? '#374151' : T < 800 ? 'rgb(' + Math.round(120 + 135 * (T - 500) / 300) + ',30,20)' : T < 1050 ? 'rgb(255,' + Math.round(80 + 120 * (T - 800) / 250) + ',40)' : 'rgb(255,' + Math.round(200 + 55 * clamp((T - 1050) / 250, 0, 1)) + ',' + Math.round(100 + 155 * clamp((T - 1050) / 250, 0, 1)) + ')';
          ctx.save(); if (vis > 0) { ctx.shadowColor = col; ctx.shadowBlur = 30 * vis; } ctx.fillStyle = col; rr(ctx, x0, y - 12, x1 - x0, 24, 6); ctx.fill(); ctx.restore(); ctx.fillStyle = '#78350f'; rr(ctx, x0 - 50, y - 10, 54, 20, 5); ctx.fill(); });
        if (S.p.waves) for (let k = 0; k < 5; k++) Q44.heat(ctx, x0 + 40 + k * 70, y - 22, 0, -60 - (T / 1300) * 50, S.clk + k, T > 500 ? 'rgba(234,88,12,.8)' : 'rgba(148,163,184,.8)', 2);
        Q44.T(ctx, T < 500 ? 'إشعاع غير مرئي — تحت الأحمر' : T < 800 ? 'أحمر قاتم' : T < 1050 ? 'برتقالي' : 'أصفر يميل إلى الأبيض', (x0 + x1) / 2, y + 120, { s: 12.5, w: 900, c: '#fff', bg: T < 500 ? '#475569' : '#c2410c' });
        Q44.slider(ctx, g.L + 40, g.L + 420, h - 190, (S.Trt - 20) / 1280, 'درجة حرارة الساق: ' + Math.round(S.Tr) + ' °C', '#ea580c');
        Q44.card(ctx, S, [{ t: 'الأجسام جميعها تشع طاقة', c: '#334155', w: 800 }, { t: 'حتى المكعب الثلجي وأجسامنا', c: '#334155' }, { t: 'في الدرجات المنخفضة الإشعاع غير مرئي', c: '#475569' }, { t: 'وفي الدرجات المرتفعة يصبح مرئياً', c: '#c2410c', w: 900 }, { t: 'التصوير الليلي يلتقط الأشعة تحت الحمراء', c: '#7c3aed' }], { title: 'الإشعاع ودرجة الحرارة', y: 70, wd: 300 }); }
      else { const sx = g.L + 40, I2 = I; K.raw(ctx, () => { const sun = ctx.createRadialGradient(sx, 130, 4, sx, 130, 50); sun.addColorStop(0, 'rgba(253,224,71,' + (.3 + .7 * I2) + ')'); sun.addColorStop(1, 'rgba(250,204,21,0)'); ctx.fillStyle = sun; ctx.beginPath(); ctx.arc(sx, 130, 50, 0, TAU); ctx.fill(); });
        [[g.L + 120, 0, 'مطلية بالأسود'], [g.L + 320, 1, 'غير مطلية']].forEach(q => { const x = q[0], y = 260; K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(-.35); ctx.fillStyle = '#1e293b'; ctx.fillRect(-70, -40, 140, 80); ctx.fillStyle = 'rgba(186,230,253,.35)'; ctx.fillRect(-66, -36, 132, 72); ctx.strokeStyle = q[1] ? '#cbd5e1' : '#0a0a0a'; ctx.lineWidth = 7; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-58 + i * 29, -32); ctx.lineTo(-58 + i * 29, 32); ctx.stroke(); } ctx.restore(); ctx.fillStyle = Q44.tcol(S.tk[q[1]] * 1.5, 1); rr(ctx, x - 30, y - 120, 60, 40, 8); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke(); });
          if (S.p.waves) Q44.heat(ctx, sx + 40, 145, x - sx - 70, 85, S.clk, 'rgba(234,179,8,' + (.3 + .6 * I2) + ')', 2); Q44.T(ctx, q[2], x, y + 64, { s: 11, w: 900, c: '#334155' }); Q44.T(ctx, 'الخزان ' + S.tk[q[1]].toFixed(1) + ' °C', x, y - 140, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' }); });
        K.raw(ctx, () => { const hx = g.L + 220, hy = 450; ctx.fillStyle = 'rgba(224,242,254,.6)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hx - 90, hy); ctx.lineTo(hx - 90, hy - 50); ctx.quadraticCurveTo(hx, hy - 110, hx + 90, hy - 50); ctx.lineTo(hx + 90, hy); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#16a34a'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(hx - 60 + i * 30, hy - 12, 10, 0, TAU); ctx.fill(); } });
        Q44.T(ctx, 'بيت بلاستيكي: الإشعاع يدخل ويحتبس', g.L + 220, 478, { s: 10.5, w: 900, c: '#166534' });
        Q44.card(ctx, S, [{ t: 'تدهن أنابيب السخان الشمسي بالأسود', c: '#111827', w: 900 }, { t: 'لأن الأسود يمتص الإشعاع أكثر', c: '#b91c1c', w: 800 }, { t: 'البيوت البلاستيكية: إشعاع', c: '#166534' }, { t: 'السخان الشمسي: إشعاع', c: '#334155' }, { t: 'التدفئة المركزية: حمل وإشعاع', c: '#334155' }, { t: 'التصوير الليلي: إشعاع', c: '#334155' }], { title: 'تطبيقات — الشكلان 26-4 و 27-4', y: 70, wd: 300 }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); if (C.a) Q42.drawChips(ctx, C.a);
      Q42.banner(ctx, w, S.md === 'abs' ? 'شغّل المصباح وقارن المحرارين' : S.md === 'emit' ? 'راقب أي العلبتين تبرد أسرع' : S.md === 'glow' ? 'اسحب مقبض الحرارة وراقب لون الساق' : 'اضغط على الشمس أو غيّر شدتها من اللوحة');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', MODES.map(q => [q[0], q[1]]), g.h - 128, S.md, (S2, k) => { S2.md = k; D.reset(S2); }, { bw: 175 }),
      a: S.md === 'abs' || S.md === 'emit' ? Q42.chips(S, 'b', SURF.slice(1).map(q => [q[0], q[1]]).concat(S.md === 'abs' ? [['on', S.on ? '⏻ أطفئ المصباح' : '⏻ شغّل المصباح']] : [['re', '↺ املأ بماء 80']]), g.h - 84, S.b, (S2, k) => { if (k === 'on') S2.on = S2.on ? 0 : 1; else if (k === 're') { S2.T = [80, 80]; S2.hist = []; S2.ht = 0; } else { S2.b = k; S2.T = S2.md === 'emit' ? [80, 80] : [20, 20]; S2.hist = []; S2.ht = 0; } }, { bw: 160 }) : null }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), L = [];
      if (S.md === 'glow') L.push(Q41.sdrag('tr', g.L + 40, g.L + 420, g.h - 190, (S.Trt - 20) / 1280, (S2, t) => { S2.Trt = Math.round(20 + t * 1280); }, { tip: 'اسحب لتسخين الساق', extra: { idle: 'اسحب ✋' } }));
      if (S.md === 'emit') L.push({ id: 'can', x: g.L + 120, y: 370, w: 80, h: 110, axis: 'none', tip: 'اضغط لملء العلبتين بماء 80 °C', idle: 'اضغط ✋', click: S2 => { S2.T = [80, 80]; S2.hist = []; S2.ht = 0; } });
      if (S.md === 'solar') L.push({ id: 'sun', x: g.L + 40, y: 130, r: 40, axis: 'none', tip: 'اضغط لتغيير شدة أشعة الشمس', idle: 'اضغط ✋', click: S2 => setParam(S2, 'I', S2.p.I > 60 ? 30 : 100) });
      if (S.md === 'abs') { const lx = g.L + 220; L.push({ id: 'lamp', x: lx, y: 120, r: 34, axis: 'none', tip: 'اضغط لتشغيل المصباح', idle: 'اضغط ✋', click: S2 => { S2.on = S2.on ? 0 : 1; } }); }
      const ch = C.a ? C.a.concat(C.m) : C.m; if (!L.length) ch[0].idle = 'اضغط ✋'; return L.concat(ch); },
    readings(S) { if (S.md === 'glow') return [rd('درجة حرارة الساق', Math.round(S.Tr) + ' °C')]; if (S.md === 'solar') return [rd('خزان الأنابيب السوداء', S.tk[0].toFixed(1) + ' °C'), rd('خزان الأنابيب غير المطلية', S.tk[1].toFixed(1) + ' °C')]; return [rd('العلبة السوداء', S.T[0].toFixed(1) + ' °C'), rd('العلبة ' + sf(S.b)[1], S.T[1].toFixed(1) + ' °C')]; },
    explain(S) { return Q26.ex('العلبة السوداء تسخن أسرع تحت المصباح وتبرد أسرع عندما تكون ساخنة.', 'الإشعاع موجات كهرومغناطيسية لا تحتاج وسطاً. السطح الأسود الخشن جيد الامتصاص وجيد الإشعاع، والمصقول اللامع يعكس معظم الإشعاع.', 'تدهن أنابيب السخان الشمسي بالأسود، ونلبس الملابس الفاتحة صيفاً، وتلتقط كاميرات التصوير الليلي الأشعة تحت الحمراء.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G1 — التلوث الحراري: محطة على نهر، ماء التبريد الساخن والأكسجين المذاب والأسماك (4-7، الأشكال 28-4 و 29-4 ص 78) =============== */
(() => {
  const SRC = [['th', 'محطة توليد كهرباء'], ['nuc', 'محطة نووية'], ['ref', 'مصفاة نفط']];
  /* fraction of the fuel heat that goes to the river per unit electric output (efficiency η: waste = P (1−η)/η) */
  const WASTE = { th: .65 / .35 * .8, nuc: .67 / .33 * .95, ref: 0 };
  const DO = T => 14.62 - .3898 * T + .006969 * T * T - .00005897 * T * T * T; // dissolved O₂ (mg/L) at saturation
  const D = { id: 'g10_t_poll', page: 78, fig: 'الأشكال 28-4 و 29-4 ص 78',
    desc: 'التلوث الحراري: ارتفاع درجة حرارة الماء والهواء والتربة بفعل نشاطات الإنسان مما يخل بالتركيبة البيئية. محطات توليد الكهرباء والمحطات النووية تأخذ كميات ضخمة من ماء النهر للتبريد وتعيده ساخناً، والمصافي النفطية تطرح ماءً ساخناً فيه زيوت وشحوم. نتحكم بقدرة المحطة وتدفق النهر ونقيس درجة الحرارة بمجس على طول النهر ونراقب الأكسجين المذاب والأسماك.',
    tags: 'التلوث الحراري محطة توليد الكهرباء محطة نووية مصفاة نفط ماء التبريد نهر الأكسجين المذاب الأسماك برج التبريد',
    tools: ['محطة على ضفة نهر مع أنبوب سحب وأنبوب تصريف', 'مجس درجة حرارة يسحب على طول النهر', 'برج تبريد'],
    steps: ['اختر مصدر التلوث من الأزرار: محطة توليد، محطة نووية، أو مصفاة نفط.', 'اسحب المجس على طول النهر وقارن درجة الحرارة قبل نقطة التصريف وبعدها.', 'ارفع قدرة المحطة أو قلل تدفق النهر من اللوحة وراقب ارتفاع درجة الحرارة ونقصان الأكسجين وحال الأسماك.', 'شغّل برج التبريد: تطرح معظم الحرارة إلى الجو بدل النهر.'],
    concl: ['ماء التبريد يكتسب طاقة حرارية كبيرة ويعاد إلى النهر فترتفع درجة حرارته.', 'كلما ارتفعت درجة حرارة الماء قلّ الأكسجين المذاب فيه فتتضرر الأحياء المائية.', 'المحطات النووية تطرح الجزء الأكبر من حرارتها إلى المياه القريبة.', 'المصافي تطرح ماءً ساخناً يحتوي على زيوت وشحوم فتلوث الماء بالزيت أيضاً.'],
    laws: ['g10_h4_q'],
    controls: [R('P', 'قدرة المحطة الكهربائية', 100, 1500, 600, 50, 'MW'), R('F', 'تدفق ماء النهر', 20, 400, 80, 10, 'm³/s'), R('Tr', 'درجة حرارة النهر قبل المحطة', 5, 30, 22, 1, '°C'), TG('tower', 'برج تبريد', false, null, 'wind')],
    setup(S) { S.src = 'th'; S.px = .75; S.clk = 0; S.dTe = D.dT(S); S.fish = [0, 1, 2, 3, 4, 5].map(i => ({ u: .1 + i * .15, ph: i * 1.7, dead: 0 })); },
    /* temperature rise just below the outfall: ΔT = waste / (ṁ c) */
    waste(S) { if (S.src === 'ref') return 450e6 * S.p.P / 600; return S.p.P * 1e6 * WASTE[S.src] * (S.p.tower ? .25 : 1); },
    dT(S) { return D.waste(S) / (S.p.F * 1000 * 4186); },
    T(S, u) { const xo = .45; if (u < xo) return S.p.Tr; return S.p.Tr + S.dTe * (.35 + .65 * Math.exp(-(u - xo) / .35)); },
    update(S, dt) { S.clk += dt; S.dTe = Q44.ease(S.dTe == null ? D.dT(S) : S.dTe, D.dT(S), dt, 1.2);
      S.fish.forEach(f => { const T = D.T(S, f.u); f.dead = Q44.ease(f.dead, T > 33 ? 1 : 0, dt, 1.5); if (f.dead < .5) { f.u += dt * .03 * (T > 30 ? 1.8 : 1); if (f.u > .96) f.u = .04; } }); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 24, x1: L + 404, ry: 300, rh: 70 }; },
    fishD(ctx, x, y, dead, col) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); if (dead > .5) ctx.scale(1, -1); ctx.globalAlpha = 1 - dead * .3; ctx.fillStyle = dead > .5 ? '#a8a29e' : col; ctx.beginPath(); ctx.ellipse(0, 0, 11, 5, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(-17, -6); ctx.lineTo(-17, 6); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(6, -1, 1.4, 0, TAU); ctx.fill(); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), xo = g.x0 + .45 * (g.x1 - g.x0), xi = g.x0 + .06 * (g.x1 - g.x0), W = g.x1 - g.x0; Q44.bg(ctx, w, h);
      /* banks + river coloured by temperature */
      K.raw(ctx, () => { ctx.fillStyle = '#86efac'; ctx.fillRect(g.x0, g.ry - 150, W, 150); ctx.fillStyle = '#a3a3a3'; ctx.fillRect(g.x0, g.ry - 6, W, 6); ctx.fillStyle = '#86efac'; ctx.fillRect(g.x0, g.ry + g.rh, W, 14);
        for (let i = 0; i < 40; i++) { const u = i / 40, T = D.T(S, u + .0125); ctx.fillStyle = Q44.tcol((T - 20) * 6 + 5, 1); ctx.fillRect(g.x0 + u * W, g.ry, W / 40 + 1, g.rh); }
        ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { const x = g.x0 + ((i * 53 + S.clk * 30) % W), y = g.ry + 12 + (i * 23) % (g.rh - 24); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(Math.min(g.x1, x + 16), y); ctx.stroke(); }
        if (S.src === 'ref') { for (let i = 0; i < 7; i++) { const x = xo + 20 + ((i * 47 + S.clk * 22) % (g.x1 - xo - 40)), y = g.ry + 8 + (i * 13) % 20; const gr = ctx.createLinearGradient(x - 18, 0, x + 18, 0); gr.addColorStop(0, 'rgba(168,85,247,.45)'); gr.addColorStop(.5, 'rgba(250,204,21,.5)'); gr.addColorStop(1, 'rgba(34,211,238,.45)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.ellipse(x, y, 18, 4, 0, 0, TAU); ctx.fill(); } }
        /* warm plume */
        const pa = clamp(S.dTe / 8, .1, .7); const pg = ctx.createRadialGradient(xo, g.ry + 4, 2, xo, g.ry + 4, 70); pg.addColorStop(0, 'rgba(239,68,68,' + pa + ')'); pg.addColorStop(1, 'rgba(239,68,68,0)'); ctx.fillStyle = pg; ctx.beginPath(); ctx.ellipse(xo + 30, g.ry + 20, 80, 26, 0, 0, TAU); ctx.fill();
        /* pipes */
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(xi, g.ry + 22); ctx.lineTo(xi, g.ry - 60); ctx.lineTo(xi + 30, g.ry - 60); ctx.stroke(); ctx.strokeStyle = '#b91c1c'; ctx.beginPath(); ctx.moveTo(xi + 100, g.ry - 60); ctx.lineTo(xo, g.ry - 60); ctx.lineTo(xo, g.ry + 4); ctx.stroke();
        /* plant */
        const px = xi + 30, py = g.ry - 130; ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5;
        if (S.src === 'nuc') { ctx.beginPath(); ctx.moveTo(px, py + 100); ctx.lineTo(px, py + 50); ctx.arc(px + 30, py + 50, 30, Math.PI, 0); ctx.lineTo(px + 60, py + 100); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(px + 30, py + 70, 9, 0, TAU); ctx.fill(); ctx.fillStyle = '#0f172a'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(px + 30, py + 70); ctx.arc(px + 30, py + 70, 8, k * TAU / 3, k * TAU / 3 + Math.PI / 3); ctx.closePath(); ctx.fill(); } }
        else if (S.src === 'ref') { for (let k = 0; k < 2; k++) { ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.ellipse(px + 18 + k * 34, py + 92, 15, 5, 0, 0, TAU); ctx.fill(); ctx.fillRect(px + 3 + k * 34, py + 62, 30, 30); ctx.beginPath(); ctx.ellipse(px + 18 + k * 34, py + 62, 15, 5, 0, 0, TAU); ctx.fill(); ctx.strokeRect(px + 3 + k * 34, py + 62, 30, 30); } ctx.fillStyle = '#64748b'; ctx.fillRect(px + 74, py + 10, 6, 90); const fl = 8 + Math.sin(S.clk * 9) * 3; ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.ellipse(px + 77, py + 4 - fl / 2, 5, fl, 0, 0, TAU); ctx.fill(); }
        else { ctx.fillRect(px, py + 40, 70, 60); ctx.strokeRect(px, py + 40, 70, 60); ctx.fillStyle = '#94a3b8'; ctx.fillRect(px + 50, py, 10, 40); ctx.fillStyle = '#334155'; for (let k = 0; k < 3; k++) ctx.fillRect(px + 8 + k * 20, py + 56, 12, 14); }
        if (S.p.tower) { const tx = xo + 40, ty = py + 100; ctx.fillStyle = '#cbd5e1'; ctx.strokeStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.quadraticCurveTo(tx + 14, ty - 50, tx + 6, ty - 90); ctx.lineTo(tx + 50, ty - 90); ctx.quadraticCurveTo(tx + 42, ty - 50, tx + 56, ty); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      });
      if (S.p.tower) Q44.steam(ctx, xo + 68, g.ry - 120, .9, S.clk, 5, 50); if (S.src !== 'ref') Q44.steam(ctx, xi + 85, g.ry - 132, .5, S.clk, 3, 16);
      /* fish */
      S.fish.forEach((f, i) => { const T = D.T(S, f.u), y = g.ry + 18 + (i % 3) * 18 + Math.sin(S.clk * 2 + f.ph) * 3 - f.dead * (16 + (i % 3) * 18); D.fishD(ctx, g.x0 + f.u * W, y, f.dead, T > 30 ? '#f59e0b' : '#0ea5e9'); });
      Q44.T(ctx, 'اتجاه جريان النهر →', g.x1 - 60, g.ry + g.rh + 26, { s: 10.5, w: 800, c: '#0369a1' });
      Q44.T(ctx, 'سحب ماء التبريد', xi + 30, g.ry + g.rh + 26, { s: 10, w: 900, c: '#334155' }); Q44.T(ctx, 'تصريف الماء الساخن', xo + 10, g.ry + g.rh + 26, { s: 10, w: 900, c: '#b91c1c' });
      Q44.T(ctx, SRC.find(q => q[0] === S.src)[1], xi + 64, g.ry - 150, { s: 11.5, w: 900, c: '#fff', bg: '#334155' });
      /* probe */
      const prx = g.x0 + S.px * W, Tp = D.T(S, S.px); K.raw(ctx, () => { ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(prx, g.ry - 68); ctx.lineTo(prx, g.ry + 40); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(prx, g.ry + 42, 5, 0, TAU); ctx.fill(); });
      Q44.meter(ctx, prx, g.ry - 84, 92, Tp.toFixed(1) + ' °C', '', Tp > 30 ? '#f87171' : '#4ade80');
      /* T along the river + O₂ */
      const A = { x: g.x0 + 40, y: 432, w: W - 70, h: 96, x0: 0, xmax: 10, xs: 1, lxs: 2, y0: 0, ymax: 60, ys: 10, lys: 20, xl: 'x (km)', yl: 'T (°C)' }; const ax = Q44.axes(ctx, A);
      const pts = []; for (let i = 0; i <= 50; i++) pts.push([ax.X(i / 5), ax.Y(clamp(D.T(S, i / 50), 0, 60))]); Q41.line(ctx, pts, '#dc2626', 2.4);
      K.raw(ctx, () => { ctx.setLineDash([5, 4]); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(ax.X(0), ax.Y(30)); ctx.lineTo(ax.X(10), ax.Y(30)); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(ax.X(S.px * 10), ax.Y(clamp(Tp, 0, 60)), 4.5, 0, TAU); ctx.fill(); });
      const o2 = DO(Tp), st = Tp > 33 ? 'الأسماك تختنق' : Tp > 30 ? 'الأسماك متعبة' : 'الأسماك بخير';
      Q44.card(ctx, S, [{ t: 'الماء الداخل للتبريد يكتسب طاقة حرارية', c: '#334155' }, { t: 'ويعاد ساخناً إلى المصدر المائي', c: '#b91c1c', w: 800 }, { t: 'ΔT = Q / m c = ' + S.dTe.toFixed(1) + ' °C', mono: 1, c: '#7c3aed' }, { t: 'الأكسجين المذاب عند المجس: ' + o2.toFixed(1) + ' mg/L', c: o2 < 7.5 ? '#b91c1c' : '#0369a1', w: 800 }, { t: st, c: Tp > 30 ? '#b91c1c' : '#16a34a', w: 900 }].concat(S.src === 'ref' ? [{ t: 'المصفاة تطرح أيضاً زيوتاً وشحوماً', c: '#7c2d12', w: 800 }] : S.p.tower ? [{ t: 'برج التبريد يطرح معظم الحرارة إلى الجو', c: '#0f766e', w: 800 }] : S.src === 'nuc' ? [{ t: 'النووية تطرح الجزء الأكبر من حرارتها إلى الماء', c: '#7c2d12' }] : []), { title: 'التلوث الحراري للمياه', y: 70, wd: 300 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.s); Q42.banner(ctx, w, 'اسحب المجس على طول النهر وغيّر قدرة المحطة');
    },
    chips(S, g) { return { s: Q42.chips(S, 'src', SRC, g.h - 128, S.src, (S2, k) => { S2.src = k; }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), W = g.x1 - g.x0;
      return [{ id: 'probe', x: g.x0 + S.px * W, y: g.ry + 36, r: 26, axis: 'x', keep: true, tip: 'اسحب المجس على طول النهر', idle: 'اسحب ✋', drag: (S2, d) => { S2.px = clamp((d.x - g.x0) / W, .02, .98); } }].concat(D.chips(S, g).s); },
    readings(S) { const Tp = D.T(S, S.px); return [rd('درجة الحرارة عند المجس', Tp.toFixed(1) + ' °C'), rd('الارتفاع بعد التصريف ΔT', S.dTe.toFixed(1) + ' °C'), rd('الأكسجين المذاب', DO(Tp).toFixed(1) + ' mg/L'), rd('الحرارة المطروحة إلى النهر', Math.round(D.waste(S) / 1e6) + ' MW')]; },
    record(S) { return { src: SRC.find(q => q[0] === S.src)[1], P: S.p.P, F: S.p.F, dT: S.dTe.toFixed(2) }; },
    cols: [['src', 'المصدر'], ['P', 'P (MW)'], ['F', 'F (m³/s)'], ['dT', 'ΔT (°C)']],
    explain(S) { return Q26.ex('بعد نقطة التصريف ترتفع درجة حرارة النهر ويقل الأكسجين المذاب وتتأثر الأسماك.', 'ماء التبريد يكتسب حرارة Q = m c ΔT من المحطة ويعاد إلى النهر، فكلما زادت الحرارة المطروحة أو قل تدفق النهر زاد الارتفاع في درجة الحرارة. الماء الأدفأ يذيب أكسجيناً أقل.', 'تنشأ المحطات قرب الأنهار والبحار لحاجتها إلى ماء التبريد، وتستعمل أبراج التبريد لتقليل التلوث الحراري.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G2 — أسئلة الفصل ومسائله: س2 (1-7) والمسائل 1-10 ص 81-83 بخطوات الحل =============== */
(() => {
  const PR = {
    p1: { n: 'م1', t: 'مسألة 1 ص 81', v: 'heat', mk: 'au', T1: 25, T2: 65, m: '100 g', q: 'قطعة ذهب كتلتها 100 g ودرجة حرارتها 25 °C وحرارتها النوعية 129 J/kg.°C. احسب: السعة الحرارية للقطعة، ودرجة حرارتها إذا زودت بكمية حرارة 516 J.', lines: ['السعة الحرارية: C = m Cp', 'C = 0.1 × 129 = 12.9 J/°C', 'التغير في درجة الحرارة: ΔT = Q / C', 'ΔT = 516 / 12.9 = 40 °C', 'T₂ = T₁ + ΔT = 25 + 40', 'T₂ = 65 °C'] },
    p2: { n: 'م2', t: 'مسألة 2 ص 82', v: 'phase', pts: [[0, 100, 'بخار يتكثف'], [361600, 100, 'ماء يبرد'], [415360, 20, '']], q: 'ما كمية الحرارة التي فقدتها كتلة 160 g من بخار الماء بدرجة 100 °C حين أصبح ماءً بدرجة 20 °C؟', lines: ['المرحلة 1: تكثف البخار عند 100 °C', 'Q₁ = −m Lv = −0.16 × 2260000', 'Q₁ = −361600 J', 'المرحلة 2: تبريد الماء من 100 إلى 20 °C', 'Q₂ = m c ΔT = 0.16 × 4200 × (20 − 100)', 'Q₂ = −53760 J', 'Q = Q₁ + Q₂', 'Q = −415360 J'] },
    p3: { n: 'م3', t: 'مسألة 3 ص 82', v: 'mix', Tc: 10, Th: 80, Tf: 56.3, q: 'إناء سعته الحرارية 50 J/°C يحتوي 0.5 kg ماء بدرجة 10 °C ، أضيف إليه 1 kg ماء ساخن بدرجة 80 °C. كم تصبح درجة حرارة الخليط النهائية؟', lines: ['الحرارة المكتسبة = الحرارة المفقودة', '0.5 × 4200 (Tf − 10) + 50 (Tf − 10) = 1 × 4200 (80 − Tf)', '2150 (Tf − 10) = 4200 (80 − Tf)', '2150 Tf − 21500 = 336000 − 4200 Tf', '6350 Tf = 357500', 'Tf = 56.3 °C'] },
    p4: { n: 'م4', t: 'مسألة 4 ص 82', v: 'wall', q: 'حائط من الطابوق مساحته الجانبية 10 m² وسمكه 15 cm ، درجتا حرارة جانبيه 20 °C و 10 °C ، ومعامل التوصيل الحراري للطابوق 0.63 W/m.°C. احسب المعدل الزمني لانتقال الطاقة الحرارية.', lines: ['H = K A ΔT / L', 'السمك L = 15 cm = 0.15 m', 'H = 0.63 × 10 × (20 − 10) / 0.15', 'H = 420 W'] },
    p5: { n: 'م5', t: 'مسألة 5 ص 83', v: 'cmp', items: [['w', .5, 'ماء 0.5 kg', 4200], ['w', .1, 'ماء 0.1 kg', 4200], ['w', 1, 'ماء 1 kg', 4200]], q: 'سخنت ثلاث كميات من الماء كتلها 0.5 kg و 0.1 kg و 1 kg على مواقد متماثلة لمدة ثلاث دقائق. أي الكتل ترتفع درجة حرارتها أكثر؟ ولماذا؟', lines: ['المواقد متماثلة والمدة واحدة ⟸ Q متساوية', 'ΔT = Q / (m c)', 'المادة واحدة ⟸ ΔT تتناسب عكسياً مع الكتلة', 'الكتلة 0.1 kg ترتفع درجة حرارتها أكثر'] },
    p6: { n: 'م6', t: 'مسألة 6 ص 83', v: 'cmp', items: [['w', .5, 'ماء 0.5 kg', 4200], ['oil', .5, 'زيت 0.5 kg', 2000]], q: 'سخنت لنفس المدة كمية من الماء كتلتها 0.5 kg وكمية من الزيت لها الكتلة نفسها. أي الجسمين يسخن أكثر؟ ولماذا؟', lines: ['الحرارة المجهزة متساوية والكتلة متساوية', 'ΔT = Q / (m c)', 'الحرارة النوعية للزيت أصغر من الحرارة النوعية للماء', 'الزيت يسخن أكثر'] },
    p7: { n: 'م7', t: 'مسألة 7 ص 83', v: 'heat', mk: 'w', T1: 20, T2: 80, m: '200 g', q: 'ما كمية الحرارة التي تكتسبها كمية من الماء كتلتها 200 g عندما ترتفع درجة حرارتها من 20 °C إلى 80 °C؟', lines: ['Q = m c ΔT', 'الكتلة m = 200 g = 0.2 kg', 'Q = 0.2 × 4200 × (80 − 20)', 'Q = 50400 J'] },
    p8: { n: 'م8', t: 'مسألة 8 ص 83', v: 'heat', mk: 'cu', T1: 75, T2: 25, m: '500 g', q: 'ما كمية الحرارة التي يفقدها جسم من النحاس كتلته 500 g عندما تنخفض درجة حرارته من 75 °C إلى 25 °C؟', lines: ['Q = m c ΔT', 'Q = 0.5 × 387 × (25 − 75)', 'Q = −9675 J', 'الإشارة السالبة تعني أن الجسم فقد حرارة'] },
    p9: { n: 'م9', t: 'مسألة 9 ص 83', v: 'heat', mk: 'w', T1: 20, T2: 50, m: '300 g', q: 'ما درجة الحرارة النهائية لكمية من الماء كتلتها 300 g ودرجة حرارتها 20 °C عندما تكتسب طاقة حرارية مقدارها 37800 J؟', lines: ['ΔT = Q / (m c)', 'ΔT = 37800 / (0.3 × 4200)', 'ΔT = 30 °C', 'T = 20 + 30 = 50 °C'] },
    p10: { n: 'م10', t: 'مسألة 10 ص 83', v: 'phase', pts: [[0, 20, 'ماء يبرد'], [42000, 0, 'ماء يتجمد'], [209500, 0, 'جليد يبرد'], [214732.5, -5, '']], q: 'وضعت 0.5 kg من الماء بدرجة 20 °C في لوحة قوالب الثلج في المجمد. ما مقدار الطاقة الواجب إزالتها لتحويله إلى مكعبات ثلج بدرجة −5 °C؟', lines: ['المرحلة 1: تبريد الماء من 20 إلى 0 °C', 'Q₁ = 0.5 × 4200 × (0 − 20) = −42000 J', 'المرحلة 2: انجماد الماء عند 0 °C', 'Q₂ = −m Lf = −0.5 × 335000 = −167500 J', 'المرحلة 3: تبريد الجليد من 0 إلى −5 °C', 'Q₃ = 0.5 × 2093 × (−5 − 0) = −5232.5 J', 'Q = Q₁ + Q₂ + Q₃', 'Q = −214732.5 J'] },
    w1: { n: 'س2-1', t: 'س2-1 ص 81', v: 'rods', q: 'ثلاثة قضبان من النحاس والفولاذ والألمنيوم متساوية الطول عند 0 °C. أيها يكون أطول عند 250 °C؟', lines: ['الطول L والتغير ΔT متساويان للقضبان الثلاثة', 'ΔL = α L ΔT ⟹ ΔL ∝ α', 'الألمنيوم 24×10⁻⁶ والنحاس 17×10⁻⁶ والفولاذ 12×10⁻⁶ لكل °C', 'قضيب الألمنيوم يكون الأطول'] },
    w2: { n: 'س2-2', t: 'س2-2 ص 81', v: 'beam', q: 'تضاف قضبان الفولاذ إلى الإسمنت المسلح في الأبنية لتقويته. لماذا يعد الفولاذ مناسباً لتقوية الإسمنت؟', lines: ['معامل التمدد الطولي للفولاذ 12×10⁻⁶ لكل °C', 'ومعامل التمدد الطولي للإسمنت 12×10⁻⁶ لكل °C', 'فيتمددان ويتقلصان معاً بالمقدار نفسه', 'فلا تتشقق الخرسانة عند تغير درجات الحرارة'] },
    w3: { n: 'س2-3', t: 'س2-3 ص 81', v: 'radiator', q: 'لماذا ينصح بعدم فتح غطاء المشع الحراري إلا بعد أن يبرد محرك السيارة؟', lines: ['الماء في المشع الساخن محصور تحت ضغط عالٍ', 'فتكون درجة غليانه أعلى من 100 °C فلا يغلي', 'عند فتح الغطاء ينخفض الضغط فجأة', 'فيغلي الماء فوراً ويندفع البخار والماء الساخن', 'وقد يسبب حروقاً خطيرة'] },
    w4: { n: 'س2-4', t: 'س2-4 ص 81', v: 'pipes', q: 'لماذا تدهن الأنابيب في السخان الشمسي بطلاء أسود؟', lines: ['السطوح السوداء الخشنة ممتصة جيدة للإشعاع', 'فتمتص معظم أشعة الشمس الساقطة عليها', 'فترتفع درجة حرارة الماء داخل الأنابيب أكثر'] },
    w5: { n: 'س2-5', t: 'س2-5 ص 81', v: 'freeze', q: 'الماء في كأس الألمنيوم يتجمد قبل الماء في كأس الزجاج عند وضعهما في مجمد الثلاجة. لماذا؟', lines: ['الألمنيوم موصل جيد للحرارة: K = 210 W/m.°C', 'والزجاج رديء التوصيل: K = 0.8 W/m.°C', 'فتنتقل الحرارة من الماء عبر جدار الألمنيوم أسرع', 'فيبرد الماء ويتجمد أولاً'] },
    w6: { n: 'س2-6', t: 'س2-6 ص 81', v: 'touch', q: 'حين نلمس قطعتين إحداهما من الحديد والأخرى من الخشب بدرجة 0 °C نشعر أن الحديد أبرد من الخشب. ما سبب ذلك؟', lines: ['القطعتان بدرجة الحرارة نفسها 0 °C', 'الحديد موصل جيد: K = 79 W/m.°C فينقل حرارة اليد بسرعة', 'والخشب رديء التوصيل: K = 0.15 W/m.°C فينقلها ببطء', 'فنشعر أن الحديد أبرد مع أن درجتيهما متساويتان'] },
    w7: { n: 'س2-7', t: 'س2-7 ص 81', v: 'jar', q: 'لماذا يصب الماء الساخن على الغطاء المعدني لعلبة الزجاج التي تحتوي أطعمة لكي نتمكن من فتحها بسهولة؟', lines: ['معامل تمدد المعدن أكبر من معامل تمدد الزجاج', 'عند التسخين يتمدد الغطاء أكثر من فوهة العلبة', 'فيتسع الغطاء ويسهل فتحه'] }
  };
  const PK = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10'], WK = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7'];
  const D = { id: 'g10_t_problems', page: 81, fig: 'أسئلة الفصل: س2 والمسائل 1-10 ص 81-83',
    desc: 'حلول أسئلة الفصل الرابع خطوة خطوة: المسائل العشر (السعة الحرارية، الحرارة الكامنة، المزج، التوصيل) وأسئلة التفسير السبعة في س2، ولكل منها مشهد متحرك يتقدم مع خطوات الحل.',
    tags: 'أسئلة الفصل مسائل حلول خطوة خطوة ذهب 12.9 65 بخار 415360 خليط 56.3 حائط 420 W ماء زيت 50400 نحاس 9675 50 °C مكعبات ثلج 214732.5 ألمنيوم فولاذ إسمنت مشع سخان شمسي حديد خشب غطاء',
    tools: ['أزرار المسائل م1 إلى م10', 'أزرار أسئلة التفسير س2-1 إلى س2-7', 'زر الخطوة التالية'],
    steps: ['اختر مسألة من الصف الأول أو سؤال تفسير من الصف الثاني.', 'حاول الحل في دفترك أولاً، ثم اضغط «⬇ الخطوة التالية» لتظهر خطوة بعد خطوة.', 'راقب المشهد: يتقدم مع كل خطوة من خطوات الحل.'],
    concl: ['م1: C = 12.9 J/°C و T₂ = 65 °C. م2: Q = −415360 J. م3: Tf = 56.3 °C. م4: H = 420 W.', 'م5: الكتلة 0.1 kg ترتفع أكثر. م6: الزيت يسخن أكثر لصغر حرارته النوعية. م7: Q = 50400 J. م8: Q = −9675 J. م9: T = 50 °C. م10: Q = −214732.5 J.', 'س2: الألمنيوم الأطول، والفولاذ والإسمنت لهما معامل التمدد نفسه، وأنابيب السخان سوداء لأنها ممتصة جيدة، والألمنيوم موصل جيد، والمعدن يتمدد أكثر من الزجاج.'],
    laws: ['g10_h4_q', 'g10_h4_mix', 'g10_h4_lf', 'g10_h4_lv', 'g10_h4_cond', 'g10_h4_lin'],
    controls: [TG('anim', 'تحريك المشهد مع الخطوات', true, null, 'play')],
    setup(S) { S.pr = 'p1'; S.ex = 1; S.k = 0; S.f = 0; S.clk = 0; },
    n(S) { return PR[S.pr].lines.length; },
    update(S, dt) { S.clk += dt; const tgt = S.p.anim ? S.k / D.n(S) : 1; S.f = Q44.ease(S.f, tgt, dt, 2.2); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 210, x0: L + 24, x1: L + 404, top: 90, by: 420 }; },
    lerp(a, b, f) { return a + (b - a) * clamp(f, 0, 1); },
    vis(ctx, S, g) { const P = PR[S.pr], f = S.f, cx = g.cx, by = g.by, t = S.clk;
      if (P.v === 'heat') { const T = D.lerp(P.T1, P.T2, f), up = P.T2 > P.T1; Q44.bench(ctx, g.x0, g.x1, by);
        if (P.mk === 'w') { Q44.hotplate(ctx, cx, by - 46, 180, up ? .2 + .8 * (1 - Math.abs(f - .5) * 0) * (f < .999 ? 1 : 0) : 0); K.beaker(ctx, cx, by - 46, 120, 130, .62, { liq: '#38bdf8', liqA: .5 }); Q44.thermo(ctx, cx + 30, by - 60, 190, T, 0, 100, { col: '#0369a1' }); }
        else { if (up) Q44.hotplate(ctx, cx, by - 46, 180, f < .999 ? 1 : 0); Q44.block(ctx, cx - 60, by - (up ? 46 : 0) - 100, 100, 100, P.mk, T * 1.6 + 20); Q44.thermo(ctx, cx + 70, by - (up ? 60 : 14), 190, T, 0, 100, { col: '#0369a1' }); if (!up) Q44.heat(ctx, cx - 10, by - 110, 30, -60, t, 'rgba(239,68,68,.7)', 2.5); }
        Q44.T(ctx, Q44.nm(P.mk) + ' ' + P.m, cx - 30, by + 30, { s: 12, w: 900, c: '#334155' }); return; }
      if (P.v === 'phase') { const pts = P.pts, Qm = pts[pts.length - 1][0], Ts = pts.map(q => q[1]), y0 = Math.min(0, ...Ts) - 10, y1 = Math.max(...Ts) + 10;
        const A = { x: g.x0 + 50, y: 120, w: 300, h: 230, x0: 0, xmax: Qm / 1000, xs: Qm / 10000, lxs: Qm / 5000, y0: y0, ymax: y1, ys: 10, lys: y1 - y0 > 60 ? 20 : 10, xl: '|Q| (kJ)', yl: 'T (°C)' };
        A.xs = Math.pow(10, Math.floor(Math.log10(Qm / 1000 / 4))); A.lxs = A.xs * (Qm / 1000 / A.xs > 10 ? 2 : 1); A.xmax = Math.ceil(Qm / 1000 / A.xs) * A.xs; A.ys = 10; A.y0 = Math.floor(y0 / 10) * 10; A.ymax = Math.ceil(y1 / 10) * 10;
        const ax = Q44.axes(ctx, A), Qn = f * Qm; let cur = pts[0][1];
        for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1]; Q41.line(ctx, [[ax.X(a[0] / 1000), ax.Y(a[1])], [ax.X(b[0] / 1000), ax.Y(b[1])]], 'rgba(100,116,139,.35)', 2, [5, 4]);
          if (Qn > a[0]) { const e = Math.min(Qn, b[0]), Te = a[1] + (b[1] - a[1]) * (e - a[0]) / (b[0] - a[0]); Q41.line(ctx, [[ax.X(a[0] / 1000), ax.Y(a[1])], [ax.X(e / 1000), ax.Y(Te)]], ['#dc2626', '#7c3aed', '#0284c7'][i % 3], 3); cur = Te; }
          if (a[2]) Q44.T(ctx, a[2], (ax.X(a[0] / 1000) + ax.X(b[0] / 1000)) / 2, ax.Y((a[1] + b[1]) / 2) - 16, { s: 10, w: 900, c: '#334155' }); }
        Q41.dot(ctx, ax.X(Qn / 1000), ax.Y(cur), '#0f172a', 6);
        Q44.T(ctx, 'الحرارة المزالة ' + Math.round(Qn) + ' J', g.cx, 400, { s: 12, w: 900, c: '#fff', bg: '#0f766e' }); return; }
      if (P.v === 'mix') { const T = D.lerp(P.Tc, P.Tf, f), Th = D.lerp(P.Th, P.Tf, f), pour = clamp(f * 2, 0, 1); Q44.bench(ctx, g.x0, g.x1, by);
        K.raw(ctx, () => { ctx.fillStyle = '#e7e5e4'; rr(ctx, cx - 100, by - 160, 150, 160, 10); ctx.fill(); ctx.strokeStyle = '#78716c'; ctx.lineWidth = 2; ctx.stroke(); });
        K.beaker(ctx, cx - 25, by - 10, 110, 130, .4 + .4 * pour, { liq: Q44.tcol(T * 2, 1), liqA: .55 }); Q44.thermo(ctx, cx, by - 30, 170, T, 0, 100, { col: '#0369a1' });
        if (pour < .999) { K.raw(ctx, () => { ctx.save(); ctx.translate(cx + 120, by - 160); ctx.rotate(-pour * 1.4); K.beaker(ctx, 0, 60, 70, 90, .7 * (1 - pour), { liq: '#f97316', liqA: .55 }); ctx.restore(); }); if (pour > .05) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(249,115,22,.7)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx + 70, by - 190); ctx.quadraticCurveTo(cx + 30, by - 170, cx + 10, by - 90); ctx.stroke(); }); }
        Q44.T(ctx, 'ماء ساخن 1 kg: ' + Th.toFixed(1) + ' °C', cx + 110, by - 236, { s: 10.5, w: 900, c: '#fff', bg: '#c2410c' }); Q44.T(ctx, 'المسعر + 0.5 kg ماء: ' + T.toFixed(1) + ' °C', cx - 25, by + 30, { s: 11, w: 900, c: '#fff', bg: '#0369a1' }); return; }
      if (P.v === 'wall') { const x = cx - 40; K.raw(ctx, () => { ctx.fillStyle = Q44.tcol(40, .25); ctx.fillRect(g.x0, 110, x - g.x0, 280); ctx.fillStyle = Q44.tcol(20, .25); ctx.fillRect(x + 80, 110, g.x1 - x - 80, 280); ctx.fillStyle = '#b91c1c'; ctx.fillRect(x, 110, 80, 280); ctx.strokeStyle = '#fecaca'; ctx.lineWidth = 1.5; for (let r = 0; r < 14; r++) { const y = 110 + r * 20; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 80, y); ctx.stroke(); const o = r % 2 ? 0 : 20; for (let c = o; c < 80; c += 40) { ctx.beginPath(); ctx.moveTo(x + c, y); ctx.lineTo(x + c, y + 20); ctx.stroke(); } } });
        for (let k = 0; k < 3; k++) Q44.heat(ctx, g.x0 + 30, 170 + k * 80, x - g.x0 + 140, 0, t, 'rgba(220,38,38,' + (.25 + .6 * f) + ')', 2 + 4 * f);
        Q44.T(ctx, 'T₁ = 20 °C', g.x0 + 60, 130, { s: 11.5, w: 900, c: '#fff', bg: '#b91c1c' }); Q44.T(ctx, 'T₂ = 10 °C', g.x1 - 60, 130, { s: 11.5, w: 900, c: '#fff', bg: '#0369a1' }); Q44.T(ctx, 'السمك 15 cm', x + 40, 404, { s: 11, w: 900, c: '#334155' });
        Q44.meter(ctx, cx, 450, 130, 'H = ' + Math.round(420 * f) + ' W', '', '#4ade80'); return; }
      if (P.v === 'cmp') { const n = P.items.length, sp = n === 3 ? 125 : 170, x0 = cx - sp * (n - 1) / 2, Q = 21000 * f; Q44.bench(ctx, g.x0, g.x1, by);
        P.items.forEach((it, i) => { const x = x0 + i * sp, T = 20 + Q / (it[1] * it[3]), oil = it[0] === 'oil'; Q44.hotplate(ctx, x, by - 46, 104, f > .02 && f < .999 ? .9 : 0); K.beaker(ctx, x, by - 46, 70, 110, .15 + .55 * it[1] / (n === 3 ? 1 : .6), { liq: oil ? '#eab308' : '#38bdf8', liqA: .55 }); Q44.thermo(ctx, x + 18, by - 60, 170, T, 0, 100, { col: '#0369a1', lab: false });
          Q44.T(ctx, it[2], x, by + 30, { s: 11, w: 900, c: '#334155' }); Q44.T(ctx, 'ΔT = ' + (T - 20).toFixed(1) + ' °C', x, by + 54, { s: 11, w: 900, c: '#fff', bg: '#0f766e' }); });
        Q44.T(ctx, 'كمية الحرارة نفسها لكل إناء: ' + Math.round(Q) + ' J', cx, 120, { s: 12, w: 900, c: '#fff', bg: '#b91c1c' }); return; }
      if (P.v === 'rods') { const k = [['al', 24e-6], ['cu', 17e-6], ['st', 12e-6]], T = 250 * f, mag = 60; Q44.T(ctx, 'التمدد مكبّر ' + mag + ' مرة', cx, 110, { s: 11, w: 900, c: '#7c3aed' });
        k.forEach((q, i) => { const y = 170 + i * 80, L0 = 240, Lt = L0 * (1 + q[1] * T * mag); Q44.rod(ctx, g.x0 + 30, y, Lt, 16, q[0], () => 20 + T); K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(g.x0 + 30 + L0, y - 22); ctx.lineTo(g.x0 + 30 + L0, y + 22); ctx.stroke(); ctx.setLineDash([]); });
          Q44.T(ctx, Q44.nm(q[0]) + ' ΔL = ' + (q[1] * 1 * T * 1000).toFixed(2) + ' mm/m', g.x0 + 30 + L0 / 2, y + 28, { s: 10.5, w: 900, c: i ? '#334155' : '#b91c1c' }); });
        Q44.T(ctx, 'درجة الحرارة ' + Math.round(T) + ' °C', cx, 420, { s: 12.5, w: 900, c: '#fff', bg: '#c2410c' }); return; }
      if (P.v === 'beam') { const T = 50 * f, s = 1 + T * 12e-6 * 300; [['st', 150, 'فولاذ في إسمنت: لا تشقق', '#16a34a'], ['al', 320, 'لو كان ألمنيوم: تشقق', '#b91c1c']].forEach((q, j) => { const y = q[1], Lc = 300 * s, Lr = 300 * (1 + T * Q44.M[q[0]][3] * 300) ; K.raw(ctx, () => { ctx.fillStyle = '#d6d3d1'; ctx.fillRect(g.x0 + 20, y - 34, Lc, 68); ctx.strokeStyle = '#78716c'; ctx.lineWidth = 1.5; ctx.strokeRect(g.x0 + 20, y - 34, Lc, 68); ctx.strokeStyle = q[0] === 'st' ? '#334155' : '#94a3b8'; ctx.lineWidth = 5; for (let r = 0; r < 2; r++) { ctx.beginPath(); ctx.moveTo(g.x0 + 26, y - 14 + r * 28); ctx.lineTo(g.x0 + 14 + Lr, y - 14 + r * 28); ctx.stroke(); }
          if (j && f > .3) { ctx.strokeStyle = '#44403c'; ctx.lineWidth = 1.6; for (let c = 0; c < 3; c++) { const cxx = g.x0 + 80 + c * 90; ctx.beginPath(); ctx.moveTo(cxx, y - 34); ctx.lineTo(cxx + 6, y - 18); ctx.lineTo(cxx - 4, y - 4); ctx.lineTo(cxx + 4, y + 10 * f); ctx.stroke(); } } }); Q44.T(ctx, q[2], g.x0 + 170, y + 52, { s: 11.5, w: 900, c: '#fff', bg: q[3] }); });
        Q44.T(ctx, 'ارتفاع درجة الحرارة ' + Math.round(T) + ' °C ، التمدد مكبّر', cx, 420, { s: 12, w: 900, c: '#fff', bg: '#c2410c' }); return; }
      if (P.v === 'radiator') { const open = f > .6, rx = cx - 30; K.raw(ctx, () => { ctx.fillStyle = '#1e293b'; rr(ctx, rx - 70, 180, 140, 200, 8); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; for (let y = 190; y < 372; y += 9) { ctx.beginPath(); ctx.moveTo(rx - 64, y); ctx.lineTo(rx + 64, y); ctx.stroke(); } ctx.fillStyle = '#475569'; ctx.fillRect(rx - 14, 160, 28, 22);
          ctx.save(); ctx.translate(rx + (open ? 40 + f * 30 : 0), open ? 120 - f * 20 : 152); ctx.rotate(open ? f * 2 : 0); ctx.fillStyle = '#b91c1c'; rr(ctx, -22, -8, 44, 16, 4); ctx.fill(); ctx.restore(); });
        if (open) { Q44.steam(ctx, rx, 150, 1, t, 6, 40); K.raw(ctx, () => { ctx.fillStyle = 'rgba(56,189,248,.8)'; for (let i = 0; i < 12; i++) { const ph = (t * 1.4 + i / 12) % 1; ctx.beginPath(); ctx.arc(rx + (i % 2 ? 1 : -1) * ph * 60 * (.5 + (i % 3) * .3), 150 - ph * 90 + ph * ph * 60, 3, 0, TAU); ctx.fill(); } }); }
        Q44.meter(ctx, rx + 140, 230, 110, open ? '100 °C' : '115 °C', 'درجة الماء', open ? '#4ade80' : '#f87171'); Q44.meter(ctx, rx + 140, 300, 110, open ? '1 atm' : '1.5 atm', 'الضغط', open ? '#4ade80' : '#f87171');
        Q44.T(ctx, open ? 'الغطاء فتح: غليان مفاجئ واندفاع!' : 'الغطاء مغلق: ضغط عالٍ ولا غليان', cx, 420, { s: 12, w: 900, c: '#fff', bg: open ? '#dc2626' : '#0f766e' }); return; }
      if (P.v === 'pipes') { const Tb = 25 + 40 * f, Tw = 25 + 12 * f; K.raw(ctx, () => { const sun = ctx.createRadialGradient(g.x0 + 40, 110, 4, g.x0 + 40, 110, 46); sun.addColorStop(0, 'rgba(253,224,71,1)'); sun.addColorStop(1, 'rgba(250,204,21,0)'); ctx.fillStyle = sun; ctx.beginPath(); ctx.arc(g.x0 + 40, 110, 46, 0, TAU); ctx.fill(); });
        [[g.x0 + 150, '#0a0a0a', Tb, 'أنبوب أسود'], [g.x0 + 300, '#e2e8f0', Tw, 'أنبوب فاتح لامع']].forEach(q => { Q44.heat(ctx, g.x0 + 70, 130, q[0] - g.x0 - 80, 140, t, 'rgba(234,179,8,.8)', 2); K.raw(ctx, () => { ctx.fillStyle = q[1]; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; rr(ctx, q[0] - 18, 280, 36, 110, 10); ctx.fill(); ctx.stroke(); });
          Q44.thermo(ctx, q[0] + 40, 380, 150, q[2], 0, 100, { col: '#b91c1c' }); Q44.T(ctx, q[3], q[0], 408, { s: 11, w: 900, c: '#334155' }); }); return; }
      if (P.v === 'freeze') { const ia = clamp(f * 1.6, 0, 1), ig = clamp(f * .55, 0, 1); K.raw(ctx, () => { ctx.fillStyle = '#e0f2fe'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; rr(ctx, g.x0 + 20, 110, 360, 300, 12); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.8)'; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.arc(g.x0 + 40 + (i * 61) % 330, 130 + (i * 37 + t * 20) % 260, 2.5, 0, TAU); ctx.fill(); } });
        [[g.x0 + 110, 'al', ia, 'كأس ألمنيوم'], [g.x0 + 290, 'gl', ig, 'كأس زجاج']].forEach(q => { const x = q[0], yb = 360; K.raw(ctx, () => { ctx.fillStyle = 'rgba(56,189,248,.55)'; ctx.fillRect(x - 40, yb - 100, 80, 100); ctx.fillStyle = 'rgba(240,249,255,.95)'; const d = 40 * q[2]; ctx.fillRect(x - 40, yb - 100, 80, d * 1.2); ctx.fillRect(x - 40, yb - 100, d, 100); ctx.fillRect(x + 40 - d, yb - 100, d, 100); ctx.fillRect(x - 40, yb - d * .9, 80, d * .9);
            ctx.strokeStyle = q[1] === 'al' ? '#64748b' : 'rgba(14,165,233,.6)'; ctx.lineWidth = q[1] === 'al' ? 6 : 4; ctx.beginPath(); ctx.moveTo(x - 43, yb - 112); ctx.lineTo(x - 43, yb + 3); ctx.lineTo(x + 43, yb + 3); ctx.lineTo(x + 43, yb - 112); ctx.stroke(); });
          for (let k = 0; k < (q[1] === 'al' ? 3 : 1); k++) Q44.heat(ctx, x + 46, yb - 30 - k * 26, 26, 0, t, 'rgba(37,99,235,.75)', 2); Q44.T(ctx, q[3] + ' ' + Math.round(q[2] * 100) + '% جليد', x, yb + 28, { s: 11, w: 900, c: '#334155' }); }); return; }
      if (P.v === 'touch') { [[g.x0 + 110, 'fe', 'حديد 0 °C', 1], [g.x0 + 290, 'wd', 'خشب 0 °C', .12]].forEach(q => { const x = q[0], skin = 33 - (q[3] > .5 ? 18 : 3) * f; Q44.block(ctx, x - 60, 300, 120, 80, q[1], 0, 12);
          K.raw(ctx, () => { ctx.fillStyle = '#fcd5b5'; ctx.strokeStyle = '#c2410c'; ctx.lineWidth = 1.5; rr(ctx, x - 50, 240, 100, 56, 22); ctx.fill(); ctx.stroke(); for (let k = 0; k < 4; k++) { rr(ctx, x - 46 + k * 24, 200, 20, 52, 9); ctx.fill(); ctx.stroke(); } });
          for (let k = 0; k < (q[3] > .5 ? 3 : 1); k++) Q44.heat(ctx, x - 30 + k * 30, 292, 0, 50 * f + 10, t, 'rgba(220,38,38,.75)', 2);
          Q44.T(ctx, q[2], x, 404, { s: 11, w: 900, c: '#334155' }); Q44.T(ctx, 'حرارة الجلد ' + skin.toFixed(0) + ' °C', x, 180, { s: 11, w: 900, c: '#fff', bg: skin < 25 ? '#0369a1' : '#c2410c' }); }); return; }
      if (P.v === 'jar') { const gap = 6 * f, x = cx - 20; K.raw(ctx, () => { ctx.fillStyle = 'rgba(186,230,253,.5)'; ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 2; rr(ctx, x - 70, 220, 140, 180, 14); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fb923c'; ctx.fillRect(x - 60, 260, 120, 130); ctx.fillStyle = 'rgba(186,230,253,.7)'; ctx.fillRect(x - 50, 196, 100, 26); ctx.strokeRect(x - 50, 196, 100, 26);
          ctx.fillStyle = Q44.tcol(20 + 60 * f, 1); ctx.globalAlpha = .9; ctx.fillStyle = '#64748b'; rr(ctx, x - 56 - gap, 186 - gap * .3, 112 + 2 * gap, 30, 5); ctx.fill(); ctx.fillStyle = 'rgba(239,68,68,' + (.5 * f) + ')'; rr(ctx, x - 56 - gap, 186 - gap * .3, 112 + 2 * gap, 30, 5); ctx.fill(); ctx.globalAlpha = 1;
          ctx.save(); ctx.translate(x + 110, 120); ctx.rotate(-.6); ctx.fillStyle = '#475569'; rr(ctx, -30, -24, 60, 48, 10); ctx.fill(); ctx.restore(); });
        if (f > .02) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(239,68,68,.6)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + 84, 140); ctx.quadraticCurveTo(x + 50, 150, x + 30, 186); ctx.stroke(); });
        Q44.steam(ctx, x, 186, f, t, 4, 90); Q44.T(ctx, 'اتساع الغطاء ' + (gap / 6 * .1).toFixed(2) + ' mm', x, 430, { s: 12, w: 900, c: '#fff', bg: '#0f766e' }); return; }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = PR[S.pr]; Q44.bg(ctx, w, h); D.vis(ctx, S, g);
      Q44.steps(ctx, S, { title: P.t, q: P.q, lines: P.lines, k: S.k }, { y: 70, x: w - 12, wd: 320 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.w); C.e[1]._col = '#be185d'; Q42.drawChips(ctx, C.e);
      Q42.banner(ctx, w, 'اختر مسألة أو سؤالاً ثم اضغط «⬇ الخطوة التالية»');
    },
    chips(S, g) { const pick = (S2, k) => { S2.pr = k; S2.ex = 1; S2.k = 0; S2.f = 0; };
      return { p: Q42.chips(S, 'pp', PK.map(k => [k, PR[k].n, PR[k].t]), g.h - 172, S.pr, pick, { bw: 66 }), w: Q42.chips(S, 'ww', WK.map(k => [k, PR[k].n, PR[k].t]), g.h - 128, S.pr, pick, { bw: 92 }),
        e: Q44.stepChips(S, 'ex', g.h - 84, g.L, 'الحل من البداية', S2 => { S2.f = 0; }, D.n(S)) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); return [{ id: 'scene', x: g.cx, y: 270, w: 340, h: 300, axis: 'none', idle: 'اضغط ✋', tip: 'اضغط على المشهد للخطوة التالية', click: S2 => { S2.ex = 1; S2.k = Math.min(S2.k + 1, D.n(S2)); } }].concat(C.e, C.p, C.w); },
    readings(S) { const P = PR[S.pr]; return [rd('السؤال', P.t), rd('الخطوة', S.k + ' / ' + P.lines.length), rd('الجواب', S.k >= P.lines.length ? P.lines[P.lines.length - 1] : '؟')]; },
    explain(S) { return Q26.ex('كل مسألة تُحل بخطوات: نحدد المعطيات، ونختار العلاقة المناسبة، ثم نعوض ونحسب مع الوحدات.', 'Q = m c ΔT للتسخين والتبريد، و Q = m Lf و Q = m Lv لتغير الحالة، والحرارة المفقودة = الحرارة المكتسبة في المزج، و H = K A ΔT / L للتوصيل، و ΔL = α L ΔT للتمدد.', 'الإشارة السالبة لكمية الحرارة تعني أن الجسم فقد حرارة، والموجبة أنه اكتسبها.'); }
  };
  M8.P[D.id] = D;
})();

/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g10_t_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g10_t_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g10_th_heat', ch: 44, reg: X10, sec: '4-1 كمية الحرارة والحرارة النوعية + 4-2 السعة الحرارية', page: 52, kind: 'نشاط',
  title: 'كمية الحرارة والحرارة النوعية والسعة الحرارية: Q = m Cp ΔT و C = m Cp',
  desc: 'نسخّن جسمين على مسخنين كهربائيين متماثلين ونقارن ارتفاع درجة حرارتيهما لنكتشف أن كمية الحرارة تعتمد على الكتلة والتغير في درجة الحرارة ونوع المادة (الجدول 1)، ونحل مثال الألمنيوم. ثم نزود ثلاث قطع بالحرارة نفسها لنعرف أيها أكبر سعة حرارية، ونحل مثال قطعة الحديد.',
  tags: 'كمية الحرارة الحرارة النوعية السعة الحرارية',
  fact: ['كمية الحرارة تقاس بوحدات السعرة أيضاً، والسعرة الحرارية الواحدة تساوي 4.2 J (هل تعلم ص 53).', 'تقاس الطاقة الحرارية بوحدات الجول، فلو احترق عود ثقاب لأنتج قرابة 2000 J (هل تعلم ص 55).', 'الحرارة النوعية للماء أكبر منها لجميع المواد المستعملة في حياتنا اليومية، وهذا يفسر نسيم البر والبحر وتبريد محرك السيارة والآلات بالماء (ص 55).', 'تذكر: تعتمد الحرارة النوعية على نوع المادة فقط، وتختلف السعة الحرارية باختلاف كتلة الجسم والحرارة النوعية لمادته (ص 54).'],
  quiz: [
    { q: 'عند ثبوت كل من الكتلة ودرجة الحرارة فإن كمية الحرارة لجسم تتوقف على:', o: ['نوعية مادة الجسم', 'حجم الجسم', 'شكل الجسم', 'كل الاحتمالات السابقة'], a: 0, why: 'س1-7 ص 80: Q = m Cp ΔT و Cp تعتمد على نوع المادة.' },
    { q: 'الطاقة اللازمة لرفع درجة حرارة 3 kg ألمنيوم (900 J/kg.°C) من 15 إلى 25 °C:', o: ['27000 J', '2700 J', '9000 J', '67500 J'], a: 0, why: 'مثال 1 ص 54: 3 × 900 × 10.' },
    { q: 'السعة الحرارية لقطعة حديد 4 kg وحرارتها النوعية 448 J/kg.°C:', o: ['1792 J/°C', '112 J/°C', '448 J/°C', '1792 J'], a: 0, why: 'مثال 2 ص 55: C = m Cp.' },
    { q: 'ثلاث قطع زودت بالحرارة نفسها فارتفعت 5 و 9 و 3 °C. الأكبر سعة حرارية هي التي ارتفعت:', o: ['3 °C', '9 °C', '5 °C', 'متساوية'], a: 0, why: 'سؤال ص 56: C = Q / ΔT.' },
    { q: 'كمية الماء 0.1 kg و 0.5 kg و 1 kg على مواقد متماثلة 3 دقائق. أيها ترتفع درجة حرارتها أكثر؟', o: ['0.1 kg لأن ΔT تتناسب عكسياً مع الكتلة', '1 kg', '0.5 kg', 'متساوية'], a: 0, why: 'مسألة 5 ص 83.' },
    { q: 'ماء وزيت متساويا الكتلة سخّنا المدة نفسها. أيهما يسخن أكثر؟', o: ['الزيت لأن حرارته النوعية أقل', 'الماء', 'متساويان'], a: 0, why: 'مسألة 6 ص 83.' }],
  parts: [{ id: 'g10_t_q', n: 'كمية الحرارة Q = m Cp ΔT: جسمان على مسخنين متماثلين + مثال 1' }, { id: 'g10_t_cap', n: 'السعة الحرارية C = m Cp: سؤال القطع الثلاث + مثال 2' }] });
M8.merge({ id: 'g10_th_calor', ch: 44, reg: X10, sec: '4-3 الاتزان الحراري', page: 56, kind: 'مثال',
  title: 'الاتزان الحراري والمسعر: الحرارة المفقودة = الحرارة المكتسبة',
  desc: 'نسقط مكعب ألمنيوم ساخناً في ماء بارد داخل مسعر نحاسي معزول له محرك ومحرار، أو نسكب ماءً ساخناً على ماء بارد، ونراقب منحني درجتي الحرارة حتى تتساويا (الشكل 3-4)، ونحل مثالي الكتاب ومسألة الإناء خطوة خطوة.',
  tags: 'الاتزان الحراري المسعر طريقة المزج',
  fact: ['الحرارة نوع من أنواع الطاقة، والطاقة لا تفنى ولا تستحدث، فالحرارة تنتقل من جسم إلى آخر (ص 56).', 'المسعر يتركب من وعاء رقيق من فلز جيد التوصيل كالنحاس يحيط به وعاء آخر من الفلز نفسه وبينهما مادة عازلة كاللباد أو نشارة الخشب، وله غطاء فيه فتحتان للمحرار والمحرك (ص 57).'],
  quiz: [
    { q: 'جسمان معزولان T₁ > T₂ وضعا متلامسين. تستمر الطاقة الحرارية بالانتقال إلى أن:', o: ['يصبحا بدرجة الحرارة نفسها T حيث T₂ < T < T₁', 'تصبح درجة الثاني أقل من الأول', 'تصبح درجة الأول أقل من الثاني', 'تصبح درجة الأول صفراً'], a: 0, why: 'س1-2 ص 79.' },
    { q: 'مكعب ألمنيوم 0.5 kg بدرجة 100 °C في 1 kg ماء بدرجة 20 °C. درجة الحرارة النهائية:', o: ['27.7 °C', '60 °C', '20 °C', '50 °C'], a: 0, why: 'مثال 1 ص 57.' },
    { q: 'وظيفة المادة العازلة (اللباد) في المسعر:', o: ['منع تبادل الحرارة مع الوسط المحيط', 'تسريع التسخين', 'تحريك الماء'], a: 0, why: 'ص 57.' },
    { q: 'السعة الحرارية للمسعر في مثال 2 ص 58:', o: ['210 J/°C', '28 J/°C', '5880 J/°C', '420 J/°C'], a: 0, why: 'C = 5880 / 28.' }],
  parts: [{ id: 'g10_t_calor', n: 'المسعر: المكعب الساخن والماء الساخن + المثالان ومسألة 3' }] });
M8.merge({ id: 'g10_th_solid', ch: 44, reg: X10, sec: '4-4 a تمدد المواد الصلبة', page: 59, kind: 'نشاط',
  title: 'تمدد المواد الصلبة: الطولي والسطحي والحجمي والشريط ثنائي المعدن',
  desc: 'نسخّن ثلاث سيقان مختلفة في فرن ونقارن تمددها على مؤشرات مكبّرة (ΔL = α L ΔT والجدول 2)، ونجري تجربة الكرة والحلقة للتمدد السطحي والحجمي (γ = 2α ، β = 3α)، ثم نرى الشريط ثنائي المعدن في المنظم الحراري وإنذار الحريق، وفواصل الجسور والسكك.',
  tags: 'تمدد المواد الصلبة طولي سطحي حجمي شريط ثنائي المعدن',
  fact: ['تمدد الغازات أكبر من تمدد السوائل، وتمدد السوائل أكبر من تمدد المواد الصلبة إذا كانت الحرارة المكتسبة متساوية (ص 59).', 'زجاج البايركس يتحمل التغيرات السريعة في درجات الحرارة دون أن ينكسر لأن معامل تمدده الطولي صغير قياساً بالزجاج الاعتيادي (هل تعلم ص 63).', 'يمتلك زجاج المصباح الكهربائي معامل تمدد مساوياً لمعامل تمدد السلك الحامل للخويط، فيتمددان بالمقدار نفسه ولا تنكسر قاعدة المصباح (ص 63).'],
  quiz: [
    { q: 'ثلاثة قضبان نحاس وفولاذ وألمنيوم متساوية الطول عند 0 °C. الأطول عند 250 °C:', o: ['الألمنيوم', 'النحاس', 'الفولاذ', 'متساوية'], a: 0, why: 'س2-1 ص 81: α للألمنيوم 24×10⁻⁶ وهو الأكبر.' },
    { q: 'يعد الفولاذ مناسباً لتقوية الإسمنت لأن:', o: ['معامل تمدده يساوي معامل تمدد الإسمنت تقريباً', 'كثافته كبيرة', 'توصيله الحراري جيد'], a: 0, why: 'س2-2 ص 81: الجدول 2 كلاهما 12×10⁻⁶.' },
    { q: 'العلاقة بين معامل التمدد الحجمي β والطولي α:', o: ['β = 3α', 'β = 2α', 'β = α', 'β = α / 3'], a: 0, why: 'ص 62.' },
    { q: 'عند تسخين شريط من النحاس الأصفر والحديد فإنه ينحني:', o: ['حول الحديد لأن النحاس الأصفر يتمدد أكثر', 'حول النحاس الأصفر', 'لا ينحني'], a: 0, why: 'ص 62.' },
    { q: 'يصب الماء الساخن على غطاء معدني لعلبة زجاج ليسهل فتحه لأن:', o: ['المعدن يتمدد أكثر من الزجاج فيتسع الغطاء', 'الزجاج يتمدد أكثر', 'الماء يذيب اللاصق'], a: 0, why: 'س2-7 ص 81.' }],
  parts: [{ id: 'g10_t_lin', n: 'التمدد الطولي: ثلاث سيقان في فرن + الجدول 2 + س1 ص 81' }, { id: 'g10_t_ball', n: 'الكرة والحلقة: التمدد السطحي والحجمي' }, { id: 'g10_t_bimetal', n: 'الشريط ثنائي المعدن والمنظم الحراري وإنذار الحريق والفواصل' }] });
M8.merge({ id: 'g10_th_liquid', ch: 44, reg: X10, sec: '4-4 b تمدد السوائل + c تمدد الغازات', page: 63, kind: 'نشاط',
  title: 'تمدد السوائل والغازات: التمدد الظاهري والحقيقي، خزان البنزين، وشذوذ الماء',
  desc: 'نغمس دورقاً مملوءاً بماء ملون وفيه أنبوب رفيع في ماء ساخن فينخفض السائل قليلاً ثم يرتفع (الشكل 13-4)، ونقارن السوائل (الجدول 3) ونحسب βr = βv + 3α، ونرى تمدد الهواء بالبالون، ونحل مثال خزان البنزين، ثم نستكشف شذوذ الماء عند 4 °C.',
  tags: 'تمدد السوائل تمدد الغازات التمدد الظاهري الحقيقي شذوذ الماء',
  fact: ['معامل التمدد الحقيقي للسائل أكبر من معامل التمدد الظاهري (ص 64).', 'تمتاز الغازات بتساوي معامل التمدد الحجمي لجميعها عند ثبوت الضغط، ويساوي 1/273 لكل °C (تذكر ص 66).', 'تمدد الإناء الحاوي على الغاز صغير جداً قياساً بتمدد الغاز نفسه، لذا يعد التمدد الظاهري للغازات تمدداً حقيقياً (ص 66).'],
  quiz: [
    { q: 'عند وضع محرار زئبقي في سائل ساخن ينخفض قليلاً في البداية ثم يرتفع لأن:', o: ['الزجاج يسخن ويتمدد أولاً ثم يتمدد الزئبق أكثر', 'الزئبق يتقلص أولاً', 'الضغط الجوي يتغير'], a: 0, why: 'فكر ص 65.' },
    { q: 'العلاقة بين معاملي التمدد الحقيقي والظاهري للسائل:', o: ['βr = βv + 3α', 'βr = βv − 3α', 'βr = 3βv', 'βr = βv'], a: 0, why: 'ص 64.' },
    { q: 'خزان 60 L مملوء بالبنزين (β = 9.6×10⁻⁴) سخن من 25 إلى 45 °C. حجم المنسكب:', o: ['1.152 L', '0.576 L', '11.52 L', '2.4 L'], a: 0, why: 'مثال ص 65.' },
    { q: 'أكبر كثافة للماء تكون عند:', o: ['4 °C', '0 °C', '100 °C', '−4 °C'], a: 0, why: 'شذوذ الماء.' }],
  parts: [{ id: 'g10_t_liq', n: 'نشاط الدورق والأنبوب + الجدول 3 + تمدد الغازات + مثال الخزان' }, { id: 'g10_t_anom', n: 'شذوذ الماء: أقل حجم عند 4 °C والبحيرة المتجمدة' }] });
M8.merge({ id: 'g10_th_phase', ch: 44, reg: X10, sec: '4-5 تغير حالة المادة', page: 66, kind: 'مثال',
  title: 'تغير حالة المادة: الحرارة الكامنة للانصهار والتبخر ومنحني التسخين',
  desc: 'نسخّن جليداً بلهب نتحكم بقدرته ونرسم منحني التسخين جليد ← ماء ← بخار، فنرى ثبوت درجة الحرارة أثناء الانصهار والغليان، ونحل أمثلة الكتاب الثلاثة على الجهاز نفسه خطوة خطوة، ونبرّد لنرى التكثف والانجماد.',
  tags: 'تغير الحالة الحرارة الكامنة انصهار تبخر غليان منحني التسخين',
  fact: ['الجدول 4: درجة انصهار الجليد 0 °C و Lf = 335 kJ/kg ، الألمنيوم 658.7 °C و 321 kJ/kg ، النحاس 1083 °C و 175 kJ/kg ، الحديد 1535 °C و 96 kJ/kg (ص 67).', 'الجدول 5: درجة غليان الماء النقي 100 °C و Lv = 2260 kJ/kg ، الزئبق 357 °C و 284 kJ/kg ، النحاس 2300 °C و 4820 kJ/kg ، الحديد 3000 °C و 6290 kJ/kg ، الفضة 2100 °C و 2360 kJ/kg (ص 70).', 'التبخر يحصل عند سطح السائل وبأي درجة حرارة، أما الغليان فتكتسب فيه جزيئات السائل جميعها طاقة تجعلها تتغلب على القوى بينها (الشكل 15-4، ص 69).'],
  quiz: [
    { q: 'حينما يبدأ الماء بالتحول من حالة إلى أخرى فإن درجة حرارته:', o: ['تبقى ثابتة حتى تتحول كمية الماء جميعها', 'ترتفع درجة واحدة', 'تتغير باستمرار', 'تنخفض درجة ثم تثبت'], a: 0, why: 'س1-1 ص 79.' },
    { q: 'عندما يتكثف البخار ويتحول إلى سائل فإنه:', o: ['يبعث حرارة', 'يمتص حرارة', 'ترتفع درجة حرارته', 'تنخفض درجة حرارته'], a: 0, why: 'س1-5 ص 80.' },
    { q: 'كمية الحرارة اللازمة لتحويل سائل إلى غاز عند درجة الغليان تساوي:', o: ['كتلة المادة × الحرارة الكامنة للتبخر', 'الكتلة × الحرارة الكامنة × درجة الحرارة', 'الكتلة × فرق درجات الحرارة', 'الحرارة الكامنة للتبخر فقط'], a: 0, why: 'س1-8 ص 80.' },
    { q: 'الحرارة اللازمة لصهر 25 g جليد بدرجة 0 °C (Lf = 335 kJ/kg):', o: ['8.375 kJ', '83.75 kJ', '335 kJ', '13.4 kJ'], a: 0, why: 'مثال 1 ص 67.' }],
  parts: [{ id: 'g10_t_curve', n: 'منحني التسخين جليد ← ماء ← بخار + الأمثلة الثلاثة' }] });
M8.merge({ id: 'g10_th_transfer', ch: 44, reg: X10, sec: '4-6 طرائق انتقال الحرارة', page: 71, kind: 'نشاط',
  title: 'انتقال الحرارة: التوصيل والحمل والإشعاع',
  desc: 'نسخّن ساقين من مادتين مختلفتين ونراقب ذوبان الشمع على طولهما ونحسب معدل التوصيل H = k A ΔT / L (أمثلة النافذة والجدار)، ثم نرى تيارات الحمل في قدر الماء والغرفة ونسيم البر والبحر ومحرك السيارة، ونقارن امتصاص السطوح الداكنة واللامعة للإشعاع وانبعاثه.',
  tags: 'انتقال الحرارة توصيل حمل إشعاع موصلية حرارية نسيم البر والبحر',
  fact: ['الجدول 6: معامل التوصيل الحراري للفضة 406 والنحاس الأحمر 385 والذهب 293 والألمنيوم 210 والنحاس الأصفر 109 والحديد 79 والفولاذ 46 والزجاج 0.8 والطابوق 0.63 والخشب 0.15 والهواء 0.025 W/m.°C (ص 73).', 'الحمل يحدث في الموائع فقط (السوائل والغازات) بانتقال جزيئات المائع نفسها (ص 74).', 'الإشعاع لا يحتاج إلى وسط مادي، وبه تصل طاقة الشمس إلى الأرض عبر الفراغ (ص 75).', 'السطوح السوداء الخشنة ممتصة جيدة ومشعة جيدة، والسطوح البيضاء اللامعة عاكسة جيدة (ص 76).'],
  quiz: [
    { q: 'إذا قلّ طول ساق وقلّت مساحة مقطعها كلاهما إلى النصف فإن معدل انتقال الحرارة H:', o: ['يبقى ثابتاً H', 'يصبح 2H', 'يصبح H/2', 'يصبح 4H'], a: 0, why: 'س1-3 ص 79: H = k A ΔT / L والنسبة A/L لم تتغير.' },
    { q: 'تنتقل الحرارة خلال الغازات بطريقة:', o: ['الإشعاع والحمل والتوصيل', 'التوصيل فقط', 'الحمل فقط', 'الإشعاع فقط'], a: 0, why: 'س1-4 ص 79.' },
    { q: 'تنتقل الحرارة خلال الفراغ بطريقة:', o: ['الإشعاع فقط', 'التوصيل', 'الحمل', 'التوصيل والحمل'], a: 0, why: 'س1-6 ص 80.' },
    { q: 'قطعتا جليد في صندوق من الألمنيوم وآخر من الخشب في غرفة دافئة. تذوب أولاً قطعة:', o: ['صندوق الألمنيوم لأنه موصل جيد', 'صندوق الخشب', 'تذوبان معاً'], a: 0, why: 'الموصلية الحرارية للألمنيوم أكبر بكثير من الخشب.' },
    { q: 'يستعمل رجال الإطفاء خوذة من النحاس الأصفر بدلاً من النحاس الأحمر لأن:', o: ['معامل توصيله الحراري أصغر: 109 مقابل 385 W/m.°C', 'كثافته أكبر', 'لونه أفتح فقط', 'معامل توصيله أكبر'], a: 0, why: 'سؤال ص 73 والجدول 6.' },
    { q: 'نسيم البحر نهاراً يهب:', o: ['من البحر إلى اليابسة', 'من اليابسة إلى البحر', 'لا يهب نهاراً'], a: 0, why: 'اليابسة تسخن أسرع فيرتفع هواؤها ويحل محله هواء البحر البارد (ص 74).' }],
  parts: [{ id: 'g10_t_cond', n: 'التوصيل: ساقان ومسامير الشمع + مثال 1' }, { id: 'g10_t_wall', n: 'معدل التوصيل: النافذة والجدار والجدار المزدوج' }, { id: 'g10_t_conv', n: 'الحمل: القدر والغرفة ونسيم البر والبحر ومحرك السيارة' }, { id: 'g10_t_rad', n: 'الإشعاع: الامتصاص والانبعاث والتوهج والسخان الشمسي' }] });
M8.merge({ id: 'g10_th_review', ch: 44, reg: X10, sec: '4-7 التلوث الحراري + أسئلة الفصل', page: 78, kind: 'مسائل',
  title: 'التلوث الحراري وأسئلة الفصل الرابع ومسائله بخطوات الحل',
  desc: 'نرى كيف ترفع محطات توليد الكهرباء والمحطات النووية والمصافي درجة حرارة الأنهار فيقل الأكسجين المذاب وتتضرر الأسماك، ثم نحل أسئلة التفسير في س2 والمسائل العشر في نهاية الفصل خطوة خطوة مع مشهد متحرك لكل منها.',
  tags: 'التلوث الحراري أسئلة الفصل مسائل حلول خطوة خطوة',
  fact: ['تنشأ محطات توليد الطاقة الكهربائية قرب البحار والأنهار لضخامة كميات المياه التي تحتاجها للتبريد (ص 78).', 'المياه الخارجة من المصافي النفطية تحتوي أيضاً على زيوت وشحوم فتلوث مياه المصادر بالزيت (ص 78).', 'الماء الأدفأ يذيب كمية أقل من الأكسجين، لذا يضر التلوث الحراري الأحياء المائية.'],
  quiz: [
    { q: 'عند ثبوت كل من الكتلة ودرجة الحرارة فإن كمية الحرارة لجسم تتوقف على:', o: ['نوعية مادة الجسم', 'حجم الجسم', 'شكل الجسم', 'كل الاحتمالات السابقة'], a: 0, why: 'س1-7 ص 80: Q = m Cp ΔT و Cp تعتمد على نوع المادة.' },
    { q: 'السعة الحرارية لقطعة ذهب كتلتها 100 g وحرارتها النوعية 129 J/kg.°C:', o: ['12.9 J/°C', '129 J/°C', '1290 J/°C', '1.29 J/°C'], a: 0, why: 'مسألة 1: C = 0.1 × 129.' },
    { q: 'كمية الحرارة التي تكتسبها 200 g ماء ترتفع درجتها من 20 إلى 80 °C:', o: ['50400 J', '16800 J', '67200 J', '252000 J'], a: 0, why: 'مسألة 7: Q = 0.2 × 4200 × 60.' },
    { q: 'المصدر الذي يطرح الجزء الأكبر من حرارته إلى الموارد المائية القريبة:', o: ['المحطات النووية', 'السيارات', 'المدافئ المنزلية'], a: 0, why: 'ص 78.' },
    { q: 'يتجمد الماء في كأس الألمنيوم قبل كأس الزجاج لأن:', o: ['الألمنيوم موصل جيد للحرارة', 'الزجاج موصل جيد', 'الألمنيوم يمتص الإشعاع'], a: 0, why: 'س2-5 ص 81.' }],
  parts: [{ id: 'g10_t_poll', n: 'التلوث الحراري: محطة على نهر والأكسجين والأسماك' }, { id: 'g10_t_problems', n: 'أسئلة الفصل ومسائله العشر بخطوات الحل' }] });
