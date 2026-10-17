'use strict';
/* ====================== الرابع العلمي — الفصل التاسع: الكهرباء الساكنة (المستقرة) (ch 49, ص 156–188) ======================
   Merged experiments (book order): g10_es_charge (9-1) · g10_es_coul (9-2) · g10_es_cond (9-3, 9-4) · g10_es_field (9-5, 9-6)
   · g10_es_pot (9-7 … 9-9 + جهد الأرض) · g10_es_atm (الرؤوس المسننة، الكهرباء الجوية، التطبيقات) · g10_es_review (الأسئلة والمسائل).
   Local kit Q49 = Q43 + plates, examples chips, contour lines, clouds, buildings. Reuses Q31 (charges, rods, electroscope, field lines). */
LW({ id: 'g10_el_qne', cat: 49, name: 'تكمية الشحنة', fx: '<i>Q</i> = <i>n</i> <i>e</i>', sym: 'الشحنة الكلية لأي جسم مضاعفات صحيحة لشحنة الإلكترون: n عدد صحيح موجب، e = 1.6×10⁻¹⁹ C. والشحنة محفوظة لا تفنى ولا تستحدث', calc: { in: [['n', 'عدد الإلكترونات n', '', 6.25e18]], out: 'الشحنة Q', u: 'C', f: v => v.n * 1.6e-19 } });
LW({ id: 'g10_el_coul', cat: 49, name: 'قانون كولوم', fx: '<i>F</i> = <i>K</i> ' + FR('<i>q</i><sub>1</sub> <i>q</i><sub>2</sub>', '<i>r</i>²') + ' ، <i>K</i> = ' + FR('1', '4π<i>ε</i><sub>0</sub>'), sym: 'تتناسب القوة الكهربائية المتبادلة بين شحنتين نقطيتين طردياً مع مقدار كل من الشحنتين وعكسياً مع مربع البعد بينهما. K = 9×10⁹ N.m²/C² للفراغ، ε₀ = 8.85×10⁻¹² C²/N.m². في وسط عازل تكون القوة أقل', calc: { in: [['q1', 'الشحنة q₁', 'μC', 2], ['q2', 'الشحنة q₂', 'μC', 5], ['r', 'البعد r', 'm', .9]], out: 'القوة F', u: 'N', f: v => 9e9 * Math.abs(v.q1 * v.q2) * 1e-12 / (v.r * v.r) } });
LW({ id: 'g10_el_sig', cat: 49, name: 'كثافة الشحنة', fx: '<i>σ</i> = ' + FR('<i>q</i>', '<i>A</i>'), sym: 'مقدار الشحنة لوحدة المساحة من سطح الموصل المشحون المعزول، وحدتها C/m². للكرة A = 4πr². تزداد عند الرؤوس المدببة', calc: { in: [['q', 'الشحنة q', 'C', 1e-6], ['r', 'نصف قطر الكرة r', 'm', .1]], out: 'كثافة الشحنة σ', u: 'C/m²', f: v => v.q / (4 * Math.PI * v.r * v.r) } });
LW({ id: 'g10_el_E', cat: 49, name: 'المجال الكهربائي', fx: '<i>E</i> = ' + FR('<i>F</i>', '<i>q′</i>') + ' ، <i>E</i> = ' + FR('<i>K q</i>', '<i>r</i>²'), sym: 'المجال عند نقطة: القوة المؤثرة في شحنة موضوعة فيها مقسومة على مقدارها، وحدته N/C. للشحنة النقطية E = Kq/r². كمية متجهة باتجاه القوة على شحنة اختبار موجبة', calc: { in: [['q', 'الشحنة المولدة q', 'C', 1e-10], ['r', 'البعد r', 'm', .5]], out: 'المجال E', u: 'N/C', f: v => 9e9 * Math.abs(v.q) / (v.r * v.r) } });
LW({ id: 'g10_el_flux', cat: 49, name: 'الفيض الكهربائي', fx: '<i>Φ</i> = <i>E</i><sub>⊥</sub> <i>A</i>', sym: 'عدد خطوط القوة الكهربائية التي تقطع السطح عمودياً: المجال العمودي × المساحة، وحدته N.m²/C. يساوي صفراً عندما يوازي السطح المجال', calc: { in: [['E', 'المجال E', 'N/C', 9000], ['A', 'المساحة A', 'm²', 12.56]], out: 'الفيض Φ', u: 'N.m²/C', f: v => v.E * v.A } });
LW({ id: 'g10_el_V', cat: 49, name: 'الجهد الكهربائي', fx: '<i>V</i> = ' + FR('<i>W</i>', '<i>q</i>') + ' ، <i>V</i> = <i>K</i> ' + FR('<i>q</i>', '<i>r</i>'), sym: 'الطاقة الكامنة الكهربائية لوحدة الشحنة في نقطة من المجال، كمية غير متجهة وحدتها الفولت. موجب حول الشحنة الموجبة وسالب حول السالبة، وجهد الأرض صفر', calc: { in: [['q', 'الشحنة q', 'C', 20e-6], ['r', 'البعد r', 'm', .05]], out: 'الجهد V', u: 'V', f: v => 9e9 * v.q / v.r } });
LW({ id: 'g10_el_W', cat: 49, name: 'فرق الجهد والشغل', fx: '<i>V</i><sub>AB</sub> = <i>V</i><sub>B</sub> − <i>V</i><sub>A</sub> = ' + FR('<i>W</i><sub>AB</sub>', '<i>q</i>') + ' ، <i>W</i> = <i>q</i> <i>V</i><sub>AB</sub>', sym: 'فرق الجهد بين نقطتين: الشغل اللازم لنقل شحنة موجبة من إحداهما إلى الأخرى مقسوماً على مقدارها', calc: { in: [['q', 'الشحنة المنقولة q', 'C', 1e-6], ['V', 'فرق الجهد V', 'V', 40]], out: 'الشغل W', u: 'J', f: v => v.q * v.V } });
LW({ id: 'g10_el_grad', cat: 49, name: 'انحدار الجهد', fx: '<i>E</i> = ' + FR('<i>V</i><sub>AB</sub>', '<i>x</i>'), sym: 'في المجال المنتظم: المجال الكهربائي = انحدار الجهد، ووحدته V/m وتكافئ N/C. المجال يتجه دائماً نحو الجهد الواطئ', calc: { in: [['V', 'فرق الجهد', 'V', 8], ['x', 'البعد x', 'm', 4]], out: 'المجال E', u: 'V/m', f: v => v.V / v.x } });

const Q49 = Object.assign(Object.create(Q43), {
  PX: 1, Ke: 9e9, e: 1.6e-19,
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#eff6ff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  ez(v, t, dt, k = 6) { return v + (t - v) * Math.min(1, dt * k); },
  /* example chips: list [[key,label]] + «التالية»; onSel(S2,k) must set S2.ex=k, S2.k=0 */
  exChips(S, id, list, y, cur, onSel, nL, o = {}) {
    return Q42.chips(S, id, list.concat([['nx', '⬇ التالية']]), y, cur, (S2, k) => { if (k === 'nx') { if (!S2.ex) onSel(S2, list[0][0]); else S2.k = Math.min((S2.k || 0) + 1, nL(S2)); } else if (S2.ex === k) S2.ex = ''; else onSel(S2, k); }, Object.assign({ col: '#be185d' }, o));
  },
  steps2(ctx, S, E, o) { return Q42.steps(ctx, S, { title: E.t, q: E.q, lines: E.lines, k: S.k || 0 }, Object.assign({ y: 70, x: S.W - 12, wd: S.W < 600 ? S.W - 24 : 320 }, o || {})); },
  /* metal plate (x,y top-left, w,h) with n signs (sgn) along its inner face side ('l','r','t','b') */
  plate(ctx, x, y, w, h, sgn, n, side) {
    K.raw(ctx, () => { const g = w > h ? ctx.createLinearGradient(0, y, 0, y + h) : ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, '#cbd5e1'); g.addColorStop(.5, '#f8fafc'); g.addColorStop(1, '#64748b'); ctx.fillStyle = g; rr(ctx, x, y, w, h, 3); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.stroke(); });
    if (!sgn || !n) return; for (let i = 0; i < n; i++) { const f = (i + .5) / n; if (w > h) Q31.sg(ctx, x + f * w, side === 't' ? y - 9 : y + h + 9, sgn, 6); else Q31.sg(ctx, side === 'l' ? x - 9 : x + w + 9, y + f * h, sgn, 6); }
  },
  /* battery symbol box */
  battery(ctx, x, y, lab) { K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; rr(ctx, x - 34, y - 16, 68, 32, 6); ctx.fill(); ctx.fillStyle = '#f59e0b'; ctx.fillRect(x - 34, y - 16, 20, 32); ctx.fillStyle = '#94a3b8'; ctx.fillRect(x + 34, y - 6, 5, 12); }); if (lab) Q42.T(ctx, lab, x + 6, y, { s: 11, w: 900, c: '#fff' }); },
  wire(ctx, pts, col = '#b45309', w = 3) { Q41.line(ctx, pts, col, w); },
  /* contour lines of a scalar function f on box b with given levels; cached in S[key] */
  contours(S, key, f, b, levels, step = 8) {
    const sig = key + JSON.stringify(b) + levels.join(','); if (S['_c' + key] && S['_c' + key].sig === sig) return S['_c' + key].segs;
    const nx = Math.ceil((b.x1 - b.x0) / step), ny = Math.ceil((b.y1 - b.y0) / step), V = [];
    for (let j = 0; j <= ny; j++) { const row = []; for (let i = 0; i <= nx; i++) row.push(f(b.x0 + i * step, b.y0 + j * step)); V.push(row); }
    const segs = levels.map(() => []);
    levels.forEach((lv, li) => { for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const x = b.x0 + i * step, y = b.y0 + j * step; const v = [V[j][i], V[j][i + 1], V[j + 1][i + 1], V[j + 1][i]]; if (v.some(q => !isFinite(q))) continue;
      const P = [[x, y], [x + step, y], [x + step, y + step], [x, y + step]], cut = [];
      for (let e = 0; e < 4; e++) { const a = v[e], c = v[(e + 1) % 4]; if ((a - lv) * (c - lv) < 0) { const t = (lv - a) / (c - a), p = P[e], q = P[(e + 1) % 4]; cut.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); } }
      if (cut.length >= 2) segs[li].push([cut[0], cut[1]]); if (cut.length === 4) segs[li].push([cut[2], cut[3]]); } });
    S['_c' + key] = { sig, segs }; return segs;
  },
  drawSegs(ctx, segs, col, w = 1.6, dash = [6, 5]) { K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.setLineDash(dash); ctx.beginPath(); segs.forEach(s => { ctx.moveTo(s[0][0], s[0][1]); ctx.lineTo(s[1][0], s[1][1]); }); ctx.stroke(); ctx.setLineDash([]); }); },
  /* fluffy cloud centred (x,y) width w */
  cloud(ctx, x, y, w, dark = .5) { K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y - w * .3, 0, y + w * .25); g.addColorStop(0, shade('#e2e8f0', -dark * 20)); g.addColorStop(1, shade('#64748b', -dark * 40)); ctx.fillStyle = g; ctx.beginPath(); [[-.36, .05, .2], [-.15, -.1, .26], [.1, -.14, .28], [.33, -.02, .22], [0, .07, .3], [-.2, .1, .2], [.22, .1, .2]].forEach(c => { ctx.moveTo(x + c[0] * w + c[2] * w, y + c[1] * w); ctx.arc(x + c[0] * w, y + c[1] * w, c[2] * w, 0, TAU); }); ctx.fill(); }); },
  /* building with optional lightning rod; returns rod tip */
  building(ctx, x, yb, w, h, rod) { K.raw(ctx, () => { const g = ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, '#d6d3d1'); g.addColorStop(1, '#a8a29e'); ctx.fillStyle = g; ctx.fillRect(x, yb - h, w, h); ctx.fillStyle = '#7dd3fc'; for (let r = 0; r < Math.floor(h / 34); r++) for (let c = 0; c < Math.floor(w / 26); c++) ctx.fillRect(x + 8 + c * 26, yb - h + 12 + r * 34, 14, 18); ctx.fillStyle = '#78716c'; ctx.fillRect(x - 4, yb - h - 6, w + 8, 8); });
    if (!rod) return [x + w / 2, yb - h - 6]; const rx = x + w - 14; K.raw(ctx, () => { ctx.strokeStyle = '#b45309'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(rx, yb - h - 46); ctx.lineTo(rx, yb - h - 6); ctx.lineTo(x + w + 8, yb - h); ctx.lineTo(x + w + 8, yb + 30); ctx.stroke(); ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.moveTo(rx - 4, yb - h - 40); ctx.lineTo(rx, yb - h - 56); ctx.lineTo(rx + 4, yb - h - 40); ctx.fill(); ctx.fillStyle = '#57534e'; ctx.fillRect(x + w - 2, yb + 30, 20, 8); }); return [rx, yb - h - 56]; },
  /* force arrow scaled logarithmically */
  farrow(ctx, x, y, ux, uy, F, F0, col, lab, mx = 120) { const L = clamp(28 + 26 * Math.log10(Math.abs(F) / F0 + 1e-9), 14, mx); if (Math.abs(F) < F0 * 1e-3) return; K.force(ctx, x, y, ux * L, uy * L, lab || '', col, 3.2); },
  fmtF(v, u = 'N') { return Q31.sci(v, 3, u); }
});

