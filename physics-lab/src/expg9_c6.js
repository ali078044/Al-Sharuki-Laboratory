'use strict';
/* ====================== الثالث المتوسط — الفصل السادس: الكهربائية والمغناطيسية (ch 36, ص 111–132) ======================
   Merged experiments (book order): g9_c6_oersted (1-6) · g9_c6_wire (2-6) · g9_c6_coil (3-6) · g9_c6_emag (4-6)
   · g9_c6_uses (5-6) · g9_c6_induct (6-6) · g9_c6_gen (7-6) · g9_c6_review (أسئلة الفصل ص 129–132).
   Local kit Q36 = Q35 (circuits, galvanometer…) + a cardboard plane in perspective on which straight current elements pierce:
   exact 2-D field (ψ = Σ I ln r, contours = field lines), iron filings that settle when the card is tapped, plotting compasses,
   coils (helix), the right hand, and a rotor (coil + magnet + slip rings / commutator) shared by the generator and the motor.
   Q42 / Q41 (grade-10 kits that load later) are used only inside functions. */
LW({ id: 'g9_l6_oersted', cat: 36, name: 'استنتاج أورستد', fx: 'تيار كهربائي في سلك ⟸ مجال مغناطيسي حوله', sym: 'انسياب تيار كهربائي في سلك موصل يولد حوله مجالاً مغناطيسياً (أورستد 1820). انحراف الإبرة المغناطيسية يدل على وجود المجال، وعودتها عند قطع التيار تدل على أن التيار هو الذي ولّده.' });
LW({ id: 'g9_l6_wire', cat: 36, name: 'المجال حول سلك مستقيم', fx: '<i>B</i> = ' + FR('<i>μ</i><sub>0</sub> <i>I</i>', '2π <i>r</i>') + ' (للاطلاع)', sym: 'خطوط المجال دوائر متحدة المركز مركزها السلك وبمستوٍ عمودي عليه. يزداد المجال بزيادة التيار، ويقل بالابتعاد عن السلك، واتجاهه يعتمد على اتجاه التيار ويحدد بقاعدة الكف اليمنى: الإبهام باتجاه التيار ولف الأصابع باتجاه المجال.', calc: { in: [['I', 'التيار I', 'A', 5], ['r', 'البعد عن السلك r', 'm', .02]], out: 'المجال B', u: 'T', f: v => 2e-7 * v.I / v.r } });
LW({ id: 'g9_l6_sol', cat: 36, name: 'المجال داخل ملف حلزوني', fx: '<i>B</i> = <i>μ</i><sub>0</sub> ' + FR('<i>N</i>', '<i>L</i>') + ' <i>I</i> (للاطلاع)', sym: 'داخل الملف خطوط مستقيمة متوازية، وخارجه خطوط مقفلة تشبه مجال الساق المغناطيسية. يتناسب المجال طردياً مع التيار ومع عدد اللفات في وحدة الطول. قاعدة الكف اليمنى للملف: لف الأصابع باتجاه التيار فيشير الإبهام إلى القطب الشمالي.', calc: { in: [['N', 'عدد اللفات N', '', 200], ['L', 'طول الملف L', 'm', .1], ['I', 'التيار I', 'A', 2]], out: 'المجال داخل الملف B', u: 'T', f: v => 4e-7 * Math.PI * v.N / v.L * v.I } });
LW({ id: 'g9_l6_emag', cat: 36, name: 'المغناطيس الكهربائي', fx: 'قلب حديد مطاوع + ملف معزول + تيار = مغناطيس مؤقت', sym: 'المغناطيس الكهربائي مغناطيس مؤقت يزول بزوال التيار. يعتمد مجاله على: عدد لفات الملف لوحدة الطول، ونوع مادة القلب، ومقدار التيار. يزداد المجال بين القطبين عندما يكون بشكل حرف U. الفولاذ يحتفظ بمغناطيسيته مدة أطول.' });
LW({ id: 'g9_l6_induct', cat: 36, name: 'الحث الكهرومغناطيسي', fx: 'تغير المجال المغناطيسي عبر دائرة مقفلة ⟸ قوة دافعة كهربائية محتثة (emf) ⟸ تيار محتث', sym: 'ظاهرة توليد فولطية محتثة عبر موصل في مجال مغناطيسي متغير أو بحركة نسبية بين الموصل والمجال. لا يتولد التيار عند تحريك السلك موازياً لخطوط المجال ولا عند السكون. يزداد التيار المحتث بزيادة سرعة الحركة وعدد اللفات وقوة المغناطيس (فراداي 1831).' });
LW({ id: 'g9_l6_gen', cat: 36, name: 'المولد والمحرك الكهربائي', fx: 'المولد: طاقة ميكانيكية ⟶ طاقة كهربائية ، المحرك: طاقة كهربائية ⟶ طاقة ميكانيكية', sym: 'المولد يعمل على مبدأ الحث الكهرومغناطيسي: حلقتا الزلق تعطيان تياراً متناوباً والمبادل (نصفا حلقة) يعطي تياراً مستمراً. المحرك يعمل على مبدأ القوة المغناطيسية المؤثرة في سلك يحمل تياراً في مجال مغناطيسي، والمبادل يجعله يدور باتجاه واحد.' });

const Q36 = Object.assign(Object.create(Q35), {
  VC: '#6d28d9',
  card(ctx, S, L, o) { return Q31.card(ctx, S, L, Object.assign({ bd: '#7c3aed' }, o || {})); },
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#6d28d9', y); },
  chips(S, id, list, y, cur, click, o = {}) { return Q42.chips(S, id, list, y, cur, click, Object.assign({ col: '#6d28d9' }, o)); },
  drawChips(ctx, list) { list.forEach(b => Q31.drawBtn(ctx, b, b._lab, b._on ? (b._col || '#6d28d9') : '#64748b', b._on)); },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f5f3ff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  ease(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  arr(ctx, x1, y1, x2, y2, col = '#dc2626', w = 2.4, hd = 9) { K.raw(ctx, () => G.arrow(ctx, x1, y1, x2, y2, col, w, hd)); },
  line(ctx, pts, col = '#334155', w = 2, dash) { K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]); }); },
  /* inset frame with a title */
  frame(ctx, x, y, w, h, title, col = '#6d28d9') { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.16)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 3; ctx.fillStyle = 'rgba(255,255,255,.94)'; rr(ctx, x, y, w, h, 12); ctx.fill(); ctx.restore(); ctx.strokeStyle = col; ctx.lineWidth = 1.5; rr(ctx, x, y, w, h, 12); ctx.stroke(); }); if (title) Q33.T(ctx, title, x + w / 2, y + 14, { s: 11, w: 900, c: '#fff', bg: col }); },
  /* wooden bench top */
  table(ctx, x, y, w, h) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.2)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 5; const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#f3e3c3'); g.addColorStop(1, '#dcc29a'); ctx.fillStyle = g; rr(ctx, x, y, w, h, 14); ctx.fill(); ctx.restore();
    ctx.strokeStyle = 'rgba(146,98,47,.18)'; ctx.lineWidth = 1.2; for (let k = 0; k < 9; k++) { const yy = y + 14 + k * (h - 28) / 8; ctx.beginPath(); ctx.moveTo(x + 10, yy); ctx.bezierCurveTo(x + w * .3, yy + 5, x + w * .6, yy - 5, x + w - 10, yy + 2); ctx.stroke(); } }); },
  /* thick copper rod (vertical or any segment) */
  copper(ctx, x1, y1, x2, y2, wd = 10) { K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = wd + 3; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.strokeStyle = '#d97706'; ctx.lineWidth = wd; ctx.stroke(); ctx.strokeStyle = 'rgba(254,243,199,.75)'; ctx.lineWidth = wd * .28; const a = Math.atan2(y2 - y1, x2 - x1), ox = -Math.sin(a) * wd * .22, oy = Math.cos(a) * wd * .22; ctx.beginPath(); ctx.moveTo(x1 - ox, y1 - oy); ctx.lineTo(x2 - ox, y2 - oy); ctx.stroke(); ctx.restore(); }); },
  /* ⊙ / ⊗ cross-section of a wire; I>0 → out of the page */
  dot(ctx, x, y, r, I) { K.raw(ctx, () => { const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 1, x, y, r); g.addColorStop(0, '#fde68a'); g.addColorStop(1, '#b45309'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.strokeStyle = ctx.fillStyle = '#1e1b4b'; ctx.lineWidth = 2; if (I > 0) { ctx.beginPath(); ctx.arc(x, y, r * .25, 0, TAU); ctx.fill(); } else if (I < 0) { const q = r * .5; ctx.beginPath(); ctx.moveTo(x - q, y - q); ctx.lineTo(x + q, y + q); ctx.moveTo(x + q, y - q); ctx.lineTo(x - q, y + q); ctx.stroke(); } }); },
  /* ---------- the cardboard plane in perspective ----------
     plane coords (u → right, v → away from the viewer, z up). g = {cx, cy, W, Dp, k, kz, sk} */
  pg(cx, cy, W, Dp) { return { cx, cy, W, Dp, k: .5, kz: .92, sk: .28, R: [-W, -Dp, W, Dp] }; },
  P(g, u, v, z = 0) { return [g.cx + u + v * g.sk * g.k, g.cy - v * g.k - z * g.kz]; },
  sdir(g, bu, bv) { return Math.atan2(-bv * g.k, bu + bv * g.sk * g.k); }, // plane vector → screen angle
  board(ctx, g, o = {}) { const c = [Q36.P(g, -g.W, g.Dp), Q36.P(g, g.W, g.Dp), Q36.P(g, g.W, -g.Dp), Q36.P(g, -g.W, -g.Dp)];
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.22)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 8; ctx.fillStyle = '#a8946d'; ctx.beginPath(); ctx.moveTo(c[3][0], c[3][1]); ctx.lineTo(c[2][0], c[2][1]); ctx.lineTo(c[2][0], c[2][1] + 7); ctx.lineTo(c[3][0], c[3][1] + 7); ctx.closePath(); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#c9b48a'; ctx.beginPath(); ctx.moveTo(c[2][0], c[2][1]); ctx.lineTo(c[1][0], c[1][1]); ctx.lineTo(c[1][0], c[1][1] + 7); ctx.lineTo(c[2][0], c[2][1] + 7); ctx.closePath(); ctx.fill();
      const gg = ctx.createLinearGradient(0, c[0][1], 0, c[3][1]); gg.addColorStop(0, '#efe6cf'); gg.addColorStop(1, '#fbf7ec'); ctx.fillStyle = gg; ctx.beginPath(); c.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(120,96,58,.55)'; ctx.lineWidth = 1.2; ctx.stroke(); });
    if (o.hole) o.hole.forEach(q => { const p = Q36.P(g, q[0], q[1]); K.raw(ctx, () => { ctx.fillStyle = 'rgba(30,27,75,.35)'; ctx.beginPath(); ctx.ellipse(p[0], p[1], 9, 4.5, 0, 0, TAU); ctx.fill(); }); }); },
  SC: 5e-4, // metres per plane unit (px)
  /* field (tesla) of straight currents piercing the plane: ws = [{u, v, I}] with I>0 going up through the card */
  B(ws, u, v) { let bu = 0, bv = 0; for (const w of ws) { const du = u - w.u, dv = v - w.v, r2 = du * du + dv * dv + 16, f = 2e-7 * w.I / (Q36.SC * r2); bu -= f * dv; bv += f * du; } return [bu, bv]; },
  /* contour lines of ψ = Σ I ln r (= field lines), chained into polylines and oriented along B; cached in C */
  contours(C, key, ws, R, st, lv, rs = 8) {
    if (C.key === key) return C.res;
    const nx = Math.ceil((R[2] - R[0]) / st), ny = Math.ceil((R[3] - R[1]) / st), NX = nx + 1, F = new Float64Array(NX * (ny + 1)), bad = new Uint8Array(NX * (ny + 1));
    for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) { const u = R[0] + i * st, v = R[1] + j * st; let p = 0, b = 0; for (const w of ws) { const r2 = (u - w.u) ** 2 + (v - w.v) ** 2; if (r2 < rs * rs) b = 1; p += w.I * .5 * Math.log(r2 + 1e-9); } F[j * NX + i] = p; bad[j * NX + i] = b; }
    const lev = new Map(), E = (i, j, d) => (j * NX + i) * 2 + d;
    const pt = (e, L) => { const d = e & 1, n = e >> 1, i = n % NX, j = (n - i) / NX, a = F[n], b = d ? F[n + NX] : F[n + 1], t = clamp((L - a) / ((b - a) || 1e-12), 0, 1); return d ? [R[0] + i * st, R[1] + (j + t) * st] : [R[0] + (i + t) * st, R[1] + j * st]; };
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const n0 = j * NX + i; if (bad[n0] || bad[n0 + 1] || bad[n0 + NX] || bad[n0 + NX + 1]) continue;
      const a = F[n0], b = F[n0 + 1], c = F[n0 + NX + 1], d = F[n0 + NX], mn = Math.min(a, b, c, d), mx = Math.max(a, b, c, d);
      for (let k = Math.ceil(mn / lv); k * lv <= mx; k++) { const L = k * lv, es = [];
        if ((a < L) !== (b < L)) es.push(E(i, j, 0)); if ((b < L) !== (c < L)) es.push(E(i + 1, j, 1)); if ((d < L) !== (c < L)) es.push(E(i, j + 1, 0)); if ((a < L) !== (d < L)) es.push(E(i, j, 1));
        if (es.length < 2) continue; let m = lev.get(k); if (!m) lev.set(k, m = new Map());
        const add = (p, q) => { if (!m.has(p)) m.set(p, []); if (!m.has(q)) m.set(q, []); m.get(p).push(q); m.get(q).push(p); }; add(es[0], es[1]); if (es.length === 4) add(es[2], es[3]); } }
    const res = [];
    lev.forEach((m, k) => { const L = k * lv, seen = new Set();
      const walk = s => { const pts = [pt(s, L)]; seen.add(s); let prev = -1, cur = s; for (let n = 0; n < 20000; n++) { const nb = m.get(cur).filter(q => q !== prev && !seen.has(q)); if (!nb.length) { if (m.get(cur).includes(s) && pts.length > 3) pts.push(pts[0]); break; } prev = cur; cur = nb[0]; seen.add(cur); pts.push(pt(cur, L)); } return pts; };
      m.forEach((nb, e) => { if (!seen.has(e) && nb.length === 1) res.push(walk(e)); }); m.forEach((nb, e) => { if (!seen.has(e)) res.push(walk(e)); }); });
    res.forEach(p => { if (p.length < 3) return; const i = p.length >> 1, b = Q36.B(ws, p[i][0], p[i][1]); if ((p[i + 1 < p.length ? i + 1 : i][0] - p[i - 1][0]) * b[0] + (p[i + 1 < p.length ? i + 1 : i][1] - p[i - 1][1]) * b[1] < 0) p.reverse(); });
    C.key = key; C.res = res.filter(p => p.length > 2); return C.res;
  },
  drawCont(ctx, g, lines, o = {}) { const col = o.col || '#4338ca'; K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = col; ctx.globalAlpha = o.alpha ?? .85; ctx.lineWidth = o.lw || 1.6; ctx.lineJoin = 'round'; ctx.beginPath();
    const S2 = lines.map(p => p.map(q => Q36.P(g, q[0], q[1]))); S2.forEach(p => { ctx.moveTo(p[0][0], p[0][1]); for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]); }); ctx.stroke(); ctx.globalAlpha = 1; if (o.arrows !== false) S2.forEach(p => MAG9.arrowsOn(ctx, p, col, 5.5, o.every || 150)); ctx.restore(); }); },
  /* iron filings on the plane; set = 0 (scattered) … 1 (aligned) */
  FIL: null,
  filPts() { if (!Q36.FIL) { const r = MAG9.rng(23); Q36.FIL = Array.from({ length: 2600 }, () => ({ u: r(), v: r(), a: r() * Math.PI, q: r(), l: .7 + .6 * r() })); } return Q36.FIL; },
  filings(ctx, g, C, key, ws, set, o = {}) { const R = g.R;
    if (C.key !== key) { C.key = key; C.res = Q36.filPts().slice(0, o.n || 1500).map(f => { const u = R[0] + 6 + f.u * (R[2] - R[0] - 12), v = R[1] + 6 + f.v * (R[3] - R[1] - 12); if (o.skip && o.skip(u, v)) return null; const b = Q36.B(ws, u, v), m = Math.hypot(b[0], b[1]); return { u, v, a0: f.a, ab: Math.atan2(b[1], b[0]), p: clamp(Math.sqrt(m / (o.ref || 3e-5)), 0, 1), l: f.l }; }).filter(Boolean); }
    const jig = o.jig || 0;
    K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = '#27272a'; ctx.lineWidth = 1.25; ctx.lineCap = 'round'; ctx.beginPath(); C.res.forEach((f, i) => { const al = clamp(set * f.p * 1.5, 0, 1); let d = f.ab - f.a0; d = ((d % Math.PI) + 1.5 * Math.PI) % Math.PI - Math.PI / 2; const a = f.a0 + d * al + (jig ? Math.sin(i * 7.3 + jig * 40) * jig * .8 : 0), L = 3.4 * f.l, du = Math.cos(a) * L, dv = Math.sin(a) * L;
      const p1 = Q36.P(g, f.u - du, f.v - dv), p2 = Q36.P(g, f.u + du, f.v + dv); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); }); ctx.stroke(); ctx.restore(); }); },
  /* plotting compass lying on the plane: st = {a, w} screen angle state */
  pcomp(ctx, g, u, v, a, r = 11) { const p = Q36.P(g, u, v); K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(15,23,42,.18)'; ctx.beginPath(); ctx.ellipse(p[0] + 2, p[1] + 3, r, r * .75, 0, 0, TAU); ctx.fill(); ctx.restore(); }); MAG9.miniCompass(ctx, p[0], p[1], r, a); },
  needleTarget(g, b, earth) { return Q36.sdir(g, b[0], b[1] + earth); },
  /* right hand gripping a rod whose axis points along screen angle ang (thumb along ang) */
  rhand(ctx, x, y, ang, s = 1) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang + Math.PI / 2); ctx.scale(s, s); const skin = '#f2c29b', dk = '#b9774f';
    ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; ctx.fillStyle = '#0ea5e9'; rr(ctx, 20, -10, 34, 36, 7); ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.fillStyle = skin; ctx.strokeStyle = dk; ctx.lineWidth = 1.4; rr(ctx, -24, -16, 50, 44, 14); ctx.fill(); ctx.stroke();
    for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? '#eeb48a' : skin; rr(ctx, -30, -12 + i * 10, 40, 10, 5); ctx.fill(); ctx.stroke(); }
    ctx.fillStyle = skin; rr(ctx, 6, -58, 14, 48, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fde7d6'; rr(ctx, 8.5, -55, 9, 10, 3); ctx.fill(); ctx.restore(); }); },
  /* curl arrow around a vertical rod (front half drawn), dir +1 → front moves right */
  curl(ctx, x, y, rx, ry, dir, col = '#dc2626') { K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, .15 * Math.PI, .85 * Math.PI); ctx.stroke(); ctx.globalAlpha = .45; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 1.1 * Math.PI, 1.9 * Math.PI); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    const t = dir > 0 ? .2 * Math.PI : .8 * Math.PI, px = x + rx * Math.cos(t), py = y + ry * Math.sin(t); MAG9.arrowHead(ctx, px, py, dir > 0 ? -.35 : Math.PI + .35, 9, col); ctx.restore(); }); },
  /* horizontal helix (coil) from x0 to x1 around axis y; pass 'back' | 'front' */
  coilH(ctx, x0, x1, y, R, n, pass, o = {}) { const st = 40, tot = n * st, pitch = (x1 - x0) / n, sl = o.sl ?? .28;
    K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; const seg = (lw, col) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); let on = false;
        for (let i = 0; i <= tot; i++) { const f = i / st * TAU, x = x0 + pitch * i / st + R * sl * Math.sin(f), yy = y - R * Math.cos(f), fr = Math.sin(f) > 0; if (fr === (pass === 'front')) { if (!on) { ctx.moveTo(x, yy); on = true; } else ctx.lineTo(x, yy); } else on = false; } ctx.stroke(); };
      if (pass === 'front') { seg(o.w || 4.5, o.dk || '#7c2d12'); seg((o.w || 4.5) - 1.8, o.col || '#ea580c'); seg(1.1, 'rgba(255,237,213,.8)'); } else { seg(o.w || 4.5, '#5b2109'); seg((o.w || 4.5) - 2, '#9a3412'); } ctx.restore(); }); },
  /* soft-iron / steel / copper core bar */
  core(ctx, x, y, w, h, kind) { const C = { fe: ['#e5e7eb', '#9ca3af', '#4b5563'], st: ['#cbd5e1', '#64748b', '#1e293b'], cu: ['#fed7aa', '#ea580c', '#7c2d12'], al: ['#f1f5f9', '#cbd5e1', '#94a3b8'] }[kind] || ['#e5e7eb', '#9ca3af', '#4b5563'];
    K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y - h / 2, 0, y + h / 2); g.addColorStop(0, C[0]); g.addColorStop(.45, C[1]); g.addColorStop(1, C[2]); ctx.fillStyle = g; rr(ctx, x, y - h / 2, w, h, 3); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.45)'; ctx.lineWidth = 1; ctx.stroke(); }); },
  /* push-button / key switch drawn compactly; returns terminals */
  key(ctx, x, y, on, lab) { K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; rr(ctx, x - 26, y - 12, 52, 24, 7); ctx.fill(); ctx.fillStyle = on ? '#16a34a' : '#dc2626'; ctx.beginPath(); ctx.arc(x, y - (on ? 2 : 6), 9, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke(); }); if (lab) Q33.T(ctx, lab, x, y + 24, { s: 10, w: 900, c: on ? '#15803d' : '#b91c1c' }); return { a: [x - 26, y], b: [x + 26, y] }; },
  /* rolling trace (time graph) inside box */
  trace(ctx, x, y, w, h, data, o = {}) { K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#0f172a'; rr(ctx, x, y, w, h, 8); ctx.fill(); ctx.strokeStyle = 'rgba(148,163,184,.25)'; ctx.lineWidth = 1; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x, y + h * k / 4); ctx.lineTo(x + w, y + h * k / 4); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(226,232,240,.6)'; ctx.beginPath(); ctx.moveTo(x + 6, y + h / 2); ctx.lineTo(x + w - 6, y + h / 2); ctx.stroke(); (o.sets || [[data, o.col || '#4ade80']]).forEach(([d, c]) => { if (!d.length) return; ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.beginPath(); d.forEach((v, i) => { const xx = x + 6 + (w - 12) * i / Math.max(1, (o.n || d.length) - 1), yy = y + h / 2 - clamp(v, -1.1, 1.1) * (h / 2 - 6); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke(); }); ctx.restore(); });
    if (o.lab) Q33.T(ctx, o.lab, x + w / 2, y - 10, { s: 10.5, w: 900, c: '#334155' }); if (o.tl) Q33.T(ctx, o.tl, x + w - 18, y + h / 2 + 10, { s: 9.5, w: 800, c: '#cbd5e1' }); }
});