/* =============== A1 — خصائص الشحنة: الدلك، حفظ الشحنة، التكمية Q = ne، التجاذب والتنافر (9-1، ص 156) =============== */
(() => {
  const PAIR = { gs: ['زجاج + حرير', 'glass', 'silk', 1], rw: ['مطاط + صوف', 'rubber', 'wool', -1] };
  const NE = 2.5e9, QU = NE * 1.6e-19, RL = 230, PXM = 2000, MG = 1e-4; // electrons per stroke, C per stroke, rod length px, px per m, ball weight N
  const D = { id: 'g10_e_rub', page: 156, fig: 'خصائص الشحنة ص 156',
    desc: 'للشحنة الكهربائية ثلاث خصائص: 1) الشحنات المختلفة بالنوع تتجاذب والمتشابهة تتنافر. 2) الشحنة الكهربائية محفوظة: عند الدلك تنتقل الإلكترونات من جسم إلى آخر فيكتسب أحدهما شحنة سالبة والآخر موجبة مساوية لها. 3) الشحنة مكممة: Q = n e حيث e = 1.6×10⁻¹⁹ C.',
    tags: 'الشحنة الكهربائية دلك زجاج حرير مطاط صوف حفظ الشحنة تكمية Q=ne إلكترون تجاذب تنافر كرة معلقة كوارك',
    tools: ['ساق زجاج وقطعة حرير', 'ساق مطاط وقطعة صوف', 'كرة خفيفة مشحونة معلقة بخيط حريري', 'حامل'],
    steps: ['اسحب قطعة القماش ذهاباً وإياباً فوق الساق: كل دلكة تنقل عدداً من الإلكترونات وتراها تطير بين الجسمين.', 'لاحظ العدادين: شحنة الساق تساوي شحنة القماش مقداراً وتعاكسها نوعاً، ومجموعهما صفر دائماً: الشحنة محفوظة.', 'لاحظ أن Q = n e: الشحنة عدد صحيح من شحنات الإلكترون.', 'اسحب الساق المشحونة نحو الكرة المعلقة: تتنافر إن تشابهت الشحنتان وتتجاذب إن اختلفتا. غيّر شحنة الكرة من اللوحة.'],
    concl: ['الشحنات المختلفة بالنوع تتجاذب والمتشابهة تتنافر.', 'الشحنة محفوظة: ما يفقده جسم من إلكترونات يكسبه الآخر، فمجموع الشحنتين بعد الدلك صفر.', 'الشحنة مكممة: Q = n e ، e = 1.6×10⁻¹⁹ C.', 'الزجاج المدلوك بالحرير يُشحن بشحنة موجبة، والمطاط المدلوك بالصوف يُشحن بشحنة سالبة.'],
    laws: ['g10_el_qne'],
    controls: [SEL('pr', 'الساق والقماش', [['gs', 'ساق زجاج + حرير'], ['rw', 'ساق مطاط + صوف']], 'gs', (v, S) => { S.n = 0; S._fly = []; }), R('qb', 'شحنة الكرة المعلقة', -4, 4, 3, 1, 'nC'), TG('fv', 'سهم القوة على الكرة', true, null, 'force')],
    setup(S) { S.n = 0; S.th = 0; S.rt = null; S.cl = null; S._fly = []; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), y0 = h * .56; return { w, h, L, y0, px: L + 120, py: y0 - 190, Lp: 190 }; },
    init(S, g) { if (!S.rt) S.rt = [g.L + 290, g.y0]; if (!S.cl) S.cl = [g.L + 420, g.y0 - 120]; },
    P(S) { return PAIR[S.p.pr] || PAIR.gs; },
    ballPos(S, g) { return [g.px + Math.sin(S.th) * g.Lp, g.py + Math.cos(S.th) * g.Lp]; },
    force(S, g) { const P = D.P(S), qr = P[3] * S.n * QU, qb = S.p.qb * 1e-9, b = D.ballPos(S, g), c = [S.rt[0] + 45, S.rt[1]]; const dx = b[0] - c[0], dy = b[1] - c[1], dp = Math.max(30, Math.hypot(dx, dy)), r = dp / PXM, F = 9e9 * qr * qb / (r * r); return { F, fx: F * dx / dp, fy: F * dy / dp, r, ux: dx / dp, uy: dy / dp }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); D.init(S, g); const f = D.force(S, g); const tt = clamp(Math.atan2(f.fx, MG + f.fy * 0), -1, 1); S.th = Q49.ez(S.th, tt, dt, 3); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.P(S), sg = P[3], qrod = sg * S.n, b = D.ballPos(S, g); D.init(S, g); Q49.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = '#d6d3d1'; ctx.fillRect(0, g.y0 + 120, w, 8); ctx.fillStyle = '#a8a29e'; ctx.fillRect(0, g.y0 + 128, w, 30); });
      Q31.gallows(ctx, g.px - 70, g.y0 + 120, g.py, 70); Q31.thread(ctx, g.px, g.py, b[0], b[1]);
      const qb = S.p.qb; Q31.ball(ctx, b[0], b[1], 15, Math.sign(qb)); Q42.T(ctx, 'الكرة ' + (qb > 0 ? 'موجبة ' : qb < 0 ? 'سالبة ' : 'متعادلة') + (qb ? Math.abs(qb) + ' nC' : ''), b[0], b[1] + 32, { s: 11, w: 900, c: '#fff', bg: qb > 0 ? '#b91c1c' : qb < 0 ? '#1d4ed8' : '#475569' });
      const f = D.force(S, g); if (S.p.fv !== false && S.n && qb) { Q49.farrow(ctx, b[0], b[1], Math.sign(f.fx) || 1, 0, f.fx, 2e-6, '#16a34a', 'F'); }
      // rod in hand
      const rt = S.rt; Q31.rod(ctx, rt[0], rt[1], rt[0] + RL, rt[1], 20, P[1], S.n ? { n: Math.min(9, S.n), s: sg, from: .04, to: .6 } : null); C2.hand(ctx, rt[0] + RL - 10, rt[1] + 2, -1, 1.1, { sleeve: '#64748b' });
      // cloth
      const cl = S.cl; Q31.cloth(ctx, cl[0], cl[1], P[2], 1.15); for (let i = 0; i < Math.min(9, S.n); i++) Q31.sg(ctx, cl[0] - 28 + (i % 5) * 14, cl[1] - 8 + ((i / 5) | 0) * 16, -sg, 5.5);
      Q42.T(ctx, P[2] === 'silk' ? 'الحرير' : 'الصوف', cl[0], cl[1] - 38, { s: 11, w: 900, c: '#334155' });
      Q31.drawFly(ctx, S);
      const Qr = sg * S.n * QU, rel = !S.n || !qb ? 'لا قوة' : (sg * qb > 0 ? 'تنافر: شحنتان متشابهتان' : 'تجاذب: شحنتان مختلفتان');
      Q42.card(ctx, S, [{ t: 'عدد الإلكترونات المنتقلة n = ' + Q31.sci(S.n * NE, 3), c: '#1e3a8a', w: 800 }, { t: 'Q = n e = ' + Q31.sci(S.n * NE, 3) + ' × 1.6×10⁻¹⁹', mono: 1 }, { t: 'شحنة الساق = ' + Q31.sci(Qr, 3, 'C'), c: sg > 0 ? '#b91c1c' : '#1d4ed8', w: 900 }, { t: 'شحنة القماش = ' + Q31.sci(-Qr, 3, 'C'), c: sg > 0 ? '#1d4ed8' : '#b91c1c', w: 900 }, { t: 'المجموع = 0 ⟸ الشحنة محفوظة', c: '#0f766e', w: 900 }, { t: rel, c: '#16a34a', w: 900 }], { title: 'خصائص الشحنة — ' + P[0], y: 70, wd: 310 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, 'اسحب القماش فوق الساق لتدلكها، ثم قرّب الساق من الكرة');
    },
    chips(S, g) { return Q42.chips(S, 'act', [['dis', 'تفريغ الساق والقماش'], ['gs', 'زجاج + حرير'], ['rw', 'مطاط + صوف']], g.h - 84, S.p.pr, (S2, k) => { if (k === 'dis') { S2.n = 0; S2._fly = []; } else { setParam(S2, 'pr', k); S2.n = 0; S2._fly = []; } }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); D.init(S, g); const rt = S.rt, cl = S.cl;
      return [{ id: 'cloth', x: cl[0], y: cl[1], r: 38, axis: 'xy', keep: true, tip: 'اسحب القماش ذهاباً وإياباً فوق الساق', idle: 'ادلك ✋', drag: (S2, d) => { const x = clamp(d.ox + d.x - d.sx, g.L + 40, S2.W - 40), y = clamp(d.oy + d.y - d.sy, 70, g.y0 + 100); S2.cl = [x, y]; const r = S2.rt, inZ = x > r[0] + 20 && x < r[0] + RL - 20 && Math.abs(y - r[1]) < 34; const n = Q31.rub(S2, d, inZ, 40);
          for (let k = 0; k < n && S2.n < 9; k++) { S2.n++; const sg = D.P(S2)[3], a = [x, y], c = [r[0] + RL * (.05 + .06 * S2.n), r[1]]; if (sg > 0) Q31.fly(S2, c[0], c[1], a[0], a[1], .5); else Q31.fly(S2, a[0], a[1], c[0], c[1], .5); } } },
        { id: 'rod', x: rt[0] + RL * .55, y: rt[1], w: RL * .9, h: 36, axis: 'xy', keep: true, hint: false, tip: 'اسحب الساق نحو الكرة المعلقة', drag: (S2, d) => { S2.rt = [clamp(d.ox - RL * .55 + d.x - d.sx, g.px - 10, S2.W - RL - 30), clamp(d.oy + d.y - d.sy, g.py + 40, g.y0 + 100)]; } }].concat(D.chips(S, g)); },
    readings(S) { if (!S.W) return []; const g = D.geo(S), f = D.force(S, g), Qr = D.P(S)[3] * S.n * QU; return [rd('n الإلكترونات', Q31.sci(S.n * NE, 3)), rd('شحنة الساق', Q31.sci(Qr, 3, 'C')), rd('شحنة القماش', Q31.sci(-Qr, 3, 'C')), rd('مجموع الشحنتين', '0'), rd('القوة على الكرة', Q31.sci(Math.abs(f.F), 3, 'N'))]; },
    record(S) { const Qr = D.P(S)[3] * S.n * QU; return { n: Q31.sci(S.n * NE, 3), q: Q31.sci(Qr, 3), c: Q31.sci(-Qr, 3) }; },
    cols: [['n', 'n'], ['q', 'Q الساق (C)'], ['c', 'Q القماش (C)']],
    explain(S) { return Q26.ex('كلما دلكنا أكثر ازدادت شحنة الساق وشحنة القماش بالمقدار نفسه وبنوعين مختلفين، والكرة المعلقة تنجذب أو تبتعد.', 'الدلك لا يصنع الشحنة بل ينقل الإلكترونات من جسم إلى آخر، فالشحنة محفوظة ومجموعها صفر، وكل شحنة تساوي عدداً صحيحاً من شحنة الإلكترون Q = n e.', 'الشرارة عند لمس مقبض الباب بعد المشي على السجاد سببها انتقال الإلكترونات بالدلك.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — الكشاف الكهربائي: الشحن بالتماس وبالحث والتأريض (مراجعة 9-1) =============== */
(() => {
  const D = { id: 'g10_e_scope', page: 156, fig: 'طرائق الشحن بالكهربائية الساكنة',
    desc: 'الكشاف ذو الورقتين الذهبيتين يكشف عن الشحنة: عند تقريب ساق مشحونة من قرصه تنفرج الورقتان بالحث (تنفصل الشحنات في الموصل دون تماس)، وعند لمس القرص بالساق ينتقل جزء من الشحنة إليه (الشحن بالتماس)، وعند لمس القرص بالإصبع أثناء التقريب ثم إبعاد الإصبع فالساق يُشحن الكشاف بشحنة مخالفة لشحنة الساق (الشحن بالحث).',
    tags: 'كشاف كهربائي ورقتان ذهبيتان حث تماس تأريض انفراج الورقتين الشحن بالحث',
    tools: ['كشاف كهربائي ذو ورقتين ذهبيتين', 'ساق زجاج مدلوكة بالحرير', 'ساق مطاط مدلوكة بالصوف', 'الإصبع للتأريض'],
    steps: ['اسحب الساق المشحونة ببطء نحو قرص الكشاف: الورقتان تنفرجان تدريجياً بالحث، وتنطبقان عند الإبعاد.', 'المس القرص بالساق: ينتقل جزء من الشحنة ويبقى الانفراج بعد الإبعاد (شحن بالتماس).', 'للشحن بالحث: «فرّغ الكشاف»، قرّب الساق، اضغط «الإصبع على القرص»، ارفع الإصبع ثم أبعد الساق.', 'فعّل «كل الشحنات» من اللوحة لترى الشحنات الموجبة والسالبة معاً.'],
    concl: ['التقريب دون تماس يفصل الشحنات في الموصل: الشحنة المخالفة تقترب والمشابهة تبتعد إلى الورقتين.', 'الشحن بالتماس يعطي الكشاف شحنة من نوع شحنة الساق.', 'الشحن بالحث مع التأريض يعطي الكشاف شحنة مخالفة لشحنة الساق.', 'المواد العازلة لا تتولد عليها شحنة محتثة لأن إلكتروناتها مرتبطة بنوى ذراتها.'],
    laws: ['g10_el_qne'],
    controls: [SEL('rod', 'الساق', [['glass', 'ساق زجاج مشحونة +'], ['rubber', 'ساق مطاط مشحونة −']], 'glass', (v, S) => { if (S.es) { S.es.rod = v; S.es.rq = (v === 'glass' ? 1 : -1) * S.p.rq; } }), R('rq', 'شحنة الساق', 2, 8, 6, 1, 'وحدة', (v, S) => { if (S.es) S.es.rq = (S.p.rod === 'glass' ? 1 : -1) * v; }), TG('all', 'كل الشحنات', false, null, 'charges')],
    setup(S) { S.es = null; },
    G(S) { const w = S.W, h = S.H; return Q31E.geo(S, Q42.L(S) + 170, h - 160, 1.35); },
    mk(S, G) { if (!S.es) S.es = Q31E.mk({ rod: S.p.rod, rq: (S.p.rod === 'glass' ? 1 : -1) * S.p.rq, tip: [G.x + 190, G.discY + 70] }); },
    update(S, dt) { if (!S.W) return; const G = D.G(S); D.mk(S, G); Q31E.step(S.es, G, dt, S); },
    draw(ctx, w, h, S) {
      const G = D.G(S); D.mk(S, G); const E = S.es; Q49.bg(ctx, w, h); K.raw(ctx, () => { ctx.fillStyle = '#d6d3d1'; ctx.fillRect(0, G.yb, w, 10); });
      Q31E.draw(ctx, E, G, { mode: S.p.all ? 'all' : 'diff' });
      const ang = (E.ang * 2 * 180 / Math.PI).toFixed(0), st = Math.abs(E.Q) > .3 ? (E.Q > 0 ? 'الكشاف مشحون بشحنة موجبة' : 'الكشاف مشحون بشحنة سالبة') : 'الكشاف متعادل';
      const how = E.gnd ? 'الإصبع يوصل القرص بالأرض' : (Q31E.f(E, G) > .05 ? 'حث: الشحنات تنفصل' : 'الساق بعيدة');
      Q42.card(ctx, S, [{ t: 'زاوية انفراج الورقتين ≈ ' + ang + '°', c: '#a16207', w: 900 }, { t: 'شحنة الساق: ' + Q31E.sgn(E.rq), c: E.rq > 0 ? '#b91c1c' : '#1d4ed8', w: 800 }, { t: 'شحنة الكشاف: ' + Q31E.sgn(E.Q), c: '#334155', w: 800 }, { t: st, c: '#0f766e', w: 900 }, { t: how, c: '#7c3aed', w: 800 }], { title: 'الكشاف الكهربائي', y: 70, wd: 300 });
      Q42.drawChips(ctx, D.chips(S));
      Q42.banner(ctx, w, 'اسحب الساق نحو قرص الكشاف أو المسه به');
    },
    chips(S) { const E = S.es; return Q42.chips(S, 'sc', [['gnd', E && E.gnd ? 'ارفع الإصبع' : 'الإصبع على القرص'], ['far', 'أبعد الساق'], ['ch', 'اشحن الساق من جديد'], ['dis', 'فرّغ الكشاف']], S.H - 84, E && E.gnd ? 'gnd' : '', (S2, k) => { const E2 = S2.es; if (!E2) return; const G = D.G(S2);
      if (k === 'gnd') E2.gnd = !E2.gnd; else if (k === 'far') E2.tip = [Math.min(S2.W - 240, G.x + 330), G.discY - 60]; else if (k === 'ch') E2.rq = (S2.p.rod === 'glass' ? 1 : -1) * S2.p.rq; else { E2.Q = 0; E2.gnd = false; E2._fly = []; } }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const G = D.G(S); D.mk(S, G); const r = Q31E.rodDrag(S.es, G, S, { idle: 'قرّب الساق ✋' }); return (r ? [r] : []).concat(D.chips(S)); },
    readings(S) { const E = S.es; if (!E) return []; return [rd('شحنة الكشاف', Q31E.sgn(E.Q)), rd('شحنة الساق', Q31E.sgn(E.rq)), rd('انفراج الورقتين', (E.ang * 360 / Math.PI).toFixed(0) + '°'), rd('التأريض', E.gnd ? 'موصول' : 'مقطوع')]; },
    explain(S) { return Q26.ex('الورقتان تنفرجان بنعومة كلما اقتربت الساق المشحونة، وتبقيان منفرجتين بعد التماس أو بعد الشحن بالحث.', 'في الموصل إلكترونات حرة تتحرك بتأثير الشحنة القريبة، فتتجمع الشحنة المشابهة في الورقتين فتتنافران. والتأريض يسمح للإلكترونات بالانتقال من الأرض أو إليها.', 'الكشاف أداة بسيطة لمعرفة وجود الشحنة ونوعها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — ميزان الالتواء لكولوم (الشكل 1-9، ص 157) =============== */
(() => {
  const A = .1, KAP = 9e-4; // arm radius (m), fibre torsion constant (N.m/rad)
  const D = { id: 'g10_e_tors', page: 157, fig: 'الشكل 1-9',
    desc: 'صاغ كولوم قانونه تجريبياً بميزان الالتواء الذي ابتكره: ذراع أفقية خفيفة معلقة بخيط رفيع في طرفها كرة مشحونة، وكرة ثانية مشحونة ثابتة. التنافر يسبب لياً في خيط التعليق، ومقدار الزاوية التي يدور بها الخيط يبين مقدار القوة الكهربائية. بلَيّ رأس الخيط نقرّب الكرتين ونقيس القوة عند أبعاد مختلفة.',
    tags: 'ميزان الالتواء كولوم خيط التعليق زاوية اللي الشكل 1-9 قانون التربيع العكسي',
    tools: ['أسطوانة زجاجية', 'خيط تعليق رفيع ورأس التواء مدرّج', 'ذراع عازلة بكرة مشحونة وثقل موازن', 'كرة مشحونة ثابتة'],
    steps: ['المنظر من الأعلى: الكرة المتحركة A تبتعد عن الكرة الثابتة B بالتنافر حتى يتوازن لَيّ الخيط مع القوة الكهربائية.', 'اسحب مقبض رأس الالتواء الأحمر ليدور: يلتوي الخيط أكثر وتقترب الكرتان.', 'سجّل القراءات: زاوية اللي الكلية تتناسب مع القوة F. لاحظ أن F × r² ثابت تقريباً.', 'غيّر شحنة الكرتين من اللوحة: القوة تتناسب مع حاصل ضرب الشحنتين.'],
    concl: ['زاوية لَيّ الخيط تتناسب مع القوة الكهربائية بين الكرتين.', 'عند تنصيف البعد تتضاعف القوة أربع مرات: F ∝ 1 / r².', 'F ∝ q₁ q₂ ⟸ F = K q₁ q₂ / r².'],
    laws: ['g10_el_coul'],
    controls: [R('q', 'شحنة كل كرة', 10, 80, 50, 5, 'nC'), R('psi', 'زاوية لَيّ رأس الخيط', 0, 360, 0, 1, '°'), TG('fv', 'سهم القوة الكهربائية', true, null, 'force')],
    setup(S) { S.th = .6; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 200, cy: h * .42 + 10, R: 170, ra: 128, dx: w - 175, dy: h * .62, dr: 58 }; },
    solve(S) { const q = S.p.q * 1e-9, ps = S.p.psi * Math.PI / 180; const f = t => 9e9 * q * q * A * Math.cos(t / 2) / Math.pow(2 * A * Math.sin(t / 2), 2) - KAP * (t + ps); let lo = .02, hi = 3.1; for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (f(m) > 0) lo = m; else hi = m; } return (lo + hi) / 2; },
    phys(S) { const t = S.th, q = S.p.q * 1e-9, r = 2 * A * Math.sin(t / 2), F = 9e9 * q * q / (r * r); return { r, F, tw: t + S.p.psi * Math.PI / 180 }; },
    update(S, dt) { S.th = Q49.ez(S.th, D.solve(S), dt, 2.5); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.phys(S), a0 = -Math.PI / 2, aA = a0 + S.th; Q49.bg(ctx, w, h);
      // glass jar from above with degree scale
      K.raw(ctx, () => { const gr = ctx.createRadialGradient(g.cx - 50, g.cy - 60, 20, g.cx, g.cy, g.R); gr.addColorStop(0, 'rgba(255,255,255,.9)'); gr.addColorStop(1, 'rgba(186,230,253,.55)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.fill(); ctx.strokeStyle = '#0e7490'; ctx.lineWidth = 6; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R - 6, Math.PI * 1.1, Math.PI * 1.5); ctx.stroke();
        ctx.strokeStyle = '#334155'; for (let k = 0; k < 360; k += 5) { const a = a0 + k * Math.PI / 180, L = k % 30 ? 6 : 13; ctx.lineWidth = k % 30 ? 1 : 2; ctx.beginPath(); ctx.moveTo(g.cx + Math.cos(a) * (g.R - 10), g.cy + Math.sin(a) * (g.R - 10)); ctx.lineTo(g.cx + Math.cos(a) * (g.R - 10 - L), g.cy + Math.sin(a) * (g.R - 10 - L)); ctx.stroke(); } });
      for (let k = 0; k < 360; k += 30) { const a = a0 + k * Math.PI / 180; Q42.T(ctx, k + '°', g.cx + Math.cos(a) * (g.R - 34), g.cy + Math.sin(a) * (g.R - 34), { s: 9.5, w: 800, c: '#334155' }); }
      // arm + balls
      const bA = [g.cx + Math.cos(aA) * g.ra, g.cy + Math.sin(aA) * g.ra], cw = [g.cx - Math.cos(aA) * g.ra * .8, g.cy - Math.sin(aA) * g.ra * .8], bB = [g.cx + Math.cos(a0) * g.ra, g.cy + Math.sin(a0) * g.ra];
      Q41.line(ctx, [bA, cw], '#78350f', 4); K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(cw[0], cw[1], 11, 0, TAU); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(g.cx, g.cy, 6, 0, TAU); ctx.fill(); });
      K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(bB[0], bB[1]); ctx.lineTo(bB[0], bB[1] - 0); ctx.stroke(); });
      Q31.ball(ctx, bB[0], bB[1], 14, 1); Q31.ball(ctx, bA[0], bA[1], 14, 1);
      Q42.T(ctx, 'الكرة B ثابتة', bB[0] - 70, bB[1] + 26, { s: 10.5, w: 900, c: '#fff', bg: '#475569' }); Q42.T(ctx, 'A', bA[0] + 22, bA[1] - 14, { s: 12, w: 900, c: '#b91c1c' });
      Q41.line(ctx, [bA, bB], '#7c3aed', 1.6, [5, 4]); Q42.T(ctx, 'r = ' + (P.r * 100).toFixed(1) + ' cm', (bA[0] + bB[0]) / 2 - 6, (bA[1] + bB[1]) / 2 + 30, { s: 11, w: 900, c: '#7c3aed' });
      if (S.p.fv !== false) { const ux = (bA[0] - bB[0]) / Math.hypot(bA[0] - bB[0], bA[1] - bB[1]), uy = (bA[1] - bB[1]) / Math.hypot(bA[0] - bB[0], bA[1] - bB[1]); Q49.farrow(ctx, bA[0] + ux * 14, bA[1] + uy * 14, ux, uy, P.F, 1e-3, '#16a34a', 'F'); Q49.farrow(ctx, bB[0] - ux * 14, bB[1] - uy * 14, -ux, -uy, P.F, 1e-3, '#16a34a', ''); }
      Q42.T(ctx, 'منظر علوي لميزان الالتواء', g.cx, g.cy + g.R + 22, { s: 11, w: 900, c: '#0e7490' });
      // torsion head dial
      const ps = S.p.psi * Math.PI / 180, ka = a0 + ps; K.raw(ctx, () => { const gr = ctx.createRadialGradient(g.dx - 15, g.dy - 15, 5, g.dx, g.dy, g.dr); gr.addColorStop(0, '#f8fafc'); gr.addColorStop(1, '#94a3b8'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.dx, g.dy, g.dr, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.stroke(); ctx.lineWidth = 1.2; for (let k = 0; k < 360; k += 15) { const a = a0 + k * Math.PI / 180; ctx.beginPath(); ctx.moveTo(g.dx + Math.cos(a) * g.dr * .82, g.dy + Math.sin(a) * g.dr * .82); ctx.lineTo(g.dx + Math.cos(a) * g.dr * .95, g.dy + Math.sin(a) * g.dr * .95); ctx.stroke(); }
        ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.dx, g.dy); ctx.lineTo(g.dx + Math.cos(ka) * g.dr * .8, g.dy + Math.sin(ka) * g.dr * .8); ctx.stroke(); });
      Q41.knob(ctx, g.dx + Math.cos(ka) * g.dr * .8, g.dy + Math.sin(ka) * g.dr * .8, '#dc2626', 11);
      Q42.T(ctx, 'رأس الالتواء ψ = ' + S.p.psi.toFixed(0) + '°', g.dx, g.dy + g.dr + 20, { s: 11, w: 900, c: '#fff', bg: '#dc2626' });
      const tw = P.tw * 180 / Math.PI;
      Q42.card(ctx, S, [{ t: 'انحراف الذراع θ = ' + (S.th * 180 / Math.PI).toFixed(1) + '°', c: '#334155', w: 800 }, { t: 'اللي الكلي = θ + ψ = ' + tw.toFixed(1) + '°', c: '#a16207', w: 900 }, { t: 'F = ' + Q31.sci(P.F, 3, 'N'), mono: 1, c: '#16a34a', w: 900 }, { t: 'F × r² = ' + Q31.sci(P.F * P.r * P.r, 3, 'N.m²'), mono: 1, c: '#7c3aed' }, { t: 'اللي يتناسب مع القوة F', c: '#0f766e', w: 800 }, { t: 'حاصل F × r² ثابت تقريباً', c: '#0f766e', w: 800 }, { t: 'إذن F ∝ 1/r²', c: '#0f766e', w: 900 }], { title: 'ميزان الالتواء لكولوم', y: 70, wd: 300 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, 'أدر مقبض رأس الالتواء الأحمر وسجّل القراءات');
    },
    chips(S, g) { return Q42.chips(S, 'ps', [['0', 'ψ = 0°'], ['90', 'ψ = 90°'], ['180', 'ψ = 180°'], ['270', 'ψ = 270°']], g.h - 84, String(S.p.psi), (S2, k) => setParam(S2, 'psi', +k), { bw: 110 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), ka = -Math.PI / 2 + S.p.psi * Math.PI / 180;
      return [{ id: 'head', x: g.dx + Math.cos(ka) * g.dr * .8, y: g.dy + Math.sin(ka) * g.dr * .8, r: 22, cx: g.dx, cy: g.dy, keep: true, tip: 'أدر رأس الالتواء', idle: 'أدر ✋', drag: (S2, d) => { setParam(S2, 'psi', clamp(Math.round(S2.p.psi + (d.dang || 0) * 180 / Math.PI), 0, 360)); } }].concat(D.chips(S, g)); },
    readings(S) { const P = D.phys(S); return [rd('البعد r', (P.r * 100).toFixed(2) + ' cm'), rd('اللي الكلي', (P.tw * 180 / Math.PI).toFixed(1) + '°'), rd('القوة F', Q31.sci(P.F, 3, 'N')), rd('F × r²', Q31.sci(P.F * P.r * P.r, 3))]; },
    record(S) { const P = D.phys(S); return { r: (P.r * 100).toFixed(2), t: (P.tw * 180 / Math.PI).toFixed(1), f: Q31.sci(P.F, 3), fr: Q31.sci(P.F * P.r * P.r, 3) }; },
    cols: [['r', 'r (cm)'], ['t', 'اللي (°)'], ['f', 'F (N)'], ['fr', 'F r²']],
    explain(S) { return Q26.ex('كلما لوينا رأس الخيط أكثر اقتربت الكرتان، واحتجنا لياً أكبر بكثير لتقريبهما مسافة صغيرة.', 'لي الخيط يولّد عزماً يتناسب مع زاوية اللي، ويتوازن مع القوة الكهربائية، فزاوية اللي مقياس للقوة. وتجد أن F × r² ثابت، أي F ∝ 1/r².', 'استعمل كافندش ميزاناً مشابهاً لقياس ثابت الجذب العام بين الكتل.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — قانون كولوم: كرتان مشحونتان + منحني F–r (الشكل 2-9 + مثال 1 ص 158 + مسألة 1) =============== */
(() => {
  const PXM = 245;
  const EX = { e1: { t: 'مثال 1 ص 158', q: 'شحنة +2 μC على بعد 90 cm من شحنة +5 μC. احسب القوة المتبادلة وبيّن نوعها', lines: ['F = K q₁ q₂ / r²', 'F = 9×10⁹ × 2×10⁻⁶ × 5×10⁻⁶ / 0.9²', 'F = 0.09 / 0.81 = 1/9 N', 'حسب نيوتن الثالث: F₁₂ = − F₂₁', 'قوة تنافر لأن الشحنتين موجبتان'] },
    p1: { t: 'مسألة 1 ص 185', q: 'ما قوة التنافر بين شحنتين نقطيتين متساويتين كل منهما 1 μC على بعد 10 cm؟', lines: ['F = K q₁ q₂ / r²', 'F = 9×10⁹ × 10⁻⁶ × 10⁻⁶ / 0.1²', 'F = 9×10⁻³ / 10⁻²', 'F = 0.9 N'] } };
  const nice = v => { const e = Math.pow(10, Math.floor(Math.log10(v))), m = v / e; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * e; };
  const D = { id: 'g10_e_coul', page: 157, fig: 'الشكل 2-9',
    desc: 'قانون كولوم: القوة الكهربائية المتبادلة بين شحنتين نقطيتين ساكنتين تتناسب طردياً مع حاصل ضرب الشحنتين وعكسياً مع مربع البعد بينهما: F = K q₁ q₂ / r² ، K = 9×10⁹ N.m²/C² في الفراغ = 1/(4πε₀). القوتان متساويتان مقداراً ومتعاكستان اتجاهاً (نيوتن الثالث)، وتقل القوة في الوسط العازل.',
    tags: 'قانون كولوم F=Kq1q2/r2 تجاذب تنافر K=9×10⁹ سماحية الفراغ ε0 نيوتن الثالث F12=-F21 مثال 1/9N مسألة 0.9N منحني القوة البعد',
    tools: ['كرتان موصلتان مشحونتان على حاملين عازلين', 'مسطرة'],
    steps: ['اسحب الكرة الثانية لتغيير البعد r ولاحظ سهمي القوة ونقطة القراءة على المنحني.', 'غيّر الشحنتين من اللوحة (موجبة أو سالبة): تشابه ⟸ تنافر، اختلاف ⟸ تجاذب.', 'اضغط «مضاعفة r» لترى أن القوة تصبح ربع ما كانت.', 'زد السماحية النسبية للوسط: القوة تقل في الوسط العازل.', 'اختر مثال 1 أو مسألة 1 واكشف الحل خطوة خطوة.'],
    concl: ['F = K q₁ q₂ / r² ، K = 9×10⁹ N.m²/C².', 'F ∝ 1/r²: مضاعفة البعد تجعل القوة ربعاً.', 'F₁₂ = − F₂₁: متساويتان ومتعاكستان.', 'مثال 1: F = 1/9 N تنافر. مسألة 1: F = 0.9 N.'],
    laws: ['g10_el_coul'],
    controls: [R('q1', 'الشحنة q₁', -10, 10, 2, 1, 'μC'), R('q2', 'الشحنة q₂', -10, 10, 5, 1, 'μC'), R('r', 'البعد r', .08, 1.2, .9, .01, 'm'), R('er', 'السماحية النسبية للوسط', 1, 10, 1, .5, '')],
    setup(S) { S.ex = ''; S.k = 0; S.dbl = 0; S.rv = null; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x1: L + 110, ys: 190, gx: L + 60, gy: 320, gw: Math.min(w - L - 420, 380), gh: Math.max(150, h - 320 - 220) }; },
    F(S, r) { return 9e9 * S.p.q1 * S.p.q2 * 1e-12 / (r * r) / S.p.er; },
    update(S, dt) { if (S.rv == null) S.rv = S.p.r; S.rv = Q49.ez(S.rv, S.p.r, dt, 8); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, r = S.rv == null ? p.r : S.rv, F = D.F(S, r), x2 = g.x1 + r * PXM; Q49.bg(ctx, w, h);
      if (p.er > 1) K.raw(ctx, () => { ctx.fillStyle = 'rgba(250,204,21,.18)'; rr(ctx, g.x1 - 50, g.ys - 50, 1.2 * PXM + 100, 100, 12); ctx.fill(); });
      Q41.line(ctx, [[g.x1, g.ys + 44], [x2, g.ys + 44]], '#7c3aed', 1.5); Q42.T(ctx, 'r = ' + r.toFixed(2) + ' m', (g.x1 + x2) / 2, g.ys + 58, { s: 11, w: 900, c: '#7c3aed' });
      const rad = clamp(r * PXM / 2 - 2, 9, 18); Q31.ball(ctx, g.x1, g.ys, rad, Math.sign(p.q1)); Q31.ball(ctx, x2, g.ys, rad, Math.sign(p.q2));
      Q42.T(ctx, 'q₁ = ' + p.q1 + ' μC', g.x1, g.ys - 34, { s: 11, w: 900, c: p.q1 >= 0 ? '#b91c1c' : '#1d4ed8' }); Q42.T(ctx, 'q₂ = ' + p.q2 + ' μC', x2, g.ys - 34, { s: 11, w: 900, c: p.q2 >= 0 ? '#b91c1c' : '#1d4ed8' });
      const rep = F > 0; if (F) { Q49.farrow(ctx, g.x1 + (rep ? -rad : rad), g.ys, rep ? -1 : 1, 0, F, .01, '#16a34a', 'F₂₁', 90); Q49.farrow(ctx, x2 + (rep ? rad : -rad), g.ys, rep ? 1 : -1, 0, F, .01, '#16a34a', 'F₁₂', 90); }
      Q42.T(ctx, !F ? 'لا قوة' : rep ? 'تنافر' : 'تجاذب', (g.x1 + x2) / 2, g.ys - 60, { s: 12, w: 900, c: '#fff', bg: rep ? '#b91c1c' : '#1d4ed8' });
      if (p.er > 1) Q42.T(ctx, 'وسط عازل εr = ' + p.er, g.x1 + 40, g.ys - 70, { s: 10.5, w: 900, c: '#a16207' });
      // live F–r graph
      const Fm = Math.abs(D.F(S, .2)) || 1, ym = nice(Fm), A = { x: g.gx, y: g.gy, w: g.gw, h: g.gh, xmax: 1.2, ymax: ym, xs: .1, ys: ym / 5, lxs: .2, lys: ym / 5, xl: 'r (m)', yl: '|F| (N)' };
      const ax = Q41.axes(ctx, A); const pts = []; for (let rr2 = .06; rr2 <= 1.2; rr2 += .01) { const f = Math.abs(D.F(S, rr2)); if (f <= ym * 1.02) pts.push([ax.X(rr2), ax.Y(f)]); } if (pts.length > 1) Q41.line(ctx, pts, '#0f766e', 2.4);
      const fa = Math.abs(F); if (fa <= ym) Q41.dot(ctx, ax.X(r), ax.Y(fa), '#dc2626', 6); else Q42.T(ctx, 'القوة أكبر من المدى ↑', ax.X(r), g.gy - 4, { s: 10, w: 900, c: '#dc2626' });
      if (S.dbl && 2 * r <= 1.2) { Q41.dot(ctx, ax.X(2 * r), ax.Y(fa / 4), '#7c3aed', 6); Q42.T(ctx, 'عند 2r: F/4', ax.X(2 * r) + 6, ax.Y(fa / 4) - 14, { s: 10.5, w: 900, c: '#7c3aed', a: 'left' }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.e);
      if (S.ex) Q49.steps2(ctx, S, EX[S.ex]);
      else Q42.card(ctx, S, [{ t: 'F = K q₁ q₂ / (εr r²)', mono: 1, c: '#0f766e', w: 900 }, { t: 'q₁ q₂ = ' + (p.q1 * p.q2) + '×10⁻¹² C²', mono: 1 }, { t: 'r² = ' + (r * r).toFixed(4) + ' m²', mono: 1 }, { t: 'εr = ' + p.er, mono: 1 }, { t: '|F| = ' + Q31.sci(Math.abs(F), 3, 'N'), mono: 1, c: '#b91c1c', w: 900 }, { t: 'F₁₂ = − F₂₁', mono: 1, c: '#16a34a' }, { t: 'K = 1/4πε₀', mono: 1, c: '#334155' }, { t: 'ε₀ = 8.85×10⁻¹² C²/N.m²', mono: 1, c: '#334155' }], { title: 'قانون كولوم', y: 70, wd: 310 });
      Q42.banner(ctx, w, 'اسحب الكرة الثانية وغيّر الشحنتين من اللوحة');
    },
    chips(S, g) { return { a: Q42.chips(S, 'db', [['d', 'مضاعفة البعد'], ['air', 'الفراغ'], ['oil', 'وسط عازل']], g.h - 128, S.dbl ? 'd' : '', (S2, k) => { if (k === 'd') S2.dbl = !S2.dbl; else setParam(S2, 'er', k === 'air' ? 1 : 4); }, { bw: 170 }),
      e: Q49.exChips(S, 'ex', [['e1', 'مثال 1'], ['p1', 'مسألة 1']], g.h - 84, S.ex, (S2, k) => { S2.ex = k; S2.k = 0; setParam(S2, 'er', 1); if (k === 'e1') { setParam(S2, 'q1', 2); setParam(S2, 'q2', 5); setParam(S2, 'r', .9); } else { setParam(S2, 'q1', 1); setParam(S2, 'q2', 1); setParam(S2, 'r', .1); } }, S2 => EX[S2.ex].lines.length, { bw: 120 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), x2 = g.x1 + (S.rv == null ? S.p.r : S.rv) * PXM;
      return [{ id: 'q2', x: x2, y: g.ys, r: 24, axis: 'x', keep: true, tip: 'اسحب لتغيير البعد r', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'r', clamp((d.x - g.x1) / PXM, .08, 1.2)); } }].concat(C.a, C.e); },
    readings(S) { const F = D.F(S, S.p.r); return [rd('q₁ q₂', S.p.q1 * S.p.q2 + ' μC²'), rd('البعد r', S.p.r.toFixed(2) + ' m'), rd('القوة |F|', Q31.sci(Math.abs(F), 3, 'N')), rd('النوع', F > 0 ? 'تنافر' : F < 0 ? 'تجاذب' : '—')]; },
    record(S) { return { r: S.p.r.toFixed(2), f: Q31.sci(Math.abs(D.F(S, S.p.r)), 3), fr: Q31.sci(Math.abs(D.F(S, S.p.r)) * S.p.r * S.p.r, 3) }; },
    cols: [['r', 'r (m)'], ['f', '|F| (N)'], ['fr', 'F r²']],
    explain(S) { return Q26.ex('عند تقريب الكرتين تزداد القوة بسرعة كبيرة، والسهمان دائماً متساويان ومتعاكسان.', 'القوة تتناسب عكسياً مع مربع البعد: نصف البعد ⟸ أربعة أضعاف القوة. والوسط العازل يضعف القوة لأن سماحيته أكبر من سماحية الفراغ.', 'قوى كولوم تربط الإلكترونات بالنواة وتربط الذرات في الجزيئات.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B3 — ثلاث شحنات على استقامة واحدة: محصلة القوى ونقطة انعدامها (مثال 2 ص 159 + مسألة 2) =============== */
(() => {
  const CS = { e2: ['مثال 2', 4, 6, -5, 6, 2], p2: ['مسألة 2', 27, 3, 1, 1, .5], free: ['جرّب بنفسك', 4, 4, 2, 2, 1] }; // q1,q2,q3 μC, D m, x3 m
  const EX = { e2: { t: 'مثال 2 ص 159', q: 'q₁ = +4 μC و q₂ = +6 μC و q₃ = −5 μC على استقامة واحدة، r₁ = 2 m و r₂ = 4 m. احسب محصلة القوى على الشحنة السالبة', lines: ['F₁ = 9×10⁹ × 4×10⁻⁶ × 5×10⁻⁶ / 2²', 'تجاذب نحو اليسار: F₁ = 0.0450 N', 'F₂ = 9×10⁹ × 6×10⁻⁶ × 5×10⁻⁶ / 4²', 'تجاذب نحو اليمين: F₂ = 0.0169 N', 'FR = F₁ − F₂ = 0.045 − 0.0169', 'FR = 0.0281 N', 'باتجاه القوة الأكبر نحو اليسار'] },
    p2: { t: 'مسألة 2 ص 185', q: 'الشحنتان +27 μC و +3 μC تفصلهما مسافة 1 m. أين توضع شحنة ثالثة لتصبح محصلة القوى عليها صفراً؟', lines: ['المحصلة صفر ⟸ F₁ = F₂', 'K q₁ q₃ / x² = K q₂ q₃ / (1 − x)²', '27 / x² = 3 / (1 − x)²', 'x / (1 − x) = √9 = 3', 'x = 0.75 m', 'من الشحنة الكبرى، أي 25 cm من الصغرى'] } };
  const D = { id: 'g10_e_line', page: 159, fig: 'مثال 2 ص 159 + مسألة 2 ص 185',
    desc: 'إذا أثرت عدة شحنات في شحنة واحدة فإن القوة المحصلة هي المجموع الاتجاهي للقوى. على استقامة واحدة: القوتان المتعاكستان تُطرحان والمحصلة باتجاه القوة الأكبر. وتوجد بين شحنتين متشابهتين نقطة تنعدم عندها المحصلة.',
    tags: 'محصلة القوى ثلاث شحنات استقامة واحدة مثال 2 0.0281N مسألة 2 25cm نقطة التعادل',
    tools: ['ثلاث شحنات نقطية', 'مسطرة'],
    steps: ['اختر مثال 2: الشحنة السالبة تنجذب نحو q₁ ونحو q₂، والمحصلة نحو القوة الأكبر.', 'اسحب الشحنة الثالثة على الخط ولاحظ تغير F₁ و F₂ والمحصلة والمنحني.', 'اختر مسألة 2 وابحث بالسحب عن النقطة التي تصبح عندها المحصلة صفراً.', 'اكشف الحل خطوة خطوة وقارن.'],
    concl: ['المحصلة على خط واحد: FR = F₁ − F₂ باتجاه الأكبر.', 'مثال 2: FR = 0.0281 N نحو q₁.', 'مسألة 2: تنعدم المحصلة على بعد 25 cm من 3 μC أي 75 cm من 27 μC.', 'نقطة الانعدام أقرب إلى الشحنة الأصغر.'],
    laws: ['g10_el_coul'],
    controls: [R('q1', 'الشحنة q₁', -30, 30, 4, 1, 'μC'), R('q2', 'الشحنة q₂', -30, 30, 6, 1, 'μC'), R('q3', 'الشحنة الثالثة q₃', -6, 6, -5, 1, 'μC'), R('D', 'البعد بين q₁ و q₂', .5, 6, 6, .1, 'm')],
    setup(S) { S.cs = 'e2'; S.x3 = 2; S.ex = ''; S.k = 0; S.ok = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), xa = L + 50, span = Math.min(330, w - L - 440); return { w, h, L, xa, xb: xa + span, span, ys: 200, py: 300, ph: Math.max(150, h - 300 - 230) }; },
    Fs(S, x) { const p = S.p, k = 9e9 * 1e-12; const F1 = k * p.q1 * p.q3 / (x * x), F2 = k * p.q2 * p.q3 / ((p.D - x) * (p.D - x)); return { F1x: F1, F2x: -F2, FR: F1 - F2 }; }, // + = to the right
    update(S, dt) { const f = D.Fs(S, S.x3); const ok = Math.abs(f.FR) < .02 * Math.max(Math.abs(f.F1x), Math.abs(f.F2x)); if (ok && !S.ok && S.W) K.cheer(S, S.W / 2, 150); S.ok = ok ? 1 : 0; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, sc = g.span / p.D, X = m => g.xa + m * sc, f = D.Fs(S, S.x3); Q49.bg(ctx, w, h);
      Q41.line(ctx, [[g.xa - 30, g.ys], [g.xb + 30, g.ys]], '#94a3b8', 2);
      const lab = (q, x, n) => { Q31.ball(ctx, x, g.ys, 15, Math.sign(q)); Q42.T(ctx, n + ' = ' + (q > 0 ? '+' : '') + q + ' μC', x, g.ys - 32, { s: 11, w: 900, c: q >= 0 ? '#b91c1c' : '#1d4ed8' }); };
      lab(p.q1, X(0), 'q₁'); lab(p.q2, X(p.D), 'q₂'); lab(p.q3, X(S.x3), 'q₃');
      Q42.T(ctx, 'r₁ = ' + S.x3.toFixed(2) + ' m', (X(0) + X(S.x3)) / 2, g.ys + 30, { s: 10.5, w: 900, c: '#7c3aed' }); Q42.T(ctx, 'r₂ = ' + (p.D - S.x3).toFixed(2) + ' m', (X(S.x3) + X(p.D)) / 2, g.ys + 30, { s: 10.5, w: 900, c: '#7c3aed' });
      const F0 = 1e-3, x3 = X(S.x3); Q49.farrow(ctx, x3, g.ys - 52, Math.sign(f.F1x) || 1, 0, f.F1x, F0, '#dc2626', 'F₁', 90); Q49.farrow(ctx, x3, g.ys - 70, Math.sign(f.F2x) || 1, 0, f.F2x, F0, '#2563eb', 'F₂', 90);
      if (!S.ok) Q49.farrow(ctx, x3, g.ys + 58, Math.sign(f.FR) || 1, 0, f.FR, F0, '#16a34a', 'FR', 110); else Q42.T(ctx, 'المحصلة = صفر ✓', x3, g.ys + 62, { s: 12, w: 900, c: '#fff', bg: '#16a34a' });
      // FR vs x curve
      const bx = g.xa, by = g.py, bw = g.span, bh = g.ph; let Fm = 0; for (let i = 1; i < 40; i++) { const x = p.D * (.15 + .7 * i / 40); Fm = Math.max(Fm, Math.abs(D.Fs(S, x).FR)); } Fm = Fm || 1;
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, bx - 30, by - 14, bw + 60, bh + 40, 8); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(bx, by + bh / 2); ctx.lineTo(bx + bw, by + bh / 2); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.stroke(); });
      const Y = v => by + bh / 2 - clamp(v / Fm, -1.1, 1.1) * bh / 2 * .9, pts = []; for (let i = 1; i < 120; i++) { const x = p.D * i / 120; pts.push([bx + x / p.D * bw, Y(D.Fs(S, x).FR)]); } Q41.line(ctx, pts, '#16a34a', 2.2);
      Q41.dot(ctx, bx + S.x3 / p.D * bw, Y(f.FR), '#dc2626', 6); Q42.T(ctx, 'المحصلة: الموجب نحو اليمين', bx + 8, by + 4, { s: 10, w: 800, c: '#334155', a: 'left' }); Q42.T(ctx, 'x (m)', bx + bw - 10, by + bh / 2 + 14, { s: 10, w: 800, c: '#334155' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q42.drawChips(ctx, C.e);
      if (S.ex) Q49.steps2(ctx, S, EX[S.ex]);
      else Q42.card(ctx, S, [{ t: 'F₁ = ' + Q31.sci(Math.abs(f.F1x), 3, 'N') + (f.F1x > 0 ? ' →' : ' ←'), mono: 1, c: '#dc2626', w: 800 }, { t: 'F₂ = ' + Q31.sci(Math.abs(f.F2x), 3, 'N') + (f.F2x > 0 ? ' →' : ' ←'), mono: 1, c: '#2563eb', w: 800 }, { t: 'FR = ' + Q31.sci(Math.abs(f.FR), 3, 'N') + (f.FR > 0 ? ' →' : ' ←'), mono: 1, c: '#16a34a', w: 900 }, { t: 'المحصلة باتجاه القوة الأكبر', c: '#334155', w: 800 }], { title: 'محصلة القوى على q₃', y: 70, wd: 300 });
      Q42.banner(ctx, w, 'اسحب الشحنة الثالثة على الخط');
    },
    set(S, k) { const c = CS[k]; S.cs = k; ['q1', 'q2', 'q3', 'D'].forEach((n, i) => setParam(S, n, c[i + 1])); S.x3 = c[5]; },
    chips(S, g) { return { c: Q42.chips(S, 'cs', Object.keys(CS).map(k => [k, CS[k][0]]), g.h - 128, S.cs, (S2, k) => { D.set(S2, k); S2.ex = ''; }, { bw: 140 }),
      e: Q49.exChips(S, 'ex', [['e2', 'حل مثال 2'], ['p2', 'حل مسألة 2']], g.h - 84, S.ex, (S2, k) => { D.set(S2, k); S2.ex = k; S2.k = 0; }, S2 => EX[S2.ex].lines.length, { bw: 130 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), sc = g.span / S.p.D, C = D.chips(S, g);
      return [{ id: 'q3', x: g.xa + S.x3 * sc, y: g.ys, r: 24, axis: 'x', keep: true, tip: 'اسحب الشحنة الثالثة', idle: 'اسحب ✋', drag: (S2, d) => { S2.x3 = +clamp((d.x - g.xa) / sc, S2.p.D * .06, S2.p.D * .94).toFixed(3); } }].concat(C.c, C.e); },
    readings(S) { const f = D.Fs(S, S.x3); return [rd('r₁', S.x3.toFixed(2) + ' m'), rd('F₁', Q31.sci(Math.abs(f.F1x), 3, 'N')), rd('F₂', Q31.sci(Math.abs(f.F2x), 3, 'N')), rd('المحصلة FR', Q31.sci(Math.abs(f.FR), 3, 'N'))]; },
    record(S) { const f = D.Fs(S, S.x3); return { x: S.x3.toFixed(2), f1: Q31.sci(f.F1x, 3), f2: Q31.sci(f.F2x, 3), fr: Q31.sci(f.FR, 3) }; },
    cols: [['x', 'r₁ (m)'], ['f1', 'F₁'], ['f2', 'F₂'], ['fr', 'FR']],
    explain(S) { return Q26.ex('كلما اقتربت الشحنة الثالثة من إحدى الشحنتين قويت قوتها وضعفت الأخرى، وتوجد نقطة تتساويان عندها.', 'القوى على خط واحد تُجمع جبرياً: المتعاكستان تُطرحان. ونقطة الانعدام أقرب إلى الشحنة الأصغر لأن القوة تتناسب مع الشحنة وعكسياً مع مربع البعد.', 'المبدأ نفسه يحدد مواضع الأيونات المتوازنة في البلورات.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — التوصيل الكهربائي: موصلات وعوازل وأشباه موصلات (9-3، ص 160) =============== */
(() => {
  const MAT = [['ag', 'فضة', 40, 'm', ['#e5e7eb', '#f8fafc', '#9ca3af']], ['cu', 'نحاس', 30, 'm', ['#fdba74', '#fed7aa', '#c2410c']], ['al', 'ألمنيوم', 22, 'm', ['#cbd5e1', '#f1f5f9', '#64748b']], ['si', 'سليكون', .35, 's', ['#64748b', '#94a3b8', '#334155']], ['ge', 'جرمانيوم', .6, 's', ['#78716c', '#a8a29e', '#44403c']], ['gl', 'زجاج', 0, 'i', ['#e0f2fe', '#f0f9ff', '#7dd3fc']], ['rb', 'مطاط', 0, 'i', ['#334155', '#475569', '#0f172a']], ['sk', 'حرير جاف', 0, 'i', ['#fbcfe8', '#fdf2f8', '#db2777']]];
  const KIND = { m: ['موصل جيد', 'إلكترونات التكافؤ ضعيفة الارتباط بنوى ذراتها فتتحرك بحرية وتنقل الشحنة في الحال', '#16a34a'], s: ['شبه موصل', 'خواصه وسطية بين الموصلات والعوازل، يوصل ببطء. يستعمل في الترانزستورات والثنائيات والخلايا الشمسية', '#ca8a04'], i: ['عازل', 'إلكتروناته مرتبطة ارتباطاً وثيقاً بنوى ذراته ولا تتحرك بحرية، فلا تنتقل الشحنة', '#dc2626'] };
  const D = { id: 'g10_e_cond', page: 160, fig: 'التوصيل الكهربائي ص 160',
    desc: 'تنقسم المواد حسب قابليتها للتوصيل الكهربائي إلى موصلات وعوازل وأشباه موصلات. المعادن أجود الموصلات وعلى رأسها الفضة يليها النحاس فالألمنيوم. العوازل مثل المطاط والزجاج والمايكا والحرير الجاف والماء المقطر. وأشباه الموصلات مثل السليكون والجرمانيوم لها خواص وسطية.',
    tags: 'موصلات عوازل أشباه موصلات فضة نحاس ألمنيوم سليكون جرمانيوم زجاج مطاط حرير ماء مقطر إلكترونات التكافؤ ترانزستور خلايا شمسية',
    tools: ['كرة معدنية مشحونة على حامل عازل', 'كشاف كهربائي', 'سيقان من مواد مختلفة'],
    steps: ['اختر مادة الساق من الأزرار.', 'اسحب الساق إلى الأسفل (أو اضغط «صِل الساق») لتصل الكرة المشحونة بقرص الكشاف.', 'راقب انفراج الورقتين: فوري مع المعادن، بطيء مع أشباه الموصلات، ولا يحدث مع العوازل.', 'اضغط «أعد التجربة» وجرّب مادة أخرى وقارن.'],
    concl: ['الموصلات تسمح بمرور الشحنات خلالها في الحال: الفضة ثم النحاس ثم الألمنيوم.', 'العوازل لا تسمح بمرور الشحنات لأن إلكتروناتها مرتبطة بنوى ذراتها.', 'أشباه الموصلات (Si ، Ge) وسطية التوصيل ولها أهمية خاصة في التكنولوجيا.'],
    laws: [],
    controls: [SEL('m', 'مادة الساق', MAT.map(q => [q[0], q[1]]), 'cu', (v, S) => D.reset(S)), R('Q0', 'شحنة الكرة الابتدائية', 2, 10, 8, 1, 'وحدة', (v, S) => D.reset(S)), TG('el', 'حركة الإلكترونات في الساق', true, null, 'particles')],
    setup(S) { S.on = 0; S.bar = 0; S.Qs = null; S.Qe = 0; S.ang = .06; S.ph = 0; S.fl = 0; },
    reset(S) { S.on = 0; S.Qs = S.p.Q0; S.Qe = 0; S.fl = 0; },
    M(S) { return MAT.find(q => q[0] === S.p.m) || MAT[1]; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), G = Q31E.geo(S, L + 400, h - 175, 1.05); return { w, h, L, G, sx: L + 100, sy: G.discY - 6, sr: 42 }; },
    update(S, dt) { if (S.Qs == null) S.Qs = S.p.Q0; S.bar = Q49.ez(S.bar, S.on ? 1 : 0, dt, 5); const M = D.M(S); let fl = 0;
      if (S.bar > .97 && M[2] > 0) { const tgt = (S.Qs + S.Qe) / 2, dq = (S.Qs - tgt) * Math.min(1, M[2] * dt); S.Qs -= dq; S.Qe += dq; fl = dq / dt; }
      S.fl = Q49.ez(S.fl, fl, dt, 4); S.ph += dt * Math.min(6, Math.abs(S.fl)) * 40; S.ang = Q49.ez(S.ang, Q31.leafAng(S.Qe * .8), dt, 5); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), G = g.G, M = D.M(S), Kd = KIND[M[3]]; Q49.bg(ctx, w, h); K.raw(ctx, () => { ctx.fillStyle = '#d6d3d1'; ctx.fillRect(0, G.yb, w, 10); });
      Q31.sphere(ctx, g.sx, g.sy, g.sr, G.yb); const ns = Math.round(S.Qs == null ? S.p.Q0 : S.Qs); for (let i = 0; i < ns; i++) { const a = i / Math.max(1, ns) * TAU + .3; Q31.sg(ctx, g.sx + Math.cos(a) * g.sr * .8, g.sy + Math.sin(a) * g.sr * .8, 1, 5.5); }
      Q31.scope(ctx, G.x, G.yb, G.s, S.ang, { qDisc: S.Qe * .4, qLeaf: S.Qe * .6 });
      // bar
      const x1 = g.sx + g.sr - 6, x2 = G.x - 4, y = g.sy - 70 * (1 - S.bar); K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4; const gr = ctx.createLinearGradient(0, y - 9, 0, y + 9); gr.addColorStop(0, M[4][0]); gr.addColorStop(.4, M[4][1]); gr.addColorStop(1, M[4][2]); ctx.fillStyle = gr; rr(ctx, x1, y - 8, x2 - x1, 16, 6); ctx.fill(); ctx.restore(); ctx.fillStyle = '#a16207'; ctx.fillRect((x1 + x2) / 2 - 4, y - 60, 8, 52); });
      C2.hand(ctx, (x1 + x2) / 2 + 2, y - 60, -1, 1, { rot: -Math.PI / 2, sleeve: '#64748b' });
      if (S.p.el !== false && Math.abs(S.fl) > .02) for (let i = 0; i < 8; i++) { const f = ((i / 8 + S.ph / 400) % 1); Q31.el(ctx, x2 - f * (x2 - x1), y + (i % 2 ? 3 : -3), 4.5, clamp(Math.abs(S.fl) * 2, .2, 1)); }
      Q42.T(ctx, 'ساق ' + M[1], (x1 + x2) / 2, y + 24, { s: 11.5, w: 900, c: '#fff', bg: Kd[2] });
      Q42.T(ctx, 'كرة مشحونة', g.sx, G.yb + 22, { s: 10.5, w: 800, c: '#334155' }); Q42.T(ctx, 'كشاف', G.x, G.yb + 22, { s: 10.5, w: 800, c: '#334155' });
      Q42.card(ctx, S, [{ t: M[1] + ': ' + Kd[0], c: Kd[2], w: 900, s: 13.5 }, { t: Kd[1], c: '#334155' }, { t: 'شحنة الكرة ' + (S.Qs || 0).toFixed(1) + ' ، الكشاف ' + S.Qe.toFixed(1), c: '#1e3a8a', w: 800 }, { t: 'الفضة ثم النحاس ثم الألمنيوم أجود الموصلات', c: '#0f766e', w: 800 }], { title: 'التوصيل الكهربائي', y: 70, wd: 300 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.a);
      Q42.banner(ctx, w, 'اختر المادة ثم اسحب الساق لتصل الكرة بالكشاف');
    },
    chips(S, g) { return { m: Q42.chips(S, 'm', MAT.map(q => [q[0], q[1]]), g.h - 128, S.p.m, (S2, k) => { setParam(S2, 'm', k); D.reset(S2); }, { bw: 90 }), a: Q42.chips(S, 'a', [['on', S.on ? 'افصل الساق' : 'صِل الساق'], ['rs', 'أعد التجربة']], g.h - 84, S.on ? 'on' : '', (S2, k) => { if (k === 'on') S2.on = S2.on ? 0 : 1; else D.reset(S2); }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), x1 = g.sx + g.sr, x2 = g.G.x, y = g.sy - 70 * (1 - S.bar), C = D.chips(S, g);
      return [{ id: 'bar', x: (x1 + x2) / 2, y: y - 30, w: x2 - x1, h: 70, axis: 'y', keep: true, tip: 'اسحب الساق إلى الأسفل لتصل الكرة بالكشاف', idle: 'اسحب ✋', drag: (S2, d) => { S2.on = d.y > d.sy + 15 ? 1 : d.y < d.sy - 15 ? 0 : S2.on; } }].concat(C.m, C.a); },
    readings(S) { const M = D.M(S); return [rd('المادة', M[1] + ' — ' + KIND[M[3]][0]), rd('شحنة الكرة', (S.Qs || 0).toFixed(2)), rd('شحنة الكشاف', S.Qe.toFixed(2)), rd('انفراج الورقتين', (S.ang * 360 / Math.PI).toFixed(0) + '°')]; },
    record(S) { return { m: D.M(S)[1], k: KIND[D.M(S)[3]][0], e: S.Qe.toFixed(2) }; },
    cols: [['m', 'المادة'], ['k', 'النوع'], ['e', 'شحنة الكشاف']],
    explain(S) { return Q26.ex('مع الساق المعدنية تنفرج ورقتا الكشاف فوراً، ومع السليكون ببطء، ومع الزجاج أو المطاط لا تنفرجان.', 'في المعادن إلكترونات تكافؤ حرة تنتقل خلال المادة في الحال، وفي العوازل الإلكترونات مرتبطة بنوى ذراتها، وأشباه الموصلات بين الحالتين.', 'أسلاك الكهرباء من النحاس مغلفة بالمطاط أو البلاستيك العازل.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — نشاط: توزيع الشحنات على السطوح الخارجية للموصلات — الشبكة والوريقات (الشكلان 3-9 و 4-9، ص 160–161) =============== */
(() => {
  const N = 7;
  const D = { id: 'g10_e_mesh', page: 160, fig: 'الشكلان 3-9 و 4-9',
    desc: 'نشاط الكتاب: نلصق وريقات صغيرة على وجهي شبكة معدنية محمولة على حاملين عازلين ونشحنها فتتنافر الوريقات من الجهتين. ثم نثني الشبكة فتتنافر الوريقات على السطح الخارجي المحدب فقط وتبقى الوريقات على السطح الداخلي بدون تنافر. نستنتج أن الشحنات تستقر على السطوح الخارجية للموصلات المشحونة المعزولة بسبب تنافرها لأنها من النوع نفسه.',
    tags: 'نشاط شبكة معدنية وريقات توزيع الشحنات السطح الخارجي موصل مشحون معزول الشكل 3-9 الشكل 4-9 تنافر',
    tools: ['شبكة معدنية على حاملين عازلين', 'قطع ورقية صغيرة', 'مصدر للشحنات الكهربائية المستقرة'],
    steps: ['اضغط «اشحن الشبكة»: تبتعد النهايات السائبة للوريقات عن الشبكة من الجهتين (الشكل 3-9 a).', 'اسحب المقبض الأزرق في وسط الشبكة لتثنيها (أو استعمل شريط «تقوس الشبكة»).', 'لاحظ: وريقات السطح الخارجي المحدب تتنافر، ووريقات السطح الداخلي تهبط (الشكل 3-9 b).', 'انظر الشكل 4-9 في الأسفل: الشحنات على السطح الخارجي للكرة فقط.'],
    concl: ['الشحنات الكهربائية تستقر على السطوح الخارجية للموصلات المشحونة المعزولة.', 'السبب: الشحنات من النوع نفسه فتتنافر وتبتعد عن بعضها إلى أبعد ما يمكن.', 'لا توجد شحنة داخل الموصل ولا على سطحه الداخلي المقعر.'],
    laws: [],
    controls: [R('Q', 'شحنة الشبكة', 0, 10, 0, 1, 'وحدة'), R('c', 'تقوس الشبكة', 0, 1, 0, .05, ''), TG('sg', 'إظهار الشحنات', true, null, 'charges')],
    setup(S) { S.qv = 0; S.cv = 0; S.ao = Array(N).fill(0); S.ai = Array(N).fill(0); S.sp = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 200, y0: 175, H: 255 }; },
    pt(g, c, t) { const y = g.y0 + t * g.H, x = g.cx + c * 120 * (1 - Math.pow(2 * t - 1, 2)) - c * 30; const dx = c * 120 * (-4 * (2 * t - 1)), L = Math.hypot(dx, g.H); return { x, y, tx: dx / L, ty: g.H / L, nx: g.H / L, ny: -dx / L }; }, // normal points to +x (convex side)
    shares(S) { const c = S.cv, q = S.qv, inn = q * .5 * Math.pow(1 - c, 2); return { o: q - inn, i: inn }; },
    update(S, dt) { S.qv = Q49.ez(S.qv, S.p.Q, dt, 3); S.cv = Q49.ez(S.cv, S.p.c, dt, 5); const sh = D.shares(S); for (let i = 0; i < N; i++) { S.ao[i] = Q49.ez(S.ao[i], clamp(sh.o / 4.2, 0, 1.25), dt, 4 - i * .2); S.ai[i] = Q49.ez(S.ai[i], clamp(sh.i / 4.2, 0, 1.25), dt, 4 - i * .2); } if (S.sp > 0) S.sp -= dt; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = S.cv, sh = D.shares(S); Q49.bg(ctx, w, h);
      // generator dome
      const gx = g.L + 40, gy = g.y0 + g.H + 70; K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, gx - 18, gy, 36, 70, 6); ctx.fill(); const gr = ctx.createRadialGradient(gx - 10, gy - 14, 3, gx, gy - 4, 30); gr.addColorStop(0, '#fff'); gr.addColorStop(1, '#94a3b8'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(gx, gy - 6, 28, 0, TAU); ctx.fill(); });
      Q42.T(ctx, 'مولد شحنات', gx, gy + 84, { s: 10, w: 800, c: '#334155' });
      const pb = D.pt(g, c, 1); if (S.sp > 0) Q31.spark(ctx, gx + 20, gy - 20, pb.x - 6, pb.y + 4, S.sp * 7, 2.5);
      // mesh band
      K.raw(ctx, () => { ctx.lineCap = 'round'; for (let pass = 0; pass < 2; pass++) { ctx.strokeStyle = pass ? '#cbd5e1' : '#475569'; ctx.lineWidth = pass ? 3 : 9; ctx.setLineDash(pass ? [3, 4] : []); ctx.beginPath(); for (let i = 0; i <= 40; i++) { const p = D.pt(g, c, i / 40); i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); } ctx.stroke(); } ctx.setLineDash([]); });
      // insulating handles + hands
      const pt0 = D.pt(g, c, 0); K.raw(ctx, () => { ctx.fillStyle = '#a16207'; ctx.fillRect(pt0.x - 5, pt0.y - 44, 10, 42); ctx.fillRect(pb.x - 5, pb.y + 2, 10, 42); });
      C2.hand(ctx, pt0.x, pt0.y - 46, -1, 1, { rot: -Math.PI / 2, sleeve: '#64748b' }); C2.hand(ctx, pb.x, pb.y + 46, -1, 1, { rot: Math.PI / 2, sleeve: '#64748b' });
      // paper strips
      for (let i = 0; i < N; i++) { const t = (i + .5) / N, p = D.pt(g, c, t);
        [[1, S.ao[i]], [-1, S.ai[i]]].forEach(([sd, a]) => { const bx = p.x + sd * p.nx * 6, by = p.y + sd * p.ny * 6; const da = Math.atan2(p.ty, p.tx), na = Math.atan2(sd * p.ny, sd * p.nx); let df = na - da; while (df > Math.PI) df -= TAU; while (df < -Math.PI) df += TAU; const ang = da + df * clamp(a, 0, 1.25) * .8 + sd * .08;
          K.raw(ctx, () => { ctx.save(); ctx.translate(bx, by); ctx.rotate(ang); ctx.fillStyle = '#fef9c3'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1; ctx.fillRect(0, -3, 34, 6); ctx.strokeRect(0, -3, 34, 6); ctx.restore(); }); }); }
      if (S.p.sg !== false) { const no = Math.round(sh.o * 1.6), ni = Math.round(sh.i * 1.6); for (let i = 0; i < no; i++) { const p = D.pt(g, c, (i + .5) / no); Q31.sg(ctx, p.x + p.nx * 14, p.y + p.ny * 14, 1, 5); } for (let i = 0; i < ni; i++) { const p = D.pt(g, c, (i + .5) / ni); Q31.sg(ctx, p.x - p.nx * 14, p.y - p.ny * 14, 1, 5); } }
      Q41.knob(ctx, D.pt(g, c, .5).x + 26, D.pt(g, c, .5).y, '#2563eb', 10);
      Q42.T(ctx, c > .3 ? 'السطح الداخلي' : 'الوجه الأيسر', g.cx - 95, g.y0 + g.H / 2, { s: 11, w: 900, c: '#475569' }); Q42.T(ctx, c > .3 ? 'السطح الخارجي' : 'الوجه الأيمن', g.cx + 140 + c * 50, g.y0 + g.H / 2 - 40, { s: 11, w: 900, c: '#b91c1c' });
      // fig 4-9 inset
      const ix = w - 190, iy = h - 260, ir = 62; K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, ix - 100, iy - 92, 200, 190, 10); ctx.fill(); ctx.stroke(); const gr = ctx.createRadialGradient(ix - 20, iy - 20, 5, ix, iy, ir); gr.addColorStop(0, '#f8fafc'); gr.addColorStop(1, '#94a3b8'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(ix, iy, ir, 0, TAU); ctx.fill(); });
      for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; Q31.sg(ctx, ix + Math.cos(a) * (ir - 7), iy + Math.sin(a) * (ir - 7), 1, 4.5); K.force(ctx, ix + Math.cos(a) * (ir + 2), iy + Math.sin(a) * (ir + 2), Math.cos(a) * 18, Math.sin(a) * 18, '', '#ea580c', 1.6); }
      Q42.T(ctx, 'لا شحنة في الداخل', ix, iy, { s: 10, w: 900, c: '#334155' }); Q42.T(ctx, 'الشكل 4-9', ix, iy + 84, { s: 10, w: 800, c: '#0e7490' });
      Q42.card(ctx, S, [{ t: 'شحنة السطح الخارجي ≈ ' + sh.o.toFixed(1), c: '#b91c1c', w: 900 }, { t: 'شحنة السطح الداخلي ≈ ' + sh.i.toFixed(1), c: '#1d4ed8', w: 900 }, { t: c < .2 ? 'الشبكة مستوية: الوريقات تتنافر من الجهتين' : 'الشبكة مقوسة: الشحنة تنتقل إلى السطح الخارجي', c: '#0f766e', w: 800 }, { t: 'الشحنات المتشابهة تتنافر فتستقر على السطح الخارجي', c: '#334155' }], { title: 'نشاط: الشبكة والوريقات', y: 70, wd: 300 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, 'اشحن الشبكة ثم اسحب المقبض الأزرق لتثنيها');
    },
    chips(S, g) { return Q42.chips(S, 'mc', [['ch', 'اشحن الشبكة'], ['dis', 'فرّغ'], ['flat', 'شبكة مستوية a'], ['bend', 'شبكة مقوسة b']], g.h - 84, '', (S2, k) => { if (k === 'ch') { setParam(S2, 'Q', 8); S2.sp = .6; } else if (k === 'dis') setParam(S2, 'Q', 0); else setParam(S2, 'c', k === 'flat' ? 0 : 1); }, { bw: 150 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), p = D.pt(g, S.cv, .5); return [{ id: 'bend', x: p.x + 26, y: p.y, r: 20, axis: 'x', keep: true, tip: 'اسحب لثني الشبكة', idle: 'اثنِ ✋', drag: (S2, d) => { setParam(S2, 'c', clamp((d.x - g.cx + 4) / 96, 0, 1)); } }].concat(D.chips(S, g)); },
    readings(S) { const sh = D.shares(S); return [rd('الشحنة الكلية', S.qv.toFixed(1)), rd('السطح الخارجي', sh.o.toFixed(1)), rd('السطح الداخلي', sh.i.toFixed(1)), rd('التقوس', S.cv.toFixed(2))]; },
    explain(S) { return Q26.ex('عند ثني الشبكة المشحونة تهبط وريقات الوجه الداخلي وتبقى وريقات الوجه الخارجي متنافرة.', 'الشحنات من النوع نفسه تتنافر وتبتعد عن بعضها أبعد ما يمكن، وأبعد مكان هو السطح الخارجي للموصل.', 'لهذا يكون داخل السيارة المعدنية آمناً عند البرق، والشحنة تبقى على هيكلها الخارجي.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C3 — كثافة الشحنة σ = q / A والرؤوس المدببة: قرص الاختبار والكشاف (ص 161–162 + الشكل 17-9) =============== */
(() => {
  const D = { id: 'g10_e_dens', page: 161, fig: 'كثافة الشحنة + الشكل 17-9',
    desc: 'كثافة الشحنة σ: مقدار الشحنة لوحدة المساحة من سطح الموصل المشحون المعزول، σ = q / A وتقاس بـ C/m². للكرة A = 4πr² فالكثافة متساوية في كل نقاط سطحها. أما الموصل غير المنتظم فتتركز الشحنة عند رؤوسه المدببة بكثافة أكبر، لأن الكثافة تتناسب عكسياً مع نصف قطر التقوس، فيتأين الهواء حول الرأس المدبب وتتفرغ الشحنة منه إلى الجو.',
    tags: 'كثافة الشحنة σ=q/A C/m2 رؤوس مدببة قرص اختبار كشاف تأين الهواء تفريغ الشحنة الشكل 17-9 شمعة الريح الكهربائية',
    tools: ['موصل معزول له طرف مدبب', 'كرة موصلة', 'قرص اختبار بمقبض عازل', 'كشاف كهربائي', 'شمعة'],
    steps: ['اسحب قرص الاختبار والمس به نقطة على سطح الموصل، ثم المس به قرص الكشاف: انفراج الورقتين يدل على كثافة الشحنة في تلك النقطة.', 'قارن بين لمس الجزء الكروي العريض ولمس الرأس المدبب.', 'زد الشحنة: عند الرأس المدبب يتأين الهواء وتنطلق الأيونات وتنحرف لهب الشمعة، وتتسرب الشحنة.', 'اختر «كرة» لترى الكثافة المتساوية واحسب σ = q / 4πr².'],
    concl: ['σ = q / A ، وللكرة σ = q / 4πr² متساوية في جميع نقاط سطحها.', 'تتركز الشحنة عند الرؤوس المدببة بكثافة أكبر.', 'المجال الكبير عند الرأس المدبب يؤين الهواء فتتفرغ الشحنة إلى الجو (عمل الرؤوس المسننة).'],
    laws: ['g10_el_sig'],
    controls: [R('Q', 'شحنة الموصل', 0, 10, 6, .5, 'μC', (v, S) => { S.qv = v; }), R('r', 'نصف قطر الكرة', .05, .5, .1, .01, 'm'), TG('cnd', 'شمعة قرب الرأس المدبب', true, null, 'fire')],
    setup(S) { S.sh = 'pear'; S.qv = null; S.pp = null; S.pq = 0; S.sq = 0; S.ang = .06; S.ion = []; S.wind = 0; S.bt = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, bx: L + 150, by: 300, R1: 78, r2: 6, d: 200, sx: w - 190, syb: h - 165 }; },
    bound(S, g) { const key = S.sh + g.bx + g.by; if (S._bk === key) return S._b; const P = []; if (S.sh === 'sph') { for (let i = 0; i < 240; i++) { const a = i / 240 * TAU; P.push([g.bx + 40 + Math.cos(a) * 100, g.by + Math.sin(a) * 100, 1]); } }
      else { const be = Math.asin((g.R1 - g.r2) / g.d), au = -(Math.PI / 2 - be), al = Math.PI / 2 - be, c2 = [g.bx + g.d, g.by];
        for (let i = 0; i <= 160; i++) { const a = al + (au + TAU - al) * i / 160; P.push([g.bx + Math.cos(a) * g.R1, g.by + Math.sin(a) * g.R1, 1]); }
        const tu = [g.bx + Math.cos(au) * g.R1, g.by + Math.sin(au) * g.R1], su = [c2[0] + Math.cos(au) * g.r2, c2[1] + Math.sin(au) * g.r2]; for (let i = 1; i < 50; i++) { const f = i / 50; P.push([tu[0] + (su[0] - tu[0]) * f, tu[1] + (su[1] - tu[1]) * f, 1 + 2.2 * f * f]); }
        for (let i = 0; i <= 30; i++) { const a = au + (al - au) * i / 30; P.push([c2[0] + Math.cos(a) * g.r2, c2[1] + Math.sin(a) * g.r2, 9]); }
        const tl = [g.bx + Math.cos(al) * g.R1, g.by + Math.sin(al) * g.R1], sl = [c2[0] + Math.cos(al) * g.r2, c2[1] + Math.sin(al) * g.r2]; for (let i = 1; i < 50; i++) { const f = 1 - i / 50; P.push([tl[0] + (sl[0] - tl[0]) * f, tl[1] + (sl[1] - tl[1]) * f, 1 + 2.2 * f * f]); } }
      let L = 0, Wt = 0; for (let i = 0; i < P.length; i++) { const q = P[(i + 1) % P.length], ds = Math.hypot(q[0] - P[i][0], q[1] - P[i][1]); P[i][3] = ds; L += ds; Wt += ds * P[i][2]; } P.forEach(p => { p[2] = p[2] * L / Wt; }); S._bk = key; S._b = P; return P; },
    near(P, x, y) { let b = null, bd = 1e9; P.forEach(p => { const d = Math.hypot(p[0] - x, p[1] - y); if (d < bd) { bd = d; b = p; } }); return [b, bd]; },
    tip(g) { return [g.bx + g.d + g.r2, g.by]; },
    update(S, dt) { if (!S.W) return; if (S.qv == null) S.qv = S.p.Q; const g = D.geo(S), P = D.bound(S, g); if (!S.pp) S.pp = [g.bx + 60, g.by + 170];
      const [b, bd] = D.near(P, S.pp[0], S.pp[1]); if (bd < 16) S.pq = Q49.ez(S.pq, b[2] * S.qv * .14, dt, 8);
      if (Math.hypot(S.pp[0] - g.sx, S.pp[1] - (g.syb - 175)) < 30) { S.sq = Q49.ez(S.sq, S.pq, dt, 8); }
      S.ang = Q49.ez(S.ang, Q31.leafAng(S.sq * 1.3), dt, 5);
      const corona = S.sh === 'pear' && S.qv > 4.5; S.wind = Q49.ez(S.wind, corona ? clamp((S.qv - 4.5) / 4, .2, 1) : 0, dt, 3);
      if (corona) { S.qv = Math.max(4.5, S.qv - dt * .12 * (S.qv - 4.3)); S.bt += dt; while (S.bt > .07) { S.bt -= .07; const t = D.tip(g); S.ion.push({ x: t[0] + 4, y: t[1] + (Math.random() - .5) * 8, vx: 90 + Math.random() * 70, vy: (Math.random() - .5) * 50, l: 0 }); } }
      S.ion.forEach(o => { o.x += o.vx * dt; o.y += o.vy * dt; o.l += dt; }); S.ion = S.ion.filter(o => o.l < 1.3); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.bound(S, g), q = S.qv == null ? S.p.Q : S.qv; Q49.bg(ctx, w, h); if (!S.pp) S.pp = [g.bx + 60, g.by + 170];
      // body + stand
      K.raw(ctx, () => { ctx.fillStyle = '#a16207'; ctx.fillRect(g.bx - 5, g.by + 60, 10, 130); ctx.fillStyle = '#334155'; rr(ctx, g.bx - 50, g.by + 186, 100, 12, 4); ctx.fill(); ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.3)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 6; const gr = ctx.createRadialGradient(g.bx - 30, g.by - 40, 6, g.bx + 40, g.by, 210); gr.addColorStop(0, '#fff'); gr.addColorStop(.4, '#e2e8f0'); gr.addColorStop(1, '#64748b'); ctx.fillStyle = gr; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.restore(); });
      // charges distributed by density
      const n = Math.round(q * 5); if (n > 0) { const tot = P.reduce((a, p) => a + p[2] * p[3], 0); let acc = .5 * tot / n; const cx = g.bx + 40; P.forEach(p => { acc += p[2] * p[3]; while (acc >= tot / n) { acc -= tot / n; const dx = cx - p[0], dy = g.by - p[1], L = Math.hypot(dx, dy) || 1; Q31.sg(ctx, p[0] + dx / L * 7, p[1] + dy / L * 7, 1, 4.6); } }); }
      // ions + candle
      S.ion.forEach(o => Q31.sg(ctx, o.x, o.y, 1, 3.5, clamp(1 - o.l / 1.3, 0, 1)));
      if (S.p.cnd !== false && S.sh === 'pear') { const t = D.tip(g), cx = t[0] + 70, cy = g.by + 70; K.raw(ctx, () => { ctx.fillStyle = '#fef3c7'; ctx.strokeStyle = '#d97706'; rr(ctx, cx - 9, cy, 18, 70, 3); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#111'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - 6); ctx.stroke(); const lean = S.wind * 1.3; ctx.save(); ctx.translate(cx, cy - 6); ctx.rotate(lean); const fg = ctx.createRadialGradient(0, -14, 2, 0, -14, 22); fg.addColorStop(0, '#fffbeb'); fg.addColorStop(.4, '#fbbf24'); fg.addColorStop(1, 'rgba(234,88,12,0)'); ctx.fillStyle = fg; ctx.beginPath(); ctx.moveTo(-7, 0); ctx.quadraticCurveTo(-9, -18, 0, -38 + S.wind * 8); ctx.quadraticCurveTo(9, -18, 7, 0); ctx.closePath(); ctx.fill(); ctx.restore(); });
        if (S.wind > .1) Q42.T(ctx, 'الريح الكهربائية تحرف اللهب', cx + 10, cy + 90, { s: 10.5, w: 900, c: '#fff', bg: '#ea580c' }); }
      // electroscope
      Q31.scope(ctx, g.sx, g.syb, .85, S.ang, { qDisc: S.sq * .4, qLeaf: S.sq * .6 }); Q42.T(ctx, 'الكشاف', g.sx, g.syb + 18, { s: 10.5, w: 800, c: '#334155' });
      // proof plane
      const pp = S.pp; K.raw(ctx, () => { ctx.fillStyle = '#a16207'; ctx.save(); ctx.translate(pp[0], pp[1]); ctx.rotate(.5); ctx.fillRect(-3, 8, 6, 70); ctx.restore(); const gr = ctx.createRadialGradient(pp[0] - 3, pp[1] - 3, 1, pp[0], pp[1], 11); gr.addColorStop(0, '#fff'); gr.addColorStop(1, '#94a3b8'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(pp[0], pp[1], 10, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.stroke(); });
      if (S.pq > .15) Q31.sg(ctx, pp[0], pp[1], 1, 5); Q42.T(ctx, 'قرص الاختبار', pp[0] + 10, pp[1] + 86, { s: 10, w: 800, c: '#a16207' });
      const [b] = D.near(P, pp[0], pp[1]), A = 4 * Math.PI * S.p.r * S.p.r;
      const lines = S.sh === 'sph' ? [{ t: 'σ = q / A = q / 4πr²', mono: 1, c: '#0f766e', w: 900 }, { t: 'A = 4π × ' + S.p.r + '² = ' + Q31.sci(A, 3, 'm²'), mono: 1 }, { t: 'σ = ' + Q31.sci(q * 1e-6 / A, 3, 'C/m²'), mono: 1, c: '#b91c1c', w: 900 }, { t: 'الكثافة متساوية في كل نقاط سطح الكرة', c: '#334155', w: 800 }]
        : [{ t: 'كثافة الشحنة عند أقرب نقطة ≈ ' + b[2].toFixed(1) + ' × المتوسط', c: '#b91c1c', w: 900 }, { t: 'شحنة قرص الاختبار ' + S.pq.toFixed(2) + ' ، الكشاف ' + S.sq.toFixed(2), c: '#334155', w: 800 }, { t: 'الشحنة تتركز عند الرأس المدبب', c: '#0f766e', w: 900 }, { t: S.wind > .1 ? 'تأين الهواء: تفريغ الشحنة من الرأس' : 'زد الشحنة لترى التفريغ', c: '#ea580c', w: 800 }];
      Q42.card(ctx, S, lines, { title: 'كثافة الشحنة σ', y: 70, wd: 300 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, 'المس الموصل بقرص الاختبار ثم المس قرص الكشاف');
    },
    chips(S, g) { return Q42.chips(S, 'sh', [['pear', 'موصل مدبب'], ['sph', 'كرة'], ['ch', 'اشحن من جديد'], ['dis', 'فرّغ الكشاف']], g.h - 84, S.sh, (S2, k) => { if (k === 'pear' || k === 'sph') { S2.sh = k; S2.ion = []; } else if (k === 'ch') S2.qv = S2.p.Q; else { S2.sq = 0; S2.pq = 0; } }, { bw: 150 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); if (!S.pp) S.pp = [g.bx + 60, g.by + 170]; return [{ id: 'probe', x: S.pp[0], y: S.pp[1], r: 22, axis: 'xy', keep: true, tip: 'اسحب قرص الاختبار', idle: 'المس ✋', drag: (S2, d) => { S2.pp = [clamp(d.ox + d.x - d.sx, g.L + 10, S2.W - 30), clamp(d.oy + d.y - d.sy, 60, S2.H - 170)]; } }].concat(D.chips(S, g)); },
    readings(S) { const A = 4 * Math.PI * S.p.r * S.p.r; return [rd('شحنة الموصل', (S.qv || 0).toFixed(2) + ' μC'), rd('شحنة قرص الاختبار', S.pq.toFixed(2)), rd('شحنة الكشاف', S.sq.toFixed(2)), rd('σ للكرة', Q31.sci(S.p.Q * 1e-6 / A, 3, 'C/m²'))]; },
    explain(S) { return Q26.ex('قرص الاختبار يأخذ شحنة أكبر بكثير من الرأس المدبب منها من الجزء العريض، وعند شحنة كبيرة تنطلق أيونات من الرأس وينحرف لهب الشمعة.', 'الكثافة تتناسب عكسياً مع نصف قطر التقوس، فيكون المجال عند الرأس المدبب كبيراً جداً يؤين الهواء، فتنجذب الدقائق المخالفة وتتعادل ثم تُشحن بشحنة مماثلة فتتنافر مبتعدة.', 'مانعة الصواعق تستعمل رأساً مدبباً لتفريغ الشحنة بهدوء.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — المجال الكهربائي وخطوطه وشحنة الاختبار (الأشكال 5-9 إلى 8-9 + مثال 3 ص 168) =============== */
(() => {
  const PXM = 150;
  const CF = { pos: ['شحنة موجبة 5-a', [1]], neg: ['شحنة سالبة 5-b', [-1]], unl: ['مختلفتان 7-a', [1, -1]], lik: ['متماثلتان 7-b', [1, 1]] };
  const EX = { e3: { t: 'مثال 3 ص 168', q: 'شحنتان نقطيتان كل منهما +1 μC والبعد بينهما 2 m. احسب المجال عند نقطة على الخط الواصل بينهما تبعد 0.5 m عن الأولى و 1.5 m عن الثانية', lines: ['نفرض شحنة اختبار موجبة عند النقطة a', 'E₁ = 9×10⁹ × 1×10⁻⁶ / 0.5²', 'E₁ = 36×10³ N/C', 'E₂ = 9×10⁹ × 1×10⁻⁶ / 1.5²', 'E₂ = 4×10³ N/C', 'المجالان متعاكسان: ER = E₁ − E₂', 'ER = 32×10³ N/C', 'باتجاه المجال الأكبر'] } };
  const D = { id: 'g10_e_field', page: 163, fig: 'الأشكال 5-9 و 6-9 و 7-9 و 8-9',
    desc: 'المجال الكهربائي: الحيز المحيط بالشحنة الذي يظهر فيه تأثير القوة الكهربائية على شحنة اختبارية موجبة. كمية متجهة باتجاه القوة على شحنة الاختبار، ويمثل بخطوط القوة: المسار الذي تسلكه شحنة اختبارية موجبة حرة الحركة. تنبع الخطوط من الشحنة الموجبة عمودية على سطحها وتتجه نحو السالبة، والمماس للخط في أي نقطة يمثل اتجاه المجال، والخطوط لا تتقاطع. كمياً E = F / q′ ، وللشحنة النقطية E = K q / r².',
    tags: 'المجال الكهربائي خطوط القوة شحنة اختبار E=F/q E=Kq/r2 N/C المماس لا تتقاطع شحنتان متماثلتان مختلفتان مثال 3 32×10³',
    tools: ['شحنات نقطية', 'شحنة اختبار صغيرة موجبة q′'],
    steps: ['اختر نوع المجال من الأزرار: شحنة موجبة أو سالبة أو شحنتان مختلفتان أو متماثلتان.', 'اسحب شحنة الاختبار الصفراء q′: سهم القوة يدل على اتجاه المجال، والخط المتقطع هو المماس لخط القوة.', 'اسحب الشحنات نفسها وراقب تغير خطوط المجال: لاحظ أنها لا تتقاطع.', 'اختر مثال 3 واكشف الحل، ثم ضع q′ على بعد 0.5 m من الأولى وقارن القراءة.'],
    concl: ['E = F / q′ ووحدته N/C ، وللشحنة النقطية E = K q / r².', 'خطوط المجال تنبع من الموجبة عمودية على سطحها وتنتهي بالسالبة.', 'المماس لخط القوة في أي نقطة يمثل اتجاه المجال، والخطوط لا تتقاطع.', 'مثال 3: ER = 32×10³ N/C باتجاه المجال الأكبر.'],
    laws: ['g10_el_E'],
    controls: [R('q', 'مقدار كل شحنة', 1, 5, 1, 1, 'μC'), TG('ln', 'خطوط المجال', true, null, 'efield'), TG('gr', 'متجهات المجال', false, null, 'vector'), TG('tg', 'المماس عند q′', true, null, 'line')],
    setup(S) { S.cf = 'unl'; S.cs = null; S.tp = null; S.ex = ''; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, y: h * .45, x1: L + 110, b: { x0: L, y0: 40, x1: w, y1: h - 150 } }; },
    init(S, g) { if (!S.cs) { const one = CF[S.cf][1].length === 1; S.cs = one ? [[g.x1 + 150, g.y]] : [[g.x1, g.y], [g.x1 + 2 * PXM, g.y]]; } if (!S.tp) S.tp = [g.x1 + .5 * PXM, g.y - (CF[S.cf][1].length === 1 ? 90 : 0)]; },
    chs(S) { return S.cs.map((c, i) => ({ x: c[0], y: c[1], q: CF[S.cf][1][i] })); },
    E(S, x, y) { let ex = 0, ey = 0; S.cs.forEach((c, i) => { const dx = (x - c[0]) / PXM, dy = (y - c[1]) / PXM, r = Math.max(.08, Math.hypot(dx, dy)), E = 9e9 * CF[S.cf][1][i] * S.p.q * 1e-6 / (r * r); ex += E * dx / r; ey += E * dy / r; }); return [ex, ey]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); D.init(S, g); const chs = D.chs(S); Q49.bg(ctx, w, h);
      if (S.p.gr) Q31F.grid(ctx, chs, g.b, 44, 400); if (S.p.ln !== false) Q31F.draw(ctx, S, chs, g.b, { per: 8 + S.p.q * 2, col: '#ea580c' });
      chs.forEach((c, i) => { Q31.ball(ctx, c.x, c.y, 20, c.q); Q42.T(ctx, 'q' + (i ? '₂' : '₁') + ' = ' + (c.q > 0 ? '+' : '−') + S.p.q + ' μC', c.x, c.y + 36, { s: 10.5, w: 900, c: '#fff', bg: c.q > 0 ? '#b91c1c' : '#1d4ed8' }); });
      const t = S.tp, E = D.E(S, t[0], t[1]), Em = Math.hypot(E[0], E[1]), ux = E[0] / (Em || 1), uy = E[1] / (Em || 1);
      if (S.p.tg !== false && Em) Q41.line(ctx, [[t[0] - ux * 60, t[1] - uy * 60], [t[0] + ux * 60, t[1] + uy * 60]], '#7c3aed', 1.8, [5, 4]);
      Q31.ball(ctx, t[0], t[1], 10, 1); Q42.T(ctx, 'q′', t[0] - 16, t[1] - 16, { s: 12, w: 900, c: '#a16207' });
      if (Em) Q49.farrow(ctx, t[0] + ux * 11, t[1] + uy * 11, ux, uy, Em, 300, '#16a34a', 'E', 110);
      const r1 = Math.hypot(t[0] - S.cs[0][0], t[1] - S.cs[0][1]) / PXM;
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q42.drawChips(ctx, C.e);
      if (S.ex) Q49.steps2(ctx, S, EX.e3);
      else Q42.card(ctx, S, [{ t: 'E = ' + Q31.sci(Em, 3, 'N/C'), mono: 1, c: '#16a34a', w: 900 }, { t: 'البعد عن q₁: r = ' + r1.toFixed(2) + ' m', c: '#334155', w: 800 }, { t: 'نحسب مجال كل شحنة ثم نجمعها اتجاهياً', c: '#0f766e', w: 800 }, { t: 'المماس لخط القوة = اتجاه المجال', c: '#7c3aed', w: 800 }, { t: 'الخطوط لا تتقاطع وتتنافر', c: '#ea580c', w: 800 }], { title: 'المجال — ' + CF[S.cf][0], y: 70, wd: 300 });
      Q42.banner(ctx, w, 'اسحب شحنة الاختبار q′ أو الشحنات');
    },
    set(S, k) { S.cf = k; S.cs = null; S.tp = null; S._lk = null; },
    chips(S, g) { return { c: Q42.chips(S, 'cf', Object.keys(CF).map(k => [k, CF[k][0]]), g.h - 128, S.cf, (S2, k) => { D.set(S2, k); S2.ex = ''; }, { bw: 150 }),
      e: Q49.exChips(S, 'ex', [['e3', 'مثال 3 ص 168']], g.h - 84, S.ex, (S2, k) => { D.set(S2, 'lik'); setParam(S2, 'q', 1); S2.ex = k; S2.k = 0; }, () => EX.e3.lines.length, { bw: 190 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S); D.init(S, g); const C = D.chips(S, g), lim = (x, y) => [clamp(x, g.L + 20, S.W - 20), clamp(y, 60, S.H - 170)];
      const L = [{ id: 'tp', x: S.tp[0], y: S.tp[1], r: 22, axis: 'xy', keep: true, tip: 'اسحب شحنة الاختبار', idle: 'اسحب q′ ✋', drag: (S2, d) => { S2.tp = lim(d.ox + d.x - d.sx, d.oy + d.y - d.sy); } }];
      S.cs.forEach((c, i) => L.push({ id: 'c' + i, x: c[0], y: c[1], r: 22, axis: 'xy', keep: true, hint: false, tip: 'اسحب الشحنة', drag: (S2, d) => { S2.cs[i] = lim(d.ox + d.x - d.sx, d.oy + d.y - d.sy); } }));
      return L.concat(C.c, C.e); },
    readings(S) { if (!S.tp || !S.cs) return []; const E = D.E(S, S.tp[0], S.tp[1]); return [rd('المجال E', Q31.sci(Math.hypot(E[0], E[1]), 3, 'N/C')), rd('القوة على 1 μC', Q31.sci(Math.hypot(E[0], E[1]) * 1e-6, 3, 'N'))]; },
    record(S) { if (!S.tp) return {}; const E = D.E(S, S.tp[0], S.tp[1]); return { r: (Math.hypot(S.tp[0] - S.cs[0][0], S.tp[1] - S.cs[0][1]) / PXM).toFixed(2), e: Q31.sci(Math.hypot(E[0], E[1]), 3) }; },
    cols: [['r', 'r عن q₁ (m)'], ['e', 'E (N/C)']],
    explain(S) { return Q26.ex('سهم المجال على شحنة الاختبار يبتعد عن الموجبة ويتجه نحو السالبة ويقع دائماً على المماس لخط القوة.', 'المجال كمية متجهة: نحسب مجال كل شحنة E = Kq/r² ثم نجمعها اتجاهياً. والخطوط لا تتقاطع لأن للمجال في كل نقطة اتجاهاً واحداً فقط.', 'برادة الحديد أو بذور الحشائش في الزيت تصطف على خطوط المجال فتظهرها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — المجال المنتظم بين لوحين متوازيين (الشكل 9-9 + مثال 1 ص 166 + مثال 2 ص 170) =============== */
(() => {
  const EX = { e1: { t: 'مثال 1 ص 166', q: 'صفيحتان متوازيتان مشحونتان. وضعت شحنة 2×10⁻⁶ C عند النقطة a فتأثرت بقوة 6×10⁻⁴ N باتجاه خطوط المجال. 1) ما نوعها؟ 2) احسب E عند a. 3) ما القوة عند b؟', lines: ['القوة باتجاه المجال ⟸ الشحنة موجبة', 'E = F / q′ = 6×10⁻⁴ / 2×10⁻⁶', 'E = 3×10² N/C', 'المجال منتظم ⟸ القوة نفسها عند b', 'باتجاه E: F = 6×10⁻⁴ N'] },
    e2: { t: 'مثال 2 ص 170', q: 'شحنة +2×10⁻⁶ C وضعت في مجال منتظم فتأثرت بقوة 8×10⁻² N. ما مقدار المجال؟', lines: ['E = F / q′', 'E = 8×10⁻² / 2×10⁻⁶', 'E = 4×10⁴ N/C'] } };
  const D = { id: 'g10_e_unif', page: 165, fig: 'الشكل 9-9',
    desc: 'المجال المنتظم: ثابت المقدار والاتجاه عند كل نقطة، وخطوطه متوازية منتظمة الكثافة. نحصل عليه بشحن لوحين متوازيين واسعين بشحنتين متساويتين مختلفتين بالنوع (بإهمال تأثير الحافات المقوسة). فالقوة على شحنة الاختبار هي نفسها في كل نقطة بين اللوحين.',
    tags: 'المجال المنتظم لوحان متوازيان بطارية خطوط متوازية الحافات المقوسة مثال 1 300N/C مثال 2 4×10⁴ E=F/q',
    tools: ['لوحان معدنيان متوازيان', 'بطارية', 'شحنة اختبار'],
    steps: ['غيّر جهد البطارية والبعد بين اللوحين من اللوحة ولاحظ كثافة الخطوط.', 'اسحب شحنة الاختبار إلى أي نقطة بين اللوحين: سهم القوة لا يتغير (مجال منتظم).', 'اجعل شحنة الاختبار سالبة: تنعكس القوة عكس اتجاه المجال.', 'اختر مثال 1 أو مثال 2 واكشف الحل خطوة خطوة.'],
    concl: ['بين لوحين متوازيين مشحونين المجال منتظم: ثابت المقدار والاتجاه.', 'القوة على شحنة معينة ثابتة المقدار والاتجاه في المجال المنتظم.', 'الشحنة الموجبة تتأثر بقوة باتجاه المجال والسالبة بعكسه.', 'مثال 1: E = 300 N/C. مثال 2: E = 4×10⁴ N/C.'],
    laws: ['g10_el_E', 'g10_el_grad'],
    controls: [R('V', 'فرق جهد البطارية', 0, 6000, 30, 1, 'V'), R('d', 'البعد بين اللوحين', 4, 20, 10, 1, 'cm'), R('qt', 'شحنة الاختبار q′', -4, 4, 2, 1, 'μC'), TG('ln', 'خطوط المجال', true, null, 'efield')],
    setup(S) { S.tp = null; S.ex = ''; S.k = 0; S.gv = null; },
    geo(S, gp) { const w = S.W, h = S.H, L = Q42.L(S), yc = h * .44, gap = (gp == null ? S.p.d : gp) * 13; return { w, h, L, x0: L + 110, x1: L + 400, yc, yt: yc - gap / 2, yb: yc + gap / 2 }; },
    update(S, dt) { S.gv = S.gv == null ? S.p.d : Q49.ez(S.gv, S.p.d, dt, 6); },
    draw(ctx, w, h, S) {
      const g = D.geo(S, S.gv), p = S.p, E = p.V / (p.d / 100), F = E * p.qt * 1e-6; Q49.bg(ctx, w, h); if (!S.tp) S.tp = [(g.x0 + g.x1) / 2 - 40, g.yc];
      const tp = [clamp(S.tp[0], g.x0 + 12, g.x1 - 12), clamp(S.tp[1], g.yt + 16, g.yb - 16)];
      if (p.ln !== false && p.V > 0) { const n = clamp(Math.round(3 + Math.log10(E + 1) * 2.4), 3, 16), sp = (g.x1 - g.x0) / n; for (let i = 0; i <= n; i++) { const x = g.x0 + i * sp; const edge = i === 0 || i === n; if (edge) { const bend = (i ? 1 : -1) * 18; K.raw(ctx, () => { ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x, g.yb); ctx.quadraticCurveTo(x + bend, g.yc, x, g.yt); ctx.stroke(); }); } else { Q41.line(ctx, [[x, g.yb], [x, g.yt]], '#ea580c', 1.6); Q26.head(ctx, x, g.yc + 4, -Math.PI / 2, '#ea580c', 7); } } }
      const ns = clamp(Math.round(Math.log10(p.V + 1) * 3), 0, 12); Q49.plate(ctx, g.x0 - 10, g.yt - 12, g.x1 - g.x0 + 20, 12, -1, ns, 't'); Q49.plate(ctx, g.x0 - 10, g.yb, g.x1 - g.x0 + 20, 12, 1, ns, 'b');
      // battery and wires
      const bx = g.x0 - 50; Q49.wire(ctx, [[g.x0, g.yt - 12], [g.x0, g.yt - 40], [bx, g.yt - 40], [bx, g.yc - 18]]); Q49.wire(ctx, [[g.x0, g.yb + 12], [g.x0, g.yb + 40], [bx, g.yb + 40], [bx, g.yc + 18]]);
      K.raw(ctx, () => { ctx.save(); ctx.translate(bx, g.yc); ctx.rotate(-Math.PI / 2); ctx.restore(); }); Q49.battery(ctx, bx, g.yc, ''); Q42.T(ctx, p.V + ' V', bx, g.yc + 34, { s: 10.5, w: 900, c: '#a16207' });
      Q42.T(ctx, 'd = ' + p.d + ' cm', g.x1 + 40, g.yc, { s: 11, w: 900, c: '#7c3aed' }); Q41.line(ctx, [[g.x1 + 14, g.yt], [g.x1 + 14, g.yb]], '#7c3aed', 1.5);
      Q42.T(ctx, 'a', g.x0 + 60, g.yc - 20, { s: 12, w: 900, c: '#334155' }); Q41.dot(ctx, g.x0 + 60, g.yc - 6, '#334155', 3.5); Q42.T(ctx, 'b', g.x1 - 60, g.yc + 30, { s: 12, w: 900, c: '#334155' }); Q41.dot(ctx, g.x1 - 60, g.yc + 16, '#334155', 3.5);
      Q31.ball(ctx, tp[0], tp[1], 10, Math.sign(p.qt)); if (F) Q49.farrow(ctx, tp[0], tp[1] + (F > 0 ? -11 : 11), 0, F > 0 ? -1 : 1, F, 1e-5, '#16a34a', 'F', 80);
      const C = Q49.exChips(S, 'ex', [['e1', 'مثال 1 ص 166'], ['e2', 'مثال 2 ص 170']], h - 84, S.ex, D.sel, S2 => EX[S2.ex].lines.length, { bw: 150 }); Q42.drawChips(ctx, C);
      if (S.ex) Q49.steps2(ctx, S, EX[S.ex]);
      else Q42.card(ctx, S, [{ t: 'E = V / d = ' + p.V + ' / ' + (p.d / 100) + ' = ' + Q31.sci(E, 3, 'N/C'), mono: 1, c: '#ea580c', w: 900 }, { t: 'F = q′ E = ' + Q31.sci(Math.abs(F), 3, 'N'), mono: 1, c: '#16a34a', w: 900 }, { t: F >= 0 ? 'الشحنة موجبة: القوة باتجاه المجال' : 'الشحنة سالبة: القوة بعكس المجال', c: '#334155', w: 800 }, { t: 'القوة نفسها في كل نقطة بين اللوحين', c: '#0f766e', w: 900 }], { title: 'المجال المنتظم', y: 70, wd: 300 });
      Q42.banner(ctx, w, 'اسحب شحنة الاختبار بين اللوحين');
    },
    sel(S2, k) { S2.ex = k; S2.k = 0; setParam(S2, 'd', 10); setParam(S2, 'qt', 2); setParam(S2, 'V', k === 'e1' ? 30 : 4000); },
    drags(S) { if (!S.W) return []; const g = D.geo(S, S.gv); if (!S.tp) S.tp = [(g.x0 + g.x1) / 2 - 40, g.yc];
      return [{ id: 'tp', x: clamp(S.tp[0], g.x0 + 12, g.x1 - 12), y: clamp(S.tp[1], g.yt + 16, g.yb - 16), r: 22, axis: 'xy', keep: true, tip: 'اسحب شحنة الاختبار', idle: 'اسحب ✋', drag: (S2, d) => { S2.tp = [clamp(d.ox + d.x - d.sx, g.x0 + 12, g.x1 - 12), clamp(d.oy + d.y - d.sy, g.yt + 16, g.yb - 16)]; } }].concat(Q49.exChips(S, 'ex', [['e1', 'مثال 1 ص 166'], ['e2', 'مثال 2 ص 170']], S.H - 84, S.ex, D.sel, S2 => EX[S2.ex].lines.length, { bw: 150 })); },
    readings(S) { const E = S.p.V / (S.p.d / 100); return [rd('المجال E', Q31.sci(E, 3, 'N/C')), rd('القوة F', Q31.sci(Math.abs(E * S.p.qt * 1e-6), 3, 'N'))]; },
    record(S) { const E = S.p.V / (S.p.d / 100); return { v: S.p.V, d: S.p.d, e: Q31.sci(E, 3), f: Q31.sci(E * S.p.qt * 1e-6, 3) }; },
    cols: [['v', 'V'], ['d', 'd (cm)'], ['e', 'E (N/C)'], ['f', 'F (N)']],
    explain(S) { return Q26.ex('خطوط المجال بين اللوحين متوازية ومتساوية الأبعاد، والقوة على شحنة الاختبار لا تتغير أينما وضعناها بينهما.', 'اللوحان الواسعان المشحونان بشحنتين متساويتين مختلفتين يولدان مجالاً ثابت المقدار والاتجاه، ويتقوس قليلاً عند الحافات فقط.', 'شاشات الأجهزة القديمة وأجهزة تسريع الجسيمات تستعمل مجالاً منتظماً لتوجيه الإلكترونات.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D3 — المجال غير المنتظم حول كرة موصلة مشحونة: صفر في داخلها (الشكل 10-9 + مثال 2 ص 167) =============== */
(() => {
  const RP = 46, KD = 120; // sphere radius px, px per decade outside
  const EX = { e2: { t: 'مثال 2 ص 167', q: 'كرة موصلة شحنتها 100 pC ونصف قطرها 1 cm. احسب المجال: 1) على بعد 50 cm من مركزها 2) على سطحها 3) داخلها', lines: ['q = 100×10⁻¹² = 10⁻¹⁰ C', 'E = K q / r² = 9×10⁹ × 10⁻¹⁰ / 0.5²', 'E = 3.6 N/C', 'على السطح: E = 9×10⁹ × 10⁻¹⁰ / 0.01²', 'E = 9000 N/C', 'داخل الكرة: E = 0', 'لأن الشحنات على سطحها الخارجي'] } };
  const D = { id: 'g10_e_sph', page: 166, fig: 'الشكل 10-9 + مثال 2 ص 167',
    desc: 'المجال غير المنتظم يتغير مقداره من نقطة إلى أخرى، مثل مجال شحنة نقطية أو كرة موصلة مشحونة: يقل كلما ابتعدنا عنها لنقصان كثافة خطوط القوة. خارج الكرة E = K q / r² كأن شحنتها مركزة في مركزها، وداخل الكرة الموصلة المجال صفر لأنها خالية من الشحنات.',
    tags: 'المجال غير المنتظم كرة موصلة مشحونة داخل الكرة صفر سطح الكرة مثال 2 3.6N/C 9000N/C 100pC الشكل 10-9',
    tools: ['كرة موصلة مشحونة على حامل عازل', 'مجس للمجال'],
    steps: ['اسحب المجس الأخضر مبتعداً عن الكرة ومقترباً منها، وراقب المنحني: المجال يقل بسرعة مع البعد.', 'أدخل المجس داخل الكرة: المجال صفر.', 'غيّر الشحنة ونصف القطر من اللوحة.', 'اضغط مثال 2 واكشف الحل ثم ضع المجس عند 50 cm وعند السطح وفي الداخل.'],
    concl: ['خارج الكرة: E = K q / r² يقل مع مربع البعد (مجال غير منتظم).', 'أكبر قيمة للمجال على السطح: E = K q / R².', 'داخل الكرة الموصلة المشحونة المعزولة المجال صفر.', 'مثال 2: 3.6 N/C ، 9000 N/C ، صفر.'],
    laws: ['g10_el_E'],
    controls: [R('q', 'شحنة الكرة', 10, 500, 100, 10, 'pC'), R('R', 'نصف قطر الكرة', .5, 5, 1, .5, 'cm'), R('rp', 'بعد المجس عن المركز', 0, 60, 50, .1, 'cm'), TG('ln', 'خطوط المجال', true, null, 'efield')],
    setup(S) { S.ex = ''; S.k = 0; S.rv = null; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 90, cy: 250, gx: L + 60, gy: 410, gw: 360, gh: Math.max(140, h - 410 - 210) }; },
    rho(S, r) { const R = S.p.R; return r <= R ? r / R * RP : RP + KD * Math.log10(r / R); },
    inv(S, px) { const R = S.p.R; return px <= RP ? px / RP * R : R * Math.pow(10, (px - RP) / KD); },
    E(S, r) { return r < S.p.R ? 0 : 9e9 * S.p.q * 1e-12 / Math.pow(r / 100, 2); },
    update(S, dt) { S.rv = S.rv == null ? S.p.rp : Q49.ez(S.rv, S.p.rp, dt, 8); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, r = S.rv == null ? p.rp : S.rv, E = D.E(S, r), pr = D.rho(S, r); Q49.bg(ctx, w, h);
      if (p.ln !== false) { const n = clamp(Math.round(8 + p.q / 30), 8, 22); for (let i = 0; i < n; i++) { const a = i / n * TAU; const L = 380; K.force(ctx, g.cx + Math.cos(a) * RP, g.cy + Math.sin(a) * RP, Math.cos(a) * 110, Math.sin(a) * 110, '', 'rgba(234,88,12,.75)', 1.6); Q41.line(ctx, [[g.cx + Math.cos(a) * (RP + 110), g.cy + Math.sin(a) * (RP + 110)], [g.cx + Math.cos(a) * L, g.cy + Math.sin(a) * L]], 'rgba(234,88,12,.35)', 1.2); } }
      Q31.sphere(ctx, g.cx, g.cy, RP, g.cy + 130); for (let i = 0; i < 14; i++) { const a = i / 14 * TAU; Q31.sg(ctx, g.cx + Math.cos(a) * (RP - 7), g.cy + Math.sin(a) * (RP - 7), 1, 4.5); }
      // log ruler
      const ry = g.cy + RP + 26; Q41.line(ctx, [[g.cx, ry], [g.cx + D.rho(S, 60), ry]], '#334155', 1.5); [.5, 1, 2, 5, 10, 20, 50].filter(v => v <= 60).forEach(v => { const x = g.cx + D.rho(S, v); Q41.line(ctx, [[x, ry - 5], [x, ry + 5]], '#334155', 1.3); Q42.T(ctx, String(v), x, ry + 14, { s: 9.5, w: 800, c: '#334155' }); }); Q42.T(ctx, 'cm', g.cx + D.rho(S, 60) + 18, ry + 14, { s: 9.5, w: 800, c: '#334155' });
      Q42.T(ctx, 'مقياس لوغاريتمي خارج الكرة', g.cx + 150, ry + 32, { s: 10, w: 800, c: '#64748b' });
      // probe
      const px = g.cx + pr, py = g.cy; K.raw(ctx, () => { ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(px, py, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); });
      if (E > 0) Q49.farrow(ctx, px + 9, py, 1, 0, E, 1, '#16a34a', 'E', 90); Q42.T(ctx, 'r = ' + r.toFixed(1) + ' cm', px, py - 22, { s: 10.5, w: 900, c: '#16a34a' });
      // E–r graph (log y)
      const Emax = D.E(S, p.R), lmin = Math.floor(Math.log10(D.E(S, 60))) , lmax = Math.ceil(Math.log10(Emax)), Y = v => g.gy + g.gh - (v <= 0 ? 0 : (Math.log10(v) - lmin) / (lmax - lmin) * g.gh), X = rr2 => g.gx + D.rho(S, rr2) / D.rho(S, 60) * g.gw;
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, g.gx - 40, g.gy - 22, g.gw + 70, g.gh + 52, 8); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(g.gx, g.gy - 6); ctx.lineTo(g.gx, g.gy + g.gh); ctx.lineTo(g.gx + g.gw + 8, g.gy + g.gh); ctx.stroke(); });
      for (let l = lmin; l <= lmax; l++) Q42.T(ctx, '10' + Q31.sup(l), g.gx - 20, Y(Math.pow(10, l)), { s: 9.5, w: 800, c: '#334155' });
      const pts = [[X(0), Y(0)], [X(p.R), Y(0)]]; Q41.line(ctx, pts, '#0f766e', 2.6); const p2 = []; for (let i = 0; i <= 100; i++) { const rr2 = p.R * Math.pow(60 / p.R, i / 100); p2.push([X(rr2), Y(D.E(S, rr2))]); } Q41.line(ctx, [[X(p.R), Y(0)], [X(p.R), Y(Emax)]], '#0f766e', 1.2, [4, 3]); Q41.line(ctx, p2, '#0f766e', 2.6);
      Q41.dot(ctx, X(Math.max(r, 0)), Y(E), '#dc2626', 6); Q42.T(ctx, 'E (N/C)', g.gx + 30, g.gy - 10, { s: 10, w: 800, c: '#0f172a' }); Q42.T(ctx, 'r', g.gx + g.gw, g.gy + g.gh + 14, { s: 10, w: 800, c: '#0f172a' }); Q42.T(ctx, 'داخل: صفر', X(p.R / 2) + 24, Y(0) - 12, { s: 9.5, w: 800, c: '#0f766e' });
      const C = Q49.exChips(S, 'ex', [['e2', 'مثال 2 ص 167']], h - 84, S.ex, D.sel, () => EX.e2.lines.length, { bw: 160 }); Q42.drawChips(ctx, C);
      if (S.ex) Q49.steps2(ctx, S, EX.e2);
      else Q42.card(ctx, S, [{ t: r < p.R ? 'المجس داخل الكرة: E = 0' : 'E = K q / r²', c: '#0f766e', w: 900 }, { t: 'E = ' + Q31.sci(E, 3, 'N/C'), mono: 1, c: '#16a34a', w: 900 }, { t: 'على السطح E = ' + Q31.sci(Emax, 3, 'N/C'), c: '#b91c1c', w: 800 }, { t: 'المجال يقل كلما ابتعدنا لنقصان كثافة الخطوط', c: '#334155' }], { title: 'مجال كرة موصلة', y: 70, wd: 300 });
      Q42.banner(ctx, w, 'اسحب المجس الأخضر نحو الكرة وداخلها');
    },
    sel(S2, k) { S2.ex = k; S2.k = 0; setParam(S2, 'q', 100); setParam(S2, 'R', 1); setParam(S2, 'rp', 50); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), r = S.rv == null ? S.p.rp : S.rv;
      return [{ id: 'probe', x: g.cx + D.rho(S, r), y: g.cy, r: 20, axis: 'x', keep: true, tip: 'اسحب المجس', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'rp', +clamp(D.inv(S2, d.x - g.cx), 0, 60).toFixed(1)); } }].concat(Q49.exChips(S, 'ex', [['e2', 'مثال 2 ص 167']], S.H - 84, S.ex, D.sel, () => EX.e2.lines.length, { bw: 160 })); },
    readings(S) { return [rd('بعد المجس', S.p.rp + ' cm'), rd('المجال E', Q31.sci(D.E(S, S.p.rp), 3, 'N/C')), rd('E على السطح', Q31.sci(D.E(S, S.p.R), 3, 'N/C'))]; },
    record(S) { return { r: S.p.rp, e: Q31.sci(D.E(S, S.p.rp), 3) }; },
    cols: [['r', 'r (cm)'], ['e', 'E (N/C)']],
    explain(S) { return Q26.ex('المجال أكبر ما يمكن على سطح الكرة ويقل بسرعة مع البعد، وداخل الكرة صفر تماماً.', 'خارج الكرة تتصرف شحنتها كأنها مركزة في مركزها E = Kq/r²، أما داخلها فلا توجد شحنات لأن الشحنات تستقر على السطح الخارجي.', 'الأجهزة الحساسة توضع داخل صناديق معدنية لحمايتها من المجالات الكهربائية الخارجية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D4 — الفيض الكهربائي Φ = E⊥ A (الشكل 11-9 a–e + مثال 1 ص 170) =============== */
(() => {
  const CS = { a: ['مجال عمودي a', 3, .4, 0], b: ['خطوط أكثر b', 7, .4, 0], c: ['مساحة أكبر c', 3, 1, 0], d: ['سطح مائل d', 3, .4, 55], e: ['سطح موازٍ e', 3, .4, 90] };
  const EX = { e1: { t: 'مثال 1 ص 170', q: 'احسب الفيض الكهربائي خلال كرة موصلة مشحونة معزولة نصف قطرها 1 m وعلى سطحها شحنة +1 μC', lines: ['E = K q / r² = 9×10⁹ × 1×10⁻⁶ / 1²', 'على سطح الكرة: E = 9×10³ N/C', 'Φ = E A = E × 4π r²', 'Φ = 9×10³ × 4 × 3.14 × 1²', 'Φ = 1.13×10⁵ N.m²/C'] } };
  const D = { id: 'g10_e_flux', page: 169, fig: 'الشكل 11-9 (a–e)',
    desc: 'الفيض الكهربائي Φ: عدد خطوط القوة الكهربائية التي تقطع السطح عمودياً. يزداد بزيادة عدد خطوط القوة (المجال) وبزيادة مساحة السطح المخترق، ويقل إذا كان السطح غير عمودي على المجال، ويساوي صفراً إذا كان السطح يوازي المجال: Φ = E⊥ A.',
    tags: 'الفيض الكهربائي Φ=EA عدد خطوط القوة مساحة السطح سطح مائل موازٍ N.m2/C الشكل 11-9 مثال 1 1.13×10⁵',
    tools: ['إطار مربع يمثل السطح A', 'مجال كهربائي منتظم'],
    steps: ['اختر الحالات a إلى e من الأزرار كما في الشكل 11-9.', 'اسحب مقبض الإطار الأزرق يميناً ويساراً لتدويره: عدّ الخطوط البرتقالية التي تخترقه.', 'غيّر المجال والمساحة والزاوية من اللوحة ولاحظ Φ.', 'اضغط مثال 1 لحساب الفيض خلال كرة.'],
    concl: ['Φ = E⊥ × A ووحدته N.m²/C.', 'يزداد الفيض بزيادة المجال (عدد الخطوط) وبزيادة المساحة.', 'يقل الفيض إذا مال السطح، ويساوي صفراً إذا وازى السطح المجال.', 'مثال 1: Φ = 1.13×10⁵ N.m²/C.'],
    laws: ['g10_el_flux'],
    controls: [R('E', 'المجال E', 1, 9, 3, 1, '×10³ N/C'), R('A', 'مساحة السطح A', .1, 1, .4, .05, 'm²'), R('th', 'زاوية ميل السطح', 0, 90, 0, 1, '°')],
    setup(S) { S.cs = 'a'; S.tv = null; S.ex = ''; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, ox: L + 250, oy: Math.max(390, h * .5) }; },
    update(S, dt) { S.tv = S.tv == null ? S.p.th : Q49.ez(S.tv, S.p.th, dt, 6); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, th = (S.tv == null ? p.th : S.tv) * Math.PI / 180, a = Math.sqrt(p.A) * 200, sp = 64 / Math.sqrt(p.E), P = (x, y, z) => [g.ox + x + z * .5, g.oy - y + z * .3]; Q49.bg(ctx, w, h);
      const ux = -Math.sin(th), uz = Math.cos(th), co = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([s, t]) => P(s * a / 2 * ux, t * a / 2, s * a / 2 * uz));
      const lines = []; for (let y = -130 + (260 % sp) / 2; y <= 130; y += sp) for (let z = -110 + (220 % sp) / 2; z <= 110; z += sp) { const s = Math.abs(uz) > 1e-3 ? z / uz : 1e9, hit = Math.abs(y) < a / 2 && Math.abs(s) < a / 2 && th < Math.PI / 2 - .01; const xi = Math.abs(uz) > 1e-3 ? s * ux : 0; lines.push({ y, z, hit, xi }); }
      lines.sort((u, v) => u.z - v.z);
      lines.forEach(l => { const A0 = P(-160, l.y, l.z), A1 = P(160, l.y, l.z); Q41.line(ctx, [A0, A1], l.hit ? '#ea580c' : 'rgba(100,116,139,.55)', l.hit ? 2.2 : 1.3); Q26.head(ctx, A1[0], A1[1], 0, l.hit ? '#ea580c' : '#94a3b8', 7); });
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(59,130,246,.22)'; ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 3; ctx.beginPath(); co.forEach((c, i) => i ? ctx.lineTo(c[0], c[1]) : ctx.moveTo(c[0], c[1])); ctx.closePath(); ctx.fill(); ctx.stroke(); });
      lines.filter(l => l.hit).forEach(l => { const X = P(l.xi, l.y, l.z), A1 = P(160, l.y, l.z); Q41.line(ctx, [X, A1], '#ea580c', 2.2); Q41.dot(ctx, X[0], X[1], '#b91c1c', 3.2); });
      const nh = lines.filter(l => l.hit).length, Phi = p.E * 1e3 * p.A * Math.cos(th);
      const kn = P(a / 2 * ux * 1, a / 2 + 16, a / 2 * uz); Q41.knob(ctx, kn[0], kn[1], '#2563eb', 10); Q42.T(ctx, 'E', P(175, 0, 0)[0] + 10, P(175, 0, 0)[1], { s: 13, w: 900, c: '#ea580c' });
      // normal arrow
      const c0 = P(0, 0, 0); K.force(ctx, c0[0], c0[1], P(Math.cos(th) * 70, 0, Math.sin(th) * 70)[0] - c0[0], P(Math.cos(th) * 70, 0, Math.sin(th) * 70)[1] - c0[1], 'n', '#1d4ed8', 2.4);
      Q42.T(ctx, 'خطوط تخترق السطح: ' + nh, g.ox, g.oy + 170, { s: 12, w: 900, c: '#fff', bg: '#ea580c' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q42.drawChips(ctx, C.e);
      if (S.ex) Q49.steps2(ctx, S, EX.e1);
      else Q42.card(ctx, S, [{ t: 'Φ = E⊥ A = E A cos θ', mono: 1, c: '#0f766e', w: 900 }, { t: '= ' + p.E + '×10³ × ' + p.A + ' × cos ' + (th * 180 / Math.PI).toFixed(0) + '°', mono: 1 }, { t: 'Φ = ' + Q31.sci(Phi, 3, 'N.m²/C'), mono: 1, c: '#b91c1c', w: 900 }, { t: th > 1.55 ? 'السطح يوازي المجال: الفيض صفر' : th > .1 ? 'السطح مائل: الفيض أقل' : 'السطح عمودي: أكبر فيض', c: '#334155', w: 800 }], { title: 'الفيض الكهربائي', y: 70, wd: 300 });
      Q42.banner(ctx, w, 'اسحب المقبض الأزرق لتدوير السطح');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', Object.keys(CS).map(k => [k, CS[k][0]]), g.h - 128, S.cs, (S2, k) => { const c = CS[k]; S2.cs = k; S2.ex = ''; setParam(S2, 'E', c[1]); setParam(S2, 'A', c[2]); setParam(S2, 'th', c[3]); }, { bw: 125 }),
      e: Q49.exChips(S, 'ex', [['e1', 'مثال 1: فيض كرة']], g.h - 84, S.ex, (S2, k) => { S2.ex = k; S2.k = 0; }, () => EX.e1.lines.length, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), th = (S.tv == null ? S.p.th : S.tv) * Math.PI / 180, a = Math.sqrt(S.p.A) * 200, x = g.ox + a / 2 * -Math.sin(th) + a / 2 * Math.cos(th) * .5, y = g.oy - a / 2 - 16 + a / 2 * Math.cos(th) * .3, C = D.chips(S, g);
      return [{ id: 'rot', x, y, r: 20, axis: 'x', keep: true, tip: 'اسحب لتدوير السطح', idle: 'دوّر ✋', drag: (S2, d) => { setParam(S2, 'th', clamp(Math.round(S2.p.th - d.dx * .6), 0, 90)); } }].concat(C.c, C.e); },
    readings(S) { const Phi = S.p.E * 1e3 * S.p.A * Math.cos(S.p.th * Math.PI / 180); return [rd('E', S.p.E + '×10³ N/C'), rd('A', S.p.A + ' m²'), rd('θ', S.p.th + '°'), rd('الفيض Φ', Q31.sci(Phi, 3, 'N.m²/C'))]; },
    record(S) { return { e: S.p.E, a: S.p.A, t: S.p.th, f: Q31.sci(S.p.E * 1e3 * S.p.A * Math.cos(S.p.th * Math.PI / 180), 3) }; },
    cols: [['e', 'E ×10³'], ['a', 'A (m²)'], ['t', 'θ°'], ['f', 'Φ']],
    explain(S) { return Q26.ex('عدد الخطوط البرتقالية التي تخترق الإطار يزداد بزيادة المجال أو المساحة ويقل عند إمالة الإطار حتى ينعدم عندما يوازي المجال.', 'الفيض يقيس عدد خطوط القوة التي تقطع السطح عمودياً، فيعتمد على المركبة العمودية للمجال E⊥ = E cosθ وعلى المساحة.', 'الخلية الشمسية تلتقط أكبر طاقة عندما تكون عمودية على أشعة الشمس، بالفكرة نفسها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — الجهد الكهربائي وفرق الجهد والشغل + جهد الأرض (الأشكال 12-9 إلى 14-9 + المثالان 1 و 3 + المسألتان 5 و 6) =============== */
(() => {
  const CS = { e1: ['مثال 1', .05, 20, .05, .2, 1], e3: ['مثال 3', .01, .002, .3, .9, 1], p5: ['مسألة 5', .01, .001, .5, .9, 2], p6: ['مسألة 6', .01, 6, .9, 1.2, 5], free: ['جرّب بنفسك', .05, 2, .15, .45, 1] }; // R m, q μC, rA, rB, q′ μC
  const EX = { e1: { t: 'مثال 1 ص 176', q: 'كرة معدنية معزولة نصف قطرها 5 cm عليها شحنة 20 μC. جد الجهد: 1) على سطحها 2) على بعد 15 cm من سطحها', lines: ['V = K q / r', 'على السطح: V₁ = 9×10⁹ × 20×10⁻⁶ / 0.05', 'جهد جميع نقاطها: V₁ = 36×10⁵ V', 'البعد عن المركز: r = 0.05 + 0.15 = 0.2 m', 'V₂ = 9×10⁹ × 20×10⁻⁶ / 0.2', 'V₂ = 9×10⁵ V'] },
    e3: { t: 'مثال 3 ص 177', q: 'النقطة A تبعد 30 cm عن مركز كرة نصف قطرها 1 cm شحنتها 2×10⁻⁹ C ، والنقطة B تبعد 90 cm. احسب الشغل اللازم لنقل 1 μC من B إلى A', lines: ['V = K q / r', 'VA = 9×10⁹ × 2×10⁻⁹ / 0.3 = 60 V', 'VB = 9×10⁹ × 2×10⁻⁹ / 0.9 = 20 V', 'VAB = VA − VB = 60 − 20 = 40 V', 'W = q VAB = 1×10⁻⁶ × 40', 'W = 40×10⁻⁶ J'] },
    p5: { t: 'مسألة 5 ص 186', q: 'A تبعد 0.5 m عن مركز كرة شحنتها 1×10⁻³ μC و B تبعد 0.9 m. احسب الشغل اللازم لنقل 2 μC من B إلى A', lines: ['q = 1×10⁻³ μC = 1×10⁻⁹ C', 'VA = 9×10⁹ × 10⁻⁹ / 0.5 = 18 V', 'VB = 9×10⁹ × 10⁻⁹ / 0.9 = 10 V', 'VAB = 18 − 10 = 8 V', 'W = 2×10⁻⁶ × 8 = 16×10⁻⁶ J', 'الشغل الموجب طاقة منقولة إلى الشحنة'] },
    p6: { t: 'مسألة 6 ص 186', q: 'شحنة 6 μC على بعد 1.2 m من شحنة 5 μC في الفراغ. احسب الشغل لتحريك الثانية حتى تصبح على بعد 0.9 m من الأولى', lines: ['عند كل موضع: V = K q₁ / r', 'V₁ = 9×10⁹ × 6×10⁻⁶ / 1.2 = 45000 V', 'V₂ = 9×10⁹ × 6×10⁻⁶ / 0.9 = 60000 V', 'ΔV = 60000 − 45000 = 15000 V', 'W = q₂ ΔV = 5×10⁻⁶ × 15000', 'W = 0.075 J'] } };
  const D = { id: 'g10_e_pot', page: 171, fig: 'الأشكال 12-9 و 13-9 و 14-9',
    desc: 'الجهد الكهربائي: الطاقة الكامنة الكهربائية لوحدة الشحنة في نقطة داخل المجال، V = W / q ، كمية غير متجهة وحدتها الفولت. على بعد r من مركز كرة مشحونة V = K q / r. فرق الجهد بين نقطتين هو الشغل اللازم لنقل شحنة موجبة من إحداهما إلى الأخرى مقسوماً على مقدارها: W = q VAB. وجهد الأرض صفر لأنها خزان كبير للشحنات، فالموصل الموصول بالأرض يصبح جهده صفراً.',
    tags: 'الجهد الكهربائي فولت V=Kq/r فرق الجهد الشغل W=qV طاقة كامنة كهربائية جهد الأرض صفر تأريض مثال 1 36×10⁵ مثال 3 40×10⁻⁶J مسألة 5 مسألة 6 0.075J',
    tools: ['كرة معدنية مشحونة معزولة', 'شحنة اختبار موجبة', 'سلك تأريض'],
    steps: ['اختر مثالاً أو مسألة، أو «جرّب بنفسك».', 'اسحب العلامتين A و B على المحور، ولاحظ الجهد في كل منهما على منحني الجهد أسفلهما.', 'اضغط «انقل q′ من B إلى A»: تتحرك الشحنة بنعومة ويُحسب الشغل W = q′ (VA − VB).', 'فعّل «وصل الكرة بالأرض» من اللوحة: تنتقل الإلكترونات ويصبح جهد الكرة صفراً كجهد الأرض.'],
    concl: ['V = K q / r ، والجهد على سطح الكرة وفي داخلها ثابت = K q / R.', 'W = q VAB: الشغل لنقل الشحنة = الشحنة × فرق الجهد.', 'نقل شحنة موجبة نحو شحنة موجبة يحتاج شغلاً موجباً يتحول إلى طاقة كامنة.', 'جهد الأرض صفر، والموصل الموصول بها يصبح جهده صفراً.'],
    laws: ['g10_el_V', 'g10_el_W'],
    controls: [R('q', 'شحنة الكرة q', -20, 20, .002, .001, 'μC'), R('qt', 'الشحنة المنقولة q′', -5, 5, 1, .1, 'μC'), TG('gnd', 'وصل الكرة بالأرض', false, null, 'earth'), TG('fv', 'أسهم القوى على q′', true, null, 'force')],
    setup(S) { S.cs = 'e3'; S.Rm = .01; S.rA = .3; S.rB = .9; S.pos = .9; S.go = 0; S.qv = null; S.ex = ''; S.k = 0; S.gt = 0; S._fly = []; S.done = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 70, span = Math.min(380, w - L - 420), pxm = span / (1.08 * Math.max(S.rA, S.rB)); return { w, h, L, x0, ay: 230, span, pxm, gy: 300, gh: Math.max(150, h - 300 - 230) }; },
    V(S, r) { const q = (S.qv == null ? S.p.q : S.qv) * 1e-6; return 9e9 * q / Math.max(r, S.Rm); },
    set(S, k) { const c = CS[k]; S.cs = k; S.Rm = c[1]; S.rA = c[3]; S.rB = c[4]; S.pos = c[4]; S.go = 0; S.done = 0; setParam(S, 'gnd', false); setParam(S, 'q', c[2]); setParam(S, 'qt', c[5]); S.qv = c[2]; },
    update(S, dt) { if (S.qv == null) S.qv = S.p.q; if (S.p.gnd) { const dq = S.qv; S.qv = Q49.ez(S.qv, 0, dt, 2); S.gt += dt; if (Math.abs(dq) > .02 * Math.abs(S.p.q || 1) && S.gt > .12 && S.W) { S.gt = 0; const g = D.geo(S); if (dq > 0) Q31.fly(S, g.x0, g.ay + 150, g.x0, g.ay + 20, .5); else Q31.fly(S, g.x0, g.ay + 20, g.x0, g.ay + 150, .5); } } else S.qv = Q49.ez(S.qv, S.p.q, dt, 8);
      if (S.go) { S.pos = Q49.ez(S.pos, S.rA, dt, 1.6); if (Math.abs(S.pos - S.rA) < 1e-3 * S.rB) { S.pos = S.rA; S.go = 0; S.done = 1; } } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, X = r => g.x0 + r * g.pxm, rs = clamp(S.Rm * g.pxm, 10, 36), q = S.qv == null ? p.q : S.qv; Q49.bg(ctx, w, h);
      // axis
      Q41.line(ctx, [[g.x0, g.ay], [g.x0 + g.span + 10, g.ay]], '#94a3b8', 2); Q42.T(ctx, 'r (m)', g.x0 + g.span + 30, g.ay, { s: 10, w: 800, c: '#334155' });
      Q31.sphere(ctx, g.x0, g.ay, rs, g.ay + 56); const ns = Math.round(clamp(Math.abs(q) / (Math.abs(p.q) || 1), 0, 1) * 12); for (let i = 0; i < ns; i++) { const a = i / 12 * TAU; Q31.sg(ctx, g.x0 + Math.cos(a) * (rs - 5), g.ay + Math.sin(a) * (rs - 5), Math.sign(p.q), 4); }
      if (p.gnd) { Q49.wire(ctx, [[g.x0 - rs * .7, g.ay + rs * .7], [g.x0 - 40, g.ay + 60], [g.x0 - 40, g.ay + 150]], '#16a34a', 2.5); Q31.earth(ctx, g.x0 - 40, g.ay + 152, 1); Q42.T(ctx, 'جهد الأرض = صفر', g.x0 - 30, g.ay + 186, { s: 10.5, w: 900, c: '#fff', bg: '#15803d' }); }
      Q31.drawFly(ctx, S);
      [['A', S.rA, '#2563eb'], ['B', S.rB, '#7c3aed']].forEach(([n, r, c]) => { const x = X(r); Q41.line(ctx, [[x, g.ay - 30], [x, g.ay + 30]], c, 2); Q42.T(ctx, n, x, g.ay - 42, { s: 13, w: 900, c: '#fff', bg: c }); Q42.T(ctx, r + ' m', x, g.ay + 42, { s: 10, w: 800, c }); });
      // test charge + forces
      const tx = X(S.pos); Q31.ball(ctx, tx, g.ay - 0, 10, Math.sign(p.qt)); Q42.T(ctx, 'q′', tx, g.ay - 64, { s: 11, w: 900, c: '#a16207' });
      const Fe = 9e9 * q * 1e-6 * p.qt * 1e-6 / (S.pos * S.pos); if (p.fv !== false && Math.abs(Fe) > 0) { Q49.farrow(ctx, tx, g.ay + 18, Math.sign(Fe), 0, Fe, Math.abs(Fe) / 3, '#16a34a', 'F', 70); if (S.go && Fe > 0) Q49.farrow(ctx, tx, g.ay - 18, -1, 0, Fe, Math.abs(Fe) / 3, '#7c3aed', 'يد', 70); }
      // V–r graph aligned with axis
      const VR = Math.abs(D.V(S, Math.max(S.Rm, .45 * Math.min(S.rA, S.rB)))) || 1, ys = q >= 0 ? 1 : -1, gy0 = q >= 0 ? g.gy + g.gh : g.gy, Y = v => gy0 - v / VR * g.gh * ys * (q >= 0 ? 1 : -1) * (q >= 0 ? 1 : -1);
      const Yv = v => { v = clamp(v, -VR, VR); return q >= 0 ? g.gy + g.gh - v / VR * g.gh : g.gy - v / VR * g.gh; };
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; rr(ctx, g.x0 - 46, g.gy - 22, g.span + 76, g.gh + 46, 8); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(g.x0, g.gy - 6); ctx.lineTo(g.x0, g.gy + g.gh + 4); ctx.moveTo(g.x0, Yv(0)); ctx.lineTo(g.x0 + g.span + 8, Yv(0)); ctx.stroke(); });
      const pts = []; for (let i = 0; i <= 160; i++) { const r = g.span / g.pxm * i / 160; pts.push([X(r), Yv(D.V(S, r))]); } Q41.line(ctx, pts, '#0f766e', 2.6);
      const VA = D.V(S, S.rA), VB = D.V(S, S.rB); [[VA, S.rA, '#2563eb', 'VA'], [VB, S.rB, '#7c3aed', 'VB']].forEach(([v, r, c, n]) => { Q41.line(ctx, [[g.x0, Yv(v)], [X(r), Yv(v)], [X(r), Yv(0)]], c, 1.3, [4, 3]); Q41.dot(ctx, X(r), Yv(v), c, 5); Q42.T(ctx, n + ' = ' + Q31.sci(v, 3, 'V'), X(r) + 8, Yv(v) - 12, { s: 10, w: 900, c, a: 'left' }); });
      Q41.dot(ctx, tx, Yv(D.V(S, S.pos)), '#dc2626', 6); Q42.T(ctx, 'V (volt)', g.x0 + 8, g.gy - 10, { s: 10, w: 800, c: '#0f172a', a: 'left' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q42.drawChips(ctx, C.e);
      const W = p.qt * 1e-6 * (VA - VB), Wn = p.qt * 1e-6 * (D.V(S, S.pos) - VB);
      if (S.ex) Q49.steps2(ctx, S, EX[S.ex]);
      else Q42.card(ctx, S, [{ t: 'VA = K q / rA = ' + Q31.sci(VA, 3, 'V'), mono: 1, c: '#2563eb', w: 800 }, { t: 'VB = K q / rB = ' + Q31.sci(VB, 3, 'V'), mono: 1, c: '#7c3aed', w: 800 }, { t: 'VAB = VA − VB = ' + Q31.sci(VA - VB, 3, 'V'), mono: 1, w: 900 }, { t: 'W = q′ VAB = ' + Q31.sci(W, 3, 'J'), mono: 1, c: '#b91c1c', w: 900 }, { t: 'الشغل المنجز حتى الآن: ' + Q31.sci(Wn, 3, 'J'), c: '#334155', w: 800 }], { title: 'الجهد وفرق الجهد — ' + CS[S.cs][0], y: 70, wd: 310 });
      Q42.banner(ctx, w, 'اسحب A و B ثم انقل q′ من B إلى A');
    },
    chips(S, g) { return { c: Q42.chips(S, 'cs', Object.keys(CS).map(k => [k, CS[k][0]]).concat([['mv', 'انقل الشحنة إلى A']]), g.h - 128, S.cs, (S2, k) => { if (k === 'mv') { if (S2.done || S2.pos !== S2.rB) { S2.pos = S2.rB; S2.done = 0; } S2.go = 1; } else { D.set(S2, k); S2.ex = ''; } }, { bw: 115 }),
      e: Q49.exChips(S, 'ex', [['e1', 'حل مثال 1'], ['e3', 'حل مثال 3'], ['p5', 'حل مسألة 5'], ['p6', 'حل مسألة 6']], g.h - 84, S.ex, (S2, k) => { D.set(S2, k); S2.ex = k; S2.k = 0; }, S2 => EX[S2.ex].lines.length, { bw: 115 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), mk = (id, k, first) => Object.assign({ id, x: g.x0 + S[k] * g.pxm, y: g.ay - 42, r: 20, axis: 'x', keep: true, tip: 'اسحب النقطة على المحور', drag: (S2, d) => { const r = +clamp((d.x - g.x0) / g.pxm, S2.Rm, g.span / g.pxm).toFixed(3); S2[k] = r; if (k === 'rB' && !S2.go) S2.pos = r; S2.done = 0; } }, first ? { idle: 'اسحب ✋' } : { hint: false });
      return [mk('A', 'rA', 1), mk('B', 'rB', 0)].concat(C.c, C.e); },
    readings(S) { const VA = D.V(S, S.rA), VB = D.V(S, S.rB); return [rd('VA', Q31.sci(VA, 3, 'V')), rd('VB', Q31.sci(VB, 3, 'V')), rd('VAB', Q31.sci(VA - VB, 3, 'V')), rd('W = q′ VAB', Q31.sci(S.p.qt * 1e-6 * (VA - VB), 3, 'J'))]; },
    record(S) { const VA = D.V(S, S.rA), VB = D.V(S, S.rB); return { a: S.rA, b: S.rB, va: Q31.sci(VA, 3), vb: Q31.sci(VB, 3), w: Q31.sci(S.p.qt * 1e-6 * (VA - VB), 3) }; },
    cols: [['a', 'rA (m)'], ['b', 'rB (m)'], ['va', 'VA (V)'], ['vb', 'VB (V)'], ['w', 'W (J)']],
    explain(S) { return Q26.ex('الجهد يزداد كلما اقتربنا من الكرة الموجبة، ونقل شحنة موجبة نحوها يحتاج شغلاً يساوي q′ × فرق الجهد. وعند التأريض يهبط جهد الكرة إلى الصفر.', 'الشغل المبذول ضد قوة التنافر يُخزن طاقة كامنة كهربائية، والجهد هو هذه الطاقة لكل وحدة شحنة. والأرض خزان هائل للشحنات فلا يتغير جهدها.', 'تأريض الأجهزة الكهربائية يحمينا لأن هيكلها يبقى بجهد الأرض الصفري.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — سطوح تساوي الجهد وانحدار الجهد E = V / x (الأشكال 15-9 و 16-9 + مثال 2 ص 176 + مسألة 4) =============== */
(() => {
  const PXM = 400;
  const SC = { pt: ['شحنة نقطية 16-a'], pl: ['لوحان 16-b'], dip: ['شحنتان 15-9'], tip: ['جسم مدبب'], e2: ['مثال 2'], p4: ['مسألة 4'] };
  const PL = { pl: [12, 0, .1, 'm'], e2: [3, -5, 4, 'm'], p4: [10, -2, .004, 'm'] }; // V top, V bottom, d (m)
  const EX = { e2: { t: 'مثال 2 ص 176', q: 'سطحان متوازيان من سطوح تساوي الجهد جهد أحدهما −5 V والآخر +3 V والبعد بينهما 4 m. احسب المجال بينهما', lines: ['المجال منتظم: خطوطه متوازية وعمودية على السطحين', 'المجال = انحدار الجهد', 'E = ΔV / x', 'E = (3 + 5) / 4', 'E = 8 / 4 = 2 V/m'] },
    p4: { t: 'مسألة 4 ص 186', q: 'سطحان متوازيان من سطوح تساوي الجهد، جهد a فيه 10 V وجهد b فيه −2 V والبعد بينهما 4 mm. احسب المجال', lines: ['E = ΔV / x', 'E = (10 + 2) / 4×10⁻³', 'E = 12 / 0.004', 'E = 3000 V/m = 3000 N/C'] } };
  const D = { id: 'g10_e_equi', page: 175, fig: 'الأشكال 15-9 و 16-9',
    desc: 'سطح تساوي الجهد: جميع نقاطه بنفس قيمة الجهد، ففرق الجهد بين أي نقطتين منه صفر. خواصه: لا تتقاطع، وخطوط القوة عمودية عليها، وتتقارب حيث يكون المجال كبيراً كما عند النهايات المدببة. حول الشحنة النقطية كروية متحدة المركز، وبين لوحين متوازيين مستوية متوازية. وفي المجال المنتظم E = VAB / x ويسمى انحدار الجهد ويقاس بـ V/m، والمجال يتجه دائماً نحو الجهد الواطئ.',
    tags: 'سطوح تساوي الجهد انحدار الجهد E=V/x V/m خطوط القوة عمودية لا تتقاطع تتقارب الرؤوس المدببة مثال 2 2V/m مسألة 4 3000 فولتميتر مجس',
    tools: ['فولتميتر بمجسين', 'شحنة نقطية', 'لوحان متوازيان', 'جسم مدبب مشحون'],
    steps: ['اختر نوع المجال من الأزرار. الخطوط المتقطعة سطوح تساوي الجهد والمستمرة خطوط القوة.', 'اسحب المجسين الأحمر والأسود: إذا وضعتهما على السطح المتقطع نفسه يقرأ الفولتميتر صفراً.', 'في اللوحين: ضع المجسين على خط مجال واحد واقرأ E = ΔV / x ، وحرّكهما في أي مكان: E ثابت.', 'في الجسم المدبب لاحظ تقارب السطوح عند الرأس. ثم حل مثال 2 ومسألة 4.'],
    concl: ['سطوح تساوي الجهد لا تتقاطع وخطوط القوة عمودية عليها.', 'تتقارب السطوح حيث المجال كبير، كعند الرؤوس المدببة.', 'E = VAB / x ويقاس بـ V/m ، والمجال يتجه نحو الجهد الواطئ.', 'مثال 2: E = 2 V/m. مسألة 4: E = 3000 N/C.'],
    laws: ['g10_el_grad', 'g10_el_V'],
    controls: [R('q', 'مقدار الشحنة', 1, 5, 2, 1, 'nC'), TG('eq', 'سطوح تساوي الجهد', true, null, 'line'), TG('ln', 'خطوط القوة', true, null, 'efield')],
    setup(S) { S.sc = 'pt'; S.p1 = null; S.p2 = null; S.ex = ''; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 200, cy: h * .42, px0: L + 50, px1: L + 330, pt: h * .42 - 140, pb: h * .42 + 140, b: { x0: L, y0: 44, x1: w - 10, y1: h - 150 } }; },
    plates(S) { return PL[S.sc]; },
    chs(S, g) { const q = S.p.q; if (S.sc === 'pt') return [{ x: g.cx, y: g.cy, q }]; if (S.sc === 'dip') return [{ x: g.cx - 90, y: g.cy, q: -q }, { x: g.cx + 90, y: g.cy, q }]; return [{ x: g.cx - 40, y: g.cy, q: q * .7 }, { x: g.cx + 40, y: g.cy, q: q * .12 }, { x: g.cx + 75, y: g.cy, q: q * .07 }, { x: g.cx + 100, y: g.cy, q: q * .05 }, { x: g.cx + 118, y: g.cy, q: q * .06 }]; },
    V(S, g, x, y) { const P = D.plates(S); if (P) { const f = clamp((y - g.pt) / (g.pb - g.pt), 0, 1); return P[0] + (P[1] - P[0]) * f; } let v = 0; for (const c of D.chs(S, g)) { const r = Math.max(4, Math.hypot(x - c.x, y - c.y)) / PXM; v += 9e9 * c.q * 1e-9 / r; } return v; },
    init(S, g) { if (!S.p1) { if (D.plates(S)) { S.p1 = [g.cx - 60, g.pt + 70]; S.p2 = [g.cx - 60, g.pb - 70]; } else { S.p1 = [g.cx + 70, g.cy - 60]; S.p2 = [g.cx + 150, g.cy + 70]; } } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.plates(S); D.init(S, g); Q49.bg(ctx, w, h);
      if (P) { const n = 8; Q49.plate(ctx, g.px0 - 10, g.pt - 12, g.px1 - g.px0 + 20, 12, P[0] > P[1] ? 1 : -1, 10, 't'); Q49.plate(ctx, g.px0 - 10, g.pb, g.px1 - g.px0 + 20, 12, P[0] > P[1] ? -1 : 1, 10, 'b');
        Q42.T(ctx, (P[0] > 0 ? '+' : '') + P[0] + ' V', g.px0 - 40, g.pt - 6, { s: 12, w: 900, c: '#b91c1c' }); Q42.T(ctx, (P[1] > 0 ? '+' : '') + P[1] + ' V', g.px0 - 40, g.pb + 6, { s: 12, w: 900, c: '#1d4ed8' });
        if (S.p.eq !== false) for (let i = 1; i < n; i++) { const y = g.pt + (g.pb - g.pt) * i / n; Q41.line(ctx, [[g.px0, y], [g.px1, y]], '#7c3aed', 1.5, [6, 5]); Q42.T(ctx, (+(P[0] + (P[1] - P[0]) * i / n).toFixed(2)) + ' V', g.px1 + 26, y, { s: 9.5, w: 800, c: '#7c3aed' }); }
        if (S.p.ln !== false) for (let i = 0; i <= 6; i++) { const x = g.px0 + 20 + i * (g.px1 - g.px0 - 40) / 6; Q41.line(ctx, [[x, g.pt], [x, g.pb]], '#ea580c', 1.6); Q26.head(ctx, x, (g.pt + g.pb) / 2 + 30, P[0] > P[1] ? Math.PI / 2 : -Math.PI / 2, '#ea580c', 7); }
        Q42.T(ctx, 'x = ' + P[2] + ' m', (g.px0 + g.px1) / 2, g.pb + 44, { s: 10.5, w: 900, c: '#334155' }); }
      else { const chs = D.chs(S, g), f = (x, y) => D.V(S, g, x, y), V1 = 9e9 * S.p.q * 1e-9 / (45 / PXM), lv = [];
        [45, 65, 95, 135, 190].forEach(r => { const v = 9e9 * S.p.q * 1e-9 / (r / PXM); lv.push(v); if (S.sc === 'dip') lv.push(-v); });
        if (S.p.eq !== false) { const segs = Q49.contours(S, S.sc + S.p.q, f, g.b, lv, 7); segs.forEach((s, i) => Q49.drawSegs(ctx, s, '#7c3aed', 1.5)); }
        if (S.p.ln !== false) Q31F.draw(ctx, S, chs.map(c => ({ x: c.x, y: c.y, q: c.q / S.p.q })), g.b, { per: 14, col: '#ea580c' });
        if (S.sc === 'tip') { K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.cy - 50, 0, g.cy + 50); gr.addColorStop(0, '#e2e8f0'); gr.addColorStop(1, '#64748b'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.cx - 40, g.cy, 46, Math.PI * .35, Math.PI * 1.65); ctx.lineTo(g.cx + 122, g.cy); ctx.closePath(); ctx.fill(); }); }
        else chs.forEach(c => Q31.ball(ctx, c.x, c.y, 16, Math.sign(c.q))); }
      // voltmeter + probes
      const v1 = D.V(S, g, S.p1[0], S.p1[1]), v2 = D.V(S, g, S.p2[0], S.p2[1]), mx = w - 180, my = h - 250;
      const dx = P ? Math.abs(S.p1[1] - S.p2[1]) / (g.pb - g.pt) * P[2] : Math.hypot(S.p1[0] - S.p2[0], S.p1[1] - S.p2[1]) / PXM;
      K.raw(ctx, () => { ctx.lineWidth = 2; [[S.p1, '#dc2626'], [S.p2, '#111827']].forEach(([q, c]) => { ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.bezierCurveTo(q[0], q[1] + 120, mx - 40, my + 120, mx + (c === '#111827' ? 20 : -20), my + 34); ctx.stroke(); }); ctx.fillStyle = '#facc15'; rr(ctx, mx - 70, my - 40, 140, 80, 10); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.stroke(); ctx.fillStyle = '#0f172a'; rr(ctx, mx - 56, my - 28, 112, 36, 5); ctx.fill(); });
      Q42.T(ctx, (v1 - v2).toFixed(Math.abs(v1 - v2) < 100 ? 2 : 0) + ' V', mx, my - 10, { s: 15, w: 900, c: '#4ade80' }); Q42.T(ctx, 'فولتميتر', mx, my + 22, { s: 10, w: 900, c: '#334155' });
      [[S.p1, '#dc2626'], [S.p2, '#111827']].forEach(([q, c]) => { K.raw(ctx, () => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(q[0], q[1], 7, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); }); });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.c); Q42.drawChips(ctx, C.e);
      if (S.ex) Q49.steps2(ctx, S, EX[S.ex]);
      else Q42.card(ctx, S, [{ t: 'جهد المجس الأحمر = ' + v1.toFixed(1) + ' V', c: '#dc2626', w: 800 }, { t: 'جهد المجس الأسود = ' + v2.toFixed(1) + ' V', c: '#111827', w: 800 }, { t: 'ΔV = ' + (v1 - v2).toFixed(2) + ' V', mono: 1, w: 900 }, { t: P ? 'E = ΔV / x = ' + Q31.sci(Math.abs(v1 - v2) / Math.max(dx, 1e-9), 3, 'V/m') : 'على السطح نفسه يقرأ الفولتميتر صفراً', mono: P ? 1 : 0, c: '#b91c1c', w: 900 }, { t: 'الخطوط عمودية على سطوح تساوي الجهد', c: '#0f766e', w: 800 }], { title: 'سطوح تساوي الجهد', y: 70, wd: 300 });
      Q42.banner(ctx, w, 'اسحب مجسي الفولتميتر الأحمر والأسود');
    },
    set(S, k) { S.sc = k; S.p1 = null; S.p2 = null; S._lk = null; },
    chips(S, g) { return { c: Q42.chips(S, 'sc', Object.keys(SC).filter(k => k !== 'e2' && k !== 'p4').map(k => [k, SC[k][0]]), g.h - 128, S.sc, (S2, k) => { D.set(S2, k); S2.ex = ''; }, { bw: 150 }),
      e: Q49.exChips(S, 'ex', [['e2', 'حل مثال 2 ص 176'], ['p4', 'حل مسألة 4']], g.h - 84, S.ex, (S2, k) => { D.set(S2, k); S2.ex = k; S2.k = 0; }, S2 => EX[S2.ex].lines.length, { bw: 190 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S); D.init(S, g); const P = D.plates(S), C = D.chips(S, g), lim = (x, y) => P ? [clamp(x, g.px0 + 4, g.px1 - 4), clamp(y, g.pt + 2, g.pb - 2)] : [clamp(x, g.L + 10, S.W - 20), clamp(y, 50, S.H - 160)];
      return [{ id: 'p1', x: S.p1[0], y: S.p1[1], r: 20, axis: 'xy', keep: true, tip: 'اسحب المجس الأحمر', idle: 'اسحب ✋', drag: (S2, d) => { S2.p1 = lim(d.ox + d.x - d.sx, d.oy + d.y - d.sy); } }, { id: 'p2', x: S.p2[0], y: S.p2[1], r: 20, axis: 'xy', keep: true, hint: false, tip: 'اسحب المجس الأسود', drag: (S2, d) => { S2.p2 = lim(d.ox + d.x - d.sx, d.oy + d.y - d.sy); } }].concat(C.c, C.e); },
    readings(S) { if (!S.p1 || !S.W) return []; const g = D.geo(S), v1 = D.V(S, g, S.p1[0], S.p1[1]), v2 = D.V(S, g, S.p2[0], S.p2[1]); return [rd('جهد المجس الأحمر', v1.toFixed(2) + ' V'), rd('جهد المجس الأسود', v2.toFixed(2) + ' V'), rd('فرق الجهد', (v1 - v2).toFixed(2) + ' V')]; },
    explain(S) { return Q26.ex('الفولتميتر يقرأ صفراً كلما وضعنا المجسين على السطح المتقطع نفسه، وخطوط القوة تقطع السطوح دائماً بزاوية قائمة.', 'لا يُبذل شغل لنقل شحنة على سطح تساوي الجهد، فلا بد أن تكون القوة عمودية عليه. وحيث يكون المجال كبيراً يتغير الجهد بسرعة فتتقارب السطوح.', 'اختبار الإجهاد لمرضى القلب يقيس فرق الجهد بين قطبين معدنيين على الجسم كدالة للزمن (هل تعلم ص 174).'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — الكهرباء الجوية: البرق والرعد والصاعقة ومانعة الصواعق (الأشكال 18-9 إلى 20-9، ص 179–181) =============== */
(() => {
  const D = { id: 'g10_e_storm', page: 179, fig: 'الأشكال 18-9 و 19-9 و 20-9',
    desc: 'تصبح السحب في الجو الممطر محملة بالكهرباء: موجبة في طبقاتها العليا وسالبة في السفلى. التفريغ بين أجزاء السحابة أو بين سحابتين يسمى برقاً، لا يستمر أكثر من 1/1000 s ويسخن الهواء فجأة إلى نحو 30000°C فيعطي ضوءاً وهاجاً، وتمدد الهواء المفاجئ يولد صوتاً يتكرر صداه هو الرعد. التفريغ بين السحابة وجسم على الأرض يحمل شحنة مخالفة يسمى صاعقة. مانعة الصواعق موصل مدبب يعلو البناية ومتصل بأرض رطبة يفرغ الشحنة تدريجياً بفعل الأسنة.',
    tags: 'الكهرباء الجوية البرق الرعد الصاعقة مانعة الصواعق سحابة مشحونة 30000 سرعة الصوت سرعة الضوء فعل الأسنة الشكل 18-9 19-9 20-9',
    tools: ['غيمة مشحونة', 'بناية', 'مانعة صواعق', 'مراقب يقيس الزمن بين الوميض والرعد'],
    steps: ['راقب تراكم الشحنة في الغيمة: سالبة في الأسفل، فتتولد على سطح الأرض شحنة موجبة بالحث.', 'اضغط «برق» لتفريغ بين أجزاء الغيمة، أو «صاعقة» لتفريغ نحو الأرض.', 'أزل مانعة الصواعق وانتظر: الصاعقة تصيب البناية. أعدها: تنطلق الأيونات من رأسها المدبب وتفرّغ الشحنة ببطء.', 'غيّر بعدك عن البرق من اللوحة: الضوء يصلك فوراً والرعد بعد زمن = البعد ÷ سرعة الصوت.'],
    concl: ['البرق تفريغ بين أجزاء السحابة أو بين سحابتين، والصاعقة تفريغ بين السحابة والأرض.', 'الرعد صوت تمدد الهواء المفاجئ بسبب التسخين إلى نحو 30000°C.', 'نرى البرق قبل سماع الرعد لأن سرعة الضوء أكبر بكثير من سرعة الصوت.', 'مانعة الصواعق تفرغ الشحنة تدريجياً إلى الأرض بفعل الرأس المدبب.'],
    laws: [],
    controls: [TG('rod', 'مانعة الصواعق', true, null, 'shield'), R('rate', 'سرعة تراكم الشحنة', .2, 2, .7, .1, ''), R('dist', 'بعدك عن مكان البرق', .3, 3, 1, .1, 'km')],
    setup(S) { S.cq = 2; S.fl = 0; S.kind = ''; S.seed = 1; S.st = -1; S.ion = []; S.bt = 0; S.hit = ''; S.ht = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 200, cy: 150, cw: 300, gy: h - 200, bx: L + 230, bw: 90, bh: 150, ox: w - 110 }; },
    strike(S, kind) { const g = D.geo(S); S.kind = kind; S.fl = .35; S.seed = (S.seed * 7 + 3) % 97; S.cq = Math.max(1, S.cq - (kind === 'c' ? 3 : 6)); S.st = 0; S.sx = kind === 'c' ? g.cx + 60 : (S.p.rod ? g.bx + g.bw - 14 : g.bx + g.bw / 2); S.hit = kind === 'c' ? '' : S.p.rod ? 'rod' : 'bld'; S.ht = 2.5; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); S.cq = Math.min(10.5, S.cq + S.p.rate * dt * .8);
      if (S.p.rod && S.cq > 3) { S.cq -= dt * .5 * (S.cq - 3) / 4; S.bt += dt * (S.cq / 4); while (S.bt > .12) { S.bt -= .12; const t = [g.bx + g.bw - 14, g.gy - g.bh - 56]; S.ion.push({ x: t[0], y: t[1], vx: (Math.random() - .5) * 30, vy: -60 - Math.random() * 40, l: 0 }); } }
      S.ion.forEach(o => { o.x += o.vx * dt; o.y += o.vy * dt; o.l += dt; }); S.ion = S.ion.filter(o => o.l < 1.6);
      if (S.cq >= 10) D.strike(S, 'g'); if (S.fl > 0) S.fl -= dt; if (S.st >= 0) { S.st += dt; if (S.st > S.p.dist / .34 + 1.5) S.st = -1; } if (S.ht > 0) S.ht -= dt; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), n = Math.round(S.cq);
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, 0, 0, g.gy); gr.addColorStop(0, '#1e293b'); gr.addColorStop(1, '#64748b'); ctx.fillStyle = gr; ctx.fillRect(0, 0, w, g.gy); ctx.fillStyle = '#3f6212'; ctx.fillRect(0, g.gy, w, h - g.gy); ctx.fillStyle = '#65a30d'; ctx.fillRect(0, g.gy, w, 6); if (S.fl > 0) { ctx.fillStyle = 'rgba(255,255,255,' + clamp(S.fl * 1.4, 0, .45) + ')'; ctx.fillRect(0, 0, w, h); } });
      Q49.cloud(ctx, g.cx, g.cy, g.cw, .8); for (let i = 0; i < n; i++) { Q31.sg(ctx, g.cx - 100 + i * 22, g.cy - 50, 1, 5.5); Q31.sg(ctx, g.cx - 100 + i * 22, g.cy + 45, -1, 5.5); }
      for (let i = 0; i < n; i++) Q31.sg(ctx, g.cx - 110 + i * 24, g.gy + 14, 1, 5);
      const tip = Q49.building(ctx, g.bx, g.gy, g.bw, g.bh, S.p.rod);
      S.ion.forEach(o => Q31.sg(ctx, o.x, o.y, 1, 3.5, clamp(1 - o.l / 1.6, 0, 1)));
      if (S.fl > 0) { const a = clamp(S.fl / .35, 0, 1); if (S.kind === 'c') Q31.bolt(ctx, g.cx - 90, g.cy + 20, g.cx + 110, g.cy - 10, S.seed, a); else { const tx = S.hit === 'rod' ? tip[0] : g.bx + g.bw / 2, ty = S.hit === 'rod' ? tip[1] : g.gy - g.bh - 6; Q31.bolt(ctx, tx - 30, g.cy + 50, tx, ty, S.seed, a); if (S.hit === 'rod') Q41.line(ctx, [[g.bx + g.bw + 8, g.gy - g.bh], [g.bx + g.bw + 8, g.gy + 30]], 'rgba(253,224,71,' + a + ')', 6); } }
      if (S.ht > 0 && S.hit) Q42.T(ctx, S.hit === 'rod' ? 'الشحنة تمر عبر الموصل إلى الأرض بأمان' : 'خطر: الصاعقة أصابت البناية!', g.bx + g.bw / 2, g.gy + 40, { s: 12, w: 900, c: '#fff', bg: S.hit === 'rod' ? '#15803d' : '#b91c1c' });
      // observer + thunder wave
      const ox = g.ox, oy = g.gy; K.raw(ctx, () => { ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(ox, oy - 62, 10, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ox, oy - 52); ctx.lineTo(ox, oy - 24); ctx.moveTo(ox, oy - 24); ctx.lineTo(ox - 8, oy); ctx.moveTo(ox, oy - 24); ctx.lineTo(ox + 8, oy); ctx.moveTo(ox - 12, oy - 44); ctx.lineTo(ox + 12, oy - 44); ctx.stroke(); });
      const td = S.p.dist / .34; Q42.T(ctx, 'المراقب على بعد ' + S.p.dist + ' km', ox - 10, oy + 20, { s: 10.5, w: 900, c: '#fff', bg: '#334155' });
      if (S.st >= 0) { const sx = S.sx || g.cx, f = clamp(S.st / td, 0, 1), R = Math.abs(ox - sx) * f; if (f < 1) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(253,230,138,.7)'; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { const r = R - k * 14; if (r > 4) { ctx.beginPath(); ctx.arc(sx, g.gy - 40, r, -Math.PI / 2, Math.PI / 2 * .2); ctx.stroke(); } } });
        Q42.T(ctx, f < 1 ? 'الرعد في الطريق ' + S.st.toFixed(1) + ' s' : 'سمعت الرعد بعد ' + td.toFixed(1) + ' s', ox - 20, oy - 90, { s: 11, w: 900, c: '#0f172a', bg: '#fde68a' }); }
      Q42.card(ctx, S, [{ t: 'شحنة الغيمة ' + S.cq.toFixed(1) + ' من 10', c: '#1d4ed8', w: 900 }, { t: 'زمن البرق أقل من 1/1000 s', c: '#334155' }, { t: 'حرارة الشرارة نحو 30000°C', c: '#b91c1c', w: 800 }, { t: 't = d / v = ' + (S.p.dist * 1000) + ' / 340', mono: 1, c: '#a16207' }, { t: 'يصل الرعد بعد ' + td.toFixed(1) + ' s', c: '#a16207', w: 800 }, { t: S.p.rod ? 'مانعة الصواعق تفرّغ الشحنة تدريجياً' : 'بلا مانعة: البناية في خطر', c: S.p.rod ? '#15803d' : '#b91c1c', w: 900 }], { title: 'الكهرباء الجوية', y: 70, wd: 300 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, 'أطلق البرق أو الصاعقة، وأزل مانعة الصواعق أو أعدها');
    },
    chips(S, g) { return Q42.chips(S, 'st', [['c', 'برق بين الغيوم'], ['g', 'صاعقة نحو الأرض'], ['rod', S.p.rod ? 'أزل مانعة الصواعق' : 'ركّب مانعة الصواعق']], g.h - 84, S.p.rod ? 'rod' : '', (S2, k) => { if (k === 'rod') setParam(S2, 'rod', !S2.p.rod); else D.strike(S2, k); }, { bw: 190 }); },
    drags(S) { if (!S.W) return []; return D.chips(S, D.geo(S)); },
    readings(S) { return [rd('شحنة الغيمة', S.cq.toFixed(1)), rd('زمن وصول الرعد', (S.p.dist / .34).toFixed(1) + ' s'), rd('مانعة الصواعق', S.p.rod ? 'مركّبة' : 'غير مركّبة')]; },
    explain(S) { return Q26.ex('نرى الوميض فوراً ثم نسمع الرعد بعد ثوانٍ، والبناية التي عليها مانعة صواعق تبقى آمنة وتنطلق الأيونات من رأس المانعة.', 'الضوء أسرع من الصوت بنحو مليون مرة. والرأس المدبب للمانعة يجمع الشحنة المحتثة بكثافة كبيرة فيؤين الهواء ويفرّغ الشحنة تدريجياً، وإن ضربت الصاعقة مرّ التيار عبر الموصل إلى الأرض الرطبة.', 'عدّ الثواني بين الوميض والرعد واقسمها على 3 لتعرف بعد العاصفة بالكيلومترات تقريباً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F2 — تطبيقات: المرشح الكهروستاتيكي وجهاز الاستنساخ الضوئي (الشكلان 21-9 و 22-9، ص 182) =============== */
(() => {
  const PAT = [1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0]; const NB = 96;
  const STG = [['1', 'شحن الأسطوانة', 'سلك كورونا يشحن سطح الأسطوانة بشحنة موجبة'], ['2', 'الإضاءة', 'الضوء المنعكس عن الأجزاء البيضاء للوثيقة يفرّغ شحنتها، وتبقى صورة الكتابة مشحونة'], ['3', 'الحبر', 'دقائق الحبر السالبة تنجذب إلى المناطق الموجبة فقط'], ['4', 'النقل', 'الورقة المشحونة بشحنة موجبة أكبر تجذب الحبر من الأسطوانة'], ['5', 'التثبيت', 'بكرتان ساخنتان تصهران الحبر وتثبتانه على الورقة']];
  const D = { id: 'g10_e_apps', page: 182, fig: 'الشكلان 21-9 و 22-9',
    desc: 'المرشح الكهروستاتيكي ينقي غازات المصانع من دقائق الدخان: أسلاك فلزية رفيعة مشحونة بشحنة سالبة تشحن الدقائق بشحنة سالبة، فتنجذب إلى ألواح فلزية موجبة، وبمطرقة ميكانيكية تُهز الألواح فتتجمع الدقائق في الأسفل. وجهاز الاستنساخ الضوئي يشحن أسطوانة ثم يفرّغ بالضوء أجزاءها المقابلة للأبيض، فينجذب الحبر إلى صورة الكتابة وينتقل إلى الورقة ويثبت بالحرارة.',
    tags: 'تطبيقات الكهربائية الساكنة المرشح الكهروستاتيكي دخان تلوث أسلاك سالبة ألواح موجبة مطرقة جهاز الاستنساخ الضوئي أسطوانة حبر الشكل 21-9 22-9',
    tools: ['مدخنة بمرشح كهروستاتيكي', 'جهاز استنساخ: أسطوانة، سلك شحن، مصباح، حبر، ورقة، بكرات تسخين'],
    steps: ['في «المرشح»: شغّل المرشح وغيّر جهده: الدقائق تُشحن بالسلك السالب وتنجذب إلى الألواح الموجبة ويخرج الهواء نظيفاً.', 'أطفئ المرشح ولاحظ الدخان الأسود يخرج. اضغط «المطرقة» لهز الألواح فتسقط الدقائق في المجمّع.', 'في «الاستنساخ»: راقب الأسطوانة تدور وتمر بالمراحل الخمس، واضغط رقم المرحلة لشرحها.'],
    concl: ['المرشح: الأسلاك السالبة تشحن الدقائق، والألواح الموجبة تجذبها، والمطرقة تجمعها.', 'الاستنساخ: شحن الأسطوانة ⟸ تفريغ الأبيض بالضوء ⟸ جذب الحبر ⟸ نقله إلى الورقة ⟸ تثبيته بالحرارة.'],
    laws: [],
    controls: [TG('on', 'تشغيل الجهاز', true, null, 'power'), R('V', 'جهد المرشح', 0, 50, 30, 1, 'kV')],
    setup(S) { S.sc = 'flt'; S.pt = []; S.st = { l: 0, r: 0 }; S.bin = 0; S.out = 0; S.inN = 0; S.cln = 0; S.sh = 0; S.bt = 0; S.ang = 0; S.dr = Array(NB).fill(0); S.paper = []; S.px = 0; S.sel = '1'; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, x0: L + 150, x1: L + 330, y0: 110, y1: h - 300, dx: L + 230, dy: 300, dr: 92 }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), on = S.p.on !== false;
      if (S.sc === 'flt') { S.bt += dt; while (S.bt > .05) { S.bt -= .05; S.pt.push({ x: g.x0 + 20 + Math.random() * (g.x1 - g.x0 - 40), y: g.y1 - 10, q: 0 }); S.inN++; }
        const cx = (g.x0 + g.x1) / 2, k = on ? S.p.V / 30 : 0; S.pt.forEach(p => { p.y -= 70 * dt; if (on && S.p.V > 2 && Math.abs(p.x - cx) < 40 && p.y < g.y1 - 40) p.q = 1; if (p.q && on) { p.x += Math.sign(p.x - cx || 1) * 150 * k * dt; } else p.x += Math.sin(p.y * .05) * 8 * dt; });
        S.pt = S.pt.filter(p => { if (p.x <= g.x0 + 6) { S.st.l = Math.min(60, S.st.l + 1); S.cln++; return false; } if (p.x >= g.x1 - 6) { S.st.r = Math.min(60, S.st.r + 1); S.cln++; return false; } if (p.y < g.y0) { S.out++; return false; } return true; });
        if (S.sh > 0) { S.sh -= dt; const m = Math.min(S.st.l + S.st.r, dt * 40 | 0 || 1); S.bin += m; S.st.l = Math.max(0, S.st.l - m / 2); S.st.r = Math.max(0, S.st.r - m / 2); } }
      else if (on) { const sp = .9; S.ang += sp * dt; const ib = i => ((i / NB * TAU + S.ang) % TAU + TAU) % TAU;
        for (let i = 0; i < NB; i++) { const a = ib(i) * 180 / Math.PI; // 0 = right, 90 = bottom, 180 = left, 270 = top
          if (a > 200 && a < 215) S.dr[i] = 1; else if (a > 255 && a < 270 && S.dr[i] === 1 && !PAT[i % PAT.length]) S.dr[i] = 0; else if (a > 345 || a < 5) { if (S.dr[i] === 1) S.dr[i] = 2; } else if (a > 85 && a < 95 && S.dr[i] === 2) { S.dr[i] = 3; S.paper.push({ x: g.dx, t: 0 }); } else if (a > 140 && a < 150) S.dr[i] = 0; }
        S.paper.forEach(p => { p.x += sp * g.dr * dt; p.t += dt; }); S.paper = S.paper.filter(p => p.x < g.dx + 360); } },
    draw(ctx, w, h, S) { const g = D.geo(S), on = S.p.on !== false; Q49.bg(ctx, w, h);
      if (S.sc === 'flt') { const cx = (g.x0 + g.x1) / 2, sh = S.sh > 0 ? Math.sin(S.sh * 60) * 3 : 0;
        K.raw(ctx, () => { ctx.fillStyle = '#e7e5e4'; ctx.fillRect(g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0); ctx.fillStyle = '#78716c'; ctx.fillRect(g.x0 - 30, g.y1, g.x1 - g.x0 + 60, 70); ctx.fillStyle = '#44403c'; ctx.beginPath(); ctx.moveTo(g.x0, g.y1 + 70); ctx.lineTo(g.x1, g.y1 + 70); ctx.lineTo(cx + 30, g.y1 + 120); ctx.lineTo(cx - 30, g.y1 + 120); ctx.closePath(); ctx.fill(); });
        Q49.plate(ctx, g.x0 - 4 + sh, g.y0 + 20, 10, g.y1 - g.y0 - 40, on ? 1 : 0, 9, 'r'); Q49.plate(ctx, g.x1 - 6 - sh, g.y0 + 20, 10, g.y1 - g.y0 - 40, on ? 1 : 0, 9, 'l');
        Q41.line(ctx, [[cx, g.y0 + 30], [cx, g.y1 - 30]], '#334155', 2.4); if (on && S.p.V > 0) for (let i = 0; i < 7; i++) Q31.sg(ctx, cx + (i % 2 ? 7 : -7), g.y0 + 50 + i * (g.y1 - g.y0 - 100) / 6, -1, 4.5);
        K.raw(ctx, () => { ctx.fillStyle = '#292524'; for (let i = 0; i < S.st.l; i++) { ctx.beginPath(); ctx.arc(g.x0 + 10 + (i % 3) * 3 + sh, g.y1 - 30 - (i / 3 | 0) * 9, 3, 0, TAU); ctx.fill(); } for (let i = 0; i < S.st.r; i++) { ctx.beginPath(); ctx.arc(g.x1 - 12 - (i % 3) * 3 - sh, g.y1 - 30 - (i / 3 | 0) * 9, 3, 0, TAU); ctx.fill(); } for (let i = 0; i < Math.min(80, S.bin); i++) { ctx.beginPath(); ctx.arc(cx - 24 + (i * 7) % 48, g.y1 + 112 - (i / 7 | 0) * 4, 3, 0, TAU); ctx.fill(); } });
        S.pt.forEach(p => { if (p.q) Q31.sg(ctx, p.x, p.y, -1, 4); else K.raw(ctx, () => { ctx.fillStyle = 'rgba(41,37,36,.7)'; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, TAU); ctx.fill(); }); });
        const dirty = S.out / Math.max(1, S.inN); K.raw(ctx, () => { for (let i = 0; i < 8; i++) { ctx.fillStyle = 'rgba(41,37,36,' + clamp(dirty * 1.2 - i * .05, 0, .6) + ')'; ctx.beginPath(); ctx.arc(cx + Math.sin(i) * 20, g.y0 - 20 - i * 9, 14 + i * 3, 0, TAU); ctx.fill(); } });
        Q42.T(ctx, 'هواء ملوث يدخل', cx, g.y1 + 52, { s: 10.5, w: 900, c: '#fff' }); Q42.T(ctx, 'ألواح موجبة', g.x0 - 50, g.y0 + 60, { s: 10.5, w: 900, c: '#b91c1c' }); Q42.T(ctx, 'سلك سالب', cx + 50, g.y0 + 18, { s: 10.5, w: 900, c: '#1d4ed8' }); Q42.T(ctx, 'المجمّع', cx + 70, g.y1 + 110, { s: 10, w: 800, c: '#334155' });
        const pc = S.inN ? Math.round((1 - S.out / Math.max(1, S.out + S.cln)) * 100) : 0;
        Q42.card(ctx, S, [{ t: on ? 'المرشح يعمل بجهد ' + S.p.V + ' kV' : 'المرشح متوقف', c: on ? '#15803d' : '#b91c1c', w: 900 }, { t: 'نسبة الدقائق المحجوزة ≈ ' + pc + '%', c: '#334155', w: 900 }, { t: 'السلك السالب يشحن الدقائق بشحنة سالبة', c: '#1d4ed8', w: 800 }, { t: 'الألواح الموجبة تجذبها، والمطرقة تجمعها', c: '#b91c1c', w: 800 }], { title: 'المرشح الكهروستاتيكي 21-9', y: 70, wd: 300 }); }
      else { const cx = g.dx, cy = g.dy, R = g.dr;
        K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 16; const gr = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R); gr.addColorStop(0, '#a3e635'); gr.addColorStop(1, '#3f6212'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.restore(); ctx.fillStyle = '#1a2e05'; ctx.beginPath(); ctx.arc(cx, cy, 10, 0, TAU); ctx.fill(); });
        for (let i = 0; i < NB; i++) { const a = i / NB * TAU + S.ang, x = cx + Math.cos(a) * (R - 6), y = cy + Math.sin(a) * (R - 6); if (S.dr[i] === 1) Q31.sg(ctx, x, y, 1, 3.6); else if (S.dr[i] === 2) K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * (R + 2), cy + Math.sin(a) * (R + 2), 4, 0, TAU); ctx.fill(); }); }
        const hl = k => S.sel === k ? '#facc15' : '#334155';
        const cw = [cx + Math.cos(Math.PI * 1.15) * (R + 26), cy + Math.sin(Math.PI * 1.15) * (R + 26)]; K.raw(ctx, () => { ctx.strokeStyle = hl('1'); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cw[0], cw[1], 9, 0, TAU); ctx.stroke(); }); Q42.T(ctx, 'الشحن 1', cw[0] - 36, cw[1] - 10, { s: 10.5, w: 900, c: hl('1') === '#facc15' ? '#a16207' : '#334155' });
        K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = hl('2'); ctx.lineWidth = 2; ctx.fillRect(cx - 80, cy - R - 120, 160, 18); ctx.strokeRect(cx - 80, cy - R - 120, 160, 18); ctx.fillStyle = '#0f172a'; PAT.forEach((v, i) => { if (v) ctx.fillRect(cx - 78 + i * 6.5, cy - R - 116, 5, 10); }); if (on) { ctx.fillStyle = 'rgba(253,224,71,.28)'; ctx.beginPath(); ctx.moveTo(cx - 40, cy - R - 100); ctx.lineTo(cx + 40, cy - R - 100); ctx.lineTo(cx + 8, cy - R + 2); ctx.lineTo(cx - 8, cy - R + 2); ctx.closePath(); ctx.fill(); } });
        Q42.T(ctx, 'الوثيقة والضوء 2', cx + 120, cy - R - 110, { s: 10.5, w: 900, c: '#334155' });
        K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; ctx.strokeStyle = hl('3'); ctx.lineWidth = 3; rr(ctx, cx + R + 8, cy - 40, 60, 80, 8); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#0f172a'; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.arc(cx + R + 18 + (i * 13) % 44, cy - 30 + (i * 17) % 64, 3, 0, TAU); ctx.fill(); } }); Q42.T(ctx, 'الحبر السالب 3', cx + R + 38, cy + 56, { s: 10.5, w: 900, c: '#334155' });
        const py = cy + R + 8; K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = hl('4'); ctx.lineWidth = 2; ctx.fillRect(cx - 150, py, 520, 14); ctx.strokeRect(cx - 150, py, 520, 14); ctx.fillStyle = '#0f172a'; S.paper.forEach(p => ctx.fillRect(p.x - 3, py + 3, 6, 8)); });
        Q42.T(ctx, 'الورقة 4', cx - 110, py + 30, { s: 10.5, w: 900, c: '#334155' });
        const fx = cx + 230; K.raw(ctx, () => { [py - 14, py + 28].forEach(y => { const gr = ctx.createRadialGradient(fx, y, 2, fx, y, 18); gr.addColorStop(0, '#fecaca'); gr.addColorStop(1, '#b91c1c'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(fx, y, 16, 0, TAU); ctx.fill(); ctx.strokeStyle = hl('5'); ctx.lineWidth = 2; ctx.stroke(); }); }); Q42.T(ctx, 'التسخين 5', fx, py + 60, { s: 10.5, w: 900, c: '#334155' });
        const st = STG.find(q => q[0] === S.sel) || STG[0];
        Q42.card(ctx, S, [{ t: 'المرحلة ' + st[0] + ': ' + st[1], c: '#a16207', w: 900, s: 13 }, { t: st[2], c: '#334155' }, { t: on ? 'الأسطوانة تدور' : 'الجهاز متوقف', c: on ? '#15803d' : '#b91c1c', w: 800 }], { title: 'جهاز الاستنساخ الضوئي 22-9', y: 70, wd: 300 }); }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.b);
      Q42.banner(ctx, w, S.sc === 'flt' ? 'شغّل المرشح وغيّر جهده ثم اضغط المطرقة' : 'اضغط رقم المرحلة لتعرف ما يحدث فيها');
    },
    chips(S, g) { return { a: Q42.chips(S, 'sc', [['flt', 'المرشح الكهروستاتيكي'], ['cp', 'جهاز الاستنساخ'], ['on', S.p.on !== false ? 'إيقاف' : 'تشغيل']], g.h - 128, S.sc, (S2, k) => { if (k === 'on') setParam(S2, 'on', S2.p.on === false); else S2.sc = k; }, { bw: 190 }),
      b: S.sc === 'flt' ? Q42.chips(S, 'hm', [['hm', 'المطرقة: هز الألواح']], g.h - 84, '', S2 => { S2.sh = .8; }, { bw: 200 }) : Q42.chips(S, 'sg', STG.map(q => [q[0], q[0] + ' ' + q[1]]), g.h - 84, S.sel, (S2, k) => { S2.sel = k; }, { bw: 130 }) }; },
    drags(S) { if (!S.W) return []; const C = D.chips(S, D.geo(S)); return C.a.concat(C.b); },
    readings(S) { return S.sc === 'flt' ? [rd('دقائق دخلت', S.inN), rd('محجوزة على الألواح', S.cln), rd('خرجت', S.out)] : [rd('المرحلة', S.sel)]; },
    explain(S) { return Q26.ex('دقائق الدخان تنحرف نحو الألواح عندما يعمل المرشح، والحبر يلتصق فقط بصورة الكتابة على الأسطوانة.', 'الدقائق المشحونة بشحنة سالبة تنجذب إلى الألواح الموجبة (الشحنات المختلفة تتجاذب). وفي الاستنساخ يفرّغ الضوء الأجزاء البيضاء فلا يلتصق بها الحبر.', 'تُستعمل المرشحات في محطات الكهرباء ومعامل الإسمنت لحماية البيئة من التلوث.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G1 — أسئلة الفصل ومسائله على الجهاز (ص 183–186) =============== */
(() => {
  const PB = {
    m1: { t: 'م1', q: 'ما قوة التنافر بين شحنتين نقطيتين متساويتين كل منهما 1 μC وعلى بعد 10 cm؟', lines: ['F = K q₁ q₂ / r²', 'F = 9×10⁹ × 10⁻⁶ × 10⁻⁶ / 0.1²', 'F = 0.9 N'], sc: 'two' },
    m2: { t: 'م2', q: 'الشحنتان +27 μC و +3 μC على خط مستقيم تفصلهما 1 m. أين توضع شحنة ثالثة لتصبح محصلة القوى عليها صفراً؟', lines: ['K q₁ q₃ / x² = K q₂ q₃ / (1 − x)²', '27 / x² = 3 / (1 − x)² ⟸ x / (1 − x) = 3', 'x = 0.75 m', 'من الشحنة الكبرى، أي 25 cm من الصغرى'], sc: 'line' },
    m3: { t: 'م3', q: 'فرق الجهد بين A و B هو 60 V. ما الشغل اللازم لنقل بروتون ثم إلكترون من A إلى B؟', lines: ['جهد A أعلى بمقدار 60 V', 'VAB = VB − VA = −60 V', 'W = q VAB', 'للبروتون: W = − 60 × 1.6×10⁻¹⁹', 'للبروتون: WAB = −9.6×10⁻¹⁸ J', 'للإلكترون: W = + 60 × 1.6×10⁻¹⁹', 'للإلكترون: WAB = +9.6×10⁻¹⁸ J'], sc: 'pl' },
    m4: { t: 'م4', q: 'سطحان متوازيان من سطوح تساوي الجهد: 10 V و −2 V والبعد بينهما 4 mm. احسب المجال', lines: ['E = ΔV / x = (10 + 2) / 0.004', 'E = 12 / 0.004', 'E = 3000 N/C'], sc: 'eq' },
    m5: { t: 'م5', q: 'A تبعد 0.5 m و B تبعد 0.9 m عن مركز كرة شحنتها 1×10⁻³ μC. احسب الشغل لنقل 2 μC من B إلى A', lines: ['VA = 9×10⁹ × 10⁻⁹ / 0.5 = 18 V', 'VB = 9×10⁹ × 10⁻⁹ / 0.9 = 10 V', 'W = 2×10⁻⁶ × (18 − 10)', 'W = 16×10⁻⁶ J'], sc: 'sph' },
    m6: { t: 'م6', q: 'شحنة 6 μC على بعد 1.2 m من شحنة 5 μC. احسب الشغل لتحريك الثانية إلى بعد 0.9 m', lines: ['W = K q₁ q₂ (1/0.9 − 1/1.2)', 'W = 9×10⁹ × 6×10⁻⁶ × 5×10⁻⁶ × 0.278', 'W = +0.075 J'], sc: 'two' },
    s3: { t: 'س3', q: 'هل يمكن تقاطع خطين من خطوط القوة الكهربائية؟ ولماذا؟', lines: ['لا يمكن', 'لأن للمجال في كل نقطة اتجاهاً واحداً فقط', 'لو تقاطع خطان لكان للمجال اتجاهان عند نقطة التقاطع'], sc: 'cross' },
    s4: { t: 'س4', q: 'كيف تفسر تساوي الجهد لجميع نقاط الموصل المشحون المعزول؟', lines: ['الشحنات حرة الحركة في الموصل', 'تتوزع حتى ينعدم المجال داخله وعلى امتداد سطحه', 'فلا يُبذل شغل لنقل شحنة بين نقطتين فيه ⟸ فرق الجهد صفر'], sc: 'sphv' },
    s5: { t: 'س5', q: 'علل عدم وجود مجال كهربائي داخل كرة معدنية مشحونة معزولة', lines: ['الشحنات المتشابهة تتنافر فتستقر على السطح الخارجي', 'داخل الكرة خالٍ من الشحنات', 'فالمجال داخلها صفر'], sc: 'sphv' },
    s6: { t: 'س6', q: 'إذا كان جهد نقطة صفراً فهل من الضروري أن يكون المجال فيها صفراً؟', lines: ['ليس ضرورياً', 'مثال: منتصف المسافة بين شحنتين متساويتين مختلفتين', 'الجهد هناك صفر لكن المجال لا يساوي صفراً'], sc: 'dip' },
    s7: { t: 'س7', q: 'أيهما أكبر: جهد نقطة داخل كرة معدنية مشحونة أم جهد نقطة على سطحها؟', lines: ['متساويان', 'المجال داخل الكرة صفر فلا يلزم شغل للانتقال من السطح إلى الداخل', 'الجهد في كل نقاطها = K q / R'], sc: 'sphv' },
    s8: { t: 'س8', q: 'ما الصاعقة؟ وما مانعة الصواعق؟ وكيف تعمل؟', lines: ['الصاعقة: تفريغ بين سحابة مشحونة وجسم على الأرض شحنته مخالفة', 'المانعة: موصل مدبب يعلو البناية وطرفه الآخر في أرض رطبة', 'تنتقل الشحنات المحتثة إلى رأسها المدبب فتتفرغ تدريجياً'], sc: 'rod' },
    s9: { t: 'س9', q: 'ما البرق وكيف يحصل؟', lines: ['تفريغ بين أجزاء السحابة الواحدة أو بين سحابتين', 'يستمر أقل من 1/1000 s', 'يسخن الهواء إلى 30000°C فيعطي ضوءاً وهاجاً'], sc: 'bolt' },
    s10: { t: 'س10', q: 'لماذا نرى البرق قبل سماع صوت الرعد الناتج عنه؟', lines: ['لأن سرعة الضوء أكبر بكثير من سرعة الصوت', 'سرعة الضوء 3×10⁸ m/s', 'سرعة الصوت في الهواء نحو 340 m/s'], sc: 'bolt' },
    s11: { t: 'س11', q: 'المجال داخل كرة معدنية مجوفة مشحونة صفر. فهل الجهد داخلها صفر؟', lines: ['لا', 'الجهد داخلها ثابت ويساوي جهد سطحها', 'V = K q / R', 'لأن المجال صفر فالجهد لا يتغير'], sc: 'sphv' } };
  const KEYS = Object.keys(PB);
  const D = { id: 'g10_e_review', page: 183, fig: 'أسئلة الفصل التاسع ص 183–186',
    desc: 'مسائل الفصل التاسع الست وأسئلته المقالية من س3 إلى س11 محلولة خطوة خطوة، مع رسم توضيحي لكل منها. وأسئلة الاختيار والصح والخطأ في اختبارات الأقسام.',
    tags: 'أسئلة الفصل التاسع مسائل 0.9N 25cm 9.6×10⁻¹⁸ 3000 16×10⁻⁶ 0.075 تقاطع خطوط القوة الجهد داخل الكرة الصاعقة البرق الرعد',
    tools: ['الرسوم التوضيحية لكل سؤال'],
    steps: ['اختر مسألة (م1–م6) أو سؤالاً (س3–س11).', 'فكّر بالجواب أولاً، ثم اضغط «الخطوة التالية» لكشف الحل.'],
    concl: ['م1: 0.9 N. م2: 25 cm من 3 μC. م3: ∓9.6×10⁻¹⁸ J.', 'م4: 3000 N/C. م5: 16×10⁻⁶ J. م6: 0.075 J.'],
    laws: ['g10_el_coul', 'g10_el_V', 'g10_el_W', 'g10_el_grad'],
    controls: [],
    setup(S) { S.pb = 'm1'; S.k = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 200, cy: h * .4 }; },
    scene(ctx, S, g) { const P = PB[S.pb], cx = g.cx, cy = g.cy;
      if (P.sc === 'two') { Q31.ball(ctx, cx - 90, cy, 18, 1); Q31.ball(ctx, cx + 90, cy, 18, 1); K.force(ctx, cx - 110, cy, -60, 0, 'F', '#16a34a', 3); K.force(ctx, cx + 110, cy, 60, 0, 'F', '#16a34a', 3); Q41.line(ctx, [[cx - 90, cy + 40], [cx + 90, cy + 40]], '#7c3aed', 1.5); Q42.T(ctx, S.pb === 'm1' ? 'r = 10 cm' : 'من 1.2 m إلى 0.9 m', cx, cy + 56, { s: 11, w: 900, c: '#7c3aed' }); }
      else if (P.sc === 'line') { Q41.line(ctx, [[cx - 170, cy], [cx + 170, cy]], '#94a3b8', 2); Q31.ball(ctx, cx - 150, cy, 18, 1); Q31.ball(ctx, cx + 150, cy, 12, 1); Q31.ball(ctx, cx + 75, cy, 9, 1); Q42.T(ctx, '27 μC', cx - 150, cy - 34, { s: 11, w: 900 }); Q42.T(ctx, '3 μC', cx + 150, cy - 34, { s: 11, w: 900 }); Q42.T(ctx, 'المحصلة = صفر', cx + 75, cy + 34, { s: 11, w: 900, c: '#fff', bg: '#16a34a' }); }
      else if (P.sc === 'pl' || P.sc === 'eq') { Q49.plate(ctx, cx - 150, cy - 110, 300, 10, 1, 10, 't'); Q49.plate(ctx, cx - 150, cy + 100, 300, 10, -1, 10, 'b'); for (let i = 0; i < 5; i++) Q41.line(ctx, [[cx - 120 + i * 60, cy - 100], [cx - 120 + i * 60, cy + 100]], '#ea580c', 1.5); Q42.T(ctx, P.sc === 'pl' ? 'A' : '10 V', cx + 180, cy - 105, { s: 12, w: 900, c: '#b91c1c' }); Q42.T(ctx, P.sc === 'pl' ? 'B' : '−2 V', cx + 180, cy + 105, { s: 12, w: 900, c: '#1d4ed8' }); if (P.sc === 'pl') { Q31.ball(ctx, cx - 40, cy - 30, 10, 1); Q31.el(ctx, cx + 40, cy + 30, 7); } }
      else if (P.sc === 'sph' || P.sc === 'sphv') { Q31.sphere(ctx, cx - 80, cy, 50, cy + 130); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; Q31.sg(ctx, cx - 80 + Math.cos(a) * 43, cy + Math.sin(a) * 43, 1, 4.5); } if (P.sc === 'sph') { Q42.T(ctx, 'A', cx + 20, cy - 20, { s: 12, w: 900, c: '#2563eb' }); Q42.T(ctx, 'B', cx + 120, cy - 20, { s: 12, w: 900, c: '#7c3aed' }); } else Q42.T(ctx, 'E = 0', cx - 80, cy, { s: 12, w: 900, c: '#0f766e' }); }
      else if (P.sc === 'cross') { Q41.line(ctx, [[cx - 120, cy - 80], [cx + 120, cy + 80]], '#ea580c', 2); Q41.line(ctx, [[cx - 120, cy + 80], [cx + 120, cy - 80]], '#ea580c', 2); Q42.T(ctx, '✗', cx, cy - 26, { s: 28, w: 900, c: '#dc2626' }); Q42.T(ctx, 'اتجاهان في نقطة واحدة؟', cx, cy + 110, { s: 11, w: 900, c: '#334155' }); }
      else if (P.sc === 'dip') { Q31.ball(ctx, cx - 110, cy, 18, 1); Q31.ball(ctx, cx + 110, cy, 18, -1); Q41.dot(ctx, cx, cy, '#7c3aed', 6); K.force(ctx, cx, cy, 70, 0, 'E', '#16a34a', 3); Q42.T(ctx, 'V = 0', cx, cy - 26, { s: 12, w: 900, c: '#7c3aed' }); }
      else if (P.sc === 'rod') { Q49.cloud(ctx, cx - 40, cy - 120, 220, .7); Q49.building(ctx, cx - 40, cy + 120, 90, 130, true); }
      else if (P.sc === 'bolt') { Q49.cloud(ctx, cx, cy - 110, 260, .8); Q31.bolt(ctx, cx - 80, cy - 90, cx + 60, cy - 120, 5, 1); Q42.T(ctx, 'الضوء أسرع من الصوت', cx, cy + 60, { s: 12, w: 900, c: '#fff', bg: '#334155' }); } },
    draw(ctx, w, h, S) { const g = D.geo(S), P = PB[S.pb]; Q49.bg(ctx, w, h); D.scene(ctx, S, g);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.b); C.n._lab = '⬇ الخطوة التالية'; C.n._col = '#be185d'; Q42.drawChips(ctx, [C.n]);
      Q42.steps(ctx, S, { title: P.t, q: P.q, lines: P.lines, k: S.k }, { y: 70, x: w - 12, wd: g.w < 600 ? w - 24 : 330 });
      Q42.banner(ctx, w, 'اختر سؤالاً ثم اضغط «الخطوة التالية»'); },
    chips(S, g) { const f = (S2, k) => { S2.pb = k; S2.k = 0; }; return { a: Q42.chips(S, 'pa', KEYS.slice(0, 6).map(k => [k, 'مسألة ' + PB[k].t.slice(1)]), g.h - 172, S.pb, f, { bw: 110 }), b: Q42.chips(S, 'pb', KEYS.slice(6).map(k => [k, PB[k].t]), g.h - 128, S.pb, f, { bw: 76 }), n: Q42.btn('nx', { x: g.L + 90, y: g.h - 84, w: 170, h: 34 }, S2 => { S2.k = Math.min(S2.k + 1, PB[S2.pb].lines.length); }, { tip: 'الخطوة التالية' }) }; },
    drags(S) { if (!S.W) return []; const C = D.chips(S, D.geo(S)); return C.a.concat(C.b, [C.n]); },
    readings(S) { return [rd('السؤال', PB[S.pb].t), rd('الخطوات', S.k + ' / ' + PB[S.pb].lines.length)]; },
    explain(S) { return Q26.ex('كل مسألة تُحل بقانون واحد من قوانين الفصل، وكل سؤال مقالي يُفسَّر بخاصية من خواص الشحنة أو المجال أو الجهد.', 'قوانين الفصل: F = Kq₁q₂/r² ، E = F/q′ ، E = Kq/r² ، Φ = E⊥A ، V = Kq/r ، W = qV ، E = V/x.', 'هذه القوانين أساس عمل المتسعات والأجهزة الإلكترونية التي ستدرسها لاحقاً.'); }
  };
  M8.P[D.id] = D;
})();

/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g10_e_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g10_e_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g10_es_charge', ch: 49, reg: X10, sec: '9-1 الشحنة الكهربائية', page: 156, kind: 'نشاط',
  title: 'الشحنة الكهربائية: الدلك وحفظ الشحنة وتكميتها Q = ne والكشاف',
  desc: 'ندلك ساق الزجاج بالحرير أو ساق المطاط بالصوف ونعدّ الإلكترونات المنتقلة: الشحنتان متساويتان ومختلفتان والمجموع صفر (حفظ الشحنة)، وكل شحنة مضاعفات لشحنة الإلكترون Q = n e. ثم نختبر التجاذب والتنافر بكرة معلقة، ونراجع الشحن بالتماس وبالحث بالكشاف ذي الورقتين.',
  tags: 'الشحنة الكهربائية حفظ الشحنة تكمية الدلك الكشاف الحث',
  fact: ['اكتُشف حديثاً وجود ست أنواع من الجسيمات داخل النواة تسمى كواركات Quarks: ثلاثة منها شحنتها +2/3 من شحنة البروتون والثلاثة الأخرى −1/3 من شحنة البروتون (هل تعلم ص 156).', 'أصغر قيمة للشحنة الكهربائية هي شحنة الإلكترون e = 1.6×10⁻¹⁹ C (ص 156).'],
  quiz: [
    { q: 'الشحنة الكلية لأي جسم مشحون تساوي:', o: ['عدداً صحيحاً من شحنة الإلكترون Q = n e', 'أي قيمة كانت', 'نصف شحنة الإلكترون دائماً'], a: 0, why: 'الشحنة مكممة (ص 156).' },
    { q: 'عند دلك ساق زجاج بالحرير فإن مجموع شحنتي الساق والحرير:', o: ['صفر لأن الشحنة محفوظة', 'موجب', 'سالب'], a: 0, why: 'الشحنة محفوظة: الإلكترونات تنتقل فقط.' },
    { q: 'جسمان مشحونان بشحنتين متشابهتين:', o: ['يتنافران', 'يتجاذبان', 'لا يتأثران'], a: 0, why: 'خصائص الشحنة ص 156.' },
    { q: 'عدد الإلكترونات في شحنة مقدارها 1 C:', o: ['6.25×10¹⁸', '1.6×10¹⁹', '1.6×10⁻¹⁹'], a: 0, why: 'n = Q / e = 1 / 1.6×10⁻¹⁹.' }],
  parts: [{ id: 'g10_e_rub', n: 'الدلك وحفظ الشحنة وتكميتها والكرة المعلقة' }, { id: 'g10_e_scope', n: 'الكشاف: الشحن بالتماس وبالحث والتأريض' }] });
M8.merge({ id: 'g10_es_coul', ch: 49, reg: X10, sec: '9-2 قانون كولوم', page: 157, kind: 'مثال',
  title: 'قانون كولوم: ميزان الالتواء والكرتان المشحونتان ومحصلة القوى',
  desc: 'نلوي رأس خيط ميزان الالتواء لكولوم ونقيس القوة عند أبعاد مختلفة لنكتشف F ∝ 1/r²، ثم نسحب كرتين مشحونتين ونرسم منحني F مع r، ونحل مثالي الكتاب ومسألتي 1 و 2 (محصلة القوى ونقطة انعدامها).',
  tags: 'قانون كولوم ميزان الالتواء تجاذب تنافر محصلة القوى',
  fact: ['ثابت كولوم K = 1/4πε₀ = 9×10⁹ N.m²/C² ، وسماحية الفراغ ε₀ = 8.85×10⁻¹² C²/N.m² (ص 157–158).', 'إذا كان الوسط مادة عازلة غير الهواء فإن القوة المتبادلة بين الشحنتين تكون أقل (ص 158).'],
  quiz: [
    { q: 'قوة التجاذب أو التنافر الكهربائي بين جسمين مشحونين أكبر من قوة الجذب التثاقلي بين كتلتيهما:', o: ['صح', 'خطأ'], a: 0, why: 'س2 ص 184: القوة الكهربائية أكبر بكثير.' },
    { q: 'يجذب الإلكترون بروتون النواة بقوة أقل من القوة التي يجذب بها البروتون الإلكترون:', o: ['خطأ: القوتان متساويتان ومتعاكستان', 'صح'], a: 0, why: 'نيوتن الثالث F₁₂ = − F₂₁.' },
    { q: 'قانون كولوم ينطبق على الشحنات المتساوية فقط:', o: ['خطأ: ينطبق على أي شحنتين نقطيتين', 'صح'], a: 0, why: 'س2 ص 184.' },
    { q: 'قانون كولوم ينطبق على الشحنات الكبيرة الحجم:', o: ['خطأ: ينطبق على الشحنات النقطية', 'صح'], a: 0, why: 'س2 ص 184.' },
    { q: 'شحنتان +2 μC و +5 μC على بعد 90 cm. القوة بينهما:', o: ['1/9 N تنافر', '1/9 N تجاذب', '0.9 N تنافر'], a: 0, why: 'مثال 1 ص 158.' },
    { q: 'إذا ضوعف البعد بين شحنتين فإن القوة بينهما:', o: ['تصبح ربع ما كانت', 'تتضاعف', 'تصبح نصف ما كانت'], a: 0, why: 'F ∝ 1/r².' }],
  parts: [{ id: 'g10_e_tors', n: 'ميزان الالتواء لكولوم (الشكل 1-9)' }, { id: 'g10_e_coul', n: 'كرتان مشحونتان ومنحني F–r + مثال 1 ومسألة 1' }, { id: 'g10_e_line', n: 'ثلاث شحنات على خط: مثال 2 ومسألة 2' }] });
M8.merge({ id: 'g10_es_cond', ch: 49, reg: X10, sec: '9-3 التوصيل الكهربائي + 9-4 توزيع الشحنات على سطوح الموصلات', page: 160, kind: 'نشاط',
  title: 'الموصلات والعوازل وتوزيع الشحنة: نشاط الشبكة والوريقات وكثافة الشحنة',
  desc: 'نصل كرة مشحونة بكشاف بسيقان من الفضة والنحاس والسليكون والزجاج والمطاط ونقارن، ثم ننفذ نشاط الكتاب: شبكة معدنية عليها وريقات نشحنها ونثنيها لنرى أن الشحنة تستقر على السطح الخارجي، ونقيس كثافة الشحنة بقرص الاختبار ونرى تركزها وتفريغها عند الرأس المدبب.',
  tags: 'موصلات عوازل أشباه موصلات توزيع الشحنة كثافة الشحنة رؤوس مدببة',
  fact: ['الشحنات الكهربائية ترتكز على الرؤوس المدببة من سطح الموصلات المشحونة والمعزولة بكثافة شحنة أكبر (تذكر ص 162).', 'السليكون والجرمانيوم أشهر أشباه الموصلات وتصنع منها الترانزستورات والثنائيات البلورية والخلايا الشمسية (ص 160).'],
  quiz: [
    { q: 'كثافة الشحنة لموصل معزول مشحون فيه نتوءات تكون:', o: ['أكبر ما يمكن عند رؤوسه المدببة', 'أقل ما يمكن عند رؤوسه المدببة', 'متساوية في كل نقاطه', 'كل الاحتمالات السابقة'], a: 0, why: 'س1 ص 183.' },
    { q: 'أشباه الموصلات تكون دائماً موصلة جيدة للكهرباء:', o: ['خطأ: خواصها وسطية بين الموصلات والعوازل', 'صح'], a: 0, why: 'س2 ص 184.' },
    { q: 'تتوزع الشحنة على سطح موصل منتظم كالكرة بصورة متجانسة:', o: ['صح', 'خطأ'], a: 0, why: 'σ = q / 4πr² متساوية.' },
    { q: 'تستقر الشحنات على السطح الخارجي للموصل المشحون المعزول بسبب:', o: ['تنافر الشحنات المتشابهة', 'جذب الهواء لها', 'الجاذبية'], a: 0, why: 'نشاط ص 161.' },
    { q: 'أجود المواد إيصالاً للكهرباء:', o: ['الفضة', 'النحاس', 'الألمنيوم', 'السليكون'], a: 0, why: 'ص 160: الفضة يليها النحاس فالألمنيوم.' }],
  parts: [{ id: 'g10_e_cond', n: 'موصلات وعوازل وأشباه موصلات' }, { id: 'g10_e_mesh', n: 'نشاط: الشبكة المعدنية والوريقات (3-9 و 4-9)' }, { id: 'g10_e_dens', n: 'كثافة الشحنة والرؤوس المدببة بقرص الاختبار' }] });
M8.merge({ id: 'g10_es_field', ch: 49, reg: X10, sec: '9-5 المجال الكهربائي + 9-6 الفيض الكهربائي', page: 163, kind: 'مثال',
  title: 'المجال الكهربائي وخطوطه، المنتظم وغير المنتظم، والفيض الكهربائي',
  desc: 'نحرك شحنة اختبار في مجال شحنة نقطية وشحنتين ونرى خطوط القوة والمماس، ثم المجال المنتظم بين لوحين ومجال كرة موصلة (صفر في داخلها)، وندوّر إطاراً في مجال منتظم لنعدّ الخطوط المخترقة: الفيض Φ = E⊥A. ونحل أمثلة الكتاب الخمسة.',
  tags: 'المجال الكهربائي خطوط القوة المجال المنتظم الفيض الكهربائي',
  fact: ['خطوط القوة الكهربائية لا تتقاطع بل تتنافر وتتوتر لتأخذ أقصر طول ممكن لها (ص 164).', 'من أجزاء الكولوم المايكروكولوم μC = 10⁻⁶ C والبيكوكولوم pC = 10⁻¹² C (ص 165).'],
  quiz: [
    { q: 'في حالة المجال الكهربائي المنتظم يكون:', o: ['المجال ثابت المقدار والاتجاه في جميع نقاطه', 'المجال متغير المقدار في جميع نقاطه', 'المجال ثابت الاتجاه فقط', 'المجال متغير المقدار والاتجاه'], a: 0, why: 'س1 ص 183.' },
    { q: 'إذا وضعت شحنة كهربائية طليقة في مجال كهربائي فإنها تتحرك:', o: ['باتجاه المجال إذا كانت موجبة وبعكسه إذا كانت سالبة', 'باتجاه المجال دائماً', 'بعكس اتجاه المجال دائماً', 'عمودية على المجال'], a: 0, why: 'س1 ص 183.' },
    { q: 'تكون خطوط القوة الكهربائية متوازية في المجال المنتظم:', o: ['صح', 'خطأ'], a: 0, why: 'س2 ص 184.' },
    { q: 'لا يمكن لخطوط القوة الكهربائية أن تتقاطع:', o: ['صح', 'خطأ'], a: 0, why: 'س2 ص 185.' },
    { q: 'القوة على شحنة معينة في مجال منتظم تكون ثابتة المقدار والاتجاه:', o: ['صح', 'خطأ'], a: 0, why: 'س2 ص 185.' },
    { q: 'المجال داخل كرة موصلة مشحونة معزولة:', o: ['صفر', 'أكبر من مجال سطحها', 'يساوي مجال سطحها'], a: 0, why: 'مثال 2 ص 167.' },
    { q: 'يساوي الفيض الكهربائي صفراً عندما يكون السطح:', o: ['موازياً للمجال', 'عمودياً على المجال', 'مائلاً بزاوية 45°'], a: 0, why: 'الشكل 11-9 e.' }],
  parts: [{ id: 'g10_e_field', n: 'خطوط المجال وشحنة الاختبار + مثال 3' }, { id: 'g10_e_unif', n: 'المجال المنتظم بين لوحين + مثال 1 ومثال 2 ص 170' }, { id: 'g10_e_sph', n: 'مجال كرة موصلة: غير منتظم وصفر في الداخل + مثال 2' }, { id: 'g10_e_flux', n: 'الفيض الكهربائي (الشكل 11-9) + مثال 1 ص 170' }] });
M8.merge({ id: 'g10_es_pot', ch: 49, reg: X10, sec: '9-7 الجهد + 9-8 فرق الجهد + 9-9 سطوح تساوي الجهد + جهد الأرض', page: 171, kind: 'مثال',
  title: 'الجهد الكهربائي وفرق الجهد والشغل وسطوح تساوي الجهد وانحدار الجهد',
  desc: 'نحرك شحنة اختبار بين نقطتين حول كرة مشحونة ونقرأ الجهد على منحني V = Kq/r ونحسب الشغل W = qVAB، ونؤرض الكرة فيصبح جهدها صفراً. ثم نقيس بفولتميتر ذي مجسين على سطوح تساوي الجهد ونحسب E = V/x. ونحل الأمثلة الثلاثة والمسائل 4 و 5 و 6.',
  tags: 'الجهد الكهربائي فرق الجهد الشغل سطوح تساوي الجهد انحدار الجهد جهد الأرض',
  fact: ['إن اختبار الإجهاد الذي يستعمل في فحص مرضى القلب يتم بحساب فرق الجهد بين قطبين معدنيين كدالة للزمن، ويظهر ما إذا كان القلب يعمل بصورة طبيعية (هل تعلم ص 174).', 'القوة الكهربائية على شحنة موجبة تشير إلى الاتجاه الذي تكون عنده الطاقة الكامنة واطئة، والمجال دائماً باتجاه الجهد الواطئ (تذكر ص 174).', 'يعد جهد الأرض صفراً لا لخلوها من الشحنات بل لأن سطحها كبير جداً فلا تغير أي شحنة تعطى لها أو تؤخذ منها جهدها (ص 178).'],
  quiz: [
    { q: 'الجهد الكهربائي لنقاط بين لوحين متوازيين مشحونين بشحنتين مختلفتين متساويتين:', o: ['ربما موجباً وربما سالباً أو صفراً', 'موجباً دائماً', 'سالباً دائماً', 'موجباً أو سالباً فقط'], a: 0, why: 'س1 ص 183.' },
    { q: 'كرة موصلة مشحونة معزولة جهد إحدى نقاط سطحها 1 V. الجهد في مركزها:', o: ['فولط واحد', 'صفر', 'أقل من 1 V وأكبر من صفر', 'أكبر من 1 V'], a: 0, why: 'س1 ص 184: الكرة الموصلة سطح تساوي جهد.' },
    { q: 'جميع نقاط الكرة الموصلة المشحونة تكون بالجهد نفسه:', o: ['صح', 'خطأ'], a: 0, why: 'س2 ص 184.' },
    { q: 'سطح الكرة الموصلة المشحونة المعزولة سطح تساوي جهد:', o: ['صح', 'خطأ'], a: 0, why: 'س2 ص 184.' },
    { q: 'يمكن شحن الكرة الأرضية بشحنة كهربائية موجبة:', o: ['خطأ: الأرض خزان كبير وجهدها صفر', 'صح'], a: 0, why: 'س2 ص 184 وص 178.' },
    { q: 'وحدة انحدار الجهد V/m تكافئ:', o: ['N/C', 'J/C', 'C/m²'], a: 0, why: 'E = V/x = F/q′.' }],
  parts: [{ id: 'g10_e_pot', n: 'الجهد وفرق الجهد والشغل وجهد الأرض + الأمثلة والمسائل' }, { id: 'g10_e_equi', n: 'سطوح تساوي الجهد والفولتميتر وانحدار الجهد' }] });
M8.merge({ id: 'g10_es_atm', ch: 49, reg: X10, sec: 'الرؤوس المسننة + الكهرباء الجوية + تطبيقات الكهربائية الساكنة', page: 179, kind: 'نشاط',
  title: 'البرق والرعد والصاعقة ومانعة الصواعق، والمرشح الكهروستاتيكي وجهاز الاستنساخ',
  desc: 'نشحن غيمة ونطلق البرق والصاعقة، ونقارن البناية مع مانعة الصواعق وبدونها، ونقيس الزمن بين الوميض والرعد. ثم نشغل مرشحاً كهروستاتيكياً ينقي الدخان، ونتابع مراحل جهاز الاستنساخ الضوئي.',
  tags: 'الكهرباء الجوية البرق الرعد الصاعقة مانعة الصواعق المرشح الكهروستاتيكي الاستنساخ',
  fact: ['يبدو للعين المجردة أنه يحصل تفريغ واحد للبرق، إلا أن الحقيقة هي حصول عدد من الضربات المتعاقبة السريعة تسلك المسار نفسه في الهواء (هل تعلم ص 181).', 'قد يصل طول شرارة البرق إلى عدة كيلومترات بقطر 10–15 cm وبقدرة 4×10⁹ kW (ص 180).', 'معدل زمن حدوث الصاعقة يساوي 1/4 s (ص 180).'],
  quiz: [
    { q: 'نرى البرق قبل سماع الرعد لأن:', o: ['سرعة الضوء أكبر بكثير من سرعة الصوت', 'الرعد يحدث بعد البرق', 'الصوت لا ينتقل في المطر'], a: 0, why: 'س10 ص 185.' },
    { q: 'التفريغ الكهربائي بين السحابة وجسم على سطح الأرض يسمى:', o: ['صاعقة', 'برقاً', 'رعداً'], a: 0, why: 'ص 180.' },
    { q: 'يعتمد عمل مانعة الصواعق على:', o: ['فعل الأسنة (الرؤوس المدببة)', 'العزل الجيد', 'المغناطيسية'], a: 0, why: 'ص 181.' },
    { q: 'في المرشح الكهروستاتيكي تُشحن دقائق الدخان بشحنة سالبة وتنجذب إلى:', o: ['ألواح فلزية موجبة', 'أسلاك سالبة', 'المطرقة'], a: 0, why: 'الشكل 21-9.' }],
  parts: [{ id: 'g10_e_storm', n: 'البرق والرعد والصاعقة ومانعة الصواعق' }, { id: 'g10_e_apps', n: 'المرشح الكهروستاتيكي وجهاز الاستنساخ الضوئي' }] });
M8.merge({ id: 'g10_es_review', ch: 49, reg: X10, sec: 'أسئلة الفصل التاسع ومسائله', page: 183, kind: 'مثال',
  title: 'مسائل الفصل التاسع وأسئلته المقالية خطوة خطوة',
  desc: 'نحل المسائل الست ونجيب عن الأسئلة من س3 إلى س11 خطوة خطوة مع رسم لكل منها: تقاطع خطوط القوة، الجهد داخل الكرة، الجهد الصفري، الصاعقة، البرق والرعد.',
  tags: 'أسئلة الفصل التاسع مسائل علل',
  fact: ['أسئلة الاختيار والصح والخطأ (س1 و س2) موزعة على اختبارات الأقسام السابقة (ص 183–185).'],
  quiz: [
    { q: 'فرق الجهد بين A و B هو 60 V والنقطة A أعلى جهداً. الشغل لنقل بروتون من A إلى B:', o: ['−9.6×10⁻¹⁸ J', '+9.6×10⁻¹⁸ J', '60 J'], a: 0, why: 'مسألة 3 ص 186.' },
    { q: 'المجال داخل كرة معدنية مجوفة مشحونة صفر، فالجهد داخلها:', o: ['ثابت يساوي جهد سطحها', 'صفر', 'يتغير من نقطة إلى أخرى'], a: 0, why: 'س11 ص 185.' },
    { q: 'إذا كان جهد نقطة صفراً فالمجال فيها:', o: ['ليس بالضرورة صفراً', 'صفر حتماً', 'لا نهائي'], a: 0, why: 'س6 ص 185.' }],
  parts: [{ id: 'g10_e_review', n: 'المسائل م1–م6 والأسئلة س3–س11' }] });