/* =============== A1 — تجربة أورستد (نشاط 1، الشكلان 1 و 2، ص 113–114) =============== */
(() => {
  const BE = 3e-5; // horizontal component of the earth's field (T)
  const D = { id: 'g9_em_oersted', page: 113, fig: 'الشكلان 1 و 2',
    desc: 'نترك الإبرة المغناطيسية حرة لتتجه بموازاة خطوط المجال المغناطيسي الأرضي، ونجعل السلك الغليظ فوقها موازياً لمحورها، ونربط طرفيه بين قطبي بطارية 1.5 V عبر مفتاح. عند غلق المفتاح لبرهة تنحرف الإبرة ثم تستقر بوضع عمودي تقريباً على طول السلك، وتعود إلى وضعها السابق بعد انقطاع التيار. عكس القطبية أو وضع السلك تحت الإبرة يعكس الانحراف. الاستنتاج: انسياب تيار كهربائي في سلك موصل يولد حوله مجالاً مغناطيسياً.',
    tags: 'تجربة أورستد 1820 إبرة مغناطيسية سلك غليظ بطارية 1.5V مفتاح انحراف الإبرة التأثير المغناطيسي للتيار عكس القطبية فوق الإبرة تحت الإبرة فكر',
    tools: ['إبرة مغناطيسية على حامل مدبب', 'سلك غليظ طوله 30 cm', 'بطارية 1.5 V', 'أسلاك توصيل', 'مفتاح كهربائي'],
    steps: ['لاحظ الإبرة حرة: تتجه شمال–جنوب، والسلك الغليظ فوقها وموازٍ لها.', 'اضغط على المفتاح (أو «أغلق المفتاح لبرهة»): تنحرف الإبرة ثم تعود عند فتحه.', 'اضغط على البطارية لعكس قطبيتها: تنحرف الإبرة بالاتجاه المعاكس.', 'اسحب السلك في المنظر الجانبي إلى تحت الإبرة، أو اختر «السلك تحت الإبرة»، وكرر.', 'غيّر التيار والبعد من اللوحة الجانبية: تيار أكبر أو سلك أقرب ⟸ انحراف أكبر.'],
    concl: ['انسياب تيار كهربائي في سلك موصل يولد حوله مجالاً مغناطيسياً (استنتاج أورستد).', 'انحراف الإبرة يدل على تأثرها بعزم قوة مغناطيسية، وعودتها عند قطع التيار تدل على أن التيار ولّد المجال.', 'عكس اتجاه التيار، أو نقل السلك من فوق الإبرة إلى تحتها، يعكس اتجاه الانحراف.', 'فكر: السلك الغليظ مقاومته صغيرة فيمر تيار كبير ومجال واضح، ونغلق الدائرة لبرهة كي لا تفرغ البطارية ويسخن السلك.'],
    laws: ['g9_l6_oersted'],
    controls: [R('I', 'التيار في السلك الغليظ I', .5, 10, 4, .5, 'A'), R('d', 'بعد السلك عن الإبرة d', 1, 5, 1.5, .5, 'cm'), TG('fld', 'خطوط المجال في المنظر الجانبي', true, null, 'magnet')],
    setup(S) { S.on = 0; S.pol = 1; S.pos = 'up'; S.nd = { a: -Math.PI / 2, w: 0 }; S.heat = 0; S.blip = 0; S.ph = 0; },
    Bw(S) { return S.on ? 2e-7 * S.p.I / (S.p.d / 100) : 0; },
    th(S) { return Math.atan2(D.Bw(S), BE); },
    sgn(S) { return (S.pos === 'up' ? -1 : 1) * S.pol; }, // −1 → north end swings west (left)
    update(S, dt) { MAG9.turn(S.nd, -Math.PI / 2 + D.sgn(S) * D.th(S), dt, 40, 4.5); if (S.blip > 0) { S.blip -= dt; if (S.blip <= 0) S.on = 0; }
      S.heat = Q36.ease(S.heat, S.on ? S.p.I / 10 : 0, dt, S.on ? .35 : .6); S.ph += dt * (S.on ? 40 + S.p.I * 6 : 0); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), xr = w - 340, cx = L + (xr - L) / 2 + 10; return { w, h, L, xr, cx, y0: 108, y1: 432, ny: 270, by: 500, ry: 560, ix: w - 332, iy: 352, iw: 320, ih: 250 }; },
    path(S, g) { // conventional current path (battery + → … → −)
      const bat = [g.cx + 105, g.by], tl = [g.cx + 62, g.by], tr = [g.cx + 148, g.by], swa = [g.cx - 150, g.by], swb = [g.cx - 80, g.by];
      const loop = [tr, [g.cx + 190, g.by], [g.cx + 190, g.y0 - 30], [g.cx, g.y0 - 30], [g.cx, g.y1 + 28], [g.cx - 40, g.y1 + 28], [g.cx - 40, g.by], swb, swa, [g.cx - 190, g.by], [g.cx - 190, g.ry], [g.cx + 62, g.ry], tl];
      return { bat, tl, tr, swa, swb, pts: S.pol > 0 ? loop.slice().reverse() : loop };
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), th = D.th(S), P = D.path(S, g); Q36.bg(ctx, w, h);
      Q36.table(ctx, g.L + 14, 84, g.xr - g.L - 4, 516);
      // compass rose
      Q36.arr(ctx, g.L + 52, 160, g.L + 52, 112, '#b91c1c', 2.6, 10); Q33.T(ctx, 'N', g.L + 52, 100, { s: 13, w: 900, c: '#b91c1c' }); Q33.T(ctx, 'الشمال', g.L + 52, 176, { s: 10, w: 800, c: '#7f1d1d' });
      // leads & battery & switch
      Q33.wire(ctx, [[g.cx, g.y0], [g.cx, g.y0 - 30], [g.cx + 190, g.y0 - 30], [g.cx + 190, g.by], P.tr]);
      Q33.wire(ctx, [[g.cx, g.y1], [g.cx, g.y1 + 28], [g.cx - 40, g.y1 + 28], [g.cx - 40, g.by], P.swb]);
      Q33.wire(ctx, [P.swa, [g.cx - 190, g.by], [g.cx - 190, g.ry], [g.cx + 62, g.ry], P.tl]);
      Q33.cell(ctx, P.bat[0], P.bat[1], { pos: S.pol > 0 ? -1 : 1, V: 1.5 });
      Q33.sw(ctx, P.swa[0], P.swb[0], g.by, !!S.on);
      if (S.on) Q33.flow(ctx, P.pts, S.ph, 'c', { sp: 30 });
      // pivot stand + needle (top view), wire above or below
      const stand = () => K.raw(ctx, () => { const gr = ctx.createRadialGradient(g.cx - 8, g.ny - 8, 2, g.cx, g.ny, 30); gr.addColorStop(0, '#fde68a'); gr.addColorStop(1, '#92400e'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.cx, g.ny, 28, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.stroke(); });
      const needle = () => K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 4; MAG9.needle(ctx, g.cx, g.ny, S.nd.a, 104, 1, { w: 11 }); ctx.restore(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(g.cx, g.ny, 5, 0, TAU); ctx.fill(); });
      const wire = () => { K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.15)'; ctx.fillRect(g.cx - 3, g.y0, 14, g.y1 - g.y0); }); Q36.copper(ctx, g.cx, g.y0, g.cx, g.y1, 11);
        if (S.on) for (let k = 0; k < 3; k++) { const yy = g.y0 + 40 + k * 120; Q36.arr(ctx, g.cx + 20, yy + (S.pol > 0 ? 30 : 0), g.cx + 20, yy + (S.pol > 0 ? 0 : 30), '#dc2626', 2.4, 8); } };
      stand(); if (S.pos === 'up') { needle(); wire(); } else { wire(); needle(); }
      if (S.on) Q33.T(ctx, 'I', g.cx + 34, g.y0 + 60, { s: 13, w: 900, c: '#dc2626' });
      Q33.T(ctx, 'السلك الغليظ ' + (S.pos === 'up' ? 'فوق الإبرة' : 'تحت الإبرة'), g.cx, g.y0 - 50, { s: 11.5, w: 900, c: '#fff', bg: '#9a3412' });
      if (S.heat > .05) { Q33.T(ctx, 'سخونة السلك', g.cx - 92, g.y0 + 28, { s: 10, w: 900, c: '#b91c1c' }); Q34.bar(ctx, g.cx - 130, g.y0 + 40, 76, 10, S.heat, '#ef4444'); }
      // side (end-on) inset — looking from the south towards the north
      const ix = g.ix, iy = g.iy, icx = ix + g.iw / 2, icy = iy + 116, px = 13, wy = icy + (S.pos === 'up' ? -1 : 1) * S.p.d * px, Iw = S.on ? S.pol : 0;
      Q36.frame(ctx, ix, iy, g.iw, g.ih, 'منظر من الجنوب نحو الشمال');
      Q33.T(ctx, 'غرب', ix + 26, icy, { s: 10, w: 900, c: '#64748b' }); Q33.T(ctx, 'شرق', ix + g.iw - 26, icy, { s: 10, w: 900, c: '#64748b' });
      if (S.p.fld && S.on) { const n = 1 + Math.round(S.p.I / 2.5); K.raw(ctx, () => { ctx.strokeStyle = 'rgba(67,56,202,.75)'; ctx.lineWidth = 1.4; for (let k = 1; k <= n; k++) { const r = 12 + k * 15; ctx.beginPath(); ctx.arc(icx, wy, r, 0, TAU); ctx.stroke(); MAG9.arrowHead(ctx, icx, wy + r, -Iw > 0 ? 0 : Math.PI, 6, '#4338ca'); MAG9.arrowHead(ctx, icx, wy - r, -Iw > 0 ? Math.PI : 0, 6, '#4338ca'); } }); }
      K.raw(ctx, () => { ctx.fillStyle = '#78350f'; ctx.fillRect(icx - 3, icy + 4, 6, 70); ctx.fillStyle = '#92400e'; rr(ctx, icx - 30, icy + 72, 60, 10, 4); ctx.fill(); ctx.beginPath(); ctx.moveTo(icx - 5, icy + 6); ctx.lineTo(icx, icy - 2); ctx.lineTo(icx + 5, icy + 6); ctx.fill(); });
      const ex = Math.sin(S.nd.a + Math.PI / 2) * 70; // east-west extent of the needle as seen end-on
      K.raw(ctx, () => { ctx.lineCap = 'round'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(icx - ex, icy); ctx.lineTo(icx, icy); ctx.stroke(); ctx.strokeStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(icx, icy); ctx.lineTo(icx + ex, icy); ctx.stroke(); ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(icx, icy, 6, 0, TAU); ctx.fill(); });
      Q36.dot(ctx, icx, wy, 9, -Iw); if (!S.on) Q36.dot(ctx, icx, wy, 9, 0);
      Q33.T(ctx, 'd = ' + S.p.d + ' cm', icx + 64, (icy + wy) / 2, { s: 10.5, w: 900, c: '#9a3412' });
      Q33.T(ctx, Iw ? (Iw > 0 ? 'التيار مبتعد عن الناظر ⊗' : 'التيار نحو الناظر ⊙') : 'لا تيار', icx, iy + g.ih - 18, { s: 10.5, w: 900, c: '#fff', bg: Iw ? '#b91c1c' : '#64748b' });
      // card
      const deg = Math.round(Math.abs(Math.atan2(Math.cos(S.nd.a), -Math.sin(S.nd.a))) * 180 / Math.PI);
      Q36.card(ctx, S, [{ t: S.on ? 'المفتاح مغلق: يمر تيار في السلك' : 'المفتاح مفتوح: لا تيار', c: S.on ? '#15803d' : '#b91c1c', w: 900 },
        { t: 'B = ' + Q31.sci(D.Bw(S), 2, 'T'), mono: 1 }, { t: 'B = 3×10⁻⁵ T', mono: 1, c: '#64748b' }, { t: 'الأول مجال السلك والثاني المجال الأرضي', c: '#64748b', s: 11 },
        { t: 'انحراف الإبرة عن الشمال: ' + deg + '°', c: '#6d28d9', w: 900 }, { t: S.on ? (D.sgn(S) < 0 ? 'القطب الشمالي للإبرة ينحرف نحو الغرب' : 'القطب الشمالي للإبرة ينحرف نحو الشرق') : 'الإبرة باتجاه المجال الأرضي', c: '#334155' }], { title: 'تجربة أورستد', y: 64, wd: 310 });
      Q36.drawChips(ctx, D.chips(S, g).a); Q36.drawChips(ctx, D.chips(S, g).b);
      Q36.banner(ctx, w, 'اضغط المفتاح لتمرير التيار، واضغط البطارية لعكسها');
    },
    chips(S, g) { return { a: Q36.chips(S, 'pos', [['up', 'السلك فوق الإبرة'], ['down', 'السلك تحت الإبرة'], ['rev', 'عكس قطبية البطارية']], g.h - 84, S.pos, (S2, k) => { if (k === 'rev') S2.pol *= -1; else S2.pos = k; }, { bw: 170 }),
      b: Q36.chips(S, 'sw', [['blip', 'أغلق المفتاح لبرهة'], ['sw', S.on && !(S.blip > 0) ? 'افتح المفتاح' : 'أغلق المفتاح']], g.h - 128, '', (S2, k) => { if (k === 'blip') { S2.on = 1; S2.blip = 2.5; } else { S2.on = S2.on ? 0 : 1; S2.blip = 0; } }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = D.path(S, g), C = D.chips(S, g), icx = g.ix + g.iw / 2, icy = g.iy + 116, wy = icy + (S.pos === 'up' ? -1 : 1) * S.p.d * 13;
      return [{ id: 'swire', x: icx, y: wy, r: 18, axis: 'y', keep: true, tip: 'اسحب السلك فوق الإبرة أو تحتها', idle: 'اسحب ✋', drag: (S2, d) => { const dy = d.y - icy; S2.pos = dy < 0 ? 'up' : 'down'; setParam(S2, 'd', clamp(Math.round(Math.abs(dy) / 13 * 2) / 2, 1, 5)); } },
        { id: 'switch', x: (P.swa[0] + P.swb[0]) / 2, y: g.by, w: 90, h: 44, hint: false, tip: 'اضغط لغلق/فتح المفتاح', click: S2 => { S2.on = S2.on ? 0 : 1; S2.blip = 0; } },
        { id: 'bat', x: P.bat[0], y: P.bat[1], w: 96, h: 40, hint: false, tip: 'اضغط لعكس قطبية البطارية', click: S2 => { S2.pol *= -1; } }].concat(C.a, C.b); },
    readings(S) { return [rd('المفتاح', S.on ? 'مغلق' : 'مفتوح'), rd('التيار I', S.on ? S.p.I + ' A' : '0'), rd('موضع السلك', S.pos === 'up' ? 'فوق الإبرة' : 'تحت الإبرة'), rd('مجال السلك', Q31.sci(D.Bw(S), 2, 'T')), rd('انحراف الإبرة', Math.round(D.th(S) * 180 / Math.PI) + '°')]; },
    record(S) { return { I: S.p.I, d: S.p.d, th: Math.round(D.th(S) * 180 / Math.PI) }; },
    cols: [['I', 'I (A)'], ['d', 'd (cm)'], ['th', 'الانحراف (°)']],
    explain(S) { return Q26.ex('عند مرور التيار تنحرف الإبرة وتقترب من وضع عمودي على السلك، وعند قطعه تعود إلى الشمال. عكس التيار أو نقل السلك تحت الإبرة يعكس الانحراف.', 'التيار يولد حول السلك مجالاً مغناطيسياً دائرياً؛ تحت السلك يكون باتجاه وفوقه بالاتجاه المعاكس. الإبرة تتأثر بالمجالين معاً: مجال السلك والمجال الأرضي، فكلما كبر التيار أو قرب السلك زاد الانحراف.', 'اكتشف أورستد هذا عام 1820 مصادفة أثناء محاضرة، فكان أول ربط بين الكهربائية والمغناطيسية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — تخطيط المجال حول سلك مستقيم: برادة الحديد والبوصلات وقاعدة الكف اليمنى (نشاط 2، الأشكال 3–8) =============== */
(() => {
  const D = { id: 'g9_em_wire', page: 114, fig: 'الأشكال 3–8',
    desc: 'نمرر السلك الغليظ من خلال ورقة مقوى وننثر برادة الحديد حوله، ونغلق الدائرة وننقر على الورقة نقرات خفيفة: تترتب البرادة بشكل دوائر متحدة المركز مركزها السلك وبمستوى عمودي عليه. ونضع بوصلات صغيرة بدل البرادة فتشكل دائرة مركزها السلك، واتجاه أقطابها الشمالية يمثل اتجاه المجال. نعكس قطبية البطارية فتنعكس البوصلات. قاعدة الكف اليمنى: الإبهام باتجاه التيار ولف الأصابع باتجاه المجال.',
    tags: 'نشاط 2 سلك مستقيم برادة الحديد ورقة مقوى بوصلات دوائر متحدة المركز قاعدة الكف اليمنى الإبهام اتجاه التيار لف الأصابع اتجاه المجال عوامل المجال',
    tools: ['ورقة مقوى', 'عدة بوصلات صغيرة', 'سلك غليظ', 'مفتاح كهربائي', 'بطارية مناسبة', 'برادة حديد'],
    steps: ['اضغط المفتاح لتمرير التيار، ثم اضغط على الورقة (أو «انقر على الورقة») عدة مرات: تترتب البرادة دوائر.', 'اختر «البوصلات» ولاحظ اتجاه أقطابها الشمالية حول السلك.', 'اضغط على البطارية لعكس التيار: تنعكس البوصلات (أما البرادة فشكلها لا يتغير).', 'اسحب البوصلة الحمراء الكبيرة نحو السلك وبعيداً عنه: يقوى المجال قرب السلك.', 'فعّل «قاعدة الكف اليمنى»: الإبهام باتجاه التيار والأصابع باتجاه المجال.'],
    concl: ['خطوط المجال حول السلك المستقيم دوائر متحدة المركز مركزها السلك وبمستوى عمودي عليه.', 'اتجاه القطب الشمالي للبوصلة يمثل اتجاه المجال في موضعها.', 'يزداد المجال بزيادة التيار، ويقل بالابتعاد عن السلك، واتجاهه يعتمد على اتجاه التيار.', 'قاعدة الكف اليمنى: الإبهام باتجاه التيار، ولف الأصابع باتجاه المجال.'],
    laws: ['g9_l6_wire'],
    controls: [R('I', 'التيار I', 1, 12, 8, .5, 'A'), TG('hand', 'قاعدة الكف اليمنى', false, null, 'hand'), TG('lines', 'خطوط المجال المرسومة', false, null, 'magnet'), TG('earth', 'تأثير المجال الأرضي على البوصلات', false, null, 'earth')],
    setup(S) { S.on = 0; S.pol = 1; S.mode = 'fil'; S.set = 0; S.setT = 0; S.jig = 0; S.fI = 0; S.cs = []; S.pu = 70; S.pv = -40; S.tu = 70; S.tv = -40; S.ph = 0; S._C = {}; S._F = {}; },
    RING: Array.from({ length: 8 }, (_, i) => [Math.cos(i * TAU / 8) * 100, Math.sin(i * TAU / 8) * 100]),
    ws(S) { return S.on ? [{ u: 0, v: 0, I: S.p.I * S.pol }] : []; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), xr = w - 340, cx = L + (xr - L) / 2 + 20, g = Q36.pg(cx, 330, 160, 180); return Object.assign(g, { w, h, L, xr, yt: 116, yb: 520, by: 560 }); },
    update(S, dt) { S.set = Q36.ease(S.set, S.setT, dt, 2.2); S.jig = Math.max(0, S.jig - dt); S.pu = Q36.ease(S.pu, S.tu, dt, 12); S.pv = Q36.ease(S.pv, S.tv, dt, 12); S.ph += dt * (S.on ? 50 : 0);
      const g = D.geo(S), ws = D.ws(S), e = S.p.earth ? 3e-5 : 1.5e-6, pos = D.RING.concat([[S.pu, S.pv]]);
      pos.forEach((q, i) => { if (!S.cs[i]) S.cs[i] = { a: -1.2, w: 0 }; MAG9.turn(S.cs[i], Q36.needleTarget(g, Q36.B(ws, q[0], q[1]), e), dt, 45, 6); }); },
    path(S, g) { const t = [g.cx, g.yt], b = [g.cx, g.yb], bx = g.cx - 105, swa = [g.cx - 150, g.yt - 26], swb = [g.cx - 80, g.yt - 26];
      const l1 = [[bx + 42, g.by], [g.cx, g.by], b], l2 = [t, [g.cx, g.yt - 26], swb, swa, [g.cx - 205, g.yt - 26], [g.cx - 205, g.by], [bx - 42, g.by]], rv = a => a.slice().reverse(); return { bx, swa, swb, l1: S.pol > 0 ? l1 : rv(l1), l2: S.pol > 0 ? l2 : rv(l2) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.path(S, g), ws = D.ws(S); Q36.bg(ctx, w, h);
      // lower wire (behind board), board, field, upper wire
      Q33.wire(ctx, [[g.cx, g.yb], [g.cx, g.by], [P.bx + 42, g.by]]); Q33.wire(ctx, [[P.bx - 42, g.by], [g.cx - 205, g.by], [g.cx - 205, g.yt - 26], P.swa]); Q33.wire(ctx, [P.swb, [g.cx, g.yt - 26], [g.cx, g.yt]]);
      Q36.copper(ctx, g.cx, g.cy, g.cx, g.yb, 10);
      Q36.board(ctx, g, { hole: [[0, 0]] });
      if (S.mode === 'fil') Q36.filings(ctx, g, S._F, 'f' + S.fI, S.fI ? [{ u: 0, v: 0, I: S.fI }] : [], S.set, { skip: (u, v) => Math.hypot(u, v) < 10, jig: S.jig });
      if (S.p.lines && S.on) Q36.drawCont(ctx, g, Q36.contours(S._C, 'c' + S.p.I * S.pol, ws, g.R, 5, 2.2, 9), { col: '#4338ca', alpha: .8 });
      if (S.mode === 'cmp') D.RING.forEach((q, i) => Q36.pcomp(ctx, g, q[0], q[1], S.cs[i] ? S.cs[i].a : -1.2, 14));
      Q36.copper(ctx, g.cx, g.yt, g.cx, g.cy, 10);
      Q33.cell(ctx, P.bx, g.by, { pos: S.pol > 0 ? 1 : -1, V: 6, label: '6 V' }); Q33.sw(ctx, P.swa[0], P.swb[0], g.yt - 26, !!S.on, { label: '' });
      if (S.on) { Q33.flow(ctx, P.l1, S.ph, 'c', { sp: 30 }); Q33.flow(ctx, P.l2, S.ph, 'c', { sp: 30 }); const up = S.pol > 0; Q36.arr(ctx, g.cx + 18, up ? 200 : 160, g.cx + 18, up ? 160 : 200, '#dc2626', 3, 10); Q33.T(ctx, 'I', g.cx + 32, 180, { s: 13, w: 900, c: '#dc2626' }); }
      // probe compass (big) + reading
      const pp = Q36.P(g, S.pu, S.pv), pc = S.cs[8] ? S.cs[8].a : -1.2; MAG9.compass(ctx, pp[0], pp[1], 20, pc);
      const r = Math.hypot(S.pu, S.pv) * Q36.SC, Bp = S.on ? 2e-7 * S.p.I / r : 0;
      Q33.T(ctx, 'r = ' + (r * 100).toFixed(1) + ' cm', pp[0], pp[1] + 32, { s: 10, w: 900, c: '#fff', bg: '#6d28d9' });
      if (S.p.hand) { Q36.rhand(ctx, g.cx, 214, S.pol > 0 ? -Math.PI / 2 : Math.PI / 2, 1); Q36.curl(ctx, g.cx, 214, 46, 14, S.pol > 0 ? 1 : -1); }
      Q36.card(ctx, S, [{ t: S.on ? 'التيار ' + S.p.I + ' A ' + (S.pol > 0 ? 'نحو الأعلى' : 'نحو الأسفل') : 'لا تيار: المفتاح مفتوح', c: S.on ? '#15803d' : '#b91c1c', w: 900 },
        { t: 'المجال عند البوصلة الكبيرة:', c: '#334155' }, { t: 'B = ' + Q31.sci(Bp, 2, 'T'), mono: 1, c: '#6d28d9', w: 900 },
        { t: 'المجال يزداد بزيادة التيار', c: '#334155', s: 11.5 }, { t: 'ويقل بالابتعاد عن السلك', c: '#334155', s: 11.5 }, { t: 'واتجاهه يتبع اتجاه التيار', c: '#334155', s: 11.5 },
        { t: S.on ? (S.pol > 0 ? 'من الأعلى: عكس عقارب الساعة' : 'من الأعلى: مع عقارب الساعة') : '', c: '#b45309', w: 900 }], { title: 'المجال حول سلك مستقيم', y: 64, wd: 300 });
      const C = D.chips(S, g); Q36.drawChips(ctx, C.m); Q36.drawChips(ctx, C.a);
      if (S.mode === 'fil' && S.on && S.set < .4) Q33.T(ctx, 'اضغط على الورقة لتنقرها ✋', g.cx + 120, g.cy + 120, { s: 11, w: 900, c: '#fff', bg: '#b45309' });
      Q36.banner(ctx, w, 'أغلق المفتاح ثم انقر على الورقة، واسحب البوصلة الكبيرة');
    },
    chips(S, g) { return { m: Q36.chips(S, 'mode', [['fil', 'برادة الحديد'], ['cmp', 'البوصلات'], ['tap', 'انقر على الورقة']], g.h - 128, S.mode, (S2, k) => { if (k === 'tap') D.tap(S2); else S2.mode = k; }, { bw: 160 }),
      a: Q36.chips(S, 'act', [['sw', S.on ? 'افتح المفتاح' : 'أغلق المفتاح'], ['rev', 'عكس التيار'], ['clr', 'ننثر برادة جديدة']], g.h - 84, '', (S2, k) => { if (k === 'sw') S2.on = S2.on ? 0 : 1; else if (k === 'rev') S2.pol *= -1; else { S2.setT = 0; S2.set = 0; S2.fI = 0; } }, { bw: 160 }) }; },
    tap(S) { S.jig = .35; if (S.on) { const I = S.p.I * S.pol; if (S.fI !== I) { S.fI = I; S.set = Math.min(S.set, .15); S.setT = .34; } else S.setT = Math.min(1, S.setT + .34); } else S.setT = Math.max(0, S.setT - .2); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), P = D.path(S, g), pp = Q36.P(g, S.pu, S.pv), C = D.chips(S, g);
      return [{ id: 'probe', x: pp[0], y: pp[1], r: 24, axis: 'xy', keep: true, tip: 'اسحب البوصلة حول السلك', idle: 'اسحب ✋', drag: (S2, d) => { const x = d.ox + d.x - d.sx, y = d.oy + d.y - d.sy, v = (g.cy - y) / g.k, u = x - g.cx - v * g.sk * g.k; let uu = clamp(u, -g.W + 14, g.W - 14), vv = clamp(v, -g.Dp + 14, g.Dp - 14); const r = Math.hypot(uu, vv); if (r < 26) { uu *= 26 / (r || 1); vv *= 26 / (r || 1); } S2.tu = uu; S2.tv = vv; } },
        { id: 'board', x: g.cx + 110, y: g.cy + 50, w: 140, h: 50, hint: false, tip: 'انقر على الورقة نقرة خفيفة', click: S2 => D.tap(S2) },
        { id: 'switch', x: (P.swa[0] + P.swb[0]) / 2, y: g.yt - 26, w: 86, h: 40, hint: false, tip: 'اضغط لغلق/فتح المفتاح', click: S2 => { S2.on = S2.on ? 0 : 1; } },
        { id: 'bat', x: P.bx, y: g.by, w: 90, h: 40, hint: false, tip: 'اضغط لعكس قطبية البطارية', click: S2 => { S2.pol *= -1; } }].concat(C.m, C.a); },
    readings(S) { const r = Math.hypot(S.pu, S.pv) * Q36.SC; return [rd('التيار', S.on ? S.p.I + ' A' : '0'), rd('اتجاه التيار', S.pol > 0 ? 'إلى الأعلى' : 'إلى الأسفل'), rd('بعد البوصلة r', (r * 100).toFixed(1) + ' cm'), rd('المجال B', Q31.sci(S.on ? 2e-7 * S.p.I / r : 0, 2, 'T'))]; },
    record(S) { const r = Math.hypot(S.pu, S.pv) * Q36.SC; return { r: +(r * 100).toFixed(1), B: S.on ? +(2e-7 * S.p.I / r * 1e6).toFixed(1) : 0 }; },
    cols: [['r', 'r (cm)'], ['B', 'B (μT)']],
    graph: { x: 'r', y: 'B', xl: 'البعد عن السلك r (cm)', yl: 'المجال B (μT)' },
    explain(S) { return Q26.ex('البرادة تترتب دوائر حول السلك، والبوصلات تشكل دائرة مركزها السلك وتنعكس عند عكس التيار.', 'التيار يولد مجالاً خطوطه دوائر مقفلة حول السلك في مستوى عمودي عليه. كل بوصلة تتجه مع المجال في موضعها، والمجال يضعف كلما ابتعدنا عن السلك ويقوى بزيادة التيار.', 'قاعدة الكف اليمنى: أمسك السلك بيدك اليمنى والإبهام باتجاه التيار، فتلتف أصابعك باتجاه المجال.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — اتجاه المجال: التيار نحو الناظر ⊙ ومبتعداً عنه ⊗ وعوامل المجال (الشكل 9 + ص 116) =============== */
(() => {
  const D = { id: 'g9_em_dir', page: 116, fig: 'الشكل 9 (a و b)',
    desc: 'إذا انساب تيار مستمر في سلك عمودي على صفحة أفقية فإن خطوط المجال دوائر متحدة المركز حول السلك في مستوى الصفحة، واتجاهها يتوقف على اتجاه التيار: التيار نحو الناظر (خارجاً من الورقة ⊙) يكون المجال عكس عقارب الساعة (a)، والتيار مبتعداً عن الناظر (داخلاً في الورقة ⊗) يكون المجال مع عقارب الساعة (b). ويزداد المجال بزيادة التيار ويقل بالابتعاد عن السلك.',
    tags: 'الشكل 9 نحو الناظر خارج من الورقة داخل في الورقة عكس عقارب الساعة مع عقارب الساعة عوامل المجال المغناطيسي التيار البعد الاتجاه دوائر متحدة المركز',
    tools: ['سلكان عموديان على الورقة', 'مقياس للمجال'],
    steps: ['قارن الشكلين: ⊙ التيار نحو الناظر، ⊗ مبتعداً عنه. لاحظ اتجاه الأسهم على الدوائر.', 'اسحب المجس الأحمر داخل أي من الشكلين: يقوى المجال قرب السلك ويضعف بالابتعاد.', 'غيّر التيار من اللوحة: تزدحم الدوائر (مجال أقوى) كلما زاد التيار.', 'اضغط «عكس التيارين»: ينعكس اتجاه الدوائر.'],
    concl: ['التيار نحو الناظر ⊙: خطوط المجال عكس عقارب الساعة. التيار مبتعداً ⊗: مع عقارب الساعة.', 'يزداد المجال (عدد الخطوط المارة عمودياً في وحدة المساحة) بزيادة التيار.', 'يزداد المجال بالاقتراب من السلك ويقل بالابتعاد عنه.', 'اتجاه المجال يعتمد على اتجاه التيار.'],
    laws: ['g9_l6_wire'],
    controls: [R('I', 'التيار في كل سلك I', 1, 20, 8, 1, 'A'), TG('flow', 'حركة الأسهم على الخطوط', true, null, 'wave'), TG('half', 'منحني نصف التيار للمقارنة', true, null, 'graph')],
    setup(S) { S.sw = 1; S.px = 0; S.py = 0; S.tx = 0; S.ty = 0; S.init = 0; S.ph = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), xr = w - 340, pw = Math.min(190, (xr - L - 30) / 2), xa = L + 16 + pw / 2, xb = xa + pw + 14; return { w, h, L, xr, pw, xa, xb, cy: 82 + pw / 2 + 22, gx: L + 50, gy: 380, gw: xr - L - 70, gh: 200 }; },
    update(S, dt) { const g = D.geo(S); if (!S.init) { S.init = 1; S.px = S.tx = g.xa + 46; S.py = S.ty = g.cy - 30; } S.px = Q36.ease(S.px, S.tx, dt, 12); S.py = Q36.ease(S.py, S.ty, dt, 12); if (S.p.flow) S.ph += dt; },
    which(S, g) { return Math.abs(S.px - g.xa) < Math.abs(S.px - g.xb) ? 'a' : 'b'; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), I = S.p.I; Q36.bg(ctx, w, h);
      [['a', g.xa, S.sw], ['b', g.xb, -S.sw]].forEach(([nm, x, s]) => {
        Q36.frame(ctx, x - g.pw / 2, g.cy - g.pw / 2 - 18, g.pw, g.pw + 36, '');
        K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(x - g.pw / 2 + 2, g.cy - g.pw / 2 - 16, g.pw - 4, g.pw + 32); ctx.clip(); ctx.strokeStyle = '#4338ca'; ctx.lineWidth = 1.6;
          for (let n = 1; n < 30; n++) { const r = 12 * Math.exp(n * 2.6 / I); if (r > g.pw * .7) break; ctx.beginPath(); ctx.arc(x, g.cy, r, 0, TAU); ctx.stroke();
            for (let q = 0; q < 4; q++) { const a = q * Math.PI / 2 + n * .5 + (s > 0 ? -1 : 1) * S.ph * 1.4 * 18 / r, hx = x + Math.cos(a) * r, hy = g.cy + Math.sin(a) * r; MAG9.arrowHead(ctx, hx, hy, a + (s > 0 ? -Math.PI / 2 : Math.PI / 2), 6, '#4338ca'); } } ctx.restore(); });
        Q36.dot(ctx, x, g.cy, 11, s);
        Q33.T(ctx, nm, x - g.pw / 2 + 14, g.cy - g.pw / 2 - 2, { s: 14, w: 900, c: '#6d28d9' });
        Q33.T(ctx, s > 0 ? 'التيار نحو الناظر ⊙' : 'التيار مبتعد عن الناظر ⊗', x, g.cy + g.pw / 2 + 4, { s: 10.5, w: 900, c: '#fff', bg: s > 0 ? '#b91c1c' : '#1d4ed8' });
        Q33.T(ctx, s > 0 ? 'عكس عقارب الساعة' : 'مع عقارب الساعة', x, g.cy - g.pw / 2 - 2, { s: 10.5, w: 900, c: '#4338ca' });
      });
      // probe
      const wh = D.which(S, g), cx0 = wh === 'a' ? g.xa : g.xb, s = wh === 'a' ? S.sw : -S.sw, dx = S.px - cx0, dy = S.py - g.cy, rp = Math.max(12, Math.hypot(dx, dy)), rcm = rp * .1, B = 2e-7 * I / (rcm / 100);
      const L = clamp(B * 6e5, 12, 52), ux = s * dy / rp, uy = -s * dx / rp; Q36.arr(ctx, S.px, S.py, S.px + ux * L, S.py + uy * L, '#dc2626', 3, 10);
      Q41.knob(ctx, S.px, S.py, '#dc2626', 8); Q33.T(ctx, 'B', S.px + ux * L + 10, S.py + uy * L - 8, { s: 12, w: 900, c: '#dc2626' });
      // graph B vs r
      const A = { x: g.gx, y: g.gy, w: g.gw, h: g.gh, xmax: 10, ymax: 200, xs: 1, ys: 20, lxs: 2, lys: 40, xl: 'r (cm)', yl: 'B (μT)' }; const ax = Q41.axes(ctx, A);
      const curve = (Ic, col, dsh) => { const pts = []; for (let r = .8; r <= 10; r += .1) pts.push([ax.X(r), ax.Y(Math.min(200, 2e-7 * Ic / (r / 100) * 1e6))]); Q41.line(ctx, pts, col, 2.4, dsh); };
      if (S.p.half) curve(I / 2, '#94a3b8', [6, 5]); curve(I, '#6d28d9');
      if (rcm <= 10) Q41.dot(ctx, ax.X(rcm), ax.Y(Math.min(200, B * 1e6)), '#dc2626', 6);
      if (S.p.half) Q33.T(ctx, 'I/2', ax.X(1.2), ax.Y(Math.min(190, 2e-7 * I / 2 / .012 * 1e6)) + 14, { s: 10, w: 900, c: '#64748b' });
      Q36.card(ctx, S, [{ t: 'المجس في الشكل ' + wh, c: '#334155', w: 800 }, { t: 'r = ' + rcm.toFixed(1) + ' cm', mono: 1 }, { t: 'B = ' + Q31.sci(B, 3, 'T'), mono: 1, c: '#dc2626', w: 900 },
        { t: 'ضاعف التيار ⟸ يتضاعف المجال', c: '#6d28d9' }, { t: 'ضاعف البعد ⟸ ينقص المجال إلى النصف', c: '#6d28d9' }, { t: 'اعكس التيار ⟸ ينعكس اتجاه المجال', c: '#6d28d9' }], { title: 'عوامل المجال حول السلك', y: 64, wd: 300 });
      Q36.drawChips(ctx, D.chips(S, g)); Q36.banner(ctx, w, 'اسحب المجس الأحمر داخل الشكلين a و b');
    },
    chips(S, g) { return Q36.chips(S, 'c', [['rev', 'عكس التيارين'], ['near', 'المجس قريب 2 cm'], ['far', 'المجس بعيد 4 cm']], g.h - 84, '', (S2, k) => { const x0 = D.which(S2, g) === 'a' ? g.xa : g.xb; if (k === 'rev') S2.sw *= -1; else { S2.tx = x0 + (k === 'near' ? 20 : 40) * 1; S2.ty = g.cy; } }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'probe', x: S.px, y: S.py, r: 20, axis: 'xy', keep: true, tip: 'اسحب المجس', idle: 'اسحب ✋', drag: (S2, d) => { S2.tx = clamp(d.ox + d.x - d.sx, g.xa - g.pw / 2 + 8, g.xb + g.pw / 2 - 8); S2.ty = clamp(d.oy + d.y - d.sy, g.cy - g.pw / 2 + 6, g.cy + g.pw / 2 - 6); } }].concat(D.chips(S, g)); },
    readings(S) { const g = D.geo(S), wh = D.which(S, g), x0 = wh === 'a' ? g.xa : g.xb, r = Math.max(12, Math.hypot(S.px - x0, S.py - g.cy)) * .1; return [rd('الشكل', wh === 'a' ? 'a: ⊙ نحو الناظر' : 'b: ⊗ مبتعد'), rd('التيار I', S.p.I + ' A'), rd('البعد r', r.toFixed(1) + ' cm'), rd('المجال B', Q31.sci(2e-7 * S.p.I / (r / 100), 3, 'T'))]; },
    record(S) { const g = D.geo(S), x0 = D.which(S, g) === 'a' ? g.xa : g.xb, r = Math.max(12, Math.hypot(S.px - x0, S.py - g.cy)) * .1; return { I: S.p.I, r: +r.toFixed(1), B: +(2e-7 * S.p.I / (r / 100) * 1e6).toFixed(1) }; },
    cols: [['I', 'I (A)'], ['r', 'r (cm)'], ['B', 'B (μT)']],
    explain(S) { return Q26.ex('في الشكل a الدوائر عكس عقارب الساعة وفي b مع عقارب الساعة، والمجس يقرأ قيمة أكبر قرب السلك.', 'قاعدة الكف اليمنى: الإبهام نحو الناظر في a فتلتف الأصابع عكس عقارب الساعة، وفي b بالعكس. والمجال يتناسب طردياً مع التيار وعكسياً مع البعد عن السلك.', 'لهذا تبتعد أسلاك الضغط العالي عن البيوت: مجالها يضعف كثيراً بالابتعاد عنها.'); }
  };
  M8.P[D.id] = D;
})();

/* shared «field on the cardboard» part factory: filings / compasses / drawn lines, a probe compass, tapping, switch + battery */
const Q36F = {
  base(S) { S.on = 0; S.pol = 1; S.mode = 'fil'; S.set = 0; S.setT = 0; S.jig = 0; S.fk = ''; S.cs = []; S.ph = 0; S._C = {}; S._F = {}; },
  tap(S, key) { S.jig = .35; if (S.on) { if (S.fk !== key) { S.fk = key; S.set = Math.min(S.set, .15); S.setT = .34; } else S.setT = Math.min(1, S.setT + .34); } else S.setT = Math.max(0, S.setT - .2); },
  needles(S, g, ws, pos, dt) { const e = S.p.earth ? 3e-5 : 1.5e-6; pos.forEach((q, i) => { if (!S.cs[i]) S.cs[i] = { a: -1.2, w: 0 }; MAG9.turn(S.cs[i], Q36.needleTarget(g, Q36.B(ws, q[0], q[1]), e), dt, 45, 6); }); },
  probeDrag(g, keepOut) { return (S2, d) => { const x = d.ox + d.x - d.sx, y = d.oy + d.y - d.sy, v = (g.cy - y) / g.k, u = x - g.cx - v * g.sk * g.k; S2.tu = clamp(u, -g.W + 14, g.W - 14); S2.tv = clamp(v, -g.Dp + 14, g.Dp - 14); }; },
  modeChips(S, g, D) { return Q36.chips(S, 'mode', [['fil', 'برادة الحديد'], ['cmp', 'البوصلات'], ['tap', 'انقر على الورقة']], g.h - 128, S.mode, (S2, k) => { if (k === 'tap') D.tap(S2); else S2.mode = k; }, { bw: 150 }); }
};

/* =============== C1 — الحلقة الدائرية + الإلكترون حول النواة (نشاط 3، الشكلان 10 و 15) =============== */
(() => {
  const RL = 92;
  const D = { id: 'g9_em_loop', page: 117, fig: 'الشكلان 10 و 15',
    desc: 'نثبت سلكاً غليظاً دائرياً في لوح مقوى ونربطه على التوالي مع بطارية، ونمرر التيار برهة ونضع عدة بوصلات حول الحلقة ثم نعكس التيار، ونعيد النشاط ببرادة الحديد. نستنتج أن خطوط المجال الناشئ عن تيار مستمر في حلقة دائرية بيضوية الشكل تقريباً، تزدحم داخل الحلقة وتكون عمودية على مستوى الحلقة. وكذلك يتولد مجال مغناطيسي حول شحنة متحركة كحركة الإلكترون حول نواة الذرة (الشكل 15).',
    tags: 'نشاط 3 حلقة دائرية لوح مقوى خطوط بيضوية تزدحم داخل الحلقة عمودية على مستوى الحلقة الإلكترون حول النواة شحنة متحركة الشكل 15',
    tools: ['ورقة مقوى', 'عدد من البوصلات', 'حلقة من سلك غليظ معزول', 'مفتاح كهربائي', 'بطارية (عمود جاف)', 'برادة حديد'],
    steps: ['أغلق المفتاح ثم انقر على الورقة عدة مرات: تترتب البرادة حول جانبي الحلقة.', 'اختر «البوصلات» ولاحظ أنها داخل الحلقة تتجه عمودياً على مستوى الحلقة.', 'اعكس التيار: تنعكس البوصلات.', 'فعّل «خطوط المجال» لترى الخطوط البيضوية المزدحمة داخل الحلقة.', 'انظر إلى الإطار الجانبي: الإلكترون الدائر حول النواة تيار صغير يولد مجالاً مغناطيسياً.'],
    concl: ['خطوط مجال الحلقة بيضوية الشكل تقريباً تزدحم داخل الحلقة.', 'المجال داخل الحلقة عمودي على مستوى الحلقة.', 'عكس التيار يعكس اتجاه المجال.', 'كل شحنة متحركة (كالإلكترون حول النواة) تولد مجالاً مغناطيسياً.'],
    laws: ['g9_l6_oersted', 'g9_l6_wire'],
    controls: [R('I', 'التيار في الحلقة I', 1, 12, 8, .5, 'A'), TG('lines', 'خطوط المجال المرسومة', false, null, 'magnet'), TG('atom', 'الشكل 15: الإلكترون حول النواة', true, null, 'atom'), TG('earth', 'تأثير المجال الأرضي على البوصلات', false, null, 'earth')],
    setup(S) { Q36F.base(S); S.pu = 0; S.pv = -120; S.tu = 0; S.tv = -120; S.ea = 0; },
    POS: [[0, 0], [0, 55], [0, -55], [-46, 0], [46, 0], [-150, 0], [150, 0], [-92, 66], [92, 66], [-92, -66], [92, -66], [0, 130]],
    ws(S, I) { I = I != null ? I : (S.on ? S.p.I * S.pol : 0); return I ? [{ u: RL, v: 0, I }, { u: -RL, v: 0, I: -I }] : []; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), xr = w - 340, cx = L + (xr - L) / 2 + 12, g = Q36.pg(cx, 340, 170, 170); return Object.assign(g, { w, h, L, xr, by: 590 }); },
    tap(S) { Q36F.tap(S, 'L' + (S.p.I * S.pol)); },
    update(S, dt) { S.set = Q36.ease(S.set, S.setT, dt, 2.2); S.jig = Math.max(0, S.jig - dt); S.pu = Q36.ease(S.pu, S.tu, dt, 12); S.pv = Q36.ease(S.pv, S.tv, dt, 12); S.ph += dt * (S.on ? 50 : 0); S.ea += dt * 2.2;
      const g = D.geo(S); Q36F.needles(S, g, D.ws(S), D.POS.concat([[S.pu, S.pv]]), dt); },
    loopPts(g, a0, a1) { const pts = []; for (let a = a0; a <= a1 + 1e-6; a += .05) pts.push(Q36.P(g, RL * Math.cos(a), 0, RL * Math.sin(a))); return pts; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), ws = D.ws(S); Q36.bg(ctx, w, h);
      const gp = -Math.PI / 2, lo = D.loopPts(g, -Math.PI + .02, gp - .1).concat([]), lo2 = D.loopPts(g, gp + .1, -.02), up = D.loopPts(g, 0, Math.PI);
      const ea = Q36.P(g, RL * Math.cos(gp - .1), 0, RL * Math.sin(gp - .1)), eb = Q36.P(g, RL * Math.cos(gp + .1), 0, RL * Math.sin(gp + .1));
      const bx = g.cx - 110, sxa = g.cx + 40, sxb = g.cx + 110;
      Q33.wire(ctx, [ea, [ea[0], g.by], [bx + 42, g.by]]); Q33.wire(ctx, [[bx - 42, g.by], [g.cx - 190, g.by], [g.cx - 190, g.by + 30], [g.cx + 150, g.by + 30], [g.cx + 150, g.by - 40], [sxb, g.by - 40]]); Q33.wire(ctx, [[sxa, g.by - 40], [eb[0], g.by - 40], eb]);
      [lo, lo2].forEach(p => p.forEach((q, i) => i && Q36.copper(ctx, p[i - 1][0], p[i - 1][1], q[0], q[1], 8)));
      Q36.board(ctx, g, { hole: [[RL, 0], [-RL, 0]] });
      if (S.mode === 'fil') Q36.filings(ctx, g, S._F, S.fk || 'none', S.fk ? D.ws(S, +S.fk.slice(1)) : [], S.set, { skip: (u, v) => Math.hypot(Math.abs(u) - RL, v) < 10, jig: S.jig, ref: 4e-5 });
      if (S.p.lines && S.on) Q36.drawCont(ctx, g, Q36.contours(S._C, 'c' + S.p.I * S.pol, ws, g.R, 5, 2.4, 9), { col: '#4338ca', alpha: .8, every: 130 });
      if (S.mode === 'cmp') D.POS.forEach((q, i) => Q36.pcomp(ctx, g, q[0], q[1], S.cs[i] ? S.cs[i].a : -1.2, 11));
      up.forEach((q, i) => i && Q36.copper(ctx, up[i - 1][0], up[i - 1][1], q[0], q[1], 8));
      Q33.cell(ctx, bx, g.by, { pos: S.pol > 0 ? 1 : -1, V: 3, label: '3 V' }); Q33.sw(ctx, sxa, sxb, g.by - 40, !!S.on, { label: '' });
      if (S.on) { const t = Q36.P(g, 0, 0, RL + 16); Q36.arr(ctx, t[0] + 26 * S.pol, t[1], t[0] - 26 * S.pol, t[1], '#dc2626', 3, 10); Q33.T(ctx, 'I', t[0], t[1] - 14, { s: 13, w: 900, c: '#dc2626' }); }
      const pp = Q36.P(g, S.pu, S.pv); MAG9.compass(ctx, pp[0], pp[1], 18, S.cs[D.POS.length] ? S.cs[D.POS.length].a : -1.2);
      const Bc = S.on ? 4e-7 * Math.PI * S.p.I / (2 * RL * Q36.SC) : 0, b0 = Q36.B(ws, 0, 0);
      if (!S.p.atom) Q36.card(ctx, S, [{ t: S.on ? 'التيار ' + S.p.I + ' A في الحلقة' : 'لا تيار: المفتاح مفتوح', c: S.on ? '#15803d' : '#b91c1c', w: 900 }, { t: 'المجال في مركز الحلقة:', c: '#334155' }, { t: 'B = ' + Q31.sci(Bc, 2, 'T'), mono: 1, c: '#6d28d9', w: 900 },
        { t: 'الخطوط بيضوية تزدحم داخل الحلقة', c: '#334155' }, { t: 'وعمودية على مستوى الحلقة', c: '#334155' }, { t: S.on ? (b0[1] > 0 ? 'داخل الحلقة: المجال مبتعد عن الناظر' : 'داخل الحلقة: المجال نحو الناظر') : '', c: '#b45309', w: 800 }], { title: 'المجال حول حلقة دائرية', y: 64, wd: 300 });
      else D.atom(ctx, S, w - 332, 64, 320, 236);
      const C = D.chips(S, g); Q36.drawChips(ctx, C.m); Q36.drawChips(ctx, C.a);
      if (S.mode === 'fil' && S.on && S.set < .4) Q33.T(ctx, 'اضغط على الورقة لتنقرها ✋', g.cx + 120, g.cy + 106, { s: 11, w: 900, c: '#fff', bg: '#b45309' });
      Q36.banner(ctx, w, 'أغلق المفتاح وانقر على الورقة، أو اختر البوصلات');
    },
    atom(ctx, S, x, y, wd, ht) { Q36.frame(ctx, x, y, wd, ht, 'الشكل 15: شحنة متحركة تولد مجالاً'); const cx = x + wd / 2, cy = y + ht / 2 + 14, rx = 100, ry = 32;
      K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = .35; const gg = ctx.createLinearGradient(0, cy - 70, 0, cy + 70); gg.addColorStop(0, '#dc2626'); gg.addColorStop(.5, '#e5e7eb'); gg.addColorStop(1, '#2563eb'); ctx.fillStyle = gg; rr(ctx, cx - 9, cy - 76, 18, 152, 5); ctx.fill(); ctx.restore();
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, Math.PI, TAU); ctx.stroke(); });
      const ex = cx + rx * Math.cos(S.ea), ey = cy + ry * Math.sin(S.ea), front = Math.sin(S.ea) > 0;
      if (!front) Q31.el(ctx, ex, ey, 7);
      K.raw(ctx, () => { const gg = ctx.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, 14); gg.addColorStop(0, '#fecaca'); gg.addColorStop(1, '#b91c1c'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(cx, cy, 13, 0, TAU); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI); ctx.stroke(); });
      if (front) Q31.el(ctx, ex, ey, 7);
      Q36.arr(ctx, cx, cy - 20, cx, cy - 84, '#6d28d9', 3, 11); Q33.T(ctx, 'N', cx + 16, cy - 82, { s: 13, w: 900, c: '#b91c1c' }); Q33.T(ctx, 'S', cx + 16, cy + 80, { s: 13, w: 900, c: '#1d4ed8' });
      Q33.T(ctx, 'النواة', cx - 34, cy + 2, { s: 10, w: 900, c: '#7f1d1d' }); Q33.T(ctx, 'الإلكترون', cx + rx - 4, cy + ry + 14, { s: 10, w: 900, c: '#1d4ed8' });
      Q33.T(ctx, 'الإلكترون الدائر = تيار صغير في حلقة', cx, y + ht - 16, { s: 10.5, w: 900, c: '#334155' }); },
    chips(S, g) { return { m: Q36F.modeChips(S, g, D), a: Q36.chips(S, 'act', [['sw', S.on ? 'افتح المفتاح' : 'أغلق المفتاح'], ['rev', 'عكس التيار'], ['clr', 'ننثر برادة جديدة']], g.h - 84, '', (S2, k) => { if (k === 'sw') S2.on = S2.on ? 0 : 1; else if (k === 'rev') S2.pol *= -1; else { S2.setT = 0; S2.set = 0; S2.fk = ''; } }, { bw: 150 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), pp = Q36.P(g, S.pu, S.pv), C = D.chips(S, g);
      return [{ id: 'probe', x: pp[0], y: pp[1], r: 22, axis: 'xy', keep: true, tip: 'اسحب البوصلة', idle: 'اسحب ✋', drag: Q36F.probeDrag(g) },
        { id: 'board', x: g.cx + 100, y: g.cy + 58, w: 120, h: 40, hint: false, tip: 'انقر على الورقة نقرة خفيفة', click: S2 => D.tap(S2) },
        { id: 'switch', x: g.cx + 75, y: g.by - 40, w: 86, h: 40, hint: false, tip: 'اضغط لغلق/فتح المفتاح', click: S2 => { S2.on = S2.on ? 0 : 1; } },
        { id: 'bat', x: g.cx - 110, y: g.by, w: 90, h: 40, hint: false, tip: 'اضغط لعكس التيار', click: S2 => { S2.pol *= -1; } }].concat(C.m, C.a); },
    readings(S) { const b = Q36.B(D.ws(S), S.pu, S.pv); return [rd('التيار', S.on ? S.p.I + ' A' : '0'), rd('المجال في مركز الحلقة', Q31.sci(S.on ? 4e-7 * Math.PI * S.p.I / (2 * RL * Q36.SC) : 0, 2, 'T')), rd('المجال عند البوصلة الكبيرة', Q31.sci(Math.hypot(b[0], b[1]), 2, 'T'))]; },
    explain(S) { return Q26.ex('البرادة والبوصلات ترسم خطوطاً بيضوية حول جانبي الحلقة، وتزدحم داخلها باتجاه عمودي على مستوى الحلقة.', 'كل جزء من الحلقة كسلك مستقيم صغير يولد دوائر حوله؛ وداخل الحلقة تتجه مجالات جميع الأجزاء بالاتجاه نفسه فتتجمع ويقوى المجال، أما خارجها فتتعاكس جزئياً.', 'الإلكترون الذي يدور حول النواة يشبه تياراً صغيراً في حلقة، لذلك تولد الذرات مجالات مغناطيسية صغيرة هي أصل مغناطيسية المواد.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — الملف الحلزوني (المحلزن) + المقارنة مع الساق المغناطيسية + قاعدة الكف اليمنى للملف (الأشكال 11–14) =============== */
(() => {
  const RC = 50;
  const D = { id: 'g9_em_sol', page: 117, fig: 'الأشكال 11–14',
    desc: 'نكرر النشاط 3 باستعمال ملف محلزن (عدة لفات) بدلاً من الحلقة: خطوط المجال داخل الملف مستقيمة متوازية، وخارجه خطوط مقفلة تشبه مجال الساق الممغنطة. يتناسب المجال طردياً مع التيار وعدد اللفات في وحدة الطول. ويحدد اتجاه المجال داخل الملف بقاعدة الكف اليمنى للملف: نمسك الملف بالكف اليمنى بحيث يكون لف الأصابع باتجاه التيار فيشير الإبهام إلى اتجاه المجال داخل الملف (أي إلى القطب الشمالي).',
    tags: 'ملف محلزن حلزوني لفات خطوط متوازية داخل الملف خطوط مقفلة خارج الملف ساق مغناطيسية قاعدة الكف اليمنى للملف القطب الشمالي عدد اللفات لوحدة الطول سؤال ص 119 الشكل 14',
    tools: ['ورقة مقوى', 'ملف محلزن من سلك معزول', 'بوصلات', 'برادة حديد', 'بطارية', 'مفتاح', 'ساق مغناطيسية للمقارنة'],
    steps: ['أغلق المفتاح وانقر على الورقة: داخل الملف تصطف البرادة خطوطاً متوازية.', 'اسحب المقبض الأخضر عند طرف الملف لتغيير طوله: نفس اللفات في طول أقصر ⟸ مجال أقوى.', 'غيّر عدد اللفات والتيار من اللوحة الجانبية ولاحظ ازدحام الخطوط.', 'فعّل «قاعدة الكف اليمنى»: الأصابع مع التيار والإبهام نحو القطب الشمالي. اعكس التيار.', 'اضغط «ساق مغناطيسية للمقارنة» (سؤال ص 119): المجال الخارجي متشابه.'],
    concl: ['داخل الملف: خطوط مستقيمة متوازية (مجال منتظم تقريباً) وأكثر ازدحاماً.', 'خارج الملف: خطوط مقفلة تشبه مجال الساق المغناطيسية.', 'يتناسب المجال طردياً مع التيار ومع عدد اللفات في وحدة الطول.', 'قاعدة الكف اليمنى للملف: لف الأصابع باتجاه التيار، والإبهام يشير إلى القطب الشمالي.'],
    laws: ['g9_l6_sol'],
    controls: [R('N', 'عدد اللفات N', 3, 16, 8, 1, ''), R('I', 'التيار I', 1, 10, 6, .5, 'A'), TG('hand', 'قاعدة الكف اليمنى للملف', false, null, 'hand'), TG('lines', 'خطوط المجال المرسومة', false, null, 'magnet')],
    setup(S) { Q36F.base(S); S.Lc = 230; S.tL = 230; S.view = 'coil'; S.pu = 0; S.pv = -125; S.tu = 0; S.tv = -125; },
    ws(S, cfg) { const c = cfg || { N: S.p.N, L: Math.round(S.Lc / 4) * 4, I: S.on ? S.p.I * S.pol : 0 }; if (!c.I) return []; const p = c.L / c.N, out = []; for (let i = 0; i < c.N; i++) { out.push({ u: -c.L / 2 + i * p, v: RC, I: c.I }, { u: -c.L / 2 + (i + .5) * p, v: -RC, I: -c.I }); } return out; },
    key(S) { return S.p.N + '_' + (Math.round(S.Lc / 4) * 4) + '_' + (S.on ? S.p.I * S.pol : 0); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), xr = w - 340, cx = L + (xr - L) / 2 + 2, g = Q36.pg(cx, 330, 158, 170); g.sk = .6; return Object.assign(g, { w, h, L, xr, by: 590 }); },
    pos(S) { const L = S.Lc / 2; return [[-L - 30, 0], [L + 30, 0], [0, 0], [-L / 2, 0], [L / 2, 0], [0, RC + 44], [0, -RC - 44], [-L, RC + 36], [L, RC + 36], [-L, -RC - 36], [L, -RC - 36]]; },
    tap(S) { Q36F.tap(S, D.key(S)); },
    update(S, dt) { S.Lc = Q36.ease(S.Lc, S.tL, dt, 10); S.set = Q36.ease(S.set, S.setT, dt, 2.2); S.jig = Math.max(0, S.jig - dt); S.pu = Q36.ease(S.pu, S.tu, dt, 12); S.pv = Q36.ease(S.pv, S.tv, dt, 12); S.ph += dt * (S.on ? 50 : 0);
      const g = D.geo(S); Q36F.needles(S, g, D.ws(S), D.pos(S).concat([[S.pu, S.pv]]), dt); },
    helix(g, S, below) { const N = S.p.N, L = S.Lc, segs = [], n = N * 36; let cur = null;
      for (let i = 0; i <= n; i++) { const f = i / 36 * TAU, u = -L / 2 + L * i / n, v = RC * Math.cos(f), z = RC * Math.sin(f), b = z < 0; if (b === below) { if (!cur) segs.push(cur = []); cur.push(Q36.P(g, u, v, z)); } else cur = null; } return segs; },
    drawHelix(ctx, segs, front) { segs.forEach(p => K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; [[7, front ? '#7c2d12' : '#5b2109'], [4.5, front ? '#ea580c' : '#9a3412'], [1.2, front ? 'rgba(255,237,213,.85)' : 'rgba(0,0,0,0)']].forEach(([lw, c]) => { ctx.strokeStyle = c; ctx.lineWidth = lw; ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); }); ctx.restore(); })); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), ws = D.ws(S), L = S.Lc, b0 = Q36.B(ws, 0, 0), Nright = b0[0] >= 0, bar = S.view === 'bar'; Q36.bg(ctx, w, h);
      const el = Q36.P(g, -L / 2, RC, 0), er = Q36.P(g, L / 2, RC, 0), bx = g.cx - 60, sxa = g.cx + 50, sxb = g.cx + 120;
      if (!bar) { Q33.wire(ctx, [el, [el[0], g.by - 75], [g.cx - 200, g.by - 75], [g.cx - 200, g.by], [bx - 42, g.by]]); Q33.wire(ctx, [er, [er[0], g.by - 75], [g.cx + 175, g.by - 75], [g.cx + 175, g.by - 40], [sxb, g.by - 40]]); Q33.wire(ctx, [[sxa, g.by - 40], [g.cx + 20, g.by - 40], [g.cx + 20, g.by], [bx + 42, g.by]]); D.drawHelix(ctx, D.helix(g, S, true), false); }
      Q36.board(ctx, g);
      const key = D.key(S);
      if (S.mode === 'fil') { const c = S.fk ? S.fk.split('_').map(Number) : null; Q36.filings(ctx, g, S._F, S.fk || 'none', c ? D.ws(S, { N: c[0], L: c[1], I: c[2] }) : [], S.set, { skip: (u, v) => Math.abs(Math.abs(v) - RC) < 8 && Math.abs(u) < L / 2 + 8, jig: S.jig, ref: 6e-5 }); }
      if (S.p.lines && S.on) Q36.drawCont(ctx, g, Q36.contours(S._C, key, ws, g.R, 5, 3.2, 8), { col: '#4338ca', alpha: .8, every: 140 });
      if (S.mode === 'cmp') D.pos(S).forEach((q, i) => Q36.pcomp(ctx, g, q[0], q[1], S.cs[i] ? S.cs[i].a : -1.2, 11));
      if (bar) { // bar magnet of the same size lying on the card
        const hw = L / 2, hd = RC * .8, Hh = 30, top = (u, v) => Q36.P(g, u, v, Hh), f = [top(-hw, -hd), top(hw, -hd), top(hw, hd), top(-hw, hd)], fr = [Q36.P(g, -hw, -hd, 0), Q36.P(g, hw, -hd, 0)];
        K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = .93; const half = (s, col) => { const m = 0; const a = [top(s * m, -hd), top(s * hw, -hd), top(s * hw, hd), top(s * m, hd)]; ctx.fillStyle = shade(col, 25); ctx.beginPath(); a.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill();
            const b2 = [top(s * m, -hd), top(s * hw, -hd), Q36.P(g, s * hw, -hd, 0), Q36.P(g, s * m, -hd, 0)]; ctx.fillStyle = shade(col, -10); ctx.beginPath(); b2.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); };
          half(Nright ? 1 : -1, '#dc2626'); half(Nright ? -1 : 1, '#2563eb'); ctx.restore(); });
        const pN = Q36.P(g, (Nright ? 1 : -1) * hw * .6, 0, Hh), pS = Q36.P(g, (Nright ? -1 : 1) * hw * .6, 0, Hh); Q33.T(ctx, 'N', pN[0], pN[1], { s: 16, w: 900, c: '#fff' }); Q33.T(ctx, 'S', pS[0], pS[1], { s: 16, w: 900, c: '#fff' }); void f; void fr;
      } else {
        D.drawHelix(ctx, D.helix(g, S, false), true);
        if (S.on) for (let i = 0; i < S.p.N; i += 2) { const f = (i + .25) * TAU, u = -L / 2 + L * (i + .25) / S.p.N, a = Q36.P(g, u, RC * Math.cos(f), RC * Math.sin(f)), b = Q36.P(g, u + L / S.p.N * .04, RC * Math.cos(f + .25 * S.pol), RC * Math.sin(f + .25 * S.pol)); Q36.arr(ctx, a[0], a[1], a[0] + (b[0] - a[0]) * 3, a[1] + (b[1] - a[1]) * 3, '#dc2626', 2.4, 8); }
        Q33.cell(ctx, bx, g.by, { pos: S.pol > 0 ? -1 : 1, V: 6, label: '6 V' }); Q33.sw(ctx, sxa, sxb, g.by - 40, !!S.on, { label: '' });
        if (S.on) { const pn = Q36.P(g, (Nright ? 1 : -1) * (L / 2 + 22), 0, 0), ps = Q36.P(g, (Nright ? -1 : 1) * (L / 2 + 22), 0, 0); Q33.T(ctx, 'N', pn[0], pn[1] - 46, { s: 15, w: 900, c: '#fff', bg: '#dc2626' }); Q33.T(ctx, 'S', ps[0], ps[1] - 46, { s: 15, w: 900, c: '#fff', bg: '#2563eb' }); }
        const hk = Q36.P(g, L / 2, 0, RC + 18); Q41.knob(ctx, hk[0], hk[1], '#16a34a', 9);
        if (S.p.hand && S.on) { const hp = Q36.P(g, 0, 0, RC + 6); Q36.rhand(ctx, hp[0], hp[1], Nright ? 0 : Math.PI, .95); Q33.T(ctx, 'الإبهام نحو القطب الشمالي', hp[0], hp[1] - 66, { s: 10.5, w: 900, c: '#fff', bg: '#b45309' }); }
      }
      const pp = Q36.P(g, S.pu, S.pv), nc = D.pos(S).length; MAG9.compass(ctx, pp[0], pp[1], 18, S.cs[nc] ? S.cs[nc].a : -1.2);
      const Lm = L * Q36.SC, Bin = S.on ? 4e-7 * Math.PI * S.p.N / Lm * S.p.I : 0;
      Q36.card(ctx, S, bar ? [{ t: 'سؤال ص 119: قارن', c: '#334155', w: 900 }, { t: 'خارج الملف والساق: خطوط مقفلة متشابهة', c: '#334155' }, { t: 'من الشمالي إلى الجنوبي خارجهما', c: '#334155' }, { t: 'داخل الملف خطوط متوازية مزدحمة', c: '#6d28d9' }, { t: 'الملف مغناطيس يمكن إطفاؤه وعكسه', c: '#b45309', w: 800 }]
        : [{ t: S.on ? 'التيار ' + S.p.I + ' A وعدد اللفات ' + S.p.N : 'لا تيار: المفتاح مفتوح', c: S.on ? '#15803d' : '#b91c1c', w: 900 }, { t: 'طول الملف ' + (Lm * 100).toFixed(1) + ' cm', c: '#334155' }, { t: 'B = μ₀ (N / L) I', mono: 1, c: '#334155' }, { t: 'B = ' + Q31.sci(Bin, 2, 'T'), mono: 1, c: '#6d28d9', w: 900 },
          { t: 'داخل الملف: خطوط مستقيمة متوازية', c: '#334155', s: 11.5 }, { t: 'خارجه: خطوط مقفلة كالساق الممغنطة', c: '#334155', s: 11.5 }, { t: S.on ? (Nright ? 'القطب الشمالي: الطرف الأيمن' : 'القطب الشمالي: الطرف الأيسر') : '', c: '#b91c1c', w: 900 }], { title: bar ? 'الساق المغناطيسية والملف' : 'المجال لملف حلزوني', y: 64, wd: 300 });
      const C = D.chips(S, g); Q36.drawChips(ctx, C.m); Q36.drawChips(ctx, C.a);
      if (S.mode === 'fil' && S.on && S.set < .4) Q33.T(ctx, 'اضغط على الورقة لتنقرها ✋', g.cx + 120, g.cy + 112, { s: 11, w: 900, c: '#fff', bg: '#b45309' });
      Q36.banner(ctx, w, 'أغلق المفتاح، واسحب المقبض الأخضر لتغيير طول الملف');
    },
    chips(S, g) { return { m: Q36F.modeChips(S, g, D), a: Q36.chips(S, 'act', [['sw', S.on ? 'افتح المفتاح' : 'أغلق المفتاح'], ['rev', 'عكس التيار'], ['bar', S.view === 'bar' ? 'عودة إلى الملف' : 'ساق مغناطيسية للمقارنة']], g.h - 84, '', (S2, k) => { if (k === 'sw') S2.on = S2.on ? 0 : 1; else if (k === 'rev') S2.pol *= -1; else { S2.view = S2.view === 'bar' ? 'coil' : 'bar'; if (S2.view === 'bar') { S2.on = 1; S2.p.lines = true; } } }, { bw: 180 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), hk = Q36.P(g, S.Lc / 2, 0, RC + 18), pp = Q36.P(g, S.pu, S.pv), C = D.chips(S, g);
      return [{ id: 'len', x: hk[0], y: hk[1], r: 18, axis: 'x', keep: true, tip: 'اسحب لتغيير طول الملف', idle: 'اسحب ✋', drag: (S2, d) => { S2.tL = clamp(Math.round(2 * (d.ox + d.x - d.sx - g.cx) / 4) * 4, 120, 250); } },
        { id: 'probe', x: pp[0], y: pp[1], r: 22, axis: 'xy', keep: true, hint: false, tip: 'اسحب البوصلة', drag: Q36F.probeDrag(g) },
        { id: 'board', x: g.cx + 100, y: g.cy + 64, w: 120, h: 36, hint: false, tip: 'انقر على الورقة نقرة خفيفة', click: S2 => D.tap(S2) },
        { id: 'switch', x: g.cx + 85, y: g.by - 40, w: 86, h: 40, hint: false, tip: 'اضغط لغلق/فتح المفتاح', click: S2 => { S2.on = S2.on ? 0 : 1; } },
        { id: 'bat', x: g.cx - 60, y: g.by, w: 90, h: 40, hint: false, tip: 'اضغط لعكس التيار', click: S2 => { S2.pol *= -1; } }].concat(C.m, C.a); },
    readings(S) { const Lm = S.Lc * Q36.SC; return [rd('عدد اللفات N', S.p.N), rd('طول الملف L', (Lm * 100).toFixed(1) + ' cm'), rd('اللفات لوحدة الطول', Math.round(S.p.N / Lm) + ' لفة/m'), rd('المجال داخل الملف', Q31.sci(S.on ? 4e-7 * Math.PI * S.p.N / Lm * S.p.I : 0, 2, 'T'))]; },
    record(S) { const Lm = S.Lc * Q36.SC; return { n: Math.round(S.p.N / Lm), I: S.p.I, B: S.on ? +(4e-7 * Math.PI * S.p.N / Lm * S.p.I * 1e3).toFixed(3) : 0 }; },
    cols: [['n', 'N/L (لفة/m)'], ['I', 'I (A)'], ['B', 'B (mT)']],
    explain(S) { return Q26.ex('داخل الملف تصطف البرادة خطوطاً متوازية، وخارجه تلتف من طرف إلى آخر كمجال الساق المغناطيسية، ويصبح أحد طرفيه قطباً شمالياً.', 'مجالات اللفات تتجمع داخل الملف بالاتجاه نفسه فيصبح المجال قوياً ومنتظماً. زيادة التيار أو عدد اللفات في كل سنتيمتر تزيد المجال. لف الأصابع مع التيار يجعل الإبهام يشير إلى القطب الشمالي.', 'الملف الحلزوني أساس المغناطيس الكهربائي والجرس والمرحل وجهاز الرنين المغناطيسي MRI.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — المغناطيس الكهربائي: نوع القلب وعدد اللفات والتيار وشكل حرف U (4-6، الشكلان 16 و 17) =============== */
(() => {
  const CORE = { air: ['بدون قلب', 1, 0], fe: ['حديد مطاوع', 30, .03], st: ['فولاذ', 18, .55], cu: ['نحاس', 1, 0] }; // name, relative μ, residual fraction
  const NC = 14, CH = 150;
  const D = { id: 'g9_em_emag', page: 120, fig: 'الشكلان 16 و 17',
    desc: 'قطعة الحديد المطاوع (مسمار) داخل سلك موصل محلزن تتمغنط عند انسياب التيار، وتفقد مغناطيسيتها عند قطعه: صنعنا مغناطيساً كهربائياً مؤقتاً يزول بزوال التيار. يتركب من قلب من الحديد المطاوع ملفوف حوله سلك موصل معزول، بشكل ساق مستقيمة أو بشكل حرف U (يلف السلك على ساقيه باتجاهين متعاكسين فيتكون قطب شمالي وآخر جنوبي). ولاحتفاظه بالمغناطيسية مدة أطول نستعمل الفولاذ بدل الحديد المطاوع. يعتمد مجاله على: عدد لفات الملف لوحدة الطول، ونوع مادة القلب، ومقدار التيار.',
    tags: 'المغناطيس الكهربائي مسمار حديد مطاوع مغناطيس مؤقت فولاذ نحاس قلب حرف U عدد اللفات التيار مشابك الورق الشكل 16 الشكل 17 تذكر',
    tools: ['مسمار من الحديد المطاوع', 'ساق فولاذ', 'ساق نحاس', 'سلك نحاس معزول', 'بطارية', 'مفتاح', 'مشابك ورق'],
    steps: ['اسحب المغناطيس الكهربائي (المقبض الأزرق) إلى الأسفل نحو المشابك، ثم أغلق المفتاح: يرفع المشابك.', 'افتح المفتاح: مع الحديد المطاوع تسقط المشابك فوراً (مغناطيس مؤقت).', 'بدّل القلب إلى فولاذ ثم افتح المفتاح: يبقى بعض المشابك. جرّب النحاس والهواء: مغناطيس ضعيف.', 'اسحب القلب (المقبض الأخضر) إلى خارج الملف، وغيّر عدد اللفات والتيار: لاحظ عدد المشابك.', 'اختر «شكل حرف U»: القوة بين القطبين أكبر.'],
    concl: ['المغناطيس الكهربائي مغناطيس مؤقت يزول بزوال التيار المنساب في الملف.', 'يتركب من قلب حديد مطاوع ملفوف حوله سلك موصل معزول، بشكل ساق أو حرف U.', 'يعتمد مجاله على: عدد اللفات لوحدة الطول، ونوع مادة القلب، ومقدار التيار.', 'الفولاذ يحتفظ بمغناطيسيته مدة أطول، والنحاس لا يزيد قوة المغناطيس.', 'تذكر: يزداد المجال بين القطبين عندما يكون بشكل حرف U.'],
    laws: ['g9_l6_emag'],
    controls: [R('N', 'عدد لفات الملف N', 10, 100, 40, 10, ''), R('I', 'التيار I', 0, 3, 1.5, .1, 'A'), TG('fld', 'خطوط المجال حول المغناطيس', false, null, 'magnet')],
    setup(S) { S.on = 0; S.pol = 1; S.core = 'fe'; S.shape = 'bar'; S.hy = 120; S.ty = 120; S.cin = 1; S.tc = 1; S.str = 0; S.res = 0; S.ph = 0;
      S.cl = Array.from({ length: NC }, (_, i) => ({ i, held: 0, x: 0, y: 0, vy: 0, a: (i * 1.37) % 3 - 1.5, init: 0 })); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), xr = w - 340, cx = L + (xr - L) / 2 + 10, top = 150 + S.hy; return { w, h, L, xr, cx, top, bot: top + CH, tray: 586, arm: 96 }; },
    target(S) { const c = CORE[S.core], mu = 1 + (c[1] - 1) * (S.core === 'air' ? 0 : S.cin); return S.p.I * S.p.N / 40 * mu; },
    cap(S) { return clamp(Math.floor(S.str * (S.shape === 'U' ? 1.6 : 1) / 5), 0, NC); },
    rest(i, g) { return [g.cx - 96 + ((i * 53) % 192), g.tray - 7 - (i % 3) * 4]; },
    hold(k, g, S) { const U = S.shape === 'U'; if (U) { const side = k % 2 ? 1 : -1, j = k >> 1; return [g.cx + side * 42 + ((j % 2) - .5) * 12, g.bot + 18 + Math.floor(j / 2) * 14]; } return [g.cx + ((k % 3) - 1) * 13, g.bot + 18 + Math.floor(k / 3) * 14]; },
    update(S, dt) { const g = D.geo(S); S.hy = Q36.ease(S.hy, S.ty, dt, 10); S.cin = Q36.ease(S.cin, S.tc, dt, 10); S.ph += dt * (S.on ? 50 : 0);
      const tg = S.on ? D.target(S) : S.res; S.str = Q36.ease(S.str, tg, dt, S.on ? 8 : 12);
      const cap = D.cap(S); let held = S.cl.filter(c => c.held);
      if (held.length > cap) held.slice(cap).forEach(c => { c.held = 0; c.vy = 0; });
      held = S.cl.filter(c => c.held); const gap = g.tray - 10 - g.bot, reach = Math.min(90, 10 + 1.2 * S.str * (S.shape === 'U' ? 1.2 : 1));
      if (S.str > .5 && gap < reach && held.length < cap) S.cl.filter(c => !c.held).sort((a, b) => Math.abs(D.rest(a.i, g)[0] - g.cx) - Math.abs(D.rest(b.i, g)[0] - g.cx)).slice(0, cap - held.length).forEach(c => { c.held = 1; });
      let k = 0; S.cl.forEach(c => { const r = D.rest(c.i, g); if (!c.init) { c.init = 1; c.x = r[0]; c.y = r[1]; }
        if (c.held) { const p = D.hold(k++, g, S); c.x = Q36.ease(c.x, p[0], dt, 12); c.y = Q36.ease(c.y, p[1], dt, 12); c.vy = 0; }
        else { c.x = Q36.ease(c.x, r[0], dt, 3); if (c.y < r[1]) { c.vy += 1400 * dt; c.y = Math.min(r[1], c.y + c.vy * dt); } else { c.y = r[1]; c.vy = 0; } } }); },
    vcoil(ctx, x, y0, y1, R, n, pass) { const st = 36, tot = n * st, pitch = (y1 - y0) / n;
      K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; const seg = (lw, col) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); let on = false; for (let i = 0; i <= tot; i++) { const f = i / st * TAU, xx = x + R * Math.cos(f), yy = y0 + pitch * i / st + R * .3 * Math.sin(f), fr = Math.sin(f) > 0; if (fr === (pass === 'front')) { if (!on) { ctx.moveTo(xx, yy); on = true; } else ctx.lineTo(xx, yy); } else on = false; } ctx.stroke(); };
        if (pass === 'front') { seg(4, '#7c2d12'); seg(2.4, '#ea580c'); } else { seg(4, '#5b2109'); seg(2, '#9a3412'); } ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), U = S.shape === 'U', on = S.str > .4, nT = 5 + Math.round(S.p.N / 12); Q36.bg(ctx, w, h);
      // stand
      K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, g.cx + 110, g.tray + 14, 120, 12, 4); ctx.fill(); const gr = ctx.createLinearGradient(g.cx + 160, 0, g.cx + 170, 0); gr.addColorStop(0, '#6b7280'); gr.addColorStop(.5, '#e5e7eb'); gr.addColorStop(1, '#4b5563'); ctx.fillStyle = gr; ctx.fillRect(g.cx + 160, g.arm - 10, 9, g.tray + 16 - g.arm); ctx.fillRect(g.cx - 20, g.arm - 10, 190, 8); ctx.fillStyle = '#1f2937'; ctx.fillRect(g.cx + 154, g.arm - 14, 20, 14); });
      Q36.line(ctx, [[g.cx, g.arm - 2], [g.cx, g.top - 16]], '#475569', 2.4);
      // tray
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.tray - 4, 0, g.tray + 14); gr.addColorStop(0, '#cbd5e1'); gr.addColorStop(1, '#64748b'); ctx.fillStyle = gr; rr(ctx, g.cx - 120, g.tray, 240, 14, 5); ctx.fill(); });
      // field lines
      if (S.p.fld && on) { const a = clamp(S.str / 40, .25, .9); K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#4338ca'; ctx.lineWidth = 1.5;
        if (U) { for (let k = 1; k <= 4; k++) { ctx.beginPath(); ctx.ellipse(g.cx, g.bot + 10, 42, 8 + k * 9, 0, 0, Math.PI); ctx.stroke(); } } else for (let k = 1; k <= 4; k++) { [-1, 1].forEach(s => { ctx.beginPath(); ctx.ellipse(g.cx + s * (16 + k * 14), (g.top + g.bot) / 2, 14 + k * 14, CH / 2 + 18 + k * 8, 0, s > 0 ? -Math.PI / 2 : Math.PI / 2, s > 0 ? Math.PI / 2 : Math.PI * 1.5); ctx.stroke(); }); } ctx.restore(); }); }
      // leads to battery + switch (left)
      const bx = g.cx - 120, by = 520, swy = 430, tops = U ? [g.cx - 42, g.top + 6] : [g.cx, g.top + 6], bots = U ? [g.cx + 42, g.top + 6] : [g.cx, g.bot - 6];
      const curve = (a, b, bend) => { const p = []; for (let t = 0; t <= 1.001; t += .1) { const x = a[0] + (b[0] - a[0]) * t + Math.sin(t * Math.PI) * bend, y = a[1] + (b[1] - a[1]) * t; p.push([x, y]); } return p; };
      const topW = curve([tops[0] - 22, tops[1]], [g.cx - 100, swy], -30); Q33.wire(ctx, topW); Q33.wire(ctx, curve([bx + 42, by], [bots[0] + (U ? 22 : -22), bots[1]], U ? 50 : -20));
      Q33.cell(ctx, bx, by, { pos: S.pol > 0 ? 1 : -1, V: 3, label: '3 V' }); Q33.wire(ctx, [[g.cx - 170, swy], [g.cx - 185, swy], [g.cx - 185, by], [bx - 42, by]]); Q33.sw(ctx, g.cx - 170, g.cx - 100, swy, !!S.on, { label: '' });
      // electromagnet body
      const coreTop = g.top - 14 - (1 - S.cin) * 120, ck = S.core;
      if (U) { [-42, 42].forEach(dx => D.vcoil(ctx, g.cx + dx, g.top, g.bot - 10, 20, nT, 'back'));
        if (ck !== 'air') { Q36.core(ctx, g.cx - 54, g.top - 14, 108, 18, ck === 'cu' ? 'cu' : ck === 'st' ? 'st' : 'fe'); [-42, 42].forEach(dx => K.raw(ctx, () => { ctx.save(); ctx.translate(g.cx + dx, 0); Q36.core(ctx, -11, (g.top - 5 + g.bot + 12) / 2, 22, g.bot + 12 - g.top + 5, ck === 'cu' ? 'cu' : ck === 'st' ? 'st' : 'fe'); ctx.restore(); })); }
        [-42, 42].forEach(dx => D.vcoil(ctx, g.cx + dx, g.top, g.bot - 10, 20, nT, 'front')); }
      else { D.vcoil(ctx, g.cx, g.top, g.bot, 24, nT, 'back'); if (ck !== 'air') { K.raw(ctx, () => { ctx.save(); ctx.translate(g.cx, (coreTop + g.bot + 12) / 2); ctx.rotate(Math.PI / 2); Q36.core(ctx, -(g.bot + 12 - coreTop) / 2, 0, g.bot + 12 - coreTop, 20, ck === 'cu' ? 'cu' : ck === 'st' ? 'st' : 'fe'); ctx.restore(); }); }
        D.vcoil(ctx, g.cx, g.top, g.bot, 24, nT, 'front'); if (ck !== 'air') Q41.knob(ctx, g.cx, coreTop - 4, '#16a34a', 9); }
      K.raw(ctx, () => { ctx.fillStyle = '#2563eb'; rr(ctx, g.cx - 14, g.top - 30, 28, 14, 5); ctx.fill(); });
      if (on) { const lowN = (S.pol > 0) === true; if (U) { Q33.T(ctx, 'N', g.cx - 42, g.bot + 4, { s: 12, w: 900, c: '#fff', bg: '#dc2626' }); Q33.T(ctx, 'S', g.cx + 42, g.bot + 4, { s: 12, w: 900, c: '#fff', bg: '#2563eb' }); } else Q33.T(ctx, lowN ? 'N' : 'S', g.cx + 34, g.bot + 4, { s: 12, w: 900, c: '#fff', bg: lowN ? '#dc2626' : '#2563eb' }); }
      if (S.on) Q33.flow(ctx, S.pol > 0 ? topW.slice().reverse() : topW, S.ph, 'c', { sp: 26 });
      // clips
      S.cl.forEach(c => MAG9.clip(ctx, c.x, c.y, c.held ? Math.PI / 2 + c.a * .15 : c.a, .85));
      const nh = S.cl.filter(c => c.held).length;
      Q36.card(ctx, S, [{ t: S.on ? 'المفتاح مغلق: القلب ممغنط' : (S.str > .5 ? 'المفتاح مفتوح: بقيت مغناطيسية' : 'المفتاح مفتوح: زالت المغناطيسية'), c: S.on ? '#15803d' : '#b91c1c', w: 900 },
        { t: 'القلب: ' + CORE[S.core][0] + (U ? ' بشكل حرف U' : ' بشكل ساق'), c: '#334155' }, { t: 'عدد المشابك المرفوعة: ' + nh, c: '#6d28d9', w: 900, s: 14 },
        { t: 'يزداد المجال بزيادة:', c: '#334155', w: 800 }, { t: '١- عدد اللفات لوحدة الطول', c: '#334155', s: 11.5 }, { t: '٢- نوع مادة القلب: الحديد', c: '#334155', s: 11.5 }, { t: '٣- مقدار التيار', c: '#334155', s: 11.5 }, { t: 'تذكر: حرف U يقوي المجال بين القطبين', c: '#b45309', w: 800, s: 11.5 }], { title: 'المغناطيس الكهربائي', y: 64, wd: 300 });
      const C = D.chips(S, g); Q36.drawChips(ctx, C.c); Q36.drawChips(ctx, C.a);
      Q36.banner(ctx, w, 'اسحب المقبض الأزرق نحو المشابك ثم أغلق المفتاح');
    },
    chips(S, g) { return { c: Q36.chips(S, 'core', Object.keys(CORE).map(k => [k, CORE[k][0]]), g.h - 128, S.core, (S2, k) => { S2.core = k; S2.res = 0; }, { bw: 112 }),
      a: Q36.chips(S, 'act', [['sw', S.on ? 'افتح المفتاح' : 'أغلق المفتاح'], ['U', S.shape === 'U' ? 'شكل ساق مستقيمة' : 'شكل حرف U'], ['rev', 'عكس التيار']], g.h - 84, '', (S2, k) => { if (k === 'sw') { if (S2.on) { S2.res = D.target(S2) * CORE[S2.core][2]; S2.on = 0; } else S2.on = 1; } else if (k === 'U') S2.shape = S2.shape === 'U' ? 'bar' : 'U'; else S2.pol *= -1; }, { bw: 150 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), coreTop = g.top - 14 - (1 - S.cin) * 120, L = [{ id: 'mag', x: g.cx, y: g.top - 23, r: 20, axis: 'y', keep: true, tip: 'اسحب المغناطيس الكهربائي للأعلى أو الأسفل', idle: 'اسحب ✋', drag: (S2, d) => { S2.ty = clamp(d.oy + d.y - d.sy + 23 - 150, 0, 250); } }];
      if (S.shape !== 'U' && S.core !== 'air') L.push({ id: 'core', x: g.cx, y: coreTop - 4, r: 16, axis: 'y', keep: true, hint: false, tip: 'اسحب القلب داخل الملف أو خارجه', drag: (S2, d) => { S2.tc = clamp(1 - (g.top - 18 - (d.oy + d.y - d.sy)) / 120, 0, 1); } });
      L.push({ id: 'switch', x: g.cx - 135, y: 430, w: 86, h: 40, hint: false, tip: 'اضغط لغلق/فتح المفتاح', click: S2 => { if (S2.on) { S2.res = D.target(S2) * CORE[S2.core][2]; S2.on = 0; } else S2.on = 1; } });
      return L.concat(C.c, C.a); },
    readings(S) { return [rd('القلب', CORE[S.core][0]), rd('عدد اللفات', S.p.N), rd('التيار', S.on ? S.p.I + ' A' : '0'), rd('القلب داخل الملف', Math.round(S.cin * 100) + '%'), rd('المشابك المرفوعة', S.cl.filter(c => c.held).length)]; },
    record(S) { return { c: CORE[S.core][0], N: S.p.N, I: S.p.I, n: S.cl.filter(c => c.held).length }; },
    cols: [['c', 'القلب'], ['N', 'N'], ['I', 'I (A)'], ['n', 'المشابك']],
    explain(S) { return Q26.ex('مع قلب الحديد المطاوع يرفع الملف مشابك كثيرة ويسقطها فور فتح المفتاح؛ الفولاذ يحتفظ ببعضها، والنحاس والهواء ضعيفان.', 'الحديد المطاوع مادة فيرومغناطيسية تتمغنط بسرعة داخل الملف فتضاعف مجاله كثيراً، وتفقد مغناطيسيتها بسرعة. الفولاذ يصعب تمغنطه وإزالة مغناطيسيته. زيادة التيار أو عدد اللفات يقوي المجال.', 'المغانط الكهربائية في الجرس والمرحل والرافعات وأقفال الأبواب الكهربائية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — رافعة المغناطيس الكهربائي للأثقال الكبيرة (الشكل 18) =============== */
(() => {
  const KIND = { beam: ['عارضة حديد', 64, 13, 1, '#6b4f3a'], gear: ['ترس حديد', 30, 30, 1, '#57534e'], plate: ['صفيحة حديد', 46, 9, 1, '#7c6f64'], pipe: ['أنبوب حديد', 54, 14, 1, '#78716c'], al: ['علبة ألمنيوم', 18, 30, 0, '#cbd5e1'], wd: ['لوح خشب', 58, 11, 0, '#b45309'] };
  const PILE = ['beam', 'gear', 'al', 'plate', 'pipe', 'wd', 'gear', 'beam', 'al', 'plate', 'pipe', 'gear'];
  const D = { id: 'g9_em_crane', page: 120, fig: 'الشكل 18',
    desc: 'مغناطيس كهربائي يستعمل لرفع الأثقال الكبيرة: يوصل التيار فيرفع الخردة الحديدية، ويُنقل الحمل ثم يقطع التيار فيسقط الحمل في المكان المطلوب لأن المغناطيس الكهربائي مؤقت. لا يرفع الألمنيوم ولا الخشب لأنهما ليسا مادتين مغناطيسيتين.',
    tags: 'الشكل 18 رافعة مغناطيس كهربائي رفع الأثقال الخردة الحديد الألمنيوم الخشب قطع التيار',
    tools: ['رافعة بمغناطيس كهربائي', 'خردة حديد', 'علب ألمنيوم', 'ألواح خشب', 'شاحنة'],
    steps: ['اسحب المغناطيس الأحمر فوق كومة الخردة وأنزله قريباً منها.', 'اضغط «تشغيل المغناطيس»: ترتفع قطع الحديد فقط.', 'انقل الحمل فوق الشاحنة ثم اضغط «إطفاء المغناطيس»: يسقط الحمل.', 'غيّر تيار المغناطيس من اللوحة: تيار أكبر يرفع حملاً أكبر من بعد أكبر.'],
    concl: ['المغناطيس الكهربائي يرفع المواد المغناطيسية (الحديد) فقط.', 'يمكن التحكم به: يعمل بإغلاق الدائرة ويتوقف بقطع التيار فيسقط الحمل.', 'زيادة التيار تزيد قوة المغناطيس الكهربائي.'],
    laws: ['g9_l6_emag'],
    controls: [R('I', 'تيار المغناطيس I', 10, 100, 60, 5, 'A'), TG('fld', 'خطوط المجال تحت المغناطيس', true, null, 'magnet')],
    setup(S) { S.on = 0; S.init = 0; S.mx = 0; S.my = 0; S.tx = 0; S.ty = 0; S.it = []; S.glow = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, gy: 590, boom: 104, tow: w - 70, tx0: w - 330, tx1: w - 110, ty: 500 }; },
    reset(S, g) { const cnt = {}; S.it = PILE.map((k, i) => { const q = KIND[k], x = g.L + 60 + ((i * 47) % 200), lay = (cnt[Math.round(x / 50)] = (cnt[Math.round(x / 50)] || 0) + 1); return { k, x, y: g.gy - q[2] / 2 - (lay - 1) * 11, a: ((i * .7) % .6) - .3, att: 0, vy: 0, ox: 0 }; }); },
    floorAt(S, g, it) { const q = KIND[it.k], inTruck = it.x > g.tx0 + 10 && it.x < g.tx1 - 10, base = inTruck ? g.ty : g.gy; let st = 0; S.it.forEach(o => { if (o !== it && !o.att && !o.fall && Math.abs(o.x - it.x) < 26 && o.y < base && o.y > base - 80 && o.y > it.y) st = Math.max(st, base - o.y + KIND[o.k][2] / 2); }); return base - q[2] / 2 - st; },
    update(S, dt) { const g = D.geo(S); if (!S.init) { S.init = 1; S.mx = S.tx = g.L + 170; S.my = S.ty = 300; D.reset(S, g); }
      S.mx = Q36.ease(S.mx, S.tx, dt, 4); S.my = Q36.ease(S.my, S.ty, dt, 4); S.glow = Q36.ease(S.glow, S.on ? 1 : 0, dt, 8);
      const reach = 18 + S.p.I * 1.1, cap = Math.floor(S.p.I / 12) + 1, mb = S.my + 16; let n = S.it.filter(o => o.att).length;
      S.it.forEach(o => { const q = KIND[o.k];
        if (S.on && !o.att && q[3] && n < cap && Math.abs(o.x - S.mx) < 50 && o.y - q[2] / 2 - mb < reach && o.y > mb - 10) { o.att = 1; o.ox = clamp(o.x - S.mx, -36, 36); n++; }
        if (!S.on && o.att) { o.att = 0; o.vy = 0; o.fall = 1; }
        if (o.att) { const j = S.it.filter(p => p.att).indexOf(o); o.x = Q36.ease(o.x, S.mx + o.ox, dt, 10); o.y = Q36.ease(o.y, mb + q[2] / 2 + 2 + j * 4, dt, 10); o.a = Q36.ease(o.a, 0, dt, 6); }
        else { const fl = D.floorAt(S, g, o); if (o.y < fl - .5) { o.vy += 1300 * dt; o.y = Math.min(fl, o.y + o.vy * dt); o.fall = 1; } else { o.y = fl; o.vy = 0; o.fall = 0; } } }); },
    drawItem(ctx, o) { const q = KIND[o.k]; K.raw(ctx, () => { ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.a); const w = q[1], h = q[2];
      if (o.k === 'gear') { ctx.fillStyle = q[4]; ctx.beginPath(); for (let k = 0; k < 20; k++) { const a = k * TAU / 20, r = k % 2 ? 15 : 12; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fill(); ctx.fillStyle = '#d6d3d1'; ctx.beginPath(); ctx.arc(0, 0, 4, 0, TAU); ctx.fill(); }
      else if (o.k === 'al') { const gr = ctx.createLinearGradient(-w / 2, 0, w / 2, 0); gr.addColorStop(0, '#94a3b8'); gr.addColorStop(.5, '#f8fafc'); gr.addColorStop(1, '#64748b'); ctx.fillStyle = gr; rr(ctx, -w / 2, -h / 2, w, h, 4); ctx.fill(); ctx.fillStyle = '#dc2626'; ctx.fillRect(-w / 2, -3, w, 6); }
      else { const gr = ctx.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, shade(q[4], 30)); gr.addColorStop(1, shade(q[4], -30)); ctx.fillStyle = gr; rr(ctx, -w / 2, -h / 2, w, h, o.k === 'pipe' ? h / 2 : 2); ctx.fill(); if (o.k !== 'wd') { ctx.fillStyle = 'rgba(180,83,9,.35)'; ctx.fillRect(-w / 4, -h / 2 + 1, w / 6, h - 2); } else { ctx.strokeStyle = 'rgba(120,53,15,.5)'; ctx.beginPath(); ctx.moveTo(-w / 2 + 4, 0); ctx.lineTo(w / 2 - 4, 1); ctx.stroke(); } }
      ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q36.bg(ctx, w, h);
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.gy, 0, h); gr.addColorStop(0, '#a8a29e'); gr.addColorStop(1, '#78716c'); ctx.fillStyle = gr; ctx.fillRect(0, g.gy, w, h - g.gy); });
      // crane: tower on the right, boom to the left
      K.raw(ctx, () => { ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 3; ctx.fillStyle = '#facc15'; ctx.fillRect(g.tow - 14, g.boom - 30, 28, g.gy - g.boom + 30); for (let y = g.boom; y < g.gy; y += 26) { ctx.beginPath(); ctx.moveTo(g.tow - 14, y); ctx.lineTo(g.tow + 14, y + 26); ctx.stroke(); }
        ctx.fillRect(g.L + 30, g.boom - 8, g.tow - g.L - 30, 16); for (let x = g.L + 30; x < g.tow; x += 24) { ctx.beginPath(); ctx.moveTo(x, g.boom - 8); ctx.lineTo(x + 12, g.boom + 8); ctx.stroke(); } ctx.fillStyle = '#475569'; ctx.fillRect(g.tow - 22, g.boom - 52, 44, 22); });
      // truck
      K.raw(ctx, () => { ctx.fillStyle = '#1d4ed8'; ctx.fillRect(g.tx0, g.ty, g.tx1 - g.tx0, 50); ctx.fillStyle = '#1e3a8a'; ctx.fillRect(g.tx0, g.ty - 40, 8, 40); ctx.fillRect(g.tx1 - 8, g.ty - 40, 8, 40); ctx.fillStyle = '#2563eb'; rr(ctx, g.tx1 + 4, g.ty - 26, 70, 76, 8); ctx.fill(); ctx.fillStyle = '#bfdbfe'; rr(ctx, g.tx1 + 34, g.ty - 18, 32, 26, 4); ctx.fill(); ctx.fillStyle = '#0f172a'; [g.tx0 + 40, g.tx1 - 40, g.tx1 + 44].forEach(x => { ctx.beginPath(); ctx.arc(x, g.gy - 4, 16, 0, TAU); ctx.fill(); }); });
      Q33.T(ctx, 'الشاحنة', (g.tx0 + g.tx1) / 2, g.ty + 26, { s: 11, w: 900, c: '#fff' });
      // trolley + cable + magnet
      K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, S.mx - 22, g.boom + 6, 44, 14, 4); ctx.fill(); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(S.mx - 6, g.boom + 20); ctx.lineTo(S.mx - 6, S.my - 16); ctx.moveTo(S.mx + 6, g.boom + 20); ctx.lineTo(S.mx + 6, S.my - 16); ctx.stroke(); });
      if (S.p.fld && S.glow > .05) K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = .7 * S.glow; ctx.strokeStyle = '#4338ca'; ctx.lineWidth = 1.5; const r = 18 + S.p.I * 1.1; for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.ellipse(S.mx, S.my + 16, 30 + k * 6, r * k / 3, 0, 0, Math.PI); ctx.stroke(); } ctx.restore(); });
      S.it.filter(o => !o.att).forEach(o => D.drawItem(ctx, o));
      K.raw(ctx, () => { ctx.save(); if (S.glow > .05) { ctx.shadowColor = 'rgba(167,139,250,' + S.glow + ')'; ctx.shadowBlur = 22; } const gr = ctx.createLinearGradient(0, S.my - 16, 0, S.my + 16); gr.addColorStop(0, '#ef4444'); gr.addColorStop(1, '#7f1d1d'); ctx.fillStyle = gr; rr(ctx, S.mx - 48, S.my - 16, 96, 32, 8); ctx.fill(); ctx.restore(); ctx.fillStyle = '#d6d3d1'; ctx.fillRect(S.mx - 44, S.my + 12, 88, 4); });
      S.it.filter(o => o.att).forEach(o => D.drawItem(ctx, o));
      const nT = S.it.filter(o => KIND[o.k][3] && !o.att && o.x > g.tx0 && o.x < g.tx1 && o.y < g.gy - 20).length;
      Q33.T(ctx, S.on ? 'المغناطيس يعمل' : 'المغناطيس متوقف', S.mx, S.my, { s: 10, w: 900, c: '#fff' });
      Q33.T(ctx, 'الحديد في الشاحنة: ' + nT, g.tx0 + (g.tx1 - g.tx0) / 2, g.ty - 56, { s: 12, w: 900, c: '#fff', bg: '#6d28d9' });
      Q33.T(ctx, 'الألمنيوم والخشب لا يرتفعان', g.L + 170, g.gy + 18, { s: 11, w: 900, c: '#fff', bg: '#57534e' });
      Q36.drawChips(ctx, D.chips(S, g)); Q36.banner(ctx, w, 'اسحب المغناطيس فوق الخردة، شغّله، انقل الحمل ثم أطفئه');
    },
    chips(S, g) { return Q36.chips(S, 'c', [['on', S.on ? 'إطفاء المغناطيس' : 'تشغيل المغناطيس'], ['truck', 'فوق الشاحنة'], ['pile', 'فوق الكومة'], ['new', 'كومة جديدة']], g.h - 84, '', (S2, k) => { if (k === 'on') S2.on = S2.on ? 0 : 1; else if (k === 'truck') { S2.tx = (g.tx0 + g.tx1) / 2; S2.ty = 380; } else if (k === 'pile') { S2.tx = g.L + 160; S2.ty = 520; } else { S2.on = 0; D.reset(S2, g); } }, { bw: 150 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'mag', x: S.mx, y: S.my, w: 96, h: 34, axis: 'xy', keep: true, tip: 'اسحب المغناطيس', idle: 'اسحب ✋', drag: (S2, d) => { S2.tx = clamp(d.ox + d.x - d.sx, g.L + 70, g.tow - 70); S2.ty = clamp(d.oy + d.y - d.sy, 170, g.gy - 40); } }].concat(D.chips(S, g)); },
    readings(S) { const g = D.geo(S); return [rd('المغناطيس', S.on ? 'يعمل' : 'متوقف'), rd('التيار', S.p.I + ' A'), rd('القطع المرفوعة', S.it.filter(o => o.att).length), rd('الحديد في الشاحنة', S.it.filter(o => KIND[o.k][3] && !o.att && o.x > g.tx0 && o.x < g.tx1 && o.y < g.gy - 20).length)]; },
    explain(S) { return Q26.ex('عند تشغيل المغناطيس ترتفع قطع الحديد فقط، وعند إطفائه تسقط في الشاحنة.', 'التيار في ملف المغناطيس يمغنط قلبه الحديدي فيجذب المواد المغناطيسية. وعند قطع التيار يزول المجال لأن قلب الحديد المطاوع لا يحتفظ بمغناطيسيته، فيسقط الحمل.', 'تستعمل هذه الرافعات في معامل الحديد والخردة وفي فصل الحديد عن النفايات الأخرى.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — الجرس الكهربائي (5-6، الشكل 19) =============== */
(() => {
  const D = { id: 'g9_em_bell', page: 121, fig: 'الشكل 19',
    desc: 'الجرس الكهربائي يتألف من: مغناطيس كهربائي بشكل حرف U، وحافظة من الحديد المطاوع، ومسمار محوري (مسمار التماس)، ومطرقة، وناقوس معدني. عند إغلاق المفتاح يجذب المغناطيس الكهربائي الحافظة فتتحرك المطرقة نحو الناقوس وتحدث صوتاً، وعندها تنفتح الدائرة عند مسمار التماس فيفقد المغناطيس مغناطيسيته فتبتعد الحافظة وتتكون فجوة وتبتعد المطرقة، فتنغلق الدائرة ثانية وتتكرر العملية ما دام التيار منساباً.',
    tags: 'الجرس الكهربائي مغناطيس كهربائي حرف U حافظة حديد مطاوع مسمار محوري مسمار التماس مطرقة ناقوس فتح وغلق الدائرة ذاتياً الشكل 19',
    tools: ['مغناطيس كهربائي بشكل U', 'حافظة من الحديد المطاوع على صفيحة نابضة', 'مسمار تماس', 'مطرقة', 'ناقوس معدني', 'بطارية', 'زر (مفتاح)'],
    steps: ['اضغط «اضغط زر الجرس» (أو الزر الأحمر): يجذب المغناطيس الحافظة فتضرب المطرقة الناقوس.', 'لاحظ مسمار التماس: عندما تتحرك الحافظة تنفتح الدائرة فيطفأ المغناطيس وترجع الحافظة.', 'فعّل «حركة بطيئة» لتتابع الدورة خطوة خطوة، ثم ألغها لترى السرعة الحقيقية.', 'اسحب الحافظة بيدك نحو المغناطيس: ماذا يحدث للدائرة عند مسمار التماس؟', 'قلل فولطية البطارية: المطرقة قد لا تصل إلى الناقوس.'],
    concl: ['المغناطيس الكهربائي يجذب الحافظة عند مرور التيار فتضرب المطرقة الناقوس.', 'حركة الحافظة تفتح الدائرة عند مسمار التماس فيزول المغناطيس وترجع الحافظة بفعل الصفيحة النابضة.', 'رجوع الحافظة يغلق الدائرة ثانية فتتكرر العملية ما دام الزر مضغوطاً.'],
    laws: ['g9_l6_emag'],
    controls: [R('V', 'فولطية البطارية', 1.5, 9, 4.5, 1.5, 'V'), TG('slow', 'حركة بطيئة', true, null, 'slow'), TG('flow', 'إظهار مسار التيار', true, null, 'flow')],
    setup(S) { S.press = 0; S.cont = 1; S.x = 0; S.v = 0; S.hold = 0; S.rings = 0; S.ding = 0; S.ph = 0; S.rt = 0; S.rate = 0; S.cnt = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30; return { w, h, L, x0, yk: x0 + 64, ly1: 220, ly2: 318, pole: x0 + 214, sx: x0 + 248, top: 118, cy: 160, gx: x0 + 158, gy: 470, by: 582 }; },
    closed(S) { return S.press && S.cont; },
    update(S, dt) { const sc = S.p.slow ? .14 : 1, n = 10, h = dt * sc / n, F = 9000 * S.p.V / 4.5;
      if (S.hold) { S.v = 0; } else for (let i = 0; i < n; i++) { if (S.cont && S.x > .22) S.cont = 0; else if (!S.cont && S.x < .04) S.cont = 1; const on = D.closed(S); S.v += ((on ? F / Math.max(.25, 1.2 - S.x) * .6 : 0) - 500 * S.x - 6 * S.v) * h; S.x += S.v * h; if (S.x >= 1) { S.x = 1; if (S.v > 6) { S.rings++; S.cnt++; S.ding = 1; } S.v = -Math.abs(S.v) * .35; } if (S.x < -.05) { S.x = -.05; S.v = Math.abs(S.v) * .2; } }
      S.ding = Math.max(0, S.ding - dt * (S.p.slow ? .9 : 2.5)); S.ph += dt * (D.closed(S) ? 40 : 0); S.rt += dt; if (S.rt > 1) { S.rate = S.cnt / S.rt * (S.p.slow ? .14 : 1); S.rt = 0; S.cnt = 0; } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), on = D.closed(S), xa = g.pole + 28 - 26 * S.x, hx = g.sx - 2 - 31 * S.x; Q36.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 14; const gr = ctx.createLinearGradient(g.x0, 0, g.x0 + 380, 0); gr.addColorStop(0, '#d6b88a'); gr.addColorStop(1, '#c49a6c'); ctx.fillStyle = gr; rr(ctx, g.x0, 74, 390, 540, 16); ctx.fill(); ctx.restore(); });
      // gong (dome) + sound waves
      K.raw(ctx, () => { const gr = ctx.createRadialGradient(g.gx - 16, g.gy - 20, 6, g.gx, g.gy, 54); gr.addColorStop(0, '#fef9c3'); gr.addColorStop(.5, '#eab308'); gr.addColorStop(1, '#854d0e'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.gx, g.gy, 50, 0, TAU); ctx.fill(); ctx.strokeStyle = '#713f12'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#713f12'; ctx.beginPath(); ctx.arc(g.gx, g.gy, 7, 0, TAU); ctx.fill();
        if (S.ding > 0) { ctx.strokeStyle = 'rgba(234,179,8,' + S.ding + ')'; ctx.lineWidth = 3; for (let k = 1; k <= 3; k++) { const r = 58 + (1 - S.ding) * 40 + k * 12; ctx.beginPath(); ctx.arc(g.gx, g.gy, r, Math.PI * .65, Math.PI * 1.35); ctx.stroke(); } } });
      // U electromagnet (horizontal): yoke + two legs with coils
      Q36.core(ctx, g.yk - 12, (g.ly1 + g.ly2) / 2, 24, g.ly2 - g.ly1 + 24, 'fe');
      [g.ly1, g.ly2].forEach(y => { Q36.coilH(ctx, g.yk + 26, g.pole - 18, y, 20, 7, 'back'); Q36.core(ctx, g.yk, y, g.pole - g.yk, 22, 'fe'); Q36.coilH(ctx, g.yk + 26, g.pole - 18, y, 20, 7, 'front'); });
      if (on) [g.ly1, g.ly2].forEach((y, i) => Q33.T(ctx, i ? 'S' : 'N', g.pole - 8, y - 22, { s: 11, w: 900, c: '#fff', bg: i ? '#2563eb' : '#dc2626' }));
      // spring strip from the mount, armature plate, hammer
      const strip = []; for (let t = 0; t <= 1.001; t += .1) strip.push([g.sx + (xa + 6 - g.sx) * t * t, g.top + (g.ly1 - 22 - g.top) * t]);
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; rr(ctx, g.sx - 12, g.top - 18, 24, 18, 4); ctx.fill(); }); Q36.line(ctx, strip, '#94a3b8', 4);
      Q36.core(ctx, xa, (g.ly1 + g.ly2) / 2, 12, g.ly2 - g.ly1 + 44, 'fe');
      Q36.line(ctx, [[xa + 6, g.ly2 + 22], [hx, g.gy - 22]], '#64748b', 4);
      K.raw(ctx, () => { const gr = ctx.createRadialGradient(hx - 4, g.gy - 26, 2, hx, g.gy - 22, 12); gr.addColorStop(0, '#e5e7eb'); gr.addColorStop(1, '#374151'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(hx, g.gy - 22, 11, 0, TAU); ctx.fill(); });
      // contact screw
      const sy = g.cy, stx = g.sx + (xa + 6 - g.sx) * Math.pow((sy - g.top) / (g.ly1 - 22 - g.top), 2); K.raw(ctx, () => { ctx.fillStyle = '#475569'; rr(ctx, g.sx + 70, sy - 26, 20, 52, 4); ctx.fill(); ctx.fillStyle = '#d1d5db'; ctx.fillRect(g.sx + 8, sy - 3, 64, 6); ctx.fillStyle = S.cont ? '#22c55e' : '#f97316'; ctx.beginPath(); ctx.arc(g.sx + 6, sy, 4, 0, TAU); ctx.fill(); });
      void stx;
      // circuit
      const bx = g.x0 + 120, kx = g.x0 + 250, wl = [[g.yk - 12, g.ly2 + 30], [g.yk - 30, g.ly2 + 30], [g.yk - 30, g.by], [bx - 42, g.by]], wr = [[bx + 42, g.by], [kx - 26, g.by]], wk = [[kx + 26, g.by], [g.x0 + 360, g.by], [g.x0 + 360, sy], [g.sx + 90, sy]], wm = [[g.sx, g.top - 18], [g.sx, g.top - 30], [g.yk - 12, g.top - 30], [g.yk - 12, g.ly1 - 24]];
      [wl, wr, wk, wm].forEach(p => Q33.wire(ctx, p, { col: '#2563eb' }));
      Q33.cell(ctx, bx, g.by, { pos: 1, V: S.p.V, label: S.p.V + ' V' }); Q36.key(ctx, kx, g.by, !!S.press, S.press ? 'الزر مضغوط' : 'زر الجرس');
      if (on && S.p.flow) [wr, wk, wm.slice().reverse(), wl.slice().reverse()].forEach(p => Q33.flow(ctx, p, S.ph, 'c', { sp: 26 }));
      // labels
      [['مغناطيس كهربائي', g.yk + 70, g.ly1 - 40], ['حافظة حديد مطاوع', xa + 70, (g.ly1 + g.ly2) / 2], ['مسمار التماس', g.sx + 56, sy - 38], ['مطرقة', hx + 42, g.gy - 22], ['ناقوس', g.gx, g.gy + 64]].forEach(q => Q33.T(ctx, q[0], q[1], q[2], { s: 10.5, w: 900, c: '#fff', bg: 'rgba(30,27,75,.78)' }));
      Q36.card(ctx, S, [{ t: on ? 'الدائرة مغلقة: المغناطيس يجذب الحافظة' : (S.press ? 'الدائرة مفتوحة عند مسمار التماس' : 'الزر غير مضغوط: لا تيار'), c: on ? '#15803d' : '#b91c1c', w: 900 },
        { t: '١- يجذب المغناطيس الحافظة', c: '#334155' }, { t: '٢- تضرب المطرقة الناقوس', c: '#334155' }, { t: '٣- تنفتح الدائرة فيزول المغناطيس', c: '#334155' }, { t: '٤- ترجع الحافظة فتنغلق الدائرة', c: '#334155' },
        { t: 'عدد الضربات: ' + S.rings, c: '#6d28d9', w: 900 }, { t: 'الضربات في الثانية: ' + S.rate.toFixed(1), c: '#6d28d9' }], { title: 'الجرس الكهربائي', y: 64, wd: 300 });
      Q36.drawChips(ctx, D.chips(S, g)); Q36.banner(ctx, w, 'اضغط زر الجرس، واسحب الحافظة بيدك');
    },
    chips(S, g) { return Q36.chips(S, 'c', [['p', S.press ? 'ارفع إصبعك عن الزر' : 'اضغط زر الجرس'], ['slow', S.p.slow ? 'السرعة الحقيقية' : 'حركة بطيئة'], ['z', 'تصفير العداد']], g.h - 84, '', (S2, k) => { if (k === 'p') S2.press = S2.press ? 0 : 1; else if (k === 'slow') setParam(S2, 'slow', !S2.p.slow); else S2.rings = 0; }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), xa = g.pole + 28 - 26 * S.x;
      return [{ id: 'arm', x: xa + 6, y: (g.ly1 + g.ly2) / 2, w: 26, h: 120, axis: 'x', keep: true, tip: 'اسحب الحافظة نحو المغناطيس', idle: 'اسحب ✋', drag: (S2, d) => { S2.hold = 1; S2.x = clamp((g.pole + 34 - (d.ox + d.x - d.sx)) / 26, 0, 1); }, up: S2 => { S2.hold = 0; } },
        { id: 'key', x: g.x0 + 250, y: g.by, w: 60, h: 34, hint: false, tip: 'اضغط زر الجرس', click: S2 => { S2.press = S2.press ? 0 : 1; } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('الزر', S.press ? 'مضغوط' : 'غير مضغوط'), rd('الدائرة', D.closed(S) ? 'مغلقة' : 'مفتوحة'), rd('عدد الضربات', S.rings), rd('فولطية البطارية', S.p.V + ' V')]; },
    explain(S) { return Q26.ex('المطرقة تضرب الناقوس مرات متتالية ما دام الزر مضغوطاً.', 'التيار يمغنط المغناطيس الكهربائي فيجذب الحافظة، لكن حركتها تفصل الصفيحة عن مسمار التماس فتنقطع الدائرة ويزول المغناطيس، فتعيدها الصفيحة النابضة وتغلق الدائرة من جديد: الجرس يفتح ويغلق دائرته ذاتياً.', 'جرس المدرسة وجرس الباب يعملان بهذا المبدأ.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — الهاتف: اللاقطة والسماعة (الشكلان 20 و 21) =============== */
(() => {
  const D = { id: 'g9_em_phone', page: 121, fig: 'الشكلان 20 و 21',
    desc: 'الهاتف إحدى وسائل الاتصال السلكية لإرسال واستقبال الموجات الصوتية. عند التكلم أمام اللاقطة يتغير مقدار التيار في الدائرة بفعل نبضات التضاغط والتخلخل وبشكل مشابه لتردد موجات صوت المتكلم (التردد نفسه). هذا التغير بالتيار ينتقل خلال الأسلاك إلى سماعة الهاتف الآخر فيمر عبر المغناطيس الكهربائي الذي يجذب بدوره قرصاً رقيقاً من الحديد المطاوع فيتذبذب مولداً موجات صوتية في الهواء مشابهة لصوت المتكلم.',
    tags: 'الهاتف اللاقطة السماعة تضاغط تخلخل تردد الصوت تيار متغير مغناطيس كهربائي قرص رقيق من الحديد المطاوع الشكل 20 الشكل 21',
    tools: ['لاقطة (مايكروفون كاربوني)', 'سماعة فيها مغناطيس كهربائي وقرص حديد مطاوع', 'بطارية', 'أسلاك'],
    steps: ['اضغط «تكلّم»: تخرج موجات الصوت من الفم وتهز قرص اللاقطة.', 'لاحظ شاشة التيار: يتغير التيار بالتردد نفسه لصوت المتكلم.', 'لاحظ قرص السماعة يتذبذب ويولد موجات صوتية نحو الأذن.', 'غيّر تردد الصوت وعلوه، أو اسحب المتكلم بعيداً عن اللاقطة.'],
    concl: ['اللاقطة تحول الصوت إلى تيار كهربائي متغير بتردد الصوت نفسه.', 'السماعة فيها مغناطيس كهربائي يجذب قرصاً من الحديد المطاوع بقوة تتغير مع التيار.', 'يتذبذب القرص فيولد صوتاً مشابهاً لصوت المتكلم.'],
    laws: ['g9_l6_emag'],
    controls: [R('f', 'تردد صوت المتكلم f', 100, 1000, 300, 50, 'Hz'), R('A', 'علو الصوت', 0, 1, .7, .1, ''), TG('slow', 'حركة بطيئة', true, null, 'slow')],
    setup(S) { S.talk = 1; S.ph = 0; S.d = 40; S.td = 40; S.buf = []; S.acc = 0; S.amp = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, mx: L + 250, my: 230, ex: w - 200, ey: 430, ty: 540 }; },
    Aeff(S) { return S.p.A * clamp(1 - (S.d - 30) / 160, .1, 1); },
    update(S, dt) { S.d = Q36.ease(S.d, S.td, dt, 10); S.amp = Q36.ease(S.amp, S.talk ? D.Aeff(S) : 0, dt, 6); const fv = S.p.f / (S.p.slow ? 150 : 40); S.ph += TAU * fv * dt;
      S.acc += dt; if (S.acc > .016) { S.acc = 0; S.buf.push(S.amp * Math.sin(S.ph)); if (S.buf.length > 150) S.buf.shift(); } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), s1 = S.amp * Math.sin(S.ph), s2 = S.amp * Math.sin(S.ph - .4), I = .25 * (1 + .6 * s1); Q36.bg(ctx, w, h);
      // speaker head
      const hx = g.mx - 50 - S.d; K.raw(ctx, () => { ctx.fillStyle = '#f2c29b'; ctx.strokeStyle = '#b9774f'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(hx - 40, g.my - 10, 44, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#7c2d12'; ctx.beginPath(); ctx.arc(hx - 40, g.my - 34, 46, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(hx - 22, g.my - 22, 4, 0, TAU); ctx.fill(); ctx.fillStyle = '#9f1239'; ctx.beginPath(); ctx.ellipse(hx - 4, g.my + 14, 6, 3 + (S.talk ? 4 * Math.abs(s1) : 0), 0, 0, TAU); ctx.fill(); });
      // sound waves to the mic
      if (S.talk) K.raw(ctx, () => { ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2.2; const lam = 26 * (300 / S.p.f) ** .5; for (let k = 0; k < 8; k++) { const r = ((S.ph / TAU * lam) % lam) + k * lam; if (r > S.d + 40) break; ctx.globalAlpha = S.amp * (1 - r / (S.d + 60)); ctx.beginPath(); ctx.arc(hx - 4, g.my + 14, r, -.5, .5); ctx.stroke(); } ctx.globalAlpha = 1; });
      // microphone: cup + diaphragm + carbon granules
      const dx1 = 5 * s1; K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; rr(ctx, g.mx - 16, g.my - 52, 70, 104, 14); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.fillRect(g.mx - 10 + dx1, g.my - 44, 5, 88);
        ctx.fillStyle = '#111827'; for (let i = 0; i < 40; i++) { const gx = g.mx + 4 + (i % 6) * 6 + dx1 * (1 - (i % 6) / 6), gy = g.my - 36 + Math.floor(i / 6) * 11; ctx.beginPath(); ctx.arc(gx, gy, 2.6, 0, TAU); ctx.fill(); } });
      Q33.T(ctx, 'اللاقطة', g.mx + 18, g.my - 66, { s: 11, w: 900, c: '#fff', bg: '#334155' }); Q33.T(ctx, 'حبيبات الكاربون', g.mx + 22, g.my + 68, { s: 10, w: 900, c: '#334155' });
      // earpiece: horseshoe electromagnet + soft-iron disc + ear
      const ex = g.ex, ey = g.ey, dx2 = -6 * s2 * (S.talk ? 1 : 0);
      K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; rr(ctx, ex - 90, ey - 80, 120, 160, 16); ctx.fill(); });
      [-26, 26].forEach(dy => { Q36.coilH(ctx, ex - 70, ex - 10, ey + dy, 14, 5, 'back'); Q36.core(ctx, ex - 80, ey + dy, 80, 14, 'fe'); Q36.coilH(ctx, ex - 70, ex - 10, ey + dy, 14, 5, 'front'); });
      Q36.core(ctx, ex - 84, ey, 12, 66, 'st');
      K.raw(ctx, () => { ctx.fillStyle = '#9ca3af'; ctx.fillRect(ex + 10 + dx2, ey - 60, 5, 120); });
      K.raw(ctx, () => { ctx.fillStyle = '#f2c29b'; ctx.strokeStyle = '#b9774f'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(ex + 110, ey, 22, 36, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(ex + 112, ey, 9, 16, 0, 0, TAU); ctx.stroke(); });
      if (S.talk) K.raw(ctx, () => { ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; const lam = 22 * (300 / S.p.f) ** .5; for (let k = 0; k < 5; k++) { const r = ((S.ph / TAU * lam) % lam) + k * lam; if (r > 80) break; ctx.globalAlpha = S.amp * (1 - r / 90); ctx.beginPath(); ctx.arc(ex + 14, ey, r, -.5, .5); ctx.stroke(); } ctx.globalAlpha = 1; });
      Q33.T(ctx, 'السماعة', ex - 30, ey - 96, { s: 11, w: 900, c: '#fff', bg: '#334155' }); Q33.T(ctx, 'مغناطيس كهربائي', ex - 30, ey + 94, { s: 10, w: 900, c: '#334155' }); Q33.T(ctx, 'قرص حديد مطاوع', ex + 40, ey + 114, { s: 10, w: 900, c: '#334155' });
      // wires + battery
      const bx = g.mx + 130, wa = [[g.mx + 54, g.my - 30], [g.mx + 110, g.my - 30], [g.mx + 110, ey - 120], [ex - 100, ey - 120], [ex - 100, ey - 26], [ex - 80, ey - 26]], wb = [[g.mx + 54, g.my + 30], [g.mx + 80, g.my + 30], [g.mx + 80, ey + 120], [bx - 42, ey + 120]], wc = [[bx + 42, ey + 120], [ex - 100, ey + 120], [ex - 100, ey + 26], [ex - 80, ey + 26]];
      [wa, wb, wc].forEach(p => Q33.wire(ctx, p)); Q33.cell(ctx, bx, ey + 120, { pos: 1, V: 3 }); if (S.talk) [wa.slice().reverse(), wb, wc].forEach(p => Q33.flow(ctx, p, S.ph * 8 * (1 + .6 * s1), 'c', { sp: 30 }));
      // current trace
      Q36.trace(ctx, g.L + 30, g.ty - 10, 300, 70, S.buf, { n: 150, lab: 'التيار في الأسلاك يتغير مع الصوت', tl: 't' });
      Q36.card(ctx, S, [{ t: S.talk ? 'المتكلم يتكلم بتردد ' + S.p.f + ' Hz' : 'لا صوت: التيار ثابت', c: S.talk ? '#15803d' : '#64748b', w: 900 }, { t: 'I = ' + I.toFixed(3) + ' A', mono: 1, c: '#6d28d9', w: 900 },
        { t: '١- الصوت يهز قرص اللاقطة', c: '#334155' }, { t: '٢- يتغير التيار بالتردد نفسه', c: '#334155' }, { t: '٣- المغناطيس الكهربائي يجذب القرص', c: '#334155' }, { t: '٤- يتذبذب القرص فيولد الصوت', c: '#334155' }], { title: 'الهاتف', y: 64, wd: 290 });
      Q36.drawChips(ctx, D.chips(S, g)); Q36.banner(ctx, w, 'اضغط «تكلّم»، واسحب المتكلم نحو اللاقطة أو بعيداً عنها');
    },
    chips(S, g) { return Q36.chips(S, 'c', [['t', S.talk ? 'اسكت' : 'تكلّم'], ['hi', 'صوت حاد 800 Hz'], ['lo', 'صوت غليظ 150 Hz']], g.h - 84, '', (S2, k) => { if (k === 't') S2.talk = S2.talk ? 0 : 1; else { S2.talk = 1; setParam(S2, 'f', k === 'hi' ? 800 : 150); } }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), hx = g.mx - 50 - S.d - 40; return [{ id: 'head', x: hx, y: g.my - 10, r: 40, axis: 'x', keep: true, tip: 'اسحب المتكلم نحو اللاقطة أو بعيداً عنها', idle: 'اسحب ✋', drag: (S2, d) => { S2.td = clamp(g.mx - 90 - (d.ox + d.x - d.sx), 10, 110); } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('تردد الصوت', S.p.f + ' Hz'), rd('تردد التيار', S.p.f + ' Hz'), rd('بعد المتكلم', Math.round(S.d / 10) + ' cm'), rd('سعة التغير', Math.round(D.Aeff(S) * 100) + '%')]; },
    explain(S) { return Q26.ex('كلما تكلم المتكلم تذبذب التيار في الأسلاك وتذبذب قرص السماعة بالتردد نفسه.', 'اللاقطة تحول التضاغطات والتخلخلات إلى تغيرات في التيار. هذا التيار المتغير يمر في المغناطيس الكهربائي للسماعة فتتغير قوة جذبه للقرص الرقيق، فيتذبذب القرص ويعيد إنتاج الصوت.', 'السماعات ومكبرات الصوت الحديثة تعمل بالمبدأ نفسه: تيار متغير في ملف قرب مغناطيس يحرك غشاءً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E3 — المرحل الكهرومغناطيسي في السيارة (الشكل 22) =============== */
(() => {
  const D = { id: 'g9_em_relay', page: 122, fig: 'الشكل 22',
    desc: 'المرحل الكهربائي مفتاح مغناطيسي يستعمل كأداة للتحكم في إغلاق وفتح دائرة كهربائية. ففي السيارة يتحكم المرحل في تشغيل دائرة التيار الكبير (محرك بدء التشغيل) بوساطة تيار صغير عند إدارة مفتاح تشغيل السيارة، ويستعمل في الدوائر الإلكترونية لفتح وإغلاق الدائرة ذاتياً.',
    tags: 'المرحل الكهرومغناطيسي مفتاح مغناطيسي السيارة مفتاح التشغيل تيار صغير تيار كبير محرك بدء التشغيل السلف الشكل 22',
    tools: ['بطارية سيارة 12 V', 'مفتاح التشغيل', 'مرحل (ملف + حافظة + نقاط تماس)', 'محرك بدء التشغيل', 'أسلاك رفيعة وكابلات غليظة'],
    steps: ['اضغط على مفتاح التشغيل (أو الزر في الأسفل): يمر تيار صغير في ملف المرحل.', 'لاحظ الحافظة تنجذب فتغلق نقاط التماس في الدائرة الكبيرة فيدور المحرك.', 'قارن التيارين في البطاقة: تيار صغير يتحكم في تيار كبير جداً.', 'قلل فولطية البطارية تحت 8 V: لا ينجذب المرحل.'],
    concl: ['المرحل مفتاح مغناطيسي: تيار صغير في ملفه يغلق دائرة تيار كبير.', 'في السيارة يحمي المرحل مفتاح التشغيل والسائق من التيار الكبير لمحرك البدء.'],
    laws: ['g9_l6_emag'],
    controls: [R('V', 'فولطية البطارية', 6, 12, 12, .5, 'V'), TG('flow', 'إظهار مسار التيار', true, null, 'flow')],
    setup(S) { S.key = 0; S.arm = 0; S.spin = 0; S.ang = 0; S.ph = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30; return { w, h, L, x0, rx: x0 + 210, ry: 300, bx: x0 + 70, by: 566, kx: x0 + 70, ky: 130, mx: x0 + 330, my: 476 }; },
    pull(S) { return S.key && S.p.V >= 8; },
    update(S, dt) { S.arm = Q36.ease(S.arm, D.pull(S) ? 1 : 0, dt, 9); const run = S.arm > .85; S.spin = Q36.ease(S.spin, run ? S.p.V / 12 : 0, dt, run ? 2 : 1.2); S.ang += S.spin * dt * 14; S.ph += dt * 40; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), cl = S.arm > .85, Ic = S.key ? S.p.V / 60 : 0, Im = cl ? 150 * S.p.V / 12 : 0, rx = g.rx, ry = g.ry; Q36.bg(ctx, w, h);
      const gnd = (x, y) => { Q35.earth(ctx, x, y); };
      // relay box: coil on an iron core, pivoted armature, contact blade, fixed contact
      Q36.frame(ctx, rx - 120, ry - 110, 250, 220, 'المرحل');
      K.raw(ctx, () => { ctx.save(); ctx.translate(rx - 40, ry + 20); ctx.rotate(-Math.PI / 2); Q36.core(ctx, -50, 0, 100, 22, 'fe'); ctx.restore(); });
      D.coilV(ctx, rx - 40, ry - 22, ry + 62, 22, 7);
      const px = rx - 100, py = ry - 52, a = .27 * S.arm, AL = 150, tip = [px + Math.cos(a) * AL, py + Math.sin(a) * AL];
      K.raw(ctx, () => { ctx.save(); ctx.translate(px, py); ctx.rotate(a); Q36.core(ctx, 0, 0, AL, 10, 'fe'); ctx.restore(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(px, py, 6, 0, TAU); ctx.fill(); });
      const anc = [rx + 105, ry - 66], mc = [tip[0], tip[1] + 9], fc = [tip[0], ry - 4];
      K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(anc[0], anc[1]); ctx.quadraticCurveTo(anc[0] - 20, mc[1], mc[0], mc[1]); ctx.stroke(); ctx.fillStyle = '#ca8a04'; ctx.beginPath(); ctx.arc(mc[0], mc[1] + 3, 5, 0, TAU); ctx.fill(); ctx.fillStyle = '#a16207'; rr(ctx, fc[0] - 12, fc[1], 24, 8, 2); ctx.fill(); });
      Q33.T(ctx, cl ? 'نقاط التماس مغلقة' : 'نقاط التماس مفتوحة', rx + 60, ry + 90, { s: 10, w: 900, c: cl ? '#15803d' : '#b91c1c' });
      // battery, key
      const B = Q33.bat(ctx, g.bx, g.by, { V: S.p.V, label: 'بطارية' }), J = [B.p[0], g.by - 90];
      const k = Q36.key(ctx, g.kx, g.ky, !!S.key, S.key ? 'المفتاح مدار' : 'مفتاح التشغيل');
      // control circuit (thin): + → key → coil → chassis
      const w1 = [B.p, J, [g.x0 + 12, J[1]], [g.x0 + 12, g.ky], k.a], w2 = [k.b, [rx - 40, g.ky], [rx - 40, ry - 26]], w3 = [[rx - 40, ry + 66], [rx - 40, ry + 128]];
      [w1, w2, w3].forEach(p => Q33.wire(ctx, p, { col: '#2563eb' })); gnd(rx - 40, ry + 130);
      // main circuit (thick): + → fixed contact … blade → motor → chassis
      const m1 = [J, [fc[0], J[1]], [fc[0], fc[1] + 8]], m2 = [anc, [g.mx + 30, anc[1]], [g.mx + 30, g.my - 36]], m3 = [[g.mx - 20, g.my + 36], [g.mx - 20, g.my + 62]];
      [m1, m2, m3].forEach(p => Q33.wire(ctx, p, { thick: 1 })); gnd(g.mx - 20, g.my + 64); Q33.wire(ctx, [B.n, [B.n[0] - 34, B.n[1]], [B.n[0] - 34, B.n[1] + 40]], { col: '#111827' }); gnd(B.n[0] - 34, B.n[1] + 42);
      Q33.T(ctx, 'هيكل السيارة', g.mx + 40, g.my + 78, { s: 9.5, w: 800, c: '#166534' });
      // starter motor
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, g.my - 36, 0, g.my + 36); gr.addColorStop(0, '#9ca3af'); gr.addColorStop(.5, '#f3f4f6'); gr.addColorStop(1, '#4b5563'); ctx.fillStyle = gr; rr(ctx, g.mx - 60, g.my - 36, 110, 72, 12); ctx.fill(); ctx.save(); ctx.translate(g.mx + 74, g.my); ctx.rotate(S.ang); ctx.fillStyle = '#475569'; ctx.beginPath(); for (let i = 0; i < 24; i++) { const aa = i * TAU / 24, r = i % 2 ? 22 : 17; ctx.lineTo(Math.cos(aa) * r, Math.sin(aa) * r); } ctx.closePath(); ctx.fill(); ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.arc(0, 0, 5, 0, TAU); ctx.fill(); ctx.restore(); });
      Q33.T(ctx, 'محرك بدء التشغيل', g.mx - 4, g.my, { s: 10, w: 900, c: '#334155' });
      if (S.p.flow) { if (S.key) [w1, w2, w3].forEach(p => Q33.flow(ctx, p, S.ph * .4, 'c', { sp: 34 })); if (cl) [m1, m2, m3].forEach(p => Q33.flow(ctx, p, S.ph * 2.2, 'c', { sp: 18 })); }
      Q36.card(ctx, S, [{ t: S.key ? (D.pull(S) ? 'المرحل يعمل: المحرك يدور' : 'الفولطية قليلة: المرحل لا ينجذب') : 'مفتاح التشغيل مطفأ', c: S.key && D.pull(S) ? '#15803d' : '#b91c1c', w: 900 },
        { t: 'تيار دائرة الملف: ' + Ic.toFixed(2) + ' A', c: '#2563eb', w: 800 }, { t: 'تيار المحرك: ' + Math.round(Im) + ' A', c: '#b45309', w: 800 }, { t: 'تيار صغير يتحكم في تيار كبير', c: '#6d28d9', w: 900 }, { t: 'المرحل مفتاح مغناطيسي', c: '#334155' }], { title: 'المرحل الكهرومغناطيسي', y: 64, wd: 290 });
      Q36.drawChips(ctx, D.chips(S, g)); Q36.banner(ctx, w, 'اضغط مفتاح التشغيل لتدوير محرك السيارة');
    },
    coilV(ctx, x, y0, y1, R, n) { const st = 30, tot = n * st, pitch = (y1 - y0) / n; ['back', 'front'].forEach(pass => K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = pass === 'front' ? '#ea580c' : '#9a3412'; ctx.lineWidth = 3; ctx.beginPath(); let on = false; for (let i = 0; i <= tot; i++) { const f = i / st * TAU, xx = x + R * Math.cos(f), yy = y0 + pitch * i / st + R * .3 * Math.sin(f), fr = Math.sin(f) > 0; if (fr === (pass === 'front')) { if (!on) { ctx.moveTo(xx, yy); on = true; } else ctx.lineTo(xx, yy); } else on = false; } ctx.stroke(); ctx.restore(); })); },
    chips(S, g) { return Q36.chips(S, 'c', [['k', S.key ? 'أطفئ مفتاح التشغيل' : 'أدر مفتاح التشغيل'], ['lo', 'بطارية ضعيفة 7 V'], ['ok', 'بطارية جيدة 12 V']], g.h - 84, '', (S2, k) => { if (k === 'k') S2.key = S2.key ? 0 : 1; else setParam(S2, 'V', k === 'lo' ? 7 : 12); }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'key', x: g.kx, y: g.ky, w: 64, h: 40, tip: 'أدر مفتاح التشغيل', idle: 'اضغط ✋', click: S2 => { S2.key = S2.key ? 0 : 1; } }].concat(D.chips(S, g)); },
    readings(S) { return [rd('مفتاح التشغيل', S.key ? 'مدار' : 'مطفأ'), rd('تيار الملف', (S.key ? S.p.V / 60 : 0).toFixed(2) + ' A'), rd('تيار المحرك', Math.round(S.arm > .85 ? 150 * S.p.V / 12 : 0) + ' A')]; },
    explain(S) { return Q26.ex('عند إدارة المفتاح ينجذب ذراع المرحل فتنغلق نقاط التماس ويدور محرك البدء.', 'التيار الصغير في ملف المرحل يمغنط قلبه فيجذب الحافظة، وحركتها تغلق دائرة ثانية منفصلة يمر فيها تيار كبير. لذا لا يمر التيار الكبير في مفتاح السائق ولا في الأسلاك الرفيعة.', 'تستعمل المرحلات في السيارات وفي أنظمة الإنذار وفي التحكم بالمكائن عن بعد.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — نشاط 4: سلك يتحرك بين قطبي مغناطيس على شكل U والكلفانوميتر (6-6، الشكل 23) =============== */
(() => {
  const D = { id: 'g9_em_wireU', page: 123, fig: 'الشكل 23 (a و b و c)',
    desc: 'نصل طرفي سلك بطرفي الكلفانوميتر ونحركه بين قطبي مغناطيس دائمي بشكل حرف U: (a) حركة موازية لخطوط المجال: لا ينحرف المؤشر لعدم حصول تغير في المجال. (b) حركة عمودية على خطوط المجال (إلى أعلى وأسفل): ينحرف المؤشر باتجاهين متعاكسين على جانبي الصفر. (c) عند توقف الموصل: لا ينحرف المؤشر. التيار الآني (اللحظي) المتولد على الرغم من عدم وجود بطارية يسمى التيار المحتث لأنه نشأ من تغير المجال المغناطيسي.',
    tags: 'نشاط 4 توليد تيار كهربائي مجال مغناطيسي مغناطيس U كلفانوميتر سلك موازٍ عمودي التيار المحتث الآني اللحظي الشكل 23 تذكر يقطع خطوط المجال',
    tools: ['مغناطيس دائمي بشكل حرف U', 'كلفانوميتر', 'سلك موصل معزول'],
    steps: ['اسحب السلك (النقطة البرتقالية) أفقياً بين القطبين موازياً لخطوط المجال: لا ينحرف المؤشر (الشكل 23-a).', 'اسحبه إلى الأعلى ثم إلى الأسفل: ينحرف المؤشر يميناً ثم يساراً (الشكل 23-b).', 'أوقف السلك: يعود المؤشر إلى الصفر (الشكل 23-c).', 'استعمل الأزرار للحركة التلقائية، وغيّر قوة المغناطيس وعدد لفات السلك وسرعة الحركة.'],
    concl: ['يتولد تيار محتث عندما يقطع السلك خطوط المجال (حركة عمودية على الخطوط).', 'لا يتولد تيار عند الحركة الموازية لخطوط المجال ولا عند السكون.', 'عكس اتجاه الحركة يعكس اتجاه التيار المحتث.', 'التيار المحتث آني (لحظي) يتولد دون بطارية بسبب تغير المجال المغناطيسي.'],
    laws: ['g9_l6_induct'],
    controls: [R('Bm', 'قوة المغناطيس', 1, 5, 3, 1, ''), R('n', 'عدد لفات السلك', 1, 10, 1, 1, ''), R('sp', 'سرعة الحركة التلقائية', .5, 3, 1.5, .5, ''), TG('lines', 'خطوط المجال بين القطبين', true, null, 'magnet')],
    setup(S) { S.init = 0; S.wx = 0; S.wy = 0; S.tx = 0; S.ty = 0; S.vx = 0; S.vy = 0; S.gn = 0; S.auto = ''; S.at = 0; S.flip = 0; S.buf = []; S.acc = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), xr = w - 340, cx = L + (xr - L) / 2 + 6, my = 440, H = 170, R = 120, t = 50; return { w, h, L, xr, cx, my, H, R, t, ri: R - t, tip: my - H, gx: w - 170, gy: 380 }; },
    field(S, g, x, y) { const ins = clamp((g.ri - Math.abs(x - g.cx)) / 10, 0, 1) * clamp((y - (g.tip - 6)) / 14, 0, 1) * clamp((g.tip + 130 - y) / 20, 0, 1); return ins * S.p.Bm; },
    update(S, dt) { const g = D.geo(S); if (!S.init) { S.init = 1; S.wx = S.tx = g.cx; S.wy = S.ty = g.tip + 50; }
      if (S.auto) { S.at += dt * S.p.sp; if (S.auto === 'v') { S.tx = g.cx; S.ty = g.tip + 50 + 42 * Math.sin(S.at * 3); } else { S.ty = g.tip + 50; S.tx = g.cx + 52 * Math.sin(S.at * 3); } }
      const ox = S.wx, oy = S.wy; S.wx = Q36.ease(S.wx, S.tx, dt, 10); S.wy = Q36.ease(S.wy, S.ty, dt, 10); const ivx = (S.wx - ox) / Math.max(dt, 1e-3), ivy = (S.wy - oy) / Math.max(dt, 1e-3); S.vx = Q36.ease(S.vx, ivx, dt, 18); S.vy = Q36.ease(S.vy, ivy, dt, 18);
      const e = -D.field(S, g, S.wx, S.wy) * S.p.n * S.vy * (S.flip ? -1 : 1); S.emf = e; S.gn = Q36.ease(S.gn, clamp(e / 900, -1.15, 1.15), dt, 12);
      S.acc += dt; if (S.acc > .02) { S.acc = 0; S.buf.push(S.gn); if (S.buf.length > 150) S.buf.shift(); } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), m = MAG9.U(g.cx, g.my, -Math.PI / 2, 2 * g.R, g.H, g.t, 1, { flip: !!S.flip }); Q36.bg(ctx, w, h); Q36.table(ctx, g.L + 14, g.my + 40, g.xr - g.L, 90);
      MAG9.drawMag(ctx, m);
      if (S.p.lines) { const dir = S.flip ? 1 : -1; for (let k = 0; k < 6; k++) { const y = g.tip + 8 + k * 22; Q36.line(ctx, [[g.cx - g.ri + 4, y], [g.cx + g.ri - 4, y]], 'rgba(67,56,202,.55)', 1.5); K.raw(ctx, () => MAG9.arrowHead(ctx, g.cx + dir * 30, y, dir > 0 ? 0 : Math.PI, 6, '#4338ca')); } }
      // the wire: short oblique rod (goes into the page) + leads
      const fx = S.wx - 22, fy = S.wy + 16, bx = S.wx + 22, by = S.wy - 16, G = { l: [g.gx - 40, g.gy + 34], r: [g.gx + 40, g.gy + 34] };
      const bez = (a, c, b) => { const p = []; for (let t = 0; t <= 1.001; t += .08) p.push([(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1]]); return p; };
      Q33.wire(ctx, bez([bx, by], [bx + 120, by - 140], G.r), { col: '#16a34a' });
      Q36.copper(ctx, fx, fy, bx, by, 9); Q36.dot(ctx, S.wx, S.wy, 9, 0);
      Q33.wire(ctx, bez([fx, fy], [fx + 60, g.my + 70], G.l), { col: '#16a34a' });
      const v = Math.hypot(S.vx, S.vy), st = v < 8 ? 'stop' : Math.abs(S.vy) > Math.abs(S.vx) * .6 ? 'perp' : 'par', inF = D.field(S, g, S.wx, S.wy) > .2;
      if (v > 8) Q36.arr(ctx, S.wx, S.wy, S.wx + S.vx * .12, S.wy + S.vy * .12, '#0f766e', 3, 10);
      Q34.galv(ctx, g.gx, g.gy, S.gn, { w: 140, h: 108, name: 'كلفانوميتر' });
      Q36.trace(ctx, g.gx - 150, g.gy + 100, 300, 76, S.buf, { n: 150, lab: 'قراءة الكلفانوميتر مع الزمن' });
      const msg = !inF ? 'السلك خارج المجال' : st === 'stop' ? 'السلك ساكن: لا انحراف (c)' : st === 'par' ? 'حركة موازية للمجال: لا انحراف (a)' : 'حركة عمودية: انحراف المؤشر (b)';
      Q36.card(ctx, S, [{ t: msg, c: st === 'perp' && inF ? '#15803d' : '#b91c1c', w: 900 }, { t: 'لا توجد بطارية في الدائرة', c: '#334155' }, { t: 'التيار المحتث: ' + (Math.abs(S.gn) < .02 ? 'صفر' : (S.gn > 0 ? 'باتجاه' : 'بعكس') + ' عقارب الساعة'), c: '#6d28d9', w: 800 }, { t: 'يتولد عندما يقطع السلك خطوط المجال', c: '#b45309', w: 800 }], { title: 'نشاط 4: توليد تيار بمجال مغناطيسي', y: 64, wd: 310 });
      const C = D.chips(S, g); Q36.drawChips(ctx, C.a); Q36.drawChips(ctx, C.b);
      Q36.banner(ctx, w, 'اسحب السلك بين القطبين: أفقياً ثم إلى الأعلى والأسفل');
    },
    chips(S, g) { return { a: Q36.chips(S, 'auto', [['v', 'حركة عمودية (أعلى وأسفل)'], ['h', 'حركة موازية للمجال'], ['', 'أوقف السلك']], g.h - 128, S.auto || '', (S2, k) => { S2.auto = k; S2.at = 0; if (!k) { S2.tx = S2.wx; S2.ty = S2.wy; } }, { bw: 200 }),
      b: Q36.chips(S, 'act', [['flip', 'اقلب المغناطيس'], ['clr', 'مسح الرسم']], g.h - 84, '', (S2, k) => { if (k === 'flip') S2.flip = S2.flip ? 0 : 1; else S2.buf = []; }, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); return [{ id: 'wire', x: S.wx, y: S.wy, r: 22, axis: 'xy', keep: true, tip: 'اسحب السلك بين القطبين', idle: 'اسحب ✋', drag: (S2, d) => { S2.auto = ''; S2.tx = clamp(d.ox + d.x - d.sx, g.L + 40, g.xr + 40); S2.ty = clamp(d.oy + d.y - d.sy, 90, g.my + 20); } }].concat(C.a, C.b); },
    readings(S) { return [rd('سرعة السلك العمودية', Math.round(Math.abs(S.vy) / 10) + ' cm/s'), rd('سرعة السلك الأفقية', Math.round(Math.abs(S.vx) / 10) + ' cm/s'), rd('انحراف المؤشر', Math.round(S.gn * 100) + '%')]; },
    explain(S) { return Q26.ex('المؤشر ينحرف فقط عندما يتحرك السلك إلى الأعلى أو الأسفل بين القطبين، وباتجاهين متعاكسين، ولا ينحرف عند الحركة الأفقية أو السكون.', 'خطوط المجال بين القطبين أفقية. عندما يتحرك السلك عمودياً عليها يقطعها فيتغير عدد الخطوط التي تقطعها الدائرة في وحدة الزمن فتتولد قوة دافعة كهربائية محتثة. أما الحركة الموازية فلا تقطع أي خطوط.', 'المولدات في محطات الكهرباء تعمل بهذه الفكرة: أسلاك تقطع خطوط مجال مغناطيسي باستمرار.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F2 — نشاط 5: ساق مغناطيسية وملف وكلفانوميتر: القوة الدافعة الكهربائية المحتثة (الأشكال 24 و 25 + س2 و س3) =============== */
(() => {
  const D = { id: 'g9_em_coilmag', page: 124, fig: 'الشكلان 24 و 25 + س3 ص 131',
    desc: 'نربط طرفي ملف أسطواني بطرفي كلفانوميتر ونقرب ساقاً مغناطيسية من الملف بموازاة طوله: ينحرف المؤشر دلالة على انسياب تيار محتث (25 a). نثبت المغناطيس قرب الملف: يستقر المؤشر عند الصفر (25 b و c). نسحب المغناطيس من الملف إلى الخارج: ينحرف المؤشر باتجاه معاكس. التيار المحتث ينشأ عندما يتحرك المغناطيس أو الملف مسبباً تغيراً في خطوط المجال، وسببه تولد فرق جهد محتث يسمى القوة الدافعة الكهربائية المحتثة (induced emf) ويقاس بالفولط (فراداي 1831).',
    tags: 'نشاط 5 القوة الدافعة الكهربائية المحتثة emf ساق مغناطيسية ملف أسطواني كلفانوميتر تقريب سحب تثبيت فراداي 1831 الحث الكهرومغناطيسي سرعة الحركة س2 س3 ملي أميتر',
    tools: ['ساق مغناطيسية', 'ملف أسطواني', 'كلفانوميتر'],
    steps: ['اسحب المغناطيس نحو الملف وأدخله فيه: ينحرف المؤشر (25 a).', 'اتركه ساكناً داخل الملف أو قربه: يعود المؤشر إلى الصفر (25 b و c).', 'اسحبه إلى الخارج: ينحرف المؤشر بالاتجاه المعاكس.', 'جرّب «إدخال سريع» ثم «إدخال بطيء»: الأسرع يعطي تياراً أكبر (س2).', 'اختر «حرّك الملف»: الحركة النسبية تكفي. وزد عدد اللفات أو اقلب المغناطيس.'],
    concl: ['يتولد تيار محتث في الدائرة المقفلة عندما يتحرك المغناطيس أو الملف فيتغير المجال عبر الملف.', 'لا يتولد تيار إذا لم يتحرك أي منهما.', 'تقريب المغناطيس وإبعاده يعطيان تيارين متعاكسين.', 'يزداد التيار المحتث بزيادة سرعة الحركة وعدد اللفات وقوة المغناطيس.', 'مصدر الطاقة الكهربائية المتولدة هو الشغل الميكانيكي المبذول في تحريك المغناطيس.'],
    laws: ['g9_l6_induct'],
    controls: [R('N', 'عدد لفات الملف N', 50, 500, 200, 50, ''), R('Bm', 'قوة المغناطيس', 1, 5, 3, 1, ''), TG('flip', 'قلب المغناطيس (S نحو الملف)', false, null, 'flip'), TG('lines', 'خطوط مجال المغناطيس', true, null, 'magnet')],
    setup(S) { S.init = 0; S.mode = 'mag'; S.mx = 0; S.tm = 0; S.cx = 0; S.tcx = 0; S.phi = 0; S.emf = 0; S.gn = 0; S.v = 0; S.an = null; S.buf = []; S.acc = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cy: 300, cl: 190, R: 50, gx: L + 160, gy: 500, far: w - 130 }; },
    flux(S, d) { return (S.p.flip ? -1 : 1) * S.p.N * S.p.Bm / Math.pow(1 + (d / 70) ** 2, 1.5); },
    update(S, dt) { const g = D.geo(S); if (!S.init) { S.init = 1; S.cx = S.tcx = g.L + 170; S.mx = S.tm = g.far - 60; S.phi = D.flux(S, S.mx - S.cx); }
      if (S.an) { S.an.t += dt; const f = clamp(S.an.t / S.an.d, 0, 1), e = f * f * (3 - 2 * f); S.tm = S.an.a + (S.an.b - S.an.a) * e; if (S.mode === 'coil') { S.tcx = S.tm; } if (f >= 1) S.an = null; }
      const k = S.an ? 60 : 10; if (S.mode === 'coil' && S.an) { S.cx = S.tcx; } else S.cx = Q36.ease(S.cx, S.tcx, dt, k); if (S.mode !== 'coil') S.mx = S.an ? S.tm : Q36.ease(S.mx, S.tm, dt, k);
      const ph = D.flux(S, S.mx - S.cx), e = -(ph - S.phi) / Math.max(dt, 1e-3); S.phi = ph; S.emf = Q36.ease(S.emf, e, dt, 20); S.gn = Q36.ease(S.gn, clamp(S.emf / 9000, -1.15, 1.15), dt, 12);
      S.acc += dt; if (S.acc > .02) { S.acc = 0; S.buf.push(S.gn); if (S.buf.length > 150) S.buf.shift(); } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), x0 = S.cx - g.cl / 2, x1 = S.cx + g.cl / 2, nv = 5 + Math.round(S.p.N / 50), m = MAG9.bar(S.mx, g.cy, S.p.flip ? 0 : Math.PI, 160, 34, 1); Q36.bg(ctx, w, h); Q36.table(ctx, g.L + 14, g.cy + 70, w - g.L - 30, 60);
      if (S.p.lines) K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = 'rgba(67,56,202,.45)'; ctx.lineWidth = 1.5; for (let k = 1; k <= 4; k++) { ctx.beginPath(); ctx.ellipse(S.mx, g.cy, 80 + k * 26, 16 + k * 22, 0, 0, TAU); ctx.stroke(); } ctx.restore(); });
      Q36.coilH(ctx, x0, x1, g.cy, g.R, nv, 'back', { sl: .3 });
      const inside = Math.abs(S.mx - S.cx) < g.cl / 2 + 80; if (inside) MAG9.drawMag(ctx, m);
      Q36.coilH(ctx, x0, x1, g.cy, g.R, nv, 'front', { sl: .3 }); if (!inside) MAG9.drawMag(ctx, m);
      const G = Q34.galv(ctx, g.gx, g.gy, S.gn, { w: 140, h: 108, name: 'كلفانوميتر' });
      Q33.wire(ctx, [[x0, g.cy + g.R], [x0, g.gy - 80], [G.l[0] - 30, g.gy - 80], [G.l[0] - 30, G.l[1]], G.l], { col: '#16a34a' }); Q33.wire(ctx, [[x1, g.cy + g.R], [x1, g.gy - 70], [G.r[0] + 30, g.gy - 70], [G.r[0] + 30, G.r[1]], G.r], { col: '#16a34a' });
      const v = (S.mode === 'coil' ? -1 : 1) * (S.an ? (S.an.b - S.an.a) / S.an.d : 0), dist = S.mx - S.cx, appro = Math.abs(S.emf) > 300 ? (Math.sign(S.emf) * Math.sign(dist) * (S.p.flip ? -1 : 1) < 0 ? 'يبتعد' : 'يقترب') : '';
      void v;
      Q36.trace(ctx, g.gx + 110, g.gy - 40, Math.min(330, w - g.gx - 130), 90, S.buf, { n: 150, lab: 'التيار المحتث مع الزمن' });
      Q36.card(ctx, S, [{ t: appro ? (appro === 'يقترب' ? 'المغناطيس يقترب: ينحرف المؤشر' : 'المغناطيس يبتعد: انحراف معاكس') : 'لا حركة نسبية: المؤشر عند الصفر', c: appro ? '#15803d' : '#b91c1c', w: 900 },
        { t: 'شدة التيار المحتث: ' + Math.round(Math.min(1, Math.abs(S.gn)) * 100) + '%', c: '#6d28d9' }, { t: 'أسرع ⟸ تيار محتث أكبر', c: '#334155' }, { t: 'لفات أكثر ⟸ تيار محتث أكبر', c: '#334155' }, { t: 'مصدر الطاقة: شغل اليد المحركة', c: '#b45309', w: 800 }], { title: 'نشاط 5: القوة الدافعة المحتثة', y: 64, wd: 300 });
      const C = D.chips(S, g); Q36.drawChips(ctx, C.a); Q36.drawChips(ctx, C.b);
      Q36.banner(ctx, w, S.mode === 'coil' ? 'اسحب الملف نحو المغناطيس الثابت' : 'اسحب المغناطيس داخل الملف ثم إلى الخارج');
    },
    chips(S, g) { const cIn = S.cx, out = g.far - 60; const go = (S2, b, d) => { if (S2.mode === 'coil') S2.an = { t: 0, d, a: S2.cx, b: S2.mx - (b === 'in' ? 0 : (out - g.L - 170)) }; else S2.an = { t: 0, d, a: S2.mx, b: b === 'in' ? S2.cx : out }; };
      return { a: Q36.chips(S, 'auto', [['f', 'إدخال سريع'], ['s', 'إدخال ببطء'], ['o', 'سحب إلى الخارج']], g.h - 128, '', (S2, k) => go(S2, k === 'o' ? 'out' : 'in', k === 'f' ? .35 : k === 's' ? 1.8 : .5), { bw: 150 }),
        b: Q36.chips(S, 'mode', [['mag', 'حرّك المغناطيس'], ['coil', 'حرّك الملف'], ['clr', 'مسح الرسم']], g.h - 84, S.mode, (S2, k) => { if (k === 'clr') S2.buf = []; else { S2.mode = k; S2.an = null; S2.tm = S2.mx; S2.tcx = S2.cx; } }, { bw: 150 }) }; void cIn; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g);
      const L = S.mode === 'coil' ? [{ id: 'coil', x: S.cx, y: g.cy, w: g.cl, h: 2 * g.R + 10, axis: 'x', keep: true, tip: 'اسحب الملف', idle: 'اسحب ✋', drag: (S2, d) => { S2.an = null; S2.tcx = clamp(d.ox + d.x - d.sx, g.L + 110, g.far - 40); } }]
        : [{ id: 'mag', x: S.mx, y: g.cy, w: 160, h: 40, axis: 'x', keep: true, tip: 'اسحب المغناطيس', idle: 'اسحب ✋', drag: (S2, d) => { S2.an = null; S2.tm = clamp(d.ox + d.x - d.sx, g.L + 120, g.far); } }];
      return L.concat(C.a, C.b); },
    readings(S) { return [rd('عدد اللفات', S.p.N), rd('بعد المغناطيس عن مركز الملف', Math.round(Math.abs(S.mx - S.cx) / 10) + ' cm'), rd('انحراف المؤشر', Math.round(S.gn * 100) + '%')]; },
    record(S) { return { N: S.p.N, g: Math.round(Math.abs(S.gn) * 100) }; },
    cols: [['N', 'N'], ['g', 'أكبر انحراف (%)']],
    explain(S) { return Q26.ex('ينحرف المؤشر عند تقريب المغناطيس وبعكسه عند إبعاده، ويبقى عند الصفر إذا سكن المغناطيس حتى لو كان داخل الملف.', 'حركة المغناطيس تغير عدد خطوط المجال التي تخترق الملف فتتولد على طرفيه قوة دافعة كهربائية محتثة (emf) تسبب التيار. كلما كان التغير أسرع (حركة أسرع أو لفات أكثر أو مغناطيس أقوى) كان التيار أكبر.', 'مصدر الطاقة الكهربائية هنا هو الشغل الذي تبذله يدك؛ وهذا أساس المولدات ومصابيح الدراجة الهوائية (الداينمو).'); }
  };
  M8.P[D.id] = D;
})();

/* ---------- rotor kit for the generator and the motor (oblique 3D: x right, y up, z toward the viewer; axle along z) ---------- */
const Q36R = {
  geo(S) { const w = S.W, h = S.H, L = Q42.L(S), cx = L + 216; return { w, h, L, cx, cy: 176, a: 62, Lz: 70, pi: 100, po: 146, ph: 66, pz: 78, rr: 15, zf: 256 }; },
  P(g, x, y, z) { return [g.cx + x - z * .3, g.cy - y + z * .42]; },
  poly(ctx, pts, fill, stroke, lw = 1.2) { K.raw(ctx, () => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }); },
  box(ctx, g, x0, x1, y0, y1, z0, z1, c) { const P = (x, y, z) => Q36R.P(g, x, y, z);
    Q36R.poly(ctx, [P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)], c[0], 'rgba(15,23,42,.35)');
    Q36R.poly(ctx, [P(x1, y0, z1), P(x1, y1, z1), P(x1, y1, z0), P(x1, y0, z0)], c[2], 'rgba(15,23,42,.35)');
    Q36R.poly(ctx, [P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)], c[1], 'rgba(15,23,42,.45)'); },
  poles(ctx, g) { const R = ['#fca5a5', '#ef4444', '#b91c1c'], B = ['#93c5fd', '#3b82f6', '#1d4ed8'];
    Q36R.box(ctx, g, -g.po, -g.pi, -g.ph, g.ph, -g.pz, g.pz, R); Q36R.box(ctx, g, g.pi, g.po, -g.ph, g.ph, -g.pz, g.pz, B);
    const a = Q36R.P(g, -(g.po + g.pi) / 2, 0, g.pz), b = Q36R.P(g, (g.po + g.pi) / 2, 0, g.pz); Q33.T(ctx, 'N', a[0], a[1], { s: 22, w: 900, c: '#fff' }); Q33.T(ctx, 'S', b[0], b[1], { s: 22, w: 900, c: '#fff' }); },
  field(ctx, g) { [-48, -16, 16, 48].forEach(y => [-40, 40].forEach(z => { const a = Q36R.P(g, -g.pi + 2, y, z), b = Q36R.P(g, g.pi - 2, y, z); Q36.line(ctx, [a, b], 'rgba(67,56,202,.32)', 1.3); K.raw(ctx, () => MAG9.arrowHead(ctx, (a[0] + b[0]) / 2 + 18, a[1], 0, 5, 'rgba(67,56,202,.7)')); })); },
  /* coil: sides s1 = (a cosφ, a sinφ) and s2 = −s1, running along z. Returns the lead points at the front */
  coil(ctx, g, phi, o = {}) { const P = (x, y, z) => Q36R.P(g, x, y, z), c = Math.cos(phi), s = Math.sin(phi), a = g.a, Z = g.Lz;
    const s1 = [a * c, a * s], s2 = [-a * c, -a * s], k = .78;
    Q36R.poly(ctx, [P(k * s1[0], k * s1[1], -Z * .9), P(k * s2[0], k * s2[1], -Z * .9), P(k * s2[0], k * s2[1], Z * .9), P(k * s1[0], k * s1[1], Z * .9)], 'rgba(148,163,184,.55)', 'rgba(71,85,105,.6)');
    const path = [P(s1[0], s1[1], Z), P(s1[0], s1[1], -Z), P(s2[0], s2[1], -Z), P(s2[0], s2[1], Z)];
    [0, 1, 2].forEach(i => Q36.copper(ctx, path[i][0], path[i][1], path[i + 1][0], path[i + 1][1], 7));
    if (o.flow) Q33.flow(ctx, o.flow > 0 ? path : path.slice().reverse(), o.ph || 0, 'c', { sp: 30 });
    return { s1, s2, f1: P(s1[0], s1[1], Z), f2: P(s2[0], s2[1], Z), path }; },
  axle(ctx, g, z1) { Q36.line(ctx, [Q36R.P(g, 0, 0, -g.Lz - 26), Q36R.P(g, 0, 0, z1)], '#475569', 6); Q36.line(ctx, [Q36R.P(g, 0, 0, -g.Lz - 26), Q36R.P(g, 0, 0, z1)], '#cbd5e1', 2); },
  /* cylinder band around the axle: arcs [a0,a1] drawn at several z */
  band(ctx, g, z, r, a0, a1, col, hi) { for (let k = -2; k <= 2; k++) { const c = Q36R.P(g, 0, 0, z + k * 5); K.raw(ctx, () => { ctx.strokeStyle = k === 2 ? hi : col; ctx.lineWidth = 6; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.arc(c[0], c[1], r, -a1, -a0); ctx.stroke(); }); } },
  brush(ctx, x, y, dx, dy) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(Math.atan2(dy, dx)); ctx.fillStyle = '#1f2937'; rr(ctx, 0, -6, 18, 12, 2); ctx.fill(); ctx.fillStyle = '#6b7280'; ctx.fillRect(2, -4, 4, 8); ctx.restore(); }); },
  /* slip rings (dc = 0) or split-ring commutator (dc = 1). Returns the two brush terminals */
  rings(ctx, g, phi, dc, C) { const z1 = g.Lz + 30, z2 = g.Lz + 72, zc = g.Lz + 50, r = g.rr, P = (x, y, z) => Q36R.P(g, x, y, z);
    if (!dc) {
      Q36.line(ctx, [C.f1, P(r * Math.cos(phi + .4), r * Math.sin(phi + .4), z1)], '#b45309', 3); Q36.line(ctx, [C.f2, P(r * .7 * Math.cos(phi + Math.PI), r * .7 * Math.sin(phi + Math.PI), z2)], '#b45309', 3);
      Q36R.band(ctx, g, z1, r, 0, TAU, '#a16207', '#facc15'); Q36R.band(ctx, g, z2, r, 0, TAU, '#a16207', '#fde047');
      [z1, z2].forEach(z => { const c = P(r * Math.cos(phi), r * Math.sin(phi), z + 10); K.raw(ctx, () => { ctx.fillStyle = '#7c2d12'; ctx.beginPath(); ctx.arc(c[0], c[1], 2.6, 0, TAU); ctx.fill(); }); });
      const b1 = P(-r - 4, 0, z1 + 10), b2 = P(r + 4, 0, z2 + 10); Q36R.brush(ctx, b1[0], b1[1], -1, 0); Q36R.brush(ctx, b2[0], b2[1], 1, 0);
      return { t1: [b1[0] - 18, b1[1]], t2: [b2[0] + 18, b2[1]], lab: P(0, r + 16, (z1 + z2) / 2), name: 'حلقتا الزلق' };
    }
    const gap = .2; Q36.line(ctx, [C.f1, P(r * Math.cos(phi), r * Math.sin(phi), zc - 10)], '#b45309', 3); Q36.line(ctx, [C.f2, P(r * Math.cos(phi + Math.PI), r * Math.sin(phi + Math.PI), zc - 10)], '#b45309', 3);
    Q36R.band(ctx, g, zc, r, phi - Math.PI / 2 + gap, phi + Math.PI / 2 - gap, '#b45309', '#fb923c'); Q36R.band(ctx, g, zc, r, phi + Math.PI / 2 + gap, phi + 3 * Math.PI / 2 - gap, '#a16207', '#facc15');
    const bR = P(r + 4, 0, zc + 10), bL = P(-r - 4, 0, zc + 10); Q36R.brush(ctx, bR[0], bR[1], 1, 0); Q36R.brush(ctx, bL[0], bL[1], -1, 0);
    return { t1: [bL[0] - 18, bL[1]], t2: [bR[0] + 18, bR[1]], lab: P(0, r + 16, zc), name: 'المبادل' };
  },
  labels(ctx, g, T, dc) { const x = g.cx + 102, y = g.cy + 116; Q36.line(ctx, [[x - 40, y], [T.lab[0] + 22, T.lab[1] + 30]], 'rgba(100,116,139,.7)', 1.2, [3, 3]); Q33.T(ctx, T.name, x, y, { s: 10.5, w: 900, c: '#fff', bg: dc ? '#c2410c' : '#a16207' }); Q33.T(ctx, 'الفرشاتان من الكاربون', x, y + 24, { s: 10, w: 800, c: '#334155' }); },
  crank(ctx, g, phi, kind) { const z = g.zf, c = Q36R.P(g, 0, 0, z), R = 34, hx = c[0] + R * Math.cos(-phi), hy = c[1] + R * Math.sin(-phi);
    Q36.line(ctx, [Q36R.P(g, 0, 0, g.Lz + 80), c], '#475569', 6);
    if (kind === 'fan') { K.raw(ctx, () => { ctx.save(); ctx.translate(c[0], c[1]); ctx.rotate(-phi); for (let i = 0; i < 3; i++) { ctx.rotate(TAU / 3); ctx.fillStyle = 'rgba(14,165,233,.78)'; ctx.beginPath(); ctx.ellipse(28, 0, 28, 11, .25, 0, TAU); ctx.fill(); ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 1.2; ctx.stroke(); } ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(0, 0, 8, 0, TAU); ctx.fill(); ctx.restore(); }); return { c, h: c, R }; }
    K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(c[0], c[1], R, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.stroke(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(hx, hy); ctx.stroke();
      ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(c[0], c[1], 6, 0, TAU); ctx.fill(); const gr = ctx.createRadialGradient(hx - 3, hy - 3, 1, hx, hy, 10); gr.addColorStop(0, '#fde68a'); gr.addColorStop(1, '#b45309'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(hx, hy, 10, 0, TAU); ctx.fill(); ctx.restore(); });
    return { c, h: [hx, hy], R };
  }
};

/* =============== G1 — المولد الكهربائي: حلقتا الزلق (تيار متناوب) والمبادل (تيار مستمر) (7-6، الأشكال 26 – 29) =============== */
(() => {
  const D = { id: 'g9_em_gen', page: 125, fig: 'الأشكال 26 و 27 و 28 و 29',
    desc: 'المولد الكهربائي جهاز يحول الطاقة الميكانيكية (الحركية) إلى طاقة كهربائية بوجود مجال مغناطيسي، ويعمل على مبدأ الحث الكهرومغناطيسي. يتركب من ملف من سلك معزول ملفوف حول قلب من الحديد المطاوع، وحلقتين معدنيتين معزولتين، وفرشتين من الكاربون (الفحمات)، ومغناطيس دائمي أو كهربائي بشكل حرف U. عند دوران الملف بين القطبين قاطعاً خطوط المجال تتولد قوة دافعة كهربائية محتثة تسبب تياراً متناوباً (الشكل 27). باستعمال نصفي حلقة معزولين (المبادل) بدل الحلقتين يخرج تيار باتجاه واحد يسمى التيار المستمر DC (الشكلان 28 و 29).',
    tags: 'المولد الكهربائي للتيار المتناوب AC مولد التيار المستمر DC الداينمو حلقتا الزلق المبادل نصفا حلقة الفرشتان الفحمات الكاربون الحديد المطاوع مغناطيس U طاقة ميكانيكية كهربائية الحث الكهرومغناطيسي الأشكال 26 27 28 29 هل تعلم س9',
    tools: ['مغناطيس بشكل حرف U', 'ملف على قلب حديد مطاوع', 'حلقتان معدنيتان أو مبادل', 'فرشتان من الكاربون', 'مصباح وكلفانوميتر'],
    steps: ['أدر ذراع المولد بالسحب أو اضغط «أدر المولد».', 'راقب الكلفانوميتر: ينحرف يميناً ثم يساراً، والمنحنى موجي: تيار متناوب AC (الشكل 27).', 'لاحظ أن التيار أكبر ما يمكن عندما يكون الملف أفقياً يقطع الخطوط، وصفر عندما يكون عمودياً.', 'اختر «مبادل: DC»: يصبح التيار باتجاه واحد على شكل نبضات (الشكل 29).', 'زد سرعة الدوران أو عدد اللفات أو قوة المغناطيس: يزداد التيار ويتوهج المصباح أكثر.'],
    concl: ['المولد يحول الطاقة الميكانيكية إلى طاقة كهربائية بالحث الكهرومغناطيسي.', 'مع حلقتي الزلق يخرج تيار متناوب يغير اتجاهه كل نصف دورة.', 'المبادل (نصفا حلقة معزولان) يجعل التيار الخارج باتجاه واحد: تيار مستمر.', 'يزداد التيار بزيادة سرعة الدوران وعدد اللفات وقوة المجال.'],
    laws: ['g9_l6_gen', 'g9_l6_induct'],
    controls: [R('w', 'سرعة الدوران', .5, 3, 1, .5, 'rev/s'), R('N', 'عدد اللفات', 50, 300, 100, 50, ''), R('Bm', 'قوة المغناطيس', 1, 5, 3, 1, ''), TG('both', 'ارسم AC و DC معاً', false, null, 'chart')],
    setup(S) { S.th = .4; S.pth = .4; S.om = 0; S.omc = 0; S.run = 1; S.dc = 0; S.slow = 0; S.ht = 0; S.e = 0; S.ac = 0; S.ph = 0; S.buf = []; S.bufA = []; S.bufD = []; S.acc = 0; },
    update(S, dt) { dt = Math.min(dt, .05);
      if (S.ht > 0) { S.ht -= dt; S.omc = S.om; }
      else { S.omc = Q36.ease(S.omc, S.run ? TAU * S.p.w * (S.slow ? .15 : 1) : 0, dt, S.run ? 2.5 : .8); S.th += S.omc * dt; }
      S.om = Q36.ease(S.om, (S.th - S.pth) / Math.max(dt, 1e-3), dt, 10); S.pth = S.th;
      const k = (S.p.N / 100) * (S.p.Bm / 3) * (S.om / (TAU * 1.5)), c = Math.cos(S.th); S.ac = k * c; const dcv = k * Math.abs(c);
      S.e = Q36.ease(S.e, S.dc ? dcv : S.ac, dt, 30); S.ph += Math.abs(S.e) * dt * 160;
      S.acc += dt; if (S.acc > .02) { S.acc = 0; S.buf.push(S.e); S.bufA.push(S.ac); S.bufD.push(dcv); [S.buf, S.bufA, S.bufD].forEach(b => { if (b.length > 150) b.shift(); }); } },
    draw(ctx, w, h, S) {
      const g = Q36R.geo(S), ph = S.th; Q36.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(100,116,139,.18)'; ctx.beginPath(); ctx.ellipse(g.cx - 10, g.cy + 112, 220, 26, 0, 0, TAU); ctx.fill(); });
      Q36R.poles(ctx, g); Q36R.field(ctx, g);
      const cf = Math.cos(ph) * Math.sign(S.om || 1), C = Q36R.coil(ctx, g, ph, { flow: Math.abs(S.ac) > .06 ? -Math.sign(S.ac) : 0, ph: S.ph });
      Q36R.axle(ctx, g, g.Lz + 90);
      const T = Q36R.rings(ctx, g, ph, S.dc, C), K2 = Q36R.crank(ctx, g, ph, 'crank');
      Q36R.labels(ctx, g, T, S.dc);
      const mid = Q36R.P(g, C.s1[0], C.s1[1], 0); if (Math.abs(cf) > .85) Q33.T(ctx, 'يقطع الخطوط', mid[0], mid[1] - 22, { s: 10, w: 900, c: '#fff', bg: '#15803d' });
      // external circuit: lamp + centre-zero galvanometer
      const yb = 420, lx = g.L + 92, gx = g.cx + 120; const lb = Q33.bulb(ctx, lx, yb + 40, Math.min(1.3, Math.abs(S.e) * 1.1), { label: '' });
      const G = Q34.galv(ctx, gx, yb + 30, S.e * .9, { w: 132, h: 100, name: 'كلفانوميتر' });
      const w1 = [T.t1, [g.cx - 118, T.t1[1]], [g.cx - 118, yb - 34], [lx - 18, yb - 34], [lx - 18, yb + 40]], w2 = [[lx + 18, yb + 40], [lx + 18, yb + 100], [G.l[0], yb + 100], G.l], w3 = [G.r, [G.r[0], yb - 52], [g.cx + 30, yb - 52], [g.cx + 30, T.t2[1]], T.t2];
      [w1, w2, w3].forEach(p => Q33.wire(ctx, p, { col: '#16a34a' }));
      if (Math.abs(S.e) > .05) [w1, w2, w3].forEach(p => Q33.flow(ctx, S.e > 0 ? p : p.slice().reverse(), S.ph, 'c', { sp: 30 }));
      void lb;
      const tx = w - 336, tw = 318; Q36.trace(ctx, tx, 300, tw, 96, S.buf, { n: 150, lab: S.p.both ? 'أزرق AC وأخضر DC' : 'التيار الخارج مع الزمن', sets: S.p.both ? [[S.bufA, '#60a5fa'], [S.bufD, '#4ade80']] : null, col: S.dc ? '#4ade80' : '#60a5fa' });
      const rev = Math.abs(S.om) / TAU;
      Q36.card(ctx, S, [{ t: S.dc ? 'المبادل: نصفا حلقة معزولان' : 'حلقتان معدنيتان تدوران مع الملف', c: '#334155', w: 800 }, { t: S.dc ? 'التيار الخارج باتجاه واحد: DC' : 'التيار الخارج يغير اتجاهه: AC', c: S.dc ? '#15803d' : '#2563eb', w: 900 },
        { t: 'الطاقة: ميكانيكية ⟸ كهربائية', c: '#b45309', w: 800 }, { t: 'سرعة الدوران: ' + rev.toFixed(1) + ' rev/s', c: '#6d28d9', w: 800 },
        { t: Math.abs(Math.cos(ph)) > .85 ? 'الملف أفقي: أكبر تيار' : Math.abs(Math.cos(ph)) < .25 ? 'الملف عمودي: التيار صفر' : 'الملف بين الوضعين', c: '#334155' }], { title: S.dc ? 'مولد التيار المستمر' : 'مولد التيار المتناوب', y: 64, wd: 300 });
      const CH = D.chips(S, g); Q36.drawChips(ctx, CH.a); Q36.drawChips(ctx, CH.b);
      Q36.banner(ctx, w, 'أدر ذراع المولد وراقب الكلفانوميتر والمصباح'); void K2;
    },
    chips(S, g) { return { a: Q36.chips(S, 'type', [['ac', 'حلقتا زلق: AC'], ['dc', 'مبادل: DC']], g.h - 128, S.dc ? 'dc' : 'ac', (S2, k) => { S2.dc = k === 'dc' ? 1 : 0; S2.buf = []; }, { bw: 170 }),
      b: Q36.chips(S, 'act', [['run', S.run ? 'أوقف الدوران' : 'أدر المولد'], ['slow', 'دوران بطيء جداً'], ['clr', 'مسح الرسم']], g.h - 84, S.slow ? 'slow' : '', (S2, k) => { if (k === 'run') { S2.run = S2.run ? 0 : 1; } else if (k === 'slow') { S2.slow = S2.slow ? 0 : 1; S2.run = 1; } else { S2.buf = []; S2.bufA = []; S2.bufD = []; } }, { bw: 160 }) }; },
    drags(S) { if (!S.W) return []; const g = Q36R.geo(S), c = Q36R.P(g, 0, 0, g.zf), hx = c[0] + 34 * Math.cos(-S.th), hy = c[1] + 34 * Math.sin(-S.th), C = D.chips(S, g);
      return [{ id: 'crank', x: hx, y: hy, r: 24, cx: c[0], cy: c[1], keep: true, tip: 'دوّر ذراع المولد', idle: 'دوّر ✋', drag: (S2, d) => { S2.ht = .25; S2.run = 0; S2.th -= d.dang || 0; } }].concat(C.a, C.b); },
    readings(S) { return [rd('نوع المولد', S.dc ? 'تيار مستمر' : 'تيار متناوب'), rd('سرعة الدوران', (Math.abs(S.om) / TAU).toFixed(2) + ' rev/s'), rd('زاوية الملف', Math.round(((S.th * 180 / Math.PI) % 360 + 360) % 360) + '°'), rd('التيار الخارج', Math.round(S.e * 100) + '%')]; },
    record(S) { return { w: S.p.w, N: S.p.N, e: Math.round(Math.abs(S.e) * 100) }; },
    cols: [['w', 'rev/s'], ['N', 'N'], ['e', 'التيار (%)']],
    explain(S) { return Q26.ex(S.dc ? 'مع المبادل ينحرف المؤشر إلى جهة واحدة فقط على شكل نبضات، فالتيار مستمر.' : 'ينحرف المؤشر يميناً ثم يساراً مع كل دورة، فالتيار متناوب، ويكون أكبر عندما يكون الملف أفقياً.',
      'دوران الملف بين القطبين يجعل جانبيه يقطعان خطوط المجال فتتولد قوة دافعة كهربائية محتثة. كل نصف دورة ينعكس اتجاه حركة الجانب بالنسبة إلى الخطوط فينعكس التيار. الحلقتان تنقلانه كما هو، أما المبادل فيبدل وصل الطرفين بالفرشتين في اللحظة التي ينعكس فيها التيار فيبقى خارجاً باتجاه واحد.',
      'محطات توليد الكهرباء تدير مولدات ضخمة بالبخار أو الماء أو الرياح. ومولدات التيار المستمر العملية تستعمل عدة ملفات، وفي بعضها تدور المغانط ويبقى الملف ثابتاً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G2 — القوة المغناطيسية على سلك يحمل تياراً في مجال منتظم (الشكل 31 + س5) =============== */
(() => {
  const D = { id: 'g9_em_force', page: 126, fig: 'الشكل 31 + س5 ص 132',
    desc: 'يعتمد عمل المحرك الكهربائي على مبدأ القوة المغناطيسية المؤثرة في سلك ينساب فيه تيار كهربائي مستمر موضوع في مجال مغناطيسي (الشكل 31). يتأثر السلك بأكبر قوة عندما يكون طوله عمودياً على خطوط المجال، ولا يتأثر بأي قوة عندما يكون موازياً لها (س5). ينعكس اتجاه القوة بعكس اتجاه التيار أو المجال.',
    tags: 'القوة المغناطيسية سلك يحمل تياراً مجال منتظم الشكل 31 س5 عمودي موازٍ المحرك الكهربائي BIL sin زاوية اتجاه القوة عكس التيار',
    tools: ['مغناطيسان متقابلان (مجال منتظم)', 'ساق نحاسية معلقة', 'بطارية ومفتاح'],
    steps: ['أغلق المفتاح: يمر تيار في الساق فتقفز إلى الأعلى بتأثير القوة المغناطيسية F.', 'اسحب طرف الساق لتدويرها: كلما اقتربت من موازاة الخطوط قلت القوة.', 'اختر «موازٍ للمجال»: تنعدم القوة (س5-b). واختر «عمودي»: أكبر قوة (س5-a).', 'فعّل «عكس التيار»: ينعكس اتجاه القوة فتندفع الساق إلى الأسفل.'],
    concl: ['السلك الذي يحمل تياراً في مجال مغناطيسي يتأثر بقوة مغناطيسية.', 'تكون القوة أكبر ما يمكن عندما يكون السلك عمودياً على خطوط المجال.', 'لا يتأثر السلك بقوة عندما يكون موازياً لخطوط المجال.', 'تزداد القوة بزيادة التيار وشدة المجال وطول السلك، وينعكس اتجاهها بعكس التيار.'],
    laws: ['g9_l6_gen'],
    controls: [R('I', 'التيار I', 0, 5, 3, .5, 'A'), R('Bm', 'شدة المجال B', .1, 1, .5, .1, 'T'), R('a', 'الزاوية بين السلك والمجال', 0, 180, 90, 5, '°'), TG('rev', 'عكس التيار', false, null, 'flip')],
    setup(S) { S.on = 1; S.z = 0; S.vz = 0; S.ph = 0; S.ta = null; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), xr = w - 340, cx = L + (xr - L) / 2; return { w, h, L, xr, g: Object.assign(Q36.pg(cx, 330, 150, 120), { k: .55, sk: .5 }), Lr: 110 }; },
    F(S) { return S.on ? S.p.Bm * S.p.I * .1 * Math.sin(S.p.a * Math.PI / 180) * (S.p.rev ? -1 : 1) : 0; },
    update(S, dt) { dt = Math.min(dt, .05); if (S.ta != null) { setParam(S, 'a', Math.round(Q36.ease(S.p.a, S.ta, dt, 6))); if (Math.abs(S.p.a - S.ta) < 1) { setParam(S, 'a', S.ta); S.ta = null; } }
      const tgt = clamp(D.F(S) / .5 * 46, -46, 46); S.vz += ((tgt - S.z) * 60 - S.vz * 7) * dt; S.z += S.vz * dt; S.ph += Math.abs(S.on ? S.p.I : 0) * dt * 30; },
    draw(ctx, w, h, S) {
      const G = D.geo(S), g = G.g, P = (u, v, z) => Q36.P(g, u, v, z), a = S.p.a * Math.PI / 180, F = D.F(S); Q36.bg(ctx, w, h);
      Q36R.poly(ctx, [P(-g.W, -g.Dp), P(g.W, -g.Dp), P(g.W, g.Dp), P(-g.W, g.Dp)], 'rgba(255,255,255,.75)', 'rgba(100,116,139,.6)');
      const pole = (u0, u1, c, lab) => { const H = 90, v0 = -g.Dp + 10, v1 = g.Dp - 10; Q36R.poly(ctx, [P(u0, v0, H), P(u1, v0, H), P(u1, v1, H), P(u0, v1, H)], c[0], 'rgba(15,23,42,.35)'); Q36R.poly(ctx, [P(u1, v0, 0), P(u1, v0, H), P(u1, v1, H), P(u1, v1, 0)], c[2], 'rgba(15,23,42,.35)'); Q36R.poly(ctx, [P(u0, v0, 0), P(u1, v0, 0), P(u1, v0, H), P(u0, v0, H)], c[1], 'rgba(15,23,42,.45)'); const q = P((u0 + u1) / 2, v0, H / 2); Q33.T(ctx, lab, q[0], q[1], { s: 22, w: 900, c: '#fff' }); };
      pole(-g.W, -g.W + 44, ['#fca5a5', '#ef4444', '#b91c1c'], 'N');
      for (let k = -2; k <= 2; k++) { const v = k * 40, A = P(-g.W + 46, v, 40), B = P(g.W - 46, v, 40); Q36.line(ctx, [A, B], 'rgba(67,56,202,.4)', 1.5); K.raw(ctx, () => MAG9.arrowHead(ctx, A[0] + (B[0] - A[0]) * .78, A[1] + (B[1] - A[1]) * .78, Math.atan2(B[1] - A[1], B[0] - A[0]), 6, '#4338ca')); }
      // rod (suspended at height 40 + z)
      const zr = 40 + S.z, e1 = P(-G.Lr * Math.cos(a), -G.Lr * Math.sin(a), zr), e2 = P(G.Lr * Math.cos(a), G.Lr * Math.sin(a), zr), c0 = P(0, 0, zr);
      const s1 = P(-G.Lr * Math.cos(a), -G.Lr * Math.sin(a), 130), s2 = P(G.Lr * Math.cos(a), G.Lr * Math.sin(a), 130);
      Q36.line(ctx, [s1, e1], '#94a3b8', 2); Q36.line(ctx, [s2, e2], '#94a3b8', 2);
      Q36.copper(ctx, e1[0], e1[1], e2[0], e2[1], 9);
      if (S.on && S.p.I > 0) Q33.flow(ctx, S.p.rev ? [e1, e2] : [e2, e1], S.ph, 'c', { sp: 28 });
      const right = Q36.P(g, g.W - 44, 0, 0); void right;
      pole(g.W - 44, g.W, ['#93c5fd', '#3b82f6', '#1d4ed8'], 'S');
      if (Math.abs(F) > .004) { const L = clamp(Math.abs(F) / .3 * 80, 16, 90) * Math.sign(F); Q36.arr(ctx, c0[0], c0[1], c0[0], c0[1] - L, '#dc2626', 4, 12); Q33.T(ctx, 'F', c0[0] + 14, c0[1] - L / 2, { s: 15, w: 900, c: '#dc2626' }); }
      else if (S.on && S.p.I > 0) Q33.T(ctx, 'F = 0', c0[0], c0[1] - 26, { s: 13, w: 900, c: '#fff', bg: '#b91c1c' });
      // angle mark
      K.raw(ctx, () => { ctx.strokeStyle = '#0f766e'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 20; i++) { const t = a * i / 20, p = P(46 * Math.cos(t), 46 * Math.sin(t), zr); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); });
      Q33.T(ctx, 'α = ' + Math.round(S.p.a) + '°', e2[0] + 30, e2[1] - 10, { s: 11.5, w: 900, c: '#0f766e' });
      // battery + switch, wired to the suspension points
      const bx = G.L + 110, by = 560, B = Q33.bat(ctx, bx, by, { V: 6 }), kk = Q36.key(ctx, bx + 150, by - 50, !!S.on, S.on ? 'مغلق' : 'مفتوح');
      Q33.wire(ctx, [B.n, [B.n[0], s1[1]], s1], { col: '#111827' }); Q33.wire(ctx, [B.p, [B.p[0], by - 50], kk.a], { col: '#dc2626' }); Q33.wire(ctx, [kk.b, [s2[0] + 40, by - 50], [s2[0] + 40, s2[1]], s2], { col: '#dc2626' });
      const sd = Math.round(Math.sin(a) * 100) / 100;
      Q36.card(ctx, S, [{ t: !S.on ? 'الدائرة مفتوحة: لا تيار ولا قوة' : Math.abs(sd) < .05 ? 'موازٍ للمجال: لا قوة' : Math.abs(sd) > .97 ? 'عمودي على المجال: أكبر قوة' : 'زاوية مائلة: قوة أقل', c: Math.abs(F) > .004 ? '#15803d' : '#b91c1c', w: 900 },
        { t: 'F = B I L sin α', mono: 1, c: '#6d28d9', w: 900 }, { t: 'F = ' + S.p.Bm.toFixed(1) + ' × ' + S.p.I.toFixed(1) + ' × 0.1 × ' + sd.toFixed(2), mono: 1, c: '#334155' }, { t: '|F| = ' + Math.abs(F).toFixed(3) + ' N', mono: 1, c: '#b91c1c', w: 900 },
        { t: F > .004 ? 'اتجاه القوة: إلى الأعلى' : F < -.004 ? 'اتجاه القوة: إلى الأسفل' : 'لا تتحرك الساق', c: '#334155', w: 800 }], { title: 'القوة على سلك في مجال', y: 64, wd: 300 });
      const C = D.chips(S, G); Q36.drawChips(ctx, C.a); Q36.drawChips(ctx, C.b);
      Q36.banner(ctx, w, 'اسحب طرف الساق لتغيير زاويتها مع خطوط المجال');
    },
    chips(S, G) { return { a: Q36.chips(S, 'ang', [['90', 'عمودي على المجال'], ['45', 'زاوية 45°'], ['0', 'موازٍ للمجال']], G.h - 128, S.ta != null ? String(S.ta) : String(Math.round(S.p.a)), (S2, k) => { S2.ta = +k; }, { bw: 160 }),
      b: Q36.chips(S, 'sw', [['sw', S.on ? 'افتح المفتاح' : 'أغلق المفتاح'], ['rev', 'اعكس التيار']], G.h - 84, '', (S2, k) => { if (k === 'sw') S2.on = S2.on ? 0 : 1; else setParam(S2, 'rev', !S2.p.rev); }, { bw: 160 }) }; },
    drags(S) { if (!S.W) return []; const G = D.geo(S), g = G.g, a = S.p.a * Math.PI / 180, e2 = Q36.P(g, G.Lr * Math.cos(a), G.Lr * Math.sin(a), 40 + S.z), C = D.chips(S, G), bx = G.L + 110, by = 560;
      return [{ id: 'rod', x: e2[0], y: e2[1], r: 22, keep: true, tip: 'اسحب لتدوير الساق', idle: 'اسحب ✋', drag: (S2, d) => { const x = d.ox + d.x - d.sx, y = d.oy + d.y - d.sy + (40 + S2.z) * g.kz, v = (g.cy - y) / g.k, u = x - g.cx - v * g.sk * g.k; let t = Math.atan2(v, u) * 180 / Math.PI; if (t < 0) t += 180; S2.ta = null; setParam(S2, 'a', clamp(Math.round(t / 5) * 5, 0, 180)); } },
        { id: 'key', x: bx + 150, y: by - 50, w: 60, h: 36, tip: 'المفتاح', hint: false, click: S2 => { S2.on = S2.on ? 0 : 1; } }].concat(C.a, C.b); },
    readings(S) { return [rd('الزاوية α', Math.round(S.p.a) + '°'), rd('القوة F', Math.abs(D.F(S)).toFixed(3) + ' N'), rd('الاتجاه', D.F(S) > .004 ? 'إلى الأعلى' : D.F(S) < -.004 ? 'إلى الأسفل' : 'لا قوة')]; },
    record(S) { return { a: Math.round(S.p.a), F: +Math.abs(D.F(S)).toFixed(3) }; },
    cols: [['a', 'α (°)'], ['F', 'F (N)']],
    graph: { x: 'a', y: 'F', xl: 'α (°)', yl: 'F (N)' },
    explain(S) { return Q26.ex('تقفز الساق عند إغلاق المفتاح وهي عمودية على الخطوط، ولا تتحرك إذا كانت موازية لها، وتندفع بالعكس إذا عكسنا التيار.',
      'المجال المغناطيسي الناشئ حول الساق بسبب التيار يتفاعل مع مجال المغناطيس فتنشأ قوة عمودية على السلك وعلى المجال. مقدارها يعتمد على مركبة طول السلك العمودية على المجال، لذا تنعدم عند التوازي (س5).',
      'هذه القوة هي التي تدير المحرك الكهربائي في المروحة والخلاط والمثقاب والمكنسة الكهربائية.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G3 — المحرك الكهربائي للتيار المستمر (الأشكال 30 و 32 – 35) =============== */
(() => {
  const APP = [['fan', 'المروحة'], ['mix', 'الخلاط'], ['drill', 'المثقاب'], ['vac', 'المكنسة']];
  const D = { id: 'g9_em_motor', page: 127, fig: 'الأشكال 30 و 32 و 33 و 34 و 35',
    desc: 'المحرك الكهربائي جهاز يحول الطاقة الكهربائية إلى طاقة ميكانيكية بوجود مجال مغناطيسي، أي يعمل عكس المولد. يتكون محرك التيار المستمر من نواة (ملف نحاس معزول حول حديد مطاوع)، ومغناطيس دائمي قوي يوضع الملف بين قطبيه، ومبادل (نصفا حلقة معدنية معزولين يتصلان بطرفي الملف ويدوران معه)، وفرشتين من الكاربون متصلتين بقطبي مصدر تيار مستمر. عند إغلاق الدائرة يمر التيار في جانبي الملف باتجاهين متعاكسين فتتولد قوتان متساويتان متعاكستان تديران الملف، ويستمر الدوران باتجاه واحد بسبب المبادل (الشكل 35). تستعمل المحركات في المكنسة والمثقاب والخلاط والمروحة، وتختلف أحجامها من أدوات المطبخ الصغيرة إلى محركات القطارات الضخمة.',
    tags: 'المحرك الكهربائي محرك التيار المستمر DC نواة المحرك مبادل نصفا حلقة فرشتان كاربون مغناطيس دائمي قوتان متعاكستان عزم دوران المروحة الخلاط المثقاب المكنسة القطارات الرنين المغناطيسي MRI الأشكال 30 32 33 34 35 هل تعلم س7 س8',
    tools: ['مغناطيس دائمي قوي', 'ملف على قلب حديد مطاوع', 'مبادل', 'فرشتان من الكاربون', 'بطارية تيار مستمر ومفتاح'],
    steps: ['أغلق المفتاح: يمر التيار في الملف فتظهر قوتان متعاكستان على جانبيه ويبدأ الدوران.', 'لاحظ أن المبادل يعكس التيار في الملف كل نصف دورة فيستمر الدوران باتجاه واحد.', 'اختر «بدون مبادل»: يتأرجح الملف ثم يقف عمودياً.', 'اعكس البطارية: ينعكس اتجاه الدوران. وزد الفولطية أو قوة المغناطيس: يدور أسرع.', 'اختر جهازاً لترى أين يستعمل المحرك.'],
    concl: ['المحرك يحول الطاقة الكهربائية إلى طاقة ميكانيكية، أي يعمل عكس المولد.', 'يعتمد على القوة المغناطيسية المؤثرة في سلك يحمل تياراً في مجال مغناطيسي.', 'على جانبي الملف قوتان متساويتان متعاكستان تكونان عزماً يدير الملف.', 'المبادل يعكس التيار في الملف كل نصف دورة فيستمر الدوران باتجاه واحد.'],
    laws: ['g9_l6_gen'],
    controls: [R('V', 'فولطية البطارية', 0, 12, 6, 1, 'V'), R('Bm', 'قوة المغناطيس', 1, 5, 3, 1, ''), R('N', 'عدد اللفات', 10, 100, 50, 10, ''), TG('forces', 'أسهم القوى', true, null, 'arrow')],
    setup(S) { S.th = .5; S.om = 0; S.on = 0; S.com = 1; S.rv = 0; S.ph = 0; S.app = 'fan'; S.ht = 0; S.tq = 0; },
    I(S) { return S.on ? S.p.V / 3 * (S.rv ? -1 : 1) : 0; },
    cf(S) { const c = Math.cos(S.th); return S.com ? (c >= 0 ? 1 : -1) : -1; },
    update(S, dt) { dt = Math.min(dt, .03); const k = S.p.Bm * S.p.N / 150, I = D.I(S), tq = -k * I * D.cf(S) * Math.cos(S.th); S.tq = tq;
      if (S.ht > 0) { S.ht -= dt; } else { const back = S.com ? .045 * k * k * S.om : 0; S.om += (tq * 6 - S.om * (.6 + (S.com ? 0 : .8)) - back * 6) * dt; S.th += S.om * dt; }
      S.ph += Math.abs(I) * dt * 26; },
    draw(ctx, w, h, S) {
      const g = Q36R.geo(S), ph = S.th, I = D.I(S), cf = D.cf(S); Q36.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(100,116,139,.18)'; ctx.beginPath(); ctx.ellipse(g.cx - 10, g.cy + 112, 220, 26, 0, 0, TAU); ctx.fill(); });
      Q36R.poles(ctx, g); Q36R.field(ctx, g);
      const i1 = I * cf, C = Q36R.coil(ctx, g, ph, { flow: Math.abs(i1) > .05 ? Math.sign(i1) : 0, ph: S.ph });
      if (S.p.forces && Math.abs(I) > .05) [[C.s1, -i1], [C.s2, i1]].forEach(([s, fi]) => { const m = Q36R.P(g, s[0], s[1], 0), L = clamp(Math.abs(fi) * S.p.Bm * 10, 18, 62) * Math.sign(fi); Q36.arr(ctx, m[0], m[1], m[0], m[1] - L, '#dc2626', 3.5, 11); Q33.T(ctx, 'F', m[0] + 13, m[1] - L * .6, { s: 13, w: 900, c: '#dc2626' }); });
      Q36R.axle(ctx, g, g.Lz + 90);
      const T = Q36R.rings(ctx, g, ph, S.com, C); Q36R.crank(ctx, g, ph, 'fan');
      Q36R.labels(ctx, g, T, S.com);
      // battery + switch
      const by = 520, bx = g.cx - 20, B = Q33.bat(ctx, bx, by, { V: S.p.V, label: 'تيار مستمر' }), kx = bx + 140, kk = Q36.key(ctx, kx, by - 70, !!S.on, S.on ? 'مغلق' : 'مفتوح');
      const [tp, tn] = S.rv ? [B.n, B.p] : [B.p, B.n];
      const w1 = [tp, [tp[0], by - 70], kk.a], w2 = [kk.b, [kx + 50, by - 70], [kx + 50, 372], [g.cx + 30, 372], [g.cx + 30, T.t2[1]], T.t2], w3 = S.rv ? [T.t1, [g.cx - 118, T.t1[1]], [g.cx - 118, by + 48], [bx + 62, by + 48], [bx + 62, by - 52], [tn[0], by - 52], tn] : [T.t1, [g.cx - 118, T.t1[1]], [g.cx - 118, by - 56], [tn[0], by - 56], tn];
      Q33.wire(ctx, w1, { col: '#dc2626' }); Q33.wire(ctx, w2, { col: '#dc2626' }); Q33.wire(ctx, w3, { col: '#111827' });
      if (Math.abs(I) > .05) [w1, w2].forEach(p => Q33.flow(ctx, p, S.ph, 'c', { sp: 30 })), Q33.flow(ctx, w3, S.ph, 'c', { sp: 30 });
      // appliance inset
      const ax = w - 336, ay = 292, aw = 318; Q36.frame(ctx, ax, ay, aw, 128, 'المحرك داخل ' + APP.find(a => a[0] === S.app)[1]); D.appIcon(ctx, S, ax + 70, ay + 72);
      Q33.T(ctx, 'كهربائية ⟸ ميكانيكية', ax + 210, ay + 54, { s: 12, w: 900, c: '#b45309' }); Q33.T(ctx, Math.abs(S.om / TAU).toFixed(1) + ' rev/s', ax + 210, ay + 84, { s: 13, w: 900, c: '#6d28d9', mono: 1 });
      const msg = !S.on ? 'المفتاح مفتوح: لا تيار' : S.p.V === 0 ? 'لا فولطية' : S.com ? 'المبادل يعكس التيار كل نصف دورة' : (Math.abs(S.om) < .3 ? 'بدون مبادل: يقف الملف عمودياً' : 'بدون مبادل: الملف يتأرجح');
      Q36.card(ctx, S, [{ t: msg, c: S.on && (S.com || Math.abs(S.om) > .3) ? '#15803d' : '#b91c1c', w: 900 }, { t: 'قوتان متساويتان ومتعاكستان', c: '#dc2626', w: 800 }, { t: 'تيار الملف: ' + Math.abs(I).toFixed(1) + ' A', c: '#334155' },
        { t: 'الدوران: ' + (Math.abs(S.om) < .3 ? 'متوقف' : (S.om < 0 ? 'مع عقارب الساعة' : 'عكس عقارب الساعة')), c: '#6d28d9', w: 800 }], { title: 'المحرك الكهربائي DC', y: 64, wd: 300 });
      const CH = D.chips(S, g); CH.forEach(c => Q36.drawChips(ctx, c));
      Q36.banner(ctx, w, 'أغلق المفتاح ليدور المحرك، ثم جرّب بدون مبادل');
    },
    appIcon(ctx, S, x, y) { const a = -S.th; K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.lineCap = 'round';
      if (S.app === 'fan') { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, -6, 40, 0, TAU); ctx.stroke(); ctx.save(); ctx.translate(0, -6); ctx.rotate(a); for (let i = 0; i < 3; i++) { ctx.rotate(TAU / 3); ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.ellipse(18, 0, 18, 8, .3, 0, TAU); ctx.fill(); } ctx.restore(); ctx.fillStyle = '#475569'; ctx.fillRect(-4, 34, 8, 14); ctx.fillRect(-22, 46, 44, 6); }
      else if (S.app === 'mix') { ctx.fillStyle = '#ef4444'; rr(ctx, -26, 18, 52, 30, 8); ctx.fill(); ctx.fillStyle = 'rgba(186,230,253,.7)'; ctx.beginPath(); ctx.moveTo(-22, -40); ctx.lineTo(22, -40); ctx.lineTo(14, 18); ctx.lineTo(-14, 18); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.stroke(); ctx.save(); ctx.translate(0, 6); ctx.scale(1, .35); ctx.rotate(a * 2); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(12, 0); ctx.moveTo(0, -12); ctx.lineTo(0, 12); ctx.stroke(); ctx.restore(); }
      else if (S.app === 'drill') { ctx.fillStyle = '#16a34a'; rr(ctx, -40, -18, 56, 28, 8); ctx.fill(); ctx.fillStyle = '#1f2937'; rr(ctx, -26, 6, 18, 40, 5); ctx.fill(); ctx.fillStyle = '#475569'; ctx.fillRect(16, -10, 10, 12); const sp = ((a * 6) % 6 + 6) % 6; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(26, -4); ctx.lineTo(56, -4); ctx.stroke(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; for (let k = 0; k < 5; k++) { const xx = 30 + k * 6 + sp; ctx.beginPath(); ctx.moveTo(xx, -7); ctx.lineTo(xx + 3, -1); ctx.stroke(); } }
      else { ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.ellipse(-8, 20, 30, 22, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(14, 8); ctx.quadraticCurveTo(40, -30, 30, -44); ctx.stroke(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(-8, 20, 9, 0, TAU); ctx.fill(); ctx.save(); ctx.translate(-8, 20); ctx.rotate(a); ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-7, 0); ctx.lineTo(7, 0); ctx.stroke(); ctx.restore(); }
      ctx.restore(); }); },
    chips(S, g) { return [Q36.chips(S, 'app', APP, g.h - 172, S.app, (S2, k) => { S2.app = k; }, { bw: 120 }),
      Q36.chips(S, 'com', [['com', 'مع المبادل'], ['ring', 'بدون مبادل']], g.h - 128, S.com ? 'com' : 'ring', (S2, k) => { S2.com = k === 'com' ? 1 : 0; }, { bw: 150 }),
      Q36.chips(S, 'act', [['sw', S.on ? 'افتح المفتاح' : 'أغلق المفتاح'], ['rv', 'اعكس البطارية'], ['push', 'ادفع الملف']], g.h - 84, '', (S2, k) => { if (k === 'sw') S2.on = S2.on ? 0 : 1; else if (k === 'rv') S2.rv = S2.rv ? 0 : 1; else S2.om += S2.om <= 0 ? -4 : 4; }, { bw: 150 })]; },
    drags(S) { if (!S.W) return []; const g = Q36R.geo(S), c = Q36R.P(g, 0, 0, g.zf), CH = D.chips(S, g), bx = g.cx - 20, by = 520;
      return [{ id: 'key', x: bx + 140, y: by - 70, w: 60, h: 36, tip: 'المفتاح', idle: 'اضغط ✋', click: S2 => { S2.on = S2.on ? 0 : 1; } },
        { id: 'rot', x: c[0] + 26 * Math.cos(-S.th), y: c[1] + 26 * Math.sin(-S.th), r: 26, cx: c[0], cy: c[1], keep: true, hint: false, tip: 'دوّر الملف بيدك', drag: (S2, d) => { S2.ht = .2; const da = -(d.dang || 0); S2.th += da; S2.om = da / .03; } }].concat(CH[0], CH[1], CH[2]); },
    readings(S) { return [rd('المفتاح', S.on ? 'مغلق' : 'مفتوح'), rd('تيار الملف', Math.abs(D.I(S)).toFixed(1) + ' A'), rd('سرعة الدوران', Math.abs(S.om / TAU).toFixed(2) + ' rev/s'), rd('المبادل', S.com ? 'موجود' : 'غير موجود')]; },
    record(S) { return { V: S.p.V, n: +Math.abs(S.om / TAU).toFixed(2) }; },
    cols: [['V', 'V (V)'], ['n', 'rev/s']],
    explain(S) { return Q26.ex(S.com ? 'عند إغلاق المفتاح يدور الملف باستمرار باتجاه واحد، ويدور أسرع بزيادة الفولطية أو قوة المغناطيس.' : 'بدون مبادل يتأرجح الملف قليلاً ثم يستقر عمودياً بين القطبين ولا يكمل الدوران.',
      'التيار في جانبي الملف متعاكس، فتؤثر فيهما قوتان متساويتان متعاكستان تديران الملف. عندما يتجاوز الملف الوضع العمودي يعكس المبادل التيار فيه فتبقى القوتان تديرانه بالاتجاه نفسه.',
      'المحركات في المروحة والخلاط والمثقاب والمكنسة الكهربائية، وفي القطارات محركات أضخم. ومن التطبيقات الحديثة للمجال المغناطيسي جهاز التصوير بالرنين المغناطيسي MRI.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== R — أسئلة الفصل السادس (س2 – س9) بحلول خطوة خطوة ورسوم تفاعلية =============== */
(() => {
  const QS = {
    q2: { n: 'س2 المغناطيس', title: 'س2: المغناطيس الكهربائي', q: 'بمَ يتميز المغناطيس الكهربائي عن الدائمي؟', lines: ['1- نشغله ونطفئه بغلق الدائرة وفتحها', '2- نتحكم في قوته بالتيار وعدد اللفات', '3- نعكس قطبيه بعكس اتجاه التيار', '4- يزول مغناطيسه بانقطاع التيار لأن قلبه حديد مطاوع'] },
    q3: { n: 'س3 الملف', title: 'س3: ساق مغناطيسية في ملف', q: 'ما سبب التيار؟ وما مصدر الطاقة؟', lines: ['a- حركة الساق تغيّر المجال عبر الملف', 'فتتولد قوة دافعة كهربائية محتثة emf', 'تسبب انسياب تيار محتث في الملي أميتر', 'b- مصدر الطاقة: الشغل المبذول لتحريك الساق'] },
    q4: { n: 'س4 الخطوط', title: 'س4: رسم خطوط المجال', q: 'ارسم خطوط المجال لتيار مستمر في:', lines: ['1- سلك مستقيم: دوائر متحدة المركز حوله', 'تتباعد كلما ابتعدنا عن السلك', '2- حلقة: دوائر حول كل جانب', 'وخطوط شبه مستقيمة في مركزها', '3- ملف لولبي: خطوط متوازية داخله', 'وخارجه يشبه مجال ساق مغناطيسية'] },
    q5: { n: 'س5 القوة', title: 'س5: سلك في مجال منتظم', q: 'متى يتأثر السلك بقوة مغناطيسية؟', lines: ['a- عمودي على الخطوط: يتأثر بأكبر قوة', 'لأنه يقطع خطوط المجال', 'b- موازٍ للخطوط: لا يتأثر بأي قوة', 'لأنه لا يقطع خطوط المجال'] },
    q6: { n: 'س6 الحديد', title: 'س6: قطعة حديد في جوف الملف', q: 'علّل: يزداد المجال عند وضع حديد في الملف', lines: ['الحديد مادة مغناطيسية يتمغنط بالحث بسهولة', 'فيضاف مجاله إلى مجال الملف', 'ويركز خطوط المجال داخله', 'فيزداد المجال المغناطيسي كثيراً'] },
    q7: { n: 'س7 المكونات', title: 'س7: المكونات الأساسية', q: 'ما مكونات المولد؟ وما مكونات المحرك؟', lines: ['المولد: ملف معزول حول حديد مطاوع', 'وحلقتان معدنيتان معزولتان', 'وفرشتان من الكاربون', 'ومغناطيس دائمي أو كهربائي بشكل U', 'المحرك: نواة ملف نحاس حول حديد مطاوع', 'ومغناطيس دائمي قوي ومبادل', 'وفرشتا كاربون متصلتان بمصدر تيار مستمر'] },
    q8: { n: 'س8 المبدأ', title: 'س8: مبدأ العمل', q: 'ما مبدأ عمل المحرك والمولد؟', lines: ['a- المحرك: قوة مغناطيسية على سلك', 'يحمل تياراً مستمراً في مجال مغناطيسي', 'فيحول الطاقة الكهربائية إلى ميكانيكية', 'b- المولد: الحث الكهرومغناطيسي', 'دوران الملف يقطع الخطوط فتتولد emf', 'فيحول الطاقة الميكانيكية إلى كهربائية'] },
    q9: { n: 'س9 المولدان', title: 'س9: مولدا التيار المتناوب والمستمر', q: 'ما الفرق في الأجزاء والتيار الخارج؟', lines: ['a- المتناوب: حلقتا زلق كاملتان', 'المستمر: مبادل من نصفي حلقة معزولين', 'b- المتناوب: تيار يغير اتجاهه كل نصف دورة', 'المستمر: تيار باتجاه واحد'] }
  };
  const K8 = Object.keys(QS);
  const D = { id: 'g9_em_review', page: 129, fig: 'أسئلة الفصل السادس ص 129 – 132',
    desc: 'حلول أسئلة الفصل السادس خطوة خطوة مع رسم تفاعلي لكل سؤال: مميزات المغناطيس الكهربائي (س2)، سبب التيار المحتث ومصدر طاقته (س3)، رسم خطوط المجال لسلك وحلقة وملف لولبي (س4)، القوة على سلك عمودي أو موازٍ للمجال (س5)، أثر الحديد في جوف الملف (س6)، مكونات المولد والمحرك (س7)، مبدأ عمل كل منهما (س8)، والفرق بين مولد التيار المتناوب ومولد التيار المستمر (س9).',
    tags: 'أسئلة الفصل السادس حلول س2 س3 س4 س5 س6 س7 س8 س9 مغناطيس كهربائي دائمي تيار محتث ملي أميتر خطوط المجال سلك حلقة ملف لولبي قوة مغناطيسية حديد مطاوع مكونات المولد المحرك مبدأ العمل AC DC مبادل حلقتا زلق مراجعة',
    tools: ['ورقة وقلم', 'المختبر الافتراضي'],
    steps: ['اختر السؤال من الأزرار.', 'حاول الإجابة بنفسك وأنت تراقب الرسم التفاعلي.', 'اضغط «الحل خطوة خطوة» ثم «الخطوة التالية» لتقارن إجابتك.', 'في س2 اضغط المفتاح، وفي س3 اسحب الساق المغناطيسية، وفي س5 اسحب السلك.'],
    concl: ['المغناطيس الكهربائي يمكن التحكم في تشغيله وقوته وقطبيه.', 'التيار المحتث سببه تغير المجال عبر الملف ومصدر طاقته الشغل الميكانيكي.', 'القوة على سلك يحمل تياراً أكبر ما يمكن عند التعامد وصفر عند التوازي.', 'المولد يعمل بالحث الكهرومغناطيسي والمحرك بالقوة المغناطيسية، والمبادل يجعل التيار مستمراً.'],
    laws: ['g9_l6_emag', 'g9_l6_induct', 'g9_l6_gen'],
    controls: [TG('anim', 'تحريك الرسم', true, null, 'play')],
    setup(S) { S.q = 'q2'; S.ex = 0; S.k = 0; S.tt = 0; S.sw = 1; S.mx = 0; S.tm = 0; S.pmx = 0; S.gn = 0; S.wa = 90; S.twa = 90; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 352; return { w, h, L, x0, x1, cx: (x0 + x1) / 2, y0: 84, y1: h - 196 }; },
    update(S, dt) { dt = Math.min(dt, .05); if (S.p.anim) S.tt += dt; const g = D.geo(S);
      if (S.q === 'q3') { if (S.tm === 0 && S.mx === 0) { S.mx = S.tm = g.x1 - 70; S.pmx = S.mx; } if (S.p.anim && S.auto3 !== 0) S.tm = g.cx + 30 + (g.x1 - 70 - g.cx - 30) * (.5 + .5 * Math.cos(S.tt * 1.6)); S.mx = Q36.ease(S.mx, S.tm, dt, 10); const v = (S.mx - S.pmx) / Math.max(dt, 1e-3); S.pmx = S.mx; const near = Math.exp(-(((S.mx - (g.cx - 30)) / 110) ** 2)); S.gn = Q36.ease(S.gn, clamp(-v * near / 260, -1.1, 1.1), dt, 12); }
      if (S.q === 'q5') S.wa = Q36.ease(S.wa, S.twa, dt, 8); },
    draw(ctx, w, h, S) { const g = D.geo(S), Q = QS[S.q]; Q36.bg(ctx, w, h); D['d' + S.q](ctx, S, g);
      Q42.steps(ctx, S, { title: Q.title, q: Q.q, lines: Q.lines, k: S.ex ? S.k : 0 }, { y: 64, x: w - 12, wd: 320 });
      const C = D.chips(S, g); C.forEach(c => Q36.drawChips(ctx, c));
      Q36.banner(ctx, w, 'اختر السؤال ثم اعرض الحل خطوة خطوة'); },
    /* ---- س2: electromagnet vs permanent magnet ---- */
    dq2(ctx, S, g) { const on = !!S.sw, y1 = g.y0 + 90, y2 = g.y0 + 300, cx = g.cx;
      Q36.frame(ctx, g.x0, g.y0 + 6, g.x1 - g.x0, 190, 'مغناطيس كهربائي'); Q36.frame(ctx, g.x0, g.y0 + 216, g.x1 - g.x0, 170, 'مغناطيس دائمي');
      Q36.core(ctx, cx - 110, y1, 200, 24, 'fe'); Q36.coilH(ctx, cx - 90, cx + 60, y1, 18, 9, 'back'); Q36.coilH(ctx, cx - 90, cx + 60, y1, 18, 9, 'front');
      if (on) { Q33.T(ctx, 'N', cx + 104, y1 - 26, { s: 13, w: 900, c: '#b91c1c' }); Q33.T(ctx, 'S', cx - 124, y1 - 26, { s: 13, w: 900, c: '#1d4ed8' }); }
      const clip = (x, y, a) => K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.2; rr(ctx, -4, -9, 8, 18, 4); ctx.stroke(); ctx.restore(); });
      for (let i = 0; i < 4; i++) { const hang = on ? [cx + 98 + i * 3, y1 + 22 + i * 15] : [cx + 70 + i * 16, y1 + 70]; clip(hang[0], hang[1], on ? .1 * i : Math.PI / 2); }
      const k = Q36.key(ctx, cx - 40, y1 + 52, on, on ? 'التيار يمر: يجذب' : 'التيار مقطوع: لا يجذب');
      Q33.wire(ctx, [[cx - 90, y1 + 18], [cx - 90, y1 + 52], k.a], { col: '#2563eb' }); Q33.wire(ctx, [k.b, [cx + 60, y1 + 52], [cx + 60, y1 + 18]], { col: '#2563eb' });
      const m = MAG9.bar(cx - 10, y2 - 30, Math.PI, 200, 30, 1); MAG9.drawMag(ctx, m); for (let i = 0; i < 4; i++) clip(cx + 98 + i * 3, y2 - 8 + i * 15, .1 * i);
      Q33.T(ctx, 'يجذب دائماً ولا نتحكم فيه', cx, y2 + 64, { s: 11, w: 800, c: '#334155' }); },
    /* ---- س3: magnet in a coil + milliammeter ---- */
    dq3(ctx, S, g) { const cy = g.y0 + 120, x0 = g.cx - 120, x1 = g.cx + 60; Q33.T(ctx, 'اسحب الساق داخل الملف وخارجه', g.cx, g.y0 + 14, { s: 11, w: 800, c: '#6d28d9' });
      const m = MAG9.bar(S.mx, cy, Math.PI, 150, 30, 1), ins = S.mx - 75 < x1;
      Q36.coilH(ctx, x0, x1, cy, 42, 8, 'back', { sl: .3 }); if (ins) MAG9.drawMag(ctx, m); Q36.coilH(ctx, x0, x1, cy, 42, 8, 'front', { sl: .3 }); if (!ins) MAG9.drawMag(ctx, m);
      const G = Q34.galv(ctx, g.cx - 30, g.y0 + 330, S.gn, { w: 140, h: 106, name: 'ملي أميتر' });
      Q33.wire(ctx, [[x0, cy + 42], [x0, G.l[1]], G.l], { col: '#16a34a' }); Q33.wire(ctx, [[x1, cy + 42], [x1 + 40, cy + 120], [x1 + 40, G.r[1]], G.r], { col: '#16a34a' });
      Q33.T(ctx, Math.abs(S.gn) > .05 ? 'تيار محتث: الساق تتحرك' : 'لا تيار: لا حركة نسبية', g.cx - 30, g.y0 + 420, { s: 11.5, w: 900, c: '#fff', bg: Math.abs(S.gn) > .05 ? '#15803d' : '#b91c1c' }); },
    /* ---- س4: field-line sketches ---- */
    dq4(ctx, S, g) { const show = i => !S.ex || S.k >= [1, 3, 5][i], hh = 150, cx = g.cx, col = 'rgba(67,56,202,.75)';
      const ell = (x, y, rx, ry, dir) => K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, TAU); ctx.stroke(); MAG9.arrowHead(ctx, x, y - ry, dir > 0 ? Math.PI : 0, 5, '#4338ca'); });
      const panel = (i, title, fn) => { const y = g.y0 + 4 + i * (hh + 8); Q36.frame(ctx, g.x0, y, g.x1 - g.x0, hh, title); if (show(i)) fn(y + hh / 2 + 6); else Q33.T(ctx, 'اضغط الخطوة التالية', cx, y + hh / 2, { s: 11, w: 800, c: '#94a3b8' }); };
      panel(0, '1- سلك مستقيم', y => { [20, 36, 56].forEach(r => ell(cx, y, r, r, 1)); Q36.dot(ctx, cx, y, 9, 1); Q33.T(ctx, 'التيار خارج من الورقة', cx + 120, y + 50, { s: 10, w: 800, c: '#334155' }); });
      panel(1, '2- حلقة دائرية', y => { const a = cx - 60, b = cx + 60; [16, 30].forEach(r => { ell(a, y, r, r, -1); ell(b, y, r, r, 1); }); Q36.line(ctx, [[a + 34, y], [b - 34, y]], col, 1.8); K.raw(ctx, () => MAG9.arrowHead(ctx, cx, y, Math.PI, 6, '#4338ca')); Q36.dot(ctx, a, y, 8, -1); Q36.dot(ctx, b, y, 8, 1); });
      panel(2, '3- ملف لولبي', y => { const x0 = cx - 80, x1 = cx + 80; for (let k = 0; k < 6; k++) { const x = x0 + 16 + k * 26; Q36.dot(ctx, x, y - 22, 6, -1); Q36.dot(ctx, x, y + 22, 6, 1); }
        [-8, 0, 8].forEach(d => { Q36.line(ctx, [[x0 - 20, y + d], [x1 + 20, y + d]], col, 1.6); K.raw(ctx, () => MAG9.arrowHead(ctx, cx, y + d, Math.PI, 5, '#4338ca')); });
        K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 1.5; [40, 56].forEach(r => { ctx.beginPath(); ctx.ellipse(cx, y, x1 - x0 + 10 - 40 + r, r, 0, Math.PI, TAU); ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx, y, x1 - x0 + 10 - 40 + r, r, 0, 0, Math.PI); ctx.stroke(); }); });
        Q33.T(ctx, 'N', x0 - 34, y, { s: 14, w: 900, c: '#b91c1c' }); Q33.T(ctx, 'S', x1 + 34, y, { s: 14, w: 900, c: '#1d4ed8' }); }); },
    /* ---- س5: perpendicular vs parallel wire ---- */
    dq5(ctx, S, g) { const cx = g.cx, cy = g.y0 + 200, a = S.wa * Math.PI / 180, L = 110, F = Math.sin(a);
      Q36.frame(ctx, g.x0, g.y0 + 6, g.x1 - g.x0, 380, 'سلك يحمل تياراً في مجال منتظم');
      K.raw(ctx, () => { ctx.fillStyle = '#ef4444'; rr(ctx, g.x0 + 14, cy - 110, 34, 220, 6); ctx.fill(); ctx.fillStyle = '#3b82f6'; rr(ctx, g.x1 - 48, cy - 110, 34, 220, 6); ctx.fill(); });
      Q33.T(ctx, 'N', g.x0 + 31, cy, { s: 16, w: 900, c: '#fff' }); Q33.T(ctx, 'S', g.x1 - 31, cy, { s: 16, w: 900, c: '#fff' });
      for (let k = -3; k <= 3; k++) { const y = cy + k * 30; Q36.line(ctx, [[g.x0 + 52, y], [g.x1 - 52, y]], 'rgba(67,56,202,.35)', 1.4); K.raw(ctx, () => MAG9.arrowHead(ctx, g.x0 + 80, y, 0, 5, '#4338ca')); }
      const e1 = [cx - L * Math.cos(a), cy + L * Math.sin(a)], e2 = [cx + L * Math.cos(a), cy - L * Math.sin(a)]; Q36.copper(ctx, e1[0], e1[1], e2[0], e2[1], 8); Q33.flow(ctx, [e1, e2], S.tt * 30, 'c', { sp: 30 });
      if (F > .05) { const r = 8 + 6 * F; K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(cx + 70, cy + 70, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.4; const q = r * .5; ctx.beginPath(); ctx.moveTo(cx + 70 - q, cy + 70 - q); ctx.lineTo(cx + 70 + q, cy + 70 + q); ctx.moveTo(cx + 70 + q, cy + 70 - q); ctx.lineTo(cx + 70 - q, cy + 70 + q); ctx.stroke(); }); Q33.T(ctx, 'القوة F داخلة في الورقة', cx + 70, cy + 98, { s: 10.5, w: 900, c: '#dc2626' }); }
      Q33.T(ctx, F > .97 ? 'عمودي: أكبر قوة' : F < .05 ? 'موازٍ: لا قوة F = 0' : 'مائل: قوة أقل', cx, g.y0 + 360, { s: 12, w: 900, c: '#fff', bg: F < .05 ? '#b91c1c' : '#15803d' }); },
    /* ---- س6: air core vs iron core ---- */
    dq6(ctx, S, g) { const cx = g.cx; [['بدون حديد: مجال ضعيف', 0, g.y0 + 100], ['مع قلب حديد: مجال قوي', 1, g.y0 + 290]].forEach(([t, fe, y]) => {
      Q36.frame(ctx, g.x0, y - 90, g.x1 - g.x0, 170, t); if (fe) Q36.core(ctx, cx - 90, y, 180, 26, 'fe');
      const n = fe ? 7 : 2; for (let i = 0; i < n; i++) { const d = (i - (n - 1) / 2) * (fe ? 6 : 14), ry = fe ? 24 + i * 6 : 32 + i * 16; K.raw(ctx, () => { ctx.strokeStyle = 'rgba(67,56,202,.6)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.ellipse(cx, y, (fe ? 104 : 112) + i * 3, ry, 0, 0, TAU); ctx.stroke(); }); Q36.line(ctx, [[cx - 70, y + d], [cx + 70, y + d]], 'rgba(67,56,202,.6)', 1.3); }
      Q36.coilH(ctx, cx - 70, cx + 70, y, 20, 8, 'back'); Q36.coilH(ctx, cx - 70, cx + 70, y, 20, 8, 'front');
      const p = .5 + .5 * Math.sin(S.tt * 3); Q36.bar(ctx, g.x0 + 20, y + 58, g.x1 - g.x0 - 40, 10, fe ? .9 - .05 * p : .2 + .02 * p, fe ? '#7c3aed' : '#a78bfa'); }); },
    /* ---- س7: parts of generator and motor ---- */
    dq7(ctx, S, g) { const cx = g.cx; [['المولد', g.y0 + 100, 0], ['المحرك', g.y0 + 290, 1]].forEach(([t, y, dc]) => { Q36.frame(ctx, g.x0, y - 90, g.x1 - g.x0, 172, t);
      const a = S.tt * (dc ? -2 : 2), xL = g.x0 + 20, xR = g.x1 - 20;
      K.raw(ctx, () => { ctx.fillStyle = '#ef4444'; rr(ctx, xL, y - 50, 36, 100, 5); ctx.fill(); ctx.fillStyle = '#3b82f6'; rr(ctx, xR - 36, y - 50, 36, 100, 5); ctx.fill();
        ctx.save(); ctx.translate(cx - 30, y); ctx.scale(Math.cos(a), 1); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(-40, -34, 80, 68); ctx.strokeStyle = '#d97706'; ctx.lineWidth = 5; ctx.strokeRect(-46, -40, 92, 80); ctx.restore();
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx - 30, y); ctx.lineTo(cx + 70, y + 40); ctx.stroke(); });
      Q33.T(ctx, 'N', xL + 18, y, { s: 14, w: 900, c: '#fff' }); Q33.T(ctx, 'S', xR - 18, y, { s: 14, w: 900, c: '#fff' });
      const rx = cx + 56, ry = y + 33; if (dc) { K.raw(ctx, () => { ctx.lineWidth = 6; ctx.strokeStyle = '#ea580c'; ctx.beginPath(); ctx.arc(rx, ry, 12, a + .2, a + Math.PI - .2); ctx.stroke(); ctx.strokeStyle = '#ca8a04'; ctx.beginPath(); ctx.arc(rx, ry, 12, a + Math.PI + .2, a - .2); ctx.stroke(); }); }
      else [0, 14].forEach(d => K.raw(ctx, () => { ctx.lineWidth = 6; ctx.strokeStyle = '#ca8a04'; ctx.beginPath(); ctx.arc(rx - d * .7 + 8, ry - 6 + d * .5, 11, 0, TAU); ctx.stroke(); }));
      K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; ctx.fillRect(rx - 30, ry - 6, 12, 12); ctx.fillRect(rx + 20, ry - 6, 12, 12); });
      Q33.T(ctx, dc ? 'مبادل + فرشتان + بطارية' : 'حلقتا زلق + فرشتان', cx + 36, y + 66, { s: 10, w: 800, c: '#334155' }); }); },
    /* ---- س8: energy flow ---- */
    dq8(ctx, S, g) { const cx = g.cx, box = (x, y, t, c) => { K.raw(ctx, () => { ctx.fillStyle = c; rr(ctx, x - 62, y - 22, 124, 44, 10); ctx.fill(); }); Q33.T(ctx, t, x, y, { s: 11.5, w: 900, c: '#fff' }); };
      [['المحرك الكهربائي', g.y0 + 100, 'طاقة كهربائية', 'طاقة ميكانيكية', 'القوة المغناطيسية على سلك يحمل تياراً'], ['المولد الكهربائي', g.y0 + 290, 'طاقة ميكانيكية', 'طاقة كهربائية', 'الحث الكهرومغناطيسي']].forEach(([t, y, a, b, p], i) => {
        Q36.frame(ctx, g.x0, y - 90, g.x1 - g.x0, 170, t); const xa = g.x0 + 80, xb = g.x1 - 80, f = (S.tt * .6 + i * .5) % 1;
        box(xa, y - 16, a, i ? '#0f766e' : '#b45309'); box(xb, y - 16, b, i ? '#b45309' : '#0f766e'); Q36.arr(ctx, xa + 66, y - 16, xb - 66, y - 16, '#6d28d9', 3, 11);
        K.raw(ctx, () => { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(xa + 66 + (xb - xa - 132) * f, y - 16, 6, 0, TAU); ctx.fill(); });
        Q33.T(ctx, p, (xa + xb) / 2, y + 40, { s: 11, w: 800, c: '#334155', maxW: g.x1 - g.x0 - 20 }); }); },
    /* ---- س9: AC vs DC output ---- */
    dq9(ctx, S, g) { const n = 120, A = [], Dd = []; for (let i = 0; i < n; i++) { const t = S.tt * 3 + i * .09; A.push(Math.sin(t)); Dd.push(Math.abs(Math.sin(t))); }
      Q36.frame(ctx, g.x0, g.y0 + 6, g.x1 - g.x0, 180, 'التيار المتناوب: حلقتا زلق'); Q36.frame(ctx, g.x0, g.y0 + 206, g.x1 - g.x0, 180, 'التيار المستمر: مبادل');
      const a = S.tt * 3, cx = g.x0 + 50; K.raw(ctx, () => { ctx.lineWidth = 7; ctx.strokeStyle = '#ca8a04'; ctx.beginPath(); ctx.arc(cx, g.y0 + 96, 18, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#a16207'; ctx.beginPath(); ctx.arc(cx, g.y0 + 136, 18, 0, TAU); ctx.stroke();
        ctx.strokeStyle = '#ea580c'; ctx.beginPath(); ctx.arc(cx, g.y0 + 316, 20, a + .2, a + Math.PI - .2); ctx.stroke(); ctx.strokeStyle = '#ca8a04'; ctx.beginPath(); ctx.arc(cx, g.y0 + 316, 20, a + Math.PI + .2, a - .2); ctx.stroke(); });
      const tw = g.x1 - g.x0 - 110; Q36.trace(ctx, g.x0 + 96, g.y0 + 60, tw, 100, A, { n, lab: 'يغير اتجاهه', col: '#60a5fa' }); Q36.trace(ctx, g.x0 + 96, g.y0 + 260, tw, 100, Dd, { n, lab: 'باتجاه واحد', col: '#4ade80' }); },
    chips(S, g) { const pick = (S2, k) => { S2.q = k; S2.ex = 0; S2.k = 0; S2.tt = 0; S2.tm = 0; S2.mx = 0; S2.auto3 = 1; };
      return [Q36.chips(S, 'qa', K8.slice(0, 4).map(k => [k, QS[k].n]), g.h - 172, S.q, pick, { bw: 124 }), Q36.chips(S, 'qb', K8.slice(4).map(k => [k, QS[k].n]), g.h - 128, S.q, pick, { bw: 124 }), Q41.stepChips(S, 'ex', g.h - 84, g.L)]; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); let L = [];
      if (S.q === 'q2') L = [{ id: 'sw', x: g.cx - 40, y: g.y0 + 142, w: 60, h: 36, tip: 'المفتاح', idle: 'اضغط ✋', click: S2 => { S2.sw = S2.sw ? 0 : 1; } }];
      if (S.q === 'q3') L = [{ id: 'mag', x: S.mx, y: g.y0 + 120, w: 150, h: 40, axis: 'x', keep: true, tip: 'اسحب الساق', idle: 'اسحب ✋', drag: (S2, d) => { S2.auto3 = 0; S2.tm = clamp(d.ox + d.x - d.sx, g.x0 + 60, g.x1 - 40); } }];
      if (S.q === 'q5') { const a = S.wa * Math.PI / 180; L = [{ id: 'wire', x: g.cx + 110 * Math.cos(a), y: g.y0 + 200 - 110 * Math.sin(a), r: 22, cx: g.cx, cy: g.y0 + 200, keep: true, tip: 'اسحب لتدوير السلك', idle: 'دوّر ✋', drag: (S2, d) => { S2.twa = clamp(S2.twa - (d.dang || 0) * 180 / Math.PI, 0, 180); } }]; }
      if (!L.length && C[0][0]) C[0][0].idle = 'اختر ✋';
      return L.concat(C[0], C[1], C[2]); },
    readings(S) { return [rd('السؤال', QS[S.q].n), rd('خطوات الحل', (S.ex ? S.k : 0) + ' / ' + QS[S.q].lines.length)]; },
    explain(S) { const Q = QS[S.q]; return Q26.ex(Q.q, Q.lines.join('، '), 'راجع التجربة المرتبطة بالسؤال في هذا الفصل لتشاهد الظاهرة بنفسك.'); }
  };
  M8.P[D.id] = D;
})();

/* ====================== المجاميع (بترتيب الكتاب) ====================== */
const M96 = M => M8.merge(Object.assign({ ch: 36, reg: X9 }, M));
M96({ id: 'g9_c6_oersted', sec: '1-6 المجال المغناطيسي للتيار الكهربائي', page: 113, kind: 'نشاط', fig: 'الشكلان 1 و 2',
  title: 'تجربة أورستد: التيار الكهربائي يولد مجالاً مغناطيسياً',
  desc: 'نضع سلكاً فوق إبرة مغناطيسية وموازياً لها ونمرر تياراً برهة قصيرة فتنحرف الإبرة، ونعكس التيار فتنحرف بالعكس: كل سلك يحمل تياراً يولد حوله مجالاً مغناطيسياً.',
  tags: 'أورستد 1820 الإبرة المغناطيسية انحراف تيار مستمر مجال مغناطيسي حول سلك عكس التيار',
  fact: ['اكتشف أورستد سنة 1820 أن التيار الكهربائي المار في سلك يحرف إبرة مغناطيسية قريبة منه (ص 113).', 'عكس اتجاه التيار يعكس اتجاه انحراف الإبرة (ص 113).', 'نمرر التيار برهة قصيرة لئلا تستنفد البطارية ويسخن السلك (ص 114).'],
  quiz: [
    { q: 'الشحنات الكهربائية المتحركة تولد:', o: ['مجالاً كهربائياً ومجالاً مغناطيسياً', 'مجالاً كهربائياً فقط', 'مجالاً مغناطيسياً فقط'], a: 0, why: 'س1-8 ص 131: الشحنات تولد مجالاً كهربائياً دائماً، وعند حركتها تولد مجالاً مغناطيسياً أيضاً.' },
    { q: 'ماذا يحدث لانحراف الإبرة في تجربة أورستد عند عكس اتجاه التيار؟', o: ['ينعكس اتجاه الانحراف', 'يبقى كما هو', 'لا تنحرف الإبرة', 'يتضاعف الانحراف'], a: 0, why: 'ص 113: اتجاه المجال المغناطيسي يعتمد على اتجاه التيار.' }
  ],
  parts: [{ id: 'g9_em_oersted', n: 'تجربة أورستد والإبرة المغناطيسية' }] });
M96({ id: 'g9_c6_wire', sec: '2-6 المجال المغناطيسي المحيط بسلك موصل مستقيم', page: 114, kind: 'نشاط', fig: 'الأشكال 3 – 9',
  title: 'المجال المغناطيسي حول سلك مستقيم وقاعدة اليد اليمنى',
  desc: 'نمرر سلكاً عمودياً عبر لوح مقوى ونرش برادة الحديد ونضع بوصلات: الخطوط دوائر متحدة المركز حول السلك، ويحدد اتجاهها بقاعدة اليد اليمنى، ويضعف المجال كلما ابتعدنا عن السلك.',
  tags: 'سلك مستقيم برادة الحديد بوصلات دوائر متحدة المركز قاعدة اليد اليمنى اتجاه المجال شدة المجال البعد',
  fact: ['خطوط المجال حول سلك مستقيم دوائر متحدة المركز في مستوى عمودي على السلك (ص 115).', 'قاعدة اليد اليمنى: الإبهام باتجاه التيار والأصابع الملتفة تشير إلى اتجاه المجال (ص 116).', 'يضعف المجال كلما ابتعدنا عن السلك ويقوى بزيادة التيار (ص 115).'],
  quiz: [
    { q: 'شكل خطوط المجال المغناطيسي حول سلك مستقيم يحمل تياراً:', o: ['دوائر متحدة المركز حول السلك', 'خطوط مستقيمة موازية للسلك', 'خطوط تخرج من طرف السلك', 'لا توجد خطوط'], a: 0, why: 'ص 115 وس4 ص 131.' },
    { q: 'في قاعدة اليد اليمنى للسلك المستقيم يشير الإبهام إلى:', o: ['اتجاه التيار', 'اتجاه المجال', 'القطب الشمالي', 'اتجاه القوة'], a: 0, why: 'ص 116: الأصابع الملتفة تشير إلى اتجاه المجال.' }
  ],
  parts: [{ id: 'g9_em_wire', n: 'برادة الحديد والبوصلات حول السلك' }, { id: 'g9_em_dir', n: 'اتجاه المجال وقاعدة اليد اليمنى' }] });
M96({ id: 'g9_c6_coil', sec: '3-6 المجال المغناطيسي لحلقة موصلة وملف لولبي', page: 117, kind: 'نشاط', fig: 'الأشكال 10 – 15',
  title: 'المجال المغناطيسي لحلقة دائرية ولملف لولبي',
  desc: 'نمرر تياراً في حلقة دائرية ثم في ملف لولبي ونرسم خطوط المجال بالبرادة والبوصلات: الحلقة تشبه مغناطيساً قصيراً، والملف اللولبي يشبه ساقاً مغناطيسية ومجاله منتظم داخله.',
  tags: 'حلقة دائرية ملف لولبي حلزوني مجال منتظم ساق مغناطيسية قطب شمالي قاعدة اليد اليمنى للملف الإلكترون حول النواة',
  fact: ['خطوط المجال في مركز الحلقة تكون شبه مستقيمة ومتعامدة على مستواها (ص 117).', 'مجال الملف اللولبي يشبه مجال ساق مغناطيسية، ويكون منتظماً داخله (ص 118).', 'يزداد مجال الملف بزيادة التيار وعدد اللفات لوحدة الطول (ص 119).'],
  quiz: [
    { q: 'المجال المغناطيسي داخل ملف لولبي يحمل تياراً:', o: ['منتظم وخطوطه متوازية', 'صفر', 'دوائر حول كل لفة فقط', 'يتجه نحو جدار الملف'], a: 0, why: 'ص 118 وس4-3 ص 131.' },
    { q: 'المجال المغناطيسي لملف لولبي يشبه مجال:', o: ['ساق مغناطيسية', 'سلك مستقيم', 'شحنة ساكنة', 'مغناطيس على شكل حلقة مغلقة بلا أقطاب'], a: 0, why: 'ص 118: للملف قطب شمالي وقطب جنوبي.' }
  ],
  parts: [{ id: 'g9_em_loop', n: 'الحلقة الدائرية والإلكترون حول النواة' }, { id: 'g9_em_sol', n: 'الملف اللولبي وقاعدة اليد اليمنى' }] });
M96({ id: 'g9_c6_emag', sec: '4-6 المغناطيس الكهربائي', page: 120, kind: 'نشاط', fig: 'الشكلان 17 و 18',
  title: 'المغناطيس الكهربائي: القلب والتيار وعدد اللفات والرافعة المغناطيسية',
  desc: 'نلف سلكاً معزولاً حول مسمار من الحديد المطاوع ونمرر تياراً فيجذب الدبابيس، ونقارن قلوب الحديد المطاوع والفولاذ والنحاس، ونزيد التيار وعدد اللفات، ثم نستعمل الرافعة المغناطيسية لنقل الحديد.',
  tags: 'المغناطيس الكهربائي مسمار حديد مطاوع فولاذ نحاس عدد اللفات التيار دبابيس الرافعة المغناطيسية خردة الحديد',
  fact: ['المغناطيس الكهربائي ملف معزول حول قلب من الحديد المطاوع يمر فيه تيار (ص 120).', 'تزداد قوته بزيادة التيار وعدد اللفات ووضع قلب حديد مطاوع (ص 120).', 'يزول مغناطيس الحديد المطاوع فور انقطاع التيار، لذا يستعمل في الرافعات (ص 120).'],
  quiz: [
    { q: 'أي العوامل التالية لا تزيد قوة المغناطيس الكهربائي لملف؟', o: ['إدخال ساق نحاس داخل جوف الملف', 'إدخال ساق حديد داخل جوف الملف', 'زيادة عدد لفات الملف لوحدة الطول', 'زيادة مقدار التيار المنساب في الملف'], a: 0, why: 'س1-6 ص 130: النحاس مادة غير مغناطيسية فلا يقوي المجال.' },
    { q: 'لف سلك معزول حول مسمار حديد مطاوع ووصل ببطارية. العبارة غير الصحيحة:', o: ['يزول المجال المغناطيسي للمسمار بعد فترة زمنية من انقطاع التيار', 'المسمار يكون مغناطيساً كهربائياً', 'أحد طرفي المسمار يصير قطباً شمالياً والآخر جنوبياً', 'يولد المسمار مجالاً مغناطيسياً حوله'], a: 0, why: 'س1-7 ص 130: مغناطيس الحديد المطاوع يزول فور انقطاع التيار لا بعد فترة.' }
  ],
  parts: [{ id: 'g9_em_emag', n: 'نشاط: صنع مغناطيس كهربائي' }, { id: 'g9_em_crane', n: 'الرافعة المغناطيسية' }] });
M96({ id: 'g9_c6_uses', sec: '5-6 استعمالات المغانط الكهربائية', page: 121, kind: 'تطبيق', fig: 'الأشكال 19 – 22',
  title: 'الجرس الكهربائي والهاتف والمرحل الكهرومغناطيسي',
  desc: 'نشغل جرساً كهربائياً ونتابع فتح دائرته وغلقها ذاتياً، ونرى كيف تحرك تغيرات التيار غشاء سماعة الهاتف، وكيف يتحكم تيار صغير في مرحل السيارة بتيار كبير لمحرك بدء التشغيل.',
  tags: 'الجرس الكهربائي المطرقة نقطة التماس الهاتف السماعة الغشاء اللاقطة المرحل محرك بدء تشغيل السيارة تيار صغير يتحكم بتيار كبير',
  fact: ['في الجرس الكهربائي يجذب المغناطيس الحافظة فتنفتح الدائرة ثم تعود فتنغلق فيتكرر الطرق (ص 121).', 'في سماعة الهاتف يتغير التيار مع الصوت فيهتز الغشاء الحديدي ويعيد الصوت (ص 121).', 'المرحل مفتاح مغناطيسي يتحكم فيه تيار صغير بدائرة يمر فيها تيار كبير (ص 122).'],
  quiz: [
    { q: 'الوظيفة الأساسية للمرحل الكهرومغناطيسي:', o: ['التحكم في تيار كبير بوساطة تيار صغير', 'تحويل التيار المتناوب إلى مستمر', 'زيادة فولطية البطارية', 'قياس التيار'], a: 0, why: 'ص 122: مثل مرحل محرك بدء تشغيل السيارة.' },
    { q: 'لماذا يستمر الجرس الكهربائي بالرنين ما دام المفتاح مغلقاً؟', o: ['لأن حركة الحافظة تفتح الدائرة وتغلقها بالتناوب', 'لأن المغناطيس دائمي', 'لأن التيار متناوب', 'لأن الجرس يخزن الطاقة'], a: 0, why: 'ص 121: نقطة التماس تفصل الدائرة عند انجذاب الحافظة ثم تعيد وصلها.' }
  ],
  parts: [{ id: 'g9_em_bell', n: 'الجرس الكهربائي' }, { id: 'g9_em_phone', n: 'الهاتف: اللاقطة والسماعة' }, { id: 'g9_em_relay', n: 'المرحل في السيارة' }] });
M96({ id: 'g9_c6_induct', sec: '6-6 الحث الكهرومغناطيسي والقوة الدافعة الكهربائية المحتثة', page: 123, kind: 'نشاط', fig: 'الأشكال 23 – 25',
  title: 'الحث الكهرومغناطيسي: التيار المحتث والقوة الدافعة المحتثة',
  desc: 'نحرك سلكاً بين قطبي مغناطيس على شكل U ونراقب الكلفانوميتر، ثم ندخل ساقاً مغناطيسية في ملف ونخرجها: يتولد تيار محتث عندما يتغير المجال عبر الدائرة، ويزداد بزيادة سرعة الحركة وعدد اللفات.',
  tags: 'الحث الكهرومغناطيسي تيار محتث قوة دافعة كهربائية محتثة emf كلفانوميتر سلك بين قطبين ساق مغناطيسية ملف فراداي سرعة الحركة',
  fact: ['يتولد تيار محتث عندما يقطع السلك خطوط المجال، ولا يتولد عند الحركة الموازية أو السكون (ص 123).', 'تقريب المغناطيس من الملف وإبعاده يولدان تيارين متعاكسين (ص 124).', 'الحث الكهرومغناطيسي: توليد فولطية محتثة في موصل يقع في مجال مغناطيسي متغير (ص 125).'],
  quiz: [
    { q: 'القوة الدافعة الكهربائية المحتثة (emf) تتولد من تغير:', o: ['المجال المغناطيسي', 'المجال الكهربائي', 'فرق الجهد الكهربائي', 'القوة الميكانيكية'], a: 0, why: 'س1-1 ص 129.' },
    { q: 'يزداد مقدار التيار المحتث المتولد في دائرة ملف سلكي إذا:', o: ['تحرك المغناطيس بسرعة داخل الملف', 'تحرك المغناطيس ببطء داخل الملف', 'كان المغناطيس ساكناً نسبة للملف', 'سحب الملف ببطء بعيداً عن المغناطيس'], a: 0, why: 'س1-2 ص 129: التغير الأسرع في المجال يولد تياراً أكبر.' }
  ],
  parts: [{ id: 'g9_em_wireU', n: 'نشاط 4: سلك بين قطبي مغناطيس' }, { id: 'g9_em_coilmag', n: 'نشاط 5: ساق مغناطيسية وملف' }] });
M96({ id: 'g9_c6_gen', sec: '7-6 تطبيقات ظاهرة الحث الكهرومغناطيسي', page: 125, kind: 'تطبيق', fig: 'الأشكال 26 – 35',
  title: 'المولد الكهربائي (AC و DC) والمحرك الكهربائي',
  desc: 'ندير ملف المولد بين قطبي مغناطيس فنحصل على تيار متناوب بحلقتي الزلق وتيار مستمر بالمبادل، ثم ندرس القوة على سلك يحمل تياراً في مجال، ونشغل محرك التيار المستمر ونرى دور المبادل.',
  tags: 'المولد الكهربائي التيار المتناوب التيار المستمر حلقتا الزلق المبادل الفرشتان المحرك الكهربائي القوة المغناطيسية على سلك المروحة الخلاط المثقاب المكنسة الرنين المغناطيسي MRI',
  fact: ['المولد يحول الطاقة الميكانيكية إلى طاقة كهربائية ويعمل على مبدأ الحث الكهرومغناطيسي (ص 125).', 'باستعمال المبادل بدل الحلقتين نحصل على تيار باتجاه واحد هو التيار المستمر DC (ص 126).', 'المحرك يحول الطاقة الكهربائية إلى ميكانيكية، ويعتمد على القوة المغناطيسية على سلك يحمل تياراً في مجال (ص 126).', 'يستمر ملف المحرك بالدوران باتجاه واحد بسبب المبادل (ص 128).', 'من التطبيقات الحديثة للمجال المغناطيسي التصوير بالرنين المغناطيسي MRI (ص 128).'],
  quiz: [
    { q: 'يمكن تحويل مولد التيار المتناوب إلى مولد للتيار المستمر برفع حلقتي الزلق وربط طرفي الملف بـ:', o: ['مبادل', 'مصباح كهربائي', 'سلك غليظ', 'فولطميتر'], a: 0, why: 'س1-3 ص 129.' },
    { q: 'المولد الكهربائي يحول الطاقة الميكانيكية إلى طاقة:', o: ['كهربائية', 'كيميائية', 'مغناطيسية', 'ضوئية'], a: 0, why: 'س1-4 ص 130.' },
    { q: 'يعمل المحرك الكهربائي على تحويل الطاقة الكهربائية إلى طاقة:', o: ['ميكانيكية', 'كيميائية', 'مغناطيسية', 'ضوئية'], a: 0, why: 'س1-5 ص 130.' },
    { q: 'سلك يحمل تياراً في مجال منتظم لا يتأثر بقوة مغناطيسية عندما يكون:', o: ['موازياً لخطوط المجال', 'عمودياً على خطوط المجال', 'مائلاً بزاوية 45°', 'في أي وضع'], a: 0, why: 'س5 ص 132.' }
  ],
  parts: [{ id: 'g9_em_gen', n: 'المولد الكهربائي AC و DC' }, { id: 'g9_em_force', n: 'القوة على سلك في مجال مغناطيسي' }, { id: 'g9_em_motor', n: 'المحرك الكهربائي' }] });
M96({ id: 'g9_c6_review', sec: 'أسئلة الفصل السادس', page: 129, kind: 'أسئلة', fig: 'ص 129 – 132',
  title: 'أسئلة الفصل السادس: حلول خطوة خطوة',
  desc: 'حلول أسئلة الفصل (س2 – س9) خطوة خطوة مع رسم تفاعلي لكل سؤال، وأسئلة الاختيار من متعدد (س1) في الاختبار القصير.',
  tags: 'أسئلة الفصل السادس حلول مراجعة س1 س2 س3 س4 س5 س6 س7 س8 س9 الكهربائية والمغناطيسية',
  fact: ['المغناطيس الكهربائي نتحكم في تشغيله وقوته وقطبيه (س2 ص 131).', 'مصدر طاقة التيار المحتث هو الشغل المبذول في تحريك المغناطيس (س3 ص 131).', 'وضع الحديد في جوف الملف يزيد مجاله لأن الحديد يتمغنط ويركز الخطوط (س6 ص 132).'],
  quiz: [
    { q: 'القوة الدافعة الكهربائية المحتثة تتولد من تغير:', o: ['المجال المغناطيسي', 'المجال الكهربائي', 'فرق الجهد الكهربائي', 'القوة الميكانيكية'], a: 0, why: 'س1-1 ص 129.' },
    { q: 'يزداد التيار المحتث في ملف إذا:', o: ['تحرك المغناطيس بسرعة داخل الملف', 'تحرك المغناطيس ببطء داخل الملف', 'كان المغناطيس ساكناً نسبة للملف', 'سحب الملف ببطء بعيداً عن المغناطيس'], a: 0, why: 'س1-2 ص 129.' },
    { q: 'لتحويل مولد AC إلى مولد DC نربط طرفي الملف بـ:', o: ['مبادل', 'مصباح كهربائي', 'سلك غليظ', 'فولطميتر'], a: 0, why: 'س1-3 ص 129.' },
    { q: 'المولد الكهربائي يحول الطاقة الميكانيكية إلى طاقة:', o: ['كهربائية', 'كيميائية', 'مغناطيسية', 'ضوئية'], a: 0, why: 'س1-4 ص 130.' },
    { q: 'المحرك الكهربائي يحول الطاقة الكهربائية إلى طاقة:', o: ['ميكانيكية', 'كيميائية', 'مغناطيسية', 'ضوئية'], a: 0, why: 'س1-5 ص 130.' },
    { q: 'أي العوامل التالية لا تزيد قوة المغناطيس الكهربائي؟', o: ['إدخال ساق نحاس داخل جوف الملف', 'إدخال ساق حديد داخل جوف الملف', 'زيادة عدد اللفات لوحدة الطول', 'زيادة التيار المنساب في الملف'], a: 0, why: 'س1-6 ص 130.' },
    { q: 'مسمار حديد مطاوع ملفوف عليه سلك ومتصل ببطارية. العبارة غير الصحيحة:', o: ['يزول المجال المغناطيسي للمسمار بعد فترة زمنية من انقطاع التيار', 'المسمار يكون مغناطيساً كهربائياً', 'أحد طرفيه يصير قطباً شمالياً والآخر جنوبياً', 'يولد المسمار مجالاً مغناطيسياً حوله'], a: 0, why: 'س1-7 ص 130: يزول فوراً عند انقطاع التيار.' },
    { q: 'الشحنات الكهربائية المتحركة تولد:', o: ['مجالاً كهربائياً ومجالاً مغناطيسياً', 'مجالاً كهربائياً فقط', 'مجالاً مغناطيسياً فقط'], a: 0, why: 'س1-8 ص 131.' }
  ],
  parts: [{ id: 'g9_em_review', n: 'حلول س2 – س9 خطوة خطوة' }] });

/* زر النقر فقط بلا سحب، وتصحيح اتجاه النص في التفسير */
Object.keys(M8.P).filter(k => /^g9_em_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g9_em_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });
